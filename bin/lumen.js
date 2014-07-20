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
    var _g31 = l;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var x = _g31[_g32];
      var _g33 = f(x);
      if (splice63(_g33)) {
        l1 = join(l1, _g33.value);
      } else {
        if (is63(_g33)) {
          add(l1, _g33);
        }
      }
      _g32 = _g32 + 1;
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g34 = t;
    var k = undefined;
    for (k in _g34) {
      if (isNaN(parseInt(k))) {
        var v = _g34[k];
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
  function keys63(t) {
    var k63 = false;
    var _g35 = t;
    var k = undefined;
    for (k in _g35) {
      if (isNaN(parseInt(k))) {
        var v = _g35[k];
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
      var _g36 = args;
      var k = undefined;
      for (k in _g36) {
        if (isNaN(parseInt(k))) {
          var v = _g36[k];
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
        var _g37 = l;
        var k = undefined;
        for (k in _g37) {
          if (isNaN(parseInt(k))) {
            var v = _g37[k];
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
    var _g38 = sub(xs, 0);
    return(join(t, _g38));
  }
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g39 = sub(keys, 0);
    var t1 = sublist(t);
    var _g40 = t;
    var k = undefined;
    for (k in _g40) {
      if (isNaN(parseInt(k))) {
        var v = _g40[k];
        if (!_g39[k]) {
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
    var _g41 = sub(xs, 0);
    if (none63(_g41)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g41));
    }
  }
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g42));
  }
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g43)));
  }
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g44));
  }
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g45)));
  }
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g46)));
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
  function parse_number(str) {
    var n = parseFloat(str);
    if (!isNaN(n)) {
      return(n);
    }
  }
  function to_string(x) {
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
            var _g47 = x;
            var k = undefined;
            for (k in _g47) {
              if (isNaN(parseInt(k))) {
                var v = _g47[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g48 = x1;
            var i = 0;
            while (i < length(_g48)) {
              var y = _g48[i];
              str = str + to_string(y);
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
    var _g49 = stash(args);
    return(f.apply(f, _g49));
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
      return(to_string(spec));
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
    var _g50 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g51 = _g50;
      var k1 = undefined;
      for (k1 in _g51) {
        if (isNaN(parseInt(k1))) {
          var v = _g51[k1];
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
  var _g52 = {};
  nexus.runtime = _g52;
  _g52["nil?"] = nil63;
  _g52["is?"] = is63;
  _g52.max = max;
  _g52.min = min;
  _g52.abs = abs;
  _g52.acos = acos;
  _g52.asin = asin;
  _g52.atan = atan;
  _g52.atan2 = atan2;
  _g52.ceil = ceil;
  _g52.cos = cos;
  _g52.floor = floor;
  _g52.log = log;
  _g52.log10 = log10;
  _g52.pow = pow;
  _g52.random = random;
  _g52.sin = sin;
  _g52.sinh = sinh;
  _g52.sqrt = sqrt;
  _g52.tan = tan;
  _g52.tanh = tanh;
  _g52.length = length;
  _g52["none?"] = none63;
  _g52["some?"] = some63;
  _g52["in?"] = in63;
  _g52.hd = hd;
  _g52["string?"] = string63;
  _g52["number?"] = number63;
  _g52["boolean?"] = boolean63;
  _g52["function?"] = function63;
  _g52["composite?"] = composite63;
  _g52["atom?"] = atom63;
  _g52["table?"] = table63;
  _g52["list?"] = list63;
  _g52.substring = substring;
  _g52.sublist = sublist;
  _g52.sub = sub;
  _g52.inner = inner;
  _g52.tl = tl;
  _g52.char = char;
  _g52.code = code;
  _g52["string-literal?"] = string_literal63;
  _g52["id-literal?"] = id_literal63;
  _g52.add = add;
  _g52.drop = drop;
  _g52.last = last;
  _g52.reverse = reverse;
  _g52.join = join;
  _g52.reduce = reduce;
  _g52.keep = keep;
  _g52.find = find;
  _g52.pairwise = pairwise;
  _g52.iterate = iterate;
  _g52.replicate = replicate;
  _g52.splice = splice;
  _g52.map = map;
  _g52["keys?"] = keys63;
  _g52["empty?"] = empty63;
  _g52.stash = stash;
  _g52.unstash = unstash;
  _g52.extend = extend;
  _g52.exclude = exclude;
  _g52.search = search;
  _g52.split = split;
  _g52.cat = cat;
  _g52["+"] = _43;
  _g52["-"] = _;
  _g52["*"] = _42;
  _g52["/"] = _47;
  _g52["%"] = _37;
  _g52[">"] = _62;
  _g52["<"] = _60;
  _g52["="] = _61;
  _g52[">="] = _6261;
  _g52["<="] = _6061;
  _g52["read-file"] = read_file;
  _g52["write-file"] = write_file;
  _g52.write = write;
  _g52.exit = exit;
  _g52["parse-number"] = parse_number;
  _g52["to-string"] = to_string;
  _g52.apply = apply;
  _g52["make-id"] = make_id;
  _g52["%message-handler"] = _37message_handler;
  _g52["toplevel?"] = toplevel63;
  _g52["module-key"] = module_key;
  _g52.module = module;
  _g52.setenv = setenv;
  _g52.math = math;
  _g52.type = type;
  _g52["splice?"] = splice63;
  _g52.mapl = mapl;
  _g52.fs = fs;
  _g52["id-count"] = id_count;
})();
(function () {
  var _g57 = nexus.runtime;
  var nil63 = _g57["nil?"];
  var is63 = _g57["is?"];
  var max = _g57.max;
  var min = _g57.min;
  var abs = _g57.abs;
  var acos = _g57.acos;
  var asin = _g57.asin;
  var atan = _g57.atan;
  var atan2 = _g57.atan2;
  var ceil = _g57.ceil;
  var cos = _g57.cos;
  var floor = _g57.floor;
  var log = _g57.log;
  var log10 = _g57.log10;
  var pow = _g57.pow;
  var random = _g57.random;
  var sin = _g57.sin;
  var sinh = _g57.sinh;
  var sqrt = _g57.sqrt;
  var tan = _g57.tan;
  var tanh = _g57.tanh;
  var length = _g57.length;
  var none63 = _g57["none?"];
  var some63 = _g57["some?"];
  var in63 = _g57["in?"];
  var hd = _g57.hd;
  var string63 = _g57["string?"];
  var number63 = _g57["number?"];
  var boolean63 = _g57["boolean?"];
  var function63 = _g57["function?"];
  var composite63 = _g57["composite?"];
  var atom63 = _g57["atom?"];
  var table63 = _g57["table?"];
  var list63 = _g57["list?"];
  var substring = _g57.substring;
  var sublist = _g57.sublist;
  var sub = _g57.sub;
  var inner = _g57.inner;
  var tl = _g57.tl;
  var char = _g57.char;
  var code = _g57.code;
  var string_literal63 = _g57["string-literal?"];
  var id_literal63 = _g57["id-literal?"];
  var add = _g57.add;
  var drop = _g57.drop;
  var last = _g57.last;
  var reverse = _g57.reverse;
  var join = _g57.join;
  var reduce = _g57.reduce;
  var keep = _g57.keep;
  var find = _g57.find;
  var pairwise = _g57.pairwise;
  var iterate = _g57.iterate;
  var replicate = _g57.replicate;
  var splice = _g57.splice;
  var map = _g57.map;
  var keys63 = _g57["keys?"];
  var empty63 = _g57["empty?"];
  var stash = _g57.stash;
  var unstash = _g57.unstash;
  var extend = _g57.extend;
  var exclude = _g57.exclude;
  var search = _g57.search;
  var split = _g57.split;
  var cat = _g57.cat;
  var _43 = _g57["+"];
  var _ = _g57["-"];
  var _42 = _g57["*"];
  var _47 = _g57["/"];
  var _37 = _g57["%"];
  var _62 = _g57[">"];
  var _60 = _g57["<"];
  var _61 = _g57["="];
  var _6261 = _g57[">="];
  var _6061 = _g57["<="];
  var read_file = _g57["read-file"];
  var write_file = _g57["write-file"];
  var write = _g57.write;
  var exit = _g57.exit;
  var parse_number = _g57["parse-number"];
  var to_string = _g57["to-string"];
  var apply = _g57.apply;
  var make_id = _g57["make-id"];
  var _37message_handler = _g57["%message-handler"];
  var toplevel63 = _g57["toplevel?"];
  var module_key = _g57["module-key"];
  var module = _g57.module;
  var setenv = _g57.setenv;
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g60 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g61 = undefined;
        var _g62 = _g60;
        var x = undefined;
        for (x in _g62) {
          if (isNaN(parseInt(x))) {
            var _g53 = _g62[x];
            _g61 = x;
          }
        }
        if (_g61) {
          return(b[_g61]);
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
      var _g63;
      if (c === "\n") {
        _g63 = "\\n";
      } else {
        var _g64;
        if (c === "\"") {
          _g64 = "\\\"";
        } else {
          var _g65;
          if (c === "\\") {
            _g65 = "\\\\";
          } else {
            _g65 = c;
          }
          _g64 = _g65;
        }
        _g63 = _g64;
      }
      var c1 = _g63;
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
      var _g66 = args;
      var k = undefined;
      for (k in _g66) {
        if (isNaN(parseInt(k))) {
          var v = _g66[k];
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
        var _g67 = lh;
        var i = 0;
        while (i < length(_g67)) {
          var x = _g67[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g68 = lh;
        var k = undefined;
        for (k in _g68) {
          if (isNaN(parseInt(k))) {
            var v = _g68[k];
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
      var _g69 = args;
      var _g70 = 0;
      while (_g70 < length(_g69)) {
        var arg = _g69[_g70];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g70 = _g70 + 1;
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
          var _g54 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g73 = args;
          var _g74 = 0;
          while (_g74 < length(_g73)) {
            var _g71 = _g73[_g74];
            setenv(_g71, {_stash: true, variable: true});
            _g74 = _g74 + 1;
          }
          var _g72 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g72);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g55 = form[0];
            var name = form[1];
            var _g75 = form[2];
            var _g76 = sub(form, 3);
            add(environment, {_scope: true});
            var _g79 = _g75;
            var _g80 = 0;
            while (_g80 < length(_g79)) {
              var _g77 = _g79[_g80];
              setenv(_g77, {_stash: true, variable: true});
              _g80 = _g80 + 1;
            }
            var _g78 = join([x, name, map(macroexpand, _g75)], macroexpand(_g76));
            drop(environment);
            return(_g78);
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
    var _g81 = form;
    var k = undefined;
    for (k in _g81) {
      if (isNaN(parseInt(k))) {
        var v = _g81[k];
        var _g86;
        if (quasisplice63(v, depth)) {
          _g86 = quasiexpand(v[1]);
        } else {
          _g86 = quasiexpand(v, depth);
        }
        var _g82 = _g86;
        last(xs)[k] = _g82;
      }
    }
    var _g83 = form;
    var _g84 = 0;
    while (_g84 < length(_g83)) {
      var x = _g83[_g84];
      if (quasisplice63(x, depth)) {
        var _g85 = quasiexpand(x[1]);
        add(xs, _g85);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g84 = _g84 + 1;
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
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
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
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while (i < length(id)) {
      var c = char(id, i);
      var n = code(c);
      var _g91;
      if (c === "-") {
        _g91 = "_";
      } else {
        var _g92;
        if (valid_char63(n)) {
          _g92 = c;
        } else {
          var _g93;
          if (i === 0) {
            _g93 = "_" + n;
          } else {
            _g93 = n;
          }
          _g92 = _g93;
        }
        _g91 = _g92;
      }
      var c1 = _g91;
      id1 = id1 + c1;
      i = i + 1;
    }
    return(id1);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g94 = module(current_module).export;
    var n = undefined;
    for (n in _g94) {
      if (isNaN(parseInt(n))) {
        var b = _g94[n];
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
    var _g95 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g95.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g96 = module(spec).export;
      var n = undefined;
      for (n in _g96) {
        if (isNaN(parseInt(n))) {
          var b = _g96[n];
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
    var _g97 = t;
    var k = undefined;
    for (k in _g97) {
      if (isNaN(parseInt(k))) {
        var v = _g97[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g56, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    var _g98 = ["table"];
    _g98.import = quoted(m.import);
    _g98.export = quote_frame(m.export);
    return(_g98);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g99 = {};
  nexus.utilities = _g99;
  _g99.getenv = getenv;
  _g99["macro-function"] = macro_function;
  _g99["macro?"] = macro63;
  _g99["special?"] = special63;
  _g99["special-form?"] = special_form63;
  _g99["statement?"] = statement63;
  _g99["symbol-expansion"] = symbol_expansion;
  _g99["symbol?"] = symbol63;
  _g99["variable?"] = variable63;
  _g99["bound?"] = bound63;
  _g99["toplevel?"] = toplevel63;
  _g99.quoted = quoted;
  _g99["stash*"] = stash42;
  _g99.bind = bind;
  _g99["bind*"] = bind42;
  _g99.quasiexpand = quasiexpand;
  _g99.macroexpand = macroexpand;
  _g99.indentation = indentation;
  _g99["reserved?"] = reserved63;
  _g99["valid-id?"] = valid_id63;
  _g99["to-id"] = to_id;
  _g99.imported = imported;
  _g99.exported = exported;
  _g99.mapo = mapo;
  _g99["quote-environment"] = quote_environment;
  _g99["quote-modules"] = quote_modules;
  _g99["initial-environment"] = initial_environment;
  _g99["global?"] = global63;
  _g99.escape = escape;
  _g99["quoting?"] = quoting63;
  _g99["quasiquoting?"] = quasiquoting63;
  _g99["can-unquote?"] = can_unquote63;
  _g99["quasisplice?"] = quasisplice63;
  _g99["quasiquote-list"] = quasiquote_list;
  _g99.reserved = reserved;
  _g99["numeric?"] = numeric63;
  _g99["valid-char?"] = valid_char63;
  _g99["quote-binding"] = quote_binding;
  _g99["quote-frame"] = quote_frame;
  _g99["quote-module"] = quote_module;
})();
(function () {
  var _g100 = nexus.runtime;
  var nil63 = _g100["nil?"];
  var is63 = _g100["is?"];
  var max = _g100.max;
  var min = _g100.min;
  var abs = _g100.abs;
  var acos = _g100.acos;
  var asin = _g100.asin;
  var atan = _g100.atan;
  var atan2 = _g100.atan2;
  var ceil = _g100.ceil;
  var cos = _g100.cos;
  var floor = _g100.floor;
  var log = _g100.log;
  var log10 = _g100.log10;
  var pow = _g100.pow;
  var random = _g100.random;
  var sin = _g100.sin;
  var sinh = _g100.sinh;
  var sqrt = _g100.sqrt;
  var tan = _g100.tan;
  var tanh = _g100.tanh;
  var length = _g100.length;
  var none63 = _g100["none?"];
  var some63 = _g100["some?"];
  var in63 = _g100["in?"];
  var hd = _g100.hd;
  var string63 = _g100["string?"];
  var number63 = _g100["number?"];
  var boolean63 = _g100["boolean?"];
  var function63 = _g100["function?"];
  var composite63 = _g100["composite?"];
  var atom63 = _g100["atom?"];
  var table63 = _g100["table?"];
  var list63 = _g100["list?"];
  var substring = _g100.substring;
  var sublist = _g100.sublist;
  var sub = _g100.sub;
  var inner = _g100.inner;
  var tl = _g100.tl;
  var char = _g100.char;
  var code = _g100.code;
  var string_literal63 = _g100["string-literal?"];
  var id_literal63 = _g100["id-literal?"];
  var add = _g100.add;
  var drop = _g100.drop;
  var last = _g100.last;
  var reverse = _g100.reverse;
  var join = _g100.join;
  var reduce = _g100.reduce;
  var keep = _g100.keep;
  var find = _g100.find;
  var pairwise = _g100.pairwise;
  var iterate = _g100.iterate;
  var replicate = _g100.replicate;
  var splice = _g100.splice;
  var map = _g100.map;
  var keys63 = _g100["keys?"];
  var empty63 = _g100["empty?"];
  var stash = _g100.stash;
  var unstash = _g100.unstash;
  var extend = _g100.extend;
  var exclude = _g100.exclude;
  var search = _g100.search;
  var split = _g100.split;
  var cat = _g100.cat;
  var _43 = _g100["+"];
  var _ = _g100["-"];
  var _42 = _g100["*"];
  var _47 = _g100["/"];
  var _37 = _g100["%"];
  var _62 = _g100[">"];
  var _60 = _g100["<"];
  var _61 = _g100["="];
  var _6261 = _g100[">="];
  var _6061 = _g100["<="];
  var read_file = _g100["read-file"];
  var write_file = _g100["write-file"];
  var write = _g100.write;
  var exit = _g100.exit;
  var parse_number = _g100["parse-number"];
  var to_string = _g100["to-string"];
  var apply = _g100.apply;
  var make_id = _g100["make-id"];
  var _37message_handler = _g100["%message-handler"];
  var toplevel63 = _g100["toplevel?"];
  var module_key = _g100["module-key"];
  var module = _g100.module;
  var setenv = _g100.setenv;
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
  function make_stream(str) {
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
    var n = parse_number(str);
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
  var _g110 = {};
  nexus.reader = _g110;
  _g110["make-stream"] = make_stream;
  _g110["read-table"] = read_table;
  _g110.read = read;
  _g110["read-all"] = read_all;
  _g110["read-from-string"] = read_from_string;
  _g110.delimiters = delimiters;
  _g110.whitespace = whitespace;
  _g110["peek-char"] = peek_char;
  _g110["read-char"] = read_char;
  _g110["skip-non-code"] = skip_non_code;
  _g110.eof = eof;
  _g110["key?"] = key63;
  _g110["flag?"] = flag63;
})();
(function () {
  var _g111 = nexus.runtime;
  var nil63 = _g111["nil?"];
  var is63 = _g111["is?"];
  var max = _g111.max;
  var min = _g111.min;
  var abs = _g111.abs;
  var acos = _g111.acos;
  var asin = _g111.asin;
  var atan = _g111.atan;
  var atan2 = _g111.atan2;
  var ceil = _g111.ceil;
  var cos = _g111.cos;
  var floor = _g111.floor;
  var log = _g111.log;
  var log10 = _g111.log10;
  var pow = _g111.pow;
  var random = _g111.random;
  var sin = _g111.sin;
  var sinh = _g111.sinh;
  var sqrt = _g111.sqrt;
  var tan = _g111.tan;
  var tanh = _g111.tanh;
  var length = _g111.length;
  var none63 = _g111["none?"];
  var some63 = _g111["some?"];
  var in63 = _g111["in?"];
  var hd = _g111.hd;
  var string63 = _g111["string?"];
  var number63 = _g111["number?"];
  var boolean63 = _g111["boolean?"];
  var function63 = _g111["function?"];
  var composite63 = _g111["composite?"];
  var atom63 = _g111["atom?"];
  var table63 = _g111["table?"];
  var list63 = _g111["list?"];
  var substring = _g111.substring;
  var sublist = _g111.sublist;
  var sub = _g111.sub;
  var inner = _g111.inner;
  var tl = _g111.tl;
  var char = _g111.char;
  var code = _g111.code;
  var string_literal63 = _g111["string-literal?"];
  var id_literal63 = _g111["id-literal?"];
  var add = _g111.add;
  var drop = _g111.drop;
  var last = _g111.last;
  var reverse = _g111.reverse;
  var join = _g111.join;
  var reduce = _g111.reduce;
  var keep = _g111.keep;
  var find = _g111.find;
  var pairwise = _g111.pairwise;
  var iterate = _g111.iterate;
  var replicate = _g111.replicate;
  var splice = _g111.splice;
  var map = _g111.map;
  var keys63 = _g111["keys?"];
  var empty63 = _g111["empty?"];
  var stash = _g111.stash;
  var unstash = _g111.unstash;
  var extend = _g111.extend;
  var exclude = _g111.exclude;
  var search = _g111.search;
  var split = _g111.split;
  var cat = _g111.cat;
  var _43 = _g111["+"];
  var _ = _g111["-"];
  var _42 = _g111["*"];
  var _47 = _g111["/"];
  var _37 = _g111["%"];
  var _62 = _g111[">"];
  var _60 = _g111["<"];
  var _61 = _g111["="];
  var _6261 = _g111[">="];
  var _6061 = _g111["<="];
  var read_file = _g111["read-file"];
  var write_file = _g111["write-file"];
  var write = _g111.write;
  var exit = _g111.exit;
  var parse_number = _g111["parse-number"];
  var to_string = _g111["to-string"];
  var apply = _g111.apply;
  var make_id = _g111["make-id"];
  var _37message_handler = _g111["%message-handler"];
  var toplevel63 = _g111["toplevel?"];
  var module_key = _g111["module-key"];
  var module = _g111.module;
  var setenv = _g111.setenv;
  var _g112 = nexus.utilities;
  var getenv = _g112.getenv;
  var macro_function = _g112["macro-function"];
  var macro63 = _g112["macro?"];
  var special63 = _g112["special?"];
  var special_form63 = _g112["special-form?"];
  var statement63 = _g112["statement?"];
  var symbol_expansion = _g112["symbol-expansion"];
  var symbol63 = _g112["symbol?"];
  var variable63 = _g112["variable?"];
  var bound63 = _g112["bound?"];
  var toplevel63 = _g112["toplevel?"];
  var quoted = _g112.quoted;
  var stash42 = _g112["stash*"];
  var bind = _g112.bind;
  var bind42 = _g112["bind*"];
  var quasiexpand = _g112.quasiexpand;
  var macroexpand = _g112.macroexpand;
  var indentation = _g112.indentation;
  var reserved63 = _g112["reserved?"];
  var valid_id63 = _g112["valid-id?"];
  var to_id = _g112["to-id"];
  var imported = _g112.imported;
  var exported = _g112.exported;
  var mapo = _g112.mapo;
  var quote_environment = _g112["quote-environment"];
  var quote_modules = _g112["quote-modules"];
  var initial_environment = _g112["initial-environment"];
  var _g115 = nexus.reader;
  var make_stream = _g115["make-stream"];
  var read_table = _g115["read-table"];
  var read = _g115.read;
  var read_all = _g115["read-all"];
  var read_from_string = _g115["read-from-string"];
  var _g119 = [];
  _g119.js = "!";
  _g119.lua = "not ";
  var _g117 = [];
  var _g120 = [];
  _g120.js = "!";
  _g120.lua = "not ";
  _g117["not"] = _g120;
  var _g122 = [];
  _g122["*"] = true;
  _g122["/"] = true;
  _g122["%"] = true;
  var _g124 = [];
  _g124["+"] = true;
  _g124["-"] = true;
  var _g128 = [];
  _g128.js = "+";
  _g128.lua = "..";
  var _g126 = [];
  var _g129 = [];
  _g129.js = "+";
  _g129.lua = "..";
  _g126.cat = _g129;
  var _g131 = [];
  _g131["<"] = true;
  _g131[">"] = true;
  _g131["<="] = true;
  _g131[">="] = true;
  var _g135 = [];
  _g135.js = "===";
  _g135.lua = "==";
  var _g137 = [];
  _g137.js = "!=";
  _g137.lua = "~=";
  var _g133 = [];
  var _g138 = [];
  _g138.js = "===";
  _g138.lua = "==";
  _g133["="] = _g138;
  var _g139 = [];
  _g139.js = "!=";
  _g139.lua = "~=";
  _g133["~="] = _g139;
  var _g143 = [];
  _g143.js = "&&";
  _g143.lua = "and";
  var _g141 = [];
  var _g144 = [];
  _g144.js = "&&";
  _g144.lua = "and";
  _g141["and"] = _g144;
  var _g148 = [];
  _g148.js = "||";
  _g148.lua = "or";
  var _g146 = [];
  var _g149 = [];
  _g149.js = "||";
  _g149.lua = "or";
  _g146["or"] = _g149;
  var infix = [_g117, _g122, _g124, _g126, _g131, _g133, _g141, _g146];
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g150 = infix;
      var i = 0;
      while (i < length(_g150)) {
        var level = _g150[i];
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
    var _g151 = args;
    var i = 0;
    while (i < length(_g151)) {
      var arg = _g151[i];
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
              return(to_id(x));
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
                  throw new Error("Unrecognized atom");
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
    var _g152 = getenv(x);
    var special = _g152.special;
    var stmt = _g152.stmt;
    var self_tr63 = _g152.tr;
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
    var _g153 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g153.right;
    var _g154;
    if (right) {
      _g154 = _6261;
    } else {
      _g154 = _62;
    }
    if (_g154(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g155 = sub(form, 1);
    var a = _g155[0];
    var b = _g155[1];
    var _g156 = op_delims(form, a);
    var ao = _g156[0];
    var ac = _g156[1];
    var _g157 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g157[0];
    var bc = _g157[1];
    var _g158 = compile(a);
    var _g159 = compile(b);
    var _g160 = getop(op);
    if (unary63(form)) {
      return(_g160 + ao + _g158 + ac);
    } else {
      return(ao + _g158 + ac + " " + _g160 + " " + bo + _g159 + bc);
    }
  }
  function compile_function(args, body) {
    var _g161 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g161.name;
    var prefix = _g161.prefix;
    var _g166;
    if (name) {
      _g166 = compile(name);
    } else {
      _g166 = "";
    }
    var id = _g166;
    var _g162 = prefix || "";
    var _g163 = compile_args(args);
    indent_level = indent_level + 1;
    var _g165 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g164 = _g165;
    var ind = indentation();
    var _g167;
    if (target === "js") {
      _g167 = "";
    } else {
      _g167 = "end";
    }
    var tr = _g167;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g163 + " {\n" + _g164 + ind + "}" + tr);
    } else {
      return(_g162 + "function " + id + _g163 + "\n" + _g164 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g168 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g168.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g170;
        if (stmt) {
          _g170 = indentation();
        } else {
          _g170 = "";
        }
        var ind = _g170;
        var _g171;
        if (atom63(form)) {
          _g171 = compile_atom(form);
        } else {
          var _g172;
          if (infix63(hd(form))) {
            _g172 = compile_infix(form);
          } else {
            _g172 = compile_call(form);
          }
          _g171 = _g172;
        }
        var _g169 = _g171;
        return(ind + _g169 + tr);
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
    var _g173 = sub(args, 0, length(args) - 1);
    var _g174 = 0;
    while (_g174 < length(_g173)) {
      var x = _g173[_g174];
      add(hoist, lower(x, hoist, stmt63));
      _g174 = _g174 + 1;
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
    var _g175 = args[1];
    var _g176 = args[2];
    if (stmt63 || tail63) {
      var _g178;
      if (_g176) {
        _g178 = [lower_body([_g176], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g175], tail63)], _g178)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g177;
      if (_g176) {
        _g177 = [lower(["set", e, _g176])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g175])], _g177));
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
      var _g179;
      if (x === "and") {
        _g179 = ["%if", id, b, id];
      } else {
        _g179 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g179], hoist));
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
    var _g180 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g180, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g181 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g181)) {
      return(_g181);
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
  global.lower = lower;
  function process(form) {
    return(lower(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return(module_key(spec) + ".l");
  }
  function encapsulate(body) {
    var _g182 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g182, epilog))]]);
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
    var _g183 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g183.all;
    var m = module(spec);
    var frame = last(environment);
    var _g184 = m.export;
    var k = undefined;
    for (k in _g184) {
      if (isNaN(parseInt(k))) {
        var v = _g184[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g185 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g185.all;
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
    var _g186 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g186));
    target = previous;
    return(run(compiled));
  }
  var _g187 = {};
  nexus.compiler = _g187;
  _g187["compile-function"] = compile_function;
  _g187.compile = compile;
  _g187["open-module"] = open_module;
  _g187["load-module"] = load_module;
  _g187["in-module"] = in_module;
  _g187["compile-module"] = compile_module;
  _g187.eval = eval;
  _g187.infix = infix;
  _g187["unary?"] = unary63;
  _g187.precedence = precedence;
  _g187.getop = getop;
  _g187["infix?"] = infix63;
  _g187["compile-args"] = compile_args;
  _g187["compile-atom"] = compile_atom;
  _g187.terminator = terminator;
  _g187["compile-special"] = compile_special;
  _g187["parenthesize-call?"] = parenthesize_call63;
  _g187["compile-call"] = compile_call;
  _g187["op-delims"] = op_delims;
  _g187["compile-infix"] = compile_infix;
  _g187["can-return?"] = can_return63;
  _g187.lower = lower;
  _g187["lower-statement"] = lower_statement;
  _g187["lower-body"] = lower_body;
  _g187["lower-do"] = lower_do;
  _g187["lower-if"] = lower_if;
  _g187["lower-short"] = lower_short;
  _g187["lower-try"] = lower_try;
  _g187["lower-while"] = lower_while;
  _g187["lower-for"] = lower_for;
  _g187["lower-function"] = lower_function;
  _g187["lower-definition"] = lower_definition;
  _g187["lower-call"] = lower_call;
  _g187["lower-infix?"] = lower_infix63;
  _g187["lower-infix"] = lower_infix;
  _g187["lower-special"] = lower_special;
  _g187.process = process;
  _g187["module-path"] = module_path;
  _g187.encapsulate = encapsulate;
  _g187["compile-file"] = compile_file;
  _g187.run = run;
  _g187["compiling?"] = compiling63;
  _g187["compiler-output"] = compiler_output;
  _g187["%compile-module"] = _37compile_module;
  _g187.prologue = prologue;
})();
(function () {
  var _g188 = nexus.runtime;
  var nil63 = _g188["nil?"];
  var is63 = _g188["is?"];
  var max = _g188.max;
  var min = _g188.min;
  var abs = _g188.abs;
  var acos = _g188.acos;
  var asin = _g188.asin;
  var atan = _g188.atan;
  var atan2 = _g188.atan2;
  var ceil = _g188.ceil;
  var cos = _g188.cos;
  var floor = _g188.floor;
  var log = _g188.log;
  var log10 = _g188.log10;
  var pow = _g188.pow;
  var random = _g188.random;
  var sin = _g188.sin;
  var sinh = _g188.sinh;
  var sqrt = _g188.sqrt;
  var tan = _g188.tan;
  var tanh = _g188.tanh;
  var length = _g188.length;
  var none63 = _g188["none?"];
  var some63 = _g188["some?"];
  var in63 = _g188["in?"];
  var hd = _g188.hd;
  var string63 = _g188["string?"];
  var number63 = _g188["number?"];
  var boolean63 = _g188["boolean?"];
  var function63 = _g188["function?"];
  var composite63 = _g188["composite?"];
  var atom63 = _g188["atom?"];
  var table63 = _g188["table?"];
  var list63 = _g188["list?"];
  var substring = _g188.substring;
  var sublist = _g188.sublist;
  var sub = _g188.sub;
  var inner = _g188.inner;
  var tl = _g188.tl;
  var char = _g188.char;
  var code = _g188.code;
  var string_literal63 = _g188["string-literal?"];
  var id_literal63 = _g188["id-literal?"];
  var add = _g188.add;
  var drop = _g188.drop;
  var last = _g188.last;
  var reverse = _g188.reverse;
  var join = _g188.join;
  var reduce = _g188.reduce;
  var keep = _g188.keep;
  var find = _g188.find;
  var pairwise = _g188.pairwise;
  var iterate = _g188.iterate;
  var replicate = _g188.replicate;
  var splice = _g188.splice;
  var map = _g188.map;
  var keys63 = _g188["keys?"];
  var empty63 = _g188["empty?"];
  var stash = _g188.stash;
  var unstash = _g188.unstash;
  var extend = _g188.extend;
  var exclude = _g188.exclude;
  var search = _g188.search;
  var split = _g188.split;
  var cat = _g188.cat;
  var _43 = _g188["+"];
  var _ = _g188["-"];
  var _42 = _g188["*"];
  var _47 = _g188["/"];
  var _37 = _g188["%"];
  var _62 = _g188[">"];
  var _60 = _g188["<"];
  var _61 = _g188["="];
  var _6261 = _g188[">="];
  var _6061 = _g188["<="];
  var read_file = _g188["read-file"];
  var write_file = _g188["write-file"];
  var write = _g188.write;
  var exit = _g188.exit;
  var parse_number = _g188["parse-number"];
  var to_string = _g188["to-string"];
  var apply = _g188.apply;
  var make_id = _g188["make-id"];
  var _37message_handler = _g188["%message-handler"];
  var toplevel63 = _g188["toplevel?"];
  var module_key = _g188["module-key"];
  var module = _g188.module;
  var setenv = _g188.setenv;
  var _g189 = nexus.utilities;
  var getenv = _g189.getenv;
  var macro_function = _g189["macro-function"];
  var macro63 = _g189["macro?"];
  var special63 = _g189["special?"];
  var special_form63 = _g189["special-form?"];
  var statement63 = _g189["statement?"];
  var symbol_expansion = _g189["symbol-expansion"];
  var symbol63 = _g189["symbol?"];
  var variable63 = _g189["variable?"];
  var bound63 = _g189["bound?"];
  var toplevel63 = _g189["toplevel?"];
  var quoted = _g189.quoted;
  var stash42 = _g189["stash*"];
  var bind = _g189.bind;
  var bind42 = _g189["bind*"];
  var quasiexpand = _g189.quasiexpand;
  var macroexpand = _g189.macroexpand;
  var indentation = _g189.indentation;
  var reserved63 = _g189["reserved?"];
  var valid_id63 = _g189["valid-id?"];
  var to_id = _g189["to-id"];
  var imported = _g189.imported;
  var exported = _g189.exported;
  var mapo = _g189.mapo;
  var quote_environment = _g189["quote-environment"];
  var quote_modules = _g189["quote-modules"];
  var initial_environment = _g189["initial-environment"];
  var _g192 = nexus.compiler;
  var compile_function = _g192["compile-function"];
  var compile = _g192.compile;
  var open_module = _g192["open-module"];
  var load_module = _g192["load-module"];
  var in_module = _g192["in-module"];
  var compile_module = _g192["compile-module"];
  var eval = _g192.eval;
  var lower = _g192.lower;
})();
(function () {
  var _g350 = nexus.runtime;
  var nil63 = _g350["nil?"];
  var is63 = _g350["is?"];
  var max = _g350.max;
  var min = _g350.min;
  var abs = _g350.abs;
  var acos = _g350.acos;
  var asin = _g350.asin;
  var atan = _g350.atan;
  var atan2 = _g350.atan2;
  var ceil = _g350.ceil;
  var cos = _g350.cos;
  var floor = _g350.floor;
  var log = _g350.log;
  var log10 = _g350.log10;
  var pow = _g350.pow;
  var random = _g350.random;
  var sin = _g350.sin;
  var sinh = _g350.sinh;
  var sqrt = _g350.sqrt;
  var tan = _g350.tan;
  var tanh = _g350.tanh;
  var length = _g350.length;
  var none63 = _g350["none?"];
  var some63 = _g350["some?"];
  var in63 = _g350["in?"];
  var hd = _g350.hd;
  var string63 = _g350["string?"];
  var number63 = _g350["number?"];
  var boolean63 = _g350["boolean?"];
  var function63 = _g350["function?"];
  var composite63 = _g350["composite?"];
  var atom63 = _g350["atom?"];
  var table63 = _g350["table?"];
  var list63 = _g350["list?"];
  var substring = _g350.substring;
  var sublist = _g350.sublist;
  var sub = _g350.sub;
  var inner = _g350.inner;
  var tl = _g350.tl;
  var char = _g350.char;
  var code = _g350.code;
  var string_literal63 = _g350["string-literal?"];
  var id_literal63 = _g350["id-literal?"];
  var add = _g350.add;
  var drop = _g350.drop;
  var last = _g350.last;
  var reverse = _g350.reverse;
  var join = _g350.join;
  var reduce = _g350.reduce;
  var keep = _g350.keep;
  var find = _g350.find;
  var pairwise = _g350.pairwise;
  var iterate = _g350.iterate;
  var replicate = _g350.replicate;
  var splice = _g350.splice;
  var map = _g350.map;
  var keys63 = _g350["keys?"];
  var empty63 = _g350["empty?"];
  var stash = _g350.stash;
  var unstash = _g350.unstash;
  var extend = _g350.extend;
  var exclude = _g350.exclude;
  var search = _g350.search;
  var split = _g350.split;
  var cat = _g350.cat;
  var _43 = _g350["+"];
  var _ = _g350["-"];
  var _42 = _g350["*"];
  var _47 = _g350["/"];
  var _37 = _g350["%"];
  var _62 = _g350[">"];
  var _60 = _g350["<"];
  var _61 = _g350["="];
  var _6261 = _g350[">="];
  var _6061 = _g350["<="];
  var read_file = _g350["read-file"];
  var write_file = _g350["write-file"];
  var write = _g350.write;
  var exit = _g350.exit;
  var parse_number = _g350["parse-number"];
  var to_string = _g350["to-string"];
  var apply = _g350.apply;
  var make_id = _g350["make-id"];
  var _37message_handler = _g350["%message-handler"];
  var toplevel63 = _g350["toplevel?"];
  var module_key = _g350["module-key"];
  var module = _g350.module;
  var setenv = _g350.setenv;
  var _g351 = nexus.utilities;
  var getenv = _g351.getenv;
  var macro_function = _g351["macro-function"];
  var macro63 = _g351["macro?"];
  var special63 = _g351["special?"];
  var special_form63 = _g351["special-form?"];
  var statement63 = _g351["statement?"];
  var symbol_expansion = _g351["symbol-expansion"];
  var symbol63 = _g351["symbol?"];
  var variable63 = _g351["variable?"];
  var bound63 = _g351["bound?"];
  var toplevel63 = _g351["toplevel?"];
  var quoted = _g351.quoted;
  var stash42 = _g351["stash*"];
  var bind = _g351.bind;
  var bind42 = _g351["bind*"];
  var quasiexpand = _g351.quasiexpand;
  var macroexpand = _g351.macroexpand;
  var indentation = _g351.indentation;
  var reserved63 = _g351["reserved?"];
  var valid_id63 = _g351["valid-id?"];
  var to_id = _g351["to-id"];
  var imported = _g351.imported;
  var exported = _g351.exported;
  var mapo = _g351.mapo;
  var quote_environment = _g351["quote-environment"];
  var quote_modules = _g351["quote-modules"];
  var initial_environment = _g351["initial-environment"];
  var _g354 = nexus.compiler;
  var compile_function = _g354["compile-function"];
  var compile = _g354.compile;
  var open_module = _g354["open-module"];
  var load_module = _g354["load-module"];
  var in_module = _g354["in-module"];
  var compile_module = _g354["compile-module"];
  var eval = _g354.eval;
  var lower = _g354.lower;
  global.target = "js";
})();
(function () {
  var _g620 = nexus.runtime;
  var nil63 = _g620["nil?"];
  var is63 = _g620["is?"];
  var max = _g620.max;
  var min = _g620.min;
  var abs = _g620.abs;
  var acos = _g620.acos;
  var asin = _g620.asin;
  var atan = _g620.atan;
  var atan2 = _g620.atan2;
  var ceil = _g620.ceil;
  var cos = _g620.cos;
  var floor = _g620.floor;
  var log = _g620.log;
  var log10 = _g620.log10;
  var pow = _g620.pow;
  var random = _g620.random;
  var sin = _g620.sin;
  var sinh = _g620.sinh;
  var sqrt = _g620.sqrt;
  var tan = _g620.tan;
  var tanh = _g620.tanh;
  var length = _g620.length;
  var none63 = _g620["none?"];
  var some63 = _g620["some?"];
  var in63 = _g620["in?"];
  var hd = _g620.hd;
  var string63 = _g620["string?"];
  var number63 = _g620["number?"];
  var boolean63 = _g620["boolean?"];
  var function63 = _g620["function?"];
  var composite63 = _g620["composite?"];
  var atom63 = _g620["atom?"];
  var table63 = _g620["table?"];
  var list63 = _g620["list?"];
  var substring = _g620.substring;
  var sublist = _g620.sublist;
  var sub = _g620.sub;
  var inner = _g620.inner;
  var tl = _g620.tl;
  var char = _g620.char;
  var code = _g620.code;
  var string_literal63 = _g620["string-literal?"];
  var id_literal63 = _g620["id-literal?"];
  var add = _g620.add;
  var drop = _g620.drop;
  var last = _g620.last;
  var reverse = _g620.reverse;
  var join = _g620.join;
  var reduce = _g620.reduce;
  var keep = _g620.keep;
  var find = _g620.find;
  var pairwise = _g620.pairwise;
  var iterate = _g620.iterate;
  var replicate = _g620.replicate;
  var splice = _g620.splice;
  var map = _g620.map;
  var keys63 = _g620["keys?"];
  var empty63 = _g620["empty?"];
  var stash = _g620.stash;
  var unstash = _g620.unstash;
  var extend = _g620.extend;
  var exclude = _g620.exclude;
  var search = _g620.search;
  var split = _g620.split;
  var cat = _g620.cat;
  var _43 = _g620["+"];
  var _ = _g620["-"];
  var _42 = _g620["*"];
  var _47 = _g620["/"];
  var _37 = _g620["%"];
  var _62 = _g620[">"];
  var _60 = _g620["<"];
  var _61 = _g620["="];
  var _6261 = _g620[">="];
  var _6061 = _g620["<="];
  var read_file = _g620["read-file"];
  var write_file = _g620["write-file"];
  var write = _g620.write;
  var exit = _g620.exit;
  var parse_number = _g620["parse-number"];
  var to_string = _g620["to-string"];
  var apply = _g620.apply;
  var make_id = _g620["make-id"];
  var _37message_handler = _g620["%message-handler"];
  var toplevel63 = _g620["toplevel?"];
  var module_key = _g620["module-key"];
  var module = _g620.module;
  var setenv = _g620.setenv;
  var _g621 = nexus.utilities;
  var getenv = _g621.getenv;
  var macro_function = _g621["macro-function"];
  var macro63 = _g621["macro?"];
  var special63 = _g621["special?"];
  var special_form63 = _g621["special-form?"];
  var statement63 = _g621["statement?"];
  var symbol_expansion = _g621["symbol-expansion"];
  var symbol63 = _g621["symbol?"];
  var variable63 = _g621["variable?"];
  var bound63 = _g621["bound?"];
  var toplevel63 = _g621["toplevel?"];
  var quoted = _g621.quoted;
  var stash42 = _g621["stash*"];
  var bind = _g621.bind;
  var bind42 = _g621["bind*"];
  var quasiexpand = _g621.quasiexpand;
  var macroexpand = _g621.macroexpand;
  var indentation = _g621.indentation;
  var reserved63 = _g621["reserved?"];
  var valid_id63 = _g621["valid-id?"];
  var to_id = _g621["to-id"];
  var imported = _g621.imported;
  var exported = _g621.exported;
  var mapo = _g621.mapo;
  var quote_environment = _g621["quote-environment"];
  var quote_modules = _g621["quote-modules"];
  var initial_environment = _g621["initial-environment"];
  var _g624 = nexus.compiler;
  var compile_function = _g624["compile-function"];
  var compile = _g624.compile;
  var open_module = _g624["open-module"];
  var load_module = _g624["load-module"];
  var in_module = _g624["in-module"];
  var compile_module = _g624["compile-module"];
  var eval = _g624.eval;
  var lower = _g624.lower;
  global.modules = {main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g637 = sub(specs, 0);
    map(compile_module, _g637);
    return(undefined);
  }}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimizations: {variable: true}, "define-optimization": {}, optimize: {variable: true, export: true}}}, runtime: {import: ["special", "core"], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, ceil: {export: true, variable: true}, cos: {export: true, variable: true}, floor: {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, pow: {export: true, variable: true}, random: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, sqrt: {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "in?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sublist: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, find: {export: true, variable: true}, pairwise: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, splice: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, extend: {export: true, variable: true}, exclude: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, "parse-number": {export: true, variable: true}, "to-string": {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, math: {variable: true}, type: {variable: true}, "splice?": {variable: true}, mapl: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g638) {
    var char = _g638[0];
    var stream = _g638[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g639 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g639)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, at: {macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, list: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g640 = body;
      var k = undefined;
      for (k in _g640) {
        if (isNaN(parseInt(k))) {
          var v = _g640[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    function step(_g641) {
      var a = _g641[0];
      var b = _g641[1];
      var c = sub(_g641, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g642 = sub(body, 0);
    return(["if", cond, join(["do"], _g642)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g643 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g643)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (_g349, x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g644 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g645) {
      var lh = _g645[0];
      var rh = _g645[1];
      var _g646 = bind(lh, rh);
      var _g647 = 0;
      while (_g647 < length(_g646)) {
        var _g648 = _g646[_g647];
        var id = _g648[0];
        var val = _g648[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g647 = _g647 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g644)])));
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g649 = sub(body, 0);
    var imports = [];
    var imp = _g649.import;
    var exp = _g649.export;
    var _g650 = imp || [];
    var _g651 = 0;
    while (_g651 < length(_g650)) {
      var k = _g650[_g651];
      load_module(k);
      imports = join(imports, imported(k));
      _g651 = _g651 + 1;
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g652 = exp || [];
    var _g653 = 0;
    while (_g653 < length(_g652)) {
      var k = _g652[_g653];
      setenv(k, {_stash: true, export: true});
      _g653 = _g653 + 1;
    }
    return(join(["do"], imports));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g654 = sub(body, 0);
    var form = join(["fn", args], _g654);
    var _g655 = ["setenv", ["quote", name]];
    _g655.macro = form;
    _g655.form = ["quote", form];
    eval(_g655);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g656 = sub(body, 0);
    var form = join(["fn", args], _g656);
    var keys = sub(_g656, length(_g656));
    var _g657 = ["setenv", ["quote", name]];
    _g657.special = form;
    _g657.form = ["quote", form];
    eval(join(_g657, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g658 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g658)) {
      var _g659 = bind42(x, _g658);
      var args = _g659[0];
      var _g660 = _g659[1];
      return(join(["%local-function", name, args], _g660));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g661 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g661)) {
      var _g662 = bind42(x, _g661);
      var args = _g662[0];
      var _g663 = _g662[1];
      return(join(["%global-function", name, args], _g663));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, "with-bindings": {macro: function (_g664) {
    var names = _g664[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g665 = sub(body, 0);
    var x = make_id();
    var _g667 = ["setenv", x];
    _g667.variable = true;
    var _g666 = ["with-frame", ["each", [x], names, _g667]];
    _g666.scope = true;
    return(join(_g666, _g665));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g668 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g669 = join(["do"], macroexpand(_g668));
    drop(environment);
    return(_g669);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g670 = sub(body, 0);
    add(environment, {});
    map(function (_g672) {
      var name = _g672[0];
      var exp = _g672[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g671 = join(["do"], macroexpand(_g670));
    drop(environment);
    return(_g671);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g673 = sub(body, 0);
    var _g674 = bind42(args, _g673);
    var _g675 = _g674[0];
    var _g676 = _g674[1];
    return(join(["%function", _g675], _g676));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g677 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g708;
    if (nil63(v)) {
      var _g709;
      if (b.i) {
        _g709 = "i";
      } else {
        _g709 = make_id();
      }
      var i = _g709;
      _g708 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g677), ["inc", i]]];
    } else {
      var _g678 = ["target"];
      _g678.js = ["isNaN", ["parseInt", k]];
      _g678.lua = ["not", ["number?", k]];
      _g708 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g678, join(["let", [v, ["get", t1, k]]], _g677)]]];
    }
    return(["let", [t1, t], _g708]);
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g679 = elements;
    var _g680 = 0;
    while (_g680 < length(_g679)) {
      var e = _g679[_g680];
      l[e] = true;
      _g680 = _g680 + 1;
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g681 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g681)]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g682 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g682)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g683 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g683)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g684 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g685 = ["table"];
    _g685._scope = scope;
    return(["do", ["add", "environment", _g685], ["let", [x, join(["do"], _g684)], ["drop", "environment"], x]]);
  }, export: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"do": {foo: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g686 = forms;
    var _g687 = 0;
    while (_g687 < length(_g686)) {
      var x = _g686[_g687];
      str = str + compile(x, {_stash: true, stmt: true});
      _g687 = _g687 + 1;
    }
    return(str);
  }, stmt: true, export: true}, "%if": {foo: true, tr: true, special: function (cond, cons, alt) {
    var _g688 = compile(cond);
    indent_level = indent_level + 1;
    var _g691 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g689 = _g691;
    var _g710;
    if (alt) {
      indent_level = indent_level + 1;
      var _g692 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g710 = _g692;
    }
    var _g690 = _g710;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g688 + ") {\n" + _g689 + ind + "}";
    } else {
      str = str + ind + "if " + _g688 + " then\n" + _g689;
    }
    if (_g690 && target === "js") {
      str = str + " else {\n" + _g690 + ind + "}";
    } else {
      if (_g690) {
        str = str + ind + "else\n" + _g690;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, stmt: true, export: true}, "while": {foo: true, tr: true, special: function (cond, form) {
    var _g693 = compile(cond);
    indent_level = indent_level + 1;
    var _g694 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g694;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g693 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g693 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, export: true}, "%for": {foo: true, tr: true, special: function (t, k, form) {
    var _g695 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g696 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g696;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g695 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g695 + ") {\n" + body + ind + "}\n");
    }
  }, stmt: true, export: true}, "%try": {foo: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g697 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g697;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g698 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g698;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, export: true}, "break": {stmt: true, export: true, foo: true, special: function () {
    return(indentation() + "break");
  }}, "%function": {foo: true, special: function (args, body) {
    return(compile_function(args, body));
  }, export: true}, "%global-function": {foo: true, tr: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, stmt: true, export: true}, "%local-function": {foo: true, tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, export: true}, "return": {stmt: true, export: true, foo: true, special: function (x) {
    var _g711;
    if (nil63(x)) {
      _g711 = "return";
    } else {
      _g711 = "return(" + compile(x) + ")";
    }
    var _g699 = _g711;
    return(indentation() + _g699);
  }}, "error": {stmt: true, export: true, foo: true, special: function (x) {
    var _g712;
    if (target === "js") {
      _g712 = "throw new " + compile(["Error", x]);
    } else {
      _g712 = "error(" + compile(x) + ")";
    }
    var e = _g712;
    return(indentation() + e);
  }}, "%local": {stmt: true, export: true, foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g713;
    if (is63(value)) {
      _g713 = " = " + value1;
    } else {
      _g713 = "";
    }
    var rh = _g713;
    var _g714;
    if (target === "js") {
      _g714 = "var ";
    } else {
      _g714 = "local ";
    }
    var keyword = _g714;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }}, "set": {stmt: true, export: true, foo: true, special: function (lh, rh) {
    var _g700 = compile(lh);
    var _g715;
    if (nil63(rh)) {
      _g715 = "nil";
    } else {
      _g715 = rh;
    }
    var _g701 = compile(_g715);
    return(indentation() + _g700 + " = " + _g701);
  }}, "get": {foo: true, special: function (t, k) {
    var _g702 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g702, 0) === "{") {
      _g702 = "(" + _g702 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g702 + "." + inner(k));
    } else {
      return(_g702 + "[" + k1 + "]");
    }
  }, export: true}, "not": {}, "%array": {foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g716;
    if (target === "lua") {
      _g716 = "{";
    } else {
      _g716 = "[";
    }
    var open = _g716;
    var _g717;
    if (target === "lua") {
      _g717 = "}";
    } else {
      _g717 = "]";
    }
    var close = _g717;
    var str = "";
    var _g703 = forms;
    var i = 0;
    while (i < length(_g703)) {
      var x = _g703[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, export: true}, "%object": {foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g718;
    if (target === "lua") {
      _g718 = " = ";
    } else {
      _g718 = ": ";
    }
    var sep = _g718;
    var pairs = pairwise(forms);
    var _g704 = pairs;
    var i = 0;
    while (i < length(_g704)) {
      var _g705 = _g704[i];
      var k = _g705[0];
      var v = _g705[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + to_string(k));
      }
      var _g706 = compile(v);
      var _g719;
      if (valid_id63(k)) {
        _g719 = k;
      } else {
        var _g720;
        if (target === "js" && string_literal63(k)) {
          _g720 = k;
        } else {
          var _g721;
          if (target === "js") {
            _g721 = quoted(k);
          } else {
            var _g722;
            if (string_literal63(k)) {
              _g722 = "[" + k + "]";
            } else {
              _g722 = "[" + quoted(k) + "]";
            }
            _g721 = _g722;
          }
          _g720 = _g721;
        }
        _g719 = _g720;
      }
      var _g707 = _g719;
      str = str + _g707 + sep + _g706;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }, export: true}}}, lib: {import: ["core", "special"], export: {}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "compile-module": {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true, global: true, export: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, "%compile-module": {variable: true}, prologue: {variable: true}}}, utilities: {import: ["runtime", "special", "core"], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "to-id": {export: true, variable: true}, imported: {export: true, variable: true}, exported: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-char?": {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g723 = sub(body, 0);
    var imports = [];
    var imp = _g723.import;
    var exp = _g723.export;
    var _g724 = imp || [];
    var _g725 = 0;
    while (_g725 < length(_g724)) {
      var k = _g724[_g725];
      load_module(k);
      imports = join(imports, imported(k));
      _g725 = _g725 + 1;
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g726 = exp || [];
    var _g727 = 0;
    while (_g727 < length(_g726)) {
      var k = _g726[_g727];
      setenv(k, {_stash: true, export: true});
      _g727 = _g727 + 1;
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var nil63 = _g2["nil?"];
  var is63 = _g2["is?"];
  var max = _g2.max;
  var min = _g2.min;
  var abs = _g2.abs;
  var acos = _g2.acos;
  var asin = _g2.asin;
  var atan = _g2.atan;
  var atan2 = _g2.atan2;
  var ceil = _g2.ceil;
  var cos = _g2.cos;
  var floor = _g2.floor;
  var log = _g2.log;
  var log10 = _g2.log10;
  var pow = _g2.pow;
  var random = _g2.random;
  var sin = _g2.sin;
  var sinh = _g2.sinh;
  var sqrt = _g2.sqrt;
  var tan = _g2.tan;
  var tanh = _g2.tanh;
  var length = _g2.length;
  var none63 = _g2["none?"];
  var some63 = _g2["some?"];
  var in63 = _g2["in?"];
  var hd = _g2.hd;
  var string63 = _g2["string?"];
  var number63 = _g2["number?"];
  var boolean63 = _g2["boolean?"];
  var function63 = _g2["function?"];
  var composite63 = _g2["composite?"];
  var atom63 = _g2["atom?"];
  var table63 = _g2["table?"];
  var list63 = _g2["list?"];
  var substring = _g2.substring;
  var sublist = _g2.sublist;
  var sub = _g2.sub;
  var inner = _g2.inner;
  var tl = _g2.tl;
  var char = _g2.char;
  var code = _g2.code;
  var string_literal63 = _g2["string-literal?"];
  var id_literal63 = _g2["id-literal?"];
  var add = _g2.add;
  var drop = _g2.drop;
  var last = _g2.last;
  var reverse = _g2.reverse;
  var join = _g2.join;
  var reduce = _g2.reduce;
  var keep = _g2.keep;
  var find = _g2.find;
  var pairwise = _g2.pairwise;
  var iterate = _g2.iterate;
  var replicate = _g2.replicate;
  var splice = _g2.splice;
  var map = _g2.map;
  var keys63 = _g2["keys?"];
  var empty63 = _g2["empty?"];
  var stash = _g2.stash;
  var unstash = _g2.unstash;
  var extend = _g2.extend;
  var exclude = _g2.exclude;
  var search = _g2.search;
  var split = _g2.split;
  var cat = _g2.cat;
  var _43 = _g2["+"];
  var _ = _g2["-"];
  var _42 = _g2["*"];
  var _47 = _g2["/"];
  var _37 = _g2["%"];
  var _62 = _g2[">"];
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _6261 = _g2[">="];
  var _6061 = _g2["<="];
  var read_file = _g2["read-file"];
  var write_file = _g2["write-file"];
  var write = _g2.write;
  var exit = _g2.exit;
  var parse_number = _g2["parse-number"];
  var to_string = _g2["to-string"];
  var apply = _g2.apply;
  var make_id = _g2["make-id"];
  var _37message_handler = _g2["%message-handler"];
  var toplevel63 = _g2["toplevel?"];
  var module_key = _g2["module-key"];
  var module = _g2.module;
  var setenv = _g2.setenv;
  var _g5 = nexus.reader;
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus.compiler;
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  var lower = _g6.lower;
  function rep(str) {
    var _g729 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g732) {
        return([false, _g732.message]);
      }
    })();
    var _g1 = _g729[0];
    var x = _g729[1];
    if (is63(x)) {
      return(print(to_string(x) + " "));
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
    print(to_string("usage: lumen [options] <module>") + " ");
    print(to_string("options:") + " ");
    print(to_string("  -o <output>\tOutput file") + " ");
    print(to_string("  -t <target>\tTarget language (default: lua)") + " ");
    print(to_string("  -e <expr>\tExpression to evaluate") + " ");
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
    var _g730 = args;
    var i = 0;
    while (i < length(_g730)) {
      var arg = _g730[i];
      if (arg === "-o" || arg === "-t" || arg === "-e") {
        if (i === length(args) - 1) {
          print(to_string("missing argument for") + " " + to_string(arg) + " ");
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
  var _g731 = {};
  nexus.main = _g731;
  _g731.rep = rep;
  _g731.repl = repl;
  _g731.usage = usage;
  _g731.main = main;
})();
