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
      var _g272;
      if (c === "\n") {
        _g272 = "\\n";
      } else {
        var _g273;
        if (c === "\"") {
          _g273 = "\\\"";
        } else {
          var _g274;
          if (c === "\\") {
            _g274 = "\\\\";
          } else {
            _g274 = c;
          }
          _g273 = _g274;
        }
        _g272 = _g273;
      }
      var c1 = _g272;
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
        var _g275;
        if (isNaN(_g203)) {
          _g275 = k;
        } else {
          _g275 = _g203;
        }
        var _g204 = _g275;
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
  var bind = function (lh, rh) {
    if (composite63(lh) && list63(rh)) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var _g206 = lh;
        var k = undefined;
        for (k in _g206) {
          var v = _g206[k];
          var _g207 = parseInt(k);
          var _g276;
          if (isNaN(_g207)) {
            _g276 = k;
          } else {
            _g276 = _g207;
          }
          var _g208 = _g276;
          var _g277;
          if (_g208 === "&") {
            _g277 = ["sub", rh, length(lh)];
          } else {
            _g277 = ["get", rh, ["quote", _g208]];
          }
          var x = _g277;
          var _g278;
          if (v === true) {
            _g278 = _g208;
          } else {
            _g278 = v;
          }
          var _g209 = _g278;
          bs = join(bs, bind(_g209, x));
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
      var _g212 = args;
      var k = undefined;
      for (k in _g212) {
        var v = _g212[k];
        var _g213 = parseInt(k);
        var _g279;
        if (isNaN(_g213)) {
          _g279 = k;
        } else {
          _g279 = _g213;
        }
        var _g214 = _g279;
        if (number63(_g214)) {
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
            var _g222 = args;
            var _g223 = 0;
            while (_g223 < length(_g222)) {
              var _g220 = _g222[_g223];
              setenv(_g220, {_stash: true, variable: true});
              _g223 = _g223 + 1;
            }
            var _g221 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g221);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g181 = form[0];
              var _g224 = form[1];
              var _g225 = form[2];
              var _g226 = sub(form, 3);
              add(environment, {_scope: true});
              var _g229 = _g225;
              var _g230 = 0;
              while (_g230 < length(_g229)) {
                var _g227 = _g229[_g230];
                setenv(_g227, {_stash: true, variable: true});
                _g230 = _g230 + 1;
              }
              var _g228 = join([x, _g224, _g225], macroexpand(_g226));
              drop(environment);
              return(_g228);
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
    var _g232 = form;
    var k = undefined;
    for (k in _g232) {
      if (isNaN(parseInt(k))) {
        var v = _g232[k];
        var _g280;
        if (quasisplice63(v, depth)) {
          _g280 = quasiexpand(v[1]);
        } else {
          _g280 = quasiexpand(v, depth);
        }
        var _g233 = _g280;
        last(xs)[k] = _g233;
      }
    }
    var _g234 = form;
    var _g235 = 0;
    while (_g235 < length(_g234)) {
      var x = _g234[_g235];
      if (quasisplice63(x, depth)) {
        var _g236 = quasiexpand(x[1]);
        add(xs, _g236);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g235 = _g235 + 1;
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
      var _g281;
      if (c === "-") {
        _g281 = "_";
      } else {
        var _g282;
        if (valid_code63(n)) {
          _g282 = c;
        } else {
          var _g283;
          if (i === 0) {
            _g283 = "_" + n;
          } else {
            _g283 = n;
          }
          _g282 = _g283;
        }
        _g281 = _g282;
      }
      var c1 = _g281;
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
    var _g253 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g254 = _g253.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g255 = module(spec).export;
      var n = undefined;
      for (n in _g255) {
        if (isNaN(parseInt(n))) {
          var b = _g255[n];
          if (b.variable && (_g254 || b.export)) {
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
    var _g257 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_g257, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _g258 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g258, 0);
    var t1 = [];
    var _g259 = t;
    var _g260 = 0;
    while (_g260 < length(_g259)) {
      var x = _g259[_g260];
      add(t1, x);
      _g260 = _g260 + 1;
    }
    var _g261 = t;
    var k = undefined;
    for (k in _g261) {
      if (isNaN(parseInt(k))) {
        var v = _g261[k];
        if (!keys[k]) {
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
    var _g264 = t;
    var k = undefined;
    for (k in _g264) {
      if (isNaN(parseInt(k))) {
        var v = _g264[k];
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
    var _g269 = ["table"];
    _g269.import = quoted(m.import);
    _g269.alias = quoted(m.alias);
    _g269.export = quote_frame(m.export);
    return(_g269);
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
  var _g284 = nexus["lumen/runtime"];
  var nil63 = _g284["nil?"];
  var is63 = _g284["is?"];
  var length = _g284.length;
  var none63 = _g284["none?"];
  var some63 = _g284["some?"];
  var one63 = _g284["one?"];
  var hd = _g284.hd;
  var string63 = _g284["string?"];
  var number63 = _g284["number?"];
  var boolean63 = _g284["boolean?"];
  var function63 = _g284["function?"];
  var composite63 = _g284["composite?"];
  var atom63 = _g284["atom?"];
  var table63 = _g284["table?"];
  var list63 = _g284["list?"];
  var substring = _g284.substring;
  var sub = _g284.sub;
  var keys = _g284.keys;
  var inner = _g284.inner;
  var tl = _g284.tl;
  var char = _g284.char;
  var code = _g284.code;
  var string_literal63 = _g284["string-literal?"];
  var id_literal63 = _g284["id-literal?"];
  var add = _g284.add;
  var drop = _g284.drop;
  var last = _g284.last;
  var reverse = _g284.reverse;
  var join = _g284.join;
  var reduce = _g284.reduce;
  var keep = _g284.keep;
  var in63 = _g284["in?"];
  var find = _g284.find;
  var pair = _g284.pair;
  var sort = _g284.sort;
  var iterate = _g284.iterate;
  var replicate = _g284.replicate;
  var series = _g284.series;
  var map = _g284.map;
  var keys63 = _g284["keys?"];
  var empty63 = _g284["empty?"];
  var stash = _g284.stash;
  var unstash = _g284.unstash;
  var search = _g284.search;
  var split = _g284.split;
  var cat = _g284.cat;
  var _43 = _g284["+"];
  var _ = _g284["-"];
  var _42 = _g284["*"];
  var _47 = _g284["/"];
  var _37 = _g284["%"];
  var _62 = _g284[">"];
  var _60 = _g284["<"];
  var _61 = _g284["="];
  var _6261 = _g284[">="];
  var _6061 = _g284["<="];
  var read_file = _g284["read-file"];
  var write_file = _g284["write-file"];
  var write = _g284.write;
  var exit = _g284.exit;
  var today = _g284.today;
  var now = _g284.now;
  var number = _g284.number;
  var string = _g284.string;
  var space = _g284.space;
  var apply = _g284.apply;
  var make_id = _g284["make-id"];
  var _37message_handler = _g284["%message-handler"];
  var toplevel63 = _g284["toplevel?"];
  var module_key = _g284["module-key"];
  var module = _g284.module;
  var setenv = _g284.setenv;
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
  var _g313 = nexus["lumen/runtime"];
  var nil63 = _g313["nil?"];
  var is63 = _g313["is?"];
  var length = _g313.length;
  var none63 = _g313["none?"];
  var some63 = _g313["some?"];
  var one63 = _g313["one?"];
  var hd = _g313.hd;
  var string63 = _g313["string?"];
  var number63 = _g313["number?"];
  var boolean63 = _g313["boolean?"];
  var function63 = _g313["function?"];
  var composite63 = _g313["composite?"];
  var atom63 = _g313["atom?"];
  var table63 = _g313["table?"];
  var list63 = _g313["list?"];
  var substring = _g313.substring;
  var sub = _g313.sub;
  var keys = _g313.keys;
  var inner = _g313.inner;
  var tl = _g313.tl;
  var char = _g313.char;
  var code = _g313.code;
  var string_literal63 = _g313["string-literal?"];
  var id_literal63 = _g313["id-literal?"];
  var add = _g313.add;
  var drop = _g313.drop;
  var last = _g313.last;
  var reverse = _g313.reverse;
  var join = _g313.join;
  var reduce = _g313.reduce;
  var keep = _g313.keep;
  var in63 = _g313["in?"];
  var find = _g313.find;
  var pair = _g313.pair;
  var sort = _g313.sort;
  var iterate = _g313.iterate;
  var replicate = _g313.replicate;
  var series = _g313.series;
  var map = _g313.map;
  var keys63 = _g313["keys?"];
  var empty63 = _g313["empty?"];
  var stash = _g313.stash;
  var unstash = _g313.unstash;
  var search = _g313.search;
  var split = _g313.split;
  var cat = _g313.cat;
  var _43 = _g313["+"];
  var _ = _g313["-"];
  var _42 = _g313["*"];
  var _47 = _g313["/"];
  var _37 = _g313["%"];
  var _62 = _g313[">"];
  var _60 = _g313["<"];
  var _61 = _g313["="];
  var _6261 = _g313[">="];
  var _6061 = _g313["<="];
  var read_file = _g313["read-file"];
  var write_file = _g313["write-file"];
  var write = _g313.write;
  var exit = _g313.exit;
  var today = _g313.today;
  var now = _g313.now;
  var number = _g313.number;
  var string = _g313.string;
  var space = _g313.space;
  var apply = _g313.apply;
  var make_id = _g313["make-id"];
  var _37message_handler = _g313["%message-handler"];
  var toplevel63 = _g313["toplevel?"];
  var module_key = _g313["module-key"];
  var module = _g313.module;
  var setenv = _g313.setenv;
  var _g316 = nexus["lumen/lib"];
  var getenv = _g316.getenv;
  var macro_function = _g316["macro-function"];
  var macro63 = _g316["macro?"];
  var special63 = _g316["special?"];
  var special_form63 = _g316["special-form?"];
  var statement63 = _g316["statement?"];
  var symbol_expansion = _g316["symbol-expansion"];
  var symbol63 = _g316["symbol?"];
  var variable63 = _g316["variable?"];
  var bound63 = _g316["bound?"];
  var quoted = _g316.quoted;
  var stash42 = _g316["stash*"];
  var bind = _g316.bind;
  var bind42 = _g316["bind*"];
  var quasiexpand = _g316.quasiexpand;
  var macroexpand = _g316.macroexpand;
  var indentation = _g316.indentation;
  var reserved63 = _g316["reserved?"];
  var valid_id63 = _g316["valid-id?"];
  var id = _g316.id;
  var key = _g316.key;
  var imported = _g316.imported;
  var link = _g316.link;
  var mapo = _g316.mapo;
  var quote_environment = _g316["quote-environment"];
  var quote_modules = _g316["quote-modules"];
  var initial_environment = _g316["initial-environment"];
  var _g317 = nexus["lumen/reader"];
  var make_stream = _g317["make-stream"];
  var read_table = _g317["read-table"];
  var read = _g317.read;
  var read_all = _g317["read-all"];
  var read_from_string = _g317["read-from-string"];
  var _g321 = [];
  _g321.js = "!";
  _g321.lua = "not ";
  var _g319 = [];
  var _g322 = [];
  _g322.js = "!";
  _g322.lua = "not ";
  _g319["not"] = _g322;
  var _g324 = [];
  _g324["*"] = true;
  _g324["/"] = true;
  _g324["%"] = true;
  var _g326 = [];
  _g326["+"] = true;
  _g326["-"] = true;
  var _g330 = [];
  _g330.js = "+";
  _g330.lua = "..";
  var _g328 = [];
  var _g331 = [];
  _g331.js = "+";
  _g331.lua = "..";
  _g328.cat = _g331;
  var _g333 = [];
  _g333["<"] = true;
  _g333[">"] = true;
  _g333["<="] = true;
  _g333[">="] = true;
  var _g337 = [];
  _g337.js = "===";
  _g337.lua = "==";
  var _g339 = [];
  _g339.js = "!=";
  _g339.lua = "~=";
  var _g335 = [];
  var _g340 = [];
  _g340.js = "===";
  _g340.lua = "==";
  _g335["="] = _g340;
  var _g341 = [];
  _g341.js = "!=";
  _g341.lua = "~=";
  _g335["~="] = _g341;
  var _g345 = [];
  _g345.js = "&&";
  _g345.lua = "and";
  var _g343 = [];
  var _g346 = [];
  _g346.js = "&&";
  _g346.lua = "and";
  _g343["and"] = _g346;
  var _g350 = [];
  _g350.js = "||";
  _g350.lua = "or";
  var _g348 = [];
  var _g351 = [];
  _g351.js = "||";
  _g351.lua = "or";
  _g348["or"] = _g351;
  var infix = [_g319, _g324, _g326, _g328, _g333, _g335, _g343, _g348];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g354 = infix;
      var i = 0;
      while (i < length(_g354)) {
        var level = _g354[i];
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
    var _g359 = args;
    var i = 0;
    while (i < length(_g359)) {
      var arg = _g359[i];
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
    var _g363 = getenv(x);
    var special = _g363.special;
    var stmt = _g363.stmt;
    var self_tr63 = _g363.tr;
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
    var _g366 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g366.right;
    var _g428;
    if (right) {
      _g428 = _6261;
    } else {
      _g428 = _62;
    }
    if (_g428(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g368 = sub(form, 1);
    var a = _g368[0];
    var b = _g368[1];
    var _g369 = op_delims(form, a);
    var ao = _g369[0];
    var ac = _g369[1];
    var _g370 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g370[0];
    var bc = _g370[1];
    var _g371 = compile(a);
    var _g372 = compile(b);
    var _g373 = getop(op);
    if (unary63(form)) {
      return(_g373 + ao + _g371 + ac);
    } else {
      return(ao + _g371 + ac + " " + _g373 + " " + bo + _g372 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g374 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g374.name;
    var prefix = _g374.prefix;
    var _g429;
    if (name) {
      _g429 = compile(name);
    } else {
      _g429 = "";
    }
    var id = _g429;
    var _g375 = prefix || "";
    var _g376 = compile_args(args);
    indent_level = indent_level + 1;
    var _g378 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g377 = _g378;
    var ind = indentation();
    var _g430;
    if (target === "js") {
      _g430 = "";
    } else {
      _g430 = "end";
    }
    var tr = _g430;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g376 + " {\n" + _g377 + ind + "}" + tr);
    } else {
      return(_g375 + "function " + id + _g376 + "\n" + _g377 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g380 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g380.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g431;
        if (stmt) {
          _g431 = indentation();
        } else {
          _g431 = "";
        }
        var ind = _g431;
        var _g432;
        if (atom63(form)) {
          _g432 = compile_atom(form);
        } else {
          var _g433;
          if (infix63(hd(form))) {
            _g433 = compile_infix(form);
          } else {
            _g433 = compile_call(form);
          }
          _g432 = _g433;
        }
        var _g381 = _g432;
        return(ind + _g381 + tr);
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
    var _g385 = sub(args, 0, length(args) - 1);
    var _g386 = 0;
    while (_g386 < length(_g385)) {
      var x = _g385[_g386];
      add(hoist, lower(x, hoist, stmt63));
      _g386 = _g386 + 1;
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
    var _g388 = args[1];
    var _g389 = args[2];
    if (stmt63 || tail63) {
      var _g435;
      if (_g389) {
        _g435 = [lower_body([_g389], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g388], tail63)], _g435)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g434;
      if (_g389) {
        _g434 = [lower(["set", e, _g389])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g388])], _g434));
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
      var _g436;
      if (x === "and") {
        _g436 = ["%if", id, b, id];
      } else {
        _g436 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g436], hoist));
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
    var _g396 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g396, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g398 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g398)) {
      return(_g398);
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
    var _g412 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g413 = _g412.all;
    var m = module(spec);
    var frame = last(environment);
    var _g414 = m.export;
    var k = undefined;
    for (k in _g414) {
      if (isNaN(parseInt(k))) {
        var v = _g414[k];
        if (v.export || _g413) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g415 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g416 = _g415.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g416}));
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
    var _g419 = specs || [];
    var _g420 = 0;
    while (_g420 < length(_g419)) {
      var spec = _g419[_g420];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g421 = import_modules(m.alias);
        var aliased = _g421[0];
        var bs = _g421[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g422 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g422);
      }
      _g420 = _g420 + 1;
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
  var _g437 = nexus["lumen/runtime"];
  var nil63 = _g437["nil?"];
  var is63 = _g437["is?"];
  var length = _g437.length;
  var none63 = _g437["none?"];
  var some63 = _g437["some?"];
  var one63 = _g437["one?"];
  var hd = _g437.hd;
  var string63 = _g437["string?"];
  var number63 = _g437["number?"];
  var boolean63 = _g437["boolean?"];
  var function63 = _g437["function?"];
  var composite63 = _g437["composite?"];
  var atom63 = _g437["atom?"];
  var table63 = _g437["table?"];
  var list63 = _g437["list?"];
  var substring = _g437.substring;
  var sub = _g437.sub;
  var keys = _g437.keys;
  var inner = _g437.inner;
  var tl = _g437.tl;
  var char = _g437.char;
  var code = _g437.code;
  var string_literal63 = _g437["string-literal?"];
  var id_literal63 = _g437["id-literal?"];
  var add = _g437.add;
  var drop = _g437.drop;
  var last = _g437.last;
  var reverse = _g437.reverse;
  var join = _g437.join;
  var reduce = _g437.reduce;
  var keep = _g437.keep;
  var in63 = _g437["in?"];
  var find = _g437.find;
  var pair = _g437.pair;
  var sort = _g437.sort;
  var iterate = _g437.iterate;
  var replicate = _g437.replicate;
  var series = _g437.series;
  var map = _g437.map;
  var keys63 = _g437["keys?"];
  var empty63 = _g437["empty?"];
  var stash = _g437.stash;
  var unstash = _g437.unstash;
  var search = _g437.search;
  var split = _g437.split;
  var cat = _g437.cat;
  var _43 = _g437["+"];
  var _ = _g437["-"];
  var _42 = _g437["*"];
  var _47 = _g437["/"];
  var _37 = _g437["%"];
  var _62 = _g437[">"];
  var _60 = _g437["<"];
  var _61 = _g437["="];
  var _6261 = _g437[">="];
  var _6061 = _g437["<="];
  var read_file = _g437["read-file"];
  var write_file = _g437["write-file"];
  var write = _g437.write;
  var exit = _g437.exit;
  var today = _g437.today;
  var now = _g437.now;
  var number = _g437.number;
  var string = _g437.string;
  var space = _g437.space;
  var apply = _g437.apply;
  var make_id = _g437["make-id"];
  var _37message_handler = _g437["%message-handler"];
  var toplevel63 = _g437["toplevel?"];
  var module_key = _g437["module-key"];
  var module = _g437.module;
  var setenv = _g437.setenv;
  var _g440 = nexus["lumen/lib"];
  var getenv = _g440.getenv;
  var macro_function = _g440["macro-function"];
  var macro63 = _g440["macro?"];
  var special63 = _g440["special?"];
  var special_form63 = _g440["special-form?"];
  var statement63 = _g440["statement?"];
  var symbol_expansion = _g440["symbol-expansion"];
  var symbol63 = _g440["symbol?"];
  var variable63 = _g440["variable?"];
  var bound63 = _g440["bound?"];
  var quoted = _g440.quoted;
  var stash42 = _g440["stash*"];
  var bind = _g440.bind;
  var bind42 = _g440["bind*"];
  var quasiexpand = _g440.quasiexpand;
  var macroexpand = _g440.macroexpand;
  var indentation = _g440.indentation;
  var reserved63 = _g440["reserved?"];
  var valid_id63 = _g440["valid-id?"];
  var id = _g440.id;
  var key = _g440.key;
  var imported = _g440.imported;
  var link = _g440.link;
  var mapo = _g440.mapo;
  var quote_environment = _g440["quote-environment"];
  var quote_modules = _g440["quote-modules"];
  var initial_environment = _g440["initial-environment"];
  var _g441 = nexus["lumen/compiler"];
  var compile_function = _g441["compile-function"];
  var compile = _g441.compile;
  var open_module = _g441["open-module"];
  var load_module = _g441["load-module"];
  var in_module = _g441["in-module"];
  var import_modules = _g441["import-modules"];
  var compile_module = _g441["compile-module"];
  var declare = _g441.declare;
  var eval = _g441.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g628 = nexus["lumen/runtime"];
  var nil63 = _g628["nil?"];
  var is63 = _g628["is?"];
  var length = _g628.length;
  var none63 = _g628["none?"];
  var some63 = _g628["some?"];
  var one63 = _g628["one?"];
  var hd = _g628.hd;
  var string63 = _g628["string?"];
  var number63 = _g628["number?"];
  var boolean63 = _g628["boolean?"];
  var function63 = _g628["function?"];
  var composite63 = _g628["composite?"];
  var atom63 = _g628["atom?"];
  var table63 = _g628["table?"];
  var list63 = _g628["list?"];
  var substring = _g628.substring;
  var sub = _g628.sub;
  var keys = _g628.keys;
  var inner = _g628.inner;
  var tl = _g628.tl;
  var char = _g628.char;
  var code = _g628.code;
  var string_literal63 = _g628["string-literal?"];
  var id_literal63 = _g628["id-literal?"];
  var add = _g628.add;
  var drop = _g628.drop;
  var last = _g628.last;
  var reverse = _g628.reverse;
  var join = _g628.join;
  var reduce = _g628.reduce;
  var keep = _g628.keep;
  var in63 = _g628["in?"];
  var find = _g628.find;
  var pair = _g628.pair;
  var sort = _g628.sort;
  var iterate = _g628.iterate;
  var replicate = _g628.replicate;
  var series = _g628.series;
  var map = _g628.map;
  var keys63 = _g628["keys?"];
  var empty63 = _g628["empty?"];
  var stash = _g628.stash;
  var unstash = _g628.unstash;
  var search = _g628.search;
  var split = _g628.split;
  var cat = _g628.cat;
  var _43 = _g628["+"];
  var _ = _g628["-"];
  var _42 = _g628["*"];
  var _47 = _g628["/"];
  var _37 = _g628["%"];
  var _62 = _g628[">"];
  var _60 = _g628["<"];
  var _61 = _g628["="];
  var _6261 = _g628[">="];
  var _6061 = _g628["<="];
  var read_file = _g628["read-file"];
  var write_file = _g628["write-file"];
  var write = _g628.write;
  var exit = _g628.exit;
  var today = _g628.today;
  var now = _g628.now;
  var number = _g628.number;
  var string = _g628.string;
  var space = _g628.space;
  var apply = _g628.apply;
  var make_id = _g628["make-id"];
  var _37message_handler = _g628["%message-handler"];
  var toplevel63 = _g628["toplevel?"];
  var module_key = _g628["module-key"];
  var module = _g628.module;
  var setenv = _g628.setenv;
  var _g631 = nexus["lumen/lib"];
  var getenv = _g631.getenv;
  var macro_function = _g631["macro-function"];
  var macro63 = _g631["macro?"];
  var special63 = _g631["special?"];
  var special_form63 = _g631["special-form?"];
  var statement63 = _g631["statement?"];
  var symbol_expansion = _g631["symbol-expansion"];
  var symbol63 = _g631["symbol?"];
  var variable63 = _g631["variable?"];
  var bound63 = _g631["bound?"];
  var quoted = _g631.quoted;
  var stash42 = _g631["stash*"];
  var bind = _g631.bind;
  var bind42 = _g631["bind*"];
  var quasiexpand = _g631.quasiexpand;
  var macroexpand = _g631.macroexpand;
  var indentation = _g631.indentation;
  var reserved63 = _g631["reserved?"];
  var valid_id63 = _g631["valid-id?"];
  var id = _g631.id;
  var key = _g631.key;
  var imported = _g631.imported;
  var link = _g631.link;
  var mapo = _g631.mapo;
  var quote_environment = _g631["quote-environment"];
  var quote_modules = _g631["quote-modules"];
  var initial_environment = _g631["initial-environment"];
  var _g632 = nexus["lumen/compiler"];
  var compile_function = _g632["compile-function"];
  var compile = _g632.compile;
  var open_module = _g632["open-module"];
  var load_module = _g632["load-module"];
  var in_module = _g632["in-module"];
  var import_modules = _g632["import-modules"];
  var compile_module = _g632["compile-module"];
  var declare = _g632.declare;
  var eval = _g632.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g955 = nexus["lumen/runtime"];
  var nil63 = _g955["nil?"];
  var is63 = _g955["is?"];
  var length = _g955.length;
  var none63 = _g955["none?"];
  var some63 = _g955["some?"];
  var one63 = _g955["one?"];
  var hd = _g955.hd;
  var string63 = _g955["string?"];
  var number63 = _g955["number?"];
  var boolean63 = _g955["boolean?"];
  var function63 = _g955["function?"];
  var composite63 = _g955["composite?"];
  var atom63 = _g955["atom?"];
  var table63 = _g955["table?"];
  var list63 = _g955["list?"];
  var substring = _g955.substring;
  var sub = _g955.sub;
  var keys = _g955.keys;
  var inner = _g955.inner;
  var tl = _g955.tl;
  var char = _g955.char;
  var code = _g955.code;
  var string_literal63 = _g955["string-literal?"];
  var id_literal63 = _g955["id-literal?"];
  var add = _g955.add;
  var drop = _g955.drop;
  var last = _g955.last;
  var reverse = _g955.reverse;
  var join = _g955.join;
  var reduce = _g955.reduce;
  var keep = _g955.keep;
  var in63 = _g955["in?"];
  var find = _g955.find;
  var pair = _g955.pair;
  var sort = _g955.sort;
  var iterate = _g955.iterate;
  var replicate = _g955.replicate;
  var series = _g955.series;
  var map = _g955.map;
  var keys63 = _g955["keys?"];
  var empty63 = _g955["empty?"];
  var stash = _g955.stash;
  var unstash = _g955.unstash;
  var search = _g955.search;
  var split = _g955.split;
  var cat = _g955.cat;
  var _43 = _g955["+"];
  var _ = _g955["-"];
  var _42 = _g955["*"];
  var _47 = _g955["/"];
  var _37 = _g955["%"];
  var _62 = _g955[">"];
  var _60 = _g955["<"];
  var _61 = _g955["="];
  var _6261 = _g955[">="];
  var _6061 = _g955["<="];
  var read_file = _g955["read-file"];
  var write_file = _g955["write-file"];
  var write = _g955.write;
  var exit = _g955.exit;
  var today = _g955.today;
  var now = _g955.now;
  var number = _g955.number;
  var string = _g955.string;
  var space = _g955.space;
  var apply = _g955.apply;
  var make_id = _g955["make-id"];
  var _37message_handler = _g955["%message-handler"];
  var toplevel63 = _g955["toplevel?"];
  var module_key = _g955["module-key"];
  var module = _g955.module;
  var setenv = _g955.setenv;
  var _g958 = nexus["lumen/lib"];
  var getenv = _g958.getenv;
  var macro_function = _g958["macro-function"];
  var macro63 = _g958["macro?"];
  var special63 = _g958["special?"];
  var special_form63 = _g958["special-form?"];
  var statement63 = _g958["statement?"];
  var symbol_expansion = _g958["symbol-expansion"];
  var symbol63 = _g958["symbol?"];
  var variable63 = _g958["variable?"];
  var bound63 = _g958["bound?"];
  var quoted = _g958.quoted;
  var stash42 = _g958["stash*"];
  var bind = _g958.bind;
  var bind42 = _g958["bind*"];
  var quasiexpand = _g958.quasiexpand;
  var macroexpand = _g958.macroexpand;
  var indentation = _g958.indentation;
  var reserved63 = _g958["reserved?"];
  var valid_id63 = _g958["valid-id?"];
  var id = _g958.id;
  var key = _g958.key;
  var imported = _g958.imported;
  var link = _g958.link;
  var mapo = _g958.mapo;
  var quote_environment = _g958["quote-environment"];
  var quote_modules = _g958["quote-modules"];
  var initial_environment = _g958["initial-environment"];
  var _g959 = nexus["lumen/compiler"];
  var compile_function = _g959["compile-function"];
  var compile = _g959.compile;
  var open_module = _g959["open-module"];
  var load_module = _g959["load-module"];
  var in_module = _g959["in-module"];
  var import_modules = _g959["import-modules"];
  var compile_module = _g959["compile-module"];
  var declare = _g959.declare;
  var eval = _g959.eval;
  global.modules = {lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g974 = forms;
    var _g975 = 0;
    while (_g975 < length(_g974)) {
      var x = _g974[_g975];
      str = str + compile(x, {_stash: true, stmt: true});
      _g975 = _g975 + 1;
    }
    return(str);
  }, foo: true, tr: true, stmt: true}, "%if": {export: true, special: function (cond, cons, alt) {
    var _g977 = compile(cond);
    indent_level = indent_level + 1;
    var _g979 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g978 = _g979;
    var _g1075;
    if (alt) {
      indent_level = indent_level + 1;
      var _g981 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g1075 = _g981;
    }
    var _g980 = _g1075;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g977 + ") {\n" + _g978 + ind + "}";
    } else {
      str = str + ind + "if " + _g977 + " then\n" + _g978;
    }
    if (_g980 && target === "js") {
      str = str + " else {\n" + _g980 + ind + "}";
    } else {
      if (_g980) {
        str = str + ind + "else\n" + _g980;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true, tr: true, stmt: true}, "while": {export: true, special: function (cond, form) {
    var _g983 = compile(cond);
    indent_level = indent_level + 1;
    var _g984 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g984;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g983 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g983 + " do\n" + body + ind + "end\n");
    }
  }, foo: true, tr: true, stmt: true}, "%for": {export: true, special: function (t, k, form) {
    var _g986 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g987 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g987;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g986 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g986 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true, tr: true, stmt: true}, "%try": {export: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g989 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g989;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g990 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g990;
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
    var _g1076;
    if (nil63(x)) {
      _g1076 = "return";
    } else {
      _g1076 = "return(" + compile(x) + ")";
    }
    var _g996 = _g1076;
    return(indentation() + _g996);
  }, foo: true, export: true, stmt: true}, error: {special: function (x) {
    var _g1077;
    if (target === "js") {
      _g1077 = "throw new " + compile(["Error", x]);
    } else {
      _g1077 = "error(" + compile(x) + ")";
    }
    var e = _g1077;
    return(indentation() + e);
  }, foo: true, export: true, stmt: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g1078;
    if (is63(value)) {
      _g1078 = " = " + value1;
    } else {
      _g1078 = "";
    }
    var rh = _g1078;
    var _g1079;
    if (target === "js") {
      _g1079 = "var ";
    } else {
      _g1079 = "local ";
    }
    var keyword = _g1079;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, export: true, stmt: true}, set: {special: function (lh, rh) {
    var _g1000 = compile(lh);
    var _g1080;
    if (nil63(rh)) {
      _g1080 = "nil";
    } else {
      _g1080 = rh;
    }
    var _g1001 = compile(_g1080);
    return(indentation() + _g1000 + " = " + _g1001);
  }, foo: true, export: true, stmt: true}, get: {special: function (t, k) {
    var _g1003 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g1003, 0) === "{") {
      _g1003 = "(" + _g1003 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g1003 + "." + inner(k));
    } else {
      return(_g1003 + "[" + k1 + "]");
    }
  }, foo: true, export: true}, "not": {}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g1081;
    if (target === "lua") {
      _g1081 = "{";
    } else {
      _g1081 = "[";
    }
    var open = _g1081;
    var _g1082;
    if (target === "lua") {
      _g1082 = "}";
    } else {
      _g1082 = "]";
    }
    var close = _g1082;
    var str = "";
    var _g1004 = forms;
    var i = 0;
    while (i < length(_g1004)) {
      var x = _g1004[i];
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
    var _g1083;
    if (target === "lua") {
      _g1083 = " = ";
    } else {
      _g1083 = ": ";
    }
    var sep = _g1083;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g1005 = pairs;
    var i = 0;
    while (i < length(_g1005)) {
      var _g1006 = _g1005[i];
      var k = _g1006[0];
      var v = _g1006[1];
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
  }, foo: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g1009) {
    var char = _g1009[0];
    var stream = _g1009[1];
    var _g1008 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1008, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {macro: function (form) {
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
      var _g1015 = body;
      var k = undefined;
      for (k in _g1015) {
        if (isNaN(parseInt(k))) {
          var v = _g1015[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1017) {
      var a = _g1017[0];
      var b = _g1017[1];
      var c = sub(_g1017, 2);
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
    var _g1018 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1018, 0);
    return(["if", cond, join(["do"], body)]);
  }, export: true}, unless: {macro: function (cond) {
    var _g1019 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1019, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var _g1021 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1021, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g1022 = bind(lh, rh);
      var _g1023 = 0;
      while (_g1023 < length(_g1022)) {
        var _g1024 = _g1022[_g1023];
        var id = _g1024[0];
        var val = _g1024[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g1023 = _g1023 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
    }
  }, export: true}, "define-module": {macro: function (spec) {
    var _g1025 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1025, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1026 = import_modules(imp);
    var imports = _g1026[0];
    var bindings = _g1026[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1027 = exp || [];
    var _g1028 = 0;
    while (_g1028 < length(_g1027)) {
      var x = _g1027[_g1028];
      setenv(x, {_stash: true, export: true});
      _g1028 = _g1028 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var _g1029 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1029, 0);
    var form = join(["fn", args], body);
    var _g1030 = ["setenv", ["quote", name]];
    _g1030.macro = form;
    _g1030.form = ["quote", form];
    eval(_g1030);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var _g1031 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1031, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g1032 = ["setenv", ["quote", name]];
    _g1032.special = form;
    _g1032.form = ["quote", form];
    eval(join(_g1032, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define*": {macro: function (name, x) {
    var _g1034 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1034, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _g1035 = bind42(x, body);
      var args = _g1035[0];
      var _g1036 = _g1035[1];
      return(join(["%global-function", name, args], _g1036));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var _g1037 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1037, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1038 = bind42(x, body);
        var args = _g1038[0];
        var _g1039 = _g1038[1];
        return(link(name, join(["%local-function", name, args], _g1039)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "with-bindings": {macro: function (_g1042) {
    var names = _g1042[0];
    var _g1041 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1041, 0);
    var x = make_id();
    var _g1044 = ["setenv", x];
    _g1044.variable = true;
    var _g1043 = ["with-frame", ["each", [x], names, _g1044]];
    _g1043.scope = true;
    return(join(_g1043, body));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var _g1045 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1045, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1046 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1046);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var _g1048 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1048, 0);
    add(environment, {});
    map(function (_g1051) {
      var name = _g1051[0];
      var exp = _g1051[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1049 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1049);
  }, export: true}, fn: {macro: function (args) {
    var _g1052 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1052, 0);
    var _g1053 = bind42(args, body);
    var _g1054 = _g1053[0];
    var _g1055 = _g1053[1];
    return(join(["%function", _g1054], _g1055));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, all: {macro: function (_g1058, t) {
    var k = _g1058[0];
    var v = _g1058[1];
    var _g1057 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1057, 0);
    var x = make_id();
    var n = make_id();
    var _g1084;
    if (target === "lua") {
      _g1084 = body;
    } else {
      _g1084 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g1084)]]);
  }, export: true}, each: {macro: function (b, t) {
    var _g1059 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1059, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g1085;
    if (nil63(v)) {
      var _g1086;
      if (b.i) {
        _g1086 = "i";
      } else {
        _g1086 = make_id();
      }
      var i = _g1086;
      _g1085 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], body), ["inc", i]]];
    } else {
      var _g1060 = ["target"];
      _g1060.js = ["isNaN", ["parseInt", k]];
      _g1060.lua = ["not", ["number?", k]];
      _g1085 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g1060, join(["let", [v, ["get", t1, k]]], body)]]];
    }
    return(["let", [t1, t], _g1085]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g1061 = xs;
    var _g1062 = 0;
    while (_g1062 < length(_g1061)) {
      var x = _g1061[_g1062];
      l[x] = true;
      _g1062 = _g1062 + 1;
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
    var _g1065 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1065, 0);
    return(["set", a, join(["join*", a], bs)]);
  }, export: true}, "cat!": {macro: function (a) {
    var _g1066 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1066, 0);
    return(["set", a, join(["cat", a], bs)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var _g1069 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g1069, 0);
    var scope = _g1069.scope;
    var x = make_id();
    var _g1070 = ["table"];
    _g1070._scope = scope;
    return(["do", ["add", "environment", _g1070], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var _g1071 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1071, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1072 = import_modules(imp);
    var imports = _g1072[0];
    var bindings = _g1072[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1073 = exp || [];
    var _g1074 = 0;
    while (_g1074 < length(_g1073)) {
      var x = _g1073[_g1074];
      setenv(x, {_stash: true, export: true});
      _g1074 = _g1074 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g1087 = nexus["lumen/runtime"];
  var nil63 = _g1087["nil?"];
  var is63 = _g1087["is?"];
  var length = _g1087.length;
  var none63 = _g1087["none?"];
  var some63 = _g1087["some?"];
  var one63 = _g1087["one?"];
  var hd = _g1087.hd;
  var string63 = _g1087["string?"];
  var number63 = _g1087["number?"];
  var boolean63 = _g1087["boolean?"];
  var function63 = _g1087["function?"];
  var composite63 = _g1087["composite?"];
  var atom63 = _g1087["atom?"];
  var table63 = _g1087["table?"];
  var list63 = _g1087["list?"];
  var substring = _g1087.substring;
  var sub = _g1087.sub;
  var keys = _g1087.keys;
  var inner = _g1087.inner;
  var tl = _g1087.tl;
  var char = _g1087.char;
  var code = _g1087.code;
  var string_literal63 = _g1087["string-literal?"];
  var id_literal63 = _g1087["id-literal?"];
  var add = _g1087.add;
  var drop = _g1087.drop;
  var last = _g1087.last;
  var reverse = _g1087.reverse;
  var join = _g1087.join;
  var reduce = _g1087.reduce;
  var keep = _g1087.keep;
  var in63 = _g1087["in?"];
  var find = _g1087.find;
  var pair = _g1087.pair;
  var sort = _g1087.sort;
  var iterate = _g1087.iterate;
  var replicate = _g1087.replicate;
  var series = _g1087.series;
  var map = _g1087.map;
  var keys63 = _g1087["keys?"];
  var empty63 = _g1087["empty?"];
  var stash = _g1087.stash;
  var unstash = _g1087.unstash;
  var search = _g1087.search;
  var split = _g1087.split;
  var cat = _g1087.cat;
  var _43 = _g1087["+"];
  var _ = _g1087["-"];
  var _42 = _g1087["*"];
  var _47 = _g1087["/"];
  var _37 = _g1087["%"];
  var _62 = _g1087[">"];
  var _60 = _g1087["<"];
  var _61 = _g1087["="];
  var _6261 = _g1087[">="];
  var _6061 = _g1087["<="];
  var read_file = _g1087["read-file"];
  var write_file = _g1087["write-file"];
  var write = _g1087.write;
  var exit = _g1087.exit;
  var today = _g1087.today;
  var now = _g1087.now;
  var number = _g1087.number;
  var string = _g1087.string;
  var space = _g1087.space;
  var apply = _g1087.apply;
  var make_id = _g1087["make-id"];
  var _37message_handler = _g1087["%message-handler"];
  var toplevel63 = _g1087["toplevel?"];
  var module_key = _g1087["module-key"];
  var module = _g1087.module;
  var setenv = _g1087.setenv;
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
  var keys = _g2.keys;
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
    var _g1091 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g1098) {
        return([false, _g1098.message]);
      }
    })();
    var _g1 = _g1091[0];
    var x = _g1091[1];
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
    var _g1097 = args;
    var i = 0;
    while (i < length(_g1097)) {
      var arg = _g1097[i];
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
