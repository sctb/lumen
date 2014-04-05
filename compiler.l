;; -*- mode: lisp -*-

(define operators
  (table common (table "+" "+" "-" "-" "%" "%" "*" "*" "/" "/"
		       "<" "<" ">" ">" "<=" "<=" ">=" ">=")
	 js (table "=" "===" "~=" "!=" "and" "&&" "or" "||" "cat" "+")
	 lua (table "=" "==" "~=" "~=" "and" "and" "or" "or" "cat" "..")))

(define getop (op)
  (or (get (get operators 'common) op)
      (get (get operators target) op)))

(define operator? (form)
  (and (list? form) (is? (getop (hd form)))))

(define indent-level 0)

(define indentation ()
  (let (str "")
    (iterate (fn () (cat! str "  ")) indent-level)
    str))

(define-macro with-indent (form)
  (let (result (make-id))
    `(do (set indent-level (+ indent-level 1))
         (let (,result ,form)
           (set indent-level (- indent-level 1))
           ,result))))

(define compile-args (forms compile?)
  (let (str "(")
    (across (forms x i)
      (cat! str (if compile? (compile x) (identifier x)))
      (if (< i (- (length forms) 1)) (cat! str ", ")))
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
	(if (= c "-") (set c "_"))
	(cat! id2 c))
      (set i (+ i 1)))
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
  (if (empty? form)
      ((compiler 'list) form) ; ()
    (let (f (hd form)
          f1 (compile f)
          args (compile-args (tl form) true))
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
            (if (< i (- (length args) 1)) 
                (cat! str " " op1 " ")))))
    (cat str ")")))

(define compile-branch (condition body first? last? tail?)
  (let (cond1 (compile condition)
        body1 (with-indent (compile body true tail?))
        ind (indentation)
        tr (if (and last? (= target 'lua))
               (cat ind "end\n")
               last? "\n"
             ""))
    (if (and first? (= target 'js))
        (cat ind "if (" cond1 ") {\n" body1 ind "}" tr)
        first?
        (cat ind "if " cond1 " then\n" body1 tr)
        (and (nil? condition) (= target 'js))
        (cat " else {\n" body1 ind "}\n")
        (nil? condition)
        (cat ind "else\n" body1 tr)
        (= target 'js)
        (cat " else if (" cond1 ") {\n" body1 ind "}" tr)
      (cat ind "elseif " cond1 " then\n" body1 tr))))

(define compile-function (args body name)
  (set name (or name ""))
  (let (args1 (compile-args args)
        body1 (with-indent (compile-body body true))
        ind (indentation))
    (if (= target 'js)
        (cat "function " name args1 " {\n" body1 ind "}")
      (cat "function " name args1 "\n" body1 ind "end"))))

(define quote-form (form)
  (if (atom? form)
      (if (string-literal? form)
          (let (str (sub form 1 (- (length form) 1)))
            (cat "\"\\\"" str "\\\"\""))
        (string? form) (cat "\"" form "\"")
        (to-string form))
    ((compiler 'list) form 0)))

(define terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt? tail?)
  (let (name (hd form))
    (if (and (not stmt?) (statement? name))
        (compile `((function () ,form)) false tail?)
      (let (tr (terminator (and stmt? (not (self-terminating? name)))))
        (cat ((compiler name) (tl form) tail?) tr)))))

(define special (table))

(define special? (form)
  (and (list? form) (is? (get special (hd form)))))

