;; -*- mode: lisp -*-

(define-local infix
  `((not: (js: ! lua: ,"not "))
    (:* :/ :%)
    (:+ :-)
    (cat: (js: + lua: ,".."))
    (:< :> :<= :>=)
    (=: (js: === lua: ==))
    (and: (js: && lua: and))
    (or: (js: ,"||" lua: or))))

(define-local unary? (form)
  (and (= (length form) 2) (in? (hd form) '(not -))))

(define-local index (k)
  (target js: k lua: (when (number? k) (- k 1))))

(define-local precedence (form)
  (when (and (list? form) (not (unary? form)))
    (all (k v) infix
      (if (get v (hd form)) (return (index k)))))
  0)

(define-local getop (op)
  (find (fn (level)
          (let (x (get level op))
            (if (= x #t) op
                (is? x) (get x target))))
        infix))

(define-local infix? (x)
  (is? (getop x)))

(define-local compile-args (args)
  (let (s "(" c "")
    (series (fn (x)
              (cat! s c (compile x))
              (set c ", "))
            args)
    (cat s ")")))

(define-local escape-newlines (s)
  (let (s1 "" i 0)
    (while (< i (length s))
      (let (c (char s i))
        (cat! s1 (if (= c "\n") "\\n" c)))
      (inc i))
    (cat s1 "")))

(define-local id (id)
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

(define-local compile-atom (x)
  (if (and (= x "nil") (= target 'lua)) x
      (= x "nil") "undefined"
      (id-literal? x) (inner x)
      (string-literal? x) (escape-newlines x)
      (string? x) (id x)
      (boolean? x) (if x "true" "false")
      (number? x) (cat x "")
    (error (cat "Cannot compile atom: " (string x)))))

(define-local terminator (stmt?)
  (if (not stmt?) ""
      (= target 'js) ";\n"
    "\n"))

(define-local compile-special (form stmt?)
  (let ((x rest: args) form
        (:special :stmt tr: self-tr?) (getenv x)
        tr (terminator (and stmt? (not self-tr?))))
    (cat (apply special args) tr)))

(define-local parenthesize-call? (x)
  (or (and (list? x) (= (hd x) '%function))
      (> (precedence x) 0)))

(define-local compile-call (form)
  (let (f (hd form)
        f1 (compile f)
        args (compile-args (stash* (tl form))))
    (if (parenthesize-call? f)
        (cat "(" f1 ")" args)
      (cat f1 args))))

(define-local op-delims (parent child :right)
  (if ((if right >= >)
       (precedence child)
       (precedence parent))
      (list "(" ")")
    (list "" "")))

(define-local compile-infix (form)
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
        args (compile-args args)
        body (with-indent (compile body :stmt))
        ind (indentation)
        p (if prefix (cat prefix " ") "")
        tr (if (= target 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (= target 'js)
        (cat "function " id args " {\n" body ind "}" tr)
      (cat p "function " id args "\n" body ind tr))))

(define-local can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) 'return))
                (not (statement? (hd form)))))))

(define compile (form :stmt)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

(define-local lower-statement (form tail?)
  (let (hoist ()
        e (lower form hoist #t tail?))
    (if (and (some? hoist) (is? e))
        `(do ,@hoist ,e)
        (is? e) e
        (> (length hoist) 1) `(do ,@hoist)
      (hd hoist))))

(define-local lower-body (body tail?)
  (lower-statement `(do ,@body) tail?))

(define-local lower-do (args hoist stmt? tail?)
  (series (fn (x)
            (add hoist (lower x hoist stmt?)))
          (butlast args))
  (let (e (lower (last args) hoist stmt? tail?))
    (if (and tail? (can-return? e))
        `(return ,e)
      e)))

(define-local lower-if (args hoist stmt? tail?)
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

(define-local lower-short (x args hoist)
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

(define-local lower-try (args hoist tail?)
  (add hoist `(%try ,(lower-body args tail?))))

(define-local lower-while (args hoist)
  (let ((c rest: body) args)
    (add hoist
         `(while ,(lower c hoist)
            ,(lower-body body)))))

(define-local lower-for (args hoist)
  (let ((t k rest: body) args)
    (add hoist
         `(%for ,(lower t hoist) ,k
            ,(lower-body body)))))

(define-local lower-function (args)
  (let ((a rest: body) args)
    `(%function ,a ,(lower-body body #t))))

(define-local lower-definition (kind args hoist)
  (let ((name args rest: body) args)
    (add hoist `(,kind ,name ,args ,(lower-body body #t)))))

(define-local lower-call (form hoist)
  (let (form (map (fn (x) (lower x hoist)) form))
    (if (some? form) form)))

(define-local lower-infix? (form)
  (and (infix? (hd form)) (> (length form) 3)))

(define-local lower-infix (form hoist)
  (let ((x rest: args) form)
    (lower (reduce (fn (a b)
                     (list x b a))
                   (reverse args))
           hoist)))

(define-local lower-special (form hoist)
  (let (e (lower-call form hoist))
    (if e (add hoist e))))

(define lower (form hoist stmt? tail?)
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
          (or (= x '%local-function)
              (= x '%global-function))
          (lower-definition x args hoist)
          (in? x '(and or))
          (lower-short x args hoist)
          (statement? x) (lower-special form hoist)
        (lower-call form hoist)))))

(define-local expand (form)
  (lower (macroexpand form)))

(target js: (set global.require require))
(target js: (define-local run eval))

(target lua: (define-local load1 load))
(target lua:
  (define-local run (code)
    (let (|f,e| (load1 code))
      (if f (f) (error (cat e " in " code))))))

(define %result)

(define eval (form)
  (let (previous target)
    (set target (language))
    (let (code (compile (expand `(set %result ,form))))
      (set target previous)
      (run code)
      %result)))

(define run-file (path)
  (run (read-file path)))

(define compile-file (path)
  (let (s (stream (read-file path))
        body (read-all s)
        form (expand `(do ,@body)))
    (compile form)))

(define load (path)
  (run (compile-file path)))
