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
      var _g176;
      if (nil63(from) || from < 0) {
        _g176 = 0;
      } else {
        _g176 = from;
      }
      var i = _g176;
      var n = length(x);
      var _g177;
      if (nil63(upto) || upto > n) {
        _g177 = n;
      } else {
        _g177 = upto;
      }
      var _g58 = _g177;
      while (i < _g58) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g59 = x;
      var k = undefined;
      for (k in _g59) {
        var v = _g59[k];
        var _g60 = parseInt(k);
        var _g178;
        if (isNaN(_g60)) {
          _g178 = k;
        } else {
          _g178 = _g60;
        }
        var _g61 = _g178;
        if (!number63(_g61)) {
          l[_g61] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
  var keys = function (x) {
    var t = [];
    var _g63 = x;
    var k = undefined;
    for (k in _g63) {
      var v = _g63[k];
      var _g64 = parseInt(k);
      var _g179;
      if (isNaN(_g64)) {
        _g179 = k;
      } else {
        _g179 = _g64;
      }
      var _g65 = _g179;
      if (!number63(_g65)) {
        t[_g65] = v;
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
  var butlast = function (l) {
    return(sub(l, 0, length(l) - 1));
  };
  nexus["lumen/runtime"].butlast = butlast;
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
      var _g78 = a;
      var k = undefined;
      for (k in _g78) {
        var v = _g78[k];
        var _g79 = parseInt(k);
        var _g180;
        if (isNaN(_g79)) {
          _g180 = k;
        } else {
          _g180 = _g79;
        }
        var _g80 = _g180;
        c[_g80] = v;
      }
      var _g81 = b;
      var k = undefined;
      for (k in _g81) {
        var v = _g81[k];
        var _g82 = parseInt(k);
        var _g181;
        if (isNaN(_g82)) {
          _g181 = k;
        } else {
          _g181 = _g82;
        }
        var _g83 = _g181;
        if (number63(_g83)) {
          _g83 = _g83 + o;
        }
        c[_g83] = v;
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
    var _g87 = x;
    var k = undefined;
    for (k in _g87) {
      var v = _g87[k];
      var _g88 = parseInt(k);
      var _g182;
      if (isNaN(_g88)) {
        _g182 = k;
      } else {
        _g182 = _g88;
      }
      var _g89 = _g182;
      if (f(v)) {
        t[shift(_g89, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g91 = t;
    var _g32 = undefined;
    for (_g32 in _g91) {
      var y = _g91[_g32];
      var _g92 = parseInt(_g32);
      var _g183;
      if (isNaN(_g92)) {
        _g183 = _g32;
      } else {
        _g183 = _g92;
      }
      var _g93 = _g183;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g95 = t;
    var _g33 = undefined;
    for (_g33 in _g95) {
      var x = _g95[_g33];
      var _g96 = parseInt(_g33);
      var _g184;
      if (isNaN(_g96)) {
        _g184 = _g33;
      } else {
        _g184 = _g96;
      }
      var _g97 = _g184;
      var _g98 = f(x);
      if (_g98) {
        return(_g98);
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
    var _g185;
    if (f) {
      _g185 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g185));
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
    var _g109 = x;
    var k = undefined;
    for (k in _g109) {
      var v = _g109[k];
      var _g110 = parseInt(k);
      var _g186;
      if (isNaN(_g110)) {
        _g186 = k;
      } else {
        _g186 = _g110;
      }
      var _g111 = _g186;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g111, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _g113 = t;
    var k = undefined;
    for (k in _g113) {
      var _g34 = _g113[k];
      var _g114 = parseInt(k);
      var _g187;
      if (isNaN(_g114)) {
        _g187 = k;
      } else {
        _g187 = _g114;
      }
      var _g115 = _g187;
      if (!number63(_g115)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _g117 = t;
    var _g35 = undefined;
    for (_g35 in _g117) {
      var _g36 = _g117[_g35];
      var _g118 = parseInt(_g35);
      var _g188;
      if (isNaN(_g118)) {
        _g188 = _g35;
      } else {
        _g188 = _g118;
      }
      var _g119 = _g188;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _g121 = args;
      var k = undefined;
      for (k in _g121) {
        var v = _g121[k];
        var _g122 = parseInt(k);
        var _g189;
        if (isNaN(_g122)) {
          _g189 = k;
        } else {
          _g189 = _g122;
        }
        var _g123 = _g189;
        if (!number63(_g123)) {
          p[_g123] = v;
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
        var args1 = butlast(args);
        var _g125 = l;
        var k = undefined;
        for (k in _g125) {
          var v = _g125[k];
          var _g126 = parseInt(k);
          var _g190;
          if (isNaN(_g126)) {
            _g190 = k;
          } else {
            _g190 = _g126;
          }
          var _g127 = _g190;
          if (!(_g127 === "_stash")) {
            args1[_g127] = v;
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
            var _g152 = x;
            var k = undefined;
            for (k in _g152) {
              var v = _g152[k];
              var _g153 = parseInt(k);
              var _g191;
              if (isNaN(_g153)) {
                _g191 = k;
              } else {
                _g191 = _g153;
              }
              var _g154 = _g191;
              if (number63(_g154)) {
                xs[_g154] = string(v);
              } else {
                add(ks, _g154 + ":");
                add(ks, string(v));
              }
            }
            var _g155 = join(xs, ks);
            var _g37 = undefined;
            for (_g37 in _g155) {
              var v = _g155[_g37];
              var _g156 = parseInt(_g37);
              var _g192;
              if (isNaN(_g156)) {
                _g192 = _g37;
              } else {
                _g192 = _g156;
              }
              var _g157 = _g192;
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
    var _g164 = stash(args);
    return(f.apply(f, _g164));
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
    var _g171 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g171, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g172 = keys;
      var _g174 = undefined;
      for (_g174 in _g172) {
        var v = _g172[_g174];
        var _g173 = parseInt(_g174);
        var _g193;
        if (isNaN(_g173)) {
          _g193 = _g174;
        } else {
          _g193 = _g173;
        }
        var _g175 = _g193;
        x[_g175] = v;
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
  var _g197 = nexus["lumen/runtime"];
  var hd = _g197.hd;
  var iterate = _g197.iterate;
  var sub = _g197.sub;
  var _37message_handler = _g197["%message-handler"];
  var table63 = _g197["table?"];
  var exit = _g197.exit;
  var butlast = _g197.butlast;
  var function63 = _g197["function?"];
  var toplevel63 = _g197["toplevel?"];
  var reduce = _g197.reduce;
  var empty63 = _g197["empty?"];
  var setenv = _g197.setenv;
  var char = _g197.char;
  var atom63 = _g197["atom?"];
  var write = _g197.write;
  var nil63 = _g197["nil?"];
  var replicate = _g197.replicate;
  var last = _g197.last;
  var add = _g197.add;
  var length = _g197.length;
  var series = _g197.series;
  var today = _g197.today;
  var list63 = _g197["list?"];
  var make_id = _g197["make-id"];
  var code = _g197.code;
  var pair = _g197.pair;
  var _42 = _g197["*"];
  var _43 = _g197["+"];
  var search = _g197.search;
  var sort = _g197.sort;
  var _47 = _g197["/"];
  var _ = _g197["-"];
  var substring = _g197.substring;
  var stash = _g197.stash;
  var string = _g197.string;
  var id_literal63 = _g197["id-literal?"];
  var one63 = _g197["one?"];
  var _62 = _g197[">"];
  var in63 = _g197["in?"];
  var _61 = _g197["="];
  var find = _g197.find;
  var inner = _g197.inner;
  var module_key = _g197["module-key"];
  var unstash = _g197.unstash;
  var join = _g197.join;
  var module = _g197.module;
  var apply = _g197.apply;
  var now = _g197.now;
  var space = _g197.space;
  var number = _g197.number;
  var reverse = _g197.reverse;
  var string63 = _g197["string?"];
  var none63 = _g197["none?"];
  var split = _g197.split;
  var drop = _g197.drop;
  var _6061 = _g197["<="];
  var write_file = _g197["write-file"];
  var _6261 = _g197[">="];
  var map = _g197.map;
  var composite63 = _g197["composite?"];
  var read_file = _g197["read-file"];
  var _60 = _g197["<"];
  var keys = _g197.keys;
  var number63 = _g197["number?"];
  var cat = _g197.cat;
  var tl = _g197.tl;
  var keys63 = _g197["keys?"];
  var string_literal63 = _g197["string-literal?"];
  var is63 = _g197["is?"];
  var boolean63 = _g197["boolean?"];
  var some63 = _g197["some?"];
  var keep = _g197.keep;
  var _37 = _g197["%"];
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
      var _g372;
      if (c === "\n") {
        _g372 = "\\n";
      } else {
        var _g373;
        if (c === "\"") {
          _g373 = "\\\"";
        } else {
          var _g374;
          if (c === "\\") {
            _g374 = "\\\\";
          } else {
            _g374 = c;
          }
          _g373 = _g374;
        }
        _g372 = _g373;
      }
      var c1 = _g372;
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
      var _g219 = args;
      var k = undefined;
      for (k in _g219) {
        var v = _g219[k];
        var _g220 = parseInt(k);
        var _g375;
        if (isNaN(_g220)) {
          _g375 = k;
        } else {
          _g375 = _g220;
        }
        var _g221 = _g375;
        if (!number63(_g221)) {
          add(l, literal(_g221));
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
        var _g230 = lh;
        var k = undefined;
        for (k in _g230) {
          var v = _g230[k];
          var _g231 = parseInt(k);
          var _g376;
          if (isNaN(_g231)) {
            _g376 = k;
          } else {
            _g376 = _g231;
          }
          var _g232 = _g376;
          var _g377;
          if (_g232 === "&") {
            _g377 = ["sub", rh, length(lh)];
          } else {
            _g377 = ["get", rh, ["quote", bias(_g232)]];
          }
          var x = _g377;
          var _g378;
          if (v === true) {
            _g378 = _g232;
          } else {
            _g378 = v;
          }
          var _g236 = _g378;
          bs = join(bs, bind(_g236, x));
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
      var _g253 = args;
      var k = undefined;
      for (k in _g253) {
        var v = _g253[k];
        var _g254 = parseInt(k);
        var _g379;
        if (isNaN(_g254)) {
          _g379 = k;
        } else {
          _g379 = _g254;
        }
        var _g255 = _g379;
        if (number63(_g255)) {
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
          var _g194 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g195 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g270 = args;
            var _g951 = undefined;
            for (_g951 in _g270) {
              var _g268 = _g270[_g951];
              var _g271 = parseInt(_g951);
              var _g381;
              if (isNaN(_g271)) {
                _g381 = _g951;
              } else {
                _g381 = _g271;
              }
              var _g272 = _g381;
              setenv(_g268, {_stash: true, variable: true});
            }
            var _g269 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g269);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g196 = form[0];
              var _g274 = form[1];
              var _g275 = form[2];
              var _g276 = sub(form, 3);
              add(environment, {_scope: true});
              var _g279 = _g275;
              var _g951 = undefined;
              for (_g951 in _g279) {
                var _g277 = _g279[_g951];
                var _g280 = parseInt(_g951);
                var _g380;
                if (isNaN(_g280)) {
                  _g380 = _g951;
                } else {
                  _g380 = _g280;
                }
                var _g281 = _g380;
                setenv(_g277, {_stash: true, variable: true});
              }
              var _g278 = join([x, _g274, _g275], macroexpand(_g276));
              drop(environment);
              return(_g278);
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
    var _g286 = form;
    var k = undefined;
    for (k in _g286) {
      var v = _g286[k];
      var _g287 = parseInt(k);
      var _g382;
      if (isNaN(_g287)) {
        _g382 = k;
      } else {
        _g382 = _g287;
      }
      var _g288 = _g382;
      if (!number63(_g288)) {
        var _g383;
        if (quasisplice63(v, depth)) {
          _g383 = quasiexpand(v[1]);
        } else {
          _g383 = quasiexpand(v, depth);
        }
        var _g289 = _g383;
        last(xs)[_g288] = _g289;
      }
    }
    series(function (x) {
      if (quasisplice63(x, depth)) {
        var _g291 = quasiexpand(x[1]);
        add(xs, _g291);
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
  var reserved = {"if": true, "elseif": true, "void": true, "end": true, "with": true, "true": true, "else": true, "catch": true, ">=": true, "*": true, "break": true, "instanceof": true, "<=": true, "try": true, "var": true, "debugger": true, "repeat": true, "local": true, ">": true, "=": true, "==": true, "delete": true, "this": true, "<": true, "for": true, "do": true, "continue": true, "finally": true, "false": true, "not": true, "until": true, "then": true, "function": true, "switch": true, "new": true, "and": true, "nil": true, "return": true, "%": true, "or": true, "while": true, "in": true, "+": true, "case": true, "-": true, "/": true, "throw": true, "typeof": true, "default": true};
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
      var _g384;
      if (c === "-") {
        _g384 = "_";
      } else {
        var _g385;
        if (valid_code63(n)) {
          _g385 = c;
        } else {
          var _g386;
          if (i === 0) {
            _g386 = "_" + n;
          } else {
            _g386 = n;
          }
          _g385 = _g386;
        }
        _g384 = _g385;
      }
      var c1 = _g384;
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
    var _g330 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g330.private;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g331 = module(spec).export;
      var _g333 = undefined;
      for (_g333 in _g331) {
        var v = _g331[_g333];
        var _g332 = parseInt(_g333);
        var _g387;
        if (isNaN(_g332)) {
          _g387 = _g333;
        } else {
          _g387 = _g332;
        }
        var _g334 = _g387;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _g334, ["get", m, ["quote", _g334]]]);
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
    var _g349 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_g349, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _g350 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g350, 0);
    var t1 = [];
    var _g351 = t;
    var k = undefined;
    for (k in _g351) {
      var v = _g351[k];
      var _g352 = parseInt(k);
      var _g388;
      if (isNaN(_g352)) {
        _g388 = k;
      } else {
        _g388 = _g352;
      }
      var _g353 = _g388;
      if (!keys[_g353]) {
        t1[_g353] = v;
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
    var _g357 = t;
    var k = undefined;
    for (k in _g357) {
      var v = _g357[k];
      var _g358 = parseInt(k);
      var _g389;
      if (isNaN(_g358)) {
        _g389 = k;
      } else {
        _g389 = _g358;
      }
      var _g359 = _g389;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_g359));
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
    var _g367 = ["table"];
    _g367.alias = quoted(m.alias);
    _g367.export = quote_frame(m.export);
    _g367.import = quoted(m.import);
    return(_g367);
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
  var _g390 = nexus["lumen/runtime"];
  var hd = _g390.hd;
  var iterate = _g390.iterate;
  var sub = _g390.sub;
  var _37message_handler = _g390["%message-handler"];
  var table63 = _g390["table?"];
  var exit = _g390.exit;
  var butlast = _g390.butlast;
  var function63 = _g390["function?"];
  var toplevel63 = _g390["toplevel?"];
  var reduce = _g390.reduce;
  var empty63 = _g390["empty?"];
  var setenv = _g390.setenv;
  var char = _g390.char;
  var atom63 = _g390["atom?"];
  var write = _g390.write;
  var nil63 = _g390["nil?"];
  var replicate = _g390.replicate;
  var last = _g390.last;
  var add = _g390.add;
  var length = _g390.length;
  var series = _g390.series;
  var today = _g390.today;
  var list63 = _g390["list?"];
  var make_id = _g390["make-id"];
  var code = _g390.code;
  var pair = _g390.pair;
  var _42 = _g390["*"];
  var _43 = _g390["+"];
  var search = _g390.search;
  var sort = _g390.sort;
  var _47 = _g390["/"];
  var _ = _g390["-"];
  var substring = _g390.substring;
  var stash = _g390.stash;
  var string = _g390.string;
  var id_literal63 = _g390["id-literal?"];
  var one63 = _g390["one?"];
  var _62 = _g390[">"];
  var in63 = _g390["in?"];
  var _61 = _g390["="];
  var find = _g390.find;
  var inner = _g390.inner;
  var module_key = _g390["module-key"];
  var unstash = _g390.unstash;
  var join = _g390.join;
  var module = _g390.module;
  var apply = _g390.apply;
  var now = _g390.now;
  var space = _g390.space;
  var number = _g390.number;
  var reverse = _g390.reverse;
  var string63 = _g390["string?"];
  var none63 = _g390["none?"];
  var split = _g390.split;
  var drop = _g390.drop;
  var _6061 = _g390["<="];
  var write_file = _g390["write-file"];
  var _6261 = _g390[">="];
  var map = _g390.map;
  var composite63 = _g390["composite?"];
  var read_file = _g390["read-file"];
  var _60 = _g390["<"];
  var keys = _g390.keys;
  var number63 = _g390["number?"];
  var cat = _g390.cat;
  var tl = _g390.tl;
  var keys63 = _g390["keys?"];
  var string_literal63 = _g390["string-literal?"];
  var is63 = _g390["is?"];
  var boolean63 = _g390["boolean?"];
  var some63 = _g390["some?"];
  var keep = _g390.keep;
  var _37 = _g390["%"];
  var delimiters = {")": true, "\n": true, "(": true, ";": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {"\n": true, "\t": true, " ": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({len: length(str), string: str, pos: 0});
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
          var k = butlast(x);
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
  var _g440 = nexus["lumen/runtime"];
  var hd = _g440.hd;
  var iterate = _g440.iterate;
  var sub = _g440.sub;
  var _37message_handler = _g440["%message-handler"];
  var table63 = _g440["table?"];
  var exit = _g440.exit;
  var butlast = _g440.butlast;
  var function63 = _g440["function?"];
  var toplevel63 = _g440["toplevel?"];
  var reduce = _g440.reduce;
  var empty63 = _g440["empty?"];
  var setenv = _g440.setenv;
  var char = _g440.char;
  var atom63 = _g440["atom?"];
  var write = _g440.write;
  var nil63 = _g440["nil?"];
  var replicate = _g440.replicate;
  var last = _g440.last;
  var add = _g440.add;
  var length = _g440.length;
  var series = _g440.series;
  var today = _g440.today;
  var list63 = _g440["list?"];
  var make_id = _g440["make-id"];
  var code = _g440.code;
  var pair = _g440.pair;
  var _42 = _g440["*"];
  var _43 = _g440["+"];
  var search = _g440.search;
  var sort = _g440.sort;
  var _47 = _g440["/"];
  var _ = _g440["-"];
  var substring = _g440.substring;
  var stash = _g440.stash;
  var string = _g440.string;
  var id_literal63 = _g440["id-literal?"];
  var one63 = _g440["one?"];
  var _62 = _g440[">"];
  var in63 = _g440["in?"];
  var _61 = _g440["="];
  var find = _g440.find;
  var inner = _g440.inner;
  var module_key = _g440["module-key"];
  var unstash = _g440.unstash;
  var join = _g440.join;
  var module = _g440.module;
  var apply = _g440.apply;
  var now = _g440.now;
  var space = _g440.space;
  var number = _g440.number;
  var reverse = _g440.reverse;
  var string63 = _g440["string?"];
  var none63 = _g440["none?"];
  var split = _g440.split;
  var drop = _g440.drop;
  var _6061 = _g440["<="];
  var write_file = _g440["write-file"];
  var _6261 = _g440[">="];
  var map = _g440.map;
  var composite63 = _g440["composite?"];
  var read_file = _g440["read-file"];
  var _60 = _g440["<"];
  var keys = _g440.keys;
  var number63 = _g440["number?"];
  var cat = _g440.cat;
  var tl = _g440.tl;
  var keys63 = _g440["keys?"];
  var string_literal63 = _g440["string-literal?"];
  var is63 = _g440["is?"];
  var boolean63 = _g440["boolean?"];
  var some63 = _g440["some?"];
  var keep = _g440.keep;
  var _37 = _g440["%"];
  var _g443 = nexus["lumen/lib"];
  var bound63 = _g443["bound?"];
  var key = _g443.key;
  var special_form63 = _g443["special-form?"];
  var quasiexpand = _g443.quasiexpand;
  var quoted = _g443.quoted;
  var macroexpand = _g443.macroexpand;
  var bind = _g443.bind;
  var valid_id63 = _g443["valid-id?"];
  var quote_environment = _g443["quote-environment"];
  var index = _g443.index;
  var symbol63 = _g443["symbol?"];
  var stash42 = _g443["stash*"];
  var imported = _g443.imported;
  var mapo = _g443.mapo;
  var reserved63 = _g443["reserved?"];
  var symbol_expansion = _g443["symbol-expansion"];
  var macro_function = _g443["macro-function"];
  var initial_environment = _g443["initial-environment"];
  var statement63 = _g443["statement?"];
  var variable63 = _g443["variable?"];
  var indentation = _g443.indentation;
  var getenv = _g443.getenv;
  var quote_modules = _g443["quote-modules"];
  var id = _g443.id;
  var macro63 = _g443["macro?"];
  var special63 = _g443["special?"];
  var bind42 = _g443["bind*"];
  var link = _g443.link;
  var _g444 = nexus["lumen/reader"];
  var make_stream = _g444["make-stream"];
  var read_from_string = _g444["read-from-string"];
  var read_table = _g444["read-table"];
  var read_all = _g444["read-all"];
  var read = _g444.read;
  var _g447 = [];
  var _g448 = [];
  _g448.lua = "not ";
  _g448.js = "!";
  _g447["not"] = _g448;
  var _g450 = [];
  _g450["*"] = true;
  _g450["/"] = true;
  _g450["%"] = true;
  var _g452 = [];
  _g452["-"] = true;
  _g452["+"] = true;
  var _g454 = [];
  var _g455 = [];
  _g455.lua = "..";
  _g455.js = "+";
  _g454.cat = _g455;
  var _g457 = [];
  _g457[">"] = true;
  _g457["<="] = true;
  _g457["<"] = true;
  _g457[">="] = true;
  var _g459 = [];
  var _g460 = [];
  _g460.lua = "~=";
  _g460.js = "!=";
  _g459["~="] = _g460;
  var _g461 = [];
  _g461.lua = "==";
  _g461.js = "===";
  _g459["="] = _g461;
  var _g463 = [];
  var _g464 = [];
  _g464.lua = "and";
  _g464.js = "&&";
  _g463["and"] = _g464;
  var _g466 = [];
  var _g467 = [];
  _g467.lua = "or";
  _g467.js = "||";
  _g466["or"] = _g467;
  var infix = [_g447, _g450, _g452, _g454, _g457, _g459, _g463, _g466];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g471 = infix;
      var k = undefined;
      for (k in _g471) {
        var v = _g471[k];
        var _g472 = parseInt(k);
        var _g581;
        if (isNaN(_g472)) {
          _g581 = k;
        } else {
          _g581 = _g472;
        }
        var _g473 = _g581;
        if (v[hd(form)]) {
          return(index(_g473));
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
    var _g482 = getenv(x);
    var stmt = _g482.stmt;
    var self_tr63 = _g482.tr;
    var special = _g482.special;
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
    var _g485 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g485.right;
    var _g582;
    if (right) {
      _g582 = _6261;
    } else {
      _g582 = _62;
    }
    if (_g582(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g489 = sub(form, 1);
    var a = _g489[0];
    var b = _g489[1];
    var _g490 = op_delims(form, a);
    var ao = _g490[0];
    var ac = _g490[1];
    var _g491 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g491[0];
    var bc = _g491[1];
    var _g492 = compile(a);
    var _g493 = compile(b);
    var _g494 = getop(op);
    if (unary63(form)) {
      return(_g494 + ao + _g492 + ac);
    } else {
      return(ao + _g492 + ac + " " + _g494 + " " + bo + _g493 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g495 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g495.name;
    var prefix = _g495.prefix;
    var _g583;
    if (name) {
      _g583 = compile(name);
    } else {
      _g583 = "";
    }
    var id = _g583;
    var _g496 = prefix || "";
    var _g497 = compile_args(args);
    indent_level = indent_level + 1;
    var _g499 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g498 = _g499;
    var ind = indentation();
    var _g584;
    if (target === "js") {
      _g584 = "";
    } else {
      _g584 = "end";
    }
    var tr = _g584;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g497 + " {\n" + _g498 + ind + "}" + tr);
    } else {
      return(_g496 + "function " + id + _g497 + "\n" + _g498 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g501 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g501.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g585;
        if (stmt) {
          _g585 = indentation();
        } else {
          _g585 = "";
        }
        var ind = _g585;
        var _g586;
        if (atom63(form)) {
          _g586 = compile_atom(form);
        } else {
          var _g587;
          if (infix63(hd(form))) {
            _g587 = compile_infix(form);
          } else {
            _g587 = compile_call(form);
          }
          _g586 = _g587;
        }
        var _g502 = _g586;
        return(ind + _g502 + tr);
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
    series(function (x) {
      return(add(hoist, lower(x, hoist, stmt63)));
    }, butlast(args));
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
    var _g513 = args[1];
    var _g514 = args[2];
    if (stmt63 || tail63) {
      var _g589;
      if (_g514) {
        _g589 = [lower_body([_g514], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g513], tail63)], _g589)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g588;
      if (_g514) {
        _g588 = [lower(["set", e, _g514])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g513])], _g588));
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
      var _g590;
      if (x === "and") {
        _g590 = ["%if", id, b, id];
      } else {
        _g590 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g590], hoist));
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
    var _g539 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g539, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g542 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g542)) {
      return(_g542);
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
    var _g563 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g563.private;
    var m = module(spec);
    var frame = last(environment);
    var _g564 = m.export;
    var k = undefined;
    for (k in _g564) {
      var v = _g564[k];
      var _g565 = parseInt(k);
      var _g591;
      if (isNaN(_g565)) {
        _g591 = k;
      } else {
        _g591 = _g565;
      }
      var _g566 = _g591;
      if (v.export || private) {
        frame[_g566] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g567 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g567.private;
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
        var _g571 = import_modules(m.alias);
        var aliased = _g571[0];
        var bs = _g571[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g572 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g572);
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
  var _g592 = nexus["lumen/runtime"];
  var hd = _g592.hd;
  var iterate = _g592.iterate;
  var sub = _g592.sub;
  var _37message_handler = _g592["%message-handler"];
  var table63 = _g592["table?"];
  var exit = _g592.exit;
  var butlast = _g592.butlast;
  var function63 = _g592["function?"];
  var toplevel63 = _g592["toplevel?"];
  var reduce = _g592.reduce;
  var empty63 = _g592["empty?"];
  var setenv = _g592.setenv;
  var char = _g592.char;
  var atom63 = _g592["atom?"];
  var write = _g592.write;
  var nil63 = _g592["nil?"];
  var replicate = _g592.replicate;
  var last = _g592.last;
  var add = _g592.add;
  var length = _g592.length;
  var series = _g592.series;
  var today = _g592.today;
  var list63 = _g592["list?"];
  var make_id = _g592["make-id"];
  var code = _g592.code;
  var pair = _g592.pair;
  var _42 = _g592["*"];
  var _43 = _g592["+"];
  var search = _g592.search;
  var sort = _g592.sort;
  var _47 = _g592["/"];
  var _ = _g592["-"];
  var substring = _g592.substring;
  var stash = _g592.stash;
  var string = _g592.string;
  var id_literal63 = _g592["id-literal?"];
  var one63 = _g592["one?"];
  var _62 = _g592[">"];
  var in63 = _g592["in?"];
  var _61 = _g592["="];
  var find = _g592.find;
  var inner = _g592.inner;
  var module_key = _g592["module-key"];
  var unstash = _g592.unstash;
  var join = _g592.join;
  var module = _g592.module;
  var apply = _g592.apply;
  var now = _g592.now;
  var space = _g592.space;
  var number = _g592.number;
  var reverse = _g592.reverse;
  var string63 = _g592["string?"];
  var none63 = _g592["none?"];
  var split = _g592.split;
  var drop = _g592.drop;
  var _6061 = _g592["<="];
  var write_file = _g592["write-file"];
  var _6261 = _g592[">="];
  var map = _g592.map;
  var composite63 = _g592["composite?"];
  var read_file = _g592["read-file"];
  var _60 = _g592["<"];
  var keys = _g592.keys;
  var number63 = _g592["number?"];
  var cat = _g592.cat;
  var tl = _g592.tl;
  var keys63 = _g592["keys?"];
  var string_literal63 = _g592["string-literal?"];
  var is63 = _g592["is?"];
  var boolean63 = _g592["boolean?"];
  var some63 = _g592["some?"];
  var keep = _g592.keep;
  var _37 = _g592["%"];
  var _g595 = nexus["lumen/lib"];
  var bound63 = _g595["bound?"];
  var key = _g595.key;
  var special_form63 = _g595["special-form?"];
  var quasiexpand = _g595.quasiexpand;
  var quoted = _g595.quoted;
  var macroexpand = _g595.macroexpand;
  var bind = _g595.bind;
  var valid_id63 = _g595["valid-id?"];
  var quote_environment = _g595["quote-environment"];
  var index = _g595.index;
  var symbol63 = _g595["symbol?"];
  var stash42 = _g595["stash*"];
  var imported = _g595.imported;
  var mapo = _g595.mapo;
  var reserved63 = _g595["reserved?"];
  var symbol_expansion = _g595["symbol-expansion"];
  var macro_function = _g595["macro-function"];
  var initial_environment = _g595["initial-environment"];
  var statement63 = _g595["statement?"];
  var variable63 = _g595["variable?"];
  var indentation = _g595.indentation;
  var getenv = _g595.getenv;
  var quote_modules = _g595["quote-modules"];
  var id = _g595.id;
  var macro63 = _g595["macro?"];
  var special63 = _g595["special?"];
  var bind42 = _g595["bind*"];
  var link = _g595.link;
  var _g596 = nexus["lumen/compiler"];
  var open_module = _g596["open-module"];
  var eval = _g596.eval;
  var compile_function = _g596["compile-function"];
  var import_modules = _g596["import-modules"];
  var compile = _g596.compile;
  var load_module = _g596["load-module"];
  var compile_module = _g596["compile-module"];
  var declare = _g596.declare;
  var in_module = _g596["in-module"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g993 = nexus["lumen/runtime"];
  var hd = _g993.hd;
  var iterate = _g993.iterate;
  var sub = _g993.sub;
  var _37message_handler = _g993["%message-handler"];
  var table63 = _g993["table?"];
  var exit = _g993.exit;
  var butlast = _g993.butlast;
  var function63 = _g993["function?"];
  var toplevel63 = _g993["toplevel?"];
  var reduce = _g993.reduce;
  var empty63 = _g993["empty?"];
  var setenv = _g993.setenv;
  var char = _g993.char;
  var atom63 = _g993["atom?"];
  var write = _g993.write;
  var nil63 = _g993["nil?"];
  var replicate = _g993.replicate;
  var last = _g993.last;
  var add = _g993.add;
  var length = _g993.length;
  var series = _g993.series;
  var today = _g993.today;
  var list63 = _g993["list?"];
  var make_id = _g993["make-id"];
  var code = _g993.code;
  var pair = _g993.pair;
  var _42 = _g993["*"];
  var _43 = _g993["+"];
  var search = _g993.search;
  var sort = _g993.sort;
  var _47 = _g993["/"];
  var _ = _g993["-"];
  var substring = _g993.substring;
  var stash = _g993.stash;
  var string = _g993.string;
  var id_literal63 = _g993["id-literal?"];
  var one63 = _g993["one?"];
  var _62 = _g993[">"];
  var in63 = _g993["in?"];
  var _61 = _g993["="];
  var find = _g993.find;
  var inner = _g993.inner;
  var module_key = _g993["module-key"];
  var unstash = _g993.unstash;
  var join = _g993.join;
  var module = _g993.module;
  var apply = _g993.apply;
  var now = _g993.now;
  var space = _g993.space;
  var number = _g993.number;
  var reverse = _g993.reverse;
  var string63 = _g993["string?"];
  var none63 = _g993["none?"];
  var split = _g993.split;
  var drop = _g993.drop;
  var _6061 = _g993["<="];
  var write_file = _g993["write-file"];
  var _6261 = _g993[">="];
  var map = _g993.map;
  var composite63 = _g993["composite?"];
  var read_file = _g993["read-file"];
  var _60 = _g993["<"];
  var keys = _g993.keys;
  var number63 = _g993["number?"];
  var cat = _g993.cat;
  var tl = _g993.tl;
  var keys63 = _g993["keys?"];
  var string_literal63 = _g993["string-literal?"];
  var is63 = _g993["is?"];
  var boolean63 = _g993["boolean?"];
  var some63 = _g993["some?"];
  var keep = _g993.keep;
  var _37 = _g993["%"];
  var _g996 = nexus["lumen/lib"];
  var bound63 = _g996["bound?"];
  var key = _g996.key;
  var special_form63 = _g996["special-form?"];
  var quasiexpand = _g996.quasiexpand;
  var quoted = _g996.quoted;
  var macroexpand = _g996.macroexpand;
  var bind = _g996.bind;
  var valid_id63 = _g996["valid-id?"];
  var quote_environment = _g996["quote-environment"];
  var index = _g996.index;
  var symbol63 = _g996["symbol?"];
  var stash42 = _g996["stash*"];
  var imported = _g996.imported;
  var mapo = _g996.mapo;
  var reserved63 = _g996["reserved?"];
  var symbol_expansion = _g996["symbol-expansion"];
  var macro_function = _g996["macro-function"];
  var initial_environment = _g996["initial-environment"];
  var statement63 = _g996["statement?"];
  var variable63 = _g996["variable?"];
  var indentation = _g996.indentation;
  var getenv = _g996.getenv;
  var quote_modules = _g996["quote-modules"];
  var id = _g996.id;
  var macro63 = _g996["macro?"];
  var special63 = _g996["special?"];
  var bind42 = _g996["bind*"];
  var link = _g996.link;
  var _g997 = nexus["lumen/compiler"];
  var open_module = _g997["open-module"];
  var eval = _g997.eval;
  var compile_function = _g997["compile-function"];
  var import_modules = _g997["import-modules"];
  var compile = _g997.compile;
  var load_module = _g997["load-module"];
  var compile_module = _g997["compile-module"];
  var declare = _g997.declare;
  var in_module = _g997["in-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g1866 = nexus["lumen/runtime"];
  var hd = _g1866.hd;
  var iterate = _g1866.iterate;
  var sub = _g1866.sub;
  var _37message_handler = _g1866["%message-handler"];
  var table63 = _g1866["table?"];
  var exit = _g1866.exit;
  var butlast = _g1866.butlast;
  var function63 = _g1866["function?"];
  var toplevel63 = _g1866["toplevel?"];
  var reduce = _g1866.reduce;
  var empty63 = _g1866["empty?"];
  var setenv = _g1866.setenv;
  var char = _g1866.char;
  var atom63 = _g1866["atom?"];
  var write = _g1866.write;
  var nil63 = _g1866["nil?"];
  var replicate = _g1866.replicate;
  var last = _g1866.last;
  var add = _g1866.add;
  var length = _g1866.length;
  var series = _g1866.series;
  var today = _g1866.today;
  var list63 = _g1866["list?"];
  var make_id = _g1866["make-id"];
  var code = _g1866.code;
  var pair = _g1866.pair;
  var _42 = _g1866["*"];
  var _43 = _g1866["+"];
  var search = _g1866.search;
  var sort = _g1866.sort;
  var _47 = _g1866["/"];
  var _ = _g1866["-"];
  var substring = _g1866.substring;
  var stash = _g1866.stash;
  var string = _g1866.string;
  var id_literal63 = _g1866["id-literal?"];
  var one63 = _g1866["one?"];
  var _62 = _g1866[">"];
  var in63 = _g1866["in?"];
  var _61 = _g1866["="];
  var find = _g1866.find;
  var inner = _g1866.inner;
  var module_key = _g1866["module-key"];
  var unstash = _g1866.unstash;
  var join = _g1866.join;
  var module = _g1866.module;
  var apply = _g1866.apply;
  var now = _g1866.now;
  var space = _g1866.space;
  var number = _g1866.number;
  var reverse = _g1866.reverse;
  var string63 = _g1866["string?"];
  var none63 = _g1866["none?"];
  var split = _g1866.split;
  var drop = _g1866.drop;
  var _6061 = _g1866["<="];
  var write_file = _g1866["write-file"];
  var _6261 = _g1866[">="];
  var map = _g1866.map;
  var composite63 = _g1866["composite?"];
  var read_file = _g1866["read-file"];
  var _60 = _g1866["<"];
  var keys = _g1866.keys;
  var number63 = _g1866["number?"];
  var cat = _g1866.cat;
  var tl = _g1866.tl;
  var keys63 = _g1866["keys?"];
  var string_literal63 = _g1866["string-literal?"];
  var is63 = _g1866["is?"];
  var boolean63 = _g1866["boolean?"];
  var some63 = _g1866["some?"];
  var keep = _g1866.keep;
  var _37 = _g1866["%"];
  var _g1869 = nexus["lumen/lib"];
  var bound63 = _g1869["bound?"];
  var key = _g1869.key;
  var special_form63 = _g1869["special-form?"];
  var quasiexpand = _g1869.quasiexpand;
  var quoted = _g1869.quoted;
  var macroexpand = _g1869.macroexpand;
  var bind = _g1869.bind;
  var valid_id63 = _g1869["valid-id?"];
  var quote_environment = _g1869["quote-environment"];
  var index = _g1869.index;
  var symbol63 = _g1869["symbol?"];
  var stash42 = _g1869["stash*"];
  var imported = _g1869.imported;
  var mapo = _g1869.mapo;
  var reserved63 = _g1869["reserved?"];
  var symbol_expansion = _g1869["symbol-expansion"];
  var macro_function = _g1869["macro-function"];
  var initial_environment = _g1869["initial-environment"];
  var statement63 = _g1869["statement?"];
  var variable63 = _g1869["variable?"];
  var indentation = _g1869.indentation;
  var getenv = _g1869.getenv;
  var quote_modules = _g1869["quote-modules"];
  var id = _g1869.id;
  var macro63 = _g1869["macro?"];
  var special63 = _g1869["special?"];
  var bind42 = _g1869["bind*"];
  var link = _g1869.link;
  var _g1870 = nexus["lumen/compiler"];
  var open_module = _g1870["open-module"];
  var eval = _g1870.eval;
  var compile_function = _g1870["compile-function"];
  var import_modules = _g1870["import-modules"];
  var compile = _g1870.compile;
  var load_module = _g1870["load-module"];
  var compile_module = _g1870["compile-module"];
  var declare = _g1870.declare;
  var in_module = _g1870["in-module"];
  global.modules = {"lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {language: {macro: function () {
    return(["quote", target]);
  }, export: true}, at: {macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "join!": {macro: function (a) {
    var _g1907 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1907, 0);
    return(["set", a, join(["join*", a], bs)]);
  }, export: true}, "cat!": {macro: function (a) {
    var _g1910 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g1910, 0);
    return(["set", a, join(["cat", a], bs)]);
  }, export: true}, all: {macro: function (_g1914, t) {
    var k = _g1914[0];
    var v = _g1914[1];
    var _g1913 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1913, 0);
    var x = make_id();
    var n = make_id();
    var _g2168;
    if (target === "lua") {
      _g2168 = body;
    } else {
      _g2168 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g2168)]]);
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, target: {export: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, global: true}, "with-frame": {macro: function () {
    var _g1935 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g1935, 0);
    var scope = _g1935.scope;
    var x = make_id();
    var _g1938 = ["table"];
    _g1938._scope = scope;
    return(["do", ["add", "environment", _g1938], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}, "let-macro": {macro: function (definitions) {
    var _g1943 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1943, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1944 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1944);
  }, export: true}, "define-macro": {macro: function (name, args) {
    var _g1948 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1948, 0);
    var form = join(["fn", args], body);
    var _g1950 = ["setenv", ["quote", name]];
    _g1950.macro = form;
    _g1950.form = ["quote", form];
    eval(_g1950);
    return(undefined);
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, fn: {macro: function (args) {
    var _g1963 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1963, 0);
    var _g1964 = bind42(args, body);
    var _g1965 = _g1964[0];
    var _g1966 = _g1964[1];
    return(join(["%function", _g1965], _g1966));
  }, export: true}, when: {macro: function (cond) {
    var _g1968 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1968, 0);
    return(["if", cond, join(["do"], body)]);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var _g1971 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1971, 0);
    add(environment, {});
    map(function (_g1974) {
      var name = _g1974[0];
      var exp = _g1974[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1972 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1972);
  }, export: true}, "with-bindings": {macro: function (_g1978) {
    var names = _g1978[0];
    var _g1977 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1977, 0);
    var x = make_id();
    var _g1982 = ["setenv", x];
    _g1982.variable = true;
    var _g1979 = ["with-frame", ["all", ["_g991", x], names, _g1982]];
    _g1979.scope = true;
    return(join(_g1979, body));
  }, export: true}, define: {macro: function (name, x) {
    var _g1983 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1983, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1986 = bind42(x, body);
        var args = _g1986[0];
        var _g1987 = _g1986[1];
        return(link(name, join(["%local-function", name, args], _g1987)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g1990 = xs;
    var _g992 = undefined;
    for (_g992 in _g1990) {
      var x = _g1990[_g992];
      var _g1991 = parseInt(_g992);
      var _g2169;
      if (isNaN(_g1991)) {
        _g2169 = _g992;
      } else {
        _g2169 = _g1991;
      }
      var _g1992 = _g2169;
      l[x] = true;
    }
    return(join(["table"], l));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, "define-module": {macro: function (spec) {
    var _g1995 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1995, 0);
    var alias = body.alias;
    var imp = body.import;
    var exp = body.export;
    var _g1996 = import_modules(imp);
    var imports = _g1996[0];
    var bindings = _g1996[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g1997 = exp || [];
    var _g990 = undefined;
    for (_g990 in _g1997) {
      var x = _g1997[_g990];
      var _g1998 = parseInt(_g990);
      var _g2170;
      if (isNaN(_g1998)) {
        _g2170 = _g990;
      } else {
        _g2170 = _g1998;
      }
      var _g1999 = _g2170;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define*": {macro: function (name, x) {
    var _g2005 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2005, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(body)) {
      var _g2006 = bind42(x, body);
      var args = _g2006[0];
      var _g2007 = _g2006[1];
      return(join(["%global-function", name, args], _g2007));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, "define-special": {macro: function (name, args) {
    var _g2013 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2013, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g2015 = ["setenv", ["quote", name]];
    _g2015.form = ["quote", form];
    _g2015.special = form;
    eval(join(_g2015, keys));
    return(undefined);
  }, export: true}, let: {macro: function (bindings) {
    var _g2018 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2018, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g2020 = bind(lh, rh);
      var k = undefined;
      for (k in _g2020) {
        var _g2022 = _g2020[k];
        var id = _g2022[0];
        var val = _g2022[1];
        var _g2021 = parseInt(k);
        var _g2171;
        if (isNaN(_g2021)) {
          _g2171 = k;
        } else {
          _g2171 = _g2021;
        }
        var _g2023 = _g2171;
        if (number63(_g2023)) {
          if (bound63(id) || reserved63(id) || toplevel63()) {
            var id1 = make_id();
            add(renames, id);
            add(renames, id1);
            id = id1;
          } else {
            setenv(id, {_stash: true, variable: true});
          }
          add(locals, ["%local", id, val]);
        }
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], body)]])));
    }
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, list: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var forms = [];
    var id = make_id();
    var _g2031 = body;
    var k = undefined;
    for (k in _g2031) {
      var v = _g2031[k];
      var _g2032 = parseInt(k);
      var _g2172;
      if (isNaN(_g2032)) {
        _g2172 = k;
      } else {
        _g2172 = _g2032;
      }
      var _g2033 = _g2172;
      if (number63(_g2033)) {
        l[_g2033] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _g2033]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, unless: {macro: function (cond) {
    var _g2043 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2043, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g2048) {
      var a = _g2048[0];
      var b = _g2048[1];
      var c = sub(_g2048, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }, export: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"break": {foo: true, stmt: true, export: true, special: function () {
    return(indentation() + "break");
  }}, "return": {foo: true, stmt: true, export: true, special: function (x) {
    var _g2173;
    if (nil63(x)) {
      _g2173 = "return";
    } else {
      _g2173 = "return(" + compile(x) + ")";
    }
    var _g2070 = _g2173;
    return(indentation() + _g2070);
  }}, set: {foo: true, stmt: true, export: true, special: function (lh, rh) {
    var _g2072 = compile(lh);
    var _g2174;
    if (nil63(rh)) {
      _g2174 = "nil";
    } else {
      _g2174 = rh;
    }
    var _g2073 = compile(_g2174);
    return(indentation() + _g2072 + " = " + _g2073);
  }}, error: {foo: true, stmt: true, export: true, special: function (x) {
    var _g2175;
    if (target === "js") {
      _g2175 = "throw new " + compile(["Error", x]);
    } else {
      _g2175 = "error(" + compile(x) + ")";
    }
    var e = _g2175;
    return(indentation() + e);
  }}, "%global-function": {foo: true, export: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, tr: true, stmt: true}, "%for": {foo: true, export: true, special: function (t, k, form) {
    var _g2080 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2081 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2081;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g2080 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g2080 + ") {\n" + body + ind + "}\n");
    }
  }, tr: true, stmt: true}, "do": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    series(function (x) {
      str = str + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(str);
  }, tr: true, stmt: true}, get: {foo: true, export: true, special: function (t, k) {
    var _g2084 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g2084, 0) === "{") {
      _g2084 = "(" + _g2084 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g2084 + "." + inner(k));
    } else {
      return(_g2084 + "[" + k1 + "]");
    }
  }}, "%try": {foo: true, export: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2086 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2086;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g2090 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g2090;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, tr: true, stmt: true}, "%local-function": {foo: true, export: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, tr: true, stmt: true}, "%if": {foo: true, export: true, special: function (cond, cons, alt) {
    var _g2093 = compile(cond);
    indent_level = indent_level + 1;
    var _g2095 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g2094 = _g2095;
    var _g2176;
    if (alt) {
      indent_level = indent_level + 1;
      var _g2097 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g2176 = _g2097;
    }
    var _g2096 = _g2176;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g2093 + ") {\n" + _g2094 + ind + "}";
    } else {
      str = str + ind + "if " + _g2093 + " then\n" + _g2094;
    }
    if (_g2096 && target === "js") {
      str = str + " else {\n" + _g2096 + ind + "}";
    } else {
      if (_g2096) {
        str = str + ind + "else\n" + _g2096;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, tr: true, stmt: true}, "%object": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g2177;
    if (target === "lua") {
      _g2177 = " = ";
    } else {
      _g2177 = ": ";
    }
    var sep = _g2177;
    var comma = "";
    var _g2098 = pair(forms);
    var k = undefined;
    for (k in _g2098) {
      var v = _g2098[k];
      var _g2099 = parseInt(k);
      var _g2178;
      if (isNaN(_g2099)) {
        _g2178 = k;
      } else {
        _g2178 = _g2099;
      }
      var _g2100 = _g2178;
      if (number63(_g2100)) {
        var _g2101 = v[0];
        var _g2102 = v[1];
        if (!string63(_g2101)) {
          throw new Error("Illegal key: " + string(_g2101));
        }
        str = str + comma + key(_g2101) + sep + compile(_g2102);
        comma = ", ";
      }
    }
    return(str + "}");
  }}, "%local": {foo: true, stmt: true, export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g2179;
    if (is63(value)) {
      _g2179 = " = " + value1;
    } else {
      _g2179 = "";
    }
    var rh = _g2179;
    var _g2180;
    if (target === "js") {
      _g2180 = "var ";
    } else {
      _g2180 = "local ";
    }
    var keyword = _g2180;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }}, "while": {foo: true, export: true, special: function (cond, form) {
    var _g2105 = compile(cond);
    indent_level = indent_level + 1;
    var _g2106 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2106;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g2105 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g2105 + " do\n" + body + ind + "end\n");
    }
  }, tr: true, stmt: true}, "%function": {foo: true, export: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "%array": {foo: true, export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g2181;
    if (target === "lua") {
      _g2181 = "{";
    } else {
      _g2181 = "[";
    }
    var open = _g2181;
    var _g2182;
    if (target === "lua") {
      _g2182 = "}";
    } else {
      _g2182 = "]";
    }
    var close = _g2182;
    var str = "";
    var comma = "";
    var _g2108 = forms;
    var k = undefined;
    for (k in _g2108) {
      var v = _g2108[k];
      var _g2109 = parseInt(k);
      var _g2183;
      if (isNaN(_g2109)) {
        _g2183 = k;
      } else {
        _g2183 = _g2109;
      }
      var _g2110 = _g2183;
      if (number63(_g2110)) {
        str = str + comma + compile(v);
        comma = ", ";
      }
    }
    return(open + str + close);
  }}, "not": {}}}, lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-call": {variable: true}, "parenthesize-call?": {variable: true}, "open-module": {export: true, variable: true}, "compile-atom": {variable: true}, "compile-infix": {variable: true}, "compile-special": {variable: true}, infix: {variable: true}, eval: {export: true, variable: true}, conclude: {variable: true}, "%result": {export: true, global: true}, "%compile-module": {variable: true}, "can-return?": {variable: true}, "compile-function": {export: true, variable: true}, "compiler-output": {variable: true}, lower: {variable: true}, reimported: {variable: true}, "compiling?": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, "lower-try": {variable: true}, run: {variable: true}, "module-path": {variable: true}, "lower-if": {variable: true}, "lower-infix": {variable: true}, precedence: {variable: true}, process: {variable: true}, "lower-special": {variable: true}, "import-modules": {export: true, variable: true}, "lower-call": {variable: true}, "lower-body": {variable: true}, compile: {export: true, variable: true}, "lower-while": {variable: true}, "infix?": {variable: true}, "lower-for": {variable: true}, "load-module": {export: true, variable: true}, terminator: {variable: true}, "lower-definition": {variable: true}, "current-module": {export: true, global: true}, "lower-short": {variable: true}, "op-delims": {variable: true}, "compile-module": {export: true, variable: true}, "lower-statement": {variable: true}, declare: {export: true, variable: true}, "unary?": {variable: true}, getop: {variable: true}, "compile-args": {variable: true}, "lower-do": {variable: true}, "lower-infix?": {variable: true}, "in-module": {export: true, variable: true}, "lower-function": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {hd: {export: true, variable: true}, iterate: {export: true, variable: true}, sub: {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "table?": {export: true, variable: true}, shift: {variable: true}, exit: {export: true, variable: true}, butlast: {export: true, variable: true}, "function?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, reduce: {export: true, variable: true}, "empty?": {export: true, variable: true}, setenv: {export: true, variable: true}, char: {export: true, variable: true}, "atom?": {export: true, variable: true}, write: {export: true, variable: true}, "nil?": {export: true, variable: true}, replicate: {export: true, variable: true}, last: {export: true, variable: true}, add: {export: true, variable: true}, length: {export: true, variable: true}, series: {export: true, variable: true}, today: {export: true, variable: true}, "list?": {export: true, variable: true}, "make-id": {export: true, variable: true}, code: {export: true, variable: true}, pair: {export: true, variable: true}, "*": {export: true, variable: true}, "+": {export: true, variable: true}, search: {export: true, variable: true}, sort: {export: true, variable: true}, "/": {export: true, variable: true}, "-": {export: true, variable: true}, substring: {export: true, variable: true}, stash: {export: true, variable: true}, string: {export: true, variable: true}, "id-literal?": {export: true, variable: true}, "one?": {export: true, variable: true}, ">": {export: true, variable: true}, "in?": {export: true, variable: true}, "=": {export: true, variable: true}, find: {export: true, variable: true}, fs: {variable: true}, inner: {export: true, variable: true}, "module-key": {export: true, variable: true}, "id-count": {variable: true}, unstash: {export: true, variable: true}, join: {export: true, variable: true}, require: {export: true, global: true}, module: {export: true, variable: true}, apply: {export: true, variable: true}, now: {export: true, variable: true}, space: {export: true, variable: true}, print: {export: true, global: true}, number: {export: true, variable: true}, reverse: {export: true, variable: true}, "string?": {export: true, variable: true}, "none?": {export: true, variable: true}, split: {export: true, variable: true}, drop: {export: true, variable: true}, "<=": {export: true, variable: true}, "write-file": {export: true, variable: true}, ">=": {export: true, variable: true}, map: {export: true, variable: true}, "composite?": {export: true, variable: true}, "read-file": {export: true, variable: true}, "<": {export: true, variable: true}, keys: {export: true, variable: true}, type: {variable: true}, "number?": {export: true, variable: true}, cat: {export: true, variable: true}, tl: {export: true, variable: true}, "keys?": {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "is?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "some?": {export: true, variable: true}, keep: {export: true, variable: true}, "%": {export: true, variable: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-modules": {macro: function () {
    return(quote_modules());
  }}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {export: true, global: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"bound?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "global?": {variable: true}, key: {export: true, variable: true}, "special-form?": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, "quote-module": {variable: true}, quoted: {export: true, variable: true}, "quasisplice?": {variable: true}, macroexpand: {export: true, variable: true}, bind: {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "indent-level": {export: true, global: true}, escape: {variable: true}, index: {export: true, variable: true}, "symbol?": {export: true, variable: true}, "quote-frame": {variable: true}, "stash*": {export: true, variable: true}, imported: {export: true, variable: true}, "quote-binding": {variable: true}, exclude: {variable: true}, extend: {variable: true}, mapo: {export: true, variable: true}, "valid-code?": {variable: true}, "numeric?": {variable: true}, reserved: {variable: true}, "quasiquote-list": {variable: true}, "reserved?": {export: true, variable: true}, "can-unquote?": {variable: true}, "symbol-expansion": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "quasiquoting?": {variable: true}, "quoting?": {variable: true}, "statement?": {export: true, variable: true}, "variable?": {export: true, variable: true}, bias: {variable: true}, literal: {variable: true}, indentation: {export: true, variable: true}, getenv: {export: true, variable: true}, "quote-modules": {export: true, variable: true}, id: {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "bind*": {export: true, variable: true}, link: {export: true, variable: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, "flag?": {variable: true}, whitespace: {variable: true}, "key?": {variable: true}, "read-table": {export: true, variable: true}, eof: {variable: true}, "read-all": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g2152) {
    var char = _g2152[0];
    var stream = _g2152[1];
    var _g2151 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2151, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "skip-non-code": {variable: true}, "read-char": {variable: true}, "peek-char": {variable: true}, delimiters: {variable: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var _g2158 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2158, 0);
    var alias = body.alias;
    var imp = body.import;
    var exp = body.export;
    var _g2159 = import_modules(imp);
    var imports = _g2159[0];
    var bindings = _g2159[1];
    var k = module_key(spec);
    modules[k] = {alias: alias, export: {}, import: imports};
    var _g2160 = exp || [];
    var _g990 = undefined;
    for (_g990 in _g2160) {
      var x = _g2160[_g990];
      var _g2161 = parseInt(_g990);
      var _g2184;
      if (isNaN(_g2161)) {
        _g2184 = _g990;
      } else {
        _g2184 = _g2161;
      }
      var _g2162 = _g2184;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g2185 = nexus["lumen/runtime"];
  var hd = _g2185.hd;
  var iterate = _g2185.iterate;
  var sub = _g2185.sub;
  var _37message_handler = _g2185["%message-handler"];
  var table63 = _g2185["table?"];
  var exit = _g2185.exit;
  var butlast = _g2185.butlast;
  var function63 = _g2185["function?"];
  var toplevel63 = _g2185["toplevel?"];
  var reduce = _g2185.reduce;
  var empty63 = _g2185["empty?"];
  var setenv = _g2185.setenv;
  var char = _g2185.char;
  var atom63 = _g2185["atom?"];
  var write = _g2185.write;
  var nil63 = _g2185["nil?"];
  var replicate = _g2185.replicate;
  var last = _g2185.last;
  var add = _g2185.add;
  var length = _g2185.length;
  var series = _g2185.series;
  var today = _g2185.today;
  var list63 = _g2185["list?"];
  var make_id = _g2185["make-id"];
  var code = _g2185.code;
  var pair = _g2185.pair;
  var _42 = _g2185["*"];
  var _43 = _g2185["+"];
  var search = _g2185.search;
  var sort = _g2185.sort;
  var _47 = _g2185["/"];
  var _ = _g2185["-"];
  var substring = _g2185.substring;
  var stash = _g2185.stash;
  var string = _g2185.string;
  var id_literal63 = _g2185["id-literal?"];
  var one63 = _g2185["one?"];
  var _62 = _g2185[">"];
  var in63 = _g2185["in?"];
  var _61 = _g2185["="];
  var find = _g2185.find;
  var inner = _g2185.inner;
  var module_key = _g2185["module-key"];
  var unstash = _g2185.unstash;
  var join = _g2185.join;
  var module = _g2185.module;
  var apply = _g2185.apply;
  var now = _g2185.now;
  var space = _g2185.space;
  var number = _g2185.number;
  var reverse = _g2185.reverse;
  var string63 = _g2185["string?"];
  var none63 = _g2185["none?"];
  var split = _g2185.split;
  var drop = _g2185.drop;
  var _6061 = _g2185["<="];
  var write_file = _g2185["write-file"];
  var _6261 = _g2185[">="];
  var map = _g2185.map;
  var composite63 = _g2185["composite?"];
  var read_file = _g2185["read-file"];
  var _60 = _g2185["<"];
  var keys = _g2185.keys;
  var number63 = _g2185["number?"];
  var cat = _g2185.cat;
  var tl = _g2185.tl;
  var keys63 = _g2185["keys?"];
  var string_literal63 = _g2185["string-literal?"];
  var is63 = _g2185["is?"];
  var boolean63 = _g2185["boolean?"];
  var some63 = _g2185["some?"];
  var keep = _g2185.keep;
  var _37 = _g2185["%"];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var hd = _g2.hd;
  var iterate = _g2.iterate;
  var sub = _g2.sub;
  var _37message_handler = _g2["%message-handler"];
  var table63 = _g2["table?"];
  var exit = _g2.exit;
  var none63 = _g2["none?"];
  var function63 = _g2["function?"];
  var toplevel63 = _g2["toplevel?"];
  var reduce = _g2.reduce;
  var empty63 = _g2["empty?"];
  var setenv = _g2.setenv;
  var char = _g2.char;
  var number63 = _g2["number?"];
  var write = _g2.write;
  var nil63 = _g2["nil?"];
  var replicate = _g2.replicate;
  var last = _g2.last;
  var add = _g2.add;
  var length = _g2.length;
  var series = _g2.series;
  var today = _g2.today;
  var list63 = _g2["list?"];
  var make_id = _g2["make-id"];
  var code = _g2.code;
  var pair = _g2.pair;
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var search = _g2.search;
  var sort = _g2.sort;
  var unstash = _g2.unstash;
  var _ = _g2["-"];
  var substring = _g2.substring;
  var stash = _g2.stash;
  var string = _g2.string;
  var id_literal63 = _g2["id-literal?"];
  var one63 = _g2["one?"];
  var _62 = _g2[">"];
  var in63 = _g2["in?"];
  var _61 = _g2["="];
  var find = _g2.find;
  var inner = _g2.inner;
  var module_key = _g2["module-key"];
  var module = _g2.module;
  var apply = _g2.apply;
  var now = _g2.now;
  var space = _g2.space;
  var number = _g2.number;
  var write_file = _g2["write-file"];
  var read_file = _g2["read-file"];
  var string63 = _g2["string?"];
  var _60 = _g2["<"];
  var _47 = _g2["/"];
  var drop = _g2.drop;
  var _6061 = _g2["<="];
  var atom63 = _g2["atom?"];
  var _6261 = _g2[">="];
  var map = _g2.map;
  var composite63 = _g2["composite?"];
  var cat = _g2.cat;
  var split = _g2.split;
  var keys = _g2.keys;
  var keys63 = _g2["keys?"];
  var keep = _g2.keep;
  var join = _g2.join;
  var tl = _g2.tl;
  var reverse = _g2.reverse;
  var string_literal63 = _g2["string-literal?"];
  var is63 = _g2["is?"];
  var boolean63 = _g2["boolean?"];
  var some63 = _g2["some?"];
  var butlast = _g2.butlast;
  var _37 = _g2["%"];
  var _g5 = nexus["lumen/reader"];
  var make_stream = _g5["make-stream"];
  var read_from_string = _g5["read-from-string"];
  var read_table = _g5["read-table"];
  var read_all = _g5["read-all"];
  var read = _g5.read;
  var _g6 = nexus["lumen/compiler"];
  var open_module = _g6["open-module"];
  var import_modules = _g6["import-modules"];
  var eval = _g6.eval;
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var load_module = _g6["load-module"];
  var compile_module = _g6["compile-module"];
  var declare = _g6.declare;
  var in_module = _g6["in-module"];
  var rep = function (str) {
    var _g2189 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g2196) {
        return([false, _g2196.message]);
      }
    })();
    var _g1 = _g2189[0];
    var x = _g2189[1];
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
