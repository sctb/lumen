;; -*- mode: lisp -*-

(define reader (require 'reader))
(define compiler (require 'compiler))
(define system (require 'system))

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
            ((get system 'write) "> ")))))
  ((get system 'write) "> ")
  (target
    js: (let in (get process 'stdin)
          ((get in 'setEncoding) 'utf8)
          ((get in 'on) 'data rep1))
    lua: (while true
           (let s ((get io 'read))
             (if s (rep1 (cat s "\n")) (break))))))

(define-global compile-file (path)
  (let (s ((get reader 'stream) ((get system 'read-file) path))
        body ((get reader 'read-all) s)
        form ((get compiler 'expand) `(do ,@body)))
    ((get compiler 'compile) form :stmt)))

(define-global load (path)
  ((get compiler 'run) (compile-file path)))

(define run-file (path)
  ((get compiler 'run) ((get system 'read-file) path)))

(define usage ()
  (print "usage: lumen [options] <object files>")
  (print "options:")
  (print "  -c <input>\tCompile input file")
  (print "  -o <output>\tOutput file")
  (print "  -t <target>\tTarget language (default: lua)")
  (print "  -e <expr>\tExpression to evaluate")
  ((get system 'exit)))

(define main ()
  (let arg (hd (get system 'argv))
    (when (or (= arg "-h")
              (= arg "--help"))
      (usage)))
  (let (pre ()
        input nil
        output nil
        target1 nil
        expr nil
        argv (get system 'argv)
        n (# argv))
    (for i n
      (let a (at argv i)
        (if (or (= a "-c") (= a "-o") (= a "-t") (= a "-e"))
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
      (run-file file))
    (if (nil? input) (if expr (rep expr) (repl))
      (do (if target1 (set target target1))
          (let code (compile-file input)
            (if (or (nil? output) (= output "-"))
                (print code)
              ((get system 'write-file) output code)))))))

(main)
