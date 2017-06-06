var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var _i = edge(environment);
    while (_i >= 0) {
      var _b = environment[_i][k];
      if (is63(_b)) {
        var _e24;
        if (p) {
          _e24 = _b[p];
        } else {
          _e24 = _b;
        }
        return(_e24);
      } else {
        _i = _i - 1;
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
  var _b1 = first(function (frame) {
    return(frame[k]);
  }, reverse(environment));
  return(! atom63(_b1) && is63(_b1.variable));
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
var _names = {};
unique = function (x) {
  if (_names[x]) {
    var _i1 = _names[x];
    _names[x] = _names[x] + 1;
    return(unique(x + _i1));
  } else {
    _names[x] = 1;
    return("_" + x);
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var _l = ["%object", "\"_stash\"", true];
    var __o = args;
    var _k = undefined;
    for (_k in __o) {
      var _v = __o[_k];
      var _e25;
      if (numeric63(_k)) {
        _e25 = parseInt(_k);
      } else {
        _e25 = _k;
      }
      var _k1 = _e25;
      if (! number63(_k1)) {
        add(_l, literal(_k1));
        add(_l, _v);
      }
    }
    return(join(args, [_l]));
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
    var _id = unique("id");
    var _bs = [_id, rh];
    var __o1 = lh;
    var _k2 = undefined;
    for (_k2 in __o1) {
      var _v1 = __o1[_k2];
      var _e26;
      if (numeric63(_k2)) {
        _e26 = parseInt(_k2);
      } else {
        _e26 = _k2;
      }
      var _k3 = _e26;
      var _e27;
      if (_k3 === "rest") {
        _e27 = ["cut", _id, _35(lh)];
      } else {
        _e27 = ["get", _id, ["quote", bias(_k3)]];
      }
      var _x8 = _e27;
      if (is63(_k3)) {
        var _e28;
        if (_v1 === true) {
          _e28 = _k3;
        } else {
          _e28 = _v1;
        }
        var _k4 = _e28;
        _bs = join(_bs, bind(_k4, _x8));
      }
    }
    return(_bs);
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return([["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]);
}});
bind42 = function (args, body) {
  var _args1 = [];
  var rest = function () {
    _args1.rest = true;
    if (target === "js") {
      return(["unstash", ["arguments%", _35(_args1)]]);
    } else {
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([_args1, join(["let", [args, rest()]], body)]);
  } else {
    var _bs1 = [];
    var _r21 = unique("r");
    var __o2 = args;
    var _k5 = undefined;
    for (_k5 in __o2) {
      var _v2 = __o2[_k5];
      var _e29;
      if (numeric63(_k5)) {
        _e29 = parseInt(_k5);
      } else {
        _e29 = _k5;
      }
      var _k6 = _e29;
      if (number63(_k6)) {
        if (atom63(_v2)) {
          add(_args1, _v2);
        } else {
          var _x30 = unique("x");
          add(_args1, _x30);
          _bs1 = join(_bs1, [_v2, _x30]);
        }
      }
    }
    if (keys63(args)) {
      _bs1 = join(_bs1, [_r21, rest()]);
      var _n3 = _35(_args1);
      var _i5 = 0;
      while (_i5 < _n3) {
        var _v3 = _args1[_i5];
        _bs1 = join(_bs1, [_v3, ["destash!", _v3, _r21]]);
        _i5 = _i5 + 1;
      }
      _bs1 = join(_bs1, [keys(args), _r21]);
    }
    return([_args1, join(["let", _bs1], body)]);
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
var macroexpansion63 = function (form) {
  return(obj63(form) && form[0] === "%expansion");
};
macroexpansion = function (form) {
  return(["%expansion", form]);
};
setenv("%local", {_stash: true, macro: function (name, value) {
  return(macroexpansion(["%local", name, macroexpand(value)]));
}});
setenv("%function", {_stash: true, macro: function (args, body) {
  add(environment, {});
  var __o4 = args;
  var __i7 = undefined;
  for (__i7 in __o4) {
    var __x44 = __o4[__i7];
    var _e30;
    if (numeric63(__i7)) {
      _e30 = parseInt(__i7);
    } else {
      _e30 = __i7;
    }
    var __i71 = _e30;
    setenv(__x44, {_stash: true, variable: true});
  }
  var __x45 = ["%function", args, macroexpand(body)];
  drop(environment);
  return(macroexpansion(__x45));
}});
setenv("%local-function", {_stash: true, macro: function (name, args, body) {
  add(environment, {});
  var __o6 = args;
  var __i9 = undefined;
  for (__i9 in __o6) {
    var __x50 = __o6[__i9];
    var _e31;
    if (numeric63(__i9)) {
      _e31 = parseInt(__i9);
    } else {
      _e31 = __i9;
    }
    var __i91 = _e31;
    setenv(__x50, {_stash: true, variable: true});
  }
  var __x51 = ["%local-function", name, args, macroexpand(body)];
  drop(environment);
  return(macroexpansion(__x51));
}});
setenv("%global-function", {_stash: true, macro: function (name, args, body) {
  add(environment, {});
  var __o8 = args;
  var __i11 = undefined;
  for (__i11 in __o8) {
    var __x56 = __o8[__i11];
    var _e32;
    if (numeric63(__i11)) {
      _e32 = parseInt(__i11);
    } else {
      _e32 = __i11;
    }
    var __i111 = _e32;
    setenv(__x56, {_stash: true, variable: true});
  }
  var __x57 = ["%global-function", name, args, macroexpand(body)];
  drop(environment);
  return(macroexpansion(__x57));
}});
var expand_macro = function (form) {
  return(expand1(form, true));
};
expand1 = function (_x59, expand63) {
  var __id1 = _x59;
  var _name = __id1[0];
  var _body = cut(__id1, 1);
  var _form = apply(macro_function(_name), _body);
  if (macroexpansion63(_form)) {
    return(_form[1]);
  } else {
    if (expand63) {
      return(macroexpand(_form));
    } else {
      return(_form);
    }
  }
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      var _x60 = hd(form);
      if (macro63(_x60)) {
        return(expand_macro(form));
      } else {
        return(map(macroexpand, form));
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var _xs = [["list"]];
  var __o9 = form;
  var _k7 = undefined;
  for (_k7 in __o9) {
    var _v4 = __o9[_k7];
    var _e33;
    if (numeric63(_k7)) {
      _e33 = parseInt(_k7);
    } else {
      _e33 = _k7;
    }
    var _k8 = _e33;
    if (! number63(_k8)) {
      var _e34;
      if (quasisplice63(_v4, depth)) {
        _e34 = quasiexpand(_v4[1]);
      } else {
        _e34 = quasiexpand(_v4, depth);
      }
      var _v5 = _e34;
      last(_xs)[_k8] = _v5;
    }
  }
  var __x63 = form;
  var __i13 = 0;
  while (__i13 < _35(__x63)) {
    var _x64 = __x63[__i13];
    if (quasisplice63(_x64, depth)) {
      var _x65 = quasiexpand(_x64[1]);
      add(_xs, _x65);
      add(_xs, ["list"]);
    } else {
      add(last(_xs), quasiexpand(_x64, depth));
    }
    __i13 = __i13 + 1;
  }
  var _pruned = keep(function (x) {
    return(_35(x) > 1 || !( hd(x) === "list") || keys63(x));
  }, _xs);
  if (one63(_pruned)) {
    return(hd(_pruned));
  } else {
    return(join(["join"], _pruned));
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
expand_if = function (_x69) {
  var __id2 = _x69;
  var _a = __id2[0];
  var _b2 = __id2[1];
  var _c = cut(__id2, 2);
  if (is63(_b2)) {
    return([join(["%if", _a, _b2], expand_if(_c))]);
  } else {
    if (is63(_a)) {
      return([_a]);
    }
  }
};
indent_level = 0;
indentation = function () {
  var _s = "";
  var _i14 = 0;
  while (_i14 < indent_level) {
    _s = _s + "  ";
    _i14 = _i14 + 1;
  }
  return(_s);
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return(has63(reserved, x));
};
var valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id) || number_code63(code(id, 0))) {
    return(false);
  } else {
    var _i15 = 0;
    while (_i15 < _35(id)) {
      if (! valid_code63(code(id, _i15))) {
        return(false);
      }
      _i15 = _i15 + 1;
    }
    return(true);
  }
};
key = function (k) {
  var _i16 = inner(k);
  if (valid_id63(_i16)) {
    return(_i16);
  } else {
    if (target === "js") {
      return(k);
    } else {
      return("[" + k + "]");
    }
  }
};
mapo = function (f, t) {
  var _o10 = [];
  var __o11 = t;
  var _k9 = undefined;
  for (_k9 in __o11) {
    var _v6 = __o11[_k9];
    var _e35;
    if (numeric63(_k9)) {
      _e35 = parseInt(_k9);
    } else {
      _e35 = _k9;
    }
    var _k10 = _e35;
    var _x73 = f(_v6);
    if (is63(_x73)) {
      add(_o10, literal(_k10));
      add(_o10, _x73);
    }
  }
  return(_o10);
};
var __x75 = [];
var __x76 = [];
__x76.js = "!";
__x76.lua = "not";
__x75["not"] = __x76;
var __x77 = [];
__x77["*"] = true;
__x77["/"] = true;
__x77["%"] = true;
var __x78 = [];
var __x79 = [];
__x79.js = "+";
__x79.lua = "..";
__x78.cat = __x79;
var __x80 = [];
__x80["+"] = true;
__x80["-"] = true;
var __x81 = [];
__x81["<"] = true;
__x81[">"] = true;
__x81["<="] = true;
__x81[">="] = true;
var __x82 = [];
var __x83 = [];
__x83.js = "===";
__x83.lua = "==";
__x82["="] = __x83;
var __x84 = [];
var __x85 = [];
__x85.js = "&&";
__x85.lua = "and";
__x84["and"] = __x85;
var __x86 = [];
var __x87 = [];
__x87.js = "||";
__x87.lua = "or";
__x86["or"] = __x87;
var infix = [__x75, __x77, __x78, __x80, __x81, __x82, __x84, __x86];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var __o12 = infix;
    var _k11 = undefined;
    for (_k11 in __o12) {
      var _v7 = __o12[_k11];
      var _e36;
      if (numeric63(_k11)) {
        _e36 = parseInt(_k11);
      } else {
        _e36 = _k11;
      }
      var _k12 = _e36;
      if (_v7[hd(form)]) {
        return(index(_k12));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var _x89 = level[op];
    if (_x89 === true) {
      return(op);
    } else {
      if (is63(_x89)) {
        return(_x89[target]);
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
  var _s1 = "(";
  var _c1 = "";
  var __x90 = args;
  var __i19 = 0;
  while (__i19 < _35(__x90)) {
    var _x91 = __x90[__i19];
    _s1 = _s1 + _c1 + compile(_x91);
    _c1 = ", ";
    __i19 = __i19 + 1;
  }
  return(_s1 + ")");
};
var escape_newlines = function (s) {
  var _s11 = "";
  var _i20 = 0;
  while (_i20 < _35(s)) {
    var _c2 = char(s, _i20);
    var _e37;
    if (_c2 === "\n") {
      _e37 = "\\n";
    } else {
      _e37 = _c2;
    }
    _s11 = _s11 + _e37;
    _i20 = _i20 + 1;
  }
  return(_s11);
};
var id = function (id) {
  var _e38;
  if (number_code63(code(id, 0))) {
    _e38 = "_";
  } else {
    _e38 = "";
  }
  var _id11 = _e38;
  var _i21 = 0;
  while (_i21 < _35(id)) {
    var _c3 = char(id, _i21);
    var _n13 = code(_c3);
    var _e39;
    if (_c3 === "-" && !( id === "-")) {
      _e39 = "_";
    } else {
      var _e40;
      if (valid_code63(_n13)) {
        _e40 = _c3;
      } else {
        var _e41;
        if (_i21 === 0) {
          _e41 = "_" + _n13;
        } else {
          _e41 = _n13;
        }
        _e40 = _e41;
      }
      _e39 = _e40;
    }
    var _c11 = _e39;
    _id11 = _id11 + _c11;
    _i21 = _i21 + 1;
  }
  if (reserved63(_id11)) {
    return("_" + _id11);
  } else {
    return(_id11);
  }
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
  var __id3 = form;
  var _x92 = __id3[0];
  var _args = cut(__id3, 1);
  var __id4 = getenv(_x92);
  var _special = __id4.special;
  var _stmt = __id4.stmt;
  var _self_tr63 = __id4.tr;
  var _tr = terminator(stmt63 && ! _self_tr63);
  return(apply(_special, _args) + _tr);
};
var parenthesize_call63 = function (x) {
  return(! atom63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var _f = hd(form);
  var _f1 = compile(_f);
  var _args11 = compile_args(stash42(tl(form)));
  if (parenthesize_call63(_f)) {
    return("(" + _f1 + ")" + _args11);
  } else {
    return(_f1 + _args11);
  }
};
var op_delims = function (parent, child) {
  var __r65 = unstash(Array.prototype.slice.call(arguments, 2));
  var _parent = destash33(parent, __r65);
  var _child = destash33(child, __r65);
  var __id5 = __r65;
  var _right = __id5.right;
  var _e42;
  if (_right) {
    _e42 = _6261;
  } else {
    _e42 = _62;
  }
  if (_e42(precedence(_child), precedence(_parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var __id6 = form;
  var _op = __id6[0];
  var __id7 = cut(__id6, 1);
  var _a1 = __id7[0];
  var _b3 = __id7[1];
  var __id8 = op_delims(form, _a1);
  var _ao = __id8[0];
  var _ac = __id8[1];
  var __id9 = op_delims(form, _b3, {_stash: true, right: true});
  var _bo = __id9[0];
  var _bc = __id9[1];
  var _a2 = compile(_a1);
  var _b4 = compile(_b3);
  var _op1 = getop(_op);
  if (unary63(form)) {
    return(_op1 + _ao + " " + _a2 + _ac);
  } else {
    return(_ao + _a2 + _ac + " " + _op1 + " " + _bo + _b4 + _bc);
  }
};
compile_function = function (args, body) {
  var __r67 = unstash(Array.prototype.slice.call(arguments, 2));
  var _args2 = destash33(args, __r67);
  var _body1 = destash33(body, __r67);
  var __id10 = __r67;
  var _name1 = __id10.name;
  var _prefix = __id10.prefix;
  var _e43;
  if (_name1) {
    _e43 = compile(_name1);
  } else {
    _e43 = "";
  }
  var _id111 = _e43;
  var _e44;
  if (target === "lua" && _args2.rest) {
    _e44 = join(_args2, ["|...|"]);
  } else {
    _e44 = _args2;
  }
  var _args12 = _e44;
  var _args3 = compile_args(_args12);
  indent_level = indent_level + 1;
  var __x96 = compile(_body1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body2 = __x96;
  var _ind = indentation();
  var _e45;
  if (_prefix) {
    _e45 = _prefix + " ";
  } else {
    _e45 = "";
  }
  var _p = _e45;
  var _e46;
  if (target === "js") {
    _e46 = "";
  } else {
    _e46 = "end";
  }
  var _tr1 = _e46;
  if (_name1) {
    _tr1 = _tr1 + "\n";
  }
  if (target === "js") {
    return("function " + _id111 + _args3 + " {\n" + _body2 + _ind + "}" + _tr1);
  } else {
    return(_p + "function " + _id111 + _args3 + "\n" + _body2 + _ind + _tr1);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form))));
};
compile = function (form) {
  var __r69 = unstash(Array.prototype.slice.call(arguments, 1));
  var _form1 = destash33(form, __r69);
  var __id12 = __r69;
  var _stmt1 = __id12.stmt;
  if (nil63(_form1)) {
    return("");
  } else {
    if (special_form63(_form1)) {
      return(compile_special(_form1, _stmt1));
    } else {
      var _tr2 = terminator(_stmt1);
      var _e47;
      if (_stmt1) {
        _e47 = indentation();
      } else {
        _e47 = "";
      }
      var _ind1 = _e47;
      var _e48;
      if (atom63(_form1)) {
        _e48 = compile_atom(_form1);
      } else {
        var _e49;
        if (infix63(hd(_form1))) {
          _e49 = compile_infix(_form1);
        } else {
          _e49 = compile_call(_form1);
        }
        _e48 = _e49;
      }
      var _form2 = _e48;
      return(_ind1 + _form2 + _tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var _hoist = [];
  var _e3 = lower(form, _hoist, true, tail63);
  var _e50;
  if (some63(_hoist) && is63(_e3)) {
    _e50 = join(["do"], _hoist, [_e3]);
  } else {
    var _e51;
    if (is63(_e3)) {
      _e51 = _e3;
    } else {
      var _e52;
      if (_35(_hoist) > 1) {
        _e52 = join(["do"], _hoist);
      } else {
        _e52 = hd(_hoist);
      }
      _e51 = _e52;
    }
    _e50 = _e51;
  }
  return(either(_e50, ["do"]));
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
  var __x102 = almost(args);
  var __i22 = 0;
  while (__i22 < _35(__x102)) {
    var _x103 = __x102[__i22];
    var __y = lower(_x103, hoist, stmt63);
    if (yes(__y)) {
      var _e4 = __y;
      if (standalone63(_e4)) {
        add(hoist, _e4);
      }
    }
    __i22 = __i22 + 1;
  }
  var _e5 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(_e5)) {
    return(["return", _e5]);
  } else {
    return(_e5);
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var __id13 = args;
  var _lh = __id13[0];
  var _rh = __id13[1];
  add(hoist, ["%set", lower(_lh, hoist), lower(_rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return(_lh);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var __id14 = args;
  var _cond = __id14[0];
  var _then = __id14[1];
  var _else = __id14[2];
  if (stmt63) {
    var _e54;
    if (is63(_else)) {
      _e54 = [lower_body([_else], tail63)];
    }
    return(add(hoist, join(["%if", lower(_cond, hoist), lower_body([_then], tail63)], _e54)));
  } else {
    var _e6 = unique("e");
    add(hoist, ["%local", _e6]);
    var _e53;
    if (is63(_else)) {
      _e53 = [lower(["%set", _e6, _else])];
    }
    add(hoist, join(["%if", lower(_cond, hoist), lower(["%set", _e6, _then])], _e53));
    return(_e6);
  }
};
var lower_short = function (x, args, hoist) {
  var __id15 = args;
  var _a3 = __id15[0];
  var _b5 = __id15[1];
  var _hoist1 = [];
  var _b11 = lower(_b5, _hoist1);
  if (some63(_hoist1)) {
    var _id16 = unique("id");
    var _e55;
    if (x === "and") {
      _e55 = ["%if", _id16, _b5, _id16];
    } else {
      _e55 = ["%if", _id16, _id16, _b5];
    }
    return(lower(["do", ["%local", _id16, _a3], _e55], hoist));
  } else {
    return([x, lower(_a3, hoist), _b11]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var __id17 = args;
  var _c4 = __id17[0];
  var _body3 = cut(__id17, 1);
  var _pre = [];
  var _c5 = lower(_c4, _pre);
  var _e56;
  if (none63(_pre)) {
    _e56 = ["while", _c5, lower_body(_body3)];
  } else {
    _e56 = ["while", true, join(["do"], _pre, [["%if", ["not", _c5], ["break"]], lower_body(_body3)])];
  }
  return(add(hoist, _e56));
};
var lower_for = function (args, hoist) {
  var __id18 = args;
  var _t = __id18[0];
  var _k13 = __id18[1];
  var _body4 = cut(__id18, 2);
  return(add(hoist, ["%for", lower(_t, hoist), _k13, lower_body(_body4)]));
};
var lower_function = function (args) {
  var __id19 = args;
  var _a4 = __id19[0];
  var _body5 = cut(__id19, 1);
  return(["%function", _a4, lower_body(_body5, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var __id20 = args;
  var _name2 = __id20[0];
  var _args4 = __id20[1];
  var _body6 = cut(__id20, 2);
  return(add(hoist, [kind, _name2, _args4, lower_body(_body6, true)]));
};
var lower_call = function (form, hoist) {
  var _form3 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_form3)) {
    return(_form3);
  }
};
var pairwise63 = function (form) {
  return(in63(hd(form), ["<", "<=", "=", ">=", ">"]));
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var _e7 = [];
    var __id21 = form;
    var _x132 = __id21[0];
    var _args5 = cut(__id21, 1);
    reduce(function (a, b) {
      add(_e7, [_x132, a, b]);
      return(a);
    }, _args5);
    return(join(["and"], reverse(_e7)));
  } else {
    return(form);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var _form4 = lower_pairwise(form);
  var __id22 = _form4;
  var _x135 = __id22[0];
  var _args6 = cut(__id22, 1);
  return(lower(reduce(function (a, b) {
    return([_x135, b, a]);
  }, reverse(_args6)), hoist));
};
var lower_special = function (form, hoist) {
  var _e8 = lower_call(form, hoist);
  if (_e8) {
    return(add(hoist, _e8));
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
          var __id23 = form;
          var _x138 = __id23[0];
          var _args7 = cut(__id23, 1);
          if (_x138 === "do") {
            return(lower_do(_args7, hoist, stmt63, tail63));
          } else {
            if (_x138 === "%set") {
              return(lower_set(_args7, hoist, stmt63, tail63));
            } else {
              if (_x138 === "%if") {
                return(lower_if(_args7, hoist, stmt63, tail63));
              } else {
                if (_x138 === "%try") {
                  return(lower_try(_args7, hoist, tail63));
                } else {
                  if (_x138 === "while") {
                    return(lower_while(_args7, hoist));
                  } else {
                    if (_x138 === "%for") {
                      return(lower_for(_args7, hoist));
                    } else {
                      if (_x138 === "%function") {
                        return(lower_function(_args7));
                      } else {
                        if (_x138 === "%local-function" || _x138 === "%global-function") {
                          return(lower_definition(_x138, _args7, hoist));
                        } else {
                          if (in63(_x138, ["and", "or"])) {
                            return(lower_short(_x138, _args7, hoist));
                          } else {
                            if (statement63(_x138)) {
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
eval = function (form) {
  var _previous = target;
  target = "js";
  var _code = compile(expand(["set", "%result", form]));
  target = _previous;
  run(_code);
  return(_37result);
};
setenv("do", {_stash: true, special: function () {
  var _forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s3 = "";
  var __x143 = _forms1;
  var __i24 = 0;
  while (__i24 < _35(__x143)) {
    var _x144 = __x143[__i24];
    _s3 = _s3 + compile(_x144, {_stash: true, stmt: true});
    if (! atom63(_x144)) {
      if (hd(_x144) === "return" || hd(_x144) === "break") {
        break;
      }
    }
    __i24 = __i24 + 1;
  }
  return(_s3);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond2 = compile(cond);
  indent_level = indent_level + 1;
  var __x147 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons1 = __x147;
  var _e57;
  if (alt) {
    indent_level = indent_level + 1;
    var __x148 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e57 = __x148;
  }
  var _alt1 = _e57;
  var _ind3 = indentation();
  var _s5 = "";
  if (target === "js") {
    _s5 = _s5 + _ind3 + "if (" + _cond2 + ") {\n" + _cons1 + _ind3 + "}";
  } else {
    _s5 = _s5 + _ind3 + "if " + _cond2 + " then\n" + _cons1;
  }
  if (_alt1 && target === "js") {
    _s5 = _s5 + " else {\n" + _alt1 + _ind3 + "}";
  } else {
    if (_alt1) {
      _s5 = _s5 + _ind3 + "else\n" + _alt1;
    }
  }
  if (target === "lua") {
    return(_s5 + _ind3 + "end\n");
  } else {
    return(_s5 + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _cond4 = compile(cond);
  indent_level = indent_level + 1;
  var __x150 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body8 = __x150;
  var _ind5 = indentation();
  if (target === "js") {
    return(_ind5 + "while (" + _cond4 + ") {\n" + _body8 + _ind5 + "}\n");
  } else {
    return(_ind5 + "while " + _cond4 + " do\n" + _body8 + _ind5 + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t2 = compile(t);
  var _ind7 = indentation();
  indent_level = indent_level + 1;
  var __x152 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body10 = __x152;
  if (target === "lua") {
    return(_ind7 + "for " + k + " in next, " + _t2 + " do\n" + _body10 + _ind7 + "end\n");
  } else {
    return(_ind7 + "for (" + k + " in " + _t2 + ") {\n" + _body10 + _ind7 + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var _e11 = unique("e");
  var _ind9 = indentation();
  indent_level = indent_level + 1;
  var __x157 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body12 = __x157;
  var _hf1 = ["return", ["%array", false, _e11]];
  indent_level = indent_level + 1;
  var __x160 = compile(_hf1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _h1 = __x160;
  return(_ind9 + "try {\n" + _body12 + _ind9 + "}\n" + _ind9 + "catch (" + _e11 + ") {\n" + _h1 + _ind9 + "}\n");
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
    var _x164 = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + _x164);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var _x170 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + _x170);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _e58;
  if (nil63(x)) {
    _e58 = "return";
  } else {
    _e58 = "return(" + compile(x) + ")";
  }
  var _x174 = _e58;
  return(indentation() + _x174);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var _e59;
  if (target === "js") {
    _e59 = "throw " + compile(["new", ["Error", x]]);
  } else {
    _e59 = "error(" + compile(x) + ")";
  }
  var _e15 = _e59;
  return(indentation() + _e15);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var _id25 = compile(name);
  var _value11 = compile(value);
  var _e60;
  if (is63(value)) {
    _e60 = " = " + _value11;
  } else {
    _e60 = "";
  }
  var _rh2 = _e60;
  var _e61;
  if (target === "js") {
    _e61 = "var ";
  } else {
    _e61 = "local ";
  }
  var _keyword1 = _e61;
  var _ind11 = indentation();
  return(_ind11 + _keyword1 + _id25 + _rh2);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var _lh2 = compile(lh);
  var _e62;
  if (nil63(rh)) {
    _e62 = "nil";
  } else {
    _e62 = rh;
  }
  var _rh4 = compile(_e62);
  return(indentation() + _lh2 + " = " + _rh4);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _t12 = compile(t);
  var _k121 = compile(k);
  if (target === "lua" && char(_t12, 0) === "{" || infix_operator63(t)) {
    _t12 = "(" + _t12 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_t12 + "." + inner(k));
  } else {
    return(_t12 + "[" + _k121 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var _forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var _e63;
  if (target === "lua") {
    _e63 = "{";
  } else {
    _e63 = "[";
  }
  var _open1 = _e63;
  var _e64;
  if (target === "lua") {
    _e64 = "}";
  } else {
    _e64 = "]";
  }
  var _close1 = _e64;
  var _s7 = "";
  var _c7 = "";
  var __o14 = _forms3;
  var _k16 = undefined;
  for (_k16 in __o14) {
    var _v9 = __o14[_k16];
    var _e65;
    if (numeric63(_k16)) {
      _e65 = parseInt(_k16);
    } else {
      _e65 = _k16;
    }
    var _k17 = _e65;
    if (number63(_k17)) {
      _s7 = _s7 + _c7 + compile(_v9);
      _c7 = ", ";
    }
  }
  return(_open1 + _s7 + _close1);
}});
setenv("%object", {_stash: true, special: function () {
  var _forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s9 = "{";
  var _c9 = "";
  var _e66;
  if (target === "lua") {
    _e66 = " = ";
  } else {
    _e66 = ": ";
  }
  var _sep1 = _e66;
  var __o16 = pair(_forms5);
  var _k21 = undefined;
  for (_k21 in __o16) {
    var _v12 = __o16[_k21];
    var _e67;
    if (numeric63(_k21)) {
      _e67 = parseInt(_k21);
    } else {
      _e67 = _k21;
    }
    var _k22 = _e67;
    if (number63(_k22)) {
      var __id27 = _v12;
      var _k23 = __id27[0];
      var _v13 = __id27[1];
      if (! string63(_k23)) {
        throw new Error("Illegal key: " + str(_k23));
      }
      _s9 = _s9 + _c9 + key(_k23) + _sep1 + compile(_v13);
      _c9 = ", ";
    }
  }
  return(_s9 + "}");
}});
setenv("%literal", {_stash: true, special: function () {
  var _args9 = unstash(Array.prototype.slice.call(arguments, 0));
  return(apply(cat, map(compile, _args9)));
}});
exports.run = run;
exports.eval = eval;
exports.expand = expand;
exports.compile = compile;
