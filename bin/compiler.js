var getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      var __b = environment[__i][k];
      if (is63(__b)) {
        var __e21;
        if (p) {
          __e21 = __b[p];
        } else {
          __e21 = __b;
        }
        return __e21;
      } else {
        __i = __i - 1;
      }
    }
  }
};
var macroFunction = function (k) {
  return getenv(k, "macro");
};
var macro63 = function (k) {
  return is63(macroFunction(k));
};
var special63 = function (k) {
  return is63(getenv(k, "special"));
};
var specialForm63 = function (form) {
  return ! atom63(form) && special63(hd(form));
};
var statement63 = function (k) {
  return special63(k) && getenv(k, "stmt");
};
var symbolExpansion = function (k) {
  return getenv(k, "symbol");
};
var symbol63 = function (k) {
  return is63(symbolExpansion(k));
};
var variable63 = function (k) {
  return is63(getenv(k, "variable"));
};
bound63 = function (x) {
  return macro63(x) || special63(x) || symbol63(x) || variable63(x);
};
quoted = function (form) {
  if (string63(form)) {
    return escape(form);
  } else {
    if (atom63(form)) {
      return form;
    } else {
      return join(["list"], map(quoted, form));
    }
  }
};
var literal = function (s) {
  if (stringLiteral63(s)) {
    return s;
  } else {
    return quoted(s);
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var __l = ["%object", "\"_stash\"", true];
    var ____o = args;
    var __k = undefined;
    for (__k in ____o) {
      var __v = ____o[__k];
      var __e22;
      if (numeric63(__k)) {
        __e22 = parseInt(__k);
      } else {
        __e22 = __k;
      }
      var __k1 = __e22;
      if (! number63(__k1)) {
        add(__l, literal(__k1));
        add(__l, __v);
      }
    }
    return join(args, [__l]);
  } else {
    return args;
  }
};
var bias = function (k) {
  if (number63(k) && !( target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return k;
};
bind = function (lh, rh) {
  if (atom63(lh)) {
    return [lh, rh];
  } else {
    var __id = unique("id");
    var __bs = [__id, rh];
    var ____o1 = lh;
    var __k2 = undefined;
    for (__k2 in ____o1) {
      var __v1 = ____o1[__k2];
      var __e23;
      if (numeric63(__k2)) {
        __e23 = parseInt(__k2);
      } else {
        __e23 = __k2;
      }
      var __k3 = __e23;
      var __e24;
      if (__k3 === "rest") {
        __e24 = ["cut", __id, _35(lh)];
      } else {
        __e24 = ["get", __id, ["quote", bias(__k3)]];
      }
      var __x5 = __e24;
      if (is63(__k3)) {
        var __e25;
        if (__v1 === true) {
          __e25 = __k3;
        } else {
          __e25 = __v1;
        }
        var __k4 = __e25;
        __bs = join(__bs, bind(__k4, __x5));
      }
    }
    return __bs;
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return ["Array", ".prototype", ".slice", ".call", "arguments", from];
}});
bind42 = function (args, body) {
  var __args1 = [];
  var rest = function () {
    __args1.rest = true;
    if (target === "js") {
      return ["unstash", ["arguments%", _35(__args1)]];
    } else {
      return ["unstash", ["list", "|...|"]];
    }
  };
  if (atom63(args)) {
    return [__args1, join(["let", [args, rest()]], body)];
  } else {
    var __bs1 = [];
    var __r19 = unique("r");
    var ____o2 = args;
    var __k5 = undefined;
    for (__k5 in ____o2) {
      var __v2 = ____o2[__k5];
      var __e26;
      if (numeric63(__k5)) {
        __e26 = parseInt(__k5);
      } else {
        __e26 = __k5;
      }
      var __k6 = __e26;
      if (number63(__k6)) {
        if (atom63(__v2)) {
          add(__args1, __v2);
        } else {
          var __x18 = unique("x");
          add(__args1, __x18);
          __bs1 = join(__bs1, [__v2, __x18]);
        }
      }
    }
    if (keys63(args)) {
      __bs1 = join(__bs1, [__r19, rest()]);
      var __n3 = _35(__args1);
      var __i4 = 0;
      while (__i4 < __n3) {
        var __v3 = __args1[__i4];
        __bs1 = join(__bs1, [__v3, ["destash!", __v3, __r19]]);
        __i4 = __i4 + 1;
      }
      __bs1 = join(__bs1, [keys(args), __r19]);
    }
    return [__args1, join(["let", __bs1], body)];
  }
};
var quoting63 = function (depth) {
  return number63(depth);
};
var quasiquoting63 = function (depth) {
  return quoting63(depth) && depth > 0;
};
var canUnquote63 = function (depth) {
  return quoting63(depth) && depth === 1;
};
var quasisplice63 = function (x, depth) {
  return canUnquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing";
};
var expandLocal = function (__x26) {
  var ____id1 = __x26;
  var __x27 = ____id1[0];
  var __name = ____id1[1];
  var __value = ____id1[2];
  setenv(__name, {_stash: true, variable: true});
  return ["%local", __name, macroexpand(__value)];
};
var expandFunction = function (__x29) {
  var ____id2 = __x29;
  var __x30 = ____id2[0];
  var __args = ____id2[1];
  var __body = cut(____id2, 2);
  add(environment, {});
  var ____o3 = __args;
  var ____i5 = undefined;
  for (____i5 in ____o3) {
    var ____x31 = ____o3[____i5];
    var __e27;
    if (numeric63(____i5)) {
      __e27 = parseInt(____i5);
    } else {
      __e27 = ____i5;
    }
    var ____i51 = __e27;
    setenv(____x31, {_stash: true, variable: true});
  }
  var ____x32 = join(["%function", __args], macroexpand(__body));
  drop(environment);
  return ____x32;
};
var expandDefinition = function (__x34) {
  var ____id3 = __x34;
  var __x35 = ____id3[0];
  var __name1 = ____id3[1];
  var __args11 = ____id3[2];
  var __body1 = cut(____id3, 3);
  add(environment, {});
  var ____o4 = __args11;
  var ____i6 = undefined;
  for (____i6 in ____o4) {
    var ____x36 = ____o4[____i6];
    var __e28;
    if (numeric63(____i6)) {
      __e28 = parseInt(____i6);
    } else {
      __e28 = ____i6;
    }
    var ____i61 = __e28;
    setenv(____x36, {_stash: true, variable: true});
  }
  var ____x37 = join([__x35, __name1, __args11], macroexpand(__body1));
  drop(environment);
  return ____x37;
};
var expandMacro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x39) {
  var ____id4 = __x39;
  var __name2 = ____id4[0];
  var __body2 = cut(____id4, 1);
  return apply(macroFunction(__name2), __body2);
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return macroexpand(symbolExpansion(form));
  } else {
    if (atom63(form)) {
      return form;
    } else {
      var __x40 = hd(form);
      if (__x40 === "%local") {
        return expandLocal(form);
      } else {
        if (__x40 === "%function") {
          return expandFunction(form);
        } else {
          if (__x40 === "%global-function") {
            return expandDefinition(form);
          } else {
            if (__x40 === "%local-function") {
              return expandDefinition(form);
            } else {
              if (macro63(__x40)) {
                return expandMacro(form);
              } else {
                return map(macroexpand, form);
              }
            }
          }
        }
      }
    }
  }
};
var quasiquoteList = function (form, depth) {
  var __xs = [["list"]];
  var ____o5 = form;
  var __k7 = undefined;
  for (__k7 in ____o5) {
    var __v4 = ____o5[__k7];
    var __e29;
    if (numeric63(__k7)) {
      __e29 = parseInt(__k7);
    } else {
      __e29 = __k7;
    }
    var __k8 = __e29;
    if (! number63(__k8)) {
      var __e30;
      if (quasisplice63(__v4, depth)) {
        __e30 = quasiexpand(__v4[1]);
      } else {
        __e30 = quasiexpand(__v4, depth);
      }
      var __v5 = __e30;
      last(__xs)[__k8] = __v5;
    }
  }
  var ____x43 = form;
  var ____i8 = 0;
  while (____i8 < _35(____x43)) {
    var __x44 = ____x43[____i8];
    if (quasisplice63(__x44, depth)) {
      var __x45 = quasiexpand(__x44[1]);
      add(__xs, __x45);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x44, depth));
    }
    ____i8 = ____i8 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
  }, __xs);
  if (one63(__pruned)) {
    return hd(__pruned);
  } else {
    return join(["join"], __pruned);
  }
};
quasiexpand = function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      return ["quote", form];
    } else {
      if (canUnquote63(depth) && hd(form) === "unquote") {
        return quasiexpand(form[1]);
      } else {
        if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
          return quasiquoteList(form, depth - 1);
        } else {
          if (hd(form) === "quasiquote") {
            return quasiquoteList(form, depth + 1);
          } else {
            return quasiquoteList(form, depth);
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      return form;
    } else {
      if (hd(form) === "quote") {
        return form;
      } else {
        if (hd(form) === "quasiquote") {
          return quasiexpand(form[1], 1);
        } else {
          return map(function (x) {
            return quasiexpand(x, depth);
          }, form);
        }
      }
    }
  }
};
expandIf = function (__x49) {
  var ____id5 = __x49;
  var __a = ____id5[0];
  var __b1 = ____id5[1];
  var __c = cut(____id5, 2);
  if (is63(__b1)) {
    return [join(["%if", __a, __b1], expandIf(__c))];
  } else {
    if (is63(__a)) {
      return [__a];
    }
  }
};
indentLevel = 0;
indentation = function () {
  var __s = "";
  var __i9 = 0;
  while (__i9 < indentLevel) {
    __s = __s + "  ";
    __i9 = __i9 + 1;
  }
  return __s;
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, break: true, case: true, catch: true, class: true, const: true, continue: true, debugger: true, default: true, delete: true, do: true, else: true, eval: true, finally: true, for: true, function: true, if: true, import: true, in: true, instanceof: true, let: true, new: true, return: true, switch: true, throw: true, try: true, typeof: true, var: true, void: true, with: true, and: true, end: true, load: true, repeat: true, while: true, false: true, local: true, nil: true, then: true, not: true, true: true, elseif: true, or: true, until: true};
reserved63 = function (x) {
  return has63(reserved, x);
};
var validCode63 = function (n) {
  return numberCode63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95;
};
accessor63 = function (x) {
  return string63(x) && _35(x) > 1 && code(x, 0) === 46 && !( code(x, 1) === 46) || obj63(x) && hd(x) === "%brackets";
};
compileId = function (id) {
  var __id6 = camelCase(id);
  var __e31;
  if (numberCode63(code(__id6, 0))) {
    __e31 = "_";
  } else {
    __e31 = "";
  }
  var __id11 = __e31;
  var __i10 = 0;
  while (__i10 < _35(__id6)) {
    var __c1 = char(__id6, __i10);
    var __n7 = code(__c1);
    var __e32;
    if (__c1 === "-" && !( __id6 === "-")) {
      __e32 = "_";
    } else {
      var __e33;
      if (validCode63(__n7)) {
        __e33 = __c1;
      } else {
        var __e34;
        if (__i10 === 0) {
          __e34 = "_" + __n7;
        } else {
          __e34 = __n7;
        }
        __e33 = __e34;
      }
      __e32 = __e33;
    }
    var __c11 = __e32;
    __id11 = __id11 + __c11;
    __i10 = __i10 + 1;
  }
  return __id11;
};
validId63 = function (x) {
  var __id33 = some63(x) && x === compileId(x);
  var __e36;
  if (__id33) {
    var __e37;
    if (target === "lua") {
      __e37 = ! reserved63(x);
    } else {
      __e37 = true;
    }
    __e36 = __e37;
  } else {
    __e36 = __id33;
  }
  return __e36;
};
var __names = {};
unique = function (x) {
  var __x53 = compileId(x);
  if (__names[__x53]) {
    var __i11 = __names[__x53];
    __names[__x53] = __names[__x53] + 1;
    return unique(__x53 + __i11);
  } else {
    __names[__x53] = 1;
    return "__" + __x53;
  }
};
key = function (k) {
  var __i12 = inner(k);
  if (validId63(__i12)) {
    return __i12;
  } else {
    if (target === "js") {
      return k;
    } else {
      return "[" + k + "]";
    }
  }
};
mapo = function (f, t) {
  var __o6 = [];
  var ____o7 = t;
  var __k9 = undefined;
  for (__k9 in ____o7) {
    var __v6 = ____o7[__k9];
    var __e38;
    if (numeric63(__k9)) {
      __e38 = parseInt(__k9);
    } else {
      __e38 = __k9;
    }
    var __k10 = __e38;
    var __x54 = f(__v6);
    if (is63(__x54)) {
      add(__o6, literal(__k10));
      add(__o6, __x54);
    }
  }
  return __o6;
};
var ____x56 = [];
var ____x57 = [];
____x57.js = "!";
____x57.lua = "not";
____x56.not = ____x57;
var ____x58 = [];
____x58["*"] = true;
____x58["/"] = true;
____x58["%"] = true;
var ____x59 = [];
var ____x60 = [];
____x60.js = "+";
____x60.lua = "..";
____x59.cat = ____x60;
var ____x61 = [];
____x61["+"] = true;
____x61["-"] = true;
var ____x62 = [];
____x62["<"] = true;
____x62[">"] = true;
____x62["<="] = true;
____x62[">="] = true;
var ____x63 = [];
var ____x64 = [];
____x64.js = "===";
____x64.lua = "==";
____x63["="] = ____x64;
var ____x65 = [];
var ____x66 = [];
____x66.js = "&&";
____x66.lua = "and";
____x65.and = ____x66;
var ____x67 = [];
var ____x68 = [];
____x68.js = "||";
____x68.lua = "or";
____x67.or = ____x68;
var infix = [____x56, ____x58, ____x59, ____x61, ____x62, ____x63, ____x65, ____x67];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o8 = infix;
    var __k11 = undefined;
    for (__k11 in ____o8) {
      var __v7 = ____o8[__k11];
      var __e39;
      if (numeric63(__k11)) {
        __e39 = parseInt(__k11);
      } else {
        __e39 = __k11;
      }
      var __k12 = __e39;
      if (__v7[hd(form)]) {
        return index(__k12);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x70 = level[op];
    if (__x70 === true) {
      return op;
    } else {
      if (is63(__x70)) {
        return __x70[target];
      }
    }
  }, infix);
};
var infix63 = function (x) {
  return is63(getop(x));
};
infixOperator63 = function (x) {
  return obj63(x) && infix63(hd(x));
};
compileNext = function (x, args, call63) {
  if (none63(args)) {
    if (call63) {
      return x + "()";
    } else {
      return x;
    }
  } else {
    return x + compileArgs(args, call63);
  }
};
compileArgs = function (args, call63) {
  var __a1 = hd(args);
  if (accessor63(__a1)) {
    return compileNext(compile(__a1), tl(args), call63);
  } else {
    if (obj63(__a1) && accessor63(hd(__a1))) {
      var ____id7 = __a1;
      var __x71 = ____id7[0];
      var __ys = cut(____id7, 1);
      var __s1 = compileNext(compile(__x71), __ys, true);
      return compileNext(__s1, tl(args), call63);
    } else {
      var __s2 = "";
      var __c2 = "";
      var __i15 = 0;
      while (__i15 < _35(args)) {
        var __x72 = args[__i15];
        if (accessor63(__x72) || obj63(__x72) && accessor63(hd(__x72))) {
          return compileNext("(" + __s2 + ")", cut(args, __i15), call63);
        } else {
          __s2 = __s2 + __c2 + compile(__x72);
        }
        __c2 = ", ";
        __i15 = __i15 + 1;
      }
      return "(" + __s2 + ")";
    }
  }
};
var escapeNewlines = function (s) {
  var __s11 = "";
  var __i16 = 0;
  while (__i16 < _35(s)) {
    var __c3 = char(s, __i16);
    var __e40;
    if (__c3 === "\n") {
      __e40 = "\\n";
    } else {
      var __e41;
      if (__c3 === "\r") {
        __e41 = "\\r";
      } else {
        __e41 = __c3;
      }
      __e40 = __e41;
    }
    __s11 = __s11 + __e40;
    __i16 = __i16 + 1;
  }
  return __s11;
};
accessor = function (x) {
  var __prop = compileId(clip(x, 1));
  if (validId63(__prop)) {
    return "." + __prop;
  } else {
    return "[" + escape(__prop) + "]";
  }
};
var compileAtom = function (x) {
  if (accessor63(x)) {
    return accessor(x);
  } else {
    if (x === "nil" && target === "lua") {
      return x;
    } else {
      if (x === "nil") {
        return "undefined";
      } else {
        if (idLiteral63(x)) {
          return inner(x);
        } else {
          if (stringLiteral63(x)) {
            return escapeNewlines(x);
          } else {
            if (string63(x)) {
              var __s3 = compileId(x);
              if (reserved63(__s3)) {
                return "_" + __s3;
              } else {
                return __s3;
              }
            } else {
              if (boolean63(x)) {
                if (x) {
                  return "true";
                } else {
                  return "false";
                }
              } else {
                if (nan63(x)) {
                  return "nan";
                } else {
                  if (x === inf) {
                    return "inf";
                  } else {
                    if (x === _inf) {
                      return "-inf";
                    } else {
                      if (number63(x)) {
                        return x + "";
                      } else {
                        throw new Error("Cannot compile atom: " + str(x));
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
};
var terminator = function (stmt63) {
  if (! stmt63) {
    return "";
  } else {
    if (target === "js") {
      return ";\n";
    } else {
      return "\n";
    }
  }
};
var compileSpecial = function (form, stmt63) {
  var ____id8 = form;
  var __x73 = ____id8[0];
  var __args2 = cut(____id8, 1);
  var ____id9 = getenv(__x73);
  var __special = ____id9.special;
  var __stmt = ____id9.stmt;
  var __selfTr63 = ____id9.tr;
  var __tr = terminator(stmt63 && ! __selfTr63);
  return apply(__special, __args2) + __tr;
};
var parenthesizeCall63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var compileCall = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args3 = compileArgs(stash42(tl(form)));
  if (parenthesizeCall63(__f)) {
    return "(" + __f1 + ")" + __args3;
  } else {
    return __f1 + __args3;
  }
};
var opDelims = function (parent, child) {
  var ____r60 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r60);
  var __child = destash33(child, ____r60);
  var ____id10 = ____r60;
  var __right = ____id10.right;
  var __e42;
  if (__right) {
    __e42 = _6261;
  } else {
    __e42 = _62;
  }
  if (__e42(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compileInfix = function (form) {
  var ____id111 = form;
  var __op = ____id111[0];
  var ____id12 = cut(____id111, 1);
  var __a2 = ____id12[0];
  var __b2 = ____id12[1];
  var ____id13 = opDelims(form, __a2);
  var __ao = ____id13[0];
  var __ac = ____id13[1];
  var ____id14 = opDelims(form, __b2, {_stash: true, right: true});
  var __bo = ____id14[0];
  var __bc = ____id14[1];
  var __a3 = compile(__a2);
  var __b3 = compile(__b2);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + __ao + " " + __a3 + __ac;
  } else {
    return __ao + __a3 + __ac + " " + __op1 + " " + __bo + __b3 + __bc;
  }
};
compileFunction = function (args, body) {
  var ____r62 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args4 = destash33(args, ____r62);
  var __body3 = destash33(body, ____r62);
  var ____id15 = ____r62;
  var __name3 = ____id15.name;
  var __prefix = ____id15.prefix;
  var __e43;
  if (__name3) {
    __e43 = compile(__name3);
  } else {
    __e43 = "";
  }
  var __id16 = __e43;
  var __e44;
  if (target === "lua" && __args4.rest) {
    __e44 = join(__args4, ["|...|"]);
  } else {
    __e44 = __args4;
  }
  var __args12 = __e44;
  var __args5 = compileArgs(__args12);
  indentLevel = indentLevel + 1;
  var ____x77 = compile(__body3, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __body4 = ____x77;
  var __ind = indentation();
  var __e45;
  if (__prefix) {
    __e45 = __prefix + " ";
  } else {
    __e45 = "";
  }
  var __p = __e45;
  var __e46;
  if (target === "js") {
    __e46 = "";
  } else {
    __e46 = "end";
  }
  var __tr1 = __e46;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (target === "js") {
    return "function " + __id16 + __args5 + " {\n" + __body4 + __ind + "}" + __tr1;
  } else {
    return __p + "function " + __id16 + __args5 + "\n" + __body4 + __ind + __tr1;
  }
};
var canReturn63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r64 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form = destash33(form, ____r64);
  var ____id17 = ____r64;
  var __stmt1 = ____id17.stmt;
  if (nil63(__form)) {
    return "";
  } else {
    if (specialForm63(__form)) {
      return compileSpecial(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e47;
      if (__stmt1) {
        __e47 = indentation();
      } else {
        __e47 = "";
      }
      var __ind1 = __e47;
      var __e48;
      if (atom63(__form)) {
        __e48 = compileAtom(__form);
      } else {
        var __e49;
        if (infix63(hd(__form))) {
          __e49 = compileInfix(__form);
        } else {
          __e49 = compileCall(__form);
        }
        __e48 = __e49;
      }
      var __form1 = __e48;
      return __ind1 + __form1 + __tr2;
    }
  }
};
var lowerStatement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e50;
  if (some63(__hoist) && is63(__e)) {
    __e50 = join(["do"], __hoist, [__e]);
  } else {
    var __e51;
    if (is63(__e)) {
      __e51 = __e;
    } else {
      var __e52;
      if (_35(__hoist) > 1) {
        __e52 = join(["do"], __hoist);
      } else {
        __e52 = hd(__hoist);
      }
      __e51 = __e52;
    }
    __e50 = __e51;
  }
  return either(__e50, ["do"]);
};
var lowerBody = function (body, tail63) {
  return lowerStatement(join(["do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || hd(form) === "%array" || hd(form) === "%object";
};
var standalone63 = function (form) {
  return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || idLiteral63(form);
};
var lowerDo = function (args, hoist, stmt63, tail63) {
  var ____x83 = almost(args);
  var ____i17 = 0;
  while (____i17 < _35(____x83)) {
    var __x84 = ____x83[____i17];
    var ____y = lower(__x84, hoist, stmt63);
    if (yes(____y)) {
      var __e1 = ____y;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i17 = ____i17 + 1;
  }
  var __e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && canReturn63(__e2)) {
    return ["return", __e2];
  } else {
    return __e2;
  }
};
var lowerSet = function (args, hoist, stmt63, tail63) {
  var ____id18 = args;
  var __lh = ____id18[0];
  var __rh = ____id18[1];
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return __lh;
  }
};
var lowerIf = function (args, hoist, stmt63, tail63) {
  var ____id19 = args;
  var __cond = ____id19[0];
  var __then = ____id19[1];
  var __else = ____id19[2];
  if (stmt63) {
    var __e54;
    if (is63(__else)) {
      __e54 = [lowerBody([__else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lowerBody([__then], tail63)], __e54));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3]);
    var __e53;
    if (is63(__else)) {
      __e53 = [lower(["%set", __e3, __else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e53));
    return __e3;
  }
};
var lowerShort = function (x, args, hoist) {
  var ____id20 = args;
  var __a4 = ____id20[0];
  var __b4 = ____id20[1];
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id21 = unique("id");
    var __e55;
    if (x === "and") {
      __e55 = ["%if", __id21, __b4, __id21];
    } else {
      __e55 = ["%if", __id21, __id21, __b4];
    }
    return lower(["do", ["%local", __id21, __a4], __e55], hoist);
  } else {
    return [x, lower(__a4, hoist), __b11];
  }
};
var lowerTry = function (args, hoist, tail63) {
  return add(hoist, ["%try", lowerBody(args, tail63)]);
};
var lowerWhile = function (args, hoist) {
  var ____id22 = args;
  var __c4 = ____id22[0];
  var __body5 = cut(____id22, 1);
  var __pre = [];
  var __c5 = lower(__c4, __pre);
  var __e56;
  if (none63(__pre)) {
    __e56 = ["while", __c5, lowerBody(__body5)];
  } else {
    __e56 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lowerBody(__body5)])];
  }
  return add(hoist, __e56);
};
var lowerFor = function (args, hoist) {
  var ____id23 = args;
  var __t = ____id23[0];
  var __k13 = ____id23[1];
  var __body6 = cut(____id23, 2);
  return add(hoist, ["%for", lower(__t, hoist), __k13, lowerBody(__body6)]);
};
var lowerFunction = function (args) {
  var ____id24 = args;
  var __a5 = ____id24[0];
  var __body7 = cut(____id24, 1);
  return ["%function", __a5, lowerBody(__body7, true)];
};
var lowerDefinition = function (kind, args, hoist) {
  var ____id25 = args;
  var __name4 = ____id25[0];
  var __args6 = ____id25[1];
  var __body8 = cut(____id25, 2);
  return add(hoist, [kind, __name4, __args6, lowerBody(__body8, true)]);
};
var lowerCall = function (form, hoist) {
  var __form2 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form2)) {
    return __form2;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
};
var lowerPairwise = function (form) {
  if (pairwise63(form)) {
    var __e4 = [];
    var ____id26 = form;
    var __x113 = ____id26[0];
    var __args7 = cut(____id26, 1);
    reduce(function (a, b) {
      add(__e4, [__x113, a, b]);
      return a;
    }, __args7);
    return join(["and"], reverse(__e4));
  } else {
    return form;
  }
};
var lowerInfix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lowerInfix = function (form, hoist) {
  var __form3 = lowerPairwise(form);
  var ____id27 = __form3;
  var __x116 = ____id27[0];
  var __args8 = cut(____id27, 1);
  return lower(reduce(function (a, b) {
    return [__x116, b, a];
  }, reverse(__args8)), hoist);
};
var lowerSpecial = function (form, hoist) {
  var __e5 = lowerCall(form, hoist);
  if (__e5) {
    return add(hoist, __e5);
  }
};
lower = function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    return form;
  } else {
    if (empty63(form)) {
      return ["%array"];
    } else {
      if (nil63(hoist)) {
        return lowerStatement(form);
      } else {
        if (lowerInfix63(form)) {
          return lowerInfix(form, hoist);
        } else {
          var ____id28 = form;
          var __x119 = ____id28[0];
          var __args9 = cut(____id28, 1);
          if (__x119 === "do") {
            return lowerDo(__args9, hoist, stmt63, tail63);
          } else {
            if (__x119 === "%call") {
              return lower(__args9, hoist, stmt63, tail63);
            } else {
              if (__x119 === "%set") {
                return lowerSet(__args9, hoist, stmt63, tail63);
              } else {
                if (__x119 === "%if") {
                  return lowerIf(__args9, hoist, stmt63, tail63);
                } else {
                  if (__x119 === "%try") {
                    return lowerTry(__args9, hoist, tail63);
                  } else {
                    if (__x119 === "while") {
                      return lowerWhile(__args9, hoist);
                    } else {
                      if (__x119 === "%for") {
                        return lowerFor(__args9, hoist);
                      } else {
                        if (__x119 === "%function") {
                          return lowerFunction(__args9);
                        } else {
                          if (__x119 === "%local-function" || __x119 === "%global-function") {
                            return lowerDefinition(__x119, __args9, hoist);
                          } else {
                            if (in63(__x119, ["and", "or"])) {
                              return lowerShort(__x119, __args9, hoist);
                            } else {
                              if (statement63(__x119)) {
                                return lowerSpecial(form, hoist);
                              } else {
                                return lowerCall(form, hoist);
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
};
expand = function (form) {
  return lower(macroexpand(form));
};
global.require = require;
var run = eval;
_37result = undefined;
_eval = function (form) {
  var __previous = target;
  target = "js";
  var __code = compile(expand(["set", "%result", form]));
  target = __previous;
  run(__code);
  return _37result;
};
immediateCall63 = function (x) {
  return obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function";
};
setenv("do", {_stash: true, special: function () {
  var __forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s5 = "";
  var ____x124 = __forms1;
  var ____i19 = 0;
  while (____i19 < _35(____x124)) {
    var __x125 = ____x124[____i19];
    if (target === "lua" && immediateCall63(__x125) && "\n" === char(__s5, edge(__s5))) {
      __s5 = clip(__s5, 0, edge(__s5)) + ";\n";
    }
    __s5 = __s5 + compile(__x125, {_stash: true, stmt: true});
    if (! atom63(__x125)) {
      if (hd(__x125) === "return" || hd(__x125) === "break") {
        break;
      }
    }
    ____i19 = ____i19 + 1;
  }
  return __s5;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond2 = compile(cond);
  indentLevel = indentLevel + 1;
  var ____x128 = compile(cons, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __cons1 = ____x128;
  var __e57;
  if (alt) {
    indentLevel = indentLevel + 1;
    var ____x129 = compile(alt, {_stash: true, stmt: true});
    indentLevel = indentLevel - 1;
    __e57 = ____x129;
  }
  var __alt1 = __e57;
  var __ind3 = indentation();
  var __s7 = "";
  if (target === "js") {
    __s7 = __s7 + __ind3 + "if (" + __cond2 + ") {\n" + __cons1 + __ind3 + "}";
  } else {
    __s7 = __s7 + __ind3 + "if " + __cond2 + " then\n" + __cons1;
  }
  if (__alt1 && target === "js") {
    __s7 = __s7 + " else {\n" + __alt1 + __ind3 + "}";
  } else {
    if (__alt1) {
      __s7 = __s7 + __ind3 + "else\n" + __alt1;
    }
  }
  if (target === "lua") {
    return __s7 + __ind3 + "end\n";
  } else {
    return __s7 + "\n";
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var __cond4 = compile(cond);
  indentLevel = indentLevel + 1;
  var ____x131 = compile(form, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __body10 = ____x131;
  var __ind5 = indentation();
  if (target === "js") {
    return __ind5 + "while (" + __cond4 + ") {\n" + __body10 + __ind5 + "}\n";
  } else {
    return __ind5 + "while " + __cond4 + " do\n" + __body10 + __ind5 + "end\n";
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var __t2 = compile(t);
  var __ind7 = indentation();
  indentLevel = indentLevel + 1;
  var ____x133 = compile(form, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __body12 = ____x133;
  if (target === "lua") {
    return __ind7 + "for " + k + " in next, " + __t2 + " do\n" + __body12 + __ind7 + "end\n";
  } else {
    return __ind7 + "for (" + k + " in " + __t2 + ") {\n" + __body12 + __ind7 + "}\n";
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __e8 = unique("e");
  var __ind9 = indentation();
  indentLevel = indentLevel + 1;
  var ____x138 = compile(form, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __body14 = ____x138;
  var __hf1 = ["return", ["%array", false, __e8]];
  indentLevel = indentLevel + 1;
  var ____x141 = compile(__hf1, {_stash: true, stmt: true});
  indentLevel = indentLevel - 1;
  var __h1 = ____x141;
  return __ind9 + "try {\n" + __body14 + __ind9 + "}\n" + __ind9 + "catch (" + __e8 + ") {\n" + __h1 + __ind9 + "}\n";
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  return indentation() + "delete " + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return compileFunction(args, body);
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x145 = compileFunction(args, body, {_stash: true, name: name});
    return indentation() + __x145;
  } else {
    return compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x151 = compileFunction(args, body, {_stash: true, name: name, prefix: "local"});
    return indentation() + __x151;
  } else {
    return compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e58;
  if (nil63(x)) {
    __e58 = "return";
  } else {
    __e58 = "return " + compile(x);
  }
  var __x155 = __e58;
  return indentation() + __x155;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e59;
  if (target === "js") {
    __e59 = "throw " + compile(["new", ["Error", x]]);
  } else {
    __e59 = "error(" + compile(x) + ")";
  }
  var __e12 = __e59;
  return indentation() + __e12;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var __id30 = compile(name);
  var __value11 = compile(value);
  var __e60;
  if (is63(value)) {
    __e60 = " = " + __value11;
  } else {
    __e60 = "";
  }
  var __rh2 = __e60;
  var __e61;
  if (target === "js") {
    __e61 = "var ";
  } else {
    __e61 = "local ";
  }
  var __keyword1 = __e61;
  var __ind11 = indentation();
  return __ind11 + __keyword1 + __id30 + __rh2;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e62;
  if (nil63(rh)) {
    __e62 = "nil";
  } else {
    __e62 = rh;
  }
  var __rh4 = compile(__e62);
  return indentation() + __lh2 + " = " + __rh4;
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k);
  if (target === "lua" && char(__t12, 0) === "{" || infixOperator63(t)) {
    __t12 = "(" + __t12 + ")";
  }
  if (stringLiteral63(k) && validId63(inner(k))) {
    return __t12 + "." + inner(k);
  } else {
    return __t12 + "[" + __k121 + "]";
  }
}});
setenv("%array", {_stash: true, special: function () {
  var __forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e63;
  if (target === "lua") {
    __e63 = "{";
  } else {
    __e63 = "[";
  }
  var __open1 = __e63;
  var __e64;
  if (target === "lua") {
    __e64 = "}";
  } else {
    __e64 = "]";
  }
  var __close1 = __e64;
  var __s9 = "";
  var __c7 = "";
  var ____o10 = __forms3;
  var __k16 = undefined;
  for (__k16 in ____o10) {
    var __v9 = ____o10[__k16];
    var __e65;
    if (numeric63(__k16)) {
      __e65 = parseInt(__k16);
    } else {
      __e65 = __k16;
    }
    var __k17 = __e65;
    if (number63(__k17)) {
      __s9 = __s9 + __c7 + compile(__v9);
      __c7 = ", ";
    }
  }
  return __open1 + __s9 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s111 = "{";
  var __c9 = "";
  var __e66;
  if (target === "lua") {
    __e66 = " = ";
  } else {
    __e66 = ": ";
  }
  var __sep1 = __e66;
  var ____o12 = pair(__forms5);
  var __k21 = undefined;
  for (__k21 in ____o12) {
    var __v12 = ____o12[__k21];
    var __e67;
    if (numeric63(__k21)) {
      __e67 = parseInt(__k21);
    } else {
      __e67 = __k21;
    }
    var __k22 = __e67;
    if (number63(__k22)) {
      var ____id32 = __v12;
      var __k23 = ____id32[0];
      var __v13 = ____id32[1];
      if (! string63(__k23)) {
        throw new Error("Illegal key: " + str(__k23));
      }
      __s111 = __s111 + __c9 + key(__k23) + __sep1 + compile(__v13);
      __c9 = ", ";
    }
  }
  return __s111 + "}";
}});
setenv("%literal", {_stash: true, special: function () {
  var __args111 = unstash(Array.prototype.slice.call(arguments, 0));
  return apply(cat, map(compile, __args111));
}});
exports.run = run;
exports.eval = _eval;
exports.expand = expand;
exports.compile = compile;
