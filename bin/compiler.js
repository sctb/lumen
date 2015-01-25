var reader = require("reader");
getenv = function (k, p) {
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
var escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u319;
    if (c === "\n") {
      _u319 = "\\n";
    } else {
      var _u320;
      if (c === "\"") {
        _u320 = "\\\"";
      } else {
        var _u321;
        if (c === "\\") {
          _u321 = "\\\\";
        } else {
          _u321 = c;
        }
        _u320 = _u321;
      }
      _u319 = _u320;
    }
    var c1 = _u319;
    s1 = s1 + c1;
    i = i + 1;
  }
  return(s1 + "\"");
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
    var l = ["%object", "\"_stash\"", true];
    var _u22 = args;
    var k = undefined;
    for (k in _u22) {
      var v = _u22[k];
      var _u322;
      if (numeric63(k)) {
        _u322 = parseInt(k);
      } else {
        _u322 = k;
      }
      var _u24 = _u322;
      if (!number63(_u24)) {
        add(l, literal(_u24));
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
      var _u32 = lh;
      var k = undefined;
      for (k in _u32) {
        var v = _u32[k];
        var _u323;
        if (numeric63(k)) {
          _u323 = parseInt(k);
        } else {
          _u323 = k;
        }
        var _u34 = _u323;
        var _u324;
        if (_u34 === "rest") {
          _u324 = ["cut", rh, _35(lh)];
        } else {
          _u324 = ["get", rh, ["quote", bias(_u34)]];
        }
        var x = _u324;
        if (is63(_u34)) {
          var _u325;
          if (v === true) {
            _u325 = _u34;
          } else {
            _u325 = v;
          }
          var _u38 = _u325;
          bs = join(bs, bind(_u38, x));
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
    var _u54 = args;
    var k = undefined;
    for (k in _u54) {
      var v = _u54[k];
      var _u326;
      if (numeric63(k)) {
        _u326 = parseInt(k);
      } else {
        _u326 = k;
      }
      var _u56 = _u326;
      if (number63(_u56)) {
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
          var _u70 = args;
          var _u1 = undefined;
          for (_u1 in _u70) {
            var _u68 = _u70[_u1];
            var _u328;
            if (numeric63(_u1)) {
              _u328 = parseInt(_u1);
            } else {
              _u328 = _u1;
            }
            var _u1 = _u328;
            setenv(_u68, {_stash: true, variable: true});
          }
          var _u69 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u69);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u73 = form[1];
            var _u74 = form[2];
            var _u75 = cut(form, 3);
            add(environment, {_scope: true});
            var _u78 = _u74;
            var _u1 = undefined;
            for (_u1 in _u78) {
              var _u76 = _u78[_u1];
              var _u327;
              if (numeric63(_u1)) {
                _u327 = parseInt(_u1);
              } else {
                _u327 = _u1;
              }
              var _u1 = _u327;
              setenv(_u76, {_stash: true, variable: true});
            }
            var _u77 = join([x, _u73, _u74], macroexpand(_u75));
            drop(environment);
            return(_u77);
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
quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var _u84 = form;
  var k = undefined;
  for (k in _u84) {
    var v = _u84[k];
    var _u329;
    if (numeric63(k)) {
      _u329 = parseInt(k);
    } else {
      _u329 = k;
    }
    var _u86 = _u329;
    if (!number63(_u86)) {
      var _u330;
      if (quasisplice63(v, depth)) {
        _u330 = quasiexpand(v[1]);
      } else {
        _u330 = quasiexpand(v, depth);
      }
      var _u87 = _u330;
      last(xs)[_u86] = _u87;
    }
  }
  step(function (x) {
    if (quasisplice63(x, depth)) {
      var _u89 = quasiexpand(x[1]);
      add(xs, _u89);
      return(add(xs, ["list"]));
    } else {
      return(add(last(xs), quasiexpand(x, depth)));
    }
  }, form);
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
expand_if = function (_u97) {
  var a = _u97[0];
  var b = _u97[1];
  var c = cut(_u97, 2);
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
  return(apply(cat, replicate(indent_level, "  ")));
};
var reserved = {"instanceof": true, "with": true, "void": true, "nil": true, "try": true, "=": true, "finally": true, "debugger": true, "-": true, "false": true, "+": true, "in": true, "/": true, "then": true, "do": true, "if": true, "true": true, "end": true, "catch": true, "not": true, "until": true, "break": true, "return": true, "elseif": true, ">=": true, "<=": true, "repeat": true, "continue": true, "var": true, "local": true, "<": true, "while": true, "new": true, ">": true, "switch": true, "throw": true, "==": true, "this": true, "*": true, "else": true, "for": true, "delete": true, "or": true, "%": true, "default": true, "typeof": true, "case": true, "function": true, "and": true};
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
  var _u107 = t;
  var k = undefined;
  for (k in _u107) {
    var v = _u107[k];
    var _u331;
    if (numeric63(k)) {
      _u331 = parseInt(k);
    } else {
      _u331 = k;
    }
    var _u109 = _u331;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u109));
      add(o, x);
    }
  }
  return(o);
};
var _u111 = [];
var _u112 = [];
_u112.js = "!";
_u112.lua = "not ";
_u111["not"] = _u112;
var _u113 = [];
_u113["%"] = true;
_u113["*"] = true;
_u113["/"] = true;
var _u114 = [];
_u114["-"] = true;
_u114["+"] = true;
var _u115 = [];
var _u116 = [];
_u116.js = "+";
_u116.lua = "..";
_u115.cat = _u116;
var _u117 = [];
_u117["<="] = true;
_u117[">"] = true;
_u117[">="] = true;
_u117["<"] = true;
var _u118 = [];
var _u119 = [];
_u119.js = "===";
_u119.lua = "==";
_u118["="] = _u119;
var _u120 = [];
var _u121 = [];
_u121.js = "&&";
_u121.lua = "and";
_u120["and"] = _u121;
var _u122 = [];
var _u123 = [];
_u123.js = "||";
_u123.lua = "or";
_u122["or"] = _u123;
var infix = [_u111, _u113, _u114, _u115, _u117, _u118, _u120, _u122];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u128 = infix;
    var k = undefined;
    for (k in _u128) {
      var v = _u128[k];
      var _u332;
      if (numeric63(k)) {
        _u332 = parseInt(k);
      } else {
        _u332 = k;
      }
      var _u130 = _u332;
      if (v[hd(form)]) {
        return(index(_u130));
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
  step(function (x) {
    s = s + c + compile(x);
    c = ", ";
  }, args);
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u333;
    if (c === "\n") {
      _u333 = "\\n";
    } else {
      _u333 = c;
    }
    s1 = s1 + _u333;
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
    var _u334;
    if (c === "-") {
      _u334 = "_";
    } else {
      var _u335;
      if (valid_code63(n)) {
        _u335 = c;
      } else {
        var _u336;
        if (i === 0) {
          _u336 = "_" + n;
        } else {
          _u336 = n;
        }
        _u335 = _u336;
      }
      _u334 = _u335;
    }
    var c1 = _u334;
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
  var _u141 = getenv(x);
  var self_tr63 = _u141.tr;
  var stmt = _u141.stmt;
  var special = _u141.special;
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
  var _u144 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u144.right;
  var _u337;
  if (right) {
    _u337 = _6261;
  } else {
    _u337 = _62;
  }
  if (_u337(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u148 = cut(form, 1);
  var a = _u148[0];
  var b = _u148[1];
  var _u149 = op_delims(form, a);
  var ao = _u149[0];
  var ac = _u149[1];
  var _u150 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u150[0];
  var bc = _u150[1];
  var _u151 = compile(a);
  var _u152 = compile(b);
  var _u153 = getop(op);
  if (unary63(form)) {
    return(_u153 + ao + _u151 + ac);
  } else {
    return(ao + _u151 + ac + " " + _u153 + " " + bo + _u152 + bc);
  }
};
compile_function = function (args, body) {
  var _u154 = unstash(Array.prototype.slice.call(arguments, 2));
  var prefix = _u154.prefix;
  var name = _u154.name;
  var _u338;
  if (name) {
    _u338 = compile(name);
  } else {
    _u338 = "";
  }
  var id = _u338;
  var _u155 = compile_args(args);
  indent_level = indent_level + 1;
  var _u157 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u156 = _u157;
  var ind = indentation();
  var _u339;
  if (prefix) {
    _u339 = prefix + " ";
  } else {
    _u339 = "";
  }
  var p = _u339;
  var _u340;
  if (target === "js") {
    _u340 = "";
  } else {
    _u340 = "end";
  }
  var tr = _u340;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u155 + " {\n" + _u156 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u155 + "\n" + _u156 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u159 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u159.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u341;
      if (stmt) {
        _u341 = indentation();
      } else {
        _u341 = "";
      }
      var ind = _u341;
      var _u342;
      if (atom63(form)) {
        _u342 = compile_atom(form);
      } else {
        var _u343;
        if (infix63(hd(form))) {
          _u343 = compile_infix(form);
        } else {
          _u343 = compile_call(form);
        }
        _u342 = _u343;
      }
      var _u160 = _u342;
      return(ind + _u160 + tr);
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
  step(function (x) {
    return(add(hoist, lower(x, hoist, stmt63)));
  }, butlast(args));
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _u171 = args[1];
  var _u172 = args[2];
  if (stmt63 || tail63) {
    var _u345;
    if (_u172) {
      _u345 = [lower_body([_u172], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u171], tail63)], _u345)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u344;
    if (_u172) {
      _u344 = [lower(["set", e, _u172])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u171])], _u344));
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
    var _u346;
    if (x === "and") {
      _u346 = ["%if", id, b, id];
    } else {
      _u346 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u346], hoist));
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
  var _u197 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u197, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u200 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u200)) {
    return(_u200);
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
run_file = function (path) {
  return(run(read_file(path)));
};
compile_file = function (path) {
  var s = reader.stream(read_file(path));
  var body = reader["read-all"](s);
  var form = expand(join(["do"], body));
  return(compile(form, {_stash: true, stmt: true}));
};
load = function (path) {
  return(run(compile_file(path)));
};
setenv("do", {_stash: true, tr: true, stmt: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  step(function (x) {
    s = s + compile(x, {_stash: true, stmt: true});
  }, forms);
  return(s);
}});
setenv("%if", {_stash: true, tr: true, stmt: true, special: function (cond, cons, alt) {
  var _u228 = compile(cond);
  indent_level = indent_level + 1;
  var _u230 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u229 = _u230;
  var _u347;
  if (alt) {
    indent_level = indent_level + 1;
    var _u232 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u347 = _u232;
  }
  var _u231 = _u347;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u228 + ") {\n" + _u229 + ind + "}";
  } else {
    s = s + ind + "if " + _u228 + " then\n" + _u229;
  }
  if (_u231 && target === "js") {
    s = s + " else {\n" + _u231 + ind + "}";
  } else {
    if (_u231) {
      s = s + ind + "else\n" + _u231;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}});
setenv("while", {_stash: true, tr: true, stmt: true, special: function (cond, form) {
  var _u237 = compile(cond);
  indent_level = indent_level + 1;
  var _u238 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u238;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u237 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u237 + " do\n" + body + ind + "end\n");
  }
}});
setenv("%for", {_stash: true, tr: true, stmt: true, special: function (t, k, form) {
  var _u243 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u244 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u244;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u243 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u243 + ") {\n" + body + ind + "}\n");
  }
}});
setenv("%try", {_stash: true, tr: true, stmt: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u252 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u252;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u256 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u256;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
}});
setenv("%delete", {_stash: true, stmt: true, special: function (place) {
  return(indentation() + "delete " + compile(place));
}});
setenv("break", {_stash: true, stmt: true, special: function () {
  return(indentation() + "break");
}});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%global-function", {_stash: true, tr: true, stmt: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}});
setenv("%local-function", {_stash: true, tr: true, stmt: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, prefix: "local", name: name});
    return(indentation() + x);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}});
