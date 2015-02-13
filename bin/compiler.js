var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var b = find(function (e) {
      return(e[k]);
    }, reverse(environment));
    if (is63(b)) {
      if (p) {
        return(b[p]);
      } else {
        return(b);
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
  return(obj63(form) && special63(hd(form)));
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
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(obj63(b) && is63(b.variable));
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
      var _e11;
      if (numeric63(k)) {
        _e11 = parseInt(k);
      } else {
        _e11 = k;
      }
      var _k = _e11;
      if (!number63(_k)) {
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
  if (number63(k) && !(target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return(k);
};
bind = function (lh, rh) {
  if (obj63(lh) && obj63(rh)) {
    var id = unique("id");
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _o1 = lh;
      var k = undefined;
      for (k in _o1) {
        var v = _o1[k];
        var _e12;
        if (numeric63(k)) {
          _e12 = parseInt(k);
        } else {
          _e12 = k;
        }
        var _k1 = _e12;
        var _e13;
        if (_k1 === "rest") {
          _e13 = ["cut", rh, _35(lh)];
        } else {
          _e13 = ["get", rh, ["quote", bias(_k1)]];
        }
        var x = _e13;
        if (is63(_k1)) {
          var _e14;
          if (v === true) {
            _e14 = _k1;
          } else {
            _e14 = v;
          }
          var _k2 = _e14;
          bs = join(bs, bind(_k2, x));
        }
      }
      return(bs);
    }
  }
};
bind42 = function (args, body) {
  var args1 = [];
  var rest = function () {
    if (target === "js") {
      return(["unstash", [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", _35(args1)]]);
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
      var _e15;
      if (numeric63(k)) {
        _e15 = parseInt(k);
      } else {
        _e15 = k;
      }
      var _k3 = _e15;
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
  return(can_unquote63(depth) && obj63(x) && hd(x) === "unquote-splicing");
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
        var _x28 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _x30 = form[0];
          var args = form[1];
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _o3 = args;
          var _i3 = undefined;
          for (_i3 in _o3) {
            var _x31 = _o3[_i3];
            var _e17;
            if (numeric63(_i3)) {
              _e17 = parseInt(_i3);
            } else {
              _e17 = _i3;
            }
            var __i3 = _e17;
            setenv(_x31, {_stash: true, variable: true});
          }
          var _x32 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_x32);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _x34 = form[0];
            var _name = form[1];
            var _args = form[2];
            var _body = cut(form, 3);
            add(environment, {_scope: true});
            var _o4 = _args;
            var _i4 = undefined;
            for (_i4 in _o4) {
              var _x35 = _o4[_i4];
              var _e16;
              if (numeric63(_i4)) {
                _e16 = parseInt(_i4);
              } else {
                _e16 = _i4;
              }
              var __i4 = _e16;
              setenv(_x35, {_stash: true, variable: true});
            }
            var _x36 = join([_x34, _name, _args], macroexpand(_body));
            drop(environment);
            return(_x36);
          } else {
            if (macro63(x)) {
              return(macroexpand(apply(macro_function(x), tl(form))));
            } else {
              return(map(macroexpand, form));
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
    if (!number63(_k4)) {
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
  var _x40 = form;
  var _n6 = _35(_x40);
  var _i6 = 0;
  while (_i6 < _n6) {
    var x = _x40[_i6];
    if (quasisplice63(x, depth)) {
      var _x41 = quasiexpand(x[1]);
      add(xs, _x41);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _i6 = _i6 + 1;
  }
  var pruned = keep(function (x) {
    return(_35(x) > 1 || !(hd(x) === "list") || keys63(x));
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
expand_if = function (_x45) {
  var a = _x45[0];
  var b = _x45[1];
  var c = cut(_x45, 2);
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
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return(reserved[x]);
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
      if (!valid_code63(code(id, i))) {
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
var __x50 = [];
var _x51 = [];
_x51.js = "!";
_x51.lua = "not ";
__x50["not"] = _x51;
var __x52 = [];
__x52["*"] = true;
__x52["/"] = true;
__x52["%"] = true;
var __x53 = [];
__x53["+"] = true;
__x53["-"] = true;
var __x54 = [];
var _x55 = [];
_x55.js = "+";
_x55.lua = "..";
__x54.cat = _x55;
var __x56 = [];
__x56["<"] = true;
__x56[">"] = true;
__x56["<="] = true;
__x56[">="] = true;
var __x57 = [];
var _x58 = [];
_x58.js = "===";
_x58.lua = "==";
__x57["="] = _x58;
var __x59 = [];
var _x60 = [];
_x60.js = "&&";
_x60.lua = "and";
__x59["and"] = _x60;
var __x61 = [];
var _x62 = [];
_x62.js = "||";
_x62.lua = "or";
__x61["or"] = _x62;
var infix = [__x50, __x52, __x53, __x54, __x56, __x57, __x59, __x61];
var unary63 = function (form) {
  return(two63(form) && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
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
  var _x64 = args;
  var _n9 = _35(_x64);
  var _i9 = 0;
  while (_i9 < _n9) {
    var x = _x64[_i9];
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
  var id1 = "";
  var i = 0;
  while (i < _35(id)) {
    var c = char(id, i);
    var n = code(c);
    var _e23;
    if (c === "-") {
      _e23 = "_";
    } else {
      var _e24;
      if (valid_code63(n)) {
        _e24 = c;
      } else {
        var _e25;
        if (i === 0) {
          _e25 = "_" + n;
        } else {
          _e25 = n;
        }
        _e24 = _e25;
      }
      _e23 = _e24;
    }
    var c1 = _e23;
    id1 = id1 + c1;
    i = i + 1;
  }
  return(id1);
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
              if (number63(x)) {
                return(x + "");
              } else {
                throw new Error("Cannot compile atom: " + string(x));
              }
            }
          }
        }
      }
    }
  }
};
var terminator = function (stmt63) {
  if (!stmt63) {
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
  var x = form[0];
  var args = cut(form, 1);
  var _id = getenv(x);
  var special = _id.special;
  var stmt = _id.stmt;
  var self_tr63 = _id.tr;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
};
var parenthesize_call63 = function (x) {
  return(obj63(x) && hd(x) === "%function" || precedence(x) > 0);
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
  var _r50 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _r50.right;
  var _e26;
  if (right) {
    _e26 = _6261;
  } else {
    _e26 = _62;
  }
  if (_e26(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _id1 = cut(form, 1);
  var a = _id1[0];
  var b = _id1[1];
  var _id2 = op_delims(form, a);
  var ao = _id2[0];
  var ac = _id2[1];
  var _id3 = op_delims(form, b, {_stash: true, right: true});
  var bo = _id3[0];
  var bc = _id3[1];
  var _a = compile(a);
  var _b = compile(b);
  var _op = getop(op);
  if (unary63(form)) {
    return(_op + ao + _a + ac);
  } else {
    return(ao + _a + ac + " " + _op + " " + bo + _b + bc);
  }
};
compile_function = function (args, body) {
  var _r52 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _r52.name;
  var prefix = _r52.prefix;
  var _e27;
  if (name) {
    _e27 = compile(name);
  } else {
    _e27 = "";
  }
  var id = _e27;
  var _args1 = compile_args(args);
  indent_level = indent_level + 1;
  var _x67 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _body1 = _x67;
  var ind = indentation();
  var _e28;
  if (prefix) {
    _e28 = prefix + " ";
  } else {
    _e28 = "";
  }
  var p = _e28;
  var _e29;
  if (target === "js") {
    _e29 = "";
  } else {
    _e29 = "end";
  }
  var tr = _e29;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _args1 + " {\n" + _body1 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _args1 + "\n" + _body1 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _r54 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _r54.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _e30;
      if (stmt) {
        _e30 = indentation();
      } else {
        _e30 = "";
      }
      var ind = _e30;
      var _e31;
      if (atom63(form)) {
        _e31 = compile_atom(form);
      } else {
        var _e32;
        if (infix63(hd(form))) {
          _e32 = compile_infix(form);
        } else {
          _e32 = compile_call(form);
        }
        _e31 = _e32;
      }
      var _form = _e31;
      return(ind + _form + tr);
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
var lower_do = function (args, hoist, stmt63, tail63) {
  var _x72 = almost(args);
  var _n10 = _35(_x72);
  var _i10 = 0;
  while (_i10 < _n10) {
    var x = _x72[_i10];
    add(hoist, lower(x, hoist, stmt63));
    _i10 = _i10 + 1;
  }
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _then = args[1];
  var _else = args[2];
  if (stmt63 || tail63) {
    var _e34;
    if (_else) {
      _e34 = [lower_body([_else], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_then], tail63)], _e34)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _e33;
    if (_else) {
      _e33 = [lower(["set", e, _else])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _then])], _e33));
    return(e);
  }
};
var lower_short = function (x, args, hoist) {
  var a = args[0];
  var b = args[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var id = unique("id");
    var _e35;
    if (x === "and") {
      _e35 = ["%if", id, b, id];
    } else {
      _e35 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _e35], hoist));
  } else {
    return([x, lower(a, hoist), b1]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var c = args[0];
  var body = cut(args, 1);
  return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
};
var lower_for = function (args, hoist) {
  var t = args[0];
  var k = args[1];
  var body = cut(args, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
};
var lower_function = function (args) {
  var a = args[0];
  var body = cut(args, 1);
  return(["%function", a, lower_body(body, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var name = args[0];
  var _args2 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _args2, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _form1 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_form1)) {
    return(_form1);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var x = form[0];
  var args = cut(form, 1);
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
          var x = form[0];
          var args = cut(form, 1);
          if (x === "do") {
            return(lower_do(args, hoist, stmt63, tail63));
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
};
var expand = function (form) {
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
var run_file = function (path) {
  return(run(read_file(path)));
};
var compile_file = function (path) {
  var s = reader.stream(read_file(path));
  var body = reader["read-all"](s);
  var form = expand(join(["do"], body));
  return(compile(form, {_stash: true, stmt: true}));
};
setenv("do", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  var _x99 = forms;
  var _n12 = _35(_x99);
  var _i12 = 0;
  while (_i12 < _n12) {
    var x = _x99[_i12];
    s = s + compile(x, {_stash: true, stmt: true});
    _i12 = _i12 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _cond1 = compile(cond);
  indent_level = indent_level + 1;
  var _x102 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _cons1 = _x102;
  var _e36;
  if (alt) {
    indent_level = indent_level + 1;
    var _x103 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _e36 = _x103;
  }
  var _alt1 = _e36;
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
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _cond3 = compile(cond);
  indent_level = indent_level + 1;
  var _x105 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x105;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _cond3 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _cond3 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _t1 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _x107 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x107;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _t1 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _t1 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _x113 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _x113;
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _x117 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _x117;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
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
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + x);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _e37;
  if (nil63(x)) {
    _e37 = "return";
  } else {
    _e37 = "return(" + compile(x) + ")";
  }
  var _x127 = _e37;
  return(indentation() + _x127);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _e38;
  if (target === "js") {
    _e38 = "throw new " + compile(["Error", x]);
  } else {
    _e38 = "error(" + compile(x) + ")";
  }
  var e = _e38;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _e39;
  if (is63(value)) {
    _e39 = " = " + value1;
  } else {
    _e39 = "";
  }
  var rh = _e39;
  var _e40;
  if (target === "js") {
    _e40 = "var ";
  } else {
    _e40 = "local ";
  }
  var keyword = _e40;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _lh1 = compile(lh);
  var _e41;
  if (nil63(rh)) {
    _e41 = "nil";
  } else {
    _e41 = rh;
  }
  var _rh1 = compile(_e41);
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
  var _e42;
  if (target === "lua") {
    _e42 = "{";
  } else {
    _e42 = "[";
  }
  var open = _e42;
  var _e43;
  if (target === "lua") {
    _e43 = "}";
  } else {
    _e43 = "]";
  }
  var close = _e43;
  var s = "";
  var c = "";
  var _o9 = forms;
  var k = undefined;
  for (k in _o9) {
    var v = _o9[k];
    var _e44;
    if (numeric63(k)) {
      _e44 = parseInt(k);
    } else {
      _e44 = k;
    }
    var _k8 = _e44;
    if (number63(_k8)) {
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
  var _e45;
  if (target === "lua") {
    _e45 = " = ";
  } else {
    _e45 = ": ";
  }
  var sep = _e45;
  var _o11 = pair(forms);
  var k = undefined;
  for (k in _o11) {
    var v = _o11[k];
    var _e46;
    if (numeric63(k)) {
      _e46 = parseInt(k);
    } else {
      _e46 = k;
    }
    var _k11 = _e46;
    if (number63(_k11)) {
      var _k12 = v[0];
      var _v2 = v[1];
      if (!string63(_k12)) {
        throw new Error("Illegal key: " + string(_k12));
      }
      s = s + c + key(_k12) + sep + compile(_v2);
      c = ", ";
    }
  }
  return(s + "}");
}});
exports.eval = eval;
exports["run-file"] = run_file;
exports["compile-file"] = compile_file;
exports.expand = expand;
exports.compile = compile;
