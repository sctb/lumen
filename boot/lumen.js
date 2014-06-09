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
    return(x.length);
  }
  function empty63(x) {
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
    var _g3 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g3, upto));
    } else {
      var l = sublist(x, _g3, upto);
      var k = undefined;
      var _g4 = x;
      for (k in _g4) {
        if (isNaN(parseInt(k))) {
          var v = _g4[k];
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
    return((l.push)(x));
  }
  function drop(l) {
    return((l.pop)());
  }
  function last(l) {
    return(l[(length(l) - 1)]);
  }
  function reverse(l) {
    var l1 = [];
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
    } else if (nil63(l1)) {
      return(join([], l2));
    } else if (nil63(l2)) {
      return(join(l1, []));
    } else if ((atom63(l1) && atom63(l2))) {
      return([l1, l2]);
    } else if (atom63(l1)) {
      return(join([l1], l2));
    } else if (atom63(l2)) {
      return(join(l1, [l2]));
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
      var k = undefined;
      var _g5 = l1;
      for (k in _g5) {
        if (isNaN(parseInt(k))) {
          var v = _g5[k];
          l[k] = v;
        }
      }
      var _g7 = undefined;
      var _g6 = l2;
      for (_g7 in _g6) {
        if (isNaN(parseInt(_g7))) {
          var v = _g6[_g7];
          l[_g7] = v;
        }
      }
      return(l);
    }
  }
  function reduce(f, x) {
    if (empty63(x)) {
      return(x);
    } else if ((length(x) === 1)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g9 = 0;
    var _g8 = l;
    while ((_g9 < length(_g8))) {
      var x = _g8[_g9];
      if (f(x)) {
        add(l1, x);
      }
      _g9 = (_g9 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g11 = 0;
    var _g10 = l;
    while ((_g11 < length(_g10))) {
      var x = _g10[_g11];
      var _g12 = f(x);
      if (_g12) {
        return(_g12);
      }
      _g11 = (_g11 + 1);
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
    var _g14 = 0;
    var _g13 = l;
    while ((_g14 < length(_g13))) {
      var x = _g13[_g14];
      var _g15 = f(x);
      if (splice63(_g15)) {
        l1 = join(l1, _g15.value);
      } else if (is63(_g15)) {
        add(l1, _g15);
      }
      _g14 = (_g14 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var k = undefined;
    var _g16 = t;
    for (k in _g16) {
      if (isNaN(parseInt(k))) {
        var v = _g16[k];
        var x = f(v);
        if (splice63(x)) {
          l[k] = x.value;
        } else if (is63(x)) {
          l[k] = x;
        }
      }
    }
    return(l);
  }
  function keys63(t) {
    var k = undefined;
    var k1 = undefined;
    var _g17 = t;
    for (k1 in _g17) {
      if (isNaN(parseInt(k1))) {
        var v = _g17[k1];
        k = k1;
        break;
      }
    }
    return(k);
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g18 = args;
      for (k in _g18) {
        if (isNaN(parseInt(k))) {
          var v = _g18[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  function unstash(args) {
    if (empty63(args)) {
      return([]);
    } else {
      var l = last(args);
      if ((table63(l) && l._stash)) {
        var args1 = sub(args, 0, (length(args) - 1));
        var k = undefined;
        var _g19 = l;
        for (k in _g19) {
          if (isNaN(parseInt(k))) {
            var v = _g19[k];
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
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g20 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g21 = _g20;
      for (k1 in _g21) {
        if (isNaN(parseInt(k1))) {
          var v = _g21[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g22 = sub(xs, 0);
    return(join(t, _g22));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g23 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g24 = t;
    for (k in _g24) {
      if (isNaN(parseInt(k))) {
        var v = _g24[k];
        if (!(_g23[k])) {
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
    var _g25 = sub(xs, 0);
    if (empty63(_g25)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g25));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g26 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g26));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g27)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g28 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g28));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g29 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g29)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g30 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g30)));
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
    } else if (boolean63(x)) {
      if (x) {
        return("true");
      } else {
        return("false");
      }
    } else if (function63(x)) {
      return("#<function>");
    } else if (atom63(x)) {
      return((x + ""));
    } else {
      var str = "(";
      var x1 = sub(x);
      var k = undefined;
      var _g31 = x;
      for (k in _g31) {
        if (isNaN(parseInt(k))) {
          var v = _g31[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g32 = x1;
      while ((i < length(_g32))) {
        var y = _g32[i];
        str = (str + to_string(y));
        if ((i < (length(x1) - 1))) {
          str = (str + " ");
        }
        i = (i + 1);
      }
      return((str + ")"));
    }
  }
  function apply(f, args) {
    var _g33 = stash(args);
    return((f.apply)(f, _g33));
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
  var _g34 = {};
  nexus.runtime = _g34;
  _g34.exit = exit;
  _g34["boolean?"] = boolean63;
  _g34["table?"] = table63;
  _g34.write = write;
  _g34["atom?"] = atom63;
  _g34["list?"] = list63;
  _g34["to-string"] = to_string;
  _g34.length = length;
  _g34["%"] = _37;
  _g34.reverse = reverse;
  _g34["string-literal?"] = string_literal63;
  _g34["/"] = _47;
  _g34.code = code;
  _g34.map = map;
  _g34.substring = substring;
  _g34["make-id"] = make_id;
  _g34.apply = apply;
  _g34.iterate = iterate;
  _g34.keep = keep;
  _g34.char = char;
  _g34["parse-number"] = parse_number;
  _g34.stash = stash;
  _g34.replicate = replicate;
  _g34["read-file"] = read_file;
  _g34["<="] = _6061;
  _g34[">="] = _6261;
  _g34["="] = _61;
  _g34.inner = inner;
  _g34.hd = hd;
  _g34["<"] = _60;
  _g34[">"] = _62;
  _g34["*"] = _42;
  _g34.split = split;
  _g34["-"] = _;
  _g34["+"] = _43;
  _g34.cat = cat;
  _g34["is?"] = is63;
  _g34.search = search;
  _g34.tl = tl;
  _g34.exclude = exclude;
  _g34.extend = extend;
  _g34.setenv = setenv;
  _g34["keys?"] = keys63;
  _g34["%message-handler"] = _37message_handler;
  _g34.splice = splice;
  _g34.pairwise = pairwise;
  _g34["composite?"] = composite63;
  _g34["string?"] = string63;
  _g34.reduce = reduce;
  _g34.sublist = sublist;
  _g34.last = last;
  _g34.drop = drop;
  _g34["some?"] = some63;
  _g34.add = add;
  _g34["id-literal?"] = id_literal63;
  _g34.sub = sub;
  _g34["nil?"] = nil63;
  _g34["write-file"] = write_file;
  _g34.find = find;
  _g34.unstash = unstash;
  _g34.join = join;
  _g34["number?"] = number63;
  _g34["empty?"] = empty63;
  _g34["function?"] = function63;
})();
(function () {
  var _g41 = nexus.runtime;
  var apply = _g41.apply;
  var _37message_handler = _g41["%message-handler"];
  var stash = _g41.stash;
  var exit = _g41.exit;
  var sub = _g41.sub;
  var make_id = _g41["make-id"];
  var replicate = _g41.replicate;
  var _62 = _g41[">"];
  var map = _g41.map;
  var _6261 = _g41[">="];
  var last = _g41.last;
  var read_file = _g41["read-file"];
  var inner = _g41.inner;
  var hd = _g41.hd;
  var id_literal63 = _g41["id-literal?"];
  var _6061 = _g41["<="];
  var table63 = _g41["table?"];
  var composite63 = _g41["composite?"];
  var write = _g41.write;
  var _61 = _g41["="];
  var split = _g41.split;
  var atom63 = _g41["atom?"];
  var list63 = _g41["list?"];
  var splice = _g41.splice;
  var is63 = _g41["is?"];
  var setenv = _g41.setenv;
  var _60 = _g41["<"];
  var tl = _g41.tl;
  var to_string = _g41["to-string"];
  var _37 = _g41["%"];
  var parse_number = _g41["parse-number"];
  var length = _g41.length;
  var _42 = _g41["*"];
  var pairwise = _g41.pairwise;
  var cat = _g41.cat;
  var exclude = _g41.exclude;
  var add = _g41.add;
  var search = _g41.search;
  var reduce = _g41.reduce;
  var extend = _g41.extend;
  var _43 = _g41["+"];
  var string63 = _g41["string?"];
  var keys63 = _g41["keys?"];
  var string_literal63 = _g41["string-literal?"];
  var _47 = _g41["/"];
  var sublist = _g41.sublist;
  var _ = _g41["-"];
  var drop = _g41.drop;
  var some63 = _g41["some?"];
  var code = _g41.code;
  var function63 = _g41["function?"];
  var reverse = _g41.reverse;
  var boolean63 = _g41["boolean?"];
  var substring = _g41.substring;
  var join = _g41.join;
  var write_file = _g41["write-file"];
  var find = _g41.find;
  var unstash = _g41.unstash;
  var empty63 = _g41["empty?"];
  var number63 = _g41["number?"];
  var iterate = _g41.iterate;
  var keep = _g41.keep;
  var char = _g41.char;
  var nil63 = _g41["nil?"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g42 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g43 = keys63(_g42);
        if (_g43) {
          return(b[_g43]);
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
      var c1 = (function () {
        if ((c === "\n")) {
          return("\\n");
        } else if ((c === "\"")) {
          return("\\\"");
        } else if ((c === "\\")) {
          return("\\\\");
        } else {
          return(c);
        }
      })();
      str1 = (str1 + c1);
      i = (i + 1);
    }
    return((str1 + "\""));
  }
  function quoted(form) {
    if (string63(form)) {
      return(escape(form));
    } else if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map(quoted, form)));
    }
  }
  function stash42(args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var k = undefined;
      var _g44 = args;
      for (k in _g44) {
        if (isNaN(parseInt(k))) {
          var v = _g44[k];
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
      return(join([join([id, rh])], bind(lh, id)));
    } else if (atom63(lh)) {
      return(join([join([lh, rh])]));
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g45 = lh;
      while ((i < length(_g45))) {
        var x = _g45[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g46 = lh;
      for (k in _g46) {
        if (isNaN(parseInt(k))) {
          var v = _g46[k];
          if ((v === true)) {
            v = k;
          }
          if ((k != "rest")) {
            bs = join(bs, bind(v, join(["get", rh, join(["quote", k])])));
          }
        }
      }
      return(bs);
    }
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if ((target === "js")) {
        return(join(["unstash", join(["sublist", "arguments", length(args1)])]));
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, join([join(["let", [args, rest()]], body)])]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g48 = 0;
      var _g47 = args;
      while ((_g48 < length(_g47))) {
        var arg = _g47[_g48];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g48 = (_g48 + 1);
      }
      if (r) {
        bs = join(bs, [r, rest()]);
      }
      if (keys63(args)) {
        bs = join(bs, [sub(args, length(args)), r]);
      }
      if (empty63(bs)) {
        return([args1, body]);
      } else {
        return([args1, join([join(["let", bs], body)])]);
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
    } else if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if ((x === "%for")) {
        var _g36 = form[0];
        var _g49 = form[1];
        var t = _g49[0];
        var k = _g49[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g37 = form[0];
        var args = form[1];
        var _g50 = sub(form, 2);
        add(environment, {_scope: true});
        var _g52 = (function () {
          var _g54 = 0;
          var _g53 = args;
          while ((_g54 < length(_g53))) {
            var _g51 = _g53[_g54];
            setenv(_g51, {_stash: true, variable: true});
            _g54 = (_g54 + 1);
          }
          return(join(["%function", map(macroexpand, args)], macroexpand(_g50)));
        })();
        drop(environment);
        return(_g52);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g38 = form[0];
        var name = form[1];
        var _g55 = form[2];
        var _g56 = sub(form, 3);
        add(environment, {_scope: true});
        var _g58 = (function () {
          var _g60 = 0;
          var _g59 = _g55;
          while ((_g60 < length(_g59))) {
            var _g57 = _g59[_g60];
            setenv(_g57, {_stash: true, variable: true});
            _g60 = (_g60 + 1);
          }
          return(join([x, name, map(macroexpand, _g55)], macroexpand(_g56)));
        })();
        drop(environment);
        return(_g58);
      } else if (macro63(x)) {
        return(macroexpand(apply(macro_function(x), tl(form))));
      } else {
        return(map(macroexpand, form));
      }
    }
  }
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var k = undefined;
    var _g61 = form;
    for (k in _g61) {
      if (isNaN(parseInt(k))) {
        var v = _g61[k];
        var _g62 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g62;
      }
    }
    var _g64 = 0;
    var _g63 = form;
    while ((_g64 < length(_g63))) {
      var x = _g63[_g64];
      if (quasisplice63(x, depth)) {
        var _g65 = quasiexpand(x[1]);
        add(xs, _g65);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g64 = (_g64 + 1);
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
      } else if ((can_unquote63(depth) && (hd(form) === "unquote"))) {
        return(quasiexpand(form[1]));
      } else if (((hd(form) === "unquote") || (hd(form) === "unquote-splicing"))) {
        return(quasiquote_list(form, (depth - 1)));
      } else if ((hd(form) === "quasiquote")) {
        return(quasiquote_list(form, (depth + 1)));
      } else {
        return(quasiquote_list(form, depth));
      }
    } else if (atom63(form)) {
      return(form);
    } else if ((hd(form) === "quote")) {
      return(form);
    } else if ((hd(form) === "quasiquote")) {
      return(quasiexpand(form[1], 1));
    } else {
      return(map(function (x) {
        return(quasiexpand(x, depth));
      }, form));
    }
  };
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"=": true, "var": true, "==": true, "catch": true, "delete": true, "for": true, "+": true, "new": true, "return": true, "-": true, "switch": true, "/": true, "default": true, "case": true, "if": true, "not": true, "finally": true, "typeof": true, "%": true, "instanceof": true, ">": true, "elseif": true, "try": true, "nil": true, "until": true, "or": true, "<=": true, "while": true, "with": true, "false": true, "true": true, ">=": true, "else": true, "then": true, "local": true, "repeat": true, "*": true, "end": true, "and": true, "function": true, "void": true, "<": true, "break": true, "throw": true, "this": true, "in": true, "continue": true, "debugger": true, "do": true};
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }
  function valid_id63(id) {
    if (empty63(id)) {
      return(false);
    } else if (special63(id)) {
      return(false);
    } else if (reserved[id]) {
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
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while ((i < length(id))) {
      var c = char(id, i);
      var n = code(c);
      var c1 = (function () {
        if ((c === "-")) {
          return("_");
        } else if (valid_char63(n)) {
          return(c);
        } else if ((i === 0)) {
          return(("_" + n));
        } else {
          return(n);
        }
      })();
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function module_key(spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw "Unsupported module specification";
    }
  }
  function exported() {
    var toplevel = hd(environment);
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var n = undefined;
    var _g68 = toplevel;
    for (n in _g68) {
      if (isNaN(parseInt(n))) {
        var b = _g68[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["define", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  }
  function imported(spec) {
    var k = module_key(spec);
    var x = nexus[k];
    if ((x && keys63(x))) {
      var m = make_id();
      var imports = [];
      add(imports, join(["%local", m, join(["get", "nexus", join(["quote", k])])]));
      var b = undefined;
      var _g69 = x;
      for (b in _g69) {
        if (isNaN(parseInt(b))) {
          var _g39 = _g69[b];
          add(imports, join(["%local", b, join(["get", m, join(["quote", b])])]));
        }
      }
      return(imports);
    }
  }
  function quote_binding(b) {
    b = extend(b, {_stash: true, module: join(["quote", b.module])});
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: join(["quote", b.symbol])}));
    } else if ((b.macro && b.form)) {
      return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
    } else if ((b.special && b.form)) {
      return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
    } else if (is63(b.variable)) {
      return(b);
    } else if (is63(b.global)) {
      return(b);
    }
  }
  function mapo(f, t) {
    var o = [];
    var k = undefined;
    var _g70 = t;
    for (k in _g70) {
      if (isNaN(parseInt(k))) {
        var v = _g70[k];
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
    return(join(["%object"], mapo(function (_g40, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g71 = ["table"];
      _g71.export = quote_frame(m.export);
      _g71.import = quoted(m.import);
      return(_g71);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g72 = {};
  nexus.utilities = _g72;
  _g72["module-key"] = module_key;
  _g72["bind*"] = bind42;
  _g72["quote-environment"] = quote_environment;
  _g72.exported = exported;
  _g72.quasiexpand = quasiexpand;
  _g72["valid-id?"] = valid_id63;
  _g72.macroexpand = macroexpand;
  _g72["macro-function"] = macro_function;
  _g72.getenv = getenv;
  _g72["bound?"] = bound63;
  _g72["initial-environment"] = initial_environment;
  _g72["stash*"] = stash42;
  _g72["variable?"] = variable63;
  _g72.mapo = mapo;
  _g72.imported = imported;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72.indentation = indentation;
  _g72.quoted = quoted;
  _g72["quote-modules"] = quote_modules;
  _g72["symbol?"] = symbol63;
  _g72["to-id"] = to_id;
  _g72["special-form?"] = special_form63;
  _g72["special?"] = special63;
  _g72["macro?"] = macro63;
  _g72.bind = bind;
})();
(function () {
  var _g74 = nexus.runtime;
  var apply = _g74.apply;
  var _37message_handler = _g74["%message-handler"];
  var stash = _g74.stash;
  var exit = _g74.exit;
  var sub = _g74.sub;
  var make_id = _g74["make-id"];
  var replicate = _g74.replicate;
  var _62 = _g74[">"];
  var map = _g74.map;
  var _6261 = _g74[">="];
  var last = _g74.last;
  var read_file = _g74["read-file"];
  var inner = _g74.inner;
  var hd = _g74.hd;
  var id_literal63 = _g74["id-literal?"];
  var _6061 = _g74["<="];
  var table63 = _g74["table?"];
  var composite63 = _g74["composite?"];
  var write = _g74.write;
  var _61 = _g74["="];
  var split = _g74.split;
  var atom63 = _g74["atom?"];
  var list63 = _g74["list?"];
  var splice = _g74.splice;
  var is63 = _g74["is?"];
  var setenv = _g74.setenv;
  var _60 = _g74["<"];
  var tl = _g74.tl;
  var to_string = _g74["to-string"];
  var _37 = _g74["%"];
  var parse_number = _g74["parse-number"];
  var length = _g74.length;
  var _42 = _g74["*"];
  var pairwise = _g74.pairwise;
  var cat = _g74.cat;
  var exclude = _g74.exclude;
  var add = _g74.add;
  var search = _g74.search;
  var reduce = _g74.reduce;
  var extend = _g74.extend;
  var _43 = _g74["+"];
  var string63 = _g74["string?"];
  var keys63 = _g74["keys?"];
  var string_literal63 = _g74["string-literal?"];
  var _47 = _g74["/"];
  var sublist = _g74.sublist;
  var _ = _g74["-"];
  var drop = _g74.drop;
  var some63 = _g74["some?"];
  var code = _g74.code;
  var function63 = _g74["function?"];
  var reverse = _g74.reverse;
  var boolean63 = _g74["boolean?"];
  var substring = _g74.substring;
  var join = _g74.join;
  var write_file = _g74["write-file"];
  var find = _g74.find;
  var unstash = _g74.unstash;
  var empty63 = _g74["empty?"];
  var number63 = _g74["number?"];
  var iterate = _g74.iterate;
  var keep = _g74.keep;
  var char = _g74.char;
  var nil63 = _g74["nil?"];
  var delimiters = {")": true, "(": true, ";": true, "\n": true};
  var whitespace = {"\n": true, "\t": true, " ": true};
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
      } else if (whitespace[c]) {
        read_char(s);
      } else if ((c === ";")) {
        while ((c && !((c === "\n")))) {
          c = read_char(s);
        }
        skip_non_code(s);
      } else {
        break;
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
    } else if ((str === "true")) {
      return(true);
    } else if ((str === "false")) {
      return(false);
    } else if ((str === "_")) {
      return(make_id());
    } else if (dot63) {
      return(reduce(function (a, b) {
        return(join(["get", b, join(["quote", a])]));
      }, reverse(split(str, "."))));
    } else {
      return(str);
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
        } else if (flag63(x)) {
          l[sub(x, 1)] = true;
        } else {
          add(l, x);
        }
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected ) at " + s.pos);
      }
    }
    return(l);
  };
  read_table[")"] = function (s) {
    throw ("Unexpected ) at " + s.pos);
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
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected \" at " + s.pos);
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
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw ("Expected | at " + s.pos);
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
  var _g80 = {};
  nexus.reader = _g80;
  _g80["make-stream"] = make_stream;
  _g80["read-all"] = read_all;
  _g80.read = read;
  _g80["read-table"] = read_table;
  _g80["read-from-string"] = read_from_string;
})();
(function () {
  var _g82 = nexus.runtime;
  var apply = _g82.apply;
  var _37message_handler = _g82["%message-handler"];
  var stash = _g82.stash;
  var exit = _g82.exit;
  var sub = _g82.sub;
  var make_id = _g82["make-id"];
  var replicate = _g82.replicate;
  var _62 = _g82[">"];
  var map = _g82.map;
  var _6261 = _g82[">="];
  var last = _g82.last;
  var read_file = _g82["read-file"];
  var inner = _g82.inner;
  var hd = _g82.hd;
  var id_literal63 = _g82["id-literal?"];
  var _6061 = _g82["<="];
  var table63 = _g82["table?"];
  var composite63 = _g82["composite?"];
  var write = _g82.write;
  var _61 = _g82["="];
  var split = _g82.split;
  var atom63 = _g82["atom?"];
  var list63 = _g82["list?"];
  var splice = _g82.splice;
  var is63 = _g82["is?"];
  var setenv = _g82.setenv;
  var _60 = _g82["<"];
  var tl = _g82.tl;
  var to_string = _g82["to-string"];
  var _37 = _g82["%"];
  var parse_number = _g82["parse-number"];
  var length = _g82.length;
  var _42 = _g82["*"];
  var pairwise = _g82.pairwise;
  var cat = _g82.cat;
  var exclude = _g82.exclude;
  var add = _g82.add;
  var search = _g82.search;
  var reduce = _g82.reduce;
  var extend = _g82.extend;
  var _43 = _g82["+"];
  var string63 = _g82["string?"];
  var keys63 = _g82["keys?"];
  var string_literal63 = _g82["string-literal?"];
  var _47 = _g82["/"];
  var sublist = _g82.sublist;
  var _ = _g82["-"];
  var drop = _g82.drop;
  var some63 = _g82["some?"];
  var code = _g82.code;
  var function63 = _g82["function?"];
  var reverse = _g82.reverse;
  var boolean63 = _g82["boolean?"];
  var substring = _g82.substring;
  var join = _g82.join;
  var write_file = _g82["write-file"];
  var find = _g82.find;
  var unstash = _g82.unstash;
  var empty63 = _g82["empty?"];
  var number63 = _g82["number?"];
  var iterate = _g82.iterate;
  var keep = _g82.keep;
  var char = _g82.char;
  var nil63 = _g82["nil?"];
  var _g83 = nexus.utilities;
  var special63 = _g83["special?"];
  var to_id = _g83["to-id"];
  var stash42 = _g83["stash*"];
  var variable63 = _g83["variable?"];
  var valid_id63 = _g83["valid-id?"];
  var quote_environment = _g83["quote-environment"];
  var initial_environment = _g83["initial-environment"];
  var macroexpand = _g83.macroexpand;
  var macro_function = _g83["macro-function"];
  var getenv = _g83.getenv;
  var quoted = _g83.quoted;
  var mapo = _g83.mapo;
  var special_form63 = _g83["special-form?"];
  var bind42 = _g83["bind*"];
  var symbol63 = _g83["symbol?"];
  var exported = _g83.exported;
  var imported = _g83.imported;
  var module_key = _g83["module-key"];
  var indentation = _g83.indentation;
  var symbol_expansion = _g83["symbol-expansion"];
  var bind = _g83.bind;
  var bound63 = _g83["bound?"];
  var quasiexpand = _g83.quasiexpand;
  var quote_modules = _g83["quote-modules"];
  var macro63 = _g83["macro?"];
  var _g84 = nexus.reader;
  var make_stream = _g84["make-stream"];
  var read_table = _g84["read-table"];
  var read_from_string = _g84["read-from-string"];
  var read_all = _g84["read-all"];
  var read = _g84.read;
  var infix = {common: {"%": true, "+": true, "*": true, "-": true, ">=": true, "/": true, ">": true, "<=": true, "<": true}, js: {"~=": "!=", "or": "||", cat: "+", "=": "===", "and": "&&"}, lua: {"~=": true, "or": true, cat: "..", "=": "==", "and": true}};
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
    var i = 0;
    var _g85 = args;
    while ((i < length(_g85))) {
      var arg = _g85[i];
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
    } else if ((x === "nil")) {
      return("undefined");
    } else if (id_literal63(x)) {
      return(inner(x));
    } else if (string_literal63(x)) {
      return(x);
    } else if (string63(x)) {
      return(to_id(x));
    } else if (boolean63(x)) {
      if (x) {
        return("true");
      } else {
        return("false");
      }
    } else if (number63(x)) {
      return((x + ""));
    } else {
      throw "Unrecognized atom";
    }
  }
  function compile_body(forms) {
    var _g86 = unstash(sublist(arguments, 1));
    var tail63 = _g86["tail?"];
    var str = "";
    var i = 0;
    var _g87 = forms;
    while ((i < length(_g87))) {
      var x = _g87[i];
      var t63 = (tail63 && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, "tail?": t63, "stmt?": true}));
      i = (i + 1);
    }
    return(str);
  }
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else if ((target === "js")) {
      return(";\n");
    } else {
      return("\n");
    }
  }
  function compile_special(form, stmt63, tail63) {
    var _g88 = getenv(hd(form));
    var stmt = _g88.stmt;
    var self_tr63 = _g88.tr;
    var special = _g88.special;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  }
  function compile_call(form) {
    if (empty63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return(("(" + f1 + ")" + args));
      } else if (string63(f)) {
        return((f1 + args));
      } else {
        throw "Invalid function call";
      }
    }
  }
  function compile_infix(_g89) {
    var op = _g89[0];
    var args = sub(_g89, 1);
    var str = "(";
    var _g90 = getop(op);
    var i = 0;
    var _g91 = args;
    while ((i < length(_g91))) {
      var arg = _g91[i];
      if (((_g90 === "-") && (length(args) === 1))) {
        str = (str + _g90 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g90 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g92 = (function () {
      indent_level = (indent_level + 1);
      var _g93 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g93);
    })();
    var ind = indentation();
    var tr = (function () {
      if ((last63 && (target === "lua"))) {
        return((ind + "end\n"));
      } else if (last63) {
        return("\n");
      } else {
        return("");
      }
    })();
    if ((first63 && (target === "js"))) {
      return((ind + "if (" + cond1 + ") {\n" + _g92 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g92 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g92 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g92 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g92 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g92 + tr));
    }
  }
  function compile_function(args, body) {
    var _g94 = unstash(sublist(arguments, 2));
    var name = _g94.name;
    var prefix = _g94.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g95 = (prefix || "");
    var _g96 = compile_args(args);
    var _g97 = (function () {
      indent_level = (indent_level + 1);
      var _g98 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g98);
    })();
    var ind = indentation();
    var tr = (function () {
      if ((target === "js")) {
        return("");
      } else {
        return("end");
      }
    })();
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g96 + " {\n" + _g97 + ind + "}" + tr));
    } else {
      return((_g95 + "function " + id + _g96 + "\n" + _g97 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g99 = unstash(sublist(arguments, 1));
    var tail63 = _g99["tail?"];
    var stmt63 = _g99["stmt?"];
    if ((tail63 && can_return63(form))) {
      form = join(["return", form]);
    }
    if (nil63(form)) {
      return("");
    } else if (special_form63(form)) {
      return(compile_special(form, stmt63, tail63));
    } else {
      var tr = terminator(stmt63);
      var ind = (function () {
        if (stmt63) {
          return(indentation());
        } else {
          return("");
        }
      })();
      var _g100 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g100 + tr));
    }
  };
  global.current_module = undefined;
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g101 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g101, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = global.eval;
  var compiler_output;
  var compilation_level;
  function _37compile_module(spec) {
    var path = module_path(spec);
    var mod0 = current_module;
    var env0 = environment;
    var k = module_key(spec);
    if (number63(compilation_level)) {
      compilation_level = (compilation_level + 1);
    }
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    var m = module(spec);
    var toplevel = hd(environment);
    current_module = mod0;
    environment = env0;
    var name = undefined;
    var _g115 = toplevel;
    for (name in _g115) {
      if (isNaN(parseInt(name))) {
        var binding = _g115[name];
        if ((binding.export && (binding.module === k))) {
          m.export[name] = binding;
        }
      }
    }
    if (number63(compilation_level)) {
      compilation_level = (compilation_level - 1);
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var m = module(spec);
    var frame = last(environment);
    var k = undefined;
    var _g116 = m.export;
    for (k in _g116) {
      if (isNaN(parseInt(k))) {
        var v = _g116[k];
        frame[k] = v;
      }
    }
  }
  function load_module(spec) {
    if ((nil63(module(spec)) || (compilation_level === 1))) {
      _37compile_module(spec);
    }
    return(open_module(spec));
  }
  function in_module(spec) {
    load_module(spec);
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  function compile_module(spec) {
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  }
  function prologue() {
    if (current_module) {
      var m = module(current_module);
      return(join(imported(current_module), map(function (x) {
        return(splice(imported(x)));
      }, m.import)));
    }
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(), [form]));
    var x = compile(macroexpand(form1));
    target = previous;
    return(run(x));
  }
  var _g117 = {};
  nexus.compiler = _g117;
  _g117["compile-branch"] = compile_branch;
  _g117.eval = eval;
  _g117["compile-module"] = compile_module;
  _g117.compile = compile;
  _g117["in-module"] = in_module;
  _g117["load-module"] = load_module;
  _g117["compile-function"] = compile_function;
  _g117["open-module"] = open_module;
  _g117["compile-call"] = compile_call;
  _g117["compile-special"] = compile_special;
  _g117["compile-body"] = compile_body;
})();
(function () {
  var _g120 = nexus.runtime;
  var apply = _g120.apply;
  var _37message_handler = _g120["%message-handler"];
  var stash = _g120.stash;
  var exit = _g120.exit;
  var sub = _g120.sub;
  var make_id = _g120["make-id"];
  var replicate = _g120.replicate;
  var _62 = _g120[">"];
  var map = _g120.map;
  var _6261 = _g120[">="];
  var last = _g120.last;
  var read_file = _g120["read-file"];
  var inner = _g120.inner;
  var hd = _g120.hd;
  var id_literal63 = _g120["id-literal?"];
  var _6061 = _g120["<="];
  var table63 = _g120["table?"];
  var composite63 = _g120["composite?"];
  var write = _g120.write;
  var _61 = _g120["="];
  var split = _g120.split;
  var atom63 = _g120["atom?"];
  var list63 = _g120["list?"];
  var splice = _g120.splice;
  var is63 = _g120["is?"];
  var setenv = _g120.setenv;
  var _60 = _g120["<"];
  var tl = _g120.tl;
  var to_string = _g120["to-string"];
  var _37 = _g120["%"];
  var parse_number = _g120["parse-number"];
  var length = _g120.length;
  var _42 = _g120["*"];
  var pairwise = _g120.pairwise;
  var cat = _g120.cat;
  var exclude = _g120.exclude;
  var add = _g120.add;
  var search = _g120.search;
  var reduce = _g120.reduce;
  var extend = _g120.extend;
  var _43 = _g120["+"];
  var string63 = _g120["string?"];
  var keys63 = _g120["keys?"];
  var string_literal63 = _g120["string-literal?"];
  var _47 = _g120["/"];
  var sublist = _g120.sublist;
  var _ = _g120["-"];
  var drop = _g120.drop;
  var some63 = _g120["some?"];
  var code = _g120.code;
  var function63 = _g120["function?"];
  var reverse = _g120.reverse;
  var boolean63 = _g120["boolean?"];
  var substring = _g120.substring;
  var join = _g120.join;
  var write_file = _g120["write-file"];
  var find = _g120.find;
  var unstash = _g120.unstash;
  var empty63 = _g120["empty?"];
  var number63 = _g120["number?"];
  var iterate = _g120.iterate;
  var keep = _g120.keep;
  var char = _g120.char;
  var nil63 = _g120["nil?"];
  var _g121 = nexus.utilities;
  var special63 = _g121["special?"];
  var to_id = _g121["to-id"];
  var stash42 = _g121["stash*"];
  var variable63 = _g121["variable?"];
  var valid_id63 = _g121["valid-id?"];
  var quote_environment = _g121["quote-environment"];
  var initial_environment = _g121["initial-environment"];
  var macroexpand = _g121.macroexpand;
  var macro_function = _g121["macro-function"];
  var getenv = _g121.getenv;
  var quoted = _g121.quoted;
  var mapo = _g121.mapo;
  var special_form63 = _g121["special-form?"];
  var bind42 = _g121["bind*"];
  var symbol63 = _g121["symbol?"];
  var exported = _g121.exported;
  var imported = _g121.imported;
  var module_key = _g121["module-key"];
  var indentation = _g121.indentation;
  var symbol_expansion = _g121["symbol-expansion"];
  var bind = _g121.bind;
  var bound63 = _g121["bound?"];
  var quasiexpand = _g121.quasiexpand;
  var quote_modules = _g121["quote-modules"];
  var macro63 = _g121["macro?"];
  var _g122 = nexus.compiler;
  var compile_branch = _g122["compile-branch"];
  var compile = _g122.compile;
  var compile_body = _g122["compile-body"];
  var in_module = _g122["in-module"];
  var compile_call = _g122["compile-call"];
  var compile_special = _g122["compile-special"];
  var compile_function = _g122["compile-function"];
  var load_module = _g122["load-module"];
  var compile_module = _g122["compile-module"];
  var eval = _g122.eval;
  var open_module = _g122["open-module"];
})();
(function () {
  var _g228 = nexus.runtime;
  var apply = _g228.apply;
  var _37message_handler = _g228["%message-handler"];
  var stash = _g228.stash;
  var exit = _g228.exit;
  var sub = _g228.sub;
  var make_id = _g228["make-id"];
  var replicate = _g228.replicate;
  var _62 = _g228[">"];
  var map = _g228.map;
  var _6261 = _g228[">="];
  var last = _g228.last;
  var read_file = _g228["read-file"];
  var inner = _g228.inner;
  var hd = _g228.hd;
  var id_literal63 = _g228["id-literal?"];
  var _6061 = _g228["<="];
  var table63 = _g228["table?"];
  var composite63 = _g228["composite?"];
  var write = _g228.write;
  var _61 = _g228["="];
  var split = _g228.split;
  var atom63 = _g228["atom?"];
  var list63 = _g228["list?"];
  var splice = _g228.splice;
  var is63 = _g228["is?"];
  var setenv = _g228.setenv;
  var _60 = _g228["<"];
  var tl = _g228.tl;
  var to_string = _g228["to-string"];
  var _37 = _g228["%"];
  var parse_number = _g228["parse-number"];
  var length = _g228.length;
  var _42 = _g228["*"];
  var pairwise = _g228.pairwise;
  var cat = _g228.cat;
  var exclude = _g228.exclude;
  var add = _g228.add;
  var search = _g228.search;
  var reduce = _g228.reduce;
  var extend = _g228.extend;
  var _43 = _g228["+"];
  var string63 = _g228["string?"];
  var keys63 = _g228["keys?"];
  var string_literal63 = _g228["string-literal?"];
  var _47 = _g228["/"];
  var sublist = _g228.sublist;
  var _ = _g228["-"];
  var drop = _g228.drop;
  var some63 = _g228["some?"];
  var code = _g228.code;
  var function63 = _g228["function?"];
  var reverse = _g228.reverse;
  var boolean63 = _g228["boolean?"];
  var substring = _g228.substring;
  var join = _g228.join;
  var write_file = _g228["write-file"];
  var find = _g228.find;
  var unstash = _g228.unstash;
  var empty63 = _g228["empty?"];
  var number63 = _g228["number?"];
  var iterate = _g228.iterate;
  var keep = _g228.keep;
  var char = _g228.char;
  var nil63 = _g228["nil?"];
  var _g229 = nexus.utilities;
  var special63 = _g229["special?"];
  var to_id = _g229["to-id"];
  var stash42 = _g229["stash*"];
  var variable63 = _g229["variable?"];
  var valid_id63 = _g229["valid-id?"];
  var quote_environment = _g229["quote-environment"];
  var initial_environment = _g229["initial-environment"];
  var macroexpand = _g229.macroexpand;
  var macro_function = _g229["macro-function"];
  var getenv = _g229.getenv;
  var quoted = _g229.quoted;
  var mapo = _g229.mapo;
  var special_form63 = _g229["special-form?"];
  var bind42 = _g229["bind*"];
  var symbol63 = _g229["symbol?"];
  var exported = _g229.exported;
  var imported = _g229.imported;
  var module_key = _g229["module-key"];
  var indentation = _g229.indentation;
  var symbol_expansion = _g229["symbol-expansion"];
  var bind = _g229.bind;
  var bound63 = _g229["bound?"];
  var quasiexpand = _g229.quasiexpand;
  var quote_modules = _g229["quote-modules"];
  var macro63 = _g229["macro?"];
  var _g230 = nexus.compiler;
  var compile_branch = _g230["compile-branch"];
  var compile = _g230.compile;
  var compile_body = _g230["compile-body"];
  var in_module = _g230["in-module"];
  var compile_call = _g230["compile-call"];
  var compile_special = _g230["compile-special"];
  var compile_function = _g230["compile-function"];
  var load_module = _g230["load-module"];
  var compile_module = _g230["compile-module"];
  var eval = _g230.eval;
  var open_module = _g230["open-module"];
  global.target = "js";
})();
(function () {
  var _g385 = nexus.runtime;
  var apply = _g385.apply;
  var _37message_handler = _g385["%message-handler"];
  var stash = _g385.stash;
  var exit = _g385.exit;
  var sub = _g385.sub;
  var make_id = _g385["make-id"];
  var replicate = _g385.replicate;
  var _62 = _g385[">"];
  var map = _g385.map;
  var _6261 = _g385[">="];
  var last = _g385.last;
  var read_file = _g385["read-file"];
  var inner = _g385.inner;
  var hd = _g385.hd;
  var id_literal63 = _g385["id-literal?"];
  var _6061 = _g385["<="];
  var table63 = _g385["table?"];
  var composite63 = _g385["composite?"];
  var write = _g385.write;
  var _61 = _g385["="];
  var split = _g385.split;
  var atom63 = _g385["atom?"];
  var list63 = _g385["list?"];
  var splice = _g385.splice;
  var is63 = _g385["is?"];
  var setenv = _g385.setenv;
  var _60 = _g385["<"];
  var tl = _g385.tl;
  var to_string = _g385["to-string"];
  var _37 = _g385["%"];
  var parse_number = _g385["parse-number"];
  var length = _g385.length;
  var _42 = _g385["*"];
  var pairwise = _g385.pairwise;
  var cat = _g385.cat;
  var exclude = _g385.exclude;
  var add = _g385.add;
  var search = _g385.search;
  var reduce = _g385.reduce;
  var extend = _g385.extend;
  var _43 = _g385["+"];
  var string63 = _g385["string?"];
  var keys63 = _g385["keys?"];
  var string_literal63 = _g385["string-literal?"];
  var _47 = _g385["/"];
  var sublist = _g385.sublist;
  var _ = _g385["-"];
  var drop = _g385.drop;
  var some63 = _g385["some?"];
  var code = _g385.code;
  var function63 = _g385["function?"];
  var reverse = _g385.reverse;
  var boolean63 = _g385["boolean?"];
  var substring = _g385.substring;
  var join = _g385.join;
  var write_file = _g385["write-file"];
  var find = _g385.find;
  var unstash = _g385.unstash;
  var empty63 = _g385["empty?"];
  var number63 = _g385["number?"];
  var iterate = _g385.iterate;
  var keep = _g385.keep;
  var char = _g385.char;
  var nil63 = _g385["nil?"];
  var _g386 = nexus.utilities;
  var special63 = _g386["special?"];
  var to_id = _g386["to-id"];
  var stash42 = _g386["stash*"];
  var variable63 = _g386["variable?"];
  var valid_id63 = _g386["valid-id?"];
  var quote_environment = _g386["quote-environment"];
  var initial_environment = _g386["initial-environment"];
  var macroexpand = _g386.macroexpand;
  var macro_function = _g386["macro-function"];
  var getenv = _g386.getenv;
  var quoted = _g386.quoted;
  var mapo = _g386.mapo;
  var special_form63 = _g386["special-form?"];
  var bind42 = _g386["bind*"];
  var symbol63 = _g386["symbol?"];
  var exported = _g386.exported;
  var imported = _g386.imported;
  var module_key = _g386["module-key"];
  var indentation = _g386.indentation;
  var symbol_expansion = _g386["symbol-expansion"];
  var bind = _g386.bind;
  var bound63 = _g386["bound?"];
  var quasiexpand = _g386.quasiexpand;
  var quote_modules = _g386["quote-modules"];
  var macro63 = _g386["macro?"];
  var _g387 = nexus.compiler;
  var compile_branch = _g387["compile-branch"];
  var compile = _g387.compile;
  var compile_body = _g387["compile-body"];
  var in_module = _g387["in-module"];
  var compile_call = _g387["compile-call"];
  var compile_special = _g387["compile-special"];
  var compile_function = _g387["compile-function"];
  var load_module = _g387["load-module"];
  var compile_module = _g387["compile-module"];
  var eval = _g387.eval;
  var open_module = _g387["open-module"];
  global.modules = {runtime: {import: ["special", "core"], export: {exit: {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, print: {export: true, global: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}}}, lib: {import: ["core", "special"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {"define-reader": {export: true, macro: function (_g394) {
    var char = _g394[0];
    var stream = _g394[1];
    var body = unstash(sublist(arguments, 1));
    var _g395 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g395)]));
  }, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "read-table": {export: true, variable: true, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, read: {export: true, variable: true, module: "reader"}}}, system: {import: ["special", "core"], export: {nexus: {export: true, global: true, module: "system"}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {dec: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core"}, language: {export: true, macro: function () {
    return(join(["quote", target]));
  }, module: "core"}, inc: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core"}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g396 = sub(body, 0);
    var form = join(["fn", args], _g396);
    eval(join((function () {
      var _g397 = ["setenv", join(["quote", name])];
      _g397.form = join(["quote", form]);
      _g397.macro = form;
      return(_g397);
    })()));
    return(undefined);
  }, module: "core"}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g398 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g399 = ["table"];
      _g399._scope = scope;
      return(_g399);
    })())]), join(["let", join([x, join(["do"], _g398)]), join(["drop", "environment"]), x])]));
  }, module: "core"}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g400 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g400)]));
  }, module: "core"}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g401 = sub(body, 0);
    var _g402 = bind42(args, _g401);
    var _g403 = _g402[0];
    var _g404 = _g402[1];
    return(join(["%function", _g403], _g404));
  }, module: "core"}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }, module: "core"}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g405 = sub(body, 0);
    add(environment, {});
    var _g406 = (function () {
      map(function (_g407) {
        var name = _g407[0];
        var exp = _g407[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g405)));
    })();
    drop(environment);
    return(_g406);
  }, module: "core"}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core"}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core"}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g408 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g408)]));
  }, module: "core"}, across: {export: true, macro: function (_g409) {
    var l = _g409[0];
    var v = _g409[1];
    var i = _g409[2];
    var start = _g409[3];
    var body = unstash(sublist(arguments, 1));
    var _g410 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g410, [join(["inc", i])]))])]));
  }, module: "core"}, "with-bindings": {export: true, macro: function (_g411) {
    var names = _g411[0];
    var body = unstash(sublist(arguments, 1));
    var _g412 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g413 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g414 = ["setenv", x];
        _g414.variable = true;
        return(_g414);
      })())])];
      _g413.scope = true;
      return(_g413);
    })(), _g412));
  }, module: "core"}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g415 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g415))) {
      var _g416 = bind42(x, _g415);
      var args = _g416[0];
      var _g417 = _g416[1];
      return(join(["%global-function", name, args], _g417));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core"}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g418 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g418))) {
      var _g419 = bind42(x, _g418);
      var args = _g419[0];
      var _g420 = _g419[1];
      return(join(["%local-function", name, args], _g420));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core"}, list: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g421 = body;
      for (k in _g421) {
        if (isNaN(parseInt(k))) {
          var v = _g421[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core"}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g422 = sub(body, 0);
    var form = join(["fn", args], _g422);
    var keys = sub(_g422, length(_g422));
    eval(join((function () {
      var _g423 = ["setenv", join(["quote", name])];
      _g423.form = join(["quote", form]);
      _g423.special = form;
      return(_g423);
    })(), keys));
    return(undefined);
  }, module: "core"}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g425 = 0;
    var _g424 = elements;
    while ((_g425 < length(_g424))) {
      var e = _g424[_g425];
      l[e] = true;
      _g425 = (_g425 + 1);
    }
    return(join(["table"], l));
  }, module: "core"}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g227, x) {
      return(x);
    }, body)));
  }, module: "core"}, target: {export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, global: true, module: "core"}, "list*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g426 = xs;
      while ((i < length(_g426))) {
        var x = _g426[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core"}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g427 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g428) {
      var lh = _g428[0];
      var rh = _g428[1];
      var _g430 = 0;
      var _g429 = bind(lh, rh);
      while ((_g430 < length(_g429))) {
        var _g431 = _g429[_g430];
        var id = _g431[0];
        var val = _g431[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g430 = (_g430 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g427)])));
  }, module: "core"}, guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core"}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core"}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g432 = sub(body, 0);
    add(environment, {});
    var _g433 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g432)));
    })();
    drop(environment);
    return(_g433);
  }, module: "core"}, each: {export: true, macro: function (_g434) {
    var t = _g434[0];
    var k = _g434[1];
    var v = _g434[2];
    var body = unstash(sublist(arguments, 1));
    var _g435 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g436 = ["target"];
      _g436.lua = join(["not", join(["number?", k])]);
      _g436.js = join(["isNaN", join(["parseInt", k])]);
      return(_g436);
    })()), join(["let", join([v, join(["get", t1, k])])], _g435)])])]));
  }, module: "core"}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g437 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g437)]));
  }, module: "core"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"set": {export: true, stmt: true, module: "special", special: function (_g438) {
    var lh = _g438[0];
    var rh = _g438[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "%global-function": {export: true, stmt: true, tr: true, module: "special", special: function (_g439) {
    var name = _g439[0];
    var args = _g439[1];
    var body = sub(_g439, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }}, "return": {export: true, stmt: true, module: "special", special: function (_g440) {
    var x = _g440[0];
    var _g441 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g441));
  }}, "do": {export: true, stmt: true, tr: true, module: "special", special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "not": {export: true, module: "special", special: function (_g442) {
    var x = _g442[0];
    var _g443 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g443 + ")"));
  }}, "break": {export: true, stmt: true, module: "special", special: function (_g119) {
    return((indentation() + "break"));
  }}, "if": {export: true, stmt: true, tr: true, module: "special", special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g444 = form;
    while ((i < length(_g444))) {
      var condition = _g444[i];
      var last63 = (i >= (length(form) - 2));
      var else63 = (i === (length(form) - 1));
      var first63 = (i === 0);
      var body = form[(i + 1)];
      if (else63) {
        body = condition;
        condition = undefined;
      }
      str = (str + compile_branch(condition, body, first63, last63, tail63));
      i = (i + 1);
      i = (i + 1);
    }
    return(str);
  }}, "%array": {export: true, module: "special", special: function (forms) {
    var open = (function () {
      if ((target === "lua")) {
        return("{");
      } else {
        return("[");
      }
    })();
    var close = (function () {
      if ((target === "lua")) {
        return("}");
      } else {
        return("]");
      }
    })();
    var str = "";
    var i = 0;
    var _g445 = forms;
    while ((i < length(_g445))) {
      var x = _g445[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "%for": {export: true, stmt: true, tr: true, module: "special", special: function (_g446) {
    var _g447 = _g446[0];
    var t = _g447[0];
    var k = _g447[1];
    var body = sub(_g446, 1);
    var _g448 = compile(t);
    var ind = indentation();
    var _g449 = (function () {
      indent_level = (indent_level + 1);
      var _g450 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g450);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g448 + " do\n" + _g449 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g448 + ") {\n" + _g449 + ind + "}\n"));
    }
  }}, "%object": {export: true, module: "special", special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var i = 0;
    var _g451 = pairs;
    while ((i < length(_g451))) {
      var _g452 = _g451[i];
      var k = _g452[0];
      var v = _g452[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g453 = compile(v);
      var _g454 = (function () {
        if (valid_id63(k)) {
          return(k);
        } else if (((target === "js") && string_literal63(k))) {
          return(k);
        } else if ((target === "js")) {
          return(quoted(k));
        } else if (string_literal63(k)) {
          return(("[" + k + "]"));
        } else {
          return(("[" + quoted(k) + "]"));
        }
      })();
      str = (str + _g454 + sep + _g453);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "error": {export: true, stmt: true, module: "special", special: function (_g455) {
    var x = _g455[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "%try": {export: true, stmt: true, tr: true, module: "special", special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g456 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g456);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g457 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g457);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "while": {export: true, stmt: true, tr: true, module: "special", special: function (_g458) {
    var condition = _g458[0];
    var body = sub(_g458, 1);
    var _g459 = compile(condition);
    var _g460 = (function () {
      indent_level = (indent_level + 1);
      var _g461 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g461);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g459 + ") {\n" + _g460 + ind + "}\n"));
    } else {
      return((ind + "while " + _g459 + " do\n" + _g460 + ind + "end\n"));
    }
  }}, "%local-function": {export: true, stmt: true, tr: true, module: "special", special: function (_g462) {
    var name = _g462[0];
    var args = _g462[1];
    var body = sub(_g462, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "%function": {export: true, module: "special", special: function (_g463) {
    var args = _g463[0];
    var body = sub(_g463, 1);
    return(compile_function(args, body));
  }}, "%local": {export: true, stmt: true, module: "special", special: function (_g464) {
    var name = _g464[0];
    var value = _g464[1];
    var id = compile(name);
    var value1 = compile(value);
    var rh = (function () {
      if (is63(value)) {
        return((" = " + value1));
      } else {
        return("");
      }
    })();
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + rh));
  }}, "get": {export: true, module: "special", special: function (_g465) {
    var t = _g465[0];
    var k = _g465[1];
    var _g466 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g466, 0) === "{"))) {
      _g466 = ("(" + _g466 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g466 + "." + inner(k)));
    } else {
      return((_g466 + "[" + k1 + "]"));
    }
  }}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"current-module": {export: true, global: true, module: "compiler"}, "compile-module": {export: true, variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}, "open-module": {export: true, variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g467 = sub(body, 0);
    var imports = [];
    var imp = _g467.import;
    var exp = _g467.export;
    var _g469 = 0;
    var _g468 = (imp || []);
    while ((_g469 < length(_g468))) {
      var k = _g468[_g469];
      load_module(k);
      imports = join(imports, imported(k));
      _g469 = (_g469 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g471 = 0;
    var _g470 = (exp || []);
    while ((_g471 < length(_g470))) {
      var k = _g470[_g471];
      setenv(k, {_stash: true, export: true});
      _g471 = (_g471 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}}}, utilities: {import: ["runtime", "special", "core"], export: {indentation: {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, macroexpand: {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, mapo: {export: true, variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "bind*": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities"}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g472 = sub(body, 0);
    var imports = [];
    var imp = _g472.import;
    var exp = _g472.export;
    var _g474 = 0;
    var _g473 = (imp || []);
    while ((_g474 < length(_g473))) {
      var k = _g473[_g474];
      load_module(k);
      imports = join(imports, imported(k));
      _g474 = (_g474 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g476 = 0;
    var _g475 = (exp || []);
    while ((_g476 < length(_g475))) {
      var k = _g475[_g476];
      setenv(k, {_stash: true, export: true});
      _g476 = (_g476 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}}];
})();
(function () {
  var _g35 = nexus.runtime;
  var apply = _g35.apply;
  var _37message_handler = _g35["%message-handler"];
  var stash = _g35.stash;
  var exit = _g35.exit;
  var sub = _g35.sub;
  var make_id = _g35["make-id"];
  var replicate = _g35.replicate;
  var _62 = _g35[">"];
  var map = _g35.map;
  var _6261 = _g35[">="];
  var last = _g35.last;
  var read_file = _g35["read-file"];
  var inner = _g35.inner;
  var hd = _g35.hd;
  var id_literal63 = _g35["id-literal?"];
  var _6061 = _g35["<="];
  var table63 = _g35["table?"];
  var composite63 = _g35["composite?"];
  var write = _g35.write;
  var _61 = _g35["="];
  var split = _g35.split;
  var atom63 = _g35["atom?"];
  var list63 = _g35["list?"];
  var splice = _g35.splice;
  var is63 = _g35["is?"];
  var setenv = _g35.setenv;
  var _60 = _g35["<"];
  var tl = _g35.tl;
  var to_string = _g35["to-string"];
  var _37 = _g35["%"];
  var parse_number = _g35["parse-number"];
  var length = _g35.length;
  var _42 = _g35["*"];
  var pairwise = _g35.pairwise;
  var cat = _g35.cat;
  var exclude = _g35.exclude;
  var add = _g35.add;
  var search = _g35.search;
  var reduce = _g35.reduce;
  var extend = _g35.extend;
  var _43 = _g35["+"];
  var string63 = _g35["string?"];
  var keys63 = _g35["keys?"];
  var string_literal63 = _g35["string-literal?"];
  var _47 = _g35["/"];
  var sublist = _g35.sublist;
  var _ = _g35["-"];
  var drop = _g35.drop;
  var some63 = _g35["some?"];
  var code = _g35.code;
  var function63 = _g35["function?"];
  var reverse = _g35.reverse;
  var boolean63 = _g35["boolean?"];
  var substring = _g35.substring;
  var join = _g35.join;
  var write_file = _g35["write-file"];
  var find = _g35.find;
  var unstash = _g35.unstash;
  var empty63 = _g35["empty?"];
  var number63 = _g35["number?"];
  var iterate = _g35.iterate;
  var keep = _g35.keep;
  var char = _g35.char;
  var nil63 = _g35["nil?"];
  var _g73 = nexus.utilities;
  var special63 = _g73["special?"];
  var to_id = _g73["to-id"];
  var stash42 = _g73["stash*"];
  var variable63 = _g73["variable?"];
  var valid_id63 = _g73["valid-id?"];
  var quote_environment = _g73["quote-environment"];
  var initial_environment = _g73["initial-environment"];
  var macroexpand = _g73.macroexpand;
  var macro_function = _g73["macro-function"];
  var getenv = _g73.getenv;
  var quoted = _g73.quoted;
  var mapo = _g73.mapo;
  var special_form63 = _g73["special-form?"];
  var bind42 = _g73["bind*"];
  var symbol63 = _g73["symbol?"];
  var exported = _g73.exported;
  var imported = _g73.imported;
  var module_key = _g73["module-key"];
  var indentation = _g73.indentation;
  var symbol_expansion = _g73["symbol-expansion"];
  var bind = _g73.bind;
  var bound63 = _g73["bound?"];
  var quasiexpand = _g73.quasiexpand;
  var quote_modules = _g73["quote-modules"];
  var macro63 = _g73["macro?"];
  var _g81 = nexus.reader;
  var make_stream = _g81["make-stream"];
  var read_table = _g81["read-table"];
  var read_from_string = _g81["read-from-string"];
  var read_all = _g81["read-all"];
  var read = _g81.read;
  var _g118 = nexus.compiler;
  var compile_branch = _g118["compile-branch"];
  var compile = _g118.compile;
  var compile_body = _g118["compile-body"];
  var in_module = _g118["in-module"];
  var compile_call = _g118["compile-call"];
  var compile_special = _g118["compile-special"];
  var compile_function = _g118["compile-function"];
  var load_module = _g118["load-module"];
  var compile_module = _g118["compile-module"];
  var eval = _g118.eval;
  var open_module = _g118["open-module"];
  function rep(str) {
    var _g478 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g481) {
        return([false, _g481]);
      }
    })();
    var _g1 = _g478[0];
    var x = _g478[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl() {
    var step = function (str) {
      rep(str);
      return(write("> "));
    };
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
    var i = 0;
    var _g479 = args;
    while ((i < length(_g479))) {
      var arg = _g479[i];
      if (((arg === "-o") || (arg === "-t") || (arg === "-e"))) {
        if ((i === (length(args) - 1))) {
          print((to_string("missing argument for") + " " + to_string(arg) + " "));
        } else {
          i = (i + 1);
          var val = args[i];
          if ((arg === "-o")) {
            output = val;
          } else if ((arg === "-t")) {
            target1 = val;
          } else if ((arg === "-e")) {
            expr = val;
          }
        }
      } else if ((nil63(spec) && ("-" != char(arg, 0)))) {
        spec = arg;
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
  return(main());
})();
