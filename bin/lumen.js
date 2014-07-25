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
  nexus["lumen/runtime"].keep = keep;
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
    var _g61;
    if (f) {
      _g61 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g61));
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
    var _g40 = l;
    var _g41 = 0;
    while (_g41 < length(_g40)) {
      var x = _g40[_g41];
      var _g42 = f(x);
      if (splice63(_g42)) {
        l1 = join(l1, _g42.value);
      } else {
        if (is63(_g42)) {
          add(l1, _g42);
        }
      }
      _g41 = _g41 + 1;
    }
    return(l1);
  }
  nexus["lumen/runtime"].mapl = mapl;
  function map(f, t) {
    var l = mapl(f, t);
    var _g43 = t;
    var k = undefined;
    for (k in _g43) {
      if (isNaN(parseInt(k))) {
        var v = _g43[k];
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
    var _g44 = t;
    var k = undefined;
    for (k in _g44) {
      if (isNaN(parseInt(k))) {
        var v = _g44[k];
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
      var _g45 = args;
      var k = undefined;
      for (k in _g45) {
        if (isNaN(parseInt(k))) {
          var v = _g45[k];
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
        var _g46 = l;
        var k = undefined;
        for (k in _g46) {
          if (isNaN(parseInt(k))) {
            var v = _g46[k];
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
    var _g47 = sub(xs, 0);
    return(join(t, _g47));
  }
  nexus["lumen/runtime"].extend = extend;
  function exclude(t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g48 = sub(keys, 0);
    var t1 = sublist(t);
    var _g49 = t;
    var k = undefined;
    for (k in _g49) {
      if (isNaN(parseInt(k))) {
        var v = _g49[k];
        if (!_g48[k]) {
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
    var _g50 = sub(xs, 0);
    if (none63(_g50)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g50));
    }
  }
  nexus["lumen/runtime"].cat = cat;
  function _43() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g51));
  }
  nexus["lumen/runtime"]["+"] = _43;
  function _() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g52)));
  }
  nexus["lumen/runtime"]["-"] = _;
  function _42() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g53));
  }
  nexus["lumen/runtime"]["*"] = _42;
  function _47() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g54)));
  }
  nexus["lumen/runtime"]["/"] = _47;
  function _37() {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g55 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g55)));
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
            var _g56 = x;
            var k = undefined;
            for (k in _g56) {
              if (isNaN(parseInt(k))) {
                var v = _g56[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g57 = x1;
            var i = 0;
            while (i < length(_g57)) {
              var y = _g57[i];
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
    var _g58 = stash(args);
    return(f.apply(f, _g58));
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
    var _g59 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g60 = _g59;
      var k1 = undefined;
      for (k1 in _g60) {
        if (isNaN(parseInt(k1))) {
          var v = _g60[k1];
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
  var _g66 = nexus["lumen/runtime"];
  var _37 = _g66["%"];
  var _37message_handler = _g66["%message-handler"];
  var _42 = _g66["*"];
  var _43 = _g66["+"];
  var _ = _g66["-"];
  var _47 = _g66["/"];
  var _60 = _g66["<"];
  var _6061 = _g66["<="];
  var _61 = _g66["="];
  var _62 = _g66[">"];
  var _6261 = _g66[">="];
  var abs = _g66.abs;
  var acos = _g66.acos;
  var add = _g66.add;
  var apply = _g66.apply;
  var asin = _g66.asin;
  var atan = _g66.atan;
  var atan2 = _g66.atan2;
  var atom63 = _g66["atom?"];
  var boolean63 = _g66["boolean?"];
  var cat = _g66.cat;
  var ceil = _g66.ceil;
  var char = _g66.char;
  var code = _g66.code;
  var composite63 = _g66["composite?"];
  var cos = _g66.cos;
  var drop = _g66.drop;
  var empty63 = _g66["empty?"];
  var exclude = _g66.exclude;
  var exit = _g66.exit;
  var extend = _g66.extend;
  var find = _g66.find;
  var flat = _g66.flat;
  var flat1 = _g66.flat1;
  var floor = _g66.floor;
  var function63 = _g66["function?"];
  var hd = _g66.hd;
  var id_literal63 = _g66["id-literal?"];
  var in63 = _g66["in?"];
  var inner = _g66.inner;
  var is63 = _g66["is?"];
  var iterate = _g66.iterate;
  var join = _g66.join;
  var keep = _g66.keep;
  var keys63 = _g66["keys?"];
  var last = _g66.last;
  var length = _g66.length;
  var list63 = _g66["list?"];
  var log = _g66.log;
  var log10 = _g66.log10;
  var make_id = _g66["make-id"];
  var map = _g66.map;
  var max = _g66.max;
  var min = _g66.min;
  var module = _g66.module;
  var module_key = _g66["module-key"];
  var nil63 = _g66["nil?"];
  var none63 = _g66["none?"];
  var number = _g66.number;
  var number63 = _g66["number?"];
  var pairwise = _g66.pairwise;
  var pow = _g66.pow;
  var random = _g66.random;
  var read_file = _g66["read-file"];
  var reduce = _g66.reduce;
  var replicate = _g66.replicate;
  var reverse = _g66.reverse;
  var sd = _g66.sd;
  var search = _g66.search;
  var setenv = _g66.setenv;
  var sin = _g66.sin;
  var sinh = _g66.sinh;
  var some63 = _g66["some?"];
  var sort = _g66.sort;
  var splice = _g66.splice;
  var split = _g66.split;
  var sqrt = _g66.sqrt;
  var stash = _g66.stash;
  var string = _g66.string;
  var string_literal63 = _g66["string-literal?"];
  var string63 = _g66["string?"];
  var sub = _g66.sub;
  var sublist = _g66.sublist;
  var substring = _g66.substring;
  var table63 = _g66["table?"];
  var tan = _g66.tan;
  var tanh = _g66.tanh;
  var td = _g66.td;
  var tl = _g66.tl;
  var toplevel63 = _g66["toplevel?"];
  var unstash = _g66.unstash;
  var write = _g66.write;
  var write_file = _g66["write-file"];
  function getenv(k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g69 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g70 = undefined;
        var _g71 = _g69;
        var x = undefined;
        for (x in _g71) {
          if (isNaN(parseInt(x))) {
            var _g62 = _g71[x];
            _g70 = x;
          }
        }
        if (_g70) {
          return(b[_g70]);
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
      var _g101;
      if (c === "\n") {
        _g101 = "\\n";
      } else {
        var _g102;
        if (c === "\"") {
          _g102 = "\\\"";
        } else {
          var _g103;
          if (c === "\\") {
            _g103 = "\\\\";
          } else {
            _g103 = c;
          }
          _g102 = _g103;
        }
        _g101 = _g102;
      }
      var c1 = _g101;
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
      var _g72 = args;
      var k = undefined;
      for (k in _g72) {
        if (isNaN(parseInt(k))) {
          var v = _g72[k];
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
        var _g73 = lh;
        var i = 0;
        while (i < length(_g73)) {
          var x = _g73[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g74 = lh;
        var k = undefined;
        for (k in _g74) {
          if (isNaN(parseInt(k))) {
            var v = _g74[k];
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
      var _g75 = args;
      var _g76 = 0;
      while (_g76 < length(_g75)) {
        var arg = _g75[_g76];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g76 = _g76 + 1;
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
          var _g63 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g79 = args;
          var _g80 = 0;
          while (_g80 < length(_g79)) {
            var _g77 = _g79[_g80];
            setenv(_g77, {_stash: true, variable: true});
            _g80 = _g80 + 1;
          }
          var _g78 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g78);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g64 = form[0];
            var name = form[1];
            var _g81 = form[2];
            var _g82 = sub(form, 3);
            add(environment, {_scope: true});
            var _g85 = _g81;
            var _g86 = 0;
            while (_g86 < length(_g85)) {
              var _g83 = _g85[_g86];
              setenv(_g83, {_stash: true, variable: true});
              _g86 = _g86 + 1;
            }
            var _g84 = join([x, name, map(macroexpand, _g81)], macroexpand(_g82));
            drop(environment);
            return(_g84);
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
    var _g87 = form;
    var k = undefined;
    for (k in _g87) {
      if (isNaN(parseInt(k))) {
        var v = _g87[k];
        var _g104;
        if (quasisplice63(v, depth)) {
          _g104 = quasiexpand(v[1]);
        } else {
          _g104 = quasiexpand(v, depth);
        }
        var _g88 = _g104;
        last(xs)[k] = _g88;
      }
    }
    var _g89 = form;
    var _g90 = 0;
    while (_g90 < length(_g89)) {
      var x = _g89[_g90];
      if (quasisplice63(x, depth)) {
        var _g91 = quasiexpand(x[1]);
        add(xs, _g91);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g90 = _g90 + 1;
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
      var _g105;
      if (c === "-") {
        _g105 = "_";
      } else {
        var _g106;
        if (valid_char63(n)) {
          _g106 = c;
        } else {
          var _g107;
          if (i === 0) {
            _g107 = "_" + n;
          } else {
            _g107 = n;
          }
          _g106 = _g107;
        }
        _g105 = _g106;
      }
      var c1 = _g105;
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
    var _g97 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g97.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g98 = module(spec).export;
      var n = undefined;
      for (n in _g98) {
        if (isNaN(parseInt(n))) {
          var b = _g98[n];
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
    var _g99 = t;
    var k = undefined;
    for (k in _g99) {
      if (isNaN(parseInt(k))) {
        var v = _g99[k];
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
    var _g100 = ["table"];
    _g100.alias = quoted(m.alias);
    _g100.export = quote_frame(m.export);
    _g100.import = quoted(m.import);
    return(_g100);
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
  var _g122 = nexus["lumen/utilities"];
  var bind = _g122.bind;
  var bind42 = _g122["bind*"];
  var bound63 = _g122["bound?"];
  var getenv = _g122.getenv;
  var id = _g122.id;
  var imported = _g122.imported;
  var indentation = _g122.indentation;
  var initial_environment = _g122["initial-environment"];
  var linked = _g122.linked;
  var macro_function = _g122["macro-function"];
  var macro63 = _g122["macro?"];
  var macroexpand = _g122.macroexpand;
  var mapo = _g122.mapo;
  var quasiexpand = _g122.quasiexpand;
  var quote_environment = _g122["quote-environment"];
  var quote_modules = _g122["quote-modules"];
  var quoted = _g122.quoted;
  var reserved63 = _g122["reserved?"];
  var sortk = _g122.sortk;
  var special_form63 = _g122["special-form?"];
  var special63 = _g122["special?"];
  var stash42 = _g122["stash*"];
  var statement63 = _g122["statement?"];
  var symbol_expansion = _g122["symbol-expansion"];
  var symbol63 = _g122["symbol?"];
  var toplevel63 = _g122["toplevel?"];
  var valid_id63 = _g122["valid-id?"];
  var variable63 = _g122["variable?"];
  var _g123 = nexus["lumen/reader"];
  var make_stream = _g123["make-stream"];
  var read = _g123.read;
  var read_all = _g123["read-all"];
  var read_from_string = _g123["read-from-string"];
  var read_table = _g123["read-table"];
  var _g124 = nexus["lumen/runtime"];
  var _37 = _g124["%"];
  var _37message_handler = _g124["%message-handler"];
  var _42 = _g124["*"];
  var _43 = _g124["+"];
  var _ = _g124["-"];
  var _47 = _g124["/"];
  var _60 = _g124["<"];
  var _6061 = _g124["<="];
  var _61 = _g124["="];
  var _62 = _g124[">"];
  var _6261 = _g124[">="];
  var abs = _g124.abs;
  var acos = _g124.acos;
  var add = _g124.add;
  var apply = _g124.apply;
  var asin = _g124.asin;
  var atan = _g124.atan;
  var atan2 = _g124.atan2;
  var atom63 = _g124["atom?"];
  var boolean63 = _g124["boolean?"];
  var cat = _g124.cat;
  var ceil = _g124.ceil;
  var char = _g124.char;
  var code = _g124.code;
  var composite63 = _g124["composite?"];
  var cos = _g124.cos;
  var drop = _g124.drop;
  var empty63 = _g124["empty?"];
  var exclude = _g124.exclude;
  var exit = _g124.exit;
  var extend = _g124.extend;
  var find = _g124.find;
  var flat = _g124.flat;
  var flat1 = _g124.flat1;
  var floor = _g124.floor;
  var function63 = _g124["function?"];
  var hd = _g124.hd;
  var id_literal63 = _g124["id-literal?"];
  var in63 = _g124["in?"];
  var inner = _g124.inner;
  var is63 = _g124["is?"];
  var iterate = _g124.iterate;
  var join = _g124.join;
  var keep = _g124.keep;
  var keys63 = _g124["keys?"];
  var last = _g124.last;
  var length = _g124.length;
  var list63 = _g124["list?"];
  var log = _g124.log;
  var log10 = _g124.log10;
  var make_id = _g124["make-id"];
  var map = _g124.map;
  var max = _g124.max;
  var min = _g124.min;
  var module = _g124.module;
  var module_key = _g124["module-key"];
  var nil63 = _g124["nil?"];
  var none63 = _g124["none?"];
  var number = _g124.number;
  var number63 = _g124["number?"];
  var pairwise = _g124.pairwise;
  var pow = _g124.pow;
  var random = _g124.random;
  var read_file = _g124["read-file"];
  var reduce = _g124.reduce;
  var replicate = _g124.replicate;
  var reverse = _g124.reverse;
  var sd = _g124.sd;
  var search = _g124.search;
  var setenv = _g124.setenv;
  var sin = _g124.sin;
  var sinh = _g124.sinh;
  var some63 = _g124["some?"];
  var sort = _g124.sort;
  var splice = _g124.splice;
  var split = _g124.split;
  var sqrt = _g124.sqrt;
  var stash = _g124.stash;
  var string = _g124.string;
  var string_literal63 = _g124["string-literal?"];
  var string63 = _g124["string?"];
  var sub = _g124.sub;
  var sublist = _g124.sublist;
  var substring = _g124.substring;
  var table63 = _g124["table?"];
  var tan = _g124.tan;
  var tanh = _g124.tanh;
  var td = _g124.td;
  var tl = _g124.tl;
  var toplevel63 = _g124["toplevel?"];
  var unstash = _g124.unstash;
  var write = _g124.write;
  var write_file = _g124["write-file"];
  var _g130 = [];
  _g130.js = "!";
  _g130.lua = "not ";
  var _g128 = [];
  var _g131 = [];
  _g131.js = "!";
  _g131.lua = "not ";
  _g128["not"] = _g131;
  var _g133 = [];
  _g133["%"] = true;
  _g133["*"] = true;
  _g133["/"] = true;
  var _g135 = [];
  _g135["+"] = true;
  _g135["-"] = true;
  var _g139 = [];
  _g139.js = "+";
  _g139.lua = "..";
  var _g137 = [];
  var _g140 = [];
  _g140.js = "+";
  _g140.lua = "..";
  _g137.cat = _g140;
  var _g142 = [];
  _g142["<"] = true;
  _g142["<="] = true;
  _g142[">"] = true;
  _g142[">="] = true;
  var _g146 = [];
  _g146.js = "===";
  _g146.lua = "==";
  var _g148 = [];
  _g148.js = "!=";
  _g148.lua = "~=";
  var _g144 = [];
  var _g149 = [];
  _g149.js = "===";
  _g149.lua = "==";
  _g144["="] = _g149;
  var _g150 = [];
  _g150.js = "!=";
  _g150.lua = "~=";
  _g144["~="] = _g150;
  var _g154 = [];
  _g154.js = "&&";
  _g154.lua = "and";
  var _g152 = [];
  var _g155 = [];
  _g155.js = "&&";
  _g155.lua = "and";
  _g152["and"] = _g155;
  var _g159 = [];
  _g159.js = "||";
  _g159.lua = "or";
  var _g157 = [];
  var _g160 = [];
  _g160.js = "||";
  _g160.lua = "or";
  _g157["or"] = _g160;
  var infix = [_g128, _g133, _g135, _g137, _g142, _g144, _g152, _g157];
  nexus["lumen/compiler"].infix = infix;
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  nexus["lumen/compiler"]["unary?"] = unary63;
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g161 = infix;
      var i = 0;
      while (i < length(_g161)) {
        var level = _g161[i];
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
    var _g162 = args;
    var i = 0;
    while (i < length(_g162)) {
      var arg = _g162[i];
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
    var _g163 = getenv(x);
    var self_tr63 = _g163.tr;
    var stmt = _g163.stmt;
    var special = _g163.special;
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
    var _g164 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g164.right;
    var _g187;
    if (right) {
      _g187 = _6261;
    } else {
      _g187 = _62;
    }
    if (_g187(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  function compile_infix(form) {
    var op = form[0];
    var _g165 = sub(form, 1);
    var a = _g165[0];
    var b = _g165[1];
    var _g166 = op_delims(form, a);
    var ao = _g166[0];
    var ac = _g166[1];
    var _g167 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g167[0];
    var bc = _g167[1];
    var _g168 = compile(a);
    var _g169 = compile(b);
    var _g170 = getop(op);
    if (unary63(form)) {
      return(_g170 + ao + _g168 + ac);
    } else {
      return(ao + _g168 + ac + " " + _g170 + " " + bo + _g169 + bc);
    }
  }
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  function compile_function(args, body) {
    var _g171 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g171.name;
    var prefix = _g171.prefix;
    var _g188;
    if (name) {
      _g188 = compile(name);
    } else {
      _g188 = "";
    }
    var id = _g188;
    var _g172 = prefix || "";
    var _g173 = compile_args(args);
    indent_level = indent_level + 1;
    var _g175 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g174 = _g175;
    var ind = indentation();
    var _g189;
    if (target === "js") {
      _g189 = "";
    } else {
      _g189 = "end";
    }
    var tr = _g189;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g173 + " {\n" + _g174 + ind + "}" + tr);
    } else {
      return(_g172 + "function " + id + _g173 + "\n" + _g174 + ind + tr);
    }
  }
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  nexus["lumen/compiler"]["can-return?"] = can_return63;
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
        var _g190;
        if (stmt) {
          _g190 = indentation();
        } else {
          _g190 = "";
        }
        var ind = _g190;
        var _g191;
        if (atom63(form)) {
          _g191 = compile_atom(form);
        } else {
          var _g192;
          if (infix63(hd(form))) {
            _g192 = compile_infix(form);
          } else {
            _g192 = compile_call(form);
          }
          _g191 = _g192;
        }
        var _g177 = _g191;
        return(ind + _g177 + tr);
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
    var _g178 = sub(args, 0, length(args) - 1);
    var _g179 = 0;
    while (_g179 < length(_g178)) {
      var x = _g178[_g179];
      add(hoist, lower(x, hoist, stmt63));
      _g179 = _g179 + 1;
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
    var _g180 = args[1];
    var _g181 = args[2];
    if (stmt63 || tail63) {
      var _g194;
      if (_g181) {
        _g194 = [lower_body([_g181], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g180], tail63)], _g194)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g193;
      if (_g181) {
        _g193 = [lower(["set", e, _g181])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g180])], _g193));
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
      var _g195;
      if (x === "and") {
        _g195 = ["%if", id, b, id];
      } else {
        _g195 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g195], hoist));
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
    var _g182 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g182, lower_body(body, true)]));
  }
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  function lower_call(form, hoist) {
    var _g183 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g183)) {
      return(_g183);
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
  nexus["lumen/compiler"]["open-module"] = open_module;
  function load_module(spec) {
    var _g186 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g186.all;
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
  var _g197 = nexus["lumen/utilities"];
  var bind = _g197.bind;
  var bind42 = _g197["bind*"];
  var bound63 = _g197["bound?"];
  var getenv = _g197.getenv;
  var id = _g197.id;
  var imported = _g197.imported;
  var indentation = _g197.indentation;
  var initial_environment = _g197["initial-environment"];
  var linked = _g197.linked;
  var macro_function = _g197["macro-function"];
  var macro63 = _g197["macro?"];
  var macroexpand = _g197.macroexpand;
  var mapo = _g197.mapo;
  var quasiexpand = _g197.quasiexpand;
  var quote_environment = _g197["quote-environment"];
  var quote_modules = _g197["quote-modules"];
  var quoted = _g197.quoted;
  var reserved63 = _g197["reserved?"];
  var sortk = _g197.sortk;
  var special_form63 = _g197["special-form?"];
  var special63 = _g197["special?"];
  var stash42 = _g197["stash*"];
  var statement63 = _g197["statement?"];
  var symbol_expansion = _g197["symbol-expansion"];
  var symbol63 = _g197["symbol?"];
  var toplevel63 = _g197["toplevel?"];
  var valid_id63 = _g197["valid-id?"];
  var variable63 = _g197["variable?"];
  var _g198 = nexus["lumen/compiler"];
  var compile = _g198.compile;
  var compile_function = _g198["compile-function"];
  var compile_module = _g198["compile-module"];
  var declare = _g198.declare;
  var eval = _g198.eval;
  var in_module = _g198["in-module"];
  var load_module = _g198["load-module"];
  var open_module = _g198["open-module"];
  var _g199 = nexus["lumen/runtime"];
  var _37 = _g199["%"];
  var _37message_handler = _g199["%message-handler"];
  var _42 = _g199["*"];
  var _43 = _g199["+"];
  var _ = _g199["-"];
  var _47 = _g199["/"];
  var _60 = _g199["<"];
  var _6061 = _g199["<="];
  var _61 = _g199["="];
  var _62 = _g199[">"];
  var _6261 = _g199[">="];
  var abs = _g199.abs;
  var acos = _g199.acos;
  var add = _g199.add;
  var apply = _g199.apply;
  var asin = _g199.asin;
  var atan = _g199.atan;
  var atan2 = _g199.atan2;
  var atom63 = _g199["atom?"];
  var boolean63 = _g199["boolean?"];
  var cat = _g199.cat;
  var ceil = _g199.ceil;
  var char = _g199.char;
  var code = _g199.code;
  var composite63 = _g199["composite?"];
  var cos = _g199.cos;
  var drop = _g199.drop;
  var empty63 = _g199["empty?"];
  var exclude = _g199.exclude;
  var exit = _g199.exit;
  var extend = _g199.extend;
  var find = _g199.find;
  var flat = _g199.flat;
  var flat1 = _g199.flat1;
  var floor = _g199.floor;
  var function63 = _g199["function?"];
  var hd = _g199.hd;
  var id_literal63 = _g199["id-literal?"];
  var in63 = _g199["in?"];
  var inner = _g199.inner;
  var is63 = _g199["is?"];
  var iterate = _g199.iterate;
  var join = _g199.join;
  var keep = _g199.keep;
  var keys63 = _g199["keys?"];
  var last = _g199.last;
  var length = _g199.length;
  var list63 = _g199["list?"];
  var log = _g199.log;
  var log10 = _g199.log10;
  var make_id = _g199["make-id"];
  var map = _g199.map;
  var max = _g199.max;
  var min = _g199.min;
  var module = _g199.module;
  var module_key = _g199["module-key"];
  var nil63 = _g199["nil?"];
  var none63 = _g199["none?"];
  var number = _g199.number;
  var number63 = _g199["number?"];
  var pairwise = _g199.pairwise;
  var pow = _g199.pow;
  var random = _g199.random;
  var read_file = _g199["read-file"];
  var reduce = _g199.reduce;
  var replicate = _g199.replicate;
  var reverse = _g199.reverse;
  var sd = _g199.sd;
  var search = _g199.search;
  var setenv = _g199.setenv;
  var sin = _g199.sin;
  var sinh = _g199.sinh;
  var some63 = _g199["some?"];
  var sort = _g199.sort;
  var splice = _g199.splice;
  var split = _g199.split;
  var sqrt = _g199.sqrt;
  var stash = _g199.stash;
  var string = _g199.string;
  var string_literal63 = _g199["string-literal?"];
  var string63 = _g199["string?"];
  var sub = _g199.sub;
  var sublist = _g199.sublist;
  var substring = _g199.substring;
  var table63 = _g199["table?"];
  var tan = _g199.tan;
  var tanh = _g199.tanh;
  var td = _g199.td;
  var tl = _g199.tl;
  var toplevel63 = _g199["toplevel?"];
  var unstash = _g199.unstash;
  var write = _g199.write;
  var write_file = _g199["write-file"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g398 = nexus["lumen/utilities"];
  var bind = _g398.bind;
  var bind42 = _g398["bind*"];
  var bound63 = _g398["bound?"];
  var getenv = _g398.getenv;
  var id = _g398.id;
  var imported = _g398.imported;
  var indentation = _g398.indentation;
  var initial_environment = _g398["initial-environment"];
  var linked = _g398.linked;
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
  var declare = _g399.declare;
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
  nexus["lumen/boot"] = {};
  var _g738 = nexus["lumen/utilities"];
  var bind = _g738.bind;
  var bind42 = _g738["bind*"];
  var bound63 = _g738["bound?"];
  var getenv = _g738.getenv;
  var id = _g738.id;
  var imported = _g738.imported;
  var indentation = _g738.indentation;
  var initial_environment = _g738["initial-environment"];
  var linked = _g738.linked;
  var macro_function = _g738["macro-function"];
  var macro63 = _g738["macro?"];
  var macroexpand = _g738.macroexpand;
  var mapo = _g738.mapo;
  var quasiexpand = _g738.quasiexpand;
  var quote_environment = _g738["quote-environment"];
  var quote_modules = _g738["quote-modules"];
  var quoted = _g738.quoted;
  var reserved63 = _g738["reserved?"];
  var sortk = _g738.sortk;
  var special_form63 = _g738["special-form?"];
  var special63 = _g738["special?"];
  var stash42 = _g738["stash*"];
  var statement63 = _g738["statement?"];
  var symbol_expansion = _g738["symbol-expansion"];
  var symbol63 = _g738["symbol?"];
  var toplevel63 = _g738["toplevel?"];
  var valid_id63 = _g738["valid-id?"];
  var variable63 = _g738["variable?"];
  var _g739 = nexus["lumen/compiler"];
  var compile = _g739.compile;
  var compile_function = _g739["compile-function"];
  var compile_module = _g739["compile-module"];
  var declare = _g739.declare;
  var eval = _g739.eval;
  var in_module = _g739["in-module"];
  var load_module = _g739["load-module"];
  var open_module = _g739["open-module"];
  var _g740 = nexus["lumen/runtime"];
  var _37 = _g740["%"];
  var _37message_handler = _g740["%message-handler"];
  var _42 = _g740["*"];
  var _43 = _g740["+"];
  var _ = _g740["-"];
  var _47 = _g740["/"];
  var _60 = _g740["<"];
  var _6061 = _g740["<="];
  var _61 = _g740["="];
  var _62 = _g740[">"];
  var _6261 = _g740[">="];
  var abs = _g740.abs;
  var acos = _g740.acos;
  var add = _g740.add;
  var apply = _g740.apply;
  var asin = _g740.asin;
  var atan = _g740.atan;
  var atan2 = _g740.atan2;
  var atom63 = _g740["atom?"];
  var boolean63 = _g740["boolean?"];
  var cat = _g740.cat;
  var ceil = _g740.ceil;
  var char = _g740.char;
  var code = _g740.code;
  var composite63 = _g740["composite?"];
  var cos = _g740.cos;
  var drop = _g740.drop;
  var empty63 = _g740["empty?"];
  var exclude = _g740.exclude;
  var exit = _g740.exit;
  var extend = _g740.extend;
  var find = _g740.find;
  var flat = _g740.flat;
  var flat1 = _g740.flat1;
  var floor = _g740.floor;
  var function63 = _g740["function?"];
  var hd = _g740.hd;
  var id_literal63 = _g740["id-literal?"];
  var in63 = _g740["in?"];
  var inner = _g740.inner;
  var is63 = _g740["is?"];
  var iterate = _g740.iterate;
  var join = _g740.join;
  var keep = _g740.keep;
  var keys63 = _g740["keys?"];
  var last = _g740.last;
  var length = _g740.length;
  var list63 = _g740["list?"];
  var log = _g740.log;
  var log10 = _g740.log10;
  var make_id = _g740["make-id"];
  var map = _g740.map;
  var max = _g740.max;
  var min = _g740.min;
  var module = _g740.module;
  var module_key = _g740["module-key"];
  var nil63 = _g740["nil?"];
  var none63 = _g740["none?"];
  var number = _g740.number;
  var number63 = _g740["number?"];
  var pairwise = _g740.pairwise;
  var pow = _g740.pow;
  var random = _g740.random;
  var read_file = _g740["read-file"];
  var reduce = _g740.reduce;
  var replicate = _g740.replicate;
  var reverse = _g740.reverse;
  var sd = _g740.sd;
  var search = _g740.search;
  var setenv = _g740.setenv;
  var sin = _g740.sin;
  var sinh = _g740.sinh;
  var some63 = _g740["some?"];
  var sort = _g740.sort;
  var splice = _g740.splice;
  var split = _g740.split;
  var sqrt = _g740.sqrt;
  var stash = _g740.stash;
  var string = _g740.string;
  var string_literal63 = _g740["string-literal?"];
  var string63 = _g740["string?"];
  var sub = _g740.sub;
  var sublist = _g740.sublist;
  var substring = _g740.substring;
  var table63 = _g740["table?"];
  var tan = _g740.tan;
  var tanh = _g740.tanh;
  var td = _g740.td;
  var tl = _g740.tl;
  var toplevel63 = _g740["toplevel?"];
  var unstash = _g740.unstash;
  var write = _g740.write;
  var write_file = _g740["write-file"];
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
    var _g762 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g762)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g780 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g780)) {
      var _g781 = bind42(x, _g780);
      var args = _g781[0];
      var _g782 = _g781[1];
      return(linked(name, join(["%local-function", name, args], _g782)));
    } else {
      return(linked(name, ["%local", name, x]));
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g775 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g775)) {
      var _g776 = bind42(x, _g775);
      var args = _g776[0];
      var _g777 = _g776[1];
      return(join(["%global-function", name, args], _g777));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g796 = sub(body, 0);
    var form = join(["fn", args], _g796);
    var _g797 = ["setenv", ["quote", name]];
    _g797.form = ["quote", form];
    _g797.macro = form;
    eval(_g797);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g798 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g798.export;
    var alias = _g798.alias;
    var imp = _g798.import;
    var _g799 = imp || [];
    var _g800 = 0;
    while (_g800 < length(_g799)) {
      var k = _g799[_g800];
      load_module(k);
      var _g801 = module(k).alias || [];
      var _g802 = 0;
      while (_g802 < length(_g801)) {
        var a = _g801[_g802];
        add(imp, a);
        _g802 = _g802 + 1;
      }
      imports = join(imports, imported(k));
      _g800 = _g800 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g803 = exp || [];
    var _g804 = 0;
    while (_g804 < length(_g803)) {
      var k = _g803[_g804];
      setenv(k, {_stash: true, export: true});
      _g804 = _g804 + 1;
    }
    var k = module_key(current_module);
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], imports));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g764 = sub(body, 0);
    var form = join(["fn", args], _g764);
    var keys = sub(_g764, length(_g764));
    var _g765 = ["setenv", ["quote", name]];
    _g765.form = ["quote", form];
    _g765.special = form;
    eval(join(_g765, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g768 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g836;
    if (nil63(v)) {
      var _g837;
      if (b.i) {
        _g837 = "i";
      } else {
        _g837 = make_id();
      }
      var i = _g837;
      _g836 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g768), ["inc", i]]];
    } else {
      var _g769 = ["target"];
      _g769.js = ["isNaN", ["parseInt", k]];
      _g769.lua = ["not", ["number?", k]];
      _g836 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g769, join(["let", [v, ["get", t1, k]]], _g768)]]];
    }
    return(["let", [t1, t], _g836]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g757 = sub(body, 0);
    var _g758 = bind42(args, _g757);
    var _g759 = _g758[0];
    var _g760 = _g758[1];
    return(join(["%function", _g759], _g760));
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
    function step(_g767) {
      var a = _g767[0];
      var b = _g767[1];
      var c = sub(_g767, 2);
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
    var _g770 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g771) {
      var lh = _g771[0];
      var rh = _g771[1];
      var _g772 = bind(lh, rh);
      var _g773 = 0;
      while (_g773 < length(_g772)) {
        var _g774 = _g772[_g773];
        var id = _g774[0];
        var val = _g774[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g773 = _g773 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g770)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g783 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g784 = join(["do"], macroexpand(_g783));
    drop(environment);
    return(_g784);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g793 = sub(body, 0);
    add(environment, {});
    map(function (_g795) {
      var name = _g795[0];
      var exp = _g795[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g794 = join(["do"], macroexpand(_g793));
    drop(environment);
    return(_g794);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g786 = body;
      var k = undefined;
      for (k in _g786) {
        if (isNaN(parseInt(k))) {
          var v = _g786[k];
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
  }}, "set*": {export: true, macro: function (name, value) {
    return(linked(name, ["set", name, value]));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g778 = elements;
    var _g779 = 0;
    while (_g779 < length(_g778)) {
      var e = _g778[_g779];
      l[e] = true;
      _g779 = _g779 + 1;
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
    var _g785 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g785)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g761 = sub(body, 0);
    return(["if", cond, join(["do"], _g761)]);
  }}, "with-bindings": {export: true, macro: function (_g787) {
    var names = _g787[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g788 = sub(body, 0);
    var x = make_id();
    var _g790 = ["setenv", x];
    _g790.variable = true;
    var _g789 = ["with-frame", ["each", [x], names, _g790]];
    _g789.scope = true;
    return(join(_g789, _g788));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g791 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g792 = ["table"];
    _g792._scope = scope;
    return(["do", ["add", "environment", _g792], ["let", [x, join(["do"], _g791)], ["drop", "environment"], x]]);
  }}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen"], ["lumen", "reader"], ["lumen", "compiler"], ["user"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g805) {
    var char = _g805[0];
    var stream = _g805[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g806 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g806)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, pairwise: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g843;
    if (target === "lua") {
      _g843 = "{";
    } else {
      _g843 = "[";
    }
    var open = _g843;
    var _g844;
    if (target === "lua") {
      _g844 = "}";
    } else {
      _g844 = "]";
    }
    var close = _g844;
    var str = "";
    var _g814 = forms;
    var i = 0;
    while (i < length(_g814)) {
      var x = _g814[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g816 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g817 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g817;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g816 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g816 + ") {\n" + body + ind + "}\n");
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
    var _g818 = compile(cond);
    indent_level = indent_level + 1;
    var _g821 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g819 = _g821;
    var _g849;
    if (alt) {
      indent_level = indent_level + 1;
      var _g822 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g849 = _g822;
    }
    var _g820 = _g849;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g818 + ") {\n" + _g819 + ind + "}";
    } else {
      str = str + ind + "if " + _g818 + " then\n" + _g819;
    }
    if (_g820 && target === "js") {
      str = str + " else {\n" + _g820 + ind + "}";
    } else {
      if (_g820) {
        str = str + ind + "else\n" + _g820;
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
    var _g846;
    if (is63(value)) {
      _g846 = " = " + value1;
    } else {
      _g846 = "";
    }
    var rh = _g846;
    var _g847;
    if (target === "js") {
      _g847 = "var ";
    } else {
      _g847 = "local ";
    }
    var keyword = _g847;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g838;
    if (target === "lua") {
      _g838 = " = ";
    } else {
      _g838 = ": ";
    }
    var sep = _g838;
    var pairs = sortk(pairwise(forms), hd);
    var _g810 = pairs;
    var i = 0;
    while (i < length(_g810)) {
      var _g811 = _g810[i];
      var k = _g811[0];
      var v = _g811[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g812 = compile(v);
      var _g839;
      if (valid_id63(k)) {
        _g839 = k;
      } else {
        var _g840;
        if (target === "js" && string_literal63(k)) {
          _g840 = k;
        } else {
          var _g841;
          if (target === "js") {
            _g841 = quoted(k);
          } else {
            var _g842;
            if (string_literal63(k)) {
              _g842 = "[" + k + "]";
            } else {
              _g842 = "[" + quoted(k) + "]";
            }
            _g841 = _g842;
          }
          _g840 = _g841;
        }
        _g839 = _g840;
      }
      var _g813 = _g839;
      str = str + _g813 + sep + _g812;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g807 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g807;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g808 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g808;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g827 = forms;
    var _g828 = 0;
    while (_g828 < length(_g827)) {
      var x = _g827[_g828];
      str = str + compile(x, {_stash: true, stmt: true});
      _g828 = _g828 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g848;
    if (target === "js") {
      _g848 = "throw new " + compile(["Error", x]);
    } else {
      _g848 = "error(" + compile(x) + ")";
    }
    var e = _g848;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g809 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g809, 0) === "{") {
      _g809 = "(" + _g809 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g809 + "." + inner(k));
    } else {
      return(_g809 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g845;
    if (nil63(x)) {
      _g845 = "return";
    } else {
      _g845 = "return(" + compile(x) + ")";
    }
    var _g815 = _g845;
    return(indentation() + _g815);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g825 = compile(lh);
    var _g850;
    if (nil63(rh)) {
      _g850 = "nil";
    } else {
      _g850 = rh;
    }
    var _g826 = compile(_g850);
    return(indentation() + _g825 + " = " + _g826);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g823 = compile(cond);
    indent_level = indent_level + 1;
    var _g824 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g824;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g823 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g823 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen"], ["lumen", "utilities"], ["lumen", "compiler"], ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, linked: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g829 = sub(body, 0);
    var imports = [];
    var aliased = [];
    var exp = _g829.export;
    var alias = _g829.alias;
    var imp = _g829.import;
    var _g830 = imp || [];
    var _g831 = 0;
    while (_g831 < length(_g830)) {
      var k = _g830[_g831];
      load_module(k);
      var _g832 = module(k).alias || [];
      var _g833 = 0;
      while (_g833 < length(_g832)) {
        var a = _g832[_g833];
        add(imp, a);
        _g833 = _g833 + 1;
      }
      imports = join(imports, imported(k));
      _g831 = _g831 + 1;
    }
    modules[module_key(spec)] = {alias: alias, export: {}, import: imp};
    var _g834 = exp || [];
    var _g835 = 0;
    while (_g835 < length(_g834)) {
      var k = _g834[_g835];
      setenv(k, {_stash: true, export: true});
      _g835 = _g835 + 1;
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
    var _g851 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g853) {
        return([false, _g853.message]);
      }
    })();
    var _g1 = _g851[0];
    var x = _g851[1];
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
    var _g852 = args;
    var i = 0;
    while (i < length(_g852)) {
      var arg = _g852[i];
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
