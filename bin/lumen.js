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
      var _u59 = _u177;
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
        var _u178;
        if (isNaN(_u61)) {
          _u178 = k;
        } else {
          _u178 = _u61;
        }
        var _u62 = _u178;
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
      var _u179;
      if (isNaN(_u65)) {
        _u179 = k;
      } else {
        _u179 = _u65;
      }
      var _u66 = _u179;
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
        var _u180;
        if (isNaN(_u80)) {
          _u180 = k;
        } else {
          _u180 = _u80;
        }
        var _u81 = _u180;
        c[_u81] = v;
      }
      var _u82 = b;
      var k = undefined;
      for (k in _u82) {
        var v = _u82[k];
        var _u83 = parseInt(k);
        var _u181;
        if (isNaN(_u83)) {
          _u181 = k;
        } else {
          _u181 = _u83;
        }
        var _u84 = _u181;
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
      var _u182;
      if (isNaN(_u89)) {
        _u182 = k;
      } else {
        _u182 = _u89;
      }
      var _u90 = _u182;
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
      var _u183;
      if (isNaN(_u93)) {
        _u183 = _u32;
      } else {
        _u183 = _u93;
      }
      var _u94 = _u183;
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
      var _u184;
      if (isNaN(_u97)) {
        _u184 = _u33;
      } else {
        _u184 = _u97;
      }
      var _u98 = _u184;
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
    var _u110 = x;
    var k = undefined;
    for (k in _u110) {
      var v = _u110[k];
      var _u111 = parseInt(k);
      var _u186;
      if (isNaN(_u111)) {
        _u186 = k;
      } else {
        _u186 = _u111;
      }
      var _u112 = _u186;
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
      var _u187;
      if (isNaN(_u115)) {
        _u187 = k;
      } else {
        _u187 = _u115;
      }
      var _u116 = _u187;
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
      var _u188;
      if (isNaN(_u119)) {
        _u188 = _u35;
      } else {
        _u188 = _u119;
      }
      var _u120 = _u188;
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
        var _u189;
        if (isNaN(_u123)) {
          _u189 = k;
        } else {
          _u189 = _u123;
        }
        var _u124 = _u189;
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
          var _u190;
          if (isNaN(_u127)) {
            _u190 = k;
          } else {
            _u190 = _u127;
          }
          var _u128 = _u190;
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
  var nil63 = _u197["nil?"];
  var is63 = _u197["is?"];
  var length = _u197.length;
  var none63 = _u197["none?"];
  var some63 = _u197["some?"];
  var one63 = _u197["one?"];
  var hd = _u197.hd;
  var string63 = _u197["string?"];
  var number63 = _u197["number?"];
  var boolean63 = _u197["boolean?"];
  var function63 = _u197["function?"];
  var composite63 = _u197["composite?"];
  var atom63 = _u197["atom?"];
  var table63 = _u197["table?"];
  var list63 = _u197["list?"];
  var hd61 = _u197["hd="];
  var substring = _u197.substring;
  var sub = _u197.sub;
  var keys = _u197.keys;
  var inner = _u197.inner;
  var tl = _u197.tl;
  var char = _u197.char;
  var code = _u197.code;
  var string_literal63 = _u197["string-literal?"];
  var id_literal63 = _u197["id-literal?"];
  var add = _u197.add;
  var drop = _u197.drop;
  var last = _u197.last;
  var butlast = _u197.butlast;
  var reverse = _u197.reverse;
  var join = _u197.join;
  var reduce = _u197.reduce;
  var keep = _u197.keep;
  var in63 = _u197["in?"];
  var find = _u197.find;
  var pair = _u197.pair;
  var sort = _u197.sort;
  var iterate = _u197.iterate;
  var replicate = _u197.replicate;
  var series = _u197.series;
  var map = _u197.map;
  var keys63 = _u197["keys?"];
  var empty63 = _u197["empty?"];
  var stash = _u197.stash;
  var unstash = _u197.unstash;
  var search = _u197.search;
  var split = _u197.split;
  var cat = _u197.cat;
  var _43 = _u197["+"];
  var _ = _u197["-"];
  var _42 = _u197["*"];
  var _47 = _u197["/"];
  var _37 = _u197["%"];
  var _62 = _u197[">"];
  var _60 = _u197["<"];
  var _61 = _u197["="];
  var _6261 = _u197[">="];
  var _6061 = _u197["<="];
  var read_file = _u197["read-file"];
  var write_file = _u197["write-file"];
  var write = _u197.write;
  var exit = _u197.exit;
  var today = _u197.today;
  var now = _u197.now;
  var number = _u197.number;
  var string = _u197.string;
  var space = _u197.space;
  var apply = _u197.apply;
  var unique = _u197.unique;
  var _37message_handler = _u197["%message-handler"];
  var toplevel63 = _u197["toplevel?"];
  var module_key = _u197["module-key"];
  var module = _u197.module;
  var setenv = _u197.setenv;
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
      var _u376;
      if (c === "\n") {
        _u376 = "\\n";
      } else {
        var _u377;
        if (c === "\"") {
          _u377 = "\\\"";
        } else {
          var _u378;
          if (c === "\\") {
            _u378 = "\\\\";
          } else {
            _u378 = c;
          }
          _u377 = _u378;
        }
        _u376 = _u377;
      }
      var c1 = _u376;
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
        var _u379;
        if (isNaN(_u220)) {
          _u379 = k;
        } else {
          _u379 = _u220;
        }
        var _u221 = _u379;
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
    if (number63(k) && !(target === "js")) {
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
          var _u380;
          if (isNaN(_u231)) {
            _u380 = k;
          } else {
            _u380 = _u231;
          }
          var _u232 = _u380;
          var _u381;
          if (_u232 === "rest") {
            _u381 = ["sub", rh, length(lh)];
          } else {
            _u381 = ["get", rh, ["quote", bias(_u232)]];
          }
          var x = _u381;
          var _u382;
          if (v === true) {
            _u382 = _u232;
          } else {
            _u382 = v;
          }
          var _u236 = _u382;
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
        var _u383;
        if (isNaN(_u254)) {
          _u383 = k;
        } else {
          _u383 = _u254;
        }
        var _u255 = _u383;
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
            var _u996 = undefined;
            for (_u996 in _u270) {
              var _u268 = _u270[_u996];
              var _u271 = parseInt(_u996);
              var _u385;
              if (isNaN(_u271)) {
                _u385 = _u996;
              } else {
                _u385 = _u271;
              }
              var _u272 = _u385;
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
              var _u996 = undefined;
              for (_u996 in _u279) {
                var _u277 = _u279[_u996];
                var _u280 = parseInt(_u996);
                var _u384;
                if (isNaN(_u280)) {
                  _u384 = _u996;
                } else {
                  _u384 = _u280;
                }
                var _u281 = _u384;
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
      var _u386;
      if (isNaN(_u287)) {
        _u386 = k;
      } else {
        _u386 = _u287;
      }
      var _u288 = _u386;
      if (!number63(_u288)) {
        var _u387;
        if (quasisplice63(v, depth)) {
          _u387 = quasiexpand(v[1]);
        } else {
          _u387 = quasiexpand(v, depth);
        }
        var _u289 = _u387;
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
  var expand_if = function (_u299) {
    var a = _u299[0];
    var b = _u299[1];
    var c = sub(_u299, 2);
    if (is63(b)) {
      return([join(["%if", a, b], expand_if(c))]);
    } else {
      if (is63(a)) {
        return([a]);
      }
    }
  };
  nexus["lumen/lib"]["expand-if"] = expand_if;
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
      var _u388;
      if (c === "-") {
        _u388 = "_";
      } else {
        var _u389;
        if (valid_code63(n)) {
          _u389 = c;
        } else {
          var _u390;
          if (i === 0) {
            _u390 = "_" + n;
          } else {
            _u390 = n;
          }
          _u389 = _u390;
        }
        _u388 = _u389;
      }
      var c1 = _u388;
      id1 = id1 + c1;
      i = i + 1;
    }
    return(id1);
  };
  nexus["lumen/lib"].id = id;
  var key = function (k) {
    var i = inner(k);
    if (valid_id63(i)) {
      return(i);
    } else {
      if (target === "js") {
        return(k);
      } else {
        return("[" + k + "]");
      }
    }
  };
  nexus["lumen/lib"].key = key;
  var imported = function (spec) {
    var _u334 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u334.private;
    var m = unique();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _u335 = module(spec).export;
      var _u337 = undefined;
      for (_u337 in _u335) {
        var v = _u335[_u337];
        var _u336 = parseInt(_u337);
        var _u391;
        if (isNaN(_u336)) {
          _u391 = _u337;
        } else {
          _u391 = _u336;
        }
        var _u338 = _u391;
        if (v.variable && (private || v.export)) {
          add(imports, ["%local", _u338, ["get", m, ["quote", _u338]]]);
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
    var _u353 = unstash(Array.prototype.slice.call(arguments, 1));
    var xs = sub(_u353, 0);
    return(join(t, xs));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var _u354 = unstash(Array.prototype.slice.call(arguments, 1));
    var keys = sub(_u354, 0);
    var t1 = [];
    var _u355 = t;
    var k = undefined;
    for (k in _u355) {
      var v = _u355[k];
      var _u356 = parseInt(k);
      var _u392;
      if (isNaN(_u356)) {
        _u392 = k;
      } else {
        _u392 = _u356;
      }
      var _u357 = _u392;
      if (!keys[_u357]) {
        t1[_u357] = v;
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
    var _u361 = t;
    var k = undefined;
    for (k in _u361) {
      var v = _u361[k];
      var _u362 = parseInt(k);
      var _u393;
      if (isNaN(_u362)) {
        _u393 = k;
      } else {
        _u393 = _u362;
      }
      var _u363 = _u393;
      var x = f(v);
      if (is63(x)) {
        add(o, literal(_u363));
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
    var _u371 = ["table"];
    _u371.import = quoted(m.import);
    _u371.alias = quoted(m.alias);
    _u371.export = quote_frame(m.export);
    return(_u371);
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
  var _u394 = nexus["lumen/runtime"];
  var nil63 = _u394["nil?"];
  var is63 = _u394["is?"];
  var length = _u394.length;
  var none63 = _u394["none?"];
  var some63 = _u394["some?"];
  var one63 = _u394["one?"];
  var hd = _u394.hd;
  var string63 = _u394["string?"];
  var number63 = _u394["number?"];
  var boolean63 = _u394["boolean?"];
  var function63 = _u394["function?"];
  var composite63 = _u394["composite?"];
  var atom63 = _u394["atom?"];
  var table63 = _u394["table?"];
  var list63 = _u394["list?"];
  var hd61 = _u394["hd="];
  var substring = _u394.substring;
  var sub = _u394.sub;
  var keys = _u394.keys;
  var inner = _u394.inner;
  var tl = _u394.tl;
  var char = _u394.char;
  var code = _u394.code;
  var string_literal63 = _u394["string-literal?"];
  var id_literal63 = _u394["id-literal?"];
  var add = _u394.add;
  var drop = _u394.drop;
  var last = _u394.last;
  var butlast = _u394.butlast;
  var reverse = _u394.reverse;
  var join = _u394.join;
  var reduce = _u394.reduce;
  var keep = _u394.keep;
  var in63 = _u394["in?"];
  var find = _u394.find;
  var pair = _u394.pair;
  var sort = _u394.sort;
  var iterate = _u394.iterate;
  var replicate = _u394.replicate;
  var series = _u394.series;
  var map = _u394.map;
  var keys63 = _u394["keys?"];
  var empty63 = _u394["empty?"];
  var stash = _u394.stash;
  var unstash = _u394.unstash;
  var search = _u394.search;
  var split = _u394.split;
  var cat = _u394.cat;
  var _43 = _u394["+"];
  var _ = _u394["-"];
  var _42 = _u394["*"];
  var _47 = _u394["/"];
  var _37 = _u394["%"];
  var _62 = _u394[">"];
  var _60 = _u394["<"];
  var _61 = _u394["="];
  var _6261 = _u394[">="];
  var _6061 = _u394["<="];
  var read_file = _u394["read-file"];
  var write_file = _u394["write-file"];
  var write = _u394.write;
  var exit = _u394.exit;
  var today = _u394.today;
  var now = _u394.now;
  var number = _u394.number;
  var string = _u394.string;
  var space = _u394.space;
  var apply = _u394.apply;
  var unique = _u394.unique;
  var _37message_handler = _u394["%message-handler"];
  var toplevel63 = _u394["toplevel?"];
  var module_key = _u394["module-key"];
  var module = _u394.module;
  var setenv = _u394.setenv;
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {" ": true, "\t": true, "\n": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var stream = function (str) {
    return({pos: 0, string: str, len: length(str)});
  };
  nexus["lumen/reader"].stream = stream;
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
    var x = read(stream(str));
    if (!(x === eof)) {
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
  var _u443 = nexus["lumen/runtime"];
  var nil63 = _u443["nil?"];
  var is63 = _u443["is?"];
  var length = _u443.length;
  var none63 = _u443["none?"];
  var some63 = _u443["some?"];
  var one63 = _u443["one?"];
  var hd = _u443.hd;
  var string63 = _u443["string?"];
  var number63 = _u443["number?"];
  var boolean63 = _u443["boolean?"];
  var function63 = _u443["function?"];
  var composite63 = _u443["composite?"];
  var atom63 = _u443["atom?"];
  var table63 = _u443["table?"];
  var list63 = _u443["list?"];
  var hd61 = _u443["hd="];
  var substring = _u443.substring;
  var sub = _u443.sub;
  var keys = _u443.keys;
  var inner = _u443.inner;
  var tl = _u443.tl;
  var char = _u443.char;
  var code = _u443.code;
  var string_literal63 = _u443["string-literal?"];
  var id_literal63 = _u443["id-literal?"];
  var add = _u443.add;
  var drop = _u443.drop;
  var last = _u443.last;
  var butlast = _u443.butlast;
  var reverse = _u443.reverse;
  var join = _u443.join;
  var reduce = _u443.reduce;
  var keep = _u443.keep;
  var in63 = _u443["in?"];
  var find = _u443.find;
  var pair = _u443.pair;
  var sort = _u443.sort;
  var iterate = _u443.iterate;
  var replicate = _u443.replicate;
  var series = _u443.series;
  var map = _u443.map;
  var keys63 = _u443["keys?"];
  var empty63 = _u443["empty?"];
  var stash = _u443.stash;
  var unstash = _u443.unstash;
  var search = _u443.search;
  var split = _u443.split;
  var cat = _u443.cat;
  var _43 = _u443["+"];
  var _ = _u443["-"];
  var _42 = _u443["*"];
  var _47 = _u443["/"];
  var _37 = _u443["%"];
  var _62 = _u443[">"];
  var _60 = _u443["<"];
  var _61 = _u443["="];
  var _6261 = _u443[">="];
  var _6061 = _u443["<="];
  var read_file = _u443["read-file"];
  var write_file = _u443["write-file"];
  var write = _u443.write;
  var exit = _u443.exit;
  var today = _u443.today;
  var now = _u443.now;
  var number = _u443.number;
  var string = _u443.string;
  var space = _u443.space;
  var apply = _u443.apply;
  var unique = _u443.unique;
  var _37message_handler = _u443["%message-handler"];
  var toplevel63 = _u443["toplevel?"];
  var module_key = _u443["module-key"];
  var module = _u443.module;
  var setenv = _u443.setenv;
  var _u446 = nexus["lumen/lib"];
  var getenv = _u446.getenv;
  var macro_function = _u446["macro-function"];
  var macro63 = _u446["macro?"];
  var special63 = _u446["special?"];
  var special_form63 = _u446["special-form?"];
  var statement63 = _u446["statement?"];
  var symbol_expansion = _u446["symbol-expansion"];
  var symbol63 = _u446["symbol?"];
  var variable63 = _u446["variable?"];
  var bound63 = _u446["bound?"];
  var quoted = _u446.quoted;
  var stash42 = _u446["stash*"];
  var index = _u446.index;
  var bind = _u446.bind;
  var bind42 = _u446["bind*"];
  var quasiexpand = _u446.quasiexpand;
  var macroexpand = _u446.macroexpand;
  var expand_if = _u446["expand-if"];
  var indentation = _u446.indentation;
  var reserved63 = _u446["reserved?"];
  var valid_id63 = _u446["valid-id?"];
  var id = _u446.id;
  var key = _u446.key;
  var imported = _u446.imported;
  var link = _u446.link;
  var mapo = _u446.mapo;
  var quote_environment = _u446["quote-environment"];
  var quote_modules = _u446["quote-modules"];
  var initial_environment = _u446["initial-environment"];
  var _u447 = nexus["lumen/reader"];
  var stream = _u447.stream;
  var read_table = _u447["read-table"];
  var read = _u447.read;
  var read_all = _u447["read-all"];
  var read_from_string = _u447["read-from-string"];
  var _u450 = [];
  var _u451 = [];
  _u451.js = "!";
  _u451.lua = "not ";
  _u450["not"] = _u451;
  var _u453 = [];
  _u453["*"] = true;
  _u453["/"] = true;
  _u453["%"] = true;
  var _u455 = [];
  _u455["+"] = true;
  _u455["-"] = true;
  var _u457 = [];
  var _u458 = [];
  _u458.js = "+";
  _u458.lua = "..";
  _u457.cat = _u458;
  var _u460 = [];
  _u460["<"] = true;
  _u460[">"] = true;
  _u460["<="] = true;
  _u460[">="] = true;
  var _u462 = [];
  var _u463 = [];
  _u463.js = "===";
  _u463.lua = "==";
  _u462["="] = _u463;
  var _u465 = [];
  var _u466 = [];
  _u466.js = "&&";
  _u466.lua = "and";
  _u465["and"] = _u466;
  var _u468 = [];
  var _u469 = [];
  _u469.js = "||";
  _u469.lua = "or";
  _u468["or"] = _u469;
  var infix = [_u450, _u453, _u455, _u457, _u460, _u462, _u465, _u468];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    return(length(form) === 2 && in63(hd(form), ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _u473 = infix;
      var k = undefined;
      for (k in _u473) {
        var v = _u473[k];
        var _u474 = parseInt(k);
        var _u585;
        if (isNaN(_u474)) {
          _u585 = k;
        } else {
          _u585 = _u474;
        }
        var _u475 = _u585;
        if (v[hd(form)]) {
          return(index(_u475));
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
    var _u484 = getenv(x);
    var special = _u484.special;
    var stmt = _u484.stmt;
    var self_tr63 = _u484.tr;
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
    var _u487 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _u487.right;
    var _u586;
    if (right) {
      _u586 = _6261;
    } else {
      _u586 = _62;
    }
    if (_u586(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _u491 = sub(form, 1);
    var a = _u491[0];
    var b = _u491[1];
    var _u492 = op_delims(form, a);
    var ao = _u492[0];
    var ac = _u492[1];
    var _u493 = op_delims(form, b, {_stash: true, right: true});
    var bo = _u493[0];
    var bc = _u493[1];
    var _u494 = compile(a);
    var _u495 = compile(b);
    var _u496 = getop(op);
    if (unary63(form)) {
      return(_u496 + ao + _u494 + ac);
    } else {
      return(ao + _u494 + ac + " " + _u496 + " " + bo + _u495 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _u497 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _u497.name;
    var prefix = _u497.prefix;
    var _u587;
    if (name) {
      _u587 = compile(name);
    } else {
      _u587 = "";
    }
    var id = _u587;
    var _u498 = prefix || "";
    var _u499 = compile_args(args);
    indent_level = indent_level + 1;
    var _u501 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u500 = _u501;
    var ind = indentation();
    var _u588;
    if (target === "js") {
      _u588 = "";
    } else {
      _u588 = "end";
    }
    var tr = _u588;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _u499 + " {\n" + _u500 + ind + "}" + tr);
    } else {
      return(_u498 + "function " + id + _u499 + "\n" + _u500 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _u503 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _u503.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _u589;
        if (stmt) {
          _u589 = indentation();
        } else {
          _u589 = "";
        }
        var ind = _u589;
        var _u590;
        if (atom63(form)) {
          _u590 = compile_atom(form);
        } else {
          var _u591;
          if (infix63(hd(form))) {
            _u591 = compile_infix(form);
          } else {
            _u591 = compile_call(form);
          }
          _u590 = _u591;
        }
        var _u504 = _u590;
        return(ind + _u504 + tr);
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
    var _u515 = args[1];
    var _u516 = args[2];
    if (stmt63 || tail63) {
      var _u593;
      if (_u516) {
        _u593 = [lower_body([_u516], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u515], tail63)], _u593)));
    } else {
      var e = unique();
      add(hoist, ["%local", e]);
      var _u592;
      if (_u516) {
        _u592 = [lower(["set", e, _u516])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u515])], _u592));
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
      var _u594;
      if (x === "and") {
        _u594 = ["%if", id, b, id];
      } else {
        _u594 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _u594], hoist));
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
    var _u541 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _u541, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _u544 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_u544)) {
      return(_u544);
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
    var s = stream(read_file(path));
    var first = read(s);
    if (!hd61(first, "define-module")) {
      current_module = "user";
      in_module("user");
    }
    var body = join([first], read_all(s));
    var form = encapsulate(body);
    var code = compile(form) + ";\n";
    var _u565 = current_module;
    current_module = mod0;
    environment = env0;
    conclude(code);
    return(_u565);
  };
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  var open_module = function (spec) {
    var _u566 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u566.private;
    var m = module(spec);
    var frame = last(environment);
    var _u567 = m.export;
    var k = undefined;
    for (k in _u567) {
      var v = _u567[k];
      var _u568 = parseInt(k);
      var _u595;
      if (isNaN(_u568)) {
        _u595 = k;
      } else {
        _u595 = _u568;
      }
      var _u569 = _u595;
      if (v.export || private) {
        frame[_u569] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _u570 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u570.private;
    if (!module(spec)) {
      spec = _37compile_module(spec);
    }
    open_module(spec, {_stash: true, private: private});
    return(spec);
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  in_module = function (spec) {
    var _u572 = load_module(spec, {_stash: true, private: true});
    var m = module(_u572);
    series(open_module, m.import);
    current_module = _u572;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    series(function (spec) {
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _u575 = import_modules(m.alias);
        var aliased = _u575[0];
        var bs = _u575[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _u576 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _u576);
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
  var _u596 = nexus["lumen/runtime"];
  var nil63 = _u596["nil?"];
  var is63 = _u596["is?"];
  var length = _u596.length;
  var none63 = _u596["none?"];
  var some63 = _u596["some?"];
  var one63 = _u596["one?"];
  var hd = _u596.hd;
  var string63 = _u596["string?"];
  var number63 = _u596["number?"];
  var boolean63 = _u596["boolean?"];
  var function63 = _u596["function?"];
  var composite63 = _u596["composite?"];
  var atom63 = _u596["atom?"];
  var table63 = _u596["table?"];
  var list63 = _u596["list?"];
  var hd61 = _u596["hd="];
  var substring = _u596.substring;
  var sub = _u596.sub;
  var keys = _u596.keys;
  var inner = _u596.inner;
  var tl = _u596.tl;
  var char = _u596.char;
  var code = _u596.code;
  var string_literal63 = _u596["string-literal?"];
  var id_literal63 = _u596["id-literal?"];
  var add = _u596.add;
  var drop = _u596.drop;
  var last = _u596.last;
  var butlast = _u596.butlast;
  var reverse = _u596.reverse;
  var join = _u596.join;
  var reduce = _u596.reduce;
  var keep = _u596.keep;
  var in63 = _u596["in?"];
  var find = _u596.find;
  var pair = _u596.pair;
  var sort = _u596.sort;
  var iterate = _u596.iterate;
  var replicate = _u596.replicate;
  var series = _u596.series;
  var map = _u596.map;
  var keys63 = _u596["keys?"];
  var empty63 = _u596["empty?"];
  var stash = _u596.stash;
  var unstash = _u596.unstash;
  var search = _u596.search;
  var split = _u596.split;
  var cat = _u596.cat;
  var _43 = _u596["+"];
  var _ = _u596["-"];
  var _42 = _u596["*"];
  var _47 = _u596["/"];
  var _37 = _u596["%"];
  var _62 = _u596[">"];
  var _60 = _u596["<"];
  var _61 = _u596["="];
  var _6261 = _u596[">="];
  var _6061 = _u596["<="];
  var read_file = _u596["read-file"];
  var write_file = _u596["write-file"];
  var write = _u596.write;
  var exit = _u596.exit;
  var today = _u596.today;
  var now = _u596.now;
  var number = _u596.number;
  var string = _u596.string;
  var space = _u596.space;
  var apply = _u596.apply;
  var unique = _u596.unique;
  var _37message_handler = _u596["%message-handler"];
  var toplevel63 = _u596["toplevel?"];
  var module_key = _u596["module-key"];
  var module = _u596.module;
  var setenv = _u596.setenv;
  var _u599 = nexus["lumen/lib"];
  var getenv = _u599.getenv;
  var macro_function = _u599["macro-function"];
  var macro63 = _u599["macro?"];
  var special63 = _u599["special?"];
  var special_form63 = _u599["special-form?"];
  var statement63 = _u599["statement?"];
  var symbol_expansion = _u599["symbol-expansion"];
  var symbol63 = _u599["symbol?"];
  var variable63 = _u599["variable?"];
  var bound63 = _u599["bound?"];
  var quoted = _u599.quoted;
  var stash42 = _u599["stash*"];
  var index = _u599.index;
  var bind = _u599.bind;
  var bind42 = _u599["bind*"];
  var quasiexpand = _u599.quasiexpand;
  var macroexpand = _u599.macroexpand;
  var expand_if = _u599["expand-if"];
  var indentation = _u599.indentation;
  var reserved63 = _u599["reserved?"];
  var valid_id63 = _u599["valid-id?"];
  var id = _u599.id;
  var key = _u599.key;
  var imported = _u599.imported;
  var link = _u599.link;
  var mapo = _u599.mapo;
  var quote_environment = _u599["quote-environment"];
  var quote_modules = _u599["quote-modules"];
  var initial_environment = _u599["initial-environment"];
  var _u600 = nexus["lumen/compiler"];
  var compile_function = _u600["compile-function"];
  var compile = _u600.compile;
  var open_module = _u600["open-module"];
  var load_module = _u600["load-module"];
  var in_module = _u600["in-module"];
  var import_modules = _u600["import-modules"];
  var compile_module = _u600["compile-module"];
  var declare = _u600.declare;
  var eval = _u600.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _u998 = nexus["lumen/runtime"];
  var nil63 = _u998["nil?"];
  var is63 = _u998["is?"];
  var length = _u998.length;
  var none63 = _u998["none?"];
  var some63 = _u998["some?"];
  var one63 = _u998["one?"];
  var hd = _u998.hd;
  var string63 = _u998["string?"];
  var number63 = _u998["number?"];
  var boolean63 = _u998["boolean?"];
  var function63 = _u998["function?"];
  var composite63 = _u998["composite?"];
  var atom63 = _u998["atom?"];
  var table63 = _u998["table?"];
  var list63 = _u998["list?"];
  var hd61 = _u998["hd="];
  var substring = _u998.substring;
  var sub = _u998.sub;
  var keys = _u998.keys;
  var inner = _u998.inner;
  var tl = _u998.tl;
  var char = _u998.char;
  var code = _u998.code;
  var string_literal63 = _u998["string-literal?"];
  var id_literal63 = _u998["id-literal?"];
  var add = _u998.add;
  var drop = _u998.drop;
  var last = _u998.last;
  var butlast = _u998.butlast;
  var reverse = _u998.reverse;
  var join = _u998.join;
  var reduce = _u998.reduce;
  var keep = _u998.keep;
  var in63 = _u998["in?"];
  var find = _u998.find;
  var pair = _u998.pair;
  var sort = _u998.sort;
  var iterate = _u998.iterate;
  var replicate = _u998.replicate;
  var series = _u998.series;
  var map = _u998.map;
  var keys63 = _u998["keys?"];
  var empty63 = _u998["empty?"];
  var stash = _u998.stash;
  var unstash = _u998.unstash;
  var search = _u998.search;
  var split = _u998.split;
  var cat = _u998.cat;
  var _43 = _u998["+"];
  var _ = _u998["-"];
  var _42 = _u998["*"];
  var _47 = _u998["/"];
  var _37 = _u998["%"];
  var _62 = _u998[">"];
  var _60 = _u998["<"];
  var _61 = _u998["="];
  var _6261 = _u998[">="];
  var _6061 = _u998["<="];
  var read_file = _u998["read-file"];
  var write_file = _u998["write-file"];
  var write = _u998.write;
  var exit = _u998.exit;
  var today = _u998.today;
  var now = _u998.now;
  var number = _u998.number;
  var string = _u998.string;
  var space = _u998.space;
  var apply = _u998.apply;
  var unique = _u998.unique;
  var _37message_handler = _u998["%message-handler"];
  var toplevel63 = _u998["toplevel?"];
  var module_key = _u998["module-key"];
  var module = _u998.module;
  var setenv = _u998.setenv;
  var _u1001 = nexus["lumen/lib"];
  var getenv = _u1001.getenv;
  var macro_function = _u1001["macro-function"];
  var macro63 = _u1001["macro?"];
  var special63 = _u1001["special?"];
  var special_form63 = _u1001["special-form?"];
  var statement63 = _u1001["statement?"];
  var symbol_expansion = _u1001["symbol-expansion"];
  var symbol63 = _u1001["symbol?"];
  var variable63 = _u1001["variable?"];
  var bound63 = _u1001["bound?"];
  var quoted = _u1001.quoted;
  var stash42 = _u1001["stash*"];
  var index = _u1001.index;
  var bind = _u1001.bind;
  var bind42 = _u1001["bind*"];
  var quasiexpand = _u1001.quasiexpand;
  var macroexpand = _u1001.macroexpand;
  var expand_if = _u1001["expand-if"];
  var indentation = _u1001.indentation;
  var reserved63 = _u1001["reserved?"];
  var valid_id63 = _u1001["valid-id?"];
  var id = _u1001.id;
  var key = _u1001.key;
  var imported = _u1001.imported;
  var link = _u1001.link;
  var mapo = _u1001.mapo;
  var quote_environment = _u1001["quote-environment"];
  var quote_modules = _u1001["quote-modules"];
  var initial_environment = _u1001["initial-environment"];
  var _u1002 = nexus["lumen/compiler"];
  var compile_function = _u1002["compile-function"];
  var compile = _u1002.compile;
  var open_module = _u1002["open-module"];
  var load_module = _u1002["load-module"];
  var in_module = _u1002["in-module"];
  var import_modules = _u1002["import-modules"];
  var compile_module = _u1002["compile-module"];
  var declare = _u1002.declare;
  var eval = _u1002.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _u1849 = nexus["lumen/runtime"];
  var nil63 = _u1849["nil?"];
  var is63 = _u1849["is?"];
  var length = _u1849.length;
  var none63 = _u1849["none?"];
  var some63 = _u1849["some?"];
  var one63 = _u1849["one?"];
  var hd = _u1849.hd;
  var string63 = _u1849["string?"];
  var number63 = _u1849["number?"];
  var boolean63 = _u1849["boolean?"];
  var function63 = _u1849["function?"];
  var composite63 = _u1849["composite?"];
  var atom63 = _u1849["atom?"];
  var table63 = _u1849["table?"];
  var list63 = _u1849["list?"];
  var hd61 = _u1849["hd="];
  var substring = _u1849.substring;
  var sub = _u1849.sub;
  var keys = _u1849.keys;
  var inner = _u1849.inner;
  var tl = _u1849.tl;
  var char = _u1849.char;
  var code = _u1849.code;
  var string_literal63 = _u1849["string-literal?"];
  var id_literal63 = _u1849["id-literal?"];
  var add = _u1849.add;
  var drop = _u1849.drop;
  var last = _u1849.last;
  var butlast = _u1849.butlast;
  var reverse = _u1849.reverse;
  var join = _u1849.join;
  var reduce = _u1849.reduce;
  var keep = _u1849.keep;
  var in63 = _u1849["in?"];
  var find = _u1849.find;
  var pair = _u1849.pair;
  var sort = _u1849.sort;
  var iterate = _u1849.iterate;
  var replicate = _u1849.replicate;
  var series = _u1849.series;
  var map = _u1849.map;
  var keys63 = _u1849["keys?"];
  var empty63 = _u1849["empty?"];
  var stash = _u1849.stash;
  var unstash = _u1849.unstash;
  var search = _u1849.search;
  var split = _u1849.split;
  var cat = _u1849.cat;
  var _43 = _u1849["+"];
  var _ = _u1849["-"];
  var _42 = _u1849["*"];
  var _47 = _u1849["/"];
  var _37 = _u1849["%"];
  var _62 = _u1849[">"];
  var _60 = _u1849["<"];
  var _61 = _u1849["="];
  var _6261 = _u1849[">="];
  var _6061 = _u1849["<="];
  var read_file = _u1849["read-file"];
  var write_file = _u1849["write-file"];
  var write = _u1849.write;
  var exit = _u1849.exit;
  var today = _u1849.today;
  var now = _u1849.now;
  var number = _u1849.number;
  var string = _u1849.string;
  var space = _u1849.space;
  var apply = _u1849.apply;
  var unique = _u1849.unique;
  var _37message_handler = _u1849["%message-handler"];
  var toplevel63 = _u1849["toplevel?"];
  var module_key = _u1849["module-key"];
  var module = _u1849.module;
  var setenv = _u1849.setenv;
  var _u1852 = nexus["lumen/lib"];
  var getenv = _u1852.getenv;
  var macro_function = _u1852["macro-function"];
  var macro63 = _u1852["macro?"];
  var special63 = _u1852["special?"];
  var special_form63 = _u1852["special-form?"];
  var statement63 = _u1852["statement?"];
  var symbol_expansion = _u1852["symbol-expansion"];
  var symbol63 = _u1852["symbol?"];
  var variable63 = _u1852["variable?"];
  var bound63 = _u1852["bound?"];
  var quoted = _u1852.quoted;
  var stash42 = _u1852["stash*"];
  var index = _u1852.index;
  var bind = _u1852.bind;
  var bind42 = _u1852["bind*"];
  var quasiexpand = _u1852.quasiexpand;
  var macroexpand = _u1852.macroexpand;
  var expand_if = _u1852["expand-if"];
  var indentation = _u1852.indentation;
  var reserved63 = _u1852["reserved?"];
  var valid_id63 = _u1852["valid-id?"];
  var id = _u1852.id;
  var key = _u1852.key;
  var imported = _u1852.imported;
  var link = _u1852.link;
  var mapo = _u1852.mapo;
  var quote_environment = _u1852["quote-environment"];
  var quote_modules = _u1852["quote-modules"];
  var initial_environment = _u1852["initial-environment"];
  var _u1853 = nexus["lumen/compiler"];
  var compile_function = _u1853["compile-function"];
  var compile = _u1853.compile;
  var open_module = _u1853["open-module"];
  var load_module = _u1853["load-module"];
  var in_module = _u1853["in-module"];
  var import_modules = _u1853["import-modules"];
  var compile_module = _u1853["compile-module"];
  var declare = _u1853.declare;
  var eval = _u1853.eval;
  global.modules = {"lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {stream: {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_u1886) {
    var char = _u1886[0];
    var s = _u1886[1];
    var _u1885 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1885, 0);
    return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, "hd=": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, butlast: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, unique: {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {foo: true, export: true, stmt: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "";
    series(function (x) {
      s = s + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(s);
  }}, "%if": {foo: true, export: true, stmt: true, tr: true, special: function (cond, cons, alt) {
    var _u1902 = compile(cond);
    indent_level = indent_level + 1;
    var _u1904 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u1903 = _u1904;
    var _u2147;
    if (alt) {
      indent_level = indent_level + 1;
      var _u1906 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _u2147 = _u1906;
    }
    var _u1905 = _u2147;
    var ind = indentation();
    var s = "";
    if (target === "js") {
      s = s + ind + "if (" + _u1902 + ") {\n" + _u1903 + ind + "}";
    } else {
      s = s + ind + "if " + _u1902 + " then\n" + _u1903;
    }
    if (_u1905 && target === "js") {
      s = s + " else {\n" + _u1905 + ind + "}";
    } else {
      if (_u1905) {
        s = s + ind + "else\n" + _u1905;
      }
    }
    if (target === "lua") {
      return(s + ind + "end\n");
    } else {
      return(s + "\n");
    }
  }}, "while": {foo: true, export: true, stmt: true, tr: true, special: function (cond, form) {
    var _u1908 = compile(cond);
    indent_level = indent_level + 1;
    var _u1909 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1909;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _u1908 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _u1908 + " do\n" + body + ind + "end\n");
    }
  }}, "%for": {foo: true, export: true, stmt: true, tr: true, special: function (t, k, form) {
    var _u1911 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u1912 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1912;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _u1911 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _u1911 + ") {\n" + body + ind + "}\n");
    }
  }}, "%try": {foo: true, export: true, stmt: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u1914 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u1914;
    var e = unique();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _u1918 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _u1918;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }}, "break": {export: true, stmt: true, foo: true, special: function () {
    return(indentation() + "break");
  }}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true, export: true}, "%global-function": {foo: true, export: true, stmt: true, tr: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }}, "%local-function": {foo: true, export: true, stmt: true, tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }}, "return": {export: true, stmt: true, foo: true, special: function (x) {
    var _u2148;
    if (nil63(x)) {
      _u2148 = "return";
    } else {
      _u2148 = "return(" + compile(x) + ")";
    }
    var _u1926 = _u2148;
    return(indentation() + _u1926);
  }}, error: {export: true, stmt: true, foo: true, special: function (x) {
    var _u2149;
    if (target === "js") {
      _u2149 = "throw new " + compile(["Error", x]);
    } else {
      _u2149 = "error(" + compile(x) + ")";
    }
    var e = _u2149;
    return(indentation() + e);
  }}, "%local": {export: true, stmt: true, foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _u2150;
    if (is63(value)) {
      _u2150 = " = " + value1;
    } else {
      _u2150 = "";
    }
    var rh = _u2150;
    var _u2151;
    if (target === "js") {
      _u2151 = "var ";
    } else {
      _u2151 = "local ";
    }
    var keyword = _u2151;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }}, set: {export: true, stmt: true, foo: true, special: function (lh, rh) {
    var _u1931 = compile(lh);
    var _u2152;
    if (nil63(rh)) {
      _u2152 = "nil";
    } else {
      _u2152 = rh;
    }
    var _u1932 = compile(_u2152);
    return(indentation() + _u1931 + " = " + _u1932);
  }}, get: {special: function (t, k) {
    var _u1934 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_u1934, 0) === "{") {
      _u1934 = "(" + _u1934 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_u1934 + "." + inner(k));
    } else {
      return(_u1934 + "[" + k1 + "]");
    }
  }, foo: true, export: true}, "not": {}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _u2153;
    if (target === "lua") {
      _u2153 = "{";
    } else {
      _u2153 = "[";
    }
    var open = _u2153;
    var _u2154;
    if (target === "lua") {
      _u2154 = "}";
    } else {
      _u2154 = "]";
    }
    var close = _u2154;
    var s = "";
    var c = "";
    var _u1935 = forms;
    var k = undefined;
    for (k in _u1935) {
      var v = _u1935[k];
      var _u1936 = parseInt(k);
      var _u2155;
      if (isNaN(_u1936)) {
        _u2155 = k;
      } else {
        _u2155 = _u1936;
      }
      var _u1937 = _u2155;
      if (number63(_u1937)) {
        s = s + c + compile(v);
        c = ", ";
      }
    }
    return(open + s + close);
  }, foo: true, export: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "{";
    var c = "";
    var _u2156;
    if (target === "lua") {
      _u2156 = " = ";
    } else {
      _u2156 = ": ";
    }
    var sep = _u2156;
    var _u1938 = pair(forms);
    var k = undefined;
    for (k in _u1938) {
      var v = _u1938[k];
      var _u1939 = parseInt(k);
      var _u2157;
      if (isNaN(_u1939)) {
        _u2157 = k;
      } else {
        _u2157 = _u1939;
      }
      var _u1940 = _u2157;
      if (number63(_u1940)) {
        var _u1941 = v[0];
        var _u1942 = v[1];
        if (!string63(_u1941)) {
          throw new Error("Illegal key: " + string(_u1941));
        }
        s = s + c + key(_u1941) + sep + compile(_u1942);
        c = ", ";
      }
    }
    return(s + "}");
  }, foo: true, export: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, context: {variable: true}, "%result": {global: true, export: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, "expand-if": {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = unique();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {macro: function (form) {
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
    var id = unique();
    var _u1991 = body;
    var k = undefined;
    for (k in _u1991) {
      var v = _u1991[k];
      var _u1992 = parseInt(k);
      var _u2158;
      if (isNaN(_u1992)) {
        _u2158 = k;
      } else {
        _u2158 = _u1992;
      }
      var _u1993 = _u2158;
      if (number63(_u1993)) {
        l[_u1993] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _u1993]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    return(hd(expand_if(branches)));
  }, export: true}, when: {macro: function (cond) {
    var _u2002 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2002, 0);
    return(["if", cond, join(["do"], body)]);
  }, export: true}, unless: {macro: function (cond) {
    var _u2005 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2005, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var _u2011 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2011, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _u2013 = bind(lh, rh);
      var k = undefined;
      for (k in _u2013) {
        var _u2015 = _u2013[k];
        var id = _u2015[0];
        var val = _u2015[1];
        var _u2014 = parseInt(k);
        var _u2159;
        if (isNaN(_u2014)) {
          _u2159 = k;
        } else {
          _u2159 = _u2014;
        }
        var _u2016 = _u2159;
        if (number63(_u2016)) {
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
  }, export: true}, "define-module": {macro: function (spec) {
    var _u2022 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2022, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u2023 = import_modules(imp);
    var imports = _u2023[0];
    var bindings = _u2023[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u2024 = exp || [];
    var _u995 = undefined;
    for (_u995 in _u2024) {
      var x = _u2024[_u995];
      var _u2025 = parseInt(_u995);
      var _u2160;
      if (isNaN(_u2025)) {
        _u2160 = _u995;
      } else {
        _u2160 = _u2025;
      }
      var _u2026 = _u2160;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var _u2032 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2032, 0);
    var form = join(["fn", args], body);
    var _u2034 = ["setenv", ["quote", name]];
    _u2034.macro = form;
    _u2034.form = ["quote", form];
    eval(_u2034);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var _u2037 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2037, 0);
    var form = join(["fn", args], body);
    var _u2039 = ["setenv", ["quote", name]];
    _u2039.special = form;
    _u2039.form = ["quote", form];
    eval(join(_u2039, keys(body)));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define-global": {macro: function (name, x) {
    var _u2043 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2043, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _u2044 = bind42(x, body);
      var args = _u2044[0];
      var _u2045 = _u2044[1];
      return(join(["%global-function", name, args], _u2045));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var _u2051 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2051, 0);
    if (!toplevel63()) {
      print(string("local") + " " + string(name));
    }
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _u2054 = bind42(x, body);
        var args = _u2054[0];
        var _u2055 = _u2054[1];
        return(link(name, join(["%local-function", name, args], _u2055)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, redefine: {macro: function (name, x) {
    var _u2058 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2058, 0);
    if (some63(body)) {
      x = join(["fn", x], body);
    }
    return(link(name, ["set", name, x]));
  }, export: true}, "with-bindings": {macro: function (_u2062) {
    var names = _u2062[0];
    var _u2061 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2061, 0);
    var x = unique();
    var _u2066 = ["setenv", x];
    _u2066.variable = true;
    var _u2063 = ["with-frame", ["all", ["_u996", x], names, _u2066]];
    _u2063.scope = true;
    return(join(_u2063, body));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var _u2067 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2067, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _u2068 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2068);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var _u2072 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2072, 0);
    add(environment, {});
    map(function (_u2075) {
      var name = _u2075[0];
      var exp = _u2075[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _u2073 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2073);
  }, export: true}, fn: {macro: function (args) {
    var _u2078 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2078, 0);
    var _u2079 = bind42(args, body);
    var _u2080 = _u2079[0];
    var _u2081 = _u2079[1];
    return(join(["%function", _u2080], _u2081));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = unique();
      var x = unique();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, all: {macro: function (_u2094, t) {
    var k = _u2094[0];
    var v = _u2094[1];
    var _u2093 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2093, 0);
    var x = unique();
    var n = unique();
    var _u2161;
    if (target === "lua") {
      _u2161 = body;
    } else {
      _u2161 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u2161)]]);
  }, export: true}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _u2107 = xs;
    var _u997 = undefined;
    for (_u997 in _u2107) {
      var x = _u2107[_u997];
      var _u2108 = parseInt(_u997);
      var _u2162;
      if (isNaN(_u2108)) {
        _u2162 = _u997;
      } else {
        _u2162 = _u2108;
      }
      var _u2109 = _u2162;
      l[x] = true;
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, global: true, export: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var _u2115 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2115, 0);
    return(["set", a, join(["join*", a], bs)]);
  }, export: true}, "cat!": {macro: function (a) {
    var _u2118 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2118, 0);
    return(["set", a, join(["cat", a], bs)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "with-frame": {macro: function () {
    var _u2128 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_u2128, 0);
    var scope = _u2128.scope;
    var x = unique();
    var _u2131 = ["table"];
    _u2131._scope = scope;
    return(["do", ["add", "environment", _u2131], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var _u2137 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2137, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u2138 = import_modules(imp);
    var imports = _u2138[0];
    var bindings = _u2138[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u2139 = exp || [];
    var _u995 = undefined;
    for (_u995 in _u2139) {
      var x = _u2139[_u995];
      var _u2140 = parseInt(_u995);
      var _u2163;
      if (isNaN(_u2140)) {
        _u2163 = _u995;
      } else {
        _u2163 = _u2140;
      }
      var _u2141 = _u2163;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _u2164 = nexus["lumen/runtime"];
  var nil63 = _u2164["nil?"];
  var is63 = _u2164["is?"];
  var length = _u2164.length;
  var none63 = _u2164["none?"];
  var some63 = _u2164["some?"];
  var one63 = _u2164["one?"];
  var hd = _u2164.hd;
  var string63 = _u2164["string?"];
  var number63 = _u2164["number?"];
  var boolean63 = _u2164["boolean?"];
  var function63 = _u2164["function?"];
  var composite63 = _u2164["composite?"];
  var atom63 = _u2164["atom?"];
  var table63 = _u2164["table?"];
  var list63 = _u2164["list?"];
  var hd61 = _u2164["hd="];
  var substring = _u2164.substring;
  var sub = _u2164.sub;
  var keys = _u2164.keys;
  var inner = _u2164.inner;
  var tl = _u2164.tl;
  var char = _u2164.char;
  var code = _u2164.code;
  var string_literal63 = _u2164["string-literal?"];
  var id_literal63 = _u2164["id-literal?"];
  var add = _u2164.add;
  var drop = _u2164.drop;
  var last = _u2164.last;
  var butlast = _u2164.butlast;
  var reverse = _u2164.reverse;
  var join = _u2164.join;
  var reduce = _u2164.reduce;
  var keep = _u2164.keep;
  var in63 = _u2164["in?"];
  var find = _u2164.find;
  var pair = _u2164.pair;
  var sort = _u2164.sort;
  var iterate = _u2164.iterate;
  var replicate = _u2164.replicate;
  var series = _u2164.series;
  var map = _u2164.map;
  var keys63 = _u2164["keys?"];
  var empty63 = _u2164["empty?"];
  var stash = _u2164.stash;
  var unstash = _u2164.unstash;
  var search = _u2164.search;
  var split = _u2164.split;
  var cat = _u2164.cat;
  var _43 = _u2164["+"];
  var _ = _u2164["-"];
  var _42 = _u2164["*"];
  var _47 = _u2164["/"];
  var _37 = _u2164["%"];
  var _62 = _u2164[">"];
  var _60 = _u2164["<"];
  var _61 = _u2164["="];
  var _6261 = _u2164[">="];
  var _6061 = _u2164["<="];
  var read_file = _u2164["read-file"];
  var write_file = _u2164["write-file"];
  var write = _u2164.write;
  var exit = _u2164.exit;
  var today = _u2164.today;
  var now = _u2164.now;
  var number = _u2164.number;
  var string = _u2164.string;
  var space = _u2164.space;
  var apply = _u2164.apply;
  var unique = _u2164.unique;
  var _37message_handler = _u2164["%message-handler"];
  var toplevel63 = _u2164["toplevel?"];
  var module_key = _u2164["module-key"];
  var module = _u2164.module;
  var setenv = _u2164.setenv;
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
  var stream = _u5.stream;
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
    var _u2168 = (function () {
      try {
        return([true, eval(read_from_string(s))]);
      }
      catch (_u2175) {
        return([false, _u2175.message]);
      }
    })();
    var _u1 = _u2168[0];
    var x = _u2168[1];
    if (is63(x)) {
      return(print(string(x)));
    }
  };
  nexus["lumen/main"].rep = rep;
  var repl = function () {
    write("> ");
    var rep1 = function (s) {
      rep(s);
      return(write("> "));
    };
    process.stdin.setEncoding("utf8");
    return(process.stdin.on("data", rep1));
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
        if (nil63(spec) && !("-" === char(arg, 0))) {
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
