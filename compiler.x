;; -*- mode: lisp -*-

(set operators
  (table common (table "+" "+" "-" "-" "*" "*" "/" "/" "<" "<"
			">" ">" "=" "==" "<=" "<=" ">=" ">=")
	 js (table "and" "&&" "or" "||" "cat" "+")
	 lua (table "and" " and " "or" " or " "cat" "..")))

(def get-op (op)
  (or (get (get operators 'common) op)
      (get (get operators target) op)))

(def operator? (form)
  (and (list? form) (is? (get-op (at form 0)))))

(def quoting? (depth) (number? depth))
(def quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(def can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(mac w/scope ((bound) expr)
  (let (result (make-id)
	arg (make-id))
    `(do (push environment (table))
	 ;; FIXME: these aren't the final processed arguments
	 (across (,bound ,arg)
	   (setenv ,arg variable))
	 (let (,result ,expr)
	   (pop environment)
	   ,result))))

(mac quasiquote (form)
  (quasiexpand form 1))

(def macroexpand (form)
  (if ;; expand symbol macro
      (symbol-macro? form) (macroexpand (getenv form))
      ;; atom
      (atom? form) form
    (let (name (at form 0))
      (if ;; pass-through
	  (= name 'quote) form
	  (= name 'mac) form
	  ;; expand macro
	  (macro? name)
	  (macroexpand (apply (getenv name) (sub form 1)))
	  ;; scoped forms
	  (or (= name 'fn)
	      (= name 'each))
	  (do (bind (_ args body...) form)
	      (w/scope (args)
	        `(,name ,args ,@(macroexpand body))))
	  (= name 'def)
	  (do (bind (_ f args body...) form)
	      (w/scope (args)
	        `(def ,f ,args ,@(macroexpand body))))
	;; list
	(map macroexpand form)))))

(def quasiexpand (form depth)
  (if (quasiquoting? depth)
      (if (atom? form) (list 'quote form)
	  ;; unquote
	  (and (can-unquote? depth)
	       (= (at form 0) 'unquote))
	  (quasiexpand (at form 1))
	  ;; decrease quasiquoting depth
	  (or (= (at form 0) 'unquote)
	      (= (at form 0) 'unquote-splicing))
	  (quasiquote-list form (- depth 1))
	  ;; increase quasiquoting depth
	  (= (at form 0) 'quasiquote)
	  (quasiquote-list form (+ depth 1))
	;; list
	(quasiquote-list form depth))
      ;; atom
      (atom? form) form
      ;; quote
      (= (at form 0) 'quote)
      (list 'quote (at form 1))
      ;; quasiquote
      (= (at form 0) 'quasiquote)
      (quasiexpand (at form 1) 1)
    ;; list
    (map (fn (x) (quasiexpand x depth)) form)))

(def quasiquote-list (form depth)
  (let (xs (list '(list)))
    ;; collect sibling lists
    (across (form x)
      (if (and (list? x)
	       (can-unquote? depth)
	       (= (at x 0) 'unquote-splicing))
	  (do (push xs (quasiexpand (at x 1)))
	      (push xs '(list)))
	(push (last xs) (quasiexpand x depth))))
    (if (= (length xs) 1)		; no splicing
	(at xs 0)
      ;; join all
      (reduce (fn (a b) (list 'join a b))
	      ;; remove empty lists
	      (keep
	       (fn (x)
		 (or (= (length x) 0)
		     (not (and (= (length x) 1)
			       (= (at x 0) 'list)))))
	       xs)))))

(def compile-args (forms compile?)
  (let (str "(")
    (across (forms x i)
      (let (x1 (if compile? (compile x) (identifier x)))
	(cat! str x1))
      (if (< i (- (length forms) 1)) (cat! str ",")))
    (cat str ")")))

(def compile-body (forms tail?)
  (let (str "")
    (across (forms x i)
      (let (t? (and tail? (= i (- (length forms) 1))))
	(cat! str (compile x true t?))))
    str))

(def identifier (id)
  (let (id2 "" i 0)
    (while (< i (length id))
      (let (c (char id i))
	(if (= c "-") (set c "_"))
	(cat! id2 c))
      (set i (+ i 1)))
    (let (last (- (length id) 1))
      (if (= (char id last) "?")
	  (let (name (sub id2 0 last))
	    (set id2 (cat "is_" name)))))
    id2))

(def compile-atom (form)
  (if (= form "nil")
      (if (= target 'js) "undefined" "nil")
      (and (string? form) (not (string-literal? form)))
      (identifier form)
    (to-string form)))

(def compile-call (form)
  (if (= (length form) 0)
      ((compiler 'list) form) ; ()
    (let (f (at form 0)
	  f1 (compile f)
	  args (compile-args (sub form 1) true))
	(if (list? f) (cat "(" f1 ")" args)
	    (string? f) (cat f1 args)
	  (error "Invalid function call")))))

(def compile-operator ((op args...))
  (let (str "("
	op1 (get-op op))
    (across (args arg i)
      (if (and (= op1 '-) (= (length args) 1))
	  (cat! str op1 (compile arg))
	(do (cat! str (compile arg))
	    (if (< i (- (length args) 1)) (cat! str op1)))))
    (cat str ")")))

(def compile-branch (condition body first? last? tail?)
  (let (cond1 (compile condition)
        body1 (compile body true tail?)
        tr (if (and last? (= target 'lua)) " end " ""))
    (if (and first? (= target 'js))
	(cat "if(" cond1 "){" body1 "}")
        first?
	(cat "if " cond1 " then " body1 tr)
	(and (nil? condition) (= target 'js))
	(cat "else{" body1 "}")
	(nil? condition)
	(cat " else " body1 " end ")
	(= target 'js)
	(cat "else if(" cond1 "){" body1 "}")
      (cat " elseif " cond1 " then " body1 tr))))

(def bind-arguments (args body)
  (let (args1 ())
    (across (args arg)
      (if (vararg? arg)
	  (let (v (sub arg 0 (- (length arg) 3))
		expr
		(if (= target 'js)
		    `(Array.prototype.slice.call arguments ,(length args1))
		  (do (push args1 '...) '(list ...))))
	      (set body `((local ,v ,expr) ,@body))
	      break) ; no more args
          (list? arg)
	  (let (v (make-id))
	    (push args1 v)
	    (set body (macroexpand `((bind ,arg ,v) ,@body))))
	(push args1 arg)))
    (list args1 body)))

