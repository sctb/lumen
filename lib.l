;; -*- mode: lisp -*-

;; environment

(define environment (list (table)))

(define setenv (k v)
  (set (get (last environment) k) v))

(define getenv (k)
  (if (string? k)
      (find (fn (e) (get e k))
            (reverse environment))))

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

(define-macro at (l i)
  (if (and (= target 'lua) (number? i))
      (inc i)
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,l ,i))

(define quoted (form)
  (if (atom? form)
      (if (string-literal? form)
          (cat "\"\\\"" (inner form) "\\\"\"")
          (string? form) (cat "\"" form "\"")
        form)
    `(list ,@(map* quoted form))))

(define-macro quote (form)
  (quoted form))

(define-macro list body
  (let (l `(array ,@body))
    (if (not (keys? body))
        l
      (let (id (make-id)
            init ())
        (each (body k v)
          (add init `(set (get ,id ',k) ,v)))
        `(let (,id ,l)
           ,@init
           ,id)))))

(define-macro table body
  (let (l ())
    (each (body k v)
      (add l k)
      (add l v))
    `(object ,@l)))

(define-macro let (bindings rest: body)
  (let (i 0
	renames ()
	locals ())
    (map (fn ((lh rh))
           (across ((bind lh rh) (id val))
             (if (bound? id)
                 (let (rename (make-id))
                   (add renames id)
                   (add renames rename)
                   (set id rename))
               (setenv id variable))
             (add locals `(local ,id ,val))))
         (pairwise bindings))
    `(do ,@locals (let-symbol ,renames ,@body))))

(define-macro let-macro (definitions rest: body)
  (add environment (table))
  (let (embed? embed-macros?)
    (set embed-macros? false)
    (map (fn (m)
           ((compiler 'define-macro) m))
         definitions)
    (set embed-macros? embed?))
  (let (body (macroexpand body))
    (drop environment)
    `(do ,@body)))

(define-macro let-symbol (expansions rest: body)
  (add environment (table))
  (map (fn ((name expr))
         (setenv name expr))
       (pairwise expansions))
  (let (body (macroexpand body))
    (drop environment)
    `(do ,@body)))

(define-macro define-symbol (name expansion)
  (setenv name expansion)
  nil)

(define-macro define (name x rest: body)
  (if (not (empty? body))
      (set x `(fn ,x ,@body)))
  `(set ,name ,x))

(define-macro fn (args rest: body)
  (let ((args body) (bind-arguments args body))
    `(function ,args ,@body)))

