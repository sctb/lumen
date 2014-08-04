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
        var args1 = sub(args, 0, length(args) - 1);
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
  var nil63 = _g197["nil?"];
  var is63 = _g197["is?"];
  var length = _g197.length;
  var none63 = _g197["none?"];
  var some63 = _g197["some?"];
  var one63 = _g197["one?"];
  var hd = _g197.hd;
  var string63 = _g197["string?"];
  var number63 = _g197["number?"];
  var boolean63 = _g197["boolean?"];
  var function63 = _g197["function?"];
  var composite63 = _g197["composite?"];
  var atom63 = _g197["atom?"];
  var table63 = _g197["table?"];
  var list63 = _g197["list?"];
  var substring = _g197.substring;
  var sub = _g197.sub;
  var keys = _g197.keys;
  var inner = _g197.inner;
  var tl = _g197.tl;
  var char = _g197.char;
  var code = _g197.code;
  var string_literal63 = _g197["string-literal?"];
  var id_literal63 = _g197["id-literal?"];
  var add = _g197.add;
  var drop = _g197.drop;
  var last = _g197.last;
  var butlast = _g197.butlast;
  var reverse = _g197.reverse;
  var join = _g197.join;
  var reduce = _g197.reduce;
  var keep = _g197.keep;
  var in63 = _g197["in?"];
  var find = _g197.find;
  var pair = _g197.pair;
  var sort = _g197.sort;
  var iterate = _g197.iterate;
  var replicate = _g197.replicate;
  var series = _g197.series;
  var map = _g197.map;
  var keys63 = _g197["keys?"];
  var empty63 = _g197["empty?"];
  var stash = _g197.stash;
  var unstash = _g197.unstash;
  var search = _g197.search;
  var split = _g197.split;
  var cat = _g197.cat;
  var _43 = _g197["+"];
  var _ = _g197["-"];
  var _42 = _g197["*"];
  var _47 = _g197["/"];
  var _37 = _g197["%"];
  var _62 = _g197[">"];
  var _60 = _g197["<"];
  var _61 = _g197["="];
  var _6261 = _g197[">="];
  var _6061 = _g197["<="];
  var read_file = _g197["read-file"];
  var write_file = _g197["write-file"];
  var write = _g197.write;
  var exit = _g197.exit;
  var today = _g197.today;
  var now = _g197.now;
  var number = _g197.number;
  var string = _g197.string;
  var space = _g197.space;
  var apply = _g197.apply;
  var make_id = _g197["make-id"];
  var _37message_handler = _g197["%message-handler"];
  var toplevel63 = _g197["toplevel?"];
  var module_key = _g197["module-key"];
  var module = _g197.module;
  var setenv = _g197.setenv;
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
            var _g991 = undefined;
            for (_g991 in _g270) {
              var _g268 = _g270[_g991];
              var _g271 = parseInt(_g991);
              var _g381;
              if (isNaN(_g271)) {
                _g381 = _g991;
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
              var _g991 = undefined;
              for (_g991 in _g279) {
                var _g277 = _g279[_g991];
                var _g280 = parseInt(_g991);
                var _g380;
                if (isNaN(_g280)) {
                  _g380 = _g991;
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
    _g367.import = quoted(m.import);
    _g367.alias = quoted(m.alias);
    _g367.export = quote_frame(m.export);
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
  var nil63 = _g390["nil?"];
  var is63 = _g390["is?"];
  var length = _g390.length;
  var none63 = _g390["none?"];
  var some63 = _g390["some?"];
  var one63 = _g390["one?"];
  var hd = _g390.hd;
  var string63 = _g390["string?"];
  var number63 = _g390["number?"];
  var boolean63 = _g390["boolean?"];
  var function63 = _g390["function?"];
  var composite63 = _g390["composite?"];
  var atom63 = _g390["atom?"];
  var table63 = _g390["table?"];
  var list63 = _g390["list?"];
  var substring = _g390.substring;
  var sub = _g390.sub;
  var keys = _g390.keys;
  var inner = _g390.inner;
  var tl = _g390.tl;
  var char = _g390.char;
  var code = _g390.code;
  var string_literal63 = _g390["string-literal?"];
  var id_literal63 = _g390["id-literal?"];
  var add = _g390.add;
  var drop = _g390.drop;
  var last = _g390.last;
  var butlast = _g390.butlast;
  var reverse = _g390.reverse;
  var join = _g390.join;
  var reduce = _g390.reduce;
  var keep = _g390.keep;
  var in63 = _g390["in?"];
  var find = _g390.find;
  var pair = _g390.pair;
  var sort = _g390.sort;
  var iterate = _g390.iterate;
  var replicate = _g390.replicate;
  var series = _g390.series;
  var map = _g390.map;
  var keys63 = _g390["keys?"];
  var empty63 = _g390["empty?"];
  var stash = _g390.stash;
  var unstash = _g390.unstash;
  var search = _g390.search;
  var split = _g390.split;
  var cat = _g390.cat;
  var _43 = _g390["+"];
  var _ = _g390["-"];
  var _42 = _g390["*"];
  var _47 = _g390["/"];
  var _37 = _g390["%"];
  var _62 = _g390[">"];
  var _60 = _g390["<"];
  var _61 = _g390["="];
  var _6261 = _g390[">="];
  var _6061 = _g390["<="];
  var read_file = _g390["read-file"];
  var write_file = _g390["write-file"];
  var write = _g390.write;
  var exit = _g390.exit;
  var today = _g390.today;
  var now = _g390.now;
  var number = _g390.number;
  var string = _g390.string;
  var space = _g390.space;
  var apply = _g390.apply;
  var make_id = _g390["make-id"];
  var _37message_handler = _g390["%message-handler"];
  var toplevel63 = _g390["toplevel?"];
  var module_key = _g390["module-key"];
  var module = _g390.module;
  var setenv = _g390.setenv;
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
  var _g439 = nexus["lumen/runtime"];
  var nil63 = _g439["nil?"];
  var is63 = _g439["is?"];
  var length = _g439.length;
  var none63 = _g439["none?"];
  var some63 = _g439["some?"];
  var one63 = _g439["one?"];
  var hd = _g439.hd;
  var string63 = _g439["string?"];
  var number63 = _g439["number?"];
  var boolean63 = _g439["boolean?"];
  var function63 = _g439["function?"];
  var composite63 = _g439["composite?"];
  var atom63 = _g439["atom?"];
  var table63 = _g439["table?"];
  var list63 = _g439["list?"];
  var substring = _g439.substring;
  var sub = _g439.sub;
  var keys = _g439.keys;
  var inner = _g439.inner;
  var tl = _g439.tl;
  var char = _g439.char;
  var code = _g439.code;
  var string_literal63 = _g439["string-literal?"];
  var id_literal63 = _g439["id-literal?"];
  var add = _g439.add;
  var drop = _g439.drop;
  var last = _g439.last;
  var butlast = _g439.butlast;
  var reverse = _g439.reverse;
  var join = _g439.join;
  var reduce = _g439.reduce;
  var keep = _g439.keep;
  var in63 = _g439["in?"];
  var find = _g439.find;
  var pair = _g439.pair;
  var sort = _g439.sort;
  var iterate = _g439.iterate;
  var replicate = _g439.replicate;
  var series = _g439.series;
  var map = _g439.map;
  var keys63 = _g439["keys?"];
  var empty63 = _g439["empty?"];
  var stash = _g439.stash;
  var unstash = _g439.unstash;
  var search = _g439.search;
  var split = _g439.split;
  var cat = _g439.cat;
  var _43 = _g439["+"];
  var _ = _g439["-"];
  var _42 = _g439["*"];
  var _47 = _g439["/"];
  var _37 = _g439["%"];
  var _62 = _g439[">"];
  var _60 = _g439["<"];
  var _61 = _g439["="];
  var _6261 = _g439[">="];
  var _6061 = _g439["<="];
  var read_file = _g439["read-file"];
  var write_file = _g439["write-file"];
  var write = _g439.write;
  var exit = _g439.exit;
  var today = _g439.today;
  var now = _g439.now;
  var number = _g439.number;
  var string = _g439.string;
  var space = _g439.space;
  var apply = _g439.apply;
  var make_id = _g439["make-id"];
  var _37message_handler = _g439["%message-handler"];
  var toplevel63 = _g439["toplevel?"];
  var module_key = _g439["module-key"];
  var module = _g439.module;
  var setenv = _g439.setenv;
  var _g442 = nexus["lumen/lib"];
  var getenv = _g442.getenv;
  var macro_function = _g442["macro-function"];
  var macro63 = _g442["macro?"];
  var special63 = _g442["special?"];
  var special_form63 = _g442["special-form?"];
  var statement63 = _g442["statement?"];
  var symbol_expansion = _g442["symbol-expansion"];
  var symbol63 = _g442["symbol?"];
  var variable63 = _g442["variable?"];
  var bound63 = _g442["bound?"];
  var quoted = _g442.quoted;
  var stash42 = _g442["stash*"];
  var index = _g442.index;
  var bind = _g442.bind;
  var bind42 = _g442["bind*"];
  var quasiexpand = _g442.quasiexpand;
  var macroexpand = _g442.macroexpand;
  var indentation = _g442.indentation;
  var reserved63 = _g442["reserved?"];
  var valid_id63 = _g442["valid-id?"];
  var id = _g442.id;
  var key = _g442.key;
  var imported = _g442.imported;
  var link = _g442.link;
  var mapo = _g442.mapo;
  var quote_environment = _g442["quote-environment"];
  var quote_modules = _g442["quote-modules"];
  var initial_environment = _g442["initial-environment"];
  var _g443 = nexus["lumen/reader"];
  var make_stream = _g443["make-stream"];
  var read_table = _g443["read-table"];
  var read = _g443.read;
  var read_all = _g443["read-all"];
  var read_from_string = _g443["read-from-string"];
  var _g446 = [];
  var _g447 = [];
  _g447.js = "!";
  _g447.lua = "not ";
  _g446["not"] = _g447;
  var _g449 = [];
  _g449["*"] = true;
  _g449["/"] = true;
  _g449["%"] = true;
  var _g451 = [];
  _g451["+"] = true;
  _g451["-"] = true;
  var _g453 = [];
  var _g454 = [];
  _g454.js = "+";
  _g454.lua = "..";
  _g453.cat = _g454;
  var _g456 = [];
  _g456["<"] = true;
  _g456[">"] = true;
  _g456["<="] = true;
  _g456[">="] = true;
  var _g458 = [];
  var _g459 = [];
  _g459.js = "===";
  _g459.lua = "==";
  _g458["="] = _g459;
  var _g460 = [];
  _g460.js = "!=";
  _g460.lua = "~=";
  _g458["~="] = _g460;
  var _g462 = [];
  var _g463 = [];
  _g463.js = "&&";
  _g463.lua = "and";
  _g462["and"] = _g463;
  var _g465 = [];
  var _g466 = [];
  _g466.js = "||";
  _g466.lua = "or";
  _g465["or"] = _g466;
  var infix = [_g446, _g449, _g451, _g453, _g456, _g458, _g462, _g465];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g470 = infix;
      var k = undefined;
      for (k in _g470) {
        var v = _g470[k];
        var _g471 = parseInt(k);
        var _g580;
        if (isNaN(_g471)) {
          _g580 = k;
        } else {
          _g580 = _g471;
        }
        var _g472 = _g580;
        if (v[hd(form)]) {
          return(index(_g472));
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
    var _g481 = getenv(x);
    var special = _g481.special;
    var stmt = _g481.stmt;
    var self_tr63 = _g481.tr;
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
    var _g484 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g484.right;
    var _g581;
    if (right) {
      _g581 = _6261;
    } else {
      _g581 = _62;
    }
    if (_g581(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g488 = sub(form, 1);
    var a = _g488[0];
    var b = _g488[1];
    var _g489 = op_delims(form, a);
    var ao = _g489[0];
    var ac = _g489[1];
    var _g490 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g490[0];
    var bc = _g490[1];
    var _g491 = compile(a);
    var _g492 = compile(b);
    var _g493 = getop(op);
    if (unary63(form)) {
      return(_g493 + ao + _g491 + ac);
    } else {
      return(ao + _g491 + ac + " " + _g493 + " " + bo + _g492 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g494 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g494.name;
    var prefix = _g494.prefix;
    var _g582;
    if (name) {
      _g582 = compile(name);
    } else {
      _g582 = "";
    }
    var id = _g582;
    var _g495 = prefix || "";
    var _g496 = compile_args(args);
    indent_level = indent_level + 1;
    var _g498 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g497 = _g498;
    var ind = indentation();
    var _g583;
    if (target === "js") {
      _g583 = "";
    } else {
      _g583 = "end";
    }
    var tr = _g583;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g496 + " {\n" + _g497 + ind + "}" + tr);
    } else {
      return(_g495 + "function " + id + _g496 + "\n" + _g497 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g500 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g500.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g584;
        if (stmt) {
          _g584 = indentation();
        } else {
          _g584 = "";
        }
        var ind = _g584;
        var _g585;
        if (atom63(form)) {
          _g585 = compile_atom(form);
        } else {
          var _g586;
          if (infix63(hd(form))) {
            _g586 = compile_infix(form);
          } else {
            _g586 = compile_call(form);
          }
          _g585 = _g586;
        }
        var _g501 = _g585;
        return(ind + _g501 + tr);
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
    var _g512 = args[1];
    var _g513 = args[2];
    if (stmt63 || tail63) {
      var _g588;
      if (_g513) {
        _g588 = [lower_body([_g513], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g512], tail63)], _g588)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g587;
      if (_g513) {
        _g587 = [lower(["set", e, _g513])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g512])], _g587));
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
      var _g589;
      if (x === "and") {
        _g589 = ["%if", id, b, id];
      } else {
        _g589 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g589], hoist));
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
    var _g538 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g538, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g541 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g541)) {
      return(_g541);
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
    var _g562 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g562.private;
    var m = module(spec);
    var frame = last(environment);
    var _g563 = m.export;
    var k = undefined;
    for (k in _g563) {
      var v = _g563[k];
      var _g564 = parseInt(k);
      var _g590;
      if (isNaN(_g564)) {
        _g590 = k;
      } else {
        _g590 = _g564;
      }
      var _g565 = _g590;
      if (v.export || private) {
        frame[_g565] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g566 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g566.private;
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
        var _g570 = import_modules(m.alias);
        var aliased = _g570[0];
        var bs = _g570[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g571 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g571);
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
  var _g591 = nexus["lumen/runtime"];
  var nil63 = _g591["nil?"];
  var is63 = _g591["is?"];
  var length = _g591.length;
  var none63 = _g591["none?"];
  var some63 = _g591["some?"];
  var one63 = _g591["one?"];
  var hd = _g591.hd;
  var string63 = _g591["string?"];
  var number63 = _g591["number?"];
  var boolean63 = _g591["boolean?"];
  var function63 = _g591["function?"];
  var composite63 = _g591["composite?"];
  var atom63 = _g591["atom?"];
  var table63 = _g591["table?"];
  var list63 = _g591["list?"];
  var substring = _g591.substring;
  var sub = _g591.sub;
  var keys = _g591.keys;
  var inner = _g591.inner;
  var tl = _g591.tl;
  var char = _g591.char;
  var code = _g591.code;
  var string_literal63 = _g591["string-literal?"];
  var id_literal63 = _g591["id-literal?"];
  var add = _g591.add;
  var drop = _g591.drop;
  var last = _g591.last;
  var butlast = _g591.butlast;
  var reverse = _g591.reverse;
  var join = _g591.join;
  var reduce = _g591.reduce;
  var keep = _g591.keep;
  var in63 = _g591["in?"];
  var find = _g591.find;
  var pair = _g591.pair;
  var sort = _g591.sort;
  var iterate = _g591.iterate;
  var replicate = _g591.replicate;
  var series = _g591.series;
  var map = _g591.map;
  var keys63 = _g591["keys?"];
  var empty63 = _g591["empty?"];
  var stash = _g591.stash;
  var unstash = _g591.unstash;
  var search = _g591.search;
  var split = _g591.split;
  var cat = _g591.cat;
  var _43 = _g591["+"];
  var _ = _g591["-"];
  var _42 = _g591["*"];
  var _47 = _g591["/"];
  var _37 = _g591["%"];
  var _62 = _g591[">"];
  var _60 = _g591["<"];
  var _61 = _g591["="];
  var _6261 = _g591[">="];
  var _6061 = _g591["<="];
  var read_file = _g591["read-file"];
  var write_file = _g591["write-file"];
  var write = _g591.write;
  var exit = _g591.exit;
  var today = _g591.today;
  var now = _g591.now;
  var number = _g591.number;
  var string = _g591.string;
  var space = _g591.space;
  var apply = _g591.apply;
  var make_id = _g591["make-id"];
  var _37message_handler = _g591["%message-handler"];
  var toplevel63 = _g591["toplevel?"];
  var module_key = _g591["module-key"];
  var module = _g591.module;
  var setenv = _g591.setenv;
  var _g594 = nexus["lumen/lib"];
  var getenv = _g594.getenv;
  var macro_function = _g594["macro-function"];
  var macro63 = _g594["macro?"];
  var special63 = _g594["special?"];
  var special_form63 = _g594["special-form?"];
  var statement63 = _g594["statement?"];
  var symbol_expansion = _g594["symbol-expansion"];
  var symbol63 = _g594["symbol?"];
  var variable63 = _g594["variable?"];
  var bound63 = _g594["bound?"];
  var quoted = _g594.quoted;
  var stash42 = _g594["stash*"];
  var index = _g594.index;
  var bind = _g594.bind;
  var bind42 = _g594["bind*"];
  var quasiexpand = _g594.quasiexpand;
  var macroexpand = _g594.macroexpand;
  var indentation = _g594.indentation;
  var reserved63 = _g594["reserved?"];
  var valid_id63 = _g594["valid-id?"];
  var id = _g594.id;
  var key = _g594.key;
  var imported = _g594.imported;
  var link = _g594.link;
  var mapo = _g594.mapo;
  var quote_environment = _g594["quote-environment"];
  var quote_modules = _g594["quote-modules"];
  var initial_environment = _g594["initial-environment"];
  var _g595 = nexus["lumen/compiler"];
  var compile_function = _g595["compile-function"];
  var compile = _g595.compile;
  var open_module = _g595["open-module"];
  var load_module = _g595["load-module"];
  var in_module = _g595["in-module"];
  var import_modules = _g595["import-modules"];
  var compile_module = _g595["compile-module"];
  var declare = _g595.declare;
  var eval = _g595.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g993 = nexus["lumen/runtime"];
  var nil63 = _g993["nil?"];
  var is63 = _g993["is?"];
  var length = _g993.length;
  var none63 = _g993["none?"];
  var some63 = _g993["some?"];
  var one63 = _g993["one?"];
  var hd = _g993.hd;
  var string63 = _g993["string?"];
  var number63 = _g993["number?"];
  var boolean63 = _g993["boolean?"];
  var function63 = _g993["function?"];
  var composite63 = _g993["composite?"];
  var atom63 = _g993["atom?"];
  var table63 = _g993["table?"];
  var list63 = _g993["list?"];
  var substring = _g993.substring;
  var sub = _g993.sub;
  var keys = _g993.keys;
  var inner = _g993.inner;
  var tl = _g993.tl;
  var char = _g993.char;
  var code = _g993.code;
  var string_literal63 = _g993["string-literal?"];
  var id_literal63 = _g993["id-literal?"];
  var add = _g993.add;
  var drop = _g993.drop;
  var last = _g993.last;
  var butlast = _g993.butlast;
  var reverse = _g993.reverse;
  var join = _g993.join;
  var reduce = _g993.reduce;
  var keep = _g993.keep;
  var in63 = _g993["in?"];
  var find = _g993.find;
  var pair = _g993.pair;
  var sort = _g993.sort;
  var iterate = _g993.iterate;
  var replicate = _g993.replicate;
  var series = _g993.series;
  var map = _g993.map;
  var keys63 = _g993["keys?"];
  var empty63 = _g993["empty?"];
  var stash = _g993.stash;
  var unstash = _g993.unstash;
  var search = _g993.search;
  var split = _g993.split;
  var cat = _g993.cat;
  var _43 = _g993["+"];
  var _ = _g993["-"];
  var _42 = _g993["*"];
  var _47 = _g993["/"];
  var _37 = _g993["%"];
  var _62 = _g993[">"];
  var _60 = _g993["<"];
  var _61 = _g993["="];
  var _6261 = _g993[">="];
  var _6061 = _g993["<="];
  var read_file = _g993["read-file"];
  var write_file = _g993["write-file"];
  var write = _g993.write;
  var exit = _g993.exit;
  var today = _g993.today;
  var now = _g993.now;
  var number = _g993.number;
  var string = _g993.string;
  var space = _g993.space;
  var apply = _g993.apply;
  var make_id = _g993["make-id"];
  var _37message_handler = _g993["%message-handler"];
  var toplevel63 = _g993["toplevel?"];
  var module_key = _g993["module-key"];
  var module = _g993.module;
  var setenv = _g993.setenv;
  var _g996 = nexus["lumen/lib"];
  var getenv = _g996.getenv;
  var macro_function = _g996["macro-function"];
  var macro63 = _g996["macro?"];
  var special63 = _g996["special?"];
  var special_form63 = _g996["special-form?"];
  var statement63 = _g996["statement?"];
  var symbol_expansion = _g996["symbol-expansion"];
  var symbol63 = _g996["symbol?"];
  var variable63 = _g996["variable?"];
  var bound63 = _g996["bound?"];
  var quoted = _g996.quoted;
  var stash42 = _g996["stash*"];
  var index = _g996.index;
  var bind = _g996.bind;
  var bind42 = _g996["bind*"];
  var quasiexpand = _g996.quasiexpand;
  var macroexpand = _g996.macroexpand;
  var indentation = _g996.indentation;
  var reserved63 = _g996["reserved?"];
  var valid_id63 = _g996["valid-id?"];
  var id = _g996.id;
  var key = _g996.key;
  var imported = _g996.imported;
  var link = _g996.link;
  var mapo = _g996.mapo;
  var quote_environment = _g996["quote-environment"];
  var quote_modules = _g996["quote-modules"];
  var initial_environment = _g996["initial-environment"];
  var _g997 = nexus["lumen/compiler"];
  var compile_function = _g997["compile-function"];
  var compile = _g997.compile;
  var open_module = _g997["open-module"];
  var load_module = _g997["load-module"];
  var in_module = _g997["in-module"];
  var import_modules = _g997["import-modules"];
  var compile_module = _g997["compile-module"];
  var declare = _g997.declare;
  var eval = _g997.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g1851 = nexus["lumen/runtime"];
  var nil63 = _g1851["nil?"];
  var is63 = _g1851["is?"];
  var length = _g1851.length;
  var none63 = _g1851["none?"];
  var some63 = _g1851["some?"];
  var one63 = _g1851["one?"];
  var hd = _g1851.hd;
  var string63 = _g1851["string?"];
  var number63 = _g1851["number?"];
  var boolean63 = _g1851["boolean?"];
  var function63 = _g1851["function?"];
  var composite63 = _g1851["composite?"];
  var atom63 = _g1851["atom?"];
  var table63 = _g1851["table?"];
  var list63 = _g1851["list?"];
  var substring = _g1851.substring;
  var sub = _g1851.sub;
  var keys = _g1851.keys;
  var inner = _g1851.inner;
  var tl = _g1851.tl;
  var char = _g1851.char;
  var code = _g1851.code;
  var string_literal63 = _g1851["string-literal?"];
  var id_literal63 = _g1851["id-literal?"];
  var add = _g1851.add;
  var drop = _g1851.drop;
  var last = _g1851.last;
  var butlast = _g1851.butlast;
  var reverse = _g1851.reverse;
  var join = _g1851.join;
  var reduce = _g1851.reduce;
  var keep = _g1851.keep;
  var in63 = _g1851["in?"];
  var find = _g1851.find;
  var pair = _g1851.pair;
  var sort = _g1851.sort;
  var iterate = _g1851.iterate;
  var replicate = _g1851.replicate;
  var series = _g1851.series;
  var map = _g1851.map;
  var keys63 = _g1851["keys?"];
  var empty63 = _g1851["empty?"];
  var stash = _g1851.stash;
  var unstash = _g1851.unstash;
  var search = _g1851.search;
  var split = _g1851.split;
  var cat = _g1851.cat;
  var _43 = _g1851["+"];
  var _ = _g1851["-"];
  var _42 = _g1851["*"];
  var _47 = _g1851["/"];
  var _37 = _g1851["%"];
  var _62 = _g1851[">"];
  var _60 = _g1851["<"];
  var _61 = _g1851["="];
  var _6261 = _g1851[">="];
  var _6061 = _g1851["<="];
  var read_file = _g1851["read-file"];
  var write_file = _g1851["write-file"];
  var write = _g1851.write;
  var exit = _g1851.exit;
  var today = _g1851.today;
  var now = _g1851.now;
  var number = _g1851.number;
  var string = _g1851.string;
  var space = _g1851.space;
  var apply = _g1851.apply;
  var make_id = _g1851["make-id"];
  var _37message_handler = _g1851["%message-handler"];
  var toplevel63 = _g1851["toplevel?"];
  var module_key = _g1851["module-key"];
  var module = _g1851.module;
  var setenv = _g1851.setenv;
  var _g1854 = nexus["lumen/lib"];
  var getenv = _g1854.getenv;
  var macro_function = _g1854["macro-function"];
  var macro63 = _g1854["macro?"];
  var special63 = _g1854["special?"];
  var special_form63 = _g1854["special-form?"];
  var statement63 = _g1854["statement?"];
  var symbol_expansion = _g1854["symbol-expansion"];
  var symbol63 = _g1854["symbol?"];
  var variable63 = _g1854["variable?"];
  var bound63 = _g1854["bound?"];
  var quoted = _g1854.quoted;
  var stash42 = _g1854["stash*"];
  var index = _g1854.index;
  var bind = _g1854.bind;
  var bind42 = _g1854["bind*"];
  var quasiexpand = _g1854.quasiexpand;
  var macroexpand = _g1854.macroexpand;
  var indentation = _g1854.indentation;
  var reserved63 = _g1854["reserved?"];
  var valid_id63 = _g1854["valid-id?"];
  var id = _g1854.id;
  var key = _g1854.key;
  var imported = _g1854.imported;
  var link = _g1854.link;
  var mapo = _g1854.mapo;
  var quote_environment = _g1854["quote-environment"];
  var quote_modules = _g1854["quote-modules"];
  var initial_environment = _g1854["initial-environment"];
  var _g1855 = nexus["lumen/compiler"];
  var compile_function = _g1855["compile-function"];
  var compile = _g1855.compile;
  var open_module = _g1855["open-module"];
  var load_module = _g1855["load-module"];
  var in_module = _g1855["in-module"];
  var import_modules = _g1855["import-modules"];
  var compile_module = _g1855["compile-module"];
  var declare = _g1855.declare;
  var eval = _g1855.eval;
  global.modules = {"lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {global: true, export: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {macro: function (form) {
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
    var l = [];
    var forms = [];
    var id = make_id();
    var _g1897 = body;
    var k = undefined;
    for (k in _g1897) {
      var v = _g1897[k];
      var _g1898 = parseInt(k);
      var _g2153;
      if (isNaN(_g1898)) {
        _g2153 = k;
      } else {
        _g2153 = _g1898;
      }
      var _g1899 = _g2153;
      if (number63(_g1899)) {
        l[_g1899] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _g1899]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1909) {
      var a = _g1909[0];
      var b = _g1909[1];
      var c = sub(_g1909, 2);
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
    var _g1913 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1913, 0);
    return(["if", cond, join(["do"], body)]);
  }, export: true}, unless: {macro: function (cond) {
    var _g1916 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1916, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var _g1922 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1922, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g1924 = bind(lh, rh);
      var k = undefined;
      for (k in _g1924) {
        var _g1926 = _g1924[k];
        var id = _g1926[0];
        var val = _g1926[1];
        var _g1925 = parseInt(k);
        var _g2154;
        if (isNaN(_g1925)) {
          _g2154 = k;
        } else {
          _g2154 = _g1925;
        }
        var _g1927 = _g2154;
        if (number63(_g1927)) {
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
  }, export: true}, "define-module": {macro: function (spec) {
    var _g1933 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1933, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g1934 = import_modules(imp);
    var imports = _g1934[0];
    var bindings = _g1934[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g1935 = exp || [];
    var _g990 = undefined;
    for (_g990 in _g1935) {
      var x = _g1935[_g990];
      var _g1936 = parseInt(_g990);
      var _g2155;
      if (isNaN(_g1936)) {
        _g2155 = _g990;
      } else {
        _g2155 = _g1936;
      }
      var _g1937 = _g2155;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var _g1943 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1943, 0);
    var form = join(["fn", args], body);
    var _g1945 = ["setenv", ["quote", name]];
    _g1945.macro = form;
    _g1945.form = ["quote", form];
    eval(_g1945);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var _g1948 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1948, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g1950 = ["setenv", ["quote", name]];
    _g1950.special = form;
    _g1950.form = ["quote", form];
    eval(join(_g1950, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define*": {macro: function (name, x) {
    var _g1954 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1954, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _g1955 = bind42(x, body);
      var args = _g1955[0];
      var _g1956 = _g1955[1];
      return(join(["%global-function", name, args], _g1956));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var _g1962 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g1962, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g1965 = bind42(x, body);
        var args = _g1965[0];
        var _g1966 = _g1965[1];
        return(link(name, join(["%local-function", name, args], _g1966)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, "with-bindings": {macro: function (_g1972) {
    var names = _g1972[0];
    var _g1971 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1971, 0);
    var x = make_id();
    var _g1976 = ["setenv", x];
    _g1976.variable = true;
    var _g1973 = ["with-frame", ["all", ["_g991", x], names, _g1976]];
    _g1973.scope = true;
    return(join(_g1973, body));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var _g1977 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1977, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g1978 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1978);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var _g1982 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1982, 0);
    add(environment, {});
    map(function (_g1985) {
      var name = _g1985[0];
      var exp = _g1985[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g1983 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g1983);
  }, export: true}, fn: {macro: function (args) {
    var _g1988 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g1988, 0);
    var _g1989 = bind42(args, body);
    var _g1990 = _g1989[0];
    var _g1991 = _g1989[1];
    return(join(["%function", _g1990], _g1991));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, all: {macro: function (_g2004, t) {
    var k = _g2004[0];
    var v = _g2004[1];
    var _g2003 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2003, 0);
    var x = make_id();
    var n = make_id();
    var _g2156;
    if (target === "lua") {
      _g2156 = body;
    } else {
      _g2156 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g2156)]]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g2017 = xs;
    var _g992 = undefined;
    for (_g992 in _g2017) {
      var x = _g2017[_g992];
      var _g2018 = parseInt(_g992);
      var _g2157;
      if (isNaN(_g2018)) {
        _g2157 = _g992;
      } else {
        _g2157 = _g2018;
      }
      var _g2019 = _g2157;
      l[x] = true;
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var _g2025 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g2025, 0);
    return(["set", a, join(["join*", a], bs)]);
  }, export: true}, "cat!": {macro: function (a) {
    var _g2028 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g2028, 0);
    return(["set", a, join(["cat", a], bs)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var _g2038 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g2038, 0);
    var scope = _g2038.scope;
    var x = make_id();
    var _g2041 = ["table"];
    _g2041._scope = scope;
    return(["do", ["add", "environment", _g2041], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, butlast: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {tr: true, export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    series(function (x) {
      str = str + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(str);
  }, stmt: true}, "%if": {tr: true, export: true, foo: true, special: function (cond, cons, alt) {
    var _g2063 = compile(cond);
    indent_level = indent_level + 1;
    var _g2065 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g2064 = _g2065;
    var _g2158;
    if (alt) {
      indent_level = indent_level + 1;
      var _g2067 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g2158 = _g2067;
    }
    var _g2066 = _g2158;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g2063 + ") {\n" + _g2064 + ind + "}";
    } else {
      str = str + ind + "if " + _g2063 + " then\n" + _g2064;
    }
    if (_g2066 && target === "js") {
      str = str + " else {\n" + _g2066 + ind + "}";
    } else {
      if (_g2066) {
        str = str + ind + "else\n" + _g2066;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, stmt: true}, "while": {tr: true, export: true, foo: true, special: function (cond, form) {
    var _g2069 = compile(cond);
    indent_level = indent_level + 1;
    var _g2070 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2070;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g2069 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g2069 + " do\n" + body + ind + "end\n");
    }
  }, stmt: true}, "%for": {tr: true, export: true, foo: true, special: function (t, k, form) {
    var _g2072 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2073 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2073;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g2072 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g2072 + ") {\n" + body + ind + "}\n");
    }
  }, stmt: true}, "%try": {tr: true, export: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2075 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2075;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g2079 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g2079;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, stmt: true}, "break": {special: function () {
    return(indentation() + "break");
  }, export: true, foo: true, stmt: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, export: true, foo: true}, "%global-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, stmt: true}, "%local-function": {tr: true, export: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, stmt: true}, "return": {special: function (x) {
    var _g2159;
    if (nil63(x)) {
      _g2159 = "return";
    } else {
      _g2159 = "return(" + compile(x) + ")";
    }
    var _g2087 = _g2159;
    return(indentation() + _g2087);
  }, export: true, foo: true, stmt: true}, error: {special: function (x) {
    var _g2160;
    if (target === "js") {
      _g2160 = "throw new " + compile(["Error", x]);
    } else {
      _g2160 = "error(" + compile(x) + ")";
    }
    var e = _g2160;
    return(indentation() + e);
  }, export: true, foo: true, stmt: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g2161;
    if (is63(value)) {
      _g2161 = " = " + value1;
    } else {
      _g2161 = "";
    }
    var rh = _g2161;
    var _g2162;
    if (target === "js") {
      _g2162 = "var ";
    } else {
      _g2162 = "local ";
    }
    var keyword = _g2162;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, export: true, foo: true, stmt: true}, set: {special: function (lh, rh) {
    var _g2092 = compile(lh);
    var _g2163;
    if (nil63(rh)) {
      _g2163 = "nil";
    } else {
      _g2163 = rh;
    }
    var _g2093 = compile(_g2163);
    return(indentation() + _g2092 + " = " + _g2093);
  }, export: true, foo: true, stmt: true}, get: {special: function (t, k) {
    var _g2095 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g2095, 0) === "{") {
      _g2095 = "(" + _g2095 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g2095 + "." + inner(k));
    } else {
      return(_g2095 + "[" + k1 + "]");
    }
  }, export: true, foo: true}, "not": {}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g2164;
    if (target === "lua") {
      _g2164 = "{";
    } else {
      _g2164 = "[";
    }
    var open = _g2164;
    var _g2165;
    if (target === "lua") {
      _g2165 = "}";
    } else {
      _g2165 = "]";
    }
    var close = _g2165;
    var str = "";
    var comma = "";
    var _g2096 = forms;
    var k = undefined;
    for (k in _g2096) {
      var v = _g2096[k];
      var _g2097 = parseInt(k);
      var _g2166;
      if (isNaN(_g2097)) {
        _g2166 = k;
      } else {
        _g2166 = _g2097;
      }
      var _g2098 = _g2166;
      if (number63(_g2098)) {
        str = str + comma + compile(v);
        comma = ", ";
      }
    }
    return(open + str + close);
  }, export: true, foo: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g2167;
    if (target === "lua") {
      _g2167 = " = ";
    } else {
      _g2167 = ": ";
    }
    var sep = _g2167;
    var comma = "";
    var _g2099 = pair(forms);
    var k = undefined;
    for (k in _g2099) {
      var v = _g2099[k];
      var _g2100 = parseInt(k);
      var _g2168;
      if (isNaN(_g2100)) {
        _g2168 = k;
      } else {
        _g2168 = _g2100;
      }
      var _g2101 = _g2168;
      if (number63(_g2101)) {
        var _g2102 = v[0];
        var _g2103 = v[1];
        if (!string63(_g2102)) {
          throw new Error("Illegal key: " + string(_g2102));
        }
        str = str + comma + key(_g2102) + sep + compile(_g2103);
        comma = ", ";
      }
    }
    return(str + "}");
  }, export: true, foo: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g2127) {
    var char = _g2127[0];
    var stream = _g2127[1];
    var _g2126 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2126, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var _g2143 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2143, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g2144 = import_modules(imp);
    var imports = _g2144[0];
    var bindings = _g2144[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g2145 = exp || [];
    var _g990 = undefined;
    for (_g990 in _g2145) {
      var x = _g2145[_g990];
      var _g2146 = parseInt(_g990);
      var _g2169;
      if (isNaN(_g2146)) {
        _g2169 = _g990;
      } else {
        _g2169 = _g2146;
      }
      var _g2147 = _g2169;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g2170 = nexus["lumen/runtime"];
  var nil63 = _g2170["nil?"];
  var is63 = _g2170["is?"];
  var length = _g2170.length;
  var none63 = _g2170["none?"];
  var some63 = _g2170["some?"];
  var one63 = _g2170["one?"];
  var hd = _g2170.hd;
  var string63 = _g2170["string?"];
  var number63 = _g2170["number?"];
  var boolean63 = _g2170["boolean?"];
  var function63 = _g2170["function?"];
  var composite63 = _g2170["composite?"];
  var atom63 = _g2170["atom?"];
  var table63 = _g2170["table?"];
  var list63 = _g2170["list?"];
  var substring = _g2170.substring;
  var sub = _g2170.sub;
  var keys = _g2170.keys;
  var inner = _g2170.inner;
  var tl = _g2170.tl;
  var char = _g2170.char;
  var code = _g2170.code;
  var string_literal63 = _g2170["string-literal?"];
  var id_literal63 = _g2170["id-literal?"];
  var add = _g2170.add;
  var drop = _g2170.drop;
  var last = _g2170.last;
  var butlast = _g2170.butlast;
  var reverse = _g2170.reverse;
  var join = _g2170.join;
  var reduce = _g2170.reduce;
  var keep = _g2170.keep;
  var in63 = _g2170["in?"];
  var find = _g2170.find;
  var pair = _g2170.pair;
  var sort = _g2170.sort;
  var iterate = _g2170.iterate;
  var replicate = _g2170.replicate;
  var series = _g2170.series;
  var map = _g2170.map;
  var keys63 = _g2170["keys?"];
  var empty63 = _g2170["empty?"];
  var stash = _g2170.stash;
  var unstash = _g2170.unstash;
  var search = _g2170.search;
  var split = _g2170.split;
  var cat = _g2170.cat;
  var _43 = _g2170["+"];
  var _ = _g2170["-"];
  var _42 = _g2170["*"];
  var _47 = _g2170["/"];
  var _37 = _g2170["%"];
  var _62 = _g2170[">"];
  var _60 = _g2170["<"];
  var _61 = _g2170["="];
  var _6261 = _g2170[">="];
  var _6061 = _g2170["<="];
  var read_file = _g2170["read-file"];
  var write_file = _g2170["write-file"];
  var write = _g2170.write;
  var exit = _g2170.exit;
  var today = _g2170.today;
  var now = _g2170.now;
  var number = _g2170.number;
  var string = _g2170.string;
  var space = _g2170.space;
  var apply = _g2170.apply;
  var make_id = _g2170["make-id"];
  var _37message_handler = _g2170["%message-handler"];
  var toplevel63 = _g2170["toplevel?"];
  var module_key = _g2170["module-key"];
  var module = _g2170.module;
  var setenv = _g2170.setenv;
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
  var butlast = _g2.butlast;
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
    var _g2174 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g2181) {
        return([false, _g2181.message]);
      }
    })();
    var _g1 = _g2174[0];
    var x = _g2174[1];
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
