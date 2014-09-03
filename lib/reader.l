;; -*- mode: lisp -*-

(define-local delimiters (set-of "(" ")" ";" "\n"))
(define-local whitespace (set-of " " "\t" "\n"))

(define stream (str)
  (table pos: 0 string: str len: (length str)))

(define peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

(define read-char (s)
  (let (c (peek-char s))
    (if c (do (inc s.pos) c))))

(define-local skip-non-code (s)
  (while #t
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

(define read (s)
  (skip-non-code s)
  (let (c (peek-char s))
    (if (is? c)
	((or (get read-table c)
	     (get read-table ""))
	 s)
      eof)))

(define read-all (s)
  (let (l ())
    (while #t
      (let (form (read s))
        (if (= form eof) (break))
        (add l form)))
    l))

(define read-from-string (str)
  (let (x (read (stream str)))
    (unless (= x eof) x)))

(define-local key? (atom)
  (and (string? atom)
       (> (length atom) 1)
       (= (char atom (edge atom)) ":")))

(define-local flag? (atom)
  (and (string? atom)
       (> (length atom) 1)
       (= (char atom 0) ":")))

(define-reader ("" s) ; atom
  (let (str "" dot? #f)
    (while #t
      (let (c (peek-char s))
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (do (if (= c ".") (set dot? #t))
                (cat! str (read-char s)))
	  (break))))
    (let (n (number str))
      (if (is? n) n
	  (= str "true") #t
	  (= str "false") #f
          (= str "_") (unique)
          (and dot? (not (one? str)))
          (reduce (fn (a b)
                    `(get ,b (quote ,a)))
                  (reverse (split str ".")))
        str))))

(define-reader ("(" s)
  (read-char s)
  (let (l ())
    (while #t
      (skip-non-code s)
      (let (c (peek-char s))
	(if (and c (not (= c ")")))
	    (let (x (read s))
	      (if (key? x)
		  (let (k (clip x 0 (edge x))
                        v (read s))
		    (set (get l k) v))
                  (flag? x) (set (get l (clip x 1)) #t)
		(add l x)))
	    c (do (read-char s) (break)) ; )
	  (error (cat "Expected ) at " s.pos)))))
    l))

(define-reader (")" s)
  (error (cat "Unexpected ) at " s.pos)))

(define-reader ("\"" s)
  (read-char s)
  (let (str "\"")
    (while #t
      (let (c (peek-char s))
	(if (and c (not (= c "\"")))
	    (do (if (= c "\\") (cat! str (read-char s)))
		(cat! str (read-char s)))
	    c (do (read-char s) (break)) ; "
	  (error (cat "Expected \" at " s.pos)))))
    (cat str "\"")))

(define-reader ("|" s)
  (read-char s)
  (let (str "|")
    (while #t
      (let (c (peek-char s))
	(if (and c (not (= c "|")))
	    (cat! str (read-char s))
	    c (do (read-char s) (break)) ; |
	  (error (cat "Expected | at " s.pos)))))
    (cat str "|")))

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
