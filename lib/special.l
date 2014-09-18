;; -*- mode: lisp -*-

(define-special do forms :stmt :tr
  (let (s "")
    (series (fn (x)
              (cat! s (compile x :stmt)))
            forms)
    s))

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
  (let (ind (indentation)
        body (with-indent (compile form :stmt))
        e (unique)
        hf `(return (%array false (get ,e "message")))
        h (with-indent (compile hf :stmt)))
    (cat ind "try {\n" body ind "}\n"
         ind "catch (" e ") {\n" h ind "}\n")))

(define-special %delete (place) :stmt
  (cat (indentation) "delete " (compile place)))

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
  (if (= target 'lua)
      (let (x (compile-function args body name: name prefix: 'local))
        (cat (indentation) x))
    (compile `(%local ,name (%function ,args ,body)) :stmt)))

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
	s "" c "")
    (all (k v) forms
      (when (number? k)
        (cat! s c (compile v))
        (set c ", ")))
    (cat open s close)))

(define-special %object forms
  (let (s "{" c ""
        sep (if (= target 'lua) " = " ": "))
    (all (k v) (pair forms)
      (when (number? k)
        (let ((k v) v)
          (unless (string? k)
            (error (cat "Illegal key: " (string k))))
          (cat! s c (key k) sep (compile v))
          (set c ", "))))
    (cat s "}")))
