;; -*- mode: lisp -*-

(define reader (require 'reader))
(define compiler (require 'compiler))

(define eval-print (form)
  (let ((ok x) (guard ((get compiler 'eval) form)))
    (if (not ok) (print (cat "error: " x))
        (is? x) (print (string x)))))

(define rep (s)
  (eval-print ((get reader 'read-string) s)))

(define repl ()
  (let buf ""
    (define rep1 (s)
      (cat! buf s)
      (let (more ()
            form ((get reader 'read-string) buf more))
          (unless (= form more)
            (eval-print form)
            (set buf "")
            (write "> ")))))
  (write "> ")
  (target
    js: (let in (get process 'stdin)
          ((get in 'setEncoding) 'utf8)
          ((get in 'on) 'data rep1))
    lua: (while true
           (let s ((get io 'read))
             (if s (rep1 (cat s "\n")) (break))))))

(define usage ()
  (print "usage: lumen [options] <object files>")
  (print "options:")
  (print "  -c <input>\tCompile input file")
  (print "  -o <output>\tOutput file")
  (print "  -t <target>\tTarget language (default: lua)")
  (print "  -e <expr>\tExpression to evaluate")
  (exit))

(define end-is? (str rest: l)
  (let s (apply cat l)
    (= (clip str (- (# str) (# s))) s)))

(define cat-end (str rest: l)
  (let s (apply cat l)
    (if (end-is? str s) str
      (cat str s))))

(define-global args ())

(define main ()
  (when (or (= (hd argv) "-h")
            (= (hd argv) "--help"))
    (usage))
  (let (pre ()
        input nil
        output nil
        target1 nil
        expr nil
        n (# argv))
    (for i n
      (let a (at argv i)
        (if (= a "--") (do (set args (cut argv (+ i 1))) (break))
            (or (= a "-c") (= a "-o") (= a "-t") (= a "-e"))
            (if (= i (- n 1))
                (print (cat "missing argument for " a))
              (do (inc i)
                  (let val (at argv i)
                    (if (= a "-c") (set input val)
                        (= a "-o") (set output val)
                        (= a "-t") (set target1 val)
                        (= a "-e") (set expr val)))))
            (not (= "-" (char a 0))) (add pre a))))
    (step file pre
      ((get compiler 'run-file) (cat-end file "." target)))
    (if input
        (do (if target1 (set target target1))
            (let code ((get compiler 'compile-file) input)
              (if (or (nil? output) (= output "-"))
                (print code)
                (write-file output code))))
      (if expr (rep expr) (repl)))))

(main)
