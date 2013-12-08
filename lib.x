;; -*- mode: lisp -*-

;; environment

(global environment (list (table)))

(macro setenv! (k v)
  `(set! (get (last environment) ,k) ,v))

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

(global macro? (k)
  (function? (getenv k)))

(define variable? (k)
  (= (get (last environment) k) variable))

(global bound? (x)
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
	locals ())
    (while (< i (length bindings))
      (let (id (at bindings i))
	(if (bound? id)
	    (let (rename (make-id))
	      (push renames (list id rename))
	      (set! id rename))
	  (setenv! id variable))
	(push locals `(local ,id ,(at bindings (+ i 1)))))
      (set! i (+ i 2)))
    `(let-symbol ,renames ,@(join locals body))))

(macro let-macro (definitions body...)
  (push environment (table))
  (let (embed? embed-macros?)
    (set! embed-macros? false)
    (map (fn (m) ((compiler 'macro) m)) definitions)
    (set! embed-macros? embed?))
  (let (body1 (macroexpand body))
    (pop environment)
    `(do ,@body1)))

(macro let-symbol (expansions body...)
  (push environment (table))
  (map (fn (pair)
	 (setenv! (at pair 0) (at pair 1)))
       expansions)
  (let (body1 (macroexpand body))
    (pop environment)
    `(do ,@body1)))

(macro symbol (name expansion)
  (setenv! name expansion)
  nil)

(macro global (name x body...)
  (if (empty? body)
      `(set! ,name ,x)
    (let (expanded (bind-arguments x body))
      `(global-function ,name ,(at expanded 0) ,@(at expanded 1)))))

(macro define (name x body...)
  (if (empty? body)
      `(local ,name ,x)
    (let (expanded (bind-arguments x body))
      `(local-function ,name ,(at expanded 0) ,@(at expanded 1)))))

(macro fn (args body...)
  (let (expanded (bind-arguments args body))
    `(function ,(at expanded 0) ,@(at expanded 1))))

(macro bind (list value)
  (if (list? value)
      (let (v (make-id))
	`(do (local ,v ,value)
	     ,@(bind1 list value)))
    `(do ,@(bind1 list value))))

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

(global bind-arguments (args body)
  (let (args1 ())
    (across (args arg)
      (if (vararg? arg)
	  (let (v (vararg-name arg)
		expr
		(if (= target 'js)
		    `(Array.prototype.slice.call arguments ,(length args1))
		  (do (push args1 '...) '(list ...))))
	      (set! body `((local ,v ,expr) ,@body))
	      break) ; no more args allowed
          (list? arg)
	  (let (v (make-id))
	    (push args1 v)
	    (set! body `((bind ,arg ,v) ,@body)))
	(push args1 arg)))
    (list args1 body)))

(global bind1 (list value)
  (let (forms ())
    (across (list x i)
      (if (list? x)
	  (set! forms (join forms (bind1 x `(at ,value ,i))))
          (vararg? x)
	  (let (v (vararg-name x))
	    (push forms `(local ,v (sub ,value ,i)))
	    break) ; no more args
	(push forms `(local ,x (at ,value ,i)))))
    forms))

;; languages

(macro language () `',target)
(global target (language))

(macro target (clauses...)
  (find (fn (x)
	  (if (= (at x 0) target) (at x 1)))
	clauses))

;; sequences

(global length (x)
  (target (js x.length) (lua #x)))

(global empty? (list)
  (= (length list) 0))

(global sub (x from upto)
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

(global push (arr x)
  (target (js (arr.push x)) (lua (table.insert arr x))))

(global pop (arr)
  (target (js (arr.pop)) (lua (table.remove arr))))

(global last (arr)
  (at arr (- (length arr) 1)))

(global join (a1 a2)
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

(global reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (at x 0)
    (f (at x 0) (reduce f (sub x 1)))))

(global keep (f a)
  (let (a1 ())
    (across (a x) (if (f x) (push a1 x)))
    a1))

(global find (f a)
  (across (a x)
    (let (x1 (f x))
      (if x1 (return x1)))))

(global map (f a)
  (let (a1 ())
    (across (a x) (push a1 (f x)))
    a1))

(global collect (f a)
  (let (a1 ())
    (across (a x) (set! a1 (join a1 (f x))))
    a1))

(macro join* (xs...)
  (reduce (fn (a b) (list 'join a b)) xs))

(macro list* (xs...)
  (if (= (length xs) 0)
      ()
    (let (t ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set! t (list 'join (join '(list) t) x))
	  (push t x)))
      t)))

;; strings

(global char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(global search (str pattern start)
  (target
   (js (let (i (str.indexOf pattern start))
	 (if (>= i 0) i)))
   (lua (do (if start (set! start (+ start 1)))
	    (let (i (string.find str pattern start true))
	      (and i (- i 1)))))))

(global split (str sep)
  (target
   (js (str.split sep))
   (lua (let (strs ())
	  (while true
	    (let (i (search str sep))
	      (if (nil? i)
		  break
		(do (push strs (sub str 0 i))
		    (set! str (sub str (+ i 1)))))))
	  (push strs str)
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

(global nil? (x) (= x nil))
(global is? (x) (not (nil? x)))
(global string? (x) (= (type x) 'string))
(global string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(global number? (x) (= (type x) 'number))
(global boolean? (x) (= (type x) 'boolean))
(global function? (x) (= (type x) 'function))
(global composite? (x) (= (type x) (target (js 'object) (lua 'table))))
(global atom? (x) (not (composite? x)))
(global table? (x) (and (composite? x) (nil? (at x 0))))
(global list? (x) (and (composite? x) (is? (at x 0))))

;; numbers

(global parse-number (str)
  (target
   (js (let (n (parseFloat str))
	 (if (not (isNaN n)) n)))
   (lua (tonumber str))))

;; printing

(global to-string (x)
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

(target (js (global error (msg) (throw msg) nil)))
(target (js (global type (x) (typeof x))))

(global apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(global id-counter 0)

(global make-id (prefix)
  (set! id-counter (+ id-counter 1))
  (cat "_" (or prefix "") id-counter))

(global eval-result nil)

(target
 (lua (global eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (let (y (cat "eval_result=" x)
	      f (load y))
	  (if f
	      (do (f) eval-result)
	    (let (f,e (load x))
	      (if f (f) (error (cat e " in " x)))))))))
