(define delimiters (set-of "(" ")" ";" "\n"))
(define whitespace (set-of " " "\t" "\n"))

(define marker (s)
  (if s (cut (get s 'point))
    (obj pos: 0 row: 0 col: 0)))

(define stream (str more)
  (obj point: (marker) string: str len: (# str) more: more))

(define message (str pt)
  (let ((:pos :row :col) pt
        line (+ row 1))
    (cat str pos " line " line ":" col)))

(define peek-char (s)
  (let ((point: (:pos) :len :string) s)
    (when (< pos len)
      (char string pos))))

(define read-char (s)
  (let-when c (peek-char s)
    (let pt (get s 'point)
      (inc (get pt 'pos))
      (inc (get pt 'col))
      (when (= c "\n")
        (inc (get pt 'row))
        (set (get pt 'col) 0))
      c)))

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

(define-global read-string (str more)
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

(define expected (s c from)
  (or (get s 'more)
      (error (message (cat "Expected " c (if from " after " " at "))
                      (or from (get s 'point))))))

(define wrap (s x)
  (let y (read s)
    (if (= y (get s 'more)) y
      (list x y))))

(define maybe-number (str)
  (when (number-code? (code str (edge str)))
    (number str)))

(define real? (x)
  (and (number? x) (not (nan? x)) (not (inf? x))))

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
    (let n (maybe-number str)
      (if (real? n) n str)))))

(define-reader ("(" s)
  (let from (marker s)
    (read-char s)
    (with r nil
      (let l ()
        (while (nil? r)
          (skip-non-code s)
          (let c (peek-char s)
            (if (= c ")") (do (read-char s) (set r l))
                (nil? c) (set r (expected s ")" from))
              (let x (read s)
                (if (key? x)
                    (let (k (clip x 0 (edge x))
                          v (read s))
                      (set (get l k) v))
                    (flag? x) (set (get l (clip x 1)) true)
                  (add l x))))))))))

(define-reader (")" s)
  (error (message "Unexpected ) at " (get s 'point))))

(define-reader ("\"" s)
  (let from (marker s)
    (read-char s)
    (with r nil
      (let str "\""
        (while (nil? r)
          (let c (peek-char s)
            (if (= c "\"") (set r (cat str (read-char s)))
                (nil? c) (set r (expected s "\"" from))
              (do (when (= c "\\")
                    (cat! str (read-char s)))
                  (cat! str (read-char s))))))))))

(define-reader ("|" s)
  (let from (marker s)
    (read-char s)
    (with r nil
      (let str "|"
        (while (nil? r)
          (let c (peek-char s)
            (if (= c "|") (set r (cat str (read-char s)))
                (nil? c) (set r (expected s "|" from))
              (cat! str (read-char s)))))))))

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
