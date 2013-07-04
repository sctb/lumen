;; -*- mode: lisp -*-

;;; library

(defmacro at (arr i)
  (if (and (= current-target 'lua) (number? i))
      (set i (+ i 1))
      (= current-target 'lua)
      (set i '(+ ,i 1)))
  '(get ,arr ,i))

(defmacro across (args body...)
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
      ,@body
      (set ,i (+ ,i 1)))))

(defmacro make-set (elements...)
  (local form '(table))
  (across (elements x)
    (push form x)
    (push form true))
  form)

;; languages

(set current-target 'js)

(defmacro target (clauses...)
  (across (clauses clause)
    (if (= (at clause 0) current-target)
	(return (at clause 1)))))

(set current-language
  (target (js 'js) (lua 'lua)))

;; sequences

(defun length (x)
  (target (js x.length) (lua #x)))

(defun sub (x from upto)
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
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
	  x2)))))

;; lists

(defun push (arr x)
  (set (at arr (length arr)) x))

(defun join (a1 a2)
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

(defun char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(defun find (str pattern start)
  (target
   (js (do (local i (str.indexOf pattern start))
	   (and (> i 0) i)))
   (lua (do (if start (set start (+ start 1)))
	    (local i (string.find str pattern start true))
	    (and i (- i 1))))))

;; io

(target (js (set fs (require 'fs))))

(defun read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (do (local f (io.open path))
	     (f:read '*a)))))

(defun write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (do (local f (io.open path 'w))
	     (f:write data)))))

(target (js (defun print (x) (console.log x))))

(defun exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; predicates

(defun string? (x) (= (type x) 'string))
(defun string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(defun number? (x) (= (type x) 'number))
(defun boolean? (x) (= (type x) 'boolean))
(defun composite? (x) (= (type x) (target (js 'object) (lua 'table))))
(defun atom? (x) (not (composite? x)))
(defun table? (x) (and (composite? x) (= (at x 0) nil)))
(defun list? (x) (and (composite? x) (not (= (at x 0) nil))))

;; numbers

(defun parse-number (str)
  (target
    (js (do (local n (parseFloat str))
	    (if (not (isNaN n)) n)))
    (lua (tonumber str))))

;; printing

(defun to-string (x)
  (if (= x nil) "nil"
      (boolean? x) (if x "true" "false")
      (atom? x) (cat x "")
    (do (local str "(")
	(across (x y i)
	  (set str (cat str (to-string y)))
	  (if (< i (- (length x) 1))
	      (set str (cat str " "))))
	(cat str  ")"))))

;; misc

(target (js (defun error (msg) (throw msg) nil)))
(target (js (defun type (x) (typeof x))))

(defun apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(set unique-counter 0)

(defun make-unique (prefix)
  (set unique-counter (+ unique-counter 1))
  (cat "_" (or prefix "") unique-counter))

(set eval-result nil)

(target
 (lua (defun eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (local y (cat "eval_result=" x))
	(local f (load y))
	(if f
	    (do (f) eval-result)
	  (do (local f (load x)) (and f (f)))))))


;;; reader

(set delimiters (make-set "(" ")" ";" "\n"))
(set eof (table))
(set (get delimiters eof) true)

(set whitespace (make-set " " "\t" "\n"))

(defun make-stream (str)
  (table pos 0 string str len (length str)))

(defun peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos) eof))

(defun read-char (s)
  (local c (peek-char s))
  (if c (do (set s.pos (+ s.pos 1)) c)))

(defun skip-non-code (s)
  (while true
    (local c (peek-char s))
    (if (not c) break
        (get whitespace c) (read-char s)
	(= c ";")
	(do (while (and c (not (= c "\n")))
	      (set c (read-char s)))
	    (skip-non-code s))
      break)))

(defun read-symbol (s)
  (local str "")
  (while true
    (local c (peek-char s))
    (if (and c (and (not (get whitespace c))
		    (not (get delimiters c))))
	(do (set str (cat str c))
	    (read-char s))
      break))
  str)

(defun read-atom (s)
  (local str (read-symbol s))
  (local n (parse-number str))
  (if (= n nil) str n))

(defun read-list (s)
  (read-char s) ; (
  (local l '())
  (while true
    (skip-non-code s)
    (local c (peek-char s))
    (if (and c (not (= c ")"))) (push l (read s))
        c (do (read-char s) break) ; )
      (error (cat "Expected ) at " s.pos))))
  l)

(defun read-string (s)
  (read-char s) ; "
  (local str "\"")
  (while true
    (local c (peek-char s))
    (if (and c (not (= c "\"")))
	(do (if (= c "\\") (set str (cat str (read-char s))))
	    (set str (cat str (read-char s))))
        c (do (read-char s) break) ; "
      (error (cat "Expected \" at " s.pos))))
  (cat str "\""))

(defun read-quote (s)
  (read-char s) ; '
  '(quote ,(read s)))

(defun read-unquote (s)
  (read-char s) ; ,
  (if (= (peek-char s) "@")
      (do (read-char s) ; @
	  '(unquote-splicing ,(read s)))
    (list 'unquote (read s))))

(defun read-eof (s)
  (read-char s)) ; eof

(defun read-close-paren-error (s)
  (error (cat "Unexpected ) at " s.pos)))

(set read-table
  (table "(" read-list
	 ")" read-close-paren-error
	 "\"" read-string
	 "'" read-quote
	 "," read-unquote
	 "" read-atom ; default
	 ))
(set (get read-table eof) read-eof)

(defun read (s)
  (skip-non-code s)
  (local c (peek-char s))
  (local f (or (get read-table c) (get read-table "")))
  (f s))

(defun read-from-string (str) (read (make-stream str)))


;;; compiler

(set operators
  (table 'common (table "+" "+" "-" "-" "*" "*" "/" "/" "<" "<"
			">" ">" "=" "==" "<=" "<=" ">=" ">=")
	 'js (table "and" "&&" "or" "||" "cat" "+")
	 'lua (table "and" " and " "or" " or " "cat" "..")))

(defun get-op (op)
  (or (get (get operators 'common) op)
      (get (get operators current-target) op)))

(set macros (table))

(defun call? (type form)
  (if (not (list? form)) false
      (= type 'operator) (not (= (get-op (at form 0)) nil))
      (= type 'special) (not (= (get special (at form 0)) nil))
      (= type 'macro) (not (= (get macros (at form 0)) nil))
    false))

(defun compile-args (forms compile?)
  (local str "(")
  (across (forms x i)
    (local x1 (if compile? (compile x) (normalize x)))
    (set str (cat str x1))
    (if (< i (- (length forms) 1)) (set str (cat str ","))))
  (cat str ")"))

(defun compile-body (forms tail?)
  (local str "")
  (across (forms x i)
    (local t? (and tail? (= i (- (length forms) 1))))
    (set str (cat str (compile x true t?))))
  str)

(defun normalize (id)
  (local id2 "")
  (local i 0)
  (while (< i (length id))
    (local c (char id i))
    (if (= c "-") (set c "_"))
    (set id2 (cat id2 c))
    (set i (+ i 1)))
  (local last (- (length id) 1))
  (if (= (char id last) "?")
      (do (local name (sub id2 0 last))
	  (set id2 (cat "is_" name))))
  id2)

(defun compile-atom (form)
  (if (= form "nil")
      (if (= current-target 'js) "undefined" "nil")
      (and (string? form) (not (string-literal? form)))
      (normalize form)
    (to-string form)))

(defun compile-call (form)
  (local fn (at form 0))
  (local fn1 (compile fn))
  (local args (compile-args (sub form 1) true))
  (if (list? fn) (cat "(" fn1 ")" args)
      (string? fn) (cat fn1 args)
    (error "Invalid function call")))

(defun compile-operator (form)
  (local str "(")
  (local op (get-op (at form 0)))
  (across (form arg i 1)
    (set str (cat str (compile arg)))
    (if (< i (- (length form) 1)) (set str (cat str op))))
  (cat str ")"))

(defun compile-do (forms tail?)
  (compile-body forms tail?))

(defun compile-set (form)
  (if (< (length form) 2)
      (error "Missing right-hand side in assignment"))
  (local lh (compile (at form 0)))
  (local rh (compile (at form 1)))
  (cat lh "=" rh))

(defun compile-branch (condition body first? last? tail?)
  (local cond1 (compile condition))
  (local body1 (compile body true tail?))
  (local tr (if (and last? (= current-target 'lua)) " end " ""))
  (if (and first? (= current-target 'js))
      (cat "if(" cond1 "){" body1 "}")
      first?
      (cat "if " cond1 " then " body1 tr)
      (and (= condition nil) (= current-target 'js))
      (cat "else{" body1 "}")
      (= condition nil)
      (cat " else " body1 " end ")
      (= current-target 'js)
      (cat "else if(" cond1 "){" body1 "}")
    (cat " elseif " cond1 " then " body1 tr)))

(defun compile-if (form tail?)
  (local str "")
  (across (form condition i)
    (local last? (>= i (- (length form) 2)))
    (local else? (= i (- (length form) 1)))
    (local first? (= i 0))
    (local body (at form (+ i 1)))
    (if else?
	(do (set body condition)
	    (set condition nil)))
    (set i (+ i 1))
    (set str (cat str (compile-branch condition body first? last? tail?))))
  str)

(defun vararg? (name)
  (= (sub name (- (length name) 3) (length name)) "..."))

(defun bind-arguments (args body)
  (local args1 '())
  (across (args arg)
    (if (vararg? arg)
	(do (local name (sub arg 0 (- (length arg) 3)))
	    (local expr
	      (if (= current-target 'js)
		  '(Array.prototype.slice.call arguments ,(length args1))
		(do (push args1 '...) '(list ...))))
	    (set body '((local ,name ,expr) ,@body))
	    break)			; no more args
      (push args1 arg)))
  (list args1 body))

(defun compile-defun (form)
  (local name (normalize (at form 0)))
  (local args (at form 1))
  (local body (sub form 2))
  (compile-function args body name))

(defun compile-lambda (form)
  (local args (at form 0))
  (local body (sub form 1))
  (compile-function args body))

(defun compile-function (args body name)
  (set name (or name ""))
  (local expanded (bind-arguments args body))
  (local args1 (compile-args (at expanded 0)))
  (local body1 (compile-body (at expanded 1) true))
  (if (= current-target 'js)
      (cat "function " name args1 "{" body1 "}")
    (cat "function " name args1 body1 " end ")))

(defun compile-get (form)
  (local object (compile (at form 0)))
  (local key (compile (at form 1)))
  (if (and (= current-target 'lua)
	   (= (char object 0) "{"))
      (set object (cat "(" object ")")))
  (cat object "[" key "]"))

(defun compile-dot (form)
  (local object (compile (at form 0)))
  (local key (normalize (at form 1)))
  (cat object "." key))

(defun compile-not (form)
  (local expr (compile (at form 0)))
  (local open (if (= current-target 'js) "!(" "(not "))
  (cat open expr ")"))

(defun compile-local (form)
  (local lh (compile (at form 0)))
  (local keyword (if (= current-target 'js) "var " "local "))
  (if (= (at form 1) nil)
      (cat keyword lh)
    (do (local rh (compile (at form 1)))
	(cat keyword lh "=" rh))))

(defun compile-while (form)
  (local condition (compile (at form 0)))
  (local body (compile-body (sub form 1)))
  (if (= current-target 'js)
      (cat "while(" condition "){" body "}")
    (cat "while " condition " do " body " end ")))

(defun compile-list (forms quoted?)
  (local open (if (= current-target 'lua) "{" "["))
  (local close (if (= current-target 'lua) "}" "]"))
  (local str "")
  (across (forms x i)
    (if (and (list? x) (= (at x 0) "unquote-splicing"))
	(do (local x1 (compile (at x 1)))
	    (local x2 (compile-list (sub forms (+ i 1)) true))
	    (set open (cat "join(" open))
	    (set close (cat close ",join(" x1 "," x2 "))"))
	    break)
      (do (local x1 (if quoted? (quote-form x) (compile x)))
	  (set str (cat str x1))
	  (if (< i (- (length forms) 1)) (set str (cat str ","))))))
  (cat open str close))

(defun compile-table (forms)
  (local sep (if (= current-target 'lua) "=" ":"))
  (local str "{")
  (local i 0)
  (while (< i (- (length forms) 1))
    (local k (compile (at forms i)))
    (local v (compile (at forms (+ i 1))))
    (if (and (= current-target 'lua) (string-literal? k))
	(set k (cat "[" k "]")))
    (set str (cat str k sep v))
    (if (< i (- (length forms) 2)) (set str (cat str ",")))
    (set i (+ i 2)))
  (cat str "}"))

(defun compile-each (forms)
  (local args (at forms 0))
  (local t (at args 0))
  (local k (at args 1))
  (local v (at args 2))
  (local body (sub forms 1))
  (if (= current-target 'lua)
      (do (local body1 (compile-body body))
	  (local t1 (compile t))
	  (cat "for " k "," v " in pairs(" t1 ") do " body1 " end"))
    (do (local body1 (compile-body '((set ,v (get ,t ,k)) ,@body)))
	(cat "for(" k " in " t "){" body1 "}"))))

(defmacro unquote () (error "UNQUOTE not inside QUOTE"))
(defmacro unquote-splicing () (error "UNQUOTE-SPLICING not inside QUOTE"))

(defun compile-to-string (form)
  (if (string-literal? form)
      (do (local str (sub form 1 (- (length form) 1)))
	  (cat "\"\\\"" str "\\\"\""))
      (string? form) (cat "\"" form "\"")
    (to-string form)))

(defun quote-form (form)
  (if (atom? form) (compile-to-string form)
      (= (at form 0) 'unquote) (compile (at form 1))
    (compile-list form true)))

(defun compile-quote (forms)
  (quote-form (at forms 0)))

(defun compile-defmacro (form)
  (local tmp current-target)
  (set current-target current-language)
  (local name (at form 0))
  (local lambda (sub form 1))
  (local register
    '(set (get macros ,(compile-to-string name)) ,(compile-lambda lambda)))
  (eval (compile register true))
  (set current-target tmp)
  "")

(defun compile-special (form stmt? tail?)
  (local name (at form 0))
  (local sp (get special name))
  (if (and (not stmt?) (get sp 'stmt?))
      (compile '((lambda () ,form)) false tail?)
    (do (local tr? (and stmt? (not (get sp 'self-tr))))
	(local tr (if tr? ";" ""))
	(local fn (get sp 'compiler))
	(cat (fn (sub form 1) tail?) tr))))

(set special
  (table
   "do" (table 'compiler compile-do 'self-tr true 'stmt? true)
   "if" (table 'compiler compile-if 'self-tr true 'stmt? true)
   "while" (table 'compiler compile-while 'self-tr true 'stmt? true)
   "defun" (table 'compiler compile-defun 'self-tr true 'stmt? true)
   "defmacro" (table 'compiler compile-defmacro 'self-tr true 'stmt? true)
   "local" (table 'compiler compile-local 'stmt? true)
   "set" (table 'compiler compile-set 'stmt? true)
   "each" (table 'compiler compile-each 'stmt? true)
   "get" (table 'compiler compile-get)
   "dot" (table 'compiler compile-dot)
   "not" (table 'compiler compile-not)
   "list" (table 'compiler compile-list)
   "table" (table 'compiler compile-table)
   "quote" (table 'compiler compile-quote)
   "lambda" (table 'compiler compile-lambda)))

(defun can-return? (form)
  (if (call? 'macro form) false
      (call? 'special form) (not (get (get special (at form 0)) 'stmt?))
    true))

(defun compile (form stmt? tail?)
  (local tr (if stmt? ";" ""))
  (if (and tail? (can-return? form))
      (set form '(return ,form)))
  (if (= form nil) ""
      (atom? form) (cat (compile-atom form) tr)
      (call? 'operator form)
      (cat (compile-operator form) tr)
      (call? 'special form)
      (compile-special form stmt? tail?)
      (call? 'macro form)
      (do (local fn (get macros (at form 0)))
	  (local form (apply fn (sub form 1)))
	  (compile form stmt? tail?))
    (cat (compile-call form) tr)))

(defun compile-file (filename)
  (local form)
  (local output "")
  (local s (make-stream (read-file filename)))
  (while true
    (set form (read s))
    (if (= form eof) break)
    (set output (cat output (compile form true))))
  output)


;;; tests

(set passed 0)

(defun assert-equal (a b)
  (local sa (to-string a))
  (local sb (to-string b))
  (if (not (= sa sb))
      (error (cat " failed: expected " sa " was " sb))
    (set passed (+ passed 1))))

(defun run-tests ()
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
  (assert-equal 17 (if true 17 18))
  (assert-equal 18 (if false 17 18))
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
  (assert-equal (list (list 'bar)) '((,a)))
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
  (local f (lambda (x) (+ x 1)))
  (assert-equal 2 (f 1))
  (assert-equal 3 (apply (lambda (a b) (+ a b)) '(1 2)))
  (assert-equal '(1 2) (apply (lambda (a...) a) '(1 2)))
  (assert-equal '((1 2)) (apply (lambda (a...) '(,a)) '(1 2)))
  (assert-equal '(1 2) (apply (lambda (a...) '(,@a)) '(1 2)))
  (set f (lambda (a...) a))
  (assert-equal '(a b) (f 'a 'b))
  (assert-equal 42 ((lambda () 42)))
  ;; tables
  (local t (table))
  (set (get t 'foo) 17)
  (assert-equal (table foo 17) t)
  (set (get t 'bar) 42)
  (assert-equal (table foo 17 'bar 42) t)
  ;; sets
  (local s (make-set a b c))
  (assert-equal true (get s 'a))
  (assert-equal true (get s 'c))
  (assert-equal nil (get s 'x))
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
    (if (= k 'foo)
	(set x (+ x v 1))
      (set x (+ x v 10))))
  (assert-equal x 121)
  (print (cat " " passed " passed")))


;;; interactive

(defun interactive ()
  (set current-target current-language)
  (local execute
    (lambda (str)
      (local form (read-from-string str))
      (local result (eval (compile form)))
      (print (cat "=> " (to-string result)))))
  (target
   (js (do (process.stdin.resume)
	   (process.stdin.setEncoding 'utf8)
	   (process.stdin.on 'data execute)))
   (lua (while true
	  (local str (io.stdin:read))
	  (if str (execute str) break)))))


;;; command-line

(defun usage ()
  (print "usage: x [<input> | -i | -t] [-o <output>] [-l <language>]")
  (exit))

(set args (target (js (sub process.argv 2)) (lua arg)))

(if (< (length args) 1) (usage)
    (= (at args 0) "-i") (interactive)
    (= (at args 0) "-t") (run-tests)
  (do (local input (at args 0))
      (local output false)
      (across (args arg i 1)
        (if (or (= arg "-o") (= arg "-l"))
	    (if (> (length args) (+ i 1))
		(do (set i (+ i 1))
		    (local arg2 (at args i))
		    (if (= arg "-o") (set output arg2)
		      (set current-target arg2)))
	      (print "missing argument for" arg))
	  (print "unrecognized option:" arg)))
      (if (= output false)
	  (do (local name (sub input 0 (find input ".")))
	      (set output (cat name "." current-target))))
      (write-file output (compile-file input))))
