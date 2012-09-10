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
(set (get operators "<") "<")
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
  (read_char s))
