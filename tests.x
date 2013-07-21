;; -*- mode: lisp -*-

;;; infrastructure

(set passed 0)
(set failed 0)
(set tests '())

(defmacro test (x msg)
  `(if (not ,x)
       (do (set failed (+ failed 1))
	   (return ,msg))
     (set passed (+ passed 1))))

(defun are-equal? (a b)
  (if (atom? a) (= a b)
    (= (to-string a) (to-string b))))

(defmacro test-equal (a b)
  `(test (are-equal? ,a ,b)
	 (cat " failed: expected " (to-string ,a) ", was " (to-string ,b))))

(defmacro deftest (name _ body...)
  `(push tests (list ',name (lambda () ,@body))))

(defun run-tests ()
  (across (tests test)
    (local name (at test 0))
    (local fn (at test 1))
    (local result (fn))
    (if (string? result)
	(print (cat " " name result))))
  (print (cat passed " passed, " failed " failed")))


;;; basic

(deftest reader ()
  (test-equal 17 (read-from-string "17"))
  (test-equal 0.015 (read-from-string "1.5e-2"))
  (test-equal true (read-from-string "true"))
  (test-equal (not true) (read-from-string "false"))
  (test-equal 'hi (read-from-string "hi"))
  (test-equal '"hi" (read-from-string "\"hi\""))
  (test-equal '(1 2) (read-from-string "(1 2)"))
  (test-equal '(1 (a)) (read-from-string "(1 (a))")))

(deftest boolean ()
  (test-equal true (or true false))
  (test-equal false (or false false))
  (test-equal true (not false))
  (test-equal true (and true true))
  (test-equal false (and true false))
  (test-equal false (and true true false)))

(deftest numeric ()
  (test-equal 4 (+ 2 2))
  (test-equal 18 18.00)
  (test-equal 4 (- 7 3))
  (test-equal 5.0 (/ 10 2))
  (test-equal 6 (* 2 3.00))
  (test-equal true (> 2.01 2))
  (test-equal true (>= 5.0 5.0))
  (test-equal false (< 2 2))
  (test-equal true (<= 2 2))
  (test-equal -7 (- 7)))

(deftest string ()
  (test-equal 3 (length "foo"))
  (test-equal 3 (length "\"a\""))
  (test-equal 'a "a")
  (test-equal "a" (char "bar" 1))
  (test-equal "uux" (sub "quux" 1))
  (test-equal "uu" (sub "quux" 1 3)))

(deftest list ()
  (test-equal '() (list))
  (test-equal '(a) (list 'a))
  (test-equal '(()) (list (list)))
  (test-equal 0 (length (list)))
  (test-equal 2 (length (list 1 2)))
  (test-equal '(b c) (sub '(a b c) 1))
  (test-equal '(b c) (sub '(a b c d) 1 3))
  (test-equal '(1 2 3) (join '(1 2) '(3)))
  (test-equal '(1 2) (join '() '(1 2))))

(deftest quote ()
  (test-equal 7 (quote 7))
  (test-equal true (quote true))
  (test-equal false (quote false))
  (test-equal 'a (quote a))
  (test-equal ''a (quote (quote a))))
