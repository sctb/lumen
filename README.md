Lumen
=
Lumen is a Lisp for Lua and JavaScript. You can get started by running `bin/lumen` on a machine with Node.js, Lua, or LuaJIT installed.
### Introduction
Every piece of code in Lumen is an expression, and expressions can be evaluated to give values. Lumen has a few kinds of expressions that evaluate to themselves:
```
> 17
17
> -5e4
-5000
> "hi there"
"hi there"
> true
true
> false
false
```

Variables evaluate to the values that they name:
```
> apply
function
> nan
nan
```

Another expression that evaluates to itself is `nil`, which represents nothingness, but it isn't printed back:
```
> nil
>
```

Comments start with `;` and continue through the rest of the line:
```
> 7 ; everyone's favourite
7
```

Lists contain other values, and are written by enclosing expressions in parentheses. Functions and operators are called by placing them at the beginning of a list expression, and list values can be constructed using the `list` operator:
```
> (+ 10 2)
12
> (abs -10)
10
> (/ 128 2 2 2)
16
> (list 1 2 3 4)
(1 2 3 4)
```

Lists can contain values that are identified by their position, as well as values that are identified in the list by a name:
```
> (list 1 2 3)
(1 2 3)
> (list 1 2 a: 10 b: 20)
(1 2 b: 20 a: 10)
```
Note that values identified by name, known as keys, don't show up in any particular order.

Positional values can be gotten out of lists using the `at` operator, and keys using the `get` operator:
```
> (at (list 1 2 3) 1)
2
> (get (list a: 10 b: 20) "b")
20
```

A shortcut for a key whose value is `true` looks like this, called a flag:
```
> (list :yes)
(yes: true)
```

### Variables
Variables are defined using `define` and `define-global`. Variables declared with `define` are available for use anywhere in subsequent expressions in the same scope, and `define-global` makes them globally available.
```
> (define-global zzz "ho")
> zzz
"ho"
> (do (define x 10) (+ x 9))
19
```
`do` evaluates multiple expressions, and itself evaluates to the value of the last expression.

Variables for a limited scope are introduced using `let`:
```
> (let (x 10 y 20)
    (+ x y))
20
> (let x 41 (+ x 1))
42
```

You can see that `let` accepts a list of names and values, called bindings, or it can work with a single binding. More than one expression can follow the bindings, which works like `do`:
```
> (let (x 10 y 20)
    (print x)
    (+ x y))
10
30
> (let x 9
    (print "hi")
    (let y (+ x 1) y))
hi
10
```

### Functions
Functions in Lumen are values, just like numbers and strings. Expressions that start with `fn` evaluate to functions:
```
> (fn () 10)
function
```

Remember that functions can be called by placing them first in a list expression. The list that appears after `fn` identifies the functions parameters:
```
> (fn (a) (+ a 10))
function
> ((fn (a) (+ a 10)) 20)
30
> ((fn () 42))
42
> ((fn (a b) (+ a b)) 10 20)
30
```

Because functions are values, we can use variables to name them. The same rules apply when calling a function named by a variable:
```
> (let f (fn () 42)
    (f))
42
> (let plus (fn (a b) (+ a b))
    (plus 10 20))
30
```

The most common shortcut for defining functions is to use `define` and `define-global` in the following way:
```
> (define-global f (n)
    (* n 10))
> (f 3)
30
> (do (define f (n) (* n 10))
      (print (f 3))
      (print (f 4))
      (f 2.5))
30
40
25
```

A function's parameter list can contain both positional and key parameters, where the key's value is the name to bind:
```
> (let f (fn (a b: my-b) (+ a my-b))
    (f 13 b: 2))
15
```

If the key's value is `true`, the same name as the key is used to bind the parameter's value. This makes it easy to define named parameters with flags:
```
> (let f (fn (a b: true) (+ a b))
    (f 1 b: 2))
3
> (let f (fn (a :b) (+ a b)) ; use a flag
    (f 10 b: 20))
30
```