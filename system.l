(target js: (define fs (require 'fs)))
(target js: (define child_process (require 'child_process)))

(target lua:
  (define call-with-file (f path mode)
    (let |h,e| ((get io 'open) path mode)
      (unless h
        (error e))
      (with x (f h)
        ((get h 'close) h)))))

(define read-file (path)
  (let path (if (= path "-") "/dev/stdin" path)
    (target
      js: ((get fs 'readFileSync) path 'utf8)
      lua: (call-with-file
            (fn (f) ((get f 'read) f '*a))
            path))))

(define write-file (path data)
  (let path (if (= path "-") "/dev/stdout" path)
    (target
      js: ((get fs 'writeFileSync) path data 'utf8)
      lua: (call-with-file
            (fn (f) ((get f 'write) f data))
            path 'w))))

(define file-exists? (path)
  (or (= path "-")
      (target
        js: ((get fs 'existsSync) path 'utf8)
        lua: (let f ((get io 'open) path)
               (if f ((get f 'close) f))
               (is? f)))))

(define path-separator
  (target
    js: (get (require 'path) 'sep)
    lua: (char (get (get _G 'package) 'config) 0)))

(define path-join parts
  (or (reduce (fn (x y) (cat x path-separator y)) parts) ""))

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

(define reload (module)
  (wipe (target
          lua: (get (get package 'loaded) module)
          js: (get (get require 'cache) ((get require 'resolve) module))))
  (require module))

(define run (command)
  (target
    js: ((get ((get child_process 'execSync) command) 'toString))
    lua: (let f ((get io 'popen) command)
           (with x ((get f 'read) f '*all)
             ((get f 'close) f)))))

(define tty? (fd)
  (let fd (if (= fd 'stdin) 0
              (= fd 'stdout) 1
              (= fd 'stderr) 2
              (number? fd) fd
            (return false))
    (= "1" (run (cat "[ -t " fd " ] && printf 1 || exit 0")))))

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
        run
        tty?)
