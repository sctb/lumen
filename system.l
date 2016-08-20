;; -*- mode: lisp -*-

(target js:
  (do (define fs (require 'fs))
      (define path (require 'path))
      (define child_process (require 'child_process))))

(target lua:
  (define call-with-file (f path mode)
    (let |h,e| (io.open path mode)
      (unless h
        (error e))
      (with x (f h)
        (h.close h)))))

(define read-file (path)
  (target
    js: (fs.readFileSync path 'utf8)
    lua: (call-with-file
          (fn (f) (f.read f '*a))
          path)))

(define write-file (path data)
  (target
    js: (fs.writeFileSync path data 'utf8)
    lua: (call-with-file
          (fn (f) (f.write f data))
          path 'w)))

(define file-exists? (path)
  (target
    js: (fs.existsSync path 'utf8)
    lua: (let f (io.open path)
           (if f (f.close f))
           (is? f))))

(define path-separator
  (target
    js: path.sep
    lua: (char _G.package.config 0)))

(define path-join parts
  (or (reduce (fn (x y) (cat x path-separator y)) parts) ""))

(define get-environment-variable (name)
  (target
    js: (get process.env name)
    lua: (os.getenv name)))

(define write (x)
  (target js: (process.stdout.write x)
          lua: (io.write x)))

(define exit (code)
  (target js: (process.exit code)
          lua: (os.exit code)))

(define argv
  (target js: (cut process.argv 2) lua: arg))

(define reload (module)
  (wipe (target
          lua: (get package.loaded module)
          js: (get require.cache (require.resolve module))))
  (require module))

(define run (command)
  (target
    js: (let f (child_process.execSync command)
          (f.toString))
    lua: (let f (io.popen command)
           (with x (f.read f '*all)
             (f.close f)))))

(export read-file
        write-file
        file-exists?
        path-separator
        path-join
        get-environment-variable
        write
        exit
        argv
        reload
        run)
