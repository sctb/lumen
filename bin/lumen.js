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
      var _g77;
      if (nil63(from) || from < 0) {
        _g77 = 0;
      } else {
        _g77 = from;
      }
      var i = _g77;
      var n = length(x);
      var _g78;
      if (nil63(upto) || upto > n) {
        _g78 = n;
      } else {
        _g78 = upto;
      }
      var _g27 = _g78;
      while (i < _g27) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g28 = x;
      var k = undefined;
      for (k in _g28) {
        var v = _g28[k];
        var _g29 = parseInt(k);
        var _g79;
        if (isNaN(_g29)) {
          _g79 = k;
        } else {
          _g79 = _g29;
        }
        var _g30 = _g79;
        if (!number63(_g30)) {
          l[_g30] = v;
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
      var _g31 = a;
      var k = undefined;
      for (k in _g31) {
        var v = _g31[k];
        var _g32 = parseInt(k);
        var _g80;
        if (isNaN(_g32)) {
          _g80 = k;
        } else {
          _g80 = _g32;
        }
        var _g33 = _g80;
        c[_g33] = v;
      }
      var _g34 = b;
      var k = undefined;
      for (k in _g34) {
        var v = _g34[k];
        var _g35 = parseInt(k);
        var _g81;
        if (isNaN(_g35)) {
          _g81 = k;
        } else {
          _g81 = _g35;
        }
        var _g36 = _g81;
        if (number63(_g36)) {
          _g36 = _g36 + o;
        }
        c[_g36] = v;
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
    var _g37 = x;
    var k = undefined;
    for (k in _g37) {
      var v = _g37[k];
      var _g38 = parseInt(k);
      var _g82;
      if (isNaN(_g38)) {
        _g82 = k;
      } else {
        _g82 = _g38;
      }
      var _g39 = _g82;
      if (f(v)) {
        t[shift(_g39, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g40 = t;
    var _g19 = undefined;
    for (_g19 in _g40) {
      var y = _g40[_g19];
      var _g41 = parseInt(_g19);
      var _g83;
      if (isNaN(_g41)) {
        _g83 = _g19;
      } else {
        _g83 = _g41;
      }
      var _g42 = _g83;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g43 = t;
    var _g20 = undefined;
    for (_g20 in _g43) {
      var x = _g43[_g20];
      var _g44 = parseInt(_g20);
      var _g84;
      if (isNaN(_g44)) {
        _g84 = _g20;
      } else {
        _g84 = _g44;
      }
      var _g45 = _g84;
      var _g46 = f(x);
      if (_g46) {
        return(_g46);
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
    var _g85;
    if (f) {
      _g85 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g85));
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
    var _g47 = x;
    var k = undefined;
    for (k in _g47) {
      var v = _g47[k];
      var _g48 = parseInt(k);
      var _g86;
      if (isNaN(_g48)) {
        _g86 = k;
      } else {
        _g86 = _g48;
      }
      var _g49 = _g86;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g49, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _g50 = t;
    var k = undefined;
    for (k in _g50) {
      var _g21 = _g50[k];
      var _g51 = parseInt(k);
      var _g87;
      if (isNaN(_g51)) {
        _g87 = k;
      } else {
        _g87 = _g51;
      }
      var _g52 = _g87;
      if (!number63(_g52)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _g53 = t;
    var _g22 = undefined;
    for (_g22 in _g53) {
      var _g23 = _g53[_g22];
      var _g54 = parseInt(_g22);
      var _g88;
      if (isNaN(_g54)) {
        _g88 = _g22;
      } else {
        _g88 = _g54;
      }
      var _g55 = _g88;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _g56 = args;
      var k = undefined;
      for (k in _g56) {
        var v = _g56[k];
        var _g57 = parseInt(k);
        var _g89;
        if (isNaN(_g57)) {
          _g89 = k;
        } else {
          _g89 = _g57;
        }
        var _g58 = _g89;
        if (!number63(_g58)) {
          p[_g58] = v;
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
        var _g59 = l;
        var k = undefined;
        for (k in _g59) {
          var v = _g59[k];
          var _g60 = parseInt(k);
          var _g90;
          if (isNaN(_g60)) {
            _g90 = k;
          } else {
            _g90 = _g60;
          }
          var _g61 = _g90;
          if (!(_g61 === "_stash")) {
            args1[_g61] = v;
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
    var _g62 = sub(xs, 0);
    if (none63(_g62)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g62));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g63 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g63));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g64 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g64)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g65 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g65));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g66 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g66)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g67 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g67)));
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
            var sp = "";
            var xs = [];
            var ks = [];
            var _g68 = x;
            var k = undefined;
            for (k in _g68) {
              var v = _g68[k];
              var _g69 = parseInt(k);
              var _g91;
              if (isNaN(_g69)) {
                _g91 = k;
              } else {
                _g91 = _g69;
              }
              var _g70 = _g91;
              if (number63(_g70)) {
                xs[_g70] = string(v);
              } else {
                add(ks, _g70 + ":");
                add(ks, string(v));
              }
            }
            var _g71 = join(xs, ks);
            var _g24 = undefined;
            for (_g24 in _g71) {
              var v = _g71[_g24];
              var _g72 = parseInt(_g24);
              var _g92;
              if (isNaN(_g72)) {
                _g92 = _g24;
              } else {
                _g92 = _g72;
              }
              var _g73 = _g92;
              str = str + sp + v;
              sp = " ";
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
    var _g74 = stash(args);
    return(f.apply(f, _g74));
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
    var _g75 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g76 = _g75;
      var k1 = undefined;
      for (k1 in _g76) {
        if (isNaN(parseInt(k1))) {
          var v = _g76[k1];
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
  var _g96 = nexus["lumen/runtime"];
  var nil63 = _g96["nil?"];
  var is63 = _g96["is?"];
  var length = _g96.length;
  var none63 = _g96["none?"];
  var some63 = _g96["some?"];
  var one63 = _g96["one?"];
  var hd = _g96.hd;
  var string63 = _g96["string?"];
  var number63 = _g96["number?"];
  var boolean63 = _g96["boolean?"];
  var function63 = _g96["function?"];
  var composite63 = _g96["composite?"];
  var atom63 = _g96["atom?"];
  var table63 = _g96["table?"];
  var list63 = _g96["list?"];
  var substring = _g96.substring;
  var sub = _g96.sub;
  var inner = _g96.inner;
  var tl = _g96.tl;
  var char = _g96.char;
  var code = _g96.code;
  var string_literal63 = _g96["string-literal?"];
  var id_literal63 = _g96["id-literal?"];
  var add = _g96.add;
  var drop = _g96.drop;
  var last = _g96.last;
  var reverse = _g96.reverse;
  var join = _g96.join;
  var reduce = _g96.reduce;
  var keep = _g96.keep;
  var in63 = _g96["in?"];
  var find = _g96.find;
  var pair = _g96.pair;
  var sort = _g96.sort;
  var iterate = _g96.iterate;
  var replicate = _g96.replicate;
  var series = _g96.series;
  var map = _g96.map;
  var keys63 = _g96["keys?"];
  var empty63 = _g96["empty?"];
  var stash = _g96.stash;
  var unstash = _g96.unstash;
  var search = _g96.search;
  var split = _g96.split;
  var cat = _g96.cat;
  var _43 = _g96["+"];
  var _ = _g96["-"];
  var _42 = _g96["*"];
  var _47 = _g96["/"];
  var _37 = _g96["%"];
  var _62 = _g96[">"];
  var _60 = _g96["<"];
  var _61 = _g96["="];
  var _6261 = _g96[">="];
  var _6061 = _g96["<="];
  var read_file = _g96["read-file"];
  var write_file = _g96["write-file"];
  var write = _g96.write;
  var exit = _g96.exit;
  var today = _g96.today;
  var now = _g96.now;
  var number = _g96.number;
  var string = _g96.string;
  var space = _g96.space;
  var apply = _g96.apply;
  var make_id = _g96["make-id"];
  var _37message_handler = _g96["%message-handler"];
  var toplevel63 = _g96["toplevel?"];
  var module_key = _g96["module-key"];
  var module = _g96.module;
  var setenv = _g96.setenv;
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
      var _g134;
      if (c === "\n") {
        _g134 = "\\n";
      } else {
        var _g135;
        if (c === "\"") {
          _g135 = "\\\"";
        } else {
          var _g136;
          if (c === "\\") {
            _g136 = "\\\\";
          } else {
            _g136 = c;
          }
          _g135 = _g136;
        }
        _g134 = _g135;
      }
      var c1 = _g134;
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
      var _g99 = args;
      var k = undefined;
      for (k in _g99) {
        if (isNaN(parseInt(k))) {
          var v = _g99[k];
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
        var _g100 = lh;
        var i = 0;
        while (i < length(_g100)) {
          var x = _g100[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g101 = lh;
        var k = undefined;
        for (k in _g101) {
          if (isNaN(parseInt(k))) {
            var v = _g101[k];
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
      var _g102 = args;
      var _g103 = 0;
      while (_g103 < length(_g102)) {
        var arg = _g102[_g103];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g103 = _g103 + 1;
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
          var _g93 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g94 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g106 = args;
            var _g107 = 0;
            while (_g107 < length(_g106)) {
              var _g104 = _g106[_g107];
              setenv(_g104, {_stash: true, variable: true});
              _g107 = _g107 + 1;
            }
            var _g105 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g105);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g95 = form[0];
              var _g108 = form[1];
              var _g109 = form[2];
              var _g110 = sub(form, 3);
              add(environment, {_scope: true});
              var _g113 = _g109;
              var _g114 = 0;
              while (_g114 < length(_g113)) {
                var _g111 = _g113[_g114];
                setenv(_g111, {_stash: true, variable: true});
                _g114 = _g114 + 1;
              }
              var _g112 = join([x, _g108, _g109], macroexpand(_g110));
              drop(environment);
              return(_g112);
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
    var _g115 = form;
    var k = undefined;
    for (k in _g115) {
      if (isNaN(parseInt(k))) {
        var v = _g115[k];
        var _g137;
        if (quasisplice63(v, depth)) {
          _g137 = quasiexpand(v[1]);
        } else {
          _g137 = quasiexpand(v, depth);
        }
        var _g116 = _g137;
        last(xs)[k] = _g116;
      }
    }
    var _g117 = form;
    var _g118 = 0;
    while (_g118 < length(_g117)) {
      var x = _g117[_g118];
      if (quasisplice63(x, depth)) {
        var _g119 = quasiexpand(x[1]);
        add(xs, _g119);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g118 = _g118 + 1;
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
      var _g138;
      if (c === "-") {
        _g138 = "_";
      } else {
        var _g139;
        if (valid_code63(n)) {
          _g139 = c;
        } else {
          var _g140;
          if (i === 0) {
            _g140 = "_" + n;
          } else {
            _g140 = n;
          }
          _g139 = _g140;
        }
        _g138 = _g139;
      }
      var c1 = _g138;
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
    var _g124 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g125 = _g124.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g126 = module(spec).export;
      var n = undefined;
      for (n in _g126) {
        if (isNaN(parseInt(n))) {
          var b = _g126[n];
          if (b.variable && (_g125 || b.export)) {
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
    var _g127 = sub(xs, 0);
    return(join(t, _g127));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g128 = sub(keys, 0);
    var t1 = [];
    var _g129 = t;
    var _g130 = 0;
    while (_g130 < length(_g129)) {
      var x = _g129[_g130];
      add(t1, x);
      _g130 = _g130 + 1;
    }
    var _g131 = t;
    var k = undefined;
    for (k in _g131) {
      if (isNaN(parseInt(k))) {
        var v = _g131[k];
        if (!_g128[k]) {
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
    var _g132 = t;
    var k = undefined;
    for (k in _g132) {
      if (isNaN(parseInt(k))) {
        var v = _g132[k];
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
    var _g133 = ["table"];
    _g133.import = quoted(m.import);
    _g133.alias = quoted(m.alias);
    _g133.export = quote_frame(m.export);
    return(_g133);
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
  var _g141 = nexus["lumen/runtime"];
  var nil63 = _g141["nil?"];
  var is63 = _g141["is?"];
  var length = _g141.length;
  var none63 = _g141["none?"];
  var some63 = _g141["some?"];
  var one63 = _g141["one?"];
  var hd = _g141.hd;
  var string63 = _g141["string?"];
  var number63 = _g141["number?"];
  var boolean63 = _g141["boolean?"];
  var function63 = _g141["function?"];
  var composite63 = _g141["composite?"];
  var atom63 = _g141["atom?"];
  var table63 = _g141["table?"];
  var list63 = _g141["list?"];
  var substring = _g141.substring;
  var sub = _g141.sub;
  var inner = _g141.inner;
  var tl = _g141.tl;
  var char = _g141.char;
  var code = _g141.code;
  var string_literal63 = _g141["string-literal?"];
  var id_literal63 = _g141["id-literal?"];
  var add = _g141.add;
  var drop = _g141.drop;
  var last = _g141.last;
  var reverse = _g141.reverse;
  var join = _g141.join;
  var reduce = _g141.reduce;
  var keep = _g141.keep;
  var in63 = _g141["in?"];
  var find = _g141.find;
  var pair = _g141.pair;
  var sort = _g141.sort;
  var iterate = _g141.iterate;
  var replicate = _g141.replicate;
  var series = _g141.series;
  var map = _g141.map;
  var keys63 = _g141["keys?"];
  var empty63 = _g141["empty?"];
  var stash = _g141.stash;
  var unstash = _g141.unstash;
  var search = _g141.search;
  var split = _g141.split;
  var cat = _g141.cat;
  var _43 = _g141["+"];
  var _ = _g141["-"];
  var _42 = _g141["*"];
  var _47 = _g141["/"];
  var _37 = _g141["%"];
  var _62 = _g141[">"];
  var _60 = _g141["<"];
  var _61 = _g141["="];
  var _6261 = _g141[">="];
  var _6061 = _g141["<="];
  var read_file = _g141["read-file"];
  var write_file = _g141["write-file"];
  var write = _g141.write;
  var exit = _g141.exit;
  var today = _g141.today;
  var now = _g141.now;
  var number = _g141.number;
  var string = _g141.string;
  var space = _g141.space;
  var apply = _g141.apply;
  var make_id = _g141["make-id"];
  var _37message_handler = _g141["%message-handler"];
  var toplevel63 = _g141["toplevel?"];
  var module_key = _g141["module-key"];
  var module = _g141.module;
  var setenv = _g141.setenv;
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
  var _g152 = nexus["lumen/runtime"];
  var nil63 = _g152["nil?"];
  var is63 = _g152["is?"];
  var length = _g152.length;
  var none63 = _g152["none?"];
  var some63 = _g152["some?"];
  var one63 = _g152["one?"];
  var hd = _g152.hd;
  var string63 = _g152["string?"];
  var number63 = _g152["number?"];
  var boolean63 = _g152["boolean?"];
  var function63 = _g152["function?"];
  var composite63 = _g152["composite?"];
  var atom63 = _g152["atom?"];
  var table63 = _g152["table?"];
  var list63 = _g152["list?"];
  var substring = _g152.substring;
  var sub = _g152.sub;
  var inner = _g152.inner;
  var tl = _g152.tl;
  var char = _g152.char;
  var code = _g152.code;
  var string_literal63 = _g152["string-literal?"];
  var id_literal63 = _g152["id-literal?"];
  var add = _g152.add;
  var drop = _g152.drop;
  var last = _g152.last;
  var reverse = _g152.reverse;
  var join = _g152.join;
  var reduce = _g152.reduce;
  var keep = _g152.keep;
  var in63 = _g152["in?"];
  var find = _g152.find;
  var pair = _g152.pair;
  var sort = _g152.sort;
  var iterate = _g152.iterate;
  var replicate = _g152.replicate;
  var series = _g152.series;
  var map = _g152.map;
  var keys63 = _g152["keys?"];
  var empty63 = _g152["empty?"];
  var stash = _g152.stash;
  var unstash = _g152.unstash;
  var search = _g152.search;
  var split = _g152.split;
  var cat = _g152.cat;
  var _43 = _g152["+"];
  var _ = _g152["-"];
  var _42 = _g152["*"];
  var _47 = _g152["/"];
  var _37 = _g152["%"];
  var _62 = _g152[">"];
  var _60 = _g152["<"];
  var _61 = _g152["="];
  var _6261 = _g152[">="];
  var _6061 = _g152["<="];
  var read_file = _g152["read-file"];
  var write_file = _g152["write-file"];
  var write = _g152.write;
  var exit = _g152.exit;
  var today = _g152.today;
  var now = _g152.now;
  var number = _g152.number;
  var string = _g152.string;
  var space = _g152.space;
  var apply = _g152.apply;
  var make_id = _g152["make-id"];
  var _37message_handler = _g152["%message-handler"];
  var toplevel63 = _g152["toplevel?"];
  var module_key = _g152["module-key"];
  var module = _g152.module;
  var setenv = _g152.setenv;
  var _g155 = nexus["lumen/lib"];
  var getenv = _g155.getenv;
  var macro_function = _g155["macro-function"];
  var macro63 = _g155["macro?"];
  var special63 = _g155["special?"];
  var special_form63 = _g155["special-form?"];
  var statement63 = _g155["statement?"];
  var symbol_expansion = _g155["symbol-expansion"];
  var symbol63 = _g155["symbol?"];
  var variable63 = _g155["variable?"];
  var bound63 = _g155["bound?"];
  var quoted = _g155.quoted;
  var stash42 = _g155["stash*"];
  var bind = _g155.bind;
  var bind42 = _g155["bind*"];
  var quasiexpand = _g155.quasiexpand;
  var macroexpand = _g155.macroexpand;
  var indentation = _g155.indentation;
  var reserved63 = _g155["reserved?"];
  var valid_id63 = _g155["valid-id?"];
  var id = _g155.id;
  var key = _g155.key;
  var imported = _g155.imported;
  var link = _g155.link;
  var mapo = _g155.mapo;
  var quote_environment = _g155["quote-environment"];
  var quote_modules = _g155["quote-modules"];
  var initial_environment = _g155["initial-environment"];
  var _g156 = nexus["lumen/reader"];
  var make_stream = _g156["make-stream"];
  var read_table = _g156["read-table"];
  var read = _g156.read;
  var read_all = _g156["read-all"];
  var read_from_string = _g156["read-from-string"];
  var _g160 = [];
  _g160.js = "!";
  _g160.lua = "not ";
  var _g158 = [];
  var _g161 = [];
  _g161.js = "!";
  _g161.lua = "not ";
  _g158["not"] = _g161;
  var _g163 = [];
  _g163["*"] = true;
  _g163["/"] = true;
  _g163["%"] = true;
  var _g165 = [];
  _g165["+"] = true;
  _g165["-"] = true;
  var _g169 = [];
  _g169.js = "+";
  _g169.lua = "..";
  var _g167 = [];
  var _g170 = [];
  _g170.js = "+";
  _g170.lua = "..";
  _g167.cat = _g170;
  var _g172 = [];
  _g172["<"] = true;
  _g172[">"] = true;
  _g172["<="] = true;
  _g172[">="] = true;
  var _g176 = [];
  _g176.js = "===";
  _g176.lua = "==";
  var _g178 = [];
  _g178.js = "!=";
  _g178.lua = "~=";
  var _g174 = [];
  var _g179 = [];
  _g179.js = "===";
  _g179.lua = "==";
  _g174["="] = _g179;
  var _g180 = [];
  _g180.js = "!=";
  _g180.lua = "~=";
  _g174["~="] = _g180;
  var _g184 = [];
  _g184.js = "&&";
  _g184.lua = "and";
  var _g182 = [];
  var _g185 = [];
  _g185.js = "&&";
  _g185.lua = "and";
  _g182["and"] = _g185;
  var _g189 = [];
  _g189.js = "||";
  _g189.lua = "or";
  var _g187 = [];
  var _g190 = [];
  _g190.js = "||";
  _g190.lua = "or";
  _g187["or"] = _g190;
  var infix = [_g158, _g163, _g165, _g167, _g172, _g174, _g182, _g187];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g191 = infix;
      var i = 0;
      while (i < length(_g191)) {
        var level = _g191[i];
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
    var _g192 = args;
    var i = 0;
    while (i < length(_g192)) {
      var arg = _g192[i];
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
    var _g193 = getenv(x);
    var special = _g193.special;
    var stmt = _g193.stmt;
    var self_tr63 = _g193.tr;
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
    var _g194 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g194.right;
    var _g223;
    if (right) {
      _g223 = _6261;
    } else {
      _g223 = _62;
    }
    if (_g223(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g195 = sub(form, 1);
    var a = _g195[0];
    var b = _g195[1];
    var _g196 = op_delims(form, a);
    var ao = _g196[0];
    var ac = _g196[1];
    var _g197 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g197[0];
    var bc = _g197[1];
    var _g198 = compile(a);
    var _g199 = compile(b);
    var _g200 = getop(op);
    if (unary63(form)) {
      return(_g200 + ao + _g198 + ac);
    } else {
      return(ao + _g198 + ac + " " + _g200 + " " + bo + _g199 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g201 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g201.name;
    var prefix = _g201.prefix;
    var _g224;
    if (name) {
      _g224 = compile(name);
    } else {
      _g224 = "";
    }
    var id = _g224;
    var _g202 = prefix || "";
    var _g203 = compile_args(args);
    indent_level = indent_level + 1;
    var _g205 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g204 = _g205;
    var ind = indentation();
    var _g225;
    if (target === "js") {
      _g225 = "";
    } else {
      _g225 = "end";
    }
    var tr = _g225;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g203 + " {\n" + _g204 + ind + "}" + tr);
    } else {
      return(_g202 + "function " + id + _g203 + "\n" + _g204 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g206 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g206.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g226;
        if (stmt) {
          _g226 = indentation();
        } else {
          _g226 = "";
        }
        var ind = _g226;
        var _g227;
        if (atom63(form)) {
          _g227 = compile_atom(form);
        } else {
          var _g228;
          if (infix63(hd(form))) {
            _g228 = compile_infix(form);
          } else {
            _g228 = compile_call(form);
          }
          _g227 = _g228;
        }
        var _g207 = _g227;
        return(ind + _g207 + tr);
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
    var _g208 = sub(args, 0, length(args) - 1);
    var _g209 = 0;
    while (_g209 < length(_g208)) {
      var x = _g208[_g209];
      add(hoist, lower(x, hoist, stmt63));
      _g209 = _g209 + 1;
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
    var _g210 = args[1];
    var _g211 = args[2];
    if (stmt63 || tail63) {
      var _g230;
      if (_g211) {
        _g230 = [lower_body([_g211], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g210], tail63)], _g230)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g229;
      if (_g211) {
        _g229 = [lower(["set", e, _g211])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g210])], _g229));
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
      var _g231;
      if (x === "and") {
        _g231 = ["%if", id, b, id];
      } else {
        _g231 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g231], hoist));
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
    var _g212 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g212, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g213 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g213)) {
      return(_g213);
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
    var _g214 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g215 = _g214.all;
    var m = module(spec);
    var frame = last(environment);
    var _g216 = m.export;
    var k = undefined;
    for (k in _g216) {
      if (isNaN(parseInt(k))) {
        var v = _g216[k];
        if (v.export || _g215) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g217 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g218 = _g217.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g218}));
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
    var _g219 = specs || [];
    var _g220 = 0;
    while (_g220 < length(_g219)) {
      var spec = _g219[_g220];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g221 = import_modules(m.alias);
        var aliased = _g221[0];
        var bs = _g221[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g222 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g222);
      }
      _g220 = _g220 + 1;
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
  var _g232 = nexus["lumen/runtime"];
  var nil63 = _g232["nil?"];
  var is63 = _g232["is?"];
  var length = _g232.length;
  var none63 = _g232["none?"];
  var some63 = _g232["some?"];
  var one63 = _g232["one?"];
  var hd = _g232.hd;
  var string63 = _g232["string?"];
  var number63 = _g232["number?"];
  var boolean63 = _g232["boolean?"];
  var function63 = _g232["function?"];
  var composite63 = _g232["composite?"];
  var atom63 = _g232["atom?"];
  var table63 = _g232["table?"];
  var list63 = _g232["list?"];
  var substring = _g232.substring;
  var sub = _g232.sub;
  var inner = _g232.inner;
  var tl = _g232.tl;
  var char = _g232.char;
  var code = _g232.code;
  var string_literal63 = _g232["string-literal?"];
  var id_literal63 = _g232["id-literal?"];
  var add = _g232.add;
  var drop = _g232.drop;
  var last = _g232.last;
  var reverse = _g232.reverse;
  var join = _g232.join;
  var reduce = _g232.reduce;
  var keep = _g232.keep;
  var in63 = _g232["in?"];
  var find = _g232.find;
  var pair = _g232.pair;
  var sort = _g232.sort;
  var iterate = _g232.iterate;
  var replicate = _g232.replicate;
  var series = _g232.series;
  var map = _g232.map;
  var keys63 = _g232["keys?"];
  var empty63 = _g232["empty?"];
  var stash = _g232.stash;
  var unstash = _g232.unstash;
  var search = _g232.search;
  var split = _g232.split;
  var cat = _g232.cat;
  var _43 = _g232["+"];
  var _ = _g232["-"];
  var _42 = _g232["*"];
  var _47 = _g232["/"];
  var _37 = _g232["%"];
  var _62 = _g232[">"];
  var _60 = _g232["<"];
  var _61 = _g232["="];
  var _6261 = _g232[">="];
  var _6061 = _g232["<="];
  var read_file = _g232["read-file"];
  var write_file = _g232["write-file"];
  var write = _g232.write;
  var exit = _g232.exit;
  var today = _g232.today;
  var now = _g232.now;
  var number = _g232.number;
  var string = _g232.string;
  var space = _g232.space;
  var apply = _g232.apply;
  var make_id = _g232["make-id"];
  var _37message_handler = _g232["%message-handler"];
  var toplevel63 = _g232["toplevel?"];
  var module_key = _g232["module-key"];
  var module = _g232.module;
  var setenv = _g232.setenv;
  var _g235 = nexus["lumen/lib"];
  var getenv = _g235.getenv;
  var macro_function = _g235["macro-function"];
  var macro63 = _g235["macro?"];
  var special63 = _g235["special?"];
  var special_form63 = _g235["special-form?"];
  var statement63 = _g235["statement?"];
  var symbol_expansion = _g235["symbol-expansion"];
  var symbol63 = _g235["symbol?"];
  var variable63 = _g235["variable?"];
  var bound63 = _g235["bound?"];
  var quoted = _g235.quoted;
  var stash42 = _g235["stash*"];
  var bind = _g235.bind;
  var bind42 = _g235["bind*"];
  var quasiexpand = _g235.quasiexpand;
  var macroexpand = _g235.macroexpand;
  var indentation = _g235.indentation;
  var reserved63 = _g235["reserved?"];
  var valid_id63 = _g235["valid-id?"];
  var id = _g235.id;
  var key = _g235.key;
  var imported = _g235.imported;
  var link = _g235.link;
  var mapo = _g235.mapo;
  var quote_environment = _g235["quote-environment"];
  var quote_modules = _g235["quote-modules"];
  var initial_environment = _g235["initial-environment"];
  var _g236 = nexus["lumen/compiler"];
  var compile_function = _g236["compile-function"];
  var compile = _g236.compile;
  var open_module = _g236["open-module"];
  var load_module = _g236["load-module"];
  var in_module = _g236["in-module"];
  var import_modules = _g236["import-modules"];
  var compile_module = _g236["compile-module"];
  var declare = _g236.declare;
  var eval = _g236.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g410 = nexus["lumen/runtime"];
  var nil63 = _g410["nil?"];
  var is63 = _g410["is?"];
  var length = _g410.length;
  var none63 = _g410["none?"];
  var some63 = _g410["some?"];
  var one63 = _g410["one?"];
  var hd = _g410.hd;
  var string63 = _g410["string?"];
  var number63 = _g410["number?"];
  var boolean63 = _g410["boolean?"];
  var function63 = _g410["function?"];
  var composite63 = _g410["composite?"];
  var atom63 = _g410["atom?"];
  var table63 = _g410["table?"];
  var list63 = _g410["list?"];
  var substring = _g410.substring;
  var sub = _g410.sub;
  var inner = _g410.inner;
  var tl = _g410.tl;
  var char = _g410.char;
  var code = _g410.code;
  var string_literal63 = _g410["string-literal?"];
  var id_literal63 = _g410["id-literal?"];
  var add = _g410.add;
  var drop = _g410.drop;
  var last = _g410.last;
  var reverse = _g410.reverse;
  var join = _g410.join;
  var reduce = _g410.reduce;
  var keep = _g410.keep;
  var in63 = _g410["in?"];
  var find = _g410.find;
  var pair = _g410.pair;
  var sort = _g410.sort;
  var iterate = _g410.iterate;
  var replicate = _g410.replicate;
  var series = _g410.series;
  var map = _g410.map;
  var keys63 = _g410["keys?"];
  var empty63 = _g410["empty?"];
  var stash = _g410.stash;
  var unstash = _g410.unstash;
  var search = _g410.search;
  var split = _g410.split;
  var cat = _g410.cat;
  var _43 = _g410["+"];
  var _ = _g410["-"];
  var _42 = _g410["*"];
  var _47 = _g410["/"];
  var _37 = _g410["%"];
  var _62 = _g410[">"];
  var _60 = _g410["<"];
  var _61 = _g410["="];
  var _6261 = _g410[">="];
  var _6061 = _g410["<="];
  var read_file = _g410["read-file"];
  var write_file = _g410["write-file"];
  var write = _g410.write;
  var exit = _g410.exit;
  var today = _g410.today;
  var now = _g410.now;
  var number = _g410.number;
  var string = _g410.string;
  var space = _g410.space;
  var apply = _g410.apply;
  var make_id = _g410["make-id"];
  var _37message_handler = _g410["%message-handler"];
  var toplevel63 = _g410["toplevel?"];
  var module_key = _g410["module-key"];
  var module = _g410.module;
  var setenv = _g410.setenv;
  var _g413 = nexus["lumen/lib"];
  var getenv = _g413.getenv;
  var macro_function = _g413["macro-function"];
  var macro63 = _g413["macro?"];
  var special63 = _g413["special?"];
  var special_form63 = _g413["special-form?"];
  var statement63 = _g413["statement?"];
  var symbol_expansion = _g413["symbol-expansion"];
  var symbol63 = _g413["symbol?"];
  var variable63 = _g413["variable?"];
  var bound63 = _g413["bound?"];
  var quoted = _g413.quoted;
  var stash42 = _g413["stash*"];
  var bind = _g413.bind;
  var bind42 = _g413["bind*"];
  var quasiexpand = _g413.quasiexpand;
  var macroexpand = _g413.macroexpand;
  var indentation = _g413.indentation;
  var reserved63 = _g413["reserved?"];
  var valid_id63 = _g413["valid-id?"];
  var id = _g413.id;
  var key = _g413.key;
  var imported = _g413.imported;
  var link = _g413.link;
  var mapo = _g413.mapo;
  var quote_environment = _g413["quote-environment"];
  var quote_modules = _g413["quote-modules"];
  var initial_environment = _g413["initial-environment"];
  var _g414 = nexus["lumen/compiler"];
  var compile_function = _g414["compile-function"];
  var compile = _g414.compile;
  var open_module = _g414["open-module"];
  var load_module = _g414["load-module"];
  var in_module = _g414["in-module"];
  var import_modules = _g414["import-modules"];
  var compile_module = _g414["compile-module"];
  var declare = _g414.declare;
  var eval = _g414.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g723 = nexus["lumen/runtime"];
  var nil63 = _g723["nil?"];
  var is63 = _g723["is?"];
  var length = _g723.length;
  var none63 = _g723["none?"];
  var some63 = _g723["some?"];
  var one63 = _g723["one?"];
  var hd = _g723.hd;
  var string63 = _g723["string?"];
  var number63 = _g723["number?"];
  var boolean63 = _g723["boolean?"];
  var function63 = _g723["function?"];
  var composite63 = _g723["composite?"];
  var atom63 = _g723["atom?"];
  var table63 = _g723["table?"];
  var list63 = _g723["list?"];
  var substring = _g723.substring;
  var sub = _g723.sub;
  var inner = _g723.inner;
  var tl = _g723.tl;
  var char = _g723.char;
  var code = _g723.code;
  var string_literal63 = _g723["string-literal?"];
  var id_literal63 = _g723["id-literal?"];
  var add = _g723.add;
  var drop = _g723.drop;
  var last = _g723.last;
  var reverse = _g723.reverse;
  var join = _g723.join;
  var reduce = _g723.reduce;
  var keep = _g723.keep;
  var in63 = _g723["in?"];
  var find = _g723.find;
  var pair = _g723.pair;
  var sort = _g723.sort;
  var iterate = _g723.iterate;
  var replicate = _g723.replicate;
  var series = _g723.series;
  var map = _g723.map;
  var keys63 = _g723["keys?"];
  var empty63 = _g723["empty?"];
  var stash = _g723.stash;
  var unstash = _g723.unstash;
  var search = _g723.search;
  var split = _g723.split;
  var cat = _g723.cat;
  var _43 = _g723["+"];
  var _ = _g723["-"];
  var _42 = _g723["*"];
  var _47 = _g723["/"];
  var _37 = _g723["%"];
  var _62 = _g723[">"];
  var _60 = _g723["<"];
  var _61 = _g723["="];
  var _6261 = _g723[">="];
  var _6061 = _g723["<="];
  var read_file = _g723["read-file"];
  var write_file = _g723["write-file"];
  var write = _g723.write;
  var exit = _g723.exit;
  var today = _g723.today;
  var now = _g723.now;
  var number = _g723.number;
  var string = _g723.string;
  var space = _g723.space;
  var apply = _g723.apply;
  var make_id = _g723["make-id"];
  var _37message_handler = _g723["%message-handler"];
  var toplevel63 = _g723["toplevel?"];
  var module_key = _g723["module-key"];
  var module = _g723.module;
  var setenv = _g723.setenv;
  var _g726 = nexus["lumen/lib"];
  var getenv = _g726.getenv;
  var macro_function = _g726["macro-function"];
  var macro63 = _g726["macro?"];
  var special63 = _g726["special?"];
  var special_form63 = _g726["special-form?"];
  var statement63 = _g726["statement?"];
  var symbol_expansion = _g726["symbol-expansion"];
  var symbol63 = _g726["symbol?"];
  var variable63 = _g726["variable?"];
  var bound63 = _g726["bound?"];
  var quoted = _g726.quoted;
  var stash42 = _g726["stash*"];
  var bind = _g726.bind;
  var bind42 = _g726["bind*"];
  var quasiexpand = _g726.quasiexpand;
  var macroexpand = _g726.macroexpand;
  var indentation = _g726.indentation;
  var reserved63 = _g726["reserved?"];
  var valid_id63 = _g726["valid-id?"];
  var id = _g726.id;
  var key = _g726.key;
  var imported = _g726.imported;
  var link = _g726.link;
  var mapo = _g726.mapo;
  var quote_environment = _g726["quote-environment"];
  var quote_modules = _g726["quote-modules"];
  var initial_environment = _g726["initial-environment"];
  var _g727 = nexus["lumen/compiler"];
  var compile_function = _g727["compile-function"];
  var compile = _g727.compile;
  var open_module = _g727["open-module"];
  var load_module = _g727["load-module"];
  var in_module = _g727["in-module"];
  var import_modules = _g727["import-modules"];
  var compile_module = _g727["compile-module"];
  var declare = _g727.declare;
  var eval = _g727.eval;
  global.modules = {"lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {global: true, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {tr: true, export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g740 = forms;
    var _g741 = 0;
    while (_g741 < length(_g740)) {
      var x = _g740[_g741];
      str = str + compile(x, {_stash: true, stmt: true});
      _g741 = _g741 + 1;
    }
    return(str);
  }, stmt: true}, "%if": {tr: true, export: true, foo: true, special: function (cond, cons, alt) {
    var _g742 = compile(cond);
    indent_level = indent_level + 1;
    var _g744 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g743 = _g744;
    var _g811;
    if (alt) {
      indent_level = indent_level + 1;
      var _g746 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g811 = _g746;
    }
    var _g745 = _g811;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g742 + ") {\n" + _g743 + ind + "}";
    } else {
      str = str + ind + "if " + _g742 + " then\n" + _g743;
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
  }, stmt: true}, "while": {tr: true, export: true, foo: true, special: function (cond, form) {
    var _g747 = compile(cond);
    indent_level = indent_level + 1;
    var _g748 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g748;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g747 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g747 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true}, "%for": {tr: true, export: true, foo: true, special: function (t, k, form) {
    var _g749 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g750 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g750;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g749 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g749 + ") {\n" + body + ind + "}\n");
    }
  }, stmt: true}, "%try": {tr: true, export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g751 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g751;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g752 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g752;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true}, "break": {stmt: true, export: true, special: function () {
    return(indentation() + "break");
  }, foo: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%global-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, stmt: true}, "%local-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true}, "return": {stmt: true, export: true, special: function (x) {
    var _g812;
    if (nil63(x)) {
      _g812 = "return";
    } else {
      _g812 = "return(" + compile(x) + ")";
    }
    var _g753 = _g812;
    return(indentation() + _g753);
  }, foo: true}, error: {stmt: true, export: true, special: function (x) {
    var _g813;
    if (target === "js") {
      _g813 = "throw new " + compile(["Error", x]);
    } else {
      _g813 = "error(" + compile(x) + ")";
    }
    var e = _g813;
    return(indentation() + e);
  }, foo: true}, "%local": {stmt: true, export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g814;
    if (is63(value)) {
      _g814 = " = " + value1;
    } else {
      _g814 = "";
    }
    var rh = _g814;
    var _g815;
    if (target === "js") {
      _g815 = "var ";
    } else {
      _g815 = "local ";
    }
    var keyword = _g815;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true}, set: {stmt: true, export: true, special: function (lh, rh) {
    var _g754 = compile(lh);
    var _g816;
    if (nil63(rh)) {
      _g816 = "nil";
    } else {
      _g816 = rh;
    }
    var _g755 = compile(_g816);
    return(indentation() + _g754 + " = " + _g755);
  }, foo: true}, get: {export: true, special: function (t, k) {
    var _g756 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g756, 0) === "{") {
      _g756 = "(" + _g756 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g756 + "." + inner(k));
    } else {
      return(_g756 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g817;
    if (target === "lua") {
      _g817 = "{";
    } else {
      _g817 = "[";
    }
    var open = _g817;
    var _g818;
    if (target === "lua") {
      _g818 = "}";
    } else {
      _g818 = "]";
    }
    var close = _g818;
    var str = "";
    var _g757 = forms;
    var i = 0;
    while (i < length(_g757)) {
      var x = _g757[i];
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
    var _g819;
    if (target === "lua") {
      _g819 = " = ";
    } else {
      _g819 = ": ";
    }
    var sep = _g819;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g758 = pairs;
    var i = 0;
    while (i < length(_g758)) {
      var _g759 = _g758[i];
      var k = _g759[0];
      var v = _g759[1];
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
  }, foo: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g760) {
    var char = _g760[0];
    var stream = _g760[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g761 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g761)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {macro: function (form) {
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
      var _g762 = body;
      var k = undefined;
      for (k in _g762) {
        if (isNaN(parseInt(k))) {
          var v = _g762[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g763) {
      var a = _g763[0];
      var b = _g763[1];
      var c = sub(_g763, 2);
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
    var _g764 = sub(body, 0);
    return(["if", cond, join(["do"], _g764)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g765 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g765)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g766 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g766));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g767 = bind(lh, rh);
      var _g768 = 0;
      while (_g768 < length(_g767)) {
        var _g769 = _g767[_g768];
        var id = _g769[0];
        var val = _g769[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g768 = _g768 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g766)]])));
    }
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g770 = sub(body, 0);
    var imp = _g770.import;
    var exp = _g770.export;
    var alias = _g770.alias;
    var _g771 = import_modules(imp);
    var imports = _g771[0];
    var bindings = _g771[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g772 = exp || [];
    var _g773 = 0;
    while (_g773 < length(_g772)) {
      var x = _g772[_g773];
      setenv(x, {_stash: true, export: true});
      _g773 = _g773 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g774 = sub(body, 0);
    var form = join(["fn", args], _g774);
    var _g775 = ["setenv", ["quote", name]];
    _g775.macro = form;
    _g775.form = ["quote", form];
    eval(_g775);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g776 = sub(body, 0);
    var form = join(["fn", args], _g776);
    var keys = sub(_g776, length(_g776));
    var _g777 = ["setenv", ["quote", name]];
    _g777.special = form;
    _g777.form = ["quote", form];
    eval(join(_g777, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g778 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g778)) {
      var _g779 = bind42(x, _g778);
      var args = _g779[0];
      var _g780 = _g779[1];
      return(join(["%global-function", name, args], _g780));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g781 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g781) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g781)]));
    } else {
      if (some63(_g781)) {
        var _g782 = bind42(x, _g781);
        var args = _g782[0];
        var _g783 = _g782[1];
        return(link(name, join(["%local-function", name, args], _g783)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "with-bindings": {macro: function (_g784) {
    var names = _g784[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g785 = sub(body, 0);
    var x = make_id();
    var _g787 = ["setenv", x];
    _g787.variable = true;
    var _g786 = ["with-frame", ["each", [x], names, _g787]];
    _g786.scope = true;
    return(join(_g786, _g785));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g788 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g789 = join(["do"], macroexpand(_g788));
    drop(environment);
    return(_g789);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g790 = sub(body, 0);
    add(environment, {});
    map(function (_g792) {
      var name = _g792[0];
      var exp = _g792[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g791 = join(["do"], macroexpand(_g790));
    drop(environment);
    return(_g791);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g793 = sub(body, 0);
    var _g794 = bind42(args, _g793);
    var _g795 = _g794[0];
    var _g796 = _g794[1];
    return(join(["%function", _g795], _g796));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, all: {macro: function (_g797, t) {
    var k = _g797[0];
    var v = _g797[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g798 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g820;
    if (target === "lua") {
      _g820 = _g798;
    } else {
      _g820 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g798)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g820)]]);
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g799 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g821;
    if (nil63(v)) {
      var _g822;
      if (b.i) {
        _g822 = "i";
      } else {
        _g822 = make_id();
      }
      var i = _g822;
      _g821 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g799), ["inc", i]]];
    } else {
      var _g800 = ["target"];
      _g800.js = ["isNaN", ["parseInt", k]];
      _g800.lua = ["not", ["number?", k]];
      _g821 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g800, join(["let", [v, ["get", t1, k]]], _g799)]]];
    }
    return(["let", [t1, t], _g821]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g801 = xs;
    var _g802 = 0;
    while (_g802 < length(_g801)) {
      var x = _g801[_g802];
      l[x] = true;
      _g802 = _g802 + 1;
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {export: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, global: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g803 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g803)]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g804 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g804)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g805 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g806 = ["table"];
    _g806._scope = scope;
    return(["do", ["add", "environment", _g806], ["let", [x, join(["do"], _g805)], ["drop", "environment"], x]]);
  }, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g807 = sub(body, 0);
    var imp = _g807.import;
    var exp = _g807.export;
    var alias = _g807.alias;
    var _g808 = import_modules(imp);
    var imports = _g808[0];
    var bindings = _g808[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g809 = exp || [];
    var _g810 = 0;
    while (_g810 < length(_g809)) {
      var x = _g809[_g810];
      setenv(x, {_stash: true, export: true});
      _g810 = _g810 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g823 = nexus["lumen/runtime"];
  var nil63 = _g823["nil?"];
  var is63 = _g823["is?"];
  var length = _g823.length;
  var none63 = _g823["none?"];
  var some63 = _g823["some?"];
  var one63 = _g823["one?"];
  var hd = _g823.hd;
  var string63 = _g823["string?"];
  var number63 = _g823["number?"];
  var boolean63 = _g823["boolean?"];
  var function63 = _g823["function?"];
  var composite63 = _g823["composite?"];
  var atom63 = _g823["atom?"];
  var table63 = _g823["table?"];
  var list63 = _g823["list?"];
  var substring = _g823.substring;
  var sub = _g823.sub;
  var inner = _g823.inner;
  var tl = _g823.tl;
  var char = _g823.char;
  var code = _g823.code;
  var string_literal63 = _g823["string-literal?"];
  var id_literal63 = _g823["id-literal?"];
  var add = _g823.add;
  var drop = _g823.drop;
  var last = _g823.last;
  var reverse = _g823.reverse;
  var join = _g823.join;
  var reduce = _g823.reduce;
  var keep = _g823.keep;
  var in63 = _g823["in?"];
  var find = _g823.find;
  var pair = _g823.pair;
  var sort = _g823.sort;
  var iterate = _g823.iterate;
  var replicate = _g823.replicate;
  var series = _g823.series;
  var map = _g823.map;
  var keys63 = _g823["keys?"];
  var empty63 = _g823["empty?"];
  var stash = _g823.stash;
  var unstash = _g823.unstash;
  var search = _g823.search;
  var split = _g823.split;
  var cat = _g823.cat;
  var _43 = _g823["+"];
  var _ = _g823["-"];
  var _42 = _g823["*"];
  var _47 = _g823["/"];
  var _37 = _g823["%"];
  var _62 = _g823[">"];
  var _60 = _g823["<"];
  var _61 = _g823["="];
  var _6261 = _g823[">="];
  var _6061 = _g823["<="];
  var read_file = _g823["read-file"];
  var write_file = _g823["write-file"];
  var write = _g823.write;
  var exit = _g823.exit;
  var today = _g823.today;
  var now = _g823.now;
  var number = _g823.number;
  var string = _g823.string;
  var space = _g823.space;
  var apply = _g823.apply;
  var make_id = _g823["make-id"];
  var _37message_handler = _g823["%message-handler"];
  var toplevel63 = _g823["toplevel?"];
  var module_key = _g823["module-key"];
  var module = _g823.module;
  var setenv = _g823.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var nil63 = _g2["nil?"];
  var is63 = _g2["is?"];
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
  var series = _g2.series;
  var map = _g2.map;
  var keys63 = _g2["keys?"];
  var empty63 = _g2["empty?"];
  var stash = _g2.stash;
  var unstash = _g2.unstash;
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
    var _g826 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g828) {
        return([false, _g828.message]);
      }
    })();
    var _g1 = _g826[0];
    var x = _g826[1];
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
    var _g827 = args;
    var i = 0;
    while (i < length(_g827)) {
      var arg = _g827[i];
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
