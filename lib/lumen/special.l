;; -*- mode: lisp -*-

(define-module (lumen special)
  import: ((lumen)
           (lumen lib)
           (lumen compiler))
  export: (do
           %if
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

(define-special do forms :stmt :tr
  (let (str "")
    (each (x) forms
      (cat! str (compile x :stmt)))
    str))

(define-special %if (cond cons alt) :stmt :tr
  (let (cond (compile cond)
        cons (with-indent (compile cons :stmt))
        alt (if alt (with-indent (compile alt :stmt)))
        ind (indentation)
        str "")
    (if (= target 'js)
        (cat! str ind "if (" cond ") {\n" cons ind "}")
      (cat! str ind "if " cond " then\n" cons))
    (if (and alt (= target 'js))
        (cat! str " else {\n" alt ind "}")
        alt (cat! str ind "else\n" alt))
    (if (= target 'lua) 
        (cat str ind "end\n")
      (cat str "\n"))))

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
  (let (ind (indentation)
        body (with-indent (compile form :stmt))
        e (make-id)
        hf `(return (%array false (get ,e "message")))
        h (with-indent (compile hf :stmt)))
    (cat ind "try {\n" body ind "}\n"
         ind "catch (" e ") {\n" h ind "}\n")))

(define-special break () :stmt
  (cat (indentation) "break"))

(define-special %function (args body)
  (compile-function args body))

(define-special %global-function (name args body) :stmt :tr
  (if (= target 'lua)
      (let (x (compile-function args body name: name))
        (cat (indentation) x))
    (compile `(set ,name (%function ,args ,body)) :stmt)))

(define-special %local-function (name args body) :stmt :tr
  (let (x (compile-function args body name: name prefix: "local "))
    (cat (indentation) x)))

(define-special return (x) :stmt
  (let (x (if (nil? x)
              "return"
            (cat "return(" (compile x) ")")))
    (cat (indentation) x)))

(define-special error (x) :stmt
  (let (e (if (= target 'js)
              (cat "throw new " (compile `(Error ,x)))
            (cat "error(" (compile x) ")")))
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
	str "")
    (each (x :i) forms
      (cat! str (compile x))
      (if (< i (- (length forms) 1)) (cat! str ", ")))
    (cat open str close)))

(define-special %object forms
  (let (str "{"
        sep (if (= target 'lua) " = " ": ")
        pairs (pair forms)
        n-1 (- (length pairs) 1))
    (each ((k v) :i) pairs
      (unless (string? k)
        (error (cat "Illegal key: " (string k))))
      (cat! str (key k) sep (compile v))
      (if (< i n-1) (cat! str ", ")))
    (cat str "}")))
