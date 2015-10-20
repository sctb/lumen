;; -*- mode: lisp -*-

(define reader (require 'reader))

(define getenv (k p)
  (when (string? k)
    (let b (find (fn (e)
                   (get e k))
                 (reverse environment))
      (when (is? b)
        (if p (get b p) b)))))

(define macro-function (k)
  (getenv k 'macro))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (is? (getenv k 'special)))

(define special-form? (form)
  (and (not (atom? form)) (special? (hd form))))

(define statement? (k)
  (and (special? k) (getenv k 'stmt)))

(define symbol-expansion (k)
  (getenv k 'symbol))

(define symbol? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (let b (first (fn (frame)
                  (get frame k))
                (reverse environment))
    (and (not (atom? b)) (is? (get b 'variable)))))

(define-global bound? (x)
  (or (macro? x)
      (special? x)
      (symbol? x)
      (variable? x)))

(define-global quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
    `(list ,@(map quoted form))))

(define literal (s)
  (if (string-literal? s) s (quoted s)))

(let (names (obj))
  (define-global unique (x)
    (if (get names x)
        (let i (get names x)
          (inc (get names x))
          (unique (cat x i)))
      (do (set (get names x) 1)
          (cat "_" x)))))

(define stash* (args)
  (if (keys? args)
      (let l `(%object "_stash" true)
        (each (k v) args
          (unless (number? k)
            (add l (literal k))
            (add l v)))
        (join args (list l)))
    args))

(define bias (k)
  (when (and (number? k)
             (not (= target (language))))
    (if (= target 'js)
        (dec k)
      (inc k)))
  k)

(define-global bind (lh rh)
  (if (atom? lh) `(,lh ,rh)
    (let-unique (id)
      (with bs (list id rh)
        (each (k v) lh
          (let x (if (= k 'rest)
                     `(cut ,id ,(# lh))
                   `(get ,id ',(bias k)))
            (when (is? k)
              (let k (if (= v true) k v)
                (join! bs (bind k x))))))))))

(define-macro arguments% (from)
  `((get (get (get Array 'prototype) 'slice) 'call) arguments ,from))

(define-global bind* (args body)
  (let args1 ()
    (define rest ()
      (if (= target 'js)
          `(unstash (arguments% ,(# args1)))
        (do (add args1 '|...|) '(unstash (list |...|)))))
    (if (atom? args)
        (list args1 `(let ,(list args (rest)) ,@body))
      (let bs ()
        (let-unique (r)
          (each (k v) args
            (when (number? k)
              (if (atom? v) (add args1 v)
                (let-unique (x)
                  (add args1 x)
                  (join! bs (list v x)))))))
        (when (keys? args)
          (join! bs (list r (rest)))
          (join! bs (list (keys args) r)))
        (list args1 `(let ,bs ,@body))))))

(define quoting? (depth)
  (number? depth))

(define quasiquoting? (depth)
  (and (quoting? depth) (> depth 0)))

(define can-unquote? (depth)
  (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (can-unquote? depth)
       (not (atom? x))
       (= (hd x) 'unquote-splicing)))

(define expand-local ((x name value))
  `(%local ,name ,(macroexpand value)))

(define expand-function ((x args rest: body))
  (with-bindings (args)
    `(%function ,args ,@(macroexpand body))))

(define expand-definition ((x name args rest: body))
  (with-bindings (args)
    `(,x ,name ,args ,@(macroexpand body))))

(define expand-macro ((name rest: body))
  (macroexpand (apply (macro-function name) body)))

(define-global macroexpand (form)
  (if (symbol? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let x (hd form)
      (if (= x '%local) (expand-local form)
          (= x '%function) (expand-function form)
          (= x '%global-function) (expand-definition form)
          (= x '%local-function) (expand-definition form)
	  (macro? x) (expand-macro form)
        (map macroexpand form)))))

(define quasiquote-list (form depth)
  (let xs (list '(list))
    (each (k v) form
      (unless (number? k)
        (let v (if (quasisplice? v depth)
                   ;; don't splice, just expand
                   (quasiexpand (at v 1))
                 (quasiexpand v depth))
          (set (get (last xs) k) v))))
    ;; collect sibling lists
    (step x form
      (if (quasisplice? x depth)
          (let x (quasiexpand (at x 1))
            (add xs x)
            (add xs '(list)))
        (add (last xs) (quasiexpand x depth))))
    (let pruned
        (keep (fn (x)
                (or (> (# x) 1)
                    (not (= (hd x) 'list))
                    (keys? x)))
              xs)
      (if (one? pruned)
          (hd pruned)
        `(join ,@pruned)))))

(define-global quasiexpand (form depth)
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

(define-global expand-if ((a b rest: c))
  (if (is? b) `((%if ,a ,b ,@(expand-if c)))
      (is? a) (list a)))

(define-global indent-level 0)

(define-global indentation ()
  (with s ""
    (for i indent-level
      (cat! s "  "))))

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

(define-global reserved? (x)
  (get reserved x))

(define valid-code? (n)
  (or (number-code? n)         ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define-global valid-id? (id)
  (if (or (none? id) (reserved? id))
      false
    (do (for i (# id)
          (unless (valid-code? (code id i))
            (return false)))
        true)))

(define-global key (k)
  (let i (inner k)
    (if (valid-id? i) i
        (= target 'js) k
      (cat "[" k "]"))))

(define-global mapo (f t)
  (with o ()
    (each (k v) t
      (let x (f v)
        (when (is? x)
          (add o (literal k))
          (add o x))))))

(define infix
  `((not: (js: ! lua: ,"not"))
    (:* :/ :%)
    (:+ :-)
    (cat: (js: + lua: ..))
    (:< :> :<= :>=)
    (=: (js: === lua: ==))
    (and: (js: && lua: and))
    (or: (js: ,"||" lua: or))))

(define unary? (form)
  (and (two? form) (in? (hd form) '(not -))))

(define index (k)
  (target js: k lua: (when (number? k) (- k 1))))

(define precedence (form)
  (unless (or (atom? form) (unary? form))
    (each (k v) infix
      (if (get v (hd form)) (return (index k)))))
  0)

(define getop (op)
  (find (fn (level)
          (let x (get level op)
            (if (= x true) op
                (is? x) (get x target))))
        infix))

(define infix? (x)
  (is? (getop x)))

(define compile-args (args)
  (let (s "(" c "")
    (step x args
      (cat! s c (compile x))
      (set c ", "))
    (cat s ")")))

(define escape-newlines (s)
  (with s1 ""
    (for i (# s)
      (let c (char s i)
        (cat! s1 (if (= c "\n") "\\n" c))))))

(define id (id)
  (with id1 ""
    (for i (# id)
      (let (c (char id i)
            n (code c)
            c1 (if (= c "-") "_"
                   (valid-code? n) c
                   (= i 0) (cat "_" n)
                 n))
        (cat! id1 c1)))))

(define compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) (escape-newlines x)
      (string? x) (id x)
      (boolean? x) (if x "true" "false")
      (nan? x) "nan"
      (= x inf) "inf"
      (= x -inf) "-inf"
      (number? x) (cat x "")
    (error (cat "Cannot compile atom: " (string x)))))

(define terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt?)
  (let ((x rest: args) form
        (:special :stmt tr: self-tr?) (getenv x)
        tr (terminator (and stmt? (not self-tr?))))
    (cat (apply special args) tr)))

(define parenthesize-call? (x)
  (or (and (not (atom? x))
           (= (hd x) '%function))
      (> (precedence x) 0)))

(define compile-call (form)
  (let (f (hd form)
        f1 (compile f)
        args (compile-args (stash* (tl form))))
    (if (parenthesize-call? f)
        (cat "(" f1 ")" args)
      (cat f1 args))))

(define op-delims (parent child :right)
  (if ((if right >= >)
       (precedence child)
       (precedence parent))
      (list "(" ")")
    (list "" "")))

(define compile-infix (form)
  (let ((op rest: (a b)) form
        (ao ac) (op-delims form a)
        (bo bc) (op-delims form b :right)
        a (compile a)
        b (compile b)
        op (getop op))
    (if (unary? form)
        (cat op ao " " a ac)
      (cat ao a ac " " op " " bo b bc))))

(define-global compile-function (args body :name :prefix)
  (let (id (if name (compile name) "")
        args (compile-args args)
        body (with-indent (compile body :stmt))
        ind (indentation)
        p (if prefix (cat prefix " ") "")
        tr (if (= target 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}" tr)
      (cat p "function " id args "\n" body ind tr))))

(define can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) 'return))
                (not (statement? (hd form)))))))

(define-global compile (form :stmt)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

(define lower-statement (form tail?)
  (let (hoist () e (lower form hoist true tail?))
    (if (and (some? hoist) (is? e))
        `(do ,@hoist ,e)
        (is? e) e
        (> (# hoist) 1) `(do ,@hoist)
      (hd hoist))))

(define lower-body (body tail?)
  (lower-statement `(do ,@body) tail?))

(define literal? (form)
  (or (atom? form)
      (= (hd form) '%array)
      (= (hd form) '%object)))

(define standalone? (form)
  (and (not (atom? form))
       (not (infix? (hd form)))
       (not (literal? form))
       (not (= 'get (hd form)))))

(define lower-do (args hoist stmt? tail?)
  (step x (almost args)
    (let-when e (lower x hoist stmt?)
      (when (standalone? e)
        (add hoist e))))
  (let e (lower (last args) hoist stmt? tail?)
    (if (and tail? (can-return? e))
        `(return ,e)
      e)))

(define lower-set (args hoist stmt? tail?)
  (let ((lh rh) args)
    (add hoist `(set ,lh ,(lower rh hoist)))
    (unless (and stmt? (not tail?))
      lh)))

(define lower-if (args hoist stmt? tail?)
  (let ((cond then else) args)
    (if (or stmt? tail?)
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower-body (list then) tail?)
                   ,@(if else (list (lower-body (list else) tail?)))))
      (let-unique (e)
        (add hoist `(%local ,e))
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower `(set ,e ,then))
                   ,@(if else
                         (list (lower `(set ,e ,else))))))
        e))))

(define lower-short (x args hoist)
  (let ((a b) args
        hoist1 ()
        b1 (lower b hoist1))
    (if (some? hoist1)
        (let-unique (id)
          (lower `(do (%local ,id ,a)
                      ,(if (= x 'and)
                           `(%if ,id ,b ,id)
                         `(%if ,id ,id ,b)))
                 hoist))
      `(,x ,(lower a hoist) ,b1))))

(define lower-try (args hoist tail?)
  (add hoist `(%try ,(lower-body args tail?))))

(define lower-while (args hoist)
  (let ((c rest: body) args)
    (add hoist
         `(while ,(lower c hoist)
            ,(lower-body body)))))

(define lower-for (args hoist)
  (let ((t k rest: body) args)
    (add hoist
         `(%for ,(lower t hoist) ,k
            ,(lower-body body)))))

(define lower-function (args)
  (let ((a rest: body) args)
    `(%function ,a ,(lower-body body true))))

(define lower-definition (kind args hoist)
  (let ((name args rest: body) args)
    (add hoist `(,kind ,name ,args ,(lower-body body true)))))

(define lower-call (form hoist)
  (let form (map (fn (x) (lower x hoist)) form)
    (if (some? form) form)))

(define lower-infix? (form)
  (and (infix? (hd form)) (> (# form) 3)))

(define lower-infix (form hoist)
  (let ((x rest: args) form)
    (lower (reduce (fn (a b)
                     (list x b a))
                   (reverse args))
           hoist)))

(define lower-special (form hoist)
  (let e (lower-call form hoist)
    (if e (add hoist e))))

(define-global lower (form hoist stmt? tail?)
  (if (atom? form) form
      (empty? form) '(%array)
      (nil? hoist) (lower-statement form)
      (lower-infix? form) (lower-infix form hoist)
    (let ((x rest: args) form)
      (if (= x 'do) (lower-do args hoist stmt? tail?)
          (= x 'set) (lower-set args hoist stmt? tail?)
          (= x '%if) (lower-if args hoist stmt? tail?)
          (= x '%try) (lower-try args hoist tail?)
          (= x 'while) (lower-while args hoist)
          (= x '%for) (lower-for args hoist)
          (= x '%function) (lower-function args)
          (or (= x '%local-function)
              (= x '%global-function))
          (lower-definition x args hoist)
          (in? x '(and or))
          (lower-short x args hoist)
          (statement? x) (lower-special form hoist)
        (lower-call form hoist)))))

(define expand (form)
  (lower (macroexpand form)))

(target js: (set (get global 'require) require))
(target js: (define run eval))

(target lua: (define load1 load))
(target lua:
  (define run (code)
    (let |f,e| (load1 code)
      (if f (f) (error (cat e " in " code))))))

(define-global %result)

(define-global eval (form)
  (let previous target
    (set target (language))
    (let code (compile (expand `(set %result ,form)))
      (set target previous)
      (run code)
      %result)))

(define-special do forms :stmt :tr
  (with s ""
    (step x forms
      (cat! s (compile x :stmt)))))

(define-special %if (cond cons alt) :stmt :tr
  (let (cond (compile cond)
        cons (with-indent (compile cons :stmt))
        alt (if alt (with-indent (compile alt :stmt)))
        ind (indentation)
        s "")
    (if (= target 'js)
        (cat! s ind "if (" cond ") {\n" cons ind "}")
      (cat! s ind "if " cond " then\n" cons))
    (if (and alt (= target 'js))
        (cat! s " else {\n" alt ind "}")
        alt (cat! s ind "else\n" alt))
    (if (= target 'lua)
        (cat s ind "end\n")
      (cat s "\n"))))

(define-special while (cond form) :stmt :tr
  (let (cond (compile cond)
        body (with-indent (compile form :stmt))
        ind (indentation))
    (if (= target 'js)
	(cat ind "while (" cond ") {\n" body ind "}\n")
      (cat ind "while " cond " do\n" body ind "end\n"))))

(define-special %for (t k form) :stmt :tr
  (let (t (compile t)
        ind (indentation)
        body (with-indent (compile form :stmt)))
    (if (= target 'lua)
	(cat ind "for " k " in next, " t " do\n" body ind "end\n")
      (cat ind "for (" k " in " t ") {\n" body ind "}\n"))))

(define-special %try (form) :stmt :tr
  (let-unique (e)
    (let (ind (indentation)
          body (with-indent (compile form :stmt))
          hf `(return (%array false (get ,e "message")))
          h (with-indent (compile hf :stmt)))
      (cat ind "try {\n" body ind "}\n"
           ind "catch (" e ") {\n" h ind "}\n"))))

(define-special %delete (place) :stmt
  (cat (indentation) "delete " (compile place)))

(define-special break () :stmt
  (cat (indentation) "break"))

(define-special %function (args body)
  (compile-function args body))

(define-special %global-function (name args body) :stmt :tr
  (if (= target 'lua)
      (let x (compile-function args body name: name)
        (cat (indentation) x))
    (compile `(set ,name (%function ,args ,body)) :stmt)))

(define-special %local-function (name args body) :stmt :tr
  (if (= target 'lua)
      (let x (compile-function args body name: name prefix: 'local)
        (cat (indentation) x))
    (compile `(%local ,name (%function ,args ,body)) :stmt)))

(define-special return (x) :stmt
  (let x (if (nil? x)
             "return"
           (cat "return(" (compile x) ")"))
    (cat (indentation) x)))

(define-special new (x)
  (cat "new " (compile x)))

(define-special error (x) :stmt
  (let e (if (= target 'js)
             (cat "throw " (compile `(new (Error ,x))))
           (cat "error(" (compile x) ")"))
    (cat (indentation) e)))

(define-special %local (name value) :stmt
  (let (id (compile name)
        value1 (compile value)
        rh (if (is? value) (cat " = " value1) "")
	keyword (if (= target 'js) "var " "local ")
        ind (indentation))
    (cat ind keyword id rh)))

(define-special set (lh rh) :stmt
  (let (lh (compile lh)
        rh (compile (if (nil? rh) 'nil rh)))
    (cat (indentation) lh " = " rh)))

(define-special get (t k)
  (let (t (compile t)
	k1 (compile k))
    (when (and (= target 'lua)
               (= (char t 0) "{"))
      (set t (cat "(" t ")")))
    (if (and (string-literal? k)
             (valid-id? (inner k)))
        (cat t "." (inner k))
      (cat t "[" k1 "]"))))

(define-special %array forms
  (let (open (if (= target 'lua) "{" "[")
	close (if (= target 'lua) "}" "]")
	s "" c "")
    (each (k v) forms
      (when (number? k)
        (cat! s c (compile v))
        (set c ", ")))
    (cat open s close)))

(define-special %object forms
  (let (s "{" c ""
        sep (if (= target 'lua) " = " ": "))
    (each (k v) (pair forms)
      (when (number? k)
        (let ((k v) v)
          (unless (string? k)
            (error (cat "Illegal key: " (string k))))
          (cat! s c (key k) sep (compile v))
          (set c ", "))))
    (cat s "}")))

(export run
        eval
        expand
        compile)
