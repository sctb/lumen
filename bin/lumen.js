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
      var n = length(x);
      var _g52;
      if (nil63(from) || from < 0) {
        _g52 = 0;
      } else {
        _g52 = from;
      }
      var i = _g52;
      var _g53;
      if (nil63(upto) || upto > n) {
        _g53 = n;
      } else {
        _g53 = upto;
      }
      var _g23 = _g53;
      var j = 0;
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
  var join = function (l1, l2) {
    if (nil63(l2) && nil63(l1)) {
      return([]);
    } else {
      if (nil63(l1)) {
        return(join([], l2));
      } else {
        if (nil63(l2)) {
          return(join(l1, []));
        } else {
          var l = [];
          var i = 0;
          var len = length(l1);
          var len2 = length(l2);
          while (i < len) {
            l[i] = l1[i];
            i = i + 1;
          }
          while (i < len + len2) {
            l[i] = l2[i - len];
            i = i + 1;
          }
          var _g25 = l1;
          var k = undefined;
          for (k in _g25) {
            if (isNaN(parseInt(k))) {
              var v = _g25[k];
              l[k] = v;
            }
          }
          var _g26 = l2;
          var k = undefined;
          for (k in _g26) {
            if (isNaN(parseInt(k))) {
              var v = _g26[k];
              l[k] = v;
            }
          }
          return(l);
        }
      }
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
    var _g27 = l;
    var _g28 = 0;
    while (_g28 < length(_g27)) {
      var x = _g27[_g28];
      if (f(x)) {
        add(l1, x);
      }
      _g28 = _g28 + 1;
    }
    return(l1);
  };
  nexus["lumen/runtime"].keep = keep;
  var in63 = function (x, l) {
    var _g29 = l;
    var _g30 = 0;
    while (_g30 < length(_g29)) {
      var y = _g29[_g30];
      if (x === y) {
        return(true);
      }
      _g30 = _g30 + 1;
    }
  };
  nexus["lumen/runtime"]["in?"] = in63;
  var find = function (f, l) {
    var _g31 = l;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var x = _g31[_g32];
      var _g33 = f(x);
      if (_g33) {
        return(_g33);
      }
      _g32 = _g32 + 1;
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
    var _g54;
    if (f) {
      _g54 = function (a, b) {
        if (f(a, b)) {
          return(-1);
        } else {
          return(1);
        }
      };
    }
    return(l.sort(_g54));
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
    var _g34 = t;
    var _g35 = 0;
    while (_g35 < length(_g34)) {
      var x = _g34[_g35];
      var _g36 = f(x);
      if (is63(_g36)) {
        add(t1, _g36);
      }
      _g35 = _g35 + 1;
    }
    var _g37 = t;
    var k = undefined;
    for (k in _g37) {
      if (isNaN(parseInt(k))) {
        var v = _g37[k];
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
    var _g38 = t;
    var k = undefined;
    for (k in _g38) {
      if (isNaN(parseInt(k))) {
        var v = _g38[k];
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
      var _g39 = args;
      var k = undefined;
      for (k in _g39) {
        if (isNaN(parseInt(k))) {
          var v = _g39[k];
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
        var _g40 = l;
        var k = undefined;
        for (k in _g40) {
          if (isNaN(parseInt(k))) {
            var v = _g40[k];
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
    var _g41 = sub(xs, 0);
    if (none63(_g41)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return(a + b);
      }, _g41));
    }
  };
  nexus["lumen/runtime"].cat = cat;
  var _43 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g42));
  };
  nexus["lumen/runtime"]["+"] = _43;
  var _ = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a - b);
    }, reverse(_g43)));
  };
  nexus["lumen/runtime"]["-"] = _;
  var _42 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g44));
  };
  nexus["lumen/runtime"]["*"] = _42;
  var _47 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a / b);
    }, reverse(_g45)));
  };
  nexus["lumen/runtime"]["/"] = _47;
  var _37 = function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (b, a) {
      return(a % b);
    }, reverse(_g46)));
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
            var _g47 = x;
            var k = undefined;
            for (k in _g47) {
              if (isNaN(parseInt(k))) {
                var v = _g47[k];
                add(x1, k + ":");
                add(x1, v);
              }
            }
            var _g48 = x1;
            var i = 0;
            while (i < length(_g48)) {
              var y = _g48[i];
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
    var _g49 = stash(args);
    return(f.apply(f, _g49));
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
    var _g50 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = frame[k] || {};
      var _g51 = _g50;
      var k1 = undefined;
      for (k1 in _g51) {
        if (isNaN(parseInt(k1))) {
          var v = _g51[k1];
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
  var _g59 = nexus["lumen/runtime"];
  var one63 = _g59["one?"];
  var boolean63 = _g59["boolean?"];
  var string_literal63 = _g59["string-literal?"];
  var _47 = _g59["/"];
  var _61 = _g59["="];
  var _62 = _g59[">"];
  var _60 = _g59["<"];
  var add = _g59.add;
  var write_file = _g59["write-file"];
  var write = _g59.write;
  var substring = _g59.substring;
  var exit = _g59.exit;
  var string = _g59.string;
  var nil63 = _g59["nil?"];
  var keys63 = _g59["keys?"];
  var cat = _g59.cat;
  var iterate = _g59.iterate;
  var map = _g59.map;
  var replicate = _g59.replicate;
  var last = _g59.last;
  var split = _g59.split;
  var char = _g59.char;
  var now = _g59.now;
  var function63 = _g59["function?"];
  var list63 = _g59["list?"];
  var empty63 = _g59["empty?"];
  var search = _g59.search;
  var pair = _g59.pair;
  var toplevel63 = _g59["toplevel?"];
  var sort = _g59.sort;
  var number63 = _g59["number?"];
  var stash = _g59.stash;
  var atom63 = _g59["atom?"];
  var table63 = _g59["table?"];
  var id_literal63 = _g59["id-literal?"];
  var reverse = _g59.reverse;
  var module = _g59.module;
  var keep = _g59.keep;
  var drop = _g59.drop;
  var setenv = _g59.setenv;
  var module_key = _g59["module-key"];
  var length = _g59.length;
  var is63 = _g59["is?"];
  var _37message_handler = _g59["%message-handler"];
  var make_id = _g59["make-id"];
  var in63 = _g59["in?"];
  var tl = _g59.tl;
  var apply = _g59.apply;
  var inner = _g59.inner;
  var some63 = _g59["some?"];
  var composite63 = _g59["composite?"];
  var space = _g59.space;
  var find = _g59.find;
  var hd = _g59.hd;
  var _37 = _g59["%"];
  var code = _g59.code;
  var none63 = _g59["none?"];
  var _6261 = _g59[">="];
  var join = _g59.join;
  var reduce = _g59.reduce;
  var number = _g59.number;
  var unstash = _g59.unstash;
  var _ = _g59["-"];
  var sub = _g59.sub;
  var _43 = _g59["+"];
  var read_file = _g59["read-file"];
  var today = _g59.today;
  var _42 = _g59["*"];
  var string63 = _g59["string?"];
  var _6061 = _g59["<="];
  var getenv = function (k) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g62 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g63 = undefined;
        var _g64 = _g62;
        var x = undefined;
        for (x in _g64) {
          if (isNaN(parseInt(x))) {
            var _g55 = _g64[x];
            _g63 = x;
          }
        }
        if (_g63) {
          return(b[_g63]);
        } else {
          return(b);
        }
      }
    }
  };
  nexus["lumen/lib"].getenv = getenv;
  var macro_function = function (k) {
    return(getenv(k, {_stash: true, macro: true}));
  };
  nexus["lumen/lib"]["macro-function"] = macro_function;
  var macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  nexus["lumen/lib"]["macro?"] = macro63;
  var special63 = function (k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  };
  nexus["lumen/lib"]["special?"] = special63;
  var special_form63 = function (form) {
    return(list63(form) && special63(hd(form)));
  };
  nexus["lumen/lib"]["special-form?"] = special_form63;
  var statement63 = function (k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  };
  nexus["lumen/lib"]["statement?"] = statement63;
  var symbol_expansion = function (k) {
    return(getenv(k, {_stash: true, symbol: true}));
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
    return(getenv(k, {_stash: true, global: true}));
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
      var _g99;
      if (c === "\n") {
        _g99 = "\\n";
      } else {
        var _g100;
        if (c === "\"") {
          _g100 = "\\\"";
        } else {
          var _g101;
          if (c === "\\") {
            _g101 = "\\\\";
          } else {
            _g101 = c;
          }
          _g100 = _g101;
        }
        _g99 = _g100;
      }
      var c1 = _g99;
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
      var _g65 = args;
      var k = undefined;
      for (k in _g65) {
        if (isNaN(parseInt(k))) {
          var v = _g65[k];
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
        var _g66 = lh;
        var i = 0;
        while (i < length(_g66)) {
          var x = _g66[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g67 = lh;
        var k = undefined;
        for (k in _g67) {
          if (isNaN(parseInt(k))) {
            var v = _g67[k];
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
      var _g68 = args;
      var _g69 = 0;
      while (_g69 < length(_g68)) {
        var arg = _g68[_g69];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g69 = _g69 + 1;
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
          var _g56 = form[0];
          var name = form[1];
          var value = form[2];
          return(["%local", name, macroexpand(value)]);
        } else {
          if (x === "%function") {
            var _g57 = form[0];
            var args = form[1];
            var body = sub(form, 2);
            add(environment, {_scope: true});
            var _g72 = args;
            var _g73 = 0;
            while (_g73 < length(_g72)) {
              var _g70 = _g72[_g73];
              setenv(_g70, {_stash: true, variable: true});
              _g73 = _g73 + 1;
            }
            var _g71 = join(["%function", map(macroexpand, args)], macroexpand(body));
            drop(environment);
            return(_g71);
          } else {
            if (x === "%local-function" || x === "%global-function") {
              var _g58 = form[0];
              var _g74 = form[1];
              var _g75 = form[2];
              var _g76 = sub(form, 3);
              add(environment, {_scope: true});
              var _g79 = _g75;
              var _g80 = 0;
              while (_g80 < length(_g79)) {
                var _g77 = _g79[_g80];
                setenv(_g77, {_stash: true, variable: true});
                _g80 = _g80 + 1;
              }
              var _g78 = join([x, _g74, map(macroexpand, _g75)], macroexpand(_g76));
              drop(environment);
              return(_g78);
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
    var _g81 = form;
    var k = undefined;
    for (k in _g81) {
      if (isNaN(parseInt(k))) {
        var v = _g81[k];
        var _g102;
        if (quasisplice63(v, depth)) {
          _g102 = quasiexpand(v[1]);
        } else {
          _g102 = quasiexpand(v, depth);
        }
        var _g82 = _g102;
        last(xs)[k] = _g82;
      }
    }
    var _g83 = form;
    var _g84 = 0;
    while (_g84 < length(_g83)) {
      var x = _g83[_g84];
      if (quasisplice63(x, depth)) {
        var _g85 = quasiexpand(x[1]);
        add(xs, _g85);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g84 = _g84 + 1;
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
  var reserved = {"==": true, "delete": true, "=": true, "for": true, "catch": true, "return": true, "try": true, "do": true, "typeof": true, "default": true, "break": true, "with": true, "*": true, "switch": true, "true": true, "finally": true, "until": true, "<=": true, "elseif": true, "new": true, "while": true, "case": true, ">": true, "false": true, "<": true, "then": true, "not": true, "in": true, "local": true, "repeat": true, "nil": true, "debugger": true, "if": true, "-": true, "this": true, "+": true, "end": true, "or": true, "void": true, "var": true, "/": true, ">=": true, "else": true, "throw": true, "and": true, "instanceof": true, "function": true, "%": true, "continue": true};
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
      var _g103;
      if (c === "-") {
        _g103 = "_";
      } else {
        var _g104;
        if (valid_code63(n)) {
          _g104 = c;
        } else {
          var _g105;
          if (i === 0) {
            _g105 = "_" + n;
          } else {
            _g105 = n;
          }
          _g104 = _g105;
        }
        _g103 = _g104;
      }
      var c1 = _g103;
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
    var _g90 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g90.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g91 = module(spec).export;
      var n = undefined;
      for (n in _g91) {
        if (isNaN(parseInt(n))) {
          var b = _g91[n];
          if (b.variable && (all || b.export)) {
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
    var _g92 = sub(xs, 0);
    return(join(t, _g92));
  };
  nexus["lumen/lib"].extend = extend;
  var exclude = function (t) {
    var keys = unstash(Array.prototype.slice.call(arguments, 1));
    var _g93 = sub(keys, 0);
    var t1 = [];
    var _g94 = t;
    var _g95 = 0;
    while (_g95 < length(_g94)) {
      var x = _g94[_g95];
      add(t1, x);
      _g95 = _g95 + 1;
    }
    var _g96 = t;
    var k = undefined;
    for (k in _g96) {
      if (isNaN(parseInt(k))) {
        var v = _g96[k];
        if (!_g93[k]) {
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
    var _g97 = t;
    var k = undefined;
    for (k in _g97) {
      if (isNaN(parseInt(k))) {
        var v = _g97[k];
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
    var _g98 = ["table"];
    _g98.export = quote_frame(m.export);
    _g98.import = quoted(m.import);
    _g98.alias = quoted(m.alias);
    return(_g98);
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
  var _g106 = nexus["lumen/runtime"];
  var one63 = _g106["one?"];
  var boolean63 = _g106["boolean?"];
  var string_literal63 = _g106["string-literal?"];
  var _47 = _g106["/"];
  var _61 = _g106["="];
  var _62 = _g106[">"];
  var _60 = _g106["<"];
  var add = _g106.add;
  var write_file = _g106["write-file"];
  var write = _g106.write;
  var substring = _g106.substring;
  var exit = _g106.exit;
  var string = _g106.string;
  var nil63 = _g106["nil?"];
  var keys63 = _g106["keys?"];
  var cat = _g106.cat;
  var iterate = _g106.iterate;
  var map = _g106.map;
  var replicate = _g106.replicate;
  var last = _g106.last;
  var split = _g106.split;
  var char = _g106.char;
  var now = _g106.now;
  var function63 = _g106["function?"];
  var list63 = _g106["list?"];
  var empty63 = _g106["empty?"];
  var search = _g106.search;
  var pair = _g106.pair;
  var toplevel63 = _g106["toplevel?"];
  var sort = _g106.sort;
  var number63 = _g106["number?"];
  var stash = _g106.stash;
  var atom63 = _g106["atom?"];
  var table63 = _g106["table?"];
  var id_literal63 = _g106["id-literal?"];
  var reverse = _g106.reverse;
  var module = _g106.module;
  var keep = _g106.keep;
  var drop = _g106.drop;
  var setenv = _g106.setenv;
  var module_key = _g106["module-key"];
  var length = _g106.length;
  var is63 = _g106["is?"];
  var _37message_handler = _g106["%message-handler"];
  var make_id = _g106["make-id"];
  var in63 = _g106["in?"];
  var tl = _g106.tl;
  var apply = _g106.apply;
  var inner = _g106.inner;
  var some63 = _g106["some?"];
  var composite63 = _g106["composite?"];
  var space = _g106.space;
  var find = _g106.find;
  var hd = _g106.hd;
  var _37 = _g106["%"];
  var code = _g106.code;
  var none63 = _g106["none?"];
  var _6261 = _g106[">="];
  var join = _g106.join;
  var reduce = _g106.reduce;
  var number = _g106.number;
  var unstash = _g106.unstash;
  var _ = _g106["-"];
  var sub = _g106.sub;
  var _43 = _g106["+"];
  var read_file = _g106["read-file"];
  var today = _g106.today;
  var _42 = _g106["*"];
  var string63 = _g106["string?"];
  var _6061 = _g106["<="];
  var delimiters = {"(": true, ";": true, "\n": true, ")": true};
  nexus["lumen/reader"].delimiters = delimiters;
  var whitespace = {"\t": true, "\n": true, " ": true};
  nexus["lumen/reader"].whitespace = whitespace;
  var make_stream = function (str) {
    return({pos: 0, len: length(str), string: str});
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
  var _g117 = nexus["lumen/runtime"];
  var one63 = _g117["one?"];
  var boolean63 = _g117["boolean?"];
  var string_literal63 = _g117["string-literal?"];
  var _47 = _g117["/"];
  var _61 = _g117["="];
  var _62 = _g117[">"];
  var _60 = _g117["<"];
  var add = _g117.add;
  var write_file = _g117["write-file"];
  var write = _g117.write;
  var substring = _g117.substring;
  var exit = _g117.exit;
  var string = _g117.string;
  var nil63 = _g117["nil?"];
  var keys63 = _g117["keys?"];
  var cat = _g117.cat;
  var iterate = _g117.iterate;
  var map = _g117.map;
  var replicate = _g117.replicate;
  var last = _g117.last;
  var split = _g117.split;
  var char = _g117.char;
  var now = _g117.now;
  var function63 = _g117["function?"];
  var list63 = _g117["list?"];
  var empty63 = _g117["empty?"];
  var search = _g117.search;
  var pair = _g117.pair;
  var toplevel63 = _g117["toplevel?"];
  var sort = _g117.sort;
  var number63 = _g117["number?"];
  var stash = _g117.stash;
  var atom63 = _g117["atom?"];
  var table63 = _g117["table?"];
  var id_literal63 = _g117["id-literal?"];
  var reverse = _g117.reverse;
  var module = _g117.module;
  var keep = _g117.keep;
  var drop = _g117.drop;
  var setenv = _g117.setenv;
  var module_key = _g117["module-key"];
  var length = _g117.length;
  var is63 = _g117["is?"];
  var _37message_handler = _g117["%message-handler"];
  var make_id = _g117["make-id"];
  var in63 = _g117["in?"];
  var tl = _g117.tl;
  var apply = _g117.apply;
  var inner = _g117.inner;
  var some63 = _g117["some?"];
  var composite63 = _g117["composite?"];
  var space = _g117.space;
  var find = _g117.find;
  var hd = _g117.hd;
  var _37 = _g117["%"];
  var code = _g117.code;
  var none63 = _g117["none?"];
  var _6261 = _g117[">="];
  var join = _g117.join;
  var reduce = _g117.reduce;
  var number = _g117.number;
  var unstash = _g117.unstash;
  var _ = _g117["-"];
  var sub = _g117.sub;
  var _43 = _g117["+"];
  var read_file = _g117["read-file"];
  var today = _g117.today;
  var _42 = _g117["*"];
  var string63 = _g117["string?"];
  var _6061 = _g117["<="];
  var _g120 = nexus["lumen/lib"];
  var variable63 = _g120["variable?"];
  var valid_id63 = _g120["valid-id?"];
  var bind = _g120.bind;
  var initial_environment = _g120["initial-environment"];
  var statement63 = _g120["statement?"];
  var symbol63 = _g120["symbol?"];
  var quote_modules = _g120["quote-modules"];
  var macro63 = _g120["macro?"];
  var mapo = _g120.mapo;
  var reserved63 = _g120["reserved?"];
  var macroexpand = _g120.macroexpand;
  var special63 = _g120["special?"];
  var bound63 = _g120["bound?"];
  var id = _g120.id;
  var getenv = _g120.getenv;
  var link = _g120.link;
  var key = _g120.key;
  var quote_environment = _g120["quote-environment"];
  var macro_function = _g120["macro-function"];
  var quoted = _g120.quoted;
  var quasiexpand = _g120.quasiexpand;
  var special_form63 = _g120["special-form?"];
  var indentation = _g120.indentation;
  var symbol_expansion = _g120["symbol-expansion"];
  var imported = _g120.imported;
  var bind42 = _g120["bind*"];
  var stash42 = _g120["stash*"];
  var _g121 = nexus["lumen/reader"];
  var make_stream = _g121["make-stream"];
  var read_table = _g121["read-table"];
  var read = _g121.read;
  var read_all = _g121["read-all"];
  var read_from_string = _g121["read-from-string"];
  var _g125 = [];
  _g125.js = "!";
  _g125.lua = "not ";
  var _g123 = [];
  var _g126 = [];
  _g126.js = "!";
  _g126.lua = "not ";
  _g123["not"] = _g126;
  var _g128 = [];
  _g128["%"] = true;
  _g128["*"] = true;
  _g128["/"] = true;
  var _g130 = [];
  _g130["-"] = true;
  _g130["+"] = true;
  var _g134 = [];
  _g134.js = "+";
  _g134.lua = "..";
  var _g132 = [];
  var _g135 = [];
  _g135.js = "+";
  _g135.lua = "..";
  _g132.cat = _g135;
  var _g137 = [];
  _g137["<"] = true;
  _g137[">"] = true;
  _g137["<="] = true;
  _g137[">="] = true;
  var _g141 = [];
  _g141.js = "===";
  _g141.lua = "==";
  var _g143 = [];
  _g143.js = "!=";
  _g143.lua = "~=";
  var _g139 = [];
  var _g144 = [];
  _g144.js = "===";
  _g144.lua = "==";
  _g139["="] = _g144;
  var _g145 = [];
  _g145.js = "!=";
  _g145.lua = "~=";
  _g139["~="] = _g145;
  var _g149 = [];
  _g149.js = "&&";
  _g149.lua = "and";
  var _g147 = [];
  var _g150 = [];
  _g150.js = "&&";
  _g150.lua = "and";
  _g147["and"] = _g150;
  var _g154 = [];
  _g154.js = "||";
  _g154.lua = "or";
  var _g152 = [];
  var _g155 = [];
  _g155.js = "||";
  _g155.lua = "or";
  _g152["or"] = _g155;
  var infix = [_g123, _g128, _g130, _g132, _g137, _g139, _g147, _g152];
  nexus["lumen/compiler"].infix = infix;
  var unary63 = function (form) {
    var op = form[0];
    var args = sub(form, 1);
    return(one63(args) && in63(op, ["not", "-"]));
  };
  nexus["lumen/compiler"]["unary?"] = unary63;
  var precedence = function (form) {
    if (list63(form) && !unary63(form)) {
      var _g156 = infix;
      var i = 0;
      while (i < length(_g156)) {
        var level = _g156[i];
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
    var _g157 = args;
    var i = 0;
    while (i < length(_g157)) {
      var arg = _g157[i];
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
    var _g158 = getenv(x);
    var special = _g158.special;
    var self_tr63 = _g158.tr;
    var stmt = _g158.stmt;
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
    var _g159 = unstash(Array.prototype.slice.call(arguments, 2));
    var right = _g159.right;
    var _g186;
    if (right) {
      _g186 = _6261;
    } else {
      _g186 = _62;
    }
    if (_g186(precedence(child), precedence(parent))) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  };
  nexus["lumen/compiler"]["op-delims"] = op_delims;
  var compile_infix = function (form) {
    var op = form[0];
    var _g160 = sub(form, 1);
    var a = _g160[0];
    var b = _g160[1];
    var _g161 = op_delims(form, a);
    var ao = _g161[0];
    var ac = _g161[1];
    var _g162 = op_delims(form, b, {_stash: true, right: true});
    var bo = _g162[0];
    var bc = _g162[1];
    var _g163 = compile(a);
    var _g164 = compile(b);
    var _g165 = getop(op);
    if (unary63(form)) {
      return(_g165 + ao + _g163 + ac);
    } else {
      return(ao + _g163 + ac + " " + _g165 + " " + bo + _g164 + bc);
    }
  };
  nexus["lumen/compiler"]["compile-infix"] = compile_infix;
  var compile_function = function (args, body) {
    var _g166 = unstash(Array.prototype.slice.call(arguments, 2));
    var name = _g166.name;
    var prefix = _g166.prefix;
    var _g187;
    if (name) {
      _g187 = compile(name);
    } else {
      _g187 = "";
    }
    var id = _g187;
    var _g167 = prefix || "";
    var _g168 = compile_args(args);
    indent_level = indent_level + 1;
    var _g170 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g169 = _g170;
    var ind = indentation();
    var _g188;
    if (target === "js") {
      _g188 = "";
    } else {
      _g188 = "end";
    }
    var tr = _g188;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g168 + " {\n" + _g169 + ind + "}" + tr);
    } else {
      return(_g167 + "function " + id + _g168 + "\n" + _g169 + ind + tr);
    }
  };
  nexus["lumen/compiler"]["compile-function"] = compile_function;
  var can_return63 = function (form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  };
  nexus["lumen/compiler"]["can-return?"] = can_return63;
  compile = function (form) {
    var _g171 = unstash(Array.prototype.slice.call(arguments, 1));
    var stmt = _g171.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g189;
        if (stmt) {
          _g189 = indentation();
        } else {
          _g189 = "";
        }
        var ind = _g189;
        var _g190;
        if (atom63(form)) {
          _g190 = compile_atom(form);
        } else {
          var _g191;
          if (infix63(hd(form))) {
            _g191 = compile_infix(form);
          } else {
            _g191 = compile_call(form);
          }
          _g190 = _g191;
        }
        var _g172 = _g190;
        return(ind + _g172 + tr);
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
    var _g173 = sub(args, 0, length(args) - 1);
    var _g174 = 0;
    while (_g174 < length(_g173)) {
      var x = _g173[_g174];
      add(hoist, lower(x, hoist, stmt63));
      _g174 = _g174 + 1;
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
    var _g175 = args[1];
    var _g176 = args[2];
    if (stmt63 || tail63) {
      var _g193;
      if (_g176) {
        _g193 = [lower_body([_g176], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g175], tail63)], _g193)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g192;
      if (_g176) {
        _g192 = [lower(["set", e, _g176])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g175])], _g192));
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
      var _g194;
      if (x === "and") {
        _g194 = ["%if", id, b, id];
      } else {
        _g194 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g194], hoist));
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
    var _g177 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g177, lower_body(body, true)]));
  };
  nexus["lumen/compiler"]["lower-definition"] = lower_definition;
  var lower_call = function (form, hoist) {
    var _g178 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g178)) {
      return(_g178);
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
    var _g179 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g179.all;
    var m = module(spec);
    var frame = last(environment);
    var _g180 = m.export;
    var k = undefined;
    for (k in _g180) {
      if (isNaN(parseInt(k))) {
        var v = _g180[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  };
  nexus["lumen/compiler"]["open-module"] = open_module;
  var load_module = function (spec) {
    var _g181 = unstash(Array.prototype.slice.call(arguments, 1));
    var all = _g181.all;
    if (!module(spec)) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
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
    var _g182 = specs || [];
    var _g183 = 0;
    while (_g183 < length(_g182)) {
      var spec = _g182[_g183];
      load_module(spec);
      var m = module(spec);
      if (m.alias) {
        var _g184 = import_modules(m.alias);
        var aliased = _g184[0];
        var bs = _g184[1];
        imports = join(imports, aliased);
        bindings = join(bindings, bs);
      } else {
        var _g185 = imported(spec);
        add(imports, spec);
        bindings = join(bindings, _g185);
      }
      _g183 = _g183 + 1;
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
  var _g195 = nexus["lumen/runtime"];
  var one63 = _g195["one?"];
  var boolean63 = _g195["boolean?"];
  var string_literal63 = _g195["string-literal?"];
  var _47 = _g195["/"];
  var _61 = _g195["="];
  var _62 = _g195[">"];
  var _60 = _g195["<"];
  var add = _g195.add;
  var write_file = _g195["write-file"];
  var write = _g195.write;
  var substring = _g195.substring;
  var exit = _g195.exit;
  var string = _g195.string;
  var nil63 = _g195["nil?"];
  var keys63 = _g195["keys?"];
  var cat = _g195.cat;
  var iterate = _g195.iterate;
  var map = _g195.map;
  var replicate = _g195.replicate;
  var last = _g195.last;
  var split = _g195.split;
  var char = _g195.char;
  var now = _g195.now;
  var function63 = _g195["function?"];
  var list63 = _g195["list?"];
  var empty63 = _g195["empty?"];
  var search = _g195.search;
  var pair = _g195.pair;
  var toplevel63 = _g195["toplevel?"];
  var sort = _g195.sort;
  var number63 = _g195["number?"];
  var stash = _g195.stash;
  var atom63 = _g195["atom?"];
  var table63 = _g195["table?"];
  var id_literal63 = _g195["id-literal?"];
  var reverse = _g195.reverse;
  var module = _g195.module;
  var keep = _g195.keep;
  var drop = _g195.drop;
  var setenv = _g195.setenv;
  var module_key = _g195["module-key"];
  var length = _g195.length;
  var is63 = _g195["is?"];
  var _37message_handler = _g195["%message-handler"];
  var make_id = _g195["make-id"];
  var in63 = _g195["in?"];
  var tl = _g195.tl;
  var apply = _g195.apply;
  var inner = _g195.inner;
  var some63 = _g195["some?"];
  var composite63 = _g195["composite?"];
  var space = _g195.space;
  var find = _g195.find;
  var hd = _g195.hd;
  var _37 = _g195["%"];
  var code = _g195.code;
  var none63 = _g195["none?"];
  var _6261 = _g195[">="];
  var join = _g195.join;
  var reduce = _g195.reduce;
  var number = _g195.number;
  var unstash = _g195.unstash;
  var _ = _g195["-"];
  var sub = _g195.sub;
  var _43 = _g195["+"];
  var read_file = _g195["read-file"];
  var today = _g195.today;
  var _42 = _g195["*"];
  var string63 = _g195["string?"];
  var _6061 = _g195["<="];
  var _g198 = nexus["lumen/lib"];
  var variable63 = _g198["variable?"];
  var valid_id63 = _g198["valid-id?"];
  var bind = _g198.bind;
  var initial_environment = _g198["initial-environment"];
  var statement63 = _g198["statement?"];
  var symbol63 = _g198["symbol?"];
  var quote_modules = _g198["quote-modules"];
  var macro63 = _g198["macro?"];
  var mapo = _g198.mapo;
  var reserved63 = _g198["reserved?"];
  var macroexpand = _g198.macroexpand;
  var special63 = _g198["special?"];
  var bound63 = _g198["bound?"];
  var id = _g198.id;
  var getenv = _g198.getenv;
  var link = _g198.link;
  var key = _g198.key;
  var quote_environment = _g198["quote-environment"];
  var macro_function = _g198["macro-function"];
  var quoted = _g198.quoted;
  var quasiexpand = _g198.quasiexpand;
  var special_form63 = _g198["special-form?"];
  var indentation = _g198.indentation;
  var symbol_expansion = _g198["symbol-expansion"];
  var imported = _g198.imported;
  var bind42 = _g198["bind*"];
  var stash42 = _g198["stash*"];
  var _g199 = nexus["lumen/compiler"];
  var declare = _g199.declare;
  var compile = _g199.compile;
  var load_module = _g199["load-module"];
  var compile_function = _g199["compile-function"];
  var compile_module = _g199["compile-module"];
  var import_modules = _g199["import-modules"];
  var open_module = _g199["open-module"];
  var eval = _g199.eval;
  var in_module = _g199["in-module"];
})();
(function () {
  nexus["lumen/core"] = {};
  var _g373 = nexus["lumen/runtime"];
  var one63 = _g373["one?"];
  var boolean63 = _g373["boolean?"];
  var string_literal63 = _g373["string-literal?"];
  var _47 = _g373["/"];
  var _61 = _g373["="];
  var _62 = _g373[">"];
  var _60 = _g373["<"];
  var add = _g373.add;
  var write_file = _g373["write-file"];
  var write = _g373.write;
  var substring = _g373.substring;
  var exit = _g373.exit;
  var string = _g373.string;
  var nil63 = _g373["nil?"];
  var keys63 = _g373["keys?"];
  var cat = _g373.cat;
  var iterate = _g373.iterate;
  var map = _g373.map;
  var replicate = _g373.replicate;
  var last = _g373.last;
  var split = _g373.split;
  var char = _g373.char;
  var now = _g373.now;
  var function63 = _g373["function?"];
  var list63 = _g373["list?"];
  var empty63 = _g373["empty?"];
  var search = _g373.search;
  var pair = _g373.pair;
  var toplevel63 = _g373["toplevel?"];
  var sort = _g373.sort;
  var number63 = _g373["number?"];
  var stash = _g373.stash;
  var atom63 = _g373["atom?"];
  var table63 = _g373["table?"];
  var id_literal63 = _g373["id-literal?"];
  var reverse = _g373.reverse;
  var module = _g373.module;
  var keep = _g373.keep;
  var drop = _g373.drop;
  var setenv = _g373.setenv;
  var module_key = _g373["module-key"];
  var length = _g373.length;
  var is63 = _g373["is?"];
  var _37message_handler = _g373["%message-handler"];
  var make_id = _g373["make-id"];
  var in63 = _g373["in?"];
  var tl = _g373.tl;
  var apply = _g373.apply;
  var inner = _g373.inner;
  var some63 = _g373["some?"];
  var composite63 = _g373["composite?"];
  var space = _g373.space;
  var find = _g373.find;
  var hd = _g373.hd;
  var _37 = _g373["%"];
  var code = _g373.code;
  var none63 = _g373["none?"];
  var _6261 = _g373[">="];
  var join = _g373.join;
  var reduce = _g373.reduce;
  var number = _g373.number;
  var unstash = _g373.unstash;
  var _ = _g373["-"];
  var sub = _g373.sub;
  var _43 = _g373["+"];
  var read_file = _g373["read-file"];
  var today = _g373.today;
  var _42 = _g373["*"];
  var string63 = _g373["string?"];
  var _6061 = _g373["<="];
  var _g376 = nexus["lumen/lib"];
  var variable63 = _g376["variable?"];
  var valid_id63 = _g376["valid-id?"];
  var bind = _g376.bind;
  var initial_environment = _g376["initial-environment"];
  var statement63 = _g376["statement?"];
  var symbol63 = _g376["symbol?"];
  var quote_modules = _g376["quote-modules"];
  var macro63 = _g376["macro?"];
  var mapo = _g376.mapo;
  var reserved63 = _g376["reserved?"];
  var macroexpand = _g376.macroexpand;
  var special63 = _g376["special?"];
  var bound63 = _g376["bound?"];
  var id = _g376.id;
  var getenv = _g376.getenv;
  var link = _g376.link;
  var key = _g376.key;
  var quote_environment = _g376["quote-environment"];
  var macro_function = _g376["macro-function"];
  var quoted = _g376.quoted;
  var quasiexpand = _g376.quasiexpand;
  var special_form63 = _g376["special-form?"];
  var indentation = _g376.indentation;
  var symbol_expansion = _g376["symbol-expansion"];
  var imported = _g376.imported;
  var bind42 = _g376["bind*"];
  var stash42 = _g376["stash*"];
  var _g377 = nexus["lumen/compiler"];
  var declare = _g377.declare;
  var compile = _g377.compile;
  var load_module = _g377["load-module"];
  var compile_function = _g377["compile-function"];
  var compile_module = _g377["compile-module"];
  var import_modules = _g377["import-modules"];
  var open_module = _g377["open-module"];
  var eval = _g377.eval;
  var in_module = _g377["in-module"];
  global.target = "js";
})();
(function () {
  nexus["lumen/boot"] = {};
  var _g675 = nexus["lumen/runtime"];
  var one63 = _g675["one?"];
  var boolean63 = _g675["boolean?"];
  var string_literal63 = _g675["string-literal?"];
  var _47 = _g675["/"];
  var _61 = _g675["="];
  var _62 = _g675[">"];
  var _60 = _g675["<"];
  var add = _g675.add;
  var write_file = _g675["write-file"];
  var write = _g675.write;
  var substring = _g675.substring;
  var exit = _g675.exit;
  var string = _g675.string;
  var nil63 = _g675["nil?"];
  var keys63 = _g675["keys?"];
  var cat = _g675.cat;
  var iterate = _g675.iterate;
  var map = _g675.map;
  var replicate = _g675.replicate;
  var last = _g675.last;
  var split = _g675.split;
  var char = _g675.char;
  var now = _g675.now;
  var function63 = _g675["function?"];
  var list63 = _g675["list?"];
  var empty63 = _g675["empty?"];
  var search = _g675.search;
  var pair = _g675.pair;
  var toplevel63 = _g675["toplevel?"];
  var sort = _g675.sort;
  var number63 = _g675["number?"];
  var stash = _g675.stash;
  var atom63 = _g675["atom?"];
  var table63 = _g675["table?"];
  var id_literal63 = _g675["id-literal?"];
  var reverse = _g675.reverse;
  var module = _g675.module;
  var keep = _g675.keep;
  var drop = _g675.drop;
  var setenv = _g675.setenv;
  var module_key = _g675["module-key"];
  var length = _g675.length;
  var is63 = _g675["is?"];
  var _37message_handler = _g675["%message-handler"];
  var make_id = _g675["make-id"];
  var in63 = _g675["in?"];
  var tl = _g675.tl;
  var apply = _g675.apply;
  var inner = _g675.inner;
  var some63 = _g675["some?"];
  var composite63 = _g675["composite?"];
  var space = _g675.space;
  var find = _g675.find;
  var hd = _g675.hd;
  var _37 = _g675["%"];
  var code = _g675.code;
  var none63 = _g675["none?"];
  var _6261 = _g675[">="];
  var join = _g675.join;
  var reduce = _g675.reduce;
  var number = _g675.number;
  var unstash = _g675.unstash;
  var _ = _g675["-"];
  var sub = _g675.sub;
  var _43 = _g675["+"];
  var read_file = _g675["read-file"];
  var today = _g675.today;
  var _42 = _g675["*"];
  var string63 = _g675["string?"];
  var _6061 = _g675["<="];
  var _g678 = nexus["lumen/lib"];
  var variable63 = _g678["variable?"];
  var valid_id63 = _g678["valid-id?"];
  var bind = _g678.bind;
  var initial_environment = _g678["initial-environment"];
  var statement63 = _g678["statement?"];
  var symbol63 = _g678["symbol?"];
  var quote_modules = _g678["quote-modules"];
  var macro63 = _g678["macro?"];
  var mapo = _g678.mapo;
  var reserved63 = _g678["reserved?"];
  var macroexpand = _g678.macroexpand;
  var special63 = _g678["special?"];
  var bound63 = _g678["bound?"];
  var id = _g678.id;
  var getenv = _g678.getenv;
  var link = _g678.link;
  var key = _g678.key;
  var quote_environment = _g678["quote-environment"];
  var macro_function = _g678["macro-function"];
  var quoted = _g678.quoted;
  var quasiexpand = _g678.quasiexpand;
  var special_form63 = _g678["special-form?"];
  var indentation = _g678.indentation;
  var symbol_expansion = _g678["symbol-expansion"];
  var imported = _g678.imported;
  var bind42 = _g678["bind*"];
  var stash42 = _g678["stash*"];
  var _g679 = nexus["lumen/compiler"];
  var declare = _g679.declare;
  var compile = _g679.compile;
  var load_module = _g679["load-module"];
  var compile_function = _g679["compile-function"];
  var compile_module = _g679["compile-module"];
  var import_modules = _g679["import-modules"];
  var open_module = _g679["open-module"];
  var eval = _g679.eval;
  var in_module = _g679["in-module"];
  global.modules = {"lumen/special": {export: {error: {export: true, special: function (x) {
    var _g761;
    if (target === "js") {
      _g761 = "throw new " + compile(["Error", x]);
    } else {
      _g761 = "error(" + compile(x) + ")";
    }
    var e = _g761;
    return(indentation() + e);
  }, stmt: true, foo: true}, "%if": {export: true, special: function (cond, cons, alt) {
    var _g692 = compile(cond);
    indent_level = indent_level + 1;
    var _g694 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g693 = _g694;
    var _g762;
    if (alt) {
      indent_level = indent_level + 1;
      var _g696 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g762 = _g696;
    }
    var _g695 = _g762;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g692 + ") {\n" + _g693 + ind + "}";
    } else {
      str = str + ind + "if " + _g692 + " then\n" + _g693;
    }
    if (_g695 && target === "js") {
      str = str + " else {\n" + _g695 + ind + "}";
    } else {
      if (_g695) {
        str = str + ind + "else\n" + _g695;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, tr: true, foo: true, stmt: true}, "%local-function": {export: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return(indentation() + x);
  }, tr: true, foo: true, stmt: true}, "while": {export: true, special: function (cond, form) {
    var _g697 = compile(cond);
    indent_level = indent_level + 1;
    var _g698 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g698;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g697 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g697 + " do\n" + body + ind + "end\n");
    }
  }, tr: true, foo: true, stmt: true}, "not": {}, "do": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "";
    var _g699 = forms;
    var _g700 = 0;
    while (_g700 < length(_g699)) {
      var x = _g699[_g700];
      str = str + compile(x, {_stash: true, stmt: true});
      _g700 = _g700 + 1;
    }
    return(str);
  }, tr: true, foo: true, stmt: true}, "%try": {export: true, special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g701 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g701;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g702 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g702;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, tr: true, foo: true, stmt: true}, "%local": {export: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g763;
    if (is63(value)) {
      _g763 = " = " + value1;
    } else {
      _g763 = "";
    }
    var rh = _g763;
    var _g764;
    if (target === "js") {
      _g764 = "var ";
    } else {
      _g764 = "local ";
    }
    var keyword = _g764;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, stmt: true, foo: true}, "return": {export: true, special: function (x) {
    var _g765;
    if (nil63(x)) {
      _g765 = "return";
    } else {
      _g765 = "return(" + compile(x) + ")";
    }
    var _g703 = _g765;
    return(indentation() + _g703);
  }, stmt: true, foo: true}, "%function": {export: true, special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true}, "%object": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var str = "{";
    var _g766;
    if (target === "lua") {
      _g766 = " = ";
    } else {
      _g766 = ": ";
    }
    var sep = _g766;
    var pairs = pair(forms);
    var n_1 = length(pairs) - 1;
    var _g704 = pairs;
    var i = 0;
    while (i < length(_g704)) {
      var _g705 = _g704[i];
      var k = _g705[0];
      var v = _g705[1];
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
  }, foo: true}, "%for": {export: true, special: function (t, k, form) {
    var _g706 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g707 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g707;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g706 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g706 + ") {\n" + body + ind + "}\n");
    }
  }, tr: true, foo: true, stmt: true}, "%array": {export: true, special: function () {
    var forms = unstash(Array.prototype.slice.call(arguments, 0));
    var _g767;
    if (target === "lua") {
      _g767 = "{";
    } else {
      _g767 = "[";
    }
    var open = _g767;
    var _g768;
    if (target === "lua") {
      _g768 = "}";
    } else {
      _g768 = "]";
    }
    var close = _g768;
    var str = "";
    var _g708 = forms;
    var i = 0;
    while (i < length(_g708)) {
      var x = _g708[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true}, "%global-function": {export: true, special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, tr: true, foo: true, stmt: true}, set: {export: true, special: function (lh, rh) {
    var _g709 = compile(lh);
    var _g769;
    if (nil63(rh)) {
      _g769 = "nil";
    } else {
      _g769 = rh;
    }
    var _g710 = compile(_g769);
    return(indentation() + _g709 + " = " + _g710);
  }, stmt: true, foo: true}, get: {export: true, special: function (t, k) {
    var _g711 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g711, 0) === "{") {
      _g711 = "(" + _g711 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g711 + "." + inner(k));
    } else {
      return(_g711 + "[" + k1 + "]");
    }
  }, foo: true}, "break": {export: true, special: function () {
    return(indentation() + "break");
  }, stmt: true, foo: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/core": {export: {"define*": {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g712 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (some63(_g712)) {
      var _g713 = bind42(x, _g712);
      var args = _g713[0];
      var _g714 = _g713[1];
      return(join(["%global-function", name, args], _g714));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g715 = sub(body, 0);
    if (length(bindings) < 2) {
      return(join(["do"], _g715));
    } else {
      var renames = [];
      var locals = [];
      var lh = bindings[0];
      var rh = bindings[1];
      var _g716 = bind(lh, rh);
      var _g717 = 0;
      while (_g717 < length(_g716)) {
        var _g718 = _g716[_g717];
        var id = _g718[0];
        var val = _g718[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var id1 = make_id();
          add(renames, id);
          add(renames, id1);
          id = id1;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g717 = _g717 + 1;
      }
      return(join(["do"], join(locals, [["let-symbol", renames, join(["let", sub(bindings, 2)], _g715)]])));
    }
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g719 = sub(body, 0);
    var form = join(["fn", args], _g719);
    var _g720 = ["setenv", ["quote", name]];
    _g720.macro = form;
    _g720.form = ["quote", form];
    eval(_g720);
    return(undefined);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g721 = sub(body, 0);
    add(environment, {});
    map(function (_g723) {
      var name = _g723[0];
      var exp = _g723[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pair(expansions));
    var _g722 = join(["do"], macroexpand(_g721));
    drop(environment);
    return(_g722);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var _g724 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g725 = ["table"];
    _g725._scope = scope;
    return(["do", ["add", "environment", _g725], ["let", [x, join(["do"], _g724)], ["drop", "environment"], x]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(["print", space(xs)]);
  }, export: true}, "set*": {macro: function (name, value) {
    return(link(name, ["set", name, value]));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g726 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g770;
    if (nil63(v)) {
      var _g771;
      if (b.i) {
        _g771 = "i";
      } else {
        _g771 = make_id();
      }
      var i = _g771;
      _g770 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g726), ["inc", i]]];
    } else {
      var _g727 = ["target"];
      _g727.js = ["isNaN", ["parseInt", k]];
      _g727.lua = ["not", ["number?", k]];
      _g770 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g727, join(["let", [v, ["get", t1, k]]], _g726)]]];
    }
    return(["let", [t1, t], _g770]);
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g728 = sub(body, 0);
    return(["if", cond, join(["do"], _g728)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g729 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g729)]);
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g730 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g731 = join(["do"], macroexpand(_g730));
    drop(environment);
    return(_g731);
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g732 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g732)]);
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g733 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g733) && target === "js") {
      return(link(name, ["%local", name, join(["fn", x], _g733)]));
    } else {
      if (some63(_g733)) {
        var _g734 = bind42(x, _g733);
        var args = _g734[0];
        var _g735 = _g734[1];
        return(link(name, join(["%local-function", name, args], _g735)));
      } else {
        return(link(name, ["%local", name, x]));
      }
    }
  }, export: true}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(Array.prototype.slice.call(arguments, 0));
    return(clauses[target]);
  }}, "set-of": {macro: function () {
    var xs = unstash(Array.prototype.slice.call(arguments, 0));
    var l = [];
    var _g736 = xs;
    var _g737 = 0;
    while (_g737 < length(_g736)) {
      var x = _g736[_g737];
      l[x] = true;
      _g737 = _g737 + 1;
    }
    return(join(["table"], l));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, table: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    return(join(["%object"], mapo(function (x) {
      return(x);
    }, body)));
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g738 = sub(body, 0);
    var _g739 = bind42(args, _g738);
    var _g740 = _g739[0];
    var _g741 = _g739[1];
    return(join(["%function", _g740], _g741));
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g742 = sub(body, 0);
    var exp = _g742.export;
    var imp = _g742.import;
    var alias = _g742.alias;
    var _g743 = import_modules(imp);
    var imports = _g743[0];
    var bindings = _g743[1];
    var k = module_key(spec);
    modules[k] = {export: {}, import: imports, alias: alias};
    var _g744 = exp || [];
    var _g745 = 0;
    while (_g745 < length(_g744)) {
      var x = _g744[_g745];
      setenv(x, {_stash: true, export: true});
      _g745 = _g745 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}, "with-bindings": {macro: function (_g746) {
    var names = _g746[0];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g747 = sub(body, 0);
    var x = make_id();
    var _g749 = ["setenv", x];
    _g749.variable = true;
    var _g748 = ["with-frame", ["each", [x], names, _g749]];
    _g748.scope = true;
    return(join(_g748, _g747));
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, list: {macro: function () {
    var body = unstash(Array.prototype.slice.call(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g750 = body;
      var k = undefined;
      for (k in _g750) {
        if (isNaN(parseInt(k))) {
          var v = _g750[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, at: {macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(Array.prototype.slice.call(arguments, 2));
    var _g751 = sub(body, 0);
    var form = join(["fn", args], _g751);
    var keys = sub(_g751, length(_g751));
    var _g752 = ["setenv", ["quote", name]];
    _g752.form = ["quote", form];
    _g752.special = form;
    eval(join(_g752, keys));
    return(undefined);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(Array.prototype.slice.call(arguments, 1));
    var _g753 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g753)]);
  }, export: true}, "if": {macro: function () {
    var branches = unstash(Array.prototype.slice.call(arguments, 0));
    var step = function (_g754) {
      var a = _g754[0];
      var b = _g754[1];
      var c = sub(_g754, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    };
    return(hd(step(branches)));
  }, export: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/compiler": {export: {"infix?": {variable: true}, "lower-special": {variable: true}, "lower-definition": {variable: true}, declare: {export: true, variable: true}, "lower-function": {variable: true}, "compiler-output": {variable: true}, compile: {export: true, variable: true}, reimported: {variable: true}, "compile-special": {variable: true}, "compile-atom": {variable: true}, infix: {variable: true}, "load-module": {export: true, variable: true}, "parenthesize-call?": {variable: true}, "unary?": {variable: true}, "lower-if": {variable: true}, "compile-function": {export: true, variable: true}, "%result": {export: true, global: true}, "%compile-module": {variable: true}, "lower-while": {variable: true}, "lower-call": {variable: true}, "lower-do": {variable: true}, "lower-infix": {variable: true}, "compiling?": {variable: true}, run: {variable: true}, getop: {variable: true}, "compile-module": {export: true, variable: true}, "op-delims": {variable: true}, "current-module": {export: true, global: true}, encapsulate: {variable: true}, "lower-try": {variable: true}, "import-modules": {export: true, variable: true}, "lower-short": {variable: true}, "open-module": {export: true, variable: true}, precedence: {variable: true}, "lower-statement": {variable: true}, "compile-file": {variable: true}, process: {variable: true}, "lower-for": {variable: true}, "module-path": {variable: true}, conclude: {variable: true}, "compile-call": {variable: true}, "can-return?": {variable: true}, "lower-body": {variable: true}, "lower-infix?": {variable: true}, eval: {export: true, variable: true}, "compile-args": {variable: true}, "compile-infix": {variable: true}, terminator: {variable: true}, "in-module": {export: true, variable: true}, lower: {variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "reader"]]}, lumen: {export: {}, import: [["lumen", "special"]], alias: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, user: {export: {}, import: ["lumen", ["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/lib": {export: {"variable?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, escape: {variable: true}, bind: {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "numeric?": {variable: true}, "statement?": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "macro?": {export: true, variable: true}, mapo: {export: true, variable: true}, exclude: {variable: true}, "reserved?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, "special?": {export: true, variable: true}, "bound?": {export: true, variable: true}, id: {export: true, variable: true}, literal: {variable: true}, "quote-module": {variable: true}, getenv: {export: true, variable: true}, "quoting?": {variable: true}, link: {export: true, variable: true}, key: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "macro-function": {export: true, variable: true}, "quote-frame": {variable: true}, quoted: {export: true, variable: true}, "quote-binding": {variable: true}, extend: {variable: true}, "valid-code?": {variable: true}, quasiexpand: {export: true, variable: true}, reserved: {variable: true}, "special-form?": {export: true, variable: true}, indentation: {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "quasiquote-list": {variable: true}, imported: {export: true, variable: true}, "quasisplice?": {variable: true}, "can-unquote?": {variable: true}, "bind*": {export: true, variable: true}, "quasiquoting?": {variable: true}, "global?": {variable: true}, "indent-level": {export: true, global: true}, "stash*": {export: true, variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}, "lumen/main": {export: {}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "reader"], ["lumen", "compiler"]]}, "lumen/system": {export: {nexus: {export: true, global: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/runtime": {export: {"one?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "/": {export: true, variable: true}, "=": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, add: {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, substring: {export: true, variable: true}, exit: {export: true, variable: true}, string: {export: true, variable: true}, "nil?": {export: true, variable: true}, "keys?": {export: true, variable: true}, cat: {export: true, variable: true}, iterate: {export: true, variable: true}, map: {export: true, variable: true}, replicate: {export: true, variable: true}, last: {export: true, variable: true}, split: {export: true, variable: true}, char: {export: true, variable: true}, print: {export: true, global: true}, now: {export: true, variable: true}, "function?": {export: true, variable: true}, "list?": {export: true, variable: true}, "empty?": {export: true, variable: true}, type: {variable: true}, search: {export: true, variable: true}, pair: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, sort: {export: true, variable: true}, "number?": {export: true, variable: true}, stash: {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, reverse: {export: true, variable: true}, module: {export: true, variable: true}, keep: {export: true, variable: true}, drop: {export: true, variable: true}, "id-count": {variable: true}, fs: {variable: true}, require: {export: true, global: true}, setenv: {export: true, variable: true}, "module-key": {export: true, variable: true}, length: {export: true, variable: true}, "is?": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "make-id": {export: true, variable: true}, "in?": {export: true, variable: true}, tl: {export: true, variable: true}, apply: {export: true, variable: true}, inner: {export: true, variable: true}, "some?": {export: true, variable: true}, "composite?": {export: true, variable: true}, space: {export: true, variable: true}, find: {export: true, variable: true}, hd: {export: true, variable: true}, "%": {export: true, variable: true}, code: {export: true, variable: true}, "none?": {export: true, variable: true}, ">=": {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, number: {export: true, variable: true}, unstash: {export: true, variable: true}, "-": {export: true, variable: true}, sub: {export: true, variable: true}, "+": {export: true, variable: true}, "read-file": {export: true, variable: true}, today: {export: true, variable: true}, "*": {export: true, variable: true}, "string?": {export: true, variable: true}, "<=": {export: true, variable: true}}, import: [["lumen", "special"], ["lumen", "core"]]}, "lumen/boot": {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {export: true, global: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"], ["lumen", "lib"], ["lumen", "compiler"]]}, "lumen/reader": {export: {"read-char": {variable: true}, "skip-non-code": {variable: true}, "make-stream": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g755) {
    var char = _g755[0];
    var stream = _g755[1];
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g756 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g756)]);
  }}, "flag?": {variable: true}, "key?": {variable: true}, "read-table": {export: true, variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, eof: {variable: true}, delimiters: {variable: true}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}}, import: [["lumen", "runtime"], ["lumen", "special"], ["lumen", "core"]]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(Array.prototype.slice.call(arguments, 1));
    var _g757 = sub(body, 0);
    var exp = _g757.export;
    var imp = _g757.import;
    var alias = _g757.alias;
    var _g758 = import_modules(imp);
    var imports = _g758[0];
    var bindings = _g758[1];
    var k = module_key(spec);
    modules[k] = {export: {}, import: imports, alias: alias};
    var _g759 = exp || [];
    var _g760 = 0;
    while (_g760 < length(_g759)) {
      var x = _g759[_g760];
      setenv(x, {_stash: true, export: true});
      _g760 = _g760 + 1;
    }
    return(join(["do", ["set", ["get", "nexus", ["quote", k]], ["table"]]], bindings));
  }, export: true}}];
})();
(function () {
  nexus.user = {};
  var _g772 = nexus["lumen/runtime"];
  var one63 = _g772["one?"];
  var boolean63 = _g772["boolean?"];
  var string_literal63 = _g772["string-literal?"];
  var _47 = _g772["/"];
  var _61 = _g772["="];
  var _62 = _g772[">"];
  var _60 = _g772["<"];
  var add = _g772.add;
  var write_file = _g772["write-file"];
  var write = _g772.write;
  var substring = _g772.substring;
  var exit = _g772.exit;
  var string = _g772.string;
  var nil63 = _g772["nil?"];
  var keys63 = _g772["keys?"];
  var cat = _g772.cat;
  var iterate = _g772.iterate;
  var map = _g772.map;
  var replicate = _g772.replicate;
  var last = _g772.last;
  var split = _g772.split;
  var char = _g772.char;
  var now = _g772.now;
  var function63 = _g772["function?"];
  var list63 = _g772["list?"];
  var empty63 = _g772["empty?"];
  var search = _g772.search;
  var pair = _g772.pair;
  var toplevel63 = _g772["toplevel?"];
  var sort = _g772.sort;
  var number63 = _g772["number?"];
  var stash = _g772.stash;
  var atom63 = _g772["atom?"];
  var table63 = _g772["table?"];
  var id_literal63 = _g772["id-literal?"];
  var reverse = _g772.reverse;
  var module = _g772.module;
  var keep = _g772.keep;
  var drop = _g772.drop;
  var setenv = _g772.setenv;
  var module_key = _g772["module-key"];
  var length = _g772.length;
  var is63 = _g772["is?"];
  var _37message_handler = _g772["%message-handler"];
  var make_id = _g772["make-id"];
  var in63 = _g772["in?"];
  var tl = _g772.tl;
  var apply = _g772.apply;
  var inner = _g772.inner;
  var some63 = _g772["some?"];
  var composite63 = _g772["composite?"];
  var space = _g772.space;
  var find = _g772.find;
  var hd = _g772.hd;
  var _37 = _g772["%"];
  var code = _g772.code;
  var none63 = _g772["none?"];
  var _6261 = _g772[">="];
  var join = _g772.join;
  var reduce = _g772.reduce;
  var number = _g772.number;
  var unstash = _g772.unstash;
  var _ = _g772["-"];
  var sub = _g772.sub;
  var _43 = _g772["+"];
  var read_file = _g772["read-file"];
  var today = _g772.today;
  var _42 = _g772["*"];
  var string63 = _g772["string?"];
  var _6061 = _g772["<="];
})();
(function () {
  nexus["lumen/main"] = {};
  var _g2 = nexus["lumen/runtime"];
  var one63 = _g2["one?"];
  var boolean63 = _g2["boolean?"];
  var string_literal63 = _g2["string-literal?"];
  var _47 = _g2["/"];
  var composite63 = _g2["composite?"];
  var _62 = _g2[">"];
  var _60 = _g2["<"];
  var add = _g2.add;
  var write_file = _g2["write-file"];
  var write = _g2.write;
  var substring = _g2.substring;
  var exit = _g2.exit;
  var string = _g2.string;
  var nil63 = _g2["nil?"];
  var keys63 = _g2["keys?"];
  var cat = _g2.cat;
  var iterate = _g2.iterate;
  var reduce = _g2.reduce;
  var string63 = _g2["string?"];
  var last = _g2.last;
  var split = _g2.split;
  var char = _g2.char;
  var now = _g2.now;
  var function63 = _g2["function?"];
  var list63 = _g2["list?"];
  var tl = _g2.tl;
  var some63 = _g2["some?"];
  var pair = _g2.pair;
  var toplevel63 = _g2["toplevel?"];
  var find = _g2.find;
  var number63 = _g2["number?"];
  var stash = _g2.stash;
  var atom63 = _g2["atom?"];
  var table63 = _g2["table?"];
  var id_literal63 = _g2["id-literal?"];
  var reverse = _g2.reverse;
  var module = _g2.module;
  var keep = _g2.keep;
  var hd = _g2.hd;
  var setenv = _g2.setenv;
  var module_key = _g2["module-key"];
  var length = _g2.length;
  var is63 = _g2["is?"];
  var _37message_handler = _g2["%message-handler"];
  var make_id = _g2["make-id"];
  var apply = _g2.apply;
  var space = _g2.space;
  var empty63 = _g2["empty?"];
  var inner = _g2.inner;
  var in63 = _g2["in?"];
  var read_file = _g2["read-file"];
  var _6061 = _g2["<="];
  var map = _g2.map;
  var _61 = _g2["="];
  var _37 = _g2["%"];
  var join = _g2.join;
  var none63 = _g2["none?"];
  var _6261 = _g2[">="];
  var replicate = _g2.replicate;
  var search = _g2.search;
  var number = _g2.number;
  var unstash = _g2.unstash;
  var _ = _g2["-"];
  var sub = _g2.sub;
  var _43 = _g2["+"];
  var sort = _g2.sort;
  var today = _g2.today;
  var _42 = _g2["*"];
  var drop = _g2.drop;
  var code = _g2.code;
  var _g5 = nexus["lumen/reader"];
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus["lumen/compiler"];
  var declare = _g6.declare;
  var compile = _g6.compile;
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  var compile_module = _g6["compile-module"];
  var import_modules = _g6["import-modules"];
  var open_module = _g6["open-module"];
  var eval = _g6.eval;
  var in_module = _g6["in-module"];
  var rep = function (str) {
    var _g775 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g777) {
        return([false, _g777.message]);
      }
    })();
    var _g1 = _g775[0];
    var x = _g775[1];
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
    var _g776 = args;
    var i = 0;
    while (i < length(_g776)) {
      var arg = _g776[i];
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
