;; -*- mode: lisp -*-

(set delimiters (make-set "(" ")" ";" "\n"))
(set whitespace (make-set " " "\t" "\n"))

(defun make-stream (str)
  (table pos 0 string str len (length str)))

(defun peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

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
  (if (not (= n nil)) n
      (= str "true") true
      (= str "false") false
    str))

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
  `(quote ,(read s)))

(defun read-quasiquote (s)
  (read-char s) ; '
  `(quasiquote ,(read s)))

(defun read-unquote (s)
  (read-char s) ; ,
  (if (= (peek-char s) "@")
      (do (read-char s) ; @
	  (list 'unquote-splicing (read s)))
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
	 "`" read-quasiquote
	 "," read-unquote
	 "" read-atom ; default
	 ))

(set eof (table))

(defun read (s)
  (skip-non-code s)
  (local c (peek-char s))
  (if c
      ((or (get read-table c)
	   (get read-table ""))
       s)
    eof))

(defun read-from-string (str) (read (make-stream str)))
