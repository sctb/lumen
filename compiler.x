;; -*- mode: lisp -*-

(global operators
  (table common (table "+" "+" "-" "-" "*" "*" "/" "/" "<" "<"
			">" ">" "=" "==" "<=" "<=" ">=" ">=")
	 js (table "~=" "!=" "and" "&&" "or" "||" "cat" "+")
	 lua (table "~=" "~=" "and" " and " "or" " or " "cat" "..")))

(define getop (op)
  (or (get (get operators 'common) op)
      (get (get operators target) op)))

(define operator? (form)
  (and (list? form) (is? (getop (at form 0)))))

(define quoting? (depth) (number? depth))
(define quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(macro w/scope ((bound) expr)
  (let (result (make-id)
	arg (make-id))
    `(do (push! environment (table))
	 (across (,bound ,arg)
	   (setenv! ,arg variable))
	 (let (,result ,expr)
	   (pop! environment)
	   ,result))))

(macro quasiquote (form)
  (quasiexpand form 1))

(define macroexpand (form)
  (if ;; expand symbol macro
      (symbol-macro? form) (macroexpand (getenv form))
      ;; atom
      (atom? form) form
    (let (name (at form 0))
      (if ;; pass-through
	  (= name 'quote) form
	  (= name 'macro) form
	  ;; expand macro
	  (macro? name)
	  (macroexpand (apply (getenv name) (sub form 1)))
	  ;; scoped forms
	  (or (= name 'function)
	      (= name 'each))
	  (let ((_ args body...) form)
	    (w/scope (args)
	      `(,name ,args ,@(macroexpand body))))
	  (= name 'function-definition)
	  (let ((_ f args body...) form)
	    (w/scope (args)
	      `(,name ,f ,args ,@(macroexpand body))))
	;; list
	(map macroexpand form)))))

(define quasiexpand (form depth)
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

(define quasiquote-list (form depth)
  (let (xs (list '(list)))
    ;; collect sibling lists
    (across (form x)
      (if (and (list? x)
	       (can-unquote? depth)
	       (= (at x 0) 'unquote-splicing))
	  (do (push! xs (quasiexpand (at x 1)))
	      (push! xs '(list)))
	(push! (last xs) (quasiexpand x depth))))
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

(define compile-args (forms compile?)
  (let (str "(")
    (across (forms x i)
      (cat! str (if compile? (compile x) (identifier x)))
      (if (< i (- (length forms) 1)) (cat! str ",")))
    (cat str ")")))

(define compile-body (forms tail?)
  (let (str "")
    (across (forms x i)
      (let (t? (and tail? (= i (- (length forms) 1))))
	(cat! str (compile x true t?))))
    str))

(define identifier (id)
  (let (id2 "" i 0)
    (while (< i (length id))
      (let (c (char id i))
	(if (= c "-") (set! c "_"))
	(cat! id2 c))
      (set! i (+ i 1)))
    (let (last (- (length id) 1)
	  suffix (char id last)
	  name (sub id2 0 last))
      (if (= suffix "?") (cat "is_" name)
	  (= suffix "!") (cat "n_" name)
	id2))))

(define compile-atom (form)
  (if (= form "nil")
      (if (= target 'js) "undefined" "nil")
      (and (string? form) (not (string-literal? form)))
      (identifier form)
    (to-string form)))

(define compile-call (form)
  (if (= (length form) 0)
      ((compiler 'list) form) ; ()
    (let (f (at form 0)
	  f1 (compile f)
	  args (compile-args (sub form 1) true))
	(if (list? f) (cat "(" f1 ")" args)
	    (string? f) (cat f1 args)
	  (error "Invalid function call")))))

(define compile-operator ((op args...))
  (let (str "("
	op1 (getop op))
    (across (args arg i)
      (if (and (= op1 '-) (= (length args) 1))
	  (cat! str op1 (compile arg))
	(do (cat! str (compile arg))
	    (if (< i (- (length args) 1)) (cat! str op1)))))
    (cat str ")")))

(define compile-branch (condition body first? last? tail?)
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

(define compile-function (args body name local?)
  (set! name (or name ""))
  (let (args1 (compile-args args)
	body1 (compile-body body true))
    (if (= target 'js)
	(cat "function " name args1 "{" body1 "}")
      (let (pre (if local? "local " ""))
	(cat pre "function " name args1 body1 " end ")))))

(define quote-form (form)
  (if (atom? form)
      (if (string-literal? form)
	  (let (str (sub form 1 (- (length form) 1)))
	    (cat "\"\\\"" str "\\\"\""))
	(string? form) (cat "\"" form "\"")
	(to-string form))
    ((compiler 'list) form 0)))

(define compile-special (form stmt? tail? toplevel?)
  (let (name (at form 0))
    (if (and (not stmt?) (statement? name))
	(compile `((function () ,form)) false tail?)
      (let (tr? (and stmt? (not (self-terminating? name)))
	    tr (if tr? ";" ""))
	(cat ((compiler name) (sub form 1) tail? toplevel?) tr)))))

(global special (table))

(define special? (form)
  (and (list? form) (is? (get special (at form 0)))))

(macro define-compiler (name (keys...) args body...)
  `(set! (get special ',name)
	(table compiler (fn ,args ,@body)
	       ,@(collect (fn (k) (list k true)) keys))))

(define compiler (name) (get (get special name) 'compiler))
(define statement? (name) (get (get special name) 'statement))
(define self-terminating? (name) (get (get special name) 'terminated))

(define-compiler do (statement terminated) (forms tail?)
  (compile-body forms tail?))

(define-compiler if (statement terminated) (form tail?)
  (let (str "")
    (across (form condition i)
      (let (last? (>= i (- (length form) 2))
	    else? (= i (- (length form) 1))
	    first? (= i 0)
	    body (at form (+ i 1)))
	(if else?
	    (do (set! body condition)
		(set! condition nil)))
	(cat! str (compile-branch condition body first? last? tail?)))
      (set! i (+ i 1)))
    str))

(define-compiler while (statement terminated) (form)
  (let (condition (compile (at form 0))
        body (compile-body (sub form 1)))
    (if (= target 'js)
	(cat "while(" condition "){" body "}")
      (cat "while " condition " do " body " end "))))

(define-compiler function () ((args body...))
  (compile-function args body))

(define-compiler function-definition
    (statement terminated)
    ((name args body...) _ toplevel?)
  (compile-function args body (identifier name) (not toplevel?)))

(global macros "")

(define-compiler macro (statement terminated) ((name args body...))
  (let (macro `(setenv! ',name (fn ,args ,@body)))
    (eval (compile-for-target (language) macro))
    (if embed-macros?
	(cat! macros (compile-toplevel macro))))
  "")

(define-compiler return (statement) (form)
  (compile-call `(return ,@form)))

(define-compiler local (statement) ((name value))
  (let (id (identifier name)
	keyword (if (= target 'js) "var " "local "))
    (if (nil? value)
	(cat keyword id)
      (cat keyword id "=" (compile value)))))

(define-compiler each (statement) (((t k v) body...))
  (let (t1 (compile t))
    (if (= target 'lua)
	(let (body1 (compile-body body))
	  (cat "for " k "," v " in pairs(" t1 ") do " body1 " end"))
      (let (body1 (compile-body `((set! ,v (get ,t ,k)) ,@body)))
	(cat "for(" k " in " t1 "){" body1 "}")))))

