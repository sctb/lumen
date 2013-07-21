;; -*- mode: lisp -*-

(defmacro at (arr i)
  (if (and (= current-target 'lua) (number? i))
      (set i (+ i 1))
      (= current-target 'lua)
      (set i `(+ ,i 1)))
  `(get ,arr ,i))

(defmacro across (args body...)
  (local i (or (at args 2) (make-unique)))
  (local start (or (at args 3) 0))
  (local list (make-unique))
  `(do
    (local ,i ,start)
    (local ,list ,(at args 0))
    (while (< ,i (length ,list))
      (local ,(at args 1) (at ,list ,i))
      ,@body
      (set ,i (+ ,i 1)))))

(defmacro make-set (elements...)
  (local form '(table))
  (across (elements x)
    (push form x)
    (push form true))
  form)

;; languages

(defmacro current-language ()  `',current-target)
(set current-target (current-language))

(defmacro target (clauses...)
  (across (clauses clause)
    (if (= (at clause 0) current-target)
	(return (at clause 1)))))

;; sequences

(defun length (x)
  (target (js x.length) (lua #x)))

(defun sub (x from upto)
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
    (target
     (js (x.slice from upto))
     (lua
      (do (set upto (or upto (length x)))
	  (local i from)
	  (local j 0)
	  (local x2 '())
	  (while (< i upto)
	    (set (at x2 j) (at x i))
	    (set i (+ i 1))
	    (set j (+ j 1)))
	  x2)))))

;; lists

(defun push (arr x)
  (set (at arr (length arr)) x))

(defun join (a1 a2)
  (target
    (js (a1.concat a2))
    (lua
     (do (local a3 '())
	 (local i 0)
	 (local len (length a1))
	 (while (< i len)
	   (set (at a3 i) (at a1 i))
	   (set i (+ i 1)))
	 (while (< i (+ len (length a2)))
	   (set (at a3 i) (at a2 (- i len)))
	   (set i (+ i 1)))
	 a3))))

;; strings

(defun char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(defun find (str pattern start)
  (target
   (js (do (local i (str.indexOf pattern start))
	   (and (> i 0) i)))
   (lua (do (if start (set start (+ start 1)))
	    (local i (string.find str pattern start true))
	    (and i (- i 1))))))

;; io

(target (js (set fs (require 'fs))))

(defun read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (do (local f (io.open path))
	     (f:read '*a)))))

(defun write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (do (local f (io.open path 'w))
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
    (js (do (local n (parseFloat str))
	    (if (not (isNaN n)) n)))
    (lua (tonumber str))))

;; printing

(defun to-string (x)
  (if (= x nil) "nil"
      (boolean? x) (if x "true" "false")
      (atom? x) (cat x "")
      (table? x) "#<table>"
    (do (local str "(")
	(across (x y i)
	  (set str (cat str (to-string y)))
	  (if (< i (- (length x) 1))
	      (set str (cat str " "))))
	(cat str  ")"))))

;; misc

(target (js (defun error (msg) (throw msg) nil)))
(target (js (defun type (x) (typeof x))))

(defun apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(set unique-counter 0)

(defun make-unique (prefix)
  (set unique-counter (+ unique-counter 1))
  (cat "_" (or prefix "") unique-counter))

(set eval-result nil)

(target
 (lua (defun eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (local y (cat "eval_result=" x))
	(local f (load y))
	(if f
	    (do (f) eval-result)
	  (do (local f (load x)) (and f (f)))))))
