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
        if (nil63(number(k))) {
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
            if (nil63(number(k))) {
              var v = _g25[k];
              l[k] = v;
            }
          }
          var _g26 = l2;
          var k = undefined;
          for (k in _g26) {
            if (nil63(number(k))) {
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
      if (nil63(number(k))) {
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
    var _g38 = t;
    var k = undefined;
    for (k in _g38) {
      if (nil63(number(k))) {
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
        if (nil63(number(k))) {
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
          if (nil63(number(k))) {
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
      if (nil63(number(k))) {
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
            var _g50 = x;
            var k = undefined;
            for (k in _g50) {
              if (nil63(number(k))) {
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
        if (nil63(number(k1))) {
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
  var now = _g60.now;
  var number = _g60.number;
  var number63 = _g60["number?"];
  var one63 = _g60["one?"];
  var pair = _g60.pair;
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
  var space = _g60.space;
  var splice = _g60.splice;
  var split = _g60.split;
  var sqrt = _g60.sqrt;
  var stash = _g60.stash;
  var string = _g60.string;
  var string_literal63 = _g60["string-literal?"];
  var string63 = _g60["string?"];
  var sub = _g60.sub;
  var substring = _g60.substring;
  var table63 = _g60["table?"];
  var tan = _g60.tan;
  var tanh = _g60.tanh;
  var tl = _g60.tl;
  var today = _g60.today;
  var toplevel63 = _g60["toplevel?"];
  var unstash = _g60.unstash;
  var write = _g60.write;
  var write_file = _g60["write-file"];
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
          if (nil63(number(x))) {
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
        if (nil63(number(k))) {
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
          if (nil63(number(k))) {
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
      if (nil63(number(k))) {
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
      var _g99;
      if (c === "-") {
        _g99 = "_";
      } else {
        var _g100;
        if (i === 0 && numeric63(n)) {
          _g100 = "_" + n;
        } else {
          var _g101;
          if (valid_char63(n)) {
            _g101 = c;
          } else {
            var _g102;
            if (i === 0) {
              _g102 = "_" + n;
            } else {
              _g102 = n;
            }
            _g101 = _g102;
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
  var sortk = function (l, k) {
    return(sort(l, function (a, b) {
      return(k(a) < k(b));
    }));
  };
  nexus["lumen/lib"].sortk = sortk;
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
        if (nil63(number(n))) {
          var b = _g92[n];
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
    var _g93 = t;
    var k = undefined;
    for (k in _g93) {
      if (nil63(number(k))) {
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
    _g94.alias = quoted(m.alias);
    _g94.export = quote_frame(m.export);
    _g94.import = quoted(m.import);
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
  var _g103 = nexus["lumen/runtime"];
  var _37 = _g103["%"];
  var _37message_handler = _g103["%message-handler"];
  var _42 = _g103["*"];
  var _43 = _g103["+"];
  var _ = _g103["-"];
  var _47 = _g103["/"];
  var _60 = _g103["<"];
  var _6061 = _g103["<="];
  var _61 = _g103["="];
  var _62 = _g103[">"];
  var _6261 = _g103[">="];
  var abs = _g103.abs;
  var acos = _g103.acos;
  var add = _g103.add;
  var apply = _g103.apply;
  var asin = _g103.asin;
  var atan = _g103.atan;
  var atan2 = _g103.atan2;
  var atom63 = _g103["atom?"];
  var boolean63 = _g103["boolean?"];
  var cat = _g103.cat;
  var ceil = _g103.ceil;
  var char = _g103.char;
  var code = _g103.code;
  var composite63 = _g103["composite?"];
  var cos = _g103.cos;
  var drop = _g103.drop;
  var empty63 = _g103["empty?"];
  var exclude = _g103.exclude;
  var exit = _g103.exit;
  var extend = _g103.extend;
  var find = _g103.find;
  var flat = _g103.flat;
  var flat1 = _g103.flat1;
  var floor = _g103.floor;
  var function63 = _g103["function?"];
  var hd = _g103.hd;
  var id_literal63 = _g103["id-literal?"];
  var in63 = _g103["in?"];
  var inner = _g103.inner;
  var is63 = _g103["is?"];
  var iterate = _g103.iterate;
  var join = _g103.join;
  var keep = _g103.keep;
  var keys63 = _g103["keys?"];
  var last = _g103.last;
  var length = _g103.length;
  var list63 = _g103["list?"];
  var log = _g103.log;
  var log10 = _g103.log10;
  var make_id = _g103["make-id"];
  var map = _g103.map;
  var max = _g103.max;
  var min = _g103.min;
  var module = _g103.module;
  var module_key = _g103["module-key"];
  var nil63 = _g103["nil?"];
  var none63 = _g103["none?"];
  var now = _g103.now;
  var number = _g103.number;
  var number63 = _g103["number?"];
  var one63 = _g103["one?"];
  var pair = _g103.pair;
  var pow = _g103.pow;
  var random = _g103.random;
  var read_file = _g103["read-file"];
  var reduce = _g103.reduce;
  var replicate = _g103.replicate;
  var reverse = _g103.reverse;
  var sd = _g103.sd;
  var search = _g103.search;
  var setenv = _g103.setenv;
  var sin = _g103.sin;
  var sinh = _g103.sinh;
  var some63 = _g103["some?"];
  var sort = _g103.sort;
  var space = _g103.space;
  var splice = _g103.splice;
  var split = _g103.split;
  var sqrt = _g103.sqrt;
  var stash = _g103.stash;
  var string = _g103.string;
  var string_literal63 = _g103["string-literal?"];
  var string63 = _g103["string?"];
  var sub = _g103.sub;
  var substring = _g103.substring;
  var table63 = _g103["table?"];
  var tan = _g103.tan;
  var tanh = _g103.tanh;
  var tl = _g103.tl;
  var today = _g103.today;
  var toplevel63 = _g103["toplevel?"];
  var unstash = _g103.unstash;
  var write = _g103.write;
  var write_file = _g103["write-file"];
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
  var _g114 = nexus["lumen/runtime"];
  var _37 = _g114["%"];
  var _37message_handler = _g114["%message-handler"];
  var _42 = _g114["*"];
  var _43 = _g114["+"];
  var _ = _g114["-"];
  var _47 = _g114["/"];
  var _60 = _g114["<"];
  var _6061 = _g114["<="];
  var _61 = _g114["="];
  var _62 = _g114[">"];
  var _6261 = _g114[">="];
  var abs = _g114.abs;
  var acos = _g114.acos;
  var add = _g114.add;
  var apply = _g114.apply;
  var asin = _g114.asin;
  var atan = _g114.atan;
  var atan2 = _g114.atan2;
  var atom63 = _g114["atom?"];
  var boolean63 = _g114["boolean?"];
  var cat = _g114.cat;
  var ceil = _g114.ceil;
  var char = _g114.char;
  var code = _g114.code;
  var composite63 = _g114["composite?"];
  var cos = _g114.cos;
  var drop = _g114.drop;
  var empty63 = _g114["empty?"];
  var exclude = _g114.exclude;
  var exit = _g114.exit;
  var extend = _g114.extend;
  var find = _g114.find;
  var flat = _g114.flat;
  var flat1 = _g114.flat1;
  var floor = _g114.floor;
  var function63 = _g114["function?"];
  var hd = _g114.hd;
  var id_literal63 = _g114["id-literal?"];
  var in63 = _g114["in?"];
  var inner = _g114.inner;
  var is63 = _g114["is?"];
  var iterate = _g114.iterate;
  var join = _g114.join;
  var keep = _g114.keep;
  var keys63 = _g114["keys?"];
  var last = _g114.last;
  var length = _g114.length;
  var list63 = _g114["list?"];
  var log = _g114.log;
  var log10 = _g114.log10;
  var make_id = _g114["make-id"];
  var map = _g114.map;
  var max = _g114.max;
  var min = _g114.min;
  var module = _g114.module;
  var module_key = _g114["module-key"];
  var nil63 = _g114["nil?"];
  var none63 = _g114["none?"];
  var now = _g114.now;
  var number = _g114.number;
  var number63 = _g114["number?"];
  var one63 = _g114["one?"];
  var pair = _g114.pair;
  var pow = _g114.pow;
  var random = _g114.random;
  var read_file = _g114["read-file"];
  var reduce = _g114.reduce;
  var replicate = _g114.replicate;
  var reverse = _g114.reverse;
  var sd = _g114.sd;
  var search = _g114.search;
  var setenv = _g114.setenv;
  var sin = _g114.sin;
  var sinh = _g114.sinh;
  var some63 = _g114["some?"];
  var sort = _g114.sort;
  var space = _g114.space;
  var splice = _g114.splice;
  var split = _g114.split;
  var sqrt = _g114.sqrt;
  var stash = _g114.stash;
  var string = _g114.string;
  var string_literal63 = _g114["string-literal?"];
  var string63 = _g114["string?"];
  var sub = _g114.sub;
  var substring = _g114.substring;
  var table63 = _g114["table?"];
  var tan = _g114.tan;
  var tanh = _g114.tanh;
  var tl = _g114.tl;
  var today = _g114.today;
  var toplevel63 = _g114["toplevel?"];
  var unstash = _g114.unstash;
  var write = _g114.write;
  var write_file = _g114["write-file"];
  var _g117 = nexus["lumen/lib"];
  var bind = _g117.bind;
  var bind42 = _g117["bind*"];
  var bound63 = _g117["bound?"];
  var getenv = _g117.getenv;
  var id = _g117.id;
  var imported = _g117.imported;
  var indentation = _g117.indentation;
  var initial_environment = _g117["initial-environment"];
  var key = _g117.key;
  var linked = _g117.linked;
  var macro_function = _g117["macro-function"];
  var macro63 = _g117["macro?"];
  var macroexpand = _g117.macroexpand;
  var mapo = _g117.mapo;
  var quasiexpand = _g117.quasiexpand;
  var quote_environment = _g117["quote-environment"];
  var quote_modules = _g117["quote-modules"];
  var quoted = _g117.quoted;
  var reserved63 = _g117["reserved?"];
  var sortk = _g117.sortk;
  var special_form63 = _g117["special-form?"];
  var special63 = _g117["special?"];
  var stash42 = _g117["stash*"];
  var statement63 = _g117["statement?"];
  var symbol_expansion = _g117["symbol-expansion"];
  var symbol63 = _g117["symbol?"];
  var valid_id63 = _g117["valid-id?"];
  var variable63 = _g117["variable?"];
  var _g118 = nexus["lumen/reader"];
  var make_stream = _g118["make-stream"];
  var read = _g118.read;
  var read_all = _g118["read-all"];
  var read_from_string = _g118["read-from-string"];
  var read_table = _g118["read-table"];
  var _g122 = [];
  _g122.js = "!";
  _g122.lua = "not ";
  var _g120 = [];
  var _g123 = [];
  _g123.js = "!";
  _g123.lua = "not ";
  _g120["not"] = _g123;
  var _g125 = [];
  _g125["%"] = true;
  _g125["*"] = true;
  _g125["/"] = true;
  var _g127 = [];
  _g127["+"] = true;
  _g127["-"] = true;
  var _g131 = [];
  _g131.js = "+";
  _g131.lua = "..";
  var _g129 = [];
  var _g132 = [];
  _g132.js = "+";
  _g132.lua = "..";
  _g129.cat = _g132;
  var _g134 = [];
  _g134["<"] = true;
  _g134["<="] = true;
  _g134[">"] = true;
  _g134[">="] = true;
  var _g138 = [];
  _g138.js = "===";
  _g138.lua = "==";
  var _g140 = [];
  _g140.js = "!=";
  _g140.lua = "~=";
  var _g136 = [];
  var _g141 = [];
  _g141.js = "===";
  _g141.lua = "==";
  _g136["="] = _g141;
  var _g142 = [];
  _g142.js = "!=";
  _g142.lua = "~=";
  _g136["~="] = _g142;
  var _g146 = [];
  _g146.js = "&&";
  _g146.lua = "and";
  var _g144 = [];
  var _g147 = [];
  _g147.js = "&&";
  _g147.lua = "and";
  _g144["and"] = _g147;
  var _g151 = [];
  _g151.js = "||";
  _g151.lua = "or";
  var _g149 = [];
  var _g152 = [];
  _g152.js = "||";
  _g152.lua = "or";
  _g149["or"] = _g152;
  var infix = [_g120, _g125, _g127, _g129, _g134, _g136, _g144, _g149];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g153 = infix;
      var i = 0;
      while (i < length(_g153)) {
        var level = _g153[i];
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
    var _g154 = args;
    var i = 0;
    while (i < length(_g154)) {
      var arg = _g154[i];
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
    var _g155 = getenv(x);
    var special = _g155.special;
    var stmt = _g155.stmt;
    var self_tr63 = _g155.tr;
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
    var _g156 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g156.right;
    var _g183;
    if (right) {
      _g183 = _6261;
    } else {
      _g183 = _62;
    }
    if (_g183(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g157 = sub(form, 1);
    var a = _g157[0];
    var b = _g157[1];
    var _g158 = op_delims(form, a);
    var ao = _g158[0];
    var ac = _g158[1];
    var _g159 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g159[0];
    var bc = _g159[1];
    var _g160 = compile(a);
    var _g161 = compile(b);
    var _g162 = getop(op);
    if (unary63(form)) {
      return(_g162 + ao + _g160 + ac);
    } else {
      return(ao + _g160 + ac + " " + _g162 + " " + bo + _g161 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g163 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g163.name;
    var prefix = _g163.prefix;
    var _g184;
    if (name) {
      _g184 = compile(name);
    } else {
      _g184 = "";
    }
    var id = _g184;
    var _g164 = prefix || "";
    var _g165 = compile_args(args);
    indent_level = indent_level + 1;
    var _g167 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g166 = _g167;
    var ind = indentation();
    var _g185;
    if (target === "js") {
      _g185 = "";
    } else {
      _g185 = "end";
    }
    var tr = _g185;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g165 + " {\n" + _g166 + ind + "}" + tr);
    } else {
      return(_g164 + "function " + id + _g165 + "\n" + _g166 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
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
        var _g186;
        if (stmt) {
          _g186 = indentation();
        } else {
          _g186 = "";
        }
        var ind = _g186;
        var _g187;
        if (atom63(form)) {
          _g187 = compile_atom(form);
        } else {
          var _g188;
          if (infix63(hd(form))) {
            _g188 = compile_infix(form);
          } else {
            _g188 = compile_call(form);
          }
          _g187 = _g188;
        }
        var _g169 = _g187;
        return(ind + _g169 + tr);
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
    var _g170 = sub(args, 0, length(args) - 1);
    var _g171 = 0;
    while (_g171 < length(_g170)) {
      var x = _g170[_g171];
      add(hoist, lower(x, hoist, stmt63));
      _g171 = _g171 + 1;
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
    var _g172 = args[1];
    var _g173 = args[2];
    if (stmt63 || tail63) {
      var _g190;
      if (_g173) {
        _g190 = [lower_body([_g173], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g172], tail63)], _g190)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g189;
      if (_g173) {
        _g189 = [lower(["set", e, _g173])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g172])], _g189));
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
    var _g174 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g174, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g175 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g175)) {
      return(_g175);
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
    var _g176 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g176.all;
    var m = module(spec);
    var frame = last(environment);
    var _g177 = m.export;
    var k = undefined;
    for (k in _g177) {
      if (nil63(number(k))) {
        var v = _g177[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g178 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g178.all;
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
    var _g179 = specs || [];
    var _g180 = 0;
    while (_g180 < length(_g179)) {
      var spec = _g179[_g180];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g181 = import_modules(m.alias);
        var aliased = _g181[0];
        var bs = _g181[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g182 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g182);
      }
      _g180 = _g180 + 1;
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
  var _g192 = nexus["lumen/runtime"];
  var _37 = _g192["%"];
  var _37message_handler = _g192["%message-handler"];
  var _42 = _g192["*"];
  var _43 = _g192["+"];
  var _ = _g192["-"];
  var _47 = _g192["/"];
  var _60 = _g192["<"];
  var _6061 = _g192["<="];
  var _61 = _g192["="];
  var _62 = _g192[">"];
  var _6261 = _g192[">="];
  var abs = _g192.abs;
  var acos = _g192.acos;
  var add = _g192.add;
  var apply = _g192.apply;
  var asin = _g192.asin;
  var atan = _g192.atan;
  var atan2 = _g192.atan2;
  var atom63 = _g192["atom?"];
  var boolean63 = _g192["boolean?"];
  var cat = _g192.cat;
  var ceil = _g192.ceil;
  var char = _g192.char;
  var code = _g192.code;
  var composite63 = _g192["composite?"];
  var cos = _g192.cos;
  var drop = _g192.drop;
  var empty63 = _g192["empty?"];
  var exclude = _g192.exclude;
  var exit = _g192.exit;
  var extend = _g192.extend;
  var find = _g192.find;
  var flat = _g192.flat;
  var flat1 = _g192.flat1;
  var floor = _g192.floor;
  var function63 = _g192["function?"];
  var hd = _g192.hd;
  var id_literal63 = _g192["id-literal?"];
  var in63 = _g192["in?"];
  var inner = _g192.inner;
  var is63 = _g192["is?"];
  var iterate = _g192.iterate;
  var join = _g192.join;
  var keep = _g192.keep;
  var keys63 = _g192["keys?"];
  var last = _g192.last;
  var length = _g192.length;
  var list63 = _g192["list?"];
  var log = _g192.log;
  var log10 = _g192.log10;
  var make_id = _g192["make-id"];
  var map = _g192.map;
  var max = _g192.max;
  var min = _g192.min;
  var module = _g192.module;
  var module_key = _g192["module-key"];
  var nil63 = _g192["nil?"];
  var none63 = _g192["none?"];
  var now = _g192.now;
  var number = _g192.number;
  var number63 = _g192["number?"];
  var one63 = _g192["one?"];
  var pair = _g192.pair;
  var pow = _g192.pow;
  var random = _g192.random;
  var read_file = _g192["read-file"];
  var reduce = _g192.reduce;
  var replicate = _g192.replicate;
  var reverse = _g192.reverse;
  var sd = _g192.sd;
  var search = _g192.search;
  var setenv = _g192.setenv;
  var sin = _g192.sin;
  var sinh = _g192.sinh;
  var some63 = _g192["some?"];
  var sort = _g192.sort;
  var space = _g192.space;
  var splice = _g192.splice;
  var split = _g192.split;
  var sqrt = _g192.sqrt;
  var stash = _g192.stash;
  var string = _g192.string;
  var string_literal63 = _g192["string-literal?"];
  var string63 = _g192["string?"];
  var sub = _g192.sub;
  var substring = _g192.substring;
  var table63 = _g192["table?"];
  var tan = _g192.tan;
  var tanh = _g192.tanh;
  var tl = _g192.tl;
  var today = _g192.today;
  var toplevel63 = _g192["toplevel?"];
  var unstash = _g192.unstash;
  var write = _g192.write;
  var write_file = _g192["write-file"];
  var _g195 = nexus["lumen/lib"];
  var bind = _g195.bind;
  var bind42 = _g195["bind*"];
  var bound63 = _g195["bound?"];
  var getenv = _g195.getenv;
  var id = _g195.id;
  var imported = _g195.imported;
  var indentation = _g195.indentation;
  var initial_environment = _g195["initial-environment"];
  var key = _g195.key;
  var linked = _g195.linked;
  var macro_function = _g195["macro-function"];
  var macro63 = _g195["macro?"];
  var macroexpand = _g195.macroexpand;
  var mapo = _g195.mapo;
  var quasiexpand = _g195.quasiexpand;
  var quote_environment = _g195["quote-environment"];
  var quote_modules = _g195["quote-modules"];
  var quoted = _g195.quoted;
  var reserved63 = _g195["reserved?"];
  var sortk = _g195.sortk;
  var special_form63 = _g195["special-form?"];
  var special63 = _g195["special?"];
  var stash42 = _g195["stash*"];
  var statement63 = _g195["statement?"];
  var symbol_expansion = _g195["symbol-expansion"];
  var symbol63 = _g195["symbol?"];
  var valid_id63 = _g195["valid-id?"];
  var variable63 = _g195["variable?"];
  var _g196 = nexus["lumen/compiler"];
  var compile = _g196.compile;
  var compile_function = _g196["compile-function"];
  var compile_module = _g196["compile-module"];
  var declare = _g196.declare;
  var eval = _g196.eval;
  var import_modules = _g196["import-modules"];
  var in_module = _g196["in-module"];
  var load_module = _g196["load-module"];
  var open_module = _g196["open-module"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g370 = nexus["lumen/runtime"];
  var _37 = _g370["%"];
  var _37message_handler = _g370["%message-handler"];
  var _42 = _g370["*"];
  var _43 = _g370["+"];
  var _ = _g370["-"];
  var _47 = _g370["/"];
  var _60 = _g370["<"];
  var _6061 = _g370["<="];
  var _61 = _g370["="];
  var _62 = _g370[">"];
  var _6261 = _g370[">="];
  var abs = _g370.abs;
  var acos = _g370.acos;
  var add = _g370.add;
  var apply = _g370.apply;
  var asin = _g370.asin;
  var atan = _g370.atan;
  var atan2 = _g370.atan2;
  var atom63 = _g370["atom?"];
  var boolean63 = _g370["boolean?"];
  var cat = _g370.cat;
  var ceil = _g370.ceil;
  var char = _g370.char;
  var code = _g370.code;
  var composite63 = _g370["composite?"];
  var cos = _g370.cos;
  var drop = _g370.drop;
  var empty63 = _g370["empty?"];
  var exclude = _g370.exclude;
  var exit = _g370.exit;
  var extend = _g370.extend;
  var find = _g370.find;
  var flat = _g370.flat;
  var flat1 = _g370.flat1;
  var floor = _g370.floor;
  var function63 = _g370["function?"];
  var hd = _g370.hd;
  var id_literal63 = _g370["id-literal?"];
  var in63 = _g370["in?"];
  var inner = _g370.inner;
  var is63 = _g370["is?"];
  var iterate = _g370.iterate;
  var join = _g370.join;
  var keep = _g370.keep;
  var keys63 = _g370["keys?"];
  var last = _g370.last;
  var length = _g370.length;
  var list63 = _g370["list?"];
  var log = _g370.log;
  var log10 = _g370.log10;
  var make_id = _g370["make-id"];
  var map = _g370.map;
  var max = _g370.max;
  var min = _g370.min;
  var module = _g370.module;
  var module_key = _g370["module-key"];
  var nil63 = _g370["nil?"];
  var none63 = _g370["none?"];
  var now = _g370.now;
  var number = _g370.number;
  var number63 = _g370["number?"];
  var one63 = _g370["one?"];
  var pair = _g370.pair;
  var pow = _g370.pow;
  var random = _g370.random;
  var read_file = _g370["read-file"];
  var reduce = _g370.reduce;
  var replicate = _g370.replicate;
  var reverse = _g370.reverse;
  var sd = _g370.sd;
  var search = _g370.search;
  var setenv = _g370.setenv;
  var sin = _g370.sin;
  var sinh = _g370.sinh;
  var some63 = _g370["some?"];
  var sort = _g370.sort;
  var space = _g370.space;
  var splice = _g370.splice;
  var split = _g370.split;
  var sqrt = _g370.sqrt;
  var stash = _g370.stash;
  var string = _g370.string;
  var string_literal63 = _g370["string-literal?"];
  var string63 = _g370["string?"];
  var sub = _g370.sub;
  var substring = _g370.substring;
  var table63 = _g370["table?"];
  var tan = _g370.tan;
  var tanh = _g370.tanh;
  var tl = _g370.tl;
  var today = _g370.today;
  var toplevel63 = _g370["toplevel?"];
  var unstash = _g370.unstash;
  var write = _g370.write;
  var write_file = _g370["write-file"];
  var _g373 = nexus["lumen/lib"];
  var bind = _g373.bind;
  var bind42 = _g373["bind*"];
  var bound63 = _g373["bound?"];
  var getenv = _g373.getenv;
  var id = _g373.id;
  var imported = _g373.imported;
  var indentation = _g373.indentation;
  var initial_environment = _g373["initial-environment"];
  var key = _g373.key;
  var linked = _g373.linked;
  var macro_function = _g373["macro-function"];
  var macro63 = _g373["macro?"];
  var macroexpand = _g373.macroexpand;
  var mapo = _g373.mapo;
  var quasiexpand = _g373.quasiexpand;
  var quote_environment = _g373["quote-environment"];
  var quote_modules = _g373["quote-modules"];
  var quoted = _g373.quoted;
  var reserved63 = _g373["reserved?"];
  var sortk = _g373.sortk;
  var special_form63 = _g373["special-form?"];
  var special63 = _g373["special?"];
  var stash42 = _g373["stash*"];
  var statement63 = _g373["statement?"];
  var symbol_expansion = _g373["symbol-expansion"];
  var symbol63 = _g373["symbol?"];
  var valid_id63 = _g373["valid-id?"];
  var variable63 = _g373["variable?"];
  var _g374 = nexus["lumen/compiler"];
  var compile = _g374.compile;
  var compile_function = _g374["compile-function"];
  var compile_module = _g374["compile-module"];
  var declare = _g374.declare;
  var eval = _g374.eval;
  var import_modules = _g374["import-modules"];
  var in_module = _g374["in-module"];
  var load_module = _g374["load-module"];
  var open_module = _g374["open-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g672 = nexus["lumen/runtime"];
  var _37 = _g672["%"];
  var _37message_handler = _g672["%message-handler"];
  var _42 = _g672["*"];
  var _43 = _g672["+"];
  var _ = _g672["-"];
  var _47 = _g672["/"];
  var _60 = _g672["<"];
  var _6061 = _g672["<="];
  var _61 = _g672["="];
  var _62 = _g672[">"];
  var _6261 = _g672[">="];
  var abs = _g672.abs;
  var acos = _g672.acos;
  var add = _g672.add;
  var apply = _g672.apply;
  var asin = _g672.asin;
  var atan = _g672.atan;
  var atan2 = _g672.atan2;
  var atom63 = _g672["atom?"];
  var boolean63 = _g672["boolean?"];
  var cat = _g672.cat;
  var ceil = _g672.ceil;
  var char = _g672.char;
  var code = _g672.code;
  var composite63 = _g672["composite?"];
  var cos = _g672.cos;
  var drop = _g672.drop;
  var empty63 = _g672["empty?"];
  var exclude = _g672.exclude;
  var exit = _g672.exit;
  var extend = _g672.extend;
  var find = _g672.find;
  var flat = _g672.flat;
  var flat1 = _g672.flat1;
  var floor = _g672.floor;
  var function63 = _g672["function?"];
  var hd = _g672.hd;
  var id_literal63 = _g672["id-literal?"];
  var in63 = _g672["in?"];
  var inner = _g672.inner;
  var is63 = _g672["is?"];
  var iterate = _g672.iterate;
  var join = _g672.join;
  var keep = _g672.keep;
  var keys63 = _g672["keys?"];
  var last = _g672.last;
  var length = _g672.length;
  var list63 = _g672["list?"];
  var log = _g672.log;
  var log10 = _g672.log10;
  var make_id = _g672["make-id"];
  var map = _g672.map;
  var max = _g672.max;
  var min = _g672.min;
  var module = _g672.module;
  var module_key = _g672["module-key"];
  var nil63 = _g672["nil?"];
  var none63 = _g672["none?"];
  var now = _g672.now;
  var number = _g672.number;
  var number63 = _g672["number?"];
  var one63 = _g672["one?"];
  var pair = _g672.pair;
  var pow = _g672.pow;
  var random = _g672.random;
  var read_file = _g672["read-file"];
  var reduce = _g672.reduce;
  var replicate = _g672.replicate;
  var reverse = _g672.reverse;
  var sd = _g672.sd;
  var search = _g672.search;
  var setenv = _g672.setenv;
  var sin = _g672.sin;
  var sinh = _g672.sinh;
  var some63 = _g672["some?"];
  var sort = _g672.sort;
  var space = _g672.space;
  var splice = _g672.splice;
  var split = _g672.split;
  var sqrt = _g672.sqrt;
  var stash = _g672.stash;
  var string = _g672.string;
  var string_literal63 = _g672["string-literal?"];
  var string63 = _g672["string?"];
  var sub = _g672.sub;
  var substring = _g672.substring;
  var table63 = _g672["table?"];
  var tan = _g672.tan;
  var tanh = _g672.tanh;
  var tl = _g672.tl;
  var today = _g672.today;
  var toplevel63 = _g672["toplevel?"];
  var unstash = _g672.unstash;
  var write = _g672.write;
  var write_file = _g672["write-file"];
  var _g675 = nexus["lumen/lib"];
  var bind = _g675.bind;
  var bind42 = _g675["bind*"];
  var bound63 = _g675["bound?"];
  var getenv = _g675.getenv;
  var id = _g675.id;
  var imported = _g675.imported;
  var indentation = _g675.indentation;
  var initial_environment = _g675["initial-environment"];
  var key = _g675.key;
  var linked = _g675.linked;
  var macro_function = _g675["macro-function"];
  var macro63 = _g675["macro?"];
  var macroexpand = _g675.macroexpand;
  var mapo = _g675.mapo;
  var quasiexpand = _g675.quasiexpand;
  var quote_environment = _g675["quote-environment"];
  var quote_modules = _g675["quote-modules"];
  var quoted = _g675.quoted;
  var reserved63 = _g675["reserved?"];
  var sortk = _g675.sortk;
  var special_form63 = _g675["special-form?"];
  var special63 = _g675["special?"];
  var stash42 = _g675["stash*"];
  var statement63 = _g675["statement?"];
  var symbol_expansion = _g675["symbol-expansion"];
  var symbol63 = _g675["symbol?"];
  var valid_id63 = _g675["valid-id?"];
  var variable63 = _g675["variable?"];
  var _g676 = nexus["lumen/compiler"];
  var compile = _g676.compile;
  var compile_function = _g676["compile-function"];
  var compile_module = _g676["compile-module"];
  var declare = _g676.declare;
  var eval = _g676.eval;
  var import_modules = _g676["import-modules"];
  var in_module = _g676["in-module"];
  var load_module = _g676["load-module"];
  var open_module = _g676["open-module"];
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
    var _g729 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g729)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g708 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g708) && target === "js") {
      return(linked(name, ["%local", name, join(["fn", x], _g708)]));
    } else {
      if (some63(_g708)) {
        var _g709 = bind42(x, _g708);
        var args = _g709[0];
        var _g710 = _g709[1];
        return(linked(name, join(["%local-function", name, args], _g710)));
      } else {
        return(linked(name, ["%local", name, x]));
      }
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g705 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g705)) {
      var _g706 = bind42(x, _g705);
      var args = _g706[0];
      var _g707 = _g706[1];
      return(join(["%global-function", name, args], _g707));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g701 = sub(body, 0);
    var form = join(["fn", args], _g701);
    var _g702 = ["setenv", ["quote", name]];
    _g702.form = ["quote", form];
    _g702.macro = form;
    eval(_g702);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g697 = sub(body, 0);
    var alias = _g697.alias;
    var exp = _g697.export;
    var imp = _g697.import;
    var _g698 = import_modules(imp);
    var imports = _g698[0];
    var bindings = _g698[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g699 = exp || [];
    var _g700 = 0;
    while (_g700 < length(_g699)) {
      var x = _g699[_g700];
      setenv(x, {_stash: true, export: true});
      _g700 = _g700 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g703 = sub(body, 0);
    var form = join(["fn", args], _g703);
    var keys = sub(_g703, length(_g703));
    var _g704 = ["setenv", ["quote", name]];
    _g704.form = ["quote", form];
    _g704.special = form;
    eval(join(_g704, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g724 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g758;
    if (nil63(v)) {
      var _g759;
      if (b.i) {
        _g759 = "i";
      } else {
        _g759 = make_id();
      }
      var i = _g759;
      _g758 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g724), ["inc", i]]];
    } else {
      var _g725 = ["target"];
      _g725.js = ["nil?", ["number", k]];
      _g725.lua = ["not", ["number?", k]];
      _g758 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g725, join(["let", [v, ["get", t1, k]]], _g724)]]];
    }
    return(["let", [t1, t], _g758]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g720 = sub(body, 0);
    var _g721 = bind42(args, _g720);
    var _g722 = _g721[0];
    var _g723 = _g721[1];
    return(join(["%function", _g722], _g723));
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
    var step = function (_g690) {
      var a = _g690[0];
      var b = _g690[1];
      var c = sub(_g690, 2);
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
    var _g728 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g728)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g693 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g693));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g694 = bind(lh, rh);
      var _g695 = 0;
      while (_g695 < length(_g694)) {
        var _g696 = _g694[_g695];
        var id = _g696[0];
        var val = _g696[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g695 = _g695 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g693)]])));
    }
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g715 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g716 = join(["do"], macroexpand(_g715));
    drop(environment);
    return(_g716);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g717 = sub(body, 0);
    add(environment, {});
    map(function (_g719) {
      var name = _g719[0];
      var exp = _g719[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g718 = join(["do"], macroexpand(_g717));
    drop(environment);
    return(_g718);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g689 = body;
      var k = undefined;
      for (k in _g689) {
        if (nil63(number(k))) {
          var v = _g689[k];
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
    var _g726 = xs;
    var _g727 = 0;
    while (_g727 < length(_g726)) {
      var x = _g726[_g727];
      l[x] = true;
      _g727 = _g727 + 1;
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
    var _g692 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g692)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g691 = sub(body, 0);
    return(["if", cond, join(["do"], _g691)]);
  }}, "with-bindings": {export: true, macro: function (_g711) {
    var names = _g711[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g712 = sub(body, 0);
    var x = make_id();
    var _g714 = ["setenv", x];
    _g714.variable = true;
    var _g713 = ["with-frame", ["each", [x], names, _g714]];
    _g713.scope = true;
    return(join(_g713, _g712));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g730 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g731 = ["table"];
    _g731._scope = scope;
    return(["do", ["add", "environment", _g731], ["let", [x, join(["do"], _g730)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/lib": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, key: {export: true, variable: true}, linked: {export: true, variable: true}, literal: {variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g732) {
    var char = _g732[0];
    var stream = _g732[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g733 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g733)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, "max*": {variable: true}, min: {export: true, variable: true}, "min*": {variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, "one?": {export: true, variable: true}, pair: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, space: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, subl: {variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {}, tl: {export: true, variable: true}, today: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g766;
    if (target === "lua") {
      _g766 = "{";
    } else {
      _g766 = "[";
    }
    var open = _g766;
    var _g767;
    if (target === "lua") {
      _g767 = "}";
    } else {
      _g767 = "]";
    }
    var close = _g767;
    var str = "";
    var _g751 = forms;
    var i = 0;
    while (i < length(_g751)) {
      var x = _g751[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g743 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g744 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g744;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g743 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g743 + ") {\n" + body + ind + "}\n");
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
    var _g736 = compile(cond);
    indent_level = indent_level + 1;
    var _g738 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g737 = _g738;
    var _g760;
    if (alt) {
      indent_level = indent_level + 1;
      var _g740 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g760 = _g740;
    }
    var _g739 = _g760;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g736 + ") {\n" + _g737 + ind + "}";
    } else {
      str = str + ind + "if " + _g736 + " then\n" + _g737;
    }
    if (_g739 && target === "js") {
      str = str + " else {\n" + _g739 + ind + "}";
    } else {
      if (_g739) {
        str = str + ind + "else\n" + _g739;
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
    var _g763;
    if (is63(value)) {
      _g763 = " = " + value1;
    } else {
      _g763 = "";
    }
    var rh = _g763;
    var _g764;
    if (target === "js") {
      _g764 = "var ";
    } else {
      _g764 = "local ";
    }
    var keyword = _g764;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g768;
    if (target === "lua") {
      _g768 = " = ";
    } else {
      _g768 = ": ";
    }
    var sep = _g768;
    var pairs = sortk(pair(forms), hd);
    var _g752 = pairs;
    var i = 0;
    while (i < length(_g752)) {
      var _g753 = _g752[i];
      var k = _g753[0];
      var v = _g753[1];
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
    var _g745 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g745;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g746 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g746;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g734 = forms;
    var _g735 = 0;
    while (_g735 < length(_g734)) {
      var x = _g734[_g735];
      str = str + compile(x, {_stash: true, stmt: true});
      _g735 = _g735 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g762;
    if (target === "js") {
      _g762 = "throw new " + compile(["Error", x]);
    } else {
      _g762 = "error(" + compile(x) + ")";
    }
    var e = _g762;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g750 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g750, 0) === "{") {
      _g750 = "(" + _g750 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g750 + "." + inner(k));
    } else {
      return(_g750 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g761;
    if (nil63(x)) {
      _g761 = "return";
    } else {
      _g761 = "return(" + compile(x) + ")";
    }
    var _g747 = _g761;
    return(indentation() + _g747);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g748 = compile(lh);
    var _g765;
    if (nil63(rh)) {
      _g765 = "nil";
    } else {
      _g765 = rh;
    }
    var _g749 = compile(_g765);
    return(indentation() + _g748 + " = " + _g749);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g741 = compile(cond);
    indent_level = indent_level + 1;
    var _g742 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g742;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g741 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g741 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g754 = sub(body, 0);
    var alias = _g754.alias;
    var exp = _g754.export;
    var imp = _g754.import;
    var _g755 = import_modules(imp);
    var imports = _g755[0];
    var bindings = _g755[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g756 = exp || [];
    var _g757 = 0;
    while (_g757 < length(_g756)) {
      var x = _g756[_g757];
      setenv(x, {_stash: true, export: true});
      _g757 = _g757 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g769 = nexus["lumen/runtime"];
  var _37 = _g769["%"];
  var _37message_handler = _g769["%message-handler"];
  var _42 = _g769["*"];
  var _43 = _g769["+"];
  var _ = _g769["-"];
  var _47 = _g769["/"];
  var _60 = _g769["<"];
  var _6061 = _g769["<="];
  var _61 = _g769["="];
  var _62 = _g769[">"];
  var _6261 = _g769[">="];
  var abs = _g769.abs;
  var acos = _g769.acos;
  var add = _g769.add;
  var apply = _g769.apply;
  var asin = _g769.asin;
  var atan = _g769.atan;
  var atan2 = _g769.atan2;
  var atom63 = _g769["atom?"];
  var boolean63 = _g769["boolean?"];
  var cat = _g769.cat;
  var ceil = _g769.ceil;
  var char = _g769.char;
  var code = _g769.code;
  var composite63 = _g769["composite?"];
  var cos = _g769.cos;
  var drop = _g769.drop;
  var empty63 = _g769["empty?"];
  var exclude = _g769.exclude;
  var exit = _g769.exit;
  var extend = _g769.extend;
  var find = _g769.find;
  var flat = _g769.flat;
  var flat1 = _g769.flat1;
  var floor = _g769.floor;
  var function63 = _g769["function?"];
  var hd = _g769.hd;
  var id_literal63 = _g769["id-literal?"];
  var in63 = _g769["in?"];
  var inner = _g769.inner;
  var is63 = _g769["is?"];
  var iterate = _g769.iterate;
  var join = _g769.join;
  var keep = _g769.keep;
  var keys63 = _g769["keys?"];
  var last = _g769.last;
  var length = _g769.length;
  var list63 = _g769["list?"];
  var log = _g769.log;
  var log10 = _g769.log10;
  var make_id = _g769["make-id"];
  var map = _g769.map;
  var max = _g769.max;
  var min = _g769.min;
  var module = _g769.module;
  var module_key = _g769["module-key"];
  var nil63 = _g769["nil?"];
  var none63 = _g769["none?"];
  var now = _g769.now;
  var number = _g769.number;
  var number63 = _g769["number?"];
  var one63 = _g769["one?"];
  var pair = _g769.pair;
  var pow = _g769.pow;
  var random = _g769.random;
  var read_file = _g769["read-file"];
  var reduce = _g769.reduce;
  var replicate = _g769.replicate;
  var reverse = _g769.reverse;
  var sd = _g769.sd;
  var search = _g769.search;
  var setenv = _g769.setenv;
  var sin = _g769.sin;
  var sinh = _g769.sinh;
  var some63 = _g769["some?"];
  var sort = _g769.sort;
  var space = _g769.space;
  var splice = _g769.splice;
  var split = _g769.split;
  var sqrt = _g769.sqrt;
  var stash = _g769.stash;
  var string = _g769.string;
  var string_literal63 = _g769["string-literal?"];
  var string63 = _g769["string?"];
  var sub = _g769.sub;
  var substring = _g769.substring;
  var table63 = _g769["table?"];
  var tan = _g769.tan;
  var tanh = _g769.tanh;
  var tl = _g769.tl;
  var today = _g769.today;
  var toplevel63 = _g769["toplevel?"];
  var unstash = _g769.unstash;
  var write = _g769.write;
  var write_file = _g769["write-file"];
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
    var _g772 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g774) {
        return([false, _g774.message]);
      }
    })();
    var _g1 = _g772[0];
    var x = _g772[1];
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
    var _g773 = args;
    var i = 0;
    while (i < length(_g773)) {
      var arg = _g773[i];
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
