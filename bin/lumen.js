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
      var _g142;
      if (c === "\n") {
        _g142 = "\\n";
      } else {
        var _g143;
        if (c === "\"") {
          _g143 = "\\\"";
        } else {
          var _g144;
          if (c === "\\") {
            _g144 = "\\\\";
          } else {
            _g144 = c;
          }
          _g143 = _g144;
        }
        _g142 = _g143;
      }
      var c1 = _g142;
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
        var _g145;
        if (isNaN(_g104)) {
          _g145 = k;
        } else {
          _g145 = _g104;
        }
        var _g105 = _g145;
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
        var _g106 = lh;
        var k = undefined;
        for (k in _g106) {
          var v = _g106[k];
          var _g107 = parseInt(k);
          var _g146;
          if (isNaN(_g107)) {
            _g146 = k;
          } else {
            _g146 = _g107;
          }
          var _g108 = _g146;
          var _g147;
          if (_g108 === "rest") {
            _g147 = ["sub", rh, length(lh)];
          } else {
            _g147 = ["get", rh, ["quote", _g108]];
          }
          var x = _g147;
          var _g148;
          if (v === true) {
            _g148 = _g108;
          } else {
            _g148 = v;
          }
          var _g109 = _g148;
          bs = join(bs, bind(_g109, x));
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
      var _g110 = args;
      var _g111 = 0;
      while (_g111 < length(_g110)) {
        var arg = _g110[_g111];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g111 = _g111 + 1;
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
            var _g114 = args;
            var _g115 = 0;
            while (_g115 < length(_g114)) {
              var _g112 = _g114[_g115];
              setenv(_g112, {_stash: true, variable: true});
              _g115 = _g115 + 1;
            }
            var _g113 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g113);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g99 = form[0];
              var _g116 = form[1];
              var _g117 = form[2];
              var _g118 = sub(form, 3);
              add(environment, {_scope: true});
              var _g121 = _g117;
              var _g122 = 0;
              while (_g122 < length(_g121)) {
                var _g119 = _g121[_g122];
                setenv(_g119, {_stash: true, variable: true});
                _g122 = _g122 + 1;
              }
              var _g120 = join([x, _g116, _g117], macroexpand(_g118));
              drop(environment);
              return(_g120);
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
    var _g123 = form;
    var k = undefined;
    for (k in _g123) {
      if (isNaN(parseInt(k))) {
        var v = _g123[k];
        var _g149;
        if (quasisplice63(v, depth)) {
          _g149 = quasiexpand(v[1]);
        } else {
          _g149 = quasiexpand(v, depth);
        }
        var _g124 = _g149;
        last(xs)[k] = _g124;
      }
    }
    var _g125 = form;
    var _g126 = 0;
    while (_g126 < length(_g125)) {
      var x = _g125[_g126];
      if (quasisplice63(x, depth)) {
        var _g127 = quasiexpand(x[1]);
        add(xs, _g127);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g126 = _g126 + 1;
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
      var _g150;
      if (c === "-") {
        _g150 = "_";
      } else {
        var _g151;
        if (valid_code63(n)) {
          _g151 = c;
        } else {
          var _g152;
          if (i === 0) {
            _g152 = "_" + n;
          } else {
            _g152 = n;
          }
          _g151 = _g152;
        }
        _g150 = _g151;
      }
      var c1 = _g150;
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
    var _g132 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g133 = _g132.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g134 = module(spec).export;
      var n = undefined;
      for (n in _g134) {
        if (isNaN(parseInt(n))) {
          var b = _g134[n];
          if (b.variable && (_g133 || b.export)) {
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
    var _g135 = sub(xs, 0);
    return(join(t, _g135));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g136 = sub(keys, 0);
    var t1 = [];
    var _g137 = t;
    var _g138 = 0;
    while (_g138 < length(_g137)) {
      var x = _g137[_g138];
      add(t1, x);
      _g138 = _g138 + 1;
    }
    var _g139 = t;
    var k = undefined;
    for (k in _g139) {
      if (isNaN(parseInt(k))) {
        var v = _g139[k];
        if (!_g136[k]) {
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
    var _g140 = t;
    var k = undefined;
    for (k in _g140) {
      if (isNaN(parseInt(k))) {
        var v = _g140[k];
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
    var _g141 = ["table"];
    _g141.import = quoted(m.import);
    _g141.alias = quoted(m.alias);
    _g141.export = quote_frame(m.export);
    return(_g141);
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
  var _g153 = nexus["lumen/runtime"];
  var nil63 = _g153["nil?"];
  var is63 = _g153["is?"];
  var length = _g153.length;
  var none63 = _g153["none?"];
  var some63 = _g153["some?"];
  var one63 = _g153["one?"];
  var hd = _g153.hd;
  var string63 = _g153["string?"];
  var number63 = _g153["number?"];
  var boolean63 = _g153["boolean?"];
  var function63 = _g153["function?"];
  var composite63 = _g153["composite?"];
  var atom63 = _g153["atom?"];
  var table63 = _g153["table?"];
  var list63 = _g153["list?"];
  var substring = _g153.substring;
  var sub = _g153.sub;
  var inner = _g153.inner;
  var tl = _g153.tl;
  var char = _g153.char;
  var code = _g153.code;
  var string_literal63 = _g153["string-literal?"];
  var id_literal63 = _g153["id-literal?"];
  var add = _g153.add;
  var drop = _g153.drop;
  var last = _g153.last;
  var reverse = _g153.reverse;
  var join = _g153.join;
  var reduce = _g153.reduce;
  var keep = _g153.keep;
  var in63 = _g153["in?"];
  var find = _g153.find;
  var pair = _g153.pair;
  var sort = _g153.sort;
  var iterate = _g153.iterate;
  var replicate = _g153.replicate;
  var series = _g153.series;
  var map = _g153.map;
  var keys63 = _g153["keys?"];
  var empty63 = _g153["empty?"];
  var stash = _g153.stash;
  var unstash = _g153.unstash;
  var search = _g153.search;
  var split = _g153.split;
  var cat = _g153.cat;
  var _43 = _g153["+"];
  var _ = _g153["-"];
  var _42 = _g153["*"];
  var _47 = _g153["/"];
  var _37 = _g153["%"];
  var _62 = _g153[">"];
  var _60 = _g153["<"];
  var _61 = _g153["="];
  var _6261 = _g153[">="];
  var _6061 = _g153["<="];
  var read_file = _g153["read-file"];
  var write_file = _g153["write-file"];
  var write = _g153.write;
  var exit = _g153.exit;
  var today = _g153.today;
  var now = _g153.now;
  var number = _g153.number;
  var string = _g153.string;
  var space = _g153.space;
  var apply = _g153.apply;
  var make_id = _g153["make-id"];
  var _37message_handler = _g153["%message-handler"];
  var toplevel63 = _g153["toplevel?"];
  var module_key = _g153["module-key"];
  var module = _g153.module;
  var setenv = _g153.setenv;
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
  var _g164 = nexus["lumen/runtime"];
  var nil63 = _g164["nil?"];
  var is63 = _g164["is?"];
  var length = _g164.length;
  var none63 = _g164["none?"];
  var some63 = _g164["some?"];
  var one63 = _g164["one?"];
  var hd = _g164.hd;
  var string63 = _g164["string?"];
  var number63 = _g164["number?"];
  var boolean63 = _g164["boolean?"];
  var function63 = _g164["function?"];
  var composite63 = _g164["composite?"];
  var atom63 = _g164["atom?"];
  var table63 = _g164["table?"];
  var list63 = _g164["list?"];
  var substring = _g164.substring;
  var sub = _g164.sub;
  var inner = _g164.inner;
  var tl = _g164.tl;
  var char = _g164.char;
  var code = _g164.code;
  var string_literal63 = _g164["string-literal?"];
  var id_literal63 = _g164["id-literal?"];
  var add = _g164.add;
  var drop = _g164.drop;
  var last = _g164.last;
  var reverse = _g164.reverse;
  var join = _g164.join;
  var reduce = _g164.reduce;
  var keep = _g164.keep;
  var in63 = _g164["in?"];
  var find = _g164.find;
  var pair = _g164.pair;
  var sort = _g164.sort;
  var iterate = _g164.iterate;
  var replicate = _g164.replicate;
  var series = _g164.series;
  var map = _g164.map;
  var keys63 = _g164["keys?"];
  var empty63 = _g164["empty?"];
  var stash = _g164.stash;
  var unstash = _g164.unstash;
  var search = _g164.search;
  var split = _g164.split;
  var cat = _g164.cat;
  var _43 = _g164["+"];
  var _ = _g164["-"];
  var _42 = _g164["*"];
  var _47 = _g164["/"];
  var _37 = _g164["%"];
  var _62 = _g164[">"];
  var _60 = _g164["<"];
  var _61 = _g164["="];
  var _6261 = _g164[">="];
  var _6061 = _g164["<="];
  var read_file = _g164["read-file"];
  var write_file = _g164["write-file"];
  var write = _g164.write;
  var exit = _g164.exit;
  var today = _g164.today;
  var now = _g164.now;
  var number = _g164.number;
  var string = _g164.string;
  var space = _g164.space;
  var apply = _g164.apply;
  var make_id = _g164["make-id"];
  var _37message_handler = _g164["%message-handler"];
  var toplevel63 = _g164["toplevel?"];
  var module_key = _g164["module-key"];
  var module = _g164.module;
  var setenv = _g164.setenv;
  var _g167 = nexus["lumen/lib"];
  var getenv = _g167.getenv;
  var macro_function = _g167["macro-function"];
  var macro63 = _g167["macro?"];
  var special63 = _g167["special?"];
  var special_form63 = _g167["special-form?"];
  var statement63 = _g167["statement?"];
  var symbol_expansion = _g167["symbol-expansion"];
  var symbol63 = _g167["symbol?"];
  var variable63 = _g167["variable?"];
  var bound63 = _g167["bound?"];
  var quoted = _g167.quoted;
  var stash42 = _g167["stash*"];
  var bind = _g167.bind;
  var bind42 = _g167["bind*"];
  var quasiexpand = _g167.quasiexpand;
  var macroexpand = _g167.macroexpand;
  var indentation = _g167.indentation;
  var reserved63 = _g167["reserved?"];
  var valid_id63 = _g167["valid-id?"];
  var id = _g167.id;
  var key = _g167.key;
  var imported = _g167.imported;
  var link = _g167.link;
  var mapo = _g167.mapo;
  var quote_environment = _g167["quote-environment"];
  var quote_modules = _g167["quote-modules"];
  var initial_environment = _g167["initial-environment"];
  var _g168 = nexus["lumen/reader"];
  var make_stream = _g168["make-stream"];
  var read_table = _g168["read-table"];
  var read = _g168.read;
  var read_all = _g168["read-all"];
  var read_from_string = _g168["read-from-string"];
  var _g172 = [];
  _g172.js = "!";
  _g172.lua = "not ";
  var _g170 = [];
  var _g173 = [];
  _g173.js = "!";
  _g173.lua = "not ";
  _g170["not"] = _g173;
  var _g175 = [];
  _g175["*"] = true;
  _g175["/"] = true;
  _g175["%"] = true;
  var _g177 = [];
  _g177["+"] = true;
  _g177["-"] = true;
  var _g181 = [];
  _g181.js = "+";
  _g181.lua = "..";
  var _g179 = [];
  var _g182 = [];
  _g182.js = "+";
  _g182.lua = "..";
  _g179.cat = _g182;
  var _g184 = [];
  _g184["<"] = true;
  _g184[">"] = true;
  _g184["<="] = true;
  _g184[">="] = true;
  var _g188 = [];
  _g188.js = "===";
  _g188.lua = "==";
  var _g190 = [];
  _g190.js = "!=";
  _g190.lua = "~=";
  var _g186 = [];
  var _g191 = [];
  _g191.js = "===";
  _g191.lua = "==";
  _g186["="] = _g191;
  var _g192 = [];
  _g192.js = "!=";
  _g192.lua = "~=";
  _g186["~="] = _g192;
  var _g196 = [];
  _g196.js = "&&";
  _g196.lua = "and";
  var _g194 = [];
  var _g197 = [];
  _g197.js = "&&";
  _g197.lua = "and";
  _g194["and"] = _g197;
  var _g201 = [];
  _g201.js = "||";
  _g201.lua = "or";
  var _g199 = [];
  var _g202 = [];
  _g202.js = "||";
  _g202.lua = "or";
  _g199["or"] = _g202;
  var infix = [_g170, _g175, _g177, _g179, _g184, _g186, _g194, _g199];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g203 = infix;
      var i = 0;
      while (i < length(_g203)) {
        var level = _g203[i];
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
    var _g204 = args;
    var i = 0;
    while (i < length(_g204)) {
      var arg = _g204[i];
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
    var _g205 = getenv(x);
    var special = _g205.special;
    var stmt = _g205.stmt;
    var self_tr63 = _g205.tr;
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
    var _g206 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g206.right;
    var _g235;
    if (right) {
      _g235 = _6261;
    } else {
      _g235 = _62;
    }
    if (_g235(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g207 = sub(form, 1);
    var a = _g207[0];
    var b = _g207[1];
    var _g208 = op_delims(form, a);
    var ao = _g208[0];
    var ac = _g208[1];
    var _g209 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g209[0];
    var bc = _g209[1];
    var _g210 = compile(a);
    var _g211 = compile(b);
    var _g212 = getop(op);
    if (unary63(form)) {
      return(_g212 + ao + _g210 + ac);
    } else {
      return(ao + _g210 + ac + " " + _g212 + " " + bo + _g211 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g213 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g213.name;
    var prefix = _g213.prefix;
    var _g236;
    if (name) {
      _g236 = compile(name);
    } else {
      _g236 = "";
    }
    var id = _g236;
    var _g214 = prefix || "";
    var _g215 = compile_args(args);
    indent_level = indent_level + 1;
    var _g217 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g216 = _g217;
    var ind = indentation();
    var _g237;
    if (target === "js") {
      _g237 = "";
    } else {
      _g237 = "end";
    }
    var tr = _g237;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g215 + " {\n" + _g216 + ind + "}" + tr);
    } else {
      return(_g214 + "function " + id + _g215 + "\n" + _g216 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g218 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g218.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g238;
        if (stmt) {
          _g238 = indentation();
        } else {
          _g238 = "";
        }
        var ind = _g238;
        var _g239;
        if (atom63(form)) {
          _g239 = compile_atom(form);
        } else {
          var _g240;
          if (infix63(hd(form))) {
            _g240 = compile_infix(form);
          } else {
            _g240 = compile_call(form);
          }
          _g239 = _g240;
        }
        var _g219 = _g239;
        return(ind + _g219 + tr);
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
    var _g220 = sub(args, 0, length(args) - 1);
    var _g221 = 0;
    while (_g221 < length(_g220)) {
      var x = _g220[_g221];
      add(hoist, lower(x, hoist, stmt63));
      _g221 = _g221 + 1;
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
    var _g222 = args[1];
    var _g223 = args[2];
    if (stmt63 || tail63) {
      var _g242;
      if (_g223) {
        _g242 = [lower_body([_g223], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g222], tail63)], _g242)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g241;
      if (_g223) {
        _g241 = [lower(["set", e, _g223])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g222])], _g241));
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
      var _g243;
      if (x === "and") {
        _g243 = ["%if", id, b, id];
      } else {
        _g243 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g243], hoist));
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
    var _g224 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g224, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g225 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g225)) {
      return(_g225);
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
    var _g226 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g227 = _g226.all;
    var m = module(spec);
    var frame = last(environment);
    var _g228 = m.export;
    var k = undefined;
    for (k in _g228) {
      if (isNaN(parseInt(k))) {
        var v = _g228[k];
        if (v.export || _g227) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g229 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g230 = _g229.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g230}));
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
    var _g231 = specs || [];
    var _g232 = 0;
    while (_g232 < length(_g231)) {
      var spec = _g231[_g232];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g233 = import_modules(m.alias);
        var aliased = _g233[0];
        var bs = _g233[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g234 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g234);
      }
      _g232 = _g232 + 1;
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
  var _g244 = nexus["lumen/runtime"];
  var nil63 = _g244["nil?"];
  var is63 = _g244["is?"];
  var length = _g244.length;
  var none63 = _g244["none?"];
  var some63 = _g244["some?"];
  var one63 = _g244["one?"];
  var hd = _g244.hd;
  var string63 = _g244["string?"];
  var number63 = _g244["number?"];
  var boolean63 = _g244["boolean?"];
  var function63 = _g244["function?"];
  var composite63 = _g244["composite?"];
  var atom63 = _g244["atom?"];
  var table63 = _g244["table?"];
  var list63 = _g244["list?"];
  var substring = _g244.substring;
  var sub = _g244.sub;
  var inner = _g244.inner;
  var tl = _g244.tl;
  var char = _g244.char;
  var code = _g244.code;
  var string_literal63 = _g244["string-literal?"];
  var id_literal63 = _g244["id-literal?"];
  var add = _g244.add;
  var drop = _g244.drop;
  var last = _g244.last;
  var reverse = _g244.reverse;
  var join = _g244.join;
  var reduce = _g244.reduce;
  var keep = _g244.keep;
  var in63 = _g244["in?"];
  var find = _g244.find;
  var pair = _g244.pair;
  var sort = _g244.sort;
  var iterate = _g244.iterate;
  var replicate = _g244.replicate;
  var series = _g244.series;
  var map = _g244.map;
  var keys63 = _g244["keys?"];
  var empty63 = _g244["empty?"];
  var stash = _g244.stash;
  var unstash = _g244.unstash;
  var search = _g244.search;
  var split = _g244.split;
  var cat = _g244.cat;
  var _43 = _g244["+"];
  var _ = _g244["-"];
  var _42 = _g244["*"];
  var _47 = _g244["/"];
  var _37 = _g244["%"];
  var _62 = _g244[">"];
  var _60 = _g244["<"];
  var _61 = _g244["="];
  var _6261 = _g244[">="];
  var _6061 = _g244["<="];
  var read_file = _g244["read-file"];
  var write_file = _g244["write-file"];
  var write = _g244.write;
  var exit = _g244.exit;
  var today = _g244.today;
  var now = _g244.now;
  var number = _g244.number;
  var string = _g244.string;
  var space = _g244.space;
  var apply = _g244.apply;
  var make_id = _g244["make-id"];
  var _37message_handler = _g244["%message-handler"];
  var toplevel63 = _g244["toplevel?"];
  var module_key = _g244["module-key"];
  var module = _g244.module;
  var setenv = _g244.setenv;
  var _g247 = nexus["lumen/lib"];
  var getenv = _g247.getenv;
  var macro_function = _g247["macro-function"];
  var macro63 = _g247["macro?"];
  var special63 = _g247["special?"];
  var special_form63 = _g247["special-form?"];
  var statement63 = _g247["statement?"];
  var symbol_expansion = _g247["symbol-expansion"];
  var symbol63 = _g247["symbol?"];
  var variable63 = _g247["variable?"];
  var bound63 = _g247["bound?"];
  var quoted = _g247.quoted;
  var stash42 = _g247["stash*"];
  var bind = _g247.bind;
  var bind42 = _g247["bind*"];
  var quasiexpand = _g247.quasiexpand;
  var macroexpand = _g247.macroexpand;
  var indentation = _g247.indentation;
  var reserved63 = _g247["reserved?"];
  var valid_id63 = _g247["valid-id?"];
  var id = _g247.id;
  var key = _g247.key;
  var imported = _g247.imported;
  var link = _g247.link;
  var mapo = _g247.mapo;
  var quote_environment = _g247["quote-environment"];
  var quote_modules = _g247["quote-modules"];
  var initial_environment = _g247["initial-environment"];
  var _g248 = nexus["lumen/compiler"];
  var compile_function = _g248["compile-function"];
  var compile = _g248.compile;
  var open_module = _g248["open-module"];
  var load_module = _g248["load-module"];
  var in_module = _g248["in-module"];
  var import_modules = _g248["import-modules"];
  var compile_module = _g248["compile-module"];
  var declare = _g248.declare;
  var eval = _g248.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g422 = nexus["lumen/runtime"];
  var nil63 = _g422["nil?"];
  var is63 = _g422["is?"];
  var length = _g422.length;
  var none63 = _g422["none?"];
  var some63 = _g422["some?"];
  var one63 = _g422["one?"];
  var hd = _g422.hd;
  var string63 = _g422["string?"];
  var number63 = _g422["number?"];
  var boolean63 = _g422["boolean?"];
  var function63 = _g422["function?"];
  var composite63 = _g422["composite?"];
  var atom63 = _g422["atom?"];
  var table63 = _g422["table?"];
  var list63 = _g422["list?"];
  var substring = _g422.substring;
  var sub = _g422.sub;
  var inner = _g422.inner;
  var tl = _g422.tl;
  var char = _g422.char;
  var code = _g422.code;
  var string_literal63 = _g422["string-literal?"];
  var id_literal63 = _g422["id-literal?"];
  var add = _g422.add;
  var drop = _g422.drop;
  var last = _g422.last;
  var reverse = _g422.reverse;
  var join = _g422.join;
  var reduce = _g422.reduce;
  var keep = _g422.keep;
  var in63 = _g422["in?"];
  var find = _g422.find;
  var pair = _g422.pair;
  var sort = _g422.sort;
  var iterate = _g422.iterate;
  var replicate = _g422.replicate;
  var series = _g422.series;
  var map = _g422.map;
  var keys63 = _g422["keys?"];
  var empty63 = _g422["empty?"];
  var stash = _g422.stash;
  var unstash = _g422.unstash;
  var search = _g422.search;
  var split = _g422.split;
  var cat = _g422.cat;
  var _43 = _g422["+"];
  var _ = _g422["-"];
  var _42 = _g422["*"];
  var _47 = _g422["/"];
  var _37 = _g422["%"];
  var _62 = _g422[">"];
  var _60 = _g422["<"];
  var _61 = _g422["="];
  var _6261 = _g422[">="];
  var _6061 = _g422["<="];
  var read_file = _g422["read-file"];
  var write_file = _g422["write-file"];
  var write = _g422.write;
  var exit = _g422.exit;
  var today = _g422.today;
  var now = _g422.now;
  var number = _g422.number;
  var string = _g422.string;
  var space = _g422.space;
  var apply = _g422.apply;
  var make_id = _g422["make-id"];
  var _37message_handler = _g422["%message-handler"];
  var toplevel63 = _g422["toplevel?"];
  var module_key = _g422["module-key"];
  var module = _g422.module;
  var setenv = _g422.setenv;
  var _g425 = nexus["lumen/lib"];
  var getenv = _g425.getenv;
  var macro_function = _g425["macro-function"];
  var macro63 = _g425["macro?"];
  var special63 = _g425["special?"];
  var special_form63 = _g425["special-form?"];
  var statement63 = _g425["statement?"];
  var symbol_expansion = _g425["symbol-expansion"];
  var symbol63 = _g425["symbol?"];
  var variable63 = _g425["variable?"];
  var bound63 = _g425["bound?"];
  var quoted = _g425.quoted;
  var stash42 = _g425["stash*"];
  var bind = _g425.bind;
  var bind42 = _g425["bind*"];
  var quasiexpand = _g425.quasiexpand;
  var macroexpand = _g425.macroexpand;
  var indentation = _g425.indentation;
  var reserved63 = _g425["reserved?"];
  var valid_id63 = _g425["valid-id?"];
  var id = _g425.id;
  var key = _g425.key;
  var imported = _g425.imported;
  var link = _g425.link;
  var mapo = _g425.mapo;
  var quote_environment = _g425["quote-environment"];
  var quote_modules = _g425["quote-modules"];
  var initial_environment = _g425["initial-environment"];
  var _g426 = nexus["lumen/compiler"];
  var compile_function = _g426["compile-function"];
  var compile = _g426.compile;
  var open_module = _g426["open-module"];
  var load_module = _g426["load-module"];
  var in_module = _g426["in-module"];
  var import_modules = _g426["import-modules"];
  var compile_module = _g426["compile-module"];
  var declare = _g426.declare;
  var eval = _g426.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g735 = nexus["lumen/runtime"];
  var nil63 = _g735["nil?"];
  var is63 = _g735["is?"];
  var length = _g735.length;
  var none63 = _g735["none?"];
  var some63 = _g735["some?"];
  var one63 = _g735["one?"];
  var hd = _g735.hd;
  var string63 = _g735["string?"];
  var number63 = _g735["number?"];
  var boolean63 = _g735["boolean?"];
  var function63 = _g735["function?"];
  var composite63 = _g735["composite?"];
  var atom63 = _g735["atom?"];
  var table63 = _g735["table?"];
  var list63 = _g735["list?"];
  var substring = _g735.substring;
  var sub = _g735.sub;
  var inner = _g735.inner;
  var tl = _g735.tl;
  var char = _g735.char;
  var code = _g735.code;
  var string_literal63 = _g735["string-literal?"];
  var id_literal63 = _g735["id-literal?"];
  var add = _g735.add;
  var drop = _g735.drop;
  var last = _g735.last;
  var reverse = _g735.reverse;
  var join = _g735.join;
  var reduce = _g735.reduce;
  var keep = _g735.keep;
  var in63 = _g735["in?"];
  var find = _g735.find;
  var pair = _g735.pair;
  var sort = _g735.sort;
  var iterate = _g735.iterate;
  var replicate = _g735.replicate;
  var series = _g735.series;
  var map = _g735.map;
  var keys63 = _g735["keys?"];
  var empty63 = _g735["empty?"];
  var stash = _g735.stash;
  var unstash = _g735.unstash;
  var search = _g735.search;
  var split = _g735.split;
  var cat = _g735.cat;
  var _43 = _g735["+"];
  var _ = _g735["-"];
  var _42 = _g735["*"];
  var _47 = _g735["/"];
  var _37 = _g735["%"];
  var _62 = _g735[">"];
  var _60 = _g735["<"];
  var _61 = _g735["="];
  var _6261 = _g735[">="];
  var _6061 = _g735["<="];
  var read_file = _g735["read-file"];
  var write_file = _g735["write-file"];
  var write = _g735.write;
  var exit = _g735.exit;
  var today = _g735.today;
  var now = _g735.now;
  var number = _g735.number;
  var string = _g735.string;
  var space = _g735.space;
  var apply = _g735.apply;
  var make_id = _g735["make-id"];
  var _37message_handler = _g735["%message-handler"];
  var toplevel63 = _g735["toplevel?"];
  var module_key = _g735["module-key"];
  var module = _g735.module;
  var setenv = _g735.setenv;
  var _g738 = nexus["lumen/lib"];
  var getenv = _g738.getenv;
  var macro_function = _g738["macro-function"];
  var macro63 = _g738["macro?"];
  var special63 = _g738["special?"];
  var special_form63 = _g738["special-form?"];
  var statement63 = _g738["statement?"];
  var symbol_expansion = _g738["symbol-expansion"];
  var symbol63 = _g738["symbol?"];
  var variable63 = _g738["variable?"];
  var bound63 = _g738["bound?"];
  var quoted = _g738.quoted;
  var stash42 = _g738["stash*"];
  var bind = _g738.bind;
  var bind42 = _g738["bind*"];
  var quasiexpand = _g738.quasiexpand;
  var macroexpand = _g738.macroexpand;
  var indentation = _g738.indentation;
  var reserved63 = _g738["reserved?"];
  var valid_id63 = _g738["valid-id?"];
  var id = _g738.id;
  var key = _g738.key;
  var imported = _g738.imported;
  var link = _g738.link;
  var mapo = _g738.mapo;
  var quote_environment = _g738["quote-environment"];
  var quote_modules = _g738["quote-modules"];
  var initial_environment = _g738["initial-environment"];
  var _g739 = nexus["lumen/compiler"];
  var compile_function = _g739["compile-function"];
  var compile = _g739.compile;
  var open_module = _g739["open-module"];
  var load_module = _g739["load-module"];
  var in_module = _g739["in-module"];
  var import_modules = _g739["import-modules"];
  var compile_module = _g739["compile-module"];
  var declare = _g739.declare;
  var eval = _g739.eval;
  global.modules = {lumen: {export: {}, import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"do": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g752 = forms;
    var _g753 = 0;
    while (_g753 < length(_g752)) {
      var x = _g752[_g753];
      str = str + compile(x, {_stash: true, stmt: true});
      _g753 = _g753 + 1;
    }
    return(str);
  }, foo: true, tr: true, stmt: true}, "%if": {export: true, special: function (cond, cons, alt) {
    var _g754 = compile(cond);
    indent_level = indent_level + 1;
    var _g756 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g755 = _g756;
    var _g823;
    if (alt) {
      indent_level = indent_level + 1;
      var _g758 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g823 = _g758;
    }
    var _g757 = _g823;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g754 + ") {\n" + _g755 + ind + "}";
    } else {
      str = str + ind + "if " + _g754 + " then\n" + _g755;
    }
    if (_g757 && target === "js") {
      str = str + " else {\n" + _g757 + ind + "}";
    } else {
      if (_g757) {
        str = str + ind + "else\n" + _g757;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true, tr: true, stmt: true}, "while": {export: true, special: function (cond, form) {
    var _g759 = compile(cond);
    indent_level = indent_level + 1;
    var _g760 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g760;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g759 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g759 + " do\n" + body + ind + "end\n");
    }
  }, foo: true, tr: true, stmt: true}, "%for": {export: true, special: function (t, k, form) {
    var _g761 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g762 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g762;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g761 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g761 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true, tr: true, stmt: true}, "%try": {export: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g763 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g763;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g764 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g764;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true, tr: true, stmt: true}, "break": {special: function () {
    return(indentation() + "break");
  }, foo: true, export: true, stmt: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true, export: true}, "%global-function": {export: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true, tr: true, stmt: true}, "%local-function": {export: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true, tr: true, stmt: true}, "return": {special: function (x) {
    var _g824;
    if (nil63(x)) {
      _g824 = "return";
    } else {
      _g824 = "return(" + compile(x) + ")";
    }
    var _g765 = _g824;
    return(indentation() + _g765);
  }, foo: true, export: true, stmt: true}, error: {special: function (x) {
    var _g825;
    if (target === "js") {
      _g825 = "throw new " + compile(["Error", x]);
    } else {
      _g825 = "error(" + compile(x) + ")";
    }
    var e = _g825;
    return(indentation() + e);
  }, foo: true, export: true, stmt: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g826;
    if (is63(value)) {
      _g826 = " = " + value1;
    } else {
      _g826 = "";
    }
    var rh = _g826;
    var _g827;
    if (target === "js") {
      _g827 = "var ";
    } else {
      _g827 = "local ";
    }
    var keyword = _g827;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, export: true, stmt: true}, set: {special: function (lh, rh) {
    var _g766 = compile(lh);
    var _g828;
    if (nil63(rh)) {
      _g828 = "nil";
    } else {
      _g828 = rh;
    }
    var _g767 = compile(_g828);
    return(indentation() + _g766 + " = " + _g767);
  }, foo: true, export: true, stmt: true}, get: {special: function (t, k) {
    var _g768 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g768, 0) === "{") {
      _g768 = "(" + _g768 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g768 + "." + inner(k));
    } else {
      return(_g768 + "[" + k1 + "]");
    }
  }, foo: true, export: true}, "not": {}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g829;
    if (target === "lua") {
      _g829 = "{";
    } else {
      _g829 = "[";
    }
    var open = _g829;
    var _g830;
    if (target === "lua") {
      _g830 = "}";
    } else {
      _g830 = "]";
    }
    var close = _g830;
    var str = "";
    var _g769 = forms;
    var i = 0;
    while (i < length(_g769)) {
      var x = _g769[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true, export: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g831;
    if (target === "lua") {
      _g831 = " = ";
    } else {
      _g831 = ": ";
    }
    var sep = _g831;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g770 = pairs;
    var i = 0;
    while (i < length(_g770)) {
      var _g771 = _g770[i];
      var k = _g771[0];
      var v = _g771[1];
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
  }, foo: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/lib": {export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {export: true, global: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/reader": {export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g772) {
    var char = _g772[0];
    var stream = _g772[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g773 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g773)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {export: true, global: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, "lumen/runtime": {export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {export: true, global: true}, fs: {variable: true}, print: {export: true, global: true}, "id-count": {variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/core": {export: {quote: {macro: function (form) {
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
      var _g774 = body;
      var k = undefined;
      for (k in _g774) {
        if (isNaN(parseInt(k))) {
          var v = _g774[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g775) {
      var a = _g775[0];
      var b = _g775[1];
      var c = sub(_g775, 2);
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
    var _g776 = sub(body, 0);
    return(["if", cond, join(["do"], _g776)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g777 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g777)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g778 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g778));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g779 = bind(lh, rh);
      var _g780 = 0;
      while (_g780 < length(_g779)) {
        var _g781 = _g779[_g780];
        var id = _g781[0];
        var val = _g781[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g780 = _g780 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g778)]])));
    }
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g782 = sub(body, 0);
    var imp = _g782.import;
    var exp = _g782.export;
    var alias = _g782.alias;
    var _g783 = import_modules(imp);
    var imports = _g783[0];
    var bindings = _g783[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g784 = exp || [];
    var _g785 = 0;
    while (_g785 < length(_g784)) {
      var x = _g784[_g785];
      setenv(x, {_stash: true, export: true});
      _g785 = _g785 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g786 = sub(body, 0);
    var form = join(["fn", args], _g786);
    var _g787 = ["setenv", ["quote", name]];
    _g787.macro = form;
    _g787.form = ["quote", form];
    eval(_g787);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g788 = sub(body, 0);
    var form = join(["fn", args], _g788);
    var keys = sub(_g788, length(_g788));
    var _g789 = ["setenv", ["quote", name]];
    _g789.special = form;
    _g789.form = ["quote", form];
    eval(join(_g789, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g790 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g790)) {
      var _g791 = bind42(x, _g790);
      var args = _g791[0];
      var _g792 = _g791[1];
      return(join(["%global-function", name, args], _g792));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g793 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g793) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g793)]));
    } else {
      if (some63(_g793)) {
        var _g794 = bind42(x, _g793);
        var args = _g794[0];
        var _g795 = _g794[1];
        return(link(name, join(["%local-function", name, args], _g795)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "with-bindings": {macro: function (_g796) {
    var names = _g796[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g797 = sub(body, 0);
    var x = make_id();
    var _g799 = ["setenv", x];
    _g799.variable = true;
    var _g798 = ["with-frame", ["each", [x], names, _g799]];
    _g798.scope = true;
    return(join(_g798, _g797));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g800 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g801 = join(["do"], macroexpand(_g800));
    drop(environment);
    return(_g801);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g802 = sub(body, 0);
    add(environment, {});
    map(function (_g804) {
      var name = _g804[0];
      var exp = _g804[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g803 = join(["do"], macroexpand(_g802));
    drop(environment);
    return(_g803);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g805 = sub(body, 0);
    var _g806 = bind42(args, _g805);
    var _g807 = _g806[0];
    var _g808 = _g806[1];
    return(join(["%function", _g807], _g808));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, all: {macro: function (_g809, t) {
    var k = _g809[0];
    var v = _g809[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g810 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g832;
    if (target === "lua") {
      _g832 = _g810;
    } else {
      _g832 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g810)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g832)]]);
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g811 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g833;
    if (nil63(v)) {
      var _g834;
      if (b.i) {
        _g834 = "i";
      } else {
        _g834 = make_id();
      }
      var i = _g834;
      _g833 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g811), ["inc", i]]];
    } else {
      var _g812 = ["target"];
      _g812.js = ["isNaN", ["parseInt", k]];
      _g812.lua = ["not", ["number?", k]];
      _g833 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g812, join(["let", [v, ["get", t1, k]]], _g811)]]];
    }
    return(["let", [t1, t], _g833]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g813 = xs;
    var _g814 = 0;
    while (_g814 < length(_g813)) {
      var x = _g813[_g814];
      l[x] = true;
      _g814 = _g814 + 1;
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
    var _g815 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g815)]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g816 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g816)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g817 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g818 = ["table"];
    _g818._scope = scope;
    return(["do", ["add", "environment", _g818], ["let", [x, join(["do"], _g817)], ["drop", "environment"], x]]);
  }, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g819 = sub(body, 0);
    var imp = _g819.import;
    var exp = _g819.export;
    var alias = _g819.alias;
    var _g820 = import_modules(imp);
    var imports = _g820[0];
    var bindings = _g820[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g821 = exp || [];
    var _g822 = 0;
    while (_g822 < length(_g821)) {
      var x = _g821[_g822];
      setenv(x, {_stash: true, export: true});
      _g822 = _g822 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g835 = nexus["lumen/runtime"];
  var nil63 = _g835["nil?"];
  var is63 = _g835["is?"];
  var length = _g835.length;
  var none63 = _g835["none?"];
  var some63 = _g835["some?"];
  var one63 = _g835["one?"];
  var hd = _g835.hd;
  var string63 = _g835["string?"];
  var number63 = _g835["number?"];
  var boolean63 = _g835["boolean?"];
  var function63 = _g835["function?"];
  var composite63 = _g835["composite?"];
  var atom63 = _g835["atom?"];
  var table63 = _g835["table?"];
  var list63 = _g835["list?"];
  var substring = _g835.substring;
  var sub = _g835.sub;
  var inner = _g835.inner;
  var tl = _g835.tl;
  var char = _g835.char;
  var code = _g835.code;
  var string_literal63 = _g835["string-literal?"];
  var id_literal63 = _g835["id-literal?"];
  var add = _g835.add;
  var drop = _g835.drop;
  var last = _g835.last;
  var reverse = _g835.reverse;
  var join = _g835.join;
  var reduce = _g835.reduce;
  var keep = _g835.keep;
  var in63 = _g835["in?"];
  var find = _g835.find;
  var pair = _g835.pair;
  var sort = _g835.sort;
  var iterate = _g835.iterate;
  var replicate = _g835.replicate;
  var series = _g835.series;
  var map = _g835.map;
  var keys63 = _g835["keys?"];
  var empty63 = _g835["empty?"];
  var stash = _g835.stash;
  var unstash = _g835.unstash;
  var search = _g835.search;
  var split = _g835.split;
  var cat = _g835.cat;
  var _43 = _g835["+"];
  var _ = _g835["-"];
  var _42 = _g835["*"];
  var _47 = _g835["/"];
  var _37 = _g835["%"];
  var _62 = _g835[">"];
  var _60 = _g835["<"];
  var _61 = _g835["="];
  var _6261 = _g835[">="];
  var _6061 = _g835["<="];
  var read_file = _g835["read-file"];
  var write_file = _g835["write-file"];
  var write = _g835.write;
  var exit = _g835.exit;
  var today = _g835.today;
  var now = _g835.now;
  var number = _g835.number;
  var string = _g835.string;
  var space = _g835.space;
  var apply = _g835.apply;
  var make_id = _g835["make-id"];
  var _37message_handler = _g835["%message-handler"];
  var toplevel63 = _g835["toplevel?"];
  var module_key = _g835["module-key"];
  var module = _g835.module;
  var setenv = _g835.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var series = _g2.series;
  var code = _g2.code;
  var split = _g2.split;
  var _37 = _g2["%"];
  var read_file = _g2["read-file"];
  var number63 = _g2["number?"];
  var nil63 = _g2["nil?"];
  var _42 = _g2["*"];
  var drop = _g2.drop;
  var _ = _g2["-"];
  var _47 = _g2["/"];
  var make_id = _g2["make-id"];
  var add = _g2.add;
  var cat = _g2.cat;
  var substring = _g2.substring;
  var map = _g2.map;
  var find = _g2.find;
  var today = _g2.today;
  var _37message_handler = _g2["%message-handler"];
  var number = _g2.number;
  var empty63 = _g2["empty?"];
  var some63 = _g2["some?"];
  var none63 = _g2["none?"];
  var write_file = _g2["write-file"];
  var atom63 = _g2["atom?"];
  var _6261 = _g2[">="];
  var string = _g2.string;
  var string_literal63 = _g2["string-literal?"];
  var pair = _g2.pair;
  var composite63 = _g2["composite?"];
  var tl = _g2.tl;
  var _6061 = _g2["<="];
  var string63 = _g2["string?"];
  var is63 = _g2["is?"];
  var space = _g2.space;
  var exit = _g2.exit;
  var toplevel63 = _g2["toplevel?"];
  var search = _g2.search;
  var hd = _g2.hd;
  var replicate = _g2.replicate;
  var reverse = _g2.reverse;
  var reduce = _g2.reduce;
  var sort = _g2.sort;
  var iterate = _g2.iterate;
  var id_literal63 = _g2["id-literal?"];
  var keys63 = _g2["keys?"];
  var apply = _g2.apply;
  var last = _g2.last;
  var length = _g2.length;
  var sub = _g2.sub;
  var join = _g2.join;
  var write = _g2.write;
  var inner = _g2.inner;
  var setenv = _g2.setenv;
  var module_key = _g2["module-key"];
  var in63 = _g2["in?"];
  var module = _g2.module;
  var boolean63 = _g2["boolean?"];
  var now = _g2.now;
  var one63 = _g2["one?"];
  var stash = _g2.stash;
  var function63 = _g2["function?"];
  var table63 = _g2["table?"];
  var keep = _g2.keep;
  var char = _g2.char;
  var list63 = _g2["list?"];
  var _43 = _g2["+"];
  var unstash = _g2.unstash;
  var _g5 = nexus["lumen/reader"];
  var read_from_string = _g5["read-from-string"];
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var _g6 = nexus["lumen/compiler"];
  var import_modules = _g6["import-modules"];
  var compile_function = _g6["compile-function"];
  var load_module = _g6["load-module"];
  var declare = _g6.declare;
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var rep = function (str) {
    var _g838 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g840) {
        return([false, _g840.message]);
      }
    })();
    var _g1 = _g838[0];
    var x = _g838[1];
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
    var _g839 = args;
    var i = 0;
    while (i < length(_g839)) {
      var arg = _g839[i];
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
