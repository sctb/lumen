Lumen
=
Lumen is a Lisp for Lua and JavaScript. You can get started by running `bin/lumen` on a machine with Node.js, Lua, or LuaJIT installed.
#### Introduction
Every piece of code in Lumen is an expression, and expressions can be evaluated to give values. Lumen has a few kinds of expressions that evaluate to themselves:
```
> 17
17
> -5e4
-5000
> true
true
> false
false
```

Strings are enclosed in quotation marks, and may contain newlines. Special characters are escaped using a backslash:
```
> "hi there"
"hi there"
> "one
two"
"one\ntwo"
> "a\"b"
"a\"b"
```

`nil` represents nothingness, and it isn't printed back at the command line:
```
> nil
>
```

Comments start with `;` and continue through the rest of the line:
```
> 7 ; everyone's favourite
7
```

Lists contain other values, and are written by enclosing expressions in parentheses. Operators are called by placing them at the beginning of a list expression, and list values can be constructed using the `list` operator:
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

#### Variables
Variables are declared using `define` and `define-global`. Variables declared with `define` are available for use anywhere in subsequent expressions in the same scope, and `define-global` makes them globally available.
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
30
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

It's common to access the values of a list variable where the position or key is known in advance, so there is a shorthand for that:
```
> (let x (list foo: 10 bar: 20)
    x.bar)
20
> (let x (list foo: 10 bar: 20)
    (get x "bar")) ; equivalent
20
> (let x (list 10 20 30)
    x.2)
30
> (let x (list 10 20 30)
    (at x 2)) ; equivalent
30
```

#### Assignment
Variables and list values can be updated using `set`, which evaluates to the value that it updated:
```
> (let x 10
    (set x 15))
15
> (let x 10
    (set x 20)
    (+ x 5))
25
> (let a (list 1 2 3)
    (set (at a 1) "b")
    a)
(1 "b" 3)
> (let a (list foo: 17)
    (set (get a "foo") 19)
    a)
(foo: 19)
```

#### Conditionals
Conditional evaluation is done using an `if` expression. The value of an `if` expression is that of the branch whose condition evaluated to `true`:
```
> (if true 10 20)
10
> (if false 10 20)
20
> (+ (if false 10 20) 5)
25
```

`if` expressions can have any number of branches:
```
> (if true 10)
10
> (if false 10)
>
> (if false 1 false 2 false 3 true 10)
10
> (if false 1 false 2 false 3 10)
10
> (if true 9 (do (print 10) 11))
9
> (if false 9 (do (print 10) 11))
10
11
```

Comparing values is done using the `=` operator:
```
> (= 10 10)
true
> (if (= 10 10) "yes")
"yes"
> (if (= 10 "no") "yes")
>
```

Lists are values that have unique identity, so two separate lists that happen to contain the same values are not the same:
```
> (= (list 1 2 3) (list 1 2 3))
false
```

#### Functions
Functions in Lumen are values, just like numbers and strings. Expressions that start with `fn` evaluate to functions:
```
> (fn () 10)
function
```

Functions can be called by placing them first in a list expression. The list that appears after the name `fn` identifies the function's parameters:
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

Parameters in Lumen are always optional, and those without a supplied argument have the value `nil`:
```
> (let f (fn (a) a)
    (f))
>
> (let f (fn (:b) (if (= b nil) 10 20))
    (f a: 99))
10
```

#### Quotation
Expressions can be quoted to prevent them from being evaluated using the `quote` operator:
```
> (quote (1 2 3))
(1 2 3)
```

Expressions that evaluate to themselves are unaffected by quotation:
```
> (quote 10)
10
> (quote false)
false
```

Quoting names and strings results in strings that would evaluate to the quoted expression:
```
> (quote a)
"a"
> (quote "hereanother")
"\"hereanother\""
> (quote "two\nlines")
"\"two\\nlines\""
```

This is also true for expressions inside lists:
```
> (quote (a b c))
("a" "b" "c")
> (quote (1 2 b: baz z: "frob"))
(1 2 b: "baz" z: "\"frob\"")
```

The shorthand for quotation is use a single quote:
```
> '17
17
> '(1 2 3)
(1 2 3)
> '(a b c)
("a" "b" "c")
```

A convenient notation for certain strings is to quote their name:
```
> 'a
"a"
> (let x '(a: 10 b: 20)
    (get x 'a))
10
```

When you want to quote some parts of an expression, but want other parts to be evaluated, use `quasiquote` and `unquote`:
```
> (let x 10
    (quasiquote (1 5 (unquote x))))
(1 5 10)
```

The shorthand for quasiquotation is `\`` for `quasiquote` and `,` for `unquote`:
```
> (let x 10 `(1 5 ,x))
(1 5 10)
```

Another way to unquote expressions is `unquote-splicing`, which takes the values contained in a nested list and places them in the enclosing one:
```
> (let a (1 2 3)
    (quasiquote (9 8 (unquote-splicing a))))
(9 8 1 2 3)
```

The shorthand for `unquote-splicing` is `,@`:
```
> (let a (1 2 3)
    `(9 8 ,@a))
(9 8 1 2 3)
```
