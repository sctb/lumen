;; -*- mode: lisp -*-

(define-module reader
  import: (special core)
  export: (make-stream
           read-table
           define-reader
           read
           read-all
           read-from-string))

(define-local delimiters (set-of "(" ")" ";" "\n"))
(define-local whitespace (set-of " " "\t" "\n"))

(define-local make-stream (str)
  (table pos: 0 string: str len: (length str)))

(define-local peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

(define-local read-char (s)
  (let (c (peek-char s))
    (if c (do (inc s.pos) c))))

(define-local skip-non-code (s)
  (while true
    (let (c (peek-char s))
      (if (nil? c) (break)
          (get whitespace c) (read-char s)
          (= c ";")
          (do (while (and c (not (= c "\n")))
                (set c (read-char s)))
              (skip-non-code s))
        (break)))))

(define-local read-table (table))
(define-local eof (table))

(define-local read (s)
  (skip-non-code s)
  (let (c (peek-char s))
    (if (is? c)
	((or (get read-table c)
	     (get read-table ""))
	 s)
      eof)))

(define-local read-all (s)
  (let (l ())
    (while true
      (let (form (read s))
        (if (= form eof) (break))
        (add l form)))
    l))

(define-local read-from-string (str)
  (read (make-stream str)))

(define-local key? (atom)
  (and (string? atom)
       (> (length atom) 1)
       (= (char atom (- (length atom) 1)) ":")))

(define-local flag? (atom)
  (and (string? atom)
       (> (length atom) 1)
       (= (char atom 0) ":")))

(define-macro define-reader ((char stream) rest: body)
  `(set (get read-table ,char) (fn (,stream) ,@body)))

(define-reader ("" s) ; atom
  (let (str "" dot? false)
    (while true
      (let (c (peek-char s))
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (do (if (= c ".") (set dot? true))
                (cat! str c)
		(read-char s))
	  (break))))
    (let (n (parse-number str))
      (if (is? n) n
	  (= str "true") true
	  (= str "false") false
          (= str "_") (make-id)
          dot?
          (reduce (fn (a b)
                    `(get ,b (quote ,a)))
                  (reverse (split str ".")))
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
		  (let (k (sub x 0 (- (length x) 1))
			v (read s))
		    (set (get l k) v))
                  (flag? x) (set (get l (sub x 1)) true)
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

(define-reader ("|" s)
  (read-char s)
  (let (str "|")
    (while true
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
