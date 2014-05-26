;; -*- mode: lisp -*-

(define-module core
  import: (runtime core special utilities)
  export: (quote
           quasiquote
           at
           list
           table
           let
           define-macro
           define-special
           define-symbol
           define-global
           define-local
           define
           let-macro
           let-symbol
           fn
           guard
           across
           set-of
           language
           target
           join*
           join!
           list*
           each
           cat!
           inc
           dec
           pr
           %export))

(define-macro quote (form)
  (quoted form))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define-macro at (l i)
  (if (and (= target 'lua) (number? i))
      (inc i)
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,l ,i))

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
  `(%object ,@(mapo (fn (_ x) x) body)))

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
      (let ((args body) (bind* x body))
        `(%global-function ,name ,args ,@body))
    `(set ,name ,x)))

(define-macro define-local (name x rest: body)
  (setenv name :variable)
  (if (not (empty? body))
      (let ((args body) (bind* x body))
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
  (let ((args body) (bind* args body))
    `(%function ,args ,@body)))

(define-macro guard (expr)
  (if (= target 'js)
      `((fn () (%try (list true ,expr))))
    (let (e (make-id)
          x (make-id)
          ex (cat "|" e "," x "|"))
      `(let (,ex (xpcall (fn () ,expr) %message-handler))
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

(define-macro language () `',target)

(define-macro target clauses
  (get clauses target))

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

(define-macro each ((t k v) rest: body)
  (let (t1 (make-id))
    `(let (,k nil ,t1 ,t)
       (%for (,t1 ,k)
         (if (target
              js: (isNaN (parseInt ,k))
              lua: (not (number? ,k)))
             (let (,v (get ,t1 ,k))
               ,@body))))))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

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

(define-macro pr xs
  (let (xs (map (fn (x)
                  (splice `((to-string ,x) " ")))
                xs))
    `(print (cat ,@xs))))

(define-macro %export ()
  (let (toplevel (hd environment)
        m (make-id)
        k (module-key current-module)
        form `(do (define ,m (table))
                  (set (get exports ',k) ,m)))
    (each (toplevel k v)
      (if (and v.variable
               v.export
               (= v.module current-module))
          (add form `(set (get ,m ',k) ,k))))
    form))
