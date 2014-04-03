;; -*- mode: lisp -*-

;; TODO:
;;  Properties in JOIN
;;  MAPI usage vs. ACROSS, SPLICE, MERGE

;; environment

(define environment (list (table)))

(define setenv (k v)
  (set (get (last environment) k) v))

(define getenv (k)
  (let (i (- (length environment) 1))
    (while (>= i 0)
      (let (v (get (at environment i) k))
	(if v (return v)))
      (set i (- i 1)))))

(define variable (table))

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

(define embed-macros? false)

;; macros

(define-macro at (a i)
  (if (and (= target 'lua) (number? i))
      (set i (+ i 1))
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,a ,i))

(define-macro let (bindings body...)
  (let (i 0
	renames ()
	locals ())
    (map2
     (fn (lh rh)
       (across ((bind lh rh) (id val))
         (if (bound? id)
             (let (rename (make-id))
               (add renames id)
               (add renames rename)
               (set id rename))
           (setenv id variable))
         (add locals `(local ,id ,val))))
     bindings)
    `(let-symbol ,renames ,@(join locals body))))

(define-macro let-macro (definitions body...)
  (add environment (table))
  (let (embed? embed-macros?)
    (set embed-macros? false)
    (map (fn (m) ((compiler 'define-macro) m)) definitions)
    (set embed-macros? embed?))
  (let (body1 (macroexpand body))
    (drop environment)
    `(do ,@body1)))

(define-macro let-symbol (expansions body...)
  (add environment (table))
  (map2 (fn (name expr) (setenv name expr)) expansions)
  (let (body1 (macroexpand body))
    (drop environment)
    `(do ,@body1)))

(define-macro define-symbol (name expansion)
  (setenv name expansion)
  nil)

(define-macro define (name x body...)
  (if (not (empty? body))
      (set x `(fn ,x ,@body)))
  `(set ,name ,x))

(define-macro fn (args body...)
  (let ((args1 body1) (bind-arguments args body))
    `(function ,args1 ,@body1)))

(define-macro across ((list v i start) body...)
  (let (l (make-id))
    (set i (or i (make-id)))
    (set start (or start 0))
    `(let (,i ,start ,l ,list)
       (while (< ,i (length ,l))
	 (let (,v (at ,l ,i))
	   ,@body
	   (set ,i (+ ,i 1)))))))

(define-macro set-of elements
  `(table ,@(merge (fn (x) (list x true)) elements)))

;; macro helpers

(define vararg? (x)
  (and (> (length x) 3)
       (= (sub x (- (length x) 3) (length x)) "...")))

(define vararg-name (x)
  (sub x 0 (- (length x) 3)))

(define stash (args)
  (if (keys? args)
      (let (p (properties args))
        (set (get p '_stash) true)
        (join args (list p)))
    args))

(define unstash (args)
  (if (empty? args)
      ()
    (let (l (last args))
      (if (and (composite? l) (get l '_stash))
          (let (args1 (sub args 0 (- (length args) 1)))
            (mapk (fn (k v)
                    (if (~= k '_stash)
                        (set (get args1 k) v)))
                  l)
            args1)
        args))))

(define bind-arguments (args body)
  (let (args1 ()
        rest (fn ()
               (if (= target 'js)
                   `(unstash (sub arguments ,(length args1)))
                 (do (add args1 '...)
                     '(unstash (list ...))))))
    (if (atom? args)
        (list args1 `((let ,(list args (rest)) ,@body)))
      (let (bindings ())
        (across (args arg)
          (if (vararg? arg)
              (let (v (vararg-name arg)
                    expr (rest))
                (join! bindings (list v expr))
                break)                  ; no more args allowed
            (list? arg)
            (let (v (make-id))
              (add args1 v)
              (join! bindings (list arg v)))
            (add args1 arg)))
        (if (empty? bindings)
            (list args1 body)
          (list args1 `((let ,bindings ,@body))))))))

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

;; expansion

(define quoting? (depth) (number? depth))
(define quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(define-macro with-scope ((bound) expr)
  (let (result (make-id)
	arg (make-id))
    `(do (add environment (table))
	 (across (,bound ,arg)
	   (setenv ,arg variable))
	 (let (,result ,expr)
	   (drop environment)
	   ,result))))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define macroexpand (form)
  (if ;; expand symbol macro
      (symbol-macro? form) (macroexpand (getenv form))
      ;; atom
      (atom? form) form
    (let (name (at form 0))
      (if ;; pass-through
	  (= name 'quote) form
	  (= name 'define-macro) form
	  ;; expand macro
	  (macro? name)
          (macroexpand (apply (getenv name) (sub form 1)))
	  ;; scoped forms
	  (or (= name 'function)
	      (= name 'for))
	  (let ((_ args body...) form)
	    (with-scope (args)
	      `(,name ,args ,@(macroexpand body))))
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
	  (do (add xs (quasiexpand (at x 1)))
	      (add xs '(list)))
	(add (last xs) (quasiexpand x depth))))
    (if (= (length xs) 1)		; no splicing needed
	(at xs 0)
      ;; join all
      (reduce (fn (a b) (list 'join a b))
	      ;; remove empty lists
	      (keep (fn (x)
                      (or (empty? x)
                          (not (and (= (length x) 1)
                                    (= (at x 0) 'list)))))
                    xs)))))

;; languages

(define-macro language () `',target)
(define target (language))

(define-macro target clauses
  (find (fn (x)
	  (if (= (at x 0) target) (at x 1)))
	clauses))

;; sequences

(define length (x)
  (target (js x.length) (lua #x)))

(define empty? (x)
  (= (length x) 0))

(define sub (x from upto)
  (set from (or from 0))
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
    (let (l (target
             (js (Array.prototype.slice.call x from upto))
             (lua
              (do (set upto (or upto (length x)))
                  (let (i from j 0 x2 ())
                    (while (< i upto)
                      (set (at x2 j) (at x i))
                      (set i (+ i 1))
                      (set j (+ j 1)))
                    x2)))))
      (mapk (fn (k v)
              (set (get l k) v))
            x)
      l)))

;; lists

(define add (a x)
  (target (js (a.push x)) (lua (table.insert a x))))

(define drop (a)
  (target (js (a.pop)) (lua (table.remove a))))

(define shift (a)
  (target (js (a.shift)) (lua (table.remove a 1))))

(define last (a)
  (at a (- (length a) 1)))

(define join (a1 a2)
  (if (nil? a1) a2
      (nil? a2) a1
    (let (a3 ())
      (target
       (js (set a3 (a1.concat a2)))
       (lua
        (let (i 0 len (length a1))
          (while (< i len)
            (set (at a3 i) (at a1 i))
            (set i (+ i 1)))
          (while (< i (+ len (length a2)))
            (set (at a3 i) (at a2 (- i len)))
            (set i (+ i 1))))))
      ;; (let (f (fn (k v)
      ;;           (set (get a3 k) v)))
      ;;   (map f (properties a1))
      ;;   (map f (properties a2)))
      a3)))

(define reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (at x 0)
    (f (at x 0) (reduce f (sub x 1)))))

(define keep (f a)
  (let (a1 ())
    (across (a x) (if (f x) (add a1 x)))
    a1))

(define find (f a)
  (across (a x)
    (let (x1 (f x))
      (if x1 (return x1)))))

(define map2 (f a)
  (let (i 0
        a1 ())
    (while (< i (length a))
      (add a1 (f (at a i) (at a (+ i 1))))
      (set i (+ i 2)))
    a1))

(define iterate (f count)
  (let (i 0)
    (while (< i count)
      (f i)
      (set i (+ i 1)))))

(define-macro join* xs
  (reduce (fn (a b) (list 'join a b)) xs))

(define-macro join! (a bs...)
  `(set ,a (join* ,a ,@bs)))

(define merge (f a)
  (let (a1 ())
    (across (a x) (join! a1 (f x)))
    a1))

(define-macro list* xs
  (if (empty? xs)
      ()
    (let (t ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set t (list 'join (join '(list) t) x))
	  (add t x)))
      t)))

;; tables

(define-macro each ((t k v) body...)
  `(for (,t ,k ,v)
     (if (target
          (lua (not (number? ,k)))
          (js (isNaN (parseInt ,k))))
         (do ,@body))))

(define pair (k v)
  (table _key k _value v))

(define pair? (x)
  (and (composite? x)
       (let (k (get x '_key)
             v (get x '_value))
         (and (is? k) (is? v) (list k v)))))

(define splice (x)
  (table _splice x))

(define splice? (x)
  (and (composite? x) (is? (get x '_splice))))

(define map (f t)
  (let (t1 ()
        acc (fn (k v)
              (let (x (f k v)
                    p (pair? x))
                (if p
                    (let ((k1 v1) p)
                      (set (get t1 k1) v1))
                    (splice? x) (join! t1 x)
                    (is? x) (add t1 x)))))
    (across (t x)
      (acc x))
    (each (t k v)
      (acc k v))
    t1))

(define mapi (f t)
  (map (fn (k v)
         (if (nil? v) (f k)))
       t))

(define mapk (f t)
  (map (fn (k v)
         (if (is? v) (f k v)))
       t))

(define keys? (t)
  (let (k? false)
    (each (t k v)
      (set k? true)
      break)
    k?))

(define properties (t)
  (map (fn (k v)
         (if (is? v) (pair k v)))
       t))

(define-macro make body
  (let (l `(list ,@body))
    (if (not (keys? body))
        l
      (let (id (make-id))
        `(let (,id ,l)
           ,@(mapk (fn (k v)
                     `(set (get ,id ',k) ,v))
                   body)
           ,id)))))

;; strings

(define char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(define search (str pattern start)
  (target
   (js (let (i (str.indexOf pattern start))
	 (if (>= i 0) i)))
   (lua (do (if start (set start (+ start 1)))
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
		(do (add strs (sub str 0 i))
		    (set str (sub str (+ i 1)))))))
	  (add strs str)
	  strs))))

(define-macro cat! (a bs...)
  `(set ,a (cat ,a ,@bs)))

;; io

(target (js (define fs (require 'fs))))

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
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (str "(" x1 (sub x))
      (mapk (fn (k v)
              (add x1 (cat k ":"))
              (add x1 v))
            x)
      (across (x1 y i)
        (cat! str (to-string y))
        (if (< i (- (length x1) 1))
            (cat! str " ")))
      (cat str  ")"))))

(define-macro pr xs
  `(print (cat ,@(map (fn (x) `(to-string ,x)) xs))))

;; misc

(target (js (define type (x) (typeof x))))

(define apply (f args)
  (let (args1 (stash args))
    (target (js (f.apply f args1)) (lua (f (unpack args1))))))

(define id-counter 0)

(define make-id (prefix)
  (set id-counter (+ id-counter 1))
  (cat "_" (or prefix "") id-counter))

(define eval-result nil)

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
