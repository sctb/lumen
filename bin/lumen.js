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
  var hd61 = function (l, x) {
    return(list63(l) && hd(l) === x);
  };
  nexus["lumen/runtime"]["hd="] = hd61;
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
      var _u177;
      if (nil63(from) || from < 0) {
        _u177 = 0;
      } else {
        _u177 = from;
      }
      var i = _u177;
      var n = length(x);
      var _u178;
      if (nil63(upto) || upto > n) {
        _u178 = n;
      } else {
        _u178 = upto;
      }
      var _u59 = _u178;
      while (i < _u59) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _u60 = x;
      var k = undefined;
      for (k in _u60) {
        var v = _u60[k];
        var _u61 = parseInt(k);
        var _u179;
        if (isNaN(_u61)) {
          _u179 = k;
        } else {
          _u179 = _u61;
        }
        var _u62 = _u179;
        if (!number63(_u62)) {
          l[_u62] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
  var keys = function (x) {
    var t = [];
    var _u64 = x;
    var k = undefined;
    for (k in _u64) {
      var v = _u64[k];
      var _u65 = parseInt(k);
      var _u180;
      if (isNaN(_u65)) {
        _u180 = k;
      } else {
        _u180 = _u65;
      }
      var _u66 = _u180;
      if (!number63(_u66)) {
        t[_u66] = v;
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
      var _u79 = a;
      var k = undefined;
      for (k in _u79) {
        var v = _u79[k];
        var _u80 = parseInt(k);
        var _u181;
        if (isNaN(_u80)) {
          _u181 = k;
        } else {
          _u181 = _u80;
        }
        var _u81 = _u181;
        c[_u81] = v;
      }
      var _u82 = b;
      var k = undefined;
      for (k in _u82) {
        var v = _u82[k];
        var _u83 = parseInt(k);
        var _u182;
        if (isNaN(_u83)) {
          _u182 = k;
        } else {
          _u182 = _u83;
        }
        var _u84 = _u182;
        if (number63(_u84)) {
          _u84 = _u84 + o;
        }
        c[_u84] = v;
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
    var _u88 = x;
    var k = undefined;
    for (k in _u88) {
      var v = _u88[k];
      var _u89 = parseInt(k);
      var _u183;
      if (isNaN(_u89)) {
        _u183 = k;
      } else {
        _u183 = _u89;
      }
      var _u90 = _u183;
      if (f(v)) {
        t[shift(_u90, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _u92 = t;
    var _u32 = undefined;
    for (_u32 in _u92) {
      var y = _u92[_u32];
      var _u93 = parseInt(_u32);
      var _u184;
      if (isNaN(_u93)) {
        _u184 = _u32;
      } else {
        _u184 = _u93;
      }
      var _u94 = _u184;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _u96 = t;
    var _u33 = undefined;
    for (_u33 in _u96) {
      var x = _u96[_u33];
      var _u97 = parseInt(_u33);
      var _u185;
      if (isNaN(_u97)) {
        _u185 = _u33;
      } else {
        _u185 = _u97;
      }
      var _u98 = _u185;
      var _u99 = f(x);
      if (_u99) {
        return(_u99);
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
    var _u186;
    if (f) {
      _u186 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_u186));
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
    var _u110 = x;
    var k = undefined;
    for (k in _u110) {
      var v = _u110[k];
      var _u111 = parseInt(k);
      var _u187;
      if (isNaN(_u111)) {
        _u187 = k;
      } else {
        _u187 = _u111;
      }
      var _u112 = _u187;
      var y = f(v);
      if (is63(y)) {
        t[shift(_u112, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var b = false;
    var _u114 = t;
    var k = undefined;
    for (k in _u114) {
      var _u34 = _u114[k];
      var _u115 = parseInt(k);
      var _u188;
      if (isNaN(_u115)) {
        _u188 = k;
      } else {
        _u188 = _u115;
      }
      var _u116 = _u188;
      if (!number63(_u116)) {
        b = true;
        break;
      }
    }
    return(b);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    var b = true;
    var _u118 = t;
    var _u35 = undefined;
    for (_u35 in _u118) {
      var _u36 = _u118[_u35];
      var _u119 = parseInt(_u35);
      var _u189;
      if (isNaN(_u119)) {
        _u189 = _u35;
      } else {
        _u189 = _u119;
      }
      var _u120 = _u189;
      b = false;
      break;
    }
    return(b);
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = [];
      var _u122 = args;
      var k = undefined;
      for (k in _u122) {
        var v = _u122[k];
        var _u123 = parseInt(k);
        var _u190;
        if (isNaN(_u123)) {
          _u190 = k;
        } else {
          _u190 = _u123;
        }
        var _u124 = _u190;
        if (!number63(_u124)) {
          p[_u124] = v;
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
        var _u126 = l;
        var k = undefined;
        for (k in _u126) {
          var v = _u126[k];
          var _u127 = parseInt(k);
          var _u191;
          if (isNaN(_u127)) {
            _u191 = k;
          } else {
            _u191 = _u127;
          }
          var _u128 = _u191;
          if (!(_u128 === "_stash")) {
            args1[_u128] = v;
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
              var _u153 = x;
              var k = undefined;
              for (k in _u153) {
                var v = _u153[k];
                var _u154 = parseInt(k);
                var _u192;
                if (isNaN(_u154)) {
                  _u192 = k;
                } else {
                  _u192 = _u154;
                }
                var _u155 = _u192;
                if (number63(_u155)) {
                  xs[_u155] = string(v, d);
                } else {
                  add(ks, _u155 + ":");
                  add(ks, string(v, d));
                }
              }
              var _u156 = join(xs, ks);
              var _u37 = undefined;
              for (_u37 in _u156) {
                var v = _u156[_u37];
                var _u157 = parseInt(_u37);
                var _u193;
                if (isNaN(_u157)) {
                  _u193 = _u37;
                } else {
                  _u193 = _u157;
                }
                var _u158 = _u193;
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
      if (string_literal63(x) || hd61(x, "cat")) {
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
    var _u165 = stash(args);
    return(f.apply(f, _u165));
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
    var _u172 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_u172, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _u173 = keys;
      var _u175 = undefined;
      for (_u175 in _u173) {
        var v = _u173[_u175];
        var _u174 = parseInt(_u175);
        var _u194;
        if (isNaN(_u174)) {
          _u194 = _u175;
        } else {
          _u194 = _u174;
        }
        var _u176 = _u194;
        x[_u176] = v;
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
  var _u198 = nexus["lumen/runtime"];
  var nil63 = _u198["nil?"];
  var is63 = _u198["is?"];
  var length = _u198.length;
  var none63 = _u198["none?"];
  var some63 = _u198["some?"];
  var one63 = _u198["one?"];
  var hd = _u198.hd;
  var string63 = _u198["string?"];
  var number63 = _u198["number?"];
  var boolean63 = _u198["boolean?"];
  var function63 = _u198["function?"];
  var composite63 = _u198["composite?"];
  var atom63 = _u198["atom?"];
  var table63 = _u198["table?"];
  var list63 = _u198["list?"];
  var hd61 = _u198["hd="];
  var substring = _u198.substring;
  var sub = _u198.sub;
  var keys = _u198.keys;
  var inner = _u198.inner;
  var tl = _u198.tl;
  var char = _u198.char;
  var code = _u198.code;
  var string_literal63 = _u198["string-literal?"];
  var id_literal63 = _u198["id-literal?"];
  var add = _u198.add;
  var drop = _u198.drop;
  var last = _u198.last;
  var butlast = _u198.butlast;
  var reverse = _u198.reverse;
  var join = _u198.join;
  var reduce = _u198.reduce;
  var keep = _u198.keep;
  var in63 = _u198["in?"];
  var find = _u198.find;
  var pair = _u198.pair;
  var sort = _u198.sort;
  var iterate = _u198.iterate;
  var replicate = _u198.replicate;
  var series = _u198.series;
  var map = _u198.map;
  var keys63 = _u198["keys?"];
  var empty63 = _u198["empty?"];
  var stash = _u198.stash;
  var unstash = _u198.unstash;
  var search = _u198.search;
  var split = _u198.split;
  var cat = _u198.cat;
  var _43 = _u198["+"];
  var _ = _u198["-"];
  var _42 = _u198["*"];
  var _47 = _u198["/"];
  var _37 = _u198["%"];
  var _62 = _u198[">"];
  var _60 = _u198["<"];
  var _61 = _u198["="];
  var _6261 = _u198[">="];
  var _6061 = _u198["<="];
  var read_file = _u198["read-file"];
  var write_file = _u198["write-file"];
  var write = _u198.write;
  var exit = _u198.exit;
  var today = _u198.today;
  var now = _u198.now;
  var number = _u198.number;
  var string = _u198.string;
  var space = _u198.space;
  var apply = _u198.apply;
  var unique = _u198.unique;
  var _37message_handler = _u198["%message-handler"];
  var toplevel63 = _u198["toplevel?"];
  var module_key = _u198["module-key"];
  var module = _u198.module;
  var setenv = _u198.setenv;
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
      var _u373;
      if (c === "\n") {
        _u373 = "\\n";
      } else {
        var _u374;
        if (c === "\"") {
          _u374 = "\\\"";
        } else {
          var _u375;
          if (c === "\\") {
            _u375 = "\\\\";
          } else {
            _u375 = c;
          }
          _u374 = _u375;
        }
        _u373 = _u374;
      }
      var c1 = _u373;
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
      var _u220 = args;
      var k = undefined;
      for (k in _u220) {
        var v = _u220[k];
        var _u221 = parseInt(k);
        var _u376;
        if (isNaN(_u221)) {
          _u376 = k;
        } else {
          _u376 = _u221;
        }
        var _u222 = _u376;
        if (!number63(_u222)) {
          add(l, literal(_u222));
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
        var _u231 = lh;
        var k = undefined;
        for (k in _u231) {
          var v = _u231[k];
          var _u232 = parseInt(k);
          var _u377;
          if (isNaN(_u232)) {
            _u377 = k;
          } else {
            _u377 = _u232;
          }
          var _u233 = _u377;
          var _u378;
          if (_u233 === "rest") {
            _u378 = ["sub", rh, length(lh)];
          } else {
            _u378 = ["get", rh, ["quote", bias(_u233)]];
          }
          var x = _u378;
          var _u379;
          if (v === true) {
            _u379 = _u233;
          } else {
            _u379 = v;
          }
          var _u237 = _u379;
          bs = join(bs, bind(_u237, x));
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
      var _u254 = args;
      var k = undefined;
      for (k in _u254) {
        var v = _u254[k];
        var _u255 = parseInt(k);
        var _u380;
        if (isNaN(_u255)) {
          _u380 = k;
        } else {
          _u380 = _u255;
        }
        var _u256 = _u380;
        if (number63(_u256)) {
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
          var _u195 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _u196 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _u271 = args;
            var _u994 = undefined;
            for (_u994 in _u271) {
              var _u269 = _u271[_u994];
              var _u272 = parseInt(_u994);
              var _u382;
              if (isNaN(_u272)) {
                _u382 = _u994;
              } else {
                _u382 = _u272;
              }
              var _u273 = _u382;
              setenv(_u269, {_stash: true, variable: true});
            }
            var _u270 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_u270);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _u197 = form[0];
              var _u275 = form[1];
              var _u276 = form[2];
              var _u277 = sub(form, 3);
              add(environment, {_scope: true});
              var _u280 = _u276;
              var _u994 = undefined;
              for (_u994 in _u280) {
                var _u278 = _u280[_u994];
                var _u281 = parseInt(_u994);
                var _u381;
                if (isNaN(_u281)) {
                  _u381 = _u994;
                } else {
                  _u381 = _u281;
                }
                var _u282 = _u381;
                setenv(_u278, {_stash: true, variable: true});
              }
              var _u279 = join([x, _u275, _u276], macroexpand(_u277));
              drop(environment);
              return(_u279);
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
    var _u287 = form;
    var k = undefined;
    for (k in _u287) {
      var v = _u287[k];
      var _u288 = parseInt(k);
      var _u383;
      if (isNaN(_u288)) {
        _u383 = k;
      } else {
        _u383 = _u288;
      }
      var _u289 = _u383;
      if (!number63(_u289)) {
        var _u384;
        if (quasisplice63(v, depth)) {
          _u384 = quasiexpand(v[1]);
        } else {
          _u384 = quasiexpand(v, depth);
        }
        var _u290 = _u384;
        last(xs)[_u289] = _u290;
      }
    }
    series(function (x) {
      if (quasisplice63(x, depth)) {
        var _u292 = quasiexpand(x[1]);
        add(xs, _u292);
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
      var _u385;
      if (c === "-") {
        _u385 = "_";
      } else {
        var _u386;
        if (valid_code63(n)) {
          _u386 = c;
        } else {
          var _u387;
          if (i === 0) {
            _u387 = "_" + n;
          } else {
            _u387 = n;
          }
          _u386 = _u387;
        }
        _u385 = _u386;
      }
      var c1 = _u385;
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
    var _u331 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u331.private;
    var m = unique();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _u332 = module(spec).export;
      var _u334 = undefined;
      for (_u334 in _u332) {
        var v = _u332[_u334];
        var _u333 = parseInt(_u334);
        var _u388;
        if (isNaN(_u333)) {
          _u388 = _u334;
        } else {
          _u388 = _u333;
        }
        var _u335 = _u388;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _u335, ["get", m, ["quote", _u335]]]);
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
    var _u350 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_u350, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _u351 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_u351, 0);
    var t1 = [];
    var _u352 = t;
    var k = undefined;
    for (k in _u352) {
      var v = _u352[k];
      var _u353 = parseInt(k);
      var _u389;
      if (isNaN(_u353)) {
        _u389 = k;
      } else {
        _u389 = _u353;
      }
      var _u354 = _u389;
      if (!keys[_u354]) {
        t1[_u354] = v;
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
    var _u358 = t;
    var k = undefined;
    for (k in _u358) {
      var v = _u358[k];
      var _u359 = parseInt(k);
      var _u390;
      if (isNaN(_u359)) {
        _u390 = k;
      } else {
        _u390 = _u359;
      }
      var _u360 = _u390;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_u360));
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
    var _u368 = ["table"];
    _u368.import = quoted(m.import);
    _u368.alias = quoted(m.alias);
    _u368.export = quote_frame(m.export);
    return(_u368);
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
  var _u391 = nexus["lumen/runtime"];
  var nil63 = _u391["nil?"];
  var is63 = _u391["is?"];
  var length = _u391.length;
  var none63 = _u391["none?"];
  var some63 = _u391["some?"];
  var one63 = _u391["one?"];
  var hd = _u391.hd;
  var string63 = _u391["string?"];
  var number63 = _u391["number?"];
  var boolean63 = _u391["boolean?"];
  var function63 = _u391["function?"];
  var composite63 = _u391["composite?"];
  var atom63 = _u391["atom?"];
  var table63 = _u391["table?"];
  var list63 = _u391["list?"];
  var hd61 = _u391["hd="];
  var substring = _u391.substring;
  var sub = _u391.sub;
  var keys = _u391.keys;
  var inner = _u391.inner;
  var tl = _u391.tl;
  var char = _u391.char;
  var code = _u391.code;
  var string_literal63 = _u391["string-literal?"];
  var id_literal63 = _u391["id-literal?"];
  var add = _u391.add;
  var drop = _u391.drop;
  var last = _u391.last;
  var butlast = _u391.butlast;
  var reverse = _u391.reverse;
  var join = _u391.join;
  var reduce = _u391.reduce;
  var keep = _u391.keep;
  var in63 = _u391["in?"];
  var find = _u391.find;
  var pair = _u391.pair;
  var sort = _u391.sort;
  var iterate = _u391.iterate;
  var replicate = _u391.replicate;
  var series = _u391.series;
  var map = _u391.map;
  var keys63 = _u391["keys?"];
  var empty63 = _u391["empty?"];
  var stash = _u391.stash;
  var unstash = _u391.unstash;
  var search = _u391.search;
  var split = _u391.split;
  var cat = _u391.cat;
  var _43 = _u391["+"];
  var _ = _u391["-"];
  var _42 = _u391["*"];
  var _47 = _u391["/"];
  var _37 = _u391["%"];
  var _62 = _u391[">"];
  var _60 = _u391["<"];
  var _61 = _u391["="];
  var _6261 = _u391[">="];
  var _6061 = _u391["<="];
  var read_file = _u391["read-file"];
  var write_file = _u391["write-file"];
  var write = _u391.write;
  var exit = _u391.exit;
  var today = _u391.today;
  var now = _u391.now;
  var number = _u391.number;
  var string = _u391.string;
  var space = _u391.space;
  var apply = _u391.apply;
  var unique = _u391.unique;
  var _37message_handler = _u391["%message-handler"];
  var toplevel63 = _u391["toplevel?"];
  var module_key = _u391["module-key"];
  var module = _u391.module;
  var setenv = _u391.setenv;
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
  var nil63 = _u440["nil?"];
  var is63 = _u440["is?"];
  var length = _u440.length;
  var none63 = _u440["none?"];
  var some63 = _u440["some?"];
  var one63 = _u440["one?"];
  var hd = _u440.hd;
  var string63 = _u440["string?"];
  var number63 = _u440["number?"];
  var boolean63 = _u440["boolean?"];
  var function63 = _u440["function?"];
  var composite63 = _u440["composite?"];
  var atom63 = _u440["atom?"];
  var table63 = _u440["table?"];
  var list63 = _u440["list?"];
  var hd61 = _u440["hd="];
  var substring = _u440.substring;
  var sub = _u440.sub;
  var keys = _u440.keys;
  var inner = _u440.inner;
  var tl = _u440.tl;
  var char = _u440.char;
  var code = _u440.code;
  var string_literal63 = _u440["string-literal?"];
  var id_literal63 = _u440["id-literal?"];
  var add = _u440.add;
  var drop = _u440.drop;
  var last = _u440.last;
  var butlast = _u440.butlast;
  var reverse = _u440.reverse;
  var join = _u440.join;
  var reduce = _u440.reduce;
  var keep = _u440.keep;
  var in63 = _u440["in?"];
  var find = _u440.find;
  var pair = _u440.pair;
  var sort = _u440.sort;
  var iterate = _u440.iterate;
  var replicate = _u440.replicate;
  var series = _u440.series;
  var map = _u440.map;
  var keys63 = _u440["keys?"];
  var empty63 = _u440["empty?"];
  var stash = _u440.stash;
  var unstash = _u440.unstash;
  var search = _u440.search;
  var split = _u440.split;
  var cat = _u440.cat;
  var _43 = _u440["+"];
  var _ = _u440["-"];
  var _42 = _u440["*"];
  var _47 = _u440["/"];
  var _37 = _u440["%"];
  var _62 = _u440[">"];
  var _60 = _u440["<"];
  var _61 = _u440["="];
  var _6261 = _u440[">="];
  var _6061 = _u440["<="];
  var read_file = _u440["read-file"];
  var write_file = _u440["write-file"];
  var write = _u440.write;
  var exit = _u440.exit;
  var today = _u440.today;
  var now = _u440.now;
  var number = _u440.number;
  var string = _u440.string;
  var space = _u440.space;
  var apply = _u440.apply;
  var unique = _u440.unique;
  var _37message_handler = _u440["%message-handler"];
  var toplevel63 = _u440["toplevel?"];
  var module_key = _u440["module-key"];
  var module = _u440.module;
  var setenv = _u440.setenv;
  var _u443 = nexus["lumen/lib"];
  var getenv = _u443.getenv;
  var macro_function = _u443["macro-function"];
  var macro63 = _u443["macro?"];
  var special63 = _u443["special?"];
  var special_form63 = _u443["special-form?"];
  var statement63 = _u443["statement?"];
  var symbol_expansion = _u443["symbol-expansion"];
  var symbol63 = _u443["symbol?"];
  var variable63 = _u443["variable?"];
  var bound63 = _u443["bound?"];
  var quoted = _u443.quoted;
  var stash42 = _u443["stash*"];
  var index = _u443.index;
  var bind = _u443.bind;
  var bind42 = _u443["bind*"];
  var quasiexpand = _u443.quasiexpand;
  var macroexpand = _u443.macroexpand;
  var indentation = _u443.indentation;
  var reserved63 = _u443["reserved?"];
  var valid_id63 = _u443["valid-id?"];
  var id = _u443.id;
  var key = _u443.key;
  var imported = _u443.imported;
  var link = _u443.link;
  var mapo = _u443.mapo;
  var quote_environment = _u443["quote-environment"];
  var quote_modules = _u443["quote-modules"];
  var initial_environment = _u443["initial-environment"];
  var _u444 = nexus["lumen/reader"];
  var make_stream = _u444["make-stream"];
  var read_table = _u444["read-table"];
  var read = _u444.read;
  var read_all = _u444["read-all"];
  var read_from_string = _u444["read-from-string"];
  var _u447 = [];
  var _u448 = [];
  _u448.js = "!";
  _u448.lua = "not ";
  _u447["not"] = _u448;
  var _u450 = [];
  _u450["*"] = true;
  _u450["/"] = true;
  _u450["%"] = true;
  var _u452 = [];
  _u452["+"] = true;
  _u452["-"] = true;
  var _u454 = [];
  var _u455 = [];
  _u455.js = "+";
  _u455.lua = "..";
  _u454.cat = _u455;
  var _u457 = [];
  _u457["<"] = true;
  _u457[">"] = true;
  _u457["<="] = true;
  _u457[">="] = true;
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
        var _u583;
        if (isNaN(_u472)) {
          _u583 = k;
        } else {
          _u583 = _u472;
        }
        var _u473 = _u583;
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
    var special = _u482.special;
    var stmt = _u482.stmt;
    var self_tr63 = _u482.tr;
    var tr = terminator(stmt63 && !self_tr63);
    return(apply(special, args) + tr);
  };
  nexus["lumen/compiler"]["compile-special"] = compile_special;
  var parenthesize_call63 = function (x) {
    return(hd61(x, "%function") || precedence(x) > 0);
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
    var _u584;
    if (right) {
      _u584 = _6261;
    } else {
      _u584 = _62;
    }
    if (_u584(precedence(child), precedence(parent))) {
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
    var _u585;
    if (name) {
      _u585 = compile(name);
    } else {
      _u585 = "";
    }
    var id = _u585;
    var _u496 = prefix || "";
    var _u497 = compile_args(args);
    indent_level = indent_level + 1;
    var _u499 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u498 = _u499;
    var ind = indentation();
    var _u586;
    if (target === "js") {
      _u586 = "";
    } else {
      _u586 = "end";
    }
    var tr = _u586;
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
        var _u587;
        if (stmt) {
          _u587 = indentation();
        } else {
          _u587 = "";
        }
        var ind = _u587;
        var _u588;
        if (atom63(form)) {
          _u588 = compile_atom(form);
        } else {
          var _u589;
          if (infix63(hd(form))) {
            _u589 = compile_infix(form);
          } else {
            _u589 = compile_call(form);
          }
          _u588 = _u589;
        }
        var _u502 = _u588;
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
      var _u591;
      if (_u514) {
        _u591 = [lower_body([_u514], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u513], tail63)], _u591)));
    } else {
      var e = unique();
      add(hoist, ["%local", e]);
      var _u590;
      if (_u514) {
        _u590 = [lower(["set", e, _u514])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u513])], _u590));
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
      var _u592;
      if (x === "and") {
        _u592 = ["%if", id, b, id];
      } else {
        _u592 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _u592], hoist));
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
  var in_module;
  nexus["lumen/compiler"]["in-module"] = in_module;
  var _37compile_module = function (spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    environment = initial_environment();
    var s = make_stream(read_file(path));
    var first = read(s);
    if (!hd61(first, "define-module")) {
      current_module = "user";
      in_module("user");
    }
    var body = join([first], read_all(s));
    var form = encapsulate(body);
    var code = compile(form) + ";\n";
    var _u563 = current_module;
    current_module = mod0;
    environment = env0;
    conclude(code);
    return(_u563);
  };
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  var open_module = function (spec) {
    var _u564 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u564.private;
    var m = module(spec);
    var frame = last(environment);
    var _u565 = m.export;
    var k = undefined;
    for (k in _u565) {
      var v = _u565[k];
      var _u566 = parseInt(k);
      var _u593;
      if (isNaN(_u566)) {
        _u593 = k;
      } else {
        _u593 = _u566;
      }
      var _u567 = _u593;
      if (v.export || private) {
        frame[_u567] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _u568 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u568.private;
    if (!module(spec)) {
      spec = _37compile_module(spec);
    }
    open_module(spec, {_stash: true, private: private});
    return(spec);
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  in_module = function (spec) {
    var _u570 = load_module(spec, {_stash: true, private: true});
    var m = module(_u570);
    series(open_module, m.import);
    current_module = _u570;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    series(function (spec) {
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _u573 = import_modules(m.alias);
        var aliased = _u573[0];
        var bs = _u573[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _u574 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _u574);
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
  var _u594 = nexus["lumen/runtime"];
  var nil63 = _u594["nil?"];
  var is63 = _u594["is?"];
  var length = _u594.length;
  var none63 = _u594["none?"];
  var some63 = _u594["some?"];
  var one63 = _u594["one?"];
  var hd = _u594.hd;
  var string63 = _u594["string?"];
  var number63 = _u594["number?"];
  var boolean63 = _u594["boolean?"];
  var function63 = _u594["function?"];
  var composite63 = _u594["composite?"];
  var atom63 = _u594["atom?"];
  var table63 = _u594["table?"];
  var list63 = _u594["list?"];
  var hd61 = _u594["hd="];
  var substring = _u594.substring;
  var sub = _u594.sub;
  var keys = _u594.keys;
  var inner = _u594.inner;
  var tl = _u594.tl;
  var char = _u594.char;
  var code = _u594.code;
  var string_literal63 = _u594["string-literal?"];
  var id_literal63 = _u594["id-literal?"];
  var add = _u594.add;
  var drop = _u594.drop;
  var last = _u594.last;
  var butlast = _u594.butlast;
  var reverse = _u594.reverse;
  var join = _u594.join;
  var reduce = _u594.reduce;
  var keep = _u594.keep;
  var in63 = _u594["in?"];
  var find = _u594.find;
  var pair = _u594.pair;
  var sort = _u594.sort;
  var iterate = _u594.iterate;
  var replicate = _u594.replicate;
  var series = _u594.series;
  var map = _u594.map;
  var keys63 = _u594["keys?"];
  var empty63 = _u594["empty?"];
  var stash = _u594.stash;
  var unstash = _u594.unstash;
  var search = _u594.search;
  var split = _u594.split;
  var cat = _u594.cat;
  var _43 = _u594["+"];
  var _ = _u594["-"];
  var _42 = _u594["*"];
  var _47 = _u594["/"];
  var _37 = _u594["%"];
  var _62 = _u594[">"];
  var _60 = _u594["<"];
  var _61 = _u594["="];
  var _6261 = _u594[">="];
  var _6061 = _u594["<="];
  var read_file = _u594["read-file"];
  var write_file = _u594["write-file"];
  var write = _u594.write;
  var exit = _u594.exit;
  var today = _u594.today;
  var now = _u594.now;
  var number = _u594.number;
  var string = _u594.string;
  var space = _u594.space;
  var apply = _u594.apply;
  var unique = _u594.unique;
  var _37message_handler = _u594["%message-handler"];
  var toplevel63 = _u594["toplevel?"];
  var module_key = _u594["module-key"];
  var module = _u594.module;
  var setenv = _u594.setenv;
  var _u597 = nexus["lumen/lib"];
  var getenv = _u597.getenv;
  var macro_function = _u597["macro-function"];
  var macro63 = _u597["macro?"];
  var special63 = _u597["special?"];
  var special_form63 = _u597["special-form?"];
  var statement63 = _u597["statement?"];
  var symbol_expansion = _u597["symbol-expansion"];
  var symbol63 = _u597["symbol?"];
  var variable63 = _u597["variable?"];
  var bound63 = _u597["bound?"];
  var quoted = _u597.quoted;
  var stash42 = _u597["stash*"];
  var index = _u597.index;
  var bind = _u597.bind;
  var bind42 = _u597["bind*"];
  var quasiexpand = _u597.quasiexpand;
  var macroexpand = _u597.macroexpand;
  var indentation = _u597.indentation;
  var reserved63 = _u597["reserved?"];
  var valid_id63 = _u597["valid-id?"];
  var id = _u597.id;
  var key = _u597.key;
  var imported = _u597.imported;
  var link = _u597.link;
  var mapo = _u597.mapo;
  var quote_environment = _u597["quote-environment"];
  var quote_modules = _u597["quote-modules"];
  var initial_environment = _u597["initial-environment"];
  var _u598 = nexus["lumen/compiler"];
  var compile_function = _u598["compile-function"];
  var compile = _u598.compile;
  var open_module = _u598["open-module"];
  var load_module = _u598["load-module"];
  var in_module = _u598["in-module"];
  var import_modules = _u598["import-modules"];
  var compile_module = _u598["compile-module"];
  var declare = _u598.declare;
  var eval = _u598.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _u996 = nexus["lumen/runtime"];
  var nil63 = _u996["nil?"];
  var is63 = _u996["is?"];
  var length = _u996.length;
  var none63 = _u996["none?"];
  var some63 = _u996["some?"];
  var one63 = _u996["one?"];
  var hd = _u996.hd;
  var string63 = _u996["string?"];
  var number63 = _u996["number?"];
  var boolean63 = _u996["boolean?"];
  var function63 = _u996["function?"];
  var composite63 = _u996["composite?"];
  var atom63 = _u996["atom?"];
  var table63 = _u996["table?"];
  var list63 = _u996["list?"];
  var hd61 = _u996["hd="];
  var substring = _u996.substring;
  var sub = _u996.sub;
  var keys = _u996.keys;
  var inner = _u996.inner;
  var tl = _u996.tl;
  var char = _u996.char;
  var code = _u996.code;
  var string_literal63 = _u996["string-literal?"];
  var id_literal63 = _u996["id-literal?"];
  var add = _u996.add;
  var drop = _u996.drop;
  var last = _u996.last;
  var butlast = _u996.butlast;
  var reverse = _u996.reverse;
  var join = _u996.join;
  var reduce = _u996.reduce;
  var keep = _u996.keep;
  var in63 = _u996["in?"];
  var find = _u996.find;
  var pair = _u996.pair;
  var sort = _u996.sort;
  var iterate = _u996.iterate;
  var replicate = _u996.replicate;
  var series = _u996.series;
  var map = _u996.map;
  var keys63 = _u996["keys?"];
  var empty63 = _u996["empty?"];
  var stash = _u996.stash;
  var unstash = _u996.unstash;
  var search = _u996.search;
  var split = _u996.split;
  var cat = _u996.cat;
  var _43 = _u996["+"];
  var _ = _u996["-"];
  var _42 = _u996["*"];
  var _47 = _u996["/"];
  var _37 = _u996["%"];
  var _62 = _u996[">"];
  var _60 = _u996["<"];
  var _61 = _u996["="];
  var _6261 = _u996[">="];
  var _6061 = _u996["<="];
  var read_file = _u996["read-file"];
  var write_file = _u996["write-file"];
  var write = _u996.write;
  var exit = _u996.exit;
  var today = _u996.today;
  var now = _u996.now;
  var number = _u996.number;
  var string = _u996.string;
  var space = _u996.space;
  var apply = _u996.apply;
  var unique = _u996.unique;
  var _37message_handler = _u996["%message-handler"];
  var toplevel63 = _u996["toplevel?"];
  var module_key = _u996["module-key"];
  var module = _u996.module;
  var setenv = _u996.setenv;
  var _u999 = nexus["lumen/lib"];
  var getenv = _u999.getenv;
  var macro_function = _u999["macro-function"];
  var macro63 = _u999["macro?"];
  var special63 = _u999["special?"];
  var special_form63 = _u999["special-form?"];
  var statement63 = _u999["statement?"];
  var symbol_expansion = _u999["symbol-expansion"];
  var symbol63 = _u999["symbol?"];
  var variable63 = _u999["variable?"];
  var bound63 = _u999["bound?"];
  var quoted = _u999.quoted;
  var stash42 = _u999["stash*"];
  var index = _u999.index;
  var bind = _u999.bind;
  var bind42 = _u999["bind*"];
  var quasiexpand = _u999.quasiexpand;
  var macroexpand = _u999.macroexpand;
  var indentation = _u999.indentation;
  var reserved63 = _u999["reserved?"];
  var valid_id63 = _u999["valid-id?"];
  var id = _u999.id;
  var key = _u999.key;
  var imported = _u999.imported;
  var link = _u999.link;
  var mapo = _u999.mapo;
  var quote_environment = _u999["quote-environment"];
  var quote_modules = _u999["quote-modules"];
  var initial_environment = _u999["initial-environment"];
  var _u1000 = nexus["lumen/compiler"];
  var compile_function = _u1000["compile-function"];
  var compile = _u1000.compile;
  var open_module = _u1000["open-module"];
  var load_module = _u1000["load-module"];
  var in_module = _u1000["in-module"];
  var import_modules = _u1000["import-modules"];
  var compile_module = _u1000["compile-module"];
  var declare = _u1000.declare;
  var eval = _u1000.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _u1863 = nexus["lumen/runtime"];
  var nil63 = _u1863["nil?"];
  var is63 = _u1863["is?"];
  var length = _u1863.length;
  var none63 = _u1863["none?"];
  var some63 = _u1863["some?"];
  var one63 = _u1863["one?"];
  var hd = _u1863.hd;
  var string63 = _u1863["string?"];
  var number63 = _u1863["number?"];
  var boolean63 = _u1863["boolean?"];
  var function63 = _u1863["function?"];
  var composite63 = _u1863["composite?"];
  var atom63 = _u1863["atom?"];
  var table63 = _u1863["table?"];
  var list63 = _u1863["list?"];
  var hd61 = _u1863["hd="];
  var substring = _u1863.substring;
  var sub = _u1863.sub;
  var keys = _u1863.keys;
  var inner = _u1863.inner;
  var tl = _u1863.tl;
  var char = _u1863.char;
  var code = _u1863.code;
  var string_literal63 = _u1863["string-literal?"];
  var id_literal63 = _u1863["id-literal?"];
  var add = _u1863.add;
  var drop = _u1863.drop;
  var last = _u1863.last;
  var butlast = _u1863.butlast;
  var reverse = _u1863.reverse;
  var join = _u1863.join;
  var reduce = _u1863.reduce;
  var keep = _u1863.keep;
  var in63 = _u1863["in?"];
  var find = _u1863.find;
  var pair = _u1863.pair;
  var sort = _u1863.sort;
  var iterate = _u1863.iterate;
  var replicate = _u1863.replicate;
  var series = _u1863.series;
  var map = _u1863.map;
  var keys63 = _u1863["keys?"];
  var empty63 = _u1863["empty?"];
  var stash = _u1863.stash;
  var unstash = _u1863.unstash;
  var search = _u1863.search;
  var split = _u1863.split;
  var cat = _u1863.cat;
  var _43 = _u1863["+"];
  var _ = _u1863["-"];
  var _42 = _u1863["*"];
  var _47 = _u1863["/"];
  var _37 = _u1863["%"];
  var _62 = _u1863[">"];
  var _60 = _u1863["<"];
  var _61 = _u1863["="];
  var _6261 = _u1863[">="];
  var _6061 = _u1863["<="];
  var read_file = _u1863["read-file"];
  var write_file = _u1863["write-file"];
  var write = _u1863.write;
  var exit = _u1863.exit;
  var today = _u1863.today;
  var now = _u1863.now;
  var number = _u1863.number;
  var string = _u1863.string;
  var space = _u1863.space;
  var apply = _u1863.apply;
  var unique = _u1863.unique;
  var _37message_handler = _u1863["%message-handler"];
  var toplevel63 = _u1863["toplevel?"];
  var module_key = _u1863["module-key"];
  var module = _u1863.module;
  var setenv = _u1863.setenv;
  var _u1866 = nexus["lumen/lib"];
  var getenv = _u1866.getenv;
  var macro_function = _u1866["macro-function"];
  var macro63 = _u1866["macro?"];
  var special63 = _u1866["special?"];
  var special_form63 = _u1866["special-form?"];
  var statement63 = _u1866["statement?"];
  var symbol_expansion = _u1866["symbol-expansion"];
  var symbol63 = _u1866["symbol?"];
  var variable63 = _u1866["variable?"];
  var bound63 = _u1866["bound?"];
  var quoted = _u1866.quoted;
  var stash42 = _u1866["stash*"];
  var index = _u1866.index;
  var bind = _u1866.bind;
  var bind42 = _u1866["bind*"];
  var quasiexpand = _u1866.quasiexpand;
  var macroexpand = _u1866.macroexpand;
  var indentation = _u1866.indentation;
  var reserved63 = _u1866["reserved?"];
  var valid_id63 = _u1866["valid-id?"];
  var id = _u1866.id;
  var key = _u1866.key;
  var imported = _u1866.imported;
  var link = _u1866.link;
  var mapo = _u1866.mapo;
  var quote_environment = _u1866["quote-environment"];
  var quote_modules = _u1866["quote-modules"];
  var initial_environment = _u1866["initial-environment"];
  var _u1867 = nexus["lumen/compiler"];
  var compile_function = _u1867["compile-function"];
  var compile = _u1867.compile;
  var open_module = _u1867["open-module"];
  var load_module = _u1867["load-module"];
  var in_module = _u1867["in-module"];
  var import_modules = _u1867["import-modules"];
  var compile_module = _u1867["compile-module"];
  var declare = _u1867.declare;
  var eval = _u1867.eval;
  global.modules = {"lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_u1894) {
    var char = _u1894[0];
    var stream = _u1894[1];
    var _u1893 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1893, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, "hd=": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, butlast: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, unique: {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {foo: true, export: true, tr: true, stmt: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "";
    series(function (x) {
      s = s + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(s);
  }}, "%if": {foo: true, export: true, tr: true, stmt: true, special: function (cond, cons, alt) {
    var _u1918 = compile(cond);
    indent_level = indent_level + 1;
    var _u1920 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u1919 = _u1920;
    var _u2166;
    if (alt) {
      indent_level = indent_level + 1;
      var _u1922 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _u2166 = _u1922;
    }
    var _u1921 = _u2166;
    var ind = indentation();
    var s = "";
    if (target === "js") {
      s = s + ind + "if (" + _u1918 + ") {\n" + _u1919 + ind + "}";
    } else {
      s = s + ind + "if " + _u1918 + " then\n" + _u1919;
    }
    if (_u1921 && target === "js") {
      s = s + " else {\n" + _u1921 + ind + "}";
    } else {
      if (_u1921) {
        s = s + ind + "else\n" + _u1921;
      }
    }
    if (target === "lua") {
      return(s + ind + "end\n");
    } else {
      return(s + "\n");
    }
  }}, "while": {foo: true, export: true, tr: true, stmt: true, special: function (cond, form) {
    var _u1924 = compile(cond);
    indent_level = indent_level + 1;
    var _u1925 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1925;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _u1924 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _u1924 + " do\n" + body + ind + "end\n");
    }
  }}, "%for": {foo: true, export: true, tr: true, stmt: true, special: function (t, k, form) {
    var _u1927 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u1928 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1928;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _u1927 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _u1927 + ") {\n" + body + ind + "}\n");
    }
  }}, "%try": {foo: true, export: true, tr: true, stmt: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u1930 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1930;
    var e = unique();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _u1934 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _u1934;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }}, "break": {special: function () {
    return(indentation() + "break");
  }, foo: true, export: true, stmt: true}, "%function": {foo: true, export: true, special: function (args, body) {
    return(compile_function(args, body));
  }}, "%global-function": {foo: true, export: true, tr: true, stmt: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }}, "%local-function": {foo: true, export: true, tr: true, stmt: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }}, "return": {special: function (x) {
    var _u2167;
    if (nil63(x)) {
      _u2167 = "return";
    } else {
      _u2167 = "return(" + compile(x) + ")";
    }
    var _u1942 = _u2167;
    return(indentation() + _u1942);
  }, foo: true, export: true, stmt: true}, error: {special: function (x) {
    var _u2168;
    if (target === "js") {
      _u2168 = "throw new " + compile(["Error", x]);
    } else {
      _u2168 = "error(" + compile(x) + ")";
    }
    var e = _u2168;
    return(indentation() + e);
  }, foo: true, export: true, stmt: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _u2169;
    if (is63(value)) {
      _u2169 = " = " + value1;
    } else {
      _u2169 = "";
    }
    var rh = _u2169;
    var _u2170;
    if (target === "js") {
      _u2170 = "var ";
    } else {
      _u2170 = "local ";
    }
    var keyword = _u2170;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, export: true, stmt: true}, set: {special: function (lh, rh) {
    var _u1947 = compile(lh);
    var _u2171;
    if (nil63(rh)) {
      _u2171 = "nil";
    } else {
      _u2171 = rh;
    }
    var _u1948 = compile(_u2171);
    return(indentation() + _u1947 + " = " + _u1948);
  }, foo: true, export: true, stmt: true}, get: {foo: true, export: true, special: function (t, k) {
    var _u1950 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_u1950, 0) === "{") {
      _u1950 = "(" + _u1950 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_u1950 + "." + inner(k));
    } else {
      return(_u1950 + "[" + k1 + "]");
    }
  }}, "not": {}, "%array": {foo: true, export: true, special: function () {
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
    var _u1951 = forms;
    var k = undefined;
    for (k in _u1951) {
      var v = _u1951[k];
      var _u1952 = parseInt(k);
      var _u2174;
      if (isNaN(_u1952)) {
        _u2174 = k;
      } else {
        _u2174 = _u1952;
      }
      var _u1953 = _u2174;
      if (number63(_u1953)) {
        s = s + c + compile(v);
        c = ", ";
      }
    }
    return(open + s + close);
  }}, "%object": {foo: true, export: true, special: function () {
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
    var _u1954 = pair(forms);
    var k = undefined;
    for (k in _u1954) {
      var v = _u1954[k];
      var _u1955 = parseInt(k);
      var _u2176;
      if (isNaN(_u1955)) {
        _u2176 = k;
      } else {
        _u2176 = _u1955;
      }
      var _u1956 = _u2176;
      if (number63(_u1956)) {
        var _u1957 = v[0];
        var _u1958 = v[1];
        if (!string63(_u1957)) {
          throw new Error("Illegal key: " + string(_u1957));
        }
        s = s + c + key(_u1957) + sep + compile(_u1958);
        c = ", ";
      }
    }
    return(s + "}");
  }}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = unique();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
    var id = unique();
    var _u1980 = body;
    var k = undefined;
    for (k in _u1980) {
      var v = _u1980[k];
      var _u1981 = parseInt(k);
      var _u2177;
      if (isNaN(_u1981)) {
        _u2177 = k;
      } else {
        _u2177 = _u1981;
      }
      var _u1982 = _u2177;
      if (number63(_u1982)) {
        l[_u1982] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _u1982]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_u1992) {
      var a = _u1992[0];
      var b = _u1992[1];
      var c = sub(_u1992, 2);
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
    var _u1996 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1996, 0);
    return(["if", cond, join(["do"], body)]);
  }}, unless: {export: true, macro: function (cond) {
    var _u1999 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1999, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var _u2005 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2005, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _u2007 = bind(lh, rh);
      var k = undefined;
      for (k in _u2007) {
        var _u2009 = _u2007[k];
        var id = _u2009[0];
        var val = _u2009[1];
        var _u2008 = parseInt(k);
        var _u2178;
        if (isNaN(_u2008)) {
          _u2178 = k;
        } else {
          _u2178 = _u2008;
        }
        var _u2010 = _u2178;
        if (number63(_u2010)) {
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
    var _u2016 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2016, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u2017 = import_modules(imp);
    var imports = _u2017[0];
    var bindings = _u2017[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u2018 = exp || [];
    var _u993 = undefined;
    for (_u993 in _u2018) {
      var x = _u2018[_u993];
      var _u2019 = parseInt(_u993);
      var _u2179;
      if (isNaN(_u2019)) {
        _u2179 = _u993;
      } else {
        _u2179 = _u2019;
      }
      var _u2020 = _u2179;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _u2026 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2026, 0);
    var form = join(["fn", args], body);
    var _u2028 = ["setenv", ["quote", name]];
    _u2028.macro = form;
    _u2028.form = ["quote", form];
    eval(_u2028);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var _u2031 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2031, 0);
    var form = join(["fn", args], body);
    var _u2033 = ["setenv", ["quote", name]];
    _u2033.special = form;
    _u2033.form = ["quote", form];
    eval(join(_u2033, keys(body)));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define-global": {export: true, macro: function (name, x) {
    var _u2037 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2037, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _u2038 = bind42(x, body);
      var args = _u2038[0];
      var _u2039 = _u2038[1];
      return(join(["%global-function", name, args], _u2039));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var _u2045 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2045, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _u2048 = bind42(x, body);
        var args = _u2048[0];
        var _u2049 = _u2048[1];
        return(link(name, join(["%local-function", name, args], _u2049)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, redefine: {macro: function (name, x) {
    var _u2052 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2052, 0);
    if (some63(body)) {
      x = join(["fn", x], body);
    }
    return(link(name, ["set", name, x]));
  }, export: true}, "with-bindings": {export: true, macro: function (_u2056) {
    var names = _u2056[0];
    var _u2055 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2055, 0);
    var x = unique();
    var _u2060 = ["setenv", x];
    _u2060.variable = true;
    var _u2057 = ["with-frame", ["all", ["_u994", x], names, _u2060]];
    _u2057.scope = true;
    return(join(_u2057, body));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _u2061 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2061, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _u2062 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2062);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _u2066 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2066, 0);
    add(environment, {});
    map(function (_u2069) {
      var name = _u2069[0];
      var exp = _u2069[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _u2067 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2067);
  }}, fn: {export: true, macro: function (args) {
    var _u2072 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2072, 0);
    var _u2073 = bind42(args, body);
    var _u2074 = _u2073[0];
    var _u2075 = _u2073[1];
    return(join(["%function", _u2074], _u2075));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = unique();
      var x = unique();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_u2088, t) {
    var k = _u2088[0];
    var v = _u2088[1];
    var _u2087 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2087, 0);
    var x = unique();
    var n = unique();
    var _u2180;
    if (target === "lua") {
      _u2180 = body;
    } else {
      _u2180 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u2180)]]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _u2101 = xs;
    var _u995 = undefined;
    for (_u995 in _u2101) {
      var x = _u2101[_u995];
      var _u2102 = parseInt(_u995);
      var _u2181;
      if (isNaN(_u2102)) {
        _u2181 = _u995;
      } else {
        _u2181 = _u2102;
      }
      var _u2103 = _u2181;
      l[x] = true;
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var _u2109 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2109, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, "cat!": {export: true, macro: function (a) {
    var _u2112 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2112, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var _u2122 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_u2122, 0);
    var scope = _u2122.scope;
    var x = unique();
    var _u2125 = ["table"];
    _u2125._scope = scope;
    return(["do", ["add", "environment", _u2125], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, context: {variable: true}, "%result": {global: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _u2156 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2156, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u2157 = import_modules(imp);
    var imports = _u2157[0];
    var bindings = _u2157[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u2158 = exp || [];
    var _u993 = undefined;
    for (_u993 in _u2158) {
      var x = _u2158[_u993];
      var _u2159 = parseInt(_u993);
      var _u2182;
      if (isNaN(_u2159)) {
        _u2182 = _u993;
      } else {
        _u2182 = _u2159;
      }
      var _u2160 = _u2182;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _u2183 = nexus["lumen/runtime"];
  var nil63 = _u2183["nil?"];
  var is63 = _u2183["is?"];
  var length = _u2183.length;
  var none63 = _u2183["none?"];
  var some63 = _u2183["some?"];
  var one63 = _u2183["one?"];
  var hd = _u2183.hd;
  var string63 = _u2183["string?"];
  var number63 = _u2183["number?"];
  var boolean63 = _u2183["boolean?"];
  var function63 = _u2183["function?"];
  var composite63 = _u2183["composite?"];
  var atom63 = _u2183["atom?"];
  var table63 = _u2183["table?"];
  var list63 = _u2183["list?"];
  var hd61 = _u2183["hd="];
  var substring = _u2183.substring;
  var sub = _u2183.sub;
  var keys = _u2183.keys;
  var inner = _u2183.inner;
  var tl = _u2183.tl;
  var char = _u2183.char;
  var code = _u2183.code;
  var string_literal63 = _u2183["string-literal?"];
  var id_literal63 = _u2183["id-literal?"];
  var add = _u2183.add;
  var drop = _u2183.drop;
  var last = _u2183.last;
  var butlast = _u2183.butlast;
  var reverse = _u2183.reverse;
  var join = _u2183.join;
  var reduce = _u2183.reduce;
  var keep = _u2183.keep;
  var in63 = _u2183["in?"];
  var find = _u2183.find;
  var pair = _u2183.pair;
  var sort = _u2183.sort;
  var iterate = _u2183.iterate;
  var replicate = _u2183.replicate;
  var series = _u2183.series;
  var map = _u2183.map;
  var keys63 = _u2183["keys?"];
  var empty63 = _u2183["empty?"];
  var stash = _u2183.stash;
  var unstash = _u2183.unstash;
  var search = _u2183.search;
  var split = _u2183.split;
  var cat = _u2183.cat;
  var _43 = _u2183["+"];
  var _ = _u2183["-"];
  var _42 = _u2183["*"];
  var _47 = _u2183["/"];
  var _37 = _u2183["%"];
  var _62 = _u2183[">"];
  var _60 = _u2183["<"];
  var _61 = _u2183["="];
  var _6261 = _u2183[">="];
  var _6061 = _u2183["<="];
  var read_file = _u2183["read-file"];
  var write_file = _u2183["write-file"];
  var write = _u2183.write;
  var exit = _u2183.exit;
  var today = _u2183.today;
  var now = _u2183.now;
  var number = _u2183.number;
  var string = _u2183.string;
  var space = _u2183.space;
  var apply = _u2183.apply;
  var unique = _u2183.unique;
  var _37message_handler = _u2183["%message-handler"];
  var toplevel63 = _u2183["toplevel?"];
  var module_key = _u2183["module-key"];
  var module = _u2183.module;
  var setenv = _u2183.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _u2 = nexus["lumen/runtime"];
  var nil63 = _u2["nil?"];
  var is63 = _u2["is?"];
  var length = _u2.length;
  var none63 = _u2["none?"];
  var some63 = _u2["some?"];
  var one63 = _u2["one?"];
  var hd = _u2.hd;
  var string63 = _u2["string?"];
  var number63 = _u2["number?"];
  var boolean63 = _u2["boolean?"];
  var function63 = _u2["function?"];
  var composite63 = _u2["composite?"];
  var atom63 = _u2["atom?"];
  var table63 = _u2["table?"];
  var list63 = _u2["list?"];
  var hd61 = _u2["hd="];
  var substring = _u2.substring;
  var sub = _u2.sub;
  var keys = _u2.keys;
  var inner = _u2.inner;
  var tl = _u2.tl;
  var char = _u2.char;
  var code = _u2.code;
  var string_literal63 = _u2["string-literal?"];
  var id_literal63 = _u2["id-literal?"];
  var add = _u2.add;
  var drop = _u2.drop;
  var last = _u2.last;
  var butlast = _u2.butlast;
  var reverse = _u2.reverse;
  var join = _u2.join;
  var reduce = _u2.reduce;
  var keep = _u2.keep;
  var in63 = _u2["in?"];
  var find = _u2.find;
  var pair = _u2.pair;
  var sort = _u2.sort;
  var iterate = _u2.iterate;
  var replicate = _u2.replicate;
  var series = _u2.series;
  var map = _u2.map;
  var keys63 = _u2["keys?"];
  var empty63 = _u2["empty?"];
  var stash = _u2.stash;
  var unstash = _u2.unstash;
  var search = _u2.search;
  var split = _u2.split;
  var cat = _u2.cat;
  var _43 = _u2["+"];
  var _ = _u2["-"];
  var _42 = _u2["*"];
  var _47 = _u2["/"];
  var _37 = _u2["%"];
  var _62 = _u2[">"];
  var _60 = _u2["<"];
  var _61 = _u2["="];
  var _6261 = _u2[">="];
  var _6061 = _u2["<="];
  var read_file = _u2["read-file"];
  var write_file = _u2["write-file"];
  var write = _u2.write;
  var exit = _u2.exit;
  var today = _u2.today;
  var now = _u2.now;
  var number = _u2.number;
  var string = _u2.string;
  var space = _u2.space;
  var apply = _u2.apply;
  var unique = _u2.unique;
  var _37message_handler = _u2["%message-handler"];
  var toplevel63 = _u2["toplevel?"];
  var module_key = _u2["module-key"];
  var module = _u2.module;
  var setenv = _u2.setenv;
  var _u5 = nexus["lumen/reader"];
  var make_stream = _u5["make-stream"];
  var read_table = _u5["read-table"];
  var read = _u5.read;
  var read_all = _u5["read-all"];
  var read_from_string = _u5["read-from-string"];
  var _u6 = nexus["lumen/compiler"];
  var compile_function = _u6["compile-function"];
  var compile = _u6.compile;
  var open_module = _u6["open-module"];
  var load_module = _u6["load-module"];
  var in_module = _u6["in-module"];
  var import_modules = _u6["import-modules"];
  var compile_module = _u6["compile-module"];
  var declare = _u6.declare;
  var eval = _u6.eval;
  var rep = function (s) {
    var _u2187 = (function () {
      try {
        return([true, eval(read_from_string(s))]);
      }
      catch (_u2194) {
        return([false, _u2194.message]);
      }
    })();
    var _u1 = _u2187[0];
    var x = _u2187[1];
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
