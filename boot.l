;; -*- mode: lisp -*-

(define-module boot
  import: (lib compiler)
  export: (environment modules))

(define-macro %initial-environment ()
  (quote-environment (initial-environment)))

(define-macro %initial-modules ()
  (quote-modules))

(define modules (%initial-modules))
(define environment (%initial-environment))



