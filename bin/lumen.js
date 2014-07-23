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
  var _g116 = {};
  nexus["lumen/reader"] = _g116;
  _g116.delimiters = delimiters;
  _g116.eof = eof;
  _g116["flag?"] = flag63;
  _g116["key?"] = key63;
  _g116["make-stream"] = make_stream;
  _g116["peek-char"] = peek_char;
  _g116.read = read;
  _g116["read-all"] = read_all;
  _g116["read-char"] = read_char;
  _g116["read-from-string"] = read_from_string;
  _g116["read-table"] = read_table;
  _g116["skip-non-code"] = skip_non_code;
  _g116.whitespace = whitespace;
})();
(function () {
  var _g118 = nexus["lumen/utilities"];
  var bind = _g118.bind;
  var bind42 = _g118["bind*"];
  var bound63 = _g118["bound?"];
  var exported = _g118.exported;
  var getenv = _g118.getenv;
  var id = _g118.id;
  var imported = _g118.imported;
  var indentation = _g118.indentation;
  var initial_environment = _g118["initial-environment"];
  var macro_function = _g118["macro-function"];
  var macro63 = _g118["macro?"];
  var macroexpand = _g118.macroexpand;
  var mapo = _g118.mapo;
  var quasiexpand = _g118.quasiexpand;
  var quote_environment = _g118["quote-environment"];
  var quote_modules = _g118["quote-modules"];
  var quoted = _g118.quoted;
  var reserved63 = _g118["reserved?"];
  var sortk = _g118.sortk;
  var special_form63 = _g118["special-form?"];
  var special63 = _g118["special?"];
  var stash42 = _g118["stash*"];
  var statement63 = _g118["statement?"];
  var symbol_expansion = _g118["symbol-expansion"];
  var symbol63 = _g118["symbol?"];
  var toplevel63 = _g118["toplevel?"];
  var valid_id63 = _g118["valid-id?"];
  var variable63 = _g118["variable?"];
  var _g119 = nexus["lumen/reader"];
  var make_stream = _g119["make-stream"];
  var read = _g119.read;
  var read_all = _g119["read-all"];
  var read_from_string = _g119["read-from-string"];
  var read_table = _g119["read-table"];
  var _g120 = nexus["lumen/runtime"];
  var _37 = _g120["%"];
  var _37message_handler = _g120["%message-handler"];
  var _42 = _g120["*"];
  var _43 = _g120["+"];
  var _ = _g120["-"];
  var _47 = _g120["/"];
  var _60 = _g120["<"];
  var _6061 = _g120["<="];
  var _61 = _g120["="];
  var _62 = _g120[">"];
  var _6261 = _g120[">="];
  var abs = _g120.abs;
  var acos = _g120.acos;
  var add = _g120.add;
  var apply = _g120.apply;
  var asin = _g120.asin;
  var atan = _g120.atan;
  var atan2 = _g120.atan2;
  var atom63 = _g120["atom?"];
  var boolean63 = _g120["boolean?"];
  var cat = _g120.cat;
  var ceil = _g120.ceil;
  var char = _g120.char;
  var code = _g120.code;
  var composite63 = _g120["composite?"];
  var cos = _g120.cos;
  var drop = _g120.drop;
  var empty63 = _g120["empty?"];
  var exclude = _g120.exclude;
  var exit = _g120.exit;
  var extend = _g120.extend;
  var find = _g120.find;
  var flat = _g120.flat;
  var flat1 = _g120.flat1;
  var floor = _g120.floor;
  var function63 = _g120["function?"];
  var hd = _g120.hd;
  var id_literal63 = _g120["id-literal?"];
  var in63 = _g120["in?"];
  var inner = _g120.inner;
  var is63 = _g120["is?"];
  var iterate = _g120.iterate;
  var join = _g120.join;
  var keep = _g120.keep;
  var keys63 = _g120["keys?"];
  var last = _g120.last;
  var length = _g120.length;
  var list63 = _g120["list?"];
  var log = _g120.log;
  var log10 = _g120.log10;
  var make_id = _g120["make-id"];
  var map = _g120.map;
  var max = _g120.max;
  var min = _g120.min;
  var module = _g120.module;
  var module_key = _g120["module-key"];
  var nil63 = _g120["nil?"];
  var none63 = _g120["none?"];
  var number = _g120.number;
  var number63 = _g120["number?"];
  var pairwise = _g120.pairwise;
  var pow = _g120.pow;
  var random = _g120.random;
  var read_file = _g120["read-file"];
  var reduce = _g120.reduce;
  var replicate = _g120.replicate;
  var reverse = _g120.reverse;
  var sd = _g120.sd;
  var search = _g120.search;
  var setenv = _g120.setenv;
  var sin = _g120.sin;
  var sinh = _g120.sinh;
  var some63 = _g120["some?"];
  var sort = _g120.sort;
  var splice = _g120.splice;
  var split = _g120.split;
  var sqrt = _g120.sqrt;
  var stash = _g120.stash;
  var string = _g120.string;
  var string_literal63 = _g120["string-literal?"];
  var string63 = _g120["string?"];
  var sub = _g120.sub;
  var sublist = _g120.sublist;
  var substring = _g120.substring;
  var table63 = _g120["table?"];
  var tan = _g120.tan;
  var tanh = _g120.tanh;
  var td = _g120.td;
  var tl = _g120.tl;
  var toplevel63 = _g120["toplevel?"];
  var unstash = _g120.unstash;
  var write = _g120.write;
  var write_file = _g120["write-file"];
  var _g126 = [];
  _g126.js = "!";
  _g126.lua = "not ";
  var _g124 = [];
  var _g127 = [];
  _g127.js = "!";
  _g127.lua = "not ";
  _g124["not"] = _g127;
  var _g129 = [];
  _g129["%"] = true;
  _g129["*"] = true;
  _g129["/"] = true;
  var _g131 = [];
  _g131["+"] = true;
  _g131["-"] = true;
  var _g135 = [];
  _g135.js = "+";
  _g135.lua = "..";
  var _g133 = [];
  var _g136 = [];
  _g136.js = "+";
  _g136.lua = "..";
  _g133.cat = _g136;
  var _g138 = [];
  _g138["<"] = true;
  _g138["<="] = true;
  _g138[">"] = true;
  _g138[">="] = true;
  var _g142 = [];
  _g142.js = "===";
  _g142.lua = "==";
  var _g144 = [];
  _g144.js = "!=";
  _g144.lua = "~=";
  var _g140 = [];
  var _g145 = [];
  _g145.js = "===";
  _g145.lua = "==";
  _g140["="] = _g145;
  var _g146 = [];
  _g146.js = "!=";
  _g146.lua = "~=";
  _g140["~="] = _g146;
  var _g150 = [];
  _g150.js = "&&";
  _g150.lua = "and";
  var _g148 = [];
  var _g151 = [];
  _g151.js = "&&";
  _g151.lua = "and";
  _g148["and"] = _g151;
  var _g155 = [];
  _g155.js = "||";
  _g155.lua = "or";
  var _g153 = [];
  var _g156 = [];
  _g156.js = "||";
  _g156.lua = "or";
  _g153["or"] = _g156;
  var infix = [_g124, _g129, _g131, _g133, _g138, _g140, _g148, _g153];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g157 = infix;
      var i = 0;
      while (i < length(_g157)) {
        var level = _g157[i];
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
    var _g158 = args;
    var i = 0;
    while (i < length(_g158)) {
      var arg = _g158[i];
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
    var _g159 = getenv(x);
    var stmt = _g159.stmt;
    var special = _g159.special;
    var self_tr63 = _g159.tr;
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
    var _g160 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g160.right;
    var _g161;
    if (right) {
      _g161 = _6261;
    } else {
      _g161 = _62;
    }
    if (_g161(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g162 = sub(form, 1);
    var a = _g162[0];
    var b = _g162[1];
    var _g163 = op_delims(form, a);
    var ao = _g163[0];
    var ac = _g163[1];
    var _g164 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g164[0];
    var bc = _g164[1];
    var _g165 = compile(a);
    var _g166 = compile(b);
    var _g167 = getop(op);
    if (unary63(form)) {
      return(_g167 + ao + _g165 + ac);
    } else {
      return(ao + _g165 + ac + " " + _g167 + " " + bo + _g166 + bc);
    }
  }
  function compile_function(args, body) {
    var _g168 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g168.name;
    var prefix = _g168.prefix;
    var _g173;
    if (name) {
      _g173 = compile(name);
    } else {
      _g173 = "";
    }
    var id = _g173;
    var _g169 = prefix || "";
    var _g170 = compile_args(args);
    indent_level = indent_level + 1;
    var _g172 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g171 = _g172;
    var ind = indentation();
    var _g174;
    if (target === "js") {
      _g174 = "";
    } else {
      _g174 = "end";
    }
    var tr = _g174;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g170 + " {\n" + _g171 + ind + "}" + tr);
    } else {
      return(_g169 + "function " + id + _g170 + "\n" + _g171 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g175 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g175.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g177;
        if (stmt) {
          _g177 = indentation();
        } else {
          _g177 = "";
        }
        var ind = _g177;
        var _g178;
        if (atom63(form)) {
          _g178 = compile_atom(form);
        } else {
          var _g179;
          if (infix63(hd(form))) {
            _g179 = compile_infix(form);
          } else {
            _g179 = compile_call(form);
          }
          _g178 = _g179;
        }
        var _g176 = _g178;
        return(ind + _g176 + tr);
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
    var _g180 = sub(args, 0, length(args) - 1);
    var _g181 = 0;
    while (_g181 < length(_g180)) {
      var x = _g180[_g181];
      add(hoist, lower(x, hoist, stmt63));
      _g181 = _g181 + 1;
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
    var _g182 = args[1];
    var _g183 = args[2];
    if (stmt63 || tail63) {
      var _g185;
      if (_g183) {
        _g185 = [lower_body([_g183], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g182], tail63)], _g185)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g184;
      if (_g183) {
        _g184 = [lower(["set", e, _g183])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g182])], _g184));
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
      var _g186;
      if (x === "and") {
        _g186 = ["%if", id, b, id];
      } else {
        _g186 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g186], hoist));
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
    var _g187 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g187, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g188 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g188)) {
      return(_g188);
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
    var _g189 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g189, epilog))]]);
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return(compile(form) + ";\n");
  }
  var run = global.eval;
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
    var _g190 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g190.all;
    var m = module(spec);
    var frame = last(environment);
    var _g191 = m.export;
    var k = undefined;
    for (k in _g191) {
      if (isNaN(parseInt(k))) {
        var v = _g191[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g192 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g192.all;
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
  function prologue() {
    var m = module(current_module);
    return(join(imported(current_module, {_stash: true, all: true}), map(function (x) {
      return(splice(imported(x)));
    }, m.import)));
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var _g193 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g193));
    target = previous;
    return(run(compiled));
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
  _g194.prologue = prologue;
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
  var _g374 = nexus["lumen/utilities"];
  var bind = _g374.bind;
  var bind42 = _g374["bind*"];
  var bound63 = _g374["bound?"];
  var exported = _g374.exported;
  var getenv = _g374.getenv;
  var id = _g374.id;
  var imported = _g374.imported;
  var indentation = _g374.indentation;
  var initial_environment = _g374["initial-environment"];
  var macro_function = _g374["macro-function"];
  var macro63 = _g374["macro?"];
  var macroexpand = _g374.macroexpand;
  var mapo = _g374.mapo;
  var quasiexpand = _g374.quasiexpand;
  var quote_environment = _g374["quote-environment"];
  var quote_modules = _g374["quote-modules"];
  var quoted = _g374.quoted;
  var reserved63 = _g374["reserved?"];
  var sortk = _g374.sortk;
  var special_form63 = _g374["special-form?"];
  var special63 = _g374["special?"];
  var stash42 = _g374["stash*"];
  var statement63 = _g374["statement?"];
  var symbol_expansion = _g374["symbol-expansion"];
  var symbol63 = _g374["symbol?"];
  var toplevel63 = _g374["toplevel?"];
  var valid_id63 = _g374["valid-id?"];
  var variable63 = _g374["variable?"];
  var _g375 = nexus["lumen/compiler"];
  var compile = _g375.compile;
  var compile_function = _g375["compile-function"];
  var compile_module = _g375["compile-module"];
  var eval = _g375.eval;
  var in_module = _g375["in-module"];
  var load_module = _g375["load-module"];
  var open_module = _g375["open-module"];
  var _g376 = nexus["lumen/runtime"];
  var _37 = _g376["%"];
  var _37message_handler = _g376["%message-handler"];
  var _42 = _g376["*"];
  var _43 = _g376["+"];
  var _ = _g376["-"];
  var _47 = _g376["/"];
  var _60 = _g376["<"];
  var _6061 = _g376["<="];
  var _61 = _g376["="];
  var _62 = _g376[">"];
  var _6261 = _g376[">="];
  var abs = _g376.abs;
  var acos = _g376.acos;
  var add = _g376.add;
  var apply = _g376.apply;
  var asin = _g376.asin;
  var atan = _g376.atan;
  var atan2 = _g376.atan2;
  var atom63 = _g376["atom?"];
  var boolean63 = _g376["boolean?"];
  var cat = _g376.cat;
  var ceil = _g376.ceil;
  var char = _g376.char;
  var code = _g376.code;
  var composite63 = _g376["composite?"];
  var cos = _g376.cos;
  var drop = _g376.drop;
  var empty63 = _g376["empty?"];
  var exclude = _g376.exclude;
  var exit = _g376.exit;
  var extend = _g376.extend;
  var find = _g376.find;
  var flat = _g376.flat;
  var flat1 = _g376.flat1;
  var floor = _g376.floor;
  var function63 = _g376["function?"];
  var hd = _g376.hd;
  var id_literal63 = _g376["id-literal?"];
  var in63 = _g376["in?"];
  var inner = _g376.inner;
  var is63 = _g376["is?"];
  var iterate = _g376.iterate;
  var join = _g376.join;
  var keep = _g376.keep;
  var keys63 = _g376["keys?"];
  var last = _g376.last;
  var length = _g376.length;
  var list63 = _g376["list?"];
  var log = _g376.log;
  var log10 = _g376.log10;
  var make_id = _g376["make-id"];
  var map = _g376.map;
  var max = _g376.max;
  var min = _g376.min;
  var module = _g376.module;
  var module_key = _g376["module-key"];
  var nil63 = _g376["nil?"];
  var none63 = _g376["none?"];
  var number = _g376.number;
  var number63 = _g376["number?"];
  var pairwise = _g376.pairwise;
  var pow = _g376.pow;
  var random = _g376.random;
  var read_file = _g376["read-file"];
  var reduce = _g376.reduce;
  var replicate = _g376.replicate;
  var reverse = _g376.reverse;
  var sd = _g376.sd;
  var search = _g376.search;
  var setenv = _g376.setenv;
  var sin = _g376.sin;
  var sinh = _g376.sinh;
  var some63 = _g376["some?"];
  var sort = _g376.sort;
  var splice = _g376.splice;
  var split = _g376.split;
  var sqrt = _g376.sqrt;
  var stash = _g376.stash;
  var string = _g376.string;
  var string_literal63 = _g376["string-literal?"];
  var string63 = _g376["string?"];
  var sub = _g376.sub;
  var sublist = _g376.sublist;
  var substring = _g376.substring;
  var table63 = _g376["table?"];
  var tan = _g376.tan;
  var tanh = _g376.tanh;
  var td = _g376.td;
  var tl = _g376.tl;
  var toplevel63 = _g376["toplevel?"];
  var unstash = _g376.unstash;
  var write = _g376.write;
  var write_file = _g376["write-file"];
  global.target = "js";
})();
(function () {
  var _g678 = nexus["lumen/utilities"];
  var bind = _g678.bind;
  var bind42 = _g678["bind*"];
  var bound63 = _g678["bound?"];
  var exported = _g678.exported;
  var getenv = _g678.getenv;
  var id = _g678.id;
  var imported = _g678.imported;
  var indentation = _g678.indentation;
  var initial_environment = _g678["initial-environment"];
  var macro_function = _g678["macro-function"];
  var macro63 = _g678["macro?"];
  var macroexpand = _g678.macroexpand;
  var mapo = _g678.mapo;
  var quasiexpand = _g678.quasiexpand;
  var quote_environment = _g678["quote-environment"];
  var quote_modules = _g678["quote-modules"];
  var quoted = _g678.quoted;
  var reserved63 = _g678["reserved?"];
  var sortk = _g678.sortk;
  var special_form63 = _g678["special-form?"];
  var special63 = _g678["special?"];
  var stash42 = _g678["stash*"];
  var statement63 = _g678["statement?"];
  var symbol_expansion = _g678["symbol-expansion"];
  var symbol63 = _g678["symbol?"];
  var toplevel63 = _g678["toplevel?"];
  var valid_id63 = _g678["valid-id?"];
  var variable63 = _g678["variable?"];
  var _g679 = nexus["lumen/compiler"];
  var compile = _g679.compile;
  var compile_function = _g679["compile-function"];
  var compile_module = _g679["compile-module"];
  var eval = _g679.eval;
  var in_module = _g679["in-module"];
  var load_module = _g679["load-module"];
  var open_module = _g679["open-module"];
  var _g680 = nexus["lumen/runtime"];
  var _37 = _g680["%"];
  var _37message_handler = _g680["%message-handler"];
  var _42 = _g680["*"];
  var _43 = _g680["+"];
  var _ = _g680["-"];
  var _47 = _g680["/"];
  var _60 = _g680["<"];
  var _6061 = _g680["<="];
  var _61 = _g680["="];
  var _62 = _g680[">"];
  var _6261 = _g680[">="];
  var abs = _g680.abs;
  var acos = _g680.acos;
  var add = _g680.add;
  var apply = _g680.apply;
  var asin = _g680.asin;
  var atan = _g680.atan;
  var atan2 = _g680.atan2;
  var atom63 = _g680["atom?"];
  var boolean63 = _g680["boolean?"];
  var cat = _g680.cat;
  var ceil = _g680.ceil;
  var char = _g680.char;
  var code = _g680.code;
  var composite63 = _g680["composite?"];
  var cos = _g680.cos;
  var drop = _g680.drop;
  var empty63 = _g680["empty?"];
  var exclude = _g680.exclude;
  var exit = _g680.exit;
  var extend = _g680.extend;
  var find = _g680.find;
  var flat = _g680.flat;
  var flat1 = _g680.flat1;
  var floor = _g680.floor;
  var function63 = _g680["function?"];
  var hd = _g680.hd;
  var id_literal63 = _g680["id-literal?"];
  var in63 = _g680["in?"];
  var inner = _g680.inner;
  var is63 = _g680["is?"];
  var iterate = _g680.iterate;
  var join = _g680.join;
  var keep = _g680.keep;
  var keys63 = _g680["keys?"];
  var last = _g680.last;
  var length = _g680.length;
  var list63 = _g680["list?"];
  var log = _g680.log;
  var log10 = _g680.log10;
  var make_id = _g680["make-id"];
  var map = _g680.map;
  var max = _g680.max;
  var min = _g680.min;
  var module = _g680.module;
  var module_key = _g680["module-key"];
  var nil63 = _g680["nil?"];
  var none63 = _g680["none?"];
  var number = _g680.number;
  var number63 = _g680["number?"];
  var pairwise = _g680.pairwise;
  var pow = _g680.pow;
  var random = _g680.random;
  var read_file = _g680["read-file"];
  var reduce = _g680.reduce;
  var replicate = _g680.replicate;
  var reverse = _g680.reverse;
  var sd = _g680.sd;
  var search = _g680.search;
  var setenv = _g680.setenv;
  var sin = _g680.sin;
  var sinh = _g680.sinh;
  var some63 = _g680["some?"];
  var sort = _g680.sort;
  var splice = _g680.splice;
  var split = _g680.split;
  var sqrt = _g680.sqrt;
  var stash = _g680.stash;
  var string = _g680.string;
  var string_literal63 = _g680["string-literal?"];
  var string63 = _g680["string?"];
  var sub = _g680.sub;
  var sublist = _g680.sublist;
  var substring = _g680.substring;
  var table63 = _g680["table?"];
  var tan = _g680.tan;
  var tanh = _g680.tanh;
  var td = _g680.td;
  var tl = _g680.tl;
  var toplevel63 = _g680["toplevel?"];
  var unstash = _g680.unstash;
  var write = _g680.write;
  var write_file = _g680["write-file"];
  global.modules = {lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"%compile-module": {variable: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, "current-module": {export: true, global: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, prologue: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "reader"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {export: {at: {export: true, macro: function (l, i) {
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
    var _g735 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g735)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g736 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g736)) {
      var _g737 = bind42(x, _g736);
      var args = _g737[0];
      var _g738 = _g737[1];
      return(join(["%local-function", name, args], _g738));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g759 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g759)) {
      var _g760 = bind42(x, _g759);
      var args = _g760[0];
      var _g761 = _g760[1];
      return(join(["%global-function", name, args], _g761));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g731 = sub(body, 0);
    var form = join(["fn", args], _g731);
    var _g732 = ["setenv", ["quote", name]];
    _g732.form = ["quote", form];
    _g732.macro = form;
    eval(_g732);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g762 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g762.export;
    var imp = _g762.import;
    var alias = _g762.alias;
    var _g763 = imp || [];
    var _g764 = 0;
    while (_g764 < length(_g763)) {
      var k = _g763[_g764];
      load_module(k);
      var _g765 = module(k).alias || [];
      var _g766 = 0;
      while (_g766 < length(_g765)) {
        var a = _g765[_g766];
        add(imp, a);
        _g766 = _g766 + 1;
      }
      imports = join(imports, imported(k));
      _g764 = _g764 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g767 = exp || [];
    var _g768 = 0;
    while (_g768 < length(_g767)) {
      var k = _g767[_g768];
      setenv(k, {_stash: true, export: true});
      _g768 = _g768 + 1;
    }
    return(join(["do"], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g743 = sub(body, 0);
    var form = join(["fn", args], _g743);
    var keys = sub(_g743, length(_g743));
    var _g744 = ["setenv", ["quote", name]];
    _g744.form = ["quote", form];
    _g744.special = form;
    eval(join(_g744, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g741 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g783;
    if (nil63(v)) {
      var _g784;
      if (b.i) {
        _g784 = "i";
      } else {
        _g784 = make_id();
      }
      var i = _g784;
      _g783 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g741), ["inc", i]]];
    } else {
      var _g742 = ["target"];
      _g742.js = ["isNaN", ["parseInt", k]];
      _g742.lua = ["not", ["number?", k]];
      _g783 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g742, join(["let", [v, ["get", t1, k]]], _g741)]]];
    }
    return(["let", [t1, t], _g783]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g745 = sub(body, 0);
    var _g746 = bind42(args, _g745);
    var _g747 = _g746[0];
    var _g748 = _g746[1];
    return(join(["%function", _g747], _g748));
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
    function step(_g734) {
      var a = _g734[0];
      var b = _g734[1];
      var c = sub(_g734, 2);
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
    var _g721 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g721)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g749 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g750) {
      var lh = _g750[0];
      var rh = _g750[1];
      var _g751 = bind(lh, rh);
      var _g752 = 0;
      while (_g752 < length(_g751)) {
        var _g753 = _g751[_g752];
        var id = _g753[0];
        var val = _g753[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g752 = _g752 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g749)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g757 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g758 = join(["do"], macroexpand(_g757));
    drop(environment);
    return(_g758);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g754 = sub(body, 0);
    add(environment, {});
    map(function (_g756) {
      var name = _g756[0];
      var exp = _g756[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g755 = join(["do"], macroexpand(_g754));
    drop(environment);
    return(_g755);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g724 = body;
      var k = undefined;
      for (k in _g724) {
        if (isNaN(parseInt(k))) {
          var v = _g724[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g730 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g730)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g722 = elements;
    var _g723 = 0;
    while (_g723 < length(_g722)) {
      var e = _g722[_g723];
      l[e] = true;
      _g723 = _g723 + 1;
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
    var _g729 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g729)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g733 = sub(body, 0);
    return(["if", cond, join(["do"], _g733)]);
  }}, "with-bindings": {export: true, macro: function (_g725) {
    var names = _g725[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g726 = sub(body, 0);
    var x = make_id();
    var _g728 = ["setenv", x];
    _g728.variable = true;
    var _g727 = ["with-frame", ["each", [x], names, _g728]];
    _g727.scope = true;
    return(join(_g727, _g726));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g739 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g740 = ["table"];
    _g740._scope = scope;
    return(["do", ["add", "environment", _g740], ["let", [x, join(["do"], _g739)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {save: {macro: function () {
    var specs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g769 = sub(specs, 0);
    map(compile_module, _g769);
    return(undefined);
  }}}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g719) {
    var char = _g719[0];
    var stream = _g719[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g720 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g720)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g771;
    if (target === "lua") {
      _g771 = "{";
    } else {
      _g771 = "[";
    }
    var open = _g771;
    var _g772;
    if (target === "lua") {
      _g772 = "}";
    } else {
      _g772 = "]";
    }
    var close = _g772;
    var str = "";
    var _g698 = forms;
    var i = 0;
    while (i < length(_g698)) {
      var x = _g698[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g711 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g712 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g712;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g711 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g711 + ") {\n" + body + ind + "}\n");
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
    var _g699 = compile(cond);
    indent_level = indent_level + 1;
    var _g702 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g700 = _g702;
    var _g773;
    if (alt) {
      indent_level = indent_level + 1;
      var _g703 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g773 = _g703;
    }
    var _g701 = _g773;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g699 + ") {\n" + _g700 + ind + "}";
    } else {
      str = str + ind + "if " + _g699 + " then\n" + _g700;
    }
    if (_g701 && target === "js") {
      str = str + " else {\n" + _g701 + ind + "}";
    } else {
      if (_g701) {
        str = str + ind + "else\n" + _g701;
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
    var _g780;
    if (is63(value)) {
      _g780 = " = " + value1;
    } else {
      _g780 = "";
    }
    var rh = _g780;
    var _g781;
    if (target === "js") {
      _g781 = "var ";
    } else {
      _g781 = "local ";
    }
    var keyword = _g781;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g775;
    if (target === "lua") {
      _g775 = " = ";
    } else {
      _g775 = ": ";
    }
    var sep = _g775;
    var pairs = sortk(pairwise(forms), hd);
    var _g704 = pairs;
    var i = 0;
    while (i < length(_g704)) {
      var _g705 = _g704[i];
      var k = _g705[0];
      var v = _g705[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g706 = compile(v);
      var _g776;
      if (valid_id63(k)) {
        _g776 = k;
      } else {
        var _g777;
        if (target === "js" && string_literal63(k)) {
          _g777 = k;
        } else {
          var _g778;
          if (target === "js") {
            _g778 = quoted(k);
          } else {
            var _g779;
            if (string_literal63(k)) {
              _g779 = "[" + k + "]";
            } else {
              _g779 = "[" + quoted(k) + "]";
            }
            _g778 = _g779;
          }
          _g777 = _g778;
        }
        _g776 = _g777;
      }
      var _g707 = _g776;
      str = str + _g707 + sep + _g706;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g713 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g713;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g714 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g714;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g715 = forms;
    var _g716 = 0;
    while (_g716 < length(_g715)) {
      var x = _g715[_g716];
      str = str + compile(x, {_stash: true, stmt: true});
      _g716 = _g716 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g774;
    if (target === "js") {
      _g774 = "throw new " + compile(["Error", x]);
    } else {
      _g774 = "error(" + compile(x) + ")";
    }
    var e = _g774;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g710 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g710, 0) === "{") {
      _g710 = "(" + _g710 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g710 + "." + inner(k));
    } else {
      return(_g710 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g770;
    if (nil63(x)) {
      _g770 = "return";
    } else {
      _g770 = "return(" + compile(x) + ")";
    }
    var _g697 = _g770;
    return(indentation() + _g697);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g717 = compile(lh);
    var _g782;
    if (nil63(rh)) {
      _g782 = "nil";
    } else {
      _g782 = rh;
    }
    var _g718 = compile(_g782);
    return(indentation() + _g717 + " = " + _g718);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g708 = compile(cond);
    indent_level = indent_level + 1;
    var _g709 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g709;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g708 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g708 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, exported: {export: true, variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g785 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g785.export;
    var imp = _g785.import;
    var alias = _g785.alias;
    var _g786 = imp || [];
    var _g787 = 0;
    while (_g787 < length(_g786)) {
      var k = _g786[_g787];
      load_module(k);
      var _g788 = module(k).alias || [];
      var _g789 = 0;
      while (_g789 < length(_g788)) {
        var a = _g788[_g789];
        add(imp, a);
        _g789 = _g789 + 1;
      }
      imports = join(imports, imported(k));
      _g787 = _g787 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g790 = exp || [];
    var _g791 = 0;
    while (_g791 < length(_g790)) {
      var k = _g790[_g791];
      setenv(k, {_stash: true, export: true});
      _g791 = _g791 + 1;
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
    var _g793 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g796) {
        return([false, _g796.message]);
      }
    })();
    var _g1 = _g793[0];
    var x = _g793[1];
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
    var _g794 = args;
    var i = 0;
    while (i < length(_g794)) {
      var arg = _g794[i];
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
      in_module(spec || "main");
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g795 = {};
  nexus["lumen/main"] = _g795;
  _g795.main = main;
  _g795.rep = rep;
  _g795.repl = repl;
  _g795.usage = usage;
})();
