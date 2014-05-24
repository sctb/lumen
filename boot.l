;; -*- mode: lisp -*-

(define-module boot
  import: (lib compiler)
  export: (define-module environment modules))

(define-macro define-module (spec rest: body)
  (%define-module spec body))

(define-macro %initial-environment ()
  (quote-environment (initial-environment)))

(define-macro %initial-modules ()
  (quote-modules))

(define modules (%initial-modules))
(define environment (%initial-environment))



