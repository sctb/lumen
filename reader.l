;; -*- mode: lisp -*-

(define delimiters (set-of "(" ")" ";" "\n"))
(define whitespace (set-of " " "\t" "\n"))

(define stream (str more)
  (obj pos: 0 string: str len: (# str) more: more))

(define peek-char (s)
  (if (< s.pos s.len) (char s.string s.pos)))

(define read-char (s)
  (let c (peek-char s)
    (if c (do (inc s.pos) c))))

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
  (or s.more (error (cat "Expected " c " at " s.pos))))

(define-reader ("" s) ; atom
  (let (str "" dot? false)
    (while true
      (let c (peek-char s)
	(if (and c (and (not (get whitespace c))
			(not (get delimiters c))))
	    (do (if (= c ".") (set dot? true))
                (cat! str (read-char s)))
	  (break))))
    (let n (number str)
      (if (is? n) n
	  (= str "true") true
	  (= str "false") false
          (and dot? (not (one? str)))
          (reduce (fn (a b)
                    `(get ,b (quote ,a)))
                  (reverse (split str ".")))
        str))))

(define-reader ("(" s)
  (read-char s)
  (with r nil
    (let l ()
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (and c (not (= c ")")))
              (let x (read s)
                (if (key? x)
                    (let (k (clip x 0 (edge x))
                          v (read s))
                      (set (get l k) v))
                    (flag? x) (set (get l (clip x 1)) true)
                  (add l x)))
              c (do (read-char s) (set r l))   ; )
            (set r (expected s ")"))))))))

(define-reader (")" s)
  (error (cat "Unexpected ) at " s.pos)))

(define-reader ("\"" s)
  (read-char s)
  (with r nil
    (let str "\""
      (while (nil? r)
        (let c (peek-char s)
          (if (and c (not (= c "\"")))
              (do (if (= c "\\") (cat! str (read-char s)))
                  (cat! str (read-char s)))
              c (set r (cat str (read-char s))) ; "
            (set r (expected s "\""))))))))

(define-reader ("|" s)
  (read-char s)
  (with r nil
    (let str "|"
      (while (nil? r)
        (let c (peek-char s)
          (if (and c (not (= c "|")))
              (cat! str (read-char s))
              c (set r (cat str (read-char s))) ; |
            (set r (expected s "|"))))))))

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

(export stream
        read
        read-all
        read-string)
