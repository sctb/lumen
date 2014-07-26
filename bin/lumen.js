global.nexus = {};
(function () {
  nexus["lumen/runtime"] = {};
  function nil63(x) {
    return(x === undefined);
  }
  nexus["lumen/runtime"]["nil?"] = nil63;
  function is63(x) {
    return(!nil63(x));
  }
  nexus["lumen/runtime"]["is?"] = is63;
  var math = Math;
  nexus["lumen/runtime"].math = math;
  var abs = math.abs;
  nexus["lumen/runtime"].abs = abs;
  var acos = math.acos;
  nexus["lumen/runtime"].acos = acos;
  var asin = math.asin;
  nexus["lumen/runtime"].asin = asin;
  var atan = math.atan;
  nexus["lumen/runtime"].atan = atan;
  var atan2 = math.atan2;
  nexus["lumen/runtime"].atan2 = atan2;
  var ceil = math.ceil;
  nexus["lumen/runtime"].ceil = ceil;
  var cos = math.cos;
  nexus["lumen/runtime"].cos = cos;
  var floor = math.floor;
  nexus["lumen/runtime"].floor = floor;
  var log = math.log;
  nexus["lumen/runtime"].log = log;
  var log10 = math.log10;
  nexus["lumen/runtime"].log10 = log10;
  var max = math.max;
  nexus["lumen/runtime"].max = max;
  var min = math.min;
  nexus["lumen/runtime"].min = min;
  var pow = math.pow;
  nexus["lumen/runtime"].pow = pow;
  var random = math.random;
  nexus["lumen/runtime"].random = random;
  var sin = math.sin;
  nexus["lumen/runtime"].sin = sin;
  var sinh = math.sinh;
  nexus["lumen/runtime"].sinh = sinh;
  var sqrt = math.sqrt;
  nexus["lumen/runtime"].sqrt = sqrt;
  var tan = math.tan;
  nexus["lumen/runtime"].tan = tan;
  var tanh = math.tanh;
  nexus["lumen/runtime"].tanh = tanh;
  function length(x) {
    return(x.length || 0);
  }
  nexus["lumen/runtime"].length = length;
  function none63(x) {
    return(length(x) === 0);
  }
  nexus["lumen/runtime"]["none?"] = none63;
  function some63(x) {
    return(length(x) > 0);
  }
  nexus["lumen/runtime"]["some?"] = some63;
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
  nexus["lumen/runtime"]["in?"] = in63;
  function hd(l) {
    return(l[0]);
  }
  nexus["lumen/runtime"].hd = hd;
  function sd(l) {
    return(l[1]);
  }
  nexus["lumen/runtime"].sd = sd;
  function td(l) {
    return(l[2]);
  }
  nexus["lumen/runtime"].td = td;
  function type(x) {
    return(typeof(x));
  }
  nexus["lumen/runtime"].type = type;
  function string63(x) {
    return(type(x) === "string");
  }
  nexus["lumen/runtime"]["string?"] = string63;
  function number63(x) {
    return(type(x) === "number");
  }
  nexus["lumen/runtime"]["number?"] = number63;
  function boolean63(x) {
    return(type(x) === "boolean");
  }
  nexus["lumen/runtime"]["boolean?"] = boolean63;
  function function63(x) {
    return(type(x) === "function");
  }
  nexus["lumen/runtime"]["function?"] = function63;
  function composite63(x) {
    return(type(x) === "object");
  }
  nexus["lumen/runtime"]["composite?"] = composite63;
  function atom63(x) {
    return(!composite63(x));
  }
  nexus["lumen/runtime"]["atom?"] = atom63;
  function table63(x) {
    return(composite63(x) && nil63(hd(x)));
  }
  nexus["lumen/runtime"]["table?"] = table63;
  function list63(x) {
    return(composite63(x) && is63(hd(x)));
  }
  nexus["lumen/runtime"]["list?"] = list63;
  function substring(str, from, upto) {
    return(str.substring(from, upto));
  }
  nexus["lumen/runtime"].substring = substring;
  function sublist(l, from, upto) {
    return(Array.prototype.slice.call(l, from, upto));
  }
  nexus["lumen/runtime"].sublist = sublist;
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
  nexus["lumen/runtime"].sub = sub;
  function inner(x) {
    return(sub(x, 1, length(x) - 1));
  }
  nexus["lumen/runtime"].inner = inner;
  function tl(l) {
    return(sub(l, 1));
  }
  nexus["lumen/runtime"].tl = tl;
  function char(str, n) {
    return(str.charAt(n));
  }
  nexus["lumen/runtime"].char = char;
  function code(str, n) {
    return(str.charCodeAt(n));
  }
  nexus["lumen/runtime"].code = code;
  function string_literal63(x) {
    return(string63(x) && char(x, 0) === "\"");
  }
  nexus["lumen/runtime"]["string-literal?"] = string_literal63;
  function id_literal63(x) {
    return(string63(x) && char(x, 0) === "|");
  }
  nexus["lumen/runtime"]["id-literal?"] = id_literal63;
  function add(l, x) {
    l.push(x);
    return(undefined);
  }
  nexus["lumen/runtime"].add = add;
  function drop(l) {
    return(l.pop());
  }
  nexus["lumen/runtime"].drop = drop;
  function last(l) {
    return(l[length(l) - 1]);
  }
  nexus["lumen/runtime"].last = last;
  function reverse(l) {
    var l1 = sub(l, length(l));
    var i = length(l) - 1;
    while (i >= 0) {
      add(l1, l[i]);
      i = i - 1;
    }
    return(l1);
  }
  nexus["lumen/runtime"].reverse = reverse;
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
  nexus["lumen/runtime"].join = join;
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
  nexus["lumen/runtime"].reduce = reduce;
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
  nexus["lumen/runtime"].keep = keep;
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
  nexus["lumen/runtime"].find = find;
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while (i < length(l)) {
      add(l1, [l[i], l[i + 1]]);
      i = i + 2;
    }
    return(l1);
  }
  nexus["lumen/runtime"].pairwise = pairwise;
  function sort(l, f) {
    var _g58;
    if (f) {
      _g58 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g58));
  }
  nexus["lumen/runtime"].sort = sort;
  function iterate(f, count) {
    var i = 0;
    while (i < count) {
      f(i);
      i = i + 1;
    }
  }
  nexus["lumen/runtime"].iterate = iterate;
  function replicate(n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  }
  nexus["lumen/runtime"].replicate = replicate;
  function splice(x) {
    return({_splice: true, value: x});
  }
  nexus["lumen/runtime"].splice = splice;
  function splice63(x) {
    return(table63(x) && x._splice);
  }
  nexus["lumen/runtime"]["splice?"] = splice63;
  function mapl(f, l) {
    var l1 = [];
    var _g37 = l;
    var _g38 = 0;
    while (_g38 < length(_g37)) {
      var x = _g37[_g38];
      var _g39 = f(x);
      if (splice63(_g39)) {
        l1 = join(l1, _g39.value);
      } else {
        if (is63(_g39)) {
          add(l1, _g39);
        }
      }
      _g38 = _g38 + 1;
    }
    return(l1);
  }
  nexus["lumen/runtime"].mapl = mapl;
  function map(f, t) {
    var l = mapl(f, t);
    var _g40 = t;
    var k = undefined;
    for (k in _g40) {
      if (isNaN(parseInt(k))) {
        var v = _g40[k];
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
  nexus["lumen/runtime"].map = map;
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
  nexus["lumen/runtime"].flat = flat;
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
  nexus["lumen/runtime"].flat1 = flat1;
  function keys63(t) {
    var k63 = false;
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  }
  nexus["lumen/runtime"]["keys?"] = keys63;
  function empty63(t) {
    return(none63(t) && !keys63(t));
  }
  nexus["lumen/runtime"]["empty?"] = empty63;
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g42 = args;
      var k = undefined;
      for (k in _g42) {
        if (isNaN(parseInt(k))) {
          var v = _g42[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  nexus["lumen/runtime"].stash = stash;
  function unstash(args) {
    if (none63(args)) {
      return([]);
    } else {
      var l = last(args);
      if (table63(l) && l._stash) {
        var args1 = sub(args, 0, length(args) - 1);
        var _g43 = l;
        var k = undefined;
        for (k in _g43) {
          if (isNaN(parseInt(k))) {
            var v = _g43[k];
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
  nexus["lumen/runtime"].unstash = unstash;
  function extend(t) {
    var xs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g44 = sub(xs, 0);
    return(join(t, _g44));
  }
  nexus["lumen/runtime"].extend = extend;
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g45 = sub(keys, 0);
    var t1 = sublist(t);
    var _g46 = t;
    var k = undefined;
    for (k in _g46) {
      if (isNaN(parseInt(k))) {
        var v = _g46[k];
        if (!_g45[k]) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  nexus["lumen/runtime"].exclude = exclude;
  function search(str, pattern, start) {
    var i = str.indexOf(pattern, start);
    if (i >= 0) {
      return(i);
    }
  }
  nexus["lumen/runtime"].search = search;
  function split(str, sep) {
    return(str.split(sep));
  }
  nexus["lumen/runtime"].split = split;
  function cat() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    if (none63(_g47)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g47));
    }
  }
  nexus["lumen/runtime"].cat = cat;
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g48 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g48));
  }
  nexus["lumen/runtime"]["+"] = _43;
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g49)));
  }
  nexus["lumen/runtime"]["-"] = _;
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g50));
  }
  nexus["lumen/runtime"]["*"] = _42;
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g51)));
  }
  nexus["lumen/runtime"]["/"] = _47;
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g52)));
  }
  nexus["lumen/runtime"]["%"] = _37;
  function _62(a, b) {
    return(a > b);
  }
  nexus["lumen/runtime"][">"] = _62;
  function _60(a, b) {
    return(a < b);
  }
  nexus["lumen/runtime"]["<"] = _60;
  function _61(a, b) {
    return(a === b);
  }
  nexus["lumen/runtime"]["="] = _61;
  function _6261(a, b) {
    return(a >= b);
  }
  nexus["lumen/runtime"][">="] = _6261;
  function _6061(a, b) {
    return(a <= b);
  }
  nexus["lumen/runtime"]["<="] = _6061;
  global.require = require;
  var fs = require("fs");
  nexus["lumen/runtime"].fs = fs;
  function read_file(path) {
    return(fs.readFileSync(path, "utf8"));
  }
  nexus["lumen/runtime"]["read-file"] = read_file;
  function write_file(path, data) {
    return(fs.writeFileSync(path, data, "utf8"));
  }
  nexus["lumen/runtime"]["write-file"] = write_file;
  print = function (x) {
    return(console.log(x));
  };
  function type(x) {
    return(typeof(x));
  }
  nexus["lumen/runtime"].type = type;
  function write(x) {
    return(process.stdout.write(x));
  }
  nexus["lumen/runtime"].write = write;
  function exit(code) {
    return(process.exit(code));
  }
  nexus["lumen/runtime"].exit = exit;
  function number(str) {
    var n = parseFloat(str);
    if (!isNaN(n)) {
      return(n);
    }
  }
  nexus["lumen/runtime"].number = number;
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
            var _g53 = x;
            var k = undefined;
            for (k in _g53) {
              if (isNaN(parseInt(k))) {
                var v = _g53[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g54 = x1;
            var i = 0;
            while (i < length(_g54)) {
              var y = _g54[i];
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
  nexus["lumen/runtime"].string = string;
  function apply(f, args) {
    var _g55 = stash(args);
    return(f.apply(f, _g55));
  }
  nexus["lumen/runtime"].apply = apply;
  var id_count = 0;
  nexus["lumen/runtime"]["id-count"] = id_count;
  function make_id() {
    id_count = id_count + 1;
    return("_g" + id_count);
  }
  nexus["lumen/runtime"]["make-id"] = make_id;
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, i + 2));
  }
  nexus["lumen/runtime"]["%message-handler"] = _37message_handler;
  function toplevel63() {
    return(length(environment) === 1);
  }
  nexus["lumen/runtime"]["toplevel?"] = toplevel63;
  function module_key(spec) {
    if (atom63(spec)) {
      return(string(spec));
    } else {
      return(reduce(function (a, b) {
        return(module_key(a) + "/" + module_key(b));
      }, spec));
    }
  }
  nexus["lumen/runtime"]["module-key"] = module_key;
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  nexus["lumen/runtime"].module = module;
  function setenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g56 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g57 = _g56;
      var k1 = undefined;
      for (k1 in _g57) {
        if (isNaN(parseInt(k1))) {
          var v = _g57[k1];
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
  nexus["lumen/runtime"].setenv = setenv;
})();
(function () {
  nexus["lumen/utilities"] = {};
  var _g63 = nexus["lumen/runtime"];
  var _37 = _g63["%"];
  var _37message_handler = _g63["%message-handler"];
  var _42 = _g63["*"];
  var _43 = _g63["+"];
  var _ = _g63["-"];
  var _47 = _g63["/"];
  var _60 = _g63["<"];
  var _6061 = _g63["<="];
  var _61 = _g63["="];
  var _62 = _g63[">"];
  var _6261 = _g63[">="];
  var abs = _g63.abs;
  var acos = _g63.acos;
  var add = _g63.add;
  var apply = _g63.apply;
  var asin = _g63.asin;
  var atan = _g63.atan;
  var atan2 = _g63.atan2;
  var atom63 = _g63["atom?"];
  var boolean63 = _g63["boolean?"];
  var cat = _g63.cat;
  var ceil = _g63.ceil;
  var char = _g63.char;
  var code = _g63.code;
  var composite63 = _g63["composite?"];
  var cos = _g63.cos;
  var drop = _g63.drop;
  var empty63 = _g63["empty?"];
  var exclude = _g63.exclude;
  var exit = _g63.exit;
  var extend = _g63.extend;
  var find = _g63.find;
  var flat = _g63.flat;
  var flat1 = _g63.flat1;
  var floor = _g63.floor;
  var function63 = _g63["function?"];
  var hd = _g63.hd;
  var id_literal63 = _g63["id-literal?"];
  var in63 = _g63["in?"];
  var inner = _g63.inner;
  var is63 = _g63["is?"];
  var iterate = _g63.iterate;
  var join = _g63.join;
  var keep = _g63.keep;
  var keys63 = _g63["keys?"];
  var last = _g63.last;
  var length = _g63.length;
  var list63 = _g63["list?"];
  var log = _g63.log;
  var log10 = _g63.log10;
  var make_id = _g63["make-id"];
  var map = _g63.map;
  var max = _g63.max;
  var min = _g63.min;
  var module = _g63.module;
  var module_key = _g63["module-key"];
  var nil63 = _g63["nil?"];
  var none63 = _g63["none?"];
  var number = _g63.number;
  var number63 = _g63["number?"];
  var pairwise = _g63.pairwise;
  var pow = _g63.pow;
  var random = _g63.random;
  var read_file = _g63["read-file"];
  var reduce = _g63.reduce;
  var replicate = _g63.replicate;
  var reverse = _g63.reverse;
  var sd = _g63.sd;
  var search = _g63.search;
  var setenv = _g63.setenv;
  var sin = _g63.sin;
  var sinh = _g63.sinh;
  var some63 = _g63["some?"];
  var sort = _g63.sort;
  var splice = _g63.splice;
  var split = _g63.split;
  var sqrt = _g63.sqrt;
  var stash = _g63.stash;
  var string = _g63.string;
  var string_literal63 = _g63["string-literal?"];
  var string63 = _g63["string?"];
  var sub = _g63.sub;
  var sublist = _g63.sublist;
  var substring = _g63.substring;
  var table63 = _g63["table?"];
  var tan = _g63.tan;
  var tanh = _g63.tanh;
  var td = _g63.td;
  var tl = _g63.tl;
  var toplevel63 = _g63["toplevel?"];
  var unstash = _g63.unstash;
  var write = _g63.write;
  var write_file = _g63["write-file"];
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g66 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g67 = undefined;
        var _g68 = _g66;
        var x = undefined;
        for (x in _g68) {
          if (isNaN(parseInt(x))) {
            var _g59 = _g68[x];
            _g67 = x;
          }
        }
        if (_g67) {
          return(b[_g67]);
        } else {
          return(b);
        }
      }
    }
  }
  nexus["lumen/utilities"].getenv = getenv;
  function macro_function(k) {
    return(getenv(k, {_stash: true, macro: true}));
  }
  nexus["lumen/utilities"]["macro-function"] = macro_function;
  function macro63(k) {
    return(is63(macro_function(k)));
  }
  nexus["lumen/utilities"]["macro?"] = macro63;
  function special63(k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  }
  nexus["lumen/utilities"]["special?"] = special63;
  function special_form63(form) {
    return(list63(form) && special63(hd(form)));
  }
  nexus["lumen/utilities"]["special-form?"] = special_form63;
  function statement63(k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  }
  nexus["lumen/utilities"]["statement?"] = statement63;
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
  }
  nexus["lumen/utilities"]["symbol-expansion"] = symbol_expansion;
  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }
  nexus["lumen/utilities"]["symbol?"] = symbol63;
  function variable63(k) {
    var b = find(function (frame) {
      return(frame[k] || frame._scope);
    }, reverse(environment));
    return(table63(b) && is63(b.variable));
  }
  nexus["lumen/utilities"]["variable?"] = variable63;
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  nexus["lumen/utilities"]["global?"] = global63;
  function bound63(x) {
    return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
  }
  nexus["lumen/utilities"]["bound?"] = bound63;
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while (i < length(str)) {
      var c = char(str, i);
      var _g98;
      if (c === "\n") {
        _g98 = "\\n";
      } else {
        var _g99;
        if (c === "\"") {
          _g99 = "\\\"";
        } else {
          var _g100;
          if (c === "\\") {
            _g100 = "\\\\";
          } else {
            _g100 = c;
          }
          _g99 = _g100;
        }
        _g98 = _g99;
      }
      var c1 = _g98;
      str1 = str1 + c1;
      i = i + 1;
    }
    return(str1 + "\"");
  }
  nexus["lumen/utilities"].escape = escape;
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
  nexus["lumen/utilities"].quoted = quoted;
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
  nexus["lumen/utilities"]["stash*"] = stash42;
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
  nexus["lumen/utilities"].bind = bind;
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
  nexus["lumen/utilities"]["bind*"] = bind42;
  function quoting63(depth) {
    return(number63(depth));
  }
  nexus["lumen/utilities"]["quoting?"] = quoting63;
  function quasiquoting63(depth) {
    return(quoting63(depth) && depth > 0);
  }
  nexus["lumen/utilities"]["quasiquoting?"] = quasiquoting63;
  function can_unquote63(depth) {
    return(quoting63(depth) && depth === 1);
  }
  nexus["lumen/utilities"]["can-unquote?"] = can_unquote63;
  function quasisplice63(x, depth) {
    return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
  }
  nexus["lumen/utilities"]["quasisplice?"] = quasisplice63;
  function macroexpand(form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if (x === "%function") {
          var _g60 = form[0];
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
            var _g61 = form[0];
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
  nexus["lumen/utilities"].macroexpand = macroexpand;
  var quasiexpand;
  nexus["lumen/utilities"].quasiexpand = quasiexpand;
  var quasiquote_list;
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g84 = form;
    var k = undefined;
    for (k in _g84) {
      if (isNaN(parseInt(k))) {
        var v = _g84[k];
        var _g101;
        if (quasisplice63(v, depth)) {
          _g101 = quasiexpand(v[1]);
        } else {
          _g101 = quasiexpand(v, depth);
        }
        var _g85 = _g101;
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
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list;
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
  nexus["lumen/utilities"].quasiexpand = quasiexpand;
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  nexus["lumen/utilities"].indentation = indentation;
  var reserved = {"%": true, "*": true, "+": true, "-": true, "/": true, "<": true, "<=": true, "=": true, "==": true, ">": true, ">=": true, "and": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "elseif": true, "end": true, "false": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "local": true, "new": true, "nil": true, "not": true, "or": true, "repeat": true, "return": true, "switch": true, "then": true, "this": true, "throw": true, "true": true, "try": true, "typeof": true, "until": true, "var": true, "void": true, "while": true, "with": true};
  nexus["lumen/utilities"].reserved = reserved;
  function reserved63(x) {
    return(reserved[x]);
  }
  nexus["lumen/utilities"]["reserved?"] = reserved63;
  function numeric63(n) {
    return(n > 47 && n < 58);
  }
  nexus["lumen/utilities"]["numeric?"] = numeric63;
  function valid_char63(n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
  }
  nexus["lumen/utilities"]["valid-char?"] = valid_char63;
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
  nexus["lumen/utilities"]["valid-id?"] = valid_id63;
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
  nexus["lumen/utilities"].id = id;
  function sortk(l, k) {
    return(sort(l, function (a, b) {
      return(k(a) < k(b));
    }));
  }
  nexus["lumen/utilities"].sortk = sortk;
  function imported(spec) {
    var _g94 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g94.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g95 = module(spec).export;
      var n = undefined;
      for (n in _g95) {
        if (isNaN(parseInt(n))) {
          var b = _g95[n];
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
  nexus["lumen/utilities"].imported = imported;
  function linked(name, form) {
    if (toplevel63()) {
      var k = module_key(current_module);
      return(["do", form, ["set", ["get", ["get", "nexus", ["quote", k]], ["quote", name]], name]]);
    } else {
      return(form);
    }
  }
  nexus["lumen/utilities"].linked = linked;
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
  nexus["lumen/utilities"]["quote-binding"] = quote_binding;
  function mapo(f, t) {
    var o = [];
    var _g96 = t;
    var k = undefined;
    for (k in _g96) {
      if (isNaN(parseInt(k))) {
        var v = _g96[k];
        var x = f(v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  nexus["lumen/utilities"].mapo = mapo;
  function quote_frame(t) {
    return(join(["%object"], mapo(function (b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  nexus["lumen/utilities"]["quote-frame"] = quote_frame;
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  nexus["lumen/utilities"]["quote-environment"] = quote_environment;
  function quote_module(m) {
    var _g97 = ["table"];
    _g97.alias = quoted(m.alias);
    _g97.export = quote_frame(m.export);
    _g97.import = quoted(m.import);
    return(_g97);
  }
  nexus["lumen/utilities"]["quote-module"] = quote_module;
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  nexus["lumen/utilities"]["quote-modules"] = quote_modules;
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  nexus["lumen/utilities"]["initial-environment"] = initial_environment;
})();
(function () {
  nexus["lumen/reader"] = {};
  var _g106 = nexus["lumen/runtime"];
  var _37 = _g106["%"];
  var _37message_handler = _g106["%message-handler"];
  var _42 = _g106["*"];
  var _43 = _g106["+"];
  var _ = _g106["-"];
  var _47 = _g106["/"];
  var _60 = _g106["<"];
  var _6061 = _g106["<="];
  var _61 = _g106["="];
  var _62 = _g106[">"];
  var _6261 = _g106[">="];
  var abs = _g106.abs;
  var acos = _g106.acos;
  var add = _g106.add;
  var apply = _g106.apply;
  var asin = _g106.asin;
  var atan = _g106.atan;
  var atan2 = _g106.atan2;
  var atom63 = _g106["atom?"];
  var boolean63 = _g106["boolean?"];
  var cat = _g106.cat;
  var ceil = _g106.ceil;
  var char = _g106.char;
  var code = _g106.code;
  var composite63 = _g106["composite?"];
  var cos = _g106.cos;
  var drop = _g106.drop;
  var empty63 = _g106["empty?"];
  var exclude = _g106.exclude;
  var exit = _g106.exit;
  var extend = _g106.extend;
  var find = _g106.find;
  var flat = _g106.flat;
  var flat1 = _g106.flat1;
  var floor = _g106.floor;
  var function63 = _g106["function?"];
  var hd = _g106.hd;
  var id_literal63 = _g106["id-literal?"];
  var in63 = _g106["in?"];
  var inner = _g106.inner;
  var is63 = _g106["is?"];
  var iterate = _g106.iterate;
  var join = _g106.join;
  var keep = _g106.keep;
  var keys63 = _g106["keys?"];
  var last = _g106.last;
  var length = _g106.length;
  var list63 = _g106["list?"];
  var log = _g106.log;
  var log10 = _g106.log10;
  var make_id = _g106["make-id"];
  var map = _g106.map;
  var max = _g106.max;
  var min = _g106.min;
  var module = _g106.module;
  var module_key = _g106["module-key"];
  var nil63 = _g106["nil?"];
  var none63 = _g106["none?"];
  var number = _g106.number;
  var number63 = _g106["number?"];
  var pairwise = _g106.pairwise;
  var pow = _g106.pow;
  var random = _g106.random;
  var read_file = _g106["read-file"];
  var reduce = _g106.reduce;
  var replicate = _g106.replicate;
  var reverse = _g106.reverse;
  var sd = _g106.sd;
  var search = _g106.search;
  var setenv = _g106.setenv;
  var sin = _g106.sin;
  var sinh = _g106.sinh;
  var some63 = _g106["some?"];
  var sort = _g106.sort;
  var splice = _g106.splice;
  var split = _g106.split;
  var sqrt = _g106.sqrt;
  var stash = _g106.stash;
  var string = _g106.string;
  var string_literal63 = _g106["string-literal?"];
  var string63 = _g106["string?"];
  var sub = _g106.sub;
  var sublist = _g106.sublist;
  var substring = _g106.substring;
  var table63 = _g106["table?"];
  var tan = _g106.tan;
  var tanh = _g106.tanh;
  var td = _g106.td;
  var tl = _g106.tl;
  var toplevel63 = _g106["toplevel?"];
  var unstash = _g106.unstash;
  var write = _g106.write;
  var write_file = _g106["write-file"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {" ": true, "\n": true, "\t": true};
  nexus["lumen/reader"].whitespace = whitespace;
  function make_stream(str) {
    return({len: length(str), pos: 0, string: str});
  }
  nexus["lumen/reader"]["make-stream"] = make_stream;
  function peek_char(s) {
    if (s.pos < s.len) {
      return(char(s.string, s.pos));
    }
  }
  nexus["lumen/reader"]["peek-char"] = peek_char;
  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = s.pos + 1;
      return(c);
    }
  }
  nexus["lumen/reader"]["read-char"] = read_char;
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
  nexus["lumen/reader"]["skip-non-code"] = skip_non_code;
  var read_table = {};
  nexus["lumen/reader"]["read-table"] = read_table;
  var eof = {};
  nexus["lumen/reader"].eof = eof;
  function read(s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return((read_table[c] || read_table[""])(s));
    } else {
      return(eof);
    }
  }
  nexus["lumen/reader"].read = read;
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
  nexus["lumen/reader"]["read-all"] = read_all;
  function read_from_string(str) {
    return(read(make_stream(str)));
  }
  nexus["lumen/reader"]["read-from-string"] = read_from_string;
  function key63(atom) {
    return(string63(atom) && length(atom) > 1 && char(atom, length(atom) - 1) === ":");
  }
  nexus["lumen/reader"]["key?"] = key63;
  function flag63(atom) {
    return(string63(atom) && length(atom) > 1 && char(atom, 0) === ":");
  }
  nexus["lumen/reader"]["flag?"] = flag63;
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
})();
(function () {
  nexus["lumen/compiler"] = {};
  var _g119 = nexus["lumen/utilities"];
  var bind = _g119.bind;
  var bind42 = _g119["bind*"];
  var bound63 = _g119["bound?"];
  var getenv = _g119.getenv;
  var id = _g119.id;
  var imported = _g119.imported;
  var indentation = _g119.indentation;
  var initial_environment = _g119["initial-environment"];
  var linked = _g119.linked;
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
  nexus["lumen/compiler"].infix = infix;
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  nexus["lumen/compiler"]["unary?"] = unary63;
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
  nexus["lumen/compiler"].precedence = precedence;
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
  nexus["lumen/compiler"].getop = getop;
  function infix63(x) {
    return(is63(getop(x)));
  }
  nexus["lumen/compiler"]["infix?"] = infix63;
  var compile;
  nexus["lumen/compiler"].compile = compile;
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
  nexus["lumen/compiler"]["compile-args"] = compile_args;
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
  nexus["lumen/compiler"]["compile-atom"] = compile_atom;
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
  nexus["lumen/compiler"].terminator = terminator;
  function compile_special(form, stmt63) {
    var x = form[0];
    var args = sub(form, 1);
    var _g160 = getenv(x);
    var special = _g160.special;
    var stmt = _g160.stmt;
    var self_tr63 = _g160.tr;
    var tr = terminator(stmt63 && !self_tr63);
    return(apply(special, args) + tr);
  }
  nexus["lumen/compiler"]["compile-special"] = compile_special;
  function parenthesize_call63(x) {
    return(list63(x) && (hd(x) === "%function" || precedence(x) > 0));
  }
  nexus["lumen/compiler"]["parenthesize-call?"] = parenthesize_call63;
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
  nexus["lumen/compiler"]["compile-call"] = compile_call;
  function op_delims(parent, child) {
    var _g161 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g161.right;
    var _g184;
    if (right) {
      _g184 = _6261;
    } else {
      _g184 = _62;
    }
    if (_g184(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  nexus["lumen/compiler"]["op-delims"] = op_delims;
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
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  function compile_function(args, body) {
    var _g168 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g168.name;
    var prefix = _g168.prefix;
    var _g185;
    if (name) {
      _g185 = compile(name);
    } else {
      _g185 = "";
    }
    var id = _g185;
    var _g169 = prefix || "";
    var _g170 = compile_args(args);
    indent_level = indent_level + 1;
    var _g172 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g171 = _g172;
    var ind = indentation();
    var _g186;
    if (target === "js") {
      _g186 = "";
    } else {
      _g186 = "end";
    }
    var tr = _g186;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g170 + " {\n" + _g171 + ind + "}" + tr);
    } else {
      return(_g169 + "function " + id + _g170 + "\n" + _g171 + ind + tr);
    }
  }
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g173 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g173.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g187;
        if (stmt) {
          _g187 = indentation();
        } else {
          _g187 = "";
        }
        var ind = _g187;
        var _g188;
        if (atom63(form)) {
          _g188 = compile_atom(form);
        } else {
          var _g189;
          if (infix63(hd(form))) {
            _g189 = compile_infix(form);
          } else {
            _g189 = compile_call(form);
          }
          _g188 = _g189;
        }
        var _g174 = _g188;
        return(ind + _g174 + tr);
      }
    }
  };
  nexus["lumen/compiler"].compile = compile;
  var lower;
  nexus["lumen/compiler"].lower = lower;
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
  nexus["lumen/compiler"]["lower-statement"] = lower_statement;
  function lower_body(body, tail63) {
    return(lower_statement(join(["do"], body), tail63));
  }
  nexus["lumen/compiler"]["lower-body"] = lower_body;
  function lower_do(args, hoist, stmt63, tail63) {
    var _g175 = sub(args, 0, length(args) - 1);
    var _g176 = 0;
    while (_g176 < length(_g175)) {
      var x = _g175[_g176];
      add(hoist, lower(x, hoist, stmt63));
      _g176 = _g176 + 1;
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && can_return63(e)) {
      return(["return", e]);
    } else {
      return(e);
    }
  }
  nexus["lumen/compiler"]["lower-do"] = lower_do;
  function lower_if(args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g177 = args[1];
    var _g178 = args[2];
    if (stmt63 || tail63) {
      var _g191;
      if (_g178) {
        _g191 = [lower_body([_g178], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g177], tail63)], _g191)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g190;
      if (_g178) {
        _g190 = [lower(["set", e, _g178])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g177])], _g190));
      return(e);
    }
  }
  nexus["lumen/compiler"]["lower-if"] = lower_if;
  function lower_short(x, args, hoist) {
    var a = args[0];
    var b = args[1];
    var hoist1 = [];
    var b1 = lower(b, hoist1);
    if (some63(hoist1)) {
      var id = make_id();
      var _g192;
      if (x === "and") {
        _g192 = ["%if", id, b, id];
      } else {
        _g192 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g192], hoist));
    } else {
      return([x, lower(a, hoist), b1]);
    }
  }
  nexus["lumen/compiler"]["lower-short"] = lower_short;
  function lower_try(args, hoist, tail63) {
    return(add(hoist, ["%try", lower_body(args, tail63)]));
  }
  nexus["lumen/compiler"]["lower-try"] = lower_try;
  function lower_while(args, hoist) {
    var c = args[0];
    var body = sub(args, 1);
    return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
  }
  nexus["lumen/compiler"]["lower-while"] = lower_while;
  function lower_for(args, hoist) {
    var t = args[0];
    var k = args[1];
    var body = sub(args, 2);
    return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
  }
  nexus["lumen/compiler"]["lower-for"] = lower_for;
  function lower_function(args) {
    var a = args[0];
    var body = sub(args, 1);
    return(["%function", a, lower_body(body, true)]);
  }
  nexus["lumen/compiler"]["lower-function"] = lower_function;
  function lower_definition(kind, args, hoist) {
    var name = args[0];
    var _g179 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g179, lower_body(body, true)]));
  }
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  function lower_call(form, hoist) {
    var _g180 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g180)) {
      return(_g180);
    }
  }
  nexus["lumen/compiler"]["lower-call"] = lower_call;
  function lower_infix63(form) {
    return(infix63(hd(form)) && length(form) > 3);
  }
  nexus["lumen/compiler"]["lower-infix?"] = lower_infix63;
  function lower_infix(form, hoist) {
    var x = form[0];
    var args = sub(form, 1);
    return(lower(reduce(function (a, b) {
      return([x, b, a]);
    }, reverse(args)), hoist));
  }
  nexus["lumen/compiler"]["lower-infix"] = lower_infix;
  function lower_special(form, hoist) {
    var e = lower_call(form, hoist);
    if (e) {
      return(add(hoist, e));
    }
  }
  nexus["lumen/compiler"]["lower-special"] = lower_special;
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
  nexus["lumen/compiler"].lower = lower;
  function process(form) {
    return(lower(macroexpand(form)));
  }
  nexus["lumen/compiler"].process = process;
  global.current_module = undefined;
  function module_path(spec) {
    return(module_key(spec) + ".l");
  }
  nexus["lumen/compiler"]["module-path"] = module_path;
  function encapsulate(body) {
    return([["%function", [], process(join(["do"], body))]]);
  }
  nexus["lumen/compiler"].encapsulate = encapsulate;
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return(compile(form) + ";\n");
  }
  nexus["lumen/compiler"]["compile-file"] = compile_file;
  function run(code) {
    return(global.eval(code));
  }
  nexus["lumen/compiler"].run = run;
  var compiling63 = false;
  nexus["lumen/compiler"]["compiling?"] = compiling63;
  var compiler_output = "";
  nexus["lumen/compiler"]["compiler-output"] = compiler_output;
  function conclude(code) {
    if (compiling63) {
      compiler_output = compiler_output + code;
    } else {
      return(run(code));
    }
  }
  nexus["lumen/compiler"].conclude = conclude;
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    current_module = spec;
    environment = initial_environment();
    var code = compile_file(path);
    current_module = mod0;
    environment = env0;
    return(conclude(code));
  }
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  function open_module(spec) {
    var _g181 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g181.all;
    var m = module(spec);
    var frame = last(environment);
    var _g182 = m.export;
    var k = undefined;
    for (k in _g182) {
      if (isNaN(parseInt(k))) {
        var v = _g182[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  nexus["lumen/compiler"]["open-module"] = open_module;
  function load_module(spec) {
    var _g183 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g183.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
  }
  nexus["lumen/compiler"]["load-module"] = load_module;
  function in_module(spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  nexus["lumen/compiler"]["in-module"] = in_module;
  function compile_module(spec) {
    compiling63 = true;
    _37compile_module(spec);
    return(compiler_output);
  }
  nexus["lumen/compiler"]["compile-module"] = compile_module;
  function declare(form) {
    return(conclude(compile(process(form), {_stash: true, stmt: true})));
  }
  nexus["lumen/compiler"].declare = declare;
  function reimported() {
    var m = module(current_module);
    return(join(imported(current_module, {_stash: true, all: true}), map(function (x) {
      return(splice(imported(x)));
    }, m.import)));
  }
  nexus["lumen/compiler"].reimported = reimported;
  global._37result = undefined;
  function eval(form) {
    var previous = target;
    target = "js";
    var body = join(reimported(), [["set", "%result", form]]);
    var code = compile(encapsulate(body));
    target = previous;
    run(code);
    return(_37result);
  }
  nexus["lumen/compiler"].eval = eval;
})();
(function () {
  nexus["lumen/special"] = {};
  var _g194 = nexus["lumen/utilities"];
  var bind = _g194.bind;
  var bind42 = _g194["bind*"];
  var bound63 = _g194["bound?"];
  var getenv = _g194.getenv;
  var id = _g194.id;
  var imported = _g194.imported;
  var indentation = _g194.indentation;
  var initial_environment = _g194["initial-environment"];
  var linked = _g194.linked;
  var macro_function = _g194["macro-function"];
  var macro63 = _g194["macro?"];
  var macroexpand = _g194.macroexpand;
  var mapo = _g194.mapo;
  var quasiexpand = _g194.quasiexpand;
  var quote_environment = _g194["quote-environment"];
  var quote_modules = _g194["quote-modules"];
  var quoted = _g194.quoted;
  var reserved63 = _g194["reserved?"];
  var sortk = _g194.sortk;
  var special_form63 = _g194["special-form?"];
  var special63 = _g194["special?"];
  var stash42 = _g194["stash*"];
  var statement63 = _g194["statement?"];
  var symbol_expansion = _g194["symbol-expansion"];
  var symbol63 = _g194["symbol?"];
  var toplevel63 = _g194["toplevel?"];
  var valid_id63 = _g194["valid-id?"];
  var variable63 = _g194["variable?"];
  var _g195 = nexus["lumen/compiler"];
  var compile = _g195.compile;
  var compile_function = _g195["compile-function"];
  var compile_module = _g195["compile-module"];
  var declare = _g195.declare;
  var eval = _g195.eval;
  var in_module = _g195["in-module"];
  var load_module = _g195["load-module"];
  var open_module = _g195["open-module"];
  var _g196 = nexus["lumen/runtime"];
  var _37 = _g196["%"];
  var _37message_handler = _g196["%message-handler"];
  var _42 = _g196["*"];
  var _43 = _g196["+"];
  var _ = _g196["-"];
  var _47 = _g196["/"];
  var _60 = _g196["<"];
  var _6061 = _g196["<="];
  var _61 = _g196["="];
  var _62 = _g196[">"];
  var _6261 = _g196[">="];
  var abs = _g196.abs;
  var acos = _g196.acos;
  var add = _g196.add;
  var apply = _g196.apply;
  var asin = _g196.asin;
  var atan = _g196.atan;
  var atan2 = _g196.atan2;
  var atom63 = _g196["atom?"];
  var boolean63 = _g196["boolean?"];
  var cat = _g196.cat;
  var ceil = _g196.ceil;
  var char = _g196.char;
  var code = _g196.code;
  var composite63 = _g196["composite?"];
  var cos = _g196.cos;
  var drop = _g196.drop;
  var empty63 = _g196["empty?"];
  var exclude = _g196.exclude;
  var exit = _g196.exit;
  var extend = _g196.extend;
  var find = _g196.find;
  var flat = _g196.flat;
  var flat1 = _g196.flat1;
  var floor = _g196.floor;
  var function63 = _g196["function?"];
  var hd = _g196.hd;
  var id_literal63 = _g196["id-literal?"];
  var in63 = _g196["in?"];
  var inner = _g196.inner;
  var is63 = _g196["is?"];
  var iterate = _g196.iterate;
  var join = _g196.join;
  var keep = _g196.keep;
  var keys63 = _g196["keys?"];
  var last = _g196.last;
  var length = _g196.length;
  var list63 = _g196["list?"];
  var log = _g196.log;
  var log10 = _g196.log10;
  var make_id = _g196["make-id"];
  var map = _g196.map;
  var max = _g196.max;
  var min = _g196.min;
  var module = _g196.module;
  var module_key = _g196["module-key"];
  var nil63 = _g196["nil?"];
  var none63 = _g196["none?"];
  var number = _g196.number;
  var number63 = _g196["number?"];
  var pairwise = _g196.pairwise;
  var pow = _g196.pow;
  var random = _g196.random;
  var read_file = _g196["read-file"];
  var reduce = _g196.reduce;
  var replicate = _g196.replicate;
  var reverse = _g196.reverse;
  var sd = _g196.sd;
  var search = _g196.search;
  var setenv = _g196.setenv;
  var sin = _g196.sin;
  var sinh = _g196.sinh;
  var some63 = _g196["some?"];
  var sort = _g196.sort;
  var splice = _g196.splice;
  var split = _g196.split;
  var sqrt = _g196.sqrt;
  var stash = _g196.stash;
  var string = _g196.string;
  var string_literal63 = _g196["string-literal?"];
  var string63 = _g196["string?"];
  var sub = _g196.sub;
  var sublist = _g196.sublist;
  var substring = _g196.substring;
  var table63 = _g196["table?"];
  var tan = _g196.tan;
  var tanh = _g196.tanh;
  var td = _g196.td;
  var tl = _g196.tl;
  var toplevel63 = _g196["toplevel?"];
  var unstash = _g196.unstash;
  var write = _g196.write;
  var write_file = _g196["write-file"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g395 = nexus["lumen/utilities"];
  var bind = _g395.bind;
  var bind42 = _g395["bind*"];
  var bound63 = _g395["bound?"];
  var getenv = _g395.getenv;
  var id = _g395.id;
  var imported = _g395.imported;
  var indentation = _g395.indentation;
  var initial_environment = _g395["initial-environment"];
  var linked = _g395.linked;
  var macro_function = _g395["macro-function"];
  var macro63 = _g395["macro?"];
  var macroexpand = _g395.macroexpand;
  var mapo = _g395.mapo;
  var quasiexpand = _g395.quasiexpand;
  var quote_environment = _g395["quote-environment"];
  var quote_modules = _g395["quote-modules"];
  var quoted = _g395.quoted;
  var reserved63 = _g395["reserved?"];
  var sortk = _g395.sortk;
  var special_form63 = _g395["special-form?"];
  var special63 = _g395["special?"];
  var stash42 = _g395["stash*"];
  var statement63 = _g395["statement?"];
  var symbol_expansion = _g395["symbol-expansion"];
  var symbol63 = _g395["symbol?"];
  var toplevel63 = _g395["toplevel?"];
  var valid_id63 = _g395["valid-id?"];
  var variable63 = _g395["variable?"];
  var _g396 = nexus["lumen/compiler"];
  var compile = _g396.compile;
  var compile_function = _g396["compile-function"];
  var compile_module = _g396["compile-module"];
  var declare = _g396.declare;
  var eval = _g396.eval;
  var in_module = _g396["in-module"];
  var load_module = _g396["load-module"];
  var open_module = _g396["open-module"];
  var _g397 = nexus["lumen/runtime"];
  var _37 = _g397["%"];
  var _37message_handler = _g397["%message-handler"];
  var _42 = _g397["*"];
  var _43 = _g397["+"];
  var _ = _g397["-"];
  var _47 = _g397["/"];
  var _60 = _g397["<"];
  var _6061 = _g397["<="];
  var _61 = _g397["="];
  var _62 = _g397[">"];
  var _6261 = _g397[">="];
  var abs = _g397.abs;
  var acos = _g397.acos;
  var add = _g397.add;
  var apply = _g397.apply;
  var asin = _g397.asin;
  var atan = _g397.atan;
  var atan2 = _g397.atan2;
  var atom63 = _g397["atom?"];
  var boolean63 = _g397["boolean?"];
  var cat = _g397.cat;
  var ceil = _g397.ceil;
  var char = _g397.char;
  var code = _g397.code;
  var composite63 = _g397["composite?"];
  var cos = _g397.cos;
  var drop = _g397.drop;
  var empty63 = _g397["empty?"];
  var exclude = _g397.exclude;
  var exit = _g397.exit;
  var extend = _g397.extend;
  var find = _g397.find;
  var flat = _g397.flat;
  var flat1 = _g397.flat1;
  var floor = _g397.floor;
  var function63 = _g397["function?"];
  var hd = _g397.hd;
  var id_literal63 = _g397["id-literal?"];
  var in63 = _g397["in?"];
  var inner = _g397.inner;
  var is63 = _g397["is?"];
  var iterate = _g397.iterate;
  var join = _g397.join;
  var keep = _g397.keep;
  var keys63 = _g397["keys?"];
  var last = _g397.last;
  var length = _g397.length;
  var list63 = _g397["list?"];
  var log = _g397.log;
  var log10 = _g397.log10;
  var make_id = _g397["make-id"];
  var map = _g397.map;
  var max = _g397.max;
  var min = _g397.min;
  var module = _g397.module;
  var module_key = _g397["module-key"];
  var nil63 = _g397["nil?"];
  var none63 = _g397["none?"];
  var number = _g397.number;
  var number63 = _g397["number?"];
  var pairwise = _g397.pairwise;
  var pow = _g397.pow;
  var random = _g397.random;
  var read_file = _g397["read-file"];
  var reduce = _g397.reduce;
  var replicate = _g397.replicate;
  var reverse = _g397.reverse;
  var sd = _g397.sd;
  var search = _g397.search;
  var setenv = _g397.setenv;
  var sin = _g397.sin;
  var sinh = _g397.sinh;
  var some63 = _g397["some?"];
  var sort = _g397.sort;
  var splice = _g397.splice;
  var split = _g397.split;
  var sqrt = _g397.sqrt;
  var stash = _g397.stash;
  var string = _g397.string;
  var string_literal63 = _g397["string-literal?"];
  var string63 = _g397["string?"];
  var sub = _g397.sub;
  var sublist = _g397.sublist;
  var substring = _g397.substring;
  var table63 = _g397["table?"];
  var tan = _g397.tan;
  var tanh = _g397.tanh;
  var td = _g397.td;
  var tl = _g397.tl;
  var toplevel63 = _g397["toplevel?"];
  var unstash = _g397.unstash;
  var write = _g397.write;
  var write_file = _g397["write-file"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g735 = nexus["lumen/utilities"];
  var bind = _g735.bind;
  var bind42 = _g735["bind*"];
  var bound63 = _g735["bound?"];
  var getenv = _g735.getenv;
  var id = _g735.id;
  var imported = _g735.imported;
  var indentation = _g735.indentation;
  var initial_environment = _g735["initial-environment"];
  var linked = _g735.linked;
  var macro_function = _g735["macro-function"];
  var macro63 = _g735["macro?"];
  var macroexpand = _g735.macroexpand;
  var mapo = _g735.mapo;
  var quasiexpand = _g735.quasiexpand;
  var quote_environment = _g735["quote-environment"];
  var quote_modules = _g735["quote-modules"];
  var quoted = _g735.quoted;
  var reserved63 = _g735["reserved?"];
  var sortk = _g735.sortk;
  var special_form63 = _g735["special-form?"];
  var special63 = _g735["special?"];
  var stash42 = _g735["stash*"];
  var statement63 = _g735["statement?"];
  var symbol_expansion = _g735["symbol-expansion"];
  var symbol63 = _g735["symbol?"];
  var toplevel63 = _g735["toplevel?"];
  var valid_id63 = _g735["valid-id?"];
  var variable63 = _g735["variable?"];
  var _g736 = nexus["lumen/compiler"];
  var compile = _g736.compile;
  var compile_function = _g736["compile-function"];
  var compile_module = _g736["compile-module"];
  var declare = _g736.declare;
  var eval = _g736.eval;
  var in_module = _g736["in-module"];
  var load_module = _g736["load-module"];
  var open_module = _g736["open-module"];
  var _g737 = nexus["lumen/runtime"];
  var _37 = _g737["%"];
  var _37message_handler = _g737["%message-handler"];
  var _42 = _g737["*"];
  var _43 = _g737["+"];
  var _ = _g737["-"];
  var _47 = _g737["/"];
  var _60 = _g737["<"];
  var _6061 = _g737["<="];
  var _61 = _g737["="];
  var _62 = _g737[">"];
  var _6261 = _g737[">="];
  var abs = _g737.abs;
  var acos = _g737.acos;
  var add = _g737.add;
  var apply = _g737.apply;
  var asin = _g737.asin;
  var atan = _g737.atan;
  var atan2 = _g737.atan2;
  var atom63 = _g737["atom?"];
  var boolean63 = _g737["boolean?"];
  var cat = _g737.cat;
  var ceil = _g737.ceil;
  var char = _g737.char;
  var code = _g737.code;
  var composite63 = _g737["composite?"];
  var cos = _g737.cos;
  var drop = _g737.drop;
  var empty63 = _g737["empty?"];
  var exclude = _g737.exclude;
  var exit = _g737.exit;
  var extend = _g737.extend;
  var find = _g737.find;
  var flat = _g737.flat;
  var flat1 = _g737.flat1;
  var floor = _g737.floor;
  var function63 = _g737["function?"];
  var hd = _g737.hd;
  var id_literal63 = _g737["id-literal?"];
  var in63 = _g737["in?"];
  var inner = _g737.inner;
  var is63 = _g737["is?"];
  var iterate = _g737.iterate;
  var join = _g737.join;
  var keep = _g737.keep;
  var keys63 = _g737["keys?"];
  var last = _g737.last;
  var length = _g737.length;
  var list63 = _g737["list?"];
  var log = _g737.log;
  var log10 = _g737.log10;
  var make_id = _g737["make-id"];
  var map = _g737.map;
  var max = _g737.max;
  var min = _g737.min;
  var module = _g737.module;
  var module_key = _g737["module-key"];
  var nil63 = _g737["nil?"];
  var none63 = _g737["none?"];
  var number = _g737.number;
  var number63 = _g737["number?"];
  var pairwise = _g737.pairwise;
  var pow = _g737.pow;
  var random = _g737.random;
  var read_file = _g737["read-file"];
  var reduce = _g737.reduce;
  var replicate = _g737.replicate;
  var reverse = _g737.reverse;
  var sd = _g737.sd;
  var search = _g737.search;
  var setenv = _g737.setenv;
  var sin = _g737.sin;
  var sinh = _g737.sinh;
  var some63 = _g737["some?"];
  var sort = _g737.sort;
  var splice = _g737.splice;
  var split = _g737.split;
  var sqrt = _g737.sqrt;
  var stash = _g737.stash;
  var string = _g737.string;
  var string_literal63 = _g737["string-literal?"];
  var string63 = _g737["string?"];
  var sub = _g737.sub;
  var sublist = _g737.sublist;
  var substring = _g737.substring;
  var table63 = _g737["table?"];
  var tan = _g737.tan;
  var tanh = _g737.tanh;
  var td = _g737.td;
  var tl = _g737.tl;
  var toplevel63 = _g737["toplevel?"];
  var unstash = _g737.unstash;
  var write = _g737.write;
  var write_file = _g737["write-file"];
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
    var _g798 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g798)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g777 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g777)) {
      var _g778 = bind42(x, _g777);
      var args = _g778[0];
      var _g779 = _g778[1];
      return(linked(name, join(["%local-function", name, args], _g779)));
    } else {
      return(linked(name, ["%local", name, x]));
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g774 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g774)) {
      var _g775 = bind42(x, _g774);
      var args = _g775[0];
      var _g776 = _g775[1];
      return(join(["%global-function", name, args], _g776));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g770 = sub(body, 0);
    var form = join(["fn", args], _g770);
    var _g771 = ["setenv", ["quote", name]];
    _g771.form = ["quote", form];
    _g771.macro = form;
    eval(_g771);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g763 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var alias = _g763.alias;
    var exp = _g763.export;
    var imp = _g763.import;
    var _g764 = imp || [];
    var _g765 = 0;
    while (_g765 < length(_g764)) {
      var k = _g764[_g765];
      load_module(k);
      var _g766 = module(k).alias || [];
      var _g767 = 0;
      while (_g767 < length(_g766)) {
        var a = _g766[_g767];
        add(imp, a);
        _g767 = _g767 + 1;
      }
      imports = join(imports, imported(k));
      _g765 = _g765 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g768 = exp || [];
    var _g769 = 0;
    while (_g769 < length(_g768)) {
      var k = _g768[_g769];
      setenv(k, {_stash: true, export: true});
      _g769 = _g769 + 1;
    }
    var k = module_key(current_module);
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g772 = sub(body, 0);
    var form = join(["fn", args], _g772);
    var keys = sub(_g772, length(_g772));
    var _g773 = ["setenv", ["quote", name]];
    _g773.form = ["quote", form];
    _g773.special = form;
    eval(join(_g773, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g793 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g833;
    if (nil63(v)) {
      var _g834;
      if (b.i) {
        _g834 = "i";
      } else {
        _g834 = make_id();
      }
      var i = _g834;
      _g833 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g793), ["inc", i]]];
    } else {
      var _g794 = ["target"];
      _g794.js = ["isNaN", ["parseInt", k]];
      _g794.lua = ["not", ["number?", k]];
      _g833 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g794, join(["let", [v, ["get", t1, k]]], _g793)]]];
    }
    return(["let", [t1, t], _g833]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g789 = sub(body, 0);
    var _g790 = bind42(args, _g789);
    var _g791 = _g790[0];
    var _g792 = _g790[1];
    return(join(["%function", _g791], _g792));
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
    function step(_g755) {
      var a = _g755[0];
      var b = _g755[1];
      var c = sub(_g755, 2);
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
    var _g797 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g797)]);
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
    var _g784 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g785 = join(["do"], macroexpand(_g784));
    drop(environment);
    return(_g785);
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
      var _g754 = body;
      var k = undefined;
      for (k in _g754) {
        if (isNaN(parseInt(k))) {
          var v = _g754[k];
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
  }}, "set*": {export: true, macro: function (name, value) {
    return(linked(name, ["set", name, value]));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g795 = elements;
    var _g796 = 0;
    while (_g796 < length(_g795)) {
      var e = _g795[_g796];
      l[e] = true;
      _g796 = _g796 + 1;
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
    var _g757 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g757)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g756 = sub(body, 0);
    return(["if", cond, join(["do"], _g756)]);
  }}, "with-bindings": {export: true, macro: function (_g780) {
    var names = _g780[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g781 = sub(body, 0);
    var x = make_id();
    var _g783 = ["setenv", x];
    _g783.variable = true;
    var _g782 = ["with-frame", ["each", [x], names, _g783]];
    _g782.scope = true;
    return(join(_g782, _g781));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g800 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g801 = ["table"];
    _g801._scope = scope;
    return(["do", ["add", "environment", _g801], ["let", [x, join(["do"], _g800)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g802) {
    var char = _g802[0];
    var stream = _g802[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g803 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g803)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g841;
    if (target === "lua") {
      _g841 = "{";
    } else {
      _g841 = "[";
    }
    var open = _g841;
    var _g842;
    if (target === "lua") {
      _g842 = "}";
    } else {
      _g842 = "]";
    }
    var close = _g842;
    var str = "";
    var _g821 = forms;
    var i = 0;
    while (i < length(_g821)) {
      var x = _g821[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g813 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g814 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g814;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g813 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g813 + ") {\n" + body + ind + "}\n");
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
    var _g806 = compile(cond);
    indent_level = indent_level + 1;
    var _g809 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g807 = _g809;
    var _g835;
    if (alt) {
      indent_level = indent_level + 1;
      var _g810 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g835 = _g810;
    }
    var _g808 = _g835;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g806 + ") {\n" + _g807 + ind + "}";
    } else {
      str = str + ind + "if " + _g806 + " then\n" + _g807;
    }
    if (_g808 && target === "js") {
      str = str + " else {\n" + _g808 + ind + "}";
    } else {
      if (_g808) {
        str = str + ind + "else\n" + _g808;
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
    var _g838;
    if (is63(value)) {
      _g838 = " = " + value1;
    } else {
      _g838 = "";
    }
    var rh = _g838;
    var _g839;
    if (target === "js") {
      _g839 = "var ";
    } else {
      _g839 = "local ";
    }
    var keyword = _g839;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g843;
    if (target === "lua") {
      _g843 = " = ";
    } else {
      _g843 = ": ";
    }
    var sep = _g843;
    var pairs = sortk(pairwise(forms), hd);
    var _g822 = pairs;
    var i = 0;
    while (i < length(_g822)) {
      var _g823 = _g822[i];
      var k = _g823[0];
      var v = _g823[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g824 = compile(v);
      var _g844;
      if (valid_id63(k)) {
        _g844 = k;
      } else {
        var _g845;
        if (target === "js" && string_literal63(k)) {
          _g845 = k;
        } else {
          var _g846;
          if (target === "js") {
            _g846 = quoted(k);
          } else {
            var _g847;
            if (string_literal63(k)) {
              _g847 = "[" + k + "]";
            } else {
              _g847 = "[" + quoted(k) + "]";
            }
            _g846 = _g847;
          }
          _g845 = _g846;
        }
        _g844 = _g845;
      }
      var _g825 = _g844;
      str = str + _g825 + sep + _g824;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g815 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g815;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g816 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g816;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g804 = forms;
    var _g805 = 0;
    while (_g805 < length(_g804)) {
      var x = _g804[_g805];
      str = str + compile(x, {_stash: true, stmt: true});
      _g805 = _g805 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g837;
    if (target === "js") {
      _g837 = "throw new " + compile(["Error", x]);
    } else {
      _g837 = "error(" + compile(x) + ")";
    }
    var e = _g837;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g820 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g820, 0) === "{") {
      _g820 = "(" + _g820 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g820 + "." + inner(k));
    } else {
      return(_g820 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g836;
    if (nil63(x)) {
      _g836 = "return";
    } else {
      _g836 = "return(" + compile(x) + ")";
    }
    var _g817 = _g836;
    return(indentation() + _g817);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g818 = compile(lh);
    var _g840;
    if (nil63(rh)) {
      _g840 = "nil";
    } else {
      _g840 = rh;
    }
    var _g819 = compile(_g840);
    return(indentation() + _g818 + " = " + _g819);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g811 = compile(cond);
    indent_level = indent_level + 1;
    var _g812 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g812;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g811 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g811 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, linked: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g826 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var alias = _g826.alias;
    var exp = _g826.export;
    var imp = _g826.import;
    var _g827 = imp || [];
    var _g828 = 0;
    while (_g828 < length(_g827)) {
      var k = _g827[_g828];
      load_module(k);
      var _g829 = module(k).alias || [];
      var _g830 = 0;
      while (_g830 < length(_g829)) {
        var a = _g829[_g830];
        add(imp, a);
        _g830 = _g830 + 1;
      }
      imports = join(imports, imported(k));
      _g828 = _g828 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g831 = exp || [];
    var _g832 = 0;
    while (_g832 < length(_g831)) {
      var k = _g831[_g832];
      setenv(k, {_stash: true, export: true});
      _g832 = _g832 + 1;
    }
    var k = module_key(current_module);
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], imports));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g849 = nexus["lumen/runtime"];
  var _37 = _g849["%"];
  var _37message_handler = _g849["%message-handler"];
  var _42 = _g849["*"];
  var _43 = _g849["+"];
  var _ = _g849["-"];
  var _47 = _g849["/"];
  var _60 = _g849["<"];
  var _6061 = _g849["<="];
  var _61 = _g849["="];
  var _62 = _g849[">"];
  var _6261 = _g849[">="];
  var abs = _g849.abs;
  var acos = _g849.acos;
  var add = _g849.add;
  var apply = _g849.apply;
  var asin = _g849.asin;
  var atan = _g849.atan;
  var atan2 = _g849.atan2;
  var atom63 = _g849["atom?"];
  var boolean63 = _g849["boolean?"];
  var cat = _g849.cat;
  var ceil = _g849.ceil;
  var char = _g849.char;
  var code = _g849.code;
  var composite63 = _g849["composite?"];
  var cos = _g849.cos;
  var drop = _g849.drop;
  var empty63 = _g849["empty?"];
  var exclude = _g849.exclude;
  var exit = _g849.exit;
  var extend = _g849.extend;
  var find = _g849.find;
  var flat = _g849.flat;
  var flat1 = _g849.flat1;
  var floor = _g849.floor;
  var function63 = _g849["function?"];
  var hd = _g849.hd;
  var id_literal63 = _g849["id-literal?"];
  var in63 = _g849["in?"];
  var inner = _g849.inner;
  var is63 = _g849["is?"];
  var iterate = _g849.iterate;
  var join = _g849.join;
  var keep = _g849.keep;
  var keys63 = _g849["keys?"];
  var last = _g849.last;
  var length = _g849.length;
  var list63 = _g849["list?"];
  var log = _g849.log;
  var log10 = _g849.log10;
  var make_id = _g849["make-id"];
  var map = _g849.map;
  var max = _g849.max;
  var min = _g849.min;
  var module = _g849.module;
  var module_key = _g849["module-key"];
  var nil63 = _g849["nil?"];
  var none63 = _g849["none?"];
  var number = _g849.number;
  var number63 = _g849["number?"];
  var pairwise = _g849.pairwise;
  var pow = _g849.pow;
  var random = _g849.random;
  var read_file = _g849["read-file"];
  var reduce = _g849.reduce;
  var replicate = _g849.replicate;
  var reverse = _g849.reverse;
  var sd = _g849.sd;
  var search = _g849.search;
  var setenv = _g849.setenv;
  var sin = _g849.sin;
  var sinh = _g849.sinh;
  var some63 = _g849["some?"];
  var sort = _g849.sort;
  var splice = _g849.splice;
  var split = _g849.split;
  var sqrt = _g849.sqrt;
  var stash = _g849.stash;
  var string = _g849.string;
  var string_literal63 = _g849["string-literal?"];
  var string63 = _g849["string?"];
  var sub = _g849.sub;
  var sublist = _g849.sublist;
  var substring = _g849.substring;
  var table63 = _g849["table?"];
  var tan = _g849.tan;
  var tanh = _g849.tanh;
  var td = _g849.td;
  var tl = _g849.tl;
  var toplevel63 = _g849["toplevel?"];
  var unstash = _g849.unstash;
  var write = _g849.write;
  var write_file = _g849["write-file"];
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
    var _g852 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g854) {
        return([false, _g854.message]);
      }
    })();
    var _g1 = _g852[0];
    var x = _g852[1];
    if (is63(x)) {
      return(print(string(x) + " "));
    }
  }
  nexus["lumen/main"].rep = rep;
  function repl() {
    function step(str) {
      rep(str);
      return(write("> "));
    }
    write("> ");
    process.stdin.setEncoding("utf8");
    return(process.stdin.on("data", step));
  }
  nexus["lumen/main"].repl = repl;
  function usage() {
    print(string("usage: lumen [options] <module>") + " ");
    print(string("options:") + " ");
    print(string("  -o <output>\tOutput file") + " ");
    print(string("  -t <target>\tTarget language (default: lua)") + " ");
    print(string("  -e <expr>\tExpression to evaluate") + " ");
    return(exit());
  }
  nexus["lumen/main"].usage = usage;
  function main() {
    var args = sub(process.argv, 2);
    if (hd(args) === "-h" || hd(args) === "--help") {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var _g853 = args;
    var i = 0;
    while (i < length(_g853)) {
      var arg = _g853[i];
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
  nexus["lumen/main"].main = main;
  main();
})();
