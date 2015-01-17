;; -*- mode: lisp -*-

(define environment (list (obj)))
(define target (language))

(define nil? (x)
  (target
    js: (or (= x nil) (= x null))
    lua: (= x nil)))

(define is? (x) (not (nil? x)))

(define # (x)
  (target js: (or x.length 0) lua: |#x|))

(define none? (x) (= (# x) 0))
(define some? (x) (> (# x) 0))
(define one? (x) (= (# x) 1))

(define hd (l) (at l 0))

(target js: (define type (x) (typeof x)))

(define string? (x) (= (type x) 'string))
(define number? (x) (= (type x) 'number))
(define boolean? (x) (= (type x) 'boolean))
(define function? (x) (= (type x) 'function))

(define obj? (x)
  (and (is? x) (= (type x) (target js: 'object lua: 'table))))

(define atom? (x)
  (or (nil? x) (not (obj? x))))

(define nan? (n)
  (not (= n n)))

(define inf? (n)
  (or (= n #+inf) (= n #-inf)))

(target lua: (define strlib string))

(define clip (s from upto)
  (target js: (s.substring from upto)
          lua: (strlib.sub s (+ from 1) upto)))

(define cut (x from upto)
  (let (l () j 0
        i (if (or (nil? from) (< from 0)) 0 from)
        n (# x)
        upto (if (or (nil? upto) (> upto n)) n upto))
    (while (< i upto)
      (set (at l j) (at x i))
      (inc i)
      (inc j))
    (each (k v) x
      (unless (number? k)
        (set (get l k) v)))
    l))

(define keys (x)
  (let (t ())
    (each (k v) x
      (unless (number? k)
        (set (get t k) v)))
    t))

(define edge (x)
  (- (# x) 1))

(define inner (x)
  (clip x 1 (edge x)))

(define tl (l) (cut l 1))

(define char (s n)
  (target js: (s.charAt n) lua: (clip s n (+ n 1))))

(define code (s n)
  (target
    js: (s.charCodeAt n)
    lua: (strlib.byte s (if n (+ n 1)))))

(define string-literal? (x)
  (and (string? x) (= (char x 0) "\"")))

(define id-literal? (x)
  (and (string? x) (= (char x 0) "|")))

(define add (l x)
  (target js: (do (l.push x) nil) lua: (table.insert l x)))

(define drop (l)
  (target js: (l.pop) lua: (table.remove l)))

(define last (l)
  (at l (edge l)))

(define butlast (l)
  (cut l 0 (edge l)))

(define reverse (l)
  (let (l1 (keys l) i (edge l))
    (while (>= i 0)
      (add l1 (at l i))
      (dec i))
    l1))

(define join (a b)
  (if (and a b)
      (let (c () o (# a))
        (each (k v) a
          (set (get c k) v))
        (each (k v) b
          (when (number? k)
            (inc k o))
          (set (get c k) v))
        c)
    (or a b ())))

(define reduce (f x)
  (if (none? x) x
      (one? x) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define find (f t)
  (each (_ x) t
    (let (x (f x))
      (if x (return x)))))

(define first (f l)
  (let (n (# l))
    (for (i n)
      (let (x (f (at l i)))
        (if x (return x))))))

(define in? (x t)
  (find (fn (y) (= x y)) t))

(define pair (l)
  (let (i 0 l1 ())
    (while (< i (# l))
      (add l1 (list (at l i) (at l (+ i 1))))
      (inc i 2))
    l1))

(define sort (l f)
  (target
    lua: (do (table.sort l f) l)
    js: (l.sort (when f (fn (a b) (if (f a b) -1 1))))))

(define replicate (n x)
  (let (l ())
    (for (_ n) (add l x))
    l))

(define step (f l)
  (for (i (# l))
    (f (at l i))))

(define map (f x)
  (let (t () n (# x))
    (for (i n)
      (let (y (f (at x i)))
        (when (is? y)
          (add t y))))
    (each (k v) x
      (unless (number? k)
        (let (y (f v))
          (when (is? y)
            (set (get t k) y)))))
    t))

(define keep (f x)
  (map (fn (v) (when (f v) v)) x))

(define keys? (t)
  (each (k _) t
    (unless (number? k)
      (return #t)))
  #f)

(define empty? (t)
  (each (_ _) t
    (return #f))
  #t)

(define stash (args)
  (when (keys? args)
    (let (p ())
      (each (k v) args
        (unless (number? k)
          (set (get p k) v)))
      (set (get p '_stash) #t)
      (add args p)))
  args)

(define unstash (args)
  (if (none? args) ()
    (let (l (last args))
      (if (and (obj? l) l._stash)
          (let (args1 (butlast args))
            (each (k v) l
              (unless (= k '_stash)
                (set (get args1 k) v)))
            args1)
        args))))

(define search (s pattern start)
  (target
    js: (let (i (s.indexOf pattern start))
          (if (>= i 0) i))
    lua: (let (start (if start (+ start 1))
               i (strlib.find s pattern start #t))
           (and i (- i 1)))))

(define split (s sep)
  (if (or (= s "") (= sep "")) ()
    (let (l ())
      (while #t
        (let (i (search s sep))
          (if (nil? i) (break)
            (do (add l (clip s 0 i))
                (set s (clip s (+ i 1)))))))
      (add l s)
      l)))

(define cat xs
  (if (none? xs) ""
    (reduce (fn (a b) (cat a b)) xs)))

(define + xs
  (reduce (fn (a b) (+ a b)) xs))

(define - xs
  (reduce (fn (b a) (- a b)) (reverse xs)))

(define * xs
  (reduce (fn (a b) (* a b)) xs))

(define / xs
  (reduce (fn (b a) (/ a b)) (reverse xs)))

(define % xs
  (reduce (fn (b a) (% a b)) (reverse xs)))

(define > (a b) (> a b))
(define < (a b) (< a b))
(define = (a b) (= a b))
(define >= (a b) (>= a b))
(define <= (a b) (<= a b))

(define number (s)
  (target
    js: (let (n (parseFloat s))
          (unless (isNaN n) n))
    lua: (tonumber s)))

(define number-code? (n)
  (and (> n 47) (< n 58)))

(define numeric? (s)
  (let (n (# s))
    (for (i n)
      (unless (number-code? (code s i))
        (return #f))))
  #t)

(define string (x depth)
  (if (and depth (> depth 7)) "#<circular>"
      (nil? x) "nil"
      (nan? x) "#nan"
      (= x #+inf) "#+inf"
      (= x #-inf) "#-inf"
      (boolean? x) (if x "#t" "#f")
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (s "(" sp ""
          xs () ks ()
          d (+ (or depth 0) 1))
      (each (k v) x
        (if (number? k)
            (set (get xs k) (string v d))
          (do (add ks (cat k ":"))
              (add ks (string v d)))))
      (each (_ v) (join xs ks)
        (cat! s sp v)
        (set sp " "))
      (cat s  ")"))))

(define-local produces-string? (x)
  (or (string-literal? x)
      (and (obj? x)
           (or (= (hd x) 'cat)
               (= (hd x) 'string)))))

(define space (xs)
  (let (string (fn (x) (if (produces-string? x) x `(string ,x))))
    (if (one? xs) (string (hd xs))
      (reduce (fn (a b)
                `(cat ,(string a) " " ,(string b)))
              xs))))

(define apply (f args)
  (let (args (stash args))
    (target js: (f.apply f args) lua: (f (unpack args)))))

(let (count 0)
  (define unique ()
    (inc count)
    (cat "_u" count)))

(define unique? (id)
  (= "_u" (clip id 0 2)))

(define %message-handler (msg)
  (let (i (search msg ": "))
    (clip msg (+ i 2))))

(define toplevel? ()
  (one? environment))

(define setenv (k rest: keys)
  (when (string? k)
    (let (frame (if keys.toplevel
                    (hd environment)
                  (last environment))
          entry (or (get frame k) (obj)))
      (each (k v) keys
        (set (get entry k) v))
      (set (get frame k) entry))))
