var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var i = edge(environment);
    while (i >= 0) {
      var b = environment[i][k];
      if (is63(b)) {
        var _e9;
        if (p) {
          _e9 = b[p];
        } else {
          _e9 = b;
        }
        return(_e9);
      } else {
        i = i - 1;
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
  var b = first(function (frame) {
    return(frame[k]);
  }, reverse(environment));
  return(! atom63(b) && is63(b.variable));
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
    var i = _names[x];
    _names[x] = _names[x] + 1;
    return(unique(x + i));
  } else {
    _names[x] = 1;
    return("_" + x);
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _o = args;
    var k = undefined;
    for (k in _o) {
      var v = _o[k];
      var _e10;
      if (numeric63(k)) {
        _e10 = parseInt(k);
      } else {
        _e10 = k;
      }
      var _k = _e10;
      if (! number63(_k)) {
        add(l, literal(_k));
        add(l, v);
      }
    }
    return(join(args, [l]));
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
    var id = unique("id");
    var bs = [id, rh];
    var _o1 = lh;
    var k = undefined;
    for (k in _o1) {
      var v = _o1[k];
      var _e11;
      if (numeric63(k)) {
        _e11 = parseInt(k);
      } else {
        _e11 = k;
      }
      var _k1 = _e11;
      var _e12;
      if (_k1 === "rest") {
        _e12 = ["cut", id, _35(lh)];
      } else {
        _e12 = ["get", id, ["quote", bias(_k1)]];
      }
      var x = _e12;
      if (is63(_k1)) {
        var _e13;
        if (v === true) {
          _e13 = _k1;
        } else {
          _e13 = v;
        }
        var _k2 = _e13;
        bs = join(bs, bind(_k2, x));
      }
    }
    return(bs);
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return([["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]);
}});
bind42 = function (args, body) {
  var args1 = [];
  var rest = function () {
    if (target === "js") {
      return(["unstash", ["arguments%", _35(args1)]]);
    } else {
      add(args1, "|...|");
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([args1, join(["let", [args, rest()]], body)]);
  } else {
    var bs = [];
    var r = unique("r");
    var _o2 = args;
    var k = undefined;
    for (k in _o2) {
      var v = _o2[k];
      var _e14;
      if (numeric63(k)) {
        _e14 = parseInt(k);
      } else {
        _e14 = k;
      }
      var _k3 = _e14;
      if (number63(_k3)) {
        if (atom63(v)) {
          add(args1, v);
        } else {
          var x = unique("x");
          add(args1, x);
          bs = join(bs, [v, x]);
        }
      }
    }
    if (keys63(args)) {
      bs = join(bs, [r, rest()]);
      var _e15;
      if (target === "lua") {
        _e15 = edge(args1);
      } else {
        _e15 = _35(args1);
      }
      var n = _e15;
      var i = 0;
      while (i < n) {
        var v = args1[i];
        bs = join(bs, [v, ["destash!", v, r]]);
        i = i + 1;
      }
      bs = join(bs, [keys(args), r]);
    }
    return([args1, join(["let", bs], body)]);
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
var expand_local = function (_x36) {
  var _id = _x36;
  var x = _id[0];
  var name = _id[1];
  var value = _id[2];
  return(["%local", name, macroexpand(value)]);
};
var expand_function = function (_x38) {
  var _id1 = _x38;
  var x = _id1[0];
  var args = _id1[1];
  var body = cut(_id1, 2);
  add(environment, {});
  var _o3 = args;
  var _i3 = undefined;
  for (_i3 in _o3) {
    var _x39 = _o3[_i3];
    var _e16;
    if (numeric63(_i3)) {
      _e16 = parseInt(_i3);
    } else {
      _e16 = _i3;
    }
    var __i3 = _e16;
    setenv(_x39, {_stash: true, variable: true});
  }
  var _x40 = join(["%function", args], macroexpand(body));
  drop(environment);
  return(_x40);
};
var expand_definition = function (_x42) {
  var _id2 = _x42;
  var x = _id2[0];
  var name = _id2[1];
  var args = _id2[2];
  var body = cut(_id2, 3);
  add(environment, {});
  var _o4 = args;
  var _i4 = undefined;
  for (_i4 in _o4) {
    var _x43 = _o4[_i4];
    var _e17;
    if (numeric63(_i4)) {
      _e17 = parseInt(_i4);
    } else {
      _e17 = _i4;
    }
    var __i4 = _e17;
    setenv(_x43, {_stash: true, variable: true});
  }
  var _x44 = join([x, name, args], macroexpand(body));
  drop(environment);
  return(_x44);
};
var expand_macro = function (form) {
  return(macroexpand(expand1(form)));
};
expand1 = function (_x46) {
  var _id3 = _x46;
  var name = _id3[0];
  var body = cut(_id3, 1);
  return(apply(macro_function(name), body));
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if (x === "%local") {
        return(expand_local(form));
      } else {
        if (x === "%function") {
          return(expand_function(form));
        } else {
          if (x === "%global-function") {
            return(expand_definition(form));
          } else {
            if (x === "%local-function") {
              return(expand_definition(form));
            } else {
              if (macro63(x)) {
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
  var xs = [["list"]];
  var _o5 = form;
  var k = undefined;
  for (k in _o5) {
    var v = _o5[k];
    var _e18;
    if (numeric63(k)) {
      _e18 = parseInt(k);
    } else {
      _e18 = k;
    }
    var _k4 = _e18;
    if (! number63(_k4)) {
      var _e19;
      if (quasisplice63(v, depth)) {
        _e19 = quasiexpand(v[1]);
      } else {
        _e19 = quasiexpand(v, depth);
      }
      var _v = _e19;
      last(xs)[_k4] = _v;
    }
  }
  var _x49 = form;
  var _i6 = 0;
  while (_i6 < _35(_x49)) {
    var x = _x49[_i6];
    if (quasisplice63(x, depth)) {
      var _x50 = quasiexpand(x[1]);
      add(xs, _x50);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _i6 = _i6 + 1;
  }
  var pruned = keep(function (x) {
    return(_35(x) > 1 || !( hd(x) === "list") || keys63(x));
  }, xs);
  if (one63(pruned)) {
    return(hd(pruned));
  } else {
    return(join(["join"], pruned));
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
  var _id4 = _x54;
  var a = _id4[0];
  var b = _id4[1];
  var c = cut(_id4, 2);
  if (is63(b)) {
    return([join(["%if", a, b], expand_if(c))]);
  } else {
    if (is63(a)) {
      return([a]);
    }
  }
};
indent_level = 0;
indentation = function () {
  var s = "";
  var i = 0;
  while (i < indent_level) {
    s = s + "  ";
    i = i + 1;
  }
  return(s);
};
var reserved = {"in": true, "new": true, "then": true, "catch": true, "if": true, "true": true, "instanceof": true, "do": true, "default": true, "<": true, "finally": true, ">": true, "*": true, "repeat": true, "or": true, "return": true, "for": true, "var": true, "else": true, "==": true, "import": true, "delete": true, "switch": true, "void": true, "function": true, "debugger": true, "throw": true, "nil": true, "end": true, "class": true, "continue": true, "<=": true, ">=": true, "%": true, "with": true, "=": true, "-": true, "break": true, "/": true, "false": true, "elseif": true, "+": true, "until": true, "local": true, "typeof": true, "try": true, "and": true, "case": true, "not": true, "while": true, "const": true};
reserved63 = function (x) {
  return(reserved.hasOwnProperty(x));
};
var valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id)) {
    return(false);
  } else {
    var i = 0;
    while (i < _35(id)) {
      if (! valid_code63(code(id, i))) {
        return(false);
      }
      i = i + 1;
    }
    return(true);
  }
};
key = function (k) {
  var i = inner(k);
  if (valid_id63(i)) {
    return(i);
  } else {
    if (target === "js") {
      return(k);
    } else {
      return("[" + k + "]");
    }
  }
};
mapo = function (f, t) {
  var o = [];
  var _o6 = t;
  var k = undefined;
  for (k in _o6) {
    var v = _o6[k];
    var _e20;
    if (numeric63(k)) {
      _e20 = parseInt(k);
    } else {
      _e20 = k;
    }
    var _k5 = _e20;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_k5));
      add(o, x);
    }
  }
  return(o);
};
var __x59 = [];
var _x60 = [];
_x60.lua = "not";
_x60.js = "!";
__x59["not"] = _x60;
var __x61 = [];
__x61["/"] = true;
__x61["%"] = true;
__x61["*"] = true;
var __x62 = [];
__x62["+"] = true;
__x62["-"] = true;
var __x63 = [];
var _x64 = [];
_x64.lua = "..";
_x64.js = "+";
__x63.cat = _x64;
var __x65 = [];
__x65[">="] = true;
__x65["<"] = true;
__x65["<="] = true;
__x65[">"] = true;
var __x66 = [];
var _x67 = [];
_x67.lua = "==";
_x67.js = "===";
__x66["="] = _x67;
var __x68 = [];
var _x69 = [];
_x69.lua = "and";
_x69.js = "&&";
__x68["and"] = _x69;
var __x70 = [];
var _x71 = [];
_x71.lua = "or";
_x71.js = "||";
__x70["or"] = _x71;
var infix = [__x59, __x61, __x62, __x63, __x65, __x66, __x68, __x70];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var _o7 = infix;
    var k = undefined;
    for (k in _o7) {
      var v = _o7[k];
      var _e21;
      if (numeric63(k)) {
        _e21 = parseInt(k);
      } else {
        _e21 = k;
      }
      var _k6 = _e21;
      if (v[hd(form)]) {
        return(index(_k6));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var x = level[op];
    if (x === true) {
      return(op);
    } else {
      if (is63(x)) {
        return(x[target]);
      }
    }
  }, infix));
};
var infix63 = function (x) {
  return(is63(getop(x)));
};
var compile_args = function (args) {
  var s = "(";
  var c = "";
  var _x73 = args;
  var _i9 = 0;
  while (_i9 < _35(_x73)) {
    var x = _x73[_i9];
    s = s + c + compile(x);
    c = ", ";
    _i9 = _i9 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _e22;
    if (c === "\n") {
      _e22 = "\\n";
    } else {
      _e22 = c;
    }
    s1 = s1 + _e22;
    i = i + 1;
  }
  return(s1);
};
var id = function (id) {
  var _e23;
  if (number_code63(code(id, 0))) {
    _e23 = "_";
  } else {
    _e23 = "";
  }
  var id1 = _e23;
  var i = 0;
  while (i < _35(id)) {
    var c = char(id, i);
    var n = code(c);
    var _e24;
    if (c === "-" && !( id === "-")) {
      _e24 = "_";
    } else {
      var _e25;
      if (valid_code63(n)) {
        _e25 = c;
      } else {
        var _e26;
        if (i === 0) {
          _e26 = "_" + n;
        } else {
          _e26 = n;
        }
        _e25 = _e26;
      }
      _e24 = _e25;
    }
    var c1 = _e24;
    id1 = id1 + c1;
    i = i + 1;
  }
  if (reserved63(id1)) {
    return("_" + id1);
  } else {
    return(id1);
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
  var _id5 = form;
  var x = _id5[0];
  var args = cut(_id5, 1);
  var _id6 = getenv(x);
  var self_tr63 = _id6.tr;
  var stmt = _id6.stmt;
  var special = _id6.special;
  var tr = terminator(stmt63 && ! self_tr63);
  return(apply(special, args) + tr);
};
var parenthesize_call63 = function (x) {
  return(! atom63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var f = hd(form);
  var f1 = compile(f);
  var args = compile_args(stash42(tl(form)));
  if (parenthesize_call63(f)) {
    return("(" + f1 + ")" + args);
  } else {
    return(f1 + args);
  }
};
var op_delims = function (parent, child) {
  var _r56 = unstash(Array.prototype.slice.call(arguments, 2));
  var _parent = destash33(parent, _r56);
  var _child = destash33(child, _r56);
  var _id7 = _r56;
  var right = _id7.right;
  var _e27;
  if (right) {
    _e27 = _6261;
  } else {
    _e27 = _62;
  }
  if (_e27(precedence(_child), precedence(_parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var _id8 = form;
  var op = _id8[0];
  var _id9 = cut(_id8, 1);
  var a = _id9[0];
  var b = _id9[1];
  var _id10 = op_delims(form, a);
  var ao = _id10[0];
  var ac = _id10[1];
  var _id11 = op_delims(form, b, {_stash: true, right: true});
  var bo = _id11[0];
  var bc = _id11[1];
  var _a = compile(a);
  var _b = compile(b);
  var _op = getop(op);
  if (unary63(form)) {
    return(_op + ao + " " + _a + ac);
  } else {
    return(ao + _a + ac + " " + _op + " " + bo + _b + bc);
  }
};
compile_function = function (args, body) {
  var _r58 = unstash(Array.prototype.slice.call(arguments, 2));
  var _args = destash33(args, _r58);
  var _body = destash33(body, _r58);
  var _id12 = _r58;
  var name = _id12.name;
  var prefix = _id12.prefix;
  var _e28;
  if (name) {
    _e28 = compile(name);
  } else {
    _e28 = "";
  }
  var _id13 = _e28;
  var _args1 = compile_args(_args);
  indent_level = indent_level + 1;
  var _x76 = compile(_body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body1 = _x76;
  var ind = indentation();
  var _e29;
  if (prefix) {
    _e29 = prefix + " ";
  } else {
    _e29 = "";
  }
  var p = _e29;
  var _e30;
  if (target === "js") {
    _e30 = "";
  } else {
    _e30 = "end";
  }
  var tr = _e30;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + _id13 + _args1 + " {\n" + _body1 + ind + "}" + tr);
  } else {
    return(p + "function " + _id13 + _args1 + "\n" + _body1 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form))));
};
compile = function (form) {
  var _r60 = unstash(Array.prototype.slice.call(arguments, 1));
  var _form = destash33(form, _r60);
  var _id14 = _r60;
  var stmt = _id14.stmt;
  if (nil63(_form)) {
    return("");
  } else {
    if (special_form63(_form)) {
      return(compile_special(_form, stmt));
    } else {
      var tr = terminator(stmt);
      var _e31;
      if (stmt) {
        _e31 = indentation();
      } else {
        _e31 = "";
      }
      var ind = _e31;
      var _e32;
      if (atom63(_form)) {
        _e32 = compile_atom(_form);
      } else {
        var _e33;
        if (infix63(hd(_form))) {
          _e33 = compile_infix(_form);
        } else {
          _e33 = compile_call(_form);
        }
        _e32 = _e33;
      }
      var _form1 = _e32;
      return(ind + _form1 + tr);
    }
  }
};
var lower_statement = function (form, tail63) {
  var hoist = [];
  var e = lower(form, hoist, true, tail63);
  if (some63(hoist) && is63(e)) {
    return(join(["do"], hoist, [e]));
  } else {
    if (is63(e)) {
      return(e);
    } else {
      if (_35(hoist) > 1) {
        return(join(["do"], hoist));
      } else {
        return(hd(hoist));
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
  var _x81 = almost(args);
  var _i10 = 0;
  while (_i10 < _35(_x81)) {
    var x = _x81[_i10];
    var _y = lower(x, hoist, stmt63);
    if (yes(_y)) {
      var e = _y;
      if (standalone63(e)) {
        add(hoist, e);
      }
    }
    _i10 = _i10 + 1;
  }
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var _id15 = args;
  var lh = _id15[0];
  var rh = _id15[1];
  add(hoist, ["%set", lh, lower(rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return(lh);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var _id16 = args;
  var cond = _id16[0];
  var _then = _id16[1];
  var _else = _id16[2];
  if (stmt63) {
    var _e35;
    if (is63(_else)) {
      _e35 = [lower_body([_else], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_then], tail63)], _e35)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _e34;
    if (is63(_else)) {
      _e34 = [lower(["%set", e, _else])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["%set", e, _then])], _e34));
    return(e);
  }
};
var lower_short = function (x, args, hoist) {
  var _id17 = args;
  var a = _id17[0];
  var b = _id17[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var _id18 = unique("id");
    var _e36;
    if (x === "and") {
      _e36 = ["%if", _id18, b, _id18];
    } else {
      _e36 = ["%if", _id18, _id18, b];
    }
    return(lower(["do", ["%local", _id18, a], _e36], hoist));
  } else {
    return([x, lower(a, hoist), b1]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var _id19 = args;
  var c = _id19[0];
  var body = cut(_id19, 1);
  var pre = [];
  var _c = lower(c, pre);
  var _e37;
  if (none63(pre)) {
    _e37 = ["while", _c, lower_body(body)];
  } else {
    _e37 = ["while", true, join(["do"], pre, [["%if", ["not", _c], ["break"]], lower_body(body)])];
  }
  return(add(hoist, _e37));
};
var lower_for = function (args, hoist) {
  var _id20 = args;
  var t = _id20[0];
  var k = _id20[1];
  var body = cut(_id20, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
};
var lower_function = function (args) {
  var _id21 = args;
  var a = _id21[0];
  var body = cut(_id21, 1);
  return(["%function", a, lower_body(body, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var _id22 = args;
  var name = _id22[0];
  var _args2 = _id22[1];
  var body = cut(_id22, 2);
  return(add(hoist, [kind, name, _args2, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _form2 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_form2)) {
    return(_form2);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var _id23 = form;
  var x = _id23[0];
  var args = cut(_id23, 1);
  return(lower(reduce(function (a, b) {
    return([x, b, a]);
  }, reverse(args)), hoist));
};
var lower_special = function (form, hoist) {
  var e = lower_call(form, hoist);
  if (e) {
    return(add(hoist, e));
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
          var _id24 = form;
          var x = _id24[0];
          var args = cut(_id24, 1);
          if (x === "do") {
            return(lower_do(args, hoist, stmt63, tail63));
          } else {
            if (x === "%set") {
              return(lower_set(args, hoist, stmt63, tail63));
            } else {
              if (x === "%if") {
                return(lower_if(args, hoist, stmt63, tail63));
              } else {
                if (x === "%try") {
                  return(lower_try(args, hoist, tail63));
                } else {
                  if (x === "while") {
                    return(lower_while(args, hoist));
                  } else {
                    if (x === "%for") {
                      return(lower_for(args, hoist));
                    } else {
                      if (x === "%function") {
                        return(lower_function(args));
                      } else {
                        if (x === "%local-function" || x === "%global-function") {
                          return(lower_definition(x, args, hoist));
                        } else {
                          if (in63(x, ["and", "or"])) {
                            return(lower_short(x, args, hoist));
                          } else {
                            if (statement63(x)) {
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
  var previous = target;
  target = "js";
  var code = compile(expand(["set", "%result", form]));
  target = previous;
  run(code);
  return(_37result);
};
setenv("do", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  var _x115 = forms;
  var _i12 = 0;
  while (_i12 < _35(_x115)) {
    var x = _x115[_i12];
    s = s + compile(x, {_stash: true, stmt: true});
    if (! atom63(x)) {
      if (hd(x) === "return" || hd(x) === "break") {
        break;
      }
    }
    _i12 = _i12 + 1;
  }
  return(s);
}, tr: true, stmt: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond1 = compile(cond);
  indent_level = indent_level + 1;
  var _x118 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons1 = _x118;
  var _e38;
  if (alt) {
    indent_level = indent_level + 1;
    var _x119 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e38 = _x119;
  }
  var _alt1 = _e38;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _cond1 + ") {\n" + _cons1 + ind + "}";
  } else {
    s = s + ind + "if " + _cond1 + " then\n" + _cons1;
  }
  if (_alt1 && target === "js") {
    s = s + " else {\n" + _alt1 + ind + "}";
  } else {
    if (_alt1) {
      s = s + ind + "else\n" + _alt1;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, tr: true, stmt: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _cond3 = compile(cond);
  indent_level = indent_level + 1;
  var _x121 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x121;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _cond3 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _cond3 + " do\n" + body + ind + "end\n");
  }
}, tr: true, stmt: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t1 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _x123 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x123;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _t1 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _t1 + ") {\n" + body + ind + "}\n");
  }
}, tr: true, stmt: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _x128 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x128;
  var hf = ["return", ["%array", false, e]];
  indent_level = indent_level + 1;
  var _x131 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _x131;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
}, tr: true, stmt: true});
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
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, tr: true, stmt: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + x);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, tr: true, stmt: true});
setenv("return", {_stash: true, special: function (x) {
  var _e39;
  if (nil63(x)) {
    _e39 = "return";
  } else {
    _e39 = "return(" + compile(x) + ")";
  }
  var _x141 = _e39;
  return(indentation() + _x141);
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return("new " + compile(x));
}});
setenv("typeof", {_stash: true, special: function (x) {
  return("typeof(" + compile(x) + ")");
}});
setenv("error", {_stash: true, special: function (x) {
  var _e40;
  if (target === "js") {
    _e40 = "throw " + compile(["new", ["Error", x]]);
  } else {
    _e40 = "error(" + compile(x) + ")";
  }
  var e = _e40;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var _id26 = compile(name);
  var value1 = compile(value);
  var _e41;
  if (is63(value)) {
    _e41 = " = " + value1;
  } else {
    _e41 = "";
  }
  var rh = _e41;
  var _e42;
  if (target === "js") {
    _e42 = "var ";
  } else {
    _e42 = "local ";
  }
  var keyword = _e42;
  var ind = indentation();
  return(ind + keyword + _id26 + rh);
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var _lh1 = compile(lh);
  var _e43;
  if (nil63(rh)) {
    _e43 = "nil";
  } else {
    _e43 = rh;
  }
  var _rh1 = compile(_e43);
  return(indentation() + _lh1 + " = " + _rh1);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _t3 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_t3, 0) === "{") {
    _t3 = "(" + _t3 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_t3 + "." + inner(k));
  } else {
    return(_t3 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _e44;
  if (target === "lua") {
    _e44 = "{";
  } else {
    _e44 = "[";
  }
  var open = _e44;
  var _e45;
  if (target === "lua") {
    _e45 = "}";
  } else {
    _e45 = "]";
  }
  var close = _e45;
  var s = "";
  var c = "";
  var _o9 = forms;
  var k = undefined;
  for (k in _o9) {
    var v = _o9[k];
    var _e46;
    if (numeric63(k)) {
      _e46 = parseInt(k);
    } else {
      _e46 = k;
    }
    var _k7 = _e46;
    if (number63(_k7)) {
      s = s + c + compile(v);
      c = ", ";
    }
  }
  return(open + s + close);
}});
setenv("%object", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "{";
  var c = "";
  var _e47;
  if (target === "lua") {
    _e47 = " = ";
  } else {
    _e47 = ": ";
  }
  var sep = _e47;
  var _o11 = pair(forms);
  var k = undefined;
  for (k in _o11) {
    var v = _o11[k];
    var _e48;
    if (numeric63(k)) {
      _e48 = parseInt(k);
    } else {
      _e48 = k;
    }
    var _k9 = _e48;
    if (number63(_k9)) {
      var _id28 = v;
      var _k10 = _id28[0];
      var _v2 = _id28[1];
      if (! string63(_k10)) {
        throw new Error("Illegal key: " + str(_k10));
      }
      s = s + c + key(_k10) + sep + compile(_v2);
      c = ", ";
    }
  }
  return(s + "}");
}});
exports.run = run;
exports.eval = eval;
exports.expand = expand;
exports.compile = compile;
