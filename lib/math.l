;; -*- mode: lisp -*-

(define-module (lumen math)
  import: ((lumen special) (lumen core))
  export: (max
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
           tanh))

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
