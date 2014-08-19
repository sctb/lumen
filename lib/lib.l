;; -*- mode: lisp -*-

(define getenv (k p)
  (when (string? k)
    (let (b (find (fn (e)
                    (get e k))
                  (reverse environment)))
      (when (is? b)
        (if p (get b p) b)))))

(define macro-function (k)
  (getenv k 'macro))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (is? (getenv k 'special)))

(define special-form? (form)
  (and (list? form) (special? (hd form))))

(define statement? (k)
  (and (special? k) (getenv k 'stmt)))

(define symbol-expansion (k)
  (getenv k 'symbol))

(define symbol? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (let (b (first (fn (frame)
                   (or (get frame k) frame._scope))
                 (reverse environment)))
    (and (table? b) (is? b.variable))))

(define bound? (x)
  (or (macro? x)
      (special? x)
      (symbol? x)
      (variable? x)))

(define escape (s)
  (let (s1 "\"" i 0)
    (while (< i (length s))
      (let (c (char s i)
            c1 (if (= c "\n") "\\n"
                   (= c "\"") "\\\""
                   (= c "\\") "\\\\"
                 c))
        (cat! s1 c1))
      (inc i))
    (cat s1 "\"")))

(define quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
    `(list ,@(map quoted form))))

(define literal (s)
  (if (string-literal? s) s (quoted s)))

(define stash* (args)
  (if (keys? args)
      (let (l `(%object "_stash" true))
        (all (k v) args
          (unless (number? k)
            (add l (literal k))
            (add l v)))
        (join args (list l)))
    args))

(define index (k)
  (target js: k lua: (when (number? k) (- k 1))))

(define bias (k)
  (when (and (number? k)
             (not (= target (language))))
    (if (= target 'js)
        (dec k)
      (inc k)))
  k)

(define bind (lh rh)
  (if (and (composite? lh) (list? rh)) ; list lh?
      (let (id (unique))
	`((,id ,rh) ,@(bind lh id)))
      (atom? lh) `((,lh ,rh))
    (let (bs ())
      (all (k v) lh
        (let (x (if (= k 'rest)
                    `(cut ,rh ,(length lh))
                  `(get ,rh ',(bias k))))
          (let (k (if (= v #t) k v))
            (join! bs (bind k x)))))
      bs)))

(define bind* (args body)
  (let (args1 ()
        rest (fn ()
               (if (= target 'js)
                   `(unstash 
                     (Array.prototype.slice.call arguments ,(length args1)))
                 (do (add args1 '|...|) '(unstash (list |...|))))))
    (if (atom? args)
        (list args1 `((let ,(list args (rest)) ,@body)))
      (let (bs () k? (keys? args) r (unique))
        (all (k v) args
          (when (number? k)
            (if (atom? v) (add args1 v)
              (let (x (unique))
                (add args1 x)
                (join! bs (list v x))))))
        (when k?
          (join! bs (list r (rest)))
          (join! bs (list (keys args) r)))
        (list args1 `((let ,bs ,@body)))))))

(define quoting? (depth) (number? depth))
(define quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (list? x)
       (can-unquote? depth)
       (= (hd x) 'unquote-splicing)))

(define macroexpand (form)
  (if (symbol? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let (x (hd form))
      (if (= x '%local)
          (let ((_ name value) form)
            `(%local ,name ,(macroexpand value)))
          (= x '%function)
          (let ((_ args rest: body) form)
            (with-bindings (args)
              `(%function ,args ,@(macroexpand body))))
          (= x '%definition)
          (let ((_ name args rest: body) form)
            (with-bindings (args)
              `(,x ,name ,args ,@(macroexpand body))))
	  (macro? x)
          (macroexpand (apply (macro-function x) (tl form)))
        (map macroexpand form)))))

(define quasiquote-list (form depth)
  (let (xs (list '(list)))
    (all (k v) form
      (unless (number? k)
        (let (v (if (quasisplice? v depth)
                    ;; don't splice, just expand
                    (quasiexpand (at v 1))
                  (quasiexpand v depth)))
          (set (get (last xs) k) v))))
    ;; collect sibling lists
    (series
     (fn (x)
       (if (quasisplice? x depth)
           (let (x (quasiexpand (at x 1)))
             (add xs x)
             (add xs '(list)))
         (add (last xs) (quasiexpand x depth))))
     form)
    (let (pruned
          (keep (fn (x)
                  (or (> (length x) 1)
                      (not (= (hd x) 'list))
                      (keys? x)))
                xs))
      `(join* ,@pruned))))

(define quasiexpand (form depth)
  (if (quasiquoting? depth)
      (if (atom? form) (list 'quote form)
          ;; unquote
          (and (can-unquote? depth)
               (= (hd form) 'unquote))
          (quasiexpand (at form 1))
          ;; decrease quasiquoting depth
          (or (= (hd form) 'unquote)
              (= (hd form) 'unquote-splicing))
          (quasiquote-list form (- depth 1))
          ;; increase quasiquoting depth
          (= (hd form) 'quasiquote)
          (quasiquote-list form (+ depth 1))
        (quasiquote-list form depth))
      (atom? form) form
      (= (hd form) 'quote) form
      (= (hd form) 'quasiquote)
      ;; start quasiquoting
      (quasiexpand (at form 1) 1)
    (map (fn (x) (quasiexpand x depth)) form)))

(define expand-if ((a b rest: c))
  (if (is? b) `((%if ,a ,b ,@(expand-if c)))
      (is? a) (list a)))

(define indent-level 0)

(define indentation ()
  (apply cat (replicate indent-level "  ")))

(define reserved
  (set-of "=" "==" "+" "-" "%" "*" "/" "<" ">" "<=" ">="
          ;; js
          "break" "case" "catch" "continue" "debugger"
          "default" "delete" "do" "else" "finally" "for"
          "function" "if" "in" "instanceof" "new" "return"
          "switch" "this" "throw" "try" "typeof" "var"
          "void" "with"
          ;; lua
          "and" "end" "in" "repeat" "while" "break" "false"
          "local" "return" "do" "for" "nil" "then" "else"
          "function" "not" "true" "elseif" "if" "or" "until"))

(define reserved? (x)
  (get reserved x))

(define numeric? (n)
  (and (> n 47) (< n 58)))

(define valid-code? (n)
  (or (numeric? n)             ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define valid-id? (id)
  (if (or (none? id) (reserved? id))
      #f
    (let (i 0)
      (while (< i (length id))
        (unless (valid-code? (code id i))
          (return #f))
        (inc i))
      #t)))

(define id (id)
  (let (id1 "" i 0)
    (while (< i (length id))
      (let (c (char id i)
            n (code c)
            c1 (if (= c "-") "_"
                   (valid-code? n) c
                   (= i 0) (cat "_" n)
                 n))
        (cat! id1 c1))
      (inc i))
    id1))

(define key (k)
  (let (i (inner k))
    (if (valid-id? i) i
        (= target 'js) k
      (cat "[" k "]"))))

(define mapo (f t)
  (let (o ())
    (all (k v) t
      (let (x (f v))
        (when (is? x)
          (add o (literal k))
          (add o x))))
    o))
