;; -*- mode: lisp -*-

(define-module runtime
  import: (special core)
  export: (nil?
           is?
           length
           empty?
           some?
           hd
           string?
           number?
           boolean?
           function?
           composite?
           atom?
           table?
           list?
           substring
           sublist
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
           find
           pairwise
           iterate
           replicate
           splice
           map
           map*
           mapt
           mapo
           keys?
           setenv
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
           print
           write
           exit
           parse-number
           to-string
           apply
           %message-handler))

(define-local nil? (x) (= x nil))
(define-local is? (x) (not (nil? x)))

(define-local length (x)
  (target js: x.length lua: |#x|))

(define-local empty? (x)
  (= (length x) 0))

(define-local some? (x)
  (> (length x) 0))

(define-local hd (l) (at l 0))

(target js: (define-local type (x) (typeof x)))

(define-local string? (x) (= (type x) 'string))
(define-local number? (x) (= (type x) 'number))
(define-local boolean? (x) (= (type x) 'boolean))
(define-local function? (x) (= (type x) 'function))
(define-local composite? (x) (= (type x) (target js: 'object lua: 'table)))
(define-local atom? (x) (not (composite? x)))
(define-local table? (x) (and (composite? x) (nil? (hd x))))
(define-local list? (x) (and (composite? x) (is? (hd x))))

(define-local substring (str from upto)
  (target js: (str.substring from upto)
          lua: (string.sub str (+ from 1) upto)))

(define-local sublist (l from upto)
  (target
   js: (Array.prototype.slice.call l from upto)
   lua: (let (i (or from 0) j 0
              upto (or upto (length l))
              l2 ())
          (while (< i upto)
            (set (at l2 j) (at l i))
            (inc i)
            (inc j))
          l2)))

(define-local sub (x from upto)
  (let (from (or from 0))
    (if (string? x)
        (substring x from upto)
      (let (l (sublist x from upto))
        (each (x k v)
          (set (get l k) v))
        l))))

(define-local inner (x)
  (sub x 1 (- (length x) 1)))

(define-local tl (l) (sub l 1))

(define-local char (str n)
  (target js: (str.charAt n) lua: (sub str n (+ n 1))))

(define-local code (str n)
  (target
   js: (str.charCodeAt n)
   lua: (string.byte str (if n (+ n 1)))))

(define-local string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(define-local id-literal? (x) (and (string? x) (= (char x 0) "|")))

(define-local add (l x)
  (target js: (l.push x) lua: (table.insert l x)))

(define-local drop (l)
  (target js: (l.pop) lua: (table.remove l)))

(define-local last (l)
  (at l (- (length l) 1)))

(define-local reverse (l)
  (let (l1 ()
        i (- (length l) 1))
    (while (>= i 0)
      (add l1 (at l i))
      (dec i))
    l1))

(define-local join (l1 l2)
  (if (and (nil? l2) (nil? l1)) ()
      (nil? l1) (join () l2)
      (nil? l2) (join l1 ())
      (and (atom? l1) (atom? l2)) (list l1 l2)
      (atom? l1) (join (list l1) l2)
      (atom? l2) (join l1 (list l2))
    (let (l () skip? false)
      (target js:
        (if (and (list? l1)
                 (list? l2))
            (do (set l (l1.concat l2))
                (set skip? true))))
      (if (not skip?)
          (let (i 0 len (length l1))
            (while (< i len)
              (set (at l i) (at l1 i))
              (inc i))
            (while (< i (+ len (length l2)))
              (set (at l i) (at l2 (- i len)))
              (inc i))))
      (each (l1 k v)
        (set (get l k) v))
      (each (l2 k v)
        (set (get l k) v))
      l)))

(define-local reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define-local keep (f l)
  (let (l1 ())
    (across (l x) (if (f x) (add l1 x)))
    l1))

(define-local find (f l)
  (across (l x)
    (let (x (f x))
      (if x (return x)))))

(define-local pairwise (l)
  (let (i 0
        l1 ())
    (while (< i (length l))
      (add l1 (list (at l i) (at l (+ i 1))))
      (inc i 2))
    l1))

(define-local iterate (f count)
  (let (i 0)
    (while (< i count)
      (f i)
      (inc i))))

(define-local replicate (n x)
  (let (l ())
    (iterate (fn () (add l x)) n)
    l))

(define-local splice (x)
  (table _splice: true value: x))

(define-local splice? (x)
  (and (table? x) x._splice))

(define-local map (f l)
  (let (l1 ())
    (across (l x)
      (let (x1 (f x))
        (if (splice? x1)
            (join! l1 x1.value)
            (is? x1) (add l1 x1))))
    l1))

(define-local map* (f t)
  (let (l (map f t))
    (each (t k v)
      (let (x (f v))
        (if (is? x)
            (set (get l k) x))))
    l))

(define-local mapt (f t)
  (let (t1 (table))
    (each (t k v)
      (let (x (f k v))
        (if (is? x)
            (set (get t1 k) x))))
    t1))

(define-local mapo (f t)
  (let (o ())
    (each (t k v)
      (let (x (f k v))
        (if (is? x)
            (do (add o k)
                (add o x)))))
    o))

(define-local keys? (t)
  (let (k nil)
    (each (t k1 v)
      (set k k1)
      (break))
    k))

(define-local stash (args)
  (if (keys? args)
      (let (p (%object _stash true))
        (each (args k v)
          (set (get p k) v))
        (join args (list p)))
    args))

(define-local unstash (args)
  (if (empty? args)
      ()
    (let (l (last args))
      (if (and (table? l) l._stash)
          (let (args1 (sub args 0 (- (length args) 1)))
            (each (l k v)
              (if (~= k '_stash)
                  (set (get args1 k) v)))
            args1)
        args))))

(define-local setenv (k rest: keys)
  (if (string? k)
      (let (frame (last environment)
            x (or (get frame k) (table)))
        (each (keys k1 v)
          (set (get x k1) v))
        (set x.module current-module)
        (set (get frame k) x))))

(define-local extend (t rest: xs)
  (join t xs))

(define-local exclude (t rest: keys)
  (let (t1 (sublist t))
    (each (t k v)
      (if (not (get keys k))
          (set (get t1 k) v)))
    t1))

(define-local search (str pattern start)
  (target
   js: (let (i (str.indexOf pattern start))
         (if (>= i 0) i))
   lua: (let (start (if start (+ start 1))
              i (string.find str pattern start true))
          (and i (- i 1)))))

(define-local split (str sep)
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

(define-local cat (rest: xs)
  (if (empty? xs) ""
    (reduce (fn (a b) (cat a b)) xs)))

(define-local + (rest: xs)
  (reduce (fn (a b) (+ a b)) xs))

(define-local - (rest: xs)
  (reduce (fn (a b) (- b a)) (reverse xs)))

(define-local * (rest: xs)
  (reduce (fn (a b) (* a b)) xs))

(define-local / (rest: xs)
  (reduce (fn (a b) (/ b a)) (reverse xs)))

(define-local % (rest: xs)
  (reduce (fn (a b) (% b a)) (reverse xs)))

(define-local > (a b) (> a b))
(define-local < (a b) (< a b))
(define-local = (a b) (= a b))
(define-local >= (a b) (>= a b))
(define-local <= (a b) (<= a b))

(target js: (define-local fs (require 'fs)))

(define-local read-file (path)
  (target
    js: (fs.readFileSync path 'utf8)
    lua: (let (f (io.open path))
	   (f.read f '*a))))

(define-local write-file (path data)
  (target
    js: (fs.writeFileSync path data 'utf8)
    lua: (let (f (io.open path 'w))
           (f.write f data))))

(target js: (define-local print (x) (console.log x)))

(define-local write (x)
  (target js: (process.stdout.write x) lua: (io.write x)))

(define-local exit (code)
  (target js: (process.exit code) lua: (os.exit code)))

(target js: (define-local type (x) (typeof x)))

(define-local parse-number (str)
  (target
   js: (let (n (parseFloat str))
         (if (not (isNaN n)) n))
   lua: (tonumber str)))

(define-local to-string (x)
  (if (nil? x) "nil"
      (boolean? x) (if x "true" "false")
      (function? x) "#<function>"
      (atom? x) (cat x "")
    (let (str "("
          x1 (sub x))
      (each (x k v)
        (add x1 (cat k ":"))
        (add x1 v))
      (across (x1 y i)
        (cat! str (to-string y))
        (if (< i (- (length x1) 1))
            (cat! str " ")))
      (cat str  ")"))))

(define-local apply (f args)
  (let (args (stash args))
    (target js: (f.apply f args) lua: (f (unpack args)))))

(define-local %message-handler (msg)
  (let (i (search msg ": "))
    (sub msg (+ i 2))))
