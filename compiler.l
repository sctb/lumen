;; -*- mode: lisp -*-

(define-module compiler
  import: (utilities runtime special core reader)
  export: (compile-body
           compile-call
           compile-branch
           compile-function
           compile-special
           compile
           eval
           define-module
           load-module
           open-module
           in-module))

(define-local infix
  (table common: (table :+ :- :% :* :/ :< :> :<= :>=)
	 js: (table =: "===" ~=: "!=" and: "&&" or: "||" cat: "+")
	 lua: (table =: "==" cat: ".." :~= :and :or)))

(define-local getop (op)
  (let (op1 (or (get infix.common op)
                (get (get infix target) op)))
    (if (= op1 true) op op1)))

(define-local infix? (form)
  (and (list? form) (is? (getop (hd form)))))

(define-local compile-args (args)
  (let (str "(")
    (across (args arg i)
      (cat! str (compile arg))
      (if (< i (- (length args) 1)) (cat! str ", ")))
    (cat str ")")))

(define-local compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) x
      (string? x) (to-id x)
      (boolean? x) (if x "true" "false")
      (number? x) (cat x "")
    (error "Unrecognized atom")))

(define compile-body (forms :tail?)
  (let (str "")
    (across (forms x i)
      (let (t? (and tail? (= i (- (length forms) 1))))
	(cat! str (compile x :stmt? tail?: t?))))
    str))

(define compile-call (form)
  (if (empty? form)
      (compile-special '(%array))       ; ()
    (let (f (hd form)
          f1 (compile f)
          args (compile-args (stash* (tl form))))
      (if (list? f) (cat "(" f1 ")" args)
          (string? f) (cat f1 args)
        (error "Invalid function call")))))

(define-local compile-infix ((op rest: args))
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
        tr (if (= target 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}" tr)
      (cat prefix "function " id args "\n" body ind tr))))

(define-local terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt? tail?)
  (let ((:special :stmt tr: self-tr?) (getenv (hd form)))
    (if (and (not stmt?) stmt)
        (compile `((%function () ,form)) tail?: tail?)
      (let (tr (terminator (and stmt? (not self-tr?))))
        (cat (special (tl form) tail?) tr)))))

(define-local can-return? (form)
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

;; eval

(target js: (define-local run eval))

(target lua:
 (do (define-global %result nil)
     (define-local run (x)
       (let (f (load (cat (compile '%result) '= x)))
         (if f (do (f) %result)
           (let (|f,e| (load x))
             (if f (f) (error (cat e " in " x)))))))))

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (str (compile (macroexpand form)))
      (set target previous)
      (run str))))

;; modules

(define-global current-module nil)

(define-local module (spec)
  (get modules (module-key spec)))

(define-local module-path (spec)
  (cat (module-key spec) ".l"))

(define-local encapsulate (body)
  (let (body (macroexpand body)
        epilog (macroexpand (exported)))
    `((%function () ,@body ,epilog))))

(define-local compile-file (file)
  (let (str (read-file file)
        body (read-all (make-stream str))
        form (encapsulate body))
    (cat (compile form) ";\n")))

(define-macro define-module (spec rest: body)
  (let (imports () (import: imp export: exp) body)
    (across ((or imp ()) k)
      (load-module k)
      (add imports (imported k)))
    (set (get modules (module-key spec))
         (table import: imp export: (table)))
    (across ((or exp ()) k)
      (setenv k :export))
    `(do ,@imports)))

(define-local compiler-output nil)
(define-local compilation-level nil)

(define compile-module (spec)
  (set compilation-level 0)
  (set compiler-output "")
  (load-module spec)
  compiler-output)

(define-local %compile-module (spec)
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
      (each (toplevel name binding)
        (if (and binding.export
                 (= binding.module k))
            (set (get m.export name) binding)))
      (if (number? compilation-level)
          (do (dec compilation-level)
              (cat! compiler-output compiled))
        (run compiled)))))

(define load-module (spec)
  (if (or (nil? (module spec))
          (= compilation-level 1))
      (%compile-module spec))
  (open-module spec))

(define open-module (spec)
  (let (m (module spec)
        frame (last environment))
    (each (m.export k v)
      (set (get frame k) v))))

(define in-module (spec)
  (load-module spec)
  (let (m (module spec))
    (map open-module m.import)))
