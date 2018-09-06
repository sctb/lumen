getenv <- function (k, p, env) {
  V__env <- env || get_environment()
  if (string63(k)) {
    V__i <- edge(V__env)
    while (V__i >= 0) {
      V__b <- V__env[[V__i + 1]][[k]]
      if (is63(V__b)) {
        V__e29
        if (p) {
          V__e29 <- V__b[[p]]
        } else {
          V__e29 <- V__b
        }
        return V__e29
      } else {
        V__i <- V__i - 1
      }
    }
  }
}
macro_function <- function (k) {
  getenv(k, "macro")
}
macro63 <- function (k) {
  is63(macro_function(k))
}
special63 <- function (k) {
  is63(getenv(k, "special"))
}
special_form63 <- function (form) {
  ! atom63(form) && special63(hd(form))
}
statement63 <- function (k) {
  special63(k) && getenv(k, "stmt")
}
symbol_expansion <- function (k) {
  getenv(k, "symbol")
}
symbol63 <- function (k) {
  is63(symbol_expansion(k))
}
variable63 <- function (k) {
  is63(getenv(k, "variable"))
}
bound63 <- function (x) {
  macro63(x) || special63(x) || symbol63(x) || variable63(x)
}
quoted <- function (form) {
  if (string63(form)) {
    escape(form)
  } else {
    if (atom63(form)) {
      form
    } else {
      join(list("list"), map(quoted, form))
    }
  }
}
literal <- function (s) {
  if (string_literal63(s)) {
    s
  } else {
    quoted(s)
  }
}
stash42 <- function (args) {
  if (keys63(args)) {
    V__l <- list("%stash")
    V__V__o <- args
    V__k <- NULL
    for (V__k in indices(V__V__o)) {
      V__v <- V__V__o[[V__k]]
      if (! number63(V__k)) {
        add(V__l, list(literal(V__k), V__v))
      }
    }
    join(args, list(V__l))
  } else {
    args
  }
}
bias <- function (k) {
  if (number63(k) && !( target == "r")) {
    if (target == "js") {
      k <- k - 1
    } else {
      k <- k + 1
    }
  }
  k
}
bind <- function (lh, rh) {
  if (atom63(lh)) {
    list(lh, rh)
  } else {
    V__id <- unique("id")
    V__bs <- list(V__id, rh)
    V__V__o1 <- lh
    V__k1 <- NULL
    for (V__k1 in indices(V__V__o1)) {
      V__v1 <- V__V__o1[[V__k1]]
      V__e30
      if (V__k1 == "rest") {
        V__e30 <- list("cut", V__id, V_35(lh))
      } else {
        V__e30 <- list("get", V__id, list("quote", bias(V__k1)))
      }
      V__x <- V__e30
      if (is63(V__k1)) {
        V__e31
        if (V__v1 == TRUE) {
          V__e31 <- V__k1
        } else {
          V__e31 <- V__v1
        }
        V__k2 <- V__e31
        V__bs <- join(V__bs, bind(V__k2, V__x))
      }
    }
    V__bs
  }
}
setenv("arguments%", macro = function (from) {
  list(list("get", list("get", list("get", "Array", list("quote", "prototype")), list("quote", "slice")), list("quote", "call")), "arguments", from)
})
bind42 <- function (args, body) {
  V__args1 <- list()
  rest <- function () {
    V__args1[["rest"]] <<- TRUE
    if (target == "js") {
      list("unstash", list("arguments%", V_35(V__args1)))
    } else {
      if (target == "r") {
        list("list", "|...|")
      } else {
        list("unstash", list("list", "|...|"))
      }
    }
  }
  if (atom63(args)) {
    list(V__args1, join(list("let", list(args, rest())), body))
  } else {
    V__bs1 <- list()
    V__r19 <- unique("r")
    V__V__o2 <- args
    V__k3 <- NULL
    for (V__k3 in indices(V__V__o2)) {
      V__v2 <- V__V__o2[[V__k3]]
      if (number63(V__k3)) {
        if (atom63(V__v2)) {
          add(V__args1, V__v2)
        } else {
          V__x8 <- unique("x")
          add(V__args1, V__x8)
          V__bs1 <- join(V__bs1, list(V__v2, V__x8))
        }
      }
    }
    if (keys63(args)) {
      V__bs1 <- join(V__bs1, list(V__r19, rest()))
      if (!( target == "r")) {
        V__n3 <- V_35(V__args1)
        V__i4 <- 0
        while (V__i4 < V__n3) {
          V__v3 <- V__args1[[V__i4 + 1]]
          V__bs1 <- join(V__bs1, list(V__v3, list("destash!", V__v3, V__r19)))
          V__i4 <- V__i4 + 1
        }
      }
      V__bs1 <- join(V__bs1, list(keys(args), V__r19))
    }
    list(V__args1, join(list("let", V__bs1), body))
  }
}
quoting63 <- function (depth) {
  number63(depth)
}
quasiquoting63 <- function (depth) {
  quoting63(depth) && depth > 0
}
can_unquote63 <- function (depth) {
  quoting63(depth) && depth == 1
}
quasisplice63 <- function (x, depth) {
  can_unquote63(depth) && ! atom63(x) && hd(x) == "unquote-splicing"
}
expand_local <- function (V__x9) {
  V__V__id1 <- V__x9
  V__x10 <- V__V__id1[[1]]
  V__name <- V__V__id1[[2]]
  V__value <- V__V__id1[[3]]
  setenv(V__name, variable = TRUE)
  list("%local", V__name, macroexpand(V__value))
}
expand_function <- function (V__x11) {
  V__V__id2 <- V__x11
  V__x12 <- V__V__id2[[1]]
  V__args <- V__V__id2[[2]]
  V__body <- cut(V__V__id2, 2)
  add(get_environment(), list())
  V__V__o3 <- V__args
  V__V__i5 <- NULL
  for (V__V__i5 in indices(V__V__o3)) {
    V__V__x13 <- V__V__o3[[V__V__i5]]
    setenv(V__V__x13, variable = TRUE)
  }
  V__V__x14 <- join(list("%function", V__args), macroexpand(V__body))
  drop(get_environment())
  V__V__x14
}
expand_definition <- function (V__x15) {
  V__V__id3 <- V__x15
  V__x16 <- V__V__id3[[1]]
  V__name1 <- V__V__id3[[2]]
  V__args11 <- V__V__id3[[3]]
  V__body1 <- cut(V__V__id3, 3)
  add(get_environment(), list())
  V__V__o4 <- V__args11
  V__V__i6 <- NULL
  for (V__V__i6 in indices(V__V__o4)) {
    V__V__x17 <- V__V__o4[[V__V__i6]]
    setenv(V__V__x17, variable = TRUE)
  }
  V__V__x18 <- join(list(V__x16, V__name1, V__args11), macroexpand(V__body1))
  drop(get_environment())
  V__V__x18
}
expand_macro <- function (form) {
  macroexpand(expand1(form))
}
expand1 <- function (V__x19) {
  V__V__id4 <- V__x19
  V__name2 <- V__V__id4[[1]]
  V__body2 <- cut(V__V__id4, 1)
  apply(macro_function(V__name2), V__body2)
}
macroexpand <- function (form) {
  if (symbol63(form)) {
    macroexpand(symbol_expansion(form))
  } else {
    if (atom63(form)) {
      form
    } else {
      V__x20 <- hd(form)
      if (V__x20 == "%local") {
        expand_local(form)
      } else {
        if (V__x20 == "%function") {
          expand_function(form)
        } else {
          if (V__x20 == "%global-function") {
            expand_definition(form)
          } else {
            if (V__x20 == "%local-function") {
              expand_definition(form)
            } else {
              if (macro63(V__x20)) {
                expand_macro(form)
              } else {
                map(macroexpand, form)
              }
            }
          }
        }
      }
    }
  }
}
quasiquote_list <- function (form, depth) {
  V__xs <- list(list("list"))
  V__V__o5 <- form
  V__k4 <- NULL
  for (V__k4 in indices(V__V__o5)) {
    V__v4 <- V__V__o5[[V__k4]]
    if (! number63(V__k4)) {
      V__e32
      if (quasisplice63(V__v4, depth)) {
        V__e32 <- quasiexpand(V__v4[[2]])
      } else {
        V__e32 <- quasiexpand(V__v4, depth)
      }
      V__v5 <- V__e32
      last(V__xs)[[V__k4]] <<- V__v5
    }
  }
  V__V__x21 <- form
  V__V__i8 <- 0
  while (V__V__i8 < V_35(V__V__x21)) {
    V__x22 <- V__V__x21[[V__V__i8 + 1]]
    if (quasisplice63(V__x22, depth)) {
      V__x23 <- quasiexpand(V__x22[[2]])
      add(V__xs, V__x23)
      add(V__xs, list("list"))
    } else {
      add(last(V__xs), quasiexpand(V__x22, depth))
    }
    V__V__i8 <- V__V__i8 + 1
  }
  V__pruned <- keep(function (x) {
    V_35(x) > 1 || !( hd(x) == "list") || keys63(x)
  }, V__xs)
  if (one63(V__pruned)) {
    hd(V__pruned)
  } else {
    join(list("join"), V__pruned)
  }
}
quasiexpand <- function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      list("quote", form)
    } else {
      if (can_unquote63(depth) && hd(form) == "unquote") {
        quasiexpand(form[[2]])
      } else {
        if (hd(form) == "unquote" || hd(form) == "unquote-splicing") {
          quasiquote_list(form, depth - 1)
        } else {
          if (hd(form) == "quasiquote") {
            quasiquote_list(form, depth + 1)
          } else {
            quasiquote_list(form, depth)
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      form
    } else {
      if (hd(form) == "quote") {
        form
      } else {
        if (hd(form) == "quasiquote") {
          quasiexpand(form[[2]], 1)
        } else {
          map(function (x) {
            quasiexpand(x, depth)
          }, form)
        }
      }
    }
  }
}
expand_if <- function (V__x24) {
  V__V__id5 <- V__x24
  V__a <- V__V__id5[[1]]
  V__b1 <- V__V__id5[[2]]
  V__c <- cut(V__V__id5, 2)
  if (is63(V__b1)) {
    list(join(list("%if", V__a, V__b1), expand_if(V__c)))
  } else {
    if (is63(V__a)) {
      list(V__a)
    }
  }
}
indent_level <- 0
indentation <- function () {
  V__s <- ""
  V__i9 <- 0
  while (V__i9 < indent_level) {
    V__s <- cat(V__s, "  ")
    V__i9 <- V__i9 + 1
  }
  V__s
}
reserved <- list("=" = TRUE, "==" = TRUE, "+" = TRUE, "-" = TRUE, "%" = TRUE, "*" = TRUE, "/" = TRUE, "<" = TRUE, ">" = TRUE, "<=" = TRUE, ">=" = TRUE, "break" = TRUE, "case" = TRUE, "catch" = TRUE, "class" = TRUE, "const" = TRUE, "continue" = TRUE, "debugger" = TRUE, "default" = TRUE, "delete" = TRUE, "do" = TRUE, "else" = TRUE, "eval" = TRUE, "finally" = TRUE, "for" = TRUE, "function" = TRUE, "if" = TRUE, "import" = TRUE, "in" = TRUE, "instanceof" = TRUE, "let" = TRUE, "new" = TRUE, "return" = TRUE, "switch" = TRUE, "throw" = TRUE, "try" = TRUE, "typeof" = TRUE, "var" = TRUE, "void" = TRUE, "with" = TRUE, "and" = TRUE, "end" = TRUE, "load" = TRUE, "repeat" = TRUE, "while" = TRUE, "false" = TRUE, "local" = TRUE, "nil" = TRUE, "then" = TRUE, "not" = TRUE, "true" = TRUE, "elseif" = TRUE, "or" = TRUE, "until" = TRUE)
reserved63 <- function (x) {
  has63(reserved, x)
}
valid_code63 <- function (n) {
  number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n == 95
}
accessor_prefix <- list("." = TRUE, "@" = TRUE, "$" = TRUE, "\\" = TRUE, ":" = TRUE)
accessor_id63 <- function (x) {
  string63(x) && accessor_prefix[[char(x, 0)]] && some63(char(x, 1)) && ! accessor_prefix[[char(x, 1)]]
}
prefix <- function (id) {
  if (target == "r") {
    cat("V", id)
  } else {
    id
  }
}
compile_id <- function (id, raw63) {
  V__e33
  if (raw63) {
    V__e33 <- id
  } else {
    V__e34
    if (accessor_id63(id)) {
      V__e34 <- clip(id, 1)
    } else {
      V__e34 <- id
    }
    V__e33 <- V__e34
  }
  V__id0 <- V__e33
  V__e35
  if (raw63) {
    V__e35 <- ""
  } else {
    V__e36
    if (number_code63(code(V__id0, 0))) {
      V__e36 <- prefix("_")
    } else {
      V__e36 <- ""
    }
    V__e35 <- V__e36
  }
  V__id11 <- V__e35
  V__i10 <- 0
  while (V__i10 < V_35(V__id0)) {
    V__c1 <- char(V__id0, V__i10)
    V__n7 <- code(V__c1)
    V__e37
    if (V__c1 == "-" && !( V__id0 == "-")) {
      V__e37 <- "_"
    } else {
      V__e38
      if (valid_code63(V__n7)) {
        V__e38 <- V__c1
      } else {
        V__e39
        if (V__i10 == 0) {
          V__e39 <- cat(prefix("_"), V__n7)
        } else {
          V__e39 <- V__n7
        }
        V__e38 <- V__e39
      }
      V__e37 <- V__e38
    }
    V__c11 <- V__e37
    V__id11 <- cat(V__id11, V__c11)
    V__i10 <- V__i10 + 1
  }
  V__e40
  if (reserved63(V__id11)) {
    V__e40 <- cat(prefix("_"), V__id11)
  } else {
    V__e40 <- V__id11
  }
  V__id21 <- V__e40
  if (id == V__id0) {
    V__id21
  } else {
    cat(char(id, 0), V__id21)
  }
}
valid_id63 <- function (x) {
  some63(x) && x == compile_id(x, "raw")
}
V__names <- list()
unique <- function (x) {
  V__x25 <- compile_id(x)
  if (V__names[[V__x25]]) {
    V__i11 <- V__names[[V__x25]]
    V__names[[V__x25]] <<- V__names[[V__x25]] + 1
    unique(cat(V__x25, V__i11))
  } else {
    V__names[[V__x25]] <<- 1
    cat(prefix("__"), V__x25)
  }
}
key <- function (k) {
  V__i12 <- inner(k)
  if (valid_id63(V__i12)) {
    V__i12
  } else {
    if (target == "js") {
      k
    } else {
      if (target == "r") {
        k
      } else {
        cat("[", k, "]")
      }
    }
  }
}
mapo <- function (f, t) {
  V__o6 <- list()
  V__V__o7 <- t
  V__k5 <- NULL
  for (V__k5 in indices(V__V__o7)) {
    V__v6 <- V__V__o7[[V__k5]]
    V__x26 <- f(V__v6)
    if (is63(V__x26)) {
      add(V__o6, literal(V__k5))
      add(V__o6, V__x26)
    }
  }
  V__o6
}
infix <- list(list(not = list(r = "!", js = "!", lua = "not")), list(* = TRUE, / = TRUE, % = TRUE), list(cat = list(js = "+", lua = "..")), list(+ = TRUE, - = TRUE), list(< = TRUE, > = TRUE, <= = TRUE, >= = TRUE), list(= = list(r = "==", js = "===", lua = "==")), list(and = list(r = "&&", js = "&&", lua = "and")), list(or = list(r = "||", js = "||", lua = "or")))
unary63 <- function (form) {
  two63(form) && in63(hd(form), list("not", "-"))
}
index <- function (k) {
  if (number63(k)) {
    k - 1
  }
}
precedence <- function (form) {
  if (!( atom63(form) || unary63(form))) {
    V__V__o8 <- infix
    V__k6 <- NULL
    for (V__k6 in indices(V__V__o8)) {
      V__v7 <- V__V__o8[[V__k6]]
      if (V__v7[[hd(form)]]) {
        return index(V__k6)
      }
    }
  }
  0
}
getop <- function (op) {
  find(function (level) {
    V__x27 <- level[[op]]
    if (V__x27 == TRUE) {
      op
    } else {
      if (is63(V__x27)) {
V__x27[[target]]
      }
    }
  }, infix)
}
infix63 <- function (x) {
  is63(getop(x))
}
infix_operator63 <- function (x) {
  obj63(x) && infix63(hd(x))
}
compile_args <- function (args) {
  V__s1 <- "("
  V__c2 <- ""
  V__V__x28 <- args
  V__V__i15 <- 0
  while (V__V__i15 < V_35(V__V__x28)) {
    V__x29 <- V__V__x28[[V__V__i15 + 1]]
    V__s1 <- cat(V__s1, V__c2, compile(V__x29))
    V__c2 <- ", "
    V__V__i15 <- V__V__i15 + 1
  }
  cat(V__s1, ")")
}
escape_newlines <- function (s) {
  V__s11 <- ""
  V__i16 <- 0
  while (V__i16 < V_35(s)) {
    V__c3 <- char(s, V__i16)
    V__e41
    if (V__c3 == "\n") {
      V__e41 <- "\\n"
    } else {
      V__e42
      if (V__c3 == "\r") {
        V__e42 <- "\\r"
      } else {
        V__e42 <- V__c3
      }
      V__e41 <- V__e42
    }
    V__s11 <- cat(V__s11, V__e41)
    V__i16 <- V__i16 + 1
  }
  V__s11
}
compile_nil <- function (x) {
  if (target == "lua") {
    "nil"
  } else {
    if (target == "js") {
      "undefined"
    } else {
      if (target == "r") {
        "NULL"
      } else {
        "nil"
      }
    }
  }
}
compile_boolean <- function (x) {
  if (target == "r") {
    if (x) {
      "TRUE"
    } else {
      "FALSE"
    }
  } else {
    if (x) {
      "true"
    } else {
      "false"
    }
  }
}
compile_atom <- function (x) {
  if (x == "nil") {
    compile_nil(x)
  } else {
    if (id_literal63(x)) {
      inner(x)
    } else {
      if (string_literal63(x)) {
        escape_newlines(x)
      } else {
        if (string63(x)) {
          compile_id(x)
        } else {
          if (boolean63(x)) {
            compile_boolean(x)
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
                  if (number63(x)) {
                    cat(x, "")
                  } else {
                    error(cat("Cannot compile atom: ", str(x)))
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
terminator <- function (stmt63) {
  if (! stmt63) {
    ""
  } else {
    if (target == "js") {
      ";\n"
    } else {
      "\n"
    }
  }
}
compile_special <- function (form, stmt63) {
  V__V__id6 <- form
  V__x30 <- V__V__id6[[1]]
  V__args2 <- cut(V__V__id6, 1)
  V__V__id7 <- getenv(V__x30)
  V__special <- V__V__id7[["special"]]
  V__stmt <- V__V__id7[["stmt"]]
  V__self_tr63 <- V__V__id7[["tr"]]
  V__tr <- terminator(stmt63 && ! V__self_tr63)
  cat(apply(V__special, V__args2), V__tr)
}
parenthesize_call63 <- function (x) {
  ! atom63(x) && hd(x) == "%function" || precedence(x) > 0
}
compile_call <- function (form) {
  V__f <- hd(form)
  V__f1 <- compile(V__f)
  V__args3 <- compile_args(stash42(tl(form)))
  if (parenthesize_call63(V__f)) {
    cat("(", V__f1, ")", V__args3)
  } else {
    cat(V__f1, V__args3)
  }
}
op_delims <- function (parent, child, ...) {
  V__V__r61 <- list(...)
  V__V__id8 <- V__V__r61
  V__right <- V__V__id8[["right"]]
  V__e43
  if (V__right) {
    V__e43 <- V_6261
  } else {
    V__e43 <- V_62
  }
  if (V__e43(precedence(child), precedence(parent))) {
    list("(", ")")
  } else {
    list("", "")
  }
}
compile_infix <- function (form) {
  V__V__id9 <- form
  V__op <- V__V__id9[[1]]
  V__V__id10 <- cut(V__V__id9, 1)
  V__a1 <- V__V__id10[[1]]
  V__b2 <- V__V__id10[[2]]
  V__V__id111 <- op_delims(form, V__a1)
  V__ao <- V__V__id111[[1]]
  V__ac <- V__V__id111[[2]]
  V__V__id12 <- op_delims(form, V__b2, right = TRUE)
  V__bo <- V__V__id12[[1]]
  V__bc <- V__V__id12[[2]]
  V__a2 <- compile(V__a1)
  V__b3 <- compile(V__b2)
  V__op1 <- getop(V__op)
  if (unary63(form)) {
    cat(V__op1, V__ao, " ", V__a2, V__ac)
  } else {
    cat(V__ao, V__a2, V__ac, " ", V__op1, " ", V__bo, V__b3, V__bc)
  }
}
compile_function <- function (args, body, ...) {
  V__V__r63 <- list(...)
  V__V__id13 <- V__V__r63
  V__name3 <- V__V__id13[["name"]]
  V__prefix <- V__V__id13[["prefix"]]
  V__e44
  if (V__name3) {
    V__e44 <- compile(V__name3)
  } else {
    V__e44 <- ""
  }
  V__id14 <- V__e44
  V__e45
  if ((target == "lua" || target == "r") && args[["rest"]]) {
    V__e45 <- join(args, list("|...|"))
  } else {
    V__e45 <- args
  }
  V__args12 <- V__e45
  V__args4 <- compile_args(V__args12)
  indent_level <- indent_level + 1
  V__V__x31 <- compile(body, stmt = TRUE)
  indent_level <- indent_level - 1
  V__body3 <- V__V__x31
  V__ind <- indentation()
  V__e46
  if (V__prefix) {
    V__e46 <- cat(V__prefix, " ")
  } else {
    V__e46 <- ""
  }
  V__p <- V__e46
  V__e47
  if (target == "lua") {
    V__e47 <- "end"
  } else {
    V__e47 <- ""
  }
  V__tr1 <- V__e47
  if (V__name3) {
    V__tr1 <- cat(V__tr1, "\n")
  }
  if (target == "lua") {
    cat(V__p, "function ", V__id14, V__args4, "\n", V__body3, V__ind, V__tr1)
  } else {
    cat("function ", V__id14, V__args4, " {\n", V__body3, V__ind, "}", V__tr1)
  }
}
can_return63 <- function (form) {
  is63(form) && !( target == "r") && (atom63(form) || !( hd(form) == "return") && ! statement63(hd(form)))
}
compile <- function (form, ...) {
  V__V__r65 <- list(...)
  V__V__id15 <- V__V__r65
  V__stmt1 <- V__V__id15[["stmt"]]
  if (nil63(form)) {
    ""
  } else {
    if (special_form63(form)) {
      compile_special(form, V__stmt1)
    } else {
      V__tr2 <- terminator(V__stmt1)
      V__e48
      if (V__stmt1) {
        V__e48 <- indentation()
      } else {
        V__e48 <- ""
      }
      V__ind1 <- V__e48
      V__e49
      if (atom63(form)) {
        V__e49 <- compile_atom(form)
      } else {
        V__e50
        if (infix63(hd(form))) {
          V__e50 <- compile_infix(form)
        } else {
          V__e50 <- compile_call(form)
        }
        V__e49 <- V__e50
      }
      V__form <- V__e49
      cat(V__ind1, V__form, V__tr2)
    }
  }
}
lower_statement <- function (form, tail63) {
  V__hoist <- list()
  V__e <- lower(form, V__hoist, TRUE, tail63)
  V__e51
  if (some63(V__hoist) && is63(V__e)) {
    V__e51 <- join(list("do"), V__hoist, list(V__e))
  } else {
    V__e52
    if (is63(V__e)) {
      V__e52 <- V__e
    } else {
      V__e53
      if (V_35(V__hoist) > 1) {
        V__e53 <- join(list("do"), V__hoist)
      } else {
        V__e53 <- hd(V__hoist)
      }
      V__e52 <- V__e53
    }
    V__e51 <- V__e52
  }
  either(V__e51, list("do"))
}
lower_body <- function (body, tail63) {
  lower_statement(join(list("do"), body), tail63)
}
lower_block <- function (body, tail63) {
  join(list("%block"), tl(lower_body(body, tail63)))
}
literal63 <- function (form) {
  atom63(form) || hd(form) == "%array" || hd(form) == "%object"
}
standalone63 <- function (form) {
  ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" == hd(form)) || id_literal63(form)
}
lower_do <- function (args, hoist, stmt63, tail63) {
  V__V__x32 <- almost(args)
  V__V__i17 <- 0
  while (V__V__i17 < V_35(V__V__x32)) {
    V__x33 <- V__V__x32[[V__V__i17 + 1]]
    V__V__y <- lower(V__x33, hoist, stmt63)
    if (yes(V__V__y)) {
      V__e1 <- V__V__y
      if (standalone63(V__e1)) {
        add(hoist, V__e1)
      }
    }
    V__V__i17 <- V__V__i17 + 1
  }
  V__e2 <- lower(last(args), hoist, stmt63, tail63)
  if (tail63 && can_return63(V__e2)) {
    list("return", V__e2)
  } else {
    V__e2
  }
}
lower_set <- function (args, hoist, stmt63, tail63) {
  V__V__id16 <- args
  V__lh <- V__V__id16[[1]]
  V__rh <- V__V__id16[[2]]
  V__lh1 <- lower(V__lh, hoist)
  V__rh1 <- lower(V__rh, hoist)
  add(hoist, list("%set", V__lh1, V__rh1))
  if (!( stmt63 && ! tail63)) {
    V__lh1
  }
}
lower_if <- function (args, hoist, stmt63, tail63) {
  V__V__id17 <- args
  V__cond <- V__V__id17[[1]]
  V__V_then <- V__V__id17[[2]]
  V__V_else <- V__V__id17[[3]]
  if (stmt63) {
    V__e55
    if (is63(V__V_else)) {
      V__e55 <- list(lower_body(list(V__V_else), tail63))
    }
    add(hoist, join(list("%if", lower(V__cond, hoist), lower_body(list(V__V_then), tail63)), V__e55))
  } else {
    V__e3 <- unique("e")
    add(hoist, list("%local", V__e3))
    V__e54
    if (is63(V__V_else)) {
      V__e54 <- list(lower(list("%set", V__e3, V__V_else)))
    }
    add(hoist, join(list("%if", lower(V__cond, hoist), lower(list("%set", V__e3, V__V_then))), V__e54))
    V__e3
  }
}
lower_short <- function (x, args, hoist) {
  V__V__id18 <- args
  V__a3 <- V__V__id18[[1]]
  V__b4 <- V__V__id18[[2]]
  V__hoist1 <- list()
  V__b11 <- lower(V__b4, V__hoist1)
  if (some63(V__hoist1)) {
    V__id19 <- unique("id")
    V__e56
    if (x == "and") {
      V__e56 <- list("%if", V__id19, V__b4, V__id19)
    } else {
      V__e56 <- list("%if", V__id19, V__id19, V__b4)
    }
    lower(list("do", list("%local", V__id19, V__a3), V__e56), hoist)
  } else {
    list(x, lower(V__a3, hoist), V__b11)
  }
}
lower_try <- function (args, hoist, tail63) {
  add(hoist, list("%try", lower_body(args, tail63)))
}
lower_while <- function (args, hoist) {
  V__V__id20 <- args
  V__c4 <- V__V__id20[[1]]
  V__body4 <- cut(V__V__id20, 1)
  V__pre <- list()
  V__c5 <- lower(V__c4, V__pre)
  V__e57
  if (none63(V__pre)) {
    V__e57 <- list("while", V__c5, lower_body(V__body4))
  } else {
    V__e57 <- list("while", TRUE, join(list("do"), V__pre, list(list("%if", list("not", V__c5), list("break")), lower_body(V__body4))))
  }
  add(hoist, V__e57)
}
lower_for <- function (args, hoist) {
  V__V__id211 <- args
  V__t <- V__V__id211[[1]]
  V__k7 <- V__V__id211[[2]]
  V__body5 <- cut(V__V__id211, 2)
  add(hoist, list("%for", lower(V__t, hoist), V__k7, lower_body(V__body5)))
}
lower_function <- function (args) {
  V__V__id22 <- args
  V__a4 <- V__V__id22[[1]]
  V__body6 <- cut(V__V__id22, 1)
  list("%function", V__a4, lower_body(V__body6, TRUE))
}
lower_definition <- function (kind, args, hoist) {
  V__V__id23 <- args
  V__name4 <- V__V__id23[[1]]
  V__args5 <- V__V__id23[[2]]
  V__body7 <- cut(V__V__id23, 2)
  add(hoist, list(kind, V__name4, V__args5, lower_body(V__body7, TRUE)))
}
lower_call <- function (form, hoist) {
  V__form1 <- map(function (x) {
    lower(x, hoist)
  }, form)
  if (some63(V__form1)) {
    V__form1
  }
}
pairwise63 <- function (form) {
  in63(hd(form), list("<", "<=", "=", ">=", ">"))
}
lower_pairwise <- function (form) {
  if (pairwise63(form)) {
    V__e4 <- list()
    V__V__id24 <- form
    V__x34 <- V__V__id24[[1]]
    V__args6 <- cut(V__V__id24, 1)
    reduce(function (a, b) {
      add(V__e4, list(V__x34, a, b))
      a
    }, V__args6)
    join(list("and"), reverse(V__e4))
  } else {
    form
  }
}
lower_infix63 <- function (form) {
  infix63(hd(form)) && V_35(form) > 3
}
lower_infix <- function (form, hoist) {
  V__form2 <- lower_pairwise(form)
  V__V__id25 <- V__form2
  V__x35 <- V__V__id25[[1]]
  V__args7 <- cut(V__V__id25, 1)
  lower(reduce(function (a, b) {
    list(V__x35, b, a)
  }, reverse(V__args7)), hoist)
}
lower_special <- function (form, hoist) {
  V__e5 <- lower_call(form, hoist)
  if (V__e5) {
    add(hoist, V__e5)
  }
}
lower <- function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    form
  } else {
    if (empty63(form)) {
      list("%array")
    } else {
      if (nil63(hoist)) {
        lower_statement(form)
      } else {
        if (lower_infix63(form)) {
          lower_infix(form, hoist)
        } else {
          V__V__id26 <- form
          V__x36 <- V__V__id26[[1]]
          V__args8 <- cut(V__V__id26, 1)
          if (V__x36 == "do") {
            lower_do(V__args8, hoist, stmt63, tail63)
          } else {
            if (V__x36 == "%block") {
              lower_block(V__args8, tail63)
            } else {
              if (V__x36 == "%call") {
                lower(V__args8, hoist, stmt63, tail63)
              } else {
                if (V__x36 == "%set") {
                  lower_set(V__args8, hoist, stmt63, tail63)
                } else {
                  if (V__x36 == "%if") {
                    lower_if(V__args8, hoist, stmt63, tail63)
                  } else {
                    if (V__x36 == "%try") {
                      lower_try(V__args8, hoist, tail63)
                    } else {
                      if (V__x36 == "while") {
                        lower_while(V__args8, hoist)
                      } else {
                        if (V__x36 == "%for") {
                          lower_for(V__args8, hoist)
                        } else {
                          if (V__x36 == "%function") {
                            lower_function(V__args8)
                          } else {
                            if (V__x36 == "%local-function" || V__x36 == "%global-function") {
                              lower_definition(V__x36, V__args8, hoist)
                            } else {
                              if (in63(V__x36, list("and", "or"))) {
                                lower_short(V__x36, V__args8, hoist)
                              } else {
                                if (statement63(V__x36)) {
                                  lower_special(form, hoist)
                                } else {
                                  lower_call(form, hoist)
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
          }
        }
      }
    }
  }
}
expand <- function (form) {
  lower(macroexpand(form))
}
V_37result <- NULL
V_eval <- function (form) {
  V__previous <- target
  target <- "r"
  V__code <- compile(expand(list("set", "%result", form)))
  target <- V__previous
  run(V__code)
  V_37result
}
immediate_call63 <- function (x) {
  obj63(x) && obj63(hd(x)) && hd(hd(x)) == "%function"
}
setenv("do", special = function (...) {
  V__forms1 <- list(...)
  V__s3 <- ""
  V__V__x39 <- V__forms1
  V__V__i19 <- 0
  while (V__V__i19 < V_35(V__V__x39)) {
    V__x40 <- V__V__x39[[V__V__i19 + 1]]
    if (target == "lua" && immediate_call63(V__x40) && "\n" == char(V__s3, edge(V__s3))) {
      V__s3 <- cat(clip(V__s3, 0, edge(V__s3)), ";\n")
    }
    V__s3 <- cat(V__s3, compile(V__x40, stmt = TRUE))
    if (! atom63(V__x40)) {
      if (hd(V__x40) == "return" || hd(V__x40) == "break") {
        break
      }
    }
    V__V__i19 <- V__V__i19 + 1
  }
  V__s3
}, stmt = TRUE, tr = TRUE)
setenv("%block", special = function (...) {
  V__forms3 <- list(...)
  V__s5 <- "{\n"
  indent_level <- indent_level + 1
  V__V__x45 <- V__forms3
  V__V__i21 <- 0
  while (V__V__i21 < V_35(V__V__x45)) {
    V__x46 <- V__V__x45[[V__V__i21 + 1]]
    V__s5 <- cat(V__s5, compile(V__x46, stmt = TRUE))
    V__V__i21 <- V__V__i21 + 1
  }
  V__V__x44
  indent_level <- indent_level - 1
  V__s5 <- cat(V__s5, indentation(), "}")
  V__s5
})
setenv("%if", special = function (cond, cons, alt) {
  V__cond2 <- compile(cond)
  indent_level <- indent_level + 1
  V__V__x49 <- compile(cons, stmt = TRUE)
  indent_level <- indent_level - 1
  V__cons1 <- V__V__x49
  V__e58
  if (alt) {
    indent_level <- indent_level + 1
    V__V__x50 <- compile(alt, stmt = TRUE)
    indent_level <- indent_level - 1
    V__e58 <- V__V__x50
  }
  V__alt1 <- V__e58
  V__ind3 <- indentation()
  V__s7 <- ""
  if (target == "lua") {
    V__s7 <- cat(V__s7, V__ind3, "if ", V__cond2, " then\n", V__cons1)
  } else {
    V__s7 <- cat(V__s7, V__ind3, "if (", V__cond2, ") {\n", V__cons1, V__ind3, "}")
  }
  if (V__alt1 && target == "lua") {
    V__s7 <- cat(V__s7, V__ind3, "else\n", V__alt1)
  } else {
    if (V__alt1) {
      V__s7 <- cat(V__s7, " else {\n", V__alt1, V__ind3, "}")
    }
  }
  if (target == "lua") {
    cat(V__s7, V__ind3, "end\n")
  } else {
    cat(V__s7, "\n")
  }
}, stmt = TRUE, tr = TRUE)
setenv("while", special = function (cond, form) {
  V__cond4 <- compile(cond)
  indent_level <- indent_level + 1
  V__V__x52 <- compile(form, stmt = TRUE)
  indent_level <- indent_level - 1
  V__body9 <- V__V__x52
  V__ind5 <- indentation()
  if (target == "lua") {
    cat(V__ind5, "while ", V__cond4, " do\n", V__body9, V__ind5, "end\n")
  } else {
    cat(V__ind5, "while (", V__cond4, ") {\n", V__body9, V__ind5, "}\n")
  }
}, stmt = TRUE, tr = TRUE)
setenv("%for", special = function (t, k, form) {
  V__t2 <- compile(t)
  V__ind7 <- indentation()
  indent_level <- indent_level + 1
  V__V__x54 <- compile(form, stmt = TRUE)
  indent_level <- indent_level - 1
  V__body11 <- V__V__x54
  if (target == "lua") {
    cat(V__ind7, "for ", k, " in next, ", V__t2, " do\n", V__body11, V__ind7, "end\n")
  } else {
    cat(V__ind7, "for (", k, " in ", V__t2, ") {\n", V__body11, V__ind7, "}\n")
  }
}, stmt = TRUE, tr = TRUE)
setenv("%try", special = function (form) {
  V__e8 <- unique("e")
  V__ind9 <- indentation()
  indent_level <- indent_level + 1
  V__V__x59 <- compile(form, stmt = TRUE)
  indent_level <- indent_level - 1
  V__body13 <- V__V__x59
  V__hf1 <- list("return", list("%array", FALSE, V__e8))
  indent_level <- indent_level + 1
  V__V__x60 <- compile(V__hf1, stmt = TRUE)
  indent_level <- indent_level - 1
  V__h1 <- V__V__x60
  cat(V__ind9, "try {\n", V__body13, V__ind9, "}\n", V__ind9, "catch (", V__e8, ") {\n", V__h1, V__ind9, "}\n")
}, stmt = TRUE, tr = TRUE)
setenv("%delete", special = function (place) {
  cat(indentation(), "delete ", compile(place))
}, stmt = TRUE)
setenv("break", special = function () {
  cat(indentation(), "break")
}, stmt = TRUE)
setenv("%function", special = function (args, body) {
  compile_function(args, body)
})
setenv("%global-function", special = function (name, args, body) {
  if (target == "lua") {
    V__x64 <- compile_function(args, body, name = name)
    cat(indentation(), V__x64)
  } else {
    compile(list("%set", name, list("%function", args, body)), stmt = TRUE)
  }
}, stmt = TRUE, tr = TRUE)
setenv("%local-function", special = function (name, args, body) {
  if (target == "lua") {
    V__x68 <- compile_function(args, body, name = name, prefix = "local")
    cat(indentation(), V__x68)
  } else {
    compile(list("%local", name, list("%function", args, body)), stmt = TRUE)
  }
}, stmt = TRUE, tr = TRUE)
setenv("return", special = function (x) {
  V__e59
  if (nil63(x)) {
    V__e59 <- "return"
  } else {
    V__e59 <- cat("return ", compile(x))
  }
  V__x70 <- V__e59
  cat(indentation(), V__x70)
}, stmt = TRUE)
setenv("new", special = function (x) {
  cat("new ", compile(x))
})
setenv("typeof", special = function (x) {
  cat("typeof(", compile(x), ")")
})
setenv("throw", special = function (x) {
  V__e60
  if (target == "js") {
    V__e60 <- cat("throw ", compile(x))
  } else {
    V__e60 <- cat("error(", compile(x), ")")
  }
  V__e12 <- V__e60
  cat(indentation(), V__e12)
}, stmt = TRUE)
setenv("%local", special = function (name, value) {
  V__id28 <- compile(name)
  V__value11 <- compile(value)
  V__e61
  if (target == "r") {
    V__e61 <- " <- "
  } else {
    V__e61 <- " = "
  }
  V__sep1 <- V__e61
  V__e62
  if (is63(value)) {
    V__e62 <- cat(V__sep1, V__value11)
  } else {
    V__e62 <- ""
  }
  V__rh2 <- V__e62
  V__e63
  if (target == "js") {
    V__e63 <- "var "
  } else {
    V__e64
    if (target == "lua") {
      V__e64 <- "local "
    } else {
      V__e64 <- ""
    }
    V__e63 <- V__e64
  }
  V__keyword1 <- V__e63
  V__ind11 <- indentation()
  cat(V__ind11, V__keyword1, V__id28, V__rh2)
}, stmt = TRUE)
setenv("%set", special = function (lh, rh) {
  V__lh12 <- compile(lh)
  V__e65
  if (nil63(rh)) {
    V__e65 <- "nil"
  } else {
    V__e65 <- rh
  }
  V__rh13 <- compile(V__e65)
  V__e66
  if (target == "r") {
    V__e67
    if (hd63(lh, "get")) {
      V__e67 <- " <<- "
    } else {
      V__e67 <- " <- "
    }
    V__e66 <- V__e67
  } else {
    V__e66 <- " = "
  }
  V__sep3 <- V__e66
  cat(indentation(), V__lh12, V__sep3, V__rh13)
}, stmt = TRUE)
setenv("get", special = function (t, k) {
  V__t12 <- compile(t)
  V__k12 <- compile(k)
  if (target == "lua" && char(V__t12, 0) == "{" || infix_operator63(t)) {
    V__t12 <- cat("(", V__t12, ")")
  }
  if (accessor_id63(k)) {
    cat(V__t12, V__k12)
  } else {
    if (target == "r") {
      cat(V__t12, "[[", V__k12, "]]")
    } else {
      cat(V__t12, "[", V__k12, "]")
    }
  }
})
setenv("%array", special = function (...) {
  V__forms5 <- list(...)
  V__e68
  if (target == "r") {
    V__e68 <- "list("
  } else {
    V__e69
    if (target == "lua") {
      V__e69 <- "{"
    } else {
      V__e69 <- "["
    }
    V__e68 <- V__e69
  }
  V__open1 <- V__e68
  V__e70
  if (target == "r") {
    V__e70 <- ")"
  } else {
    V__e71
    if (target == "lua") {
      V__e71 <- "}"
    } else {
      V__e71 <- "]"
    }
    V__e70 <- V__e71
  }
  V__close1 <- V__e70
  V__s9 <- ""
  V__c7 <- ""
  V__V__o10 <- V__forms5
  V__k10 <- NULL
  for (V__k10 in indices(V__V__o10)) {
    V__v9 <- V__V__o10[[V__k10]]
    if (number63(V__k10)) {
      V__s9 <- cat(V__s9, V__c7, compile(V__v9))
      V__c7 <- ", "
    }
  }
  cat(V__open1, V__s9, V__close1)
})
setenv("%object", special = function (...) {
  V__forms7 <- list(...)
  V__e72
  if (target == "r") {
    V__e72 <- "list("
  } else {
    V__e72 <- "{"
  }
  V__s111 <- V__e72
  V__c9 <- ""
  V__e73
  if (target == "js") {
    V__e73 <- ": "
  } else {
    V__e73 <- " = "
  }
  V__sep5 <- V__e73
  V__V__o12 <- pair(V__forms7)
  V__k14 <- NULL
  for (V__k14 in indices(V__V__o12)) {
    V__v12 <- V__V__o12[[V__k14]]
    if (number63(V__k14)) {
      V__V__id30 <- V__v12
      V__k15 <- V__V__id30[[1]]
      V__v13 <- V__V__id30[[2]]
      if (! string63(V__k15)) {
        error(cat("Illegal key: ", str(V__k15)))
      }
      V__s111 <- cat(V__s111, V__c9, key(V__k15), V__sep5, compile(V__v13))
      V__c9 <- ", "
    }
  }
  V__e74
  if (target == "r") {
    V__e74 <- ")"
  } else {
    V__e74 <- "}"
  }
  cat(V__s111, V__e74)
})
setenv("%literal", special = function (...) {
  V__args10 <- list(...)
  apply(cat, map(compile, V__args10))
})
setenv("%stash", special = function (...) {
  V__args121 <- list(...)
  if (target == "r") {
    V__s13 <- ""
    V__c111 <- ""
    V__V__x74 <- V__args121
    V__V__i28 <- 0
    while (V__V__i28 < V_35(V__V__x74)) {
      V__V__id33 <- V__V__x74[[V__V__i28 + 1]]
      V__k18 <- V__V__id33[[1]]
      V__v16 <- V__V__id33[[2]]
      V__s13 <- cat(V__s13, V__c111, inner(compile(V__k18)), " = ", compile(V__v16))
      V__c111 <- ", "
      V__V__i28 <- V__V__i28 + 1
    }
    V__s13
  } else {
    V__l2 <- list("%object", "\"_stash\"", TRUE)
    V__V__x75 <- V__args121
    V__V__i29 <- 0
    while (V__V__i29 < V_35(V__V__x75)) {
      V__V__id34 <- V__V__x75[[V__V__i29 + 1]]
      V__k19 <- V__V__id34[[1]]
      V__v17 <- V__V__id34[[2]]
      add(V__l2, literal(V__k19))
      add(V__l2, V__v17)
      V__V__i29 <- V__V__i29 + 1
    }
    compile(V__l2)
  }
})
return list(run = run, "eval" = V_eval, expand = expand, compile = compile)
