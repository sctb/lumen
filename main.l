;; -*- mode: lisp -*-

(define-module main
  import: (lib
           reader
           compiler
           utilities
           special
           boot))

(define-local rep (str)
  (let ((_ x) (guard (eval (read-from-string str))))
    (if (is? x) (pr x))))

(define-local repl ()
  (let (step (fn (str) (rep str) (write "> ")))
    (write "> ")
    (target
     js: (do (process.stdin.setEncoding 'utf8)
             (process.stdin.on 'data step))
     lua: (while true
            (let (str (io.read))
              (if str (step str) (break)))))))

(define-local usage ()
  (pr "usage: lumen [options] <module>")
  (pr "options:")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (exit))

(define-local main ()
  (let (args (target js: (sub process.argv 2) lua: arg))
    (if (or (= (hd args) "-h")
            (= (hd args) "--help"))
        (usage))
    (let (spec nil
          output nil
          target1 nil
          expr nil)
      (across (args arg i)
        (if (or (= arg "-o") (= arg "-t") (= arg "-e"))
            (if (= i (- (length args) 1))
                (pr "missing argument for" arg)
              (do (inc i)
                  (let (val (at args i))
                    (if (= arg "-o") (set output val)
		        (= arg "-t") (set target1 val)
		        (= arg "-e") (set expr val)))))
	    (and (nil? spec)
                 (~= "-" (char arg 0)))
            (set spec arg)))
      (if output
          (do (if target1 (set target target1))
              (write-file output (compile-module spec)))
        (let (spec (or spec 'main))
          (in-module spec)
          (if expr (rep expr) (repl)))))))

(main)
