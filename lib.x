;; -*- mode: lisp -*-

;; top-level environment

(defun make-environment ()
  (list (table)))

(defvar macros (make-environment))
(defvar scopes (make-environment))
(defvar symbol-macros (make-environment))
(defvar embed-macros? false)

;; macros

(defmacro at (arr i)
  (if (and (= target 'lua) (number? i))
      (set i (+ i 1))
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,arr ,i))

(defmacro let (bindings body...)
  (let (renames ()
        scope (last scopes)
	i 0
	locals ())
    (while (< i (length bindings))
      (let (id (at bindings i))
	(if (get scope id)
	    (let (rename (make-id))
	      (push renames (list id rename))
	      (set id rename))
	  (set (get scope id) true))
	(push locals `(local ,id ,(at bindings (+ i 1)))))
      (set i (+ i 2)))
    `(symbol-macrolet ,renames ,@(join locals body))))

(defmacro macrolet (definitions body...)
  (pushenv macros)
  (let (embed? embed-macros?)
    (set embed-macros? false)
    (map (lambda (macro)
	   ((compiler 'defmacro) macro))
	 definitions)
    (set embed-macros? embed?))
  (let (body1 (macroexpand body))
    (popenv macros)
    `(do ,@body1)))

(defmacro symbol-macrolet (expansions body...)
  (pushenv symbol-macros)
  (map (lambda (pair)
	 (setenv symbol-macros (at pair 0) (at pair 1)))
       expansions)
  (let (body1 (macroexpand body))
    (popenv symbol-macros)
    `(do ,@body1)))

(defmacro define-symbol-macro (name expansion)
  (setenv symbol-macros name expansion)
  nil)

(defmacro defvar (name value)
  `(set ,name ,value))

(defmacro bind (list value)
  (if (list? value)
      (let (v (make-id))
	`(do (local ,v ,value)
	     ,@(bind1 list value)))
    `(do ,@(bind1 list value))))

(defmacro across ((list v i start) body...)
  (let (l (make-id))
    (set i (or i (make-id)))
    (set start (or start 0))
    `(let (,i ,start ,l ,list)
       (while (< ,i (length ,l))
	 (let (,v (at ,l ,i))
	   ,@body
	   (set ,i (+ ,i 1)))))))

(defmacro make-set (elements...)
  `(table ,@(collect (lambda (x) (list x true)) elements)))

;; macro helpers

(defun vararg? (name)
  (= (sub name (- (length name) 3) (length name)) "..."))

(defun bind1 (list value)
  (let (forms ())
    (across (list x i)
      (if (list? x)
	  (set forms (join forms (bind1 x `(at ,value ,i))))
          (vararg? x)
	  (let (v (sub x 0 (- (length x) 3)))
	    (push forms `(local ,v (sub ,value ,i)))
	    break) ; no more args
	(push forms `(local ,x (at ,value ,i)))))
    forms))

;; languages

(defmacro language () `',target)
(defvar target (language))

(defmacro target (clauses...)
  (find (lambda (x)
	  (if (= (at x 0) target) (at x 1)))
	clauses))

;; sequences

(defun length (x)
  (target (js x.length) (lua #x)))

(defun empty? (list)
  (= (length list) 0))

(defun sub (x from upto)
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
    (target
     (js (x.slice from upto))
     (lua
      (do (set upto (or upto (length x)))
	  (let (i from j 0 x2 ())
	    (while (< i upto)
	      (set (at x2 j) (at x i))
	      (set i (+ i 1))
	      (set j (+ j 1)))
	    x2))))))

;; lists

(defun push (arr x)
  (target (js (arr.push x)) (lua (table.insert arr x))))

(defun pop (arr)
  (target (js (arr.pop)) (lua (table.remove arr))))

(defun last (arr)
  (at arr (- (length arr) 1)))

(defun join (a1 a2)
  (target
   (js (a1.concat a2))
   (lua
    (let (i 0 len (length a1) a3 ())
      (while (< i len)
	(set (at a3 i) (at a1 i))
	(set i (+ i 1)))
      (while (< i (+ len (length a2)))
	(set (at a3 i) (at a2 (- i len)))
	(set i (+ i 1)))
      a3))))

(defun reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (at x 0)
    (f (at x 0) (reduce f (sub x 1)))))

(defun filter (f a)
  (let (a1 ())
    (across (a x) (if (f x) (push a1 x)))
    a1))

(defun find (f a)
  (across (a x)
    (let (x1 (f x))
      (if x1 (return x1)))))

(defun map (f a)
  (let (a1 ())
    (across (a x) (push a1 (f x)))
    a1))

(defun collect (f a)
  (let (a1 ())
    (across (a x) (set a1 (join a1 (f x))))
    a1))

(defmacro join* (xs...)
  (reduce (lambda (a b) (list 'join a b)) xs))

(defmacro list* (xs...)
  (if (= (length xs) 0)
      ()
    (let (t ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set t (list 'join (join '(list) t) x))
	  (push t x)))
      t)))

;; environments

(defun getenv (env k)
  (let (i (- (length env) 1))
    (while (>= i 0)
      (let (v (get (at env i) k))
	(if v (return v)))
      (set i (- i 1)))))

(defun setenv (env k v)
  (set (get (last env) k) v))

(defun pushenv (env) (push env (table)))
(defun popenv (env) (pop env))

;; strings

(defun char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(defun search (str pattern start)
  (target
   (js (let (i (str.indexOf pattern start))
	 (if (>= i 0) i)))
   (lua (do (if start (set start (+ start 1)))
	    (let (i (string.find str pattern start true))
	      (and i (- i 1)))))))

(defun split (str sep)
  (target
   (js (str.split sep))
   (lua (let (strs ())
	  (while true
	    (let (i (search str sep))
	      (if (= i nil)
		  break
		(do (push strs (sub str 0 i))
		    (set str (sub str (+ i 1)))))))
	  (push strs str)
	  strs))))

(defmacro cat! (a bs...)
  `(set ,a (cat ,a ,@bs)))

;; io

(target (js (set fs (require 'fs))))

(defun read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (let (f (io.open path))
	   (f:read '*a)))))

(defun write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (let (f (io.open path 'w))
	   (f:write data)))))

(target (js (defun print (x) (console.log x))))

(defun write (x)
  (target (js (process.stdout.write x)) (lua (io.write x))))

(defun exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; predicates

(defun string? (x) (= (type x) 'string))
(defun string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(defun number? (x) (= (type x) 'number))
(defun boolean? (x) (= (type x) 'boolean))
(defun composite? (x) (= (type x) (target (js 'object) (lua 'table))))
(defun atom? (x) (not (composite? x)))
(defun table? (x) (and (composite? x) (= (at x 0) nil)))
(defun list? (x) (and (composite? x) (not (= (at x 0) nil))))

;; numbers

(defun parse-number (str)
  (target
   (js (let (n (parseFloat str))
	 (if (not (isNaN n)) n)))
   (lua (tonumber str))))

;; printing

(defun to-string (x)
  (if (= x nil) "nil"
      (boolean? x) (if x "true" "false")
      (atom? x) (cat x "")
      (table? x) "#<table>"
    (let (str "(")
      (across (x y i)
	(cat! str (to-string y))
	(if (< i (- (length x) 1))
	    (cat! str " ")))
      (cat str  ")"))))

;; misc

(target (js (defun error (msg) (throw msg) nil)))
(target (js (defun type (x) (typeof x))))

(defun apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(defvar id-counter 0)

(defun make-id (prefix)
  (set id-counter (+ id-counter 1))
  (cat "_" (or prefix "") id-counter))

(defvar eval-result nil)

(target
 (lua (defun eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (let (y (cat "eval_result=" x)
	      f (load y))
	  (if f
	      (do (f) eval-result)
	    (let (f,e (load x))
	      (if f (f) (error (cat e " in " x)))))))))
