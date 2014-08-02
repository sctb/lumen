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
      var _g56;
      if (nil63(from) || from < 0) {
        _g56 = 0;
      } else {
        _g56 = from;
      }
      var i = _g56;
      var n = length(x);
      var _g57;
      if (nil63(upto) || upto > n) {
        _g57 = n;
      } else {
        _g57 = upto;
      }
      var _g23 = _g57;
      while (i < _g23) {
        l[j] = x[i];
        i = i + 1;
        j = j + 1;
      }
      var _g24 = x;
      var k = undefined;
      for (k in _g24) {
        if (isNaN(parseInt(k))) {
          var v = _g24[k];
          l[k] = v;
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
      var _g25 = a;
      var k = undefined;
      for (k in _g25) {
        var v = _g25[k];
        var _g26 = parseInt(k);
        var _g58;
        if (isNaN(_g26)) {
          _g58 = k;
        } else {
          _g58 = _g26;
        }
        var _g27 = _g58;
        c[_g27] = v;
      }
      var _g28 = b;
      var k = undefined;
      for (k in _g28) {
        var v = _g28[k];
        var _g29 = parseInt(k);
        var _g59;
        if (isNaN(_g29)) {
          _g59 = k;
        } else {
          _g59 = _g29;
        }
        var _g30 = _g59;
        if (number63(_g30)) {
          _g30 = _g30 + o;
        }
        c[_g30] = v;
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
  var keep = function (f, l) {
    var l1 = [];
    var _g31 = l;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var x = _g31[_g32];
      if (f(x)) {
        add(l1, x);
      }
      _g32 = _g32 + 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, l) {
    var _g33 = l;
    var _g34 = 0;
    while (_g34 < length(_g33)) {
      var y = _g33[_g34];
      if (x === y) {
        return(true);
      }
      _g34 = _g34 + 1;
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, l) {
    var _g35 = l;
    var _g36 = 0;
    while (_g36 < length(_g35)) {
      var x = _g35[_g36];
      var _g37 = f(x);
      if (_g37) {
        return(_g37);
      }
      _g36 = _g36 + 1;
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
    var _g60;
    if (f) {
      _g60 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g60));
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
    var _g38 = t;
    var _g39 = 0;
    while (_g39 < length(_g38)) {
      var x = _g38[_g39];
      var _g40 = f(x);
      if (is63(_g40)) {
        add(t1, _g40);
      }
      _g39 = _g39 + 1;
    }
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
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
    var _g42 = t;
    var k = undefined;
    for (k in _g42) {
      if (isNaN(parseInt(k))) {
        var v = _g42[k];
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
      var _g43 = args;
      var k = undefined;
      for (k in _g43) {
        if (isNaN(parseInt(k))) {
          var v = _g43[k];
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
        var _g44 = l;
        var k = undefined;
        for (k in _g44) {
          if (isNaN(parseInt(k))) {
            var v = _g44[k];
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
    var _g45 = sub(xs, 0);
    if (none63(_g45)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g45));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g46));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g47)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g48 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g48));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g49)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g50)));
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
            var _g51 = x;
            var k = undefined;
            for (k in _g51) {
              if (isNaN(parseInt(k))) {
                var v = _g51[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g52 = x1;
            var i = 0;
            while (i < length(_g52)) {
              var y = _g52[i];
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
    var _g53 = stash(args);
    return(f.apply(f, _g53));
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
    var _g54 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g55 = _g54;
      var k1 = undefined;
      for (k1 in _g55) {
        if (isNaN(parseInt(k1))) {
          var v = _g55[k1];
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
  var _g64 = nexus["lumen/runtime"];
  var nil63 = _g64["nil?"];
  var is63 = _g64["is?"];
  var length = _g64.length;
  var none63 = _g64["none?"];
  var some63 = _g64["some?"];
  var one63 = _g64["one?"];
  var hd = _g64.hd;
  var string63 = _g64["string?"];
  var number63 = _g64["number?"];
  var boolean63 = _g64["boolean?"];
  var function63 = _g64["function?"];
  var composite63 = _g64["composite?"];
  var atom63 = _g64["atom?"];
  var table63 = _g64["table?"];
  var list63 = _g64["list?"];
  var substring = _g64.substring;
  var sub = _g64.sub;
  var inner = _g64.inner;
  var tl = _g64.tl;
  var char = _g64.char;
  var code = _g64.code;
  var string_literal63 = _g64["string-literal?"];
  var id_literal63 = _g64["id-literal?"];
  var add = _g64.add;
  var drop = _g64.drop;
  var last = _g64.last;
  var reverse = _g64.reverse;
  var join = _g64.join;
  var reduce = _g64.reduce;
  var keep = _g64.keep;
  var in63 = _g64["in?"];
  var find = _g64.find;
  var pair = _g64.pair;
  var sort = _g64.sort;
  var iterate = _g64.iterate;
  var replicate = _g64.replicate;
  var map = _g64.map;
  var keys63 = _g64["keys?"];
  var empty63 = _g64["empty?"];
  var stash = _g64.stash;
  var unstash = _g64.unstash;
  var search = _g64.search;
  var split = _g64.split;
  var cat = _g64.cat;
  var _43 = _g64["+"];
  var _ = _g64["-"];
  var _42 = _g64["*"];
  var _47 = _g64["/"];
  var _37 = _g64["%"];
  var _62 = _g64[">"];
  var _60 = _g64["<"];
  var _61 = _g64["="];
  var _6261 = _g64[">="];
  var _6061 = _g64["<="];
  var read_file = _g64["read-file"];
  var write_file = _g64["write-file"];
  var write = _g64.write;
  var exit = _g64.exit;
  var today = _g64.today;
  var now = _g64.now;
  var number = _g64.number;
  var string = _g64.string;
  var space = _g64.space;
  var apply = _g64.apply;
  var make_id = _g64["make-id"];
  var _37message_handler = _g64["%message-handler"];
  var toplevel63 = _g64["toplevel?"];
  var module_key = _g64["module-key"];
  var module = _g64.module;
  var setenv = _g64.setenv;
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
      var _g102;
      if (c === "\n") {
        _g102 = "\\n";
      } else {
        var _g103;
        if (c === "\"") {
          _g103 = "\\\"";
        } else {
          var _g104;
          if (c === "\\") {
            _g104 = "\\\\";
          } else {
            _g104 = c;
          }
          _g103 = _g104;
        }
        _g102 = _g103;
      }
      var c1 = _g102;
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
      var _g67 = args;
      var k = undefined;
      for (k in _g67) {
        if (isNaN(parseInt(k))) {
          var v = _g67[k];
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
        var _g68 = lh;
        var i = 0;
        while (i < length(_g68)) {
          var x = _g68[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g69 = lh;
        var k = undefined;
        for (k in _g69) {
          if (isNaN(parseInt(k))) {
            var v = _g69[k];
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
      var _g70 = args;
      var _g71 = 0;
      while (_g71 < length(_g70)) {
        var arg = _g70[_g71];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g71 = _g71 + 1;
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
          var _g61 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g62 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g74 = args;
            var _g75 = 0;
            while (_g75 < length(_g74)) {
              var _g72 = _g74[_g75];
              setenv(_g72, {_stash: true, variable: true});
              _g75 = _g75 + 1;
            }
            var _g73 = join(["%function", map(macroexpand, args)], macroexpand(body));
            drop(environment);
            return(_g73);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g63 = form[0];
              var _g76 = form[1];
              var _g77 = form[2];
              var _g78 = sub(form, 3);
              add(environment, {_scope: true});
              var _g81 = _g77;
              var _g82 = 0;
              while (_g82 < length(_g81)) {
                var _g79 = _g81[_g82];
                setenv(_g79, {_stash: true, variable: true});
                _g82 = _g82 + 1;
              }
              var _g80 = join([x, _g76, map(macroexpand, _g77)], macroexpand(_g78));
              drop(environment);
              return(_g80);
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
    var _g83 = form;
    var k = undefined;
    for (k in _g83) {
      if (isNaN(parseInt(k))) {
        var v = _g83[k];
        var _g105;
        if (quasisplice63(v, depth)) {
          _g105 = quasiexpand(v[1]);
        } else {
          _g105 = quasiexpand(v, depth);
        }
        var _g84 = _g105;
        last(xs)[k] = _g84;
      }
    }
    var _g85 = form;
    var _g86 = 0;
    while (_g86 < length(_g85)) {
      var x = _g85[_g86];
      if (quasisplice63(x, depth)) {
        var _g87 = quasiexpand(x[1]);
        add(xs, _g87);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g86 = _g86 + 1;
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
      var _g106;
      if (c === "-") {
        _g106 = "_";
      } else {
        var _g107;
        if (valid_code63(n)) {
          _g107 = c;
        } else {
          var _g108;
          if (i === 0) {
            _g108 = "_" + n;
          } else {
            _g108 = n;
          }
          _g107 = _g108;
        }
        _g106 = _g107;
      }
      var c1 = _g106;
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
    var _g92 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g93 = _g92.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g94 = module(spec).export;
      var n = undefined;
      for (n in _g94) {
        if (isNaN(parseInt(n))) {
          var b = _g94[n];
          if (b.variable && (_g93 || b.export)) {
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
    var _g95 = sub(xs, 0);
    return(join(t, _g95));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g96 = sub(keys, 0);
    var t1 = [];
    var _g97 = t;
    var _g98 = 0;
    while (_g98 < length(_g97)) {
      var x = _g97[_g98];
      add(t1, x);
      _g98 = _g98 + 1;
    }
    var _g99 = t;
    var k = undefined;
    for (k in _g99) {
      if (isNaN(parseInt(k))) {
        var v = _g99[k];
        if (!_g96[k]) {
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
    var _g100 = t;
    var k = undefined;
    for (k in _g100) {
      if (isNaN(parseInt(k))) {
        var v = _g100[k];
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
    var _g101 = ["table"];
    _g101.import = quoted(m.import);
    _g101.alias = quoted(m.alias);
    _g101.export = quote_frame(m.export);
    return(_g101);
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
  var _g109 = nexus["lumen/runtime"];
  var nil63 = _g109["nil?"];
  var is63 = _g109["is?"];
  var length = _g109.length;
  var none63 = _g109["none?"];
  var some63 = _g109["some?"];
  var one63 = _g109["one?"];
  var hd = _g109.hd;
  var string63 = _g109["string?"];
  var number63 = _g109["number?"];
  var boolean63 = _g109["boolean?"];
  var function63 = _g109["function?"];
  var composite63 = _g109["composite?"];
  var atom63 = _g109["atom?"];
  var table63 = _g109["table?"];
  var list63 = _g109["list?"];
  var substring = _g109.substring;
  var sub = _g109.sub;
  var inner = _g109.inner;
  var tl = _g109.tl;
  var char = _g109.char;
  var code = _g109.code;
  var string_literal63 = _g109["string-literal?"];
  var id_literal63 = _g109["id-literal?"];
  var add = _g109.add;
  var drop = _g109.drop;
  var last = _g109.last;
  var reverse = _g109.reverse;
  var join = _g109.join;
  var reduce = _g109.reduce;
  var keep = _g109.keep;
  var in63 = _g109["in?"];
  var find = _g109.find;
  var pair = _g109.pair;
  var sort = _g109.sort;
  var iterate = _g109.iterate;
  var replicate = _g109.replicate;
  var map = _g109.map;
  var keys63 = _g109["keys?"];
  var empty63 = _g109["empty?"];
  var stash = _g109.stash;
  var unstash = _g109.unstash;
  var search = _g109.search;
  var split = _g109.split;
  var cat = _g109.cat;
  var _43 = _g109["+"];
  var _ = _g109["-"];
  var _42 = _g109["*"];
  var _47 = _g109["/"];
  var _37 = _g109["%"];
  var _62 = _g109[">"];
  var _60 = _g109["<"];
  var _61 = _g109["="];
  var _6261 = _g109[">="];
  var _6061 = _g109["<="];
  var read_file = _g109["read-file"];
  var write_file = _g109["write-file"];
  var write = _g109.write;
  var exit = _g109.exit;
  var today = _g109.today;
  var now = _g109.now;
  var number = _g109.number;
  var string = _g109.string;
  var space = _g109.space;
  var apply = _g109.apply;
  var make_id = _g109["make-id"];
  var _37message_handler = _g109["%message-handler"];
  var toplevel63 = _g109["toplevel?"];
  var module_key = _g109["module-key"];
  var module = _g109.module;
  var setenv = _g109.setenv;
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
  var _g123 = nexus["lumen/lib"];
  var getenv = _g123.getenv;
  var macro_function = _g123["macro-function"];
  var macro63 = _g123["macro?"];
  var special63 = _g123["special?"];
  var special_form63 = _g123["special-form?"];
  var statement63 = _g123["statement?"];
  var symbol_expansion = _g123["symbol-expansion"];
  var symbol63 = _g123["symbol?"];
  var variable63 = _g123["variable?"];
  var bound63 = _g123["bound?"];
  var quoted = _g123.quoted;
  var stash42 = _g123["stash*"];
  var bind = _g123.bind;
  var bind42 = _g123["bind*"];
  var quasiexpand = _g123.quasiexpand;
  var macroexpand = _g123.macroexpand;
  var indentation = _g123.indentation;
  var reserved63 = _g123["reserved?"];
  var valid_id63 = _g123["valid-id?"];
  var id = _g123.id;
  var key = _g123.key;
  var imported = _g123.imported;
  var link = _g123.link;
  var mapo = _g123.mapo;
  var quote_environment = _g123["quote-environment"];
  var quote_modules = _g123["quote-modules"];
  var initial_environment = _g123["initial-environment"];
  var _g124 = nexus["lumen/reader"];
  var make_stream = _g124["make-stream"];
  var read_table = _g124["read-table"];
  var read = _g124.read;
  var read_all = _g124["read-all"];
  var read_from_string = _g124["read-from-string"];
  var _g128 = [];
  _g128.js = "!";
  _g128.lua = "not ";
  var _g126 = [];
  var _g129 = [];
  _g129.js = "!";
  _g129.lua = "not ";
  _g126["not"] = _g129;
  var _g131 = [];
  _g131["*"] = true;
  _g131["/"] = true;
  _g131["%"] = true;
  var _g133 = [];
  _g133["+"] = true;
  _g133["-"] = true;
  var _g137 = [];
  _g137.js = "+";
  _g137.lua = "..";
  var _g135 = [];
  var _g138 = [];
  _g138.js = "+";
  _g138.lua = "..";
  _g135.cat = _g138;
  var _g140 = [];
  _g140["<"] = true;
  _g140[">"] = true;
  _g140["<="] = true;
  _g140[">="] = true;
  var _g144 = [];
  _g144.js = "===";
  _g144.lua = "==";
  var _g146 = [];
  _g146.js = "!=";
  _g146.lua = "~=";
  var _g142 = [];
  var _g147 = [];
  _g147.js = "===";
  _g147.lua = "==";
  _g142["="] = _g147;
  var _g148 = [];
  _g148.js = "!=";
  _g148.lua = "~=";
  _g142["~="] = _g148;
  var _g152 = [];
  _g152.js = "&&";
  _g152.lua = "and";
  var _g150 = [];
  var _g153 = [];
  _g153.js = "&&";
  _g153.lua = "and";
  _g150["and"] = _g153;
  var _g157 = [];
  _g157.js = "||";
  _g157.lua = "or";
  var _g155 = [];
  var _g158 = [];
  _g158.js = "||";
  _g158.lua = "or";
  _g155["or"] = _g158;
  var infix = [_g126, _g131, _g133, _g135, _g140, _g142, _g150, _g155];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g159 = infix;
      var i = 0;
      while (i < length(_g159)) {
        var level = _g159[i];
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
    var _g160 = args;
    var i = 0;
    while (i < length(_g160)) {
      var arg = _g160[i];
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
    var _g161 = getenv(x);
    var special = _g161.special;
    var stmt = _g161.stmt;
    var self_tr63 = _g161.tr;
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
    var _g162 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g162.right;
    var _g191;
    if (right) {
      _g191 = _6261;
    } else {
      _g191 = _62;
    }
    if (_g191(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g163 = sub(form, 1);
    var a = _g163[0];
    var b = _g163[1];
    var _g164 = op_delims(form, a);
    var ao = _g164[0];
    var ac = _g164[1];
    var _g165 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g165[0];
    var bc = _g165[1];
    var _g166 = compile(a);
    var _g167 = compile(b);
    var _g168 = getop(op);
    if (unary63(form)) {
      return(_g168 + ao + _g166 + ac);
    } else {
      return(ao + _g166 + ac + " " + _g168 + " " + bo + _g167 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g169 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g169.name;
    var prefix = _g169.prefix;
    var _g192;
    if (name) {
      _g192 = compile(name);
    } else {
      _g192 = "";
    }
    var id = _g192;
    var _g170 = prefix || "";
    var _g171 = compile_args(args);
    indent_level = indent_level + 1;
    var _g173 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g172 = _g173;
    var ind = indentation();
    var _g193;
    if (target === "js") {
      _g193 = "";
    } else {
      _g193 = "end";
    }
    var tr = _g193;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g171 + " {\n" + _g172 + ind + "}" + tr);
    } else {
      return(_g170 + "function " + id + _g171 + "\n" + _g172 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g174 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g174.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g194;
        if (stmt) {
          _g194 = indentation();
        } else {
          _g194 = "";
        }
        var ind = _g194;
        var _g195;
        if (atom63(form)) {
          _g195 = compile_atom(form);
        } else {
          var _g196;
          if (infix63(hd(form))) {
            _g196 = compile_infix(form);
          } else {
            _g196 = compile_call(form);
          }
          _g195 = _g196;
        }
        var _g175 = _g195;
        return(ind + _g175 + tr);
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
    var _g176 = sub(args, 0, length(args) - 1);
    var _g177 = 0;
    while (_g177 < length(_g176)) {
      var x = _g176[_g177];
      add(hoist, lower(x, hoist, stmt63));
      _g177 = _g177 + 1;
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
    var _g178 = args[1];
    var _g179 = args[2];
    if (stmt63 || tail63) {
      var _g198;
      if (_g179) {
        _g198 = [lower_body([_g179], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g178], tail63)], _g198)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g197;
      if (_g179) {
        _g197 = [lower(["set", e, _g179])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g178])], _g197));
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
      var _g199;
      if (x === "and") {
        _g199 = ["%if", id, b, id];
      } else {
        _g199 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g199], hoist));
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
    var _g180 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g180, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g181 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g181)) {
      return(_g181);
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
    var _g182 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g183 = _g182.all;
    var m = module(spec);
    var frame = last(environment);
    var _g184 = m.export;
    var k = undefined;
    for (k in _g184) {
      if (isNaN(parseInt(k))) {
        var v = _g184[k];
        if (v.export || _g183) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g185 = unstash(Array.prototype.slice.call(arguments, 1));
    var _g186 = _g185.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: _g186}));
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
    var _g187 = specs || [];
    var _g188 = 0;
    while (_g188 < length(_g187)) {
      var spec = _g187[_g188];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g189 = import_modules(m.alias);
        var aliased = _g189[0];
        var bs = _g189[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g190 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g190);
      }
      _g188 = _g188 + 1;
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
  var _g200 = nexus["lumen/runtime"];
  var nil63 = _g200["nil?"];
  var is63 = _g200["is?"];
  var length = _g200.length;
  var none63 = _g200["none?"];
  var some63 = _g200["some?"];
  var one63 = _g200["one?"];
  var hd = _g200.hd;
  var string63 = _g200["string?"];
  var number63 = _g200["number?"];
  var boolean63 = _g200["boolean?"];
  var function63 = _g200["function?"];
  var composite63 = _g200["composite?"];
  var atom63 = _g200["atom?"];
  var table63 = _g200["table?"];
  var list63 = _g200["list?"];
  var substring = _g200.substring;
  var sub = _g200.sub;
  var inner = _g200.inner;
  var tl = _g200.tl;
  var char = _g200.char;
  var code = _g200.code;
  var string_literal63 = _g200["string-literal?"];
  var id_literal63 = _g200["id-literal?"];
  var add = _g200.add;
  var drop = _g200.drop;
  var last = _g200.last;
  var reverse = _g200.reverse;
  var join = _g200.join;
  var reduce = _g200.reduce;
  var keep = _g200.keep;
  var in63 = _g200["in?"];
  var find = _g200.find;
  var pair = _g200.pair;
  var sort = _g200.sort;
  var iterate = _g200.iterate;
  var replicate = _g200.replicate;
  var map = _g200.map;
  var keys63 = _g200["keys?"];
  var empty63 = _g200["empty?"];
  var stash = _g200.stash;
  var unstash = _g200.unstash;
  var search = _g200.search;
  var split = _g200.split;
  var cat = _g200.cat;
  var _43 = _g200["+"];
  var _ = _g200["-"];
  var _42 = _g200["*"];
  var _47 = _g200["/"];
  var _37 = _g200["%"];
  var _62 = _g200[">"];
  var _60 = _g200["<"];
  var _61 = _g200["="];
  var _6261 = _g200[">="];
  var _6061 = _g200["<="];
  var read_file = _g200["read-file"];
  var write_file = _g200["write-file"];
  var write = _g200.write;
  var exit = _g200.exit;
  var today = _g200.today;
  var now = _g200.now;
  var number = _g200.number;
  var string = _g200.string;
  var space = _g200.space;
  var apply = _g200.apply;
  var make_id = _g200["make-id"];
  var _37message_handler = _g200["%message-handler"];
  var toplevel63 = _g200["toplevel?"];
  var module_key = _g200["module-key"];
  var module = _g200.module;
  var setenv = _g200.setenv;
  var _g203 = nexus["lumen/lib"];
  var getenv = _g203.getenv;
  var macro_function = _g203["macro-function"];
  var macro63 = _g203["macro?"];
  var special63 = _g203["special?"];
  var special_form63 = _g203["special-form?"];
  var statement63 = _g203["statement?"];
  var symbol_expansion = _g203["symbol-expansion"];
  var symbol63 = _g203["symbol?"];
  var variable63 = _g203["variable?"];
  var bound63 = _g203["bound?"];
  var quoted = _g203.quoted;
  var stash42 = _g203["stash*"];
  var bind = _g203.bind;
  var bind42 = _g203["bind*"];
  var quasiexpand = _g203.quasiexpand;
  var macroexpand = _g203.macroexpand;
  var indentation = _g203.indentation;
  var reserved63 = _g203["reserved?"];
  var valid_id63 = _g203["valid-id?"];
  var id = _g203.id;
  var key = _g203.key;
  var imported = _g203.imported;
  var link = _g203.link;
  var mapo = _g203.mapo;
  var quote_environment = _g203["quote-environment"];
  var quote_modules = _g203["quote-modules"];
  var initial_environment = _g203["initial-environment"];
  var _g204 = nexus["lumen/compiler"];
  var compile_function = _g204["compile-function"];
  var compile = _g204.compile;
  var open_module = _g204["open-module"];
  var load_module = _g204["load-module"];
  var in_module = _g204["in-module"];
  var import_modules = _g204["import-modules"];
  var compile_module = _g204["compile-module"];
  var declare = _g204.declare;
  var eval = _g204.eval;
})();
(function () {
  nexus["lumen/core"] = {};
  var _g378 = nexus["lumen/runtime"];
  var nil63 = _g378["nil?"];
  var is63 = _g378["is?"];
  var length = _g378.length;
  var none63 = _g378["none?"];
  var some63 = _g378["some?"];
  var one63 = _g378["one?"];
  var hd = _g378.hd;
  var string63 = _g378["string?"];
  var number63 = _g378["number?"];
  var boolean63 = _g378["boolean?"];
  var function63 = _g378["function?"];
  var composite63 = _g378["composite?"];
  var atom63 = _g378["atom?"];
  var table63 = _g378["table?"];
  var list63 = _g378["list?"];
  var substring = _g378.substring;
  var sub = _g378.sub;
  var inner = _g378.inner;
  var tl = _g378.tl;
  var char = _g378.char;
  var code = _g378.code;
  var string_literal63 = _g378["string-literal?"];
  var id_literal63 = _g378["id-literal?"];
  var add = _g378.add;
  var drop = _g378.drop;
  var last = _g378.last;
  var reverse = _g378.reverse;
  var join = _g378.join;
  var reduce = _g378.reduce;
  var keep = _g378.keep;
  var in63 = _g378["in?"];
  var find = _g378.find;
  var pair = _g378.pair;
  var sort = _g378.sort;
  var iterate = _g378.iterate;
  var replicate = _g378.replicate;
  var map = _g378.map;
  var keys63 = _g378["keys?"];
  var empty63 = _g378["empty?"];
  var stash = _g378.stash;
  var unstash = _g378.unstash;
  var search = _g378.search;
  var split = _g378.split;
  var cat = _g378.cat;
  var _43 = _g378["+"];
  var _ = _g378["-"];
  var _42 = _g378["*"];
  var _47 = _g378["/"];
  var _37 = _g378["%"];
  var _62 = _g378[">"];
  var _60 = _g378["<"];
  var _61 = _g378["="];
  var _6261 = _g378[">="];
  var _6061 = _g378["<="];
  var read_file = _g378["read-file"];
  var write_file = _g378["write-file"];
  var write = _g378.write;
  var exit = _g378.exit;
  var today = _g378.today;
  var now = _g378.now;
  var number = _g378.number;
  var string = _g378.string;
  var space = _g378.space;
  var apply = _g378.apply;
  var make_id = _g378["make-id"];
  var _37message_handler = _g378["%message-handler"];
  var toplevel63 = _g378["toplevel?"];
  var module_key = _g378["module-key"];
  var module = _g378.module;
  var setenv = _g378.setenv;
  var _g381 = nexus["lumen/lib"];
  var getenv = _g381.getenv;
  var macro_function = _g381["macro-function"];
  var macro63 = _g381["macro?"];
  var special63 = _g381["special?"];
  var special_form63 = _g381["special-form?"];
  var statement63 = _g381["statement?"];
  var symbol_expansion = _g381["symbol-expansion"];
  var symbol63 = _g381["symbol?"];
  var variable63 = _g381["variable?"];
  var bound63 = _g381["bound?"];
  var quoted = _g381.quoted;
  var stash42 = _g381["stash*"];
  var bind = _g381.bind;
  var bind42 = _g381["bind*"];
  var quasiexpand = _g381.quasiexpand;
  var macroexpand = _g381.macroexpand;
  var indentation = _g381.indentation;
  var reserved63 = _g381["reserved?"];
  var valid_id63 = _g381["valid-id?"];
  var id = _g381.id;
  var key = _g381.key;
  var imported = _g381.imported;
  var link = _g381.link;
  var mapo = _g381.mapo;
  var quote_environment = _g381["quote-environment"];
  var quote_modules = _g381["quote-modules"];
  var initial_environment = _g381["initial-environment"];
  var _g382 = nexus["lumen/compiler"];
  var compile_function = _g382["compile-function"];
  var compile = _g382.compile;
  var open_module = _g382["open-module"];
  var load_module = _g382["load-module"];
  var in_module = _g382["in-module"];
  var import_modules = _g382["import-modules"];
  var compile_module = _g382["compile-module"];
  var declare = _g382.declare;
  var eval = _g382.eval;
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g691 = nexus["lumen/runtime"];
  var nil63 = _g691["nil?"];
  var is63 = _g691["is?"];
  var length = _g691.length;
  var none63 = _g691["none?"];
  var some63 = _g691["some?"];
  var one63 = _g691["one?"];
  var hd = _g691.hd;
  var string63 = _g691["string?"];
  var number63 = _g691["number?"];
  var boolean63 = _g691["boolean?"];
  var function63 = _g691["function?"];
  var composite63 = _g691["composite?"];
  var atom63 = _g691["atom?"];
  var table63 = _g691["table?"];
  var list63 = _g691["list?"];
  var substring = _g691.substring;
  var sub = _g691.sub;
  var inner = _g691.inner;
  var tl = _g691.tl;
  var char = _g691.char;
  var code = _g691.code;
  var string_literal63 = _g691["string-literal?"];
  var id_literal63 = _g691["id-literal?"];
  var add = _g691.add;
  var drop = _g691.drop;
  var last = _g691.last;
  var reverse = _g691.reverse;
  var join = _g691.join;
  var reduce = _g691.reduce;
  var keep = _g691.keep;
  var in63 = _g691["in?"];
  var find = _g691.find;
  var pair = _g691.pair;
  var sort = _g691.sort;
  var iterate = _g691.iterate;
  var replicate = _g691.replicate;
  var map = _g691.map;
  var keys63 = _g691["keys?"];
  var empty63 = _g691["empty?"];
  var stash = _g691.stash;
  var unstash = _g691.unstash;
  var search = _g691.search;
  var split = _g691.split;
  var cat = _g691.cat;
  var _43 = _g691["+"];
  var _ = _g691["-"];
  var _42 = _g691["*"];
  var _47 = _g691["/"];
  var _37 = _g691["%"];
  var _62 = _g691[">"];
  var _60 = _g691["<"];
  var _61 = _g691["="];
  var _6261 = _g691[">="];
  var _6061 = _g691["<="];
  var read_file = _g691["read-file"];
  var write_file = _g691["write-file"];
  var write = _g691.write;
  var exit = _g691.exit;
  var today = _g691.today;
  var now = _g691.now;
  var number = _g691.number;
  var string = _g691.string;
  var space = _g691.space;
  var apply = _g691.apply;
  var make_id = _g691["make-id"];
  var _37message_handler = _g691["%message-handler"];
  var toplevel63 = _g691["toplevel?"];
  var module_key = _g691["module-key"];
  var module = _g691.module;
  var setenv = _g691.setenv;
  var _g694 = nexus["lumen/lib"];
  var getenv = _g694.getenv;
  var macro_function = _g694["macro-function"];
  var macro63 = _g694["macro?"];
  var special63 = _g694["special?"];
  var special_form63 = _g694["special-form?"];
  var statement63 = _g694["statement?"];
  var symbol_expansion = _g694["symbol-expansion"];
  var symbol63 = _g694["symbol?"];
  var variable63 = _g694["variable?"];
  var bound63 = _g694["bound?"];
  var quoted = _g694.quoted;
  var stash42 = _g694["stash*"];
  var bind = _g694.bind;
  var bind42 = _g694["bind*"];
  var quasiexpand = _g694.quasiexpand;
  var macroexpand = _g694.macroexpand;
  var indentation = _g694.indentation;
  var reserved63 = _g694["reserved?"];
  var valid_id63 = _g694["valid-id?"];
  var id = _g694.id;
  var key = _g694.key;
  var imported = _g694.imported;
  var link = _g694.link;
  var mapo = _g694.mapo;
  var quote_environment = _g694["quote-environment"];
  var quote_modules = _g694["quote-modules"];
  var initial_environment = _g694["initial-environment"];
  var _g695 = nexus["lumen/compiler"];
  var compile_function = _g695["compile-function"];
  var compile = _g695.compile;
  var open_module = _g695["open-module"];
  var load_module = _g695["load-module"];
  var in_module = _g695["in-module"];
  var import_modules = _g695["import-modules"];
  var compile_module = _g695["compile-module"];
  var declare = _g695.declare;
  var eval = _g695.eval;
  global.modules = {"lumen/special": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"do": {export: true, tr: true, stmt: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g708 = forms;
    var _g709 = 0;
    while (_g709 < length(_g708)) {
      var x = _g708[_g709];
      str = str + compile(x, {_stash: true, stmt: true});
      _g709 = _g709 + 1;
    }
    return(str);
  }, foo: true}, "%if": {export: true, tr: true, stmt: true, special: function (cond, cons, alt) {
    var _g710 = compile(cond);
    indent_level = indent_level + 1;
    var _g712 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g711 = _g712;
    var _g779;
    if (alt) {
      indent_level = indent_level + 1;
      var _g714 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g779 = _g714;
    }
    var _g713 = _g779;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g710 + ") {\n" + _g711 + ind + "}";
    } else {
      str = str + ind + "if " + _g710 + " then\n" + _g711;
    }
    if (_g713 && target === "js") {
      str = str + " else {\n" + _g713 + ind + "}";
    } else {
      if (_g713) {
        str = str + ind + "else\n" + _g713;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, foo: true}, "while": {export: true, tr: true, stmt: true, special: function (cond, form) {
    var _g715 = compile(cond);
    indent_level = indent_level + 1;
    var _g716 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g716;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g715 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g715 + " do\n" + body + ind + "end\n");
    }
  }, foo: true}, "%for": {export: true, tr: true, stmt: true, special: function (t, k, form) {
    var _g717 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g718 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g718;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g717 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g717 + ") {\n" + body + ind + "}\n");
    }
  }, foo: true}, "%try": {export: true, tr: true, stmt: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g719 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g719;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g720 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g720;
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
    var _g780;
    if (nil63(x)) {
      _g780 = "return";
    } else {
      _g780 = "return(" + compile(x) + ")";
    }
    var _g721 = _g780;
    return(indentation() + _g721);
  }, foo: true, stmt: true}, error: {export: true, special: function (x) {
    var _g781;
    if (target === "js") {
      _g781 = "throw new " + compile(["Error", x]);
    } else {
      _g781 = "error(" + compile(x) + ")";
    }
    var e = _g781;
    return(indentation() + e);
  }, foo: true, stmt: true}, "%local": {export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g782;
    if (is63(value)) {
      _g782 = " = " + value1;
    } else {
      _g782 = "";
    }
    var rh = _g782;
    var _g783;
    if (target === "js") {
      _g783 = "var ";
    } else {
      _g783 = "local ";
    }
    var keyword = _g783;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, stmt: true}, set: {export: true, special: function (lh, rh) {
    var _g722 = compile(lh);
    var _g784;
    if (nil63(rh)) {
      _g784 = "nil";
    } else {
      _g784 = rh;
    }
    var _g723 = compile(_g784);
    return(indentation() + _g722 + " = " + _g723);
  }, foo: true, stmt: true}, get: {export: true, special: function (t, k) {
    var _g724 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g724, 0) === "{") {
      _g724 = "(" + _g724 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g724 + "." + inner(k));
    } else {
      return(_g724 + "[" + k1 + "]");
    }
  }, foo: true}, "not": {}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g785;
    if (target === "lua") {
      _g785 = "{";
    } else {
      _g785 = "[";
    }
    var open = _g785;
    var _g786;
    if (target === "lua") {
      _g786 = "}";
    } else {
      _g786 = "]";
    }
    var close = _g786;
    var str = "";
    var _g725 = forms;
    var i = 0;
    while (i < length(_g725)) {
      var x = _g725[i];
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
    var _g787;
    if (target === "lua") {
      _g787 = " = ";
    } else {
      _g787 = ": ";
    }
    var sep = _g787;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g726 = pairs;
    var i = 0;
    while (i < length(_g726)) {
      var _g727 = _g726[i];
      var k = _g727[0];
      var v = _g727[1];
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
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, id: {export: true, variable: true}, key: {export: true, variable: true}, imported: {export: true, variable: true}, link: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, literal: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-code?": {variable: true}, extend: {variable: true}, exclude: {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, "lumen/compiler": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "import-modules": {export: true, variable: true}, "compile-module": {export: true, variable: true}, declare: {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, "unary?": {variable: true}, precedence: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "parenthesize-call?": {variable: true}, "compile-call": {variable: true}, "op-delims": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-short": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-infix?": {variable: true}, "lower-infix": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, conclude: {variable: true}, "%compile-module": {variable: true}, reimported: {variable: true}, "%result": {global: true, export: true}}}, "lumen/system": {import: [["lumen", "special"], ["lumen", "core"]], export: {nexus: {export: true, global: true}}}, "lumen/reader": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g728) {
    var char = _g728[0];
    var stream = _g728[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g729 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g729)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, "lumen/runtime": {import: [["lumen", "special"], ["lumen", "core"]], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, "one?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, "in?": {export: true, variable: true}, find: {export: true, variable: true}, pair: {export: true, variable: true}, sort: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, today: {export: true, variable: true}, now: {export: true, variable: true}, number: {export: true, variable: true}, string: {export: true, variable: true}, space: {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, "lumen/core": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {quote: {export: true, macro: function (form) {
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
      var _g730 = body;
      var k = undefined;
      for (k in _g730) {
        if (isNaN(parseInt(k))) {
          var v = _g730[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g731) {
      var a = _g731[0];
      var b = _g731[1];
      var c = sub(_g731, 2);
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
    var _g732 = sub(body, 0);
    return(["if", cond, join(["do"], _g732)]);
  }}, unless: {export: true, macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g733 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g733)]);
  }}, table: {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g734 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g734));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g735 = bind(lh, rh);
      var _g736 = 0;
      while (_g736 < length(_g735)) {
        var _g737 = _g735[_g736];
        var id = _g737[0];
        var val = _g737[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g736 = _g736 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g734)]])));
    }
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g738 = sub(body, 0);
    var imp = _g738.import;
    var exp = _g738.export;
    var alias = _g738.alias;
    var _g739 = import_modules(imp);
    var imports = _g739[0];
    var bindings = _g739[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g740 = exp || [];
    var _g741 = 0;
    while (_g741 < length(_g740)) {
      var x = _g740[_g741];
      setenv(x, {_stash: true, export: true});
      _g741 = _g741 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g742 = sub(body, 0);
    var form = join(["fn", args], _g742);
    var _g743 = ["setenv", ["quote", name]];
    _g743.macro = form;
    _g743.form = ["quote", form];
    eval(_g743);
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g744 = sub(body, 0);
    var form = join(["fn", args], _g744);
    var keys = sub(_g744, length(_g744));
    var _g745 = ["setenv", ["quote", name]];
    _g745.special = form;
    _g745.form = ["quote", form];
    eval(join(_g745, keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g746 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g746)) {
      var _g747 = bind42(x, _g746);
      var args = _g747[0];
      var _g748 = _g747[1];
      return(join(["%global-function", name, args], _g748));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g749 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g749) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g749)]));
    } else {
      if (some63(_g749)) {
        var _g750 = bind42(x, _g749);
        var args = _g750[0];
        var _g751 = _g750[1];
        return(link(name, join(["%local-function", name, args], _g751)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }}, "set*": {export: true, macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }}, "with-bindings": {export: true, macro: function (_g752) {
    var names = _g752[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g753 = sub(body, 0);
    var x = make_id();
    var _g755 = ["setenv", x];
    _g755.variable = true;
    var _g754 = ["with-frame", ["each", [x], names, _g755]];
    _g754.scope = true;
    return(join(_g754, _g753));
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g756 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g757 = join(["do"], macroexpand(_g756));
    drop(environment);
    return(_g757);
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g758 = sub(body, 0);
    add(environment, {});
    map(function (_g760) {
      var name = _g760[0];
      var exp = _g760[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g759 = join(["do"], macroexpand(_g758));
    drop(environment);
    return(_g759);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g761 = sub(body, 0);
    var _g762 = bind42(args, _g761);
    var _g763 = _g762[0];
    var _g764 = _g762[1];
    return(join(["%function", _g763], _g764));
  }}, guard: {export: true, macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, all: {export: true, macro: function (_g765, t) {
    var k = _g765[0];
    var v = _g765[1];
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g766 = sub(body, 0);
    var x = make_id();
    var n = make_id();
    var _g788;
    if (target === "lua") {
      _g788 = _g766;
    } else {
      _g788 = [join(["let", [n, ["parseInt", k], k, ["if", ["isNaN", n], k, n]]], _g766)];
    }
    return(["let", [x, t, k, "nil"], ["%for", x, k, join(["let", [v, ["get", x, k]]], _g788)]]);
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g767 = sub(body, 0);
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
      _g789 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g767), ["inc", i]]];
    } else {
      var _g768 = ["target"];
      _g768.js = ["isNaN", ["parseInt", k]];
      _g768.lua = ["not", ["number?", k]];
      _g789 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g768, join(["let", [v, ["get", t1, k]]], _g767)]]];
    }
    return(["let", [t1, t], _g789]);
  }}, "set-of": {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g769 = xs;
    var _g770 = 0;
    while (_g770 < length(_g769)) {
      var x = _g769[_g770];
      l[x] = true;
      _g770 = _g770 + 1;
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
    var _g771 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g771)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g772 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g772)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g773 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g774 = ["table"];
    _g774._scope = scope;
    return(["do", ["add", "environment", _g774], ["let", [x, join(["do"], _g773)], ["drop", "environment"], x]]);
  }}}}, "lumen/boot": {import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g775 = sub(body, 0);
    var imp = _g775.import;
    var exp = _g775.export;
    var alias = _g775.alias;
    var _g776 = import_modules(imp);
    var imports = _g776[0];
    var bindings = _g776[1];
    var k = module_key(spec);
    modules[k] = {import: imports, export: {}, alias: alias};
    var _g777 = exp || [];
    var _g778 = 0;
    while (_g778 < length(_g777)) {
      var x = _g777[_g778];
      setenv(x, {_stash: true, export: true});
      _g778 = _g778 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }}}];
})();
(function () {
  nexus.user = {};
  var _g791 = nexus["lumen/runtime"];
  var nil63 = _g791["nil?"];
  var is63 = _g791["is?"];
  var length = _g791.length;
  var none63 = _g791["none?"];
  var some63 = _g791["some?"];
  var one63 = _g791["one?"];
  var hd = _g791.hd;
  var string63 = _g791["string?"];
  var number63 = _g791["number?"];
  var boolean63 = _g791["boolean?"];
  var function63 = _g791["function?"];
  var composite63 = _g791["composite?"];
  var atom63 = _g791["atom?"];
  var table63 = _g791["table?"];
  var list63 = _g791["list?"];
  var substring = _g791.substring;
  var sub = _g791.sub;
  var inner = _g791.inner;
  var tl = _g791.tl;
  var char = _g791.char;
  var code = _g791.code;
  var string_literal63 = _g791["string-literal?"];
  var id_literal63 = _g791["id-literal?"];
  var add = _g791.add;
  var drop = _g791.drop;
  var last = _g791.last;
  var reverse = _g791.reverse;
  var join = _g791.join;
  var reduce = _g791.reduce;
  var keep = _g791.keep;
  var in63 = _g791["in?"];
  var find = _g791.find;
  var pair = _g791.pair;
  var sort = _g791.sort;
  var iterate = _g791.iterate;
  var replicate = _g791.replicate;
  var map = _g791.map;
  var keys63 = _g791["keys?"];
  var empty63 = _g791["empty?"];
  var stash = _g791.stash;
  var unstash = _g791.unstash;
  var search = _g791.search;
  var split = _g791.split;
  var cat = _g791.cat;
  var _43 = _g791["+"];
  var _ = _g791["-"];
  var _42 = _g791["*"];
  var _47 = _g791["/"];
  var _37 = _g791["%"];
  var _62 = _g791[">"];
  var _60 = _g791["<"];
  var _61 = _g791["="];
  var _6261 = _g791[">="];
  var _6061 = _g791["<="];
  var read_file = _g791["read-file"];
  var write_file = _g791["write-file"];
  var write = _g791.write;
  var exit = _g791.exit;
  var today = _g791.today;
  var now = _g791.now;
  var number = _g791.number;
  var string = _g791.string;
  var space = _g791.space;
  var apply = _g791.apply;
  var make_id = _g791["make-id"];
  var _37message_handler = _g791["%message-handler"];
  var toplevel63 = _g791["toplevel?"];
  var module_key = _g791["module-key"];
  var module = _g791.module;
  var setenv = _g791.setenv;
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
    var _g794 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g796) {
        return([false, _g796.message]);
      }
    })();
    var _g1 = _g794[0];
    var x = _g794[1];
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
    var _g795 = args;
    var i = 0;
    while (i < length(_g795)) {
      var arg = _g795[i];
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
