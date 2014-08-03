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
  var sub = function (x, from, upto) {
    if (string63(x)) {
      return(substring(x, from || 0, upto));
    } else {
      var l = [];
      var j = 0;
      var _g68;
      if (nil63(from) || from < 0) {
        _g68 = 0;
      } else {
        _g68 = from;
      }
      var i = _g68;
      var n = length(x);
      var _g69;
      if (nil63(upto) || upto > n) {
        _g69 = n;
      } else {
        _g69 = upto;
      }
      var _g26 = _g69;
      while (i < _g26) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g27 = x;
      var k = undefined;
      for (k in _g27) {
        var v = _g27[k];
        var _g28 = parseInt(k);
        var _g70;
        if (isNaN(_g28)) {
          _g70 = k;
        } else {
          _g70 = _g28;
        }
        var _g29 = _g70;
        if (!number63(_g29)) {
          l[_g29] = v;
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
  var join = function (a, b) {
    if (a && b) {
      var c = [];
      var o = length(a);
      var _g30 = a;
      var k = undefined;
      for (k in _g30) {
        var v = _g30[k];
        var _g31 = parseInt(k);
        var _g71;
        if (isNaN(_g31)) {
          _g71 = k;
        } else {
          _g71 = _g31;
        }
        var _g32 = _g71;
        c[_g32] = v;
      }
      var _g33 = b;
      var k = undefined;
      for (k in _g33) {
        var v = _g33[k];
        var _g34 = parseInt(k);
        var _g72;
        if (isNaN(_g34)) {
          _g72 = k;
        } else {
          _g72 = _g34;
        }
        var _g35 = _g72;
        if (number63(_g35)) {
          _g35 = _g35 + o;
        }
        c[_g35] = v;
      }
      return(c);
    } else {
      return(a || b || []);
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
  var shift = function (k, n) {
    if (number63(k)) {
      return(k - n);
    } else {
      return(k);
    }
  };
  nexus["lumen/runtime"].shift = shift;
  var keep = function (f, x) {
    var t = [];
    var o = 0;
    var _g36 = x;
    var k = undefined;
    for (k in _g36) {
      var v = _g36[k];
      var _g37 = parseInt(k);
      var _g73;
      if (isNaN(_g37)) {
        _g73 = k;
      } else {
        _g73 = _g37;
      }
      var _g38 = _g73;
      if (f(v)) {
        t[shift(_g38, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g39 = t;
    var _g19 = undefined;
    for (_g19 in _g39) {
      var y = _g39[_g19];
      var _g40 = parseInt(_g19);
      var _g74;
      if (isNaN(_g40)) {
        _g74 = _g19;
      } else {
        _g74 = _g40;
      }
      var _g41 = _g74;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g42 = t;
    var _g20 = undefined;
    for (_g20 in _g42) {
      var x = _g42[_g20];
      var _g43 = parseInt(_g20);
      var _g75;
      if (isNaN(_g43)) {
        _g75 = _g20;
      } else {
        _g75 = _g43;
      }
      var _g44 = _g75;
      var _g45 = f(x);
      if (_g45) {
        return(_g45);
      }
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
    var _g76;
    if (f) {
      _g76 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g76));
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
  var series = function (f, l) {
    return(iterate(function (i) {
      return(f(l[i]));
    }, length(l)));
  };
  nexus["lumen/runtime"].series = series;
  var map = function (f, x) {
    var t = [];
    var o = 0;
    var _g46 = x;
    var k = undefined;
    for (k in _g46) {
      var v = _g46[k];
      var _g47 = parseInt(k);
      var _g77;
      if (isNaN(_g47)) {
        _g77 = k;
      } else {
        _g77 = _g47;
      }
      var _g48 = _g77;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g48, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _g49 = t;
    var k = undefined;
    for (k in _g49) {
      var _g21 = _g49[k];
      var _g50 = parseInt(k);
      var _g78;
      if (isNaN(_g50)) {
        _g78 = k;
      } else {
        _g78 = _g50;
      }
      var _g51 = _g78;
      if (!number63(_g51)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _g52 = t;
    var _g22 = undefined;
    for (_g22 in _g52) {
      var _g23 = _g52[_g22];
      var _g53 = parseInt(_g22);
      var _g79;
      if (isNaN(_g53)) {
        _g79 = _g22;
      } else {
        _g79 = _g53;
      }
      var _g54 = _g79;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g55 = args;
      var k = undefined;
      for (k in _g55) {
        if (isNaN(parseInt(k))) {
          var v = _g55[k];
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
        var _g56 = l;
        var k = undefined;
        for (k in _g56) {
          if (isNaN(parseInt(k))) {
            var v = _g56[k];
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
  var search = function (str, pattern, start) {
    var i = str.indexOf(pattern, start);
    if (i >= 0) {
      return(i);
    }
  };
  nexus["lumen/runtime"].search = search;
  var split = function (str, sep) {
    if (str === "" || sep === "") {
      return([]);
    } else {
      var strs = [];
      while (true) {
        var i = search(str, sep);
        if (nil63(i)) {
          break;
        } else {
          add(strs, sub(str, 0, i));
          str = sub(str, i + 1);
        }
      }
      add(strs, str);
      return(strs);
    }
  };
  nexus["lumen/runtime"].split = split;
  var cat = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g57 = sub(xs, 0);
    if (none63(_g57)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g57));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g58 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g58));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g59 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g59)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g60 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g60));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g61 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g61)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g62 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g62)));
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
            var _g63 = x;
            var k = undefined;
            for (k in _g63) {
              if (isNaN(parseInt(k))) {
                var v = _g63[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g64 = x1;
            var i = 0;
            while (i < length(_g64)) {
              var y = _g64[i];
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
    var _g65 = stash(args);
    return(f.apply(f, _g65));
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
    var _g66 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g67 = _g66;
      var k1 = undefined;
      for (k1 in _g67) {
        if (isNaN(parseInt(k1))) {
          var v = _g67[k1];
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
  var _g83 = nexus["lumen/runtime"];
  var nil63 = _g83["nil?"];
  var is63 = _g83["is?"];
  var length = _g83.length;
  var none63 = _g83["none?"];
  var some63 = _g83["some?"];
  var one63 = _g83["one?"];
  var hd = _g83.hd;
  var string63 = _g83["string?"];
  var number63 = _g83["number?"];
  var boolean63 = _g83["boolean?"];
  var function63 = _g83["function?"];
  var composite63 = _g83["composite?"];
  var atom63 = _g83["atom?"];
  var table63 = _g83["table?"];
  var list63 = _g83["list?"];
  var substring = _g83.substring;
  var sub = _g83.sub;
  var inner = _g83.inner;
  var tl = _g83.tl;
  var char = _g83.char;
  var code = _g83.code;
  var string_literal63 = _g83["string-literal?"];
  var id_literal63 = _g83["id-literal?"];
  var add = _g83.add;
  var drop = _g83.drop;
  var last = _g83.last;
  var reverse = _g83.reverse;
  var join = _g83.join;
  var reduce = _g83.reduce;
  var keep = _g83.keep;
  var in63 = _g83["in?"];
  var find = _g83.find;
  var pair = _g83.pair;
  var sort = _g83.sort;
  var iterate = _g83.iterate;
  var replicate = _g83.replicate;
  var series = _g83.series;
  var map = _g83.map;
  var keys63 = _g83["keys?"];
  var empty63 = _g83["empty?"];
  var stash = _g83.stash;
  var unstash = _g83.unstash;
  var search = _g83.search;
  var split = _g83.split;
  var cat = _g83.cat;
  var _43 = _g83["+"];
  var _ = _g83["-"];
  var _42 = _g83["*"];
  var _47 = _g83["/"];
  var _37 = _g83["%"];
  var _62 = _g83[">"];
  var _60 = _g83["<"];
  var _61 = _g83["="];
  var _6261 = _g83[">="];
  var _6061 = _g83["<="];
  var read_file = _g83["read-file"];
  var write_file = _g83["write-file"];
  var write = _g83.write;
  var exit = _g83.exit;
  var today = _g83.today;
  var now = _g83.now;
  var number = _g83.number;
  var string = _g83.string;
  var space = _g83.space;
  var apply = _g83.apply;
  var make_id = _g83["make-id"];
  var _37message_handler = _g83["%message-handler"];
  var toplevel63 = _g83["toplevel?"];
  var module_key = _g83["module-key"];
  var module = _g83.module;
  var setenv = _g83.setenv;
  var getenv = function (k, p) {
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (is63(b)) {
        if (p) {
          return(b[p]);
        } else {
          return(b);
        }
      }
    }
  };
  nexus["lumen/lib"].getenv = getenv;
  var macro_function = function (k) {
    return(getenv(k, "macro"));
  };
  nexus["lumen/lib"]["macro-function"] = macro_function;
  var macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  nexus["lumen/lib"]["macro?"] = macro63;
  var special63 = function (k) {
    return(is63(getenv(k, "special")));
  };
  nexus["lumen/lib"]["special?"] = special63;
  var special_form63 = function (form) {
    return(list63(form) && special63(hd(form)));
  };
  nexus["lumen/lib"]["special-form?"] = special_form63;
  var statement63 = function (k) {
    return(special63(k) && getenv(k, "stmt"));
  };
  nexus["lumen/lib"]["statement?"] = statement63;
  var symbol_expansion = function (k) {
    return(getenv(k, "symbol"));
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
    return(getenv(k, "global"));
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
      var _g121;
      if (c === "\n") {
        _g121 = "\\n";
      } else {
        var _g122;
        if (c === "\"") {
          _g122 = "\\\"";
        } else {
          var _g123;
          if (c === "\\") {
            _g123 = "\\\\";
          } else {
            _g123 = c;
          }
          _g122 = _g123;
        }
        _g121 = _g122;
      }
      var c1 = _g121;
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
      var _g86 = args;
      var k = undefined;
      for (k in _g86) {
        if (isNaN(parseInt(k))) {
          var v = _g86[k];
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
        var _g87 = lh;
        var i = 0;
        while (i < length(_g87)) {
          var x = _g87[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g88 = lh;
        var k = undefined;
        for (k in _g88) {
          if (isNaN(parseInt(k))) {
            var v = _g88[k];
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
      var _g89 = args;
      var _g90 = 0;
      while (_g90 < length(_g89)) {
        var arg = _g89[_g90];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g90 = _g90 + 1;
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
          var _g80 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g81 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g93 = args;
            var _g94 = 0;
            while (_g94 < length(_g93)) {
              var _g91 = _g93[_g94];
              setenv(_g91, {_stash: true, variable: true});
              _g94 = _g94 + 1;
            }
            var _g92 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g92);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g82 = form[0];
              var _g95 = form[1];
              var _g96 = form[2];
              var _g97 = sub(form, 3);
              add(environment, {_scope: true});
              var _g100 = _g96;
              var _g101 = 0;
              while (_g101 < length(_g100)) {
                var _g98 = _g100[_g101];
                setenv(_g98, {_stash: true, variable: true});
                _g101 = _g101 + 1;
              }
              var _g99 = join([x, _g95, _g96], macroexpand(_g97));
              drop(environment);
              return(_g99);
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
    var _g102 = form;
    var k = undefined;
    for (k in _g102) {
      if (isNaN(parseInt(k))) {
        var v = _g102[k];
        var _g124;
        if (quasisplice63(v, depth)) {
          _g124 = quasiexpand(v[1]);
        } else {
          _g124 = quasiexpand(v, depth);
        }
        var _g103 = _g124;
        last(xs)[k] = _g103;
      }
    }
    var _g104 = form;
    var _g105 = 0;
    while (_g105 < length(_g104)) {
      var x = _g104[_g105];
      if (quasisplice63(x, depth)) {
        var _g106 = quasiexpand(x[1]);
        add(xs, _g106);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g105 = _g105 + 1;
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
      var _g125;
      if (c === "-") {
        _g125 = "_";
      } else {
        var _g126;
        if (valid_code63(n)) {
          _g126 = c;
        } else {
          var _g127;
          if (i === 0) {
            _g127 = "_" + n;
          } else {
            _g127 = n;
          }
          _g126 = _g127;
        }
        _g125 = _g126;
      }
      var c1 = _g125;
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
    var _g111 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g112 = _g111.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g113 = module(spec).export;
      var n = undefined;
      for (n in _g113) {
        if (isNaN(parseInt(n))) {
          var b = _g113[n];
          if (b.variable && (_g112 || b.export)) {
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
  var link = function (name, form) {
    if (toplevel63()) {
      var k = module_key(current_module);
      return(["do", form, ["set", ["get", ["get", "nexus", ["quote", k]], ["quote", name]], name]]);
    } else {
      return(form);
    }
  };
  nexus["lumen/lib"].link = link;
  var extend = function (t) {
    var xs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g114 = sub(xs, 0);
    return(join(t, _g114));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g115 = sub(keys, 0);
    var t1 = [];
    var _g116 = t;
    var _g117 = 0;
    while (_g117 < length(_g116)) {
      var x = _g116[_g117];
      add(t1, x);
      _g117 = _g117 + 1;
    }
    var _g118 = t;
    var k = undefined;
    for (k in _g118) {
      if (isNaN(parseInt(k))) {
        var v = _g118[k];
        if (!_g115[k]) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  };
  nexus["lumen/lib"].exclude = exclude;
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
    var _g119 = t;
    var k = undefined;
    for (k in _g119) {
      if (isNaN(parseInt(k))) {
        var v = _g119[k];
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
    var _g120 = ["table"];
    _g120.import = quoted(m.import);
    _g120.alias = quoted(m.alias);
    _g120.export = quote_frame(m.export);
    return(_g120);
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
  var _g128 = nexus["lumen/runtime"];
  var nil63 = _g128["nil?"];
  var is63 = _g128["is?"];
  var length = _g128.length;
  var none63 = _g128["none?"];
  var some63 = _g128["some?"];
  var one63 = _g128["one?"];
  var hd = _g128.hd;
  var string63 = _g128["string?"];
  var number63 = _g128["number?"];
  var boolean63 = _g128["boolean?"];
  var function63 = _g128["function?"];
  var composite63 = _g128["composite?"];
  var atom63 = _g128["atom?"];
  var table63 = _g128["table?"];
  var list63 = _g128["list?"];
  var substring = _g128.substring;
  var sub = _g128.sub;
  var inner = _g128.inner;
  var tl = _g128.tl;
  var char = _g128.char;
  var code = _g128.code;
  var string_literal63 = _g128["string-literal?"];
  var id_literal63 = _g128["id-literal?"];
  var add = _g128.add;
  var drop = _g128.drop;
  var last = _g128.last;
  var reverse = _g128.reverse;
  var join = _g128.join;
  var reduce = _g128.reduce;
  var keep = _g128.keep;
  var in63 = _g128["in?"];
  var find = _g128.find;
  var pair = _g128.pair;
  var sort = _g128.sort;
  var iterate = _g128.iterate;
  var replicate = _g128.replicate;
  var series = _g128.series;
  var map = _g128.map;
  var keys63 = _g128["keys?"];
  var empty63 = _g128["empty?"];
  var stash = _g128.stash;
  var unstash = _g128.unstash;
  var search = _g128.search;
  var split = _g128.split;
  var cat = _g128.cat;
  var _43 = _g128["+"];
  var _ = _g128["-"];
  var _42 = _g128["*"];
  var _47 = _g128["/"];
  var _37 = _g128["%"];
  var _62 = _g128[">"];
  var _60 = _g128["<"];
  var _61 = _g128["="];
  var _6261 = _g128[">="];
  var _6061 = _g128["<="];
  var read_file = _g128["read-file"];
  var write_file = _g128["write-file"];
  var write = _g128.write;
  var exit = _g128.exit;
  var today = _g128.today;
  var now = _g128.now;
  var number = _g128.number;
  var string = _g128.string;
  var space = _g128.space;
  var apply = _g128.apply;
  var make_id = _g128["make-id"];
  var _37message_handler = _g128["%message-handler"];
  var toplevel63 = _g128["toplevel?"];
  var module_key = _g128["module-key"];
  var module = _g128.module;
  var setenv = _g128.setenv;
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
  var _g139 = nexus["lumen/runtime"];
  var nil63 = _g139["nil?"];
  var is63 = _g139["is?"];
  var length = _g139.length;
  var none63 = _g139["none?"];
  var some63 = _g139["some?"];
  var one63 = _g139["one?"];
  var hd = _g139.hd;
  var string63 = _g139["string?"];
  var number63 = _g139["number?"];
  var boolean63 = _g139["boolean?"];
  var function63 = _g139["function?"];
  var composite63 = _g139["composite?"];
  var atom63 = _g139["atom?"];
  var table63 = _g139["table?"];
  var list63 = _g139["list?"];
  var substring = _g139.substring;
  var sub = _g139.sub;
  var inner = _g139.inner;
  var tl = _g139.tl;
  var char = _g139.char;
  var code = _g139.code;
  var string_literal63 = _g139["string-literal?"];
  var id_literal63 = _g139["id-literal?"];
  var add = _g139.add;
  var drop = _g139.drop;
  var last = _g139.last;
  var reverse = _g139.reverse;
  var join = _g139.join;
  var reduce = _g139.reduce;
  var keep = _g139.keep;
  var in63 = _g139["in?"];
  var find = _g139.find;
  var pair = _g139.pair;
  var sort = _g139.sort;
  var iterate = _g139.iterate;
  var replicate = _g139.replicate;
  var series = _g139.series;
  var map = _g139.map;
  var keys63 = _g139["keys?"];
  var empty63 = _g139["empty?"];
  var stash = _g139.stash;
  var unstash = _g139.unstash;
  var search = _g139.search;
  var split = _g139.split;
  var cat = _g139.cat;
  var _43 = _g139["+"];
  var _ = _g139["-"];
  var _42 = _g139["*"];
  var _47 = _g139["/"];
  var _37 = _g139["%"];
  var _62 = _g139[">"];
  var _60 = _g139["<"];
  var _61 = _g139["="];
  var _6261 = _g139[">="];
  var _6061 = _g139["<="];
  var read_file = _g139["read-file"];
  var write_file = _g139["write-file"];
  var write = _g139.write;
  var exit = _g139.exit;
  var today = _g139.today;
  var now = _g139.now;
  var number = _g139.number;
  var string = _g139.string;
  var space = _g139.space;
  var apply = _g139.apply;
  var make_id = _g139["make-id"];
  var _37message_handler = _g139["%message-handler"];
  var toplevel63 = _g139["toplevel?"];
  var module_key = _g139["module-key"];
  var module = _g139.module;
  var setenv = _g139.setenv;
  var _g142 = nexus["lumen/lib"];
  var getenv = _g142.getenv;
  var macro_function = _g142["macro-function"];
  var macro63 = _g142["macro?"];
  var special63 = _g142["special?"];
  var special_form63 = _g142["special-form?"];
  var statement63 = _g142["statement?"];
  var symbol_expansion = _g142["symbol-expansion"];
  var symbol63 = _g142["symbol?"];
  var variable63 = _g142["variable?"];
  var bound63 = _g142["bound?"];
  var quoted = _g142.quoted;
  var stash42 = _g142["stash*"];
  var bind = _g142.bind;
  var bind42 = _g142["bind*"];
  var quasiexpand = _g142.quasiexpand;
  var macroexpand = _g142.macroexpand;
  var indentation = _g142.indentation;
  var reserved63 = _g142["reserved?"];
  var valid_id63 = _g142["valid-id?"];
  var id = _g142.id;
  var key = _g142.key;
  var imported = _g142.imported;
  var link = _g142.link;
  var mapo = _g142.mapo;
  var quote_environment = _g142["quote-environment"];
  var quote_modules = _g142["quote-modules"];
  var initial_environment = _g142["initial-environment"];
  var _g143 = nexus["lumen/reader"];
  var make_stream = _g143["make-stream"];
  var read_table = _g143["read-table"];
  var read = _g143.read;
  var read_all = _g143["read-all"];
  var read_from_string = _g143["read-from-string"];
  var _g147 = [];
  _g147.js = "!";
  _g147.lua = "not ";
  var _g145 = [];
  var _g148 = [];
  _g148.js = "!";
  _g148.lua = "not ";
  _g145["not"] = _g148;
  var _g150 = [];
  _g150["*"] = true;
  _g150["/"] = true;
  _g150["%"] = true;
  var _g152 = [];
  _g152["+"] = true;
  _g152["-"] = true;
  var _g156 = [];
  _g156.js = "+";
  _g156.lua = "..";
  var _g154 = [];
  var _g157 = [];
  _g157.js = "+";
  _g157.lua = "..";
  _g154.cat = _g157;
  var _g159 = [];
  _g159["<"] = true;
  _g159[">"] = true;
  _g159["<="] = true;
  _g159[">="] = true;
  var _g163 = [];
  _g163.js = "===";
  _g163.lua = "==";
  var _g165 = [];
  _g165.js = "!=";
  _g165.lua = "~=";
  var _g161 = [];
  var _g166 = [];
  _g166.js = "===";
  _g166.lua = "==";
  _g161["="] = _g166;
  var _g167 = [];
  _g167.js = "!=";
  _g167.lua = "~=";
  _g161["~="] = _g167;
  var _g171 = [];
  _g171.js = "&&";
  _g171.lua = "and";
  var _g169 = [];
  var _g172 = [];
  _g172.js = "&&";
  _g172.lua = "and";
  _g169["and"] = _g172;
  var _g176 = [];
  _g176.js = "||";
  _g176.lua = "or";
  var _g174 = [];
  var _g177 = [];
  _g177.js = "||";
  _g177.lua = "or";
  _g174["or"] = _g177;
  var infix = [_g145, _g150, _g152, _g154, _g159, _g161, _g169, _g174];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g178 = infix;
      var i = 0;
      while (i < length(_g178)) {
        var level = _g178[i];
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
    var _g179 = args;
    var i = 0;
    while (i < length(_g179)) {
      var arg = _g179[i];
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
    var _g180 = getenv(x);
    var special = _g180.special;
    var stmt = _g180.stmt;
    var self_tr63 = _g180.tr;
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
    var _g181 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g181.right;
    var _g210;
    if (right) {
      _g210 = _6261;
    } else {
      _g210 = _62;
    }
    if (_g210(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g182 = sub(form, 1);
    var a = _g182[0];
    var b = _g182[1];
    var _g183 = op_delims(form, a);
    var ao = _g183[0];
    var ac = _g183[1];
    var _g184 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g184[0];
    var bc = _g184[1];
    var _g185 = compile(a);
    var _g186 = compile(b);
    var _g187 = getop(op);
    if (unary63(form)) {
      return(_g187 + ao + _g185 + ac);
    } else {
      return(ao + _g185 + ac + " " + _g187 + " " + bo + _g186 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g188 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g188.name;
    var prefix = _g188.prefix;
    var _g211;
    if (name) {
      _g211 = compile(name);
    } else {
      _g211 = "";
    }
    var id = _g211;
    var _g189 = prefix || "";
    var _g190 = compile_args(args);
    indent_level = indent_level + 1;
    var _g192 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g191 = _g192;
    var ind = indentation();
    var _g212;
    if (target === "js") {
      _g212 = "";
    } else {
      _g212 = "end";
    }
    var tr = _g212;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g190 + " {\n" + _g191 + ind + "}" + tr);
    } else {
      return(_g189 + "function " + id + _g190 + "\n" + _g191 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g193 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g193.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g213;
        if (stmt) {
          _g213 = indentation();
        } else {
          _g213 = "";
        }
        var ind = _g213;
        var _g214;
        if (atom63(form)) {
          _g214 = compile_atom(form);
        } else {
          var _g215;
          if (infix63(hd(form))) {
            _g215 = compile_infix(form);
          } else {
            _g215 = compile_call(form);
          }
          _g214 = _g215;
        }
        var _g194 = _g214;
        return(ind + _g194 + tr);
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
    var _g195 = sub(args, 0, length(args) - 1);
    var _g196 = 0;
    while (_g196 < length(_g195)) {
      var x = _g195[_g196];
      add(hoist, lower(x, hoist, stmt63));
      _g196 = _g196 + 1;
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
    var _g197 = args[1];
    var _g198 = args[2];
    if (stmt63 || tail63) {
      var _g217;
      if (_g198) {
        _g217 = [lower_body([_g198], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g197], tail63)], _g217)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g216;
      if (_g198) {
        _g216 = [lower(["set", e, _g198])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g197])], _g216));
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
      var _g218;
      if (x === "and") {
        _g218 = ["%if", id, b, id];
      } else {
        _g218 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g218], hoist));
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
    var _g199 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g199, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g200 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g200)) {
      return(_g200);
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
    var _g201 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g202 = _g201.all;
    var m = module(spec);
    var frame = last(environment);
    var _g203 = m.export;
    var k = undefined;
    for (k in _g203) {
      if (isNaN(parseInt(k))) {
        var v = _g203[k];
        if (v.export || _g202) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g204 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g205 = _g204.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g205}));
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  var in_module = function (spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    series(open_module, m.import);
    current_module = spec;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    var _g206 = specs || [];
    var _g207 = 0;
    while (_g207 < length(_g206)) {
      var spec = _g206[_g207];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g208 = import_modules(m.alias);
        var aliased = _g208[0];
        var bs = _g208[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g209 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g209);
      }
      _g207 = _g207 + 1;
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
    var imports = [];
    var m = module(current_module);
    series(function (spec) {
      imports = join(imports, imported(spec));
    }, m.import);
    return(join(imports, imported(current_module, {_stash: true, all: true})));
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
  var _g219 = nexus["lumen/runtime"];
  var nil63 = _g219["nil?"];
  var is63 = _g219["is?"];
  var length = _g219.length;
  var none63 = _g219["none?"];
  var some63 = _g219["some?"];
  var one63 = _g219["one?"];
  var hd = _g219.hd;
  var string63 = _g219["string?"];
  var number63 = _g219["number?"];
  var boolean63 = _g219["boolean?"];
  var function63 = _g219["function?"];
  var composite63 = _g219["composite?"];
  var atom63 = _g219["atom?"];
  var table63 = _g219["table?"];
  var list63 = _g219["list?"];
  var substring = _g219.substring;
  var sub = _g219.sub;
  var inner = _g219.inner;
  var tl = _g219.tl;
  var char = _g219.char;
  var code = _g219.code;
  var string_literal63 = _g219["string-literal?"];
  var id_literal63 = _g219["id-literal?"];
  var add = _g219.add;
  var drop = _g219.drop;
  var last = _g219.last;
  var reverse = _g219.reverse;
  var join = _g219.join;
  var reduce = _g219.reduce;
  var keep = _g219.keep;
  var in63 = _g219["in?"];
  var find = _g219.find;
  var pair = _g219.pair;
  var sort = _g219.sort;
  var iterate = _g219.iterate;
  var replicate = _g219.replicate;
  var series = _g219.series;
  var map = _g219.map;
  var keys63 = _g219["keys?"];
  var empty63 = _g219["empty?"];
  var stash = _g219.stash;
  var unstash = _g219.unstash;
  var search = _g219.search;
  var split = _g219.split;
  var cat = _g219.cat;
  var _43 = _g219["+"];
  var _ = _g219["-"];
  var _42 = _g219["*"];
  var _47 = _g219["/"];
  var _37 = _g219["%"];
  var _62 = _g219[">"];
  var _60 = _g219["<"];
  var _61 = _g219["="];
  var _6261 = _g219[">="];
  var _6061 = _g219["<="];
  var read_file = _g219["read-file"];
  var write_file = _g219["write-file"];
  var write = _g219.write;
  var exit = _g219.exit;
  var today = _g219.today;
  var now = _g219.now;
  var number = _g219.number;
  var string = _g219.string;
  var space = _g219.space;
  var apply = _g219.apply;
  var make_id = _g219["make-id"];
  var _37message_handler = _g219["%message-handler"];
  var toplevel63 = _g219["toplevel?"];
  var module_key = _g219["module-key"];
  var module = _g219.module;
  var setenv = _g219.setenv;
  var _g222 = nexus["lumen/lib"];
  var getenv = _g222.getenv;
  var macro_function = _g222["macro-function"];
  var macro63 = _g222["macro?"];
  var special63 = _g222["special?"];
  var special_form63 = _g222["special-form?"];
  var statement63 = _g222["statement?"];
  var symbol_expansion = _g222["symbol-expansion"];
  var symbol63 = _g222["symbol?"];
  var variable63 = _g222["variable?"];
  var bound63 = _g222["bound?"];
  var quoted = _g222.quoted;
  var stash42 = _g222["stash*"];
  var bind = _g222.bind;
  var bind42 = _g222["bind*"];
  var quasiexpand = _g222.quasiexpand;
  var macroexpand = _g222.macroexpand;
  var indentation = _g222.indentation;
  var reserved63 = _g222["reserved?"];
  var valid_id63 = _g222["valid-id?"];
  var id = _g222.id;
  var key = _g222.key;
  var imported = _g222.imported;
  var link = _g222.link;
  var mapo = _g222.mapo;
  var quote_environment = _g222["quote-environment"];
  var quote_modules = _g222["quote-modules"];
  var initial_environment = _g222["initial-environment"];
  var _g223 = nexus["lumen/compiler"];
  var compile_function = _g223["compile-function"];
  var compile = _g223.compile;
  var open_module = _g223["open-module"];
  var load_module = _g223["load-module"];
  var in_module = _g223["in-module"];
  var import_modules = _g223["import-modules"];
  var compile_module = _g223["compile-module"];
  var declare = _g223.declare;
  var eval = _g223.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g397 = nexus["lumen/runtime"];
  var nil63 = _g397["nil?"];
  var is63 = _g397["is?"];
  var length = _g397.length;
  var none63 = _g397["none?"];
  var some63 = _g397["some?"];
  var one63 = _g397["one?"];
  var hd = _g397.hd;
  var string63 = _g397["string?"];
  var number63 = _g397["number?"];
  var boolean63 = _g397["boolean?"];
  var function63 = _g397["function?"];
  var composite63 = _g397["composite?"];
  var atom63 = _g397["atom?"];
  var table63 = _g397["table?"];
  var list63 = _g397["list?"];
  var substring = _g397.substring;
  var sub = _g397.sub;
  var inner = _g397.inner;
  var tl = _g397.tl;
  var char = _g397.char;
  var code = _g397.code;
  var string_literal63 = _g397["string-literal?"];
  var id_literal63 = _g397["id-literal?"];
  var add = _g397.add;
  var drop = _g397.drop;
  var last = _g397.last;
  var reverse = _g397.reverse;
  var join = _g397.join;
  var reduce = _g397.reduce;
  var keep = _g397.keep;
  var in63 = _g397["in?"];
  var find = _g397.find;
  var pair = _g397.pair;
  var sort = _g397.sort;
  var iterate = _g397.iterate;
  var replicate = _g397.replicate;
  var series = _g397.series;
  var map = _g397.map;
  var keys63 = _g397["keys?"];
  var empty63 = _g397["empty?"];
  var stash = _g397.stash;
  var unstash = _g397.unstash;
  var search = _g397.search;
  var split = _g397.split;
  var cat = _g397.cat;
  var _43 = _g397["+"];
  var _ = _g397["-"];
  var _42 = _g397["*"];
  var _47 = _g397["/"];
  var _37 = _g397["%"];
  var _62 = _g397[">"];
  var _60 = _g397["<"];
  var _61 = _g397["="];
  var _6261 = _g397[">="];
  var _6061 = _g397["<="];
  var read_file = _g397["read-file"];
  var write_file = _g397["write-file"];
  var write = _g397.write;
  var exit = _g397.exit;
  var today = _g397.today;
  var now = _g397.now;
  var number = _g397.number;
  var string = _g397.string;
  var space = _g397.space;
  var apply = _g397.apply;
  var make_id = _g397["make-id"];
  var _37message_handler = _g397["%message-handler"];
  var toplevel63 = _g397["toplevel?"];
  var module_key = _g397["module-key"];
  var module = _g397.module;
  var setenv = _g397.setenv;
  var _g400 = nexus["lumen/lib"];
  var getenv = _g400.getenv;
  var macro_function = _g400["macro-function"];
  var macro63 = _g400["macro?"];
  var special63 = _g400["special?"];
  var special_form63 = _g400["special-form?"];
  var statement63 = _g400["statement?"];
  var symbol_expansion = _g400["symbol-expansion"];
  var symbol63 = _g400["symbol?"];
  var variable63 = _g400["variable?"];
  var bound63 = _g400["bound?"];
  var quoted = _g400.quoted;
  var stash42 = _g400["stash*"];
  var bind = _g400.bind;
  var bind42 = _g400["bind*"];
  var quasiexpand = _g400.quasiexpand;
  var macroexpand = _g400.macroexpand;
  var indentation = _g400.indentation;
  var reserved63 = _g400["reserved?"];
  var valid_id63 = _g400["valid-id?"];
  var id = _g400.id;
  var key = _g400.key;
  var imported = _g400.imported;
  var link = _g400.link;
  var mapo = _g400.mapo;
  var quote_environment = _g400["quote-environment"];
  var quote_modules = _g400["quote-modules"];
  var initial_environment = _g400["initial-environment"];
  var _g401 = nexus["lumen/compiler"];
  var compile_function = _g401["compile-function"];
  var compile = _g401.compile;
  var open_module = _g401["open-module"];
  var load_module = _g401["load-module"];
  var in_module = _g401["in-module"];
  var import_modules = _g401["import-modules"];
  var compile_module = _g401["compile-module"];
  var declare = _g401.declare;
  var eval = _g401.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g710 = nexus["lumen/runtime"];
  var nil63 = _g710["nil?"];
  var is63 = _g710["is?"];
  var length = _g710.length;
  var none63 = _g710["none?"];
  var some63 = _g710["some?"];
  var one63 = _g710["one?"];
  var hd = _g710.hd;
  var string63 = _g710["string?"];
  var number63 = _g710["number?"];
  var boolean63 = _g710["boolean?"];
  var function63 = _g710["function?"];
  var composite63 = _g710["composite?"];
  var atom63 = _g710["atom?"];
  var table63 = _g710["table?"];
  var list63 = _g710["list?"];
  var substring = _g710.substring;
  var sub = _g710.sub;
  var inner = _g710.inner;
  var tl = _g710.tl;
  var char = _g710.char;
  var code = _g710.code;
  var string_literal63 = _g710["string-literal?"];
  var id_literal63 = _g710["id-literal?"];
  var add = _g710.add;
  var drop = _g710.drop;
  var last = _g710.last;
  var reverse = _g710.reverse;
  var join = _g710.join;
  var reduce = _g710.reduce;
  var keep = _g710.keep;
  var in63 = _g710["in?"];
  var find = _g710.find;
  var pair = _g710.pair;
  var sort = _g710.sort;
  var iterate = _g710.iterate;
  var replicate = _g710.replicate;
  var series = _g710.series;
  var map = _g710.map;
  var keys63 = _g710["keys?"];
  var empty63 = _g710["empty?"];
  var stash = _g710.stash;
  var unstash = _g710.unstash;
  var search = _g710.search;
  var split = _g710.split;
  var cat = _g710.cat;
  var _43 = _g710["+"];
  var _ = _g710["-"];
  var _42 = _g710["*"];
  var _47 = _g710["/"];
  var _37 = _g710["%"];
  var _62 = _g710[">"];
  var _60 = _g710["<"];
  var _61 = _g710["="];
  var _6261 = _g710[">="];
  var _6061 = _g710["<="];
  var read_file = _g710["read-file"];
  var write_file = _g710["write-file"];
  var write = _g710.write;
  var exit = _g710.exit;
  var today = _g710.today;
  var now = _g710.now;
  var number = _g710.number;
  var string = _g710.string;
  var space = _g710.space;
  var apply = _g710.apply;
  var make_id = _g710["make-id"];
  var _37message_handler = _g710["%message-handler"];
  var toplevel63 = _g710["toplevel?"];
  var module_key = _g710["module-key"];
  var module = _g710.module;
  var setenv = _g710.setenv;
  var _g713 = nexus["lumen/lib"];
  var getenv = _g713.getenv;
  var macro_function = _g713["macro-function"];
  var macro63 = _g713["macro?"];
  var special63 = _g713["special?"];
  var special_form63 = _g713["special-form?"];
  var statement63 = _g713["statement?"];
  var symbol_expansion = _g713["symbol-expansion"];
  var symbol63 = _g713["symbol?"];
  var variable63 = _g713["variable?"];
  var bound63 = _g713["bound?"];
  var quoted = _g713.quoted;
  var stash42 = _g713["stash*"];
  var bind = _g713.bind;
  var bind42 = _g713["bind*"];
  var quasiexpand = _g713.quasiexpand;
  var macroexpand = _g713.macroexpand;
  var indentation = _g713.indentation;
  var reserved63 = _g713["reserved?"];
  var valid_id63 = _g713["valid-id?"];
  var id = _g713.id;
  var key = _g713.key;
  var imported = _g713.imported;
  var link = _g713.link;
  var mapo = _g713.mapo;
  var quote_environment = _g713["quote-environment"];
  var quote_modules = _g713["quote-modules"];
  var initial_environment = _g713["initial-environment"];
  var _g714 = nexus["lumen/compiler"];
  var compile_function = _g714["compile-function"];
  var compile = _g714.compile;
  var open_module = _g714["open-module"];
  var load_module = _g714["load-module"];
  var in_module = _g714["in-module"];
  var import_modules = _g714["import-modules"];
  var compile_module = _g714["compile-module"];
  var declare = _g714.declare;
  var eval = _g714.eval;
  global.modules = {user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {export: true, global: true}, fs: {variable: true}, print: {export: true, global: true}, "id-count": {variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {export: {quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, at: {export: true, macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g727 = body;
      var k = undefined;
      for (k in _g727) {
        if (isNaN(parseInt(k))) {
          var v = _g727[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g728) {
      var a = _g728[0];
      var b = _g728[1];
      var c = sub(_g728, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }}, when: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g729 = sub(body, 0);
    return(["if", cond, join(["do"], _g729)]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g730 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g730)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g731 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g731));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g732 = bind(lh, rh);
      var _g733 = 0;
      while (_g733 < length(_g732)) {
        var _g734 = _g732[_g733];
        var id = _g734[0];
        var val = _g734[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g733 = _g733 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g731)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g735 = sub(body, 0);
    var imp = _g735.import;
    var exp = _g735.export;
    var alias = _g735.alias;
    var _g736 = import_modules(imp);
    var imports = _g736[0];
    var bindings = _g736[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g737 = exp || [];
    var _g738 = 0;
    while (_g738 < length(_g737)) {
      var x = _g737[_g738];
      setenv(x, {_stash: true, export: true});
      _g738 = _g738 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g739 = sub(body, 0);
    var form = join(["fn", args], _g739);
    var _g740 = ["setenv", ["quote", name]];
    _g740.macro = form;
    _g740.form = ["quote", form];
    eval(_g740);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g741 = sub(body, 0);
    var form = join(["fn", args], _g741);
    var keys = sub(_g741, length(_g741));
    var _g742 = ["setenv", ["quote", name]];
    _g742.special = form;
    _g742.form = ["quote", form];
    eval(join(_g742, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g743 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g743)) {
      var _g744 = bind42(x, _g743);
      var args = _g744[0];
      var _g745 = _g744[1];
      return(join(["%global-function", name, args], _g745));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g746 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g746) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g746)]));
    } else {
      if (some63(_g746)) {
        var _g747 = bind42(x, _g746);
        var args = _g747[0];
        var _g748 = _g747[1];
        return(link(name, join(["%local-function", name, args], _g748)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g749) {
    var names = _g749[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g750 = sub(body, 0);
    var x = make_id();
    var _g752 = ["setenv", x];
    _g752.variable = true;
    var _g751 = ["with-frame", ["each", [x], names, _g752]];
    _g751.scope = true;
    return(join(_g751, _g750));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g753 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g754 = join(["do"], macroexpand(_g753));
    drop(environment);
    return(_g754);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g755 = sub(body, 0);
    add(environment, {});
    map(function (_g757) {
      var name = _g757[0];
      var exp = _g757[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g756 = join(["do"], macroexpand(_g755));
    drop(environment);
    return(_g756);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g758 = sub(body, 0);
    var _g759 = bind42(args, _g758);
    var _g760 = _g759[0];
    var _g761 = _g759[1];
    return(join(["%function", _g760], _g761));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g762, t) {
    var k = _g762[0];
    var v = _g762[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g763 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g798;
    if (target === "lua") {
      _g798 = _g763;
    } else {
      _g798 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g763)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g798)]]);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g764 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g799;
    if (nil63(v)) {
      var _g800;
      if (b.i) {
        _g800 = "i";
      } else {
        _g800 = make_id();
      }
      var i = _g800;
      _g799 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g764), ["inc", i]]];
    } else {
      var _g765 = ["target"];
      _g765.js = ["isNaN", ["parseInt", k]];
      _g765.lua = ["not", ["number?", k]];
      _g799 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g765, join(["let", [v, ["get", t1, k]]], _g764)]]];
    }
    return(["let", [t1, t], _g799]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g766 = xs;
    var _g767 = 0;
    while (_g767 < length(_g766)) {
      var x = _g766[_g767];
      l[x] = true;
      _g767 = _g767 + 1;
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g768 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g768)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g769 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g769)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g770 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g771 = ["table"];
    _g771._scope = scope;
    return(["do", ["add", "environment", _g771], ["let", [x, join(["do"], _g770)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g772) {
    var char = _g772[0];
    var stream = _g772[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g773 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g773)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/lib": {export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {export: true, global: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {export: true, global: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"do": {stmt: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g774 = forms;
    var _g775 = 0;
    while (_g775 < length(_g774)) {
      var x = _g774[_g775];
      str = str + compile(x, {_stash: true, stmt: true});
      _g775 = _g775 + 1;
    }
    return(str);
  }, foo: true, export: true, tr: true}, "%if": {stmt: true, special: function (cond, cons, alt) {
    var _g776 = compile(cond);
    indent_level = indent_level + 1;
    var _g778 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g777 = _g778;
    var _g801;
    if (alt) {
      indent_level = indent_level + 1;
      var _g780 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g801 = _g780;
    }
    var _g779 = _g801;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g776 + ") {\n" + _g777 + ind + "}";
    } else {
      str = str + ind + "if " + _g776 + " then\n" + _g777;
    }
    if (_g779 && target === "js") {
      str = str + " else {\n" + _g779 + ind + "}";
    } else {
      if (_g779) {
        str = str + ind + "else\n" + _g779;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true, export: true, tr: true}, "while": {stmt: true, special: function (cond, form) {
    var _g781 = compile(cond);
    indent_level = indent_level + 1;
    var _g782 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g782;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g781 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g781 + " do\n" + body + ind + "end\n");
    }
  }, foo: true, export: true, tr: true}, "%for": {stmt: true, special: function (t, k, form) {
    var _g783 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g784 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g784;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g783 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g783 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true, export: true, tr: true}, "%try": {stmt: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g785 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g785;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g786 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g786;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true, export: true, tr: true}, "break": {export: true, stmt: true, special: function () {
    return(indentation() + "break");
  }, foo: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%global-function": {stmt: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true, export: true, tr: true}, "%local-function": {stmt: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true, export: true, tr: true}, "return": {export: true, stmt: true, special: function (x) {
    var _g802;
    if (nil63(x)) {
      _g802 = "return";
    } else {
      _g802 = "return(" + compile(x) + ")";
    }
    var _g787 = _g802;
    return(indentation() + _g787);
  }, foo: true}, error: {export: true, stmt: true, special: function (x) {
    var _g803;
    if (target === "js") {
      _g803 = "throw new " + compile(["Error", x]);
    } else {
      _g803 = "error(" + compile(x) + ")";
    }
    var e = _g803;
    return(indentation() + e);
  }, foo: true}, "%local": {export: true, stmt: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g804;
    if (is63(value)) {
      _g804 = " = " + value1;
    } else {
      _g804 = "";
    }
    var rh = _g804;
    var _g805;
    if (target === "js") {
      _g805 = "var ";
    } else {
      _g805 = "local ";
    }
    var keyword = _g805;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true}, set: {export: true, stmt: true, special: function (lh, rh) {
    var _g788 = compile(lh);
    var _g806;
    if (nil63(rh)) {
      _g806 = "nil";
    } else {
      _g806 = rh;
    }
    var _g789 = compile(_g806);
    return(indentation() + _g788 + " = " + _g789);
  }, foo: true}, get: {export: true, special: function (t, k) {
    var _g790 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g790, 0) === "{") {
      _g790 = "(" + _g790 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g790 + "." + inner(k));
    } else {
      return(_g790 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g807;
    if (target === "lua") {
      _g807 = "{";
    } else {
      _g807 = "[";
    }
    var open = _g807;
    var _g808;
    if (target === "lua") {
      _g808 = "}";
    } else {
      _g808 = "]";
    }
    var close = _g808;
    var str = "";
    var _g791 = forms;
    var i = 0;
    while (i < length(_g791)) {
      var x = _g791[i];
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
    var _g809;
    if (target === "lua") {
      _g809 = " = ";
    } else {
      _g809 = ": ";
    }
    var sep = _g809;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g792 = pairs;
    var i = 0;
    while (i < length(_g792)) {
      var _g793 = _g792[i];
      var k = _g793[0];
      var v = _g793[1];
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
  }, foo: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, lumen: {export: {}, import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g794 = sub(body, 0);
    var imp = _g794.import;
    var exp = _g794.export;
    var alias = _g794.alias;
    var _g795 = import_modules(imp);
    var imports = _g795[0];
    var bindings = _g795[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g796 = exp || [];
    var _g797 = 0;
    while (_g797 < length(_g796)) {
      var x = _g796[_g797];
      setenv(x, {_stash: true, export: true});
      _g797 = _g797 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g810 = nexus["lumen/runtime"];
  var nil63 = _g810["nil?"];
  var is63 = _g810["is?"];
  var length = _g810.length;
  var none63 = _g810["none?"];
  var some63 = _g810["some?"];
  var one63 = _g810["one?"];
  var hd = _g810.hd;
  var string63 = _g810["string?"];
  var number63 = _g810["number?"];
  var boolean63 = _g810["boolean?"];
  var function63 = _g810["function?"];
  var composite63 = _g810["composite?"];
  var atom63 = _g810["atom?"];
  var table63 = _g810["table?"];
  var list63 = _g810["list?"];
  var substring = _g810.substring;
  var sub = _g810.sub;
  var inner = _g810.inner;
  var tl = _g810.tl;
  var char = _g810.char;
  var code = _g810.code;
  var string_literal63 = _g810["string-literal?"];
  var id_literal63 = _g810["id-literal?"];
  var add = _g810.add;
  var drop = _g810.drop;
  var last = _g810.last;
  var reverse = _g810.reverse;
  var join = _g810.join;
  var reduce = _g810.reduce;
  var keep = _g810.keep;
  var in63 = _g810["in?"];
  var find = _g810.find;
  var pair = _g810.pair;
  var sort = _g810.sort;
  var iterate = _g810.iterate;
  var replicate = _g810.replicate;
  var series = _g810.series;
  var map = _g810.map;
  var keys63 = _g810["keys?"];
  var empty63 = _g810["empty?"];
  var stash = _g810.stash;
  var unstash = _g810.unstash;
  var search = _g810.search;
  var split = _g810.split;
  var cat = _g810.cat;
  var _43 = _g810["+"];
  var _ = _g810["-"];
  var _42 = _g810["*"];
  var _47 = _g810["/"];
  var _37 = _g810["%"];
  var _62 = _g810[">"];
  var _60 = _g810["<"];
  var _61 = _g810["="];
  var _6261 = _g810[">="];
  var _6061 = _g810["<="];
  var read_file = _g810["read-file"];
  var write_file = _g810["write-file"];
  var write = _g810.write;
  var exit = _g810.exit;
  var today = _g810.today;
  var now = _g810.now;
  var number = _g810.number;
  var string = _g810.string;
  var space = _g810.space;
  var apply = _g810.apply;
  var make_id = _g810["make-id"];
  var _37message_handler = _g810["%message-handler"];
  var toplevel63 = _g810["toplevel?"];
  var module_key = _g810["module-key"];
  var module = _g810.module;
  var setenv = _g810.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var code = _g2.code;
  var keep = _g2.keep;
  var module = _g2.module;
  var composite63 = _g2["composite?"];
  var write_file = _g2["write-file"];
  var iterate = _g2.iterate;
  var string = _g2.string;
  var number63 = _g2["number?"];
  var toplevel63 = _g2["toplevel?"];
  var join = _g2.join;
  var is63 = _g2["is?"];
  var drop = _g2.drop;
  var search = _g2.search;
  var in63 = _g2["in?"];
  var some63 = _g2["some?"];
  var write = _g2.write;
  var apply = _g2.apply;
  var _6261 = _g2[">="];
  var replicate = _g2.replicate;
  var _6061 = _g2["<="];
  var id_literal63 = _g2["id-literal?"];
  var inner = _g2.inner;
  var reverse = _g2.reverse;
  var space = _g2.space;
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var now = _g2.now;
  var _42 = _g2["*"];
  var _37 = _g2["%"];
  var string63 = _g2["string?"];
  var _47 = _g2["/"];
  var map = _g2.map;
  var _43 = _g2["+"];
  var list63 = _g2["list?"];
  var _ = _g2["-"];
  var exit = _g2.exit;
  var none63 = _g2["none?"];
  var stash = _g2.stash;
  var keys63 = _g2["keys?"];
  var _37message_handler = _g2["%message-handler"];
  var pair = _g2.pair;
  var char = _g2.char;
  var find = _g2.find;
  var table63 = _g2["table?"];
  var sub = _g2.sub;
  var boolean63 = _g2["boolean?"];
  var reduce = _g2.reduce;
  var function63 = _g2["function?"];
  var one63 = _g2["one?"];
  var unstash = _g2.unstash;
  var module_key = _g2["module-key"];
  var hd = _g2.hd;
  var atom63 = _g2["atom?"];
  var setenv = _g2.setenv;
  var make_id = _g2["make-id"];
  var number = _g2.number;
  var tl = _g2.tl;
  var substring = _g2.substring;
  var series = _g2.series;
  var sort = _g2.sort;
  var today = _g2.today;
  var last = _g2.last;
  var add = _g2.add;
  var string_literal63 = _g2["string-literal?"];
  var read_file = _g2["read-file"];
  var cat = _g2.cat;
  var empty63 = _g2["empty?"];
  var nil63 = _g2["nil?"];
  var split = _g2.split;
  var length = _g2.length;
  var _g5 = nexus["lumen/reader"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var _g6 = nexus["lumen/compiler"];
  var load_module = _g6["load-module"];
  var eval = _g6.eval;
  var compile_module = _g6["compile-module"];
  var import_modules = _g6["import-modules"];
  var open_module = _g6["open-module"];
  var declare = _g6.declare;
  var compile = _g6.compile;
  var in_module = _g6["in-module"];
  var compile_function = _g6["compile-function"];
  var rep = function (str) {
    var _g813 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g815) {
        return([false, _g815.message]);
      }
    })();
    var _g1 = _g813[0];
    var x = _g813[1];
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
    var _g814 = args;
    var i = 0;
    while (i < length(_g814)) {
      var arg = _g814[i];
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
