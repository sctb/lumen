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
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _u21 = args;
    var k = undefined;
    for (k in _u21) {
      var v = _u21[k];
      var _u318;
      if (numeric63(k)) {
        _u318 = parseInt(k);
      } else {
        _u318 = k;
      }
      var _u23 = _u318;
      if (!number63(_u23)) {
        add(l, literal(_u23));
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
      var _u31 = lh;
      var k = undefined;
      for (k in _u31) {
        var v = _u31[k];
        var _u319;
        if (numeric63(k)) {
          _u319 = parseInt(k);
        } else {
          _u319 = k;
        }
        var _u33 = _u319;
        var _u320;
        if (_u33 === "rest") {
          _u320 = ["cut", rh, _35(lh)];
        } else {
          _u320 = ["get", rh, ["quote", bias(_u33)]];
        }
        var x = _u320;
        if (is63(_u33)) {
          var _u321;
          if (v === true) {
            _u321 = _u33;
          } else {
            _u321 = v;
          }
          var _u37 = _u321;
          bs = join(bs, bind(_u37, x));
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
    var _u53 = args;
    var k = undefined;
    for (k in _u53) {
      var v = _u53[k];
      var _u322;
      if (numeric63(k)) {
        _u322 = parseInt(k);
      } else {
        _u322 = k;
      }
      var _u55 = _u322;
      if (number63(_u55)) {
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
          var _u69 = args;
          var _u1 = undefined;
          for (_u1 in _u69) {
            var _u67 = _u69[_u1];
            var _u324;
            if (numeric63(_u1)) {
              _u324 = parseInt(_u1);
            } else {
              _u324 = _u1;
            }
            var _u1 = _u324;
            setenv(_u67, {_stash: true, variable: true});
          }
          var _u68 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u68);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u72 = form[1];
            var _u73 = form[2];
            var _u74 = cut(form, 3);
            add(environment, {_scope: true});
            var _u77 = _u73;
            var _u1 = undefined;
            for (_u1 in _u77) {
              var _u75 = _u77[_u1];
              var _u323;
              if (numeric63(_u1)) {
                _u323 = parseInt(_u1);
              } else {
                _u323 = _u1;
              }
              var _u1 = _u323;
              setenv(_u75, {_stash: true, variable: true});
            }
            var _u76 = join([x, _u72, _u73], macroexpand(_u74));
            drop(environment);
            return(_u76);
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
  var _u83 = form;
  var k = undefined;
  for (k in _u83) {
    var v = _u83[k];
    var _u325;
    if (numeric63(k)) {
      _u325 = parseInt(k);
    } else {
      _u325 = k;
    }
    var _u85 = _u325;
    if (!number63(_u85)) {
      var _u326;
      if (quasisplice63(v, depth)) {
        _u326 = quasiexpand(v[1]);
      } else {
        _u326 = quasiexpand(v, depth);
      }
      var _u86 = _u326;
      last(xs)[_u85] = _u86;
    }
  }
  step(function (x) {
    if (quasisplice63(x, depth)) {
      var _u88 = quasiexpand(x[1]);
      add(xs, _u88);
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
expand_if = function (_u96) {
  var a = _u96[0];
  var b = _u96[1];
  var c = cut(_u96, 2);
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
  var _u106 = t;
  var k = undefined;
  for (k in _u106) {
    var v = _u106[k];
    var _u327;
    if (numeric63(k)) {
      _u327 = parseInt(k);
    } else {
      _u327 = k;
    }
    var _u108 = _u327;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u108));
      add(o, x);
    }
  }
  return(o);
};
var _u110 = [];
var _u111 = [];
_u111.js = "!";
_u111.lua = "not ";
_u110["not"] = _u111;
var _u112 = [];
_u112["*"] = true;
_u112["/"] = true;
_u112["%"] = true;
var _u113 = [];
_u113["+"] = true;
_u113["-"] = true;
var _u114 = [];
var _u115 = [];
_u115.js = "+";
_u115.lua = "..";
_u114.cat = _u115;
var _u116 = [];
_u116["<"] = true;
_u116[">"] = true;
_u116["<="] = true;
_u116[">="] = true;
var _u117 = [];
var _u118 = [];
_u118.js = "===";
_u118.lua = "==";
_u117["="] = _u118;
var _u119 = [];
var _u120 = [];
_u120.js = "&&";
_u120.lua = "and";
_u119["and"] = _u120;
var _u121 = [];
var _u122 = [];
_u122.js = "||";
_u122.lua = "or";
_u121["or"] = _u122;
var infix = [_u110, _u112, _u113, _u114, _u116, _u117, _u119, _u121];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u127 = infix;
    var k = undefined;
    for (k in _u127) {
      var v = _u127[k];
      var _u328;
      if (numeric63(k)) {
        _u328 = parseInt(k);
      } else {
        _u328 = k;
      }
      var _u129 = _u328;
      if (v[hd(form)]) {
        return(index(_u129));
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
    var _u329;
    if (c === "\n") {
      _u329 = "\\n";
    } else {
      _u329 = c;
    }
    s1 = s1 + _u329;
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
    var _u330;
    if (c === "-") {
      _u330 = "_";
    } else {
      var _u331;
      if (valid_code63(n)) {
        _u331 = c;
      } else {
        var _u332;
        if (i === 0) {
          _u332 = "_" + n;
        } else {
          _u332 = n;
        }
        _u331 = _u332;
      }
      _u330 = _u331;
    }
    var c1 = _u330;
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
  var _u140 = getenv(x);
  var special = _u140.special;
  var stmt = _u140.stmt;
  var self_tr63 = _u140.tr;
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
  var _u143 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u143.right;
  var _u333;
  if (right) {
    _u333 = _6261;
  } else {
    _u333 = _62;
  }
  if (_u333(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u147 = cut(form, 1);
  var a = _u147[0];
  var b = _u147[1];
  var _u148 = op_delims(form, a);
  var ao = _u148[0];
  var ac = _u148[1];
  var _u149 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u149[0];
  var bc = _u149[1];
  var _u150 = compile(a);
  var _u151 = compile(b);
  var _u152 = getop(op);
  if (unary63(form)) {
    return(_u152 + ao + _u150 + ac);
  } else {
    return(ao + _u150 + ac + " " + _u152 + " " + bo + _u151 + bc);
  }
};
compile_function = function (args, body) {
  var _u153 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u153.name;
  var prefix = _u153.prefix;
  var _u334;
  if (name) {
    _u334 = compile(name);
  } else {
    _u334 = "";
  }
  var id = _u334;
  var _u154 = compile_args(args);
  indent_level = indent_level + 1;
  var _u156 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u155 = _u156;
  var ind = indentation();
  var _u335;
  if (prefix) {
    _u335 = prefix + " ";
  } else {
    _u335 = "";
  }
  var p = _u335;
  var _u336;
  if (target === "js") {
    _u336 = "";
  } else {
    _u336 = "end";
  }
  var tr = _u336;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u154 + " {\n" + _u155 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u154 + "\n" + _u155 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u158 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u158.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u337;
      if (stmt) {
        _u337 = indentation();
      } else {
        _u337 = "";
      }
      var ind = _u337;
      var _u338;
      if (atom63(form)) {
        _u338 = compile_atom(form);
      } else {
        var _u339;
        if (infix63(hd(form))) {
          _u339 = compile_infix(form);
        } else {
          _u339 = compile_call(form);
        }
        _u338 = _u339;
      }
      var _u159 = _u338;
      return(ind + _u159 + tr);
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
  var _u170 = args[1];
  var _u171 = args[2];
  if (stmt63 || tail63) {
    var _u341;
    if (_u171) {
      _u341 = [lower_body([_u171], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u170], tail63)], _u341)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u340;
    if (_u171) {
      _u340 = [lower(["set", e, _u171])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u170])], _u340));
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
    var _u342;
    if (x === "and") {
      _u342 = ["%if", id, b, id];
    } else {
      _u342 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u342], hoist));
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
  var _u196 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u196, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u199 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u199)) {
    return(_u199);
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
  step(function (x) {
    s = s + compile(x, {_stash: true, stmt: true});
  }, forms);
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u225 = compile(cond);
  indent_level = indent_level + 1;
  var _u227 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u226 = _u227;
  var _u343;
  if (alt) {
    indent_level = indent_level + 1;
    var _u229 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u343 = _u229;
  }
  var _u228 = _u343;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u225 + ") {\n" + _u226 + ind + "}";
  } else {
    s = s + ind + "if " + _u225 + " then\n" + _u226;
  }
  if (_u228 && target === "js") {
    s = s + " else {\n" + _u228 + ind + "}";
  } else {
    if (_u228) {
      s = s + ind + "else\n" + _u228;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u234 = compile(cond);
  indent_level = indent_level + 1;
  var _u235 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u235;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u234 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u234 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u240 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u241 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u241;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u240 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u240 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u249 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u249;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u253 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u253;
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
  var _u344;
  if (nil63(x)) {
    _u344 = "return";
  } else {
    _u344 = "return(" + compile(x) + ")";
  }
  var _u276 = _u344;
  return(indentation() + _u276);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u345;
  if (target === "js") {
    _u345 = "throw new " + compile(["Error", x]);
  } else {
    _u345 = "error(" + compile(x) + ")";
  }
  var e = _u345;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u346;
  if (is63(value)) {
    _u346 = " = " + value1;
  } else {
    _u346 = "";
  }
  var rh = _u346;
  var _u347;
  if (target === "js") {
    _u347 = "var ";
  } else {
    _u347 = "local ";
  }
  var keyword = _u347;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u291 = compile(lh);
  var _u348;
  if (nil63(rh)) {
    _u348 = "nil";
  } else {
    _u348 = rh;
  }
  var _u292 = compile(_u348);
  return(indentation() + _u291 + " = " + _u292);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u296 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u296, 0) === "{") {
    _u296 = "(" + _u296 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u296 + "." + inner(k));
  } else {
    return(_u296 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u349;
  if (target === "lua") {
    _u349 = "{";
  } else {
    _u349 = "[";
  }
  var open = _u349;
  var _u350;
  if (target === "lua") {
    _u350 = "}";
  } else {
    _u350 = "]";
  }
  var close = _u350;
  var s = "";
  var c = "";
  var _u303 = forms;
  var k = undefined;
  for (k in _u303) {
    var v = _u303[k];
    var _u351;
    if (numeric63(k)) {
      _u351 = parseInt(k);
    } else {
      _u351 = k;
    }
    var _u305 = _u351;
    if (number63(_u305)) {
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
  var _u352;
  if (target === "lua") {
    _u352 = " = ";
  } else {
    _u352 = ": ";
  }
  var sep = _u352;
  var _u313 = pair(forms);
  var k = undefined;
  for (k in _u313) {
    var v = _u313[k];
    var _u353;
    if (numeric63(k)) {
      _u353 = parseInt(k);
    } else {
      _u353 = k;
    }
    var _u315 = _u353;
    if (number63(_u315)) {
      var _u316 = v[0];
      var _u317 = v[1];
      if (!string63(_u316)) {
        throw new Error("Illegal key: " + string(_u316));
      }
      s = s + c + key(_u316) + sep + compile(_u317);
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
