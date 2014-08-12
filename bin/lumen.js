environment = [{}];
current_module = undefined;
modules = {};
nil63 = function (x) {
  return(x === undefined || x === null);
};
is63 = function (x) {
  return(!nil63(x));
};
length = function (x) {
  return(x.length || 0);
};
none63 = function (x) {
  return(length(x) === 0);
};
some63 = function (x) {
  return(length(x) > 0);
};
one63 = function (x) {
  return(length(x) === 1);
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
composite63 = function (x) {
  return(is63(x) && type(x) === "object");
};
atom63 = function (x) {
  return(nil63(x) || !composite63(x));
};
table63 = function (x) {
  return(composite63(x) && nil63(hd(x)));
};
list63 = function (x) {
  return(composite63(x) && is63(hd(x)));
};
hd61 = function (l, x) {
  return(list63(l) && hd(l) === x);
};
substring = function (s, from, upto) {
  return(s.substring(from, upto));
};
sub = function (x, from, upto) {
  if (string63(x)) {
    return(substring(x, from || 0, upto));
  } else {
    var l = [];
    var j = 0;
    var _u144;
    if (nil63(from) || from < 0) {
      _u144 = 0;
    } else {
      _u144 = from;
    }
    var i = _u144;
    var n = length(x);
    var _u145;
    if (nil63(upto) || upto > n) {
      _u145 = n;
    } else {
      _u145 = upto;
    }
    var _u26 = _u145;
    while (i < _u26) {
      l[j] = x[i];
      i = i + 1;
      j = j + 1;
    }
    var _u27 = x;
    var k = undefined;
    for (k in _u27) {
      var v = _u27[k];
      var _u28 = parseInt(k);
      var _u146;
      if (isNaN(_u28)) {
        _u146 = k;
      } else {
        _u146 = _u28;
      }
      var _u29 = _u146;
      if (!number63(_u29)) {
        l[_u29] = v;
      }
    }
    return(l);
  }
};
keys = function (x) {
  var t = [];
  var _u31 = x;
  var k = undefined;
  for (k in _u31) {
    var v = _u31[k];
    var _u32 = parseInt(k);
    var _u147;
    if (isNaN(_u32)) {
      _u147 = k;
    } else {
      _u147 = _u32;
    }
    var _u33 = _u147;
    if (!number63(_u33)) {
      t[_u33] = v;
    }
  }
  return(t);
};
inner = function (x) {
  return(sub(x, 1, length(x) - 1));
};
tl = function (l) {
  return(sub(l, 1));
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
  return(l[length(l) - 1]);
};
butlast = function (l) {
  return(sub(l, 0, length(l) - 1));
};
reverse = function (l) {
  var l1 = keys(l);
  var i = length(l) - 1;
  while (i >= 0) {
    add(l1, l[i]);
    i = i - 1;
  }
  return(l1);
};
join = function (a, b) {
  if (a && b) {
    var c = [];
    var o = length(a);
    var _u46 = a;
    var k = undefined;
    for (k in _u46) {
      var v = _u46[k];
      var _u47 = parseInt(k);
      var _u148;
      if (isNaN(_u47)) {
        _u148 = k;
      } else {
        _u148 = _u47;
      }
      var _u48 = _u148;
      c[_u48] = v;
    }
    var _u49 = b;
    var k = undefined;
    for (k in _u49) {
      var v = _u49[k];
      var _u50 = parseInt(k);
      var _u149;
      if (isNaN(_u50)) {
        _u149 = k;
      } else {
        _u149 = _u50;
      }
      var _u51 = _u149;
      if (number63(_u51)) {
        _u51 = _u51 + o;
      }
      c[_u51] = v;
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
shift = function (k, n) {
  if (number63(k)) {
    return(k - n);
  } else {
    return(k);
  }
};
keep = function (f, x) {
  var t = [];
  var o = 0;
  var _u55 = x;
  var k = undefined;
  for (k in _u55) {
    var v = _u55[k];
    var _u56 = parseInt(k);
    var _u150;
    if (isNaN(_u56)) {
      _u150 = k;
    } else {
      _u150 = _u56;
    }
    var _u57 = _u150;
    if (f(v)) {
      t[shift(_u57, o)] = v;
    } else {
      o = o + 1;
    }
  }
  return(t);
};
in63 = function (x, t) {
  var _u59 = t;
  var _u1 = undefined;
  for (_u1 in _u59) {
    var y = _u59[_u1];
    var _u60 = parseInt(_u1);
    var _u151;
    if (isNaN(_u60)) {
      _u151 = _u1;
    } else {
      _u151 = _u60;
    }
    var _u61 = _u151;
    if (x === y) {
      return(true);
    }
  }
};
find = function (f, t) {
  var _u63 = t;
  var _u2 = undefined;
  for (_u2 in _u63) {
    var x = _u63[_u2];
    var _u64 = parseInt(_u2);
    var _u152;
    if (isNaN(_u64)) {
      _u152 = _u2;
    } else {
      _u152 = _u64;
    }
    var _u65 = _u152;
    var _u66 = f(x);
    if (_u66) {
      return(_u66);
    }
  }
};
pair = function (l) {
  var i = 0;
  var l1 = [];
  while (i < length(l)) {
    add(l1, [l[i], l[i + 1]]);
    i = i + 2;
  }
  return(l1);
};
sort = function (l, f) {
  var _u153;
  if (f) {
    _u153 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u153));
};
iterate = function (f, count) {
  var i = 0;
  while (i < count) {
    f(i);
    i = i + 1;
  }
};
replicate = function (n, x) {
  var l = [];
  iterate(function () {
    return(add(l, x));
  }, n);
  return(l);
};
series = function (f, l) {
  return(iterate(function (i) {
    return(f(l[i]));
  }, length(l)));
};
map = function (f, x) {
  var t = [];
  var o = 0;
  var _u77 = x;
  var k = undefined;
  for (k in _u77) {
    var v = _u77[k];
    var _u78 = parseInt(k);
    var _u154;
    if (isNaN(_u78)) {
      _u154 = k;
    } else {
      _u154 = _u78;
    }
    var _u79 = _u154;
    var y = f(v);
    if (is63(y)) {
      t[shift(_u79, o)] = y;
    } else {
      o = o + 1;
    }
  }
  return(t);
};
keys63 = function (t) {
  var b = false;
  var _u81 = t;
  var k = undefined;
  for (k in _u81) {
    var _u3 = _u81[k];
    var _u82 = parseInt(k);
    var _u155;
    if (isNaN(_u82)) {
      _u155 = k;
    } else {
      _u155 = _u82;
    }
    var _u83 = _u155;
    if (!number63(_u83)) {
      b = true;
      break;
    }
  }
  return(b);
};
empty63 = function (t) {
  var b = true;
  var _u85 = t;
  var _u4 = undefined;
  for (_u4 in _u85) {
    var _u5 = _u85[_u4];
    var _u86 = parseInt(_u4);
    var _u156;
    if (isNaN(_u86)) {
      _u156 = _u4;
    } else {
      _u156 = _u86;
    }
    var _u87 = _u156;
    b = false;
    break;
  }
  return(b);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _u89 = args;
    var k = undefined;
    for (k in _u89) {
      var v = _u89[k];
      var _u90 = parseInt(k);
      var _u157;
      if (isNaN(_u90)) {
        _u157 = k;
      } else {
        _u157 = _u90;
      }
      var _u91 = _u157;
      if (!number63(_u91)) {
        p[_u91] = v;
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
    if (table63(l) && l._stash) {
      var args1 = butlast(args);
      var _u93 = l;
      var k = undefined;
      for (k in _u93) {
        var v = _u93[k];
        var _u94 = parseInt(k);
        var _u158;
        if (isNaN(_u94)) {
          _u158 = k;
        } else {
          _u158 = _u94;
        }
        var _u95 = _u158;
        if (!(_u95 === "_stash")) {
          args1[_u95] = v;
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
    while (true) {
      var i = search(s, sep);
      if (nil63(i)) {
        break;
      } else {
        add(l, sub(s, 0, i));
        s = sub(s, i + 1);
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
global.require = require;
fs = require("fs");
filename = function (path) {
  var from = 0;
  var to = undefined;
  var i = length(path) - 1;
  while (i >= 0) {
    var c = char(path, i);
    if (c === "/") {
      break;
    } else {
      if (c === "." && nil63(to)) {
        to = i;
      } else {
        start = i;
      }
    }
    i = i - 1;
  }
  return(sub(path, start, to));
};
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
today = function () {
  var pad = function (n) {
    if (n < 10) {
      return("0" + n);
    } else {
      return(string(n));
    }
  };
  var now = new Date();
  return(pad(now.getUTCFullYear()) + "-" + pad(now.getUTCMonth() + 1) + "-" + pad(now.getUTCDate()));
};
now = function () {
  return(Math.floor(new Date().getTime() / 1000));
};
number = function (s) {
  var n = parseFloat(s);
  if (!isNaN(n)) {
    return(n);
  }
};
string = function (x, depth) {
  if (depth && depth > 5) {
    return("#<circular>");
  } else {
    if (nil63(x)) {
      return("nil");
    } else {
      if (boolean63(x)) {
        if (x) {
          return("true");
        } else {
          return("false");
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
            var _u120 = x;
            var k = undefined;
            for (k in _u120) {
              var v = _u120[k];
              var _u121 = parseInt(k);
              var _u159;
              if (isNaN(_u121)) {
                _u159 = k;
              } else {
                _u159 = _u121;
              }
              var _u122 = _u159;
              if (number63(_u122)) {
                xs[_u122] = string(v, d);
              } else {
                add(ks, _u122 + ":");
                add(ks, string(v, d));
              }
            }
            var _u123 = join(xs, ks);
            var _u6 = undefined;
            for (_u6 in _u123) {
              var v = _u123[_u6];
              var _u124 = parseInt(_u6);
              var _u160;
              if (isNaN(_u124)) {
                _u160 = _u6;
              } else {
                _u160 = _u124;
              }
              var _u125 = _u160;
              s = s + sp + v;
              sp = " ";
            }
            return(s + ")");
          }
        }
      }
    }
  }
};
space = function (xs) {
  var string = function (x) {
    if (string_literal63(x) || hd61(x, "cat")) {
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
  var _u132 = stash(args);
  return(f.apply(f, _u132));
};
id_count = 0;
unique = function () {
  id_count = id_count + 1;
  return("_u" + id_count);
};
_37message_handler = function (msg) {
  var i = search(msg, ": ");
  return(sub(msg, i + 2));
};
toplevel63 = function () {
  return(one63(environment));
};
module_key = function (spec) {
  if (atom63(spec)) {
    return(string(spec));
  } else {
    return(reduce(function (a, b) {
      return(module_key(a) + "/" + module_key(b));
    }, spec));
  }
};
module = function (spec) {
  return(modules[module_key(spec)]);
};
setenv = function (k) {
  var _u139 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = sub(_u139, 0);
  if (string63(k)) {
    var frame = last(environment);
    var entry = frame[k] || {};
    var _u140 = keys;
    var _u142 = undefined;
    for (_u142 in _u140) {
      var v = _u140[_u142];
      var _u141 = parseInt(_u142);
      var _u161;
      if (isNaN(_u141)) {
        _u161 = _u142;
      } else {
        _u161 = _u141;
      }
      var _u143 = _u161;
      entry[_u143] = v;
    }
    frame[k] = entry;
  }
};
getenv = function (k, p) {
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
macro_function = function (k) {
  return(getenv(k, "macro"));
};
macro63 = function (k) {
  return(is63(macro_function(k)));
};
special63 = function (k) {
  return(is63(getenv(k, "special")));
};
special_form63 = function (form) {
  return(list63(form) && special63(hd(form)));
};
statement63 = function (k) {
  return(special63(k) && getenv(k, "stmt"));
};
symbol_expansion = function (k) {
  return(getenv(k, "symbol"));
};
symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};
variable63 = function (k) {
  var b = find(function (frame) {
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(table63(b) && is63(b.variable));
};
global63 = function (k) {
  return(getenv(k, "global"));
};
bound63 = function (x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < length(s)) {
    var c = char(s, i);
    var _u151;
    if (c === "\n") {
      _u151 = "\\n";
    } else {
      var _u152;
      if (c === "\"") {
        _u152 = "\\\"";
      } else {
        var _u153;
        if (c === "\\") {
          _u153 = "\\\\";
        } else {
          _u153 = c;
        }
        _u152 = _u153;
      }
      _u151 = _u152;
    }
    var c1 = _u151;
    s1 = s1 + c1;
    i = i + 1;
  }
  return(s1 + "\"");
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
literal = function (s) {
  if (string_literal63(s)) {
    return(s);
  } else {
    return(quoted(s));
  }
};
stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _u23 = args;
    var k = undefined;
    for (k in _u23) {
      var v = _u23[k];
      var _u24 = parseInt(k);
      var _u154;
      if (isNaN(_u24)) {
        _u154 = k;
      } else {
        _u154 = _u24;
      }
      var _u25 = _u154;
      if (!number63(_u25)) {
        add(l, literal(_u25));
        add(l, v);
      }
    }
    return(join(args, [l]));
  } else {
    return(args);
  }
};
index = function (k) {
  return(k);
};
bias = function (k) {
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
  if (composite63(lh) && list63(rh)) {
    var id = unique();
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _u34 = lh;
      var k = undefined;
      for (k in _u34) {
        var v = _u34[k];
        var _u35 = parseInt(k);
        var _u155;
        if (isNaN(_u35)) {
          _u155 = k;
        } else {
          _u155 = _u35;
        }
        var _u36 = _u155;
        var _u156;
        if (_u36 === "rest") {
          _u156 = ["sub", rh, length(lh)];
        } else {
          _u156 = ["get", rh, ["quote", bias(_u36)]];
        }
        var x = _u156;
        var _u157;
        if (v === true) {
          _u157 = _u36;
        } else {
          _u157 = v;
        }
        var _u40 = _u157;
        bs = join(bs, bind(_u40, x));
      }
      return(bs);
    }
  }
};
bind42 = function (args, body) {
  var args1 = [];
  var rest = function () {
    if (target === "js") {
      return(["unstash", [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", length(args1)]]);
    } else {
      add(args1, "|...|");
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([args1, [join(["let", [args, rest()]], body)]]);
  } else {
    var bs = [];
    var k63 = keys63(args);
    var r = unique();
    var _u57 = args;
    var k = undefined;
    for (k in _u57) {
      var v = _u57[k];
      var _u58 = parseInt(k);
      var _u158;
      if (isNaN(_u58)) {
        _u158 = k;
      } else {
        _u158 = _u58;
      }
      var _u59 = _u158;
      if (number63(_u59)) {
        if (atom63(v)) {
          add(args1, v);
        } else {
          var x = unique();
          add(args1, x);
          bs = join(bs, [v, x]);
        }
      }
    }
    if (k63) {
      bs = join(bs, [r, rest()]);
      bs = join(bs, [keys(args), r]);
    }
    return([args1, [join(["let", bs], body)]]);
  }
};
quoting63 = function (depth) {
  return(number63(depth));
};
quasiquoting63 = function (depth) {
  return(quoting63(depth) && depth > 0);
};
can_unquote63 = function (depth) {
  return(quoting63(depth) && depth === 1);
};
quasisplice63 = function (x, depth) {
  return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
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
        var _u1 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _u2 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _u74 = args;
          var _u76 = undefined;
          for (_u76 in _u74) {
            var _u72 = _u74[_u76];
            var _u75 = parseInt(_u76);
            var _u160;
            if (isNaN(_u75)) {
              _u160 = _u76;
            } else {
              _u160 = _u75;
            }
            var _u77 = _u160;
            setenv(_u72, {_stash: true, variable: true});
          }
          var _u73 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u73);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u79 = form[1];
            var _u80 = form[2];
            var _u81 = sub(form, 3);
            add(environment, {_scope: true});
            var _u84 = _u80;
            var _u86 = undefined;
            for (_u86 in _u84) {
              var _u82 = _u84[_u86];
              var _u85 = parseInt(_u86);
              var _u159;
              if (isNaN(_u85)) {
                _u159 = _u86;
              } else {
                _u159 = _u85;
              }
              var _u87 = _u159;
              setenv(_u82, {_stash: true, variable: true});
            }
            var _u83 = join([x, _u79, _u80], macroexpand(_u81));
            drop(environment);
            return(_u83);
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
quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var _u92 = form;
  var k = undefined;
  for (k in _u92) {
    var v = _u92[k];
    var _u93 = parseInt(k);
    var _u161;
    if (isNaN(_u93)) {
      _u161 = k;
    } else {
      _u161 = _u93;
    }
    var _u94 = _u161;
    if (!number63(_u94)) {
      var _u162;
      if (quasisplice63(v, depth)) {
        _u162 = quasiexpand(v[1]);
      } else {
        _u162 = quasiexpand(v, depth);
      }
      var _u95 = _u162;
      last(xs)[_u94] = _u95;
    }
  }
  series(function (x) {
    if (quasisplice63(x, depth)) {
      var _u97 = quasiexpand(x[1]);
      add(xs, _u97);
      return(add(xs, ["list"]));
    } else {
      return(add(last(xs), quasiexpand(x, depth)));
    }
  }, form);
  var pruned = keep(function (x) {
    return(length(x) > 1 || !(hd(x) === "list") || keys63(x));
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
expand_if = function (_u105) {
  var a = _u105[0];
  var b = _u105[1];
  var c = sub(_u105, 2);
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
  return(apply(cat, replicate(indent_level, "  ")));
};
setenv("with-indent", {_stash: true, macro: function (form) {
  var result = unique();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
reserved = {"function": true, "*": true, "or": true, "end": true, "var": true, "default": true, "break": true, ">": true, "this": true, "then": true, "void": true, "while": true, "return": true, "for": true, "in": true, "instanceof": true, "local": true, "nil": true, "continue": true, "debugger": true, "until": true, ">=": true, "-": true, "<=": true, "+": true, "with": true, "=": true, "finally": true, "catch": true, "not": true, "else": true, "throw": true, "elseif": true, "false": true, "repeat": true, "and": true, "typeof": true, "==": true, "case": true, "new": true, "<": true, "/": true, "%": true, "switch": true, "do": true, "if": true, "try": true, "delete": true, "true": true};
reserved63 = function (x) {
  return(reserved[x]);
};
numeric63 = function (n) {
  return(n > 47 && n < 58);
};
valid_code63 = function (n) {
  return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id)) {
    return(false);
  } else {
    var i = 0;
    while (i < length(id)) {
      if (!valid_code63(code(id, i))) {
        return(false);
      }
      i = i + 1;
    }
    return(true);
  }
};
id = function (id) {
  var id1 = "";
  var i = 0;
  while (i < length(id)) {
    var c = char(id, i);
    var n = code(c);
    var _u163;
    if (c === "-") {
      _u163 = "_";
    } else {
      var _u164;
      if (valid_code63(n)) {
        _u164 = c;
      } else {
        var _u165;
        if (i === 0) {
          _u165 = "_" + n;
        } else {
          _u165 = n;
        }
        _u164 = _u165;
      }
      _u163 = _u164;
    }
    var c1 = _u163;
    id1 = id1 + c1;
    i = i + 1;
  }
  return(id1);
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
imported = function (spec) {
  var _u128 = unstash(Array.prototype.slice.call(arguments, 1));
  var private = _u128.private;
  var m = unique();
  var k = module_key(spec);
  var imports = [];
  if (nexus[k]) {
    var _u129 = module(spec).export;
    var _u131 = undefined;
    for (_u131 in _u129) {
      var v = _u129[_u131];
      var _u130 = parseInt(_u131);
      var _u166;
      if (isNaN(_u130)) {
        _u166 = _u131;
      } else {
        _u166 = _u130;
      }
      var _u132 = _u166;
      if (v.variable && (private || v.export)) {
        add(imports, ["%local", _u132, ["get", m, ["quote", _u132]]]);
      }
    }
  }
  if (some63(imports)) {
    return(join([["%local", m, ["get", "nexus", ["quote", k]]]], imports));
  }
};
link = function (name, form) {
  if (toplevel63()) {
    var k = module_key(current_module);
    return(["do", form, ["set", ["get", ["get", "nexus", ["quote", k]], ["quote", name]], name]]);
  } else {
    return(form);
  }
};
mapo = function (f, t) {
  var o = [];
  var _u148 = t;
  var k = undefined;
  for (k in _u148) {
    var v = _u148[k];
    var _u149 = parseInt(k);
    var _u167;
    if (isNaN(_u149)) {
      _u167 = k;
    } else {
      _u167 = _u149;
    }
    var _u150 = _u167;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u150));
      add(o, x);
    }
  }
  return(o);
};
delimiters = {"\n": true, ")": true, "(": true, ";": true};
whitespace = {"\n": true, "\t": true, " ": true};
stream = function (str) {
  return({pos: 0, string: str, len: length(str)});
};
peek_char = function (s) {
  if (s.pos < s.len) {
    return(char(s.string, s.pos));
  }
};
read_char = function (s) {
  var c = peek_char(s);
  if (c) {
    s.pos = s.pos + 1;
    return(c);
  }
};
skip_non_code = function (s) {
  while (true) {
    var c = peek_char(s);
    if (nil63(c)) {
      break;
    } else {
      if (whitespace[c]) {
        read_char(s);
      } else {
        if (c === ";") {
          while (c && !(c === "\n")) {
            c = read_char(s);
          }
          skip_non_code(s);
        } else {
          break;
        }
      }
    }
  }
};
read_table = {};
eof = {};
read = function (s) {
  skip_non_code(s);
  var c = peek_char(s);
  if (is63(c)) {
    return((read_table[c] || read_table[""])(s));
  } else {
    return(eof);
  }
};
read_all = function (s) {
  var l = [];
  while (true) {
    var form = read(s);
    if (form === eof) {
      break;
    }
    add(l, form);
  }
  return(l);
};
read_from_string = function (str) {
  var x = read(stream(str));
  if (!(x === eof)) {
    return(x);
  }
};
key63 = function (atom) {
  return(string63(atom) && length(atom) > 1 && char(atom, length(atom) - 1) === ":");
};
flag63 = function (atom) {
  return(string63(atom) && length(atom) > 1 && char(atom, 0) === ":");
};
setenv("define-reader", {_stash: true, macro: function (_u18) {
  var char = _u18[0];
  var s = _u18[1];
  var _u17 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u17, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
read_table[""] = function (s) {
  var str = "";
  var dot63 = false;
  while (true) {
    var c = peek_char(s);
    if (c && (!whitespace[c] && !delimiters[c])) {
      if (c === ".") {
        dot63 = true;
      }
      str = str + c;
      read_char(s);
    } else {
      break;
    }
  }
  var n = number(str);
  if (is63(n)) {
    return(n);
  } else {
    if (str === "true") {
      return(true);
    } else {
      if (str === "false") {
        return(false);
      } else {
        if (str === "_") {
          return(unique());
        } else {
          if (dot63 && !one63(str)) {
            return(reduce(function (a, b) {
              return(["get", b, ["quote", a]]);
            }, reverse(split(str, "."))));
          } else {
            return(str);
          }
        }
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var l = [];
  while (true) {
    skip_non_code(s);
    var c = peek_char(s);
    if (c && !(c === ")")) {
      var x = read(s);
      if (key63(x)) {
        var k = butlast(x);
        var v = read(s);
        l[k] = v;
      } else {
        if (flag63(x)) {
          l[sub(x, 1)] = true;
        } else {
          add(l, x);
        }
      }
    } else {
      if (c) {
        read_char(s);
        break;
      } else {
        throw new Error("Expected ) at " + s.pos);
      }
    }
  }
  return(l);
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  read_char(s);
  var str = "\"";
  while (true) {
    var c = peek_char(s);
    if (c && !(c === "\"")) {
      if (c === "\\") {
        str = str + read_char(s);
      }
      str = str + read_char(s);
    } else {
      if (c) {
        read_char(s);
        break;
      } else {
        throw new Error("Expected \" at " + s.pos);
      }
    }
  }
  return(str + "\"");
};
read_table["|"] = function (s) {
  read_char(s);
  var str = "|";
  while (true) {
    var c = peek_char(s);
    if (c && !(c === "|")) {
      str = str + read_char(s);
    } else {
      if (c) {
        read_char(s);
        break;
      } else {
        throw new Error("Expected | at " + s.pos);
      }
    }
  }
  return(str + "|");
};
read_table["'"] = function (s) {
  read_char(s);
  return(["quote", read(s)]);
};
read_table["`"] = function (s) {
  read_char(s);
  return(["quasiquote", read(s)]);
};
read_table[","] = function (s) {
  read_char(s);
  if (peek_char(s) === "@") {
    read_char(s);
    return(["unquote-splicing", read(s)]);
  } else {
    return(["unquote", read(s)]);
  }
};
var _u3 = [];
var _u4 = [];
_u4.js = "!";
_u4.lua = "not ";
_u3["not"] = _u4;
var _u6 = [];
_u6["/"] = true;
_u6["*"] = true;
_u6["%"] = true;
var _u8 = [];
_u8["+"] = true;
_u8["-"] = true;
var _u10 = [];
var _u11 = [];
_u11.js = "+";
_u11.lua = "..";
_u10.cat = _u11;
var _u13 = [];
_u13["<="] = true;
_u13[">"] = true;
_u13[">="] = true;
_u13["<"] = true;
var _u15 = [];
var _u16 = [];
_u16.js = "===";
_u16.lua = "==";
_u15["="] = _u16;
var _u18 = [];
var _u19 = [];
_u19.js = "&&";
_u19.lua = "and";
_u18["and"] = _u19;
var _u21 = [];
var _u22 = [];
_u22.js = "||";
_u22.lua = "or";
_u21["or"] = _u22;
infix = [_u3, _u6, _u8, _u10, _u13, _u15, _u18, _u21];
unary63 = function (form) {
  return(length(form) === 2 && in63(hd(form), ["not", "-"]));
};
precedence = function (form) {
  if (list63(form) && !unary63(form)) {
    var _u26 = infix;
    var k = undefined;
    for (k in _u26) {
      var v = _u26[k];
      var _u27 = parseInt(k);
      var _u115;
      if (isNaN(_u27)) {
        _u115 = k;
      } else {
        _u115 = _u27;
      }
      var _u28 = _u115;
      if (v[hd(form)]) {
        return(index(_u28));
      }
    }
  }
  return(0);
};
getop = function (op) {
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
infix63 = function (x) {
  return(is63(getop(x)));
};
compile_args = function (args) {
  var s = "(";
  var c = "";
  series(function (x) {
    s = s + c + compile(x);
    c = ", ";
  }, args);
  return(s + ")");
};
compile_atom = function (x) {
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
          return(x);
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
terminator = function (stmt63) {
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
compile_special = function (form, stmt63) {
  var x = form[0];
  var args = sub(form, 1);
  var _u37 = getenv(x);
  var special = _u37.special;
  var self_tr63 = _u37.tr;
  var stmt = _u37.stmt;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
};
parenthesize_call63 = function (x) {
  return(hd61(x, "%function") || precedence(x) > 0);
};
compile_call = function (form) {
  var f = hd(form);
  var f1 = compile(f);
  var args = compile_args(stash42(tl(form)));
  if (parenthesize_call63(f)) {
    return("(" + f1 + ")" + args);
  } else {
    return(f1 + args);
  }
};
op_delims = function (parent, child) {
  var _u40 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u40.right;
  var _u116;
  if (right) {
    _u116 = _6261;
  } else {
    _u116 = _62;
  }
  if (_u116(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
compile_infix = function (form) {
  var op = form[0];
  var _u44 = sub(form, 1);
  var a = _u44[0];
  var b = _u44[1];
  var _u45 = op_delims(form, a);
  var ao = _u45[0];
  var ac = _u45[1];
  var _u46 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u46[0];
  var bc = _u46[1];
  var _u47 = compile(a);
  var _u48 = compile(b);
  var _u49 = getop(op);
  if (unary63(form)) {
    return(_u49 + ao + _u47 + ac);
  } else {
    return(ao + _u47 + ac + " " + _u49 + " " + bo + _u48 + bc);
  }
};
compile_function = function (args, body) {
  var _u50 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u50.name;
  var prefix = _u50.prefix;
  var _u117;
  if (name) {
    _u117 = compile(name);
  } else {
    _u117 = "";
  }
  var id = _u117;
  var _u51 = prefix || "";
  var _u52 = compile_args(args);
  indent_level = indent_level + 1;
  var _u54 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u53 = _u54;
  var ind = indentation();
  var _u118;
  if (target === "js") {
    _u118 = "";
  } else {
    _u118 = "end";
  }
  var tr = _u118;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u52 + " {\n" + _u53 + ind + "}" + tr);
  } else {
    return(_u51 + "function " + id + _u52 + "\n" + _u53 + ind + tr);
  }
};
can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u56 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u56.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u119;
      if (stmt) {
        _u119 = indentation();
      } else {
        _u119 = "";
      }
      var ind = _u119;
      var _u120;
      if (atom63(form)) {
        _u120 = compile_atom(form);
      } else {
        var _u121;
        if (infix63(hd(form))) {
          _u121 = compile_infix(form);
        } else {
          _u121 = compile_call(form);
        }
        _u120 = _u121;
      }
      var _u57 = _u120;
      return(ind + _u57 + tr);
    }
  }
};
lower_statement = function (form, tail63) {
  var hoist = [];
  var e = lower(form, hoist, true, tail63);
  if (some63(hoist) && is63(e)) {
    return(join(["do"], join(hoist, [e])));
  } else {
    if (is63(e)) {
      return(e);
    } else {
      if (length(hoist) > 1) {
        return(join(["do"], hoist));
      } else {
        return(hd(hoist));
      }
    }
  }
};
lower_body = function (body, tail63) {
  return(lower_statement(join(["do"], body), tail63));
};
lower_do = function (args, hoist, stmt63, tail63) {
  series(function (x) {
    return(add(hoist, lower(x, hoist, stmt63)));
  }, butlast(args));
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
lower_if = function (args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _u68 = args[1];
  var _u69 = args[2];
  if (stmt63 || tail63) {
    var _u123;
    if (_u69) {
      _u123 = [lower_body([_u69], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u68], tail63)], _u123)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u122;
    if (_u69) {
      _u122 = [lower(["set", e, _u69])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u68])], _u122));
    return(e);
  }
};
lower_short = function (x, args, hoist) {
  var a = args[0];
  var b = args[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var id = unique();
    var _u124;
    if (x === "and") {
      _u124 = ["%if", id, b, id];
    } else {
      _u124 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u124], hoist));
  } else {
    return([x, lower(a, hoist), b1]);
  }
};
lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
lower_while = function (args, hoist) {
  var c = args[0];
  var body = sub(args, 1);
  return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
};
lower_for = function (args, hoist) {
  var t = args[0];
  var k = args[1];
  var body = sub(args, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
};
lower_function = function (args) {
  var a = args[0];
  var body = sub(args, 1);
  return(["%function", a, lower_body(body, true)]);
};
lower_definition = function (kind, args, hoist) {
  var name = args[0];
  var _u94 = args[1];
  var body = sub(args, 2);
  return(add(hoist, [kind, name, _u94, lower_body(body, true)]));
};
lower_call = function (form, hoist) {
  var _u97 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u97)) {
    return(_u97);
  }
};
lower_infix63 = function (form) {
  return(infix63(hd(form)) && length(form) > 3);
};
lower_infix = function (form, hoist) {
  var x = form[0];
  var args = sub(form, 1);
  return(lower(reduce(function (a, b) {
    return([x, b, a]);
  }, reverse(args)), hoist));
};
lower_special = function (form, hoist) {
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
          var args = sub(form, 1);
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
                      if (in63(x, ["%local-function", "%global-function"])) {
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
expand = function (form) {
  return(lower(macroexpand(form)));
};
vm = require("vm");
run = function (code) {
  return(vm.runInThisContext(code));
};
_37result = undefined;
eval = function (form) {
  var previous = target;
  target = "js";
  var code = compile(expand(["set", "%result", form]));
  target = previous;
  run(code);
  return(_37result);
};
load_file = function (path) {
  return(run(read_file(path)));
};
compile_file = function (input, output) {
  var s = stream(read_file(input));
  var body = read_all(s);
  var form = expand(join(["do"], body));
  return(write_file(output, compile(form)));
};
setenv("do", {_stash: true, tr: true, stmt: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  series(function (x) {
    s = s + compile(x, {_stash: true, stmt: true});
  }, forms);
  return(s);
}});
setenv("%if", {_stash: true, tr: true, stmt: true, special: function (cond, cons, alt) {
  var _u12 = compile(cond);
  indent_level = indent_level + 1;
  var _u14 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u13 = _u14;
  var _u97;
  if (alt) {
    indent_level = indent_level + 1;
    var _u16 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u97 = _u16;
  }
  var _u15 = _u97;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u12 + ") {\n" + _u13 + ind + "}";
  } else {
    s = s + ind + "if " + _u12 + " then\n" + _u13;
  }
  if (_u15 && target === "js") {
    s = s + " else {\n" + _u15 + ind + "}";
  } else {
    if (_u15) {
      s = s + ind + "else\n" + _u15;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}});
setenv("while", {_stash: true, tr: true, stmt: true, special: function (cond, form) {
  var _u21 = compile(cond);
  indent_level = indent_level + 1;
  var _u22 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u22;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u21 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u21 + " do\n" + body + ind + "end\n");
  }
}});
setenv("%for", {_stash: true, tr: true, stmt: true, special: function (t, k, form) {
  var _u27 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u28 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u28;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u27 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u27 + ") {\n" + body + ind + "}\n");
  }
}});
setenv("%try", {_stash: true, tr: true, stmt: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u36 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u36;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u40 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u40;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
}});
setenv("break", {_stash: true, special: function () {
  return(indentation() + "break");
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%global-function", {_stash: true, tr: true, stmt: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}});
setenv("%local-function", {_stash: true, tr: true, stmt: true, special: function (name, args, body) {
  var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
  return(indentation() + x);
}});
setenv("return", {_stash: true, special: function (x) {
  var _u98;
  if (nil63(x)) {
    _u98 = "return";
  } else {
    _u98 = "return(" + compile(x) + ")";
  }
  var _u57 = _u98;
  return(indentation() + _u57);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u99;
  if (target === "js") {
    _u99 = "throw new " + compile(["Error", x]);
  } else {
    _u99 = "error(" + compile(x) + ")";
  }
  var e = _u99;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u100;
  if (is63(value)) {
    _u100 = " = " + value1;
  } else {
    _u100 = "";
  }
  var rh = _u100;
  var _u101;
  if (target === "js") {
    _u101 = "var ";
  } else {
    _u101 = "local ";
  }
  var keyword = _u101;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u72 = compile(lh);
  var _u102;
  if (nil63(rh)) {
    _u102 = "nil";
  } else {
    _u102 = rh;
  }
  var _u73 = compile(_u102);
  return(indentation() + _u72 + " = " + _u73);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u77 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u77, 0) === "{") {
    _u77 = "(" + _u77 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u77 + "." + inner(k));
  } else {
    return(_u77 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u103;
  if (target === "lua") {
    _u103 = "{";
  } else {
    _u103 = "[";
  }
  var open = _u103;
  var _u104;
  if (target === "lua") {
    _u104 = "}";
  } else {
    _u104 = "]";
  }
  var close = _u104;
  var s = "";
  var c = "";
  var _u83 = forms;
  var k = undefined;
  for (k in _u83) {
    var v = _u83[k];
    var _u84 = parseInt(k);
    var _u105;
    if (isNaN(_u84)) {
      _u105 = k;
    } else {
      _u105 = _u84;
    }
    var _u85 = _u105;
    if (number63(_u85)) {
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
  var _u106;
  if (target === "lua") {
    _u106 = " = ";
  } else {
    _u106 = ": ";
  }
  var sep = _u106;
  var _u92 = pair(forms);
  var k = undefined;
  for (k in _u92) {
    var v = _u92[k];
    var _u93 = parseInt(k);
    var _u107;
    if (isNaN(_u93)) {
      _u107 = k;
    } else {
      _u107 = _u93;
    }
    var _u94 = _u107;
    if (number63(_u94)) {
      var _u95 = v[0];
      var _u96 = v[1];
      if (!string63(_u95)) {
        throw new Error("Illegal key: " + string(_u95));
      }
      s = s + c + key(_u95) + sep + compile(_u96);
      c = ", ";
    }
  }
  return(s + "}");
}});
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
setenv("list", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var forms = [];
  var id = unique();
  var _u24 = body;
  var k = undefined;
  for (k in _u24) {
    var v = _u24[k];
    var _u25 = parseInt(k);
    var _u274;
    if (isNaN(_u25)) {
      _u274 = k;
    } else {
      _u274 = _u25;
    }
    var _u26 = _u274;
    if (number63(_u26)) {
      l[_u26] = v;
    } else {
      add(forms, ["set", ["get", id, ["quote", _u26]], v]);
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
  var _u40 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u40, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _u48 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u48, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("table", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bindings) {
  var _u68 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u68, 0);
  if (length(bindings) < 2) {
    return(join(["do"], body));
  } else {
    var renames = [];
    var locals = [];
    var lh = bindings[0];
    var rh = bindings[1];
    var _u70 = bind(lh, rh);
    var k = undefined;
    for (k in _u70) {
      var _u72 = _u70[k];
      var id = _u72[0];
      var val = _u72[1];
      var _u71 = parseInt(k);
      var _u275;
      if (isNaN(_u71)) {
        _u275 = k;
      } else {
        _u275 = _u71;
      }
      var _u73 = _u275;
      if (number63(_u73)) {
        if (bound63(id) || reserved63(id) || toplevel63()) {
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
    return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
  }
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _u84 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u84, 0);
  var _u85 = ["setenv", ["quote", name]];
  _u85.macro = join(["fn", args], body);
  var form = _u85;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _u93 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u93, 0);
  var _u94 = ["setenv", ["quote", name]];
  _u94.special = join(["fn", args], body);
  var form = join(_u94, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _u100 = ["setenv", name];
  _u100.symbol = expansion;
  return(_u100);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _u107 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u107, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    var _u108 = bind42(x, body);
    var args = _u108[0];
    var _u109 = _u108[1];
    return(join(["%global-function", name, args], _u109));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _u121 = unstash(Array.prototype.slice.call(arguments, 0));
  var body = sub(_u121, 0);
  var scope = _u121.scope;
  var x = unique();
  var _u124 = ["table"];
  _u124._scope = scope;
  return(["do", ["add", "environment", _u124], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_u137) {
  var names = _u137[0];
  var _u136 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u136, 0);
  var x = unique();
  var _u141 = ["setenv", x];
  _u141.variable = true;
  var _u138 = ["with-frame", ["all", ["_u1", x], names, _u141]];
  _u138.scope = true;
  return(join(_u138, body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _u148 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u148, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _u149 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u149);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _u160 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u160, 0);
  add(environment, {});
  map(function (_u163) {
    var name = _u163[0];
    var exp = _u163[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _u161 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u161);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _u172 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u172, 0);
  var _u173 = bind42(args, body);
  var _u174 = _u173[0];
  var _u175 = _u173[1];
  return(join(["%function", _u174], _u175));
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
setenv("all", {_stash: true, macro: function (_u214, t) {
  var k = _u214[0];
  var v = _u214[1];
  var _u213 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u213, 0);
  var x = unique();
  var n = unique();
  var _u276;
  if (target === "lua") {
    _u276 = body;
  } else {
    _u276 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u276)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _u231 = xs;
  var _u2 = undefined;
  for (_u2 in _u231) {
    var x = _u231[_u2];
    var _u232 = parseInt(_u2);
    var _u277;
    if (isNaN(_u232)) {
      _u277 = _u2;
    } else {
      _u277 = _u232;
    }
    var _u233 = _u277;
    l[x] = true;
  }
  return(join(["table"], l));
}});
target = "js";
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
  var _u249 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u249, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _u256 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u256, 0);
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
rep = function (s) {
  var _u3 = (function () {
    try {
      return([true, eval(read_from_string(s))]);
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
repl = function () {
  write("> ");
  var rep1 = function (s) {
    rep(s);
    return(write("> "));
  };
  process.stdin.setEncoding("utf8");
  return(process.stdin.on("data", rep1));
};
usage = function () {
  print("usage: lumen [options] <object files>");
  print("options:");
  print("  -c <input>\tInput file");
  print("  -o <output>\tOutput file");
  print("  -t <target>\tTarget language (default: lua)");
  print("  -e <expr>\tExpression to evaluate");
  return(exit());
};
main = function () {
  var args = sub(process.argv, 2);
  if (hd(args) === "-h" || hd(args) === "--help") {
    usage();
  }
  var load = [];
  var input = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var n = length(args);
  var i = 0;
  while (i < n) {
    var arg = args[i];
    if (arg === "-c" || arg === "-o" || arg === "-t" || arg === "-e") {
      if (i === n - 1) {
        print("missing argument for" + " " + string(arg));
      } else {
        i = i + 1;
        var val = args[i];
        if (arg === "-c") {
          input = val;
        } else {
          if (arg === "-o") {
            output = val;
          } else {
            if (arg === "-t") {
              target1 = val;
            } else {
              if (arg === "-e") {
                expr = val;
              }
            }
          }
        }
      }
    } else {
      if (!("-" === char(arg, 0))) {
        add(load, arg);
      }
    }
    i = i + 1;
  }
  series(load_file, load);
  if (input && output) {
    if (target1) {
      target = target1;
    }
    return(compile_file(input, output));
  } else {
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
main();
