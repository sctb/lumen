;; -*- mode: lisp -*-

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
  (pr "usage: lumen [options] <object files>")
  (pr "options:")
  (pr "  -c <input>\tInput file")
  (pr "  -o <output>\tOutput file")
  (pr "  -t <target>\tTarget language (default: lua)")
  (pr "  -e <expr>\tExpression to evaluate")
  (exit))

(define main ()
  (let (args (target js: (sub process.argv 2) lua: arg))
    (when (or (= (hd args) "-h")
              (= (hd args) "--help"))
      (usage))
    (let (load ()
          input nil
          output nil
          target1 nil
          expr nil
          n (length args)
          i 0)
      (while (< i n)
        (let (arg (at args i))
          (if (or (= arg "-c") (= arg "-o") (= arg "-t") (= arg "-e"))
              (if (= i (- n 1))
                  (pr "missing argument for" arg)
                (do (inc i)
                    (let (val (at args i))
                      (if (= arg "-c") (set input val)
                          (= arg "-o") (set output val)
		          (= arg "-t") (set target1 val)
		          (= arg "-e") (set expr val)))))
	      (not (= "-" (char arg 0)))
              (add load arg))
          (inc i)))
      (series load-file load)
      (if (and input output)
          (do (if target1 (set target target1))
              (compile-file input output))
        (if expr (rep expr) (repl))))))

(main)
