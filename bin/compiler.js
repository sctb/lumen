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
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _u24 = args;
    var k = undefined;
    for (k in _u24) {
      var v = _u24[k];
      var _u343;
      if (numeric63(k)) {
        _u343 = parseInt(k);
      } else {
        _u343 = k;
      }
      var _u26 = _u343;
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
    var id = unique();
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _u34 = lh;
      var k = undefined;
      for (k in _u34) {
        var v = _u34[k];
        var _u344;
        if (numeric63(k)) {
          _u344 = parseInt(k);
        } else {
          _u344 = k;
        }
        var _u36 = _u344;
        var _u345;
        if (_u36 === "rest") {
          _u345 = ["cut", rh, _35(lh)];
        } else {
          _u345 = ["get", rh, ["quote", bias(_u36)]];
        }
        var x = _u345;
        if (is63(_u36)) {
          var _u346;
          if (v === true) {
            _u346 = _u36;
          } else {
            _u346 = v;
          }
          var _u40 = _u346;
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
    var r = unique();
    var _u56 = args;
    var k = undefined;
    for (k in _u56) {
      var v = _u56[k];
      var _u347;
      if (numeric63(k)) {
        _u347 = parseInt(k);
      } else {
        _u347 = k;
      }
      var _u58 = _u347;
      if (number63(_u58)) {
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
          var _u72 = args;
          var _u74 = undefined;
          for (_u74 in _u72) {
            var _u70 = _u72[_u74];
            var _u349;
            if (numeric63(_u74)) {
              _u349 = parseInt(_u74);
            } else {
              _u349 = _u74;
            }
            var _u75 = _u349;
            setenv(_u70, {_stash: true, variable: true});
          }
          var _u71 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u71);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u77 = form[1];
            var _u78 = form[2];
            var _u79 = cut(form, 3);
            add(environment, {_scope: true});
            var _u82 = _u78;
            var _u84 = undefined;
            for (_u84 in _u82) {
              var _u80 = _u82[_u84];
              var _u348;
              if (numeric63(_u84)) {
                _u348 = parseInt(_u84);
              } else {
                _u348 = _u84;
              }
              var _u85 = _u348;
              setenv(_u80, {_stash: true, variable: true});
            }
            var _u81 = join([x, _u77, _u78], macroexpand(_u79));
            drop(environment);
            return(_u81);
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
  var _u90 = form;
  var k = undefined;
  for (k in _u90) {
    var v = _u90[k];
    var _u350;
    if (numeric63(k)) {
      _u350 = parseInt(k);
    } else {
      _u350 = k;
    }
    var _u92 = _u350;
    if (!number63(_u92)) {
      var _u351;
      if (quasisplice63(v, depth)) {
        _u351 = quasiexpand(v[1]);
      } else {
        _u351 = quasiexpand(v, depth);
      }
      var _u93 = _u351;
      last(xs)[_u92] = _u93;
    }
  }
  var _u94 = form;
  var _u95 = _35(_u94);
  var _u96 = 0;
  while (_u96 < _u95) {
    var x = _u94[_u96];
    if (quasisplice63(x, depth)) {
      var _u97 = quasiexpand(x[1]);
      add(xs, _u97);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _u96 = _u96 + 1;
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
expand_if = function (_u105) {
  var a = _u105[0];
  var b = _u105[1];
  var c = cut(_u105, 2);
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
  var _u115 = t;
  var k = undefined;
  for (k in _u115) {
    var v = _u115[k];
    var _u352;
    if (numeric63(k)) {
      _u352 = parseInt(k);
    } else {
      _u352 = k;
    }
    var _u117 = _u352;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u117));
      add(o, x);
    }
  }
  return(o);
};
var _u120 = [];
var _u121 = [];
_u121.js = "!";
_u121.lua = "not ";
_u120["not"] = _u121;
var _u123 = [];
_u123["*"] = true;
_u123["/"] = true;
_u123["%"] = true;
var _u125 = [];
_u125["+"] = true;
_u125["-"] = true;
var _u127 = [];
var _u128 = [];
_u128.js = "+";
_u128.lua = "..";
_u127.cat = _u128;
var _u130 = [];
_u130["<"] = true;
_u130[">"] = true;
_u130["<="] = true;
_u130[">="] = true;
var _u132 = [];
var _u133 = [];
_u133.js = "===";
_u133.lua = "==";
_u132["="] = _u133;
var _u135 = [];
var _u136 = [];
_u136.js = "&&";
_u136.lua = "and";
_u135["and"] = _u136;
var _u138 = [];
var _u139 = [];
_u139.js = "||";
_u139.lua = "or";
_u138["or"] = _u139;
var infix = [_u120, _u123, _u125, _u127, _u130, _u132, _u135, _u138];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u144 = infix;
    var k = undefined;
    for (k in _u144) {
      var v = _u144[k];
      var _u353;
      if (numeric63(k)) {
        _u353 = parseInt(k);
      } else {
        _u353 = k;
      }
      var _u146 = _u353;
      if (v[hd(form)]) {
        return(index(_u146));
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
  var _u151 = args;
  var _u152 = _35(_u151);
  var _u153 = 0;
  while (_u153 < _u152) {
    var x = _u151[_u153];
    s = s + c + compile(x);
    c = ", ";
    _u153 = _u153 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u354;
    if (c === "\n") {
      _u354 = "\\n";
    } else {
      _u354 = c;
    }
    s1 = s1 + _u354;
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
    var _u355;
    if (c === "-") {
      _u355 = "_";
    } else {
      var _u356;
      if (valid_code63(n)) {
        _u356 = c;
      } else {
        var _u357;
        if (i === 0) {
          _u357 = "_" + n;
        } else {
          _u357 = n;
        }
        _u356 = _u357;
      }
      _u355 = _u356;
    }
    var c1 = _u355;
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
  var _u159 = getenv(x);
  var special = _u159.special;
  var stmt = _u159.stmt;
  var self_tr63 = _u159.tr;
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
  var _u162 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u162.right;
  var _u358;
  if (right) {
    _u358 = _6261;
  } else {
    _u358 = _62;
  }
  if (_u358(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u166 = cut(form, 1);
  var a = _u166[0];
  var b = _u166[1];
  var _u167 = op_delims(form, a);
  var ao = _u167[0];
  var ac = _u167[1];
  var _u168 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u168[0];
  var bc = _u168[1];
  var _u169 = compile(a);
  var _u170 = compile(b);
  var _u171 = getop(op);
  if (unary63(form)) {
    return(_u171 + ao + _u169 + ac);
  } else {
    return(ao + _u169 + ac + " " + _u171 + " " + bo + _u170 + bc);
  }
};
compile_function = function (args, body) {
  var _u172 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u172.name;
  var prefix = _u172.prefix;
  var _u359;
  if (name) {
    _u359 = compile(name);
  } else {
    _u359 = "";
  }
  var id = _u359;
  var _u173 = compile_args(args);
  indent_level = indent_level + 1;
  var _u175 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u174 = _u175;
  var ind = indentation();
  var _u360;
  if (prefix) {
    _u360 = prefix + " ";
  } else {
    _u360 = "";
  }
  var p = _u360;
  var _u361;
  if (target === "js") {
    _u361 = "";
  } else {
    _u361 = "end";
  }
  var tr = _u361;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u173 + " {\n" + _u174 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u173 + "\n" + _u174 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u177 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u177.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u362;
      if (stmt) {
        _u362 = indentation();
      } else {
        _u362 = "";
      }
      var ind = _u362;
      var _u363;
      if (atom63(form)) {
        _u363 = compile_atom(form);
      } else {
        var _u364;
        if (infix63(hd(form))) {
          _u364 = compile_infix(form);
        } else {
          _u364 = compile_call(form);
        }
        _u363 = _u364;
      }
      var _u178 = _u363;
      return(ind + _u178 + tr);
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
  var _u186 = butlast(args);
  var _u187 = _35(_u186);
  var _u188 = 0;
  while (_u188 < _u187) {
    var x = _u186[_u188];
    add(hoist, lower(x, hoist, stmt63));
    _u188 = _u188 + 1;
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
  var _u191 = args[1];
  var _u192 = args[2];
  if (stmt63 || tail63) {
    var _u366;
    if (_u192) {
      _u366 = [lower_body([_u192], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u191], tail63)], _u366)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u365;
    if (_u192) {
      _u365 = [lower(["set", e, _u192])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u191])], _u365));
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
    var _u367;
    if (x === "and") {
      _u367 = ["%if", id, b, id];
    } else {
      _u367 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u367], hoist));
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
  var _u217 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u217, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u220 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u220)) {
    return(_u220);
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
  var _u239 = forms;
  var _u240 = _35(_u239);
  var _u241 = 0;
  while (_u241 < _u240) {
    var x = _u239[_u241];
    s = s + compile(x, {_stash: true, stmt: true});
    _u241 = _u241 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u250 = compile(cond);
  indent_level = indent_level + 1;
  var _u252 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u251 = _u252;
  var _u368;
  if (alt) {
    indent_level = indent_level + 1;
    var _u254 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u368 = _u254;
  }
  var _u253 = _u368;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u250 + ") {\n" + _u251 + ind + "}";
  } else {
    s = s + ind + "if " + _u250 + " then\n" + _u251;
  }
  if (_u253 && target === "js") {
    s = s + " else {\n" + _u253 + ind + "}";
  } else {
    if (_u253) {
      s = s + ind + "else\n" + _u253;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u259 = compile(cond);
  indent_level = indent_level + 1;
  var _u260 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u260;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u259 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u259 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u265 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u266 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u266;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u265 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u265 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u274 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u274;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u278 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u278;
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
  var _u369;
  if (nil63(x)) {
    _u369 = "return";
  } else {
    _u369 = "return(" + compile(x) + ")";
  }
  var _u301 = _u369;
  return(indentation() + _u301);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u370;
  if (target === "js") {
    _u370 = "throw new " + compile(["Error", x]);
  } else {
    _u370 = "error(" + compile(x) + ")";
  }
  var e = _u370;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u371;
  if (is63(value)) {
    _u371 = " = " + value1;
  } else {
    _u371 = "";
  }
  var rh = _u371;
  var _u372;
  if (target === "js") {
    _u372 = "var ";
  } else {
    _u372 = "local ";
  }
  var keyword = _u372;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u316 = compile(lh);
  var _u373;
  if (nil63(rh)) {
    _u373 = "nil";
  } else {
    _u373 = rh;
  }
  var _u317 = compile(_u373);
  return(indentation() + _u316 + " = " + _u317);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u321 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u321, 0) === "{") {
    _u321 = "(" + _u321 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u321 + "." + inner(k));
  } else {
    return(_u321 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u374;
  if (target === "lua") {
    _u374 = "{";
  } else {
    _u374 = "[";
  }
  var open = _u374;
  var _u375;
  if (target === "lua") {
    _u375 = "}";
  } else {
    _u375 = "]";
  }
  var close = _u375;
  var s = "";
  var c = "";
  var _u328 = forms;
  var k = undefined;
  for (k in _u328) {
    var v = _u328[k];
    var _u376;
    if (numeric63(k)) {
      _u376 = parseInt(k);
    } else {
      _u376 = k;
    }
    var _u330 = _u376;
    if (number63(_u330)) {
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
  var _u377;
  if (target === "lua") {
    _u377 = " = ";
  } else {
    _u377 = ": ";
  }
  var sep = _u377;
  var _u338 = pair(forms);
  var k = undefined;
  for (k in _u338) {
    var v = _u338[k];
    var _u378;
    if (numeric63(k)) {
      _u378 = parseInt(k);
    } else {
      _u378 = k;
    }
    var _u340 = _u378;
    if (number63(_u340)) {
      var _u341 = v[0];
      var _u342 = v[1];
      if (!string63(_u341)) {
        throw new Error("Illegal key: " + string(_u341));
      }
      s = s + c + key(_u341) + sep + compile(_u342);
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
