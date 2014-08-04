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
      var _g161;
      if (nil63(from) || from < 0) {
        _g161 = 0;
      } else {
        _g161 = from;
      }
      var i = _g161;
      var n = length(x);
      var _g162;
      if (nil63(upto) || upto > n) {
        _g162 = n;
      } else {
        _g162 = upto;
      }
      var _g47 = _g162;
      while (i < _g47) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g48 = x;
      var k = undefined;
      for (k in _g48) {
        var v = _g48[k];
        var _g49 = parseInt(k);
        var _g163;
        if (isNaN(_g49)) {
          _g163 = k;
        } else {
          _g163 = _g49;
        }
        var _g50 = _g163;
        if (!number63(_g50)) {
          l[_g50] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
  var keys = function (x) {
    var t = [];
    var _g52 = x;
    var k = undefined;
    for (k in _g52) {
      var v = _g52[k];
      var _g53 = parseInt(k);
      var _g164;
      if (isNaN(_g53)) {
        _g164 = k;
      } else {
        _g164 = _g53;
      }
      var _g54 = _g164;
      if (!number63(_g54)) {
        t[_g54] = v;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keys = keys;
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
      var _g66 = a;
      var k = undefined;
      for (k in _g66) {
        var v = _g66[k];
        var _g67 = parseInt(k);
        var _g165;
        if (isNaN(_g67)) {
          _g165 = k;
        } else {
          _g165 = _g67;
        }
        var _g68 = _g165;
        c[_g68] = v;
      }
      var _g69 = b;
      var k = undefined;
      for (k in _g69) {
        var v = _g69[k];
        var _g70 = parseInt(k);
        var _g166;
        if (isNaN(_g70)) {
          _g166 = k;
        } else {
          _g166 = _g70;
        }
        var _g71 = _g166;
        if (number63(_g71)) {
          _g71 = _g71 + o;
        }
        c[_g71] = v;
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
    var _g75 = x;
    var k = undefined;
    for (k in _g75) {
      var v = _g75[k];
      var _g76 = parseInt(k);
      var _g167;
      if (isNaN(_g76)) {
        _g167 = k;
      } else {
        _g167 = _g76;
      }
      var _g77 = _g167;
      if (f(v)) {
        t[shift(_g77, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g79 = t;
    var _g21 = undefined;
    for (_g21 in _g79) {
      var y = _g79[_g21];
      var _g80 = parseInt(_g21);
      var _g168;
      if (isNaN(_g80)) {
        _g168 = _g21;
      } else {
        _g168 = _g80;
      }
      var _g81 = _g168;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g83 = t;
    var _g22 = undefined;
    for (_g22 in _g83) {
      var x = _g83[_g22];
      var _g84 = parseInt(_g22);
      var _g169;
      if (isNaN(_g84)) {
        _g169 = _g22;
      } else {
        _g169 = _g84;
      }
      var _g85 = _g169;
      var _g86 = f(x);
      if (_g86) {
        return(_g86);
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
    var _g170;
    if (f) {
      _g170 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g170));
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
    var _g96 = x;
    var k = undefined;
    for (k in _g96) {
      var v = _g96[k];
      var _g97 = parseInt(k);
      var _g171;
      if (isNaN(_g97)) {
        _g171 = k;
      } else {
        _g171 = _g97;
      }
      var _g98 = _g171;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g98, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _g100 = t;
    var k = undefined;
    for (k in _g100) {
      var _g23 = _g100[k];
      var _g101 = parseInt(k);
      var _g172;
      if (isNaN(_g101)) {
        _g172 = k;
      } else {
        _g172 = _g101;
      }
      var _g102 = _g172;
      if (!number63(_g102)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _g104 = t;
    var _g24 = undefined;
    for (_g24 in _g104) {
      var _g25 = _g104[_g24];
      var _g105 = parseInt(_g24);
      var _g173;
      if (isNaN(_g105)) {
        _g173 = _g24;
      } else {
        _g173 = _g105;
      }
      var _g106 = _g173;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _g108 = args;
      var k = undefined;
      for (k in _g108) {
        var v = _g108[k];
        var _g109 = parseInt(k);
        var _g174;
        if (isNaN(_g109)) {
          _g174 = k;
        } else {
          _g174 = _g109;
        }
        var _g110 = _g174;
        if (!number63(_g110)) {
          p[_g110] = v;
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
        var _g112 = l;
        var k = undefined;
        for (k in _g112) {
          var v = _g112[k];
          var _g113 = parseInt(k);
          var _g175;
          if (isNaN(_g113)) {
            _g175 = k;
          } else {
            _g175 = _g113;
          }
          var _g114 = _g175;
          if (!(_g114 === "_stash")) {
            args1[_g114] = v;
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
    if (none63(xs)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, xs));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(a + b);
    }, xs));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(xs)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(a * b);
    }, xs));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(xs)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(xs)));
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
            var _g139 = x;
            var k = undefined;
            for (k in _g139) {
              var v = _g139[k];
              var _g140 = parseInt(k);
              var _g176;
              if (isNaN(_g140)) {
                _g176 = k;
              } else {
                _g176 = _g140;
              }
              var _g141 = _g176;
              if (number63(_g141)) {
                xs[_g141] = string(v);
              } else {
                add(ks, _g141 + ":");
                add(ks, string(v));
              }
            }
            var _g142 = join(xs, ks);
            var _g26 = undefined;
            for (_g26 in _g142) {
              var v = _g142[_g26];
              var _g143 = parseInt(_g26);
              var _g177;
              if (isNaN(_g143)) {
                _g177 = _g26;
              } else {
                _g177 = _g143;
              }
              var _g144 = _g177;
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
    var _g149 = stash(args);
    return(f.apply(f, _g149));
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
    var _g156 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g156, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g157 = keys;
      var _g159 = undefined;
      for (_g159 in _g157) {
        var v = _g157[_g159];
        var _g158 = parseInt(_g159);
        var _g178;
        if (isNaN(_g158)) {
          _g178 = _g159;
        } else {
          _g178 = _g158;
        }
        var _g160 = _g178;
        x[_g160] = v;
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
  var _g182 = nexus["lumen/runtime"];
  var code = _g182.code;
  var boolean63 = _g182["boolean?"];
  var composite63 = _g182["composite?"];
  var keys = _g182.keys;
  var string = _g182.string;
  var substring = _g182.substring;
  var list63 = _g182["list?"];
  var add = _g182.add;
  var stash = _g182.stash;
  var module = _g182.module;
  var string63 = _g182["string?"];
  var in63 = _g182["in?"];
  var some63 = _g182["some?"];
  var atom63 = _g182["atom?"];
  var map = _g182.map;
  var drop = _g182.drop;
  var find = _g182.find;
  var join = _g182.join;
  var number63 = _g182["number?"];
  var inner = _g182.inner;
  var cat = _g182.cat;
  var length = _g182.length;
  var replicate = _g182.replicate;
  var number = _g182.number;
  var write = _g182.write;
  var write_file = _g182["write-file"];
  var sub = _g182.sub;
  var _47 = _g182["/"];
  var _ = _g182["-"];
  var _43 = _g182["+"];
  var _42 = _g182["*"];
  var _37message_handler = _g182["%message-handler"];
  var read_file = _g182["read-file"];
  var _37 = _g182["%"];
  var search = _g182.search;
  var apply = _g182.apply;
  var empty63 = _g182["empty?"];
  var keys63 = _g182["keys?"];
  var _61 = _g182["="];
  var _60 = _g182["<"];
  var now = _g182.now;
  var hd = _g182.hd;
  var exit = _g182.exit;
  var split = _g182.split;
  var space = _g182.space;
  var today = _g182.today;
  var tl = _g182.tl;
  var module_key = _g182["module-key"];
  var one63 = _g182["one?"];
  var setenv = _g182.setenv;
  var toplevel63 = _g182["toplevel?"];
  var make_id = _g182["make-id"];
  var reverse = _g182.reverse;
  var char = _g182.char;
  var unstash = _g182.unstash;
  var nil63 = _g182["nil?"];
  var _62 = _g182[">"];
  var id_literal63 = _g182["id-literal?"];
  var iterate = _g182.iterate;
  var is63 = _g182["is?"];
  var _6061 = _g182["<="];
  var reduce = _g182.reduce;
  var pair = _g182.pair;
  var none63 = _g182["none?"];
  var series = _g182.series;
  var table63 = _g182["table?"];
  var last = _g182.last;
  var sort = _g182.sort;
  var function63 = _g182["function?"];
  var keep = _g182.keep;
  var string_literal63 = _g182["string-literal?"];
  var _6261 = _g182[">="];
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
      var _g279;
      if (c === "\n") {
        _g279 = "\\n";
      } else {
        var _g280;
        if (c === "\"") {
          _g280 = "\\\"";
        } else {
          var _g281;
          if (c === "\\") {
            _g281 = "\\\\";
          } else {
            _g281 = c;
          }
          _g280 = _g281;
        }
        _g279 = _g280;
      }
      var c1 = _g279;
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
      var _g202 = args;
      var k = undefined;
      for (k in _g202) {
        var v = _g202[k];
        var _g203 = parseInt(k);
        var _g282;
        if (isNaN(_g203)) {
          _g282 = k;
        } else {
          _g282 = _g203;
        }
        var _g204 = _g282;
        if (!number63(_g204)) {
          add(l, literal(_g204));
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  };
  nexus["lumen/lib"]["stash*"] = stash42;
  var index = function (k) {
    return(k);
  };
  nexus["lumen/lib"].index = index;
  var bias = function (k) {
    if (number63(k) && target != "js") {
      if (target === "js") {
        k = k - 1;
      } else {
        k = k + 1;
      }
    }
    return(k);
  };
  nexus["lumen/lib"].bias = bias;
  var bind = function (lh, rh) {
    if (composite63(lh) && list63(rh)) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var _g208 = lh;
        var k = undefined;
        for (k in _g208) {
          var v = _g208[k];
          var _g209 = parseInt(k);
          var _g283;
          if (isNaN(_g209)) {
            _g283 = k;
          } else {
            _g283 = _g209;
          }
          var _g210 = _g283;
          var _g284;
          if (_g210 === "&") {
            _g284 = ["sub", rh, length(lh)];
          } else {
            _g284 = ["get", rh, ["quote", bias(_g210)]];
          }
          var x = _g284;
          var _g285;
          if (v === true) {
            _g285 = _g210;
          } else {
            _g285 = v;
          }
          var _g211 = _g285;
          bs = join(bs, bind(_g211, x));
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
      var k63 = keys63(args);
      var r = make_id();
      var _g214 = args;
      var k = undefined;
      for (k in _g214) {
        var v = _g214[k];
        var _g215 = parseInt(k);
        var _g286;
        if (isNaN(_g215)) {
          _g286 = k;
        } else {
          _g286 = _g215;
        }
        var _g216 = _g286;
        if (number63(_g216)) {
          if (atom63(v)) {
            add(args1, v);
          } else {
            var x = make_id();
            add(args1, x);
            bs = join(bs, [v, x]);
          }
        }
      }
      if (k63) {
        bs = join(bs, [r, rest()]);
        bs = join(bs, [keys(args), r]);
      }
      return([args1, [join(["let", bs], body)]]);
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
          var _g179 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g180 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g224 = args;
            var _g225 = 0;
            while (_g225 < length(_g224)) {
              var _g222 = _g224[_g225];
              setenv(_g222, {_stash: true, variable: true});
              _g225 = _g225 + 1;
            }
            var _g223 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g223);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g181 = form[0];
              var _g226 = form[1];
              var _g227 = form[2];
              var _g228 = sub(form, 3);
              add(environment, {_scope: true});
              var _g231 = _g227;
              var _g232 = 0;
              while (_g232 < length(_g231)) {
                var _g229 = _g231[_g232];
                setenv(_g229, {_stash: true, variable: true});
                _g232 = _g232 + 1;
              }
              var _g230 = join([x, _g226, _g227], macroexpand(_g228));
              drop(environment);
              return(_g230);
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
    var _g234 = form;
    var k = undefined;
    for (k in _g234) {
      var v = _g234[k];
      var _g235 = parseInt(k);
      var _g287;
      if (isNaN(_g235)) {
        _g287 = k;
      } else {
        _g287 = _g235;
      }
      var _g236 = _g287;
      if (!number63(_g236)) {
        var _g288;
        if (quasisplice63(v, depth)) {
          _g288 = quasiexpand(v[1]);
        } else {
          _g288 = quasiexpand(v, depth);
        }
        var _g237 = _g288;
        last(xs)[_g236] = _g237;
      }
    }
    series(function (x) {
      if (quasisplice63(x, depth)) {
        var _g239 = quasiexpand(x[1]);
        add(xs, _g239);
        return(add(xs, ["list"]));
      } else {
        return(add(last(xs), quasiexpand(x, depth)));
      }
    }, form);
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
  var reserved = {"default": true, "until": true, "true": true, "*": true, "not": true, "typeof": true, "void": true, "else": true, "with": true, "this": true, "var": true, "<": true, "catch": true, "==": true, "false": true, "or": true, ">": true, "if": true, "=": true, "in": true, "elseif": true, "finally": true, "throw": true, "end": true, "nil": true, "while": true, "debugger": true, "function": true, "%": true, "case": true, "-": true, "local": true, "/": true, "continue": true, "break": true, "+": true, "instanceof": true, "delete": true, "return": true, "switch": true, "new": true, "<=": true, "try": true, ">=": true, "repeat": true, "and": true, "do": true, "for": true, "then": true};
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
      var _g289;
      if (c === "-") {
        _g289 = "_";
      } else {
        var _g290;
        if (valid_code63(n)) {
          _g290 = c;
        } else {
          var _g291;
          if (i === 0) {
            _g291 = "_" + n;
          } else {
            _g291 = n;
          }
          _g290 = _g291;
        }
        _g289 = _g290;
      }
      var c1 = _g289;
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
    var _g256 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g256.private;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g257 = module(spec).export;
      var _g259 = undefined;
      for (_g259 in _g257) {
        var v = _g257[_g259];
        var _g258 = parseInt(_g259);
        var _g292;
        if (isNaN(_g258)) {
          _g292 = _g259;
        } else {
          _g292 = _g258;
        }
        var _g260 = _g292;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _g260, ["get", m, ["quote", _g260]]]);
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
    var _g262 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_g262, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _g263 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g263, 0);
    var t1 = [];
    var _g264 = t;
    var k = undefined;
    for (k in _g264) {
      var v = _g264[k];
      var _g265 = parseInt(k);
      var _g293;
      if (isNaN(_g265)) {
        _g293 = k;
      } else {
        _g293 = _g265;
      }
      var _g266 = _g293;
      if (!keys[_g266]) {
        t1[_g266] = v;
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
    var _g269 = t;
    var k = undefined;
    for (k in _g269) {
      var v = _g269[k];
      var _g270 = parseInt(k);
      var _g294;
      if (isNaN(_g270)) {
        _g294 = k;
      } else {
        _g294 = _g270;
      }
      var _g271 = _g294;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_g271));
        add(o, x);
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
    var _g276 = ["table"];
    _g276.export = quote_frame(m.export);
    _g276.import = quoted(m.import);
    _g276.alias = quoted(m.alias);
    return(_g276);
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
  var _g295 = nexus["lumen/runtime"];
  var code = _g295.code;
  var boolean63 = _g295["boolean?"];
  var composite63 = _g295["composite?"];
  var keys = _g295.keys;
  var string = _g295.string;
  var substring = _g295.substring;
  var list63 = _g295["list?"];
  var add = _g295.add;
  var stash = _g295.stash;
  var module = _g295.module;
  var string63 = _g295["string?"];
  var in63 = _g295["in?"];
  var some63 = _g295["some?"];
  var atom63 = _g295["atom?"];
  var map = _g295.map;
  var drop = _g295.drop;
  var find = _g295.find;
  var join = _g295.join;
  var number63 = _g295["number?"];
  var inner = _g295.inner;
  var cat = _g295.cat;
  var length = _g295.length;
  var replicate = _g295.replicate;
  var number = _g295.number;
  var write = _g295.write;
  var write_file = _g295["write-file"];
  var sub = _g295.sub;
  var _47 = _g295["/"];
  var _ = _g295["-"];
  var _43 = _g295["+"];
  var _42 = _g295["*"];
  var _37message_handler = _g295["%message-handler"];
  var read_file = _g295["read-file"];
  var _37 = _g295["%"];
  var search = _g295.search;
  var apply = _g295.apply;
  var empty63 = _g295["empty?"];
  var keys63 = _g295["keys?"];
  var _61 = _g295["="];
  var _60 = _g295["<"];
  var now = _g295.now;
  var hd = _g295.hd;
  var exit = _g295.exit;
  var split = _g295.split;
  var space = _g295.space;
  var today = _g295.today;
  var tl = _g295.tl;
  var module_key = _g295["module-key"];
  var one63 = _g295["one?"];
  var setenv = _g295.setenv;
  var toplevel63 = _g295["toplevel?"];
  var make_id = _g295["make-id"];
  var reverse = _g295.reverse;
  var char = _g295.char;
  var unstash = _g295.unstash;
  var nil63 = _g295["nil?"];
  var _62 = _g295[">"];
  var id_literal63 = _g295["id-literal?"];
  var iterate = _g295.iterate;
  var is63 = _g295["is?"];
  var _6061 = _g295["<="];
  var reduce = _g295.reduce;
  var pair = _g295.pair;
  var none63 = _g295["none?"];
  var series = _g295.series;
  var table63 = _g295["table?"];
  var last = _g295.last;
  var sort = _g295.sort;
  var function63 = _g295["function?"];
  var keep = _g295.keep;
  var string_literal63 = _g295["string-literal?"];
  var _6261 = _g295[">="];
  var delimiters = {"\n": true, ";": true, ")": true, "(": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {"\n": true, " ": true, "\t": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({string: str, len: length(str), pos: 0});
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
  var _g324 = nexus["lumen/runtime"];
  var code = _g324.code;
  var boolean63 = _g324["boolean?"];
  var composite63 = _g324["composite?"];
  var keys = _g324.keys;
  var string = _g324.string;
  var substring = _g324.substring;
  var list63 = _g324["list?"];
  var add = _g324.add;
  var stash = _g324.stash;
  var module = _g324.module;
  var string63 = _g324["string?"];
  var in63 = _g324["in?"];
  var some63 = _g324["some?"];
  var atom63 = _g324["atom?"];
  var map = _g324.map;
  var drop = _g324.drop;
  var find = _g324.find;
  var join = _g324.join;
  var number63 = _g324["number?"];
  var inner = _g324.inner;
  var cat = _g324.cat;
  var length = _g324.length;
  var replicate = _g324.replicate;
  var number = _g324.number;
  var write = _g324.write;
  var write_file = _g324["write-file"];
  var sub = _g324.sub;
  var _47 = _g324["/"];
  var _ = _g324["-"];
  var _43 = _g324["+"];
  var _42 = _g324["*"];
  var _37message_handler = _g324["%message-handler"];
  var read_file = _g324["read-file"];
  var _37 = _g324["%"];
  var search = _g324.search;
  var apply = _g324.apply;
  var empty63 = _g324["empty?"];
  var keys63 = _g324["keys?"];
  var _61 = _g324["="];
  var _60 = _g324["<"];
  var now = _g324.now;
  var hd = _g324.hd;
  var exit = _g324.exit;
  var split = _g324.split;
  var space = _g324.space;
  var today = _g324.today;
  var tl = _g324.tl;
  var module_key = _g324["module-key"];
  var one63 = _g324["one?"];
  var setenv = _g324.setenv;
  var toplevel63 = _g324["toplevel?"];
  var make_id = _g324["make-id"];
  var reverse = _g324.reverse;
  var char = _g324.char;
  var unstash = _g324.unstash;
  var nil63 = _g324["nil?"];
  var _62 = _g324[">"];
  var id_literal63 = _g324["id-literal?"];
  var iterate = _g324.iterate;
  var is63 = _g324["is?"];
  var _6061 = _g324["<="];
  var reduce = _g324.reduce;
  var pair = _g324.pair;
  var none63 = _g324["none?"];
  var series = _g324.series;
  var table63 = _g324["table?"];
  var last = _g324.last;
  var sort = _g324.sort;
  var function63 = _g324["function?"];
  var keep = _g324.keep;
  var string_literal63 = _g324["string-literal?"];
  var _6261 = _g324[">="];
  var _g327 = nexus["lumen/lib"];
  var key = _g327.key;
  var symbol63 = _g327["symbol?"];
  var quote_environment = _g327["quote-environment"];
  var indentation = _g327.indentation;
  var quoted = _g327.quoted;
  var bind42 = _g327["bind*"];
  var index = _g327.index;
  var bind = _g327.bind;
  var initial_environment = _g327["initial-environment"];
  var id = _g327.id;
  var symbol_expansion = _g327["symbol-expansion"];
  var link = _g327.link;
  var mapo = _g327.mapo;
  var special63 = _g327["special?"];
  var quote_modules = _g327["quote-modules"];
  var macroexpand = _g327.macroexpand;
  var stash42 = _g327["stash*"];
  var reserved63 = _g327["reserved?"];
  var statement63 = _g327["statement?"];
  var macro63 = _g327["macro?"];
  var valid_id63 = _g327["valid-id?"];
  var bound63 = _g327["bound?"];
  var imported = _g327.imported;
  var macro_function = _g327["macro-function"];
  var quasiexpand = _g327.quasiexpand;
  var getenv = _g327.getenv;
  var special_form63 = _g327["special-form?"];
  var variable63 = _g327["variable?"];
  var _g328 = nexus["lumen/reader"];
  var read_all = _g328["read-all"];
  var read_table = _g328["read-table"];
  var read_from_string = _g328["read-from-string"];
  var read = _g328.read;
  var make_stream = _g328["make-stream"];
  var _g332 = [];
  _g332.lua = "not ";
  _g332.js = "!";
  var _g330 = [];
  var _g333 = [];
  _g333.lua = "not ";
  _g333.js = "!";
  _g330["not"] = _g333;
  var _g335 = [];
  _g335["/"] = true;
  _g335["*"] = true;
  _g335["%"] = true;
  var _g337 = [];
  _g337["-"] = true;
  _g337["+"] = true;
  var _g341 = [];
  _g341.lua = "..";
  _g341.js = "+";
  var _g339 = [];
  var _g342 = [];
  _g342.lua = "..";
  _g342.js = "+";
  _g339.cat = _g342;
  var _g344 = [];
  _g344["<"] = true;
  _g344["<="] = true;
  _g344[">"] = true;
  _g344[">="] = true;
  var _g350 = [];
  _g350.lua = "~=";
  _g350.js = "!=";
  var _g348 = [];
  _g348.lua = "==";
  _g348.js = "===";
  var _g346 = [];
  var _g351 = [];
  _g351.lua = "~=";
  _g351.js = "!=";
  _g346["~="] = _g351;
  var _g352 = [];
  _g352.lua = "==";
  _g352.js = "===";
  _g346["="] = _g352;
  var _g356 = [];
  _g356.lua = "and";
  _g356.js = "&&";
  var _g354 = [];
  var _g357 = [];
  _g357.lua = "and";
  _g357.js = "&&";
  _g354["and"] = _g357;
  var _g361 = [];
  _g361.lua = "or";
  _g361.js = "||";
  var _g359 = [];
  var _g362 = [];
  _g362.lua = "or";
  _g362.js = "||";
  _g359["or"] = _g362;
  var infix = [_g330, _g335, _g337, _g339, _g344, _g346, _g354, _g359];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g365 = infix;
      var k = undefined;
      for (k in _g365) {
        var v = _g365[k];
        var _g366 = parseInt(k);
        var _g442;
        if (isNaN(_g366)) {
          _g442 = k;
        } else {
          _g442 = _g366;
        }
        var _g367 = _g442;
        if (v[hd(form)]) {
          return(index(_g367));
        }
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
    var comma = "";
    series(function (x) {
      str = str + comma + compile(x);
      comma = ", ";
    }, args);
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
    var _g376 = getenv(x);
    var special = _g376.special;
    var self_tr63 = _g376.tr;
    var stmt = _g376.stmt;
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
    var _g379 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g379.right;
    var _g443;
    if (right) {
      _g443 = _6261;
    } else {
      _g443 = _62;
    }
    if (_g443(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g381 = sub(form, 1);
    var a = _g381[0];
    var b = _g381[1];
    var _g382 = op_delims(form, a);
    var ao = _g382[0];
    var ac = _g382[1];
    var _g383 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g383[0];
    var bc = _g383[1];
    var _g384 = compile(a);
    var _g385 = compile(b);
    var _g386 = getop(op);
    if (unary63(form)) {
      return(_g386 + ao + _g384 + ac);
    } else {
      return(ao + _g384 + ac + " " + _g386 + " " + bo + _g385 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g387 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g387.name;
    var prefix = _g387.prefix;
    var _g444;
    if (name) {
      _g444 = compile(name);
    } else {
      _g444 = "";
    }
    var id = _g444;
    var _g388 = prefix || "";
    var _g389 = compile_args(args);
    indent_level = indent_level + 1;
    var _g391 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g390 = _g391;
    var ind = indentation();
    var _g445;
    if (target === "js") {
      _g445 = "";
    } else {
      _g445 = "end";
    }
    var tr = _g445;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g389 + " {\n" + _g390 + ind + "}" + tr);
    } else {
      return(_g388 + "function " + id + _g389 + "\n" + _g390 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g393 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g393.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g446;
        if (stmt) {
          _g446 = indentation();
        } else {
          _g446 = "";
        }
        var ind = _g446;
        var _g447;
        if (atom63(form)) {
          _g447 = compile_atom(form);
        } else {
          var _g448;
          if (infix63(hd(form))) {
            _g448 = compile_infix(form);
          } else {
            _g448 = compile_call(form);
          }
          _g447 = _g448;
        }
        var _g394 = _g447;
        return(ind + _g394 + tr);
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
    var n = length(args) - 1;
    var _g398 = args;
    var k = undefined;
    for (k in _g398) {
      var x = _g398[k];
      var _g399 = parseInt(k);
      var _g449;
      if (isNaN(_g399)) {
        _g449 = k;
      } else {
        _g449 = _g399;
      }
      var _g400 = _g449;
      if (number63(_g400) && index(_g400) < n) {
        add(hoist, lower(x, hoist, stmt63));
      }
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
    var _g402 = args[1];
    var _g403 = args[2];
    if (stmt63 || tail63) {
      var _g451;
      if (_g403) {
        _g451 = [lower_body([_g403], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g402], tail63)], _g451)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g450;
      if (_g403) {
        _g450 = [lower(["set", e, _g403])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g402])], _g450));
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
      var _g452;
      if (x === "and") {
        _g452 = ["%if", id, b, id];
      } else {
        _g452 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g452], hoist));
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
    var _g410 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g410, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g412 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g412)) {
      return(_g412);
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
    var _g426 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g426.private;
    var m = module(spec);
    var frame = last(environment);
    var _g427 = m.export;
    var k = undefined;
    for (k in _g427) {
      var v = _g427[k];
      var _g428 = parseInt(k);
      var _g453;
      if (isNaN(_g428)) {
        _g453 = k;
      } else {
        _g453 = _g428;
      }
      var _g429 = _g453;
      if (v.export || private) {
        frame[_g429] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g430 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g430.private;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, private: private}));
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  var in_module = function (spec) {
    load_module(spec, {_stash: true, private: true});
    var m = module(spec);
    series(open_module, m.import);
    current_module = spec;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    var _g433 = specs || [];
    var _g434 = 0;
    while (_g434 < length(_g433)) {
      var spec = _g433[_g434];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g435 = import_modules(m.alias);
        var aliased = _g435[0];
        var bs = _g435[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g436 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g436);
      }
      _g434 = _g434 + 1;
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
    return(join(imports, imported(current_module, {_stash: true, private: true})));
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
  var _g454 = nexus["lumen/runtime"];
  var code = _g454.code;
  var boolean63 = _g454["boolean?"];
  var composite63 = _g454["composite?"];
  var keys = _g454.keys;
  var string = _g454.string;
  var substring = _g454.substring;
  var list63 = _g454["list?"];
  var add = _g454.add;
  var stash = _g454.stash;
  var module = _g454.module;
  var string63 = _g454["string?"];
  var in63 = _g454["in?"];
  var some63 = _g454["some?"];
  var atom63 = _g454["atom?"];
  var map = _g454.map;
  var drop = _g454.drop;
  var find = _g454.find;
  var join = _g454.join;
  var number63 = _g454["number?"];
  var inner = _g454.inner;
  var cat = _g454.cat;
  var length = _g454.length;
  var replicate = _g454.replicate;
  var number = _g454.number;
  var write = _g454.write;
  var write_file = _g454["write-file"];
  var sub = _g454.sub;
  var _47 = _g454["/"];
  var _ = _g454["-"];
  var _43 = _g454["+"];
  var _42 = _g454["*"];
  var _37message_handler = _g454["%message-handler"];
  var read_file = _g454["read-file"];
  var _37 = _g454["%"];
  var search = _g454.search;
  var apply = _g454.apply;
  var empty63 = _g454["empty?"];
  var keys63 = _g454["keys?"];
  var _61 = _g454["="];
  var _60 = _g454["<"];
  var now = _g454.now;
  var hd = _g454.hd;
  var exit = _g454.exit;
  var split = _g454.split;
  var space = _g454.space;
  var today = _g454.today;
  var tl = _g454.tl;
  var module_key = _g454["module-key"];
  var one63 = _g454["one?"];
  var setenv = _g454.setenv;
  var toplevel63 = _g454["toplevel?"];
  var make_id = _g454["make-id"];
  var reverse = _g454.reverse;
  var char = _g454.char;
  var unstash = _g454.unstash;
  var nil63 = _g454["nil?"];
  var _62 = _g454[">"];
  var id_literal63 = _g454["id-literal?"];
  var iterate = _g454.iterate;
  var is63 = _g454["is?"];
  var _6061 = _g454["<="];
  var reduce = _g454.reduce;
  var pair = _g454.pair;
  var none63 = _g454["none?"];
  var series = _g454.series;
  var table63 = _g454["table?"];
  var last = _g454.last;
  var sort = _g454.sort;
  var function63 = _g454["function?"];
  var keep = _g454.keep;
  var string_literal63 = _g454["string-literal?"];
  var _6261 = _g454[">="];
  var _g457 = nexus["lumen/lib"];
  var key = _g457.key;
  var symbol63 = _g457["symbol?"];
  var quote_environment = _g457["quote-environment"];
  var indentation = _g457.indentation;
  var quoted = _g457.quoted;
  var bind42 = _g457["bind*"];
  var index = _g457.index;
  var bind = _g457.bind;
  var initial_environment = _g457["initial-environment"];
  var id = _g457.id;
  var symbol_expansion = _g457["symbol-expansion"];
  var link = _g457.link;
  var mapo = _g457.mapo;
  var special63 = _g457["special?"];
  var quote_modules = _g457["quote-modules"];
  var macroexpand = _g457.macroexpand;
  var stash42 = _g457["stash*"];
  var reserved63 = _g457["reserved?"];
  var statement63 = _g457["statement?"];
  var macro63 = _g457["macro?"];
  var valid_id63 = _g457["valid-id?"];
  var bound63 = _g457["bound?"];
  var imported = _g457.imported;
  var macro_function = _g457["macro-function"];
  var quasiexpand = _g457.quasiexpand;
  var getenv = _g457.getenv;
  var special_form63 = _g457["special-form?"];
  var variable63 = _g457["variable?"];
  var _g458 = nexus["lumen/compiler"];
  var in_module = _g458["in-module"];
  var import_modules = _g458["import-modules"];
  var compile_function = _g458["compile-function"];
  var compile_module = _g458["compile-module"];
  var load_module = _g458["load-module"];
  var open_module = _g458["open-module"];
  var eval = _g458.eval;
  var compile = _g458.compile;
  var declare = _g458.declare;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g645 = nexus["lumen/runtime"];
  var code = _g645.code;
  var boolean63 = _g645["boolean?"];
  var composite63 = _g645["composite?"];
  var keys = _g645.keys;
  var string = _g645.string;
  var substring = _g645.substring;
  var list63 = _g645["list?"];
  var add = _g645.add;
  var stash = _g645.stash;
  var module = _g645.module;
  var string63 = _g645["string?"];
  var in63 = _g645["in?"];
  var some63 = _g645["some?"];
  var atom63 = _g645["atom?"];
  var map = _g645.map;
  var drop = _g645.drop;
  var find = _g645.find;
  var join = _g645.join;
  var number63 = _g645["number?"];
  var inner = _g645.inner;
  var cat = _g645.cat;
  var length = _g645.length;
  var replicate = _g645.replicate;
  var number = _g645.number;
  var write = _g645.write;
  var write_file = _g645["write-file"];
  var sub = _g645.sub;
  var _47 = _g645["/"];
  var _ = _g645["-"];
  var _43 = _g645["+"];
  var _42 = _g645["*"];
  var _37message_handler = _g645["%message-handler"];
  var read_file = _g645["read-file"];
  var _37 = _g645["%"];
  var search = _g645.search;
  var apply = _g645.apply;
  var empty63 = _g645["empty?"];
  var keys63 = _g645["keys?"];
  var _61 = _g645["="];
  var _60 = _g645["<"];
  var now = _g645.now;
  var hd = _g645.hd;
  var exit = _g645.exit;
  var split = _g645.split;
  var space = _g645.space;
  var today = _g645.today;
  var tl = _g645.tl;
  var module_key = _g645["module-key"];
  var one63 = _g645["one?"];
  var setenv = _g645.setenv;
  var toplevel63 = _g645["toplevel?"];
  var make_id = _g645["make-id"];
  var reverse = _g645.reverse;
  var char = _g645.char;
  var unstash = _g645.unstash;
  var nil63 = _g645["nil?"];
  var _62 = _g645[">"];
  var id_literal63 = _g645["id-literal?"];
  var iterate = _g645.iterate;
  var is63 = _g645["is?"];
  var _6061 = _g645["<="];
  var reduce = _g645.reduce;
  var pair = _g645.pair;
  var none63 = _g645["none?"];
  var series = _g645.series;
  var table63 = _g645["table?"];
  var last = _g645.last;
  var sort = _g645.sort;
  var function63 = _g645["function?"];
  var keep = _g645.keep;
  var string_literal63 = _g645["string-literal?"];
  var _6261 = _g645[">="];
  var _g648 = nexus["lumen/lib"];
  var key = _g648.key;
  var symbol63 = _g648["symbol?"];
  var quote_environment = _g648["quote-environment"];
  var indentation = _g648.indentation;
  var quoted = _g648.quoted;
  var bind42 = _g648["bind*"];
  var index = _g648.index;
  var bind = _g648.bind;
  var initial_environment = _g648["initial-environment"];
  var id = _g648.id;
  var symbol_expansion = _g648["symbol-expansion"];
  var link = _g648.link;
  var mapo = _g648.mapo;
  var special63 = _g648["special?"];
  var quote_modules = _g648["quote-modules"];
  var macroexpand = _g648.macroexpand;
  var stash42 = _g648["stash*"];
  var reserved63 = _g648["reserved?"];
  var statement63 = _g648["statement?"];
  var macro63 = _g648["macro?"];
  var valid_id63 = _g648["valid-id?"];
  var bound63 = _g648["bound?"];
  var imported = _g648.imported;
  var macro_function = _g648["macro-function"];
  var quasiexpand = _g648.quasiexpand;
  var getenv = _g648.getenv;
  var special_form63 = _g648["special-form?"];
  var variable63 = _g648["variable?"];
  var _g649 = nexus["lumen/compiler"];
  var in_module = _g649["in-module"];
  var import_modules = _g649["import-modules"];
  var compile_function = _g649["compile-function"];
  var compile_module = _g649["compile-module"];
  var load_module = _g649["load-module"];
  var open_module = _g649["open-module"];
  var eval = _g649.eval;
  var compile = _g649.compile;
  var declare = _g649.declare;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g972 = nexus["lumen/runtime"];
  var code = _g972.code;
  var boolean63 = _g972["boolean?"];
  var composite63 = _g972["composite?"];
  var keys = _g972.keys;
  var string = _g972.string;
  var substring = _g972.substring;
  var list63 = _g972["list?"];
  var add = _g972.add;
  var stash = _g972.stash;
  var module = _g972.module;
  var string63 = _g972["string?"];
  var in63 = _g972["in?"];
  var some63 = _g972["some?"];
  var atom63 = _g972["atom?"];
  var map = _g972.map;
  var drop = _g972.drop;
  var find = _g972.find;
  var join = _g972.join;
  var number63 = _g972["number?"];
  var inner = _g972.inner;
  var cat = _g972.cat;
  var length = _g972.length;
  var replicate = _g972.replicate;
  var number = _g972.number;
  var write = _g972.write;
  var write_file = _g972["write-file"];
  var sub = _g972.sub;
  var _47 = _g972["/"];
  var _ = _g972["-"];
  var _43 = _g972["+"];
  var _42 = _g972["*"];
  var _37message_handler = _g972["%message-handler"];
  var read_file = _g972["read-file"];
  var _37 = _g972["%"];
  var search = _g972.search;
  var apply = _g972.apply;
  var empty63 = _g972["empty?"];
  var keys63 = _g972["keys?"];
  var _61 = _g972["="];
  var _60 = _g972["<"];
  var now = _g972.now;
  var hd = _g972.hd;
  var exit = _g972.exit;
  var split = _g972.split;
  var space = _g972.space;
  var today = _g972.today;
  var tl = _g972.tl;
  var module_key = _g972["module-key"];
  var one63 = _g972["one?"];
  var setenv = _g972.setenv;
  var toplevel63 = _g972["toplevel?"];
  var make_id = _g972["make-id"];
  var reverse = _g972.reverse;
  var char = _g972.char;
  var unstash = _g972.unstash;
  var nil63 = _g972["nil?"];
  var _62 = _g972[">"];
  var id_literal63 = _g972["id-literal?"];
  var iterate = _g972.iterate;
  var is63 = _g972["is?"];
  var _6061 = _g972["<="];
  var reduce = _g972.reduce;
  var pair = _g972.pair;
  var none63 = _g972["none?"];
  var series = _g972.series;
  var table63 = _g972["table?"];
  var last = _g972.last;
  var sort = _g972.sort;
  var function63 = _g972["function?"];
  var keep = _g972.keep;
  var string_literal63 = _g972["string-literal?"];
  var _6261 = _g972[">="];
  var _g975 = nexus["lumen/lib"];
  var key = _g975.key;
  var symbol63 = _g975["symbol?"];
  var quote_environment = _g975["quote-environment"];
  var indentation = _g975.indentation;
  var quoted = _g975.quoted;
  var bind42 = _g975["bind*"];
  var index = _g975.index;
  var bind = _g975.bind;
  var initial_environment = _g975["initial-environment"];
  var id = _g975.id;
  var symbol_expansion = _g975["symbol-expansion"];
  var link = _g975.link;
  var mapo = _g975.mapo;
  var special63 = _g975["special?"];
  var quote_modules = _g975["quote-modules"];
  var macroexpand = _g975.macroexpand;
  var stash42 = _g975["stash*"];
  var reserved63 = _g975["reserved?"];
  var statement63 = _g975["statement?"];
  var macro63 = _g975["macro?"];
  var valid_id63 = _g975["valid-id?"];
  var bound63 = _g975["bound?"];
  var imported = _g975.imported;
  var macro_function = _g975["macro-function"];
  var quasiexpand = _g975.quasiexpand;
  var getenv = _g975.getenv;
  var special_form63 = _g975["special-form?"];
  var variable63 = _g975["variable?"];
  var _g976 = nexus["lumen/compiler"];
  var in_module = _g976["in-module"];
  var import_modules = _g976["import-modules"];
  var compile_function = _g976["compile-function"];
  var compile_module = _g976["compile-module"];
  var load_module = _g976["load-module"];
  var open_module = _g976["open-module"];
  var eval = _g976.eval;
  var compile = _g976.compile;
  var declare = _g976.declare;
  global.modules = {"lumen/boot": {export: {modules: {export: true, global: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {code: {variable: true, export: true}, "boolean?": {variable: true, export: true}, "composite?": {variable: true, export: true}, keys: {variable: true, export: true}, string: {variable: true, export: true}, substring: {variable: true, export: true}, shift: {variable: true}, "list?": {variable: true, export: true}, add: {variable: true, export: true}, stash: {variable: true, export: true}, module: {variable: true, export: true}, "string?": {variable: true, export: true}, "in?": {variable: true, export: true}, "some?": {variable: true, export: true}, "atom?": {variable: true, export: true}, map: {variable: true, export: true}, drop: {variable: true, export: true}, find: {variable: true, export: true}, join: {variable: true, export: true}, "number?": {variable: true, export: true}, inner: {variable: true, export: true}, cat: {variable: true, export: true}, length: {variable: true, export: true}, replicate: {variable: true, export: true}, number: {variable: true, export: true}, fs: {variable: true}, write: {variable: true, export: true}, "write-file": {variable: true, export: true}, sub: {variable: true, export: true}, require: {export: true, global: true}, "/": {variable: true, export: true}, "-": {variable: true, export: true}, "+": {variable: true, export: true}, "*": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, "read-file": {variable: true, export: true}, "%": {variable: true, export: true}, search: {variable: true, export: true}, apply: {variable: true, export: true}, "empty?": {variable: true, export: true}, "keys?": {variable: true, export: true}, "=": {variable: true, export: true}, "<": {variable: true, export: true}, now: {variable: true, export: true}, "id-count": {variable: true}, hd: {variable: true, export: true}, exit: {variable: true, export: true}, split: {variable: true, export: true}, space: {variable: true, export: true}, print: {export: true, global: true}, today: {variable: true, export: true}, tl: {variable: true, export: true}, "module-key": {variable: true, export: true}, "one?": {variable: true, export: true}, setenv: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "make-id": {variable: true, export: true}, reverse: {variable: true, export: true}, char: {variable: true, export: true}, unstash: {variable: true, export: true}, "nil?": {variable: true, export: true}, ">": {variable: true, export: true}, type: {variable: true}, "id-literal?": {variable: true, export: true}, iterate: {variable: true, export: true}, "is?": {variable: true, export: true}, "<=": {variable: true, export: true}, reduce: {variable: true, export: true}, pair: {variable: true, export: true}, "none?": {variable: true, export: true}, series: {variable: true, export: true}, "table?": {variable: true, export: true}, last: {variable: true, export: true}, sort: {variable: true, export: true}, "function?": {variable: true, export: true}, keep: {variable: true, export: true}, "string-literal?": {variable: true, export: true}, ">=": {variable: true, export: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/lib": {export: {escape: {variable: true}, key: {variable: true, export: true}, "symbol?": {variable: true, export: true}, "quote-environment": {variable: true, export: true}, indentation: {variable: true, export: true}, "quasiquote-list": {variable: true}, "indent-level": {export: true, global: true}, "quote-binding": {variable: true}, quoted: {variable: true, export: true}, "quasisplice?": {variable: true}, "bind*": {variable: true, export: true}, literal: {variable: true}, index: {variable: true, export: true}, bind: {variable: true, export: true}, "global?": {variable: true}, "numeric?": {variable: true}, "initial-environment": {variable: true, export: true}, id: {variable: true, export: true}, "symbol-expansion": {variable: true, export: true}, link: {variable: true, export: true}, mapo: {variable: true, export: true}, "special?": {variable: true, export: true}, "quote-modules": {variable: true, export: true}, macroexpand: {variable: true, export: true}, "stash*": {variable: true, export: true}, "quote-module": {variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, exclude: {variable: true}, "reserved?": {variable: true, export: true}, extend: {variable: true}, "statement?": {variable: true, export: true}, reserved: {variable: true}, "can-unquote?": {variable: true}, "macro?": {variable: true, export: true}, "quoting?": {variable: true}, "valid-id?": {variable: true, export: true}, bias: {variable: true}, "quasiquoting?": {variable: true}, "bound?": {variable: true, export: true}, imported: {variable: true, export: true}, "macro-function": {variable: true, export: true}, quasiexpand: {variable: true, export: true}, "valid-code?": {variable: true}, getenv: {variable: true, export: true}, "quote-frame": {variable: true}, "special-form?": {variable: true, export: true}, "variable?": {variable: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"%try": {special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g995 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g995;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g996 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g996;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, export: true, stmt: true, tr: true, foo: true}, "not": {}, "%if": {special: function (cond, cons, alt) {
    var _g998 = compile(cond);
    indent_level = indent_level + 1;
    var _g1000 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g999 = _g1000;
    var _g1092;
    if (alt) {
      indent_level = indent_level + 1;
      var _g1002 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g1092 = _g1002;
    }
    var _g1001 = _g1092;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g998 + ") {\n" + _g999 + ind + "}";
    } else {
      str = str + ind + "if " + _g998 + " then\n" + _g999;
    }
    if (_g1001 && target === "js") {
      str = str + " else {\n" + _g1001 + ind + "}";
    } else {
      if (_g1001) {
        str = str + ind + "else\n" + _g1001;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, export: true, stmt: true, tr: true, foo: true}, "while": {special: function (cond, form) {
    var _g1004 = compile(cond);
    indent_level = indent_level + 1;
    var _g1005 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1005;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g1004 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g1004 + " do\n" + body + ind + "end\n");
    }
  }, export: true, stmt: true, tr: true, foo: true}, "return": {foo: true, special: function (x) {
    var _g1093;
    if (nil63(x)) {
      _g1093 = "return";
    } else {
      _g1093 = "return(" + compile(x) + ")";
    }
    var _g1007 = _g1093;
    return(indentation() + _g1007);
  }, export: true, stmt: true}, set: {foo: true, special: function (lh, rh) {
    var _g1009 = compile(lh);
    var _g1094;
    if (nil63(rh)) {
      _g1094 = "nil";
    } else {
      _g1094 = rh;
    }
    var _g1010 = compile(_g1094);
    return(indentation() + _g1009 + " = " + _g1010);
  }, export: true, stmt: true}, "break": {foo: true, special: function () {
    return(indentation() + "break");
  }, export: true, stmt: true}, "%local-function": {special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return(indentation() + x);
  }, export: true, stmt: true, tr: true, foo: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g1095;
    if (target === "lua") {
      _g1095 = " = ";
    } else {
      _g1095 = ": ";
    }
    var sep = _g1095;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g1013 = pairs;
    var i = 0;
    while (i < length(_g1013)) {
      var _g1014 = _g1013[i];
      var k = _g1014[0];
      var v = _g1014[1];
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
  }, export: true, foo: true}, error: {foo: true, special: function (x) {
    var _g1096;
    if (target === "js") {
      _g1096 = "throw new " + compile(["Error", x]);
    } else {
      _g1096 = "error(" + compile(x) + ")";
    }
    var e = _g1096;
    return(indentation() + e);
  }, export: true, stmt: true}, "%global-function": {special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, export: true, stmt: true, tr: true, foo: true}, "%for": {special: function (t, k, form) {
    var _g1018 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g1019 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1019;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g1018 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g1018 + ") {\n" + body + ind + "}\n");
    }
  }, export: true, stmt: true, tr: true, foo: true}, "do": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g1020 = forms;
    var _g1021 = 0;
    while (_g1021 < length(_g1020)) {
      var x = _g1020[_g1021];
      str = str + compile(x, {_stash: true, stmt: true});
      _g1021 = _g1021 + 1;
    }
    return(str);
  }, export: true, stmt: true, tr: true, foo: true}, get: {special: function (t, k) {
    var _g1023 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g1023, 0) === "{") {
      _g1023 = "(" + _g1023 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g1023 + "." + inner(k));
    } else {
      return(_g1023 + "[" + k1 + "]");
    }
  }, export: true, foo: true}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g1097;
    if (target === "lua") {
      _g1097 = "{";
    } else {
      _g1097 = "[";
    }
    var open = _g1097;
    var _g1098;
    if (target === "lua") {
      _g1098 = "}";
    } else {
      _g1098 = "]";
    }
    var close = _g1098;
    var str = "";
    var _g1024 = forms;
    var i = 0;
    while (i < length(_g1024)) {
      var x = _g1024[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, export: true, foo: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, export: true, foo: true}, "%local": {foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g1099;
    if (is63(value)) {
      _g1099 = " = " + value1;
    } else {
      _g1099 = "";
    }
    var rh = _g1099;
    var _g1100;
    if (target === "js") {
      _g1100 = "var ";
    } else {
      _g1100 = "local ";
    }
    var keyword = _g1100;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, export: true, stmt: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/core": {export: {target: {global: true, export: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, each: {export: true, macro: function (b, t) {
    var _g1027 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1027, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g1101;
    if (nil63(v)) {
      var _g1102;
      if (b.i) {
        _g1102 = "i";
      } else {
        _g1102 = make_id();
      }
      var i = _g1102;
      _g1101 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], body), ["inc", i]]];
    } else {
      var _g1028 = ["target"];
      _g1028.lua = ["not", ["number?", k]];
      _g1028.js = ["isNaN", ["parseInt", k]];
      _g1101 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g1028, join(["let", [v, ["get", t1, k]]], body)]]];
    }
    return(["let", [t1, t], _g1101]);
  }}, "with-bindings": {export: true, macro: function (_g1030) {
    var names = _g1030[0];
    var _g1029 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1029, 0);
    var x = make_id();
    var _g1032 = ["setenv", x];
    _g1032.variable = true;
    var _g1031 = ["with-frame", ["each", [x], names, _g1032]];
    _g1031.scope = true;
    return(join(_g1031, body));
  }}, "cat!": {export: true, macro: function (a) {
    var _g1033 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1033, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, unless: {export: true, macro: function (cond) {
    var _g1034 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1034, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, all: {export: true, macro: function (_g1036, t) {
    var k = _g1036[0];
    var v = _g1036[1];
    var _g1035 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1035, 0);
    var x = make_id();
    var n = make_id();
    var _g1103;
    if (target === "lua") {
      _g1103 = body;
    } else {
      _g1103 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g1103)]]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, at: {export: true, macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}, "with-frame": {export: true, macro: function () {
    var _g1040 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g1040, 0);
    var scope = _g1040.scope;
    var x = make_id();
    var _g1041 = ["table"];
    _g1041._scope = scope;
    return(["do", ["add", "environment", _g1041], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}, when: {export: true, macro: function (cond) {
    var _g1042 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1042, 0);
    return(["if", cond, join(["do"], body)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, "define-module": {export: true, macro: function (spec) {
    var _g1044 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1044, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1045 = import_modules(imp);
    var imports = _g1045[0];
    var bindings = _g1045[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1046 = exp || [];
    var _g1047 = 0;
    while (_g1047 < length(_g1046)) {
      var x = _g1046[_g1047];
      setenv(x, {_stash: true, export: true});
      _g1047 = _g1047 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g1048 = body;
      var k = undefined;
      for (k in _g1048) {
        if (isNaN(parseInt(k))) {
          var v = _g1048[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, let: {export: true, macro: function (bindings) {
    var _g1049 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1049, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g1050 = bind(lh, rh);
      var _g1051 = 0;
      while (_g1051 < length(_g1050)) {
        var _g1052 = _g1050[_g1051];
        var id = _g1052[0];
        var val = _g1052[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g1051 = _g1051 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
    }
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _g1053 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1053, 0);
    var form = join(["fn", args], body);
    var _g1054 = ["setenv", ["quote", name]];
    _g1054.form = ["quote", form];
    _g1054.macro = form;
    eval(_g1054);
    return(undefined);
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1056) {
      var a = _g1056[0];
      var b = _g1056[1];
      var c = sub(_g1056, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g1058 = xs;
    var _g1059 = 0;
    while (_g1059 < length(_g1058)) {
      var x = _g1058[_g1059];
      l[x] = true;
      _g1059 = _g1059 + 1;
    }
    return(join(["table"], l));
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, define: {export: true, macro: function (name, x) {
    var _g1061 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1061, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1062 = bind42(x, body);
        var args = _g1062[0];
        var _g1063 = _g1062[1];
        return(link(name, join(["%local-function", name, args], _g1063)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _g1064 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1064, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1065 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1065);
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "define*": {export: true, macro: function (name, x) {
    var _g1068 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1068, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(body)) {
      var _g1069 = bind42(x, body);
      var args = _g1069[0];
      var _g1070 = _g1069[1];
      return(join(["%global-function", name, args], _g1070));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "join!": {export: true, macro: function (a) {
    var _g1071 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1071, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, fn: {export: true, macro: function (args) {
    var _g1075 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1075, 0);
    var _g1076 = bind42(args, body);
    var _g1077 = _g1076[0];
    var _g1078 = _g1076[1];
    return(join(["%function", _g1077], _g1078));
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _g1079 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1079, 0);
    add(environment, {});
    map(function (_g1082) {
      var name = _g1082[0];
      var exp = _g1082[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1080 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1080);
  }}, "define-special": {export: true, macro: function (name, args) {
    var _g1083 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1083, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g1084 = ["setenv", ["quote", name]];
    _g1084.special = form;
    _g1084.form = ["quote", form];
    eval(join(_g1084, keys));
    return(undefined);
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {reimported: {variable: true}, "lower-while": {variable: true}, "lower-call": {variable: true}, "compile-infix": {variable: true}, "parenthesize-call?": {variable: true}, "in-module": {variable: true, export: true}, "import-modules": {variable: true, export: true}, "%result": {export: true, global: true}, "compile-function": {variable: true, export: true}, "can-return?": {variable: true}, "compile-module": {variable: true, export: true}, "lower-definition": {variable: true}, "lower-infix?": {variable: true}, conclude: {variable: true}, "current-module": {export: true, global: true}, "lower-if": {variable: true}, "lower-function": {variable: true}, "load-module": {variable: true, export: true}, "lower-short": {variable: true}, "compiler-output": {variable: true}, "compile-atom": {variable: true}, "compile-args": {variable: true}, process: {variable: true}, "compile-file": {variable: true}, "lower-do": {variable: true}, "compile-call": {variable: true}, run: {variable: true}, lower: {variable: true}, "lower-infix": {variable: true}, terminator: {variable: true}, "open-module": {variable: true, export: true}, "compiling?": {variable: true}, "lower-body": {variable: true}, "lower-for": {variable: true}, eval: {variable: true, export: true}, compile: {variable: true, export: true}, "op-delims": {variable: true}, "compile-special": {variable: true}, declare: {variable: true, export: true}, "%compile-module": {variable: true}, "unary?": {variable: true}, getop: {variable: true}, encapsulate: {variable: true}, "lower-try": {variable: true}, "infix?": {variable: true}, precedence: {variable: true}, "lower-special": {variable: true}, "module-path": {variable: true}, infix: {variable: true}, "lower-statement": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, lumen: {export: {}, import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"read-all": {variable: true, export: true}, "read-table": {variable: true, export: true}, whitespace: {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, "read-from-string": {variable: true, export: true}, eof: {variable: true}, delimiters: {variable: true}, read: {variable: true, export: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, "peek-char": {variable: true}, "make-stream": {variable: true, export: true}, "define-reader": {export: true, macro: function (_g1087) {
    var char = _g1087[0];
    var stream = _g1087[1];
    var _g1086 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1086, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _g1088 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1088, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1089 = import_modules(imp);
    var imports = _g1089[0];
    var bindings = _g1089[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1090 = exp || [];
    var _g1091 = 0;
    while (_g1091 < length(_g1090)) {
      var x = _g1090[_g1091];
      setenv(x, {_stash: true, export: true});
      _g1091 = _g1091 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g1104 = nexus["lumen/runtime"];
  var code = _g1104.code;
  var boolean63 = _g1104["boolean?"];
  var composite63 = _g1104["composite?"];
  var keys = _g1104.keys;
  var string = _g1104.string;
  var substring = _g1104.substring;
  var list63 = _g1104["list?"];
  var add = _g1104.add;
  var stash = _g1104.stash;
  var module = _g1104.module;
  var string63 = _g1104["string?"];
  var in63 = _g1104["in?"];
  var some63 = _g1104["some?"];
  var atom63 = _g1104["atom?"];
  var map = _g1104.map;
  var drop = _g1104.drop;
  var find = _g1104.find;
  var join = _g1104.join;
  var number63 = _g1104["number?"];
  var inner = _g1104.inner;
  var cat = _g1104.cat;
  var length = _g1104.length;
  var replicate = _g1104.replicate;
  var number = _g1104.number;
  var write = _g1104.write;
  var write_file = _g1104["write-file"];
  var sub = _g1104.sub;
  var _47 = _g1104["/"];
  var _ = _g1104["-"];
  var _43 = _g1104["+"];
  var _42 = _g1104["*"];
  var _37message_handler = _g1104["%message-handler"];
  var read_file = _g1104["read-file"];
  var _37 = _g1104["%"];
  var search = _g1104.search;
  var apply = _g1104.apply;
  var empty63 = _g1104["empty?"];
  var keys63 = _g1104["keys?"];
  var _61 = _g1104["="];
  var _60 = _g1104["<"];
  var now = _g1104.now;
  var hd = _g1104.hd;
  var exit = _g1104.exit;
  var split = _g1104.split;
  var space = _g1104.space;
  var today = _g1104.today;
  var tl = _g1104.tl;
  var module_key = _g1104["module-key"];
  var one63 = _g1104["one?"];
  var setenv = _g1104.setenv;
  var toplevel63 = _g1104["toplevel?"];
  var make_id = _g1104["make-id"];
  var reverse = _g1104.reverse;
  var char = _g1104.char;
  var unstash = _g1104.unstash;
  var nil63 = _g1104["nil?"];
  var _62 = _g1104[">"];
  var id_literal63 = _g1104["id-literal?"];
  var iterate = _g1104.iterate;
  var is63 = _g1104["is?"];
  var _6061 = _g1104["<="];
  var reduce = _g1104.reduce;
  var pair = _g1104.pair;
  var none63 = _g1104["none?"];
  var series = _g1104.series;
  var table63 = _g1104["table?"];
  var last = _g1104.last;
  var sort = _g1104.sort;
  var function63 = _g1104["function?"];
  var keep = _g1104.keep;
  var string_literal63 = _g1104["string-literal?"];
  var _6261 = _g1104[">="];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var code = _g2.code;
  var boolean63 = _g2["boolean?"];
  var composite63 = _g2["composite?"];
  var keys = _g2.keys;
  var string = _g2.string;
  var substring = _g2.substring;
  var list63 = _g2["list?"];
  var add = _g2.add;
  var stash = _g2.stash;
  var module = _g2.module;
  var string63 = _g2["string?"];
  var reduce = _g2.reduce;
  var some63 = _g2["some?"];
  var atom63 = _g2["atom?"];
  var series = _g2.series;
  var drop = _g2.drop;
  var find = _g2.find;
  var join = _g2.join;
  var number63 = _g2["number?"];
  var inner = _g2.inner;
  var cat = _g2.cat;
  var length = _g2.length;
  var replicate = _g2.replicate;
  var number = _g2.number;
  var write = _g2.write;
  var write_file = _g2["write-file"];
  var sub = _g2.sub;
  var _47 = _g2["/"];
  var nil63 = _g2["nil?"];
  var _43 = _g2["+"];
  var _42 = _g2["*"];
  var _37message_handler = _g2["%message-handler"];
  var id_literal63 = _g2["id-literal?"];
  var _37 = _g2["%"];
  var iterate = _g2.iterate;
  var apply = _g2.apply;
  var empty63 = _g2["empty?"];
  var keys63 = _g2["keys?"];
  var _61 = _g2["="];
  var _60 = _g2["<"];
  var now = _g2.now;
  var hd = _g2.hd;
  var exit = _g2.exit;
  var none63 = _g2["none?"];
  var space = _g2.space;
  var tl = _g2.tl;
  var module_key = _g2["module-key"];
  var one63 = _g2["one?"];
  var setenv = _g2.setenv;
  var toplevel63 = _g2["toplevel?"];
  var make_id = _g2["make-id"];
  var reverse = _g2.reverse;
  var today = _g2.today;
  var unstash = _g2.unstash;
  var read_file = _g2["read-file"];
  var _6061 = _g2["<="];
  var char = _g2.char;
  var _62 = _g2[">"];
  var _ = _g2["-"];
  var is63 = _g2["is?"];
  var split = _g2.split;
  var search = _g2.search;
  var pair = _g2.pair;
  var map = _g2.map;
  var sort = _g2.sort;
  var table63 = _g2["table?"];
  var in63 = _g2["in?"];
  var last = _g2.last;
  var function63 = _g2["function?"];
  var keep = _g2.keep;
  var string_literal63 = _g2["string-literal?"];
  var _6261 = _g2[">="];
  var _g5 = nexus["lumen/reader"];
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read = _g5.read;
  var make_stream = _g5["make-stream"];
  var _g6 = nexus["lumen/compiler"];
  var in_module = _g6["in-module"];
  var import_modules = _g6["import-modules"];
  var compile_module = _g6["compile-module"];
  var load_module = _g6["load-module"];
  var eval = _g6.eval;
  var open_module = _g6["open-module"];
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var declare = _g6.declare;
  var rep = function (str) {
    var _g1108 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g1115) {
        return([false, _g1115.message]);
      }
    })();
    var _g1 = _g1108[0];
    var x = _g1108[1];
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
    var _g1114 = args;
    var i = 0;
    while (i < length(_g1114)) {
      var arg = _g1114[i];
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