(define-macro across ((l v i start) rest: body)
  (let (l1 (make-id))
    (set i (or i (make-id)))
    (set start (or start 0))
    `(let (,i ,start ,l1 ,l)
       (while (< ,i (length ,l1))
	 (let (,v (at ,l1 ,i))
	   ,@body
	   (inc ,i))))))

(define-macro set-of elements
  `(object ,@(map (fn (x) (splice (list x true))) elements)))

;; macro helpers

(define stash (args)
  (if (keys? args)
      (let (p (object _stash true))
        (each (args k v)
          (set (get p k) v))
        (join args (list p)))
    args))

(define unstash (args)
  (if (empty? args)
      ()
    (let (l (last args))
      (if (and (composite? l) l._stash)
          (let (args1 (sub args 0 (- (length args) 1)))
            (each (l k v)
              (if (~= k '_stash)
                  (set (get args1 k) v)))
            args1)
        args))))

(define bind-arguments (args body)
  (let (args1 ()
        rest (fn ()
               (if (= target 'js)
                   `(unstash (sub arguments ,(length args1)))
                 (do (add args1 '|...|)
                     '(unstash (list |...|))))))
    (if (atom? args)
        (list args1 `((let ,(list args (rest)) ,@body)))
      (let (bs ())
        (across (args arg)
          (if (list? arg)
              (let (v (make-id))
                (add args1 v)
                (join! bs (list arg v)))
            (add args1 arg)))
        (let (r args.rest)
          (if r (join! bs (list r (rest)))))
        (if (empty? bs)
            (list args1 body)
          (list args1 `((let ,bs ,@body))))))))

(define bind (lh rh)
  (if (and (list? lh) (list? rh))
      (let (id (make-id))
	`((,id ,rh) ,@(bind lh id)))
      (atom? lh) `((,lh ,rh))
    (let (bs ())
      (across (lh x i)
        (join! bs (bind x `(at ,rh ,i))))
      (if lh.rest
          (join! bs (bind lh.rest `(sub ,rh ,(length lh)))))
      bs)))

;; expansion

(define quoting? (depth) (number? depth))
(define quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (list? x)
       (can-unquote? depth)
       (= (hd x) 'unquote-splicing)))

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
  (if (symbol-macro? form) (macroexpand (getenv form))
      (atom? form) form
    (let (name (hd form))
      (if (= name 'define-macro) form
	  (macro? name)
          (macroexpand (apply (getenv name) (tl form)))
	  (= name 'function)
	  (let ((_ args rest: body) form)
	    (with-scope (args)
	      `(,name ,args ,@(macroexpand body))))
        (map* macroexpand form)))))

(define quasiexpand (form depth)
  (if (quasiquoting? depth)
      (if (atom? form) (list 'quote form)
	  ;; unquote
	  (and (can-unquote? depth)
	       (= (hd form) 'unquote))
	  (quasiexpand (at form 1))
	  ;; decrease quasiquoting depth
	  (or (= (hd form) 'unquote)
	      (= (hd form) 'unquote-splicing))
	  (quasiquote-list form (- depth 1))
	  ;; increase quasiquoting depth
	  (= (hd form) 'quasiquote)
	  (quasiquote-list form (+ depth 1))
	(quasiquote-list form depth))
      (atom? form) form
      (= (hd form) 'quote) form
      (= (hd form) 'quasiquote)
      ;; start quasiquoting
      (quasiexpand (at form 1) 1)
    (map* (fn (x) (quasiexpand x depth)) form)))

(define quasiquote-list (form depth)
  (let (xs (list '(list)))
    (each (form k v)
      (let (v (if (quasisplice? v depth)
                  ;; don't splice, just expand
                  (quasiexpand (at v 1))
                (quasiexpand v depth)))
        (set (get (last xs) k) v)))
    ;; collect sibling lists
    (across (form x)
      (if (quasisplice? x depth)
	  (let (x (quasiexpand (at x 1)))
            (add xs x)
            (add xs '(list)))
	(add (last xs) (quasiexpand x depth))))
    (if (= (length xs) 1) (hd xs)
      (reduce (fn (a b)
                (list 'join a b))
	      ;; remove empty lists
	      (keep (fn (x)
                      (or (> (length x) 1)
                          (not (= (hd x) 'list))
                          (keys? x)))
                    xs)))))

;; languages

(define-macro language () `',target)
(define target (language))

(define-macro target clauses
  (get clauses target))

;; sequences

(define length (x)
  (target js: x.length lua: |#x|))

(define empty? (x)
  (= (length x) 0))

(define sub (x from upto)
  (let (from (or from 0))
    (if (string? x)
        (target
         js: (x.substring from upto)
         lua: (string.sub x (+ from 1) upto))
      (let (l (target
               js: (Array.prototype.slice.call x from upto)
               lua: (let (i from j 0 x2 ()
                          upto (or upto (length x)))
                      (while (< i upto)
                        (set (at x2 j) (at x i))
                        (inc i)
                        (inc j))
                      x2)))
        (each (x k v)
          (set (get l k) v))
        l))))

(define inner (x)
  (sub x 1 (- (length x) 1)))

;; lists

(define hd (l) (at l 0))
(define tl (l) (sub l 1))

(define add (l x)
  (target js: (l.push x) lua: (table.insert l x)))

(define drop (l)
  (target js: (l.pop) lua: (table.remove l)))

(define last (l)
  (at l (- (length l) 1)))

(define reverse (l)
  (let (l1 ()
        i (- (length l) 1))
    (while (>= i 0)
      (add l1 (at l i))
      (dec i))
    l1))

(define join (l1 l2)
  (if (nil? l1) l2
      (nil? l2) l1
    (let (l ())
      (target
       js: (set l (l1.concat l2))
       lua: (let (i 0 len (length l1))
              (while (< i len)
                (set (at l i) (at l1 i))
                (inc i))
              (while (< i (+ len (length l2)))
                (set (at l i) (at l2 (- i len)))
                (inc i))))
      (each (l1 k v)
        (set (get l k) v))
      (each (l2 k v)
        (set (get l k) v))
      l)))

(define reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define keep (f l)
  (let (l1 ())
    (across (l x) (if (f x) (add l1 x)))
    l1))

(define find (f l)
  (across (l x)
    (let (x (f x))
      (if x (return x)))))

(define pairwise (l)
  (let (i 0
        l1 ())
    (while (< i (length l))
      (add l1 (list (at l i) (at l (+ i 1))))
      (inc i 2))
    l1))

(define iterate (f count)
  (let (i 0)
    (while (< i count)
      (f i)
      (inc i))))

(define-macro join* xs
  (reduce (fn (a b) (list 'join a b)) xs))

(define-macro join! (a rest: bs)
  `(set ,a (join* ,a ,@bs)))

(define-macro list* xs
  (if (empty? xs)
      ()
    (let (l ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set l (list 'join (join '(list) l) x))
	  (add l x)))
      l)))

;; tables

(define-macro each ((t k v) rest: body)
  (let (t1 (make-id))
    `(let (,k nil ,t1 ,t)
       (for (,t1 ,k)
         (if (target
              js: (isNaN (parseInt ,k))
              lua: (not (number? ,k)))
             (let (,v (get ,t1 ,k))
               ,@body))))))

(define splice (x)
  (table _splice: x))

(define splice? (x)
  (if (table? x) x._splice))

(define map (f l)
  (let (l1 ())
    (across (l x)
      (let (x1 (f x)
            s (splice? x1))
        (if (list? s) (join! l1 s)
            (is? s) (add l1 s)
            (is? x1) (add l1 x1))))
    l1))

(define map* (f t)
  (let (l (map f t))
    (each (t k v)
      (set (get l k) (f v)))
    l))

(define keys? (t)
  (let (k? false)
    (each (t k v)
      (set k? true)
      (break))
    k?))

;; strings

(define char (str n)
  (target js: (str.charAt n) lua: (sub str n (+ n 1))))

(define code (str n)
  (target
   js: (str.charCodeAt n)
   lua: (string.byte str (if n (+ n 1)))))

(define search (str pattern start)
  (target
   js: (let (i (str.indexOf pattern start))
         (if (>= i 0) i))
   lua: (let (start (if start (+ start 1))
              i (string.find str pattern start true))
          (and i (- i 1)))))

(define split (str sep)
  (target
   js: (str.split sep)
   lua: (if (or (= str "") (= sep ""))
            ()
          (let (strs ())
            (while true
              (let (i (search str sep))
                (if (nil? i) (break)
                  (do (add strs (sub str 0 i))
                      (set str (sub str (+ i 1)))))))
            (add strs str)
            strs))))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

;; io

(target js: (define fs (require 'fs)))

(define read-file (path)
  (target
    js: (fs.readFileSync path 'utf8)
    lua: (let (f (io.open path))
	   (f.read f '*a))))

(define write-file (path data)
  (target
    js: (fs.writeFileSync path data 'utf8)
    lua: (let (f (io.open path 'w))
           (f.write f data))))

(target js: (define print (x) (console.log x)))

(define write (x)
  (target js: (process.stdout.write x) lua: (io.write x)))

(define exit (code)
  (target js: (process.exit code) lua: (os.exit code)))

;; predicates

(define nil? (x) (= x nil))
(define is? (x) (not (nil? x)))
(define string? (x) (= (type x) 'string))
(define string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(define id-literal? (x) (and (string? x) (= (char x 0) "|")))
(define number? (x) (= (type x) 'number))
(define boolean? (x) (= (type x) 'boolean))
(define function? (x) (= (type x) 'function))
(define composite? (x) (= (type x) (target js: 'object lua: 'table)))
(define atom? (x) (not (composite? x)))
(define table? (x) (and (composite? x) (nil? (hd x))))
(define list? (x) (and (composite? x) (is? (hd x))))

;; numbers

(define parse-number (str)
  (target
   js: (let (n (parseFloat str))
         (if (not (isNaN n)) n))
   lua: (tonumber str)))

(define-macro inc (n by)
  `(set ,n (+ ,n ,(or by 1))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(or by 1))))

;; printing

(define to-string (x)
  (if (nil? x) "nil"
      (boolean? x) (if x "true" "false")
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (str "("
          x1 (sub x))
      (each (x k v)
        (add x1 (cat k ":"))
        (add x1 v))
      (across (x1 y i)
        (cat! str (to-string y))
        (if (< i (- (length x1) 1))
            (cat! str " ")))
      (cat str  ")"))))

(define-macro pr xs
  (let (xs (map (fn (x)
                  (splice `((to-string ,x) " ")))
                xs))
    `(print (cat ,@xs))))

;; misc

(target js: (define type (x) (typeof x)))

(define apply (f args)
  (let (args (stash args))
    (target js: (f.apply f args) lua: (f (unpack args)))))

(define id-count 0)

(define make-id (prefix)
  (inc id-count)
  (cat "_" (or prefix "") id-count))

(define eval-result nil)

(target lua:
  (define eval (x)
    ;; lua requires a statement at the top level
    (let (f (load (cat (compile 'eval-result) '= x)))
      (if f (do (f) eval-result)
        (let (|f,e| (load x))
          (if f (f) (error (cat e " in " x))))))))
