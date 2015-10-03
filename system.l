;; -*- mode: lisp -*-

(target js: (define fs (require 'fs)))

(target lua:
  (define call-with-file (f path mode)
    (let |h,e| ((get io 'open) path mode)
      (unless h
        (error e))
      (with x (f h)
        ((get h 'close) h)))))

(define read-file (path)
  (target
    js: ((get fs 'readFileSync) path 'utf8)
    lua: (call-with-file
          (fn (f) ((get f 'read) f '*a))
          path)))

(define write-file (path data)
  (target
    js: ((get fs 'writeFileSync) path data 'utf8)
    lua: (call-with-file
          (fn (f) ((get f 'write) f data))
          path 'w)))

(define file-exists? (path)
  (target
    js: ((get fs 'existsSync) path 'utf8)
    lua: (call-with-file ((get io 'open) path)
           (fn (f) (is? f)))))

(define path-separator
  (target
    js: (get (require 'path) 'sep)
    lua: (char (get (get _G 'package) 'config) 0)))

(define path-join parts
  (if (none? parts) ""
    (reduce (fn (x y) (cat x path-separator y)) parts)))

(define get-environment-variable (name)
  (target
    js: (get (get process 'env) name)
    lua: ((get os 'getenv) name)))

(define write (x)
  (target js: (let out (get process 'stdout)
                ((get out 'write) x))
          lua: ((get io 'write) x)))

(define exit (code)
  (target js: ((get process 'exit) code)
          lua: ((get os 'exit) code)))

(define argv
  (target js: (cut (get process 'argv) 2) lua: arg))

(export read-file
        write-file
        file-exists?
        path-separator
        path-join
        get-environment-variable
        write
        exit
        argv)
