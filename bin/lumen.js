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
  var _ue135;
  if (nil63(from) || from < 0) {
    _ue135 = 0;
  } else {
    _ue135 = from;
  }
  var i = _ue135;
  var n = _35(x);
  var _ue136;
  if (nil63(upto) || upto > n) {
    _ue136 = n;
  } else {
    _ue136 = upto;
  }
  var _uid120 = _ue136;
  while (i < _uid120) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _uo21 = x;
  var k = undefined;
  for (k in _uo21) {
    var v = _uo21[k];
    var _ue137;
    if (numeric63(k)) {
      _ue137 = parseInt(k);
    } else {
      _ue137 = k;
    }
    var _uid124 = _ue137;
    if (!number63(_uid124)) {
      l[_uid124] = v;
    }
  }
  return(l);
};
keys = function (x) {
  var t = [];
  var _uo26 = x;
  var k = undefined;
  for (k in _uo26) {
    var v = _uo26[k];
    var _ue138;
    if (numeric63(k)) {
      _ue138 = parseInt(k);
    } else {
      _ue138 = k;
    }
    var _uid129 = _ue138;
    if (!number63(_uid129)) {
      t[_uid129] = v;
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
    var _uo43 = a;
    var k = undefined;
    for (k in _uo43) {
      var v = _uo43[k];
      var _ue139;
      if (numeric63(k)) {
        _ue139 = parseInt(k);
      } else {
        _ue139 = k;
      }
      var _uid146 = _ue139;
      c[_uid146] = v;
    }
    var _uo47 = b;
    var k = undefined;
    for (k in _uo47) {
      var v = _uo47[k];
      var _ue140;
      if (numeric63(k)) {
        _ue140 = parseInt(k);
      } else {
        _ue140 = k;
      }
      var _uid150 = _ue140;
      if (number63(_uid150)) {
        _uid150 = _uid150 + o;
      }
      c[_uid150] = v;
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
  var _uo53 = t;
  var _ui55 = undefined;
  for (_ui55 in _uo53) {
    var x = _uo53[_ui55];
    var _ue141;
    if (numeric63(_ui55)) {
      _ue141 = parseInt(_ui55);
    } else {
      _ue141 = _ui55;
    }
    var _uid156 = _ue141;
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
  var _ue142;
  if (f) {
    _ue142 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_ue142));
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
  var _uo66 = x;
  var k = undefined;
  for (k in _uo66) {
    var v = _uo66[k];
    var _ue143;
    if (numeric63(k)) {
      _ue143 = parseInt(k);
    } else {
      _ue143 = k;
    }
    var _uid169 = _ue143;
    if (!number63(_uid169)) {
      var y = f(v);
      if (is63(y)) {
        t[_uid169] = y;
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
  var _uo73 = t;
  var k = undefined;
  for (k in _uo73) {
    var v = _uo73[k];
    var _ue144;
    if (numeric63(k)) {
      _ue144 = parseInt(k);
    } else {
      _ue144 = k;
    }
    var _uid176 = _ue144;
    if (!number63(_uid176)) {
      return(true);
    }
  }
  return(false);
};
empty63 = function (t) {
  var _uo78 = t;
  var _ui80 = undefined;
  for (_ui80 in _uo78) {
    var x = _uo78[_ui80];
    var _ue145;
    if (numeric63(_ui80)) {
      _ue145 = parseInt(_ui80);
    } else {
      _ue145 = _ui80;
    }
    var _uid181 = _ue145;
    return(false);
  }
  return(true);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _uo83 = args;
    var k = undefined;
    for (k in _uo83) {
      var v = _uo83[k];
      var _ue146;
      if (numeric63(k)) {
        _ue146 = parseInt(k);
      } else {
        _ue146 = k;
      }
      var _uid186 = _ue146;
      if (!number63(_uid186)) {
        p[_uid186] = v;
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
      var _uo88 = l;
      var k = undefined;
      for (k in _uo88) {
        var v = _uo88[k];
        var _ue147;
        if (numeric63(k)) {
          _ue147 = parseInt(k);
        } else {
          _ue147 = k;
        }
        var _uid191 = _ue147;
        if (!(_uid191 === "_stash")) {
          args1[_uid191] = v;
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
    var _ue148;
    if (c === "\n") {
      _ue148 = "\\n";
    } else {
      var _ue149;
      if (c === "\"") {
        _ue149 = "\\\"";
      } else {
        var _ue150;
        if (c === "\\") {
          _ue150 = "\\\\";
        } else {
          _ue150 = c;
        }
        _ue149 = _ue150;
      }
      _ue148 = _ue149;
    }
    var c1 = _ue148;
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
                    var _uo111 = x;
                    var k = undefined;
                    for (k in _uo111) {
                      var v = _uo111[k];
                      var _ue151;
                      if (numeric63(k)) {
                        _ue151 = parseInt(k);
                      } else {
                        _ue151 = k;
                      }
                      var _uid1114 = _ue151;
                      if (number63(_uid1114)) {
                        xs[_uid1114] = string(v, d);
                      } else {
                        add(ks, _uid1114 + ":");
                        add(ks, string(v, d));
                      }
                    }
                    var _uo115 = join(xs, ks);
                    var _ui117 = undefined;
                    for (_ui117 in _uo115) {
                      var v = _uo115[_ui117];
                      var _ue152;
                      if (numeric63(_ui117)) {
                        _ue152 = parseInt(_ui117);
                      } else {
                        _ue152 = _ui117;
                      }
                      var _uid1118 = _ue152;
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
  var _uid1120 = stash(args);
  return(f.apply(f, _uid1120));
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
  var _ur124 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = cut(_ur124, 0);
  if (string63(k)) {
    var _ue153;
    if (keys.toplevel) {
      _ue153 = hd(environment);
    } else {
      _ue153 = last(environment);
    }
    var frame = _ue153;
    var entry = frame[k] || {};
    var _uo125 = keys;
    var _uid1128 = undefined;
    for (_uid1128 in _uo125) {
      var v = _uo125[_uid1128];
      var _ue154;
      if (numeric63(_uid1128)) {
        _ue154 = parseInt(_uid1128);
      } else {
        _ue154 = _uid1128;
      }
      var _uid1129 = _ue154;
      entry[_uid1129] = v;
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
  var _uo30 = body;
  var k = undefined;
  for (k in _uo30) {
    var v = _uo30[k];
    var _ue398;
    if (numeric63(k)) {
      _ue398 = parseInt(k);
    } else {
      _ue398 = k;
    }
    var _uid133 = _ue398;
    if (number63(_uid133)) {
      l[_uid133] = v;
    } else {
      add(forms, ["set", ["get", id, ["quote", _uid133]], v]);
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
  var _ur45 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur45, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _ur52 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur52, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var _ur75 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur75, 0);
  if (atom63(bs)) {
    return(join(["let", [bs, hd(body)]], tl(body)));
  } else {
    if (none63(bs)) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bs[0];
      var rh = bs[1];
      var _uo79 = bind(lh, rh);
      var k = undefined;
      for (k in _uo79) {
        var _uid82 = _uo79[k];
        var id = _uid82[0];
        var val = _uid82[1];
        var _ue399;
        if (numeric63(k)) {
          _ue399 = parseInt(k);
        } else {
          _ue399 = k;
        }
        var _uid183 = _ue399;
        if (number63(_uid183)) {
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
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", cut(bs, 2)], body)]])));
    }
  }
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _ur93 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur93, 0);
  var _uid94 = ["setenv", ["quote", name]];
  _uid94.macro = join(["fn", args], body);
  var form = _uid94;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _ur101 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur101, 0);
  var _uid102 = ["setenv", ["quote", name]];
  _uid102.special = join(["fn", args], body);
  var form = join(_uid102, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _uid110 = ["setenv", ["quote", name]];
  _uid110.symbol = ["quote", expansion];
  return(_uid110);
}});
setenv("define-reader", {_stash: true, macro: function (_ux120) {
  var char = _ux120[0];
  var s = _ux120[1];
  var _ur119 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur119, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _ur128 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur128, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _ur134 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur134, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _ur145 = unstash(Array.prototype.slice.call(arguments, 0));
  var body = cut(_ur145, 0);
  var scope = _ur145.scope;
  var x = unique("x");
  var _uid148 = ["obj"];
  _uid148._scope = scope;
  return(["do", ["add", "environment", _uid148], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_ux159) {
  var names = _ux159[0];
  var _ur158 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur158, 0);
  var x = unique("x");
  var _uid162 = ["setenv", x];
  _uid162.variable = true;
  var _uid160 = ["with-frame", ["each", x, names, _uid162]];
  _uid160.scope = true;
  return(join(_uid160, body));
}});
setenv("let-fn", {_stash: true, macro: function (_ux169) {
  var name = _ux169[0];
  var args = _ux169[1];
  var fn_body = cut(_ux169, 2);
  var _ur168 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur168, 0);
  return(join(["let", [name, join(["fn", args], fn_body)]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _ur178 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur178, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _ux179 = join(["do"], macroexpand(body));
  drop(environment);
  return(_ux179);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _ur189 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur189, 0);
  add(environment, {});
  map(function (_ux192) {
    var name = _ux192[0];
    var exp = _ux192[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _ux190 = join(["do"], macroexpand(body));
  drop(environment);
  return(_ux190);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var _ur201 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur201, 0);
  var bs = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, names);
  return(join(["let", reduce(join, bs)], body));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _ur209 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur209, 0);
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
setenv("each", {_stash: true, macro: function (x, t) {
  var _ur250 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur250, 0);
  var o = unique("o");
  var n = unique("n");
  var i = unique("i");
  var _ue400;
  if (obj63(x)) {
    var _ue401;
    if (_35(x) > 1) {
      _ue401 = x;
    } else {
      _ue401 = [i, hd(x)];
    }
    _ue400 = _ue401;
  } else {
    _ue400 = [i, x];
  }
  var _uid251 = _ue400;
  var k = _uid251[0];
  var v = _uid251[1];
  var _ue402;
  if (target === "lua") {
    _ue402 = body;
  } else {
    _ue402 = [join(["let", [k, ["if", ["numeric?", k], ["parseInt", k], k]]], body)];
  }
  return(["let", [o, t, k, "nil"], ["%for", o, k, join(["let", [v, ["get", o, k]]], _ue402)]]);
}});
setenv("for", {_stash: true, macro: function (_ux275) {
  var i = _ux275[0];
  var to = _ux275[1];
  var _ur274 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur274, 0);
  return(["let", [i, 0], join(["while", ["<", i, to]], join(body, [["inc", i]]))]);
}});
setenv("across", {_stash: true, macro: function (_ux293) {
  var v = _ux293[0];
  var t = _ux293[1];
  var _ur292 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_ur292, 0);
  var x = unique("x");
  var n = unique("n");
  var i = unique("i");
  return(["let", [x, t, n, ["#", x]], ["for", [i, n], join(["let", [v, ["at", x, i]]], body)]]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var _ur311 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_ur311, 0);
  var x = unique("x");
  var n = unique("n");
  var i = unique("i");
  return(["let", [x, t, n, ["#", x]], ["for", [i, n], join(["let", [v, ["at", x, i]]], body)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _uo326 = xs;
  var _ui328 = undefined;
  for (_ui328 in _uo326) {
    var x = _uo326[_ui328];
    var _ue403;
    if (numeric63(_ui328)) {
      _ue403 = parseInt(_ui328);
    } else {
      _ue403 = _ui328;
    }
    var _uid1329 = _ue403;
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
  var _ur342 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_ur342, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _ur348 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_ur348, 0);
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
    var _uo392 = names;
    var _ui394 = undefined;
    for (_ui394 in _uo392) {
      var k = _uo392[_ui394];
      var _ue404;
      if (numeric63(_ui394)) {
        _ue404 = parseInt(_ui394);
      } else {
        _ue404 = _ui394;
      }
      var _uid1395 = _ue404;
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
