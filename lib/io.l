;; -*- mode: lisp -*-

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

(target js: (define print (x) (console.log x)))

(define write (x)
  (target js: (process.stdout.write x) lua: (io.write x)))

(define exit (code)
  (target js: (process.exit code) lua: (os.exit code)))

(define argv ()
  (target js: (sub process.argv 2) lua: arg))
