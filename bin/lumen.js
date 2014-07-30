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
  var td = function (l) {
    return(l[2]);
  };
  nexus["lumen/runtime"].td = td;
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
        if (isNaN(parseInt(k))) {
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
            if (isNaN(parseInt(k))) {
              var v = _g27[k];
              l[k] = v;
            }
          }
          var _g28 = l2;
          var k = undefined;
          for (k in _g28) {
            if (isNaN(parseInt(k))) {
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
      if (isNaN(parseInt(k))) {
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
      if (isNaN(parseInt(k))) {
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
        if (isNaN(parseInt(k))) {
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
          if (isNaN(parseInt(k))) {
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
      if (isNaN(parseInt(k))) {
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
              if (isNaN(parseInt(k))) {
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
        if (isNaN(parseInt(k1))) {
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
  nexus["lumen/utilities"] = {};
  var _g61 = nexus["lumen/runtime"];
  var _37 = _g61["%"];
  var _37message_handler = _g61["%message-handler"];
  var _42 = _g61["*"];
  var _43 = _g61["+"];
  var _ = _g61["-"];
  var _47 = _g61["/"];
  var _60 = _g61["<"];
  var _6061 = _g61["<="];
  var _61 = _g61["="];
  var _62 = _g61[">"];
  var _6261 = _g61[">="];
  var abs = _g61.abs;
  var acos = _g61.acos;
  var add = _g61.add;
  var apply = _g61.apply;
  var asin = _g61.asin;
  var atan = _g61.atan;
  var atan2 = _g61.atan2;
  var atom63 = _g61["atom?"];
  var boolean63 = _g61["boolean?"];
  var cat = _g61.cat;
  var ceil = _g61.ceil;
  var char = _g61.char;
  var code = _g61.code;
  var composite63 = _g61["composite?"];
  var cos = _g61.cos;
  var drop = _g61.drop;
  var empty63 = _g61["empty?"];
  var exclude = _g61.exclude;
  var exit = _g61.exit;
  var extend = _g61.extend;
  var find = _g61.find;
  var flat = _g61.flat;
  var flat1 = _g61.flat1;
  var floor = _g61.floor;
  var function63 = _g61["function?"];
  var hd = _g61.hd;
  var id_literal63 = _g61["id-literal?"];
  var in63 = _g61["in?"];
  var inner = _g61.inner;
  var is63 = _g61["is?"];
  var iterate = _g61.iterate;
  var join = _g61.join;
  var keep = _g61.keep;
  var keys63 = _g61["keys?"];
  var last = _g61.last;
  var length = _g61.length;
  var list63 = _g61["list?"];
  var log = _g61.log;
  var log10 = _g61.log10;
  var make_id = _g61["make-id"];
  var map = _g61.map;
  var max = _g61.max;
  var min = _g61.min;
  var module = _g61.module;
  var module_key = _g61["module-key"];
  var nil63 = _g61["nil?"];
  var none63 = _g61["none?"];
  var now = _g61.now;
  var number = _g61.number;
  var number63 = _g61["number?"];
  var one63 = _g61["one?"];
  var pair = _g61.pair;
  var pow = _g61.pow;
  var random = _g61.random;
  var read_file = _g61["read-file"];
  var reduce = _g61.reduce;
  var replicate = _g61.replicate;
  var reverse = _g61.reverse;
  var sd = _g61.sd;
  var search = _g61.search;
  var setenv = _g61.setenv;
  var sin = _g61.sin;
  var sinh = _g61.sinh;
  var some63 = _g61["some?"];
  var sort = _g61.sort;
  var space = _g61.space;
  var splice = _g61.splice;
  var split = _g61.split;
  var sqrt = _g61.sqrt;
  var stash = _g61.stash;
  var string = _g61.string;
  var string_literal63 = _g61["string-literal?"];
  var string63 = _g61["string?"];
  var sub = _g61.sub;
  var substring = _g61.substring;
  var table63 = _g61["table?"];
  var tan = _g61.tan;
  var tanh = _g61.tanh;
  var td = _g61.td;
  var tl = _g61.tl;
  var today = _g61.today;
  var toplevel63 = _g61["toplevel?"];
  var unstash = _g61.unstash;
  var write = _g61.write;
  var write_file = _g61["write-file"];
  var getenv = function (k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g64 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g65 = undefined;
        var _g66 = _g64;
        var x = undefined;
        for (x in _g66) {
          if (isNaN(parseInt(x))) {
            var _g58 = _g66[x];
            _g65 = x;
          }
        }
        if (_g65) {
          return(b[_g65]);
        } else {
          return(b);
        }
      }
    }
  };
  nexus["lumen/utilities"].getenv = getenv;
  var macro_function = function (k) {
    return(getenv(k, {_stash: true, macro: true}));
  };
  nexus["lumen/utilities"]["macro-function"] = macro_function;
  var macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  nexus["lumen/utilities"]["macro?"] = macro63;
  var special63 = function (k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  };
  nexus["lumen/utilities"]["special?"] = special63;
  var special_form63 = function (form) {
    return(list63(form) && special63(hd(form)));
  };
  nexus["lumen/utilities"]["special-form?"] = special_form63;
  var statement63 = function (k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  };
  nexus["lumen/utilities"]["statement?"] = statement63;
  var symbol_expansion = function (k) {
    return(getenv(k, {_stash: true, symbol: true}));
  };
  nexus["lumen/utilities"]["symbol-expansion"] = symbol_expansion;
  var symbol63 = function (k) {
    return(is63(symbol_expansion(k)));
  };
  nexus["lumen/utilities"]["symbol?"] = symbol63;
  var variable63 = function (k) {
    var b = find(function (frame) {
      return(frame[k] || frame._scope);
    }, reverse(environment));
    return(table63(b) && is63(b.variable));
  };
  nexus["lumen/utilities"]["variable?"] = variable63;
  var global63 = function (k) {
    return(getenv(k, {_stash: true, global: true}));
  };
  nexus["lumen/utilities"]["global?"] = global63;
  var bound63 = function (x) {
    return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
  };
  nexus["lumen/utilities"]["bound?"] = bound63;
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
  nexus["lumen/utilities"].escape = escape;
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
  nexus["lumen/utilities"].quoted = quoted;
  var stash42 = function (args) {
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
  };
  nexus["lumen/utilities"]["stash*"] = stash42;
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
  };
  nexus["lumen/utilities"].bind = bind;
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
  };
  nexus["lumen/utilities"]["bind*"] = bind42;
  var quoting63 = function (depth) {
    return(number63(depth));
  };
  nexus["lumen/utilities"]["quoting?"] = quoting63;
  var quasiquoting63 = function (depth) {
    return(quoting63(depth) && depth > 0);
  };
  nexus["lumen/utilities"]["quasiquoting?"] = quasiquoting63;
  var can_unquote63 = function (depth) {
    return(quoting63(depth) && depth === 1);
  };
  nexus["lumen/utilities"]["can-unquote?"] = can_unquote63;
  var quasisplice63 = function (x, depth) {
    return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
  };
  nexus["lumen/utilities"]["quasisplice?"] = quasisplice63;
  var macroexpand = function (form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if (x === "%function") {
          var _g59 = form[0];
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
            var _g60 = form[0];
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
  };
  nexus["lumen/utilities"].macroexpand = macroexpand;
  var quasiexpand;
  nexus["lumen/utilities"].quasiexpand = quasiexpand;
  var quasiquote_list;
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list;
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
  var indentation = function () {
    return(apply(cat, replicate(indent_level, "  ")));
  };
  nexus["lumen/utilities"].indentation = indentation;
  var reserved = {"%": true, "*": true, "+": true, "-": true, "/": true, "<": true, "<=": true, "=": true, "==": true, ">": true, ">=": true, "and": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "elseif": true, "end": true, "false": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "local": true, "new": true, "nil": true, "not": true, "or": true, "repeat": true, "return": true, "switch": true, "then": true, "this": true, "throw": true, "true": true, "try": true, "typeof": true, "until": true, "var": true, "void": true, "while": true, "with": true};
  nexus["lumen/utilities"].reserved = reserved;
  var reserved63 = function (x) {
    return(reserved[x]);
  };
  nexus["lumen/utilities"]["reserved?"] = reserved63;
  var numeric63 = function (n) {
    return(n > 47 && n < 58);
  };
  nexus["lumen/utilities"]["numeric?"] = numeric63;
  var valid_char63 = function (n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
  };
  nexus["lumen/utilities"]["valid-char?"] = valid_char63;
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
            if (!valid_char63(n)) {
              return(false);
            }
            i = i + 1;
          }
          return(true);
        }
      }
    }
  };
  nexus["lumen/utilities"]["valid-id?"] = valid_id63;
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
  nexus["lumen/utilities"].id = id;
  var sortk = function (l, k) {
    return(sort(l, function (a, b) {
      return(k(a) < k(b));
    }));
  };
  nexus["lumen/utilities"].sortk = sortk;
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
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], sortk(imports, sd)));
    }
  };
  nexus["lumen/utilities"].imported = imported;
  var linked = function (name, form) {
    if (toplevel63()) {
      var k = module_key(current_module);
      return(["do", form, ["set", ["get", ["get", "nexus", ["quote", k]], ["quote", name]], name]]);
    } else {
      return(form);
    }
  };
  nexus["lumen/utilities"].linked = linked;
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
  nexus["lumen/utilities"]["quote-binding"] = quote_binding;
  var mapo = function (f, t) {
    var o = [];
    var _g93 = t;
    var k = undefined;
    for (k in _g93) {
      if (isNaN(parseInt(k))) {
        var v = _g93[k];
        var x = f(v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  };
  nexus["lumen/utilities"].mapo = mapo;
  var quote_frame = function (t) {
    return(join(["%object"], mapo(function (b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  };
  nexus["lumen/utilities"]["quote-frame"] = quote_frame;
  var quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  nexus["lumen/utilities"]["quote-environment"] = quote_environment;
  var quote_module = function (m) {
    var _g94 = ["table"];
    _g94.alias = quoted(m.alias);
    _g94.export = quote_frame(m.export);
    _g94.import = quoted(m.import);
    return(_g94);
  };
  nexus["lumen/utilities"]["quote-module"] = quote_module;
  var quote_modules = function () {
    return(join(["table"], map(quote_module, modules)));
  };
  nexus["lumen/utilities"]["quote-modules"] = quote_modules;
  var initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  nexus["lumen/utilities"]["initial-environment"] = initial_environment;
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
  var td = _g103.td;
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
  var td = _g114.td;
  var tl = _g114.tl;
  var today = _g114.today;
  var toplevel63 = _g114["toplevel?"];
  var unstash = _g114.unstash;
  var write = _g114.write;
  var write_file = _g114["write-file"];
  var _g117 = nexus["lumen/utilities"];
  var bind = _g117.bind;
  var bind42 = _g117["bind*"];
  var bound63 = _g117["bound?"];
  var getenv = _g117.getenv;
  var id = _g117.id;
  var imported = _g117.imported;
  var indentation = _g117.indentation;
  var initial_environment = _g117["initial-environment"];
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
      if (isNaN(parseInt(k))) {
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
  var td = _g192.td;
  var tl = _g192.tl;
  var today = _g192.today;
  var toplevel63 = _g192["toplevel?"];
  var unstash = _g192.unstash;
  var write = _g192.write;
  var write_file = _g192["write-file"];
  var _g195 = nexus["lumen/utilities"];
  var bind = _g195.bind;
  var bind42 = _g195["bind*"];
  var bound63 = _g195["bound?"];
  var getenv = _g195.getenv;
  var id = _g195.id;
  var imported = _g195.imported;
  var indentation = _g195.indentation;
  var initial_environment = _g195["initial-environment"];
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
  var now = _g376.now;
  var number = _g376.number;
  var number63 = _g376["number?"];
  var one63 = _g376["one?"];
  var pair = _g376.pair;
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
  var space = _g376.space;
  var splice = _g376.splice;
  var split = _g376.split;
  var sqrt = _g376.sqrt;
  var stash = _g376.stash;
  var string = _g376.string;
  var string_literal63 = _g376["string-literal?"];
  var string63 = _g376["string?"];
  var sub = _g376.sub;
  var substring = _g376.substring;
  var table63 = _g376["table?"];
  var tan = _g376.tan;
  var tanh = _g376.tanh;
  var td = _g376.td;
  var tl = _g376.tl;
  var today = _g376.today;
  var toplevel63 = _g376["toplevel?"];
  var unstash = _g376.unstash;
  var write = _g376.write;
  var write_file = _g376["write-file"];
  var _g379 = nexus["lumen/utilities"];
  var bind = _g379.bind;
  var bind42 = _g379["bind*"];
  var bound63 = _g379["bound?"];
  var getenv = _g379.getenv;
  var id = _g379.id;
  var imported = _g379.imported;
  var indentation = _g379.indentation;
  var initial_environment = _g379["initial-environment"];
  var linked = _g379.linked;
  var macro_function = _g379["macro-function"];
  var macro63 = _g379["macro?"];
  var macroexpand = _g379.macroexpand;
  var mapo = _g379.mapo;
  var quasiexpand = _g379.quasiexpand;
  var quote_environment = _g379["quote-environment"];
  var quote_modules = _g379["quote-modules"];
  var quoted = _g379.quoted;
  var reserved63 = _g379["reserved?"];
  var sortk = _g379.sortk;
  var special_form63 = _g379["special-form?"];
  var special63 = _g379["special?"];
  var stash42 = _g379["stash*"];
  var statement63 = _g379["statement?"];
  var symbol_expansion = _g379["symbol-expansion"];
  var symbol63 = _g379["symbol?"];
  var valid_id63 = _g379["valid-id?"];
  var variable63 = _g379["variable?"];
  var _g380 = nexus["lumen/compiler"];
  var compile = _g380.compile;
  var compile_function = _g380["compile-function"];
  var compile_module = _g380["compile-module"];
  var declare = _g380.declare;
  var eval = _g380.eval;
  var import_modules = _g380["import-modules"];
  var in_module = _g380["in-module"];
  var load_module = _g380["load-module"];
  var open_module = _g380["open-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g679 = nexus["lumen/runtime"];
  var _37 = _g679["%"];
  var _37message_handler = _g679["%message-handler"];
  var _42 = _g679["*"];
  var _43 = _g679["+"];
  var _ = _g679["-"];
  var _47 = _g679["/"];
  var _60 = _g679["<"];
  var _6061 = _g679["<="];
  var _61 = _g679["="];
  var _62 = _g679[">"];
  var _6261 = _g679[">="];
  var abs = _g679.abs;
  var acos = _g679.acos;
  var add = _g679.add;
  var apply = _g679.apply;
  var asin = _g679.asin;
  var atan = _g679.atan;
  var atan2 = _g679.atan2;
  var atom63 = _g679["atom?"];
  var boolean63 = _g679["boolean?"];
  var cat = _g679.cat;
  var ceil = _g679.ceil;
  var char = _g679.char;
  var code = _g679.code;
  var composite63 = _g679["composite?"];
  var cos = _g679.cos;
  var drop = _g679.drop;
  var empty63 = _g679["empty?"];
  var exclude = _g679.exclude;
  var exit = _g679.exit;
  var extend = _g679.extend;
  var find = _g679.find;
  var flat = _g679.flat;
  var flat1 = _g679.flat1;
  var floor = _g679.floor;
  var function63 = _g679["function?"];
  var hd = _g679.hd;
  var id_literal63 = _g679["id-literal?"];
  var in63 = _g679["in?"];
  var inner = _g679.inner;
  var is63 = _g679["is?"];
  var iterate = _g679.iterate;
  var join = _g679.join;
  var keep = _g679.keep;
  var keys63 = _g679["keys?"];
  var last = _g679.last;
  var length = _g679.length;
  var list63 = _g679["list?"];
  var log = _g679.log;
  var log10 = _g679.log10;
  var make_id = _g679["make-id"];
  var map = _g679.map;
  var max = _g679.max;
  var min = _g679.min;
  var module = _g679.module;
  var module_key = _g679["module-key"];
  var nil63 = _g679["nil?"];
  var none63 = _g679["none?"];
  var now = _g679.now;
  var number = _g679.number;
  var number63 = _g679["number?"];
  var one63 = _g679["one?"];
  var pair = _g679.pair;
  var pow = _g679.pow;
  var random = _g679.random;
  var read_file = _g679["read-file"];
  var reduce = _g679.reduce;
  var replicate = _g679.replicate;
  var reverse = _g679.reverse;
  var sd = _g679.sd;
  var search = _g679.search;
  var setenv = _g679.setenv;
  var sin = _g679.sin;
  var sinh = _g679.sinh;
  var some63 = _g679["some?"];
  var sort = _g679.sort;
  var space = _g679.space;
  var splice = _g679.splice;
  var split = _g679.split;
  var sqrt = _g679.sqrt;
  var stash = _g679.stash;
  var string = _g679.string;
  var string_literal63 = _g679["string-literal?"];
  var string63 = _g679["string?"];
  var sub = _g679.sub;
  var substring = _g679.substring;
  var table63 = _g679["table?"];
  var tan = _g679.tan;
  var tanh = _g679.tanh;
  var td = _g679.td;
  var tl = _g679.tl;
  var today = _g679.today;
  var toplevel63 = _g679["toplevel?"];
  var unstash = _g679.unstash;
  var write = _g679.write;
  var write_file = _g679["write-file"];
  var _g682 = nexus["lumen/utilities"];
  var bind = _g682.bind;
  var bind42 = _g682["bind*"];
  var bound63 = _g682["bound?"];
  var getenv = _g682.getenv;
  var id = _g682.id;
  var imported = _g682.imported;
  var indentation = _g682.indentation;
  var initial_environment = _g682["initial-environment"];
  var linked = _g682.linked;
  var macro_function = _g682["macro-function"];
  var macro63 = _g682["macro?"];
  var macroexpand = _g682.macroexpand;
  var mapo = _g682.mapo;
  var quasiexpand = _g682.quasiexpand;
  var quote_environment = _g682["quote-environment"];
  var quote_modules = _g682["quote-modules"];
  var quoted = _g682.quoted;
  var reserved63 = _g682["reserved?"];
  var sortk = _g682.sortk;
  var special_form63 = _g682["special-form?"];
  var special63 = _g682["special?"];
  var stash42 = _g682["stash*"];
  var statement63 = _g682["statement?"];
  var symbol_expansion = _g682["symbol-expansion"];
  var symbol63 = _g682["symbol?"];
  var valid_id63 = _g682["valid-id?"];
  var variable63 = _g682["variable?"];
  var _g683 = nexus["lumen/compiler"];
  var compile = _g683.compile;
  var compile_function = _g683["compile-function"];
  var compile_module = _g683["compile-module"];
  var declare = _g683.declare;
  var eval = _g683.eval;
  var import_modules = _g683["import-modules"];
  var in_module = _g683["in-module"];
  var load_module = _g683["load-module"];
  var open_module = _g683["open-module"];
  global.modules = {lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {"%compile-module": {variable: true}, "%result": {export: true, global: true}, "can-return?": {variable: true}, compile: {export: true, variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, "compile-function": {export: true, variable: true}, "compile-infix": {variable: true}, "compile-module": {export: true, variable: true}, "compile-special": {variable: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, conclude: {variable: true}, "current-module": {export: true, global: true}, declare: {export: true, variable: true}, encapsulate: {variable: true}, eval: {export: true, variable: true}, getop: {variable: true}, "import-modules": {export: true, variable: true}, "in-module": {export: true, variable: true}, infix: {variable: true}, "infix?": {variable: true}, "load-module": {export: true, variable: true}, lower: {variable: true}, "lower-body": {variable: true}, "lower-call": {variable: true}, "lower-definition": {variable: true}, "lower-do": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, "lower-infix?": {variable: true}, "lower-short": {variable: true}, "lower-special": {variable: true}, "lower-statement": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "module-path": {variable: true}, "op-delims": {variable: true}, "open-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, precedence: {variable: true}, process: {variable: true}, reimported: {variable: true}, run: {variable: true}, terminator: {variable: true}, "unary?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "reader"]]}, "lumen/core": {export: {at: {export: true, macro: function (l, i) {
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
    var _g737 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g737)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g716 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g716) && target === "js") {
      return(linked(name, ["%local", name, join(["fn", x], _g716)]));
    } else {
      if (some63(_g716)) {
        var _g717 = bind42(x, _g716);
        var args = _g717[0];
        var _g718 = _g717[1];
        return(linked(name, join(["%local-function", name, args], _g718)));
      } else {
        return(linked(name, ["%local", name, x]));
      }
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g713 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g713)) {
      var _g714 = bind42(x, _g713);
      var args = _g714[0];
      var _g715 = _g714[1];
      return(join(["%global-function", name, args], _g715));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g709 = sub(body, 0);
    var form = join(["fn", args], _g709);
    var _g710 = ["setenv", ["quote", name]];
    _g710.form = ["quote", form];
    _g710.macro = form;
    eval(_g710);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g705 = sub(body, 0);
    var alias = _g705.alias;
    var exp = _g705.export;
    var imp = _g705.import;
    var _g706 = import_modules(imp);
    var imports = _g706[0];
    var bindings = _g706[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g707 = exp || [];
    var _g708 = 0;
    while (_g708 < length(_g707)) {
      var x = _g707[_g708];
      setenv(x, {_stash: true, export: true});
      _g708 = _g708 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g711 = sub(body, 0);
    var form = join(["fn", args], _g711);
    var keys = sub(_g711, length(_g711));
    var _g712 = ["setenv", ["quote", name]];
    _g712.form = ["quote", form];
    _g712.special = form;
    eval(join(_g712, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g732 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g768;
    if (nil63(v)) {
      var _g769;
      if (b.i) {
        _g769 = "i";
      } else {
        _g769 = make_id();
      }
      var i = _g769;
      _g768 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g732), ["inc", i]]];
    } else {
      var _g733 = ["target"];
      _g733.js = ["isNaN", ["parseInt", k]];
      _g733.lua = ["not", ["number?", k]];
      _g768 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g733, join(["let", [v, ["get", t1, k]]], _g732)]]];
    }
    return(["let", [t1, t], _g768]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g728 = sub(body, 0);
    var _g729 = bind42(args, _g728);
    var _g730 = _g729[0];
    var _g731 = _g729[1];
    return(join(["%function", _g730], _g731));
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
    var step = function (_g697) {
      var a = _g697[0];
      var b = _g697[1];
      var c = sub(_g697, 2);
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
    var _g736 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g736)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g700 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g701) {
      var lh = _g701[0];
      var rh = _g701[1];
      var _g702 = bind(lh, rh);
      var _g703 = 0;
      while (_g703 < length(_g702)) {
        var _g704 = _g702[_g703];
        var id = _g704[0];
        var val = _g704[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g703 = _g703 + 1;
      }
    }, pair(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g700)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g723 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g724 = join(["do"], macroexpand(_g723));
    drop(environment);
    return(_g724);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g725 = sub(body, 0);
    add(environment, {});
    map(function (_g727) {
      var name = _g727[0];
      var exp = _g727[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g726 = join(["do"], macroexpand(_g725));
    drop(environment);
    return(_g726);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g696 = body;
      var k = undefined;
      for (k in _g696) {
        if (isNaN(parseInt(k))) {
          var v = _g696[k];
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
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g734 = elements;
    var _g735 = 0;
    while (_g735 < length(_g734)) {
      var e = _g734[_g735];
      l[e] = true;
      _g735 = _g735 + 1;
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
    var _g699 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g699)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g698 = sub(body, 0);
    return(["if", cond, join(["do"], _g698)]);
  }}, "with-bindings": {export: true, macro: function (_g719) {
    var names = _g719[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g720 = sub(body, 0);
    var x = make_id();
    var _g722 = ["setenv", x];
    _g722.variable = true;
    var _g721 = ["with-frame", ["each", [x], names, _g722]];
    _g721.scope = true;
    return(join(_g721, _g720));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g738 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g739 = ["table"];
    _g739._scope = scope;
    return(["do", ["add", "environment", _g739], ["let", [x, join(["do"], _g738)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "compiler"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g740) {
    var char = _g740[0];
    var stream = _g740[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g741 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g741)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, "max*": {variable: true}, min: {export: true, variable: true}, "min*": {variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, "one?": {export: true, variable: true}, pair: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, space: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, subl: {variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, today: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g776;
    if (target === "lua") {
      _g776 = "{";
    } else {
      _g776 = "[";
    }
    var open = _g776;
    var _g777;
    if (target === "lua") {
      _g777 = "}";
    } else {
      _g777 = "]";
    }
    var close = _g777;
    var str = "";
    var _g759 = forms;
    var i = 0;
    while (i < length(_g759)) {
      var x = _g759[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g751 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g752 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g752;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g751 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g751 + ") {\n" + body + ind + "}\n");
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
    var _g744 = compile(cond);
    indent_level = indent_level + 1;
    var _g747 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g745 = _g747;
    var _g770;
    if (alt) {
      indent_level = indent_level + 1;
      var _g748 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g770 = _g748;
    }
    var _g746 = _g770;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g744 + ") {\n" + _g745 + ind + "}";
    } else {
      str = str + ind + "if " + _g744 + " then\n" + _g745;
    }
    if (_g746 && target === "js") {
      str = str + " else {\n" + _g746 + ind + "}";
    } else {
      if (_g746) {
        str = str + ind + "else\n" + _g746;
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
    var _g773;
    if (is63(value)) {
      _g773 = " = " + value1;
    } else {
      _g773 = "";
    }
    var rh = _g773;
    var _g774;
    if (target === "js") {
      _g774 = "var ";
    } else {
      _g774 = "local ";
    }
    var keyword = _g774;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g778;
    if (target === "lua") {
      _g778 = " = ";
    } else {
      _g778 = ": ";
    }
    var sep = _g778;
    var pairs = sortk(pair(forms), hd);
    var _g760 = pairs;
    var i = 0;
    while (i < length(_g760)) {
      var _g761 = _g760[i];
      var k = _g761[0];
      var v = _g761[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g762 = compile(v);
      var _g779;
      if (valid_id63(k)) {
        _g779 = k;
      } else {
        var _g780;
        if (target === "js" && string_literal63(k)) {
          _g780 = k;
        } else {
          var _g781;
          if (target === "js") {
            _g781 = quoted(k);
          } else {
            var _g782;
            if (string_literal63(k)) {
              _g782 = "[" + k + "]";
            } else {
              _g782 = "[" + quoted(k) + "]";
            }
            _g781 = _g782;
          }
          _g780 = _g781;
        }
        _g779 = _g780;
      }
      var _g763 = _g779;
      str = str + _g763 + sep + _g762;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g753 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g753;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g754 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g754;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g742 = forms;
    var _g743 = 0;
    while (_g743 < length(_g742)) {
      var x = _g742[_g743];
      str = str + compile(x, {_stash: true, stmt: true});
      _g743 = _g743 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g772;
    if (target === "js") {
      _g772 = "throw new " + compile(["Error", x]);
    } else {
      _g772 = "error(" + compile(x) + ")";
    }
    var e = _g772;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g758 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g758, 0) === "{") {
      _g758 = "(" + _g758 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g758 + "." + inner(k));
    } else {
      return(_g758 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g771;
    if (nil63(x)) {
      _g771 = "return";
    } else {
      _g771 = "return(" + compile(x) + ")";
    }
    var _g755 = _g771;
    return(indentation() + _g755);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g756 = compile(lh);
    var _g775;
    if (nil63(rh)) {
      _g775 = "nil";
    } else {
      _g775 = rh;
    }
    var _g757 = compile(_g775);
    return(indentation() + _g756 + " = " + _g757);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g749 = compile(cond);
    indent_level = indent_level + 1;
    var _g750 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g750;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g749 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g749 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, linked: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g764 = sub(body, 0);
    var alias = _g764.alias;
    var exp = _g764.export;
    var imp = _g764.import;
    var _g765 = import_modules(imp);
    var imports = _g765[0];
    var bindings = _g765[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g766 = exp || [];
    var _g767 = 0;
    while (_g767 < length(_g766)) {
      var x = _g766[_g767];
      setenv(x, {_stash: true, export: true});
      _g767 = _g767 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g783 = nexus["lumen/runtime"];
  var _37 = _g783["%"];
  var _37message_handler = _g783["%message-handler"];
  var _42 = _g783["*"];
  var _43 = _g783["+"];
  var _ = _g783["-"];
  var _47 = _g783["/"];
  var _60 = _g783["<"];
  var _6061 = _g783["<="];
  var _61 = _g783["="];
  var _62 = _g783[">"];
  var _6261 = _g783[">="];
  var abs = _g783.abs;
  var acos = _g783.acos;
  var add = _g783.add;
  var apply = _g783.apply;
  var asin = _g783.asin;
  var atan = _g783.atan;
  var atan2 = _g783.atan2;
  var atom63 = _g783["atom?"];
  var boolean63 = _g783["boolean?"];
  var cat = _g783.cat;
  var ceil = _g783.ceil;
  var char = _g783.char;
  var code = _g783.code;
  var composite63 = _g783["composite?"];
  var cos = _g783.cos;
  var drop = _g783.drop;
  var empty63 = _g783["empty?"];
  var exclude = _g783.exclude;
  var exit = _g783.exit;
  var extend = _g783.extend;
  var find = _g783.find;
  var flat = _g783.flat;
  var flat1 = _g783.flat1;
  var floor = _g783.floor;
  var function63 = _g783["function?"];
  var hd = _g783.hd;
  var id_literal63 = _g783["id-literal?"];
  var in63 = _g783["in?"];
  var inner = _g783.inner;
  var is63 = _g783["is?"];
  var iterate = _g783.iterate;
  var join = _g783.join;
  var keep = _g783.keep;
  var keys63 = _g783["keys?"];
  var last = _g783.last;
  var length = _g783.length;
  var list63 = _g783["list?"];
  var log = _g783.log;
  var log10 = _g783.log10;
  var make_id = _g783["make-id"];
  var map = _g783.map;
  var max = _g783.max;
  var min = _g783.min;
  var module = _g783.module;
  var module_key = _g783["module-key"];
  var nil63 = _g783["nil?"];
  var none63 = _g783["none?"];
  var now = _g783.now;
  var number = _g783.number;
  var number63 = _g783["number?"];
  var one63 = _g783["one?"];
  var pair = _g783.pair;
  var pow = _g783.pow;
  var random = _g783.random;
  var read_file = _g783["read-file"];
  var reduce = _g783.reduce;
  var replicate = _g783.replicate;
  var reverse = _g783.reverse;
  var sd = _g783.sd;
  var search = _g783.search;
  var setenv = _g783.setenv;
  var sin = _g783.sin;
  var sinh = _g783.sinh;
  var some63 = _g783["some?"];
  var sort = _g783.sort;
  var space = _g783.space;
  var splice = _g783.splice;
  var split = _g783.split;
  var sqrt = _g783.sqrt;
  var stash = _g783.stash;
  var string = _g783.string;
  var string_literal63 = _g783["string-literal?"];
  var string63 = _g783["string?"];
  var sub = _g783.sub;
  var substring = _g783.substring;
  var table63 = _g783["table?"];
  var tan = _g783.tan;
  var tanh = _g783.tanh;
  var td = _g783.td;
  var tl = _g783.tl;
  var today = _g783.today;
  var toplevel63 = _g783["toplevel?"];
  var unstash = _g783.unstash;
  var write = _g783.write;
  var write_file = _g783["write-file"];
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
    var _g786 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g788) {
        return([false, _g788.message]);
      }
    })();
    var _g1 = _g786[0];
    var x = _g786[1];
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
    var _g787 = args;
    var i = 0;
    while (i < length(_g787)) {
      var arg = _g787[i];
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
