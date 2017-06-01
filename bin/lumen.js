environment = [{}];
target = "js";
nil__QUESTION__ = function (x) {
  return(x === undefined || x === null);
};
is__QUESTION__ = function (x) {
  return(! nil__QUESTION__(x));
};
no = function (x) {
  return(nil__QUESTION__(x) || x === false);
};
yes = function (x) {
  return(! no(x));
};
either = function (x, y) {
  if (is__QUESTION__(x)) {
    return(x);
  } else {
    return(y);
  }
};
has__QUESTION__ = function (l, k) {
  return(l.hasOwnProperty(k));
};
__POUND__ = function (x) {
  return(x.length || 0);
};
none__QUESTION__ = function (x) {
  return(__POUND__(x) === 0);
};
some__QUESTION__ = function (x) {
  return(__POUND__(x) > 0);
};
one__QUESTION__ = function (x) {
  return(__POUND__(x) === 1);
};
two__QUESTION__ = function (x) {
  return(__POUND__(x) === 2);
};
hd = function (l) {
  return(l[0]);
};
type = function (x) {
  return(typeof(x));
};
string__QUESTION__ = function (x) {
  return(type(x) === "string");
};
number__QUESTION__ = function (x) {
  return(type(x) === "number");
};
boolean__QUESTION__ = function (x) {
  return(type(x) === "boolean");
};
function__QUESTION__ = function (x) {
  return(type(x) === "function");
};
obj__QUESTION__ = function (x) {
  return(is__QUESTION__(x) && type(x) === "object");
};
atom__QUESTION__ = function (x) {
  return(nil__QUESTION__(x) || string__QUESTION__(x) || number__QUESTION__(x) || boolean__QUESTION__(x));
};
nan = 0 / 0;
inf = 1 / 0;
nan__QUESTION__ = function (n) {
  return(!( n === n));
};
inf__QUESTION__ = function (n) {
  return(n === inf || n === -inf);
};
clip = function (s, from, upto) {
  return(s.substring(from, upto));
};
cut = function (x, from, upto) {
  var _l = [];
  var _j = 0;
  var _e;
  if (nil__QUESTION__(from) || from < 0) {
    _e = 0;
  } else {
    _e = from;
  }
  var _i = _e;
  var _n = __POUND__(x);
  var _e1;
  if (nil__QUESTION__(upto) || upto > _n) {
    _e1 = _n;
  } else {
    _e1 = upto;
  }
  var _upto = _e1;
  while (_i < _upto) {
    _l[_j] = x[_i];
    _i = _i + 1;
    _j = _j + 1;
  }
  var __o = x;
  var _k = undefined;
  for (_k in __o) {
    var _v = __o[_k];
    var _e2;
    if (numeric__QUESTION__(_k)) {
      _e2 = parseInt(_k);
    } else {
      _e2 = _k;
    }
    var _k1 = _e2;
    if (! number__QUESTION__(_k1)) {
      _l[_k1] = _v;
    }
  }
  return(_l);
};
keys = function (x) {
  var _t = [];
  var __o1 = x;
  var _k2 = undefined;
  for (_k2 in __o1) {
    var _v1 = __o1[_k2];
    var _e3;
    if (numeric__QUESTION__(_k2)) {
      _e3 = parseInt(_k2);
    } else {
      _e3 = _k2;
    }
    var _k3 = _e3;
    if (! number__QUESTION__(_k3)) {
      _t[_k3] = _v1;
    }
  }
  return(_t);
};
edge = function (x) {
  return(__POUND__(x) - 1);
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
string_literal__QUESTION__ = function (x) {
  return(string__QUESTION__(x) && char(x, 0) === "\"");
};
id_literal__QUESTION__ = function (x) {
  return(string__QUESTION__(x) && char(x, 0) === "|");
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
  var _l1 = keys(l);
  var _i3 = edge(l);
  while (_i3 >= 0) {
    add(_l1, l[_i3]);
    _i3 = _i3 - 1;
  }
  return(_l1);
};
reduce = function (f, x) {
  if (none__QUESTION__(x)) {
    return(undefined);
  } else {
    if (one__QUESTION__(x)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
};
join = function () {
  var _ls = unstash(Array.prototype.slice.call(arguments, 0));
  var _r37 = [];
  var __x1 = _ls;
  var __i4 = 0;
  while (__i4 < __POUND__(__x1)) {
    var _l11 = __x1[__i4];
    if (_l11) {
      var _n3 = __POUND__(_r37);
      var __o2 = _l11;
      var _k4 = undefined;
      for (_k4 in __o2) {
        var _v2 = __o2[_k4];
        var _e4;
        if (numeric__QUESTION__(_k4)) {
          _e4 = parseInt(_k4);
        } else {
          _e4 = _k4;
        }
        var _k5 = _e4;
        if (number__QUESTION__(_k5)) {
          _k5 = _k5 + _n3;
        }
        _r37[_k5] = _v2;
      }
    }
    __i4 = __i4 + 1;
  }
  return(_r37);
};
find = function (f, t) {
  var __o3 = t;
  var __i6 = undefined;
  for (__i6 in __o3) {
    var _x2 = __o3[__i6];
    var _e5;
    if (numeric__QUESTION__(__i6)) {
      _e5 = parseInt(__i6);
    } else {
      _e5 = __i6;
    }
    var __i61 = _e5;
    var _y = f(_x2);
    if (_y) {
      return(_y);
    }
  }
};
first = function (f, l) {
  var __x3 = l;
  var __i7 = 0;
  while (__i7 < __POUND__(__x3)) {
    var _x4 = __x3[__i7];
    var _y1 = f(_x4);
    if (_y1) {
      return(_y1);
    }
    __i7 = __i7 + 1;
  }
};
in__QUESTION__ = function (x, t) {
  return(find(function (y) {
    return(x === y);
  }, t));
};
pair = function (l) {
  var _l12 = [];
  var _i8 = 0;
  while (_i8 < __POUND__(l)) {
    add(_l12, [l[_i8], l[_i8 + 1]]);
    _i8 = _i8 + 1;
    _i8 = _i8 + 1;
  }
  return(_l12);
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
  var _t1 = [];
  var __x6 = x;
  var __i9 = 0;
  while (__i9 < __POUND__(__x6)) {
    var _v3 = __x6[__i9];
    var _y2 = f(_v3);
    if (is__QUESTION__(_y2)) {
      add(_t1, _y2);
    }
    __i9 = __i9 + 1;
  }
  var __o4 = x;
  var _k6 = undefined;
  for (_k6 in __o4) {
    var _v4 = __o4[_k6];
    var _e7;
    if (numeric__QUESTION__(_k6)) {
      _e7 = parseInt(_k6);
    } else {
      _e7 = _k6;
    }
    var _k7 = _e7;
    if (! number__QUESTION__(_k7)) {
      var _y3 = f(_v4);
      if (is__QUESTION__(_y3)) {
        _t1[_k7] = _y3;
      }
    }
  }
  return(_t1);
};
keep = function (f, x) {
  return(map(function (v) {
    if (yes(f(v))) {
      return(v);
    }
  }, x));
};
keys__QUESTION__ = function (t) {
  var __o5 = t;
  var _k8 = undefined;
  for (_k8 in __o5) {
    var _v5 = __o5[_k8];
    var _e8;
    if (numeric__QUESTION__(_k8)) {
      _e8 = parseInt(_k8);
    } else {
      _e8 = _k8;
    }
    var _k9 = _e8;
    if (! number__QUESTION__(_k9)) {
      return(true);
    }
  }
  return(false);
};
empty__QUESTION__ = function (t) {
  var __o6 = t;
  var __i12 = undefined;
  for (__i12 in __o6) {
    var _x7 = __o6[__i12];
    var _e9;
    if (numeric__QUESTION__(__i12)) {
      _e9 = parseInt(__i12);
    } else {
      _e9 = __i12;
    }
    var __i121 = _e9;
    return(false);
  }
  return(true);
};
stash = function (args) {
  if (keys__QUESTION__(args)) {
    var _p = [];
    var __o7 = args;
    var _k10 = undefined;
    for (_k10 in __o7) {
      var _v6 = __o7[_k10];
      var _e10;
      if (numeric__QUESTION__(_k10)) {
        _e10 = parseInt(_k10);
      } else {
        _e10 = _k10;
      }
      var _k11 = _e10;
      if (! number__QUESTION__(_k11)) {
        _p[_k11] = _v6;
      }
    }
    _p._stash = true;
    add(args, _p);
  }
  return(args);
};
unstash = function (args) {
  if (none__QUESTION__(args)) {
    return([]);
  } else {
    var _l2 = last(args);
    if (obj__QUESTION__(_l2) && _l2._stash) {
      var _args1 = almost(args);
      var __o8 = _l2;
      var _k12 = undefined;
      for (_k12 in __o8) {
        var _v7 = __o8[_k12];
        var _e11;
        if (numeric__QUESTION__(_k12)) {
          _e11 = parseInt(_k12);
        } else {
          _e11 = _k12;
        }
        var _k13 = _e11;
        if (!( _k13 === "_stash")) {
          _args1[_k13] = _v7;
        }
      }
      return(_args1);
    } else {
      return(args);
    }
  }
};
destash__BANG__ = function (l, args1) {
  if (obj__QUESTION__(l) && l._stash) {
    var __o9 = l;
    var _k14 = undefined;
    for (_k14 in __o9) {
      var _v8 = __o9[_k14];
      var _e12;
      if (numeric__QUESTION__(_k14)) {
        _e12 = parseInt(_k14);
      } else {
        _e12 = _k14;
      }
      var _k15 = _e12;
      if (!( _k15 === "_stash")) {
        args1[_k15] = _v8;
      }
    }
  } else {
    return(l);
  }
};
search = function (s, pattern, start) {
  var _i16 = s.indexOf(pattern, start);
  if (_i16 >= 0) {
    return(_i16);
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return([]);
  } else {
    var _l3 = [];
    var _n12 = __POUND__(sep);
    while (true) {
      var _i17 = search(s, sep);
      if (nil__QUESTION__(_i17)) {
        break;
      } else {
        add(_l3, clip(s, 0, _i17));
        s = clip(s, _i17 + _n12);
      }
    }
    add(_l3, s);
    return(_l3);
  }
};
cat = function () {
  var _xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (a, b) {
    return(a + b);
  }, _xs), ""));
};
__PLUS__ = function () {
  var _xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (a, b) {
    return(a + b);
  }, _xs1), 0));
};
__MINUS__ = function () {
  var _xs2 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (b, a) {
    return(a - b);
  }, reverse(_xs2)), 0));
};
__STAR__ = function () {
  var _xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (a, b) {
    return(a * b);
  }, _xs3), 1));
};
__SLASH__ = function () {
  var _xs4 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (b, a) {
    return(a / b);
  }, reverse(_xs4)), 1));
};
__PERCENT__ = function () {
  var _xs5 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (b, a) {
    return(a % b);
  }, reverse(_xs5)), 0));
};
var pairwise = function (f, xs) {
  var _i18 = 0;
  while (_i18 < edge(xs)) {
    var _a = xs[_i18];
    var _b = xs[_i18 + 1];
    if (! f(_a, _b)) {
      return(false);
    }
    _i18 = _i18 + 1;
  }
  return(true);
};
__OPEN_ANGLE__ = function () {
  var _xs6 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a < b);
  }, _xs6));
};
__CLOSE_ANGLE__ = function () {
  var _xs7 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a > b);
  }, _xs7));
};
__EQUAL__ = function () {
  var _xs8 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a === b);
  }, _xs8));
};
__OPEN_ANGLE____EQUAL__ = function () {
  var _xs9 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a <= b);
  }, _xs9));
};
__CLOSE_ANGLE____EQUAL__ = function () {
  var _xs10 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a >= b);
  }, _xs10));
};
number = function (s) {
  var _n13 = parseFloat(s);
  if (! isNaN(_n13)) {
    return(_n13);
  }
};
number_code__QUESTION__ = function (n) {
  return(n > 47 && n < 58);
};
numeric__QUESTION__ = function (s) {
  var _n14 = __POUND__(s);
  var _i19 = 0;
  while (_i19 < _n14) {
    if (! number_code__QUESTION__(code(s, _i19))) {
      return(false);
    }
    _i19 = _i19 + 1;
  }
  return(some__QUESTION__(s));
};
var tostring = function (x) {
  return(x.toString());
};
escape = function (s) {
  var _s1 = "\"";
  var _i20 = 0;
  while (_i20 < __POUND__(s)) {
    var _c = char(s, _i20);
    var _e13;
    if (_c === "\n") {
      _e13 = "\\n";
    } else {
      var _e14;
      if (_c === "\"") {
        _e14 = "\\\"";
      } else {
        var _e15;
        if (_c === "\\") {
          _e15 = "\\\\";
        } else {
          _e15 = _c;
        }
        _e14 = _e15;
      }
      _e13 = _e14;
    }
    var _c1 = _e13;
    _s1 = _s1 + _c1;
    _i20 = _i20 + 1;
  }
  return(_s1 + "\"");
};
str = function (x, stack) {
  if (nil__QUESTION__(x)) {
    return("nil");
  } else {
    if (nan__QUESTION__(x)) {
      return("nan");
    } else {
      if (x === inf) {
        return("inf");
      } else {
        if (x === -inf) {
          return("-inf");
        } else {
          if (boolean__QUESTION__(x)) {
            if (x) {
              return("true");
            } else {
              return("false");
            }
          } else {
            if (string__QUESTION__(x)) {
              return(escape(x));
            } else {
              if (atom__QUESTION__(x)) {
                return(tostring(x));
              } else {
                if (function__QUESTION__(x)) {
                  return("function");
                } else {
                  if (stack && in__QUESTION__(x, stack)) {
                    return("circular");
                  } else {
                    if (false) {
                      return(escape(tostring(x)));
                    } else {
                      var _s = "(";
                      var _sp = "";
                      var _xs11 = [];
                      var _ks = [];
                      var _l4 = stack || [];
                      add(_l4, x);
                      var __o10 = x;
                      var _k16 = undefined;
                      for (_k16 in __o10) {
                        var _v9 = __o10[_k16];
                        var _e16;
                        if (numeric__QUESTION__(_k16)) {
                          _e16 = parseInt(_k16);
                        } else {
                          _e16 = _k16;
                        }
                        var _k17 = _e16;
                        if (number__QUESTION__(_k17)) {
                          _xs11[_k17] = str(_v9, _l4);
                        } else {
                          add(_ks, _k17 + ":");
                          add(_ks, str(_v9, _l4));
                        }
                      }
                      drop(_l4);
                      var __o11 = join(_xs11, _ks);
                      var __i22 = undefined;
                      for (__i22 in __o11) {
                        var _v10 = __o11[__i22];
                        var _e17;
                        if (numeric__QUESTION__(__i22)) {
                          _e17 = parseInt(__i22);
                        } else {
                          _e17 = __i22;
                        }
                        var __i221 = _e17;
                        _s = _s + _sp + _v10;
                        _sp = " ";
                      }
                      return(_s + ")");
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
  var __r74 = unstash(Array.prototype.slice.call(arguments, 1));
  var _f = destash__BANG__(f, __r74);
  var __id = __r74;
  var _args11 = cut(__id, 0);
  return(apply(_f, _args11));
};
setenv = function (k) {
  var __r75 = unstash(Array.prototype.slice.call(arguments, 1));
  var _k18 = destash__BANG__(k, __r75);
  var __id1 = __r75;
  var _keys = cut(__id1, 0);
  if (string__QUESTION__(_k18)) {
    var _e18;
    if (_keys.toplevel) {
      _e18 = hd(environment);
    } else {
      _e18 = last(environment);
    }
    var _frame = _e18;
    var _entry = _frame[_k18] || {};
    var __o12 = _keys;
    var _k19 = undefined;
    for (_k19 in __o12) {
      var _v11 = __o12[_k19];
      var _e19;
      if (numeric__QUESTION__(_k19)) {
        _e19 = parseInt(_k19);
      } else {
        _e19 = _k19;
      }
      var _k20 = _e19;
      _entry[_k20] = _v11;
    }
    _frame[_k18] = _entry;
    return(_frame[_k18]);
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
  var _args1 = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["do"], map(function (_x4) {
    var __id1 = _x4;
    var _lh1 = __id1[0];
    var _rh1 = __id1[1];
    return(["%set", _lh1, _rh1]);
  }, pair(_args1))));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (target === "lua" && number__QUESTION__(i)) {
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
  var _body1 = unstash(Array.prototype.slice.call(arguments, 0));
  var _x22 = unique("x");
  var _l1 = [];
  var _forms1 = [];
  var __o1 = _body1;
  var _k2 = undefined;
  for (_k2 in __o1) {
    var _v1 = __o1[_k2];
    var _e8;
    if (numeric__QUESTION__(_k2)) {
      _e8 = parseInt(_k2);
    } else {
      _e8 = _k2;
    }
    var _k3 = _e8;
    if (number__QUESTION__(_k3)) {
      _l1[_k3] = _v1;
    } else {
      add(_forms1, ["set", ["get", _x22, ["quote", _k3]], _v1]);
    }
  }
  if (some__QUESTION__(_forms1)) {
    return(join(["let", _x22, join(["%array"], _l1)], _forms1, [_x22]));
  } else {
    return(join(["%array"], _l1));
  }
}});
setenv("if", {_stash: true, macro: function () {
  var _branches1 = unstash(Array.prototype.slice.call(arguments, 0));
  return(hd(expand_if(_branches1)));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var __r13 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expr1 = destash__BANG__(expr, __r13);
  var __id4 = __r13;
  var _clauses1 = cut(__id4, 0);
  var _x41 = unique("x");
  var _eq1 = function (_) {
    return(["=", ["quote", _], _x41]);
  };
  var _cl1 = function (_x44) {
    var __id5 = _x44;
    var _a1 = __id5[0];
    var _b1 = __id5[1];
    if (nil__QUESTION__(_b1)) {
      return([_a1]);
    } else {
      if (string__QUESTION__(_a1) || number__QUESTION__(_a1)) {
        return([_eq1(_a1), _b1]);
      } else {
        if (one__QUESTION__(_a1)) {
          return([_eq1(hd(_a1)), _b1]);
        } else {
          if (__POUND__(_a1) > 1) {
            return([join(["or"], map(_eq1, _a1)), _b1]);
          }
        }
      }
    }
  };
  return(["let", _x41, _expr1, join(["if"], apply(join, map(_cl1, pair(_clauses1))))]);
}});
setenv("when", {_stash: true, macro: function (cond) {
  var __r17 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond1 = destash__BANG__(cond, __r17);
  var __id7 = __r17;
  var _body3 = cut(__id7, 0);
  return(["if", _cond1, join(["do"], _body3)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var __r19 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond3 = destash__BANG__(cond, __r19);
  var __id9 = __r19;
  var _body5 = cut(__id9, 0);
  return(["if", ["not", _cond3], join(["do"], _body5)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var _body7 = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, _body7)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var __r23 = unstash(Array.prototype.slice.call(arguments, 1));
  var _bs11 = destash__BANG__(bs, __r23);
  var __id14 = __r23;
  var _body9 = cut(__id14, 0);
  if (atom__QUESTION__(_bs11)) {
    return(join(["let", [_bs11, hd(_body9)]], tl(_body9)));
  } else {
    if (none__QUESTION__(_bs11)) {
      return(join(["do"], _body9));
    } else {
      var __id15 = _bs11;
      var _lh3 = __id15[0];
      var _rh3 = __id15[1];
      var _bs21 = cut(__id15, 2);
      var __id16 = bind(_lh3, _rh3);
      var _id17 = __id16[0];
      var _val1 = __id16[1];
      var _bs12 = cut(__id16, 2);
      var _renames1 = [];
      if (! id_literal__QUESTION__(_id17)) {
        var _id121 = unique(compile(_id17));
        _renames1 = [_id17, _id121];
        _id17 = _id121;
      }
      return(["do", ["%local", _id17, _val1], ["let-symbol", _renames1, join(["let", join(_bs12, _bs21)], _body9)]]);
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var __r25 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x84 = destash__BANG__(x, __r25);
  var _v3 = destash__BANG__(v, __r25);
  var __id19 = __r25;
  var _body11 = cut(__id19, 0);
  return(join(["let", [_x84, _v3]], _body11, [_x84]));
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var __r27 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x94 = destash__BANG__(x, __r27);
  var _v5 = destash__BANG__(v, __r27);
  var __id21 = __r27;
  var _body13 = cut(__id21, 0);
  var _y1 = unique("y");
  return(["let", _y1, _v5, ["when", ["yes", _y1], join(["let", [_x94, _y1]], _body13)]]);
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var __r29 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name1 = destash__BANG__(name, __r29);
  var _args3 = destash__BANG__(args, __r29);
  var __id23 = __r29;
  var _body15 = cut(__id23, 0);
  var __x103 = ["setenv", ["quote", _name1]];
  __x103.macro = join(["fn", _args3], _body15);
  var _form1 = __x103;
  eval(_form1);
  return(_form1);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var __r31 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name3 = destash__BANG__(name, __r31);
  var _args5 = destash__BANG__(args, __r31);
  var __id25 = __r31;
  var _body17 = cut(__id25, 0);
  var __x109 = ["setenv", ["quote", _name3]];
  __x109.special = join(["fn", _args5], _body17);
  var _form3 = join(__x109, keys(_body17));
  eval(_form3);
  return(_form3);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var __x115 = ["setenv", ["quote", name]];
  __x115.symbol = ["quote", expansion];
  return(__x115);
}});
setenv("define-reader", {_stash: true, macro: function (_x123) {
  var __id28 = _x123;
  var _char1 = __id28[0];
  var _s1 = __id28[1];
  var __r35 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x123 = destash__BANG__(_x123, __r35);
  var __id29 = __r35;
  var _body19 = cut(__id29, 0);
  return(["set", ["get", "read-table", _char1], join(["fn", [_s1]], _body19)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var __r37 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name5 = destash__BANG__(name, __r37);
  var _x131 = destash__BANG__(x, __r37);
  var __id31 = __r37;
  var _body21 = cut(__id31, 0);
  setenv(_name5, {_stash: true, variable: true});
  if (some__QUESTION__(_body21)) {
    return(join(["%local-function", _name5], bind__STAR__(_x131, _body21)));
  } else {
    return(["%local", _name5, _x131]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var __r39 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name7 = destash__BANG__(name, __r39);
  var _x137 = destash__BANG__(x, __r39);
  var __id33 = __r39;
  var _body23 = cut(__id33, 0);
  setenv(_name7, {_stash: true, toplevel: true, variable: true});
  if (some__QUESTION__(_body23)) {
    return(join(["%global-function", _name7], bind__STAR__(_x137, _body23)));
  } else {
    return(["set", _name7, _x137]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _body25 = unstash(Array.prototype.slice.call(arguments, 0));
  var _x147 = unique("x");
  return(["do", ["add", "environment", ["obj"]], ["with", _x147, join(["do"], _body25), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_x159) {
  var __id36 = _x159;
  var _names1 = __id36[0];
  var __r41 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x159 = destash__BANG__(_x159, __r41);
  var __id37 = __r41;
  var _body27 = cut(__id37, 0);
  var _x160 = unique("x");
  var __x163 = ["setenv", _x160];
  __x163.variable = true;
  return(join(["with-frame", ["each", _x160, _names1, __x163]], _body27));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var __r44 = unstash(Array.prototype.slice.call(arguments, 1));
  var _definitions1 = destash__BANG__(definitions, __r44);
  var __id39 = __r44;
  var _body29 = cut(__id39, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, _definitions1);
  var __x167 = join(["do"], macroexpand(_body29));
  drop(environment);
  return(__x167);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var __r48 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expansions1 = destash__BANG__(expansions, __r48);
  var __id42 = __r48;
  var _body31 = cut(__id42, 0);
  add(environment, {});
  map(function (_x175) {
    var __id43 = _x175;
    var _name9 = __id43[0];
    var _exp1 = __id43[1];
    return(macroexpand(["define-symbol", _name9, _exp1]));
  }, pair(_expansions1));
  var __x174 = join(["do"], macroexpand(_body31));
  drop(environment);
  return(__x174);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var __r52 = unstash(Array.prototype.slice.call(arguments, 1));
  var _names3 = destash__BANG__(names, __r52);
  var __id45 = __r52;
  var _body33 = cut(__id45, 0);
  var _bs3 = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, _names3);
  return(join(["let", apply(join, _bs3)], _body33));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var __r55 = unstash(Array.prototype.slice.call(arguments, 1));
  var _args7 = destash__BANG__(args, __r55);
  var __id47 = __r55;
  var _body35 = cut(__id47, 0);
  return(join(["%function"], bind__STAR__(_args7, _body35)));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var __r57 = unstash(Array.prototype.slice.call(arguments, 1));
  var _f1 = destash__BANG__(f, __r57);
  var __id49 = __r57;
  var _args9 = cut(__id49, 0);
  if (__POUND__(_args9) > 1) {
    return([["do", "apply"], _f1, ["join", join(["list"], almost(_args9)), last(_args9)]]);
  } else {
    return(join([["do", "apply"], _f1], _args9));
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", join(), ["%try", ["list", true, expr]]]]);
  } else {
    var _x231 = unique("x");
    var _msg1 = unique("msg");
    var _trace1 = unique("trace");
    var __x253 = ["obj"];
    __x253.message = _msg1;
    __x253.stack = _trace1;
    return(["let", [_x231, "nil", _msg1, "nil", _trace1, "nil"], ["if", ["xpcall", ["fn", join(), ["set", _x231, expr]], ["fn", ["m"], ["set", _trace1, [["get", "debug", ["quote", "traceback"]]], _msg1, ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]]]], ["list", true, _x231], ["list", false, __x253]]]);
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var __r61 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x268 = destash__BANG__(x, __r61);
  var _t1 = destash__BANG__(t, __r61);
  var __id52 = __r61;
  var _body37 = cut(__id52, 0);
  var _o3 = unique("o");
  var _n3 = unique("n");
  var _i3 = unique("i");
  var _e9;
  if (atom__QUESTION__(_x268)) {
    _e9 = [_i3, _x268];
  } else {
    var _e10;
    if (__POUND__(_x268) > 1) {
      _e10 = _x268;
    } else {
      _e10 = [_i3, hd(_x268)];
    }
    _e9 = _e10;
  }
  var __id53 = _e9;
  var _k5 = __id53[0];
  var _v7 = __id53[1];
  var _e11;
  if (target === "lua") {
    _e11 = _body37;
  } else {
    _e11 = [join(["let", _k5, ["if", ["numeric?", _k5], ["parseInt", _k5], _k5]], _body37)];
  }
  return(["let", [_o3, _t1, _k5, "nil"], ["%for", _o3, _k5, join(["let", [_v7, ["get", _o3, _k5]]], _e11)]]);
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var __r63 = unstash(Array.prototype.slice.call(arguments, 2));
  var _i5 = destash__BANG__(i, __r63);
  var _to1 = destash__BANG__(to, __r63);
  var __id55 = __r63;
  var _body39 = cut(__id55, 0);
  return(["let", _i5, 0, join(["while", ["<", _i5, _to1]], _body39, [["inc", _i5]])]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var __r65 = unstash(Array.prototype.slice.call(arguments, 2));
  var _v9 = destash__BANG__(v, __r65);
  var _t3 = destash__BANG__(t, __r65);
  var __id57 = __r65;
  var _body41 = cut(__id57, 0);
  var _x300 = unique("x");
  var _i7 = unique("i");
  return(["let", [_x300, _t3], ["for", _i7, ["#", _x300], join(["let", [_v9, ["at", _x300, _i7]]], _body41)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var _xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  var _l3 = [];
  var __o5 = _xs1;
  var __i9 = undefined;
  for (__i9 in __o5) {
    var _x310 = __o5[__i9];
    var _e12;
    if (numeric__QUESTION__(__i9)) {
      _e12 = parseInt(__i9);
    } else {
      _e12 = __i9;
    }
    var __i91 = _e12;
    _l3[_x310] = true;
  }
  return(join(["obj"], _l3));
}});
setenv("language", {_stash: true, macro: function () {
  return(["quote", target]);
}});
setenv("target", {_stash: true, macro: function () {
  var _clauses3 = unstash(Array.prototype.slice.call(arguments, 0));
  return(_clauses3[target]);
}});
setenv("join!", {_stash: true, macro: function (a) {
  var __r69 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a3 = destash__BANG__(a, __r69);
  var __id59 = __r69;
  var _bs5 = cut(__id59, 0);
  return(["set", _a3, join(["join", _a3], _bs5)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var __r71 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a5 = destash__BANG__(a, __r71);
  var __id61 = __r71;
  var _bs7 = cut(__id61, 0);
  return(["set", _a5, join(["cat", _a5], _bs7)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var _e13;
  if (nil__QUESTION__(by)) {
    _e13 = 1;
  } else {
    _e13 = by;
  }
  return(["set", n, ["+", n, _e13]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var _e14;
  if (nil__QUESTION__(by)) {
    _e14 = 1;
  } else {
    _e14 = by;
  }
  return(["set", n, ["-", n, _e14]]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var _x335 = unique("x");
  return(["do", ["inc", "indent-level"], ["with", _x335, form, ["dec", "indent-level"]]]);
}});
setenv("export", {_stash: true, macro: function () {
  var _names5 = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, _names5)));
  } else {
    var _x351 = {};
    var __o7 = _names5;
    var __i11 = undefined;
    for (__i11 in __o7) {
      var _k7 = __o7[__i11];
      var _e15;
      if (numeric__QUESTION__(__i11)) {
        _e15 = parseInt(__i11);
      } else {
        _e15 = __i11;
      }
      var __i111 = _e15;
      _x351[_k7] = _k7;
    }
    return(["return", join(["%object"], mapo(function (x) {
      return(x);
    }, _x351))]);
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var _body43 = unstash(Array.prototype.slice.call(arguments, 0));
  return(eval(join(["do"], _body43)));
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
var eval_print = function (form) {
  var __id = (function () {
    try {
      return([true, compiler.eval(form)]);
    }
    catch (_e) {
      return([false, _e]);
    }
  })();
  var _ok = __id[0];
  var _v = __id[1];
  if (! _ok) {
    return(print(_v.stack));
  } else {
    if (is__QUESTION__(_v)) {
      return(print(str(_v)));
    }
  }
};
var rep = function (s) {
  return(eval_print(reader["read-string"](s)));
};
var repl = function () {
  var _buf = "";
  var rep1 = function (s) {
    _buf = _buf + s;
    var _more = [];
    var _form = reader["read-string"](_buf, _more);
    if (!( _form === _more)) {
      eval_print(_form);
      _buf = "";
      return(system.write("> "));
    }
  };
  system.write("> ");
  var __in_ = process.stdin;
  __in_.setEncoding("utf8");
  return(__in_.on("data", rep1));
};
compile_file = function (path) {
  var _s = reader.stream(system["read-file"](path));
  var _body = reader["read-all"](_s);
  var _form1 = compiler.expand(join(["do"], _body));
  return(compiler.compile(_form1, {_stash: true, stmt: true}));
};
load = function (path) {
  var _previous = target;
  target = "js";
  var _code = compile_file(path);
  target = _previous;
  return(compiler.run(_code));
};
var run_file = function (path) {
  return(compiler.run(system["read-file"](path)));
};
var script_file__QUESTION__ = function (path) {
  return(!( "-" === char(path, 0) || ".js" === clip(path, __POUND__(path) - 3) || ".lua" === clip(path, __POUND__(path) - 4)));
};
var usage = function () {
  print("usage: lumen [<file> <arguments> | options <object files>]");
  print(" <file>\t\tProgram read from script file");
  print(" <arguments>\tPassed to program in system.argv");
  print(" <object files>\tLoaded before compiling <input>");
  print("options:");
  print(" -c <input>\tCompile input file");
  print(" -o <output>\tOutput file");
  print(" -t <target>\tTarget language (default: lua)");
  return(print(" -e <expr>\tExpression to evaluate"));
};
var main = function () {
  var _arg = hd(system.argv);
  if (_arg && script_file__QUESTION__(_arg)) {
    return(load(_arg));
  } else {
    if (_arg === "-h" || _arg === "--help") {
      return(usage());
    } else {
      var _pre = [];
      var _input = undefined;
      var _output = undefined;
      var _target1 = undefined;
      var _expr = undefined;
      var _argv = system.argv;
      var _i = 0;
      while (_i < __POUND__(_argv)) {
        var _a = _argv[_i];
        if (_a === "-c" || _a === "-o" || _a === "-t" || _a === "-e") {
          if (_i === edge(_argv)) {
            print("missing argument for " + _a);
          } else {
            _i = _i + 1;
            var _val = _argv[_i];
            if (_a === "-c") {
              _input = _val;
            } else {
              if (_a === "-o") {
                _output = _val;
              } else {
                if (_a === "-t") {
                  _target1 = _val;
                } else {
                  if (_a === "-e") {
                    _expr = _val;
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(_a, 0))) {
            add(_pre, _a);
          }
        }
        _i = _i + 1;
      }
      var __x2 = _pre;
      var __i1 = 0;
      while (__i1 < __POUND__(__x2)) {
        var _file = __x2[__i1];
        run_file(_file);
        __i1 = __i1 + 1;
      }
      if (nil__QUESTION__(_input)) {
        if (_expr) {
          return(rep(_expr));
        } else {
          return(repl());
        }
      } else {
        if (_target1) {
          target = _target1;
        }
        var _code1 = compile_file(_input);
        if (nil__QUESTION__(_output) || _output === "-") {
          return(print(_code1));
        } else {
          return(system["write-file"](_output, _code1));
        }
      }
    }
  }
};
main();
