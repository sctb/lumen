;; -*- mode: lisp -*-

(define-module (lumen main)
  import: ((lumen)
           (lumen reader)
           (lumen compiler)))

(let-macro ((init ()
              (declare '(define-global nexus (table)))))
  (init))

(let-macro ((save (specs)
              (series compile-module specs)))
  (save ((lumen runtime)
         (lumen lib)
         (lumen reader)
         (lumen compiler)
         (lumen special)
         (lumen core)
         (lumen boot)
         (user))))

(define rep (s)
  (let ((_ x) (guard (eval (read-from-string s))))
    (if (is? x) (pr x))))

(define repl ()
  (define prompt ()
    (write (cat current-module "> ")))
  (define step (s)
    (rep s)
    (prompt))
  (prompt)
  (target
   js: (do (process.stdin.setEncoding 'utf8)
           (process.stdin.on 'data step))
   lua: (while true
          (let (s (io.read))
            (if s (step s) (break))))))

(define usage ()
  (pr "usage: lumen [options] <module>")
  (pr "options:")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (exit))

(define main ()
  (let (args (target js: (sub process.argv 2) lua: arg))
    (when (or (= (hd args) "-h")
              (= (hd args) "--help"))
      (usage))
    (let (spec nil
          output nil
          target1 nil
          expr nil
          n (length args)
          i 0)
      (while (< i n)
        (let (arg (at args i))
          (if (or (= arg "-o") (= arg "-t") (= arg "-e"))
              (if (= i (- n 1))
                  (pr "missing argument for" arg)
                (do (inc i)
                    (let (val (at args i))
                      (if (= arg "-o") (set output val)
		          (= arg "-t") (set target1 val)
		          (= arg "-e") (set expr val)))))
	      (and (nil? spec)
                   (not (= "-" (char arg 0))))
              (set spec arg))
          (inc i)))
      (if output
          (do (if target1 (set target target1))
              (write-file output (compile-module spec)))
        (do (in-module (or spec 'user))
            (if expr (rep expr) (repl)))))))

(main)
