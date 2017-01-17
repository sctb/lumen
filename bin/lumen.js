environment = [{}];
target = "js";
nil63 = function (x) {
  return(x === undefined || x === null);
};
is63 = function (x) {
  return(! nil63(x));
};
false63 = function (x) {
  return(nil63(x) || x === false);
};
true63 = function (x) {
  return(! false63(x));
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
obj63 = function (x) {
  return(is63(x) && type(x) === "object");
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
  var _e;
  if (nil63(from) || from < 0) {
    _e = 0;
  } else {
    _e = from;
  }
  var i = _e;
  var n = _35(x);
  var _e1;
  if (nil63(upto) || upto > n) {
    _e1 = n;
  } else {
    _e1 = upto;
  }
  var _upto = _e1;
  while (i < _upto) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _o = x;
  var k = undefined;
  for (k in _o) {
    var v = _o[k];
    var _e2;
    if (numeric63(k)) {
      _e2 = parseInt(k);
    } else {
      _e2 = k;
    }
    var _k = _e2;
    if (! number63(_k)) {
      l[_k] = v;
    }
  }
  return(l);
};
keys = function (x) {
  var t = [];
  var _o1 = x;
  var k = undefined;
  for (k in _o1) {
    var v = _o1[k];
    var _e3;
    if (numeric63(k)) {
      _e3 = parseInt(k);
    } else {
      _e3 = k;
    }
    var _k1 = _e3;
    if (! number63(_k1)) {
      t[_k1] = v;
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
reduce = function (f, x) {
  if (none63(x)) {
    return(undefined);
  } else {
    if (one63(x)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
};
join = function () {
  var ls = unstash(Array.prototype.slice.call(arguments, 0));
  var r = [];
  var _x1 = ls;
  var _n2 = _35(_x1);
  var _i2 = 0;
  while (_i2 < _n2) {
    var l = _x1[_i2];
    if (l) {
      var n = _35(r);
      var _o2 = l;
      var k = undefined;
      for (k in _o2) {
        var v = _o2[k];
        var _e4;
        if (numeric63(k)) {
          _e4 = parseInt(k);
        } else {
          _e4 = k;
        }
        var _k2 = _e4;
        if (number63(_k2)) {
          _k2 = _k2 + n;
        }
        r[_k2] = v;
      }
    }
    _i2 = _i2 + 1;
  }
  return(r);
};
find = function (f, t) {
  var _o3 = t;
  var _i4 = undefined;
  for (_i4 in _o3) {
    var x = _o3[_i4];
    var _e5;
    if (numeric63(_i4)) {
      _e5 = parseInt(_i4);
    } else {
      _e5 = _i4;
    }
    var __i4 = _e5;
    var y = f(x);
    if (y) {
      return(y);
    }
  }
};
first = function (f, l) {
  var _x2 = l;
  var _n5 = _35(_x2);
  var _i5 = 0;
  while (_i5 < _n5) {
    var x = _x2[_i5];
    var y = f(x);
    if (y) {
      return(y);
    }
    _i5 = _i5 + 1;
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
  var _e6;
  if (f) {
    _e6 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_e6));
};
map = function (f, x) {
  var t = [];
  var _x4 = x;
  var _n6 = _35(_x4);
  var _i6 = 0;
  while (_i6 < _n6) {
    var v = _x4[_i6];
    var y = f(v);
    if (is63(y)) {
      add(t, y);
    }
    _i6 = _i6 + 1;
  }
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
    var _k3 = _e7;
    if (! number63(_k3)) {
      var y = f(v);
      if (is63(y)) {
        t[_k3] = y;
      }
    }
  }
  return(t);
};
keep = function (f, x) {
  return(map(function (v) {
    if (true63(f(v))) {
      return(v);
    }
  }, x));
};
keys63 = function (t) {
  var _o5 = t;
  var k = undefined;
  for (k in _o5) {
    var v = _o5[k];
    var _e8;
    if (numeric63(k)) {
      _e8 = parseInt(k);
    } else {
      _e8 = k;
    }
    var _k4 = _e8;
    if (! number63(_k4)) {
      return(true);
    }
  }
  return(false);
};
empty63 = function (t) {
  var _o6 = t;
  var _i9 = undefined;
  for (_i9 in _o6) {
    var x = _o6[_i9];
    var _e9;
    if (numeric63(_i9)) {
      _e9 = parseInt(_i9);
    } else {
      _e9 = _i9;
    }
    var __i9 = _e9;
    return(false);
  }
  return(true);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _o7 = args;
    var k = undefined;
    for (k in _o7) {
      var v = _o7[k];
      var _e10;
      if (numeric63(k)) {
        _e10 = parseInt(k);
      } else {
        _e10 = k;
      }
      var _k5 = _e10;
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
    if (obj63(l) && l._stash) {
      var args1 = almost(args);
      var _o8 = l;
      var k = undefined;
      for (k in _o8) {
        var v = _o8[k];
        var _e11;
        if (numeric63(k)) {
          _e11 = parseInt(k);
        } else {
          _e11 = k;
        }
        var _k6 = _e11;
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
destash33 = function (l, args1) {
  if (obj63(l) && l._stash) {
    var _o9 = l;
    var k = undefined;
    for (k in _o9) {
      var v = _o9[k];
      var _e12;
      if (numeric63(k)) {
        _e12 = parseInt(k);
      } else {
        _e12 = k;
      }
      var _k7 = _e12;
      if (!( _k7 === "_stash")) {
        args1[_k7] = v;
      }
    }
  } else {
    return(l);
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
  return(reduce(function (a, b) {
    return(a + b);
  }, xs) || "");
};
_43 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a + b);
  }, xs) || 0);
};
_ = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a - b);
  }, reverse(xs)) || 0);
};
_42 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a * b);
  }, xs) || 1);
};
_47 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a / b);
  }, reverse(xs)) || 1);
};
_37 = function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a % b);
  }, reverse(xs)) || 0);
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
var tostring = function (x) {
  return(x.toString());
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _e13;
    if (c === "\n") {
      _e13 = "\\n";
    } else {
      var _e14;
      if (c === "\"") {
        _e14 = "\\\"";
      } else {
        var _e15;
        if (c === "\\") {
          _e15 = "\\\\";
        } else {
          _e15 = c;
        }
        _e14 = _e15;
      }
      _e13 = _e14;
    }
    var c1 = _e13;
    s1 = s1 + c1;
    i = i + 1;
  }
  return(s1 + "\"");
};
str = function (x, stack) {
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
                  if (stack && in63(x, stack)) {
                    return("circular");
                  } else {
                    if (false) {
                      return(escape(tostring(x)));
                    } else {
                      var s = "(";
                      var sp = "";
                      var xs = [];
                      var ks = [];
                      var l = stack || [];
                      add(l, x);
                      var _o10 = x;
                      var k = undefined;
                      for (k in _o10) {
                        var v = _o10[k];
                        var _e16;
                        if (numeric63(k)) {
                          _e16 = parseInt(k);
                        } else {
                          _e16 = k;
                        }
                        var _k8 = _e16;
                        if (number63(_k8)) {
                          xs[_k8] = str(v, l);
                        } else {
                          add(ks, _k8 + ":");
                          add(ks, str(v, l));
                        }
                      }
                      drop(l);
                      var _o11 = join(xs, ks);
                      var _i14 = undefined;
                      for (_i14 in _o11) {
                        var v = _o11[_i14];
                        var _e17;
                        if (numeric63(_i14)) {
                          _e17 = parseInt(_i14);
                        } else {
                          _e17 = _i14;
                        }
                        var __i14 = _e17;
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
  }
};
apply = function (f, args) {
  var _args = stash(args);
  return(f.apply(f, _args));
};
call = function (f) {
  return(f());
};
toplevel63 = function () {
  return(one63(environment));
};
setenv = function (k) {
  var _r72 = unstash(Array.prototype.slice.call(arguments, 1));
  var _k9 = destash33(k, _r72);
  var _id = _r72;
  var _keys = cut(_id, 0);
  if (string63(_k9)) {
    var _e18;
    if (_keys.toplevel) {
      _e18 = hd(environment);
    } else {
      _e18 = last(environment);
    }
    var frame = _e18;
    var entry = frame[_k9] || {};
    var _o12 = _keys;
    var _k10 = undefined;
    for (_k10 in _o12) {
      var v = _o12[_k10];
      var _e19;
      if (numeric63(_k10)) {
        _e19 = parseInt(_k10);
      } else {
        _e19 = _k10;
      }
      var _k11 = _e19;
      entry[_k11] = v;
    }
    frame[_k9] = entry;
    return(frame[_k9]);
  }
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
trunc = math.floor;
setenv("quote", {_stash: true, macro: function (form) {
  return(quoted(form));
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("set", {_stash: true, macro: function () {
  var args = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["do"], map(function (_x5) {
    var _id1 = _x5;
    var lh = _id1[0];
    var rh = _id1[1];
    return(["%set", lh, rh]);
  }, pair(args))));
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
    var _e5;
    if (numeric63(k)) {
      _e5 = parseInt(k);
    } else {
      _e5 = k;
    }
    var _k = _e5;
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
setenv("case", {_stash: true, macro: function (expr) {
  var _r13 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expr1 = destash33(expr, _r13);
  var _id4 = _r13;
  var clauses = cut(_id4, 0);
  var x = unique("x");
  var eq = function (_) {
    return(["=", ["quote", _], x]);
  };
  var cl = function (_x44) {
    var _id5 = _x44;
    var a = _id5[0];
    var b = _id5[1];
    if (nil63(b)) {
      return([a]);
    } else {
      if (string63(a) || number63(a)) {
        return([eq(a), b]);
      } else {
        if (one63(a)) {
          return([eq(hd(a)), b]);
        } else {
          if (_35(a) > 1) {
            return([join(["or"], map(eq, a)), b]);
          }
        }
      }
    }
  };
  return(["let", x, _expr1, join(["if"], apply(join, map(cl, pair(clauses))))]);
}});
setenv("when", {_stash: true, macro: function (cond) {
  var _r17 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond1 = destash33(cond, _r17);
  var _id7 = _r17;
  var body = cut(_id7, 0);
  return(["if", _cond1, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _r19 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond3 = destash33(cond, _r19);
  var _id9 = _r19;
  var body = cut(_id9, 0);
  return(["if", ["not", _cond3], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var _r23 = unstash(Array.prototype.slice.call(arguments, 1));
  var _bs1 = destash33(bs, _r23);
  var _id13 = _r23;
  var body = cut(_id13, 0);
  if (atom63(_bs1)) {
    return(join(["let", [_bs1, hd(body)]], tl(body)));
  } else {
    if (none63(_bs1)) {
      return(join(["do"], body));
    } else {
      var _id14 = _bs1;
      var lh = _id14[0];
      var rh = _id14[1];
      var bs2 = cut(_id14, 2);
      var _id15 = bind(lh, rh);
      var id = _id15[0];
      var val = _id15[1];
      var bs1 = cut(_id15, 2);
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
  var _r25 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x89 = destash33(x, _r25);
  var _v1 = destash33(v, _r25);
  var _id17 = _r25;
  var body = cut(_id17, 0);
  return(join(["let", [_x89, _v1]], body, [_x89]));
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var _r27 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x100 = destash33(x, _r27);
  var _v3 = destash33(v, _r27);
  var _id19 = _r27;
  var body = cut(_id19, 0);
  var y = unique("y");
  return(["let", y, _v3, ["when", ["true?", y], join(["let", [_x100, y]], body)]]);
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _r29 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name1 = destash33(name, _r29);
  var _args1 = destash33(args, _r29);
  var _id21 = _r29;
  var body = cut(_id21, 0);
  var _x110 = ["setenv", ["quote", _name1]];
  _x110.macro = join(["fn", _args1], body);
  var form = _x110;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _r31 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name3 = destash33(name, _r31);
  var _args3 = destash33(args, _r31);
  var _id23 = _r31;
  var body = cut(_id23, 0);
  var _x117 = ["setenv", ["quote", _name3]];
  _x117.special = join(["fn", _args3], body);
  var form = join(_x117, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _x123 = ["setenv", ["quote", name]];
  _x123.symbol = ["quote", expansion];
  return(_x123);
}});
setenv("define-reader", {_stash: true, macro: function (_x132) {
  var _id26 = _x132;
  var char = _id26[0];
  var s = _id26[1];
  var _r35 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x132 = destash33(_x132, _r35);
  var _id27 = _r35;
  var body = cut(_id27, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _r37 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name5 = destash33(name, _r37);
  var _x141 = destash33(x, _r37);
  var _id29 = _r37;
  var body = cut(_id29, 0);
  setenv(_name5, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", _name5], bind42(_x141, body)));
  } else {
    return(["%local", _name5, _x141]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _r39 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name7 = destash33(name, _r39);
  var _x148 = destash33(x, _r39);
  var _id31 = _r39;
  var body = cut(_id31, 0);
  setenv(_name7, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", _name7], bind42(_x148, body)));
  } else {
    return(["set", _name7, _x148]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var x = unique("x");
  return(["do", ["add", "environment", ["obj"]], ["with", x, join(["do"], body), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_x169) {
  var _id34 = _x169;
  var names = _id34[0];
  var _r41 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x169 = destash33(_x169, _r41);
  var _id35 = _r41;
  var body = cut(_id35, 0);
  var x = unique("x");
  var _x172 = ["setenv", x];
  _x172.variable = true;
  return(join(["with-frame", ["each", x, names, _x172]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _r44 = unstash(Array.prototype.slice.call(arguments, 1));
  var _definitions1 = destash33(definitions, _r44);
  var _id37 = _r44;
  var body = cut(_id37, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, _definitions1);
  var _x177 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x177);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _r48 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expansions1 = destash33(expansions, _r48);
  var _id40 = _r48;
  var body = cut(_id40, 0);
  add(environment, {});
  map(function (_x186) {
    var _id41 = _x186;
    var name = _id41[0];
    var exp = _id41[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(_expansions1));
  var _x185 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x185);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var _r52 = unstash(Array.prototype.slice.call(arguments, 1));
  var _names1 = destash33(names, _r52);
  var _id43 = _r52;
  var body = cut(_id43, 0);
  var bs = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, _names1);
  return(join(["let", apply(join, bs)], body));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _r55 = unstash(Array.prototype.slice.call(arguments, 1));
  var _args5 = destash33(args, _r55);
  var _id45 = _r55;
  var body = cut(_id45, 0);
  return(join(["%function"], bind42(_args5, body)));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var _r57 = unstash(Array.prototype.slice.call(arguments, 1));
  var _f1 = destash33(f, _r57);
  var _id47 = _r57;
  var args = cut(_id47, 0);
  if (_35(args) > 1) {
    return([["do", "apply"], _f1, ["join", join(["list"], almost(args)), last(args)]]);
  } else {
    return(join([["do", "apply"], _f1], args));
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", join(), ["%try", ["list", true, expr]]]]);
  } else {
    var x = unique("x");
    var msg = unique("msg");
    var trace = unique("trace");
    var _x257 = ["obj"];
    _x257.message = msg;
    _x257.stack = trace;
    return(["let", [x, "nil", msg, "nil", trace, "nil"], ["if", ["xpcall", ["fn", join(), ["set", x, expr]], ["fn", ["m"], ["set", msg, ["clip", "m", ["+", ["search", "m", "\": \""], 2]], trace, [["get", "debug", ["quote", "traceback"]]]]]], ["list", true, x], ["list", false, _x257]]]);
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var _r61 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x273 = destash33(x, _r61);
  var _t1 = destash33(t, _r61);
  var _id50 = _r61;
  var body = cut(_id50, 0);
  var o = unique("o");
  var n = unique("n");
  var i = unique("i");
  var _e6;
  if (atom63(_x273)) {
    _e6 = [i, _x273];
  } else {
    var _e7;
    if (_35(_x273) > 1) {
      _e7 = _x273;
    } else {
      _e7 = [i, hd(_x273)];
    }
    _e6 = _e7;
  }
  var _id51 = _e6;
  var k = _id51[0];
  var v = _id51[1];
  var _e8;
  if (target === "lua") {
    _e8 = body;
  } else {
    _e8 = [join(["let", k, ["if", ["numeric?", k], ["parseInt", k], k]], body)];
  }
  return(["let", [o, _t1, k, "nil"], ["%for", o, k, join(["let", [v, ["get", o, k]]], _e8)]]);
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var _r63 = unstash(Array.prototype.slice.call(arguments, 2));
  var _i3 = destash33(i, _r63);
  var _to1 = destash33(to, _r63);
  var _id53 = _r63;
  var body = cut(_id53, 0);
  return(["let", _i3, 0, join(["while", ["<", _i3, _to1]], body, [["inc", _i3]])]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var _r65 = unstash(Array.prototype.slice.call(arguments, 2));
  var _v5 = destash33(v, _r65);
  var _t3 = destash33(t, _r65);
  var _id55 = _r65;
  var body = cut(_id55, 0);
  var x = unique("x");
  var i = unique("i");
  return(["let", [x, _t3], ["for", i, ["#", x], join(["let", [_v5, ["at", x, i]]], body)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _o3 = xs;
  var _i5 = undefined;
  for (_i5 in _o3) {
    var x = _o3[_i5];
    var _e9;
    if (numeric63(_i5)) {
      _e9 = parseInt(_i5);
    } else {
      _e9 = _i5;
    }
    var __i5 = _e9;
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
  var _r69 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a1 = destash33(a, _r69);
  var _id57 = _r69;
  var bs = cut(_id57, 0);
  return(["set", _a1, join(["join", _a1], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _r71 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a3 = destash33(a, _r71);
  var _id59 = _r71;
  var bs = cut(_id59, 0);
  return(["set", _a3, join(["cat", _a3], bs)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var _e10;
  if (nil63(by)) {
    _e10 = 1;
  } else {
    _e10 = by;
  }
  return(["set", n, ["+", n, _e10]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var _e11;
  if (nil63(by)) {
    _e11 = 1;
  } else {
    _e11 = by;
  }
  return(["set", n, ["-", n, _e11]]);
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
    var _i7 = undefined;
    for (_i7 in _o5) {
      var k = _o5[_i7];
      var _e12;
      if (numeric63(_i7)) {
        _e12 = parseInt(_i7);
      } else {
        _e12 = _i7;
      }
      var __i7 = _e12;
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
      return([false, _e]);
    }
  })();
  var ok = _id[0];
  var v = _id[1];
  if (! ok) {
    return(print(v.stack));
  } else {
    if (is63(v)) {
      return(print(str(v)));
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
