environment = [{}];
target = "js";
nil63 = function (x) {
  return(x === undefined || x === null);
};
is63 = function (x) {
  return(!nil63(x));
};
_35 = function (x) {
  return(x.length || 0);
};
none63 = function (x) {
  return(_35(x) === 0);
};
some63 = function (x) {
  return(_35(x) > 0);
};
one63 = function (x) {
  return(_35(x) === 1);
};
hd = function (l) {
  return(l[0]);
};
type = function (x) {
  return(typeof(x));
};
string63 = function (x) {
  return(type(x) === "string");
};
number63 = function (x) {
  return(type(x) === "number");
};
boolean63 = function (x) {
  return(type(x) === "boolean");
};
function63 = function (x) {
  return(type(x) === "function");
};
obj63 = function (x) {
  return(is63(x) && type(x) === "object");
};
atom63 = function (x) {
  return(nil63(x) || !obj63(x));
};
nan = 0 / 0;
inf = 1 / 0;
_inf = -(1 / 0);
nan63 = function (n) {
  return(!(n === n));
};
inf63 = function (n) {
  return(n === inf || n === _inf);
};
clip = function (s, from, upto) {
  return(s.substring(from, upto));
};
cut = function (x, from, upto) {
  var l = [];
  var j = 0;
  var _ue127;
  if (nil63(from) || from < 0) {
    _ue127 = 0;
  } else {
    _ue127 = from;
  }
  var i = _ue127;
  var n = _35(x);
  var _ue128;
  if (nil63(upto) || upto > n) {
    _ue128 = n;
  } else {
    _ue128 = upto;
  }
  var _uid125 = _ue128;
  while (i < _uid125) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _ux26 = x;
  var k = undefined;
  for (k in _ux26) {
    var v = _ux26[k];
    var _ue129;
    if (numeric63(k)) {
      _ue129 = parseInt(k);
    } else {
      _ue129 = k;
    }
    var _uid128 = _ue129;
    if (!number63(_uid128)) {
      l[_uid128] = v;
    }
  }
  return(l);
};
keys = function (x) {
  var t = [];
  var _ux30 = x;
  var k = undefined;
  for (k in _ux30) {
    var v = _ux30[k];
    var _ue130;
    if (numeric63(k)) {
      _ue130 = parseInt(k);
    } else {
      _ue130 = k;
    }
    var _uid132 = _ue130;
    if (!number63(_uid132)) {
      t[_uid132] = v;
    }
  }
  return(t);
};
edge = function (x) {
  return(_35(x) - 1);
};
inner = function (x) {
  return(clip(x, 1, edge(x)));
};
tl = function (l) {
  return(cut(l, 1));
};
char = function (s, n) {
  return(s.charAt(n));
};
code = function (s, n) {
  return(s.charCodeAt(n));
};
string_literal63 = function (x) {
  return(string63(x) && char(x, 0) === "\"");
};
id_literal63 = function (x) {
  return(string63(x) && char(x, 0) === "|");
};
add = function (l, x) {
  l.push(x);
  return(undefined);
};
drop = function (l) {
  return(l.pop());
};
last = function (l) {
  return(l[edge(l)]);
};
butlast = function (l) {
  return(cut(l, 0, edge(l)));
};
reverse = function (l) {
  var l1 = keys(l);
  var i = edge(l);
  while (i >= 0) {
    add(l1, l[i]);
    i = i - 1;
  }
  return(l1);
};
join = function (a, b) {
  if (a && b) {
    var c = [];
    var o = _35(a);
    var _ux46 = a;
    var k = undefined;
    for (k in _ux46) {
      var v = _ux46[k];
      var _ue131;
      if (numeric63(k)) {
        _ue131 = parseInt(k);
      } else {
        _ue131 = k;
      }
      var _uid148 = _ue131;
      c[_uid148] = v;
    }
    var _ux49 = b;
    var k = undefined;
    for (k in _ux49) {
      var v = _ux49[k];
      var _ue132;
      if (numeric63(k)) {
        _ue132 = parseInt(k);
      } else {
        _ue132 = k;
      }
      var _uid151 = _ue132;
      if (number63(_uid151)) {
        _uid151 = _uid151 + o;
      }
      c[_uid151] = v;
    }
    return(c);
  } else {
    return(a || b || []);
  }
};
reduce = function (f, x) {
  if (none63(x)) {
    return(x);
  } else {
    if (one63(x)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
};
find = function (f, t) {
  var _ux54 = t;
  var _uignored1 = undefined;
  for (_uignored1 in _ux54) {
    var x = _ux54[_uignored1];
    var _ue133;
    if (numeric63(_uignored1)) {
      _ue133 = parseInt(_uignored1);
    } else {
      _ue133 = _uignored1;
    }
    var _uid156 = _ue133;
    var _uid157 = f(x);
    if (_uid157) {
      return(_uid157);
    }
  }
};
first = function (f, l) {
  var n = _35(l);
  var i = 0;
  while (i < n) {
    var x = f(l[i]);
    if (x) {
      return(x);
    }
    i = i + 1;
  }
};
in63 = function (x, t) {
  return(find(function (y) {
    return(x === y);
  }, t));
};
pair = function (l) {
  var i = 0;
  var l1 = [];
  while (i < _35(l)) {
    add(l1, [l[i], l[i + 1]]);
    i = i + 2;
  }
  return(l1);
};
sort = function (l, f) {
  var _ue134;
  if (f) {
    _ue134 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_ue134));
};
map = function (f, x) {
  var t = [];
  var n = _35(x);
  var i = 0;
  while (i < n) {
    var y = f(x[i]);
    if (is63(y)) {
      add(t, y);
    }
    i = i + 1;
  }
  var _ux66 = x;
  var k = undefined;
  for (k in _ux66) {
    var v = _ux66[k];
    var _ue135;
    if (numeric63(k)) {
      _ue135 = parseInt(k);
    } else {
      _ue135 = k;
    }
    var _uid168 = _ue135;
    if (!number63(_uid168)) {
      var y = f(v);
      if (is63(y)) {
        t[_uid168] = y;
      }
    }
  }
  return(t);
};
keep = function (f, x) {
  return(map(function (v) {
    if (f(v)) {
      return(v);
    }
  }, x));
};
keys63 = function (t) {
  var _ux72 = t;
  var k = undefined;
  for (k in _ux72) {
    var _uignored2 = _ux72[k];
    var _ue136;
    if (numeric63(k)) {
      _ue136 = parseInt(k);
    } else {
      _ue136 = k;
    }
    var _uid174 = _ue136;
    if (!number63(_uid174)) {
      return(true);
    }
  }
  return(false);
};
empty63 = function (t) {
  var _ux76 = t;
  var _uignored3 = undefined;
  for (_uignored3 in _ux76) {
    var _uignored4 = _ux76[_uignored3];
    var _ue137;
    if (numeric63(_uignored3)) {
      _ue137 = parseInt(_uignored3);
    } else {
      _ue137 = _uignored3;
    }
    var _uid178 = _ue137;
    return(false);
  }
  return(true);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _ux80 = args;
    var k = undefined;
    for (k in _ux80) {
      var v = _ux80[k];
      var _ue138;
      if (numeric63(k)) {
        _ue138 = parseInt(k);
      } else {
        _ue138 = k;
      }
      var _uid182 = _ue138;
      if (!number63(_uid182)) {
        p[_uid182] = v;
      }
    }
    p._stash = true;
    add(args, p);
  }
  return(args);
};
unstash = function (args) {
  if (none63(args)) {
    return([]);
  } else {
    var l = last(args);
    if (obj63(l) && l._stash) {
      var args1 = butlast(args);
      var _ux84 = l;
      var k = undefined;
      for (k in _ux84) {
        var v = _ux84[k];
        var _ue139;
        if (numeric63(k)) {
          _ue139 = parseInt(k);
        } else {
          _ue139 = k;
        }
        var _uid186 = _ue139;
        if (!(_uid186 === "_stash")) {
          args1[_uid186] = v;
        }
      }
      return(args1);
    } else {
      return(args);
    }
  }
};
search = function (s, pattern, start) {
  var i = s.indexOf(pattern, start);
  if (i >= 0) {
    return(i);
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return([]);
  } else {
    var l = [];
    var n = _35(sep);
    while (true) {
      var i = search(s, sep);
      if (nil63(i)) {
        break;
      } else {
        add(l, clip(s, 0, i));
        s = clip(s, i + n);
      }
    }
    add(l, s);
    return(l);
  }
};
cat = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(xs)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return(a + b);
    }, xs));
  }
};
_43 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a + b);
  }, xs));
};
_ = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a - b);
  }, reverse(xs)));
};
_42 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a * b);
  }, xs));
};
_47 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a / b);
  }, reverse(xs)));
};
_37 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a % b);
  }, reverse(xs)));
};
_62 = function (a, b) {
  return(a > b);
};
_60 = function (a, b) {
  return(a < b);
};
_61 = function (a, b) {
  return(a === b);
};
_6261 = function (a, b) {
  return(a >= b);
};
_6061 = function (a, b) {
  return(a <= b);
};
number = function (s) {
  var n = parseFloat(s);
  if (!isNaN(n)) {
    return(n);
  }
};
number_code63 = function (n) {
  return(n > 47 && n < 58);
};
numeric63 = function (s) {
  var n = _35(s);
  var i = 0;
  while (i < n) {
    if (!number_code63(code(s, i))) {
      return(false);
    }
    i = i + 1;
  }
  return(true);
};
var tostring = function (x) {
  return(x["toString"]());
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _ue140;
    if (c === "\n") {
      _ue140 = "\\n";
    } else {
      var _ue141;
      if (c === "\"") {
        _ue141 = "\\\"";
      } else {
        var _ue142;
        if (c === "\\") {
          _ue142 = "\\\\";
        } else {
          _ue142 = c;
        }
        _ue141 = _ue142;
      }
      _ue140 = _ue141;
    }
    var c1 = _ue140;
    s1 = s1 + c1;
    i = i + 1;
  }
  return(s1 + "\"");
};
string = function (x, depth) {
  if (depth && depth > 7) {
    return("circular");
  } else {
    if (nil63(x)) {
      return("nil");
    } else {
      if (nan63(x)) {
        return("nan");
      } else {
        if (x === inf) {
          return("inf");
        } else {
          if (x === _inf) {
            return("-inf");
          } else {
            if (boolean63(x)) {
              if (x) {
                return("true");
              } else {
                return("false");
              }
            } else {
              if (function63(x)) {
                return("function");
              } else {
                if (string63(x)) {
                  return(escape(x));
                } else {
                  if (atom63(x)) {
                    return(tostring(x));
                  } else {
                    var s = "(";
                    var sp = "";
                    var xs = [];
                    var ks = [];
                    var d = (depth || 0) + 1;
                    var _ux106 = x;
                    var k = undefined;
                    for (k in _ux106) {
                      var v = _ux106[k];
                      var _ue143;
                      if (numeric63(k)) {
                        _ue143 = parseInt(k);
                      } else {
                        _ue143 = k;
                      }
                      var _uid1108 = _ue143;
                      if (number63(_uid1108)) {
                        xs[_uid1108] = string(v, d);
                      } else {
                        add(ks, _uid1108 + ":");
                        add(ks, string(v, d));
                      }
                    }
                    var _ux109 = join(xs, ks);
                    var _uignored5 = undefined;
                    for (_uignored5 in _ux109) {
                      var v = _ux109[_uignored5];
                      var _ue144;
                      if (numeric63(_uignored5)) {
                        _ue144 = parseInt(_uignored5);
                      } else {
                        _ue144 = _uignored5;
                      }
                      var _uid1111 = _ue144;
                      s = s + sp + v;
                      sp = " ";
                    }
                    return(s + ")");
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
apply = function (f, args) {
  var _uid1113 = stash(args);
  return(f.apply(f, _uid1113));
};
call = function (f) {
  return(f());
};
_37message_handler = function (msg) {
  var i = search(msg, ": ");
  return(clip(msg, i + 2));
};
toplevel63 = function () {
  return(one63(environment));
};
setenv = function (k) {
  var _ur117 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = cut(_ur117, 0);
  if (string63(k)) {
    var _ue145;
    if (keys.toplevel) {
      _ue145 = hd(environment);
    } else {
      _ue145 = last(environment);
    }
    var frame = _ue145;
    var entry = frame[k] || {};
    var _ux118 = keys;
    var _uid1120 = undefined;
    for (_uid1120 in _ux118) {
      var v = _ux118[_uid1120];
      var _ue146;
      if (numeric63(_uid1120)) {
        _ue146 = parseInt(_uid1120);
      } else {
        _ue146 = _uid1120;
      }
      var _uid1121 = _ue146;
      entry[_uid1121] = v;
    }
    frame[k] = entry;
  }
};
var fs = require("fs");
read_file = function (path) {
  return(fs.readFileSync(path, "utf8"));
};
write_file = function (path, data) {
  return(fs.writeFileSync(path, data, "utf8"));
};
print = function (x) {
  return(console.log(x));
};
write = function (x) {
  return(process.stdout.write(x));
};
exit = function (code) {
  return(process.exit(code));
};
argv = cut(process.argv, 2);
var math = Math;
abs = math.abs;
acos = math.acos;
asin = math.asin;
atan = math.atan;
atan2 = math.atan2;
ceil = math.ceil;
cos = math.cos;
floor = math.floor;
log = math.log;
log10 = math.log10;
max = math.max;
min = math.min;
pow = math.pow;
random = math.random;
sin = math.sin;
sinh = math.sinh;
sqrt = math.sqrt;
tan = math.tan;
tanh = math.tanh;
setenv("quote", {_stash: true, macro: function (form) {
  return(quoted(form));
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (target === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (target === "lua") {
      i = ["+", i, 1];
    }
  }
  return(["get", l, i]);
}});
setenv("wipe", {_stash: true, macro: function (place) {
  if (target === "lua") {
    return(["set", place, "nil"]);
  } else {
    return(["%delete", place]);
  }
}});
setenv("list", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var id = unique("id");
  var l = [];
  var forms = [];
  var _ux32 = body;
  var k = undefined;
  for (k in _ux32) {
    var v = _ux32[k];
    var _ue367;
    if (numeric63(k)) {
      _ue367 = parseInt(k);
    } else {
      _ue367 = k;
    }
    var _uid134 = _ue367;
    if (number63(_uid134)) {
      l[_uid134] = v;
    } else {
      add(forms, ["set", ["get", id, ["quote", _uid134]], v]);
    }
  }
  if (some63(forms)) {
    return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
  } else {
    return(join(["%array"], l));
  }
}});
setenv("if", {_stash: true, macro: function () {
  var branches = unstash(Array.prototype.slice.call(arguments, 0));
  return(hd(expand_if(branches)));
}});
setenv("when", {_stash: true, macro: function (cond) {
  var _ur46 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur46, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _ur53 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur53, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bindings) {
  var _ur73 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur73, 0);
  if (_35(bindings) < 2) {
    return(join(["do"], body));
  } else {
    var renames = [];
    var locals = [];
    var lh = bindings[0];
    var rh = bindings[1];
    var _ux75 = bind(lh, rh);
    var k = undefined;
    for (k in _ux75) {
      var _uid77 = _ux75[k];
      var id = _uid77[0];
      var val = _uid77[1];
      var _ue368;
      if (numeric63(k)) {
        _ue368 = parseInt(k);
      } else {
        _ue368 = k;
      }
      var _uid178 = _ue368;
      if (number63(_uid178)) {
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = unique("id1");
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
      }
    }
    return(join(["do"], join(locals, [["let-symbol", renames, join(["let", cut(bindings, 2)], body)]])));
  }
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _ur88 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur88, 0);
  var _uid89 = ["setenv", ["quote", name]];
  _uid89.macro = join(["fn", args], body);
  var form = _uid89;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _ur96 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur96, 0);
  var _uid97 = ["setenv", ["quote", name]];
  _uid97.special = join(["fn", args], body);
  var form = join(_uid97, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _uid105 = ["setenv", ["quote", name]];
  _uid105.symbol = ["quote", expansion];
  return(_uid105);
}});
setenv("define-reader", {_stash: true, macro: function (_ux115) {
  var char = _ux115[0];
  var s = _ux115[1];
  var _ur114 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur114, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _ur123 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur123, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _ur129 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur129, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _ur140 = unstash(Array.prototype.slice.call(arguments, 0));
  var body = cut(_ur140, 0);
  var scope = _ur140.scope;
  var x = unique("x");
  var _uid143 = ["obj"];
  _uid143._scope = scope;
  return(["do", ["add", "environment", _uid143], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_ux155) {
  var names = _ux155[0];
  var _ur154 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur154, 0);
  var x = unique("x");
  var _uid159 = ["setenv", x];
  _uid159.variable = true;
  var _uid156 = ["with-frame", ["each", ["_uignored1", x], names, _uid159]];
  _uid156.scope = true;
  return(join(_uid156, body));
}});
setenv("let-fn", {_stash: true, macro: function (_ux166) {
  var name = _ux166[0];
  var args = _ux166[1];
  var fn_body = cut(_ux166, 2);
  var _ur165 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur165, 0);
  return(join(["let", [name, join(["fn", args], fn_body)]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _ur175 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur175, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _ux176 = join(["do"], macroexpand(body));
  drop(environment);
  return(_ux176);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _ur186 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur186, 0);
  add(environment, {});
  map(function (_ux189) {
    var name = _ux189[0];
    var exp = _ux189[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _ux187 = join(["do"], macroexpand(body));
  drop(environment);
  return(_ux187);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var _ur198 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur198, 0);
  var bs = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, names);
  return(join(["let", reduce(join, bs)], body));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _ur206 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur206, 0);
  return(join(["%function"], bind42(args, body)));
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = unique("e");
    var x = unique("x");
    var ex = "|" + e + "," + x + "|";
    return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
  }
}});
setenv("each", {_stash: true, macro: function (_ux244, t) {
  var k = _ux244[0];
  var v = _ux244[1];
  var _ur243 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur243, 0);
  var x = unique("x");
  var n = unique("n");
  var _ue369;
  if (target === "lua") {
    _ue369 = body;
  } else {
    _ue369 = [join(["let", [k, ["if", ["numeric?", k], ["parseInt", k], k]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _ue369)]]);
}});
setenv("for", {_stash: true, macro: function (_ux266) {
  var i = _ux266[0];
  var to = _ux266[1];
  var _ur265 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur265, 0);
  return(["let", [i, 0], join(["while", ["<", i, to]], join(body, [["inc", i]]))]);
}});
setenv("across", {_stash: true, macro: function (_ux284) {
  var v = _ux284[0];
  var t = _ux284[1];
  var _ur283 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur283, 0);
  var x = unique("x");
  var n = unique("n");
  var i = unique("i");
  return(["let", [x, t, n, ["#", x]], ["for", [i, n], join(["let", [v, ["at", x, i]]], body)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _ux298 = xs;
  var _uignored2 = undefined;
  for (_uignored2 in _ux298) {
    var x = _ux298[_uignored2];
    var _ue370;
    if (numeric63(_uignored2)) {
      _ue370 = parseInt(_uignored2);
    } else {
      _ue370 = _uignored2;
    }
    var _uid1300 = _ue370;
    l[x] = true;
  }
  return(join(["obj"], l));
}});
setenv("language", {_stash: true, macro: function () {
  return(["quote", target]);
}});
setenv("target", {_stash: true, macro: function () {
  var clauses = unstash(Array.prototype.slice.call(arguments, 0));
  return(clauses[target]);
}});
setenv("join*", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}});
setenv("join!", {_stash: true, macro: function (a) {
  var _ur313 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_ur313, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _ur319 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_ur319, 0);
  return(["set", a, join(["cat", a], bs)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  return(["set", n, ["+", n, by || 1]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  return(["set", n, ["-", n, by || 1]]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var x = unique("x");
  return(["do", ["inc", "indent-level"], ["let", [x, form], ["dec", "indent-level"], x]]);
}});
setenv("export", {_stash: true, macro: function () {
  var names = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, names)));
  } else {
    var x = {};
    var _ux362 = names;
    var _uignored3 = undefined;
    for (_uignored3 in _ux362) {
      var k = _ux362[_uignored3];
      var _ue371;
      if (numeric63(_uignored3)) {
        _ue371 = parseInt(_uignored3);
      } else {
        _ue371 = _uignored3;
      }
      var _uid1364 = _ue371;
      x[k] = k;
    }
    return(["return", join(["obj"], x)]);
  }
}});
var reader = require("reader");
var compiler = require("compiler");
var rep = function (s) {
  var form = reader["read-string"](s);
  var _uid2 = (function () {
    try {
      return([true, compiler.eval(form)]);
    }
    catch (_ue12) {
      return([false, _ue12.message]);
    }
  })();
  var ok = _uid2[0];
  var x = _uid2[1];
  if (!ok) {
    return(print("error: " + x));
  } else {
    if (is63(x)) {
      return(print(string(x)));
    }
  }
};
var repl = function () {
  write("> ");
  var rep1 = function (s) {
    rep(s);
    return(write("> "));
  };
  process.stdin.setEncoding("utf8");
  return(process.stdin.on("data", rep1));
};
var usage = function () {
  print("usage: lumen [options] <object files>");
  print("options:");
  print("  -c <input>\tInput file");
  print("  -o <output>\tOutput file");
  print("  -t <target>\tTarget language (default: lua)");
  print("  -e <expr>\tExpression to evaluate");
  return(exit());
};
var main = function () {
  if (hd(argv) === "-h" || hd(argv) === "--help") {
    usage();
  }
  var pre = [];
  var input = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var n = _35(argv);
  var i = 0;
  while (i < n) {
    var a = argv[i];
    if (a === "-c" || a === "-o" || a === "-t" || a === "-e") {
      if (i === n - 1) {
        print("missing argument for " + a);
      } else {
        i = i + 1;
        var val = argv[i];
        if (a === "-c") {
          input = val;
        } else {
          if (a === "-o") {
            output = val;
          } else {
            if (a === "-t") {
              target1 = val;
            } else {
              if (a === "-e") {
                expr = val;
              }
            }
          }
        }
      }
    } else {
      if (!("-" === char(a, 0))) {
        add(pre, a);
      }
    }
    i = i + 1;
  }
  var _ux9 = pre;
  var _un10 = _35(_ux9);
  var _ui11 = 0;
  while (_ui11 < _un10) {
    var file = _ux9[_ui11];
    compiler["run-file"](file);
    _ui11 = _ui11 + 1;
  }
  if (input && output) {
    if (target1) {
      target = target1;
    }
    var code = compiler["compile-file"](input);
    return(write_file(output, code));
  } else {
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
main();
