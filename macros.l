;; -*- mode: lisp -*-

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

(define-macro wipe (place)
  (if (= target 'lua)
      `(set ,place nil)
    `(%delete ,place)))

(define-macro list body
  (let-unique (x)
    (let (l () forms ())
      (each (k v) body
        (if (number? k)
            (set (get l k) v)
          (add forms `(set (get ,x ',k) ,v))))
      (if (some? forms)
          `(let ,x (%array ,@l) ,@forms ,x)
        `(%array ,@l)))))

(define-macro if branches
  (hd (expand-if branches)))

(define-macro case (x rest: clauses)
  (let bs (map (fn ((a b))
                 (if (nil? b)
                     (list a)
                   `((= ',a ,x) ,b)))
               (pair clauses))
    `(if ,@(apply join bs))))

(define-macro when (cond rest: body)
  `(if ,cond (do ,@body)))

(define-macro unless (cond rest: body)
  `(if (not ,cond) (do ,@body)))

(define-macro obj body
  `(%object ,@(mapo (fn (x) x) body)))

(define-macro let (bs rest: body)
  (if (atom? bs) `(let (,bs ,(hd body)) ,@(tl body))
      (none? bs) `(do ,@body)
    (let ((lh rh rest: bs2) bs
          (id val rest: bs1) (bind lh rh))
      (let renames ()
        (if (or (bound? id) (toplevel?))
            (let id1 (unique id)
              (set renames (list id id1))
              (set id id1))
          (setenv id :variable))
        `(do (%local ,id ,val)
             (let-symbol ,renames
               (let ,(join bs1 bs2) ,@body)))))))

(define-macro with (x v rest: body)
  `(let (,x ,v) ,@body ,x))

(define-macro let-when (x v rest: body)
  (let-unique (y)
    `(let ,y ,v
       (when ,y
         (let (,x ,y)
           ,@body)))))

(define-macro define-macro (name args rest: body)
  (let form `(setenv ',name macro: (fn ,args ,@body))
    (eval form)
    form))

(define-macro define-special (name args rest: body)
  (let form `(setenv ',name special: (fn ,args ,@body) ,@(keys body))
    (eval form)
    form))

(define-macro define-symbol (name expansion)
  (setenv name symbol: expansion)
  `(setenv ',name symbol: ',expansion))

(define-macro define-reader ((char s) rest: body)
  `(set (get read-table ,char) (fn (,s) ,@body)))

(define-macro define (name x rest: body)
  (setenv name :variable)
  (if (some? body)
      `(%local-function ,name ,@(bind* x body))
    `(%local ,name ,x)))

(define-macro define-global (name x rest: body)
  (setenv name :toplevel :variable)
  (if (some? body)
      `(%global-function ,name ,@(bind* x body))
    `(set ,name ,x)))

(define-macro with-frame body
  (let-unique (x)
    `(do (add environment (obj))
         (with ,x (do ,@body)
           (drop environment)))))

(define-macro with-bindings ((names) rest: body)
  (let-unique (x)
   `(with-frame
      (each ,x ,names
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

(define-macro let-unique (names rest: body)
  (let bs (map (fn (n)
                 (list n `(unique ',n)))
               names)
    `(let ,(apply join bs)
       ,@body)))

(define-macro fn (args rest: body)
  `(%function ,@(bind* args body)))

(define-macro guard (expr)
  (if (= target 'js)
      `((fn () (%try (list true ,expr))))
    (let-unique (e x msg trace)
      `(let (,x nil
             ,msg nil
             ,trace nil
             ,e (xpcall
                 (fn () (set ,x ,expr))
                 (fn (m)
                   (set ,trace ((get debug 'traceback)))
                   (set ,msg (%message-handler m ,trace)))))
         (list ,e (if ,e ,x ,msg)
                  (if ,e nil ,trace))))))

(define-macro each (x t rest: body)
  (let-unique (o n i)
    (let ((k v) (if (atom? x) (list i x)
                  (if (> (# x) 1) x
                      (list i (hd x)))))
      `(let (,o ,t ,k nil)
         (%for ,o ,k
           (let (,v (get ,o ,k))
             ,@(if (= target 'lua) body
                   `((let ,k (if (numeric? ,k)
                                 (parseInt ,k)
                               ,k)
                       ,@body)))))))))

(define-macro for (i to rest: body)
  `(let ,i 0
     (while (< ,i ,to)
       ,@body
       (inc ,i))))

(define-macro step (v t rest: body)
  (let-unique (x n i)
    `(let (,x ,t ,n (# ,x))
       (for ,i ,n
         (let (,v (at ,x ,i))
           ,@body)))))

(define-macro set-of xs
  (let l ()
    (each x xs
      (set (get l x) true))
    `(obj ,@l)))

(define-macro language () `',target)

(define-macro target clauses
  (get clauses target))

(define-macro join! (a rest: bs)
  `(set ,a (join ,a ,@bs)))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

(define-macro inc (n by)
  `(set ,n (+ ,n ,(or by 1))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(or by 1))))

(define-macro with-indent (form)
  (let-unique (x)
    `(do (inc indent-level)
         (with ,x ,form
           (dec indent-level)))))

(define-macro export names
  (if (= target 'js)
      `(do ,@(map (fn (k)
                    `(set (get exports ',k) ,k))
                  names))
    (let x (obj)
      (each k names
        (set (get x k) k))
      `(return (obj ,@x)))))
