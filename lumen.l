(when-compiling
  `(do ,@(read-from-file "runtime.l")
       ,@(read-from-file "macros.l")
       ,@(read-from-file "main.l")))
