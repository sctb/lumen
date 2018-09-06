environment <- list(list())
target <- "r"
get_environment <- function () {
  environment
}
nil63 <- function (x) {
  is.null(x)
}
is63 <- function (x) {
  ! nil63(x)
}
no <- function (x) {
  nil63(x) || x == FALSE
}
yes <- function (x) {
  ! no(x)
}
either <- function (x, y) {
  if (is63(x)) {
    x
  } else {
    y
  }
}
has63 <- function (l, k) {
k %in% names(l)
}
indices <- function (l) {
  Map(function (k, i) {
    if (k == "") {
      i
    } else {
      k
    }
  }, names(l), seq_len(length(l)))
}
V_35 <- function (x) {
  if (is.character(x)) {
    nchar(x)
  } else {
    length(x) - length(Filter(nchar, names(x)))
  }
}
none63 <- function (x) {
  V_35(x) == 0
}
some63 <- function (x) {
  V_35(x) > 0
}
one63 <- function (x) {
  V_35(x) == 1
}
two63 <- function (x) {
  V_35(x) == 2
}
hd <- function (l) {
l[[1]]
}
type <- function (x) {
  mode(x)
}
string63 <- function (x) {
  type(x) == "character"
}
number63 <- function (x) {
  type(x) == "numeric"
}
boolean63 <- function (x) {
  type(x) == "logical"
}
function63 <- function (x) {
  type(x) == "function"
}
obj63 <- function (x) {
  is63(x) && type(x) == "list"
}
atom63 <- function (x) {
  nil63(x) || string63(x) || number63(x) || boolean63(x)
}
hd63 <- function (l, x) {
  obj63(l) && hd(l) == x
}
nan <- 0 / 0
inf <- 1 / 0
_inf <- - inf
nan63 <- function (n) {
  is.nan(n)
}
inf63 <- function (n) {
  ! is.finite(n)
}
clip <- function (s, from, upto) {
  substr(s, from + 1, upto)
}
cut <- function (x, from, upto) {
  V__l <- list()
  V__j <- 0
  V__e
  if (nil63(from) || from < 0) {
    V__e <- 0
  } else {
    V__e <- from
  }
  V__i <- V__e
  V__n <- V_35(x)
  V__e1
  if (nil63(upto) || upto > V__n) {
    V__e1 <- V__n
  } else {
    V__e1 <- upto
  }
  V__upto <- V__e1
  while (V__i < V__upto) {
    V__l[[V__j + 1]] <<- x[[V__i + 1]]
    V__i <- V__i + 1
    V__j <- V__j + 1
  }
  V__V__o <- x
  V__k <- NULL
  for (V__k in indices(V__V__o)) {
    V__v <- V__V__o[[V__k]]
    if (! number63(V__k)) {
      V__l[[V__k]] <<- V__v
    }
  }
  V__l
}
keys <- function (x) {
  V__t <- list()
  V__V__o1 <- x
  V__k1 <- NULL
  for (V__k1 in indices(V__V__o1)) {
    V__v1 <- V__V__o1[[V__k1]]
    if (! number63(V__k1)) {
      V__t[[V__k1]] <<- V__v1
    }
  }
  V__t
}
edge <- function (x) {
  V_35(x) - 1
}
inner <- function (x) {
  clip(x, 1, edge(x))
}
tl <- function (l) {
  cut(l, 1)
}
char <- function (s, n) {
}
code <- function (s, n) {
}
string_literal63 <- function (x) {
  string63(x) && char(x, 0) == "\""
}
id_literal63 <- function (x) {
  string63(x) && char(x, 0) == "|"
}
add <- function (l, x) {
}
drop <- function (l) {
}
last <- function (l) {
l[[edge(l) + 1]]
}
almost <- function (l) {
  cut(l, 0, edge(l))
}
reverse <- function (l) {
  V__l1 <- keys(l)
  V__i3 <- edge(l)
  while (V__i3 >= 0) {
    add(V__l1, l[[V__i3 + 1]])
    V__i3 <- V__i3 - 1
  }
  V__l1
}
reduce <- function (f, x) {
  if (none63(x)) {
    NULL
  } else {
    if (one63(x)) {
      hd(x)
    } else {
      f(hd(x), reduce(f, tl(x)))
    }
  }
}
join <- function (...) {
  V__ls <- list(...)
  V__r41 <- list()
  V__V__x <- V__ls
  V__V__i4 <- 0
  while (V__V__i4 < V_35(V__V__x)) {
    V__l11 <- V__V__x[[V__V__i4 + 1]]
    if (V__l11) {
      V__n3 <- V_35(V__r41)
      V__V__o2 <- V__l11
      V__k2 <- NULL
      for (V__k2 in indices(V__V__o2)) {
        V__v2 <- V__V__o2[[V__k2]]
        if (number63(V__k2)) {
          V__k2 <- V__k2 + V__n3
        }
        V__r41[[V__k2]] <<- V__v2
      }
    }
    V__V__i4 <- V__V__i4 + 1
  }
  V__r41
}
find <- function (f, t) {
  V__V__o3 <- t
  V__V__i6 <- NULL
  for (V__V__i6 in indices(V__V__o3)) {
    V__x1 <- V__V__o3[[V__V__i6]]
    V__y <- f(V__x1)
    if (V__y) {
      return V__y
    }
  }
}
first <- function (f, l) {
  V__V__x2 <- l
  V__V__i7 <- 0
  while (V__V__i7 < V_35(V__V__x2)) {
    V__x3 <- V__V__x2[[V__V__i7 + 1]]
    V__y1 <- f(V__x3)
    if (V__y1) {
      return V__y1
    }
    V__V__i7 <- V__V__i7 + 1
  }
}
in63 <- function (x, t) {
  find(function (y) {
    x == y
  }, t)
}
pair <- function (l) {
  V__l12 <- list()
  V__i8 <- 0
  while (V__i8 < V_35(l)) {
    add(V__l12, list(l[[V__i8 + 1]], l[[V__i8 + 1 + 1]]))
    V__i8 <- V__i8 + 1
    V__i8 <- V__i8 + 1
  }
  V__l12
}
sort <- function (l, f) {
}
map <- function (f, x) {
  V__t1 <- list()
  V__V__x4 <- x
  V__V__i9 <- 0
  while (V__V__i9 < V_35(V__V__x4)) {
    V__v3 <- V__V__x4[[V__V__i9 + 1]]
    V__y2 <- f(V__v3)
    if (is63(V__y2)) {
      add(V__t1, V__y2)
    }
    V__V__i9 <- V__V__i9 + 1
  }
  V__V__o4 <- x
  V__k3 <- NULL
  for (V__k3 in indices(V__V__o4)) {
    V__v4 <- V__V__o4[[V__k3]]
    if (! number63(V__k3)) {
      V__y3 <- f(V__v4)
      if (is63(V__y3)) {
        V__t1[[V__k3]] <<- V__y3
      }
    }
  }
  V__t1
}
keep <- function (f, x) {
  map(function (v) {
    if (yes(f(v))) {
      v
    }
  }, x)
}
keys63 <- function (t) {
  V__V__o5 <- t
  V__k4 <- NULL
  for (V__k4 in indices(V__V__o5)) {
    V__v5 <- V__V__o5[[V__k4]]
    if (! number63(V__k4)) {
      return TRUE
    }
  }
  FALSE
}
empty63 <- function (t) {
  V__V__o6 <- t
  V__V__i12 <- NULL
  for (V__V__i12 in indices(V__V__o6)) {
    V__x5 <- V__V__o6[[V__V__i12]]
    return FALSE
  }
  TRUE
}
stash <- function (args) {
  if (keys63(args)) {
    V__p <- list()
    V__V__o7 <- args
    V__k5 <- NULL
    for (V__k5 in indices(V__V__o7)) {
      V__v6 <- V__V__o7[[V__k5]]
      if (! number63(V__k5)) {
        V__p[[V__k5]] <<- V__v6
      }
    }
    V__p[["_stash"]] <<- TRUE
    add(args, V__p)
  }
  args
}
unstash <- function (args) {
  if (none63(args)) {
list()
  } else {
    V__l2 <- last(args)
    if (obj63(V__l2) && V__l2[["_stash"]]) {
      V__args1 <- almost(args)
      V__V__o8 <- V__l2
      V__k6 <- NULL
      for (V__k6 in indices(V__V__o8)) {
        V__v7 <- V__V__o8[[V__k6]]
        if (!( V__k6 == "_stash")) {
          V__args1[[V__k6]] <<- V__v7
        }
      }
      V__args1
    } else {
      args
    }
  }
}
destash33 <- function (l, args1) {
  if (obj63(l) && l[["_stash"]]) {
    V__V__o9 <- l
    V__k7 <- NULL
    for (V__k7 in indices(V__V__o9)) {
      V__v8 <- V__V__o9[[V__k7]]
      if (!( V__k7 == "_stash")) {
        args1[[V__k7]] <<- V__v8
      }
    }
  } else {
    l
  }
}
search <- function (s, pattern, start) {
}
split <- function (s, sep) {
  if (s == "" || sep == "") {
list()
  } else {
    V__l3 <- list()
    V__n12 <- V_35(sep)
    while (TRUE) {
      V__i16 <- search(s, sep)
      if (nil63(V__i16)) {
        break
      } else {
        add(V__l3, clip(s, 0, V__i16))
        s <- clip(s, V__i16 + V__n12)
      }
    }
    add(V__l3, s)
    V__l3
  }
}
cat <- function (...) {
  V__xs <- list(...)
  either(reduce(function (a, b) {
    cat(a, b)
  }, V__xs), "")
}
V_43 <- function (...) {
  V__xs1 <- list(...)
  either(reduce(function (a, b) {
    a + b
  }, V__xs1), 0)
}
V_45 <- function (...) {
  V__xs2 <- list(...)
  either(reduce(function (b, a) {
    a - b
  }, reverse(V__xs2)), 0)
}
V_42 <- function (...) {
  V__xs3 <- list(...)
  either(reduce(function (a, b) {
    a * b
  }, V__xs3), 1)
}
V_47 <- function (...) {
  V__xs4 <- list(...)
  either(reduce(function (b, a) {
    a / b
  }, reverse(V__xs4)), 1)
}
V_37 <- function (...) {
  V__xs5 <- list(...)
  either(reduce(function (b, a) {
    a % b
  }, reverse(V__xs5)), 0)
}
pairwise <- function (f, xs) {
  V__i17 <- 0
  while (V__i17 < edge(xs)) {
    V__a <- xs[[V__i17 + 1]]
    V__b <- xs[[V__i17 + 1 + 1]]
    if (! f(V__a, V__b)) {
      return FALSE
    }
    V__i17 <- V__i17 + 1
  }
  return TRUE
}
V_60 <- function (...) {
  V__xs6 <- list(...)
  pairwise(function (a, b) {
    a < b
  }, V__xs6)
}
V_62 <- function (...) {
  V__xs7 <- list(...)
  pairwise(function (a, b) {
    a > b
  }, V__xs7)
}
V_61 <- function (...) {
  V__xs8 <- list(...)
  pairwise(function (a, b) {
    a == b
  }, V__xs8)
}
V_6061 <- function (...) {
  V__xs9 <- list(...)
  pairwise(function (a, b) {
    a <= b
  }, V__xs9)
}
V_6261 <- function (...) {
  V__xs10 <- list(...)
  pairwise(function (a, b) {
    a >= b
  }, V__xs10)
}
number <- function (s) {
}
number_code63 <- function (n) {
  n > 47 && n < 58
}
numeric63 <- function (s) {
  V__n13 <- V_35(s)
  V__i18 <- 0
  while (V__i18 < V__n13) {
    if (! number_code63(code(s, V__i18))) {
      return FALSE
    }
    V__i18 <- V__i18 + 1
  }
  some63(s)
}
escape <- function (s) {
  V__s1 <- "\""
  V__i19 <- 0
  while (V__i19 < V_35(s)) {
    V__c <- char(s, V__i19)
    V__e2
    if (V__c == "\n") {
      V__e2 <- "\\n"
    } else {
      V__e3
      if (V__c == "\r") {
        V__e3 <- "\\r"
      } else {
        V__e4
        if (V__c == "\"") {
          V__e4 <- "\\\""
        } else {
          V__e5
          if (V__c == "\\") {
            V__e5 <- "\\\\"
          } else {
            V__e5 <- V__c
          }
          V__e4 <- V__e5
        }
        V__e3 <- V__e4
      }
      V__e2 <- V__e3
    }
    V__c1 <- V__e2
    V__s1 <- cat(V__s1, V__c1)
    V__i19 <- V__i19 + 1
  }
  cat(V__s1, "\"")
}
str <- function (x, stack) {
  if (nil63(x)) {
    "nil"
  } else {
    if (nan63(x)) {
      "nan"
    } else {
      if (x == inf) {
        "inf"
      } else {
        if (x == _inf) {
          "-inf"
        } else {
          if (boolean63(x)) {
            if (x) {
              "true"
            } else {
              "false"
            }
          } else {
            if (string63(x)) {
              escape(x)
            } else {
              if (atom63(x)) {
                tostring(x)
              } else {
                if (function63(x)) {
                  "function"
                } else {
                  if (stack && in63(x, stack)) {
                    "circular"
                  } else {
                    if (escape(tostring(x))) {
                      V__s <- "("
                      V__sp <- ""
                      V__xs11 <- list()
                      V__ks <- list()
                      V__l4 <- stack || list()
                      add(V__l4, x)
                      V__V__o10 <- x
                      V__k8 <- NULL
                      for (V__k8 in indices(V__V__o10)) {
                        V__v9 <- V__V__o10[[V__k8]]
                        if (number63(V__k8)) {
                          V__xs11[[V__k8]] <<- str(V__v9, V__l4)
                        } else {
                          add(V__ks, cat(V__k8, ":"))
                          add(V__ks, str(V__v9, V__l4))
                        }
                      }
                      drop(V__l4)
                      V__V__o11 <- join(V__xs11, V__ks)
                      V__V__i21 <- NULL
                      for (V__V__i21 in indices(V__V__o11)) {
                        V__v10 <- V__V__o11[[V__V__i21]]
                        V__s <- cat(V__s, V__sp, V__v10)
                        V__sp <- " "
                      }
                      cat(V__s, ")")
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
apply <- function (f, args) {
  V__args <- stash(args)
}
call <- function (f, ...) {
  V__V__r76 <- list(...)
  V__V__id <- V__V__r76
  V__args11 <- cut(V__V__id, 0)
  apply(f, V__args11)
}
setenv <- function (k, ...) {
  V__V__r77 <- list(...)
  V__V__id1 <- V__V__r77
  V__keys <- cut(V__V__id1, 0)
  V__env <- get_environment()
  if (string63(k)) {
    V__e6
    if (V__keys[["toplevel"]]) {
      V__e6 <- hd(V__env)
    } else {
      V__e6 <- last(V__env)
    }
    V__frame <- V__e6
    V__entry <- V__frame[[k]] || list()
    V__V__o12 <- V__keys
    V__k9 <- NULL
    for (V__k9 in indices(V__V__o12)) {
      V__v11 <- V__V__o12[[V__k9]]
      V__entry[[V__k9]] <<- V__v11
    }
    V__frame[[k]] <<- V__entry
V__frame[[k]]
  }
}
math
abs <- math[["abs"]]
acos <- math[["acos"]]
asin <- math[["asin"]]
atan <- math[["atan"]]
atan2 <- math[["atan2"]]
ceil <- math[["ceil"]]
cos <- math[["cos"]]
floor <- math[["floor"]]
log <- math[["log"]]
log10 <- math[["log10"]]
max <- math[["max"]]
min <- math[["min"]]
pow <- math[["pow"]]
random <- math[["random"]]
sin <- math[["sin"]]
sinh <- math[["sinh"]]
sqrt <- math[["sqrt"]]
tan <- math[["tan"]]
tanh <- math[["tanh"]]
trunc <- math[["floor"]]
setenv("quote", macro = function (form) {
  quoted(form)
})
setenv("quasiquote", macro = function (form) {
  quasiexpand(form, 1)
})
setenv("set", macro = function (...) {
  V__args1 <- list(...)
  join(list("do"), map(function (V__x3) {
    V__V__id1 <- V__x3
    V__lh1 <- V__V__id1[[1]]
    V__rh1 <- V__V__id1[[2]]
    list("%set", V__lh1, V__rh1)
  }, pair(V__args1)))
})
setenv("at", macro = function (l, i) {
  if ((target == "lua" || target == "r") && number63(i)) {
    i <- i + 1
  } else {
    if (target == "lua" || target == "r") {
      i <- list("+", i, 1)
    }
  }
  list("get", l, i)
})
setenv("wipe", macro = function (place) {
  if (target == "lua" || target == "r") {
    list("set", place, "nil")
  } else {
    list("%delete", place)
  }
})
setenv("list", macro = function (...) {
  V__body1 <- list(...)
  if (target == "r") {
    join(list("%call", "list"), V__body1)
  } else {
    V__x17 <- unique("x")
    V__l1 <- list()
    V__forms1 <- list()
    V__V__o1 <- V__body1
    V__k2 <- NULL
    for (V__k2 in indices(V__V__o1)) {
      V__v1 <- V__V__o1[[V__k2]]
      if (number63(V__k2)) {
        V__l1[[V__k2]] <<- V__v1
      } else {
        add(V__forms1, list("set", list("get", V__x17, list("quote", V__k2)), V__v1))
      }
    }
    if (some63(V__forms1)) {
      join(list("let", V__x17, join(list("%array"), V__l1)), V__forms1, list(V__x17))
    } else {
      join(list("%array"), V__l1)
    }
  }
})
setenv("if", macro = function (...) {
  V__branches1 <- list(...)
  hd(expand_if(V__branches1))
})
setenv("case", macro = function (expr, ...) {
  V__V__r13 <- list(...)
  V__V__id4 <- V__V__r13
  V__clauses1 <- cut(V__V__id4, 0)
  V__x29 <- unique("x")
  V__eq1 <- function (_) {
    list("=", list("quote", _), V__x29)
  }
  V__cl1 <- function (V__x30) {
    V__V__id5 <- V__x30
    V__a1 <- V__V__id5[[1]]
    V__b1 <- V__V__id5[[2]]
    if (nil63(V__b1)) {
      list(V__a1)
    } else {
      if (string63(V__a1) || number63(V__a1)) {
        list(V__eq1(V__a1), V__b1)
      } else {
        if (one63(V__a1)) {
          list(V__eq1(hd(V__a1)), V__b1)
        } else {
          if (V_35(V__a1) > 1) {
            list(join(list("or"), map(V__eq1, V__a1)), V__b1)
          }
        }
      }
    }
  }
  list("let", V__x29, expr, join(list("if"), apply(join, map(V__cl1, pair(V__clauses1)))))
})
setenv("when", macro = function (cond, ...) {
  V__V__r17 <- list(...)
  V__V__id7 <- V__V__r17
  V__body3 <- cut(V__V__id7, 0)
  list("if", cond, join(list("do"), V__body3))
})
setenv("unless", macro = function (cond, ...) {
  V__V__r19 <- list(...)
  V__V__id9 <- V__V__r19
  V__body5 <- cut(V__V__id9, 0)
  list("if", list("not", cond), join(list("do"), V__body5))
})
setenv("obj", macro = function (...) {
  V__body7 <- list(...)
  join(list("%object"), mapo(function (x) {
    x
  }, V__body7))
})
setenv("let", macro = function (bs, ...) {
  V__V__r23 <- list(...)
  V__V__id14 <- V__V__r23
  V__body9 <- cut(V__V__id14, 0)
  if (atom63(bs)) {
    join(list("let", list(bs, hd(V__body9))), tl(V__body9))
  } else {
    if (none63(bs)) {
      join(list("do"), V__body9)
    } else {
      V__V__id15 <- bs
      V__lh3 <- V__V__id15[[1]]
      V__rh3 <- V__V__id15[[2]]
      V__bs21 <- cut(V__V__id15, 2)
      V__V__id16 <- bind(V__lh3, V__rh3)
      V__id17 <- V__V__id16[[1]]
      V__val1 <- V__V__id16[[2]]
      V__bs11 <- cut(V__V__id16, 2)
      V__renames1 <- list()
      if (! id_literal63(V__id17)) {
        V__id121 <- unique(V__id17)
        V__renames1 <- list(V__id17, V__id121)
        V__id17 <- V__id121
      }
      list("do", list("%local", V__id17, V__val1), list("let-symbol", V__renames1, join(list("let", join(V__bs11, V__bs21)), V__body9)))
    }
  }
})
setenv("with", macro = function (x, v, ...) {
  V__V__r25 <- list(...)
  V__V__id19 <- V__V__r25
  V__body11 <- cut(V__V__id19, 0)
  join(list("let", list(x, v)), V__body11, list(x))
})
setenv("let-when", macro = function (x, v, ...) {
  V__V__r27 <- list(...)
  V__V__id21 <- V__V__r27
  V__body13 <- cut(V__V__id21, 0)
  V__y1 <- unique("y")
  list("let", V__y1, v, list("when", list("yes", V__y1), join(list("let", list(x, V__y1)), V__body13)))
})
setenv("define-macro", macro = function (name, args, ...) {
  V__V__r29 <- list(...)
  V__V__id23 <- V__V__r29
  V__body15 <- cut(V__V__id23, 0)
  V__form1 <- list("setenv", list("quote", name), macro = join(list("fn", args), V__body15))
  V_eval(V__form1)
  V__form1
})
setenv("define-special", macro = function (name, args, ...) {
  V__V__r31 <- list(...)
  V__V__id25 <- V__V__r31
  V__body17 <- cut(V__V__id25, 0)
  V__form3 <- join(list("setenv", list("quote", name), special = join(list("fn", args), V__body17)), keys(V__body17))
  V_eval(V__form3)
  V__form3
})
setenv("define-symbol", macro = function (name, expansion) {
  setenv(name, symbol = expansion)
  list("setenv", list("quote", name), symbol = list("quote", expansion))
})
setenv("define-reader", macro = function (V__x69, ...) {
  V__V__id28 <- V__x69
  V__char1 <- V__V__id28[[1]]
  V__s1 <- V__V__id28[[2]]
  V__V__r35 <- list(...)
  V__V__id29 <- V__V__r35
  V__body19 <- cut(V__V__id29, 0)
  list("set", list("get", "read-table", V__char1), join(list("fn", list(V__s1)), V__body19))
})
setenv("define", macro = function (name, x, ...) {
  V__V__r37 <- list(...)
  V__V__id31 <- V__V__r37
  V__body21 <- cut(V__V__id31, 0)
  setenv(name, variable = TRUE)
  if (some63(V__body21)) {
    join(list("%local-function", name), bind42(x, V__body21))
  } else {
    list("%local", name, x)
  }
})
setenv("define-global", macro = function (name, x, ...) {
  V__V__r39 <- list(...)
  V__V__id33 <- V__V__r39
  V__body23 <- cut(V__V__id33, 0)
  setenv(name, toplevel = TRUE, variable = TRUE)
  if (some63(V__body23)) {
    join(list("%global-function", name), bind42(x, V__body23))
  } else {
    list("set", name, x)
  }
})
setenv("with-frame", macro = function (...) {
  V__body25 <- list(...)
  V__x85 <- unique("x")
  list("do", list("add", list("get-environment"), list("obj")), list("with", V__x85, join(list("do"), V__body25), list("drop", list("get-environment"))))
})
setenv("with-bindings", macro = function (V__x91, ...) {
  V__V__id36 <- V__x91
  V__names1 <- V__V__id36[[1]]
  V__V__r41 <- list(...)
  V__V__id37 <- V__V__r41
  V__body27 <- cut(V__V__id37, 0)
  V__x92 <- unique("x")
  join(list("with-frame", list("each", V__x92, V__names1, list("setenv", V__x92, variable = TRUE))), V__body27)
})
setenv("let-macro", macro = function (definitions, ...) {
  V__V__r44 <- list(...)
  V__V__id39 <- V__V__r44
  V__body29 <- cut(V__V__id39, 0)
  add(get_environment(), list())
  map(function (m) {
    macroexpand(join(list("define-macro"), m))
  }, definitions)
  V__V__x96 <- join(list("do"), macroexpand(V__body29))
  drop(get_environment())
  V__V__x96
})
setenv("let-symbol", macro = function (expansions, ...) {
  V__V__r48 <- list(...)
  V__V__id42 <- V__V__r48
  V__body31 <- cut(V__V__id42, 0)
  add(get_environment(), list())
  map(function (V__x102) {
    V__V__id43 <- V__x102
    V__name5 <- V__V__id43[[1]]
    V__exp1 <- V__V__id43[[2]]
    macroexpand(list("define-symbol", V__name5, V__exp1))
  }, pair(expansions))
  V__V__x101 <- join(list("do"), macroexpand(V__body31))
  drop(get_environment())
  V__V__x101
})
setenv("let-unique", macro = function (names, ...) {
  V__V__r52 <- list(...)
  V__V__id45 <- V__V__r52
  V__body33 <- cut(V__V__id45, 0)
  V__bs22 <- map(function (n) {
    list(n, list("unique", list("quote", n)))
  }, names)
  join(list("let", apply(join, V__bs22)), V__body33)
})
setenv("fn", macro = function (args, ...) {
  V__V__r55 <- list(...)
  V__V__id47 <- V__V__r55
  V__body35 <- cut(V__V__id47, 0)
  join(list("%function"), bind42(args, V__body35))
})
setenv("apply", macro = function (f, ...) {
  V__V__r57 <- list(...)
  V__V__id49 <- V__V__r57
  V__args6 <- cut(V__V__id49, 0)
  if (V_35(V__args6) > 1) {
    list("%call", "apply", f, list("join", join(list("list"), almost(V__args6)), last(V__args6)))
  } else {
    join(list("%call", "apply", f), V__args6)
  }
})
setenv("guard", macro = function (expr) {
  if (target == "js") {
    list(list("fn", join(), list("%try", list("list", TRUE, expr))))
  } else {
    list("list", list("xpcall", list("fn", join(), expr), list("fn", list("m"), list("if", list("obj?", "m"), "m", list("obj", stack = list(list("get", "debug", list("quote", "traceback"))), message = list("if", list("string?", "m"), list("clip", "m", list("+", list("or", list("search", "m", "\": \""), -2), 2)), list("nil?", "m"), "\"\"", list("str", "m")))))))
  }
})
setenv("each", macro = function (x, t, ...) {
  V__V__r61 <- list(...)
  V__V__id52 <- V__V__r61
  V__body37 <- cut(V__V__id52, 0)
  V__o3 <- unique("o")
  V__n3 <- unique("n")
  V__i3 <- unique("i")
  V__e9
  if (atom63(x)) {
    V__e9 <- list(V__i3, x)
  } else {
    V__e10
    if (V_35(x) > 1) {
      V__e10 <- x
    } else {
      V__e10 <- list(V__i3, hd(x))
    }
    V__e9 <- V__e10
  }
  V__V__id53 <- V__e9
  V__k4 <- V__V__id53[[1]]
  V__v5 <- V__V__id53[[2]]
  V__e11
  if (target == "r") {
    V__e11 <- list("indices", V__o3)
  } else {
    V__e11 <- V__o3
  }
  V__e12
  if (target == "lua" || target == "r") {
    V__e12 <- V__body37
  } else {
    V__e12 <- list(join(list("let", V__k4, list("if", list("numeric?", V__k4), list("parseInt", V__k4), V__k4)), V__body37))
  }
  list("let", list(V__o3, t, V__k4, "nil"), list("%for", V__e11, V__k4, join(list("let", list(V__v5, list("get", V__o3, V__k4))), V__e12)))
})
setenv("for", macro = function (i, to, ...) {
  V__V__r63 <- list(...)
  V__V__id55 <- V__V__r63
  V__body39 <- cut(V__V__id55, 0)
  list("let", i, 0, join(list("while", list("<", i, to)), V__body39, list(list("inc", i))))
})
setenv("step", macro = function (v, t, ...) {
  V__V__r65 <- list(...)
  V__V__id57 <- V__V__r65
  V__body41 <- cut(V__V__id57, 0)
  V__x163 <- unique("x")
  V__i6 <- unique("i")
  list("let", list(V__x163, t), list("for", V__i6, list("#", V__x163), join(list("let", list(v, list("at", V__x163, V__i6))), V__body41)))
})
setenv("set-of", macro = function (...) {
  V__xs1 <- list(...)
  V__l3 <- list()
  V__V__o5 <- V__xs1
  V__V__i8 <- NULL
  for (V__V__i8 in indices(V__V__o5)) {
    V__x166 <- V__V__o5[[V__V__i8]]
    V__l3[[V__x166]] <<- TRUE
  }
  join(list("obj"), V__l3)
})
setenv("language", macro = function () {
  list("quote", target)
})
setenv("target", macro = function (...) {
  V__clauses3 <- list(...)
V__clauses3[[target]]
})
setenv("join!", macro = function (a, ...) {
  V__V__r69 <- list(...)
  V__V__id59 <- V__V__r69
  V__bs4 <- cut(V__V__id59, 0)
  list("set", a, join(list("join", a), V__bs4))
})
setenv("cat!", macro = function (a, ...) {
  V__V__r71 <- list(...)
  V__V__id61 <- V__V__r71
  V__bs6 <- cut(V__V__id61, 0)
  list("set", a, join(list("cat", a), V__bs6))
})
setenv("inc", macro = function (n, by) {
  V__e13
  if (nil63(by)) {
    V__e13 <- 1
  } else {
    V__e13 <- by
  }
  list("set", n, list("+", n, V__e13))
})
setenv("dec", macro = function (n, by) {
  V__e14
  if (nil63(by)) {
    V__e14 <- 1
  } else {
    V__e14 <- by
  }
  list("set", n, list("-", n, V__e14))
})
setenv("with-indent", macro = function (form) {
  V__x181 <- unique("x")
  list("do", list("inc", "indent-level"), list("with", V__x181, form, list("dec", "indent-level")))
})
setenv("export", macro = function (...) {
  V__names4 <- list(...)
  if (target == "js") {
    join(list("do"), map(function (k) {
      list("set", list("get", "exports", list("quote", k)), k)
    }, V__names4))
  } else {
    V__x189 <- list()
    V__V__o7 <- V__names4
    V__V__i10 <- NULL
    for (V__V__i10 in indices(V__V__o7)) {
      V__k6 <- V__V__o7[[V__V__i10]]
      V__x189[[V__k6]] <<- V__k6
    }
    list("return", join(list("%object"), mapo(function (x) {
      x
    }, V__x189)))
  }
})
setenv("when-compiling", macro = function (...) {
  V__body43 <- list(...)
  V_eval(join(list("do"), V__body43))
})
setenv("during-compilation", macro = function (...) {
  V__body45 <- list(...)
  V__form5 <- join(list("do"), V__body45)
  V_eval(V__form5)
  V__form5
})
reader <- require("reader")
compiler <- require("compiler")
system <- require("system")
eval_print <- function (form) {
  V__V__id <- list(xpcall(function () {
    compiler[["eval"]](form)
  }, function (m) {
    if (obj63(m)) {
      m
    } else {
      V__e
      if (string63(m)) {
        V__e <- clip(m, (search(m, ": ") || -2) + 2)
      } else {
        V__e1
        if (nil63(m)) {
          V__e1 <- ""
        } else {
          V__e1 <- str(m)
        }
        V__e <- V__e1
      }
list(stack = debug[["traceback"]](), message = V__e)
    }
  }))
  V__ok <- V__V__id[[1]]
  V__v <- V__V__id[[2]]
  if (! V__ok) {
    if (is63(V__v)) {
      print(str(V__v))
    }
  }
}
rep <- function (s) {
  eval_print(reader[["read-string"]](s))
}
repl <- function () {
  V__buf <- ""
  rep1 <- function (s) {
    V__buf <- cat(V__buf, s)
    V__more <- list()
    V__form <- reader[["read-string"]](V__buf, V__more)
    if (!( V__form == V__more)) {
      eval_print(V__form)
      V__buf <- ""
      system[["write"]]("> ")
    }
  }
  system[["write"]]("> ")
}
compile_file <- function (path) {
  V__s <- reader[["stream"]](system[["read-file"]](path))
  V__body <- reader[["read-all"]](V__s)
  V__form1 <- compiler[["expand"]](join(list("do"), V__body))
  compiler[["compile"]](V__form1, stmt = TRUE)
}
V_load <- function (path) {
  V__previous <- target
  target <- "r"
  V__code <- compile_file(path)
  target <- V__previous
  compiler[["run"]](V__code)
}
script_file63 <- function (path) {
  !( "-" == char(path, 0) || ".js" == clip(path, V_35(path) - 3) || ".lua" == clip(path, V_35(path) - 4))
}
run_file <- function (path) {
  if (script_file63(path)) {
    V_load(path)
  } else {
    compiler[["run"]](system[["read-file"]](path))
  }
}
usage <- function () {
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  print(" -e <expr>\tExpression to evaluate")
}
main <- function () {
  V__arg <- hd(system[["argv"]])
  if (V__arg && script_file63(V__arg)) {
    V_load(V__arg)
  } else {
    if (V__arg == "-h" || V__arg == "--help") {
      usage()
    } else {
      V__pre <- list()
      V__input <- NULL
      V__output <- NULL
      V__target1 <- NULL
      V__expr <- NULL
      V__argv <- system[["argv"]]
      V__i <- 0
      while (V__i < V_35(V__argv)) {
        V__a <- V__argv[[V__i + 1]]
        if (V__a == "-c" || V__a == "-o" || V__a == "-t" || V__a == "-e") {
          if (V__i == edge(V__argv)) {
            print(cat("missing argument for ", V__a))
          } else {
            V__i <- V__i + 1
            V__val <- V__argv[[V__i + 1]]
            if (V__a == "-c") {
              V__input <- V__val
            } else {
              if (V__a == "-o") {
                V__output <- V__val
              } else {
                if (V__a == "-t") {
                  V__target1 <- V__val
                } else {
                  if (V__a == "-e") {
                    V__expr <- V__val
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" == char(V__a, 0))) {
            add(V__pre, V__a)
          }
        }
        V__i <- V__i + 1
      }
      V__V__x <- V__pre
      V__V__i1 <- 0
      while (V__V__i1 < V_35(V__V__x)) {
        V__file <- V__V__x[[V__V__i1 + 1]]
        run_file(V__file)
        V__V__i1 <- V__V__i1 + 1
      }
      if (nil63(V__input)) {
        if (V__expr) {
          rep(V__expr)
        } else {
          repl()
        }
      } else {
        if (V__target1) {
          target <- V__target1
        }
        V__code1 <- compile_file(V__input)
        if (nil63(V__output) || V__output == "-") {
          print(V__code1)
        } else {
          system[["write-file"]](V__output, V__code1)
        }
      }
    }
  }
}
main()
