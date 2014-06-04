;; -*- mode: lisp -*-

(define-module boot
  import: (runtime utilities special core))

(define-macro %initial-environment ()
  (quote-environment (initial-environment)))

(define-macro %initial-modules ()
  (quote-modules))

(define-global modules (%initial-modules))
(define-global environment (%initial-environment))
