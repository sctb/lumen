Lumen
=
Lumen is a Lisp for Lua and JavaScript. You can get started by running `bin/lumen` on a Unix machine with Node.js, Lua, or LuaJIT installed.
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

Lists contain other values, and are written by enclosing expressions in parentheses. Functions and operators are called by placing them at the beginning of a list expression, and list values can be constructed using the `list` operator:
```
> (+ 10 2)
12
> (abs -10)
10
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