(define-macro define-special (name keys args body...)
  `(set (get special ',name)
        (table compiler (fn ,args ,@body)
               ,@(mapi (fn (k) (splice (list k true))) keys))))

(define compiler (name) (get (get special name) 'compiler))
(define statement? (name) (get (get special name) 'statement))
(define self-terminating? (name) (get (get special name) 'terminated))

(define-special do (statement terminated) (forms tail?)
  (compile-body forms tail?))

(define-special if (statement terminated) (form tail?)
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

(define-special while (statement terminated) (form)
  (let (condition (compile (hd form))
        body (with-indent (compile-body (tl form)))
        ind (indentation))
    (if (= target 'js)
	(cat ind "while (" condition ") {\n" body ind "}\n")
      (cat ind "while " condition " do\n" body ind "end\n"))))

(define-special break (statement) (form)
  (cat (indentation) "break"))

(define-special function () ((args body...))
  (compile-function args body))

(define macros "")

(define-special define-macro (statement terminated) ((name args body...))
  (let (macro `(setenv ',name (fn ,args ,@body)))
    (eval (compile-for-target (language) macro))
    (if embed-macros?
	(cat! macros (compile-toplevel macro))))
  "")

(define-special return (statement) (form)
  (cat (indentation) (compile-call `(return ,@form))))

(define-special error (statement) ((expr))
  (let (e (if (= target 'js)
              (cat "throw " (compile expr))
            (compile-call `(error ,expr))))
    (cat (indentation) e)))

(define-special local (statement) ((name value))
  (let (id (identifier name)
	keyword (if (= target 'js) "var " "local ")
        ind (indentation))
    (if (nil? value)
	(cat ind keyword id)
      (cat ind keyword id " = " (compile value)))))

(define-special for (statement terminated) (((t k v) body...))
  (let (t1 (compile t)
        ind (indentation))
    (if (= target 'lua)
	(let (body1 (with-indent (compile-body body)))
	  (cat ind "for " k ", " v " in pairs(" t1 ") do\n" body1 ind "end\n"))
      (let (body1 (with-indent (compile-body `((set ,v (get ,t ,k)) ,@body))))
	(cat ind "for (" k " in " t1 ") {\n" body1 ind "}\n")))))

(define-special set (statement) ((lh rh))
  (if (nil? rh)
      (error "Missing right-hand side in assignment"))
  (cat (indentation) (compile lh) " = " (compile rh)))

(define-special get () ((object key))
  (let (o (compile object)
	k (compile key))
    (if (and (= target 'lua)
	     (= (char o 0) "{"))
	(set o (cat "(" o ")")))
    (cat o "[" k "]")))

(define-special not () ((expr))
  (let (e (compile expr)
	open (if (= target 'js) "!(" "(not "))
    (cat open e ")")))

(define-special list () (forms depth)
  (let (open (if (= target 'lua) "{" "[")
	close (if (= target 'lua) "}" "]")
	str "")
    (across (forms x i)
      (cat! str (if (quoting? depth) (quote-form x) (compile x)))
      (if (< i (- (length forms) 1)) (cat! str ", ")))
    (cat open str close)))

(define-special table () (forms)
  (let (sep (if (= target 'lua) " = " " : ")
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
	(if (< i (- (length forms) 2)) (cat! str ", "))
	(set i (+ i 2))))
    (cat str "}")))

(define-special quote () ((form)) (quote-form form))

(define can-return? (form)
  (if (special? form)
      (not (statement? (hd form)))
    true))

(define compile (form stmt? tail?)
  (let (tr (terminator stmt?)
        ind (if stmt? (indentation) ""))
    (if (and tail? (can-return? form))
	(set form `(return ,form)))
    (if (nil? form) ""
        (atom? form) (cat ind (compile-atom form) tr)
        (operator? form) (cat ind (compile-operator form) tr)
        (special? form) (compile-special form stmt? tail?)
      (cat ind (compile-call form) tr))))

(define compile-file (file)
  (let (form nil
	output ""
	s (make-stream (read-file file)))
    (while true
      (set form (read s))
      (if (= form eof) (break))
      (let (result (compile-toplevel form))
	(cat! output result)))
    output))

(define compile-files (files)
  (let (output "")
    (across (files file)
      (cat! output (compile-file file)))
    output))

(define compile-toplevel (form)
  (let (form1 (compile (macroexpand form) true false true))
    (if (= form1 "") ""
      (cat form1 "\n"))))

(define compile-for-target (target1 form)
  (let (previous target)
    (set target target1)
    (let (result (compile-toplevel form))
      (set target previous)
      result)))
