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
_43inf = 1 / 0;
_inf = -(1 / 0);
nan63 = function (n) {
  return(!(n === n));
};
inf63 = function (n) {
  return(n === _43inf || n === _inf);
};
clip = function (s, from, upto) {
  return(s.substring(from, upto));
};
cut = function (x, from, upto) {
  var l = [];
  var j = 0;
  var _u130;
  if (nil63(from) || from < 0) {
    _u130 = 0;
  } else {
    _u130 = from;
  }
  var i = _u130;
  var n = _35(x);
  var _u131;
  if (nil63(upto) || upto > n) {
    _u131 = n;
  } else {
    _u131 = upto;
  }
  var _u26 = _u131;
  while (i < _u26) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _u27 = x;
  var k = undefined;
  for (k in _u27) {
    var v = _u27[k];
    var _u132;
    if (numeric63(k)) {
      _u132 = parseInt(k);
    } else {
      _u132 = k;
    }
    var _u29 = _u132;
    if (!number63(_u29)) {
      l[_u29] = v;
    }
  }
  return(l);
};
keys = function (x) {
  var t = [];
  var _u31 = x;
  var k = undefined;
  for (k in _u31) {
    var v = _u31[k];
    var _u133;
    if (numeric63(k)) {
      _u133 = parseInt(k);
    } else {
      _u133 = k;
    }
    var _u33 = _u133;
    if (!number63(_u33)) {
      t[_u33] = v;
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
    var _u47 = a;
    var k = undefined;
    for (k in _u47) {
      var v = _u47[k];
      var _u134;
      if (numeric63(k)) {
        _u134 = parseInt(k);
      } else {
        _u134 = k;
      }
      var _u49 = _u134;
      c[_u49] = v;
    }
    var _u50 = b;
    var k = undefined;
    for (k in _u50) {
      var v = _u50[k];
      var _u135;
      if (numeric63(k)) {
        _u135 = parseInt(k);
      } else {
        _u135 = k;
      }
      var _u52 = _u135;
      if (number63(_u52)) {
        _u52 = _u52 + o;
      }
      c[_u52] = v;
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
  var _u55 = t;
  var _u1 = undefined;
  for (_u1 in _u55) {
    var x = _u55[_u1];
    var _u136;
    if (numeric63(_u1)) {
      _u136 = parseInt(_u1);
    } else {
      _u136 = _u1;
    }
    var _u1 = _u136;
    var _u57 = f(x);
    if (_u57) {
      return(_u57);
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
  var _u137;
  if (f) {
    _u137 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u137));
};
replicate = function (n, x) {
  var l = [];
  var _u2 = 0;
  while (_u2 < n) {
    add(l, x);
    _u2 = _u2 + 1;
  }
  return(l);
};
step = function (f, l) {
  var i = 0;
  while (i < _35(l)) {
    f(l[i]);
    i = i + 1;
  }
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
  var _u68 = x;
  var k = undefined;
  for (k in _u68) {
    var v = _u68[k];
    var _u138;
    if (numeric63(k)) {
      _u138 = parseInt(k);
    } else {
      _u138 = k;
    }
    var _u70 = _u138;
    if (!number63(_u70)) {
      var y = f(v);
      if (is63(y)) {
        t[_u70] = y;
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
  var _u74 = t;
  var k = undefined;
  for (k in _u74) {
    var _u3 = _u74[k];
    var _u139;
    if (numeric63(k)) {
      _u139 = parseInt(k);
    } else {
      _u139 = k;
    }
    var _u76 = _u139;
    if (!number63(_u76)) {
      return(true);
    }
  }
  return(false);
};
empty63 = function (t) {
  var _u78 = t;
  var _u4 = undefined;
  for (_u4 in _u78) {
    var _u5 = _u78[_u4];
    var _u140;
    if (numeric63(_u4)) {
      _u140 = parseInt(_u4);
    } else {
      _u140 = _u4;
    }
    var _u4 = _u140;
    return(false);
  }
  return(true);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _u81 = args;
    var k = undefined;
    for (k in _u81) {
      var v = _u81[k];
      var _u141;
      if (numeric63(k)) {
        _u141 = parseInt(k);
      } else {
        _u141 = k;
      }
      var _u83 = _u141;
      if (!number63(_u83)) {
        p[_u83] = v;
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
      var _u85 = l;
      var k = undefined;
      for (k in _u85) {
        var v = _u85[k];
        var _u142;
        if (numeric63(k)) {
          _u142 = parseInt(k);
        } else {
          _u142 = k;
        }
        var _u87 = _u142;
        if (!(_u87 === "_stash")) {
          args1[_u87] = v;
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
  return(x.toString());
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u143;
    if (c === "\n") {
      _u143 = "\\n";
    } else {
      var _u144;
      if (c === "\"") {
        _u144 = "\\\"";
      } else {
        var _u145;
        if (c === "\\") {
          _u145 = "\\\\";
        } else {
          _u145 = c;
        }
        _u144 = _u145;
      }
      _u143 = _u144;
    }
    var c1 = _u143;
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
        if (x === _43inf) {
          return("+inf");
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
                    var _u107 = x;
                    var k = undefined;
                    for (k in _u107) {
                      var v = _u107[k];
                      var _u146;
                      if (numeric63(k)) {
                        _u146 = parseInt(k);
                      } else {
                        _u146 = k;
                      }
                      var _u109 = _u146;
                      if (number63(_u109)) {
                        xs[_u109] = string(v, d);
                      } else {
                        add(ks, _u109 + ":");
                        add(ks, string(v, d));
                      }
                    }
                    var _u110 = join(xs, ks);
                    var _u6 = undefined;
                    for (_u6 in _u110) {
                      var v = _u110[_u6];
                      var _u147;
                      if (numeric63(_u6)) {
                        _u147 = parseInt(_u6);
                      } else {
                        _u147 = _u6;
                      }
                      var _u6 = _u147;
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
  var _u113 = stash(args);
  return(f.apply(f, _u113));
};
call = function (f) {
  return(f());
};
var _u115 = 0;
unique = function () {
  _u115 = _u115 + 1;
  return("_u" + _u115);
};
unique63 = function (id) {
  return("_u" === clip(id, 0, 2));
};
_37message_handler = function (msg) {
  var i = search(msg, ": ");
  return(clip(msg, i + 2));
};
toplevel63 = function () {
  return(one63(environment));
};
setenv = function (k) {
  var _u120 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = cut(_u120, 0);
  if (string63(k)) {
    var _u148;
    if (keys.toplevel) {
      _u148 = hd(environment);
    } else {
      _u148 = last(environment);
    }
    var frame = _u148;
    var entry = frame[k] || {};
    var _u121 = keys;
    var _u123 = undefined;
    for (_u123 in _u121) {
      var v = _u121[_u123];
      var _u149;
      if (numeric63(_u123)) {
        _u149 = parseInt(_u123);
      } else {
        _u149 = _u123;
      }
      var _u124 = _u149;
      entry[_u124] = v;
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
  var l = [];
  var forms = [];
  var id = unique();
  var _u31 = body;
  var k = undefined;
  for (k in _u31) {
    var v = _u31[k];
    var _u350;
    if (numeric63(k)) {
      _u350 = parseInt(k);
    } else {
      _u350 = k;
    }
    var _u33 = _u350;
    if (number63(_u33)) {
      l[_u33] = v;
    } else {
      add(forms, ["set", ["get", id, ["quote", _u33]], v]);
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
  var _u47 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u47, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _u55 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u55, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bindings) {
  var _u75 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u75, 0);
  if (_35(bindings) < 2) {
    return(join(["do"], body));
  } else {
    var renames = [];
    var locals = [];
    var lh = bindings[0];
    var rh = bindings[1];
    var _u77 = bind(lh, rh);
    var k = undefined;
    for (k in _u77) {
      var _u79 = _u77[k];
      var id = _u79[0];
      var val = _u79[1];
      var _u351;
      if (numeric63(k)) {
        _u351 = parseInt(k);
      } else {
        _u351 = k;
      }
      var _u80 = _u351;
      if (number63(_u80)) {
        if (!unique63(id) && (bound63(id) || reserved63(id) || toplevel63())) {
          var id1 = unique();
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
  var _u91 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u91, 0);
  var _u92 = ["setenv", ["quote", name]];
  _u92.macro = join(["fn", args], body);
  var form = _u92;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _u100 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u100, 0);
  var _u101 = ["setenv", ["quote", name]];
  _u101.special = join(["fn", args], body);
  var form = join(_u101, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _u109 = ["setenv", ["quote", name]];
  _u109.symbol = ["quote", expansion];
  return(_u109);
}});
setenv("define-reader", {_stash: true, macro: function (_u120) {
  var char = _u120[0];
  var s = _u120[1];
  var _u119 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u119, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _u129 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u129, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _u136 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u136, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _u148 = unstash(Array.prototype.slice.call(arguments, 0));
  var body = cut(_u148, 0);
  var scope = _u148.scope;
  var x = unique();
  var _u151 = ["obj"];
  _u151._scope = scope;
  return(["do", ["add", "environment", _u151], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_u164) {
  var names = _u164[0];
  var _u163 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u163, 0);
  var x = unique();
  var _u168 = ["setenv", x];
  _u168.variable = true;
  var _u165 = ["with-frame", ["each", ["_u1", x], names, _u168]];
  _u165.scope = true;
  return(join(_u165, body));
}});
setenv("let-fn", {_stash: true, macro: function (_u176) {
  var name = _u176[0];
  var args = _u176[1];
  var fn_body = cut(_u176, 2);
  var _u175 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u175, 0);
  return(join(["let", [name, join(["fn", args], fn_body)]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _u186 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u186, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _u187 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u187);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _u198 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u198, 0);
  add(environment, {});
  map(function (_u201) {
    var name = _u201[0];
    var exp = _u201[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _u199 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u199);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _u207 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u207, 0);
  return(join(["%function"], bind42(args, body)));
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = unique();
    var x = unique();
    var ex = "|" + e + "," + x + "|";
    return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
  }
}});
setenv("each", {_stash: true, macro: function (_u246, t) {
  var k = _u246[0];
  var v = _u246[1];
  var _u245 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u245, 0);
  var x = unique();
  var n = unique();
  var _u352;
  if (target === "lua") {
    _u352 = body;
  } else {
    _u352 = [join(["let", [k, ["if", ["numeric?", k], ["parseInt", k], k]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u352)]]);
}});
setenv("for", {_stash: true, macro: function (_u269) {
  var i = _u269[0];
  var to = _u269[1];
  var _u268 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u268, 0);
  return(["let", [i, 0], join(["while", ["<", i, to]], join(body, [["inc", i]]))]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _u280 = xs;
  var _u2 = undefined;
  for (_u2 in _u280) {
    var x = _u280[_u2];
    var _u353;
    if (numeric63(_u2)) {
      _u353 = parseInt(_u2);
    } else {
      _u353 = _u2;
    }
    var _u2 = _u353;
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
  var _u297 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_u297, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _u304 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_u304, 0);
  return(["set", a, join(["cat", a], bs)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  return(["set", n, ["+", n, by || 1]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  return(["set", n, ["-", n, by || 1]]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var result = unique();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
setenv("export", {_stash: true, macro: function () {
  var names = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, names)));
  } else {
    var x = {};
    var _u346 = names;
    var _u3 = undefined;
    for (_u3 in _u346) {
      var k = _u346[_u3];
      var _u354;
      if (numeric63(_u3)) {
        _u354 = parseInt(_u3);
      } else {
        _u354 = _u3;
      }
      var _u3 = _u354;
      x[k] = k;
    }
    return(["return", join(["obj"], x)]);
  }
}});
var reader = require("reader");
var compiler = require("compiler");
var rep = function (s) {
  var form = reader["read-string"](s);
  var _u2 = (function () {
    try {
      return([true, compiler.eval(form)]);
    }
    catch (_u9) {
      return([false, _u9.message]);
    }
  })();
  var ok = _u2[0];
  var x = _u2[1];
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
  step(compiler["run-file"], pre);
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
