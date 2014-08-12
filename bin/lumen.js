environment = [{}];
target = "js";
function nil63(x) {
  return(x === undefined || x === null);
}
function is63(x) {
  return(!nil63(x));
}
function length(x) {
  return(x.length || 0);
}
function none63(x) {
  return(length(x) === 0);
}
function some63(x) {
  return(length(x) > 0);
}
function one63(x) {
  return(length(x) === 1);
}
function hd(l) {
  return(l[0]);
}
function type(x) {
  return(typeof(x));
}
function string63(x) {
  return(type(x) === "string");
}
function number63(x) {
  return(type(x) === "number");
}
function boolean63(x) {
  return(type(x) === "boolean");
}
function function63(x) {
  return(type(x) === "function");
}
function composite63(x) {
  return(is63(x) && type(x) === "object");
}
function atom63(x) {
  return(nil63(x) || !composite63(x));
}
function table63(x) {
  return(composite63(x) && nil63(hd(x)));
}
function list63(x) {
  return(composite63(x) && is63(hd(x)));
}
function hd61(l, x) {
  return(list63(l) && hd(l) === x);
}
function substring(s, from, upto) {
  return(s.substring(from, upto));
}
function sub(x, from, upto) {
  if (string63(x)) {
    return(substring(x, from || 0, upto));
  } else {
    var l = [];
    var j = 0;
    var _u141;
    if (nil63(from) || from < 0) {
      _u141 = 0;
    } else {
      _u141 = from;
    }
    var i = _u141;
    var n = length(x);
    var _u142;
    if (nil63(upto) || upto > n) {
      _u142 = n;
    } else {
      _u142 = upto;
    }
    var _u26 = _u142;
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
      var _u143;
      if (isNaN(_u28)) {
        _u143 = k;
      } else {
        _u143 = _u28;
      }
      var _u29 = _u143;
      if (!number63(_u29)) {
        l[_u29] = v;
      }
    }
    return(l);
  }
}
function keys(x) {
  var t = [];
  var _u31 = x;
  var k = undefined;
  for (k in _u31) {
    var v = _u31[k];
    var _u32 = parseInt(k);
    var _u144;
    if (isNaN(_u32)) {
      _u144 = k;
    } else {
      _u144 = _u32;
    }
    var _u33 = _u144;
    if (!number63(_u33)) {
      t[_u33] = v;
    }
  }
  return(t);
}
function inner(x) {
  return(sub(x, 1, length(x) - 1));
}
function tl(l) {
  return(sub(l, 1));
}
function char(s, n) {
  return(s.charAt(n));
}
function code(s, n) {
  return(s.charCodeAt(n));
}
function string_literal63(x) {
  return(string63(x) && char(x, 0) === "\"");
}
function id_literal63(x) {
  return(string63(x) && char(x, 0) === "|");
}
function add(l, x) {
  l.push(x);
  return(undefined);
}
function drop(l) {
  return(l.pop());
}
function last(l) {
  return(l[length(l) - 1]);
}
function butlast(l) {
  return(sub(l, 0, length(l) - 1));
}
function reverse(l) {
  var l1 = keys(l);
  var i = length(l) - 1;
  while (i >= 0) {
    add(l1, l[i]);
    i = i - 1;
  }
  return(l1);
}
function join(a, b) {
  if (a && b) {
    var c = [];
    var o = length(a);
    var _u46 = a;
    var k = undefined;
    for (k in _u46) {
      var v = _u46[k];
      var _u47 = parseInt(k);
      var _u145;
      if (isNaN(_u47)) {
        _u145 = k;
      } else {
        _u145 = _u47;
      }
      var _u48 = _u145;
      c[_u48] = v;
    }
    var _u49 = b;
    var k = undefined;
    for (k in _u49) {
      var v = _u49[k];
      var _u50 = parseInt(k);
      var _u146;
      if (isNaN(_u50)) {
        _u146 = k;
      } else {
        _u146 = _u50;
      }
      var _u51 = _u146;
      if (number63(_u51)) {
        _u51 = _u51 + o;
      }
      c[_u51] = v;
    }
    return(c);
  } else {
    return(a || b || []);
  }
}
function reduce(f, x) {
  if (none63(x)) {
    return(x);
  } else {
    if (one63(x)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
}
function shift(k, n) {
  if (number63(k)) {
    return(k - n);
  } else {
    return(k);
  }
}
function keep(f, x) {
  var t = [];
  var o = 0;
  var _u55 = x;
  var k = undefined;
  for (k in _u55) {
    var v = _u55[k];
    var _u56 = parseInt(k);
    var _u147;
    if (isNaN(_u56)) {
      _u147 = k;
    } else {
      _u147 = _u56;
    }
    var _u57 = _u147;
    if (f(v)) {
      t[shift(_u57, o)] = v;
    } else {
      o = o + 1;
    }
  }
  return(t);
}
function in63(x, t) {
  var _u59 = t;
  var _u1 = undefined;
  for (_u1 in _u59) {
    var y = _u59[_u1];
    var _u60 = parseInt(_u1);
    var _u148;
    if (isNaN(_u60)) {
      _u148 = _u1;
    } else {
      _u148 = _u60;
    }
    var _u61 = _u148;
    if (x === y) {
      return(true);
    }
  }
}
function find(f, t) {
  var _u63 = t;
  var _u2 = undefined;
  for (_u2 in _u63) {
    var x = _u63[_u2];
    var _u64 = parseInt(_u2);
    var _u149;
    if (isNaN(_u64)) {
      _u149 = _u2;
    } else {
      _u149 = _u64;
    }
    var _u65 = _u149;
    var _u66 = f(x);
    if (_u66) {
      return(_u66);
    }
  }
}
function pair(l) {
  var i = 0;
  var l1 = [];
  while (i < length(l)) {
    add(l1, [l[i], l[i + 1]]);
    i = i + 2;
  }
  return(l1);
}
function sort(l, f) {
  var _u150;
  if (f) {
    _u150 = function (a, b) {
      if (f(a, b)) {
        return(-1);
      } else {
        return(1);
      }
    };
  }
  return(l.sort(_u150));
}
function iterate(f, count) {
  var i = 0;
  while (i < count) {
    f(i);
    i = i + 1;
  }
}
function replicate(n, x) {
  var l = [];
  iterate(function () {
    return(add(l, x));
  }, n);
  return(l);
}
function series(f, l) {
  return(iterate(function (i) {
    return(f(l[i]));
  }, length(l)));
}
function map(f, x) {
  var t = [];
  var o = 0;
  var _u77 = x;
  var k = undefined;
  for (k in _u77) {
    var v = _u77[k];
    var _u78 = parseInt(k);
    var _u151;
    if (isNaN(_u78)) {
      _u151 = k;
    } else {
      _u151 = _u78;
    }
    var _u79 = _u151;
    var y = f(v);
    if (is63(y)) {
      t[shift(_u79, o)] = y;
    } else {
      o = o + 1;
    }
  }
  return(t);
}
function keys63(t) {
  var b = false;
  var _u81 = t;
  var k = undefined;
  for (k in _u81) {
    var _u3 = _u81[k];
    var _u82 = parseInt(k);
    var _u152;
    if (isNaN(_u82)) {
      _u152 = k;
    } else {
      _u152 = _u82;
    }
    var _u83 = _u152;
    if (!number63(_u83)) {
      b = true;
      break;
    }
  }
  return(b);
}
function empty63(t) {
  var b = true;
  var _u85 = t;
  var _u4 = undefined;
  for (_u4 in _u85) {
    var _u5 = _u85[_u4];
    var _u86 = parseInt(_u4);
    var _u153;
    if (isNaN(_u86)) {
      _u153 = _u4;
    } else {
      _u153 = _u86;
    }
    var _u87 = _u153;
    b = false;
    break;
  }
  return(b);
}
function stash(args) {
  if (keys63(args)) {
    var p = [];
    var _u89 = args;
    var k = undefined;
    for (k in _u89) {
      var v = _u89[k];
      var _u90 = parseInt(k);
      var _u154;
      if (isNaN(_u90)) {
        _u154 = k;
      } else {
        _u154 = _u90;
      }
      var _u91 = _u154;
      if (!number63(_u91)) {
        p[_u91] = v;
      }
    }
    p._stash = true;
    add(args, p);
  }
  return(args);
}
function unstash(args) {
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
        var _u155;
        if (isNaN(_u94)) {
          _u155 = k;
        } else {
          _u155 = _u94;
        }
        var _u95 = _u155;
        if (!(_u95 === "_stash")) {
          args1[_u95] = v;
        }
      }
      return(args1);
    } else {
      return(args);
    }
  }
}
function search(s, pattern, start) {
  var i = s.indexOf(pattern, start);
  if (i >= 0) {
    return(i);
  }
}
function split(s, sep) {
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
}
function cat() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(xs)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return(a + b);
    }, xs));
  }
}
function _43() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a + b);
  }, xs));
}
function _() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a - b);
  }, reverse(xs)));
}
function _42() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (a, b) {
    return(a * b);
  }, xs));
}
function _47() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a / b);
  }, reverse(xs)));
}
function _37() {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (b, a) {
    return(a % b);
  }, reverse(xs)));
}
function _62(a, b) {
  return(a > b);
}
function _60(a, b) {
  return(a < b);
}
function _61(a, b) {
  return(a === b);
}
function _6261(a, b) {
  return(a >= b);
}
function _6061(a, b) {
  return(a <= b);
}
global.require = require;
fs = require("fs");
function read_file(path) {
  return(fs.readFileSync(path, "utf8"));
}
function write_file(path, data) {
  return(fs.writeFileSync(path, data, "utf8"));
}
function print(x) {
  return(console.log(x));
}
function write(x) {
  return(process.stdout.write(x));
}
function exit(code) {
  return(process.exit(code));
}
function today() {
  var pad = function (n) {
    if (n < 10) {
      return("0" + n);
    } else {
      return(string(n));
    }
  };
  var now = new Date();
  return(pad(now.getUTCFullYear()) + "-" + pad(now.getUTCMonth() + 1) + "-" + pad(now.getUTCDate()));
}
function now() {
  return(Math.floor(new Date().getTime() / 1000));
}
function number(s) {
  var n = parseFloat(s);
  if (!isNaN(n)) {
    return(n);
  }
}
function string(x, depth) {
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
            var _u119 = x;
            var k = undefined;
            for (k in _u119) {
              var v = _u119[k];
              var _u120 = parseInt(k);
              var _u156;
              if (isNaN(_u120)) {
                _u156 = k;
              } else {
                _u156 = _u120;
              }
              var _u121 = _u156;
              if (number63(_u121)) {
                xs[_u121] = string(v, d);
              } else {
                add(ks, _u121 + ":");
                add(ks, string(v, d));
              }
            }
            var _u122 = join(xs, ks);
            var _u6 = undefined;
            for (_u6 in _u122) {
              var v = _u122[_u6];
              var _u123 = parseInt(_u6);
              var _u157;
              if (isNaN(_u123)) {
                _u157 = _u6;
              } else {
                _u157 = _u123;
              }
              var _u124 = _u157;
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
function space(xs) {
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
}
function apply(f, args) {
  var _u131 = stash(args);
  return(f.apply(f, _u131));
}
var _u132 = 0;
function unique() {
  _u132 = _u132 + 1;
  return("_u" + _u132);
}
function _37message_handler(msg) {
  var i = search(msg, ": ");
  return(sub(msg, i + 2));
}
function toplevel63() {
  return(one63(environment));
}
function setenv(k) {
  var _u136 = unstash(Array.prototype.slice.call(arguments, 1));
  var keys = sub(_u136, 0);
  if (string63(k)) {
    var _u158;
    if (keys.toplevel) {
      _u158 = hd(environment);
    } else {
      _u158 = last(environment);
    }
    var frame = _u158;
    var entry = frame[k] || {};
    var _u137 = keys;
    var _u139 = undefined;
    for (_u139 in _u137) {
      var v = _u137[_u139];
      var _u138 = parseInt(_u139);
      var _u159;
      if (isNaN(_u138)) {
        _u159 = _u139;
      } else {
        _u159 = _u138;
      }
      var _u140 = _u159;
      entry[_u140] = v;
    }
    frame[k] = entry;
  }
}
function getenv(k, p) {
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
}
function macro_function(k) {
  return(getenv(k, "macro"));
}
function macro63(k) {
  return(is63(macro_function(k)));
}
function special63(k) {
  return(is63(getenv(k, "special")));
}
function special_form63(form) {
  return(list63(form) && special63(hd(form)));
}
function statement63(k) {
  return(special63(k) && getenv(k, "stmt"));
}
function symbol_expansion(k) {
  return(getenv(k, "symbol"));
}
function symbol63(k) {
  return(is63(symbol_expansion(k)));
}
function variable63(k) {
  var b = find(function (frame) {
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(table63(b) && is63(b.variable));
}
function bound63(x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x));
}
function escape(s) {
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
}
function quoted(form) {
  if (string63(form)) {
    return(escape(form));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map(quoted, form)));
    }
  }
}
function literal(s) {
  if (string_literal63(s)) {
    return(s);
  } else {
    return(quoted(s));
  }
}
function stash42(args) {
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
}
function index(k) {
  return(k);
}
function bias(k) {
  if (number63(k) && !(target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return(k);
}
function bind(lh, rh) {
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
}
function bind42(args, body) {
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
}
function quoting63(depth) {
  return(number63(depth));
}
function quasiquoting63(depth) {
  return(quoting63(depth) && depth > 0);
}
function can_unquote63(depth) {
  return(quoting63(depth) && depth === 1);
}
function quasisplice63(x, depth) {
  return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
}
function macroexpand(form) {
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
}
function quasiquote_list(form, depth) {
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
}
function quasiexpand(form, depth) {
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
}
function expand_if(_u104) {
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
}
indent_level = 0;
function indentation() {
  return(apply(cat, replicate(indent_level, "  ")));
}
reserved = {"catch": true, "==": true, "until": true, "*": true, "try": true, "%": true, "switch": true, "function": true, ">": true, "typeof": true, "<": true, "new": true, "false": true, "nil": true, "for": true, "elseif": true, "with": true, ">=": true, "<=": true, "return": true, "+": true, "true": true, "end": true, "local": true, "else": true, "/": true, "var": true, "continue": true, "not": true, "then": true, "and": true, "void": true, "instanceof": true, "do": true, "or": true, "finally": true, "debugger": true, "this": true, "=": true, "case": true, "default": true, "in": true, "break": true, "if": true, "throw": true, "repeat": true, "while": true, "delete": true, "-": true};
function reserved63(x) {
  return(reserved[x]);
}
function numeric63(n) {
  return(n > 47 && n < 58);
}
function valid_code63(n) {
  return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
}
function valid_id63(id) {
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
}
function id(id) {
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
}
function key(k) {
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
}
function mapo(f, t) {
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
}
delimiters = {")": true, "\n": true, ";": true, "(": true};
whitespace = {"\n": true, "\t": true, " ": true};
function stream(str) {
  return({pos: 0, string: str, len: length(str)});
}
function peek_char(s) {
  if (s.pos < s.len) {
    return(char(s.string, s.pos));
  }
}
function read_char(s) {
  var c = peek_char(s);
  if (c) {
    s.pos = s.pos + 1;
    return(c);
  }
}
function skip_non_code(s) {
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
}
read_table = {};
eof = {};
function read(s) {
  skip_non_code(s);
  var c = peek_char(s);
  if (is63(c)) {
    return((read_table[c] || read_table[""])(s));
  } else {
    return(eof);
  }
}
function read_all(s) {
  var l = [];
  while (true) {
    var form = read(s);
    if (form === eof) {
      break;
    }
    add(l, form);
  }
  return(l);
}
function read_from_string(str) {
  var x = read(stream(str));
  if (!(x === eof)) {
    return(x);
  }
}
function key63(atom) {
  return(string63(atom) && length(atom) > 1 && char(atom, length(atom) - 1) === ":");
}
function flag63(atom) {
  return(string63(atom) && length(atom) > 1 && char(atom, 0) === ":");
}
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
_u4.lua = "not ";
_u4.js = "!";
_u3["not"] = _u4;
var _u6 = [];
_u6["/"] = true;
_u6["*"] = true;
_u6["%"] = true;
var _u8 = [];
_u8["-"] = true;
_u8["+"] = true;
var _u10 = [];
var _u11 = [];
_u11.lua = "..";
_u11.js = "+";
_u10.cat = _u11;
var _u13 = [];
_u13["<"] = true;
_u13[">="] = true;
_u13[">"] = true;
_u13["<="] = true;
var _u15 = [];
var _u16 = [];
_u16.lua = "==";
_u16.js = "===";
_u15["="] = _u16;
var _u18 = [];
var _u19 = [];
_u19.lua = "and";
_u19.js = "&&";
_u18["and"] = _u19;
var _u21 = [];
var _u22 = [];
_u22.lua = "or";
_u22.js = "||";
_u21["or"] = _u22;
infix = [_u3, _u6, _u8, _u10, _u13, _u15, _u18, _u21];
function unary63(form) {
  return(length(form) === 2 && in63(hd(form), ["not", "-"]));
}
function precedence(form) {
  if (list63(form) && !unary63(form)) {
    var _u26 = infix;
    var k = undefined;
    for (k in _u26) {
      var v = _u26[k];
      var _u27 = parseInt(k);
      var _u113;
      if (isNaN(_u27)) {
        _u113 = k;
      } else {
        _u113 = _u27;
      }
      var _u28 = _u113;
      if (v[hd(form)]) {
        return(index(_u28));
      }
    }
  }
  return(0);
}
function getop(op) {
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
}
function infix63(x) {
  return(is63(getop(x)));
}
function compile_args(args) {
  var s = "(";
  var c = "";
  series(function (x) {
    s = s + c + compile(x);
    c = ", ";
  }, args);
  return(s + ")");
}
function compile_atom(x) {
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
}
function terminator(stmt63) {
  if (!stmt63) {
    return("");
  } else {
    if (target === "js") {
      return(";\n");
    } else {
      return("\n");
    }
  }
}
function compile_special(form, stmt63) {
  var x = form[0];
  var args = sub(form, 1);
  var _u37 = getenv(x);
  var stmt = _u37.stmt;
  var self_tr63 = _u37.tr;
  var special = _u37.special;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
}
function parenthesize_call63(x) {
  return(hd61(x, "%function") || precedence(x) > 0);
}
function compile_call(form) {
  var f = hd(form);
  var f1 = compile(f);
  var args = compile_args(stash42(tl(form)));
  if (parenthesize_call63(f)) {
    return("(" + f1 + ")" + args);
  } else {
    return(f1 + args);
  }
}
function op_delims(parent, child) {
  var _u40 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _u40.right;
  var _u114;
  if (right) {
    _u114 = _6261;
  } else {
    _u114 = _62;
  }
  if (_u114(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
}
function compile_infix(form) {
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
}
function compile_function(args, body) {
  var _u50 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _u50.name;
  var _u115;
  if (name) {
    _u115 = compile(name);
  } else {
    _u115 = "";
  }
  var id = _u115;
  var _u51 = compile_args(args);
  indent_level = indent_level + 1;
  var _u53 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _u52 = _u53;
  var ind = indentation();
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
    return("function " + id + _u51 + " {\n" + _u52 + ind + "}" + tr);
  } else {
    return("function " + id + _u51 + "\n" + _u52 + ind + tr);
  }
}
function can_return63(form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
}
function compile(form) {
  var _u55 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _u55.stmt;
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
      var _u56 = _u118;
      return(ind + _u56 + tr);
    }
  }
}
function lower_statement(form, tail63) {
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
}
function lower_body(body, tail63) {
  return(lower_statement(join(["do"], body), tail63));
}
function lower_do(args, hoist, stmt63, tail63) {
  series(function (x) {
    return(add(hoist, lower(x, hoist, stmt63)));
  }, butlast(args));
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
}
function lower_if(args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _u67 = args[1];
  var _u68 = args[2];
  if (stmt63 || tail63) {
    var _u121;
    if (_u68) {
      _u121 = [lower_body([_u68], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u67], tail63)], _u121)));
  } else {
    var e = unique();
    add(hoist, ["%local", e]);
    var _u120;
    if (_u68) {
      _u120 = [lower(["set", e, _u68])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u67])], _u120));
    return(e);
  }
}
function lower_short(x, args, hoist) {
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
}
function lower_try(args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
}
function lower_while(args, hoist) {
  var c = args[0];
  var body = sub(args, 1);
  return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
}
function lower_for(args, hoist) {
  var t = args[0];
  var k = args[1];
  var body = sub(args, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
}
function lower_function(args) {
  var a = args[0];
  var body = sub(args, 1);
  return(["%function", a, lower_body(body, true)]);
}
function lower_definition(kind, args, hoist) {
  var name = args[0];
  var _u93 = args[1];
  var body = sub(args, 2);
  return(add(hoist, [kind, name, _u93, lower_body(body, true)]));
}
function lower_call(form, hoist) {
  var _u96 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_u96)) {
    return(_u96);
  }
}
function lower_infix63(form) {
  return(infix63(hd(form)) && length(form) > 3);
}
function lower_infix(form, hoist) {
  var x = form[0];
  var args = sub(form, 1);
  return(lower(reduce(function (a, b) {
    return([x, b, a]);
  }, reverse(args)), hoist));
}
function lower_special(form, hoist) {
  var e = lower_call(form, hoist);
  if (e) {
    return(add(hoist, e));
  }
}
function lower(form, hoist, stmt63, tail63) {
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
}
function expand(form) {
  return(lower(macroexpand(form)));
}
vm = require("vm");
function run(code) {
  return(vm.runInThisContext(code));
}
_37result = undefined;
function eval(form) {
  var previous = target;
  target = "js";
  var code = compile(expand(["set", "%result", form]));
  target = previous;
  run(code);
  return(_37result);
}
function load_file(path) {
  return(run(read_file(path)));
}
function compile_file(input, output) {
  var s = stream(read_file(input));
  var body = read_all(s);
  var form = expand(join(["do"], body));
  return(write_file(output, compile(form)));
}
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
  var _u91;
  if (alt) {
    indent_level = indent_level + 1;
    var _u16 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _u91 = _u16;
  }
  var _u15 = _u91;
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
setenv("%definition", {_stash: true, tr: true, stmt: true, special: function (name, args, body) {
  var x = compile_function(args, body, {_stash: true, name: name});
  return(indentation() + x);
}});
setenv("return", {_stash: true, special: function (x) {
  var _u92;
  if (nil63(x)) {
    _u92 = "return";
  } else {
    _u92 = "return(" + compile(x) + ")";
  }
  var _u51 = _u92;
  return(indentation() + _u51);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _u93;
  if (target === "js") {
    _u93 = "throw new " + compile(["Error", x]);
  } else {
    _u93 = "error(" + compile(x) + ")";
  }
  var e = _u93;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _u94;
  if (is63(value)) {
    _u94 = " = " + value1;
  } else {
    _u94 = "";
  }
  var rh = _u94;
  var _u95;
  if (target === "js") {
    _u95 = "var ";
  } else {
    _u95 = "local ";
  }
  var keyword = _u95;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _u66 = compile(lh);
  var _u96;
  if (nil63(rh)) {
    _u96 = "nil";
  } else {
    _u96 = rh;
  }
  var _u67 = compile(_u96);
  return(indentation() + _u66 + " = " + _u67);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _u71 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_u71, 0) === "{") {
    _u71 = "(" + _u71 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_u71 + "." + inner(k));
  } else {
    return(_u71 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _u97;
  if (target === "lua") {
    _u97 = "{";
  } else {
    _u97 = "[";
  }
  var open = _u97;
  var _u98;
  if (target === "lua") {
    _u98 = "}";
  } else {
    _u98 = "]";
  }
  var close = _u98;
  var s = "";
  var c = "";
  var _u77 = forms;
  var k = undefined;
  for (k in _u77) {
    var v = _u77[k];
    var _u78 = parseInt(k);
    var _u99;
    if (isNaN(_u78)) {
      _u99 = k;
    } else {
      _u99 = _u78;
    }
    var _u79 = _u99;
    if (number63(_u79)) {
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
  var _u100;
  if (target === "lua") {
    _u100 = " = ";
  } else {
    _u100 = ": ";
  }
  var sep = _u100;
  var _u86 = pair(forms);
  var k = undefined;
  for (k in _u86) {
    var v = _u86[k];
    var _u87 = parseInt(k);
    var _u101;
    if (isNaN(_u87)) {
      _u101 = k;
    } else {
      _u101 = _u87;
    }
    var _u88 = _u101;
    if (number63(_u88)) {
      var _u89 = v[0];
      var _u90 = v[1];
      if (!string63(_u89)) {
        throw new Error("Illegal key: " + string(_u89));
      }
      s = s + c + key(_u89) + sep + compile(_u90);
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
    var _u299;
    if (isNaN(_u25)) {
      _u299 = k;
    } else {
      _u299 = _u25;
    }
    var _u26 = _u299;
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
      var _u300;
      if (isNaN(_u71)) {
        _u300 = k;
      } else {
        _u300 = _u71;
      }
      var _u73 = _u300;
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
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _u161 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u161, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _u162 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u162);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _u173 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u173, 0);
  add(environment, {});
  map(function (_u176) {
    var name = _u176[0];
    var exp = _u176[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _u174 = join(["do"], macroexpand(body));
  drop(environment);
  return(_u174);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _u185 = unstash(Array.prototype.slice.call(arguments, 1));
  var body = sub(_u185, 0);
  var _u186 = bind42(args, body);
  var _u187 = _u186[0];
  var _u188 = _u186[1];
  return(join(["%function", _u187], _u188));
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
setenv("all", {_stash: true, macro: function (_u227, t) {
  var k = _u227[0];
  var v = _u227[1];
  var _u226 = unstash(Array.prototype.slice.call(arguments, 2));
  var body = sub(_u226, 0);
  var x = unique();
  var n = unique();
  var _u301;
  if (target === "lua") {
    _u301 = body;
  } else {
    _u301 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
  }
  return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u301)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _u244 = xs;
  var _u2 = undefined;
  for (_u2 in _u244) {
    var x = _u244[_u2];
    var _u245 = parseInt(_u2);
    var _u302;
    if (isNaN(_u245)) {
      _u302 = _u2;
    } else {
      _u302 = _u245;
    }
    var _u246 = _u302;
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
  var _u262 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u262, 0);
  return(["set", a, join(["join*", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _u269 = unstash(Array.prototype.slice.call(arguments, 1));
  var bs = sub(_u269, 0);
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
function rep(s) {
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
}
function repl() {
  write("> ");
  var rep1 = function (s) {
    rep(s);
    return(write("> "));
  };
  process.stdin.setEncoding("utf8");
  return(process.stdin.on("data", rep1));
}
function usage() {
  print("usage: lumen [options] <object files>");
  print("options:");
  print("  -c <input>\tInput file");
  print("  -o <output>\tOutput file");
  print("  -t <target>\tTarget language (default: lua)");
  print("  -e <expr>\tExpression to evaluate");
  return(exit());
}
function main() {
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
}
main();
