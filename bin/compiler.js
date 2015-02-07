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
var _uid116 = 0;
unique = function (x) {
  _uid116 = _uid116 + 1;
  return("_u" + x + _uid116);
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _uo20 = args;
    var k = undefined;
    for (k in _uo20) {
      var v = _uo20[k];
      var _ue352;
      if (numeric63(k)) {
        _ue352 = parseInt(k);
      } else {
        _ue352 = k;
      }
      var _uid123 = _ue352;
      if (!number63(_uid123)) {
        add(l, literal(_uid123));
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
      var _uo31 = lh;
      var k = undefined;
      for (k in _uo31) {
        var v = _uo31[k];
        var _ue353;
        if (numeric63(k)) {
          _ue353 = parseInt(k);
        } else {
          _ue353 = k;
        }
        var _uid134 = _ue353;
        var _ue354;
        if (_uid134 === "rest") {
          _ue354 = ["cut", rh, _35(lh)];
        } else {
          _ue354 = ["get", rh, ["quote", bias(_uid134)]];
        }
        var x = _ue354;
        if (is63(_uid134)) {
          var _ue355;
          if (v === true) {
            _ue355 = _uid134;
          } else {
            _ue355 = v;
          }
          var _uid138 = _ue355;
          bs = join(bs, bind(_uid138, x));
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
    var _uo54 = args;
    var k = undefined;
    for (k in _uo54) {
      var v = _uo54[k];
      var _ue356;
      if (numeric63(k)) {
        _ue356 = parseInt(k);
      } else {
        _ue356 = k;
      }
      var _uid157 = _ue356;
      if (number63(_uid157)) {
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
        var _uid168 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _uid170 = form[0];
          var args = form[1];
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _uo73 = args;
          var _ui75 = undefined;
          for (_ui75 in _uo73) {
            var _ux71 = _uo73[_ui75];
            var _ue358;
            if (numeric63(_ui75)) {
              _ue358 = parseInt(_ui75);
            } else {
              _ue358 = _ui75;
            }
            var _uid176 = _ue358;
            setenv(_ux71, {_stash: true, variable: true});
          }
          var _ux72 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_ux72);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _uid178 = form[0];
            var _uid179 = form[1];
            var _uid180 = form[2];
            var _uid181 = cut(form, 3);
            add(environment, {_scope: true});
            var _uo84 = _uid180;
            var _ui86 = undefined;
            for (_ui86 in _uo84) {
              var _ux82 = _uo84[_ui86];
              var _ue357;
              if (numeric63(_ui86)) {
                _ue357 = parseInt(_ui86);
              } else {
                _ue357 = _ui86;
              }
              var _uid187 = _ue357;
              setenv(_ux82, {_stash: true, variable: true});
            }
            var _ux83 = join([_uid178, _uid179, _uid180], macroexpand(_uid181));
            drop(environment);
            return(_ux83);
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
  var _uo92 = form;
  var k = undefined;
  for (k in _uo92) {
    var v = _uo92[k];
    var _ue359;
    if (numeric63(k)) {
      _ue359 = parseInt(k);
    } else {
      _ue359 = k;
    }
    var _uid195 = _ue359;
    if (!number63(_uid195)) {
      var _ue360;
      if (quasisplice63(v, depth)) {
        _ue360 = quasiexpand(v[1]);
      } else {
        _ue360 = quasiexpand(v, depth);
      }
      var _uid196 = _ue360;
      last(xs)[_uid195] = _uid196;
    }
  }
  var _ux97 = form;
  var _un98 = _35(_ux97);
  var _ui99 = 0;
  while (_ui99 < _un98) {
    var x = _ux97[_ui99];
    if (quasisplice63(x, depth)) {
      var _uid1100 = quasiexpand(x[1]);
      add(xs, _uid1100);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _ui99 = _ui99 + 1;
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
expand_if = function (_ux108) {
  var a = _ux108[0];
  var b = _ux108[1];
  var c = cut(_ux108, 2);
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
  var _uo118 = t;
  var k = undefined;
  for (k in _uo118) {
    var v = _uo118[k];
    var _ue361;
    if (numeric63(k)) {
      _ue361 = parseInt(k);
    } else {
      _ue361 = k;
    }
    var _uid1121 = _ue361;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_uid1121));
      add(o, x);
    }
  }
  return(o);
};
var _uid1124 = [];
var _uid125 = [];
_uid125.js = "!";
_uid125.lua = "not ";
_uid1124["not"] = _uid125;
var _uid1127 = [];
_uid1127["*"] = true;
_uid1127["/"] = true;
_uid1127["%"] = true;
var _uid1129 = [];
_uid1129["+"] = true;
_uid1129["-"] = true;
var _uid1131 = [];
var _uid132 = [];
_uid132.js = "+";
_uid132.lua = "..";
_uid1131.cat = _uid132;
var _uid1134 = [];
_uid1134["<"] = true;
_uid1134[">"] = true;
_uid1134["<="] = true;
_uid1134[">="] = true;
var _uid1136 = [];
var _uid137 = [];
_uid137.js = "===";
_uid137.lua = "==";
_uid1136["="] = _uid137;
var _uid1139 = [];
var _uid140 = [];
_uid140.js = "&&";
_uid140.lua = "and";
_uid1139["and"] = _uid140;
var _uid1142 = [];
var _uid143 = [];
_uid143.js = "||";
_uid143.lua = "or";
_uid1142["or"] = _uid143;
var infix = [_uid1124, _uid1127, _uid1129, _uid1131, _uid1134, _uid1136, _uid1139, _uid1142];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _uo148 = infix;
    var k = undefined;
    for (k in _uo148) {
      var v = _uo148[k];
      var _ue362;
      if (numeric63(k)) {
        _ue362 = parseInt(k);
      } else {
        _ue362 = k;
      }
      var _uid1151 = _ue362;
      if (v[hd(form)]) {
        return(index(_uid1151));
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
  var _ux156 = args;
  var _un157 = _35(_ux156);
  var _ui158 = 0;
  while (_ui158 < _un157) {
    var x = _ux156[_ui158];
    s = s + c + compile(x);
    c = ", ";
    _ui158 = _ui158 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _ue363;
    if (c === "\n") {
      _ue363 = "\\n";
    } else {
      _ue363 = c;
    }
    s1 = s1 + _ue363;
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
    var _ue364;
    if (c === "-") {
      _ue364 = "_";
    } else {
      var _ue365;
      if (valid_code63(n)) {
        _ue365 = c;
      } else {
        var _ue366;
        if (i === 0) {
          _ue366 = "_" + n;
        } else {
          _ue366 = n;
        }
        _ue365 = _ue366;
      }
      _ue364 = _ue365;
    }
    var c1 = _ue364;
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
  var _uid164 = getenv(x);
  var special = _uid164.special;
  var stmt = _uid164.stmt;
  var self_tr63 = _uid164.tr;
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
  var _ur167 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _ur167.right;
  var _ue367;
  if (right) {
    _ue367 = _6261;
  } else {
    _ue367 = _62;
  }
  if (_ue367(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _uid171 = cut(form, 1);
  var a = _uid171[0];
  var b = _uid171[1];
  var _uid172 = op_delims(form, a);
  var ao = _uid172[0];
  var ac = _uid172[1];
  var _uid173 = op_delims(form, b, {_stash: true, right: true});
  var bo = _uid173[0];
  var bc = _uid173[1];
  var _uid1174 = compile(a);
  var _uid1175 = compile(b);
  var _uid1176 = getop(op);
  if (unary63(form)) {
    return(_uid1176 + ao + _uid1174 + ac);
  } else {
    return(ao + _uid1174 + ac + " " + _uid1176 + " " + bo + _uid1175 + bc);
  }
};
compile_function = function (args, body) {
  var _ur177 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _ur177.name;
  var prefix = _ur177.prefix;
  var _ue368;
  if (name) {
    _ue368 = compile(name);
  } else {
    _ue368 = "";
  }
  var id = _ue368;
  var _uid1178 = compile_args(args);
  indent_level = indent_level + 1;
  var _ux180 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1179 = _ux180;
  var ind = indentation();
  var _ue369;
  if (prefix) {
    _ue369 = prefix + " ";
  } else {
    _ue369 = "";
  }
  var p = _ue369;
  var _ue370;
  if (target === "js") {
    _ue370 = "";
  } else {
    _ue370 = "end";
  }
  var tr = _ue370;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _uid1178 + " {\n" + _uid1179 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _uid1178 + "\n" + _uid1179 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _ur182 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _ur182.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _ue371;
      if (stmt) {
        _ue371 = indentation();
      } else {
        _ue371 = "";
      }
      var ind = _ue371;
      var _ue372;
      if (atom63(form)) {
        _ue372 = compile_atom(form);
      } else {
        var _ue373;
        if (infix63(hd(form))) {
          _ue373 = compile_infix(form);
        } else {
          _ue373 = compile_call(form);
        }
        _ue372 = _ue373;
      }
      var _uid1183 = _ue372;
      return(ind + _uid1183 + tr);
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
  var _ux191 = butlast(args);
  var _un192 = _35(_ux191);
  var _ui193 = 0;
  while (_ui193 < _un192) {
    var x = _ux191[_ui193];
    add(hoist, lower(x, hoist, stmt63));
    _ui193 = _ui193 + 1;
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
  var _uid1196 = args[1];
  var _uid1197 = args[2];
  if (stmt63 || tail63) {
    var _ue375;
    if (_uid1197) {
      _ue375 = [lower_body([_uid1197], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_uid1196], tail63)], _ue375)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _ue374;
    if (_uid1197) {
      _ue374 = [lower(["set", e, _uid1197])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _uid1196])], _ue374));
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
    var _ue376;
    if (x === "and") {
      _ue376 = ["%if", id, b, id];
    } else {
      _ue376 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _ue376], hoist));
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
  var _uid1222 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _uid1222, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _uid1225 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_uid1225)) {
    return(_uid1225);
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
  var _ux244 = forms;
  var _un245 = _35(_ux244);
  var _ui246 = 0;
  while (_ui246 < _un245) {
    var x = _ux244[_ui246];
    s = s + compile(x, {_stash: true, stmt: true});
    _ui246 = _ui246 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _uid1255 = compile(cond);
  indent_level = indent_level + 1;
  var _ux257 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1256 = _ux257;
  var _ue377;
  if (alt) {
    indent_level = indent_level + 1;
    var _ux259 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _ue377 = _ux259;
  }
  var _uid1258 = _ue377;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _uid1255 + ") {\n" + _uid1256 + ind + "}";
  } else {
    s = s + ind + "if " + _uid1255 + " then\n" + _uid1256;
  }
  if (_uid1258 && target === "js") {
    s = s + " else {\n" + _uid1258 + ind + "}";
  } else {
    if (_uid1258) {
      s = s + ind + "else\n" + _uid1258;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _uid1264 = compile(cond);
  indent_level = indent_level + 1;
  var _ux265 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux265;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _uid1264 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _uid1264 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _uid1270 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux271 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux271;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _uid1270 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _uid1270 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux279 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux279;
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _ux283 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _ux283;
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
  var _ue378;
  if (nil63(x)) {
    _ue378 = "return";
  } else {
    _ue378 = "return(" + compile(x) + ")";
  }
  var _uid1306 = _ue378;
  return(indentation() + _uid1306);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _ue379;
  if (target === "js") {
    _ue379 = "throw new " + compile(["Error", x]);
  } else {
    _ue379 = "error(" + compile(x) + ")";
  }
  var e = _ue379;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _ue380;
  if (is63(value)) {
    _ue380 = " = " + value1;
  } else {
    _ue380 = "";
  }
  var rh = _ue380;
  var _ue381;
  if (target === "js") {
    _ue381 = "var ";
  } else {
    _ue381 = "local ";
  }
  var keyword = _ue381;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _uid1321 = compile(lh);
  var _ue382;
  if (nil63(rh)) {
    _ue382 = "nil";
  } else {
    _ue382 = rh;
  }
  var _uid1322 = compile(_ue382);
  return(indentation() + _uid1321 + " = " + _uid1322);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _uid1326 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_uid1326, 0) === "{") {
    _uid1326 = "(" + _uid1326 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_uid1326 + "." + inner(k));
  } else {
    return(_uid1326 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _ue383;
  if (target === "lua") {
    _ue383 = "{";
  } else {
    _ue383 = "[";
  }
  var open = _ue383;
  var _ue384;
  if (target === "lua") {
    _ue384 = "}";
  } else {
    _ue384 = "]";
  }
  var close = _ue384;
  var s = "";
  var c = "";
  var _uo334 = forms;
  var k = undefined;
  for (k in _uo334) {
    var v = _uo334[k];
    var _ue385;
    if (numeric63(k)) {
      _ue385 = parseInt(k);
    } else {
      _ue385 = k;
    }
    var _uid1337 = _ue385;
    if (number63(_uid1337)) {
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
  var _ue386;
  if (target === "lua") {
    _ue386 = " = ";
  } else {
    _ue386 = ": ";
  }
  var sep = _ue386;
  var _uo346 = pair(forms);
  var k = undefined;
  for (k in _uo346) {
    var v = _uo346[k];
    var _ue387;
    if (numeric63(k)) {
      _ue387 = parseInt(k);
    } else {
      _ue387 = k;
    }
    var _uid1349 = _ue387;
    if (number63(_uid1349)) {
      var _uid1350 = v[0];
      var _uid1351 = v[1];
      if (!string63(_uid1350)) {
        throw new Error("Illegal key: " + string(_uid1350));
      }
      s = s + c + key(_uid1350) + sep + compile(_uid1351);
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
