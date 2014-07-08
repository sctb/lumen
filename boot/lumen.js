(function () {
  global.nexus = {};
})();
(function () {
  function nil63(x) {
    return(x === undefined);
  }
  function is63(x) {
    return(!nil63(x));
  }
  function length(x) {
    return(x.length || 0);
  }
  function none63(x) {
    return(length(x) === 0);
  }
  function some63(x) {
    return(length(x) > 0);
  }
  function in63(x, l) {
    var _g20 = l;
    var _g21 = 0;
    while (_g21 < length(_g20)) {
      var y = _g20[_g21];
      if (x === y) {
        return(true);
      }
      _g21 = _g21 + 1;
    }
  }
  function hd(l) {
    return(l[0]);
  }
  function type(x) {
    return(typeof(x));
  }
  function string63(x) {
    return(type(x) === "string");
  }
  function number63(x) {
    return(type(x) === "number");
  }
  function boolean63(x) {
    return(type(x) === "boolean");
  }
  function function63(x) {
    return(type(x) === "function");
  }
  function composite63(x) {
    return(type(x) === "object");
  }
  function atom63(x) {
    return(!composite63(x));
  }
  function table63(x) {
    return(composite63(x) && nil63(hd(x)));
  }
  function list63(x) {
    return(composite63(x) && is63(hd(x)));
  }
  function substring(str, from, upto) {
    return((str.substring)(from, upto));
  }
  function sublist(l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  }
  function sub(x, from, upto) {
    var _g22 = from || 0;
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
    return(sub(x, 1, length(x) - 1));
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
    return(string63(x) && char(x, 0) === "\"");
  }
  function id_literal63(x) {
    return(string63(x) && char(x, 0) === "|");
  }
  function add(l, x) {
    (l.push)(x);
    return(undefined);
  }
  function drop(l) {
    return((l.pop)());
  }
  function last(l) {
    return(l[length(l) - 1]);
  }
  function reverse(l) {
    var l1 = sub(l, length(l));
    var i = length(l) - 1;
    while (i >= 0) {
      add(l1, l[i]);
      i = i - 1;
    }
    return(l1);
  }
  function join(l1, l2) {
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
          var skip63 = false;
          if (list63(l1) && list63(l2)) {
            l = (l1.concat)(l2);
            skip63 = true;
          }
          if (!skip63) {
            var i = 0;
            var len = length(l1);
            while (i < len) {
              l[i] = l1[i];
              i = i + 1;
            }
            while (i < len + length(l2)) {
              l[i] = l2[i - len];
              i = i + 1;
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
      if (length(x) === 1) {
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
    while (_g27 < length(_g26)) {
      var x = _g26[_g27];
      if (f(x)) {
        add(l1, x);
      }
      _g27 = _g27 + 1;
    }
    return(l1);
  }
  function find(f, l) {
    var _g28 = l;
    var _g29 = 0;
    while (_g29 < length(_g28)) {
      var x = _g28[_g29];
      var _g30 = f(x);
      if (_g30) {
        return(_g30);
      }
      _g29 = _g29 + 1;
    }
  }
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while (i < length(l)) {
      add(l1, [l[i], l[i + 1]]);
      i = i + 2;
    }
    return(l1);
  }
  function iterate(f, count) {
    var i = 0;
    while (i < count) {
      f(i);
      i = i + 1;
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
    return(table63(x) && x._splice);
  }
  function mapl(f, l) {
    var l1 = [];
    var _g31 = l;
    var _g32 = 0;
    while (_g32 < length(_g31)) {
      var x = _g31[_g32];
      var _g33 = f(x);
      if (splice63(_g33)) {
        l1 = join(l1, _g33.value);
      } else {
        if (is63(_g33)) {
          add(l1, _g33);
        }
      }
      _g32 = _g32 + 1;
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
    return(none63(t) && !keys63(t));
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
      if (table63(l) && l._stash) {
        var args1 = sub(args, 0, length(args) - 1);
        var _g37 = l;
        var k = undefined;
        for (k in _g37) {
          if (isNaN(parseInt(k))) {
            var v = _g37[k];
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
        if (!_g39[k]) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  function search(str, pattern, start) {
    var i = (str.indexOf)(pattern, start);
    if (i >= 0) {
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
        return(a + b);
      }, _g41));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a + b);
    }, _g42));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b - a);
    }, reverse(_g43)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(a * b);
    }, _g44));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b / a);
    }, reverse(_g45)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return(b % a);
    }, reverse(_g46)));
  }
  function _62(a, b) {
    return(a > b);
  }
  function _60(a, b) {
    return(a < b);
  }
  function _61(a, b) {
    return(a === b);
  }
  function _6261(a, b) {
    return(a >= b);
  }
  function _6061(a, b) {
    return(a <= b);
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
    if (!isNaN(n)) {
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
              str = str + to_string(y);
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
  }
  function apply(f, args) {
    var _g49 = stash(args);
    return((f.apply)(f, _g49));
  }
  var id_count = 0;
  function make_id() {
    id_count = id_count + 1;
    return("_g" + id_count);
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, i + 2));
  }
  function toplevel63() {
    return(length(environment) === 1);
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
  }
  var _g52 = {};
  nexus.runtime = _g52;
  _g52["%"] = _37;
  _g52.unstash = unstash;
  _g52.split = split;
  _g52.replicate = replicate;
  _g52["table?"] = table63;
  _g52.substring = substring;
  _g52["write-file"] = write_file;
  _g52.char = char;
  _g52.hd = hd;
  _g52["composite?"] = composite63;
  _g52.pairwise = pairwise;
  _g52["boolean?"] = boolean63;
  _g52.iterate = iterate;
  _g52.sub = sub;
  _g52["some?"] = some63;
  _g52.inner = inner;
  _g52.add = add;
  _g52["<"] = _60;
  _g52["="] = _61;
  _g52.length = length;
  _g52[">"] = _62;
  _g52.keep = keep;
  _g52["string-literal?"] = string_literal63;
  _g52["string?"] = string63;
  _g52.module = module;
  _g52["-"] = _;
  _g52["*"] = _42;
  _g52["nil?"] = nil63;
  _g52["/"] = _47;
  _g52.search = search;
  _g52["number?"] = number63;
  _g52["parse-number"] = parse_number;
  _g52["in?"] = in63;
  _g52["atom?"] = atom63;
  _g52.exclude = exclude;
  _g52["id-literal?"] = id_literal63;
  _g52.reverse = reverse;
  _g52.sublist = sublist;
  _g52["<="] = _6061;
  _g52["module-key"] = module_key;
  _g52["keys?"] = keys63;
  _g52.exit = exit;
  _g52["function?"] = function63;
  _g52.reduce = reduce;
  _g52["is?"] = is63;
  _g52["id-count"] = id_count;
  _g52.code = code;
  _g52.fs = fs;
  _g52.find = find;
  _g52.mapl = mapl;
  _g52.write = write;
  _g52["make-id"] = make_id;
  _g52[">="] = _6261;
  _g52.type = type;
  _g52["none?"] = none63;
  _g52.extend = extend;
  _g52["toplevel?"] = toplevel63;
  _g52["read-file"] = read_file;
  _g52["%message-handler"] = _37message_handler;
  _g52.tl = tl;
  _g52.splice = splice;
  _g52.apply = apply;
  _g52["list?"] = list63;
  _g52["empty?"] = empty63;
  _g52.map = map;
  _g52["to-string"] = to_string;
  _g52["splice?"] = splice63;
  _g52.stash = stash;
  _g52.cat = cat;
  _g52["+"] = _43;
  _g52.drop = drop;
  _g52.setenv = setenv;
  _g52.last = last;
  _g52.join = join;
})();
(function () {
  var _g57 = nexus.runtime;
  var _37 = _g57["%"];
  var unstash = _g57.unstash;
  var split = _g57.split;
  var replicate = _g57.replicate;
  var table63 = _g57["table?"];
  var substring = _g57.substring;
  var write_file = _g57["write-file"];
  var char = _g57.char;
  var hd = _g57.hd;
  var composite63 = _g57["composite?"];
  var pairwise = _g57.pairwise;
  var boolean63 = _g57["boolean?"];
  var iterate = _g57.iterate;
  var sub = _g57.sub;
  var some63 = _g57["some?"];
  var inner = _g57.inner;
  var add = _g57.add;
  var _60 = _g57["<"];
  var _61 = _g57["="];
  var length = _g57.length;
  var _62 = _g57[">"];
  var keep = _g57.keep;
  var string_literal63 = _g57["string-literal?"];
  var string63 = _g57["string?"];
  var module = _g57.module;
  var _ = _g57["-"];
  var _42 = _g57["*"];
  var nil63 = _g57["nil?"];
  var _47 = _g57["/"];
  var search = _g57.search;
  var number63 = _g57["number?"];
  var parse_number = _g57["parse-number"];
  var in63 = _g57["in?"];
  var atom63 = _g57["atom?"];
  var exclude = _g57.exclude;
  var id_literal63 = _g57["id-literal?"];
  var reverse = _g57.reverse;
  var sublist = _g57.sublist;
  var _6061 = _g57["<="];
  var module_key = _g57["module-key"];
  var keys63 = _g57["keys?"];
  var exit = _g57.exit;
  var function63 = _g57["function?"];
  var reduce = _g57.reduce;
  var is63 = _g57["is?"];
  var code = _g57.code;
  var find = _g57.find;
  var write = _g57.write;
  var make_id = _g57["make-id"];
  var _6261 = _g57[">="];
  var none63 = _g57["none?"];
  var extend = _g57.extend;
  var toplevel63 = _g57["toplevel?"];
  var read_file = _g57["read-file"];
  var _37message_handler = _g57["%message-handler"];
  var tl = _g57.tl;
  var splice = _g57.splice;
  var apply = _g57.apply;
  var list63 = _g57["list?"];
  var empty63 = _g57["empty?"];
  var map = _g57.map;
  var to_string = _g57["to-string"];
  var stash = _g57.stash;
  var cat = _g57.cat;
  var _43 = _g57["+"];
  var drop = _g57.drop;
  var setenv = _g57.setenv;
  var last = _g57.last;
  var join = _g57.join;
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
    return(list63(form) && special63(hd(form)));
  }
  function statement63(k) {
    return(special63(k) && getenv(k, {_stash: true, stmt: true}));
  }
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
  }
  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }
  function variable63(k) {
    var b = find(function (frame) {
      return(frame[k] || frame._scope);
    }, reverse(environment));
    return(table63(b) && is63(b.variable));
  }
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  function bound63(x) {
    return(macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while (i < length(str)) {
      var c = char(str, i);
      var _g63;
      if (c === "\n") {
        _g63 = "\\n";
      } else {
        var _g64;
        if (c === "\"") {
          _g64 = "\\\"";
        } else {
          var _g65;
          if (c === "\\") {
            _g65 = "\\\\";
          } else {
            _g65 = c;
          }
          _g64 = _g65;
        }
        _g63 = _g64;
      }
      var c1 = _g63;
      str1 = str1 + c1;
      i = i + 1;
    }
    return(str1 + "\"");
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
    if (composite63(lh) && list63(rh)) {
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
        while (i < length(_g67)) {
          var x = _g67[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = i + 1;
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g68 = lh;
        var k = undefined;
        for (k in _g68) {
          if (isNaN(parseInt(k))) {
            var v = _g68[k];
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
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if (target === "js") {
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
      var r = args.rest || keys63(args) && make_id();
      var _g69 = args;
      var _g70 = 0;
      while (_g70 < length(_g69)) {
        var arg = _g69[_g70];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if (list63(arg) || keys63(arg)) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g70 = _g70 + 1;
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
    return(quoting63(depth) && depth > 0);
  }
  function can_unquote63(depth) {
    return(quoting63(depth) && depth === 1);
  }
  function quasisplice63(x, depth) {
    return(list63(x) && can_unquote63(depth) && hd(x) === "unquote-splicing");
  }
  function macroexpand(form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if (x === "%function") {
          var _g54 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g73 = args;
          var _g74 = 0;
          while (_g74 < length(_g73)) {
            var _g71 = _g73[_g74];
            setenv(_g71, {_stash: true, variable: true});
            _g74 = _g74 + 1;
          }
          var _g72 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g72);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _g55 = form[0];
            var name = form[1];
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
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"case": true, "*": true, "nil": true, "return": true, "typeof": true, "else": true, "instanceof": true, "try": true, "elseif": true, "void": true, "=": true, ">=": true, "true": true, "<=": true, "switch": true, "and": true, "catch": true, "finally": true, "while": true, "%": true, "for": true, "-": true, "/": true, "do": true, "local": true, "in": true, "if": true, "default": true, "with": true, "this": true, "continue": true, "var": true, "debugger": true, ">": true, "<": true, "==": true, "or": true, "+": true, "break": true, "repeat": true, "then": true, "throw": true, "end": true, "until": true, "new": true, "false": true, "delete": true, "not": true, "function": true};
  function reserved63(x) {
    return(reserved[x]);
  }
  function numeric63(n) {
    return(n > 47 && n < 58);
  }
  function valid_char63(n) {
    return(numeric63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
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
          while (i < length(id)) {
            var n = code(id, i);
            var valid63 = valid_char63(n);
            if (!valid63 || i === 0 && numeric63(n)) {
              return(false);
            }
            i = i + 1;
          }
          return(true);
        }
      }
    }
  }
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while (i < length(id)) {
      var c = char(id, i);
      var n = code(c);
      var _g91;
      if (c === "-") {
        _g91 = "_";
      } else {
        var _g92;
        if (valid_char63(n)) {
          _g92 = c;
        } else {
          var _g93;
          if (i === 0) {
            _g93 = "_" + n;
          } else {
            _g93 = n;
          }
          _g92 = _g93;
        }
        _g91 = _g92;
      }
      var c1 = _g91;
      id1 = id1 + c1;
      i = i + 1;
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
          if (b.variable && (all || b.export)) {
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
  _g99["special?"] = special63;
  _g99["quasiquoting?"] = quasiquoting63;
  _g99["to-id"] = to_id;
  _g99["symbol?"] = symbol63;
  _g99["quote-environment"] = quote_environment;
  _g99["bound?"] = bound63;
  _g99["initial-environment"] = initial_environment;
  _g99["bind*"] = bind42;
  _g99.quasiexpand = quasiexpand;
  _g99["quote-modules"] = quote_modules;
  _g99["can-unquote?"] = can_unquote63;
  _g99["variable?"] = variable63;
  _g99.getenv = getenv;
  _g99.bind = bind;
  _g99["quasiquote-list"] = quasiquote_list;
  _g99.indentation = indentation;
  _g99.reserved = reserved;
  _g99["special-form?"] = special_form63;
  _g99["quote-frame"] = quote_frame;
  _g99["quote-module"] = quote_module;
  _g99["macro?"] = macro63;
  _g99["quote-binding"] = quote_binding;
  _g99["macro-function"] = macro_function;
  _g99["valid-char?"] = valid_char63;
  _g99["numeric?"] = numeric63;
  _g99.macroexpand = macroexpand;
  _g99.quoted = quoted;
  _g99.escape = escape;
  _g99["toplevel?"] = toplevel63;
  _g99["global?"] = global63;
  _g99["quoting?"] = quoting63;
  _g99["quasisplice?"] = quasisplice63;
  _g99.mapo = mapo;
  _g99.exported = exported;
  _g99["symbol-expansion"] = symbol_expansion;
  _g99["statement?"] = statement63;
  _g99["stash*"] = stash42;
  _g99.imported = imported;
  _g99["reserved?"] = reserved63;
  _g99["valid-id?"] = valid_id63;
})();
(function () {
  var _g100 = nexus.runtime;
  var _37 = _g100["%"];
  var unstash = _g100.unstash;
  var split = _g100.split;
  var replicate = _g100.replicate;
  var table63 = _g100["table?"];
  var substring = _g100.substring;
  var write_file = _g100["write-file"];
  var char = _g100.char;
  var hd = _g100.hd;
  var composite63 = _g100["composite?"];
  var pairwise = _g100.pairwise;
  var boolean63 = _g100["boolean?"];
  var iterate = _g100.iterate;
  var sub = _g100.sub;
  var some63 = _g100["some?"];
  var inner = _g100.inner;
  var add = _g100.add;
  var _60 = _g100["<"];
  var _61 = _g100["="];
  var length = _g100.length;
  var _62 = _g100[">"];
  var keep = _g100.keep;
  var string_literal63 = _g100["string-literal?"];
  var string63 = _g100["string?"];
  var module = _g100.module;
  var _ = _g100["-"];
  var _42 = _g100["*"];
  var nil63 = _g100["nil?"];
  var _47 = _g100["/"];
  var search = _g100.search;
  var number63 = _g100["number?"];
  var parse_number = _g100["parse-number"];
  var in63 = _g100["in?"];
  var atom63 = _g100["atom?"];
  var exclude = _g100.exclude;
  var id_literal63 = _g100["id-literal?"];
  var reverse = _g100.reverse;
  var sublist = _g100.sublist;
  var _6061 = _g100["<="];
  var module_key = _g100["module-key"];
  var keys63 = _g100["keys?"];
  var exit = _g100.exit;
  var function63 = _g100["function?"];
  var reduce = _g100.reduce;
  var is63 = _g100["is?"];
  var code = _g100.code;
  var find = _g100.find;
  var write = _g100.write;
  var make_id = _g100["make-id"];
  var _6261 = _g100[">="];
  var none63 = _g100["none?"];
  var extend = _g100.extend;
  var toplevel63 = _g100["toplevel?"];
  var read_file = _g100["read-file"];
  var _37message_handler = _g100["%message-handler"];
  var tl = _g100.tl;
  var splice = _g100.splice;
  var apply = _g100.apply;
  var list63 = _g100["list?"];
  var empty63 = _g100["empty?"];
  var map = _g100.map;
  var to_string = _g100["to-string"];
  var stash = _g100.stash;
  var cat = _g100.cat;
  var _43 = _g100["+"];
  var drop = _g100.drop;
  var setenv = _g100.setenv;
  var last = _g100.last;
  var join = _g100.join;
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {"\t": true, " ": true, "\n": true};
  function make_stream(str) {
    return({pos: 0, len: length(str), string: str});
  }
  function peek_char(s) {
    if (s.pos < s.len) {
      return(char(s.string, s.pos));
    }
  }
  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = s.pos + 1;
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
  }
  var read_table = {};
  var eof = {};
  function read(s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return((read_table[c] || read_table[""])(s));
    } else {
      return(eof);
    }
  }
  function read_all(s) {
    var l = [];
    while (true) {
      var form = read(s);
      if (form === eof) {
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
    return(string63(atom) && length(atom) > 1 && char(atom, length(atom) - 1) === ":");
  }
  function flag63(atom) {
    return(string63(atom) && length(atom) > 1 && char(atom, 0) === ":");
  }
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
    var n = parse_number(str);
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
  var _g110 = {};
  nexus.reader = _g110;
  _g110["read-all"] = read_all;
  _g110["read-table"] = read_table;
  _g110.whitespace = whitespace;
  _g110["skip-non-code"] = skip_non_code;
  _g110["flag?"] = flag63;
  _g110.eof = eof;
  _g110.delimiters = delimiters;
  _g110["read-from-string"] = read_from_string;
  _g110.read = read;
  _g110["key?"] = key63;
  _g110["read-char"] = read_char;
  _g110["make-stream"] = make_stream;
  _g110["peek-char"] = peek_char;
})();
(function () {
  var _g111 = nexus.runtime;
  var _37 = _g111["%"];
  var unstash = _g111.unstash;
  var split = _g111.split;
  var replicate = _g111.replicate;
  var table63 = _g111["table?"];
  var substring = _g111.substring;
  var write_file = _g111["write-file"];
  var char = _g111.char;
  var hd = _g111.hd;
  var composite63 = _g111["composite?"];
  var pairwise = _g111.pairwise;
  var boolean63 = _g111["boolean?"];
  var iterate = _g111.iterate;
  var sub = _g111.sub;
  var some63 = _g111["some?"];
  var inner = _g111.inner;
  var add = _g111.add;
  var _60 = _g111["<"];
  var _61 = _g111["="];
  var length = _g111.length;
  var _62 = _g111[">"];
  var keep = _g111.keep;
  var string_literal63 = _g111["string-literal?"];
  var string63 = _g111["string?"];
  var module = _g111.module;
  var _ = _g111["-"];
  var _42 = _g111["*"];
  var nil63 = _g111["nil?"];
  var _47 = _g111["/"];
  var search = _g111.search;
  var number63 = _g111["number?"];
  var parse_number = _g111["parse-number"];
  var in63 = _g111["in?"];
  var atom63 = _g111["atom?"];
  var exclude = _g111.exclude;
  var id_literal63 = _g111["id-literal?"];
  var reverse = _g111.reverse;
  var sublist = _g111.sublist;
  var _6061 = _g111["<="];
  var module_key = _g111["module-key"];
  var keys63 = _g111["keys?"];
  var exit = _g111.exit;
  var function63 = _g111["function?"];
  var reduce = _g111.reduce;
  var is63 = _g111["is?"];
  var code = _g111.code;
  var find = _g111.find;
  var write = _g111.write;
  var make_id = _g111["make-id"];
  var _6261 = _g111[">="];
  var none63 = _g111["none?"];
  var extend = _g111.extend;
  var toplevel63 = _g111["toplevel?"];
  var read_file = _g111["read-file"];
  var _37message_handler = _g111["%message-handler"];
  var tl = _g111.tl;
  var splice = _g111.splice;
  var apply = _g111.apply;
  var list63 = _g111["list?"];
  var empty63 = _g111["empty?"];
  var map = _g111.map;
  var to_string = _g111["to-string"];
  var stash = _g111.stash;
  var cat = _g111.cat;
  var _43 = _g111["+"];
  var drop = _g111.drop;
  var setenv = _g111.setenv;
  var last = _g111.last;
  var join = _g111.join;
  var _g112 = nexus.utilities;
  var special63 = _g112["special?"];
  var to_id = _g112["to-id"];
  var symbol63 = _g112["symbol?"];
  var quote_environment = _g112["quote-environment"];
  var bound63 = _g112["bound?"];
  var initial_environment = _g112["initial-environment"];
  var bind42 = _g112["bind*"];
  var quasiexpand = _g112.quasiexpand;
  var quote_modules = _g112["quote-modules"];
  var variable63 = _g112["variable?"];
  var getenv = _g112.getenv;
  var bind = _g112.bind;
  var indentation = _g112.indentation;
  var special_form63 = _g112["special-form?"];
  var macro63 = _g112["macro?"];
  var macro_function = _g112["macro-function"];
  var macroexpand = _g112.macroexpand;
  var quoted = _g112.quoted;
  var toplevel63 = _g112["toplevel?"];
  var mapo = _g112.mapo;
  var exported = _g112.exported;
  var symbol_expansion = _g112["symbol-expansion"];
  var statement63 = _g112["statement?"];
  var stash42 = _g112["stash*"];
  var imported = _g112.imported;
  var reserved63 = _g112["reserved?"];
  var valid_id63 = _g112["valid-id?"];
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
  _g122["%"] = true;
  _g122["*"] = true;
  _g122["/"] = true;
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
  _g131["<"] = true;
  _g131["<="] = true;
  _g131[">="] = true;
  _g131[">"] = true;
  var _g135 = [];
  _g135.js = "!=";
  _g135.lua = "~=";
  var _g137 = [];
  _g137.js = "===";
  _g137.lua = "==";
  var _g133 = [];
  var _g138 = [];
  _g138.js = "!=";
  _g138.lua = "~=";
  _g133["~="] = _g138;
  var _g139 = [];
  _g139.js = "===";
  _g139.lua = "==";
  _g133["="] = _g139;
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
  function unary63(form) {
    var op = form[0];
    var args = sub(form, 1);
    return(length(args) === 1 && in63(op, ["not", "-"]));
  }
  function precedence(form) {
    if (list63(form) && !unary63(form)) {
      var _g150 = infix;
      var i = 0;
      while (i < length(_g150)) {
        var level = _g150[i];
        if (level[hd(form)]) {
          return(i);
        }
        i = i + 1;
      }
    }
    return(0);
  }
  function getop(op) {
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
  }
  function infix63(x) {
    return(is63(getop(x)));
  }
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g151 = args;
    var i = 0;
    while (i < length(_g151)) {
      var arg = _g151[i];
      str = str + compile(arg);
      if (i < length(args) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + ")");
  }
  function compile_atom(x) {
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
                  return(x + "");
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
    if (!stmt63) {
      return("");
    } else {
      if (target === "js") {
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
    var stmt = _g152.stmt;
    var self_tr63 = _g152.tr;
    var special = _g152.special;
    var tr = terminator(stmt63 && !self_tr63);
    return(apply(special, args) + tr);
  }
  function compile_call(form) {
    if (none63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return("(" + f1 + ")" + args);
      } else {
        if (string63(f)) {
          return(f1 + args);
        } else {
          throw new Error("Invalid function call");
        }
      }
    }
  }
  function op_delims(parent, p) {
    if (p > precedence(parent)) {
      return(["(", ")"]);
    } else {
      return(["", ""]);
    }
  }
  function compile_infix(form) {
    var op = form[0];
    var _g153 = sub(form, 1);
    var a = _g153[0];
    var b = _g153[1];
    var _g154 = op_delims(form, precedence(a));
    var ao = _g154[0];
    var ac = _g154[1];
    var _g155 = op_delims(form, precedence(b) + 1);
    var bo = _g155[0];
    var bc = _g155[1];
    var _g156 = compile(a);
    var _g157 = compile(b);
    var _g158 = getop(op);
    if (unary63(form)) {
      return(_g158 + ao + _g156 + ac);
    } else {
      return(ao + _g156 + ac + " " + _g158 + " " + bo + _g157 + bc);
    }
  }
  function compile_function(args, body) {
    var _g159 = unstash(sublist(arguments, 2));
    var name = _g159.name;
    var prefix = _g159.prefix;
    var _g164;
    if (name) {
      _g164 = compile(name);
    } else {
      _g164 = "";
    }
    var id = _g164;
    var _g160 = prefix || "";
    var _g161 = compile_args(args);
    indent_level = indent_level + 1;
    var _g163 = compile(body, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g162 = _g163;
    var ind = indentation();
    var _g165;
    if (target === "js") {
      _g165 = "";
    } else {
      _g165 = "end";
    }
    var tr = _g165;
    if (name) {
      tr = tr + "\n";
    }
    if (target === "js") {
      return("function " + id + _g161 + " {\n" + _g162 + ind + "}" + tr);
    } else {
      return(_g160 + "function " + id + _g161 + "\n" + _g162 + ind + tr);
    }
  }
  function can_return63(form) {
    return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
  }
  compile = function (form) {
    var _g166 = unstash(sublist(arguments, 1));
    var stmt = _g166.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g168;
        if (stmt) {
          _g168 = indentation();
        } else {
          _g168 = "";
        }
        var ind = _g168;
        var _g169;
        if (atom63(form)) {
          _g169 = compile_atom(form);
        } else {
          var _g170;
          if (infix63(hd(form))) {
            _g170 = compile_infix(form);
          } else {
            _g170 = compile_call(form);
          }
          _g169 = _g170;
        }
        var _g167 = _g169;
        return(ind + _g167 + tr);
      }
    }
  };
  var lower;
  function lower_statement(form, tail63) {
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
  }
  function lower_body(body, tail63) {
    return(lower_statement(join(["do"], body), tail63));
  }
  function lower_do(args, hoist, stmt63, tail63) {
    var _g171 = sub(args, 0, length(args) - 1);
    var _g172 = 0;
    while (_g172 < length(_g171)) {
      var x = _g171[_g172];
      add(hoist, lower(x, hoist, stmt63));
      _g172 = _g172 + 1;
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && can_return63(e)) {
      return(["return", e]);
    } else {
      return(e);
    }
  }
  function lower_if(args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g173 = args[1];
    var _g174 = args[2];
    if (stmt63 || tail63) {
      var _g176;
      if (_g174) {
        _g176 = [lower_body([_g174], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g173], tail63)], _g176)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g175;
      if (_g174) {
        _g175 = [lower(["set", e, _g174])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g173])], _g175));
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
      var _g177;
      if (x === "and") {
        _g177 = ["%if", id, b, id];
      } else {
        _g177 = ["%if", id, id, b];
      }
      return(lower(["do", ["%local", id, a], _g177], hoist));
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
    var _g178 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g178, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g179 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g179)) {
      return(_g179);
    }
  }
  function lower_infix63(form) {
    return(infix63(hd(form)) && length(form) > 3);
  }
  function lower_infix(form, hoist) {
    var x = form[0];
    var args = sub(form, 1);
    return(lower(reduce(function (a, b) {
      return([x, b, a]);
    }, reverse(args)), hoist));
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
  global.lower = lower;
  function process(form) {
    return(lower(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return(module_key(spec) + ".l");
  }
  function encapsulate(body) {
    var _g180 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g180, epilog))]]);
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return(compile(form) + ";\n");
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
      compiler_output = compiler_output + compiled;
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g181 = unstash(sublist(arguments, 1));
    var all = _g181.all;
    var m = module(spec);
    var frame = last(environment);
    var _g182 = m.export;
    var k = undefined;
    for (k in _g182) {
      if (isNaN(parseInt(k))) {
        var v = _g182[k];
        if (v.export || all) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g183 = unstash(sublist(arguments, 1));
    var all = _g183.all;
    if (!module(spec)) {
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
    var _g184 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g184));
    target = previous;
    return(run(compiled));
  }
  var _g185 = {};
  nexus.compiler = _g185;
  _g185["in-module"] = in_module;
  _g185["compile-atom"] = compile_atom;
  _g185["lower-body"] = lower_body;
  _g185["compile-infix"] = compile_infix;
  _g185["lower-if"] = lower_if;
  _g185["compile-file"] = compile_file;
  _g185.getop = getop;
  _g185["compiler-output"] = compiler_output;
  _g185.terminator = terminator;
  _g185["lower-special"] = lower_special;
  _g185["compile-function"] = compile_function;
  _g185.run = run;
  _g185["load-module"] = load_module;
  _g185.precedence = precedence;
  _g185["infix?"] = infix63;
  _g185["lower-for"] = lower_for;
  _g185["op-delims"] = op_delims;
  _g185["unary?"] = unary63;
  _g185["lower-do"] = lower_do;
  _g185["compile-call"] = compile_call;
  _g185["lower-infix?"] = lower_infix63;
  _g185.compile = compile;
  _g185["module-path"] = module_path;
  _g185["can-return?"] = can_return63;
  _g185.lower = lower;
  _g185["lower-short"] = lower_short;
  _g185["lower-statement"] = lower_statement;
  _g185.encapsulate = encapsulate;
  _g185["open-module"] = open_module;
  _g185.prologue = prologue;
  _g185.process = process;
  _g185["lower-try"] = lower_try;
  _g185["compile-module"] = compile_module;
  _g185.eval = eval;
  _g185["lower-definition"] = lower_definition;
  _g185["%compile-module"] = _37compile_module;
  _g185["lower-infix"] = lower_infix;
  _g185["lower-call"] = lower_call;
  _g185.infix = infix;
  _g185["compiling?"] = compiling63;
  _g185["compile-args"] = compile_args;
  _g185["lower-while"] = lower_while;
  _g185["compile-special"] = compile_special;
  _g185["lower-function"] = lower_function;
})();
(function () {
  var _g186 = nexus.runtime;
  var _37 = _g186["%"];
  var unstash = _g186.unstash;
  var split = _g186.split;
  var replicate = _g186.replicate;
  var table63 = _g186["table?"];
  var substring = _g186.substring;
  var write_file = _g186["write-file"];
  var char = _g186.char;
  var hd = _g186.hd;
  var composite63 = _g186["composite?"];
  var pairwise = _g186.pairwise;
  var boolean63 = _g186["boolean?"];
  var iterate = _g186.iterate;
  var sub = _g186.sub;
  var some63 = _g186["some?"];
  var inner = _g186.inner;
  var add = _g186.add;
  var _60 = _g186["<"];
  var _61 = _g186["="];
  var length = _g186.length;
  var _62 = _g186[">"];
  var keep = _g186.keep;
  var string_literal63 = _g186["string-literal?"];
  var string63 = _g186["string?"];
  var module = _g186.module;
  var _ = _g186["-"];
  var _42 = _g186["*"];
  var nil63 = _g186["nil?"];
  var _47 = _g186["/"];
  var search = _g186.search;
  var number63 = _g186["number?"];
  var parse_number = _g186["parse-number"];
  var in63 = _g186["in?"];
  var atom63 = _g186["atom?"];
  var exclude = _g186.exclude;
  var id_literal63 = _g186["id-literal?"];
  var reverse = _g186.reverse;
  var sublist = _g186.sublist;
  var _6061 = _g186["<="];
  var module_key = _g186["module-key"];
  var keys63 = _g186["keys?"];
  var exit = _g186.exit;
  var function63 = _g186["function?"];
  var reduce = _g186.reduce;
  var is63 = _g186["is?"];
  var code = _g186.code;
  var find = _g186.find;
  var write = _g186.write;
  var make_id = _g186["make-id"];
  var _6261 = _g186[">="];
  var none63 = _g186["none?"];
  var extend = _g186.extend;
  var toplevel63 = _g186["toplevel?"];
  var read_file = _g186["read-file"];
  var _37message_handler = _g186["%message-handler"];
  var tl = _g186.tl;
  var splice = _g186.splice;
  var apply = _g186.apply;
  var list63 = _g186["list?"];
  var empty63 = _g186["empty?"];
  var map = _g186.map;
  var to_string = _g186["to-string"];
  var stash = _g186.stash;
  var cat = _g186.cat;
  var _43 = _g186["+"];
  var drop = _g186.drop;
  var setenv = _g186.setenv;
  var last = _g186.last;
  var join = _g186.join;
  var _g187 = nexus.utilities;
  var special63 = _g187["special?"];
  var to_id = _g187["to-id"];
  var symbol63 = _g187["symbol?"];
  var quote_environment = _g187["quote-environment"];
  var bound63 = _g187["bound?"];
  var initial_environment = _g187["initial-environment"];
  var bind42 = _g187["bind*"];
  var quasiexpand = _g187.quasiexpand;
  var quote_modules = _g187["quote-modules"];
  var variable63 = _g187["variable?"];
  var getenv = _g187.getenv;
  var bind = _g187.bind;
  var indentation = _g187.indentation;
  var special_form63 = _g187["special-form?"];
  var macro63 = _g187["macro?"];
  var macro_function = _g187["macro-function"];
  var macroexpand = _g187.macroexpand;
  var quoted = _g187.quoted;
  var toplevel63 = _g187["toplevel?"];
  var mapo = _g187.mapo;
  var exported = _g187.exported;
  var symbol_expansion = _g187["symbol-expansion"];
  var statement63 = _g187["statement?"];
  var stash42 = _g187["stash*"];
  var imported = _g187.imported;
  var reserved63 = _g187["reserved?"];
  var valid_id63 = _g187["valid-id?"];
  var _g190 = nexus.compiler;
  var in_module = _g190["in-module"];
  var compile_function = _g190["compile-function"];
  var load_module = _g190["load-module"];
  var compile = _g190.compile;
  var lower = _g190.lower;
  var open_module = _g190["open-module"];
  var compile_module = _g190["compile-module"];
  var eval = _g190.eval;
})();
(function () {
  var _g348 = nexus.runtime;
  var _37 = _g348["%"];
  var unstash = _g348.unstash;
  var split = _g348.split;
  var replicate = _g348.replicate;
  var table63 = _g348["table?"];
  var substring = _g348.substring;
  var write_file = _g348["write-file"];
  var char = _g348.char;
  var hd = _g348.hd;
  var composite63 = _g348["composite?"];
  var pairwise = _g348.pairwise;
  var boolean63 = _g348["boolean?"];
  var iterate = _g348.iterate;
  var sub = _g348.sub;
  var some63 = _g348["some?"];
  var inner = _g348.inner;
  var add = _g348.add;
  var _60 = _g348["<"];
  var _61 = _g348["="];
  var length = _g348.length;
  var _62 = _g348[">"];
  var keep = _g348.keep;
  var string_literal63 = _g348["string-literal?"];
  var string63 = _g348["string?"];
  var module = _g348.module;
  var _ = _g348["-"];
  var _42 = _g348["*"];
  var nil63 = _g348["nil?"];
  var _47 = _g348["/"];
  var search = _g348.search;
  var number63 = _g348["number?"];
  var parse_number = _g348["parse-number"];
  var in63 = _g348["in?"];
  var atom63 = _g348["atom?"];
  var exclude = _g348.exclude;
  var id_literal63 = _g348["id-literal?"];
  var reverse = _g348.reverse;
  var sublist = _g348.sublist;
  var _6061 = _g348["<="];
  var module_key = _g348["module-key"];
  var keys63 = _g348["keys?"];
  var exit = _g348.exit;
  var function63 = _g348["function?"];
  var reduce = _g348.reduce;
  var is63 = _g348["is?"];
  var code = _g348.code;
  var find = _g348.find;
  var write = _g348.write;
  var make_id = _g348["make-id"];
  var _6261 = _g348[">="];
  var none63 = _g348["none?"];
  var extend = _g348.extend;
  var toplevel63 = _g348["toplevel?"];
  var read_file = _g348["read-file"];
  var _37message_handler = _g348["%message-handler"];
  var tl = _g348.tl;
  var splice = _g348.splice;
  var apply = _g348.apply;
  var list63 = _g348["list?"];
  var empty63 = _g348["empty?"];
  var map = _g348.map;
  var to_string = _g348["to-string"];
  var stash = _g348.stash;
  var cat = _g348.cat;
  var _43 = _g348["+"];
  var drop = _g348.drop;
  var setenv = _g348.setenv;
  var last = _g348.last;
  var join = _g348.join;
  var _g349 = nexus.utilities;
  var special63 = _g349["special?"];
  var to_id = _g349["to-id"];
  var symbol63 = _g349["symbol?"];
  var quote_environment = _g349["quote-environment"];
  var bound63 = _g349["bound?"];
  var initial_environment = _g349["initial-environment"];
  var bind42 = _g349["bind*"];
  var quasiexpand = _g349.quasiexpand;
  var quote_modules = _g349["quote-modules"];
  var variable63 = _g349["variable?"];
  var getenv = _g349.getenv;
  var bind = _g349.bind;
  var indentation = _g349.indentation;
  var special_form63 = _g349["special-form?"];
  var macro63 = _g349["macro?"];
  var macro_function = _g349["macro-function"];
  var macroexpand = _g349.macroexpand;
  var quoted = _g349.quoted;
  var toplevel63 = _g349["toplevel?"];
  var mapo = _g349.mapo;
  var exported = _g349.exported;
  var symbol_expansion = _g349["symbol-expansion"];
  var statement63 = _g349["statement?"];
  var stash42 = _g349["stash*"];
  var imported = _g349.imported;
  var reserved63 = _g349["reserved?"];
  var valid_id63 = _g349["valid-id?"];
  var _g352 = nexus.compiler;
  var in_module = _g352["in-module"];
  var compile_function = _g352["compile-function"];
  var load_module = _g352["load-module"];
  var compile = _g352.compile;
  var lower = _g352.lower;
  var open_module = _g352["open-module"];
  var compile_module = _g352["compile-module"];
  var eval = _g352.eval;
  global.target = "js";
})();
(function () {
  var _g618 = nexus.runtime;
  var _37 = _g618["%"];
  var unstash = _g618.unstash;
  var split = _g618.split;
  var replicate = _g618.replicate;
  var table63 = _g618["table?"];
  var substring = _g618.substring;
  var write_file = _g618["write-file"];
  var char = _g618.char;
  var hd = _g618.hd;
  var composite63 = _g618["composite?"];
  var pairwise = _g618.pairwise;
  var boolean63 = _g618["boolean?"];
  var iterate = _g618.iterate;
  var sub = _g618.sub;
  var some63 = _g618["some?"];
  var inner = _g618.inner;
  var add = _g618.add;
  var _60 = _g618["<"];
  var _61 = _g618["="];
  var length = _g618.length;
  var _62 = _g618[">"];
  var keep = _g618.keep;
  var string_literal63 = _g618["string-literal?"];
  var string63 = _g618["string?"];
  var module = _g618.module;
  var _ = _g618["-"];
  var _42 = _g618["*"];
  var nil63 = _g618["nil?"];
  var _47 = _g618["/"];
  var search = _g618.search;
  var number63 = _g618["number?"];
  var parse_number = _g618["parse-number"];
  var in63 = _g618["in?"];
  var atom63 = _g618["atom?"];
  var exclude = _g618.exclude;
  var id_literal63 = _g618["id-literal?"];
  var reverse = _g618.reverse;
  var sublist = _g618.sublist;
  var _6061 = _g618["<="];
  var module_key = _g618["module-key"];
  var keys63 = _g618["keys?"];
  var exit = _g618.exit;
  var function63 = _g618["function?"];
  var reduce = _g618.reduce;
  var is63 = _g618["is?"];
  var code = _g618.code;
  var find = _g618.find;
  var write = _g618.write;
  var make_id = _g618["make-id"];
  var _6261 = _g618[">="];
  var none63 = _g618["none?"];
  var extend = _g618.extend;
  var toplevel63 = _g618["toplevel?"];
  var read_file = _g618["read-file"];
  var _37message_handler = _g618["%message-handler"];
  var tl = _g618.tl;
  var splice = _g618.splice;
  var apply = _g618.apply;
  var list63 = _g618["list?"];
  var empty63 = _g618["empty?"];
  var map = _g618.map;
  var to_string = _g618["to-string"];
  var stash = _g618.stash;
  var cat = _g618.cat;
  var _43 = _g618["+"];
  var drop = _g618.drop;
  var setenv = _g618.setenv;
  var last = _g618.last;
  var join = _g618.join;
  var _g619 = nexus.utilities;
  var special63 = _g619["special?"];
  var to_id = _g619["to-id"];
  var symbol63 = _g619["symbol?"];
  var quote_environment = _g619["quote-environment"];
  var bound63 = _g619["bound?"];
  var initial_environment = _g619["initial-environment"];
  var bind42 = _g619["bind*"];
  var quasiexpand = _g619.quasiexpand;
  var quote_modules = _g619["quote-modules"];
  var variable63 = _g619["variable?"];
  var getenv = _g619.getenv;
  var bind = _g619.bind;
  var indentation = _g619.indentation;
  var special_form63 = _g619["special-form?"];
  var macro63 = _g619["macro?"];
  var macro_function = _g619["macro-function"];
  var macroexpand = _g619.macroexpand;
  var quoted = _g619.quoted;
  var toplevel63 = _g619["toplevel?"];
  var mapo = _g619.mapo;
  var exported = _g619.exported;
  var symbol_expansion = _g619["symbol-expansion"];
  var statement63 = _g619["statement?"];
  var stash42 = _g619["stash*"];
  var imported = _g619.imported;
  var reserved63 = _g619["reserved?"];
  var valid_id63 = _g619["valid-id?"];
  var _g622 = nexus.compiler;
  var in_module = _g622["in-module"];
  var compile_function = _g622["compile-function"];
  var load_module = _g622["load-module"];
  var compile = _g622.compile;
  var lower = _g622.lower;
  var open_module = _g622["open-module"];
  var compile_module = _g622["compile-module"];
  var eval = _g622.eval;
  global.modules = {special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"while": {special: function (cond, form) {
    var _g635 = compile(cond);
    indent_level = indent_level + 1;
    var _g636 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g636;
    var ind = indentation();
    if (target === "js") {
      return(ind + "while (" + _g635 + ") {\n" + body + ind + "}\n");
    } else {
      return(ind + "while " + _g635 + " do\n" + body + ind + "end\n");
    }
  }, tr: true, stmt: true, export: true, foo: true}, "%for": {special: function (t, k, form) {
    var _g637 = compile(t);
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g638 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g638;
    if (target === "lua") {
      return(ind + "for " + k + " in next, " + _g637 + " do\n" + body + ind + "end\n");
    } else {
      return(ind + "for (" + k + " in " + _g637 + ") {\n" + body + ind + "}\n");
    }
  }, tr: true, stmt: true, export: true, foo: true}, "do": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "";
    var _g639 = forms;
    var _g640 = 0;
    while (_g640 < length(_g639)) {
      var x = _g639[_g640];
      str = str + compile(x, {_stash: true, stmt: true});
      _g640 = _g640 + 1;
    }
    return(str);
  }, tr: true, stmt: true, export: true, foo: true}, "error": {special: function (x) {
    var _g706;
    if (target === "js") {
      _g706 = "throw new " + compile(["Error", x]);
    } else {
      _g706 = "error(" + compile(x) + ")";
    }
    var e = _g706;
    return(indentation() + e);
  }, foo: true, export: true, stmt: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, foo: true, export: true}, "return": {special: function (x) {
    var _g707;
    if (nil63(x)) {
      _g707 = "return";
    } else {
      _g707 = "return(" + compile(x) + ")";
    }
    var _g641 = _g707;
    return(indentation() + _g641);
  }, foo: true, export: true, stmt: true}, "get": {special: function (t, k) {
    var _g642 = compile(t);
    var k1 = compile(k);
    if (target === "lua" && char(_g642, 0) === "{") {
      _g642 = "(" + _g642 + ")";
    }
    if (string_literal63(k) && valid_id63(inner(k))) {
      return(_g642 + "." + inner(k));
    } else {
      return(_g642 + "[" + k1 + "]");
    }
  }, foo: true, export: true}, "%local": {special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g708;
    if (is63(value)) {
      _g708 = " = " + value1;
    } else {
      _g708 = "";
    }
    var rh = _g708;
    var _g709;
    if (target === "js") {
      _g709 = "var ";
    } else {
      _g709 = "local ";
    }
    var keyword = _g709;
    var ind = indentation();
    return(ind + keyword + id + rh);
  }, foo: true, export: true, stmt: true}, "%array": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var _g710;
    if (target === "lua") {
      _g710 = "{";
    } else {
      _g710 = "[";
    }
    var open = _g710;
    var _g711;
    if (target === "lua") {
      _g711 = "}";
    } else {
      _g711 = "]";
    }
    var close = _g711;
    var str = "";
    var _g643 = forms;
    var i = 0;
    while (i < length(_g643)) {
      var x = _g643[i];
      str = str + compile(x);
      if (i < length(forms) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(open + str + close);
  }, foo: true, export: true}, "not": {}, "%object": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "{";
    var _g712;
    if (target === "lua") {
      _g712 = " = ";
    } else {
      _g712 = ": ";
    }
    var sep = _g712;
    var pairs = pairwise(forms);
    var _g644 = pairs;
    var i = 0;
    while (i < length(_g644)) {
      var _g645 = _g644[i];
      var k = _g645[0];
      var v = _g645[1];
      if (!string63(k)) {
        throw new Error("Illegal key: " + to_string(k));
      }
      var _g646 = compile(v);
      var _g713;
      if (valid_id63(k)) {
        _g713 = k;
      } else {
        var _g714;
        if (target === "js" && string_literal63(k)) {
          _g714 = k;
        } else {
          var _g715;
          if (target === "js") {
            _g715 = quoted(k);
          } else {
            var _g716;
            if (string_literal63(k)) {
              _g716 = "[" + k + "]";
            } else {
              _g716 = "[" + quoted(k) + "]";
            }
            _g715 = _g716;
          }
          _g714 = _g715;
        }
        _g713 = _g714;
      }
      var _g647 = _g713;
      str = str + _g647 + sep + _g646;
      if (i < length(pairs) - 1) {
        str = str + ", ";
      }
      i = i + 1;
    }
    return(str + "}");
  }, foo: true, export: true}, "%if": {special: function (cond, cons, alt) {
    var _g648 = compile(cond);
    indent_level = indent_level + 1;
    var _g651 = compile(cons, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var _g649 = _g651;
    var _g717;
    if (alt) {
      indent_level = indent_level + 1;
      var _g652 = compile(alt, {_stash: true, stmt: true});
      indent_level = indent_level - 1;
      _g717 = _g652;
    }
    var _g650 = _g717;
    var ind = indentation();
    var str = "";
    if (target === "js") {
      str = str + ind + "if (" + _g648 + ") {\n" + _g649 + ind + "}";
    } else {
      str = str + ind + "if " + _g648 + " then\n" + _g649;
    }
    if (_g650 && target === "js") {
      str = str + " else {\n" + _g650 + ind + "}";
    } else {
      if (_g650) {
        str = str + ind + "else\n" + _g650;
      }
    }
    if (target === "lua") {
      return(str + ind + "end\n");
    } else {
      return(str + "\n");
    }
  }, tr: true, stmt: true, export: true, foo: true}, "set": {special: function (lh, rh) {
    var _g653 = compile(lh);
    var _g718;
    if (nil63(rh)) {
      _g718 = "nil";
    } else {
      _g718 = rh;
    }
    var _g654 = compile(_g718);
    return(indentation() + _g653 + " = " + _g654);
  }, foo: true, export: true, stmt: true}, "%local-function": {special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return(indentation() + x);
  }, tr: true, stmt: true, export: true, foo: true}, "%global-function": {special: function (name, args, body) {
    if (target === "lua") {
      var x = compile_function(args, body, {_stash: true, name: name});
      return(indentation() + x);
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, tr: true, stmt: true, export: true, foo: true}, "%try": {special: function (form) {
    var ind = indentation();
    indent_level = indent_level + 1;
    var _g655 = compile(form, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var body = _g655;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = indent_level + 1;
    var _g656 = compile(hf, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    var h = _g656;
    return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
  }, tr: true, stmt: true, export: true, foo: true}, "break": {special: function () {
    return(indentation() + "break");
  }, foo: true, export: true, stmt: true}}}, reader: {import: ["runtime", "special", "core"], export: {"read-all": {variable: true, export: true}, "read-table": {variable: true, export: true}, whitespace: {variable: true}, "skip-non-code": {variable: true}, "flag?": {variable: true}, eof: {variable: true}, delimiters: {variable: true}, "read-from-string": {variable: true, export: true}, read: {variable: true, export: true}, "key?": {variable: true}, "read-char": {variable: true}, "make-stream": {variable: true, export: true}, "peek-char": {variable: true}, "define-reader": {macro: function (_g657) {
    var char = _g657[0];
    var stream = _g657[1];
    var body = unstash(sublist(arguments, 1));
    var _g658 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g658)]);
  }, export: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-modules": {macro: function () {
    return(quote_modules());
  }}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {global: true, export: true}}}, optimizer: {import: ["runtime", "special", "core"], export: {"define-optimization": {}, optimize: {variable: true, export: true}, optimizations: {variable: true}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g659 = sub(specs, 0);
    map(compile_module, _g659);
    return(undefined);
  }}}}, lib: {import: ["core", "special"], export: {}}, utilities: {import: ["runtime", "special", "core"], export: {"special?": {variable: true, export: true}, "quasiquoting?": {variable: true}, "to-id": {variable: true, export: true}, "symbol?": {variable: true, export: true}, "indent-level": {global: true, export: true}, "quote-environment": {variable: true, export: true}, "bound?": {variable: true, export: true}, "initial-environment": {variable: true, export: true}, "bind*": {variable: true, export: true}, quasiexpand: {variable: true, export: true}, "quote-modules": {variable: true, export: true}, "can-unquote?": {variable: true}, "variable?": {variable: true, export: true}, getenv: {variable: true, export: true}, bind: {variable: true, export: true}, "quasiquote-list": {variable: true}, indentation: {variable: true, export: true}, reserved: {variable: true}, "special-form?": {variable: true, export: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}, "macro?": {variable: true, export: true}, "quote-binding": {variable: true}, "macro-function": {variable: true, export: true}, "valid-char?": {variable: true}, "numeric?": {variable: true}, macroexpand: {variable: true, export: true}, quoted: {variable: true, export: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, escape: {variable: true}, "toplevel?": {variable: true, export: true}, "global?": {variable: true}, "quoting?": {variable: true}, "quasisplice?": {variable: true}, mapo: {variable: true, export: true}, exported: {variable: true, export: true}, "symbol-expansion": {variable: true, export: true}, "statement?": {variable: true, export: true}, "stash*": {variable: true, export: true}, imported: {variable: true, export: true}, "reserved?": {variable: true, export: true}, "valid-id?": {variable: true, export: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"in-module": {variable: true, export: true}, "compile-atom": {variable: true}, "lower-body": {variable: true}, "compile-infix": {variable: true}, "lower-if": {variable: true}, "compile-file": {variable: true}, getop: {variable: true}, "compiler-output": {variable: true}, terminator: {variable: true}, "lower-special": {variable: true}, "compile-function": {variable: true, export: true}, run: {variable: true}, "load-module": {variable: true, export: true}, precedence: {variable: true}, "infix?": {variable: true}, "lower-for": {variable: true}, "op-delims": {variable: true}, "unary?": {variable: true}, "lower-do": {variable: true}, "compile-call": {variable: true}, "lower-infix?": {variable: true}, compile: {variable: true, export: true}, "module-path": {variable: true}, "can-return?": {variable: true}, lower: {variable: true, export: true, global: true}, "lower-short": {variable: true}, "lower-statement": {variable: true}, encapsulate: {variable: true}, "open-module": {variable: true, export: true}, prologue: {variable: true}, process: {variable: true}, "lower-try": {variable: true}, "compile-module": {variable: true, export: true}, eval: {variable: true, export: true}, "lower-definition": {variable: true}, "%compile-module": {variable: true}, "lower-infix": {variable: true}, "lower-call": {variable: true}, infix: {variable: true}, "compiling?": {variable: true}, "compile-args": {variable: true}, "lower-while": {variable: true}, "compile-special": {variable: true}, "lower-function": {variable: true}, "current-module": {global: true, export: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g660 = sub(body, 0);
    add(environment, {});
    map(function (_g662) {
      var name = _g662[0];
      var exp = _g662[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g661 = join(["do"], macroexpand(_g660));
    drop(environment);
    return(_g661);
  }, export: true}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g663 = elements;
    var _g664 = 0;
    while (_g664 < length(_g663)) {
      var e = _g663[_g664];
      l[e] = true;
      _g664 = _g664 + 1;
    }
    return(join(["table"], l));
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, by || 1]]);
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g665 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g665)]);
  }, export: true}, at: {macro: function (l, i) {
    if (target === "lua" && number63(i)) {
      i = i + 1;
    } else {
      if (target === "lua") {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g666 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g667 = join(["do"], macroexpand(_g666));
    drop(environment);
    return(_g667);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g668 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g668)) {
      var _g669 = bind42(x, _g668);
      var args = _g669[0];
      var _g670 = _g669[1];
      return(join(["%global-function", name, args], _g670));
    } else {
      if (target === "js") {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g671 = sub(body, 0);
    var form = join(["fn", args], _g671);
    var _g672 = ["setenv", ["quote", name]];
    _g672.form = ["quote", form];
    _g672.macro = form;
    eval(_g672);
    return(undefined);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, by || 1]]);
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g673 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g673)) {
      var _g674 = bind42(x, _g673);
      var args = _g674[0];
      var _g675 = _g674[1];
      return(join(["%local-function", name, args], _g675));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g676 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g676)]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g677 = sub(body, 0);
    var form = join(["fn", args], _g677);
    var keys = sub(_g677, length(_g677));
    var _g678 = ["setenv", ["quote", name]];
    _g678.special = form;
    _g678.form = ["quote", form];
    eval(join(_g678, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g679 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g680 = ["table"];
    _g680._scope = scope;
    return(["do", ["add", "environment", _g680], ["let", [x, join(["do"], _g679)], ["drop", "environment"], x]]);
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g681 = sub(body, 0);
    var imports = [];
    var exp = _g681.export;
    var imp = _g681.import;
    var _g682 = imp || [];
    var _g683 = 0;
    while (_g683 < length(_g682)) {
      var k = _g682[_g683];
      load_module(k);
      imports = join(imports, imported(k));
      _g683 = _g683 + 1;
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g684 = exp || [];
    var _g685 = 0;
    while (_g685 < length(_g684)) {
      var k = _g684[_g685];
      setenv(k, {_stash: true, export: true});
      _g685 = _g685 + 1;
    }
    return(join(["do"], imports));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!keys63(body)) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g686 = body;
      var k = undefined;
      for (k in _g686) {
        if (isNaN(parseInt(k))) {
          var v = _g686[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g687 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g687)]);
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g688 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g719;
    if (nil63(v)) {
      var _g720;
      if (b.i) {
        _g720 = "i";
      } else {
        _g720 = make_id();
      }
      var i = _g720;
      _g719 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g688), ["inc", i]]];
    } else {
      var _g689 = ["target"];
      _g689.lua = ["not", ["number?", k]];
      _g689.js = ["isNaN", ["parseInt", k]];
      _g719 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g689, join(["let", [v, ["get", t1, k]]], _g688)]]];
    }
    return(["let", [t1, t], _g719]);
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g690 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g691) {
      var lh = _g691[0];
      var rh = _g691[1];
      var _g692 = bind(lh, rh);
      var _g693 = 0;
      while (_g693 < length(_g692)) {
        var _g694 = _g692[_g693];
        var id = _g694[0];
        var val = _g694[1];
        if (bound63(id) || reserved63(id) || toplevel63()) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g693 = _g693 + 1;
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g690)])));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g347, x) {
      return(x);
    }, body)));
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g695 = sub(body, 0);
    var _g696 = bind42(args, _g695);
    var _g697 = _g696[0];
    var _g698 = _g696[1];
    return(join(["%function", _g697], _g698));
  }, export: true}, guard: {macro: function (expr) {
    if (target === "js") {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = "|" + e + "," + x + "|";
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "with-bindings": {macro: function (_g699) {
    var names = _g699[0];
    var body = unstash(sublist(arguments, 1));
    var _g700 = sub(body, 0);
    var x = make_id();
    var _g702 = ["setenv", x];
    _g702.variable = true;
    var _g701 = ["with-frame", ["each", [x], names, _g702]];
    _g701.scope = true;
    return(join(_g701, _g700));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g703 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g703)]);
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g704) {
      var a = _g704[0];
      var b = _g704[1];
      var c = sub(_g704, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g705 = sub(body, 0);
    return(["if", cond, join(["do"], _g705)]);
  }, export: true}}}, runtime: {import: ["special", "core"], export: {"%": {variable: true, export: true}, unstash: {variable: true, export: true}, split: {variable: true, export: true}, replicate: {variable: true, export: true}, "table?": {variable: true, export: true}, substring: {variable: true, export: true}, "write-file": {variable: true, export: true}, char: {variable: true, export: true}, hd: {variable: true, export: true}, "composite?": {variable: true, export: true}, pairwise: {variable: true, export: true}, "boolean?": {variable: true, export: true}, iterate: {variable: true, export: true}, sub: {variable: true, export: true}, "some?": {variable: true, export: true}, inner: {variable: true, export: true}, add: {variable: true, export: true}, "<": {variable: true, export: true}, "=": {variable: true, export: true}, length: {variable: true, export: true}, ">": {variable: true, export: true}, keep: {variable: true, export: true}, "string-literal?": {variable: true, export: true}, "string?": {variable: true, export: true}, module: {variable: true, export: true}, "-": {variable: true, export: true}, "*": {variable: true, export: true}, "nil?": {variable: true, export: true}, print: {global: true, export: true}, "/": {variable: true, export: true}, search: {variable: true, export: true}, "number?": {variable: true, export: true}, require: {global: true, export: true}, "parse-number": {variable: true, export: true}, "in?": {variable: true, export: true}, "atom?": {variable: true, export: true}, exclude: {variable: true, export: true}, "id-literal?": {variable: true, export: true}, reverse: {variable: true, export: true}, sublist: {variable: true, export: true}, "<=": {variable: true, export: true}, "module-key": {variable: true, export: true}, "keys?": {variable: true, export: true}, exit: {variable: true, export: true}, "function?": {variable: true, export: true}, reduce: {variable: true, export: true}, "is?": {variable: true, export: true}, "id-count": {variable: true}, code: {variable: true, export: true}, fs: {variable: true}, find: {variable: true, export: true}, mapl: {variable: true}, write: {variable: true, export: true}, "make-id": {variable: true, export: true}, ">=": {variable: true, export: true}, type: {variable: true}, "none?": {variable: true, export: true}, extend: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "read-file": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, tl: {variable: true, export: true}, splice: {variable: true, export: true}, apply: {variable: true, export: true}, "list?": {variable: true, export: true}, "empty?": {variable: true, export: true}, map: {variable: true, export: true}, "to-string": {variable: true, export: true}, "splice?": {variable: true}, stash: {variable: true, export: true}, cat: {variable: true, export: true}, "+": {variable: true, export: true}, drop: {variable: true, export: true}, setenv: {variable: true, export: true}, last: {variable: true, export: true}, join: {variable: true, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g721 = sub(body, 0);
    var imports = [];
    var exp = _g721.export;
    var imp = _g721.import;
    var _g722 = imp || [];
    var _g723 = 0;
    while (_g723 < length(_g722)) {
      var k = _g722[_g723];
      load_module(k);
      imports = join(imports, imported(k));
      _g723 = _g723 + 1;
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g724 = exp || [];
    var _g725 = 0;
    while (_g725 < length(_g724)) {
      var k = _g724[_g725];
      setenv(k, {_stash: true, export: true});
      _g725 = _g725 + 1;
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var splice = _g2.splice;
  var unstash = _g2.unstash;
  var split = _g2.split;
  var replicate = _g2.replicate;
  var table63 = _g2["table?"];
  var substring = _g2.substring;
  var write_file = _g2["write-file"];
  var char = _g2.char;
  var hd = _g2.hd;
  var composite63 = _g2["composite?"];
  var pairwise = _g2.pairwise;
  var boolean63 = _g2["boolean?"];
  var iterate = _g2.iterate;
  var sub = _g2.sub;
  var some63 = _g2["some?"];
  var inner = _g2.inner;
  var add = _g2.add;
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var length = _g2.length;
  var _62 = _g2[">"];
  var keep = _g2.keep;
  var none63 = _g2["none?"];
  var string63 = _g2["string?"];
  var module = _g2.module;
  var _ = _g2["-"];
  var _42 = _g2["*"];
  var nil63 = _g2["nil?"];
  var _47 = _g2["/"];
  var search = _g2.search;
  var number63 = _g2["number?"];
  var empty63 = _g2["empty?"];
  var in63 = _g2["in?"];
  var atom63 = _g2["atom?"];
  var exclude = _g2.exclude;
  var id_literal63 = _g2["id-literal?"];
  var reverse = _g2.reverse;
  var sublist = _g2.sublist;
  var _6061 = _g2["<="];
  var module_key = _g2["module-key"];
  var keys63 = _g2["keys?"];
  var exit = _g2.exit;
  var function63 = _g2["function?"];
  var reduce = _g2.reduce;
  var is63 = _g2["is?"];
  var code = _g2.code;
  var find = _g2.find;
  var make_id = _g2["make-id"];
  var _6261 = _g2[">="];
  var _37 = _g2["%"];
  var drop = _g2.drop;
  var extend = _g2.extend;
  var toplevel63 = _g2["toplevel?"];
  var read_file = _g2["read-file"];
  var _37message_handler = _g2["%message-handler"];
  var tl = _g2.tl;
  var apply = _g2.apply;
  var to_string = _g2["to-string"];
  var list63 = _g2["list?"];
  var parse_number = _g2["parse-number"];
  var map = _g2.map;
  var write = _g2.write;
  var _43 = _g2["+"];
  var cat = _g2.cat;
  var stash = _g2.stash;
  var string_literal63 = _g2["string-literal?"];
  var setenv = _g2.setenv;
  var last = _g2.last;
  var join = _g2.join;
  var _g5 = nexus.reader;
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read = _g5.read;
  var make_stream = _g5["make-stream"];
  var read_all = _g5["read-all"];
  var _g6 = nexus.compiler;
  var in_module = _g6["in-module"];
  var compile_function = _g6["compile-function"];
  var load_module = _g6["load-module"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var eval = _g6.eval;
  var compile_module = _g6["compile-module"];
  var lower = _g6.lower;
  function rep(str) {
    var _g727 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g730) {
        return([false, _g730.message]);
      }
    })();
    var _g1 = _g727[0];
    var x = _g727[1];
    if (is63(x)) {
      return(print(to_string(x) + " "));
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
    print(to_string("usage: lumen [options] <module>") + " ");
    print(to_string("options:") + " ");
    print(to_string("  -o <output>\tOutput file") + " ");
    print(to_string("  -t <target>\tTarget language (default: lua)") + " ");
    print(to_string("  -e <expr>\tExpression to evaluate") + " ");
    return(exit());
  }
  function main() {
    var args = sub(process.argv, 2);
    if (hd(args) === "-h" || hd(args) === "--help") {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var _g728 = args;
    var i = 0;
    while (i < length(_g728)) {
      var arg = _g728[i];
      if (arg === "-o" || arg === "-t" || arg === "-e") {
        if (i === length(args) - 1) {
          print(to_string("missing argument for") + " " + to_string(arg) + " ");
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
      in_module(spec || "main");
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g729 = {};
  nexus.main = _g729;
  _g729.usage = usage;
  _g729.repl = repl;
  _g729.main = main;
  _g729.rep = rep;
})();
