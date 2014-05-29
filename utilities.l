;; -*- mode: lisp -*-

(define-module utilities
  import: (special core)
  export: (setenv
           getenv
           macro-function
           macro?
           special?
           special-form?
           symbol-expansion
           symbol?
           variable?
           bound?
           quoted
           stash*
           make-id
           bind
           bind*
           quasiexpand
           macroexpand
           indentation
           with-indent
           valid-id?
           to-id
           module-key
           quote-environment
           quote-modules
           initial-environment))

;; environment

(define-global exports (table))

(define setenv (k rest: keys)
  (if (string? k)
      (let (frame (last environment)
            x (or (get frame k) (table)))
        (each (keys k1 v)
          (set (get x k1) v))
        (set x.module current-module)
        (set (get frame k) x))))

(define getenv (k rest: keys)
  (if (string? k)
      (let (b (find (fn (e)
                      (get e k))
                    (reverse environment)))
        (if (table? b)
            (let (k (keys? keys))
              (if k (get b k) b))))))

(define macro-function (k)
  (getenv k :macro))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (is? (getenv k :special)))

(define special-form? (form)
  (and (list? form) (special? (hd form))))

(define symbol-expansion (k)
  (getenv k :symbol))

(define symbol? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (let (b (find (fn (frame)
                  (or (get frame k) frame._scope))
                (reverse environment)))
    (and (table? b) (is? b.variable))))

(define global? (k)
  (getenv k :global))

(define bound? (x)
  (or (macro? x)
      (special? x)
      (symbol? x)
      (variable? x)
      (global? x)))

;; expansion

(define-local escape (str)
  (let (str1 "\"" i 0)
    (while (< i (length str))
      (let (c (char str i)
            c1 (if (= c "\n") "\\n"
                   (= c "\"") "\\\""
                   (= c "\\") "\\\\"
                 c))
        (cat! str1 c1))
      (inc i))
    (cat str1 "\"")))

