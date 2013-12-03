;; -*- mode: lisp -*-

(set delimiters (make-set "(" ")" ";" "\n"))
(set whitespace (make-set " " "\t" "\n"))

(def make-stream (str)
  (table pos 0 string str len (length str)))

(def peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

(def read-char (s)
  (let (c (peek-char s))
    (if c (do (set s.pos (+ s.pos 1)) c))))

(def skip-non-code (s)
  (while true
    (let (c (peek-char s))
      (if (not c) break
        (get whitespace c) (read-char s)
	(= c ";")
	(do (while (and c (not (= c "\n")))
	      (set c (read-char s)))
	    (skip-non-code s))
	break))))

(set read-table (table))
(set eof (table))

(mac defr ((char stream) body...)
  `(set (get read-table ,char) (fn (,stream) ,@body)))

(defr ("" s) ; atom
  (let (str "")
    (while true
      (let (c (peek-char s))
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (do (cat! str c)
		(read-char s))
	  break)))
    (let (n (parse-number str))
      (if (is? n) n
	  (= str "true") true
	  (= str "false") false
	str))))

(defr ("(" s)
  (read-char s)
  (let (l ())
    (while true
      (skip-non-code s)
      (let (c (peek-char s))
	(if (and c (not (= c ")"))) (push l (read s))
	    c (do (read-char s) break) ; )
	  (error (cat "Expected ) at " s.pos)))))
    l))

(defr (")" s)
  (error (cat "Unexpected ) at " s.pos)))

(defr ("\"" s)
  (read-char s)
  (let (str "\"")
    (while true
      (let (c (peek-char s))
	(if (and c (not (= c "\"")))
	    (do (if (= c "\\") (cat! str (read-char s)))
		(cat! str (read-char s)))
	    c (do (read-char s) break) ; "
	  (error (cat "Expected \" at " s.pos)))))
    (cat str "\"")))

(defr ("'" s)
  (read-char s)
  (list 'quote (read s)))

(defr ("`" s)
  (read-char s)
  (list 'quasiquote (read s)))

(defr ("," s)
  (read-char s)
  (if (= (peek-char s) "@")
      (do (read-char s)
	  (list 'unquote-splicing (read s)))
    (list 'unquote (read s))))

(def read (s)
  (skip-non-code s)
  (let (c (peek-char s))
    (if c
	((or (get read-table c)
	     (get read-table ""))
	 s)
      eof)))

(def read-from-string (str)
  (read (make-stream str)))
