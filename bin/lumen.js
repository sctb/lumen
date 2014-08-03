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
      var _g72;
      if (nil63(from) || from < 0) {
        _g72 = 0;
      } else {
        _g72 = from;
      }
      var i = _g72;
      var n = length(x);
      var _g73;
      if (nil63(upto) || upto > n) {
        _g73 = n;
      } else {
        _g73 = upto;
      }
      var _g26 = _g73;
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
        var _g74;
        if (isNaN(_g28)) {
          _g74 = k;
        } else {
          _g74 = _g28;
        }
        var _g29 = _g74;
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
        var _g75;
        if (isNaN(_g31)) {
          _g75 = k;
        } else {
          _g75 = _g31;
        }
        var _g32 = _g75;
        c[_g32] = v;
      }
      var _g33 = b;
      var k = undefined;
      for (k in _g33) {
        var v = _g33[k];
        var _g34 = parseInt(k);
        var _g76;
        if (isNaN(_g34)) {
          _g76 = k;
        } else {
          _g76 = _g34;
        }
        var _g35 = _g76;
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
      var _g77;
      if (isNaN(_g37)) {
        _g77 = k;
      } else {
        _g77 = _g37;
      }
      var _g38 = _g77;
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
      var _g78;
      if (isNaN(_g40)) {
        _g78 = _g19;
      } else {
        _g78 = _g40;
      }
      var _g41 = _g78;
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
      var _g79;
      if (isNaN(_g43)) {
        _g79 = _g20;
      } else {
        _g79 = _g43;
      }
      var _g44 = _g79;
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
    var _g80;
    if (f) {
      _g80 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g80));
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
      var _g81;
      if (isNaN(_g47)) {
        _g81 = k;
      } else {
        _g81 = _g47;
      }
      var _g48 = _g81;
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
      var _g82;
      if (isNaN(_g50)) {
        _g82 = k;
      } else {
        _g82 = _g50;
      }
      var _g51 = _g82;
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
      var _g83;
      if (isNaN(_g53)) {
        _g83 = _g22;
      } else {
        _g83 = _g53;
      }
      var _g54 = _g83;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _g55 = args;
      var k = undefined;
      for (k in _g55) {
        var v = _g55[k];
        var _g56 = parseInt(k);
        var _g84;
        if (isNaN(_g56)) {
          _g84 = k;
        } else {
          _g84 = _g56;
        }
        var _g57 = _g84;
        if (!number63(_g57)) {
          p[_g57] = v;
        }
      }
      p._stash = true;
      add(args, p);
    }
    return(args);
  };
  nexus["lumen/runtime"].stash = stash;
  var unstash = function (args) {
    if (none63(args)) {
      return([]);
    } else {
      var l = last(args);
      if (table63(l) && l._stash) {
        var args1 = sub(args, 0, length(args) - 1);
        var _g58 = l;
        var k = undefined;
        for (k in _g58) {
          var v = _g58[k];
          var _g59 = parseInt(k);
          var _g85;
          if (isNaN(_g59)) {
            _g85 = k;
          } else {
            _g85 = _g59;
          }
          var _g60 = _g85;
          if (!(_g60 === "_stash")) {
            args1[_g60] = v;
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
    var _g61 = sub(xs, 0);
    if (none63(_g61)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g61));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g62 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g62));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g63 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g63)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g64 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g64));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g65 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g65)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g66 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g66)));
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
            var _g67 = x;
            var k = undefined;
            for (k in _g67) {
              if (isNaN(parseInt(k))) {
                var v = _g67[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g68 = x1;
            var i = 0;
            while (i < length(_g68)) {
              var y = _g68[i];
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
    var _g69 = stash(args);
    return(f.apply(f, _g69));
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
    var _g70 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g71 = _g70;
      var k1 = undefined;
      for (k1 in _g71) {
        if (isNaN(parseInt(k1))) {
          var v = _g71[k1];
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
  var _g89 = nexus["lumen/runtime"];
  var number = _g89.number;
  var find = _g89.find;
  var series = _g89.series;
  var last = _g89.last;
  var module_key = _g89["module-key"];
  var reduce = _g89.reduce;
  var none63 = _g89["none?"];
  var iterate = _g89.iterate;
  var composite63 = _g89["composite?"];
  var substring = _g89.substring;
  var exit = _g89.exit;
  var is63 = _g89["is?"];
  var split = _g89.split;
  var function63 = _g89["function?"];
  var pair = _g89.pair;
  var empty63 = _g89["empty?"];
  var tl = _g89.tl;
  var nil63 = _g89["nil?"];
  var unstash = _g89.unstash;
  var keys63 = _g89["keys?"];
  var _37 = _g89["%"];
  var replicate = _g89.replicate;
  var char = _g89.char;
  var space = _g89.space;
  var write_file = _g89["write-file"];
  var string = _g89.string;
  var list63 = _g89["list?"];
  var read_file = _g89["read-file"];
  var table63 = _g89["table?"];
  var string63 = _g89["string?"];
  var _60 = _g89["<"];
  var _61 = _g89["="];
  var _62 = _g89[">"];
  var now = _g89.now;
  var some63 = _g89["some?"];
  var inner = _g89.inner;
  var _47 = _g89["/"];
  var _43 = _g89["+"];
  var _ = _g89["-"];
  var join = _g89.join;
  var make_id = _g89["make-id"];
  var id_literal63 = _g89["id-literal?"];
  var in63 = _g89["in?"];
  var string_literal63 = _g89["string-literal?"];
  var _6261 = _g89[">="];
  var cat = _g89.cat;
  var setenv = _g89.setenv;
  var keep = _g89.keep;
  var module = _g89.module;
  var toplevel63 = _g89["toplevel?"];
  var search = _g89.search;
  var apply = _g89.apply;
  var add = _g89.add;
  var map = _g89.map;
  var atom63 = _g89["atom?"];
  var one63 = _g89["one?"];
  var today = _g89.today;
  var _6061 = _g89["<="];
  var boolean63 = _g89["boolean?"];
  var reverse = _g89.reverse;
  var hd = _g89.hd;
  var sub = _g89.sub;
  var stash = _g89.stash;
  var _37message_handler = _g89["%message-handler"];
  var _42 = _g89["*"];
  var length = _g89.length;
  var drop = _g89.drop;
  var code = _g89.code;
  var write = _g89.write;
  var sort = _g89.sort;
  var number63 = _g89["number?"];
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
      var _g127;
      if (c === "\n") {
        _g127 = "\\n";
      } else {
        var _g128;
        if (c === "\"") {
          _g128 = "\\\"";
        } else {
          var _g129;
          if (c === "\\") {
            _g129 = "\\\\";
          } else {
            _g129 = c;
          }
          _g128 = _g129;
        }
        _g127 = _g128;
      }
      var c1 = _g127;
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
      var _g92 = args;
      var k = undefined;
      for (k in _g92) {
        if (isNaN(parseInt(k))) {
          var v = _g92[k];
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
        var _g93 = lh;
        var i = 0;
        while (i < length(_g93)) {
          var x = _g93[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g94 = lh;
        var k = undefined;
        for (k in _g94) {
          if (isNaN(parseInt(k))) {
            var v = _g94[k];
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
      var _g95 = args;
      var _g96 = 0;
      while (_g96 < length(_g95)) {
        var arg = _g95[_g96];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g96 = _g96 + 1;
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
          var _g86 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g87 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g99 = args;
            var _g100 = 0;
            while (_g100 < length(_g99)) {
              var _g97 = _g99[_g100];
              setenv(_g97, {_stash: true, variable: true});
              _g100 = _g100 + 1;
            }
            var _g98 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g98);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g88 = form[0];
              var _g101 = form[1];
              var _g102 = form[2];
              var _g103 = sub(form, 3);
              add(environment, {_scope: true});
              var _g106 = _g102;
              var _g107 = 0;
              while (_g107 < length(_g106)) {
                var _g104 = _g106[_g107];
                setenv(_g104, {_stash: true, variable: true});
                _g107 = _g107 + 1;
              }
              var _g105 = join([x, _g101, _g102], macroexpand(_g103));
              drop(environment);
              return(_g105);
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
    var _g108 = form;
    var k = undefined;
    for (k in _g108) {
      if (isNaN(parseInt(k))) {
        var v = _g108[k];
        var _g130;
        if (quasisplice63(v, depth)) {
          _g130 = quasiexpand(v[1]);
        } else {
          _g130 = quasiexpand(v, depth);
        }
        var _g109 = _g130;
        last(xs)[k] = _g109;
      }
    }
    var _g110 = form;
    var _g111 = 0;
    while (_g111 < length(_g110)) {
      var x = _g110[_g111];
      if (quasisplice63(x, depth)) {
        var _g112 = quasiexpand(x[1]);
        add(xs, _g112);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g111 = _g111 + 1;
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
  var reserved = {"var": true, "or": true, "<=": true, "void": true, "else": true, "%": true, "*": true, "switch": true, ">=": true, "nil": true, "true": true, "throw": true, "if": true, "typeof": true, "case": true, ">": true, "do": true, "in": true, "not": true, "<": true, "==": true, "elseif": true, "false": true, "while": true, "catch": true, "+": true, "delete": true, "local": true, "with": true, "continue": true, "/": true, "try": true, "debugger": true, "default": true, "function": true, "new": true, "return": true, "repeat": true, "this": true, "until": true, "instanceof": true, "then": true, "-": true, "and": true, "=": true, "for": true, "break": true, "finally": true, "end": true};
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
      var _g131;
      if (c === "-") {
        _g131 = "_";
      } else {
        var _g132;
        if (valid_code63(n)) {
          _g132 = c;
        } else {
          var _g133;
          if (i === 0) {
            _g133 = "_" + n;
          } else {
            _g133 = n;
          }
          _g132 = _g133;
        }
        _g131 = _g132;
      }
      var c1 = _g131;
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
    var _g117 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g118 = _g117.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g119 = module(spec).export;
      var n = undefined;
      for (n in _g119) {
        if (isNaN(parseInt(n))) {
          var b = _g119[n];
          if (b.variable && (_g118 || b.export)) {
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
    var _g120 = sub(xs, 0);
    return(join(t, _g120));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g121 = sub(keys, 0);
    var t1 = [];
    var _g122 = t;
    var _g123 = 0;
    while (_g123 < length(_g122)) {
      var x = _g122[_g123];
      add(t1, x);
      _g123 = _g123 + 1;
    }
    var _g124 = t;
    var k = undefined;
    for (k in _g124) {
      if (isNaN(parseInt(k))) {
        var v = _g124[k];
        if (!_g121[k]) {
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
    var _g125 = t;
    var k = undefined;
    for (k in _g125) {
      if (isNaN(parseInt(k))) {
        var v = _g125[k];
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
    var _g126 = ["table"];
    _g126.import = quoted(m.import);
    _g126.export = quote_frame(m.export);
    _g126.alias = quoted(m.alias);
    return(_g126);
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
  var _g134 = nexus["lumen/runtime"];
  var number = _g134.number;
  var find = _g134.find;
  var series = _g134.series;
  var last = _g134.last;
  var module_key = _g134["module-key"];
  var reduce = _g134.reduce;
  var none63 = _g134["none?"];
  var iterate = _g134.iterate;
  var composite63 = _g134["composite?"];
  var substring = _g134.substring;
  var exit = _g134.exit;
  var is63 = _g134["is?"];
  var split = _g134.split;
  var function63 = _g134["function?"];
  var pair = _g134.pair;
  var empty63 = _g134["empty?"];
  var tl = _g134.tl;
  var nil63 = _g134["nil?"];
  var unstash = _g134.unstash;
  var keys63 = _g134["keys?"];
  var _37 = _g134["%"];
  var replicate = _g134.replicate;
  var char = _g134.char;
  var space = _g134.space;
  var write_file = _g134["write-file"];
  var string = _g134.string;
  var list63 = _g134["list?"];
  var read_file = _g134["read-file"];
  var table63 = _g134["table?"];
  var string63 = _g134["string?"];
  var _60 = _g134["<"];
  var _61 = _g134["="];
  var _62 = _g134[">"];
  var now = _g134.now;
  var some63 = _g134["some?"];
  var inner = _g134.inner;
  var _47 = _g134["/"];
  var _43 = _g134["+"];
  var _ = _g134["-"];
  var join = _g134.join;
  var make_id = _g134["make-id"];
  var id_literal63 = _g134["id-literal?"];
  var in63 = _g134["in?"];
  var string_literal63 = _g134["string-literal?"];
  var _6261 = _g134[">="];
  var cat = _g134.cat;
  var setenv = _g134.setenv;
  var keep = _g134.keep;
  var module = _g134.module;
  var toplevel63 = _g134["toplevel?"];
  var search = _g134.search;
  var apply = _g134.apply;
  var add = _g134.add;
  var map = _g134.map;
  var atom63 = _g134["atom?"];
  var one63 = _g134["one?"];
  var today = _g134.today;
  var _6061 = _g134["<="];
  var boolean63 = _g134["boolean?"];
  var reverse = _g134.reverse;
  var hd = _g134.hd;
  var sub = _g134.sub;
  var stash = _g134.stash;
  var _37message_handler = _g134["%message-handler"];
  var _42 = _g134["*"];
  var length = _g134.length;
  var drop = _g134.drop;
  var code = _g134.code;
  var write = _g134.write;
  var sort = _g134.sort;
  var number63 = _g134["number?"];
  var delimiters = {";": true, "\n": true, ")": true, "(": true};
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
  var _g145 = nexus["lumen/runtime"];
  var number = _g145.number;
  var find = _g145.find;
  var series = _g145.series;
  var last = _g145.last;
  var module_key = _g145["module-key"];
  var reduce = _g145.reduce;
  var none63 = _g145["none?"];
  var iterate = _g145.iterate;
  var composite63 = _g145["composite?"];
  var substring = _g145.substring;
  var exit = _g145.exit;
  var is63 = _g145["is?"];
  var split = _g145.split;
  var function63 = _g145["function?"];
  var pair = _g145.pair;
  var empty63 = _g145["empty?"];
  var tl = _g145.tl;
  var nil63 = _g145["nil?"];
  var unstash = _g145.unstash;
  var keys63 = _g145["keys?"];
  var _37 = _g145["%"];
  var replicate = _g145.replicate;
  var char = _g145.char;
  var space = _g145.space;
  var write_file = _g145["write-file"];
  var string = _g145.string;
  var list63 = _g145["list?"];
  var read_file = _g145["read-file"];
  var table63 = _g145["table?"];
  var string63 = _g145["string?"];
  var _60 = _g145["<"];
  var _61 = _g145["="];
  var _62 = _g145[">"];
  var now = _g145.now;
  var some63 = _g145["some?"];
  var inner = _g145.inner;
  var _47 = _g145["/"];
  var _43 = _g145["+"];
  var _ = _g145["-"];
  var join = _g145.join;
  var make_id = _g145["make-id"];
  var id_literal63 = _g145["id-literal?"];
  var in63 = _g145["in?"];
  var string_literal63 = _g145["string-literal?"];
  var _6261 = _g145[">="];
  var cat = _g145.cat;
  var setenv = _g145.setenv;
  var keep = _g145.keep;
  var module = _g145.module;
  var toplevel63 = _g145["toplevel?"];
  var search = _g145.search;
  var apply = _g145.apply;
  var add = _g145.add;
  var map = _g145.map;
  var atom63 = _g145["atom?"];
  var one63 = _g145["one?"];
  var today = _g145.today;
  var _6061 = _g145["<="];
  var boolean63 = _g145["boolean?"];
  var reverse = _g145.reverse;
  var hd = _g145.hd;
  var sub = _g145.sub;
  var stash = _g145.stash;
  var _37message_handler = _g145["%message-handler"];
  var _42 = _g145["*"];
  var length = _g145.length;
  var drop = _g145.drop;
  var code = _g145.code;
  var write = _g145.write;
  var sort = _g145.sort;
  var number63 = _g145["number?"];
  var _g148 = nexus["lumen/lib"];
  var bound63 = _g148["bound?"];
  var special_form63 = _g148["special-form?"];
  var indentation = _g148.indentation;
  var macro_function = _g148["macro-function"];
  var imported = _g148.imported;
  var key = _g148.key;
  var macro63 = _g148["macro?"];
  var quoted = _g148.quoted;
  var stash42 = _g148["stash*"];
  var variable63 = _g148["variable?"];
  var valid_id63 = _g148["valid-id?"];
  var getenv = _g148.getenv;
  var reserved63 = _g148["reserved?"];
  var link = _g148.link;
  var macroexpand = _g148.macroexpand;
  var mapo = _g148.mapo;
  var special63 = _g148["special?"];
  var symbol_expansion = _g148["symbol-expansion"];
  var bind42 = _g148["bind*"];
  var bind = _g148.bind;
  var id = _g148.id;
  var initial_environment = _g148["initial-environment"];
  var quote_environment = _g148["quote-environment"];
  var quote_modules = _g148["quote-modules"];
  var statement63 = _g148["statement?"];
  var symbol63 = _g148["symbol?"];
  var quasiexpand = _g148.quasiexpand;
  var _g149 = nexus["lumen/reader"];
  var read_table = _g149["read-table"];
  var read_from_string = _g149["read-from-string"];
  var read_all = _g149["read-all"];
  var read = _g149.read;
  var make_stream = _g149["make-stream"];
  var _g153 = [];
  _g153.lua = "not ";
  _g153.js = "!";
  var _g151 = [];
  var _g154 = [];
  _g154.lua = "not ";
  _g154.js = "!";
  _g151["not"] = _g154;
  var _g156 = [];
  _g156["/"] = true;
  _g156["%"] = true;
  _g156["*"] = true;
  var _g158 = [];
  _g158["+"] = true;
  _g158["-"] = true;
  var _g162 = [];
  _g162.lua = "..";
  _g162.js = "+";
  var _g160 = [];
  var _g163 = [];
  _g163.lua = "..";
  _g163.js = "+";
  _g160.cat = _g163;
  var _g165 = [];
  _g165["<="] = true;
  _g165["<"] = true;
  _g165[">="] = true;
  _g165[">"] = true;
  var _g169 = [];
  _g169.lua = "~=";
  _g169.js = "!=";
  var _g171 = [];
  _g171.lua = "==";
  _g171.js = "===";
  var _g167 = [];
  var _g172 = [];
  _g172.lua = "~=";
  _g172.js = "!=";
  _g167["~="] = _g172;
  var _g173 = [];
  _g173.lua = "==";
  _g173.js = "===";
  _g167["="] = _g173;
  var _g177 = [];
  _g177.lua = "and";
  _g177.js = "&&";
  var _g175 = [];
  var _g178 = [];
  _g178.lua = "and";
  _g178.js = "&&";
  _g175["and"] = _g178;
  var _g182 = [];
  _g182.lua = "or";
  _g182.js = "||";
  var _g180 = [];
  var _g183 = [];
  _g183.lua = "or";
  _g183.js = "||";
  _g180["or"] = _g183;
  var infix = [_g151, _g156, _g158, _g160, _g165, _g167, _g175, _g180];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g184 = infix;
      var i = 0;
      while (i < length(_g184)) {
        var level = _g184[i];
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
    var _g185 = args;
    var i = 0;
    while (i < length(_g185)) {
      var arg = _g185[i];
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
    var _g186 = getenv(x);
    var stmt = _g186.stmt;
    var special = _g186.special;
    var self_tr63 = _g186.tr;
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
    var _g187 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g187.right;
    var _g216;
    if (right) {
      _g216 = _6261;
    } else {
      _g216 = _62;
    }
    if (_g216(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g188 = sub(form, 1);
    var a = _g188[0];
    var b = _g188[1];
    var _g189 = op_delims(form, a);
    var ao = _g189[0];
    var ac = _g189[1];
    var _g190 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g190[0];
    var bc = _g190[1];
    var _g191 = compile(a);
    var _g192 = compile(b);
    var _g193 = getop(op);
    if (unary63(form)) {
      return(_g193 + ao + _g191 + ac);
    } else {
      return(ao + _g191 + ac + " " + _g193 + " " + bo + _g192 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g194 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g194.name;
    var prefix = _g194.prefix;
    var _g217;
    if (name) {
      _g217 = compile(name);
    } else {
      _g217 = "";
    }
    var id = _g217;
    var _g195 = prefix || "";
    var _g196 = compile_args(args);
    indent_level = indent_level + 1;
    var _g198 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g197 = _g198;
    var ind = indentation();
    var _g218;
    if (target === "js") {
      _g218 = "";
    } else {
      _g218 = "end";
    }
    var tr = _g218;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g196 + " {\n" + _g197 + ind + "}" + tr);
    } else {
      return(_g195 + "function " + id + _g196 + "\n" + _g197 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g199 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g199.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g219;
        if (stmt) {
          _g219 = indentation();
        } else {
          _g219 = "";
        }
        var ind = _g219;
        var _g220;
        if (atom63(form)) {
          _g220 = compile_atom(form);
        } else {
          var _g221;
          if (infix63(hd(form))) {
            _g221 = compile_infix(form);
          } else {
            _g221 = compile_call(form);
          }
          _g220 = _g221;
        }
        var _g200 = _g220;
        return(ind + _g200 + tr);
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
    var _g201 = sub(args, 0, length(args) - 1);
    var _g202 = 0;
    while (_g202 < length(_g201)) {
      var x = _g201[_g202];
      add(hoist, lower(x, hoist, stmt63));
      _g202 = _g202 + 1;
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
    var _g203 = args[1];
    var _g204 = args[2];
    if (stmt63 || tail63) {
      var _g223;
      if (_g204) {
        _g223 = [lower_body([_g204], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g203], tail63)], _g223)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g222;
      if (_g204) {
        _g222 = [lower(["set", e, _g204])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g203])], _g222));
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
      var _g224;
      if (x === "and") {
        _g224 = ["%if", id, b, id];
      } else {
        _g224 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g224], hoist));
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
    var _g205 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g205, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g206 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g206)) {
      return(_g206);
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
    var _g207 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g208 = _g207.all;
    var m = module(spec);
    var frame = last(environment);
    var _g209 = m.export;
    var k = undefined;
    for (k in _g209) {
      if (isNaN(parseInt(k))) {
        var v = _g209[k];
        if (v.export || _g208) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g210 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g211 = _g210.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g211}));
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
    var _g212 = specs || [];
    var _g213 = 0;
    while (_g213 < length(_g212)) {
      var spec = _g212[_g213];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g214 = import_modules(m.alias);
        var aliased = _g214[0];
        var bs = _g214[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g215 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g215);
      }
      _g213 = _g213 + 1;
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
  var _g225 = nexus["lumen/runtime"];
  var number = _g225.number;
  var find = _g225.find;
  var series = _g225.series;
  var last = _g225.last;
  var module_key = _g225["module-key"];
  var reduce = _g225.reduce;
  var none63 = _g225["none?"];
  var iterate = _g225.iterate;
  var composite63 = _g225["composite?"];
  var substring = _g225.substring;
  var exit = _g225.exit;
  var is63 = _g225["is?"];
  var split = _g225.split;
  var function63 = _g225["function?"];
  var pair = _g225.pair;
  var empty63 = _g225["empty?"];
  var tl = _g225.tl;
  var nil63 = _g225["nil?"];
  var unstash = _g225.unstash;
  var keys63 = _g225["keys?"];
  var _37 = _g225["%"];
  var replicate = _g225.replicate;
  var char = _g225.char;
  var space = _g225.space;
  var write_file = _g225["write-file"];
  var string = _g225.string;
  var list63 = _g225["list?"];
  var read_file = _g225["read-file"];
  var table63 = _g225["table?"];
  var string63 = _g225["string?"];
  var _60 = _g225["<"];
  var _61 = _g225["="];
  var _62 = _g225[">"];
  var now = _g225.now;
  var some63 = _g225["some?"];
  var inner = _g225.inner;
  var _47 = _g225["/"];
  var _43 = _g225["+"];
  var _ = _g225["-"];
  var join = _g225.join;
  var make_id = _g225["make-id"];
  var id_literal63 = _g225["id-literal?"];
  var in63 = _g225["in?"];
  var string_literal63 = _g225["string-literal?"];
  var _6261 = _g225[">="];
  var cat = _g225.cat;
  var setenv = _g225.setenv;
  var keep = _g225.keep;
  var module = _g225.module;
  var toplevel63 = _g225["toplevel?"];
  var search = _g225.search;
  var apply = _g225.apply;
  var add = _g225.add;
  var map = _g225.map;
  var atom63 = _g225["atom?"];
  var one63 = _g225["one?"];
  var today = _g225.today;
  var _6061 = _g225["<="];
  var boolean63 = _g225["boolean?"];
  var reverse = _g225.reverse;
  var hd = _g225.hd;
  var sub = _g225.sub;
  var stash = _g225.stash;
  var _37message_handler = _g225["%message-handler"];
  var _42 = _g225["*"];
  var length = _g225.length;
  var drop = _g225.drop;
  var code = _g225.code;
  var write = _g225.write;
  var sort = _g225.sort;
  var number63 = _g225["number?"];
  var _g228 = nexus["lumen/lib"];
  var bound63 = _g228["bound?"];
  var special_form63 = _g228["special-form?"];
  var indentation = _g228.indentation;
  var macro_function = _g228["macro-function"];
  var imported = _g228.imported;
  var key = _g228.key;
  var macro63 = _g228["macro?"];
  var quoted = _g228.quoted;
  var stash42 = _g228["stash*"];
  var variable63 = _g228["variable?"];
  var valid_id63 = _g228["valid-id?"];
  var getenv = _g228.getenv;
  var reserved63 = _g228["reserved?"];
  var link = _g228.link;
  var macroexpand = _g228.macroexpand;
  var mapo = _g228.mapo;
  var special63 = _g228["special?"];
  var symbol_expansion = _g228["symbol-expansion"];
  var bind42 = _g228["bind*"];
  var bind = _g228.bind;
  var id = _g228.id;
  var initial_environment = _g228["initial-environment"];
  var quote_environment = _g228["quote-environment"];
  var quote_modules = _g228["quote-modules"];
  var statement63 = _g228["statement?"];
  var symbol63 = _g228["symbol?"];
  var quasiexpand = _g228.quasiexpand;
  var _g229 = nexus["lumen/compiler"];
  var open_module = _g229["open-module"];
  var load_module = _g229["load-module"];
  var in_module = _g229["in-module"];
  var declare = _g229.declare;
  var import_modules = _g229["import-modules"];
  var compile = _g229.compile;
  var eval = _g229.eval;
  var compile_module = _g229["compile-module"];
  var compile_function = _g229["compile-function"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g403 = nexus["lumen/runtime"];
  var number = _g403.number;
  var find = _g403.find;
  var series = _g403.series;
  var last = _g403.last;
  var module_key = _g403["module-key"];
  var reduce = _g403.reduce;
  var none63 = _g403["none?"];
  var iterate = _g403.iterate;
  var composite63 = _g403["composite?"];
  var substring = _g403.substring;
  var exit = _g403.exit;
  var is63 = _g403["is?"];
  var split = _g403.split;
  var function63 = _g403["function?"];
  var pair = _g403.pair;
  var empty63 = _g403["empty?"];
  var tl = _g403.tl;
  var nil63 = _g403["nil?"];
  var unstash = _g403.unstash;
  var keys63 = _g403["keys?"];
  var _37 = _g403["%"];
  var replicate = _g403.replicate;
  var char = _g403.char;
  var space = _g403.space;
  var write_file = _g403["write-file"];
  var string = _g403.string;
  var list63 = _g403["list?"];
  var read_file = _g403["read-file"];
  var table63 = _g403["table?"];
  var string63 = _g403["string?"];
  var _60 = _g403["<"];
  var _61 = _g403["="];
  var _62 = _g403[">"];
  var now = _g403.now;
  var some63 = _g403["some?"];
  var inner = _g403.inner;
  var _47 = _g403["/"];
  var _43 = _g403["+"];
  var _ = _g403["-"];
  var join = _g403.join;
  var make_id = _g403["make-id"];
  var id_literal63 = _g403["id-literal?"];
  var in63 = _g403["in?"];
  var string_literal63 = _g403["string-literal?"];
  var _6261 = _g403[">="];
  var cat = _g403.cat;
  var setenv = _g403.setenv;
  var keep = _g403.keep;
  var module = _g403.module;
  var toplevel63 = _g403["toplevel?"];
  var search = _g403.search;
  var apply = _g403.apply;
  var add = _g403.add;
  var map = _g403.map;
  var atom63 = _g403["atom?"];
  var one63 = _g403["one?"];
  var today = _g403.today;
  var _6061 = _g403["<="];
  var boolean63 = _g403["boolean?"];
  var reverse = _g403.reverse;
  var hd = _g403.hd;
  var sub = _g403.sub;
  var stash = _g403.stash;
  var _37message_handler = _g403["%message-handler"];
  var _42 = _g403["*"];
  var length = _g403.length;
  var drop = _g403.drop;
  var code = _g403.code;
  var write = _g403.write;
  var sort = _g403.sort;
  var number63 = _g403["number?"];
  var _g406 = nexus["lumen/lib"];
  var bound63 = _g406["bound?"];
  var special_form63 = _g406["special-form?"];
  var indentation = _g406.indentation;
  var macro_function = _g406["macro-function"];
  var imported = _g406.imported;
  var key = _g406.key;
  var macro63 = _g406["macro?"];
  var quoted = _g406.quoted;
  var stash42 = _g406["stash*"];
  var variable63 = _g406["variable?"];
  var valid_id63 = _g406["valid-id?"];
  var getenv = _g406.getenv;
  var reserved63 = _g406["reserved?"];
  var link = _g406.link;
  var macroexpand = _g406.macroexpand;
  var mapo = _g406.mapo;
  var special63 = _g406["special?"];
  var symbol_expansion = _g406["symbol-expansion"];
  var bind42 = _g406["bind*"];
  var bind = _g406.bind;
  var id = _g406.id;
  var initial_environment = _g406["initial-environment"];
  var quote_environment = _g406["quote-environment"];
  var quote_modules = _g406["quote-modules"];
  var statement63 = _g406["statement?"];
  var symbol63 = _g406["symbol?"];
  var quasiexpand = _g406.quasiexpand;
  var _g407 = nexus["lumen/compiler"];
  var open_module = _g407["open-module"];
  var load_module = _g407["load-module"];
  var in_module = _g407["in-module"];
  var declare = _g407.declare;
  var import_modules = _g407["import-modules"];
  var compile = _g407.compile;
  var eval = _g407.eval;
  var compile_module = _g407["compile-module"];
  var compile_function = _g407["compile-function"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g716 = nexus["lumen/runtime"];
  var number = _g716.number;
  var find = _g716.find;
  var series = _g716.series;
  var last = _g716.last;
  var module_key = _g716["module-key"];
  var reduce = _g716.reduce;
  var none63 = _g716["none?"];
  var iterate = _g716.iterate;
  var composite63 = _g716["composite?"];
  var substring = _g716.substring;
  var exit = _g716.exit;
  var is63 = _g716["is?"];
  var split = _g716.split;
  var function63 = _g716["function?"];
  var pair = _g716.pair;
  var empty63 = _g716["empty?"];
  var tl = _g716.tl;
  var nil63 = _g716["nil?"];
  var unstash = _g716.unstash;
  var keys63 = _g716["keys?"];
  var _37 = _g716["%"];
  var replicate = _g716.replicate;
  var char = _g716.char;
  var space = _g716.space;
  var write_file = _g716["write-file"];
  var string = _g716.string;
  var list63 = _g716["list?"];
  var read_file = _g716["read-file"];
  var table63 = _g716["table?"];
  var string63 = _g716["string?"];
  var _60 = _g716["<"];
  var _61 = _g716["="];
  var _62 = _g716[">"];
  var now = _g716.now;
  var some63 = _g716["some?"];
  var inner = _g716.inner;
  var _47 = _g716["/"];
  var _43 = _g716["+"];
  var _ = _g716["-"];
  var join = _g716.join;
  var make_id = _g716["make-id"];
  var id_literal63 = _g716["id-literal?"];
  var in63 = _g716["in?"];
  var string_literal63 = _g716["string-literal?"];
  var _6261 = _g716[">="];
  var cat = _g716.cat;
  var setenv = _g716.setenv;
  var keep = _g716.keep;
  var module = _g716.module;
  var toplevel63 = _g716["toplevel?"];
  var search = _g716.search;
  var apply = _g716.apply;
  var add = _g716.add;
  var map = _g716.map;
  var atom63 = _g716["atom?"];
  var one63 = _g716["one?"];
  var today = _g716.today;
  var _6061 = _g716["<="];
  var boolean63 = _g716["boolean?"];
  var reverse = _g716.reverse;
  var hd = _g716.hd;
  var sub = _g716.sub;
  var stash = _g716.stash;
  var _37message_handler = _g716["%message-handler"];
  var _42 = _g716["*"];
  var length = _g716.length;
  var drop = _g716.drop;
  var code = _g716.code;
  var write = _g716.write;
  var sort = _g716.sort;
  var number63 = _g716["number?"];
  var _g719 = nexus["lumen/lib"];
  var bound63 = _g719["bound?"];
  var special_form63 = _g719["special-form?"];
  var indentation = _g719.indentation;
  var macro_function = _g719["macro-function"];
  var imported = _g719.imported;
  var key = _g719.key;
  var macro63 = _g719["macro?"];
  var quoted = _g719.quoted;
  var stash42 = _g719["stash*"];
  var variable63 = _g719["variable?"];
  var valid_id63 = _g719["valid-id?"];
  var getenv = _g719.getenv;
  var reserved63 = _g719["reserved?"];
  var link = _g719.link;
  var macroexpand = _g719.macroexpand;
  var mapo = _g719.mapo;
  var special63 = _g719["special?"];
  var symbol_expansion = _g719["symbol-expansion"];
  var bind42 = _g719["bind*"];
  var bind = _g719.bind;
  var id = _g719.id;
  var initial_environment = _g719["initial-environment"];
  var quote_environment = _g719["quote-environment"];
  var quote_modules = _g719["quote-modules"];
  var statement63 = _g719["statement?"];
  var symbol63 = _g719["symbol?"];
  var quasiexpand = _g719.quasiexpand;
  var _g720 = nexus["lumen/compiler"];
  var open_module = _g720["open-module"];
  var load_module = _g720["load-module"];
  var in_module = _g720["in-module"];
  var declare = _g720.declare;
  var import_modules = _g720["import-modules"];
  var compile = _g720.compile;
  var eval = _g720.eval;
  var compile_module = _g720["compile-module"];
  var compile_function = _g720["compile-function"];
  global.modules = {"lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {exclude: {variable: true}, "global?": {variable: true}, "bound?": {variable: true, export: true}, "special-form?": {variable: true, export: true}, "quote-binding": {variable: true}, literal: {variable: true}, indentation: {variable: true, export: true}, "macro-function": {variable: true, export: true}, imported: {variable: true, export: true}, key: {variable: true, export: true}, "quote-frame": {variable: true}, "indent-level": {global: true, export: true}, "macro?": {variable: true, export: true}, quoted: {variable: true, export: true}, escape: {variable: true}, reserved: {variable: true}, "stash*": {variable: true, export: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "variable?": {variable: true, export: true}, "valid-id?": {variable: true, export: true}, getenv: {variable: true, export: true}, "valid-code?": {variable: true}, "quasisplice?": {variable: true}, "reserved?": {variable: true, export: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, "quote-module": {variable: true}, link: {variable: true, export: true}, macroexpand: {variable: true, export: true}, "quasiquote-list": {variable: true}, mapo: {variable: true, export: true}, "special?": {variable: true, export: true}, "can-unquote?": {variable: true}, "symbol-expansion": {variable: true, export: true}, extend: {variable: true}, "bind*": {variable: true, export: true}, "numeric?": {variable: true}, bind: {variable: true, export: true}, id: {variable: true, export: true}, "initial-environment": {variable: true, export: true}, "quote-environment": {variable: true, export: true}, "quote-modules": {variable: true, export: true}, "statement?": {variable: true, export: true}, "symbol?": {variable: true, export: true}, quasiexpand: {variable: true, export: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {reimported: {variable: true}, getop: {variable: true}, "lower-body": {variable: true}, "open-module": {variable: true, export: true}, "load-module": {variable: true, export: true}, "%compile-module": {variable: true}, lower: {variable: true}, "compile-special": {variable: true}, "lower-function": {variable: true}, "in-module": {variable: true, export: true}, "lower-definition": {variable: true}, declare: {variable: true, export: true}, "unary?": {variable: true}, "lower-infix": {variable: true}, terminator: {variable: true}, "import-modules": {variable: true, export: true}, "%result": {global: true, export: true}, compile: {variable: true, export: true}, "lower-special": {variable: true}, "compile-atom": {variable: true}, conclude: {variable: true}, "infix?": {variable: true}, "compiler-output": {variable: true}, "module-path": {variable: true}, "lower-infix?": {variable: true}, "can-return?": {variable: true}, "compile-call": {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, encapsulate: {variable: true}, "current-module": {global: true, export: true}, "op-delims": {variable: true}, process: {variable: true}, "lower-call": {variable: true}, "lower-for": {variable: true}, "lower-do": {variable: true}, "parenthesize-call?": {variable: true}, "lower-while": {variable: true}, "compile-infix": {variable: true}, eval: {variable: true, export: true}, "compile-module": {variable: true, export: true}, "lower-try": {variable: true}, "lower-short": {variable: true}, precedence: {variable: true}, "compile-args": {variable: true}, "compile-function": {variable: true, export: true}, infix: {variable: true}, "lower-if": {variable: true}, "lower-statement": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {number: {variable: true, export: true}, find: {variable: true, export: true}, series: {variable: true, export: true}, last: {variable: true, export: true}, "module-key": {variable: true, export: true}, reduce: {variable: true, export: true}, shift: {variable: true}, "none?": {variable: true, export: true}, iterate: {variable: true, export: true}, "composite?": {variable: true, export: true}, substring: {variable: true, export: true}, exit: {variable: true, export: true}, fs: {variable: true}, "is?": {variable: true, export: true}, split: {variable: true, export: true}, "function?": {variable: true, export: true}, pair: {variable: true, export: true}, "empty?": {variable: true, export: true}, tl: {variable: true, export: true}, "nil?": {variable: true, export: true}, unstash: {variable: true, export: true}, "keys?": {variable: true, export: true}, "%": {variable: true, export: true}, replicate: {variable: true, export: true}, char: {variable: true, export: true}, space: {variable: true, export: true}, "write-file": {variable: true, export: true}, string: {variable: true, export: true}, "list?": {variable: true, export: true}, "read-file": {variable: true, export: true}, print: {global: true, export: true}, "table?": {variable: true, export: true}, "string?": {variable: true, export: true}, "<": {variable: true, export: true}, "=": {variable: true, export: true}, ">": {variable: true, export: true}, now: {variable: true, export: true}, "some?": {variable: true, export: true}, inner: {variable: true, export: true}, "/": {variable: true, export: true}, "+": {variable: true, export: true}, "-": {variable: true, export: true}, join: {variable: true, export: true}, "make-id": {variable: true, export: true}, "id-literal?": {variable: true, export: true}, "in?": {variable: true, export: true}, "string-literal?": {variable: true, export: true}, ">=": {variable: true, export: true}, cat: {variable: true, export: true}, "id-count": {variable: true}, require: {global: true, export: true}, type: {variable: true}, setenv: {variable: true, export: true}, keep: {variable: true, export: true}, module: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, search: {variable: true, export: true}, apply: {variable: true, export: true}, add: {variable: true, export: true}, map: {variable: true, export: true}, "atom?": {variable: true, export: true}, "one?": {variable: true, export: true}, today: {variable: true, export: true}, "<=": {variable: true, export: true}, "boolean?": {variable: true, export: true}, reverse: {variable: true, export: true}, hd: {variable: true, export: true}, sub: {variable: true, export: true}, stash: {variable: true, export: true}, "%message-handler": {variable: true, export: true}, "*": {variable: true, export: true}, length: {variable: true, export: true}, drop: {variable: true, export: true}, code: {variable: true, export: true}, write: {variable: true, export: true}, sort: {variable: true, export: true}, "number?": {variable: true, export: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {global: true, export: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {global: true, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%if": {tr: true, export: true, foo: true, special: function (cond, cons, alt) {
    var _g733 = compile(cond);
    indent_level = indent_level + 1;
    var _g735 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g734 = _g735;
    var _g804;
    if (alt) {
      indent_level = indent_level + 1;
      var _g737 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g804 = _g737;
    }
    var _g736 = _g804;
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
  }, stmt: true}, "return": {stmt: true, export: true, special: function (x) {
    var _g805;
    if (nil63(x)) {
      _g805 = "return";
    } else {
      _g805 = "return(" + compile(x) + ")";
    }
    var _g738 = _g805;
    return(indentation() + _g738);
  }, foo: true}, get: {export: true, special: function (t, k) {
    var _g739 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g739, 0) === "{") {
      _g739 = "(" + _g739 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g739 + "." + inner(k));
    } else {
      return(_g739 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%for": {tr: true, export: true, foo: true, special: function (t, k, form) {
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
  }, stmt: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "while": {tr: true, export: true, foo: true, special: function (cond, form) {
    var _g742 = compile(cond);
    indent_level = indent_level + 1;
    var _g743 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g743;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g742 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g742 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true}, "%try": {tr: true, export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g744 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g744;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g745 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g745;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true}, set: {stmt: true, export: true, special: function (lh, rh) {
    var _g746 = compile(lh);
    var _g806;
    if (nil63(rh)) {
      _g806 = "nil";
    } else {
      _g806 = rh;
    }
    var _g747 = compile(_g806);
    return(indentation() + _g746 + " = " + _g747);
  }, foo: true}, "%object": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g807;
    if (target === "lua") {
      _g807 = " = ";
    } else {
      _g807 = ": ";
    }
    var sep = _g807;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g748 = pairs;
    var i = 0;
    while (i < length(_g748)) {
      var _g749 = _g748[i];
      var k = _g749[0];
      var v = _g749[1];
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
  }, foo: true}, "do": {tr: true, export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g750 = forms;
    var _g751 = 0;
    while (_g751 < length(_g750)) {
      var x = _g750[_g751];
      str = str + compile(x, {_stash: true, stmt: true});
      _g751 = _g751 + 1;
    }
    return(str);
  }, stmt: true}, "break": {stmt: true, export: true, special: function () {
    return(indentation() + "break");
  }, foo: true}, "%local-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g808;
    if (target === "lua") {
      _g808 = "{";
    } else {
      _g808 = "[";
    }
    var open = _g808;
    var _g809;
    if (target === "lua") {
      _g809 = "}";
    } else {
      _g809 = "]";
    }
    var close = _g809;
    var str = "";
    var _g752 = forms;
    var i = 0;
    while (i < length(_g752)) {
      var x = _g752[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true}, "%local": {stmt: true, export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g810;
    if (is63(value)) {
      _g810 = " = " + value1;
    } else {
      _g810 = "";
    }
    var rh = _g810;
    var _g811;
    if (target === "js") {
      _g811 = "var ";
    } else {
      _g811 = "local ";
    }
    var keyword = _g811;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true}, "%global-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, stmt: true}, error: {stmt: true, export: true, special: function (x) {
    var _g812;
    if (target === "js") {
      _g812 = "throw new " + compile(["Error", x]);
    } else {
      _g812 = "error(" + compile(x) + ")";
    }
    var e = _g812;
    return(indentation() + e);
  }, foo: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"read-table": {variable: true, export: true}, "flag?": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "read-from-string": {variable: true, export: true}, "skip-non-code": {variable: true}, "read-char": {variable: true}, "read-all": {variable: true, export: true}, "peek-char": {variable: true}, delimiters: {variable: true}, read: {variable: true, export: true}, whitespace: {variable: true}, "define-reader": {macro: function (_g753) {
    var char = _g753[0];
    var stream = _g753[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g754 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g754)]);
  }, export: true}, "make-stream": {variable: true, export: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, lumen: {import: [["lumen", "special"]], export: {}, alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {language: {macro: function () {
    return(["quote", target]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, list: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g755 = body;
      var k = undefined;
      for (k in _g755) {
        if (isNaN(parseInt(k))) {
          var v = _g755[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g756 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g756) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g756)]));
    } else {
      if (some63(_g756)) {
        var _g757 = bind42(x, _g756);
        var args = _g757[0];
        var _g758 = _g757[1];
        return(link(name, join(["%local-function", name, args], _g758)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g759 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g759)]);
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, "with-bindings": {macro: function (_g760) {
    var names = _g760[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g761 = sub(body, 0);
    var x = make_id();
    var _g763 = ["setenv", x];
    _g763.variable = true;
    var _g762 = ["with-frame", ["each", [x], names, _g763]];
    _g762.scope = true;
    return(join(_g762, _g761));
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g764 = xs;
    var _g765 = 0;
    while (_g765 < length(_g764)) {
      var x = _g764[_g765];
      l[x] = true;
      _g765 = _g765 + 1;
    }
    return(join(["table"], l));
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g766 = sub(body, 0);
    var imp = _g766.import;
    var exp = _g766.export;
    var alias = _g766.alias;
    var _g767 = import_modules(imp);
    var imports = _g767[0];
    var bindings = _g767[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g768 = exp || [];
    var _g769 = 0;
    while (_g769 < length(_g768)) {
      var x = _g768[_g769];
      setenv(x, {_stash: true, export: true});
      _g769 = _g769 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g770 = sub(body, 0);
    return(["if", cond, join(["do"], _g770)]);
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g771 = sub(body, 0);
    var form = join(["fn", args], _g771);
    var keys = sub(_g771, length(_g771));
    var _g772 = ["setenv", ["quote", name]];
    _g772.form = ["quote", form];
    _g772.special = form;
    eval(join(_g772, keys));
    return(undefined);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g773 = sub(body, 0);
    add(environment, {});
    map(function (_g775) {
      var name = _g775[0];
      var exp = _g775[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g774 = join(["do"], macroexpand(_g773));
    drop(environment);
    return(_g774);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g776 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g776)]);
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g777 = sub(body, 0);
    var form = join(["fn", args], _g777);
    var _g778 = ["setenv", ["quote", name]];
    _g778.macro = form;
    _g778.form = ["quote", form];
    eval(_g778);
    return(undefined);
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g779 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g779));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g780 = bind(lh, rh);
      var _g781 = 0;
      while (_g781 < length(_g780)) {
        var _g782 = _g780[_g781];
        var id = _g782[0];
        var val = _g782[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g781 = _g781 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g779)]])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g783) {
      var a = _g783[0];
      var b = _g783[1];
      var c = sub(_g783, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g784 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g785 = ["table"];
    _g785._scope = scope;
    return(["do", ["add", "environment", _g785], ["let", [x, join(["do"], _g784)], ["drop", "environment"], x]]);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g786 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g786)) {
      var _g787 = bind42(x, _g786);
      var args = _g787[0];
      var _g788 = _g787[1];
      return(join(["%global-function", name, args], _g788));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g789 = sub(body, 0);
    var _g790 = bind42(args, _g789);
    var _g791 = _g790[0];
    var _g792 = _g790[1];
    return(join(["%function", _g791], _g792));
  }, export: true}, all: {macro: function (_g793, t) {
    var k = _g793[0];
    var v = _g793[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g794 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g813;
    if (target === "lua") {
      _g813 = _g794;
    } else {
      _g813 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g794)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g813)]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g795 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g795)]);
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g796 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g814;
    if (nil63(v)) {
      var _g815;
      if (b.i) {
        _g815 = "i";
      } else {
        _g815 = make_id();
      }
      var i = _g815;
      _g814 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g796), ["inc", i]]];
    } else {
      var _g797 = ["target"];
      _g797.lua = ["not", ["number?", k]];
      _g797.js = ["isNaN", ["parseInt", k]];
      _g814 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g797, join(["let", [v, ["get", t1, k]]], _g796)]]];
    }
    return(["let", [t1, t], _g814]);
  }, export: true}, target: {export: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, global: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g798 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g799 = join(["do"], macroexpand(_g798));
    drop(environment);
    return(_g799);
  }, export: true}, at: {macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g800 = sub(body, 0);
    var imp = _g800.import;
    var exp = _g800.export;
    var alias = _g800.alias;
    var _g801 = import_modules(imp);
    var imports = _g801[0];
    var bindings = _g801[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g802 = exp || [];
    var _g803 = 0;
    while (_g803 < length(_g802)) {
      var x = _g802[_g803];
      setenv(x, {_stash: true, export: true});
      _g803 = _g803 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g816 = nexus["lumen/runtime"];
  var number = _g816.number;
  var find = _g816.find;
  var series = _g816.series;
  var last = _g816.last;
  var module_key = _g816["module-key"];
  var reduce = _g816.reduce;
  var none63 = _g816["none?"];
  var iterate = _g816.iterate;
  var composite63 = _g816["composite?"];
  var substring = _g816.substring;
  var exit = _g816.exit;
  var is63 = _g816["is?"];
  var split = _g816.split;
  var function63 = _g816["function?"];
  var pair = _g816.pair;
  var empty63 = _g816["empty?"];
  var tl = _g816.tl;
  var nil63 = _g816["nil?"];
  var unstash = _g816.unstash;
  var keys63 = _g816["keys?"];
  var _37 = _g816["%"];
  var replicate = _g816.replicate;
  var char = _g816.char;
  var space = _g816.space;
  var write_file = _g816["write-file"];
  var string = _g816.string;
  var list63 = _g816["list?"];
  var read_file = _g816["read-file"];
  var table63 = _g816["table?"];
  var string63 = _g816["string?"];
  var _60 = _g816["<"];
  var _61 = _g816["="];
  var _62 = _g816[">"];
  var now = _g816.now;
  var some63 = _g816["some?"];
  var inner = _g816.inner;
  var _47 = _g816["/"];
  var _43 = _g816["+"];
  var _ = _g816["-"];
  var join = _g816.join;
  var make_id = _g816["make-id"];
  var id_literal63 = _g816["id-literal?"];
  var in63 = _g816["in?"];
  var string_literal63 = _g816["string-literal?"];
  var _6261 = _g816[">="];
  var cat = _g816.cat;
  var setenv = _g816.setenv;
  var keep = _g816.keep;
  var module = _g816.module;
  var toplevel63 = _g816["toplevel?"];
  var search = _g816.search;
  var apply = _g816.apply;
  var add = _g816.add;
  var map = _g816.map;
  var atom63 = _g816["atom?"];
  var one63 = _g816["one?"];
  var today = _g816.today;
  var _6061 = _g816["<="];
  var boolean63 = _g816["boolean?"];
  var reverse = _g816.reverse;
  var hd = _g816.hd;
  var sub = _g816.sub;
  var stash = _g816.stash;
  var _37message_handler = _g816["%message-handler"];
  var _42 = _g816["*"];
  var length = _g816.length;
  var drop = _g816.drop;
  var code = _g816.code;
  var write = _g816.write;
  var sort = _g816.sort;
  var number63 = _g816["number?"];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var number = _g2.number;
  var add = _g2.add;
  var series = _g2.series;
  var last = _g2.last;
  var module_key = _g2["module-key"];
  var reduce = _g2.reduce;
  var none63 = _g2["none?"];
  var iterate = _g2.iterate;
  var composite63 = _g2["composite?"];
  var boolean63 = _g2["boolean?"];
  var exit = _g2.exit;
  var is63 = _g2["is?"];
  var stash = _g2.stash;
  var function63 = _g2["function?"];
  var pair = _g2.pair;
  var empty63 = _g2["empty?"];
  var tl = _g2.tl;
  var nil63 = _g2["nil?"];
  var code = _g2.code;
  var keys63 = _g2["keys?"];
  var _37 = _g2["%"];
  var replicate = _g2.replicate;
  var char = _g2.char;
  var space = _g2.space;
  var write_file = _g2["write-file"];
  var string = _g2.string;
  var list63 = _g2["list?"];
  var read_file = _g2["read-file"];
  var table63 = _g2["table?"];
  var string63 = _g2["string?"];
  var atom63 = _g2["atom?"];
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var now = _g2.now;
  var some63 = _g2["some?"];
  var inner = _g2.inner;
  var _47 = _g2["/"];
  var reverse = _g2.reverse;
  var _ = _g2["-"];
  var join = _g2.join;
  var make_id = _g2["make-id"];
  var id_literal63 = _g2["id-literal?"];
  var in63 = _g2["in?"];
  var string_literal63 = _g2["string-literal?"];
  var _6261 = _g2[">="];
  var cat = _g2.cat;
  var setenv = _g2.setenv;
  var drop = _g2.drop;
  var module = _g2.module;
  var toplevel63 = _g2["toplevel?"];
  var map = _g2.map;
  var apply = _g2.apply;
  var today = _g2.today;
  var substring = _g2.substring;
  var _6061 = _g2["<="];
  var _60 = _g2["<"];
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var split = _g2.split;
  var search = _g2.search;
  var hd = _g2.hd;
  var sub = _g2.sub;
  var unstash = _g2.unstash;
  var _37message_handler = _g2["%message-handler"];
  var sort = _g2.sort;
  var length = _g2.length;
  var find = _g2.find;
  var keep = _g2.keep;
  var write = _g2.write;
  var one63 = _g2["one?"];
  var number63 = _g2["number?"];
  var _g5 = nexus["lumen/reader"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var read = _g5.read;
  var make_stream = _g5["make-stream"];
  var _g6 = nexus["lumen/compiler"];
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  var in_module = _g6["in-module"];
  var declare = _g6.declare;
  var import_modules = _g6["import-modules"];
  var compile = _g6.compile;
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  var rep = function (str) {
    var _g819 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g821) {
        return([false, _g821.message]);
      }
    })();
    var _g1 = _g819[0];
    var x = _g819[1];
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
    var _g820 = args;
    var i = 0;
    while (i < length(_g820)) {
      var arg = _g820[i];
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