(define quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
    `(list ,@(map* quoted form))))

(define stash* (args)
  (if (keys? args)
      (let (l '(%object _stash true))
        (each (args k v)
          (add l k)
          (add l v))
        (join args (list l)))
    args))

(let (id-count 0) 
  (define make-id ()
    (inc id-count)
    (cat "_g" id-count)))

(define bind (lh rh)
  (if (and (composite? lh) (list? rh))
      (let (id (make-id))
	`((,id ,rh) ,@(bind lh id)))
      (atom? lh) `((,lh ,rh))
    (let (bs () r lh.rest)
      (across (lh x i)
        (join! bs (bind x `(at ,rh ,i))))
      (if r (join! bs (bind r `(sub ,rh ,(length lh)))))
      (each (lh k v)
        (if (= v true) (set v k))
        (if (~= k 'rest)
            (join! bs (bind v `(get ,rh ',k)))))
      bs)))

(define bind* (args body)
  (let (args1 ())
    (define-local rest ()
      (if (= target 'js)
          `(unstash (sublist arguments ,(length args1)))
        (do (add args1 '|...|)
            '(unstash (list |...|)))))
    (if (atom? args)
        (list args1 `((let ,(list args (rest)) ,@body)))
      (let (bs ()
            r (or args.rest (and (keys? args) (make-id))))
        (across (args arg)
          (if (atom? arg) (add args1 arg)
              (or (list? arg) (keys? arg))
              (let (v (make-id))
                (add args1 v)
                (join! bs (list arg v)))))
        (if r (join! bs (list r (rest))))
        (if (keys? args)
            (join! bs (list (sub args (length args)) r)))
        (if (empty? bs)
            (list args1 body)
          (list args1 `((let ,bs ,@body))))))))

(define-local quoting? (depth) (number? depth))
(define-local quasiquoting? (depth) (and (quoting? depth) (> depth 0)))
(define-local can-unquote? (depth) (and (quoting? depth) (= depth 1)))

(define-local quasisplice? (x depth)
  (and (list? x)
       (can-unquote? depth)
       (= (hd x) 'unquote-splicing)))

(define macroexpand (form)
  (if (symbol? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let (x (hd form))
      (if (= x '%for)
          (let ((_ (t k) rest: body) form)
            `(%for (,(macroexpand t) ,(macroexpand k))
               ,@(macroexpand body)))
          (= x '%function)
          (let ((_ args rest: body) form)
            (with-bindings (args)
              `(%function ,(map* macroexpand args)
                 ,@(macroexpand body))))
          (or (= x '%local-function)
              (= x '%global-function))
          (let ((_ name args rest: body) form)
            (with-bindings (args)
              `(,x ,name ,(map* macroexpand args)
                 ,@(macroexpand body))))
	  (macro? x)
          (macroexpand
           (apply (macro-function x) (tl form)))
        (map* macroexpand form)))))

(define-local quasiquote-list (form depth)
  (let (xs (list '(list)))
    (each (form k v)
      (let (v (if (quasisplice? v depth)
                  ;; don't splice, just expand
                  (quasiexpand (at v 1))
                (quasiexpand v depth)))
        (set (get (last xs) k) v)))
    ;; collect sibling lists
    (across (form x)
      (if (quasisplice? x depth)
	  (let (x (quasiexpand (at x 1)))
            (add xs x)
            (add xs '(list)))
	(add (last xs) (quasiexpand x depth))))
    (if (= (length xs) 1) (hd xs)
      (reduce (fn (a b)
                (list 'join a b))
	      ;; remove empty lists
	      (keep (fn (x)
                      (or (> (length x) 1)
                          (not (= (hd x) 'list))
                          (keys? x)))
                    xs)))))

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
    (map* (fn (x) (quasiexpand x depth)) form)))

;; compiler

(define-global indent-level 0)

(define indentation ()
  (apply cat (replicate indent-level "  ")))

(define-macro with-indent (form)
  (let (result (make-id))
    `(do (inc indent-level)
         (let (,result ,form)
           (dec indent-level)
           ,result))))

(define-local reserved
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

(define-local numeric? (n)
  (and (> n 47) (< n 58)))

(define-local valid-char? (n)
  (or (numeric? n)             ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define valid-id? (id)
  (if (empty? id) false
      (special? id) false
      (get reserved id) false
    (let (i 0)
      (while (< i (length id))
        (let (n (code id i)
              valid? (valid-char? n))
          (if (or (not valid?)
                  (and (= i 0) (numeric? n)))
              (return false)))
        (inc i))
      true)))

(define to-id (id)
  (let (id1 "" i 0)
    (while (< i (length id))
      (let (c (char id i)
            n (code c)
            c1 (if (= c "-") "_"
                   (valid-char? n) c
                   (= i 0) (cat "_" n)
                 n))
        (cat! id1 c1))
      (inc i))
    id1))

(define module-key (spec)
  (if (atom? spec)
      (to-string spec)
    (error "Unsupported module specification")))

;; bootstrap

(define-local quote-binding (b)
  (set b (extend b module: `',b.module))
  (if (is? b.symbol)
      (extend b symbol: `',b.symbol)
      (and b.macro b.form)
      (exclude (extend b macro: b.form) :form)
      (and b.special b.form)
      (exclude (extend b special: b.form) :form)
      (is? b.variable) b
      (is? b.global) b))

(define-local quote-frame (t)
  `(%object
    ,@(mapo (fn (_ b)
              `(table ,@(quote-binding b)))
            t)))

(define quote-environment (env)
  `(list ,@(map quote-frame env)))

(define-local quote-module (m)
  `(table import: ,(quoted m.import)
          export: ,(quote-frame m.export)))

(define quote-modules ()
  `(table ,@(map* quote-module modules)))

(define initial-environment ()
  (list (table define-module: (getenv 'define-module))))
