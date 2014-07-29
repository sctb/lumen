global.nexus = {};
(function () {
  nexus["lumen/runtime"] = {};
  var nil63 = function (x) {
    return(x === undefined);
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
    return(type(x) === "object");
  };
  nexus["lumen/runtime"]["composite?"] = composite63;
  var atom63 = function (x) {
    return(!composite63(x));
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
  var sublist = function (l, from, upto) {
    return(Array.prototype.slice.call(l, from, upto));
  };
  nexus["lumen/runtime"].sublist = sublist;
  var sub = function (x, from, upto) {
    var _g25 = from || 0;
    if (string63(x)) {
      return(substring(x, _g25, upto));
    } else {
      var l = sublist(x, _g25, upto);
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
    var t1 = sublist(t);
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
    return(reduce(function (a, b) {
      return(b - a);
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
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g48)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
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
  var space = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
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
  nexus["lumen/utilities"] = {};
  var _g59 = nexus["lumen/runtime"];
  var _37 = _g59["%"];
  var _37message_handler = _g59["%message-handler"];
  var _42 = _g59["*"];
  var _43 = _g59["+"];
  var _ = _g59["-"];
  var _47 = _g59["/"];
  var _60 = _g59["<"];
  var _6061 = _g59["<="];
  var _61 = _g59["="];
  var _62 = _g59[">"];
  var _6261 = _g59[">="];
  var abs = _g59.abs;
  var acos = _g59.acos;
  var add = _g59.add;
  var apply = _g59.apply;
  var asin = _g59.asin;
  var atan = _g59.atan;
  var atan2 = _g59.atan2;
  var atom63 = _g59["atom?"];
  var boolean63 = _g59["boolean?"];
  var cat = _g59.cat;
  var ceil = _g59.ceil;
  var char = _g59.char;
  var code = _g59.code;
  var composite63 = _g59["composite?"];
  var cos = _g59.cos;
  var drop = _g59.drop;
  var empty63 = _g59["empty?"];
  var exclude = _g59.exclude;
  var exit = _g59.exit;
  var extend = _g59.extend;
  var find = _g59.find;
  var flat = _g59.flat;
  var flat1 = _g59.flat1;
  var floor = _g59.floor;
  var function63 = _g59["function?"];
  var hd = _g59.hd;
  var id_literal63 = _g59["id-literal?"];
  var in63 = _g59["in?"];
  var inner = _g59.inner;
  var is63 = _g59["is?"];
  var iterate = _g59.iterate;
  var join = _g59.join;
  var keep = _g59.keep;
  var keys63 = _g59["keys?"];
  var last = _g59.last;
  var length = _g59.length;
  var list63 = _g59["list?"];
  var log = _g59.log;
  var log10 = _g59.log10;
  var make_id = _g59["make-id"];
  var map = _g59.map;
  var max = _g59.max;
  var min = _g59.min;
  var module = _g59.module;
  var module_key = _g59["module-key"];
  var nil63 = _g59["nil?"];
  var none63 = _g59["none?"];
  var now = _g59.now;
  var number = _g59.number;
  var number63 = _g59["number?"];
  var one63 = _g59["one?"];
  var pair = _g59.pair;
  var pow = _g59.pow;
  var random = _g59.random;
  var read_file = _g59["read-file"];
  var reduce = _g59.reduce;
  var replicate = _g59.replicate;
  var reverse = _g59.reverse;
  var sd = _g59.sd;
  var search = _g59.search;
  var setenv = _g59.setenv;
  var sin = _g59.sin;
  var sinh = _g59.sinh;
  var some63 = _g59["some?"];
  var sort = _g59.sort;
  var space = _g59.space;
  var splice = _g59.splice;
  var split = _g59.split;
  var sqrt = _g59.sqrt;
  var stash = _g59.stash;
  var string = _g59.string;
  var string_literal63 = _g59["string-literal?"];
  var string63 = _g59["string?"];
  var sub = _g59.sub;
  var sublist = _g59.sublist;
  var substring = _g59.substring;
  var table63 = _g59["table?"];
  var tan = _g59.tan;
  var tanh = _g59.tanh;
  var td = _g59.td;
  var tl = _g59.tl;
  var today = _g59.today;
  var toplevel63 = _g59["toplevel?"];
  var unstash = _g59.unstash;
  var write = _g59.write;
  var write_file = _g59["write-file"];
  var getenv = function (k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g62 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g63 = undefined;
        var _g64 = _g62;
        var x = undefined;
        for (x in _g64) {
          if (isNaN(parseInt(x))) {
            var _g56 = _g64[x];
            _g63 = x;
          }
        }
        if (_g63) {
          return(b[_g63]);
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
      var _g93;
      if (c === "\n") {
        _g93 = "\\n";
      } else {
        var _g94;
        if (c === "\"") {
          _g94 = "\\\"";
        } else {
          var _g95;
          if (c === "\\") {
            _g95 = "\\\\";
          } else {
            _g95 = c;
          }
          _g94 = _g95;
        }
        _g93 = _g94;
      }
      var c1 = _g93;
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
      var _g65 = args;
      var k = undefined;
      for (k in _g65) {
        if (isNaN(parseInt(k))) {
          var v = _g65[k];
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
        var _g66 = lh;
        var i = 0;
        while (i < length(_g66)) {
          var x = _g66[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g67 = lh;
        var k = undefined;
        for (k in _g67) {
          if (isNaN(parseInt(k))) {
            var v = _g67[k];
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
      var _g68 = args;
      var _g69 = 0;
      while (_g69 < length(_g68)) {
        var arg = _g68[_g69];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g69 = _g69 + 1;
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
          var _g57 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g72 = args;
          var _g73 = 0;
          while (_g73 < length(_g72)) {
            var _g70 = _g72[_g73];
            setenv(_g70, {_stash: true, variable: true});
            _g73 = _g73 + 1;
          }
          var _g71 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g71);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g58 = form[0];
            var name = form[1];
            var _g74 = form[2];
            var _g75 = sub(form, 3);
            add(environment, {_scope: true});
            var _g78 = _g74;
            var _g79 = 0;
            while (_g79 < length(_g78)) {
              var _g76 = _g78[_g79];
              setenv(_g76, {_stash: true, variable: true});
              _g79 = _g79 + 1;
            }
            var _g77 = join([x, name, map(macroexpand, _g74)], macroexpand(_g75));
            drop(environment);
            return(_g77);
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
    var _g80 = form;
    var k = undefined;
    for (k in _g80) {
      if (isNaN(parseInt(k))) {
        var v = _g80[k];
        var _g96;
        if (quasisplice63(v, depth)) {
          _g96 = quasiexpand(v[1]);
        } else {
          _g96 = quasiexpand(v, depth);
        }
        var _g81 = _g96;
        last(xs)[k] = _g81;
      }
    }
    var _g82 = form;
    var _g83 = 0;
    while (_g83 < length(_g82)) {
      var x = _g82[_g83];
      if (quasisplice63(x, depth)) {
        var _g84 = quasiexpand(x[1]);
        add(xs, _g84);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g83 = _g83 + 1;
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
  };
  nexus["lumen/utilities"]["valid-id?"] = valid_id63;
  var id = function (id) {
    var id1 = "";
    var i = 0;
    while (i < length(id)) {
      var c = char(id, i);
      var n = code(c);
      var _g97;
      if (c === "-") {
        _g97 = "_";
      } else {
        var _g98;
        if (valid_char63(n)) {
          _g98 = c;
        } else {
          var _g99;
          if (i === 0) {
            _g99 = "_" + n;
          } else {
            _g99 = n;
          }
          _g98 = _g99;
        }
        _g97 = _g98;
      }
      var c1 = _g97;
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
    var _g89 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g89.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g90 = module(spec).export;
      var n = undefined;
      for (n in _g90) {
        if (isNaN(parseInt(n))) {
          var b = _g90[n];
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
    var _g91 = t;
    var k = undefined;
    for (k in _g91) {
      if (isNaN(parseInt(k))) {
        var v = _g91[k];
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
    var _g92 = ["table"];
    _g92.alias = quoted(m.alias);
    _g92.export = quote_frame(m.export);
    _g92.import = quoted(m.import);
    return(_g92);
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
  var _g100 = nexus["lumen/runtime"];
  var _37 = _g100["%"];
  var _37message_handler = _g100["%message-handler"];
  var _42 = _g100["*"];
  var _43 = _g100["+"];
  var _ = _g100["-"];
  var _47 = _g100["/"];
  var _60 = _g100["<"];
  var _6061 = _g100["<="];
  var _61 = _g100["="];
  var _62 = _g100[">"];
  var _6261 = _g100[">="];
  var abs = _g100.abs;
  var acos = _g100.acos;
  var add = _g100.add;
  var apply = _g100.apply;
  var asin = _g100.asin;
  var atan = _g100.atan;
  var atan2 = _g100.atan2;
  var atom63 = _g100["atom?"];
  var boolean63 = _g100["boolean?"];
  var cat = _g100.cat;
  var ceil = _g100.ceil;
  var char = _g100.char;
  var code = _g100.code;
  var composite63 = _g100["composite?"];
  var cos = _g100.cos;
  var drop = _g100.drop;
  var empty63 = _g100["empty?"];
  var exclude = _g100.exclude;
  var exit = _g100.exit;
  var extend = _g100.extend;
  var find = _g100.find;
  var flat = _g100.flat;
  var flat1 = _g100.flat1;
  var floor = _g100.floor;
  var function63 = _g100["function?"];
  var hd = _g100.hd;
  var id_literal63 = _g100["id-literal?"];
  var in63 = _g100["in?"];
  var inner = _g100.inner;
  var is63 = _g100["is?"];
  var iterate = _g100.iterate;
  var join = _g100.join;
  var keep = _g100.keep;
  var keys63 = _g100["keys?"];
  var last = _g100.last;
  var length = _g100.length;
  var list63 = _g100["list?"];
  var log = _g100.log;
  var log10 = _g100.log10;
  var make_id = _g100["make-id"];
  var map = _g100.map;
  var max = _g100.max;
  var min = _g100.min;
  var module = _g100.module;
  var module_key = _g100["module-key"];
  var nil63 = _g100["nil?"];
  var none63 = _g100["none?"];
  var now = _g100.now;
  var number = _g100.number;
  var number63 = _g100["number?"];
  var one63 = _g100["one?"];
  var pair = _g100.pair;
  var pow = _g100.pow;
  var random = _g100.random;
  var read_file = _g100["read-file"];
  var reduce = _g100.reduce;
  var replicate = _g100.replicate;
  var reverse = _g100.reverse;
  var sd = _g100.sd;
  var search = _g100.search;
  var setenv = _g100.setenv;
  var sin = _g100.sin;
  var sinh = _g100.sinh;
  var some63 = _g100["some?"];
  var sort = _g100.sort;
  var space = _g100.space;
  var splice = _g100.splice;
  var split = _g100.split;
  var sqrt = _g100.sqrt;
  var stash = _g100.stash;
  var string = _g100.string;
  var string_literal63 = _g100["string-literal?"];
  var string63 = _g100["string?"];
  var sub = _g100.sub;
  var sublist = _g100.sublist;
  var substring = _g100.substring;
  var table63 = _g100["table?"];
  var tan = _g100.tan;
  var tanh = _g100.tanh;
  var td = _g100.td;
  var tl = _g100.tl;
  var today = _g100.today;
  var toplevel63 = _g100["toplevel?"];
  var unstash = _g100.unstash;
  var write = _g100.write;
  var write_file = _g100["write-file"];
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
    return(read(make_stream(str)));
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
  var _g111 = nexus["lumen/runtime"];
  var _37 = _g111["%"];
  var _37message_handler = _g111["%message-handler"];
  var _42 = _g111["*"];
  var _43 = _g111["+"];
  var _ = _g111["-"];
  var _47 = _g111["/"];
  var _60 = _g111["<"];
  var _6061 = _g111["<="];
  var _61 = _g111["="];
  var _62 = _g111[">"];
  var _6261 = _g111[">="];
  var abs = _g111.abs;
  var acos = _g111.acos;
  var add = _g111.add;
  var apply = _g111.apply;
  var asin = _g111.asin;
  var atan = _g111.atan;
  var atan2 = _g111.atan2;
  var atom63 = _g111["atom?"];
  var boolean63 = _g111["boolean?"];
  var cat = _g111.cat;
  var ceil = _g111.ceil;
  var char = _g111.char;
  var code = _g111.code;
  var composite63 = _g111["composite?"];
  var cos = _g111.cos;
  var drop = _g111.drop;
  var empty63 = _g111["empty?"];
  var exclude = _g111.exclude;
  var exit = _g111.exit;
  var extend = _g111.extend;
  var find = _g111.find;
  var flat = _g111.flat;
  var flat1 = _g111.flat1;
  var floor = _g111.floor;
  var function63 = _g111["function?"];
  var hd = _g111.hd;
  var id_literal63 = _g111["id-literal?"];
  var in63 = _g111["in?"];
  var inner = _g111.inner;
  var is63 = _g111["is?"];
  var iterate = _g111.iterate;
  var join = _g111.join;
  var keep = _g111.keep;
  var keys63 = _g111["keys?"];
  var last = _g111.last;
  var length = _g111.length;
  var list63 = _g111["list?"];
  var log = _g111.log;
  var log10 = _g111.log10;
  var make_id = _g111["make-id"];
  var map = _g111.map;
  var max = _g111.max;
  var min = _g111.min;
  var module = _g111.module;
  var module_key = _g111["module-key"];
  var nil63 = _g111["nil?"];
  var none63 = _g111["none?"];
  var now = _g111.now;
  var number = _g111.number;
  var number63 = _g111["number?"];
  var one63 = _g111["one?"];
  var pair = _g111.pair;
  var pow = _g111.pow;
  var random = _g111.random;
  var read_file = _g111["read-file"];
  var reduce = _g111.reduce;
  var replicate = _g111.replicate;
  var reverse = _g111.reverse;
  var sd = _g111.sd;
  var search = _g111.search;
  var setenv = _g111.setenv;
  var sin = _g111.sin;
  var sinh = _g111.sinh;
  var some63 = _g111["some?"];
  var sort = _g111.sort;
  var space = _g111.space;
  var splice = _g111.splice;
  var split = _g111.split;
  var sqrt = _g111.sqrt;
  var stash = _g111.stash;
  var string = _g111.string;
  var string_literal63 = _g111["string-literal?"];
  var string63 = _g111["string?"];
  var sub = _g111.sub;
  var sublist = _g111.sublist;
  var substring = _g111.substring;
  var table63 = _g111["table?"];
  var tan = _g111.tan;
  var tanh = _g111.tanh;
  var td = _g111.td;
  var tl = _g111.tl;
  var today = _g111.today;
  var toplevel63 = _g111["toplevel?"];
  var unstash = _g111.unstash;
  var write = _g111.write;
  var write_file = _g111["write-file"];
  var _g114 = nexus["lumen/utilities"];
  var bind = _g114.bind;
  var bind42 = _g114["bind*"];
  var bound63 = _g114["bound?"];
  var getenv = _g114.getenv;
  var id = _g114.id;
  var imported = _g114.imported;
  var indentation = _g114.indentation;
  var initial_environment = _g114["initial-environment"];
  var linked = _g114.linked;
  var macro_function = _g114["macro-function"];
  var macro63 = _g114["macro?"];
  var macroexpand = _g114.macroexpand;
  var mapo = _g114.mapo;
  var quasiexpand = _g114.quasiexpand;
  var quote_environment = _g114["quote-environment"];
  var quote_modules = _g114["quote-modules"];
  var quoted = _g114.quoted;
  var reserved63 = _g114["reserved?"];
  var sortk = _g114.sortk;
  var special_form63 = _g114["special-form?"];
  var special63 = _g114["special?"];
  var stash42 = _g114["stash*"];
  var statement63 = _g114["statement?"];
  var symbol_expansion = _g114["symbol-expansion"];
  var symbol63 = _g114["symbol?"];
  var valid_id63 = _g114["valid-id?"];
  var variable63 = _g114["variable?"];
  var _g115 = nexus["lumen/reader"];
  var make_stream = _g115["make-stream"];
  var read = _g115.read;
  var read_all = _g115["read-all"];
  var read_from_string = _g115["read-from-string"];
  var read_table = _g115["read-table"];
  var _g119 = [];
  _g119.js = "!";
  _g119.lua = "not ";
  var _g117 = [];
  var _g120 = [];
  _g120.js = "!";
  _g120.lua = "not ";
  _g117["not"] = _g120;
  var _g122 = [];
  _g122["%"] = true;
  _g122["*"] = true;
  _g122["/"] = true;
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
  _g131["<="] = true;
  _g131[">"] = true;
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
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
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
    var _g152 = getenv(x);
    var special = _g152.special;
    var stmt = _g152.stmt;
    var self_tr63 = _g152.tr;
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
    var _g153 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g153.right;
    var _g180;
    if (right) {
      _g180 = _6261;
    } else {
      _g180 = _62;
    }
    if (_g180(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g154 = sub(form, 1);
    var a = _g154[0];
    var b = _g154[1];
    var _g155 = op_delims(form, a);
    var ao = _g155[0];
    var ac = _g155[1];
    var _g156 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g156[0];
    var bc = _g156[1];
    var _g157 = compile(a);
    var _g158 = compile(b);
    var _g159 = getop(op);
    if (unary63(form)) {
      return(_g159 + ao + _g157 + ac);
    } else {
      return(ao + _g157 + ac + " " + _g159 + " " + bo + _g158 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g160 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g160.name;
    var prefix = _g160.prefix;
    var _g181;
    if (name) {
      _g181 = compile(name);
    } else {
      _g181 = "";
    }
    var id = _g181;
    var _g161 = prefix || "";
    var _g162 = compile_args(args);
    indent_level = indent_level + 1;
    var _g164 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g163 = _g164;
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
      return("function " + id + _g162 + " {\n" + _g163 + ind + "}" + tr);
    } else {
      return(_g161 + "function " + id + _g162 + "\n" + _g163 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g165 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g165.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g183;
        if (stmt) {
          _g183 = indentation();
        } else {
          _g183 = "";
        }
        var ind = _g183;
        var _g184;
        if (atom63(form)) {
          _g184 = compile_atom(form);
        } else {
          var _g185;
          if (infix63(hd(form))) {
            _g185 = compile_infix(form);
          } else {
            _g185 = compile_call(form);
          }
          _g184 = _g185;
        }
        var _g166 = _g184;
        return(ind + _g166 + tr);
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
    var _g167 = sub(args, 0, length(args) - 1);
    var _g168 = 0;
    while (_g168 < length(_g167)) {
      var x = _g167[_g168];
      add(hoist, lower(x, hoist, stmt63));
      _g168 = _g168 + 1;
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
    var _g169 = args[1];
    var _g170 = args[2];
    if (stmt63 || tail63) {
      var _g187;
      if (_g170) {
        _g187 = [lower_body([_g170], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g169], tail63)], _g187)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g186;
      if (_g170) {
        _g186 = [lower(["set", e, _g170])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g169])], _g186));
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
      var _g188;
      if (x === "and") {
        _g188 = ["%if", id, b, id];
      } else {
        _g188 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g188], hoist));
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
    var _g171 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g171, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g172 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g172)) {
      return(_g172);
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
    var _g173 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g173.all;
    var m = module(spec);
    var frame = last(environment);
    var _g174 = m.export;
    var k = undefined;
    for (k in _g174) {
      if (isNaN(parseInt(k))) {
        var v = _g174[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g175 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g175.all;
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
    var _g176 = specs || [];
    var _g177 = 0;
    while (_g177 < length(_g176)) {
      var spec = _g176[_g177];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g178 = import_modules(m.alias);
        var aliased = _g178[0];
        var bs = _g178[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g179 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g179);
      }
      _g177 = _g177 + 1;
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
  var _g189 = nexus["lumen/runtime"];
  var _37 = _g189["%"];
  var _37message_handler = _g189["%message-handler"];
  var _42 = _g189["*"];
  var _43 = _g189["+"];
  var _ = _g189["-"];
  var _47 = _g189["/"];
  var _60 = _g189["<"];
  var _6061 = _g189["<="];
  var _61 = _g189["="];
  var _62 = _g189[">"];
  var _6261 = _g189[">="];
  var abs = _g189.abs;
  var acos = _g189.acos;
  var add = _g189.add;
  var apply = _g189.apply;
  var asin = _g189.asin;
  var atan = _g189.atan;
  var atan2 = _g189.atan2;
  var atom63 = _g189["atom?"];
  var boolean63 = _g189["boolean?"];
  var cat = _g189.cat;
  var ceil = _g189.ceil;
  var char = _g189.char;
  var code = _g189.code;
  var composite63 = _g189["composite?"];
  var cos = _g189.cos;
  var drop = _g189.drop;
  var empty63 = _g189["empty?"];
  var exclude = _g189.exclude;
  var exit = _g189.exit;
  var extend = _g189.extend;
  var find = _g189.find;
  var flat = _g189.flat;
  var flat1 = _g189.flat1;
  var floor = _g189.floor;
  var function63 = _g189["function?"];
  var hd = _g189.hd;
  var id_literal63 = _g189["id-literal?"];
  var in63 = _g189["in?"];
  var inner = _g189.inner;
  var is63 = _g189["is?"];
  var iterate = _g189.iterate;
  var join = _g189.join;
  var keep = _g189.keep;
  var keys63 = _g189["keys?"];
  var last = _g189.last;
  var length = _g189.length;
  var list63 = _g189["list?"];
  var log = _g189.log;
  var log10 = _g189.log10;
  var make_id = _g189["make-id"];
  var map = _g189.map;
  var max = _g189.max;
  var min = _g189.min;
  var module = _g189.module;
  var module_key = _g189["module-key"];
  var nil63 = _g189["nil?"];
  var none63 = _g189["none?"];
  var now = _g189.now;
  var number = _g189.number;
  var number63 = _g189["number?"];
  var one63 = _g189["one?"];
  var pair = _g189.pair;
  var pow = _g189.pow;
  var random = _g189.random;
  var read_file = _g189["read-file"];
  var reduce = _g189.reduce;
  var replicate = _g189.replicate;
  var reverse = _g189.reverse;
  var sd = _g189.sd;
  var search = _g189.search;
  var setenv = _g189.setenv;
  var sin = _g189.sin;
  var sinh = _g189.sinh;
  var some63 = _g189["some?"];
  var sort = _g189.sort;
  var space = _g189.space;
  var splice = _g189.splice;
  var split = _g189.split;
  var sqrt = _g189.sqrt;
  var stash = _g189.stash;
  var string = _g189.string;
  var string_literal63 = _g189["string-literal?"];
  var string63 = _g189["string?"];
  var sub = _g189.sub;
  var sublist = _g189.sublist;
  var substring = _g189.substring;
  var table63 = _g189["table?"];
  var tan = _g189.tan;
  var tanh = _g189.tanh;
  var td = _g189.td;
  var tl = _g189.tl;
  var today = _g189.today;
  var toplevel63 = _g189["toplevel?"];
  var unstash = _g189.unstash;
  var write = _g189.write;
  var write_file = _g189["write-file"];
  var _g192 = nexus["lumen/utilities"];
  var bind = _g192.bind;
  var bind42 = _g192["bind*"];
  var bound63 = _g192["bound?"];
  var getenv = _g192.getenv;
  var id = _g192.id;
  var imported = _g192.imported;
  var indentation = _g192.indentation;
  var initial_environment = _g192["initial-environment"];
  var linked = _g192.linked;
  var macro_function = _g192["macro-function"];
  var macro63 = _g192["macro?"];
  var macroexpand = _g192.macroexpand;
  var mapo = _g192.mapo;
  var quasiexpand = _g192.quasiexpand;
  var quote_environment = _g192["quote-environment"];
  var quote_modules = _g192["quote-modules"];
  var quoted = _g192.quoted;
  var reserved63 = _g192["reserved?"];
  var sortk = _g192.sortk;
  var special_form63 = _g192["special-form?"];
  var special63 = _g192["special?"];
  var stash42 = _g192["stash*"];
  var statement63 = _g192["statement?"];
  var symbol_expansion = _g192["symbol-expansion"];
  var symbol63 = _g192["symbol?"];
  var valid_id63 = _g192["valid-id?"];
  var variable63 = _g192["variable?"];
  var _g193 = nexus["lumen/compiler"];
  var compile = _g193.compile;
  var compile_function = _g193["compile-function"];
  var compile_module = _g193["compile-module"];
  var declare = _g193.declare;
  var eval = _g193.eval;
  var import_modules = _g193["import-modules"];
  var in_module = _g193["in-module"];
  var load_module = _g193["load-module"];
  var open_module = _g193["open-module"];
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
  var sublist = _g373.sublist;
  var substring = _g373.substring;
  var table63 = _g373["table?"];
  var tan = _g373.tan;
  var tanh = _g373.tanh;
  var td = _g373.td;
  var tl = _g373.tl;
  var today = _g373.today;
  var toplevel63 = _g373["toplevel?"];
  var unstash = _g373.unstash;
  var write = _g373.write;
  var write_file = _g373["write-file"];
  var _g376 = nexus["lumen/utilities"];
  var bind = _g376.bind;
  var bind42 = _g376["bind*"];
  var bound63 = _g376["bound?"];
  var getenv = _g376.getenv;
  var id = _g376.id;
  var imported = _g376.imported;
  var indentation = _g376.indentation;
  var initial_environment = _g376["initial-environment"];
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
  var _g677 = nexus["lumen/runtime"];
  var _37 = _g677["%"];
  var _37message_handler = _g677["%message-handler"];
  var _42 = _g677["*"];
  var _43 = _g677["+"];
  var _ = _g677["-"];
  var _47 = _g677["/"];
  var _60 = _g677["<"];
  var _6061 = _g677["<="];
  var _61 = _g677["="];
  var _62 = _g677[">"];
  var _6261 = _g677[">="];
  var abs = _g677.abs;
  var acos = _g677.acos;
  var add = _g677.add;
  var apply = _g677.apply;
  var asin = _g677.asin;
  var atan = _g677.atan;
  var atan2 = _g677.atan2;
  var atom63 = _g677["atom?"];
  var boolean63 = _g677["boolean?"];
  var cat = _g677.cat;
  var ceil = _g677.ceil;
  var char = _g677.char;
  var code = _g677.code;
  var composite63 = _g677["composite?"];
  var cos = _g677.cos;
  var drop = _g677.drop;
  var empty63 = _g677["empty?"];
  var exclude = _g677.exclude;
  var exit = _g677.exit;
  var extend = _g677.extend;
  var find = _g677.find;
  var flat = _g677.flat;
  var flat1 = _g677.flat1;
  var floor = _g677.floor;
  var function63 = _g677["function?"];
  var hd = _g677.hd;
  var id_literal63 = _g677["id-literal?"];
  var in63 = _g677["in?"];
  var inner = _g677.inner;
  var is63 = _g677["is?"];
  var iterate = _g677.iterate;
  var join = _g677.join;
  var keep = _g677.keep;
  var keys63 = _g677["keys?"];
  var last = _g677.last;
  var length = _g677.length;
  var list63 = _g677["list?"];
  var log = _g677.log;
  var log10 = _g677.log10;
  var make_id = _g677["make-id"];
  var map = _g677.map;
  var max = _g677.max;
  var min = _g677.min;
  var module = _g677.module;
  var module_key = _g677["module-key"];
  var nil63 = _g677["nil?"];
  var none63 = _g677["none?"];
  var now = _g677.now;
  var number = _g677.number;
  var number63 = _g677["number?"];
  var one63 = _g677["one?"];
  var pair = _g677.pair;
  var pow = _g677.pow;
  var random = _g677.random;
  var read_file = _g677["read-file"];
  var reduce = _g677.reduce;
  var replicate = _g677.replicate;
  var reverse = _g677.reverse;
  var sd = _g677.sd;
  var search = _g677.search;
  var setenv = _g677.setenv;
  var sin = _g677.sin;
  var sinh = _g677.sinh;
  var some63 = _g677["some?"];
  var sort = _g677.sort;
  var space = _g677.space;
  var splice = _g677.splice;
  var split = _g677.split;
  var sqrt = _g677.sqrt;
  var stash = _g677.stash;
  var string = _g677.string;
  var string_literal63 = _g677["string-literal?"];
  var string63 = _g677["string?"];
  var sub = _g677.sub;
  var sublist = _g677.sublist;
  var substring = _g677.substring;
  var table63 = _g677["table?"];
  var tan = _g677.tan;
  var tanh = _g677.tanh;
  var td = _g677.td;
  var tl = _g677.tl;
  var today = _g677.today;
  var toplevel63 = _g677["toplevel?"];
  var unstash = _g677.unstash;
  var write = _g677.write;
  var write_file = _g677["write-file"];
  var _g680 = nexus["lumen/utilities"];
  var bind = _g680.bind;
  var bind42 = _g680["bind*"];
  var bound63 = _g680["bound?"];
  var getenv = _g680.getenv;
  var id = _g680.id;
  var imported = _g680.imported;
  var indentation = _g680.indentation;
  var initial_environment = _g680["initial-environment"];
  var linked = _g680.linked;
  var macro_function = _g680["macro-function"];
  var macro63 = _g680["macro?"];
  var macroexpand = _g680.macroexpand;
  var mapo = _g680.mapo;
  var quasiexpand = _g680.quasiexpand;
  var quote_environment = _g680["quote-environment"];
  var quote_modules = _g680["quote-modules"];
  var quoted = _g680.quoted;
  var reserved63 = _g680["reserved?"];
  var sortk = _g680.sortk;
  var special_form63 = _g680["special-form?"];
  var special63 = _g680["special?"];
  var stash42 = _g680["stash*"];
  var statement63 = _g680["statement?"];
  var symbol_expansion = _g680["symbol-expansion"];
  var symbol63 = _g680["symbol?"];
  var valid_id63 = _g680["valid-id?"];
  var variable63 = _g680["variable?"];
  var _g681 = nexus["lumen/compiler"];
  var compile = _g681.compile;
  var compile_function = _g681["compile-function"];
  var compile_module = _g681["compile-module"];
  var declare = _g681.declare;
  var eval = _g681.eval;
  var import_modules = _g681["import-modules"];
  var in_module = _g681["in-module"];
  var load_module = _g681["load-module"];
  var open_module = _g681["open-module"];
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
    var _g735 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g735)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g714 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g714) && target === "js") {
      return(linked(name, ["%local", name, join(["fn", x], _g714)]));
    } else {
      if (some63(_g714)) {
        var _g715 = bind42(x, _g714);
        var args = _g715[0];
        var _g716 = _g715[1];
        return(linked(name, join(["%local-function", name, args], _g716)));
      } else {
        return(linked(name, ["%local", name, x]));
      }
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g711 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g711)) {
      var _g712 = bind42(x, _g711);
      var args = _g712[0];
      var _g713 = _g712[1];
      return(join(["%global-function", name, args], _g713));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g707 = sub(body, 0);
    var form = join(["fn", args], _g707);
    var _g708 = ["setenv", ["quote", name]];
    _g708.form = ["quote", form];
    _g708.macro = form;
    eval(_g708);
    return(undefined);
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g703 = sub(body, 0);
    var alias = _g703.alias;
    var exp = _g703.export;
    var imp = _g703.import;
    var _g704 = import_modules(imp);
    var imports = _g704[0];
    var bindings = _g704[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g705 = exp || [];
    var _g706 = 0;
    while (_g706 < length(_g705)) {
      var x = _g705[_g706];
      setenv(x, {_stash: true, export: true});
      _g706 = _g706 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g709 = sub(body, 0);
    var form = join(["fn", args], _g709);
    var keys = sub(_g709, length(_g709));
    var _g710 = ["setenv", ["quote", name]];
    _g710.form = ["quote", form];
    _g710.special = form;
    eval(join(_g710, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g730 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g767;
    if (nil63(v)) {
      var _g768;
      if (b.i) {
        _g768 = "i";
      } else {
        _g768 = make_id();
      }
      var i = _g768;
      _g767 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g730), ["inc", i]]];
    } else {
      var _g731 = ["target"];
      _g731.js = ["isNaN", ["parseInt", k]];
      _g731.lua = ["not", ["number?", k]];
      _g767 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g731, join(["let", [v, ["get", t1, k]]], _g730)]]];
    }
    return(["let", [t1, t], _g767]);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g726 = sub(body, 0);
    var _g727 = bind42(args, _g726);
    var _g728 = _g727[0];
    var _g729 = _g727[1];
    return(join(["%function", _g728], _g729));
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
    var step = function (_g695) {
      var a = _g695[0];
      var b = _g695[1];
      var c = sub(_g695, 2);
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
    var _g734 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g734)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g698 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g699) {
      var lh = _g699[0];
      var rh = _g699[1];
      var _g700 = bind(lh, rh);
      var _g701 = 0;
      while (_g701 < length(_g700)) {
        var _g702 = _g700[_g701];
        var id = _g702[0];
        var val = _g702[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g701 = _g701 + 1;
      }
    }, pair(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g698)])));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g721 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g722 = join(["do"], macroexpand(_g721));
    drop(environment);
    return(_g722);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g723 = sub(body, 0);
    add(environment, {});
    map(function (_g725) {
      var name = _g725[0];
      var exp = _g725[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g724 = join(["do"], macroexpand(_g723));
    drop(environment);
    return(_g724);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g694 = body;
      var k = undefined;
      for (k in _g694) {
        if (isNaN(parseInt(k))) {
          var v = _g694[k];
          add(init, [k, ["set", ["get", id, ["quote", k]], v]]);
        }
      }
      return(join(["let", [id, l]], join(map(sd, sortk(init, hd)), [id])));
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g736 = map(function (x) {
      return(splice([["string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g736)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "set*": {export: true, macro: function (name, value) {
    return(linked(name, ["set", name, value]));
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g732 = elements;
    var _g733 = 0;
    while (_g733 < length(_g732)) {
      var e = _g732[_g733];
      l[e] = true;
      _g733 = _g733 + 1;
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
    var _g697 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g697)]);
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g696 = sub(body, 0);
    return(["if", cond, join(["do"], _g696)]);
  }}, "with-bindings": {export: true, macro: function (_g717) {
    var names = _g717[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g718 = sub(body, 0);
    var x = make_id();
    var _g720 = ["setenv", x];
    _g720.variable = true;
    var _g719 = ["with-frame", ["each", [x], names, _g720]];
    _g719.scope = true;
    return(join(_g719, _g718));
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g737 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g738 = ["table"];
    _g738._scope = scope;
    return(["do", ["add", "environment", _g738], ["let", [x, join(["do"], _g737)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "compiler"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"define-reader": {export: true, macro: function (_g739) {
    var char = _g739[0];
    var stream = _g739[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g740 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g740)]);
  }}, delimiters: {variable: true}, eof: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-char": {variable: true}, "read-from-string": {export: true, variable: true}, "read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, whitespace: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"%": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "<": {export: true, variable: true}, "<=": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, ">=": {export: true, variable: true}, abs: {export: true, variable: true}, acos: {export: true, variable: true}, add: {export: true, variable: true}, apply: {export: true, variable: true}, asin: {export: true, variable: true}, atan: {export: true, variable: true}, atan2: {export: true, variable: true}, "atom?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, cat: {export: true, variable: true}, ceil: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "composite?": {export: true, variable: true}, cos: {export: true, variable: true}, drop: {export: true, variable: true}, "empty?": {export: true, variable: true}, exclude: {export: true, variable: true}, exit: {export: true, variable: true}, extend: {export: true, variable: true}, find: {export: true, variable: true}, flat: {export: true, variable: true}, flat1: {export: true, variable: true}, floor: {export: true, variable: true}, fs: {variable: true}, "function?": {export: true, variable: true}, hd: {export: true, variable: true}, "id-count": {variable: true}, "id-literal?": {export: true, variable: true}, "in?": {export: true, variable: true}, inner: {export: true, variable: true}, "is?": {export: true, variable: true}, iterate: {export: true, variable: true}, join: {export: true, variable: true}, keep: {export: true, variable: true}, "keys?": {export: true, variable: true}, last: {export: true, variable: true}, length: {export: true, variable: true}, "list?": {export: true, variable: true}, log: {export: true, variable: true}, log10: {export: true, variable: true}, "make-id": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, math: {variable: true}, max: {export: true, variable: true}, min: {export: true, variable: true}, module: {export: true, variable: true}, "module-key": {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, "number?": {export: true, variable: true}, "one?": {export: true, variable: true}, pair: {export: true, variable: true}, pow: {export: true, variable: true}, print: {export: true, global: true}, random: {export: true, variable: true}, "read-file": {export: true, variable: true}, reduce: {export: true, variable: true}, replicate: {export: true, variable: true}, require: {export: true, global: true}, reverse: {export: true, variable: true}, sd: {export: true, variable: true}, search: {export: true, variable: true}, setenv: {export: true, variable: true}, sin: {export: true, variable: true}, sinh: {export: true, variable: true}, "some?": {export: true, variable: true}, sort: {export: true, variable: true}, space: {export: true, variable: true}, splice: {export: true, variable: true}, "splice?": {variable: true}, split: {export: true, variable: true}, sqrt: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "string?": {export: true, variable: true}, sub: {export: true, variable: true}, sublist: {export: true, variable: true}, substring: {export: true, variable: true}, "table?": {export: true, variable: true}, tan: {export: true, variable: true}, tanh: {export: true, variable: true}, td: {export: true, variable: true}, tl: {export: true, variable: true}, today: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, type: {variable: true}, unstash: {export: true, variable: true}, write: {export: true, variable: true}, "write-file": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g775;
    if (target === "lua") {
      _g775 = "{";
    } else {
      _g775 = "[";
    }
    var open = _g775;
    var _g776;
    if (target === "lua") {
      _g776 = "}";
    } else {
      _g776 = "]";
    }
    var close = _g776;
    var str = "";
    var _g758 = forms;
    var i = 0;
    while (i < length(_g758)) {
      var x = _g758[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%for": {export: true, foo: true, special: function (t, k, form) {
    var _g750 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g751 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g751;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g750 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g750 + ") {\n" + body + ind + "}\n");
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
    var _g743 = compile(cond);
    indent_level = indent_level + 1;
    var _g746 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g744 = _g746;
    var _g769;
    if (alt) {
      indent_level = indent_level + 1;
      var _g747 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g769 = _g747;
    }
    var _g745 = _g769;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g743 + ") {\n" + _g744 + ind + "}";
    } else {
      str = str + ind + "if " + _g743 + " then\n" + _g744;
    }
    if (_g745 && target === "js") {
      str = str + " else {\n" + _g745 + ind + "}";
    } else {
      if (_g745) {
        str = str + ind + "else\n" + _g745;
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
    var _g772;
    if (is63(value)) {
      _g772 = " = " + value1;
    } else {
      _g772 = "";
    }
    var rh = _g772;
    var _g773;
    if (target === "js") {
      _g773 = "var ";
    } else {
      _g773 = "local ";
    }
    var keyword = _g773;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, "%local-function": {export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true, tr: true}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g777;
    if (target === "lua") {
      _g777 = " = ";
    } else {
      _g777 = ": ";
    }
    var sep = _g777;
    var pairs = sortk(pair(forms), hd);
    var _g759 = pairs;
    var i = 0;
    while (i < length(_g759)) {
      var _g760 = _g759[i];
      var k = _g760[0];
      var v = _g760[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + string(k));
      }
      var _g761 = compile(v);
      var _g778;
      if (valid_id63(k)) {
        _g778 = k;
      } else {
        var _g779;
        if (target === "js" && string_literal63(k)) {
          _g779 = k;
        } else {
          var _g780;
          if (target === "js") {
            _g780 = quoted(k);
          } else {
            var _g781;
            if (string_literal63(k)) {
              _g781 = "[" + k + "]";
            } else {
              _g781 = "[" + quoted(k) + "]";
            }
            _g780 = _g781;
          }
          _g779 = _g780;
        }
        _g778 = _g779;
      }
      var _g762 = _g778;
      str = str + _g762 + sep + _g761;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }}, "%try": {export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g752 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g752;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g753 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g753;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true, tr: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "do": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g741 = forms;
    var _g742 = 0;
    while (_g742 < length(_g741)) {
      var x = _g741[_g742];
      str = str + compile(x, {_stash: true, stmt: true});
      _g742 = _g742 + 1;
    }
    return(str);
  }, stmt: true, tr: true}, "error": {export: true, foo: true, special: function (x) {
    var _g771;
    if (target === "js") {
      _g771 = "throw new " + compile(["Error", x]);
    } else {
      _g771 = "error(" + compile(x) + ")";
    }
    var e = _g771;
    return(indentation() + e);
  }, stmt: true}, "get": {export: true, foo: true, special: function (t, k) {
    var _g757 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g757, 0) === "{") {
      _g757 = "(" + _g757 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g757 + "." + inner(k));
    } else {
      return(_g757 + "[" + k1 + "]");
    }
  }}, "not": {}, "return": {export: true, foo: true, special: function (x) {
    var _g770;
    if (nil63(x)) {
      _g770 = "return";
    } else {
      _g770 = "return(" + compile(x) + ")";
    }
    var _g754 = _g770;
    return(indentation() + _g754);
  }, stmt: true}, "set": {export: true, foo: true, special: function (lh, rh) {
    var _g755 = compile(lh);
    var _g774;
    if (nil63(rh)) {
      _g774 = "nil";
    } else {
      _g774 = rh;
    }
    var _g756 = compile(_g774);
    return(indentation() + _g755 + " = " + _g756);
  }, stmt: true}, "while": {export: true, foo: true, special: function (cond, form) {
    var _g748 = compile(cond);
    indent_level = indent_level + 1;
    var _g749 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g749;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g748 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g748 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true, tr: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "utilities"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/utilities": {export: {bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, "bound?": {export: true, variable: true}, "can-unquote?": {variable: true}, escape: {variable: true}, getenv: {export: true, variable: true}, "global?": {variable: true}, id: {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {export: true, global: true}, indentation: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, linked: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, mapo: {export: true, variable: true}, "numeric?": {variable: true}, quasiexpand: {export: true, variable: true}, "quasiquote-list": {variable: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, "quote-environment": {export: true, variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "quote-modules": {export: true, variable: true}, quoted: {export: true, variable: true}, "quoting?": {variable: true}, reserved: {variable: true}, "reserved?": {export: true, variable: true}, sortk: {export: true, variable: true}, "special-form?": {export: true, variable: true}, "special?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "valid-char?": {variable: true}, "valid-id?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g763 = sub(body, 0);
    var alias = _g763.alias;
    var exp = _g763.export;
    var imp = _g763.import;
    var _g764 = import_modules(imp);
    var imports = _g764[0];
    var bindings = _g764[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g765 = exp || [];
    var _g766 = 0;
    while (_g766 < length(_g765)) {
      var x = _g765[_g766];
      setenv(x, {_stash: true, export: true});
      _g766 = _g766 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g782 = nexus["lumen/runtime"];
  var _37 = _g782["%"];
  var _37message_handler = _g782["%message-handler"];
  var _42 = _g782["*"];
  var _43 = _g782["+"];
  var _ = _g782["-"];
  var _47 = _g782["/"];
  var _60 = _g782["<"];
  var _6061 = _g782["<="];
  var _61 = _g782["="];
  var _62 = _g782[">"];
  var _6261 = _g782[">="];
  var abs = _g782.abs;
  var acos = _g782.acos;
  var add = _g782.add;
  var apply = _g782.apply;
  var asin = _g782.asin;
  var atan = _g782.atan;
  var atan2 = _g782.atan2;
  var atom63 = _g782["atom?"];
  var boolean63 = _g782["boolean?"];
  var cat = _g782.cat;
  var ceil = _g782.ceil;
  var char = _g782.char;
  var code = _g782.code;
  var composite63 = _g782["composite?"];
  var cos = _g782.cos;
  var drop = _g782.drop;
  var empty63 = _g782["empty?"];
  var exclude = _g782.exclude;
  var exit = _g782.exit;
  var extend = _g782.extend;
  var find = _g782.find;
  var flat = _g782.flat;
  var flat1 = _g782.flat1;
  var floor = _g782.floor;
  var function63 = _g782["function?"];
  var hd = _g782.hd;
  var id_literal63 = _g782["id-literal?"];
  var in63 = _g782["in?"];
  var inner = _g782.inner;
  var is63 = _g782["is?"];
  var iterate = _g782.iterate;
  var join = _g782.join;
  var keep = _g782.keep;
  var keys63 = _g782["keys?"];
  var last = _g782.last;
  var length = _g782.length;
  var list63 = _g782["list?"];
  var log = _g782.log;
  var log10 = _g782.log10;
  var make_id = _g782["make-id"];
  var map = _g782.map;
  var max = _g782.max;
  var min = _g782.min;
  var module = _g782.module;
  var module_key = _g782["module-key"];
  var nil63 = _g782["nil?"];
  var none63 = _g782["none?"];
  var now = _g782.now;
  var number = _g782.number;
  var number63 = _g782["number?"];
  var one63 = _g782["one?"];
  var pair = _g782.pair;
  var pow = _g782.pow;
  var random = _g782.random;
  var read_file = _g782["read-file"];
  var reduce = _g782.reduce;
  var replicate = _g782.replicate;
  var reverse = _g782.reverse;
  var sd = _g782.sd;
  var search = _g782.search;
  var setenv = _g782.setenv;
  var sin = _g782.sin;
  var sinh = _g782.sinh;
  var some63 = _g782["some?"];
  var sort = _g782.sort;
  var space = _g782.space;
  var splice = _g782.splice;
  var split = _g782.split;
  var sqrt = _g782.sqrt;
  var stash = _g782.stash;
  var string = _g782.string;
  var string_literal63 = _g782["string-literal?"];
  var string63 = _g782["string?"];
  var sub = _g782.sub;
  var sublist = _g782.sublist;
  var substring = _g782.substring;
  var table63 = _g782["table?"];
  var tan = _g782.tan;
  var tanh = _g782.tanh;
  var td = _g782.td;
  var tl = _g782.tl;
  var today = _g782.today;
  var toplevel63 = _g782["toplevel?"];
  var unstash = _g782.unstash;
  var write = _g782.write;
  var write_file = _g782["write-file"];
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
  var sublist = _g2.sublist;
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
    var _g785 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g787) {
        return([false, _g787.message]);
      }
    })();
    var _g1 = _g785[0];
    var x = _g785[1];
    if (is63(x)) {
      return(print(string(x) + " "));
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
    print(string("usage: lumen [options] <module>") + " ");
    print(string("options:") + " ");
    print(string("  -o <output>\tOutput file") + " ");
    print(string("  -t <target>\tTarget language (default: lua)") + " ");
    print(string("  -e <expr>\tExpression to evaluate") + " ");
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
    var _g786 = args;
    var i = 0;
    while (i < length(_g786)) {
      var arg = _g786[i];
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
  };
  nexus["lumen/main"].main = main;
  main();
})();
