;; -*- mode: lisp -*-

(define-module (lumen runtime)
  import: ((lumen special) (lumen core))
  export: (nil?
           is?
           max
           min
           abs
           acos
           asin
           atan
           atan2
           ceil
           cos
           floor
           log
           log10
           max
           min
           pow
           random
           sin
           sinh
           sqrt
           tan
           tanh
           length
           none?
           some?
           one?
           in?
           hd
           sd
           td
           string?
           number?
           boolean?
           function?
           composite?
           atom?
           table?
           list?
           substring
           sub
           inner
           tl
           char
           code
           string-literal?
           id-literal?
           add
           drop
           last
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
           splice
           map
           flat
           flat1
           keys?
           empty?
           stash
           unstash
           extend
           exclude
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
           make-id
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

(define math (target js: Math lua: math))

(define abs math.abs)
(define acos math.acos)
(define asin math.asin)
(define atan math.atan)
(define atan2 math.atan2)
(define ceil math.ceil)
(define cos math.cos)
(define floor math.floor)
(define log math.log)
(define log10 math.log10)
(define max math.max)
(define min math.min)
(define pow math.pow)
(define random math.random)
(define sin math.sin)
(define sinh math.sinh)
(define sqrt math.sqrt)
(define tan math.tan)
(define tanh math.tanh)

(define length (x)
  (target js: (or x.length 0) lua: |#x|))

(define none? (x)
  (= (length x) 0))

(define some? (x)
  (> (length x) 0))

(define one? (x)
  (= (length x) 1))

(define in? (x l)
  (each (y) l
    (if (= x y) (return true))))

(define hd (l) (at l 0))
(define sd (l) (at l 1))

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

(define substring (str from upto)
  (target js: (str.substring from upto)
          lua: (string.sub str (+ from 1) upto)))

(define max* (x n) (if (nil? x) n (max x n)))
(define min* (x n) (if (nil? x) n (min x n)))

(define subl (l from upto)
  (let (i (max* from 0)
        upto (min* upto (length l))
        j 0 l2 ())
    (while (< i upto)
      (set (at l2 j) (at l i))
      (inc i)
      (inc j))
    l2))

(define sub (x from upto)
  (if (string? x)
      (substring x (or from 0) upto)
    (let (l (subl x from upto))
      (each (k v) x
        (set (get l k) v))
      l)))

(define inner (x)
  (sub x 1 (- (length x) 1)))

(define tl (l) (sub l 1))

(define char (str n)
  (target js: (str.charAt n) lua: (sub str n (+ n 1))))

(define code (str n)
  (target
   js: (str.charCodeAt n)
   lua: (string.byte str (if n (+ n 1)))))

(define string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(define id-literal? (x) (and (string? x) (= (char x 0) "|")))

(define add (l x)
  (target js: (do (l.push x) nil) lua: (table.insert l x)))

(define drop (l)
  (target js: (l.pop) lua: (table.remove l)))

(define last (l)
  (at l (- (length l) 1)))

(define reverse (l)
  (let (l1 (sub l (length l))
        i (- (length l) 1))
    (while (>= i 0)
      (add l1 (at l i))
      (dec i))
    l1))

(define join (l1 l2)
  (if (and (nil? l2) (nil? l1)) ()
      (nil? l1) (join () l2)
      (nil? l2) (join l1 ())
    (let (l () skip? false)
      (target js:
        (when (and (list? l1) (list? l2))
          (set l (l1.concat l2))
          (set skip? true)))
      (unless skip?
        (let (i 0 len (length l1))
          (while (< i len)
            (set (at l i) (at l1 i))
            (inc i))
          (while (< i (+ len (length l2)))
            (set (at l i) (at l2 (- i len)))
            (inc i))))
      (each (k v) l1
        (set (get l k) v))
      (each (k v) l2
        (set (get l k) v))
      l)))

(define reduce (f x)
  (if (none? x) x
      (one? x) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define keep (f l)
  (let (l1 ())
    (each (x) l (if (f x) (add l1 x)))
    l1))

(define in? (x xs)
  (each (y) xs
    (when (= x y) (return true))))

(define find (f l)
  (each (x) l
    (let (x (f x))
      (if x (return x)))))

(define pair (l)
  (let (i 0
        l1 ())
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

(define splice (x)
  (table _splice: true value: x))

(define splice? (x)
  (and (table? x) x._splice))

(define mapl (f l)
  (let (l1 ())
    (each (x) l
      (let (x (f x))
        (if (splice? x)
            (join! l1 x.value)
            (is? x) (add l1 x))))
    l1))

(define map (f t)
  (let (l (mapl f t))
    (each (k v) t
      (let (x (f v))
        (if (splice? x)
            (set (get l k) x.value)
            (is? x)
            (set (get l k) x))))
    l))

(define flat (x)
  (if (atom? x) x
    (map (fn (a) (if (list? a) (splice (flat a)) a)) x)))

(define flat1 (x)
  (if (atom? x) x
    (map (fn (a) (if (list? a) (splice a) a)) x)))

(define keys? (t)
  (let (k? false)
    (each (k v) t
      (set k? true)
      (break))
    k?))

(define empty? (t)
  (and (none? t) (not (keys? t))))

(define stash (args)
  (if (keys? args)
      (let (p (%object "_stash" true))
        (each (k v) args
          (set (get p k) v))
        (join args (list p)))
    args))

(define unstash (args)
  (if (none? args)
      ()
    (let (l (last args))
      (if (and (table? l) l._stash)
          (let (args1 (sub args 0 (- (length args) 1)))
            (each (k v) l
              (unless (= k '_stash)
                (set (get args1 k) v)))
            args1)
        args))))

(define extend (t rest: xs)
  (join t xs))

(define exclude (t rest: keys)
  (let (t1 (subl t))
    (each (k v) t
      (unless (get keys k)
        (set (get t1 k) v)))
    t1))

(define search (str pattern start)
  (target
   js: (let (i (str.indexOf pattern start))
         (if (>= i 0) i))
   lua: (let (start (if start (+ start 1))
              i (string.find str pattern start true))
          (and i (- i 1)))))

(define split (str sep)
  (target
   js: (str.split sep)
   lua: (if (or (= str "") (= sep ""))
            ()
          (let (strs ())
            (while true
              (let (i (search str sep))
                (if (nil? i) (break)
                  (do (add strs (sub str 0 i))
                      (set str (sub str (+ i 1)))))))
            (add strs str)
            strs))))

(define cat (rest: xs)
  (if (none? xs) ""
    (reduce (fn (a b) (cat a b)) xs)))

(define + (rest: xs)
  (reduce (fn (a b) (+ a b)) xs))

(define - (rest: xs)
  (reduce (fn (b a) (- a b)) (reverse xs)))

(define * (rest: xs)
  (reduce (fn (a b) (* a b)) xs))

(define / (rest: xs)
  (reduce (fn (b a) (/ a b)) (reverse xs)))

(define % (rest: xs)
  (reduce (fn (b a) (% a b)) (reverse xs)))

(define > (a b) (> a b))
(define < (a b) (< a b))
(define = (a b) (= a b))
(define >= (a b) (>= a b))
(define <= (a b) (<= a b))

(target js: (define* require require))
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

(target js: (define* print (x) (console.log x)))
(target js: (define type (x) (typeof x)))

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
    js: (floor (/ ((get (|new Date|) 'getTime)) 1000))
    lua: (os.time)))

(define number (str)
  (define numeric? (c)
    (let (n (code c))
      (and (> n 47) (< n 58))))
  (define number-char? (c)
    (or (numeric? c) (in? c '(+ - e E .))))
  (let (i 0)
    (while (< i (length str))
      (unless (number-char? (char str i))
        (return))
      (inc i)))
  (target
   js: (let (n (parseFloat str))
         (unless (isNaN n) n))
   lua: (tonumber str)))

(define string (x)
  (if (nil? x) "nil"
      (boolean? x) (if x "true" "false")
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (str "("
          x1 (sub x))
      (each (k v) x
        (add x1 (cat k ":"))
        (add x1 v))
      (each (y :i) x1
        (cat! str (string y))
        (when (< i (- (length x1) 1))
          (cat! str " ")))
      (cat str  ")"))))

(define space (xs)
  (define string (x)
    (if (or (string-literal? x)
            (and (list? x) (= (hd x) 'cat)))
        x
      `(string ,x)))
  (if (one? xs)
      (string (hd xs))
    (reduce (fn (a b)
              `(cat ,(string a) " " ,(string b)))
            xs)))

(define apply (f args)
  (let (args (stash args))
    (target js: (f.apply f args) lua: (f (unpack args)))))

(define id-count 0)

(define make-id ()
  (inc id-count)
  (cat "_g" id-count))

(define %message-handler (msg)
  (let (i (search msg ": "))
    (sub msg (+ i 2))))

(define toplevel? ()
  (one? environment))

(define module-key (spec)
  (if (atom? spec)
      (string spec)
    (reduce (fn (a b)
              (cat (module-key a) "/" (module-key b)))
            spec)))

(define module (spec)
  (get modules (module-key spec)))

(define setenv (k rest: keys)
  (when (string? k)
    (let (frame (last environment)
          x (or (get frame k) (table)))
      (each (k1 v) keys
        (set (get x k1) v))
      (when (toplevel?)
        (let (m (module current-module))
          (set (get m.export k) x)))
      (set (get frame k) x))))
