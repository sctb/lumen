;; -*- mode: lisp -*-

(defun rep (str)
  (print (to-string (eval (compile (read-from-string str))))))

(defun repl ()
  (local execute (lambda (str) (rep str) (write "> ")))
  (write "> ")
  (target
   (js (do (process.stdin.resume)
	   (process.stdin.setEncoding 'utf8)
	   (process.stdin.on 'data execute)))
   (lua (while true
	  (local str (io.stdin:read))
	  (if str (execute str) break)))))

(set args (target (js (sub process.argv 2)) (lua arg)))
(set standard '(boot.x lib.x reader.x compiler.x))

(defun usage ()
  (print "usage: x [<inputs>] [-o <output>] [-t <target>] [-e <expr>]")
  (exit))

(set dir (at args 0))

(if (or (= (at args 1) "-h")
	(= (at args 1) "--help"))
    (usage))

(do (local inputs ())
    (local output nil)
    (local target nil)
    (local expr nil)
    (across (args arg i 1)
      (if (or (= arg "-o") (= arg "-t") (= arg "-e"))
	  (if (= i (- (length args) 1))
	      (print "missing argument for" arg)
	    (do (set i (+ i 1))
		(local arg2 (at args i))
		(if (= arg "-o") (set output arg2)
		    (= arg "-t") (set target arg2)
		    (= arg "-e") (set expr arg2))))
	  (= "-" (sub arg 0 1))
	  (do (print "unrecognized option:" arg) (usage))
	(push inputs arg)))
    (if output
	(do (if target (set current-target target))
	    (write-file output (compile-files inputs)))
      (do (across (standard file)
	    (eval (compile-file (cat dir "/" file))))
	  (across (inputs file)
	    (eval (compile-file file)))
	  (if expr (rep expr) (repl)))))
