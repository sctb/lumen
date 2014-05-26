;; -*- mode: lisp -*-

(define-module special
  import: (core compiler special utilities)
  export: (do
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
      (let (x (compile-function args body name: name))
        (cat (indentation) x))
    (compile `(set ,name (%function ,args ,@body)) :stmt?)))

(define-special %local-function
    ((name args rest: body)) :stmt :tr
  (let (x (compile-function args body name: name prefix: "local "))
    (cat (indentation) x)))

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
