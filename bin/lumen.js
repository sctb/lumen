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
  var _u129;
  if (nil63(from) || from < 0) {
    _u129 = 0;
  } else {
    _u129 = from;
  }
  var i = _u129;
  var n = _35(x);
  var _u130;
  if (nil63(upto) || upto > n) {
    _u130 = n;
  } else {
    _u130 = upto;
  }
  var _u26 = _u130;
  while (i < _u26) {
    l[j] = x[i];
    i = i + 1;
    j = j + 1;
  }
  var _u27 = x;
  var k = undefined;
  for (k in _u27) {
    var v = _u27[k];
    var _u131;
    if (numeric63(k)) {
      _u131 = parseInt(k);
    } else {
      _u131 = k;
    }
    var _u29 = _u131;
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
    var _u132;
    if (numeric63(k)) {
      _u132 = parseInt(k);
    } else {
      _u132 = k;
    }
    var _u33 = _u132;
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
      var _u133;
      if (numeric63(k)) {
        _u133 = parseInt(k);
      } else {
        _u133 = k;
      }
      var _u49 = _u133;
      c[_u49] = v;
    }
    var _u50 = b;
    var k = undefined;
    for (k in _u50) {
      var v = _u50[k];
      var _u134;
      if (numeric63(k)) {
        _u134 = parseInt(k);
      } else {
        _u134 = k;
      }
      var _u52 = _u134;
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
    var _u135;
    if (numeric63(_u1)) {
      _u135 = parseInt(_u1);
    } else {
      _u135 = _u1;
    }
    var _u1 = _u135;
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
  var _u136;
  if (f) {
    _u136 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u136));
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
    var _u137;
    if (numeric63(k)) {
      _u137 = parseInt(k);
    } else {
      _u137 = k;
    }
    var _u70 = _u137;
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
    var _u138;
    if (numeric63(k)) {
      _u138 = parseInt(k);
    } else {
      _u138 = k;
    }
    var _u76 = _u138;
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
    var _u139;
    if (numeric63(_u4)) {
      _u139 = parseInt(_u4);
    } else {
      _u139 = _u4;
    }
    var _u4 = _u139;
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
      var _u140;
      if (numeric63(k)) {
        _u140 = parseInt(k);
      } else {
        _u140 = k;
      }
      var _u83 = _u140;
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
        var _u141;
        if (numeric63(k)) {
          _u141 = parseInt(k);
        } else {
          _u141 = k;
        }
        var _u87 = _u141;
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
                    var _u142;
                    if (numeric63(k)) {
                      _u142 = parseInt(k);
                    } else {
                      _u142 = k;
                    }
                    var _u107 = _u142;
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
                    var _u143;
                    if (numeric63(_u6)) {
                      _u143 = parseInt(_u6);
                    } else {
                      _u143 = _u6;
                    }
                    var _u6 = _u143;
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
    var _u144;
    if (keys.toplevel) {
      _u144 = hd(environment);
    } else {
      _u144 = last(environment);
    }
    var frame = _u144;
    var entry = frame[k] || {};
    var _u125 = keys;
    var _u127 = undefined;
    for (_u127 in _u125) {
      var v = _u125[_u127];
      var _u145;
      if (numeric63(_u127)) {
        _u145 = parseInt(_u127);
      } else {
        _u145 = _u127;
      }
      var _u128 = _u145;
      entry[_u128] = v;
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
  return(cut(process.argv, 2));
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
var macro_function = function (k) {
  return(getenv(k, "macro"));
};
var macro63 = function (k) {
  return(is63(macro_function(k)));
};
var special63 = function (k) {
  return(is63(getenv(k, "special")));
};
var special_form63 = function (form) {
  return(obj63(form) && special63(hd(form)));
};
var statement63 = function (k) {
  return(special63(k) && getenv(k, "stmt"));
};
var symbol_expansion = function (k) {
  return(getenv(k, "symbol"));
};
var symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};
var variable63 = function (k) {
  var b = first(function (frame) {
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(obj63(b) && is63(b.variable));
};
bound63 = function (x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x));
};
var escape = function (s) {
  var s1 = "\"";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u110;
    if (c === "\n") {
      _u110 = "\\n";
    } else {
      var _u111;
      if (c === "\"") {
        _u111 = "\\\"";
      } else {
        var _u112;
        if (c === "\\") {
          _u112 = "\\\\";
        } else {
          _u112 = c;
        }
        _u111 = _u112;
      }
      _u110 = _u111;
    }
    var c1 = _u110;
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
var literal = function (s) {
  if (string_literal63(s)) {
    return(s);
  } else {
    return(quoted(s));
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _u22 = args;
    var k = undefined;
    for (k in _u22) {
      var v = _u22[k];
      var _u113;
      if (numeric63(k)) {
        _u113 = parseInt(k);
      } else {
        _u113 = k;
      }
      var _u24 = _u113;
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
var bias = function (k) {
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
  if (obj63(lh) && obj63(rh)) {
    var id = unique();
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _u32 = lh;
      var k = undefined;
      for (k in _u32) {
        var v = _u32[k];
        var _u114;
        if (numeric63(k)) {
          _u114 = parseInt(k);
        } else {
          _u114 = k;
        }
        var _u34 = _u114;
        var _u115;
        if (_u34 === "rest") {
          _u115 = ["cut", rh, _35(lh)];
        } else {
          _u115 = ["get", rh, ["quote", bias(_u34)]];
        }
        var x = _u115;
        if (is63(_u34)) {
          var _u116;
          if (v === true) {
            _u116 = _u34;
          } else {
            _u116 = v;
          }
          var _u38 = _u116;
          bs = join(bs, bind(_u38, x));
        }
      }
      return(bs);
    }
  }
};
bind42 = function (args, body) {
  var args1 = [];
  var rest = function () {
    if (target === "js") {
      return(["unstash", [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", _35(args1)]]);
    } else {
      add(args1, "|...|");
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([args1, join(["let", [args, rest()]], body)]);
  } else {
    var bs = [];
    var r = unique();
    var _u54 = args;
    var k = undefined;
    for (k in _u54) {
      var v = _u54[k];
      var _u117;
      if (numeric63(k)) {
        _u117 = parseInt(k);
      } else {
        _u117 = k;
      }
      var _u56 = _u117;
      if (number63(_u56)) {
        if (atom63(v)) {
          add(args1, v);
        } else {
          var x = unique();
          add(args1, x);
          bs = join(bs, [v, x]);
        }
      }
    }
    if (keys63(args)) {
      bs = join(bs, [r, rest()]);
      bs = join(bs, [keys(args), r]);
    }
    return([args1, join(["let", bs], body)]);
  }
};
var quoting63 = function (depth) {
  return(number63(depth));
};
var quasiquoting63 = function (depth) {
  return(quoting63(depth) && depth > 0);
};
var can_unquote63 = function (depth) {
  return(quoting63(depth) && depth === 1);
};
var quasisplice63 = function (x, depth) {
  return(can_unquote63(depth) && obj63(x) && hd(x) === "unquote-splicing");
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
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _u70 = args;
          var _u1 = undefined;
          for (_u1 in _u70) {
            var _u68 = _u70[_u1];
            var _u119;
            if (numeric63(_u1)) {
              _u119 = parseInt(_u1);
            } else {
              _u119 = _u1;
            }
            var _u1 = _u119;
            setenv(_u68, {_stash: true, variable: true});
          }
          var _u69 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_u69);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _u3 = form[0];
            var _u73 = form[1];
            var _u74 = form[2];
            var _u75 = cut(form, 3);
            add(environment, {_scope: true});
            var _u78 = _u74;
            var _u1 = undefined;
            for (_u1 in _u78) {
              var _u76 = _u78[_u1];
              var _u118;
              if (numeric63(_u1)) {
                _u118 = parseInt(_u1);
              } else {
                _u118 = _u1;
              }
              var _u1 = _u118;
              setenv(_u76, {_stash: true, variable: true});
            }
            var _u77 = join([x, _u73, _u74], macroexpand(_u75));
            drop(environment);
            return(_u77);
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
  var _u84 = form;
  var k = undefined;
  for (k in _u84) {
    var v = _u84[k];
    var _u120;
    if (numeric63(k)) {
      _u120 = parseInt(k);
    } else {
      _u120 = k;
    }
    var _u86 = _u120;
    if (!number63(_u86)) {
      var _u121;
      if (quasisplice63(v, depth)) {
        _u121 = quasiexpand(v[1]);
      } else {
        _u121 = quasiexpand(v, depth);
      }
      var _u87 = _u121;
      last(xs)[_u86] = _u87;
    }
  }
  step(function (x) {
    if (quasisplice63(x, depth)) {
      var _u89 = quasiexpand(x[1]);
      add(xs, _u89);
      return(add(xs, ["list"]));
    } else {
      return(add(last(xs), quasiexpand(x, depth)));
    }
  }, form);
  var pruned = keep(function (x) {
    return(_35(x) > 1 || !(hd(x) === "list") || keys63(x));
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
expand_if = function (_u97) {
  var a = _u97[0];
  var b = _u97[1];
  var c = cut(_u97, 2);
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
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return(reserved[x]);
};
var valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id)) {
    return(false);
  } else {
    var i = 0;
    while (i < _35(id)) {
      if (!valid_code63(code(id, i))) {
        return(false);
      }
      i = i + 1;
    }
    return(true);
  }
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
  var _u107 = t;
  var k = undefined;
  for (k in _u107) {
    var v = _u107[k];
    var _u122;
    if (numeric63(k)) {
      _u122 = parseInt(k);
    } else {
      _u122 = k;
    }
    var _u109 = _u122;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_u109));
      add(o, x);
    }
  }
  return(o);
};
var delimiters = {"(": true, ")": true, "\n": true, ";": true};
var whitespace = {" ": true, "\n": true, "\t": true};
stream = function (str) {
  return({pos: 0, len: _35(str), string: str});
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
var skip_non_code = function (s) {
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
var key63 = function (atom) {
  return(string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":");
};
var flag63 = function (atom) {
  return(string63(atom) && _35(atom) > 1 && char(atom, 0) === ":");
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
      str = str + read_char(s);
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
        var k = clip(x, 0, edge(x));
        var v = read(s);
        l[k] = v;
      } else {
        if (flag63(x)) {
          l[clip(x, 1)] = true;
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
var _u2 = [];
var _u3 = [];
_u3.js = "!";
_u3.lua = "not ";
_u2["not"] = _u3;
var _u4 = [];
_u4["*"] = true;
_u4["/"] = true;
_u4["%"] = true;
var _u5 = [];
_u5["+"] = true;
_u5["-"] = true;
var _u6 = [];
var _u7 = [];
_u7.js = "+";
_u7.lua = "..";
_u6.cat = _u7;
var _u8 = [];
_u8["<"] = true;
_u8[">"] = true;
_u8["<="] = true;
_u8[">="] = true;
var _u9 = [];
var _u10 = [];
_u10.js = "===";
_u10.lua = "==";
_u9["="] = _u10;
var _u11 = [];
var _u12 = [];
_u12.js = "&&";
_u12.lua = "and";
_u11["and"] = _u12;
var _u13 = [];
var _u14 = [];
_u14.js = "||";
_u14.lua = "or";
_u13["or"] = _u14;
var infix = [_u2, _u4, _u5, _u6, _u8, _u9, _u11, _u13];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _u19 = infix;
    var k = undefined;
    for (k in _u19) {
      var v = _u19[k];
      var _u108;
      if (numeric63(k)) {
        _u108 = parseInt(k);
      } else {
        _u108 = k;
      }
      var _u21 = _u108;
      if (v[hd(form)]) {
        return(index(_u21));
      }
    }
  }
  return(0);
};
var getop = function (op) {
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
var infix63 = function (x) {
  return(is63(getop(x)));
};
var compile_args = function (args) {
  var s = "(";
  var c = "";
  step(function (x) {
    s = s + c + compile(x);
    c = ", ";
  }, args);
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _u109;
    if (c === "\n") {
      _u109 = "\\n";
    } else {
      _u109 = c;
    }
    s1 = s1 + _u109;
    i = i + 1;
  }
  return(s1 + "");
};
var id = function (id) {
  var id1 = "";
  var i = 0;
  while (i < _35(id)) {
    var c = char(id, i);
    var n = code(c);
    var _u110;
    if (c === "-") {
      _u110 = "_";
    } else {
      var _u111;
      if (valid_code63(n)) {
        _u111 = c;
      } else {
        var _u112;
        if (i === 0) {
          _u112 = "_" + n;
        } else {
          _u112 = n;
        }
        _u111 = _u112;
      }
      _u110 = _u111;
    }
    var c1 = _u110;
    id1 = id1 + c1;
    i = i + 1;
  }
  return(id1);
};
var compile_atom = function (x) {
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
          return(escape_newlines(x));
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
var terminator = function (stmt63) {
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
var compile_special = function (form, stmt63) {
  var x = form[0];
  var args = cut(form, 1);
  var _u32 = getenv(x);
  var special = _u32.special;
  var stmt = _u32.stmt;
  var self_tr63 = _u32.tr;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
};
var parenthesize_call63 = function (x) {
  return(obj63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var f = hd(form);
  var f1 = compile(f);
  var args = compile_args(stash42(tl(form)));
  if (parenthesize_call63(f)) {
    return("(" + f1 + ")" + args);
  } else {
    return(f1 + args);
  }
};
var op_delims = function (parent, child) {
  var _u35 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u35.right;
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
var compile_infix = function (form) {
  var op = form[0];
  var _u39 = cut(form, 1);
  var a = _u39[0];
  var b = _u39[1];
  var _u40 = op_delims(form, a);
  var ao = _u40[0];
  var ac = _u40[1];
  var _u41 = op_delims(form, b, {_stash: true, right: true});
  var bo = _u41[0];
  var bc = _u41[1];
  var _u42 = compile(a);
  var _u43 = compile(b);
  var _u44 = getop(op);
  if (unary63(form)) {
    return(_u44 + ao + _u42 + ac);
  } else {
    return(ao + _u42 + ac + " " + _u44 + " " + bo + _u43 + bc);
  }
};
compile_function = function (args, body) {
  var _u45 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u45.name;
  var prefix = _u45.prefix;
  var _u114;
  if (name) {
    _u114 = compile(name);
  } else {
    _u114 = "";
  }
  var id = _u114;
  var _u46 = compile_args(args);
  indent_level = indent_level + 1;
  var _u48 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u47 = _u48;
  var ind = indentation();
  var _u115;
  if (prefix) {
    _u115 = prefix + " ";
  } else {
    _u115 = "";
  }
  var p = _u115;
  var _u116;
  if (target === "js") {
    _u116 = "";
  } else {
    _u116 = "end";
  }
  var tr = _u116;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _u46 + " {\n" + _u47 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _u46 + "\n" + _u47 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _u50 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u50.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _u117;
      if (stmt) {
        _u117 = indentation();
      } else {
        _u117 = "";
      }
      var ind = _u117;
      var _u118;
      if (atom63(form)) {
        _u118 = compile_atom(form);
      } else {
        var _u119;
        if (infix63(hd(form))) {
          _u119 = compile_infix(form);
        } else {
          _u119 = compile_call(form);
        }
        _u118 = _u119;
      }
      var _u51 = _u118;
      return(ind + _u51 + tr);
    }
  }
};
var lower_statement = function (form, tail63) {
  var hoist = [];
  var e = lower(form, hoist, true, tail63);
  if (some63(hoist) && is63(e)) {
    return(join(["do"], join(hoist, [e])));
  } else {
    if (is63(e)) {
      return(e);
    } else {
      if (_35(hoist) > 1) {
        return(join(["do"], hoist));
      } else {
        return(hd(hoist));
      }
    }
  }
};
var lower_body = function (body, tail63) {
  return(lower_statement(join(["do"], body), tail63));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  step(function (x) {
    return(add(hoist, lower(x, hoist, stmt63)));
  }, butlast(args));
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _u62 = args[1];
  var _u63 = args[2];
  if (stmt63 || tail63) {
    var _u121;
    if (_u63) {
      _u121 = [lower_body([_u63], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u62], tail63)], _u121)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u120;
    if (_u63) {
      _u120 = [lower(["set", e, _u63])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u62])], _u120));
    return(e);
  }
};
var lower_short = function (x, args, hoist) {
  var a = args[0];
  var b = args[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var id = unique();
    var _u122;
    if (x === "and") {
      _u122 = ["%if", id, b, id];
    } else {
      _u122 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _u122], hoist));
  } else {
    return([x, lower(a, hoist), b1]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var c = args[0];
  var body = cut(args, 1);
  return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
};
var lower_for = function (args, hoist) {
  var t = args[0];
  var k = args[1];
  var body = cut(args, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
};
var lower_function = function (args) {
  var a = args[0];
  var body = cut(args, 1);
  return(["%function", a, lower_body(body, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var name = args[0];
  var _u88 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _u88, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _u91 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u91)) {
    return(_u91);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var x = form[0];
  var args = cut(form, 1);
  return(lower(reduce(function (a, b) {
    return([x, b, a]);
  }, reverse(args)), hoist));
};
var lower_special = function (form, hoist) {
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
          var args = cut(form, 1);
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
                      if (x === "%local-function" || x === "%global-function") {
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
var expand = function (form) {
  return(lower(macroexpand(form)));
};
global.require = require;
var run = eval;
_37result = undefined;
eval = function (form) {
  var previous = target;
  target = "js";
  var code = compile(expand(["set", "%result", form]));
  target = previous;
  run(code);
  return(_37result);
};
run_file = function (path) {
  return(run(read_file(path)));
};
compile_file = function (path) {
  var s = stream(read_file(path));
  var body = read_all(s);
  var form = expand(join(["do"], body));
  return(compile(form, {_stash: true, stmt: true}));
};
load = function (path) {
  return(run(compile_file(path)));
};
setenv("do", {_stash: true, tr: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  step(function (x) {
    s = s + compile(x, {_stash: true, stmt: true});
  }, forms);
  return(s);
}, stmt: true});
setenv("%if", {_stash: true, tr: true, special: function (cond, cons, alt) {
  var _u12 = compile(cond);
  indent_level = indent_level + 1;
  var _u14 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u13 = _u14;
  var _u103;
  if (alt) {
    indent_level = indent_level + 1;
    var _u16 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u103 = _u16;
  }
  var _u15 = _u103;
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
}, stmt: true});
setenv("while", {_stash: true, tr: true, special: function (cond, form) {
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
}, stmt: true});
setenv("%for", {_stash: true, tr: true, special: function (t, k, form) {
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
}, stmt: true});
setenv("%try", {_stash: true, tr: true, special: function (form) {
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
}, stmt: true});
setenv("%delete", {_stash: true, special: function (place) {
  return(indentation() + "delete " + compile(place));
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return(indentation() + "break");
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%global-function", {_stash: true, tr: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true});
setenv("%local-function", {_stash: true, tr: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + x);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true});
setenv("return", {_stash: true, special: function (x) {
  var _u104;
  if (nil63(x)) {
    _u104 = "return";
  } else {
    _u104 = "return(" + compile(x) + ")";
  }
  var _u63 = _u104;
  return(indentation() + _u63);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u105;
  if (target === "js") {
    _u105 = "throw new " + compile(["Error", x]);
  } else {
    _u105 = "error(" + compile(x) + ")";
  }
  var e = _u105;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u106;
  if (is63(value)) {
    _u106 = " = " + value1;
  } else {
    _u106 = "";
  }
  var rh = _u106;
  var _u107;
  if (target === "js") {
    _u107 = "var ";
  } else {
    _u107 = "local ";
  }
  var keyword = _u107;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u78 = compile(lh);
  var _u108;
  if (nil63(rh)) {
    _u108 = "nil";
  } else {
    _u108 = rh;
  }
  var _u79 = compile(_u108);
  return(indentation() + _u78 + " = " + _u79);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u83 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u83, 0) === "{") {
    _u83 = "(" + _u83 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u83 + "." + inner(k));
  } else {
    return(_u83 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u109;
  if (target === "lua") {
    _u109 = "{";
  } else {
    _u109 = "[";
  }
  var open = _u109;
  var _u110;
  if (target === "lua") {
    _u110 = "}";
  } else {
    _u110 = "]";
  }
  var close = _u110;
  var s = "";
  var c = "";
  var _u89 = forms;
  var k = undefined;
  for (k in _u89) {
    var v = _u89[k];
    var _u111;
    if (numeric63(k)) {
      _u111 = parseInt(k);
    } else {
      _u111 = k;
    }
    var _u91 = _u111;
    if (number63(_u91)) {
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
  var _u112;
  if (target === "lua") {
    _u112 = " = ";
  } else {
    _u112 = ": ";
  }
  var sep = _u112;
  var _u98 = pair(forms);
  var k = undefined;
  for (k in _u98) {
    var v = _u98[k];
    var _u113;
    if (numeric63(k)) {
      _u113 = parseInt(k);
    } else {
      _u113 = k;
    }
    var _u100 = _u113;
    if (number63(_u100)) {
      var _u101 = v[0];
      var _u102 = v[1];
      if (!string63(_u101)) {
        throw new Error("Illegal key: " + string(_u101));
      }
      s = s + c + key(_u101) + sep + compile(_u102);
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
    var _u348;
    if (numeric63(k)) {
      _u348 = parseInt(k);
    } else {
      _u348 = k;
    }
    var _u33 = _u348;
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
      var _u349;
      if (numeric63(k)) {
        _u349 = parseInt(k);
      } else {
        _u349 = k;
      }
      var _u80 = _u349;
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
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("define-local", {_stash: true, macro: function (name, x) {
  var _u136 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = cut(_u136, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var _u148 = unstash(Array.prototype.slice.call(arguments, 0));
  var scope = _u148.scope;
  var body = cut(_u148, 0);
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
  var _u350;
  if (target === "lua") {
    _u350 = body;
  } else {
    _u350 = [join(["let", [k, ["if", ["numeric?", k], ["parseInt", k], k]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u350)]]);
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
    var _u351;
    if (numeric63(_u2)) {
      _u351 = parseInt(_u2);
    } else {
      _u351 = _u2;
    }
    var _u2 = _u351;
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
  return(join(["do"], map(function (k) {
    return(["set", ["get", "exports", ["quote", k]], k]);
  }, names)));
}});
var rep = function (s) {
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
  step(run_file, pre);
  if (input && output) {
    if (target1) {
      target = target1;
    }
    var code = compile_file(input);
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
