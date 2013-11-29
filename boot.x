;; -*- mode: lisp -*-

(defun make-environment ()
  (list (table)))

(set scopes (make-environment))
(set macros (make-environment))
(set symbol-macros (make-environment))
