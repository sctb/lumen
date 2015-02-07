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
var _uid120 = 0;
unique = function (x) {
  _uid120 = _uid120 + 1;
  return("_u" + x + _uid120);
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _uo24 = args;
    var k = undefined;
    for (k in _uo24) {
      var v = _uo24[k];
      var _ue353;
      if (numeric63(k)) {
        _ue353 = parseInt(k);
      } else {
        _ue353 = k;
      }
      var _uid127 = _ue353;
      if (!number63(_uid127)) {
        add(l, literal(_uid127));
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
      var _uo35 = lh;
      var k = undefined;
      for (k in _uo35) {
        var v = _uo35[k];
        var _ue354;
        if (numeric63(k)) {
          _ue354 = parseInt(k);
        } else {
          _ue354 = k;
        }
        var _uid138 = _ue354;
        var _ue355;
        if (_uid138 === "rest") {
          _ue355 = ["cut", rh, _35(lh)];
        } else {
          _ue355 = ["get", rh, ["quote", bias(_uid138)]];
        }
        var x = _ue355;
        if (is63(_uid138)) {
          var _ue356;
          if (v === true) {
            _ue356 = _uid138;
          } else {
            _ue356 = v;
          }
          var _uid142 = _ue356;
          bs = join(bs, bind(_uid142, x));
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
    var _uo58 = args;
    var k = undefined;
    for (k in _uo58) {
      var v = _uo58[k];
      var _ue357;
      if (numeric63(k)) {
        _ue357 = parseInt(k);
      } else {
        _ue357 = k;
      }
      var _uid161 = _ue357;
      if (number63(_uid161)) {
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
          var _uo75 = args;
          var _ui77 = undefined;
          for (_ui77 in _uo75) {
            var _ux73 = _uo75[_ui77];
            var _ue359;
            if (numeric63(_ui77)) {
              _ue359 = parseInt(_ui77);
            } else {
              _ue359 = _ui77;
            }
            var _uid178 = _ue359;
            setenv(_ux73, {_stash: true, variable: true});
          }
          var _ux74 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_ux74);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _uignored3 = form[0];
            var _uid180 = form[1];
            var _uid181 = form[2];
            var _uid182 = cut(form, 3);
            add(environment, {_scope: true});
            var _uo85 = _uid181;
            var _ui87 = undefined;
            for (_ui87 in _uo85) {
              var _ux83 = _uo85[_ui87];
              var _ue358;
              if (numeric63(_ui87)) {
                _ue358 = parseInt(_ui87);
              } else {
                _ue358 = _ui87;
              }
              var _uid188 = _ue358;
              setenv(_ux83, {_stash: true, variable: true});
            }
            var _ux84 = join([x, _uid180, _uid181], macroexpand(_uid182));
            drop(environment);
            return(_ux84);
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
  var _uo93 = form;
  var k = undefined;
  for (k in _uo93) {
    var v = _uo93[k];
    var _ue360;
    if (numeric63(k)) {
      _ue360 = parseInt(k);
    } else {
      _ue360 = k;
    }
    var _uid196 = _ue360;
    if (!number63(_uid196)) {
      var _ue361;
      if (quasisplice63(v, depth)) {
        _ue361 = quasiexpand(v[1]);
      } else {
        _ue361 = quasiexpand(v, depth);
      }
      var _uid197 = _ue361;
      last(xs)[_uid196] = _uid197;
    }
  }
  var _ux98 = form;
  var _un99 = _35(_ux98);
  var _ui100 = 0;
  while (_ui100 < _un99) {
    var x = _ux98[_ui100];
    if (quasisplice63(x, depth)) {
      var _uid1101 = quasiexpand(x[1]);
      add(xs, _uid1101);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _ui100 = _ui100 + 1;
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
expand_if = function (_ux109) {
  var a = _ux109[0];
  var b = _ux109[1];
  var c = cut(_ux109, 2);
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
  var _uo119 = t;
  var k = undefined;
  for (k in _uo119) {
    var v = _uo119[k];
    var _ue362;
    if (numeric63(k)) {
      _ue362 = parseInt(k);
    } else {
      _ue362 = k;
    }
    var _uid1122 = _ue362;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_uid1122));
      add(o, x);
    }
  }
  return(o);
};
var _uid1125 = [];
var _uid126 = [];
_uid126.js = "!";
_uid126.lua = "not ";
_uid1125["not"] = _uid126;
var _uid1128 = [];
_uid1128["*"] = true;
_uid1128["/"] = true;
_uid1128["%"] = true;
var _uid1130 = [];
_uid1130["+"] = true;
_uid1130["-"] = true;
var _uid1132 = [];
var _uid133 = [];
_uid133.js = "+";
_uid133.lua = "..";
_uid1132.cat = _uid133;
var _uid1135 = [];
_uid1135["<"] = true;
_uid1135[">"] = true;
_uid1135["<="] = true;
_uid1135[">="] = true;
var _uid1137 = [];
var _uid138 = [];
_uid138.js = "===";
_uid138.lua = "==";
_uid1137["="] = _uid138;
var _uid1140 = [];
var _uid141 = [];
_uid141.js = "&&";
_uid141.lua = "and";
_uid1140["and"] = _uid141;
var _uid1143 = [];
var _uid144 = [];
_uid144.js = "||";
_uid144.lua = "or";
_uid1143["or"] = _uid144;
var infix = [_uid1125, _uid1128, _uid1130, _uid1132, _uid1135, _uid1137, _uid1140, _uid1143];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _uo149 = infix;
    var k = undefined;
    for (k in _uo149) {
      var v = _uo149[k];
      var _ue363;
      if (numeric63(k)) {
        _ue363 = parseInt(k);
      } else {
        _ue363 = k;
      }
      var _uid1152 = _ue363;
      if (v[hd(form)]) {
        return(index(_uid1152));
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
  var _ux157 = args;
  var _un158 = _35(_ux157);
  var _ui159 = 0;
  while (_ui159 < _un158) {
    var x = _ux157[_ui159];
    s = s + c + compile(x);
    c = ", ";
    _ui159 = _ui159 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _ue364;
    if (c === "\n") {
      _ue364 = "\\n";
    } else {
      _ue364 = c;
    }
    s1 = s1 + _ue364;
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
    var _ue365;
    if (c === "-") {
      _ue365 = "_";
    } else {
      var _ue366;
      if (valid_code63(n)) {
        _ue366 = c;
      } else {
        var _ue367;
        if (i === 0) {
          _ue367 = "_" + n;
        } else {
          _ue367 = n;
        }
        _ue366 = _ue367;
      }
      _ue365 = _ue366;
    }
    var c1 = _ue365;
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
  var _uid165 = getenv(x);
  var special = _uid165.special;
  var stmt = _uid165.stmt;
  var self_tr63 = _uid165.tr;
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
  var _ur168 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _ur168.right;
  var _ue368;
  if (right) {
    _ue368 = _6261;
  } else {
    _ue368 = _62;
  }
  if (_ue368(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _uid172 = cut(form, 1);
  var a = _uid172[0];
  var b = _uid172[1];
  var _uid173 = op_delims(form, a);
  var ao = _uid173[0];
  var ac = _uid173[1];
  var _uid174 = op_delims(form, b, {_stash: true, right: true});
  var bo = _uid174[0];
  var bc = _uid174[1];
  var _uid1175 = compile(a);
  var _uid1176 = compile(b);
  var _uid1177 = getop(op);
  if (unary63(form)) {
    return(_uid1177 + ao + _uid1175 + ac);
  } else {
    return(ao + _uid1175 + ac + " " + _uid1177 + " " + bo + _uid1176 + bc);
  }
};
compile_function = function (args, body) {
  var _ur178 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _ur178.name;
  var prefix = _ur178.prefix;
  var _ue369;
  if (name) {
    _ue369 = compile(name);
  } else {
    _ue369 = "";
  }
  var id = _ue369;
  var _uid1179 = compile_args(args);
  indent_level = indent_level + 1;
  var _ux181 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1180 = _ux181;
  var ind = indentation();
  var _ue370;
  if (prefix) {
    _ue370 = prefix + " ";
  } else {
    _ue370 = "";
  }
  var p = _ue370;
  var _ue371;
  if (target === "js") {
    _ue371 = "";
  } else {
    _ue371 = "end";
  }
  var tr = _ue371;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _uid1179 + " {\n" + _uid1180 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _uid1179 + "\n" + _uid1180 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _ur183 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _ur183.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _ue372;
      if (stmt) {
        _ue372 = indentation();
      } else {
        _ue372 = "";
      }
      var ind = _ue372;
      var _ue373;
      if (atom63(form)) {
        _ue373 = compile_atom(form);
      } else {
        var _ue374;
        if (infix63(hd(form))) {
          _ue374 = compile_infix(form);
        } else {
          _ue374 = compile_call(form);
        }
        _ue373 = _ue374;
      }
      var _uid1184 = _ue373;
      return(ind + _uid1184 + tr);
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
  var _ux192 = butlast(args);
  var _un193 = _35(_ux192);
  var _ui194 = 0;
  while (_ui194 < _un193) {
    var x = _ux192[_ui194];
    add(hoist, lower(x, hoist, stmt63));
    _ui194 = _ui194 + 1;
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
  var _uid1197 = args[1];
  var _uid1198 = args[2];
  if (stmt63 || tail63) {
    var _ue376;
    if (_uid1198) {
      _ue376 = [lower_body([_uid1198], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_uid1197], tail63)], _ue376)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _ue375;
    if (_uid1198) {
      _ue375 = [lower(["set", e, _uid1198])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _uid1197])], _ue375));
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
    var _ue377;
    if (x === "and") {
      _ue377 = ["%if", id, b, id];
    } else {
      _ue377 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _ue377], hoist));
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
  var _uid1223 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _uid1223, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _uid1226 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_uid1226)) {
    return(_uid1226);
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
  var _ux245 = forms;
  var _un246 = _35(_ux245);
  var _ui247 = 0;
  while (_ui247 < _un246) {
    var x = _ux245[_ui247];
    s = s + compile(x, {_stash: true, stmt: true});
    _ui247 = _ui247 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _uid1256 = compile(cond);
  indent_level = indent_level + 1;
  var _ux258 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1257 = _ux258;
  var _ue378;
  if (alt) {
    indent_level = indent_level + 1;
    var _ux260 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _ue378 = _ux260;
  }
  var _uid1259 = _ue378;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _uid1256 + ") {\n" + _uid1257 + ind + "}";
  } else {
    s = s + ind + "if " + _uid1256 + " then\n" + _uid1257;
  }
  if (_uid1259 && target === "js") {
    s = s + " else {\n" + _uid1259 + ind + "}";
  } else {
    if (_uid1259) {
      s = s + ind + "else\n" + _uid1259;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _uid1265 = compile(cond);
  indent_level = indent_level + 1;
  var _ux266 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux266;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _uid1265 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _uid1265 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _uid1271 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux272 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux272;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _uid1271 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _uid1271 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux280 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux280;
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _ux284 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _ux284;
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
  var _ue379;
  if (nil63(x)) {
    _ue379 = "return";
  } else {
    _ue379 = "return(" + compile(x) + ")";
  }
  var _uid1307 = _ue379;
  return(indentation() + _uid1307);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _ue380;
  if (target === "js") {
    _ue380 = "throw new " + compile(["Error", x]);
  } else {
    _ue380 = "error(" + compile(x) + ")";
  }
  var e = _ue380;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _ue381;
  if (is63(value)) {
    _ue381 = " = " + value1;
  } else {
    _ue381 = "";
  }
  var rh = _ue381;
  var _ue382;
  if (target === "js") {
    _ue382 = "var ";
  } else {
    _ue382 = "local ";
  }
  var keyword = _ue382;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _uid1322 = compile(lh);
  var _ue383;
  if (nil63(rh)) {
    _ue383 = "nil";
  } else {
    _ue383 = rh;
  }
  var _uid1323 = compile(_ue383);
  return(indentation() + _uid1322 + " = " + _uid1323);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _uid1327 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_uid1327, 0) === "{") {
    _uid1327 = "(" + _uid1327 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_uid1327 + "." + inner(k));
  } else {
    return(_uid1327 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _ue384;
  if (target === "lua") {
    _ue384 = "{";
  } else {
    _ue384 = "[";
  }
  var open = _ue384;
  var _ue385;
  if (target === "lua") {
    _ue385 = "}";
  } else {
    _ue385 = "]";
  }
  var close = _ue385;
  var s = "";
  var c = "";
  var _uo335 = forms;
  var k = undefined;
  for (k in _uo335) {
    var v = _uo335[k];
    var _ue386;
    if (numeric63(k)) {
      _ue386 = parseInt(k);
    } else {
      _ue386 = k;
    }
    var _uid1338 = _ue386;
    if (number63(_uid1338)) {
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
  var _ue387;
  if (target === "lua") {
    _ue387 = " = ";
  } else {
    _ue387 = ": ";
  }
  var sep = _ue387;
  var _uo347 = pair(forms);
  var k = undefined;
  for (k in _uo347) {
    var v = _uo347[k];
    var _ue388;
    if (numeric63(k)) {
      _ue388 = parseInt(k);
    } else {
      _ue388 = k;
    }
    var _uid1350 = _ue388;
    if (number63(_uid1350)) {
      var _uid1351 = v[0];
      var _uid1352 = v[1];
      if (!string63(_uid1351)) {
        throw new Error("Illegal key: " + string(_uid1351));
      }
      s = s + c + key(_uid1351) + sep + compile(_uid1352);
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
