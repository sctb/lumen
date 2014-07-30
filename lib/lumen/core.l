;; -*- mode: lisp -*-

(define-module (lumen core)
  import: ((lumen)
           (lumen lib)
           (lumen compiler))
  export: (quote
           quasiquote
           at
           list
           if
           when
           unless
           table
           let
           define-module
           define-macro
           define-special
           define-symbol
           define*
           define
           set*
           with-bindings
           let-macro
           let-symbol
           fn
           guard
           each
           set-of
           language
           target
           join*
           join!
           cat!
           inc
           dec
           pr))

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
        (each (k v) body
          (add init (list k `(set (get ,id ',k) ,v))))
        `(let (,id ,l)
           ,@(map sd (sortk init hd))
           ,id)))))

(define-macro if branches
  (define step ((a b rest: c))
    (if (is? b) `((%if ,a ,b ,@(step c)))
        (is? a) (list a)))
  (hd (step branches)))

(define-macro when (cond rest: body)
  `(if ,cond (do ,@body)))

(define-macro unless (cond rest: body)
  `(if (not ,cond) (do ,@body)))

(define-macro table body
  `(%object ,@(mapo (fn (x) x) body)))

(define-macro let (bindings rest: body)
  (let (i 0
	renames ()
	locals ())
    (map (fn ((lh rh))
           (each ((id val)) (bind lh rh)
             (if (or (bound? id)
                     (reserved? id)
                     (toplevel?))
                 (let (rename (make-id))
                   (add renames id)
                   (add renames rename)
                   (set id rename))
               (setenv id :variable))
             (add locals `(%local ,id ,val))))
         (pair bindings))
    `(do ,@locals (let-symbol ,renames ,@body))))

(define-macro define-module (spec rest: body)
  (let ((import: imp export: exp :alias) body
        (imports bindings) (import-modules imp)
        k (module-key spec))
    (set (get modules k)
         (table import: imports export: (table) alias: alias))
    (each (x) (or exp ())
      (setenv x :export))
    `(do (set (get nexus ',k) (table)) ,@bindings)))

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

(define-macro define* (name x rest: body)
  (setenv name :global :export)
  (if (some? body)
      (let ((args body) (bind* x body))
        `(%global-function ,name ,args ,@body))
      (= target 'js)
      `(set (get global ',(id name)) ,x)
    `(set ,name ,x)))

(define-macro define (name x rest: body)
  (setenv name :variable)
  (if (and (some? body) (= target 'js))
      (linked name `(%local ,name (fn ,x ,@body)))
      (some? body)
      (let ((args body) (bind* x body))
        (linked name `(%local-function ,name ,args ,@body)))
    (linked name `(%local ,name ,x))))

(define-macro set* (name value)
  (linked name `(set ,name ,value)))

(define-macro with-frame (rest: body :scope)
  (let (x (make-id))
    `(do (add environment (table _scope: ,scope))
         (let (,x (do ,@body))
           (drop environment)
           ,x))))

(define-macro with-bindings ((names) rest: body)
  (let (x (make-id))
   `(with-frame :scope
      (each (,x) ,names
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
         (pair expansions))
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

(define-macro each (b t rest: body)
  (let ((k v) b t1 (make-id))
    `(let (,t1 ,t)
       ,(if (nil? v)
            (let (i (if b.i 'i (make-id)))
              `(let (,i 0)
                 (while (< ,i (length ,t1))
                   (let (,k (at ,t1 ,i))
                     ,@body)
                   (inc ,i))))
          `(let (,k nil)
             (%for ,t1 ,k
               (when (target
                       js: (nil? (number ,k))
                       lua: (not (number? ,k)))
                 (let (,v (get ,t1 ,k))
                   ,@body))))))))

(define-macro set-of elements
  (let (l ())
    (each (e) elements
      (set (get l e) true))
    `(table ,@l)))

(define* target (language))
(define-macro language () `',target)

(define-macro target clauses
  (get clauses target))

(define-macro join* xs
  (reduce (fn (a b) (list 'join a b)) xs))

(define-macro join! (a rest: bs)
  `(set ,a (join* ,a ,@bs)))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

(define-macro inc (n by)
  `(set ,n (+ ,n ,(or by 1))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(or by 1))))

(define-macro pr xs
  `(print ,(space xs)))
