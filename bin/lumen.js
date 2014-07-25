(function () {
  global.nexus = {};
})();
(function () {
  function nil63(x) {
    return(x === undefined);
  }
  function is63(x) {
    return(!nil63(x));
  }
  var math = Math;
  var abs = math.abs;
  var acos = math.acos;
  var asin = math.asin;
  var atan = math.atan;
  var atan2 = math.atan2;
  var ceil = math.ceil;
  var cos = math.cos;
  var floor = math.floor;
  var log = math.log;
  var log10 = math.log10;
  var max = math.max;
  var min = math.min;
  var pow = math.pow;
  var random = math.random;
  var sin = math.sin;
  var sinh = math.sinh;
  var sqrt = math.sqrt;
  var tan = math.tan;
  var tanh = math.tanh;
  function length(x) {
    return(x.length || 0);
  }
  function none63(x) {
    return(length(x) === 0);
  }
  function some63(x) {
    return(length(x) > 0);
  }
  function in63(x, l) {
    var _g22 = l;
    var _g23 = 0;
    while (_g23 < length(_g22)) {
      var y = _g22[_g23];
      if (x === y) {
        return(true);
      }
      _g23 = _g23 + 1;
    }
  }
  function hd(l) {
    return(l[0]);
  }
  function sd(l) {
    return(l[1]);
  }
  function td(l) {
    return(l[2]);
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
    return(type(x) === "object");
  }
  function atom63(x) {
    return(!composite63(x));
  }
  function table63(x) {
    return(composite63(x) && nil63(hd(x)));
  }
  function list63(x) {
    return(composite63(x) && is63(hd(x)));
  }
  function substring(str, from, upto) {
    return(str.substring(from, upto));
  }
  function sublist(l, from, upto) {
    return(Array.prototype.slice.call(l, from, upto));
  }
  function sub(x, from, upto) {
    var _g24 = from || 0;
    if (string63(x)) {
      return(substring(x, _g24, upto));
    } else {
      var l = sublist(x, _g24, upto);
      var _g25 = x;
      var k = undefined;
      for (k in _g25) {
        if (isNaN(parseInt(k))) {
          var v = _g25[k];
          l[k] = v;
        }
      }
      return(l);
    }
  }
  function inner(x) {
    return(sub(x, 1, length(x) - 1));
  }
  function tl(l) {
    return(sub(l, 1));
  }
  function char(str, n) {
    return(str.charAt(n));
  }
  function code(str, n) {
    return(str.charCodeAt(n));
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
  function reverse(l) {
    var l1 = sub(l, length(l));
    var i = length(l) - 1;
    while (i >= 0) {
      add(l1, l[i]);
      i = i - 1;
    }
    return(l1);
  }
  function join(l1, l2) {
    if (nil63(l2) && nil63(l1)) {
      return([]);
    } else {
      if (nil63(l1)) {
        return(join([], l2));
      } else {
        if (nil63(l2)) {
          return(join(l1, []));
        } else {
          var l = [];
          var skip63 = false;
          if (list63(l1) && list63(l2)) {
            l = l1.concat(l2);
            skip63 = true;
          }
          if (!skip63) {
            var i = 0;
            var len = length(l1);
            while (i < len) {
              l[i] = l1[i];
              i = i + 1;
            }
            while (i < len + length(l2)) {
              l[i] = l2[i - len];
              i = i + 1;
            }
          }
          var _g26 = l1;
          var k = undefined;
          for (k in _g26) {
            if (isNaN(parseInt(k))) {
              var v = _g26[k];
              l[k] = v;
            }
          }
          var _g27 = l2;
          var k = undefined;
          for (k in _g27) {
            if (isNaN(parseInt(k))) {
              var v = _g27[k];
              l[k] = v;
            }
          }
          return(l);
        }
      }
    }
  }
  function reduce(f, x) {
    if (none63(x)) {
      return(x);
    } else {
      if (length(x) === 1) {
        return(hd(x));
      } else {
        return(f(hd(x), reduce(f, tl(x))));
      }
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g28 = l;
    var _g29 = 0;
    while (_g29 < length(_g28)) {
      var x = _g28[_g29];
      if (f(x)) {
        add(l1, x);
      }
      _g29 = _g29 + 1;
    }
    return(l1);
  }
  function find(f, l) {
    var _g30 = l;
    var _g31 = 0;
    while (_g31 < length(_g30)) {
      var x = _g30[_g31];
      var _g32 = f(x);
      if (_g32) {
        return(_g32);
      }
      _g31 = _g31 + 1;
    }
  }
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while (i < length(l)) {
      add(l1, [l[i], l[i + 1]]);
      i = i + 2;
    }
    return(l1);
  }
  function sort(l, f) {
    var _g33;
    if (f) {
      _g33 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g33));
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
  function splice(x) {
    return({_splice: true, value: x});
  }
  function splice63(x) {
    return(table63(x) && x._splice);
  }
  function mapl(f, l) {
    var l1 = [];
    var _g34 = l;
    var _g35 = 0;
    while (_g35 < length(_g34)) {
      var x = _g34[_g35];
      var _g36 = f(x);
      if (splice63(_g36)) {
        l1 = join(l1, _g36.value);
      } else {
        if (is63(_g36)) {
          add(l1, _g36);
        }
      }
      _g35 = _g35 + 1;
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g37 = t;
    var k = undefined;
    for (k in _g37) {
      if (isNaN(parseInt(k))) {
        var v = _g37[k];
        var x = f(v);
        if (splice63(x)) {
          l[k] = x.value;
        } else {
          if (is63(x)) {
            l[k] = x;
          }
        }
      }
    }
    return(l);
  }
  function flat(x) {
    if (atom63(x)) {
      return(x);
    } else {
      return(map(function (a) {
        if (list63(a)) {
          return(splice(flat(a)));
        } else {
          return(a);
        }
      }, x));
    }
  }
  function flat1(x) {
    if (atom63(x)) {
      return(x);
    } else {
      return(map(function (a) {
        if (list63(a)) {
          return(splice(a));
        } else {
          return(a);
        }
      }, x));
    }
  }
  function keys63(t) {
    var k63 = false;
    var _g38 = t;
    var k = undefined;
    for (k in _g38) {
      if (isNaN(parseInt(k))) {
        var v = _g38[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  }
  function empty63(t) {
    return(none63(t) && !keys63(t));
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g39 = args;
      var k = undefined;
      for (k in _g39) {
        if (isNaN(parseInt(k))) {
          var v = _g39[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  function unstash(args) {
    if (none63(args)) {
      return([]);
    } else {
      var l = last(args);
      if (table63(l) && l._stash) {
        var args1 = sub(args, 0, length(args) - 1);
        var _g40 = l;
        var k = undefined;
        for (k in _g40) {
          if (isNaN(parseInt(k))) {
            var v = _g40[k];
            if (!(k === "_stash")) {
              args1[k] = v;
            }
          }
        }
        return(args1);
      } else {
        return(args);
      }
    }
  }
  function extend(t) {
    var xs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g41 = sub(xs, 0);
    return(join(t, _g41));
  }
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g42 = sub(keys, 0);
    var t1 = sublist(t);
    var _g43 = t;
    var k = undefined;
    for (k in _g43) {
      if (isNaN(parseInt(k))) {
        var v = _g43[k];
        if (!_g42[k]) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  function search(str, pattern, start) {
    var i = str.indexOf(pattern, start);
    if (i >= 0) {
      return(i);
    }
  }
  function split(str, sep) {
    return(str.split(sep));
  }
  function cat() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g44 = sub(xs, 0);
    if (none63(_g44)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g44));
    }
  }
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g45));
  }
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g46)));
  }
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g47));
  }
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g48 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g48)));
  }
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g49)));
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
  var fs = require("fs");
  function read_file(path) {
    return(fs.readFileSync(path, "utf8"));
  }
  function write_file(path, data) {
    return(fs.writeFileSync(path, data, "utf8"));
  }
  print = function (x) {
    return(console.log(x));
  };
  function type(x) {
    return(typeof(x));
  }
  function write(x) {
    return(process.stdout.write(x));
  }
  function exit(code) {
    return(process.exit(code));
  }
  function number(str) {
    var n = parseFloat(str);
    if (!isNaN(n)) {
      return(n);
    }
  }
  function string(x) {
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
            var str = "(";
            var x1 = sub(x);
            var _g50 = x;
            var k = undefined;
            for (k in _g50) {
              if (isNaN(parseInt(k))) {
                var v = _g50[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g51 = x1;
            var i = 0;
            while (i < length(_g51)) {
              var y = _g51[i];
              str = str + string(y);
              if (i < length(x1) - 1) {
                str = str + " ";
              }
              i = i + 1;
            }
            return(str + ")");
          }
        }
      }
    }
  }
  function apply(f, args) {
    var _g52 = stash(args);
    return(f.apply(f, _g52));
  }
  var id_count = 0;
  function make_id() {
    id_count = id_count + 1;
    return("_g" + id_count);
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, i + 2));
  }
  function toplevel63() {
    return(length(environment) === 1);
  }
  function module_key(spec) {
    if (atom63(spec)) {
      return(string(spec));
    } else {
      return(reduce(function (a, b) {
        return(module_key(a) + "/" + module_key(b));
      }, spec));
    }
  }
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function setenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g53 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g54 = _g53;
      var k1 = undefined;
      for (k1 in _g54) {
        if (isNaN(parseInt(k1))) {
          var v = _g54[k1];
          x[k1] = v;
        }
      }
      if (toplevel63()) {
        var m = module(current_module);
        m.export[k] = x;
      }
      frame[k] = x;
    }
  }
  var _g55 = {};
  nexus["lumen/runtime"] = _g55;
  _g55["%"] = _37;
  _g55["%message-handler"] = _37message_handler;
  _g55["*"] = _42;
  _g55["+"] = _43;
  _g55["-"] = _;
  _g55["/"] = _47;
  _g55["<"] = _60;
  _g55["<="] = _6061;
  _g55["="] = _61;
  _g55[">"] = _62;
  _g55[">="] = _6261;
  _g55.abs = abs;
  _g55.acos = acos;
  _g55.add = add;
  _g55.apply = apply;
  _g55.asin = asin;
  _g55.atan = atan;
  _g55.atan2 = atan2;
  _g55["atom?"] = atom63;
  _g55["boolean?"] = boolean63;
  _g55.cat = cat;
  _g55.ceil = ceil;
  _g55.char = char;
  _g55.code = code;
  _g55["composite?"] = composite63;
  _g55.cos = cos;
  _g55.drop = drop;
  _g55["empty?"] = empty63;
  _g55.exclude = exclude;
  _g55.exit = exit;
  _g55.extend = extend;
  _g55.find = find;
  _g55.flat = flat;
  _g55.flat1 = flat1;
  _g55.floor = floor;
  _g55.fs = fs;
  _g55["function?"] = function63;
  _g55.hd = hd;
  _g55["id-count"] = id_count;
  _g55["id-literal?"] = id_literal63;
  _g55["in?"] = in63;
  _g55.inner = inner;
  _g55["is?"] = is63;
  _g55.iterate = iterate;
  _g55.join = join;
  _g55.keep = keep;
  _g55["keys?"] = keys63;
  _g55.last = last;
  _g55.length = length;
  _g55["list?"] = list63;
  _g55.log = log;
  _g55.log10 = log10;
  _g55["make-id"] = make_id;
  _g55.map = map;
  _g55.mapl = mapl;
  _g55.math = math;
  _g55.max = max;
  _g55.min = min;
  _g55.module = module;
  _g55["module-key"] = module_key;
  _g55["nil?"] = nil63;
  _g55["none?"] = none63;
  _g55.number = number;
  _g55["number?"] = number63;
  _g55.pairwise = pairwise;
  _g55.pow = pow;
  _g55.random = random;
  _g55["read-file"] = read_file;
  _g55.reduce = reduce;
  _g55.replicate = replicate;
  _g55.reverse = reverse;
  _g55.sd = sd;
  _g55.search = search;
  _g55.setenv = setenv;
  _g55.sin = sin;
  _g55.sinh = sinh;
  _g55["some?"] = some63;
  _g55.sort = sort;
  _g55.splice = splice;
  _g55["splice?"] = splice63;
  _g55.split = split;
  _g55.sqrt = sqrt;
  _g55.stash = stash;
  _g55.string = string;
  _g55["string-literal?"] = string_literal63;
  _g55["string?"] = string63;
  _g55.sub = sub;
  _g55.sublist = sublist;
  _g55.substring = substring;
  _g55["table?"] = table63;
  _g55.tan = tan;
  _g55.tanh = tanh;
  _g55.td = td;
  _g55.tl = tl;
  _g55["toplevel?"] = toplevel63;
  _g55.type = type;
  _g55.unstash = unstash;
  _g55.write = write;
  _g55["write-file"] = write_file;
})();
(function () {
  var _g60 = nexus["lumen/runtime"];
  var _37 = _g60["%"];
  var _37message_handler = _g60["%message-handler"];
  var _42 = _g60["*"];
  var _43 = _g60["+"];
  var _ = _g60["-"];
  var _47 = _g60["/"];
  var _60 = _g60["<"];
  var _6061 = _g60["<="];
  var _61 = _g60["="];
  var _62 = _g60[">"];
  var _6261 = _g60[">="];
  var abs = _g60.abs;
  var acos = _g60.acos;
  var add = _g60.add;
  var apply = _g60.apply;
  var asin = _g60.asin;
  var atan = _g60.atan;
  var atan2 = _g60.atan2;
  var atom63 = _g60["atom?"];
  var boolean63 = _g60["boolean?"];
  var cat = _g60.cat;
  var ceil = _g60.ceil;
  var char = _g60.char;
  var code = _g60.code;
  var composite63 = _g60["composite?"];
  var cos = _g60.cos;
  var drop = _g60.drop;
  var empty63 = _g60["empty?"];
  var exclude = _g60.exclude;
  var exit = _g60.exit;
  var extend = _g60.extend;
  var find = _g60.find;
  var flat = _g60.flat;
  var flat1 = _g60.flat1;
  var floor = _g60.floor;
  var function63 = _g60["function?"];
  var hd = _g60.hd;
  var id_literal63 = _g60["id-literal?"];
  var in63 = _g60["in?"];
  var inner = _g60.inner;
  var is63 = _g60["is?"];
  var iterate = _g60.iterate;
  var join = _g60.join;
  var keep = _g60.keep;
  var keys63 = _g60["keys?"];
  var last = _g60.last;
  var length = _g60.length;
  var list63 = _g60["list?"];
  var log = _g60.log;
  var log10 = _g60.log10;
  var make_id = _g60["make-id"];
  var map = _g60.map;
  var max = _g60.max;
  var min = _g60.min;
  var module = _g60.module;
  var module_key = _g60["module-key"];
  var nil63 = _g60["nil?"];
  var none63 = _g60["none?"];
  var number = _g60.number;
  var number63 = _g60["number?"];
  var pairwise = _g60.pairwise;
  var pow = _g60.pow;
  var random = _g60.random;
  var read_file = _g60["read-file"];
  var reduce = _g60.reduce;
  var replicate = _g60.replicate;
  var reverse = _g60.reverse;
  var sd = _g60.sd;
  var search = _g60.search;
  var setenv = _g60.setenv;
  var sin = _g60.sin;
  var sinh = _g60.sinh;
  var some63 = _g60["some?"];
  var sort = _g60.sort;
  var splice = _g60.splice;
  var split = _g60.split;
  var sqrt = _g60.sqrt;
  var stash = _g60.stash;
  var string = _g60.string;
  var string_literal63 = _g60["string-literal?"];
  var string63 = _g60["string?"];
  var sub = _g60.sub;
  var sublist = _g60.sublist;
  var substring = _g60.substring;
  var table63 = _g60["table?"];
  var tan = _g60.tan;
  var tanh = _g60.tanh;
  var td = _g60.td;
  var tl = _g60.tl;
  var toplevel63 = _g60["toplevel?"];
  var unstash = _g60.unstash;
  var write = _g60.write;
  var write_file = _g60["write-file"];
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g63 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g64 = undefined;
        var _g65 = _g63;
        var x = undefined;
        for (x in _g65) {
          if (isNaN(parseInt(x))) {
            var _g56 = _g65[x];
            _g64 = x;
          }
        }
        if (_g64) {
          return(b[_g64]);
        } else {
          return(b);
        }
      }
    }
  }
  function macro_function(k) {
    return(getenv(k, {_stash: true, macro: true}));
  }
  function macro63(k) {
    return(is63(macro_function(k)));
  }
  function special63(k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  }
  function special_form63(form) {
    return(list63(form) && special63(hd(form)));
  }
  function statement63(k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  }
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
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
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  function bound63(x) {
    return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while (i < length(str)) {
      var c = char(str, i);
      var _g66;
      if (c === "\n") {
        _g66 = "\\n";
      } else {
        var _g67;
        if (c === "\"") {
          _g67 = "\\\"";
        } else {
          var _g68;
          if (c === "\\") {
            _g68 = "\\\\";
          } else {
            _g68 = c;
          }
          _g67 = _g68;
        }
        _g66 = _g67;
      }
      var c1 = _g66;
      str1 = str1 + c1;
      i = i + 1;
    }
    return(str1 + "\"");
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
  function stash42(args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var _g69 = args;
      var k = undefined;
      for (k in _g69) {
        if (isNaN(parseInt(k))) {
          var v = _g69[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  }
  function bind(lh, rh) {
    if (composite63(lh) && list63(rh)) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var r = lh.rest;
        var _g70 = lh;
        var i = 0;
        while (i < length(_g70)) {
          var x = _g70[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g71 = lh;
        var k = undefined;
        for (k in _g71) {
          if (isNaN(parseInt(k))) {
            var v = _g71[k];
            if (v === true) {
              v = k;
            }
            if (!(k === "rest")) {
              bs = join(bs, bind(v, ["get", rh, ["quote", k]]));
            }
          }
        }
        return(bs);
      }
    }
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if (target === "js") {
        return(["unstash", [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", length(args1)]]);
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest()]], body)]]);
    } else {
      var bs = [];
      var r = args.rest || keys63(args) && make_id();
      var _g72 = args;
      var _g73 = 0;
      while (_g73 < length(_g72)) {
        var arg = _g72[_g73];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g73 = _g73 + 1;
      }
      if (r) {
        bs = join(bs, [r, rest()]);
      }
      if (keys63(args)) {
        bs = join(bs, [sub(args, length(args)), r]);
      }
      if (none63(bs)) {
        return([args1, body]);
      } else {
        return([args1, [join(["let", bs], body)]]);
      }
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
        if (x === "%function") {
          var _g57 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g76 = args;
          var _g77 = 0;
          while (_g77 < length(_g76)) {
            var _g74 = _g76[_g77];
            setenv(_g74, {_stash: true, variable: true});
            _g77 = _g77 + 1;
          }
          var _g75 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g75);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g58 = form[0];
            var name = form[1];
            var _g78 = form[2];
            var _g79 = sub(form, 3);
            add(environment, {_scope: true});
            var _g82 = _g78;
            var _g83 = 0;
            while (_g83 < length(_g82)) {
              var _g80 = _g82[_g83];
              setenv(_g80, {_stash: true, variable: true});
              _g83 = _g83 + 1;
            }
            var _g81 = join([x, name, map(macroexpand, _g78)], macroexpand(_g79));
            drop(environment);
            return(_g81);
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
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g84 = form;
    var k = undefined;
    for (k in _g84) {
      if (isNaN(parseInt(k))) {
        var v = _g84[k];
        var _g89;
        if (quasisplice63(v, depth)) {
          _g89 = quasiexpand(v[1]);
        } else {
          _g89 = quasiexpand(v, depth);
        }
        var _g85 = _g89;
        last(xs)[k] = _g85;
      }
    }
    var _g86 = form;
    var _g87 = 0;
    while (_g87 < length(_g86)) {
      var x = _g86[_g87];
      if (quasisplice63(x, depth)) {
        var _g88 = quasiexpand(x[1]);
        add(xs, _g88);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g87 = _g87 + 1;
    }
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
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"%": true, "*": true, "+": true, "-": true, "/": true, "<": true, "<=": true, "=": true, "==": true, ">": true, ">=": true, "and": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "elseif": true, "end": true, "false": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "local": true, "new": true, "nil": true, "not": true, "or": true, "repeat": true, "return": true, "switch": true, "then": true, "this": true, "throw": true, "true": true, "try": true, "typeof": true, "until": true, "var": true, "void": true, "while": true, "with": true};
  function reserved63(x) {
    return(reserved[x]);
  }
  function numeric63(n) {
    return(n > 47 && n < 58);
  }
  function valid_char63(n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
  }
  function valid_id63(id) {
    if (none63(id)) {
      return(false);
    } else {
      if (special63(id)) {
        return(false);
      } else {
        if (reserved63(id)) {
          return(false);
        } else {
          var i = 0;
          while (i < length(id)) {
            var n = code(id, i);
            var valid63 = valid_char63(n);
            if (!valid63 || i === 0 && numeric63(n)) {
              return(false);
            }
            i = i + 1;
          }
          return(true);
        }
      }
    }
  }
  function id(id) {
    var id1 = "";
    var i = 0;
    while (i < length(id)) {
      var c = char(id, i);
      var n = code(c);
      var _g95;
      if (c === "-") {
        _g95 = "_";
      } else {
        var _g96;
        if (valid_char63(n)) {
          _g96 = c;
        } else {
          var _g97;
          if (i === 0) {
            _g97 = "_" + n;
          } else {
            _g97 = n;
          }
          _g96 = _g97;
        }
        _g95 = _g96;
      }
      var c1 = _g95;
      id1 = id1 + c1;
      i = i + 1;
    }
    return(id1);
  }
  function sortk(l, k) {
    return(sort(l, function (a, b) {
      return(k(a) < k(b));
    }));
  }
  function imported(spec) {
    var _g98 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g98.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g99 = module(spec).export;
      var n = undefined;
      for (n in _g99) {
        if (isNaN(parseInt(n))) {
          var b = _g99[n];
          if (b.variable && (all || b.export)) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], sortk(imports, sd)));
    }
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g100 = module(current_module).export;
    var n = undefined;
    for (n in _g100) {
      if (isNaN(parseInt(n))) {
        var b = _g100[n];
        if (b.variable) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join([["%local", m, ["table"]], ["set", ["get", "nexus", ["quote", k]], m]], sortk(exports, td)));
    } else {
      return([]);
    }
  }
  function quote_binding(b) {
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
    } else {
      if (b.macro && b.form) {
        return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
      } else {
        if (b.special && b.form) {
          return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
        } else {
          if (is63(b.variable)) {
            return(b);
          } else {
            if (is63(b.global)) {
              return(b);
            }
          }
        }
      }
    }
  }
  function mapo(f, t) {
    var o = [];
    var _g101 = t;
    var k = undefined;
    for (k in _g101) {
      if (isNaN(parseInt(k))) {
        var v = _g101[k];
        var x = f(v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    var _g102 = ["table"];
    _g102.alias = quoted(m.alias);
    _g102.export = quote_frame(m.export);
    _g102.import = quoted(m.import);
    return(_g102);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g103 = {};
  nexus["lumen/utilities"] = _g103;
  _g103.bind = bind;
  _g103["bind*"] = bind42;
  _g103["bound?"] = bound63;
  _g103["can-unquote?"] = can_unquote63;
  _g103.escape = escape;
  _g103.exported = exported;
  _g103.getenv = getenv;
  _g103["global?"] = global63;
  _g103.id = id;
  _g103.imported = imported;
  _g103.indentation = indentation;
  _g103["initial-environment"] = initial_environment;
  _g103["macro-function"] = macro_function;
  _g103["macro?"] = macro63;
  _g103.macroexpand = macroexpand;
  _g103.mapo = mapo;
  _g103["numeric?"] = numeric63;
  _g103.quasiexpand = quasiexpand;
  _g103["quasiquote-list"] = quasiquote_list;
  _g103["quasiquoting?"] = quasiquoting63;
  _g103["quasisplice?"] = quasisplice63;
  _g103["quote-binding"] = quote_binding;
  _g103["quote-environment"] = quote_environment;
  _g103["quote-frame"] = quote_frame;
  _g103["quote-module"] = quote_module;
  _g103["quote-modules"] = quote_modules;
  _g103.quoted = quoted;
  _g103["quoting?"] = quoting63;
  _g103.reserved = reserved;
  _g103["reserved?"] = reserved63;
  _g103.sortk = sortk;
  _g103["special-form?"] = special_form63;
  _g103["special?"] = special63;
  _g103["stash*"] = stash42;
  _g103["statement?"] = statement63;
  _g103["symbol-expansion"] = symbol_expansion;
  _g103["symbol?"] = symbol63;
  _g103["toplevel?"] = toplevel63;
  _g103["valid-char?"] = valid_char63;
  _g103["valid-id?"] = valid_id63;
  _g103["variable?"] = variable63;
})();
(function () {
  var _g105 = nexus["lumen/runtime"];
  var _37 = _g105["%"];
  var _37message_handler = _g105["%message-handler"];
  var _42 = _g105["*"];
  var _43 = _g105["+"];
  var _ = _g105["-"];
  var _47 = _g105["/"];
  var _60 = _g105["<"];
  var _6061 = _g105["<="];
  var _61 = _g105["="];
  var _62 = _g105[">"];
  var _6261 = _g105[">="];
  var abs = _g105.abs;
  var acos = _g105.acos;
  var add = _g105.add;
  var apply = _g105.apply;
  var asin = _g105.asin;
  var atan = _g105.atan;
  var atan2 = _g105.atan2;
  var atom63 = _g105["atom?"];
  var boolean63 = _g105["boolean?"];
  var cat = _g105.cat;
  var ceil = _g105.ceil;
  var char = _g105.char;
  var code = _g105.code;
  var composite63 = _g105["composite?"];
  var cos = _g105.cos;
  var drop = _g105.drop;
  var empty63 = _g105["empty?"];
  var exclude = _g105.exclude;
  var exit = _g105.exit;
  var extend = _g105.extend;
  var find = _g105.find;
  var flat = _g105.flat;
  var flat1 = _g105.flat1;
  var floor = _g105.floor;
  var function63 = _g105["function?"];
  var hd = _g105.hd;
  var id_literal63 = _g105["id-literal?"];
  var in63 = _g105["in?"];
  var inner = _g105.inner;
  var is63 = _g105["is?"];
  var iterate = _g105.iterate;
  var join = _g105.join;
  var keep = _g105.keep;
  var keys63 = _g105["keys?"];
  var last = _g105.last;
  var length = _g105.length;
  var list63 = _g105["list?"];
  var log = _g105.log;
  var log10 = _g105.log10;
  var make_id = _g105["make-id"];
  var map = _g105.map;
  var max = _g105.max;
  var min = _g105.min;
  var module = _g105.module;
  var module_key = _g105["module-key"];
  var nil63 = _g105["nil?"];
  var none63 = _g105["none?"];
  var number = _g105.number;
  var number63 = _g105["number?"];
  var pairwise = _g105.pairwise;
  var pow = _g105.pow;
  var random = _g105.random;
  var read_file = _g105["read-file"];
  var reduce = _g105.reduce;
  var replicate = _g105.replicate;
  var reverse = _g105.reverse;
  var sd = _g105.sd;
  var search = _g105.search;
  var setenv = _g105.setenv;
  var sin = _g105.sin;
  var sinh = _g105.sinh;
  var some63 = _g105["some?"];
  var sort = _g105.sort;
  var splice = _g105.splice;
  var split = _g105.split;
  var sqrt = _g105.sqrt;
  var stash = _g105.stash;
  var string = _g105.string;
  var string_literal63 = _g105["string-literal?"];
  var string63 = _g105["string?"];
  var sub = _g105.sub;
  var sublist = _g105.sublist;
  var substring = _g105.substring;
  var table63 = _g105["table?"];
  var tan = _g105.tan;
  var tanh = _g105.tanh;
  var td = _g105.td;
  var tl = _g105.tl;
  var toplevel63 = _g105["toplevel?"];
  var unstash = _g105.unstash;
  var write = _g105.write;
  var write_file = _g105["write-file"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {" ": true, "\n": true, "\t": true};
  function make_stream(str) {
    return({len: length(str), pos: 0, string: str});
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
  var read_table = {};
  var eof = {};
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
    return(read(make_stream(str)));
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
            return(make_id());
          } else {
            if (dot63) {
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
          var k = sub(x, 0, length(x) - 1);
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
  var _g117 = {};
  nexus["lumen/reader"] = _g117;
  _g117.delimiters = delimiters;
  _g117.eof = eof;
  _g117["flag?"] = flag63;
  _g117["key?"] = key63;
  _g117["make-stream"] = make_stream;
  _g117["peek-char"] = peek_char;
  _g117.read = read;
  _g117["read-all"] = read_all;
  _g117["read-char"] = read_char;
  _g117["read-from-string"] = read_from_string;
  _g117["read-table"] = read_table;
  _g117["skip-non-code"] = skip_non_code;
  _g117.whitespace = whitespace;
})();
(function () {
  var _g119 = nexus["lumen/utilities"];
  var bind = _g119.bind;
  var bind42 = _g119["bind*"];
  var bound63 = _g119["bound?"];
  var exported = _g119.exported;
  var getenv = _g119.getenv;
  var id = _g119.id;
  var imported = _g119.imported;
  var indentation = _g119.indentation;
  var initial_environment = _g119["initial-environment"];
  var macro_function = _g119["macro-function"];
  var macro63 = _g119["macro?"];
  var macroexpand = _g119.macroexpand;
  var mapo = _g119.mapo;
  var quasiexpand = _g119.quasiexpand;
  var quote_environment = _g119["quote-environment"];
  var quote_modules = _g119["quote-modules"];
  var quoted = _g119.quoted;
  var reserved63 = _g119["reserved?"];
  var sortk = _g119.sortk;
  var special_form63 = _g119["special-form?"];
  var special63 = _g119["special?"];
  var stash42 = _g119["stash*"];
  var statement63 = _g119["statement?"];
  var symbol_expansion = _g119["symbol-expansion"];
  var symbol63 = _g119["symbol?"];
  var toplevel63 = _g119["toplevel?"];
  var valid_id63 = _g119["valid-id?"];
  var variable63 = _g119["variable?"];
  var _g120 = nexus["lumen/reader"];
  var make_stream = _g120["make-stream"];
  var read = _g120.read;
  var read_all = _g120["read-all"];
  var read_from_string = _g120["read-from-string"];
  var read_table = _g120["read-table"];
  var _g121 = nexus["lumen/runtime"];
  var _37 = _g121["%"];
  var _37message_handler = _g121["%message-handler"];
  var _42 = _g121["*"];
  var _43 = _g121["+"];
  var _ = _g121["-"];
  var _47 = _g121["/"];
  var _60 = _g121["<"];
  var _6061 = _g121["<="];
  var _61 = _g121["="];
  var _62 = _g121[">"];
  var _6261 = _g121[">="];
  var abs = _g121.abs;
  var acos = _g121.acos;
  var add = _g121.add;
  var apply = _g121.apply;
  var asin = _g121.asin;
  var atan = _g121.atan;
  var atan2 = _g121.atan2;
  var atom63 = _g121["atom?"];
  var boolean63 = _g121["boolean?"];
  var cat = _g121.cat;
  var ceil = _g121.ceil;
  var char = _g121.char;
  var code = _g121.code;
  var composite63 = _g121["composite?"];
  var cos = _g121.cos;
  var drop = _g121.drop;
  var empty63 = _g121["empty?"];
  var exclude = _g121.exclude;
  var exit = _g121.exit;
  var extend = _g121.extend;
  var find = _g121.find;
  var flat = _g121.flat;
  var flat1 = _g121.flat1;
  var floor = _g121.floor;
  var function63 = _g121["function?"];
  var hd = _g121.hd;
  var id_literal63 = _g121["id-literal?"];
  var in63 = _g121["in?"];
  var inner = _g121.inner;
  var is63 = _g121["is?"];
  var iterate = _g121.iterate;
  var join = _g121.join;
  var keep = _g121.keep;
  var keys63 = _g121["keys?"];
  var last = _g121.last;
  var length = _g121.length;
  var list63 = _g121["list?"];
  var log = _g121.log;
  var log10 = _g121.log10;
  var make_id = _g121["make-id"];
  var map = _g121.map;
  var max = _g121.max;
  var min = _g121.min;
  var module = _g121.module;
  var module_key = _g121["module-key"];
  var nil63 = _g121["nil?"];
  var none63 = _g121["none?"];
  var number = _g121.number;
  var number63 = _g121["number?"];
  var pairwise = _g121.pairwise;
  var pow = _g121.pow;
  var random = _g121.random;
  var read_file = _g121["read-file"];
  var reduce = _g121.reduce;
  var replicate = _g121.replicate;
  var reverse = _g121.reverse;
  var sd = _g121.sd;
  var search = _g121.search;
  var setenv = _g121.setenv;
  var sin = _g121.sin;
  var sinh = _g121.sinh;
  var some63 = _g121["some?"];
  var sort = _g121.sort;
  var splice = _g121.splice;
  var split = _g121.split;
  var sqrt = _g121.sqrt;
  var stash = _g121.stash;
  var string = _g121.string;
  var string_literal63 = _g121["string-literal?"];
  var string63 = _g121["string?"];
  var sub = _g121.sub;
  var sublist = _g121.sublist;
  var substring = _g121.substring;
  var table63 = _g121["table?"];
  var tan = _g121.tan;
  var tanh = _g121.tanh;
  var td = _g121.td;
  var tl = _g121.tl;
  var toplevel63 = _g121["toplevel?"];
  var unstash = _g121.unstash;
  var write = _g121.write;
  var write_file = _g121["write-file"];
  var _g127 = [];
  _g127.js = "!";
  _g127.lua = "not ";
  var _g125 = [];
  var _g128 = [];
  _g128.js = "!";
  _g128.lua = "not ";
  _g125["not"] = _g128;
  var _g130 = [];
  _g130["%"] = true;
  _g130["*"] = true;
  _g130["/"] = true;
  var _g132 = [];
  _g132["+"] = true;
  _g132["-"] = true;
  var _g136 = [];
  _g136.js = "+";
  _g136.lua = "..";
  var _g134 = [];
  var _g137 = [];
  _g137.js = "+";
  _g137.lua = "..";
  _g134.cat = _g137;
  var _g139 = [];
  _g139["<"] = true;
  _g139["<="] = true;
  _g139[">"] = true;
  _g139[">="] = true;
  var _g143 = [];
  _g143.js = "===";
  _g143.lua = "==";
  var _g145 = [];
  _g145.js = "!=";
  _g145.lua = "~=";
  var _g141 = [];
  var _g146 = [];
  _g146.js = "===";
  _g146.lua = "==";
  _g141["="] = _g146;
  var _g147 = [];
  _g147.js = "!=";
  _g147.lua = "~=";
  _g141["~="] = _g147;
  var _g151 = [];
  _g151.js = "&&";
  _g151.lua = "and";
  var _g149 = [];
  var _g152 = [];
  _g152.js = "&&";
  _g152.lua = "and";
  _g149["and"] = _g152;
  var _g156 = [];
  _g156.js = "||";
  _g156.lua = "or";
  var _g154 = [];
  var _g157 = [];
  _g157.js = "||";
  _g157.lua = "or";
  _g154["or"] = _g157;
  var infix = [_g125, _g130, _g132, _g134, _g139, _g141, _g149, _g154];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g158 = infix;
      var i = 0;
      while (i < length(_g158)) {
        var level = _g158[i];
        if (level[hd(form)]) {
          return(i);
        }
        i = i + 1;
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
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g159 = args;
    var i = 0;
    while (i < length(_g159)) {
      var arg = _g159[i];
      str = str + compile(arg);
      if (i < length(args) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + ")");
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
    var _g160 = getenv(x);
    var stmt = _g160.stmt;
    var special = _g160.special;
    var self_tr63 = _g160.tr;
    var tr = terminator(stmt63 && !self_tr63);
    return(apply(special, args) + tr);
  }
  function parenthesize_call63(x) {
    return(list63(x) && (hd(x) === "%function" || precedence(x) > 0));
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
    var _g161 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g161.right;
    var _g162;
    if (right) {
      _g162 = _6261;
    } else {
      _g162 = _62;
    }
    if (_g162(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g163 = sub(form, 1);
    var a = _g163[0];
    var b = _g163[1];
    var _g164 = op_delims(form, a);
    var ao = _g164[0];
    var ac = _g164[1];
    var _g165 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g165[0];
    var bc = _g165[1];
    var _g166 = compile(a);
    var _g167 = compile(b);
    var _g168 = getop(op);
    if (unary63(form)) {
      return(_g168 + ao + _g166 + ac);
    } else {
      return(ao + _g166 + ac + " " + _g168 + " " + bo + _g167 + bc);
    }
  }
  function compile_function(args, body) {
    var _g169 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g169.name;
    var prefix = _g169.prefix;
    var _g174;
    if (name) {
      _g174 = compile(name);
    } else {
      _g174 = "";
    }
    var id = _g174;
    var _g170 = prefix || "";
    var _g171 = compile_args(args);
    indent_level = indent_level + 1;
    var _g173 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g172 = _g173;
    var ind = indentation();
    var _g175;
    if (target === "js") {
      _g175 = "";
    } else {
      _g175 = "end";
    }
    var tr = _g175;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g171 + " {\n" + _g172 + ind + "}" + tr);
    } else {
      return(_g170 + "function " + id + _g171 + "\n" + _g172 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g176 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g176.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g178;
        if (stmt) {
          _g178 = indentation();
        } else {
          _g178 = "";
        }
        var ind = _g178;
        var _g179;
        if (atom63(form)) {
          _g179 = compile_atom(form);
        } else {
          var _g180;
          if (infix63(hd(form))) {
            _g180 = compile_infix(form);
          } else {
            _g180 = compile_call(form);
          }
          _g179 = _g180;
        }
        var _g177 = _g179;
        return(ind + _g177 + tr);
      }
    }
  };
  var lower;
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
    var _g181 = sub(args, 0, length(args) - 1);
    var _g182 = 0;
    while (_g182 < length(_g181)) {
      var x = _g181[_g182];
      add(hoist, lower(x, hoist, stmt63));
      _g182 = _g182 + 1;
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && can_return63(e)) {
      return(["return", e]);
    } else {
      return(e);
    }
  }
  function lower_if(args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g183 = args[1];
    var _g184 = args[2];
    if (stmt63 || tail63) {
      var _g186;
      if (_g184) {
        _g186 = [lower_body([_g184], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g183], tail63)], _g186)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g185;
      if (_g184) {
        _g185 = [lower(["set", e, _g184])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g183])], _g185));
      return(e);
    }
  }
  function lower_short(x, args, hoist) {
    var a = args[0];
    var b = args[1];
    var hoist1 = [];
    var b1 = lower(b, hoist1);
    if (some63(hoist1)) {
      var id = make_id();
      var _g187;
      if (x === "and") {
        _g187 = ["%if", id, b, id];
      } else {
        _g187 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g187], hoist));
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
    var _g188 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g188, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g189 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g189)) {
      return(_g189);
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
  function process(form) {
    return(lower(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return(module_key(spec) + ".l");
  }
  function encapsulate(body) {
    var _g190 = map(process, body);
    var epilogue = map(process, exported());
    return([["%function", [], join(["do"], join(_g190, epilogue))]]);
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return(compile(form) + ";\n");
  }
  function run(code) {
    return(global.eval(code));
  }
  var compiling63 = false;
  var compiler_output = "";
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    current_module = mod0;
    environment = env0;
    if (compiling63) {
      compiler_output = compiler_output + compiled;
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g191 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g191.all;
    var m = module(spec);
    var frame = last(environment);
    var _g192 = m.export;
    var k = undefined;
    for (k in _g192) {
      if (isNaN(parseInt(k))) {
        var v = _g192[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g193 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g193.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
  }
  function in_module(spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  function compile_module(spec) {
    compiling63 = true;
    _37compile_module(spec);
    return(compiler_output);
  }
  function reimported() {
    var m = module(current_module);
    return(join(imported(current_module, {_stash: true, all: true}), map(function (x) {
      return(splice(imported(x)));
    }, m.import)));
  }
  global._37result = undefined;
  function eval(form) {
    var previous = target;
    target = "js";
    var prologue = map(process, reimported());
    var result = process(["set", "%result", form]);
    var compiled = compile([["%function", [], join(["do"], join(prologue, [result]))]]);
    target = previous;
    run(compiled);
    return(_37result);
  }
  var _g194 = {};
  nexus["lumen/compiler"] = _g194;
  _g194["%compile-module"] = _37compile_module;
  _g194["can-return?"] = can_return63;
  _g194.compile = compile;
  _g194["compile-args"] = compile_args;
  _g194["compile-atom"] = compile_atom;
  _g194["compile-call"] = compile_call;
  _g194["compile-file"] = compile_file;
  _g194["compile-function"] = compile_function;
  _g194["compile-infix"] = compile_infix;
  _g194["compile-module"] = compile_module;
  _g194["compile-special"] = compile_special;
  _g194["compiler-output"] = compiler_output;
  _g194["compiling?"] = compiling63;
  _g194.encapsulate = encapsulate;
  _g194.eval = eval;
  _g194.getop = getop;
  _g194["in-module"] = in_module;
  _g194.infix = infix;
  _g194["infix?"] = infix63;
  _g194["load-module"] = load_module;
  _g194.lower = lower;
  _g194["lower-body"] = lower_body;
  _g194["lower-call"] = lower_call;
  _g194["lower-definition"] = lower_definition;
  _g194["lower-do"] = lower_do;
  _g194["lower-for"] = lower_for;
  _g194["lower-function"] = lower_function;
  _g194["lower-if"] = lower_if;
  _g194["lower-infix"] = lower_infix;
  _g194["lower-infix?"] = lower_infix63;
  _g194["lower-short"] = lower_short;
  _g194["lower-special"] = lower_special;
  _g194["lower-statement"] = lower_statement;
  _g194["lower-try"] = lower_try;
  _g194["lower-while"] = lower_while;
  _g194["module-path"] = module_path;
  _g194["op-delims"] = op_delims;
  _g194["open-module"] = open_module;
  _g194["parenthesize-call?"] = parenthesize_call63;
  _g194.precedence = precedence;
  _g194.process = process;
  _g194.reimported = reimported;
  _g194.run = run;
  _g194.terminator = terminator;
  _g194["unary?"] = unary63;
})();
(function () {
  var _g196 = nexus["lumen/utilities"];
  var bind = _g196.bind;
  var bind42 = _g196["bind*"];
  var bound63 = _g196["bound?"];
  var exported = _g196.exported;
  var getenv = _g196.getenv;
  var id = _g196.id;
  var imported = _g196.imported;
  var indentation = _g196.indentation;
  var initial_environment = _g196["initial-environment"];
  var macro_function = _g196["macro-function"];
  var macro63 = _g196["macro?"];
  var macroexpand = _g196.macroexpand;
  var mapo = _g196.mapo;
  var quasiexpand = _g196.quasiexpand;
  var quote_environment = _g196["quote-environment"];
  var quote_modules = _g196["quote-modules"];
  var quoted = _g196.quoted;
  var reserved63 = _g196["reserved?"];
  var sortk = _g196.sortk;
  var special_form63 = _g196["special-form?"];
  var special63 = _g196["special?"];
  var stash42 = _g196["stash*"];
  var statement63 = _g196["statement?"];
  var symbol_expansion = _g196["symbol-expansion"];
  var symbol63 = _g196["symbol?"];
  var toplevel63 = _g196["toplevel?"];
  var valid_id63 = _g196["valid-id?"];
  var variable63 = _g196["variable?"];
  var _g197 = nexus["lumen/compiler"];
  var compile = _g197.compile;
  var compile_function = _g197["compile-function"];
  var compile_module = _g197["compile-module"];
  var eval = _g197.eval;
  var in_module = _g197["in-module"];
  var load_module = _g197["load-module"];
  var open_module = _g197["open-module"];
  var _g198 = nexus["lumen/runtime"];
  var _37 = _g198["%"];
  var _37message_handler = _g198["%message-handler"];
  var _42 = _g198["*"];
  var _43 = _g198["+"];
  var _ = _g198["-"];
  var _47 = _g198["/"];
  var _60 = _g198["<"];
  var _6061 = _g198["<="];
  var _61 = _g198["="];
  var _62 = _g198[">"];
  var _6261 = _g198[">="];
  var abs = _g198.abs;
  var acos = _g198.acos;
  var add = _g198.add;
  var apply = _g198.apply;
  var asin = _g198.asin;
  var atan = _g198.atan;
  var atan2 = _g198.atan2;
  var atom63 = _g198["atom?"];
  var boolean63 = _g198["boolean?"];
  var cat = _g198.cat;
  var ceil = _g198.ceil;
  var char = _g198.char;
  var code = _g198.code;
  var composite63 = _g198["composite?"];
  var cos = _g198.cos;
  var drop = _g198.drop;
  var empty63 = _g198["empty?"];
  var exclude = _g198.exclude;
  var exit = _g198.exit;
  var extend = _g198.extend;
  var find = _g198.find;
  var flat = _g198.flat;
  var flat1 = _g198.flat1;
  var floor = _g198.floor;
  var function63 = _g198["function?"];
  var hd = _g198.hd;
  var id_literal63 = _g198["id-literal?"];
  var in63 = _g198["in?"];
  var inner = _g198.inner;
  var is63 = _g198["is?"];
  var iterate = _g198.iterate;
  var join = _g198.join;
  var keep = _g198.keep;
  var keys63 = _g198["keys?"];
  var last = _g198.last;
  var length = _g198.length;
  var list63 = _g198["list?"];
  var log = _g198.log;
  var log10 = _g198.log10;
  var make_id = _g198["make-id"];
  var map = _g198.map;
  var max = _g198.max;
  var min = _g198.min;
  var module = _g198.module;
  var module_key = _g198["module-key"];
  var nil63 = _g198["nil?"];
  var none63 = _g198["none?"];
  var number = _g198.number;
  var number63 = _g198["number?"];
  var pairwise = _g198.pairwise;
  var pow = _g198.pow;
  var random = _g198.random;
  var read_file = _g198["read-file"];
  var reduce = _g198.reduce;
  var replicate = _g198.replicate;
  var reverse = _g198.reverse;
  var sd = _g198.sd;
  var search = _g198.search;
  var setenv = _g198.setenv;
  var sin = _g198.sin;
  var sinh = _g198.sinh;
  var some63 = _g198["some?"];
  var sort = _g198.sort;
  var splice = _g198.splice;
  var split = _g198.split;
  var sqrt = _g198.sqrt;
  var stash = _g198.stash;
  var string = _g198.string;
  var string_literal63 = _g198["string-literal?"];
  var string63 = _g198["string?"];
  var sub = _g198.sub;
  var sublist = _g198.sublist;
  var substring = _g198.substring;
  var table63 = _g198["table?"];
  var tan = _g198.tan;
  var tanh = _g198.tanh;
  var td = _g198.td;
  var tl = _g198.tl;
  var toplevel63 = _g198["toplevel?"];
  var unstash = _g198.unstash;
  var write = _g198.write;
  var write_file = _g198["write-file"];
})();
(function () {
  var _g398 = nexus["lumen/utilities"];
  var bind = _g398.bind;
  var bind42 = _g398["bind*"];
  var bound63 = _g398["bound?"];
  var exported = _g398.exported;
  var getenv = _g398.getenv;
  var id = _g398.id;
  var imported = _g398.imported;
  var indentation = _g398.indentation;
  var initial_environment = _g398["initial-environment"];
  var macro_function = _g398["macro-function"];
  var macro63 = _g398["macro?"];
  var macroexpand = _g398.macroexpand;
  var mapo = _g398.mapo;
  var quasiexpand = _g398.quasiexpand;
  var quote_environment = _g398["quote-environment"];
  var quote_modules = _g398["quote-modules"];
  var quoted = _g398.quoted;
  var reserved63 = _g398["reserved?"];
  var sortk = _g398.sortk;
  var special_form63 = _g398["special-form?"];
  var special63 = _g398["special?"];
  var stash42 = _g398["stash*"];
  var statement63 = _g398["statement?"];
  var symbol_expansion = _g398["symbol-expansion"];
  var symbol63 = _g398["symbol?"];
  var toplevel63 = _g398["toplevel?"];
  var valid_id63 = _g398["valid-id?"];
  var variable63 = _g398["variable?"];
  var _g399 = nexus["lumen/compiler"];
  var compile = _g399.compile;
  var compile_function = _g399["compile-function"];
  var compile_module = _g399["compile-module"];
  var eval = _g399.eval;
  var in_module = _g399["in-module"];
  var load_module = _g399["load-module"];
  var open_module = _g399["open-module"];
  var _g400 = nexus["lumen/runtime"];
  var _37 = _g400["%"];
  var _37message_handler = _g400["%message-handler"];
  var _42 = _g400["*"];
  var _43 = _g400["+"];
  var _ = _g400["-"];
  var _47 = _g400["/"];
  var _60 = _g400["<"];
  var _6061 = _g400["<="];
  var _61 = _g400["="];
  var _62 = _g400[">"];
  var _6261 = _g400[">="];
  var abs = _g400.abs;
  var acos = _g400.acos;
  var add = _g400.add;
  var apply = _g400.apply;
  var asin = _g400.asin;
  var atan = _g400.atan;
  var atan2 = _g400.atan2;
  var atom63 = _g400["atom?"];
  var boolean63 = _g400["boolean?"];
  var cat = _g400.cat;
  var ceil = _g400.ceil;
  var char = _g400.char;
  var code = _g400.code;
  var composite63 = _g400["composite?"];
  var cos = _g400.cos;
  var drop = _g400.drop;
  var empty63 = _g400["empty?"];
  var exclude = _g400.exclude;
  var exit = _g400.exit;
  var extend = _g400.extend;
  var find = _g400.find;
  var flat = _g400.flat;
  var flat1 = _g400.flat1;
  var floor = _g400.floor;
  var function63 = _g400["function?"];
  var hd = _g400.hd;
  var id_literal63 = _g400["id-literal?"];
  var in63 = _g400["in?"];
  var inner = _g400.inner;
  var is63 = _g400["is?"];
  var iterate = _g400.iterate;
  var join = _g400.join;
  var keep = _g400.keep;
  var keys63 = _g400["keys?"];
  var last = _g400.last;
  var length = _g400.length;
  var list63 = _g400["list?"];
  var log = _g400.log;
  var log10 = _g400.log10;
  var make_id = _g400["make-id"];
  var map = _g400.map;
  var max = _g400.max;
  var min = _g400.min;
  var module = _g400.module;
  var module_key = _g400["module-key"];
  var nil63 = _g400["nil?"];
  var none63 = _g400["none?"];
  var number = _g400.number;
  var number63 = _g400["number?"];
  var pairwise = _g400.pairwise;
  var pow = _g400.pow;
  var random = _g400.random;
  var read_file = _g400["read-file"];
  var reduce = _g400.reduce;
  var replicate = _g400.replicate;
  var reverse = _g400.reverse;
  var sd = _g400.sd;
  var search = _g400.search;
  var setenv = _g400.setenv;
  var sin = _g400.sin;
  var sinh = _g400.sinh;
  var some63 = _g400["some?"];
  var sort = _g400.sort;
  var splice = _g400.splice;
  var split = _g400.split;
  var sqrt = _g400.sqrt;
  var stash = _g400.stash;
  var string = _g400.string;
  var string_literal63 = _g400["string-literal?"];
  var string63 = _g400["string?"];
  var sub = _g400.sub;
  var sublist = _g400.sublist;
  var substring = _g400.substring;
  var table63 = _g400["table?"];
  var tan = _g400.tan;
  var tanh = _g400.tanh;
  var td = _g400.td;
  var tl = _g400.tl;
  var toplevel63 = _g400["toplevel?"];
  var unstash = _g400.unstash;
  var write = _g400.write;
  var write_file = _g400["write-file"];
  global.target = "js";
})();
(function () {
  var _g732 = nexus["lumen/utilities"];
  var bind = _g732.bind;
  var bind42 = _g732["bind*"];
  var bound63 = _g732["bound?"];
  var exported = _g732.exported;
  var getenv = _g732.getenv;
  var id = _g732.id;
  var imported = _g732.imported;
  var indentation = _g732.indentation;
  var initial_environment = _g732["initial-environment"];
  var macro_function = _g732["macro-function"];
  var macro63 = _g732["macro?"];
  var macroexpand = _g732.macroexpand;
  var mapo = _g732.mapo;
  var quasiexpand = _g732.quasiexpand;
  var quote_environment = _g732["quote-environment"];
  var quote_modules = _g732["quote-modules"];
  var quoted = _g732.quoted;
  var reserved63 = _g732["reserved?"];
  var sortk = _g732.sortk;
  var special_form63 = _g732["special-form?"];
  var special63 = _g732["special?"];
  var stash42 = _g732["stash*"];
  var statement63 = _g732["statement?"];
  var symbol_expansion = _g732["symbol-expansion"];
  var symbol63 = _g732["symbol?"];
  var toplevel63 = _g732["toplevel?"];
  var valid_id63 = _g732["valid-id?"];
  var variable63 = _g732["variable?"];
  var _g733 = nexus["lumen/compiler"];
  var compile = _g733.compile;
  var compile_function = _g733["compile-function"];
  var compile_module = _g733["compile-module"];
  var eval = _g733.eval;
  var in_module = _g733["in-module"];
  var load_module = _g733["load-module"];
  var open_module = _g733["open-module"];
  var _g734 = nexus["lumen/runtime"];
  var _37 = _g734["%"];
  var _37message_handler = _g734["%message-handler"];
  var _42 = _g734["*"];
  var _43 = _g734["+"];
  var _ = _g734["-"];
  var _47 = _g734["/"];
  var _60 = _g734["<"];
  var _6061 = _g734["<="];
  var _61 = _g734["="];
  var _62 = _g734[">"];
  var _6261 = _g734[">="];
  var abs = _g734.abs;
  var acos = _g734.acos;
  var add = _g734.add;
  var apply = _g734.apply;
  var asin = _g734.asin;
  var atan = _g734.atan;
  var atan2 = _g734.atan2;
  var atom63 = _g734["atom?"];
  var boolean63 = _g734["boolean?"];
  var cat = _g734.cat;
  var ceil = _g734.ceil;
  var char = _g734.char;
  var code = _g734.code;
  var composite63 = _g734["composite?"];
  var cos = _g734.cos;
  var drop = _g734.drop;
  var empty63 = _g734["empty?"];
  var exclude = _g734.exclude;
  var exit = _g734.exit;
  var extend = _g734.extend;
  var find = _g734.find;
  var flat = _g734.flat;
  var flat1 = _g734.flat1;
  var floor = _g734.floor;
  var function63 = _g734["function?"];
  var hd = _g734.hd;
  var id_literal63 = _g734["id-literal?"];
  var in63 = _g734["in?"];
  var inner = _g734.inner;
  var is63 = _g734["is?"];
  var iterate = _g734.iterate;
  var join = _g734.join;
  var keep = _g734.keep;
  var keys63 = _g734["keys?"];
  var last = _g734.last;
  var length = _g734.length;
  var list63 = _g734["list?"];
  var log = _g734.log;
  var log10 = _g734.log10;
  var make_id = _g734["make-id"];
  var map = _g734.map;
  var max = _g734.max;
  var min = _g734.min;
  var module = _g734.module;
  var module_key = _g734["module-key"];
  var nil63 = _g734["nil?"];
  var none63 = _g734["none?"];
  var number = _g734.number;
  var number63 = _g734["number?"];
  var pairwise = _g734.pairwise;
  var pow = _g734.pow;
  var random = _g734.random;
  var read_file = _g734["read-file"];
  var reduce = _g734.reduce;
  var replicate = _g734.replicate;
  var reverse = _g734.reverse;
  var sd = _g734.sd;
  var search = _g734.search;
  var setenv = _g734.setenv;
  var sin = _g734.sin;
  var sinh = _g734.sinh;
  var some63 = _g734["some?"];
  var sort = _g734.sort;
  var splice = _g734.splice;
  var split = _g734.split;
  var sqrt = _g734.sqrt;
  var stash = _g734.stash;
  var string = _g734.string;
  var string_literal63 = _g734["string-literal?"];
  var string63 = _g734["string?"];
  var sub = _g734.sub;
  var sublist = _g734.sublist;
  var substring = _g734.substring;
  var table63 = _g734["table?"];
  var tan = _g734.tan;
  var tanh = _g734.tanh;
  var td = _g734.td;
  var tl = _g734.tl;
  var toplevel63 = _g734["toplevel?"];
  var unstash = _g734.unstash;
  var write = _g734.write;
  var write_file = _g734["write-file"];
  global.modules = {lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"%compile-module": {variable: true}, "%result": {export: true, global: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, "current-module": {export: true, global: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, reimported: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "reader"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {export: {at: {export: true, macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g777 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g777)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g774 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g774)) {
      var _g775 = bind42(x, _g774);
      var args = _g775[0];
      var _g776 = _g775[1];
      return(join(["%local-function", name, args], _g776));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g779 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g779)) {
      var _g780 = bind42(x, _g779);
      var args = _g780[0];
      var _g781 = _g780[1];
      return(join(["%global-function", name, args], _g781));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g756 = sub(body, 0);
    var form = join(["fn", args], _g756);
    var _g757 = ["setenv", ["quote", name]];
    _g757.form = ["quote", form];
    _g757.macro = form;
    eval(_g757);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g767 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g767.export;
    var alias = _g767.alias;
    var imp = _g767.import;
    var _g768 = imp || [];
    var _g769 = 0;
    while (_g769 < length(_g768)) {
      var k = _g768[_g769];
      load_module(k);
      var _g770 = module(k).alias || [];
      var _g771 = 0;
      while (_g771 < length(_g770)) {
        var a = _g770[_g771];
        add(imp, a);
        _g771 = _g771 + 1;
      }
      imports = join(imports, imported(k));
      _g769 = _g769 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g772 = exp || [];
    var _g773 = 0;
    while (_g773 < length(_g772)) {
      var k = _g772[_g773];
      setenv(k, {_stash: true, export: true});
      _g773 = _g773 + 1;
    }
    return(join(["do"], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g752 = sub(body, 0);
    var form = join(["fn", args], _g752);
    var keys = sub(_g752, length(_g752));
    var _g753 = ["setenv", ["quote", name]];
    _g753.form = ["quote", form];
    _g753.special = form;
    eval(join(_g753, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g764 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g823;
    if (nil63(v)) {
      var _g824;
      if (b.i) {
        _g824 = "i";
      } else {
        _g824 = make_id();
      }
      var i = _g824;
      _g823 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g764), ["inc", i]]];
    } else {
      var _g765 = ["target"];
      _g765.js = ["isNaN", ["parseInt", k]];
      _g765.lua = ["not", ["number?", k]];
      _g823 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g765, join(["let", [v, ["get", t1, k]]], _g764)]]];
    }
    return(["let", [t1, t], _g823]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g792 = sub(body, 0);
    var _g793 = bind42(args, _g792);
    var _g794 = _g793[0];
    var _g795 = _g793[1];
    return(join(["%function", _g794], _g795));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    function step(_g789) {
      var a = _g789[0];
      var b = _g789[1];
      var c = sub(_g789, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g766 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g766)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g758 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g759) {
      var lh = _g759[0];
      var rh = _g759[1];
      var _g760 = bind(lh, rh);
      var _g761 = 0;
      while (_g761 < length(_g760)) {
        var _g762 = _g760[_g761];
        var id = _g762[0];
        var val = _g762[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g761 = _g761 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g758)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g790 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g791 = join(["do"], macroexpand(_g790));
    drop(environment);
    return(_g791);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g786 = sub(body, 0);
    add(environment, {});
    map(function (_g788) {
      var name = _g788[0];
      var exp = _g788[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g787 = join(["do"], macroexpand(_g786));
    drop(environment);
    return(_g787);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g751 = body;
      var k = undefined;
      for (k in _g751) {
        if (isNaN(parseInt(k))) {
          var v = _g751[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g763 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g763)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g797 = elements;
    var _g798 = 0;
    while (_g798 < length(_g797)) {
      var e = _g797[_g798];
      l[e] = true;
      _g798 = _g798 + 1;
    }
    return(join(["table"], l));
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g778 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g778)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g796 = sub(body, 0);
    return(["if", cond, join(["do"], _g796)]);
  }}, "with-bindings": {export: true, macro: function (_g782) {
    var names = _g782[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g783 = sub(body, 0);
    var x = make_id();
    var _g785 = ["setenv", x];
    _g785.variable = true;
    var _g784 = ["with-frame", ["each", [x], names, _g785]];
    _g784.scope = true;
    return(join(_g784, _g783));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g754 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g755 = ["table"];
    _g755._scope = scope;
    return(["do", ["add", "environment", _g755], ["let", [x, join(["do"], _g754)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g799) {
    var char = _g799[0];
    var stream = _g799[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g800 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g800)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g835;
    if (target === "lua") {
      _g835 = "{";
    } else {
      _g835 = "[";
    }
    var open = _g835;
    var _g836;
    if (target === "lua") {
      _g836 = "}";
    } else {
      _g836 = "]";
    }
    var close = _g836;
    var str = "";
    var _g818 = forms;
    var i = 0;
    while (i < length(_g818)) {
      var x = _g818[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g812 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g813 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g813;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g812 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g812 + ") {\n" + body + ind + "}\n");
    }
  }, stmt: true, tr: true}, "%function": {export: true, foo: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "%global-function": {export: true, foo: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, stmt: true, tr: true}, "%if": {export: true, foo: true, special: function (cond, cons, alt) {
    var _g807 = compile(cond);
    indent_level = indent_level + 1;
    var _g810 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g808 = _g810;
    var _g827;
    if (alt) {
      indent_level = indent_level + 1;
      var _g811 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g827 = _g811;
    }
    var _g809 = _g827;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g807 + ") {\n" + _g808 + ind + "}";
    } else {
      str = str + ind + "if " + _g807 + " then\n" + _g808;
    }
    if (_g809 && target === "js") {
      str = str + " else {\n" + _g809 + ind + "}";
    } else {
      if (_g809) {
        str = str + ind + "else\n" + _g809;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, stmt: true, tr: true}, "%local": {export: true, foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g828;
    if (is63(value)) {
      _g828 = " = " + value1;
    } else {
      _g828 = "";
    }
    var rh = _g828;
    var _g829;
    if (target === "js") {
      _g829 = "var ";
    } else {
      _g829 = "local ";
    }
    var keyword = _g829;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g830;
    if (target === "lua") {
      _g830 = " = ";
    } else {
      _g830 = ": ";
    }
    var sep = _g830;
    var pairs = sortk(pairwise(forms), hd);
    var _g814 = pairs;
    var i = 0;
    while (i < length(_g814)) {
      var _g815 = _g814[i];
      var k = _g815[0];
      var v = _g815[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g816 = compile(v);
      var _g831;
      if (valid_id63(k)) {
        _g831 = k;
      } else {
        var _g832;
        if (target === "js" && string_literal63(k)) {
          _g832 = k;
        } else {
          var _g833;
          if (target === "js") {
            _g833 = quoted(k);
          } else {
            var _g834;
            if (string_literal63(k)) {
              _g834 = "[" + k + "]";
            } else {
              _g834 = "[" + quoted(k) + "]";
            }
            _g833 = _g834;
          }
          _g832 = _g833;
        }
        _g831 = _g832;
      }
      var _g817 = _g831;
      str = str + _g817 + sep + _g816;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g805 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g805;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g806 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g806;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g821 = forms;
    var _g822 = 0;
    while (_g822 < length(_g821)) {
      var x = _g821[_g822];
      str = str + compile(x, {_stash: true, stmt: true});
      _g822 = _g822 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g826;
    if (target === "js") {
      _g826 = "throw new " + compile(["Error", x]);
    } else {
      _g826 = "error(" + compile(x) + ")";
    }
    var e = _g826;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g819 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g819, 0) === "{") {
      _g819 = "(" + _g819 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g819 + "." + inner(k));
    } else {
      return(_g819 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g837;
    if (nil63(x)) {
      _g837 = "return";
    } else {
      _g837 = "return(" + compile(x) + ")";
    }
    var _g820 = _g837;
    return(indentation() + _g820);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g803 = compile(lh);
    var _g825;
    if (nil63(rh)) {
      _g825 = "nil";
    } else {
      _g825 = rh;
    }
    var _g804 = compile(_g825);
    return(indentation() + _g803 + " = " + _g804);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g801 = compile(cond);
    indent_level = indent_level + 1;
    var _g802 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g802;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g801 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g801 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, exported: {export: true, variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g838 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g838.export;
    var alias = _g838.alias;
    var imp = _g838.import;
    var _g839 = imp || [];
    var _g840 = 0;
    while (_g840 < length(_g839)) {
      var k = _g839[_g840];
      load_module(k);
      var _g841 = module(k).alias || [];
      var _g842 = 0;
      while (_g842 < length(_g841)) {
        var a = _g841[_g842];
        add(imp, a);
        _g842 = _g842 + 1;
      }
      imports = join(imports, imported(k));
      _g840 = _g840 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g843 = exp || [];
    var _g844 = 0;
    while (_g844 < length(_g843)) {
      var k = _g843[_g844];
      setenv(k, {_stash: true, export: true});
      _g844 = _g844 + 1;
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g3 = nexus["lumen/reader"];
  var make_stream = _g3["make-stream"];
  var read = _g3.read;
  var read_all = _g3["read-all"];
  var read_from_string = _g3["read-from-string"];
  var read_table = _g3["read-table"];
  var _g4 = nexus["lumen/compiler"];
  var compile = _g4.compile;
  var compile_function = _g4["compile-function"];
  var compile_module = _g4["compile-module"];
  var eval = _g4.eval;
  var in_module = _g4["in-module"];
  var load_module = _g4["load-module"];
  var open_module = _g4["open-module"];
  var _g5 = nexus["lumen/runtime"];
  var _37 = _g5["%"];
  var _37message_handler = _g5["%message-handler"];
  var _42 = _g5["*"];
  var _43 = _g5["+"];
  var _ = _g5["-"];
  var _47 = _g5["/"];
  var _60 = _g5["<"];
  var _6061 = _g5["<="];
  var _61 = _g5["="];
  var _62 = _g5[">"];
  var _6261 = _g5[">="];
  var abs = _g5.abs;
  var acos = _g5.acos;
  var add = _g5.add;
  var apply = _g5.apply;
  var asin = _g5.asin;
  var atan = _g5.atan;
  var atan2 = _g5.atan2;
  var atom63 = _g5["atom?"];
  var boolean63 = _g5["boolean?"];
  var cat = _g5.cat;
  var ceil = _g5.ceil;
  var char = _g5.char;
  var code = _g5.code;
  var composite63 = _g5["composite?"];
  var cos = _g5.cos;
  var drop = _g5.drop;
  var empty63 = _g5["empty?"];
  var exclude = _g5.exclude;
  var exit = _g5.exit;
  var extend = _g5.extend;
  var find = _g5.find;
  var flat = _g5.flat;
  var flat1 = _g5.flat1;
  var floor = _g5.floor;
  var function63 = _g5["function?"];
  var hd = _g5.hd;
  var id_literal63 = _g5["id-literal?"];
  var in63 = _g5["in?"];
  var inner = _g5.inner;
  var is63 = _g5["is?"];
  var iterate = _g5.iterate;
  var join = _g5.join;
  var keep = _g5.keep;
  var keys63 = _g5["keys?"];
  var last = _g5.last;
  var length = _g5.length;
  var list63 = _g5["list?"];
  var log = _g5.log;
  var log10 = _g5.log10;
  var make_id = _g5["make-id"];
  var map = _g5.map;
  var max = _g5.max;
  var min = _g5.min;
  var module = _g5.module;
  var module_key = _g5["module-key"];
  var nil63 = _g5["nil?"];
  var none63 = _g5["none?"];
  var number = _g5.number;
  var number63 = _g5["number?"];
  var pairwise = _g5.pairwise;
  var pow = _g5.pow;
  var random = _g5.random;
  var read_file = _g5["read-file"];
  var reduce = _g5.reduce;
  var replicate = _g5.replicate;
  var reverse = _g5.reverse;
  var sd = _g5.sd;
  var search = _g5.search;
  var setenv = _g5.setenv;
  var sin = _g5.sin;
  var sinh = _g5.sinh;
  var some63 = _g5["some?"];
  var sort = _g5.sort;
  var splice = _g5.splice;
  var split = _g5.split;
  var sqrt = _g5.sqrt;
  var stash = _g5.stash;
  var string = _g5.string;
  var string_literal63 = _g5["string-literal?"];
  var string63 = _g5["string?"];
  var sub = _g5.sub;
  var sublist = _g5.sublist;
  var substring = _g5.substring;
  var table63 = _g5["table?"];
  var tan = _g5.tan;
  var tanh = _g5.tanh;
  var td = _g5.td;
  var tl = _g5.tl;
  var toplevel63 = _g5["toplevel?"];
  var unstash = _g5.unstash;
  var write = _g5.write;
  var write_file = _g5["write-file"];
  function rep(str) {
    var _g846 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g849) {
        return([false, _g849.message]);
      }
    })();
    var _g1 = _g846[0];
    var x = _g846[1];
    if (is63(x)) {
      return(print(string(x) + " "));
    }
  }
  function repl() {
    function step(str) {
      rep(str);
      return(write("> "));
    }
    write("> ");
    process.stdin.setEncoding("utf8");
    return(process.stdin.on("data", step));
  }
  function usage() {
    print(string("usage: lumen [options] <module>") + " ");
    print(string("options:") + " ");
    print(string("  -o <output>\tOutput file") + " ");
    print(string("  -t <target>\tTarget language (default: lua)") + " ");
    print(string("  -e <expr>\tExpression to evaluate") + " ");
    return(exit());
  }
  function main() {
    var args = sub(process.argv, 2);
    if (hd(args) === "-h" || hd(args) === "--help") {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var _g847 = args;
    var i = 0;
    while (i < length(_g847)) {
      var arg = _g847[i];
      if (arg === "-o" || arg === "-t" || arg === "-e") {
        if (i === length(args) - 1) {
          print(string("missing argument for") + " " + string(arg) + " ");
        } else {
          i = i + 1;
          var val = args[i];
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
      } else {
        if (nil63(spec) && "-" != char(arg, 0)) {
          spec = arg;
        }
      }
      i = i + 1;
    }
    if (output) {
      if (target1) {
        target = target1;
      }
      return(write_file(output, compile_module(spec)));
    } else {
      in_module(spec || ["lumen", "main"]);
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g848 = {};
  nexus["lumen/main"] = _g848;
  _g848.main = main;
  _g848.rep = rep;
  _g848.repl = repl;
  _g848.usage = usage;
})();
