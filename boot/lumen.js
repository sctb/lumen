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
    return({value: x, _splice: true});
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
  _g51.pairwise = pairwise;
  _g51["boolean?"] = boolean63;
  _g51["splice?"] = splice63;
  _g51.reverse = reverse;
  _g51["composite?"] = composite63;
  _g51["table?"] = table63;
  _g51.module = module;
  _g51.iterate = iterate;
  _g51.code = code;
  _g51.char = char;
  _g51["*"] = _42;
  _g51.cat = cat;
  _g51["/"] = _47;
  _g51["-"] = _;
  _g51.apply = apply;
  _g51["toplevel?"] = toplevel63;
  _g51.length = length;
  _g51.stash = stash;
  _g51["parse-number"] = parse_number;
  _g51["string?"] = string63;
  _g51["<="] = _6061;
  _g51[">"] = _62;
  _g51["="] = _61;
  _g51.split = split;
  _g51["nil?"] = nil63;
  _g51["none?"] = none63;
  _g51.unstash = unstash;
  _g51.extend = extend;
  _g51["read-file"] = read_file;
  _g51["module-key"] = module_key;
  _g51["id-literal?"] = id_literal63;
  _g51["%message-handler"] = _37message_handler;
  _g51["list?"] = list63;
  _g51.inner = inner;
  _g51.fs = fs;
  _g51.keep = keep;
  _g51.last = last;
  _g51.type = type;
  _g51["id-count"] = id_count;
  _g51["%"] = _37;
  _g51.setenv = setenv;
  _g51["make-id"] = make_id;
  _g51.tl = tl;
  _g51.reduce = reduce;
  _g51["to-string"] = to_string;
  _g51.splice = splice;
  _g51["is?"] = is63;
  _g51.write = write;
  _g51.exit = exit;
  _g51["number?"] = number63;
  _g51.join = join;
  _g51.find = find;
  _g51["keys?"] = keys63;
  _g51.replicate = replicate;
  _g51["empty?"] = empty63;
  _g51["atom?"] = atom63;
  _g51.map = map;
  _g51.mapl = mapl;
  _g51.substring = substring;
  _g51[">="] = _6261;
  _g51["<"] = _60;
  _g51.hd = hd;
  _g51.drop = drop;
  _g51.exclude = exclude;
  _g51["function?"] = function63;
  _g51["write-file"] = write_file;
  _g51.sub = sub;
  _g51["+"] = _43;
  _g51.search = search;
  _g51["some?"] = some63;
  _g51["string-literal?"] = string_literal63;
  _g51.add = add;
  _g51.sublist = sublist;
})();
(function () {
  var _g56 = nexus.runtime;
  var pairwise = _g56.pairwise;
  var boolean63 = _g56["boolean?"];
  var reverse = _g56.reverse;
  var composite63 = _g56["composite?"];
  var table63 = _g56["table?"];
  var module = _g56.module;
  var iterate = _g56.iterate;
  var code = _g56.code;
  var char = _g56.char;
  var _42 = _g56["*"];
  var cat = _g56.cat;
  var _47 = _g56["/"];
  var _ = _g56["-"];
  var apply = _g56.apply;
  var toplevel63 = _g56["toplevel?"];
  var length = _g56.length;
  var stash = _g56.stash;
  var parse_number = _g56["parse-number"];
  var string63 = _g56["string?"];
  var _6061 = _g56["<="];
  var _62 = _g56[">"];
  var _61 = _g56["="];
  var split = _g56.split;
  var nil63 = _g56["nil?"];
  var none63 = _g56["none?"];
  var unstash = _g56.unstash;
  var extend = _g56.extend;
  var read_file = _g56["read-file"];
  var module_key = _g56["module-key"];
  var id_literal63 = _g56["id-literal?"];
  var _37message_handler = _g56["%message-handler"];
  var list63 = _g56["list?"];
  var inner = _g56.inner;
  var keep = _g56.keep;
  var last = _g56.last;
  var _37 = _g56["%"];
  var setenv = _g56.setenv;
  var make_id = _g56["make-id"];
  var tl = _g56.tl;
  var reduce = _g56.reduce;
  var to_string = _g56["to-string"];
  var splice = _g56.splice;
  var is63 = _g56["is?"];
  var write = _g56.write;
  var exit = _g56.exit;
  var number63 = _g56["number?"];
  var join = _g56.join;
  var find = _g56.find;
  var keys63 = _g56["keys?"];
  var replicate = _g56.replicate;
  var empty63 = _g56["empty?"];
  var atom63 = _g56["atom?"];
  var map = _g56.map;
  var substring = _g56.substring;
  var _6261 = _g56[">="];
  var _60 = _g56["<"];
  var hd = _g56.hd;
  var drop = _g56.drop;
  var exclude = _g56.exclude;
  var function63 = _g56["function?"];
  var write_file = _g56["write-file"];
  var sub = _g56.sub;
  var _43 = _g56["+"];
  var search = _g56.search;
  var some63 = _g56["some?"];
  var string_literal63 = _g56["string-literal?"];
  var add = _g56.add;
  var sublist = _g56.sublist;
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
  var reserved = {"in": true, "with": true, "default": true, "debugger": true, "finally": true, "continue": true, "else": true, "instanceof": true, "if": true, "==": true, "elseif": true, "case": true, "nil": true, "while": true, "this": true, "void": true, "true": true, "<": true, "or": true, "return": true, "function": true, "*": true, "repeat": true, "local": true, "%": true, "switch": true, "<=": true, "try": true, "not": true, "then": true, "break": true, ">=": true, "false": true, "do": true, "new": true, "typeof": true, "and": true, "var": true, "delete": true, "until": true, "catch": true, "=": true, "end": true, ">": true, "/": true, "-": true, "for": true, "+": true, "throw": true};
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
  _g98["variable?"] = variable63;
  _g98["bind*"] = bind42;
  _g98["can-unquote?"] = can_unquote63;
  _g98["quote-environment"] = quote_environment;
  _g98["to-id"] = to_id;
  _g98["numeric?"] = numeric63;
  _g98["symbol?"] = symbol63;
  _g98["quote-module"] = quote_module;
  _g98.getenv = getenv;
  _g98["bound?"] = bound63;
  _g98["special-form?"] = special_form63;
  _g98.imported = imported;
  _g98["reserved?"] = reserved63;
  _g98.quasiexpand = quasiexpand;
  _g98.escape = escape;
  _g98.quoted = quoted;
  _g98["quote-frame"] = quote_frame;
  _g98["macro?"] = macro63;
  _g98.exported = exported;
  _g98["valid-id?"] = valid_id63;
  _g98["quote-binding"] = quote_binding;
  _g98["statement?"] = statement63;
  _g98["valid-char?"] = valid_char63;
  _g98.bind = bind;
  _g98.reserved = reserved;
  _g98["quasisplice?"] = quasisplice63;
  _g98["quoting?"] = quoting63;
  _g98["quasiquote-list"] = quasiquote_list;
  _g98["global?"] = global63;
  _g98["quasiquoting?"] = quasiquoting63;
  _g98["initial-environment"] = initial_environment;
  _g98["symbol-expansion"] = symbol_expansion;
  _g98["quote-modules"] = quote_modules;
  _g98["special?"] = special63;
  _g98.macroexpand = macroexpand;
  _g98["toplevel?"] = toplevel63;
  _g98["stash*"] = stash42;
  _g98.mapo = mapo;
  _g98["macro-function"] = macro_function;
  _g98.indentation = indentation;
})();
(function () {
  var _g99 = nexus.runtime;
  var pairwise = _g99.pairwise;
  var boolean63 = _g99["boolean?"];
  var reverse = _g99.reverse;
  var composite63 = _g99["composite?"];
  var table63 = _g99["table?"];
  var module = _g99.module;
  var iterate = _g99.iterate;
  var code = _g99.code;
  var char = _g99.char;
  var _42 = _g99["*"];
  var cat = _g99.cat;
  var _47 = _g99["/"];
  var _ = _g99["-"];
  var apply = _g99.apply;
  var toplevel63 = _g99["toplevel?"];
  var length = _g99.length;
  var stash = _g99.stash;
  var parse_number = _g99["parse-number"];
  var string63 = _g99["string?"];
  var _6061 = _g99["<="];
  var _62 = _g99[">"];
  var _61 = _g99["="];
  var split = _g99.split;
  var nil63 = _g99["nil?"];
  var none63 = _g99["none?"];
  var unstash = _g99.unstash;
  var extend = _g99.extend;
  var read_file = _g99["read-file"];
  var module_key = _g99["module-key"];
  var id_literal63 = _g99["id-literal?"];
  var _37message_handler = _g99["%message-handler"];
  var list63 = _g99["list?"];
  var inner = _g99.inner;
  var keep = _g99.keep;
  var last = _g99.last;
  var _37 = _g99["%"];
  var setenv = _g99.setenv;
  var make_id = _g99["make-id"];
  var tl = _g99.tl;
  var reduce = _g99.reduce;
  var to_string = _g99["to-string"];
  var splice = _g99.splice;
  var is63 = _g99["is?"];
  var write = _g99.write;
  var exit = _g99.exit;
  var number63 = _g99["number?"];
  var join = _g99.join;
  var find = _g99.find;
  var keys63 = _g99["keys?"];
  var replicate = _g99.replicate;
  var empty63 = _g99["empty?"];
  var atom63 = _g99["atom?"];
  var map = _g99.map;
  var substring = _g99.substring;
  var _6261 = _g99[">="];
  var _60 = _g99["<"];
  var hd = _g99.hd;
  var drop = _g99.drop;
  var exclude = _g99.exclude;
  var function63 = _g99["function?"];
  var write_file = _g99["write-file"];
  var sub = _g99.sub;
  var _43 = _g99["+"];
  var search = _g99.search;
  var some63 = _g99["some?"];
  var string_literal63 = _g99["string-literal?"];
  var add = _g99.add;
  var sublist = _g99.sublist;
  var delimiters = {"\n": true, ";": true, "(": true, ")": true};
  var whitespace = {" ": true, "\n": true, "\t": true};
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
  _g110.whitespace = whitespace;
  _g110["skip-non-code"] = skip_non_code;
  _g110.delimiters = delimiters;
  _g110.read = read;
  _g110["key?"] = key63;
  _g110["read-table"] = read_table;
  _g110["make-stream"] = make_stream;
  _g110["peek-char"] = peek_char;
  _g110["read-char"] = read_char;
  _g110["read-all"] = read_all;
  _g110.eof = eof;
  _g110["flag?"] = flag63;
  _g110["read-from-string"] = read_from_string;
})();
(function () {
  var _g111 = nexus.runtime;
  var pairwise = _g111.pairwise;
  var boolean63 = _g111["boolean?"];
  var reverse = _g111.reverse;
  var composite63 = _g111["composite?"];
  var table63 = _g111["table?"];
  var module = _g111.module;
  var iterate = _g111.iterate;
  var code = _g111.code;
  var char = _g111.char;
  var _42 = _g111["*"];
  var cat = _g111.cat;
  var _47 = _g111["/"];
  var _ = _g111["-"];
  var apply = _g111.apply;
  var toplevel63 = _g111["toplevel?"];
  var length = _g111.length;
  var stash = _g111.stash;
  var parse_number = _g111["parse-number"];
  var string63 = _g111["string?"];
  var _6061 = _g111["<="];
  var _62 = _g111[">"];
  var _61 = _g111["="];
  var split = _g111.split;
  var nil63 = _g111["nil?"];
  var none63 = _g111["none?"];
  var unstash = _g111.unstash;
  var extend = _g111.extend;
  var read_file = _g111["read-file"];
  var module_key = _g111["module-key"];
  var id_literal63 = _g111["id-literal?"];
  var _37message_handler = _g111["%message-handler"];
  var list63 = _g111["list?"];
  var inner = _g111.inner;
  var keep = _g111.keep;
  var last = _g111.last;
  var _37 = _g111["%"];
  var setenv = _g111.setenv;
  var make_id = _g111["make-id"];
  var tl = _g111.tl;
  var reduce = _g111.reduce;
  var to_string = _g111["to-string"];
  var splice = _g111.splice;
  var is63 = _g111["is?"];
  var write = _g111.write;
  var exit = _g111.exit;
  var number63 = _g111["number?"];
  var join = _g111.join;
  var find = _g111.find;
  var keys63 = _g111["keys?"];
  var replicate = _g111.replicate;
  var empty63 = _g111["empty?"];
  var atom63 = _g111["atom?"];
  var map = _g111.map;
  var substring = _g111.substring;
  var _6261 = _g111[">="];
  var _60 = _g111["<"];
  var hd = _g111.hd;
  var drop = _g111.drop;
  var exclude = _g111.exclude;
  var function63 = _g111["function?"];
  var write_file = _g111["write-file"];
  var sub = _g111.sub;
  var _43 = _g111["+"];
  var search = _g111.search;
  var some63 = _g111["some?"];
  var string_literal63 = _g111["string-literal?"];
  var add = _g111.add;
  var sublist = _g111.sublist;
  var _g112 = nexus.utilities;
  var variable63 = _g112["variable?"];
  var bind42 = _g112["bind*"];
  var quote_environment = _g112["quote-environment"];
  var to_id = _g112["to-id"];
  var symbol63 = _g112["symbol?"];
  var getenv = _g112.getenv;
  var bound63 = _g112["bound?"];
  var special_form63 = _g112["special-form?"];
  var imported = _g112.imported;
  var reserved63 = _g112["reserved?"];
  var quasiexpand = _g112.quasiexpand;
  var quoted = _g112.quoted;
  var macro63 = _g112["macro?"];
  var exported = _g112.exported;
  var valid_id63 = _g112["valid-id?"];
  var statement63 = _g112["statement?"];
  var bind = _g112.bind;
  var initial_environment = _g112["initial-environment"];
  var symbol_expansion = _g112["symbol-expansion"];
  var quote_modules = _g112["quote-modules"];
  var special63 = _g112["special?"];
  var macroexpand = _g112.macroexpand;
  var toplevel63 = _g112["toplevel?"];
  var stash42 = _g112["stash*"];
  var mapo = _g112.mapo;
  var macro_function = _g112["macro-function"];
  var indentation = _g112.indentation;
  var _g115 = nexus.reader;
  var read = _g115.read;
  var read_table = _g115["read-table"];
  var make_stream = _g115["make-stream"];
  var read_all = _g115["read-all"];
  var read_from_string = _g115["read-from-string"];
  var infix = {common: {"+": true, "*": true, "/": true, ">": true, "-": true, "<": true, "<=": true, "%": true, ">=": true}, js: {cat: "+", "or": "||", "~=": "!=", "=": "===", "and": "&&"}, lua: {cat: "..", "or": true, "~=": true, "=": "==", "and": true}};
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
  function compile_body(forms) {
    var _g117 = unstash(sublist(arguments, 1));
    var tail = _g117.tail;
    var str = "";
    var _g118 = forms;
    var i = 0;
    while ((i < length(_g118))) {
      var x = _g118[i];
      var t63 = (tail && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, stmt: true, tail: t63}));
      i = (i + 1);
    }
    return(str);
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
    var _g119 = getenv(hd(form));
    var self_tr63 = _g119.tr;
    var stmt = _g119.stmt;
    var special = _g119.special;
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
  function compile_infix(_g120) {
    var op = _g120[0];
    var args = sub(_g120, 1);
    var str = "(";
    var _g121 = getop(op);
    var _g122 = args;
    var i = 0;
    while ((i < length(_g122))) {
      var arg = _g122[i];
      if (((_g121 === "-") && (length(args) === 1))) {
        str = (str + _g121 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g121 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g123 = unstash(sublist(arguments, 2));
    var name = _g123.name;
    var prefix = _g123.prefix;
    var _g128;
    if (name) {
      _g128 = compile(name);
    } else {
      _g128 = "";
    }
    var id = _g128;
    var _g124 = (prefix || "");
    var _g125 = compile_args(args);
    indent_level = (indent_level + 1);
    var _g127 = compile(body, {_stash: true, stmt: true, tail: true});
    indent_level = (indent_level - 1);
    var _g126 = _g127;
    var ind = indentation();
    var _g129;
    if ((target === "js")) {
      _g129 = "";
    } else {
      _g129 = "end";
    }
    var tr = _g129;
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g125 + " {\n" + _g126 + ind + "}" + tr));
    } else {
      return((_g124 + "function " + id + _g125 + "\n" + _g126 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g130 = unstash(sublist(arguments, 1));
    var stmt = _g130.stmt;
    var tail = _g130.tail;
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
        var _g132;
        if (stmt) {
          _g132 = indentation();
        } else {
          _g132 = "";
        }
        var ind = _g132;
        var _g133;
        if (atom63(form)) {
          _g133 = compile_atom(form);
        } else {
          var _g134;
          if (infix63(form)) {
            _g134 = compile_infix(form);
          } else {
            _g134 = compile_call(form);
          }
          _g133 = _g134;
        }
        var _g131 = _g133;
        return((ind + _g131 + tr));
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
    var _g135 = sub(args, 0, (length(args) - 1));
    var _g136 = 0;
    while ((_g136 < length(_g135))) {
      var x = _g135[_g136];
      add(hoist, lower(x, hoist, stmt63));
      _g136 = (_g136 + 1);
    }
    return(lower(last(args), hoist, stmt63));
  }
  function lower_if(args, hoist, stmt63) {
    var cond = args[0];
    var _g137 = args[1];
    var _g138 = args[2];
    if (stmt63) {
      var _g140;
      if (_g138) {
        _g140 = [lower(_g138)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower(_g137)], _g140)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g139;
      if (_g138) {
        _g139 = [lower(["set", e, _g138])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g137])], _g139));
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
    var _g141 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g141, lower(join(["do"], body))]));
  }
  function lower_call(form, hoist) {
    var _g142 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g142)) {
      return(_g142);
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
    var _g143 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g143, epilog))]]);
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
    var _g144 = unstash(sublist(arguments, 1));
    var all = _g144.all;
    var m = module(spec);
    var frame = last(environment);
    var _g145 = m.export;
    var k = undefined;
    for (k in _g145) {
      if (isNaN(parseInt(k))) {
        var v = _g145[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g146 = unstash(sublist(arguments, 1));
    var all = _g146.all;
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
    var _g147 = process(join(["do"], join(prologue(), [form])));
    var compiled = compile([["%function", [], _g147]]);
    target = previous;
    return(run(compiled));
  }
  var _g148 = {};
  nexus.compiler = _g148;
  _g148["compile-file"] = compile_file;
  _g148["compile-module"] = compile_module;
  _g148.infix = infix;
  _g148["lower-while"] = lower_while;
  _g148["open-module"] = open_module;
  _g148["load-module"] = load_module;
  _g148["lower-statement"] = lower_statement;
  _g148["compiler-output"] = compiler_output;
  _g148["compile-call"] = compile_call;
  _g148.process = process;
  _g148.getop = getop;
  _g148["compile-atom"] = compile_atom;
  _g148["lower-if"] = lower_if;
  _g148["lower-function"] = lower_function;
  _g148["compile-function"] = compile_function;
  _g148["in-module"] = in_module;
  _g148.lower = lower;
  _g148["lower-do"] = lower_do;
  _g148["compile-args"] = compile_args;
  _g148.prologue = prologue;
  _g148["infix?"] = infix63;
  _g148["compiling?"] = compiling63;
  _g148["compile-body"] = compile_body;
  _g148.run = run;
  _g148.encapsulate = encapsulate;
  _g148["module-path"] = module_path;
  _g148.terminator = terminator;
  _g148["lower-special"] = lower_special;
  _g148.eval = eval;
  _g148["lower-call"] = lower_call;
  _g148["can-return?"] = can_return63;
  _g148["lower-definition"] = lower_definition;
  _g148["compile-special"] = compile_special;
  _g148["compile-infix"] = compile_infix;
  _g148["%compile-module"] = _37compile_module;
  _g148.compile = compile;
  _g148["lower-for"] = lower_for;
})();
(function () {
  var _g150 = nexus.runtime;
  var pairwise = _g150.pairwise;
  var boolean63 = _g150["boolean?"];
  var reverse = _g150.reverse;
  var composite63 = _g150["composite?"];
  var table63 = _g150["table?"];
  var module = _g150.module;
  var iterate = _g150.iterate;
  var code = _g150.code;
  var char = _g150.char;
  var _42 = _g150["*"];
  var cat = _g150.cat;
  var _47 = _g150["/"];
  var _ = _g150["-"];
  var apply = _g150.apply;
  var toplevel63 = _g150["toplevel?"];
  var length = _g150.length;
  var stash = _g150.stash;
  var parse_number = _g150["parse-number"];
  var string63 = _g150["string?"];
  var _6061 = _g150["<="];
  var _62 = _g150[">"];
  var _61 = _g150["="];
  var split = _g150.split;
  var nil63 = _g150["nil?"];
  var none63 = _g150["none?"];
  var unstash = _g150.unstash;
  var extend = _g150.extend;
  var read_file = _g150["read-file"];
  var module_key = _g150["module-key"];
  var id_literal63 = _g150["id-literal?"];
  var _37message_handler = _g150["%message-handler"];
  var list63 = _g150["list?"];
  var inner = _g150.inner;
  var keep = _g150.keep;
  var last = _g150.last;
  var _37 = _g150["%"];
  var setenv = _g150.setenv;
  var make_id = _g150["make-id"];
  var tl = _g150.tl;
  var reduce = _g150.reduce;
  var to_string = _g150["to-string"];
  var splice = _g150.splice;
  var is63 = _g150["is?"];
  var write = _g150.write;
  var exit = _g150.exit;
  var number63 = _g150["number?"];
  var join = _g150.join;
  var find = _g150.find;
  var keys63 = _g150["keys?"];
  var replicate = _g150.replicate;
  var empty63 = _g150["empty?"];
  var atom63 = _g150["atom?"];
  var map = _g150.map;
  var substring = _g150.substring;
  var _6261 = _g150[">="];
  var _60 = _g150["<"];
  var hd = _g150.hd;
  var drop = _g150.drop;
  var exclude = _g150.exclude;
  var function63 = _g150["function?"];
  var write_file = _g150["write-file"];
  var sub = _g150.sub;
  var _43 = _g150["+"];
  var search = _g150.search;
  var some63 = _g150["some?"];
  var string_literal63 = _g150["string-literal?"];
  var add = _g150.add;
  var sublist = _g150.sublist;
  var _g151 = nexus.utilities;
  var variable63 = _g151["variable?"];
  var bind42 = _g151["bind*"];
  var quote_environment = _g151["quote-environment"];
  var to_id = _g151["to-id"];
  var symbol63 = _g151["symbol?"];
  var getenv = _g151.getenv;
  var bound63 = _g151["bound?"];
  var special_form63 = _g151["special-form?"];
  var imported = _g151.imported;
  var reserved63 = _g151["reserved?"];
  var quasiexpand = _g151.quasiexpand;
  var quoted = _g151.quoted;
  var macro63 = _g151["macro?"];
  var exported = _g151.exported;
  var valid_id63 = _g151["valid-id?"];
  var statement63 = _g151["statement?"];
  var bind = _g151.bind;
  var initial_environment = _g151["initial-environment"];
  var symbol_expansion = _g151["symbol-expansion"];
  var quote_modules = _g151["quote-modules"];
  var special63 = _g151["special?"];
  var macroexpand = _g151.macroexpand;
  var toplevel63 = _g151["toplevel?"];
  var stash42 = _g151["stash*"];
  var mapo = _g151.mapo;
  var macro_function = _g151["macro-function"];
  var indentation = _g151.indentation;
  var _g154 = nexus.compiler;
  var compile_module = _g154["compile-module"];
  var open_module = _g154["open-module"];
  var load_module = _g154["load-module"];
  var compile_call = _g154["compile-call"];
  var compile_function = _g154["compile-function"];
  var in_module = _g154["in-module"];
  var lower = _g154.lower;
  var compile_body = _g154["compile-body"];
  var eval = _g154.eval;
  var compile_special = _g154["compile-special"];
  var compile = _g154.compile;
})();
(function () {
  var _g357 = nexus.runtime;
  var pairwise = _g357.pairwise;
  var boolean63 = _g357["boolean?"];
  var reverse = _g357.reverse;
  var composite63 = _g357["composite?"];
  var table63 = _g357["table?"];
  var module = _g357.module;
  var iterate = _g357.iterate;
  var code = _g357.code;
  var char = _g357.char;
  var _42 = _g357["*"];
  var cat = _g357.cat;
  var _47 = _g357["/"];
  var _ = _g357["-"];
  var apply = _g357.apply;
  var toplevel63 = _g357["toplevel?"];
  var length = _g357.length;
  var stash = _g357.stash;
  var parse_number = _g357["parse-number"];
  var string63 = _g357["string?"];
  var _6061 = _g357["<="];
  var _62 = _g357[">"];
  var _61 = _g357["="];
  var split = _g357.split;
  var nil63 = _g357["nil?"];
  var none63 = _g357["none?"];
  var unstash = _g357.unstash;
  var extend = _g357.extend;
  var read_file = _g357["read-file"];
  var module_key = _g357["module-key"];
  var id_literal63 = _g357["id-literal?"];
  var _37message_handler = _g357["%message-handler"];
  var list63 = _g357["list?"];
  var inner = _g357.inner;
  var keep = _g357.keep;
  var last = _g357.last;
  var _37 = _g357["%"];
  var setenv = _g357.setenv;
  var make_id = _g357["make-id"];
  var tl = _g357.tl;
  var reduce = _g357.reduce;
  var to_string = _g357["to-string"];
  var splice = _g357.splice;
  var is63 = _g357["is?"];
  var write = _g357.write;
  var exit = _g357.exit;
  var number63 = _g357["number?"];
  var join = _g357.join;
  var find = _g357.find;
  var keys63 = _g357["keys?"];
  var replicate = _g357.replicate;
  var empty63 = _g357["empty?"];
  var atom63 = _g357["atom?"];
  var map = _g357.map;
  var substring = _g357.substring;
  var _6261 = _g357[">="];
  var _60 = _g357["<"];
  var hd = _g357.hd;
  var drop = _g357.drop;
  var exclude = _g357.exclude;
  var function63 = _g357["function?"];
  var write_file = _g357["write-file"];
  var sub = _g357.sub;
  var _43 = _g357["+"];
  var search = _g357.search;
  var some63 = _g357["some?"];
  var string_literal63 = _g357["string-literal?"];
  var add = _g357.add;
  var sublist = _g357.sublist;
  var _g358 = nexus.utilities;
  var variable63 = _g358["variable?"];
  var bind42 = _g358["bind*"];
  var quote_environment = _g358["quote-environment"];
  var to_id = _g358["to-id"];
  var symbol63 = _g358["symbol?"];
  var getenv = _g358.getenv;
  var bound63 = _g358["bound?"];
  var special_form63 = _g358["special-form?"];
  var imported = _g358.imported;
  var reserved63 = _g358["reserved?"];
  var quasiexpand = _g358.quasiexpand;
  var quoted = _g358.quoted;
  var macro63 = _g358["macro?"];
  var exported = _g358.exported;
  var valid_id63 = _g358["valid-id?"];
  var statement63 = _g358["statement?"];
  var bind = _g358.bind;
  var initial_environment = _g358["initial-environment"];
  var symbol_expansion = _g358["symbol-expansion"];
  var quote_modules = _g358["quote-modules"];
  var special63 = _g358["special?"];
  var macroexpand = _g358.macroexpand;
  var toplevel63 = _g358["toplevel?"];
  var stash42 = _g358["stash*"];
  var mapo = _g358.mapo;
  var macro_function = _g358["macro-function"];
  var indentation = _g358.indentation;
  var _g361 = nexus.compiler;
  var compile_module = _g361["compile-module"];
  var open_module = _g361["open-module"];
  var load_module = _g361["load-module"];
  var compile_call = _g361["compile-call"];
  var compile_function = _g361["compile-function"];
  var in_module = _g361["in-module"];
  var lower = _g361.lower;
  var compile_body = _g361["compile-body"];
  var eval = _g361.eval;
  var compile_special = _g361["compile-special"];
  var compile = _g361.compile;
  global.target = "js";
})();
(function () {
  var _g639 = nexus.runtime;
  var pairwise = _g639.pairwise;
  var boolean63 = _g639["boolean?"];
  var reverse = _g639.reverse;
  var composite63 = _g639["composite?"];
  var table63 = _g639["table?"];
  var module = _g639.module;
  var iterate = _g639.iterate;
  var code = _g639.code;
  var char = _g639.char;
  var _42 = _g639["*"];
  var cat = _g639.cat;
  var _47 = _g639["/"];
  var _ = _g639["-"];
  var apply = _g639.apply;
  var toplevel63 = _g639["toplevel?"];
  var length = _g639.length;
  var stash = _g639.stash;
  var parse_number = _g639["parse-number"];
  var string63 = _g639["string?"];
  var _6061 = _g639["<="];
  var _62 = _g639[">"];
  var _61 = _g639["="];
  var split = _g639.split;
  var nil63 = _g639["nil?"];
  var none63 = _g639["none?"];
  var unstash = _g639.unstash;
  var extend = _g639.extend;
  var read_file = _g639["read-file"];
  var module_key = _g639["module-key"];
  var id_literal63 = _g639["id-literal?"];
  var _37message_handler = _g639["%message-handler"];
  var list63 = _g639["list?"];
  var inner = _g639.inner;
  var keep = _g639.keep;
  var last = _g639.last;
  var _37 = _g639["%"];
  var setenv = _g639.setenv;
  var make_id = _g639["make-id"];
  var tl = _g639.tl;
  var reduce = _g639.reduce;
  var to_string = _g639["to-string"];
  var splice = _g639.splice;
  var is63 = _g639["is?"];
  var write = _g639.write;
  var exit = _g639.exit;
  var number63 = _g639["number?"];
  var join = _g639.join;
  var find = _g639.find;
  var keys63 = _g639["keys?"];
  var replicate = _g639.replicate;
  var empty63 = _g639["empty?"];
  var atom63 = _g639["atom?"];
  var map = _g639.map;
  var substring = _g639.substring;
  var _6261 = _g639[">="];
  var _60 = _g639["<"];
  var hd = _g639.hd;
  var drop = _g639.drop;
  var exclude = _g639.exclude;
  var function63 = _g639["function?"];
  var write_file = _g639["write-file"];
  var sub = _g639.sub;
  var _43 = _g639["+"];
  var search = _g639.search;
  var some63 = _g639["some?"];
  var string_literal63 = _g639["string-literal?"];
  var add = _g639.add;
  var sublist = _g639.sublist;
  var _g640 = nexus.utilities;
  var variable63 = _g640["variable?"];
  var bind42 = _g640["bind*"];
  var quote_environment = _g640["quote-environment"];
  var to_id = _g640["to-id"];
  var symbol63 = _g640["symbol?"];
  var getenv = _g640.getenv;
  var bound63 = _g640["bound?"];
  var special_form63 = _g640["special-form?"];
  var imported = _g640.imported;
  var reserved63 = _g640["reserved?"];
  var quasiexpand = _g640.quasiexpand;
  var quoted = _g640.quoted;
  var macro63 = _g640["macro?"];
  var exported = _g640.exported;
  var valid_id63 = _g640["valid-id?"];
  var statement63 = _g640["statement?"];
  var bind = _g640.bind;
  var initial_environment = _g640["initial-environment"];
  var symbol_expansion = _g640["symbol-expansion"];
  var quote_modules = _g640["quote-modules"];
  var special63 = _g640["special?"];
  var macroexpand = _g640.macroexpand;
  var toplevel63 = _g640["toplevel?"];
  var stash42 = _g640["stash*"];
  var mapo = _g640.mapo;
  var macro_function = _g640["macro-function"];
  var indentation = _g640.indentation;
  var _g643 = nexus.compiler;
  var compile_module = _g643["compile-module"];
  var open_module = _g643["open-module"];
  var load_module = _g643["load-module"];
  var compile_call = _g643["compile-call"];
  var compile_function = _g643["compile-function"];
  var in_module = _g643["in-module"];
  var lower = _g643.lower;
  var compile_body = _g643["compile-body"];
  var eval = _g643.eval;
  var compile_special = _g643["compile-special"];
  var compile = _g643.compile;
  global.modules = {lib: {import: ["core", "special"], export: {}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g656 = sub(specs, 0);
    map(compile_module, _g656);
    return(undefined);
  }}}}, utilities: {import: ["runtime", "special", "core"], export: {"variable?": {export: true, variable: true}, "bind*": {export: true, variable: true}, "can-unquote?": {variable: true}, "quote-environment": {export: true, variable: true}, "to-id": {export: true, variable: true}, "numeric?": {variable: true}, "symbol?": {export: true, variable: true}, "quote-module": {variable: true}, getenv: {export: true, variable: true}, "bound?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, imported: {export: true, variable: true}, "indent-level": {global: true, export: true}, "reserved?": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, escape: {variable: true}, quoted: {export: true, variable: true}, "quote-frame": {variable: true}, "macro?": {export: true, variable: true}, exported: {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "quote-binding": {variable: true}, "statement?": {export: true, variable: true}, "valid-char?": {variable: true}, bind: {export: true, variable: true}, reserved: {variable: true}, "quasisplice?": {variable: true}, "quoting?": {variable: true}, "quasiquote-list": {variable: true}, "global?": {variable: true}, "quasiquoting?": {variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "initial-environment": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "special?": {export: true, variable: true}, macroexpand: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "stash*": {export: true, variable: true}, mapo: {export: true, variable: true}, "macro-function": {export: true, variable: true}, indentation: {export: true, variable: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"while": {tr: true, export: true, stmt: true, special: function (_g657) {
    var condition = _g657[0];
    var form = _g657[1];
    var _g658 = compile(condition);
    indent_level = (indent_level + 1);
    var _g659 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g659;
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g658 + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + _g658 + " do\n" + body + ind + "end\n"));
    }
  }}, "not": {special: function (_g660) {
    var x = _g660[0];
    var _g661 = compile(x);
    var _g739;
    if ((target === "js")) {
      _g739 = "!(";
    } else {
      _g739 = "(not ";
    }
    var open = _g739;
    return((open + _g661 + ")"));
  }, export: true}, "set": {export: true, stmt: true, special: function (_g662) {
    var lh = _g662[0];
    var rh = _g662[1];
    var _g663 = compile(lh);
    var _g740;
    if (nil63(rh)) {
      _g740 = "nil";
    } else {
      _g740 = rh;
    }
    var _g664 = compile(_g740);
    return((indentation() + _g663 + " = " + _g664));
  }}, "%for": {tr: true, export: true, stmt: true, special: function (_g665) {
    var t = _g665[0];
    var k = _g665[1];
    var form = _g665[2];
    var _g666 = compile(t);
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g667 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g667;
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g666 + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g666 + ") {\n" + body + ind + "}\n"));
    }
  }}, "%try": {tr: true, export: true, stmt: true, special: function (_g668) {
    var form = _g668[0];
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g669 = compile(form, {_stash: true, stmt: true, tail: true});
    indent_level = (indent_level - 1);
    var body = _g669;
    var e = make_id();
    var handler = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = (indent_level + 1);
    var _g670 = compile(handler, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var h = _g670;
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "do": {tr: true, export: true, stmt: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }}, "get": {special: function (_g671) {
    var t = _g671[0];
    var k = _g671[1];
    var _g672 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g672, 0) === "{"))) {
      _g672 = ("(" + _g672 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g672 + "." + inner(k)));
    } else {
      return((_g672 + "[" + k1 + "]"));
    }
  }, export: true}, "%function": {special: function (_g673) {
    var args = _g673[0];
    var body = _g673[1];
    return(compile_function(args, body));
  }, export: true}, "error": {export: true, stmt: true, special: function (_g674) {
    var x = _g674[0];
    var _g741;
    if ((target === "js")) {
      _g741 = ("throw new " + compile(["Error", x]));
    } else {
      _g741 = compile_call(["error", x]);
    }
    var e = _g741;
    return((indentation() + e));
  }}, "%object": {special: function (forms) {
    var str = "{";
    var _g742;
    if ((target === "lua")) {
      _g742 = " = ";
    } else {
      _g742 = ": ";
    }
    var sep = _g742;
    var pairs = pairwise(forms);
    var _g675 = pairs;
    var i = 0;
    while ((i < length(_g675))) {
      var _g676 = _g675[i];
      var k = _g676[0];
      var v = _g676[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g677 = compile(v);
      var _g743;
      if (valid_id63(k)) {
        _g743 = k;
      } else {
        var _g744;
        if (((target === "js") && string_literal63(k))) {
          _g744 = k;
        } else {
          var _g745;
          if ((target === "js")) {
            _g745 = quoted(k);
          } else {
            var _g746;
            if (string_literal63(k)) {
              _g746 = ("[" + k + "]");
            } else {
              _g746 = ("[" + quoted(k) + "]");
            }
            _g745 = _g746;
          }
          _g744 = _g745;
        }
        _g743 = _g744;
      }
      var _g678 = _g743;
      str = (str + _g678 + sep + _g677);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true}, "%local": {export: true, stmt: true, special: function (_g679) {
    var name = _g679[0];
    var value = _g679[1];
    var id = compile(name);
    var value1 = compile(value);
    var _g747;
    if (is63(value)) {
      _g747 = (" = " + value1);
    } else {
      _g747 = "";
    }
    var rh = _g747;
    var _g748;
    if ((target === "js")) {
      _g748 = "var ";
    } else {
      _g748 = "local ";
    }
    var keyword = _g748;
    var ind = indentation();
    return((ind + keyword + id + rh));
  }}, "%array": {special: function (forms) {
    var _g749;
    if ((target === "lua")) {
      _g749 = "{";
    } else {
      _g749 = "[";
    }
    var open = _g749;
    var _g750;
    if ((target === "lua")) {
      _g750 = "}";
    } else {
      _g750 = "]";
    }
    var close = _g750;
    var str = "";
    var _g680 = forms;
    var i = 0;
    while ((i < length(_g680))) {
      var x = _g680[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true}, "%global-function": {tr: true, export: true, stmt: true, special: function (_g681) {
    var name = _g681[0];
    var args = _g681[1];
    var body = _g681[2];
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }}, "%if": {tr: true, export: true, stmt: true, special: function (_g682, tail63) {
    var cond = _g682[0];
    var _g683 = _g682[1];
    var _g684 = _g682[2];
    var _g685 = compile(cond);
    indent_level = (indent_level + 1);
    var _g688 = compile(_g683, {_stash: true, stmt: true, tail: tail63});
    indent_level = (indent_level - 1);
    var _g686 = _g688;
    var _g751;
    if (_g684) {
      indent_level = (indent_level + 1);
      var _g689 = compile(_g684, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      _g751 = _g689;
    }
    var _g687 = _g751;
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g685 + ") {\n" + _g686 + ind + "}");
    } else {
      str = (str + ind + "if " + _g685 + " then\n" + _g686);
    }
    if ((_g687 && (target === "js"))) {
      str = (str + " else {\n" + _g687 + ind + "}");
    } else {
      if (_g687) {
        str = (str + ind + "else\n" + _g687);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }}, "break": {export: true, stmt: true, special: function (_g149) {
    return((indentation() + "break"));
  }}, "return": {export: true, stmt: true, special: function (_g690) {
    var x = _g690[0];
    var _g752;
    if (nil63(x)) {
      _g752 = "return";
    } else {
      _g752 = compile_call(["return", x]);
    }
    var _g691 = _g752;
    return((indentation() + _g691));
  }}, "%local-function": {tr: true, export: true, stmt: true, special: function (_g692) {
    var name = _g692[0];
    var args = _g692[1];
    var body = _g692[2];
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g693 = sub(body, 0);
    var form = join(["fn", args], _g693);
    var _g694 = ["setenv", ["quote", name]];
    _g694.form = ["quote", form];
    _g694.macro = form;
    eval(_g694);
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g695 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g695)) {
      var _g696 = bind42(x, _g695);
      var args = _g696[0];
      var _g697 = _g696[1];
      return(join(["%global-function", name, args], _g697));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g698 = sub(body, 0);
    var imports = [];
    var imp = _g698.import;
    var exp = _g698.export;
    var _g699 = (imp || []);
    var _g700 = 0;
    while ((_g700 < length(_g699))) {
      var k = _g699[_g700];
      load_module(k);
      imports = join(imports, imported(k));
      _g700 = (_g700 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g701 = (exp || []);
    var _g702 = 0;
    while ((_g702 < length(_g701))) {
      var k = _g701[_g702];
      setenv(k, {_stash: true, export: true});
      _g702 = (_g702 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g703 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g704 = join(["do"], macroexpand(_g703));
    drop(environment);
    return(_g704);
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g705 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g753;
    if (nil63(v)) {
      var _g754;
      if (b.i) {
        _g754 = "i";
      } else {
        _g754 = make_id();
      }
      var i = _g754;
      _g753 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g705), ["inc", i]]];
    } else {
      var _g706 = ["target"];
      _g706.lua = ["not", ["number?", k]];
      _g706.js = ["isNaN", ["parseInt", k]];
      _g753 = ["let", [k, "nil"], ["%for", t1, k, ["if", _g706, join(["let", [v, ["get", t1, k]]], _g705)]]];
    }
    return(["let", [t1, t], _g753]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g707 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g708 = ["table"];
    _g708._scope = scope;
    return(["do", ["add", "environment", _g708], ["let", [x, join(["do"], _g707)], ["drop", "environment"], x]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g709 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g709)]);
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g710 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g711) {
      var lh = _g711[0];
      var rh = _g711[1];
      var _g712 = bind(lh, rh);
      var _g713 = 0;
      while ((_g713 < length(_g712))) {
        var _g714 = _g712[_g713];
        var id = _g714[0];
        var val = _g714[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g713 = (_g713 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g710)])));
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g715 = sub(body, 0);
    add(environment, {});
    map(function (_g717) {
      var name = _g717[0];
      var exp = _g717[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g716 = join(["do"], macroexpand(_g715));
    drop(environment);
    return(_g716);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g718 = sub(body, 0);
    var _g719 = bind42(args, _g718);
    var _g720 = _g719[0];
    var _g721 = _g719[1];
    return(join(["%function", _g720], _g721));
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g722 = elements;
    var _g723 = 0;
    while ((_g723 < length(_g722))) {
      var e = _g722[_g723];
      l[e] = true;
      _g723 = (_g723 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g724 = sub(body, 0);
    var form = join(["fn", args], _g724);
    var keys = sub(_g724, length(_g724));
    var _g725 = ["setenv", ["quote", name]];
    _g725.special = form;
    _g725.form = ["quote", form];
    eval(join(_g725, keys));
    return(undefined);
  }, export: true}, "with-bindings": {macro: function (_g726) {
    var names = _g726[0];
    var body = unstash(sublist(arguments, 1));
    var _g727 = sub(body, 0);
    var x = make_id();
    var _g729 = ["setenv", x];
    _g729.variable = true;
    var _g728 = ["with-frame", ["each", [x], names, _g729]];
    _g728.scope = true;
    return(join(_g728, _g727));
  }, export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
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
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g731) {
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
    }
    return(hd(step(branches)));
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g356, x) {
      return(x);
    }, body)));
  }, export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g732 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g732)) {
      var _g733 = bind42(x, _g732);
      var args = _g733[0];
      var _g734 = _g733[1];
      return(join(["%local-function", name, args], _g734));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g735 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g735)]);
  }, export: true}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g736 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g736)]);
  }, export: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-file": {variable: true}, "compile-module": {export: true, variable: true}, infix: {variable: true}, "lower-while": {variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "lower-statement": {variable: true}, "compiler-output": {variable: true}, "compile-call": {export: true, variable: true}, process: {variable: true}, getop: {variable: true}, "current-module": {global: true, export: true}, "compile-atom": {variable: true}, "lower-if": {variable: true}, "lower-function": {variable: true}, "compile-function": {export: true, variable: true}, "in-module": {export: true, variable: true}, lower: {global: true, variable: true, export: true}, "lower-do": {variable: true}, "compile-args": {variable: true}, prologue: {variable: true}, "infix?": {variable: true}, "compiling?": {variable: true}, "compile-body": {export: true, variable: true}, run: {variable: true}, encapsulate: {variable: true}, "module-path": {variable: true}, terminator: {variable: true}, "lower-special": {variable: true}, eval: {export: true, variable: true}, "lower-call": {variable: true}, "can-return?": {variable: true}, "lower-definition": {variable: true}, "compile-special": {export: true, variable: true}, "compile-infix": {variable: true}, "%compile-module": {variable: true}, compile: {export: true, variable: true}, "lower-for": {variable: true}}}, reader: {import: ["runtime", "special", "core"], export: {whitespace: {variable: true}, "skip-non-code": {variable: true}, delimiters: {variable: true}, read: {export: true, variable: true}, "key?": {variable: true}, "define-reader": {export: true, macro: function (_g737) {
    var char = _g737[0];
    var stream = _g737[1];
    var body = unstash(sublist(arguments, 1));
    var _g738 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g738)]);
  }}, "read-table": {export: true, variable: true}, "make-stream": {export: true, variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "read-all": {export: true, variable: true}, eof: {variable: true}, "flag?": {variable: true}, "read-from-string": {export: true, variable: true}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimize: {variable: true, export: true}, optimizations: {variable: true}, "define-optimization": {}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {global: true, export: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}}}, runtime: {import: ["special", "core"], export: {pairwise: {export: true, variable: true}, "boolean?": {export: true, variable: true}, "splice?": {variable: true}, reverse: {export: true, variable: true}, "composite?": {export: true, variable: true}, "table?": {export: true, variable: true}, require: {global: true, export: true}, module: {export: true, variable: true}, iterate: {export: true, variable: true}, code: {export: true, variable: true}, char: {export: true, variable: true}, "*": {export: true, variable: true}, cat: {export: true, variable: true}, "/": {export: true, variable: true}, "-": {export: true, variable: true}, apply: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, length: {export: true, variable: true}, stash: {export: true, variable: true}, "parse-number": {export: true, variable: true}, "string?": {export: true, variable: true}, "<=": {export: true, variable: true}, ">": {export: true, variable: true}, "=": {export: true, variable: true}, split: {export: true, variable: true}, "nil?": {export: true, variable: true}, "none?": {export: true, variable: true}, unstash: {export: true, variable: true}, extend: {export: true, variable: true}, "read-file": {export: true, variable: true}, "module-key": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "list?": {export: true, variable: true}, inner: {export: true, variable: true}, print: {global: true, export: true}, fs: {variable: true}, keep: {export: true, variable: true}, last: {export: true, variable: true}, type: {variable: true}, "id-count": {variable: true}, "%": {export: true, variable: true}, setenv: {export: true, variable: true}, "make-id": {export: true, variable: true}, tl: {export: true, variable: true}, reduce: {export: true, variable: true}, "to-string": {export: true, variable: true}, splice: {export: true, variable: true}, "is?": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, "number?": {export: true, variable: true}, join: {export: true, variable: true}, find: {export: true, variable: true}, "keys?": {export: true, variable: true}, replicate: {export: true, variable: true}, "empty?": {export: true, variable: true}, "atom?": {export: true, variable: true}, map: {export: true, variable: true}, mapl: {variable: true}, substring: {export: true, variable: true}, ">=": {export: true, variable: true}, "<": {export: true, variable: true}, hd: {export: true, variable: true}, drop: {export: true, variable: true}, exclude: {export: true, variable: true}, "function?": {export: true, variable: true}, "write-file": {export: true, variable: true}, sub: {export: true, variable: true}, "+": {export: true, variable: true}, search: {export: true, variable: true}, "some?": {export: true, variable: true}, "string-literal?": {export: true, variable: true}, add: {export: true, variable: true}, sublist: {export: true, variable: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g755 = sub(body, 0);
    var imports = [];
    var imp = _g755.import;
    var exp = _g755.export;
    var _g756 = (imp || []);
    var _g757 = 0;
    while ((_g757 < length(_g756))) {
      var k = _g756[_g757];
      load_module(k);
      imports = join(imports, imported(k));
      _g757 = (_g757 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g758 = (exp || []);
    var _g759 = 0;
    while ((_g759 < length(_g758))) {
      var k = _g758[_g759];
      setenv(k, {_stash: true, export: true});
      _g759 = (_g759 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var pairwise = _g2.pairwise;
  var boolean63 = _g2["boolean?"];
  var is63 = _g2["is?"];
  var composite63 = _g2["composite?"];
  var table63 = _g2["table?"];
  var module = _g2.module;
  var iterate = _g2.iterate;
  var code = _g2.code;
  var char = _g2.char;
  var _42 = _g2["*"];
  var cat = _g2.cat;
  var _47 = _g2["/"];
  var _ = _g2["-"];
  var apply = _g2.apply;
  var toplevel63 = _g2["toplevel?"];
  var length = _g2.length;
  var stash = _g2.stash;
  var parse_number = _g2["parse-number"];
  var string63 = _g2["string?"];
  var _6061 = _g2["<="];
  var _62 = _g2[">"];
  var _61 = _g2["="];
  var split = _g2.split;
  var nil63 = _g2["nil?"];
  var none63 = _g2["none?"];
  var unstash = _g2.unstash;
  var extend = _g2.extend;
  var read_file = _g2["read-file"];
  var module_key = _g2["module-key"];
  var id_literal63 = _g2["id-literal?"];
  var list63 = _g2["list?"];
  var inner = _g2.inner;
  var _37message_handler = _g2["%message-handler"];
  var hd = _g2.hd;
  var _37 = _g2["%"];
  var keep = _g2.keep;
  var setenv = _g2.setenv;
  var make_id = _g2["make-id"];
  var tl = _g2.tl;
  var to_string = _g2["to-string"];
  var _6261 = _g2[">="];
  var splice = _g2.splice;
  var write = _g2.write;
  var reverse = _g2.reverse;
  var exit = _g2.exit;
  var number63 = _g2["number?"];
  var join = _g2.join;
  var find = _g2.find;
  var keys63 = _g2["keys?"];
  var replicate = _g2.replicate;
  var empty63 = _g2["empty?"];
  var _60 = _g2["<"];
  var map = _g2.map;
  var substring = _g2.substring;
  var _43 = _g2["+"];
  var search = _g2.search;
  var reduce = _g2.reduce;
  var drop = _g2.drop;
  var exclude = _g2.exclude;
  var function63 = _g2["function?"];
  var write_file = _g2["write-file"];
  var last = _g2.last;
  var add = _g2.add;
  var sub = _g2.sub;
  var some63 = _g2["some?"];
  var string_literal63 = _g2["string-literal?"];
  var atom63 = _g2["atom?"];
  var sublist = _g2.sublist;
  var _g5 = nexus.reader;
  var read = _g5.read;
  var read_table = _g5["read-table"];
  var make_stream = _g5["make-stream"];
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus.compiler;
  var compile_module = _g6["compile-module"];
  var compile_special = _g6["compile-special"];
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var compile_call = _g6["compile-call"];
  var compile_function = _g6["compile-function"];
  var in_module = _g6["in-module"];
  var eval = _g6.eval;
  var compile_body = _g6["compile-body"];
  var lower = _g6.lower;
  var compile = _g6.compile;
  function rep(str) {
    var _g761 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g764) {
        return([false, _g764.message]);
      }
    })();
    var _g1 = _g761[0];
    var x = _g761[1];
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
    var _g762 = args;
    var i = 0;
    while ((i < length(_g762))) {
      var arg = _g762[i];
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
  var _g763 = {};
  nexus.main = _g763;
  _g763.main = main;
  _g763.rep = rep;
  _g763.repl = repl;
  _g763.usage = usage;
})();
