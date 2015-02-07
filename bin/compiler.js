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
var _u20 = 0;
unique = function () {
  _u20 = _u20 + 1;
  return("_u" + _u20);
};
unique63 = function (id) {
  return("_u" === clip(id, 0, 2));
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _u25 = args;
    var k = undefined;
    for (k in _u25) {
      var v = _u25[k];
      var _u332;
      if (numeric63(k)) {
        _u332 = parseInt(k);
      } else {
        _u332 = k;
      }
      var _u27 = _u332;
      if (!number63(_u27)) {
        add(l, literal(_u27));
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
    var id = unique();
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _u35 = lh;
      var k = undefined;
      for (k in _u35) {
        var v = _u35[k];
        var _u333;
        if (numeric63(k)) {
          _u333 = parseInt(k);
        } else {
          _u333 = k;
        }
        var _u37 = _u333;
        var _u334;
        if (_u37 === "rest") {
          _u334 = ["cut", rh, _35(lh)];
        } else {
          _u334 = ["get", rh, ["quote", bias(_u37)]];
        }
        var x = _u334;
        if (is63(_u37)) {
          var _u335;
          if (v === true) {
            _u335 = _u37;
          } else {
            _u335 = v;
          }
          var _u41 = _u335;
          bs = join(bs, bind(_u41, x));
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
    var r = unique();
    var _u57 = args;
    var k = undefined;
    for (k in _u57) {
      var v = _u57[k];
      var _u336;
      if (numeric63(k)) {
        _u336 = parseInt(k);
      } else {
        _u336 = k;
      }
      var _u59 = _u336;
      if (number63(_u59)) {
        if (atom63(v)) {
          add(args1, v);
        } else {
          var x = unique();
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
        var _u1 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _u2 = form[0];
          var args = form[1];
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _u73 = args;
          var _u1 = undefined;
          for (_u1 in _u73) {
            var _u71 = _u73[_u1];
            var _u338;
            if (numeric63(_u1)) {
              _u338 = parseInt(_u1);
            } else {
              _u338 = _u1;
            }
            var _u1 = _u338;
            setenv(_u71, {_stash: true, variable: true});
          }
          var _u72 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u72);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u76 = form[1];
            var _u77 = form[2];
            var _u78 = cut(form, 3);
            add(environment, {_scope: true});
            var _u81 = _u77;
            var _u1 = undefined;
            for (_u1 in _u81) {
              var _u79 = _u81[_u1];
              var _u337;
              if (numeric63(_u1)) {
                _u337 = parseInt(_u1);
              } else {
                _u337 = _u1;
              }
              var _u1 = _u337;
              setenv(_u79, {_stash: true, variable: true});
            }
            var _u80 = join([x, _u76, _u77], macroexpand(_u78));
            drop(environment);
            return(_u80);
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
  var _u87 = form;
  var k = undefined;
  for (k in _u87) {
    var v = _u87[k];
    var _u339;
    if (numeric63(k)) {
      _u339 = parseInt(k);
    } else {
      _u339 = k;
    }
    var _u89 = _u339;
    if (!number63(_u89)) {
      var _u340;
      if (quasisplice63(v, depth)) {
        _u340 = quasiexpand(v[1]);
      } else {
        _u340 = quasiexpand(v, depth);
      }
      var _u90 = _u340;
      last(xs)[_u89] = _u90;
    }
  }
  var _u91 = form;
  var _u92 = _35(_u91);
  var _u93 = 0;
  while (_u93 < _u92) {
    var x = _u91[_u93];
    if (quasisplice63(x, depth)) {
      var _u94 = quasiexpand(x[1]);
      add(xs, _u94);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _u93 = _u93 + 1;
  }
  var pruned = keep(function (x) {
    return(_35(x) > 1 || !(hd(x) === "list") || keys63(x));
  }, xs);
  return(join(["join*"], pruned));
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
expand_if = function (_u102) {
  var a = _u102[0];
  var b = _u102[1];
  var c = cut(_u102, 2);
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
  var _u4 = 0;
  while (_u4 < indent_level) {
    s = s + "  ";
    _u4 = _u4 + 1;
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
  var _u112 = t;
  var k = undefined;
  for (k in _u112) {
    var v = _u112[k];
    var _u341;
    if (numeric63(k)) {
      _u341 = parseInt(k);
    } else {
      _u341 = k;
    }
    var _u114 = _u341;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u114));
      add(o, x);
    }
  }
  return(o);
};
var _u116 = [];
var _u117 = [];
_u117.js = "!";
_u117.lua = "not ";
_u116["not"] = _u117;
var _u118 = [];
_u118["*"] = true;
_u118["/"] = true;
_u118["%"] = true;
var _u119 = [];
_u119["+"] = true;
_u119["-"] = true;
var _u120 = [];
var _u121 = [];
_u121.js = "+";
_u121.lua = "..";
_u120.cat = _u121;
var _u122 = [];
_u122["<"] = true;
_u122[">"] = true;
_u122["<="] = true;
_u122[">="] = true;
var _u123 = [];
var _u124 = [];
_u124.js = "===";
_u124.lua = "==";
_u123["="] = _u124;
var _u125 = [];
var _u126 = [];
_u126.js = "&&";
_u126.lua = "and";
_u125["and"] = _u126;
var _u127 = [];
var _u128 = [];
_u128.js = "||";
_u128.lua = "or";
_u127["or"] = _u128;
var infix = [_u116, _u118, _u119, _u120, _u122, _u123, _u125, _u127];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u133 = infix;
    var k = undefined;
    for (k in _u133) {
      var v = _u133[k];
      var _u342;
      if (numeric63(k)) {
        _u342 = parseInt(k);
      } else {
        _u342 = k;
      }
      var _u135 = _u342;
      if (v[hd(form)]) {
        return(index(_u135));
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
  var _u140 = args;
  var _u141 = _35(_u140);
  var _u142 = 0;
  while (_u142 < _u141) {
    var x = _u140[_u142];
    s = s + c + compile(x);
    c = ", ";
    _u142 = _u142 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u343;
    if (c === "\n") {
      _u343 = "\\n";
    } else {
      _u343 = c;
    }
    s1 = s1 + _u343;
    i = i + 1;
  }
  return(s1 + "");
};
var id = function (id) {
  var id1 = "";
  var i = 0;
  while (i < _35(id)) {
    var c = char(id, i);
    var n = code(c);
    var _u344;
    if (c === "-") {
      _u344 = "_";
    } else {
      var _u345;
      if (valid_code63(n)) {
        _u345 = c;
      } else {
        var _u346;
        if (i === 0) {
          _u346 = "_" + n;
        } else {
          _u346 = n;
        }
        _u345 = _u346;
      }
      _u344 = _u345;
    }
    var c1 = _u344;
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
  var _u148 = getenv(x);
  var special = _u148.special;
  var stmt = _u148.stmt;
  var self_tr63 = _u148.tr;
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
  var _u151 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u151.right;
  var _u347;
  if (right) {
    _u347 = _6261;
  } else {
    _u347 = _62;
  }
  if (_u347(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u155 = cut(form, 1);
  var a = _u155[0];
  var b = _u155[1];
  var _u156 = op_delims(form, a);
  var ao = _u156[0];
  var ac = _u156[1];
  var _u157 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u157[0];
  var bc = _u157[1];
  var _u158 = compile(a);
  var _u159 = compile(b);
  var _u160 = getop(op);
  if (unary63(form)) {
    return(_u160 + ao + _u158 + ac);
  } else {
    return(ao + _u158 + ac + " " + _u160 + " " + bo + _u159 + bc);
  }
};
compile_function = function (args, body) {
  var _u161 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u161.name;
  var prefix = _u161.prefix;
  var _u348;
  if (name) {
    _u348 = compile(name);
  } else {
    _u348 = "";
  }
  var id = _u348;
  var _u162 = compile_args(args);
  indent_level = indent_level + 1;
  var _u164 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u163 = _u164;
  var ind = indentation();
  var _u349;
  if (prefix) {
    _u349 = prefix + " ";
  } else {
    _u349 = "";
  }
  var p = _u349;
  var _u350;
  if (target === "js") {
    _u350 = "";
  } else {
    _u350 = "end";
  }
  var tr = _u350;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u162 + " {\n" + _u163 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u162 + "\n" + _u163 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u166 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u166.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u351;
      if (stmt) {
        _u351 = indentation();
      } else {
        _u351 = "";
      }
      var ind = _u351;
      var _u352;
      if (atom63(form)) {
        _u352 = compile_atom(form);
      } else {
        var _u353;
        if (infix63(hd(form))) {
          _u353 = compile_infix(form);
        } else {
          _u353 = compile_call(form);
        }
        _u352 = _u353;
      }
      var _u167 = _u352;
      return(ind + _u167 + tr);
    }
  }
};
var lower_statement = function (form, tail63) {
  var hoist = [];
  var e = lower(form, hoist, true, tail63);
  if (some63(hoist) && is63(e)) {
    return(join(["do"], join(hoist, [e])));
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
  var _u175 = butlast(args);
  var _u176 = _35(_u175);
  var _u177 = 0;
  while (_u177 < _u176) {
    var x = _u175[_u177];
    add(hoist, lower(x, hoist, stmt63));
    _u177 = _u177 + 1;
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
  var _u180 = args[1];
  var _u181 = args[2];
  if (stmt63 || tail63) {
    var _u355;
    if (_u181) {
      _u355 = [lower_body([_u181], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u180], tail63)], _u355)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u354;
    if (_u181) {
      _u354 = [lower(["set", e, _u181])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u180])], _u354));
    return(e);
  }
};
var lower_short = function (x, args, hoist) {
  var a = args[0];
  var b = args[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var id = unique();
    var _u356;
    if (x === "and") {
      _u356 = ["%if", id, b, id];
    } else {
      _u356 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u356], hoist));
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
  var _u206 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u206, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u209 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u209)) {
    return(_u209);
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
  var _u228 = forms;
  var _u229 = _35(_u228);
  var _u230 = 0;
  while (_u230 < _u229) {
    var x = _u228[_u230];
    s = s + compile(x, {_stash: true, stmt: true});
    _u230 = _u230 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u239 = compile(cond);
  indent_level = indent_level + 1;
  var _u241 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u240 = _u241;
  var _u357;
  if (alt) {
    indent_level = indent_level + 1;
    var _u243 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u357 = _u243;
  }
  var _u242 = _u357;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u239 + ") {\n" + _u240 + ind + "}";
  } else {
    s = s + ind + "if " + _u239 + " then\n" + _u240;
  }
  if (_u242 && target === "js") {
    s = s + " else {\n" + _u242 + ind + "}";
  } else {
    if (_u242) {
      s = s + ind + "else\n" + _u242;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u248 = compile(cond);
  indent_level = indent_level + 1;
  var _u249 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u249;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u248 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u248 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u254 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u255 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u255;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u254 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u254 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u263 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u263;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u267 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u267;
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
  var _u358;
  if (nil63(x)) {
    _u358 = "return";
  } else {
    _u358 = "return(" + compile(x) + ")";
  }
  var _u290 = _u358;
  return(indentation() + _u290);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u359;
  if (target === "js") {
    _u359 = "throw new " + compile(["Error", x]);
  } else {
    _u359 = "error(" + compile(x) + ")";
  }
  var e = _u359;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u360;
  if (is63(value)) {
    _u360 = " = " + value1;
  } else {
    _u360 = "";
  }
  var rh = _u360;
  var _u361;
  if (target === "js") {
    _u361 = "var ";
  } else {
    _u361 = "local ";
  }
  var keyword = _u361;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u305 = compile(lh);
  var _u362;
  if (nil63(rh)) {
    _u362 = "nil";
  } else {
    _u362 = rh;
  }
  var _u306 = compile(_u362);
  return(indentation() + _u305 + " = " + _u306);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u310 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u310, 0) === "{") {
    _u310 = "(" + _u310 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u310 + "." + inner(k));
  } else {
    return(_u310 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u363;
  if (target === "lua") {
    _u363 = "{";
  } else {
    _u363 = "[";
  }
  var open = _u363;
  var _u364;
  if (target === "lua") {
    _u364 = "}";
  } else {
    _u364 = "]";
  }
  var close = _u364;
  var s = "";
  var c = "";
  var _u317 = forms;
  var k = undefined;
  for (k in _u317) {
    var v = _u317[k];
    var _u365;
    if (numeric63(k)) {
      _u365 = parseInt(k);
    } else {
      _u365 = k;
    }
    var _u319 = _u365;
    if (number63(_u319)) {
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
  var _u366;
  if (target === "lua") {
    _u366 = " = ";
  } else {
    _u366 = ": ";
  }
  var sep = _u366;
  var _u327 = pair(forms);
  var k = undefined;
  for (k in _u327) {
    var v = _u327[k];
    var _u367;
    if (numeric63(k)) {
      _u367 = parseInt(k);
    } else {
      _u367 = k;
    }
    var _u329 = _u367;
    if (number63(_u329)) {
      var _u330 = v[0];
      var _u331 = v[1];
      if (!string63(_u330)) {
        throw new Error("Illegal key: " + string(_u330));
      }
      s = s + c + key(_u330) + sep + compile(_u331);
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
