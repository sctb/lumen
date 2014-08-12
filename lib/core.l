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

(define-macro list body
  (let (l () forms () id (unique))
    (all (k v) body
      (if (number? k)
          (set (get l k) v)
        (add forms `(set (get ,id ',k) ,v))))
    (if (some? forms)
        `(let (,id (%array ,@l)) ,@forms ,id)
      `(%array ,@l))))

(define-macro if branches
  (hd (expand-if branches)))

(define-macro when (cond rest: body)
  `(if ,cond (do ,@body)))

(define-macro unless (cond rest: body)
  `(if (not ,cond) (do ,@body)))

(define-macro table body
  `(%object ,@(mapo (fn (x) x) body)))

(define-macro let (bindings rest: body)
  (if (< (length bindings) 2) `(do ,@body)
    (let (renames () locals ()
          (lh rh) bindings)
      (all (k (id val)) (bind lh rh)
        (when (number? k)
          (if (or (bound? id) (reserved? id) (toplevel?))
              (let (id1 (unique))
                (add renames id)
                (add renames id1)
                (set id id1))
            (setenv id :variable))
          (add locals `(%local ,id ,val))))
      `(do ,@locals
           (let-symbol ,renames
             (let ,(sub bindings 2) ,@body))))))

(define-macro define-macro (name args rest: body)
  (let (form `(setenv ',name macro: (fn ,args ,@body)))
    (eval form)
    form))

(define-macro define-special (name args rest: body)
  (let (form `(setenv ',name special: (fn ,args ,@body) ,@(keys body)))
    (eval form)
    form))

(define-macro define-symbol (name expansion)
  (setenv name symbol: expansion)
  `(setenv ,name symbol: ,expansion))

(define-macro define (name x rest: body)
  (setenv name :variable)
  (if (some? body)
      (let ((args body) (bind* x body))
        `(%global-function ,name ,args ,@body))
    `(set ,name ,x)))

(define-macro with-frame (rest: body :scope)
  (let (x (unique))
    `(do (add environment (table _scope: ,scope))
         (let (,x (do ,@body))
           (drop environment)
           ,x))))

(define-macro with-bindings ((names) rest: body)
  (let (x (unique))
   `(with-frame :scope
      (all (_ ,x) ,names
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
    (let (e (unique) x (unique)
          ex (cat "|" e "," x "|"))
      `(let (,ex (xpcall (fn () ,expr) %message-handler))
         (list ,e ,x)))))

(define-macro all ((k v) t rest: body)
  (let (x (unique) n (unique))
    `(let (,x ,t ,k nil)
       (%for ,x ,k
         (let (,v (get ,x ,k))
           ,@(if (= target 'lua) body
               `((let (,n (parseInt ,k)
                       ,k (if (isNaN ,n) ,k ,n))
                   ,@body))))))))

(define-macro set-of xs
  (let (l ())
    (all (_ x) xs
      (set (get l x) true))
    `(table ,@l)))

(define target (language))
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
