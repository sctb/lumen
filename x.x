(require "fs")

(declare delimiters {})
(set (get delimiters "(") true)
(set (get delimiters ")") true)
(set (get delimiters ";") true)
(set (get delimiters "\n") true)

(declare whitespace {})
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(declare operators {})
(set (get operators "+") "+")
(set (get operators "-") "-")
(set (get operators "<") "<")
(set (get operators ">") ">")
(set (get operators "=") "==")
(set (get operators "and") "&&")
(set (get operators "or") "||")

(function error (msg) (throw msg))

(function make_stream (str)
  (declare s {})
  (set s.pos 0)
  (set s.string str)
  (set s.len str.length)
  (return s))

(function read_file (filename)
  (return (fs.readFileSync filename "utf8")))

(function peek_char (s)
  (if ((< s.pos s.len) (return (s.string.charAt s.pos)))))

(function read_char (s)
  (declare c (peek_char s))
  (if (c (set s.pos (+ s.pos 1)) (return c))))

(function read_whitespace (s)
  (declare c)
  (while true
    (set c (peek_char s))
    (if ((and c (get whitespace c))
         (read_char s))
        (true break))))

(function read_atom (s)
  (declare c)
  (declare str "")
  (while true
    (set c (peek_char s))
    (if ((and c (and (not (get whitespace c))
                     (not (get delimiters c))))
         (set str (+ str c))
         (read_char s))
        (true break)))
  (return str))

(function read_list (s)
  (read_char s) ; (
  (declare c)
  (declare l [])
  (while true
    (read_whitespace s)
    (set c (peek_char s))
    (if ((and c (= c ";")) (read_comment s))
        ((and c (not (= c ")"))) (l.push (read s)))
        (c (read_char s) break) ; )
        (true (error (+ "Expected ) at " s.pos)))))
  (return l))

(function read_comment (s)
  (declare c (read_char s)) ;
  (while (and c (not (= c "\n")))
    (set c (read_char s))))

(function read_string (s)
  (read_char s) ; "
  (declare c)
  (declare str "\"")
  (while true
    (set c (peek_char s))
    (if ((and c (not (= c "\"")))
         (if ((= c "\\") (set str (+ str (read_char s)))))
         (set str (+ str (read_char s))))
        (c (read_char s) break) ; "
        (true (error (+ "Expected \" at " s.pos)))))
  (return (+ str "\"")))

(function read (s)
  (read_whitespace s)
  (declare c (peek_char s))
  (if ((= c ";") (read_comment s) (return (read s)))
      ((= c "(") (return (read_list s)))
      ((= c ")") (error (+ "Unexpected ) at " s.pos)))
      ((= c "\"") (return (read_string s)))
      (true (return (read_atom s)))))

;; compiler

(function is_atom (form)
  (return (= (typeof form) "string")))

(function is_call (form)
  (return (and (Array.isArray form) (= (typeof (get form 0)) "string"))))

(function is_operator (form)
  (return (not (= (get operators (get form 0)) null))))

(function is_special (form)
  (return (not (= (get special (get form 0)) null))))

(function terminator (is_statement)
  (if (is_statement (return ";")) (true (return ""))))

(function compile_args (forms are_literal)
  (declare i 0)
  (declare str "(")
  (while (< i forms.length)
    (if (are_literal (set str (+ str (get forms i))))
        (true (set str (+ str (compile (get forms i) false)))))
    (if ((< i (- forms.length 1)) (set str (+ str ","))))
    (set i (+ i 1)))
  (return (+ str ")")))

(function compile_body (forms)
  (declare i 0)
  (declare str "{")
  (while (< i forms.length)
    (set str (+ str (compile (get forms i) true)))
    (set i (+ i 1)))
  (return (+ str "}")))

(function compile_atom (form is_statement)
  (return (+ (form.toString) (terminator is_statement))))

(function compile_call (form is_statement)
  (declare fn (compile (get form 0) false))
  (declare args (compile_args (form.slice 1)))
  (return (+ fn (+ args (terminator is_statement)))))

(function compile_operator (form)
  (if ((> form.length 3)
       (error (+ "Too many arguments to operator " (get form 0)))))
  (declare op (get operators (get form 0)))
  (declare a (compile (get form 1) false))
  (declare b (compile (get form 2) false))
  (return (+ "(" (+ a (+ op (+ b ")"))))))

(function compile_set (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile assignment as an expression")))
  (if ((not (is_atom (get form 0)))
       (error "Invalid left-hand side of assignment")))
  (if ((< form.length 3)
       (error "Missing right-hand side in assignment")))
  (declare lh (compile (get form 1) false))
  (declare rh (compile (get form 2) false))
  (return (+ lh (+ "=" (+ rh (terminator true))))))

(function compile_branch (form is_statement)
  (declare conditional (compile (get branch 0) false))
  (declare body (compile_body (branch.slice 1)))
  (return (+ "if(" (+ conditional (+ ")" body)))))

(function compile_if (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile if as an expression")))
  (declare i 1)
  (declare str "")
  (while (< i form.length)
    (set str (+ str (compile_branch (get form i))))
    (if ((< i (- form.length 1))
         (set str (+ str "else "))))
    (set i (+ i 1)))
  (return str))

(function compile_function (form is_statement)
  (declare name (get form 1))
  (declare args (compile_args (get form 2) true))
  (declare body (compile_body (form.slice 3)))
  (return (+ "function " (+ name (+ args (+ body ";"))))))

(function compile_get (form is_statement)
  (declare key (compile (get form 2) false))
  (return (+ (get form 1) (+ "[" (+ key (+ "]" (terminator is_statement)))))))

(function compile_declare (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile declaration as an expression")))
  (declare lh (get form 1))
  (declare tr (terminator true))
  (if ((= (typeof (get form 2)) "undefined")
       (return (+ "var " (+ lh tr))))
      (true
       (declare rh (compile (get form 2) false))
       (return (+ "var " (+ lh (+ "=" (+ rh tr))))))))

(function compile_while (form is_statement)
  (if ((not is_statement)
       (error "Cannot compile while loop as an expression")))
  (declare condition (compile (get form 1) false))
  (declare body (compile_body (form.slice 2)))
  (return (+ "while(" (+ condition (+ ")" body)))))

(function compile_not (form is_statement)
  (declare expr (compile (get form 1) false))
  (return (+ "!(" (+ expr (+ ")" (terminator is_statement))))))

(function compile (form is_statement)
  (if ((is_atom form) (return (compile_atom form is_statement)))
      ((is_call form)
       (if ((and (is_operator form) is_statement)
            (error (+ "Cannot compile use of operator "
                      (+ (get form 0) " as a statement"))))
           ((is_operator form)
            (return (compile_operator form)))
           ((is_special form)
            (declare compiler (get special (get form 0)))
            (return (compiler form is_statement)))
           (true (return (compile_call form is_statement)))))
      (true (error (+ "Unexpected form " (form.toString))))))

(function compile_file (filename)
  (declare form)
  (declare output "")
  (declare s (make_stream (read_file filename)))
  (while true
    (set form (read s))
    (if (form (set output (+ output (compile form true))))
        (true break)))
  (return output))
