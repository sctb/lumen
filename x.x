;; -*- mode: lisp -*-

(set fs (require "fs"))

(declare delimiters {})
(set (get delimiters "(") true) (set (get delimiters ")") true)
(set (get delimiters ";") true) (set (get delimiters "\n") true)

(declare whitespace {})
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(declare operators {})
(set (get operators "+") "+") (set (get operators "-") "-")
(set (get operators "<") "<") (set (get operators ">") ">")
(set (get operators "and") "&&") (set (get operators "or") "||")
(set (get operators "cat") "+") (set (get operators "=") "==")

(declare special {})
(set (get special "do") compile_do)
(set (get special "set") compile_set)
(set (get special "get") compile_get)
(set (get special "dot") compile_dot)
(set (get special "not") compile_not)
(set (get special "if") compile_if)
(set (get special "function") compile_function)
(set (get special "declare") compile_declare)
(set (get special "while") compile_while)
(set (get special "each") compile_each)
(set (get special "list") compile_list)
(set (get special "quote") compile_quote)

(declare macros {})

(function error (msg) (throw msg))

;; library

(function string (form)
  (if ((= (typeof form) "string")
       (return (cat "\"" form "\"")))
      (true (return (cat form "")))))

;; reader

(function make_stream (str)
  (declare s {})
  (set s.pos 0)
  (set s.string str)
  (set s.len str.length)
  (return s))

(function read_file (filename)
  (return (fs.readFileSync filename "utf8")))

(function write_file (filename data)
  (return (fs.writeFileSync filename data "utf8")))

(function peek_char (s)
  (if ((< s.pos s.len) (return (s.string.charAt s.pos)))))

(function read_char (s)
  (declare c (peek_char s))
  (if (c (set s.pos (+ s.pos 1)) (return c))))

(function skip_non_code (s)
  (declare c)
  (while true
    (set c (peek_char s))
    (if ((not c) break)
	((get whitespace c) (read_char s))
        ((= c ";")
	 (while (and c (not (= c "\n")))
	   (set c (read_char s)))
	 (skip_non_code s))
	(true break))))

(function read_atom (s)
  (declare c)
  (declare str "")
  (while true
    (set c (peek_char s))
    (if ((and c (and (not (get whitespace c))
                     (not (get delimiters c))))
         (set str (cat str c))
         (read_char s))
        (true break)))
  (declare n (parseFloat str))
  (if ((isNaN n) (return str))
      (true (return n))))

(function read_list (s)
  (read_char s) ; (
  (declare c)
  (declare l [])
  (while true
    (skip_non_code s)
    (set c (peek_char s))
    (if ((and c (not (= c ")"))) (l.push (read s)))
        (c (read_char s) break) ; )
        (true (error (cat "Expected ) at " s.pos)))))
  (return l))

(function read_string (s)
  (read_char s) ; "
  (declare c)
  (declare str "\"")
  (while true
    (set c (peek_char s))
    (if ((and c (not (= c "\"")))
         (if ((= c "\\") (set str (cat str (read_char s)))))
         (set str (cat str (read_char s))))
        (c (read_char s) break) ; "
        (true (error (cat "Expected \" at " s.pos)))))
  (return (cat str "\"")))

(function read_quote (s)
  (read_char s) ; '
  (return (list "quote" (read s))))

(function read_unquote (s)
  (read_char s) ; ,
  (return (list "unquote" (read s))))

(function read (s)
  (skip_non_code s)
  (declare c (peek_char s))
  (if ((= c "(") (return (read_list s)))
      ((= c ")") (error (cat "Unexpected ) at " s.pos)))
      ((= c "\"") (return (read_string s)))
      ((= c "'") (return (read_quote s)))
      ((= c ",") (return (read_unquote s)))
      (true (return (read_atom s)))))

;; compiler

(function is_atom (form)
  (return (or (= (typeof form) "string") (= (typeof form) "number"))))

(function is_list (form)
  (return (Array.isArray form)))

(function is_call (form)
  (return (and (is_list form) (= (typeof (get form 0)) "string"))))

(function is_operator (form)
  (return (not (= (get operators (get form 0)) null))))

(function is_special (form)
  (return (not (= (get special (get form 0)) null))))

(function is_macro_call (form)
  (return (not (= (get macros (get form 0)) null))))

(function is_macro_definition (form)
  (return (and (is_call form) (= (get form 0) "macro"))))

(function terminator (is_statement)
  (if (is_statement (return ";")) (true (return ""))))

