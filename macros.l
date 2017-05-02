(define-macro quote (form)
  (quoted form))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define-macro set args
  `(do ,@(map (fn ((lh rh)) `(%set ,lh ,rh))
              (pair args))))

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

(define-macro case (expr rest: clauses)
  (let-unique (x)
    (let (eq (fn (_) `(= ',_ ,x))
          cl (fn ((a b))
               (if (nil? b) (list a)
                   (or (string? a) (number? a)) (list (eq a) b)
                   (one? a) (list (eq (hd a)) b)
                   (> (# a) 1) (list `(or ,@(map eq a)) b))))
      `(let ,x ,expr
         (if ,@(apply join (map cl (pair clauses))))))))

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
        (unless (id-literal? id)
          (let id1 (unique id)
            (set renames (list id id1)
                 id id1)))
        `(do (%local ,id ,val)
             (let-symbol ,renames
               (let ,(join bs1 bs2) ,@body)))))))

(define-macro with (x v rest: body)
  `(let (,x ,v) ,@body ,x))

(define-macro let-when (x v rest: body)
  (let-unique (y)
    `(let ,y ,v
       (when (yes ,y)
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

(define-macro apply (f rest: args)
  (if (> (# args) 1)
      `((do apply) ,f (join (list ,@(almost args)) ,(last args)))
      `((do apply) ,f ,@args)))

(define-macro guard (expr)
  (if (= target 'js)
      `((fn () (%try (list true ,expr))))
    (let-unique (x msg trace)
      `(let (,x nil
             ,msg nil
             ,trace nil)
         (if (xpcall
              (fn () (set ,x ,expr))
              (fn (m)
                (set ,trace ((get debug 'traceback))
                     ,msg (if (string? m) (clip m (+ (search m ": ") 2))
                              (nil? m) ""
                            (str m)))))
             (list true ,x)
           (list false (obj message: ,msg stack: ,trace)))))))

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
  (let-unique (x i)
    `(let (,x ,t)
       (for ,i (# ,x)
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
  `(set ,n (+ ,n ,(if (nil? by) 1 by))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(if (nil? by) 1 by))))

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
      `(return (%object ,@(mapo (fn (x) x) x))))))

(define-macro when-compiling body
  (eval `(do ,@body)))
