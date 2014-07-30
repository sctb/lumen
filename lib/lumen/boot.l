;; -*- mode: lisp -*-

(define-module (lumen boot)
  import: ((lumen)
           (lumen lib)
           (lumen compiler)))

(define-macro %initial-environment ()
  (quote-environment (initial-environment)))

(define-macro %initial-modules ()
  (quote-modules))

(define* modules (%initial-modules))
(define* environment (%initial-environment))
