;; -*- mode: lisp -*-

(define-module lib
  import: (lib compiler)
  export: (setenv
           getenv
           special?
           special-form?
           at
           quote
           list
           table
           let
           define-macro
           define-special
           define-symbol
           define-global
           define-local
           define
           with-frame
           with-bindings
           let-macro
           let-symbol
           fn
           guard
           across
           set-of
           quoted
           stash*
           unstash
           quasiquote
           macroexpand
           target
           language
           length
           empty?
           sub
           inner
           hd
           tl
           add
           drop
           last
           reverse
           join
           reduce
           keep
           find
           pairwise
           iterate
           replicate
           join*
           join!
           list*
           each
           splice
           map
           map*
           keys?
           extend
           char
           code
           search
           split
           cat
           cat!
           + - * / %
           > < = >= <=
           read-file
           write-file
           print
           write
           exit
           nil?
           is?
           string?
           string-literal?
           id-literal?
           number?
           boolean?
           function?
           composite?
           atom?
           table?
           list?
           parse-number
           inc
           dec
           to-string
           pr
           type
           apply
           make-id))

;; environment

(define setenv (k rest: keys)
  (let (frame (last environment)
        x (or (get frame k) (table)))
    (each (keys k1 v)
      (set (get x k1) v))
    (set (get frame k) x)))

(define getenv (k)
  (if (string? k)
      (find (fn (e) (get e k))
            (reverse environment))))

(define macro-function (k)
  (let (x (getenv k))
    (and x x.macro)))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (let (x (getenv k))
    (and x x.special)))

(define special-form? (form)
  (and (list? form) (special? (hd form))))

(define symbol-expansion (k)
  (let (x (getenv k))
    (and x x.symbol)))

(define symbol? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (let (x (get (last environment) k))
    (and x x.variable)))

(define bound? (x)
  (or (macro? x)
      (special? x)
      (symbol? x)
      (variable? x)))

(define pending (table))

;; macros

(define-macro at (l i)
  (if (and (= target 'lua) (number? i))
      (inc i)
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,l ,i))

(define-macro quote (form)
  (quoted form))

(define-macro list body
  (let (l `(%array ,@body))
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
      (if (is? v)
          (do (add l k)
              (add l v))))
    `(%object ,@l)))

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
               (setenv id :variable))
             (add locals `(%local ,id ,val))))
         (pairwise bindings))
    `(do ,@locals (let-symbol ,renames ,@body))))

(define-macro define-macro (name args rest: body)
  (let (form `(fn ,args ,@body))
    (eval `(setenv ',name macro: ,form form: ',form)))
  nil)

(define-macro define-special (name args rest: body)
  (let (form `(fn ,args ,@body)
        keys (sub body (length body)))
    (eval `(setenv ',name special: ,form form: ',form ,@keys)))
  nil)

(define-macro define-symbol (name expansion)
  (setenv name symbol: expansion)
  nil)

(define-macro define-global (name x rest: body)
  (setenv name :variable)
  (if (not (empty? body))
      (let ((args body) (bind-arguments x body))
        `(%global-function ,name ,args ,@body))
    `(set ,name ,x)))

(define-macro define-local (name x rest: body)
  (setenv name :variable)
  (if (not (empty? body))
      (let ((args body) (bind-arguments x body))
        `(%local-function ,name ,args ,@body))
    `(%local ,name ,x)))

(define-macro define (name x rest: body)
  (setenv name :variable)
  `(define-global ,name ,x ,@body))

(define-macro with-frame body
  (let (x (make-id))
    `(do (add environment (table))
         (let (,x (do ,@body))
           (drop environment)
           ,x))))

(define-macro with-bindings ((names) rest: body)
  (let (x (make-id))
   `(with-frame
      (across (,names ,x)
        (setenv ,x :variable))
      ,@body)))

(define-macro let-macro (definitions rest: body)
  (with-frame
    (map (fn (m)
           (macroexpand `(define-macro ,@m)))
         definitions)
    `(do ,@(macroexpand body))))

(define-macro let-symbol (expansions rest: body)
  (with-frame
    (map (fn ((name exp))
           (macroexpand `(define-symbol ,name ,exp)))
         (pairwise expansions))
    `(do ,@(macroexpand body))))

(define-macro fn (args rest: body)
  (let ((args body) (bind-arguments args body))
    `(%function ,args ,@body)))

