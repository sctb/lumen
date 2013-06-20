;; -*- mode: lisp -*-

;;; TODO
;;   Keywords and keyword arguments
;;   Named variable arguments (foo...)
;;   LET


;;; library

;; macros

(macro at (arr i)
  (if ((and (= current-target 'lua) (number? i))
       (set i (+ i 1)))
      ((= current-target 'lua) (set i '(+ ,i 1))))
  '(get ,arr ,i))

(macro across (args ...)
  (local l (at args 0))
  (local v (at args 1))
  (local i (or (at args 2) (make-unique)))
  (local o (or (at args 3) 0))
  (local l1 (make-unique))
  '(do
    (local ,i ,o)
    (local ,l1 ,l)
    (while (< ,i (length ,l1))
      (local ,v (at ,l1 ,i))
      ,@...
      (set ,i (+ ,i 1)))))

(macro ? (a b c) '(or (and ,a ,b) ,c))

;; languages

(set current-target 'js)

(macro target (...)
  (across (... clause)
    (if ((= (at clause 0) current-target)
	 (return (at clause 1))))))

(set current-language
  (target (js 'js) (lua 'lua)))

;; sequences

(function length (x)
  (target (js x.length) (lua #x)))

(function sub (x from upto)
  (if ((string? x)
       (target
	(js (x.substring from upto))
	(lua (string.sub x (+ from 1) upto))))
      (true
       (target
	(js (x.slice from upto))
	(lua
	 (do (set upto (or upto (length x)))
	     (local i from)
	     (local j 0)
	     (local x2 '())
	     (while (< i upto)
	       (set (at x2 j) (at x i))
	       (set i (+ i 1))
	       (set j (+ j 1)))
	     x2))))))

;; lists

(function push (arr x)
  (set (at arr (length arr)) x))

(function join (a1 a2)
  (target
    (js (a1.concat a2))
    (lua
     (do (local a3 '())
	 (local i 0)
	 (local len (length a1))
	 (while (< i len)
	   (set (at a3 i) (at a1 i))
	   (set i (+ i 1)))
	 (while (< i (+ len (length a2)))
	   (set (at a3 i) (at a2 (- i len)))
	   (set i (+ i 1)))
	 a3))))

;; strings

(function char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(function find (str pattern start)
  (target
   (js (do (local i (str.indexOf pattern start))
	   (and (> i 0) i)))
   (lua (do (if (start (set start (+ start 1))))
	    (local i (string.find str pattern start true))
	    (and i (- i 1))))))

;; io

(target (js (set fs (require 'fs))))

(function read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (do (local f (io.open path))
	     (f:read "*a")))))

(function write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (do (local f (io.open path "w"))
	     (f:write data)))))

(target (js (function print (x) (console.log x))))

(function exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; predicates

(function string? (x) (= (type x) "string"))
(function number? (x) (= (type x) "number"))
(function boolean? (x) (= (type x) "boolean"))
(function composite? (x) (= (type x) (target (js "object") (lua "table"))))
(function atom? (x) (not (composite? x)))
(function table? (x) (and (composite? x) (= (at x 0) nil)))
(function list? (x) (and (composite? x) (not (= (at x 0) nil))))

;; numbers

(function parse-number (str)
  (target
    (js (do (local n (parseFloat str))
	    (if ((not (isNaN n)) n))))
    (lua (tonumber str))))

;; printing

(function to-string (x)
  (if ((= x nil) "nil")
      ((boolean? x) (? x "true" "false"))
      ((atom? x) (cat x ""))
      (true
       (local str "(")
       (across (x y i)
         (set str (cat str (to-string y)))
	 (if ((< i (- (length x) 1))
	      (set str (cat str " ")))))
       (cat str  ")"))))

;; misc

(target (js (function error (msg) (throw msg) nil)))
(target (js (function type (x) (typeof x))))

(function apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(set unique-counter 0)

(function make-unique (prefix)
  (set unique-counter (+ unique-counter 1))
  (cat "_" (or prefix "") unique-counter))

(set eval-result nil)

(target
 (lua (function eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (local y (cat "eval_result=" x))
	(local f (load y))
	(if (f (f) eval-result)
	    (true
	     (local f (load x))
	     (and f (f)))))))


;;; reader

(set eof (table))

(set delimiters (table))
(set (get delimiters "(") true)
(set (get delimiters ")") true)
(set (get delimiters ";") true)
(set (get delimiters eof) true)
(set (get delimiters "\n") true)

(set whitespace (table))
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(function make-stream (str)
  (table pos 0 string str len (length str)))

(function peek-char (s)
  (? (< s.pos s.len) (char s.string s.pos) eof))

(function read-char (s)
  (local c (peek-char s))
  (if (c (set s.pos (+ s.pos 1)) c)))

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
  (? (= n nil) str n))

(function read-list (s)
  (read-char s) ; (
  (local l '())
  (while true
    (skip-non-code s)
    (local c (peek-char s))
    (if ((and c (not (= c ")"))) (push l (read s)))
        (c (read-char s) break) ; )
        (true (error (cat "Expected ) at " s.pos)))))
  l)

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
  (cat str "\""))

(function read-quote (s)
  (read-char s) ; '
  (list "quote" (read s)))

(function read-unquote (s)
  (read-char s) ; ,
  (if ((= (peek-char s) "@")
       (read-char s) ; @
       (list "unquote-splicing" (read s)))
      (true (list "unquote" (read s)))))

(function read (s)
  (skip-non-code s)
  (local c (peek-char s))
  (if ((= c eof) c)
      ((= c "(") (read-list s))
      ((= c ")") (error (cat "Unexpected ) at " s.pos)))
      ((= c "\"") (read-string s))
      ((= c "'") (read-quote s))
      ((= c ",") (read-unquote s))
      (true (read-atom s))))

(function read-from-string (str) (read (make-stream str)))


;;; compiler

(set operators (table))

(set (get operators 'common) (table))
(set (get (get operators 'common) "+") "+")
(set (get (get operators 'common) "-") "-")
(set (get (get operators 'common) "*") "*")
(set (get (get operators 'common) "/") "/")
(set (get (get operators 'common) "<") "<")
(set (get (get operators 'common) ">") ">")
(set (get (get operators 'common) "=") "==")
(set (get (get operators 'common) "<=") "<=")
(set (get (get operators 'common) ">=") ">=")

(set (get operators 'js) (table))
(set (get (get operators 'js) "and") "&&")
(set (get (get operators 'js) "or") "||")
(set (get (get operators 'js) "cat") "+")

(set (get operators 'lua) (table))
(set (get (get operators 'lua) "and") " and ")
(set (get (get operators 'lua) "or") " or ")
(set (get (get operators 'lua) "cat") "..")

(function get-op (op)
  (or (get (get operators 'common) op)
      (get (get operators current-target) op)))

(set macros (table))
(set special (table))

(function call? (form) (string? (at form 0)))
(function operator? (form) (not (= (get-op (at form 0)) nil)))
(function special? (form) (not (= (get special (at form 0)) nil)))
(function macro-call? (form) (not (= (get macros (at form 0)) nil)))
(function macro-definition? (form) (= (at form 0) "macro"))

(function compile-args (forms compile?)
  (local str "(")
  (across (forms x i)
    (local x1 (? compile? (compile x) (normalize x)))
    (set str (cat str x1))
    (if ((< i (- (length forms) 1)) (set str (cat str ",")))))
  (cat str ")"))

(function compile-body (forms tail?)
  (local str (? (= current-target 'js) "{" ""))
  (across (forms x i)
    (local t? (and tail? (= i (- (length forms) 1))))
    (set str (cat str (compile x true t?))))
  (? (= current-target 'js) (cat str "}") str))

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
  id2)

(function compile-atom (form)
  (if ((= form "nil")
       (? (= current-target 'js) "undefined" "nil"))
      ((and (string? form) (not (= (char form 0) "\"")))
       (normalize form))
      (true (to-string form))))

(function compile-call (form)
  (local fn (compile (at form 0)))
  (local args (compile-args (sub form 1) true))
  (cat fn args))

(function compile-operator (form)
  (local str "(")
  (local op (get-op (at form 0)))
  (across (form arg i 1)
    (set str (cat str (compile arg)))
    (if ((< i (- (length form) 1)) (set str (cat str op)))))
  (cat str ")"))

(function compile-do (forms tail?)
  (local body (compile-body forms tail?))
  (? (= current-target 'js) body (cat "do " body " end ")))

(function compile-set (form)
  (if ((< (length form) 2)
       (error "Missing right-hand side in assignment")))
  (local lh (compile (at form 0)))
  (local rh (compile (at form 1)))
  (cat lh "=" rh))

(function compile-branch (branch first? last? tail?)
  (local condition (compile (at branch 0)))
  (local body (compile-body (sub branch 1) tail?))
  (local tr "")
  (if ((and last? (= current-target 'lua)) (set tr " end ")))
  (if (first?
       (? (= current-target 'js)
	  (cat "if(" condition ")" body)
	  (cat "if " condition " then " body tr)))
      ((and last? (= condition "true"))
       (? (= current-target 'js)
	  (cat "else" body)
	  (cat " else " body " end ")))
      (true
       (? (= current-target 'js)
	  (cat "else if(" condition ")" body)
	  (cat " elseif " condition " then " body tr)))))

(function compile-if (form tail?)
  (local str "")
  (across (form branch i)
    (local last? (= i (- (length form) 1)))
    (local first? (= i 0))
    (set str (cat str (compile-branch branch first? last? tail?))))
  str)

(function bind-arguments (args body)
  (across (args arg i)
    (if ((= arg '...)
         (set args (sub args 0 i))
	 (local name (make-unique))
	 (local expr '(list ...))
	 (if ((= current-target 'js)
	      (set expr '(Array.prototype.slice.call arguments ,i)))
	     (true (push args '...)))
	 (process-body body name)
	 (set body (join '((local ,name ,expr)) body))
	 break)))
  (list args body))

(function process-body (body vararg)	; destructive
  (across (body form i)
    (if ((= form '...) (set (at body i) vararg))
	((list? form) (process-body form vararg)))))

(function compile-function (form)
  (local i 0)
  (local name "")
  (if ((string? (at form 0))
       (set i 1)
       (set name (normalize (at form 0)))))
  (local expanded
    (bind-arguments (at form i) (sub form (+ i 1))))
  (local args (compile-args (at expanded 0)))
  (local body (compile-body (at expanded 1) true))
  (local tr (? (= current-target 'lua) " end " ""))
  (cat "function " name args body tr))

(function compile-get (form)
  (local object (compile (at form 0)))
  (local key (compile (at form 1)))
  (if ((and (= current-target 'lua)
	    (= (char object 0) "{"))
       (set object (cat "(" object ")"))))
  (cat object "[" key "]"))

(function compile-dot (form)
  (local object (compile (at form 0)))
  (local key (at form 1))
  (cat object "." key))

(function compile-not (form)
  (local expr (compile (at form 0)))
  (local open (? (= current-target 'js) "!(" "(not "))
  (cat open expr ")"))

(function compile-local (form)
  (local lh (compile (at form 0)))
  (local keyword (? (= current-target 'js) "var " "local "))
  (if ((= (at form 1) nil) (cat keyword lh))
      (true (local rh (compile (at form 1)))
	    (cat keyword lh "=" rh))))

(function compile-while (form)
  (local condition (compile (at form 0)))
  (local body (compile-body (sub form 1)))
  (? (= current-target 'js)
     (cat "while(" condition ")" body)
     (cat "while " condition " do " body " end ")))

(function compile-list (forms quoted?)
  (local open (? (= current-target 'lua) "{" "["))
  (local close (? (= current-target 'lua) "}" "]"))
  (local str "")
  (across (forms x i)
    (if ((and (list? x) (= (at x 0) "unquote-splicing"))
	 (local x1 (compile (at x 1)))
	 (local x2 (compile-list (sub forms (+ i 1)) true))
	 (set open (cat "join(" open))
	 (set close (cat close ",join(" x1 "," x2 "))"))
	 break)
	(true
	 (local x1 (? quoted? (quote-form x) (compile x)))
	 (set str (cat str x1))
	 (if ((< i (- (length forms) 1)) (set str (cat str ",")))))))
  (cat open str close))

(function compile-table (forms)
  (local sep (? (= current-target 'lua) "=" ":"))
  (local str "{")
  (local i 0)
  (while (< i (- (length forms) 1))
    (local k (compile (at forms i)))
    (local v (compile (at forms (+ i 1))))
    (set str (cat str k sep v))
    (if ((< i (- (length forms) 2)) (set str (cat str ","))))
    (set i (+ i 2)))
  (cat str "}"))

(function compile-each (forms)
  (local args (at forms 0))
  (local t (at args 0))
  (local k (at args 1))
  (local v (at args 2))
  (local body (sub forms 1))
  (if ((= current-target 'lua)
       (local body1 (compile-body body))
       (local t1 (compile t))
       (cat "for " k "," v " in pairs(" t1 ") do " body1 " end"))
      (true
       (local body1 (compile-body '((set ,v (get ,t ,k)) ,@body)))
       (cat "for(" k " in " t ")" body1))))

(macro unquote () (error "UNQUOTE not inside QUOTE"))
(macro unquote-splicing () (error "UNQUOTE-SPLICING not inside QUOTE"))

(function compile-to-string (form)
  (if ((and (string? form) (= (char form 0) "\""))
       (local str (sub form 1 (- (length form) 1)))
       (cat "\"\\\"" str "\\\"\""))
      ((string? form) (cat "\"" form "\""))
      (true (to-string form))))

(function quote-form (form)
  (if ((atom? form) (compile-to-string form))
      ((= (at form 0) "unquote") (compile (at form 1)))
      (true (compile-list form true))))

(function compile-quote (forms)
  (quote-form (at forms 0)))

(function compile-macro (form)
  (local tmp current-target)
  (set current-target current-language)
  (eval (compile-function form true))
  (local name (at form 0))
  (local register
    '(set (get macros ,(compile-to-string name)) ,name))
  (eval (compile register true))
  (set current-target tmp)
  "")

(function compile-special (form stmt? tail?)
  (local name (at form 0))
  (local sp (get special name))
  (local tr? (and stmt? (not (get sp 'terminated))))
  (local tr (? tr? ";" ""))
  (local fn (get sp 'compiler))
  (cat (fn (sub form 1) tail?) tr))

(set (get special "do")
     (table compiler compile-do terminated true statement true))
(set (get special "if")
     (table compiler compile-if terminated true statement true))
(set (get special "function")
     (table compiler compile-function terminated true statement true))
(set (get special "while")
     (table compiler compile-while terminated true statement true))
(set (get special "macro")
     (table compiler compile-macro statement true terminated true))

(set (get special "local") (table compiler compile-local statement true))
(set (get special "set") (table compiler compile-set statement true))
(set (get special "each") (table compiler compile-each statement true))
(set (get special "get") (table compiler compile-get))
(set (get special "dot") (table compiler compile-dot))
(set (get special "not") (table compiler compile-not))
(set (get special "list") (table compiler compile-list))
(set (get special "table") (table compiler compile-table))
(set (get special "quote") (table compiler compile-quote))

(function can-return? (form)
  (if ((macro-call? form) false)
      ((special? form)
       (not (get (get special (at form 0)) 'statement)))
      (true true)))

(function compile (form stmt? tail?)
  (local tr (? stmt? ";" ""))
  (if ((and tail? (can-return? form))
       (set form '(return ,form))))
  (if ((= form nil) "")
      ((atom? form) (cat (compile-atom form) tr))
      ((call? form)
       (if ((operator? form)
            (cat (compile-operator form) tr))
           ((special? form)
	    (compile-special form stmt? tail?))
	   ((macro-call? form)
	    (local fn (get macros (at form 0)))
	    (local form (apply fn (sub form 1)))
	    (compile form stmt? tail?))
           (true (cat (compile-call form) tr))))
      (true (error (cat "Unexpected form: " (to-string form))))))

(function compile-file (filename)
  (local form)
  (local output "")
  (local s (make-stream (read-file filename)))
  (while true
    (set form (read s))
    (if ((= form eof) break))
    (set output (cat output (compile form true))))
  output)


;;; tests

(set passed 0)

(function assert-equal (a b)
  (local sa (to-string a))
  (local sb (to-string b))
  (if ((not (= sa sb))
       (error (cat " failed: expected " sa " was " sb)))
      (true (set passed (+ passed 1)))))

(function run-tests ()
  (print " running tests...")
  ;; numbers
  (assert-equal 18 18.00)
  (assert-equal 123 1.23e2)
  (assert-equal 0.123 123e-3)
  (assert-equal 17 (+ 16 1))
  (assert-equal 4 (- 7 3))
  (assert-equal 5.0 (/ 10 2))
  (assert-equal 6 (* 2 3.00))
  ;; booleans
  (assert-equal true (not false))
  (assert-equal true (or true false))
  (assert-equal false (and true false))
  (assert-equal 17 (? true 17 18))
  (assert-equal 18 (? false 17 18))
  ;; strings
  (assert-equal "foo" "foo")
  (assert-equal "\"bar\"" "\"bar\"")
  (assert-equal 1 (length "\""))
  (assert-equal 2 (length "a\""))
  (assert-equal "foobar" (cat "foo" "bar"))
  (assert-equal 2 (length (cat "\"" "\"")))
  (assert-equal 'a "a")
  (assert-equal 'a (quote a))
  (assert-equal "a" (char "bar" 1))
  (assert-equal "uu" (sub "quux" 1 3))
  ;; lists
  (assert-equal '() (list))
  (assert-equal '(1) (list 1))
  (assert-equal '(a) (list 'a))
  (assert-equal '(a) (list "a"))
  (assert-equal false (= '(a) '("a")))
  (assert-equal 5 (length '(1 2 3 4 5)))
  (assert-equal 3 (length '(1 (2 3 4) 5)))
  (assert-equal 3 (length (at '(1 (2 3 4) 5) 1)))
  (local a 'bar)
  (assert-equal '(1 2 bar) '(1 2 ,a))
  (assert-equal false (= '"a" "a"))
  (assert-equal false (= (list "a") '("a")))
  (assert-equal '(a (2 3 7 b)) '(a ,(list 2 3 7 'b)))
  (assert-equal '(1 2 3) (join '(1) '(2 3)))
  (assert-equal '(1 2 3 4) (join '(1) (join '(2) '(3 4))))
  (set a '(2 3))
  (assert-equal '(1 2 3 4) '(1 ,@a 4))
  (assert-equal '(1 2 3 4) '(1 ,@(list 2 3) 4))
  (assert-equal '(1 2 3) '(1 ,@a))
  (assert-equal '(2 3) '(,@a))
  ;; eval
  (assert-equal 4 (eval (compile '(+ 2 2))))
  (assert-equal 'foo (eval (compile '(quote foo))))
  ;; apply
  (assert-equal '(2 3) (apply join '((2) (3))))
  (apply assert-equal (list 4 4))
  ;; functions
  (local f (function (x) (+ x 1)))
  (assert-equal 2 (f 1))
  (assert-equal 3 (apply (function (a b) (+ a b)) '(1 2)))
  (assert-equal '(1 2) (apply (function (...) ...) '(1 2)))
  (assert-equal '((1 2)) (apply (function (...) '(,...)) '(1 2)))
  (assert-equal '(1 2) (apply (function (...) '(,@...)) '(1 2)))
  (set f (function (...) ...))
  (assert-equal '(a b) (f 'a 'b))
  ;; tables
  (local t (table))
  (set (get t 'foo) 17)
  (assert-equal (table foo 17) t)
  (set (get t 'bar) 42)
  (assert-equal (table foo 17 bar 42) t)
  ;; iteration
  (local x 0)
  (local l '(1 2 3 4 5))
  (across (l v)
    (set x (+ x v)))
  (assert-equal x 15)
  (local l2 '())
  (across (l v i)
    (set (at l2 i) v))
  (assert-equal l l2)
  (set x 0)
  (set t (table foo 10 bar 100))
  (each (t k v)
    (if ((= k 'foo) (set x (+ x v 1)))
	(true (set x (+ x v 10)))))
  (assert-equal x 121)
  (print (cat " " passed " passed")))


;;; interactive

(function interactive ()
  (set current-target current-language)
  (local execute
    (function (str)
      (local form (read-from-string str))
      (local result (eval (compile form)))
      (print (cat "=> " (to-string result)))))
  (target
   (js (do (process.stdin.resume)
	   (process.stdin.setEncoding 'utf8)
	   (process.stdin.on 'data execute)))
   (lua (while true
	  (local str (io.stdin:read))
	  (if (str (execute str))
	      (true break))))))


;;; command-line

(function usage ()
  (print "usage: x [<input> | -i | -t] [-o <output>] [-l <language>]")
  (exit))

(set args (target (js (sub process.argv 2)) (lua arg)))

(if ((< (length args) 1) (usage))
    ((= (at args 0) "-i") (interactive))
    ((= (at args 0) "-t") (run-tests))
    (true
     (local input (at args 0))
     (local output false)
     (across (args arg i 1)
       (if ((or (= arg "-o") (= arg "-l"))
	    (if ((> (length args) (+ i 1))
		 (set i (+ i 1))
		 (local arg2 (at args i))
		 (if ((= arg "-o") (set output arg2))
		     (true (set current-target arg2))))
		(true (print "missing argument for" arg) (usage))))
	   (true (print "unrecognized option:" arg) (usage))))
     (if ((= output false)
	  (local name (sub input 0 (find input ".")))
	  (set output (cat name "." current-target))))
     (write-file output (compile-file input))))
