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
      var _g175;
      if (nil63(from) || from < 0) {
        _g175 = 0;
      } else {
        _g175 = from;
      }
      var i = _g175;
      var n = length(x);
      var _g176;
      if (nil63(upto) || upto > n) {
        _g176 = n;
      } else {
        _g176 = upto;
      }
      var _g58 = _g176;
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
        var _g177;
        if (isNaN(_g60)) {
          _g177 = k;
        } else {
          _g177 = _g60;
        }
        var _g61 = _g177;
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
      var _g178;
      if (isNaN(_g64)) {
        _g178 = k;
      } else {
        _g178 = _g64;
      }
      var _g65 = _g178;
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
      var _g77 = a;
      var k = undefined;
      for (k in _g77) {
        var v = _g77[k];
        var _g78 = parseInt(k);
        var _g179;
        if (isNaN(_g78)) {
          _g179 = k;
        } else {
          _g179 = _g78;
        }
        var _g79 = _g179;
        c[_g79] = v;
      }
      var _g80 = b;
      var k = undefined;
      for (k in _g80) {
        var v = _g80[k];
        var _g81 = parseInt(k);
        var _g180;
        if (isNaN(_g81)) {
          _g180 = k;
        } else {
          _g180 = _g81;
        }
        var _g82 = _g180;
        if (number63(_g82)) {
          _g82 = _g82 + o;
        }
        c[_g82] = v;
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
    var _g86 = x;
    var k = undefined;
    for (k in _g86) {
      var v = _g86[k];
      var _g87 = parseInt(k);
      var _g181;
      if (isNaN(_g87)) {
        _g181 = k;
      } else {
        _g181 = _g87;
      }
      var _g88 = _g181;
      if (f(v)) {
        t[shift(_g88, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g90 = t;
    var _g32 = undefined;
    for (_g32 in _g90) {
      var y = _g90[_g32];
      var _g91 = parseInt(_g32);
      var _g182;
      if (isNaN(_g91)) {
        _g182 = _g32;
      } else {
        _g182 = _g91;
      }
      var _g92 = _g182;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g94 = t;
    var _g33 = undefined;
    for (_g33 in _g94) {
      var x = _g94[_g33];
      var _g95 = parseInt(_g33);
      var _g183;
      if (isNaN(_g95)) {
        _g183 = _g33;
      } else {
        _g183 = _g95;
      }
      var _g96 = _g183;
      var _g97 = f(x);
      if (_g97) {
        return(_g97);
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
    var _g184;
    if (f) {
      _g184 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g184));
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
    var _g108 = x;
    var k = undefined;
    for (k in _g108) {
      var v = _g108[k];
      var _g109 = parseInt(k);
      var _g185;
      if (isNaN(_g109)) {
        _g185 = k;
      } else {
        _g185 = _g109;
      }
      var _g110 = _g185;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g110, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _g112 = t;
    var k = undefined;
    for (k in _g112) {
      var _g34 = _g112[k];
      var _g113 = parseInt(k);
      var _g186;
      if (isNaN(_g113)) {
        _g186 = k;
      } else {
        _g186 = _g113;
      }
      var _g114 = _g186;
      if (!number63(_g114)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _g116 = t;
    var _g35 = undefined;
    for (_g35 in _g116) {
      var _g36 = _g116[_g35];
      var _g117 = parseInt(_g35);
      var _g187;
      if (isNaN(_g117)) {
        _g187 = _g35;
      } else {
        _g187 = _g117;
      }
      var _g118 = _g187;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _g120 = args;
      var k = undefined;
      for (k in _g120) {
        var v = _g120[k];
        var _g121 = parseInt(k);
        var _g188;
        if (isNaN(_g121)) {
          _g188 = k;
        } else {
          _g188 = _g121;
        }
        var _g122 = _g188;
        if (!number63(_g122)) {
          p[_g122] = v;
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
        var _g124 = l;
        var k = undefined;
        for (k in _g124) {
          var v = _g124[k];
          var _g125 = parseInt(k);
          var _g189;
          if (isNaN(_g125)) {
            _g189 = k;
          } else {
            _g189 = _g125;
          }
          var _g126 = _g189;
          if (!(_g126 === "_stash")) {
            args1[_g126] = v;
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
            var _g151 = x;
            var k = undefined;
            for (k in _g151) {
              var v = _g151[k];
              var _g152 = parseInt(k);
              var _g190;
              if (isNaN(_g152)) {
                _g190 = k;
              } else {
                _g190 = _g152;
              }
              var _g153 = _g190;
              if (number63(_g153)) {
                xs[_g153] = string(v);
              } else {
                add(ks, _g153 + ":");
                add(ks, string(v));
              }
            }
            var _g154 = join(xs, ks);
            var _g37 = undefined;
            for (_g37 in _g154) {
              var v = _g154[_g37];
              var _g155 = parseInt(_g37);
              var _g191;
              if (isNaN(_g155)) {
                _g191 = _g37;
              } else {
                _g191 = _g155;
              }
              var _g156 = _g191;
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
    var _g163 = stash(args);
    return(f.apply(f, _g163));
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
    var _g170 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g170, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g171 = keys;
      var _g173 = undefined;
      for (_g173 in _g171) {
        var v = _g171[_g173];
        var _g172 = parseInt(_g173);
        var _g192;
        if (isNaN(_g172)) {
          _g192 = _g173;
        } else {
          _g192 = _g172;
        }
        var _g174 = _g192;
        x[_g174] = v;
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
  var _g196 = nexus["lumen/runtime"];
  var nil63 = _g196["nil?"];
  var is63 = _g196["is?"];
  var length = _g196.length;
  var none63 = _g196["none?"];
  var some63 = _g196["some?"];
  var one63 = _g196["one?"];
  var hd = _g196.hd;
  var string63 = _g196["string?"];
  var number63 = _g196["number?"];
  var boolean63 = _g196["boolean?"];
  var function63 = _g196["function?"];
  var composite63 = _g196["composite?"];
  var atom63 = _g196["atom?"];
  var table63 = _g196["table?"];
  var list63 = _g196["list?"];
  var substring = _g196.substring;
  var sub = _g196.sub;
  var keys = _g196.keys;
  var inner = _g196.inner;
  var tl = _g196.tl;
  var char = _g196.char;
  var code = _g196.code;
  var string_literal63 = _g196["string-literal?"];
  var id_literal63 = _g196["id-literal?"];
  var add = _g196.add;
  var drop = _g196.drop;
  var last = _g196.last;
  var reverse = _g196.reverse;
  var join = _g196.join;
  var reduce = _g196.reduce;
  var keep = _g196.keep;
  var in63 = _g196["in?"];
  var find = _g196.find;
  var pair = _g196.pair;
  var sort = _g196.sort;
  var iterate = _g196.iterate;
  var replicate = _g196.replicate;
  var series = _g196.series;
  var map = _g196.map;
  var keys63 = _g196["keys?"];
  var empty63 = _g196["empty?"];
  var stash = _g196.stash;
  var unstash = _g196.unstash;
  var search = _g196.search;
  var split = _g196.split;
  var cat = _g196.cat;
  var _43 = _g196["+"];
  var _ = _g196["-"];
  var _42 = _g196["*"];
  var _47 = _g196["/"];
  var _37 = _g196["%"];
  var _62 = _g196[">"];
  var _60 = _g196["<"];
  var _61 = _g196["="];
  var _6261 = _g196[">="];
  var _6061 = _g196["<="];
  var read_file = _g196["read-file"];
  var write_file = _g196["write-file"];
  var write = _g196.write;
  var exit = _g196.exit;
  var today = _g196.today;
  var now = _g196.now;
  var number = _g196.number;
  var string = _g196.string;
  var space = _g196.space;
  var apply = _g196.apply;
  var make_id = _g196["make-id"];
  var _37message_handler = _g196["%message-handler"];
  var toplevel63 = _g196["toplevel?"];
  var module_key = _g196["module-key"];
  var module = _g196.module;
  var setenv = _g196.setenv;
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
      var _g371;
      if (c === "\n") {
        _g371 = "\\n";
      } else {
        var _g372;
        if (c === "\"") {
          _g372 = "\\\"";
        } else {
          var _g373;
          if (c === "\\") {
            _g373 = "\\\\";
          } else {
            _g373 = c;
          }
          _g372 = _g373;
        }
        _g371 = _g372;
      }
      var c1 = _g371;
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
      var _g218 = args;
      var k = undefined;
      for (k in _g218) {
        var v = _g218[k];
        var _g219 = parseInt(k);
        var _g374;
        if (isNaN(_g219)) {
          _g374 = k;
        } else {
          _g374 = _g219;
        }
        var _g220 = _g374;
        if (!number63(_g220)) {
          add(l, literal(_g220));
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
        var _g229 = lh;
        var k = undefined;
        for (k in _g229) {
          var v = _g229[k];
          var _g230 = parseInt(k);
          var _g375;
          if (isNaN(_g230)) {
            _g375 = k;
          } else {
            _g375 = _g230;
          }
          var _g231 = _g375;
          var _g376;
          if (_g231 === "&") {
            _g376 = ["sub", rh, length(lh)];
          } else {
            _g376 = ["get", rh, ["quote", bias(_g231)]];
          }
          var x = _g376;
          var _g377;
          if (v === true) {
            _g377 = _g231;
          } else {
            _g377 = v;
          }
          var _g235 = _g377;
          bs = join(bs, bind(_g235, x));
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
      var _g252 = args;
      var k = undefined;
      for (k in _g252) {
        var v = _g252[k];
        var _g253 = parseInt(k);
        var _g378;
        if (isNaN(_g253)) {
          _g378 = k;
        } else {
          _g378 = _g253;
        }
        var _g254 = _g378;
        if (number63(_g254)) {
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
          var _g193 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g194 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g269 = args;
            var _g989 = undefined;
            for (_g989 in _g269) {
              var _g267 = _g269[_g989];
              var _g270 = parseInt(_g989);
              var _g380;
              if (isNaN(_g270)) {
                _g380 = _g989;
              } else {
                _g380 = _g270;
              }
              var _g271 = _g380;
              setenv(_g267, {_stash: true, variable: true});
            }
            var _g268 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g268);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g195 = form[0];
              var _g273 = form[1];
              var _g274 = form[2];
              var _g275 = sub(form, 3);
              add(environment, {_scope: true});
              var _g278 = _g274;
              var _g989 = undefined;
              for (_g989 in _g278) {
                var _g276 = _g278[_g989];
                var _g279 = parseInt(_g989);
                var _g379;
                if (isNaN(_g279)) {
                  _g379 = _g989;
                } else {
                  _g379 = _g279;
                }
                var _g280 = _g379;
                setenv(_g276, {_stash: true, variable: true});
              }
              var _g277 = join([x, _g273, _g274], macroexpand(_g275));
              drop(environment);
              return(_g277);
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
    var _g285 = form;
    var k = undefined;
    for (k in _g285) {
      var v = _g285[k];
      var _g286 = parseInt(k);
      var _g381;
      if (isNaN(_g286)) {
        _g381 = k;
      } else {
        _g381 = _g286;
      }
      var _g287 = _g381;
      if (!number63(_g287)) {
        var _g382;
        if (quasisplice63(v, depth)) {
          _g382 = quasiexpand(v[1]);
        } else {
          _g382 = quasiexpand(v, depth);
        }
        var _g288 = _g382;
        last(xs)[_g287] = _g288;
      }
    }
    series(function (x) {
      if (quasisplice63(x, depth)) {
        var _g290 = quasiexpand(x[1]);
        add(xs, _g290);
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
      var _g383;
      if (c === "-") {
        _g383 = "_";
      } else {
        var _g384;
        if (valid_code63(n)) {
          _g384 = c;
        } else {
          var _g385;
          if (i === 0) {
            _g385 = "_" + n;
          } else {
            _g385 = n;
          }
          _g384 = _g385;
        }
        _g383 = _g384;
      }
      var c1 = _g383;
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
    var _g329 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _g329.private;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g330 = module(spec).export;
      var _g332 = undefined;
      for (_g332 in _g330) {
        var v = _g330[_g332];
        var _g331 = parseInt(_g332);
        var _g386;
        if (isNaN(_g331)) {
          _g386 = _g332;
        } else {
          _g386 = _g331;
        }
        var _g333 = _g386;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _g333, ["get", m, ["quote", _g333]]]);
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
    var _g348 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_g348, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _g349 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_g349, 0);
    var t1 = [];
    var _g350 = t;
    var k = undefined;
    for (k in _g350) {
      var v = _g350[k];
      var _g351 = parseInt(k);
      var _g387;
      if (isNaN(_g351)) {
        _g387 = k;
      } else {
        _g387 = _g351;
      }
      var _g352 = _g387;
      if (!keys[_g352]) {
        t1[_g352] = v;
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
    var _g356 = t;
    var k = undefined;
    for (k in _g356) {
      var v = _g356[k];
      var _g357 = parseInt(k);
      var _g388;
      if (isNaN(_g357)) {
        _g388 = k;
      } else {
        _g388 = _g357;
      }
      var _g358 = _g388;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_g358));
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
    var _g366 = ["table"];
    _g366.import = quoted(m.import);
    _g366.alias = quoted(m.alias);
    _g366.export = quote_frame(m.export);
    return(_g366);
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
  var _g389 = nexus["lumen/runtime"];
  var nil63 = _g389["nil?"];
  var is63 = _g389["is?"];
  var length = _g389.length;
  var none63 = _g389["none?"];
  var some63 = _g389["some?"];
  var one63 = _g389["one?"];
  var hd = _g389.hd;
  var string63 = _g389["string?"];
  var number63 = _g389["number?"];
  var boolean63 = _g389["boolean?"];
  var function63 = _g389["function?"];
  var composite63 = _g389["composite?"];
  var atom63 = _g389["atom?"];
  var table63 = _g389["table?"];
  var list63 = _g389["list?"];
  var substring = _g389.substring;
  var sub = _g389.sub;
  var keys = _g389.keys;
  var inner = _g389.inner;
  var tl = _g389.tl;
  var char = _g389.char;
  var code = _g389.code;
  var string_literal63 = _g389["string-literal?"];
  var id_literal63 = _g389["id-literal?"];
  var add = _g389.add;
  var drop = _g389.drop;
  var last = _g389.last;
  var reverse = _g389.reverse;
  var join = _g389.join;
  var reduce = _g389.reduce;
  var keep = _g389.keep;
  var in63 = _g389["in?"];
  var find = _g389.find;
  var pair = _g389.pair;
  var sort = _g389.sort;
  var iterate = _g389.iterate;
  var replicate = _g389.replicate;
  var series = _g389.series;
  var map = _g389.map;
  var keys63 = _g389["keys?"];
  var empty63 = _g389["empty?"];
  var stash = _g389.stash;
  var unstash = _g389.unstash;
  var search = _g389.search;
  var split = _g389.split;
  var cat = _g389.cat;
  var _43 = _g389["+"];
  var _ = _g389["-"];
  var _42 = _g389["*"];
  var _47 = _g389["/"];
  var _37 = _g389["%"];
  var _62 = _g389[">"];
  var _60 = _g389["<"];
  var _61 = _g389["="];
  var _6261 = _g389[">="];
  var _6061 = _g389["<="];
  var read_file = _g389["read-file"];
  var write_file = _g389["write-file"];
  var write = _g389.write;
  var exit = _g389.exit;
  var today = _g389.today;
  var now = _g389.now;
  var number = _g389.number;
  var string = _g389.string;
  var space = _g389.space;
  var apply = _g389.apply;
  var make_id = _g389["make-id"];
  var _37message_handler = _g389["%message-handler"];
  var toplevel63 = _g389["toplevel?"];
  var module_key = _g389["module-key"];
  var module = _g389.module;
  var setenv = _g389.setenv;
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
  var _g438 = nexus["lumen/runtime"];
  var nil63 = _g438["nil?"];
  var is63 = _g438["is?"];
  var length = _g438.length;
  var none63 = _g438["none?"];
  var some63 = _g438["some?"];
  var one63 = _g438["one?"];
  var hd = _g438.hd;
  var string63 = _g438["string?"];
  var number63 = _g438["number?"];
  var boolean63 = _g438["boolean?"];
  var function63 = _g438["function?"];
  var composite63 = _g438["composite?"];
  var atom63 = _g438["atom?"];
  var table63 = _g438["table?"];
  var list63 = _g438["list?"];
  var substring = _g438.substring;
  var sub = _g438.sub;
  var keys = _g438.keys;
  var inner = _g438.inner;
  var tl = _g438.tl;
  var char = _g438.char;
  var code = _g438.code;
  var string_literal63 = _g438["string-literal?"];
  var id_literal63 = _g438["id-literal?"];
  var add = _g438.add;
  var drop = _g438.drop;
  var last = _g438.last;
  var reverse = _g438.reverse;
  var join = _g438.join;
  var reduce = _g438.reduce;
  var keep = _g438.keep;
  var in63 = _g438["in?"];
  var find = _g438.find;
  var pair = _g438.pair;
  var sort = _g438.sort;
  var iterate = _g438.iterate;
  var replicate = _g438.replicate;
  var series = _g438.series;
  var map = _g438.map;
  var keys63 = _g438["keys?"];
  var empty63 = _g438["empty?"];
  var stash = _g438.stash;
  var unstash = _g438.unstash;
  var search = _g438.search;
  var split = _g438.split;
  var cat = _g438.cat;
  var _43 = _g438["+"];
  var _ = _g438["-"];
  var _42 = _g438["*"];
  var _47 = _g438["/"];
  var _37 = _g438["%"];
  var _62 = _g438[">"];
  var _60 = _g438["<"];
  var _61 = _g438["="];
  var _6261 = _g438[">="];
  var _6061 = _g438["<="];
  var read_file = _g438["read-file"];
  var write_file = _g438["write-file"];
  var write = _g438.write;
  var exit = _g438.exit;
  var today = _g438.today;
  var now = _g438.now;
  var number = _g438.number;
  var string = _g438.string;
  var space = _g438.space;
  var apply = _g438.apply;
  var make_id = _g438["make-id"];
  var _37message_handler = _g438["%message-handler"];
  var toplevel63 = _g438["toplevel?"];
  var module_key = _g438["module-key"];
  var module = _g438.module;
  var setenv = _g438.setenv;
  var _g441 = nexus["lumen/lib"];
  var getenv = _g441.getenv;
  var macro_function = _g441["macro-function"];
  var macro63 = _g441["macro?"];
  var special63 = _g441["special?"];
  var special_form63 = _g441["special-form?"];
  var statement63 = _g441["statement?"];
  var symbol_expansion = _g441["symbol-expansion"];
  var symbol63 = _g441["symbol?"];
  var variable63 = _g441["variable?"];
  var bound63 = _g441["bound?"];
  var quoted = _g441.quoted;
  var stash42 = _g441["stash*"];
  var index = _g441.index;
  var bind = _g441.bind;
  var bind42 = _g441["bind*"];
  var quasiexpand = _g441.quasiexpand;
  var macroexpand = _g441.macroexpand;
  var indentation = _g441.indentation;
  var reserved63 = _g441["reserved?"];
  var valid_id63 = _g441["valid-id?"];
  var id = _g441.id;
  var key = _g441.key;
  var imported = _g441.imported;
  var link = _g441.link;
  var mapo = _g441.mapo;
  var quote_environment = _g441["quote-environment"];
  var quote_modules = _g441["quote-modules"];
  var initial_environment = _g441["initial-environment"];
  var _g442 = nexus["lumen/reader"];
  var make_stream = _g442["make-stream"];
  var read_table = _g442["read-table"];
  var read = _g442.read;
  var read_all = _g442["read-all"];
  var read_from_string = _g442["read-from-string"];
  var _g445 = [];
  var _g446 = [];
  _g446.js = "!";
  _g446.lua = "not ";
  _g445["not"] = _g446;
  var _g448 = [];
  _g448["*"] = true;
  _g448["/"] = true;
  _g448["%"] = true;
  var _g450 = [];
  _g450["+"] = true;
  _g450["-"] = true;
  var _g452 = [];
  var _g453 = [];
  _g453.js = "+";
  _g453.lua = "..";
  _g452.cat = _g453;
  var _g455 = [];
  _g455["<"] = true;
  _g455[">"] = true;
  _g455["<="] = true;
  _g455[">="] = true;
  var _g457 = [];
  var _g458 = [];
  _g458.js = "===";
  _g458.lua = "==";
  _g457["="] = _g458;
  var _g459 = [];
  _g459.js = "!=";
  _g459.lua = "~=";
  _g457["~="] = _g459;
  var _g461 = [];
  var _g462 = [];
  _g462.js = "&&";
  _g462.lua = "and";
  _g461["and"] = _g462;
  var _g464 = [];
  var _g465 = [];
  _g465.js = "||";
  _g465.lua = "or";
  _g464["or"] = _g465;
  var infix = [_g445, _g448, _g450, _g452, _g455, _g457, _g461, _g464];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g469 = infix;
      var k = undefined;
      for (k in _g469) {
        var v = _g469[k];
        var _g470 = parseInt(k);
        var _g581;
        if (isNaN(_g470)) {
          _g581 = k;
        } else {
          _g581 = _g470;
        }
        var _g471 = _g581;
        if (v[hd(form)]) {
          return(index(_g471));
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
    var _g480 = getenv(x);
    var special = _g480.special;
    var stmt = _g480.stmt;
    var self_tr63 = _g480.tr;
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
    var _g483 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g483.right;
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
    var _g487 = sub(form, 1);
    var a = _g487[0];
    var b = _g487[1];
    var _g488 = op_delims(form, a);
    var ao = _g488[0];
    var ac = _g488[1];
    var _g489 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g489[0];
    var bc = _g489[1];
    var _g490 = compile(a);
    var _g491 = compile(b);
    var _g492 = getop(op);
    if (unary63(form)) {
      return(_g492 + ao + _g490 + ac);
    } else {
      return(ao + _g490 + ac + " " + _g492 + " " + bo + _g491 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g493 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g493.name;
    var prefix = _g493.prefix;
    var _g583;
    if (name) {
      _g583 = compile(name);
    } else {
      _g583 = "";
    }
    var id = _g583;
    var _g494 = prefix || "";
    var _g495 = compile_args(args);
    indent_level = indent_level + 1;
    var _g497 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g496 = _g497;
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
      return("function " + id + _g495 + " {\n" + _g496 + ind + "}" + tr);
    } else {
      return(_g494 + "function " + id + _g495 + "\n" + _g496 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g499 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g499.stmt;
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
        var _g500 = _g586;
        return(ind + _g500 + tr);
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
    var _g508 = args;
    var k = undefined;
    for (k in _g508) {
      var x = _g508[k];
      var _g509 = parseInt(k);
      var _g588;
      if (isNaN(_g509)) {
        _g588 = k;
      } else {
        _g588 = _g509;
      }
      var _g510 = _g588;
      if (number63(_g510) && index(_g510) < n) {
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
    var _g513 = args[1];
    var _g514 = args[2];
    if (stmt63 || tail63) {
      var _g590;
      if (_g514) {
        _g590 = [lower_body([_g514], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g513], tail63)], _g590)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g589;
      if (_g514) {
        _g589 = [lower(["set", e, _g514])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g513])], _g589));
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
      var _g591;
      if (x === "and") {
        _g591 = ["%if", id, b, id];
      } else {
        _g591 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g591], hoist));
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
      var _g592;
      if (isNaN(_g565)) {
        _g592 = k;
      } else {
        _g592 = _g565;
      }
      var _g566 = _g592;
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
  var _g593 = nexus["lumen/runtime"];
  var nil63 = _g593["nil?"];
  var is63 = _g593["is?"];
  var length = _g593.length;
  var none63 = _g593["none?"];
  var some63 = _g593["some?"];
  var one63 = _g593["one?"];
  var hd = _g593.hd;
  var string63 = _g593["string?"];
  var number63 = _g593["number?"];
  var boolean63 = _g593["boolean?"];
  var function63 = _g593["function?"];
  var composite63 = _g593["composite?"];
  var atom63 = _g593["atom?"];
  var table63 = _g593["table?"];
  var list63 = _g593["list?"];
  var substring = _g593.substring;
  var sub = _g593.sub;
  var keys = _g593.keys;
  var inner = _g593.inner;
  var tl = _g593.tl;
  var char = _g593.char;
  var code = _g593.code;
  var string_literal63 = _g593["string-literal?"];
  var id_literal63 = _g593["id-literal?"];
  var add = _g593.add;
  var drop = _g593.drop;
  var last = _g593.last;
  var reverse = _g593.reverse;
  var join = _g593.join;
  var reduce = _g593.reduce;
  var keep = _g593.keep;
  var in63 = _g593["in?"];
  var find = _g593.find;
  var pair = _g593.pair;
  var sort = _g593.sort;
  var iterate = _g593.iterate;
  var replicate = _g593.replicate;
  var series = _g593.series;
  var map = _g593.map;
  var keys63 = _g593["keys?"];
  var empty63 = _g593["empty?"];
  var stash = _g593.stash;
  var unstash = _g593.unstash;
  var search = _g593.search;
  var split = _g593.split;
  var cat = _g593.cat;
  var _43 = _g593["+"];
  var _ = _g593["-"];
  var _42 = _g593["*"];
  var _47 = _g593["/"];
  var _37 = _g593["%"];
  var _62 = _g593[">"];
  var _60 = _g593["<"];
  var _61 = _g593["="];
  var _6261 = _g593[">="];
  var _6061 = _g593["<="];
  var read_file = _g593["read-file"];
  var write_file = _g593["write-file"];
  var write = _g593.write;
  var exit = _g593.exit;
  var today = _g593.today;
  var now = _g593.now;
  var number = _g593.number;
  var string = _g593.string;
  var space = _g593.space;
  var apply = _g593.apply;
  var make_id = _g593["make-id"];
  var _37message_handler = _g593["%message-handler"];
  var toplevel63 = _g593["toplevel?"];
  var module_key = _g593["module-key"];
  var module = _g593.module;
  var setenv = _g593.setenv;
  var _g596 = nexus["lumen/lib"];
  var getenv = _g596.getenv;
  var macro_function = _g596["macro-function"];
  var macro63 = _g596["macro?"];
  var special63 = _g596["special?"];
  var special_form63 = _g596["special-form?"];
  var statement63 = _g596["statement?"];
  var symbol_expansion = _g596["symbol-expansion"];
  var symbol63 = _g596["symbol?"];
  var variable63 = _g596["variable?"];
  var bound63 = _g596["bound?"];
  var quoted = _g596.quoted;
  var stash42 = _g596["stash*"];
  var index = _g596.index;
  var bind = _g596.bind;
  var bind42 = _g596["bind*"];
  var quasiexpand = _g596.quasiexpand;
  var macroexpand = _g596.macroexpand;
  var indentation = _g596.indentation;
  var reserved63 = _g596["reserved?"];
  var valid_id63 = _g596["valid-id?"];
  var id = _g596.id;
  var key = _g596.key;
  var imported = _g596.imported;
  var link = _g596.link;
  var mapo = _g596.mapo;
  var quote_environment = _g596["quote-environment"];
  var quote_modules = _g596["quote-modules"];
  var initial_environment = _g596["initial-environment"];
  var _g597 = nexus["lumen/compiler"];
  var compile_function = _g597["compile-function"];
  var compile = _g597.compile;
  var open_module = _g597["open-module"];
  var load_module = _g597["load-module"];
  var in_module = _g597["in-module"];
  var import_modules = _g597["import-modules"];
  var compile_module = _g597["compile-module"];
  var declare = _g597.declare;
  var eval = _g597.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g995 = nexus["lumen/runtime"];
  var nil63 = _g995["nil?"];
  var is63 = _g995["is?"];
  var length = _g995.length;
  var none63 = _g995["none?"];
  var some63 = _g995["some?"];
  var one63 = _g995["one?"];
  var hd = _g995.hd;
  var string63 = _g995["string?"];
  var number63 = _g995["number?"];
  var boolean63 = _g995["boolean?"];
  var function63 = _g995["function?"];
  var composite63 = _g995["composite?"];
  var atom63 = _g995["atom?"];
  var table63 = _g995["table?"];
  var list63 = _g995["list?"];
  var substring = _g995.substring;
  var sub = _g995.sub;
  var keys = _g995.keys;
  var inner = _g995.inner;
  var tl = _g995.tl;
  var char = _g995.char;
  var code = _g995.code;
  var string_literal63 = _g995["string-literal?"];
  var id_literal63 = _g995["id-literal?"];
  var add = _g995.add;
  var drop = _g995.drop;
  var last = _g995.last;
  var reverse = _g995.reverse;
  var join = _g995.join;
  var reduce = _g995.reduce;
  var keep = _g995.keep;
  var in63 = _g995["in?"];
  var find = _g995.find;
  var pair = _g995.pair;
  var sort = _g995.sort;
  var iterate = _g995.iterate;
  var replicate = _g995.replicate;
  var series = _g995.series;
  var map = _g995.map;
  var keys63 = _g995["keys?"];
  var empty63 = _g995["empty?"];
  var stash = _g995.stash;
  var unstash = _g995.unstash;
  var search = _g995.search;
  var split = _g995.split;
  var cat = _g995.cat;
  var _43 = _g995["+"];
  var _ = _g995["-"];
  var _42 = _g995["*"];
  var _47 = _g995["/"];
  var _37 = _g995["%"];
  var _62 = _g995[">"];
  var _60 = _g995["<"];
  var _61 = _g995["="];
  var _6261 = _g995[">="];
  var _6061 = _g995["<="];
  var read_file = _g995["read-file"];
  var write_file = _g995["write-file"];
  var write = _g995.write;
  var exit = _g995.exit;
  var today = _g995.today;
  var now = _g995.now;
  var number = _g995.number;
  var string = _g995.string;
  var space = _g995.space;
  var apply = _g995.apply;
  var make_id = _g995["make-id"];
  var _37message_handler = _g995["%message-handler"];
  var toplevel63 = _g995["toplevel?"];
  var module_key = _g995["module-key"];
  var module = _g995.module;
  var setenv = _g995.setenv;
  var _g998 = nexus["lumen/lib"];
  var getenv = _g998.getenv;
  var macro_function = _g998["macro-function"];
  var macro63 = _g998["macro?"];
  var special63 = _g998["special?"];
  var special_form63 = _g998["special-form?"];
  var statement63 = _g998["statement?"];
  var symbol_expansion = _g998["symbol-expansion"];
  var symbol63 = _g998["symbol?"];
  var variable63 = _g998["variable?"];
  var bound63 = _g998["bound?"];
  var quoted = _g998.quoted;
  var stash42 = _g998["stash*"];
  var index = _g998.index;
  var bind = _g998.bind;
  var bind42 = _g998["bind*"];
  var quasiexpand = _g998.quasiexpand;
  var macroexpand = _g998.macroexpand;
  var indentation = _g998.indentation;
  var reserved63 = _g998["reserved?"];
  var valid_id63 = _g998["valid-id?"];
  var id = _g998.id;
  var key = _g998.key;
  var imported = _g998.imported;
  var link = _g998.link;
  var mapo = _g998.mapo;
  var quote_environment = _g998["quote-environment"];
  var quote_modules = _g998["quote-modules"];
  var initial_environment = _g998["initial-environment"];
  var _g999 = nexus["lumen/compiler"];
  var compile_function = _g999["compile-function"];
  var compile = _g999.compile;
  var open_module = _g999["open-module"];
  var load_module = _g999["load-module"];
  var in_module = _g999["in-module"];
  var import_modules = _g999["import-modules"];
  var compile_module = _g999["compile-module"];
  var declare = _g999.declare;
  var eval = _g999.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g1948 = nexus["lumen/runtime"];
  var nil63 = _g1948["nil?"];
  var is63 = _g1948["is?"];
  var length = _g1948.length;
  var none63 = _g1948["none?"];
  var some63 = _g1948["some?"];
  var one63 = _g1948["one?"];
  var hd = _g1948.hd;
  var string63 = _g1948["string?"];
  var number63 = _g1948["number?"];
  var boolean63 = _g1948["boolean?"];
  var function63 = _g1948["function?"];
  var composite63 = _g1948["composite?"];
  var atom63 = _g1948["atom?"];
  var table63 = _g1948["table?"];
  var list63 = _g1948["list?"];
  var substring = _g1948.substring;
  var sub = _g1948.sub;
  var keys = _g1948.keys;
  var inner = _g1948.inner;
  var tl = _g1948.tl;
  var char = _g1948.char;
  var code = _g1948.code;
  var string_literal63 = _g1948["string-literal?"];
  var id_literal63 = _g1948["id-literal?"];
  var add = _g1948.add;
  var drop = _g1948.drop;
  var last = _g1948.last;
  var reverse = _g1948.reverse;
  var join = _g1948.join;
  var reduce = _g1948.reduce;
  var keep = _g1948.keep;
  var in63 = _g1948["in?"];
  var find = _g1948.find;
  var pair = _g1948.pair;
  var sort = _g1948.sort;
  var iterate = _g1948.iterate;
  var replicate = _g1948.replicate;
  var series = _g1948.series;
  var map = _g1948.map;
  var keys63 = _g1948["keys?"];
  var empty63 = _g1948["empty?"];
  var stash = _g1948.stash;
  var unstash = _g1948.unstash;
  var search = _g1948.search;
  var split = _g1948.split;
  var cat = _g1948.cat;
  var _43 = _g1948["+"];
  var _ = _g1948["-"];
  var _42 = _g1948["*"];
  var _47 = _g1948["/"];
  var _37 = _g1948["%"];
  var _62 = _g1948[">"];
  var _60 = _g1948["<"];
  var _61 = _g1948["="];
  var _6261 = _g1948[">="];
  var _6061 = _g1948["<="];
  var read_file = _g1948["read-file"];
  var write_file = _g1948["write-file"];
  var write = _g1948.write;
  var exit = _g1948.exit;
  var today = _g1948.today;
  var now = _g1948.now;
  var number = _g1948.number;
  var string = _g1948.string;
  var space = _g1948.space;
  var apply = _g1948.apply;
  var make_id = _g1948["make-id"];
  var _37message_handler = _g1948["%message-handler"];
  var toplevel63 = _g1948["toplevel?"];
  var module_key = _g1948["module-key"];
  var module = _g1948.module;
  var setenv = _g1948.setenv;
  var _g1951 = nexus["lumen/lib"];
  var getenv = _g1951.getenv;
  var macro_function = _g1951["macro-function"];
  var macro63 = _g1951["macro?"];
  var special63 = _g1951["special?"];
  var special_form63 = _g1951["special-form?"];
  var statement63 = _g1951["statement?"];
  var symbol_expansion = _g1951["symbol-expansion"];
  var symbol63 = _g1951["symbol?"];
  var variable63 = _g1951["variable?"];
  var bound63 = _g1951["bound?"];
  var quoted = _g1951.quoted;
  var stash42 = _g1951["stash*"];
  var index = _g1951.index;
  var bind = _g1951.bind;
  var bind42 = _g1951["bind*"];
  var quasiexpand = _g1951.quasiexpand;
  var macroexpand = _g1951.macroexpand;
  var indentation = _g1951.indentation;
  var reserved63 = _g1951["reserved?"];
  var valid_id63 = _g1951["valid-id?"];
  var id = _g1951.id;
  var key = _g1951.key;
  var imported = _g1951.imported;
  var link = _g1951.link;
  var mapo = _g1951.mapo;
  var quote_environment = _g1951["quote-environment"];
  var quote_modules = _g1951["quote-modules"];
  var initial_environment = _g1951["initial-environment"];
  var _g1952 = nexus["lumen/compiler"];
  var compile_function = _g1952["compile-function"];
  var compile = _g1952.compile;
  var open_module = _g1952["open-module"];
  var load_module = _g1952["load-module"];
  var in_module = _g1952["in-module"];
  var import_modules = _g1952["import-modules"];
  var compile_module = _g1952["compile-module"];
  var declare = _g1952.declare;
  var eval = _g1952.eval;
  global.modules = {"lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
    var _g1985 = body;
    var k = undefined;
    for (k in _g1985) {
      var v = _g1985[k];
      var _g1986 = parseInt(k);
      var _g2274;
      if (isNaN(_g1986)) {
        _g2274 = k;
      } else {
        _g2274 = _g1986;
      }
      var _g1987 = _g2274;
      if (number63(_g1987)) {
        l[_g1987] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _g1987]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g1997) {
      var a = _g1997[0];
      var b = _g1997[1];
      var c = sub(_g1997, 2);
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
    var _g2001 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2001, 0);
    return(["if", cond, join(["do"], body)]);
  }}, unless: {export: true, macro: function (cond) {
    var _g2004 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2004, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var _g2010 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2010, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g2012 = bind(lh, rh);
      var k = undefined;
      for (k in _g2012) {
        var _g2014 = _g2012[k];
        var id = _g2014[0];
        var val = _g2014[1];
        var _g2013 = parseInt(k);
        var _g2275;
        if (isNaN(_g2013)) {
          _g2275 = k;
        } else {
          _g2275 = _g2013;
        }
        var _g2015 = _g2275;
        if (number63(_g2015)) {
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
  }}, "define-module": {export: true, macro: function (spec) {
    var _g2021 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2021, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g2022 = import_modules(imp);
    var imports = _g2022[0];
    var bindings = _g2022[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g2023 = exp || [];
    var _g992 = undefined;
    for (_g992 in _g2023) {
      var x = _g2023[_g992];
      var _g2024 = parseInt(_g992);
      var _g2276;
      if (isNaN(_g2024)) {
        _g2276 = _g992;
      } else {
        _g2276 = _g2024;
      }
      var _g2025 = _g2276;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _g2031 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2031, 0);
    var form = join(["fn", args], body);
    var _g2033 = ["setenv", ["quote", name]];
    _g2033.macro = form;
    _g2033.form = ["quote", form];
    eval(_g2033);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var _g2036 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2036, 0);
    var form = join(["fn", args], body);
    var keys = sub(body, length(body));
    var _g2038 = ["setenv", ["quote", name]];
    _g2038.special = form;
    _g2038.form = ["quote", form];
    eval(join(_g2038, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var _g2042 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2042, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _g2043 = bind42(x, body);
      var args = _g2043[0];
      var _g2044 = _g2043[1];
      return(join(["%global-function", name, args], _g2044));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var _g2050 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2050, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _g2053 = bind42(x, body);
        var args = _g2053[0];
        var _g2054 = _g2053[1];
        return(link(name, join(["%local-function", name, args], _g2054)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g2060) {
    var names = _g2060[0];
    var _g2059 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2059, 0);
    var x = make_id();
    var _g2064 = ["setenv", x];
    _g2064.variable = true;
    var _g2061 = ["with-frame", ["all", ["_g993", x], names, _g2064]];
    _g2061.scope = true;
    return(join(_g2061, body));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _g2065 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2065, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g2066 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g2066);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _g2070 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2070, 0);
    add(environment, {});
    map(function (_g2073) {
      var name = _g2073[0];
      var exp = _g2073[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g2071 = join(["do"], macroexpand(body));
    drop(environment);
    return(_g2071);
  }}, fn: {export: true, macro: function (args) {
    var _g2076 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2076, 0);
    var _g2077 = bind42(args, body);
    var _g2078 = _g2077[0];
    var _g2079 = _g2077[1];
    return(join(["%function", _g2078], _g2079));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g2092, t) {
    var k = _g2092[0];
    var v = _g2092[1];
    var _g2091 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2091, 0);
    var x = make_id();
    var n = make_id();
    var _g2277;
    if (target === "lua") {
      _g2277 = body;
    } else {
      _g2277 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g2277)]]);
  }}, each: {export: true, macro: function (b, t) {
    var _g2105 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_g2105, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g2278;
    if (nil63(v)) {
      var _g2279;
      if (b.i) {
        _g2279 = "i";
      } else {
        _g2279 = make_id();
      }
      var i = _g2279;
      _g2278 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], body), ["inc", i]]];
    } else {
      var _g2121 = ["target"];
      _g2121.js = ["isNaN", ["parseInt", k]];
      _g2121.lua = ["not", ["number?", k]];
      _g2278 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g2121, join(["let", [v, ["get", t1, k]]], body)]]];
    }
    return(["let", [t1, t], _g2278]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g2129 = xs;
    var _g994 = undefined;
    for (_g994 in _g2129) {
      var x = _g2129[_g994];
      var _g2130 = parseInt(_g994);
      var _g2280;
      if (isNaN(_g2130)) {
        _g2280 = _g994;
      } else {
        _g2280 = _g2130;
      }
      var _g2131 = _g2280;
      l[x] = true;
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
    var _g2137 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g2137, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, "cat!": {export: true, macro: function (a) {
    var _g2140 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_g2140, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var _g2150 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_g2150, 0);
    var scope = _g2150.scope;
    var x = make_id();
    var _g2153 = ["table"];
    _g2153._scope = scope;
    return(["do", ["add", "environment", _g2153], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {stmt: true, export: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    series(function (x) {
      str = str + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(str);
  }, foo: true}, "%if": {stmt: true, export: true, tr: true, special: function (cond, cons, alt) {
    var _g2170 = compile(cond);
    indent_level = indent_level + 1;
    var _g2172 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g2171 = _g2172;
    var _g2281;
    if (alt) {
      indent_level = indent_level + 1;
      var _g2174 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g2281 = _g2174;
    }
    var _g2173 = _g2281;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g2170 + ") {\n" + _g2171 + ind + "}";
    } else {
      str = str + ind + "if " + _g2170 + " then\n" + _g2171;
    }
    if (_g2173 && target === "js") {
      str = str + " else {\n" + _g2173 + ind + "}";
    } else {
      if (_g2173) {
        str = str + ind + "else\n" + _g2173;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true}, "while": {stmt: true, export: true, tr: true, special: function (cond, form) {
    var _g2176 = compile(cond);
    indent_level = indent_level + 1;
    var _g2177 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2177;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g2176 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g2176 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {stmt: true, export: true, tr: true, special: function (t, k, form) {
    var _g2179 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2180 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2180;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g2179 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g2179 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {stmt: true, export: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g2182 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g2182;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g2186 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g2186;
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
    var _g2282;
    if (nil63(x)) {
      _g2282 = "return";
    } else {
      _g2282 = "return(" + compile(x) + ")";
    }
    var _g2194 = _g2282;
    return(indentation() + _g2194);
  }, stmt: true}, error: {export: true, foo: true, special: function (x) {
    var _g2283;
    if (target === "js") {
      _g2283 = "throw new " + compile(["Error", x]);
    } else {
      _g2283 = "error(" + compile(x) + ")";
    }
    var e = _g2283;
    return(indentation() + e);
  }, stmt: true}, "%local": {export: true, foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g2284;
    if (is63(value)) {
      _g2284 = " = " + value1;
    } else {
      _g2284 = "";
    }
    var rh = _g2284;
    var _g2285;
    if (target === "js") {
      _g2285 = "var ";
    } else {
      _g2285 = "local ";
    }
    var keyword = _g2285;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true}, set: {export: true, foo: true, special: function (lh, rh) {
    var _g2199 = compile(lh);
    var _g2286;
    if (nil63(rh)) {
      _g2286 = "nil";
    } else {
      _g2286 = rh;
    }
    var _g2200 = compile(_g2286);
    return(indentation() + _g2199 + " = " + _g2200);
  }, stmt: true}, get: {export: true, foo: true, special: function (t, k) {
    var _g2202 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g2202, 0) === "{") {
      _g2202 = "(" + _g2202 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g2202 + "." + inner(k));
    } else {
      return(_g2202 + "[" + k1 + "]");
    }
  }}, "not": {}, "%array": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g2287;
    if (target === "lua") {
      _g2287 = "{";
    } else {
      _g2287 = "[";
    }
    var open = _g2287;
    var _g2288;
    if (target === "lua") {
      _g2288 = "}";
    } else {
      _g2288 = "]";
    }
    var close = _g2288;
    var str = "";
    var comma = "";
    var _g2203 = forms;
    var k = undefined;
    for (k in _g2203) {
      var v = _g2203[k];
      var _g2204 = parseInt(k);
      var _g2289;
      if (isNaN(_g2204)) {
        _g2289 = k;
      } else {
        _g2289 = _g2204;
      }
      var _g2205 = _g2289;
      if (number63(_g2205)) {
        str = str + comma + compile(v);
        comma = ", ";
      }
    }
    return(open + str + close);
  }}, "%object": {export: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g2290;
    if (target === "lua") {
      _g2290 = " = ";
    } else {
      _g2290 = ": ";
    }
    var sep = _g2290;
    var comma = "";
    var _g2206 = pair(forms);
    var k = undefined;
    for (k in _g2206) {
      var v = _g2206[k];
      var _g2207 = parseInt(k);
      var _g2291;
      if (isNaN(_g2207)) {
        _g2291 = k;
      } else {
        _g2291 = _g2207;
      }
      var _g2208 = _g2291;
      if (number63(_g2208)) {
        var _g2209 = v[0];
        var _g2210 = v[1];
        if (!string63(_g2209)) {
          throw new Error("Illegal key: " + string(_g2209));
        }
        str = str + comma + key(_g2209) + sep + compile(_g2210);
        comma = ", ";
      }
    }
    return(str + "}");
  }}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {global: true, export: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g2252) {
    var char = _g2252[0];
    var stream = _g2252[1];
    var _g2251 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2251, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _g2264 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_g2264, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _g2265 = import_modules(imp);
    var imports = _g2265[0];
    var bindings = _g2265[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g2266 = exp || [];
    var _g992 = undefined;
    for (_g992 in _g2266) {
      var x = _g2266[_g992];
      var _g2267 = parseInt(_g992);
      var _g2292;
      if (isNaN(_g2267)) {
        _g2292 = _g992;
      } else {
        _g2292 = _g2267;
      }
      var _g2268 = _g2292;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g2293 = nexus["lumen/runtime"];
  var nil63 = _g2293["nil?"];
  var is63 = _g2293["is?"];
  var length = _g2293.length;
  var none63 = _g2293["none?"];
  var some63 = _g2293["some?"];
  var one63 = _g2293["one?"];
  var hd = _g2293.hd;
  var string63 = _g2293["string?"];
  var number63 = _g2293["number?"];
  var boolean63 = _g2293["boolean?"];
  var function63 = _g2293["function?"];
  var composite63 = _g2293["composite?"];
  var atom63 = _g2293["atom?"];
  var table63 = _g2293["table?"];
  var list63 = _g2293["list?"];
  var substring = _g2293.substring;
  var sub = _g2293.sub;
  var keys = _g2293.keys;
  var inner = _g2293.inner;
  var tl = _g2293.tl;
  var char = _g2293.char;
  var code = _g2293.code;
  var string_literal63 = _g2293["string-literal?"];
  var id_literal63 = _g2293["id-literal?"];
  var add = _g2293.add;
  var drop = _g2293.drop;
  var last = _g2293.last;
  var reverse = _g2293.reverse;
  var join = _g2293.join;
  var reduce = _g2293.reduce;
  var keep = _g2293.keep;
  var in63 = _g2293["in?"];
  var find = _g2293.find;
  var pair = _g2293.pair;
  var sort = _g2293.sort;
  var iterate = _g2293.iterate;
  var replicate = _g2293.replicate;
  var series = _g2293.series;
  var map = _g2293.map;
  var keys63 = _g2293["keys?"];
  var empty63 = _g2293["empty?"];
  var stash = _g2293.stash;
  var unstash = _g2293.unstash;
  var search = _g2293.search;
  var split = _g2293.split;
  var cat = _g2293.cat;
  var _43 = _g2293["+"];
  var _ = _g2293["-"];
  var _42 = _g2293["*"];
  var _47 = _g2293["/"];
  var _37 = _g2293["%"];
  var _62 = _g2293[">"];
  var _60 = _g2293["<"];
  var _61 = _g2293["="];
  var _6261 = _g2293[">="];
  var _6061 = _g2293["<="];
  var read_file = _g2293["read-file"];
  var write_file = _g2293["write-file"];
  var write = _g2293.write;
  var exit = _g2293.exit;
  var today = _g2293.today;
  var now = _g2293.now;
  var number = _g2293.number;
  var string = _g2293.string;
  var space = _g2293.space;
  var apply = _g2293.apply;
  var make_id = _g2293["make-id"];
  var _37message_handler = _g2293["%message-handler"];
  var toplevel63 = _g2293["toplevel?"];
  var module_key = _g2293["module-key"];
  var module = _g2293.module;
  var setenv = _g2293.setenv;
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
    var _g2297 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g2304) {
        return([false, _g2304.message]);
      }
    })();
    var _g1 = _g2297[0];
    var x = _g2297[1];
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
