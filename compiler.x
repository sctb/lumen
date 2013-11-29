;; -*- mode: lisp -*-

(set operators
  (table common (table "+" "+" "-" "-" "*" "*" "/" "/" "<" "<"
			">" ">" "=" "==" "<=" "<=" ">=" ">=")
	 js (table "and" "&&" "or" "||" "cat" "+")
	 lua (table "and" " and " "or" " or " "cat" "..")))

(defun get-op (op)
  (or (get (get operators 'common) op)
      (get (get operators target) op)))

(defun operator? (form)
  (and (list? form) (not (= (get-op (at form 0)) nil))))

(defun get-symbol-macro (form) (getenv symbol-macros form))
(defun get-macro (form) (getenv macros form))

(defun quoting? (depth) (number? depth))
(defun quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(defun can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(defun macroexpand (form)
  (if ;; expand symbol macro
      (get-symbol-macro form) (macroexpand (get-symbol-macro form))
      ;; atom
      (atom? form) form
    (do (local name (at form 0))
	(if ;; pass-through
	    (= name 'quote) form
	    (= name 'defmacro) form
	    ;; expand macro
	    (get-macro name)
	    (macroexpand (apply (get-macro name) (sub form 1)))
	    ;; skip arglists
	    (or (= name 'lambda)
		(= name 'each))
	    (do (bind (_ args body...) form)
		`(,name ,args ,@(macroexpand body)))
	    (= name 'defun)
	    (do (bind (_ fn args body...) form)
		`(defun ,fn ,args ,@(macroexpand body)))
	  ;; list
	  (map macroexpand form)))))

(defun quasiexpand (form depth)
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
    (map (lambda (x) (quasiexpand x depth)) form)))

(defun quasiquote-list (form depth)
  (do (local xs (list '(list)))
      ;; collect sibling lists
      (across (form x)
	(if (and (list? x)
		 (can-unquote? depth)
		 (= (at x 0) 'unquote-splicing))
	    (do (push xs (quasiexpand (at x 1)))
		(push xs '(list)))
	  (push (last xs) (quasiexpand x depth))))
      (if (= (length xs) 1) ; no splicing
	  (at xs 0)
	;; join all
	(reduce (lambda (a b) (list 'join a b))
		;; remove empty lists
		(filter
		 (lambda (x)
		   (or (= (length x) 0)
		       (not (and (= (length x) 1)
				 (= (at x 0) 'list)))))
		 xs)))))

(defun compile-args (forms compile?)
  (local str "(")
  (across (forms x i)
    (local x1 (if compile? (compile x) (identifier x)))
    (set str (cat str x1))
    (if (< i (- (length forms) 1)) (set str (cat str ","))))
  (cat str ")"))

(defun compile-body (forms tail?)
  (local str "")
  (across (forms x i)
    (local t? (and tail? (= i (- (length forms) 1))))
    (set str (cat str (compile x true t?))))
  str)

(defun identifier (id)
  (local id2 "")
  (local i 0)
  (while (< i (length id))
    (local c (char id i))
    (if (= c "-") (set c "_"))
    (set id2 (cat id2 c))
    (set i (+ i 1)))
  (local last (- (length id) 1))
  (if (= (char id last) "?")
      (do (local name (sub id2 0 last))
	  (set id2 (cat "is_" name))))
  id2)

(defun compile-atom (form)
  (if (= form "nil")
      (if (= target 'js) "undefined" "nil")
      (and (string? form) (not (string-literal? form)))
      (identifier form)
    (to-string form)))

(defun compile-call (form)
  (if (= (length form) 0)
      ((compiler 'list) form) ; ()
    (do (local fn (at form 0))
	(local fn1 (compile fn))
	(local args (compile-args (sub form 1) true))
	(if (list? fn) (cat "(" fn1 ")" args)
	  (string? fn) (cat fn1 args)
	  (error "Invalid function call")))))

(defun compile-operator ((op args...))
  (local str "(")
  (local op1 (get-op op))
  (across (args arg i)
    (if (and (= op1 '-) (= (length args) 1))
	(set str (cat str op1 (compile arg)))
      (do (set str (cat str (compile arg)))
	  (if (< i (- (length args) 1)) (set str (cat str op1))))))
  (cat str ")"))

(defun compile-branch (condition body first? last? tail?)
  (local cond1 (compile condition))
  (local body1 (compile body true tail?))
  (local tr (if (and last? (= target 'lua)) " end " ""))
  (if (and first? (= target 'js))
      (cat "if(" cond1 "){" body1 "}")
      first?
      (cat "if " cond1 " then " body1 tr)
      (and (= condition nil) (= target 'js))
      (cat "else{" body1 "}")
      (= condition nil)
      (cat " else " body1 " end ")
      (= target 'js)
      (cat "else if(" cond1 "){" body1 "}")
    (cat " elseif " cond1 " then " body1 tr)))

(defun bind-arguments (args body)
  (local args1 ())
  (across (args arg)
    (if (vararg? arg)
	(do (local v (sub arg 0 (- (length arg) 3)))
	    (local expr
	      (if (= target 'js)
		  `(Array.prototype.slice.call arguments ,(length args1))
		(do (push args1 '...) '(list ...))))
	    (set body `((local ,v ,expr) ,@body))
	    break) ; no more args
        (list? arg)
	(do (local v (make-id))
	    (push args1 v)
	    (set body (macroexpand `((bind ,arg ,v) ,@body))))
      (push args1 arg)))
  (list args1 body))

(defun compile-function (args body name)
  (set name (or name ""))
  (local expanded (bind-arguments args body))
  (local args1 (compile-args (at expanded 0)))
  (local body1 (compile-body (at expanded 1) true))
  (if (= target 'js)
      (cat "function " name args1 "{" body1 "}")
    (cat "function " name args1 body1 " end ")))

(defun quote-form (form)
  (if (atom? form)
      (if (string-literal? form)
	  (do (local str (sub form 1 (- (length form) 1)))
	      (cat "\"\\\"" str "\\\"\""))
	(string? form) (cat "\"" form "\"")
	(to-string form))
    ((compiler 'list) form 0)))

(defun compile-special (form stmt? tail?)
  (local name (at form 0))
  (if (and (not stmt?) (statement? name))
      (compile `((lambda () ,form)) false tail?)
    (do (local tr? (and stmt? (not (self-terminating? name))))
	(local tr (if tr? ";" ""))
	(cat ((compiler name) (sub form 1) tail?) tr))))

(set special (table))

(defun special? (form)
  (and (list? form) (not (= (get special (at form 0)) nil))))

(defmacro define-compiler (name (keys...) args body...)
  `(set (get special ',name)
	(table compiler (lambda ,args ,@body)
	       ,@(collect (lambda (k) (list k true)) keys))))

(defun compiler (name) (get (get special name) 'compiler))
(defun statement? (name) (get (get special name) 'statement))
(defun self-terminating? (name) (get (get special name) 'terminated))

(define-compiler do (statement terminated) (forms tail?)
  (compile-body forms tail?))

(define-compiler if (statement terminated) (form tail?)
  (local str "")
  (across (form condition i)
    (local last? (>= i (- (length form) 2)))
    (local else? (= i (- (length form) 1)))
    (local first? (= i 0))
    (local body (at form (+ i 1)))
    (if else?
	(do (set body condition)
	    (set condition nil)))
    (set i (+ i 1))
    (set str (cat str (compile-branch condition body first? last? tail?))))
  str)

(define-compiler while (statement terminated) (form)
  (local condition (compile (at form 0)))
  (local body (compile-body (sub form 1)))
  (if (= target 'js)
      (cat "while(" condition "){" body "}")
    (cat "while " condition " do " body " end ")))

(define-compiler defun (statement terminated) ((name args body...))
  (local id (identifier name))
  (compile-function args body id))

(define-compiler defmacro (statement terminated) ((name args body...))
  (local lambda `(lambda ,args ,@body))
  (local register `(setenv macros ',name ,lambda))
  (eval (compile-for-target (language) register true))
  "")

(define-compiler return (statement) (form)
  (compile-call `(return ,@form)))

(define-compiler local (statement) ((name value))
  (local id (identifier name))
  (local keyword (if (= target 'js) "var " "local "))
  (if (= value nil)
      (cat keyword id)
    (do (local v (compile value))
	(cat keyword id "=" v))))

(define-compiler each (statement) (((t k v) body...))
  (local t1 (compile t))
  (if (= target 'lua)
      (do (local body1 (compile-body body))
	  (cat "for " k "," v " in pairs(" t1 ") do " body1 " end"))
    (do (local body1 (compile-body `((set ,v (get ,t ,k)) ,@body)))
	(cat "for(" k " in " t1 "){" body1 "}"))))

(define-compiler set (statement) (form)
  (if (< (length form) 2)
      (error "Missing right-hand side in assignment"))
  (local lh (compile (at form 0)))
  (local rh (compile (at form 1)))
  (cat lh "=" rh))

(define-compiler get () ((object key))
  (local o (compile object))
  (local k (compile key))
  (if (and (= target 'lua)
	   (= (char o 0) "{"))
      (set o (cat "(" o ")")))
  (cat o "[" k "]"))

(define-compiler dot () ((object key))
  (local o (compile object))
  (local id (identifier key))
  (cat o "." id))

(define-compiler not () ((expr))
  (local e (compile expr))
  (local open (if (= target 'js) "!(" "(not "))
  (cat open e ")"))

(define-compiler list () (forms depth)
  (local open (if (= target 'lua) "{" "["))
  (local close (if (= target 'lua) "}" "]"))
  (local str "")
  (across (forms x i)
    (local x1 (if (quoting? depth) (quote-form x) (compile x)))
    (set str (cat str x1))
    (if (< i (- (length forms) 1)) (set str (cat str ","))))
  (cat open str close))

(define-compiler table () (forms)
  (local sep (if (= target 'lua) "=" ":"))
  (local str "{")
  (local i 0)
  (while (< i (- (length forms) 1))
    (local k (at forms i))
    (if (not (string? k)) (error (cat "Illegal table key: " (to-string k))))
    (local v (compile (at forms (+ i 1))))
    (if (and (= target 'lua) (string-literal? k))
	(set k (cat "[" k "]")))
    (set str (cat str k sep v))
    (if (< i (- (length forms) 2)) (set str (cat str ",")))
    (set i (+ i 2)))
  (cat str "}"))

(define-compiler lambda () ((args body...))
  (compile-function args body))

(define-compiler quote () ((form)) (quote-form form))

(defun can-return? (form)
  (if (special? form)
      (not (statement? (at form 0)))
    true))

(defun compile (form stmt? tail?)
  (local tr (if stmt? ";" ""))
  (if (and tail? (can-return? form))
      (set form `(return ,form)))
  (if (= form nil) ""
      (atom? form) (cat (compile-atom form) tr)
      (operator? form) (cat (compile-operator form) tr)
      (special? form) (compile-special form stmt? tail?)
    (cat (compile-call form) tr)))

(defun compile-file (file)
  (local form)
  (local output "")
  (local s (make-stream (read-file file)))
  (while true
    (set form (read s))
    (if (= form eof) break)
    (set output (cat output (compile (macroexpand form) true))))
  output)

(defun compile-files (files)
  (local output "")
  (across (files file)
    (set output (cat output (compile-file file))))
  output)

(defun compile-for-target (target1 form stmt?)
  (local previous target)
  (set target target1)
  (local result (compile (macroexpand form) stmt?))
  (set target previous)
  result)
