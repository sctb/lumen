;; -*- mode: lisp -*-

;;; TODO
;;   Implement UNQUOTE-SPLICING
;;   Add argument list support to macros
;;   Add basic iteration functions/macros


;;; language targets

(set current-target 'js)

(macro target (args)
  (local i 0)
  (while (< i (array-length args))
    (if ((= (get (get args i) 0) current-target)
	 (return (get (get args i) 1))))
    (set i (+ i 1))))

(set current-language
  (target (js 'js) (lua 'lua)))


;;; library

(target (js (function error (msg) (throw msg))))
(target (js (function type (x) (return (typeof x)))))

(target
 (lua (function eval (x)
        (local f (loadstring x))
	(return (f)))))

(macro ? (args)
  (return '(or (and ,(get args 0) ,(get args 1)) ,(get args 2))))

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
	 (local arr2 [])
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

(function string-ref (str n)
  (return (target (js (str.charAt n))
		  (lua (string.sub str (+ n 1) (+ n 1))))))

(function string-sub (str from upto)
  (target
    (js (return (str.substring from upto)))
    (lua (return (string.sub str (+ from 1) upto)))))

(function string-find (str pattern start)
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
  (return (and (composite? x) (= (get x 0) nil))))
(function array? (x)
  (return (and (composite? x) (not (= (get x 0) nil)))))

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
       (while (< i (array-length x))
	 (local y (get x i))
	 (set str (cat str (to-string y)))
	 (if ((< i (- (array-length x) 1))
	      (set str (cat str " "))))
	 (set i (+ i 1)))
       (return (cat str  "]")))))


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
  (set s.length (string-length str))
  (return s))

(function peek-char (s)
  (return (? (< s.pos s.length) (string-ref s.string s.pos) eof)))

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
    (if ((and c (not (= c ")"))) (array-push l (read s)))
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

(function define-operators ()
  (set (get operators "+") "+") (set (get operators "-") "-")
  (set (get operators "<") "<") (set (get operators ">") ">")
  (set (get operators "<=") "<=") (set (get operators ">=") ">=")
  (set (get operators "=") "==")
  (set (get operators "and") (? (= current-target 'js) "&&" " and "))
  (set (get operators "or") (? (= current-target 'js) "||" " or "))
  (set (get operators "cat") (? (= current-target 'js) "+" "..")))

(set special {})

(function define-special ()
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
  (set (get special "quote") compile-quote))

(set macros {})

(function call? (form)
  (return (string? (get form 0))))

(function operator? (form)
  (return (not (= (get operators (get form 0)) nil))))

(function special? (form)
  (return (not (= (get special (get form 0)) nil))))

(function macro-call? (form)
  (return (not (= (get macros (get form 0)) nil))))

(function macro-definition? (form)
  (return (= (get form 0) "macro")))

(function terminator (stmt?)
  (return (? stmt? ";" "")))

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
  (local str (? (= current-target 'js) "{" ""))
  (while (< i (array-length forms))
    (set str (cat str (compile (get forms i) true)))
    (set i (+ i 1)))
  (return (? (= current-target 'js) (cat str "}") str)))

(function normalize (id)
  (local id2 "")
  (local i 0)
  (while (< i (string-length id))
    (local c (string-ref id i))
    (if ((= c "-") (set c "_")))
    (set id2 (cat id2 c))
    (set i (+ i 1)))
  (local last (- (string-length id) 1))
  (if ((= (string-ref id last) "?")
       (local name (string-sub id2 0 last))
       (set id2 (cat "is_" name))))
  (return id2))

(function compile-atom (form stmt?)
  (if ((= form "[]")
       (return (? (= current-target 'lua) "{}" "[]")))
      ((= form "nil")
       (return (? (= current-target 'js) "undefined" "nil")))
      ((and (string? form) (not (= (string-ref form 0) "\"")))
       (return (cat (normalize form) (terminator stmt?))))
      (true (return (to-string form)))))

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
  (return (? (= current-target 'js) body (cat "do " body " end "))))

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
  (local tr (? (= current-target 'lua) " end " ""))
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
  (local tr (terminator stmt?))
  (return (? (= current-target 'js)
	     (cat "!(" expr ")" tr)
	     (cat "(not " expr ")" tr))))

(function compile-local (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile local variable declaration as an expression")))
  (local lh (compile (get form 0)))
  (local tr (terminator true))
  (local keyword (? (= current-target 'js) "var " "local "))
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
  (return (? (= current-target 'js)
	     (cat "while(" condition ")" body)
	     (cat "while " condition " do " body " end "))))

(function compile-list (forms stmt? quoted?)
  (if (stmt?
       (error "Cannot compile LIST as a statement")))
  (local i 0)
  (local str (? (= current-target 'lua) "{" "["))
  (while (< i (array-length forms))
    (local x (get forms i))
    (local x1 (? quoted? (quote-form x) (compile x false)))
    (if ((and (= i 0)
	      (= current-target 'lua))
	 (set str (cat str "[0]="))))
    (set str (cat str x1))
    (if ((< i (- (array-length forms) 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str (? (= current-target 'lua) "}" "]"))))

(function compile-to-string (form)
  (return (? (string? form) (cat "\"" form "\"") (to-string form))))

(function quote-form (form)
  (if ((and (string? form) (= (string-ref form 0) "\""))
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


;;; command-line

(function usage ()
  (print "usage: x input [-o output] [-t target]")
  (exit))

(set args
  (target (js (array-sub process.argv 2)) (lua (array-sub arg 1))))

(if ((< (array-length args) 1) (usage)))

(set input (get args 0))
(set output false)
(set i 1)

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

(if ((= output false)
     (local name (string-sub input 0 (string-find input ".")))
     (set output (cat name "." current-target))))

(define-operators)
(define-special)

(write-file output (compile-file input))
