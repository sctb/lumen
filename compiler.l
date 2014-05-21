;; -*- mode: lisp -*-

(define-module compiler
  import: (reader lib compiler)
  export: (eval
           compile
           compile-toplevel
           compile-module
           compiler-output
           load-module
           define-module
           open-module
           with-environment
           with-module
           quote-modules
           quote-environment
           with-indent
           ;; special
           do
           if
           while
           %for
           %try
           break
           %function
           %global-function
           %local-function
           return
           error
           %local
           set
           get
           not
           %array
           %object))

(define infix
  (table common: (table :+ :- :% :* :/ :< :> :<= :>=)
	 js: (table =: "===" ~=: "!=" and: "&&" or: "||" cat: "+")
	 lua: (table =: "==" cat: ".." :~= :and :or)))

(define getop (op)
  (let (op1 (or (get infix.common op)
                (get (get infix target) op)))
    (if (= op1 true) op op1)))

(define infix? (form)
  (and (list? form) (is? (getop (hd form)))))

(define indent-level 0)

(define indentation ()
  (apply cat (replicate indent-level "  ")))

(define-macro with-indent (form)
  (let (result (make-id))
    `(do (inc indent-level)
         (let (,result ,form)
           (dec indent-level)
           ,result))))

(define compile-args (args)
  (let (str "(")
    (across (args arg i)
      (cat! str (compile arg))
      (if (< i (- (length args) 1)) (cat! str ", ")))
    (cat str ")")))

(define compile-body (forms :tail?)
  (let (str "")
    (across (forms x i)
      (let (t? (and tail? (= i (- (length forms) 1))))
	(cat! str (compile x :stmt? tail?: t?))))
    str))

(define numeric? (n)
  (and (> n 47) (< n 58)))

(define valid-char? (n)
  (or (numeric? n)             ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define valid-id? (id)
  (if (empty? id) false
      (special? id) false
      (getop id) false
    (let (i 0)
      (while (< i (length id))
        (let (n (code id i)
              valid? (valid-char? n))
          (if (or (not valid?)
                  (and (= i 0) (numeric? n)))
              (return false)))
        (inc i))
      true)))

(define compile-id (id)
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

(define compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) x
      (string? x) (compile-id x)
      (boolean? x) (if x "true" "false")
      (number? x) (cat x "")
    (error "Unrecognized atom")))

(define compile-call (form)
  (if (empty? form)
      (compile-special '(%array))       ; ()
    (let (f (hd form)
          f1 (compile f)
          args (compile-args (stash* (tl form))))
      (if (list? f) (cat "(" f1 ")" args)
          (string? f) (cat f1 args)
        (error "Invalid function call")))))

(define compile-infix ((op rest: args))
  (let (str "("
        op (getop op))
    (across (args arg i)
      (if (and (= op '-) (= (length args) 1))
          (cat! str op (compile arg))
        (do (cat! str (compile arg))
            (if (< i (- (length args) 1))
                (cat! str " " op " ")))))
    (cat str ")")))

(define compile-branch (condition body first? last? tail?)
  (let (cond1 (compile condition)
        body (with-indent (compile body :stmt? tail?: tail?))
        ind (indentation)
        tr (if (and last? (= target 'lua))
               (cat ind "end\n")
               last? "\n"
             ""))
    (if (and first? (= target 'js))
        (cat ind "if (" cond1 ") {\n" body ind "}" tr)
        first?
        (cat ind "if " cond1 " then\n" body tr)
        (and (nil? condition) (= target 'js))
        (cat " else {\n" body ind "}\n")
        (nil? condition)
        (cat ind "else\n" body tr)
        (= target 'js)
        (cat " else if (" cond1 ") {\n" body ind "}" tr)
      (cat ind "elseif " cond1 " then\n" body tr))))

(define compile-function (args body :name :prefix)
  (let (id (if name (compile name) "")
        prefix (or prefix "")
        args (compile-args args)
        body (with-indent (compile-body body :tail?))
        ind (indentation)
        tr (if name "end\n" "end"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}")
      (cat prefix "function " id args "\n" body ind tr))))

(define terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt? tail?)
  (let ((:special :stmt tr: self-tr?) (getenv (hd form)))
    (if (and (not stmt?) stmt)
        (compile `((%function () ,form)) tail?: tail?)
      (let (tr (terminator (and stmt? (not self-tr?))))
        (cat (special (tl form) tail?) tr)))))

