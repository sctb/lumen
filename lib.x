;; -*- mode: lisp -*-

;; environment

(global environment (list (table)))

(define setenv! (k v)
  (set! (get (last environment) k) v))

(define getenv (k)
  (let (i (- (length environment) 1))
    (while (>= i 0)
      (let (v (get (at environment i) k))
	(if v (return v)))
      (set! i (- i 1)))))

(global variable (table))

(define symbol-macro? (k)
  (let (v (getenv k))
    (and (is? v)
	 (not (= v variable))
	 (not (macro? k)))))

(define macro? (k)
  (function? (getenv k)))

(define variable? (k)
  (= (get (last environment) k) variable))

(define bound? (x)
  (or (symbol-macro? x)
      (macro? x)
      (variable? x)))

(global embed-macros? false)

;; macros

(macro at (arr i)
  (if (and (= target 'lua) (number? i))
      (set! i (+ i 1))
      (= target 'lua)
      (set! i `(+ ,i 1)))
  `(get ,arr ,i))

(macro let (bindings body...)
  (let (i 0
	renames ()
	locals ()
	bindings1 ())
    (while (< i (length bindings))
      (let (lh (at bindings i)
	    rh (at bindings (+ i 1)))
       (join! bindings1 (bind lh rh)))
      (set! i (+ i 2)))
    (across (bindings1 (id rh))
      (if (bound? id)
	  (let (rename (make-id))
	    (push! renames (list id rename))
	    (set! id rename))
	(setenv! id variable))
      (push! locals `(local ,id ,rh)))
    `(let-symbol ,renames ,@(join locals body))))

(macro let-macro (definitions body...)
  (push! environment (table))
  (let (embed? embed-macros?)
    (set! embed-macros? false)
    (map (fn (m) ((compiler 'macro) m)) definitions)
    (set! embed-macros? embed?))
  (let (body1 (macroexpand body))
    (pop! environment)
    `(do ,@body1)))

(macro let-symbol (expansions body...)
  (push! environment (table))
  (map (fn ((name expr)) (setenv! name expr)) expansions)
  (let (body1 (macroexpand body))
    (pop! environment)
    `(do ,@body1)))

(macro symbol (name expansion)
  (setenv! name expansion)
  nil)

(macro global (name value)
  `(set! ,name ,value))

(macro define (name x body...)
  (if (empty? body)
      `(local ,name ,x)
    (let ((args body1) (bind-arguments x body))
      `(function-definition ,name ,args ,@body1))))

(macro fn (args body...)
  (let ((args1 body1) (bind-arguments args body))
    `(function ,args1 ,@body1)))

(macro across ((list v i start) body...)
  (let (l (make-id))
    (set! i (or i (make-id)))
    (set! start (or start 0))
    `(let (,i ,start ,l ,list)
       (while (< ,i (length ,l))
	 (let (,v (at ,l ,i))
	   ,@body
	   (set! ,i (+ ,i 1)))))))

(macro set (elements...)
  `(table ,@(collect (fn (x) (list x true)) elements)))

;; macro helpers

(define vararg? (x)
  (and (> (length x) 3)
       (= (sub x (- (length x) 3) (length x)) "...")))

(define vararg-name (x)
  (sub x 0 (- (length x) 3)))

(define bind-arguments (args body)
  (let (args1 ()
	bindings ())
    (across (args arg)
      (if (vararg? arg)
	  (let (v (vararg-name arg)
		expr
		(if (= target 'js)
		    `(Array.prototype.slice.call arguments ,(length args1))
		  (do (push! args1 '...) '(list ...))))
	    (join! bindings (list v expr))
	    break) ; no more args allowed
          (list? arg)
	  (let (v (make-id))
	    (push! args1 v)
	    (join! bindings (list arg v)))
	(push! args1 arg)))
    (if (empty? bindings)
	(list args1 body)
      (list args1 `((let ,bindings ,@body))))))

(define bind (lh rh)
  (if (and (list? lh) (list? rh))
      (let (id (make-id))
	`((,id ,rh) ,@(bind lh id)))
      (atom? lh) `((,lh ,rh))
    (let (bindings ())
      (across (lh x i)
	(let (b (if (vararg? x)
		    `((,(vararg-name x) (sub ,rh ,i)))
		  (bind x `(at ,rh ,i))))
	  (join! bindings b)))
      bindings)))

;; languages

(macro language () `',target)
(global target (language))

(macro target (clauses...)
  (find (fn (x)
	  (if (= (at x 0) target) (at x 1)))
	clauses))

;; sequences

(define length (x)
  (target (js x.length) (lua #x)))

(define empty? (x)
  (= (length x) 0))

(define sub (x from upto)
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
    (target
     (js (x.slice from upto))
     (lua
      (do (set! upto (or upto (length x)))
	  (let (i from j 0 x2 ())
	    (while (< i upto)
	      (set! (at x2 j) (at x i))
	      (set! i (+ i 1))
	      (set! j (+ j 1)))
	    x2))))))

;; lists

(define push! (arr x)
  (target (js (arr.push x)) (lua (table.insert arr x))))

(define pop! (arr)
  (target (js (arr.pop)) (lua (table.remove arr))))

(define last (arr)
  (at arr (- (length arr) 1)))

(define join (a1 a2)
  (target
   (js (a1.concat a2))
   (lua
    (let (i 0 len (length a1) a3 ())
      (while (< i len)
	(set! (at a3 i) (at a1 i))
	(set! i (+ i 1)))
      (while (< i (+ len (length a2)))
	(set! (at a3 i) (at a2 (- i len)))
	(set! i (+ i 1)))
      a3))))

(define reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (at x 0)
    (f (at x 0) (reduce f (sub x 1)))))

(define keep (f a)
  (let (a1 ())
    (across (a x) (if (f x) (push! a1 x)))
    a1))

(define find (f a)
  (across (a x)
    (let (x1 (f x))
      (if x1 (return x1)))))

(define map (f a)
  (let (a1 ())
    (across (a x) (push! a1 (f x)))
    a1))

(macro join* (xs...)
  (reduce (fn (a b) (list 'join a b)) xs))

(macro join! (a bs...)
  `(set! ,a (join* ,a ,@bs)))

(define collect (f a)
  (let (a1 ())
    (across (a x) (join! a1 (f x)))
    a1))

(macro list* (xs...)
  (if (= (length xs) 0)
      ()
    (let (t ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set! t (list 'join (join '(list) t) x))
	  (push! t x)))
      t)))

;; strings

(define char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(define search (str pattern start)
  (target
   (js (let (i (str.indexOf pattern start))
	 (if (>= i 0) i)))
   (lua (do (if start (set! start (+ start 1)))
	    (let (i (string.find str pattern start true))
	      (and i (- i 1)))))))

(define split (str sep)
  (target
   (js (str.split sep))
   (lua (let (strs ())
	  (while true
	    (let (i (search str sep))
	      (if (nil? i)
		  break
		(do (push! strs (sub str 0 i))
		    (set! str (sub str (+ i 1)))))))
	  (push! strs str)
	  strs))))

(macro cat! (a bs...)
  `(set! ,a (cat ,a ,@bs)))

;; io

(target (js (global fs (require 'fs))))

(define read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (let (f (io.open path))
	   (f:read '*a)))))

(define write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (let (f (io.open path 'w))
	   (f:write data)))))

(target (js (define print (x) (console.log x))))

(define write (x)
  (target (js (process.stdout.write x)) (lua (io.write x))))

(define exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; predicates

(define nil? (x) (= x nil))
(define is? (x) (not (nil? x)))
(define string? (x) (= (type x) 'string))
(define string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(define number? (x) (= (type x) 'number))
(define boolean? (x) (= (type x) 'boolean))
(define function? (x) (= (type x) 'function))
(define composite? (x) (= (type x) (target (js 'object) (lua 'table))))
(define atom? (x) (not (composite? x)))
(define table? (x) (and (composite? x) (nil? (at x 0))))
(define list? (x) (and (composite? x) (is? (at x 0))))

;; numbers

(define parse-number (str)
  (target
   (js (let (n (parseFloat str))
	 (if (not (isNaN n)) n)))
   (lua (tonumber str))))

;; printing

(define to-string (x)
  (if (nil? x) "nil"
      (boolean? x) (if x "true" "false")
      (atom? x) (cat x "")
      (function? x) "#<function>"
      (table? x) "#<table>"
    (let (str "(")
      (across (x y i)
	(cat! str (to-string y))
	(if (< i (- (length x) 1))
	    (cat! str " ")))
      (cat str  ")"))))

(macro pr (xs...)
  `(print (cat ,@(map (fn (x) `(to-string ,x)) xs))))

;; misc

(target (js (define error (msg) (throw msg) nil)))
(target (js (define type (x) (typeof x))))

(define apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(global id-counter 0)

(define make-id (prefix)
  (set! id-counter (+ id-counter 1))
  (cat "_" (or prefix "") id-counter))

(global eval-result nil)

(target
 (lua (define eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (let (y (cat "eval_result=" x)
	      f (load y))
	  (if f
	      (do (f) eval-result)
	    (let (f,e (load x))
	      (if f (f) (error (cat e " in " x)))))))))
