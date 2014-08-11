;; -*- mode: lisp -*-

(define-module (lumen runtime)
  import: ((lumen special) (lumen core))
  export: (nil?
           is?
           length
           none?
           some?
           one?
           hd
           string?
           number?
           boolean?
           function?
           composite?
           atom?
           table?
           list?
           hd=
           substring
           sub
           keys
           inner
           tl
           char
           code
           string-literal?
           id-literal?
           add
           drop
           last
           butlast
           reverse
           join
           reduce
           keep
           in?
           find
           pair
           sort
           iterate
           replicate
           series
           map
           keys?
           empty?
           stash
           unstash
           search
           split
           cat
           + - * / %
           > < = >= <=
           read-file
           write-file
           write
           exit
           today
           now
           number
           string
           space
           apply
           unique
           %message-handler
           toplevel?
           module-key
           module
           setenv))

(define nil? (x)
  (target
    js: (or (= x nil) (= x null))
    lua: (= x nil)))

(define is? (x) (not (nil? x)))

(define length (x)
  (target js: (or x.length 0) lua: |#x|))

(define none? (x) (= (length x) 0))
(define some? (x) (> (length x) 0))
(define one? (x) (= (length x) 1))

(define hd (l) (at l 0))

(target js: (define type (x) (typeof x)))

(define string? (x) (= (type x) 'string))
(define number? (x) (= (type x) 'number))
(define boolean? (x) (= (type x) 'boolean))
(define function? (x) (= (type x) 'function))

(define composite? (x)
  (and (is? x)
       (= (type x) (target js: 'object lua: 'table))))

(define atom? (x) (or (nil? x) (not (composite? x))))
(define table? (x) (and (composite? x) (nil? (hd x))))
(define list? (x) (and (composite? x) (is? (hd x))))

(define hd= (l x)
  (and (list? l) (= (hd l) x)))

(define substring (s from upto)
  (target js: (s.substring from upto)
          lua: (string.sub s (+ from 1) upto)))

(define sub (x from upto)
  (if (string? x)
      (substring x (or from 0) upto)
    (let (l () j 0
          i (if (or (nil? from) (< from 0)) 0 from)
          n (length x)
          upto (if (or (nil? upto) (> upto n)) n upto))
      (while (< i upto)
        (set (at l j) (at x i))
        (inc i)
        (inc j))
      (all (k v) x
        (unless (number? k)
          (set (get l k) v)))
      l)))

(define keys (x)
  (let (t ())
    (all (k v) x
      (unless (number? k)
        (set (get t k) v)))
    t))

(define inner (x)
  (sub x 1 (- (length x) 1)))

(define tl (l) (sub l 1))

(define char (s n)
  (target js: (s.charAt n) lua: (sub s n (+ n 1))))

(define code (s n)
  (target
    js: (s.charCodeAt n)
    lua: (string.byte s (if n (+ n 1)))))

(define string-literal? (x)
  (and (string? x) (= (char x 0) "\"")))

(define id-literal? (x)
  (and (string? x) (= (char x 0) "|")))

(define add (l x)
  (target js: (do (l.push x) nil) lua: (table.insert l x)))

(define drop (l)
  (target js: (l.pop) lua: (table.remove l)))

(define last (l)
  (at l (- (length l) 1)))

(define butlast (l)
  (sub l 0 (- (length l) 1)))

(define reverse (l)
  (let (l1 (keys l)
        i (- (length l) 1))
    (while (>= i 0)
      (add l1 (at l i))
      (dec i))
    l1))

(define join (a b)
  (if (and a b)
      (let (c () o (length a))
        (all (k v) a
          (set (get c k) v))
        (all (k v) b
          (when (number? k)
            (inc k o))
          (set (get c k) v))
        c)
    (or a b ())))

(define reduce (f x)
  (if (none? x) x
      (one? x) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define shift (k n)
  (if (number? k) (- k n) k))

(define keep (f x)
  (let (t () o 0)
    (all (k v) x
      (if (f v)
          (set (get t (shift k o)) v)
        (inc o)))
    t))

(define in? (x t)
  (all (_ y) t
    (when (= x y) (return true))))

(define find (f t)
  (all (_ x) t
    (let (x (f x))
      (if x (return x)))))

(define pair (l)
  (let (i 0 l1 ())
    (while (< i (length l))
      (add l1 (list (at l i) (at l (+ i 1))))
      (inc i 2))
    l1))

(define sort (l f)
  (target
    lua: (do (table.sort l f) l)
    js: (l.sort (when f (fn (a b) (if (f a b) -1 1))))))

(define iterate (f count)
  (let (i 0)
    (while (< i count)
      (f i)
      (inc i))))

(define replicate (n x)
  (let (l ())
    (iterate (fn () (add l x)) n)
    l))

(define series (f l)
  (iterate (fn (i) (f (at l i))) (length l)))

(define map (f x)
  (let (t () o 0)
    (all (k v) x
      (let (y (f v))
        (if (is? y)
            (set (get t (shift k o)) y)
          (inc o))))
    t))

(define keys? (t)
  (let (b false)
    (all (k _) t
      (unless (number? k)
        (set b true)
        (break)))
    b))

(define empty? (t)
  (let (b true)
    (all (_ _) t
      (set b false)
      (break))
    b))

(define stash (args)
  (when (keys? args)
    (let (p ())
      (all (k v) args
        (unless (number? k)
          (set (get p k) v)))
      (set (get p '_stash) true)
      (add args p)))
  args)

(define unstash (args)
  (if (none? args) ()
    (let (l (last args))
      (if (and (table? l) l._stash)
          (let (args1 (butlast args))
            (all (k v) l
              (unless (= k '_stash)
                (set (get args1 k) v)))
            args1)
        args))))

(define search (s pattern start)
  (target
    js: (let (i (s.indexOf pattern start))
          (if (>= i 0) i))
    lua: (let (start (if start (+ start 1))
               i (string.find s pattern start true))
           (and i (- i 1)))))

(define split (s sep)
  (if (or (= s "") (= sep "")) ()
    (let (l ())
      (while true
        (let (i (search s sep))
          (if (nil? i) (break)
            (do (add l (sub s 0 i))
                (set s (sub s (+ i 1)))))))
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

(target js: (define-global require require))
(target js: (define fs (require 'fs)))

(define read-file (path)
  (target
    js: (fs.readFileSync path 'utf8)
    lua: (let (f (io.open path))
	   (f.read f '*a))))

(define write-file (path data)
  (target
    js: (fs.writeFileSync path data 'utf8)
    lua: (let (f (io.open path 'w))
           (f.write f data))))

(target js: (define-global print (x) (console.log x)))

(define write (x)
  (target js: (process.stdout.write x) lua: (io.write x)))

(define exit (code)
  (target js: (process.exit code) lua: (os.exit code)))

(define today ()
  (target
    js: (let (pad (fn (n)
                    (if (< n 10)
                        (cat "0" n)
                      (string n)))
              now (|new Date|))
          (cat (pad (now.getUTCFullYear)) "-"
               (pad (+ (now.getUTCMonth) 1)) "-"
               (pad (now.getUTCDate))))
    lua: (os.date "!%F")))

(define now ()
  (target
    js: (Math.floor (/ ((get (|new Date|) 'getTime)) 1000))
    lua: (os.time)))

(define number (s)
  (target
    js: (let (n (parseFloat s))
          (unless (isNaN n) n))
    lua: (tonumber s)))

(define string (x depth)
  (if (and depth (> depth 5)) "#<circular>"
      (nil? x) "nil"
      (boolean? x) (if x "true" "false")
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (s "(" sp ""
          xs () ks ()
          d (+ (or depth 0) 1))
      (all (k v) x
        (if (number? k)
            (set (get xs k) (string v d))
          (do (add ks (cat k ":"))
              (add ks (string v d)))))
      (all (_ v) (join xs ks)
        (cat! s sp v)
        (set sp " "))
      (cat s  ")"))))

(define space (xs)
  (define string (x)
    (if (or (string-literal? x) (hd= x 'cat))
        x
      `(string ,x)))
  (if (one? xs) (string (hd xs))
    (reduce (fn (a b)
              `(cat ,(string a) " " ,(string b)))
            xs)))

(define apply (f args)
  (let (args (stash args))
    (target js: (f.apply f args) lua: (f (unpack args)))))

(define id-count 0)

(define unique ()
  (inc id-count)
  (cat "_u" id-count))

(define %message-handler (msg)
  (let (i (search msg ": "))
    (sub msg (+ i 2))))

(define toplevel? ()
  (one? environment))

(define module-key (spec)
  (if (atom? spec) (string spec)
    (reduce (fn (a b)
              (cat (module-key a) "/" (module-key b)))
            spec)))

(define module (spec)
  (get modules (module-key spec)))

(define setenv (k rest: keys)
  (when (string? k)
    (let (frame (last environment)
          x (or (get frame k) (table)))
      (all (k v) keys
        (set (get x k) v))
      (when (toplevel?)
        (let (m (module current-module))
          (set (get m.export k) x)))
      (set (get frame k) x))))