setenv("return", {_stash: true, stmt: true, special: function (x) {
  var _u348;
  if (nil63(x)) {
    _u348 = "return";
  } else {
    _u348 = "return(" + compile(x) + ")";
  }
  var _u279 = _u348;
  return(indentation() + _u279);
}});
setenv("error", {_stash: true, stmt: true, special: function (x) {
  var _u349;
  if (target === "js") {
    _u349 = "throw new " + compile(["Error", x]);
  } else {
    _u349 = "error(" + compile(x) + ")";
  }
  var e = _u349;
  return(indentation() + e);
}});
setenv("%local", {_stash: true, stmt: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u350;
  if (is63(value)) {
    _u350 = " = " + value1;
  } else {
    _u350 = "";
  }
  var rh = _u350;
  var _u351;
  if (target === "js") {
    _u351 = "var ";
  } else {
    _u351 = "local ";
  }
  var keyword = _u351;
  var ind = indentation();
  return(ind + keyword + id + rh);
}});
setenv("set", {_stash: true, stmt: true, special: function (lh, rh) {
  var _u294 = compile(lh);
  var _u352;
  if (nil63(rh)) {
    _u352 = "nil";
  } else {
    _u352 = rh;
  }
  var _u295 = compile(_u352);
  return(indentation() + _u294 + " = " + _u295);
}});
setenv("get", {_stash: true, special: function (t, k) {
  var _u299 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u299, 0) === "{") {
    _u299 = "(" + _u299 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u299 + "." + inner(k));
  } else {
    return(_u299 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u353;
  if (target === "lua") {
    _u353 = "{";
  } else {
    _u353 = "[";
  }
  var open = _u353;
  var _u354;
  if (target === "lua") {
    _u354 = "}";
  } else {
    _u354 = "]";
  }
  var close = _u354;
  var s = "";
  var c = "";
  var _u305 = forms;
  var k = undefined;
  for (k in _u305) {
    var v = _u305[k];
    var _u355;
    if (numeric63(k)) {
      _u355 = parseInt(k);
    } else {
      _u355 = k;
    }
    var _u307 = _u355;
    if (number63(_u307)) {
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
  var _u356;
  if (target === "lua") {
    _u356 = " = ";
  } else {
    _u356 = ": ";
  }
  var sep = _u356;
  var _u314 = pair(forms);
  var k = undefined;
  for (k in _u314) {
    var v = _u314[k];
    var _u357;
    if (numeric63(k)) {
      _u357 = parseInt(k);
    } else {
      _u357 = k;
    }
    var _u316 = _u357;
    if (number63(_u316)) {
      var _u317 = v[0];
      var _u318 = v[1];
      if (!string63(_u317)) {
        throw new Error("Illegal key: " + string(_u317));
      }
      s = s + c + key(_u317) + sep + compile(_u318);
      c = ", ";
    }
  }
  return(s + "}");
}});
exports.eval = eval;
exports["run-file"] = run_file;
exports["compile-file"] = compile_file;
exports.load = load;
exports.expand = expand;
exports.compile = compile;
