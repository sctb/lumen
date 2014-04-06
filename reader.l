;; -*- mode: lisp -*-

(define delimiters (set-of "(" ")" ";" "\n"))
(define whitespace (set-of " " "\t" "\n"))

(define make-stream (str)
  (table pos 0 string str len (length str)))

(define peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

(define read-char (s)
  (let (c (peek-char s))
    (if c (do (set s.pos (+ s.pos 1)) c))))

(define skip-non-code (s)
  (while true
    (let (c (peek-char s))
      (if (nil? c) (break)
          (get whitespace c) (read-char s)
          (= c ";")
          (do (while (and c (not (= c "\n")))
                (set c (read-char s)))
              (skip-non-code s))
        (break)))))

(define read-table (table))
(define eof (table))

(define key? (atom)
  (and (string? atom)
       (> (length atom) 1)
       (= (char atom (- (length atom) 1)) ":")))

(define-macro define-reader ((char stream) rest: body)
  `(set (get read-table ,char) (fn (,stream) ,@body)))

(define-reader ("" s) ; atom
  (let (str "")
    (while true
      (let (c (peek-char s))
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (do (cat! str c)
		(read-char s))
	  (break))))
    (let (n (parse-number str))
      (if (is? n) n
	  (= str "true") true
	  (= str "false") false
	str))))

(define-reader ("(" s)
  (read-char s)
  (let (l ())
    (while true
      (skip-non-code s)
      (let (c (peek-char s))
	(if (and c (not (= c ")")))
	    (let (x (read s))
	      (if (key? x)
		  (let (key (sub x 0 (- (length x) 1))
			val (read s))
		    (set (get l key) val))
		  (add l x)))
	    c (do (read-char s) (break)) ; )
	  (error (cat "Expected ) at " s.pos)))))
    l))

(define-reader (")" s)
  (error (cat "Unexpected ) at " s.pos)))

(define-reader ("\"" s)
  (read-char s)
  (let (str "\"")
    (while true
      (let (c (peek-char s))
	(if (and c (not (= c "\"")))
	    (do (if (= c "\\") (cat! str (read-char s)))
		(cat! str (read-char s)))
	    c (do (read-char s) (break)) ; "
	  (error (cat "Expected \" at " s.pos)))))
    (cat str "\"")))

(define-reader ("'" s)
  (read-char s)
  (list 'quote (read s)))

(define-reader ("`" s)
  (read-char s)
  (list 'quasiquote (read s)))

(define-reader ("," s)
  (read-char s)
  (if (= (peek-char s) "@")
      (do (read-char s)
	  (list 'unquote-splicing (read s)))
    (list 'unquote (read s))))

(define read (s)
  (skip-non-code s)
  (let (c (peek-char s))
    (if (is? c)
	((or (get read-table c)
	     (get read-table ""))
	 s)
      eof)))

(define read-from-string (str)
  (read (make-stream str)))
