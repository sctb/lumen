environment = [{}];
target = "js";
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
substring = function (s, from, upto) {
  return(s.substring(from, upto));
};
sub = function (x, from, upto) {
  if (string63(x)) {
    return(substring(x, from || 0, upto));
  } else {
    var l = [];
    var j = 0;
    var _u135;
    if (nil63(from) || from < 0) {
      _u135 = 0;
    } else {
      _u135 = from;
    }
    var i = _u135;
    var n = length(x);
    var _u136;
    if (nil63(upto) || upto > n) {
      _u136 = n;
    } else {
      _u136 = upto;
    }
    var _u25 = _u136;
    while (i < _u25) {
      l[j] = x[i];
      i = i + 1;
      j = j + 1;
    }
    var _u26 = x;
    var k = undefined;
    for (k in _u26) {
      var v = _u26[k];
      var _u27 = parseInt(k);
      var _u137;
      if (isNaN(_u27)) {
        _u137 = k;
      } else {
        _u137 = _u27;
      }
      var _u28 = _u137;
      if (!number63(_u28)) {
        l[_u28] = v;
      }
    }
    return(l);
  }
};
keys = function (x) {
  var t = [];
  var _u30 = x;
  var k = undefined;
  for (k in _u30) {
    var v = _u30[k];
    var _u31 = parseInt(k);
    var _u138;
    if (isNaN(_u31)) {
      _u138 = k;
    } else {
      _u138 = _u31;
    }
    var _u32 = _u138;
    if (!number63(_u32)) {
      t[_u32] = v;
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
    var _u45 = a;
    var k = undefined;
    for (k in _u45) {
      var v = _u45[k];
      var _u46 = parseInt(k);
      var _u139;
      if (isNaN(_u46)) {
        _u139 = k;
      } else {
        _u139 = _u46;
      }
      var _u47 = _u139;
      c[_u47] = v;
    }
    var _u48 = b;
    var k = undefined;
    for (k in _u48) {
      var v = _u48[k];
      var _u49 = parseInt(k);
      var _u140;
      if (isNaN(_u49)) {
        _u140 = k;
      } else {
        _u140 = _u49;
      }
      var _u50 = _u140;
      if (number63(_u50)) {
        _u50 = _u50 + o;
      }
      c[_u50] = v;
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
  var _u54 = x;
  var k = undefined;
  for (k in _u54) {
    var v = _u54[k];
    var _u55 = parseInt(k);
    var _u141;
    if (isNaN(_u55)) {
      _u141 = k;
    } else {
      _u141 = _u55;
    }
    var _u56 = _u141;
    if (f(v)) {
      t[shift(_u56, o)] = v;
    } else {
      o = o + 1;
    }
  }
  return(t);
};
find = function (f, t) {
  var _u58 = t;
  var _u1 = undefined;
  for (_u1 in _u58) {
    var x = _u58[_u1];
    var _u59 = parseInt(_u1);
    var _u142;
    if (isNaN(_u59)) {
      _u142 = _u1;
    } else {
      _u142 = _u59;
    }
    var _u60 = _u142;
    var _u61 = f(x);
    if (_u61) {
      return(_u61);
    }
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
  while (i < length(l)) {
    add(l1, [l[i], l[i + 1]]);
    i = i + 2;
  }
  return(l1);
};
sort = function (l, f) {
  var _u143;
  if (f) {
    _u143 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u143));
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
first = function (f, l) {
  var i = 0;
  var n = length(l);
  while (i < n) {
    var x = f(l[i]);
    if (x) {
      return(x);
    }
    i = i + 1;
  }
};
map = function (f, x) {
  var t = [];
  var o = 0;
  var _u75 = x;
  var k = undefined;
  for (k in _u75) {
    var v = _u75[k];
    var _u76 = parseInt(k);
    var _u144;
    if (isNaN(_u76)) {
      _u144 = k;
    } else {
      _u144 = _u76;
    }
    var _u77 = _u144;
    var y = f(v);
    if (is63(y)) {
      t[shift(_u77, o)] = y;
    } else {
      o = o + 1;
    }
  }
  return(t);
};
keys63 = function (t) {
  var b = false;
  var _u79 = t;
  var k = undefined;
  for (k in _u79) {
    var _u2 = _u79[k];
    var _u80 = parseInt(k);
    var _u145;
    if (isNaN(_u80)) {
      _u145 = k;
    } else {
      _u145 = _u80;
    }
    var _u81 = _u145;
    if (!number63(_u81)) {
      b = true;
      break;
    }
  }
  return(b);
};
empty63 = function (t) {
  var b = true;
  var _u83 = t;
  var _u3 = undefined;
  for (_u3 in _u83) {
    var _u4 = _u83[_u3];
    var _u84 = parseInt(_u3);
    var _u146;
    if (isNaN(_u84)) {
      _u146 = _u3;
    } else {
      _u146 = _u84;
    }
    var _u85 = _u146;
    b = false;
    break;
  }
  return(b);
};
stash = function (args) {
  if (keys63(args)) {
    var p = [];
    var _u87 = args;
    var k = undefined;
    for (k in _u87) {
      var v = _u87[k];
      var _u88 = parseInt(k);
      var _u147;
      if (isNaN(_u88)) {
        _u147 = k;
      } else {
        _u147 = _u88;
      }
      var _u89 = _u147;
      if (!number63(_u89)) {
        p[_u89] = v;
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
      var _u91 = l;
      var k = undefined;
      for (k in _u91) {
        var v = _u91[k];
        var _u92 = parseInt(k);
        var _u148;
        if (isNaN(_u92)) {
          _u148 = k;
        } else {
          _u148 = _u92;
        }
        var _u93 = _u148;
        if (!(_u93 === "_stash")) {
          args1[_u93] = v;
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
            var _u112 = x;
            var k = undefined;
            for (k in _u112) {
              var v = _u112[k];
              var _u113 = parseInt(k);
              var _u149;
              if (isNaN(_u113)) {
                _u149 = k;
              } else {
                _u149 = _u113;
              }
              var _u114 = _u149;
              if (number63(_u114)) {
                xs[_u114] = string(v, d);
              } else {
                add(ks, _u114 + ":");
                add(ks, string(v, d));
              }
            }
            var _u115 = join(xs, ks);
            var _u5 = undefined;
            for (_u5 in _u115) {
              var v = _u115[_u5];
              var _u116 = parseInt(_u5);
              var _u150;
              if (isNaN(_u116)) {
                _u150 = _u5;
              } else {
                _u150 = _u116;
              }
              var _u117 = _u150;
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
produces_string63 = function (x) {
  return(string_literal63(x) || list63(x) && (hd(x) === "cat" || hd(x) === "string"));
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
  var _u125 = stash(args);
  return(f.apply(f, _u125));
};
var _u126 = 0;
unique = function () {
  _u126 = _u126 + 1;
  return("_u" + _u126);
};
_37message_handler = function (msg) {
  var i = search(msg, ": ");
  return(sub(msg, i + 2));
};
toplevel63 = function () {
  return(one63(environment));
};
setenv = function (k) {
  var _u130 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = sub(_u130, 0);
  if (string63(k)) {
    var _u151;
    if (keys.toplevel) {
      _u151 = hd(environment);
    } else {
      _u151 = last(environment);
    }
    var frame = _u151;
    var entry = frame[k] || {};
    var _u131 = keys;
    var _u133 = undefined;
    for (_u133 in _u131) {
      var v = _u131[_u133];
      var _u132 = parseInt(_u133);
      var _u152;
      if (isNaN(_u132)) {
        _u152 = _u133;
      } else {
        _u152 = _u132;
      }
      var _u134 = _u152;
      entry[_u134] = v;
    }
    frame[k] = entry;
  }
};
fs = require("fs");
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
  return(sub(process.argv, 2));
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
  var b = first(function (frame) {
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(table63(b) && is63(b.variable));
};
bound63 = function (x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x));
};
escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < length(s)) {
    var c = char(s, i);
    var _u119;
    if (c === "\n") {
      _u119 = "\\n";
    } else {
      var _u120;
      if (c === "\"") {
        _u120 = "\\\"";
      } else {
        var _u121;
        if (c === "\\") {
          _u121 = "\\\\";
        } else {
          _u121 = c;
        }
        _u120 = _u121;
      }
      _u119 = _u120;
    }
    var c1 = _u119;
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
    var _u22 = args;
    var k = undefined;
    for (k in _u22) {
      var v = _u22[k];
      var _u23 = parseInt(k);
      var _u122;
      if (isNaN(_u23)) {
        _u122 = k;
      } else {
        _u122 = _u23;
      }
      var _u24 = _u122;
      if (!number63(_u24)) {
        add(l, literal(_u24));
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
      var _u33 = lh;
      var k = undefined;
      for (k in _u33) {
        var v = _u33[k];
        var _u34 = parseInt(k);
        var _u123;
        if (isNaN(_u34)) {
          _u123 = k;
        } else {
          _u123 = _u34;
        }
        var _u35 = _u123;
        var _u124;
        if (_u35 === "rest") {
          _u124 = ["sub", rh, length(lh)];
        } else {
          _u124 = ["get", rh, ["quote", bias(_u35)]];
        }
        var x = _u124;
        var _u125;
        if (v === true) {
          _u125 = _u35;
        } else {
          _u125 = v;
        }
        var _u39 = _u125;
        bs = join(bs, bind(_u39, x));
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
    var _u56 = args;
    var k = undefined;
    for (k in _u56) {
      var v = _u56[k];
      var _u57 = parseInt(k);
      var _u126;
      if (isNaN(_u57)) {
        _u126 = k;
      } else {
        _u126 = _u57;
      }
      var _u58 = _u126;
      if (number63(_u58)) {
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
          var _u73 = args;
          var _u75 = undefined;
          for (_u75 in _u73) {
            var _u71 = _u73[_u75];
            var _u74 = parseInt(_u75);
            var _u128;
            if (isNaN(_u74)) {
              _u128 = _u75;
            } else {
              _u128 = _u74;
            }
            var _u76 = _u128;
            setenv(_u71, {_stash: true, variable: true});
          }
          var _u72 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u72);
        } else {
          if (x === "%definition") {
            var _u3 = form[0];
            var _u78 = form[1];
            var _u79 = form[2];
            var _u80 = sub(form, 3);
            add(environment, {_scope: true});
            var _u83 = _u79;
            var _u85 = undefined;
            for (_u85 in _u83) {
              var _u81 = _u83[_u85];
              var _u84 = parseInt(_u85);
              var _u127;
              if (isNaN(_u84)) {
                _u127 = _u85;
              } else {
                _u127 = _u84;
              }
              var _u86 = _u127;
              setenv(_u81, {_stash: true, variable: true});
            }
            var _u82 = join([x, _u78, _u79], macroexpand(_u80));
            drop(environment);
            return(_u82);
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
  var _u91 = form;
  var k = undefined;
  for (k in _u91) {
    var v = _u91[k];
    var _u92 = parseInt(k);
    var _u129;
    if (isNaN(_u92)) {
      _u129 = k;
    } else {
      _u129 = _u92;
    }
    var _u93 = _u129;
    if (!number63(_u93)) {
      var _u130;
      if (quasisplice63(v, depth)) {
        _u130 = quasiexpand(v[1]);
      } else {
        _u130 = quasiexpand(v, depth);
      }
      var _u94 = _u130;
      last(xs)[_u93] = _u94;
    }
  }
  series(function (x) {
    if (quasisplice63(x, depth)) {
      var _u96 = quasiexpand(x[1]);
      add(xs, _u96);
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
expand_if = function (_u104) {
  var a = _u104[0];
  var b = _u104[1];
  var c = sub(_u104, 2);
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
reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
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
    var _u131;
    if (c === "-") {
      _u131 = "_";
    } else {
      var _u132;
      if (valid_code63(n)) {
        _u132 = c;
      } else {
        var _u133;
        if (i === 0) {
          _u133 = "_" + n;
        } else {
          _u133 = n;
        }
        _u132 = _u133;
      }
      _u131 = _u132;
    }
    var c1 = _u131;
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
mapo = function (f, t) {
  var o = [];
  var _u116 = t;
  var k = undefined;
  for (k in _u116) {
    var v = _u116[k];
    var _u117 = parseInt(k);
    var _u134;
    if (isNaN(_u117)) {
      _u134 = k;
    } else {
      _u134 = _u117;
    }
    var _u118 = _u134;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u118));
      add(o, x);
    }
  }
  return(o);
};
delimiters = {"(": true, ")": true, ";": true, "\n": true};
whitespace = {" ": true, "\t": true, "\n": true};
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
_u6["*"] = true;
_u6["/"] = true;
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
_u13["<"] = true;
_u13[">"] = true;
_u13["<="] = true;
_u13[">="] = true;
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
      var _u112;
      if (isNaN(_u27)) {
        _u112 = k;
      } else {
        _u112 = _u27;
      }
      var _u28 = _u112;
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
  var stmt = _u37.stmt;
  var self_tr63 = _u37.tr;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
};
parenthesize_call63 = function (x) {
  return(list63(x) && hd(x) === "%function" || precedence(x) > 0);
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
  var _u113;
  if (right) {
    _u113 = _6261;
  } else {
    _u113 = _62;
  }
  if (_u113(precedence(child), precedence(parent))) {
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
  var _u114;
  if (name) {
    _u114 = compile(name);
  } else {
    _u114 = "";
  }
  var id = _u114;
  var _u51 = compile_args(args);
  indent_level = indent_level + 1;
  var _u53 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u52 = _u53;
  var ind = indentation();
  var _u115;
  if (target === "js") {
    _u115 = "";
  } else {
    _u115 = "end";
  }
  var tr = _u115;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u51 + " {\n" + _u52 + ind + "}" + tr);
  } else {
    return("function " + id + _u51 + "\n" + _u52 + ind + tr);
  }
};
can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u55 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u55.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u116;
      if (stmt) {
        _u116 = indentation();
      } else {
        _u116 = "";
      }
      var ind = _u116;
      var _u117;
      if (atom63(form)) {
        _u117 = compile_atom(form);
      } else {
        var _u118;
        if (infix63(hd(form))) {
          _u118 = compile_infix(form);
        } else {
          _u118 = compile_call(form);
        }
        _u117 = _u118;
      }
      var _u56 = _u117;
      return(ind + _u56 + tr);
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
  var _u67 = args[1];
  var _u68 = args[2];
  if (stmt63 || tail63) {
    var _u120;
    if (_u68) {
      _u120 = [lower_body([_u68], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u67], tail63)], _u120)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u119;
    if (_u68) {
      _u119 = [lower(["set", e, _u68])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u67])], _u119));
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
    var _u121;
    if (x === "and") {
      _u121 = ["%if", id, b, id];
    } else {
      _u121 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u121], hoist));
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
  var _u93 = args[1];
  var body = sub(args, 2);
  return(add(hoist, [kind, name, _u93, lower_body(body, true)]));
};
lower_call = function (form, hoist) {
  var _u96 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u96)) {
    return(_u96);
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
                      if (x === "%definition") {
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
global.require = require;
run = eval;
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
setenv("do", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  series(function (x) {
    s = s + compile(x, {_stash: true, stmt: true});
  }, forms);
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _u11 = compile(cond);
  indent_level = indent_level + 1;
  var _u13 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u12 = _u13;
  var _u96;
  if (alt) {
    indent_level = indent_level + 1;
    var _u15 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u96 = _u15;
  }
  var _u14 = _u96;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _u11 + ") {\n" + _u12 + ind + "}";
  } else {
    s = s + ind + "if " + _u11 + " then\n" + _u12;
  }
  if (_u14 && target === "js") {
    s = s + " else {\n" + _u14 + ind + "}";
  } else {
    if (_u14) {
      s = s + ind + "else\n" + _u14;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _u20 = compile(cond);
  indent_level = indent_level + 1;
  var _u21 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u21;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _u20 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _u20 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _u26 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u27 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u27;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _u26 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _u26 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var ind = indentation();
  indent_level = indent_level + 1;
  var _u35 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _u35;
  var e = unique();
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _u39 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _u39;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
}, stmt: true, tr: true});
setenv("break", {_stash: true, special: function () {
  return(indentation() + "break");
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%definition", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _u97;
  if (nil63(x)) {
    _u97 = "return";
  } else {
    _u97 = "return(" + compile(x) + ")";
  }
  var _u54 = _u97;
  return(indentation() + _u54);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u98;
  if (target === "js") {
    _u98 = "throw new " + compile(["Error", x]);
  } else {
    _u98 = "error(" + compile(x) + ")";
  }
  var e = _u98;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u99;
  if (is63(value)) {
    _u99 = " = " + value1;
  } else {
    _u99 = "";
  }
  var rh = _u99;
  var _u100;
  if (target === "js") {
    _u100 = "var ";
  } else {
    _u100 = "local ";
  }
  var keyword = _u100;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u69 = compile(lh);
  var _u101;
  if (nil63(rh)) {
    _u101 = "nil";
  } else {
    _u101 = rh;
  }
  var _u70 = compile(_u101);
  return(indentation() + _u69 + " = " + _u70);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u74 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u74, 0) === "{") {
    _u74 = "(" + _u74 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u74 + "." + inner(k));
  } else {
    return(_u74 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u102;
  if (target === "lua") {
    _u102 = "{";
  } else {
    _u102 = "[";
  }
  var open = _u102;
  var _u103;
  if (target === "lua") {
    _u103 = "}";
  } else {
    _u103 = "]";
  }
  var close = _u103;
  var s = "";
  var c = "";
  var _u81 = forms;
  var k = undefined;
  for (k in _u81) {
    var v = _u81[k];
    var _u82 = parseInt(k);
    var _u104;
    if (isNaN(_u82)) {
      _u104 = k;
    } else {
      _u104 = _u82;
    }
    var _u83 = _u104;
    if (number63(_u83)) {
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
  var _u105;
  if (target === "lua") {
    _u105 = " = ";
  } else {
    _u105 = ": ";
  }
  var sep = _u105;
  var _u91 = pair(forms);
  var k = undefined;
  for (k in _u91) {
    var v = _u91[k];
    var _u92 = parseInt(k);
    var _u106;
    if (isNaN(_u92)) {
      _u106 = k;
    } else {
      _u106 = _u92;
    }
    var _u93 = _u106;
    if (number63(_u93)) {
      var _u94 = v[0];
      var _u95 = v[1];
      if (!string63(_u94)) {
        throw new Error("Illegal key: " + string(_u94));
      }
      s = s + c + key(_u94) + sep + compile(_u95);
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
    var _u310;
    if (isNaN(_u25)) {
      _u310 = k;
    } else {
      _u310 = _u25;
    }
    var _u26 = _u310;
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
      var _u311;
      if (isNaN(_u71)) {
        _u311 = k;
      } else {
        _u311 = _u71;
      }
      var _u73 = _u311;
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
setenv("define-reader", {_stash: true, macro: function (_u109) {
  var char = _u109[0];
  var s = _u109[1];
  var _u108 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u108, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _u120 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u120, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    var _u121 = bind42(x, body);
    var args = _u121[0];
    var _u122 = _u121[1];
    return(join(["%definition", name, args], _u122));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _u134 = unstash(Array.prototype.slice.call(arguments, 0));
  var scope = _u134.scope;
  var body = sub(_u134, 0);
  var x = unique();
  var _u137 = ["table"];
  _u137._scope = scope;
  return(["do", ["add", "environment", _u137], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_u150) {
  var names = _u150[0];
  var _u149 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u149, 0);
  var x = unique();
  var _u154 = ["setenv", x];
  _u154.variable = true;
  var _u151 = ["with-frame", ["all", ["_u1", x], names, _u154]];
  _u151.scope = true;
  return(join(_u151, body));
}});
setenv("let-fn", {_stash: true, macro: function (_u162) {
  var name = _u162[0];
  var args = _u162[1];
  var fn_body = sub(_u162, 2);
  var _u161 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u161, 0);
  return(join(["let", [name, join(["fn", args], fn_body)]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _u172 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u172, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _u173 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u173);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _u184 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u184, 0);
  add(environment, {});
  map(function (_u187) {
    var name = _u187[0];
    var exp = _u187[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _u185 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u185);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _u196 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u196, 0);
  var _u197 = bind42(args, body);
  var _u198 = _u197[0];
  var _u199 = _u197[1];
  return(join(["%function", _u198], _u199));
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
setenv("all", {_stash: true, macro: function (_u238, t) {
  var k = _u238[0];
  var v = _u238[1];
  var _u237 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u237, 0);
  var x = unique();
  var n = unique();
  var _u312;
  if (target === "lua") {
    _u312 = body;
  } else {
    _u312 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u312)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _u255 = xs;
  var _u2 = undefined;
  for (_u2 in _u255) {
    var x = _u255[_u2];
    var _u256 = parseInt(_u2);
    var _u313;
    if (isNaN(_u256)) {
      _u313 = _u2;
    } else {
      _u313 = _u256;
    }
    var _u257 = _u313;
    l[x] = true;
  }
  return(join(["table"], l));
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
  var _u273 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u273, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _u280 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u280, 0);
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
  var as = argv();
  if (hd(as) === "-h" || hd(as) === "--help") {
    usage();
  }
  var load = [];
  var input = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var n = length(as);
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
        add(load, a);
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
