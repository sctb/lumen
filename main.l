;; -*- mode: lisp -*-

(define reader (require 'reader))
(define compiler (require 'compiler))
(define system (require 'system))

(define eval-print (form)
  (let ((ok x trace) (guard (compiler.eval form)))
    (if (not ok)
        (target
          js: (print trace)
          lua: (print (cat "error: " x "\n" trace)))
        (is? x) (print (str x)))))

(define rep (s)
  (eval-print (reader.read-string s)))

(define repl ()
  (let buf ""
    (define rep1 (s)
      (cat! buf s)
      (let (more ()
            form (reader.read-string buf more))
          (unless (= form more)
            (eval-print form)
            (set buf "")
            (system.write "> ")))))
  (system.write "> ")
  (target
    js: (let in process.stdin
          (in.setEncoding 'utf8)
          (in.on 'data rep1))
    lua: (while true
           (let s (io.read)
             (if s (rep1 (cat s "\n")) (break))))))

(define-global compile-file (path)
  (let (s (reader.stream (system.read-file path))
        body (reader.read-all s)
        form (compiler.expand `(do ,@body)))
    (compiler.compile form :stmt)))

(define-global load (path)
  (compiler.run (compile-file path)))

(define run-file (path)
  (compiler.run (system.read-file path)))

(define usage ()
  (print "usage: lumen [options] <object files>")
  (print "options:")
  (print "  -c <input>\tCompile input file")
  (print "  -o <output>\tOutput file")
  (print "  -t <target>\tTarget language (default: lua)")
  (print "  -e <expr>\tExpression to evaluate")
  (system.exit))

(define main ()
  (let arg system.argv.0
    (when (or (= arg "-h")
              (= arg "--help"))
      (usage)))
  (let (pre ()
        input nil
        output nil
        target1 nil
        expr nil
        n (# system.argv))
    (for i n
      (let a (at system.argv i)
        (if (or (= a "-c") (= a "-o") (= a "-t") (= a "-e"))
            (if (= i (- n 1))
                (print (cat "missing argument for " a))
              (do (inc i)
                  (let val (at system.argv i)
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
              (system.write-file output code)))))))

(main)
