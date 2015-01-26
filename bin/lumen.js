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
nan63 = function (n) {
  return(!(n === n));
};
inf63 = function (n) {
  return(n === 1 / 0 || n === -(1 / 0));
};
clip = function (s, from, upto) {
  return(s.substring(from, upto));
};
cut = function (x, from, upto) {
  var l = [];
  var j = 0;
  var _u135;
  if (nil63(from) || from < 0) {
    _u135 = 0;
  } else {
    _u135 = from;
  }
  var i = _u135;
  var n = _35(x);
  var _u136;
  if (nil63(upto) || upto > n) {
    _u136 = n;
  } else {
    _u136 = upto;
  }
  var _u26 = _u136;
  while (i < _u26) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _u27 = x;
  var k = undefined;
  for (k in _u27) {
    var v = _u27[k];
    var _u137;
    if (numeric63(k)) {
      _u137 = parseInt(k);
    } else {
      _u137 = k;
    }
    var _u29 = _u137;
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
    var _u138;
    if (numeric63(k)) {
      _u138 = parseInt(k);
    } else {
      _u138 = k;
    }
    var _u33 = _u138;
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
      var _u139;
      if (numeric63(k)) {
        _u139 = parseInt(k);
      } else {
        _u139 = k;
      }
      var _u49 = _u139;
      c[_u49] = v;
    }
    var _u50 = b;
    var k = undefined;
    for (k in _u50) {
      var v = _u50[k];
      var _u140;
      if (numeric63(k)) {
        _u140 = parseInt(k);
      } else {
        _u140 = k;
      }
      var _u52 = _u140;
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
    var _u141;
    if (numeric63(_u1)) {
      _u141 = parseInt(_u1);
    } else {
      _u141 = _u1;
    }
    var _u1 = _u141;
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
  var _u142;
  if (f) {
    _u142 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u142));
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
    var _u143;
    if (numeric63(k)) {
      _u143 = parseInt(k);
    } else {
      _u143 = k;
    }
    var _u70 = _u143;
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
    var _u144;
    if (numeric63(k)) {
      _u144 = parseInt(k);
    } else {
      _u144 = k;
    }
    var _u76 = _u144;
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
    var _u145;
    if (numeric63(_u4)) {
      _u145 = parseInt(_u4);
    } else {
      _u145 = _u4;
    }
    var _u4 = _u145;
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
      var _u146;
      if (numeric63(k)) {
        _u146 = parseInt(k);
      } else {
        _u146 = k;
      }
      var _u83 = _u146;
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
        var _u147;
        if (numeric63(k)) {
          _u147 = parseInt(k);
        } else {
          _u147 = k;
        }
        var _u87 = _u147;
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
string = function (x, depth) {
  if (depth && depth > 7) {
    return("#<circular>");
  } else {
    if (nil63(x)) {
      return("nil");
    } else {
      if (nan63(x)) {
        return("#nan");
      } else {
        if (x === 1 / 0) {
          return("#+inf");
        } else {
          if (x === -(1 / 0)) {
            return("#-inf");
          } else {
            if (boolean63(x)) {
              if (x) {
                return("#t");
              } else {
                return("#f");
              }
            } else {
              if (function63(x)) {
                return("#<function>");
              } else {
                if (atom63(x)) {
                  return(x + "");
                } else {
                  var s = "(";
                  var sp = "";
                  var xs = [];
                  var ks = [];
                  var d = (depth || 0) + 1;
                  var _u105 = x;
                  var k = undefined;
                  for (k in _u105) {
                    var v = _u105[k];
                    var _u148;
                    if (numeric63(k)) {
                      _u148 = parseInt(k);
                    } else {
                      _u148 = k;
                    }
                    var _u107 = _u148;
                    if (number63(_u107)) {
                      xs[_u107] = string(v, d);
                    } else {
                      add(ks, _u107 + ":");
                      add(ks, string(v, d));
                    }
                  }
                  var _u108 = join(xs, ks);
                  var _u6 = undefined;
                  for (_u6 in _u108) {
                    var v = _u108[_u6];
                    var _u149;
                    if (numeric63(_u6)) {
                      _u149 = parseInt(_u6);
                    } else {
                      _u149 = _u6;
                    }
                    var _u6 = _u149;
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
};
var produces_string63 = function (x) {
  return(string_literal63(x) || obj63(x) && (hd(x) === "cat" || hd(x) === "string"));
};
space = function (xs) {
  var string = function (x) {
    if (produces_string63(x)) {
      return(x);
    } else {
      return(["string", x]);
    }
  };
  if (one63(xs)) {
    return(string(hd(xs)));
  } else {
    return(reduce(function (a, b) {
      return(["cat", string(a), "\" \"", string(b)]);
    }, xs));
  }
};
apply = function (f, args) {
  var _u117 = stash(args);
  return(f.apply(f, _u117));
};
call = function (f) {
  return(f());
};
var _u119 = 0;
unique = function () {
  _u119 = _u119 + 1;
  return("_u" + _u119);
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
  var _u124 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = cut(_u124, 0);
  if (string63(k)) {
    var _u150;
    if (keys.toplevel) {
      _u150 = hd(environment);
    } else {
      _u150 = last(environment);
    }
    var frame = _u150;
    var entry = frame[k] || {};
    var _u125 = keys;
    var _u127 = undefined;
    for (_u127 in _u125) {
      var v = _u125[_u127];
      var _u151;
      if (numeric63(_u127)) {
        _u151 = parseInt(_u127);
      } else {
        _u151 = _u127;
      }
      var _u128 = _u151;
      entry[_u128] = v;
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
argv = function () {
  return(cut(process.argv, 2));
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
  var l = [];
  var forms = [];
  var id = unique();
  var _u32 = body;
  var k = undefined;
  for (k in _u32) {
    var v = _u32[k];
    var _u337;
    if (numeric63(k)) {
      _u337 = parseInt(k);
    } else {
      _u337 = k;
    }
    var _u34 = _u337;
    if (number63(_u34)) {
      l[_u34] = v;
    } else {
      add(forms, ["set", ["get", id, ["quote", _u34]], v]);
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
  var _u46 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u46, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _u53 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u53, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bindings) {
  var _u73 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u73, 0);
  if (_35(bindings) < 2) {
    return(join(["do"], body));
  } else {
    var renames = [];
    var locals = [];
    var lh = bindings[0];
    var rh = bindings[1];
    var _u75 = bind(lh, rh);
    var k = undefined;
    for (k in _u75) {
      var _u77 = _u75[k];
      var id = _u77[0];
      var val = _u77[1];
      var _u338;
      if (numeric63(k)) {
        _u338 = parseInt(k);
      } else {
        _u338 = k;
      }
      var _u78 = _u338;
      if (number63(_u78)) {
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
  var _u88 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u88, 0);
  var _u89 = ["setenv", ["quote", name]];
  _u89.macro = join(["fn", args], body);
  var form = _u89;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _u96 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u96, 0);
  var _u97 = ["setenv", ["quote", name]];
  _u97.special = join(["fn", args], body);
  var form = join(_u97, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _u105 = ["setenv", ["quote", name]];
  _u105.symbol = ["quote", expansion];
  return(_u105);
}});
setenv("define-reader", {_stash: true, macro: function (_u115) {
  var char = _u115[0];
  var s = _u115[1];
  var _u114 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u114, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _u123 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u123, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _u129 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u129, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _u140 = unstash(Array.prototype.slice.call(arguments, 0));
  var body = cut(_u140, 0);
  var scope = _u140.scope;
  var x = unique();
  var _u143 = ["obj"];
  _u143._scope = scope;
  return(["do", ["add", "environment", _u143], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_u155) {
  var names = _u155[0];
  var _u154 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u154, 0);
  var x = unique();
  var _u159 = ["setenv", x];
  _u159.variable = true;
  var _u156 = ["with-frame", ["each", ["_u1", x], names, _u159]];
  _u156.scope = true;
  return(join(_u156, body));
}});
setenv("let-fn", {_stash: true, macro: function (_u166) {
  var name = _u166[0];
  var args = _u166[1];
  var fn_body = cut(_u166, 2);
  var _u165 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u165, 0);
  return(join(["let", [name, join(["fn", args], fn_body)]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _u175 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u175, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _u176 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u176);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _u186 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u186, 0);
  add(environment, {});
  map(function (_u189) {
    var name = _u189[0];
    var exp = _u189[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _u187 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u187);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _u194 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u194, 0);
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
setenv("each", {_stash: true, macro: function (_u232, t) {
  var k = _u232[0];
  var v = _u232[1];
  var _u231 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u231, 0);
  var x = unique();
  var n = unique();
  var _u339;
  if (target === "lua") {
    _u339 = body;
  } else {
    _u339 = [join(["let", [k, ["if", ["numeric?", k], ["parseInt", k], k]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u339)]]);
}});
setenv("for", {_stash: true, macro: function (_u254) {
  var i = _u254[0];
  var to = _u254[1];
  var _u253 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = cut(_u253, 0);
  return(["let", [i, 0], join(["while", ["<", i, to]], join(body, [["inc", i]]))]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _u265 = xs;
  var _u2 = undefined;
  for (_u2 in _u265) {
    var x = _u265[_u2];
    var _u340;
    if (numeric63(_u2)) {
      _u340 = parseInt(_u2);
    } else {
      _u340 = _u2;
    }
    var _u2 = _u340;
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
  var _u279 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_u279, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _u285 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = cut(_u285, 0);
  return(["set", a, join(["cat", a], bs)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  return(["set", n, ["+", n, by || 1]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  return(["set", n, ["-", n, by || 1]]);
}});
setenv("pr", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(["print", space(xs)]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var result = unique();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
setenv("#t", {_stash: true, symbol: true});
setenv("#f", {_stash: true, symbol: false});
setenv("#nan", {_stash: true, symbol: ["/", 0, 0]});
setenv("#+inf", {_stash: true, symbol: ["/", 1, 0]});
setenv("#-inf", {_stash: true, symbol: ["-", ["/", 1, 0]]});
setenv("export", {_stash: true, macro: function () {
  var names = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, names)));
  } else {
    var x = {};
    var _u333 = names;
    var _u3 = undefined;
    for (_u3 in _u333) {
      var k = _u333[_u3];
      var _u341;
      if (numeric63(_u3)) {
        _u341 = parseInt(_u3);
      } else {
        _u341 = _u3;
      }
      var _u3 = _u341;
      x[k] = k;
    }
    return(["return", join(["obj"], x)]);
  }
}});
var reader = require("reader");
var compiler = require("compiler");
var rep = function (s) {
  var form = reader["read-string"](s);
  var _u3 = (function () {
    try {
      return([true, compiler.eval(form)]);
    }
    catch (_u10) {
      return([false, _u10.message]);
    }
  })();
  var _u1 = _u3[0];
  var x = _u3[1];
  if (is63(x)) {
    return(print(string(x)));
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
  var as = argv();
  if (hd(as) === "-h" || hd(as) === "--help") {
    usage();
  }
  var pre = [];
  var input = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var n = _35(as);
  var i = 0;
  while (i < n) {
    var a = as[i];
    if (a === "-c" || a === "-o" || a === "-t" || a === "-e") {
      if (i === n - 1) {
        print("missing argument for" + " " + string(a));
      } else {
        i = i + 1;
        var val = as[i];
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
