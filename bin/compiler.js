var reader = require("reader");
var getenv = function (k, p) {
  if (string__QUESTION__(k)) {
    var _i = edge(environment);
    while (_i >= 0) {
      var _b = environment[_i][k];
      if (is__QUESTION__(_b)) {
        var _e21;
        if (p) {
          _e21 = _b[p];
        } else {
          _e21 = _b;
        }
        return(_e21);
      } else {
        _i = _i - 1;
      }
    }
  }
};
var macro_function = function (k) {
  return(getenv(k, "macro"));
};
var macro__QUESTION__ = function (k) {
  return(is__QUESTION__(macro_function(k)));
};
var special__QUESTION__ = function (k) {
  return(is__QUESTION__(getenv(k, "special")));
};
var special_form__QUESTION__ = function (form) {
  return(! atom__QUESTION__(form) && special__QUESTION__(hd(form)));
};
var statement__QUESTION__ = function (k) {
  return(special__QUESTION__(k) && getenv(k, "stmt"));
};
var symbol_expansion = function (k) {
  return(getenv(k, "symbol"));
};
var symbol__QUESTION__ = function (k) {
  return(is__QUESTION__(symbol_expansion(k)));
};
var variable__QUESTION__ = function (k) {
  var _b1 = first(function (frame) {
    return(frame[k]);
  }, reverse(environment));
  return(! atom__QUESTION__(_b1) && is__QUESTION__(_b1.variable));
};
bound__QUESTION__ = function (x) {
  return(macro__QUESTION__(x) || special__QUESTION__(x) || symbol__QUESTION__(x) || variable__QUESTION__(x));
};
quoted = function (form) {
  if (string__QUESTION__(form)) {
    return(escape(form));
  } else {
    if (atom__QUESTION__(form)) {
      return(form);
    } else {
      return(join(["list"], map(quoted, form)));
    }
  }
};
var literal = function (s) {
  if (string_literal__QUESTION__(s)) {
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
var stash__STAR__ = function (args) {
  if (keys__QUESTION__(args)) {
    var _l = ["%object", "\"_stash\"", true];
    var __o = args;
    var _k = undefined;
    for (_k in __o) {
      var _v = __o[_k];
      var _e22;
      if (numeric__QUESTION__(_k)) {
        _e22 = parseInt(_k);
      } else {
        _e22 = _k;
      }
      var _k1 = _e22;
      if (! number__QUESTION__(_k1)) {
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
  if (number__QUESTION__(k) && !( target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return(k);
};
bind = function (lh, rh) {
  if (atom__QUESTION__(lh)) {
    return([lh, rh]);
  } else {
    var _id = unique("id");
    var _bs = [_id, rh];
    var __o1 = lh;
    var _k2 = undefined;
    for (_k2 in __o1) {
      var _v1 = __o1[_k2];
      var _e23;
      if (numeric__QUESTION__(_k2)) {
        _e23 = parseInt(_k2);
      } else {
        _e23 = _k2;
      }
      var _k3 = _e23;
      var _e24;
      if (_k3 === "rest") {
        _e24 = ["cut", _id, __POUND__(lh)];
      } else {
        _e24 = ["get", _id, ["quote", bias(_k3)]];
      }
      var _x5 = _e24;
      if (is__QUESTION__(_k3)) {
        var _e25;
        if (_v1 === true) {
          _e25 = _k3;
        } else {
          _e25 = _v1;
        }
        var _k4 = _e25;
        _bs = join(_bs, bind(_k4, _x5));
      }
    }
    return(_bs);
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return([["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]);
}});
bind__STAR__ = function (args, body) {
  var _args1 = [];
  var rest = function () {
    _args1.rest = true;
    if (target === "js") {
      return(["unstash", ["arguments%", __POUND__(_args1)]]);
    } else {
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom__QUESTION__(args)) {
    return([_args1, join(["let", [args, rest()]], body)]);
  } else {
    var _bs1 = [];
    var _r21 = unique("r");
    var __o2 = args;
    var _k5 = undefined;
    for (_k5 in __o2) {
      var _v2 = __o2[_k5];
      var _e26;
      if (numeric__QUESTION__(_k5)) {
        _e26 = parseInt(_k5);
      } else {
        _e26 = _k5;
      }
      var _k6 = _e26;
      if (number__QUESTION__(_k6)) {
        if (atom__QUESTION__(_v2)) {
          add(_args1, _v2);
        } else {
          var _x30 = unique("x");
          add(_args1, _x30);
          _bs1 = join(_bs1, [_v2, _x30]);
        }
      }
    }
    if (keys__QUESTION__(args)) {
      _bs1 = join(_bs1, [_r21, rest()]);
      var _n3 = __POUND__(_args1);
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
var quoting__QUESTION__ = function (depth) {
  return(number__QUESTION__(depth));
};
var quasiquoting__QUESTION__ = function (depth) {
  return(quoting__QUESTION__(depth) && depth > 0);
};
var can_unquote__QUESTION__ = function (depth) {
  return(quoting__QUESTION__(depth) && depth === 1);
};
var quasisplice__QUESTION__ = function (x, depth) {
  return(can_unquote__QUESTION__(depth) && ! atom__QUESTION__(x) && hd(x) === "unquote-splicing");
};
var expand_local = function (_x38) {
  var __id1 = _x38;
  var _x39 = __id1[0];
  var _name = __id1[1];
  var _value = __id1[2];
  setenv(_name, {_stash: true, variable: true});
  return(["%local", _name, macroexpand(_value)]);
};
var expand_function = function (_x41) {
  var __id2 = _x41;
  var _x42 = __id2[0];
  var _args = __id2[1];
  var _body = cut(__id2, 2);
  add(environment, {});
  var __o3 = _args;
  var __i6 = undefined;
  for (__i6 in __o3) {
    var __x43 = __o3[__i6];
    var _e27;
    if (numeric__QUESTION__(__i6)) {
      _e27 = parseInt(__i6);
    } else {
      _e27 = __i6;
    }
    var __i61 = _e27;
    setenv(__x43, {_stash: true, variable: true});
  }
  var __x44 = join(["%function", _args], macroexpand(_body));
  drop(environment);
  return(__x44);
};
var expand_definition = function (_x46) {
  var __id3 = _x46;
  var _x47 = __id3[0];
  var _name1 = __id3[1];
  var _args11 = __id3[2];
  var _body1 = cut(__id3, 3);
  add(environment, {});
  var __o4 = _args11;
  var __i7 = undefined;
  for (__i7 in __o4) {
    var __x48 = __o4[__i7];
    var _e28;
    if (numeric__QUESTION__(__i7)) {
      _e28 = parseInt(__i7);
    } else {
      _e28 = __i7;
    }
    var __i71 = _e28;
    setenv(__x48, {_stash: true, variable: true});
  }
  var __x49 = join([_x47, _name1, _args11], macroexpand(_body1));
  drop(environment);
  return(__x49);
};
var expand_macro = function (form) {
  return(macroexpand(expand1(form)));
};
expand1 = function (_x51) {
  var __id4 = _x51;
  var _name2 = __id4[0];
  var _body2 = cut(__id4, 1);
  return(apply(macro_function(_name2), _body2));
};
macroexpand = function (form) {
  if (symbol__QUESTION__(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom__QUESTION__(form)) {
      return(form);
    } else {
      var _x52 = hd(form);
      if (_x52 === "%local") {
        return(expand_local(form));
      } else {
        if (_x52 === "%function") {
          return(expand_function(form));
        } else {
          if (_x52 === "%global-function") {
            return(expand_definition(form));
          } else {
            if (_x52 === "%local-function") {
              return(expand_definition(form));
            } else {
              if (macro__QUESTION__(_x52)) {
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
    var _e29;
    if (numeric__QUESTION__(_k7)) {
      _e29 = parseInt(_k7);
    } else {
      _e29 = _k7;
    }
    var _k8 = _e29;
    if (! number__QUESTION__(_k8)) {
      var _e30;
      if (quasisplice__QUESTION__(_v4, depth)) {
        _e30 = quasiexpand(_v4[1]);
      } else {
        _e30 = quasiexpand(_v4, depth);
      }
      var _v5 = _e30;
      last(_xs)[_k8] = _v5;
    }
  }
  var __x55 = form;
  var __i9 = 0;
  while (__i9 < __POUND__(__x55)) {
    var _x56 = __x55[__i9];
    if (quasisplice__QUESTION__(_x56, depth)) {
      var _x57 = quasiexpand(_x56[1]);
      add(_xs, _x57);
      add(_xs, ["list"]);
    } else {
      add(last(_xs), quasiexpand(_x56, depth));
    }
    __i9 = __i9 + 1;
  }
  var _pruned = keep(function (x) {
    return(__POUND__(x) > 1 || !( hd(x) === "list") || keys__QUESTION__(x));
  }, _xs);
  if (one__QUESTION__(_pruned)) {
    return(hd(_pruned));
  } else {
    return(join(["join"], _pruned));
  }
};
quasiexpand = function (form, depth) {
  if (quasiquoting__QUESTION__(depth)) {
    if (atom__QUESTION__(form)) {
      return(["quote", form]);
    } else {
      if (can_unquote__QUESTION__(depth) && hd(form) === "unquote") {
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
    if (atom__QUESTION__(form)) {
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
expand_if = function (_x61) {
  var __id5 = _x61;
  var _a = __id5[0];
  var _b2 = __id5[1];
  var _c = cut(__id5, 2);
  if (is__QUESTION__(_b2)) {
    return([join(["%if", _a, _b2], expand_if(_c))]);
  } else {
    if (is__QUESTION__(_a)) {
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
reserved__QUESTION__ = function (x) {
  return(has__QUESTION__(reserved, x));
};
var valid_code__QUESTION__ = function (n) {
  return(number_code__QUESTION__(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95 || n === 36 && target === "js");
};
valid_id__QUESTION__ = function (id) {
  if (none__QUESTION__(id) || reserved__QUESTION__(id) || number_code__QUESTION__(code(id, 0))) {
    return(false);
  } else {
    var _i11 = 0;
    while (_i11 < __POUND__(id)) {
      if (! valid_code__QUESTION__(code(id, _i11))) {
        return(false);
      }
      _i11 = _i11 + 1;
    }
    return(true);
  }
};
key = function (k) {
  var _i12 = inner(k);
  if (valid_id__QUESTION__(_i12)) {
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
    var _e31;
    if (numeric__QUESTION__(_k9)) {
      _e31 = parseInt(_k9);
    } else {
      _e31 = _k9;
    }
    var _k10 = _e31;
    var _x65 = f(_v6);
    if (is__QUESTION__(_x65)) {
      add(_o6, literal(_k10));
      add(_o6, _x65);
    }
  }
  return(_o6);
};
var __x67 = [];
var __x68 = [];
__x68.js = "!";
__x68.lua = "not";
__x67["not"] = __x68;
var __x69 = [];
__x69["*"] = true;
__x69["/"] = true;
__x69["%"] = true;
var __x70 = [];
__x70["+"] = true;
__x70["-"] = true;
var __x71 = [];
var __x72 = [];
__x72.js = "+";
__x72.lua = "..";
__x71.cat = __x72;
var __x73 = [];
__x73["<"] = true;
__x73[">"] = true;
__x73["<="] = true;
__x73[">="] = true;
var __x74 = [];
var __x75 = [];
__x75.js = "===";
__x75.lua = "==";
__x74["="] = __x75;
var __x76 = [];
var __x77 = [];
__x77.js = "&&";
__x77.lua = "and";
__x76["and"] = __x77;
var __x78 = [];
var __x79 = [];
__x79.js = "||";
__x79.lua = "or";
__x78["or"] = __x79;
var infix = [__x67, __x69, __x70, __x71, __x73, __x74, __x76, __x78];
var unary__QUESTION__ = function (form) {
  return(two__QUESTION__(form) && in__QUESTION__(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom__QUESTION__(form) || unary__QUESTION__(form))) {
    var __o8 = infix;
    var _k11 = undefined;
    for (_k11 in __o8) {
      var _v7 = __o8[_k11];
      var _e32;
      if (numeric__QUESTION__(_k11)) {
        _e32 = parseInt(_k11);
      } else {
        _e32 = _k11;
      }
      var _k12 = _e32;
      if (_v7[hd(form)]) {
        return(index(_k12));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var _x81 = level[op];
    if (_x81 === true) {
      return(op);
    } else {
      if (is__QUESTION__(_x81)) {
        return(_x81[target]);
      }
    }
  }, infix));
};
var infix__QUESTION__ = function (x) {
  return(is__QUESTION__(getop(x)));
};
infix_operator__QUESTION__ = function (x) {
  return(obj__QUESTION__(x) && infix__QUESTION__(hd(x)));
};
var compile_args = function (args) {
  var _s1 = "(";
  var _c1 = "";
  var __x82 = args;
  var __i15 = 0;
  while (__i15 < __POUND__(__x82)) {
    var _x83 = __x82[__i15];
    _s1 = _s1 + _c1 + compile(_x83);
    _c1 = ", ";
    __i15 = __i15 + 1;
  }
  return(_s1 + ")");
};
var escape_newlines = function (s) {
  var _s11 = "";
  var _i16 = 0;
  while (_i16 < __POUND__(s)) {
    var _c2 = char(s, _i16);
    var _e33;
    if (_c2 === "\n") {
      _e33 = "\\n";
    } else {
      _e33 = _c2;
    }
    _s11 = _s11 + _e33;
    _i16 = _i16 + 1;
  }
  return(_s11);
};
var id_codes = {};
id_codes[40] = "__OPEN_PAREN__";
id_codes[41] = "__CLOSE_PAREN__";
id_codes[91] = "__OPEN_SQUARE__";
id_codes[93] = "__CLOSE_SQUARE__";
id_codes[123] = "__OPEN_CURLY__";
id_codes[125] = "__CLOSE_CURLY__";
id_codes[60] = "__OPEN_ANGLE__";
id_codes[62] = "__CLOSE_ANGLE__";
id_codes[35] = "__POUND__";
id_codes[43] = "__PLUS__";
id_codes[45] = "__MINUS__";
id_codes[42] = "__STAR__";
id_codes[37] = "__PERCENT__";
id_codes[38] = "__AMPERSAND__";
id_codes[124] = "__BAR__";
id_codes[94] = "__CARET__";
id_codes[126] = "__TILDE__";
id_codes[33] = "__BANG__";
id_codes[36] = "__DOLLAR__";
id_codes[64] = "__AT__";
id_codes[61] = "__EQUAL__";
id_codes[44] = "__COMMA__";
id_codes[46] = "__PERIOD__";
id_codes[63] = "__QUESTION__";
id_codes[58] = "__COLON__";
id_codes[59] = "__SEMI_COLON__";
id_codes[47] = "__SLASH__";
id_codes[92] = "__BACK_SLASH__";
id_codes[39] = "__QUOTE__";
id_codes[96] = "__BACK_QUOTE__";
id_codes[34] = "__DOUBLE_QUOTE__";
id_codes[32] = "__SPACE__";
id_codes[9] = "__TAB__";
id_codes[13] = "__RETURN__";
id_codes[10] = "__NEWLINE__";
var id = function (str) {
  var _id11 = "";
  var _len = __POUND__(str);
  if (_len > 0) {
    var _i18 = 0;
    while (_i18 < _len) {
      var _c4 = char(str, _i18);
      var _n10 = code(_c4);
      var _id31 = _n10 === 45 && _i18 < _len - 1 && "_";
      var _e35;
      if (_id31) {
        _e35 = _id31;
      } else {
        var _e36;
        if (valid_code__QUESTION__(_n10)) {
          _e36 = _c4;
        } else {
          _e36 = id_codes[_n10] || "__CHAR_" + _n10 + "__";
        }
        _e35 = _e36;
      }
      var _c11 = _e35;
      _id11 = _id11 + _c11;
      _i18 = _i18 + 1;
    }
    if (number_code__QUESTION__(code(str, 0))) {
      _id11 = "_" + _id11 + "_";
    }
    if (reserved__QUESTION__(_id11)) {
      _id11 = "_" + _id11 + "_";
    }
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
      if (id_literal__QUESTION__(x)) {
        return(inner(x));
      } else {
        if (string_literal__QUESTION__(x)) {
          return(escape_newlines(x));
        } else {
          if (string__QUESTION__(x)) {
            return(id(x));
          } else {
            if (boolean__QUESTION__(x)) {
              if (x) {
                return("true");
              } else {
                return("false");
              }
            } else {
              if (nan__QUESTION__(x)) {
                return("nan");
              } else {
                if (x === inf) {
                  return("inf");
                } else {
                  if (x === -inf) {
                    return("-inf");
                  } else {
                    if (number__QUESTION__(x)) {
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
var terminator = function (stmt__QUESTION__) {
  if (! stmt__QUESTION__) {
    return("");
  } else {
    if (target === "js") {
      return(";\n");
    } else {
      return("\n");
    }
  }
};
var compile_special = function (form, stmt__QUESTION__) {
  var __id6 = form;
  var _x90 = __id6[0];
  var _args2 = cut(__id6, 1);
  var __id7 = getenv(_x90);
  var _special = __id7.special;
  var _stmt = __id7.stmt;
  var _self_tr__QUESTION__ = __id7.tr;
  var _tr = terminator(stmt__QUESTION__ && ! _self_tr__QUESTION__);
  return(apply(_special, _args2) + _tr);
};
var parenthesize_call__QUESTION__ = function (x) {
  return(! atom__QUESTION__(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var _f = hd(form);
  var _f1 = compile(_f);
  var _args3 = compile_args(stash__STAR__(tl(form)));
  if (parenthesize_call__QUESTION__(_f)) {
    return("(" + _f1 + ")" + _args3);
  } else {
    return(_f1 + _args3);
  }
};
var op_delims = function (parent, child) {
  var __r58 = unstash(Array.prototype.slice.call(arguments, 2));
  var _parent = destash__BANG__(parent, __r58);
  var _child = destash__BANG__(child, __r58);
  var __id8 = __r58;
  var _right = __id8.right;
  var _e37;
  if (_right) {
    _e37 = __CLOSE_ANGLE____EQUAL__;
  } else {
    _e37 = __CLOSE_ANGLE__;
  }
  if (_e37(precedence(_child), precedence(_parent))) {
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
  if (unary__QUESTION__(form)) {
    return(_op1 + _ao + " " + _a2 + _ac);
  } else {
    return(_ao + _a2 + _ac + " " + _op1 + " " + _bo + _b4 + _bc);
  }
};
compile_function = function (args, body) {
  var __r60 = unstash(Array.prototype.slice.call(arguments, 2));
  var _args4 = destash__BANG__(args, __r60);
  var _body4 = destash__BANG__(body, __r60);
  var __id13 = __r60;
  var _name4 = __id13.name;
  var _prefix = __id13.prefix;
  var _e38;
  if (_name4) {
    _e38 = compile(_name4);
  } else {
    _e38 = "";
  }
  var _id14 = _e38;
  var _e39;
  if (target === "lua" && _args4.rest) {
    _e39 = join(_args4, ["|...|"]);
  } else {
    _e39 = _args4;
  }
  var _args12 = _e39;
  var _args5 = compile_args(_args12);
  indent_level = indent_level + 1;
  var __x94 = compile(_body4, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body5 = __x94;
  var _ind = indentation();
  var _e40;
  if (_prefix) {
    _e40 = _prefix + " ";
  } else {
    _e40 = "";
  }
  var _p = _e40;
  var _e41;
  if (target === "js") {
    _e41 = "";
  } else {
    _e41 = "end";
  }
  var _tr1 = _e41;
  if (_name4) {
    _tr1 = _tr1 + "\n";
  }
  if (target === "js") {
    return("function " + _id14 + _args5 + " {\n" + _body5 + _ind + "}" + _tr1);
  } else {
    return(_p + "function " + _id14 + _args5 + "\n" + _body5 + _ind + _tr1);
  }
};
var can_return__QUESTION__ = function (form) {
  return(is__QUESTION__(form) && (atom__QUESTION__(form) || !( hd(form) === "return") && ! statement__QUESTION__(hd(form))));
};
compile = function (form) {
  var __r62 = unstash(Array.prototype.slice.call(arguments, 1));
  var _form = destash__BANG__(form, __r62);
  var __id15 = __r62;
  var _stmt1 = __id15.stmt;
  if (nil__QUESTION__(_form)) {
    return("");
  } else {
    if (special_form__QUESTION__(_form)) {
      return(compile_special(_form, _stmt1));
    } else {
      var _tr2 = terminator(_stmt1);
      var _e42;
      if (_stmt1) {
        _e42 = indentation();
      } else {
        _e42 = "";
      }
      var _ind1 = _e42;
      var _e43;
      if (atom__QUESTION__(_form)) {
        _e43 = compile_atom(_form);
      } else {
        var _e44;
        if (infix__QUESTION__(hd(_form))) {
          _e44 = compile_infix(_form);
        } else {
          _e44 = compile_call(_form);
        }
        _e43 = _e44;
      }
      var _form1 = _e43;
      return(_ind1 + _form1 + _tr2);
    }
  }
};
var lower_statement = function (form, tail__QUESTION__) {
  var _hoist = [];
  var _e = lower(form, _hoist, true, tail__QUESTION__);
  var _e45;
  if (some__QUESTION__(_hoist) && is__QUESTION__(_e)) {
    _e45 = join(["do"], _hoist, [_e]);
  } else {
    var _e46;
    if (is__QUESTION__(_e)) {
      _e46 = _e;
    } else {
      var _e47;
      if (__POUND__(_hoist) > 1) {
        _e47 = join(["do"], _hoist);
      } else {
        _e47 = hd(_hoist);
      }
      _e46 = _e47;
    }
    _e45 = _e46;
  }
  return(either(_e45, ["do"]));
};
var lower_body = function (body, tail__QUESTION__) {
  return(lower_statement(join(["do"], body), tail__QUESTION__));
};
var literal__QUESTION__ = function (form) {
  return(atom__QUESTION__(form) || hd(form) === "%array" || hd(form) === "%object");
};
var standalone__QUESTION__ = function (form) {
  return(! atom__QUESTION__(form) && ! infix__QUESTION__(hd(form)) && ! literal__QUESTION__(form) && !( "get" === hd(form)) || id_literal__QUESTION__(form));
};
var lower_do = function (args, hoist, stmt__QUESTION__, tail__QUESTION__) {
  var __x100 = almost(args);
  var __i19 = 0;
  while (__i19 < __POUND__(__x100)) {
    var _x101 = __x100[__i19];
    var __y = lower(_x101, hoist, stmt__QUESTION__);
    if (yes(__y)) {
      var _e1 = __y;
      if (standalone__QUESTION__(_e1)) {
        add(hoist, _e1);
      }
    }
    __i19 = __i19 + 1;
  }
  var _e2 = lower(last(args), hoist, stmt__QUESTION__, tail__QUESTION__);
  if (tail__QUESTION__ && can_return__QUESTION__(_e2)) {
    return(["return", _e2]);
  } else {
    return(_e2);
  }
};
var lower_set = function (args, hoist, stmt__QUESTION__, tail__QUESTION__) {
  var __id16 = args;
  var _lh = __id16[0];
  var _rh = __id16[1];
  add(hoist, ["%set", _lh, lower(_rh, hoist)]);
  if (!( stmt__QUESTION__ && ! tail__QUESTION__)) {
    return(_lh);
  }
};
var lower_if = function (args, hoist, stmt__QUESTION__, tail__QUESTION__) {
  var __id17 = args;
  var _cond = __id17[0];
  var __then_ = __id17[1];
  var __else_ = __id17[2];
  if (stmt__QUESTION__) {
    var _e49;
    if (is__QUESTION__(__else_)) {
      _e49 = [lower_body([__else_], tail__QUESTION__)];
    }
    return(add(hoist, join(["%if", lower(_cond, hoist), lower_body([__then_], tail__QUESTION__)], _e49)));
  } else {
    var _e3 = unique("e");
    add(hoist, ["%local", _e3]);
    var _e48;
    if (is__QUESTION__(__else_)) {
      _e48 = [lower(["%set", _e3, __else_])];
    }
    add(hoist, join(["%if", lower(_cond, hoist), lower(["%set", _e3, __then_])], _e48));
    return(_e3);
  }
};
var lower_short = function (x, args, hoist) {
  var __id18 = args;
  var _a3 = __id18[0];
  var _b5 = __id18[1];
  var _hoist1 = [];
  var _b11 = lower(_b5, _hoist1);
  if (some__QUESTION__(_hoist1)) {
    var _id19 = unique("id");
    var _e50;
    if (x === "and") {
      _e50 = ["%if", _id19, _b5, _id19];
    } else {
      _e50 = ["%if", _id19, _id19, _b5];
    }
    return(lower(["do", ["%local", _id19, _a3], _e50], hoist));
  } else {
    return([x, lower(_a3, hoist), _b11]);
  }
};
var lower_try = function (args, hoist, tail__QUESTION__) {
  return(add(hoist, ["%try", lower_body(args, tail__QUESTION__)]));
};
var lower_while = function (args, hoist) {
  var __id20 = args;
  var _c5 = __id20[0];
  var _body6 = cut(__id20, 1);
  var _pre = [];
  var _c6 = lower(_c5, _pre);
  var _e51;
  if (none__QUESTION__(_pre)) {
    _e51 = ["while", _c6, lower_body(_body6)];
  } else {
    _e51 = ["while", true, join(["do"], _pre, [["%if", ["not", _c6], ["break"]], lower_body(_body6)])];
  }
  return(add(hoist, _e51));
};
var lower_for = function (args, hoist) {
  var __id21 = args;
  var _t = __id21[0];
  var _k13 = __id21[1];
  var _body7 = cut(__id21, 2);
  return(add(hoist, ["%for", lower(_t, hoist), _k13, lower_body(_body7)]));
};
var lower_function = function (args) {
  var __id22 = args;
  var _a4 = __id22[0];
  var _body8 = cut(__id22, 1);
  return(["%function", _a4, lower_body(_body8, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var __id23 = args;
  var _name5 = __id23[0];
  var _args6 = __id23[1];
  var _body9 = cut(__id23, 2);
  return(add(hoist, [kind, _name5, _args6, lower_body(_body9, true)]));
};
var lower_call = function (form, hoist) {
  var _form2 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some__QUESTION__(_form2)) {
    return(_form2);
  }
};
var pairwise__QUESTION__ = function (form) {
  return(in__QUESTION__(hd(form), ["<", "<=", "=", ">=", ">"]));
};
var lower_pairwise = function (form) {
  if (pairwise__QUESTION__(form)) {
    var _e4 = [];
    var __id24 = form;
    var _x130 = __id24[0];
    var _args7 = cut(__id24, 1);
    reduce(function (a, b) {
      add(_e4, [_x130, a, b]);
      return(a);
    }, _args7);
    return(join(["and"], reverse(_e4)));
  } else {
    return(form);
  }
};
var lower_infix__QUESTION__ = function (form) {
  return(infix__QUESTION__(hd(form)) && __POUND__(form) > 3);
};
var lower_infix = function (form, hoist) {
  var _form3 = lower_pairwise(form);
  var __id25 = _form3;
  var _x133 = __id25[0];
  var _args8 = cut(__id25, 1);
  return(lower(reduce(function (a, b) {
    return([_x133, b, a]);
  }, reverse(_args8)), hoist));
};
var lower_special = function (form, hoist) {
  var _e5 = lower_call(form, hoist);
  if (_e5) {
    return(add(hoist, _e5));
  }
};
lower = function (form, hoist, stmt__QUESTION__, tail__QUESTION__) {
  if (atom__QUESTION__(form)) {
    return(form);
  } else {
    if (empty__QUESTION__(form)) {
      return(["%array"]);
    } else {
      if (nil__QUESTION__(hoist)) {
        return(lower_statement(form));
      } else {
        if (lower_infix__QUESTION__(form)) {
          return(lower_infix(form, hoist));
        } else {
          var __id26 = form;
          var _x136 = __id26[0];
          var _args9 = cut(__id26, 1);
          if (_x136 === "do") {
            return(lower_do(_args9, hoist, stmt__QUESTION__, tail__QUESTION__));
          } else {
            if (_x136 === "%set") {
              return(lower_set(_args9, hoist, stmt__QUESTION__, tail__QUESTION__));
            } else {
              if (_x136 === "%if") {
                return(lower_if(_args9, hoist, stmt__QUESTION__, tail__QUESTION__));
              } else {
                if (_x136 === "%try") {
                  return(lower_try(_args9, hoist, tail__QUESTION__));
                } else {
                  if (_x136 === "while") {
                    return(lower_while(_args9, hoist));
                  } else {
                    if (_x136 === "%for") {
                      return(lower_for(_args9, hoist));
                    } else {
                      if (_x136 === "%function") {
                        return(lower_function(_args9));
                      } else {
                        if (_x136 === "%local-function" || _x136 === "%global-function") {
                          return(lower_definition(_x136, _args9, hoist));
                        } else {
                          if (in__QUESTION__(_x136, ["and", "or"])) {
                            return(lower_short(_x136, _args9, hoist));
                          } else {
                            if (statement__QUESTION__(_x136)) {
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
__PERCENT__result = undefined;
eval = function (form) {
  var _previous = target;
  target = "js";
  var _code = compile(expand(["set", "%result", form]));
  target = _previous;
  run(_code);
  return(__PERCENT__result);
};
setenv("do", {_stash: true, special: function () {
  var _forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s3 = "";
  var __x141 = _forms1;
  var __i21 = 0;
  while (__i21 < __POUND__(__x141)) {
    var _x142 = __x141[__i21];
    _s3 = _s3 + compile(_x142, {_stash: true, stmt: true});
    if (! atom__QUESTION__(_x142)) {
      if (hd(_x142) === "return" || hd(_x142) === "break") {
        break;
      }
    }
    __i21 = __i21 + 1;
  }
  return(_s3);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond2 = compile(cond);
  indent_level = indent_level + 1;
  var __x145 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons1 = __x145;
  var _e52;
  if (alt) {
    indent_level = indent_level + 1;
    var __x146 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e52 = __x146;
  }
  var _alt1 = _e52;
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
  var __x148 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body11 = __x148;
  var _ind5 = indentation();
  if (target === "js") {
    return(_ind5 + "while (" + _cond4 + ") {\n" + _body11 + _ind5 + "}\n");
  } else {
    return(_ind5 + "while " + _cond4 + " do\n" + _body11 + _ind5 + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t2 = compile(t);
  var _ind7 = indentation();
  indent_level = indent_level + 1;
  var __x150 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body13 = __x150;
  if (target === "lua") {
    return(_ind7 + "for " + k + " in next, " + _t2 + " do\n" + _body13 + _ind7 + "end\n");
  } else {
    return(_ind7 + "for (" + k + " in " + _t2 + ") {\n" + _body13 + _ind7 + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var _e8 = unique("e");
  var _ind9 = indentation();
  indent_level = indent_level + 1;
  var __x155 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body15 = __x155;
  var _hf1 = ["return", ["%array", false, _e8]];
  indent_level = indent_level + 1;
  var __x158 = compile(_hf1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _h1 = __x158;
  return(_ind9 + "try {\n" + _body15 + _ind9 + "}\n" + _ind9 + "catch (" + _e8 + ") {\n" + _h1 + _ind9 + "}\n");
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
    var _x162 = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + _x162);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var _x168 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + _x168);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _e53;
  if (nil__QUESTION__(x)) {
    _e53 = "return";
  } else {
    _e53 = "return(" + compile(x) + ")";
  }
  var _x172 = _e53;
  return(indentation() + _x172);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var _e54;
  if (target === "js") {
    _e54 = "throw " + compile(["new", ["Error", x]]);
  } else {
    _e54 = "error(" + compile(x) + ")";
  }
  var _e12 = _e54;
  return(indentation() + _e12);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var _id28 = compile(name);
  var _value11 = compile(value);
  var _e55;
  if (is__QUESTION__(value)) {
    _e55 = " = " + _value11;
  } else {
    _e55 = "";
  }
  var _rh2 = _e55;
  var _e56;
  if (target === "js") {
    _e56 = "var ";
  } else {
    _e56 = "local ";
  }
  var _keyword1 = _e56;
  var _ind11 = indentation();
  return(_ind11 + _keyword1 + _id28 + _rh2);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var _lh2 = compile(lh);
  var _e57;
  if (nil__QUESTION__(rh)) {
    _e57 = "nil";
  } else {
    _e57 = rh;
  }
  var _rh4 = compile(_e57);
  return(indentation() + _lh2 + " = " + _rh4);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _t12 = compile(t);
  var _k121 = compile(k);
  if (target === "lua" && char(_t12, 0) === "{" || infix_operator__QUESTION__(t)) {
    _t12 = "(" + _t12 + ")";
  }
  if (string_literal__QUESTION__(k) && valid_id__QUESTION__(inner(k))) {
    return(_t12 + "." + inner(k));
  } else {
    return(_t12 + "[" + _k121 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var _forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var _e58;
  if (target === "lua") {
    _e58 = "{";
  } else {
    _e58 = "[";
  }
  var _open1 = _e58;
  var _e59;
  if (target === "lua") {
    _e59 = "}";
  } else {
    _e59 = "]";
  }
  var _close1 = _e59;
  var _s7 = "";
  var _c8 = "";
  var __o10 = _forms3;
  var _k16 = undefined;
  for (_k16 in __o10) {
    var _v9 = __o10[_k16];
    var _e60;
    if (numeric__QUESTION__(_k16)) {
      _e60 = parseInt(_k16);
    } else {
      _e60 = _k16;
    }
    var _k17 = _e60;
    if (number__QUESTION__(_k17)) {
      _s7 = _s7 + _c8 + compile(_v9);
      _c8 = ", ";
    }
  }
  return(_open1 + _s7 + _close1);
}});
setenv("%object", {_stash: true, special: function () {
  var _forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s9 = "{";
  var _c10 = "";
  var _e61;
  if (target === "lua") {
    _e61 = " = ";
  } else {
    _e61 = ": ";
  }
  var _sep1 = _e61;
  var __o12 = pair(_forms5);
  var _k21 = undefined;
  for (_k21 in __o12) {
    var _v12 = __o12[_k21];
    var _e62;
    if (numeric__QUESTION__(_k21)) {
      _e62 = parseInt(_k21);
    } else {
      _e62 = _k21;
    }
    var _k22 = _e62;
    if (number__QUESTION__(_k22)) {
      var __id30 = _v12;
      var _k23 = __id30[0];
      var _v13 = __id30[1];
      if (! string__QUESTION__(_k23)) {
        throw new Error("Illegal key: " + str(_k23));
      }
      _s9 = _s9 + _c10 + key(_k23) + _sep1 + compile(_v13);
      _c10 = ", ";
    }
  }
  return(_s9 + "}");
}});
setenv("%literal", {_stash: true, special: function () {
  var _args111 = unstash(Array.prototype.slice.call(arguments, 0));
  return(apply(cat, map(compile, _args111)));
}});
exports.run = run;
exports.eval = eval;
exports.expand = expand;
exports.compile = compile;
