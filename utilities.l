;; -*- mode: lisp -*-

(define-module utilities
  import: (lib special)
  export: (indent-level
           indentation
           with-indent
           quote-environment
           quote-modules
           initial-environment))

(define indent-level 0)

(define indentation ()
  (apply cat (replicate indent-level "  ")))

(define-macro with-indent (form)
  (let (result (make-id))
    `(do (inc indent-level)
         (let (,result ,form)
           (dec indent-level)
           ,result))))

(define-local quote-binding (b)
  (set b (extend b module: `',b.module))
  (if (is? b.symbol)
      (extend b symbol: `',b.symbol)
      (and b.macro b.form)
      (exclude (extend b macro: b.form) :form)
      (and b.special b.form)
      (exclude (extend b special: b.form) :form)
      (is? b.variable) b))

(define-local quote-frame (t)
  `(%object
    ,@(mapo (fn (_ b)
              `(table ,@(quote-binding b)))
            t)))

(define quote-environment (env)
  `(list ,@(map quote-frame env)))

(define-local quote-module (m)
  `(table import: ,(quoted m.import)
          export: ,(quote-frame m.export)))

(define quote-modules ()
  `(table ,@(map* quote-module modules)))

(define initial-environment ()
  (list (table define-module: (getenv 'define-module))))
