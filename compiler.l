;; -*- mode: lisp -*-

(define-module compiler
  import: (runtime utilities special core reader)
  export: (compile-function
           compile
           open-module
           load-module
           in-module
           compile-module
           eval))

(define infix
  `((not: (js: ! lua: ,"not "))
    (:* :/ :%)
    (:+ :-)
    (cat: (js: + lua: ,".."))
    (:< :> :<= :>=)
    (=: (js: === lua: ==) ~=: (js: != lua: ~=))
    (and: (js: && lua: and))
    (or: (js: ,"||" lua: or))))

(define unary? (form)
  (let ((op rest: args) form)
    (and (= (length args) 1) (in? op '(not -)))))

(define precedence (form)
  (when (and (list? form) (not (unary? form)))
    (each (level :i) infix
      (if (get level (hd form)) (return i))))
  0)

(define getop (op)
  (find (fn (level)
          (let (x (get level op))
            (if (= x true) op
                (is? x) (get x target))))
        infix))

(define infix? (x)
  (is? (getop x)))

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

(define terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define compile-special (form stmt?)
  (let ((x rest: args) form
        (:special :stmt tr: self-tr?) (getenv x)
        tr (terminator (and stmt? (not self-tr?))))
    (cat (apply special args) tr)))

(define compile-call (form)
  (if (none? form)
      (compile-special '(%array))       ; ()
    (let (f (hd form)
          f1 (compile f)
          args (compile-args (stash* (tl form))))
      (if (list? f) (cat "(" f1 ")" args)
          (string? f) (cat f1 args)
        (error "Invalid function call")))))

(define op-delims (parent p)
  (if (> p (precedence parent))
      (list "(" ")")
    (list "" "")))

(define compile-infix (form)
  (let ((op rest: (a b)) form
        (ao ac) (op-delims form (precedence a))
        ;; left-associativity for binary operators
        (bo bc) (op-delims form (+ (precedence b) 1))
        a (compile a)
        b (compile b)
        op (getop op))
    (if (unary? form)
        (cat op ao a ac)
      (cat ao a ac " " op " " bo b bc))))

(define compile-function (args body :name :prefix)
  (let (id (if name (compile name) "")
        prefix (or prefix "")
        args (compile-args args)
        body (with-indent (compile body :stmt))
        ind (indentation)
        tr (if (= target 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}" tr)
      (cat prefix "function " id args "\n" body ind tr))))

(define can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) 'return))
                (not (statement? (hd form)))))))

(set compile
  (fn (form :stmt)
    (if (nil? form) ""
        (special-form? form)
        (compile-special form stmt)
      (let (tr (terminator stmt)
            ind (if stmt (indentation) "")
            form (if (atom? form) (compile-atom form)
                     (infix? (hd form)) (compile-infix form)
                   (compile-call form)))
        (cat ind form tr)))))

(define lower)

(define lower-statement (form tail?)
  (let (hoist ()
        e (lower form hoist true tail?))
    (if (and (some? hoist) (is? e))
        `(do ,@hoist ,e)
        (is? e) e
        (> (length hoist) 1) `(do ,@hoist)
      (hd hoist))))

(define lower-body (body tail?)
  (lower-statement `(do ,@body) tail?))

(define lower-do (args hoist stmt? tail?)
  (each (x) (sub args 0 (- (length args) 1))
    (add hoist (lower x hoist stmt?)))
  (let (e (lower (last args) hoist stmt? tail?))
    (if (and tail? (can-return? e))
        `(return ,e)
      e)))

(define lower-if (args hoist stmt? tail?)
  (let ((cond then else) args)
    (if (or stmt? tail?)
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower-body (list then) tail?)
                   ,@(if else (list (lower-body (list else) tail?)))))
      (let (e (make-id))
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
        (let (id (make-id))
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
  (let (form (map (fn (x) (lower x hoist)) form))
    (if (some? form) form)))

(define lower-infix? (form)
  (and (infix? (hd form)) (> (length form) 3)))

(define lower-infix (form hoist)
  (let ((x rest: args) form)
    (lower (reduce (fn (a b)
                     (list x b a))
                   (reverse args))
           hoist)))

(define lower-special (form hoist)
  (let (e (lower-call form hoist))
    (if e (add hoist e))))

(set lower
  (fn (form hoist stmt? tail?)
    (if (atom? form) form
        (empty? form) '(%array)
        (nil? hoist) (lower-statement form)
        (lower-infix? form) (lower-infix form hoist)
       (let ((x rest: args) form)
         (if (= x 'do) (lower-do args hoist stmt? tail?)
             (= x '%if) (lower-if args hoist stmt? tail?)
             (= x '%try) (lower-try args hoist tail?)
             (= x 'while) (lower-while args hoist)
             (= x '%for) (lower-for args hoist)
             (= x '%function) (lower-function args)
             (in? x '(%local-function %global-function))
             (lower-definition x args hoist)
             (in? x '(and or))
             (lower-short x args hoist)
             (statement? x) (lower-special form hoist)
           (lower-call form hoist))))))

(define* lower lower)

(define process (form)
  (lower (macroexpand form)))

;; modules

(define* current-module nil)

(define module-path (spec)
  (cat (module-key spec) ".l"))

(define encapsulate (body)
  (let (body (map process body)
        epilog (map process (exported)))
    `((%function () (do ,@body ,@epilog)))))

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

(define compiling? false)
(define compiler-output "")

(define %compile-module (spec)
  (let (path (module-path spec)
        mod0 current-module
        env0 environment)
    (set current-module spec)
    (set environment (initial-environment))
    (let (compiled (compile-file path))
      (set current-module mod0)
      (set environment env0)
      (if compiling?
          (cat! compiler-output compiled)
        (run compiled)))))

(define open-module (spec :all)
  (let (m (module spec)
        frame (last environment))
    (each (k v) m.export
      (when (or v.export all)
        (set (get frame k) v)))))

(define load-module (spec :all)
  (unless (module spec)
    (%compile-module spec))
  (open-module spec all: all))

(define in-module (spec)
  (load-module spec :all)
  (let (m (module spec))
    (map open-module m.import))
  (set current-module spec))

(define compile-module (spec)
  (set compiling? true)
  (%compile-module spec)
  compiler-output)

(define prologue ()
  (join (imported current-module :all)
        (let (m (module current-module))
          (map (fn (x)
                 (splice (imported x)))
               m.import))))

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (form `((%function () ,@(prologue) ,form)))
      (let (compiled (compile (process form)))
        (set target previous)
        (run compiled)))))
