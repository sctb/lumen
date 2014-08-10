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
  var substring = function (s, from, upto) {
    return(s.substring(from, upto));
  };
  nexus["lumen/runtime"].substring = substring;
  var sub = function (x, from, upto) {
    if (string63(x)) {
      return(substring(x, from || 0, upto));
    } else {
      var l = [];
      var j = 0;
      var _u176;
      if (nil63(from) || from < 0) {
        _u176 = 0;
      } else {
        _u176 = from;
      }
      var i = _u176;
      var n = length(x);
      var _u177;
      if (nil63(upto) || upto > n) {
        _u177 = n;
      } else {
        _u177 = upto;
      }
      var _u58 = _u177;
      while (i < _u58) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _u59 = x;
      var k = undefined;
      for (k in _u59) {
        var v = _u59[k];
        var _u60 = parseInt(k);
        var _u178;
        if (isNaN(_u60)) {
          _u178 = k;
        } else {
          _u178 = _u60;
        }
        var _u61 = _u178;
        if (!number63(_u61)) {
          l[_u61] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
  var keys = function (x) {
    var t = [];
    var _u63 = x;
    var k = undefined;
    for (k in _u63) {
      var v = _u63[k];
      var _u64 = parseInt(k);
      var _u179;
      if (isNaN(_u64)) {
        _u179 = k;
      } else {
        _u179 = _u64;
      }
      var _u65 = _u179;
      if (!number63(_u65)) {
        t[_u65] = v;
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
  var char = function (s, n) {
    return(s.charAt(n));
  };
  nexus["lumen/runtime"].char = char;
  var code = function (s, n) {
    return(s.charCodeAt(n));
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
    var l1 = keys(l);
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
      var _u78 = a;
      var k = undefined;
      for (k in _u78) {
        var v = _u78[k];
        var _u79 = parseInt(k);
        var _u180;
        if (isNaN(_u79)) {
          _u180 = k;
        } else {
          _u180 = _u79;
        }
        var _u80 = _u180;
        c[_u80] = v;
      }
      var _u81 = b;
      var k = undefined;
      for (k in _u81) {
        var v = _u81[k];
        var _u82 = parseInt(k);
        var _u181;
        if (isNaN(_u82)) {
          _u181 = k;
        } else {
          _u181 = _u82;
        }
        var _u83 = _u181;
        if (number63(_u83)) {
          _u83 = _u83 + o;
        }
        c[_u83] = v;
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
    var _u87 = x;
    var k = undefined;
    for (k in _u87) {
      var v = _u87[k];
      var _u88 = parseInt(k);
      var _u182;
      if (isNaN(_u88)) {
        _u182 = k;
      } else {
        _u182 = _u88;
      }
      var _u89 = _u182;
      if (f(v)) {
        t[shift(_u89, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _u91 = t;
    var _u32 = undefined;
    for (_u32 in _u91) {
      var y = _u91[_u32];
      var _u92 = parseInt(_u32);
      var _u183;
      if (isNaN(_u92)) {
        _u183 = _u32;
      } else {
        _u183 = _u92;
      }
      var _u93 = _u183;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _u95 = t;
    var _u33 = undefined;
    for (_u33 in _u95) {
      var x = _u95[_u33];
      var _u96 = parseInt(_u33);
      var _u184;
      if (isNaN(_u96)) {
        _u184 = _u33;
      } else {
        _u184 = _u96;
      }
      var _u97 = _u184;
      var _u98 = f(x);
      if (_u98) {
        return(_u98);
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
    var _u185;
    if (f) {
      _u185 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_u185));
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
    var _u109 = x;
    var k = undefined;
    for (k in _u109) {
      var v = _u109[k];
      var _u110 = parseInt(k);
      var _u186;
      if (isNaN(_u110)) {
        _u186 = k;
      } else {
        _u186 = _u110;
      }
      var _u111 = _u186;
      var y = f(v);
      if (is63(y)) {
        t[shift(_u111, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _u113 = t;
    var k = undefined;
    for (k in _u113) {
      var _u34 = _u113[k];
      var _u114 = parseInt(k);
      var _u187;
      if (isNaN(_u114)) {
        _u187 = k;
      } else {
        _u187 = _u114;
      }
      var _u115 = _u187;
      if (!number63(_u115)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _u117 = t;
    var _u35 = undefined;
    for (_u35 in _u117) {
      var _u36 = _u117[_u35];
      var _u118 = parseInt(_u35);
      var _u188;
      if (isNaN(_u118)) {
        _u188 = _u35;
      } else {
        _u188 = _u118;
      }
      var _u119 = _u188;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _u121 = args;
      var k = undefined;
      for (k in _u121) {
        var v = _u121[k];
        var _u122 = parseInt(k);
        var _u189;
        if (isNaN(_u122)) {
          _u189 = k;
        } else {
          _u189 = _u122;
        }
        var _u123 = _u189;
        if (!number63(_u123)) {
          p[_u123] = v;
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
        var _u125 = l;
        var k = undefined;
        for (k in _u125) {
          var v = _u125[k];
          var _u126 = parseInt(k);
          var _u190;
          if (isNaN(_u126)) {
            _u190 = k;
          } else {
            _u190 = _u126;
          }
          var _u127 = _u190;
          if (!(_u127 === "_stash")) {
            args1[_u127] = v;
          }
        }
        return(args1);
      } else {
        return(args);
      }
    }
  };
  nexus["lumen/runtime"].unstash = unstash;
  var search = function (s, pattern, start) {
    var i = s.indexOf(pattern, start);
    if (i >= 0) {
      return(i);
    }
  };
  nexus["lumen/runtime"].search = search;
  var split = function (s, sep) {
    if (s === "" || sep === "") {
      return([]);
    } else {
      var l = [];
      while (true) {
        var i = search(s, sep);
        if (nil63(i)) {
          break;
        } else {
          add(l, sub(s, 0, i));
          s = sub(s, i + 1);
        }
      }
      add(l, s);
      return(l);
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
    return(Math.floor(new Date().getTime() / 1000));
  };
  nexus["lumen/runtime"].now = now;
  var number = function (s) {
    var n = parseFloat(s);
    if (!isNaN(n)) {
      return(n);
    }
  };
  nexus["lumen/runtime"].number = number;
  var string = function (x, depth) {
    if (depth && depth > 5) {
      return("#<circular>");
    } else {
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
              var s = "(";
              var sp = "";
              var xs = [];
              var ks = [];
              var d = (depth || 0) + 1;
              var _u152 = x;
              var k = undefined;
              for (k in _u152) {
                var v = _u152[k];
                var _u153 = parseInt(k);
                var _u191;
                if (isNaN(_u153)) {
                  _u191 = k;
                } else {
                  _u191 = _u153;
                }
                var _u154 = _u191;
                if (number63(_u154)) {
                  xs[_u154] = string(v, d);
                } else {
                  add(ks, _u154 + ":");
                  add(ks, string(v, d));
                }
              }
              var _u155 = join(xs, ks);
              var _u37 = undefined;
              for (_u37 in _u155) {
                var v = _u155[_u37];
                var _u156 = parseInt(_u37);
                var _u192;
                if (isNaN(_u156)) {
                  _u192 = _u37;
                } else {
                  _u192 = _u156;
                }
                var _u157 = _u192;
                s = s + sp + v;
                sp = " ";
              }
              return(s + ")");
            }
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
    var _u164 = stash(args);
    return(f.apply(f, _u164));
  };
  nexus["lumen/runtime"].apply = apply;
  var id_count = 0;
  nexus["lumen/runtime"]["id-count"] = id_count;
  var unique = function () {
    id_count = id_count + 1;
    return("_u" + id_count);
  };
  nexus["lumen/runtime"].unique = unique;
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
    var _u171 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_u171, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _u172 = keys;
      var _u174 = undefined;
      for (_u174 in _u172) {
        var v = _u172[_u174];
        var _u173 = parseInt(_u174);
        var _u193;
        if (isNaN(_u173)) {
          _u193 = _u174;
        } else {
          _u193 = _u173;
        }
        var _u175 = _u193;
        x[_u175] = v;
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
  var _u197 = nexus["lumen/runtime"];
  var module = _u197.module;
  var string_literal63 = _u197["string-literal?"];
  var reduce = _u197.reduce;
  var substring = _u197.substring;
  var reverse = _u197.reverse;
  var code = _u197.code;
  var join = _u197.join;
  var number63 = _u197["number?"];
  var butlast = _u197.butlast;
  var composite63 = _u197["composite?"];
  var split = _u197.split;
  var module_key = _u197["module-key"];
  var one63 = _u197["one?"];
  var sub = _u197.sub;
  var series = _u197.series;
  var list63 = _u197["list?"];
  var keys63 = _u197["keys?"];
  var string63 = _u197["string?"];
  var char = _u197.char;
  var read_file = _u197["read-file"];
  var id_literal63 = _u197["id-literal?"];
  var _47 = _u197["/"];
  var apply = _u197.apply;
  var sort = _u197.sort;
  var drop = _u197.drop;
  var exit = _u197.exit;
  var replicate = _u197.replicate;
  var in63 = _u197["in?"];
  var nil63 = _u197["nil?"];
  var cat = _u197.cat;
  var _43 = _u197["+"];
  var _42 = _u197["*"];
  var _62 = _u197[">"];
  var number = _u197.number;
  var write_file = _u197["write-file"];
  var find = _u197.find;
  var stash = _u197.stash;
  var hd = _u197.hd;
  var atom63 = _u197["atom?"];
  var _60 = _u197["<"];
  var keep = _u197.keep;
  var setenv = _u197.setenv;
  var search = _u197.search;
  var unstash = _u197.unstash;
  var today = _u197.today;
  var toplevel63 = _u197["toplevel?"];
  var _37message_handler = _u197["%message-handler"];
  var table63 = _u197["table?"];
  var unique = _u197.unique;
  var space = _u197.space;
  var string = _u197.string;
  var _6261 = _u197[">="];
  var none63 = _u197["none?"];
  var length = _u197.length;
  var now = _u197.now;
  var is63 = _u197["is?"];
  var _ = _u197["-"];
  var write = _u197.write;
  var keys = _u197.keys;
  var iterate = _u197.iterate;
  var last = _u197.last;
  var map = _u197.map;
  var _37 = _u197["%"];
  var _6061 = _u197["<="];
  var some63 = _u197["some?"];
  var inner = _u197.inner;
  var function63 = _u197["function?"];
  var _61 = _u197["="];
  var pair = _u197.pair;
  var add = _u197.add;
  var tl = _u197.tl;
  var empty63 = _u197["empty?"];
  var boolean63 = _u197["boolean?"];
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
  var escape = function (s) {
    var s1 = "\"";
    var i = 0;
    while (i < length(s)) {
      var c = char(s, i);
      var _u372;
      if (c === "\n") {
        _u372 = "\\n";
      } else {
        var _u373;
        if (c === "\"") {
          _u373 = "\\\"";
        } else {
          var _u374;
          if (c === "\\") {
            _u374 = "\\\\";
          } else {
            _u374 = c;
          }
          _u373 = _u374;
        }
        _u372 = _u373;
      }
      var c1 = _u372;
      s1 = s1 + c1;
      i = i + 1;
    }
    return(s1 + "\"");
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
      var _u219 = args;
      var k = undefined;
      for (k in _u219) {
        var v = _u219[k];
        var _u220 = parseInt(k);
        var _u375;
        if (isNaN(_u220)) {
          _u375 = k;
        } else {
          _u375 = _u220;
        }
        var _u221 = _u375;
        if (!number63(_u221)) {
          add(l, literal(_u221));
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
      var id = unique();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var _u230 = lh;
        var k = undefined;
        for (k in _u230) {
          var v = _u230[k];
          var _u231 = parseInt(k);
          var _u376;
          if (isNaN(_u231)) {
            _u376 = k;
          } else {
            _u376 = _u231;
          }
          var _u232 = _u376;
          var _u377;
          if (_u232 === "&") {
            _u377 = ["sub", rh, length(lh)];
          } else {
            _u377 = ["get", rh, ["quote", bias(_u232)]];
          }
          var x = _u377;
          var _u378;
          if (v === true) {
            _u378 = _u232;
          } else {
            _u378 = v;
          }
          var _u236 = _u378;
          bs = join(bs, bind(_u236, x));
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
      var r = unique();
      var _u253 = args;
      var k = undefined;
      for (k in _u253) {
        var v = _u253[k];
        var _u254 = parseInt(k);
        var _u379;
        if (isNaN(_u254)) {
          _u379 = k;
        } else {
          _u379 = _u254;
        }
        var _u255 = _u379;
        if (number63(_u255)) {
          if (atom63(v)) {
            add(args1, v);
          } else {
            var x = unique();
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
          var _u194 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _u195 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _u270 = args;
            var _u950 = undefined;
            for (_u950 in _u270) {
              var _u268 = _u270[_u950];
              var _u271 = parseInt(_u950);
              var _u381;
              if (isNaN(_u271)) {
                _u381 = _u950;
              } else {
                _u381 = _u271;
              }
              var _u272 = _u381;
              setenv(_u268, {_stash: true, variable: true});
            }
            var _u269 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_u269);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _u196 = form[0];
              var _u274 = form[1];
              var _u275 = form[2];
              var _u276 = sub(form, 3);
              add(environment, {_scope: true});
              var _u279 = _u275;
              var _u950 = undefined;
              for (_u950 in _u279) {
                var _u277 = _u279[_u950];
                var _u280 = parseInt(_u950);
                var _u380;
                if (isNaN(_u280)) {
                  _u380 = _u950;
                } else {
                  _u380 = _u280;
                }
                var _u281 = _u380;
                setenv(_u277, {_stash: true, variable: true});
              }
              var _u278 = join([x, _u274, _u275], macroexpand(_u276));
              drop(environment);
              return(_u278);
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
    var _u286 = form;
    var k = undefined;
    for (k in _u286) {
      var v = _u286[k];
      var _u287 = parseInt(k);
      var _u382;
      if (isNaN(_u287)) {
        _u382 = k;
      } else {
        _u382 = _u287;
      }
      var _u288 = _u382;
      if (!number63(_u288)) {
        var _u383;
        if (quasisplice63(v, depth)) {
          _u383 = quasiexpand(v[1]);
        } else {
          _u383 = quasiexpand(v, depth);
        }
        var _u289 = _u383;
        last(xs)[_u288] = _u289;
      }
    }
    series(function (x) {
      if (quasisplice63(x, depth)) {
        var _u291 = quasiexpand(x[1]);
        add(xs, _u291);
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
  var reserved = {"debugger": true, "local": true, "function": true, "<=": true, "until": true, "elseif": true, "throw": true, "<": true, "continue": true, ">": true, "*": true, "true": true, "and": true, "do": true, "break": true, "return": true, "end": true, "repeat": true, "this": true, "or": true, "else": true, "void": true, "try": true, "default": true, "==": true, "new": true, "if": true, "not": true, "=": true, "then": true, "case": true, "switch": true, "var": true, "typeof": true, "false": true, "for": true, "instanceof": true, "%": true, "catch": true, "in": true, ">=": true, "+": true, "delete": true, "-": true, "nil": true, "finally": true, "/": true, "while": true, "with": true};
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
      var _u384;
      if (c === "-") {
        _u384 = "_";
      } else {
        var _u385;
        if (valid_code63(n)) {
          _u385 = c;
        } else {
          var _u386;
          if (i === 0) {
            _u386 = "_" + n;
          } else {
            _u386 = n;
          }
          _u385 = _u386;
        }
        _u384 = _u385;
      }
      var c1 = _u384;
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
    var _u330 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u330.private;
    var m = unique();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _u331 = module(spec).export;
      var _u333 = undefined;
      for (_u333 in _u331) {
        var v = _u331[_u333];
        var _u332 = parseInt(_u333);
        var _u387;
        if (isNaN(_u332)) {
          _u387 = _u333;
        } else {
          _u387 = _u332;
        }
        var _u334 = _u387;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _u334, ["get", m, ["quote", _u334]]]);
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
    var _u349 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_u349, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _u350 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_u350, 0);
    var t1 = [];
    var _u351 = t;
    var k = undefined;
    for (k in _u351) {
      var v = _u351[k];
      var _u352 = parseInt(k);
      var _u388;
      if (isNaN(_u352)) {
        _u388 = k;
      } else {
        _u388 = _u352;
      }
      var _u353 = _u388;
      if (!keys[_u353]) {
        t1[_u353] = v;
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
    var _u357 = t;
    var k = undefined;
    for (k in _u357) {
      var v = _u357[k];
      var _u358 = parseInt(k);
      var _u389;
      if (isNaN(_u358)) {
        _u389 = k;
      } else {
        _u389 = _u358;
      }
      var _u359 = _u389;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_u359));
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
    var _u367 = ["table"];
    _u367.alias = quoted(m.alias);
    _u367.export = quote_frame(m.export);
    _u367.import = quoted(m.import);
    return(_u367);
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
  var _u390 = nexus["lumen/runtime"];
  var module = _u390.module;
  var string_literal63 = _u390["string-literal?"];
  var reduce = _u390.reduce;
  var substring = _u390.substring;
  var reverse = _u390.reverse;
  var code = _u390.code;
  var join = _u390.join;
  var number63 = _u390["number?"];
  var butlast = _u390.butlast;
  var composite63 = _u390["composite?"];
  var split = _u390.split;
  var module_key = _u390["module-key"];
  var one63 = _u390["one?"];
  var sub = _u390.sub;
  var series = _u390.series;
  var list63 = _u390["list?"];
  var keys63 = _u390["keys?"];
  var string63 = _u390["string?"];
  var char = _u390.char;
  var read_file = _u390["read-file"];
  var id_literal63 = _u390["id-literal?"];
  var _47 = _u390["/"];
  var apply = _u390.apply;
  var sort = _u390.sort;
  var drop = _u390.drop;
  var exit = _u390.exit;
  var replicate = _u390.replicate;
  var in63 = _u390["in?"];
  var nil63 = _u390["nil?"];
  var cat = _u390.cat;
  var _43 = _u390["+"];
  var _42 = _u390["*"];
  var _62 = _u390[">"];
  var number = _u390.number;
  var write_file = _u390["write-file"];
  var find = _u390.find;
  var stash = _u390.stash;
  var hd = _u390.hd;
  var atom63 = _u390["atom?"];
  var _60 = _u390["<"];
  var keep = _u390.keep;
  var setenv = _u390.setenv;
  var search = _u390.search;
  var unstash = _u390.unstash;
  var today = _u390.today;
  var toplevel63 = _u390["toplevel?"];
  var _37message_handler = _u390["%message-handler"];
  var table63 = _u390["table?"];
  var unique = _u390.unique;
  var space = _u390.space;
  var string = _u390.string;
  var _6261 = _u390[">="];
  var none63 = _u390["none?"];
  var length = _u390.length;
  var now = _u390.now;
  var is63 = _u390["is?"];
  var _ = _u390["-"];
  var write = _u390.write;
  var keys = _u390.keys;
  var iterate = _u390.iterate;
  var last = _u390.last;
  var map = _u390.map;
  var _37 = _u390["%"];
  var _6061 = _u390["<="];
  var some63 = _u390["some?"];
  var inner = _u390.inner;
  var function63 = _u390["function?"];
  var _61 = _u390["="];
  var pair = _u390.pair;
  var add = _u390.add;
  var tl = _u390.tl;
  var empty63 = _u390["empty?"];
  var boolean63 = _u390["boolean?"];
  var delimiters = {"\n": true, ")": true, "(": true, ";": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {"\n": true, "\t": true, " ": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({string: str, pos: 0, len: length(str)});
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
            return(unique());
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
  var _u440 = nexus["lumen/runtime"];
  var module = _u440.module;
  var string_literal63 = _u440["string-literal?"];
  var reduce = _u440.reduce;
  var substring = _u440.substring;
  var reverse = _u440.reverse;
  var code = _u440.code;
  var join = _u440.join;
  var number63 = _u440["number?"];
  var butlast = _u440.butlast;
  var composite63 = _u440["composite?"];
  var split = _u440.split;
  var module_key = _u440["module-key"];
  var one63 = _u440["one?"];
  var sub = _u440.sub;
  var series = _u440.series;
  var list63 = _u440["list?"];
  var keys63 = _u440["keys?"];
  var string63 = _u440["string?"];
  var char = _u440.char;
  var read_file = _u440["read-file"];
  var id_literal63 = _u440["id-literal?"];
  var _47 = _u440["/"];
  var apply = _u440.apply;
  var sort = _u440.sort;
  var drop = _u440.drop;
  var exit = _u440.exit;
  var replicate = _u440.replicate;
  var in63 = _u440["in?"];
  var nil63 = _u440["nil?"];
  var cat = _u440.cat;
  var _43 = _u440["+"];
  var _42 = _u440["*"];
  var _62 = _u440[">"];
  var number = _u440.number;
  var write_file = _u440["write-file"];
  var find = _u440.find;
  var stash = _u440.stash;
  var hd = _u440.hd;
  var atom63 = _u440["atom?"];
  var _60 = _u440["<"];
  var keep = _u440.keep;
  var setenv = _u440.setenv;
  var search = _u440.search;
  var unstash = _u440.unstash;
  var today = _u440.today;
  var toplevel63 = _u440["toplevel?"];
  var _37message_handler = _u440["%message-handler"];
  var table63 = _u440["table?"];
  var unique = _u440.unique;
  var space = _u440.space;
  var string = _u440.string;
  var _6261 = _u440[">="];
  var none63 = _u440["none?"];
  var length = _u440.length;
  var now = _u440.now;
  var is63 = _u440["is?"];
  var _ = _u440["-"];
  var write = _u440.write;
  var keys = _u440.keys;
  var iterate = _u440.iterate;
  var last = _u440.last;
  var map = _u440.map;
  var _37 = _u440["%"];
  var _6061 = _u440["<="];
  var some63 = _u440["some?"];
  var inner = _u440.inner;
  var function63 = _u440["function?"];
  var _61 = _u440["="];
  var pair = _u440.pair;
  var add = _u440.add;
  var tl = _u440.tl;
  var empty63 = _u440["empty?"];
  var boolean63 = _u440["boolean?"];
  var _u443 = nexus["lumen/lib"];
  var quote_modules = _u443["quote-modules"];
  var quote_environment = _u443["quote-environment"];
  var quoted = _u443.quoted;
  var stash42 = _u443["stash*"];
  var imported = _u443.imported;
  var symbol_expansion = _u443["symbol-expansion"];
  var getenv = _u443.getenv;
  var macroexpand = _u443.macroexpand;
  var special63 = _u443["special?"];
  var index = _u443.index;
  var statement63 = _u443["statement?"];
  var id = _u443.id;
  var symbol63 = _u443["symbol?"];
  var bind = _u443.bind;
  var valid_id63 = _u443["valid-id?"];
  var macro63 = _u443["macro?"];
  var indentation = _u443.indentation;
  var key = _u443.key;
  var link = _u443.link;
  var bind42 = _u443["bind*"];
  var initial_environment = _u443["initial-environment"];
  var macro_function = _u443["macro-function"];
  var mapo = _u443.mapo;
  var bound63 = _u443["bound?"];
  var variable63 = _u443["variable?"];
  var special_form63 = _u443["special-form?"];
  var reserved63 = _u443["reserved?"];
  var quasiexpand = _u443.quasiexpand;
  var _u444 = nexus["lumen/reader"];
  var make_stream = _u444["make-stream"];
  var read = _u444.read;
  var read_from_string = _u444["read-from-string"];
  var read_table = _u444["read-table"];
  var read_all = _u444["read-all"];
  var _u447 = [];
  var _u448 = [];
  _u448.js = "!";
  _u448.lua = "not ";
  _u447["not"] = _u448;
  var _u450 = [];
  _u450["%"] = true;
  _u450["/"] = true;
  _u450["*"] = true;
  var _u452 = [];
  _u452["-"] = true;
  _u452["+"] = true;
  var _u454 = [];
  var _u455 = [];
  _u455.js = "+";
  _u455.lua = "..";
  _u454.cat = _u455;
  var _u457 = [];
  _u457["<="] = true;
  _u457["<"] = true;
  _u457[">="] = true;
  _u457[">"] = true;
  var _u459 = [];
  var _u460 = [];
  _u460.js = "===";
  _u460.lua = "==";
  _u459["="] = _u460;
  var _u461 = [];
  _u461.js = "!=";
  _u461.lua = "~=";
  _u459["~="] = _u461;
  var _u463 = [];
  var _u464 = [];
  _u464.js = "&&";
  _u464.lua = "and";
  _u463["and"] = _u464;
  var _u466 = [];
  var _u467 = [];
  _u467.js = "||";
  _u467.lua = "or";
  _u466["or"] = _u467;
  var infix = [_u447, _u450, _u452, _u454, _u457, _u459, _u463, _u466];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _u471 = infix;
      var k = undefined;
      for (k in _u471) {
        var v = _u471[k];
        var _u472 = parseInt(k);
        var _u580;
        if (isNaN(_u472)) {
          _u580 = k;
        } else {
          _u580 = _u472;
        }
        var _u473 = _u580;
        if (v[hd(form)]) {
          return(index(_u473));
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
    var s = "(";
    var c = "";
    series(function (x) {
      s = s + c + compile(x);
      c = ", ";
    }, args);
    return(s + ")");
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
    var _u482 = getenv(x);
    var self_tr63 = _u482.tr;
    var special = _u482.special;
    var stmt = _u482.stmt;
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
    var _u485 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _u485.right;
    var _u581;
    if (right) {
      _u581 = _6261;
    } else {
      _u581 = _62;
    }
    if (_u581(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _u489 = sub(form, 1);
    var a = _u489[0];
    var b = _u489[1];
    var _u490 = op_delims(form, a);
    var ao = _u490[0];
    var ac = _u490[1];
    var _u491 = op_delims(form, b, {_stash: true, right: true});
    var bo = _u491[0];
    var bc = _u491[1];
    var _u492 = compile(a);
    var _u493 = compile(b);
    var _u494 = getop(op);
    if (unary63(form)) {
      return(_u494 + ao + _u492 + ac);
    } else {
      return(ao + _u492 + ac + " " + _u494 + " " + bo + _u493 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _u495 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _u495.name;
    var prefix = _u495.prefix;
    var _u582;
    if (name) {
      _u582 = compile(name);
    } else {
      _u582 = "";
    }
    var id = _u582;
    var _u496 = prefix || "";
    var _u497 = compile_args(args);
    indent_level = indent_level + 1;
    var _u499 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u498 = _u499;
    var ind = indentation();
    var _u583;
    if (target === "js") {
      _u583 = "";
    } else {
      _u583 = "end";
    }
    var tr = _u583;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _u497 + " {\n" + _u498 + ind + "}" + tr);
    } else {
      return(_u496 + "function " + id + _u497 + "\n" + _u498 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _u501 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _u501.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _u584;
        if (stmt) {
          _u584 = indentation();
        } else {
          _u584 = "";
        }
        var ind = _u584;
        var _u585;
        if (atom63(form)) {
          _u585 = compile_atom(form);
        } else {
          var _u586;
          if (infix63(hd(form))) {
            _u586 = compile_infix(form);
          } else {
            _u586 = compile_call(form);
          }
          _u585 = _u586;
        }
        var _u502 = _u585;
        return(ind + _u502 + tr);
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
    var _u513 = args[1];
    var _u514 = args[2];
    if (stmt63 || tail63) {
      var _u588;
      if (_u514) {
        _u588 = [lower_body([_u514], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u513], tail63)], _u588)));
    } else {
      var e = unique();
      add(hoist, ["%local", e]);
      var _u587;
      if (_u514) {
        _u587 = [lower(["set", e, _u514])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u513])], _u587));
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
      var id = unique();
      var _u589;
      if (x === "and") {
        _u589 = ["%if", id, b, id];
      } else {
        _u589 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _u589], hoist));
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
    var _u539 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _u539, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _u542 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_u542)) {
      return(_u542);
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
    environment = initial_environment();
    var body = read_all(make_stream(read_file(path)));
    var form = encapsulate(body);
    var code = compile(form) + ";\n";
    current_module = mod0;
    environment = env0;
    return(conclude(code));
  };
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  var open_module = function (spec) {
    var _u562 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u562.private;
    var m = module(spec);
    var frame = last(environment);
    var _u563 = m.export;
    var k = undefined;
    for (k in _u563) {
      var v = _u563[k];
      var _u564 = parseInt(k);
      var _u590;
      if (isNaN(_u564)) {
        _u590 = k;
      } else {
        _u590 = _u564;
      }
      var _u565 = _u590;
      if (v.export || private) {
        frame[_u565] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _u566 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u566.private;
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
        var _u570 = import_modules(m.alias);
        var aliased = _u570[0];
        var bs = _u570[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _u571 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _u571);
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
  var context = function () {
    var imports = [];
    var m = module(current_module);
    series(function (spec) {
      imports = join(imports, imported(spec));
    }, m.import);
    return(join(imports, imported(current_module, {_stash: true, private: true})));
  };
  nexus["lumen/compiler"].context = context;
  global._37result = undefined;
  var eval = function (form) {
    var previous = target;
    target = "js";
    var body = join(context(), [["set", "%result", form]]);
    var code = compile(encapsulate(body));
    target = previous;
    run(code);
    return(_37result);
  };
  nexus["lumen/compiler"].eval = eval;
})();
(function () {
  nexus["lumen/special"] = {};
  var _u591 = nexus["lumen/runtime"];
  var module = _u591.module;
  var string_literal63 = _u591["string-literal?"];
  var reduce = _u591.reduce;
  var substring = _u591.substring;
  var reverse = _u591.reverse;
  var code = _u591.code;
  var join = _u591.join;
  var number63 = _u591["number?"];
  var butlast = _u591.butlast;
  var composite63 = _u591["composite?"];
  var split = _u591.split;
  var module_key = _u591["module-key"];
  var one63 = _u591["one?"];
  var sub = _u591.sub;
  var series = _u591.series;
  var list63 = _u591["list?"];
  var keys63 = _u591["keys?"];
  var string63 = _u591["string?"];
  var char = _u591.char;
  var read_file = _u591["read-file"];
  var id_literal63 = _u591["id-literal?"];
  var _47 = _u591["/"];
  var apply = _u591.apply;
  var sort = _u591.sort;
  var drop = _u591.drop;
  var exit = _u591.exit;
  var replicate = _u591.replicate;
  var in63 = _u591["in?"];
  var nil63 = _u591["nil?"];
  var cat = _u591.cat;
  var _43 = _u591["+"];
  var _42 = _u591["*"];
  var _62 = _u591[">"];
  var number = _u591.number;
  var write_file = _u591["write-file"];
  var find = _u591.find;
  var stash = _u591.stash;
  var hd = _u591.hd;
  var atom63 = _u591["atom?"];
  var _60 = _u591["<"];
  var keep = _u591.keep;
  var setenv = _u591.setenv;
  var search = _u591.search;
  var unstash = _u591.unstash;
  var today = _u591.today;
  var toplevel63 = _u591["toplevel?"];
  var _37message_handler = _u591["%message-handler"];
  var table63 = _u591["table?"];
  var unique = _u591.unique;
  var space = _u591.space;
  var string = _u591.string;
  var _6261 = _u591[">="];
  var none63 = _u591["none?"];
  var length = _u591.length;
  var now = _u591.now;
  var is63 = _u591["is?"];
  var _ = _u591["-"];
  var write = _u591.write;
  var keys = _u591.keys;
  var iterate = _u591.iterate;
  var last = _u591.last;
  var map = _u591.map;
  var _37 = _u591["%"];
  var _6061 = _u591["<="];
  var some63 = _u591["some?"];
  var inner = _u591.inner;
  var function63 = _u591["function?"];
  var _61 = _u591["="];
  var pair = _u591.pair;
  var add = _u591.add;
  var tl = _u591.tl;
  var empty63 = _u591["empty?"];
  var boolean63 = _u591["boolean?"];
  var _u594 = nexus["lumen/lib"];
  var quote_modules = _u594["quote-modules"];
  var quote_environment = _u594["quote-environment"];
  var quoted = _u594.quoted;
  var stash42 = _u594["stash*"];
  var imported = _u594.imported;
  var symbol_expansion = _u594["symbol-expansion"];
  var getenv = _u594.getenv;
  var macroexpand = _u594.macroexpand;
  var special63 = _u594["special?"];
  var index = _u594.index;
  var statement63 = _u594["statement?"];
  var id = _u594.id;
  var symbol63 = _u594["symbol?"];
  var bind = _u594.bind;
  var valid_id63 = _u594["valid-id?"];
  var macro63 = _u594["macro?"];
  var indentation = _u594.indentation;
  var key = _u594.key;
  var link = _u594.link;
  var bind42 = _u594["bind*"];
  var initial_environment = _u594["initial-environment"];
  var macro_function = _u594["macro-function"];
  var mapo = _u594.mapo;
  var bound63 = _u594["bound?"];
  var variable63 = _u594["variable?"];
  var special_form63 = _u594["special-form?"];
  var reserved63 = _u594["reserved?"];
  var quasiexpand = _u594.quasiexpand;
  var _u595 = nexus["lumen/compiler"];
  var eval = _u595.eval;
  var load_module = _u595["load-module"];
  var compile_module = _u595["compile-module"];
  var open_module = _u595["open-module"];
  var in_module = _u595["in-module"];
  var compile_function = _u595["compile-function"];
  var declare = _u595.declare;
  var compile = _u595.compile;
  var import_modules = _u595["import-modules"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _u992 = nexus["lumen/runtime"];
  var module = _u992.module;
  var string_literal63 = _u992["string-literal?"];
  var reduce = _u992.reduce;
  var substring = _u992.substring;
  var reverse = _u992.reverse;
  var code = _u992.code;
  var join = _u992.join;
  var number63 = _u992["number?"];
  var butlast = _u992.butlast;
  var composite63 = _u992["composite?"];
  var split = _u992.split;
  var module_key = _u992["module-key"];
  var one63 = _u992["one?"];
  var sub = _u992.sub;
  var series = _u992.series;
  var list63 = _u992["list?"];
  var keys63 = _u992["keys?"];
  var string63 = _u992["string?"];
  var char = _u992.char;
  var read_file = _u992["read-file"];
  var id_literal63 = _u992["id-literal?"];
  var _47 = _u992["/"];
  var apply = _u992.apply;
  var sort = _u992.sort;
  var drop = _u992.drop;
  var exit = _u992.exit;
  var replicate = _u992.replicate;
  var in63 = _u992["in?"];
  var nil63 = _u992["nil?"];
  var cat = _u992.cat;
  var _43 = _u992["+"];
  var _42 = _u992["*"];
  var _62 = _u992[">"];
  var number = _u992.number;
  var write_file = _u992["write-file"];
  var find = _u992.find;
  var stash = _u992.stash;
  var hd = _u992.hd;
  var atom63 = _u992["atom?"];
  var _60 = _u992["<"];
  var keep = _u992.keep;
  var setenv = _u992.setenv;
  var search = _u992.search;
  var unstash = _u992.unstash;
  var today = _u992.today;
  var toplevel63 = _u992["toplevel?"];
  var _37message_handler = _u992["%message-handler"];
  var table63 = _u992["table?"];
  var unique = _u992.unique;
  var space = _u992.space;
  var string = _u992.string;
  var _6261 = _u992[">="];
  var none63 = _u992["none?"];
  var length = _u992.length;
  var now = _u992.now;
  var is63 = _u992["is?"];
  var _ = _u992["-"];
  var write = _u992.write;
  var keys = _u992.keys;
  var iterate = _u992.iterate;
  var last = _u992.last;
  var map = _u992.map;
  var _37 = _u992["%"];
  var _6061 = _u992["<="];
  var some63 = _u992["some?"];
  var inner = _u992.inner;
  var function63 = _u992["function?"];
  var _61 = _u992["="];
  var pair = _u992.pair;
  var add = _u992.add;
  var tl = _u992.tl;
  var empty63 = _u992["empty?"];
  var boolean63 = _u992["boolean?"];
  var _u995 = nexus["lumen/lib"];
  var quote_modules = _u995["quote-modules"];
  var quote_environment = _u995["quote-environment"];
  var quoted = _u995.quoted;
  var stash42 = _u995["stash*"];
  var imported = _u995.imported;
  var symbol_expansion = _u995["symbol-expansion"];
  var getenv = _u995.getenv;
  var macroexpand = _u995.macroexpand;
  var special63 = _u995["special?"];
  var index = _u995.index;
  var statement63 = _u995["statement?"];
  var id = _u995.id;
  var symbol63 = _u995["symbol?"];
  var bind = _u995.bind;
  var valid_id63 = _u995["valid-id?"];
  var macro63 = _u995["macro?"];
  var indentation = _u995.indentation;
  var key = _u995.key;
  var link = _u995.link;
  var bind42 = _u995["bind*"];
  var initial_environment = _u995["initial-environment"];
  var macro_function = _u995["macro-function"];
  var mapo = _u995.mapo;
  var bound63 = _u995["bound?"];
  var variable63 = _u995["variable?"];
  var special_form63 = _u995["special-form?"];
  var reserved63 = _u995["reserved?"];
  var quasiexpand = _u995.quasiexpand;
  var _u996 = nexus["lumen/compiler"];
  var eval = _u996.eval;
  var load_module = _u996["load-module"];
  var compile_module = _u996["compile-module"];
  var open_module = _u996["open-module"];
  var in_module = _u996["in-module"];
  var compile_function = _u996["compile-function"];
  var declare = _u996.declare;
  var compile = _u996.compile;
  var import_modules = _u996["import-modules"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _u1865 = nexus["lumen/runtime"];
  var module = _u1865.module;
  var string_literal63 = _u1865["string-literal?"];
  var reduce = _u1865.reduce;
  var substring = _u1865.substring;
  var reverse = _u1865.reverse;
  var code = _u1865.code;
  var join = _u1865.join;
  var number63 = _u1865["number?"];
  var butlast = _u1865.butlast;
  var composite63 = _u1865["composite?"];
  var split = _u1865.split;
  var module_key = _u1865["module-key"];
  var one63 = _u1865["one?"];
  var sub = _u1865.sub;
  var series = _u1865.series;
  var list63 = _u1865["list?"];
  var keys63 = _u1865["keys?"];
  var string63 = _u1865["string?"];
  var char = _u1865.char;
  var read_file = _u1865["read-file"];
  var id_literal63 = _u1865["id-literal?"];
  var _47 = _u1865["/"];
  var apply = _u1865.apply;
  var sort = _u1865.sort;
  var drop = _u1865.drop;
  var exit = _u1865.exit;
  var replicate = _u1865.replicate;
  var in63 = _u1865["in?"];
  var nil63 = _u1865["nil?"];
  var cat = _u1865.cat;
  var _43 = _u1865["+"];
  var _42 = _u1865["*"];
  var _62 = _u1865[">"];
  var number = _u1865.number;
  var write_file = _u1865["write-file"];
  var find = _u1865.find;
  var stash = _u1865.stash;
  var hd = _u1865.hd;
  var atom63 = _u1865["atom?"];
  var _60 = _u1865["<"];
  var keep = _u1865.keep;
  var setenv = _u1865.setenv;
  var search = _u1865.search;
  var unstash = _u1865.unstash;
  var today = _u1865.today;
  var toplevel63 = _u1865["toplevel?"];
  var _37message_handler = _u1865["%message-handler"];
  var table63 = _u1865["table?"];
  var unique = _u1865.unique;
  var space = _u1865.space;
  var string = _u1865.string;
  var _6261 = _u1865[">="];
  var none63 = _u1865["none?"];
  var length = _u1865.length;
  var now = _u1865.now;
  var is63 = _u1865["is?"];
  var _ = _u1865["-"];
  var write = _u1865.write;
  var keys = _u1865.keys;
  var iterate = _u1865.iterate;
  var last = _u1865.last;
  var map = _u1865.map;
  var _37 = _u1865["%"];
  var _6061 = _u1865["<="];
  var some63 = _u1865["some?"];
  var inner = _u1865.inner;
  var function63 = _u1865["function?"];
  var _61 = _u1865["="];
  var pair = _u1865.pair;
  var add = _u1865.add;
  var tl = _u1865.tl;
  var empty63 = _u1865["empty?"];
  var boolean63 = _u1865["boolean?"];
  var _u1868 = nexus["lumen/lib"];
  var quote_modules = _u1868["quote-modules"];
  var quote_environment = _u1868["quote-environment"];
  var quoted = _u1868.quoted;
  var stash42 = _u1868["stash*"];
  var imported = _u1868.imported;
  var symbol_expansion = _u1868["symbol-expansion"];
  var getenv = _u1868.getenv;
  var macroexpand = _u1868.macroexpand;
  var special63 = _u1868["special?"];
  var index = _u1868.index;
  var statement63 = _u1868["statement?"];
  var id = _u1868.id;
  var symbol63 = _u1868["symbol?"];
  var bind = _u1868.bind;
  var valid_id63 = _u1868["valid-id?"];
  var macro63 = _u1868["macro?"];
  var indentation = _u1868.indentation;
  var key = _u1868.key;
  var link = _u1868.link;
  var bind42 = _u1868["bind*"];
  var initial_environment = _u1868["initial-environment"];
  var macro_function = _u1868["macro-function"];
  var mapo = _u1868.mapo;
  var bound63 = _u1868["bound?"];
  var variable63 = _u1868["variable?"];
  var special_form63 = _u1868["special-form?"];
  var reserved63 = _u1868["reserved?"];
  var quasiexpand = _u1868.quasiexpand;
  var _u1869 = nexus["lumen/compiler"];
  var eval = _u1869.eval;
  var load_module = _u1869["load-module"];
  var compile_module = _u1869["compile-module"];
  var open_module = _u1869["open-module"];
  var in_module = _u1869["in-module"];
  var compile_function = _u1869["compile-function"];
  var declare = _u1869.declare;
  var compile = _u1869.compile;
  var import_modules = _u1869["import-modules"];
  global.modules = {"lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, lumen: {alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}, import: [["lumen", "special"]]}, "lumen/runtime": {export: {module: {variable: true, export: true}, "string-literal?": {variable: true, export: true}, reduce: {variable: true, export: true}, substring: {variable: true, export: true}, reverse: {variable: true, export: true}, code: {variable: true, export: true}, join: {variable: true, export: true}, "number?": {variable: true, export: true}, butlast: {variable: true, export: true}, "composite?": {variable: true, export: true}, split: {variable: true, export: true}, "module-key": {variable: true, export: true}, "one?": {variable: true, export: true}, print: {export: true, global: true}, sub: {variable: true, export: true}, series: {variable: true, export: true}, "list?": {variable: true, export: true}, "keys?": {variable: true, export: true}, "string?": {variable: true, export: true}, char: {variable: true, export: true}, "read-file": {variable: true, export: true}, "id-literal?": {variable: true, export: true}, "/": {variable: true, export: true}, apply: {variable: true, export: true}, sort: {variable: true, export: true}, drop: {variable: true, export: true}, exit: {variable: true, export: true}, replicate: {variable: true, export: true}, "in?": {variable: true, export: true}, "nil?": {variable: true, export: true}, cat: {variable: true, export: true}, "+": {variable: true, export: true}, "*": {variable: true, export: true}, "id-count": {variable: true}, ">": {variable: true, export: true}, number: {variable: true, export: true}, fs: {variable: true}, "write-file": {variable: true, export: true}, find: {variable: true, export: true}, shift: {variable: true}, stash: {variable: true, export: true}, type: {variable: true}, hd: {variable: true, export: true}, "atom?": {variable: true, export: true}, "<": {variable: true, export: true}, keep: {variable: true, export: true}, setenv: {variable: true, export: true}, search: {variable: true, export: true}, unstash: {variable: true, export: true}, today: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, "table?": {variable: true, export: true}, unique: {variable: true, export: true}, space: {variable: true, export: true}, string: {variable: true, export: true}, ">=": {variable: true, export: true}, "none?": {variable: true, export: true}, length: {variable: true, export: true}, now: {variable: true, export: true}, "is?": {variable: true, export: true}, "-": {variable: true, export: true}, write: {variable: true, export: true}, keys: {variable: true, export: true}, iterate: {variable: true, export: true}, last: {variable: true, export: true}, map: {variable: true, export: true}, "%": {variable: true, export: true}, "<=": {variable: true, export: true}, "some?": {variable: true, export: true}, inner: {variable: true, export: true}, "function?": {variable: true, export: true}, "=": {variable: true, export: true}, pair: {variable: true, export: true}, add: {variable: true, export: true}, tl: {variable: true, export: true}, require: {export: true, global: true}, "empty?": {variable: true, export: true}, "boolean?": {variable: true, export: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/core": {export: {"with-frame": {export: true, macro: function () {
    var _u1903 = unstash(Array.prototype.slice.call(arguments, 0));
    var scope = _u1903.scope;
    var body = sub(_u1903, 0);
    var x = unique();
    var _u1906 = ["table"];
    _u1906._scope = scope;
    return(["do", ["add", "environment", _u1906], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, target: {macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true, global: true}, "define-special": {export: true, macro: function (name, args) {
    var _u1913 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1913, 0);
    var form = join(["fn", args], body);
    var _u1915 = ["setenv", ["quote", name]];
    _u1915.special = form;
    _u1915.form = ["quote", form];
    eval(join(_u1915, keys(body)));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, all: {export: true, macro: function (_u1920, t) {
    var k = _u1920[0];
    var v = _u1920[1];
    var _u1919 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1919, 0);
    var x = unique();
    var n = unique();
    var _u2167;
    if (target === "lua") {
      _u2167 = body;
    } else {
      _u2167 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u2167)]]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, "join!": {export: true, macro: function (a) {
    var _u1936 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u1936, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, unless: {export: true, macro: function (cond) {
    var _u1939 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1939, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, "with-bindings": {export: true, macro: function (_u1947) {
    var names = _u1947[0];
    var _u1946 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1946, 0);
    var x = unique();
    var _u1951 = ["setenv", x];
    _u1951.variable = true;
    var _u1948 = ["with-frame", ["all", ["_u990", x], names, _u1951]];
    _u1948.scope = true;
    return(join(_u1948, body));
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_u1953) {
      var a = _u1953[0];
      var b = _u1953[1];
      var c = sub(_u1953, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _u1957 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1957, 0);
    add(environment, {});
    map(function (_u1960) {
      var name = _u1960[0];
      var exp = _u1960[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _u1958 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u1958);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _u1966 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1966, 0);
    var form = join(["fn", args], body);
    var _u1968 = ["setenv", ["quote", name]];
    _u1968.macro = form;
    _u1968.form = ["quote", form];
    eval(_u1968);
    return(undefined);
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, let: {export: true, macro: function (bindings) {
    var _u1972 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1972, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _u1974 = bind(lh, rh);
      var k = undefined;
      for (k in _u1974) {
        var _u1976 = _u1974[k];
        var id = _u1976[0];
        var val = _u1976[1];
        var _u1975 = parseInt(k);
        var _u2168;
        if (isNaN(_u1975)) {
          _u2168 = k;
        } else {
          _u2168 = _u1975;
        }
        var _u1977 = _u2168;
        if (number63(_u1977)) {
          if (bound63(id) || reserved63(id) || toplevel63()) {
            var id1 = unique();
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
    var _u1983 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1983, 0);
    var alias = body.alias;
    var exp = body.export;
    var imp = body.import;
    var _u1984 = import_modules(imp);
    var imports = _u1984[0];
    var bindings = _u1984[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {alias: alias, export: {}, import: imports};
    var _u1985 = exp || [];
    var _u989 = undefined;
    for (_u989 in _u1985) {
      var x = _u1985[_u989];
      var _u1986 = parseInt(_u989);
      var _u2169;
      if (isNaN(_u1986)) {
        _u2169 = _u989;
      } else {
        _u2169 = _u1986;
      }
      var _u1987 = _u2169;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "cat!": {export: true, macro: function (a) {
    var _u1993 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u1993, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _u2001 = xs;
    var _u991 = undefined;
    for (_u991 in _u2001) {
      var x = _u2001[_u991];
      var _u2002 = parseInt(_u991);
      var _u2170;
      if (isNaN(_u2002)) {
        _u2170 = _u991;
      } else {
        _u2170 = _u2002;
      }
      var _u2003 = _u2170;
      l[x] = true;
    }
    return(join(["table"], l));
  }}, list: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var forms = [];
    var id = unique();
    var _u2005 = body;
    var k = undefined;
    for (k in _u2005) {
      var v = _u2005[k];
      var _u2006 = parseInt(k);
      var _u2171;
      if (isNaN(_u2006)) {
        _u2171 = k;
      } else {
        _u2171 = _u2006;
      }
      var _u2007 = _u2171;
      if (number63(_u2007)) {
        l[_u2007] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _u2007]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = unique();
      var x = unique();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var _u2026 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2026, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(body)) {
      var _u2027 = bind42(x, body);
      var args = _u2027[0];
      var _u2028 = _u2027[1];
      return(join(["%global-function", name, args], _u2028));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _u2034 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2034, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _u2035 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2035);
  }}, when: {export: true, macro: function (cond) {
    var _u2039 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2039, 0);
    return(["if", cond, join(["do"], body)]);
  }}, define: {export: true, macro: function (name, x) {
    var _u2042 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2042, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _u2045 = bind42(x, body);
        var args = _u2045[0];
        var _u2046 = _u2045[1];
        return(link(name, join(["%local-function", name, args], _u2046)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, fn: {export: true, macro: function (args) {
    var _u2049 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2049, 0);
    var _u2050 = bind42(args, body);
    var _u2051 = _u2050[0];
    var _u2052 = _u2050[1];
    return(join(["%function", _u2051], _u2052));
  }}, at: {export: true, macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/boot": {export: {modules: {export: true, global: true}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/lib": {export: {"quote-modules": {variable: true, export: true}, "quote-binding": {variable: true}, "quote-environment": {variable: true, export: true}, quoted: {variable: true, export: true}, "stash*": {variable: true, export: true}, imported: {variable: true, export: true}, "quoting?": {variable: true}, "symbol-expansion": {variable: true, export: true}, getenv: {variable: true, export: true}, macroexpand: {variable: true, export: true}, "special?": {variable: true, export: true}, index: {variable: true, export: true}, "statement?": {variable: true, export: true}, "quasiquote-list": {variable: true}, id: {variable: true, export: true}, "symbol?": {variable: true, export: true}, extend: {variable: true}, bind: {variable: true, export: true}, "valid-id?": {variable: true, export: true}, "quote-module": {variable: true}, exclude: {variable: true}, "quote-frame": {variable: true}, "macro?": {variable: true, export: true}, "quasiquoting?": {variable: true}, "quasisplice?": {variable: true}, "numeric?": {variable: true}, reserved: {variable: true}, "indent-level": {export: true, global: true}, "can-unquote?": {variable: true}, "global?": {variable: true}, "valid-code?": {variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = unique();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, indentation: {variable: true, export: true}, key: {variable: true, export: true}, literal: {variable: true}, link: {variable: true, export: true}, "bind*": {variable: true, export: true}, bias: {variable: true}, "initial-environment": {variable: true, export: true}, "macro-function": {variable: true, export: true}, mapo: {variable: true, export: true}, "bound?": {variable: true, export: true}, "variable?": {variable: true, export: true}, escape: {variable: true}, "special-form?": {variable: true, export: true}, "reserved?": {variable: true, export: true}, quasiexpand: {variable: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/compiler": {export: {"compile-atom": {variable: true}, eval: {variable: true, export: true}, "load-module": {variable: true, export: true}, "compile-infix": {variable: true}, "compile-module": {variable: true, export: true}, "lower-do": {variable: true}, process: {variable: true}, "lower-try": {variable: true}, "open-module": {variable: true, export: true}, "%result": {export: true, global: true}, context: {variable: true}, "can-return?": {variable: true}, "compile-args": {variable: true}, "lower-statement": {variable: true}, "lower-for": {variable: true}, "compile-call": {variable: true}, run: {variable: true}, "lower-special": {variable: true}, "%compile-module": {variable: true}, terminator: {variable: true}, conclude: {variable: true}, "compiler-output": {variable: true}, "lower-if": {variable: true}, "in-module": {variable: true, export: true}, "op-delims": {variable: true}, "lower-body": {variable: true}, "compiling?": {variable: true}, encapsulate: {variable: true}, "module-path": {variable: true}, "current-module": {export: true, global: true}, "lower-infix": {variable: true}, "unary?": {variable: true}, lower: {variable: true}, "compile-function": {variable: true, export: true}, "parenthesize-call?": {variable: true}, "lower-infix?": {variable: true}, "lower-call": {variable: true}, "lower-short": {variable: true}, "lower-function": {variable: true}, infix: {variable: true}, declare: {variable: true, export: true}, precedence: {variable: true}, "infix?": {variable: true}, getop: {variable: true}, "lower-while": {variable: true}, compile: {variable: true, export: true}, "compile-special": {variable: true}, "lower-definition": {variable: true}, "import-modules": {variable: true, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, "lumen/special": {export: {"not": {}, "while": {tr: true, foo: true, special: function (cond, form) {
    var _u2092 = compile(cond);
    indent_level = indent_level + 1;
    var _u2093 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2093;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _u2092 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _u2092 + " do\n" + body + ind + "end\n");
    }
  }, export: true, stmt: true}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _u2172;
    if (target === "lua") {
      _u2172 = "{";
    } else {
      _u2172 = "[";
    }
    var open = _u2172;
    var _u2173;
    if (target === "lua") {
      _u2173 = "}";
    } else {
      _u2173 = "]";
    }
    var close = _u2173;
    var s = "";
    var c = "";
    var _u2094 = forms;
    var k = undefined;
    for (k in _u2094) {
      var v = _u2094[k];
      var _u2095 = parseInt(k);
      var _u2174;
      if (isNaN(_u2095)) {
        _u2174 = k;
      } else {
        _u2174 = _u2095;
      }
      var _u2096 = _u2174;
      if (number63(_u2096)) {
        s = s + c + compile(v);
        c = ", ";
      }
    }
    return(open + s + close);
  }, foo: true, export: true}, "%global-function": {tr: true, foo: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, export: true, stmt: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true, export: true}, "%for": {tr: true, foo: true, special: function (t, k, form) {
    var _u2102 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u2103 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2103;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _u2102 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _u2102 + ") {\n" + body + ind + "}\n");
    }
  }, export: true, stmt: true}, "%try": {tr: true, foo: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u2105 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2105;
    var e = unique();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _u2109 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _u2109;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, export: true, stmt: true}, "%local-function": {tr: true, foo: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, export: true, stmt: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "{";
    var c = "";
    var _u2175;
    if (target === "lua") {
      _u2175 = " = ";
    } else {
      _u2175 = ": ";
    }
    var sep = _u2175;
    var _u2111 = pair(forms);
    var k = undefined;
    for (k in _u2111) {
      var v = _u2111[k];
      var _u2112 = parseInt(k);
      var _u2176;
      if (isNaN(_u2112)) {
        _u2176 = k;
      } else {
        _u2176 = _u2112;
      }
      var _u2113 = _u2176;
      if (number63(_u2113)) {
        var _u2114 = v[0];
        var _u2115 = v[1];
        if (!string63(_u2114)) {
          throw new Error("Illegal key: " + string(_u2114));
        }
        s = s + c + key(_u2114) + sep + compile(_u2115);
        c = ", ";
      }
    }
    return(s + "}");
  }, foo: true, export: true}, "break": {special: function () {
    return(indentation() + "break");
  }, export: true, foo: true, stmt: true}, "return": {special: function (x) {
    var _u2177;
    if (nil63(x)) {
      _u2177 = "return";
    } else {
      _u2177 = "return(" + compile(x) + ")";
    }
    var _u2118 = _u2177;
    return(indentation() + _u2118);
  }, export: true, foo: true, stmt: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _u2178;
    if (is63(value)) {
      _u2178 = " = " + value1;
    } else {
      _u2178 = "";
    }
    var rh = _u2178;
    var _u2179;
    if (target === "js") {
      _u2179 = "var ";
    } else {
      _u2179 = "local ";
    }
    var keyword = _u2179;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, export: true, foo: true, stmt: true}, "%if": {tr: true, foo: true, special: function (cond, cons, alt) {
    var _u2121 = compile(cond);
    indent_level = indent_level + 1;
    var _u2123 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u2122 = _u2123;
    var _u2180;
    if (alt) {
      indent_level = indent_level + 1;
      var _u2125 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _u2180 = _u2125;
    }
    var _u2124 = _u2180;
    var ind = indentation();
    var s = "";
    if (target === "js") {
      s = s + ind + "if (" + _u2121 + ") {\n" + _u2122 + ind + "}";
    } else {
      s = s + ind + "if " + _u2121 + " then\n" + _u2122;
    }
    if (_u2124 && target === "js") {
      s = s + " else {\n" + _u2124 + ind + "}";
    } else {
      if (_u2124) {
        s = s + ind + "else\n" + _u2124;
      }
    }
    if (target === "lua") {
      return(s + ind + "end\n");
    } else {
      return(s + "\n");
    }
  }, export: true, stmt: true}, get: {special: function (t, k) {
    var _u2127 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_u2127, 0) === "{") {
      _u2127 = "(" + _u2127 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_u2127 + "." + inner(k));
    } else {
      return(_u2127 + "[" + k1 + "]");
    }
  }, foo: true, export: true}, "do": {tr: true, foo: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "";
    series(function (x) {
      s = s + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(s);
  }, export: true, stmt: true}, set: {special: function (lh, rh) {
    var _u2130 = compile(lh);
    var _u2181;
    if (nil63(rh)) {
      _u2181 = "nil";
    } else {
      _u2181 = rh;
    }
    var _u2131 = compile(_u2181);
    return(indentation() + _u2130 + " = " + _u2131);
  }, export: true, foo: true, stmt: true}, error: {special: function (x) {
    var _u2182;
    if (target === "js") {
      _u2182 = "throw new " + compile(["Error", x]);
    } else {
      _u2182 = "error(" + compile(x) + ")";
    }
    var e = _u2182;
    return(indentation() + e);
  }, export: true, foo: true, stmt: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"read-char": {variable: true}, whitespace: {variable: true}, "make-stream": {variable: true, export: true}, delimiters: {variable: true}, read: {variable: true, export: true}, eof: {variable: true}, "flag?": {variable: true}, "read-from-string": {variable: true, export: true}, "key?": {variable: true}, "read-table": {variable: true, export: true}, "skip-non-code": {variable: true}, "read-all": {variable: true, export: true}, "peek-char": {variable: true}, "define-reader": {export: true, macro: function (_u2147) {
    var char = _u2147[0];
    var stream = _u2147[1];
    var _u2146 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2146, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _u2157 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2157, 0);
    var alias = body.alias;
    var exp = body.export;
    var imp = body.import;
    var _u2158 = import_modules(imp);
    var imports = _u2158[0];
    var bindings = _u2158[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {alias: alias, export: {}, import: imports};
    var _u2159 = exp || [];
    var _u989 = undefined;
    for (_u989 in _u2159) {
      var x = _u2159[_u989];
      var _u2160 = parseInt(_u989);
      var _u2183;
      if (isNaN(_u2160)) {
        _u2183 = _u989;
      } else {
        _u2183 = _u2160;
      }
      var _u2161 = _u2183;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _u2184 = nexus["lumen/runtime"];
  var module = _u2184.module;
  var string_literal63 = _u2184["string-literal?"];
  var reduce = _u2184.reduce;
  var substring = _u2184.substring;
  var reverse = _u2184.reverse;
  var code = _u2184.code;
  var join = _u2184.join;
  var number63 = _u2184["number?"];
  var butlast = _u2184.butlast;
  var composite63 = _u2184["composite?"];
  var split = _u2184.split;
  var module_key = _u2184["module-key"];
  var one63 = _u2184["one?"];
  var sub = _u2184.sub;
  var series = _u2184.series;
  var list63 = _u2184["list?"];
  var keys63 = _u2184["keys?"];
  var string63 = _u2184["string?"];
  var char = _u2184.char;
  var read_file = _u2184["read-file"];
  var id_literal63 = _u2184["id-literal?"];
  var _47 = _u2184["/"];
  var apply = _u2184.apply;
  var sort = _u2184.sort;
  var drop = _u2184.drop;
  var exit = _u2184.exit;
  var replicate = _u2184.replicate;
  var in63 = _u2184["in?"];
  var nil63 = _u2184["nil?"];
  var cat = _u2184.cat;
  var _43 = _u2184["+"];
  var _42 = _u2184["*"];
  var _62 = _u2184[">"];
  var number = _u2184.number;
  var write_file = _u2184["write-file"];
  var find = _u2184.find;
  var stash = _u2184.stash;
  var hd = _u2184.hd;
  var atom63 = _u2184["atom?"];
  var _60 = _u2184["<"];
  var keep = _u2184.keep;
  var setenv = _u2184.setenv;
  var search = _u2184.search;
  var unstash = _u2184.unstash;
  var today = _u2184.today;
  var toplevel63 = _u2184["toplevel?"];
  var _37message_handler = _u2184["%message-handler"];
  var table63 = _u2184["table?"];
  var unique = _u2184.unique;
  var space = _u2184.space;
  var string = _u2184.string;
  var _6261 = _u2184[">="];
  var none63 = _u2184["none?"];
  var length = _u2184.length;
  var now = _u2184.now;
  var is63 = _u2184["is?"];
  var _ = _u2184["-"];
  var write = _u2184.write;
  var keys = _u2184.keys;
  var iterate = _u2184.iterate;
  var last = _u2184.last;
  var map = _u2184.map;
  var _37 = _u2184["%"];
  var _6061 = _u2184["<="];
  var some63 = _u2184["some?"];
  var inner = _u2184.inner;
  var function63 = _u2184["function?"];
  var _61 = _u2184["="];
  var pair = _u2184.pair;
  var add = _u2184.add;
  var tl = _u2184.tl;
  var empty63 = _u2184["empty?"];
  var boolean63 = _u2184["boolean?"];
})();
(function () {
  nexus["lumen/main"] = {};
  var _u2 = nexus["lumen/runtime"];
  var module = _u2.module;
  var string_literal63 = _u2["string-literal?"];
  var reduce = _u2.reduce;
  var substring = _u2.substring;
  var reverse = _u2.reverse;
  var code = _u2.code;
  var join = _u2.join;
  var number63 = _u2["number?"];
  var butlast = _u2.butlast;
  var composite63 = _u2["composite?"];
  var split = _u2.split;
  var module_key = _u2["module-key"];
  var one63 = _u2["one?"];
  var sub = _u2.sub;
  var series = _u2.series;
  var list63 = _u2["list?"];
  var keys63 = _u2["keys?"];
  var string63 = _u2["string?"];
  var char = _u2.char;
  var read_file = _u2["read-file"];
  var id_literal63 = _u2["id-literal?"];
  var length = _u2.length;
  var apply = _u2.apply;
  var sort = _u2.sort;
  var drop = _u2.drop;
  var exit = _u2.exit;
  var replicate = _u2.replicate;
  var in63 = _u2["in?"];
  var nil63 = _u2["nil?"];
  var iterate = _u2.iterate;
  var _43 = _u2["+"];
  var _42 = _u2["*"];
  var _62 = _u2[">"];
  var number = _u2.number;
  var write_file = _u2["write-file"];
  var find = _u2.find;
  var hd = _u2.hd;
  var atom63 = _u2["atom?"];
  var _60 = _u2["<"];
  var keep = _u2.keep;
  var setenv = _u2.setenv;
  var add = _u2.add;
  var tl = _u2.tl;
  var today = _u2.today;
  var toplevel63 = _u2["toplevel?"];
  var _37message_handler = _u2["%message-handler"];
  var table63 = _u2["table?"];
  var unique = _u2.unique;
  var space = _u2.space;
  var string = _u2.string;
  var now = _u2.now;
  var none63 = _u2["none?"];
  var write = _u2.write;
  var _6061 = _u2["<="];
  var is63 = _u2["is?"];
  var _6261 = _u2[">="];
  var _61 = _u2["="];
  var _ = _u2["-"];
  var _47 = _u2["/"];
  var boolean63 = _u2["boolean?"];
  var map = _u2.map;
  var _37 = _u2["%"];
  var cat = _u2.cat;
  var some63 = _u2["some?"];
  var inner = _u2.inner;
  var function63 = _u2["function?"];
  var search = _u2.search;
  var pair = _u2.pair;
  var unstash = _u2.unstash;
  var stash = _u2.stash;
  var empty63 = _u2["empty?"];
  var last = _u2.last;
  var keys = _u2.keys;
  var _u5 = nexus["lumen/reader"];
  var make_stream = _u5["make-stream"];
  var read_from_string = _u5["read-from-string"];
  var read_table = _u5["read-table"];
  var read_all = _u5["read-all"];
  var read = _u5.read;
  var _u6 = nexus["lumen/compiler"];
  var eval = _u6.eval;
  var load_module = _u6["load-module"];
  var compile_module = _u6["compile-module"];
  var open_module = _u6["open-module"];
  var in_module = _u6["in-module"];
  var import_modules = _u6["import-modules"];
  var compile_function = _u6["compile-function"];
  var compile = _u6.compile;
  var declare = _u6.declare;
  var rep = function (s) {
    var _u2188 = (function () {
      try {
        return([true, eval(read_from_string(s))]);
      }
      catch (_u2195) {
        return([false, _u2195.message]);
      }
    })();
    var _u1 = _u2188[0];
    var x = _u2188[1];
    if (is63(x)) {
      return(print(string(x)));
    }
  };
  nexus["lumen/main"].rep = rep;
  var repl = function () {
    var step = function (s) {
      rep(s);
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
