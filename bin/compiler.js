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
unique = function (x) {
  _u20 = _u20 + 1;
  return("_u" + (x || "") + _u20);
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _ux24 = args;
    var k = undefined;
    for (k in _ux24) {
      var v = _ux24[k];
      var _u341;
      if (numeric63(k)) {
        _u341 = parseInt(k);
      } else {
        _u341 = k;
      }
      var _u26 = _u341;
      if (!number63(_u26)) {
        add(l, literal(_u26));
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
      var _ux34 = lh;
      var k = undefined;
      for (k in _ux34) {
        var v = _ux34[k];
        var _u342;
        if (numeric63(k)) {
          _u342 = parseInt(k);
        } else {
          _u342 = k;
        }
        var _u36 = _u342;
        var _u343;
        if (_u36 === "rest") {
          _u343 = ["cut", rh, _35(lh)];
        } else {
          _u343 = ["get", rh, ["quote", bias(_u36)]];
        }
        var x = _u343;
        if (is63(_u36)) {
          var _u344;
          if (v === true) {
            _u344 = _u36;
          } else {
            _u344 = v;
          }
          var _u40 = _u344;
          bs = join(bs, bind(_u40, x));
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
    var _ux56 = args;
    var k = undefined;
    for (k in _ux56) {
      var v = _ux56[k];
      var _u345;
      if (numeric63(k)) {
        _u345 = parseInt(k);
      } else {
        _u345 = k;
      }
      var _u58 = _u345;
      if (number63(_u58)) {
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
        var _uignored1 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _uignored2 = form[0];
          var args = form[1];
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _ux72 = args;
          var _u1 = undefined;
          for (_u1 in _ux72) {
            var _u70 = _ux72[_u1];
            var _u347;
            if (numeric63(_u1)) {
              _u347 = parseInt(_u1);
            } else {
              _u347 = _u1;
            }
            var _u74 = _u347;
            setenv(_u70, {_stash: true, variable: true});
          }
          var _u71 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u71);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _uignored3 = form[0];
            var _u76 = form[1];
            var _u77 = form[2];
            var _u78 = cut(form, 3);
            add(environment, {_scope: true});
            var _ux81 = _u77;
            var _u1 = undefined;
            for (_u1 in _ux81) {
              var _u79 = _ux81[_u1];
              var _u346;
              if (numeric63(_u1)) {
                _u346 = parseInt(_u1);
              } else {
                _u346 = _u1;
              }
              var _u83 = _u346;
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
  var _ux88 = form;
  var k = undefined;
  for (k in _ux88) {
    var v = _ux88[k];
    var _u348;
    if (numeric63(k)) {
      _u348 = parseInt(k);
    } else {
      _u348 = k;
    }
    var _u90 = _u348;
    if (!number63(_u90)) {
      var _u349;
      if (quasisplice63(v, depth)) {
        _u349 = quasiexpand(v[1]);
      } else {
        _u349 = quasiexpand(v, depth);
      }
      var _u91 = _u349;
      last(xs)[_u90] = _u91;
    }
  }
  var _ux92 = form;
  var _un93 = _35(_ux92);
  var _ui94 = 0;
  while (_ui94 < _un93) {
    var x = _ux92[_ui94];
    if (quasisplice63(x, depth)) {
      var _u95 = quasiexpand(x[1]);
      add(xs, _u95);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _ui94 = _ui94 + 1;
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
expand_if = function (_u103) {
  var a = _u103[0];
  var b = _u103[1];
  var c = cut(_u103, 2);
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
  var _uignored4 = 0;
  while (_uignored4 < indent_level) {
    s = s + "  ";
    _uignored4 = _uignored4 + 1;
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
  var _ux113 = t;
  var k = undefined;
  for (k in _ux113) {
    var v = _ux113[k];
    var _u350;
    if (numeric63(k)) {
      _u350 = parseInt(k);
    } else {
      _u350 = k;
    }
    var _u115 = _u350;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u115));
      add(o, x);
    }
  }
  return(o);
};
var _u118 = [];
var _u119 = [];
_u119.js = "!";
_u119.lua = "not ";
_u118["not"] = _u119;
var _u121 = [];
_u121["*"] = true;
_u121["/"] = true;
_u121["%"] = true;
var _u123 = [];
_u123["+"] = true;
_u123["-"] = true;
var _u125 = [];
var _u126 = [];
_u126.js = "+";
_u126.lua = "..";
_u125.cat = _u126;
var _u128 = [];
_u128["<"] = true;
_u128[">"] = true;
_u128["<="] = true;
_u128[">="] = true;
var _u130 = [];
var _u131 = [];
_u131.js = "===";
_u131.lua = "==";
_u130["="] = _u131;
var _u133 = [];
var _u134 = [];
_u134.js = "&&";
_u134.lua = "and";
_u133["and"] = _u134;
var _u136 = [];
var _u137 = [];
_u137.js = "||";
_u137.lua = "or";
_u136["or"] = _u137;
var infix = [_u118, _u121, _u123, _u125, _u128, _u130, _u133, _u136];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _ux142 = infix;
    var k = undefined;
    for (k in _ux142) {
      var v = _ux142[k];
      var _u351;
      if (numeric63(k)) {
        _u351 = parseInt(k);
      } else {
        _u351 = k;
      }
      var _u144 = _u351;
      if (v[hd(form)]) {
        return(index(_u144));
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
  var _ux149 = args;
  var _un150 = _35(_ux149);
  var _ui151 = 0;
  while (_ui151 < _un150) {
    var x = _ux149[_ui151];
    s = s + c + compile(x);
    c = ", ";
    _ui151 = _ui151 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u352;
    if (c === "\n") {
      _u352 = "\\n";
    } else {
      _u352 = c;
    }
    s1 = s1 + _u352;
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
    var _u353;
    if (c === "-") {
      _u353 = "_";
    } else {
      var _u354;
      if (valid_code63(n)) {
        _u354 = c;
      } else {
        var _u355;
        if (i === 0) {
          _u355 = "_" + n;
        } else {
          _u355 = n;
        }
        _u354 = _u355;
      }
      _u353 = _u354;
    }
    var c1 = _u353;
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
  var _u157 = getenv(x);
  var special = _u157.special;
  var stmt = _u157.stmt;
  var self_tr63 = _u157.tr;
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
  var _u160 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u160.right;
  var _u356;
  if (right) {
    _u356 = _6261;
  } else {
    _u356 = _62;
  }
  if (_u356(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u164 = cut(form, 1);
  var a = _u164[0];
  var b = _u164[1];
  var _u165 = op_delims(form, a);
  var ao = _u165[0];
  var ac = _u165[1];
  var _u166 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u166[0];
  var bc = _u166[1];
  var _u167 = compile(a);
  var _u168 = compile(b);
  var _u169 = getop(op);
  if (unary63(form)) {
    return(_u169 + ao + _u167 + ac);
  } else {
    return(ao + _u167 + ac + " " + _u169 + " " + bo + _u168 + bc);
  }
};
compile_function = function (args, body) {
  var _u170 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u170.name;
  var prefix = _u170.prefix;
  var _u357;
  if (name) {
    _u357 = compile(name);
  } else {
    _u357 = "";
  }
  var id = _u357;
  var _u171 = compile_args(args);
  indent_level = indent_level + 1;
  var _ux173 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u172 = _ux173;
  var ind = indentation();
  var _u358;
  if (prefix) {
    _u358 = prefix + " ";
  } else {
    _u358 = "";
  }
  var p = _u358;
  var _u359;
  if (target === "js") {
    _u359 = "";
  } else {
    _u359 = "end";
  }
  var tr = _u359;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u171 + " {\n" + _u172 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u171 + "\n" + _u172 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u175 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u175.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u360;
      if (stmt) {
        _u360 = indentation();
      } else {
        _u360 = "";
      }
      var ind = _u360;
      var _u361;
      if (atom63(form)) {
        _u361 = compile_atom(form);
      } else {
        var _u362;
        if (infix63(hd(form))) {
          _u362 = compile_infix(form);
        } else {
          _u362 = compile_call(form);
        }
        _u361 = _u362;
      }
      var _u176 = _u361;
      return(ind + _u176 + tr);
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
  var _ux184 = butlast(args);
  var _un185 = _35(_ux184);
  var _ui186 = 0;
  while (_ui186 < _un185) {
    var x = _ux184[_ui186];
    add(hoist, lower(x, hoist, stmt63));
    _ui186 = _ui186 + 1;
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
  var _u189 = args[1];
  var _u190 = args[2];
  if (stmt63 || tail63) {
    var _u364;
    if (_u190) {
      _u364 = [lower_body([_u190], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u189], tail63)], _u364)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _u363;
    if (_u190) {
      _u363 = [lower(["set", e, _u190])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u189])], _u363));
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
    var _u365;
    if (x === "and") {
      _u365 = ["%if", id, b, id];
    } else {
      _u365 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u365], hoist));
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
  var _u215 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u215, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u218 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u218)) {
    return(_u218);
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
  var _ux237 = forms;
  var _un238 = _35(_ux237);
  var _ui239 = 0;
  while (_ui239 < _un238) {
    var x = _ux237[_ui239];
    s = s + compile(x, {_stash: true, stmt: true});
    _ui239 = _ui239 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u248 = compile(cond);
  indent_level = indent_level + 1;
  var _ux250 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u249 = _ux250;
  var _u366;
  if (alt) {
    indent_level = indent_level + 1;
    var _ux252 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u366 = _ux252;
  }
  var _u251 = _u366;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u248 + ") {\n" + _u249 + ind + "}";
  } else {
    s = s + ind + "if " + _u248 + " then\n" + _u249;
  }
  if (_u251 && target === "js") {
    s = s + " else {\n" + _u251 + ind + "}";
  } else {
    if (_u251) {
      s = s + ind + "else\n" + _u251;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u257 = compile(cond);
  indent_level = indent_level + 1;
  var _ux258 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux258;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u257 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u257 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u263 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux264 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux264;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u263 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u263 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux272 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux272;
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _ux276 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _ux276;
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
  var _u367;
  if (nil63(x)) {
    _u367 = "return";
  } else {
    _u367 = "return(" + compile(x) + ")";
  }
  var _u299 = _u367;
  return(indentation() + _u299);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u368;
  if (target === "js") {
    _u368 = "throw new " + compile(["Error", x]);
  } else {
    _u368 = "error(" + compile(x) + ")";
  }
  var e = _u368;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u369;
  if (is63(value)) {
    _u369 = " = " + value1;
  } else {
    _u369 = "";
  }
  var rh = _u369;
  var _u370;
  if (target === "js") {
    _u370 = "var ";
  } else {
    _u370 = "local ";
  }
  var keyword = _u370;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u314 = compile(lh);
  var _u371;
  if (nil63(rh)) {
    _u371 = "nil";
  } else {
    _u371 = rh;
  }
  var _u315 = compile(_u371);
  return(indentation() + _u314 + " = " + _u315);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u319 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u319, 0) === "{") {
    _u319 = "(" + _u319 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u319 + "." + inner(k));
  } else {
    return(_u319 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u372;
  if (target === "lua") {
    _u372 = "{";
  } else {
    _u372 = "[";
  }
  var open = _u372;
  var _u373;
  if (target === "lua") {
    _u373 = "}";
  } else {
    _u373 = "]";
  }
  var close = _u373;
  var s = "";
  var c = "";
  var _ux326 = forms;
  var k = undefined;
  for (k in _ux326) {
    var v = _ux326[k];
    var _u374;
    if (numeric63(k)) {
      _u374 = parseInt(k);
    } else {
      _u374 = k;
    }
    var _u328 = _u374;
    if (number63(_u328)) {
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
  var _u375;
  if (target === "lua") {
    _u375 = " = ";
  } else {
    _u375 = ": ";
  }
  var sep = _u375;
  var _ux336 = pair(forms);
  var k = undefined;
  for (k in _ux336) {
    var v = _ux336[k];
    var _u376;
    if (numeric63(k)) {
      _u376 = parseInt(k);
    } else {
      _u376 = k;
    }
    var _u338 = _u376;
    if (number63(_u338)) {
      var _u339 = v[0];
      var _u340 = v[1];
      if (!string63(_u339)) {
        throw new Error("Illegal key: " + string(_u339));
      }
      s = s + c + key(_u339) + sep + compile(_u340);
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
