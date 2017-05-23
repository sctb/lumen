var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var _i = edge(environment);
    while (_i >= 0) {
      var _b = environment[_i][k];
      if (is63(_b)) {
        var _e8;
        if (p) {
          _e8 = _b[p];
        } else {
          _e8 = _b;
        }
        return(_e8);
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
      var _e9;
      if (numeric63(_k)) {
        _e9 = parseInt(_k);
      } else {
        _e9 = _k;
      }
      var _k1 = _e9;
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
      var _e10;
      if (numeric63(_k2)) {
        _e10 = parseInt(_k2);
      } else {
        _e10 = _k2;
      }
      var _k3 = _e10;
      var _e11;
      if (_k3 === "rest") {
        _e11 = ["cut", _id, _35(lh)];
      } else {
        _e11 = ["get", _id, ["quote", bias(_k3)]];
      }
      var _x5 = _e11;
      if (is63(_k3)) {
        var _e12;
        if (_v1 === true) {
          _e12 = _k3;
        } else {
          _e12 = _v1;
        }
        var _k4 = _e12;
        _bs = join(_bs, bind(_k4, _x5));
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
    var _r20 = unique("r");
    var __o2 = args;
    var _k5 = undefined;
    for (_k5 in __o2) {
      var _v2 = __o2[_k5];
      var _e13;
      if (numeric63(_k5)) {
        _e13 = parseInt(_k5);
      } else {
        _e13 = _k5;
      }
      var _k6 = _e13;
      if (number63(_k6)) {
        if (atom63(_v2)) {
          add(_args1, _v2);
        } else {
          var _x23 = unique("x");
          add(_args1, _x23);
          _bs1 = join(_bs1, [_v2, _x23]);
        }
      }
    }
    if (keys63(args)) {
      _bs1 = join(_bs1, [_r20, rest()]);
      var _n3 = _35(_args1);
      var _i5 = 0;
      while (_i5 < _n3) {
        var _v3 = _args1[_i5];
        _bs1 = join(_bs1, [_v3, ["destash!", _v3, _r20]]);
        _i5 = _i5 + 1;
      }
      _bs1 = join(_bs1, [keys(args), _r20]);
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
var expand_local = function (_x31) {
  var __id1 = _x31;
  var _x32 = __id1[0];
  var _name = __id1[1];
  var _value = __id1[2];
  setenv(_name, {_stash: true, variable: true});
  return(["%local", _name, macroexpand(_value)]);
};
var expand_function = function (_x34) {
  var __id2 = _x34;
  var _x35 = __id2[0];
  var _args = __id2[1];
  var _body = cut(__id2, 2);
  add(environment, {});
  var __o3 = _args;
  var __i6 = undefined;
  for (__i6 in __o3) {
    var __x36 = __o3[__i6];
    var _e14;
    if (numeric63(__i6)) {
      _e14 = parseInt(__i6);
    } else {
      _e14 = __i6;
    }
    var __i61 = _e14;
    setenv(__x36, {_stash: true, variable: true});
  }
  var __x37 = join(["%function", _args], macroexpand(_body));
  drop(environment);
  return(__x37);
};
var expand_definition = function (_x39) {
  var __id3 = _x39;
  var _x40 = __id3[0];
  var _name1 = __id3[1];
  var _args11 = __id3[2];
  var _body1 = cut(__id3, 3);
  add(environment, {});
  var __o4 = _args11;
  var __i7 = undefined;
  for (__i7 in __o4) {
    var __x41 = __o4[__i7];
    var _e15;
    if (numeric63(__i7)) {
      _e15 = parseInt(__i7);
    } else {
      _e15 = __i7;
    }
    var __i71 = _e15;
    setenv(__x41, {_stash: true, variable: true});
  }
  var __x42 = join([_x40, _name1, _args11], macroexpand(_body1));
  drop(environment);
  return(__x42);
};
var expand_macro = function (form) {
  return(macroexpand(expand1(form)));
};
expand1 = function (_x44) {
  var __id4 = _x44;
  var _name2 = __id4[0];
  var _body2 = cut(__id4, 1);
  return(apply(macro_function(_name2), _body2));
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      var _x45 = hd(form);
      if (_x45 === "%local") {
        return(expand_local(form));
      } else {
        if (_x45 === "%function") {
          return(expand_function(form));
        } else {
          if (_x45 === "%global-function") {
            return(expand_definition(form));
          } else {
            if (_x45 === "%local-function") {
              return(expand_definition(form));
            } else {
              if (macro63(_x45)) {
                return(expand_macro(form));
              } else {
                return(map(macroexpand, form));
              }
            }
          }
        }
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var _xs = [["list"]];
  var __o5 = form;
  var _k7 = undefined;
  for (_k7 in __o5) {
    var _v4 = __o5[_k7];
    var _e16;
    if (numeric63(_k7)) {
      _e16 = parseInt(_k7);
    } else {
      _e16 = _k7;
    }
    var _k8 = _e16;
    if (! number63(_k8)) {
      var _e17;
      if (quasisplice63(_v4, depth)) {
        _e17 = quasiexpand(_v4[1]);
      } else {
        _e17 = quasiexpand(_v4, depth);
      }
      var _v5 = _e17;
      last(_xs)[_k8] = _v5;
    }
  }
  var __x48 = form;
  var __i9 = 0;
  while (__i9 < _35(__x48)) {
    var _x49 = __x48[__i9];
    if (quasisplice63(_x49, depth)) {
      var _x50 = quasiexpand(_x49[1]);
      add(_xs, _x50);
      add(_xs, ["list"]);
    } else {
      add(last(_xs), quasiexpand(_x49, depth));
    }
    __i9 = __i9 + 1;
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
expand_if = function (_x54) {
  var __id5 = _x54;
  var _a = __id5[0];
  var _b2 = __id5[1];
  var _c = cut(__id5, 2);
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
  var _i10 = 0;
  while (_i10 < indent_level) {
    _s = _s + "  ";
    _i10 = _i10 + 1;
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
  if (none63(id) || reserved63(id)) {
    return(false);
  } else {
    var _i11 = 0;
    while (_i11 < _35(id)) {
      if (! valid_code63(code(id, _i11))) {
        return(false);
      }
      _i11 = _i11 + 1;
    }
    return(true);
  }
};
key = function (k) {
  var _i12 = inner(k);
  if (valid_id63(_i12)) {
    return(_i12);
  } else {
    if (target === "js") {
      return(k);
    } else {
      return("[" + k + "]");
    }
  }
};
mapo = function (f, t) {
  var _o6 = [];
  var __o7 = t;
  var _k9 = undefined;
  for (_k9 in __o7) {
    var _v6 = __o7[_k9];
    var _e18;
    if (numeric63(_k9)) {
      _e18 = parseInt(_k9);
    } else {
      _e18 = _k9;
    }
    var _k10 = _e18;
    var _x58 = f(_v6);
    if (is63(_x58)) {
      add(_o6, literal(_k10));
      add(_o6, _x58);
    }
  }
  return(_o6);
};
var __x60 = [];
var __x61 = [];
__x61.js = "!";
__x61.lua = "not";
__x60["not"] = __x61;
var __x62 = [];
__x62["*"] = true;
__x62["/"] = true;
__x62["%"] = true;
var __x63 = [];
__x63["+"] = true;
__x63["-"] = true;
var __x64 = [];
var __x65 = [];
__x65.js = "+";
__x65.lua = "..";
__x64.cat = __x65;
var __x66 = [];
__x66["<"] = true;
__x66[">"] = true;
__x66["<="] = true;
__x66[">="] = true;
var __x67 = [];
var __x68 = [];
__x68.js = "===";
__x68.lua = "==";
__x67["="] = __x68;
var __x69 = [];
var __x70 = [];
__x70.js = "&&";
__x70.lua = "and";
__x69["and"] = __x70;
var __x71 = [];
var __x72 = [];
__x72.js = "||";
__x72.lua = "or";
__x71["or"] = __x72;
var infix = [__x60, __x62, __x63, __x64, __x66, __x67, __x69, __x71];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var __o8 = infix;
    var _k11 = undefined;
    for (_k11 in __o8) {
      var _v7 = __o8[_k11];
      var _e19;
      if (numeric63(_k11)) {
        _e19 = parseInt(_k11);
      } else {
        _e19 = _k11;
      }
      var _k12 = _e19;
      if (_v7[hd(form)]) {
        return(index(_k12));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var _x74 = level[op];
    if (_x74 === true) {
      return(op);
    } else {
      if (is63(_x74)) {
        return(_x74[target]);
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
  var __x75 = args;
  var __i15 = 0;
  while (__i15 < _35(__x75)) {
    var _x76 = __x75[__i15];
    _s1 = _s1 + _c1 + compile(_x76);
    _c1 = ", ";
    __i15 = __i15 + 1;
  }
  return(_s1 + ")");
};
var escape_newlines = function (s) {
  var _s11 = "";
  var _i16 = 0;
  while (_i16 < _35(s)) {
    var _c2 = char(s, _i16);
    var _e20;
    if (_c2 === "\n") {
      _e20 = "\\n";
    } else {
      _e20 = _c2;
    }
    _s11 = _s11 + _e20;
    _i16 = _i16 + 1;
  }
  return(_s11);
};
var id = function (id) {
  var _e21;
  if (number_code63(code(id, 0))) {
    _e21 = "_";
  } else {
    _e21 = "";
  }
  var _id11 = _e21;
  var _i17 = 0;
  while (_i17 < _35(id)) {
    var _c3 = char(id, _i17);
    var _n9 = code(_c3);
    var _e22;
    if (_c3 === "-" && !( id === "-")) {
      _e22 = "_";
    } else {
      var _e23;
      if (valid_code63(_n9)) {
        _e23 = _c3;
      } else {
        var _e24;
        if (_i17 === 0) {
          _e24 = "_" + _n9;
        } else {
          _e24 = _n9;
        }
        _e23 = _e24;
      }
      _e22 = _e23;
    }
    var _c11 = _e22;
    _id11 = _id11 + _c11;
    _i17 = _i17 + 1;
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
                  if (x === -inf) {
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
  var __id6 = form;
  var _x77 = __id6[0];
  var _args2 = cut(__id6, 1);
  var __id7 = getenv(_x77);
  var _special = __id7.special;
  var _stmt = __id7.stmt;
  var _self_tr63 = __id7.tr;
  var _tr = terminator(stmt63 && ! _self_tr63);
  return(apply(_special, _args2) + _tr);
};
var parenthesize_call63 = function (x) {
  return(! atom63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var _f = hd(form);
  var _f1 = compile(_f);
  var _args3 = compile_args(stash42(tl(form)));
  if (parenthesize_call63(_f)) {
    return("(" + _f1 + ")" + _args3);
  } else {
    return(_f1 + _args3);
  }
};
var op_delims = function (parent, child) {
  var __r57 = unstash(Array.prototype.slice.call(arguments, 2));
  var _parent = destash33(parent, __r57);
  var _child = destash33(child, __r57);
  var __id8 = __r57;
  var _right = __id8.right;
  var _e25;
  if (_right) {
    _e25 = _6261;
  } else {
    _e25 = _62;
  }
  if (_e25(precedence(_child), precedence(_parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var __id9 = form;
  var _op = __id9[0];
  var __id10 = cut(__id9, 1);
  var _a1 = __id10[0];
  var _b3 = __id10[1];
  var __id111 = op_delims(form, _a1);
  var _ao = __id111[0];
  var _ac = __id111[1];
  var __id12 = op_delims(form, _b3, {_stash: true, right: true});
  var _bo = __id12[0];
  var _bc = __id12[1];
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
  var __r59 = unstash(Array.prototype.slice.call(arguments, 2));
  var _args4 = destash33(args, __r59);
  var _body3 = destash33(body, __r59);
  var __id13 = __r59;
  var _name3 = __id13.name;
  var _prefix = __id13.prefix;
  var _e26;
  if (_name3) {
    _e26 = compile(_name3);
  } else {
    _e26 = "";
  }
  var _id14 = _e26;
  var _e27;
  if (target === "lua" && _args4.rest) {
    _e27 = join(_args4, ["|...|"]);
  } else {
    _e27 = _args4;
  }
  var _args12 = _e27;
  var _args5 = compile_args(_args12);
  indent_level = indent_level + 1;
  var __x81 = compile(_body3, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body4 = __x81;
  var _ind = indentation();
  var _e28;
  if (_prefix) {
    _e28 = _prefix + " ";
  } else {
    _e28 = "";
  }
  var _p = _e28;
  var _e29;
  if (target === "js") {
    _e29 = "";
  } else {
    _e29 = "end";
  }
  var _tr1 = _e29;
  if (_name3) {
    _tr1 = _tr1 + "\n";
  }
  if (target === "js") {
    return("function " + _id14 + _args5 + " {\n" + _body4 + _ind + "}" + _tr1);
  } else {
    return(_p + "function " + _id14 + _args5 + "\n" + _body4 + _ind + _tr1);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form))));
};
compile = function (form) {
  var __r61 = unstash(Array.prototype.slice.call(arguments, 1));
  var _form = destash33(form, __r61);
  var __id15 = __r61;
  var _stmt1 = __id15.stmt;
  if (nil63(_form)) {
    return("");
  } else {
    if (special_form63(_form)) {
      return(compile_special(_form, _stmt1));
    } else {
      var _tr2 = terminator(_stmt1);
      var _e30;
      if (_stmt1) {
        _e30 = indentation();
      } else {
        _e30 = "";
      }
      var _ind1 = _e30;
      var _e31;
      if (atom63(_form)) {
        _e31 = compile_atom(_form);
      } else {
        var _e32;
        if (infix63(hd(_form))) {
          _e32 = compile_infix(_form);
        } else {
          _e32 = compile_call(_form);
        }
        _e31 = _e32;
      }
      var _form1 = _e31;
      return(_ind1 + _form1 + _tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var _hoist = [];
  var _e = lower(form, _hoist, true, tail63);
  if (some63(_hoist) && is63(_e)) {
    return(join(["do"], _hoist, [_e]));
  } else {
    if (is63(_e)) {
      return(_e);
    } else {
      if (_35(_hoist) > 1) {
        return(join(["do"], _hoist));
      } else {
        return(hd(_hoist));
      }
    }
  }
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
  var __x86 = almost(args);
  var __i18 = 0;
  while (__i18 < _35(__x86)) {
    var _x87 = __x86[__i18];
    var __y = lower(_x87, hoist, stmt63);
    if (yes(__y)) {
      var _e1 = __y;
      if (standalone63(_e1)) {
        add(hoist, _e1);
      }
    }
    __i18 = __i18 + 1;
  }
  var _e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(_e2)) {
    return(["return", _e2]);
  } else {
    return(_e2);
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var __id16 = args;
  var _lh = __id16[0];
  var _rh = __id16[1];
  add(hoist, ["%set", _lh, lower(_rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return(_lh);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var __id17 = args;
  var _cond = __id17[0];
  var _then = __id17[1];
  var _else = __id17[2];
  if (stmt63) {
    var _e34;
    if (is63(_else)) {
      _e34 = [lower_body([_else], tail63)];
    }
    return(add(hoist, join(["%if", lower(_cond, hoist), lower_body([_then], tail63)], _e34)));
  } else {
    var _e3 = unique("e");
    add(hoist, ["%local", _e3]);
    var _e33;
    if (is63(_else)) {
      _e33 = [lower(["%set", _e3, _else])];
    }
    add(hoist, join(["%if", lower(_cond, hoist), lower(["%set", _e3, _then])], _e33));
    return(_e3);
  }
};
var lower_short = function (x, args, hoist) {
  var __id18 = args;
  var _a3 = __id18[0];
  var _b5 = __id18[1];
  var _hoist1 = [];
  var _b11 = lower(_b5, _hoist1);
  if (some63(_hoist1)) {
    var _id19 = unique("id");
    var _e35;
    if (x === "and") {
      _e35 = ["%if", _id19, _b5, _id19];
    } else {
      _e35 = ["%if", _id19, _id19, _b5];
    }
    return(lower(["do", ["%local", _id19, _a3], _e35], hoist));
  } else {
    return([x, lower(_a3, hoist), _b11]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var __id20 = args;
  var _c4 = __id20[0];
  var _body5 = cut(__id20, 1);
  var _pre = [];
  var _c5 = lower(_c4, _pre);
  var _e36;
  if (none63(_pre)) {
    _e36 = ["while", _c5, lower_body(_body5)];
  } else {
    _e36 = ["while", true, join(["do"], _pre, [["%if", ["not", _c5], ["break"]], lower_body(_body5)])];
  }
  return(add(hoist, _e36));
};
var lower_for = function (args, hoist) {
  var __id21 = args;
  var _t = __id21[0];
  var _k13 = __id21[1];
  var _body6 = cut(__id21, 2);
  return(add(hoist, ["%for", lower(_t, hoist), _k13, lower_body(_body6)]));
};
var lower_function = function (args) {
  var __id22 = args;
  var _a4 = __id22[0];
  var _body7 = cut(__id22, 1);
  return(["%function", _a4, lower_body(_body7, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var __id23 = args;
  var _name4 = __id23[0];
  var _args6 = __id23[1];
  var _body8 = cut(__id23, 2);
  return(add(hoist, [kind, _name4, _args6, lower_body(_body8, true)]));
};
var lower_call = function (form, hoist) {
  var _form2 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_form2)) {
    return(_form2);
  }
};
var pairwise63 = function (form) {
  return(in63(hd(form), ["<", "<=", "=", ">=", ">"]));
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var _e4 = [];
    var __id24 = form;
    var _x116 = __id24[0];
    var _args7 = cut(__id24, 1);
    reduce(function (a, b) {
      add(_e4, [_x116, a, b]);
      return(a);
    }, _args7);
    return(join(["and"], reverse(_e4)));
  } else {
    return(form);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var _form3 = lower_pairwise(form);
  var __id25 = _form3;
  var _x119 = __id25[0];
  var _args8 = cut(__id25, 1);
  return(lower(reduce(function (a, b) {
    return([_x119, b, a]);
  }, reverse(_args8)), hoist));
};
var lower_special = function (form, hoist) {
  var _e5 = lower_call(form, hoist);
  if (_e5) {
    return(add(hoist, _e5));
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
          var __id26 = form;
          var _x122 = __id26[0];
          var _args9 = cut(__id26, 1);
          if (_x122 === "do") {
            return(lower_do(_args9, hoist, stmt63, tail63));
          } else {
            if (_x122 === "%set") {
              return(lower_set(_args9, hoist, stmt63, tail63));
            } else {
              if (_x122 === "%if") {
                return(lower_if(_args9, hoist, stmt63, tail63));
              } else {
                if (_x122 === "%try") {
                  return(lower_try(_args9, hoist, tail63));
                } else {
                  if (_x122 === "while") {
                    return(lower_while(_args9, hoist));
                  } else {
                    if (_x122 === "%for") {
                      return(lower_for(_args9, hoist));
                    } else {
                      if (_x122 === "%function") {
                        return(lower_function(_args9));
                      } else {
                        if (_x122 === "%local-function" || _x122 === "%global-function") {
                          return(lower_definition(_x122, _args9, hoist));
                        } else {
                          if (in63(_x122, ["and", "or"])) {
                            return(lower_short(_x122, _args9, hoist));
                          } else {
                            if (statement63(_x122)) {
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
  var _forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _s2 = "";
  var __x125 = _forms;
  var __i19 = 0;
  while (__i19 < _35(__x125)) {
    var _x126 = __x125[__i19];
    _s2 = _s2 + compile(_x126, {_stash: true, stmt: true});
    if (! atom63(_x126)) {
      if (hd(_x126) === "return" || hd(_x126) === "break") {
        break;
      }
    }
    __i19 = __i19 + 1;
  }
  return(_s2);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond1 = compile(cond);
  indent_level = indent_level + 1;
  var __x127 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons = __x127;
  var _e37;
  if (alt) {
    indent_level = indent_level + 1;
    var __x128 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e37 = __x128;
  }
  var _alt = _e37;
  var _ind2 = indentation();
  var _s3 = "";
  if (target === "js") {
    _s3 = _s3 + _ind2 + "if (" + _cond1 + ") {\n" + _cons + _ind2 + "}";
  } else {
    _s3 = _s3 + _ind2 + "if " + _cond1 + " then\n" + _cons;
  }
  if (_alt && target === "js") {
    _s3 = _s3 + " else {\n" + _alt + _ind2 + "}";
  } else {
    if (_alt) {
      _s3 = _s3 + _ind2 + "else\n" + _alt;
    }
  }
  if (target === "lua") {
    return(_s3 + _ind2 + "end\n");
  } else {
    return(_s3 + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _cond2 = compile(cond);
  indent_level = indent_level + 1;
  var __x129 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body9 = __x129;
  var _ind3 = indentation();
  if (target === "js") {
    return(_ind3 + "while (" + _cond2 + ") {\n" + _body9 + _ind3 + "}\n");
  } else {
    return(_ind3 + "while " + _cond2 + " do\n" + _body9 + _ind3 + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t1 = compile(t);
  var _ind4 = indentation();
  indent_level = indent_level + 1;
  var __x130 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body10 = __x130;
  if (target === "lua") {
    return(_ind4 + "for " + k + " in next, " + _t1 + " do\n" + _body10 + _ind4 + "end\n");
  } else {
    return(_ind4 + "for (" + k + " in " + _t1 + ") {\n" + _body10 + _ind4 + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var _e6 = unique("e");
  var _ind5 = indentation();
  indent_level = indent_level + 1;
  var __x131 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body11 = __x131;
  var _hf = ["return", ["%array", false, _e6]];
  indent_level = indent_level + 1;
  var __x134 = compile(_hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _h = __x134;
  return(_ind5 + "try {\n" + _body11 + _ind5 + "}\n" + _ind5 + "catch (" + _e6 + ") {\n" + _h + _ind5 + "}\n");
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
    var _x135 = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + _x135);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var _x138 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + _x138);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _e38;
  if (nil63(x)) {
    _e38 = "return";
  } else {
    _e38 = "return(" + compile(x) + ")";
  }
  var _x141 = _e38;
  return(indentation() + _x141);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var _e39;
  if (target === "js") {
    _e39 = "throw " + compile(["new", ["Error", x]]);
  } else {
    _e39 = "error(" + compile(x) + ")";
  }
  var _e7 = _e39;
  return(indentation() + _e7);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var _id27 = compile(name);
  var _value1 = compile(value);
  var _e40;
  if (is63(value)) {
    _e40 = " = " + _value1;
  } else {
    _e40 = "";
  }
  var _rh1 = _e40;
  var _e41;
  if (target === "js") {
    _e41 = "var ";
  } else {
    _e41 = "local ";
  }
  var _keyword = _e41;
  var _ind6 = indentation();
  return(_ind6 + _keyword + _id27 + _rh1);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var _lh1 = compile(lh);
  var _e42;
  if (nil63(rh)) {
    _e42 = "nil";
  } else {
    _e42 = rh;
  }
  var _rh2 = compile(_e42);
  return(indentation() + _lh1 + " = " + _rh2);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _t11 = compile(t);
  var _k111 = compile(k);
  if (target === "lua" && char(_t11, 0) === "{" || infix_operator63(t)) {
    _t11 = "(" + _t11 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_t11 + "." + inner(k));
  } else {
    return(_t11 + "[" + _k111 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var _forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var _e43;
  if (target === "lua") {
    _e43 = "{";
  } else {
    _e43 = "[";
  }
  var _open = _e43;
  var _e44;
  if (target === "lua") {
    _e44 = "}";
  } else {
    _e44 = "]";
  }
  var _close = _e44;
  var _s4 = "";
  var _c6 = "";
  var __o9 = _forms1;
  var _k14 = undefined;
  for (_k14 in __o9) {
    var _v8 = __o9[_k14];
    var _e45;
    if (numeric63(_k14)) {
      _e45 = parseInt(_k14);
    } else {
      _e45 = _k14;
    }
    var _k15 = _e45;
    if (number63(_k15)) {
      _s4 = _s4 + _c6 + compile(_v8);
      _c6 = ", ";
    }
  }
  return(_open + _s4 + _close);
}});
setenv("%object", {_stash: true, special: function () {
  var _forms2 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s5 = "{";
  var _c7 = "";
  var _e46;
  if (target === "lua") {
    _e46 = " = ";
  } else {
    _e46 = ": ";
  }
  var _sep = _e46;
  var __o10 = pair(_forms2);
  var _k16 = undefined;
  for (_k16 in __o10) {
    var _v9 = __o10[_k16];
    var _e47;
    if (numeric63(_k16)) {
      _e47 = parseInt(_k16);
    } else {
      _e47 = _k16;
    }
    var _k17 = _e47;
    if (number63(_k17)) {
      var __id28 = _v9;
      var _k18 = __id28[0];
      var _v10 = __id28[1];
      if (! string63(_k18)) {
        throw new Error("Illegal key: " + str(_k18));
      }
      _s5 = _s5 + _c7 + key(_k18) + _sep + compile(_v10);
      _c7 = ", ";
    }
  }
  return(_s5 + "}");
}});
setenv("%literal", {_stash: true, special: function () {
  var _args10 = unstash(Array.prototype.slice.call(arguments, 0));
  return(apply(cat, map(compile, _args10)));
}});
exports.run = run;
exports.eval = eval;
exports.expand = expand;
exports.compile = compile;
