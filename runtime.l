(define-global environment (list (obj)))
(define-global target (language))

(define-global nil? (x)
  (target
    js: (or (= x nil) (= x null))
    lua: (= x nil)))

(define-global is? (x) (not (nil? x)))

(define-global no (x) (or (nil? x) (= x false)))
(define-global yes (x) (not (no x)))

(define-global # (x)
  (target js: (or (get x 'length) 0) lua: |#x|))

(define-global none? (x) (= (# x) 0))
(define-global some? (x) (> (# x) 0))
(define-global one? (x) (= (# x) 1))
(define-global two? (x) (= (# x) 2))

(define-global hd (l) (at l 0))

(target js: (define-global type (x) (typeof x)))

(define-global string? (x) (= (type x) 'string))
(define-global number? (x) (= (type x) 'number))
(define-global boolean? (x) (= (type x) 'boolean))
(define-global function? (x) (= (type x) 'function))

(define-global obj? (x)
  (and (is? x)
       (= (type x) (target lua: 'table js: 'object))))

(define-global atom? (x)
  (or (nil? x) (string? x) (number? x) (boolean? x)))

(define-global nan (/ 0 0))
(define-global inf (/ 1 0))

(define-global nan? (n)
  (not (= n n)))

(define-global inf? (n)
  (or (= n inf) (= n -inf)))

(define-global clip (s from upto)
  (target js: ((get s 'substring) from upto)
          lua: ((get string 'sub) s (+ from 1) upto)))

(define-global cut (x from upto)
  (with l ()
    (let (j 0
          i (if (or (nil? from) (< from 0)) 0 from)
          n (# x)
          upto (if (or (nil? upto) (> upto n)) n upto))
      (while (< i upto)
        (set (at l j) (at x i))
        (inc i)
        (inc j))
      (each (k v) x
        (unless (number? k)
          (set (get l k) v))))))

(define-global keys (x)
  (with t ()
    (each (k v) x
      (unless (number? k)
        (set (get t k) v)))))

(define-global edge (x)
  (- (# x) 1))

(define-global inner (x)
  (clip x 1 (edge x)))

(define-global tl (l) (cut l 1))

(define-global char (s n)
  (target js: ((get s 'charAt) n) lua: (clip s n (+ n 1))))

(define-global code (s n)
  (target
    js: ((get s 'charCodeAt) n)
    lua: ((get string 'byte) s (if n (+ n 1)))))

(define-global string-literal? (x)
  (and (string? x) (= (char x 0) "\"")))

(define-global id-literal? (x)
  (and (string? x) (= (char x 0) "|")))

(define-global add (l x)
  (target js: (do ((get l 'push) x) nil)
          lua: ((get table 'insert) l x)))

(define-global drop (l)
  (target js: ((get l 'pop))
          lua: ((get table 'remove) l)))

(define-global last (l)
  (at l (edge l)))

(define-global almost (l)
  (cut l 0 (edge l)))

(define-global reverse (l)
  (with l1 (keys l)
    (let i (edge l)
      (while (>= i 0)
        (add l1 (at l i))
        (dec i)))))

(define-global reduce (f x none)
  (if (none? x) none
      (one? x) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define-global join ls
  (with r ()
    (step l ls
      (when l
        (let n (# r)
          (each (k v) l
            (if (number? k) (inc k n))
            (set (get r k) v)))))))

(define-global find (f t)
  (each x t
    (let y (f x)
      (if y (return y)))))

(define-global first (f l)
  (step x l
    (let y (f x)
      (if y (return y)))))

(define-global in? (x t)
  (find (fn (y) (= x y)) t))

(define-global pair (l)
  (with l1 ()
    (for i (# l)
      (add l1 (list (at l i) (at l (+ i 1))))
      (inc i))))

(define-global sort (l f)
  (target
    lua: (do ((get table 'sort) l f) l)
    js: ((get l 'sort) (when f (fn (a b) (if (f a b) -1 1))))))

(define-global map (f x)
  (with t ()
    (step v x
      (let y (f v)
        (if (is? y)
          (add t y))))
    (each (k v) x
      (unless (number? k)
        (let y (f v)
          (when (is? y)
            (set (get t k) y)))))))

(define-global keep (f x)
  (map (fn (v) (when (yes (f v)) v)) x))

(define-global keys? (t)
  (each (k v) t
    (unless (number? k)
      (return true)))
  false)

(define-global empty? (t)
  (each x t
    (return false))
  true)

(define-global stash (args)
  (when (keys? args)
    (let p ()
      (each (k v) args
        (unless (number? k)
          (set (get p k) v)))
      (set (get p '_stash) true)
      (add args p)))
  args)

(define-global unstash (args)
  (if (none? args) ()
    (let l (last args)
      (if (and (obj? l) (get l '_stash))
          (with args1 (almost args)
            (each (k v) l
              (unless (= k '_stash)
                (set (get args1 k) v))))
        args))))

(define-global destash! (l args1)
  (if (and (obj? l) (get l '_stash))
      (each (k v) l
        (unless (= k '_stash)
          (set (get args1 k) v)))
    l))

(define-global search (s pattern start)
  (target
    js: (let i ((get s 'indexOf) pattern start)
          (if (>= i 0) i))
    lua: (let (start (if start (+ start 1))
               i ((get string 'find) s pattern start true))
           (and i (- i 1)))))

(define-global split (s sep)
  (if (or (= s "") (= sep "")) ()
    (with l ()
      (let n (# sep)
        (while true
          (let i (search s sep)
            (if (nil? i) (break)
              (do (add l (clip s 0 i))
                  (set s (clip s (+ i n)))))))
        (add l s)))))

(define-global cat xs
  (reduce (fn (a b) (cat a b)) xs ""))

(define-global + xs
  (reduce (fn (a b) (+ a b)) xs 0))

(define-global - xs
  (reduce (fn (b a) (- a b)) (reverse xs) 0))

(define-global * xs
  (reduce (fn (a b) (* a b)) xs 1))

(define-global / xs
  (reduce (fn (b a) (/ a b)) (reverse xs) 1))

(define-global % xs
  (reduce (fn (b a) (% a b)) (reverse xs) 0))

(define pairwise (f xs)
  (for i (edge xs)
    (let (a (at xs i)
          b (at xs (+ i 1)))
      (unless (f a b)
        (return false))))
  (return true))

(define-global < xs (pairwise (fn (a b) (< a b)) xs))
(define-global > xs (pairwise (fn (a b) (> a b)) xs))
(define-global = xs (pairwise (fn (a b) (= a b)) xs))
(define-global <= xs (pairwise (fn (a b) (<= a b)) xs))
(define-global >= xs (pairwise (fn (a b) (>= a b)) xs))

(define-global number (s)
  (target
    js: (let n (parseFloat s)
          (unless (isNaN n) n))
    lua: (tonumber s)))

(define-global number-code? (n)
  (and (> n 47) (< n 58)))

(define-global numeric? (s)
  (let n (# s)
    (for i n
      (unless (number-code? (code s i))
        (return false))))
  (some? s))

(target js: (define tostring (x) ((get x 'toString))))

(define-global escape (s)
  (let s1 "\""
    (for i (# s)
      (let (c (char s i)
            c1 (if (= c "\n") "\\n"
                   (= c "\"") "\\\""
                   (= c "\\") "\\\\"
                 c))
        (cat! s1 c1)))
    (cat s1 "\"")))

(define-global str (x stack)
  (if (nil? x) "nil"
      (nan? x) "nan"
      (= x inf) "inf"
      (= x -inf) "-inf"
      (boolean? x) (if x "true" "false")
      (string? x) (escape x)
      (atom? x) (tostring x)
      (function? x) "function"
      (and stack (in? x stack)) "circular"
      (target js: false lua: (not (= (type x) 'table)))
      (escape (tostring x))
    (let (s "(" sp ""
          xs () ks ()
          l (or stack ()))
      (add l x)
      (each (k v) x
        (if (number? k)
            (set (get xs k) (str v l))
          (do (add ks (cat k ":"))
              (add ks (str v l)))))
      (drop l)
      (each v (join xs ks)
        (cat! s sp v)
        (set sp " "))
      (cat s  ")"))))

(target lua:
  (define values (or unpack (get table 'unpack))))

(define-global apply (f args)
  (let args (stash args)
    (target js: ((get f 'apply) f args)
            lua: (f (values args)))))

(define-global call (f rest: args)
  (apply f args))

(define-global setenv (k rest: keys)
  (when (string? k)
    (let (frame (if (get keys 'toplevel)
                    (hd environment)
                  (last environment))
          entry (or (get frame k) (obj)))
      (each (k v) keys
        (set (get entry k) v))
      (set (get frame k) entry))))

(target js:
  (define-global print (x)
    ((get console 'log) x)))

(define math (target js: Math lua: math))

(define-global abs (get math 'abs))
(define-global acos (get math 'acos))
(define-global asin (get math 'asin))
(define-global atan (get math 'atan))
(define-global atan2 (get math 'atan2))
(define-global ceil (get math 'ceil))
(define-global cos (get math 'cos))
(define-global floor (get math 'floor))
(define-global log (get math 'log))
(define-global log10 (get math 'log10))
(define-global max (get math 'max))
(define-global min (get math 'min))
(define-global pow (get math 'pow))
(define-global random (get math 'random))
(define-global sin (get math 'sin))
(define-global sinh (get math 'sinh))
(define-global sqrt (get math 'sqrt))
(define-global tan (get math 'tan))
(define-global tanh (get math 'tanh))
(define-global trunc (get math 'floor))
