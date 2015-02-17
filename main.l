;; -*- mode: lisp -*-

(define reader (require 'reader))
(define compiler (require 'compiler))

(define eval-print (form)
  (let ((ok x) (guard (compiler.eval form)))
    (if (not ok) (print (cat "error: " x))
        (is? x) (print (string x)))))

(define rep (s)
  (eval-print (reader.read-string s)))

(define repl ()
  (let buf ""
    (define rep1 (s)
      (cat! buf s)
      (let (more ()
            form (reader.read-string buf more))
          (if (= form more)
              (write "... ")
            (do (eval-print form)
                (set buf "")
                (write "> "))))))
  (write "> ")
  (target
    js: (do (process.stdin.setEncoding 'utf8)
            (process.stdin.on 'data rep1))
    lua: (while true
           (let s (io.read)
             (if s (rep1 s) (break))))))

(define usage ()
  (print "usage: lumen [options] <object files>")
  (print "options:")
  (print "  -c <input>\tCompile input file")
  (print "  -o <output>\tOutput file")
  (print "  -t <target>\tTarget language (default: lua)")
  (print "  -e <expr>\tExpression to evaluate")
  (exit))

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
      (compiler.run-file file))
    (if (and input output)
        (do (if target1 (set target target1))
            (let code (compiler.compile-file input)
              (write-file output code)))
      (if expr (rep expr) (repl)))))

(main)
