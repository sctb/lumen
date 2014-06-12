;; -*- mode: lisp -*-

(define-module optimizer
  import: (runtime special core)
  export: (optimize))

(define optimizations ())
(define optimize)

(define-macro define-optimization ((form) rest: body)
  `(add optimizations
        (table match: (fn (,form) ,body.match)
               optimizer: (fn (,form) ,@body))))

(define-optimization (form)
    match: (and (= (hd form) 'do)
                (= (length form) 2))
  (optimize (at form 1)))

(set optimize
  (fn (form)
    (if (atom? form) form
      (do (each ((:match :optimizer)) optimizations
            (if (match form)
                (return (optimizer form))))
          (map optimize form)))))
