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
    var _g21 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g21, upto));
    } else {
      var l = sublist(x, _g21, upto);
      var _g22 = x;
      var k = undefined;
      for (k in _g22) {
        if (isNaN(parseInt(k))) {
          var v = _g22[k];
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
          var _g23 = l1;
          var k = undefined;
          for (k in _g23) {
            if (isNaN(parseInt(k))) {
              var v = _g23[k];
              l[k] = v;
            }
          }
          var _g24 = l2;
          var k = undefined;
          for (k in _g24) {
            if (isNaN(parseInt(k))) {
              var v = _g24[k];
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
    var _g25 = l;
    var _g26 = 0;
    while ((_g26 < length(_g25))) {
      var x = _g25[_g26];
      if (f(x)) {
        add(l1, x);
      }
      _g26 = (_g26 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g27 = l;
    var _g28 = 0;
    while ((_g28 < length(_g27))) {
      var x = _g27[_g28];
      var _g29 = f(x);
      if (_g29) {
        return(_g29);
      }
      _g28 = (_g28 + 1);
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
    var _g30 = l;
    var _g31 = 0;
    while ((_g31 < length(_g30))) {
      var x = _g30[_g31];
      var _g32 = f(x);
      if (splice63(_g32)) {
        l1 = join(l1, _g32.value);
      } else {
        if (is63(_g32)) {
          add(l1, _g32);
        }
      }
      _g31 = (_g31 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g33 = t;
    var k = undefined;
    for (k in _g33) {
      if (isNaN(parseInt(k))) {
        var v = _g33[k];
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
    var _g34 = t;
    var k = undefined;
    for (k in _g34) {
      if (isNaN(parseInt(k))) {
        var v = _g34[k];
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
      var _g35 = args;
      var k = undefined;
      for (k in _g35) {
        if (isNaN(parseInt(k))) {
          var v = _g35[k];
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
        var _g36 = l;
        var k = undefined;
        for (k in _g36) {
          if (isNaN(parseInt(k))) {
            var v = _g36[k];
            if ((k != "_stash")) {
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
    var _g37 = sub(xs, 0);
    return(join(t, _g37));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g38 = sub(keys, 0);
    var t1 = sublist(t);
    var _g39 = t;
    var k = undefined;
    for (k in _g39) {
      if (isNaN(parseInt(k))) {
        var v = _g39[k];
        if (!(_g38[k])) {
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
    var _g40 = sub(xs, 0);
    if (none63(_g40)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g40));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g41 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g41));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g42)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g43));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g44)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g45)));
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
            var _g46 = x;
            var k = undefined;
            for (k in _g46) {
              if (isNaN(parseInt(k))) {
                var v = _g46[k];
                add(x1, (k + ":"));
                add(x1, v);
              }
            }
            var _g47 = x1;
            var i = 0;
            while ((i < length(_g47))) {
              var y = _g47[i];
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
    var _g48 = stash(args);
    return((f.apply)(f, _g48));
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
    var _g49 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g50 = _g49;
      var k1 = undefined;
      for (k1 in _g50) {
        if (isNaN(parseInt(k1))) {
          var v = _g50[k1];
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
  var _g51 = {};
  nexus.runtime = _g51;
  _g51.split = split;
  _g51.reverse = reverse;
  _g51["some?"] = some63;
  _g51.exit = exit;
  _g51["boolean?"] = boolean63;
  _g51.unstash = unstash;
  _g51[">"] = _62;
  _g51["<"] = _60;
  _g51["="] = _61;
  _g51.pairwise = pairwise;
  _g51.setenv = setenv;
  _g51.module = module;
  _g51["splice?"] = splice63;
  _g51.add = add;
  _g51["composite?"] = composite63;
  _g51["%message-handler"] = _37message_handler;
  _g51.apply = apply;
  _g51["toplevel?"] = toplevel63;
  _g51.replicate = replicate;
  _g51.inner = inner;
  _g51.map = map;
  _g51["id-literal?"] = id_literal63;
  _g51["string-literal?"] = string_literal63;
  _g51.type = type;
  _g51["none?"] = none63;
  _g51["parse-number"] = parse_number;
  _g51.code = code;
  _g51.tl = tl;
  _g51["is?"] = is63;
  _g51.fs = fs;
  _g51["id-count"] = id_count;
  _g51["empty?"] = empty63;
  _g51.last = last;
  _g51.hd = hd;
  _g51.sublist = sublist;
  _g51["module-key"] = module_key;
  _g51["string?"] = string63;
  _g51["make-id"] = make_id;
  _g51.exclude = exclude;
  _g51.mapl = mapl;
  _g51.search = search;
  _g51["number?"] = number63;
  _g51.length = length;
  _g51["keys?"] = keys63;
  _g51.drop = drop;
  _g51.keep = keep;
  _g51["table?"] = table63;
  _g51["+"] = _43;
  _g51["to-string"] = to_string;
  _g51.sub = sub;
  _g51.write = write;
  _g51.cat = cat;
  _g51.substring = substring;
  _g51["nil?"] = nil63;
  _g51["atom?"] = atom63;
  _g51.splice = splice;
  _g51["read-file"] = read_file;
  _g51[">="] = _6261;
  _g51.extend = extend;
  _g51["write-file"] = write_file;
  _g51["list?"] = list63;
  _g51.char = char;
  _g51.iterate = iterate;
  _g51["function?"] = function63;
  _g51["%"] = _37;
  _g51["*"] = _42;
  _g51.reduce = reduce;
  _g51.find = find;
  _g51["<="] = _6061;
  _g51.stash = stash;
  _g51["/"] = _47;
  _g51.join = join;
  _g51["-"] = _;
})();
(function () {
  var _g56 = nexus.runtime;
  var split = _g56.split;
  var reverse = _g56.reverse;
  var some63 = _g56["some?"];
  var exit = _g56.exit;
  var boolean63 = _g56["boolean?"];
  var unstash = _g56.unstash;
  var _62 = _g56[">"];
  var _60 = _g56["<"];
  var _61 = _g56["="];
  var pairwise = _g56.pairwise;
  var setenv = _g56.setenv;
  var module = _g56.module;
  var add = _g56.add;
  var composite63 = _g56["composite?"];
  var _37message_handler = _g56["%message-handler"];
  var apply = _g56.apply;
  var toplevel63 = _g56["toplevel?"];
  var replicate = _g56.replicate;
  var inner = _g56.inner;
  var map = _g56.map;
  var id_literal63 = _g56["id-literal?"];
  var string_literal63 = _g56["string-literal?"];
  var none63 = _g56["none?"];
  var parse_number = _g56["parse-number"];
  var code = _g56.code;
  var tl = _g56.tl;
  var is63 = _g56["is?"];
  var empty63 = _g56["empty?"];
  var last = _g56.last;
  var hd = _g56.hd;
  var sublist = _g56.sublist;
  var module_key = _g56["module-key"];
  var string63 = _g56["string?"];
  var make_id = _g56["make-id"];
  var exclude = _g56.exclude;
  var search = _g56.search;
  var number63 = _g56["number?"];
  var length = _g56.length;
  var keys63 = _g56["keys?"];
  var drop = _g56.drop;
  var keep = _g56.keep;
  var table63 = _g56["table?"];
  var _43 = _g56["+"];
  var to_string = _g56["to-string"];
  var sub = _g56.sub;
  var write = _g56.write;
  var cat = _g56.cat;
  var substring = _g56.substring;
  var nil63 = _g56["nil?"];
  var atom63 = _g56["atom?"];
  var splice = _g56.splice;
  var read_file = _g56["read-file"];
  var _6261 = _g56[">="];
  var extend = _g56.extend;
  var write_file = _g56["write-file"];
  var list63 = _g56["list?"];
  var char = _g56.char;
  var iterate = _g56.iterate;
  var function63 = _g56["function?"];
  var _37 = _g56["%"];
  var _42 = _g56["*"];
  var reduce = _g56.reduce;
  var find = _g56.find;
  var _6061 = _g56["<="];
  var stash = _g56.stash;
  var _47 = _g56["/"];
  var join = _g56.join;
  var _ = _g56["-"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g59 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g60 = undefined;
        var _g61 = _g59;
        var x = undefined;
        for (x in _g61) {
          if (isNaN(parseInt(x))) {
            var _g52 = _g61[x];
            _g60 = x;
          }
        }
        if (_g60) {
          return(b[_g60]);
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
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x)));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while ((i < length(str))) {
      var c = char(str, i);
      var _g62;
      if ((c === "\n")) {
        _g62 = "\\n";
      } else {
        var _g63;
        if ((c === "\"")) {
          _g63 = "\\\"";
        } else {
          var _g64;
          if ((c === "\\")) {
            _g64 = "\\\\";
          } else {
            _g64 = c;
          }
          _g63 = _g64;
        }
        _g62 = _g63;
      }
      var c1 = _g62;
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
      var _g65 = args;
      var k = undefined;
      for (k in _g65) {
        if (isNaN(parseInt(k))) {
          var v = _g65[k];
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
        var _g66 = lh;
        var i = 0;
        while ((i < length(_g66))) {
          var x = _g66[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g67 = lh;
        var k = undefined;
        for (k in _g67) {
          if (isNaN(parseInt(k))) {
            var v = _g67[k];
            if ((v === true)) {
              v = k;
            }
            if ((k != "rest")) {
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
      var _g68 = args;
      var _g69 = 0;
      while ((_g69 < length(_g68))) {
        var arg = _g68[_g69];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g69 = (_g69 + 1);
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
    return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
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
          var _g53 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g72 = args;
          var _g73 = 0;
          while ((_g73 < length(_g72))) {
            var _g70 = _g72[_g73];
            setenv(_g70, {_stash: true, variable: true});
            _g73 = (_g73 + 1);
          }
          var _g71 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g71);
        } else {
          if (((x === "%local-function") || (x === "%global-function"))) {
            var _g54 = form[0];
            var name = form[1];
            var _g74 = form[2];
            var _g75 = sub(form, 3);
            add(environment, {_scope: true});
            var _g78 = _g74;
            var _g79 = 0;
            while ((_g79 < length(_g78))) {
              var _g76 = _g78[_g79];
              setenv(_g76, {_stash: true, variable: true});
              _g79 = (_g79 + 1);
            }
            var _g77 = join([x, name, map(macroexpand, _g74)], macroexpand(_g75));
            drop(environment);
            return(_g77);
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
    var _g80 = form;
    var k = undefined;
    for (k in _g80) {
      if (isNaN(parseInt(k))) {
        var v = _g80[k];
        var _g85;
        if (quasisplice63(v, depth)) {
          _g85 = quasiexpand(v[1]);
        } else {
          _g85 = quasiexpand(v, depth);
        }
        var _g81 = _g85;
        last(xs)[k] = _g81;
      }
    }
    var _g82 = form;
    var _g83 = 0;
    while ((_g83 < length(_g82))) {
      var x = _g82[_g83];
      if (quasisplice63(x, depth)) {
        var _g84 = quasiexpand(x[1]);
        add(xs, _g84);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g83 = (_g83 + 1);
    }
    var pruned = keep(function (x) {
      return(((length(x) > 1) || !((hd(x) === "list")) || keys63(x)));
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
  var reserved = {"then": true, "repeat": true, "with": true, "function": true, "while": true, ">=": true, "continue": true, "<=": true, "*": true, "debugger": true, "for": true, "=": true, "var": true, "void": true, "else": true, "default": true, "typeof": true, "finally": true, "elseif": true, "try": true, "false": true, "catch": true, "/": true, "this": true, "-": true, "and": true, "%": true, "new": true, "in": true, "throw": true, "end": true, "+": true, "not": true, ">": true, "break": true, "<": true, "local": true, "nil": true, "or": true, "instanceof": true, "until": true, "return": true, "true": true, "case": true, "do": true, "if": true, "==": true, "switch": true, "delete": true};
  function reserved63(x) {
    return(reserved[x]);
  }
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
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
      var _g90;
      if ((c === "-")) {
        _g90 = "_";
      } else {
        var _g91;
        if (valid_char63(n)) {
          _g91 = c;
        } else {
          var _g92;
          if ((i === 0)) {
            _g92 = ("_" + n);
          } else {
            _g92 = n;
          }
          _g91 = _g92;
        }
        _g90 = _g91;
      }
      var c1 = _g90;
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g93 = module(current_module).export;
    var n = undefined;
    for (n in _g93) {
      if (isNaN(parseInt(n))) {
        var b = _g93[n];
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
    var _g94 = unstash(sublist(arguments, 1));
    var all = _g94.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g95 = module(spec).export;
      var n = undefined;
      for (n in _g95) {
        if (isNaN(parseInt(n))) {
          var b = _g95[n];
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
    var _g96 = t;
    var k = undefined;
    for (k in _g96) {
      if (isNaN(parseInt(k))) {
        var v = _g96[k];
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
    return(join(["%object"], mapo(function (_g55, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    var _g97 = ["table"];
    _g97.import = quoted(m.import);
    _g97.export = quote_frame(m.export);
    return(_g97);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g98 = {};
  nexus.utilities = _g98;
  _g98["special-form?"] = special_form63;
  _g98["bound?"] = bound63;
  _g98.macroexpand = macroexpand;
  _g98.indentation = indentation;
  _g98["valid-id?"] = valid_id63;
  _g98["initial-environment"] = initial_environment;
  _g98["statement?"] = statement63;
  _g98["variable?"] = variable63;
  _g98.imported = imported;
  _g98["quasiquote-list"] = quasiquote_list;
  _g98["quote-modules"] = quote_modules;
  _g98["valid-char?"] = valid_char63;
  _g98["macro-function"] = macro_function;
  _g98["quote-binding"] = quote_binding;
  _g98.getenv = getenv;
  _g98["symbol?"] = symbol63;
  _g98["special?"] = special63;
  _g98.exported = exported;
  _g98["toplevel?"] = toplevel63;
  _g98["quote-module"] = quote_module;
  _g98.mapo = mapo;
  _g98.bind = bind;
  _g98["reserved?"] = reserved63;
  _g98.reserved = reserved;
  _g98["symbol-expansion"] = symbol_expansion;
  _g98["quote-environment"] = quote_environment;
  _g98["quasiquoting?"] = quasiquoting63;
  _g98["numeric?"] = numeric63;
  _g98["quasisplice?"] = quasisplice63;
  _g98.quoted = quoted;
  _g98["can-unquote?"] = can_unquote63;
  _g98["quoting?"] = quoting63;
  _g98.escape = escape;
  _g98.quasiexpand = quasiexpand;
  _g98["macro?"] = macro63;
  _g98["quote-frame"] = quote_frame;
  _g98["to-id"] = to_id;
  _g98["stash*"] = stash42;
  _g98["global?"] = global63;
  _g98["bind*"] = bind42;
})();
(function () {
  var _g99 = nexus.runtime;
  var split = _g99.split;
  var reverse = _g99.reverse;
  var some63 = _g99["some?"];
  var exit = _g99.exit;
  var boolean63 = _g99["boolean?"];
  var unstash = _g99.unstash;
  var _62 = _g99[">"];
  var _60 = _g99["<"];
  var _61 = _g99["="];
  var pairwise = _g99.pairwise;
  var setenv = _g99.setenv;
  var module = _g99.module;
  var add = _g99.add;
  var composite63 = _g99["composite?"];
  var _37message_handler = _g99["%message-handler"];
  var apply = _g99.apply;
  var toplevel63 = _g99["toplevel?"];
  var replicate = _g99.replicate;
  var inner = _g99.inner;
  var map = _g99.map;
  var id_literal63 = _g99["id-literal?"];
  var string_literal63 = _g99["string-literal?"];
  var none63 = _g99["none?"];
  var parse_number = _g99["parse-number"];
  var code = _g99.code;
  var tl = _g99.tl;
  var is63 = _g99["is?"];
  var empty63 = _g99["empty?"];
  var last = _g99.last;
  var hd = _g99.hd;
  var sublist = _g99.sublist;
  var module_key = _g99["module-key"];
  var string63 = _g99["string?"];
  var make_id = _g99["make-id"];
  var exclude = _g99.exclude;
  var search = _g99.search;
  var number63 = _g99["number?"];
  var length = _g99.length;
  var keys63 = _g99["keys?"];
  var drop = _g99.drop;
  var keep = _g99.keep;
  var table63 = _g99["table?"];
  var _43 = _g99["+"];
  var to_string = _g99["to-string"];
  var sub = _g99.sub;
  var write = _g99.write;
  var cat = _g99.cat;
  var substring = _g99.substring;
  var nil63 = _g99["nil?"];
  var atom63 = _g99["atom?"];
  var splice = _g99.splice;
  var read_file = _g99["read-file"];
  var _6261 = _g99[">="];
  var extend = _g99.extend;
  var write_file = _g99["write-file"];
  var list63 = _g99["list?"];
  var char = _g99.char;
  var iterate = _g99.iterate;
  var function63 = _g99["function?"];
  var _37 = _g99["%"];
  var _42 = _g99["*"];
  var reduce = _g99.reduce;
  var find = _g99.find;
  var _6061 = _g99["<="];
  var stash = _g99.stash;
  var _47 = _g99["/"];
  var join = _g99.join;
  var _ = _g99["-"];
  var delimiters = {")": true, "(": true, ";": true, "\n": true};
  var whitespace = {"\t": true, "\n": true, " ": true};
  function make_stream(str) {
    return({string: str, len: length(str), pos: 0});
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
    return((string63(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":")));
  }
  function flag63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
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
  _g110["make-stream"] = make_stream;
  _g110.delimiters = delimiters;
  _g110["read-table"] = read_table;
  _g110["read-from-string"] = read_from_string;
  _g110["key?"] = key63;
  _g110.whitespace = whitespace;
  _g110.eof = eof;
  _g110["skip-non-code"] = skip_non_code;
  _g110["read-char"] = read_char;
  _g110["peek-char"] = peek_char;
  _g110.read = read;
  _g110["flag?"] = flag63;
})();
(function () {
  var _g111 = nexus.runtime;
  var split = _g111.split;
  var reverse = _g111.reverse;
  var some63 = _g111["some?"];
  var exit = _g111.exit;
  var boolean63 = _g111["boolean?"];
  var unstash = _g111.unstash;
  var _62 = _g111[">"];
  var _60 = _g111["<"];
  var _61 = _g111["="];
  var pairwise = _g111.pairwise;
  var setenv = _g111.setenv;
  var module = _g111.module;
  var add = _g111.add;
  var composite63 = _g111["composite?"];
  var _37message_handler = _g111["%message-handler"];
  var apply = _g111.apply;
  var toplevel63 = _g111["toplevel?"];
  var replicate = _g111.replicate;
  var inner = _g111.inner;
  var map = _g111.map;
  var id_literal63 = _g111["id-literal?"];
  var string_literal63 = _g111["string-literal?"];
  var none63 = _g111["none?"];
  var parse_number = _g111["parse-number"];
  var code = _g111.code;
  var tl = _g111.tl;
  var is63 = _g111["is?"];
  var empty63 = _g111["empty?"];
  var last = _g111.last;
  var hd = _g111.hd;
  var sublist = _g111.sublist;
  var module_key = _g111["module-key"];
  var string63 = _g111["string?"];
  var make_id = _g111["make-id"];
  var exclude = _g111.exclude;
  var search = _g111.search;
  var number63 = _g111["number?"];
  var length = _g111.length;
  var keys63 = _g111["keys?"];
  var drop = _g111.drop;
  var keep = _g111.keep;
  var table63 = _g111["table?"];
  var _43 = _g111["+"];
  var to_string = _g111["to-string"];
  var sub = _g111.sub;
  var write = _g111.write;
  var cat = _g111.cat;
  var substring = _g111.substring;
  var nil63 = _g111["nil?"];
  var atom63 = _g111["atom?"];
  var splice = _g111.splice;
  var read_file = _g111["read-file"];
  var _6261 = _g111[">="];
  var extend = _g111.extend;
  var write_file = _g111["write-file"];
  var list63 = _g111["list?"];
  var char = _g111.char;
  var iterate = _g111.iterate;
  var function63 = _g111["function?"];
  var _37 = _g111["%"];
  var _42 = _g111["*"];
  var reduce = _g111.reduce;
  var find = _g111.find;
  var _6061 = _g111["<="];
  var stash = _g111.stash;
  var _47 = _g111["/"];
  var join = _g111.join;
  var _ = _g111["-"];
  var _g112 = nexus.utilities;
  var special_form63 = _g112["special-form?"];
  var bound63 = _g112["bound?"];
  var macroexpand = _g112.macroexpand;
  var indentation = _g112.indentation;
  var valid_id63 = _g112["valid-id?"];
  var initial_environment = _g112["initial-environment"];
  var statement63 = _g112["statement?"];
  var variable63 = _g112["variable?"];
  var imported = _g112.imported;
  var quote_modules = _g112["quote-modules"];
  var macro_function = _g112["macro-function"];
  var getenv = _g112.getenv;
  var symbol63 = _g112["symbol?"];
  var special63 = _g112["special?"];
  var exported = _g112.exported;
  var toplevel63 = _g112["toplevel?"];
  var mapo = _g112.mapo;
  var bind = _g112.bind;
  var reserved63 = _g112["reserved?"];
  var symbol_expansion = _g112["symbol-expansion"];
  var quote_environment = _g112["quote-environment"];
  var quoted = _g112.quoted;
  var quasiexpand = _g112.quasiexpand;
  var macro63 = _g112["macro?"];
  var to_id = _g112["to-id"];
  var stash42 = _g112["stash*"];
  var bind42 = _g112["bind*"];
  var _g115 = nexus.reader;
  var read_all = _g115["read-all"];
  var make_stream = _g115["make-stream"];
  var read_table = _g115["read-table"];
  var read_from_string = _g115["read-from-string"];
  var read = _g115.read;
  var infix = {lua: {cat: "..", "or": true, "~=": true, "=": "==", "and": true}, common: {">=": true, "%": true, "*": true, "+": true, "<=": true, ">": true, "/": true, "<": true, "-": true}, js: {cat: "+", "or": "||", "~=": "!=", "=": "===", "and": "&&"}};
  function getop(op) {
    var op1 = (infix.common[op] || infix[target][op]);
    if ((op1 === true)) {
      return(op);
    } else {
      return(op1);
    }
  }
  function infix63(form) {
    return((list63(form) && is63(getop(hd(form)))));
  }
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g116 = args;
    var i = 0;
    while ((i < length(_g116))) {
      var arg = _g116[i];
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
  function compile_special(form, stmt63, tail63) {
    var _g117 = getenv(hd(form));
    var special = _g117.special;
    var self_tr63 = _g117.tr;
    var stmt = _g117.stmt;
    var tr = terminator((stmt63 && !(self_tr63)));
    return((special(tl(form), tail63) + tr));
  }
  function compile_call(form) {
    if (none63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return(("(" + f1 + ")" + args));
      } else {
        if (string63(f)) {
          return((f1 + args));
        } else {
          throw new Error("Invalid function call");
        }
      }
    }
  }
  function compile_infix(_g118) {
    var op = _g118[0];
    var args = sub(_g118, 1);
    var str = "(";
    var _g119 = getop(op);
    var _g120 = args;
    var i = 0;
    while ((i < length(_g120))) {
      var arg = _g120[i];
      if (((_g119 === "-") && (length(args) === 1))) {
        str = (str + _g119 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g119 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g121 = unstash(sublist(arguments, 2));
    var name = _g121.name;
    var prefix = _g121.prefix;
    var _g126;
    if (name) {
      _g126 = compile(name);
    } else {
      _g126 = "";
    }
    var id = _g126;
    var _g122 = (prefix || "");
    var _g123 = compile_args(args);
    indent_level = (indent_level + 1);
    var _g125 = compile(body, {_stash: true, tail: true, stmt: true});
    indent_level = (indent_level - 1);
    var _g124 = _g125;
    var ind = indentation();
    var _g127;
    if ((target === "js")) {
      _g127 = "";
    } else {
      _g127 = "end";
    }
    var tr = _g127;
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g123 + " {\n" + _g124 + ind + "}" + tr));
    } else {
      return((_g122 + "function " + id + _g123 + "\n" + _g124 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g128 = unstash(sublist(arguments, 1));
    var tail = _g128.tail;
    var stmt = _g128.stmt;
    if ((tail && can_return63(form))) {
      form = ["return", form];
    }
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt, tail));
      } else {
        var tr = terminator(stmt);
        var _g130;
        if (stmt) {
          _g130 = indentation();
        } else {
          _g130 = "";
        }
        var ind = _g130;
        var _g131;
        if (atom63(form)) {
          _g131 = compile_atom(form);
        } else {
          var _g132;
          if (infix63(form)) {
            _g132 = compile_infix(form);
          } else {
            _g132 = compile_call(form);
          }
          _g131 = _g132;
        }
        var _g129 = _g131;
        return((ind + _g129 + tr));
      }
    }
  };
  var lower;
  function lower_statement(form) {
    var hoist = [];
    var e = lower(form, hoist, true);
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
  function lower_do(args, hoist, stmt63) {
    var _g133 = sub(args, 0, (length(args) - 1));
    var _g134 = 0;
    while ((_g134 < length(_g133))) {
      var x = _g133[_g134];
      add(hoist, lower(x, hoist, stmt63));
      _g134 = (_g134 + 1);
    }
    return(lower(last(args), hoist, stmt63));
  }
  function lower_if(args, hoist, stmt63) {
    var cond = args[0];
    var _g135 = args[1];
    var _g136 = args[2];
    if (stmt63) {
      var _g138;
      if (_g136) {
        _g138 = [lower(_g136)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower(_g135)], _g138)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g137;
      if (_g136) {
        _g137 = [lower(["set", e, _g136])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g135])], _g137));
      return(e);
    }
  }
  function lower_while(args, hoist) {
    var c = args[0];
    var body = sub(args, 1);
    return(add(hoist, ["while", lower(c, hoist), lower(join(["do"], body))]));
  }
  function lower_for(args, hoist) {
    var t = args[0];
    var k = args[1];
    var body = sub(args, 2);
    return(add(hoist, ["%for", lower(t, hoist), k, lower(join(["do"], body))]));
  }
  function lower_function(args) {
    var a = args[0];
    var body = sub(args, 1);
    return(["%function", a, lower(join(["do"], body))]);
  }
  function lower_definition(kind, args, hoist) {
    var name = args[0];
    var _g139 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g139, lower(join(["do"], body))]));
  }
  function lower_call(form, hoist) {
    var _g140 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g140)) {
      return(_g140);
    }
  }
  function lower_special(form, hoist) {
    var e = lower_call(form, hoist);
    if (e) {
      return(add(hoist, e));
    }
  }
  lower = function (form, hoist, stmt63) {
    if (atom63(form)) {
      return(form);
    } else {
      if (empty63(form)) {
        return(["%array"]);
      } else {
        if (nil63(hoist)) {
          return(lower_statement(form));
        } else {
          var x = form[0];
          var args = sub(form, 1);
          if ((x === "do")) {
            return(lower_do(args, hoist, stmt63));
          } else {
            if ((x === "%if")) {
              return(lower_if(args, hoist, stmt63));
            } else {
              if ((x === "while")) {
                return(lower_while(args, hoist));
              } else {
                if ((x === "%for")) {
                  return(lower_for(args, hoist));
                } else {
                  if ((x === "%try")) {
                    return(["%try", lower(join(["do"], args))]);
                  } else {
                    if ((x === "%function")) {
                      return(lower_function(args));
                    } else {
                      if (((x === "%local-function") || (x === "%global-function"))) {
                        return(lower_definition(x, args, hoist));
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
    var _g141 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g141, epilog))]]);
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
    var _g142 = unstash(sublist(arguments, 1));
    var all = _g142.all;
    var m = module(spec);
    var frame = last(environment);
    var _g143 = m.export;
    var k = undefined;
    for (k in _g143) {
      if (isNaN(parseInt(k))) {
        var v = _g143[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g144 = unstash(sublist(arguments, 1));
    var all = _g144.all;
    if (nil63(module(spec))) {
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
    var _g145 = process(join(["do"], join(prologue(), [form])));
    var compiled = compile([["%function", [], _g145]]);
    target = previous;
    return(run(compiled));
  }
  var _g146 = {};
  nexus.compiler = _g146;
  _g146["module-path"] = module_path;
  _g146.lower = lower;
  _g146["%compile-module"] = _37compile_module;
  _g146["load-module"] = load_module;
  _g146["open-module"] = open_module;
  _g146["in-module"] = in_module;
  _g146["lower-definition"] = lower_definition;
  _g146["lower-if"] = lower_if;
  _g146["lower-do"] = lower_do;
  _g146["compiler-output"] = compiler_output;
  _g146["lower-for"] = lower_for;
  _g146["lower-statement"] = lower_statement;
  _g146["compile-module"] = compile_module;
  _g146["compile-call"] = compile_call;
  _g146["infix?"] = infix63;
  _g146.eval = eval;
  _g146["lower-function"] = lower_function;
  _g146["lower-call"] = lower_call;
  _g146.run = run;
  _g146["compile-file"] = compile_file;
  _g146["can-return?"] = can_return63;
  _g146["compile-args"] = compile_args;
  _g146["lower-while"] = lower_while;
  _g146["compile-atom"] = compile_atom;
  _g146.prologue = prologue;
  _g146["compiling?"] = compiling63;
  _g146.compile = compile;
  _g146.getop = getop;
  _g146.infix = infix;
  _g146.terminator = terminator;
  _g146["compile-special"] = compile_special;
  _g146.encapsulate = encapsulate;
  _g146.process = process;
  _g146["compile-infix"] = compile_infix;
  _g146["lower-special"] = lower_special;
  _g146["compile-function"] = compile_function;
})();
(function () {
  var _g148 = nexus.runtime;
  var split = _g148.split;
  var reverse = _g148.reverse;
  var some63 = _g148["some?"];
  var exit = _g148.exit;
  var boolean63 = _g148["boolean?"];
  var unstash = _g148.unstash;
  var _62 = _g148[">"];
  var _60 = _g148["<"];
  var _61 = _g148["="];
  var pairwise = _g148.pairwise;
  var setenv = _g148.setenv;
  var module = _g148.module;
  var add = _g148.add;
  var composite63 = _g148["composite?"];
  var _37message_handler = _g148["%message-handler"];
  var apply = _g148.apply;
  var toplevel63 = _g148["toplevel?"];
  var replicate = _g148.replicate;
  var inner = _g148.inner;
  var map = _g148.map;
  var id_literal63 = _g148["id-literal?"];
  var string_literal63 = _g148["string-literal?"];
  var none63 = _g148["none?"];
  var parse_number = _g148["parse-number"];
  var code = _g148.code;
  var tl = _g148.tl;
  var is63 = _g148["is?"];
  var empty63 = _g148["empty?"];
  var last = _g148.last;
  var hd = _g148.hd;
  var sublist = _g148.sublist;
  var module_key = _g148["module-key"];
  var string63 = _g148["string?"];
  var make_id = _g148["make-id"];
  var exclude = _g148.exclude;
  var search = _g148.search;
  var number63 = _g148["number?"];
  var length = _g148.length;
  var keys63 = _g148["keys?"];
  var drop = _g148.drop;
  var keep = _g148.keep;
  var table63 = _g148["table?"];
  var _43 = _g148["+"];
  var to_string = _g148["to-string"];
  var sub = _g148.sub;
  var write = _g148.write;
  var cat = _g148.cat;
  var substring = _g148.substring;
  var nil63 = _g148["nil?"];
  var atom63 = _g148["atom?"];
  var splice = _g148.splice;
  var read_file = _g148["read-file"];
  var _6261 = _g148[">="];
  var extend = _g148.extend;
  var write_file = _g148["write-file"];
  var list63 = _g148["list?"];
  var char = _g148.char;
  var iterate = _g148.iterate;
  var function63 = _g148["function?"];
  var _37 = _g148["%"];
  var _42 = _g148["*"];
  var reduce = _g148.reduce;
  var find = _g148.find;
  var _6061 = _g148["<="];
  var stash = _g148.stash;
  var _47 = _g148["/"];
  var join = _g148.join;
  var _ = _g148["-"];
  var _g149 = nexus.utilities;
  var special_form63 = _g149["special-form?"];
  var bound63 = _g149["bound?"];
  var macroexpand = _g149.macroexpand;
  var indentation = _g149.indentation;
  var valid_id63 = _g149["valid-id?"];
  var initial_environment = _g149["initial-environment"];
  var statement63 = _g149["statement?"];
  var variable63 = _g149["variable?"];
  var imported = _g149.imported;
  var quote_modules = _g149["quote-modules"];
  var macro_function = _g149["macro-function"];
  var getenv = _g149.getenv;
  var symbol63 = _g149["symbol?"];
  var special63 = _g149["special?"];
  var exported = _g149.exported;
  var toplevel63 = _g149["toplevel?"];
  var mapo = _g149.mapo;
  var bind = _g149.bind;
  var reserved63 = _g149["reserved?"];
  var symbol_expansion = _g149["symbol-expansion"];
  var quote_environment = _g149["quote-environment"];
  var quoted = _g149.quoted;
  var quasiexpand = _g149.quasiexpand;
  var macro63 = _g149["macro?"];
  var to_id = _g149["to-id"];
  var stash42 = _g149["stash*"];
  var bind42 = _g149["bind*"];
  var _g152 = nexus.compiler;
  var lower = _g152.lower;
  var load_module = _g152["load-module"];
  var open_module = _g152["open-module"];
  var in_module = _g152["in-module"];
  var compile_module = _g152["compile-module"];
  var eval = _g152.eval;
  var compile = _g152.compile;
  var compile_function = _g152["compile-function"];
})();
(function () {
  var _g358 = nexus.runtime;
  var split = _g358.split;
  var reverse = _g358.reverse;
  var some63 = _g358["some?"];
  var exit = _g358.exit;
  var boolean63 = _g358["boolean?"];
  var unstash = _g358.unstash;
  var _62 = _g358[">"];
  var _60 = _g358["<"];
  var _61 = _g358["="];
  var pairwise = _g358.pairwise;
  var setenv = _g358.setenv;
  var module = _g358.module;
  var add = _g358.add;
  var composite63 = _g358["composite?"];
  var _37message_handler = _g358["%message-handler"];
  var apply = _g358.apply;
  var toplevel63 = _g358["toplevel?"];
  var replicate = _g358.replicate;
  var inner = _g358.inner;
  var map = _g358.map;
  var id_literal63 = _g358["id-literal?"];
  var string_literal63 = _g358["string-literal?"];
  var none63 = _g358["none?"];
  var parse_number = _g358["parse-number"];
  var code = _g358.code;
  var tl = _g358.tl;
  var is63 = _g358["is?"];
  var empty63 = _g358["empty?"];
  var last = _g358.last;
  var hd = _g358.hd;
  var sublist = _g358.sublist;
  var module_key = _g358["module-key"];
  var string63 = _g358["string?"];
  var make_id = _g358["make-id"];
  var exclude = _g358.exclude;
  var search = _g358.search;
  var number63 = _g358["number?"];
  var length = _g358.length;
  var keys63 = _g358["keys?"];
  var drop = _g358.drop;
  var keep = _g358.keep;
  var table63 = _g358["table?"];
  var _43 = _g358["+"];
  var to_string = _g358["to-string"];
  var sub = _g358.sub;
  var write = _g358.write;
  var cat = _g358.cat;
  var substring = _g358.substring;
  var nil63 = _g358["nil?"];
  var atom63 = _g358["atom?"];
  var splice = _g358.splice;
  var read_file = _g358["read-file"];
  var _6261 = _g358[">="];
  var extend = _g358.extend;
  var write_file = _g358["write-file"];
  var list63 = _g358["list?"];
  var char = _g358.char;
  var iterate = _g358.iterate;
  var function63 = _g358["function?"];
  var _37 = _g358["%"];
  var _42 = _g358["*"];
  var reduce = _g358.reduce;
  var find = _g358.find;
  var _6061 = _g358["<="];
  var stash = _g358.stash;
  var _47 = _g358["/"];
  var join = _g358.join;
  var _ = _g358["-"];
  var _g359 = nexus.utilities;
  var special_form63 = _g359["special-form?"];
  var bound63 = _g359["bound?"];
  var macroexpand = _g359.macroexpand;
  var indentation = _g359.indentation;
  var valid_id63 = _g359["valid-id?"];
  var initial_environment = _g359["initial-environment"];
  var statement63 = _g359["statement?"];
  var variable63 = _g359["variable?"];
  var imported = _g359.imported;
  var quote_modules = _g359["quote-modules"];
  var macro_function = _g359["macro-function"];
  var getenv = _g359.getenv;
  var symbol63 = _g359["symbol?"];
  var special63 = _g359["special?"];
  var exported = _g359.exported;
  var toplevel63 = _g359["toplevel?"];
  var mapo = _g359.mapo;
  var bind = _g359.bind;
  var reserved63 = _g359["reserved?"];
  var symbol_expansion = _g359["symbol-expansion"];
  var quote_environment = _g359["quote-environment"];
  var quoted = _g359.quoted;
  var quasiexpand = _g359.quasiexpand;
  var macro63 = _g359["macro?"];
  var to_id = _g359["to-id"];
  var stash42 = _g359["stash*"];
  var bind42 = _g359["bind*"];
  var _g362 = nexus.compiler;
  var lower = _g362.lower;
  var load_module = _g362["load-module"];
  var open_module = _g362["open-module"];
  var in_module = _g362["in-module"];
  var compile_module = _g362["compile-module"];
  var eval = _g362.eval;
  var compile = _g362.compile;
  var compile_function = _g362["compile-function"];
  global.target = "js";
})();
(function () {
  var _g640 = nexus.runtime;
  var split = _g640.split;
  var reverse = _g640.reverse;
  var some63 = _g640["some?"];
  var exit = _g640.exit;
  var boolean63 = _g640["boolean?"];
  var unstash = _g640.unstash;
  var _62 = _g640[">"];
  var _60 = _g640["<"];
  var _61 = _g640["="];
  var pairwise = _g640.pairwise;
  var setenv = _g640.setenv;
  var module = _g640.module;
  var add = _g640.add;
  var composite63 = _g640["composite?"];
  var _37message_handler = _g640["%message-handler"];
  var apply = _g640.apply;
  var toplevel63 = _g640["toplevel?"];
  var replicate = _g640.replicate;
  var inner = _g640.inner;
  var map = _g640.map;
  var id_literal63 = _g640["id-literal?"];
  var string_literal63 = _g640["string-literal?"];
  var none63 = _g640["none?"];
  var parse_number = _g640["parse-number"];
  var code = _g640.code;
  var tl = _g640.tl;
  var is63 = _g640["is?"];
  var empty63 = _g640["empty?"];
  var last = _g640.last;
  var hd = _g640.hd;
  var sublist = _g640.sublist;
  var module_key = _g640["module-key"];
  var string63 = _g640["string?"];
  var make_id = _g640["make-id"];
  var exclude = _g640.exclude;
  var search = _g640.search;
  var number63 = _g640["number?"];
  var length = _g640.length;
  var keys63 = _g640["keys?"];
  var drop = _g640.drop;
  var keep = _g640.keep;
  var table63 = _g640["table?"];
  var _43 = _g640["+"];
  var to_string = _g640["to-string"];
  var sub = _g640.sub;
  var write = _g640.write;
  var cat = _g640.cat;
  var substring = _g640.substring;
  var nil63 = _g640["nil?"];
  var atom63 = _g640["atom?"];
  var splice = _g640.splice;
  var read_file = _g640["read-file"];
  var _6261 = _g640[">="];
  var extend = _g640.extend;
  var write_file = _g640["write-file"];
  var list63 = _g640["list?"];
  var char = _g640.char;
  var iterate = _g640.iterate;
  var function63 = _g640["function?"];
  var _37 = _g640["%"];
  var _42 = _g640["*"];
  var reduce = _g640.reduce;
  var find = _g640.find;
  var _6061 = _g640["<="];
  var stash = _g640.stash;
  var _47 = _g640["/"];
  var join = _g640.join;
  var _ = _g640["-"];
  var _g641 = nexus.utilities;
  var special_form63 = _g641["special-form?"];
  var bound63 = _g641["bound?"];
  var macroexpand = _g641.macroexpand;
  var indentation = _g641.indentation;
  var valid_id63 = _g641["valid-id?"];
  var initial_environment = _g641["initial-environment"];
  var statement63 = _g641["statement?"];
  var variable63 = _g641["variable?"];
  var imported = _g641.imported;
  var quote_modules = _g641["quote-modules"];
  var macro_function = _g641["macro-function"];
  var getenv = _g641.getenv;
  var symbol63 = _g641["symbol?"];
  var special63 = _g641["special?"];
  var exported = _g641.exported;
  var toplevel63 = _g641["toplevel?"];
  var mapo = _g641.mapo;
  var bind = _g641.bind;
  var reserved63 = _g641["reserved?"];
  var symbol_expansion = _g641["symbol-expansion"];
  var quote_environment = _g641["quote-environment"];
  var quoted = _g641.quoted;
  var quasiexpand = _g641.quasiexpand;
  var macro63 = _g641["macro?"];
  var to_id = _g641["to-id"];
  var stash42 = _g641["stash*"];
  var bind42 = _g641["bind*"];
  var _g644 = nexus.compiler;
  var lower = _g644.lower;
  var load_module = _g644["load-module"];
  var open_module = _g644["open-module"];
  var in_module = _g644["in-module"];
  var compile_module = _g644["compile-module"];
  var eval = _g644.eval;
  var compile = _g644.compile;
  var compile_function = _g644["compile-function"];
  global.modules = {reader: {import: ["runtime", "special", "core"], export: {"read-all": {variable: true, export: true}, "make-stream": {variable: true, export: true}, delimiters: {variable: true}, "read-table": {variable: true, export: true}, "read-from-string": {variable: true, export: true}, "key?": {variable: true}, "define-reader": {macro: function (_g657) {
    var char = _g657[0];
    var stream = _g657[1];
    var body = unstash(sublist(arguments, 1));
    var _g658 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g658)]);
  }, export: true}, whitespace: {variable: true}, eof: {variable: true}, "skip-non-code": {variable: true}, "read-char": {variable: true}, "peek-char": {variable: true}, read: {variable: true, export: true}, "flag?": {variable: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g659 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g660 = join(["do"], macroexpand(_g659));
    drop(environment);
    return(_g660);
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g661 = sub(body, 0);
    var imports = [];
    var exp = _g661.export;
    var imp = _g661.import;
    var _g662 = (imp || []);
    var _g663 = 0;
    while ((_g663 < length(_g662))) {
      var k = _g662[_g663];
      load_module(k);
      imports = join(imports, imported(k));
      _g663 = (_g663 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g664 = (exp || []);
    var _g665 = 0;
    while ((_g665 < length(_g664))) {
      var k = _g664[_g665];
      setenv(k, {_stash: true, export: true});
      _g665 = (_g665 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g357, x) {
      return(x);
    }, body)));
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g666 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g667 = ["table"];
    _g667._scope = scope;
    return(["do", ["add", "environment", _g667], ["let", [x, join(["do"], _g666)], ["drop", "environment"], x]]);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g668 = sub(body, 0);
    var form = join(["fn", args], _g668);
    var keys = sub(_g668, length(_g668));
    var _g669 = ["setenv", ["quote", name]];
    _g669.form = ["quote", form];
    _g669.special = form;
    eval(join(_g669, keys));
    return(undefined);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g670 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g670)]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g671 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g671)]);
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g672 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g672)]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, at: {macro: function (l, i) {
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
      var _g673 = body;
      var k = undefined;
      for (k in _g673) {
        if (isNaN(parseInt(k))) {
          var v = _g673[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g674 = sub(body, 0);
    add(environment, {});
    map(function (_g676) {
      var name = _g676[0];
      var exp = _g676[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g675 = join(["do"], macroexpand(_g674));
    drop(environment);
    return(_g675);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g677 = sub(body, 0);
    var _g678 = bind42(args, _g677);
    var _g679 = _g678[0];
    var _g680 = _g678[1];
    return(join(["%function", _g679], _g680));
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g681 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g681)) {
      var _g682 = bind42(x, _g681);
      var args = _g682[0];
      var _g683 = _g682[1];
      return(join(["%global-function", name, args], _g683));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g684 = elements;
    var _g685 = 0;
    while ((_g685 < length(_g684))) {
      var e = _g684[_g685];
      l[e] = true;
      _g685 = (_g685 + 1);
    }
    return(join(["table"], l));
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g686 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g686)) {
      var _g687 = bind42(x, _g686);
      var args = _g687[0];
      var _g688 = _g687[1];
      return(join(["%local-function", name, args], _g688));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g689) {
      var a = _g689[0];
      var b = _g689[1];
      var c = sub(_g689, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g690 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g741;
    if (nil63(v)) {
      var _g742;
      if (b.i) {
        _g742 = "i";
      } else {
        _g742 = make_id();
      }
      var i = _g742;
      _g741 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g690), ["inc", i]]];
    } else {
      var _g691 = ["target"];
      _g691.lua = ["not", ["number?", k]];
      _g691.js = ["isNaN", ["parseInt", k]];
      _g741 = ["let", [k, "nil"], ["%for", t1, k, ["if", _g691, join(["let", [v, ["get", t1, k]]], _g690)]]];
    }
    return(["let", [t1, t], _g741]);
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g692 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g693) {
      var lh = _g693[0];
      var rh = _g693[1];
      var _g694 = bind(lh, rh);
      var _g695 = 0;
      while ((_g695 < length(_g694))) {
        var _g696 = _g694[_g695];
        var id = _g696[0];
        var val = _g696[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g695 = (_g695 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g692)])));
  }, export: true}, "with-bindings": {macro: function (_g697) {
    var names = _g697[0];
    var body = unstash(sublist(arguments, 1));
    var _g698 = sub(body, 0);
    var x = make_id();
    var _g700 = ["setenv", x];
    _g700.variable = true;
    var _g699 = ["with-frame", ["each", [x], names, _g700]];
    _g699.scope = true;
    return(join(_g699, _g698));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g701 = sub(body, 0);
    var form = join(["fn", args], _g701);
    var _g702 = ["setenv", ["quote", name]];
    _g702.form = ["quote", form];
    _g702.macro = form;
    eval(_g702);
    return(undefined);
  }, export: true}}}, utilities: {import: ["runtime", "special", "core"], export: {"special-form?": {variable: true, export: true}, "bound?": {variable: true, export: true}, macroexpand: {variable: true, export: true}, indentation: {variable: true, export: true}, "valid-id?": {variable: true, export: true}, "initial-environment": {variable: true, export: true}, "statement?": {variable: true, export: true}, "variable?": {variable: true, export: true}, imported: {variable: true, export: true}, "quasiquote-list": {variable: true}, "quote-modules": {variable: true, export: true}, "valid-char?": {variable: true}, "macro-function": {variable: true, export: true}, "quote-binding": {variable: true}, getenv: {variable: true, export: true}, "symbol?": {variable: true, export: true}, "special?": {variable: true, export: true}, exported: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "quote-module": {variable: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, mapo: {variable: true, export: true}, bind: {variable: true, export: true}, "indent-level": {global: true, export: true}, "reserved?": {variable: true, export: true}, reserved: {variable: true}, "symbol-expansion": {variable: true, export: true}, "quote-environment": {variable: true, export: true}, "quasiquoting?": {variable: true}, "numeric?": {variable: true}, "quasisplice?": {variable: true}, quoted: {variable: true, export: true}, "can-unquote?": {variable: true}, "quoting?": {variable: true}, escape: {variable: true}, quasiexpand: {variable: true, export: true}, "macro?": {variable: true, export: true}, "quote-frame": {variable: true}, "to-id": {variable: true, export: true}, "stash*": {variable: true, export: true}, "global?": {variable: true}, "bind*": {variable: true, export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%for": {tr: true, special: function (_g703) {
    var t = _g703[0];
    var k = _g703[1];
    var form = _g703[2];
    var _g704 = compile(t);
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g705 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g705;
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g704 + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g704 + ") {\n" + body + ind + "}\n"));
    }
  }, export: true, stmt: true}, "break": {special: function (_g147) {
    return((indentation() + "break"));
  }, export: true, stmt: true}, "%array": {export: true, special: function (forms) {
    var _g743;
    if ((target === "lua")) {
      _g743 = "{";
    } else {
      _g743 = "[";
    }
    var open = _g743;
    var _g744;
    if ((target === "lua")) {
      _g744 = "}";
    } else {
      _g744 = "]";
    }
    var close = _g744;
    var str = "";
    var _g706 = forms;
    var i = 0;
    while ((i < length(_g706))) {
      var x = _g706[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "%function": {export: true, special: function (_g707) {
    var args = _g707[0];
    var body = _g707[1];
    return(compile_function(args, body));
  }}, "get": {export: true, special: function (_g708) {
    var t = _g708[0];
    var k = _g708[1];
    var _g709 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g709, 0) === "{"))) {
      _g709 = ("(" + _g709 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g709 + "." + inner(k)));
    } else {
      return((_g709 + "[" + k1 + "]"));
    }
  }}, "%global-function": {tr: true, special: function (_g710) {
    var name = _g710[0];
    var args = _g710[1];
    var body = _g710[2];
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, export: true, stmt: true}, "not": {export: true, special: function (_g711) {
    var x = _g711[0];
    var _g712 = compile(x);
    var _g745;
    if ((target === "js")) {
      _g745 = "!(";
    } else {
      _g745 = "(not ";
    }
    var open = _g745;
    return((open + _g712 + ")"));
  }}, "return": {special: function (_g713) {
    var x = _g713[0];
    var _g746;
    if (nil63(x)) {
      _g746 = "return";
    } else {
      _g746 = ("return(" + compile(x) + ")");
    }
    var _g714 = _g746;
    return((indentation() + _g714));
  }, export: true, stmt: true}, "%if": {tr: true, special: function (_g715, tail63) {
    var cond = _g715[0];
    var _g716 = _g715[1];
    var _g717 = _g715[2];
    var _g718 = compile(cond);
    indent_level = (indent_level + 1);
    var _g721 = compile(_g716, {_stash: true, tail: tail63, stmt: true});
    indent_level = (indent_level - 1);
    var _g719 = _g721;
    var _g747;
    if (_g717) {
      indent_level = (indent_level + 1);
      var _g722 = compile(_g717, {_stash: true, tail: tail63, stmt: true});
      indent_level = (indent_level - 1);
      _g747 = _g722;
    }
    var _g720 = _g747;
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g718 + ") {\n" + _g719 + ind + "}");
    } else {
      str = (str + ind + "if " + _g718 + " then\n" + _g719);
    }
    if ((_g720 && (target === "js"))) {
      str = (str + " else {\n" + _g720 + ind + "}");
    } else {
      if (_g720) {
        str = (str + ind + "else\n" + _g720);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, export: true, stmt: true}, "while": {tr: true, special: function (_g723) {
    var condition = _g723[0];
    var form = _g723[1];
    var _g724 = compile(condition);
    indent_level = (indent_level + 1);
    var _g725 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g725;
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g724 + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + _g724 + " do\n" + body + ind + "end\n"));
    }
  }, export: true, stmt: true}, "%local-function": {tr: true, special: function (_g726) {
    var name = _g726[0];
    var args = _g726[1];
    var body = _g726[2];
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, export: true, stmt: true}, "set": {special: function (_g727) {
    var lh = _g727[0];
    var rh = _g727[1];
    var _g728 = compile(lh);
    var _g748;
    if (nil63(rh)) {
      _g748 = "nil";
    } else {
      _g748 = rh;
    }
    var _g729 = compile(_g748);
    return((indentation() + _g728 + " = " + _g729));
  }, export: true, stmt: true}, "%try": {tr: true, special: function (_g730) {
    var form = _g730[0];
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g731 = compile(form, {_stash: true, tail: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g731;
    var e = make_id();
    var handler = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = (indent_level + 1);
    var _g732 = compile(handler, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var h = _g732;
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, export: true, stmt: true}, "%local": {special: function (_g733) {
    var name = _g733[0];
    var value = _g733[1];
    var id = compile(name);
    var value1 = compile(value);
    var _g749;
    if (is63(value)) {
      _g749 = (" = " + value1);
    } else {
      _g749 = "";
    }
    var rh = _g749;
    var _g750;
    if ((target === "js")) {
      _g750 = "var ";
    } else {
      _g750 = "local ";
    }
    var keyword = _g750;
    var ind = indentation();
    return((ind + keyword + id + rh));
  }, export: true, stmt: true}, "%object": {export: true, special: function (forms) {
    var str = "{";
    var _g751;
    if ((target === "lua")) {
      _g751 = " = ";
    } else {
      _g751 = ": ";
    }
    var sep = _g751;
    var pairs = pairwise(forms);
    var _g734 = pairs;
    var i = 0;
    while ((i < length(_g734))) {
      var _g735 = _g734[i];
      var k = _g735[0];
      var v = _g735[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g736 = compile(v);
      var _g752;
      if (valid_id63(k)) {
        _g752 = k;
      } else {
        var _g753;
        if (((target === "js") && string_literal63(k))) {
          _g753 = k;
        } else {
          var _g754;
          if ((target === "js")) {
            _g754 = quoted(k);
          } else {
            var _g755;
            if (string_literal63(k)) {
              _g755 = ("[" + k + "]");
            } else {
              _g755 = ("[" + quoted(k) + "]");
            }
            _g754 = _g755;
          }
          _g753 = _g754;
        }
        _g752 = _g753;
      }
      var _g737 = _g752;
      str = (str + _g737 + sep + _g736);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "do": {tr: true, special: function (forms, tail63) {
    var str = "";
    var _g738 = forms;
    var i = 0;
    while ((i < length(_g738))) {
      var x = _g738[i];
      var t63 = (tail63 && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, tail: t63, stmt: true}));
      i = (i + 1);
    }
    return(str);
  }, export: true, stmt: true}, "error": {special: function (_g739) {
    var x = _g739[0];
    var _g756;
    if ((target === "js")) {
      _g756 = ("throw new " + compile(["Error", x]));
    } else {
      _g756 = ("error(" + compile(x) + ")");
    }
    var e = _g756;
    return((indentation() + e));
  }, export: true, stmt: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, runtime: {import: ["special", "core"], export: {split: {variable: true, export: true}, reverse: {variable: true, export: true}, "some?": {variable: true, export: true}, exit: {variable: true, export: true}, "boolean?": {variable: true, export: true}, unstash: {variable: true, export: true}, ">": {variable: true, export: true}, "<": {variable: true, export: true}, "=": {variable: true, export: true}, pairwise: {variable: true, export: true}, setenv: {variable: true, export: true}, module: {variable: true, export: true}, "splice?": {variable: true}, add: {variable: true, export: true}, "composite?": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, apply: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, replicate: {variable: true, export: true}, inner: {variable: true, export: true}, map: {variable: true, export: true}, "id-literal?": {variable: true, export: true}, "string-literal?": {variable: true, export: true}, type: {variable: true}, "none?": {variable: true, export: true}, "parse-number": {variable: true, export: true}, code: {variable: true, export: true}, tl: {variable: true, export: true}, "is?": {variable: true, export: true}, fs: {variable: true}, "id-count": {variable: true}, "empty?": {variable: true, export: true}, print: {global: true, export: true}, require: {global: true, export: true}, last: {variable: true, export: true}, hd: {variable: true, export: true}, sublist: {variable: true, export: true}, "module-key": {variable: true, export: true}, "string?": {variable: true, export: true}, "make-id": {variable: true, export: true}, exclude: {variable: true, export: true}, mapl: {variable: true}, search: {variable: true, export: true}, "number?": {variable: true, export: true}, length: {variable: true, export: true}, "keys?": {variable: true, export: true}, drop: {variable: true, export: true}, keep: {variable: true, export: true}, "table?": {variable: true, export: true}, "+": {variable: true, export: true}, "to-string": {variable: true, export: true}, sub: {variable: true, export: true}, write: {variable: true, export: true}, cat: {variable: true, export: true}, substring: {variable: true, export: true}, "nil?": {variable: true, export: true}, "atom?": {variable: true, export: true}, splice: {variable: true, export: true}, "read-file": {variable: true, export: true}, ">=": {variable: true, export: true}, extend: {variable: true, export: true}, "write-file": {variable: true, export: true}, "list?": {variable: true, export: true}, char: {variable: true, export: true}, iterate: {variable: true, export: true}, "function?": {variable: true, export: true}, "%": {variable: true, export: true}, "*": {variable: true, export: true}, reduce: {variable: true, export: true}, find: {variable: true, export: true}, "<=": {variable: true, export: true}, stash: {variable: true, export: true}, "/": {variable: true, export: true}, join: {variable: true, export: true}, "-": {variable: true, export: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"module-path": {variable: true}, lower: {global: true, export: true, variable: true}, "%compile-module": {variable: true}, "load-module": {variable: true, export: true}, "open-module": {variable: true, export: true}, "in-module": {variable: true, export: true}, "lower-definition": {variable: true}, "current-module": {global: true, export: true}, "lower-if": {variable: true}, "lower-do": {variable: true}, "compiler-output": {variable: true}, "lower-for": {variable: true}, "lower-statement": {variable: true}, "compile-module": {variable: true, export: true}, "compile-call": {variable: true}, "infix?": {variable: true}, eval: {variable: true, export: true}, "lower-function": {variable: true}, "lower-call": {variable: true}, run: {variable: true}, "compile-file": {variable: true}, "can-return?": {variable: true}, "compile-args": {variable: true}, "lower-while": {variable: true}, "compile-atom": {variable: true}, prologue: {variable: true}, "compiling?": {variable: true}, compile: {variable: true, export: true}, getop: {variable: true}, infix: {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, encapsulate: {variable: true}, process: {variable: true}, "compile-infix": {variable: true}, "lower-special": {variable: true}, "compile-function": {variable: true, export: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g740 = sub(specs, 0);
    map(compile_module, _g740);
    return(undefined);
  }}}}, lib: {import: ["core", "special"], export: {}}, optimizer: {import: ["runtime", "special", "core"], export: {optimizations: {variable: true}, optimize: {variable: true, export: true}, "define-optimization": {}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g757 = sub(body, 0);
    var imports = [];
    var exp = _g757.export;
    var imp = _g757.import;
    var _g758 = (imp || []);
    var _g759 = 0;
    while ((_g759 < length(_g758))) {
      var k = _g758[_g759];
      load_module(k);
      imports = join(imports, imported(k));
      _g759 = (_g759 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g760 = (exp || []);
    var _g761 = 0;
    while ((_g761 < length(_g760))) {
      var k = _g760[_g761];
      setenv(k, {_stash: true, export: true});
      _g761 = (_g761 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var split = _g2.split;
  var reverse = _g2.reverse;
  var some63 = _g2["some?"];
  var exit = _g2.exit;
  var boolean63 = _g2["boolean?"];
  var keep = _g2.keep;
  var _62 = _g2[">"];
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var pairwise = _g2.pairwise;
  var setenv = _g2.setenv;
  var module = _g2.module;
  var add = _g2.add;
  var composite63 = _g2["composite?"];
  var _37message_handler = _g2["%message-handler"];
  var apply = _g2.apply;
  var toplevel63 = _g2["toplevel?"];
  var replicate = _g2.replicate;
  var inner = _g2.inner;
  var map = _g2.map;
  var id_literal63 = _g2["id-literal?"];
  var string_literal63 = _g2["string-literal?"];
  var none63 = _g2["none?"];
  var string63 = _g2["string?"];
  var code = _g2.code;
  var tl = _g2.tl;
  var is63 = _g2["is?"];
  var empty63 = _g2["empty?"];
  var parse_number = _g2["parse-number"];
  var hd = _g2.hd;
  var list63 = _g2["list?"];
  var module_key = _g2["module-key"];
  var make_id = _g2["make-id"];
  var to_string = _g2["to-string"];
  var exclude = _g2.exclude;
  var search = _g2.search;
  var number63 = _g2["number?"];
  var length = _g2.length;
  var keys63 = _g2["keys?"];
  var drop = _g2.drop;
  var write = _g2.write;
  var table63 = _g2["table?"];
  var splice = _g2.splice;
  var read_file = _g2["read-file"];
  var sub = _g2.sub;
  var join = _g2.join;
  var cat = _g2.cat;
  var _6261 = _g2[">="];
  var nil63 = _g2["nil?"];
  var atom63 = _g2["atom?"];
  var char = _g2.char;
  var stash = _g2.stash;
  var sublist = _g2.sublist;
  var extend = _g2.extend;
  var write_file = _g2["write-file"];
  var function63 = _g2["function?"];
  var _43 = _g2["+"];
  var iterate = _g2.iterate;
  var unstash = _g2.unstash;
  var _37 = _g2["%"];
  var _42 = _g2["*"];
  var reduce = _g2.reduce;
  var find = _g2.find;
  var _6061 = _g2["<="];
  var last = _g2.last;
  var _47 = _g2["/"];
  var substring = _g2.substring;
  var _ = _g2["-"];
  var _g5 = nexus.reader;
  var read_all = _g5["read-all"];
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var read = _g5.read;
  var _g6 = nexus.compiler;
  var lower = _g6.lower;
  var load_module = _g6["load-module"];
  var open_module = _g6["open-module"];
  var in_module = _g6["in-module"];
  var compile_function = _g6["compile-function"];
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  var compile = _g6.compile;
  function rep(str) {
    var _g763 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g766) {
        return([false, _g766.message]);
      }
    })();
    var _g1 = _g763[0];
    var x = _g763[1];
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
    var _g764 = args;
    var i = 0;
    while ((i < length(_g764))) {
      var arg = _g764[i];
      if (((arg === "-o") || (arg === "-t") || (arg === "-e"))) {
        if ((i === (length(args) - 1))) {
          print((to_string("missing argument for") + " " + to_string(arg) + " "));
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
  var _g765 = {};
  nexus.main = _g765;
  _g765.usage = usage;
  _g765.main = main;
  _g765.repl = repl;
  _g765.rep = rep;
})();
