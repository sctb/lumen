global.nexus = {};
(function () {
  nexus["lumen/runtime"] = {};
  var nil63 = function (x) {
    return(x === undefined || x === null);
  };
  nexus["lumen/runtime"]["nil?"] = nil63;
  var is63 = function (x) {
    return(!nil63(x));
  };
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
  var length = function (x) {
    return(x.length || 0);
  };
  nexus["lumen/runtime"].length = length;
  var none63 = function (x) {
    return(length(x) === 0);
  };
  nexus["lumen/runtime"]["none?"] = none63;
  var some63 = function (x) {
    return(length(x) > 0);
  };
  nexus["lumen/runtime"]["some?"] = some63;
  var one63 = function (x) {
    return(length(x) === 1);
  };
  nexus["lumen/runtime"]["one?"] = one63;
  var hd = function (l) {
    return(l[0]);
  };
  nexus["lumen/runtime"].hd = hd;
  var type = function (x) {
    return(typeof(x));
  };
  nexus["lumen/runtime"].type = type;
  var string63 = function (x) {
    return(type(x) === "string");
  };
  nexus["lumen/runtime"]["string?"] = string63;
  var number63 = function (x) {
    return(type(x) === "number");
  };
  nexus["lumen/runtime"]["number?"] = number63;
  var boolean63 = function (x) {
    return(type(x) === "boolean");
  };
  nexus["lumen/runtime"]["boolean?"] = boolean63;
  var function63 = function (x) {
    return(type(x) === "function");
  };
  nexus["lumen/runtime"]["function?"] = function63;
  var composite63 = function (x) {
    return(is63(x) && type(x) === "object");
  };
  nexus["lumen/runtime"]["composite?"] = composite63;
  var atom63 = function (x) {
    return(nil63(x) || !composite63(x));
  };
  nexus["lumen/runtime"]["atom?"] = atom63;
  var table63 = function (x) {
    return(composite63(x) && nil63(hd(x)));
  };
  nexus["lumen/runtime"]["table?"] = table63;
  var list63 = function (x) {
    return(composite63(x) && is63(hd(x)));
  };
  nexus["lumen/runtime"]["list?"] = list63;
  var substring = function (str, from, upto) {
    return(str.substring(from, upto));
  };
  nexus["lumen/runtime"].substring = substring;
  var max42 = function (x, n) {
    if (nil63(x)) {
      return(n);
    } else {
      return(max(x, n));
    }
  };
  nexus["lumen/runtime"]["max*"] = max42;
  var min42 = function (x, n) {
    if (nil63(x)) {
      return(n);
    } else {
      return(min(x, n));
    }
  };
  nexus["lumen/runtime"]["min*"] = min42;
  var subl = function (l, from, upto) {
    var i = max42(from, 0);
    var _g23 = min42(upto, length(l));
    var j = 0;
    var l2 = [];
    while (i < _g23) {
      l2[j] = l[i];
      i = i + 1;
      j = j + 1;
    }
    return(l2);
  };
  nexus["lumen/runtime"].subl = subl;
  var sub = function (x, from, upto) {
    if (string63(x)) {
      return(substring(x, from || 0, upto));
    } else {
      var l = subl(x, from, upto);
      var _g24 = x;
      var k = undefined;
      for (k in _g24) {
        if (isNaN(parseInt(k))) {
          var v = _g24[k];
          l[k] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
  var inner = function (x) {
    return(sub(x, 1, length(x) - 1));
  };
  nexus["lumen/runtime"].inner = inner;
  var tl = function (l) {
    return(sub(l, 1));
  };
  nexus["lumen/runtime"].tl = tl;
  var char = function (str, n) {
    return(str.charAt(n));
  };
  nexus["lumen/runtime"].char = char;
  var code = function (str, n) {
    return(str.charCodeAt(n));
  };
  nexus["lumen/runtime"].code = code;
  var string_literal63 = function (x) {
    return(string63(x) && char(x, 0) === "\"");
  };
  nexus["lumen/runtime"]["string-literal?"] = string_literal63;
  var id_literal63 = function (x) {
    return(string63(x) && char(x, 0) === "|");
  };
  nexus["lumen/runtime"]["id-literal?"] = id_literal63;
  var add = function (l, x) {
    l.push(x);
    return(undefined);
  };
  nexus["lumen/runtime"].add = add;
  var drop = function (l) {
    return(l.pop());
  };
  nexus["lumen/runtime"].drop = drop;
  var last = function (l) {
    return(l[length(l) - 1]);
  };
  nexus["lumen/runtime"].last = last;
  var reverse = function (l) {
    var l1 = sub(l, length(l));
    var i = length(l) - 1;
    while (i >= 0) {
      add(l1, l[i]);
      i = i - 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].reverse = reverse;
  var join = function (l1, l2) {
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
          var _g25 = l1;
          var k = undefined;
          for (k in _g25) {
            if (isNaN(parseInt(k))) {
              var v = _g25[k];
              l[k] = v;
            }
          }
          var _g26 = l2;
          var k = undefined;
          for (k in _g26) {
            if (isNaN(parseInt(k))) {
              var v = _g26[k];
              l[k] = v;
            }
          }
          return(l);
        }
      }
    }
  };
  nexus["lumen/runtime"].join = join;
  var reduce = function (f, x) {
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
  nexus["lumen/runtime"].reduce = reduce;
  var keep = function (f, l) {
    var l1 = [];
    var _g27 = l;
    var _g28 = 0;
    while (_g28 < length(_g27)) {
      var x = _g27[_g28];
      if (f(x)) {
        add(l1, x);
      }
      _g28 = _g28 + 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, l) {
    var _g29 = l;
    var _g30 = 0;
    while (_g30 < length(_g29)) {
      var y = _g29[_g30];
      if (x === y) {
        return(true);
      }
      _g30 = _g30 + 1;
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, l) {
    var _g31 = l;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var x = _g31[_g32];
      var _g33 = f(x);
      if (_g33) {
        return(_g33);
      }
      _g32 = _g32 + 1;
    }
  };
  nexus["lumen/runtime"].find = find;
  var pair = function (l) {
    var i = 0;
    var l1 = [];
    while (i < length(l)) {
      add(l1, [l[i], l[i + 1]]);
      i = i + 2;
    }
    return(l1);
  };
  nexus["lumen/runtime"].pair = pair;
  var sort = function (l, f) {
    var _g55;
    if (f) {
      _g55 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g55));
  };
  nexus["lumen/runtime"].sort = sort;
  var iterate = function (f, count) {
    var i = 0;
    while (i < count) {
      f(i);
      i = i + 1;
    }
  };
  nexus["lumen/runtime"].iterate = iterate;
  var replicate = function (n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  };
  nexus["lumen/runtime"].replicate = replicate;
  var splice = function (x) {
    return({_splice: true, value: x});
  };
  nexus["lumen/runtime"].splice = splice;
  var splice63 = function (x) {
    return(table63(x) && x._splice);
  };
  nexus["lumen/runtime"]["splice?"] = splice63;
  var mapl = function (f, l) {
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
  };
  nexus["lumen/runtime"].mapl = mapl;
  var map = function (f, t) {
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
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
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
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    return(none63(t) && !keys63(t));
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
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
  };
  nexus["lumen/runtime"].stash = stash;
  var unstash = function (args) {
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
  };
  nexus["lumen/runtime"].unstash = unstash;
  var extend = function (t) {
    var xs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g41 = sub(xs, 0);
    return(join(t, _g41));
  };
  nexus["lumen/runtime"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g42 = sub(keys, 0);
    var t1 = subl(t);
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
  };
  nexus["lumen/runtime"].exclude = exclude;
  var search = function (str, pattern, start) {
    var i = str.indexOf(pattern, start);
    if (i >= 0) {
      return(i);
    }
  };
  nexus["lumen/runtime"].search = search;
  var split = function (str, sep) {
    return(str.split(sep));
  };
  nexus["lumen/runtime"].split = split;
  var cat = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g44 = sub(xs, 0);
    if (none63(_g44)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g44));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g45));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g46)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g47));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g48 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g48)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g49)));
  };
  nexus["lumen/runtime"]["%"] = _37;
  var _62 = function (a, b) {
    return(a > b);
  };
  nexus["lumen/runtime"][">"] = _62;
  var _60 = function (a, b) {
    return(a < b);
  };
  nexus["lumen/runtime"]["<"] = _60;
  var _61 = function (a, b) {
    return(a === b);
  };
  nexus["lumen/runtime"]["="] = _61;
  var _6261 = function (a, b) {
    return(a >= b);
  };
  nexus["lumen/runtime"][">="] = _6261;
  var _6061 = function (a, b) {
    return(a <= b);
  };
  nexus["lumen/runtime"]["<="] = _6061;
  global.require = require;
  var fs = require("fs");
  nexus["lumen/runtime"].fs = fs;
  var read_file = function (path) {
    return(fs.readFileSync(path, "utf8"));
  };
  nexus["lumen/runtime"]["read-file"] = read_file;
  var write_file = function (path, data) {
    return(fs.writeFileSync(path, data, "utf8"));
  };
  nexus["lumen/runtime"]["write-file"] = write_file;
  print = function (x) {
    return(console.log(x));
  };
  var type = function (x) {
    return(typeof(x));
  };
  nexus["lumen/runtime"].type = type;
  var write = function (x) {
    return(process.stdout.write(x));
  };
  nexus["lumen/runtime"].write = write;
  var exit = function (code) {
    return(process.exit(code));
  };
  nexus["lumen/runtime"].exit = exit;
  var today = function () {
    var pad = function (n) {
      if (n < 10) {
        return("0" + n);
      } else {
        return(string(n));
      }
    };
    var now = new Date();
    return(pad(now.getUTCFullYear()) + "-" + pad(now.getUTCMonth() + 1) + "-" + pad(now.getUTCDate()));
  };
  nexus["lumen/runtime"].today = today;
  var now = function () {
    return(floor(new Date().getTime() / 1000));
  };
  nexus["lumen/runtime"].now = now;
  var number = function (str) {
    var n = parseFloat(str);
    if (!isNaN(n)) {
      return(n);
    }
  };
  nexus["lumen/runtime"].number = number;
  var string = function (x) {
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
  };
  nexus["lumen/runtime"].string = string;
  var space = function (xs) {
    var string = function (x) {
      if (string_literal63(x) || list63(x) && hd(x) === "cat") {
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
  nexus["lumen/runtime"].space = space;
  var apply = function (f, args) {
    var _g52 = stash(args);
    return(f.apply(f, _g52));
  };
  nexus["lumen/runtime"].apply = apply;
  var id_count = 0;
  nexus["lumen/runtime"]["id-count"] = id_count;
  var make_id = function () {
    id_count = id_count + 1;
    return("_g" + id_count);
  };
  nexus["lumen/runtime"]["make-id"] = make_id;
  var _37message_handler = function (msg) {
    var i = search(msg, ": ");
    return(sub(msg, i + 2));
  };
  nexus["lumen/runtime"]["%message-handler"] = _37message_handler;
  var toplevel63 = function () {
    return(one63(environment));
  };
  nexus["lumen/runtime"]["toplevel?"] = toplevel63;
  var module_key = function (spec) {
    if (atom63(spec)) {
      return(string(spec));
    } else {
      return(reduce(function (a, b) {
        return(module_key(a) + "/" + module_key(b));
      }, spec));
    }
  };
  nexus["lumen/runtime"]["module-key"] = module_key;
  var module = function (spec) {
    return(modules[module_key(spec)]);
  };
  nexus["lumen/runtime"].module = module;
  var setenv = function (k) {
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
  };
  nexus["lumen/runtime"].setenv = setenv;
})();
(function () {
  nexus["lumen/lib"] = {};
  var _g60 = nexus["lumen/runtime"];
  var nil63 = _g60["nil?"];
  var is63 = _g60["is?"];
  var max = _g60.max;
  var min = _g60.min;
  var abs = _g60.abs;
  var acos = _g60.acos;
  var asin = _g60.asin;
  var atan = _g60.atan;
  var atan2 = _g60.atan2;
  var ceil = _g60.ceil;
  var cos = _g60.cos;
  var floor = _g60.floor;
  var log = _g60.log;
  var log10 = _g60.log10;
  var pow = _g60.pow;
  var random = _g60.random;
  var sin = _g60.sin;
  var sinh = _g60.sinh;
  var sqrt = _g60.sqrt;
  var tan = _g60.tan;
  var tanh = _g60.tanh;
  var length = _g60.length;
  var none63 = _g60["none?"];
  var some63 = _g60["some?"];
  var one63 = _g60["one?"];
  var hd = _g60.hd;
  var string63 = _g60["string?"];
  var number63 = _g60["number?"];
  var boolean63 = _g60["boolean?"];
  var function63 = _g60["function?"];
  var composite63 = _g60["composite?"];
  var atom63 = _g60["atom?"];
  var table63 = _g60["table?"];
  var list63 = _g60["list?"];
  var substring = _g60.substring;
  var sub = _g60.sub;
  var inner = _g60.inner;
  var tl = _g60.tl;
  var char = _g60.char;
  var code = _g60.code;
  var string_literal63 = _g60["string-literal?"];
  var id_literal63 = _g60["id-literal?"];
  var add = _g60.add;
  var drop = _g60.drop;
  var last = _g60.last;
  var reverse = _g60.reverse;
  var join = _g60.join;
  var reduce = _g60.reduce;
  var keep = _g60.keep;
  var in63 = _g60["in?"];
  var find = _g60.find;
  var pair = _g60.pair;
  var sort = _g60.sort;
  var iterate = _g60.iterate;
  var replicate = _g60.replicate;
  var splice = _g60.splice;
  var map = _g60.map;
  var keys63 = _g60["keys?"];
  var empty63 = _g60["empty?"];
  var stash = _g60.stash;
  var unstash = _g60.unstash;
  var extend = _g60.extend;
  var exclude = _g60.exclude;
  var search = _g60.search;
  var split = _g60.split;
  var cat = _g60.cat;
  var _43 = _g60["+"];
  var _ = _g60["-"];
  var _42 = _g60["*"];
  var _47 = _g60["/"];
  var _37 = _g60["%"];
  var _62 = _g60[">"];
  var _60 = _g60["<"];
  var _61 = _g60["="];
  var _6261 = _g60[">="];
  var _6061 = _g60["<="];
  var read_file = _g60["read-file"];
  var write_file = _g60["write-file"];
  var write = _g60.write;
  var exit = _g60.exit;
  var today = _g60.today;
  var now = _g60.now;
  var number = _g60.number;
  var string = _g60.string;
  var space = _g60.space;
  var apply = _g60.apply;
  var make_id = _g60["make-id"];
  var _37message_handler = _g60["%message-handler"];
  var toplevel63 = _g60["toplevel?"];
  var module_key = _g60["module-key"];
  var module = _g60.module;
  var setenv = _g60.setenv;
  var getenv = function (k) {
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
  };
  nexus["lumen/lib"].getenv = getenv;
  var macro_function = function (k) {
    return(getenv(k, {_stash: true, macro: true}));
  };
  nexus["lumen/lib"]["macro-function"] = macro_function;
  var macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  nexus["lumen/lib"]["macro?"] = macro63;
  var special63 = function (k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  };
  nexus["lumen/lib"]["special?"] = special63;
  var special_form63 = function (form) {
    return(list63(form) && special63(hd(form)));
  };
  nexus["lumen/lib"]["special-form?"] = special_form63;
  var statement63 = function (k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  };
  nexus["lumen/lib"]["statement?"] = statement63;
  var symbol_expansion = function (k) {
    return(getenv(k, {_stash: true, symbol: true}));
  };
  nexus["lumen/lib"]["symbol-expansion"] = symbol_expansion;
  var symbol63 = function (k) {
    return(is63(symbol_expansion(k)));
  };
  nexus["lumen/lib"]["symbol?"] = symbol63;
  var variable63 = function (k) {
    var b = find(function (frame) {
      return(frame[k] || frame._scope);
    }, reverse(environment));
    return(table63(b) && is63(b.variable));
  };
  nexus["lumen/lib"]["variable?"] = variable63;
  var global63 = function (k) {
    return(getenv(k, {_stash: true, global: true}));
  };
  nexus["lumen/lib"]["global?"] = global63;
  var bound63 = function (x) {
    return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
  };
  nexus["lumen/lib"]["bound?"] = bound63;
  var escape = function (str) {
    var str1 = "\"";
    var i = 0;
    while (i < length(str)) {
      var c = char(str, i);
      var _g95;
      if (c === "\n") {
        _g95 = "\\n";
      } else {
        var _g96;
        if (c === "\"") {
          _g96 = "\\\"";
        } else {
          var _g97;
          if (c === "\\") {
            _g97 = "\\\\";
          } else {
            _g97 = c;
          }
          _g96 = _g97;
        }
        _g95 = _g96;
      }
      var c1 = _g95;
      str1 = str1 + c1;
      i = i + 1;
    }
    return(str1 + "\"");
  };
  nexus["lumen/lib"].escape = escape;
  var quoted = function (form) {
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
  nexus["lumen/lib"].quoted = quoted;
  var literal = function (s) {
    if (string_literal63(s)) {
      return(s);
    } else {
      return(quoted(s));
    }
  };
  nexus["lumen/lib"].literal = literal;
  var stash42 = function (args) {
    if (keys63(args)) {
      var l = ["%object", "\"_stash\"", true];
      var _g66 = args;
      var k = undefined;
      for (k in _g66) {
        if (isNaN(parseInt(k))) {
          var v = _g66[k];
          add(l, literal(k));
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  };
  nexus["lumen/lib"]["stash*"] = stash42;
  var bind = function (lh, rh) {
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
  };
  nexus["lumen/lib"].bind = bind;
  var bind42 = function (args, body) {
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
  };
  nexus["lumen/lib"]["bind*"] = bind42;
  var quoting63 = function (depth) {
    return(number63(depth));
  };
  nexus["lumen/lib"]["quoting?"] = quoting63;
  var quasiquoting63 = function (depth) {
    return(quoting63(depth) && depth > 0);
  };
  nexus["lumen/lib"]["quasiquoting?"] = quasiquoting63;
  var can_unquote63 = function (depth) {
    return(quoting63(depth) && depth === 1);
  };
  nexus["lumen/lib"]["can-unquote?"] = can_unquote63;
  var quasisplice63 = function (x, depth) {
    return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
  };
  nexus["lumen/lib"]["quasisplice?"] = quasisplice63;
  var macroexpand = function (form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if (x === "%local") {
          var _g57 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g58 = form[0];
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
              var _g59 = form[0];
              var _g75 = form[1];
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
              var _g79 = join([x, _g75, map(macroexpand, _g76)], macroexpand(_g77));
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
  };
  nexus["lumen/lib"].macroexpand = macroexpand;
  var quasiexpand;
  nexus["lumen/lib"].quasiexpand = quasiexpand;
  var quasiquote_list;
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g82 = form;
    var k = undefined;
    for (k in _g82) {
      if (isNaN(parseInt(k))) {
        var v = _g82[k];
        var _g98;
        if (quasisplice63(v, depth)) {
          _g98 = quasiexpand(v[1]);
        } else {
          _g98 = quasiexpand(v, depth);
        }
        var _g83 = _g98;
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
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list;
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
  nexus["lumen/lib"].quasiexpand = quasiexpand;
  global.indent_level = 0;
  var indentation = function () {
    return(apply(cat, replicate(indent_level, "  ")));
  };
  nexus["lumen/lib"].indentation = indentation;
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
  nexus["lumen/lib"].reserved = reserved;
  var reserved63 = function (x) {
    return(reserved[x]);
  };
  nexus["lumen/lib"]["reserved?"] = reserved63;
  var numeric63 = function (n) {
    return(n > 47 && n < 58);
  };
  nexus["lumen/lib"]["numeric?"] = numeric63;
  var valid_code63 = function (n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
  };
  nexus["lumen/lib"]["valid-code?"] = valid_code63;
  var valid_id63 = function (id) {
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
  };
  nexus["lumen/lib"]["valid-id?"] = valid_id63;
  var id = function (id) {
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
        if (valid_code63(n)) {
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
  };
  nexus["lumen/lib"].id = id;
  var key = function (k) {
    var wrap = function (s) {
      if (target === "lua") {
        return("[" + s + "]");
      } else {
        return(s);
      }
    };
    var i = inner(k);
    if (valid_id63(i)) {
      return(i);
    } else {
      return(wrap(k));
    }
  };
  nexus["lumen/lib"].key = key;
  var imported = function (spec) {
    var _g91 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g91.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g92 = module(spec).export;
      var n = undefined;
      for (n in _g92) {
        if (isNaN(parseInt(n))) {
          var b = _g92[n];
          if (b.variable && (all || b.export)) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], imports));
    }
  };
  nexus["lumen/lib"].imported = imported;
  var linked = function (name, form) {
    if (toplevel63()) {
      var k = module_key(current_module);
      return(["do", form, ["set", ["get", ["get", "nexus", ["quote", k]], ["quote", name]], name]]);
    } else {
      return(form);
    }
  };
  nexus["lumen/lib"].linked = linked;
  var quote_binding = function (b) {
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
  };
  nexus["lumen/lib"]["quote-binding"] = quote_binding;
  var mapo = function (f, t) {
    var o = [];
    var _g93 = t;
    var k = undefined;
    for (k in _g93) {
      if (isNaN(parseInt(k))) {
        var v = _g93[k];
        var x = f(v);
        if (is63(x)) {
          add(o, literal(k));
          add(o, x);
        }
      }
    }
    return(o);
  };
  nexus["lumen/lib"].mapo = mapo;
  var quote_frame = function (t) {
    return(join(["%object"], mapo(function (b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  };
  nexus["lumen/lib"]["quote-frame"] = quote_frame;
  var quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  nexus["lumen/lib"]["quote-environment"] = quote_environment;
  var quote_module = function (m) {
    var _g94 = ["table"];
    _g94.import = quoted(m.import);
    _g94.alias = quoted(m.alias);
    _g94.export = quote_frame(m.export);
    return(_g94);
  };
  nexus["lumen/lib"]["quote-module"] = quote_module;
  var quote_modules = function () {
    return(join(["table"], map(quote_module, modules)));
  };
  nexus["lumen/lib"]["quote-modules"] = quote_modules;
  var initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  nexus["lumen/lib"]["initial-environment"] = initial_environment;
})();
(function () {
  nexus["lumen/reader"] = {};
  var _g102 = nexus["lumen/runtime"];
  var nil63 = _g102["nil?"];
  var is63 = _g102["is?"];
  var max = _g102.max;
  var min = _g102.min;
  var abs = _g102.abs;
  var acos = _g102.acos;
  var asin = _g102.asin;
  var atan = _g102.atan;
  var atan2 = _g102.atan2;
  var ceil = _g102.ceil;
  var cos = _g102.cos;
  var floor = _g102.floor;
  var log = _g102.log;
  var log10 = _g102.log10;
  var pow = _g102.pow;
  var random = _g102.random;
  var sin = _g102.sin;
  var sinh = _g102.sinh;
  var sqrt = _g102.sqrt;
  var tan = _g102.tan;
  var tanh = _g102.tanh;
  var length = _g102.length;
  var none63 = _g102["none?"];
  var some63 = _g102["some?"];
  var one63 = _g102["one?"];
  var hd = _g102.hd;
  var string63 = _g102["string?"];
  var number63 = _g102["number?"];
  var boolean63 = _g102["boolean?"];
  var function63 = _g102["function?"];
  var composite63 = _g102["composite?"];
  var atom63 = _g102["atom?"];
  var table63 = _g102["table?"];
  var list63 = _g102["list?"];
  var substring = _g102.substring;
  var sub = _g102.sub;
  var inner = _g102.inner;
  var tl = _g102.tl;
  var char = _g102.char;
  var code = _g102.code;
  var string_literal63 = _g102["string-literal?"];
  var id_literal63 = _g102["id-literal?"];
  var add = _g102.add;
  var drop = _g102.drop;
  var last = _g102.last;
  var reverse = _g102.reverse;
  var join = _g102.join;
  var reduce = _g102.reduce;
  var keep = _g102.keep;
  var in63 = _g102["in?"];
  var find = _g102.find;
  var pair = _g102.pair;
  var sort = _g102.sort;
  var iterate = _g102.iterate;
  var replicate = _g102.replicate;
  var splice = _g102.splice;
  var map = _g102.map;
  var keys63 = _g102["keys?"];
  var empty63 = _g102["empty?"];
  var stash = _g102.stash;
  var unstash = _g102.unstash;
  var extend = _g102.extend;
  var exclude = _g102.exclude;
  var search = _g102.search;
  var split = _g102.split;
  var cat = _g102.cat;
  var _43 = _g102["+"];
  var _ = _g102["-"];
  var _42 = _g102["*"];
  var _47 = _g102["/"];
  var _37 = _g102["%"];
  var _62 = _g102[">"];
  var _60 = _g102["<"];
  var _61 = _g102["="];
  var _6261 = _g102[">="];
  var _6061 = _g102["<="];
  var read_file = _g102["read-file"];
  var write_file = _g102["write-file"];
  var write = _g102.write;
  var exit = _g102.exit;
  var today = _g102.today;
  var now = _g102.now;
  var number = _g102.number;
  var string = _g102.string;
  var space = _g102.space;
  var apply = _g102.apply;
  var make_id = _g102["make-id"];
  var _37message_handler = _g102["%message-handler"];
  var toplevel63 = _g102["toplevel?"];
  var module_key = _g102["module-key"];
  var module = _g102.module;
  var setenv = _g102.setenv;
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {" ": true, "\t": true, "\n": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({pos: 0, string: str, len: length(str)});
  };
  nexus["lumen/reader"]["make-stream"] = make_stream;
  var peek_char = function (s) {
    if (s.pos < s.len) {
      return(char(s.string, s.pos));
    }
  };
  nexus["lumen/reader"]["peek-char"] = peek_char;
  var read_char = function (s) {
    var c = peek_char(s);
    if (c) {
      s.pos = s.pos + 1;
      return(c);
    }
  };
  nexus["lumen/reader"]["read-char"] = read_char;
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
  nexus["lumen/reader"]["skip-non-code"] = skip_non_code;
  var read_table = {};
  nexus["lumen/reader"]["read-table"] = read_table;
  var eof = {};
  nexus["lumen/reader"].eof = eof;
  var read = function (s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return((read_table[c] || read_table[""])(s));
    } else {
      return(eof);
    }
  };
  nexus["lumen/reader"].read = read;
  var read_all = function (s) {
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
  nexus["lumen/reader"]["read-all"] = read_all;
  var read_from_string = function (str) {
    var x = read(make_stream(str));
    if (x != eof) {
      return(x);
    }
  };
  nexus["lumen/reader"]["read-from-string"] = read_from_string;
  var key63 = function (atom) {
    return(string63(atom) && length(atom) > 1 && char(atom, length(atom) - 1) === ":");
  };
  nexus["lumen/reader"]["key?"] = key63;
  var flag63 = function (atom) {
    return(string63(atom) && length(atom) > 1 && char(atom, 0) === ":");
  };
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
  var _g113 = nexus["lumen/runtime"];
  var nil63 = _g113["nil?"];
  var is63 = _g113["is?"];
  var max = _g113.max;
  var min = _g113.min;
  var abs = _g113.abs;
  var acos = _g113.acos;
  var asin = _g113.asin;
  var atan = _g113.atan;
  var atan2 = _g113.atan2;
  var ceil = _g113.ceil;
  var cos = _g113.cos;
  var floor = _g113.floor;
  var log = _g113.log;
  var log10 = _g113.log10;
  var pow = _g113.pow;
  var random = _g113.random;
  var sin = _g113.sin;
  var sinh = _g113.sinh;
  var sqrt = _g113.sqrt;
  var tan = _g113.tan;
  var tanh = _g113.tanh;
  var length = _g113.length;
  var none63 = _g113["none?"];
  var some63 = _g113["some?"];
  var one63 = _g113["one?"];
  var hd = _g113.hd;
  var string63 = _g113["string?"];
  var number63 = _g113["number?"];
  var boolean63 = _g113["boolean?"];
  var function63 = _g113["function?"];
  var composite63 = _g113["composite?"];
  var atom63 = _g113["atom?"];
  var table63 = _g113["table?"];
  var list63 = _g113["list?"];
  var substring = _g113.substring;
  var sub = _g113.sub;
  var inner = _g113.inner;
  var tl = _g113.tl;
  var char = _g113.char;
  var code = _g113.code;
  var string_literal63 = _g113["string-literal?"];
  var id_literal63 = _g113["id-literal?"];
  var add = _g113.add;
  var drop = _g113.drop;
  var last = _g113.last;
  var reverse = _g113.reverse;
  var join = _g113.join;
  var reduce = _g113.reduce;
  var keep = _g113.keep;
  var in63 = _g113["in?"];
  var find = _g113.find;
  var pair = _g113.pair;
  var sort = _g113.sort;
  var iterate = _g113.iterate;
  var replicate = _g113.replicate;
  var splice = _g113.splice;
  var map = _g113.map;
  var keys63 = _g113["keys?"];
  var empty63 = _g113["empty?"];
  var stash = _g113.stash;
  var unstash = _g113.unstash;
  var extend = _g113.extend;
  var exclude = _g113.exclude;
  var search = _g113.search;
  var split = _g113.split;
  var cat = _g113.cat;
  var _43 = _g113["+"];
  var _ = _g113["-"];
  var _42 = _g113["*"];
  var _47 = _g113["/"];
  var _37 = _g113["%"];
  var _62 = _g113[">"];
  var _60 = _g113["<"];
  var _61 = _g113["="];
  var _6261 = _g113[">="];
  var _6061 = _g113["<="];
  var read_file = _g113["read-file"];
  var write_file = _g113["write-file"];
  var write = _g113.write;
  var exit = _g113.exit;
  var today = _g113.today;
  var now = _g113.now;
  var number = _g113.number;
  var string = _g113.string;
  var space = _g113.space;
  var apply = _g113.apply;
  var make_id = _g113["make-id"];
  var _37message_handler = _g113["%message-handler"];
  var toplevel63 = _g113["toplevel?"];
  var module_key = _g113["module-key"];
  var module = _g113.module;
  var setenv = _g113.setenv;
  var _g116 = nexus["lumen/lib"];
  var getenv = _g116.getenv;
  var macro_function = _g116["macro-function"];
  var macro63 = _g116["macro?"];
  var special63 = _g116["special?"];
  var special_form63 = _g116["special-form?"];
  var statement63 = _g116["statement?"];
  var symbol_expansion = _g116["symbol-expansion"];
  var symbol63 = _g116["symbol?"];
  var variable63 = _g116["variable?"];
  var bound63 = _g116["bound?"];
  var quoted = _g116.quoted;
  var stash42 = _g116["stash*"];
  var bind = _g116.bind;
  var bind42 = _g116["bind*"];
  var quasiexpand = _g116.quasiexpand;
  var macroexpand = _g116.macroexpand;
  var indentation = _g116.indentation;
  var reserved63 = _g116["reserved?"];
  var valid_id63 = _g116["valid-id?"];
  var id = _g116.id;
  var key = _g116.key;
  var imported = _g116.imported;
  var linked = _g116.linked;
  var mapo = _g116.mapo;
  var quote_environment = _g116["quote-environment"];
  var quote_modules = _g116["quote-modules"];
  var initial_environment = _g116["initial-environment"];
  var _g117 = nexus["lumen/reader"];
  var make_stream = _g117["make-stream"];
  var read_table = _g117["read-table"];
  var read = _g117.read;
  var read_all = _g117["read-all"];
  var read_from_string = _g117["read-from-string"];
  var _g121 = [];
  _g121.js = "!";
  _g121.lua = "not ";
  var _g119 = [];
  var _g122 = [];
  _g122.js = "!";
  _g122.lua = "not ";
  _g119["not"] = _g122;
  var _g124 = [];
  _g124["*"] = true;
  _g124["/"] = true;
  _g124["%"] = true;
  var _g126 = [];
  _g126["+"] = true;
  _g126["-"] = true;
  var _g130 = [];
  _g130.js = "+";
  _g130.lua = "..";
  var _g128 = [];
  var _g131 = [];
  _g131.js = "+";
  _g131.lua = "..";
  _g128.cat = _g131;
  var _g133 = [];
  _g133["<"] = true;
  _g133[">"] = true;
  _g133["<="] = true;
  _g133[">="] = true;
  var _g137 = [];
  _g137.js = "===";
  _g137.lua = "==";
  var _g139 = [];
  _g139.js = "!=";
  _g139.lua = "~=";
  var _g135 = [];
  var _g140 = [];
  _g140.js = "===";
  _g140.lua = "==";
  _g135["="] = _g140;
  var _g141 = [];
  _g141.js = "!=";
  _g141.lua = "~=";
  _g135["~="] = _g141;
  var _g145 = [];
  _g145.js = "&&";
  _g145.lua = "and";
  var _g143 = [];
  var _g146 = [];
  _g146.js = "&&";
  _g146.lua = "and";
  _g143["and"] = _g146;
  var _g150 = [];
  _g150.js = "||";
  _g150.lua = "or";
  var _g148 = [];
  var _g151 = [];
  _g151.js = "||";
  _g151.lua = "or";
  _g148["or"] = _g151;
  var infix = [_g119, _g124, _g126, _g128, _g133, _g135, _g143, _g148];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g152 = infix;
      var i = 0;
      while (i < length(_g152)) {
        var level = _g152[i];
        if (level[hd(form)]) {
          return(i);
        }
        i = i + 1;
      }
    }
    return(0);
  };
  nexus["lumen/compiler"].precedence = precedence;
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
  nexus["lumen/compiler"].getop = getop;
  var infix63 = function (x) {
    return(is63(getop(x)));
  };
  nexus["lumen/compiler"]["infix?"] = infix63;
  var compile;
  nexus["lumen/compiler"].compile = compile;
  var compile_args = function (args) {
    var str = "(";
    var _g153 = args;
    var i = 0;
    while (i < length(_g153)) {
      var arg = _g153[i];
      str = str + compile(arg);
      if (i < length(args) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + ")");
  };
  nexus["lumen/compiler"]["compile-args"] = compile_args;
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
  };
  nexus["lumen/compiler"]["compile-atom"] = compile_atom;
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
  nexus["lumen/compiler"].terminator = terminator;
  var compile_special = function (form, stmt63) {
    var x = form[0];
    var args = sub(form, 1);
    var _g154 = getenv(x);
    var special = _g154.special;
    var stmt = _g154.stmt;
    var self_tr63 = _g154.tr;
    var tr = terminator(stmt63 && !self_tr63);
    return(apply(special, args) + tr);
  };
  nexus["lumen/compiler"]["compile-special"] = compile_special;
  var parenthesize_call63 = function (x) {
    return(list63(x) && (hd(x) === "%function" || precedence(x) > 0));
  };
  nexus["lumen/compiler"]["parenthesize-call?"] = parenthesize_call63;
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
  nexus["lumen/compiler"]["compile-call"] = compile_call;
  var op_delims = function (parent, child) {
    var _g155 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g155.right;
    var _g182;
    if (right) {
      _g182 = _6261;
    } else {
      _g182 = _62;
    }
    if (_g182(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
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
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g162 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g162.name;
    var prefix = _g162.prefix;
    var _g183;
    if (name) {
      _g183 = compile(name);
    } else {
      _g183 = "";
    }
    var id = _g183;
    var _g163 = prefix || "";
    var _g164 = compile_args(args);
    indent_level = indent_level + 1;
    var _g166 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g165 = _g166;
    var ind = indentation();
    var _g184;
    if (target === "js") {
      _g184 = "";
    } else {
      _g184 = "end";
    }
    var tr = _g184;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g164 + " {\n" + _g165 + ind + "}" + tr);
    } else {
      return(_g163 + "function " + id + _g164 + "\n" + _g165 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g167 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g167.stmt;
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
        var _g168 = _g186;
        return(ind + _g168 + tr);
      }
    }
  };
  nexus["lumen/compiler"].compile = compile;
  var lower;
  nexus["lumen/compiler"].lower = lower;
  var lower_statement = function (form, tail63) {
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
  };
  nexus["lumen/compiler"]["lower-statement"] = lower_statement;
  var lower_body = function (body, tail63) {
    return(lower_statement(join(["do"], body), tail63));
  };
  nexus["lumen/compiler"]["lower-body"] = lower_body;
  var lower_do = function (args, hoist, stmt63, tail63) {
    var _g169 = sub(args, 0, length(args) - 1);
    var _g170 = 0;
    while (_g170 < length(_g169)) {
      var x = _g169[_g170];
      add(hoist, lower(x, hoist, stmt63));
      _g170 = _g170 + 1;
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && can_return63(e)) {
      return(["return", e]);
    } else {
      return(e);
    }
  };
  nexus["lumen/compiler"]["lower-do"] = lower_do;
  var lower_if = function (args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g171 = args[1];
    var _g172 = args[2];
    if (stmt63 || tail63) {
      var _g189;
      if (_g172) {
        _g189 = [lower_body([_g172], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g171], tail63)], _g189)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g188;
      if (_g172) {
        _g188 = [lower(["set", e, _g172])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g171])], _g188));
      return(e);
    }
  };
  nexus["lumen/compiler"]["lower-if"] = lower_if;
  var lower_short = function (x, args, hoist) {
    var a = args[0];
    var b = args[1];
    var hoist1 = [];
    var b1 = lower(b, hoist1);
    if (some63(hoist1)) {
      var id = make_id();
      var _g190;
      if (x === "and") {
        _g190 = ["%if", id, b, id];
      } else {
        _g190 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g190], hoist));
    } else {
      return([x, lower(a, hoist), b1]);
    }
  };
  nexus["lumen/compiler"]["lower-short"] = lower_short;
  var lower_try = function (args, hoist, tail63) {
    return(add(hoist, ["%try", lower_body(args, tail63)]));
  };
  nexus["lumen/compiler"]["lower-try"] = lower_try;
  var lower_while = function (args, hoist) {
    var c = args[0];
    var body = sub(args, 1);
    return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
  };
  nexus["lumen/compiler"]["lower-while"] = lower_while;
  var lower_for = function (args, hoist) {
    var t = args[0];
    var k = args[1];
    var body = sub(args, 2);
    return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
  };
  nexus["lumen/compiler"]["lower-for"] = lower_for;
  var lower_function = function (args) {
    var a = args[0];
    var body = sub(args, 1);
    return(["%function", a, lower_body(body, true)]);
  };
  nexus["lumen/compiler"]["lower-function"] = lower_function;
  var lower_definition = function (kind, args, hoist) {
    var name = args[0];
    var _g173 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g173, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g174 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g174)) {
      return(_g174);
    }
  };
  nexus["lumen/compiler"]["lower-call"] = lower_call;
  var lower_infix63 = function (form) {
    return(infix63(hd(form)) && length(form) > 3);
  };
  nexus["lumen/compiler"]["lower-infix?"] = lower_infix63;
  var lower_infix = function (form, hoist) {
    var x = form[0];
    var args = sub(form, 1);
    return(lower(reduce(function (a, b) {
      return([x, b, a]);
    }, reverse(args)), hoist));
  };
  nexus["lumen/compiler"]["lower-infix"] = lower_infix;
  var lower_special = function (form, hoist) {
    var e = lower_call(form, hoist);
    if (e) {
      return(add(hoist, e));
    }
  };
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
  var process = function (form) {
    return(lower(macroexpand(form)));
  };
  nexus["lumen/compiler"].process = process;
  global.current_module = undefined;
  var module_path = function (spec) {
    return(module_key(spec) + ".l");
  };
  nexus["lumen/compiler"]["module-path"] = module_path;
  var encapsulate = function (body) {
    return([["%function", [], process(join(["do"], body))]]);
  };
  nexus["lumen/compiler"].encapsulate = encapsulate;
  var compile_file = function (file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return(compile(form) + ";\n");
  };
  nexus["lumen/compiler"]["compile-file"] = compile_file;
  var run = function (code) {
    return(global.eval(code));
  };
  nexus["lumen/compiler"].run = run;
  var compiling63 = false;
  nexus["lumen/compiler"]["compiling?"] = compiling63;
  var compiler_output = "";
  nexus["lumen/compiler"]["compiler-output"] = compiler_output;
  var conclude = function (code) {
    if (compiling63) {
      compiler_output = compiler_output + code;
    } else {
      return(run(code));
    }
  };
  nexus["lumen/compiler"].conclude = conclude;
  var _37compile_module = function (spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    current_module = spec;
    environment = initial_environment();
    var code = compile_file(path);
    current_module = mod0;
    environment = env0;
    return(conclude(code));
  };
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  var open_module = function (spec) {
    var _g175 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g175.all;
    var m = module(spec);
    var frame = last(environment);
    var _g176 = m.export;
    var k = undefined;
    for (k in _g176) {
      if (isNaN(parseInt(k))) {
        var v = _g176[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g177 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g177.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  var in_module = function (spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    var _g178 = specs || [];
    var _g179 = 0;
    while (_g179 < length(_g178)) {
      var spec = _g178[_g179];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g180 = import_modules(m.alias);
        var aliased = _g180[0];
        var bs = _g180[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g181 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g181);
      }
      _g179 = _g179 + 1;
    }
    return([imports, bindings]);
  };
  nexus["lumen/compiler"]["import-modules"] = import_modules;
  var compile_module = function (spec) {
    compiling63 = true;
    _37compile_module(spec);
    return(compiler_output);
  };
  nexus["lumen/compiler"]["compile-module"] = compile_module;
  var declare = function (form) {
    return(conclude(compile(process(form), {_stash: true, stmt: true})));
  };
  nexus["lumen/compiler"].declare = declare;
  var reimported = function () {
    var m = module(current_module);
    return(join(reduce(join, map(imported, m.import)), imported(current_module, {_stash: true, all: true})));
  };
  nexus["lumen/compiler"].reimported = reimported;
  global._37result = undefined;
  var eval = function (form) {
    var previous = target;
    target = "js";
    var body = join(reimported(), [["set", "%result", form]]);
    var code = compile(encapsulate(body));
    target = previous;
    run(code);
    return(_37result);
  };
  nexus["lumen/compiler"].eval = eval;
})();
(function () {
  nexus["lumen/special"] = {};
  var _g191 = nexus["lumen/runtime"];
  var nil63 = _g191["nil?"];
  var is63 = _g191["is?"];
  var max = _g191.max;
  var min = _g191.min;
  var abs = _g191.abs;
  var acos = _g191.acos;
  var asin = _g191.asin;
  var atan = _g191.atan;
  var atan2 = _g191.atan2;
  var ceil = _g191.ceil;
  var cos = _g191.cos;
  var floor = _g191.floor;
  var log = _g191.log;
  var log10 = _g191.log10;
  var pow = _g191.pow;
  var random = _g191.random;
  var sin = _g191.sin;
  var sinh = _g191.sinh;
  var sqrt = _g191.sqrt;
  var tan = _g191.tan;
  var tanh = _g191.tanh;
  var length = _g191.length;
  var none63 = _g191["none?"];
  var some63 = _g191["some?"];
  var one63 = _g191["one?"];
  var hd = _g191.hd;
  var string63 = _g191["string?"];
  var number63 = _g191["number?"];
  var boolean63 = _g191["boolean?"];
  var function63 = _g191["function?"];
  var composite63 = _g191["composite?"];
  var atom63 = _g191["atom?"];
  var table63 = _g191["table?"];
  var list63 = _g191["list?"];
  var substring = _g191.substring;
  var sub = _g191.sub;
  var inner = _g191.inner;
  var tl = _g191.tl;
  var char = _g191.char;
  var code = _g191.code;
  var string_literal63 = _g191["string-literal?"];
  var id_literal63 = _g191["id-literal?"];
  var add = _g191.add;
  var drop = _g191.drop;
  var last = _g191.last;
  var reverse = _g191.reverse;
  var join = _g191.join;
  var reduce = _g191.reduce;
  var keep = _g191.keep;
  var in63 = _g191["in?"];
  var find = _g191.find;
  var pair = _g191.pair;
  var sort = _g191.sort;
  var iterate = _g191.iterate;
  var replicate = _g191.replicate;
  var splice = _g191.splice;
  var map = _g191.map;
  var keys63 = _g191["keys?"];
  var empty63 = _g191["empty?"];
  var stash = _g191.stash;
  var unstash = _g191.unstash;
  var extend = _g191.extend;
  var exclude = _g191.exclude;
  var search = _g191.search;
  var split = _g191.split;
  var cat = _g191.cat;
  var _43 = _g191["+"];
  var _ = _g191["-"];
  var _42 = _g191["*"];
  var _47 = _g191["/"];
  var _37 = _g191["%"];
  var _62 = _g191[">"];
  var _60 = _g191["<"];
  var _61 = _g191["="];
  var _6261 = _g191[">="];
  var _6061 = _g191["<="];
  var read_file = _g191["read-file"];
  var write_file = _g191["write-file"];
  var write = _g191.write;
  var exit = _g191.exit;
  var today = _g191.today;
  var now = _g191.now;
  var number = _g191.number;
  var string = _g191.string;
  var space = _g191.space;
  var apply = _g191.apply;
  var make_id = _g191["make-id"];
  var _37message_handler = _g191["%message-handler"];
  var toplevel63 = _g191["toplevel?"];
  var module_key = _g191["module-key"];
  var module = _g191.module;
  var setenv = _g191.setenv;
  var _g194 = nexus["lumen/lib"];
  var getenv = _g194.getenv;
  var macro_function = _g194["macro-function"];
  var macro63 = _g194["macro?"];
  var special63 = _g194["special?"];
  var special_form63 = _g194["special-form?"];
  var statement63 = _g194["statement?"];
  var symbol_expansion = _g194["symbol-expansion"];
  var symbol63 = _g194["symbol?"];
  var variable63 = _g194["variable?"];
  var bound63 = _g194["bound?"];
  var quoted = _g194.quoted;
  var stash42 = _g194["stash*"];
  var bind = _g194.bind;
  var bind42 = _g194["bind*"];
  var quasiexpand = _g194.quasiexpand;
  var macroexpand = _g194.macroexpand;
  var indentation = _g194.indentation;
  var reserved63 = _g194["reserved?"];
  var valid_id63 = _g194["valid-id?"];
  var id = _g194.id;
  var key = _g194.key;
  var imported = _g194.imported;
  var linked = _g194.linked;
  var mapo = _g194.mapo;
  var quote_environment = _g194["quote-environment"];
  var quote_modules = _g194["quote-modules"];
  var initial_environment = _g194["initial-environment"];
  var _g195 = nexus["lumen/compiler"];
  var compile_function = _g195["compile-function"];
  var compile = _g195.compile;
  var open_module = _g195["open-module"];
  var load_module = _g195["load-module"];
  var in_module = _g195["in-module"];
  var import_modules = _g195["import-modules"];
  var compile_module = _g195["compile-module"];
  var declare = _g195.declare;
  var eval = _g195.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g369 = nexus["lumen/runtime"];
  var nil63 = _g369["nil?"];
  var is63 = _g369["is?"];
  var max = _g369.max;
  var min = _g369.min;
  var abs = _g369.abs;
  var acos = _g369.acos;
  var asin = _g369.asin;
  var atan = _g369.atan;
  var atan2 = _g369.atan2;
  var ceil = _g369.ceil;
  var cos = _g369.cos;
  var floor = _g369.floor;
  var log = _g369.log;
  var log10 = _g369.log10;
  var pow = _g369.pow;
  var random = _g369.random;
  var sin = _g369.sin;
  var sinh = _g369.sinh;
  var sqrt = _g369.sqrt;
  var tan = _g369.tan;
  var tanh = _g369.tanh;
  var length = _g369.length;
  var none63 = _g369["none?"];
  var some63 = _g369["some?"];
  var one63 = _g369["one?"];
  var hd = _g369.hd;
  var string63 = _g369["string?"];
  var number63 = _g369["number?"];
  var boolean63 = _g369["boolean?"];
  var function63 = _g369["function?"];
  var composite63 = _g369["composite?"];
  var atom63 = _g369["atom?"];
  var table63 = _g369["table?"];
  var list63 = _g369["list?"];
  var substring = _g369.substring;
  var sub = _g369.sub;
  var inner = _g369.inner;
  var tl = _g369.tl;
  var char = _g369.char;
  var code = _g369.code;
  var string_literal63 = _g369["string-literal?"];
  var id_literal63 = _g369["id-literal?"];
  var add = _g369.add;
  var drop = _g369.drop;
  var last = _g369.last;
  var reverse = _g369.reverse;
  var join = _g369.join;
  var reduce = _g369.reduce;
  var keep = _g369.keep;
  var in63 = _g369["in?"];
  var find = _g369.find;
  var pair = _g369.pair;
  var sort = _g369.sort;
  var iterate = _g369.iterate;
  var replicate = _g369.replicate;
  var splice = _g369.splice;
  var map = _g369.map;
  var keys63 = _g369["keys?"];
  var empty63 = _g369["empty?"];
  var stash = _g369.stash;
  var unstash = _g369.unstash;
  var extend = _g369.extend;
  var exclude = _g369.exclude;
  var search = _g369.search;
  var split = _g369.split;
  var cat = _g369.cat;
  var _43 = _g369["+"];
  var _ = _g369["-"];
  var _42 = _g369["*"];
  var _47 = _g369["/"];
  var _37 = _g369["%"];
  var _62 = _g369[">"];
  var _60 = _g369["<"];
  var _61 = _g369["="];
  var _6261 = _g369[">="];
  var _6061 = _g369["<="];
  var read_file = _g369["read-file"];
  var write_file = _g369["write-file"];
  var write = _g369.write;
  var exit = _g369.exit;
  var today = _g369.today;
  var now = _g369.now;
  var number = _g369.number;
  var string = _g369.string;
  var space = _g369.space;
  var apply = _g369.apply;
  var make_id = _g369["make-id"];
  var _37message_handler = _g369["%message-handler"];
  var toplevel63 = _g369["toplevel?"];
  var module_key = _g369["module-key"];
  var module = _g369.module;
  var setenv = _g369.setenv;
  var _g372 = nexus["lumen/lib"];
  var getenv = _g372.getenv;
  var macro_function = _g372["macro-function"];
  var macro63 = _g372["macro?"];
  var special63 = _g372["special?"];
  var special_form63 = _g372["special-form?"];
  var statement63 = _g372["statement?"];
  var symbol_expansion = _g372["symbol-expansion"];
  var symbol63 = _g372["symbol?"];
  var variable63 = _g372["variable?"];
  var bound63 = _g372["bound?"];
  var quoted = _g372.quoted;
  var stash42 = _g372["stash*"];
  var bind = _g372.bind;
  var bind42 = _g372["bind*"];
  var quasiexpand = _g372.quasiexpand;
  var macroexpand = _g372.macroexpand;
  var indentation = _g372.indentation;
  var reserved63 = _g372["reserved?"];
  var valid_id63 = _g372["valid-id?"];
  var id = _g372.id;
  var key = _g372.key;
  var imported = _g372.imported;
  var linked = _g372.linked;
  var mapo = _g372.mapo;
  var quote_environment = _g372["quote-environment"];
  var quote_modules = _g372["quote-modules"];
  var initial_environment = _g372["initial-environment"];
  var _g373 = nexus["lumen/compiler"];
  var compile_function = _g373["compile-function"];
  var compile = _g373.compile;
  var open_module = _g373["open-module"];
  var load_module = _g373["load-module"];
  var in_module = _g373["in-module"];
  var import_modules = _g373["import-modules"];
  var compile_module = _g373["compile-module"];
  var declare = _g373.declare;
  var eval = _g373.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g671 = nexus["lumen/runtime"];
  var nil63 = _g671["nil?"];
  var is63 = _g671["is?"];
  var max = _g671.max;
  var min = _g671.min;
  var abs = _g671.abs;
  var acos = _g671.acos;
  var asin = _g671.asin;
  var atan = _g671.atan;
  var atan2 = _g671.atan2;
  var ceil = _g671.ceil;
  var cos = _g671.cos;
  var floor = _g671.floor;
  var log = _g671.log;
  var log10 = _g671.log10;
  var pow = _g671.pow;
  var random = _g671.random;
  var sin = _g671.sin;
  var sinh = _g671.sinh;
  var sqrt = _g671.sqrt;
  var tan = _g671.tan;
  var tanh = _g671.tanh;
  var length = _g671.length;
  var none63 = _g671["none?"];
  var some63 = _g671["some?"];
  var one63 = _g671["one?"];
  var hd = _g671.hd;
  var string63 = _g671["string?"];
  var number63 = _g671["number?"];
  var boolean63 = _g671["boolean?"];
  var function63 = _g671["function?"];
  var composite63 = _g671["composite?"];
  var atom63 = _g671["atom?"];
  var table63 = _g671["table?"];
  var list63 = _g671["list?"];
  var substring = _g671.substring;
  var sub = _g671.sub;
  var inner = _g671.inner;
  var tl = _g671.tl;
  var char = _g671.char;
  var code = _g671.code;
  var string_literal63 = _g671["string-literal?"];
  var id_literal63 = _g671["id-literal?"];
  var add = _g671.add;
  var drop = _g671.drop;
  var last = _g671.last;
  var reverse = _g671.reverse;
  var join = _g671.join;
  var reduce = _g671.reduce;
  var keep = _g671.keep;
  var in63 = _g671["in?"];
  var find = _g671.find;
  var pair = _g671.pair;
  var sort = _g671.sort;
  var iterate = _g671.iterate;
  var replicate = _g671.replicate;
  var splice = _g671.splice;
  var map = _g671.map;
  var keys63 = _g671["keys?"];
  var empty63 = _g671["empty?"];
  var stash = _g671.stash;
  var unstash = _g671.unstash;
  var extend = _g671.extend;
  var exclude = _g671.exclude;
  var search = _g671.search;
  var split = _g671.split;
  var cat = _g671.cat;
  var _43 = _g671["+"];
  var _ = _g671["-"];
  var _42 = _g671["*"];
  var _47 = _g671["/"];
  var _37 = _g671["%"];
  var _62 = _g671[">"];
  var _60 = _g671["<"];
  var _61 = _g671["="];
  var _6261 = _g671[">="];
  var _6061 = _g671["<="];
  var read_file = _g671["read-file"];
  var write_file = _g671["write-file"];
  var write = _g671.write;
  var exit = _g671.exit;
  var today = _g671.today;
  var now = _g671.now;
  var number = _g671.number;
  var string = _g671.string;
  var space = _g671.space;
  var apply = _g671.apply;
  var make_id = _g671["make-id"];
  var _37message_handler = _g671["%message-handler"];
  var toplevel63 = _g671["toplevel?"];
  var module_key = _g671["module-key"];
  var module = _g671.module;
  var setenv = _g671.setenv;
  var _g674 = nexus["lumen/lib"];
  var getenv = _g674.getenv;
  var macro_function = _g674["macro-function"];
  var macro63 = _g674["macro?"];
  var special63 = _g674["special?"];
  var special_form63 = _g674["special-form?"];
  var statement63 = _g674["statement?"];
  var symbol_expansion = _g674["symbol-expansion"];
  var symbol63 = _g674["symbol?"];
  var variable63 = _g674["variable?"];
  var bound63 = _g674["bound?"];
  var quoted = _g674.quoted;
  var stash42 = _g674["stash*"];
  var bind = _g674.bind;
  var bind42 = _g674["bind*"];
  var quasiexpand = _g674.quasiexpand;
  var macroexpand = _g674.macroexpand;
  var indentation = _g674.indentation;
  var reserved63 = _g674["reserved?"];
  var valid_id63 = _g674["valid-id?"];
  var id = _g674.id;
  var key = _g674.key;
  var imported = _g674.imported;
  var linked = _g674.linked;
  var mapo = _g674.mapo;
  var quote_environment = _g674["quote-environment"];
  var quote_modules = _g674["quote-modules"];
  var initial_environment = _g674["initial-environment"];
  var _g675 = nexus["lumen/compiler"];
  var compile_function = _g675["compile-function"];
  var compile = _g675.compile;
  var open_module = _g675["open-module"];
  var load_module = _g675["load-module"];
  var in_module = _g675["in-module"];
  var import_modules = _g675["import-modules"];
  var compile_module = _g675["compile-module"];
  var declare = _g675.declare;
  var eval = _g675.eval;
  global.modules = {"lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {macro: function (form) {
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
      var _g688 = body;
      var k = undefined;
      for (k in _g688) {
        if (isNaN(parseInt(k))) {
          var v = _g688[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g689) {
      var a = _g689[0];
      var b = _g689[1];
      var c = sub(_g689, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g690 = sub(body, 0);
    return(["if", cond, join(["do"], _g690)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g691 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g691)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g692 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g692));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g693 = bind(lh, rh);
      var _g694 = 0;
      while (_g694 < length(_g693)) {
        var _g695 = _g693[_g694];
        var id = _g695[0];
        var val = _g695[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g694 = _g694 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g692)]])));
    }
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g696 = sub(body, 0);
    var imp = _g696.import;
    var exp = _g696.export;
    var alias = _g696.alias;
    var _g697 = import_modules(imp);
    var imports = _g697[0];
    var bindings = _g697[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g698 = exp || [];
    var _g699 = 0;
    while (_g699 < length(_g698)) {
      var x = _g698[_g699];
      setenv(x, {_stash: true, export: true});
      _g699 = _g699 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g700 = sub(body, 0);
    var form = join(["fn", args], _g700);
    var _g701 = ["setenv", ["quote", name]];
    _g701.macro = form;
    _g701.form = ["quote", form];
    eval(_g701);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g702 = sub(body, 0);
    var form = join(["fn", args], _g702);
    var keys = sub(_g702, length(_g702));
    var _g703 = ["setenv", ["quote", name]];
    _g703.special = form;
    _g703.form = ["quote", form];
    eval(join(_g703, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g704 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g704)) {
      var _g705 = bind42(x, _g704);
      var args = _g705[0];
      var _g706 = _g705[1];
      return(join(["%global-function", name, args], _g706));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g707 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g707) && target === "js") {
      return(linked(name, ["%local", name, join(["fn", x], _g707)]));
    } else {
      if (some63(_g707)) {
        var _g708 = bind42(x, _g707);
        var args = _g708[0];
        var _g709 = _g708[1];
        return(linked(name, join(["%local-function", name, args], _g709)));
      } else {
        return(linked(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set*": {macro: function (name, value) {
    return(linked(name, ["set", name, value]));
  }, export: true}, "with-bindings": {macro: function (_g710) {
    var names = _g710[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g711 = sub(body, 0);
    var x = make_id();
    var _g713 = ["setenv", x];
    _g713.variable = true;
    var _g712 = ["with-frame", ["each", [x], names, _g713]];
    _g712.scope = true;
    return(join(_g712, _g711));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g714 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g715 = join(["do"], macroexpand(_g714));
    drop(environment);
    return(_g715);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g716 = sub(body, 0);
    add(environment, {});
    map(function (_g718) {
      var name = _g718[0];
      var exp = _g718[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g717 = join(["do"], macroexpand(_g716));
    drop(environment);
    return(_g717);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g719 = sub(body, 0);
    var _g720 = bind42(args, _g719);
    var _g721 = _g720[0];
    var _g722 = _g720[1];
    return(join(["%function", _g721], _g722));
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
    var _g723 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g757;
    if (nil63(v)) {
      var _g758;
      if (b.i) {
        _g758 = "i";
      } else {
        _g758 = make_id();
      }
      var i = _g758;
      _g757 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g723), ["inc", i]]];
    } else {
      var _g724 = ["target"];
      _g724.js = ["isNaN", ["parseInt", k]];
      _g724.lua = ["not", ["number?", k]];
      _g757 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g724, join(["let", [v, ["get", t1, k]]], _g723)]]];
    }
    return(["let", [t1, t], _g757]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g725 = xs;
    var _g726 = 0;
    while (_g726 < length(_g725)) {
      var x = _g725[_g726];
      l[x] = true;
      _g726 = _g726 + 1;
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true, global: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g727 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g727)]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g728 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g728)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g729 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g730 = ["table"];
    _g730._scope = scope;
    return(["do", ["add", "environment", _g730], ["let", [x, join(["do"], _g729)], ["drop", "environment"], x]]);
  }, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {stmt: true, export: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g731 = forms;
    var _g732 = 0;
    while (_g732 < length(_g731)) {
      var x = _g731[_g732];
      str = str + compile(x, {_stash: true, stmt: true});
      _g732 = _g732 + 1;
    }
    return(str);
  }, foo: true}, "%if": {stmt: true, export: true, tr: true, special: function (cond, cons, alt) {
    var _g733 = compile(cond);
    indent_level = indent_level + 1;
    var _g735 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g734 = _g735;
    var _g759;
    if (alt) {
      indent_level = indent_level + 1;
      var _g737 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g759 = _g737;
    }
    var _g736 = _g759;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g733 + ") {\n" + _g734 + ind + "}";
    } else {
      str = str + ind + "if " + _g733 + " then\n" + _g734;
    }
    if (_g736 && target === "js") {
      str = str + " else {\n" + _g736 + ind + "}";
    } else {
      if (_g736) {
        str = str + ind + "else\n" + _g736;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true}, "while": {stmt: true, export: true, tr: true, special: function (cond, form) {
    var _g738 = compile(cond);
    indent_level = indent_level + 1;
    var _g739 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g739;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g738 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g738 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {stmt: true, export: true, tr: true, special: function (t, k, form) {
    var _g740 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g741 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g741;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g740 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g740 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {stmt: true, export: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g742 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g742;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g743 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g743;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true}, "break": {foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true, export: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%global-function": {stmt: true, export: true, tr: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true}, "%local-function": {stmt: true, export: true, tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true}, "return": {foo: true, special: function (x) {
    var _g760;
    if (nil63(x)) {
      _g760 = "return";
    } else {
      _g760 = "return(" + compile(x) + ")";
    }
    var _g744 = _g760;
    return(indentation() + _g744);
  }, stmt: true, export: true}, error: {foo: true, special: function (x) {
    var _g761;
    if (target === "js") {
      _g761 = "throw new " + compile(["Error", x]);
    } else {
      _g761 = "error(" + compile(x) + ")";
    }
    var e = _g761;
    return(indentation() + e);
  }, stmt: true, export: true}, "%local": {foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g762;
    if (is63(value)) {
      _g762 = " = " + value1;
    } else {
      _g762 = "";
    }
    var rh = _g762;
    var _g763;
    if (target === "js") {
      _g763 = "var ";
    } else {
      _g763 = "local ";
    }
    var keyword = _g763;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true, export: true}, set: {foo: true, special: function (lh, rh) {
    var _g745 = compile(lh);
    var _g764;
    if (nil63(rh)) {
      _g764 = "nil";
    } else {
      _g764 = rh;
    }
    var _g746 = compile(_g764);
    return(indentation() + _g745 + " = " + _g746);
  }, stmt: true, export: true}, get: {export: true, special: function (t, k) {
    var _g747 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g747, 0) === "{") {
      _g747 = "(" + _g747 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g747 + "." + inner(k));
    } else {
      return(_g747 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g765;
    if (target === "lua") {
      _g765 = "{";
    } else {
      _g765 = "[";
    }
    var open = _g765;
    var _g766;
    if (target === "lua") {
      _g766 = "}";
    } else {
      _g766 = "]";
    }
    var close = _g766;
    var str = "";
    var _g748 = forms;
    var i = 0;
    while (i < length(_g748)) {
      var x = _g748[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true}, "%object": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g767;
    if (target === "lua") {
      _g767 = " = ";
    } else {
      _g767 = ": ";
    }
    var sep = _g767;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g749 = pairs;
    var i = 0;
    while (i < length(_g749)) {
      var _g750 = _g749[i];
      var k = _g750[0];
      var v = _g750[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      str = str + key(k) + sep + compile(v);
      if (i < n_1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }, foo: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g751) {
    var char = _g751[0];
    var stream = _g751[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g752 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g752)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, linked: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, ceil: {export: true, variable: true}, cos: {export: true, variable: true}, floor: {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, pow: {export: true, variable: true}, random: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, sqrt: {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, splice: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, extend: {export: true, variable: true}, exclude: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, math: {variable: true}, type: {variable: true}, "max*": {variable: true}, "min*": {variable: true}, subl: {variable: true}, "splice?": {variable: true}, mapl: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g753 = sub(body, 0);
    var imp = _g753.import;
    var exp = _g753.export;
    var alias = _g753.alias;
    var _g754 = import_modules(imp);
    var imports = _g754[0];
    var bindings = _g754[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g755 = exp || [];
    var _g756 = 0;
    while (_g756 < length(_g755)) {
      var x = _g755[_g756];
      setenv(x, {_stash: true, export: true});
      _g756 = _g756 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g768 = nexus["lumen/runtime"];
  var nil63 = _g768["nil?"];
  var is63 = _g768["is?"];
  var max = _g768.max;
  var min = _g768.min;
  var abs = _g768.abs;
  var acos = _g768.acos;
  var asin = _g768.asin;
  var atan = _g768.atan;
  var atan2 = _g768.atan2;
  var ceil = _g768.ceil;
  var cos = _g768.cos;
  var floor = _g768.floor;
  var log = _g768.log;
  var log10 = _g768.log10;
  var pow = _g768.pow;
  var random = _g768.random;
  var sin = _g768.sin;
  var sinh = _g768.sinh;
  var sqrt = _g768.sqrt;
  var tan = _g768.tan;
  var tanh = _g768.tanh;
  var length = _g768.length;
  var none63 = _g768["none?"];
  var some63 = _g768["some?"];
  var one63 = _g768["one?"];
  var hd = _g768.hd;
  var string63 = _g768["string?"];
  var number63 = _g768["number?"];
  var boolean63 = _g768["boolean?"];
  var function63 = _g768["function?"];
  var composite63 = _g768["composite?"];
  var atom63 = _g768["atom?"];
  var table63 = _g768["table?"];
  var list63 = _g768["list?"];
  var substring = _g768.substring;
  var sub = _g768.sub;
  var inner = _g768.inner;
  var tl = _g768.tl;
  var char = _g768.char;
  var code = _g768.code;
  var string_literal63 = _g768["string-literal?"];
  var id_literal63 = _g768["id-literal?"];
  var add = _g768.add;
  var drop = _g768.drop;
  var last = _g768.last;
  var reverse = _g768.reverse;
  var join = _g768.join;
  var reduce = _g768.reduce;
  var keep = _g768.keep;
  var in63 = _g768["in?"];
  var find = _g768.find;
  var pair = _g768.pair;
  var sort = _g768.sort;
  var iterate = _g768.iterate;
  var replicate = _g768.replicate;
  var splice = _g768.splice;
  var map = _g768.map;
  var keys63 = _g768["keys?"];
  var empty63 = _g768["empty?"];
  var stash = _g768.stash;
  var unstash = _g768.unstash;
  var extend = _g768.extend;
  var exclude = _g768.exclude;
  var search = _g768.search;
  var split = _g768.split;
  var cat = _g768.cat;
  var _43 = _g768["+"];
  var _ = _g768["-"];
  var _42 = _g768["*"];
  var _47 = _g768["/"];
  var _37 = _g768["%"];
  var _62 = _g768[">"];
  var _60 = _g768["<"];
  var _61 = _g768["="];
  var _6261 = _g768[">="];
  var _6061 = _g768["<="];
  var read_file = _g768["read-file"];
  var write_file = _g768["write-file"];
  var write = _g768.write;
  var exit = _g768.exit;
  var today = _g768.today;
  var now = _g768.now;
  var number = _g768.number;
  var string = _g768.string;
  var space = _g768.space;
  var apply = _g768.apply;
  var make_id = _g768["make-id"];
  var _37message_handler = _g768["%message-handler"];
  var toplevel63 = _g768["toplevel?"];
  var module_key = _g768["module-key"];
  var module = _g768.module;
  var setenv = _g768.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
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
  var one63 = _g2["one?"];
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
  var in63 = _g2["in?"];
  var find = _g2.find;
  var pair = _g2.pair;
  var sort = _g2.sort;
  var iterate = _g2.iterate;
  var replicate = _g2.replicate;
  var splice = _g2.splice;
  var map = _g2.map;
  var flat = _g2.flat;
  var flat1 = _g2.flat1;
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
  var today = _g2.today;
  var now = _g2.now;
  var number = _g2.number;
  var string = _g2.string;
  var space = _g2.space;
  var apply = _g2.apply;
  var make_id = _g2["make-id"];
  var _37message_handler = _g2["%message-handler"];
  var toplevel63 = _g2["toplevel?"];
  var module_key = _g2["module-key"];
  var module = _g2.module;
  var setenv = _g2.setenv;
  var _g5 = nexus["lumen/reader"];
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus["lumen/compiler"];
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var in_module = _g6["in-module"];
  var import_modules = _g6["import-modules"];
  var compile_module = _g6["compile-module"];
  var declare = _g6.declare;
  var eval = _g6.eval;
  var rep = function (str) {
    var _g771 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g773) {
        return([false, _g773.message]);
      }
    })();
    var _g1 = _g771[0];
    var x = _g771[1];
    if (is63(x)) {
      return(print(string(x)));
    }
  };
  nexus["lumen/main"].rep = rep;
  var repl = function () {
    var step = function (str) {
      rep(str);
      return(write("> "));
    };
    write("> ");
    process.stdin.setEncoding("utf8");
    return(process.stdin.on("data", step));
  };
  nexus["lumen/main"].repl = repl;
  var usage = function () {
    print("usage: lumen [options] <module>");
    print("options:");
    print("  -o <output>\tOutput file");
    print("  -t <target>\tTarget language (default: lua)");
    print("  -e <expr>\tExpression to evaluate");
    return(exit());
  };
  nexus["lumen/main"].usage = usage;
  var main = function () {
    var args = sub(process.argv, 2);
    if (hd(args) === "-h" || hd(args) === "--help") {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var _g772 = args;
    var i = 0;
    while (i < length(_g772)) {
      var arg = _g772[i];
      if (arg === "-o" || arg === "-t" || arg === "-e") {
        if (i === length(args) - 1) {
          print("missing argument for" + " " + string(arg));
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
  };
  nexus["lumen/main"].main = main;
  main();
})();
