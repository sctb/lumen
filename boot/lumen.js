(function () {
  global.nexus = {};
})();
(function () {
  function nil63(x) {
    return((x === undefined));
  }
  function is63(x) {
    return(!(nil63(x)));
  }
  function length(x) {
    return((x.length || 0));
  }
  function none63(x) {
    return((length(x) === 0));
  }
  function some63(x) {
    return((length(x) > 0));
  }
  function in63(x, l) {
    var _g20 = l;
    var _g21 = 0;
    while ((_g21 < length(_g20))) {
      var y = _g20[_g21];
      if ((x === y)) {
        return(true);
      }
      _g21 = (_g21 + 1);
    }
  }
  function hd(l) {
    return(l[0]);
  }
  function type(x) {
    return(typeof(x));
  }
  function string63(x) {
    return((type(x) === "string"));
  }
  function number63(x) {
    return((type(x) === "number"));
  }
  function boolean63(x) {
    return((type(x) === "boolean"));
  }
  function function63(x) {
    return((type(x) === "function"));
  }
  function composite63(x) {
    return((type(x) === "object"));
  }
  function atom63(x) {
    return(!(composite63(x)));
  }
  function table63(x) {
    return((composite63(x) && nil63(hd(x))));
  }
  function list63(x) {
    return((composite63(x) && is63(hd(x))));
  }
  function substring(str, from, upto) {
    return((str.substring)(from, upto));
  }
  function sublist(l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  }
  function sub(x, from, upto) {
    var _g22 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g22, upto));
    } else {
      var l = sublist(x, _g22, upto);
      var _g23 = x;
      var k = undefined;
      for (k in _g23) {
        if (isNaN(parseInt(k))) {
          var v = _g23[k];
          l[k] = v;
        }
      }
      return(l);
    }
  }
  function inner(x) {
    return(sub(x, 1, (length(x) - 1)));
  }
  function tl(l) {
    return(sub(l, 1));
  }
  function char(str, n) {
    return((str.charAt)(n));
  }
  function code(str, n) {
    return((str.charCodeAt)(n));
  }
  function string_literal63(x) {
    return((string63(x) && (char(x, 0) === "\"")));
  }
  function id_literal63(x) {
    return((string63(x) && (char(x, 0) === "|")));
  }
  function add(l, x) {
    (l.push)(x);
    return(undefined);
  }
  function drop(l) {
    return((l.pop)());
  }
  function last(l) {
    return(l[(length(l) - 1)]);
  }
  function reverse(l) {
    var l1 = sub(l, length(l));
    var i = (length(l) - 1);
    while ((i >= 0)) {
      add(l1, l[i]);
      i = (i - 1);
    }
    return(l1);
  }
  function join(l1, l2) {
    if ((nil63(l2) && nil63(l1))) {
      return([]);
    } else {
      if (nil63(l1)) {
        return(join([], l2));
      } else {
        if (nil63(l2)) {
          return(join(l1, []));
        } else {
          var l = [];
          var skip63 = false;
          if ((list63(l1) && list63(l2))) {
            l = (l1.concat)(l2);
            skip63 = true;
          }
          if (!(skip63)) {
            var i = 0;
            var len = length(l1);
            while ((i < len)) {
              l[i] = l1[i];
              i = (i + 1);
            }
            while ((i < (len + length(l2)))) {
              l[i] = l2[(i - len)];
              i = (i + 1);
            }
          }
          var _g24 = l1;
          var k = undefined;
          for (k in _g24) {
            if (isNaN(parseInt(k))) {
              var v = _g24[k];
              l[k] = v;
            }
          }
          var _g25 = l2;
          var k = undefined;
          for (k in _g25) {
            if (isNaN(parseInt(k))) {
              var v = _g25[k];
              l[k] = v;
            }
          }
          return(l);
        }
      }
    }
  }
  function reduce(f, x) {
    if (none63(x)) {
      return(x);
    } else {
      if ((length(x) === 1)) {
        return(hd(x));
      } else {
        return(f(hd(x), reduce(f, tl(x))));
      }
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g26 = l;
    var _g27 = 0;
    while ((_g27 < length(_g26))) {
      var x = _g26[_g27];
      if (f(x)) {
        add(l1, x);
      }
      _g27 = (_g27 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g28 = l;
    var _g29 = 0;
    while ((_g29 < length(_g28))) {
      var x = _g28[_g29];
      var _g30 = f(x);
      if (_g30) {
        return(_g30);
      }
      _g29 = (_g29 + 1);
    }
  }
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while ((i < length(l))) {
      add(l1, [l[i], l[(i + 1)]]);
      i = (i + 2);
    }
    return(l1);
  }
  function iterate(f, count) {
    var i = 0;
    while ((i < count)) {
      f(i);
      i = (i + 1);
    }
  }
  function replicate(n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  }
  function splice(x) {
    return({_splice: true, value: x});
  }
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  function mapl(f, l) {
    var l1 = [];
    var _g31 = l;
    var _g32 = 0;
    while ((_g32 < length(_g31))) {
      var x = _g31[_g32];
      var _g33 = f(x);
      if (splice63(_g33)) {
        l1 = join(l1, _g33.value);
      } else {
        if (is63(_g33)) {
          add(l1, _g33);
        }
      }
      _g32 = (_g32 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g34 = t;
    var k = undefined;
    for (k in _g34) {
      if (isNaN(parseInt(k))) {
        var v = _g34[k];
        var x = f(v);
        if (splice63(x)) {
          l[k] = x.value;
        } else {
          if (is63(x)) {
            l[k] = x;
          }
        }
      }
    }
    return(l);
  }
  function keys63(t) {
    var k63 = false;
    var _g35 = t;
    var k = undefined;
    for (k in _g35) {
      if (isNaN(parseInt(k))) {
        var v = _g35[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  }
  function empty63(t) {
    return((none63(t) && !(keys63(t))));
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g36 = args;
      var k = undefined;
      for (k in _g36) {
        if (isNaN(parseInt(k))) {
          var v = _g36[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  function unstash(args) {
    if (none63(args)) {
      return([]);
    } else {
      var l = last(args);
      if ((table63(l) && l._stash)) {
        var args1 = sub(args, 0, (length(args) - 1));
        var _g37 = l;
        var k = undefined;
        for (k in _g37) {
          if (isNaN(parseInt(k))) {
            var v = _g37[k];
            if (!((k === "_stash"))) {
              args1[k] = v;
            }
          }
        }
        return(args1);
      } else {
        return(args);
      }
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g38 = sub(xs, 0);
    return(join(t, _g38));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g39 = sub(keys, 0);
    var t1 = sublist(t);
    var _g40 = t;
    var k = undefined;
    for (k in _g40) {
      if (isNaN(parseInt(k))) {
        var v = _g40[k];
        if (!(_g39[k])) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  function search(str, pattern, start) {
    var i = (str.indexOf)(pattern, start);
    if ((i >= 0)) {
      return(i);
    }
  }
  function split(str, sep) {
    return((str.split)(sep));
  }
  function cat() {
    var xs = unstash(sublist(arguments, 0));
    var _g41 = sub(xs, 0);
    if (none63(_g41)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g41));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g42));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g43)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g44));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g45)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g46)));
  }
  function _62(a, b) {
    return((a > b));
  }
  function _60(a, b) {
    return((a < b));
  }
  function _61(a, b) {
    return((a === b));
  }
  function _6261(a, b) {
    return((a >= b));
  }
  function _6061(a, b) {
    return((a <= b));
  }
  global.require = require;
  var fs = require("fs");
  function read_file(path) {
    return((fs.readFileSync)(path, "utf8"));
  }
  function write_file(path, data) {
    return((fs.writeFileSync)(path, data, "utf8"));
  }
  print = function (x) {
    return((console.log)(x));
  };
  function type(x) {
    return(typeof(x));
  }
  function write(x) {
    return((process.stdout.write)(x));
  }
  function exit(code) {
    return((process.exit)(code));
  }
  function parse_number(str) {
    var n = parseFloat(str);
    if (!(isNaN(n))) {
      return(n);
    }
  }
  function to_string(x) {
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
            return((x + ""));
          } else {
            var str = "(";
            var x1 = sub(x);
            var _g47 = x;
            var k = undefined;
            for (k in _g47) {
              if (isNaN(parseInt(k))) {
                var v = _g47[k];
                add(x1, (k + ":"));
                add(x1, v);
              }
            }
            var _g48 = x1;
            var i = 0;
            while ((i < length(_g48))) {
              var y = _g48[i];
              str = (str + to_string(y));
              if ((i < (length(x1) - 1))) {
                str = (str + " ");
              }
              i = (i + 1);
            }
            return((str + ")"));
          }
        }
      }
    }
  }
  function apply(f, args) {
    var _g49 = stash(args);
    return((f.apply)(f, _g49));
  }
  var id_count = 0;
  function make_id() {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  }
  function toplevel63() {
    return((length(environment) === 1));
  }
  function module_key(spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw new Error("Unsupported module specification");
    }
  }
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g50 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
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
  }
  var _g52 = {};
  nexus.runtime = _g52;
  _g52.substring = substring;
  _g52.map = map;
  _g52["empty?"] = empty63;
  _g52["%"] = _37;
  _g52.replicate = replicate;
  _g52.pairwise = pairwise;
  _g52.module = module;
  _g52["table?"] = table63;
  _g52.length = length;
  _g52["in?"] = in63;
  _g52.extend = extend;
  _g52["string?"] = string63;
  _g52.apply = apply;
  _g52["<"] = _60;
  _g52["="] = _61;
  _g52.write = write;
  _g52.unstash = unstash;
  _g52.splice = splice;
  _g52["/"] = _47;
  _g52["is?"] = is63;
  _g52["number?"] = number63;
  _g52["-"] = _;
  _g52["<="] = _6061;
  _g52[">="] = _6261;
  _g52.char = char;
  _g52.exit = exit;
  _g52.hd = hd;
  _g52.fs = fs;
  _g52["to-string"] = to_string;
  _g52["boolean?"] = boolean63;
  _g52.cat = cat;
  _g52["list?"] = list63;
  _g52.keep = keep;
  _g52.last = last;
  _g52.join = join;
  _g52.search = search;
  _g52.stash = stash;
  _g52["splice?"] = splice63;
  _g52["nil?"] = nil63;
  _g52.find = find;
  _g52["id-count"] = id_count;
  _g52["string-literal?"] = string_literal63;
  _g52.tl = tl;
  _g52["%message-handler"] = _37message_handler;
  _g52["id-literal?"] = id_literal63;
  _g52["composite?"] = composite63;
  _g52.sub = sub;
  _g52["atom?"] = atom63;
  _g52.mapl = mapl;
  _g52["keys?"] = keys63;
  _g52.split = split;
  _g52.iterate = iterate;
  _g52["function?"] = function63;
  _g52.type = type;
  _g52["module-key"] = module_key;
  _g52["toplevel?"] = toplevel63;
  _g52["make-id"] = make_id;
  _g52[">"] = _62;
  _g52.add = add;
  _g52["parse-number"] = parse_number;
  _g52.inner = inner;
  _g52["none?"] = none63;
  _g52.reverse = reverse;
  _g52["some?"] = some63;
  _g52["write-file"] = write_file;
  _g52["read-file"] = read_file;
  _g52.exclude = exclude;
  _g52.drop = drop;
  _g52.sublist = sublist;
  _g52.setenv = setenv;
  _g52.code = code;
  _g52["*"] = _42;
  _g52["+"] = _43;
  _g52.reduce = reduce;
})();
(function () {
  var _g57 = nexus.runtime;
  var substring = _g57.substring;
  var map = _g57.map;
  var empty63 = _g57["empty?"];
  var _37 = _g57["%"];
  var replicate = _g57.replicate;
  var pairwise = _g57.pairwise;
  var module = _g57.module;
  var table63 = _g57["table?"];
  var length = _g57.length;
  var in63 = _g57["in?"];
  var extend = _g57.extend;
  var string63 = _g57["string?"];
  var apply = _g57.apply;
  var _60 = _g57["<"];
  var _61 = _g57["="];
  var write = _g57.write;
  var unstash = _g57.unstash;
  var splice = _g57.splice;
  var _47 = _g57["/"];
  var is63 = _g57["is?"];
  var number63 = _g57["number?"];
  var _ = _g57["-"];
  var _6061 = _g57["<="];
  var _6261 = _g57[">="];
  var char = _g57.char;
  var exit = _g57.exit;
  var hd = _g57.hd;
  var to_string = _g57["to-string"];
  var boolean63 = _g57["boolean?"];
  var cat = _g57.cat;
  var list63 = _g57["list?"];
  var keep = _g57.keep;
  var last = _g57.last;
  var join = _g57.join;
  var search = _g57.search;
  var stash = _g57.stash;
  var nil63 = _g57["nil?"];
  var find = _g57.find;
  var string_literal63 = _g57["string-literal?"];
  var tl = _g57.tl;
  var _37message_handler = _g57["%message-handler"];
  var id_literal63 = _g57["id-literal?"];
  var composite63 = _g57["composite?"];
  var sub = _g57.sub;
  var atom63 = _g57["atom?"];
  var keys63 = _g57["keys?"];
  var split = _g57.split;
  var iterate = _g57.iterate;
  var function63 = _g57["function?"];
  var module_key = _g57["module-key"];
  var toplevel63 = _g57["toplevel?"];
  var make_id = _g57["make-id"];
  var _62 = _g57[">"];
  var add = _g57.add;
  var parse_number = _g57["parse-number"];
  var inner = _g57.inner;
  var none63 = _g57["none?"];
  var reverse = _g57.reverse;
  var some63 = _g57["some?"];
  var write_file = _g57["write-file"];
  var read_file = _g57["read-file"];
  var exclude = _g57.exclude;
  var drop = _g57.drop;
  var sublist = _g57.sublist;
  var setenv = _g57.setenv;
  var code = _g57.code;
  var _42 = _g57["*"];
  var _43 = _g57["+"];
  var reduce = _g57.reduce;
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g60 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g61 = undefined;
        var _g62 = _g60;
        var x = undefined;
        for (x in _g62) {
          if (isNaN(parseInt(x))) {
            var _g53 = _g62[x];
            _g61 = x;
          }
        }
        if (_g61) {
          return(b[_g61]);
        } else {
          return(b);
        }
      }
    }
  }
  function macro_function(k) {
    return(getenv(k, {_stash: true, macro: true}));
  }
  function macro63(k) {
    return(is63(macro_function(k)));
  }
  function special63(k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  }
  function special_form63(form) {
    return((list63(form) && special63(hd(form))));
  }
  function statement63(k) {
    return((special63(k) && getenv(k, {_stash: true, stmt: true})));
  }
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
  }
  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }
  function variable63(k) {
    var b = find(function (frame) {
      return((frame[k] || frame._scope));
    }, reverse(environment));
    return((table63(b) && is63(b.variable)));
  }
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  function bound63(x) {
    return((macro63(x) || (special63(x) || (symbol63(x) || (variable63(x) || global63(x))))));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while ((i < length(str))) {
      var c = char(str, i);
      var _g63;
      if ((c === "\n")) {
        _g63 = "\\n";
      } else {
        var _g64;
        if ((c === "\"")) {
          _g64 = "\\\"";
        } else {
          var _g65;
          if ((c === "\\")) {
            _g65 = "\\\\";
          } else {
            _g65 = c;
          }
          _g64 = _g65;
        }
        _g63 = _g64;
      }
      var c1 = _g63;
      str1 = (str1 + c1);
      i = (i + 1);
    }
    return((str1 + "\""));
  }
  function quoted(form) {
    if (string63(form)) {
      return(escape(form));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        return(join(["list"], map(quoted, form)));
      }
    }
  }
  function stash42(args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var _g66 = args;
      var k = undefined;
      for (k in _g66) {
        if (isNaN(parseInt(k))) {
          var v = _g66[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  }
  function bind(lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var r = lh.rest;
        var _g67 = lh;
        var i = 0;
        while ((i < length(_g67))) {
          var x = _g67[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g68 = lh;
        var k = undefined;
        for (k in _g68) {
          if (isNaN(parseInt(k))) {
            var v = _g68[k];
            if ((v === true)) {
              v = k;
            }
            if (!((k === "rest"))) {
              bs = join(bs, bind(v, ["get", rh, ["quote", k]]));
            }
          }
        }
        return(bs);
      }
    }
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if ((target === "js")) {
        return(["unstash", ["sublist", "arguments", length(args1)]]);
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest()]], body)]]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g69 = args;
      var _g70 = 0;
      while ((_g70 < length(_g69))) {
        var arg = _g69[_g70];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g70 = (_g70 + 1);
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
  }
  function quoting63(depth) {
    return(number63(depth));
  }
  function quasiquoting63(depth) {
    return((quoting63(depth) && (depth > 0)));
  }
  function can_unquote63(depth) {
    return((quoting63(depth) && (depth === 1)));
  }
  function quasisplice63(x, depth) {
    return((list63(x) && (can_unquote63(depth) && (hd(x) === "unquote-splicing"))));
  }
  function macroexpand(form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if ((x === "%function")) {
          var _g54 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g73 = args;
          var _g74 = 0;
          while ((_g74 < length(_g73))) {
            var _g71 = _g73[_g74];
            setenv(_g71, {_stash: true, variable: true});
            _g74 = (_g74 + 1);
          }
          var _g72 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g72);
        } else {
          if (((x === "%local-function") || (x === "%global-function"))) {
            var _g55 = form[0];
            var name = form[1];
            var _g75 = form[2];
            var _g76 = sub(form, 3);
            add(environment, {_scope: true});
            var _g79 = _g75;
            var _g80 = 0;
            while ((_g80 < length(_g79))) {
              var _g77 = _g79[_g80];
              setenv(_g77, {_stash: true, variable: true});
              _g80 = (_g80 + 1);
            }
            var _g78 = join([x, name, map(macroexpand, _g75)], macroexpand(_g76));
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
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g81 = form;
    var k = undefined;
    for (k in _g81) {
      if (isNaN(parseInt(k))) {
        var v = _g81[k];
        var _g86;
        if (quasisplice63(v, depth)) {
          _g86 = quasiexpand(v[1]);
        } else {
          _g86 = quasiexpand(v, depth);
        }
        var _g82 = _g86;
        last(xs)[k] = _g82;
      }
    }
    var _g83 = form;
    var _g84 = 0;
    while ((_g84 < length(_g83))) {
      var x = _g83[_g84];
      if (quasisplice63(x, depth)) {
        var _g85 = quasiexpand(x[1]);
        add(xs, _g85);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g84 = (_g84 + 1);
    }
    var pruned = keep(function (x) {
      return(((length(x) > 1) || (!((hd(x) === "list")) || keys63(x))));
    }, xs);
    return(join(["join*"], pruned));
  };
  quasiexpand = function (form, depth) {
    if (quasiquoting63(depth)) {
      if (atom63(form)) {
        return(["quote", form]);
      } else {
        if ((can_unquote63(depth) && (hd(form) === "unquote"))) {
          return(quasiexpand(form[1]));
        } else {
          if (((hd(form) === "unquote") || (hd(form) === "unquote-splicing"))) {
            return(quasiquote_list(form, (depth - 1)));
          } else {
            if ((hd(form) === "quasiquote")) {
              return(quasiquote_list(form, (depth + 1)));
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
        if ((hd(form) === "quote")) {
          return(form);
        } else {
          if ((hd(form) === "quasiquote")) {
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
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"return": true, "for": true, "catch": true, "<": true, "<=": true, "%": true, "break": true, "then": true, "do": true, "debugger": true, "local": true, "this": true, "typeof": true, "*": true, "elseif": true, "throw": true, ">=": true, "continue": true, "new": true, ">": true, "end": true, "while": true, "if": true, "nil": true, "instanceof": true, "with": true, "=": true, "else": true, "==": true, "delete": true, "false": true, "until": true, "repeat": true, "or": true, "and": true, "finally": true, "void": true, "not": true, "switch": true, "function": true, "try": true, "in": true, "case": true, "+": true, "var": true, "default": true, "-": true, "true": true, "/": true};
  function reserved63(x) {
    return(reserved[x]);
  }
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || (((n > 64) && (n < 91)) || (((n > 96) && (n < 123)) || (n === 95)))));
  }
  function valid_id63(id) {
    if (none63(id)) {
      return(false);
    } else {
      if (special63(id)) {
        return(false);
      } else {
        if (reserved63(id)) {
          return(false);
        } else {
          var i = 0;
          while ((i < length(id))) {
            var n = code(id, i);
            var valid63 = valid_char63(n);
            if ((!(valid63) || ((i === 0) && numeric63(n)))) {
              return(false);
            }
            i = (i + 1);
          }
          return(true);
        }
      }
    }
  }
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while ((i < length(id))) {
      var c = char(id, i);
      var n = code(c);
      var _g91;
      if ((c === "-")) {
        _g91 = "_";
      } else {
        var _g92;
        if (valid_char63(n)) {
          _g92 = c;
        } else {
          var _g93;
          if ((i === 0)) {
            _g93 = ("_" + n);
          } else {
            _g93 = n;
          }
          _g92 = _g93;
        }
        _g91 = _g92;
      }
      var c1 = _g91;
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g94 = module(current_module).export;
    var n = undefined;
    for (n in _g94) {
      if (isNaN(parseInt(n))) {
        var b = _g94[n];
        if (b.variable) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join([["%local", m, ["table"]], ["set", ["get", "nexus", ["quote", k]], m]], exports));
    } else {
      return([]);
    }
  }
  function imported(spec) {
    var _g95 = unstash(sublist(arguments, 1));
    var all = _g95.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g96 = module(spec).export;
      var n = undefined;
      for (n in _g96) {
        if (isNaN(parseInt(n))) {
          var b = _g96[n];
          if ((b.variable && (all || b.export))) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], imports));
    }
  }
  function quote_binding(b) {
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
    } else {
      if ((b.macro && b.form)) {
        return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
      } else {
        if ((b.special && b.form)) {
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
  }
  function mapo(f, t) {
    var o = [];
    var _g97 = t;
    var k = undefined;
    for (k in _g97) {
      if (isNaN(parseInt(k))) {
        var v = _g97[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g56, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    var _g98 = ["table"];
    _g98.import = quoted(m.import);
    _g98.export = quote_frame(m.export);
    return(_g98);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g99 = {};
  nexus.utilities = _g99;
  _g99.exported = exported;
  _g99.escape = escape;
  _g99["can-unquote?"] = can_unquote63;
  _g99.quasiexpand = quasiexpand;
  _g99["symbol?"] = symbol63;
  _g99["quote-binding"] = quote_binding;
  _g99.macroexpand = macroexpand;
  _g99["macro?"] = macro63;
  _g99["reserved?"] = reserved63;
  _g99.bind = bind;
  _g99["valid-id?"] = valid_id63;
  _g99["symbol-expansion"] = symbol_expansion;
  _g99["to-id"] = to_id;
  _g99["variable?"] = variable63;
  _g99.indentation = indentation;
  _g99["statement?"] = statement63;
  _g99["quote-module"] = quote_module;
  _g99["toplevel?"] = toplevel63;
  _g99.reserved = reserved;
  _g99.getenv = getenv;
  _g99["special-form?"] = special_form63;
  _g99["special?"] = special63;
  _g99["macro-function"] = macro_function;
  _g99["quote-frame"] = quote_frame;
  _g99["bound?"] = bound63;
  _g99["stash*"] = stash42;
  _g99["numeric?"] = numeric63;
  _g99["quasiquote-list"] = quasiquote_list;
  _g99["quasisplice?"] = quasisplice63;
  _g99["bind*"] = bind42;
  _g99.quoted = quoted;
  _g99["valid-char?"] = valid_char63;
  _g99["quasiquoting?"] = quasiquoting63;
  _g99["quoting?"] = quoting63;
  _g99["initial-environment"] = initial_environment;
  _g99["global?"] = global63;
  _g99["quote-modules"] = quote_modules;
  _g99["quote-environment"] = quote_environment;
  _g99.mapo = mapo;
  _g99.imported = imported;
})();
(function () {
  var _g100 = nexus.runtime;
  var substring = _g100.substring;
  var map = _g100.map;
  var empty63 = _g100["empty?"];
  var _37 = _g100["%"];
  var replicate = _g100.replicate;
  var pairwise = _g100.pairwise;
  var module = _g100.module;
  var table63 = _g100["table?"];
  var length = _g100.length;
  var in63 = _g100["in?"];
  var extend = _g100.extend;
  var string63 = _g100["string?"];
  var apply = _g100.apply;
  var _60 = _g100["<"];
  var _61 = _g100["="];
  var write = _g100.write;
  var unstash = _g100.unstash;
  var splice = _g100.splice;
  var _47 = _g100["/"];
  var is63 = _g100["is?"];
  var number63 = _g100["number?"];
  var _ = _g100["-"];
  var _6061 = _g100["<="];
  var _6261 = _g100[">="];
  var char = _g100.char;
  var exit = _g100.exit;
  var hd = _g100.hd;
  var to_string = _g100["to-string"];
  var boolean63 = _g100["boolean?"];
  var cat = _g100.cat;
  var list63 = _g100["list?"];
  var keep = _g100.keep;
  var last = _g100.last;
  var join = _g100.join;
  var search = _g100.search;
  var stash = _g100.stash;
  var nil63 = _g100["nil?"];
  var find = _g100.find;
  var string_literal63 = _g100["string-literal?"];
  var tl = _g100.tl;
  var _37message_handler = _g100["%message-handler"];
  var id_literal63 = _g100["id-literal?"];
  var composite63 = _g100["composite?"];
  var sub = _g100.sub;
  var atom63 = _g100["atom?"];
  var keys63 = _g100["keys?"];
  var split = _g100.split;
  var iterate = _g100.iterate;
  var function63 = _g100["function?"];
  var module_key = _g100["module-key"];
  var toplevel63 = _g100["toplevel?"];
  var make_id = _g100["make-id"];
  var _62 = _g100[">"];
  var add = _g100.add;
  var parse_number = _g100["parse-number"];
  var inner = _g100.inner;
  var none63 = _g100["none?"];
  var reverse = _g100.reverse;
  var some63 = _g100["some?"];
  var write_file = _g100["write-file"];
  var read_file = _g100["read-file"];
  var exclude = _g100.exclude;
  var drop = _g100.drop;
  var sublist = _g100.sublist;
  var setenv = _g100.setenv;
  var code = _g100.code;
  var _42 = _g100["*"];
  var _43 = _g100["+"];
  var reduce = _g100.reduce;
  var delimiters = {")": true, "(": true, "\n": true, ";": true};
  var whitespace = {"\t": true, "\n": true, " ": true};
  function make_stream(str) {
    return({pos: 0, string: str, len: length(str)});
  }
  function peek_char(s) {
    if ((s.pos < s.len)) {
      return(char(s.string, s.pos));
    }
  }
  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = (s.pos + 1);
      return(c);
    }
  }
  function skip_non_code(s) {
    while (true) {
      var c = peek_char(s);
      if (nil63(c)) {
        break;
      } else {
        if (whitespace[c]) {
          read_char(s);
        } else {
          if ((c === ";")) {
            while ((c && !((c === "\n")))) {
              c = read_char(s);
            }
            skip_non_code(s);
          } else {
            break;
          }
        }
      }
    }
  }
  var read_table = {};
  var eof = {};
  function read(s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return(((read_table[c] || read_table[""]))(s));
    } else {
      return(eof);
    }
  }
  function read_all(s) {
    var l = [];
    while (true) {
      var form = read(s);
      if ((form === eof)) {
        break;
      }
      add(l, form);
    }
    return(l);
  }
  function read_from_string(str) {
    return(read(make_stream(str)));
  }
  function key63(atom) {
    return((string63(atom) && ((length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":"))));
  }
  function flag63(atom) {
    return((string63(atom) && ((length(atom) > 1) && (char(atom, 0) === ":"))));
  }
  read_table[""] = function (s) {
    var str = "";
    var dot63 = false;
    while (true) {
      var c = peek_char(s);
      if ((c && (!(whitespace[c]) && !(delimiters[c])))) {
        if ((c === ".")) {
          dot63 = true;
        }
        str = (str + c);
        read_char(s);
      } else {
        break;
      }
    }
    var n = parse_number(str);
    if (is63(n)) {
      return(n);
    } else {
      if ((str === "true")) {
        return(true);
      } else {
        if ((str === "false")) {
          return(false);
        } else {
          if ((str === "_")) {
            return(make_id());
          } else {
            if (dot63) {
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
      if ((c && !((c === ")")))) {
        var x = read(s);
        if (key63(x)) {
          var k = sub(x, 0, (length(x) - 1));
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
          throw new Error(("Expected ) at " + s.pos));
        }
      }
    }
    return(l);
  };
  read_table[")"] = function (s) {
    throw new Error(("Unexpected ) at " + s.pos));
  };
  read_table["\""] = function (s) {
    read_char(s);
    var str = "\"";
    while (true) {
      var c = peek_char(s);
      if ((c && !((c === "\"")))) {
        if ((c === "\\")) {
          str = (str + read_char(s));
        }
        str = (str + read_char(s));
      } else {
        if (c) {
          read_char(s);
          break;
        } else {
          throw new Error(("Expected \" at " + s.pos));
        }
      }
    }
    return((str + "\""));
  };
  read_table["|"] = function (s) {
    read_char(s);
    var str = "|";
    while (true) {
      var c = peek_char(s);
      if ((c && !((c === "|")))) {
        str = (str + read_char(s));
      } else {
        if (c) {
          read_char(s);
          break;
        } else {
          throw new Error(("Expected | at " + s.pos));
        }
      }
    }
    return((str + "|"));
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
    if ((peek_char(s) === "@")) {
      read_char(s);
      return(["unquote-splicing", read(s)]);
    } else {
      return(["unquote", read(s)]);
    }
  };
  var _g110 = {};
  nexus.reader = _g110;
  _g110["read-all"] = read_all;
  _g110["read-table"] = read_table;
  _g110["read-from-string"] = read_from_string;
  _g110.delimiters = delimiters;
  _g110.read = read;
  _g110["skip-non-code"] = skip_non_code;
  _g110["flag?"] = flag63;
  _g110["key?"] = key63;
  _g110.whitespace = whitespace;
  _g110.eof = eof;
  _g110["read-char"] = read_char;
  _g110["peek-char"] = peek_char;
  _g110["make-stream"] = make_stream;
})();
(function () {
  var _g111 = nexus.runtime;
  var substring = _g111.substring;
  var map = _g111.map;
  var empty63 = _g111["empty?"];
  var _37 = _g111["%"];
  var replicate = _g111.replicate;
  var pairwise = _g111.pairwise;
  var module = _g111.module;
  var table63 = _g111["table?"];
  var length = _g111.length;
  var in63 = _g111["in?"];
  var extend = _g111.extend;
  var string63 = _g111["string?"];
  var apply = _g111.apply;
  var _60 = _g111["<"];
  var _61 = _g111["="];
  var write = _g111.write;
  var unstash = _g111.unstash;
  var splice = _g111.splice;
  var _47 = _g111["/"];
  var is63 = _g111["is?"];
  var number63 = _g111["number?"];
  var _ = _g111["-"];
  var _6061 = _g111["<="];
  var _6261 = _g111[">="];
  var char = _g111.char;
  var exit = _g111.exit;
  var hd = _g111.hd;
  var to_string = _g111["to-string"];
  var boolean63 = _g111["boolean?"];
  var cat = _g111.cat;
  var list63 = _g111["list?"];
  var keep = _g111.keep;
  var last = _g111.last;
  var join = _g111.join;
  var search = _g111.search;
  var stash = _g111.stash;
  var nil63 = _g111["nil?"];
  var find = _g111.find;
  var string_literal63 = _g111["string-literal?"];
  var tl = _g111.tl;
  var _37message_handler = _g111["%message-handler"];
  var id_literal63 = _g111["id-literal?"];
  var composite63 = _g111["composite?"];
  var sub = _g111.sub;
  var atom63 = _g111["atom?"];
  var keys63 = _g111["keys?"];
  var split = _g111.split;
  var iterate = _g111.iterate;
  var function63 = _g111["function?"];
  var module_key = _g111["module-key"];
  var toplevel63 = _g111["toplevel?"];
  var make_id = _g111["make-id"];
  var _62 = _g111[">"];
  var add = _g111.add;
  var parse_number = _g111["parse-number"];
  var inner = _g111.inner;
  var none63 = _g111["none?"];
  var reverse = _g111.reverse;
  var some63 = _g111["some?"];
  var write_file = _g111["write-file"];
  var read_file = _g111["read-file"];
  var exclude = _g111.exclude;
  var drop = _g111.drop;
  var sublist = _g111.sublist;
  var setenv = _g111.setenv;
  var code = _g111.code;
  var _42 = _g111["*"];
  var _43 = _g111["+"];
  var reduce = _g111.reduce;
  var _g112 = nexus.utilities;
  var exported = _g112.exported;
  var quasiexpand = _g112.quasiexpand;
  var symbol63 = _g112["symbol?"];
  var macroexpand = _g112.macroexpand;
  var macro63 = _g112["macro?"];
  var reserved63 = _g112["reserved?"];
  var bind = _g112.bind;
  var valid_id63 = _g112["valid-id?"];
  var symbol_expansion = _g112["symbol-expansion"];
  var to_id = _g112["to-id"];
  var variable63 = _g112["variable?"];
  var indentation = _g112.indentation;
  var statement63 = _g112["statement?"];
  var toplevel63 = _g112["toplevel?"];
  var getenv = _g112.getenv;
  var special_form63 = _g112["special-form?"];
  var special63 = _g112["special?"];
  var macro_function = _g112["macro-function"];
  var bound63 = _g112["bound?"];
  var stash42 = _g112["stash*"];
  var bind42 = _g112["bind*"];
  var quoted = _g112.quoted;
  var initial_environment = _g112["initial-environment"];
  var quote_modules = _g112["quote-modules"];
  var quote_environment = _g112["quote-environment"];
  var mapo = _g112.mapo;
  var imported = _g112.imported;
  var _g115 = nexus.reader;
  var read_all = _g115["read-all"];
  var read_table = _g115["read-table"];
  var read_from_string = _g115["read-from-string"];
  var read = _g115.read;
  var make_stream = _g115["make-stream"];
  var _g119 = [];
  _g119.js = "!";
  _g119.lua = "not ";
  var _g117 = [];
  var _g120 = [];
  _g120.js = "!";
  _g120.lua = "not ";
  _g117["not"] = _g120;
  var _g122 = [];
  _g122["/"] = true;
  _g122["%"] = true;
  _g122["*"] = true;
  var _g124 = [];
  _g124["+"] = true;
  _g124["-"] = true;
  var _g128 = [];
  _g128.js = "+";
  _g128.lua = "..";
  var _g126 = [];
  var _g129 = [];
  _g129.js = "+";
  _g129.lua = "..";
  _g126.cat = _g129;
  var _g131 = [];
  _g131["<="] = true;
  _g131["<"] = true;
  _g131[">="] = true;
  _g131[">"] = true;
  var _g135 = [];
  _g135.js = "===";
  _g135.lua = "==";
  var _g137 = [];
  _g137.js = "!=";
  _g137.lua = "~=";
  var _g133 = [];
  var _g138 = [];
  _g138.js = "===";
  _g138.lua = "==";
  _g133["="] = _g138;
  var _g139 = [];
  _g139.js = "!=";
  _g139.lua = "~=";
  _g133["~="] = _g139;
  var _g143 = [];
  _g143.js = "&&";
  _g143.lua = "and";
  var _g141 = [];
  var _g144 = [];
  _g144.js = "&&";
  _g144.lua = "and";
  _g141["and"] = _g144;
  var _g148 = [];
  _g148.js = "||";
  _g148.lua = "or";
  var _g146 = [];
  var _g149 = [];
  _g149.js = "||";
  _g149.lua = "or";
  _g146["or"] = _g149;
  var infix = [_g117, _g122, _g124, _g126, _g131, _g133, _g141, _g146];
  function unary63(op, args) {
    return(((length(args) === 1) && in63(op, ["not", "-"])));
  }
  function precedence(op, args) {
    if (!(unary63(op, args))) {
      var _g150 = infix;
      var i = 0;
      while ((i < length(_g150))) {
        var level = _g150[i];
        if (level[op]) {
          return(i);
        }
        i = (i + 1);
      }
    }
    return(0);
  }
  function getop(op) {
    return(find(function (level) {
      var x = level[op];
      if ((x === true)) {
        return(op);
      } else {
        if (is63(x)) {
          return(x[target]);
        }
      }
    }, infix));
  }
  function infix63(x) {
    return(is63(getop(x)));
  }
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g151 = args;
    var i = 0;
    while ((i < length(_g151))) {
      var arg = _g151[i];
      str = (str + compile(arg));
      if ((i < (length(args) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_atom(x) {
    if (((x === "nil") && (target === "lua"))) {
      return(x);
    } else {
      if ((x === "nil")) {
        return("undefined");
      } else {
        if (id_literal63(x)) {
          return(inner(x));
        } else {
          if (string_literal63(x)) {
            return(x);
          } else {
            if (string63(x)) {
              return(to_id(x));
            } else {
              if (boolean63(x)) {
                if (x) {
                  return("true");
                } else {
                  return("false");
                }
              } else {
                if (number63(x)) {
                  return((x + ""));
                } else {
                  throw new Error("Unrecognized atom");
                }
              }
            }
          }
        }
      }
    }
  }
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else {
      if ((target === "js")) {
        return(";\n");
      } else {
        return("\n");
      }
    }
  }
  function compile_special(form, stmt63) {
    var x = form[0];
    var args = sub(form, 1);
    var _g152 = getenv(x);
    var self_tr63 = _g152.tr;
    var special = _g152.special;
    var stmt = _g152.stmt;
    var tr = terminator((stmt63 && !(self_tr63)));
    return((apply(special, args) + tr));
  }
  function compile_call(form) {
    if (none63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return(("(" + (f1 + (")" + args))));
      } else {
        if (string63(f)) {
          return((f1 + args));
        } else {
          throw new Error("Invalid function call");
        }
      }
    }
  }
  function compile_infix(_g153) {
    var op = _g153[0];
    var args = sub(_g153, 1);
    var a = args[0];
    var b = args[1];
    var op1 = getop(op);
    if (unary63(op, args)) {
      return((op1 + ("(" + (compile(a) + ")"))));
    } else {
      return(("(" + (compile(a) + (" " + (op1 + (" " + (compile(b) + ")")))))));
    }
  }
  function compile_function(args, body) {
    var _g154 = unstash(sublist(arguments, 2));
    var prefix = _g154.prefix;
    var name = _g154.name;
    var _g159;
    if (name) {
      _g159 = compile(name);
    } else {
      _g159 = "";
    }
    var id = _g159;
    var _g155 = (prefix || "");
    var _g156 = compile_args(args);
    indent_level = (indent_level + 1);
    var _g158 = compile(body, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var _g157 = _g158;
    var ind = indentation();
    var _g160;
    if ((target === "js")) {
      _g160 = "";
    } else {
      _g160 = "end";
    }
    var tr = _g160;
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + (id + (_g156 + (" {\n" + (_g157 + (ind + ("}" + tr))))))));
    } else {
      return((_g155 + ("function " + (id + (_g156 + ("\n" + (_g157 + (ind + tr))))))));
    }
  }
  function can_return63(form) {
    return((is63(form) && (atom63(form) || (!((hd(form) === "return")) && !(statement63(hd(form)))))));
  }
  compile = function (form) {
    var _g161 = unstash(sublist(arguments, 1));
    var stmt = _g161.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g163;
        if (stmt) {
          _g163 = indentation();
        } else {
          _g163 = "";
        }
        var ind = _g163;
        var _g164;
        if (atom63(form)) {
          _g164 = compile_atom(form);
        } else {
          var _g165;
          if (infix63(hd(form))) {
            _g165 = compile_infix(form);
          } else {
            _g165 = compile_call(form);
          }
          _g164 = _g165;
        }
        var _g162 = _g164;
        return((ind + (_g162 + tr)));
      }
    }
  };
  var lower;
  function lower_statement(form, tail63) {
    var hoist = [];
    var e = lower(form, hoist, true, tail63);
    if ((some63(hoist) && is63(e))) {
      return(join(["do"], join(hoist, [e])));
    } else {
      if (is63(e)) {
        return(e);
      } else {
        if ((length(hoist) > 1)) {
          return(join(["do"], hoist));
        } else {
          return(hd(hoist));
        }
      }
    }
  }
  function lower_body(body, tail63) {
    return(lower_statement(join(["do"], body), tail63));
  }
  function lower_do(args, hoist, stmt63, tail63) {
    var _g166 = sub(args, 0, (length(args) - 1));
    var _g167 = 0;
    while ((_g167 < length(_g166))) {
      var x = _g166[_g167];
      add(hoist, lower(x, hoist, stmt63));
      _g167 = (_g167 + 1);
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if ((tail63 && can_return63(e))) {
      return(["return", e]);
    } else {
      return(e);
    }
  }
  function lower_if(args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g168 = args[1];
    var _g169 = args[2];
    if ((stmt63 || tail63)) {
      var _g171;
      if (_g169) {
        _g171 = [lower_body([_g169], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g168], tail63)], _g171)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g170;
      if (_g169) {
        _g170 = [lower(["set", e, _g169])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g168])], _g170));
      return(e);
    }
  }
  function lower_short(x, args, hoist) {
    var a = args[0];
    var b = args[1];
    var hoist1 = [];
    var b1 = lower(b, hoist1);
    if (some63(hoist1)) {
      var id = make_id();
      var _g172;
      if ((x === "and")) {
        _g172 = ["%if", id, b, id];
      } else {
        _g172 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g172], hoist));
    } else {
      return([x, lower(a, hoist), b1]);
    }
  }
  function lower_try(args, hoist, tail63) {
    return(add(hoist, ["%try", lower_body(args, tail63)]));
  }
  function lower_while(args, hoist) {
    var c = args[0];
    var body = sub(args, 1);
    return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
  }
  function lower_for(args, hoist) {
    var t = args[0];
    var k = args[1];
    var body = sub(args, 2);
    return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
  }
  function lower_function(args) {
    var a = args[0];
    var body = sub(args, 1);
    return(["%function", a, lower_body(body, true)]);
  }
  function lower_definition(kind, args, hoist) {
    var name = args[0];
    var _g173 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g173, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g174 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g174)) {
      return(_g174);
    }
  }
  function lower_infix63(form) {
    return((infix63(hd(form)) && (length(form) > 3)));
  }
  function lower_infix(form, hoist) {
    var x = form[0];
    var args = sub(form, 1);
    return(lower(reduce(function (a, b) {
      return([x, a, b]);
    }, args), hoist));
  }
  function lower_special(form, hoist) {
    var e = lower_call(form, hoist);
    if (e) {
      return(add(hoist, e));
    }
  }
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
            if ((x === "do")) {
              return(lower_do(args, hoist, stmt63, tail63));
            } else {
              if ((x === "%if")) {
                return(lower_if(args, hoist, stmt63, tail63));
              } else {
                if ((x === "%try")) {
                  return(lower_try(args, hoist, tail63));
                } else {
                  if ((x === "while")) {
                    return(lower_while(args, hoist));
                  } else {
                    if ((x === "%for")) {
                      return(lower_for(args, hoist));
                    } else {
                      if ((x === "%function")) {
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
  global.lower = lower;
  function process(form) {
    return(lower(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g175 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g175, epilog))]]);
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = global.eval;
  var compiling63 = false;
  var compiler_output = "";
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    current_module = mod0;
    environment = env0;
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g176 = unstash(sublist(arguments, 1));
    var all = _g176.all;
    var m = module(spec);
    var frame = last(environment);
    var _g177 = m.export;
    var k = undefined;
    for (k in _g177) {
      if (isNaN(parseInt(k))) {
        var v = _g177[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g178 = unstash(sublist(arguments, 1));
    var all = _g178.all;
    if (!(module(spec))) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
  }
  function in_module(spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  function compile_module(spec) {
    compiling63 = true;
    _37compile_module(spec);
    return(compiler_output);
  }
  function prologue() {
    var m = module(current_module);
    return(join(imported(current_module, {_stash: true, all: true}), map(function (x) {
      return(splice(imported(x)));
    }, m.import)));
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var _g179 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g179));
    target = previous;
    return(run(compiled));
  }
  var _g180 = {};
  nexus.compiler = _g180;
  _g180["compile-call"] = compile_call;
  _g180["load-module"] = load_module;
  _g180["compile-atom"] = compile_atom;
  _g180.precedence = precedence;
  _g180["lower-if"] = lower_if;
  _g180["lower-body"] = lower_body;
  _g180["can-return?"] = can_return63;
  _g180["lower-for"] = lower_for;
  _g180["%compile-module"] = _37compile_module;
  _g180["compile-special"] = compile_special;
  _g180["compile-infix"] = compile_infix;
  _g180["compile-function"] = compile_function;
  _g180.eval = eval;
  _g180["lower-while"] = lower_while;
  _g180["lower-function"] = lower_function;
  _g180["open-module"] = open_module;
  _g180["lower-definition"] = lower_definition;
  _g180.compile = compile;
  _g180["lower-special"] = lower_special;
  _g180.lower = lower;
  _g180.infix = infix;
  _g180["lower-short"] = lower_short;
  _g180["in-module"] = in_module;
  _g180.prologue = prologue;
  _g180["compiler-output"] = compiler_output;
  _g180.terminator = terminator;
  _g180.process = process;
  _g180["lower-statement"] = lower_statement;
  _g180.run = run;
  _g180.getop = getop;
  _g180["compile-file"] = compile_file;
  _g180.encapsulate = encapsulate;
  _g180["module-path"] = module_path;
  _g180["lower-try"] = lower_try;
  _g180["compiling?"] = compiling63;
  _g180["lower-do"] = lower_do;
  _g180["lower-infix"] = lower_infix;
  _g180["compile-args"] = compile_args;
  _g180["lower-infix?"] = lower_infix63;
  _g180["infix?"] = infix63;
  _g180["unary?"] = unary63;
  _g180["lower-call"] = lower_call;
  _g180["compile-module"] = compile_module;
})();
(function () {
  var _g181 = nexus.runtime;
  var substring = _g181.substring;
  var map = _g181.map;
  var empty63 = _g181["empty?"];
  var _37 = _g181["%"];
  var replicate = _g181.replicate;
  var pairwise = _g181.pairwise;
  var module = _g181.module;
  var table63 = _g181["table?"];
  var length = _g181.length;
  var in63 = _g181["in?"];
  var extend = _g181.extend;
  var string63 = _g181["string?"];
  var apply = _g181.apply;
  var _60 = _g181["<"];
  var _61 = _g181["="];
  var write = _g181.write;
  var unstash = _g181.unstash;
  var splice = _g181.splice;
  var _47 = _g181["/"];
  var is63 = _g181["is?"];
  var number63 = _g181["number?"];
  var _ = _g181["-"];
  var _6061 = _g181["<="];
  var _6261 = _g181[">="];
  var char = _g181.char;
  var exit = _g181.exit;
  var hd = _g181.hd;
  var to_string = _g181["to-string"];
  var boolean63 = _g181["boolean?"];
  var cat = _g181.cat;
  var list63 = _g181["list?"];
  var keep = _g181.keep;
  var last = _g181.last;
  var join = _g181.join;
  var search = _g181.search;
  var stash = _g181.stash;
  var nil63 = _g181["nil?"];
  var find = _g181.find;
  var string_literal63 = _g181["string-literal?"];
  var tl = _g181.tl;
  var _37message_handler = _g181["%message-handler"];
  var id_literal63 = _g181["id-literal?"];
  var composite63 = _g181["composite?"];
  var sub = _g181.sub;
  var atom63 = _g181["atom?"];
  var keys63 = _g181["keys?"];
  var split = _g181.split;
  var iterate = _g181.iterate;
  var function63 = _g181["function?"];
  var module_key = _g181["module-key"];
  var toplevel63 = _g181["toplevel?"];
  var make_id = _g181["make-id"];
  var _62 = _g181[">"];
  var add = _g181.add;
  var parse_number = _g181["parse-number"];
  var inner = _g181.inner;
  var none63 = _g181["none?"];
  var reverse = _g181.reverse;
  var some63 = _g181["some?"];
  var write_file = _g181["write-file"];
  var read_file = _g181["read-file"];
  var exclude = _g181.exclude;
  var drop = _g181.drop;
  var sublist = _g181.sublist;
  var setenv = _g181.setenv;
  var code = _g181.code;
  var _42 = _g181["*"];
  var _43 = _g181["+"];
  var reduce = _g181.reduce;
  var _g182 = nexus.utilities;
  var exported = _g182.exported;
  var quasiexpand = _g182.quasiexpand;
  var symbol63 = _g182["symbol?"];
  var macroexpand = _g182.macroexpand;
  var macro63 = _g182["macro?"];
  var reserved63 = _g182["reserved?"];
  var bind = _g182.bind;
  var valid_id63 = _g182["valid-id?"];
  var symbol_expansion = _g182["symbol-expansion"];
  var to_id = _g182["to-id"];
  var variable63 = _g182["variable?"];
  var indentation = _g182.indentation;
  var statement63 = _g182["statement?"];
  var toplevel63 = _g182["toplevel?"];
  var getenv = _g182.getenv;
  var special_form63 = _g182["special-form?"];
  var special63 = _g182["special?"];
  var macro_function = _g182["macro-function"];
  var bound63 = _g182["bound?"];
  var stash42 = _g182["stash*"];
  var bind42 = _g182["bind*"];
  var quoted = _g182.quoted;
  var initial_environment = _g182["initial-environment"];
  var quote_modules = _g182["quote-modules"];
  var quote_environment = _g182["quote-environment"];
  var mapo = _g182.mapo;
  var imported = _g182.imported;
  var _g185 = nexus.compiler;
  var load_module = _g185["load-module"];
  var compile_function = _g185["compile-function"];
  var eval = _g185.eval;
  var open_module = _g185["open-module"];
  var compile = _g185.compile;
  var lower = _g185.lower;
  var in_module = _g185["in-module"];
  var compile_module = _g185["compile-module"];
})();
(function () {
  var _g343 = nexus.runtime;
  var substring = _g343.substring;
  var map = _g343.map;
  var empty63 = _g343["empty?"];
  var _37 = _g343["%"];
  var replicate = _g343.replicate;
  var pairwise = _g343.pairwise;
  var module = _g343.module;
  var table63 = _g343["table?"];
  var length = _g343.length;
  var in63 = _g343["in?"];
  var extend = _g343.extend;
  var string63 = _g343["string?"];
  var apply = _g343.apply;
  var _60 = _g343["<"];
  var _61 = _g343["="];
  var write = _g343.write;
  var unstash = _g343.unstash;
  var splice = _g343.splice;
  var _47 = _g343["/"];
  var is63 = _g343["is?"];
  var number63 = _g343["number?"];
  var _ = _g343["-"];
  var _6061 = _g343["<="];
  var _6261 = _g343[">="];
  var char = _g343.char;
  var exit = _g343.exit;
  var hd = _g343.hd;
  var to_string = _g343["to-string"];
  var boolean63 = _g343["boolean?"];
  var cat = _g343.cat;
  var list63 = _g343["list?"];
  var keep = _g343.keep;
  var last = _g343.last;
  var join = _g343.join;
  var search = _g343.search;
  var stash = _g343.stash;
  var nil63 = _g343["nil?"];
  var find = _g343.find;
  var string_literal63 = _g343["string-literal?"];
  var tl = _g343.tl;
  var _37message_handler = _g343["%message-handler"];
  var id_literal63 = _g343["id-literal?"];
  var composite63 = _g343["composite?"];
  var sub = _g343.sub;
  var atom63 = _g343["atom?"];
  var keys63 = _g343["keys?"];
  var split = _g343.split;
  var iterate = _g343.iterate;
  var function63 = _g343["function?"];
  var module_key = _g343["module-key"];
  var toplevel63 = _g343["toplevel?"];
  var make_id = _g343["make-id"];
  var _62 = _g343[">"];
  var add = _g343.add;
  var parse_number = _g343["parse-number"];
  var inner = _g343.inner;
  var none63 = _g343["none?"];
  var reverse = _g343.reverse;
  var some63 = _g343["some?"];
  var write_file = _g343["write-file"];
  var read_file = _g343["read-file"];
  var exclude = _g343.exclude;
  var drop = _g343.drop;
  var sublist = _g343.sublist;
  var setenv = _g343.setenv;
  var code = _g343.code;
  var _42 = _g343["*"];
  var _43 = _g343["+"];
  var reduce = _g343.reduce;
  var _g344 = nexus.utilities;
  var exported = _g344.exported;
  var quasiexpand = _g344.quasiexpand;
  var symbol63 = _g344["symbol?"];
  var macroexpand = _g344.macroexpand;
  var macro63 = _g344["macro?"];
  var reserved63 = _g344["reserved?"];
  var bind = _g344.bind;
  var valid_id63 = _g344["valid-id?"];
  var symbol_expansion = _g344["symbol-expansion"];
  var to_id = _g344["to-id"];
  var variable63 = _g344["variable?"];
  var indentation = _g344.indentation;
  var statement63 = _g344["statement?"];
  var toplevel63 = _g344["toplevel?"];
  var getenv = _g344.getenv;
  var special_form63 = _g344["special-form?"];
  var special63 = _g344["special?"];
  var macro_function = _g344["macro-function"];
  var bound63 = _g344["bound?"];
  var stash42 = _g344["stash*"];
  var bind42 = _g344["bind*"];
  var quoted = _g344.quoted;
  var initial_environment = _g344["initial-environment"];
  var quote_modules = _g344["quote-modules"];
  var quote_environment = _g344["quote-environment"];
  var mapo = _g344.mapo;
  var imported = _g344.imported;
  var _g347 = nexus.compiler;
  var load_module = _g347["load-module"];
  var compile_function = _g347["compile-function"];
  var eval = _g347.eval;
  var open_module = _g347["open-module"];
  var compile = _g347.compile;
  var lower = _g347.lower;
  var in_module = _g347["in-module"];
  var compile_module = _g347["compile-module"];
  global.target = "js";
})();
(function () {
  var _g613 = nexus.runtime;
  var substring = _g613.substring;
  var map = _g613.map;
  var empty63 = _g613["empty?"];
  var _37 = _g613["%"];
  var replicate = _g613.replicate;
  var pairwise = _g613.pairwise;
  var module = _g613.module;
  var table63 = _g613["table?"];
  var length = _g613.length;
  var in63 = _g613["in?"];
  var extend = _g613.extend;
  var string63 = _g613["string?"];
  var apply = _g613.apply;
  var _60 = _g613["<"];
  var _61 = _g613["="];
  var write = _g613.write;
  var unstash = _g613.unstash;
  var splice = _g613.splice;
  var _47 = _g613["/"];
  var is63 = _g613["is?"];
  var number63 = _g613["number?"];
  var _ = _g613["-"];
  var _6061 = _g613["<="];
  var _6261 = _g613[">="];
  var char = _g613.char;
  var exit = _g613.exit;
  var hd = _g613.hd;
  var to_string = _g613["to-string"];
  var boolean63 = _g613["boolean?"];
  var cat = _g613.cat;
  var list63 = _g613["list?"];
  var keep = _g613.keep;
  var last = _g613.last;
  var join = _g613.join;
  var search = _g613.search;
  var stash = _g613.stash;
  var nil63 = _g613["nil?"];
  var find = _g613.find;
  var string_literal63 = _g613["string-literal?"];
  var tl = _g613.tl;
  var _37message_handler = _g613["%message-handler"];
  var id_literal63 = _g613["id-literal?"];
  var composite63 = _g613["composite?"];
  var sub = _g613.sub;
  var atom63 = _g613["atom?"];
  var keys63 = _g613["keys?"];
  var split = _g613.split;
  var iterate = _g613.iterate;
  var function63 = _g613["function?"];
  var module_key = _g613["module-key"];
  var toplevel63 = _g613["toplevel?"];
  var make_id = _g613["make-id"];
  var _62 = _g613[">"];
  var add = _g613.add;
  var parse_number = _g613["parse-number"];
  var inner = _g613.inner;
  var none63 = _g613["none?"];
  var reverse = _g613.reverse;
  var some63 = _g613["some?"];
  var write_file = _g613["write-file"];
  var read_file = _g613["read-file"];
  var exclude = _g613.exclude;
  var drop = _g613.drop;
  var sublist = _g613.sublist;
  var setenv = _g613.setenv;
  var code = _g613.code;
  var _42 = _g613["*"];
  var _43 = _g613["+"];
  var reduce = _g613.reduce;
  var _g614 = nexus.utilities;
  var exported = _g614.exported;
  var quasiexpand = _g614.quasiexpand;
  var symbol63 = _g614["symbol?"];
  var macroexpand = _g614.macroexpand;
  var macro63 = _g614["macro?"];
  var reserved63 = _g614["reserved?"];
  var bind = _g614.bind;
  var valid_id63 = _g614["valid-id?"];
  var symbol_expansion = _g614["symbol-expansion"];
  var to_id = _g614["to-id"];
  var variable63 = _g614["variable?"];
  var indentation = _g614.indentation;
  var statement63 = _g614["statement?"];
  var toplevel63 = _g614["toplevel?"];
  var getenv = _g614.getenv;
  var special_form63 = _g614["special-form?"];
  var special63 = _g614["special?"];
  var macro_function = _g614["macro-function"];
  var bound63 = _g614["bound?"];
  var stash42 = _g614["stash*"];
  var bind42 = _g614["bind*"];
  var quoted = _g614.quoted;
  var initial_environment = _g614["initial-environment"];
  var quote_modules = _g614["quote-modules"];
  var quote_environment = _g614["quote-environment"];
  var mapo = _g614.mapo;
  var imported = _g614.imported;
  var _g617 = nexus.compiler;
  var load_module = _g617["load-module"];
  var compile_function = _g617["compile-function"];
  var eval = _g617.eval;
  var open_module = _g617["open-module"];
  var compile = _g617.compile;
  var lower = _g617.lower;
  var in_module = _g617["in-module"];
  var compile_module = _g617["compile-module"];
  global.modules = {optimizer: {import: ["runtime", "special", "core"], export: {"define-optimization": {}, optimizations: {variable: true}, optimize: {variable: true, export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%array": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var _g701;
    if ((target === "lua")) {
      _g701 = "{";
    } else {
      _g701 = "[";
    }
    var open = _g701;
    var _g702;
    if ((target === "lua")) {
      _g702 = "}";
    } else {
      _g702 = "]";
    }
    var close = _g702;
    var str = "";
    var _g630 = forms;
    var i = 0;
    while ((i < length(_g630))) {
      var x = _g630[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + (str + close)));
  }, foo: true, export: true}, "get": {special: function (t, k) {
    var _g631 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g631, 0) === "{"))) {
      _g631 = ("(" + (_g631 + ")"));
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g631 + ("." + inner(k))));
    } else {
      return((_g631 + ("[" + (k1 + "]"))));
    }
  }, foo: true, export: true}, "return": {foo: true, special: function (x) {
    var _g703;
    if (nil63(x)) {
      _g703 = "return";
    } else {
      _g703 = ("return(" + (compile(x) + ")"));
    }
    var _g632 = _g703;
    return((indentation() + _g632));
  }, stmt: true, export: true}, "%try": {tr: true, special: function (form) {
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g633 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g633;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = (indent_level + 1);
    var _g634 = compile(hf, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var h = _g634;
    return((ind + ("try {\n" + (body + (ind + ("}\n" + (ind + ("catch (" + (e + (") {\n" + (h + (ind + "}\n"))))))))))));
  }, export: true, stmt: true, foo: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true, export: true}, "do": {tr: true, special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "";
    var _g635 = forms;
    var _g636 = 0;
    while ((_g636 < length(_g635))) {
      var x = _g635[_g636];
      str = (str + compile(x, {_stash: true, stmt: true}));
      _g636 = (_g636 + 1);
    }
    return(str);
  }, export: true, stmt: true, foo: true}, "while": {tr: true, special: function (cond, form) {
    var _g637 = compile(cond);
    indent_level = (indent_level + 1);
    var _g638 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g638;
    var ind = indentation();
    if ((target === "js")) {
      return((ind + ("while (" + (_g637 + (") {\n" + (body + (ind + "}\n")))))));
    } else {
      return((ind + ("while " + (_g637 + (" do\n" + (body + (ind + "end\n")))))));
    }
  }, export: true, stmt: true, foo: true}, "not": {}, "break": {foo: true, special: function () {
    return((indentation() + "break"));
  }, stmt: true, export: true}, "%local-function": {tr: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, export: true, stmt: true, foo: true}, "%object": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "{";
    var _g704;
    if ((target === "lua")) {
      _g704 = " = ";
    } else {
      _g704 = ": ";
    }
    var sep = _g704;
    var pairs = pairwise(forms);
    var _g639 = pairs;
    var i = 0;
    while ((i < length(_g639))) {
      var _g640 = _g639[i];
      var k = _g640[0];
      var v = _g640[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g641 = compile(v);
      var _g705;
      if (valid_id63(k)) {
        _g705 = k;
      } else {
        var _g706;
        if (((target === "js") && string_literal63(k))) {
          _g706 = k;
        } else {
          var _g707;
          if ((target === "js")) {
            _g707 = quoted(k);
          } else {
            var _g708;
            if (string_literal63(k)) {
              _g708 = ("[" + (k + "]"));
            } else {
              _g708 = ("[" + (quoted(k) + "]"));
            }
            _g707 = _g708;
          }
          _g706 = _g707;
        }
        _g705 = _g706;
      }
      var _g642 = _g705;
      str = (str + (_g642 + (sep + _g641)));
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, foo: true, export: true}, "%local": {foo: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g709;
    if (is63(value)) {
      _g709 = (" = " + value1);
    } else {
      _g709 = "";
    }
    var rh = _g709;
    var _g710;
    if ((target === "js")) {
      _g710 = "var ";
    } else {
      _g710 = "local ";
    }
    var keyword = _g710;
    var ind = indentation();
    return((ind + (keyword + (id + rh))));
  }, stmt: true, export: true}, "error": {foo: true, special: function (x) {
    var _g711;
    if ((target === "js")) {
      _g711 = ("throw new " + compile(["Error", x]));
    } else {
      _g711 = ("error(" + (compile(x) + ")"));
    }
    var e = _g711;
    return((indentation() + e));
  }, stmt: true, export: true}, "%if": {tr: true, special: function (cond, cons, alt) {
    var _g643 = compile(cond);
    indent_level = (indent_level + 1);
    var _g646 = compile(cons, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var _g644 = _g646;
    var _g712;
    if (alt) {
      indent_level = (indent_level + 1);
      var _g647 = compile(alt, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      _g712 = _g647;
    }
    var _g645 = _g712;
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + (ind + ("if (" + (_g643 + (") {\n" + (_g644 + (ind + "}")))))));
    } else {
      str = (str + (ind + ("if " + (_g643 + (" then\n" + _g644)))));
    }
    if ((_g645 && (target === "js"))) {
      str = (str + (" else {\n" + (_g645 + (ind + "}"))));
    } else {
      if (_g645) {
        str = (str + (ind + ("else\n" + _g645)));
      }
    }
    if ((target === "lua")) {
      return((str + (ind + "end\n")));
    } else {
      return((str + "\n"));
    }
  }, export: true, stmt: true, foo: true}, "%global-function": {tr: true, special: function (name, args, body) {
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, export: true, stmt: true, foo: true}, "set": {foo: true, special: function (lh, rh) {
    var _g648 = compile(lh);
    var _g713;
    if (nil63(rh)) {
      _g713 = "nil";
    } else {
      _g713 = rh;
    }
    var _g649 = compile(_g713);
    return((indentation() + (_g648 + (" = " + _g649))));
  }, stmt: true, export: true}, "%for": {tr: true, special: function (t, k, form) {
    var _g650 = compile(t);
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g651 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g651;
    if ((target === "lua")) {
      return((ind + ("for " + (k + (" in next, " + (_g650 + (" do\n" + (body + (ind + "end\n")))))))));
    } else {
      return((ind + ("for (" + (k + (" in " + (_g650 + (") {\n" + (body + (ind + "}\n")))))))));
    }
  }, export: true, stmt: true, foo: true}}}, utilities: {import: ["runtime", "special", "core"], export: {exported: {variable: true, export: true}, escape: {variable: true}, "can-unquote?": {variable: true}, quasiexpand: {variable: true, export: true}, "symbol?": {variable: true, export: true}, "quote-binding": {variable: true}, macroexpand: {variable: true, export: true}, "macro?": {variable: true, export: true}, "reserved?": {variable: true, export: true}, bind: {variable: true, export: true}, "valid-id?": {variable: true, export: true}, "symbol-expansion": {variable: true, export: true}, "to-id": {variable: true, export: true}, "variable?": {variable: true, export: true}, indentation: {variable: true, export: true}, "statement?": {variable: true, export: true}, "quote-module": {variable: true}, "toplevel?": {variable: true, export: true}, reserved: {variable: true}, getenv: {variable: true, export: true}, "special-form?": {variable: true, export: true}, "special?": {variable: true, export: true}, "macro-function": {variable: true, export: true}, "quote-frame": {variable: true}, "bound?": {variable: true, export: true}, "stash*": {variable: true, export: true}, "numeric?": {variable: true}, "indent-level": {global: true, export: true}, "quasiquote-list": {variable: true}, "quasisplice?": {variable: true}, "bind*": {variable: true, export: true}, quoted: {variable: true, export: true}, "valid-char?": {variable: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, "quasiquoting?": {variable: true}, "quoting?": {variable: true}, "initial-environment": {variable: true, export: true}, "global?": {variable: true}, "quote-modules": {variable: true, export: true}, "quote-environment": {variable: true, export: true}, mapo: {variable: true, export: true}, imported: {variable: true, export: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g652 = sub(specs, 0);
    map(compile_module, _g652);
    return(undefined);
  }}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-call": {variable: true}, "load-module": {variable: true, export: true}, "compile-atom": {variable: true}, precedence: {variable: true}, "lower-if": {variable: true}, "lower-body": {variable: true}, "can-return?": {variable: true}, "lower-for": {variable: true}, "%compile-module": {variable: true}, "compile-special": {variable: true}, "compile-infix": {variable: true}, "compile-function": {variable: true, export: true}, eval: {variable: true, export: true}, "lower-while": {variable: true}, "lower-function": {variable: true}, "open-module": {variable: true, export: true}, "lower-definition": {variable: true}, compile: {variable: true, export: true}, "lower-special": {variable: true}, lower: {global: true, export: true, variable: true}, infix: {variable: true}, "lower-short": {variable: true}, "in-module": {variable: true, export: true}, prologue: {variable: true}, "compiler-output": {variable: true}, terminator: {variable: true}, process: {variable: true}, "lower-statement": {variable: true}, run: {variable: true}, getop: {variable: true}, "compile-file": {variable: true}, encapsulate: {variable: true}, "module-path": {variable: true}, "lower-try": {variable: true}, "current-module": {global: true, export: true}, "compiling?": {variable: true}, "lower-do": {variable: true}, "lower-infix": {variable: true}, "compile-args": {variable: true}, "lower-infix?": {variable: true}, "infix?": {variable: true}, "unary?": {variable: true}, "lower-call": {variable: true}, "compile-module": {variable: true, export: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + (e + ("," + (x + "|"))));
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g653 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g654 = join(["do"], macroexpand(_g653));
    drop(environment);
    return(_g654);
  }, export: true}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g655 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g656) {
      var lh = _g656[0];
      var rh = _g656[1];
      var _g657 = bind(lh, rh);
      var _g658 = 0;
      while ((_g658 < length(_g657))) {
        var _g659 = _g657[_g658];
        var id = _g659[0];
        var val = _g659[1];
        if ((bound63(id) || (reserved63(id) || toplevel63()))) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g658 = (_g658 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g655)])));
  }, export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g660 = body;
      var k = undefined;
      for (k in _g660) {
        if (isNaN(parseInt(k))) {
          var v = _g660[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g661 = sub(body, 0);
    add(environment, {});
    map(function (_g663) {
      var name = _g663[0];
      var exp = _g663[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g662 = join(["do"], macroexpand(_g661));
    drop(environment);
    return(_g662);
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g664 = elements;
    var _g665 = 0;
    while ((_g665 < length(_g664))) {
      var e = _g664[_g665];
      l[e] = true;
      _g665 = (_g665 + 1);
    }
    return(join(["table"], l));
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g666 = sub(body, 0);
    return(["if", cond, join(["do"], _g666)]);
  }, export: true}, "with-bindings": {macro: function (_g667) {
    var names = _g667[0];
    var body = unstash(sublist(arguments, 1));
    var _g668 = sub(body, 0);
    var x = make_id();
    var _g670 = ["setenv", x];
    _g670.variable = true;
    var _g669 = ["with-frame", ["each", [x], names, _g670]];
    _g669.scope = true;
    return(join(_g669, _g668));
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g671 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g714;
    if (nil63(v)) {
      var _g715;
      if (b.i) {
        _g715 = "i";
      } else {
        _g715 = make_id();
      }
      var i = _g715;
      _g714 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g671), ["inc", i]]];
    } else {
      var _g672 = ["target"];
      _g672.lua = ["not", ["number?", k]];
      _g672.js = ["isNaN", ["parseInt", k]];
      _g714 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g672, join(["let", [v, ["get", t1, k]]], _g671)]]];
    }
    return(["let", [t1, t], _g714]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g673 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g673)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g674 = sub(body, 0);
    var form = join(["fn", args], _g674);
    var _g675 = ["setenv", ["quote", name]];
    _g675.macro = form;
    _g675.form = ["quote", form];
    eval(_g675);
    return(undefined);
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g676 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g676)]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g677 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g677)]);
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g678 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g679 = ["table"];
    _g679._scope = scope;
    return(["do", ["add", "environment", _g679], ["let", [x, join(["do"], _g678)], ["drop", "environment"], x]]);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g680 = sub(body, 0);
    var _g681 = bind42(args, _g680);
    var _g682 = _g681[0];
    var _g683 = _g681[1];
    return(join(["%function", _g682], _g683));
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g684) {
      var a = _g684[0];
      var b = _g684[1];
      var c = sub(_g684, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g685 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g685)) {
      var _g686 = bind42(x, _g685);
      var args = _g686[0];
      var _g687 = _g686[1];
      return(join(["%global-function", name, args], _g687));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g688 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g688)) {
      var _g689 = bind42(x, _g688);
      var args = _g689[0];
      var _g690 = _g689[1];
      return(join(["%local-function", name, args], _g690));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g691 = sub(body, 0);
    var form = join(["fn", args], _g691);
    var keys = sub(_g691, length(_g691));
    var _g692 = ["setenv", ["quote", name]];
    _g692.form = ["quote", form];
    _g692.special = form;
    eval(join(_g692, keys));
    return(undefined);
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g693 = sub(body, 0);
    var imports = [];
    var exp = _g693.export;
    var imp = _g693.import;
    var _g694 = (imp || []);
    var _g695 = 0;
    while ((_g695 < length(_g694))) {
      var k = _g694[_g695];
      load_module(k);
      imports = join(imports, imported(k));
      _g695 = (_g695 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g696 = (exp || []);
    var _g697 = 0;
    while ((_g697 < length(_g696))) {
      var k = _g696[_g697];
      setenv(k, {_stash: true, export: true});
      _g697 = (_g697 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g698 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g698)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g342, x) {
      return(x);
    }, body)));
  }, export: true}}}, lib: {import: ["core", "special"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {"read-all": {variable: true, export: true}, "read-table": {variable: true, export: true}, "read-from-string": {variable: true, export: true}, delimiters: {variable: true}, read: {variable: true, export: true}, "skip-non-code": {variable: true}, "flag?": {variable: true}, "key?": {variable: true}, whitespace: {variable: true}, eof: {variable: true}, "read-char": {variable: true}, "define-reader": {macro: function (_g699) {
    var char = _g699[0];
    var stream = _g699[1];
    var body = unstash(sublist(arguments, 1));
    var _g700 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g700)]);
  }, export: true}, "peek-char": {variable: true}, "make-stream": {variable: true, export: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, runtime: {import: ["special", "core"], export: {substring: {variable: true, export: true}, map: {variable: true, export: true}, "empty?": {variable: true, export: true}, "%": {variable: true, export: true}, replicate: {variable: true, export: true}, pairwise: {variable: true, export: true}, module: {variable: true, export: true}, "table?": {variable: true, export: true}, length: {variable: true, export: true}, "in?": {variable: true, export: true}, extend: {variable: true, export: true}, "string?": {variable: true, export: true}, apply: {variable: true, export: true}, "<": {variable: true, export: true}, "=": {variable: true, export: true}, write: {variable: true, export: true}, unstash: {variable: true, export: true}, splice: {variable: true, export: true}, "/": {variable: true, export: true}, "is?": {variable: true, export: true}, "number?": {variable: true, export: true}, "-": {variable: true, export: true}, "<=": {variable: true, export: true}, ">=": {variable: true, export: true}, char: {variable: true, export: true}, exit: {variable: true, export: true}, hd: {variable: true, export: true}, fs: {variable: true}, "to-string": {variable: true, export: true}, "boolean?": {variable: true, export: true}, cat: {variable: true, export: true}, "list?": {variable: true, export: true}, keep: {variable: true, export: true}, last: {variable: true, export: true}, join: {variable: true, export: true}, search: {variable: true, export: true}, stash: {variable: true, export: true}, "splice?": {variable: true}, "nil?": {variable: true, export: true}, print: {global: true, export: true}, find: {variable: true, export: true}, "id-count": {variable: true}, "string-literal?": {variable: true, export: true}, tl: {variable: true, export: true}, "%message-handler": {variable: true, export: true}, require: {global: true, export: true}, "id-literal?": {variable: true, export: true}, "composite?": {variable: true, export: true}, sub: {variable: true, export: true}, "atom?": {variable: true, export: true}, mapl: {variable: true}, "keys?": {variable: true, export: true}, split: {variable: true, export: true}, iterate: {variable: true, export: true}, "function?": {variable: true, export: true}, type: {variable: true}, "module-key": {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "make-id": {variable: true, export: true}, ">": {variable: true, export: true}, add: {variable: true, export: true}, "parse-number": {variable: true, export: true}, inner: {variable: true, export: true}, "none?": {variable: true, export: true}, reverse: {variable: true, export: true}, "some?": {variable: true, export: true}, "write-file": {variable: true, export: true}, "read-file": {variable: true, export: true}, exclude: {variable: true, export: true}, drop: {variable: true, export: true}, sublist: {variable: true, export: true}, setenv: {variable: true, export: true}, code: {variable: true, export: true}, "*": {variable: true, export: true}, "+": {variable: true, export: true}, reduce: {variable: true, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g716 = sub(body, 0);
    var imports = [];
    var exp = _g716.export;
    var imp = _g716.import;
    var _g717 = (imp || []);
    var _g718 = 0;
    while ((_g718 < length(_g717))) {
      var k = _g717[_g718];
      load_module(k);
      imports = join(imports, imported(k));
      _g718 = (_g718 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g719 = (exp || []);
    var _g720 = 0;
    while ((_g720 < length(_g719))) {
      var k = _g719[_g720];
      setenv(k, {_stash: true, export: true});
      _g720 = (_g720 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var substring = _g2.substring;
  var map = _g2.map;
  var empty63 = _g2["empty?"];
  var _37 = _g2["%"];
  var replicate = _g2.replicate;
  var pairwise = _g2.pairwise;
  var module = _g2.module;
  var table63 = _g2["table?"];
  var length = _g2.length;
  var in63 = _g2["in?"];
  var extend = _g2.extend;
  var string63 = _g2["string?"];
  var apply = _g2.apply;
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var unstash = _g2.unstash;
  var splice = _g2.splice;
  var _47 = _g2["/"];
  var is63 = _g2["is?"];
  var number63 = _g2["number?"];
  var _ = _g2["-"];
  var _6061 = _g2["<="];
  var _6261 = _g2[">="];
  var char = _g2.char;
  var exit = _g2.exit;
  var hd = _g2.hd;
  var add = _g2.add;
  var boolean63 = _g2["boolean?"];
  var cat = _g2.cat;
  var list63 = _g2["list?"];
  var none63 = _g2["none?"];
  var last = _g2.last;
  var reverse = _g2.reverse;
  var search = _g2.search;
  var some63 = _g2["some?"];
  var nil63 = _g2["nil?"];
  var find = _g2.find;
  var string_literal63 = _g2["string-literal?"];
  var sublist = _g2.sublist;
  var _37message_handler = _g2["%message-handler"];
  var id_literal63 = _g2["id-literal?"];
  var composite63 = _g2["composite?"];
  var sub = _g2.sub;
  var atom63 = _g2["atom?"];
  var function63 = _g2["function?"];
  var split = _g2.split;
  var code = _g2.code;
  var keep = _g2.keep;
  var module_key = _g2["module-key"];
  var toplevel63 = _g2["toplevel?"];
  var make_id = _g2["make-id"];
  var to_string = _g2["to-string"];
  var parse_number = _g2["parse-number"];
  var write = _g2.write;
  var inner = _g2.inner;
  var write_file = _g2["write-file"];
  var read_file = _g2["read-file"];
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var stash = _g2.stash;
  var exclude = _g2.exclude;
  var keys63 = _g2["keys?"];
  var iterate = _g2.iterate;
  var setenv = _g2.setenv;
  var reduce = _g2.reduce;
  var join = _g2.join;
  var drop = _g2.drop;
  var tl = _g2.tl;
  var _g5 = nexus.reader;
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var _g6 = nexus.compiler;
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  var eval = _g6.eval;
  var open_module = _g6["open-module"];
  var compile = _g6.compile;
  var lower = _g6.lower;
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  function rep(str) {
    var _g722 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g725) {
        return([false, _g725.message]);
      }
    })();
    var _g1 = _g722[0];
    var x = _g722[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl() {
    function step(str) {
      rep(str);
      return(write("> "));
    }
    write("> ");
    (process.stdin.setEncoding)("utf8");
    return((process.stdin.on)("data", step));
  }
  function usage() {
    print((to_string("usage: lumen [options] <module>") + " "));
    print((to_string("options:") + " "));
    print((to_string("  -o <output>\tOutput file") + " "));
    print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
    print((to_string("  -e <expr>\tExpression to evaluate") + " "));
    return(exit());
  }
  function main() {
    var args = sub(process.argv, 2);
    if (((hd(args) === "-h") || (hd(args) === "--help"))) {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var _g723 = args;
    var i = 0;
    while ((i < length(_g723))) {
      var arg = _g723[i];
      if (((arg === "-o") || ((arg === "-t") || (arg === "-e")))) {
        if ((i === (length(args) - 1))) {
          print((to_string("missing argument for") + (" " + (to_string(arg) + " "))));
        } else {
          i = (i + 1);
          var val = args[i];
          if ((arg === "-o")) {
            output = val;
          } else {
            if ((arg === "-t")) {
              target1 = val;
            } else {
              if ((arg === "-e")) {
                expr = val;
              }
            }
          }
        }
      } else {
        if ((nil63(spec) && ("-" != char(arg, 0)))) {
          spec = arg;
        }
      }
      i = (i + 1);
    }
    if (output) {
      if (target1) {
        target = target1;
      }
      return(write_file(output, compile_module(spec)));
    } else {
      in_module((spec || "main"));
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g724 = {};
  nexus.main = _g724;
  _g724.rep = rep;
  _g724.repl = repl;
  _g724.usage = usage;
  _g724.main = main;
})();
