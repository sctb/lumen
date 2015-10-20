;; -*- mode: lisp -*-

(define delimiters (set-of "(" ")" ";" "\n"))
(define whitespace (set-of " " "\t" "\n"))

(define stream (str more)
  (obj pos: 0 string: str len: (# str) more: more))

(define peek-char (s)
  (let ((:pos :len :string) s)
    (when (< pos len)
      (char string pos))))

(define read-char (s)
  (let c (peek-char s)
    (if c (do (inc (get s 'pos)) c))))

(define skip-non-code (s)
  (while true
    (let c (peek-char s)
      (if (nil? c) (break)
          (get whitespace c) (read-char s)
          (= c ";")
          (do (while (and c (not (= c "\n")))
                (set c (read-char s)))
              (skip-non-code s))
        (break)))))

(define read-table (obj))
(define eof (obj))

(define read (s)
  (skip-non-code s)
  (let c (peek-char s)
    (if (is? c)
	((or (get read-table c)
	     (get read-table ""))
	 s)
      eof)))

(define read-all (s)
  (with l ()
    (while true
      (let form (read s)
        (if (= form eof) (break))
        (add l form)))))

(define read-string (str more)
  (let x (read (stream str more))
    (unless (= x eof) x)))

(define key? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom (edge atom)) ":")))

(define flag? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom 0) ":")))

(define expected (s c)
  (let ((:more :pos) s)
    (or more (error (cat "Expected " c " at " pos)))))

(define wrap (s x)
  (let y (read s)
    (if (= y (get s 'more)) y
      (list x y))))

(define-reader ("" s) ; atom
  (let (str "")
    (while true
      (let c (peek-char s)
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (cat! str (read-char s))
	  (break))))
    (if (= str "true") true
        (= str "false") false
        (= str "nan") nan
        (= str "-nan") nan
        (= str "inf") inf
        (= str "-inf") -inf
      (let n (number str)
        (if (or (nil? n) (nan? n) (inf? n)) str n)))))

(define-reader ("(" s)
  (read-char s)
  (with r nil
    (let l ()
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (= c ")") (do (read-char s) (set r l))
              (nil? c) (set r (expected s ")"))
            (let x (read s)
              (if (key? x)
                  (let (k (clip x 0 (edge x))
                        v (read s))
                    (set (get l k) v))
                  (flag? x) (set (get l (clip x 1)) true)
                (add l x)))))))))

(define-reader (")" s)
  (error (cat "Unexpected ) at " (get s 'pos))))

(define-reader ("\"" s)
  (read-char s)
  (with r nil
    (let str "\""
      (while (nil? r)
        (let c (peek-char s)
          (if (= c "\"") (set r (cat str (read-char s)))
              (nil? c) (set r (expected s "\""))
            (do (when (= c "\\")
                  (cat! str (read-char s)))
                (cat! str (read-char s)))))))))

(define-reader ("|" s)
  (read-char s)
  (with r nil
    (let str "|"
      (while (nil? r)
        (let c (peek-char s)
          (if (= c "|") (set r (cat str (read-char s)))
              (nil? c) (set r (expected s "|"))
            (cat! str (read-char s))))))))

(define-reader ("'" s)
  (read-char s)
  (wrap s 'quote))

(define-reader ("`" s)
  (read-char s)
  (wrap s 'quasiquote))

(define-reader ("," s)
  (read-char s)
  (if (= (peek-char s) "@")
      (do (read-char s)
	  (wrap s 'unquote-splicing))
    (wrap s 'unquote)))

(export stream
        read
        read-all
        read-string
        read-table)
