global.nexus = {};
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
    var _g26 = l;
    var _g27 = 0;
    while (_g27 < length(_g26)) {
      var y = _g26[_g27];
      if (x === y) {
        return(true);
      }
      _g27 = _g27 + 1;
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
    var _g28 = from || 0;
    if (string63(x)) {
      return(substring(x, _g28, upto));
    } else {
      var l = sublist(x, _g28, upto);
      var _g29 = x;
      var k = undefined;
      for (k in _g29) {
        if (isNaN(parseInt(k))) {
          var v = _g29[k];
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
          var _g30 = l1;
          var k = undefined;
          for (k in _g30) {
            if (isNaN(parseInt(k))) {
              var v = _g30[k];
              l[k] = v;
            }
          }
          var _g31 = l2;
          var k = undefined;
          for (k in _g31) {
            if (isNaN(parseInt(k))) {
              var v = _g31[k];
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
    var _g32 = l;
    var _g33 = 0;
    while (_g33 < length(_g32)) {
      var x = _g32[_g33];
      if (f(x)) {
        add(l1, x);
      }
      _g33 = _g33 + 1;
    }
    return(l1);
  }
  function find(f, l) {
    var _g34 = l;
    var _g35 = 0;
    while (_g35 < length(_g34)) {
      var x = _g34[_g35];
      var _g36 = f(x);
      if (_g36) {
        return(_g36);
      }
      _g35 = _g35 + 1;
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
    var _g37;
    if (f) {
      _g37 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g37));
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
    var _g38 = l;
    var _g39 = 0;
    while (_g39 < length(_g38)) {
      var x = _g38[_g39];
      var _g40 = f(x);
      if (splice63(_g40)) {
        l1 = join(l1, _g40.value);
      } else {
        if (is63(_g40)) {
          add(l1, _g40);
        }
      }
      _g39 = _g39 + 1;
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
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
    var _g42 = t;
    var k = undefined;
    for (k in _g42) {
      if (isNaN(parseInt(k))) {
        var v = _g42[k];
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
      var _g43 = args;
      var k = undefined;
      for (k in _g43) {
        if (isNaN(parseInt(k))) {
          var v = _g43[k];
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
        var _g44 = l;
        var k = undefined;
        for (k in _g44) {
          if (isNaN(parseInt(k))) {
            var v = _g44[k];
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
    var _g45 = sub(xs, 0);
    return(join(t, _g45));
  }
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g46 = sub(keys, 0);
    var t1 = sublist(t);
    var _g47 = t;
    var k = undefined;
    for (k in _g47) {
      if (isNaN(parseInt(k))) {
        var v = _g47[k];
        if (!_g46[k]) {
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
    var _g48 = sub(xs, 0);
    if (none63(_g48)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g48));
    }
  }
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g49));
  }
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g50)));
  }
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g51));
  }
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g52)));
  }
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g53)));
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
            var _g54 = x;
            var k = undefined;
            for (k in _g54) {
              if (isNaN(parseInt(k))) {
                var v = _g54[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g55 = x1;
            var i = 0;
            while (i < length(_g55)) {
              var y = _g55[i];
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
    var _g56 = stash(args);
    return(f.apply(f, _g56));
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
    var _g57 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g58 = _g57;
      var k1 = undefined;
      for (k1 in _g58) {
        if (isNaN(parseInt(k1))) {
          var v = _g58[k1];
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
  var _g59 = {};
  nexus["lumen/runtime"] = _g59;
  _g59["%"] = _37;
  _g59["%message-handler"] = _37message_handler;
  _g59["*"] = _42;
  _g59["+"] = _43;
  _g59["-"] = _;
  _g59["/"] = _47;
  _g59["<"] = _60;
  _g59["<="] = _6061;
  _g59["="] = _61;
  _g59[">"] = _62;
  _g59[">="] = _6261;
  _g59.abs = abs;
  _g59.acos = acos;
  _g59.add = add;
  _g59.apply = apply;
  _g59.asin = asin;
  _g59.atan = atan;
  _g59.atan2 = atan2;
  _g59["atom?"] = atom63;
  _g59["boolean?"] = boolean63;
  _g59.cat = cat;
  _g59.ceil = ceil;
  _g59.char = char;
  _g59.code = code;
  _g59["composite?"] = composite63;
  _g59.cos = cos;
  _g59.drop = drop;
  _g59["empty?"] = empty63;
  _g59.exclude = exclude;
  _g59.exit = exit;
  _g59.extend = extend;
  _g59.find = find;
  _g59.flat = flat;
  _g59.flat1 = flat1;
  _g59.floor = floor;
  _g59.fs = fs;
  _g59["function?"] = function63;
  _g59.hd = hd;
  _g59["id-count"] = id_count;
  _g59["id-literal?"] = id_literal63;
  _g59["in?"] = in63;
  _g59.inner = inner;
  _g59["is?"] = is63;
  _g59.iterate = iterate;
  _g59.join = join;
  _g59.keep = keep;
  _g59["keys?"] = keys63;
  _g59.last = last;
  _g59.length = length;
  _g59["list?"] = list63;
  _g59.log = log;
  _g59.log10 = log10;
  _g59["make-id"] = make_id;
  _g59.map = map;
  _g59.mapl = mapl;
  _g59.math = math;
  _g59.max = max;
  _g59.min = min;
  _g59.module = module;
  _g59["module-key"] = module_key;
  _g59["nil?"] = nil63;
  _g59["none?"] = none63;
  _g59.number = number;
  _g59["number?"] = number63;
  _g59.pairwise = pairwise;
  _g59.pow = pow;
  _g59.random = random;
  _g59["read-file"] = read_file;
  _g59.reduce = reduce;
  _g59.replicate = replicate;
  _g59.reverse = reverse;
  _g59.sd = sd;
  _g59.search = search;
  _g59.setenv = setenv;
  _g59.sin = sin;
  _g59.sinh = sinh;
  _g59["some?"] = some63;
  _g59.sort = sort;
  _g59.splice = splice;
  _g59["splice?"] = splice63;
  _g59.split = split;
  _g59.sqrt = sqrt;
  _g59.stash = stash;
  _g59.string = string;
  _g59["string-literal?"] = string_literal63;
  _g59["string?"] = string63;
  _g59.sub = sub;
  _g59.sublist = sublist;
  _g59.substring = substring;
  _g59["table?"] = table63;
  _g59.tan = tan;
  _g59.tanh = tanh;
  _g59.td = td;
  _g59.tl = tl;
  _g59["toplevel?"] = toplevel63;
  _g59.type = type;
  _g59.unstash = unstash;
  _g59.write = write;
  _g59["write-file"] = write_file;
})();
(function () {
  var _g64 = nexus["lumen/runtime"];
  var _37 = _g64["%"];
  var _37message_handler = _g64["%message-handler"];
  var _42 = _g64["*"];
  var _43 = _g64["+"];
  var _ = _g64["-"];
  var _47 = _g64["/"];
  var _60 = _g64["<"];
  var _6061 = _g64["<="];
  var _61 = _g64["="];
  var _62 = _g64[">"];
  var _6261 = _g64[">="];
  var abs = _g64.abs;
  var acos = _g64.acos;
  var add = _g64.add;
  var apply = _g64.apply;
  var asin = _g64.asin;
  var atan = _g64.atan;
  var atan2 = _g64.atan2;
  var atom63 = _g64["atom?"];
  var boolean63 = _g64["boolean?"];
  var cat = _g64.cat;
  var ceil = _g64.ceil;
  var char = _g64.char;
  var code = _g64.code;
  var composite63 = _g64["composite?"];
  var cos = _g64.cos;
  var drop = _g64.drop;
  var empty63 = _g64["empty?"];
  var exclude = _g64.exclude;
  var exit = _g64.exit;
  var extend = _g64.extend;
  var find = _g64.find;
  var flat = _g64.flat;
  var flat1 = _g64.flat1;
  var floor = _g64.floor;
  var function63 = _g64["function?"];
  var hd = _g64.hd;
  var id_literal63 = _g64["id-literal?"];
  var in63 = _g64["in?"];
  var inner = _g64.inner;
  var is63 = _g64["is?"];
  var iterate = _g64.iterate;
  var join = _g64.join;
  var keep = _g64.keep;
  var keys63 = _g64["keys?"];
  var last = _g64.last;
  var length = _g64.length;
  var list63 = _g64["list?"];
  var log = _g64.log;
  var log10 = _g64.log10;
  var make_id = _g64["make-id"];
  var map = _g64.map;
  var max = _g64.max;
  var min = _g64.min;
  var module = _g64.module;
  var module_key = _g64["module-key"];
  var nil63 = _g64["nil?"];
  var none63 = _g64["none?"];
  var number = _g64.number;
  var number63 = _g64["number?"];
  var pairwise = _g64.pairwise;
  var pow = _g64.pow;
  var random = _g64.random;
  var read_file = _g64["read-file"];
  var reduce = _g64.reduce;
  var replicate = _g64.replicate;
  var reverse = _g64.reverse;
  var sd = _g64.sd;
  var search = _g64.search;
  var setenv = _g64.setenv;
  var sin = _g64.sin;
  var sinh = _g64.sinh;
  var some63 = _g64["some?"];
  var sort = _g64.sort;
  var splice = _g64.splice;
  var split = _g64.split;
  var sqrt = _g64.sqrt;
  var stash = _g64.stash;
  var string = _g64.string;
  var string_literal63 = _g64["string-literal?"];
  var string63 = _g64["string?"];
  var sub = _g64.sub;
  var sublist = _g64.sublist;
  var substring = _g64.substring;
  var table63 = _g64["table?"];
  var tan = _g64.tan;
  var tanh = _g64.tanh;
  var td = _g64.td;
  var tl = _g64.tl;
  var toplevel63 = _g64["toplevel?"];
  var unstash = _g64.unstash;
  var write = _g64.write;
  var write_file = _g64["write-file"];
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g67 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g68 = undefined;
        var _g69 = _g67;
        var x = undefined;
        for (x in _g69) {
          if (isNaN(parseInt(x))) {
            var _g60 = _g69[x];
            _g68 = x;
          }
        }
        if (_g68) {
          return(b[_g68]);
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
      var _g70;
      if (c === "\n") {
        _g70 = "\\n";
      } else {
        var _g71;
        if (c === "\"") {
          _g71 = "\\\"";
        } else {
          var _g72;
          if (c === "\\") {
            _g72 = "\\\\";
          } else {
            _g72 = c;
          }
          _g71 = _g72;
        }
        _g70 = _g71;
      }
      var c1 = _g70;
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
      var _g73 = args;
      var k = undefined;
      for (k in _g73) {
        if (isNaN(parseInt(k))) {
          var v = _g73[k];
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
        var _g74 = lh;
        var i = 0;
        while (i < length(_g74)) {
          var x = _g74[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g75 = lh;
        var k = undefined;
        for (k in _g75) {
          if (isNaN(parseInt(k))) {
            var v = _g75[k];
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
      var _g76 = args;
      var _g77 = 0;
      while (_g77 < length(_g76)) {
        var arg = _g76[_g77];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g77 = _g77 + 1;
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
          var _g61 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g80 = args;
          var _g81 = 0;
          while (_g81 < length(_g80)) {
            var _g78 = _g80[_g81];
            setenv(_g78, {_stash: true, variable: true});
            _g81 = _g81 + 1;
          }
          var _g79 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g79);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g62 = form[0];
            var name = form[1];
            var _g82 = form[2];
            var _g83 = sub(form, 3);
            add(environment, {_scope: true});
            var _g86 = _g82;
            var _g87 = 0;
            while (_g87 < length(_g86)) {
              var _g84 = _g86[_g87];
              setenv(_g84, {_stash: true, variable: true});
              _g87 = _g87 + 1;
            }
            var _g85 = join([x, name, map(macroexpand, _g82)], macroexpand(_g83));
            drop(environment);
            return(_g85);
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
    var _g88 = form;
    var k = undefined;
    for (k in _g88) {
      if (isNaN(parseInt(k))) {
        var v = _g88[k];
        var _g93;
        if (quasisplice63(v, depth)) {
          _g93 = quasiexpand(v[1]);
        } else {
          _g93 = quasiexpand(v, depth);
        }
        var _g89 = _g93;
        last(xs)[k] = _g89;
      }
    }
    var _g90 = form;
    var _g91 = 0;
    while (_g91 < length(_g90)) {
      var x = _g90[_g91];
      if (quasisplice63(x, depth)) {
        var _g92 = quasiexpand(x[1]);
        add(xs, _g92);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g91 = _g91 + 1;
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
      var _g99;
      if (c === "-") {
        _g99 = "_";
      } else {
        var _g100;
        if (valid_char63(n)) {
          _g100 = c;
        } else {
          var _g101;
          if (i === 0) {
            _g101 = "_" + n;
          } else {
            _g101 = n;
          }
          _g100 = _g101;
        }
        _g99 = _g100;
      }
      var c1 = _g99;
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
    var _g102 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g102.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g103 = module(spec).export;
      var n = undefined;
      for (n in _g103) {
        if (isNaN(parseInt(n))) {
          var b = _g103[n];
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
    var _g104 = module(current_module).export;
    var n = undefined;
    for (n in _g104) {
      if (isNaN(parseInt(n))) {
        var b = _g104[n];
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
    var _g105 = t;
    var k = undefined;
    for (k in _g105) {
      if (isNaN(parseInt(k))) {
        var v = _g105[k];
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
    var _g106 = ["table"];
    _g106.alias = quoted(m.alias);
    _g106.export = quote_frame(m.export);
    _g106.import = quoted(m.import);
    return(_g106);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g107 = {};
  nexus["lumen/utilities"] = _g107;
  _g107.bind = bind;
  _g107["bind*"] = bind42;
  _g107["bound?"] = bound63;
  _g107["can-unquote?"] = can_unquote63;
  _g107.escape = escape;
  _g107.exported = exported;
  _g107.getenv = getenv;
  _g107["global?"] = global63;
  _g107.id = id;
  _g107.imported = imported;
  _g107.indentation = indentation;
  _g107["initial-environment"] = initial_environment;
  _g107["macro-function"] = macro_function;
  _g107["macro?"] = macro63;
  _g107.macroexpand = macroexpand;
  _g107.mapo = mapo;
  _g107["numeric?"] = numeric63;
  _g107.quasiexpand = quasiexpand;
  _g107["quasiquote-list"] = quasiquote_list;
  _g107["quasiquoting?"] = quasiquoting63;
  _g107["quasisplice?"] = quasisplice63;
  _g107["quote-binding"] = quote_binding;
  _g107["quote-environment"] = quote_environment;
  _g107["quote-frame"] = quote_frame;
  _g107["quote-module"] = quote_module;
  _g107["quote-modules"] = quote_modules;
  _g107.quoted = quoted;
  _g107["quoting?"] = quoting63;
  _g107.reserved = reserved;
  _g107["reserved?"] = reserved63;
  _g107.sortk = sortk;
  _g107["special-form?"] = special_form63;
  _g107["special?"] = special63;
  _g107["stash*"] = stash42;
  _g107["statement?"] = statement63;
  _g107["symbol-expansion"] = symbol_expansion;
  _g107["symbol?"] = symbol63;
  _g107["toplevel?"] = toplevel63;
  _g107["valid-char?"] = valid_char63;
  _g107["valid-id?"] = valid_id63;
  _g107["variable?"] = variable63;
})();
(function () {
  var _g109 = nexus["lumen/runtime"];
  var _37 = _g109["%"];
  var _37message_handler = _g109["%message-handler"];
  var _42 = _g109["*"];
  var _43 = _g109["+"];
  var _ = _g109["-"];
  var _47 = _g109["/"];
  var _60 = _g109["<"];
  var _6061 = _g109["<="];
  var _61 = _g109["="];
  var _62 = _g109[">"];
  var _6261 = _g109[">="];
  var abs = _g109.abs;
  var acos = _g109.acos;
  var add = _g109.add;
  var apply = _g109.apply;
  var asin = _g109.asin;
  var atan = _g109.atan;
  var atan2 = _g109.atan2;
  var atom63 = _g109["atom?"];
  var boolean63 = _g109["boolean?"];
  var cat = _g109.cat;
  var ceil = _g109.ceil;
  var char = _g109.char;
  var code = _g109.code;
  var composite63 = _g109["composite?"];
  var cos = _g109.cos;
  var drop = _g109.drop;
  var empty63 = _g109["empty?"];
  var exclude = _g109.exclude;
  var exit = _g109.exit;
  var extend = _g109.extend;
  var find = _g109.find;
  var flat = _g109.flat;
  var flat1 = _g109.flat1;
  var floor = _g109.floor;
  var function63 = _g109["function?"];
  var hd = _g109.hd;
  var id_literal63 = _g109["id-literal?"];
  var in63 = _g109["in?"];
  var inner = _g109.inner;
  var is63 = _g109["is?"];
  var iterate = _g109.iterate;
  var join = _g109.join;
  var keep = _g109.keep;
  var keys63 = _g109["keys?"];
  var last = _g109.last;
  var length = _g109.length;
  var list63 = _g109["list?"];
  var log = _g109.log;
  var log10 = _g109.log10;
  var make_id = _g109["make-id"];
  var map = _g109.map;
  var max = _g109.max;
  var min = _g109.min;
  var module = _g109.module;
  var module_key = _g109["module-key"];
  var nil63 = _g109["nil?"];
  var none63 = _g109["none?"];
  var number = _g109.number;
  var number63 = _g109["number?"];
  var pairwise = _g109.pairwise;
  var pow = _g109.pow;
  var random = _g109.random;
  var read_file = _g109["read-file"];
  var reduce = _g109.reduce;
  var replicate = _g109.replicate;
  var reverse = _g109.reverse;
  var sd = _g109.sd;
  var search = _g109.search;
  var setenv = _g109.setenv;
  var sin = _g109.sin;
  var sinh = _g109.sinh;
  var some63 = _g109["some?"];
  var sort = _g109.sort;
  var splice = _g109.splice;
  var split = _g109.split;
  var sqrt = _g109.sqrt;
  var stash = _g109.stash;
  var string = _g109.string;
  var string_literal63 = _g109["string-literal?"];
  var string63 = _g109["string?"];
  var sub = _g109.sub;
  var sublist = _g109.sublist;
  var substring = _g109.substring;
  var table63 = _g109["table?"];
  var tan = _g109.tan;
  var tanh = _g109.tanh;
  var td = _g109.td;
  var tl = _g109.tl;
  var toplevel63 = _g109["toplevel?"];
  var unstash = _g109.unstash;
  var write = _g109.write;
  var write_file = _g109["write-file"];
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
  var _g121 = {};
  nexus["lumen/reader"] = _g121;
  _g121.delimiters = delimiters;
  _g121.eof = eof;
  _g121["flag?"] = flag63;
  _g121["key?"] = key63;
  _g121["make-stream"] = make_stream;
  _g121["peek-char"] = peek_char;
  _g121.read = read;
  _g121["read-all"] = read_all;
  _g121["read-char"] = read_char;
  _g121["read-from-string"] = read_from_string;
  _g121["read-table"] = read_table;
  _g121["skip-non-code"] = skip_non_code;
  _g121.whitespace = whitespace;
})();
(function () {
  var _g123 = nexus["lumen/utilities"];
  var bind = _g123.bind;
  var bind42 = _g123["bind*"];
  var bound63 = _g123["bound?"];
  var exported = _g123.exported;
  var getenv = _g123.getenv;
  var id = _g123.id;
  var imported = _g123.imported;
  var indentation = _g123.indentation;
  var initial_environment = _g123["initial-environment"];
  var macro_function = _g123["macro-function"];
  var macro63 = _g123["macro?"];
  var macroexpand = _g123.macroexpand;
  var mapo = _g123.mapo;
  var quasiexpand = _g123.quasiexpand;
  var quote_environment = _g123["quote-environment"];
  var quote_modules = _g123["quote-modules"];
  var quoted = _g123.quoted;
  var reserved63 = _g123["reserved?"];
  var sortk = _g123.sortk;
  var special_form63 = _g123["special-form?"];
  var special63 = _g123["special?"];
  var stash42 = _g123["stash*"];
  var statement63 = _g123["statement?"];
  var symbol_expansion = _g123["symbol-expansion"];
  var symbol63 = _g123["symbol?"];
  var toplevel63 = _g123["toplevel?"];
  var valid_id63 = _g123["valid-id?"];
  var variable63 = _g123["variable?"];
  var _g124 = nexus["lumen/reader"];
  var make_stream = _g124["make-stream"];
  var read = _g124.read;
  var read_all = _g124["read-all"];
  var read_from_string = _g124["read-from-string"];
  var read_table = _g124["read-table"];
  var _g125 = nexus["lumen/runtime"];
  var _37 = _g125["%"];
  var _37message_handler = _g125["%message-handler"];
  var _42 = _g125["*"];
  var _43 = _g125["+"];
  var _ = _g125["-"];
  var _47 = _g125["/"];
  var _60 = _g125["<"];
  var _6061 = _g125["<="];
  var _61 = _g125["="];
  var _62 = _g125[">"];
  var _6261 = _g125[">="];
  var abs = _g125.abs;
  var acos = _g125.acos;
  var add = _g125.add;
  var apply = _g125.apply;
  var asin = _g125.asin;
  var atan = _g125.atan;
  var atan2 = _g125.atan2;
  var atom63 = _g125["atom?"];
  var boolean63 = _g125["boolean?"];
  var cat = _g125.cat;
  var ceil = _g125.ceil;
  var char = _g125.char;
  var code = _g125.code;
  var composite63 = _g125["composite?"];
  var cos = _g125.cos;
  var drop = _g125.drop;
  var empty63 = _g125["empty?"];
  var exclude = _g125.exclude;
  var exit = _g125.exit;
  var extend = _g125.extend;
  var find = _g125.find;
  var flat = _g125.flat;
  var flat1 = _g125.flat1;
  var floor = _g125.floor;
  var function63 = _g125["function?"];
  var hd = _g125.hd;
  var id_literal63 = _g125["id-literal?"];
  var in63 = _g125["in?"];
  var inner = _g125.inner;
  var is63 = _g125["is?"];
  var iterate = _g125.iterate;
  var join = _g125.join;
  var keep = _g125.keep;
  var keys63 = _g125["keys?"];
  var last = _g125.last;
  var length = _g125.length;
  var list63 = _g125["list?"];
  var log = _g125.log;
  var log10 = _g125.log10;
  var make_id = _g125["make-id"];
  var map = _g125.map;
  var max = _g125.max;
  var min = _g125.min;
  var module = _g125.module;
  var module_key = _g125["module-key"];
  var nil63 = _g125["nil?"];
  var none63 = _g125["none?"];
  var number = _g125.number;
  var number63 = _g125["number?"];
  var pairwise = _g125.pairwise;
  var pow = _g125.pow;
  var random = _g125.random;
  var read_file = _g125["read-file"];
  var reduce = _g125.reduce;
  var replicate = _g125.replicate;
  var reverse = _g125.reverse;
  var sd = _g125.sd;
  var search = _g125.search;
  var setenv = _g125.setenv;
  var sin = _g125.sin;
  var sinh = _g125.sinh;
  var some63 = _g125["some?"];
  var sort = _g125.sort;
  var splice = _g125.splice;
  var split = _g125.split;
  var sqrt = _g125.sqrt;
  var stash = _g125.stash;
  var string = _g125.string;
  var string_literal63 = _g125["string-literal?"];
  var string63 = _g125["string?"];
  var sub = _g125.sub;
  var sublist = _g125.sublist;
  var substring = _g125.substring;
  var table63 = _g125["table?"];
  var tan = _g125.tan;
  var tanh = _g125.tanh;
  var td = _g125.td;
  var tl = _g125.tl;
  var toplevel63 = _g125["toplevel?"];
  var unstash = _g125.unstash;
  var write = _g125.write;
  var write_file = _g125["write-file"];
  var _g131 = [];
  _g131.js = "!";
  _g131.lua = "not ";
  var _g129 = [];
  var _g132 = [];
  _g132.js = "!";
  _g132.lua = "not ";
  _g129["not"] = _g132;
  var _g134 = [];
  _g134["%"] = true;
  _g134["*"] = true;
  _g134["/"] = true;
  var _g136 = [];
  _g136["+"] = true;
  _g136["-"] = true;
  var _g140 = [];
  _g140.js = "+";
  _g140.lua = "..";
  var _g138 = [];
  var _g141 = [];
  _g141.js = "+";
  _g141.lua = "..";
  _g138.cat = _g141;
  var _g143 = [];
  _g143["<"] = true;
  _g143["<="] = true;
  _g143[">"] = true;
  _g143[">="] = true;
  var _g147 = [];
  _g147.js = "!=";
  _g147.lua = "~=";
  var _g149 = [];
  _g149.js = "===";
  _g149.lua = "==";
  var _g145 = [];
  var _g150 = [];
  _g150.js = "===";
  _g150.lua = "==";
  _g145["="] = _g150;
  var _g151 = [];
  _g151.js = "!=";
  _g151.lua = "~=";
  _g145["~="] = _g151;
  var _g155 = [];
  _g155.js = "&&";
  _g155.lua = "and";
  var _g153 = [];
  var _g156 = [];
  _g156.js = "&&";
  _g156.lua = "and";
  _g153["and"] = _g156;
  var _g160 = [];
  _g160.js = "||";
  _g160.lua = "or";
  var _g158 = [];
  var _g161 = [];
  _g161.js = "||";
  _g161.lua = "or";
  _g158["or"] = _g161;
  var infix = [_g129, _g134, _g136, _g138, _g143, _g145, _g153, _g158];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g162 = infix;
      var i = 0;
      while (i < length(_g162)) {
        var level = _g162[i];
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
    var _g163 = args;
    var i = 0;
    while (i < length(_g163)) {
      var arg = _g163[i];
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
    var _g164 = getenv(x);
    var stmt = _g164.stmt;
    var special = _g164.special;
    var self_tr63 = _g164.tr;
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
    var _g165 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g165.right;
    var _g166;
    if (right) {
      _g166 = _6261;
    } else {
      _g166 = _62;
    }
    if (_g166(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g167 = sub(form, 1);
    var a = _g167[0];
    var b = _g167[1];
    var _g168 = op_delims(form, a);
    var ao = _g168[0];
    var ac = _g168[1];
    var _g169 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g169[0];
    var bc = _g169[1];
    var _g170 = compile(a);
    var _g171 = compile(b);
    var _g172 = getop(op);
    if (unary63(form)) {
      return(_g172 + ao + _g170 + ac);
    } else {
      return(ao + _g170 + ac + " " + _g172 + " " + bo + _g171 + bc);
    }
  }
  function compile_function(args, body) {
    var _g173 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g173.name;
    var prefix = _g173.prefix;
    var _g178;
    if (name) {
      _g178 = compile(name);
    } else {
      _g178 = "";
    }
    var id = _g178;
    var _g174 = prefix || "";
    var _g175 = compile_args(args);
    indent_level = indent_level + 1;
    var _g177 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g176 = _g177;
    var ind = indentation();
    var _g179;
    if (target === "js") {
      _g179 = "";
    } else {
      _g179 = "end";
    }
    var tr = _g179;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g175 + " {\n" + _g176 + ind + "}" + tr);
    } else {
      return(_g174 + "function " + id + _g175 + "\n" + _g176 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g180 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g180.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g182;
        if (stmt) {
          _g182 = indentation();
        } else {
          _g182 = "";
        }
        var ind = _g182;
        var _g183;
        if (atom63(form)) {
          _g183 = compile_atom(form);
        } else {
          var _g184;
          if (infix63(hd(form))) {
            _g184 = compile_infix(form);
          } else {
            _g184 = compile_call(form);
          }
          _g183 = _g184;
        }
        var _g181 = _g183;
        return(ind + _g181 + tr);
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
    var _g185 = sub(args, 0, length(args) - 1);
    var _g186 = 0;
    while (_g186 < length(_g185)) {
      var x = _g185[_g186];
      add(hoist, lower(x, hoist, stmt63));
      _g186 = _g186 + 1;
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
    var _g187 = args[1];
    var _g188 = args[2];
    if (stmt63 || tail63) {
      var _g190;
      if (_g188) {
        _g190 = [lower_body([_g188], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g187], tail63)], _g190)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g189;
      if (_g188) {
        _g189 = [lower(["set", e, _g188])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g187])], _g189));
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
      var _g191;
      if (x === "and") {
        _g191 = ["%if", id, b, id];
      } else {
        _g191 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g191], hoist));
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
    var _g192 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g192, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g193 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g193)) {
      return(_g193);
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
    var _g194 = map(process, body);
    var epilogue = map(process, exported());
    return([["%function", [], join(["do"], join(_g194, epilogue))]]);
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
  function conclude(code) {
    if (compiling63) {
      compiler_output = compiler_output + code;
    } else {
      return(run(code));
    }
  }
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    current_module = mod0;
    environment = env0;
    return(conclude(compiled));
  }
  function open_module(spec) {
    var _g195 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g195.all;
    var m = module(spec);
    var frame = last(environment);
    var _g196 = m.export;
    var k = undefined;
    for (k in _g196) {
      if (isNaN(parseInt(k))) {
        var v = _g196[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g197 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g197.all;
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
  function declare(form) {
    return(conclude(compile(process(form), {_stash: true, stmt: true})));
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
  var _g198 = {};
  nexus["lumen/compiler"] = _g198;
  _g198["%compile-module"] = _37compile_module;
  _g198["can-return?"] = can_return63;
  _g198.compile = compile;
  _g198["compile-args"] = compile_args;
  _g198["compile-atom"] = compile_atom;
  _g198["compile-call"] = compile_call;
  _g198["compile-file"] = compile_file;
  _g198["compile-function"] = compile_function;
  _g198["compile-infix"] = compile_infix;
  _g198["compile-module"] = compile_module;
  _g198["compile-special"] = compile_special;
  _g198["compiler-output"] = compiler_output;
  _g198["compiling?"] = compiling63;
  _g198.conclude = conclude;
  _g198.declare = declare;
  _g198.encapsulate = encapsulate;
  _g198.eval = eval;
  _g198.getop = getop;
  _g198["in-module"] = in_module;
  _g198.infix = infix;
  _g198["infix?"] = infix63;
  _g198["load-module"] = load_module;
  _g198.lower = lower;
  _g198["lower-body"] = lower_body;
  _g198["lower-call"] = lower_call;
  _g198["lower-definition"] = lower_definition;
  _g198["lower-do"] = lower_do;
  _g198["lower-for"] = lower_for;
  _g198["lower-function"] = lower_function;
  _g198["lower-if"] = lower_if;
  _g198["lower-infix"] = lower_infix;
  _g198["lower-infix?"] = lower_infix63;
  _g198["lower-short"] = lower_short;
  _g198["lower-special"] = lower_special;
  _g198["lower-statement"] = lower_statement;
  _g198["lower-try"] = lower_try;
  _g198["lower-while"] = lower_while;
  _g198["module-path"] = module_path;
  _g198["op-delims"] = op_delims;
  _g198["open-module"] = open_module;
  _g198["parenthesize-call?"] = parenthesize_call63;
  _g198.precedence = precedence;
  _g198.process = process;
  _g198.reimported = reimported;
  _g198.run = run;
  _g198.terminator = terminator;
  _g198["unary?"] = unary63;
})();
(function () {
  var _g200 = nexus["lumen/utilities"];
  var bind = _g200.bind;
  var bind42 = _g200["bind*"];
  var bound63 = _g200["bound?"];
  var exported = _g200.exported;
  var getenv = _g200.getenv;
  var id = _g200.id;
  var imported = _g200.imported;
  var indentation = _g200.indentation;
  var initial_environment = _g200["initial-environment"];
  var macro_function = _g200["macro-function"];
  var macro63 = _g200["macro?"];
  var macroexpand = _g200.macroexpand;
  var mapo = _g200.mapo;
  var quasiexpand = _g200.quasiexpand;
  var quote_environment = _g200["quote-environment"];
  var quote_modules = _g200["quote-modules"];
  var quoted = _g200.quoted;
  var reserved63 = _g200["reserved?"];
  var sortk = _g200.sortk;
  var special_form63 = _g200["special-form?"];
  var special63 = _g200["special?"];
  var stash42 = _g200["stash*"];
  var statement63 = _g200["statement?"];
  var symbol_expansion = _g200["symbol-expansion"];
  var symbol63 = _g200["symbol?"];
  var toplevel63 = _g200["toplevel?"];
  var valid_id63 = _g200["valid-id?"];
  var variable63 = _g200["variable?"];
  var _g201 = nexus["lumen/compiler"];
  var compile = _g201.compile;
  var compile_function = _g201["compile-function"];
  var compile_module = _g201["compile-module"];
  var declare = _g201.declare;
  var eval = _g201.eval;
  var in_module = _g201["in-module"];
  var load_module = _g201["load-module"];
  var open_module = _g201["open-module"];
  var _g202 = nexus["lumen/runtime"];
  var _37 = _g202["%"];
  var _37message_handler = _g202["%message-handler"];
  var _42 = _g202["*"];
  var _43 = _g202["+"];
  var _ = _g202["-"];
  var _47 = _g202["/"];
  var _60 = _g202["<"];
  var _6061 = _g202["<="];
  var _61 = _g202["="];
  var _62 = _g202[">"];
  var _6261 = _g202[">="];
  var abs = _g202.abs;
  var acos = _g202.acos;
  var add = _g202.add;
  var apply = _g202.apply;
  var asin = _g202.asin;
  var atan = _g202.atan;
  var atan2 = _g202.atan2;
  var atom63 = _g202["atom?"];
  var boolean63 = _g202["boolean?"];
  var cat = _g202.cat;
  var ceil = _g202.ceil;
  var char = _g202.char;
  var code = _g202.code;
  var composite63 = _g202["composite?"];
  var cos = _g202.cos;
  var drop = _g202.drop;
  var empty63 = _g202["empty?"];
  var exclude = _g202.exclude;
  var exit = _g202.exit;
  var extend = _g202.extend;
  var find = _g202.find;
  var flat = _g202.flat;
  var flat1 = _g202.flat1;
  var floor = _g202.floor;
  var function63 = _g202["function?"];
  var hd = _g202.hd;
  var id_literal63 = _g202["id-literal?"];
  var in63 = _g202["in?"];
  var inner = _g202.inner;
  var is63 = _g202["is?"];
  var iterate = _g202.iterate;
  var join = _g202.join;
  var keep = _g202.keep;
  var keys63 = _g202["keys?"];
  var last = _g202.last;
  var length = _g202.length;
  var list63 = _g202["list?"];
  var log = _g202.log;
  var log10 = _g202.log10;
  var make_id = _g202["make-id"];
  var map = _g202.map;
  var max = _g202.max;
  var min = _g202.min;
  var module = _g202.module;
  var module_key = _g202["module-key"];
  var nil63 = _g202["nil?"];
  var none63 = _g202["none?"];
  var number = _g202.number;
  var number63 = _g202["number?"];
  var pairwise = _g202.pairwise;
  var pow = _g202.pow;
  var random = _g202.random;
  var read_file = _g202["read-file"];
  var reduce = _g202.reduce;
  var replicate = _g202.replicate;
  var reverse = _g202.reverse;
  var sd = _g202.sd;
  var search = _g202.search;
  var setenv = _g202.setenv;
  var sin = _g202.sin;
  var sinh = _g202.sinh;
  var some63 = _g202["some?"];
  var sort = _g202.sort;
  var splice = _g202.splice;
  var split = _g202.split;
  var sqrt = _g202.sqrt;
  var stash = _g202.stash;
  var string = _g202.string;
  var string_literal63 = _g202["string-literal?"];
  var string63 = _g202["string?"];
  var sub = _g202.sub;
  var sublist = _g202.sublist;
  var substring = _g202.substring;
  var table63 = _g202["table?"];
  var tan = _g202.tan;
  var tanh = _g202.tanh;
  var td = _g202.td;
  var tl = _g202.tl;
  var toplevel63 = _g202["toplevel?"];
  var unstash = _g202.unstash;
  var write = _g202.write;
  var write_file = _g202["write-file"];
})();
(function () {
  var _g402 = nexus["lumen/utilities"];
  var bind = _g402.bind;
  var bind42 = _g402["bind*"];
  var bound63 = _g402["bound?"];
  var exported = _g402.exported;
  var getenv = _g402.getenv;
  var id = _g402.id;
  var imported = _g402.imported;
  var indentation = _g402.indentation;
  var initial_environment = _g402["initial-environment"];
  var macro_function = _g402["macro-function"];
  var macro63 = _g402["macro?"];
  var macroexpand = _g402.macroexpand;
  var mapo = _g402.mapo;
  var quasiexpand = _g402.quasiexpand;
  var quote_environment = _g402["quote-environment"];
  var quote_modules = _g402["quote-modules"];
  var quoted = _g402.quoted;
  var reserved63 = _g402["reserved?"];
  var sortk = _g402.sortk;
  var special_form63 = _g402["special-form?"];
  var special63 = _g402["special?"];
  var stash42 = _g402["stash*"];
  var statement63 = _g402["statement?"];
  var symbol_expansion = _g402["symbol-expansion"];
  var symbol63 = _g402["symbol?"];
  var toplevel63 = _g402["toplevel?"];
  var valid_id63 = _g402["valid-id?"];
  var variable63 = _g402["variable?"];
  var _g403 = nexus["lumen/compiler"];
  var compile = _g403.compile;
  var compile_function = _g403["compile-function"];
  var compile_module = _g403["compile-module"];
  var declare = _g403.declare;
  var eval = _g403.eval;
  var in_module = _g403["in-module"];
  var load_module = _g403["load-module"];
  var open_module = _g403["open-module"];
  var _g404 = nexus["lumen/runtime"];
  var _37 = _g404["%"];
  var _37message_handler = _g404["%message-handler"];
  var _42 = _g404["*"];
  var _43 = _g404["+"];
  var _ = _g404["-"];
  var _47 = _g404["/"];
  var _60 = _g404["<"];
  var _6061 = _g404["<="];
  var _61 = _g404["="];
  var _62 = _g404[">"];
  var _6261 = _g404[">="];
  var abs = _g404.abs;
  var acos = _g404.acos;
  var add = _g404.add;
  var apply = _g404.apply;
  var asin = _g404.asin;
  var atan = _g404.atan;
  var atan2 = _g404.atan2;
  var atom63 = _g404["atom?"];
  var boolean63 = _g404["boolean?"];
  var cat = _g404.cat;
  var ceil = _g404.ceil;
  var char = _g404.char;
  var code = _g404.code;
  var composite63 = _g404["composite?"];
  var cos = _g404.cos;
  var drop = _g404.drop;
  var empty63 = _g404["empty?"];
  var exclude = _g404.exclude;
  var exit = _g404.exit;
  var extend = _g404.extend;
  var find = _g404.find;
  var flat = _g404.flat;
  var flat1 = _g404.flat1;
  var floor = _g404.floor;
  var function63 = _g404["function?"];
  var hd = _g404.hd;
  var id_literal63 = _g404["id-literal?"];
  var in63 = _g404["in?"];
  var inner = _g404.inner;
  var is63 = _g404["is?"];
  var iterate = _g404.iterate;
  var join = _g404.join;
  var keep = _g404.keep;
  var keys63 = _g404["keys?"];
  var last = _g404.last;
  var length = _g404.length;
  var list63 = _g404["list?"];
  var log = _g404.log;
  var log10 = _g404.log10;
  var make_id = _g404["make-id"];
  var map = _g404.map;
  var max = _g404.max;
  var min = _g404.min;
  var module = _g404.module;
  var module_key = _g404["module-key"];
  var nil63 = _g404["nil?"];
  var none63 = _g404["none?"];
  var number = _g404.number;
  var number63 = _g404["number?"];
  var pairwise = _g404.pairwise;
  var pow = _g404.pow;
  var random = _g404.random;
  var read_file = _g404["read-file"];
  var reduce = _g404.reduce;
  var replicate = _g404.replicate;
  var reverse = _g404.reverse;
  var sd = _g404.sd;
  var search = _g404.search;
  var setenv = _g404.setenv;
  var sin = _g404.sin;
  var sinh = _g404.sinh;
  var some63 = _g404["some?"];
  var sort = _g404.sort;
  var splice = _g404.splice;
  var split = _g404.split;
  var sqrt = _g404.sqrt;
  var stash = _g404.stash;
  var string = _g404.string;
  var string_literal63 = _g404["string-literal?"];
  var string63 = _g404["string?"];
  var sub = _g404.sub;
  var sublist = _g404.sublist;
  var substring = _g404.substring;
  var table63 = _g404["table?"];
  var tan = _g404.tan;
  var tanh = _g404.tanh;
  var td = _g404.td;
  var tl = _g404.tl;
  var toplevel63 = _g404["toplevel?"];
  var unstash = _g404.unstash;
  var write = _g404.write;
  var write_file = _g404["write-file"];
  global.target = "js";
})();
(function () {
  var _g736 = nexus["lumen/utilities"];
  var bind = _g736.bind;
  var bind42 = _g736["bind*"];
  var bound63 = _g736["bound?"];
  var exported = _g736.exported;
  var getenv = _g736.getenv;
  var id = _g736.id;
  var imported = _g736.imported;
  var indentation = _g736.indentation;
  var initial_environment = _g736["initial-environment"];
  var macro_function = _g736["macro-function"];
  var macro63 = _g736["macro?"];
  var macroexpand = _g736.macroexpand;
  var mapo = _g736.mapo;
  var quasiexpand = _g736.quasiexpand;
  var quote_environment = _g736["quote-environment"];
  var quote_modules = _g736["quote-modules"];
  var quoted = _g736.quoted;
  var reserved63 = _g736["reserved?"];
  var sortk = _g736.sortk;
  var special_form63 = _g736["special-form?"];
  var special63 = _g736["special?"];
  var stash42 = _g736["stash*"];
  var statement63 = _g736["statement?"];
  var symbol_expansion = _g736["symbol-expansion"];
  var symbol63 = _g736["symbol?"];
  var toplevel63 = _g736["toplevel?"];
  var valid_id63 = _g736["valid-id?"];
  var variable63 = _g736["variable?"];
  var _g737 = nexus["lumen/compiler"];
  var compile = _g737.compile;
  var compile_function = _g737["compile-function"];
  var compile_module = _g737["compile-module"];
  var declare = _g737.declare;
  var eval = _g737.eval;
  var in_module = _g737["in-module"];
  var load_module = _g737["load-module"];
  var open_module = _g737["open-module"];
  var _g738 = nexus["lumen/runtime"];
  var _37 = _g738["%"];
  var _37message_handler = _g738["%message-handler"];
  var _42 = _g738["*"];
  var _43 = _g738["+"];
  var _ = _g738["-"];
  var _47 = _g738["/"];
  var _60 = _g738["<"];
  var _6061 = _g738["<="];
  var _61 = _g738["="];
  var _62 = _g738[">"];
  var _6261 = _g738[">="];
  var abs = _g738.abs;
  var acos = _g738.acos;
  var add = _g738.add;
  var apply = _g738.apply;
  var asin = _g738.asin;
  var atan = _g738.atan;
  var atan2 = _g738.atan2;
  var atom63 = _g738["atom?"];
  var boolean63 = _g738["boolean?"];
  var cat = _g738.cat;
  var ceil = _g738.ceil;
  var char = _g738.char;
  var code = _g738.code;
  var composite63 = _g738["composite?"];
  var cos = _g738.cos;
  var drop = _g738.drop;
  var empty63 = _g738["empty?"];
  var exclude = _g738.exclude;
  var exit = _g738.exit;
  var extend = _g738.extend;
  var find = _g738.find;
  var flat = _g738.flat;
  var flat1 = _g738.flat1;
  var floor = _g738.floor;
  var function63 = _g738["function?"];
  var hd = _g738.hd;
  var id_literal63 = _g738["id-literal?"];
  var in63 = _g738["in?"];
  var inner = _g738.inner;
  var is63 = _g738["is?"];
  var iterate = _g738.iterate;
  var join = _g738.join;
  var keep = _g738.keep;
  var keys63 = _g738["keys?"];
  var last = _g738.last;
  var length = _g738.length;
  var list63 = _g738["list?"];
  var log = _g738.log;
  var log10 = _g738.log10;
  var make_id = _g738["make-id"];
  var map = _g738.map;
  var max = _g738.max;
  var min = _g738.min;
  var module = _g738.module;
  var module_key = _g738["module-key"];
  var nil63 = _g738["nil?"];
  var none63 = _g738["none?"];
  var number = _g738.number;
  var number63 = _g738["number?"];
  var pairwise = _g738.pairwise;
  var pow = _g738.pow;
  var random = _g738.random;
  var read_file = _g738["read-file"];
  var reduce = _g738.reduce;
  var replicate = _g738.replicate;
  var reverse = _g738.reverse;
  var sd = _g738.sd;
  var search = _g738.search;
  var setenv = _g738.setenv;
  var sin = _g738.sin;
  var sinh = _g738.sinh;
  var some63 = _g738["some?"];
  var sort = _g738.sort;
  var splice = _g738.splice;
  var split = _g738.split;
  var sqrt = _g738.sqrt;
  var stash = _g738.stash;
  var string = _g738.string;
  var string_literal63 = _g738["string-literal?"];
  var string63 = _g738["string?"];
  var sub = _g738.sub;
  var sublist = _g738.sublist;
  var substring = _g738.substring;
  var table63 = _g738["table?"];
  var tan = _g738.tan;
  var tanh = _g738.tanh;
  var td = _g738.td;
  var tl = _g738.tl;
  var toplevel63 = _g738["toplevel?"];
  var unstash = _g738.unstash;
  var write = _g738.write;
  var write_file = _g738["write-file"];
  global.modules = {lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"%compile-module": {variable: true}, "%result": {export: true, global: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, conclude: {variable: true}, "current-module": {export: true, global: true}, declare: {export: true, variable: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, reimported: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "reader"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {export: {at: {export: true, macro: function (l, i) {
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
    var _g784 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g784)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g812 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g812)) {
      var _g813 = bind42(x, _g812);
      var args = _g813[0];
      var _g814 = _g813[1];
      return(join(["%local-function", name, args], _g814));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g818 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g818)) {
      var _g819 = bind42(x, _g818);
      var args = _g819[0];
      var _g820 = _g819[1];
      return(join(["%global-function", name, args], _g820));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g816 = sub(body, 0);
    var form = join(["fn", args], _g816);
    var _g817 = ["setenv", ["quote", name]];
    _g817.form = ["quote", form];
    _g817.macro = form;
    eval(_g817);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g793 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var alias = _g793.alias;
    var imp = _g793.import;
    var exp = _g793.export;
    var _g794 = imp || [];
    var _g795 = 0;
    while (_g795 < length(_g794)) {
      var k = _g794[_g795];
      load_module(k);
      var _g796 = module(k).alias || [];
      var _g797 = 0;
      while (_g797 < length(_g796)) {
        var a = _g796[_g797];
        add(imp, a);
        _g797 = _g797 + 1;
      }
      imports = join(imports, imported(k));
      _g795 = _g795 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g798 = exp || [];
    var _g799 = 0;
    while (_g799 < length(_g798)) {
      var k = _g798[_g799];
      setenv(k, {_stash: true, export: true});
      _g799 = _g799 + 1;
    }
    return(join(["do"], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g805 = sub(body, 0);
    var form = join(["fn", args], _g805);
    var keys = sub(_g805, length(_g805));
    var _g806 = ["setenv", ["quote", name]];
    _g806.form = ["quote", form];
    _g806.special = form;
    eval(join(_g806, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g790 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g840;
    if (nil63(v)) {
      var _g841;
      if (b.i) {
        _g841 = "i";
      } else {
        _g841 = make_id();
      }
      var i = _g841;
      _g840 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g790), ["inc", i]]];
    } else {
      var _g791 = ["target"];
      _g791.js = ["isNaN", ["parseInt", k]];
      _g791.lua = ["not", ["number?", k]];
      _g840 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g791, join(["let", [v, ["get", t1, k]]], _g790)]]];
    }
    return(["let", [t1, t], _g840]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g801 = sub(body, 0);
    var _g802 = bind42(args, _g801);
    var _g803 = _g802[0];
    var _g804 = _g802[1];
    return(join(["%function", _g803], _g804));
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
    function step(_g800) {
      var a = _g800[0];
      var b = _g800[1];
      var c = sub(_g800, 2);
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
    var _g792 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g792)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g822 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g823) {
      var lh = _g823[0];
      var rh = _g823[1];
      var _g824 = bind(lh, rh);
      var _g825 = 0;
      while (_g825 < length(_g824)) {
        var _g826 = _g824[_g825];
        var id = _g826[0];
        var val = _g826[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g825 = _g825 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g822)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g785 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g786 = join(["do"], macroexpand(_g785));
    drop(environment);
    return(_g786);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g781 = sub(body, 0);
    add(environment, {});
    map(function (_g783) {
      var name = _g783[0];
      var exp = _g783[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g782 = join(["do"], macroexpand(_g781));
    drop(environment);
    return(_g782);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g807 = body;
      var k = undefined;
      for (k in _g807) {
        if (isNaN(parseInt(k))) {
          var v = _g807[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g787 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g787)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g788 = elements;
    var _g789 = 0;
    while (_g789 < length(_g788)) {
      var e = _g788[_g789];
      l[e] = true;
      _g789 = _g789 + 1;
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
    var _g821 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g821)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g815 = sub(body, 0);
    return(["if", cond, join(["do"], _g815)]);
  }}, "with-bindings": {export: true, macro: function (_g808) {
    var names = _g808[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g809 = sub(body, 0);
    var x = make_id();
    var _g811 = ["setenv", x];
    _g811.variable = true;
    var _g810 = ["with-frame", ["each", [x], names, _g811]];
    _g810.scope = true;
    return(join(_g810, _g809));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g779 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g780 = ["table"];
    _g780._scope = scope;
    return(["do", ["add", "environment", _g780], ["let", [x, join(["do"], _g779)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g777) {
    var char = _g777[0];
    var stream = _g777[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g778 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g778)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g828;
    if (target === "lua") {
      _g828 = "{";
    } else {
      _g828 = "[";
    }
    var open = _g828;
    var _g829;
    if (target === "lua") {
      _g829 = "}";
    } else {
      _g829 = "]";
    }
    var close = _g829;
    var str = "";
    var _g757 = forms;
    var i = 0;
    while (i < length(_g757)) {
      var x = _g757[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g775 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g776 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g776;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g775 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g775 + ") {\n" + body + ind + "}\n");
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
    var _g761 = compile(cond);
    indent_level = indent_level + 1;
    var _g764 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g762 = _g764;
    var _g831;
    if (alt) {
      indent_level = indent_level + 1;
      var _g765 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g831 = _g765;
    }
    var _g763 = _g831;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g761 + ") {\n" + _g762 + ind + "}";
    } else {
      str = str + ind + "if " + _g761 + " then\n" + _g762;
    }
    if (_g763 && target === "js") {
      str = str + " else {\n" + _g763 + ind + "}";
    } else {
      if (_g763) {
        str = str + ind + "else\n" + _g763;
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
    var _g832;
    if (is63(value)) {
      _g832 = " = " + value1;
    } else {
      _g832 = "";
    }
    var rh = _g832;
    var _g833;
    if (target === "js") {
      _g833 = "var ";
    } else {
      _g833 = "local ";
    }
    var keyword = _g833;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g835;
    if (target === "lua") {
      _g835 = " = ";
    } else {
      _g835 = ": ";
    }
    var sep = _g835;
    var pairs = sortk(pairwise(forms), hd);
    var _g769 = pairs;
    var i = 0;
    while (i < length(_g769)) {
      var _g770 = _g769[i];
      var k = _g770[0];
      var v = _g770[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g771 = compile(v);
      var _g836;
      if (valid_id63(k)) {
        _g836 = k;
      } else {
        var _g837;
        if (target === "js" && string_literal63(k)) {
          _g837 = k;
        } else {
          var _g838;
          if (target === "js") {
            _g838 = quoted(k);
          } else {
            var _g839;
            if (string_literal63(k)) {
              _g839 = "[" + k + "]";
            } else {
              _g839 = "[" + quoted(k) + "]";
            }
            _g838 = _g839;
          }
          _g837 = _g838;
        }
        _g836 = _g837;
      }
      var _g772 = _g836;
      str = str + _g772 + sep + _g771;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g758 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g758;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g759 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g759;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g766 = forms;
    var _g767 = 0;
    while (_g767 < length(_g766)) {
      var x = _g766[_g767];
      str = str + compile(x, {_stash: true, stmt: true});
      _g767 = _g767 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g834;
    if (target === "js") {
      _g834 = "throw new " + compile(["Error", x]);
    } else {
      _g834 = "error(" + compile(x) + ")";
    }
    var e = _g834;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g768 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g768, 0) === "{") {
      _g768 = "(" + _g768 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g768 + "." + inner(k));
    } else {
      return(_g768 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g830;
    if (nil63(x)) {
      _g830 = "return";
    } else {
      _g830 = "return(" + compile(x) + ")";
    }
    var _g760 = _g830;
    return(indentation() + _g760);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g755 = compile(lh);
    var _g827;
    if (nil63(rh)) {
      _g827 = "nil";
    } else {
      _g827 = rh;
    }
    var _g756 = compile(_g827);
    return(indentation() + _g755 + " = " + _g756);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g773 = compile(cond);
    indent_level = indent_level + 1;
    var _g774 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g774;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g773 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g773 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, exported: {export: true, variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g842 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var alias = _g842.alias;
    var imp = _g842.import;
    var exp = _g842.export;
    var _g843 = imp || [];
    var _g844 = 0;
    while (_g844 < length(_g843)) {
      var k = _g843[_g844];
      load_module(k);
      var _g845 = module(k).alias || [];
      var _g846 = 0;
      while (_g846 < length(_g845)) {
        var a = _g845[_g846];
        add(imp, a);
        _g846 = _g846 + 1;
      }
      imports = join(imports, imported(k));
      _g844 = _g844 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g847 = exp || [];
    var _g848 = 0;
    while (_g848 < length(_g847)) {
      var k = _g847[_g848];
      setenv(k, {_stash: true, export: true});
      _g848 = _g848 + 1;
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
  var declare = _g4.declare;
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
    var _g850 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g853) {
        return([false, _g853.message]);
      }
    })();
    var _g1 = _g850[0];
    var x = _g850[1];
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
    var _g851 = args;
    var i = 0;
    while (i < length(_g851)) {
      var arg = _g851[i];
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
  var _g852 = {};
  nexus["lumen/main"] = _g852;
  _g852.main = main;
  _g852.rep = rep;
  _g852.repl = repl;
  _g852.usage = usage;
})();
