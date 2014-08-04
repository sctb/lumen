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
  var sort = _g182.sort;
  var code = _g182.code;
  var hd = _g182.hd;
  var id_literal63 = _g182["id-literal?"];
  var is63 = _g182["is?"];
  var keep = _g182.keep;
  var reverse = _g182.reverse;
  var boolean63 = _g182["boolean?"];
  var string = _g182.string;
  var _62 = _g182[">"];
  var join = _g182.join;
  var _60 = _g182["<"];
  var _61 = _g182["="];
  var table63 = _g182["table?"];
  var map = _g182.map;
  var tl = _g182.tl;
  var reduce = _g182.reduce;
  var _37 = _g182["%"];
  var _42 = _g182["*"];
  var _43 = _g182["+"];
  var number = _g182.number;
  var _47 = _g182["/"];
  var sub = _g182.sub;
  var string_literal63 = _g182["string-literal?"];
  var _37message_handler = _g182["%message-handler"];
  var setenv = _g182.setenv;
  var keys63 = _g182["keys?"];
  var iterate = _g182.iterate;
  var add = _g182.add;
  var length = _g182.length;
  var space = _g182.space;
  var keys = _g182.keys;
  var stash = _g182.stash;
  var write_file = _g182["write-file"];
  var list63 = _g182["list?"];
  var drop = _g182.drop;
  var substring = _g182.substring;
  var char = _g182.char;
  var number63 = _g182["number?"];
  var pair = _g182.pair;
  var cat = _g182.cat;
  var nil63 = _g182["nil?"];
  var replicate = _g182.replicate;
  var in63 = _g182["in?"];
  var toplevel63 = _g182["toplevel?"];
  var now = _g182.now;
  var series = _g182.series;
  var module_key = _g182["module-key"];
  var make_id = _g182["make-id"];
  var empty63 = _g182["empty?"];
  var read_file = _g182["read-file"];
  var split = _g182.split;
  var today = _g182.today;
  var module = _g182.module;
  var unstash = _g182.unstash;
  var composite63 = _g182["composite?"];
  var search = _g182.search;
  var find = _g182.find;
  var _6061 = _g182["<="];
  var some63 = _g182["some?"];
  var _6261 = _g182[">="];
  var exit = _g182.exit;
  var one63 = _g182["one?"];
  var apply = _g182.apply;
  var last = _g182.last;
  var atom63 = _g182["atom?"];
  var function63 = _g182["function?"];
  var none63 = _g182["none?"];
  var inner = _g182.inner;
  var write = _g182.write;
  var _ = _g182["-"];
  var string63 = _g182["string?"];
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
      var _g273;
      if (c === "\n") {
        _g273 = "\\n";
      } else {
        var _g274;
        if (c === "\"") {
          _g274 = "\\\"";
        } else {
          var _g275;
          if (c === "\\") {
            _g275 = "\\\\";
          } else {
            _g275 = c;
          }
          _g274 = _g275;
        }
        _g273 = _g274;
      }
      var c1 = _g273;
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
        var _g276;
        if (isNaN(_g203)) {
          _g276 = k;
        } else {
          _g276 = _g203;
        }
        var _g204 = _g276;
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
  var index = function (x) {
    if (number63(x) && target != "js") {
      if (target === "js") {
        x = x - 1;
      } else {
        x = x + 1;
      }
    }
    return(x);
  };
  nexus["lumen/lib"].index = index;
  var bind = function (lh, rh) {
    if (composite63(lh) && list63(rh)) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var _g207 = lh;
        var k = undefined;
        for (k in _g207) {
          var v = _g207[k];
          var _g208 = parseInt(k);
          var _g277;
          if (isNaN(_g208)) {
            _g277 = k;
          } else {
            _g277 = _g208;
          }
          var _g209 = _g277;
          var _g278;
          if (_g209 === "&") {
            _g278 = ["sub", rh, length(lh)];
          } else {
            _g278 = ["get", rh, ["quote", index(_g209)]];
          }
          var x = _g278;
          var _g279;
          if (v === true) {
            _g279 = _g209;
          } else {
            _g279 = v;
          }
          var _g210 = _g279;
          bs = join(bs, bind(_g210, x));
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
      var _g213 = args;
      var k = undefined;
      for (k in _g213) {
        var v = _g213[k];
        var _g214 = parseInt(k);
        var _g280;
        if (isNaN(_g214)) {
          _g280 = k;
        } else {
          _g280 = _g214;
        }
        var _g215 = _g280;
        if (number63(_g215)) {
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
            var _g223 = args;
            var _g224 = 0;
            while (_g224 < length(_g223)) {
              var _g221 = _g223[_g224];
              setenv(_g221, {_stash: true, variable: true});
              _g224 = _g224 + 1;
            }
            var _g222 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g222);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g181 = form[0];
              var _g225 = form[1];
              var _g226 = form[2];
              var _g227 = sub(form, 3);
              add(environment, {_scope: true});
              var _g230 = _g226;
              var _g231 = 0;
              while (_g231 < length(_g230)) {
                var _g228 = _g230[_g231];
                setenv(_g228, {_stash: true, variable: true});
                _g231 = _g231 + 1;
              }
              var _g229 = join([x, _g225, _g226], macroexpand(_g227));
              drop(environment);
              return(_g229);
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
    var _g233 = form;
    var k = undefined;
    for (k in _g233) {
      if (isNaN(parseInt(k))) {
        var v = _g233[k];
        var _g281;
        if (quasisplice63(v, depth)) {
          _g281 = quasiexpand(v[1]);
        } else {
          _g281 = quasiexpand(v, depth);
        }
        var _g234 = _g281;
        last(xs)[k] = _g234;
      }
    }
    var _g235 = form;
    var _g236 = 0;
    while (_g236 < length(_g235)) {
      var x = _g235[_g236];
      if (quasisplice63(x, depth)) {
        var _g237 = quasiexpand(x[1]);
        add(xs, _g237);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g236 = _g236 + 1;
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
  var reserved = {"%": true, "+": true, "-": true, "/": true, "false": true, "catch": true, "return": true, "delete": true, "finally": true, "function": true, "==": true, "repeat": true, "nil": true, "default": true, "local": true, "switch": true, "this": true, "instanceof": true, "while": true, "do": true, "and": true, "throw": true, "until": true, "if": true, "end": true, "void": true, "debugger": true, "new": true, "then": true, "typeof": true, "else": true, "or": true, "with": true, ">=": true, ">": true, "*": true, "for": true, "break": true, "not": true, "<": true, "<=": true, "elseif": true, "var": true, "true": true, "case": true, "=": true, "continue": true, "in": true, "try": true};
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
      var _g282;
      if (c === "-") {
        _g282 = "_";
      } else {
        var _g283;
        if (valid_code63(n)) {
          _g283 = c;
        } else {
          var _g284;
          if (i === 0) {
            _g284 = "_" + n;
          } else {
            _g284 = n;
          }
          _g283 = _g284;
        }
        _g282 = _g283;
      }
      var c1 = _g282;
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
    var _g254 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g255 = _g254.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g256 = module(spec).export;
      var n = undefined;
      for (n in _g256) {
        if (isNaN(parseInt(n))) {
          var b = _g256[n];
          if (b.variable && (_g255 || b.export)) {
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
    var _g258 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_g258, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _g259 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g259, 0);
    var t1 = [];
    var _g260 = t;
    var _g261 = 0;
    while (_g261 < length(_g260)) {
      var x = _g260[_g261];
      add(t1, x);
      _g261 = _g261 + 1;
    }
    var _g262 = t;
    var k = undefined;
    for (k in _g262) {
      if (isNaN(parseInt(k))) {
        var v = _g262[k];
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
    var _g265 = t;
    var k = undefined;
    for (k in _g265) {
      if (isNaN(parseInt(k))) {
        var v = _g265[k];
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
    var _g270 = ["table"];
    _g270.export = quote_frame(m.export);
    _g270.alias = quoted(m.alias);
    _g270.import = quoted(m.import);
    return(_g270);
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
  var _g285 = nexus["lumen/runtime"];
  var sort = _g285.sort;
  var code = _g285.code;
  var hd = _g285.hd;
  var id_literal63 = _g285["id-literal?"];
  var is63 = _g285["is?"];
  var keep = _g285.keep;
  var reverse = _g285.reverse;
  var boolean63 = _g285["boolean?"];
  var string = _g285.string;
  var _62 = _g285[">"];
  var join = _g285.join;
  var _60 = _g285["<"];
  var _61 = _g285["="];
  var table63 = _g285["table?"];
  var map = _g285.map;
  var tl = _g285.tl;
  var reduce = _g285.reduce;
  var _37 = _g285["%"];
  var _42 = _g285["*"];
  var _43 = _g285["+"];
  var number = _g285.number;
  var _47 = _g285["/"];
  var sub = _g285.sub;
  var string_literal63 = _g285["string-literal?"];
  var _37message_handler = _g285["%message-handler"];
  var setenv = _g285.setenv;
  var keys63 = _g285["keys?"];
  var iterate = _g285.iterate;
  var add = _g285.add;
  var length = _g285.length;
  var space = _g285.space;
  var keys = _g285.keys;
  var stash = _g285.stash;
  var write_file = _g285["write-file"];
  var list63 = _g285["list?"];
  var drop = _g285.drop;
  var substring = _g285.substring;
  var char = _g285.char;
  var number63 = _g285["number?"];
  var pair = _g285.pair;
  var cat = _g285.cat;
  var nil63 = _g285["nil?"];
  var replicate = _g285.replicate;
  var in63 = _g285["in?"];
  var toplevel63 = _g285["toplevel?"];
  var now = _g285.now;
  var series = _g285.series;
  var module_key = _g285["module-key"];
  var make_id = _g285["make-id"];
  var empty63 = _g285["empty?"];
  var read_file = _g285["read-file"];
  var split = _g285.split;
  var today = _g285.today;
  var module = _g285.module;
  var unstash = _g285.unstash;
  var composite63 = _g285["composite?"];
  var search = _g285.search;
  var find = _g285.find;
  var _6061 = _g285["<="];
  var some63 = _g285["some?"];
  var _6261 = _g285[">="];
  var exit = _g285.exit;
  var one63 = _g285["one?"];
  var apply = _g285.apply;
  var last = _g285.last;
  var atom63 = _g285["atom?"];
  var function63 = _g285["function?"];
  var none63 = _g285["none?"];
  var inner = _g285.inner;
  var write = _g285.write;
  var _ = _g285["-"];
  var string63 = _g285["string?"];
  var delimiters = {"(": true, ")": true, "\n": true, ";": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {"\n": true, "\t": true, " ": true};
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
  var _g314 = nexus["lumen/runtime"];
  var sort = _g314.sort;
  var code = _g314.code;
  var hd = _g314.hd;
  var id_literal63 = _g314["id-literal?"];
  var is63 = _g314["is?"];
  var keep = _g314.keep;
  var reverse = _g314.reverse;
  var boolean63 = _g314["boolean?"];
  var string = _g314.string;
  var _62 = _g314[">"];
  var join = _g314.join;
  var _60 = _g314["<"];
  var _61 = _g314["="];
  var table63 = _g314["table?"];
  var map = _g314.map;
  var tl = _g314.tl;
  var reduce = _g314.reduce;
  var _37 = _g314["%"];
  var _42 = _g314["*"];
  var _43 = _g314["+"];
  var number = _g314.number;
  var _47 = _g314["/"];
  var sub = _g314.sub;
  var string_literal63 = _g314["string-literal?"];
  var _37message_handler = _g314["%message-handler"];
  var setenv = _g314.setenv;
  var keys63 = _g314["keys?"];
  var iterate = _g314.iterate;
  var add = _g314.add;
  var length = _g314.length;
  var space = _g314.space;
  var keys = _g314.keys;
  var stash = _g314.stash;
  var write_file = _g314["write-file"];
  var list63 = _g314["list?"];
  var drop = _g314.drop;
  var substring = _g314.substring;
  var char = _g314.char;
  var number63 = _g314["number?"];
  var pair = _g314.pair;
  var cat = _g314.cat;
  var nil63 = _g314["nil?"];
  var replicate = _g314.replicate;
  var in63 = _g314["in?"];
  var toplevel63 = _g314["toplevel?"];
  var now = _g314.now;
  var series = _g314.series;
  var module_key = _g314["module-key"];
  var make_id = _g314["make-id"];
  var empty63 = _g314["empty?"];
  var read_file = _g314["read-file"];
  var split = _g314.split;
  var today = _g314.today;
  var module = _g314.module;
  var unstash = _g314.unstash;
  var composite63 = _g314["composite?"];
  var search = _g314.search;
  var find = _g314.find;
  var _6061 = _g314["<="];
  var some63 = _g314["some?"];
  var _6261 = _g314[">="];
  var exit = _g314.exit;
  var one63 = _g314["one?"];
  var apply = _g314.apply;
  var last = _g314.last;
  var atom63 = _g314["atom?"];
  var function63 = _g314["function?"];
  var none63 = _g314["none?"];
  var inner = _g314.inner;
  var write = _g314.write;
  var _ = _g314["-"];
  var string63 = _g314["string?"];
  var _g317 = nexus["lumen/lib"];
  var macroexpand = _g317.macroexpand;
  var getenv = _g317.getenv;
  var id = _g317.id;
  var variable63 = _g317["variable?"];
  var initial_environment = _g317["initial-environment"];
  var symbol63 = _g317["symbol?"];
  var indentation = _g317.indentation;
  var statement63 = _g317["statement?"];
  var stash42 = _g317["stash*"];
  var macro_function = _g317["macro-function"];
  var quote_modules = _g317["quote-modules"];
  var mapo = _g317.mapo;
  var link = _g317.link;
  var imported = _g317.imported;
  var bind42 = _g317["bind*"];
  var valid_id63 = _g317["valid-id?"];
  var symbol_expansion = _g317["symbol-expansion"];
  var quote_environment = _g317["quote-environment"];
  var quoted = _g317.quoted;
  var special_form63 = _g317["special-form?"];
  var key = _g317.key;
  var reserved63 = _g317["reserved?"];
  var bind = _g317.bind;
  var macro63 = _g317["macro?"];
  var special63 = _g317["special?"];
  var quasiexpand = _g317.quasiexpand;
  var bound63 = _g317["bound?"];
  var _g318 = nexus["lumen/reader"];
  var make_stream = _g318["make-stream"];
  var read = _g318.read;
  var read_from_string = _g318["read-from-string"];
  var read_all = _g318["read-all"];
  var read_table = _g318["read-table"];
  var _g322 = [];
  _g322.lua = "not ";
  _g322.js = "!";
  var _g320 = [];
  var _g323 = [];
  _g323.lua = "not ";
  _g323.js = "!";
  _g320["not"] = _g323;
  var _g325 = [];
  _g325["*"] = true;
  _g325["/"] = true;
  _g325["%"] = true;
  var _g327 = [];
  _g327["-"] = true;
  _g327["+"] = true;
  var _g331 = [];
  _g331.lua = "..";
  _g331.js = "+";
  var _g329 = [];
  var _g332 = [];
  _g332.lua = "..";
  _g332.js = "+";
  _g329.cat = _g332;
  var _g334 = [];
  _g334[">"] = true;
  _g334["<"] = true;
  _g334["<="] = true;
  _g334[">="] = true;
  var _g338 = [];
  _g338.lua = "~=";
  _g338.js = "!=";
  var _g340 = [];
  _g340.lua = "==";
  _g340.js = "===";
  var _g336 = [];
  var _g341 = [];
  _g341.lua = "~=";
  _g341.js = "!=";
  _g336["~="] = _g341;
  var _g342 = [];
  _g342.lua = "==";
  _g342.js = "===";
  _g336["="] = _g342;
  var _g346 = [];
  _g346.lua = "and";
  _g346.js = "&&";
  var _g344 = [];
  var _g347 = [];
  _g347.lua = "and";
  _g347.js = "&&";
  _g344["and"] = _g347;
  var _g351 = [];
  _g351.lua = "or";
  _g351.js = "||";
  var _g349 = [];
  var _g352 = [];
  _g352.lua = "or";
  _g352.js = "||";
  _g349["or"] = _g352;
  var infix = [_g320, _g325, _g327, _g329, _g334, _g336, _g344, _g349];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g355 = infix;
      var i = 0;
      while (i < length(_g355)) {
        var level = _g355[i];
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
    var _g360 = args;
    var i = 0;
    while (i < length(_g360)) {
      var arg = _g360[i];
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
    var _g364 = getenv(x);
    var self_tr63 = _g364.tr;
    var stmt = _g364.stmt;
    var special = _g364.special;
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
    var _g367 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g367.right;
    var _g429;
    if (right) {
      _g429 = _6261;
    } else {
      _g429 = _62;
    }
    if (_g429(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g369 = sub(form, 1);
    var a = _g369[0];
    var b = _g369[1];
    var _g370 = op_delims(form, a);
    var ao = _g370[0];
    var ac = _g370[1];
    var _g371 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g371[0];
    var bc = _g371[1];
    var _g372 = compile(a);
    var _g373 = compile(b);
    var _g374 = getop(op);
    if (unary63(form)) {
      return(_g374 + ao + _g372 + ac);
    } else {
      return(ao + _g372 + ac + " " + _g374 + " " + bo + _g373 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g375 = unstash(Array.prototype.slice.call(arguments, 2));
    var prefix = _g375.prefix;
    var name = _g375.name;
    var _g430;
    if (name) {
      _g430 = compile(name);
    } else {
      _g430 = "";
    }
    var id = _g430;
    var _g376 = prefix || "";
    var _g377 = compile_args(args);
    indent_level = indent_level + 1;
    var _g379 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g378 = _g379;
    var ind = indentation();
    var _g431;
    if (target === "js") {
      _g431 = "";
    } else {
      _g431 = "end";
    }
    var tr = _g431;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g377 + " {\n" + _g378 + ind + "}" + tr);
    } else {
      return(_g376 + "function " + id + _g377 + "\n" + _g378 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g381 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g381.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g432;
        if (stmt) {
          _g432 = indentation();
        } else {
          _g432 = "";
        }
        var ind = _g432;
        var _g433;
        if (atom63(form)) {
          _g433 = compile_atom(form);
        } else {
          var _g434;
          if (infix63(hd(form))) {
            _g434 = compile_infix(form);
          } else {
            _g434 = compile_call(form);
          }
          _g433 = _g434;
        }
        var _g382 = _g433;
        return(ind + _g382 + tr);
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
    var _g386 = sub(args, 0, length(args) - 1);
    var _g387 = 0;
    while (_g387 < length(_g386)) {
      var x = _g386[_g387];
      add(hoist, lower(x, hoist, stmt63));
      _g387 = _g387 + 1;
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
    var _g389 = args[1];
    var _g390 = args[2];
    if (stmt63 || tail63) {
      var _g436;
      if (_g390) {
        _g436 = [lower_body([_g390], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g389], tail63)], _g436)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g435;
      if (_g390) {
        _g435 = [lower(["set", e, _g390])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g389])], _g435));
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
      var _g437;
      if (x === "and") {
        _g437 = ["%if", id, b, id];
      } else {
        _g437 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g437], hoist));
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
    var _g397 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g397, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g399 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g399)) {
      return(_g399);
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
    var _g413 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g414 = _g413.all;
    var m = module(spec);
    var frame = last(environment);
    var _g415 = m.export;
    var k = undefined;
    for (k in _g415) {
      if (isNaN(parseInt(k))) {
        var v = _g415[k];
        if (v.export || _g414) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g416 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g417 = _g416.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g417}));
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
    var _g420 = specs || [];
    var _g421 = 0;
    while (_g421 < length(_g420)) {
      var spec = _g420[_g421];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g422 = import_modules(m.alias);
        var aliased = _g422[0];
        var bs = _g422[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g423 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g423);
      }
      _g421 = _g421 + 1;
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
  var _g438 = nexus["lumen/runtime"];
  var sort = _g438.sort;
  var code = _g438.code;
  var hd = _g438.hd;
  var id_literal63 = _g438["id-literal?"];
  var is63 = _g438["is?"];
  var keep = _g438.keep;
  var reverse = _g438.reverse;
  var boolean63 = _g438["boolean?"];
  var string = _g438.string;
  var _62 = _g438[">"];
  var join = _g438.join;
  var _60 = _g438["<"];
  var _61 = _g438["="];
  var table63 = _g438["table?"];
  var map = _g438.map;
  var tl = _g438.tl;
  var reduce = _g438.reduce;
  var _37 = _g438["%"];
  var _42 = _g438["*"];
  var _43 = _g438["+"];
  var number = _g438.number;
  var _47 = _g438["/"];
  var sub = _g438.sub;
  var string_literal63 = _g438["string-literal?"];
  var _37message_handler = _g438["%message-handler"];
  var setenv = _g438.setenv;
  var keys63 = _g438["keys?"];
  var iterate = _g438.iterate;
  var add = _g438.add;
  var length = _g438.length;
  var space = _g438.space;
  var keys = _g438.keys;
  var stash = _g438.stash;
  var write_file = _g438["write-file"];
  var list63 = _g438["list?"];
  var drop = _g438.drop;
  var substring = _g438.substring;
  var char = _g438.char;
  var number63 = _g438["number?"];
  var pair = _g438.pair;
  var cat = _g438.cat;
  var nil63 = _g438["nil?"];
  var replicate = _g438.replicate;
  var in63 = _g438["in?"];
  var toplevel63 = _g438["toplevel?"];
  var now = _g438.now;
  var series = _g438.series;
  var module_key = _g438["module-key"];
  var make_id = _g438["make-id"];
  var empty63 = _g438["empty?"];
  var read_file = _g438["read-file"];
  var split = _g438.split;
  var today = _g438.today;
  var module = _g438.module;
  var unstash = _g438.unstash;
  var composite63 = _g438["composite?"];
  var search = _g438.search;
  var find = _g438.find;
  var _6061 = _g438["<="];
  var some63 = _g438["some?"];
  var _6261 = _g438[">="];
  var exit = _g438.exit;
  var one63 = _g438["one?"];
  var apply = _g438.apply;
  var last = _g438.last;
  var atom63 = _g438["atom?"];
  var function63 = _g438["function?"];
  var none63 = _g438["none?"];
  var inner = _g438.inner;
  var write = _g438.write;
  var _ = _g438["-"];
  var string63 = _g438["string?"];
  var _g441 = nexus["lumen/lib"];
  var macroexpand = _g441.macroexpand;
  var getenv = _g441.getenv;
  var id = _g441.id;
  var variable63 = _g441["variable?"];
  var initial_environment = _g441["initial-environment"];
  var symbol63 = _g441["symbol?"];
  var indentation = _g441.indentation;
  var statement63 = _g441["statement?"];
  var stash42 = _g441["stash*"];
  var macro_function = _g441["macro-function"];
  var quote_modules = _g441["quote-modules"];
  var mapo = _g441.mapo;
  var link = _g441.link;
  var imported = _g441.imported;
  var bind42 = _g441["bind*"];
  var valid_id63 = _g441["valid-id?"];
  var symbol_expansion = _g441["symbol-expansion"];
  var quote_environment = _g441["quote-environment"];
  var quoted = _g441.quoted;
  var special_form63 = _g441["special-form?"];
  var key = _g441.key;
  var reserved63 = _g441["reserved?"];
  var bind = _g441.bind;
  var macro63 = _g441["macro?"];
  var special63 = _g441["special?"];
  var quasiexpand = _g441.quasiexpand;
  var bound63 = _g441["bound?"];
  var _g442 = nexus["lumen/compiler"];
  var declare = _g442.declare;
  var import_modules = _g442["import-modules"];
  var open_module = _g442["open-module"];
  var compile_function = _g442["compile-function"];
  var compile = _g442.compile;
  var compile_module = _g442["compile-module"];
  var load_module = _g442["load-module"];
  var eval = _g442.eval;
  var in_module = _g442["in-module"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g629 = nexus["lumen/runtime"];
  var sort = _g629.sort;
  var code = _g629.code;
  var hd = _g629.hd;
  var id_literal63 = _g629["id-literal?"];
  var is63 = _g629["is?"];
  var keep = _g629.keep;
  var reverse = _g629.reverse;
  var boolean63 = _g629["boolean?"];
  var string = _g629.string;
  var _62 = _g629[">"];
  var join = _g629.join;
  var _60 = _g629["<"];
  var _61 = _g629["="];
  var table63 = _g629["table?"];
  var map = _g629.map;
  var tl = _g629.tl;
  var reduce = _g629.reduce;
  var _37 = _g629["%"];
  var _42 = _g629["*"];
  var _43 = _g629["+"];
  var number = _g629.number;
  var _47 = _g629["/"];
  var sub = _g629.sub;
  var string_literal63 = _g629["string-literal?"];
  var _37message_handler = _g629["%message-handler"];
  var setenv = _g629.setenv;
  var keys63 = _g629["keys?"];
  var iterate = _g629.iterate;
  var add = _g629.add;
  var length = _g629.length;
  var space = _g629.space;
  var keys = _g629.keys;
  var stash = _g629.stash;
  var write_file = _g629["write-file"];
  var list63 = _g629["list?"];
  var drop = _g629.drop;
  var substring = _g629.substring;
  var char = _g629.char;
  var number63 = _g629["number?"];
  var pair = _g629.pair;
  var cat = _g629.cat;
  var nil63 = _g629["nil?"];
  var replicate = _g629.replicate;
  var in63 = _g629["in?"];
  var toplevel63 = _g629["toplevel?"];
  var now = _g629.now;
  var series = _g629.series;
  var module_key = _g629["module-key"];
  var make_id = _g629["make-id"];
  var empty63 = _g629["empty?"];
  var read_file = _g629["read-file"];
  var split = _g629.split;
  var today = _g629.today;
  var module = _g629.module;
  var unstash = _g629.unstash;
  var composite63 = _g629["composite?"];
  var search = _g629.search;
  var find = _g629.find;
  var _6061 = _g629["<="];
  var some63 = _g629["some?"];
  var _6261 = _g629[">="];
  var exit = _g629.exit;
  var one63 = _g629["one?"];
  var apply = _g629.apply;
  var last = _g629.last;
  var atom63 = _g629["atom?"];
  var function63 = _g629["function?"];
  var none63 = _g629["none?"];
  var inner = _g629.inner;
  var write = _g629.write;
  var _ = _g629["-"];
  var string63 = _g629["string?"];
  var _g632 = nexus["lumen/lib"];
  var macroexpand = _g632.macroexpand;
  var getenv = _g632.getenv;
  var id = _g632.id;
  var variable63 = _g632["variable?"];
  var initial_environment = _g632["initial-environment"];
  var symbol63 = _g632["symbol?"];
  var indentation = _g632.indentation;
  var statement63 = _g632["statement?"];
  var stash42 = _g632["stash*"];
  var macro_function = _g632["macro-function"];
  var quote_modules = _g632["quote-modules"];
  var mapo = _g632.mapo;
  var link = _g632.link;
  var imported = _g632.imported;
  var bind42 = _g632["bind*"];
  var valid_id63 = _g632["valid-id?"];
  var symbol_expansion = _g632["symbol-expansion"];
  var quote_environment = _g632["quote-environment"];
  var quoted = _g632.quoted;
  var special_form63 = _g632["special-form?"];
  var key = _g632.key;
  var reserved63 = _g632["reserved?"];
  var bind = _g632.bind;
  var macro63 = _g632["macro?"];
  var special63 = _g632["special?"];
  var quasiexpand = _g632.quasiexpand;
  var bound63 = _g632["bound?"];
  var _g633 = nexus["lumen/compiler"];
  var declare = _g633.declare;
  var import_modules = _g633["import-modules"];
  var open_module = _g633["open-module"];
  var compile_function = _g633["compile-function"];
  var compile = _g633.compile;
  var compile_module = _g633["compile-module"];
  var load_module = _g633["load-module"];
  var eval = _g633.eval;
  var in_module = _g633["in-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g956 = nexus["lumen/runtime"];
  var sort = _g956.sort;
  var code = _g956.code;
  var hd = _g956.hd;
  var id_literal63 = _g956["id-literal?"];
  var is63 = _g956["is?"];
  var keep = _g956.keep;
  var reverse = _g956.reverse;
  var boolean63 = _g956["boolean?"];
  var string = _g956.string;
  var _62 = _g956[">"];
  var join = _g956.join;
  var _60 = _g956["<"];
  var _61 = _g956["="];
  var table63 = _g956["table?"];
  var map = _g956.map;
  var tl = _g956.tl;
  var reduce = _g956.reduce;
  var _37 = _g956["%"];
  var _42 = _g956["*"];
  var _43 = _g956["+"];
  var number = _g956.number;
  var _47 = _g956["/"];
  var sub = _g956.sub;
  var string_literal63 = _g956["string-literal?"];
  var _37message_handler = _g956["%message-handler"];
  var setenv = _g956.setenv;
  var keys63 = _g956["keys?"];
  var iterate = _g956.iterate;
  var add = _g956.add;
  var length = _g956.length;
  var space = _g956.space;
  var keys = _g956.keys;
  var stash = _g956.stash;
  var write_file = _g956["write-file"];
  var list63 = _g956["list?"];
  var drop = _g956.drop;
  var substring = _g956.substring;
  var char = _g956.char;
  var number63 = _g956["number?"];
  var pair = _g956.pair;
  var cat = _g956.cat;
  var nil63 = _g956["nil?"];
  var replicate = _g956.replicate;
  var in63 = _g956["in?"];
  var toplevel63 = _g956["toplevel?"];
  var now = _g956.now;
  var series = _g956.series;
  var module_key = _g956["module-key"];
  var make_id = _g956["make-id"];
  var empty63 = _g956["empty?"];
  var read_file = _g956["read-file"];
  var split = _g956.split;
  var today = _g956.today;
  var module = _g956.module;
  var unstash = _g956.unstash;
  var composite63 = _g956["composite?"];
  var search = _g956.search;
  var find = _g956.find;
  var _6061 = _g956["<="];
  var some63 = _g956["some?"];
  var _6261 = _g956[">="];
  var exit = _g956.exit;
  var one63 = _g956["one?"];
  var apply = _g956.apply;
  var last = _g956.last;
  var atom63 = _g956["atom?"];
  var function63 = _g956["function?"];
  var none63 = _g956["none?"];
  var inner = _g956.inner;
  var write = _g956.write;
  var _ = _g956["-"];
  var string63 = _g956["string?"];
  var _g959 = nexus["lumen/lib"];
  var macroexpand = _g959.macroexpand;
  var getenv = _g959.getenv;
  var id = _g959.id;
  var variable63 = _g959["variable?"];
  var initial_environment = _g959["initial-environment"];
  var symbol63 = _g959["symbol?"];
  var indentation = _g959.indentation;
  var statement63 = _g959["statement?"];
  var stash42 = _g959["stash*"];
  var macro_function = _g959["macro-function"];
  var quote_modules = _g959["quote-modules"];
  var mapo = _g959.mapo;
  var link = _g959.link;
  var imported = _g959.imported;
  var bind42 = _g959["bind*"];
  var valid_id63 = _g959["valid-id?"];
  var symbol_expansion = _g959["symbol-expansion"];
  var quote_environment = _g959["quote-environment"];
  var quoted = _g959.quoted;
  var special_form63 = _g959["special-form?"];
  var key = _g959.key;
  var reserved63 = _g959["reserved?"];
  var bind = _g959.bind;
  var macro63 = _g959["macro?"];
  var special63 = _g959["special?"];
  var quasiexpand = _g959.quasiexpand;
  var bound63 = _g959["bound?"];
  var _g960 = nexus["lumen/compiler"];
  var declare = _g960.declare;
  var import_modules = _g960["import-modules"];
  var open_module = _g960["open-module"];
  var compile_function = _g960["compile-function"];
  var compile = _g960.compile;
  var compile_module = _g960["compile-module"];
  var load_module = _g960["load-module"];
  var eval = _g960.eval;
  var in_module = _g960["in-module"];
  global.modules = {"lumen/reader": {export: {delimiters: {variable: true}, "make-stream": {variable: true, export: true}, read: {variable: true, export: true}, "read-from-string": {variable: true, export: true}, "key?": {variable: true}, "flag?": {variable: true}, "define-reader": {export: true, macro: function (_g976) {
    var char = _g976[0];
    var stream = _g976[1];
    var _g975 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g975, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, whitespace: {variable: true}, "read-all": {variable: true, export: true}, "skip-non-code": {variable: true}, "read-char": {variable: true}, "peek-char": {variable: true}, "read-table": {variable: true, export: true}, eof: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {global: true, export: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"lower-body": {variable: true}, "compile-atom": {variable: true}, "lower-for": {variable: true}, "lower-special": {variable: true}, declare: {variable: true, export: true}, infix: {variable: true}, "lower-infix?": {variable: true}, getop: {variable: true}, "import-modules": {variable: true, export: true}, "compile-special": {variable: true}, "lower-statement": {variable: true}, "%compile-module": {variable: true}, "compile-args": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "current-module": {export: true, global: true}, "unary?": {variable: true}, lower: {variable: true}, "%result": {export: true, global: true}, "open-module": {variable: true, export: true}, "compile-function": {variable: true, export: true}, conclude: {variable: true}, run: {variable: true}, compile: {variable: true, export: true}, "lower-short": {variable: true}, "compile-module": {variable: true, export: true}, reimported: {variable: true}, "load-module": {variable: true, export: true}, "compiler-output": {variable: true}, "compiling?": {variable: true}, eval: {variable: true, export: true}, "compile-file": {variable: true}, "lower-if": {variable: true}, encapsulate: {variable: true}, "compile-call": {variable: true}, "module-path": {variable: true}, "lower-function": {variable: true}, process: {variable: true}, "lower-definition": {variable: true}, precedence: {variable: true}, "lower-call": {variable: true}, "lower-do": {variable: true}, "lower-infix": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "can-return?": {variable: true}, "infix?": {variable: true}, terminator: {variable: true}, "in-module": {variable: true, export: true}, "parenthesize-call?": {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/special": {export: {"not": {}, "%local": {foo: true, export: true, stmt: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g1076;
    if (is63(value)) {
      _g1076 = " = " + value1;
    } else {
      _g1076 = "";
    }
    var rh = _g1076;
    var _g1077;
    if (target === "js") {
      _g1077 = "var ";
    } else {
      _g1077 = "local ";
    }
    var keyword = _g1077;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }}, set: {foo: true, export: true, stmt: true, special: function (lh, rh) {
    var _g979 = compile(lh);
    var _g1078;
    if (nil63(rh)) {
      _g1078 = "nil";
    } else {
      _g1078 = rh;
    }
    var _g980 = compile(_g1078);
    return(indentation() + _g979 + " = " + _g980);
  }}, "%for": {foo: true, stmt: true, tr: true, export: true, special: function (t, k, form) {
    var _g982 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g983 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g983;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g982 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g982 + ") {\n" + body + ind + "}\n");
    }
  }}, "do": {foo: true, stmt: true, tr: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g984 = forms;
    var _g985 = 0;
    while (_g985 < length(_g984)) {
      var x = _g984[_g985];
      str = str + compile(x, {_stash: true, stmt: true});
      _g985 = _g985 + 1;
    }
    return(str);
  }}, "%try": {foo: true, stmt: true, tr: true, export: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g987 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g987;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g988 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g988;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }}, "break": {foo: true, export: true, stmt: true, special: function () {
    return(indentation() + "break");
  }}, "%object": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g1079;
    if (target === "lua") {
      _g1079 = " = ";
    } else {
      _g1079 = ": ";
    }
    var sep = _g1079;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g990 = pairs;
    var i = 0;
    while (i < length(_g990)) {
      var _g991 = _g990[i];
      var k = _g991[0];
      var v = _g991[1];
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
  }}, "%array": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g1080;
    if (target === "lua") {
      _g1080 = "{";
    } else {
      _g1080 = "[";
    }
    var open = _g1080;
    var _g1081;
    if (target === "lua") {
      _g1081 = "}";
    } else {
      _g1081 = "]";
    }
    var close = _g1081;
    var str = "";
    var _g992 = forms;
    var i = 0;
    while (i < length(_g992)) {
      var x = _g992[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }}, "%local-function": {foo: true, stmt: true, tr: true, export: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return(indentation() + x);
  }}, "return": {foo: true, export: true, stmt: true, special: function (x) {
    var _g1082;
    if (nil63(x)) {
      _g1082 = "return";
    } else {
      _g1082 = "return(" + compile(x) + ")";
    }
    var _g995 = _g1082;
    return(indentation() + _g995);
  }}, "%if": {foo: true, stmt: true, tr: true, export: true, special: function (cond, cons, alt) {
    var _g997 = compile(cond);
    indent_level = indent_level + 1;
    var _g999 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g998 = _g999;
    var _g1083;
    if (alt) {
      indent_level = indent_level + 1;
      var _g1001 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g1083 = _g1001;
    }
    var _g1000 = _g1083;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g997 + ") {\n" + _g998 + ind + "}";
    } else {
      str = str + ind + "if " + _g997 + " then\n" + _g998;
    }
    if (_g1000 && target === "js") {
      str = str + " else {\n" + _g1000 + ind + "}";
    } else {
      if (_g1000) {
        str = str + ind + "else\n" + _g1000;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }}, "%global-function": {foo: true, stmt: true, tr: true, export: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }}, get: {foo: true, export: true, special: function (t, k) {
    var _g1004 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g1004, 0) === "{") {
      _g1004 = "(" + _g1004 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g1004 + "." + inner(k));
    } else {
      return(_g1004 + "[" + k1 + "]");
    }
  }}, error: {foo: true, export: true, stmt: true, special: function (x) {
    var _g1084;
    if (target === "js") {
      _g1084 = "throw new " + compile(["Error", x]);
    } else {
      _g1084 = "error(" + compile(x) + ")";
    }
    var e = _g1084;
    return(indentation() + e);
  }}, "%function": {foo: true, export: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "while": {foo: true, stmt: true, tr: true, export: true, special: function (cond, form) {
    var _g1008 = compile(cond);
    indent_level = indent_level + 1;
    var _g1009 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g1009;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g1008 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g1008 + " do\n" + body + ind + "end\n");
    }
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/core": {export: {"set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, fn: {export: true, macro: function (args) {
    var _g1011 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1011, 0);
    var _g1012 = bind42(args, body);
    var _g1013 = _g1012[0];
    var _g1014 = _g1012[1];
    return(join(["%function", _g1013], _g1014));
  }}, list: {export: true, macro: function () {
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
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _g1016 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1016, 0);
    var form = join(["fn", args], body);
    var _g1017 = ["setenv", ["quote", name]];
    _g1017.form = ["quote", form];
    _g1017.macro = form;
    eval(_g1017);
    return(undefined);
  }}, target: {macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true, global: true}, "let-macro": {export: true, macro: function (definitions) {
    var _g1018 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1018, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1019 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1019);
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1022) {
      var a = _g1022[0];
      var b = _g1022[1];
      var c = sub(_g1022, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, "define-special": {export: true, macro: function (name, args) {
    var _g1024 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1024, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g1025 = ["setenv", ["quote", name]];
    _g1025.special = form;
    _g1025.form = ["quote", form];
    eval(join(_g1025, keys));
    return(undefined);
  }}, unless: {export: true, macro: function (cond) {
    var _g1026 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1026, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, let: {export: true, macro: function (bindings) {
    var _g1027 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1027, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g1028 = bind(lh, rh);
      var _g1029 = 0;
      while (_g1029 < length(_g1028)) {
        var _g1030 = _g1028[_g1029];
        var id = _g1030[0];
        var val = _g1030[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g1029 = _g1029 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
    }
  }}, when: {export: true, macro: function (cond) {
    var _g1031 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1031, 0);
    return(["if", cond, join(["do"], body)]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g1032 = xs;
    var _g1033 = 0;
    while (_g1033 < length(_g1032)) {
      var x = _g1032[_g1033];
      l[x] = true;
      _g1033 = _g1033 + 1;
    }
    return(join(["table"], l));
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "with-bindings": {export: true, macro: function (_g1036) {
    var names = _g1036[0];
    var _g1035 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1035, 0);
    var x = make_id();
    var _g1038 = ["setenv", x];
    _g1038.variable = true;
    var _g1037 = ["with-frame", ["each", [x], names, _g1038]];
    _g1037.scope = true;
    return(join(_g1037, body));
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, all: {export: true, macro: function (_g1042, t) {
    var k = _g1042[0];
    var v = _g1042[1];
    var _g1041 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1041, 0);
    var x = make_id();
    var n = make_id();
    var _g1085;
    if (target === "lua") {
      _g1085 = body;
    } else {
      _g1085 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g1085)]]);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _g1043 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1043, 0);
    add(environment, {});
    map(function (_g1046) {
      var name = _g1046[0];
      var exp = _g1046[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1044 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1044);
  }}, "join!": {export: true, macro: function (a) {
    var _g1047 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1047, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, at: {export: true, macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, "with-frame": {export: true, macro: function () {
    var _g1051 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g1051, 0);
    var scope = _g1051.scope;
    var x = make_id();
    var _g1052 = ["table"];
    _g1052._scope = scope;
    return(["do", ["add", "environment", _g1052], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, "define*": {export: true, macro: function (name, x) {
    var _g1054 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1054, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(body)) {
      var _g1055 = bind42(x, body);
      var args = _g1055[0];
      var _g1056 = _g1055[1];
      return(join(["%global-function", name, args], _g1056));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, each: {export: true, macro: function (b, t) {
    var _g1057 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1057, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g1086;
    if (nil63(v)) {
      var _g1087;
      if (b.i) {
        _g1087 = "i";
      } else {
        _g1087 = make_id();
      }
      var i = _g1087;
      _g1086 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], body), ["inc", i]]];
    } else {
      var _g1058 = ["target"];
      _g1058.lua = ["not", ["number?", k]];
      _g1058.js = ["isNaN", ["parseInt", k]];
      _g1086 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g1058, join(["let", [v, ["get", t1, k]]], body)]]];
    }
    return(["let", [t1, t], _g1086]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "define-module": {export: true, macro: function (spec) {
    var _g1060 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1060, 0);
    var alias = body.alias;
    var exp = body.export;
    var imp = body.import;
    var _g1061 = import_modules(imp);
    var imports = _g1061[0];
    var bindings = _g1061[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1062 = exp || [];
    var _g1063 = 0;
    while (_g1063 < length(_g1062)) {
      var x = _g1062[_g1063];
      setenv(x, {_stash: true, export: true});
      _g1063 = _g1063 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, define: {export: true, macro: function (name, x) {
    var _g1064 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1064, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1065 = bind42(x, body);
        var args = _g1065[0];
        var _g1066 = _g1065[1];
        return(link(name, join(["%local-function", name, args], _g1066)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, "cat!": {export: true, macro: function (a) {
    var _g1068 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1068, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/runtime": {export: {"id-count": {variable: true}, sort: {variable: true, export: true}, code: {variable: true, export: true}, hd: {variable: true, export: true}, "id-literal?": {variable: true, export: true}, "is?": {variable: true, export: true}, keep: {variable: true, export: true}, reverse: {variable: true, export: true}, "boolean?": {variable: true, export: true}, string: {variable: true, export: true}, ">": {variable: true, export: true}, join: {variable: true, export: true}, "<": {variable: true, export: true}, "=": {variable: true, export: true}, "table?": {variable: true, export: true}, map: {variable: true, export: true}, tl: {variable: true, export: true}, reduce: {variable: true, export: true}, "%": {variable: true, export: true}, "*": {variable: true, export: true}, "+": {variable: true, export: true}, fs: {variable: true}, number: {variable: true, export: true}, "/": {variable: true, export: true}, sub: {variable: true, export: true}, "string-literal?": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, setenv: {variable: true, export: true}, "keys?": {variable: true, export: true}, iterate: {variable: true, export: true}, add: {variable: true, export: true}, length: {variable: true, export: true}, space: {variable: true, export: true}, keys: {variable: true, export: true}, stash: {variable: true, export: true}, "write-file": {variable: true, export: true}, "list?": {variable: true, export: true}, drop: {variable: true, export: true}, substring: {variable: true, export: true}, char: {variable: true, export: true}, "number?": {variable: true, export: true}, pair: {variable: true, export: true}, cat: {variable: true, export: true}, "nil?": {variable: true, export: true}, replicate: {variable: true, export: true}, "in?": {variable: true, export: true}, print: {export: true, global: true}, require: {export: true, global: true}, shift: {variable: true}, "toplevel?": {variable: true, export: true}, type: {variable: true}, now: {variable: true, export: true}, series: {variable: true, export: true}, "module-key": {variable: true, export: true}, "make-id": {variable: true, export: true}, "empty?": {variable: true, export: true}, "read-file": {variable: true, export: true}, split: {variable: true, export: true}, today: {variable: true, export: true}, module: {variable: true, export: true}, unstash: {variable: true, export: true}, "composite?": {variable: true, export: true}, search: {variable: true, export: true}, find: {variable: true, export: true}, "<=": {variable: true, export: true}, "some?": {variable: true, export: true}, ">=": {variable: true, export: true}, exit: {variable: true, export: true}, "one?": {variable: true, export: true}, apply: {variable: true, export: true}, last: {variable: true, export: true}, "atom?": {variable: true, export: true}, "function?": {variable: true, export: true}, "none?": {variable: true, export: true}, inner: {variable: true, export: true}, write: {variable: true, export: true}, "-": {variable: true, export: true}, "string?": {variable: true, export: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/lib": {export: {macroexpand: {variable: true, export: true}, getenv: {variable: true, export: true}, id: {variable: true, export: true}, "variable?": {variable: true, export: true}, "initial-environment": {variable: true, export: true}, "symbol?": {variable: true, export: true}, indentation: {variable: true, export: true}, "statement?": {variable: true, export: true}, "stash*": {variable: true, export: true}, "macro-function": {variable: true, export: true}, "quote-modules": {variable: true, export: true}, "quote-module": {variable: true}, "indent-level": {export: true, global: true}, "quote-frame": {variable: true}, "quasisplice?": {variable: true}, "quote-binding": {variable: true}, mapo: {variable: true, export: true}, "quasiquote-list": {variable: true}, exclude: {variable: true}, "valid-code?": {variable: true}, link: {variable: true, export: true}, imported: {variable: true, export: true}, "bind*": {variable: true, export: true}, "valid-id?": {variable: true, export: true}, "symbol-expansion": {variable: true, export: true}, "quote-environment": {variable: true, export: true}, reserved: {variable: true}, quoted: {variable: true, export: true}, "can-unquote?": {variable: true}, "quasiquoting?": {variable: true}, "special-form?": {variable: true, export: true}, "quoting?": {variable: true}, key: {variable: true, export: true}, index: {variable: true}, "reserved?": {variable: true, export: true}, bind: {variable: true, export: true}, escape: {variable: true}, literal: {variable: true}, "global?": {variable: true}, "macro?": {variable: true, export: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "special?": {variable: true, export: true}, quasiexpand: {variable: true, export: true}, extend: {variable: true}, "numeric?": {variable: true}, "bound?": {variable: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {export: true, global: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _g1072 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1072, 0);
    var alias = body.alias;
    var exp = body.export;
    var imp = body.import;
    var _g1073 = import_modules(imp);
    var imports = _g1073[0];
    var bindings = _g1073[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1074 = exp || [];
    var _g1075 = 0;
    while (_g1075 < length(_g1074)) {
      var x = _g1074[_g1075];
      setenv(x, {_stash: true, export: true});
      _g1075 = _g1075 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g1088 = nexus["lumen/runtime"];
  var sort = _g1088.sort;
  var code = _g1088.code;
  var hd = _g1088.hd;
  var id_literal63 = _g1088["id-literal?"];
  var is63 = _g1088["is?"];
  var keep = _g1088.keep;
  var reverse = _g1088.reverse;
  var boolean63 = _g1088["boolean?"];
  var string = _g1088.string;
  var _62 = _g1088[">"];
  var join = _g1088.join;
  var _60 = _g1088["<"];
  var _61 = _g1088["="];
  var table63 = _g1088["table?"];
  var map = _g1088.map;
  var tl = _g1088.tl;
  var reduce = _g1088.reduce;
  var _37 = _g1088["%"];
  var _42 = _g1088["*"];
  var _43 = _g1088["+"];
  var number = _g1088.number;
  var _47 = _g1088["/"];
  var sub = _g1088.sub;
  var string_literal63 = _g1088["string-literal?"];
  var _37message_handler = _g1088["%message-handler"];
  var setenv = _g1088.setenv;
  var keys63 = _g1088["keys?"];
  var iterate = _g1088.iterate;
  var add = _g1088.add;
  var length = _g1088.length;
  var space = _g1088.space;
  var keys = _g1088.keys;
  var stash = _g1088.stash;
  var write_file = _g1088["write-file"];
  var list63 = _g1088["list?"];
  var drop = _g1088.drop;
  var substring = _g1088.substring;
  var char = _g1088.char;
  var number63 = _g1088["number?"];
  var pair = _g1088.pair;
  var cat = _g1088.cat;
  var nil63 = _g1088["nil?"];
  var replicate = _g1088.replicate;
  var in63 = _g1088["in?"];
  var toplevel63 = _g1088["toplevel?"];
  var now = _g1088.now;
  var series = _g1088.series;
  var module_key = _g1088["module-key"];
  var make_id = _g1088["make-id"];
  var empty63 = _g1088["empty?"];
  var read_file = _g1088["read-file"];
  var split = _g1088.split;
  var today = _g1088.today;
  var module = _g1088.module;
  var unstash = _g1088.unstash;
  var composite63 = _g1088["composite?"];
  var search = _g1088.search;
  var find = _g1088.find;
  var _6061 = _g1088["<="];
  var some63 = _g1088["some?"];
  var _6261 = _g1088[">="];
  var exit = _g1088.exit;
  var one63 = _g1088["one?"];
  var apply = _g1088.apply;
  var last = _g1088.last;
  var atom63 = _g1088["atom?"];
  var function63 = _g1088["function?"];
  var none63 = _g1088["none?"];
  var inner = _g1088.inner;
  var write = _g1088.write;
  var _ = _g1088["-"];
  var string63 = _g1088["string?"];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var composite63 = _g2["composite?"];
  var code = _g2.code;
  var hd = _g2.hd;
  var one63 = _g2["one?"];
  var is63 = _g2["is?"];
  var last = _g2.last;
  var reverse = _g2.reverse;
  var boolean63 = _g2["boolean?"];
  var string = _g2.string;
  var _62 = _g2[">"];
  var join = _g2.join;
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var table63 = _g2["table?"];
  var map = _g2.map;
  var tl = _g2.tl;
  var reduce = _g2.reduce;
  var _37 = _g2["%"];
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var number = _g2.number;
  var _47 = _g2["/"];
  var sub = _g2.sub;
  var string63 = _g2["string?"];
  var _37message_handler = _g2["%message-handler"];
  var setenv = _g2.setenv;
  var keys63 = _g2["keys?"];
  var iterate = _g2.iterate;
  var add = _g2.add;
  var length = _g2.length;
  var space = _g2.space;
  var keys = _g2.keys;
  var stash = _g2.stash;
  var write_file = _g2["write-file"];
  var list63 = _g2["list?"];
  var drop = _g2.drop;
  var substring = _g2.substring;
  var char = _g2.char;
  var number63 = _g2["number?"];
  var none63 = _g2["none?"];
  var cat = _g2.cat;
  var nil63 = _g2["nil?"];
  var replicate = _g2.replicate;
  var inner = _g2.inner;
  var toplevel63 = _g2["toplevel?"];
  var exit = _g2.exit;
  var series = _g2.series;
  var module_key = _g2["module-key"];
  var make_id = _g2["make-id"];
  var empty63 = _g2["empty?"];
  var unstash = _g2.unstash;
  var now = _g2.now;
  var today = _g2.today;
  var module = _g2.module;
  var keep = _g2.keep;
  var read_file = _g2["read-file"];
  var search = _g2.search;
  var find = _g2.find;
  var _6061 = _g2["<="];
  var some63 = _g2["some?"];
  var _6261 = _g2[">="];
  var _ = _g2["-"];
  var split = _g2.split;
  var apply = _g2.apply;
  var sort = _g2.sort;
  var atom63 = _g2["atom?"];
  var function63 = _g2["function?"];
  var pair = _g2.pair;
  var in63 = _g2["in?"];
  var write = _g2.write;
  var id_literal63 = _g2["id-literal?"];
  var string_literal63 = _g2["string-literal?"];
  var _g5 = nexus["lumen/reader"];
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var _g6 = nexus["lumen/compiler"];
  var declare = _g6.declare;
  var import_modules = _g6["import-modules"];
  var in_module = _g6["in-module"];
  var open_module = _g6["open-module"];
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var compile_module = _g6["compile-module"];
  var load_module = _g6["load-module"];
  var eval = _g6.eval;
  var rep = function (str) {
    var _g1092 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g1099) {
        return([false, _g1099.message]);
      }
    })();
    var _g1 = _g1092[0];
    var x = _g1092[1];
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
    var _g1098 = args;
    var i = 0;
    while (i < length(_g1098)) {
      var arg = _g1098[i];
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
