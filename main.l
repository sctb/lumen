;; -*- mode: lisp -*-

(define rep (str)
  (let (x (eval (read-from-string str)))
    (if (is? x) (pr x))))

(define repl ()
  (let (step (fn (str) (rep str) (write "> ")))
    (write "> ")
    (target
     js: (do (process.stdin.resume)
             (process.stdin.setEncoding 'utf8)
             (process.stdin.on 'data step))
     lua: (while true
            (let (str (io.stdin.read io.stdin))
              (if str (step str) (break)))))))

(define usage ()
  (pr "usage: x [options] [inputs]")
  (pr "options:")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (pr "  -m \t\tEmbed macro definitions in output")
  (exit))

(define main ()
  (let (args (target js: (sub process.argv 2) lua: arg))
    (if (or (= (hd args) "-h")
            (= (hd args) "--help"))
        (usage))
    (let (inputs ()
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
	    (= arg "-m") (set embed-macros? true)
	    (~= "-" (char arg 0)) (add inputs arg)))
      (if output
          (do (if target1 (set target target1))
              (let (compiled (compile-files inputs)
                    main (compile '(main)))
                (write-file output (cat compiled macros main))))
        (do (across (inputs file)
              (load-file file))
            (if expr (rep expr) (repl)))))))
