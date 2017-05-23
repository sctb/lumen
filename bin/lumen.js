environment = [{}];
target = "js";
nil63 = function (x) {
  return(x === undefined || x === null);
};
is63 = function (x) {
  return(! nil63(x));
};
no = function (x) {
  return(nil63(x) || x === false);
};
yes = function (x) {
  return(! no(x));
};
either = function (x, y) {
  if (is63(x)) {
    return(x);
  } else {
    return(y);
  }
};
has63 = function (l, k) {
  return(l.hasOwnProperty(k));
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
  var _l = [];
  var _j = 0;
  var _e;
  if (nil63(from) || from < 0) {
    _e = 0;
  } else {
    _e = from;
  }
  var _i = _e;
  var _n = _35(x);
  var _e1;
  if (nil63(upto) || upto > _n) {
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
    if (numeric63(_k)) {
      _e2 = parseInt(_k);
    } else {
      _e2 = _k;
    }
    var _k1 = _e2;
    if (! number63(_k1)) {
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
    if (numeric63(_k2)) {
      _e3 = parseInt(_k2);
    } else {
      _e3 = _k2;
    }
    var _k3 = _e3;
    if (! number63(_k3)) {
      _t[_k3] = _v1;
    }
  }
  return(_t);
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
  var _l1 = keys(l);
  var _i3 = edge(l);
  while (_i3 >= 0) {
    add(_l1, l[_i3]);
    _i3 = _i3 - 1;
  }
  return(_l1);
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
  var _ls = unstash(Array.prototype.slice.call(arguments, 0));
  var _r37 = [];
  var __x1 = _ls;
  var __i4 = 0;
  while (__i4 < _35(__x1)) {
    var _l11 = __x1[__i4];
    if (_l11) {
      var _n3 = _35(_r37);
      var __o2 = _l11;
      var _k4 = undefined;
      for (_k4 in __o2) {
        var _v2 = __o2[_k4];
        var _e4;
        if (numeric63(_k4)) {
          _e4 = parseInt(_k4);
        } else {
          _e4 = _k4;
        }
        var _k5 = _e4;
        if (number63(_k5)) {
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
    if (numeric63(__i6)) {
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
  while (__i7 < _35(__x3)) {
    var _x4 = __x3[__i7];
    var _y1 = f(_x4);
    if (_y1) {
      return(_y1);
    }
    __i7 = __i7 + 1;
  }
};
in63 = function (x, t) {
  return(find(function (y) {
    return(x === y);
  }, t));
};
pair = function (l) {
  var _l12 = [];
  var _i8 = 0;
  while (_i8 < _35(l)) {
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
  while (__i9 < _35(__x6)) {
    var _v3 = __x6[__i9];
    var _y2 = f(_v3);
    if (is63(_y2)) {
      add(_t1, _y2);
    }
    __i9 = __i9 + 1;
  }
  var __o4 = x;
  var _k6 = undefined;
  for (_k6 in __o4) {
    var _v4 = __o4[_k6];
    var _e7;
    if (numeric63(_k6)) {
      _e7 = parseInt(_k6);
    } else {
      _e7 = _k6;
    }
    var _k7 = _e7;
    if (! number63(_k7)) {
      var _y3 = f(_v4);
      if (is63(_y3)) {
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
keys63 = function (t) {
  var __o5 = t;
  var _k8 = undefined;
  for (_k8 in __o5) {
    var _v5 = __o5[_k8];
    var _e8;
    if (numeric63(_k8)) {
      _e8 = parseInt(_k8);
    } else {
      _e8 = _k8;
    }
    var _k9 = _e8;
    if (! number63(_k9)) {
      return(true);
    }
  }
  return(false);
};
empty63 = function (t) {
  var __o6 = t;
  var __i12 = undefined;
  for (__i12 in __o6) {
    var _x7 = __o6[__i12];
    var _e9;
    if (numeric63(__i12)) {
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
  if (keys63(args)) {
    var _p = [];
    var __o7 = args;
    var _k10 = undefined;
    for (_k10 in __o7) {
      var _v6 = __o7[_k10];
      var _e10;
      if (numeric63(_k10)) {
        _e10 = parseInt(_k10);
      } else {
        _e10 = _k10;
      }
      var _k11 = _e10;
      if (! number63(_k11)) {
        _p[_k11] = _v6;
      }
    }
    _p._stash = true;
    add(args, _p);
  }
  return(args);
};
unstash = function (args) {
  if (none63(args)) {
    return([]);
  } else {
    var _l2 = last(args);
    if (obj63(_l2) && _l2._stash) {
      var _args1 = almost(args);
      var __o8 = _l2;
      var _k12 = undefined;
      for (_k12 in __o8) {
        var _v7 = __o8[_k12];
        var _e11;
        if (numeric63(_k12)) {
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
destash33 = function (l, args1) {
  if (obj63(l) && l._stash) {
    var __o9 = l;
    var _k14 = undefined;
    for (_k14 in __o9) {
      var _v8 = __o9[_k14];
      var _e12;
      if (numeric63(_k14)) {
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
    var _n12 = _35(sep);
    while (true) {
      var _i17 = search(s, sep);
      if (nil63(_i17)) {
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
_43 = function () {
  var _xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (a, b) {
    return(a + b);
  }, _xs1), 0));
};
_45 = function () {
  var _xs2 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (b, a) {
    return(a - b);
  }, reverse(_xs2)), 0));
};
_42 = function () {
  var _xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (a, b) {
    return(a * b);
  }, _xs3), 1));
};
_47 = function () {
  var _xs4 = unstash(Array.prototype.slice.call(arguments, 0));
  return(either(reduce(function (b, a) {
    return(a / b);
  }, reverse(_xs4)), 1));
};
_37 = function () {
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
_60 = function () {
  var _xs6 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a < b);
  }, _xs6));
};
_62 = function () {
  var _xs7 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a > b);
  }, _xs7));
};
_61 = function () {
  var _xs8 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a === b);
  }, _xs8));
};
_6061 = function () {
  var _xs9 = unstash(Array.prototype.slice.call(arguments, 0));
  return(pairwise(function (a, b) {
    return(a <= b);
  }, _xs9));
};
_6261 = function () {
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
number_code63 = function (n) {
  return(n > 47 && n < 58);
};
numeric63 = function (s) {
  var _n14 = _35(s);
  var _i19 = 0;
  while (_i19 < _n14) {
    if (! number_code63(code(s, _i19))) {
      return(false);
    }
    _i19 = _i19 + 1;
  }
  return(some63(s));
};
var tostring = function (x) {
  return(x.toString());
};
escape = function (s) {
  var _s1 = "\"";
  var _i20 = 0;
  while (_i20 < _35(s)) {
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
                        if (numeric63(_k16)) {
                          _e16 = parseInt(_k16);
                        } else {
                          _e16 = _k16;
                        }
                        var _k17 = _e16;
                        if (number63(_k17)) {
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
                        if (numeric63(__i22)) {
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
  var _f = destash33(f, __r74);
  var __id = __r74;
  var _args11 = cut(__id, 0);
  return(apply(_f, _args11));
};
setenv = function (k) {
  var __r75 = unstash(Array.prototype.slice.call(arguments, 1));
  var _k18 = destash33(k, __r75);
  var __id1 = __r75;
  var _keys = cut(__id1, 0);
  if (string63(_k18)) {
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
      if (numeric63(_k19)) {
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
  var _args = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["do"], map(function (_x1) {
    var __id = _x1;
    var _lh = __id[0];
    var _rh = __id[1];
    return(["%set", _lh, _rh]);
  }, pair(_args))));
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
  var _body = unstash(Array.prototype.slice.call(arguments, 0));
  var _x7 = unique("x");
  var _l = [];
  var _forms = [];
  var __o = _body;
  var _k = undefined;
  for (_k in __o) {
    var _v = __o[_k];
    var _e;
    if (numeric63(_k)) {
      _e = parseInt(_k);
    } else {
      _e = _k;
    }
    var _k1 = _e;
    if (number63(_k1)) {
      _l[_k1] = _v;
    } else {
      add(_forms, ["set", ["get", _x7, ["quote", _k1]], _v]);
    }
  }
  if (some63(_forms)) {
    return(join(["let", _x7, join(["%array"], _l)], _forms, [_x7]));
  } else {
    return(join(["%array"], _l));
  }
}});
setenv("if", {_stash: true, macro: function () {
  var _branches = unstash(Array.prototype.slice.call(arguments, 0));
  return(hd(expand_if(_branches)));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var __r5 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expr = destash33(expr, __r5);
  var __id1 = __r5;
  var _clauses = cut(__id1, 0);
  var _x15 = unique("x");
  var _eq = function (_) {
    return(["=", ["quote", _], _x15]);
  };
  var _cl = function (_x18) {
    var __id2 = _x18;
    var _a = __id2[0];
    var _b = __id2[1];
    if (nil63(_b)) {
      return([_a]);
    } else {
      if (string63(_a) || number63(_a)) {
        return([_eq(_a), _b]);
      } else {
        if (one63(_a)) {
          return([_eq(hd(_a)), _b]);
        } else {
          if (_35(_a) > 1) {
            return([join(["or"], map(_eq, _a)), _b]);
          }
        }
      }
    }
  };
  return(["let", _x15, _expr, join(["if"], apply(join, map(_cl, pair(_clauses))))]);
}});
setenv("when", {_stash: true, macro: function (cond) {
  var __r8 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond = destash33(cond, __r8);
  var __id3 = __r8;
  var _body1 = cut(__id3, 0);
  return(["if", _cond, join(["do"], _body1)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var __r9 = unstash(Array.prototype.slice.call(arguments, 1));
  var _cond1 = destash33(cond, __r9);
  var __id4 = __r9;
  var _body2 = cut(__id4, 0);
  return(["if", ["not", _cond1], join(["do"], _body2)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var _body3 = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, _body3)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var __r11 = unstash(Array.prototype.slice.call(arguments, 1));
  var _bs = destash33(bs, __r11);
  var __id5 = __r11;
  var _body4 = cut(__id5, 0);
  if (atom63(_bs)) {
    return(join(["let", [_bs, hd(_body4)]], tl(_body4)));
  } else {
    if (none63(_bs)) {
      return(join(["do"], _body4));
    } else {
      var __id6 = _bs;
      var _lh1 = __id6[0];
      var _rh1 = __id6[1];
      var _bs2 = cut(__id6, 2);
      var __id7 = bind(_lh1, _rh1);
      var _id8 = __id7[0];
      var _val = __id7[1];
      var _bs1 = cut(__id7, 2);
      var _renames = [];
      if (! id_literal63(_id8)) {
        var _id11 = unique(_id8);
        _renames = [_id8, _id11];
        _id8 = _id11;
      }
      return(["do", ["%local", _id8, _val], ["let-symbol", _renames, join(["let", join(_bs1, _bs2)], _body4)]]);
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var __r12 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x40 = destash33(x, __r12);
  var _v1 = destash33(v, __r12);
  var __id9 = __r12;
  var _body5 = cut(__id9, 0);
  return(join(["let", [_x40, _v1]], _body5, [_x40]));
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var __r13 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x44 = destash33(x, __r13);
  var _v2 = destash33(v, __r13);
  var __id10 = __r13;
  var _body6 = cut(__id10, 0);
  var _y = unique("y");
  return(["let", _y, _v2, ["when", ["yes", _y], join(["let", [_x44, _y]], _body6)]]);
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var __r14 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name = destash33(name, __r14);
  var _args1 = destash33(args, __r14);
  var __id111 = __r14;
  var _body7 = cut(__id111, 0);
  var __x50 = ["setenv", ["quote", _name]];
  __x50.macro = join(["fn", _args1], _body7);
  return(__x50);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var __r15 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name1 = destash33(name, __r15);
  var _args2 = destash33(args, __r15);
  var __id12 = __r15;
  var _body8 = cut(__id12, 0);
  var __x53 = ["setenv", ["quote", _name1]];
  __x53.special = join(["fn", _args2], _body8);
  return(join(__x53, keys(_body8)));
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  var __x56 = ["setenv", ["quote", name]];
  __x56.symbol = ["quote", expansion];
  return(__x56);
}});
setenv("define-reader", {_stash: true, macro: function (_x59) {
  var __id13 = _x59;
  var _char = __id13[0];
  var _s = __id13[1];
  var __r17 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x59 = destash33(_x59, __r17);
  var __id14 = __r17;
  var _body9 = cut(__id14, 0);
  return(["set", ["get", "read-table", _char], join(["fn", [_s]], _body9)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var __r18 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name2 = destash33(name, __r18);
  var _x64 = destash33(x, __r18);
  var __id15 = __r18;
  var _body10 = cut(__id15, 0);
  setenv(_name2, {_stash: true, variable: true});
  if (some63(_body10)) {
    return(join(["%local-function", _name2], bind42(_x64, _body10)));
  } else {
    return(["%local", _name2, _x64]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var __r19 = unstash(Array.prototype.slice.call(arguments, 2));
  var _name3 = destash33(name, __r19);
  var _x67 = destash33(x, __r19);
  var __id16 = __r19;
  var _body11 = cut(__id16, 0);
  setenv(_name3, {_stash: true, toplevel: true, variable: true});
  if (some63(_body11)) {
    return(join(["%global-function", _name3], bind42(_x67, _body11)));
  } else {
    return(["set", _name3, _x67]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _body12 = unstash(Array.prototype.slice.call(arguments, 0));
  var _x70 = unique("x");
  return(["do", ["add", "environment", ["obj"]], ["with", _x70, join(["do"], _body12), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_x77) {
  var __id17 = _x77;
  var _names = __id17[0];
  var __r20 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x77 = destash33(_x77, __r20);
  var __id18 = __r20;
  var _body13 = cut(__id18, 0);
  var _x78 = unique("x");
  var __x81 = ["setenv", _x78];
  __x81.variable = true;
  return(join(["with-frame", ["each", _x78, _names, __x81]], _body13));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var __r21 = unstash(Array.prototype.slice.call(arguments, 1));
  var _definitions = destash33(definitions, __r21);
  var __id19 = __r21;
  var _body14 = cut(__id19, 0);
  add(environment, {});
  map(function (m) {
    return(eval(join(["define-macro"], m)));
  }, _definitions);
  var __x82 = join(["do"], macroexpand(_body14));
  drop(environment);
  return(__x82);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var __r23 = unstash(Array.prototype.slice.call(arguments, 1));
  var _expansions = destash33(expansions, __r23);
  var __id20 = __r23;
  var _body15 = cut(__id20, 0);
  add(environment, {});
  map(function (_x86) {
    var __id21 = _x86;
    var _name4 = __id21[0];
    var _exp = __id21[1];
    return(setenv(_name4, {_stash: true, symbol: _exp}));
  }, pair(_expansions));
  var __x85 = join(["do"], macroexpand(_body15));
  drop(environment);
  return(__x85);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var __r25 = unstash(Array.prototype.slice.call(arguments, 1));
  var _names1 = destash33(names, __r25);
  var __id22 = __r25;
  var _body16 = cut(__id22, 0);
  var _bs11 = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, _names1);
  return(join(["let", apply(join, _bs11)], _body16));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var __r27 = unstash(Array.prototype.slice.call(arguments, 1));
  var _args3 = destash33(args, __r27);
  var __id23 = __r27;
  var _body17 = cut(__id23, 0);
  return(join(["%function"], bind42(_args3, _body17)));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var __r28 = unstash(Array.prototype.slice.call(arguments, 1));
  var _f = destash33(f, __r28);
  var __id24 = __r28;
  var _args4 = cut(__id24, 0);
  if (_35(_args4) > 1) {
    return([["do", "apply"], _f, ["join", join(["list"], almost(_args4)), last(_args4)]]);
  } else {
    return(join([["do", "apply"], _f], _args4));
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", join(), ["%try", ["list", true, expr]]]]);
  } else {
    var _x103 = unique("x");
    var _msg = unique("msg");
    var _trace = unique("trace");
    var __x125 = ["obj"];
    __x125.message = _msg;
    __x125.stack = _trace;
    return(["let", [_x103, "nil", _msg, "nil", _trace, "nil"], ["if", ["xpcall", ["fn", join(), ["set", _x103, expr]], ["fn", ["m"], ["set", _trace, [["get", "debug", ["quote", "traceback"]]], _msg, ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]]]], ["list", true, _x103], ["list", false, __x125]]]);
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var __r30 = unstash(Array.prototype.slice.call(arguments, 2));
  var _x126 = destash33(x, __r30);
  var _t = destash33(t, __r30);
  var __id25 = __r30;
  var _body18 = cut(__id25, 0);
  var _o1 = unique("o");
  var _n1 = unique("n");
  var _i1 = unique("i");
  var _e1;
  if (atom63(_x126)) {
    _e1 = [_i1, _x126];
  } else {
    var _e2;
    if (_35(_x126) > 1) {
      _e2 = _x126;
    } else {
      _e2 = [_i1, hd(_x126)];
    }
    _e1 = _e2;
  }
  var __id26 = _e1;
  var _k2 = __id26[0];
  var _v3 = __id26[1];
  var _e3;
  if (target === "lua") {
    _e3 = _body18;
  } else {
    _e3 = [join(["let", _k2, ["if", ["numeric?", _k2], ["parseInt", _k2], _k2]], _body18)];
  }
  return(["let", [_o1, _t, _k2, "nil"], ["%for", _o1, _k2, join(["let", [_v3, ["get", _o1, _k2]]], _e3)]]);
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var __r31 = unstash(Array.prototype.slice.call(arguments, 2));
  var _i2 = destash33(i, __r31);
  var _to = destash33(to, __r31);
  var __id27 = __r31;
  var _body19 = cut(__id27, 0);
  return(["let", _i2, 0, join(["while", ["<", _i2, _to]], _body19, [["inc", _i2]])]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var __r32 = unstash(Array.prototype.slice.call(arguments, 2));
  var _v4 = destash33(v, __r32);
  var _t1 = destash33(t, __r32);
  var __id28 = __r32;
  var _body20 = cut(__id28, 0);
  var _x145 = unique("x");
  var _i3 = unique("i");
  return(["let", [_x145, _t1], ["for", _i3, ["#", _x145], join(["let", [_v4, ["at", _x145, _i3]]], _body20)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var _xs = unstash(Array.prototype.slice.call(arguments, 0));
  var _l1 = [];
  var __o2 = _xs;
  var __i4 = undefined;
  for (__i4 in __o2) {
    var _x153 = __o2[__i4];
    var _e4;
    if (numeric63(__i4)) {
      _e4 = parseInt(__i4);
    } else {
      _e4 = __i4;
    }
    var __i41 = _e4;
    _l1[_x153] = true;
  }
  return(join(["obj"], _l1));
}});
setenv("language", {_stash: true, macro: function () {
  return(["quote", target]);
}});
setenv("target", {_stash: true, macro: function () {
  var _clauses1 = unstash(Array.prototype.slice.call(arguments, 0));
  return(_clauses1[target]);
}});
setenv("join!", {_stash: true, macro: function (a) {
  var __r34 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a1 = destash33(a, __r34);
  var __id29 = __r34;
  var _bs21 = cut(__id29, 0);
  return(["set", _a1, join(["join", _a1], _bs21)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var __r35 = unstash(Array.prototype.slice.call(arguments, 1));
  var _a2 = destash33(a, __r35);
  var __id30 = __r35;
  var _bs3 = cut(__id30, 0);
  return(["set", _a2, join(["cat", _a2], _bs3)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var _e5;
  if (nil63(by)) {
    _e5 = 1;
  } else {
    _e5 = by;
  }
  return(["set", n, ["+", n, _e5]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var _e6;
  if (nil63(by)) {
    _e6 = 1;
  } else {
    _e6 = by;
  }
  return(["set", n, ["-", n, _e6]]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var _x164 = unique("x");
  return(["do", ["inc", "indent-level"], ["with", _x164, form, ["dec", "indent-level"]]]);
}});
setenv("export", {_stash: true, macro: function () {
  var _names2 = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, _names2)));
  } else {
    var _x173 = {};
    var __o3 = _names2;
    var __i5 = undefined;
    for (__i5 in __o3) {
      var _k3 = __o3[__i5];
      var _e7;
      if (numeric63(__i5)) {
        _e7 = parseInt(__i5);
      } else {
        _e7 = __i5;
      }
      var __i51 = _e7;
      _x173[_k3] = _k3;
    }
    return(["return", join(["%object"], mapo(function (x) {
      return(x);
    }, _x173))]);
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var _body21 = unstash(Array.prototype.slice.call(arguments, 0));
  return(eval(join(["do"], _body21)));
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
    if (is63(_v)) {
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
  var _in = process.stdin;
  _in.setEncoding("utf8");
  return(_in.on("data", rep1));
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
var script_file63 = function (path) {
  return(!( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4)));
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
  if (_arg && script_file63(_arg)) {
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
      while (_i < _35(_argv)) {
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
      while (__i1 < _35(__x2)) {
        var _file = __x2[__i1];
        run_file(_file);
        __i1 = __i1 + 1;
      }
      if (nil63(_input)) {
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
        if (nil63(_output) || _output === "-") {
          return(print(_code1));
        } else {
          return(system["write-file"](_output, _code1));
        }
      }
    }
  }
};
main();
