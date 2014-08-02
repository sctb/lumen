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
      var _g63;
      if (nil63(from) || from < 0) {
        _g63 = 0;
      } else {
        _g63 = from;
      }
      var i = _g63;
      var n = length(x);
      var _g64;
      if (nil63(upto) || upto > n) {
        _g64 = n;
      } else {
        _g64 = upto;
      }
      var _g25 = _g64;
      while (i < _g25) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g26 = x;
      var k = undefined;
      for (k in _g26) {
        var v = _g26[k];
        var _g27 = parseInt(k);
        var _g65;
        if (isNaN(_g27)) {
          _g65 = k;
        } else {
          _g65 = _g27;
        }
        var _g28 = _g65;
        if (!number63(_g28)) {
          l[_g28] = v;
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
      var _g29 = a;
      var k = undefined;
      for (k in _g29) {
        var v = _g29[k];
        var _g30 = parseInt(k);
        var _g66;
        if (isNaN(_g30)) {
          _g66 = k;
        } else {
          _g66 = _g30;
        }
        var _g31 = _g66;
        c[_g31] = v;
      }
      var _g32 = b;
      var k = undefined;
      for (k in _g32) {
        var v = _g32[k];
        var _g33 = parseInt(k);
        var _g67;
        if (isNaN(_g33)) {
          _g67 = k;
        } else {
          _g67 = _g33;
        }
        var _g34 = _g67;
        if (number63(_g34)) {
          _g34 = _g34 + o;
        }
        c[_g34] = v;
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
    var _g35 = x;
    var k = undefined;
    for (k in _g35) {
      var v = _g35[k];
      var _g36 = parseInt(k);
      var _g68;
      if (isNaN(_g36)) {
        _g68 = k;
      } else {
        _g68 = _g36;
      }
      var _g37 = _g68;
      if (f(v)) {
        t[shift(_g37, o)] = v;
      } else {
        o = o + 1;
      }
    }
    return(t);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, t) {
    var _g38 = t;
    var _g21 = undefined;
    for (_g21 in _g38) {
      var y = _g38[_g21];
      var _g39 = parseInt(_g21);
      var _g69;
      if (isNaN(_g39)) {
        _g69 = _g21;
      } else {
        _g69 = _g39;
      }
      var _g40 = _g69;
      if (x === y) {
        return(true);
      }
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, t) {
    var _g41 = t;
    var _g22 = undefined;
    for (_g22 in _g41) {
      var x = _g41[_g22];
      var _g42 = parseInt(_g22);
      var _g70;
      if (isNaN(_g42)) {
        _g70 = _g22;
      } else {
        _g70 = _g42;
      }
      var _g43 = _g70;
      var _g44 = f(x);
      if (_g44) {
        return(_g44);
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
    var _g71;
    if (f) {
      _g71 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g71));
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
  var map = function (f, t) {
    var t1 = [];
    var _g45 = t;
    var _g46 = 0;
    while (_g46 < length(_g45)) {
      var x = _g45[_g46];
      var _g47 = f(x);
      if (is63(_g47)) {
        add(t1, _g47);
      }
      _g46 = _g46 + 1;
    }
    var _g48 = t;
    var k = undefined;
    for (k in _g48) {
      if (isNaN(parseInt(k))) {
        var v = _g48[k];
        var x = f(v);
        if (is63(x)) {
          t1[k] = x;
        }
      }
    }
    return(t1);
  };
  nexus["lumen/runtime"].map = map;
  var keys63 = function (t) {
    var k63 = false;
    var _g49 = t;
    var k = undefined;
    for (k in _g49) {
      if (isNaN(parseInt(k))) {
        var v = _g49[k];
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
      var _g50 = args;
      var k = undefined;
      for (k in _g50) {
        if (isNaN(parseInt(k))) {
          var v = _g50[k];
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
        var _g51 = l;
        var k = undefined;
        for (k in _g51) {
          if (isNaN(parseInt(k))) {
            var v = _g51[k];
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
    var _g52 = sub(xs, 0);
    if (none63(_g52)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g52));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g53));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g54)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g55 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g55));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g56 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g56)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g57 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g57)));
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
            var _g58 = x;
            var k = undefined;
            for (k in _g58) {
              if (isNaN(parseInt(k))) {
                var v = _g58[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g59 = x1;
            var i = 0;
            while (i < length(_g59)) {
              var y = _g59[i];
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
    var _g60 = stash(args);
    return(f.apply(f, _g60));
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
    var _g61 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g62 = _g61;
      var k1 = undefined;
      for (k1 in _g62) {
        if (isNaN(parseInt(k1))) {
          var v = _g62[k1];
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
  var _g75 = nexus["lumen/runtime"];
  var nil63 = _g75["nil?"];
  var is63 = _g75["is?"];
  var length = _g75.length;
  var none63 = _g75["none?"];
  var some63 = _g75["some?"];
  var one63 = _g75["one?"];
  var hd = _g75.hd;
  var string63 = _g75["string?"];
  var number63 = _g75["number?"];
  var boolean63 = _g75["boolean?"];
  var function63 = _g75["function?"];
  var composite63 = _g75["composite?"];
  var atom63 = _g75["atom?"];
  var table63 = _g75["table?"];
  var list63 = _g75["list?"];
  var substring = _g75.substring;
  var sub = _g75.sub;
  var inner = _g75.inner;
  var tl = _g75.tl;
  var char = _g75.char;
  var code = _g75.code;
  var string_literal63 = _g75["string-literal?"];
  var id_literal63 = _g75["id-literal?"];
  var add = _g75.add;
  var drop = _g75.drop;
  var last = _g75.last;
  var reverse = _g75.reverse;
  var join = _g75.join;
  var reduce = _g75.reduce;
  var keep = _g75.keep;
  var in63 = _g75["in?"];
  var find = _g75.find;
  var pair = _g75.pair;
  var sort = _g75.sort;
  var iterate = _g75.iterate;
  var replicate = _g75.replicate;
  var map = _g75.map;
  var keys63 = _g75["keys?"];
  var empty63 = _g75["empty?"];
  var stash = _g75.stash;
  var unstash = _g75.unstash;
  var search = _g75.search;
  var split = _g75.split;
  var cat = _g75.cat;
  var _43 = _g75["+"];
  var _ = _g75["-"];
  var _42 = _g75["*"];
  var _47 = _g75["/"];
  var _37 = _g75["%"];
  var _62 = _g75[">"];
  var _60 = _g75["<"];
  var _61 = _g75["="];
  var _6261 = _g75[">="];
  var _6061 = _g75["<="];
  var read_file = _g75["read-file"];
  var write_file = _g75["write-file"];
  var write = _g75.write;
  var exit = _g75.exit;
  var today = _g75.today;
  var now = _g75.now;
  var number = _g75.number;
  var string = _g75.string;
  var space = _g75.space;
  var apply = _g75.apply;
  var make_id = _g75["make-id"];
  var _37message_handler = _g75["%message-handler"];
  var toplevel63 = _g75["toplevel?"];
  var module_key = _g75["module-key"];
  var module = _g75.module;
  var setenv = _g75.setenv;
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
      var _g113;
      if (c === "\n") {
        _g113 = "\\n";
      } else {
        var _g114;
        if (c === "\"") {
          _g114 = "\\\"";
        } else {
          var _g115;
          if (c === "\\") {
            _g115 = "\\\\";
          } else {
            _g115 = c;
          }
          _g114 = _g115;
        }
        _g113 = _g114;
      }
      var c1 = _g113;
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
      var _g78 = args;
      var k = undefined;
      for (k in _g78) {
        if (isNaN(parseInt(k))) {
          var v = _g78[k];
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
        var _g79 = lh;
        var i = 0;
        while (i < length(_g79)) {
          var x = _g79[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g80 = lh;
        var k = undefined;
        for (k in _g80) {
          if (isNaN(parseInt(k))) {
            var v = _g80[k];
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
      var _g81 = args;
      var _g82 = 0;
      while (_g82 < length(_g81)) {
        var arg = _g81[_g82];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g82 = _g82 + 1;
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
          var _g72 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g73 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g85 = args;
            var _g86 = 0;
            while (_g86 < length(_g85)) {
              var _g83 = _g85[_g86];
              setenv(_g83, {_stash: true, variable: true});
              _g86 = _g86 + 1;
            }
            var _g84 = join(["%function", map(macroexpand, args)], macroexpand(body));
            drop(environment);
            return(_g84);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g74 = form[0];
              var _g87 = form[1];
              var _g88 = form[2];
              var _g89 = sub(form, 3);
              add(environment, {_scope: true});
              var _g92 = _g88;
              var _g93 = 0;
              while (_g93 < length(_g92)) {
                var _g90 = _g92[_g93];
                setenv(_g90, {_stash: true, variable: true});
                _g93 = _g93 + 1;
              }
              var _g91 = join([x, _g87, map(macroexpand, _g88)], macroexpand(_g89));
              drop(environment);
              return(_g91);
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
    var _g94 = form;
    var k = undefined;
    for (k in _g94) {
      if (isNaN(parseInt(k))) {
        var v = _g94[k];
        var _g116;
        if (quasisplice63(v, depth)) {
          _g116 = quasiexpand(v[1]);
        } else {
          _g116 = quasiexpand(v, depth);
        }
        var _g95 = _g116;
        last(xs)[k] = _g95;
      }
    }
    var _g96 = form;
    var _g97 = 0;
    while (_g97 < length(_g96)) {
      var x = _g96[_g97];
      if (quasisplice63(x, depth)) {
        var _g98 = quasiexpand(x[1]);
        add(xs, _g98);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g97 = _g97 + 1;
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
      var _g117;
      if (c === "-") {
        _g117 = "_";
      } else {
        var _g118;
        if (valid_code63(n)) {
          _g118 = c;
        } else {
          var _g119;
          if (i === 0) {
            _g119 = "_" + n;
          } else {
            _g119 = n;
          }
          _g118 = _g119;
        }
        _g117 = _g118;
      }
      var c1 = _g117;
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
    var _g103 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g104 = _g103.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g105 = module(spec).export;
      var n = undefined;
      for (n in _g105) {
        if (isNaN(parseInt(n))) {
          var b = _g105[n];
          if (b.variable && (_g104 || b.export)) {
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
    var _g106 = sub(xs, 0);
    return(join(t, _g106));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g107 = sub(keys, 0);
    var t1 = [];
    var _g108 = t;
    var _g109 = 0;
    while (_g109 < length(_g108)) {
      var x = _g108[_g109];
      add(t1, x);
      _g109 = _g109 + 1;
    }
    var _g110 = t;
    var k = undefined;
    for (k in _g110) {
      if (isNaN(parseInt(k))) {
        var v = _g110[k];
        if (!_g107[k]) {
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
    var _g111 = t;
    var k = undefined;
    for (k in _g111) {
      if (isNaN(parseInt(k))) {
        var v = _g111[k];
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
    var _g112 = ["table"];
    _g112.import = quoted(m.import);
    _g112.alias = quoted(m.alias);
    _g112.export = quote_frame(m.export);
    return(_g112);
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
  var _g120 = nexus["lumen/runtime"];
  var nil63 = _g120["nil?"];
  var is63 = _g120["is?"];
  var length = _g120.length;
  var none63 = _g120["none?"];
  var some63 = _g120["some?"];
  var one63 = _g120["one?"];
  var hd = _g120.hd;
  var string63 = _g120["string?"];
  var number63 = _g120["number?"];
  var boolean63 = _g120["boolean?"];
  var function63 = _g120["function?"];
  var composite63 = _g120["composite?"];
  var atom63 = _g120["atom?"];
  var table63 = _g120["table?"];
  var list63 = _g120["list?"];
  var substring = _g120.substring;
  var sub = _g120.sub;
  var inner = _g120.inner;
  var tl = _g120.tl;
  var char = _g120.char;
  var code = _g120.code;
  var string_literal63 = _g120["string-literal?"];
  var id_literal63 = _g120["id-literal?"];
  var add = _g120.add;
  var drop = _g120.drop;
  var last = _g120.last;
  var reverse = _g120.reverse;
  var join = _g120.join;
  var reduce = _g120.reduce;
  var keep = _g120.keep;
  var in63 = _g120["in?"];
  var find = _g120.find;
  var pair = _g120.pair;
  var sort = _g120.sort;
  var iterate = _g120.iterate;
  var replicate = _g120.replicate;
  var map = _g120.map;
  var keys63 = _g120["keys?"];
  var empty63 = _g120["empty?"];
  var stash = _g120.stash;
  var unstash = _g120.unstash;
  var search = _g120.search;
  var split = _g120.split;
  var cat = _g120.cat;
  var _43 = _g120["+"];
  var _ = _g120["-"];
  var _42 = _g120["*"];
  var _47 = _g120["/"];
  var _37 = _g120["%"];
  var _62 = _g120[">"];
  var _60 = _g120["<"];
  var _61 = _g120["="];
  var _6261 = _g120[">="];
  var _6061 = _g120["<="];
  var read_file = _g120["read-file"];
  var write_file = _g120["write-file"];
  var write = _g120.write;
  var exit = _g120.exit;
  var today = _g120.today;
  var now = _g120.now;
  var number = _g120.number;
  var string = _g120.string;
  var space = _g120.space;
  var apply = _g120.apply;
  var make_id = _g120["make-id"];
  var _37message_handler = _g120["%message-handler"];
  var toplevel63 = _g120["toplevel?"];
  var module_key = _g120["module-key"];
  var module = _g120.module;
  var setenv = _g120.setenv;
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
  var _g131 = nexus["lumen/runtime"];
  var nil63 = _g131["nil?"];
  var is63 = _g131["is?"];
  var length = _g131.length;
  var none63 = _g131["none?"];
  var some63 = _g131["some?"];
  var one63 = _g131["one?"];
  var hd = _g131.hd;
  var string63 = _g131["string?"];
  var number63 = _g131["number?"];
  var boolean63 = _g131["boolean?"];
  var function63 = _g131["function?"];
  var composite63 = _g131["composite?"];
  var atom63 = _g131["atom?"];
  var table63 = _g131["table?"];
  var list63 = _g131["list?"];
  var substring = _g131.substring;
  var sub = _g131.sub;
  var inner = _g131.inner;
  var tl = _g131.tl;
  var char = _g131.char;
  var code = _g131.code;
  var string_literal63 = _g131["string-literal?"];
  var id_literal63 = _g131["id-literal?"];
  var add = _g131.add;
  var drop = _g131.drop;
  var last = _g131.last;
  var reverse = _g131.reverse;
  var join = _g131.join;
  var reduce = _g131.reduce;
  var keep = _g131.keep;
  var in63 = _g131["in?"];
  var find = _g131.find;
  var pair = _g131.pair;
  var sort = _g131.sort;
  var iterate = _g131.iterate;
  var replicate = _g131.replicate;
  var map = _g131.map;
  var keys63 = _g131["keys?"];
  var empty63 = _g131["empty?"];
  var stash = _g131.stash;
  var unstash = _g131.unstash;
  var search = _g131.search;
  var split = _g131.split;
  var cat = _g131.cat;
  var _43 = _g131["+"];
  var _ = _g131["-"];
  var _42 = _g131["*"];
  var _47 = _g131["/"];
  var _37 = _g131["%"];
  var _62 = _g131[">"];
  var _60 = _g131["<"];
  var _61 = _g131["="];
  var _6261 = _g131[">="];
  var _6061 = _g131["<="];
  var read_file = _g131["read-file"];
  var write_file = _g131["write-file"];
  var write = _g131.write;
  var exit = _g131.exit;
  var today = _g131.today;
  var now = _g131.now;
  var number = _g131.number;
  var string = _g131.string;
  var space = _g131.space;
  var apply = _g131.apply;
  var make_id = _g131["make-id"];
  var _37message_handler = _g131["%message-handler"];
  var toplevel63 = _g131["toplevel?"];
  var module_key = _g131["module-key"];
  var module = _g131.module;
  var setenv = _g131.setenv;
  var _g134 = nexus["lumen/lib"];
  var getenv = _g134.getenv;
  var macro_function = _g134["macro-function"];
  var macro63 = _g134["macro?"];
  var special63 = _g134["special?"];
  var special_form63 = _g134["special-form?"];
  var statement63 = _g134["statement?"];
  var symbol_expansion = _g134["symbol-expansion"];
  var symbol63 = _g134["symbol?"];
  var variable63 = _g134["variable?"];
  var bound63 = _g134["bound?"];
  var quoted = _g134.quoted;
  var stash42 = _g134["stash*"];
  var bind = _g134.bind;
  var bind42 = _g134["bind*"];
  var quasiexpand = _g134.quasiexpand;
  var macroexpand = _g134.macroexpand;
  var indentation = _g134.indentation;
  var reserved63 = _g134["reserved?"];
  var valid_id63 = _g134["valid-id?"];
  var id = _g134.id;
  var key = _g134.key;
  var imported = _g134.imported;
  var link = _g134.link;
  var mapo = _g134.mapo;
  var quote_environment = _g134["quote-environment"];
  var quote_modules = _g134["quote-modules"];
  var initial_environment = _g134["initial-environment"];
  var _g135 = nexus["lumen/reader"];
  var make_stream = _g135["make-stream"];
  var read_table = _g135["read-table"];
  var read = _g135.read;
  var read_all = _g135["read-all"];
  var read_from_string = _g135["read-from-string"];
  var _g139 = [];
  _g139.js = "!";
  _g139.lua = "not ";
  var _g137 = [];
  var _g140 = [];
  _g140.js = "!";
  _g140.lua = "not ";
  _g137["not"] = _g140;
  var _g142 = [];
  _g142["*"] = true;
  _g142["/"] = true;
  _g142["%"] = true;
  var _g144 = [];
  _g144["+"] = true;
  _g144["-"] = true;
  var _g148 = [];
  _g148.js = "+";
  _g148.lua = "..";
  var _g146 = [];
  var _g149 = [];
  _g149.js = "+";
  _g149.lua = "..";
  _g146.cat = _g149;
  var _g151 = [];
  _g151["<"] = true;
  _g151[">"] = true;
  _g151["<="] = true;
  _g151[">="] = true;
  var _g155 = [];
  _g155.js = "===";
  _g155.lua = "==";
  var _g157 = [];
  _g157.js = "!=";
  _g157.lua = "~=";
  var _g153 = [];
  var _g158 = [];
  _g158.js = "===";
  _g158.lua = "==";
  _g153["="] = _g158;
  var _g159 = [];
  _g159.js = "!=";
  _g159.lua = "~=";
  _g153["~="] = _g159;
  var _g163 = [];
  _g163.js = "&&";
  _g163.lua = "and";
  var _g161 = [];
  var _g164 = [];
  _g164.js = "&&";
  _g164.lua = "and";
  _g161["and"] = _g164;
  var _g168 = [];
  _g168.js = "||";
  _g168.lua = "or";
  var _g166 = [];
  var _g169 = [];
  _g169.js = "||";
  _g169.lua = "or";
  _g166["or"] = _g169;
  var infix = [_g137, _g142, _g144, _g146, _g151, _g153, _g161, _g166];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g170 = infix;
      var i = 0;
      while (i < length(_g170)) {
        var level = _g170[i];
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
    var _g171 = args;
    var i = 0;
    while (i < length(_g171)) {
      var arg = _g171[i];
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
    var _g172 = getenv(x);
    var special = _g172.special;
    var stmt = _g172.stmt;
    var self_tr63 = _g172.tr;
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
    var _g173 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g173.right;
    var _g202;
    if (right) {
      _g202 = _6261;
    } else {
      _g202 = _62;
    }
    if (_g202(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g174 = sub(form, 1);
    var a = _g174[0];
    var b = _g174[1];
    var _g175 = op_delims(form, a);
    var ao = _g175[0];
    var ac = _g175[1];
    var _g176 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g176[0];
    var bc = _g176[1];
    var _g177 = compile(a);
    var _g178 = compile(b);
    var _g179 = getop(op);
    if (unary63(form)) {
      return(_g179 + ao + _g177 + ac);
    } else {
      return(ao + _g177 + ac + " " + _g179 + " " + bo + _g178 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g180 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g180.name;
    var prefix = _g180.prefix;
    var _g203;
    if (name) {
      _g203 = compile(name);
    } else {
      _g203 = "";
    }
    var id = _g203;
    var _g181 = prefix || "";
    var _g182 = compile_args(args);
    indent_level = indent_level + 1;
    var _g184 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g183 = _g184;
    var ind = indentation();
    var _g204;
    if (target === "js") {
      _g204 = "";
    } else {
      _g204 = "end";
    }
    var tr = _g204;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g182 + " {\n" + _g183 + ind + "}" + tr);
    } else {
      return(_g181 + "function " + id + _g182 + "\n" + _g183 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g185 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g185.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g205;
        if (stmt) {
          _g205 = indentation();
        } else {
          _g205 = "";
        }
        var ind = _g205;
        var _g206;
        if (atom63(form)) {
          _g206 = compile_atom(form);
        } else {
          var _g207;
          if (infix63(hd(form))) {
            _g207 = compile_infix(form);
          } else {
            _g207 = compile_call(form);
          }
          _g206 = _g207;
        }
        var _g186 = _g206;
        return(ind + _g186 + tr);
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
    var _g187 = sub(args, 0, length(args) - 1);
    var _g188 = 0;
    while (_g188 < length(_g187)) {
      var x = _g187[_g188];
      add(hoist, lower(x, hoist, stmt63));
      _g188 = _g188 + 1;
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
    var _g189 = args[1];
    var _g190 = args[2];
    if (stmt63 || tail63) {
      var _g209;
      if (_g190) {
        _g209 = [lower_body([_g190], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g189], tail63)], _g209)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g208;
      if (_g190) {
        _g208 = [lower(["set", e, _g190])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g189])], _g208));
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
      var _g210;
      if (x === "and") {
        _g210 = ["%if", id, b, id];
      } else {
        _g210 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g210], hoist));
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
    var _g191 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g191, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g192 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g192)) {
      return(_g192);
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
    var _g193 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g194 = _g193.all;
    var m = module(spec);
    var frame = last(environment);
    var _g195 = m.export;
    var k = undefined;
    for (k in _g195) {
      if (isNaN(parseInt(k))) {
        var v = _g195[k];
        if (v.export || _g194) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g196 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g197 = _g196.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g197}));
  };
  nexus["lumen/compiler"]["load-module"] = load_module;
  var in_module = function (spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  };
  nexus["lumen/compiler"]["in-module"] = in_module;
  var import_modules = function (specs) {
    var imports = [];
    var bindings = [];
    var _g198 = specs || [];
    var _g199 = 0;
    while (_g199 < length(_g198)) {
      var spec = _g198[_g199];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g200 = import_modules(m.alias);
        var aliased = _g200[0];
        var bs = _g200[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g201 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g201);
      }
      _g199 = _g199 + 1;
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
    var m = module(current_module);
    return(join(reduce(join, map(imported, m.import)), imported(current_module, {_stash: true, all: true})));
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
  var _g211 = nexus["lumen/runtime"];
  var nil63 = _g211["nil?"];
  var is63 = _g211["is?"];
  var length = _g211.length;
  var none63 = _g211["none?"];
  var some63 = _g211["some?"];
  var one63 = _g211["one?"];
  var hd = _g211.hd;
  var string63 = _g211["string?"];
  var number63 = _g211["number?"];
  var boolean63 = _g211["boolean?"];
  var function63 = _g211["function?"];
  var composite63 = _g211["composite?"];
  var atom63 = _g211["atom?"];
  var table63 = _g211["table?"];
  var list63 = _g211["list?"];
  var substring = _g211.substring;
  var sub = _g211.sub;
  var inner = _g211.inner;
  var tl = _g211.tl;
  var char = _g211.char;
  var code = _g211.code;
  var string_literal63 = _g211["string-literal?"];
  var id_literal63 = _g211["id-literal?"];
  var add = _g211.add;
  var drop = _g211.drop;
  var last = _g211.last;
  var reverse = _g211.reverse;
  var join = _g211.join;
  var reduce = _g211.reduce;
  var keep = _g211.keep;
  var in63 = _g211["in?"];
  var find = _g211.find;
  var pair = _g211.pair;
  var sort = _g211.sort;
  var iterate = _g211.iterate;
  var replicate = _g211.replicate;
  var map = _g211.map;
  var keys63 = _g211["keys?"];
  var empty63 = _g211["empty?"];
  var stash = _g211.stash;
  var unstash = _g211.unstash;
  var search = _g211.search;
  var split = _g211.split;
  var cat = _g211.cat;
  var _43 = _g211["+"];
  var _ = _g211["-"];
  var _42 = _g211["*"];
  var _47 = _g211["/"];
  var _37 = _g211["%"];
  var _62 = _g211[">"];
  var _60 = _g211["<"];
  var _61 = _g211["="];
  var _6261 = _g211[">="];
  var _6061 = _g211["<="];
  var read_file = _g211["read-file"];
  var write_file = _g211["write-file"];
  var write = _g211.write;
  var exit = _g211.exit;
  var today = _g211.today;
  var now = _g211.now;
  var number = _g211.number;
  var string = _g211.string;
  var space = _g211.space;
  var apply = _g211.apply;
  var make_id = _g211["make-id"];
  var _37message_handler = _g211["%message-handler"];
  var toplevel63 = _g211["toplevel?"];
  var module_key = _g211["module-key"];
  var module = _g211.module;
  var setenv = _g211.setenv;
  var _g214 = nexus["lumen/lib"];
  var getenv = _g214.getenv;
  var macro_function = _g214["macro-function"];
  var macro63 = _g214["macro?"];
  var special63 = _g214["special?"];
  var special_form63 = _g214["special-form?"];
  var statement63 = _g214["statement?"];
  var symbol_expansion = _g214["symbol-expansion"];
  var symbol63 = _g214["symbol?"];
  var variable63 = _g214["variable?"];
  var bound63 = _g214["bound?"];
  var quoted = _g214.quoted;
  var stash42 = _g214["stash*"];
  var bind = _g214.bind;
  var bind42 = _g214["bind*"];
  var quasiexpand = _g214.quasiexpand;
  var macroexpand = _g214.macroexpand;
  var indentation = _g214.indentation;
  var reserved63 = _g214["reserved?"];
  var valid_id63 = _g214["valid-id?"];
  var id = _g214.id;
  var key = _g214.key;
  var imported = _g214.imported;
  var link = _g214.link;
  var mapo = _g214.mapo;
  var quote_environment = _g214["quote-environment"];
  var quote_modules = _g214["quote-modules"];
  var initial_environment = _g214["initial-environment"];
  var _g215 = nexus["lumen/compiler"];
  var compile_function = _g215["compile-function"];
  var compile = _g215.compile;
  var open_module = _g215["open-module"];
  var load_module = _g215["load-module"];
  var in_module = _g215["in-module"];
  var import_modules = _g215["import-modules"];
  var compile_module = _g215["compile-module"];
  var declare = _g215.declare;
  var eval = _g215.eval;
})();
(function () {
  nexus["lumen/core"] = {};
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
  var _g392 = nexus["lumen/lib"];
  var getenv = _g392.getenv;
  var macro_function = _g392["macro-function"];
  var macro63 = _g392["macro?"];
  var special63 = _g392["special?"];
  var special_form63 = _g392["special-form?"];
  var statement63 = _g392["statement?"];
  var symbol_expansion = _g392["symbol-expansion"];
  var symbol63 = _g392["symbol?"];
  var variable63 = _g392["variable?"];
  var bound63 = _g392["bound?"];
  var quoted = _g392.quoted;
  var stash42 = _g392["stash*"];
  var bind = _g392.bind;
  var bind42 = _g392["bind*"];
  var quasiexpand = _g392.quasiexpand;
  var macroexpand = _g392.macroexpand;
  var indentation = _g392.indentation;
  var reserved63 = _g392["reserved?"];
  var valid_id63 = _g392["valid-id?"];
  var id = _g392.id;
  var key = _g392.key;
  var imported = _g392.imported;
  var link = _g392.link;
  var mapo = _g392.mapo;
  var quote_environment = _g392["quote-environment"];
  var quote_modules = _g392["quote-modules"];
  var initial_environment = _g392["initial-environment"];
  var _g393 = nexus["lumen/compiler"];
  var compile_function = _g393["compile-function"];
  var compile = _g393.compile;
  var open_module = _g393["open-module"];
  var load_module = _g393["load-module"];
  var in_module = _g393["in-module"];
  var import_modules = _g393["import-modules"];
  var compile_module = _g393["compile-module"];
  var declare = _g393.declare;
  var eval = _g393.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g702 = nexus["lumen/runtime"];
  var nil63 = _g702["nil?"];
  var is63 = _g702["is?"];
  var length = _g702.length;
  var none63 = _g702["none?"];
  var some63 = _g702["some?"];
  var one63 = _g702["one?"];
  var hd = _g702.hd;
  var string63 = _g702["string?"];
  var number63 = _g702["number?"];
  var boolean63 = _g702["boolean?"];
  var function63 = _g702["function?"];
  var composite63 = _g702["composite?"];
  var atom63 = _g702["atom?"];
  var table63 = _g702["table?"];
  var list63 = _g702["list?"];
  var substring = _g702.substring;
  var sub = _g702.sub;
  var inner = _g702.inner;
  var tl = _g702.tl;
  var char = _g702.char;
  var code = _g702.code;
  var string_literal63 = _g702["string-literal?"];
  var id_literal63 = _g702["id-literal?"];
  var add = _g702.add;
  var drop = _g702.drop;
  var last = _g702.last;
  var reverse = _g702.reverse;
  var join = _g702.join;
  var reduce = _g702.reduce;
  var keep = _g702.keep;
  var in63 = _g702["in?"];
  var find = _g702.find;
  var pair = _g702.pair;
  var sort = _g702.sort;
  var iterate = _g702.iterate;
  var replicate = _g702.replicate;
  var map = _g702.map;
  var keys63 = _g702["keys?"];
  var empty63 = _g702["empty?"];
  var stash = _g702.stash;
  var unstash = _g702.unstash;
  var search = _g702.search;
  var split = _g702.split;
  var cat = _g702.cat;
  var _43 = _g702["+"];
  var _ = _g702["-"];
  var _42 = _g702["*"];
  var _47 = _g702["/"];
  var _37 = _g702["%"];
  var _62 = _g702[">"];
  var _60 = _g702["<"];
  var _61 = _g702["="];
  var _6261 = _g702[">="];
  var _6061 = _g702["<="];
  var read_file = _g702["read-file"];
  var write_file = _g702["write-file"];
  var write = _g702.write;
  var exit = _g702.exit;
  var today = _g702.today;
  var now = _g702.now;
  var number = _g702.number;
  var string = _g702.string;
  var space = _g702.space;
  var apply = _g702.apply;
  var make_id = _g702["make-id"];
  var _37message_handler = _g702["%message-handler"];
  var toplevel63 = _g702["toplevel?"];
  var module_key = _g702["module-key"];
  var module = _g702.module;
  var setenv = _g702.setenv;
  var _g705 = nexus["lumen/lib"];
  var getenv = _g705.getenv;
  var macro_function = _g705["macro-function"];
  var macro63 = _g705["macro?"];
  var special63 = _g705["special?"];
  var special_form63 = _g705["special-form?"];
  var statement63 = _g705["statement?"];
  var symbol_expansion = _g705["symbol-expansion"];
  var symbol63 = _g705["symbol?"];
  var variable63 = _g705["variable?"];
  var bound63 = _g705["bound?"];
  var quoted = _g705.quoted;
  var stash42 = _g705["stash*"];
  var bind = _g705.bind;
  var bind42 = _g705["bind*"];
  var quasiexpand = _g705.quasiexpand;
  var macroexpand = _g705.macroexpand;
  var indentation = _g705.indentation;
  var reserved63 = _g705["reserved?"];
  var valid_id63 = _g705["valid-id?"];
  var id = _g705.id;
  var key = _g705.key;
  var imported = _g705.imported;
  var link = _g705.link;
  var mapo = _g705.mapo;
  var quote_environment = _g705["quote-environment"];
  var quote_modules = _g705["quote-modules"];
  var initial_environment = _g705["initial-environment"];
  var _g706 = nexus["lumen/compiler"];
  var compile_function = _g706["compile-function"];
  var compile = _g706.compile;
  var open_module = _g706["open-module"];
  var load_module = _g706["load-module"];
  var in_module = _g706["in-module"];
  var import_modules = _g706["import-modules"];
  var compile_module = _g706["compile-module"];
  var declare = _g706.declare;
  var eval = _g706.eval;
  global.modules = {"lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {export: true, tr: true, stmt: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g719 = forms;
    var _g720 = 0;
    while (_g720 < length(_g719)) {
      var x = _g719[_g720];
      str = str + compile(x, {_stash: true, stmt: true});
      _g720 = _g720 + 1;
    }
    return(str);
  }, foo: true}, "%if": {export: true, tr: true, stmt: true, special: function (cond, cons, alt) {
    var _g721 = compile(cond);
    indent_level = indent_level + 1;
    var _g723 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g722 = _g723;
    var _g790;
    if (alt) {
      indent_level = indent_level + 1;
      var _g725 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g790 = _g725;
    }
    var _g724 = _g790;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g721 + ") {\n" + _g722 + ind + "}";
    } else {
      str = str + ind + "if " + _g721 + " then\n" + _g722;
    }
    if (_g724 && target === "js") {
      str = str + " else {\n" + _g724 + ind + "}";
    } else {
      if (_g724) {
        str = str + ind + "else\n" + _g724;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true}, "while": {export: true, tr: true, stmt: true, special: function (cond, form) {
    var _g726 = compile(cond);
    indent_level = indent_level + 1;
    var _g727 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g727;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g726 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g726 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {export: true, tr: true, stmt: true, special: function (t, k, form) {
    var _g728 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g729 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g729;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g728 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g728 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {export: true, tr: true, stmt: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g730 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g730;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g731 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g731;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, foo: true}, "break": {export: true, special: function () {
    return(indentation() + "break");
  }, foo: true, stmt: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%global-function": {export: true, tr: true, stmt: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true}, "%local-function": {export: true, tr: true, stmt: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return(indentation() + x);
  }, foo: true}, "return": {export: true, special: function (x) {
    var _g791;
    if (nil63(x)) {
      _g791 = "return";
    } else {
      _g791 = "return(" + compile(x) + ")";
    }
    var _g732 = _g791;
    return(indentation() + _g732);
  }, foo: true, stmt: true}, error: {export: true, special: function (x) {
    var _g792;
    if (target === "js") {
      _g792 = "throw new " + compile(["Error", x]);
    } else {
      _g792 = "error(" + compile(x) + ")";
    }
    var e = _g792;
    return(indentation() + e);
  }, foo: true, stmt: true}, "%local": {export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g793;
    if (is63(value)) {
      _g793 = " = " + value1;
    } else {
      _g793 = "";
    }
    var rh = _g793;
    var _g794;
    if (target === "js") {
      _g794 = "var ";
    } else {
      _g794 = "local ";
    }
    var keyword = _g794;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, stmt: true}, set: {export: true, special: function (lh, rh) {
    var _g733 = compile(lh);
    var _g795;
    if (nil63(rh)) {
      _g795 = "nil";
    } else {
      _g795 = rh;
    }
    var _g734 = compile(_g795);
    return(indentation() + _g733 + " = " + _g734);
  }, foo: true, stmt: true}, get: {export: true, special: function (t, k) {
    var _g735 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g735, 0) === "{") {
      _g735 = "(" + _g735 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g735 + "." + inner(k));
    } else {
      return(_g735 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g796;
    if (target === "lua") {
      _g796 = "{";
    } else {
      _g796 = "[";
    }
    var open = _g796;
    var _g797;
    if (target === "lua") {
      _g797 = "}";
    } else {
      _g797 = "]";
    }
    var close = _g797;
    var str = "";
    var _g736 = forms;
    var i = 0;
    while (i < length(_g736)) {
      var x = _g736[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true}, "%object": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g798;
    if (target === "lua") {
      _g798 = " = ";
    } else {
      _g798 = ": ";
    }
    var sep = _g798;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g737 = pairs;
    var i = 0;
    while (i < length(_g737)) {
      var _g738 = _g737[i];
      var k = _g738[0];
      var v = _g738[1];
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
  }, foo: true}}}, lumen: {import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, user: {import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {}}, "lumen/main": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]], export: {}}, "lumen/lib": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g739) {
    var char = _g739[0];
    var stream = _g739[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g740 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g740)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, shift: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
      var _g741 = body;
      var k = undefined;
      for (k in _g741) {
        if (isNaN(parseInt(k))) {
          var v = _g741[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g742) {
      var a = _g742[0];
      var b = _g742[1];
      var c = sub(_g742, 2);
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
    var _g743 = sub(body, 0);
    return(["if", cond, join(["do"], _g743)]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g744 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g744)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g745 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g745));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g746 = bind(lh, rh);
      var _g747 = 0;
      while (_g747 < length(_g746)) {
        var _g748 = _g746[_g747];
        var id = _g748[0];
        var val = _g748[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g747 = _g747 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g745)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g749 = sub(body, 0);
    var imp = _g749.import;
    var exp = _g749.export;
    var alias = _g749.alias;
    var _g750 = import_modules(imp);
    var imports = _g750[0];
    var bindings = _g750[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g751 = exp || [];
    var _g752 = 0;
    while (_g752 < length(_g751)) {
      var x = _g751[_g752];
      setenv(x, {_stash: true, export: true});
      _g752 = _g752 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g753 = sub(body, 0);
    var form = join(["fn", args], _g753);
    var _g754 = ["setenv", ["quote", name]];
    _g754.macro = form;
    _g754.form = ["quote", form];
    eval(_g754);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g755 = sub(body, 0);
    var form = join(["fn", args], _g755);
    var keys = sub(_g755, length(_g755));
    var _g756 = ["setenv", ["quote", name]];
    _g756.special = form;
    _g756.form = ["quote", form];
    eval(join(_g756, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g757 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g757)) {
      var _g758 = bind42(x, _g757);
      var args = _g758[0];
      var _g759 = _g758[1];
      return(join(["%global-function", name, args], _g759));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g760 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g760) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g760)]));
    } else {
      if (some63(_g760)) {
        var _g761 = bind42(x, _g760);
        var args = _g761[0];
        var _g762 = _g761[1];
        return(link(name, join(["%local-function", name, args], _g762)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g763) {
    var names = _g763[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g764 = sub(body, 0);
    var x = make_id();
    var _g766 = ["setenv", x];
    _g766.variable = true;
    var _g765 = ["with-frame", ["each", [x], names, _g766]];
    _g765.scope = true;
    return(join(_g765, _g764));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g767 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g768 = join(["do"], macroexpand(_g767));
    drop(environment);
    return(_g768);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g769 = sub(body, 0);
    add(environment, {});
    map(function (_g771) {
      var name = _g771[0];
      var exp = _g771[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g770 = join(["do"], macroexpand(_g769));
    drop(environment);
    return(_g770);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g772 = sub(body, 0);
    var _g773 = bind42(args, _g772);
    var _g774 = _g773[0];
    var _g775 = _g773[1];
    return(join(["%function", _g774], _g775));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g776, t) {
    var k = _g776[0];
    var v = _g776[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g777 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g799;
    if (target === "lua") {
      _g799 = _g777;
    } else {
      _g799 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g777)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g799)]]);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g778 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g800;
    if (nil63(v)) {
      var _g801;
      if (b.i) {
        _g801 = "i";
      } else {
        _g801 = make_id();
      }
      var i = _g801;
      _g800 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g778), ["inc", i]]];
    } else {
      var _g779 = ["target"];
      _g779.js = ["isNaN", ["parseInt", k]];
      _g779.lua = ["not", ["number?", k]];
      _g800 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g779, join(["let", [v, ["get", t1, k]]], _g778)]]];
    }
    return(["let", [t1, t], _g800]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g780 = xs;
    var _g781 = 0;
    while (_g781 < length(_g780)) {
      var x = _g780[_g781];
      l[x] = true;
      _g781 = _g781 + 1;
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
    var _g782 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g782)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g783 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g783)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g784 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g785 = ["table"];
    _g785._scope = scope;
    return(["do", ["add", "environment", _g785], ["let", [x, join(["do"], _g784)], ["drop", "environment"], x]]);
  }}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g786 = sub(body, 0);
    var imp = _g786.import;
    var exp = _g786.export;
    var alias = _g786.alias;
    var _g787 = import_modules(imp);
    var imports = _g787[0];
    var bindings = _g787[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g788 = exp || [];
    var _g789 = 0;
    while (_g789 < length(_g788)) {
      var x = _g788[_g789];
      setenv(x, {_stash: true, export: true});
      _g789 = _g789 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g802 = nexus["lumen/runtime"];
  var nil63 = _g802["nil?"];
  var is63 = _g802["is?"];
  var length = _g802.length;
  var none63 = _g802["none?"];
  var some63 = _g802["some?"];
  var one63 = _g802["one?"];
  var hd = _g802.hd;
  var string63 = _g802["string?"];
  var number63 = _g802["number?"];
  var boolean63 = _g802["boolean?"];
  var function63 = _g802["function?"];
  var composite63 = _g802["composite?"];
  var atom63 = _g802["atom?"];
  var table63 = _g802["table?"];
  var list63 = _g802["list?"];
  var substring = _g802.substring;
  var sub = _g802.sub;
  var inner = _g802.inner;
  var tl = _g802.tl;
  var char = _g802.char;
  var code = _g802.code;
  var string_literal63 = _g802["string-literal?"];
  var id_literal63 = _g802["id-literal?"];
  var add = _g802.add;
  var drop = _g802.drop;
  var last = _g802.last;
  var reverse = _g802.reverse;
  var join = _g802.join;
  var reduce = _g802.reduce;
  var keep = _g802.keep;
  var in63 = _g802["in?"];
  var find = _g802.find;
  var pair = _g802.pair;
  var sort = _g802.sort;
  var iterate = _g802.iterate;
  var replicate = _g802.replicate;
  var map = _g802.map;
  var keys63 = _g802["keys?"];
  var empty63 = _g802["empty?"];
  var stash = _g802.stash;
  var unstash = _g802.unstash;
  var search = _g802.search;
  var split = _g802.split;
  var cat = _g802.cat;
  var _43 = _g802["+"];
  var _ = _g802["-"];
  var _42 = _g802["*"];
  var _47 = _g802["/"];
  var _37 = _g802["%"];
  var _62 = _g802[">"];
  var _60 = _g802["<"];
  var _61 = _g802["="];
  var _6261 = _g802[">="];
  var _6061 = _g802["<="];
  var read_file = _g802["read-file"];
  var write_file = _g802["write-file"];
  var write = _g802.write;
  var exit = _g802.exit;
  var today = _g802.today;
  var now = _g802.now;
  var number = _g802.number;
  var string = _g802.string;
  var space = _g802.space;
  var apply = _g802.apply;
  var make_id = _g802["make-id"];
  var _37message_handler = _g802["%message-handler"];
  var toplevel63 = _g802["toplevel?"];
  var module_key = _g802["module-key"];
  var module = _g802.module;
  var setenv = _g802.setenv;
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
    var _g805 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g807) {
        return([false, _g807.message]);
      }
    })();
    var _g1 = _g805[0];
    var x = _g805[1];
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
    var _g806 = args;
    var i = 0;
    while (i < length(_g806)) {
      var arg = _g806[i];
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
