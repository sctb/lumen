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
      var _g80;
      if (nil63(from) || from < 0) {
        _g80 = 0;
      } else {
        _g80 = from;
      }
      var i = _g80;
      var n = length(x);
      var _g81;
      if (nil63(upto) || upto > n) {
        _g81 = n;
      } else {
        _g81 = upto;
      }
      var _g27 = _g81;
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
        var _g82;
        if (isNaN(_g29)) {
          _g82 = k;
        } else {
          _g82 = _g29;
        }
        var _g30 = _g82;
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
        var _g83;
        if (isNaN(_g32)) {
          _g83 = k;
        } else {
          _g83 = _g32;
        }
        var _g33 = _g83;
        c[_g33] = v;
      }
      var _g34 = b;
      var k = undefined;
      for (k in _g34) {
        var v = _g34[k];
        var _g35 = parseInt(k);
        var _g84;
        if (isNaN(_g35)) {
          _g84 = k;
        } else {
          _g84 = _g35;
        }
        var _g36 = _g84;
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
      var _g85;
      if (isNaN(_g38)) {
        _g85 = k;
      } else {
        _g85 = _g38;
      }
      var _g39 = _g85;
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
      var _g86;
      if (isNaN(_g41)) {
        _g86 = _g19;
      } else {
        _g86 = _g41;
      }
      var _g42 = _g86;
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
      var _g87;
      if (isNaN(_g44)) {
        _g87 = _g20;
      } else {
        _g87 = _g44;
      }
      var _g45 = _g87;
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
    var _g88;
    if (f) {
      _g88 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g88));
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
      var _g89;
      if (isNaN(_g48)) {
        _g89 = k;
      } else {
        _g89 = _g48;
      }
      var _g49 = _g89;
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
      var _g90;
      if (isNaN(_g51)) {
        _g90 = k;
      } else {
        _g90 = _g51;
      }
      var _g52 = _g90;
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
      var _g91;
      if (isNaN(_g54)) {
        _g91 = _g22;
      } else {
        _g91 = _g54;
      }
      var _g55 = _g91;
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
        var _g92;
        if (isNaN(_g57)) {
          _g92 = k;
        } else {
          _g92 = _g57;
        }
        var _g58 = _g92;
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
          var _g93;
          if (isNaN(_g60)) {
            _g93 = k;
          } else {
            _g93 = _g60;
          }
          var _g61 = _g93;
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
              var _g94;
              if (isNaN(_g69)) {
                _g94 = k;
              } else {
                _g94 = _g69;
              }
              var _g70 = _g94;
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
              var _g95;
              if (isNaN(_g72)) {
                _g95 = _g24;
              } else {
                _g95 = _g72;
              }
              var _g73 = _g95;
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
      var _g78 = undefined;
      for (_g78 in _g76) {
        var v = _g76[_g78];
        var _g77 = parseInt(_g78);
        var _g96;
        if (isNaN(_g77)) {
          _g96 = _g78;
        } else {
          _g96 = _g77;
        }
        var _g79 = _g96;
        x[_g79] = v;
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
  var _g100 = nexus["lumen/runtime"];
  var nil63 = _g100["nil?"];
  var is63 = _g100["is?"];
  var length = _g100.length;
  var none63 = _g100["none?"];
  var some63 = _g100["some?"];
  var one63 = _g100["one?"];
  var hd = _g100.hd;
  var string63 = _g100["string?"];
  var number63 = _g100["number?"];
  var boolean63 = _g100["boolean?"];
  var function63 = _g100["function?"];
  var composite63 = _g100["composite?"];
  var atom63 = _g100["atom?"];
  var table63 = _g100["table?"];
  var list63 = _g100["list?"];
  var substring = _g100.substring;
  var sub = _g100.sub;
  var inner = _g100.inner;
  var tl = _g100.tl;
  var char = _g100.char;
  var code = _g100.code;
  var string_literal63 = _g100["string-literal?"];
  var id_literal63 = _g100["id-literal?"];
  var add = _g100.add;
  var drop = _g100.drop;
  var last = _g100.last;
  var reverse = _g100.reverse;
  var join = _g100.join;
  var reduce = _g100.reduce;
  var keep = _g100.keep;
  var in63 = _g100["in?"];
  var find = _g100.find;
  var pair = _g100.pair;
  var sort = _g100.sort;
  var iterate = _g100.iterate;
  var replicate = _g100.replicate;
  var series = _g100.series;
  var map = _g100.map;
  var keys63 = _g100["keys?"];
  var empty63 = _g100["empty?"];
  var stash = _g100.stash;
  var unstash = _g100.unstash;
  var search = _g100.search;
  var split = _g100.split;
  var cat = _g100.cat;
  var _43 = _g100["+"];
  var _ = _g100["-"];
  var _42 = _g100["*"];
  var _47 = _g100["/"];
  var _37 = _g100["%"];
  var _62 = _g100[">"];
  var _60 = _g100["<"];
  var _61 = _g100["="];
  var _6261 = _g100[">="];
  var _6061 = _g100["<="];
  var read_file = _g100["read-file"];
  var write_file = _g100["write-file"];
  var write = _g100.write;
  var exit = _g100.exit;
  var today = _g100.today;
  var now = _g100.now;
  var number = _g100.number;
  var string = _g100.string;
  var space = _g100.space;
  var apply = _g100.apply;
  var make_id = _g100["make-id"];
  var _37message_handler = _g100["%message-handler"];
  var toplevel63 = _g100["toplevel?"];
  var module_key = _g100["module-key"];
  var module = _g100.module;
  var setenv = _g100.setenv;
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
      var _g141;
      if (c === "\n") {
        _g141 = "\\n";
      } else {
        var _g142;
        if (c === "\"") {
          _g142 = "\\\"";
        } else {
          var _g143;
          if (c === "\\") {
            _g143 = "\\\\";
          } else {
            _g143 = c;
          }
          _g142 = _g143;
        }
        _g141 = _g142;
      }
      var c1 = _g141;
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
      var _g103 = args;
      var k = undefined;
      for (k in _g103) {
        var v = _g103[k];
        var _g104 = parseInt(k);
        var _g144;
        if (isNaN(_g104)) {
          _g144 = k;
        } else {
          _g144 = _g104;
        }
        var _g105 = _g144;
        if (!number63(_g105)) {
          add(l, literal(_g105));
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
        var i = 0;
        var _g106 = lh;
        var _g107 = 0;
        while (_g107 < length(_g106)) {
          var x = _g106[_g107];
          bs = join(bs, bind(x, ["at", rh, _g107]));
          _g107 = _g107 + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g108 = lh;
        var k = undefined;
        for (k in _g108) {
          if (isNaN(parseInt(k))) {
            var v = _g108[k];
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
      var _g109 = args;
      var _g110 = 0;
      while (_g110 < length(_g109)) {
        var arg = _g109[_g110];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g110 = _g110 + 1;
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
          var _g97 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g98 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g113 = args;
            var _g114 = 0;
            while (_g114 < length(_g113)) {
              var _g111 = _g113[_g114];
              setenv(_g111, {_stash: true, variable: true});
              _g114 = _g114 + 1;
            }
            var _g112 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g112);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g99 = form[0];
              var _g115 = form[1];
              var _g116 = form[2];
              var _g117 = sub(form, 3);
              add(environment, {_scope: true});
              var _g120 = _g116;
              var _g121 = 0;
              while (_g121 < length(_g120)) {
                var _g118 = _g120[_g121];
                setenv(_g118, {_stash: true, variable: true});
                _g121 = _g121 + 1;
              }
              var _g119 = join([x, _g115, _g116], macroexpand(_g117));
              drop(environment);
              return(_g119);
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
    var _g122 = form;
    var k = undefined;
    for (k in _g122) {
      if (isNaN(parseInt(k))) {
        var v = _g122[k];
        var _g145;
        if (quasisplice63(v, depth)) {
          _g145 = quasiexpand(v[1]);
        } else {
          _g145 = quasiexpand(v, depth);
        }
        var _g123 = _g145;
        last(xs)[k] = _g123;
      }
    }
    var _g124 = form;
    var _g125 = 0;
    while (_g125 < length(_g124)) {
      var x = _g124[_g125];
      if (quasisplice63(x, depth)) {
        var _g126 = quasiexpand(x[1]);
        add(xs, _g126);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g125 = _g125 + 1;
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
      var _g146;
      if (c === "-") {
        _g146 = "_";
      } else {
        var _g147;
        if (valid_code63(n)) {
          _g147 = c;
        } else {
          var _g148;
          if (i === 0) {
            _g148 = "_" + n;
          } else {
            _g148 = n;
          }
          _g147 = _g148;
        }
        _g146 = _g147;
      }
      var c1 = _g146;
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
    var _g131 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g132 = _g131.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g133 = module(spec).export;
      var n = undefined;
      for (n in _g133) {
        if (isNaN(parseInt(n))) {
          var b = _g133[n];
          if (b.variable && (_g132 || b.export)) {
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
    var _g134 = sub(xs, 0);
    return(join(t, _g134));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g135 = sub(keys, 0);
    var t1 = [];
    var _g136 = t;
    var _g137 = 0;
    while (_g137 < length(_g136)) {
      var x = _g136[_g137];
      add(t1, x);
      _g137 = _g137 + 1;
    }
    var _g138 = t;
    var k = undefined;
    for (k in _g138) {
      if (isNaN(parseInt(k))) {
        var v = _g138[k];
        if (!_g135[k]) {
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
    var _g139 = t;
    var k = undefined;
    for (k in _g139) {
      if (isNaN(parseInt(k))) {
        var v = _g139[k];
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
    var _g140 = ["table"];
    _g140.import = quoted(m.import);
    _g140.alias = quoted(m.alias);
    _g140.export = quote_frame(m.export);
    return(_g140);
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
  var _g149 = nexus["lumen/runtime"];
  var nil63 = _g149["nil?"];
  var is63 = _g149["is?"];
  var length = _g149.length;
  var none63 = _g149["none?"];
  var some63 = _g149["some?"];
  var one63 = _g149["one?"];
  var hd = _g149.hd;
  var string63 = _g149["string?"];
  var number63 = _g149["number?"];
  var boolean63 = _g149["boolean?"];
  var function63 = _g149["function?"];
  var composite63 = _g149["composite?"];
  var atom63 = _g149["atom?"];
  var table63 = _g149["table?"];
  var list63 = _g149["list?"];
  var substring = _g149.substring;
  var sub = _g149.sub;
  var inner = _g149.inner;
  var tl = _g149.tl;
  var char = _g149.char;
  var code = _g149.code;
  var string_literal63 = _g149["string-literal?"];
  var id_literal63 = _g149["id-literal?"];
  var add = _g149.add;
  var drop = _g149.drop;
  var last = _g149.last;
  var reverse = _g149.reverse;
  var join = _g149.join;
  var reduce = _g149.reduce;
  var keep = _g149.keep;
  var in63 = _g149["in?"];
  var find = _g149.find;
  var pair = _g149.pair;
  var sort = _g149.sort;
  var iterate = _g149.iterate;
  var replicate = _g149.replicate;
  var series = _g149.series;
  var map = _g149.map;
  var keys63 = _g149["keys?"];
  var empty63 = _g149["empty?"];
  var stash = _g149.stash;
  var unstash = _g149.unstash;
  var search = _g149.search;
  var split = _g149.split;
  var cat = _g149.cat;
  var _43 = _g149["+"];
  var _ = _g149["-"];
  var _42 = _g149["*"];
  var _47 = _g149["/"];
  var _37 = _g149["%"];
  var _62 = _g149[">"];
  var _60 = _g149["<"];
  var _61 = _g149["="];
  var _6261 = _g149[">="];
  var _6061 = _g149["<="];
  var read_file = _g149["read-file"];
  var write_file = _g149["write-file"];
  var write = _g149.write;
  var exit = _g149.exit;
  var today = _g149.today;
  var now = _g149.now;
  var number = _g149.number;
  var string = _g149.string;
  var space = _g149.space;
  var apply = _g149.apply;
  var make_id = _g149["make-id"];
  var _37message_handler = _g149["%message-handler"];
  var toplevel63 = _g149["toplevel?"];
  var module_key = _g149["module-key"];
  var module = _g149.module;
  var setenv = _g149.setenv;
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
  var _g160 = nexus["lumen/runtime"];
  var nil63 = _g160["nil?"];
  var is63 = _g160["is?"];
  var length = _g160.length;
  var none63 = _g160["none?"];
  var some63 = _g160["some?"];
  var one63 = _g160["one?"];
  var hd = _g160.hd;
  var string63 = _g160["string?"];
  var number63 = _g160["number?"];
  var boolean63 = _g160["boolean?"];
  var function63 = _g160["function?"];
  var composite63 = _g160["composite?"];
  var atom63 = _g160["atom?"];
  var table63 = _g160["table?"];
  var list63 = _g160["list?"];
  var substring = _g160.substring;
  var sub = _g160.sub;
  var inner = _g160.inner;
  var tl = _g160.tl;
  var char = _g160.char;
  var code = _g160.code;
  var string_literal63 = _g160["string-literal?"];
  var id_literal63 = _g160["id-literal?"];
  var add = _g160.add;
  var drop = _g160.drop;
  var last = _g160.last;
  var reverse = _g160.reverse;
  var join = _g160.join;
  var reduce = _g160.reduce;
  var keep = _g160.keep;
  var in63 = _g160["in?"];
  var find = _g160.find;
  var pair = _g160.pair;
  var sort = _g160.sort;
  var iterate = _g160.iterate;
  var replicate = _g160.replicate;
  var series = _g160.series;
  var map = _g160.map;
  var keys63 = _g160["keys?"];
  var empty63 = _g160["empty?"];
  var stash = _g160.stash;
  var unstash = _g160.unstash;
  var search = _g160.search;
  var split = _g160.split;
  var cat = _g160.cat;
  var _43 = _g160["+"];
  var _ = _g160["-"];
  var _42 = _g160["*"];
  var _47 = _g160["/"];
  var _37 = _g160["%"];
  var _62 = _g160[">"];
  var _60 = _g160["<"];
  var _61 = _g160["="];
  var _6261 = _g160[">="];
  var _6061 = _g160["<="];
  var read_file = _g160["read-file"];
  var write_file = _g160["write-file"];
  var write = _g160.write;
  var exit = _g160.exit;
  var today = _g160.today;
  var now = _g160.now;
  var number = _g160.number;
  var string = _g160.string;
  var space = _g160.space;
  var apply = _g160.apply;
  var make_id = _g160["make-id"];
  var _37message_handler = _g160["%message-handler"];
  var toplevel63 = _g160["toplevel?"];
  var module_key = _g160["module-key"];
  var module = _g160.module;
  var setenv = _g160.setenv;
  var _g163 = nexus["lumen/lib"];
  var getenv = _g163.getenv;
  var macro_function = _g163["macro-function"];
  var macro63 = _g163["macro?"];
  var special63 = _g163["special?"];
  var special_form63 = _g163["special-form?"];
  var statement63 = _g163["statement?"];
  var symbol_expansion = _g163["symbol-expansion"];
  var symbol63 = _g163["symbol?"];
  var variable63 = _g163["variable?"];
  var bound63 = _g163["bound?"];
  var quoted = _g163.quoted;
  var stash42 = _g163["stash*"];
  var bind = _g163.bind;
  var bind42 = _g163["bind*"];
  var quasiexpand = _g163.quasiexpand;
  var macroexpand = _g163.macroexpand;
  var indentation = _g163.indentation;
  var reserved63 = _g163["reserved?"];
  var valid_id63 = _g163["valid-id?"];
  var id = _g163.id;
  var key = _g163.key;
  var imported = _g163.imported;
  var link = _g163.link;
  var mapo = _g163.mapo;
  var quote_environment = _g163["quote-environment"];
  var quote_modules = _g163["quote-modules"];
  var initial_environment = _g163["initial-environment"];
  var _g164 = nexus["lumen/reader"];
  var make_stream = _g164["make-stream"];
  var read_table = _g164["read-table"];
  var read = _g164.read;
  var read_all = _g164["read-all"];
  var read_from_string = _g164["read-from-string"];
  var _g168 = [];
  _g168.js = "!";
  _g168.lua = "not ";
  var _g166 = [];
  var _g169 = [];
  _g169.js = "!";
  _g169.lua = "not ";
  _g166["not"] = _g169;
  var _g171 = [];
  _g171["*"] = true;
  _g171["/"] = true;
  _g171["%"] = true;
  var _g173 = [];
  _g173["+"] = true;
  _g173["-"] = true;
  var _g177 = [];
  _g177.js = "+";
  _g177.lua = "..";
  var _g175 = [];
  var _g178 = [];
  _g178.js = "+";
  _g178.lua = "..";
  _g175.cat = _g178;
  var _g180 = [];
  _g180["<"] = true;
  _g180[">"] = true;
  _g180["<="] = true;
  _g180[">="] = true;
  var _g184 = [];
  _g184.js = "===";
  _g184.lua = "==";
  var _g186 = [];
  _g186.js = "!=";
  _g186.lua = "~=";
  var _g182 = [];
  var _g187 = [];
  _g187.js = "===";
  _g187.lua = "==";
  _g182["="] = _g187;
  var _g188 = [];
  _g188.js = "!=";
  _g188.lua = "~=";
  _g182["~="] = _g188;
  var _g192 = [];
  _g192.js = "&&";
  _g192.lua = "and";
  var _g190 = [];
  var _g193 = [];
  _g193.js = "&&";
  _g193.lua = "and";
  _g190["and"] = _g193;
  var _g197 = [];
  _g197.js = "||";
  _g197.lua = "or";
  var _g195 = [];
  var _g198 = [];
  _g198.js = "||";
  _g198.lua = "or";
  _g195["or"] = _g198;
  var infix = [_g166, _g171, _g173, _g175, _g180, _g182, _g190, _g195];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g199 = infix;
      var i = 0;
      while (i < length(_g199)) {
        var level = _g199[i];
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
    var _g200 = args;
    var i = 0;
    while (i < length(_g200)) {
      var arg = _g200[i];
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
    var _g201 = getenv(x);
    var special = _g201.special;
    var stmt = _g201.stmt;
    var self_tr63 = _g201.tr;
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
    var _g202 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g202.right;
    var _g231;
    if (right) {
      _g231 = _6261;
    } else {
      _g231 = _62;
    }
    if (_g231(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g203 = sub(form, 1);
    var a = _g203[0];
    var b = _g203[1];
    var _g204 = op_delims(form, a);
    var ao = _g204[0];
    var ac = _g204[1];
    var _g205 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g205[0];
    var bc = _g205[1];
    var _g206 = compile(a);
    var _g207 = compile(b);
    var _g208 = getop(op);
    if (unary63(form)) {
      return(_g208 + ao + _g206 + ac);
    } else {
      return(ao + _g206 + ac + " " + _g208 + " " + bo + _g207 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g209 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g209.name;
    var prefix = _g209.prefix;
    var _g232;
    if (name) {
      _g232 = compile(name);
    } else {
      _g232 = "";
    }
    var id = _g232;
    var _g210 = prefix || "";
    var _g211 = compile_args(args);
    indent_level = indent_level + 1;
    var _g213 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g212 = _g213;
    var ind = indentation();
    var _g233;
    if (target === "js") {
      _g233 = "";
    } else {
      _g233 = "end";
    }
    var tr = _g233;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g211 + " {\n" + _g212 + ind + "}" + tr);
    } else {
      return(_g210 + "function " + id + _g211 + "\n" + _g212 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g214 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g214.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g234;
        if (stmt) {
          _g234 = indentation();
        } else {
          _g234 = "";
        }
        var ind = _g234;
        var _g235;
        if (atom63(form)) {
          _g235 = compile_atom(form);
        } else {
          var _g236;
          if (infix63(hd(form))) {
            _g236 = compile_infix(form);
          } else {
            _g236 = compile_call(form);
          }
          _g235 = _g236;
        }
        var _g215 = _g235;
        return(ind + _g215 + tr);
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
    var _g216 = sub(args, 0, length(args) - 1);
    var _g217 = 0;
    while (_g217 < length(_g216)) {
      var x = _g216[_g217];
      add(hoist, lower(x, hoist, stmt63));
      _g217 = _g217 + 1;
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
    var _g218 = args[1];
    var _g219 = args[2];
    if (stmt63 || tail63) {
      var _g238;
      if (_g219) {
        _g238 = [lower_body([_g219], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g218], tail63)], _g238)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g237;
      if (_g219) {
        _g237 = [lower(["set", e, _g219])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g218])], _g237));
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
      var _g239;
      if (x === "and") {
        _g239 = ["%if", id, b, id];
      } else {
        _g239 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g239], hoist));
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
    var _g220 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g220, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g221 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g221)) {
      return(_g221);
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
    var _g222 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g223 = _g222.all;
    var m = module(spec);
    var frame = last(environment);
    var _g224 = m.export;
    var k = undefined;
    for (k in _g224) {
      if (isNaN(parseInt(k))) {
        var v = _g224[k];
        if (v.export || _g223) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g225 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g226 = _g225.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g226}));
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
    var _g227 = specs || [];
    var _g228 = 0;
    while (_g228 < length(_g227)) {
      var spec = _g227[_g228];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g229 = import_modules(m.alias);
        var aliased = _g229[0];
        var bs = _g229[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g230 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g230);
      }
      _g228 = _g228 + 1;
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
  var _g240 = nexus["lumen/runtime"];
  var nil63 = _g240["nil?"];
  var is63 = _g240["is?"];
  var length = _g240.length;
  var none63 = _g240["none?"];
  var some63 = _g240["some?"];
  var one63 = _g240["one?"];
  var hd = _g240.hd;
  var string63 = _g240["string?"];
  var number63 = _g240["number?"];
  var boolean63 = _g240["boolean?"];
  var function63 = _g240["function?"];
  var composite63 = _g240["composite?"];
  var atom63 = _g240["atom?"];
  var table63 = _g240["table?"];
  var list63 = _g240["list?"];
  var substring = _g240.substring;
  var sub = _g240.sub;
  var inner = _g240.inner;
  var tl = _g240.tl;
  var char = _g240.char;
  var code = _g240.code;
  var string_literal63 = _g240["string-literal?"];
  var id_literal63 = _g240["id-literal?"];
  var add = _g240.add;
  var drop = _g240.drop;
  var last = _g240.last;
  var reverse = _g240.reverse;
  var join = _g240.join;
  var reduce = _g240.reduce;
  var keep = _g240.keep;
  var in63 = _g240["in?"];
  var find = _g240.find;
  var pair = _g240.pair;
  var sort = _g240.sort;
  var iterate = _g240.iterate;
  var replicate = _g240.replicate;
  var series = _g240.series;
  var map = _g240.map;
  var keys63 = _g240["keys?"];
  var empty63 = _g240["empty?"];
  var stash = _g240.stash;
  var unstash = _g240.unstash;
  var search = _g240.search;
  var split = _g240.split;
  var cat = _g240.cat;
  var _43 = _g240["+"];
  var _ = _g240["-"];
  var _42 = _g240["*"];
  var _47 = _g240["/"];
  var _37 = _g240["%"];
  var _62 = _g240[">"];
  var _60 = _g240["<"];
  var _61 = _g240["="];
  var _6261 = _g240[">="];
  var _6061 = _g240["<="];
  var read_file = _g240["read-file"];
  var write_file = _g240["write-file"];
  var write = _g240.write;
  var exit = _g240.exit;
  var today = _g240.today;
  var now = _g240.now;
  var number = _g240.number;
  var string = _g240.string;
  var space = _g240.space;
  var apply = _g240.apply;
  var make_id = _g240["make-id"];
  var _37message_handler = _g240["%message-handler"];
  var toplevel63 = _g240["toplevel?"];
  var module_key = _g240["module-key"];
  var module = _g240.module;
  var setenv = _g240.setenv;
  var _g243 = nexus["lumen/lib"];
  var getenv = _g243.getenv;
  var macro_function = _g243["macro-function"];
  var macro63 = _g243["macro?"];
  var special63 = _g243["special?"];
  var special_form63 = _g243["special-form?"];
  var statement63 = _g243["statement?"];
  var symbol_expansion = _g243["symbol-expansion"];
  var symbol63 = _g243["symbol?"];
  var variable63 = _g243["variable?"];
  var bound63 = _g243["bound?"];
  var quoted = _g243.quoted;
  var stash42 = _g243["stash*"];
  var bind = _g243.bind;
  var bind42 = _g243["bind*"];
  var quasiexpand = _g243.quasiexpand;
  var macroexpand = _g243.macroexpand;
  var indentation = _g243.indentation;
  var reserved63 = _g243["reserved?"];
  var valid_id63 = _g243["valid-id?"];
  var id = _g243.id;
  var key = _g243.key;
  var imported = _g243.imported;
  var link = _g243.link;
  var mapo = _g243.mapo;
  var quote_environment = _g243["quote-environment"];
  var quote_modules = _g243["quote-modules"];
  var initial_environment = _g243["initial-environment"];
  var _g244 = nexus["lumen/compiler"];
  var compile_function = _g244["compile-function"];
  var compile = _g244.compile;
  var open_module = _g244["open-module"];
  var load_module = _g244["load-module"];
  var in_module = _g244["in-module"];
  var import_modules = _g244["import-modules"];
  var compile_module = _g244["compile-module"];
  var declare = _g244.declare;
  var eval = _g244.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g418 = nexus["lumen/runtime"];
  var nil63 = _g418["nil?"];
  var is63 = _g418["is?"];
  var length = _g418.length;
  var none63 = _g418["none?"];
  var some63 = _g418["some?"];
  var one63 = _g418["one?"];
  var hd = _g418.hd;
  var string63 = _g418["string?"];
  var number63 = _g418["number?"];
  var boolean63 = _g418["boolean?"];
  var function63 = _g418["function?"];
  var composite63 = _g418["composite?"];
  var atom63 = _g418["atom?"];
  var table63 = _g418["table?"];
  var list63 = _g418["list?"];
  var substring = _g418.substring;
  var sub = _g418.sub;
  var inner = _g418.inner;
  var tl = _g418.tl;
  var char = _g418.char;
  var code = _g418.code;
  var string_literal63 = _g418["string-literal?"];
  var id_literal63 = _g418["id-literal?"];
  var add = _g418.add;
  var drop = _g418.drop;
  var last = _g418.last;
  var reverse = _g418.reverse;
  var join = _g418.join;
  var reduce = _g418.reduce;
  var keep = _g418.keep;
  var in63 = _g418["in?"];
  var find = _g418.find;
  var pair = _g418.pair;
  var sort = _g418.sort;
  var iterate = _g418.iterate;
  var replicate = _g418.replicate;
  var series = _g418.series;
  var map = _g418.map;
  var keys63 = _g418["keys?"];
  var empty63 = _g418["empty?"];
  var stash = _g418.stash;
  var unstash = _g418.unstash;
  var search = _g418.search;
  var split = _g418.split;
  var cat = _g418.cat;
  var _43 = _g418["+"];
  var _ = _g418["-"];
  var _42 = _g418["*"];
  var _47 = _g418["/"];
  var _37 = _g418["%"];
  var _62 = _g418[">"];
  var _60 = _g418["<"];
  var _61 = _g418["="];
  var _6261 = _g418[">="];
  var _6061 = _g418["<="];
  var read_file = _g418["read-file"];
  var write_file = _g418["write-file"];
  var write = _g418.write;
  var exit = _g418.exit;
  var today = _g418.today;
  var now = _g418.now;
  var number = _g418.number;
  var string = _g418.string;
  var space = _g418.space;
  var apply = _g418.apply;
  var make_id = _g418["make-id"];
  var _37message_handler = _g418["%message-handler"];
  var toplevel63 = _g418["toplevel?"];
  var module_key = _g418["module-key"];
  var module = _g418.module;
  var setenv = _g418.setenv;
  var _g421 = nexus["lumen/lib"];
  var getenv = _g421.getenv;
  var macro_function = _g421["macro-function"];
  var macro63 = _g421["macro?"];
  var special63 = _g421["special?"];
  var special_form63 = _g421["special-form?"];
  var statement63 = _g421["statement?"];
  var symbol_expansion = _g421["symbol-expansion"];
  var symbol63 = _g421["symbol?"];
  var variable63 = _g421["variable?"];
  var bound63 = _g421["bound?"];
  var quoted = _g421.quoted;
  var stash42 = _g421["stash*"];
  var bind = _g421.bind;
  var bind42 = _g421["bind*"];
  var quasiexpand = _g421.quasiexpand;
  var macroexpand = _g421.macroexpand;
  var indentation = _g421.indentation;
  var reserved63 = _g421["reserved?"];
  var valid_id63 = _g421["valid-id?"];
  var id = _g421.id;
  var key = _g421.key;
  var imported = _g421.imported;
  var link = _g421.link;
  var mapo = _g421.mapo;
  var quote_environment = _g421["quote-environment"];
  var quote_modules = _g421["quote-modules"];
  var initial_environment = _g421["initial-environment"];
  var _g422 = nexus["lumen/compiler"];
  var compile_function = _g422["compile-function"];
  var compile = _g422.compile;
  var open_module = _g422["open-module"];
  var load_module = _g422["load-module"];
  var in_module = _g422["in-module"];
  var import_modules = _g422["import-modules"];
  var compile_module = _g422["compile-module"];
  var declare = _g422.declare;
  var eval = _g422.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g731 = nexus["lumen/runtime"];
  var nil63 = _g731["nil?"];
  var is63 = _g731["is?"];
  var length = _g731.length;
  var none63 = _g731["none?"];
  var some63 = _g731["some?"];
  var one63 = _g731["one?"];
  var hd = _g731.hd;
  var string63 = _g731["string?"];
  var number63 = _g731["number?"];
  var boolean63 = _g731["boolean?"];
  var function63 = _g731["function?"];
  var composite63 = _g731["composite?"];
  var atom63 = _g731["atom?"];
  var table63 = _g731["table?"];
  var list63 = _g731["list?"];
  var substring = _g731.substring;
  var sub = _g731.sub;
  var inner = _g731.inner;
  var tl = _g731.tl;
  var char = _g731.char;
  var code = _g731.code;
  var string_literal63 = _g731["string-literal?"];
  var id_literal63 = _g731["id-literal?"];
  var add = _g731.add;
  var drop = _g731.drop;
  var last = _g731.last;
  var reverse = _g731.reverse;
  var join = _g731.join;
  var reduce = _g731.reduce;
  var keep = _g731.keep;
  var in63 = _g731["in?"];
  var find = _g731.find;
  var pair = _g731.pair;
  var sort = _g731.sort;
  var iterate = _g731.iterate;
  var replicate = _g731.replicate;
  var series = _g731.series;
  var map = _g731.map;
  var keys63 = _g731["keys?"];
  var empty63 = _g731["empty?"];
  var stash = _g731.stash;
  var unstash = _g731.unstash;
  var search = _g731.search;
  var split = _g731.split;
  var cat = _g731.cat;
  var _43 = _g731["+"];
  var _ = _g731["-"];
  var _42 = _g731["*"];
  var _47 = _g731["/"];
  var _37 = _g731["%"];
  var _62 = _g731[">"];
  var _60 = _g731["<"];
  var _61 = _g731["="];
  var _6261 = _g731[">="];
  var _6061 = _g731["<="];
  var read_file = _g731["read-file"];
  var write_file = _g731["write-file"];
  var write = _g731.write;
  var exit = _g731.exit;
  var today = _g731.today;
  var now = _g731.now;
  var number = _g731.number;
  var string = _g731.string;
  var space = _g731.space;
  var apply = _g731.apply;
  var make_id = _g731["make-id"];
  var _37message_handler = _g731["%message-handler"];
  var toplevel63 = _g731["toplevel?"];
  var module_key = _g731["module-key"];
  var module = _g731.module;
  var setenv = _g731.setenv;
  var _g734 = nexus["lumen/lib"];
  var getenv = _g734.getenv;
  var macro_function = _g734["macro-function"];
  var macro63 = _g734["macro?"];
  var special63 = _g734["special?"];
  var special_form63 = _g734["special-form?"];
  var statement63 = _g734["statement?"];
  var symbol_expansion = _g734["symbol-expansion"];
  var symbol63 = _g734["symbol?"];
  var variable63 = _g734["variable?"];
  var bound63 = _g734["bound?"];
  var quoted = _g734.quoted;
  var stash42 = _g734["stash*"];
  var bind = _g734.bind;
  var bind42 = _g734["bind*"];
  var quasiexpand = _g734.quasiexpand;
  var macroexpand = _g734.macroexpand;
  var indentation = _g734.indentation;
  var reserved63 = _g734["reserved?"];
  var valid_id63 = _g734["valid-id?"];
  var id = _g734.id;
  var key = _g734.key;
  var imported = _g734.imported;
  var link = _g734.link;
  var mapo = _g734.mapo;
  var quote_environment = _g734["quote-environment"];
  var quote_modules = _g734["quote-modules"];
  var initial_environment = _g734["initial-environment"];
  var _g735 = nexus["lumen/compiler"];
  var compile_function = _g735["compile-function"];
  var compile = _g735.compile;
  var open_module = _g735["open-module"];
  var load_module = _g735["load-module"];
  var in_module = _g735["in-module"];
  var import_modules = _g735["import-modules"];
  var compile_module = _g735["compile-module"];
  var declare = _g735.declare;
  var eval = _g735.eval;
  global.modules = {lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
      var _g748 = body;
      var k = undefined;
      for (k in _g748) {
        if (isNaN(parseInt(k))) {
          var v = _g748[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g749) {
      var a = _g749[0];
      var b = _g749[1];
      var c = sub(_g749, 2);
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
    var _g750 = sub(body, 0);
    return(["if", cond, join(["do"], _g750)]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g751 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g751)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g752 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g752));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g753 = bind(lh, rh);
      var _g754 = 0;
      while (_g754 < length(_g753)) {
        var _g755 = _g753[_g754];
        var id = _g755[0];
        var val = _g755[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g754 = _g754 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g752)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g756 = sub(body, 0);
    var imp = _g756.import;
    var exp = _g756.export;
    var alias = _g756.alias;
    var _g757 = import_modules(imp);
    var imports = _g757[0];
    var bindings = _g757[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g758 = exp || [];
    var _g759 = 0;
    while (_g759 < length(_g758)) {
      var x = _g758[_g759];
      setenv(x, {_stash: true, export: true});
      _g759 = _g759 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g760 = sub(body, 0);
    var form = join(["fn", args], _g760);
    var _g761 = ["setenv", ["quote", name]];
    _g761.macro = form;
    _g761.form = ["quote", form];
    eval(_g761);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g762 = sub(body, 0);
    var form = join(["fn", args], _g762);
    var keys = sub(_g762, length(_g762));
    var _g763 = ["setenv", ["quote", name]];
    _g763.special = form;
    _g763.form = ["quote", form];
    eval(join(_g763, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g764 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g764)) {
      var _g765 = bind42(x, _g764);
      var args = _g765[0];
      var _g766 = _g765[1];
      return(join(["%global-function", name, args], _g766));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g767 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g767) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g767)]));
    } else {
      if (some63(_g767)) {
        var _g768 = bind42(x, _g767);
        var args = _g768[0];
        var _g769 = _g768[1];
        return(link(name, join(["%local-function", name, args], _g769)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g770) {
    var names = _g770[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g771 = sub(body, 0);
    var x = make_id();
    var _g773 = ["setenv", x];
    _g773.variable = true;
    var _g772 = ["with-frame", ["each", [x], names, _g773]];
    _g772.scope = true;
    return(join(_g772, _g771));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g774 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g775 = join(["do"], macroexpand(_g774));
    drop(environment);
    return(_g775);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g776 = sub(body, 0);
    add(environment, {});
    map(function (_g778) {
      var name = _g778[0];
      var exp = _g778[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g777 = join(["do"], macroexpand(_g776));
    drop(environment);
    return(_g777);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g779 = sub(body, 0);
    var _g780 = bind42(args, _g779);
    var _g781 = _g780[0];
    var _g782 = _g780[1];
    return(join(["%function", _g781], _g782));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g783, t) {
    var k = _g783[0];
    var v = _g783[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g784 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g819;
    if (target === "lua") {
      _g819 = _g784;
    } else {
      _g819 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g784)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g819)]]);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g785 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g820;
    if (nil63(v)) {
      var _g821;
      if (b.i) {
        _g821 = "i";
      } else {
        _g821 = make_id();
      }
      var i = _g821;
      _g820 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g785), ["inc", i]]];
    } else {
      var _g786 = ["target"];
      _g786.js = ["isNaN", ["parseInt", k]];
      _g786.lua = ["not", ["number?", k]];
      _g820 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g786, join(["let", [v, ["get", t1, k]]], _g785)]]];
    }
    return(["let", [t1, t], _g820]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g787 = xs;
    var _g788 = 0;
    while (_g788 < length(_g787)) {
      var x = _g787[_g788];
      l[x] = true;
      _g788 = _g788 + 1;
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g789 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g789)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g790 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g790)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g791 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g792 = ["table"];
    _g792._scope = scope;
    return(["do", ["add", "environment", _g792], ["let", [x, join(["do"], _g791)], ["drop", "environment"], x]]);
  }}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {stmt: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g793 = forms;
    var _g794 = 0;
    while (_g794 < length(_g793)) {
      var x = _g793[_g794];
      str = str + compile(x, {_stash: true, stmt: true});
      _g794 = _g794 + 1;
    }
    return(str);
  }, foo: true, export: true, tr: true}, "%if": {stmt: true, special: function (cond, cons, alt) {
    var _g795 = compile(cond);
    indent_level = indent_level + 1;
    var _g797 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g796 = _g797;
    var _g822;
    if (alt) {
      indent_level = indent_level + 1;
      var _g799 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g822 = _g799;
    }
    var _g798 = _g822;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g795 + ") {\n" + _g796 + ind + "}";
    } else {
      str = str + ind + "if " + _g795 + " then\n" + _g796;
    }
    if (_g798 && target === "js") {
      str = str + " else {\n" + _g798 + ind + "}";
    } else {
      if (_g798) {
        str = str + ind + "else\n" + _g798;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true, export: true, tr: true}, "while": {stmt: true, special: function (cond, form) {
    var _g800 = compile(cond);
    indent_level = indent_level + 1;
    var _g801 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g801;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g800 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g800 + " do\n" + body + ind + "end\n");
    }
  }, foo: true, export: true, tr: true}, "%for": {stmt: true, special: function (t, k, form) {
    var _g802 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g803 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g803;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g802 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g802 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true, export: true, tr: true}, "%try": {stmt: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g804 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g804;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g805 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g805;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true, export: true, tr: true}, "break": {special: function () {
    return(indentation() + "break");
  }, stmt: true, foo: true, export: true}, "%function": {foo: true, export: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "%global-function": {stmt: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true, export: true, tr: true}, "%local-function": {stmt: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true, export: true, tr: true}, "return": {special: function (x) {
    var _g823;
    if (nil63(x)) {
      _g823 = "return";
    } else {
      _g823 = "return(" + compile(x) + ")";
    }
    var _g806 = _g823;
    return(indentation() + _g806);
  }, stmt: true, foo: true, export: true}, error: {special: function (x) {
    var _g824;
    if (target === "js") {
      _g824 = "throw new " + compile(["Error", x]);
    } else {
      _g824 = "error(" + compile(x) + ")";
    }
    var e = _g824;
    return(indentation() + e);
  }, stmt: true, foo: true, export: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g825;
    if (is63(value)) {
      _g825 = " = " + value1;
    } else {
      _g825 = "";
    }
    var rh = _g825;
    var _g826;
    if (target === "js") {
      _g826 = "var ";
    } else {
      _g826 = "local ";
    }
    var keyword = _g826;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true, foo: true, export: true}, set: {special: function (lh, rh) {
    var _g807 = compile(lh);
    var _g827;
    if (nil63(rh)) {
      _g827 = "nil";
    } else {
      _g827 = rh;
    }
    var _g808 = compile(_g827);
    return(indentation() + _g807 + " = " + _g808);
  }, stmt: true, foo: true, export: true}, get: {foo: true, export: true, special: function (t, k) {
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
  }}, "not": {}, "%array": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g828;
    if (target === "lua") {
      _g828 = "{";
    } else {
      _g828 = "[";
    }
    var open = _g828;
    var _g829;
    if (target === "lua") {
      _g829 = "}";
    } else {
      _g829 = "]";
    }
    var close = _g829;
    var str = "";
    var _g810 = forms;
    var i = 0;
    while (i < length(_g810)) {
      var x = _g810[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%object": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g830;
    if (target === "lua") {
      _g830 = " = ";
    } else {
      _g830 = ": ";
    }
    var sep = _g830;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g811 = pairs;
    var i = 0;
    while (i < length(_g811)) {
      var _g812 = _g811[i];
      var k = _g812[0];
      var v = _g812[1];
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
  }}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g813) {
    var char = _g813[0];
    var stream = _g813[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g814 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g814)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {global: true, export: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g815 = sub(body, 0);
    var imp = _g815.import;
    var exp = _g815.export;
    var alias = _g815.alias;
    var _g816 = import_modules(imp);
    var imports = _g816[0];
    var bindings = _g816[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g817 = exp || [];
    var _g818 = 0;
    while (_g818 < length(_g817)) {
      var x = _g817[_g818];
      setenv(x, {_stash: true, export: true});
      _g818 = _g818 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g831 = nexus["lumen/runtime"];
  var nil63 = _g831["nil?"];
  var is63 = _g831["is?"];
  var length = _g831.length;
  var none63 = _g831["none?"];
  var some63 = _g831["some?"];
  var one63 = _g831["one?"];
  var hd = _g831.hd;
  var string63 = _g831["string?"];
  var number63 = _g831["number?"];
  var boolean63 = _g831["boolean?"];
  var function63 = _g831["function?"];
  var composite63 = _g831["composite?"];
  var atom63 = _g831["atom?"];
  var table63 = _g831["table?"];
  var list63 = _g831["list?"];
  var substring = _g831.substring;
  var sub = _g831.sub;
  var inner = _g831.inner;
  var tl = _g831.tl;
  var char = _g831.char;
  var code = _g831.code;
  var string_literal63 = _g831["string-literal?"];
  var id_literal63 = _g831["id-literal?"];
  var add = _g831.add;
  var drop = _g831.drop;
  var last = _g831.last;
  var reverse = _g831.reverse;
  var join = _g831.join;
  var reduce = _g831.reduce;
  var keep = _g831.keep;
  var in63 = _g831["in?"];
  var find = _g831.find;
  var pair = _g831.pair;
  var sort = _g831.sort;
  var iterate = _g831.iterate;
  var replicate = _g831.replicate;
  var series = _g831.series;
  var map = _g831.map;
  var keys63 = _g831["keys?"];
  var empty63 = _g831["empty?"];
  var stash = _g831.stash;
  var unstash = _g831.unstash;
  var search = _g831.search;
  var split = _g831.split;
  var cat = _g831.cat;
  var _43 = _g831["+"];
  var _ = _g831["-"];
  var _42 = _g831["*"];
  var _47 = _g831["/"];
  var _37 = _g831["%"];
  var _62 = _g831[">"];
  var _60 = _g831["<"];
  var _61 = _g831["="];
  var _6261 = _g831[">="];
  var _6061 = _g831["<="];
  var read_file = _g831["read-file"];
  var write_file = _g831["write-file"];
  var write = _g831.write;
  var exit = _g831.exit;
  var today = _g831.today;
  var now = _g831.now;
  var number = _g831.number;
  var string = _g831.string;
  var space = _g831.space;
  var apply = _g831.apply;
  var make_id = _g831["make-id"];
  var _37message_handler = _g831["%message-handler"];
  var toplevel63 = _g831["toplevel?"];
  var module_key = _g831["module-key"];
  var module = _g831.module;
  var setenv = _g831.setenv;
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
    var _g834 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g836) {
        return([false, _g836.message]);
      }
    })();
    var _g1 = _g834[0];
    var x = _g834[1];
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
    var _g835 = args;
    var i = 0;
    while (i < length(_g835)) {
      var arg = _g835[i];
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
