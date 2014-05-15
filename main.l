;; -*- mode: lisp -*-

(define-module main
  import: (reader lib compiler))

(define rep (str)
  (let ((_ x) (guard (eval (read-from-string str))))
    (if (is? x) (pr x))))

(define repl ()
  (let (step (fn (str) (rep str) (write "> ")))
    (write "> ")
    (target
     js: (do (process.stdin.setEncoding 'utf8)
             (process.stdin.on 'data step))
     lua: (while true
            (let (str (io.read))
              (if str (step str) (break)))))))

(define usage ()
  (pr "usage: lumen [options] [inputs]")
  (pr "options:")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (pr "  -s \t\tSave environment")
  (exit))

(define-global main ()
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
            (= arg "-s") (set save-env? true)
	    (~= "-" (char arg 0)) (add inputs arg)))
      (if output
          (do (if target1 (set target target1))
              (map compile-module inputs)
              (let (main (compile '(main))
                    compiled (cat compiler-output main))
                (write-file output compiled)))
        (do (map load-module inputs)
            (if expr (rep expr) (repl)))))))
