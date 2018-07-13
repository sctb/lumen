environment = [{}];
target = "js";
nil63 = function (x) {
  return x === undefined || x === null;
};
is63 = function (x) {
  return ! nil63(x);
};
no = function (x) {
  return nil63(x) || x === false;
};
yes = function (x) {
  return ! no(x);
};
either = function (x, y) {
  if (is63(x)) {
    return x;
  } else {
    return y;
  }
};
has63 = function (l, k) {
  return l.hasOwnProperty(k);
};
_35 = function (x) {
  return x.length || 0;
};
none63 = function (x) {
  return _35(x) === 0;
};
some63 = function (x) {
  return _35(x) > 0;
};
one63 = function (x) {
  return _35(x) === 1;
};
two63 = function (x) {
  return _35(x) === 2;
};
hd = function (l) {
  return l[0];
};
type = function (x) {
  return typeof(x);
};
string63 = function (x) {
  return type(x) === "string";
};
number63 = function (x) {
  return type(x) === "number";
};
boolean63 = function (x) {
  return type(x) === "boolean";
};
function63 = function (x) {
  return type(x) === "function";
};
obj63 = function (x) {
  return is63(x) && type(x) === "object";
};
atom63 = function (x) {
  return nil63(x) || string63(x) || number63(x) || boolean63(x);
};
nan = 0 / 0;
inf = 1 / 0;
_inf = - inf;
nan63 = function (n) {
  return !( n === n);
};
inf63 = function (n) {
  return n === inf || n === _inf;
};
clip = function (s, from, upto) {
  return s.substring(from, upto);
};
cut = function (x, from, upto) {
  var __l = [];
  var __j = 0;
  var __e;
  if (nil63(from) || from < 0) {
    __e = 0;
  } else {
    __e = from;
  }
  var __i = __e;
  var __n = _35(x);
  var __e1;
  if (nil63(upto) || upto > __n) {
    __e1 = __n;
  } else {
    __e1 = upto;
  }
  var __upto = __e1;
  while (__i < __upto) {
    __l[__j] = x[__i];
    __i = __i + 1;
    __j = __j + 1;
  }
  var ____o = x;
  var __k = undefined;
  for (__k in ____o) {
    var __v = ____o[__k];
    var __e2;
    if (numeric63(__k)) {
      __e2 = parseInt(__k);
    } else {
      __e2 = __k;
    }
    var __k1 = __e2;
    if (! number63(__k1)) {
      __l[__k1] = __v;
    }
  }
  return __l;
};
keys = function (x) {
  var __t = [];
  var ____o1 = x;
  var __k2 = undefined;
  for (__k2 in ____o1) {
    var __v1 = ____o1[__k2];
    var __e3;
    if (numeric63(__k2)) {
      __e3 = parseInt(__k2);
    } else {
      __e3 = __k2;
    }
    var __k3 = __e3;
    if (! number63(__k3)) {
      __t[__k3] = __v1;
    }
  }
  return __t;
};
edge = function (x) {
  return _35(x) - 1;
};
inner = function (x) {
  return clip(x, 1, edge(x));
};
tl = function (l) {
  return cut(l, 1);
};
char = function (s, n) {
  return s.charAt(n);
};
code = function (s, n) {
  return s.charCodeAt(n);
};
fromCode = function (n) {
  return String.fromCharCode(n);
};
lowercase63 = function (n) {
  return n > 96 && n < 123;
};
camelCase = function (str) {
  var __s = "";
  var __n3 = _35(str);
  var __i3 = 0;
  while (__i3 < __n3) {
    var __c = code(str, __i3);
    if (__c === 45 && lowercase63(code(str, __i3 - 1) || 0) && lowercase63(code(str, __i3 + 1) || 0)) {
      __i3 = __i3 + 1;
      __c = code(str, __i3) - 32;
    }
    __s = __s + fromCode(__c);
    __i3 = __i3 + 1;
  }
  return __s;
};
stringLiteral63 = function (x) {
  return string63(x) && char(x, 0) === "\"";
};
idLiteral63 = function (x) {
  return string63(x) && char(x, 0) === "|";
};
add = function (l, x) {
  l.push(x);
  return undefined;
};
drop = function (l) {
  return l.pop();
};
last = function (l) {
  return l[edge(l)];
};
almost = function (l) {
  return cut(l, 0, edge(l));
};
reverse = function (l) {
  var __l1 = keys(l);
  var __i4 = edge(l);
  while (__i4 >= 0) {
    add(__l1, l[__i4]);
    __i4 = __i4 - 1;
  }
  return __l1;
};
reduce = function (f, x) {
  if (none63(x)) {
    return undefined;
  } else {
    if (one63(x)) {
      return hd(x);
    } else {
      return f(hd(x), reduce(f, tl(x)));
    }
  }
};
join = function () {
  var __ls = unstash(Array.prototype.slice.call(arguments, 0));
  var __r40 = [];
  var ____x1 = __ls;
  var ____i5 = 0;
  while (____i5 < _35(____x1)) {
    var __l11 = ____x1[____i5];
    if (__l11) {
      var __n4 = _35(__r40);
      var ____o2 = __l11;
      var __k4 = undefined;
      for (__k4 in ____o2) {
        var __v2 = ____o2[__k4];
        var __e4;
        if (numeric63(__k4)) {
          __e4 = parseInt(__k4);
        } else {
          __e4 = __k4;
        }
        var __k5 = __e4;
        if (number63(__k5)) {
          __k5 = __k5 + __n4;
        }
        __r40[__k5] = __v2;
      }
    }
    ____i5 = ____i5 + 1;
  }
  return __r40;
};
find = function (f, t) {
  var ____o3 = t;
  var ____i7 = undefined;
  for (____i7 in ____o3) {
    var __x2 = ____o3[____i7];
    var __e5;
    if (numeric63(____i7)) {
      __e5 = parseInt(____i7);
    } else {
      __e5 = ____i7;
    }
    var ____i71 = __e5;
    var __y = f(__x2);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x3 = l;
  var ____i8 = 0;
  while (____i8 < _35(____x3)) {
    var __x4 = ____x3[____i8];
    var __y1 = f(__x4);
    if (__y1) {
      return __y1;
    }
    ____i8 = ____i8 + 1;
  }
};
in63 = function (x, t) {
  return find(function (y) {
    return x === y;
  }, t);
};
pair = function (l) {
  var __l12 = [];
  var __i9 = 0;
  while (__i9 < _35(l)) {
    add(__l12, [l[__i9], l[__i9 + 1]]);
    __i9 = __i9 + 1;
    __i9 = __i9 + 1;
  }
  return __l12;
};
sort = function (l, f) {
  var __e6;
  if (f) {
    __e6 = function (a, b) {
      if (f(a, b)) {
        return -1;
      } else {
        return 1;
      }
    };
  }
  return l.sort(__e6);
};
map = function (f, x) {
  var __t1 = [];
  var ____x6 = x;
  var ____i10 = 0;
  while (____i10 < _35(____x6)) {
    var __v3 = ____x6[____i10];
    var __y2 = f(__v3);
    if (is63(__y2)) {
      add(__t1, __y2);
    }
    ____i10 = ____i10 + 1;
  }
  var ____o4 = x;
  var __k6 = undefined;
  for (__k6 in ____o4) {
    var __v4 = ____o4[__k6];
    var __e7;
    if (numeric63(__k6)) {
      __e7 = parseInt(__k6);
    } else {
      __e7 = __k6;
    }
    var __k7 = __e7;
    if (! number63(__k7)) {
      var __y3 = f(__v4);
      if (is63(__y3)) {
        __t1[__k7] = __y3;
      }
    }
  }
  return __t1;
};
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
keys63 = function (t) {
  var ____o5 = t;
  var __k8 = undefined;
  for (__k8 in ____o5) {
    var __v5 = ____o5[__k8];
    var __e8;
    if (numeric63(__k8)) {
      __e8 = parseInt(__k8);
    } else {
      __e8 = __k8;
    }
    var __k9 = __e8;
    if (! number63(__k9)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o6 = t;
  var ____i13 = undefined;
  for (____i13 in ____o6) {
    var __x7 = ____o6[____i13];
    var __e9;
    if (numeric63(____i13)) {
      __e9 = parseInt(____i13);
    } else {
      __e9 = ____i13;
    }
    var ____i131 = __e9;
    return false;
  }
  return true;
};
stash = function (args) {
  if (keys63(args)) {
    var __p = [];
    var ____o7 = args;
    var __k10 = undefined;
    for (__k10 in ____o7) {
      var __v6 = ____o7[__k10];
      var __e10;
      if (numeric63(__k10)) {
        __e10 = parseInt(__k10);
      } else {
        __e10 = __k10;
      }
      var __k11 = __e10;
      if (! number63(__k11)) {
        __p[__k11] = __v6;
      }
    }
    __p._stash = true;
    add(args, __p);
  }
  return args;
};
unstash = function (args) {
  if (none63(args)) {
    return [];
  } else {
    var __l2 = last(args);
    if (obj63(__l2) && __l2._stash) {
      var __args1 = almost(args);
      var ____o8 = __l2;
      var __k12 = undefined;
      for (__k12 in ____o8) {
        var __v7 = ____o8[__k12];
        var __e11;
        if (numeric63(__k12)) {
          __e11 = parseInt(__k12);
        } else {
          __e11 = __k12;
        }
        var __k13 = __e11;
        if (!( __k13 === "_stash")) {
          __args1[__k13] = __v7;
        }
      }
      return __args1;
    } else {
      return args;
    }
  }
};
destash33 = function (l, args1) {
  if (obj63(l) && l._stash) {
    var ____o9 = l;
    var __k14 = undefined;
    for (__k14 in ____o9) {
      var __v8 = ____o9[__k14];
      var __e12;
      if (numeric63(__k14)) {
        __e12 = parseInt(__k14);
      } else {
        __e12 = __k14;
      }
      var __k15 = __e12;
      if (!( __k15 === "_stash")) {
        args1[__k15] = __v8;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i17 = s.indexOf(pattern, start);
  if (__i17 >= 0) {
    return __i17;
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return [];
  } else {
    var __l3 = [];
    var __n13 = _35(sep);
    while (true) {
      var __i18 = search(s, sep);
      if (nil63(__i18)) {
        break;
      } else {
        add(__l3, clip(s, 0, __i18));
        s = clip(s, __i18 + __n13);
      }
    }
    add(__l3, s);
    return __l3;
  }
};
cat = function () {
  var __xs = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a + b;
  }, __xs), "");
};
_43 = function () {
  var __xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a + b;
  }, __xs1), 0);
};
_45 = function () {
  var __xs2 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a - b;
  }, reverse(__xs2)), 0);
};
_42 = function () {
  var __xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a * b;
  }, __xs3), 1);
};
_47 = function () {
  var __xs4 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a / b;
  }, reverse(__xs4)), 1);
};
_37 = function () {
  var __xs5 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a % b;
  }, reverse(__xs5)), 0);
};
var pairwise = function (f, xs) {
  var __i19 = 0;
  while (__i19 < edge(xs)) {
    var __a = xs[__i19];
    var __b = xs[__i19 + 1];
    if (! f(__a, __b)) {
      return false;
    }
    __i19 = __i19 + 1;
  }
  return true;
};
_60 = function () {
  var __xs6 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a < b;
  }, __xs6);
};
_62 = function () {
  var __xs7 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a > b;
  }, __xs7);
};
_61 = function () {
  var __xs8 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a === b;
  }, __xs8);
};
_6061 = function () {
  var __xs9 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a <= b;
  }, __xs9);
};
_6261 = function () {
  var __xs10 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a >= b;
  }, __xs10);
};
number = function (s) {
  var __n14 = parseFloat(s);
  if (! isNaN(__n14)) {
    return __n14;
  }
};
numberCode63 = function (n) {
  return n > 47 && n < 58;
};
numeric63 = function (s) {
  var __n15 = _35(s);
  var __i20 = 0;
  while (__i20 < __n15) {
    if (! numberCode63(code(s, __i20))) {
      return false;
    }
    __i20 = __i20 + 1;
  }
  return some63(s);
};
var tostring = function (x) {
  return x.toString();
};
escape = function (s) {
  var __s1 = "\"";
  var __i21 = 0;
  while (__i21 < _35(s)) {
    var __c1 = char(s, __i21);
    var __e13;
    if (__c1 === "\n") {
      __e13 = "\\n";
    } else {
      var __e14;
      if (__c1 === "\r") {
        __e14 = "\\r";
      } else {
        var __e15;
        if (__c1 === "\"") {
          __e15 = "\\\"";
        } else {
          var __e16;
          if (__c1 === "\\") {
            __e16 = "\\\\";
          } else {
            __e16 = __c1;
          }
          __e15 = __e16;
        }
        __e14 = __e15;
      }
      __e13 = __e14;
    }
    var __c11 = __e13;
    __s1 = __s1 + __c11;
    __i21 = __i21 + 1;
  }
  return __s1 + "\"";
};
str = function (x, stack) {
  if (nil63(x)) {
    return "nil";
  } else {
    if (nan63(x)) {
      return "nan";
    } else {
      if (x === inf) {
        return "inf";
      } else {
        if (x === _inf) {
          return "-inf";
        } else {
          if (boolean63(x)) {
            if (x) {
              return "true";
            } else {
              return "false";
            }
          } else {
            if (string63(x)) {
              return escape(x);
            } else {
              if (atom63(x)) {
                return tostring(x);
              } else {
                if (function63(x)) {
                  return "function";
                } else {
                  if (stack && in63(x, stack)) {
                    return "circular";
                  } else {
                    if (false) {
                      return escape(tostring(x));
                    } else {
                      var __s11 = "(";
                      var __sp = "";
                      var __xs11 = [];
                      var __ks = [];
                      var __l4 = stack || [];
                      add(__l4, x);
                      var ____o10 = x;
                      var __k16 = undefined;
                      for (__k16 in ____o10) {
                        var __v9 = ____o10[__k16];
                        var __e17;
                        if (numeric63(__k16)) {
                          __e17 = parseInt(__k16);
                        } else {
                          __e17 = __k16;
                        }
                        var __k17 = __e17;
                        if (number63(__k17)) {
                          __xs11[__k17] = str(__v9, __l4);
                        } else {
                          add(__ks, __k17 + ":");
                          add(__ks, str(__v9, __l4));
                        }
                      }
                      drop(__l4);
                      var ____o11 = join(__xs11, __ks);
                      var ____i23 = undefined;
                      for (____i23 in ____o11) {
                        var __v10 = ____o11[____i23];
                        var __e18;
                        if (numeric63(____i23)) {
                          __e18 = parseInt(____i23);
                        } else {
                          __e18 = ____i23;
                        }
                        var ____i231 = __e18;
                        __s11 = __s11 + __sp + __v10;
                        __sp = " ";
                      }
                      return __s11 + ")";
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
  var __args = stash(args);
  return f.apply(f, __args);
};
call = function (f) {
  var ____r77 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f = destash33(f, ____r77);
  var ____id = ____r77;
  var __args11 = cut(____id, 0);
  return apply(__f, __args11);
};
setenv = function (k) {
  var ____r78 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k18 = destash33(k, ____r78);
  var ____id1 = ____r78;
  var __keys = cut(____id1, 0);
  if (string63(__k18)) {
    var __e19;
    if (__keys.toplevel) {
      __e19 = hd(environment);
    } else {
      __e19 = last(environment);
    }
    var __frame = __e19;
    var __entry = __frame[__k18] || {};
    var ____o12 = __keys;
    var __k19 = undefined;
    for (__k19 in ____o12) {
      var __v11 = ____o12[__k19];
      var __e20;
      if (numeric63(__k19)) {
        __e20 = parseInt(__k19);
      } else {
        __e20 = __k19;
      }
      var __k20 = __e20;
      __entry[__k20] = __v11;
    }
    __frame[__k18] = __entry;
    return __frame[__k18];
  }
};
print = function (x) {
  return console.log(x);
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
  return quoted(form);
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return quasiexpand(form, 1);
}});
setenv("set", {_stash: true, macro: function () {
  var __args = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["do"], map(function (__x1) {
    var ____id = __x1;
    var __lh = ____id[0];
    var __rh = ____id[1];
    return ["%set", __lh, __rh];
  }, pair(__args)));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (target === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (target === "lua") {
      i = ["+", i, 1];
    }
  }
  return ["get", l, i];
}});
setenv("wipe", {_stash: true, macro: function (place) {
  if (target === "lua") {
    return ["set", place, "nil"];
  } else {
    return ["%delete", place];
  }
}});
setenv("list", {_stash: true, macro: function () {
  var __body = unstash(Array.prototype.slice.call(arguments, 0));
  var __x7 = unique("x");
  var __l = [];
  var __forms = [];
  var ____o = __body;
  var __k = undefined;
  for (__k in ____o) {
    var __v = ____o[__k];
    var __e;
    if (numeric63(__k)) {
      __e = parseInt(__k);
    } else {
      __e = __k;
    }
    var __k1 = __e;
    if (number63(__k1)) {
      __l[__k1] = __v;
    } else {
      add(__forms, ["set", ["get", __x7, ["quote", __k1]], __v]);
    }
  }
  if (some63(__forms)) {
    return join(["let", __x7, join(["%array"], __l)], __forms, [__x7]);
  } else {
    return join(["%array"], __l);
  }
}});
setenv("if", {_stash: true, macro: function () {
  var __branches = unstash(Array.prototype.slice.call(arguments, 0));
  return hd(expandIf(__branches));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var ____r5 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expr = destash33(expr, ____r5);
  var ____id1 = ____r5;
  var __clauses = cut(____id1, 0);
  var __x15 = unique("x");
  var __eq = function (_) {
    return ["=", ["quote", _], __x15];
  };
  var __cl = function (__x18) {
    var ____id2 = __x18;
    var __a = ____id2[0];
    var __b = ____id2[1];
    if (nil63(__b)) {
      return [__a];
    } else {
      if (string63(__a) || number63(__a)) {
        return [__eq(__a), __b];
      } else {
        if (one63(__a)) {
          return [__eq(hd(__a)), __b];
        } else {
          if (_35(__a) > 1) {
            return [join(["or"], map(__eq, __a)), __b];
          }
        }
      }
    }
  };
  return ["let", __x15, __expr, join(["if"], apply(join, map(__cl, pair(__clauses))))];
}});
setenv("when", {_stash: true, macro: function (cond) {
  var ____r8 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond = destash33(cond, ____r8);
  var ____id3 = ____r8;
  var __body1 = cut(____id3, 0);
  return ["if", __cond, join(["do"], __body1)];
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var ____r9 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond1 = destash33(cond, ____r9);
  var ____id4 = ____r9;
  var __body2 = cut(____id4, 0);
  return ["if", ["not", __cond1], join(["do"], __body2)];
}});
setenv("obj", {_stash: true, macro: function () {
  var __body3 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%object"], mapo(function (x) {
    return x;
  }, __body3));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var ____r11 = unstash(Array.prototype.slice.call(arguments, 1));
  var __bs = destash33(bs, ____r11);
  var ____id5 = ____r11;
  var __body4 = cut(____id5, 0);
  if (atom63(__bs)) {
    return join(["let", [__bs, hd(__body4)]], tl(__body4));
  } else {
    if (none63(__bs)) {
      return join(["do"], __body4);
    } else {
      var ____id6 = __bs;
      var __lh1 = ____id6[0];
      var __rh1 = ____id6[1];
      var __bs2 = cut(____id6, 2);
      var ____id7 = bind(__lh1, __rh1);
      var __id8 = ____id7[0];
      var __val = ____id7[1];
      var __bs1 = cut(____id7, 2);
      var __renames = [];
      if (! idLiteral63(__id8)) {
        var __id11 = unique(__id8);
        __renames = [__id8, __id11];
        __id8 = __id11;
      }
      return ["do", ["%local", __id8, __val], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], __body4)]];
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var ____r12 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x40 = destash33(x, ____r12);
  var __v1 = destash33(v, ____r12);
  var ____id9 = ____r12;
  var __body5 = cut(____id9, 0);
  return join(["let", [__x40, __v1]], __body5, [__x40]);
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var ____r13 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x44 = destash33(x, ____r13);
  var __v2 = destash33(v, ____r13);
  var ____id10 = ____r13;
  var __body6 = cut(____id10, 0);
  var __y = unique("y");
  return ["let", __y, __v2, ["when", ["yes", __y], join(["let", [__x44, __y]], __body6)]];
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var ____r14 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name = destash33(name, ____r14);
  var __args1 = destash33(args, ____r14);
  var ____id111 = ____r14;
  var __body7 = cut(____id111, 0);
  var ____x50 = ["setenv", ["quote", __name]];
  ____x50.macro = join(["fn", __args1], __body7);
  var __form = ____x50;
  return __form;
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var ____r15 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name1 = destash33(name, ____r15);
  var __args2 = destash33(args, ____r15);
  var ____id12 = ____r15;
  var __body8 = cut(____id12, 0);
  var ____x53 = ["setenv", ["quote", __name1]];
  ____x53.special = join(["fn", __args2], __body8);
  var __form1 = join(____x53, keys(__body8));
  return __form1;
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var ____x56 = ["setenv", ["quote", name]];
  ____x56.symbol = ["quote", expansion];
  return ____x56;
}});
setenv("define-reader", {_stash: true, macro: function (__x59) {
  var ____id13 = __x59;
  var __char = ____id13[0];
  var __s = ____id13[1];
  var ____r17 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x59 = destash33(__x59, ____r17);
  var ____id14 = ____r17;
  var __body9 = cut(____id14, 0);
  return ["set", ["get", "read-table", __char], join(["fn", [__s]], __body9)];
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var ____r18 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name2 = destash33(name, ____r18);
  var __x64 = destash33(x, ____r18);
  var ____id15 = ____r18;
  var __body10 = cut(____id15, 0);
  setenv(__name2, {_stash: true, variable: true});
  if (some63(__body10)) {
    return join(["%local-function", __name2], bind42(__x64, __body10));
  } else {
    return ["%local", __name2, __x64];
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var ____r19 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name3 = destash33(name, ____r19);
  var __x67 = destash33(x, ____r19);
  var ____id16 = ____r19;
  var __body11 = cut(____id16, 0);
  setenv(__name3, {_stash: true, toplevel: true, variable: true});
  if (some63(__body11)) {
    return join(["%global-function", __name3], bind42(__x67, __body11));
  } else {
    return ["set", __name3, __x67];
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var __body12 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x70 = unique("x");
  return ["do", ["add", "environment", ["obj"]], ["with", __x70, join(["do"], __body12), ["drop", "environment"]]];
}});
setenv("with-bindings", {_stash: true, macro: function (__x77) {
  var ____id17 = __x77;
  var __names = ____id17[0];
  var ____r20 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x77 = destash33(__x77, ____r20);
  var ____id18 = ____r20;
  var __body13 = cut(____id18, 0);
  var __x78 = unique("x");
  var ____x81 = ["setenv", __x78];
  ____x81.variable = true;
  return join(["with-frame", ["each", __x78, __names, ____x81]], __body13);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var ____r21 = unstash(Array.prototype.slice.call(arguments, 1));
  var __definitions = destash33(definitions, ____r21);
  var ____id19 = ____r21;
  var __body14 = cut(____id19, 0);
  add(environment, {});
  map(function (m) {
    return _eval(join(["define-macro"], m));
  }, __definitions);
  var ____x82 = join(["do"], macroexpand(__body14));
  drop(environment);
  return ____x82;
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r23 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions = destash33(expansions, ____r23);
  var ____id20 = ____r23;
  var __body15 = cut(____id20, 0);
  add(environment, {});
  map(function (__x86) {
    var ____id21 = __x86;
    var __name4 = ____id21[0];
    var __exp = ____id21[1];
    return macroexpand(["define-symbol", __name4, __exp]);
  }, pair(__expansions));
  var ____x85 = join(["do"], macroexpand(__body15));
  drop(environment);
  return ____x85;
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r25 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names1 = destash33(names, ____r25);
  var ____id22 = ____r25;
  var __body16 = cut(____id22, 0);
  var __bs11 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names1);
  return join(["let", apply(join, __bs11)], __body16);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r27 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args3 = destash33(args, ____r27);
  var ____id23 = ____r27;
  var __body17 = cut(____id23, 0);
  return join(["%function"], bind42(__args3, __body17));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var ____r28 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f = destash33(f, ____r28);
  var ____id24 = ____r28;
  var __args4 = cut(____id24, 0);
  if (_35(__args4) > 1) {
    return ["%call", "apply", __f, ["join", join(["list"], almost(__args4)), last(__args4)]];
  } else {
    return join(["%call", "apply", __f], __args4);
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  } else {
    var ____x109 = ["obj"];
    ____x109.stack = ["debug", [".traceback"]];
    ____x109.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x109]]]];
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r30 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x119 = destash33(x, ____r30);
  var __t = destash33(t, ____r30);
  var ____id25 = ____r30;
  var __body18 = cut(____id25, 0);
  var __o1 = unique("o");
  var __n1 = unique("n");
  var __i1 = unique("i");
  var __e1;
  if (atom63(__x119)) {
    __e1 = [__i1, __x119];
  } else {
    var __e2;
    if (_35(__x119) > 1) {
      __e2 = __x119;
    } else {
      __e2 = [__i1, hd(__x119)];
    }
    __e1 = __e2;
  }
  var ____id26 = __e1;
  var __k2 = ____id26[0];
  var __v3 = ____id26[1];
  var __e3;
  if (target === "lua") {
    __e3 = __body18;
  } else {
    __e3 = [join(["let", __k2, ["if", ["numeric?", __k2], ["parseInt", __k2], __k2]], __body18)];
  }
  return ["let", [__o1, __t, __k2, "nil"], ["%for", __o1, __k2, join(["let", [__v3, ["get", __o1, __k2]]], __e3)]];
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var ____r31 = unstash(Array.prototype.slice.call(arguments, 2));
  var __i2 = destash33(i, ____r31);
  var __to = destash33(to, ____r31);
  var ____id27 = ____r31;
  var __body19 = cut(____id27, 0);
  return ["let", __i2, 0, join(["while", ["<", __i2, __to]], __body19, [["inc", __i2]])];
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r32 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v4 = destash33(v, ____r32);
  var __t1 = destash33(t, ____r32);
  var ____id28 = ____r32;
  var __body20 = cut(____id28, 0);
  var __x138 = unique("x");
  var __i3 = unique("i");
  return ["let", [__x138, __t1], ["for", __i3, ["#", __x138], join(["let", [__v4, ["at", __x138, __i3]]], __body20)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs = unstash(Array.prototype.slice.call(arguments, 0));
  var __l1 = [];
  var ____o2 = __xs;
  var ____i4 = undefined;
  for (____i4 in ____o2) {
    var __x146 = ____o2[____i4];
    var __e4;
    if (numeric63(____i4)) {
      __e4 = parseInt(____i4);
    } else {
      __e4 = ____i4;
    }
    var ____i41 = __e4;
    __l1[__x146] = true;
  }
  return join(["obj"], __l1);
}});
setenv("language", {_stash: true, macro: function () {
  return ["quote", target];
}});
setenv("target", {_stash: true, macro: function () {
  var __clauses1 = unstash(Array.prototype.slice.call(arguments, 0));
  return __clauses1[target];
}});
setenv("join!", {_stash: true, macro: function (a) {
  var ____r34 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a1 = destash33(a, ____r34);
  var ____id29 = ____r34;
  var __bs21 = cut(____id29, 0);
  return ["set", __a1, join(["join", __a1], __bs21)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r35 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a2 = destash33(a, ____r35);
  var ____id30 = ____r35;
  var __bs3 = cut(____id30, 0);
  return ["set", __a2, join(["cat", __a2], __bs3)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e5;
  if (nil63(by)) {
    __e5 = 1;
  } else {
    __e5 = by;
  }
  return ["set", n, ["+", n, __e5]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e6;
  if (nil63(by)) {
    __e6 = 1;
  } else {
    __e6 = by;
  }
  return ["set", n, ["-", n, __e6]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x157 = unique("x");
  return ["do", ["inc", "indent-level"], ["with", __x157, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names2 = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return join(["do"], map(function (k) {
      return ["set", ["exports", "." + k], k];
    }, __names2));
  } else {
    var __x165 = {};
    var ____o3 = __names2;
    var ____i5 = undefined;
    for (____i5 in ____o3) {
      var __k3 = ____o3[____i5];
      var __e7;
      if (numeric63(____i5)) {
        __e7 = parseInt(____i5);
      } else {
        __e7 = ____i5;
      }
      var ____i51 = __e7;
      var __k4 = compileId(__k3);
      __x165[__k4] = __k4;
    }
    return ["return", join(["%object"], mapo(function (x) {
      return x;
    }, __x165))];
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body21 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["do"], __body21));
}});
setenv("during-compilation", {_stash: true, macro: function () {
  var __body22 = unstash(Array.prototype.slice.call(arguments, 0));
  var __form2 = join(["do"], __body22);
  _eval(__form2);
  return __form2;
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
var evalPrint = function (form) {
  var ____id = (function () {
    try {
      return [true, compiler.eval(form)];
    }
    catch (__e) {
      return [false, __e];
    }
  })();
  var __ok = ____id[0];
  var __v = ____id[1];
  if (! __ok) {
    return print(__v.stack);
  } else {
    if (is63(__v)) {
      return print(str(__v));
    }
  }
};
var rep = function (s) {
  return evalPrint(reader.readString(s));
};
var repl = function () {
  var __buf = "";
  var rep1 = function (s) {
    __buf = __buf + s;
    var __more = [];
    var __form = reader.readString(__buf, __more);
    if (!( __form === __more)) {
      evalPrint(__form);
      __buf = "";
      return system.write("> ");
    }
  };
  system.write("> ");
  var __in = process.stdin;
  __in.setEncoding("utf8");
  return __in.on("data", rep1);
};
compileFile = function (path) {
  var __s = reader.stream(system.readFile(path));
  var __body = reader.readAll(__s);
  var __form1 = compiler.expand(join(["do"], __body));
  return compiler.compile(__form1, {_stash: true, stmt: true});
};
_load = function (path) {
  var __previous = target;
  target = "js";
  var __code = compileFile(path);
  target = __previous;
  return compiler.run(__code);
};
var scriptFile63 = function (path) {
  return !( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4));
};
var runFile = function (path) {
  if (scriptFile63(path)) {
    return _load(path);
  } else {
    return compiler.run(system.readFile(path));
  }
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
  return print(" -e <expr>\tExpression to evaluate");
};
var main = function () {
  var __arg = hd(system.argv);
  if (__arg && scriptFile63(__arg)) {
    return _load(__arg);
  } else {
    if (__arg === "-h" || __arg === "--help") {
      return usage();
    } else {
      var __pre = [];
      var __input = undefined;
      var __output = undefined;
      var __target1 = undefined;
      var __expr = undefined;
      var __argv = system.argv;
      var __i = 0;
      while (__i < _35(__argv)) {
        var __a = __argv[__i];
        if (__a === "-c" || __a === "-o" || __a === "-t" || __a === "-e") {
          if (__i === edge(__argv)) {
            print("missing argument for " + __a);
          } else {
            __i = __i + 1;
            var __val = __argv[__i];
            if (__a === "-c") {
              __input = __val;
            } else {
              if (__a === "-o") {
                __output = __val;
              } else {
                if (__a === "-t") {
                  __target1 = __val;
                } else {
                  if (__a === "-e") {
                    __expr = __val;
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(__a, 0))) {
            add(__pre, __a);
          }
        }
        __i = __i + 1;
      }
      var ____x2 = __pre;
      var ____i1 = 0;
      while (____i1 < _35(____x2)) {
        var __file = ____x2[____i1];
        runFile(__file);
        ____i1 = ____i1 + 1;
      }
      if (nil63(__input)) {
        if (__expr) {
          return rep(__expr);
        } else {
          return repl();
        }
      } else {
        if (__target1) {
          target = __target1;
        }
        var __code1 = compileFile(__input);
        if (nil63(__output) || __output === "-") {
          return print(__code1);
        } else {
          return system.writeFile(__output, __code1);
        }
      }
    }
  }
};
main();
