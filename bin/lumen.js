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
  var in63 = function (x, l) {
    var _g23 = l;
    var _g24 = 0;
    while (_g24 < length(_g23)) {
      var y = _g23[_g24];
      if (x === y) {
        return(true);
      }
      _g24 = _g24 + 1;
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var hd = function (l) {
    return(l[0]);
  };
  nexus["lumen/runtime"].hd = hd;
  var sd = function (l) {
    return(l[1]);
  };
  nexus["lumen/runtime"].sd = sd;
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
    var _g25 = min42(upto, length(l));
    var j = 0;
    var l2 = [];
    while (i < _g25) {
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
      var _g26 = x;
      var k = undefined;
      for (k in _g26) {
        if (nil63(number(k))) {
          var v = _g26[k];
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
          var _g27 = l1;
          var k = undefined;
          for (k in _g27) {
            if (nil63(number(k))) {
              var v = _g27[k];
              l[k] = v;
            }
          }
          var _g28 = l2;
          var k = undefined;
          for (k in _g28) {
            if (nil63(number(k))) {
              var v = _g28[k];
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
    var _g29 = l;
    var _g30 = 0;
    while (_g30 < length(_g29)) {
      var x = _g29[_g30];
      if (f(x)) {
        add(l1, x);
      }
      _g30 = _g30 + 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, xs) {
    var _g31 = xs;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var y = _g31[_g32];
      if (x === y) {
        return(true);
      }
      _g32 = _g32 + 1;
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, l) {
    var _g33 = l;
    var _g34 = 0;
    while (_g34 < length(_g33)) {
      var x = _g33[_g34];
      var _g35 = f(x);
      if (_g35) {
        return(_g35);
      }
      _g34 = _g34 + 1;
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
    var _g57;
    if (f) {
      _g57 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g57));
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
    var _g36 = l;
    var _g37 = 0;
    while (_g37 < length(_g36)) {
      var x = _g36[_g37];
      var _g38 = f(x);
      if (splice63(_g38)) {
        l1 = join(l1, _g38.value);
      } else {
        if (is63(_g38)) {
          add(l1, _g38);
        }
      }
      _g37 = _g37 + 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].mapl = mapl;
  var map = function (f, t) {
    var l = mapl(f, t);
    var _g39 = t;
    var k = undefined;
    for (k in _g39) {
      if (nil63(number(k))) {
        var v = _g39[k];
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
  var flat = function (x) {
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
  };
  nexus["lumen/runtime"].flat = flat;
  var flat1 = function (x) {
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
  };
  nexus["lumen/runtime"].flat1 = flat1;
  var keys63 = function (t) {
    var k63 = false;
    var _g40 = t;
    var k = undefined;
    for (k in _g40) {
      if (nil63(number(k))) {
        var v = _g40[k];
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
      var _g41 = args;
      var k = undefined;
      for (k in _g41) {
        if (nil63(number(k))) {
          var v = _g41[k];
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
        var _g42 = l;
        var k = undefined;
        for (k in _g42) {
          if (nil63(number(k))) {
            var v = _g42[k];
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
    var _g43 = sub(xs, 0);
    return(join(t, _g43));
  };
  nexus["lumen/runtime"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g44 = sub(keys, 0);
    var t1 = subl(t);
    var _g45 = t;
    var k = undefined;
    for (k in _g45) {
      if (nil63(number(k))) {
        var v = _g45[k];
        if (!_g44[k]) {
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
    var _g46 = sub(xs, 0);
    if (none63(_g46)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g46));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g47));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g48 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g48)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g49));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g50)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g51)));
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
    var numeric63 = function (c) {
      var n = code(c);
      return(n > 47 && n < 58);
    };
    var number_char63 = function (c) {
      return(numeric63(c) || in63(c, ["+", "-", "e", "E", "."]));
    };
    var i = 0;
    while (i < length(str)) {
      if (!number_char63(char(str, i))) {
        return;
      }
      i = i + 1;
    }
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
            var _g52 = x;
            var k = undefined;
            for (k in _g52) {
              if (nil63(number(k))) {
                var v = _g52[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g53 = x1;
            var i = 0;
            while (i < length(_g53)) {
              var y = _g53[i];
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
    var _g54 = stash(args);
    return(f.apply(f, _g54));
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
    var _g55 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g56 = _g55;
      var k1 = undefined;
      for (k1 in _g56) {
        if (nil63(number(k1))) {
          var v = _g56[k1];
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
  var _g62 = nexus["lumen/runtime"];
  var _37 = _g62["%"];
  var _37message_handler = _g62["%message-handler"];
  var _42 = _g62["*"];
  var _43 = _g62["+"];
  var _ = _g62["-"];
  var _47 = _g62["/"];
  var _60 = _g62["<"];
  var _6061 = _g62["<="];
  var _61 = _g62["="];
  var _62 = _g62[">"];
  var _6261 = _g62[">="];
  var abs = _g62.abs;
  var acos = _g62.acos;
  var add = _g62.add;
  var apply = _g62.apply;
  var asin = _g62.asin;
  var atan = _g62.atan;
  var atan2 = _g62.atan2;
  var atom63 = _g62["atom?"];
  var boolean63 = _g62["boolean?"];
  var cat = _g62.cat;
  var ceil = _g62.ceil;
  var char = _g62.char;
  var code = _g62.code;
  var composite63 = _g62["composite?"];
  var cos = _g62.cos;
  var drop = _g62.drop;
  var empty63 = _g62["empty?"];
  var exclude = _g62.exclude;
  var exit = _g62.exit;
  var extend = _g62.extend;
  var find = _g62.find;
  var flat = _g62.flat;
  var flat1 = _g62.flat1;
  var floor = _g62.floor;
  var function63 = _g62["function?"];
  var hd = _g62.hd;
  var id_literal63 = _g62["id-literal?"];
  var in63 = _g62["in?"];
  var inner = _g62.inner;
  var is63 = _g62["is?"];
  var iterate = _g62.iterate;
  var join = _g62.join;
  var keep = _g62.keep;
  var keys63 = _g62["keys?"];
  var last = _g62.last;
  var length = _g62.length;
  var list63 = _g62["list?"];
  var log = _g62.log;
  var log10 = _g62.log10;
  var make_id = _g62["make-id"];
  var map = _g62.map;
  var max = _g62.max;
  var min = _g62.min;
  var module = _g62.module;
  var module_key = _g62["module-key"];
  var nil63 = _g62["nil?"];
  var none63 = _g62["none?"];
  var now = _g62.now;
  var number = _g62.number;
  var number63 = _g62["number?"];
  var one63 = _g62["one?"];
  var pair = _g62.pair;
  var pow = _g62.pow;
  var random = _g62.random;
  var read_file = _g62["read-file"];
  var reduce = _g62.reduce;
  var replicate = _g62.replicate;
  var reverse = _g62.reverse;
  var sd = _g62.sd;
  var search = _g62.search;
  var setenv = _g62.setenv;
  var sin = _g62.sin;
  var sinh = _g62.sinh;
  var some63 = _g62["some?"];
  var sort = _g62.sort;
  var space = _g62.space;
  var splice = _g62.splice;
  var split = _g62.split;
  var sqrt = _g62.sqrt;
  var stash = _g62.stash;
  var string = _g62.string;
  var string_literal63 = _g62["string-literal?"];
  var string63 = _g62["string?"];
  var sub = _g62.sub;
  var substring = _g62.substring;
  var table63 = _g62["table?"];
  var tan = _g62.tan;
  var tanh = _g62.tanh;
  var tl = _g62.tl;
  var today = _g62.today;
  var toplevel63 = _g62["toplevel?"];
  var unstash = _g62.unstash;
  var write = _g62.write;
  var write_file = _g62["write-file"];
  var getenv = function (k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g65 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g66 = undefined;
        var _g67 = _g65;
        var x = undefined;
        for (x in _g67) {
          if (nil63(number(x))) {
            var _g58 = _g67[x];
            _g66 = x;
          }
        }
        if (_g66) {
          return(b[_g66]);
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
      var _g97;
      if (c === "\n") {
        _g97 = "\\n";
      } else {
        var _g98;
        if (c === "\"") {
          _g98 = "\\\"";
        } else {
          var _g99;
          if (c === "\\") {
            _g99 = "\\\\";
          } else {
            _g99 = c;
          }
          _g98 = _g99;
        }
        _g97 = _g98;
      }
      var c1 = _g97;
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
  var stash42 = function (args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var _g68 = args;
      var k = undefined;
      for (k in _g68) {
        if (nil63(number(k))) {
          var v = _g68[k];
          add(l, k);
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
        var _g69 = lh;
        var i = 0;
        while (i < length(_g69)) {
          var x = _g69[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g70 = lh;
        var k = undefined;
        for (k in _g70) {
          if (nil63(number(k))) {
            var v = _g70[k];
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
      var _g71 = args;
      var _g72 = 0;
      while (_g72 < length(_g71)) {
        var arg = _g71[_g72];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g72 = _g72 + 1;
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
          var _g59 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g60 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g75 = args;
            var _g76 = 0;
            while (_g76 < length(_g75)) {
              var _g73 = _g75[_g76];
              setenv(_g73, {_stash: true, variable: true});
              _g76 = _g76 + 1;
            }
            var _g74 = join(["%function", map(macroexpand, args)], macroexpand(body));
            drop(environment);
            return(_g74);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g61 = form[0];
              var _g77 = form[1];
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
              var _g81 = join([x, _g77, map(macroexpand, _g78)], macroexpand(_g79));
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
  };
  nexus["lumen/lib"].macroexpand = macroexpand;
  var quasiexpand;
  nexus["lumen/lib"].quasiexpand = quasiexpand;
  var quasiquote_list;
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g84 = form;
    var k = undefined;
    for (k in _g84) {
      if (nil63(number(k))) {
        var v = _g84[k];
        var _g100;
        if (quasisplice63(v, depth)) {
          _g100 = quasiexpand(v[1]);
        } else {
          _g100 = quasiexpand(v, depth);
        }
        var _g85 = _g100;
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
  var reserved = {"%": true, "*": true, "+": true, "-": true, "/": true, "<": true, "<=": true, "=": true, "==": true, ">": true, ">=": true, "and": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "elseif": true, "end": true, "false": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "local": true, "new": true, "nil": true, "not": true, "or": true, "repeat": true, "return": true, "switch": true, "then": true, "this": true, "throw": true, "true": true, "try": true, "typeof": true, "until": true, "var": true, "void": true, "while": true, "with": true};
  nexus["lumen/lib"].reserved = reserved;
  var reserved63 = function (x) {
    return(reserved[x]);
  };
  nexus["lumen/lib"]["reserved?"] = reserved63;
  var numeric63 = function (n) {
    return(n > 47 && n < 58);
  };
  nexus["lumen/lib"]["numeric?"] = numeric63;
  var valid_char63 = function (n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
  };
  nexus["lumen/lib"]["valid-char?"] = valid_char63;
  var valid_id63 = function (id) {
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
            if (!(valid_char63(n) && (i > 0 || !numeric63(n)))) {
              return(false);
            }
            i = i + 1;
          }
          return(true);
        }
      }
    }
  };
  nexus["lumen/lib"]["valid-id?"] = valid_id63;
  var id = function (id) {
    var id1 = "";
    var i = 0;
    while (i < length(id)) {
      var c = char(id, i);
      var n = code(c);
      var _g101;
      if (c === "-") {
        _g101 = "_";
      } else {
        var _g102;
        if (i === 0 && numeric63(n)) {
          _g102 = "_" + n;
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
        _g101 = _g102;
      }
      var c1 = _g101;
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
    if (valid_id63(k)) {
      return(k);
    } else {
      if (string_literal63(k) && valid_id63(i)) {
        return(i);
      } else {
        if (string_literal63(k)) {
          return(wrap(k));
        } else {
          return(wrap(quoted(k)));
        }
      }
    }
  };
  nexus["lumen/lib"].key = key;
  var sortk = function (l, k) {
    return(sort(l, function (a, b) {
      return(k(a) < k(b));
    }));
  };
  nexus["lumen/lib"].sortk = sortk;
  var imported = function (spec) {
    var _g93 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g93.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g94 = module(spec).export;
      var n = undefined;
      for (n in _g94) {
        if (nil63(number(n))) {
          var b = _g94[n];
          if (b.variable && (all || b.export)) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], sortk(imports, sd)));
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
    var _g95 = t;
    var k = undefined;
    for (k in _g95) {
      if (nil63(number(k))) {
        var v = _g95[k];
        var x = f(v);
        if (is63(x)) {
          var _g105;
          if (string_literal63(k)) {
            _g105 = k;
          } else {
            _g105 = quoted(k);
          }
          var k1 = _g105;
          add(o, k1);
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
    var _g96 = ["table"];
    _g96.alias = quoted(m.alias);
    _g96.export = quote_frame(m.export);
    _g96.import = quoted(m.import);
    return(_g96);
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
  var now = _g106.now;
  var number = _g106.number;
  var number63 = _g106["number?"];
  var one63 = _g106["one?"];
  var pair = _g106.pair;
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
  var space = _g106.space;
  var splice = _g106.splice;
  var split = _g106.split;
  var sqrt = _g106.sqrt;
  var stash = _g106.stash;
  var string = _g106.string;
  var string_literal63 = _g106["string-literal?"];
  var string63 = _g106["string?"];
  var sub = _g106.sub;
  var substring = _g106.substring;
  var table63 = _g106["table?"];
  var tan = _g106.tan;
  var tanh = _g106.tanh;
  var tl = _g106.tl;
  var today = _g106.today;
  var toplevel63 = _g106["toplevel?"];
  var unstash = _g106.unstash;
  var write = _g106.write;
  var write_file = _g106["write-file"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {" ": true, "\n": true, "\t": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({len: length(str), pos: 0, string: str});
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
  var _g117 = nexus["lumen/runtime"];
  var _37 = _g117["%"];
  var _37message_handler = _g117["%message-handler"];
  var _42 = _g117["*"];
  var _43 = _g117["+"];
  var _ = _g117["-"];
  var _47 = _g117["/"];
  var _60 = _g117["<"];
  var _6061 = _g117["<="];
  var _61 = _g117["="];
  var _62 = _g117[">"];
  var _6261 = _g117[">="];
  var abs = _g117.abs;
  var acos = _g117.acos;
  var add = _g117.add;
  var apply = _g117.apply;
  var asin = _g117.asin;
  var atan = _g117.atan;
  var atan2 = _g117.atan2;
  var atom63 = _g117["atom?"];
  var boolean63 = _g117["boolean?"];
  var cat = _g117.cat;
  var ceil = _g117.ceil;
  var char = _g117.char;
  var code = _g117.code;
  var composite63 = _g117["composite?"];
  var cos = _g117.cos;
  var drop = _g117.drop;
  var empty63 = _g117["empty?"];
  var exclude = _g117.exclude;
  var exit = _g117.exit;
  var extend = _g117.extend;
  var find = _g117.find;
  var flat = _g117.flat;
  var flat1 = _g117.flat1;
  var floor = _g117.floor;
  var function63 = _g117["function?"];
  var hd = _g117.hd;
  var id_literal63 = _g117["id-literal?"];
  var in63 = _g117["in?"];
  var inner = _g117.inner;
  var is63 = _g117["is?"];
  var iterate = _g117.iterate;
  var join = _g117.join;
  var keep = _g117.keep;
  var keys63 = _g117["keys?"];
  var last = _g117.last;
  var length = _g117.length;
  var list63 = _g117["list?"];
  var log = _g117.log;
  var log10 = _g117.log10;
  var make_id = _g117["make-id"];
  var map = _g117.map;
  var max = _g117.max;
  var min = _g117.min;
  var module = _g117.module;
  var module_key = _g117["module-key"];
  var nil63 = _g117["nil?"];
  var none63 = _g117["none?"];
  var now = _g117.now;
  var number = _g117.number;
  var number63 = _g117["number?"];
  var one63 = _g117["one?"];
  var pair = _g117.pair;
  var pow = _g117.pow;
  var random = _g117.random;
  var read_file = _g117["read-file"];
  var reduce = _g117.reduce;
  var replicate = _g117.replicate;
  var reverse = _g117.reverse;
  var sd = _g117.sd;
  var search = _g117.search;
  var setenv = _g117.setenv;
  var sin = _g117.sin;
  var sinh = _g117.sinh;
  var some63 = _g117["some?"];
  var sort = _g117.sort;
  var space = _g117.space;
  var splice = _g117.splice;
  var split = _g117.split;
  var sqrt = _g117.sqrt;
  var stash = _g117.stash;
  var string = _g117.string;
  var string_literal63 = _g117["string-literal?"];
  var string63 = _g117["string?"];
  var sub = _g117.sub;
  var substring = _g117.substring;
  var table63 = _g117["table?"];
  var tan = _g117.tan;
  var tanh = _g117.tanh;
  var tl = _g117.tl;
  var today = _g117.today;
  var toplevel63 = _g117["toplevel?"];
  var unstash = _g117.unstash;
  var write = _g117.write;
  var write_file = _g117["write-file"];
  var _g120 = nexus["lumen/lib"];
  var bind = _g120.bind;
  var bind42 = _g120["bind*"];
  var bound63 = _g120["bound?"];
  var getenv = _g120.getenv;
  var id = _g120.id;
  var imported = _g120.imported;
  var indentation = _g120.indentation;
  var initial_environment = _g120["initial-environment"];
  var key = _g120.key;
  var linked = _g120.linked;
  var macro_function = _g120["macro-function"];
  var macro63 = _g120["macro?"];
  var macroexpand = _g120.macroexpand;
  var mapo = _g120.mapo;
  var quasiexpand = _g120.quasiexpand;
  var quote_environment = _g120["quote-environment"];
  var quote_modules = _g120["quote-modules"];
  var quoted = _g120.quoted;
  var reserved63 = _g120["reserved?"];
  var sortk = _g120.sortk;
  var special_form63 = _g120["special-form?"];
  var special63 = _g120["special?"];
  var stash42 = _g120["stash*"];
  var statement63 = _g120["statement?"];
  var symbol_expansion = _g120["symbol-expansion"];
  var symbol63 = _g120["symbol?"];
  var valid_id63 = _g120["valid-id?"];
  var variable63 = _g120["variable?"];
  var _g121 = nexus["lumen/reader"];
  var make_stream = _g121["make-stream"];
  var read = _g121.read;
  var read_all = _g121["read-all"];
  var read_from_string = _g121["read-from-string"];
  var read_table = _g121["read-table"];
  var _g125 = [];
  _g125.js = "!";
  _g125.lua = "not ";
  var _g123 = [];
  var _g126 = [];
  _g126.js = "!";
  _g126.lua = "not ";
  _g123["not"] = _g126;
  var _g128 = [];
  _g128["%"] = true;
  _g128["*"] = true;
  _g128["/"] = true;
  var _g130 = [];
  _g130["+"] = true;
  _g130["-"] = true;
  var _g134 = [];
  _g134.js = "+";
  _g134.lua = "..";
  var _g132 = [];
  var _g135 = [];
  _g135.js = "+";
  _g135.lua = "..";
  _g132.cat = _g135;
  var _g137 = [];
  _g137["<"] = true;
  _g137["<="] = true;
  _g137[">"] = true;
  _g137[">="] = true;
  var _g141 = [];
  _g141.js = "===";
  _g141.lua = "==";
  var _g143 = [];
  _g143.js = "!=";
  _g143.lua = "~=";
  var _g139 = [];
  var _g144 = [];
  _g144.js = "===";
  _g144.lua = "==";
  _g139["="] = _g144;
  var _g145 = [];
  _g145.js = "!=";
  _g145.lua = "~=";
  _g139["~="] = _g145;
  var _g149 = [];
  _g149.js = "&&";
  _g149.lua = "and";
  var _g147 = [];
  var _g150 = [];
  _g150.js = "&&";
  _g150.lua = "and";
  _g147["and"] = _g150;
  var _g154 = [];
  _g154.js = "||";
  _g154.lua = "or";
  var _g152 = [];
  var _g155 = [];
  _g155.js = "||";
  _g155.lua = "or";
  _g152["or"] = _g155;
  var infix = [_g123, _g128, _g130, _g132, _g137, _g139, _g147, _g152];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g156 = infix;
      var i = 0;
      while (i < length(_g156)) {
        var level = _g156[i];
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
    var _g157 = args;
    var i = 0;
    while (i < length(_g157)) {
      var arg = _g157[i];
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
    var _g158 = getenv(x);
    var special = _g158.special;
    var stmt = _g158.stmt;
    var self_tr63 = _g158.tr;
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
    var _g159 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g159.right;
    var _g186;
    if (right) {
      _g186 = _6261;
    } else {
      _g186 = _62;
    }
    if (_g186(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g160 = sub(form, 1);
    var a = _g160[0];
    var b = _g160[1];
    var _g161 = op_delims(form, a);
    var ao = _g161[0];
    var ac = _g161[1];
    var _g162 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g162[0];
    var bc = _g162[1];
    var _g163 = compile(a);
    var _g164 = compile(b);
    var _g165 = getop(op);
    if (unary63(form)) {
      return(_g165 + ao + _g163 + ac);
    } else {
      return(ao + _g163 + ac + " " + _g165 + " " + bo + _g164 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g166 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g166.name;
    var prefix = _g166.prefix;
    var _g187;
    if (name) {
      _g187 = compile(name);
    } else {
      _g187 = "";
    }
    var id = _g187;
    var _g167 = prefix || "";
    var _g168 = compile_args(args);
    indent_level = indent_level + 1;
    var _g170 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g169 = _g170;
    var ind = indentation();
    var _g188;
    if (target === "js") {
      _g188 = "";
    } else {
      _g188 = "end";
    }
    var tr = _g188;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g168 + " {\n" + _g169 + ind + "}" + tr);
    } else {
      return(_g167 + "function " + id + _g168 + "\n" + _g169 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g171 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g171.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g189;
        if (stmt) {
          _g189 = indentation();
        } else {
          _g189 = "";
        }
        var ind = _g189;
        var _g190;
        if (atom63(form)) {
          _g190 = compile_atom(form);
        } else {
          var _g191;
          if (infix63(hd(form))) {
            _g191 = compile_infix(form);
          } else {
            _g191 = compile_call(form);
          }
          _g190 = _g191;
        }
        var _g172 = _g190;
        return(ind + _g172 + tr);
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
  };
  nexus["lumen/compiler"]["lower-do"] = lower_do;
  var lower_if = function (args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g175 = args[1];
    var _g176 = args[2];
    if (stmt63 || tail63) {
      var _g193;
      if (_g176) {
        _g193 = [lower_body([_g176], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g175], tail63)], _g193)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g192;
      if (_g176) {
        _g192 = [lower(["set", e, _g176])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g175])], _g192));
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
    var _g177 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g177, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g178 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g178)) {
      return(_g178);
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
    var _g179 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g179.all;
    var m = module(spec);
    var frame = last(environment);
    var _g180 = m.export;
    var k = undefined;
    for (k in _g180) {
      if (nil63(number(k))) {
        var v = _g180[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g181 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g181.all;
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
    var _g182 = specs || [];
    var _g183 = 0;
    while (_g183 < length(_g182)) {
      var spec = _g182[_g183];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g184 = import_modules(m.alias);
        var aliased = _g184[0];
        var bs = _g184[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g185 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g185);
      }
      _g183 = _g183 + 1;
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
    return(join(map(function (x) {
      return(splice(imported(x)));
    }, m.import), imported(current_module, {_stash: true, all: true})));
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
  var _g195 = nexus["lumen/runtime"];
  var _37 = _g195["%"];
  var _37message_handler = _g195["%message-handler"];
  var _42 = _g195["*"];
  var _43 = _g195["+"];
  var _ = _g195["-"];
  var _47 = _g195["/"];
  var _60 = _g195["<"];
  var _6061 = _g195["<="];
  var _61 = _g195["="];
  var _62 = _g195[">"];
  var _6261 = _g195[">="];
  var abs = _g195.abs;
  var acos = _g195.acos;
  var add = _g195.add;
  var apply = _g195.apply;
  var asin = _g195.asin;
  var atan = _g195.atan;
  var atan2 = _g195.atan2;
  var atom63 = _g195["atom?"];
  var boolean63 = _g195["boolean?"];
  var cat = _g195.cat;
  var ceil = _g195.ceil;
  var char = _g195.char;
  var code = _g195.code;
  var composite63 = _g195["composite?"];
  var cos = _g195.cos;
  var drop = _g195.drop;
  var empty63 = _g195["empty?"];
  var exclude = _g195.exclude;
  var exit = _g195.exit;
  var extend = _g195.extend;
  var find = _g195.find;
  var flat = _g195.flat;
  var flat1 = _g195.flat1;
  var floor = _g195.floor;
  var function63 = _g195["function?"];
  var hd = _g195.hd;
  var id_literal63 = _g195["id-literal?"];
  var in63 = _g195["in?"];
  var inner = _g195.inner;
  var is63 = _g195["is?"];
  var iterate = _g195.iterate;
  var join = _g195.join;
  var keep = _g195.keep;
  var keys63 = _g195["keys?"];
  var last = _g195.last;
  var length = _g195.length;
  var list63 = _g195["list?"];
  var log = _g195.log;
  var log10 = _g195.log10;
  var make_id = _g195["make-id"];
  var map = _g195.map;
  var max = _g195.max;
  var min = _g195.min;
  var module = _g195.module;
  var module_key = _g195["module-key"];
  var nil63 = _g195["nil?"];
  var none63 = _g195["none?"];
  var now = _g195.now;
  var number = _g195.number;
  var number63 = _g195["number?"];
  var one63 = _g195["one?"];
  var pair = _g195.pair;
  var pow = _g195.pow;
  var random = _g195.random;
  var read_file = _g195["read-file"];
  var reduce = _g195.reduce;
  var replicate = _g195.replicate;
  var reverse = _g195.reverse;
  var sd = _g195.sd;
  var search = _g195.search;
  var setenv = _g195.setenv;
  var sin = _g195.sin;
  var sinh = _g195.sinh;
  var some63 = _g195["some?"];
  var sort = _g195.sort;
  var space = _g195.space;
  var splice = _g195.splice;
  var split = _g195.split;
  var sqrt = _g195.sqrt;
  var stash = _g195.stash;
  var string = _g195.string;
  var string_literal63 = _g195["string-literal?"];
  var string63 = _g195["string?"];
  var sub = _g195.sub;
  var substring = _g195.substring;
  var table63 = _g195["table?"];
  var tan = _g195.tan;
  var tanh = _g195.tanh;
  var tl = _g195.tl;
  var today = _g195.today;
  var toplevel63 = _g195["toplevel?"];
  var unstash = _g195.unstash;
  var write = _g195.write;
  var write_file = _g195["write-file"];
  var _g198 = nexus["lumen/lib"];
  var bind = _g198.bind;
  var bind42 = _g198["bind*"];
  var bound63 = _g198["bound?"];
  var getenv = _g198.getenv;
  var id = _g198.id;
  var imported = _g198.imported;
  var indentation = _g198.indentation;
  var initial_environment = _g198["initial-environment"];
  var key = _g198.key;
  var linked = _g198.linked;
  var macro_function = _g198["macro-function"];
  var macro63 = _g198["macro?"];
  var macroexpand = _g198.macroexpand;
  var mapo = _g198.mapo;
  var quasiexpand = _g198.quasiexpand;
  var quote_environment = _g198["quote-environment"];
  var quote_modules = _g198["quote-modules"];
  var quoted = _g198.quoted;
  var reserved63 = _g198["reserved?"];
  var sortk = _g198.sortk;
  var special_form63 = _g198["special-form?"];
  var special63 = _g198["special?"];
  var stash42 = _g198["stash*"];
  var statement63 = _g198["statement?"];
  var symbol_expansion = _g198["symbol-expansion"];
  var symbol63 = _g198["symbol?"];
  var valid_id63 = _g198["valid-id?"];
  var variable63 = _g198["variable?"];
  var _g199 = nexus["lumen/compiler"];
  var compile = _g199.compile;
  var compile_function = _g199["compile-function"];
  var compile_module = _g199["compile-module"];
  var declare = _g199.declare;
  var eval = _g199.eval;
  var import_modules = _g199["import-modules"];
  var in_module = _g199["in-module"];
  var load_module = _g199["load-module"];
  var open_module = _g199["open-module"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g373 = nexus["lumen/runtime"];
  var _37 = _g373["%"];
  var _37message_handler = _g373["%message-handler"];
  var _42 = _g373["*"];
  var _43 = _g373["+"];
  var _ = _g373["-"];
  var _47 = _g373["/"];
  var _60 = _g373["<"];
  var _6061 = _g373["<="];
  var _61 = _g373["="];
  var _62 = _g373[">"];
  var _6261 = _g373[">="];
  var abs = _g373.abs;
  var acos = _g373.acos;
  var add = _g373.add;
  var apply = _g373.apply;
  var asin = _g373.asin;
  var atan = _g373.atan;
  var atan2 = _g373.atan2;
  var atom63 = _g373["atom?"];
  var boolean63 = _g373["boolean?"];
  var cat = _g373.cat;
  var ceil = _g373.ceil;
  var char = _g373.char;
  var code = _g373.code;
  var composite63 = _g373["composite?"];
  var cos = _g373.cos;
  var drop = _g373.drop;
  var empty63 = _g373["empty?"];
  var exclude = _g373.exclude;
  var exit = _g373.exit;
  var extend = _g373.extend;
  var find = _g373.find;
  var flat = _g373.flat;
  var flat1 = _g373.flat1;
  var floor = _g373.floor;
  var function63 = _g373["function?"];
  var hd = _g373.hd;
  var id_literal63 = _g373["id-literal?"];
  var in63 = _g373["in?"];
  var inner = _g373.inner;
  var is63 = _g373["is?"];
  var iterate = _g373.iterate;
  var join = _g373.join;
  var keep = _g373.keep;
  var keys63 = _g373["keys?"];
  var last = _g373.last;
  var length = _g373.length;
  var list63 = _g373["list?"];
  var log = _g373.log;
  var log10 = _g373.log10;
  var make_id = _g373["make-id"];
  var map = _g373.map;
  var max = _g373.max;
  var min = _g373.min;
  var module = _g373.module;
  var module_key = _g373["module-key"];
  var nil63 = _g373["nil?"];
  var none63 = _g373["none?"];
  var now = _g373.now;
  var number = _g373.number;
  var number63 = _g373["number?"];
  var one63 = _g373["one?"];
  var pair = _g373.pair;
  var pow = _g373.pow;
  var random = _g373.random;
  var read_file = _g373["read-file"];
  var reduce = _g373.reduce;
  var replicate = _g373.replicate;
  var reverse = _g373.reverse;
  var sd = _g373.sd;
  var search = _g373.search;
  var setenv = _g373.setenv;
  var sin = _g373.sin;
  var sinh = _g373.sinh;
  var some63 = _g373["some?"];
  var sort = _g373.sort;
  var space = _g373.space;
  var splice = _g373.splice;
  var split = _g373.split;
  var sqrt = _g373.sqrt;
  var stash = _g373.stash;
  var string = _g373.string;
  var string_literal63 = _g373["string-literal?"];
  var string63 = _g373["string?"];
  var sub = _g373.sub;
  var substring = _g373.substring;
  var table63 = _g373["table?"];
  var tan = _g373.tan;
  var tanh = _g373.tanh;
  var tl = _g373.tl;
  var today = _g373.today;
  var toplevel63 = _g373["toplevel?"];
  var unstash = _g373.unstash;
  var write = _g373.write;
  var write_file = _g373["write-file"];
  var _g376 = nexus["lumen/lib"];
  var bind = _g376.bind;
  var bind42 = _g376["bind*"];
  var bound63 = _g376["bound?"];
  var getenv = _g376.getenv;
  var id = _g376.id;
  var imported = _g376.imported;
  var indentation = _g376.indentation;
  var initial_environment = _g376["initial-environment"];
  var key = _g376.key;
  var linked = _g376.linked;
  var macro_function = _g376["macro-function"];
  var macro63 = _g376["macro?"];
  var macroexpand = _g376.macroexpand;
  var mapo = _g376.mapo;
  var quasiexpand = _g376.quasiexpand;
  var quote_environment = _g376["quote-environment"];
  var quote_modules = _g376["quote-modules"];
  var quoted = _g376.quoted;
  var reserved63 = _g376["reserved?"];
  var sortk = _g376.sortk;
  var special_form63 = _g376["special-form?"];
  var special63 = _g376["special?"];
  var stash42 = _g376["stash*"];
  var statement63 = _g376["statement?"];
  var symbol_expansion = _g376["symbol-expansion"];
  var symbol63 = _g376["symbol?"];
  var valid_id63 = _g376["valid-id?"];
  var variable63 = _g376["variable?"];
  var _g377 = nexus["lumen/compiler"];
  var compile = _g377.compile;
  var compile_function = _g377["compile-function"];
  var compile_module = _g377["compile-module"];
  var declare = _g377.declare;
  var eval = _g377.eval;
  var import_modules = _g377["import-modules"];
  var in_module = _g377["in-module"];
  var load_module = _g377["load-module"];
  var open_module = _g377["open-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g690 = nexus["lumen/runtime"];
  var _37 = _g690["%"];
  var _37message_handler = _g690["%message-handler"];
  var _42 = _g690["*"];
  var _43 = _g690["+"];
  var _ = _g690["-"];
  var _47 = _g690["/"];
  var _60 = _g690["<"];
  var _6061 = _g690["<="];
  var _61 = _g690["="];
  var _62 = _g690[">"];
  var _6261 = _g690[">="];
  var abs = _g690.abs;
  var acos = _g690.acos;
  var add = _g690.add;
  var apply = _g690.apply;
  var asin = _g690.asin;
  var atan = _g690.atan;
  var atan2 = _g690.atan2;
  var atom63 = _g690["atom?"];
  var boolean63 = _g690["boolean?"];
  var cat = _g690.cat;
  var ceil = _g690.ceil;
  var char = _g690.char;
  var code = _g690.code;
  var composite63 = _g690["composite?"];
  var cos = _g690.cos;
  var drop = _g690.drop;
  var empty63 = _g690["empty?"];
  var exclude = _g690.exclude;
  var exit = _g690.exit;
  var extend = _g690.extend;
  var find = _g690.find;
  var flat = _g690.flat;
  var flat1 = _g690.flat1;
  var floor = _g690.floor;
  var function63 = _g690["function?"];
  var hd = _g690.hd;
  var id_literal63 = _g690["id-literal?"];
  var in63 = _g690["in?"];
  var inner = _g690.inner;
  var is63 = _g690["is?"];
  var iterate = _g690.iterate;
  var join = _g690.join;
  var keep = _g690.keep;
  var keys63 = _g690["keys?"];
  var last = _g690.last;
  var length = _g690.length;
  var list63 = _g690["list?"];
  var log = _g690.log;
  var log10 = _g690.log10;
  var make_id = _g690["make-id"];
  var map = _g690.map;
  var max = _g690.max;
  var min = _g690.min;
  var module = _g690.module;
  var module_key = _g690["module-key"];
  var nil63 = _g690["nil?"];
  var none63 = _g690["none?"];
  var now = _g690.now;
  var number = _g690.number;
  var number63 = _g690["number?"];
  var one63 = _g690["one?"];
  var pair = _g690.pair;
  var pow = _g690.pow;
  var random = _g690.random;
  var read_file = _g690["read-file"];
  var reduce = _g690.reduce;
  var replicate = _g690.replicate;
  var reverse = _g690.reverse;
  var sd = _g690.sd;
  var search = _g690.search;
  var setenv = _g690.setenv;
  var sin = _g690.sin;
  var sinh = _g690.sinh;
  var some63 = _g690["some?"];
  var sort = _g690.sort;
  var space = _g690.space;
  var splice = _g690.splice;
  var split = _g690.split;
  var sqrt = _g690.sqrt;
  var stash = _g690.stash;
  var string = _g690.string;
  var string_literal63 = _g690["string-literal?"];
  var string63 = _g690["string?"];
  var sub = _g690.sub;
  var substring = _g690.substring;
  var table63 = _g690["table?"];
  var tan = _g690.tan;
  var tanh = _g690.tanh;
  var tl = _g690.tl;
  var today = _g690.today;
  var toplevel63 = _g690["toplevel?"];
  var unstash = _g690.unstash;
  var write = _g690.write;
  var write_file = _g690["write-file"];
  var _g693 = nexus["lumen/lib"];
  var bind = _g693.bind;
  var bind42 = _g693["bind*"];
  var bound63 = _g693["bound?"];
  var getenv = _g693.getenv;
  var id = _g693.id;
  var imported = _g693.imported;
  var indentation = _g693.indentation;
  var initial_environment = _g693["initial-environment"];
  var key = _g693.key;
  var linked = _g693.linked;
  var macro_function = _g693["macro-function"];
  var macro63 = _g693["macro?"];
  var macroexpand = _g693.macroexpand;
  var mapo = _g693.mapo;
  var quasiexpand = _g693.quasiexpand;
  var quote_environment = _g693["quote-environment"];
  var quote_modules = _g693["quote-modules"];
  var quoted = _g693.quoted;
  var reserved63 = _g693["reserved?"];
  var sortk = _g693.sortk;
  var special_form63 = _g693["special-form?"];
  var special63 = _g693["special?"];
  var stash42 = _g693["stash*"];
  var statement63 = _g693["statement?"];
  var symbol_expansion = _g693["symbol-expansion"];
  var symbol63 = _g693["symbol?"];
  var valid_id63 = _g693["valid-id?"];
  var variable63 = _g693["variable?"];
  var _g694 = nexus["lumen/compiler"];
  var compile = _g694.compile;
  var compile_function = _g694["compile-function"];
  var compile_module = _g694["compile-module"];
  var declare = _g694.declare;
  var eval = _g694.eval;
  var import_modules = _g694["import-modules"];
  var in_module = _g694["in-module"];
  var load_module = _g694["load-module"];
  var open_module = _g694["open-module"];
  global.modules = {lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {"%compile-module": {variable: true}, "%result": {export: true, global: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, conclude: {variable: true}, "current-module": {export: true, global: true}, declare: {export: true, variable: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "import-modules": {export: true, variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, reimported: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, "lumen/core": {export: {at: {export: true, macro: function (l, i) {
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
    var _g752 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g752)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g731 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g731) && target === "js") {
      return(linked(name, ["%local", name, join(["fn", x], _g731)]));
    } else {
      if (some63(_g731)) {
        var _g732 = bind42(x, _g731);
        var args = _g732[0];
        var _g733 = _g732[1];
        return(linked(name, join(["%local-function", name, args], _g733)));
      } else {
        return(linked(name, ["%local", name, x]));
      }
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g728 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g728)) {
      var _g729 = bind42(x, _g728);
      var args = _g729[0];
      var _g730 = _g729[1];
      return(join(["%global-function", name, args], _g730));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g724 = sub(body, 0);
    var form = join(["fn", args], _g724);
    var _g725 = ["setenv", ["quote", name]];
    _g725.form = ["quote", form];
    _g725.macro = form;
    eval(_g725);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g720 = sub(body, 0);
    var alias = _g720.alias;
    var exp = _g720.export;
    var imp = _g720.import;
    var _g721 = import_modules(imp);
    var imports = _g721[0];
    var bindings = _g721[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g722 = exp || [];
    var _g723 = 0;
    while (_g723 < length(_g722)) {
      var x = _g722[_g723];
      setenv(x, {_stash: true, export: true});
      _g723 = _g723 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g726 = sub(body, 0);
    var form = join(["fn", args], _g726);
    var keys = sub(_g726, length(_g726));
    var _g727 = ["setenv", ["quote", name]];
    _g727.form = ["quote", form];
    _g727.special = form;
    eval(join(_g727, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g747 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g781;
    if (nil63(v)) {
      var _g782;
      if (b.i) {
        _g782 = "i";
      } else {
        _g782 = make_id();
      }
      var i = _g782;
      _g781 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g747), ["inc", i]]];
    } else {
      var _g748 = ["target"];
      _g748.js = ["nil?", ["number", k]];
      _g748.lua = ["not", ["number?", k]];
      _g781 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g748, join(["let", [v, ["get", t1, k]]], _g747)]]];
    }
    return(["let", [t1, t], _g781]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g743 = sub(body, 0);
    var _g744 = bind42(args, _g743);
    var _g745 = _g744[0];
    var _g746 = _g744[1];
    return(join(["%function", _g745], _g746));
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
    var step = function (_g708) {
      var a = _g708[0];
      var b = _g708[1];
      var c = sub(_g708, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g751 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g751)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g715 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g716) {
      var lh = _g716[0];
      var rh = _g716[1];
      var _g717 = bind(lh, rh);
      var _g718 = 0;
      while (_g718 < length(_g717)) {
        var _g719 = _g717[_g718];
        var id = _g719[0];
        var val = _g719[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g718 = _g718 + 1;
      }
    }, pair(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g715)])));
  }}, "let*": {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g711 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g711));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g712 = bind(lh, rh);
      var _g713 = 0;
      while (_g713 < length(_g712)) {
        var _g714 = _g712[_g713];
        var id = _g714[0];
        var val = _g714[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g713 = _g713 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let*", sub(bindings, 2)], _g711)]])));
    }
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g738 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g739 = join(["do"], macroexpand(_g738));
    drop(environment);
    return(_g739);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g740 = sub(body, 0);
    add(environment, {});
    map(function (_g742) {
      var name = _g742[0];
      var exp = _g742[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g741 = join(["do"], macroexpand(_g740));
    drop(environment);
    return(_g741);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g707 = body;
      var k = undefined;
      for (k in _g707) {
        if (nil63(number(k))) {
          var v = _g707[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set*": {export: true, macro: function (name, value) {
    return(linked(name, ["set", name, value]));
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g749 = xs;
    var _g750 = 0;
    while (_g750 < length(_g749)) {
      var x = _g749[_g750];
      l[x] = true;
      _g750 = _g750 + 1;
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
    var _g710 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g710)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g709 = sub(body, 0);
    return(["if", cond, join(["do"], _g709)]);
  }}, "with-bindings": {export: true, macro: function (_g734) {
    var names = _g734[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g735 = sub(body, 0);
    var x = make_id();
    var _g737 = ["setenv", x];
    _g737.variable = true;
    var _g736 = ["with-frame", ["each", [x], names, _g737]];
    _g736.scope = true;
    return(join(_g736, _g735));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g753 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g754 = ["table"];
    _g754._scope = scope;
    return(["do", ["add", "environment", _g754], ["let", [x, join(["do"], _g753)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/lib": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, key: {export: true, variable: true}, linked: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g755) {
    var char = _g755[0];
    var stream = _g755[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g756 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g756)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, "max*": {variable: true}, min: {export: true, variable: true}, "min*": {variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, "one?": {export: true, variable: true}, pair: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, space: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, subl: {variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {}, tl: {export: true, variable: true}, today: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g789;
    if (target === "lua") {
      _g789 = "{";
    } else {
      _g789 = "[";
    }
    var open = _g789;
    var _g790;
    if (target === "lua") {
      _g790 = "}";
    } else {
      _g790 = "]";
    }
    var close = _g790;
    var str = "";
    var _g774 = forms;
    var i = 0;
    while (i < length(_g774)) {
      var x = _g774[i];
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
    var _g759 = compile(cond);
    indent_level = indent_level + 1;
    var _g762 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g760 = _g762;
    var _g783;
    if (alt) {
      indent_level = indent_level + 1;
      var _g763 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g783 = _g763;
    }
    var _g761 = _g783;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g759 + ") {\n" + _g760 + ind + "}";
    } else {
      str = str + ind + "if " + _g759 + " then\n" + _g760;
    }
    if (_g761 && target === "js") {
      str = str + " else {\n" + _g761 + ind + "}";
    } else {
      if (_g761) {
        str = str + ind + "else\n" + _g761;
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
    var _g786;
    if (is63(value)) {
      _g786 = " = " + value1;
    } else {
      _g786 = "";
    }
    var rh = _g786;
    var _g787;
    if (target === "js") {
      _g787 = "var ";
    } else {
      _g787 = "local ";
    }
    var keyword = _g787;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g791;
    if (target === "lua") {
      _g791 = " = ";
    } else {
      _g791 = ": ";
    }
    var sep = _g791;
    var pairs = sortk(pair(forms), hd);
    var _g775 = pairs;
    var i = 0;
    while (i < length(_g775)) {
      var _g776 = _g775[i];
      var k = _g776[0];
      var v = _g776[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      str = str + key(k) + sep + compile(v);
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g768 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g768;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g769 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g769;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g757 = forms;
    var _g758 = 0;
    while (_g758 < length(_g757)) {
      var x = _g757[_g758];
      str = str + compile(x, {_stash: true, stmt: true});
      _g758 = _g758 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g785;
    if (target === "js") {
      _g785 = "throw new " + compile(["Error", x]);
    } else {
      _g785 = "error(" + compile(x) + ")";
    }
    var e = _g785;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g773 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g773, 0) === "{") {
      _g773 = "(" + _g773 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g773 + "." + inner(k));
    } else {
      return(_g773 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g784;
    if (nil63(x)) {
      _g784 = "return";
    } else {
      _g784 = "return(" + compile(x) + ")";
    }
    var _g770 = _g784;
    return(indentation() + _g770);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g771 = compile(lh);
    var _g788;
    if (nil63(rh)) {
      _g788 = "nil";
    } else {
      _g788 = rh;
    }
    var _g772 = compile(_g788);
    return(indentation() + _g771 + " = " + _g772);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g764 = compile(cond);
    indent_level = indent_level + 1;
    var _g765 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g765;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g764 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g764 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g777 = sub(body, 0);
    var alias = _g777.alias;
    var exp = _g777.export;
    var imp = _g777.import;
    var _g778 = import_modules(imp);
    var imports = _g778[0];
    var bindings = _g778[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g779 = exp || [];
    var _g780 = 0;
    while (_g780 < length(_g779)) {
      var x = _g779[_g780];
      setenv(x, {_stash: true, export: true});
      _g780 = _g780 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g792 = nexus["lumen/runtime"];
  var _37 = _g792["%"];
  var _37message_handler = _g792["%message-handler"];
  var _42 = _g792["*"];
  var _43 = _g792["+"];
  var _ = _g792["-"];
  var _47 = _g792["/"];
  var _60 = _g792["<"];
  var _6061 = _g792["<="];
  var _61 = _g792["="];
  var _62 = _g792[">"];
  var _6261 = _g792[">="];
  var abs = _g792.abs;
  var acos = _g792.acos;
  var add = _g792.add;
  var apply = _g792.apply;
  var asin = _g792.asin;
  var atan = _g792.atan;
  var atan2 = _g792.atan2;
  var atom63 = _g792["atom?"];
  var boolean63 = _g792["boolean?"];
  var cat = _g792.cat;
  var ceil = _g792.ceil;
  var char = _g792.char;
  var code = _g792.code;
  var composite63 = _g792["composite?"];
  var cos = _g792.cos;
  var drop = _g792.drop;
  var empty63 = _g792["empty?"];
  var exclude = _g792.exclude;
  var exit = _g792.exit;
  var extend = _g792.extend;
  var find = _g792.find;
  var flat = _g792.flat;
  var flat1 = _g792.flat1;
  var floor = _g792.floor;
  var function63 = _g792["function?"];
  var hd = _g792.hd;
  var id_literal63 = _g792["id-literal?"];
  var in63 = _g792["in?"];
  var inner = _g792.inner;
  var is63 = _g792["is?"];
  var iterate = _g792.iterate;
  var join = _g792.join;
  var keep = _g792.keep;
  var keys63 = _g792["keys?"];
  var last = _g792.last;
  var length = _g792.length;
  var list63 = _g792["list?"];
  var log = _g792.log;
  var log10 = _g792.log10;
  var make_id = _g792["make-id"];
  var map = _g792.map;
  var max = _g792.max;
  var min = _g792.min;
  var module = _g792.module;
  var module_key = _g792["module-key"];
  var nil63 = _g792["nil?"];
  var none63 = _g792["none?"];
  var now = _g792.now;
  var number = _g792.number;
  var number63 = _g792["number?"];
  var one63 = _g792["one?"];
  var pair = _g792.pair;
  var pow = _g792.pow;
  var random = _g792.random;
  var read_file = _g792["read-file"];
  var reduce = _g792.reduce;
  var replicate = _g792.replicate;
  var reverse = _g792.reverse;
  var sd = _g792.sd;
  var search = _g792.search;
  var setenv = _g792.setenv;
  var sin = _g792.sin;
  var sinh = _g792.sinh;
  var some63 = _g792["some?"];
  var sort = _g792.sort;
  var space = _g792.space;
  var splice = _g792.splice;
  var split = _g792.split;
  var sqrt = _g792.sqrt;
  var stash = _g792.stash;
  var string = _g792.string;
  var string_literal63 = _g792["string-literal?"];
  var string63 = _g792["string?"];
  var sub = _g792.sub;
  var substring = _g792.substring;
  var table63 = _g792["table?"];
  var tan = _g792.tan;
  var tanh = _g792.tanh;
  var tl = _g792.tl;
  var today = _g792.today;
  var toplevel63 = _g792["toplevel?"];
  var unstash = _g792.unstash;
  var write = _g792.write;
  var write_file = _g792["write-file"];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var _37 = _g2["%"];
  var _37message_handler = _g2["%message-handler"];
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var _ = _g2["-"];
  var _47 = _g2["/"];
  var _60 = _g2["<"];
  var _6061 = _g2["<="];
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var _6261 = _g2[">="];
  var abs = _g2.abs;
  var acos = _g2.acos;
  var add = _g2.add;
  var apply = _g2.apply;
  var asin = _g2.asin;
  var atan = _g2.atan;
  var atan2 = _g2.atan2;
  var atom63 = _g2["atom?"];
  var boolean63 = _g2["boolean?"];
  var cat = _g2.cat;
  var ceil = _g2.ceil;
  var char = _g2.char;
  var code = _g2.code;
  var composite63 = _g2["composite?"];
  var cos = _g2.cos;
  var drop = _g2.drop;
  var empty63 = _g2["empty?"];
  var exclude = _g2.exclude;
  var exit = _g2.exit;
  var extend = _g2.extend;
  var find = _g2.find;
  var flat = _g2.flat;
  var flat1 = _g2.flat1;
  var floor = _g2.floor;
  var function63 = _g2["function?"];
  var hd = _g2.hd;
  var id_literal63 = _g2["id-literal?"];
  var in63 = _g2["in?"];
  var inner = _g2.inner;
  var is63 = _g2["is?"];
  var iterate = _g2.iterate;
  var join = _g2.join;
  var keep = _g2.keep;
  var keys63 = _g2["keys?"];
  var last = _g2.last;
  var length = _g2.length;
  var list63 = _g2["list?"];
  var log = _g2.log;
  var log10 = _g2.log10;
  var make_id = _g2["make-id"];
  var map = _g2.map;
  var max = _g2.max;
  var min = _g2.min;
  var module = _g2.module;
  var module_key = _g2["module-key"];
  var nil63 = _g2["nil?"];
  var none63 = _g2["none?"];
  var now = _g2.now;
  var number = _g2.number;
  var number63 = _g2["number?"];
  var one63 = _g2["one?"];
  var pair = _g2.pair;
  var pow = _g2.pow;
  var random = _g2.random;
  var read_file = _g2["read-file"];
  var reduce = _g2.reduce;
  var replicate = _g2.replicate;
  var reverse = _g2.reverse;
  var sd = _g2.sd;
  var search = _g2.search;
  var setenv = _g2.setenv;
  var sin = _g2.sin;
  var sinh = _g2.sinh;
  var some63 = _g2["some?"];
  var sort = _g2.sort;
  var space = _g2.space;
  var splice = _g2.splice;
  var split = _g2.split;
  var sqrt = _g2.sqrt;
  var stash = _g2.stash;
  var string = _g2.string;
  var string_literal63 = _g2["string-literal?"];
  var string63 = _g2["string?"];
  var sub = _g2.sub;
  var substring = _g2.substring;
  var table63 = _g2["table?"];
  var tan = _g2.tan;
  var tanh = _g2.tanh;
  var td = _g2.td;
  var tl = _g2.tl;
  var today = _g2.today;
  var toplevel63 = _g2["toplevel?"];
  var unstash = _g2.unstash;
  var write = _g2.write;
  var write_file = _g2["write-file"];
  var _g5 = nexus["lumen/reader"];
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var read_table = _g5["read-table"];
  var _g6 = nexus["lumen/compiler"];
  var compile = _g6.compile;
  var compile_function = _g6["compile-function"];
  var compile_module = _g6["compile-module"];
  var declare = _g6.declare;
  var eval = _g6.eval;
  var import_modules = _g6["import-modules"];
  var in_module = _g6["in-module"];
  var load_module = _g6["load-module"];
  var open_module = _g6["open-module"];
  var rep = function (str) {
    var _g795 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g797) {
        return([false, _g797.message]);
      }
    })();
    var _g1 = _g795[0];
    var x = _g795[1];
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
    var _g796 = args;
    var i = 0;
    while (i < length(_g796)) {
      var arg = _g796[i];
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