(define-macro guard (expr)
  (if (= target 'js)
      `((fn () (%try (list true ,expr))))
    (let (e (make-id)
          x (make-id)
          ex (cat "|" e "," x "|"))
      `(let (,ex (xpcall (fn () ,expr) message-handler))
         (list ,e ,x)))))

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
  (let (l ())
    (across (elements e)
      (set (get l e) true))
    `(table ,@l)))

;; macro helpers

(define escape (str)
  (let (str1 "\"" i 0)
    (while (< i (length str))
      (let (c (char str i)
            c1 (if (= c "\n") "\\n"
                   (= c "\"") "\\\""
                   (= c "\\") "\\\\"
                 c))
        (cat! str1 c1))
      (inc i))
    (cat str1 "\"")))

(define quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
    `(list ,@(map* quoted form))))

(define stash (args)                    ; runtime
  (if (keys? args)
      (let (p (%object _stash true))
        (each (args k v)
          (set (get p k) v))
        (join args (list p)))
    args))

(define stash* (args)                   ; compile-time
  (if (keys? args)
      (let (l '(%object _stash true))
        (each (args k v)
          (add l k)
          (add l v))
        (join args (list l)))
    args))

(define unstash (args)
  (if (empty? args)
      ()
    (let (l (last args))
      (if (and (table? l) l._stash)
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
      (let (bs ()
            r (or args.rest (and (keys? args) (make-id))))
        (across (args arg)
          (if (atom? arg) (add args1 arg)
              (or (list? arg) (keys? arg))
              (let (v (make-id))
                (add args1 v)
                (join! bs (list arg v)))))
        (if r (join! bs (list r (rest))))
        (if (keys? args)
            (join! bs (list (sub args (length args)) r)))
        (if (empty? bs)
            (list args1 body)
          (list args1 `((let ,bs ,@body))))))))

(define bind (lh rh)
  (if (and (composite? lh) (list? rh))
      (let (id (make-id))
	`((,id ,rh) ,@(bind lh id)))
      (atom? lh) `((,lh ,rh))
    (let (bs () r lh.rest)
      (across (lh x i)
        (join! bs (bind x `(at ,rh ,i))))
      (if r (join! bs (bind r `(sub ,rh ,(length lh)))))
      (each (lh k v)
        (if (= v true) (set v k))
        (if (~= k 'rest)
            (join! bs (bind v `(get ,rh ',k)))))
      bs)))

(define message-handler (msg)
  (let (i (search msg ": "))
    (sub msg (+ i 2))))

;; expansion

(define quoting? (depth) (number? depth))
(define quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (list? x)
       (can-unquote? depth)
       (= (hd x) 'unquote-splicing)))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define macroexpand (form)
  (if (symbol? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let (x (hd form))
      (if (= x '%for)
          (let ((_ (t k) rest: body) form)
            `(%for (,(macroexpand t) ,(macroexpand k))
               ,@(macroexpand body)))
          (= x '%function)
          (let ((_ args rest: body) form)
            (with-bindings (args)
              `(%function ,(map* macroexpand args)
                 ,@(macroexpand body))))
          (or (= x '%local-function)
              (= x '%global-function))
          (let ((_ name args rest: body) form)
            (with-bindings (args)
              `(,x ,name ,(map* macroexpand args)
                 ,@(macroexpand body))))
	  (macro? x)
          (macroexpand
           (apply (macro-function x) (tl form)))
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
    (let (l () i 0 len (length l1))
      (while (< i len)
        (set (at l i) (at l1 i))
        (inc i))
      (while (< i (+ len (length l2)))
        (set (at l i) (at l2 (- i len)))
        (inc i))
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

(define replicate (n x)
  (let (l ())
    (iterate (fn () (add l x)) n)
    l))

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
       (%for (,t1 ,k)
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
      (let (x (f v))
        (if (is? x)
            (set (get l k) x))))
    l))

(define keys? (t)
  (let (k? false)
    (each (t k v)
      (set k? true)
      (break))
    k?))

(define extend (t rest: xs)
  (join t xs))

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

(define cat (rest: xs)
  (if (empty? xs) ""
    (reduce (fn (a b) (cat a b)) xs)))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

;; numbers

(define + (rest: xs)
  (reduce (fn (a b) (+ a b)) xs))

(define - (rest: xs)
  (reduce (fn (a b) (- b a)) (reverse xs)))

(define * (rest: xs)
  (reduce (fn (a b) (* a b)) xs))

(define / (rest: xs)
  (reduce (fn (a b) (/ b a)) (reverse xs)))

(define % (rest: xs)
  (reduce (fn (a b) (% b a)) (reverse xs)))

(define > (a b) (> a b))
(define < (a b) (< a b))
(define = (a b) (= a b))
(define >= (a b) (>= a b))
(define <= (a b) (<= a b))

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

(define make-id ()
  (inc id-count)
  (cat "_g" id-count))
