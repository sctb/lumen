;; -*- mode: lisp -*-

;;; language targets

(global current-target 'js)

(macro target (args)
  (local i 0)
  (while (< i (array-length args))
    (if ((= (get (get args i) 0) current-target)
	 (return (get (get args i) 1))))
    (set i (+ i 1))))

(global current-language
  (target (js 'js) (lua 'lua)))


;;; library

(target (js (function error (msg) (throw msg))))

(function type (x)
  (return (target (js (typeof x)) (lua (type x)))))

;; arrays

(function array-length (arr)
  (target
    (js (return arr.length))
    (lua (if ((= (get arr 0) nil) (return 0))
	     (true (return (+ #arr 1)))))))

(function array-sub (arr from upto)
  (target
    (js (return (arr.slice from upto)))
    (lua
     (do (set upto (or upto (array-length arr)))
	 (local i from)
	 (local j 0)
	 (local arr2 {})
	 (while (< i upto)
	   (set (get arr2 j) (get arr i))
	   (set i (+ i 1))
	   (set j (+ j 1)))
	 (return arr2)))))

(function array-push (arr x)
  (set (get arr (array-length arr)) x))

;; strings

(function string-length (str)
  (return (target (js str.length) (lua (string.len str)))))

(function string-start ()
  (return (target (js 0) (lua 1))))

(function string-end (str) ; last valid position
  (return (target (js (- (string-length str) 1))
		  (lua (string-length str)))))

(function string-ref (str n)
  (return (target (js (str.charAt n)) (lua (string.sub str n n)))))

(function string-sub (str from upto)
  (target
    (js (return (str.substring from upto)))
    (lua (do (if ((not (= upto nil)) (set upto (- upto 1))))
	     (return (string.sub str from upto))))))

(function string-find (str pattern start)
  (target
   (js (do (local i (str.indexOf pattern start))
	   (if ((> i 0) (return i))
	       (true (return nil)))))
   (lua (return (string.find str pattern (or start 1) true)))))

;; io

(target (js (set fs (require "fs"))))

(function read-file (filename)
  (target
    (js (return (fs.readFileSync filename "utf8")))
    (lua (do (local f (io.open filename))
	     (return (f:read "*a"))))))

(function write-file (filename data)
  (target
    (js (fs.writeFileSync filename data "utf8"))
    (lua (do (local f (io.open filename "w"))
	     (f:write data)))))

(target (js (function print (x) (console.log x))))

(function exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; numbers

(function parse-number (str)
  (target
    (js (do (local n (parseFloat str))
	    (if ((not (isNaN n)) (return n)))))
    (lua (return (tonumber str)))))


;;; reader

(global delimiters {})
(set (get delimiters "(") true) (set (get delimiters ")") true)
(set (get delimiters ";") true) (set (get delimiters "\n") true)

(global whitespace {})
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(function make-stream (str)
  (local s {})
  (set s.pos (string-start))
  (set s.string str)
  (set s.last (string-end str))
  (return s))

(function peek-char (s)
  (if ((<= s.pos s.last) (return (string-ref s.string s.pos)))))

(function read-char (s)
  (local c (peek-char s))
  (if (c (set s.pos (+ s.pos 1)) (return c))))

(function skip-non-code (s)
  (local c)
  (while true
    (set c (peek-char s))
    (if ((not c) break)
	((get whitespace c) (read-char s))
        ((= c ";")
	 (while (and c (not (= c "\n")))
	   (set c (read-char s)))
	 (skip-non-code s))
	(true break))))

(function read-atom (s)
  (local c)
  (local str "")
  (while true
    (set c (peek-char s))
    (if ((and c (and (not (get whitespace c))
                     (not (get delimiters c))))
         (set str (cat str c))
         (read-char s))
        (true break)))
  (local n (parse-number str))
  (if ((= n nil) (return str))
      (true (return n))))

(function read-list (s)
  (read-char s) ; (
  (local c)
  (local l [])
  (while true
    (skip-non-code s)
    (set c (peek-char s))
    (if ((and c (not (= c ")"))) (array-push l (read s)))
        (c (read-char s) break) ; )
        (true (error (cat "Expected ) at " s.pos)))))
  (return l))

(function read-string (s)
  (read-char s) ; "
  (local c)
  (local str "\"")
  (while true
    (set c (peek-char s))
    (if ((and c (not (= c "\"")))
         (if ((= c "\\") (set str (cat str (read-char s)))))
         (set str (cat str (read-char s))))
        (c (read-char s) break) ; "
        (true (error (cat "Expected \" at " s.pos)))))
  (return (cat str "\"")))

(function read-quote (s)
  (read-char s) ; '
  (return (list "quote" (read s))))

(function read-unquote (s)
  (read-char s) ; ,
  (return (list "unquote" (read s))))

(function read (s)
  (skip-non-code s)
  (local c (peek-char s))
  (if ((= c "(") (return (read-list s)))
      ((= c ")") (error (cat "Unexpected ) at " s.pos)))
      ((= c "\"") (return (read-string s)))
      ((= c "'") (return (read-quote s)))
      ((= c ",") (return (read-unquote s)))
      (true (return (read-atom s)))))


;;; compiler

(global operators {})

(function define-operators ()
  (set (get operators "+") "+") (set (get operators "-") "-")
  (set (get operators "<") "<") (set (get operators ">") ">")
  (set (get operators "<=") "<=") (set (get operators ">=") ">=")
  (set (get operators "=") "==")

  (if ((= current-target 'js)
       (set (get operators "and") "&&"))
      (true (set (get operators "and") " and ")))

  (if ((= current-target 'js)
       (set (get operators "or") "||"))
      (true (set (get operators "or") " or ")))

  (if ((= current-target 'js)
       (set (get operators "cat") "+"))
      (true (set (get operators "cat") ".."))))

(global special {})
(set (get special "do") compile-do)
(set (get special "set") compile-set)
(set (get special "get") compile-get)
(set (get special "dot") compile-dot)
(set (get special "not") compile-not)
(set (get special "if") compile-if)
(set (get special "function") compile-function)
(set (get special "global") compile-global)
(set (get special "local") compile-local)
(set (get special "while") compile-while)
(set (get special "list") compile-list)
(set (get special "quote") compile-quote)

(global macros {})

(function atom? (form)
  (return (or (= (type form) "string") (= (type form) "number"))))

(function call? (form)
  (return (= (type (get form 0)) "string")))

(function operator? (form)
  (return (not (= (get operators (get form 0)) nil))))

(function special? (form)
  (return (not (= (get special (get form 0)) nil))))

(function macro-call? (form)
  (return (not (= (get macros (get form 0)) nil))))

(function macro-definition? (form)
  (return (and (call? form) (= (get form 0) "macro"))))

(function terminator (stmt?)
  (if (stmt? (return ";")) (true (return ""))))

(function compile-args (forms)
  (local i 0)
  (local str "(")
  (while (< i (array-length forms))
    (set str (cat str (compile (get forms i) false)))
    (if ((< i (- (array-length forms) 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-body (forms)
  (local i 0)
  (local str "")
  (if ((= current-target 'js) (set str "{")))
  (while (< i (array-length forms))
    (set str (cat str (compile (get forms i) true)))
    (set i (+ i 1)))
  (if ((= current-target 'js)
       (return (cat str "}")))
      (true (return str))))

(function compile-atom (form stmt?)
  (local atom form)
  (if ((= form "[]")
       (if ((= current-target 'lua) (return "{}"))
	   (true (return form))))
      ((= form "nil")
       (if ((= current-target 'js) (return "undefined"))
	   (true (return form))))
      ((and (= (type form) "string")
	    (not (= (string-ref form (string-start)) "\"")))
       (set atom (string-ref form (string-start)))
       (local i (+ (string-start) 1)) ; skip leading -
       (while (<= i (string-end form))
	 (local c (string-ref form i))
	 (if ((= c "-") (set c "_")))
	 (set atom (cat atom c))
	 (set i (+ i 1)))
       (local last (string-end form))
       (if ((= (string-ref form last) "?")
	    (local name (string-sub atom (string-start) last))
	    (set atom (cat "is_" name))))))
  (return (cat atom (terminator stmt?))))

(function compile-call (form stmt?)
  (local fn (compile (get form 0) false))
  (local args (compile-args (array-sub form 1)))
  (return (cat fn args (terminator stmt?))))

(function compile-operator (form)
  (local i 1)
  (local str "(")
  (local op (get operators (get form 0)))
  (while (< i (array-length form))
    (set str (cat str (compile (get form i) false)))
    (if ((< i (- (array-length form) 1)) (set str (cat str op))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-do (forms stmt?)
  (if ((not stmt?)
       (error "Cannot compile DO as an expression")))
  (local body (compile-body forms))
  (if ((= current-target 'js) (return body))
      (true (return (cat "do " body " end ")))))

(function compile-set (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile assignment as an expression")))
  (if ((< (array-length form) 2)
       (error "Missing right-hand side in assignment")))
  (local lh (compile (get form 0) false))
  (local rh (compile (get form 1) false))
  (return (cat lh "=" rh (terminator true))))

(function compile-branch (branch first? last?)
  (local condition (compile (get branch 0) false))
  (local body (compile-body (array-sub branch 1)))
  (local tr "")
  (if ((and last? (= current-target 'lua)) (set tr " end ")))
  (if (first?
       (if ((= current-target 'js)
	    (return (cat "if(" condition ")" body)))
	   (true (return (cat "if " condition " then " body tr)))))
      ((and last? (= condition "true"))
       (if ((= current-target 'js) (return (cat "else" body)))
	   (true (return (cat " else " body " end ")))))
      (true
       (if ((= current-target 'js)
	    (return (cat "else if(" condition ")" body)))
	   (true
	    (return (cat " elseif " condition " then " body tr)))))))

(function compile-if (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile if as an expression")))
  (local i 0)
  (local str "")
  (while (< i (array-length form))
    (local last? (= i (- (array-length form) 1)))
    (local first? (= i 0))
    (local branch (compile-branch (get form i) first? last?))
    (set str (cat str branch))
    (set i (+ i 1)))
  (return str))

(function compile-function (form stmt?)
  (local name (compile (get form 0)))
  (local args (compile-args (get form 1)))
  (local body (compile-body (array-sub form 2)))
  (local tr "")
  (if ((= current-target 'lua) (set tr " end ")))
  (return (cat "function " name args body tr)))

(function compile-get (form stmt?)
  (local object (compile (get form 0) false))
  (local key (compile (get form 1) false))
  (return (cat object "[" key "]" (terminator stmt?))))

(function compile-dot (form stmt?)
  (local object (compile (get form 0) false))
  (local key (get form 1))
  (return (cat object "." key (terminator stmt?))))

(function compile-not (form stmt?)
  (local expr (compile (get form 0) false))
  (if ((= current-target 'js)
       (return (cat "!(" expr ")" (terminator stmt?))))
      (true (return (cat "(not " expr ")" (terminator stmt?))))))

(function compile-global (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile variable declaration as an expression")))
  (if ((< (array-length form) 2)
       (error "Global variable definition requires a value")))
  (local lh (compile (get form 0)))
  (local rh (compile (get form 1) false))
  (local tr (terminator true))
  (return (cat lh "=" rh tr)))

(function compile-local (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile local variable declaration as an expression")))
  (local lh (compile (get form 0)))
  (local tr (terminator true))
  (local keyword "local ")
  (if ((= current-target 'js) (set keyword "var ")))
  (if ((= (get form 1) nil)
       (return (cat keyword lh tr)))
      (true
       (local rh (compile (get form 1) false))
       (return (cat keyword lh "=" rh tr)))))

(function compile-while (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile WHILE as an expression")))
  (local condition (compile (get form 0) false))
  (local body (compile-body (array-sub form 1)))
  (if ((= current-target 'js)
       (return (cat "while(" condition ")" body)))
      (true (return (cat "while " condition " do " body " end ")))))

(function compile-list (forms stmt? quoted?)
  (if (stmt?
       (error "Cannot compile LIST as a statement")))
  (local i 0)
  (local str "[")
  (if ((= current-target 'lua) (set str "{")))
  (while (< i (array-length forms))
    (local x (get forms i))
    (local x1)
    (if (quoted? (set x1 (quote-form x)))
	(true (set x1 (compile x false))))
    (set str (cat str x1))
    (if ((< i (- (array-length forms) 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (if ((= current-target 'lua) (return (cat str "}")))
      (true (return (cat str "]")))))

(function compile-to-string (form)
  (if ((= (type form) "string")
       (return (cat "\"" form "\"")))
      (true (return (cat form "")))))

(function quote-form (form)
  (if ((and (= (type form) "string")
	    (= (string-ref form (string-start)) "\""))
       (return form))
      ((atom? form) (return (compile-to-string form)))
      ((= (get form 0) "unquote")
       (return (compile (get form 1) false)))
      (true (return (compile-list form false true)))))

(function compile-quote (forms stmt?)
  (if (stmt?
       (error "Cannot compile quoted form as a statement")))
  (if ((< (array-length forms) 1)
       (error "Must supply at least one argument to QUOTE")))
  (return (quote-form (get forms 0))))	; first arg only

(function compile-macro (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile macro definition as an expression")))
  (local tmp current-target)
  (set current-target current-language)
  (eval (compile-function form true))
  (local name (get form 0))
  (local register
    '(set (get macros ,(compile-to-string name)) ,name))
  (eval (compile register true))
  (set current-target tmp))

(function compile (form stmt?)
  (if ((= form nil) (return ""))
      ((atom? form) (return (compile-atom form stmt?)))
      ((call? form)
       (if ((and (operator? form) stmt?)
            (error (cat "Cannot compile operator application as a statement")))
           ((operator? form)
            (return (compile-operator form)))
	   ((macro-definition? form)
	    (compile-macro (array-sub form 1) stmt?)
	    (return ""))
           ((special? form)
            (local fn (get special (get form 0)))
            (return (fn (array-sub form 1) stmt?)))
	   ((macro-call? form)
	    (local fn (get macros (get form 0)))
	    (local form (fn (array-sub form 1)))
	    (return (compile form stmt?)))
           (true (return (compile-call form stmt?)))))
      (true (error (cat "Unexpected form: " form)))))

(function compile-file (filename)
  (local form)
  (local output "")
  (local s (make-stream (read-file filename)))
  (while true
    (set form (read s))
    (if (form (set output (cat output (compile form true))))
        (true break)))
  (return output))

(function usage ()
  (print "usage: x input [-o output] [-t target]")
  (exit))

(global args
  (target (js (array-sub process.argv 2))
	  (lua (array-sub arg 1))))

(if ((< (array-length args) 1) (usage)))

(global input (get args 0))
(global output
  (cat (string-sub input (string-start) (string-find input ".")) ".js"))
(global i 1)

(while (< i (array-length args))
  (local arg (get args i))
  (if ((or (= arg "-o") (= arg "-t"))
       (if ((> (array-length args) (+ i 1))
	    (set i (+ i 1))
	    (local arg2 (get args i))
	    (if ((= arg "-o") (set output arg2))
		(true (set current-target arg2))))
	   (true (print "missing argument for" arg) (usage))))
      (true (print "unrecognized option:" arg) (usage)))
  (set i (+ i 1)))

(define-operators)
(write-file output (compile-file input))
