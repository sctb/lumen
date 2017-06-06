var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var _i = edge(environment);
    while (_i >= 0) {
      var _b = environment[_i][k];
      if (is63(_b)) {
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
    var _n = code(x, 0);
    if (number_code63(_n) || ! valid_code63(_n)) {
      return(unique(compile(x)));
    } else {
      _names[x] = 1;
      var _e22;
      if (_n === 95) {
        _e22 = "_";
      } else {
        _e22 = "";
      }
      return("_" + x + _e22);
    }
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var _l = ["%object", "\"_stash\"", true];
    var __o_ = args;
    var _k = undefined;
    for (_k in __o_) {
      var _v = __o_[_k];
      var _e23;
      if (numeric63(_k)) {
        _e23 = parseInt(_k);
      } else {
        _e23 = _k;
      }
      var _k1 = _e23;
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
    var __o1_ = lh;
    var _k2 = undefined;
    for (_k2 in __o1_) {
      var _v1 = __o1_[_k2];
      var _e24;
      if (numeric63(_k2)) {
        _e24 = parseInt(_k2);
      } else {
        _e24 = _k2;
      }
      var _k3 = _e24;
      var _e25;
      if (_k3 === "rest") {
        _e25 = ["cut", _id, _35(lh)];
      } else {
        _e25 = ["get", _id, ["quote", bias(_k3)]];
      }
      var _x5 = _e25;
      if (is63(_k3)) {
        var _e26;
        if (_v1 === true) {
          _e26 = _k3;
        } else {
          _e26 = _v1;
        }
        var _k4 = _e26;
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
    var _r21 = unique("r");
    var __o2_ = args;
    var _k5 = undefined;
    for (_k5 in __o2_) {
      var _v2 = __o2_[_k5];
      var _e27;
      if (numeric63(_k5)) {
        _e27 = parseInt(_k5);
      } else {
        _e27 = _k5;
      }
      var _k6 = _e27;
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
      var _n4 = _35(_args1);
      var _i5 = 0;
      while (_i5 < _n4) {
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
var expand_local = function (_x38) {
  var __id1_ = _x38;
  var _x39 = __id1_[0];
  var _name = __id1_[1];
  var _value = __id1_[2];
  setenv(_name, {_stash: true, variable: true});
  return(["%local", _name, macroexpand(_value)]);
};
var expand_function = function (_x41) {
  var __id2_ = _x41;
  var _x42 = __id2_[0];
  var _args = __id2_[1];
  var _body = cut(__id2_, 2);
  add(environment, {});
  var __o3_ = _args;
  var __i6_ = undefined;
  for (__i6_ in __o3_) {
    var __x43_ = __o3_[__i6_];
    var _e28;
    if (numeric63(__i6_)) {
      _e28 = parseInt(__i6_);
    } else {
      _e28 = __i6_;
    }
    var __i61_ = _e28;
    setenv(__x43_, {_stash: true, variable: true});
  }
  var __x44_ = join(["%function", _args], macroexpand(_body));
  drop(environment);
  return(__x44_);
};
var expand_definition = function (_x46) {
  var __id3_ = _x46;
  var _x47 = __id3_[0];
  var _name1 = __id3_[1];
  var _args11 = __id3_[2];
  var _body1 = cut(__id3_, 3);
  add(environment, {});
  var __o4_ = _args11;
  var __i7_ = undefined;
  for (__i7_ in __o4_) {
    var __x48_ = __o4_[__i7_];
    var _e29;
    if (numeric63(__i7_)) {
      _e29 = parseInt(__i7_);
    } else {
      _e29 = __i7_;
    }
    var __i71_ = _e29;
    setenv(__x48_, {_stash: true, variable: true});
  }
  var __x49_ = join([_x47, _name1, _args11], macroexpand(_body1));
  drop(environment);
  return(__x49_);
};
var expand_macro = function (form) {
  return(macroexpand(expand1(form)));
};
expand1 = function (_x51) {
  var __id4_ = _x51;
  var _name2 = __id4_[0];
  var _body2 = cut(__id4_, 1);
  return(apply(macro_function(_name2), _body2));
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
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
              if (macro63(_x52)) {
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
  var __o5_ = form;
  var _k7 = undefined;
  for (_k7 in __o5_) {
    var _v4 = __o5_[_k7];
    var _e30;
    if (numeric63(_k7)) {
      _e30 = parseInt(_k7);
    } else {
      _e30 = _k7;
    }
    var _k8 = _e30;
    if (! number63(_k8)) {
      var _e31;
      if (quasisplice63(_v4, depth)) {
        _e31 = quasiexpand(_v4[1]);
      } else {
        _e31 = quasiexpand(_v4, depth);
      }
      var _v5 = _e31;
      last(_xs)[_k8] = _v5;
    }
  }
  var __x55_ = form;
  var __i9_ = 0;
  while (__i9_ < _35(__x55_)) {
    var _x56 = __x55_[__i9_];
    if (quasisplice63(_x56, depth)) {
      var _x57 = quasiexpand(_x56[1]);
      add(_xs, _x57);
      add(_xs, ["list"]);
    } else {
      add(last(_xs), quasiexpand(_x56, depth));
    }
    __i9_ = __i9_ + 1;
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
expand_if = function (_x61) {
  var __id5_ = _x61;
  var _a = __id5_[0];
  var _b2 = __id5_[1];
  var _c = cut(__id5_, 2);
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
valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id) || number_code63(code(id, 0))) {
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
  var __o7_ = t;
  var _k9 = undefined;
  for (_k9 in __o7_) {
    var _v6 = __o7_[_k9];
    var _e32;
    if (numeric63(_k9)) {
      _e32 = parseInt(_k9);
    } else {
      _e32 = _k9;
    }
    var _k10 = _e32;
    var _x65 = f(_v6);
    if (is63(_x65)) {
      add(_o6, literal(_k10));
      add(_o6, _x65);
    }
  }
  return(_o6);
};
var __x67_ = [];
var __x68_ = [];
__x68_.js = "!";
__x68_.lua = "not";
__x67_["not"] = __x68_;
var __x69_ = [];
__x69_["*"] = true;
__x69_["/"] = true;
__x69_["%"] = true;
var __x70_ = [];
var __x71_ = [];
__x71_.js = "+";
__x71_.lua = "..";
__x70_.cat = __x71_;
var __x72_ = [];
__x72_["+"] = true;
__x72_["-"] = true;
var __x73_ = [];
__x73_["<"] = true;
__x73_[">"] = true;
__x73_["<="] = true;
__x73_[">="] = true;
var __x74_ = [];
var __x75_ = [];
__x75_.js = "===";
__x75_.lua = "==";
__x74_["="] = __x75_;
var __x76_ = [];
var __x77_ = [];
__x77_.js = "&&";
__x77_.lua = "and";
__x76_["and"] = __x77_;
var __x78_ = [];
var __x79_ = [];
__x79_.js = "||";
__x79_.lua = "or";
__x78_["or"] = __x79_;
var infix = [__x67_, __x69_, __x70_, __x72_, __x73_, __x74_, __x76_, __x78_];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var __o8_ = infix;
    var _k11 = undefined;
    for (_k11 in __o8_) {
      var _v7 = __o8_[_k11];
      var _e33;
      if (numeric63(_k11)) {
        _e33 = parseInt(_k11);
      } else {
        _e33 = _k11;
      }
      var _k12 = _e33;
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
      if (is63(_x81)) {
        return(_x81[target]);
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
  var __x82_ = args;
  var __i15_ = 0;
  while (__i15_ < _35(__x82_)) {
    var _x83 = __x82_[__i15_];
    _s1 = _s1 + _c1 + compile(_x83);
    _c1 = ", ";
    __i15_ = __i15_ + 1;
  }
  return(_s1 + ")");
};
var escape_newlines = function (s) {
  var _s11 = "";
  var _i16 = 0;
  while (_i16 < _35(s)) {
    var _c2 = char(s, _i16);
    var _e34;
    if (_c2 === "\n") {
      _e34 = "\\n";
    } else {
      _e34 = _c2;
    }
    _s11 = _s11 + _e34;
    _i16 = _i16 + 1;
  }
  return(_s11);
};
var id = function (id) {
  var _end = edge(id);
  var _e35;
  if (number_code63(code(id, 0))) {
    _e35 = "_0";
  } else {
    _e35 = "";
  }
  var _id11 = _e35;
  var _i17 = 0;
  while (_i17 < _35(id)) {
    var _n10 = code(id, _i17);
    var _e36;
    if (_n10 === 45) {
      var _e38;
      if (_i17 === 0 || _i17 === _end) {
        _e38 = _n10;
      } else {
        _e38 = "_";
      }
      _e36 = _e38;
    } else {
      var _e37;
      if (valid_code63(_n10)) {
        _e37 = char(id, _i17);
      } else {
        _e37 = _n10;
      }
      _e36 = _e37;
    }
    var _c11 = _e36;
    _id11 = _id11 + _c11;
    _i17 = _i17 + 1;
  }
  if (number_code63(code(_id11, 0))) {
    return("_" + _id11);
  } else {
    if (reserved63(_id11)) {
      return("_" + _id11 + "_");
    } else {
      return(_id11);
    }
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
                  if (x === _45inf) {
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
  var __id6_ = form;
  var _x84 = __id6_[0];
  var _args2 = cut(__id6_, 1);
  var __id7_ = getenv(_x84);
  var _special = __id7_.special;
  var _stmt = __id7_.stmt;
  var _self_tr63 = __id7_.tr;
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
  var __r58_ = unstash(Array.prototype.slice.call(arguments, 2));
  var _parent = destash33(parent, __r58_);
  var _child = destash33(child, __r58_);
  var __id8_ = __r58_;
  var _right = __id8_.right;
  var _e39;
  if (_right) {
    _e39 = _6261;
  } else {
    _e39 = _62;
  }
  if (_e39(precedence(_child), precedence(_parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var __id9_ = form;
  var _op = __id9_[0];
  var __id10_ = cut(__id9_, 1);
  var _a1 = __id10_[0];
  var _b3 = __id10_[1];
  var __id111_ = op_delims(form, _a1);
  var _ao = __id111_[0];
  var _ac = __id111_[1];
  var __id12_ = op_delims(form, _b3, {_stash: true, right: true});
  var _bo = __id12_[0];
  var _bc = __id12_[1];
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
  var __r60_ = unstash(Array.prototype.slice.call(arguments, 2));
  var _args4 = destash33(args, __r60_);
  var _body3 = destash33(body, __r60_);
  var __id13_ = __r60_;
  var _name3 = __id13_.name;
  var _prefix = __id13_.prefix;
  var _e40;
  if (_name3) {
    _e40 = compile(_name3);
  } else {
    _e40 = "";
  }
  var _id14 = _e40;
  var _e41;
  if (target === "lua" && _args4.rest) {
    _e41 = join(_args4, ["|...|"]);
  } else {
    _e41 = _args4;
  }
  var _args12 = _e41;
  var _args5 = compile_args(_args12);
  indent_level = indent_level + 1;
  var __x88_ = compile(_body3, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body4 = __x88_;
  var _ind = indentation();
  var _e42;
  if (_prefix) {
    _e42 = _prefix + " ";
  } else {
    _e42 = "";
  }
  var _p = _e42;
  var _e43;
  if (target === "js") {
    _e43 = "";
  } else {
    _e43 = "end";
  }
  var _tr1 = _e43;
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
  var __r62_ = unstash(Array.prototype.slice.call(arguments, 1));
  var _form = destash33(form, __r62_);
  var __id15_ = __r62_;
  var _stmt1 = __id15_.stmt;
  if (nil63(_form)) {
    return("");
  } else {
    if (special_form63(_form)) {
      return(compile_special(_form, _stmt1));
    } else {
      var _tr2 = terminator(_stmt1);
      var _e44;
      if (_stmt1) {
        _e44 = indentation();
      } else {
        _e44 = "";
      }
      var _ind1 = _e44;
      var _e45;
      if (atom63(_form)) {
        _e45 = compile_atom(_form);
      } else {
        var _e46;
        if (infix63(hd(_form))) {
          _e46 = compile_infix(_form);
        } else {
          _e46 = compile_call(_form);
        }
        _e45 = _e46;
      }
      var _form1 = _e45;
      return(_ind1 + _form1 + _tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var _hoist = [];
  var _e = lower(form, _hoist, true, tail63);
  var _e47;
  if (some63(_hoist) && is63(_e)) {
    _e47 = join(["do"], _hoist, [_e]);
  } else {
    var _e48;
    if (is63(_e)) {
      _e48 = _e;
    } else {
      var _e49;
      if (_35(_hoist) > 1) {
        _e49 = join(["do"], _hoist);
      } else {
        _e49 = hd(_hoist);
      }
      _e48 = _e49;
    }
    _e47 = _e48;
  }
  return(either(_e47, ["do"]));
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
  var __x94_ = almost(args);
  var __i18_ = 0;
  while (__i18_ < _35(__x94_)) {
    var _x95 = __x94_[__i18_];
    var __y_ = lower(_x95, hoist, stmt63);
    if (yes(__y_)) {
      var _e1 = __y_;
      if (standalone63(_e1)) {
        add(hoist, _e1);
      }
    }
    __i18_ = __i18_ + 1;
  }
  var _e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(_e2)) {
    return(["return", _e2]);
  } else {
    return(_e2);
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var __id16_ = args;
  var _lh = __id16_[0];
  var _rh = __id16_[1];
  add(hoist, ["%set", lower(_lh, hoist), lower(_rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return(_lh);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var __id17_ = args;
  var _cond = __id17_[0];
  var _then = __id17_[1];
  var _else = __id17_[2];
  if (stmt63) {
    var _e51;
    if (is63(_else)) {
      _e51 = [lower_body([_else], tail63)];
    }
    return(add(hoist, join(["%if", lower(_cond, hoist), lower_body([_then], tail63)], _e51)));
  } else {
    var _e3 = unique("e");
    add(hoist, ["%local", _e3]);
    var _e50;
    if (is63(_else)) {
      _e50 = [lower(["%set", _e3, _else])];
    }
    add(hoist, join(["%if", lower(_cond, hoist), lower(["%set", _e3, _then])], _e50));
    return(_e3);
  }
};
var lower_short = function (x, args, hoist) {
  var __id18_ = args;
  var _a3 = __id18_[0];
  var _b5 = __id18_[1];
  var _hoist1 = [];
  var _b11 = lower(_b5, _hoist1);
  if (some63(_hoist1)) {
    var _id19 = unique("id");
    var _e52;
    if (x === "and") {
      _e52 = ["%if", _id19, _b5, _id19];
    } else {
      _e52 = ["%if", _id19, _id19, _b5];
    }
    return(lower(["do", ["%local", _id19, _a3], _e52], hoist));
  } else {
    return([x, lower(_a3, hoist), _b11]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var __id20_ = args;
  var _c3 = __id20_[0];
  var _body5 = cut(__id20_, 1);
  var _pre = [];
  var _c4 = lower(_c3, _pre);
  var _e53;
  if (none63(_pre)) {
    _e53 = ["while", _c4, lower_body(_body5)];
  } else {
    _e53 = ["while", true, join(["do"], _pre, [["%if", ["not", _c4], ["break"]], lower_body(_body5)])];
  }
  return(add(hoist, _e53));
};
var lower_for = function (args, hoist) {
  var __id21_ = args;
  var _t = __id21_[0];
  var _k13 = __id21_[1];
  var _body6 = cut(__id21_, 2);
  return(add(hoist, ["%for", lower(_t, hoist), _k13, lower_body(_body6)]));
};
var lower_function = function (args) {
  var __id22_ = args;
  var _a4 = __id22_[0];
  var _body7 = cut(__id22_, 1);
  return(["%function", _a4, lower_body(_body7, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var __id23_ = args;
  var _name4 = __id23_[0];
  var _args6 = __id23_[1];
  var _body8 = cut(__id23_, 2);
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
    var __id24_ = form;
    var _x124 = __id24_[0];
    var _args7 = cut(__id24_, 1);
    reduce(function (a, b) {
      add(_e4, [_x124, a, b]);
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
  var __id25_ = _form3;
  var _x127 = __id25_[0];
  var _args8 = cut(__id25_, 1);
  return(lower(reduce(function (a, b) {
    return([_x127, b, a]);
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
          var __id26_ = form;
          var _x130 = __id26_[0];
          var _args9 = cut(__id26_, 1);
          if (_x130 === "do") {
            return(lower_do(_args9, hoist, stmt63, tail63));
          } else {
            if (_x130 === "%set") {
              return(lower_set(_args9, hoist, stmt63, tail63));
            } else {
              if (_x130 === "%if") {
                return(lower_if(_args9, hoist, stmt63, tail63));
              } else {
                if (_x130 === "%try") {
                  return(lower_try(_args9, hoist, tail63));
                } else {
                  if (_x130 === "while") {
                    return(lower_while(_args9, hoist));
                  } else {
                    if (_x130 === "%for") {
                      return(lower_for(_args9, hoist));
                    } else {
                      if (_x130 === "%function") {
                        return(lower_function(_args9));
                      } else {
                        if (_x130 === "%local-function" || _x130 === "%global-function") {
                          return(lower_definition(_x130, _args9, hoist));
                        } else {
                          if (in63(_x130, ["and", "or"])) {
                            return(lower_short(_x130, _args9, hoist));
                          } else {
                            if (statement63(_x130)) {
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
  var __x135_ = _forms1;
  var __i20_ = 0;
  while (__i20_ < _35(__x135_)) {
    var _x136 = __x135_[__i20_];
    _s3 = _s3 + compile(_x136, {_stash: true, stmt: true});
    if (! atom63(_x136)) {
      if (hd(_x136) === "return" || hd(_x136) === "break") {
        break;
      }
    }
    __i20_ = __i20_ + 1;
  }
  return(_s3);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond2 = compile(cond);
  indent_level = indent_level + 1;
  var __x139_ = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons1 = __x139_;
  var _e54;
  if (alt) {
    indent_level = indent_level + 1;
    var __x140_ = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e54 = __x140_;
  }
  var _alt1 = _e54;
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
  var __x142_ = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body10 = __x142_;
  var _ind5 = indentation();
  if (target === "js") {
    return(_ind5 + "while (" + _cond4 + ") {\n" + _body10 + _ind5 + "}\n");
  } else {
    return(_ind5 + "while " + _cond4 + " do\n" + _body10 + _ind5 + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t2 = compile(t);
  var _ind7 = indentation();
  indent_level = indent_level + 1;
  var __x144_ = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body12 = __x144_;
  if (target === "lua") {
    return(_ind7 + "for " + k + " in next, " + _t2 + " do\n" + _body12 + _ind7 + "end\n");
  } else {
    return(_ind7 + "for (" + k + " in " + _t2 + ") {\n" + _body12 + _ind7 + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var _e8 = unique("e");
  var _ind9 = indentation();
  indent_level = indent_level + 1;
  var __x149_ = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body14 = __x149_;
  var _hf1 = ["return", ["%array", false, _e8]];
  indent_level = indent_level + 1;
  var __x152_ = compile(_hf1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _h1 = __x152_;
  return(_ind9 + "try {\n" + _body14 + _ind9 + "}\n" + _ind9 + "catch (" + _e8 + ") {\n" + _h1 + _ind9 + "}\n");
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
    var _x156 = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + _x156);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var _x162 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + _x162);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _e55;
  if (nil63(x)) {
    _e55 = "return";
  } else {
    _e55 = "return(" + compile(x) + ")";
  }
  var _x166 = _e55;
  return(indentation() + _x166);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var _e56;
  if (target === "js") {
    _e56 = "throw " + compile(["new", ["Error", x]]);
  } else {
    _e56 = "error(" + compile(x) + ")";
  }
  var _e12 = _e56;
  return(indentation() + _e12);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var _id28 = compile(name);
  var _value11 = compile(value);
  var _e57;
  if (is63(value)) {
    _e57 = " = " + _value11;
  } else {
    _e57 = "";
  }
  var _rh2 = _e57;
  var _e58;
  if (target === "js") {
    _e58 = "var ";
  } else {
    _e58 = "local ";
  }
  var _keyword1 = _e58;
  var _ind11 = indentation();
  return(_ind11 + _keyword1 + _id28 + _rh2);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var _lh2 = compile(lh);
  var _e59;
  if (nil63(rh)) {
    _e59 = "nil";
  } else {
    _e59 = rh;
  }
  var _rh4 = compile(_e59);
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
  var _e60;
  if (target === "lua") {
    _e60 = "{";
  } else {
    _e60 = "[";
  }
  var _open1 = _e60;
  var _e61;
  if (target === "lua") {
    _e61 = "}";
  } else {
    _e61 = "]";
  }
  var _close1 = _e61;
  var _s7 = "";
  var _c6 = "";
  var __o10_ = _forms3;
  var _k16 = undefined;
  for (_k16 in __o10_) {
    var _v9 = __o10_[_k16];
    var _e62;
    if (numeric63(_k16)) {
      _e62 = parseInt(_k16);
    } else {
      _e62 = _k16;
    }
    var _k17 = _e62;
    if (number63(_k17)) {
      _s7 = _s7 + _c6 + compile(_v9);
      _c6 = ", ";
    }
  }
  return(_open1 + _s7 + _close1);
}});
setenv("%object", {_stash: true, special: function () {
  var _forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var _s9 = "{";
  var _c8 = "";
  var _e63;
  if (target === "lua") {
    _e63 = " = ";
  } else {
    _e63 = ": ";
  }
  var _sep1 = _e63;
  var __o12_ = pair(_forms5);
  var _k21 = undefined;
  for (_k21 in __o12_) {
    var _v12 = __o12_[_k21];
    var _e64;
    if (numeric63(_k21)) {
      _e64 = parseInt(_k21);
    } else {
      _e64 = _k21;
    }
    var _k22 = _e64;
    if (number63(_k22)) {
      var __id30_ = _v12;
      var _k23 = __id30_[0];
      var _v13 = __id30_[1];
      if (! string63(_k23)) {
        throw new Error("Illegal key: " + str(_k23));
      }
      _s9 = _s9 + _c8 + key(_k23) + _sep1 + compile(_v13);
      _c8 = ", ";
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
