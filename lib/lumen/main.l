;; -*- mode: lisp -*-

(define-module (lumen main)
  import: ((lumen)
           (lumen reader)
           (lumen compiler)))

(let-macro ((init ()
              (declare '(define-global nexus (table)))
              (declare '(define-global env (list (table))))))
  (init))

(let-macro ((save (specs)
              (series compile-module specs)))
  (save ((lumen runtime)
         (lumen lib)
         (lumen reader)
         (lumen compiler)
         (lumen special)
         (lumen core)
         (user)
         (lumen boot))))

(define rep (s)
  (let ((_ x) (guard (eval (read-from-string s))))
    (if (is? x) (pr x))))

(define repl ()
  (write "> ")
  (let (rep1 (fn (s) (rep s) (write "> ")))
   (target
     js: (do (process.stdin.setEncoding 'utf8)
             (process.stdin.on 'data rep1))
     lua: (while true
            (let (s (io.read))
              (if s (rep1 s) (break)))))))

(define usage ()
  (pr "usage: lumen [options] <module>")
  (pr "options:")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (pr "  -c <input>\tCompile file")
  (exit))

(define main ()
  (let (args (target js: (sub process.argv 2) lua: arg))
    (when (or (= (hd args) "-h")
              (= (hd args) "--help"))
      (usage))
    (let (spec nil
          load ()
          file nil
          output nil
          target1 nil
          expr nil
          n (length args)
          i 0)
      (while (< i n)
        (let (arg (at args i))
          (if (or (= arg "-o") (= arg "-t") (= arg "-e") (= arg "-c"))
              (if (= i (- n 1))
                  (pr "missing argument for" arg)
                (do (inc i)
                    (let (val (at args i))
                      (if (= arg "-o") (set output val)
		          (= arg "-t") (set target1 val)
		          (= arg "-e") (set expr val)
                          (= arg "-c") (set file val)))))
	      (not (= "-" (char arg 0)))
              (do (add load arg)
                  (set spec arg)))
          (inc i)))
      (if file 
          (do (if target1 (set target target1))
              (series load-file load)
              (compile-file file output))
          output
          (do (if target1 (set target target1))
              (write-file output (compile-module spec)))
        (do (in-module (or spec 'user))
            (if expr (rep expr) (repl)))))))

(main)