(define-compiler set! (statement) ((lh rh))
  (if (nil? rh)
      (error "Missing right-hand side in assignment"))
  (cat (compile lh) "=" (compile rh)))

(define-compiler get () ((object key))
  (let (o (compile object)
	k (compile key))
    (if (and (= target 'lua)
	     (= (char o 0) "{"))
	(set! o (cat "(" o ")")))
    (cat o "[" k "]")))

(define-compiler dot () ((object key))
  (cat (compile object) "." (identifier key)))

(define-compiler not () ((expr))
  (let (e (compile expr)
	open (if (= target 'js) "!(" "(not "))
    (cat open e ")")))

(define-compiler list () (forms depth)
  (let (open (if (= target 'lua) "{" "[")
	close (if (= target 'lua) "}" "]")
	str "")
    (across (forms x i)
      (cat! str (if (quoting? depth) (quote-form x) (compile x)))
      (if (< i (- (length forms) 1)) (cat! str ",")))
    (cat open str close)))

(define-compiler table () (forms)
  (let (sep (if (= target 'lua) "=" ":")
	str "{"
	i 0)
    (while (< i (- (length forms) 1))
      (let (k (at forms i)
	    v (compile (at forms (+ i 1))))
	(if (not (string? k))
	    (error (cat "Illegal table key: " (to-string k))))
	(if (and (= target 'lua) (string-literal? k))
	    (set! k (cat "[" k "]")))
	(cat! str k sep v)
	(if (< i (- (length forms) 2)) (cat! str ","))
	(set! i (+ i 2))))
    (cat str "}")))

(define-compiler quote () ((form)) (quote-form form))

(define can-return? (form)
  (if (special? form)
      (not (statement? (at form 0)))
    true))

(define compile (form stmt? tail? toplevel?)
  (let (tr (if stmt? ";" ""))
    (if (and tail? (can-return? form))
	(set! form `(return ,form)))
    (if (nil? form) ""
        (atom? form) (cat (compile-atom form) tr)
        (operator? form) (cat (compile-operator form) tr)
        (special? form) (compile-special form stmt? tail? toplevel?)
      (cat (compile-call form) tr))))

(define compile-file (file)
  (let (form nil
	output ""
	s (make-stream (read-file file)))
    (while true
      (set! form (read s))
      (if (= form eof) break)
      (let (result (compile-toplevel form))
	(cat! output result)))
    output))

(define compile-files (files)
  (let (output "")
    (across (files file)
      (cat! output (compile-file file)))
    output))

(define compile-toplevel (form)
  (compile (macroexpand form) true false true))

(define compile-for-target (target1 form)
  (let (previous target)
    (set! target target1)
    (let (result (compile-toplevel form))
      (set! target previous)
      result)))
