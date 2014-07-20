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
    var _g20 = l;
    var _g21 = 0;
    while (_g21 < length(_g20)) {
      var y = _g20[_g21];
      if (x === y) {
        return(true);
      }
      _g21 = _g21 + 1;
    }
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
    var _g22 = from || 0;
    if (string63(x)) {
      return(substring(x, _g22, upto));
    } else {
      var l = sublist(x, _g22, upto);
      var _g23 = x;
      var k = undefined;
      for (k in _g23) {
        if (isNaN(parseInt(k))) {
          var v = _g23[k];
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
          var _g24 = l1;
          var k = undefined;
          for (k in _g24) {
            if (isNaN(parseInt(k))) {
              var v = _g24[k];
              l[k] = v;
            }
          }
          var _g25 = l2;
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
    var _g26 = l;
    var _g27 = 0;
    while (_g27 < length(_g26)) {
      var x = _g26[_g27];
      if (f(x)) {
        add(l1, x);
      }
      _g27 = _g27 + 1;
    }
    return(l1);
  }
  function find(f, l) {
    var _g28 = l;
    var _g29 = 0;
    while (_g29 < length(_g28)) {
      var x = _g28[_g29];
      var _g30 = f(x);
      if (_g30) {
        return(_g30);
      }
      _g29 = _g29 + 1;
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
    var _g31;
    if (f) {
      _g31 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g31));
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
    var _g32 = l;
    var _g33 = 0;
    while (_g33 < length(_g32)) {
      var x = _g32[_g33];
      var _g34 = f(x);
      if (splice63(_g34)) {
        l1 = join(l1, _g34.value);
      } else {
        if (is63(_g34)) {
          add(l1, _g34);
        }
      }
      _g33 = _g33 + 1;
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g35 = t;
    var k = undefined;
    for (k in _g35) {
      if (isNaN(parseInt(k))) {
        var v = _g35[k];
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
    var _g36 = t;
    var k = undefined;
    for (k in _g36) {
      if (isNaN(parseInt(k))) {
        var v = _g36[k];
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
      var _g37 = args;
      var k = undefined;
      for (k in _g37) {
        if (isNaN(parseInt(k))) {
          var v = _g37[k];
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
        var _g38 = l;
        var k = undefined;
        for (k in _g38) {
          if (isNaN(parseInt(k))) {
            var v = _g38[k];
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
    var _g39 = sub(xs, 0);
    return(join(t, _g39));
  }
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g40 = sub(keys, 0);
    var t1 = sublist(t);
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
        if (!_g40[k]) {
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
    var _g42 = sub(xs, 0);
    if (none63(_g42)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g42));
    }
  }
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g43));
  }
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g44)));
  }
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g45));
  }
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g46)));
  }
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g47)));
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
            var _g48 = x;
            var k = undefined;
            for (k in _g48) {
              if (isNaN(parseInt(k))) {
                var v = _g48[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g49 = x1;
            var i = 0;
            while (i < length(_g49)) {
              var y = _g49[i];
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
    var _g50 = stash(args);
    return(f.apply(f, _g50));
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
    var _g51 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g52 = _g51;
      var k1 = undefined;
      for (k1 in _g52) {
        if (isNaN(parseInt(k1))) {
          var v = _g52[k1];
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
  var _g53 = {};
  nexus.runtime = _g53;
  _g53["read-file"] = read_file;
  _g53.acos = acos;
  _g53["boolean?"] = boolean63;
  _g53.setenv = setenv;
  _g53["empty?"] = empty63;
  _g53.math = math;
  _g53.ceil = ceil;
  _g53.inner = inner;
  _g53.floor = floor;
  _g53["string-literal?"] = string_literal63;
  _g53.iterate = iterate;
  _g53.min = min;
  _g53.tan = tan;
  _g53.sin = sin;
  _g53.sublist = sublist;
  _g53["table?"] = table63;
  _g53[">"] = _62;
  _g53["write-file"] = write_file;
  _g53["is?"] = is63;
  _g53["string?"] = string63;
  _g53.flat1 = flat1;
  _g53.exclude = exclude;
  _g53.split = split;
  _g53.drop = drop;
  _g53.code = code;
  _g53.sinh = sinh;
  _g53.mapl = mapl;
  _g53.replicate = replicate;
  _g53["atom?"] = atom63;
  _g53.abs = abs;
  _g53["make-id"] = make_id;
  _g53.unstash = unstash;
  _g53.log10 = log10;
  _g53.tanh = tanh;
  _g53["module-key"] = module_key;
  _g53.atan2 = atan2;
  _g53.cos = cos;
  _g53.atan = atan;
  _g53["keys?"] = keys63;
  _g53.fs = fs;
  _g53.add = add;
  _g53["some?"] = some63;
  _g53.substring = substring;
  _g53["none?"] = none63;
  _g53.tl = tl;
  _g53.extend = extend;
  _g53["in?"] = in63;
  _g53["splice?"] = splice63;
  _g53["number?"] = number63;
  _g53.type = type;
  _g53.write = write;
  _g53.module = module;
  _g53["composite?"] = composite63;
  _g53["toplevel?"] = toplevel63;
  _g53.length = length;
  _g53.cat = cat;
  _g53["%message-handler"] = _37message_handler;
  _g53.sub = sub;
  _g53.sqrt = sqrt;
  _g53["id-count"] = id_count;
  _g53["<"] = _60;
  _g53.join = join;
  _g53.string = string;
  _g53.char = char;
  _g53["-"] = _;
  _g53.exit = exit;
  _g53[">="] = _6261;
  _g53.pairwise = pairwise;
  _g53["id-literal?"] = id_literal63;
  _g53.max = max;
  _g53["<="] = _6061;
  _g53.random = random;
  _g53.reverse = reverse;
  _g53["="] = _61;
  _g53.apply = apply;
  _g53["list?"] = list63;
  _g53.flat = flat;
  _g53["/"] = _47;
  _g53.map = map;
  _g53.reduce = reduce;
  _g53["*"] = _42;
  _g53.number = number;
  _g53["+"] = _43;
  _g53.search = search;
  _g53.stash = stash;
  _g53.pow = pow;
  _g53.log = log;
  _g53.keep = keep;
  _g53["%"] = _37;
  _g53.splice = splice;
  _g53.asin = asin;
  _g53.sort = sort;
  _g53.hd = hd;
  _g53.find = find;
  _g53["function?"] = function63;
  _g53["nil?"] = nil63;
  _g53.last = last;
})();
(function () {
  var _g58 = nexus.runtime;
  var read_file = _g58["read-file"];
  var acos = _g58.acos;
  var boolean63 = _g58["boolean?"];
  var setenv = _g58.setenv;
  var empty63 = _g58["empty?"];
  var ceil = _g58.ceil;
  var inner = _g58.inner;
  var floor = _g58.floor;
  var string_literal63 = _g58["string-literal?"];
  var iterate = _g58.iterate;
  var min = _g58.min;
  var tan = _g58.tan;
  var sin = _g58.sin;
  var sublist = _g58.sublist;
  var table63 = _g58["table?"];
  var _62 = _g58[">"];
  var write_file = _g58["write-file"];
  var is63 = _g58["is?"];
  var string63 = _g58["string?"];
  var flat1 = _g58.flat1;
  var exclude = _g58.exclude;
  var split = _g58.split;
  var drop = _g58.drop;
  var code = _g58.code;
  var sinh = _g58.sinh;
  var replicate = _g58.replicate;
  var atom63 = _g58["atom?"];
  var abs = _g58.abs;
  var make_id = _g58["make-id"];
  var unstash = _g58.unstash;
  var log10 = _g58.log10;
  var tanh = _g58.tanh;
  var module_key = _g58["module-key"];
  var atan2 = _g58.atan2;
  var cos = _g58.cos;
  var atan = _g58.atan;
  var keys63 = _g58["keys?"];
  var add = _g58.add;
  var some63 = _g58["some?"];
  var substring = _g58.substring;
  var none63 = _g58["none?"];
  var tl = _g58.tl;
  var extend = _g58.extend;
  var in63 = _g58["in?"];
  var number63 = _g58["number?"];
  var write = _g58.write;
  var module = _g58.module;
  var composite63 = _g58["composite?"];
  var toplevel63 = _g58["toplevel?"];
  var length = _g58.length;
  var cat = _g58.cat;
  var _37message_handler = _g58["%message-handler"];
  var sub = _g58.sub;
  var sqrt = _g58.sqrt;
  var _60 = _g58["<"];
  var join = _g58.join;
  var string = _g58.string;
  var char = _g58.char;
  var _ = _g58["-"];
  var exit = _g58.exit;
  var _6261 = _g58[">="];
  var pairwise = _g58.pairwise;
  var id_literal63 = _g58["id-literal?"];
  var max = _g58.max;
  var _6061 = _g58["<="];
  var random = _g58.random;
  var reverse = _g58.reverse;
  var _61 = _g58["="];
  var apply = _g58.apply;
  var list63 = _g58["list?"];
  var flat = _g58.flat;
  var _47 = _g58["/"];
  var map = _g58.map;
  var reduce = _g58.reduce;
  var _42 = _g58["*"];
  var number = _g58.number;
  var _43 = _g58["+"];
  var search = _g58.search;
  var stash = _g58.stash;
  var pow = _g58.pow;
  var log = _g58.log;
  var keep = _g58.keep;
  var _37 = _g58["%"];
  var splice = _g58.splice;
  var asin = _g58.asin;
  var sort = _g58.sort;
  var hd = _g58.hd;
  var find = _g58.find;
  var function63 = _g58["function?"];
  var nil63 = _g58["nil?"];
  var last = _g58.last;
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g61 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g62 = undefined;
        var _g63 = _g61;
        var x = undefined;
        for (x in _g63) {
          if (isNaN(parseInt(x))) {
            var _g54 = _g63[x];
            _g62 = x;
          }
        }
        if (_g62) {
          return(b[_g62]);
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
      var _g64;
      if (c === "\n") {
        _g64 = "\\n";
      } else {
        var _g65;
        if (c === "\"") {
          _g65 = "\\\"";
        } else {
          var _g66;
          if (c === "\\") {
            _g66 = "\\\\";
          } else {
            _g66 = c;
          }
          _g65 = _g66;
        }
        _g64 = _g65;
      }
      var c1 = _g64;
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
      var _g67 = args;
      var k = undefined;
      for (k in _g67) {
        if (isNaN(parseInt(k))) {
          var v = _g67[k];
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
        var _g68 = lh;
        var i = 0;
        while (i < length(_g68)) {
          var x = _g68[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g69 = lh;
        var k = undefined;
        for (k in _g69) {
          if (isNaN(parseInt(k))) {
            var v = _g69[k];
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
      var _g70 = args;
      var _g71 = 0;
      while (_g71 < length(_g70)) {
        var arg = _g70[_g71];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g71 = _g71 + 1;
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
          var _g55 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g74 = args;
          var _g75 = 0;
          while (_g75 < length(_g74)) {
            var _g72 = _g74[_g75];
            setenv(_g72, {_stash: true, variable: true});
            _g75 = _g75 + 1;
          }
          var _g73 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g73);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g56 = form[0];
            var name = form[1];
            var _g76 = form[2];
            var _g77 = sub(form, 3);
            add(environment, {_scope: true});
            var _g80 = _g76;
            var _g81 = 0;
            while (_g81 < length(_g80)) {
              var _g78 = _g80[_g81];
              setenv(_g78, {_stash: true, variable: true});
              _g81 = _g81 + 1;
            }
            var _g79 = join([x, name, map(macroexpand, _g76)], macroexpand(_g77));
            drop(environment);
            return(_g79);
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
    var _g82 = form;
    var k = undefined;
    for (k in _g82) {
      if (isNaN(parseInt(k))) {
        var v = _g82[k];
        var _g87;
        if (quasisplice63(v, depth)) {
          _g87 = quasiexpand(v[1]);
        } else {
          _g87 = quasiexpand(v, depth);
        }
        var _g83 = _g87;
        last(xs)[k] = _g83;
      }
    }
    var _g84 = form;
    var _g85 = 0;
    while (_g85 < length(_g84)) {
      var x = _g84[_g85];
      if (quasisplice63(x, depth)) {
        var _g86 = quasiexpand(x[1]);
        add(xs, _g86);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g85 = _g85 + 1;
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
      var _g92;
      if (c === "-") {
        _g92 = "_";
      } else {
        var _g93;
        if (valid_char63(n)) {
          _g93 = c;
        } else {
          var _g94;
          if (i === 0) {
            _g94 = "_" + n;
          } else {
            _g94 = n;
          }
          _g93 = _g94;
        }
        _g92 = _g93;
      }
      var c1 = _g92;
      id1 = id1 + c1;
      i = i + 1;
    }
    return(id1);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g95 = module(current_module).export;
    var n = undefined;
    for (n in _g95) {
      if (isNaN(parseInt(n))) {
        var b = _g95[n];
        if (b.variable) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join([["%local", m, ["table"]], ["set", ["get", "nexus", ["quote", k]], m]], exports));
    } else {
      return([]);
    }
  }
  function imported(spec) {
    var _g96 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g96.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g97 = module(spec).export;
      var n = undefined;
      for (n in _g97) {
        if (isNaN(parseInt(n))) {
          var b = _g97[n];
          if (b.variable && (all || b.export)) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], imports));
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
    var _g98 = t;
    var k = undefined;
    for (k in _g98) {
      if (isNaN(parseInt(k))) {
        var v = _g98[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(flat1(sort(pairwise(o), function (a, b) {
      return(hd(a) < hd(b));
    })));
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g57, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    var _g99 = ["table"];
    _g99.import = quoted(m.import);
    _g99.export = quote_frame(m.export);
    return(_g99);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g100 = {};
  nexus.utilities = _g100;
  _g100["quote-environment"] = quote_environment;
  _g100.exported = exported;
  _g100.reserved = reserved;
  _g100.macroexpand = macroexpand;
  _g100.quoted = quoted;
  _g100["quasisplice?"] = quasisplice63;
  _g100["quote-modules"] = quote_modules;
  _g100.getenv = getenv;
  _g100["statement?"] = statement63;
  _g100["initial-environment"] = initial_environment;
  _g100["symbol?"] = symbol63;
  _g100.quasiexpand = quasiexpand;
  _g100["numeric?"] = numeric63;
  _g100["bound?"] = bound63;
  _g100["valid-id?"] = valid_id63;
  _g100["can-unquote?"] = can_unquote63;
  _g100["quasiquoting?"] = quasiquoting63;
  _g100["macro?"] = macro63;
  _g100["toplevel?"] = toplevel63;
  _g100.indentation = indentation;
  _g100["symbol-expansion"] = symbol_expansion;
  _g100["global?"] = global63;
  _g100["bind*"] = bind42;
  _g100["special-form?"] = special_form63;
  _g100["quote-frame"] = quote_frame;
  _g100.bind = bind;
  _g100["quote-binding"] = quote_binding;
  _g100["valid-char?"] = valid_char63;
  _g100["quasiquote-list"] = quasiquote_list;
  _g100.mapo = mapo;
  _g100["quoting?"] = quoting63;
  _g100.escape = escape;
  _g100.imported = imported;
  _g100["macro-function"] = macro_function;
  _g100["reserved?"] = reserved63;
  _g100["quote-module"] = quote_module;
  _g100.id = id;
  _g100["variable?"] = variable63;
  _g100["stash*"] = stash42;
  _g100["special?"] = special63;
})();
(function () {
  var _g101 = nexus.runtime;
  var read_file = _g101["read-file"];
  var acos = _g101.acos;
  var boolean63 = _g101["boolean?"];
  var setenv = _g101.setenv;
  var empty63 = _g101["empty?"];
  var ceil = _g101.ceil;
  var inner = _g101.inner;
  var floor = _g101.floor;
  var string_literal63 = _g101["string-literal?"];
  var iterate = _g101.iterate;
  var min = _g101.min;
  var tan = _g101.tan;
  var sin = _g101.sin;
  var sublist = _g101.sublist;
  var table63 = _g101["table?"];
  var _62 = _g101[">"];
  var write_file = _g101["write-file"];
  var is63 = _g101["is?"];
  var string63 = _g101["string?"];
  var flat1 = _g101.flat1;
  var exclude = _g101.exclude;
  var split = _g101.split;
  var drop = _g101.drop;
  var code = _g101.code;
  var sinh = _g101.sinh;
  var replicate = _g101.replicate;
  var atom63 = _g101["atom?"];
  var abs = _g101.abs;
  var make_id = _g101["make-id"];
  var unstash = _g101.unstash;
  var log10 = _g101.log10;
  var tanh = _g101.tanh;
  var module_key = _g101["module-key"];
  var atan2 = _g101.atan2;
  var cos = _g101.cos;
  var atan = _g101.atan;
  var keys63 = _g101["keys?"];
  var add = _g101.add;
  var some63 = _g101["some?"];
  var substring = _g101.substring;
  var none63 = _g101["none?"];
  var tl = _g101.tl;
  var extend = _g101.extend;
  var in63 = _g101["in?"];
  var number63 = _g101["number?"];
  var write = _g101.write;
  var module = _g101.module;
  var composite63 = _g101["composite?"];
  var toplevel63 = _g101["toplevel?"];
  var length = _g101.length;
  var cat = _g101.cat;
  var _37message_handler = _g101["%message-handler"];
  var sub = _g101.sub;
  var sqrt = _g101.sqrt;
  var _60 = _g101["<"];
  var join = _g101.join;
  var string = _g101.string;
  var char = _g101.char;
  var _ = _g101["-"];
  var exit = _g101.exit;
  var _6261 = _g101[">="];
  var pairwise = _g101.pairwise;
  var id_literal63 = _g101["id-literal?"];
  var max = _g101.max;
  var _6061 = _g101["<="];
  var random = _g101.random;
  var reverse = _g101.reverse;
  var _61 = _g101["="];
  var apply = _g101.apply;
  var list63 = _g101["list?"];
  var flat = _g101.flat;
  var _47 = _g101["/"];
  var map = _g101.map;
  var reduce = _g101.reduce;
  var _42 = _g101["*"];
  var number = _g101.number;
  var _43 = _g101["+"];
  var search = _g101.search;
  var stash = _g101.stash;
  var pow = _g101.pow;
  var log = _g101.log;
  var keep = _g101.keep;
  var _37 = _g101["%"];
  var splice = _g101.splice;
  var asin = _g101.asin;
  var sort = _g101.sort;
  var hd = _g101.hd;
  var find = _g101.find;
  var function63 = _g101["function?"];
  var nil63 = _g101["nil?"];
  var last = _g101.last;
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
  var _g111 = {};
  nexus.reader = _g111;
  _g111["key?"] = key63;
  _g111["read-table"] = read_table;
  _g111.read = read;
  _g111.delimiters = delimiters;
  _g111["peek-char"] = peek_char;
  _g111["skip-non-code"] = skip_non_code;
  _g111["flag?"] = flag63;
  _g111["read-from-string"] = read_from_string;
  _g111.whitespace = whitespace;
  _g111.eof = eof;
  _g111["read-char"] = read_char;
  _g111["read-all"] = read_all;
  _g111["make-stream"] = make_stream;
})();
(function () {
  var _g112 = nexus.runtime;
  var read_file = _g112["read-file"];
  var acos = _g112.acos;
  var boolean63 = _g112["boolean?"];
  var setenv = _g112.setenv;
  var empty63 = _g112["empty?"];
  var ceil = _g112.ceil;
  var inner = _g112.inner;
  var floor = _g112.floor;
  var string_literal63 = _g112["string-literal?"];
  var iterate = _g112.iterate;
  var min = _g112.min;
  var tan = _g112.tan;
  var sin = _g112.sin;
  var sublist = _g112.sublist;
  var table63 = _g112["table?"];
  var _62 = _g112[">"];
  var write_file = _g112["write-file"];
  var is63 = _g112["is?"];
  var string63 = _g112["string?"];
  var flat1 = _g112.flat1;
  var exclude = _g112.exclude;
  var split = _g112.split;
  var drop = _g112.drop;
  var code = _g112.code;
  var sinh = _g112.sinh;
  var replicate = _g112.replicate;
  var atom63 = _g112["atom?"];
  var abs = _g112.abs;
  var make_id = _g112["make-id"];
  var unstash = _g112.unstash;
  var log10 = _g112.log10;
  var tanh = _g112.tanh;
  var module_key = _g112["module-key"];
  var atan2 = _g112.atan2;
  var cos = _g112.cos;
  var atan = _g112.atan;
  var keys63 = _g112["keys?"];
  var add = _g112.add;
  var some63 = _g112["some?"];
  var substring = _g112.substring;
  var none63 = _g112["none?"];
  var tl = _g112.tl;
  var extend = _g112.extend;
  var in63 = _g112["in?"];
  var number63 = _g112["number?"];
  var write = _g112.write;
  var module = _g112.module;
  var composite63 = _g112["composite?"];
  var toplevel63 = _g112["toplevel?"];
  var length = _g112.length;
  var cat = _g112.cat;
  var _37message_handler = _g112["%message-handler"];
  var sub = _g112.sub;
  var sqrt = _g112.sqrt;
  var _60 = _g112["<"];
  var join = _g112.join;
  var string = _g112.string;
  var char = _g112.char;
  var _ = _g112["-"];
  var exit = _g112.exit;
  var _6261 = _g112[">="];
  var pairwise = _g112.pairwise;
  var id_literal63 = _g112["id-literal?"];
  var max = _g112.max;
  var _6061 = _g112["<="];
  var random = _g112.random;
  var reverse = _g112.reverse;
  var _61 = _g112["="];
  var apply = _g112.apply;
  var list63 = _g112["list?"];
  var flat = _g112.flat;
  var _47 = _g112["/"];
  var map = _g112.map;
  var reduce = _g112.reduce;
  var _42 = _g112["*"];
  var number = _g112.number;
  var _43 = _g112["+"];
  var search = _g112.search;
  var stash = _g112.stash;
  var pow = _g112.pow;
  var log = _g112.log;
  var keep = _g112.keep;
  var _37 = _g112["%"];
  var splice = _g112.splice;
  var asin = _g112.asin;
  var sort = _g112.sort;
  var hd = _g112.hd;
  var find = _g112.find;
  var function63 = _g112["function?"];
  var nil63 = _g112["nil?"];
  var last = _g112.last;
  var _g113 = nexus.utilities;
  var quote_environment = _g113["quote-environment"];
  var exported = _g113.exported;
  var macroexpand = _g113.macroexpand;
  var quoted = _g113.quoted;
  var quote_modules = _g113["quote-modules"];
  var getenv = _g113.getenv;
  var statement63 = _g113["statement?"];
  var initial_environment = _g113["initial-environment"];
  var symbol63 = _g113["symbol?"];
  var quasiexpand = _g113.quasiexpand;
  var bound63 = _g113["bound?"];
  var valid_id63 = _g113["valid-id?"];
  var macro63 = _g113["macro?"];
  var toplevel63 = _g113["toplevel?"];
  var indentation = _g113.indentation;
  var symbol_expansion = _g113["symbol-expansion"];
  var bind42 = _g113["bind*"];
  var special_form63 = _g113["special-form?"];
  var bind = _g113.bind;
  var mapo = _g113.mapo;
  var imported = _g113.imported;
  var macro_function = _g113["macro-function"];
  var reserved63 = _g113["reserved?"];
  var id = _g113.id;
  var variable63 = _g113["variable?"];
  var stash42 = _g113["stash*"];
  var special63 = _g113["special?"];
  var _g116 = nexus.reader;
  var read_table = _g116["read-table"];
  var read = _g116.read;
  var read_from_string = _g116["read-from-string"];
  var read_all = _g116["read-all"];
  var make_stream = _g116["make-stream"];
  var _g120 = [];
  _g120.js = "!";
  _g120.lua = "not ";
  var _g118 = [];
  var _g121 = [];
  _g121.js = "!";
  _g121.lua = "not ";
  _g118["not"] = _g121;
  var _g123 = [];
  _g123["/"] = true;
  _g123["%"] = true;
  _g123["*"] = true;
  var _g125 = [];
  _g125["+"] = true;
  _g125["-"] = true;
  var _g129 = [];
  _g129.js = "+";
  _g129.lua = "..";
  var _g127 = [];
  var _g130 = [];
  _g130.js = "+";
  _g130.lua = "..";
  _g127.cat = _g130;
  var _g132 = [];
  _g132[">="] = true;
  _g132["<"] = true;
  _g132["<="] = true;
  _g132[">"] = true;
  var _g136 = [];
  _g136.js = "!=";
  _g136.lua = "~=";
  var _g138 = [];
  _g138.js = "===";
  _g138.lua = "==";
  var _g134 = [];
  var _g139 = [];
  _g139.js = "!=";
  _g139.lua = "~=";
  _g134["~="] = _g139;
  var _g140 = [];
  _g140.js = "===";
  _g140.lua = "==";
  _g134["="] = _g140;
  var _g144 = [];
  _g144.js = "&&";
  _g144.lua = "and";
  var _g142 = [];
  var _g145 = [];
  _g145.js = "&&";
  _g145.lua = "and";
  _g142["and"] = _g145;
  var _g149 = [];
  _g149.js = "||";
  _g149.lua = "or";
  var _g147 = [];
  var _g150 = [];
  _g150.js = "||";
  _g150.lua = "or";
  _g147["or"] = _g150;
  var infix = [_g118, _g123, _g125, _g127, _g132, _g134, _g142, _g147];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g151 = infix;
      var i = 0;
      while (i < length(_g151)) {
        var level = _g151[i];
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
    var _g152 = args;
    var i = 0;
    while (i < length(_g152)) {
      var arg = _g152[i];
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
    var _g153 = getenv(x);
    var special = _g153.special;
    var stmt = _g153.stmt;
    var self_tr63 = _g153.tr;
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
    var _g154 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g154.right;
    var _g155;
    if (right) {
      _g155 = _6261;
    } else {
      _g155 = _62;
    }
    if (_g155(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g156 = sub(form, 1);
    var a = _g156[0];
    var b = _g156[1];
    var _g157 = op_delims(form, a);
    var ao = _g157[0];
    var ac = _g157[1];
    var _g158 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g158[0];
    var bc = _g158[1];
    var _g159 = compile(a);
    var _g160 = compile(b);
    var _g161 = getop(op);
    if (unary63(form)) {
      return(_g161 + ao + _g159 + ac);
    } else {
      return(ao + _g159 + ac + " " + _g161 + " " + bo + _g160 + bc);
    }
  }
  function compile_function(args, body) {
    var _g162 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g162.name;
    var prefix = _g162.prefix;
    var _g167;
    if (name) {
      _g167 = compile(name);
    } else {
      _g167 = "";
    }
    var id = _g167;
    var _g163 = prefix || "";
    var _g164 = compile_args(args);
    indent_level = indent_level + 1;
    var _g166 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g165 = _g166;
    var ind = indentation();
    var _g168;
    if (target === "js") {
      _g168 = "";
    } else {
      _g168 = "end";
    }
    var tr = _g168;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g164 + " {\n" + _g165 + ind + "}" + tr);
    } else {
      return(_g163 + "function " + id + _g164 + "\n" + _g165 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g169 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g169.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g171;
        if (stmt) {
          _g171 = indentation();
        } else {
          _g171 = "";
        }
        var ind = _g171;
        var _g172;
        if (atom63(form)) {
          _g172 = compile_atom(form);
        } else {
          var _g173;
          if (infix63(hd(form))) {
            _g173 = compile_infix(form);
          } else {
            _g173 = compile_call(form);
          }
          _g172 = _g173;
        }
        var _g170 = _g172;
        return(ind + _g170 + tr);
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
    var _g174 = sub(args, 0, length(args) - 1);
    var _g175 = 0;
    while (_g175 < length(_g174)) {
      var x = _g174[_g175];
      add(hoist, lower(x, hoist, stmt63));
      _g175 = _g175 + 1;
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
    var _g176 = args[1];
    var _g177 = args[2];
    if (stmt63 || tail63) {
      var _g179;
      if (_g177) {
        _g179 = [lower_body([_g177], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g176], tail63)], _g179)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g178;
      if (_g177) {
        _g178 = [lower(["set", e, _g177])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g176])], _g178));
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
      var _g180;
      if (x === "and") {
        _g180 = ["%if", id, b, id];
      } else {
        _g180 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g180], hoist));
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
    var _g181 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g181, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g182 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g182)) {
      return(_g182);
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
    var _g183 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g183, epilog))]]);
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
    var _g184 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g184.all;
    var m = module(spec);
    var frame = last(environment);
    var _g185 = m.export;
    var k = undefined;
    for (k in _g185) {
      if (isNaN(parseInt(k))) {
        var v = _g185[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g186 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g186.all;
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
    var _g187 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g187));
    target = previous;
    return(run(compiled));
  }
  var _g188 = {};
  nexus.compiler = _g188;
  _g188["compile-args"] = compile_args;
  _g188["compile-module"] = compile_module;
  _g188["lower-for"] = lower_for;
  _g188["lower-body"] = lower_body;
  _g188["compile-infix"] = compile_infix;
  _g188.terminator = terminator;
  _g188["compile-file"] = compile_file;
  _g188.run = run;
  _g188["compile-function"] = compile_function;
  _g188.lower = lower;
  _g188["lower-if"] = lower_if;
  _g188["load-module"] = load_module;
  _g188["unary?"] = unary63;
  _g188["lower-special"] = lower_special;
  _g188["lower-do"] = lower_do;
  _g188["lower-while"] = lower_while;
  _g188["can-return?"] = can_return63;
  _g188.eval = eval;
  _g188["lower-infix?"] = lower_infix63;
  _g188["lower-definition"] = lower_definition;
  _g188["compiling?"] = compiling63;
  _g188["lower-statement"] = lower_statement;
  _g188["lower-try"] = lower_try;
  _g188.precedence = precedence;
  _g188.prologue = prologue;
  _g188["infix?"] = infix63;
  _g188["lower-function"] = lower_function;
  _g188["compiler-output"] = compiler_output;
  _g188.encapsulate = encapsulate;
  _g188["open-module"] = open_module;
  _g188.process = process;
  _g188["parenthesize-call?"] = parenthesize_call63;
  _g188["lower-call"] = lower_call;
  _g188["compile-atom"] = compile_atom;
  _g188["compile-special"] = compile_special;
  _g188.getop = getop;
  _g188["compile-call"] = compile_call;
  _g188["op-delims"] = op_delims;
  _g188["lower-infix"] = lower_infix;
  _g188["%compile-module"] = _37compile_module;
  _g188["module-path"] = module_path;
  _g188.infix = infix;
  _g188["lower-short"] = lower_short;
  _g188.compile = compile;
  _g188["in-module"] = in_module;
})();
(function () {
  var _g189 = nexus.runtime;
  var read_file = _g189["read-file"];
  var acos = _g189.acos;
  var boolean63 = _g189["boolean?"];
  var setenv = _g189.setenv;
  var empty63 = _g189["empty?"];
  var ceil = _g189.ceil;
  var inner = _g189.inner;
  var floor = _g189.floor;
  var string_literal63 = _g189["string-literal?"];
  var iterate = _g189.iterate;
  var min = _g189.min;
  var tan = _g189.tan;
  var sin = _g189.sin;
  var sublist = _g189.sublist;
  var table63 = _g189["table?"];
  var _62 = _g189[">"];
  var write_file = _g189["write-file"];
  var is63 = _g189["is?"];
  var string63 = _g189["string?"];
  var flat1 = _g189.flat1;
  var exclude = _g189.exclude;
  var split = _g189.split;
  var drop = _g189.drop;
  var code = _g189.code;
  var sinh = _g189.sinh;
  var replicate = _g189.replicate;
  var atom63 = _g189["atom?"];
  var abs = _g189.abs;
  var make_id = _g189["make-id"];
  var unstash = _g189.unstash;
  var log10 = _g189.log10;
  var tanh = _g189.tanh;
  var module_key = _g189["module-key"];
  var atan2 = _g189.atan2;
  var cos = _g189.cos;
  var atan = _g189.atan;
  var keys63 = _g189["keys?"];
  var add = _g189.add;
  var some63 = _g189["some?"];
  var substring = _g189.substring;
  var none63 = _g189["none?"];
  var tl = _g189.tl;
  var extend = _g189.extend;
  var in63 = _g189["in?"];
  var number63 = _g189["number?"];
  var write = _g189.write;
  var module = _g189.module;
  var composite63 = _g189["composite?"];
  var toplevel63 = _g189["toplevel?"];
  var length = _g189.length;
  var cat = _g189.cat;
  var _37message_handler = _g189["%message-handler"];
  var sub = _g189.sub;
  var sqrt = _g189.sqrt;
  var _60 = _g189["<"];
  var join = _g189.join;
  var string = _g189.string;
  var char = _g189.char;
  var _ = _g189["-"];
  var exit = _g189.exit;
  var _6261 = _g189[">="];
  var pairwise = _g189.pairwise;
  var id_literal63 = _g189["id-literal?"];
  var max = _g189.max;
  var _6061 = _g189["<="];
  var random = _g189.random;
  var reverse = _g189.reverse;
  var _61 = _g189["="];
  var apply = _g189.apply;
  var list63 = _g189["list?"];
  var flat = _g189.flat;
  var _47 = _g189["/"];
  var map = _g189.map;
  var reduce = _g189.reduce;
  var _42 = _g189["*"];
  var number = _g189.number;
  var _43 = _g189["+"];
  var search = _g189.search;
  var stash = _g189.stash;
  var pow = _g189.pow;
  var log = _g189.log;
  var keep = _g189.keep;
  var _37 = _g189["%"];
  var splice = _g189.splice;
  var asin = _g189.asin;
  var sort = _g189.sort;
  var hd = _g189.hd;
  var find = _g189.find;
  var function63 = _g189["function?"];
  var nil63 = _g189["nil?"];
  var last = _g189.last;
  var _g190 = nexus.utilities;
  var quote_environment = _g190["quote-environment"];
  var exported = _g190.exported;
  var macroexpand = _g190.macroexpand;
  var quoted = _g190.quoted;
  var quote_modules = _g190["quote-modules"];
  var getenv = _g190.getenv;
  var statement63 = _g190["statement?"];
  var initial_environment = _g190["initial-environment"];
  var symbol63 = _g190["symbol?"];
  var quasiexpand = _g190.quasiexpand;
  var bound63 = _g190["bound?"];
  var valid_id63 = _g190["valid-id?"];
  var macro63 = _g190["macro?"];
  var toplevel63 = _g190["toplevel?"];
  var indentation = _g190.indentation;
  var symbol_expansion = _g190["symbol-expansion"];
  var bind42 = _g190["bind*"];
  var special_form63 = _g190["special-form?"];
  var bind = _g190.bind;
  var mapo = _g190.mapo;
  var imported = _g190.imported;
  var macro_function = _g190["macro-function"];
  var reserved63 = _g190["reserved?"];
  var id = _g190.id;
  var variable63 = _g190["variable?"];
  var stash42 = _g190["stash*"];
  var special63 = _g190["special?"];
  var _g193 = nexus.compiler;
  var compile_module = _g193["compile-module"];
  var compile_function = _g193["compile-function"];
  var load_module = _g193["load-module"];
  var eval = _g193.eval;
  var open_module = _g193["open-module"];
  var compile = _g193.compile;
  var in_module = _g193["in-module"];
})();
(function () {
  var _g351 = nexus.runtime;
  var read_file = _g351["read-file"];
  var acos = _g351.acos;
  var boolean63 = _g351["boolean?"];
  var setenv = _g351.setenv;
  var empty63 = _g351["empty?"];
  var ceil = _g351.ceil;
  var inner = _g351.inner;
  var floor = _g351.floor;
  var string_literal63 = _g351["string-literal?"];
  var iterate = _g351.iterate;
  var min = _g351.min;
  var tan = _g351.tan;
  var sin = _g351.sin;
  var sublist = _g351.sublist;
  var table63 = _g351["table?"];
  var _62 = _g351[">"];
  var write_file = _g351["write-file"];
  var is63 = _g351["is?"];
  var string63 = _g351["string?"];
  var flat1 = _g351.flat1;
  var exclude = _g351.exclude;
  var split = _g351.split;
  var drop = _g351.drop;
  var code = _g351.code;
  var sinh = _g351.sinh;
  var replicate = _g351.replicate;
  var atom63 = _g351["atom?"];
  var abs = _g351.abs;
  var make_id = _g351["make-id"];
  var unstash = _g351.unstash;
  var log10 = _g351.log10;
  var tanh = _g351.tanh;
  var module_key = _g351["module-key"];
  var atan2 = _g351.atan2;
  var cos = _g351.cos;
  var atan = _g351.atan;
  var keys63 = _g351["keys?"];
  var add = _g351.add;
  var some63 = _g351["some?"];
  var substring = _g351.substring;
  var none63 = _g351["none?"];
  var tl = _g351.tl;
  var extend = _g351.extend;
  var in63 = _g351["in?"];
  var number63 = _g351["number?"];
  var write = _g351.write;
  var module = _g351.module;
  var composite63 = _g351["composite?"];
  var toplevel63 = _g351["toplevel?"];
  var length = _g351.length;
  var cat = _g351.cat;
  var _37message_handler = _g351["%message-handler"];
  var sub = _g351.sub;
  var sqrt = _g351.sqrt;
  var _60 = _g351["<"];
  var join = _g351.join;
  var string = _g351.string;
  var char = _g351.char;
  var _ = _g351["-"];
  var exit = _g351.exit;
  var _6261 = _g351[">="];
  var pairwise = _g351.pairwise;
  var id_literal63 = _g351["id-literal?"];
  var max = _g351.max;
  var _6061 = _g351["<="];
  var random = _g351.random;
  var reverse = _g351.reverse;
  var _61 = _g351["="];
  var apply = _g351.apply;
  var list63 = _g351["list?"];
  var flat = _g351.flat;
  var _47 = _g351["/"];
  var map = _g351.map;
  var reduce = _g351.reduce;
  var _42 = _g351["*"];
  var number = _g351.number;
  var _43 = _g351["+"];
  var search = _g351.search;
  var stash = _g351.stash;
  var pow = _g351.pow;
  var log = _g351.log;
  var keep = _g351.keep;
  var _37 = _g351["%"];
  var splice = _g351.splice;
  var asin = _g351.asin;
  var sort = _g351.sort;
  var hd = _g351.hd;
  var find = _g351.find;
  var function63 = _g351["function?"];
  var nil63 = _g351["nil?"];
  var last = _g351.last;
  var _g352 = nexus.utilities;
  var quote_environment = _g352["quote-environment"];
  var exported = _g352.exported;
  var macroexpand = _g352.macroexpand;
  var quoted = _g352.quoted;
  var quote_modules = _g352["quote-modules"];
  var getenv = _g352.getenv;
  var statement63 = _g352["statement?"];
  var initial_environment = _g352["initial-environment"];
  var symbol63 = _g352["symbol?"];
  var quasiexpand = _g352.quasiexpand;
  var bound63 = _g352["bound?"];
  var valid_id63 = _g352["valid-id?"];
  var macro63 = _g352["macro?"];
  var toplevel63 = _g352["toplevel?"];
  var indentation = _g352.indentation;
  var symbol_expansion = _g352["symbol-expansion"];
  var bind42 = _g352["bind*"];
  var special_form63 = _g352["special-form?"];
  var bind = _g352.bind;
  var mapo = _g352.mapo;
  var imported = _g352.imported;
  var macro_function = _g352["macro-function"];
  var reserved63 = _g352["reserved?"];
  var id = _g352.id;
  var variable63 = _g352["variable?"];
  var stash42 = _g352["stash*"];
  var special63 = _g352["special?"];
  var _g355 = nexus.compiler;
  var compile_module = _g355["compile-module"];
  var compile_function = _g355["compile-function"];
  var load_module = _g355["load-module"];
  var eval = _g355.eval;
  var open_module = _g355["open-module"];
  var compile = _g355.compile;
  var in_module = _g355["in-module"];
  global.target = "js";
})();
(function () {
  var _g621 = nexus.runtime;
  var read_file = _g621["read-file"];
  var acos = _g621.acos;
  var boolean63 = _g621["boolean?"];
  var setenv = _g621.setenv;
  var empty63 = _g621["empty?"];
  var ceil = _g621.ceil;
  var inner = _g621.inner;
  var floor = _g621.floor;
  var string_literal63 = _g621["string-literal?"];
  var iterate = _g621.iterate;
  var min = _g621.min;
  var tan = _g621.tan;
  var sin = _g621.sin;
  var sublist = _g621.sublist;
  var table63 = _g621["table?"];
  var _62 = _g621[">"];
  var write_file = _g621["write-file"];
  var is63 = _g621["is?"];
  var string63 = _g621["string?"];
  var flat1 = _g621.flat1;
  var exclude = _g621.exclude;
  var split = _g621.split;
  var drop = _g621.drop;
  var code = _g621.code;
  var sinh = _g621.sinh;
  var replicate = _g621.replicate;
  var atom63 = _g621["atom?"];
  var abs = _g621.abs;
  var make_id = _g621["make-id"];
  var unstash = _g621.unstash;
  var log10 = _g621.log10;
  var tanh = _g621.tanh;
  var module_key = _g621["module-key"];
  var atan2 = _g621.atan2;
  var cos = _g621.cos;
  var atan = _g621.atan;
  var keys63 = _g621["keys?"];
  var add = _g621.add;
  var some63 = _g621["some?"];
  var substring = _g621.substring;
  var none63 = _g621["none?"];
  var tl = _g621.tl;
  var extend = _g621.extend;
  var in63 = _g621["in?"];
  var number63 = _g621["number?"];
  var write = _g621.write;
  var module = _g621.module;
  var composite63 = _g621["composite?"];
  var toplevel63 = _g621["toplevel?"];
  var length = _g621.length;
  var cat = _g621.cat;
  var _37message_handler = _g621["%message-handler"];
  var sub = _g621.sub;
  var sqrt = _g621.sqrt;
  var _60 = _g621["<"];
  var join = _g621.join;
  var string = _g621.string;
  var char = _g621.char;
  var _ = _g621["-"];
  var exit = _g621.exit;
  var _6261 = _g621[">="];
  var pairwise = _g621.pairwise;
  var id_literal63 = _g621["id-literal?"];
  var max = _g621.max;
  var _6061 = _g621["<="];
  var random = _g621.random;
  var reverse = _g621.reverse;
  var _61 = _g621["="];
  var apply = _g621.apply;
  var list63 = _g621["list?"];
  var flat = _g621.flat;
  var _47 = _g621["/"];
  var map = _g621.map;
  var reduce = _g621.reduce;
  var _42 = _g621["*"];
  var number = _g621.number;
  var _43 = _g621["+"];
  var search = _g621.search;
  var stash = _g621.stash;
  var pow = _g621.pow;
  var log = _g621.log;
  var keep = _g621.keep;
  var _37 = _g621["%"];
  var splice = _g621.splice;
  var asin = _g621.asin;
  var sort = _g621.sort;
  var hd = _g621.hd;
  var find = _g621.find;
  var function63 = _g621["function?"];
  var nil63 = _g621["nil?"];
  var last = _g621.last;
  var _g622 = nexus.utilities;
  var quote_environment = _g622["quote-environment"];
  var exported = _g622.exported;
  var macroexpand = _g622.macroexpand;
  var quoted = _g622.quoted;
  var quote_modules = _g622["quote-modules"];
  var getenv = _g622.getenv;
  var statement63 = _g622["statement?"];
  var initial_environment = _g622["initial-environment"];
  var symbol63 = _g622["symbol?"];
  var quasiexpand = _g622.quasiexpand;
  var bound63 = _g622["bound?"];
  var valid_id63 = _g622["valid-id?"];
  var macro63 = _g622["macro?"];
  var toplevel63 = _g622["toplevel?"];
  var indentation = _g622.indentation;
  var symbol_expansion = _g622["symbol-expansion"];
  var bind42 = _g622["bind*"];
  var special_form63 = _g622["special-form?"];
  var bind = _g622.bind;
  var mapo = _g622.mapo;
  var imported = _g622.imported;
  var macro_function = _g622["macro-function"];
  var reserved63 = _g622["reserved?"];
  var id = _g622.id;
  var variable63 = _g622["variable?"];
  var stash42 = _g622["stash*"];
  var special63 = _g622["special?"];
  var _g625 = nexus.compiler;
  var compile_module = _g625["compile-module"];
  var compile_function = _g625["compile-function"];
  var load_module = _g625["load-module"];
  var eval = _g625.eval;
  var open_module = _g625["open-module"];
  var compile = _g625.compile;
  var in_module = _g625["in-module"];
  global.modules = {boot: {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, compiler: {export: {"%compile-module": {variable: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, "current-module": {export: true, global: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, prologue: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: ["runtime", "utilities", "special", "core", "reader"]}, core: {export: {at: {export: true, macro: function (l, i) {
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
    var _g638 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g638)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g639 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g639)) {
      var _g640 = bind42(x, _g639);
      var args = _g640[0];
      var _g641 = _g640[1];
      return(join(["%local-function", name, args], _g641));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g642 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g642)) {
      var _g643 = bind42(x, _g642);
      var args = _g643[0];
      var _g644 = _g643[1];
      return(join(["%global-function", name, args], _g644));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g645 = sub(body, 0);
    var form = join(["fn", args], _g645);
    var _g646 = ["setenv", ["quote", name]];
    _g646.macro = form;
    _g646.form = ["quote", form];
    eval(_g646);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g647 = sub(body, 0);
    var imports = [];
    var exp = _g647.export;
    var imp = _g647.import;
    var _g648 = imp || [];
    var _g649 = 0;
    while (_g649 < length(_g648)) {
      var k = _g648[_g649];
      load_module(k);
      imports = join(imports, imported(k));
      _g649 = _g649 + 1;
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g650 = exp || [];
    var _g651 = 0;
    while (_g651 < length(_g650)) {
      var k = _g650[_g651];
      setenv(k, {_stash: true, export: true});
      _g651 = _g651 + 1;
    }
    return(join(["do"], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g652 = sub(body, 0);
    var form = join(["fn", args], _g652);
    var keys = sub(_g652, length(_g652));
    var _g653 = ["setenv", ["quote", name]];
    _g653.form = ["quote", form];
    _g653.special = form;
    eval(join(_g653, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g654 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g709;
    if (nil63(v)) {
      var _g710;
      if (b.i) {
        _g710 = "i";
      } else {
        _g710 = make_id();
      }
      var i = _g710;
      _g709 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g654), ["inc", i]]];
    } else {
      var _g655 = ["target"];
      _g655.js = ["isNaN", ["parseInt", k]];
      _g655.lua = ["not", ["number?", k]];
      _g709 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g655, join(["let", [v, ["get", t1, k]]], _g654)]]];
    }
    return(["let", [t1, t], _g709]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g656 = sub(body, 0);
    var _g657 = bind42(args, _g656);
    var _g658 = _g657[0];
    var _g659 = _g657[1];
    return(join(["%function", _g658], _g659));
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
    function step(_g660) {
      var a = _g660[0];
      var b = _g660[1];
      var c = sub(_g660, 2);
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
    var _g661 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g661)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g662 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g663) {
      var lh = _g663[0];
      var rh = _g663[1];
      var _g664 = bind(lh, rh);
      var _g665 = 0;
      while (_g665 < length(_g664)) {
        var _g666 = _g664[_g665];
        var id = _g666[0];
        var val = _g666[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g665 = _g665 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g662)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g667 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g668 = join(["do"], macroexpand(_g667));
    drop(environment);
    return(_g668);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g669 = sub(body, 0);
    add(environment, {});
    map(function (_g671) {
      var name = _g671[0];
      var exp = _g671[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g670 = join(["do"], macroexpand(_g669));
    drop(environment);
    return(_g670);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g672 = body;
      var k = undefined;
      for (k in _g672) {
        if (isNaN(parseInt(k))) {
          var v = _g672[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g673 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g673)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g674 = elements;
    var _g675 = 0;
    while (_g675 < length(_g674)) {
      var e = _g674[_g675];
      l[e] = true;
      _g675 = _g675 + 1;
    }
    return(join(["table"], l));
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (_g350, x) {
      return(x);
    }, body)));
  }}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g676 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g676)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g677 = sub(body, 0);
    return(["if", cond, join(["do"], _g677)]);
  }}, "with-bindings": {export: true, macro: function (_g678) {
    var names = _g678[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g679 = sub(body, 0);
    var x = make_id();
    var _g681 = ["setenv", x];
    _g681.variable = true;
    var _g680 = ["with-frame", ["each", [x], names, _g681]];
    _g680.scope = true;
    return(join(_g680, _g679));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g682 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g683 = ["table"];
    _g683._scope = scope;
    return(["do", ["add", "environment", _g683], ["let", [x, join(["do"], _g682)], ["drop", "environment"], x]]);
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, lib: {export: {}, import: ["core", "special"]}, main: {export: {save: {macro: function () {
    var specs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g684 = sub(specs, 0);
    map(compile_module, _g684);
    return(undefined);
  }}}, import: ["runtime", "special", "core", "reader", "compiler"]}, optimizer: {export: {"define-optimization": {}, optimizations: {variable: true}, optimize: {export: true, variable: true}}, import: ["runtime", "special", "core"]}, reader: {export: {"define-reader": {export: true, macro: function (_g685) {
    var char = _g685[0];
    var stream = _g685[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g686 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g686)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["runtime", "special", "core"]}, runtime: {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: ["special", "core"]}, special: {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g711;
    if (target === "lua") {
      _g711 = "{";
    } else {
      _g711 = "[";
    }
    var open = _g711;
    var _g712;
    if (target === "lua") {
      _g712 = "}";
    } else {
      _g712 = "]";
    }
    var close = _g712;
    var str = "";
    var _g687 = forms;
    var i = 0;
    while (i < length(_g687)) {
      var x = _g687[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g688 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g689 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g689;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g688 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g688 + ") {\n" + body + ind + "}\n");
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
    var _g690 = compile(cond);
    indent_level = indent_level + 1;
    var _g693 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g691 = _g693;
    var _g713;
    if (alt) {
      indent_level = indent_level + 1;
      var _g694 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g713 = _g694;
    }
    var _g692 = _g713;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g690 + ") {\n" + _g691 + ind + "}";
    } else {
      str = str + ind + "if " + _g690 + " then\n" + _g691;
    }
    if (_g692 && target === "js") {
      str = str + " else {\n" + _g692 + ind + "}";
    } else {
      if (_g692) {
        str = str + ind + "else\n" + _g692;
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
    var _g714;
    if (is63(value)) {
      _g714 = " = " + value1;
    } else {
      _g714 = "";
    }
    var rh = _g714;
    var _g715;
    if (target === "js") {
      _g715 = "var ";
    } else {
      _g715 = "local ";
    }
    var keyword = _g715;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g716;
    if (target === "lua") {
      _g716 = " = ";
    } else {
      _g716 = ": ";
    }
    var sep = _g716;
    var pairs = pairwise(forms);
    var _g695 = pairs;
    var i = 0;
    while (i < length(_g695)) {
      var _g696 = _g695[i];
      var k = _g696[0];
      var v = _g696[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g697 = compile(v);
      var _g717;
      if (valid_id63(k)) {
        _g717 = k;
      } else {
        var _g718;
        if (target === "js" && string_literal63(k)) {
          _g718 = k;
        } else {
          var _g719;
          if (target === "js") {
            _g719 = quoted(k);
          } else {
            var _g720;
            if (string_literal63(k)) {
              _g720 = "[" + k + "]";
            } else {
              _g720 = "[" + quoted(k) + "]";
            }
            _g719 = _g720;
          }
          _g718 = _g719;
        }
        _g717 = _g718;
      }
      var _g698 = _g717;
      str = str + _g698 + sep + _g697;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g699 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g699;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g700 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g700;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g701 = forms;
    var _g702 = 0;
    while (_g702 < length(_g701)) {
      var x = _g701[_g702];
      str = str + compile(x, {_stash: true, stmt: true});
      _g702 = _g702 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g721;
    if (target === "js") {
      _g721 = "throw new " + compile(["Error", x]);
    } else {
      _g721 = "error(" + compile(x) + ")";
    }
    var e = _g721;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g703 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g703, 0) === "{") {
      _g703 = "(" + _g703 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g703 + "." + inner(k));
    } else {
      return(_g703 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g722;
    if (nil63(x)) {
      _g722 = "return";
    } else {
      _g722 = "return(" + compile(x) + ")";
    }
    var _g704 = _g722;
    return(indentation() + _g704);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g705 = compile(lh);
    var _g723;
    if (nil63(rh)) {
      _g723 = "nil";
    } else {
      _g723 = rh;
    }
    var _g706 = compile(_g723);
    return(indentation() + _g705 + " = " + _g706);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g707 = compile(cond);
    indent_level = indent_level + 1;
    var _g708 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g708;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g707 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g707 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, system: {export: {nexus: {export: true, global: true}}, import: ["special", "core"]}, utilities: {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, exported: {export: true, variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["runtime", "special", "core"]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g724 = sub(body, 0);
    var imports = [];
    var exp = _g724.export;
    var imp = _g724.import;
    var _g725 = imp || [];
    var _g726 = 0;
    while (_g726 < length(_g725)) {
      var k = _g725[_g726];
      load_module(k);
      imports = join(imports, imported(k));
      _g726 = _g726 + 1;
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g727 = exp || [];
    var _g728 = 0;
    while (_g728 < length(_g727)) {
      var k = _g727[_g728];
      setenv(k, {_stash: true, export: true});
      _g728 = _g728 + 1;
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var read_file = _g2["read-file"];
  var _60 = _g2["<"];
  var boolean63 = _g2["boolean?"];
  var setenv = _g2.setenv;
  var empty63 = _g2["empty?"];
  var _47 = _g2["/"];
  var inner = _g2.inner;
  var _ = _g2["-"];
  var string_literal63 = _g2["string-literal?"];
  var iterate = _g2.iterate;
  var _37message_handler = _g2["%message-handler"];
  var sort = _g2.sort;
  var sin = _g2.sin;
  var sublist = _g2.sublist;
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var write_file = _g2["write-file"];
  var is63 = _g2["is?"];
  var string63 = _g2["string?"];
  var flat1 = _g2.flat1;
  var exclude = _g2.exclude;
  var split = _g2.split;
  var drop = _g2.drop;
  var code = _g2.code;
  var exit = _g2.exit;
  var replicate = _g2.replicate;
  var atom63 = _g2["atom?"];
  var abs = _g2.abs;
  var unstash = _g2.unstash;
  var log10 = _g2.log10;
  var tanh = _g2.tanh;
  var module_key = _g2["module-key"];
  var atan2 = _g2.atan2;
  var cos = _g2.cos;
  var atan = _g2.atan;
  var keys63 = _g2["keys?"];
  var add = _g2.add;
  var some63 = _g2["some?"];
  var none63 = _g2["none?"];
  var tl = _g2.tl;
  var extend = _g2.extend;
  var in63 = _g2["in?"];
  var tan = _g2.tan;
  var number63 = _g2["number?"];
  var toplevel63 = _g2["toplevel?"];
  var write = _g2.write;
  var table63 = _g2["table?"];
  var composite63 = _g2["composite?"];
  var substring = _g2.substring;
  var hd = _g2.hd;
  var cat = _g2.cat;
  var sub = _g2.sub;
  var asin = _g2.asin;
  var sqrt = _g2.sqrt;
  var string = _g2.string;
  var flat = _g2.flat;
  var stash = _g2.stash;
  var char = _g2.char;
  var splice = _g2.splice;
  var _6261 = _g2[">="];
  var pairwise = _g2.pairwise;
  var id_literal63 = _g2["id-literal?"];
  var make_id = _g2["make-id"];
  var sinh = _g2.sinh;
  var random = _g2.random;
  var _6061 = _g2["<="];
  var search = _g2.search;
  var apply = _g2.apply;
  var list63 = _g2["list?"];
  var reverse = _g2.reverse;
  var pow = _g2.pow;
  var map = _g2.map;
  var reduce = _g2.reduce;
  var nil63 = _g2["nil?"];
  var number = _g2.number;
  var _43 = _g2["+"];
  var module = _g2.module;
  var min = _g2.min;
  var _42 = _g2["*"];
  var max = _g2.max;
  var log = _g2.log;
  var _37 = _g2["%"];
  var length = _g2.length;
  var last = _g2.last;
  var keep = _g2.keep;
  var join = _g2.join;
  var floor = _g2.floor;
  var find = _g2.find;
  var function63 = _g2["function?"];
  var ceil = _g2.ceil;
  var acos = _g2.acos;
  var _g5 = nexus.reader;
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var make_stream = _g5["make-stream"];
  var _g6 = nexus.compiler;
  var compile_module = _g6["compile-module"];
  var load_module = _g6["load-module"];
  var eval = _g6.eval;
  var open_module = _g6["open-module"];
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var in_module = _g6["in-module"];
  function rep(str) {
    var _g730 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g733) {
        return([false, _g733.message]);
      }
    })();
    var _g1 = _g730[0];
    var x = _g730[1];
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
    var _g731 = args;
    var i = 0;
    while (i < length(_g731)) {
      var arg = _g731[i];
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
  var _g732 = {};
  nexus.main = _g732;
  _g732.repl = repl;
  _g732.usage = usage;
  _g732.main = main;
  _g732.rep = rep;
})();
