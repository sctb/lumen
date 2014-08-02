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
      var _g60;
      if (nil63(from) || from < 0) {
        _g60 = 0;
      } else {
        _g60 = from;
      }
      var i = _g60;
      var n = length(x);
      var _g61;
      if (nil63(upto) || upto > n) {
        _g61 = n;
      } else {
        _g61 = upto;
      }
      var _g23 = _g61;
      while (i < _g23) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g24 = x;
      var k = undefined;
      for (k in _g24) {
        var v = _g24[k];
        var _g25 = parseInt(k);
        var _g62;
        if (isNaN(_g25)) {
          _g62 = k;
        } else {
          _g62 = _g25;
        }
        var _g26 = _g62;
        if (!number63(_g26)) {
          l[_g26] = v;
        }
      }
      return(l);
    }
  };
  nexus["lumen/runtime"].sub = sub;
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
      var _g27 = a;
      var k = undefined;
      for (k in _g27) {
        var v = _g27[k];
        var _g28 = parseInt(k);
        var _g63;
        if (isNaN(_g28)) {
          _g63 = k;
        } else {
          _g63 = _g28;
        }
        var _g29 = _g63;
        c[_g29] = v;
      }
      var _g30 = b;
      var k = undefined;
      for (k in _g30) {
        var v = _g30[k];
        var _g31 = parseInt(k);
        var _g64;
        if (isNaN(_g31)) {
          _g64 = k;
        } else {
          _g64 = _g31;
        }
        var _g32 = _g64;
        if (number63(_g32)) {
          _g32 = _g32 + o;
        }
        c[_g32] = v;
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
    var _g33 = x;
    var k = undefined;
    for (k in _g33) {
      var v = _g33[k];
      var _g34 = parseInt(k);
      var _g65;
      if (isNaN(_g34)) {
        _g65 = k;
      } else {
        _g65 = _g34;
      }
      var _g35 = _g65;
      if (f(v)) {
        t[shift(_g35, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g36 = t;
    var _g19 = undefined;
    for (_g19 in _g36) {
      var y = _g36[_g19];
      var _g37 = parseInt(_g19);
      var _g66;
      if (isNaN(_g37)) {
        _g66 = _g19;
      } else {
        _g66 = _g37;
      }
      var _g38 = _g66;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g39 = t;
    var _g20 = undefined;
    for (_g20 in _g39) {
      var x = _g39[_g20];
      var _g40 = parseInt(_g20);
      var _g67;
      if (isNaN(_g40)) {
        _g67 = _g20;
      } else {
        _g67 = _g40;
      }
      var _g41 = _g67;
      var _g42 = f(x);
      if (_g42) {
        return(_g42);
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
    var _g68;
    if (f) {
      _g68 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g68));
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
    var _g43 = x;
    var k = undefined;
    for (k in _g43) {
      var v = _g43[k];
      var _g44 = parseInt(k);
      var _g69;
      if (isNaN(_g44)) {
        _g69 = k;
      } else {
        _g69 = _g44;
      }
      var _g45 = _g69;
      var y = f(v);
      if (is63(y)) {
        t[shift(_g45, o)] = y;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var k63 = false;
    var _g46 = t;
    var k = undefined;
    for (k in _g46) {
      if (isNaN(parseInt(k))) {
        var v = _g46[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  };
  nexus["lumen/runtime"]["keys?"] = keys63;
  var empty63 = function (t) {
    return(none63(t) && !keys63(t));
  };
  nexus["lumen/runtime"]["empty?"] = empty63;
  var stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g47 = args;
      var k = undefined;
      for (k in _g47) {
        if (isNaN(parseInt(k))) {
          var v = _g47[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  };
  nexus["lumen/runtime"].stash = stash;
  var unstash = function (args) {
    if (none63(args)) {
      return([]);
    } else {
      var l = last(args);
      if (table63(l) && l._stash) {
        var args1 = sub(args, 0, length(args) - 1);
        var _g48 = l;
        var k = undefined;
        for (k in _g48) {
          if (isNaN(parseInt(k))) {
            var v = _g48[k];
            if (!(k === "_stash")) {
              args1[k] = v;
            }
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
    var _g49 = sub(xs, 0);
    if (none63(_g49)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g49));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g50));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g51)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g52));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g53)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g54)));
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
            var x1 = sub(x);
            var _g55 = x;
            var k = undefined;
            for (k in _g55) {
              if (isNaN(parseInt(k))) {
                var v = _g55[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g56 = x1;
            var i = 0;
            while (i < length(_g56)) {
              var y = _g56[i];
              str = str + string(y);
              if (i < length(x1) - 1) {
                str = str + " ";
              }
              i = i + 1;
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
    var _g57 = stash(args);
    return(f.apply(f, _g57));
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
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g58 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g59 = _g58;
      var k1 = undefined;
      for (k1 in _g59) {
        if (isNaN(parseInt(k1))) {
          var v = _g59[k1];
          x[k1] = v;
        }
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
  var _g73 = nexus["lumen/runtime"];
  var nil63 = _g73["nil?"];
  var is63 = _g73["is?"];
  var length = _g73.length;
  var none63 = _g73["none?"];
  var some63 = _g73["some?"];
  var one63 = _g73["one?"];
  var hd = _g73.hd;
  var string63 = _g73["string?"];
  var number63 = _g73["number?"];
  var boolean63 = _g73["boolean?"];
  var function63 = _g73["function?"];
  var composite63 = _g73["composite?"];
  var atom63 = _g73["atom?"];
  var table63 = _g73["table?"];
  var list63 = _g73["list?"];
  var substring = _g73.substring;
  var sub = _g73.sub;
  var inner = _g73.inner;
  var tl = _g73.tl;
  var char = _g73.char;
  var code = _g73.code;
  var string_literal63 = _g73["string-literal?"];
  var id_literal63 = _g73["id-literal?"];
  var add = _g73.add;
  var drop = _g73.drop;
  var last = _g73.last;
  var reverse = _g73.reverse;
  var join = _g73.join;
  var reduce = _g73.reduce;
  var keep = _g73.keep;
  var in63 = _g73["in?"];
  var find = _g73.find;
  var pair = _g73.pair;
  var sort = _g73.sort;
  var iterate = _g73.iterate;
  var replicate = _g73.replicate;
  var series = _g73.series;
  var map = _g73.map;
  var keys63 = _g73["keys?"];
  var empty63 = _g73["empty?"];
  var stash = _g73.stash;
  var unstash = _g73.unstash;
  var search = _g73.search;
  var split = _g73.split;
  var cat = _g73.cat;
  var _43 = _g73["+"];
  var _ = _g73["-"];
  var _42 = _g73["*"];
  var _47 = _g73["/"];
  var _37 = _g73["%"];
  var _62 = _g73[">"];
  var _60 = _g73["<"];
  var _61 = _g73["="];
  var _6261 = _g73[">="];
  var _6061 = _g73["<="];
  var read_file = _g73["read-file"];
  var write_file = _g73["write-file"];
  var write = _g73.write;
  var exit = _g73.exit;
  var today = _g73.today;
  var now = _g73.now;
  var number = _g73.number;
  var string = _g73.string;
  var space = _g73.space;
  var apply = _g73.apply;
  var make_id = _g73["make-id"];
  var _37message_handler = _g73["%message-handler"];
  var toplevel63 = _g73["toplevel?"];
  var module_key = _g73["module-key"];
  var module = _g73.module;
  var setenv = _g73.setenv;
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
      var _g111;
      if (c === "\n") {
        _g111 = "\\n";
      } else {
        var _g112;
        if (c === "\"") {
          _g112 = "\\\"";
        } else {
          var _g113;
          if (c === "\\") {
            _g113 = "\\\\";
          } else {
            _g113 = c;
          }
          _g112 = _g113;
        }
        _g111 = _g112;
      }
      var c1 = _g111;
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
      var _g76 = args;
      var k = undefined;
      for (k in _g76) {
        if (isNaN(parseInt(k))) {
          var v = _g76[k];
          add(l, literal(k));
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
        var r = lh.rest;
        var _g77 = lh;
        var i = 0;
        while (i < length(_g77)) {
          var x = _g77[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g78 = lh;
        var k = undefined;
        for (k in _g78) {
          if (isNaN(parseInt(k))) {
            var v = _g78[k];
            if (v === true) {
              v = k;
            }
            if (!(k === "rest")) {
              bs = join(bs, bind(v, ["get", rh, ["quote", k]]));
            }
          }
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
      var r = args.rest || keys63(args) && make_id();
      var _g79 = args;
      var _g80 = 0;
      while (_g80 < length(_g79)) {
        var arg = _g79[_g80];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g80 = _g80 + 1;
      }
      if (r) {
        bs = join(bs, [r, rest()]);
      }
      if (keys63(args)) {
        bs = join(bs, [sub(args, length(args)), r]);
      }
      if (none63(bs)) {
        return([args1, body]);
      } else {
        return([args1, [join(["let", bs], body)]]);
      }
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
          var _g70 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g71 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g83 = args;
            var _g84 = 0;
            while (_g84 < length(_g83)) {
              var _g81 = _g83[_g84];
              setenv(_g81, {_stash: true, variable: true});
              _g84 = _g84 + 1;
            }
            var _g82 = join(["%function", args], macroexpand(body));
            drop(environment);
            return(_g82);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g72 = form[0];
              var _g85 = form[1];
              var _g86 = form[2];
              var _g87 = sub(form, 3);
              add(environment, {_scope: true});
              var _g90 = _g86;
              var _g91 = 0;
              while (_g91 < length(_g90)) {
                var _g88 = _g90[_g91];
                setenv(_g88, {_stash: true, variable: true});
                _g91 = _g91 + 1;
              }
              var _g89 = join([x, _g85, _g86], macroexpand(_g87));
              drop(environment);
              return(_g89);
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
    var _g92 = form;
    var k = undefined;
    for (k in _g92) {
      if (isNaN(parseInt(k))) {
        var v = _g92[k];
        var _g114;
        if (quasisplice63(v, depth)) {
          _g114 = quasiexpand(v[1]);
        } else {
          _g114 = quasiexpand(v, depth);
        }
        var _g93 = _g114;
        last(xs)[k] = _g93;
      }
    }
    var _g94 = form;
    var _g95 = 0;
    while (_g95 < length(_g94)) {
      var x = _g94[_g95];
      if (quasisplice63(x, depth)) {
        var _g96 = quasiexpand(x[1]);
        add(xs, _g96);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g95 = _g95 + 1;
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
      var _g115;
      if (c === "-") {
        _g115 = "_";
      } else {
        var _g116;
        if (valid_code63(n)) {
          _g116 = c;
        } else {
          var _g117;
          if (i === 0) {
            _g117 = "_" + n;
          } else {
            _g117 = n;
          }
          _g116 = _g117;
        }
        _g115 = _g116;
      }
      var c1 = _g115;
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
    var _g101 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g102 = _g101.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g103 = module(spec).export;
      var n = undefined;
      for (n in _g103) {
        if (isNaN(parseInt(n))) {
          var b = _g103[n];
          if (b.variable && (_g102 || b.export)) {
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
    var xs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g104 = sub(xs, 0);
    return(join(t, _g104));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g105 = sub(keys, 0);
    var t1 = [];
    var _g106 = t;
    var _g107 = 0;
    while (_g107 < length(_g106)) {
      var x = _g106[_g107];
      add(t1, x);
      _g107 = _g107 + 1;
    }
    var _g108 = t;
    var k = undefined;
    for (k in _g108) {
      if (isNaN(parseInt(k))) {
        var v = _g108[k];
        if (!_g105[k]) {
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
    var _g109 = t;
    var k = undefined;
    for (k in _g109) {
      if (isNaN(parseInt(k))) {
        var v = _g109[k];
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
    var _g110 = ["table"];
    _g110.import = quoted(m.import);
    _g110.alias = quoted(m.alias);
    _g110.export = quote_frame(m.export);
    return(_g110);
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
  var _g118 = nexus["lumen/runtime"];
  var nil63 = _g118["nil?"];
  var is63 = _g118["is?"];
  var length = _g118.length;
  var none63 = _g118["none?"];
  var some63 = _g118["some?"];
  var one63 = _g118["one?"];
  var hd = _g118.hd;
  var string63 = _g118["string?"];
  var number63 = _g118["number?"];
  var boolean63 = _g118["boolean?"];
  var function63 = _g118["function?"];
  var composite63 = _g118["composite?"];
  var atom63 = _g118["atom?"];
  var table63 = _g118["table?"];
  var list63 = _g118["list?"];
  var substring = _g118.substring;
  var sub = _g118.sub;
  var inner = _g118.inner;
  var tl = _g118.tl;
  var char = _g118.char;
  var code = _g118.code;
  var string_literal63 = _g118["string-literal?"];
  var id_literal63 = _g118["id-literal?"];
  var add = _g118.add;
  var drop = _g118.drop;
  var last = _g118.last;
  var reverse = _g118.reverse;
  var join = _g118.join;
  var reduce = _g118.reduce;
  var keep = _g118.keep;
  var in63 = _g118["in?"];
  var find = _g118.find;
  var pair = _g118.pair;
  var sort = _g118.sort;
  var iterate = _g118.iterate;
  var replicate = _g118.replicate;
  var series = _g118.series;
  var map = _g118.map;
  var keys63 = _g118["keys?"];
  var empty63 = _g118["empty?"];
  var stash = _g118.stash;
  var unstash = _g118.unstash;
  var search = _g118.search;
  var split = _g118.split;
  var cat = _g118.cat;
  var _43 = _g118["+"];
  var _ = _g118["-"];
  var _42 = _g118["*"];
  var _47 = _g118["/"];
  var _37 = _g118["%"];
  var _62 = _g118[">"];
  var _60 = _g118["<"];
  var _61 = _g118["="];
  var _6261 = _g118[">="];
  var _6061 = _g118["<="];
  var read_file = _g118["read-file"];
  var write_file = _g118["write-file"];
  var write = _g118.write;
  var exit = _g118.exit;
  var today = _g118.today;
  var now = _g118.now;
  var number = _g118.number;
  var string = _g118.string;
  var space = _g118.space;
  var apply = _g118.apply;
  var make_id = _g118["make-id"];
  var _37message_handler = _g118["%message-handler"];
  var toplevel63 = _g118["toplevel?"];
  var module_key = _g118["module-key"];
  var module = _g118.module;
  var setenv = _g118.setenv;
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
  var _g129 = nexus["lumen/runtime"];
  var nil63 = _g129["nil?"];
  var is63 = _g129["is?"];
  var length = _g129.length;
  var none63 = _g129["none?"];
  var some63 = _g129["some?"];
  var one63 = _g129["one?"];
  var hd = _g129.hd;
  var string63 = _g129["string?"];
  var number63 = _g129["number?"];
  var boolean63 = _g129["boolean?"];
  var function63 = _g129["function?"];
  var composite63 = _g129["composite?"];
  var atom63 = _g129["atom?"];
  var table63 = _g129["table?"];
  var list63 = _g129["list?"];
  var substring = _g129.substring;
  var sub = _g129.sub;
  var inner = _g129.inner;
  var tl = _g129.tl;
  var char = _g129.char;
  var code = _g129.code;
  var string_literal63 = _g129["string-literal?"];
  var id_literal63 = _g129["id-literal?"];
  var add = _g129.add;
  var drop = _g129.drop;
  var last = _g129.last;
  var reverse = _g129.reverse;
  var join = _g129.join;
  var reduce = _g129.reduce;
  var keep = _g129.keep;
  var in63 = _g129["in?"];
  var find = _g129.find;
  var pair = _g129.pair;
  var sort = _g129.sort;
  var iterate = _g129.iterate;
  var replicate = _g129.replicate;
  var series = _g129.series;
  var map = _g129.map;
  var keys63 = _g129["keys?"];
  var empty63 = _g129["empty?"];
  var stash = _g129.stash;
  var unstash = _g129.unstash;
  var search = _g129.search;
  var split = _g129.split;
  var cat = _g129.cat;
  var _43 = _g129["+"];
  var _ = _g129["-"];
  var _42 = _g129["*"];
  var _47 = _g129["/"];
  var _37 = _g129["%"];
  var _62 = _g129[">"];
  var _60 = _g129["<"];
  var _61 = _g129["="];
  var _6261 = _g129[">="];
  var _6061 = _g129["<="];
  var read_file = _g129["read-file"];
  var write_file = _g129["write-file"];
  var write = _g129.write;
  var exit = _g129.exit;
  var today = _g129.today;
  var now = _g129.now;
  var number = _g129.number;
  var string = _g129.string;
  var space = _g129.space;
  var apply = _g129.apply;
  var make_id = _g129["make-id"];
  var _37message_handler = _g129["%message-handler"];
  var toplevel63 = _g129["toplevel?"];
  var module_key = _g129["module-key"];
  var module = _g129.module;
  var setenv = _g129.setenv;
  var _g132 = nexus["lumen/lib"];
  var getenv = _g132.getenv;
  var macro_function = _g132["macro-function"];
  var macro63 = _g132["macro?"];
  var special63 = _g132["special?"];
  var special_form63 = _g132["special-form?"];
  var statement63 = _g132["statement?"];
  var symbol_expansion = _g132["symbol-expansion"];
  var symbol63 = _g132["symbol?"];
  var variable63 = _g132["variable?"];
  var bound63 = _g132["bound?"];
  var quoted = _g132.quoted;
  var stash42 = _g132["stash*"];
  var bind = _g132.bind;
  var bind42 = _g132["bind*"];
  var quasiexpand = _g132.quasiexpand;
  var macroexpand = _g132.macroexpand;
  var indentation = _g132.indentation;
  var reserved63 = _g132["reserved?"];
  var valid_id63 = _g132["valid-id?"];
  var id = _g132.id;
  var key = _g132.key;
  var imported = _g132.imported;
  var link = _g132.link;
  var mapo = _g132.mapo;
  var quote_environment = _g132["quote-environment"];
  var quote_modules = _g132["quote-modules"];
  var initial_environment = _g132["initial-environment"];
  var _g133 = nexus["lumen/reader"];
  var make_stream = _g133["make-stream"];
  var read_table = _g133["read-table"];
  var read = _g133.read;
  var read_all = _g133["read-all"];
  var read_from_string = _g133["read-from-string"];
  var _g137 = [];
  _g137.js = "!";
  _g137.lua = "not ";
  var _g135 = [];
  var _g138 = [];
  _g138.js = "!";
  _g138.lua = "not ";
  _g135["not"] = _g138;
  var _g140 = [];
  _g140["*"] = true;
  _g140["/"] = true;
  _g140["%"] = true;
  var _g142 = [];
  _g142["+"] = true;
  _g142["-"] = true;
  var _g146 = [];
  _g146.js = "+";
  _g146.lua = "..";
  var _g144 = [];
  var _g147 = [];
  _g147.js = "+";
  _g147.lua = "..";
  _g144.cat = _g147;
  var _g149 = [];
  _g149["<"] = true;
  _g149[">"] = true;
  _g149["<="] = true;
  _g149[">="] = true;
  var _g153 = [];
  _g153.js = "===";
  _g153.lua = "==";
  var _g155 = [];
  _g155.js = "!=";
  _g155.lua = "~=";
  var _g151 = [];
  var _g156 = [];
  _g156.js = "===";
  _g156.lua = "==";
  _g151["="] = _g156;
  var _g157 = [];
  _g157.js = "!=";
  _g157.lua = "~=";
  _g151["~="] = _g157;
  var _g161 = [];
  _g161.js = "&&";
  _g161.lua = "and";
  var _g159 = [];
  var _g162 = [];
  _g162.js = "&&";
  _g162.lua = "and";
  _g159["and"] = _g162;
  var _g166 = [];
  _g166.js = "||";
  _g166.lua = "or";
  var _g164 = [];
  var _g167 = [];
  _g167.js = "||";
  _g167.lua = "or";
  _g164["or"] = _g167;
  var infix = [_g135, _g140, _g142, _g144, _g149, _g151, _g159, _g164];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g168 = infix;
      var i = 0;
      while (i < length(_g168)) {
        var level = _g168[i];
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
    var _g169 = args;
    var i = 0;
    while (i < length(_g169)) {
      var arg = _g169[i];
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
    var _g170 = getenv(x);
    var special = _g170.special;
    var stmt = _g170.stmt;
    var self_tr63 = _g170.tr;
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
    var _g171 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g171.right;
    var _g200;
    if (right) {
      _g200 = _6261;
    } else {
      _g200 = _62;
    }
    if (_g200(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g172 = sub(form, 1);
    var a = _g172[0];
    var b = _g172[1];
    var _g173 = op_delims(form, a);
    var ao = _g173[0];
    var ac = _g173[1];
    var _g174 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g174[0];
    var bc = _g174[1];
    var _g175 = compile(a);
    var _g176 = compile(b);
    var _g177 = getop(op);
    if (unary63(form)) {
      return(_g177 + ao + _g175 + ac);
    } else {
      return(ao + _g175 + ac + " " + _g177 + " " + bo + _g176 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g178 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g178.name;
    var prefix = _g178.prefix;
    var _g201;
    if (name) {
      _g201 = compile(name);
    } else {
      _g201 = "";
    }
    var id = _g201;
    var _g179 = prefix || "";
    var _g180 = compile_args(args);
    indent_level = indent_level + 1;
    var _g182 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g181 = _g182;
    var ind = indentation();
    var _g202;
    if (target === "js") {
      _g202 = "";
    } else {
      _g202 = "end";
    }
    var tr = _g202;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g180 + " {\n" + _g181 + ind + "}" + tr);
    } else {
      return(_g179 + "function " + id + _g180 + "\n" + _g181 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g183 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g183.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g203;
        if (stmt) {
          _g203 = indentation();
        } else {
          _g203 = "";
        }
        var ind = _g203;
        var _g204;
        if (atom63(form)) {
          _g204 = compile_atom(form);
        } else {
          var _g205;
          if (infix63(hd(form))) {
            _g205 = compile_infix(form);
          } else {
            _g205 = compile_call(form);
          }
          _g204 = _g205;
        }
        var _g184 = _g204;
        return(ind + _g184 + tr);
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
    var _g185 = sub(args, 0, length(args) - 1);
    var _g186 = 0;
    while (_g186 < length(_g185)) {
      var x = _g185[_g186];
      add(hoist, lower(x, hoist, stmt63));
      _g186 = _g186 + 1;
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
    var _g187 = args[1];
    var _g188 = args[2];
    if (stmt63 || tail63) {
      var _g207;
      if (_g188) {
        _g207 = [lower_body([_g188], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g187], tail63)], _g207)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g206;
      if (_g188) {
        _g206 = [lower(["set", e, _g188])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g187])], _g206));
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
      var _g208;
      if (x === "and") {
        _g208 = ["%if", id, b, id];
      } else {
        _g208 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g208], hoist));
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
    var _g189 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g189, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g190 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g190)) {
      return(_g190);
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
    var _g191 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g192 = _g191.all;
    var m = module(spec);
    var frame = last(environment);
    var _g193 = m.export;
    var k = undefined;
    for (k in _g193) {
      if (isNaN(parseInt(k))) {
        var v = _g193[k];
        if (v.export || _g192) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g194 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g195 = _g194.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g195}));
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
    var _g196 = specs || [];
    var _g197 = 0;
    while (_g197 < length(_g196)) {
      var spec = _g196[_g197];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g198 = import_modules(m.alias);
        var aliased = _g198[0];
        var bs = _g198[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g199 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g199);
      }
      _g197 = _g197 + 1;
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
  var _g209 = nexus["lumen/runtime"];
  var nil63 = _g209["nil?"];
  var is63 = _g209["is?"];
  var length = _g209.length;
  var none63 = _g209["none?"];
  var some63 = _g209["some?"];
  var one63 = _g209["one?"];
  var hd = _g209.hd;
  var string63 = _g209["string?"];
  var number63 = _g209["number?"];
  var boolean63 = _g209["boolean?"];
  var function63 = _g209["function?"];
  var composite63 = _g209["composite?"];
  var atom63 = _g209["atom?"];
  var table63 = _g209["table?"];
  var list63 = _g209["list?"];
  var substring = _g209.substring;
  var sub = _g209.sub;
  var inner = _g209.inner;
  var tl = _g209.tl;
  var char = _g209.char;
  var code = _g209.code;
  var string_literal63 = _g209["string-literal?"];
  var id_literal63 = _g209["id-literal?"];
  var add = _g209.add;
  var drop = _g209.drop;
  var last = _g209.last;
  var reverse = _g209.reverse;
  var join = _g209.join;
  var reduce = _g209.reduce;
  var keep = _g209.keep;
  var in63 = _g209["in?"];
  var find = _g209.find;
  var pair = _g209.pair;
  var sort = _g209.sort;
  var iterate = _g209.iterate;
  var replicate = _g209.replicate;
  var series = _g209.series;
  var map = _g209.map;
  var keys63 = _g209["keys?"];
  var empty63 = _g209["empty?"];
  var stash = _g209.stash;
  var unstash = _g209.unstash;
  var search = _g209.search;
  var split = _g209.split;
  var cat = _g209.cat;
  var _43 = _g209["+"];
  var _ = _g209["-"];
  var _42 = _g209["*"];
  var _47 = _g209["/"];
  var _37 = _g209["%"];
  var _62 = _g209[">"];
  var _60 = _g209["<"];
  var _61 = _g209["="];
  var _6261 = _g209[">="];
  var _6061 = _g209["<="];
  var read_file = _g209["read-file"];
  var write_file = _g209["write-file"];
  var write = _g209.write;
  var exit = _g209.exit;
  var today = _g209.today;
  var now = _g209.now;
  var number = _g209.number;
  var string = _g209.string;
  var space = _g209.space;
  var apply = _g209.apply;
  var make_id = _g209["make-id"];
  var _37message_handler = _g209["%message-handler"];
  var toplevel63 = _g209["toplevel?"];
  var module_key = _g209["module-key"];
  var module = _g209.module;
  var setenv = _g209.setenv;
  var _g212 = nexus["lumen/lib"];
  var getenv = _g212.getenv;
  var macro_function = _g212["macro-function"];
  var macro63 = _g212["macro?"];
  var special63 = _g212["special?"];
  var special_form63 = _g212["special-form?"];
  var statement63 = _g212["statement?"];
  var symbol_expansion = _g212["symbol-expansion"];
  var symbol63 = _g212["symbol?"];
  var variable63 = _g212["variable?"];
  var bound63 = _g212["bound?"];
  var quoted = _g212.quoted;
  var stash42 = _g212["stash*"];
  var bind = _g212.bind;
  var bind42 = _g212["bind*"];
  var quasiexpand = _g212.quasiexpand;
  var macroexpand = _g212.macroexpand;
  var indentation = _g212.indentation;
  var reserved63 = _g212["reserved?"];
  var valid_id63 = _g212["valid-id?"];
  var id = _g212.id;
  var key = _g212.key;
  var imported = _g212.imported;
  var link = _g212.link;
  var mapo = _g212.mapo;
  var quote_environment = _g212["quote-environment"];
  var quote_modules = _g212["quote-modules"];
  var initial_environment = _g212["initial-environment"];
  var _g213 = nexus["lumen/compiler"];
  var compile_function = _g213["compile-function"];
  var compile = _g213.compile;
  var open_module = _g213["open-module"];
  var load_module = _g213["load-module"];
  var in_module = _g213["in-module"];
  var import_modules = _g213["import-modules"];
  var compile_module = _g213["compile-module"];
  var declare = _g213.declare;
  var eval = _g213.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g387 = nexus["lumen/runtime"];
  var nil63 = _g387["nil?"];
  var is63 = _g387["is?"];
  var length = _g387.length;
  var none63 = _g387["none?"];
  var some63 = _g387["some?"];
  var one63 = _g387["one?"];
  var hd = _g387.hd;
  var string63 = _g387["string?"];
  var number63 = _g387["number?"];
  var boolean63 = _g387["boolean?"];
  var function63 = _g387["function?"];
  var composite63 = _g387["composite?"];
  var atom63 = _g387["atom?"];
  var table63 = _g387["table?"];
  var list63 = _g387["list?"];
  var substring = _g387.substring;
  var sub = _g387.sub;
  var inner = _g387.inner;
  var tl = _g387.tl;
  var char = _g387.char;
  var code = _g387.code;
  var string_literal63 = _g387["string-literal?"];
  var id_literal63 = _g387["id-literal?"];
  var add = _g387.add;
  var drop = _g387.drop;
  var last = _g387.last;
  var reverse = _g387.reverse;
  var join = _g387.join;
  var reduce = _g387.reduce;
  var keep = _g387.keep;
  var in63 = _g387["in?"];
  var find = _g387.find;
  var pair = _g387.pair;
  var sort = _g387.sort;
  var iterate = _g387.iterate;
  var replicate = _g387.replicate;
  var series = _g387.series;
  var map = _g387.map;
  var keys63 = _g387["keys?"];
  var empty63 = _g387["empty?"];
  var stash = _g387.stash;
  var unstash = _g387.unstash;
  var search = _g387.search;
  var split = _g387.split;
  var cat = _g387.cat;
  var _43 = _g387["+"];
  var _ = _g387["-"];
  var _42 = _g387["*"];
  var _47 = _g387["/"];
  var _37 = _g387["%"];
  var _62 = _g387[">"];
  var _60 = _g387["<"];
  var _61 = _g387["="];
  var _6261 = _g387[">="];
  var _6061 = _g387["<="];
  var read_file = _g387["read-file"];
  var write_file = _g387["write-file"];
  var write = _g387.write;
  var exit = _g387.exit;
  var today = _g387.today;
  var now = _g387.now;
  var number = _g387.number;
  var string = _g387.string;
  var space = _g387.space;
  var apply = _g387.apply;
  var make_id = _g387["make-id"];
  var _37message_handler = _g387["%message-handler"];
  var toplevel63 = _g387["toplevel?"];
  var module_key = _g387["module-key"];
  var module = _g387.module;
  var setenv = _g387.setenv;
  var _g390 = nexus["lumen/lib"];
  var getenv = _g390.getenv;
  var macro_function = _g390["macro-function"];
  var macro63 = _g390["macro?"];
  var special63 = _g390["special?"];
  var special_form63 = _g390["special-form?"];
  var statement63 = _g390["statement?"];
  var symbol_expansion = _g390["symbol-expansion"];
  var symbol63 = _g390["symbol?"];
  var variable63 = _g390["variable?"];
  var bound63 = _g390["bound?"];
  var quoted = _g390.quoted;
  var stash42 = _g390["stash*"];
  var bind = _g390.bind;
  var bind42 = _g390["bind*"];
  var quasiexpand = _g390.quasiexpand;
  var macroexpand = _g390.macroexpand;
  var indentation = _g390.indentation;
  var reserved63 = _g390["reserved?"];
  var valid_id63 = _g390["valid-id?"];
  var id = _g390.id;
  var key = _g390.key;
  var imported = _g390.imported;
  var link = _g390.link;
  var mapo = _g390.mapo;
  var quote_environment = _g390["quote-environment"];
  var quote_modules = _g390["quote-modules"];
  var initial_environment = _g390["initial-environment"];
  var _g391 = nexus["lumen/compiler"];
  var compile_function = _g391["compile-function"];
  var compile = _g391.compile;
  var open_module = _g391["open-module"];
  var load_module = _g391["load-module"];
  var in_module = _g391["in-module"];
  var import_modules = _g391["import-modules"];
  var compile_module = _g391["compile-module"];
  var declare = _g391.declare;
  var eval = _g391.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g700 = nexus["lumen/runtime"];
  var nil63 = _g700["nil?"];
  var is63 = _g700["is?"];
  var length = _g700.length;
  var none63 = _g700["none?"];
  var some63 = _g700["some?"];
  var one63 = _g700["one?"];
  var hd = _g700.hd;
  var string63 = _g700["string?"];
  var number63 = _g700["number?"];
  var boolean63 = _g700["boolean?"];
  var function63 = _g700["function?"];
  var composite63 = _g700["composite?"];
  var atom63 = _g700["atom?"];
  var table63 = _g700["table?"];
  var list63 = _g700["list?"];
  var substring = _g700.substring;
  var sub = _g700.sub;
  var inner = _g700.inner;
  var tl = _g700.tl;
  var char = _g700.char;
  var code = _g700.code;
  var string_literal63 = _g700["string-literal?"];
  var id_literal63 = _g700["id-literal?"];
  var add = _g700.add;
  var drop = _g700.drop;
  var last = _g700.last;
  var reverse = _g700.reverse;
  var join = _g700.join;
  var reduce = _g700.reduce;
  var keep = _g700.keep;
  var in63 = _g700["in?"];
  var find = _g700.find;
  var pair = _g700.pair;
  var sort = _g700.sort;
  var iterate = _g700.iterate;
  var replicate = _g700.replicate;
  var series = _g700.series;
  var map = _g700.map;
  var keys63 = _g700["keys?"];
  var empty63 = _g700["empty?"];
  var stash = _g700.stash;
  var unstash = _g700.unstash;
  var search = _g700.search;
  var split = _g700.split;
  var cat = _g700.cat;
  var _43 = _g700["+"];
  var _ = _g700["-"];
  var _42 = _g700["*"];
  var _47 = _g700["/"];
  var _37 = _g700["%"];
  var _62 = _g700[">"];
  var _60 = _g700["<"];
  var _61 = _g700["="];
  var _6261 = _g700[">="];
  var _6061 = _g700["<="];
  var read_file = _g700["read-file"];
  var write_file = _g700["write-file"];
  var write = _g700.write;
  var exit = _g700.exit;
  var today = _g700.today;
  var now = _g700.now;
  var number = _g700.number;
  var string = _g700.string;
  var space = _g700.space;
  var apply = _g700.apply;
  var make_id = _g700["make-id"];
  var _37message_handler = _g700["%message-handler"];
  var toplevel63 = _g700["toplevel?"];
  var module_key = _g700["module-key"];
  var module = _g700.module;
  var setenv = _g700.setenv;
  var _g703 = nexus["lumen/lib"];
  var getenv = _g703.getenv;
  var macro_function = _g703["macro-function"];
  var macro63 = _g703["macro?"];
  var special63 = _g703["special?"];
  var special_form63 = _g703["special-form?"];
  var statement63 = _g703["statement?"];
  var symbol_expansion = _g703["symbol-expansion"];
  var symbol63 = _g703["symbol?"];
  var variable63 = _g703["variable?"];
  var bound63 = _g703["bound?"];
  var quoted = _g703.quoted;
  var stash42 = _g703["stash*"];
  var bind = _g703.bind;
  var bind42 = _g703["bind*"];
  var quasiexpand = _g703.quasiexpand;
  var macroexpand = _g703.macroexpand;
  var indentation = _g703.indentation;
  var reserved63 = _g703["reserved?"];
  var valid_id63 = _g703["valid-id?"];
  var id = _g703.id;
  var key = _g703.key;
  var imported = _g703.imported;
  var link = _g703.link;
  var mapo = _g703.mapo;
  var quote_environment = _g703["quote-environment"];
  var quote_modules = _g703["quote-modules"];
  var initial_environment = _g703["initial-environment"];
  var _g704 = nexus["lumen/compiler"];
  var compile_function = _g704["compile-function"];
  var compile = _g704.compile;
  var open_module = _g704["open-module"];
  var load_module = _g704["load-module"];
  var in_module = _g704["in-module"];
  var import_modules = _g704["import-modules"];
  var compile_module = _g704["compile-module"];
  var declare = _g704.declare;
  var eval = _g704.eval;
  global.modules = {"lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g717 = body;
      var k = undefined;
      for (k in _g717) {
        if (isNaN(parseInt(k))) {
          var v = _g717[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g718) {
      var a = _g718[0];
      var b = _g718[1];
      var c = sub(_g718, 2);
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
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g719 = sub(body, 0);
    return(["if", cond, join(["do"], _g719)]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g720 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g720)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g721 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g721));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g722 = bind(lh, rh);
      var _g723 = 0;
      while (_g723 < length(_g722)) {
        var _g724 = _g722[_g723];
        var id = _g724[0];
        var val = _g724[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g723 = _g723 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g721)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g725 = sub(body, 0);
    var imp = _g725.import;
    var exp = _g725.export;
    var alias = _g725.alias;
    var _g726 = import_modules(imp);
    var imports = _g726[0];
    var bindings = _g726[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g727 = exp || [];
    var _g728 = 0;
    while (_g728 < length(_g727)) {
      var x = _g727[_g728];
      setenv(x, {_stash: true, export: true});
      _g728 = _g728 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g729 = sub(body, 0);
    var form = join(["fn", args], _g729);
    var _g730 = ["setenv", ["quote", name]];
    _g730.macro = form;
    _g730.form = ["quote", form];
    eval(_g730);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g731 = sub(body, 0);
    var form = join(["fn", args], _g731);
    var keys = sub(_g731, length(_g731));
    var _g732 = ["setenv", ["quote", name]];
    _g732.special = form;
    _g732.form = ["quote", form];
    eval(join(_g732, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g733 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g733)) {
      var _g734 = bind42(x, _g733);
      var args = _g734[0];
      var _g735 = _g734[1];
      return(join(["%global-function", name, args], _g735));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g736 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g736) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g736)]));
    } else {
      if (some63(_g736)) {
        var _g737 = bind42(x, _g736);
        var args = _g737[0];
        var _g738 = _g737[1];
        return(link(name, join(["%local-function", name, args], _g738)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g739) {
    var names = _g739[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g740 = sub(body, 0);
    var x = make_id();
    var _g742 = ["setenv", x];
    _g742.variable = true;
    var _g741 = ["with-frame", ["each", [x], names, _g742]];
    _g741.scope = true;
    return(join(_g741, _g740));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g743 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g744 = join(["do"], macroexpand(_g743));
    drop(environment);
    return(_g744);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g745 = sub(body, 0);
    add(environment, {});
    map(function (_g747) {
      var name = _g747[0];
      var exp = _g747[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g746 = join(["do"], macroexpand(_g745));
    drop(environment);
    return(_g746);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g748 = sub(body, 0);
    var _g749 = bind42(args, _g748);
    var _g750 = _g749[0];
    var _g751 = _g749[1];
    return(join(["%function", _g750], _g751));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g752, t) {
    var k = _g752[0];
    var v = _g752[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g753 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g788;
    if (target === "lua") {
      _g788 = _g753;
    } else {
      _g788 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g753)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g788)]]);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g754 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g789;
    if (nil63(v)) {
      var _g790;
      if (b.i) {
        _g790 = "i";
      } else {
        _g790 = make_id();
      }
      var i = _g790;
      _g789 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g754), ["inc", i]]];
    } else {
      var _g755 = ["target"];
      _g755.js = ["isNaN", ["parseInt", k]];
      _g755.lua = ["not", ["number?", k]];
      _g789 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g755, join(["let", [v, ["get", t1, k]]], _g754)]]];
    }
    return(["let", [t1, t], _g789]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g756 = xs;
    var _g757 = 0;
    while (_g757 < length(_g756)) {
      var x = _g756[_g757];
      l[x] = true;
      _g757 = _g757 + 1;
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }, export: true, global: true}, "join*": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g758 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g758)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g759 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g759)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g760 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g761 = ["table"];
    _g761._scope = scope;
    return(["do", ["add", "environment", _g761], ["let", [x, join(["do"], _g760)], ["drop", "environment"], x]]);
  }}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, series: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g762 = forms;
    var _g763 = 0;
    while (_g763 < length(_g762)) {
      var x = _g762[_g763];
      str = str + compile(x, {_stash: true, stmt: true});
      _g763 = _g763 + 1;
    }
    return(str);
  }, foo: true, tr: true, export: true, stmt: true}, "%if": {special: function (cond, cons, alt) {
    var _g764 = compile(cond);
    indent_level = indent_level + 1;
    var _g766 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g765 = _g766;
    var _g791;
    if (alt) {
      indent_level = indent_level + 1;
      var _g768 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g791 = _g768;
    }
    var _g767 = _g791;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g764 + ") {\n" + _g765 + ind + "}";
    } else {
      str = str + ind + "if " + _g764 + " then\n" + _g765;
    }
    if (_g767 && target === "js") {
      str = str + " else {\n" + _g767 + ind + "}";
    } else {
      if (_g767) {
        str = str + ind + "else\n" + _g767;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true, tr: true, export: true, stmt: true}, "while": {special: function (cond, form) {
    var _g769 = compile(cond);
    indent_level = indent_level + 1;
    var _g770 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g770;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g769 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g769 + " do\n" + body + ind + "end\n");
    }
  }, foo: true, tr: true, export: true, stmt: true}, "%for": {special: function (t, k, form) {
    var _g771 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g772 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g772;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g771 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g771 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true, tr: true, export: true, stmt: true}, "%try": {special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g773 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g773;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g774 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g774;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true, tr: true, export: true, stmt: true}, "break": {export: true, special: function () {
    return(indentation() + "break");
  }, foo: true, stmt: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, export: true, foo: true}, "%global-function": {special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true, tr: true, export: true, stmt: true}, "%local-function": {special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true, tr: true, export: true, stmt: true}, "return": {export: true, special: function (x) {
    var _g792;
    if (nil63(x)) {
      _g792 = "return";
    } else {
      _g792 = "return(" + compile(x) + ")";
    }
    var _g775 = _g792;
    return(indentation() + _g775);
  }, foo: true, stmt: true}, error: {export: true, special: function (x) {
    var _g793;
    if (target === "js") {
      _g793 = "throw new " + compile(["Error", x]);
    } else {
      _g793 = "error(" + compile(x) + ")";
    }
    var e = _g793;
    return(indentation() + e);
  }, foo: true, stmt: true}, "%local": {export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g794;
    if (is63(value)) {
      _g794 = " = " + value1;
    } else {
      _g794 = "";
    }
    var rh = _g794;
    var _g795;
    if (target === "js") {
      _g795 = "var ";
    } else {
      _g795 = "local ";
    }
    var keyword = _g795;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, stmt: true}, set: {export: true, special: function (lh, rh) {
    var _g776 = compile(lh);
    var _g796;
    if (nil63(rh)) {
      _g796 = "nil";
    } else {
      _g796 = rh;
    }
    var _g777 = compile(_g796);
    return(indentation() + _g776 + " = " + _g777);
  }, foo: true, stmt: true}, get: {special: function (t, k) {
    var _g778 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g778, 0) === "{") {
      _g778 = "(" + _g778 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g778 + "." + inner(k));
    } else {
      return(_g778 + "[" + k1 + "]");
    }
  }, export: true, foo: true}, "not": {}, "%array": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g797;
    if (target === "lua") {
      _g797 = "{";
    } else {
      _g797 = "[";
    }
    var open = _g797;
    var _g798;
    if (target === "lua") {
      _g798 = "}";
    } else {
      _g798 = "]";
    }
    var close = _g798;
    var str = "";
    var _g779 = forms;
    var i = 0;
    while (i < length(_g779)) {
      var x = _g779[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, export: true, foo: true}, "%object": {special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g799;
    if (target === "lua") {
      _g799 = " = ";
    } else {
      _g799 = ": ";
    }
    var sep = _g799;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g780 = pairs;
    var i = 0;
    while (i < length(_g780)) {
      var _g781 = _g780[i];
      var k = _g781[0];
      var v = _g781[1];
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
  }, export: true, foo: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g782) {
    var char = _g782[0];
    var stream = _g782[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g783 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g783)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g784 = sub(body, 0);
    var imp = _g784.import;
    var exp = _g784.export;
    var alias = _g784.alias;
    var _g785 = import_modules(imp);
    var imports = _g785[0];
    var bindings = _g785[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g786 = exp || [];
    var _g787 = 0;
    while (_g787 < length(_g786)) {
      var x = _g786[_g787];
      setenv(x, {_stash: true, export: true});
      _g787 = _g787 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g800 = nexus["lumen/runtime"];
  var nil63 = _g800["nil?"];
  var is63 = _g800["is?"];
  var length = _g800.length;
  var none63 = _g800["none?"];
  var some63 = _g800["some?"];
  var one63 = _g800["one?"];
  var hd = _g800.hd;
  var string63 = _g800["string?"];
  var number63 = _g800["number?"];
  var boolean63 = _g800["boolean?"];
  var function63 = _g800["function?"];
  var composite63 = _g800["composite?"];
  var atom63 = _g800["atom?"];
  var table63 = _g800["table?"];
  var list63 = _g800["list?"];
  var substring = _g800.substring;
  var sub = _g800.sub;
  var inner = _g800.inner;
  var tl = _g800.tl;
  var char = _g800.char;
  var code = _g800.code;
  var string_literal63 = _g800["string-literal?"];
  var id_literal63 = _g800["id-literal?"];
  var add = _g800.add;
  var drop = _g800.drop;
  var last = _g800.last;
  var reverse = _g800.reverse;
  var join = _g800.join;
  var reduce = _g800.reduce;
  var keep = _g800.keep;
  var in63 = _g800["in?"];
  var find = _g800.find;
  var pair = _g800.pair;
  var sort = _g800.sort;
  var iterate = _g800.iterate;
  var replicate = _g800.replicate;
  var series = _g800.series;
  var map = _g800.map;
  var keys63 = _g800["keys?"];
  var empty63 = _g800["empty?"];
  var stash = _g800.stash;
  var unstash = _g800.unstash;
  var search = _g800.search;
  var split = _g800.split;
  var cat = _g800.cat;
  var _43 = _g800["+"];
  var _ = _g800["-"];
  var _42 = _g800["*"];
  var _47 = _g800["/"];
  var _37 = _g800["%"];
  var _62 = _g800[">"];
  var _60 = _g800["<"];
  var _61 = _g800["="];
  var _6261 = _g800[">="];
  var _6061 = _g800["<="];
  var read_file = _g800["read-file"];
  var write_file = _g800["write-file"];
  var write = _g800.write;
  var exit = _g800.exit;
  var today = _g800.today;
  var now = _g800.now;
  var number = _g800.number;
  var string = _g800.string;
  var space = _g800.space;
  var apply = _g800.apply;
  var make_id = _g800["make-id"];
  var _37message_handler = _g800["%message-handler"];
  var toplevel63 = _g800["toplevel?"];
  var module_key = _g800["module-key"];
  var module = _g800.module;
  var setenv = _g800.setenv;
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
  var mop = _g2.mop;
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
    var _g803 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g805) {
        return([false, _g805.message]);
      }
    })();
    var _g1 = _g803[0];
    var x = _g803[1];
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
    var _g804 = args;
    var i = 0;
    while (i < length(_g804)) {
      var arg = _g804[i];
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
