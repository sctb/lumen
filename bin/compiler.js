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
    var _u22 = args;
    var k = undefined;
    for (k in _u22) {
      var v = _u22[k];
      var _u329;
      if (numeric63(k)) {
        _u329 = parseInt(k);
      } else {
        _u329 = k;
      }
      var _u24 = _u329;
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
        var _u330;
        if (numeric63(k)) {
          _u330 = parseInt(k);
        } else {
          _u330 = k;
        }
        var _u34 = _u330;
        var _u331;
        if (_u34 === "rest") {
          _u331 = ["cut", rh, _35(lh)];
        } else {
          _u331 = ["get", rh, ["quote", bias(_u34)]];
        }
        var x = _u331;
        if (is63(_u34)) {
          var _u332;
          if (v === true) {
            _u332 = _u34;
          } else {
            _u332 = v;
          }
          var _u38 = _u332;
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
      var _u333;
      if (numeric63(k)) {
        _u333 = parseInt(k);
      } else {
        _u333 = k;
      }
      var _u56 = _u333;
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
            var _u335;
            if (numeric63(_u1)) {
              _u335 = parseInt(_u1);
            } else {
              _u335 = _u1;
            }
            var _u1 = _u335;
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
              var _u334;
              if (numeric63(_u1)) {
                _u334 = parseInt(_u1);
              } else {
                _u334 = _u1;
              }
              var _u1 = _u334;
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
var quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var _u84 = form;
  var k = undefined;
  for (k in _u84) {
    var v = _u84[k];
    var _u336;
    if (numeric63(k)) {
      _u336 = parseInt(k);
    } else {
      _u336 = k;
    }
    var _u86 = _u336;
    if (!number63(_u86)) {
      var _u337;
      if (quasisplice63(v, depth)) {
        _u337 = quasiexpand(v[1]);
      } else {
        _u337 = quasiexpand(v, depth);
      }
      var _u87 = _u337;
      last(xs)[_u86] = _u87;
    }
  }
  var _u88 = form;
  var _u89 = _35(_u88);
  var _u90 = 0;
  while (_u90 < _u89) {
    var x = _u88[_u90];
    if (quasisplice63(x, depth)) {
      var _u91 = quasiexpand(x[1]);
      add(xs, _u91);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _u90 = _u90 + 1;
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
expand_if = function (_u99) {
  var a = _u99[0];
  var b = _u99[1];
  var c = cut(_u99, 2);
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
  var _u109 = t;
  var k = undefined;
  for (k in _u109) {
    var v = _u109[k];
    var _u338;
    if (numeric63(k)) {
      _u338 = parseInt(k);
    } else {
      _u338 = k;
    }
    var _u111 = _u338;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u111));
      add(o, x);
    }
  }
  return(o);
};
var _u113 = [];
var _u114 = [];
_u114.js = "!";
_u114.lua = "not ";
_u113["not"] = _u114;
var _u115 = [];
_u115["*"] = true;
_u115["/"] = true;
_u115["%"] = true;
var _u116 = [];
_u116["+"] = true;
_u116["-"] = true;
var _u117 = [];
var _u118 = [];
_u118.js = "+";
_u118.lua = "..";
_u117.cat = _u118;
var _u119 = [];
_u119["<"] = true;
_u119[">"] = true;
_u119["<="] = true;
_u119[">="] = true;
var _u120 = [];
var _u121 = [];
_u121.js = "===";
_u121.lua = "==";
_u120["="] = _u121;
var _u122 = [];
var _u123 = [];
_u123.js = "&&";
_u123.lua = "and";
_u122["and"] = _u123;
var _u124 = [];
var _u125 = [];
_u125.js = "||";
_u125.lua = "or";
_u124["or"] = _u125;
var infix = [_u113, _u115, _u116, _u117, _u119, _u120, _u122, _u124];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u130 = infix;
    var k = undefined;
    for (k in _u130) {
      var v = _u130[k];
      var _u339;
      if (numeric63(k)) {
        _u339 = parseInt(k);
      } else {
        _u339 = k;
      }
      var _u132 = _u339;
      if (v[hd(form)]) {
        return(index(_u132));
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
  var _u137 = args;
  var _u138 = _35(_u137);
  var _u139 = 0;
  while (_u139 < _u138) {
    var x = _u137[_u139];
    s = s + c + compile(x);
    c = ", ";
    _u139 = _u139 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u340;
    if (c === "\n") {
      _u340 = "\\n";
    } else {
      _u340 = c;
    }
    s1 = s1 + _u340;
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
    var _u341;
    if (c === "-") {
      _u341 = "_";
    } else {
      var _u342;
      if (valid_code63(n)) {
        _u342 = c;
      } else {
        var _u343;
        if (i === 0) {
          _u343 = "_" + n;
        } else {
          _u343 = n;
        }
        _u342 = _u343;
      }
      _u341 = _u342;
    }
    var c1 = _u341;
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
  var _u145 = getenv(x);
  var special = _u145.special;
  var stmt = _u145.stmt;
  var self_tr63 = _u145.tr;
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
  var _u148 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u148.right;
  var _u344;
  if (right) {
    _u344 = _6261;
  } else {
    _u344 = _62;
  }
  if (_u344(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _u152 = cut(form, 1);
  var a = _u152[0];
  var b = _u152[1];
  var _u153 = op_delims(form, a);
  var ao = _u153[0];
  var ac = _u153[1];
  var _u154 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u154[0];
  var bc = _u154[1];
  var _u155 = compile(a);
  var _u156 = compile(b);
  var _u157 = getop(op);
  if (unary63(form)) {
    return(_u157 + ao + _u155 + ac);
  } else {
    return(ao + _u155 + ac + " " + _u157 + " " + bo + _u156 + bc);
  }
};
compile_function = function (args, body) {
  var _u158 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u158.name;
  var prefix = _u158.prefix;
  var _u345;
  if (name) {
    _u345 = compile(name);
  } else {
    _u345 = "";
  }
  var id = _u345;
  var _u159 = compile_args(args);
  indent_level = indent_level + 1;
  var _u161 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u160 = _u161;
  var ind = indentation();
  var _u346;
  if (prefix) {
    _u346 = prefix + " ";
  } else {
    _u346 = "";
  }
  var p = _u346;
  var _u347;
  if (target === "js") {
    _u347 = "";
  } else {
    _u347 = "end";
  }
  var tr = _u347;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u159 + " {\n" + _u160 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u159 + "\n" + _u160 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u163 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u163.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u348;
      if (stmt) {
        _u348 = indentation();
      } else {
        _u348 = "";
      }
      var ind = _u348;
      var _u349;
      if (atom63(form)) {
        _u349 = compile_atom(form);
      } else {
        var _u350;
        if (infix63(hd(form))) {
          _u350 = compile_infix(form);
        } else {
          _u350 = compile_call(form);
        }
        _u349 = _u350;
      }
      var _u164 = _u349;
      return(ind + _u164 + tr);
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
  var _u172 = butlast(args);
  var _u173 = _35(_u172);
  var _u174 = 0;
  while (_u174 < _u173) {
    var x = _u172[_u174];
    add(hoist, lower(x, hoist, stmt63));
    _u174 = _u174 + 1;
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
  var _u177 = args[1];
  var _u178 = args[2];
  if (stmt63 || tail63) {
    var _u352;
    if (_u178) {
      _u352 = [lower_body([_u178], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u177], tail63)], _u352)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u351;
    if (_u178) {
      _u351 = [lower(["set", e, _u178])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u177])], _u351));
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
    var _u353;
    if (x === "and") {
      _u353 = ["%if", id, b, id];
    } else {
      _u353 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u353], hoist));
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
  var _u203 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u203, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u206 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u206)) {
    return(_u206);
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
  var _u225 = forms;
  var _u226 = _35(_u225);
  var _u227 = 0;
  while (_u227 < _u226) {
    var x = _u225[_u227];
    s = s + compile(x, {_stash: true, stmt: true});
    _u227 = _u227 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u236 = compile(cond);
  indent_level = indent_level + 1;
  var _u238 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u237 = _u238;
  var _u354;
  if (alt) {
    indent_level = indent_level + 1;
    var _u240 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u354 = _u240;
  }
  var _u239 = _u354;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u236 + ") {\n" + _u237 + ind + "}";
  } else {
    s = s + ind + "if " + _u236 + " then\n" + _u237;
  }
  if (_u239 && target === "js") {
    s = s + " else {\n" + _u239 + ind + "}";
  } else {
    if (_u239) {
      s = s + ind + "else\n" + _u239;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u245 = compile(cond);
  indent_level = indent_level + 1;
  var _u246 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u246;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u245 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u245 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u251 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u252 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u252;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u251 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u251 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u260 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u260;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u264 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u264;
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
  var _u355;
  if (nil63(x)) {
    _u355 = "return";
  } else {
    _u355 = "return(" + compile(x) + ")";
  }
  var _u287 = _u355;
  return(indentation() + _u287);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u356;
  if (target === "js") {
    _u356 = "throw new " + compile(["Error", x]);
  } else {
    _u356 = "error(" + compile(x) + ")";
  }
  var e = _u356;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u357;
  if (is63(value)) {
    _u357 = " = " + value1;
  } else {
    _u357 = "";
  }
  var rh = _u357;
  var _u358;
  if (target === "js") {
    _u358 = "var ";
  } else {
    _u358 = "local ";
  }
  var keyword = _u358;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u302 = compile(lh);
  var _u359;
  if (nil63(rh)) {
    _u359 = "nil";
  } else {
    _u359 = rh;
  }
  var _u303 = compile(_u359);
  return(indentation() + _u302 + " = " + _u303);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u307 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u307, 0) === "{") {
    _u307 = "(" + _u307 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u307 + "." + inner(k));
  } else {
    return(_u307 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u360;
  if (target === "lua") {
    _u360 = "{";
  } else {
    _u360 = "[";
  }
  var open = _u360;
  var _u361;
  if (target === "lua") {
    _u361 = "}";
  } else {
    _u361 = "]";
  }
  var close = _u361;
  var s = "";
  var c = "";
  var _u314 = forms;
  var k = undefined;
  for (k in _u314) {
    var v = _u314[k];
    var _u362;
    if (numeric63(k)) {
      _u362 = parseInt(k);
    } else {
      _u362 = k;
    }
    var _u316 = _u362;
    if (number63(_u316)) {
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
  var _u363;
  if (target === "lua") {
    _u363 = " = ";
  } else {
    _u363 = ": ";
  }
  var sep = _u363;
  var _u324 = pair(forms);
  var k = undefined;
  for (k in _u324) {
    var v = _u324[k];
    var _u364;
    if (numeric63(k)) {
      _u364 = parseInt(k);
    } else {
      _u364 = k;
    }
    var _u326 = _u364;
    if (number63(_u326)) {
      var _u327 = v[0];
      var _u328 = v[1];
      if (!string63(_u327)) {
        throw new Error("Illegal key: " + string(_u327));
      }
      s = s + c + key(_u327) + sep + compile(_u328);
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
