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
    return({value: x, _splice: true});
  }
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  function map1(f, l) {
    var l1 = [];
    var _g14 = 0;
    var _g13 = l;
    while ((_g14 < length(_g13))) {
      var x = _g13[_g14];
      var x1 = f(x);
      if (splice63(x1)) {
        l1 = join(l1, x1.value);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g14 = (_g14 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = map1(f, t);
    var k = undefined;
    var _g15 = t;
    for (k in _g15) {
      if (isNaN(parseInt(k))) {
        var v = _g15[k];
        var x = f(v);
        if (is63(x)) {
          l[k] = x;
        }
      }
    }
    return(l);
  }
  function keys63(t) {
    var k = undefined;
    var k1 = undefined;
    var _g16 = t;
    for (k1 in _g16) {
      if (isNaN(parseInt(k1))) {
        var v = _g16[k1];
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
      var _g17 = args;
      for (k in _g17) {
        if (isNaN(parseInt(k))) {
          var v = _g17[k];
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
        var _g18 = l;
        for (k in _g18) {
          if (isNaN(parseInt(k))) {
            var v = _g18[k];
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
    var _g19 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g20 = _g19;
      for (k1 in _g20) {
        if (isNaN(parseInt(k1))) {
          var v = _g20[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g21 = sub(xs, 0);
    return(join(t, _g21));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g22 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g23 = t;
    for (k in _g23) {
      if (isNaN(parseInt(k))) {
        var v = _g23[k];
        if (!(_g22[k])) {
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
    var _g24 = sub(xs, 0);
    if (empty63(_g24)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g24));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g25 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g25));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g26 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g26)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g27));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g28 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g28)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g29 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g29)));
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
      var _g30 = x;
      for (k in _g30) {
        if (isNaN(parseInt(k))) {
          var v = _g30[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g31 = x1;
      while ((i < length(_g31))) {
        var y = _g31[i];
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
    var _g32 = stash(args);
    return((f.apply)(f, _g32));
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
  var _g33 = {};
  nexus.runtime = _g33;
  _g33.tl = tl;
  _g33.iterate = iterate;
  _g33.add = add;
  _g33.join = join;
  _g33.substring = substring;
  _g33["composite?"] = composite63;
  _g33.reverse = reverse;
  _g33.keep = keep;
  _g33.hd = hd;
  _g33["string-literal?"] = string_literal63;
  _g33["write-file"] = write_file;
  _g33["boolean?"] = boolean63;
  _g33.stash = stash;
  _g33.find = find;
  _g33["make-id"] = make_id;
  _g33.apply = apply;
  _g33["to-string"] = to_string;
  _g33["parse-number"] = parse_number;
  _g33.exit = exit;
  _g33.search = search;
  _g33.write = write;
  _g33.last = last;
  _g33.extend = extend;
  _g33.inner = inner;
  _g33.char = char;
  _g33["*"] = _42;
  _g33[">="] = _6261;
  _g33["="] = _61;
  _g33.drop = drop;
  _g33["id-literal?"] = id_literal63;
  _g33["atom?"] = atom63;
  _g33["table?"] = table63;
  _g33["<="] = _6061;
  _g33["number?"] = number63;
  _g33.cat = cat;
  _g33.split = split;
  _g33["empty?"] = empty63;
  _g33.exclude = exclude;
  _g33.setenv = setenv;
  _g33["function?"] = function63;
  _g33.unstash = unstash;
  _g33.pairwise = pairwise;
  _g33["nil?"] = nil63;
  _g33["keys?"] = keys63;
  _g33["is?"] = is63;
  _g33.code = code;
  _g33.map = map;
  _g33.replicate = replicate;
  _g33["some?"] = some63;
  _g33.splice = splice;
  _g33.reduce = reduce;
  _g33.length = length;
  _g33["read-file"] = read_file;
  _g33["<"] = _60;
  _g33[">"] = _62;
  _g33.sub = sub;
  _g33.sublist = sublist;
  _g33["%"] = _37;
  _g33["+"] = _43;
  _g33["list?"] = list63;
  _g33["-"] = _;
  _g33["string?"] = string63;
  _g33["/"] = _47;
  _g33["%message-handler"] = _37message_handler;
})();
(function () {
  var _g40 = nexus.runtime;
  var tl = _g40.tl;
  var atom63 = _g40["atom?"];
  var boolean63 = _g40["boolean?"];
  var write = _g40.write;
  var reduce = _g40.reduce;
  var _6061 = _g40["<="];
  var add = _g40.add;
  var join = _g40.join;
  var iterate = _g40.iterate;
  var make_id = _g40["make-id"];
  var substring = _g40.substring;
  var composite63 = _g40["composite?"];
  var to_string = _g40["to-string"];
  var parse_number = _g40["parse-number"];
  var function63 = _g40["function?"];
  var exit = _g40.exit;
  var pairwise = _g40.pairwise;
  var nil63 = _g40["nil?"];
  var _43 = _g40["+"];
  var is63 = _g40["is?"];
  var reverse = _g40.reverse;
  var code = _g40.code;
  var read_file = _g40["read-file"];
  var id_literal63 = _g40["id-literal?"];
  var _6261 = _g40[">="];
  var replicate = _g40.replicate;
  var some63 = _g40["some?"];
  var keep = _g40.keep;
  var string63 = _g40["string?"];
  var map = _g40.map;
  var hd = _g40.hd;
  var string_literal63 = _g40["string-literal?"];
  var write_file = _g40["write-file"];
  var split = _g40.split;
  var stash = _g40.stash;
  var _47 = _g40["/"];
  var length = _g40.length;
  var sub = _g40.sub;
  var find = _g40.find;
  var _42 = _g40["*"];
  var _61 = _g40["="];
  var _60 = _g40["<"];
  var last = _g40.last;
  var _62 = _g40[">"];
  var table63 = _g40["table?"];
  var number63 = _g40["number?"];
  var search = _g40.search;
  var exclude = _g40.exclude;
  var _37 = _g40["%"];
  var apply = _g40.apply;
  var sublist = _g40.sublist;
  var unstash = _g40.unstash;
  var extend = _g40.extend;
  var keys63 = _g40["keys?"];
  var inner = _g40.inner;
  var list63 = _g40["list?"];
  var _ = _g40["-"];
  var splice = _g40.splice;
  var setenv = _g40.setenv;
  var cat = _g40.cat;
  var char = _g40.char;
  var empty63 = _g40["empty?"];
  var drop = _g40.drop;
  var _37message_handler = _g40["%message-handler"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g41 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g42 = keys63(_g41);
        if (_g42) {
          return(b[_g42]);
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
      var _g43 = args;
      for (k in _g43) {
        if (isNaN(parseInt(k))) {
          var v = _g43[k];
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
      var _g44 = lh;
      while ((i < length(_g44))) {
        var x = _g44[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g45 = lh;
      for (k in _g45) {
        if (isNaN(parseInt(k))) {
          var v = _g45[k];
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
      var _g47 = 0;
      var _g46 = args;
      while ((_g47 < length(_g46))) {
        var arg = _g46[_g47];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g47 = (_g47 + 1);
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
        var _g35 = form[0];
        var _g48 = form[1];
        var t = _g48[0];
        var k = _g48[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g36 = form[0];
        var args = form[1];
        var _g49 = sub(form, 2);
        add(environment, {_scope: true});
        var _g51 = (function () {
          var _g53 = 0;
          var _g52 = args;
          while ((_g53 < length(_g52))) {
            var _g50 = _g52[_g53];
            setenv(_g50, {_stash: true, variable: true});
            _g53 = (_g53 + 1);
          }
          return(join(["%function", map(macroexpand, args)], macroexpand(_g49)));
        })();
        drop(environment);
        return(_g51);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g37 = form[0];
        var name = form[1];
        var _g54 = form[2];
        var _g55 = sub(form, 3);
        add(environment, {_scope: true});
        var _g57 = (function () {
          var _g59 = 0;
          var _g58 = _g54;
          while ((_g59 < length(_g58))) {
            var _g56 = _g58[_g59];
            setenv(_g56, {_stash: true, variable: true});
            _g59 = (_g59 + 1);
          }
          return(join([x, name, map(macroexpand, _g54)], macroexpand(_g55)));
        })();
        drop(environment);
        return(_g57);
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
    var _g60 = form;
    for (k in _g60) {
      if (isNaN(parseInt(k))) {
        var v = _g60[k];
        var _g61 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g61;
      }
    }
    var _g63 = 0;
    var _g62 = form;
    while ((_g63 < length(_g62))) {
      var x = _g62[_g63];
      if (quasisplice63(x, depth)) {
        var _g64 = quasiexpand(x[1]);
        add(xs, _g64);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g63 = (_g63 + 1);
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
  var reserved = {"<": true, "void": true, "catch": true, "this": true, "then": true, "for": true, "end": true, "+": true, "local": true, "var": true, "do": true, "repeat": true, ">": true, "not": true, "new": true, "try": true, "with": true, "else": true, "elseif": true, "nil": true, "typeof": true, "false": true, "true": true, ">=": true, "instanceof": true, "-": true, "or": true, "/": true, "switch": true, "delete": true, "debugger": true, "*": true, "in": true, "until": true, "while": true, "and": true, "function": true, "=": true, "throw": true, "return": true, "default": true, "%": true, "break": true, "continue": true, "if": true, "finally": true, "<=": true, "==": true, "case": true};
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
    var _g67 = toplevel;
    for (n in _g67) {
      if (isNaN(parseInt(n))) {
        var b = _g67[n];
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
      var _g68 = x;
      for (b in _g68) {
        if (isNaN(parseInt(b))) {
          var _g38 = _g68[b];
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
    var _g69 = t;
    for (k in _g69) {
      if (isNaN(parseInt(k))) {
        var v = _g69[k];
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
    return(join(["%object"], mapo(function (_g39, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g70 = ["table"];
      _g70.export = quote_frame(m.export);
      _g70.import = quoted(m.import);
      return(_g70);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g71 = {};
  nexus.utilities = _g71;
  _g71.quoted = quoted;
  _g71.quasiexpand = quasiexpand;
  _g71["stash*"] = stash42;
  _g71["bound?"] = bound63;
  _g71["to-id"] = to_id;
  _g71["bind*"] = bind42;
  _g71["initial-environment"] = initial_environment;
  _g71["quote-modules"] = quote_modules;
  _g71["quote-environment"] = quote_environment;
  _g71.mapo = mapo;
  _g71.exported = exported;
  _g71["module-key"] = module_key;
  _g71["special-form?"] = special_form63;
  _g71["valid-id?"] = valid_id63;
  _g71.indentation = indentation;
  _g71.macroexpand = macroexpand;
  _g71.bind = bind;
  _g71["macro?"] = macro63;
  _g71["variable?"] = variable63;
  _g71["symbol?"] = symbol63;
  _g71["symbol-expansion"] = symbol_expansion;
  _g71["special?"] = special63;
  _g71.getenv = getenv;
  _g71["macro-function"] = macro_function;
  _g71.imported = imported;
})();
(function () {
  var _g73 = nexus.runtime;
  var tl = _g73.tl;
  var atom63 = _g73["atom?"];
  var boolean63 = _g73["boolean?"];
  var write = _g73.write;
  var reduce = _g73.reduce;
  var _6061 = _g73["<="];
  var add = _g73.add;
  var join = _g73.join;
  var iterate = _g73.iterate;
  var make_id = _g73["make-id"];
  var substring = _g73.substring;
  var composite63 = _g73["composite?"];
  var to_string = _g73["to-string"];
  var parse_number = _g73["parse-number"];
  var function63 = _g73["function?"];
  var exit = _g73.exit;
  var pairwise = _g73.pairwise;
  var nil63 = _g73["nil?"];
  var _43 = _g73["+"];
  var is63 = _g73["is?"];
  var reverse = _g73.reverse;
  var code = _g73.code;
  var read_file = _g73["read-file"];
  var id_literal63 = _g73["id-literal?"];
  var _6261 = _g73[">="];
  var replicate = _g73.replicate;
  var some63 = _g73["some?"];
  var keep = _g73.keep;
  var string63 = _g73["string?"];
  var map = _g73.map;
  var hd = _g73.hd;
  var string_literal63 = _g73["string-literal?"];
  var write_file = _g73["write-file"];
  var split = _g73.split;
  var stash = _g73.stash;
  var _47 = _g73["/"];
  var length = _g73.length;
  var sub = _g73.sub;
  var find = _g73.find;
  var _42 = _g73["*"];
  var _61 = _g73["="];
  var _60 = _g73["<"];
  var last = _g73.last;
  var _62 = _g73[">"];
  var table63 = _g73["table?"];
  var number63 = _g73["number?"];
  var search = _g73.search;
  var exclude = _g73.exclude;
  var _37 = _g73["%"];
  var apply = _g73.apply;
  var sublist = _g73.sublist;
  var unstash = _g73.unstash;
  var extend = _g73.extend;
  var keys63 = _g73["keys?"];
  var inner = _g73.inner;
  var list63 = _g73["list?"];
  var _ = _g73["-"];
  var splice = _g73.splice;
  var setenv = _g73.setenv;
  var cat = _g73.cat;
  var char = _g73.char;
  var empty63 = _g73["empty?"];
  var drop = _g73.drop;
  var _37message_handler = _g73["%message-handler"];
  var delimiters = {"\n": true, "(": true, ";": true, ")": true};
  var whitespace = {"\n": true, "\t": true, " ": true};
  function make_stream(str) {
    return({len: length(str), pos: 0, string: str});
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
  var _g79 = {};
  nexus.reader = _g79;
  _g79["read-from-string"] = read_from_string;
  _g79["read-all"] = read_all;
  _g79.read = read;
  _g79["read-table"] = read_table;
  _g79["make-stream"] = make_stream;
})();
(function () {
  var _g81 = nexus.runtime;
  var tl = _g81.tl;
  var atom63 = _g81["atom?"];
  var boolean63 = _g81["boolean?"];
  var write = _g81.write;
  var reduce = _g81.reduce;
  var _6061 = _g81["<="];
  var add = _g81.add;
  var join = _g81.join;
  var iterate = _g81.iterate;
  var make_id = _g81["make-id"];
  var substring = _g81.substring;
  var composite63 = _g81["composite?"];
  var to_string = _g81["to-string"];
  var parse_number = _g81["parse-number"];
  var function63 = _g81["function?"];
  var exit = _g81.exit;
  var pairwise = _g81.pairwise;
  var nil63 = _g81["nil?"];
  var _43 = _g81["+"];
  var is63 = _g81["is?"];
  var reverse = _g81.reverse;
  var code = _g81.code;
  var read_file = _g81["read-file"];
  var id_literal63 = _g81["id-literal?"];
  var _6261 = _g81[">="];
  var replicate = _g81.replicate;
  var some63 = _g81["some?"];
  var keep = _g81.keep;
  var string63 = _g81["string?"];
  var map = _g81.map;
  var hd = _g81.hd;
  var string_literal63 = _g81["string-literal?"];
  var write_file = _g81["write-file"];
  var split = _g81.split;
  var stash = _g81.stash;
  var _47 = _g81["/"];
  var length = _g81.length;
  var sub = _g81.sub;
  var find = _g81.find;
  var _42 = _g81["*"];
  var _61 = _g81["="];
  var _60 = _g81["<"];
  var last = _g81.last;
  var _62 = _g81[">"];
  var table63 = _g81["table?"];
  var number63 = _g81["number?"];
  var search = _g81.search;
  var exclude = _g81.exclude;
  var _37 = _g81["%"];
  var apply = _g81.apply;
  var sublist = _g81.sublist;
  var unstash = _g81.unstash;
  var extend = _g81.extend;
  var keys63 = _g81["keys?"];
  var inner = _g81.inner;
  var list63 = _g81["list?"];
  var _ = _g81["-"];
  var splice = _g81.splice;
  var setenv = _g81.setenv;
  var cat = _g81.cat;
  var char = _g81.char;
  var empty63 = _g81["empty?"];
  var drop = _g81.drop;
  var _37message_handler = _g81["%message-handler"];
  var _g82 = nexus.utilities;
  var to_id = _g82["to-id"];
  var quoted = _g82.quoted;
  var bind = _g82.bind;
  var macro_function = _g82["macro-function"];
  var symbol63 = _g82["symbol?"];
  var macroexpand = _g82.macroexpand;
  var symbol_expansion = _g82["symbol-expansion"];
  var quasiexpand = _g82.quasiexpand;
  var valid_id63 = _g82["valid-id?"];
  var special63 = _g82["special?"];
  var quote_modules = _g82["quote-modules"];
  var bind42 = _g82["bind*"];
  var imported = _g82.imported;
  var bound63 = _g82["bound?"];
  var stash42 = _g82["stash*"];
  var getenv = _g82.getenv;
  var quote_environment = _g82["quote-environment"];
  var mapo = _g82.mapo;
  var exported = _g82.exported;
  var module_key = _g82["module-key"];
  var variable63 = _g82["variable?"];
  var indentation = _g82.indentation;
  var initial_environment = _g82["initial-environment"];
  var macro63 = _g82["macro?"];
  var special_form63 = _g82["special-form?"];
  var _g83 = nexus.reader;
  var read_table = _g83["read-table"];
  var make_stream = _g83["make-stream"];
  var read = _g83.read;
  var read_from_string = _g83["read-from-string"];
  var read_all = _g83["read-all"];
  var infix = {js: {"=": "===", "or": "||", "~=": "!=", "and": "&&", cat: "+"}, common: {"%": true, "<=": true, "+": true, "*": true, "-": true, "<": true, "/": true, ">": true, ">=": true}, lua: {"=": "==", "or": true, cat: "..", "and": true, "~=": true}};
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
    var _g84 = args;
    while ((i < length(_g84))) {
      var arg = _g84[i];
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
    var _g85 = unstash(sublist(arguments, 1));
    var tail63 = _g85["tail?"];
    var str = "";
    var i = 0;
    var _g86 = forms;
    while ((i < length(_g86))) {
      var x = _g86[i];
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
    var _g87 = getenv(hd(form));
    var self_tr63 = _g87.tr;
    var stmt = _g87.stmt;
    var special = _g87.special;
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
  function compile_infix(_g88) {
    var op = _g88[0];
    var args = sub(_g88, 1);
    var str = "(";
    var _g89 = getop(op);
    var i = 0;
    var _g90 = args;
    while ((i < length(_g90))) {
      var arg = _g90[i];
      if (((_g89 === "-") && (length(args) === 1))) {
        str = (str + _g89 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g89 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g91 = (function () {
      indent_level = (indent_level + 1);
      var _g92 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g92);
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
      return((ind + "if (" + cond1 + ") {\n" + _g91 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g91 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g91 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g91 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g91 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g91 + tr));
    }
  }
  function compile_function(args, body) {
    var _g93 = unstash(sublist(arguments, 2));
    var name = _g93.name;
    var prefix = _g93.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g94 = (prefix || "");
    var _g95 = compile_args(args);
    var _g96 = (function () {
      indent_level = (indent_level + 1);
      var _g97 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g97);
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
      return(("function " + id + _g95 + " {\n" + _g96 + ind + "}" + tr));
    } else {
      return((_g94 + "function " + id + _g95 + "\n" + _g96 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g98 = unstash(sublist(arguments, 1));
    var tail63 = _g98["tail?"];
    var stmt63 = _g98["stmt?"];
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
      var _g99 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g99 + tr));
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
    var _g100 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g100, [epilog]))]));
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
    var _g114 = toplevel;
    for (name in _g114) {
      if (isNaN(parseInt(name))) {
        var binding = _g114[name];
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
    var _g115 = m.export;
    for (k in _g115) {
      if (isNaN(parseInt(k))) {
        var v = _g115[k];
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
  var _g116 = {};
  nexus.compiler = _g116;
  _g116["compile-module"] = compile_module;
  _g116["compile-body"] = compile_body;
  _g116.compile = compile;
  _g116["open-module"] = open_module;
  _g116["compile-call"] = compile_call;
  _g116["load-module"] = load_module;
  _g116.eval = eval;
  _g116["in-module"] = in_module;
  _g116["compile-special"] = compile_special;
  _g116["compile-function"] = compile_function;
  _g116["compile-branch"] = compile_branch;
})();
(function () {
  var _g119 = nexus.runtime;
  var tl = _g119.tl;
  var atom63 = _g119["atom?"];
  var boolean63 = _g119["boolean?"];
  var write = _g119.write;
  var reduce = _g119.reduce;
  var _6061 = _g119["<="];
  var add = _g119.add;
  var join = _g119.join;
  var iterate = _g119.iterate;
  var make_id = _g119["make-id"];
  var substring = _g119.substring;
  var composite63 = _g119["composite?"];
  var to_string = _g119["to-string"];
  var parse_number = _g119["parse-number"];
  var function63 = _g119["function?"];
  var exit = _g119.exit;
  var pairwise = _g119.pairwise;
  var nil63 = _g119["nil?"];
  var _43 = _g119["+"];
  var is63 = _g119["is?"];
  var reverse = _g119.reverse;
  var code = _g119.code;
  var read_file = _g119["read-file"];
  var id_literal63 = _g119["id-literal?"];
  var _6261 = _g119[">="];
  var replicate = _g119.replicate;
  var some63 = _g119["some?"];
  var keep = _g119.keep;
  var string63 = _g119["string?"];
  var map = _g119.map;
  var hd = _g119.hd;
  var string_literal63 = _g119["string-literal?"];
  var write_file = _g119["write-file"];
  var split = _g119.split;
  var stash = _g119.stash;
  var _47 = _g119["/"];
  var length = _g119.length;
  var sub = _g119.sub;
  var find = _g119.find;
  var _42 = _g119["*"];
  var _61 = _g119["="];
  var _60 = _g119["<"];
  var last = _g119.last;
  var _62 = _g119[">"];
  var table63 = _g119["table?"];
  var number63 = _g119["number?"];
  var search = _g119.search;
  var exclude = _g119.exclude;
  var _37 = _g119["%"];
  var apply = _g119.apply;
  var sublist = _g119.sublist;
  var unstash = _g119.unstash;
  var extend = _g119.extend;
  var keys63 = _g119["keys?"];
  var inner = _g119.inner;
  var list63 = _g119["list?"];
  var _ = _g119["-"];
  var splice = _g119.splice;
  var setenv = _g119.setenv;
  var cat = _g119.cat;
  var char = _g119.char;
  var empty63 = _g119["empty?"];
  var drop = _g119.drop;
  var _37message_handler = _g119["%message-handler"];
  var _g120 = nexus.utilities;
  var to_id = _g120["to-id"];
  var quoted = _g120.quoted;
  var bind = _g120.bind;
  var macro_function = _g120["macro-function"];
  var symbol63 = _g120["symbol?"];
  var macroexpand = _g120.macroexpand;
  var symbol_expansion = _g120["symbol-expansion"];
  var quasiexpand = _g120.quasiexpand;
  var valid_id63 = _g120["valid-id?"];
  var special63 = _g120["special?"];
  var quote_modules = _g120["quote-modules"];
  var bind42 = _g120["bind*"];
  var imported = _g120.imported;
  var bound63 = _g120["bound?"];
  var stash42 = _g120["stash*"];
  var getenv = _g120.getenv;
  var quote_environment = _g120["quote-environment"];
  var mapo = _g120.mapo;
  var exported = _g120.exported;
  var module_key = _g120["module-key"];
  var variable63 = _g120["variable?"];
  var indentation = _g120.indentation;
  var initial_environment = _g120["initial-environment"];
  var macro63 = _g120["macro?"];
  var special_form63 = _g120["special-form?"];
  var _g121 = nexus.compiler;
  var compile = _g121.compile;
  var compile_function = _g121["compile-function"];
  var compile_call = _g121["compile-call"];
  var compile_branch = _g121["compile-branch"];
  var compile_special = _g121["compile-special"];
  var open_module = _g121["open-module"];
  var eval = _g121.eval;
  var compile_module = _g121["compile-module"];
  var in_module = _g121["in-module"];
  var load_module = _g121["load-module"];
  var compile_body = _g121["compile-body"];
})();
(function () {
  var _g227 = nexus.runtime;
  var tl = _g227.tl;
  var atom63 = _g227["atom?"];
  var boolean63 = _g227["boolean?"];
  var write = _g227.write;
  var reduce = _g227.reduce;
  var _6061 = _g227["<="];
  var add = _g227.add;
  var join = _g227.join;
  var iterate = _g227.iterate;
  var make_id = _g227["make-id"];
  var substring = _g227.substring;
  var composite63 = _g227["composite?"];
  var to_string = _g227["to-string"];
  var parse_number = _g227["parse-number"];
  var function63 = _g227["function?"];
  var exit = _g227.exit;
  var pairwise = _g227.pairwise;
  var nil63 = _g227["nil?"];
  var _43 = _g227["+"];
  var is63 = _g227["is?"];
  var reverse = _g227.reverse;
  var code = _g227.code;
  var read_file = _g227["read-file"];
  var id_literal63 = _g227["id-literal?"];
  var _6261 = _g227[">="];
  var replicate = _g227.replicate;
  var some63 = _g227["some?"];
  var keep = _g227.keep;
  var string63 = _g227["string?"];
  var map = _g227.map;
  var hd = _g227.hd;
  var string_literal63 = _g227["string-literal?"];
  var write_file = _g227["write-file"];
  var split = _g227.split;
  var stash = _g227.stash;
  var _47 = _g227["/"];
  var length = _g227.length;
  var sub = _g227.sub;
  var find = _g227.find;
  var _42 = _g227["*"];
  var _61 = _g227["="];
  var _60 = _g227["<"];
  var last = _g227.last;
  var _62 = _g227[">"];
  var table63 = _g227["table?"];
  var number63 = _g227["number?"];
  var search = _g227.search;
  var exclude = _g227.exclude;
  var _37 = _g227["%"];
  var apply = _g227.apply;
  var sublist = _g227.sublist;
  var unstash = _g227.unstash;
  var extend = _g227.extend;
  var keys63 = _g227["keys?"];
  var inner = _g227.inner;
  var list63 = _g227["list?"];
  var _ = _g227["-"];
  var splice = _g227.splice;
  var setenv = _g227.setenv;
  var cat = _g227.cat;
  var char = _g227.char;
  var empty63 = _g227["empty?"];
  var drop = _g227.drop;
  var _37message_handler = _g227["%message-handler"];
  var _g228 = nexus.utilities;
  var to_id = _g228["to-id"];
  var quoted = _g228.quoted;
  var bind = _g228.bind;
  var macro_function = _g228["macro-function"];
  var symbol63 = _g228["symbol?"];
  var macroexpand = _g228.macroexpand;
  var symbol_expansion = _g228["symbol-expansion"];
  var quasiexpand = _g228.quasiexpand;
  var valid_id63 = _g228["valid-id?"];
  var special63 = _g228["special?"];
  var quote_modules = _g228["quote-modules"];
  var bind42 = _g228["bind*"];
  var imported = _g228.imported;
  var bound63 = _g228["bound?"];
  var stash42 = _g228["stash*"];
  var getenv = _g228.getenv;
  var quote_environment = _g228["quote-environment"];
  var mapo = _g228.mapo;
  var exported = _g228.exported;
  var module_key = _g228["module-key"];
  var variable63 = _g228["variable?"];
  var indentation = _g228.indentation;
  var initial_environment = _g228["initial-environment"];
  var macro63 = _g228["macro?"];
  var special_form63 = _g228["special-form?"];
  var _g229 = nexus.compiler;
  var compile = _g229.compile;
  var compile_function = _g229["compile-function"];
  var compile_call = _g229["compile-call"];
  var compile_branch = _g229["compile-branch"];
  var compile_special = _g229["compile-special"];
  var open_module = _g229["open-module"];
  var eval = _g229.eval;
  var compile_module = _g229["compile-module"];
  var in_module = _g229["in-module"];
  var load_module = _g229["load-module"];
  var compile_body = _g229["compile-body"];
  global.target = "js";
})();
(function () {
  var _g384 = nexus.runtime;
  var tl = _g384.tl;
  var atom63 = _g384["atom?"];
  var boolean63 = _g384["boolean?"];
  var write = _g384.write;
  var reduce = _g384.reduce;
  var _6061 = _g384["<="];
  var add = _g384.add;
  var join = _g384.join;
  var iterate = _g384.iterate;
  var make_id = _g384["make-id"];
  var substring = _g384.substring;
  var composite63 = _g384["composite?"];
  var to_string = _g384["to-string"];
  var parse_number = _g384["parse-number"];
  var function63 = _g384["function?"];
  var exit = _g384.exit;
  var pairwise = _g384.pairwise;
  var nil63 = _g384["nil?"];
  var _43 = _g384["+"];
  var is63 = _g384["is?"];
  var reverse = _g384.reverse;
  var code = _g384.code;
  var read_file = _g384["read-file"];
  var id_literal63 = _g384["id-literal?"];
  var _6261 = _g384[">="];
  var replicate = _g384.replicate;
  var some63 = _g384["some?"];
  var keep = _g384.keep;
  var string63 = _g384["string?"];
  var map = _g384.map;
  var hd = _g384.hd;
  var string_literal63 = _g384["string-literal?"];
  var write_file = _g384["write-file"];
  var split = _g384.split;
  var stash = _g384.stash;
  var _47 = _g384["/"];
  var length = _g384.length;
  var sub = _g384.sub;
  var find = _g384.find;
  var _42 = _g384["*"];
  var _61 = _g384["="];
  var _60 = _g384["<"];
  var last = _g384.last;
  var _62 = _g384[">"];
  var table63 = _g384["table?"];
  var number63 = _g384["number?"];
  var search = _g384.search;
  var exclude = _g384.exclude;
  var _37 = _g384["%"];
  var apply = _g384.apply;
  var sublist = _g384.sublist;
  var unstash = _g384.unstash;
  var extend = _g384.extend;
  var keys63 = _g384["keys?"];
  var inner = _g384.inner;
  var list63 = _g384["list?"];
  var _ = _g384["-"];
  var splice = _g384.splice;
  var setenv = _g384.setenv;
  var cat = _g384.cat;
  var char = _g384.char;
  var empty63 = _g384["empty?"];
  var drop = _g384.drop;
  var _37message_handler = _g384["%message-handler"];
  var _g385 = nexus.utilities;
  var to_id = _g385["to-id"];
  var quoted = _g385.quoted;
  var bind = _g385.bind;
  var macro_function = _g385["macro-function"];
  var symbol63 = _g385["symbol?"];
  var macroexpand = _g385.macroexpand;
  var symbol_expansion = _g385["symbol-expansion"];
  var quasiexpand = _g385.quasiexpand;
  var valid_id63 = _g385["valid-id?"];
  var special63 = _g385["special?"];
  var quote_modules = _g385["quote-modules"];
  var bind42 = _g385["bind*"];
  var imported = _g385.imported;
  var bound63 = _g385["bound?"];
  var stash42 = _g385["stash*"];
  var getenv = _g385.getenv;
  var quote_environment = _g385["quote-environment"];
  var mapo = _g385.mapo;
  var exported = _g385.exported;
  var module_key = _g385["module-key"];
  var variable63 = _g385["variable?"];
  var indentation = _g385.indentation;
  var initial_environment = _g385["initial-environment"];
  var macro63 = _g385["macro?"];
  var special_form63 = _g385["special-form?"];
  var _g386 = nexus.compiler;
  var compile = _g386.compile;
  var compile_function = _g386["compile-function"];
  var compile_call = _g386["compile-call"];
  var compile_branch = _g386["compile-branch"];
  var compile_special = _g386["compile-special"];
  var open_module = _g386["open-module"];
  var eval = _g386.eval;
  var compile_module = _g386["compile-module"];
  var in_module = _g386["in-module"];
  var load_module = _g386["load-module"];
  var compile_body = _g386["compile-body"];
  global.modules = {system: {import: ["special", "core"], export: {nexus: {module: "system", export: true, global: true}}}, runtime: {import: ["special", "core"], export: {tl: {module: "runtime", export: true, variable: true}, "parse-number": {module: "runtime", export: true, variable: true}, split: {module: "runtime", export: true, variable: true}, add: {module: "runtime", export: true, variable: true}, join: {module: "runtime", export: true, variable: true}, "make-id": {module: "runtime", export: true, variable: true}, substring: {module: "runtime", export: true, variable: true}, "composite?": {module: "runtime", export: true, variable: true}, reverse: {module: "runtime", export: true, variable: true}, "to-string": {module: "runtime", export: true, variable: true}, map: {module: "runtime", export: true, variable: true}, hd: {module: "runtime", export: true, variable: true}, "string-literal?": {module: "runtime", export: true, variable: true}, "write-file": {module: "runtime", export: true, variable: true}, stash: {module: "runtime", export: true, variable: true}, find: {module: "runtime", export: true, variable: true}, "table?": {module: "runtime", export: true, variable: true}, search: {module: "runtime", export: true, variable: true}, apply: {module: "runtime", export: true, variable: true}, print: {module: "runtime", export: true, global: true}, extend: {module: "runtime", export: true, variable: true}, drop: {module: "runtime", export: true, variable: true}, char: {module: "runtime", export: true, variable: true}, setenv: {module: "runtime", export: true, variable: true}, cat: {module: "runtime", export: true, variable: true}, splice: {module: "runtime", export: true, variable: true}, reduce: {module: "runtime", export: true, variable: true}, "<=": {module: "runtime", export: true, variable: true}, "empty?": {module: "runtime", export: true, variable: true}, "function?": {module: "runtime", export: true, variable: true}, pairwise: {module: "runtime", export: true, variable: true}, "nil?": {module: "runtime", export: true, variable: true}, "is?": {module: "runtime", export: true, variable: true}, code: {module: "runtime", export: true, variable: true}, "id-literal?": {module: "runtime", export: true, variable: true}, replicate: {module: "runtime", export: true, variable: true}, "some?": {module: "runtime", export: true, variable: true}, ">=": {module: "runtime", export: true, variable: true}, "string?": {module: "runtime", export: true, variable: true}, last: {module: "runtime", export: true, variable: true}, exclude: {module: "runtime", export: true, variable: true}, length: {module: "runtime", export: true, variable: true}, sub: {module: "runtime", export: true, variable: true}, "read-file": {module: "runtime", export: true, variable: true}, "=": {module: "runtime", export: true, variable: true}, "<": {module: "runtime", export: true, variable: true}, ">": {module: "runtime", export: true, variable: true}, "number?": {module: "runtime", export: true, variable: true}, inner: {module: "runtime", export: true, variable: true}, "%": {module: "runtime", export: true, variable: true}, "atom?": {module: "runtime", export: true, variable: true}, sublist: {module: "runtime", export: true, variable: true}, "list?": {module: "runtime", export: true, variable: true}, write: {module: "runtime", export: true, variable: true}, iterate: {module: "runtime", export: true, variable: true}, "+": {module: "runtime", export: true, variable: true}, "*": {module: "runtime", export: true, variable: true}, "-": {module: "runtime", export: true, variable: true}, "keys?": {module: "runtime", export: true, variable: true}, "/": {module: "runtime", export: true, variable: true}, unstash: {module: "runtime", export: true, variable: true}, "boolean?": {module: "runtime", export: true, variable: true}, exit: {module: "runtime", export: true, variable: true}, keep: {module: "runtime", export: true, variable: true}, "%message-handler": {module: "runtime", export: true, variable: true}}}, utilities: {import: ["runtime", "special", "core"], export: {"to-id": {module: "utilities", export: true, variable: true}, exported: {module: "utilities", export: true, variable: true}, "stash*": {module: "utilities", export: true, variable: true}, indentation: {module: "utilities", export: true, variable: true}, "symbol?": {module: "utilities", export: true, variable: true}, "module-key": {module: "utilities", export: true, variable: true}, "symbol-expansion": {module: "utilities", export: true, variable: true}, "special-form?": {module: "utilities", export: true, variable: true}, "with-indent": {module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, export: true}, "special?": {module: "utilities", export: true, variable: true}, "macro?": {module: "utilities", export: true, variable: true}, "quote-modules": {module: "utilities", export: true, variable: true}, "macro-function": {module: "utilities", export: true, variable: true}, "bind*": {module: "utilities", export: true, variable: true}, imported: {module: "utilities", export: true, variable: true}, mapo: {module: "utilities", export: true, variable: true}, "valid-id?": {module: "utilities", export: true, variable: true}, getenv: {module: "utilities", export: true, variable: true}, bind: {module: "utilities", export: true, variable: true}, macroexpand: {module: "utilities", export: true, variable: true}, "indent-level": {module: "utilities", export: true, global: true}, quoted: {module: "utilities", export: true, variable: true}, "variable?": {module: "utilities", export: true, variable: true}, "bound?": {module: "utilities", export: true, variable: true}, "initial-environment": {module: "utilities", export: true, variable: true}, "quote-environment": {module: "utilities", export: true, variable: true}, quasiexpand: {module: "utilities", export: true, variable: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%array": {module: "special", export: true, special: function (forms) {
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
    var _g393 = forms;
    while ((i < length(_g393))) {
      var x = _g393[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "%function": {module: "special", export: true, special: function (_g394) {
    var args = _g394[0];
    var body = sub(_g394, 1);
    return(compile_function(args, body));
  }}, "break": {stmt: true, module: "special", export: true, special: function (_g118) {
    return((indentation() + "break"));
  }}, "set": {stmt: true, module: "special", export: true, special: function (_g395) {
    var lh = _g395[0];
    var rh = _g395[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "error": {stmt: true, module: "special", export: true, special: function (_g396) {
    var x = _g396[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "%try": {module: "special", stmt: true, tr: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g397 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g397);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g398 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g398);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "do": {module: "special", stmt: true, tr: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "%local": {stmt: true, module: "special", export: true, special: function (_g399) {
    var name = _g399[0];
    var value = _g399[1];
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
  }}, "while": {module: "special", stmt: true, tr: true, export: true, special: function (_g400) {
    var condition = _g400[0];
    var body = sub(_g400, 1);
    var _g401 = compile(condition);
    var _g402 = (function () {
      indent_level = (indent_level + 1);
      var _g403 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g403);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g401 + ") {\n" + _g402 + ind + "}\n"));
    } else {
      return((ind + "while " + _g401 + " do\n" + _g402 + ind + "end\n"));
    }
  }}, "get": {module: "special", export: true, special: function (_g404) {
    var t = _g404[0];
    var k = _g404[1];
    var _g405 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g405, 0) === "{"))) {
      _g405 = ("(" + _g405 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g405 + "." + inner(k)));
    } else {
      return((_g405 + "[" + k1 + "]"));
    }
  }}, "return": {stmt: true, module: "special", export: true, special: function (_g406) {
    var x = _g406[0];
    var _g407 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g407));
  }}, "%local-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g408) {
    var name = _g408[0];
    var args = _g408[1];
    var body = sub(_g408, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "not": {module: "special", export: true, special: function (_g409) {
    var x = _g409[0];
    var _g410 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g410 + ")"));
  }}, "%object": {module: "special", export: true, special: function (forms) {
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
    var _g411 = pairs;
    while ((i < length(_g411))) {
      var _g412 = _g411[i];
      var k = _g412[0];
      var v = _g412[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g413 = compile(v);
      var _g414 = (function () {
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
      str = (str + _g414 + sep + _g413);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "if": {module: "special", stmt: true, tr: true, export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g415 = form;
    while ((i < length(_g415))) {
      var condition = _g415[i];
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
  }}, "%global-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g416) {
    var name = _g416[0];
    var args = _g416[1];
    var body = sub(_g416, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }}, "%for": {module: "special", stmt: true, tr: true, export: true, special: function (_g417) {
    var _g418 = _g417[0];
    var t = _g418[0];
    var k = _g418[1];
    var body = sub(_g417, 1);
    var _g419 = compile(t);
    var ind = indentation();
    var _g420 = (function () {
      indent_level = (indent_level + 1);
      var _g421 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g421);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g419 + " do\n" + _g420 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g419 + ") {\n" + _g420 + ind + "}\n"));
    }
  }}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {compile: {module: "compiler", export: true, variable: true}, "compile-function": {module: "compiler", export: true, variable: true}, "compile-call": {module: "compiler", export: true, variable: true}, "compile-branch": {module: "compiler", export: true, variable: true}, "compile-special": {module: "compiler", export: true, variable: true}, "load-module": {module: "compiler", export: true, variable: true}, "in-module": {module: "compiler", export: true, variable: true}, "open-module": {module: "compiler", export: true, variable: true}, eval: {module: "compiler", export: true, variable: true}, "current-module": {module: "compiler", export: true, global: true}, "define-module": {module: "compiler", export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g422 = sub(body, 0);
    var imports = [];
    var imp = _g422.import;
    var exp = _g422.export;
    var _g424 = 0;
    var _g423 = (imp || []);
    while ((_g424 < length(_g423))) {
      var k = _g423[_g424];
      load_module(k);
      imports = join(imports, imported(k));
      _g424 = (_g424 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g426 = 0;
    var _g425 = (exp || []);
    while ((_g426 < length(_g425))) {
      var k = _g425[_g426];
      setenv(k, {_stash: true, export: true});
      _g426 = (_g426 + 1);
    }
    return(join(["do"], imports));
  }}, "compile-module": {module: "compiler", export: true, variable: true}, "compile-body": {module: "compiler", export: true, variable: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {"read-all": {module: "reader", export: true, variable: true}, "read-from-string": {module: "reader", export: true, variable: true}, "make-stream": {module: "reader", export: true, variable: true}, read: {module: "reader", export: true, variable: true}, "read-table": {module: "reader", export: true, variable: true}, "define-reader": {module: "reader", macro: function (_g427) {
    var char = _g427[0];
    var stream = _g427[1];
    var body = unstash(sublist(arguments, 1));
    var _g428 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g428)]));
  }, export: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {each: {module: "core", export: true, macro: function (_g429) {
    var t = _g429[0];
    var k = _g429[1];
    var v = _g429[2];
    var body = unstash(sublist(arguments, 1));
    var _g430 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g431 = ["target"];
      _g431.js = join(["isNaN", join(["parseInt", k])]);
      _g431.lua = join(["not", join(["number?", k])]);
      return(_g431);
    })()), join(["let", join([v, join(["get", t1, k])])], _g430)])])]));
  }}, at: {module: "core", export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }}, across: {module: "core", export: true, macro: function (_g432) {
    var l = _g432[0];
    var v = _g432[1];
    var i = _g432[2];
    var start = _g432[3];
    var body = unstash(sublist(arguments, 1));
    var _g433 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g433, [join(["inc", i])]))])]));
  }}, "let-macro": {module: "core", export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g434 = sub(body, 0);
    add(environment, {});
    var _g435 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g434)));
    })();
    drop(environment);
    return(_g435);
  }}, define: {module: "core", export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g436 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g436))) {
      var _g437 = bind42(x, _g436);
      var args = _g437[0];
      var _g438 = _g437[1];
      return(join(["%local-function", name, args], _g438));
    } else {
      return(join(["%local", name, x]));
    }
  }}, list: {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g439 = body;
      for (k in _g439) {
        if (isNaN(parseInt(k))) {
          var v = _g439[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, "with-bindings": {module: "core", export: true, macro: function (_g440) {
    var names = _g440[0];
    var body = unstash(sublist(arguments, 1));
    var _g441 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g442 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g443 = ["setenv", x];
        _g443.variable = true;
        return(_g443);
      })())])];
      _g442.scope = true;
      return(_g442);
    })(), _g441));
  }}, "define-symbol": {module: "core", export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, pr: {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g444 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g444)]));
  }}, "let-symbol": {module: "core", export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g445 = sub(body, 0);
    add(environment, {});
    var _g446 = (function () {
      map(function (_g447) {
        var name = _g447[0];
        var exp = _g447[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g445)));
    })();
    drop(environment);
    return(_g446);
  }}, guard: {module: "core", export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, "set-of": {module: "core", export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g449 = 0;
    var _g448 = elements;
    while ((_g449 < length(_g448))) {
      var e = _g448[_g449];
      l[e] = true;
      _g449 = (_g449 + 1);
    }
    return(join(["table"], l));
  }}, quasiquote: {module: "core", export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, table: {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g226, x) {
      return(x);
    }, body)));
  }}, "define-special": {module: "core", export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g450 = sub(body, 0);
    var form = join(["fn", args], _g450);
    var keys = sub(_g450, length(_g450));
    eval(join((function () {
      var _g451 = ["setenv", join(["quote", name])];
      _g451.special = form;
      _g451.form = join(["quote", form]);
      return(_g451);
    })(), keys));
    return(undefined);
  }}, inc: {module: "core", export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, dec: {module: "core", export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, fn: {module: "core", export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g452 = sub(body, 0);
    var _g453 = bind42(args, _g452);
    var _g454 = _g453[0];
    var _g455 = _g453[1];
    return(join(["%function", _g454], _g455));
  }}, let: {module: "core", export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g456 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g457) {
      var lh = _g457[0];
      var rh = _g457[1];
      var _g459 = 0;
      var _g458 = bind(lh, rh);
      while ((_g459 < length(_g458))) {
        var _g460 = _g458[_g459];
        var id = _g460[0];
        var val = _g460[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g459 = (_g459 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g456)])));
  }}, "define-macro": {module: "core", export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g461 = sub(body, 0);
    var form = join(["fn", args], _g461);
    eval(join((function () {
      var _g462 = ["setenv", join(["quote", name])];
      _g462.macro = form;
      _g462.form = join(["quote", form]);
      return(_g462);
    })()));
    return(undefined);
  }}, "join*": {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, "list*": {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g463 = xs;
      while ((i < length(_g463))) {
        var x = _g463[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, "with-frame": {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g464 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g465 = ["table"];
      _g465._scope = scope;
      return(_g465);
    })())]), join(["let", join([x, join(["do"], _g464)]), join(["drop", "environment"]), x])]));
  }}, language: {module: "core", export: true, macro: function () {
    return(join(["quote", target]));
  }}, "cat!": {module: "core", export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g466 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g466)]));
  }}, quote: {module: "core", export: true, macro: function (form) {
    return(quoted(form));
  }}, "define*": {module: "core", export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g467 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g467))) {
      var _g468 = bind42(x, _g467);
      var args = _g468[0];
      var _g469 = _g468[1];
      return(join(["%global-function", name, args], _g469));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }}, target: {export: true, module: "core", macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, global: true}, "join!": {module: "core", export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g470 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g470)]));
  }}}}, lib: {import: ["core", "special"], export: {}}};
  global.environment = [{"define-module": {module: "compiler", export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g471 = sub(body, 0);
    var imports = [];
    var imp = _g471.import;
    var exp = _g471.export;
    var _g473 = 0;
    var _g472 = (imp || []);
    while ((_g473 < length(_g472))) {
      var k = _g472[_g473];
      load_module(k);
      imports = join(imports, imported(k));
      _g473 = (_g473 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g475 = 0;
    var _g474 = (exp || []);
    while ((_g475 < length(_g474))) {
      var k = _g474[_g475];
      setenv(k, {_stash: true, export: true});
      _g475 = (_g475 + 1);
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g34 = nexus.runtime;
  var tl = _g34.tl;
  var atom63 = _g34["atom?"];
  var boolean63 = _g34["boolean?"];
  var write = _g34.write;
  var reduce = _g34.reduce;
  var _6061 = _g34["<="];
  var add = _g34.add;
  var join = _g34.join;
  var iterate = _g34.iterate;
  var make_id = _g34["make-id"];
  var substring = _g34.substring;
  var composite63 = _g34["composite?"];
  var to_string = _g34["to-string"];
  var parse_number = _g34["parse-number"];
  var function63 = _g34["function?"];
  var exit = _g34.exit;
  var pairwise = _g34.pairwise;
  var nil63 = _g34["nil?"];
  var _43 = _g34["+"];
  var is63 = _g34["is?"];
  var reverse = _g34.reverse;
  var code = _g34.code;
  var read_file = _g34["read-file"];
  var id_literal63 = _g34["id-literal?"];
  var _6261 = _g34[">="];
  var replicate = _g34.replicate;
  var some63 = _g34["some?"];
  var keep = _g34.keep;
  var string63 = _g34["string?"];
  var map = _g34.map;
  var hd = _g34.hd;
  var string_literal63 = _g34["string-literal?"];
  var write_file = _g34["write-file"];
  var split = _g34.split;
  var stash = _g34.stash;
  var _47 = _g34["/"];
  var length = _g34.length;
  var sub = _g34.sub;
  var find = _g34.find;
  var _42 = _g34["*"];
  var _61 = _g34["="];
  var _60 = _g34["<"];
  var last = _g34.last;
  var _62 = _g34[">"];
  var table63 = _g34["table?"];
  var number63 = _g34["number?"];
  var search = _g34.search;
  var exclude = _g34.exclude;
  var _37 = _g34["%"];
  var apply = _g34.apply;
  var sublist = _g34.sublist;
  var unstash = _g34.unstash;
  var extend = _g34.extend;
  var keys63 = _g34["keys?"];
  var inner = _g34.inner;
  var list63 = _g34["list?"];
  var _ = _g34["-"];
  var splice = _g34.splice;
  var setenv = _g34.setenv;
  var cat = _g34.cat;
  var char = _g34.char;
  var empty63 = _g34["empty?"];
  var drop = _g34.drop;
  var _37message_handler = _g34["%message-handler"];
  var _g72 = nexus.utilities;
  var to_id = _g72["to-id"];
  var quoted = _g72.quoted;
  var bind = _g72.bind;
  var macro_function = _g72["macro-function"];
  var symbol63 = _g72["symbol?"];
  var macroexpand = _g72.macroexpand;
  var symbol_expansion = _g72["symbol-expansion"];
  var quasiexpand = _g72.quasiexpand;
  var valid_id63 = _g72["valid-id?"];
  var special63 = _g72["special?"];
  var quote_modules = _g72["quote-modules"];
  var bind42 = _g72["bind*"];
  var imported = _g72.imported;
  var bound63 = _g72["bound?"];
  var stash42 = _g72["stash*"];
  var getenv = _g72.getenv;
  var quote_environment = _g72["quote-environment"];
  var mapo = _g72.mapo;
  var exported = _g72.exported;
  var module_key = _g72["module-key"];
  var variable63 = _g72["variable?"];
  var indentation = _g72.indentation;
  var initial_environment = _g72["initial-environment"];
  var macro63 = _g72["macro?"];
  var special_form63 = _g72["special-form?"];
  var _g80 = nexus.reader;
  var read_table = _g80["read-table"];
  var make_stream = _g80["make-stream"];
  var read = _g80.read;
  var read_from_string = _g80["read-from-string"];
  var read_all = _g80["read-all"];
  var _g117 = nexus.compiler;
  var compile = _g117.compile;
  var compile_function = _g117["compile-function"];
  var compile_call = _g117["compile-call"];
  var compile_branch = _g117["compile-branch"];
  var compile_special = _g117["compile-special"];
  var open_module = _g117["open-module"];
  var eval = _g117.eval;
  var compile_module = _g117["compile-module"];
  var in_module = _g117["in-module"];
  var load_module = _g117["load-module"];
  var compile_body = _g117["compile-body"];
  function rep(str) {
    var _g477 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g480) {
        return([false, _g480]);
      }
    })();
    var _g1 = _g477[0];
    var x = _g477[1];
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
    var _g478 = args;
    while ((i < length(_g478))) {
      var arg = _g478[i];
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
