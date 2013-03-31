;; -*- mode: lisp -*-

;;; TODO
;;   Implement UNQUOTE-SPLICING
;;   Add argument list support to macros
;;   Add basic iteration functions/macros


;;; library

;; macros

(macro at (args)
  (local arr (get args 0))
  (local i (get args 1))
  (if ((= current-language 'lua)
       (set arr (get args 1))
       (set i (get args 2))))
  (if ((and (= current-target 'lua) (number? i))
       (set i (+ i 1)))
      ((= current-target 'lua) (set i '(+ ,i 1))))
  (return '(get ,arr ,i)))

(macro ? (args)
  (return '(or (and ,(at args 0) ,(at args 1)) ,(at args 2))))

;; languages

(set current-target 'js)

(macro target (args)
  (local i 0)
  (while (< i (length args))
    (if ((= (at (at args i) 0) current-target)
	 (return (at (at args i) 1))))
    (set i (+ i 1))))

;; sequences

(function length (x)
  (return (target (js x.length) (lua #x))))

(function sub (x from upto)
  (if ((string? x)
       (target
	(js (return (x.substring from upto)))
	(lua (return (string.sub x (+ from 1) upto)))))
      (true
       (target
	(js (return (x.slice from upto)))
	(lua
	 (do (set upto (or upto (length x)))
	     (local i from)
	     (local j 0)
	     (local x2 [])
	     (while (< i upto)
	       (set (at x2 j) (at x i))
	       (set i (+ i 1))
	       (set j (+ j 1)))
	     (return x2)))))))

;; arrays

(function push (arr x)
  (set (at arr (length arr)) x))

(function join (a1 a2)
  (target
    (js (return (a1.concat a2)))
    (lua
     (do (local a3 [])
	 (local i 0)
	 (local len (length a1))
	 (while (< i len)
	   (set (at a3 i) (at a1 i))
	   (set i (+ i 1)))
	 (while (< i (+ len (length a2)))
	   (set (at a3 i) (at a2 (- i len)))
	   (set i (+ i 1)))
	 (return a3)))))

;; strings

(function char (str n)
  (return (target (js (str.charAt n))
		  (lua (string.sub str (+ n 1) (+ n 1))))))

(function find (str pattern start)
  (target
   (js (do (local i (str.indexOf pattern start))
	   (return (and (> i 0) i))))
   (lua (do (if (start (set start (+ start 1))))
	    (local i (string.find str pattern start true))
	    (return (and i (- i 1)))))))

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

;; predicates

(function string? (x) (return (= (type x) "string")))
(function number? (x) (return (= (type x) "number")))
(function boolean? (x) (return (= (type x) "boolean")))

(function composite? (x)
  (return (= (type x) (target (js "object") (lua "table")))))
(function atom? (x) (return (not (composite? x))))

(function table? (x)
  (return (and (composite? x) (= (at x 0) nil))))
(function array? (x)
  (return (and (composite? x) (not (= (at x 0) nil)))))

;; numbers

(function parse-number (str)
  (target
    (js (do (local n (parseFloat str))
	    (if ((not (isNaN n)) (return n)))))
    (lua (return (tonumber str)))))

;; printing

(function to-string (x)
  (if ((= x nil) (return "nil"))
      ((boolean? x) (return (? x "true" "false")))
      ((atom? x) (return (cat x "")))
      (true
       (local str "[")
       (local i 0)
       (while (< i (length x))
	 (local y (at x i))
	 (set str (cat str (to-string y)))
	 (if ((< i (- (length x) 1))
	      (set str (cat str " "))))
	 (set i (+ i 1)))
       (return (cat str  "]")))))

;; misc

(target (js (function error (msg) (throw msg))))
(target (js (function type (x) (return (typeof x)))))

(target
 (lua (function eval (x)
        (local f (loadstring x))
	(return (f)))))

(set current-language
  (target (js 'js) (lua 'lua)))


;;; reader

(set delimiters {})
(set (get delimiters "(") true) (set (get delimiters ")") true)
(set (get delimiters ";") true) (set (get delimiters "\n") true)

(set whitespace {})
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(set eof {})

(function make-stream (str)
  (local s {})
  (set s.pos 0)
  (set s.string str)
  (set s.length (length str))
  (return s))

(function peek-char (s)
  (return (? (< s.pos s.length) (char s.string s.pos) eof)))

(function read-char (s)
  (local c (peek-char s))
  (if (c (set s.pos (+ s.pos 1)) (return c))))

(function skip-non-code (s)
  (while true
    (local c (peek-char s))
    (if ((not c) break)
	((get whitespace c) (read-char s))
        ((= c ";")
	 (while (and c (not (= c "\n")))
	   (set c (read-char s)))
	 (skip-non-code s))
	(true break))))

(function read-atom (s)
  (local str "")
  (while true
    (local c (peek-char s))
    (if ((and c (and (not (get whitespace c))
                     (not (get delimiters c))))
         (set str (cat str c))
         (read-char s))
        (true break)))
  (local n (parse-number str))
  (return (? (= n nil) str n)))

(function read-list (s)
  (read-char s) ; (
  (local l [])
  (while true
    (skip-non-code s)
    (local c (peek-char s))
    (if ((and c (not (= c ")"))) (push l (read s)))
        (c (read-char s) break) ; )
        (true (error (cat "Expected ) at " s.pos)))))
  (return l))

(function read-string (s)
  (read-char s) ; "
  (local str "\"")
  (while true
    (local c (peek-char s))
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
  (if ((= c eof) (return c))
      ((= c "(") (return (read-list s)))
      ((= c ")") (error (cat "Unexpected ) at " s.pos)))
      ((= c "\"") (return (read-string s)))
      ((= c "'") (return (read-quote s)))
      ((= c ",") (return (read-unquote s)))
      (true (return (read-atom s)))))


;;; compiler

(set operators {})

(set (get operators 'js) {})
(set (get (get operators 'js) "+") "+")
(set (get (get operators 'js) "-") "-")
(set (get (get operators 'js) "<") "<")
(set (get (get operators 'js) ">") ">")
(set (get (get operators 'js) "=") "==")
(set (get (get operators 'js) "<=") "<=")
(set (get (get operators 'js) ">=") ">=")
(set (get (get operators 'js) "and") "&&")
(set (get (get operators 'js) "or") "||")
(set (get (get operators 'js) "cat") "+")

(set (get operators 'lua) {})
(set (get (get operators 'lua) "+") "+")
(set (get (get operators 'lua) "-") "-")
(set (get (get operators 'lua) "<") "<")
(set (get (get operators 'lua) ">") ">")
(set (get (get operators 'lua) "=") "==")
(set (get (get operators 'lua) "<=") "<=")
(set (get (get operators 'lua) ">=") ">=")
(set (get (get operators 'lua) "and") " and ")
(set (get (get operators 'lua) "or") " or ")
(set (get (get operators 'lua) "cat") "..")

(function get-op (op)
  (return (get (get operators current-target) op)))

(set macros {})
(set special {})

(function call? (form)
  (return (string? (at form 0))))

(function operator? (form)
  (return (not (= (get-op (at form 0)) nil))))

(function special? (form)
  (return (not (= (get special (at form 0)) nil))))

(function macro-call? (form)
  (return (not (= (get macros (at form 0)) nil))))

(function macro-definition? (form)
  (return (= (at form 0) "macro")))

(function terminator (stmt?)
  (return (? stmt? ";" "")))

(function compile-args (forms)
  (local i 0)
  (local str "(")
  (while (< i (length forms))
    (set str (cat str (compile (at forms i) false)))
    (if ((< i (- (length forms) 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-body (forms)
  (local i 0)
  (local str (? (= current-target 'js) "{" ""))
  (while (< i (length forms))
    (set str (cat str (compile (at forms i) true)))
    (set i (+ i 1)))
  (return (? (= current-target 'js) (cat str "}") str)))

(function normalize (id)
  (local id2 "")
  (local i 0)
  (while (< i (length id))
    (local c (char id i))
    (if ((= c "-") (set c "_")))
    (set id2 (cat id2 c))
    (set i (+ i 1)))
  (local last (- (length id) 1))
  (if ((= (char id last) "?")
       (local name (sub id2 0 last))
       (set id2 (cat "is_" name))))
  (return id2))

(function compile-atom (form stmt?)
  (if ((= form "[]")
       (return (? (= current-target 'lua) "{}" "[]")))
      ((= form "nil")
       (return (? (= current-target 'js) "undefined" "nil")))
      ((and (string? form) (not (= (char form 0) "\"")))
       (return (cat (normalize form) (terminator stmt?))))
      (true (return (to-string form)))))

(function compile-call (form stmt?)
  (local fn (compile (at form 0) false))
  (local args (compile-args (sub form 1)))
  (return (cat fn args (terminator stmt?))))

(function compile-operator (form)
  (local i 1)
  (local str "(")
  (local op (get-op (at form 0)))
  (while (< i (length form))
    (set str (cat str (compile (at form i) false)))
    (if ((< i (- (length form) 1)) (set str (cat str op))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-do (forms stmt?)
  (if ((not stmt?)
       (error "Cannot compile DO as an expression")))
  (local body (compile-body forms))
  (return (? (= current-target 'js) body (cat "do " body " end "))))

(function compile-set (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile assignment as an expression")))
  (if ((< (length form) 2)
       (error "Missing right-hand side in assignment")))
  (local lh (compile (at form 0) false))
  (local rh (compile (at form 1) false))
  (return (cat lh "=" rh (terminator true))))

(function compile-branch (branch first? last?)
  (local condition (compile (at branch 0) false))
  (local body (compile-body (sub branch 1)))
  (local tr "")
  (if ((and last? (= current-target 'lua)) (set tr " end ")))
  (if (first? (return
	       (? (= current-target 'js)
		  (cat "if(" condition ")" body)
		  (cat "if " condition " then " body tr))))
      ((and last? (= condition "true"))
       (return (? (= current-target 'js)
		  (cat "else" body)
		  (cat " else " body " end "))))
      (true
       (return (? (= current-target 'js)
		  (cat "else if(" condition ")" body)
		  (cat " elseif " condition " then " body tr))))))

(function compile-if (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile IF as an expression")))
  (local i 0)
  (local str "")
  (while (< i (length form))
    (local last? (= i (- (length form) 1)))
    (local first? (= i 0))
    (local branch (compile-branch (at form i) first? last?))
    (set str (cat str branch))
    (set i (+ i 1)))
  (return str))

(function compile-function (form stmt?)
  (local name (compile (at form 0)))
  (local args (compile-args (at form 1)))
  (local body (compile-body (sub form 2)))
  (local tr (? (= current-target 'lua) " end " ""))
  (return (cat "function " name args body tr)))

(function compile-get (form stmt?)
  (local object (compile (at form 0) false))
  (local key (compile (at form 1) false))
  (return (cat object "[" key "]" (terminator stmt?))))

(function compile-dot (form stmt?)
  (local object (compile (at form 0) false))
  (local key (at form 1))
  (return (cat object "." key (terminator stmt?))))

(function compile-not (form stmt?)
  (local expr (compile (at form 0) false))
  (local tr (terminator stmt?))
  (return (? (= current-target 'js)
	     (cat "!(" expr ")" tr)
	     (cat "(not " expr ")" tr))))

(function compile-local (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile local variable declaration as an expression")))
  (local lh (compile (at form 0)))
  (local tr (terminator true))
  (local keyword (? (= current-target 'js) "var " "local "))
  (if ((= (at form 1) nil)
       (return (cat keyword lh tr)))
      (true
       (local rh (compile (at form 1) false))
       (return (cat keyword lh "=" rh tr)))))

(function compile-while (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile WHILE as an expression")))
  (local condition (compile (at form 0) false))
  (local body (compile-body (sub form 1)))
  (return (? (= current-target 'js)
	     (cat "while(" condition ")" body)
	     (cat "while " condition " do " body " end "))))

(function compile-list (forms stmt? quoted?)
  (if (stmt?
       (error "Cannot compile LIST as a statement")))
  (local i 0)
  (local str (? (= current-target 'lua) "{" "["))
  (while (< i (length forms))
    (local x (at forms i))
    (local x1 (? quoted? (quote-form x) (compile x false)))
    (set str (cat str x1))
    (if ((< i (- (length forms) 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str (? (= current-target 'lua) "}" "]"))))

(function compile-to-string (form)
  (if ((and (string? form) (= (char form 0) "\""))
       (return form))
      ((string? form) (return (cat "\"" form "\"")))
      (true (return (to-string form)))))

(function quote-form (form)
  (if ((atom? form) (return (compile-to-string form)))
      ((= (at form 0) "unquote")
       (return (compile (at form 1) false)))
      (true (return (compile-list form false true)))))

(function compile-quote (forms stmt?)
  (if (stmt?
       (error "Cannot compile quoted form as a statement")))
  (if ((< (length forms) 1)
       (error "Must supply at least one argument to QUOTE")))
  (return (quote-form (at forms 0))))	; first arg only

(function compile-macro (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile macro definition as an expression")))
  (local tmp current-target)
  (set current-target current-language)
  (eval (compile-function form true))
  (local name (at form 0))
  (local register
    '(set (get macros ,(compile-to-string name)) ,name))
  (eval (compile register true))
  (set current-target tmp))

(set (get special "do") compile-do)
(set (get special "set") compile-set)
(set (get special "get") compile-get)
(set (get special "dot") compile-dot)
(set (get special "not") compile-not)
(set (get special "if") compile-if)
(set (get special "function") compile-function)
(set (get special "local") compile-local)
(set (get special "while") compile-while)
(set (get special "list") compile-list)
(set (get special "quote") compile-quote)

(function compile (form stmt?)
  (if ((= form nil) (return ""))
      ((atom? form) (return (compile-atom form stmt?)))
      ((call? form)
       (if ((and (operator? form) stmt?)
            (error (cat "Cannot compile operator application as a statement")))
           ((operator? form)
            (return (compile-operator form)))
	   ((macro-definition? form)
	    (compile-macro (sub form 1) stmt?)
	    (return ""))
           ((special? form)
            (local fn (get special (at form 0)))
            (return (fn (sub form 1) stmt?)))
	   ((macro-call? form)
	    (local fn (get macros (at form 0)))
	    (local form (fn (sub form 1)))
	    (return (compile form stmt?)))
           (true (return (compile-call form stmt?)))))
      (true (error (cat "Unexpected form: " (to-string form))))))

(function compile-file (filename)
  (local form)
  (local output "")
  (local s (make-stream (read-file filename)))
  (while true
    (set form (read s))
    (if ((= form eof) break))
    (set output (cat output (compile form true))))
  (return output))


;;; tests

(set tests [])

(function run-tests ()
  (print "running tests...")
  (local i 0)
  (while (< i (length tests))
    (set i (+ i 1))))


;;; command-line

(function usage ()
  (print "usage: x [<input> | -t] [-o <output>] [-l <language>]")
  (exit))

(set args (target (js (sub process.argv 2)) (lua arg)))

(if ((< (length args) 1) (usage))
    ((= (at args 0) "-t") (run-tests))
    (true
     (local input (at args 0))
     (local output false)
     (local i 1)
     (while (< i (length args))
       (local arg (at args i))
       (if ((or (= arg "-o") (= arg "-l"))
	    (if ((> (length args) (+ i 1))
		 (set i (+ i 1))
		 (local arg2 (at args i))
		 (if ((= arg "-o") (set output arg2))
		     (true (set current-target arg2))))
		(true (print "missing argument for" arg) (usage))))
	   (true (print "unrecognized option:" arg) (usage)))
       (set i (+ i 1)))
     (if ((= output false)
	  (local name (sub input 0 (find input ".")))
	  (set output (cat name "." current-target))))
     (write-file output (compile-file input))))
