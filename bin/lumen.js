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
          if (_u232 === "rest") {
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
            var _u993 = undefined;
            for (_u993 in _u270) {
              var _u268 = _u270[_u993];
              var _u271 = parseInt(_u993);
              var _u381;
              if (isNaN(_u271)) {
                _u381 = _u993;
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
              var _u993 = undefined;
              for (_u993 in _u279) {
                var _u277 = _u279[_u993];
                var _u280 = parseInt(_u993);
                var _u380;
                if (isNaN(_u280)) {
                  _u380 = _u993;
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
    _u367.import = quoted(m.import);
    _u367.alias = quoted(m.alias);
    _u367.export = quote_frame(m.export);
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
  var nil63 = _u390["nil?"];
  var is63 = _u390["is?"];
  var length = _u390.length;
  var none63 = _u390["none?"];
  var some63 = _u390["some?"];
  var one63 = _u390["one?"];
  var hd = _u390.hd;
  var string63 = _u390["string?"];
  var number63 = _u390["number?"];
  var boolean63 = _u390["boolean?"];
  var function63 = _u390["function?"];
  var composite63 = _u390["composite?"];
  var atom63 = _u390["atom?"];
  var table63 = _u390["table?"];
  var list63 = _u390["list?"];
  var hd61 = _u390["hd="];
  var substring = _u390.substring;
  var sub = _u390.sub;
  var keys = _u390.keys;
  var inner = _u390.inner;
  var tl = _u390.tl;
  var char = _u390.char;
  var code = _u390.code;
  var string_literal63 = _u390["string-literal?"];
  var id_literal63 = _u390["id-literal?"];
  var add = _u390.add;
  var drop = _u390.drop;
  var last = _u390.last;
  var butlast = _u390.butlast;
  var reverse = _u390.reverse;
  var join = _u390.join;
  var reduce = _u390.reduce;
  var keep = _u390.keep;
  var in63 = _u390["in?"];
  var find = _u390.find;
  var pair = _u390.pair;
  var sort = _u390.sort;
  var iterate = _u390.iterate;
  var replicate = _u390.replicate;
  var series = _u390.series;
  var map = _u390.map;
  var keys63 = _u390["keys?"];
  var empty63 = _u390["empty?"];
  var stash = _u390.stash;
  var unstash = _u390.unstash;
  var search = _u390.search;
  var split = _u390.split;
  var cat = _u390.cat;
  var _43 = _u390["+"];
  var _ = _u390["-"];
  var _42 = _u390["*"];
  var _47 = _u390["/"];
  var _37 = _u390["%"];
  var _62 = _u390[">"];
  var _60 = _u390["<"];
  var _61 = _u390["="];
  var _6261 = _u390[">="];
  var _6061 = _u390["<="];
  var read_file = _u390["read-file"];
  var write_file = _u390["write-file"];
  var write = _u390.write;
  var exit = _u390.exit;
  var today = _u390.today;
  var now = _u390.now;
  var number = _u390.number;
  var string = _u390.string;
  var space = _u390.space;
  var apply = _u390.apply;
  var unique = _u390.unique;
  var _37message_handler = _u390["%message-handler"];
  var toplevel63 = _u390["toplevel?"];
  var module_key = _u390["module-key"];
  var module = _u390.module;
  var setenv = _u390.setenv;
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
  var _u439 = nexus["lumen/runtime"];
  var nil63 = _u439["nil?"];
  var is63 = _u439["is?"];
  var length = _u439.length;
  var none63 = _u439["none?"];
  var some63 = _u439["some?"];
  var one63 = _u439["one?"];
  var hd = _u439.hd;
  var string63 = _u439["string?"];
  var number63 = _u439["number?"];
  var boolean63 = _u439["boolean?"];
  var function63 = _u439["function?"];
  var composite63 = _u439["composite?"];
  var atom63 = _u439["atom?"];
  var table63 = _u439["table?"];
  var list63 = _u439["list?"];
  var hd61 = _u439["hd="];
  var substring = _u439.substring;
  var sub = _u439.sub;
  var keys = _u439.keys;
  var inner = _u439.inner;
  var tl = _u439.tl;
  var char = _u439.char;
  var code = _u439.code;
  var string_literal63 = _u439["string-literal?"];
  var id_literal63 = _u439["id-literal?"];
  var add = _u439.add;
  var drop = _u439.drop;
  var last = _u439.last;
  var butlast = _u439.butlast;
  var reverse = _u439.reverse;
  var join = _u439.join;
  var reduce = _u439.reduce;
  var keep = _u439.keep;
  var in63 = _u439["in?"];
  var find = _u439.find;
  var pair = _u439.pair;
  var sort = _u439.sort;
  var iterate = _u439.iterate;
  var replicate = _u439.replicate;
  var series = _u439.series;
  var map = _u439.map;
  var keys63 = _u439["keys?"];
  var empty63 = _u439["empty?"];
  var stash = _u439.stash;
  var unstash = _u439.unstash;
  var search = _u439.search;
  var split = _u439.split;
  var cat = _u439.cat;
  var _43 = _u439["+"];
  var _ = _u439["-"];
  var _42 = _u439["*"];
  var _47 = _u439["/"];
  var _37 = _u439["%"];
  var _62 = _u439[">"];
  var _60 = _u439["<"];
  var _61 = _u439["="];
  var _6261 = _u439[">="];
  var _6061 = _u439["<="];
  var read_file = _u439["read-file"];
  var write_file = _u439["write-file"];
  var write = _u439.write;
  var exit = _u439.exit;
  var today = _u439.today;
  var now = _u439.now;
  var number = _u439.number;
  var string = _u439.string;
  var space = _u439.space;
  var apply = _u439.apply;
  var unique = _u439.unique;
  var _37message_handler = _u439["%message-handler"];
  var toplevel63 = _u439["toplevel?"];
  var module_key = _u439["module-key"];
  var module = _u439.module;
  var setenv = _u439.setenv;
  var _u442 = nexus["lumen/lib"];
  var getenv = _u442.getenv;
  var macro_function = _u442["macro-function"];
  var macro63 = _u442["macro?"];
  var special63 = _u442["special?"];
  var special_form63 = _u442["special-form?"];
  var statement63 = _u442["statement?"];
  var symbol_expansion = _u442["symbol-expansion"];
  var symbol63 = _u442["symbol?"];
  var variable63 = _u442["variable?"];
  var bound63 = _u442["bound?"];
  var quoted = _u442.quoted;
  var stash42 = _u442["stash*"];
  var index = _u442.index;
  var bind = _u442.bind;
  var bind42 = _u442["bind*"];
  var quasiexpand = _u442.quasiexpand;
  var macroexpand = _u442.macroexpand;
  var indentation = _u442.indentation;
  var reserved63 = _u442["reserved?"];
  var valid_id63 = _u442["valid-id?"];
  var id = _u442.id;
  var key = _u442.key;
  var imported = _u442.imported;
  var link = _u442.link;
  var mapo = _u442.mapo;
  var quote_environment = _u442["quote-environment"];
  var quote_modules = _u442["quote-modules"];
  var initial_environment = _u442["initial-environment"];
  var _u443 = nexus["lumen/reader"];
  var make_stream = _u443["make-stream"];
  var read_table = _u443["read-table"];
  var read = _u443.read;
  var read_all = _u443["read-all"];
  var read_from_string = _u443["read-from-string"];
  var _u446 = [];
  var _u447 = [];
  _u447.js = "!";
  _u447.lua = "not ";
  _u446["not"] = _u447;
  var _u449 = [];
  _u449["*"] = true;
  _u449["/"] = true;
  _u449["%"] = true;
  var _u451 = [];
  _u451["+"] = true;
  _u451["-"] = true;
  var _u453 = [];
  var _u454 = [];
  _u454.js = "+";
  _u454.lua = "..";
  _u453.cat = _u454;
  var _u456 = [];
  _u456["<"] = true;
  _u456[">"] = true;
  _u456["<="] = true;
  _u456[">="] = true;
  var _u458 = [];
  var _u459 = [];
  _u459.js = "===";
  _u459.lua = "==";
  _u458["="] = _u459;
  var _u460 = [];
  _u460.js = "!=";
  _u460.lua = "~=";
  _u458["~="] = _u460;
  var _u462 = [];
  var _u463 = [];
  _u463.js = "&&";
  _u463.lua = "and";
  _u462["and"] = _u463;
  var _u465 = [];
  var _u466 = [];
  _u466.js = "||";
  _u466.lua = "or";
  _u465["or"] = _u466;
  var infix = [_u446, _u449, _u451, _u453, _u456, _u458, _u462, _u465];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    return(length(form) === 2 && in63(hd(form), ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _u470 = infix;
      var k = undefined;
      for (k in _u470) {
        var v = _u470[k];
        var _u471 = parseInt(k);
        var _u582;
        if (isNaN(_u471)) {
          _u582 = k;
        } else {
          _u582 = _u471;
        }
        var _u472 = _u582;
        if (v[hd(form)]) {
          return(index(_u472));
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
    var _u481 = getenv(x);
    var special = _u481.special;
    var stmt = _u481.stmt;
    var self_tr63 = _u481.tr;
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
    var _u484 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _u484.right;
    var _u583;
    if (right) {
      _u583 = _6261;
    } else {
      _u583 = _62;
    }
    if (_u583(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _u488 = sub(form, 1);
    var a = _u488[0];
    var b = _u488[1];
    var _u489 = op_delims(form, a);
    var ao = _u489[0];
    var ac = _u489[1];
    var _u490 = op_delims(form, b, {_stash: true, right: true});
    var bo = _u490[0];
    var bc = _u490[1];
    var _u491 = compile(a);
    var _u492 = compile(b);
    var _u493 = getop(op);
    if (unary63(form)) {
      return(_u493 + ao + _u491 + ac);
    } else {
      return(ao + _u491 + ac + " " + _u493 + " " + bo + _u492 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _u494 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _u494.name;
    var prefix = _u494.prefix;
    var _u584;
    if (name) {
      _u584 = compile(name);
    } else {
      _u584 = "";
    }
    var id = _u584;
    var _u495 = prefix || "";
    var _u496 = compile_args(args);
    indent_level = indent_level + 1;
    var _u498 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u497 = _u498;
    var ind = indentation();
    var _u585;
    if (target === "js") {
      _u585 = "";
    } else {
      _u585 = "end";
    }
    var tr = _u585;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _u496 + " {\n" + _u497 + ind + "}" + tr);
    } else {
      return(_u495 + "function " + id + _u496 + "\n" + _u497 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _u500 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _u500.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _u586;
        if (stmt) {
          _u586 = indentation();
        } else {
          _u586 = "";
        }
        var ind = _u586;
        var _u587;
        if (atom63(form)) {
          _u587 = compile_atom(form);
        } else {
          var _u588;
          if (infix63(hd(form))) {
            _u588 = compile_infix(form);
          } else {
            _u588 = compile_call(form);
          }
          _u587 = _u588;
        }
        var _u501 = _u587;
        return(ind + _u501 + tr);
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
    var _u512 = args[1];
    var _u513 = args[2];
    if (stmt63 || tail63) {
      var _u590;
      if (_u513) {
        _u590 = [lower_body([_u513], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_u512], tail63)], _u590)));
    } else {
      var e = unique();
      add(hoist, ["%local", e]);
      var _u589;
      if (_u513) {
        _u589 = [lower(["set", e, _u513])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _u512])], _u589));
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
      var _u591;
      if (x === "and") {
        _u591 = ["%if", id, b, id];
      } else {
        _u591 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _u591], hoist));
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
    var _u538 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _u538, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _u541 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_u541)) {
      return(_u541);
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
    var _u562 = current_module;
    current_module = mod0;
    environment = env0;
    conclude(code);
    return(_u562);
  };
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module;
  var open_module = function (spec) {
    var _u563 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u563.private;
    var m = module(spec);
    var frame = last(environment);
    var _u564 = m.export;
    var k = undefined;
    for (k in _u564) {
      var v = _u564[k];
      var _u565 = parseInt(k);
      var _u592;
      if (isNaN(_u565)) {
        _u592 = k;
      } else {
        _u592 = _u565;
      }
      var _u566 = _u592;
      if (v.export || private) {
        frame[_u566] = v;
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _u567 = unstash(Array.prototype.slice.call(arguments, 1));
    var private = _u567.private;
    if (!module(spec)) {
      spec = _37compile_module(spec);
    }
    open_module(spec, {_stash: true, private: private});
    return(spec);
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  in_module = function (spec) {
    var _u569 = load_module(spec, {_stash: true, private: true});
    var m = module(_u569);
    series(open_module, m.import);
    current_module = _u569;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    series(function (spec) {
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _u572 = import_modules(m.alias);
        var aliased = _u572[0];
        var bs = _u572[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _u573 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _u573);
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
  var _u593 = nexus["lumen/runtime"];
  var nil63 = _u593["nil?"];
  var is63 = _u593["is?"];
  var length = _u593.length;
  var none63 = _u593["none?"];
  var some63 = _u593["some?"];
  var one63 = _u593["one?"];
  var hd = _u593.hd;
  var string63 = _u593["string?"];
  var number63 = _u593["number?"];
  var boolean63 = _u593["boolean?"];
  var function63 = _u593["function?"];
  var composite63 = _u593["composite?"];
  var atom63 = _u593["atom?"];
  var table63 = _u593["table?"];
  var list63 = _u593["list?"];
  var hd61 = _u593["hd="];
  var substring = _u593.substring;
  var sub = _u593.sub;
  var keys = _u593.keys;
  var inner = _u593.inner;
  var tl = _u593.tl;
  var char = _u593.char;
  var code = _u593.code;
  var string_literal63 = _u593["string-literal?"];
  var id_literal63 = _u593["id-literal?"];
  var add = _u593.add;
  var drop = _u593.drop;
  var last = _u593.last;
  var butlast = _u593.butlast;
  var reverse = _u593.reverse;
  var join = _u593.join;
  var reduce = _u593.reduce;
  var keep = _u593.keep;
  var in63 = _u593["in?"];
  var find = _u593.find;
  var pair = _u593.pair;
  var sort = _u593.sort;
  var iterate = _u593.iterate;
  var replicate = _u593.replicate;
  var series = _u593.series;
  var map = _u593.map;
  var keys63 = _u593["keys?"];
  var empty63 = _u593["empty?"];
  var stash = _u593.stash;
  var unstash = _u593.unstash;
  var search = _u593.search;
  var split = _u593.split;
  var cat = _u593.cat;
  var _43 = _u593["+"];
  var _ = _u593["-"];
  var _42 = _u593["*"];
  var _47 = _u593["/"];
  var _37 = _u593["%"];
  var _62 = _u593[">"];
  var _60 = _u593["<"];
  var _61 = _u593["="];
  var _6261 = _u593[">="];
  var _6061 = _u593["<="];
  var read_file = _u593["read-file"];
  var write_file = _u593["write-file"];
  var write = _u593.write;
  var exit = _u593.exit;
  var today = _u593.today;
  var now = _u593.now;
  var number = _u593.number;
  var string = _u593.string;
  var space = _u593.space;
  var apply = _u593.apply;
  var unique = _u593.unique;
  var _37message_handler = _u593["%message-handler"];
  var toplevel63 = _u593["toplevel?"];
  var module_key = _u593["module-key"];
  var module = _u593.module;
  var setenv = _u593.setenv;
  var _u596 = nexus["lumen/lib"];
  var getenv = _u596.getenv;
  var macro_function = _u596["macro-function"];
  var macro63 = _u596["macro?"];
  var special63 = _u596["special?"];
  var special_form63 = _u596["special-form?"];
  var statement63 = _u596["statement?"];
  var symbol_expansion = _u596["symbol-expansion"];
  var symbol63 = _u596["symbol?"];
  var variable63 = _u596["variable?"];
  var bound63 = _u596["bound?"];
  var quoted = _u596.quoted;
  var stash42 = _u596["stash*"];
  var index = _u596.index;
  var bind = _u596.bind;
  var bind42 = _u596["bind*"];
  var quasiexpand = _u596.quasiexpand;
  var macroexpand = _u596.macroexpand;
  var indentation = _u596.indentation;
  var reserved63 = _u596["reserved?"];
  var valid_id63 = _u596["valid-id?"];
  var id = _u596.id;
  var key = _u596.key;
  var imported = _u596.imported;
  var link = _u596.link;
  var mapo = _u596.mapo;
  var quote_environment = _u596["quote-environment"];
  var quote_modules = _u596["quote-modules"];
  var initial_environment = _u596["initial-environment"];
  var _u597 = nexus["lumen/compiler"];
  var compile_function = _u597["compile-function"];
  var compile = _u597.compile;
  var open_module = _u597["open-module"];
  var load_module = _u597["load-module"];
  var in_module = _u597["in-module"];
  var import_modules = _u597["import-modules"];
  var compile_module = _u597["compile-module"];
  var declare = _u597.declare;
  var eval = _u597.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _u995 = nexus["lumen/runtime"];
  var nil63 = _u995["nil?"];
  var is63 = _u995["is?"];
  var length = _u995.length;
  var none63 = _u995["none?"];
  var some63 = _u995["some?"];
  var one63 = _u995["one?"];
  var hd = _u995.hd;
  var string63 = _u995["string?"];
  var number63 = _u995["number?"];
  var boolean63 = _u995["boolean?"];
  var function63 = _u995["function?"];
  var composite63 = _u995["composite?"];
  var atom63 = _u995["atom?"];
  var table63 = _u995["table?"];
  var list63 = _u995["list?"];
  var hd61 = _u995["hd="];
  var substring = _u995.substring;
  var sub = _u995.sub;
  var keys = _u995.keys;
  var inner = _u995.inner;
  var tl = _u995.tl;
  var char = _u995.char;
  var code = _u995.code;
  var string_literal63 = _u995["string-literal?"];
  var id_literal63 = _u995["id-literal?"];
  var add = _u995.add;
  var drop = _u995.drop;
  var last = _u995.last;
  var butlast = _u995.butlast;
  var reverse = _u995.reverse;
  var join = _u995.join;
  var reduce = _u995.reduce;
  var keep = _u995.keep;
  var in63 = _u995["in?"];
  var find = _u995.find;
  var pair = _u995.pair;
  var sort = _u995.sort;
  var iterate = _u995.iterate;
  var replicate = _u995.replicate;
  var series = _u995.series;
  var map = _u995.map;
  var keys63 = _u995["keys?"];
  var empty63 = _u995["empty?"];
  var stash = _u995.stash;
  var unstash = _u995.unstash;
  var search = _u995.search;
  var split = _u995.split;
  var cat = _u995.cat;
  var _43 = _u995["+"];
  var _ = _u995["-"];
  var _42 = _u995["*"];
  var _47 = _u995["/"];
  var _37 = _u995["%"];
  var _62 = _u995[">"];
  var _60 = _u995["<"];
  var _61 = _u995["="];
  var _6261 = _u995[">="];
  var _6061 = _u995["<="];
  var read_file = _u995["read-file"];
  var write_file = _u995["write-file"];
  var write = _u995.write;
  var exit = _u995.exit;
  var today = _u995.today;
  var now = _u995.now;
  var number = _u995.number;
  var string = _u995.string;
  var space = _u995.space;
  var apply = _u995.apply;
  var unique = _u995.unique;
  var _37message_handler = _u995["%message-handler"];
  var toplevel63 = _u995["toplevel?"];
  var module_key = _u995["module-key"];
  var module = _u995.module;
  var setenv = _u995.setenv;
  var _u998 = nexus["lumen/lib"];
  var getenv = _u998.getenv;
  var macro_function = _u998["macro-function"];
  var macro63 = _u998["macro?"];
  var special63 = _u998["special?"];
  var special_form63 = _u998["special-form?"];
  var statement63 = _u998["statement?"];
  var symbol_expansion = _u998["symbol-expansion"];
  var symbol63 = _u998["symbol?"];
  var variable63 = _u998["variable?"];
  var bound63 = _u998["bound?"];
  var quoted = _u998.quoted;
  var stash42 = _u998["stash*"];
  var index = _u998.index;
  var bind = _u998.bind;
  var bind42 = _u998["bind*"];
  var quasiexpand = _u998.quasiexpand;
  var macroexpand = _u998.macroexpand;
  var indentation = _u998.indentation;
  var reserved63 = _u998["reserved?"];
  var valid_id63 = _u998["valid-id?"];
  var id = _u998.id;
  var key = _u998.key;
  var imported = _u998.imported;
  var link = _u998.link;
  var mapo = _u998.mapo;
  var quote_environment = _u998["quote-environment"];
  var quote_modules = _u998["quote-modules"];
  var initial_environment = _u998["initial-environment"];
  var _u999 = nexus["lumen/compiler"];
  var compile_function = _u999["compile-function"];
  var compile = _u999.compile;
  var open_module = _u999["open-module"];
  var load_module = _u999["load-module"];
  var in_module = _u999["in-module"];
  var import_modules = _u999["import-modules"];
  var compile_module = _u999["compile-module"];
  var declare = _u999.declare;
  var eval = _u999.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _u1862 = nexus["lumen/runtime"];
  var nil63 = _u1862["nil?"];
  var is63 = _u1862["is?"];
  var length = _u1862.length;
  var none63 = _u1862["none?"];
  var some63 = _u1862["some?"];
  var one63 = _u1862["one?"];
  var hd = _u1862.hd;
  var string63 = _u1862["string?"];
  var number63 = _u1862["number?"];
  var boolean63 = _u1862["boolean?"];
  var function63 = _u1862["function?"];
  var composite63 = _u1862["composite?"];
  var atom63 = _u1862["atom?"];
  var table63 = _u1862["table?"];
  var list63 = _u1862["list?"];
  var hd61 = _u1862["hd="];
  var substring = _u1862.substring;
  var sub = _u1862.sub;
  var keys = _u1862.keys;
  var inner = _u1862.inner;
  var tl = _u1862.tl;
  var char = _u1862.char;
  var code = _u1862.code;
  var string_literal63 = _u1862["string-literal?"];
  var id_literal63 = _u1862["id-literal?"];
  var add = _u1862.add;
  var drop = _u1862.drop;
  var last = _u1862.last;
  var butlast = _u1862.butlast;
  var reverse = _u1862.reverse;
  var join = _u1862.join;
  var reduce = _u1862.reduce;
  var keep = _u1862.keep;
  var in63 = _u1862["in?"];
  var find = _u1862.find;
  var pair = _u1862.pair;
  var sort = _u1862.sort;
  var iterate = _u1862.iterate;
  var replicate = _u1862.replicate;
  var series = _u1862.series;
  var map = _u1862.map;
  var keys63 = _u1862["keys?"];
  var empty63 = _u1862["empty?"];
  var stash = _u1862.stash;
  var unstash = _u1862.unstash;
  var search = _u1862.search;
  var split = _u1862.split;
  var cat = _u1862.cat;
  var _43 = _u1862["+"];
  var _ = _u1862["-"];
  var _42 = _u1862["*"];
  var _47 = _u1862["/"];
  var _37 = _u1862["%"];
  var _62 = _u1862[">"];
  var _60 = _u1862["<"];
  var _61 = _u1862["="];
  var _6261 = _u1862[">="];
  var _6061 = _u1862["<="];
  var read_file = _u1862["read-file"];
  var write_file = _u1862["write-file"];
  var write = _u1862.write;
  var exit = _u1862.exit;
  var today = _u1862.today;
  var now = _u1862.now;
  var number = _u1862.number;
  var string = _u1862.string;
  var space = _u1862.space;
  var apply = _u1862.apply;
  var unique = _u1862.unique;
  var _37message_handler = _u1862["%message-handler"];
  var toplevel63 = _u1862["toplevel?"];
  var module_key = _u1862["module-key"];
  var module = _u1862.module;
  var setenv = _u1862.setenv;
  var _u1865 = nexus["lumen/lib"];
  var getenv = _u1865.getenv;
  var macro_function = _u1865["macro-function"];
  var macro63 = _u1865["macro?"];
  var special63 = _u1865["special?"];
  var special_form63 = _u1865["special-form?"];
  var statement63 = _u1865["statement?"];
  var symbol_expansion = _u1865["symbol-expansion"];
  var symbol63 = _u1865["symbol?"];
  var variable63 = _u1865["variable?"];
  var bound63 = _u1865["bound?"];
  var quoted = _u1865.quoted;
  var stash42 = _u1865["stash*"];
  var index = _u1865.index;
  var bind = _u1865.bind;
  var bind42 = _u1865["bind*"];
  var quasiexpand = _u1865.quasiexpand;
  var macroexpand = _u1865.macroexpand;
  var indentation = _u1865.indentation;
  var reserved63 = _u1865["reserved?"];
  var valid_id63 = _u1865["valid-id?"];
  var id = _u1865.id;
  var key = _u1865.key;
  var imported = _u1865.imported;
  var link = _u1865.link;
  var mapo = _u1865.mapo;
  var quote_environment = _u1865["quote-environment"];
  var quote_modules = _u1865["quote-modules"];
  var initial_environment = _u1865["initial-environment"];
  var _u1866 = nexus["lumen/compiler"];
  var compile_function = _u1866["compile-function"];
  var compile = _u1866.compile;
  var open_module = _u1866["open-module"];
  var load_module = _u1866["load-module"];
  var in_module = _u1866["in-module"];
  var import_modules = _u1866["import-modules"];
  var compile_module = _u1866["compile-module"];
  var declare = _u1866.declare;
  var eval = _u1866.eval;
  global.modules = {user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_u1897) {
    var char = _u1897[0];
    var stream = _u1897[1];
    var _u1896 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1896, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, "hd=": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, keys: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, butlast: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, unique: {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {export: true, global: true}, fs: {variable: true}, print: {export: true, global: true}, "id-count": {variable: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
    var _u1916 = body;
    var k = undefined;
    for (k in _u1916) {
      var v = _u1916[k];
      var _u1917 = parseInt(k);
      var _u2165;
      if (isNaN(_u1917)) {
        _u2165 = k;
      } else {
        _u2165 = _u1917;
      }
      var _u1918 = _u2165;
      if (number63(_u1918)) {
        l[_u1918] = v;
      } else {
        add(forms, ["set", ["get", id, ["quote", _u1918]], v]);
      }
    }
    if (some63(forms)) {
      return(join(["let", [id, join(["%array"], l)]], join(forms, [id])));
    } else {
      return(join(["%array"], l));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_u1928) {
      var a = _u1928[0];
      var b = _u1928[1];
      var c = sub(_u1928, 2);
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
    var _u1932 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1932, 0);
    return(["if", cond, join(["do"], body)]);
  }}, unless: {export: true, macro: function (cond) {
    var _u1935 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1935, 0);
    return(["if", ["not", cond], join(["do"], body)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var _u1941 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1941, 0);
    if (length(bindings) < 2) {
      return(join(["do"], body));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _u1943 = bind(lh, rh);
      var k = undefined;
      for (k in _u1943) {
        var _u1945 = _u1943[k];
        var id = _u1945[0];
        var val = _u1945[1];
        var _u1944 = parseInt(k);
        var _u2166;
        if (isNaN(_u1944)) {
          _u2166 = k;
        } else {
          _u2166 = _u1944;
        }
        var _u1946 = _u2166;
        if (number63(_u1946)) {
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
    var _u1952 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1952, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u1953 = import_modules(imp);
    var imports = _u1953[0];
    var bindings = _u1953[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u1954 = exp || [];
    var _u992 = undefined;
    for (_u992 in _u1954) {
      var x = _u1954[_u992];
      var _u1955 = parseInt(_u992);
      var _u2167;
      if (isNaN(_u1955)) {
        _u2167 = _u992;
      } else {
        _u2167 = _u1955;
      }
      var _u1956 = _u2167;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var _u1962 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1962, 0);
    var form = join(["fn", args], body);
    var _u1964 = ["setenv", ["quote", name]];
    _u1964.macro = form;
    _u1964.form = ["quote", form];
    eval(_u1964);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var _u1967 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1967, 0);
    var form = join(["fn", args], body);
    var _u1969 = ["setenv", ["quote", name]];
    _u1969.special = form;
    _u1969.form = ["quote", form];
    eval(join(_u1969, keys(body)));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define-global": {export: true, macro: function (name, x) {
    var _u1973 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1973, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(body)) {
      var _u1974 = bind42(x, body);
      var args = _u1974[0];
      var _u1975 = _u1974[1];
      return(join(["%global-function", name, args], _u1975));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var _u1981 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1981, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(body) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], body)]));
    } else {
      if (some63(body)) {
        var _u1984 = bind42(x, body);
        var args = _u1984[0];
        var _u1985 = _u1984[1];
        return(link(name, join(["%local-function", name, args], _u1985)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, redefine: {export: true, macro: function (name, x) {
    var _u1988 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u1988, 0);
    if (some63(body)) {
      x = join(["fn", x], body);
    }
    return(link(name, ["set", name, x]));
  }}, "with-bindings": {export: true, macro: function (_u1992) {
    var names = _u1992[0];
    var _u1991 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1991, 0);
    var x = unique();
    var _u1996 = ["setenv", x];
    _u1996.variable = true;
    var _u1993 = ["with-frame", ["all", ["_u993", x], names, _u1996]];
    _u1993.scope = true;
    return(join(_u1993, body));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var _u1997 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u1997, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _u1998 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u1998);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var _u2002 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2002, 0);
    add(environment, {});
    map(function (_u2005) {
      var name = _u2005[0];
      var exp = _u2005[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _u2003 = join(["do"], macroexpand(body));
    drop(environment);
    return(_u2003);
  }}, fn: {export: true, macro: function (args) {
    var _u2008 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2008, 0);
    var _u2009 = bind42(args, body);
    var _u2010 = _u2009[0];
    var _u2011 = _u2009[1];
    return(join(["%function", _u2010], _u2011));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = unique();
      var x = unique();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_u2024, t) {
    var k = _u2024[0];
    var v = _u2024[1];
    var _u2023 = unstash(Array.prototype.slice.call(arguments, 2));
    var body = sub(_u2023, 0);
    var x = unique();
    var n = unique();
    var _u2168;
    if (target === "lua") {
      _u2168 = body;
    } else {
      _u2168 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], body)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _u2168)]]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _u2037 = xs;
    var _u994 = undefined;
    for (_u994 in _u2037) {
      var x = _u2037[_u994];
      var _u2038 = parseInt(_u994);
      var _u2169;
      if (isNaN(_u2038)) {
        _u2169 = _u994;
      } else {
        _u2169 = _u2038;
      }
      var _u2039 = _u2169;
      l[x] = true;
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var _u2045 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2045, 0);
    return(["set", a, join(["join*", a], bs)]);
  }}, "cat!": {export: true, macro: function (a) {
    var _u2048 = unstash(Array.prototype.slice.call(arguments, 1));
    var bs = sub(_u2048, 0);
    return(["set", a, join(["cat", a], bs)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var _u2058 = unstash(Array.prototype.slice.call(arguments, 0));
    var body = sub(_u2058, 0);
    var scope = _u2058.scope;
    var x = unique();
    var _u2061 = ["table"];
    _u2061._scope = scope;
    return(["do", ["add", "environment", _u2061], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {export: true, stmt: true, tr: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "";
    series(function (x) {
      s = s + compile(x, {_stash: true, stmt: true});
    }, forms);
    return(s);
  }, foo: true}, "%if": {export: true, stmt: true, tr: true, special: function (cond, cons, alt) {
    var _u2080 = compile(cond);
    indent_level = indent_level + 1;
    var _u2082 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _u2081 = _u2082;
    var _u2170;
    if (alt) {
      indent_level = indent_level + 1;
      var _u2084 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _u2170 = _u2084;
    }
    var _u2083 = _u2170;
    var ind = indentation();
    var s = "";
    if (target === "js") {
      s = s + ind + "if (" + _u2080 + ") {\n" + _u2081 + ind + "}";
    } else {
      s = s + ind + "if " + _u2080 + " then\n" + _u2081;
    }
    if (_u2083 && target === "js") {
      s = s + " else {\n" + _u2083 + ind + "}";
    } else {
      if (_u2083) {
        s = s + ind + "else\n" + _u2083;
      }
    }
    if (target === "lua") {
      return(s + ind + "end\n");
    } else {
      return(s + "\n");
    }
  }, foo: true}, "while": {export: true, stmt: true, tr: true, special: function (cond, form) {
    var _u2086 = compile(cond);
    indent_level = indent_level + 1;
    var _u2087 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2087;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _u2086 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _u2086 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {export: true, stmt: true, tr: true, special: function (t, k, form) {
    var _u2089 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u2090 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2090;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _u2089 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _u2089 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {export: true, stmt: true, tr: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _u2092 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _u2092;
    var e = unique();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _u2096 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _u2096;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true}, "break": {export: true, stmt: true, special: function () {
    return(indentation() + "break");
  }, foo: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%global-function": {export: true, stmt: true, tr: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true}, "%local-function": {export: true, stmt: true, tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true}, "return": {export: true, stmt: true, special: function (x) {
    var _u2171;
    if (nil63(x)) {
      _u2171 = "return";
    } else {
      _u2171 = "return(" + compile(x) + ")";
    }
    var _u2104 = _u2171;
    return(indentation() + _u2104);
  }, foo: true}, error: {export: true, stmt: true, special: function (x) {
    var _u2172;
    if (target === "js") {
      _u2172 = "throw new " + compile(["Error", x]);
    } else {
      _u2172 = "error(" + compile(x) + ")";
    }
    var e = _u2172;
    return(indentation() + e);
  }, foo: true}, "%local": {export: true, stmt: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _u2173;
    if (is63(value)) {
      _u2173 = " = " + value1;
    } else {
      _u2173 = "";
    }
    var rh = _u2173;
    var _u2174;
    if (target === "js") {
      _u2174 = "var ";
    } else {
      _u2174 = "local ";
    }
    var keyword = _u2174;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true}, set: {export: true, stmt: true, special: function (lh, rh) {
    var _u2109 = compile(lh);
    var _u2175;
    if (nil63(rh)) {
      _u2175 = "nil";
    } else {
      _u2175 = rh;
    }
    var _u2110 = compile(_u2175);
    return(indentation() + _u2109 + " = " + _u2110);
  }, foo: true}, get: {export: true, special: function (t, k) {
    var _u2112 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_u2112, 0) === "{") {
      _u2112 = "(" + _u2112 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_u2112 + "." + inner(k));
    } else {
      return(_u2112 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _u2176;
    if (target === "lua") {
      _u2176 = "{";
    } else {
      _u2176 = "[";
    }
    var open = _u2176;
    var _u2177;
    if (target === "lua") {
      _u2177 = "}";
    } else {
      _u2177 = "]";
    }
    var close = _u2177;
    var s = "";
    var c = "";
    var _u2113 = forms;
    var k = undefined;
    for (k in _u2113) {
      var v = _u2113[k];
      var _u2114 = parseInt(k);
      var _u2178;
      if (isNaN(_u2114)) {
        _u2178 = k;
      } else {
        _u2178 = _u2114;
      }
      var _u2115 = _u2178;
      if (number63(_u2115)) {
        s = s + c + compile(v);
        c = ", ";
      }
    }
    return(open + s + close);
  }, foo: true}, "%object": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var s = "{";
    var c = "";
    var _u2179;
    if (target === "lua") {
      _u2179 = " = ";
    } else {
      _u2179 = ": ";
    }
    var sep = _u2179;
    var _u2116 = pair(forms);
    var k = undefined;
    for (k in _u2116) {
      var v = _u2116[k];
      var _u2117 = parseInt(k);
      var _u2180;
      if (isNaN(_u2117)) {
        _u2180 = k;
      } else {
        _u2180 = _u2117;
      }
      var _u2118 = _u2180;
      if (number63(_u2118)) {
        var _u2119 = v[0];
        var _u2120 = v[1];
        if (!string63(_u2119)) {
          throw new Error("Illegal key: " + string(_u2119));
        }
        s = s + c + key(_u2119) + sep + compile(_u2120);
        c = ", ";
      }
    }
    return(s + "}");
  }, foo: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, index: {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = unique();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, bias: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {export: true, global: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {export: true, global: true}, "module-path": {variable: true}, encapsulate: {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, context: {variable: true}, "%result": {export: true, global: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var _u2155 = unstash(Array.prototype.slice.call(arguments, 1));
    var body = sub(_u2155, 0);
    var imp = body.import;
    var exp = body.export;
    var alias = body.alias;
    var _u2156 = import_modules(imp);
    var imports = _u2156[0];
    var bindings = _u2156[1];
    var k = module_key(spec);
    current_module = spec;
    modules[k] = {import: imports, export: {}, alias: alias};
    var _u2157 = exp || [];
    var _u992 = undefined;
    for (_u992 in _u2157) {
      var x = _u2157[_u992];
      var _u2158 = parseInt(_u992);
      var _u2181;
      if (isNaN(_u2158)) {
        _u2181 = _u992;
      } else {
        _u2181 = _u2158;
      }
      var _u2159 = _u2181;
      setenv(x, {_stash: true, export: true});
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _u2182 = nexus["lumen/runtime"];
  var nil63 = _u2182["nil?"];
  var is63 = _u2182["is?"];
  var length = _u2182.length;
  var none63 = _u2182["none?"];
  var some63 = _u2182["some?"];
  var one63 = _u2182["one?"];
  var hd = _u2182.hd;
  var string63 = _u2182["string?"];
  var number63 = _u2182["number?"];
  var boolean63 = _u2182["boolean?"];
  var function63 = _u2182["function?"];
  var composite63 = _u2182["composite?"];
  var atom63 = _u2182["atom?"];
  var table63 = _u2182["table?"];
  var list63 = _u2182["list?"];
  var hd61 = _u2182["hd="];
  var substring = _u2182.substring;
  var sub = _u2182.sub;
  var keys = _u2182.keys;
  var inner = _u2182.inner;
  var tl = _u2182.tl;
  var char = _u2182.char;
  var code = _u2182.code;
  var string_literal63 = _u2182["string-literal?"];
  var id_literal63 = _u2182["id-literal?"];
  var add = _u2182.add;
  var drop = _u2182.drop;
  var last = _u2182.last;
  var butlast = _u2182.butlast;
  var reverse = _u2182.reverse;
  var join = _u2182.join;
  var reduce = _u2182.reduce;
  var keep = _u2182.keep;
  var in63 = _u2182["in?"];
  var find = _u2182.find;
  var pair = _u2182.pair;
  var sort = _u2182.sort;
  var iterate = _u2182.iterate;
  var replicate = _u2182.replicate;
  var series = _u2182.series;
  var map = _u2182.map;
  var keys63 = _u2182["keys?"];
  var empty63 = _u2182["empty?"];
  var stash = _u2182.stash;
  var unstash = _u2182.unstash;
  var search = _u2182.search;
  var split = _u2182.split;
  var cat = _u2182.cat;
  var _43 = _u2182["+"];
  var _ = _u2182["-"];
  var _42 = _u2182["*"];
  var _47 = _u2182["/"];
  var _37 = _u2182["%"];
  var _62 = _u2182[">"];
  var _60 = _u2182["<"];
  var _61 = _u2182["="];
  var _6261 = _u2182[">="];
  var _6061 = _u2182["<="];
  var read_file = _u2182["read-file"];
  var write_file = _u2182["write-file"];
  var write = _u2182.write;
  var exit = _u2182.exit;
  var today = _u2182.today;
  var now = _u2182.now;
  var number = _u2182.number;
  var string = _u2182.string;
  var space = _u2182.space;
  var apply = _u2182.apply;
  var unique = _u2182.unique;
  var _37message_handler = _u2182["%message-handler"];
  var toplevel63 = _u2182["toplevel?"];
  var module_key = _u2182["module-key"];
  var module = _u2182.module;
  var setenv = _u2182.setenv;
})();
(function () {
  nexus["lumen/main"] = {};
  var _u2 = nexus["lumen/runtime"];
  var _62 = _u2[">"];
  var _61 = _u2["="];
  var _60 = _u2["<"];
  var _6061 = _u2["<="];
  var _6261 = _u2[">="];
  var hd61 = _u2["hd="];
  var unique = _u2.unique;
  var write = _u2.write;
  var _47 = _u2["/"];
  var string_literal63 = _u2["string-literal?"];
  var _ = _u2["-"];
  var keys63 = _u2["keys?"];
  var one63 = _u2["one?"];
  var search = _u2.search;
  var sort = _u2.sort;
  var replicate = _u2.replicate;
  var last = _u2.last;
  var add = _u2.add;
  var function63 = _u2["function?"];
  var sub = _u2.sub;
  var iterate = _u2.iterate;
  var reduce = _u2.reduce;
  var map = _u2.map;
  var string63 = _u2["string?"];
  var char = _u2.char;
  var empty63 = _u2["empty?"];
  var number = _u2.number;
  var series = _u2.series;
  var unstash = _u2.unstash;
  var module_key = _u2["module-key"];
  var list63 = _u2["list?"];
  var inner = _u2.inner;
  var tl = _u2.tl;
  var reverse = _u2.reverse;
  var length = _u2.length;
  var keys = _u2.keys;
  var find = _u2.find;
  var in63 = _u2["in?"];
  var keep = _u2.keep;
  var now = _u2.now;
  var read_file = _u2["read-file"];
  var is63 = _u2["is?"];
  var hd = _u2.hd;
  var table63 = _u2["table?"];
  var toplevel63 = _u2["toplevel?"];
  var id_literal63 = _u2["id-literal?"];
  var pair = _u2.pair;
  var module = _u2.module;
  var code = _u2.code;
  var setenv = _u2.setenv;
  var _37message_handler = _u2["%message-handler"];
  var apply = _u2.apply;
  var _37 = _u2["%"];
  var space = _u2.space;
  var cat = _u2.cat;
  var _42 = _u2["*"];
  var string = _u2.string;
  var today = _u2.today;
  var stash = _u2.stash;
  var write_file = _u2["write-file"];
  var drop = _u2.drop;
  var none63 = _u2["none?"];
  var exit = _u2.exit;
  var composite63 = _u2["composite?"];
  var atom63 = _u2["atom?"];
  var some63 = _u2["some?"];
  var _43 = _u2["+"];
  var split = _u2.split;
  var nil63 = _u2["nil?"];
  var join = _u2.join;
  var number63 = _u2["number?"];
  var substring = _u2.substring;
  var boolean63 = _u2["boolean?"];
  var butlast = _u2.butlast;
  var _u5 = nexus["lumen/reader"];
  var read_all = _u5["read-all"];
  var read_from_string = _u5["read-from-string"];
  var read = _u5.read;
  var read_table = _u5["read-table"];
  var make_stream = _u5["make-stream"];
  var _u6 = nexus["lumen/compiler"];
  var eval = _u6.eval;
  var in_module = _u6["in-module"];
  var load_module = _u6["load-module"];
  var compile_module = _u6["compile-module"];
  var declare = _u6.declare;
  var import_modules = _u6["import-modules"];
  var compile_function = _u6["compile-function"];
  var compile = _u6.compile;
  var open_module = _u6["open-module"];
  var rep = function (s) {
    var _u2186 = (function () {
      try {
        return([true, eval(read_from_string(s))]);
      }
      catch (_u2194) {
        return([false, _u2194.message]);
      }
    })();
    var _u1 = _u2186[0];
    var x = _u2186[1];
    if (is63(x)) {
      return(print(string(x)));
    }
  };
  nexus["lumen/main"].rep = rep;
  var repl = function () {
    var prompt = function () {
      return(write(current_module + "> "));
    };
    var step = function (s) {
      rep(s);
      return(prompt());
    };
    prompt();
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