(function compile_args (forms are_literal)
  (declare i 0)
  (declare str "(")
  (while (< i forms.length)
    (if (are_literal (set str (cat str (get forms i))))
        (true (set str (cat str (compile (get forms i) false)))))
    (if ((< i (- forms.length 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile_body (forms)
  (declare i 0)
  (declare str "{")
  (while (< i forms.length)
    (set str (cat str (compile (get forms i) true)))
    (set i (+ i 1)))
  (return (cat str "}")))

(function compile_atom (form is_statement)
  (return (cat form (terminator is_statement))))

(function compile_call (form is_statement)
  (declare fn (compile (get form 0) false))
  (declare args (compile_args (form.slice 1)))
  (return (cat fn args (terminator is_statement))))

(function compile_operator (form)
  (declare i 1)
  (declare str "(")
  (declare op (get operators (get form 0)))
  (while (< i form.length)
    (set str (cat str (compile (get form i) false)))
    (if ((< i (- form.length 1)) (set str (cat str op))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile_do (forms is_statement)
  (if ((not is_statement)
       (error "Cannot compile DO as an expression")))
  (return (compile_body forms)))

(function compile_set (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile assignment as an expression")))
  (if ((< form.length 2)
       (error "Missing right-hand side in assignment")))
  (declare lh (compile (get form 0) false))
  (declare rh (compile (get form 1) false))
  (return (cat lh "=" rh (terminator true))))

(function compile_branch (branch is_last)
  (declare condition (compile (get branch 0) false))
  (declare body (compile_body (branch.slice 1)))
  (if ((and is_last (= condition "true"))
       (return body))
      (true (return (cat "if(" condition ")" body)))))

(function compile_if (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile if as an expression")))
  (declare i 0)
  (declare str "")
  (while (< i form.length)
    (declare branch (compile_branch (get form i) (= i (- form.length 1))))
    (set str (cat str branch))
    (if ((< i (- form.length 1))
         (set str (cat str "else "))))
    (set i (+ i 1)))
  (return str))

(function compile_function (form is_statement)
  (declare name (get form 0))
  (declare args (compile_args (get form 1) true))
  (declare body (compile_body (form.slice 2)))
  (return (cat "function " name args body)))

(function compile_get (form is_statement)
  (declare object (compile (get form 0) false))
  (declare key (compile (get form 1) false))
  (return (cat object "[" key "]" (terminator is_statement))))

(function compile_dot (form is_statement)
  (declare object (compile (get form 0) false))
  (declare key (get form 1))
  (return (cat object "." key (terminator is_statement))))

(function compile_not (form is_statement)
  (declare expr (compile (get form 0) false))
  (return (cat "!(" expr ")" (terminator is_statement))))

(function compile_declare (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile declaration as an expression")))
  (declare lh (get form 0))
  (declare tr (terminator true))
  (if ((= (typeof (get form 1)) "undefined")
       (return (cat "var " lh tr)))
      (true
       (declare rh (compile (get form 1) false))
       (return (cat "var " lh "=" rh tr)))))

(function compile_while (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile WHILE as an expression")))
  (declare condition (compile (get form 0) false))
  (declare body (compile_body (form.slice 1)))
  (return (cat "while(" condition ")" body)))

(function compile_each (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile EACH as an expression")))
  (declare key (get (get form 0) 0))
  (declare value (get (get form 0) 1))
  (declare object (get form 1))
  (declare body (form.slice 2))
  (body.unshift 
   '(set ,value (get ,object ,key)))
  (return (cat "for(" key " in " object ")" (compile_body body))))

(function compile_list (forms is_statement is_quoted)
  (if (is_statement
       (error "Cannot compile LIST as a statement")))
  (declare i 0)
  (declare str "[")
  (while (< i forms.length)
    (declare x (get forms i))
    (declare x1)
    (if (is_quoted (set x1 (quote_form x)))
	(true (set x1 (compile x false))))
    (set str (cat str x1))
    (if ((< i (- forms.length 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str "]")))

(function quote_form (form)
  (if ((and (= (typeof form) "string")
	    (= (form.charAt 0) "\""))
       (return form))
      ((is_atom form) (return (string form)))
      ((= (get form 0) "unquote")
       (return (compile (get form 1) false)))
      (true (return (compile_list form false true)))))

(function compile_quote (forms is_statement)
  (if (is_statement
       (error "Cannot compile quoted form as a statement")))
  (if ((< forms.length 1)
       (error "Must supply at least one argument to QUOTE")))
  (return (quote_form (get forms 0))))	; first arg only

(function compile_macro (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile macro definition as an expression")))
  (eval (compile_function form true))
  (declare name (get form 0))
  (declare register
    '(set (get macros ,(string name)) ,name))
  (eval (compile register true)))

(function compile (form is_statement)
  (if ((is_atom form) (return (compile_atom form is_statement)))
      ((is_call form)
       (if ((and (is_operator form) is_statement)
            (error (cat "Cannot compile operator application as a statement")))
           ((is_operator form)
            (return (compile_operator form)))
	   ((is_macro_definition form)
	    (compile_macro (form.slice 1) is_statement)
	    (return ""))
           ((is_special form)
            (declare fn (get special (get form 0)))
            (return (fn (form.slice 1) is_statement)))
	   ((is_macro_call form)
	    (declare fn (get macros (get form 0)))
	    (declare form (fn (form.slice 1)))
	    (return (compile form is_statement)))
           (true (return (compile_call form is_statement)))))
      (true (error (cat "Unexpected form: " form)))))

(function compile_file (filename)
  (declare form)
  (declare output "")
  (declare s (make_stream (read_file filename)))
  (while true
    (set form (read s))
    (if (form (set output (cat output (compile form true))))
        (true break)))
  (return output))

(function usage ()
  (console.log "usage: x input [-o output]"))

(if ((< process.argv.length 3) (usage))
    ((= (get process.argv 2) "--help") (usage))
    (true
     (declare input (get process.argv 2))
     (declare output)
     (if ((and (> process.argv.length 4)
               (= (get process.argv 3) "-o"))
         (set output (get process.argv 4)))
         (true
          (declare name (input.slice 0 (input.indexOf ".")))
          (set output (cat name ".js"))))
     (write_file output (compile_file input))))
