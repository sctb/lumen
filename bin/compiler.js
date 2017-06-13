var reader = require("reader");
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
        return(__e21);
      } else {
        __i = __i - 1;
      }
    }
  }
};
var macro_function = function (k) {
  return(getenv(k, "macro"));
};
var macro63 = function (k) {
  return(is63(macro_function(k)));
};
var special63 = function (k) {
  return(is63(getenv(k, "special")));
};
var special_form63 = function (form) {
  return(! atom63(form) && special63(hd(form)));
};
var statement63 = function (k) {
  return(special63(k) && getenv(k, "stmt"));
};
var symbol_expansion = function (k) {
  return(getenv(k, "symbol"));
};
var symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};
var variable63 = function (k) {
  return(is63(getenv(k, "variable")));
};
bound63 = function (x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x));
};
quoted = function (form) {
  if (string63(form)) {
    return(escape(form));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map(quoted, form)));
    }
  }
};
var literal = function (s) {
  if (string_literal63(s)) {
    return(s);
  } else {
    return(quoted(s));
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
    return(join(args, [__l]));
  } else {
    return(args);
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
  return(k);
};
bind = function (lh, rh) {
  if (atom63(lh)) {
    return([lh, rh]);
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
    return(__bs);
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return([["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]);
}});
bind42 = function (args, body) {
  var __args1 = [];
  var rest = function () {
    __args1.rest = true;
    if (target === "js") {
      return(["unstash", ["arguments%", _35(__args1)]]);
    } else {
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([__args1, join(["let", [args, rest()]], body)]);
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
          var __x30 = unique("x");
          add(__args1, __x30);
          __bs1 = join(__bs1, [__v2, __x30]);
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
    return([__args1, join(["let", __bs1], body)]);
  }
};
var quoting63 = function (depth) {
  return(number63(depth));
};
var quasiquoting63 = function (depth) {
  return(quoting63(depth) && depth > 0);
};
var can_unquote63 = function (depth) {
  return(quoting63(depth) && depth === 1);
};
var quasisplice63 = function (x, depth) {
  return(can_unquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing");
};
var expand_macro = function (form) {
  return(expand1(form, true));
};
expand1 = function (__x38, expand63) {
  var ____id1 = __x38;
  var __name = ____id1[0];
  var __body = cut(____id1, 1);
  var ____id2 = getenv(__name);
  var __macro = ____id2.macro;
  var __once = ____id2.once;
  var __form = apply(__macro, __body);
  if (expand63) {
    if (! __once) {
      __form = macroexpand(__form);
    }
  }
  return(__form);
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      var __x39 = hd(form);
      if (macro63(__x39)) {
        return(expand_macro(form));
      } else {
        return(map(macroexpand, form));
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var __xs = [["list"]];
  var ____o3 = form;
  var __k7 = undefined;
  for (__k7 in ____o3) {
    var __v4 = ____o3[__k7];
    var __e27;
    if (numeric63(__k7)) {
      __e27 = parseInt(__k7);
    } else {
      __e27 = __k7;
    }
    var __k8 = __e27;
    if (! number63(__k8)) {
      var __e28;
      if (quasisplice63(__v4, depth)) {
        __e28 = quasiexpand(__v4[1]);
      } else {
        __e28 = quasiexpand(__v4, depth);
      }
      var __v5 = __e28;
      last(__xs)[__k8] = __v5;
    }
  }
  var ____x42 = form;
  var ____i6 = 0;
  while (____i6 < _35(____x42)) {
    var __x43 = ____x42[____i6];
    if (quasisplice63(__x43, depth)) {
      var __x44 = quasiexpand(__x43[1]);
      add(__xs, __x44);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x43, depth));
    }
    ____i6 = ____i6 + 1;
  }
  var __pruned = keep(function (x) {
    return(_35(x) > 1 || !( hd(x) === "list") || keys63(x));
  }, __xs);
  if (one63(__pruned)) {
    return(hd(__pruned));
  } else {
    return(join(["join"], __pruned));
  }
};
quasiexpand = function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      return(["quote", form]);
    } else {
      if (can_unquote63(depth) && hd(form) === "unquote") {
        return(quasiexpand(form[1]));
      } else {
        if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
          return(quasiquote_list(form, depth - 1));
        } else {
          if (hd(form) === "quasiquote") {
            return(quasiquote_list(form, depth + 1));
          } else {
            return(quasiquote_list(form, depth));
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      if (hd(form) === "quote") {
        return(form);
      } else {
        if (hd(form) === "quasiquote") {
          return(quasiexpand(form[1], 1));
        } else {
          return(map(function (x) {
            return(quasiexpand(x, depth));
          }, form));
        }
      }
    }
  }
};
expand_if = function (__x48) {
  var ____id3 = __x48;
  var __a = ____id3[0];
  var __b1 = ____id3[1];
  var __c = cut(____id3, 2);
  if (is63(__b1)) {
    return([join(["%if", __a, __b1], expand_if(__c))]);
  } else {
    if (is63(__a)) {
      return([__a]);
    }
  }
};
indent_level = 0;
indentation = function () {
  var __s = "";
  var __i7 = 0;
  while (__i7 < indent_level) {
    __s = __s + "  ";
    __i7 = __i7 + 1;
  }
  return(__s);
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "class": true, "const": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "eval": true, "finally": true, "for": true, "function": true, "if": true, "import": true, "in": true, "instanceof": true, "let": true, "new": true, "return": true, "switch": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "load": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return(has63(reserved, x));
};
var valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
var id = function (id) {
  var __e29;
  if (number_code63(code(id, 0))) {
    __e29 = "_";
  } else {
    __e29 = "";
  }
  var __id11 = __e29;
  var __i8 = 0;
  while (__i8 < _35(id)) {
    var __c1 = char(id, __i8);
    var __n5 = code(__c1);
    var __e30;
    if (__c1 === "-" && !( id === "-")) {
      __e30 = "_";
    } else {
      var __e31;
      if (valid_code63(__n5)) {
        __e31 = __c1;
      } else {
        var __e32;
        if (__i8 === 0) {
          __e32 = "_" + __n5;
        } else {
          __e32 = __n5;
        }
        __e31 = __e32;
      }
      __e30 = __e31;
    }
    var __c11 = __e30;
    __id11 = __id11 + __c11;
    __i8 = __i8 + 1;
  }
  if (reserved63(__id11)) {
    return("_" + __id11);
  } else {
    return(__id11);
  }
};
valid_id63 = function (x) {
  return(some63(x) && x === id(x));
};
var __names = {};
unique = function (x) {
  var __x52 = id(x);
  if (__names[__x52]) {
    var __i9 = __names[__x52];
    __names[__x52] = __names[__x52] + 1;
    return(unique(__x52 + __i9));
  } else {
    __names[__x52] = 1;
    return("__" + __x52);
  }
};
key = function (k) {
  var __i10 = inner(k);
  if (valid_id63(__i10)) {
    return(__i10);
  } else {
    if (target === "js") {
      return(k);
    } else {
      return("[" + k + "]");
    }
  }
};
mapo = function (f, t) {
  var __o4 = [];
  var ____o5 = t;
  var __k9 = undefined;
  for (__k9 in ____o5) {
    var __v6 = ____o5[__k9];
    var __e33;
    if (numeric63(__k9)) {
      __e33 = parseInt(__k9);
    } else {
      __e33 = __k9;
    }
    var __k10 = __e33;
    var __x53 = f(__v6);
    if (is63(__x53)) {
      add(__o4, literal(__k10));
      add(__o4, __x53);
    }
  }
  return(__o4);
};
var ____x55 = [];
var ____x56 = [];
____x56.js = "!";
____x56.lua = "not";
____x55["not"] = ____x56;
var ____x57 = [];
____x57["*"] = true;
____x57["/"] = true;
____x57["%"] = true;
var ____x58 = [];
var ____x59 = [];
____x59.js = "+";
____x59.lua = "..";
____x58.cat = ____x59;
var ____x60 = [];
____x60["+"] = true;
____x60["-"] = true;
var ____x61 = [];
____x61["<"] = true;
____x61[">"] = true;
____x61["<="] = true;
____x61[">="] = true;
var ____x62 = [];
var ____x63 = [];
____x63.js = "===";
____x63.lua = "==";
____x62["="] = ____x63;
var ____x64 = [];
var ____x65 = [];
____x65.js = "&&";
____x65.lua = "and";
____x64["and"] = ____x65;
var ____x66 = [];
var ____x67 = [];
____x67.js = "||";
____x67.lua = "or";
____x66["or"] = ____x67;
var infix = [____x55, ____x57, ____x58, ____x60, ____x61, ____x62, ____x64, ____x66];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o6 = infix;
    var __k11 = undefined;
    for (__k11 in ____o6) {
      var __v7 = ____o6[__k11];
      var __e34;
      if (numeric63(__k11)) {
        __e34 = parseInt(__k11);
      } else {
        __e34 = __k11;
      }
      var __k12 = __e34;
      if (__v7[hd(form)]) {
        return(index(__k12));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var __x69 = level[op];
    if (__x69 === true) {
      return(op);
    } else {
      if (is63(__x69)) {
        return(__x69[target]);
      }
    }
  }, infix));
};
var infix63 = function (x) {
  return(is63(getop(x)));
};
infix_operator63 = function (x) {
  return(obj63(x) && infix63(hd(x)));
};
var compile_args = function (args) {
  var __s1 = "(";
  var __c2 = "";
  var ____x70 = args;
  var ____i13 = 0;
  while (____i13 < _35(____x70)) {
    var __x71 = ____x70[____i13];
    __s1 = __s1 + __c2 + compile(__x71);
    __c2 = ", ";
    ____i13 = ____i13 + 1;
  }
  return(__s1 + ")");
};
var escape_newlines = function (s) {
  var __s11 = "";
  var __i14 = 0;
  while (__i14 < _35(s)) {
    var __c3 = char(s, __i14);
    var __e35;
    if (__c3 === "\n") {
      __e35 = "\\n";
    } else {
      var __e36;
      if (__c3 === "\r") {
        __e36 = "\\r";
      } else {
        __e36 = __c3;
      }
      __e35 = __e36;
    }
    __s11 = __s11 + __e35;
    __i14 = __i14 + 1;
  }
  return(__s11);
};
var compile_atom = function (x) {
  if (x === "nil" && target === "lua") {
    return(x);
  } else {
    if (x === "nil") {
      return("undefined");
    } else {
      if (id_literal63(x)) {
        return(inner(x));
      } else {
        if (string_literal63(x)) {
          return(escape_newlines(x));
        } else {
          if (string63(x)) {
            return(id(x));
          } else {
            if (boolean63(x)) {
              if (x) {
                return("true");
              } else {
                return("false");
              }
            } else {
              if (nan63(x)) {
                return("nan");
              } else {
                if (x === inf) {
                  return("inf");
                } else {
                  if (x === _inf) {
                    return("-inf");
                  } else {
                    if (number63(x)) {
                      return(x + "");
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
};
var terminator = function (stmt63) {
  if (! stmt63) {
    return("");
  } else {
    if (target === "js") {
      return(";\n");
    } else {
      return("\n");
    }
  }
};
var compile_special = function (form, stmt63) {
  var ____id4 = form;
  var __x72 = ____id4[0];
  var __args = cut(____id4, 1);
  var ____id5 = getenv(__x72);
  var __special = ____id5.special;
  var __stmt = ____id5.stmt;
  var __self_tr63 = ____id5.tr;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return(apply(__special, __args) + __tr);
};
var parenthesize_call63 = function (x) {
  return(! atom63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args11 = compile_args(stash42(tl(form)));
  if (parenthesize_call63(__f)) {
    return("(" + __f1 + ")" + __args11);
  } else {
    return(__f1 + __args11);
  }
};
var op_delims = function (parent, child) {
  var ____r54 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r54);
  var __child = destash33(child, ____r54);
  var ____id6 = ____r54;
  var __right = ____id6.right;
  var __e37;
  if (__right) {
    __e37 = _6261;
  } else {
    __e37 = _62;
  }
  if (__e37(precedence(__child), precedence(__parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var ____id7 = form;
  var __op = ____id7[0];
  var ____id8 = cut(____id7, 1);
  var __a1 = ____id8[0];
  var __b2 = ____id8[1];
  var ____id9 = op_delims(form, __a1);
  var __ao = ____id9[0];
  var __ac = ____id9[1];
  var ____id10 = op_delims(form, __b2, {_stash: true, right: true});
  var __bo = ____id10[0];
  var __bc = ____id10[1];
  var __a2 = compile(__a1);
  var __b3 = compile(__b2);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return(__op1 + __ao + " " + __a2 + __ac);
  } else {
    return(__ao + __a2 + __ac + " " + __op1 + " " + __bo + __b3 + __bc);
  }
};
compile_function = function (args, body) {
  var ____r56 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args2 = destash33(args, ____r56);
  var __body1 = destash33(body, ____r56);
  var ____id111 = ____r56;
  var __name1 = ____id111.name;
  var __prefix = ____id111.prefix;
  var __e38;
  if (__name1) {
    __e38 = compile(__name1);
  } else {
    __e38 = "";
  }
  var __id12 = __e38;
  var __e39;
  if (target === "lua" && __args2.rest) {
    __e39 = join(__args2, ["|...|"]);
  } else {
    __e39 = __args2;
  }
  var __args12 = __e39;
  var __args3 = compile_args(__args12);
  indent_level = indent_level + 1;
  var ____x76 = compile(__body1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body2 = ____x76;
  var __ind = indentation();
  var __e40;
  if (__prefix) {
    __e40 = __prefix + " ";
  } else {
    __e40 = "";
  }
  var __p = __e40;
  var __e41;
  if (target === "js") {
    __e41 = "";
  } else {
    __e41 = "end";
  }
  var __tr1 = __e41;
  if (__name1) {
    __tr1 = __tr1 + "\n";
  }
  if (target === "js") {
    return("function " + __id12 + __args3 + " {\n" + __body2 + __ind + "}" + __tr1);
  } else {
    return(__p + "function " + __id12 + __args3 + "\n" + __body2 + __ind + __tr1);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form))));
};
compile = function (form) {
  var ____r58 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form1 = destash33(form, ____r58);
  var ____id13 = ____r58;
  var __stmt1 = ____id13.stmt;
  if (nil63(__form1)) {
    return("");
  } else {
    if (special_form63(__form1)) {
      return(compile_special(__form1, __stmt1));
    } else {
      var __tr2 = terminator(__stmt1);
      var __e42;
      if (__stmt1) {
        __e42 = indentation();
      } else {
        __e42 = "";
      }
      var __ind1 = __e42;
      var __e43;
      if (atom63(__form1)) {
        __e43 = compile_atom(__form1);
      } else {
        var __e44;
        if (infix63(hd(__form1))) {
          __e44 = compile_infix(__form1);
        } else {
          __e44 = compile_call(__form1);
        }
        __e43 = __e44;
      }
      var __form2 = __e43;
      return(__ind1 + __form2 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e45;
  if (some63(__hoist) && is63(__e)) {
    __e45 = join(["do"], __hoist, [__e]);
  } else {
    var __e46;
    if (is63(__e)) {
      __e46 = __e;
    } else {
      var __e47;
      if (_35(__hoist) > 1) {
        __e47 = join(["do"], __hoist);
      } else {
        __e47 = hd(__hoist);
      }
      __e46 = __e47;
    }
    __e45 = __e46;
  }
  return(either(__e45, ["do"]));
};
var lower_body = function (body, tail63) {
  return(lower_statement(join(["do"], body), tail63));
};
var literal63 = function (form) {
  return(atom63(form) || hd(form) === "%array" || hd(form) === "%object");
};
var standalone63 = function (form) {
  return(! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || id_literal63(form));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x82 = almost(args);
  var ____i15 = 0;
  while (____i15 < _35(____x82)) {
    var __x83 = ____x82[____i15];
    var ____y = lower(__x83, hoist, stmt63);
    if (yes(____y)) {
      var __e1 = ____y;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i15 = ____i15 + 1;
  }
  var __e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e2)) {
    return(["return", __e2]);
  } else {
    return(__e2);
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id14 = args;
  var __lh = ____id14[0];
  var __rh = ____id14[1];
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return(__lh);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id15 = args;
  var __cond = ____id15[0];
  var ___then = ____id15[1];
  var ___else = ____id15[2];
  if (stmt63) {
    var __e49;
    if (is63(___else)) {
      __e49 = [lower_body([___else], tail63)];
    }
    return(add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e49)));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3]);
    var __e48;
    if (is63(___else)) {
      __e48 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e48));
    return(__e3);
  }
};
var lower_short = function (x, args, hoist) {
  var ____id16 = args;
  var __a3 = ____id16[0];
  var __b4 = ____id16[1];
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id17 = unique("id");
    var __e50;
    if (x === "and") {
      __e50 = ["%if", __id17, __b4, __id17];
    } else {
      __e50 = ["%if", __id17, __id17, __b4];
    }
    return(lower(["do", ["%local", __id17, __a3], __e50], hoist));
  } else {
    return([x, lower(__a3, hoist), __b11]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var ____id18 = args;
  var __c4 = ____id18[0];
  var __body3 = cut(____id18, 1);
  var __pre = [];
  var __c5 = lower(__c4, __pre);
  var __e51;
  if (none63(__pre)) {
    __e51 = ["while", __c5, lower_body(__body3)];
  } else {
    __e51 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body3)])];
  }
  return(add(hoist, __e51));
};
var lower_for = function (args, hoist) {
  var ____id19 = args;
  var __t = ____id19[0];
  var __k13 = ____id19[1];
  var __body4 = cut(____id19, 2);
  return(add(hoist, ["%for", lower(__t, hoist), __k13, lower_body(__body4)]));
};
var lower_function = function (args) {
  var ____id20 = args;
  var __a4 = ____id20[0];
  var __body5 = cut(____id20, 1);
  return(["%function", __a4, lower_body(__body5, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var ____id21 = args;
  var __name2 = ____id21[0];
  var __args4 = ____id21[1];
  var __body6 = cut(____id21, 2);
  return(add(hoist, [kind, __name2, __args4, lower_body(__body6, true)]));
};
var lower_call = function (form, hoist) {
  var __form3 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(__form3)) {
    return(__form3);
  }
};
var pairwise63 = function (form) {
  return(in63(hd(form), ["<", "<=", "=", ">=", ">"]));
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e4 = [];
    var ____id22 = form;
    var __x112 = ____id22[0];
    var __args5 = cut(____id22, 1);
    reduce(function (a, b) {
      add(__e4, [__x112, a, b]);
      return(a);
    }, __args5);
    return(join(["and"], reverse(__e4)));
  } else {
    return(form);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var __form4 = lower_pairwise(form);
  var ____id23 = __form4;
  var __x115 = ____id23[0];
  var __args6 = cut(____id23, 1);
  return(lower(reduce(function (a, b) {
    return([__x115, b, a]);
  }, reverse(__args6)), hoist));
};
var lower_special = function (form, hoist) {
  var __e5 = lower_call(form, hoist);
  if (__e5) {
    return(add(hoist, __e5));
  }
};
lower = function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    return(form);
  } else {
    if (empty63(form)) {
      return(["%array"]);
    } else {
      if (nil63(hoist)) {
        return(lower_statement(form));
      } else {
        if (lower_infix63(form)) {
          return(lower_infix(form, hoist));
        } else {
          var ____id24 = form;
          var __x118 = ____id24[0];
          var __args7 = cut(____id24, 1);
          if (__x118 === "do") {
            return(lower_do(__args7, hoist, stmt63, tail63));
          } else {
            if (__x118 === "%set") {
              return(lower_set(__args7, hoist, stmt63, tail63));
            } else {
              if (__x118 === "%if") {
                return(lower_if(__args7, hoist, stmt63, tail63));
              } else {
                if (__x118 === "%try") {
                  return(lower_try(__args7, hoist, tail63));
                } else {
                  if (__x118 === "while") {
                    return(lower_while(__args7, hoist));
                  } else {
                    if (__x118 === "%for") {
                      return(lower_for(__args7, hoist));
                    } else {
                      if (__x118 === "%function") {
                        return(lower_function(__args7));
                      } else {
                        if (__x118 === "%local-function" || __x118 === "%global-function") {
                          return(lower_definition(__x118, __args7, hoist));
                        } else {
                          if (in63(__x118, ["and", "or"])) {
                            return(lower_short(__x118, __args7, hoist));
                          } else {
                            if (statement63(__x118)) {
                              return(lower_special(form, hoist));
                            } else {
                              return(lower_call(form, hoist));
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
  return(lower(macroexpand(form)));
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
  return(_37result);
};
immediate_call63 = function (x) {
  return(obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function");
};
setenv("do", {_stash: true, special: function () {
  var __forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s3 = "";
  var ____x123 = __forms1;
  var ____i17 = 0;
  while (____i17 < _35(____x123)) {
    var __x124 = ____x123[____i17];
    if (target === "lua" && immediate_call63(__x124) && "\n" === char(__s3, edge(__s3))) {
      __s3 = clip(__s3, 0, edge(__s3)) + ";\n";
    }
    __s3 = __s3 + compile(__x124, {_stash: true, stmt: true});
    if (! atom63(__x124)) {
      if (hd(__x124) === "return" || hd(__x124) === "break") {
        break;
      }
    }
    ____i17 = ____i17 + 1;
  }
  return(__s3);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond2 = compile(cond);
  indent_level = indent_level + 1;
  var ____x127 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __cons1 = ____x127;
  var __e52;
  if (alt) {
    indent_level = indent_level + 1;
    var ____x128 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    __e52 = ____x128;
  }
  var __alt1 = __e52;
  var __ind3 = indentation();
  var __s5 = "";
  if (target === "js") {
    __s5 = __s5 + __ind3 + "if (" + __cond2 + ") {\n" + __cons1 + __ind3 + "}";
  } else {
    __s5 = __s5 + __ind3 + "if " + __cond2 + " then\n" + __cons1;
  }
  if (__alt1 && target === "js") {
    __s5 = __s5 + " else {\n" + __alt1 + __ind3 + "}";
  } else {
    if (__alt1) {
      __s5 = __s5 + __ind3 + "else\n" + __alt1;
    }
  }
  if (target === "lua") {
    return(__s5 + __ind3 + "end\n");
  } else {
    return(__s5 + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var __cond4 = compile(cond);
  indent_level = indent_level + 1;
  var ____x130 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body8 = ____x130;
  var __ind5 = indentation();
  if (target === "js") {
    return(__ind5 + "while (" + __cond4 + ") {\n" + __body8 + __ind5 + "}\n");
  } else {
    return(__ind5 + "while " + __cond4 + " do\n" + __body8 + __ind5 + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var __t2 = compile(t);
  var __ind7 = indentation();
  indent_level = indent_level + 1;
  var ____x132 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body10 = ____x132;
  if (target === "lua") {
    return(__ind7 + "for " + k + " in next, " + __t2 + " do\n" + __body10 + __ind7 + "end\n");
  } else {
    return(__ind7 + "for (" + k + " in " + __t2 + ") {\n" + __body10 + __ind7 + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __e8 = unique("e");
  var __ind9 = indentation();
  indent_level = indent_level + 1;
  var ____x137 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body12 = ____x137;
  var __hf1 = ["return", ["%array", false, __e8]];
  indent_level = indent_level + 1;
  var ____x140 = compile(__hf1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __h1 = ____x140;
  return(__ind9 + "try {\n" + __body12 + __ind9 + "}\n" + __ind9 + "catch (" + __e8 + ") {\n" + __h1 + __ind9 + "}\n");
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  return(indentation() + "delete " + compile(place));
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return(indentation() + "break");
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x144 = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + __x144);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x150 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + __x150);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e53;
  if (nil63(x)) {
    __e53 = "return";
  } else {
    __e53 = "return(" + compile(x) + ")";
  }
  var __x154 = __e53;
  return(indentation() + __x154);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var __e54;
  if (target === "js") {
    __e54 = "throw " + compile(["new", ["Error", x]]);
  } else {
    __e54 = "error(" + compile(x) + ")";
  }
  var __e12 = __e54;
  return(indentation() + __e12);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var __id26 = compile(name);
  var __value11 = compile(value);
  var __e55;
  if (is63(value)) {
    __e55 = " = " + __value11;
  } else {
    __e55 = "";
  }
  var __rh2 = __e55;
  var __e56;
  if (target === "js") {
    __e56 = "var ";
  } else {
    __e56 = "local ";
  }
  var __keyword1 = __e56;
  var __ind11 = indentation();
  return(__ind11 + __keyword1 + __id26 + __rh2);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e57;
  if (nil63(rh)) {
    __e57 = "nil";
  } else {
    __e57 = rh;
  }
  var __rh4 = compile(__e57);
  return(indentation() + __lh2 + " = " + __rh4);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k);
  if (target === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
    __t12 = "(" + __t12 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(__t12 + "." + inner(k));
  } else {
    return(__t12 + "[" + __k121 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var __forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e58;
  if (target === "lua") {
    __e58 = "{";
  } else {
    __e58 = "[";
  }
  var __open1 = __e58;
  var __e59;
  if (target === "lua") {
    __e59 = "}";
  } else {
    __e59 = "]";
  }
  var __close1 = __e59;
  var __s7 = "";
  var __c7 = "";
  var ____o8 = __forms3;
  var __k16 = undefined;
  for (__k16 in ____o8) {
    var __v9 = ____o8[__k16];
    var __e60;
    if (numeric63(__k16)) {
      __e60 = parseInt(__k16);
    } else {
      __e60 = __k16;
    }
    var __k17 = __e60;
    if (number63(__k17)) {
      __s7 = __s7 + __c7 + compile(__v9);
      __c7 = ", ";
    }
  }
  return(__open1 + __s7 + __close1);
}});
setenv("%object", {_stash: true, special: function () {
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s9 = "{";
  var __c9 = "";
  var __e61;
  if (target === "lua") {
    __e61 = " = ";
  } else {
    __e61 = ": ";
  }
  var __sep1 = __e61;
  var ____o10 = pair(__forms5);
  var __k21 = undefined;
  for (__k21 in ____o10) {
    var __v12 = ____o10[__k21];
    var __e62;
    if (numeric63(__k21)) {
      __e62 = parseInt(__k21);
    } else {
      __e62 = __k21;
    }
    var __k22 = __e62;
    if (number63(__k22)) {
      var ____id28 = __v12;
      var __k23 = ____id28[0];
      var __v13 = ____id28[1];
      if (! string63(__k23)) {
        throw new Error("Illegal key: " + str(__k23));
      }
      __s9 = __s9 + __c9 + key(__k23) + __sep1 + compile(__v13);
      __c9 = ", ";
    }
  }
  return(__s9 + "}");
}});
setenv("%literal", {_stash: true, special: function () {
  var __args9 = unstash(Array.prototype.slice.call(arguments, 0));
  return(apply(cat, map(compile, __args9)));
}});
exports.run = run;
exports["eval"] = _eval;
exports.expand = expand;
exports.compile = compile;
