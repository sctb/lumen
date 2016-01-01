environment = [{}];
target = "js";
toplevel63 = function () {
  return(one63(environment));
};
setenv = function (k) {
  var _r1 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id = _r1;
  var keys = cut(_id, 0);
  if (string63(k)) {
    var _e;
    if (keys.toplevel) {
      _e = hd(environment);
    } else {
      _e = last(environment);
    }
    var frame = _e;
    var entry = frame[k] || {};
    var _o = keys;
    var _k = undefined;
    for (_k in _o) {
      var v = _o[_k];
      var _e1;
      if (numeric63(_k)) {
        _e1 = parseInt(_k);
      } else {
        _e1 = _k;
      }
      var _k1 = _e1;
      entry[_k1] = v;
    }
    frame[k] = entry;
    return(frame[k]);
  }
};
nil63 = function (x) {
  return(x === undefined || x === null);
};
is63 = function (x) {
  return(! nil63(x));
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
two63 = function (x) {
  return(_35(x) === 2);
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
atom63 = function (x) {
  return(nil63(x) || string63(x) || number63(x) || boolean63(x));
};
nan = 0 / 0;
inf = 1 / 0;
nan63 = function (n) {
  return(!( n === n));
};
inf63 = function (n) {
  return(n === inf || n === -inf);
};
clip = function (s, from, upto) {
  return(s.substring(from, upto));
};
cut = function (x, from, upto) {
  var l = [];
  var j = 0;
  var _e2;
  if (nil63(from) || from < 0) {
    _e2 = 0;
  } else {
    _e2 = from;
  }
  var i = _e2;
  var n = _35(x);
  var _e3;
  if (nil63(upto) || upto > n) {
    _e3 = n;
  } else {
    _e3 = upto;
  }
  var _upto = _e3;
  while (i < _upto) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _o1 = x;
  var k = undefined;
  for (k in _o1) {
    var v = _o1[k];
    var _e4;
    if (numeric63(k)) {
      _e4 = parseInt(k);
    } else {
      _e4 = k;
    }
    var _k2 = _e4;
    if (! number63(_k2)) {
      l[_k2] = v;
    }
  }
  return(l);
};
empty63 = function (t) {
  var _o2 = t;
  var _i2 = undefined;
  for (_i2 in _o2) {
    var x = _o2[_i2];
    var _e5;
    if (numeric63(_i2)) {
      _e5 = parseInt(_i2);
    } else {
      _e5 = _i2;
    }
    var __i2 = _e5;
    return(false);
  }
  return(true);
};
keys63 = function (t) {
  var _o3 = t;
  var k = undefined;
  for (k in _o3) {
    var v = _o3[k];
    var _e6;
    if (numeric63(k)) {
      _e6 = parseInt(k);
    } else {
      _e6 = k;
    }
    var _k3 = _e6;
    if (! number63(_k3)) {
      return(true);
    }
  }
  return(false);
};
keys = function (x) {
  var t = [];
  var _o4 = x;
  var k = undefined;
  for (k in _o4) {
    var v = _o4[k];
    var _e7;
    if (numeric63(k)) {
      _e7 = parseInt(k);
    } else {
      _e7 = k;
    }
    var _k4 = _e7;
    if (! number63(_k4)) {
      t[_k4] = v;
    }
  }
  return(t);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _o5 = args;
    var k = undefined;
    for (k in _o5) {
      var v = _o5[k];
      var _e8;
      if (numeric63(k)) {
        _e8 = parseInt(k);
      } else {
        _e8 = k;
      }
      var _k5 = _e8;
      if (! number63(_k5)) {
        p[_k5] = v;
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
    if (! atom63(l) && l._stash) {
      var args1 = almost(args);
      var _o6 = l;
      var k = undefined;
      for (k in _o6) {
        var v = _o6[k];
        var _e9;
        if (numeric63(k)) {
          _e9 = parseInt(k);
        } else {
          _e9 = k;
        }
        var _k6 = _e9;
        if (!( _k6 === "_stash")) {
          args1[_k6] = v;
        }
      }
      return(args1);
    } else {
      return(args);
    }
  }
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
number = function (s) {
  var n = parseFloat(s);
  if (! isNaN(n)) {
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
    if (! number_code63(code(s, i))) {
      return(false);
    }
    i = i + 1;
  }
  return(true);
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
almost = function (l) {
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
reduce = function (f, x, y) {
  if (none63(x)) {
    if (is63(y)) {
      return(y);
    } else {
      return(x);
    }
  } else {
    var a = hd(x);
    var _x1 = tl(x);
    var _n7 = _35(_x1);
    var _i7 = 0;
    while (_i7 < _n7) {
      var b = _x1[_i7];
      a = f(a, b);
      _i7 = _i7 + 1;
    }
    return(a);
  }
};
setenv("reducing", {_stash: true, macro: function (f, x, y) {
  return(["reduce", ["fn", ["a", "b"], [f, "a", "b"]], x, y]);
}});
join = function () {
  var ls = unstash(Array.prototype.slice.call(arguments, 0));
  if (two63(ls)) {
    var _id1 = ls;
    var a = _id1[0];
    var b = _id1[1];
    if (a && b) {
      var c = [];
      var o = _35(a);
      var _o7 = a;
      var k = undefined;
      for (k in _o7) {
        var v = _o7[k];
        var _e10;
        if (numeric63(k)) {
          _e10 = parseInt(k);
        } else {
          _e10 = k;
        }
        var _k7 = _e10;
        c[_k7] = v;
      }
      var _o8 = b;
      var k = undefined;
      for (k in _o8) {
        var v = _o8[k];
        var _e11;
        if (numeric63(k)) {
          _e11 = parseInt(k);
        } else {
          _e11 = k;
        }
        var _k8 = _e11;
        if (number63(_k8)) {
          _k8 = _k8 + o;
        }
        c[_k8] = v;
      }
      return(c);
    } else {
      return(a || b || []);
    }
  } else {
    return(reduce(join, ls));
  }
};
find = function (f, t) {
  var _o9 = t;
  var _i10 = undefined;
  for (_i10 in _o9) {
    var x = _o9[_i10];
    var _e12;
    if (numeric63(_i10)) {
      _e12 = parseInt(_i10);
    } else {
      _e12 = _i10;
    }
    var __i10 = _e12;
    var y = f(x);
    if (y) {
      return(y);
    }
  }
};
first = function (f, l) {
  var _x10 = l;
  var _n11 = _35(_x10);
  var _i11 = 0;
  while (_i11 < _n11) {
    var x = _x10[_i11];
    var y = f(x);
    if (y) {
      return(y);
    }
    _i11 = _i11 + 1;
  }
};
in63 = function (x, t) {
  return(find(function (y) {
    return(x === y);
  }, t));
};
pair = function (l) {
  var l1 = [];
  var i = 0;
  while (i < _35(l)) {
    add(l1, [l[i], l[i + 1]]);
    i = i + 1;
    i = i + 1;
  }
  return(l1);
};
sort = function (l, f) {
  var _e13;
  if (f) {
    _e13 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_e13));
};
map = function (f, x) {
  var t = [];
  var _o10 = x;
  var k = undefined;
  for (k in _o10) {
    var v = _o10[k];
    var _e14;
    if (numeric63(k)) {
      _e14 = parseInt(k);
    } else {
      _e14 = k;
    }
    var _k9 = _e14;
    var y = f(v);
    if (is63(y)) {
      if (number63(_k9)) {
        add(t, y);
      } else {
        t[_k9] = y;
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
  return(reduce(function (a, b) {
    return(a + b);
  }, xs, ""));
};
_43 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a + b);
  }, xs, 0));
};
_ = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a - b);
  }, xs, 0));
};
_42 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a * b);
  }, xs, 1));
};
_47 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a / b);
  }, xs, 1));
};
_37 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a % b);
  }, xs, 1));
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
var tostring = function (x) {
  return(x.toString());
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _e15;
    if (c === "\n") {
      _e15 = "\\n";
    } else {
      var _e16;
      if (c === "\"") {
        _e16 = "\\\"";
      } else {
        var _e17;
        if (c === "\\") {
          _e17 = "\\\\";
        } else {
          _e17 = c;
        }
        _e16 = _e17;
      }
      _e15 = _e16;
    }
    var c1 = _e15;
    s1 = s1 + c1;
    i = i + 1;
  }
  return(s1 + "\"");
};
str = function (x, depth) {
  if (depth && depth > 40) {
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
          if (x === -inf) {
            return("-inf");
          } else {
            if (boolean63(x)) {
              if (x) {
                return("true");
              } else {
                return("false");
              }
            } else {
              if (string63(x)) {
                return(escape(x));
              } else {
                if (atom63(x)) {
                  return(tostring(x));
                } else {
                  if (function63(x)) {
                    return("function");
                  } else {
                    var s = "(";
                    var sp = "";
                    var xs = [];
                    var ks = [];
                    var d = (depth || 0) + 1;
                    var _o11 = x;
                    var k = undefined;
                    for (k in _o11) {
                      var v = _o11[k];
                      var _e18;
                      if (numeric63(k)) {
                        _e18 = parseInt(k);
                      } else {
                        _e18 = k;
                      }
                      var _k10 = _e18;
                      if (number63(_k10)) {
                        xs[_k10] = str(v, d);
                      } else {
                        add(ks, _k10 + ":");
                        add(ks, str(v, d));
                      }
                    }
                    var _o12 = join(xs, ks);
                    var _i14 = undefined;
                    for (_i14 in _o12) {
                      var v = _o12[_i14];
                      var _e19;
                      if (numeric63(_i14)) {
                        _e19 = parseInt(_i14);
                      } else {
                        _e19 = _i14;
                      }
                      var __i14 = _e19;
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
  var _args = stash(args);
  return(f.apply(f, _args));
};
call = function (f) {
  return(f());
};
print = function (x) {
  return(console.log(x));
};
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
  var x = unique("x");
  var l = [];
  var forms = [];
  var _o1 = body;
  var k = undefined;
  for (k in _o1) {
    var v = _o1[k];
    var _e3;
    if (numeric63(k)) {
      _e3 = parseInt(k);
    } else {
      _e3 = k;
    }
    var _k = _e3;
    if (number63(_k)) {
      l[_k] = v;
    } else {
      add(forms, ["set", ["get", x, ["quote", _k]], v]);
    }
  }
  if (some63(forms)) {
    return(join(["let", x, join(["%array"], l)], forms, [x]));
  } else {
    return(join(["%array"], l));
  }
}});
setenv("if", {_stash: true, macro: function () {
  var branches = unstash(Array.prototype.slice.call(arguments, 0));
  return(hd(expand_if(branches)));
}});
setenv("case", {_stash: true, macro: function (x) {
  var _r10 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id2 = _r10;
  var clauses = cut(_id2, 0);
  var bs = map(function (_x31) {
    var _id3 = _x31;
    var a = _id3[0];
    var b = _id3[1];
    if (nil63(b)) {
      return([a]);
    } else {
      return([["=", ["quote", a], x], b]);
    }
  }, pair(clauses));
  return(join(["if"], apply(join, bs)));
}});
setenv("when", {_stash: true, macro: function (cond) {
  var _r13 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id5 = _r13;
  var body = cut(_id5, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _r15 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id7 = _r15;
  var body = cut(_id7, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var _r19 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id11 = _r19;
  var body = cut(_id11, 0);
  if (atom63(bs)) {
    return(join(["let", [bs, hd(body)]], tl(body)));
  } else {
    if (none63(bs)) {
      return(join(["do"], body));
    } else {
      var _id12 = bs;
      var lh = _id12[0];
      var rh = _id12[1];
      var bs2 = cut(_id12, 2);
      var _id13 = bind(lh, rh);
      var id = _id13[0];
      var val = _id13[1];
      var bs1 = cut(_id13, 2);
      var renames = [];
      if (bound63(id) || toplevel63()) {
        var id1 = unique(id);
        renames = [id, id1];
        id = id1;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      return(["do", ["%local", id, val], ["let-symbol", renames, join(["let", join(bs1, bs2)], body)]]);
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var _r21 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id15 = _r21;
  var body = cut(_id15, 0);
  return(join(["let", [x, v]], body, [x]));
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var _r23 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id17 = _r23;
  var body = cut(_id17, 0);
  var y = unique("y");
  return(["let", y, v, ["when", y, join(["let", [x, y]], body)]]);
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _r25 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id19 = _r25;
  var body = cut(_id19, 0);
  var _x89 = ["setenv", ["quote", name]];
  _x89.macro = join(["fn", args], body);
  var form = _x89;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _r27 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id21 = _r27;
  var body = cut(_id21, 0);
  var _x96 = ["setenv", ["quote", name]];
  _x96.special = join(["fn", args], body);
  var form = join(_x96, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _x102 = ["setenv", ["quote", name]];
  _x102.symbol = ["quote", expansion];
  return(_x102);
}});
setenv("define-reader", {_stash: true, macro: function (_x111) {
  var _id24 = _x111;
  var char = _id24[0];
  var s = _id24[1];
  var _r31 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id25 = _r31;
  var body = cut(_id25, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _r33 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id27 = _r33;
  var body = cut(_id27, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _r35 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id29 = _r35;
  var body = cut(_id29, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var x = unique("x");
  return(["do", ["add", "environment", ["obj"]], ["with", x, join(["do"], body), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_x144) {
  var _id32 = _x144;
  var names = _id32[0];
  var _r37 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id33 = _r37;
  var body = cut(_id33, 0);
  var x = unique("x");
  var _x147 = ["setenv", x];
  _x147.variable = true;
  return(join(["with-frame", ["each", x, names, _x147]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _r40 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id35 = _r40;
  var body = cut(_id35, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _x152 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x152);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _r44 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id38 = _r44;
  var body = cut(_id38, 0);
  add(environment, {});
  map(function (_x161) {
    var _id39 = _x161;
    var name = _id39[0];
    var exp = _id39[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _x160 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x160);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var _r48 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id41 = _r48;
  var body = cut(_id41, 0);
  var bs = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, names);
  return(join(["let", apply(join, bs)], body));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _r51 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id43 = _r51;
  var body = cut(_id43, 0);
  return(join(["%function"], bind42(args, body)));
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", join(), ["%try", ["list", true, expr]]]]);
  } else {
    var x = unique("x");
    var msg = unique("msg");
    var trace = unique("trace");
    return(["let", [x, "nil", msg, "nil", trace, "nil"], ["if", ["xpcall", ["fn", join(), ["set", x, expr]], ["fn", ["m"], ["set", msg, ["clip", "m", ["+", ["search", "m", "\": \""], 2]]], ["set", trace, [["get", "debug", ["quote", "traceback"]]]]]], ["list", true, x], ["list", false, msg, trace]]]);
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var _r55 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id46 = _r55;
  var body = cut(_id46, 0);
  var o = unique("o");
  var n = unique("n");
  var i = unique("i");
  var _e4;
  if (atom63(x)) {
    _e4 = [i, x];
  } else {
    var _e5;
    if (_35(x) > 1) {
      _e5 = x;
    } else {
      _e5 = [i, hd(x)];
    }
    _e4 = _e5;
  }
  var _id47 = _e4;
  var k = _id47[0];
  var v = _id47[1];
  var _e6;
  if (target === "lua") {
    _e6 = body;
  } else {
    _e6 = [join(["let", k, ["if", ["numeric?", k], ["parseInt", k], k]], body)];
  }
  return(["let", [o, t, k, "nil"], ["%for", o, k, join(["let", [v, ["get", o, k]]], _e6)]]);
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var _r57 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id49 = _r57;
  var body = cut(_id49, 0);
  return(["let", i, 0, join(["while", ["<", i, to]], body, [["inc", i]])]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var _r59 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id51 = _r59;
  var body = cut(_id51, 0);
  var x = unique("x");
  var n = unique("n");
  var i = unique("i");
  return(["let", [x, t, n, ["#", x]], ["for", i, n, join(["let", [v, ["at", x, i]]], body)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _o3 = xs;
  var _i3 = undefined;
  for (_i3 in _o3) {
    var x = _o3[_i3];
    var _e7;
    if (numeric63(_i3)) {
      _e7 = parseInt(_i3);
    } else {
      _e7 = _i3;
    }
    var __i3 = _e7;
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
setenv("join!", {_stash: true, macro: function (a) {
  var _r63 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id53 = _r63;
  var bs = cut(_id53, 0);
  return(["set", a, join(["join", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _r65 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id55 = _r65;
  var bs = cut(_id55, 0);
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
  return(["do", ["inc", "indent-level"], ["with", x, form, ["dec", "indent-level"]]]);
}});
setenv("export", {_stash: true, macro: function () {
  var names = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, names)));
  } else {
    var x = {};
    var _o5 = names;
    var _i5 = undefined;
    for (_i5 in _o5) {
      var k = _o5[_i5];
      var _e8;
      if (numeric63(_i5)) {
        _e8 = parseInt(_i5);
      } else {
        _e8 = _i5;
      }
      var __i5 = _e8;
      x[k] = k;
    }
    return(["return", join(["obj"], x)]);
  }
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
var eval_print = function (form) {
  var _id = (function () {
    try {
      return([true, compiler.eval(form)]);
    }
    catch (_e) {
      return([false, _e.message, _e.stack]);
    }
  })();
  var ok = _id[0];
  var x = _id[1];
  var trace = _id[2];
  if (! ok) {
    return(print(trace));
  } else {
    if (is63(x)) {
      return(print(str(x)));
    }
  }
};
var rep = function (s) {
  return(eval_print(reader["read-string"](s)));
};
var repl = function () {
  var buf = "";
  var rep1 = function (s) {
    buf = buf + s;
    var more = [];
    var form = reader["read-string"](buf, more);
    if (!( form === more)) {
      eval_print(form);
      buf = "";
      return(system.write("> "));
    }
  };
  system.write("> ");
  var _in = process.stdin;
  _in.setEncoding("utf8");
  return(_in.on("data", rep1));
};
compile_file = function (path) {
  var s = reader.stream(system["read-file"](path));
  var body = reader["read-all"](s);
  var form = compiler.expand(join(["do"], body));
  return(compiler.compile(form, {_stash: true, stmt: true}));
};
load = function (path) {
  return(compiler.run(compile_file(path)));
};
var run_file = function (path) {
  return(compiler.run(system["read-file"](path)));
};
var usage = function () {
  print("usage: lumen [options] <object files>");
  print("options:");
  print("  -c <input>\tCompile input file");
  print("  -o <output>\tOutput file");
  print("  -t <target>\tTarget language (default: lua)");
  print("  -e <expr>\tExpression to evaluate");
  return(system.exit());
};
var main = function () {
  var arg = hd(system.argv);
  if (arg === "-h" || arg === "--help") {
    usage();
  }
  var pre = [];
  var input = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var argv = system.argv;
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
      if (!( "-" === char(a, 0))) {
        add(pre, a);
      }
    }
    i = i + 1;
  }
  var _x2 = pre;
  var _n = _35(_x2);
  var _i = 0;
  while (_i < _n) {
    var file = _x2[_i];
    run_file(file);
    _i = _i + 1;
  }
  if (nil63(input)) {
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  } else {
    if (target1) {
      target = target1;
    }
    var code = compile_file(input);
    if (nil63(output) || output === "-") {
      return(print(code));
    } else {
      return(system["write-file"](output, code));
    }
  }
};
main();