(def compile-function (args body name)
  (set name (or name ""))
  (let (expanded (bind-arguments args body)
	args1 (compile-args (at expanded 0))
	body1 (compile-body (at expanded 1) true))
    (if (= target 'js)
	(cat "function " name args1 "{" body1 "}")
      (cat "function " name args1 body1 " end "))))

(def quote-form (form)
  (if (atom? form)
      (if (string-literal? form)
	  (let (str (sub form 1 (- (length form) 1)))
	    (cat "\"\\\"" str "\\\"\""))
	(string? form) (cat "\"" form "\"")
	(to-string form))
    ((compiler 'list) form 0)))

(def compile-special (form stmt? tail?)
  (let (name (at form 0))
    (if (and (not stmt?) (statement? name))
	(compile `((fn () ,form)) false tail?)
      (let (tr? (and stmt? (not (self-terminating? name)))
	    tr (if tr? ";" ""))
	(cat ((compiler name) (sub form 1) tail?) tr)))))

(set special (table))

(def special? (form)
  (and (list? form) (is? (get special (at form 0)))))

(mac defc (name (keys...) args body...)
  `(set (get special ',name)
	(table compiler (fn ,args ,@body)
	       ,@(collect (fn (k) (list k true)) keys))))

(def compiler (name) (get (get special name) 'compiler))
(def statement? (name) (get (get special name) 'statement))
(def self-terminating? (name) (get (get special name) 'terminated))

(defc do (statement terminated) (forms tail?)
  (compile-body forms tail?))

(defc if (statement terminated) (form tail?)
  (let (str "")
    (across (form condition i)
      (let (last? (>= i (- (length form) 2))
	    else? (= i (- (length form) 1))
	    first? (= i 0)
	    body (at form (+ i 1)))
	(if else?
	    (do (set body condition)
		(set condition nil)))
	(cat! str (compile-branch condition body first? last? tail?)))
      (set i (+ i 1)))
    str))

(defc while (statement terminated) (form)
  (let (condition (compile (at form 0))
        body (compile-body (sub form 1)))
    (if (= target 'js)
	(cat "while(" condition "){" body "}")
      (cat "while " condition " do " body " end "))))

(defc def (statement terminated) ((name args body...))
  (let (id (identifier name))
    (compile-function args body id)))

(set macros "")

(defc mac (statement terminated) ((name args body...))
  (let (macro `(setenv ',name (fn ,args ,@body)))
    (eval (compile-for-target (language) macro true))
    (if embed-macros?
	(cat! macros (compile (macroexpand macro) true))))
  "")

(defc return (statement) (form)
  (compile-call `(return ,@form)))

(defc local (statement) ((name value))
  (let (id (identifier name)
	keyword (if (= target 'js) "var " "local "))
    (if (nil? value)
	(cat keyword id)
      (let (v (compile value))
	(cat keyword id "=" v)))))

(defc each (statement) (((t k v) body...))
  (let (t1 (compile t))
    (if (= target 'lua)
	(let (body1 (compile-body body))
	  (cat "for " k "," v " in pairs(" t1 ") do " body1 " end"))
      (let (body1 (compile-body `((set ,v (get ,t ,k)) ,@body)))
	(cat "for(" k " in " t1 "){" body1 "}")))))

(defc set (statement) (form)
  (if (< (length form) 2)
      (error "Missing right-hand side in assignment"))
  (cat (compile (at form 0)) "=" (compile (at form 1))))

(defc get () ((object key))
  (let (o (compile object)
	k (compile key))
    (if (and (= target 'lua)
	     (= (char o 0) "{"))
	(set o (cat "(" o ")")))
    (cat o "[" k "]")))

(defc dot () ((object key))
  (let (o (compile object)
	id (identifier key))
    (cat o "." id)))

(defc not () ((expr))
  (let (e (compile expr)
	open (if (= target 'js) "!(" "(not "))
    (cat open e ")")))

(defc list () (forms depth)
  (let (open (if (= target 'lua) "{" "[")
	close (if (= target 'lua) "}" "]")
	str "")
    (across (forms x i)
      (let (x1 (if (quoting? depth) (quote-form x) (compile x)))
	(cat! str x1))
      (if (< i (- (length forms) 1)) (cat! str ",")))
    (cat open str close)))

(defc table () (forms)
  (let (sep (if (= target 'lua) "=" ":")
	str "{"
	i 0)
    (while (< i (- (length forms) 1))
      (let (k (at forms i)
	    v (compile (at forms (+ i 1))))
	(if (not (string? k))
	    (error (cat "Illegal table key: " (to-string k))))
	(if (and (= target 'lua) (string-literal? k))
	    (set k (cat "[" k "]")))
	(cat! str k sep v)
	(if (< i (- (length forms) 2)) (cat! str ","))
	(set i (+ i 2))))
    (cat str "}")))

(defc fn () ((args body...))
  (compile-function args body))

(defc quote () ((form)) (quote-form form))

(def can-return? (form)
  (if (special? form)
      (not (statement? (at form 0)))
    true))

(def compile (form stmt? tail?)
  (let (tr (if stmt? ";" ""))
    (if (and tail? (can-return? form))
	(set form `(return ,form)))
    (if (nil? form) ""
        (atom? form) (cat (compile-atom form) tr)
        (operator? form) (cat (compile-operator form) tr)
        (special? form) (compile-special form stmt? tail?)
      (cat (compile-call form) tr))))

(def compile-file (file)
  (let (form nil
	output ""
	s (make-stream (read-file file)))
    (while true
      (set form (read s))
      (if (= form eof) break)
      (cat! output (compile (macroexpand form) true)))
    output))

(def compile-files (files)
  (let (output "")
    (across (files file)
      (cat! output (compile-file file)))
    output))

(def compile-for-target (target1 form stmt?)
  (let (previous target)
    (set target target1)
    (let (result (compile (macroexpand form) stmt?))
      (set target previous)
      result)))
