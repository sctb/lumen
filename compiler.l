;; -*- mode: lisp -*-

(define-module compiler
  import: (runtime utilities special core reader)
  export: (compile-body
           compile-call
           compile-branch
           compile-function
           compile-special
           compile
           open-module
           load-module
           in-module
           compile-module
           eval))

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

(define compile)

(define compile-args (args)
  (let (str "(")
    (each (arg :i) args
      (cat! str (compile arg))
      (if (< i (- (length args) 1)) (cat! str ", ")))
    (cat str ")")))

(define compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) x
      (string? x) (to-id x)
      (boolean? x) (if x "true" "false")
      (number? x) (cat x "")
    (error "Unrecognized atom")))

(define compile-body (forms :tail)
  (let (str "")
    (each (x :i) forms
      (let (t? (and tail (= i (- (length forms) 1))))
	(cat! str (compile x :stmt tail: t?))))
    str))

(define terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt? tail?)
  (let ((:special :stmt tr: self-tr?) (getenv (hd form)))
    (if (and (not stmt?) stmt)
        (compile `((%function () ,form)) tail: tail?)
      (let (tr (terminator (and stmt? (not self-tr?))))
        (cat (special (tl form) tail?) tr)))))

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
    (each (arg :i) args
      (if (and (= op '-) (= (length args) 1))
          (cat! str op (compile arg))
        (do (cat! str (compile arg))
            (if (< i (- (length args) 1))
                (cat! str " " op " ")))))
    (cat str ")")))

(define compile-branch (condition body first? last? tail?)
  (let (cond1 (compile condition)
        body (with-indent (compile body :stmt tail: tail?))
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
        body (with-indent (compile-body body :tail :tail?))
        ind (indentation)
        tr (if (= target 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}" tr)
      (cat prefix "function " id args "\n" body ind tr))))

(define can-return? (form)
  (or (not (special-form? form))
      (not (get (getenv (hd form)) 'stmt))))

(set compile
  (fn (form :stmt :tail)
    (if (and tail (can-return? form))
        (set form `(return ,form)))
    (if (nil? form) ""
        (special-form? form)
        (compile-special form stmt tail)
      (let (tr (terminator stmt)
            ind (if stmt (indentation) "")
            form (if (atom? form) (compile-atom form)
                     (infix? form) (compile-infix form)
                   (compile-call form)))
        (cat ind form tr)))))

;; modules

(define* current-module nil)

(define module-path (spec)
  (cat (module-key spec) ".l"))

(define encapsulate (body)
  (let (body (macroexpand body)
        epilog (macroexpand (exported)))
    `((%function () ,@body ,epilog))))

(define compile-file (file)
  (let (str (read-file file)
        body (read-all (make-stream str))
        form (encapsulate body))
    (cat (compile form) ";\n")))

(target js: (define run global.eval))

(target lua:
 (do (define* %result nil)
     (define run (x)
       (let (f (load (cat (compile '%result) '= x)))
         (if f (do (f) %result)
           (let (|f,e| (load x))
             (if f (f) (error (cat e " in " x)))))))))

(define compiler-output)
(define compilation-level)

(define %compile-module (spec)
  (let (path (module-path spec)
        mod0 current-module
        env0 environment
        k (module-key spec))
    (if (number? compilation-level)
        (inc compilation-level))
    (set current-module spec)
    (set environment (initial-environment))
    (let (compiled (compile-file path)
          m (module spec)
          toplevel (hd environment))
      (set current-module mod0)
      (set environment env0)
      (each (name binding) toplevel
        (if (= binding.module k)
            (set (get m.export name) binding)))
      (if (number? compilation-level)
          (do (dec compilation-level)
              (cat! compiler-output compiled))
        (run compiled)))))

(define open-module (spec :all)
  (let (m (module spec)
        frame (last environment))
    (each (k v) m.export
      (if (or v.export all)
          (set (get frame k) v)))))

(define load-module (spec :all)
  (if (or (nil? (module spec))
          (= compilation-level 1))
      (%compile-module spec))
  (open-module spec all: all))

(define in-module (spec)
  (load-module spec :all)
  (let (m (module spec))
    (map open-module m.import))
  (set current-module spec))

(define compile-module (spec)
  (set compilation-level 0)
  (set compiler-output "")
  (load-module spec)
  compiler-output)

(define prologue ()
  (if current-module
      (let (m (module current-module))
        (join (imported current-module)
              (map (fn (x)
                     (splice (imported x)))
                   m.import)))))

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (form1 `(do ,@(prologue) ,form)
          x (compile (macroexpand form1)))
      (set target previous)
      (run x))))
