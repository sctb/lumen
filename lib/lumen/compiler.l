;; -*- mode: lisp -*-

(define-module (lumen compiler)
  import: ((lumen)
           (lumen lib)
           (lumen reader))
  export: (compile-function
           compile
           open-module
           load-module
           in-module
           import-modules
           compile-module
           declare
           eval))

(define infix
  `((not: (js: ! lua: ,"not "))
    (:* :/ :%)
    (:+ :-)
    (cat: (js: + lua: ,".."))
    (:< :> :<= :>=)
    (=: (js: === lua: ==))
    (and: (js: && lua: and))
    (or: (js: ,"||" lua: or))))

(define unary? (form)
  (and (= (length form) 2) (in? (hd form) '(not -))))

(define precedence (form)
  (when (and (list? form) (not (unary? form)))
    (all (k v) infix
      (if (get v (hd form)) (return (index k)))))
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
  (let (s "(" c "")
    (series (fn (x)
              (cat! s c (compile x))
              (set c ", "))
            args)
    (cat s ")")))

(define compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) x
      (string? x) (id x)
      (boolean? x) (if x "true" "false")
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
  (or (hd= x '%function)
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

(redefine compile (form :stmt)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

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
  (series (fn (x)
            (add hoist (lower x hoist stmt?)))
          (butlast args))
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
      (let (e (unique))
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
        (let (id (unique))
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

(redefine lower (form hoist stmt? tail?)
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
        (lower-call form hoist)))))

(define process (form)
  (lower (macroexpand form)))

(define-global current-module)

(define module-path (spec)
  (cat (module-key spec) ".l"))

(define encapsulate (body)
  `((%function () ,(process `(do ,@body)))))

(define run (code)
  (target
    js: (global.eval code)
    lua: (let (|f,e| (load code))
           (if f (f) (error (cat e " in " code))))))

(define compiling? false)
(define compiler-output "")

(define conclude (code)
  (if compiling?
      (cat! compiler-output code)
    (run code)))

(define in-module)

(define %compile-module (spec)
  (let (path (module-path spec)
        mod0 current-module
        env0 environment)
    (set environment (initial-environment))
    (let (s (make-stream (read-file path))
          first (read s))
      (unless (hd= first 'define-module)
        (set current-module 'user)
        (in-module 'user))
      (let (body (join (list first) (read-all s))
            form (encapsulate body)
            code (cat (compile form) ";\n")
            spec current-module)
        (set current-module mod0)
        (set environment env0)
        (conclude code)
        spec))))

(define open-module (spec :private)
  (let (m (module spec)
        frame (last environment))
    (all (k v) m.export
      (when (or v.export private)
        (set (get frame k) v)))))

(define load-module (spec :private)
  (unless (module spec)
    (set spec (%compile-module spec)))
  (open-module spec private: private)
  spec)

(redefine in-module (spec)
  (let (spec (load-module spec :private)
        m (module spec))
    (series open-module m.import)
    (set current-module spec)))

(define import-modules (specs)
  (let (imports () bindings ())
    (series
     (fn (spec)
       (load-module spec)
       (let (m (module spec))
         (if m.alias
             (let ((aliased bs) (import-modules m.alias))
               (join! imports aliased)
               (join! bindings bs))
           (let (bs (imported spec))
             (add imports spec)
             (join! bindings bs)))))
     (or specs ()))
    (list imports bindings)))

(define compile-module (spec)
  (set compiling? true)
  (%compile-module spec)
  compiler-output)

(define declare (form)
  (conclude (compile (process form) :stmt)))

(define context ()
  (let (imports () m (module current-module))
    (series (fn (spec)
              (join! imports (imported spec)))
            m.import)
    (join imports (imported current-module :private))))

(define-global %result)

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (body `(,@(context) (set %result ,form))
          code (compile (encapsulate body)))
      (set target previous)
      (run code)
      %result)))
