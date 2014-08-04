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
  var nil63 = _g182["nil?"];
  var is63 = _g182["is?"];
  var length = _g182.length;
  var none63 = _g182["none?"];
  var some63 = _g182["some?"];
  var one63 = _g182["one?"];
  var hd = _g182.hd;
  var string63 = _g182["string?"];
  var number63 = _g182["number?"];
  var boolean63 = _g182["boolean?"];
  var function63 = _g182["function?"];
  var composite63 = _g182["composite?"];
  var atom63 = _g182["atom?"];
  var table63 = _g182["table?"];
  var list63 = _g182["list?"];
  var substring = _g182.substring;
  var sub = _g182.sub;
  var keys = _g182.keys;
  var inner = _g182.inner;
  var tl = _g182.tl;
  var char = _g182.char;
  var code = _g182.code;
  var string_literal63 = _g182["string-literal?"];
  var id_literal63 = _g182["id-literal?"];
  var add = _g182.add;
  var drop = _g182.drop;
  var last = _g182.last;
  var reverse = _g182.reverse;
  var join = _g182.join;
  var reduce = _g182.reduce;
  var keep = _g182.keep;
  var in63 = _g182["in?"];
  var find = _g182.find;
  var pair = _g182.pair;
  var sort = _g182.sort;
  var iterate = _g182.iterate;
  var replicate = _g182.replicate;
  var series = _g182.series;
  var map = _g182.map;
  var keys63 = _g182["keys?"];
  var empty63 = _g182["empty?"];
  var stash = _g182.stash;
  var unstash = _g182.unstash;
  var search = _g182.search;
  var split = _g182.split;
  var cat = _g182.cat;
  var _43 = _g182["+"];
  var _ = _g182["-"];
  var _42 = _g182["*"];
  var _47 = _g182["/"];
  var _37 = _g182["%"];
  var _62 = _g182[">"];
  var _60 = _g182["<"];
  var _61 = _g182["="];
  var _6261 = _g182[">="];
  var _6061 = _g182["<="];
  var read_file = _g182["read-file"];
  var write_file = _g182["write-file"];
  var write = _g182.write;
  var exit = _g182.exit;
  var today = _g182.today;
  var now = _g182.now;
  var number = _g182.number;
  var string = _g182.string;
  var space = _g182.space;
  var apply = _g182.apply;
  var make_id = _g182["make-id"];
  var _37message_handler = _g182["%message-handler"];
  var toplevel63 = _g182["toplevel?"];
  var module_key = _g182["module-key"];
  var module = _g182.module;
  var setenv = _g182.setenv;
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
    _g276.import = quoted(m.import);
    _g276.alias = quoted(m.alias);
    _g276.export = quote_frame(m.export);
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
  var nil63 = _g295["nil?"];
  var is63 = _g295["is?"];
  var length = _g295.length;
  var none63 = _g295["none?"];
  var some63 = _g295["some?"];
  var one63 = _g295["one?"];
  var hd = _g295.hd;
  var string63 = _g295["string?"];
  var number63 = _g295["number?"];
  var boolean63 = _g295["boolean?"];
  var function63 = _g295["function?"];
  var composite63 = _g295["composite?"];
  var atom63 = _g295["atom?"];
  var table63 = _g295["table?"];
  var list63 = _g295["list?"];
  var substring = _g295.substring;
  var sub = _g295.sub;
  var keys = _g295.keys;
  var inner = _g295.inner;
  var tl = _g295.tl;
  var char = _g295.char;
  var code = _g295.code;
  var string_literal63 = _g295["string-literal?"];
  var id_literal63 = _g295["id-literal?"];
  var add = _g295.add;
  var drop = _g295.drop;
  var last = _g295.last;
  var reverse = _g295.reverse;
  var join = _g295.join;
  var reduce = _g295.reduce;
  var keep = _g295.keep;
  var in63 = _g295["in?"];
  var find = _g295.find;
  var pair = _g295.pair;
  var sort = _g295.sort;
  var iterate = _g295.iterate;
  var replicate = _g295.replicate;
  var series = _g295.series;
  var map = _g295.map;
  var keys63 = _g295["keys?"];
  var empty63 = _g295["empty?"];
  var stash = _g295.stash;
  var unstash = _g295.unstash;
  var search = _g295.search;
  var split = _g295.split;
  var cat = _g295.cat;
  var _43 = _g295["+"];
  var _ = _g295["-"];
  var _42 = _g295["*"];
  var _47 = _g295["/"];
  var _37 = _g295["%"];
  var _62 = _g295[">"];
  var _60 = _g295["<"];
  var _61 = _g295["="];
  var _6261 = _g295[">="];
  var _6061 = _g295["<="];
  var read_file = _g295["read-file"];
  var write_file = _g295["write-file"];
  var write = _g295.write;
  var exit = _g295.exit;
  var today = _g295.today;
  var now = _g295.now;
  var number = _g295.number;
  var string = _g295.string;
  var space = _g295.space;
  var apply = _g295.apply;
  var make_id = _g295["make-id"];
  var _37message_handler = _g295["%message-handler"];
  var toplevel63 = _g295["toplevel?"];
  var module_key = _g295["module-key"];
  var module = _g295.module;
  var setenv = _g295.setenv;
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
  var _g324 = nexus["lumen/runtime"];
  var nil63 = _g324["nil?"];
  var is63 = _g324["is?"];
  var length = _g324.length;
  var none63 = _g324["none?"];
  var some63 = _g324["some?"];
  var one63 = _g324["one?"];
  var hd = _g324.hd;
  var string63 = _g324["string?"];
  var number63 = _g324["number?"];
  var boolean63 = _g324["boolean?"];
  var function63 = _g324["function?"];
  var composite63 = _g324["composite?"];
  var atom63 = _g324["atom?"];
  var table63 = _g324["table?"];
  var list63 = _g324["list?"];
  var substring = _g324.substring;
  var sub = _g324.sub;
  var keys = _g324.keys;
  var inner = _g324.inner;
  var tl = _g324.tl;
  var char = _g324.char;
  var code = _g324.code;
  var string_literal63 = _g324["string-literal?"];
  var id_literal63 = _g324["id-literal?"];
  var add = _g324.add;
  var drop = _g324.drop;
  var last = _g324.last;
  var reverse = _g324.reverse;
  var join = _g324.join;
  var reduce = _g324.reduce;
  var keep = _g324.keep;
  var in63 = _g324["in?"];
  var find = _g324.find;
  var pair = _g324.pair;
  var sort = _g324.sort;
  var iterate = _g324.iterate;
  var replicate = _g324.replicate;
  var series = _g324.series;
  var map = _g324.map;
  var keys63 = _g324["keys?"];
  var empty63 = _g324["empty?"];
  var stash = _g324.stash;
  var unstash = _g324.unstash;
  var search = _g324.search;
  var split = _g324.split;
  var cat = _g324.cat;
  var _43 = _g324["+"];
  var _ = _g324["-"];
  var _42 = _g324["*"];
  var _47 = _g324["/"];
  var _37 = _g324["%"];
  var _62 = _g324[">"];
  var _60 = _g324["<"];
  var _61 = _g324["="];
  var _6261 = _g324[">="];
  var _6061 = _g324["<="];
  var read_file = _g324["read-file"];
  var write_file = _g324["write-file"];
  var write = _g324.write;
  var exit = _g324.exit;
  var today = _g324.today;
  var now = _g324.now;
  var number = _g324.number;
  var string = _g324.string;
  var space = _g324.space;
  var apply = _g324.apply;
  var make_id = _g324["make-id"];
  var _37message_handler = _g324["%message-handler"];
  var toplevel63 = _g324["toplevel?"];
  var module_key = _g324["module-key"];
  var module = _g324.module;
  var setenv = _g324.setenv;
  var _g327 = nexus["lumen/lib"];
  var getenv = _g327.getenv;
  var macro_function = _g327["macro-function"];
  var macro63 = _g327["macro?"];
  var special63 = _g327["special?"];
  var special_form63 = _g327["special-form?"];
  var statement63 = _g327["statement?"];
  var symbol_expansion = _g327["symbol-expansion"];
  var symbol63 = _g327["symbol?"];
  var variable63 = _g327["variable?"];
  var bound63 = _g327["bound?"];
  var quoted = _g327.quoted;
  var stash42 = _g327["stash*"];
  var index = _g327.index;
  var bind = _g327.bind;
  var bind42 = _g327["bind*"];
  var quasiexpand = _g327.quasiexpand;
  var macroexpand = _g327.macroexpand;
  var indentation = _g327.indentation;
  var reserved63 = _g327["reserved?"];
  var valid_id63 = _g327["valid-id?"];
  var id = _g327.id;
  var key = _g327.key;
  var imported = _g327.imported;
  var link = _g327.link;
  var mapo = _g327.mapo;
  var quote_environment = _g327["quote-environment"];
  var quote_modules = _g327["quote-modules"];
  var initial_environment = _g327["initial-environment"];
  var _g328 = nexus["lumen/reader"];
  var make_stream = _g328["make-stream"];
  var read_table = _g328["read-table"];
  var read = _g328.read;
  var read_all = _g328["read-all"];
  var read_from_string = _g328["read-from-string"];
  var _g332 = [];
  _g332.js = "!";
  _g332.lua = "not ";
  var _g330 = [];
  var _g333 = [];
  _g333.js = "!";
  _g333.lua = "not ";
  _g330["not"] = _g333;
  var _g335 = [];
  _g335["*"] = true;
  _g335["/"] = true;
  _g335["%"] = true;
  var _g337 = [];
  _g337["+"] = true;
  _g337["-"] = true;
  var _g341 = [];
  _g341.js = "+";
  _g341.lua = "..";
  var _g339 = [];
  var _g342 = [];
  _g342.js = "+";
  _g342.lua = "..";
  _g339.cat = _g342;
  var _g344 = [];
  _g344["<"] = true;
  _g344[">"] = true;
  _g344["<="] = true;
  _g344[">="] = true;
  var _g348 = [];
  _g348.js = "===";
  _g348.lua = "==";
  var _g350 = [];
  _g350.js = "!=";
  _g350.lua = "~=";
  var _g346 = [];
  var _g351 = [];
  _g351.js = "===";
  _g351.lua = "==";
  _g346["="] = _g351;
  var _g352 = [];
  _g352.js = "!=";
  _g352.lua = "~=";
  _g346["~="] = _g352;
  var _g356 = [];
  _g356.js = "&&";
  _g356.lua = "and";
  var _g354 = [];
  var _g357 = [];
  _g357.js = "&&";
  _g357.lua = "and";
  _g354["and"] = _g357;
  var _g361 = [];
  _g361.js = "||";
  _g361.lua = "or";
  var _g359 = [];
  var _g362 = [];
  _g362.js = "||";
  _g362.lua = "or";
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
        var _g441;
        if (isNaN(_g366)) {
          _g441 = k;
        } else {
          _g441 = _g366;
        }
        var _g367 = _g441;
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
    var stmt = _g376.stmt;
    var self_tr63 = _g376.tr;
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
    var _g442;
    if (right) {
      _g442 = _6261;
    } else {
      _g442 = _62;
    }
    if (_g442(precedence(child), precedence(parent))) {
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
    var _g443;
    if (name) {
      _g443 = compile(name);
    } else {
      _g443 = "";
    }
    var id = _g443;
    var _g388 = prefix || "";
    var _g389 = compile_args(args);
    indent_level = indent_level + 1;
    var _g391 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g390 = _g391;
    var ind = indentation();
    var _g444;
    if (target === "js") {
      _g444 = "";
    } else {
      _g444 = "end";
    }
    var tr = _g444;
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
        var _g445;
        if (stmt) {
          _g445 = indentation();
        } else {
          _g445 = "";
        }
        var ind = _g445;
        var _g446;
        if (atom63(form)) {
          _g446 = compile_atom(form);
        } else {
          var _g447;
          if (infix63(hd(form))) {
            _g447 = compile_infix(form);
          } else {
            _g447 = compile_call(form);
          }
          _g446 = _g447;
        }
        var _g394 = _g446;
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
      var _g448;
      if (isNaN(_g399)) {
        _g448 = k;
      } else {
        _g448 = _g399;
      }
      var _g400 = _g448;
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
      var _g450;
      if (_g403) {
        _g450 = [lower_body([_g403], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g402], tail63)], _g450)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g449;
      if (_g403) {
        _g449 = [lower(["set", e, _g403])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g402])], _g449));
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
      var _g451;
      if (x === "and") {
        _g451 = ["%if", id, b, id];
      } else {
        _g451 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g451], hoist));
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
      var _g452;
      if (isNaN(_g428)) {
        _g452 = k;
      } else {
        _g452 = _g428;
      }
      var _g429 = _g452;
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
    series(function (spec) {
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g434 = import_modules(m.alias);
        var aliased = _g434[0];
        var bs = _g434[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g435 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g435);
      }
    }, specs || []);
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
  var _g453 = nexus["lumen/runtime"];
  var nil63 = _g453["nil?"];
  var is63 = _g453["is?"];
  var length = _g453.length;
  var none63 = _g453["none?"];
  var some63 = _g453["some?"];
  var one63 = _g453["one?"];
  var hd = _g453.hd;
  var string63 = _g453["string?"];
  var number63 = _g453["number?"];
  var boolean63 = _g453["boolean?"];
  var function63 = _g453["function?"];
  var composite63 = _g453["composite?"];
  var atom63 = _g453["atom?"];
  var table63 = _g453["table?"];
  var list63 = _g453["list?"];
  var substring = _g453.substring;
  var sub = _g453.sub;
  var keys = _g453.keys;
  var inner = _g453.inner;
  var tl = _g453.tl;
  var char = _g453.char;
  var code = _g453.code;
  var string_literal63 = _g453["string-literal?"];
  var id_literal63 = _g453["id-literal?"];
  var add = _g453.add;
  var drop = _g453.drop;
  var last = _g453.last;
  var reverse = _g453.reverse;
  var join = _g453.join;
  var reduce = _g453.reduce;
  var keep = _g453.keep;
  var in63 = _g453["in?"];
  var find = _g453.find;
  var pair = _g453.pair;
  var sort = _g453.sort;
  var iterate = _g453.iterate;
  var replicate = _g453.replicate;
  var series = _g453.series;
  var map = _g453.map;
  var keys63 = _g453["keys?"];
  var empty63 = _g453["empty?"];
  var stash = _g453.stash;
  var unstash = _g453.unstash;
  var search = _g453.search;
  var split = _g453.split;
  var cat = _g453.cat;
  var _43 = _g453["+"];
  var _ = _g453["-"];
  var _42 = _g453["*"];
  var _47 = _g453["/"];
  var _37 = _g453["%"];
  var _62 = _g453[">"];
  var _60 = _g453["<"];
  var _61 = _g453["="];
  var _6261 = _g453[">="];
  var _6061 = _g453["<="];
  var read_file = _g453["read-file"];
  var write_file = _g453["write-file"];
  var write = _g453.write;
  var exit = _g453.exit;
  var today = _g453.today;
  var now = _g453.now;
  var number = _g453.number;
  var string = _g453.string;
  var space = _g453.space;
  var apply = _g453.apply;
  var make_id = _g453["make-id"];
  var _37message_handler = _g453["%message-handler"];
  var toplevel63 = _g453["toplevel?"];
  var module_key = _g453["module-key"];
  var module = _g453.module;
  var setenv = _g453.setenv;
  var _g456 = nexus["lumen/lib"];
  var getenv = _g456.getenv;
  var macro_function = _g456["macro-function"];
  var macro63 = _g456["macro?"];
  var special63 = _g456["special?"];
  var special_form63 = _g456["special-form?"];
  var statement63 = _g456["statement?"];
  var symbol_expansion = _g456["symbol-expansion"];
  var symbol63 = _g456["symbol?"];
  var variable63 = _g456["variable?"];
  var bound63 = _g456["bound?"];
  var quoted = _g456.quoted;
  var stash42 = _g456["stash*"];
  var index = _g456.index;
  var bind = _g456.bind;
  var bind42 = _g456["bind*"];
  var quasiexpand = _g456.quasiexpand;
  var macroexpand = _g456.macroexpand;
  var indentation = _g456.indentation;
  var reserved63 = _g456["reserved?"];
  var valid_id63 = _g456["valid-id?"];
  var id = _g456.id;
  var key = _g456.key;
  var imported = _g456.imported;
  var link = _g456.link;
  var mapo = _g456.mapo;
  var quote_environment = _g456["quote-environment"];
  var quote_modules = _g456["quote-modules"];
  var initial_environment = _g456["initial-environment"];
  var _g457 = nexus["lumen/compiler"];
  var compile_function = _g457["compile-function"];
  var compile = _g457.compile;
  var open_module = _g457["open-module"];
  var load_module = _g457["load-module"];
  var in_module = _g457["in-module"];
  var import_modules = _g457["import-modules"];
  var compile_module = _g457["compile-module"];
  var declare = _g457.declare;
  var eval = _g457.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g646 = nexus["lumen/runtime"];
  var nil63 = _g646["nil?"];
  var is63 = _g646["is?"];
  var length = _g646.length;
  var none63 = _g646["none?"];
  var some63 = _g646["some?"];
  var one63 = _g646["one?"];
  var hd = _g646.hd;
  var string63 = _g646["string?"];
  var number63 = _g646["number?"];
  var boolean63 = _g646["boolean?"];
  var function63 = _g646["function?"];
  var composite63 = _g646["composite?"];
  var atom63 = _g646["atom?"];
  var table63 = _g646["table?"];
  var list63 = _g646["list?"];
  var substring = _g646.substring;
  var sub = _g646.sub;
  var keys = _g646.keys;
  var inner = _g646.inner;
  var tl = _g646.tl;
  var char = _g646.char;
  var code = _g646.code;
  var string_literal63 = _g646["string-literal?"];
  var id_literal63 = _g646["id-literal?"];
  var add = _g646.add;
  var drop = _g646.drop;
  var last = _g646.last;
  var reverse = _g646.reverse;
  var join = _g646.join;
  var reduce = _g646.reduce;
  var keep = _g646.keep;
  var in63 = _g646["in?"];
  var find = _g646.find;
  var pair = _g646.pair;
  var sort = _g646.sort;
  var iterate = _g646.iterate;
  var replicate = _g646.replicate;
  var series = _g646.series;
  var map = _g646.map;
  var keys63 = _g646["keys?"];
  var empty63 = _g646["empty?"];
  var stash = _g646.stash;
  var unstash = _g646.unstash;
  var search = _g646.search;
  var split = _g646.split;
  var cat = _g646.cat;
  var _43 = _g646["+"];
  var _ = _g646["-"];
  var _42 = _g646["*"];
  var _47 = _g646["/"];
  var _37 = _g646["%"];
  var _62 = _g646[">"];
  var _60 = _g646["<"];
  var _61 = _g646["="];
  var _6261 = _g646[">="];
  var _6061 = _g646["<="];
  var read_file = _g646["read-file"];
  var write_file = _g646["write-file"];
  var write = _g646.write;
  var exit = _g646.exit;
  var today = _g646.today;
  var now = _g646.now;
  var number = _g646.number;
  var string = _g646.string;
  var space = _g646.space;
  var apply = _g646.apply;
  var make_id = _g646["make-id"];
  var _37message_handler = _g646["%message-handler"];
  var toplevel63 = _g646["toplevel?"];
  var module_key = _g646["module-key"];
  var module = _g646.module;
  var setenv = _g646.setenv;
  var _g649 = nexus["lumen/lib"];
  var getenv = _g649.getenv;
  var macro_function = _g649["macro-function"];
  var macro63 = _g649["macro?"];
  var special63 = _g649["special?"];
  var special_form63 = _g649["special-form?"];
  var statement63 = _g649["statement?"];
  var symbol_expansion = _g649["symbol-expansion"];
  var symbol63 = _g649["symbol?"];
  var variable63 = _g649["variable?"];
  var bound63 = _g649["bound?"];
  var quoted = _g649.quoted;
  var stash42 = _g649["stash*"];
  var index = _g649.index;
  var bind = _g649.bind;
  var bind42 = _g649["bind*"];
  var quasiexpand = _g649.quasiexpand;
  var macroexpand = _g649.macroexpand;
  var indentation = _g649.indentation;
  var reserved63 = _g649["reserved?"];
  var valid_id63 = _g649["valid-id?"];
  var id = _g649.id;
  var key = _g649.key;
  var imported = _g649.imported;
  var link = _g649.link;
  var mapo = _g649.mapo;
  var quote_environment = _g649["quote-environment"];
  var quote_modules = _g649["quote-modules"];
  var initial_environment = _g649["initial-environment"];
  var _g650 = nexus["lumen/compiler"];
  var compile_function = _g650["compile-function"];
  var compile = _g650.compile;
  var open_module = _g650["open-module"];
  var load_module = _g650["load-module"];
  var in_module = _g650["in-module"];
  var import_modules = _g650["import-modules"];
  var compile_module = _g650["compile-module"];
  var declare = _g650.declare;
  var eval = _g650.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g1524 = nexus["lumen/runtime"];
  var nil63 = _g1524["nil?"];
  var is63 = _g1524["is?"];
  var length = _g1524.length;
  var none63 = _g1524["none?"];
  var some63 = _g1524["some?"];
  var one63 = _g1524["one?"];
  var hd = _g1524.hd;
  var string63 = _g1524["string?"];
  var number63 = _g1524["number?"];
  var boolean63 = _g1524["boolean?"];
  var function63 = _g1524["function?"];
  var composite63 = _g1524["composite?"];
  var atom63 = _g1524["atom?"];
  var table63 = _g1524["table?"];
  var list63 = _g1524["list?"];
  var substring = _g1524.substring;
  var sub = _g1524.sub;
  var keys = _g1524.keys;
  var inner = _g1524.inner;
  var tl = _g1524.tl;
  var char = _g1524.char;
  var code = _g1524.code;
  var string_literal63 = _g1524["string-literal?"];
  var id_literal63 = _g1524["id-literal?"];
  var add = _g1524.add;
  var drop = _g1524.drop;
  var last = _g1524.last;
  var reverse = _g1524.reverse;
  var join = _g1524.join;
  var reduce = _g1524.reduce;
  var keep = _g1524.keep;
  var in63 = _g1524["in?"];
  var find = _g1524.find;
  var pair = _g1524.pair;
  var sort = _g1524.sort;
  var iterate = _g1524.iterate;
  var replicate = _g1524.replicate;
  var series = _g1524.series;
  var map = _g1524.map;
  var keys63 = _g1524["keys?"];
  var empty63 = _g1524["empty?"];
  var stash = _g1524.stash;
  var unstash = _g1524.unstash;
  var search = _g1524.search;
  var split = _g1524.split;
  var cat = _g1524.cat;
  var _43 = _g1524["+"];
  var _ = _g1524["-"];
  var _42 = _g1524["*"];
  var _47 = _g1524["/"];
  var _37 = _g1524["%"];
  var _62 = _g1524[">"];
  var _60 = _g1524["<"];
  var _61 = _g1524["="];
  var _6261 = _g1524[">="];
  var _6061 = _g1524["<="];
  var read_file = _g1524["read-file"];
  var write_file = _g1524["write-file"];
  var write = _g1524.write;
  var exit = _g1524.exit;
  var today = _g1524.today;
  var now = _g1524.now;
  var number = _g1524.number;
  var string = _g1524.string;
  var space = _g1524.space;
  var apply = _g1524.apply;
  var make_id = _g1524["make-id"];
  var _37message_handler = _g1524["%message-handler"];
  var toplevel63 = _g1524["toplevel?"];
  var module_key = _g1524["module-key"];
  var module = _g1524.module;
  var setenv = _g1524.setenv;
  var _g1527 = nexus["lumen/lib"];
  var getenv = _g1527.getenv;
  var macro_function = _g1527["macro-function"];
  var macro63 = _g1527["macro?"];
  var special63 = _g1527["special?"];
  var special_form63 = _g1527["special-form?"];
  var statement63 = _g1527["statement?"];
  var symbol_expansion = _g1527["symbol-expansion"];
  var symbol63 = _g1527["symbol?"];
  var variable63 = _g1527["variable?"];
  var bound63 = _g1527["bound?"];
  var quoted = _g1527.quoted;
  var stash42 = _g1527["stash*"];
  var index = _g1527.index;
  var bind = _g1527.bind;
  var bind42 = _g1527["bind*"];
  var quasiexpand = _g1527.quasiexpand;
  var macroexpand = _g1527.macroexpand;
  var indentation = _g1527.indentation;
  var reserved63 = _g1527["reserved?"];
  var valid_id63 = _g1527["valid-id?"];
  var id = _g1527.id;
  var key = _g1527.key;
  var imported = _g1527.imported;
  var link = _g1527.link;
  var mapo = _g1527.mapo;
  var quote_environment = _g1527["quote-environment"];
  var quote_modules = _g1527["quote-modules"];
  var initial_environment = _g1527["initial-environment"];
  var _g1528 = nexus["lumen/compiler"];
  var compile_function = _g1528["compile-function"];
  var compile = _g1528.compile;
  var open_module = _g1528["open-module"];
  var load_module = _g1528["load-module"];
  var in_module = _g1528["in-module"];
  var import_modules = _g1528["import-modules"];
  var compile_module = _g1528["compile-module"];
  var declare = _g1528.declare;
  var eval = _g1528.eval;
  global.modules = {"lumen/core": {export: {quote: {export: true, macro: function (form) {
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
    var l = [];
    var forms = [];
    var id = make_id();
    var _g1555 = body;
    var k = undefined;
    for (k in _g1555) {
      var v = _g1555[k];
      var _g1556 = parseInt(k);
      var _g1846;
      if (isNaN(_g1556)) {
        _g1846 = k;
      } else {
        _g1846 = _g1556;
      }
      var _g1557 = _g1846;
      if (number63(_g1557)) {
        l[_g1557] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _g1557]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1567) {
      var a = _g1567[0];
      var b = _g1567[1];
      var c = sub(_g1567, 2);
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
    var _g1571 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1571, 0);
    return(["if", cond, join(["do"], body)]);
  }}, unless: {export: true, macro: function (cond) {
    var _g1574 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1574, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var _g1580 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1580, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g1582 = bind(lh, rh);
      var _g1583 = 0;
      while (_g1583 < length(_g1582)) {
        var _g1584 = _g1582[_g1583];
        var id = _g1584[0];
        var val = _g1584[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g1583 = _g1583 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var _g1590 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1590, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1591 = import_modules(imp);
    var imports = _g1591[0];
    var bindings = _g1591[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1592 = exp || [];
    var _g1593 = 0;
    while (_g1593 < length(_g1592)) {
      var x = _g1592[_g1593];
      setenv(x, {_stash: true, export: true});
      _g1593 = _g1593 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _g1599 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1599, 0);
    var form = join(["fn", args], body);
    var _g1601 = ["setenv", ["quote", name]];
    _g1601.macro = form;
    _g1601.form = ["quote", form];
    eval(_g1601);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var _g1604 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1604, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g1606 = ["setenv", ["quote", name]];
    _g1606.special = form;
    _g1606.form = ["quote", form];
    eval(join(_g1606, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var _g1610 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1610, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _g1611 = bind42(x, body);
      var args = _g1611[0];
      var _g1612 = _g1611[1];
      return(join(["%global-function", name, args], _g1612));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var _g1618 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1618, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1621 = bind42(x, body);
        var args = _g1621[0];
        var _g1622 = _g1621[1];
        return(link(name, join(["%local-function", name, args], _g1622)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g1628) {
    var names = _g1628[0];
    var _g1627 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1627, 0);
    var x = make_id();
    var _g1632 = ["setenv", x];
    _g1632.variable = true;
    var _g1629 = ["with-frame", ["each", [x], names, _g1632]];
    _g1629.scope = true;
    return(join(_g1629, body));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _g1633 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1633, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1634 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1634);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _g1638 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1638, 0);
    add(environment, {});
    map(function (_g1641) {
      var name = _g1641[0];
      var exp = _g1641[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1639 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1639);
  }}, fn: {export: true, macro: function (args) {
    var _g1644 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1644, 0);
    var _g1645 = bind42(args, body);
    var _g1646 = _g1645[0];
    var _g1647 = _g1645[1];
    return(join(["%function", _g1646], _g1647));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g1660, t) {
    var k = _g1660[0];
    var v = _g1660[1];
    var _g1659 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1659, 0);
    var x = make_id();
    var n = make_id();
    var _g1847;
    if (target === "lua") {
      _g1847 = body;
    } else {
      _g1847 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g1847)]]);
  }}, each: {export: true, macro: function (b, t) {
    var _g1673 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1673, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g1848;
    if (nil63(v)) {
      var _g1849;
      if (b.i) {
        _g1849 = "i";
      } else {
        _g1849 = make_id();
      }
      var i = _g1849;
      _g1848 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], body), ["inc", i]]];
    } else {
      var _g1689 = ["target"];
      _g1689.js = ["isNaN", ["parseInt", k]];
      _g1689.lua = ["not", ["number?", k]];
      _g1848 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g1689, join(["let", [v, ["get", t1, k]]], body)]]];
    }
    return(["let", [t1, t], _g1848]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g1697 = xs;
    var _g1698 = 0;
    while (_g1698 < length(_g1697)) {
      var x = _g1697[_g1698];
      l[x] = true;
      _g1698 = _g1698 + 1;
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
    var _g1704 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1704, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, "cat!": {export: true, macro: function (a) {
    var _g1707 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1707, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var _g1717 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g1717, 0);
    var scope = _g1717.scope;
    var x = make_id();
    var _g1720 = ["table"];
    _g1720._scope = scope;
    return(["do", ["add", "environment", _g1720], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"do": {stmt: true, export: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    series(function (x) {
      str = str + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(str);
  }, foo: true}, "%if": {stmt: true, export: true, tr: true, special: function (cond, cons, alt) {
    var _g1737 = compile(cond);
    indent_level = indent_level + 1;
    var _g1739 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g1738 = _g1739;
    var _g1850;
    if (alt) {
      indent_level = indent_level + 1;
      var _g1741 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g1850 = _g1741;
    }
    var _g1740 = _g1850;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g1737 + ") {\n" + _g1738 + ind + "}";
    } else {
      str = str + ind + "if " + _g1737 + " then\n" + _g1738;
    }
    if (_g1740 && target === "js") {
      str = str + " else {\n" + _g1740 + ind + "}";
    } else {
      if (_g1740) {
        str = str + ind + "else\n" + _g1740;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true}, "while": {stmt: true, export: true, tr: true, special: function (cond, form) {
    var _g1743 = compile(cond);
    indent_level = indent_level + 1;
    var _g1744 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1744;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g1743 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g1743 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {stmt: true, export: true, tr: true, special: function (t, k, form) {
    var _g1746 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g1747 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1747;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g1746 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g1746 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {stmt: true, export: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g1749 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1749;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g1753 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g1753;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true}, "break": {export: true, foo: true, special: function () {
    return(indentation() + "break");
  }, stmt: true}, "%function": {export: true, foo: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "%global-function": {stmt: true, export: true, tr: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true}, "%local-function": {stmt: true, export: true, tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true}, "return": {export: true, foo: true, special: function (x) {
    var _g1851;
    if (nil63(x)) {
      _g1851 = "return";
    } else {
      _g1851 = "return(" + compile(x) + ")";
    }
    var _g1761 = _g1851;
    return(indentation() + _g1761);
  }, stmt: true}, error: {export: true, foo: true, special: function (x) {
    var _g1852;
    if (target === "js") {
      _g1852 = "throw new " + compile(["Error", x]);
    } else {
      _g1852 = "error(" + compile(x) + ")";
    }
    var e = _g1852;
    return(indentation() + e);
  }, stmt: true}, "%local": {export: true, foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g1853;
    if (is63(value)) {
      _g1853 = " = " + value1;
    } else {
      _g1853 = "";
    }
    var rh = _g1853;
    var _g1854;
    if (target === "js") {
      _g1854 = "var ";
    } else {
      _g1854 = "local ";
    }
    var keyword = _g1854;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, set: {export: true, foo: true, special: function (lh, rh) {
    var _g1766 = compile(lh);
    var _g1855;
    if (nil63(rh)) {
      _g1855 = "nil";
    } else {
      _g1855 = rh;
    }
    var _g1767 = compile(_g1855);
    return(indentation() + _g1766 + " = " + _g1767);
  }, stmt: true}, get: {export: true, foo: true, special: function (t, k) {
    var _g1769 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g1769, 0) === "{") {
      _g1769 = "(" + _g1769 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g1769 + "." + inner(k));
    } else {
      return(_g1769 + "[" + k1 + "]");
    }
  }}, "not": {}, "%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g1856;
    if (target === "lua") {
      _g1856 = "{";
    } else {
      _g1856 = "[";
    }
    var open = _g1856;
    var _g1857;
    if (target === "lua") {
      _g1857 = "}";
    } else {
      _g1857 = "]";
    }
    var close = _g1857;
    var str = "";
    var comma = "";
    var _g1770 = forms;
    var k = undefined;
    for (k in _g1770) {
      var v = _g1770[k];
      var _g1771 = parseInt(k);
      var _g1858;
      if (isNaN(_g1771)) {
        _g1858 = k;
      } else {
        _g1858 = _g1771;
      }
      var _g1772 = _g1858;
      if (number63(_g1772)) {
        str = str + comma + compile(v);
        comma = ", ";
      }
    }
    return(open + str + close);
  }}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g1859;
    if (target === "lua") {
      _g1859 = " = ";
    } else {
      _g1859 = ": ";
    }
    var sep = _g1859;
    var comma = "";
    var _g1773 = pair(forms);
    var k = undefined;
    for (k in _g1773) {
      var v = _g1773[k];
      var _g1774 = parseInt(k);
      var _g1860;
      if (isNaN(_g1774)) {
        _g1860 = k;
      } else {
        _g1860 = _g1774;
      }
      var _g1775 = _g1860;
      if (number63(_g1775)) {
        var _g1776 = v[0];
        var _g1777 = v[1];
        if (!string63(_g1776)) {
          throw new Error("Illegal key: " + string(_g1776));
        }
        str = str + comma + key(_g1776) + sep + compile(_g1777);
        comma = ", ";
      }
    }
    return(str + "}");
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {global: true, export: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/lib": {export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {export: true, global: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/runtime": {export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {export: true, global: true}, fs: {variable: true}, print: {export: true, global: true}, "id-count": {variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, lumen: {export: {}, import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {export: true, global: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, "lumen/reader": {export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g1821) {
    var char = _g1821[0];
    var stream = _g1821[1];
    var _g1820 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1820, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _g1837 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1837, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1838 = import_modules(imp);
    var imports = _g1838[0];
    var bindings = _g1838[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1839 = exp || [];
    var _g1840 = 0;
    while (_g1840 < length(_g1839)) {
      var x = _g1839[_g1840];
      setenv(x, {_stash: true, export: true});
      _g1840 = _g1840 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g1861 = nexus["lumen/runtime"];
  var nil63 = _g1861["nil?"];
  var is63 = _g1861["is?"];
  var length = _g1861.length;
  var none63 = _g1861["none?"];
  var some63 = _g1861["some?"];
  var one63 = _g1861["one?"];
  var hd = _g1861.hd;
  var string63 = _g1861["string?"];
  var number63 = _g1861["number?"];
  var boolean63 = _g1861["boolean?"];
  var function63 = _g1861["function?"];
  var composite63 = _g1861["composite?"];
  var atom63 = _g1861["atom?"];
  var table63 = _g1861["table?"];
  var list63 = _g1861["list?"];
  var substring = _g1861.substring;
  var sub = _g1861.sub;
  var keys = _g1861.keys;
  var inner = _g1861.inner;
  var tl = _g1861.tl;
  var char = _g1861.char;
  var code = _g1861.code;
  var string_literal63 = _g1861["string-literal?"];
  var id_literal63 = _g1861["id-literal?"];
  var add = _g1861.add;
  var drop = _g1861.drop;
  var last = _g1861.last;
  var reverse = _g1861.reverse;
  var join = _g1861.join;
  var reduce = _g1861.reduce;
  var keep = _g1861.keep;
  var in63 = _g1861["in?"];
  var find = _g1861.find;
  var pair = _g1861.pair;
  var sort = _g1861.sort;
  var iterate = _g1861.iterate;
  var replicate = _g1861.replicate;
  var series = _g1861.series;
  var map = _g1861.map;
  var keys63 = _g1861["keys?"];
  var empty63 = _g1861["empty?"];
  var stash = _g1861.stash;
  var unstash = _g1861.unstash;
  var search = _g1861.search;
  var split = _g1861.split;
  var cat = _g1861.cat;
  var _43 = _g1861["+"];
  var _ = _g1861["-"];
  var _42 = _g1861["*"];
  var _47 = _g1861["/"];
  var _37 = _g1861["%"];
  var _62 = _g1861[">"];
  var _60 = _g1861["<"];
  var _61 = _g1861["="];
  var _6261 = _g1861[">="];
  var _6061 = _g1861["<="];
  var read_file = _g1861["read-file"];
  var write_file = _g1861["write-file"];
  var write = _g1861.write;
  var exit = _g1861.exit;
  var today = _g1861.today;
  var now = _g1861.now;
  var number = _g1861.number;
  var string = _g1861.string;
  var space = _g1861.space;
  var apply = _g1861.apply;
  var make_id = _g1861["make-id"];
  var _37message_handler = _g1861["%message-handler"];
  var toplevel63 = _g1861["toplevel?"];
  var module_key = _g1861["module-key"];
  var module = _g1861.module;
  var setenv = _g1861.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var _61 = _g2["="];
  var _60 = _g2["<"];
  var _62 = _g2[">"];
  var read_file = _g2["read-file"];
  var module = _g2.module;
  var reverse = _g2.reverse;
  var apply = _g2.apply;
  var _ = _g2["-"];
  var _47 = _g2["/"];
  var sort = _g2.sort;
  var in63 = _g2["in?"];
  var make_id = _g2["make-id"];
  var replicate = _g2.replicate;
  var iterate = _g2.iterate;
  var inner = _g2.inner;
  var char = _g2.char;
  var sub = _g2.sub;
  var number63 = _g2["number?"];
  var space = _g2.space;
  var series = _g2.series;
  var length = _g2.length;
  var join = _g2.join;
  var list63 = _g2["list?"];
  var unstash = _g2.unstash;
  var hd = _g2.hd;
  var composite63 = _g2["composite?"];
  var code = _g2.code;
  var substring = _g2.substring;
  var string63 = _g2["string?"];
  var keep = _g2.keep;
  var function63 = _g2["function?"];
  var find = _g2.find;
  var table63 = _g2["table?"];
  var last = _g2.last;
  var one63 = _g2["one?"];
  var keys63 = _g2["keys?"];
  var pair = _g2.pair;
  var now = _g2.now;
  var string = _g2.string;
  var search = _g2.search;
  var atom63 = _g2["atom?"];
  var setenv = _g2.setenv;
  var tl = _g2.tl;
  var module_key = _g2["module-key"];
  var toplevel63 = _g2["toplevel?"];
  var _37message_handler = _g2["%message-handler"];
  var stash = _g2.stash;
  var drop = _g2.drop;
  var _37 = _g2["%"];
  var number = _g2.number;
  var is63 = _g2["is?"];
  var none63 = _g2["none?"];
  var _6261 = _g2[">="];
  var nil63 = _g2["nil?"];
  var _43 = _g2["+"];
  var _42 = _g2["*"];
  var reduce = _g2.reduce;
  var some63 = _g2["some?"];
  var boolean63 = _g2["boolean?"];
  var exit = _g2.exit;
  var write = _g2.write;
  var write_file = _g2["write-file"];
  var cat = _g2.cat;
  var _6061 = _g2["<="];
  var map = _g2.map;
  var split = _g2.split;
  var add = _g2.add;
  var string_literal63 = _g2["string-literal?"];
  var empty63 = _g2["empty?"];
  var id_literal63 = _g2["id-literal?"];
  var keys = _g2.keys;
  var today = _g2.today;
  var _g5 = nexus["lumen/reader"];
  var read = _g5.read;
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var make_stream = _g5["make-stream"];
  var _g6 = nexus["lumen/compiler"];
  var in_module = _g6["in-module"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var import_modules = _g6["import-modules"];
  var eval = _g6.eval;
  var compile_function = _g6["compile-function"];
  var declare = _g6.declare;
  var load_module = _g6["load-module"];
  var compile_module = _g6["compile-module"];
  var rep = function (str) {
    var _g1865 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g1872) {
        return([false, _g1872.message]);
      }
    })();
    var _g1 = _g1865[0];
    var x = _g1865[1];
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
    var n = length(args);
    var i = 0;
    while (i < n) {
      var arg = args[i];
      if (arg === "-o" || arg === "-t" || arg === "-e") {
        if (i === n - 1) {
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
