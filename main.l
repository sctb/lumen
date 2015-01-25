;; -*- mode: lisp -*-

(define-local reader (require 'reader))
(define-local compiler (require 'compiler))

(define-local rep (s)
  (let (form (reader.read-string s)
        (_ x) (guard (compiler.eval form)))
    (if (is? x) (pr x))))

(define-local repl ()
  (write "> ")
  (let-fn (rep1 (s) (rep s) (write "> "))
    (target
      js: (do (process.stdin.setEncoding 'utf8)
              (process.stdin.on 'data rep1))
      lua: (while #t
             (let (s (io.read))
               (if s (rep1 s) (break)))))))

(define-local usage ()
  (pr "usage: lumen [options] <object files>")
  (pr "options:")
  (pr "  -c <input>\tInput file")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (exit))

(define-local main ()
  (let (as (argv))
    (when (or (= (hd as) "-h")
              (= (hd as) "--help"))
      (usage))
    (let (pre ()
          input nil
          output nil
          target1 nil
          expr nil
          n (# as)
          i 0)
      (while (< i n)
        (let (a (at as i))
          (if (or (= a "-c") (= a "-o") (= a "-t") (= a "-e"))
              (if (= i (- n 1))
                  (pr "missing argument for" a)
                (do (inc i)
                    (let (val (at as i))
                      (if (= a "-c") (set input val)
                          (= a "-o") (set output val)
		          (= a "-t") (set target1 val)
		          (= a "-e") (set expr val)))))
	      (not (= "-" (char a 0)))
              (add pre a))
          (inc i)))
      (step compiler.run-file pre)
      (if (and input output)
          (do (if target1 (set target target1))
              (let (code (compiler.compile-file input))
                (write-file output code)))
        (if expr (rep expr) (repl))))))

(main)
