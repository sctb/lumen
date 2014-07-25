global.nexus = {};
(function () {
  nexus["lumen/runtime"] = {};
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
    var _g29 = l;
    var _g30 = 0;
    while (_g30 < length(_g29)) {
      var y = _g29[_g30];
      if (x === y) {
        return(true);
      }
      _g30 = _g30 + 1;
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
    var _g31 = from || 0;
    if (string63(x)) {
      return(substring(x, _g31, upto));
    } else {
      var l = sublist(x, _g31, upto);
      var _g32 = x;
      var k = undefined;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
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
          var _g33 = l1;
          var k = undefined;
          for (k in _g33) {
            if (isNaN(parseInt(k))) {
              var v = _g33[k];
              l[k] = v;
            }
          }
          var _g34 = l2;
          var k = undefined;
          for (k in _g34) {
            if (isNaN(parseInt(k))) {
              var v = _g34[k];
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
    var _g35 = l;
    var _g36 = 0;
    while (_g36 < length(_g35)) {
      var x = _g35[_g36];
      if (f(x)) {
        add(l1, x);
      }
      _g36 = _g36 + 1;
    }
    return(l1);
  }
  function find(f, l) {
    var _g37 = l;
    var _g38 = 0;
    while (_g38 < length(_g37)) {
      var x = _g37[_g38];
      var _g39 = f(x);
      if (_g39) {
        return(_g39);
      }
      _g38 = _g38 + 1;
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
    var _g40;
    if (f) {
      _g40 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g40));
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
    var _g41 = l;
    var _g42 = 0;
    while (_g42 < length(_g41)) {
      var x = _g41[_g42];
      var _g43 = f(x);
      if (splice63(_g43)) {
        l1 = join(l1, _g43.value);
      } else {
        if (is63(_g43)) {
          add(l1, _g43);
        }
      }
      _g42 = _g42 + 1;
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g44 = t;
    var k = undefined;
    for (k in _g44) {
      if (isNaN(parseInt(k))) {
        var v = _g44[k];
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
    var _g45 = t;
    var k = undefined;
    for (k in _g45) {
      if (isNaN(parseInt(k))) {
        var v = _g45[k];
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
      var _g46 = args;
      var k = undefined;
      for (k in _g46) {
        if (isNaN(parseInt(k))) {
          var v = _g46[k];
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
        var _g47 = l;
        var k = undefined;
        for (k in _g47) {
          if (isNaN(parseInt(k))) {
            var v = _g47[k];
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
    var _g48 = sub(xs, 0);
    return(join(t, _g48));
  }
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g49 = sub(keys, 0);
    var t1 = sublist(t);
    var _g50 = t;
    var k = undefined;
    for (k in _g50) {
      if (isNaN(parseInt(k))) {
        var v = _g50[k];
        if (!_g49[k]) {
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
    var _g51 = sub(xs, 0);
    if (none63(_g51)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g51));
    }
  }
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g52));
  }
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g53)));
  }
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g54));
  }
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g55 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g55)));
  }
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g56 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g56)));
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
            var _g57 = x;
            var k = undefined;
            for (k in _g57) {
              if (isNaN(parseInt(k))) {
                var v = _g57[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g58 = x1;
            var i = 0;
            while (i < length(_g58)) {
              var y = _g58[i];
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
    var _g59 = stash(args);
    return(f.apply(f, _g59));
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
    var _g60 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g61 = _g60;
      var k1 = undefined;
      for (k1 in _g61) {
        if (isNaN(parseInt(k1))) {
          var v = _g61[k1];
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
  var _g62 = nexus["lumen/runtime"];
  _g62["%"] = _37;
  _g62["%message-handler"] = _37message_handler;
  _g62["*"] = _42;
  _g62["+"] = _43;
  _g62["-"] = _;
  _g62["/"] = _47;
  _g62["<"] = _60;
  _g62["<="] = _6061;
  _g62["="] = _61;
  _g62[">"] = _62;
  _g62[">="] = _6261;
  _g62.abs = abs;
  _g62.acos = acos;
  _g62.add = add;
  _g62.apply = apply;
  _g62.asin = asin;
  _g62.atan = atan;
  _g62.atan2 = atan2;
  _g62["atom?"] = atom63;
  _g62["boolean?"] = boolean63;
  _g62.cat = cat;
  _g62.ceil = ceil;
  _g62.char = char;
  _g62.code = code;
  _g62["composite?"] = composite63;
  _g62.cos = cos;
  _g62.drop = drop;
  _g62["empty?"] = empty63;
  _g62.exclude = exclude;
  _g62.exit = exit;
  _g62.extend = extend;
  _g62.find = find;
  _g62.flat = flat;
  _g62.flat1 = flat1;
  _g62.floor = floor;
  _g62.fs = fs;
  _g62["function?"] = function63;
  _g62.hd = hd;
  _g62["id-count"] = id_count;
  _g62["id-literal?"] = id_literal63;
  _g62["in?"] = in63;
  _g62.inner = inner;
  _g62["is?"] = is63;
  _g62.iterate = iterate;
  _g62.join = join;
  _g62.keep = keep;
  _g62["keys?"] = keys63;
  _g62.last = last;
  _g62.length = length;
  _g62["list?"] = list63;
  _g62.log = log;
  _g62.log10 = log10;
  _g62["make-id"] = make_id;
  _g62.map = map;
  _g62.mapl = mapl;
  _g62.math = math;
  _g62.max = max;
  _g62.min = min;
  _g62.module = module;
  _g62["module-key"] = module_key;
  _g62["nil?"] = nil63;
  _g62["none?"] = none63;
  _g62.number = number;
  _g62["number?"] = number63;
  _g62.pairwise = pairwise;
  _g62.pow = pow;
  _g62.random = random;
  _g62["read-file"] = read_file;
  _g62.reduce = reduce;
  _g62.replicate = replicate;
  _g62.reverse = reverse;
  _g62.sd = sd;
  _g62.search = search;
  _g62.setenv = setenv;
  _g62.sin = sin;
  _g62.sinh = sinh;
  _g62["some?"] = some63;
  _g62.sort = sort;
  _g62.splice = splice;
  _g62["splice?"] = splice63;
  _g62.split = split;
  _g62.sqrt = sqrt;
  _g62.stash = stash;
  _g62.string = string;
  _g62["string-literal?"] = string_literal63;
  _g62["string?"] = string63;
  _g62.sub = sub;
  _g62.sublist = sublist;
  _g62.substring = substring;
  _g62["table?"] = table63;
  _g62.tan = tan;
  _g62.tanh = tanh;
  _g62.td = td;
  _g62.tl = tl;
  _g62["toplevel?"] = toplevel63;
  _g62.type = type;
  _g62.unstash = unstash;
  _g62.write = write;
  _g62["write-file"] = write_file;
})();
(function () {
  nexus["lumen/utilities"] = {};
  var _g67 = nexus["lumen/runtime"];
  var _37 = _g67["%"];
  var _37message_handler = _g67["%message-handler"];
  var _42 = _g67["*"];
  var _43 = _g67["+"];
  var _ = _g67["-"];
  var _47 = _g67["/"];
  var _60 = _g67["<"];
  var _6061 = _g67["<="];
  var _61 = _g67["="];
  var _62 = _g67[">"];
  var _6261 = _g67[">="];
  var abs = _g67.abs;
  var acos = _g67.acos;
  var add = _g67.add;
  var apply = _g67.apply;
  var asin = _g67.asin;
  var atan = _g67.atan;
  var atan2 = _g67.atan2;
  var atom63 = _g67["atom?"];
  var boolean63 = _g67["boolean?"];
  var cat = _g67.cat;
  var ceil = _g67.ceil;
  var char = _g67.char;
  var code = _g67.code;
  var composite63 = _g67["composite?"];
  var cos = _g67.cos;
  var drop = _g67.drop;
  var empty63 = _g67["empty?"];
  var exclude = _g67.exclude;
  var exit = _g67.exit;
  var extend = _g67.extend;
  var find = _g67.find;
  var flat = _g67.flat;
  var flat1 = _g67.flat1;
  var floor = _g67.floor;
  var function63 = _g67["function?"];
  var hd = _g67.hd;
  var id_literal63 = _g67["id-literal?"];
  var in63 = _g67["in?"];
  var inner = _g67.inner;
  var is63 = _g67["is?"];
  var iterate = _g67.iterate;
  var join = _g67.join;
  var keep = _g67.keep;
  var keys63 = _g67["keys?"];
  var last = _g67.last;
  var length = _g67.length;
  var list63 = _g67["list?"];
  var log = _g67.log;
  var log10 = _g67.log10;
  var make_id = _g67["make-id"];
  var map = _g67.map;
  var max = _g67.max;
  var min = _g67.min;
  var module = _g67.module;
  var module_key = _g67["module-key"];
  var nil63 = _g67["nil?"];
  var none63 = _g67["none?"];
  var number = _g67.number;
  var number63 = _g67["number?"];
  var pairwise = _g67.pairwise;
  var pow = _g67.pow;
  var random = _g67.random;
  var read_file = _g67["read-file"];
  var reduce = _g67.reduce;
  var replicate = _g67.replicate;
  var reverse = _g67.reverse;
  var sd = _g67.sd;
  var search = _g67.search;
  var setenv = _g67.setenv;
  var sin = _g67.sin;
  var sinh = _g67.sinh;
  var some63 = _g67["some?"];
  var sort = _g67.sort;
  var splice = _g67.splice;
  var split = _g67.split;
  var sqrt = _g67.sqrt;
  var stash = _g67.stash;
  var string = _g67.string;
  var string_literal63 = _g67["string-literal?"];
  var string63 = _g67["string?"];
  var sub = _g67.sub;
  var sublist = _g67.sublist;
  var substring = _g67.substring;
  var table63 = _g67["table?"];
  var tan = _g67.tan;
  var tanh = _g67.tanh;
  var td = _g67.td;
  var tl = _g67.tl;
  var toplevel63 = _g67["toplevel?"];
  var unstash = _g67.unstash;
  var write = _g67.write;
  var write_file = _g67["write-file"];
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g70 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g71 = undefined;
        var _g72 = _g70;
        var x = undefined;
        for (x in _g72) {
          if (isNaN(parseInt(x))) {
            var _g63 = _g72[x];
            _g71 = x;
          }
        }
        if (_g71) {
          return(b[_g71]);
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
      var _g73;
      if (c === "\n") {
        _g73 = "\\n";
      } else {
        var _g74;
        if (c === "\"") {
          _g74 = "\\\"";
        } else {
          var _g75;
          if (c === "\\") {
            _g75 = "\\\\";
          } else {
            _g75 = c;
          }
          _g74 = _g75;
        }
        _g73 = _g74;
      }
      var c1 = _g73;
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
      var _g76 = args;
      var k = undefined;
      for (k in _g76) {
        if (isNaN(parseInt(k))) {
          var v = _g76[k];
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
        var _g77 = lh;
        var i = 0;
        while (i < length(_g77)) {
          var x = _g77[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g78 = lh;
        var k = undefined;
        for (k in _g78) {
          if (isNaN(parseInt(k))) {
            var v = _g78[k];
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
      var _g79 = args;
      var _g80 = 0;
      while (_g80 < length(_g79)) {
        var arg = _g79[_g80];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g80 = _g80 + 1;
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
          var _g64 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g83 = args;
          var _g84 = 0;
          while (_g84 < length(_g83)) {
            var _g81 = _g83[_g84];
            setenv(_g81, {_stash: true, variable: true});
            _g84 = _g84 + 1;
          }
          var _g82 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g82);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g65 = form[0];
            var name = form[1];
            var _g85 = form[2];
            var _g86 = sub(form, 3);
            add(environment, {_scope: true});
            var _g89 = _g85;
            var _g90 = 0;
            while (_g90 < length(_g89)) {
              var _g87 = _g89[_g90];
              setenv(_g87, {_stash: true, variable: true});
              _g90 = _g90 + 1;
            }
            var _g88 = join([x, name, map(macroexpand, _g85)], macroexpand(_g86));
            drop(environment);
            return(_g88);
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
    var _g91 = form;
    var k = undefined;
    for (k in _g91) {
      if (isNaN(parseInt(k))) {
        var v = _g91[k];
        var _g96;
        if (quasisplice63(v, depth)) {
          _g96 = quasiexpand(v[1]);
        } else {
          _g96 = quasiexpand(v, depth);
        }
        var _g92 = _g96;
        last(xs)[k] = _g92;
      }
    }
    var _g93 = form;
    var _g94 = 0;
    while (_g94 < length(_g93)) {
      var x = _g93[_g94];
      if (quasisplice63(x, depth)) {
        var _g95 = quasiexpand(x[1]);
        add(xs, _g95);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g94 = _g94 + 1;
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
      var _g102;
      if (c === "-") {
        _g102 = "_";
      } else {
        var _g103;
        if (valid_char63(n)) {
          _g103 = c;
        } else {
          var _g104;
          if (i === 0) {
            _g104 = "_" + n;
          } else {
            _g104 = n;
          }
          _g103 = _g104;
        }
        _g102 = _g103;
      }
      var c1 = _g102;
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
    var _g105 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g105.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g106 = module(spec).export;
      var n = undefined;
      for (n in _g106) {
        if (isNaN(parseInt(n))) {
          var b = _g106[n];
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
    var _g107 = module(current_module).export;
    var n = undefined;
    for (n in _g107) {
      if (isNaN(parseInt(n))) {
        var b = _g107[n];
        if (b.variable) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], sortk(exports, td)));
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
    var _g108 = t;
    var k = undefined;
    for (k in _g108) {
      if (isNaN(parseInt(k))) {
        var v = _g108[k];
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
    var _g109 = ["table"];
    _g109.alias = quoted(m.alias);
    _g109.export = quote_frame(m.export);
    _g109.import = quoted(m.import);
    return(_g109);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g110 = nexus["lumen/utilities"];
  _g110.bind = bind;
  _g110["bind*"] = bind42;
  _g110["bound?"] = bound63;
  _g110["can-unquote?"] = can_unquote63;
  _g110.escape = escape;
  _g110.exported = exported;
  _g110.getenv = getenv;
  _g110["global?"] = global63;
  _g110.id = id;
  _g110.imported = imported;
  _g110.indentation = indentation;
  _g110["initial-environment"] = initial_environment;
  _g110["macro-function"] = macro_function;
  _g110["macro?"] = macro63;
  _g110.macroexpand = macroexpand;
  _g110.mapo = mapo;
  _g110["numeric?"] = numeric63;
  _g110.quasiexpand = quasiexpand;
  _g110["quasiquote-list"] = quasiquote_list;
  _g110["quasiquoting?"] = quasiquoting63;
  _g110["quasisplice?"] = quasisplice63;
  _g110["quote-binding"] = quote_binding;
  _g110["quote-environment"] = quote_environment;
  _g110["quote-frame"] = quote_frame;
  _g110["quote-module"] = quote_module;
  _g110["quote-modules"] = quote_modules;
  _g110.quoted = quoted;
  _g110["quoting?"] = quoting63;
  _g110.reserved = reserved;
  _g110["reserved?"] = reserved63;
  _g110.sortk = sortk;
  _g110["special-form?"] = special_form63;
  _g110["special?"] = special63;
  _g110["stash*"] = stash42;
  _g110["statement?"] = statement63;
  _g110["symbol-expansion"] = symbol_expansion;
  _g110["symbol?"] = symbol63;
  _g110["toplevel?"] = toplevel63;
  _g110["valid-char?"] = valid_char63;
  _g110["valid-id?"] = valid_id63;
  _g110["variable?"] = variable63;
})();
(function () {
  nexus["lumen/reader"] = {};
  var _g112 = nexus["lumen/runtime"];
  var _37 = _g112["%"];
  var _37message_handler = _g112["%message-handler"];
  var _42 = _g112["*"];
  var _43 = _g112["+"];
  var _ = _g112["-"];
  var _47 = _g112["/"];
  var _60 = _g112["<"];
  var _6061 = _g112["<="];
  var _61 = _g112["="];
  var _62 = _g112[">"];
  var _6261 = _g112[">="];
  var abs = _g112.abs;
  var acos = _g112.acos;
  var add = _g112.add;
  var apply = _g112.apply;
  var asin = _g112.asin;
  var atan = _g112.atan;
  var atan2 = _g112.atan2;
  var atom63 = _g112["atom?"];
  var boolean63 = _g112["boolean?"];
  var cat = _g112.cat;
  var ceil = _g112.ceil;
  var char = _g112.char;
  var code = _g112.code;
  var composite63 = _g112["composite?"];
  var cos = _g112.cos;
  var drop = _g112.drop;
  var empty63 = _g112["empty?"];
  var exclude = _g112.exclude;
  var exit = _g112.exit;
  var extend = _g112.extend;
  var find = _g112.find;
  var flat = _g112.flat;
  var flat1 = _g112.flat1;
  var floor = _g112.floor;
  var function63 = _g112["function?"];
  var hd = _g112.hd;
  var id_literal63 = _g112["id-literal?"];
  var in63 = _g112["in?"];
  var inner = _g112.inner;
  var is63 = _g112["is?"];
  var iterate = _g112.iterate;
  var join = _g112.join;
  var keep = _g112.keep;
  var keys63 = _g112["keys?"];
  var last = _g112.last;
  var length = _g112.length;
  var list63 = _g112["list?"];
  var log = _g112.log;
  var log10 = _g112.log10;
  var make_id = _g112["make-id"];
  var map = _g112.map;
  var max = _g112.max;
  var min = _g112.min;
  var module = _g112.module;
  var module_key = _g112["module-key"];
  var nil63 = _g112["nil?"];
  var none63 = _g112["none?"];
  var number = _g112.number;
  var number63 = _g112["number?"];
  var pairwise = _g112.pairwise;
  var pow = _g112.pow;
  var random = _g112.random;
  var read_file = _g112["read-file"];
  var reduce = _g112.reduce;
  var replicate = _g112.replicate;
  var reverse = _g112.reverse;
  var sd = _g112.sd;
  var search = _g112.search;
  var setenv = _g112.setenv;
  var sin = _g112.sin;
  var sinh = _g112.sinh;
  var some63 = _g112["some?"];
  var sort = _g112.sort;
  var splice = _g112.splice;
  var split = _g112.split;
  var sqrt = _g112.sqrt;
  var stash = _g112.stash;
  var string = _g112.string;
  var string_literal63 = _g112["string-literal?"];
  var string63 = _g112["string?"];
  var sub = _g112.sub;
  var sublist = _g112.sublist;
  var substring = _g112.substring;
  var table63 = _g112["table?"];
  var tan = _g112.tan;
  var tanh = _g112.tanh;
  var td = _g112.td;
  var tl = _g112.tl;
  var toplevel63 = _g112["toplevel?"];
  var unstash = _g112.unstash;
  var write = _g112.write;
  var write_file = _g112["write-file"];
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
  var _g124 = nexus["lumen/reader"];
  _g124.delimiters = delimiters;
  _g124.eof = eof;
  _g124["flag?"] = flag63;
  _g124["key?"] = key63;
  _g124["make-stream"] = make_stream;
  _g124["peek-char"] = peek_char;
  _g124.read = read;
  _g124["read-all"] = read_all;
  _g124["read-char"] = read_char;
  _g124["read-from-string"] = read_from_string;
  _g124["read-table"] = read_table;
  _g124["skip-non-code"] = skip_non_code;
  _g124.whitespace = whitespace;
})();
(function () {
  nexus["lumen/compiler"] = {};
  var _g126 = nexus["lumen/utilities"];
  var bind = _g126.bind;
  var bind42 = _g126["bind*"];
  var bound63 = _g126["bound?"];
  var exported = _g126.exported;
  var getenv = _g126.getenv;
  var id = _g126.id;
  var imported = _g126.imported;
  var indentation = _g126.indentation;
  var initial_environment = _g126["initial-environment"];
  var macro_function = _g126["macro-function"];
  var macro63 = _g126["macro?"];
  var macroexpand = _g126.macroexpand;
  var mapo = _g126.mapo;
  var quasiexpand = _g126.quasiexpand;
  var quote_environment = _g126["quote-environment"];
  var quote_modules = _g126["quote-modules"];
  var quoted = _g126.quoted;
  var reserved63 = _g126["reserved?"];
  var sortk = _g126.sortk;
  var special_form63 = _g126["special-form?"];
  var special63 = _g126["special?"];
  var stash42 = _g126["stash*"];
  var statement63 = _g126["statement?"];
  var symbol_expansion = _g126["symbol-expansion"];
  var symbol63 = _g126["symbol?"];
  var toplevel63 = _g126["toplevel?"];
  var valid_id63 = _g126["valid-id?"];
  var variable63 = _g126["variable?"];
  var _g127 = nexus["lumen/reader"];
  var make_stream = _g127["make-stream"];
  var read = _g127.read;
  var read_all = _g127["read-all"];
  var read_from_string = _g127["read-from-string"];
  var read_table = _g127["read-table"];
  var _g128 = nexus["lumen/runtime"];
  var _37 = _g128["%"];
  var _37message_handler = _g128["%message-handler"];
  var _42 = _g128["*"];
  var _43 = _g128["+"];
  var _ = _g128["-"];
  var _47 = _g128["/"];
  var _60 = _g128["<"];
  var _6061 = _g128["<="];
  var _61 = _g128["="];
  var _62 = _g128[">"];
  var _6261 = _g128[">="];
  var abs = _g128.abs;
  var acos = _g128.acos;
  var add = _g128.add;
  var apply = _g128.apply;
  var asin = _g128.asin;
  var atan = _g128.atan;
  var atan2 = _g128.atan2;
  var atom63 = _g128["atom?"];
  var boolean63 = _g128["boolean?"];
  var cat = _g128.cat;
  var ceil = _g128.ceil;
  var char = _g128.char;
  var code = _g128.code;
  var composite63 = _g128["composite?"];
  var cos = _g128.cos;
  var drop = _g128.drop;
  var empty63 = _g128["empty?"];
  var exclude = _g128.exclude;
  var exit = _g128.exit;
  var extend = _g128.extend;
  var find = _g128.find;
  var flat = _g128.flat;
  var flat1 = _g128.flat1;
  var floor = _g128.floor;
  var function63 = _g128["function?"];
  var hd = _g128.hd;
  var id_literal63 = _g128["id-literal?"];
  var in63 = _g128["in?"];
  var inner = _g128.inner;
  var is63 = _g128["is?"];
  var iterate = _g128.iterate;
  var join = _g128.join;
  var keep = _g128.keep;
  var keys63 = _g128["keys?"];
  var last = _g128.last;
  var length = _g128.length;
  var list63 = _g128["list?"];
  var log = _g128.log;
  var log10 = _g128.log10;
  var make_id = _g128["make-id"];
  var map = _g128.map;
  var max = _g128.max;
  var min = _g128.min;
  var module = _g128.module;
  var module_key = _g128["module-key"];
  var nil63 = _g128["nil?"];
  var none63 = _g128["none?"];
  var number = _g128.number;
  var number63 = _g128["number?"];
  var pairwise = _g128.pairwise;
  var pow = _g128.pow;
  var random = _g128.random;
  var read_file = _g128["read-file"];
  var reduce = _g128.reduce;
  var replicate = _g128.replicate;
  var reverse = _g128.reverse;
  var sd = _g128.sd;
  var search = _g128.search;
  var setenv = _g128.setenv;
  var sin = _g128.sin;
  var sinh = _g128.sinh;
  var some63 = _g128["some?"];
  var sort = _g128.sort;
  var splice = _g128.splice;
  var split = _g128.split;
  var sqrt = _g128.sqrt;
  var stash = _g128.stash;
  var string = _g128.string;
  var string_literal63 = _g128["string-literal?"];
  var string63 = _g128["string?"];
  var sub = _g128.sub;
  var sublist = _g128.sublist;
  var substring = _g128.substring;
  var table63 = _g128["table?"];
  var tan = _g128.tan;
  var tanh = _g128.tanh;
  var td = _g128.td;
  var tl = _g128.tl;
  var toplevel63 = _g128["toplevel?"];
  var unstash = _g128.unstash;
  var write = _g128.write;
  var write_file = _g128["write-file"];
  var _g134 = [];
  _g134.js = "!";
  _g134.lua = "not ";
  var _g132 = [];
  var _g135 = [];
  _g135.js = "!";
  _g135.lua = "not ";
  _g132["not"] = _g135;
  var _g137 = [];
  _g137["%"] = true;
  _g137["*"] = true;
  _g137["/"] = true;
  var _g139 = [];
  _g139["+"] = true;
  _g139["-"] = true;
  var _g143 = [];
  _g143.js = "+";
  _g143.lua = "..";
  var _g141 = [];
  var _g144 = [];
  _g144.js = "+";
  _g144.lua = "..";
  _g141.cat = _g144;
  var _g146 = [];
  _g146["<"] = true;
  _g146["<="] = true;
  _g146[">"] = true;
  _g146[">="] = true;
  var _g150 = [];
  _g150.js = "===";
  _g150.lua = "==";
  var _g152 = [];
  _g152.js = "!=";
  _g152.lua = "~=";
  var _g148 = [];
  var _g153 = [];
  _g153.js = "===";
  _g153.lua = "==";
  _g148["="] = _g153;
  var _g154 = [];
  _g154.js = "!=";
  _g154.lua = "~=";
  _g148["~="] = _g154;
  var _g158 = [];
  _g158.js = "&&";
  _g158.lua = "and";
  var _g156 = [];
  var _g159 = [];
  _g159.js = "&&";
  _g159.lua = "and";
  _g156["and"] = _g159;
  var _g163 = [];
  _g163.js = "||";
  _g163.lua = "or";
  var _g161 = [];
  var _g164 = [];
  _g164.js = "||";
  _g164.lua = "or";
  _g161["or"] = _g164;
  var infix = [_g132, _g137, _g139, _g141, _g146, _g148, _g156, _g161];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g165 = infix;
      var i = 0;
      while (i < length(_g165)) {
        var level = _g165[i];
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
    var _g166 = args;
    var i = 0;
    while (i < length(_g166)) {
      var arg = _g166[i];
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
    var _g167 = getenv(x);
    var self_tr63 = _g167.tr;
    var special = _g167.special;
    var stmt = _g167.stmt;
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
    var _g168 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g168.right;
    var _g169;
    if (right) {
      _g169 = _6261;
    } else {
      _g169 = _62;
    }
    if (_g169(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g170 = sub(form, 1);
    var a = _g170[0];
    var b = _g170[1];
    var _g171 = op_delims(form, a);
    var ao = _g171[0];
    var ac = _g171[1];
    var _g172 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g172[0];
    var bc = _g172[1];
    var _g173 = compile(a);
    var _g174 = compile(b);
    var _g175 = getop(op);
    if (unary63(form)) {
      return(_g175 + ao + _g173 + ac);
    } else {
      return(ao + _g173 + ac + " " + _g175 + " " + bo + _g174 + bc);
    }
  }
  function compile_function(args, body) {
    var _g176 = unstash(Array.prototype.slice.call(arguments, 2));
    var prefix = _g176.prefix;
    var name = _g176.name;
    var _g181;
    if (name) {
      _g181 = compile(name);
    } else {
      _g181 = "";
    }
    var id = _g181;
    var _g177 = prefix || "";
    var _g178 = compile_args(args);
    indent_level = indent_level + 1;
    var _g180 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g179 = _g180;
    var ind = indentation();
    var _g182;
    if (target === "js") {
      _g182 = "";
    } else {
      _g182 = "end";
    }
    var tr = _g182;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g178 + " {\n" + _g179 + ind + "}" + tr);
    } else {
      return(_g177 + "function " + id + _g178 + "\n" + _g179 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g183 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g183.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g185;
        if (stmt) {
          _g185 = indentation();
        } else {
          _g185 = "";
        }
        var ind = _g185;
        var _g186;
        if (atom63(form)) {
          _g186 = compile_atom(form);
        } else {
          var _g187;
          if (infix63(hd(form))) {
            _g187 = compile_infix(form);
          } else {
            _g187 = compile_call(form);
          }
          _g186 = _g187;
        }
        var _g184 = _g186;
        return(ind + _g184 + tr);
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
    var _g188 = sub(args, 0, length(args) - 1);
    var _g189 = 0;
    while (_g189 < length(_g188)) {
      var x = _g188[_g189];
      add(hoist, lower(x, hoist, stmt63));
      _g189 = _g189 + 1;
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
    var _g190 = args[1];
    var _g191 = args[2];
    if (stmt63 || tail63) {
      var _g193;
      if (_g191) {
        _g193 = [lower_body([_g191], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g190], tail63)], _g193)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g192;
      if (_g191) {
        _g192 = [lower(["set", e, _g191])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g190])], _g192));
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
      var _g194;
      if (x === "and") {
        _g194 = ["%if", id, b, id];
      } else {
        _g194 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g194], hoist));
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
    var _g195 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g195, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g196 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g196)) {
      return(_g196);
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
    var _g197 = map(process, body);
    var epilogue = map(process, exported());
    return([["%function", [], join(["do"], join(_g197, epilogue))]]);
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
    var _g198 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g198.all;
    var m = module(spec);
    var frame = last(environment);
    var _g199 = m.export;
    var k = undefined;
    for (k in _g199) {
      if (isNaN(parseInt(k))) {
        var v = _g199[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g200 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g200.all;
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
  var _g201 = nexus["lumen/compiler"];
  _g201["%compile-module"] = _37compile_module;
  _g201["can-return?"] = can_return63;
  _g201.compile = compile;
  _g201["compile-args"] = compile_args;
  _g201["compile-atom"] = compile_atom;
  _g201["compile-call"] = compile_call;
  _g201["compile-file"] = compile_file;
  _g201["compile-function"] = compile_function;
  _g201["compile-infix"] = compile_infix;
  _g201["compile-module"] = compile_module;
  _g201["compile-special"] = compile_special;
  _g201["compiler-output"] = compiler_output;
  _g201["compiling?"] = compiling63;
  _g201.conclude = conclude;
  _g201.declare = declare;
  _g201.encapsulate = encapsulate;
  _g201.eval = eval;
  _g201.getop = getop;
  _g201["in-module"] = in_module;
  _g201.infix = infix;
  _g201["infix?"] = infix63;
  _g201["load-module"] = load_module;
  _g201.lower = lower;
  _g201["lower-body"] = lower_body;
  _g201["lower-call"] = lower_call;
  _g201["lower-definition"] = lower_definition;
  _g201["lower-do"] = lower_do;
  _g201["lower-for"] = lower_for;
  _g201["lower-function"] = lower_function;
  _g201["lower-if"] = lower_if;
  _g201["lower-infix"] = lower_infix;
  _g201["lower-infix?"] = lower_infix63;
  _g201["lower-short"] = lower_short;
  _g201["lower-special"] = lower_special;
  _g201["lower-statement"] = lower_statement;
  _g201["lower-try"] = lower_try;
  _g201["lower-while"] = lower_while;
  _g201["module-path"] = module_path;
  _g201["op-delims"] = op_delims;
  _g201["open-module"] = open_module;
  _g201["parenthesize-call?"] = parenthesize_call63;
  _g201.precedence = precedence;
  _g201.process = process;
  _g201.reimported = reimported;
  _g201.run = run;
  _g201.terminator = terminator;
  _g201["unary?"] = unary63;
})();
(function () {
  nexus["lumen/special"] = {};
  var _g203 = nexus["lumen/utilities"];
  var bind = _g203.bind;
  var bind42 = _g203["bind*"];
  var bound63 = _g203["bound?"];
  var exported = _g203.exported;
  var getenv = _g203.getenv;
  var id = _g203.id;
  var imported = _g203.imported;
  var indentation = _g203.indentation;
  var initial_environment = _g203["initial-environment"];
  var macro_function = _g203["macro-function"];
  var macro63 = _g203["macro?"];
  var macroexpand = _g203.macroexpand;
  var mapo = _g203.mapo;
  var quasiexpand = _g203.quasiexpand;
  var quote_environment = _g203["quote-environment"];
  var quote_modules = _g203["quote-modules"];
  var quoted = _g203.quoted;
  var reserved63 = _g203["reserved?"];
  var sortk = _g203.sortk;
  var special_form63 = _g203["special-form?"];
  var special63 = _g203["special?"];
  var stash42 = _g203["stash*"];
  var statement63 = _g203["statement?"];
  var symbol_expansion = _g203["symbol-expansion"];
  var symbol63 = _g203["symbol?"];
  var toplevel63 = _g203["toplevel?"];
  var valid_id63 = _g203["valid-id?"];
  var variable63 = _g203["variable?"];
  var _g204 = nexus["lumen/compiler"];
  var compile = _g204.compile;
  var compile_function = _g204["compile-function"];
  var compile_module = _g204["compile-module"];
  var declare = _g204.declare;
  var eval = _g204.eval;
  var in_module = _g204["in-module"];
  var load_module = _g204["load-module"];
  var open_module = _g204["open-module"];
  var _g205 = nexus["lumen/runtime"];
  var _37 = _g205["%"];
  var _37message_handler = _g205["%message-handler"];
  var _42 = _g205["*"];
  var _43 = _g205["+"];
  var _ = _g205["-"];
  var _47 = _g205["/"];
  var _60 = _g205["<"];
  var _6061 = _g205["<="];
  var _61 = _g205["="];
  var _62 = _g205[">"];
  var _6261 = _g205[">="];
  var abs = _g205.abs;
  var acos = _g205.acos;
  var add = _g205.add;
  var apply = _g205.apply;
  var asin = _g205.asin;
  var atan = _g205.atan;
  var atan2 = _g205.atan2;
  var atom63 = _g205["atom?"];
  var boolean63 = _g205["boolean?"];
  var cat = _g205.cat;
  var ceil = _g205.ceil;
  var char = _g205.char;
  var code = _g205.code;
  var composite63 = _g205["composite?"];
  var cos = _g205.cos;
  var drop = _g205.drop;
  var empty63 = _g205["empty?"];
  var exclude = _g205.exclude;
  var exit = _g205.exit;
  var extend = _g205.extend;
  var find = _g205.find;
  var flat = _g205.flat;
  var flat1 = _g205.flat1;
  var floor = _g205.floor;
  var function63 = _g205["function?"];
  var hd = _g205.hd;
  var id_literal63 = _g205["id-literal?"];
  var in63 = _g205["in?"];
  var inner = _g205.inner;
  var is63 = _g205["is?"];
  var iterate = _g205.iterate;
  var join = _g205.join;
  var keep = _g205.keep;
  var keys63 = _g205["keys?"];
  var last = _g205.last;
  var length = _g205.length;
  var list63 = _g205["list?"];
  var log = _g205.log;
  var log10 = _g205.log10;
  var make_id = _g205["make-id"];
  var map = _g205.map;
  var max = _g205.max;
  var min = _g205.min;
  var module = _g205.module;
  var module_key = _g205["module-key"];
  var nil63 = _g205["nil?"];
  var none63 = _g205["none?"];
  var number = _g205.number;
  var number63 = _g205["number?"];
  var pairwise = _g205.pairwise;
  var pow = _g205.pow;
  var random = _g205.random;
  var read_file = _g205["read-file"];
  var reduce = _g205.reduce;
  var replicate = _g205.replicate;
  var reverse = _g205.reverse;
  var sd = _g205.sd;
  var search = _g205.search;
  var setenv = _g205.setenv;
  var sin = _g205.sin;
  var sinh = _g205.sinh;
  var some63 = _g205["some?"];
  var sort = _g205.sort;
  var splice = _g205.splice;
  var split = _g205.split;
  var sqrt = _g205.sqrt;
  var stash = _g205.stash;
  var string = _g205.string;
  var string_literal63 = _g205["string-literal?"];
  var string63 = _g205["string?"];
  var sub = _g205.sub;
  var sublist = _g205.sublist;
  var substring = _g205.substring;
  var table63 = _g205["table?"];
  var tan = _g205.tan;
  var tanh = _g205.tanh;
  var td = _g205.td;
  var tl = _g205.tl;
  var toplevel63 = _g205["toplevel?"];
  var unstash = _g205.unstash;
  var write = _g205.write;
  var write_file = _g205["write-file"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g405 = nexus["lumen/utilities"];
  var bind = _g405.bind;
  var bind42 = _g405["bind*"];
  var bound63 = _g405["bound?"];
  var exported = _g405.exported;
  var getenv = _g405.getenv;
  var id = _g405.id;
  var imported = _g405.imported;
  var indentation = _g405.indentation;
  var initial_environment = _g405["initial-environment"];
  var macro_function = _g405["macro-function"];
  var macro63 = _g405["macro?"];
  var macroexpand = _g405.macroexpand;
  var mapo = _g405.mapo;
  var quasiexpand = _g405.quasiexpand;
  var quote_environment = _g405["quote-environment"];
  var quote_modules = _g405["quote-modules"];
  var quoted = _g405.quoted;
  var reserved63 = _g405["reserved?"];
  var sortk = _g405.sortk;
  var special_form63 = _g405["special-form?"];
  var special63 = _g405["special?"];
  var stash42 = _g405["stash*"];
  var statement63 = _g405["statement?"];
  var symbol_expansion = _g405["symbol-expansion"];
  var symbol63 = _g405["symbol?"];
  var toplevel63 = _g405["toplevel?"];
  var valid_id63 = _g405["valid-id?"];
  var variable63 = _g405["variable?"];
  var _g406 = nexus["lumen/compiler"];
  var compile = _g406.compile;
  var compile_function = _g406["compile-function"];
  var compile_module = _g406["compile-module"];
  var declare = _g406.declare;
  var eval = _g406.eval;
  var in_module = _g406["in-module"];
  var load_module = _g406["load-module"];
  var open_module = _g406["open-module"];
  var _g407 = nexus["lumen/runtime"];
  var _37 = _g407["%"];
  var _37message_handler = _g407["%message-handler"];
  var _42 = _g407["*"];
  var _43 = _g407["+"];
  var _ = _g407["-"];
  var _47 = _g407["/"];
  var _60 = _g407["<"];
  var _6061 = _g407["<="];
  var _61 = _g407["="];
  var _62 = _g407[">"];
  var _6261 = _g407[">="];
  var abs = _g407.abs;
  var acos = _g407.acos;
  var add = _g407.add;
  var apply = _g407.apply;
  var asin = _g407.asin;
  var atan = _g407.atan;
  var atan2 = _g407.atan2;
  var atom63 = _g407["atom?"];
  var boolean63 = _g407["boolean?"];
  var cat = _g407.cat;
  var ceil = _g407.ceil;
  var char = _g407.char;
  var code = _g407.code;
  var composite63 = _g407["composite?"];
  var cos = _g407.cos;
  var drop = _g407.drop;
  var empty63 = _g407["empty?"];
  var exclude = _g407.exclude;
  var exit = _g407.exit;
  var extend = _g407.extend;
  var find = _g407.find;
  var flat = _g407.flat;
  var flat1 = _g407.flat1;
  var floor = _g407.floor;
  var function63 = _g407["function?"];
  var hd = _g407.hd;
  var id_literal63 = _g407["id-literal?"];
  var in63 = _g407["in?"];
  var inner = _g407.inner;
  var is63 = _g407["is?"];
  var iterate = _g407.iterate;
  var join = _g407.join;
  var keep = _g407.keep;
  var keys63 = _g407["keys?"];
  var last = _g407.last;
  var length = _g407.length;
  var list63 = _g407["list?"];
  var log = _g407.log;
  var log10 = _g407.log10;
  var make_id = _g407["make-id"];
  var map = _g407.map;
  var max = _g407.max;
  var min = _g407.min;
  var module = _g407.module;
  var module_key = _g407["module-key"];
  var nil63 = _g407["nil?"];
  var none63 = _g407["none?"];
  var number = _g407.number;
  var number63 = _g407["number?"];
  var pairwise = _g407.pairwise;
  var pow = _g407.pow;
  var random = _g407.random;
  var read_file = _g407["read-file"];
  var reduce = _g407.reduce;
  var replicate = _g407.replicate;
  var reverse = _g407.reverse;
  var sd = _g407.sd;
  var search = _g407.search;
  var setenv = _g407.setenv;
  var sin = _g407.sin;
  var sinh = _g407.sinh;
  var some63 = _g407["some?"];
  var sort = _g407.sort;
  var splice = _g407.splice;
  var split = _g407.split;
  var sqrt = _g407.sqrt;
  var stash = _g407.stash;
  var string = _g407.string;
  var string_literal63 = _g407["string-literal?"];
  var string63 = _g407["string?"];
  var sub = _g407.sub;
  var sublist = _g407.sublist;
  var substring = _g407.substring;
  var table63 = _g407["table?"];
  var tan = _g407.tan;
  var tanh = _g407.tanh;
  var td = _g407.td;
  var tl = _g407.tl;
  var toplevel63 = _g407["toplevel?"];
  var unstash = _g407.unstash;
  var write = _g407.write;
  var write_file = _g407["write-file"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g739 = nexus["lumen/utilities"];
  var bind = _g739.bind;
  var bind42 = _g739["bind*"];
  var bound63 = _g739["bound?"];
  var exported = _g739.exported;
  var getenv = _g739.getenv;
  var id = _g739.id;
  var imported = _g739.imported;
  var indentation = _g739.indentation;
  var initial_environment = _g739["initial-environment"];
  var macro_function = _g739["macro-function"];
  var macro63 = _g739["macro?"];
  var macroexpand = _g739.macroexpand;
  var mapo = _g739.mapo;
  var quasiexpand = _g739.quasiexpand;
  var quote_environment = _g739["quote-environment"];
  var quote_modules = _g739["quote-modules"];
  var quoted = _g739.quoted;
  var reserved63 = _g739["reserved?"];
  var sortk = _g739.sortk;
  var special_form63 = _g739["special-form?"];
  var special63 = _g739["special?"];
  var stash42 = _g739["stash*"];
  var statement63 = _g739["statement?"];
  var symbol_expansion = _g739["symbol-expansion"];
  var symbol63 = _g739["symbol?"];
  var toplevel63 = _g739["toplevel?"];
  var valid_id63 = _g739["valid-id?"];
  var variable63 = _g739["variable?"];
  var _g740 = nexus["lumen/compiler"];
  var compile = _g740.compile;
  var compile_function = _g740["compile-function"];
  var compile_module = _g740["compile-module"];
  var declare = _g740.declare;
  var eval = _g740.eval;
  var in_module = _g740["in-module"];
  var load_module = _g740["load-module"];
  var open_module = _g740["open-module"];
  var _g741 = nexus["lumen/runtime"];
  var _37 = _g741["%"];
  var _37message_handler = _g741["%message-handler"];
  var _42 = _g741["*"];
  var _43 = _g741["+"];
  var _ = _g741["-"];
  var _47 = _g741["/"];
  var _60 = _g741["<"];
  var _6061 = _g741["<="];
  var _61 = _g741["="];
  var _62 = _g741[">"];
  var _6261 = _g741[">="];
  var abs = _g741.abs;
  var acos = _g741.acos;
  var add = _g741.add;
  var apply = _g741.apply;
  var asin = _g741.asin;
  var atan = _g741.atan;
  var atan2 = _g741.atan2;
  var atom63 = _g741["atom?"];
  var boolean63 = _g741["boolean?"];
  var cat = _g741.cat;
  var ceil = _g741.ceil;
  var char = _g741.char;
  var code = _g741.code;
  var composite63 = _g741["composite?"];
  var cos = _g741.cos;
  var drop = _g741.drop;
  var empty63 = _g741["empty?"];
  var exclude = _g741.exclude;
  var exit = _g741.exit;
  var extend = _g741.extend;
  var find = _g741.find;
  var flat = _g741.flat;
  var flat1 = _g741.flat1;
  var floor = _g741.floor;
  var function63 = _g741["function?"];
  var hd = _g741.hd;
  var id_literal63 = _g741["id-literal?"];
  var in63 = _g741["in?"];
  var inner = _g741.inner;
  var is63 = _g741["is?"];
  var iterate = _g741.iterate;
  var join = _g741.join;
  var keep = _g741.keep;
  var keys63 = _g741["keys?"];
  var last = _g741.last;
  var length = _g741.length;
  var list63 = _g741["list?"];
  var log = _g741.log;
  var log10 = _g741.log10;
  var make_id = _g741["make-id"];
  var map = _g741.map;
  var max = _g741.max;
  var min = _g741.min;
  var module = _g741.module;
  var module_key = _g741["module-key"];
  var nil63 = _g741["nil?"];
  var none63 = _g741["none?"];
  var number = _g741.number;
  var number63 = _g741["number?"];
  var pairwise = _g741.pairwise;
  var pow = _g741.pow;
  var random = _g741.random;
  var read_file = _g741["read-file"];
  var reduce = _g741.reduce;
  var replicate = _g741.replicate;
  var reverse = _g741.reverse;
  var sd = _g741.sd;
  var search = _g741.search;
  var setenv = _g741.setenv;
  var sin = _g741.sin;
  var sinh = _g741.sinh;
  var some63 = _g741["some?"];
  var sort = _g741.sort;
  var splice = _g741.splice;
  var split = _g741.split;
  var sqrt = _g741.sqrt;
  var stash = _g741.stash;
  var string = _g741.string;
  var string_literal63 = _g741["string-literal?"];
  var string63 = _g741["string?"];
  var sub = _g741.sub;
  var sublist = _g741.sublist;
  var substring = _g741.substring;
  var table63 = _g741["table?"];
  var tan = _g741.tan;
  var tanh = _g741.tanh;
  var td = _g741.td;
  var tl = _g741.tl;
  var toplevel63 = _g741["toplevel?"];
  var unstash = _g741.unstash;
  var write = _g741.write;
  var write_file = _g741["write-file"];
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
    var _g800 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g800)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g796 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g796)) {
      var _g797 = bind42(x, _g796);
      var args = _g797[0];
      var _g798 = _g797[1];
      return(join(["%local-function", name, args], _g798));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g814 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g814)) {
      var _g815 = bind42(x, _g814);
      var args = _g815[0];
      var _g816 = _g815[1];
      return(join(["%global-function", name, args], _g816));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g802 = sub(body, 0);
    var form = join(["fn", args], _g802);
    var _g803 = ["setenv", ["quote", name]];
    _g803.form = ["quote", form];
    _g803.macro = form;
    eval(_g803);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g804 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g804.export;
    var imp = _g804.import;
    var alias = _g804.alias;
    var _g805 = imp || [];
    var _g806 = 0;
    while (_g806 < length(_g805)) {
      var k = _g805[_g806];
      load_module(k);
      var _g807 = module(k).alias || [];
      var _g808 = 0;
      while (_g808 < length(_g807)) {
        var a = _g807[_g808];
        add(imp, a);
        _g808 = _g808 + 1;
      }
      imports = join(imports, imported(k));
      _g806 = _g806 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g809 = exp || [];
    var _g810 = 0;
    while (_g810 < length(_g809)) {
      var k = _g809[_g810];
      setenv(k, {_stash: true, export: true});
      _g810 = _g810 + 1;
    }
    var k = module_key(current_module);
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g827 = sub(body, 0);
    var form = join(["fn", args], _g827);
    var keys = sub(_g827, length(_g827));
    var _g828 = ["setenv", ["quote", name]];
    _g828.form = ["quote", form];
    _g828.special = form;
    eval(join(_g828, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g812 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g843;
    if (nil63(v)) {
      var _g844;
      if (b.i) {
        _g844 = "i";
      } else {
        _g844 = make_id();
      }
      var i = _g844;
      _g843 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g812), ["inc", i]]];
    } else {
      var _g813 = ["target"];
      _g813.js = ["isNaN", ["parseInt", k]];
      _g813.lua = ["not", ["number?", k]];
      _g843 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g813, join(["let", [v, ["get", t1, k]]], _g812)]]];
    }
    return(["let", [t1, t], _g843]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g786 = sub(body, 0);
    var _g787 = bind42(args, _g786);
    var _g788 = _g787[0];
    var _g789 = _g787[1];
    return(join(["%function", _g788], _g789));
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
    function step(_g790) {
      var a = _g790[0];
      var b = _g790[1];
      var c = sub(_g790, 2);
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
    var _g829 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g829)]);
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
    var _g820 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g821 = join(["do"], macroexpand(_g820));
    drop(environment);
    return(_g821);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g817 = sub(body, 0);
    add(environment, {});
    map(function (_g819) {
      var name = _g819[0];
      var exp = _g819[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g818 = join(["do"], macroexpand(_g817));
    drop(environment);
    return(_g818);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g811 = body;
      var k = undefined;
      for (k in _g811) {
        if (isNaN(parseInt(k))) {
          var v = _g811[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g799 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g799)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g791 = elements;
    var _g792 = 0;
    while (_g792 < length(_g791)) {
      var e = _g791[_g792];
      l[e] = true;
      _g792 = _g792 + 1;
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
    var _g801 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g801)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g795 = sub(body, 0);
    return(["if", cond, join(["do"], _g795)]);
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
    var _g793 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g794 = ["table"];
    _g794._scope = scope;
    return(["do", ["add", "environment", _g794], ["let", [x, join(["do"], _g793)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["user"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g758) {
    var char = _g758[0];
    var stream = _g758[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g759 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g759)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g830;
    if (target === "lua") {
      _g830 = "{";
    } else {
      _g830 = "[";
    }
    var open = _g830;
    var _g831;
    if (target === "lua") {
      _g831 = "}";
    } else {
      _g831 = "]";
    }
    var close = _g831;
    var str = "";
    var _g760 = forms;
    var i = 0;
    while (i < length(_g760)) {
      var x = _g760[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g766 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g767 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g767;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g766 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g766 + ") {\n" + body + ind + "}\n");
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
    var _g768 = compile(cond);
    indent_level = indent_level + 1;
    var _g771 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g769 = _g771;
    var _g838;
    if (alt) {
      indent_level = indent_level + 1;
      var _g772 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g838 = _g772;
    }
    var _g770 = _g838;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g768 + ") {\n" + _g769 + ind + "}";
    } else {
      str = str + ind + "if " + _g768 + " then\n" + _g769;
    }
    if (_g770 && target === "js") {
      str = str + " else {\n" + _g770 + ind + "}";
    } else {
      if (_g770) {
        str = str + ind + "else\n" + _g770;
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
    var _g840;
    if (is63(value)) {
      _g840 = " = " + value1;
    } else {
      _g840 = "";
    }
    var rh = _g840;
    var _g841;
    if (target === "js") {
      _g841 = "var ";
    } else {
      _g841 = "local ";
    }
    var keyword = _g841;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g832;
    if (target === "lua") {
      _g832 = " = ";
    } else {
      _g832 = ": ";
    }
    var sep = _g832;
    var pairs = sortk(pairwise(forms), hd);
    var _g761 = pairs;
    var i = 0;
    while (i < length(_g761)) {
      var _g762 = _g761[i];
      var k = _g762[0];
      var v = _g762[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g763 = compile(v);
      var _g833;
      if (valid_id63(k)) {
        _g833 = k;
      } else {
        var _g834;
        if (target === "js" && string_literal63(k)) {
          _g834 = k;
        } else {
          var _g835;
          if (target === "js") {
            _g835 = quoted(k);
          } else {
            var _g836;
            if (string_literal63(k)) {
              _g836 = "[" + k + "]";
            } else {
              _g836 = "[" + quoted(k) + "]";
            }
            _g835 = _g836;
          }
          _g834 = _g835;
        }
        _g833 = _g834;
      }
      var _g764 = _g833;
      str = str + _g764 + sep + _g763;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g780 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g780;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g781 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g781;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g778 = forms;
    var _g779 = 0;
    while (_g779 < length(_g778)) {
      var x = _g778[_g779];
      str = str + compile(x, {_stash: true, stmt: true});
      _g779 = _g779 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g842;
    if (target === "js") {
      _g842 = "throw new " + compile(["Error", x]);
    } else {
      _g842 = "error(" + compile(x) + ")";
    }
    var e = _g842;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g777 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g777, 0) === "{") {
      _g777 = "(" + _g777 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g777 + "." + inner(k));
    } else {
      return(_g777 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g837;
    if (nil63(x)) {
      _g837 = "return";
    } else {
      _g837 = "return(" + compile(x) + ")";
    }
    var _g765 = _g837;
    return(indentation() + _g765);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g773 = compile(lh);
    var _g839;
    if (nil63(rh)) {
      _g839 = "nil";
    } else {
      _g839 = rh;
    }
    var _g774 = compile(_g839);
    return(indentation() + _g773 + " = " + _g774);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g775 = compile(cond);
    indent_level = indent_level + 1;
    var _g776 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g776;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g775 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g775 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, exported: {export: true, variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g845 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g845.export;
    var imp = _g845.import;
    var alias = _g845.alias;
    var _g846 = imp || [];
    var _g847 = 0;
    while (_g847 < length(_g846)) {
      var k = _g846[_g847];
      load_module(k);
      var _g848 = module(k).alias || [];
      var _g849 = 0;
      while (_g849 < length(_g848)) {
        var a = _g848[_g849];
        add(imp, a);
        _g849 = _g849 + 1;
      }
      imports = join(imports, imported(k));
      _g847 = _g847 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g850 = exp || [];
    var _g851 = 0;
    while (_g851 < length(_g850)) {
      var k = _g850[_g851];
      setenv(k, {_stash: true, export: true});
      _g851 = _g851 + 1;
    }
    var k = module_key(current_module);
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], imports));
  }}}];
})();
(function () {
  nexus["lumen/main"] = {};
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
  var _g6 = nexus["lumen/runtime"];
  var _37 = _g6["%"];
  var _37message_handler = _g6["%message-handler"];
  var _42 = _g6["*"];
  var _43 = _g6["+"];
  var _ = _g6["-"];
  var _47 = _g6["/"];
  var _60 = _g6["<"];
  var _6061 = _g6["<="];
  var _61 = _g6["="];
  var _62 = _g6[">"];
  var _6261 = _g6[">="];
  var abs = _g6.abs;
  var acos = _g6.acos;
  var add = _g6.add;
  var apply = _g6.apply;
  var asin = _g6.asin;
  var atan = _g6.atan;
  var atan2 = _g6.atan2;
  var atom63 = _g6["atom?"];
  var boolean63 = _g6["boolean?"];
  var cat = _g6.cat;
  var ceil = _g6.ceil;
  var char = _g6.char;
  var code = _g6.code;
  var composite63 = _g6["composite?"];
  var cos = _g6.cos;
  var drop = _g6.drop;
  var empty63 = _g6["empty?"];
  var exclude = _g6.exclude;
  var exit = _g6.exit;
  var extend = _g6.extend;
  var find = _g6.find;
  var flat = _g6.flat;
  var flat1 = _g6.flat1;
  var floor = _g6.floor;
  var function63 = _g6["function?"];
  var hd = _g6.hd;
  var id_literal63 = _g6["id-literal?"];
  var in63 = _g6["in?"];
  var inner = _g6.inner;
  var is63 = _g6["is?"];
  var iterate = _g6.iterate;
  var join = _g6.join;
  var keep = _g6.keep;
  var keys63 = _g6["keys?"];
  var last = _g6.last;
  var length = _g6.length;
  var list63 = _g6["list?"];
  var log = _g6.log;
  var log10 = _g6.log10;
  var make_id = _g6["make-id"];
  var map = _g6.map;
  var max = _g6.max;
  var min = _g6.min;
  var module = _g6.module;
  var module_key = _g6["module-key"];
  var nil63 = _g6["nil?"];
  var none63 = _g6["none?"];
  var number = _g6.number;
  var number63 = _g6["number?"];
  var pairwise = _g6.pairwise;
  var pow = _g6.pow;
  var random = _g6.random;
  var read_file = _g6["read-file"];
  var reduce = _g6.reduce;
  var replicate = _g6.replicate;
  var reverse = _g6.reverse;
  var sd = _g6.sd;
  var search = _g6.search;
  var setenv = _g6.setenv;
  var sin = _g6.sin;
  var sinh = _g6.sinh;
  var some63 = _g6["some?"];
  var sort = _g6.sort;
  var splice = _g6.splice;
  var split = _g6.split;
  var sqrt = _g6.sqrt;
  var stash = _g6.stash;
  var string = _g6.string;
  var string_literal63 = _g6["string-literal?"];
  var string63 = _g6["string?"];
  var sub = _g6.sub;
  var sublist = _g6.sublist;
  var substring = _g6.substring;
  var table63 = _g6["table?"];
  var tan = _g6.tan;
  var tanh = _g6.tanh;
  var td = _g6.td;
  var tl = _g6.tl;
  var toplevel63 = _g6["toplevel?"];
  var unstash = _g6.unstash;
  var write = _g6.write;
  var write_file = _g6["write-file"];
  function rep(str) {
    var _g853 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g856) {
        return([false, _g856.message]);
      }
    })();
    var _g1 = _g853[0];
    var x = _g853[1];
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
    var _g854 = args;
    var i = 0;
    while (i < length(_g854)) {
      var arg = _g854[i];
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
      in_module(spec || "user");
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g855 = nexus["lumen/main"];
  _g855.main = main;
  _g855.rep = rep;
  _g855.repl = repl;
  _g855.usage = usage;
})();