(define-special do (forms tail?) :stmt :tr
  (compile-body forms tail?: tail?))

(define-special if (form tail?) :stmt :tr
  (let (str "")
    (across (form condition i)
      (let (last? (>= i (- (length form) 2))
	    else? (= i (- (length form) 1))
	    first? (= i 0)
	    body (at form (+ i 1)))
	(if else?
	    (do (set body condition)
		(set condition nil)))
	(cat! str (compile-branch condition body first? last? tail?)))
      (inc i))
    str))

(define-special while ((condition rest: body)) :stmt :tr
  (let (condition (compile condition)
        body (with-indent (compile-body body))
        ind (indentation))
    (if (= target 'js)
	(cat ind "while (" condition ") {\n" body ind "}\n")
      (cat ind "while " condition " do\n" body ind "end\n"))))

(define-special %for (((t k) rest: body)) :stmt :tr
  (let (t (compile t)
        ind (indentation)
        body (with-indent (compile-body body)))
    (if (= target 'lua)
	(cat ind "for " k " in next, " t " do\n" body ind "end\n")
      (cat ind "for (" k " in " t ") {\n" body ind "}\n"))))

(define-special %try (forms) :stmt :tr
  (let (ind (indentation)
        body (with-indent (compile-body forms :tail?))
        e (make-id)
        handler `(return (%array false ,e))
        h (with-indent (compile handler :stmt?)))
    (cat ind "try {\n" body ind "}\n"
         ind "catch (" e ") {\n" h ind "}\n")))

(define-special break (_) :stmt
  (cat (indentation) "break"))

(define-special %function ((args rest: body))
  (compile-function args body))

(define-special %global-function
    ((name args rest: body)) :stmt :tr
  (if (= target 'lua)
      (compile-function args body name: name)
    (compile `(set ,name (%function ,args ,@body)) :stmt?)))

(define-special %local-function
    ((name args rest: body)) :stmt :tr
  (compile-function args body name: name prefix: "local "))

(define-special return ((x)) :stmt
  (let (x (if (nil? x)
              "return"
            (compile-call `(return ,x))))
    (cat (indentation) x)))

(define-special error ((x)) :stmt
  (let (e (if (= target 'js)
              (cat "throw " (compile x))
            (compile-call `(error ,x))))
    (cat (indentation) e)))

(define-special %local ((name value)) :stmt
  (let (id (compile name)
        value (compile value)
	keyword (if (= target 'js) "var " "local ")
        ind (indentation))
    (cat ind keyword id " = " value)))

(define-special set ((lh rh)) :stmt
  (if (nil? rh)
      (error "Missing right-hand side in assignment"))
  (cat (indentation) (compile lh) " = " (compile rh)))

(define-special get ((t k))
  (let (t (compile t)
	k1 (compile k))
    (if (and (= target 'lua)
	     (= (char t 0) "{"))
	(set t (cat "(" t ")")))
    (if (and (string-literal? k)
             (valid-id? (inner k)))
        (cat t "." (inner k))
      (cat t "[" k1 "]"))))

(define-special not ((x))
  (let (x (compile x)
	open (if (= target 'js) "!(" "(not "))
    (cat open x ")")))

(define-special %array (forms)
  (let (open (if (= target 'lua) "{" "[")
	close (if (= target 'lua) "}" "]")
	str "")
    (across (forms x i)
      (cat! str (compile x))
      (if (< i (- (length forms) 1)) (cat! str ", ")))
    (cat open str close)))

(define-special %object (forms)
  (let (str "{"
        sep (if (= target 'lua) " = " ": ")
        pairs (pairwise forms))
    (across (pairs (k v) i)
      (if (not (string? k))
          (error (cat "Illegal key: " (to-string k))))
      (let (v (compile v)
            k (if (valid-id? k) k
                  (and (= target 'js) (string-literal? k)) k
                  (= target 'js) (quoted k)
                  (string-literal? k) (cat "[" k "]")
                (cat "[" (quoted k) "]")))
        (cat! str k sep v))
      (if (< i (- (length pairs) 1)) (cat! str ", ")))
    (cat str "}")))

(define can-return? (form)
  (or (not (special-form? form))
      (not (get (getenv (hd form)) 'stmt))))

(define compile (form :stmt? :tail?)
  (if (and tail? (can-return? form))
      (set form `(return ,form)))
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt? tail?)
    (let (tr (terminator stmt?)
          ind (if stmt? (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? form) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

(define compile-toplevel (form)
  (compile (macroexpand form) :stmt?))

;; eval

(target js:
  (do (define vm (require 'vm))
      (define global.require require)
      (define run vm.runInThisContext)))

(target lua:
 (do (define run-result nil)
     (define run (x)
       (let (f (load (cat (compile 'run-result) '= x)))
         (if f (do (f) run-result)
           (let (|f,e| (load x))
             (if f (f) (error (cat e " in " x)))))))))

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (str (compile (macroexpand form)))
      (set target previous)
      (run str))))

;; linker

(define module nil)
(define loading (table))

(define compiler-output nil)
(define compiling? false)

(define compile-file (file)
  (let (str (read-file file)
        body (read-all (make-stream str)))
    (compile-toplevel `(do ,@body))))

(define initial-environment ()
  (let (m (getenv 'define-module)
        x (table define-module: m))
    (list x)))

(define load-module (spec)
  (let (k (to-string spec))
    (if (list? spec)
        (error "Unsupported module specification")
        (or (nil? (get modules k))
            (and compiling?
                 (nil? (get loading k))))
        (%compile-module k))
    (open-module spec)))

(define %compile-module (k)
  (let (file (cat k ".l")
        mod0 module
        env0 environment
        env1 (initial-environment))
    (set (get loading k) true)
    (set module k)
    (set environment env1)
    (let (compiled (compile-file file)
          top (toplevel k))
      (set module mod0)
      (set environment env0)
      (each ((hd env1) b x)
        (if (= x.module k)
            (set (get top b) x)))
      (if compiling?
          (cat! compiler-output compiled)
        (run compiled)))))

(define-macro with-environment (env rest: body)
  (let (env0 (make-id) x (make-id))
    `(let (,env0 environment)
       (set environment ,env)
       (let (,x (do ,@body))
         (set environment ,env0)
         ,x))))

(define %load-module (spec)
  (let (k (to-string spec)
        m (get modules k))
    (if (not m.environment)
        (let (env (list m.toplevel (table)))
          (with-environment env
            (map open-module m.import)
            (set m.environment env))))))

(define toplevel (m)
  (get (get modules m) 'toplevel))

(define open-module (spec)
  (let (m (to-string spec)
        frame (last environment))
    (each ((toplevel m) k v)
      (if v.export (set (get frame k) v)))))

(define-macro with-module (spec rest: body)
  (let (m (make-id))
    `(let (,m (get modules (to-string ,spec)))
       (%load-module ,spec)
       (with-environment (get ,m 'environment)
         ,@body))))

(define-macro define-module (spec rest: body)
  (let ((import: imp export: exp) body)
    (map load-module imp)
    (let (k (to-string spec))
      (set (get modules k)
           (table import: imp toplevel: (table))))
    (across ((or exp ()) k)
      (setenv k :export)))
  nil)

(define compile-module (spec)
  (set compiling? true)
  (set compiler-output "")
  (load-module spec))

;; bootstrap

(define quote-binding (x)
  (if x.module
      (set x (extend x module: `',x.module)))
  (if (is? x.symbol)
      (extend x symbol: `',x.symbol)
      (and x.macro x.form)
      (exclude (extend x macro: x.form) :form)
      (and x.special x.form)
      (exclude (extend x special: x.form) :form)
      (is? x.variable) x))

(define quote-frame (t)
  `(%object
    ,@(mapo (fn (_ x)
              `(table ,@(quote-binding x)))
            t)))

(define quote-environment (env)
  `(list ,@(map quote-frame env)))

(define quote-module (m)
  `(table import: ,(quoted m.import)
          toplevel: ,(quote-frame m.toplevel)))

(define quote-modules ()
  `(table ,@(map* quote-module modules)))
