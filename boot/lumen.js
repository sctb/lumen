(function () {
  global.nexus = {};
  return;
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
      var _g4 = x;
      var k = undefined;
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
      var _g5 = l1;
      var k = undefined;
      for (k in _g5) {
        if (isNaN(parseInt(k))) {
          var v = _g5[k];
          l[k] = v;
        }
      }
      var _g6 = l2;
      var k = undefined;
      for (k in _g6) {
        if (isNaN(parseInt(k))) {
          var v = _g6[k];
          l[k] = v;
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
    var _g7 = l;
    var _g8 = 0;
    while ((_g8 < length(_g7))) {
      var x = _g7[_g8];
      if (f(x)) {
        add(l1, x);
      }
      _g8 = (_g8 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g9 = l;
    var _g10 = 0;
    while ((_g10 < length(_g9))) {
      var x = _g9[_g10];
      var _g11 = f(x);
      if (_g11) {
        return(_g11);
      }
      _g10 = (_g10 + 1);
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
    var _g12 = l;
    var _g13 = 0;
    while ((_g13 < length(_g12))) {
      var x = _g12[_g13];
      var _g14 = f(x);
      if (splice63(_g14)) {
        l1 = join(l1, _g14.value);
      } else if (is63(_g14)) {
        add(l1, _g14);
      }
      _g13 = (_g13 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g15 = t;
    var k = undefined;
    for (k in _g15) {
      if (isNaN(parseInt(k))) {
        var v = _g15[k];
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
    var _g16 = t;
    var k1 = undefined;
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
      var _g17 = args;
      var k = undefined;
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
        var _g18 = l;
        var k = undefined;
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
      var _g20 = _g19;
      var k1 = undefined;
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
    var _g23 = t;
    var k = undefined;
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
      var _g30 = x;
      var k = undefined;
      for (k in _g30) {
        if (isNaN(parseInt(k))) {
          var v = _g30[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var _g31 = x1;
      var i = 0;
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
  _g33["nil?"] = nil63;
  _g33["is?"] = is63;
  _g33.length = length;
  _g33["empty?"] = empty63;
  _g33["some?"] = some63;
  _g33.hd = hd;
  _g33["string?"] = string63;
  _g33["number?"] = number63;
  _g33["boolean?"] = boolean63;
  _g33["function?"] = function63;
  _g33["composite?"] = composite63;
  _g33["atom?"] = atom63;
  _g33["table?"] = table63;
  _g33["list?"] = list63;
  _g33.substring = substring;
  _g33.sublist = sublist;
  _g33.sub = sub;
  _g33.inner = inner;
  _g33.tl = tl;
  _g33.char = char;
  _g33.code = code;
  _g33["string-literal?"] = string_literal63;
  _g33["id-literal?"] = id_literal63;
  _g33.add = add;
  _g33.drop = drop;
  _g33.last = last;
  _g33.reverse = reverse;
  _g33.join = join;
  _g33.reduce = reduce;
  _g33.keep = keep;
  _g33.find = find;
  _g33.pairwise = pairwise;
  _g33.iterate = iterate;
  _g33.replicate = replicate;
  _g33.splice = splice;
  _g33.map = map;
  _g33["keys?"] = keys63;
  _g33.stash = stash;
  _g33.unstash = unstash;
  _g33.setenv = setenv;
  _g33.extend = extend;
  _g33.exclude = exclude;
  _g33.search = search;
  _g33.split = split;
  _g33.cat = cat;
  _g33["+"] = _43;
  _g33["-"] = _;
  _g33["*"] = _42;
  _g33["/"] = _47;
  _g33["%"] = _37;
  _g33[">"] = _62;
  _g33["<"] = _60;
  _g33["="] = _61;
  _g33[">="] = _6261;
  _g33["<="] = _6061;
  _g33["read-file"] = read_file;
  _g33["write-file"] = write_file;
  _g33.write = write;
  _g33.exit = exit;
  _g33["parse-number"] = parse_number;
  _g33["to-string"] = to_string;
  _g33.apply = apply;
  _g33["make-id"] = make_id;
  _g33["%message-handler"] = _37message_handler;
})();
(function () {
  var _g40 = nexus.runtime;
  var nil63 = _g40["nil?"];
  var is63 = _g40["is?"];
  var length = _g40.length;
  var empty63 = _g40["empty?"];
  var some63 = _g40["some?"];
  var hd = _g40.hd;
  var string63 = _g40["string?"];
  var number63 = _g40["number?"];
  var boolean63 = _g40["boolean?"];
  var function63 = _g40["function?"];
  var composite63 = _g40["composite?"];
  var atom63 = _g40["atom?"];
  var table63 = _g40["table?"];
  var list63 = _g40["list?"];
  var substring = _g40.substring;
  var sublist = _g40.sublist;
  var sub = _g40.sub;
  var inner = _g40.inner;
  var tl = _g40.tl;
  var char = _g40.char;
  var code = _g40.code;
  var string_literal63 = _g40["string-literal?"];
  var id_literal63 = _g40["id-literal?"];
  var add = _g40.add;
  var drop = _g40.drop;
  var last = _g40.last;
  var reverse = _g40.reverse;
  var join = _g40.join;
  var reduce = _g40.reduce;
  var keep = _g40.keep;
  var find = _g40.find;
  var pairwise = _g40.pairwise;
  var iterate = _g40.iterate;
  var replicate = _g40.replicate;
  var splice = _g40.splice;
  var map = _g40.map;
  var keys63 = _g40["keys?"];
  var stash = _g40.stash;
  var unstash = _g40.unstash;
  var setenv = _g40.setenv;
  var extend = _g40.extend;
  var exclude = _g40.exclude;
  var search = _g40.search;
  var split = _g40.split;
  var cat = _g40.cat;
  var _43 = _g40["+"];
  var _ = _g40["-"];
  var _42 = _g40["*"];
  var _47 = _g40["/"];
  var _37 = _g40["%"];
  var _62 = _g40[">"];
  var _60 = _g40["<"];
  var _61 = _g40["="];
  var _6261 = _g40[">="];
  var _6061 = _g40["<="];
  var read_file = _g40["read-file"];
  var write_file = _g40["write-file"];
  var write = _g40.write;
  var exit = _g40.exit;
  var parse_number = _g40["parse-number"];
  var to_string = _g40["to-string"];
  var apply = _g40.apply;
  var make_id = _g40["make-id"];
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
  function toplevel63() {
    return((length(environment) === 1));
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
      var _g43 = args;
      var k = undefined;
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
      var _g44 = lh;
      var i = 0;
      while ((i < length(_g44))) {
        var x = _g44[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var _g45 = lh;
      var k = undefined;
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
      var _g46 = args;
      var _g47 = 0;
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
          var _g52 = args;
          var _g53 = 0;
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
          var _g58 = _g54;
          var _g59 = 0;
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
    var _g60 = form;
    var k = undefined;
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
    var _g62 = form;
    var _g63 = 0;
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
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
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
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g67 = hd(environment);
    var n = undefined;
    for (n in _g67) {
      if (isNaN(parseInt(n))) {
        var b = _g67[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["%local", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  }
  function imported(spec) {
    var m = module(spec);
    var k = module_key(spec);
    var x = nexus[k];
    if ((x && keys63(x))) {
      var imports = [];
      var id = make_id();
      add(imports, join(["%local", id, join(["get", "nexus", join(["quote", k])])]));
      var _g68 = x;
      var _g69 = undefined;
      for (_g69 in _g68) {
        if (isNaN(parseInt(_g69))) {
          var _g38 = _g68[_g69];
          add(imports, join(["%local", _g69, join(["get", id, join(["quote", _g69])])]));
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
    var _g70 = t;
    var k = undefined;
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
    return(join(["%object"], mapo(function (_g39, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g71 = ["table"];
      _g71.import = quoted(m.import);
      _g71.export = quote_frame(m.export);
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
  _g72.getenv = getenv;
  _g72["macro-function"] = macro_function;
  _g72["macro?"] = macro63;
  _g72["special?"] = special63;
  _g72["special-form?"] = special_form63;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72["symbol?"] = symbol63;
  _g72["variable?"] = variable63;
  _g72["bound?"] = bound63;
  _g72["toplevel?"] = toplevel63;
  _g72.quoted = quoted;
  _g72["stash*"] = stash42;
  _g72.bind = bind;
  _g72["bind*"] = bind42;
  _g72.quasiexpand = quasiexpand;
  _g72.macroexpand = macroexpand;
  _g72.indentation = indentation;
  _g72["valid-id?"] = valid_id63;
  _g72["to-id"] = to_id;
  _g72["module-key"] = module_key;
  _g72.module = module;
  _g72.imported = imported;
  _g72.exported = exported;
  _g72.mapo = mapo;
  _g72["quote-environment"] = quote_environment;
  _g72["quote-modules"] = quote_modules;
  _g72["initial-environment"] = initial_environment;
})();
(function () {
  var _g74 = nexus.runtime;
  var nil63 = _g74["nil?"];
  var is63 = _g74["is?"];
  var length = _g74.length;
  var empty63 = _g74["empty?"];
  var some63 = _g74["some?"];
  var hd = _g74.hd;
  var string63 = _g74["string?"];
  var number63 = _g74["number?"];
  var boolean63 = _g74["boolean?"];
  var function63 = _g74["function?"];
  var composite63 = _g74["composite?"];
  var atom63 = _g74["atom?"];
  var table63 = _g74["table?"];
  var list63 = _g74["list?"];
  var substring = _g74.substring;
  var sublist = _g74.sublist;
  var sub = _g74.sub;
  var inner = _g74.inner;
  var tl = _g74.tl;
  var char = _g74.char;
  var code = _g74.code;
  var string_literal63 = _g74["string-literal?"];
  var id_literal63 = _g74["id-literal?"];
  var add = _g74.add;
  var drop = _g74.drop;
  var last = _g74.last;
  var reverse = _g74.reverse;
  var join = _g74.join;
  var reduce = _g74.reduce;
  var keep = _g74.keep;
  var find = _g74.find;
  var pairwise = _g74.pairwise;
  var iterate = _g74.iterate;
  var replicate = _g74.replicate;
  var splice = _g74.splice;
  var map = _g74.map;
  var keys63 = _g74["keys?"];
  var stash = _g74.stash;
  var unstash = _g74.unstash;
  var setenv = _g74.setenv;
  var extend = _g74.extend;
  var exclude = _g74.exclude;
  var search = _g74.search;
  var split = _g74.split;
  var cat = _g74.cat;
  var _43 = _g74["+"];
  var _ = _g74["-"];
  var _42 = _g74["*"];
  var _47 = _g74["/"];
  var _37 = _g74["%"];
  var _62 = _g74[">"];
  var _60 = _g74["<"];
  var _61 = _g74["="];
  var _6261 = _g74[">="];
  var _6061 = _g74["<="];
  var read_file = _g74["read-file"];
  var write_file = _g74["write-file"];
  var write = _g74.write;
  var exit = _g74.exit;
  var parse_number = _g74["parse-number"];
  var to_string = _g74["to-string"];
  var apply = _g74.apply;
  var make_id = _g74["make-id"];
  var _37message_handler = _g74["%message-handler"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
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
  var _g81 = {};
  nexus.reader = _g81;
  _g81["make-stream"] = make_stream;
  _g81["read-table"] = read_table;
  _g81.read = read;
  _g81["read-all"] = read_all;
  _g81["read-from-string"] = read_from_string;
})();
(function () {
  var _g83 = nexus.runtime;
  var nil63 = _g83["nil?"];
  var is63 = _g83["is?"];
  var length = _g83.length;
  var empty63 = _g83["empty?"];
  var some63 = _g83["some?"];
  var hd = _g83.hd;
  var string63 = _g83["string?"];
  var number63 = _g83["number?"];
  var boolean63 = _g83["boolean?"];
  var function63 = _g83["function?"];
  var composite63 = _g83["composite?"];
  var atom63 = _g83["atom?"];
  var table63 = _g83["table?"];
  var list63 = _g83["list?"];
  var substring = _g83.substring;
  var sublist = _g83.sublist;
  var sub = _g83.sub;
  var inner = _g83.inner;
  var tl = _g83.tl;
  var char = _g83.char;
  var code = _g83.code;
  var string_literal63 = _g83["string-literal?"];
  var id_literal63 = _g83["id-literal?"];
  var add = _g83.add;
  var drop = _g83.drop;
  var last = _g83.last;
  var reverse = _g83.reverse;
  var join = _g83.join;
  var reduce = _g83.reduce;
  var keep = _g83.keep;
  var find = _g83.find;
  var pairwise = _g83.pairwise;
  var iterate = _g83.iterate;
  var replicate = _g83.replicate;
  var splice = _g83.splice;
  var map = _g83.map;
  var keys63 = _g83["keys?"];
  var stash = _g83.stash;
  var unstash = _g83.unstash;
  var setenv = _g83.setenv;
  var extend = _g83.extend;
  var exclude = _g83.exclude;
  var search = _g83.search;
  var split = _g83.split;
  var cat = _g83.cat;
  var _43 = _g83["+"];
  var _ = _g83["-"];
  var _42 = _g83["*"];
  var _47 = _g83["/"];
  var _37 = _g83["%"];
  var _62 = _g83[">"];
  var _60 = _g83["<"];
  var _61 = _g83["="];
  var _6261 = _g83[">="];
  var _6061 = _g83["<="];
  var read_file = _g83["read-file"];
  var write_file = _g83["write-file"];
  var write = _g83.write;
  var exit = _g83.exit;
  var parse_number = _g83["parse-number"];
  var to_string = _g83["to-string"];
  var apply = _g83.apply;
  var make_id = _g83["make-id"];
  var _37message_handler = _g83["%message-handler"];
  var _g84 = nexus.utilities;
  var getenv = _g84.getenv;
  var macro_function = _g84["macro-function"];
  var macro63 = _g84["macro?"];
  var special63 = _g84["special?"];
  var special_form63 = _g84["special-form?"];
  var symbol_expansion = _g84["symbol-expansion"];
  var symbol63 = _g84["symbol?"];
  var variable63 = _g84["variable?"];
  var bound63 = _g84["bound?"];
  var toplevel63 = _g84["toplevel?"];
  var quoted = _g84.quoted;
  var stash42 = _g84["stash*"];
  var bind = _g84.bind;
  var bind42 = _g84["bind*"];
  var quasiexpand = _g84.quasiexpand;
  var macroexpand = _g84.macroexpand;
  var indentation = _g84.indentation;
  var valid_id63 = _g84["valid-id?"];
  var to_id = _g84["to-id"];
  var module_key = _g84["module-key"];
  var module = _g84.module;
  var imported = _g84.imported;
  var exported = _g84.exported;
  var mapo = _g84.mapo;
  var quote_environment = _g84["quote-environment"];
  var quote_modules = _g84["quote-modules"];
  var initial_environment = _g84["initial-environment"];
  var _g85 = nexus.reader;
  var make_stream = _g85["make-stream"];
  var read_table = _g85["read-table"];
  var read = _g85.read;
  var read_all = _g85["read-all"];
  var read_from_string = _g85["read-from-string"];
  var infix = {common: {"+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", "and": "&&", "or": "||", cat: "+"}, lua: {"=": "==", cat: "..", "~=": true, "and": true, "or": true}};
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
    var _g86 = args;
    var i = 0;
    while ((i < length(_g86))) {
      var arg = _g86[i];
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
    var _g87 = unstash(sublist(arguments, 1));
    var tail = _g87.tail;
    var str = "";
    var _g88 = forms;
    var i = 0;
    while ((i < length(_g88))) {
      var x = _g88[i];
      var t63 = (tail && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, stmt: true, tail: t63}));
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
    var _g89 = getenv(hd(form));
    var special = _g89.special;
    var stmt = _g89.stmt;
    var self_tr63 = _g89.tr;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, tail: tail63}));
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
  function compile_infix(_g90) {
    var op = _g90[0];
    var args = sub(_g90, 1);
    var str = "(";
    var _g91 = getop(op);
    var _g92 = args;
    var i = 0;
    while ((i < length(_g92))) {
      var arg = _g92[i];
      if (((_g91 === "-") && (length(args) === 1))) {
        str = (str + _g91 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g91 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g93 = (function () {
      indent_level = (indent_level + 1);
      var _g94 = compile(body, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g94);
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
      return((ind + "if (" + cond1 + ") {\n" + _g93 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g93 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g93 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g93 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g93 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g93 + tr));
    }
  }
  function compile_function(args, body) {
    var _g95 = unstash(sublist(arguments, 2));
    var name = _g95.name;
    var prefix = _g95.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g96 = (prefix || "");
    var _g97 = compile_args(args);
    var _g98 = (function () {
      indent_level = (indent_level + 1);
      var _g99 = compile_body(body, {_stash: true, tail: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g99);
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
      return(("function " + id + _g97 + " {\n" + _g98 + ind + "}" + tr));
    } else {
      return((_g96 + "function " + id + _g97 + "\n" + _g98 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g100 = unstash(sublist(arguments, 1));
    var stmt = _g100.stmt;
    var tail = _g100.tail;
    if ((tail && can_return63(form))) {
      form = join(["return", form]);
    }
    if (nil63(form)) {
      return("");
    } else if (special_form63(form)) {
      return(compile_special(form, stmt, tail));
    } else {
      var tr = terminator(stmt);
      var ind = (function () {
        if (stmt) {
          return(indentation());
        } else {
          return("");
        }
      })();
      var _g101 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g101 + tr));
    }
  };
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g102 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g102, [epilog]))]));
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
    var _g103 = toplevel;
    var name = undefined;
    for (name in _g103) {
      if (isNaN(parseInt(name))) {
        var binding = _g103[name];
        if ((binding.module === k)) {
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
    var _g104 = unstash(sublist(arguments, 1));
    var all = _g104.all;
    var m = module(spec);
    var frame = last(environment);
    var _g105 = m.export;
    var k = undefined;
    for (k in _g105) {
      if (isNaN(parseInt(k))) {
        var v = _g105[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g106 = unstash(sublist(arguments, 1));
    var all = _g106.all;
    if ((nil63(module(spec)) || (compilation_level === 1))) {
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
  var _g107 = {};
  nexus.compiler = _g107;
  _g107["compile-body"] = compile_body;
  _g107["compile-call"] = compile_call;
  _g107["compile-branch"] = compile_branch;
  _g107["compile-function"] = compile_function;
  _g107["compile-special"] = compile_special;
  _g107.compile = compile;
  _g107["open-module"] = open_module;
  _g107["load-module"] = load_module;
  _g107["in-module"] = in_module;
  _g107["compile-module"] = compile_module;
  _g107.eval = eval;
})();
(function () {
  var _g110 = nexus.runtime;
  var nil63 = _g110["nil?"];
  var is63 = _g110["is?"];
  var length = _g110.length;
  var empty63 = _g110["empty?"];
  var some63 = _g110["some?"];
  var hd = _g110.hd;
  var string63 = _g110["string?"];
  var number63 = _g110["number?"];
  var boolean63 = _g110["boolean?"];
  var function63 = _g110["function?"];
  var composite63 = _g110["composite?"];
  var atom63 = _g110["atom?"];
  var table63 = _g110["table?"];
  var list63 = _g110["list?"];
  var substring = _g110.substring;
  var sublist = _g110.sublist;
  var sub = _g110.sub;
  var inner = _g110.inner;
  var tl = _g110.tl;
  var char = _g110.char;
  var code = _g110.code;
  var string_literal63 = _g110["string-literal?"];
  var id_literal63 = _g110["id-literal?"];
  var add = _g110.add;
  var drop = _g110.drop;
  var last = _g110.last;
  var reverse = _g110.reverse;
  var join = _g110.join;
  var reduce = _g110.reduce;
  var keep = _g110.keep;
  var find = _g110.find;
  var pairwise = _g110.pairwise;
  var iterate = _g110.iterate;
  var replicate = _g110.replicate;
  var splice = _g110.splice;
  var map = _g110.map;
  var keys63 = _g110["keys?"];
  var stash = _g110.stash;
  var unstash = _g110.unstash;
  var setenv = _g110.setenv;
  var extend = _g110.extend;
  var exclude = _g110.exclude;
  var search = _g110.search;
  var split = _g110.split;
  var cat = _g110.cat;
  var _43 = _g110["+"];
  var _ = _g110["-"];
  var _42 = _g110["*"];
  var _47 = _g110["/"];
  var _37 = _g110["%"];
  var _62 = _g110[">"];
  var _60 = _g110["<"];
  var _61 = _g110["="];
  var _6261 = _g110[">="];
  var _6061 = _g110["<="];
  var read_file = _g110["read-file"];
  var write_file = _g110["write-file"];
  var write = _g110.write;
  var exit = _g110.exit;
  var parse_number = _g110["parse-number"];
  var to_string = _g110["to-string"];
  var apply = _g110.apply;
  var make_id = _g110["make-id"];
  var _37message_handler = _g110["%message-handler"];
  var _g111 = nexus.utilities;
  var getenv = _g111.getenv;
  var macro_function = _g111["macro-function"];
  var macro63 = _g111["macro?"];
  var special63 = _g111["special?"];
  var special_form63 = _g111["special-form?"];
  var symbol_expansion = _g111["symbol-expansion"];
  var symbol63 = _g111["symbol?"];
  var variable63 = _g111["variable?"];
  var bound63 = _g111["bound?"];
  var toplevel63 = _g111["toplevel?"];
  var quoted = _g111.quoted;
  var stash42 = _g111["stash*"];
  var bind = _g111.bind;
  var bind42 = _g111["bind*"];
  var quasiexpand = _g111.quasiexpand;
  var macroexpand = _g111.macroexpand;
  var indentation = _g111.indentation;
  var valid_id63 = _g111["valid-id?"];
  var to_id = _g111["to-id"];
  var module_key = _g111["module-key"];
  var module = _g111.module;
  var imported = _g111.imported;
  var exported = _g111.exported;
  var mapo = _g111.mapo;
  var quote_environment = _g111["quote-environment"];
  var quote_modules = _g111["quote-modules"];
  var initial_environment = _g111["initial-environment"];
  var _g112 = nexus.compiler;
  var compile_body = _g112["compile-body"];
  var compile_call = _g112["compile-call"];
  var compile_branch = _g112["compile-branch"];
  var compile_function = _g112["compile-function"];
  var compile_special = _g112["compile-special"];
  var compile = _g112.compile;
  var open_module = _g112["open-module"];
  var load_module = _g112["load-module"];
  var in_module = _g112["in-module"];
  var compile_module = _g112["compile-module"];
  var eval = _g112.eval;
  return;
})();
(function () {
  var _g247 = nexus.runtime;
  var nil63 = _g247["nil?"];
  var is63 = _g247["is?"];
  var length = _g247.length;
  var empty63 = _g247["empty?"];
  var some63 = _g247["some?"];
  var hd = _g247.hd;
  var string63 = _g247["string?"];
  var number63 = _g247["number?"];
  var boolean63 = _g247["boolean?"];
  var function63 = _g247["function?"];
  var composite63 = _g247["composite?"];
  var atom63 = _g247["atom?"];
  var table63 = _g247["table?"];
  var list63 = _g247["list?"];
  var substring = _g247.substring;
  var sublist = _g247.sublist;
  var sub = _g247.sub;
  var inner = _g247.inner;
  var tl = _g247.tl;
  var char = _g247.char;
  var code = _g247.code;
  var string_literal63 = _g247["string-literal?"];
  var id_literal63 = _g247["id-literal?"];
  var add = _g247.add;
  var drop = _g247.drop;
  var last = _g247.last;
  var reverse = _g247.reverse;
  var join = _g247.join;
  var reduce = _g247.reduce;
  var keep = _g247.keep;
  var find = _g247.find;
  var pairwise = _g247.pairwise;
  var iterate = _g247.iterate;
  var replicate = _g247.replicate;
  var splice = _g247.splice;
  var map = _g247.map;
  var keys63 = _g247["keys?"];
  var stash = _g247.stash;
  var unstash = _g247.unstash;
  var setenv = _g247.setenv;
  var extend = _g247.extend;
  var exclude = _g247.exclude;
  var search = _g247.search;
  var split = _g247.split;
  var cat = _g247.cat;
  var _43 = _g247["+"];
  var _ = _g247["-"];
  var _42 = _g247["*"];
  var _47 = _g247["/"];
  var _37 = _g247["%"];
  var _62 = _g247[">"];
  var _60 = _g247["<"];
  var _61 = _g247["="];
  var _6261 = _g247[">="];
  var _6061 = _g247["<="];
  var read_file = _g247["read-file"];
  var write_file = _g247["write-file"];
  var write = _g247.write;
  var exit = _g247.exit;
  var parse_number = _g247["parse-number"];
  var to_string = _g247["to-string"];
  var apply = _g247.apply;
  var make_id = _g247["make-id"];
  var _37message_handler = _g247["%message-handler"];
  var _g248 = nexus.utilities;
  var getenv = _g248.getenv;
  var macro_function = _g248["macro-function"];
  var macro63 = _g248["macro?"];
  var special63 = _g248["special?"];
  var special_form63 = _g248["special-form?"];
  var symbol_expansion = _g248["symbol-expansion"];
  var symbol63 = _g248["symbol?"];
  var variable63 = _g248["variable?"];
  var bound63 = _g248["bound?"];
  var toplevel63 = _g248["toplevel?"];
  var quoted = _g248.quoted;
  var stash42 = _g248["stash*"];
  var bind = _g248.bind;
  var bind42 = _g248["bind*"];
  var quasiexpand = _g248.quasiexpand;
  var macroexpand = _g248.macroexpand;
  var indentation = _g248.indentation;
  var valid_id63 = _g248["valid-id?"];
  var to_id = _g248["to-id"];
  var module_key = _g248["module-key"];
  var module = _g248.module;
  var imported = _g248.imported;
  var exported = _g248.exported;
  var mapo = _g248.mapo;
  var quote_environment = _g248["quote-environment"];
  var quote_modules = _g248["quote-modules"];
  var initial_environment = _g248["initial-environment"];
  var _g249 = nexus.compiler;
  var compile_body = _g249["compile-body"];
  var compile_call = _g249["compile-call"];
  var compile_branch = _g249["compile-branch"];
  var compile_function = _g249["compile-function"];
  var compile_special = _g249["compile-special"];
  var compile = _g249.compile;
  var open_module = _g249["open-module"];
  var load_module = _g249["load-module"];
  var in_module = _g249["in-module"];
  var compile_module = _g249["compile-module"];
  var eval = _g249.eval;
  global.target = "js";
  return;
})();
(function () {
  var _g438 = nexus.runtime;
  var nil63 = _g438["nil?"];
  var is63 = _g438["is?"];
  var length = _g438.length;
  var empty63 = _g438["empty?"];
  var some63 = _g438["some?"];
  var hd = _g438.hd;
  var string63 = _g438["string?"];
  var number63 = _g438["number?"];
  var boolean63 = _g438["boolean?"];
  var function63 = _g438["function?"];
  var composite63 = _g438["composite?"];
  var atom63 = _g438["atom?"];
  var table63 = _g438["table?"];
  var list63 = _g438["list?"];
  var substring = _g438.substring;
  var sublist = _g438.sublist;
  var sub = _g438.sub;
  var inner = _g438.inner;
  var tl = _g438.tl;
  var char = _g438.char;
  var code = _g438.code;
  var string_literal63 = _g438["string-literal?"];
  var id_literal63 = _g438["id-literal?"];
  var add = _g438.add;
  var drop = _g438.drop;
  var last = _g438.last;
  var reverse = _g438.reverse;
  var join = _g438.join;
  var reduce = _g438.reduce;
  var keep = _g438.keep;
  var find = _g438.find;
  var pairwise = _g438.pairwise;
  var iterate = _g438.iterate;
  var replicate = _g438.replicate;
  var splice = _g438.splice;
  var map = _g438.map;
  var keys63 = _g438["keys?"];
  var stash = _g438.stash;
  var unstash = _g438.unstash;
  var setenv = _g438.setenv;
  var extend = _g438.extend;
  var exclude = _g438.exclude;
  var search = _g438.search;
  var split = _g438.split;
  var cat = _g438.cat;
  var _43 = _g438["+"];
  var _ = _g438["-"];
  var _42 = _g438["*"];
  var _47 = _g438["/"];
  var _37 = _g438["%"];
  var _62 = _g438[">"];
  var _60 = _g438["<"];
  var _61 = _g438["="];
  var _6261 = _g438[">="];
  var _6061 = _g438["<="];
  var read_file = _g438["read-file"];
  var write_file = _g438["write-file"];
  var write = _g438.write;
  var exit = _g438.exit;
  var parse_number = _g438["parse-number"];
  var to_string = _g438["to-string"];
  var apply = _g438.apply;
  var make_id = _g438["make-id"];
  var _37message_handler = _g438["%message-handler"];
  var _g439 = nexus.utilities;
  var getenv = _g439.getenv;
  var macro_function = _g439["macro-function"];
  var macro63 = _g439["macro?"];
  var special63 = _g439["special?"];
  var special_form63 = _g439["special-form?"];
  var symbol_expansion = _g439["symbol-expansion"];
  var symbol63 = _g439["symbol?"];
  var variable63 = _g439["variable?"];
  var bound63 = _g439["bound?"];
  var toplevel63 = _g439["toplevel?"];
  var quoted = _g439.quoted;
  var stash42 = _g439["stash*"];
  var bind = _g439.bind;
  var bind42 = _g439["bind*"];
  var quasiexpand = _g439.quasiexpand;
  var macroexpand = _g439.macroexpand;
  var indentation = _g439.indentation;
  var valid_id63 = _g439["valid-id?"];
  var to_id = _g439["to-id"];
  var module_key = _g439["module-key"];
  var module = _g439.module;
  var imported = _g439.imported;
  var exported = _g439.exported;
  var mapo = _g439.mapo;
  var quote_environment = _g439["quote-environment"];
  var quote_modules = _g439["quote-modules"];
  var initial_environment = _g439["initial-environment"];
  var _g440 = nexus.compiler;
  var compile_body = _g440["compile-body"];
  var compile_call = _g440["compile-call"];
  var compile_branch = _g440["compile-branch"];
  var compile_function = _g440["compile-function"];
  var compile_special = _g440["compile-special"];
  var compile = _g440.compile;
  var open_module = _g440["open-module"];
  var load_module = _g440["load-module"];
  var in_module = _g440["in-module"];
  var compile_module = _g440["compile-module"];
  var eval = _g440.eval;
  global.modules = {boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"define-module": {module: "core", export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g447 = sub(body, 0);
    var imports = [];
    var imp = _g447.import;
    var exp = _g447.export;
    var _g448 = (imp || []);
    var _g449 = 0;
    while ((_g449 < length(_g448))) {
      var k = _g448[_g449];
      load_module(k);
      imports = join(imports, imported(k));
      _g449 = (_g449 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g450 = (exp || []);
    var _g451 = 0;
    while ((_g451 < length(_g450))) {
      var k = _g450[_g451];
      setenv(k, {_stash: true, export: true});
      _g451 = (_g451 + 1);
    }
    return(join(["do"], imports));
  }}, list: {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g452 = body;
      var k = undefined;
      for (k in _g452) {
        if (isNaN(parseInt(k))) {
          var v = _g452[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, "join!": {module: "core", export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g453 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g453)]));
  }}, quote: {module: "core", export: true, macro: function (form) {
    return(quoted(form));
  }}, "cat!": {module: "core", export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g454 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g454)]));
  }}, "with-bindings": {module: "core", export: true, macro: function (_g455) {
    var names = _g455[0];
    var body = unstash(sublist(arguments, 1));
    var _g456 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g457 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g458 = ["setenv", x];
        _g458.variable = true;
        return(_g458);
      })())])];
      _g457.scope = true;
      return(_g457);
    })(), _g456));
  }}, fn: {module: "core", export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g459 = sub(body, 0);
    var _g460 = bind42(args, _g459);
    var _g461 = _g460[0];
    var _g462 = _g460[1];
    return(join(["%function", _g461], _g462));
  }}, "let-macro": {module: "core", export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g463 = sub(body, 0);
    add(environment, {});
    var _g464 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g463)));
    })();
    drop(environment);
    return(_g464);
  }}, "let-symbol": {module: "core", export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g465 = sub(body, 0);
    add(environment, {});
    var _g466 = (function () {
      map(function (_g467) {
        var name = _g467[0];
        var exp = _g467[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g465)));
    })();
    drop(environment);
    return(_g466);
  }}, each: {module: "core", export: true, macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g468 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    return(join(["let", join([t1, t]), (function () {
      if (nil63(v)) {
        var i = (function () {
          if (b.i) {
            return("i");
          } else {
            return(make_id());
          }
        })();
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g468), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g469 = ["target"];
          _g469.js = join(["isNaN", join(["parseInt", k])]);
          _g469.lua = join(["not", join(["number?", k])]);
          return(_g469);
        })()), join(["let", join([v, join(["get", t1, k])])], _g468)])])]));
      }
    })()]));
  }}, pr: {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g470 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g470)]));
  }}, language: {module: "core", export: true, macro: function () {
    return(join(["quote", target]));
  }}, inc: {module: "core", export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, "join*": {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, guard: {module: "core", export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, "with-frame": {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g471 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g472 = ["table"];
      _g472._scope = scope;
      return(_g472);
    })())]), join(["let", join([x, join(["do"], _g471)]), join(["drop", "environment"]), x])]));
  }}, "define-symbol": {module: "core", export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "list*": {module: "core", export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g473 = xs;
      var i = 0;
      while ((i < length(_g473))) {
        var x = _g473[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, let: {module: "core", export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g474 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g475) {
      var lh = _g475[0];
      var rh = _g475[1];
      var _g476 = bind(lh, rh);
      var _g477 = 0;
      while ((_g477 < length(_g476))) {
        var _g478 = _g476[_g477];
        var id = _g478[0];
        var val = _g478[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g477 = (_g477 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g474)])));
  }}, quasiquote: {module: "core", export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, "define*": {module: "core", export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g479 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g479))) {
      var _g480 = bind42(x, _g479);
      var args = _g480[0];
      var _g481 = _g480[1];
      return(join(["%global-function", name, args], _g481));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }}, table: {module: "core", export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g246, x) {
      return(x);
    }, body)));
  }}, "define-macro": {module: "core", export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g482 = sub(body, 0);
    var form = join(["fn", args], _g482);
    eval(join((function () {
      var _g483 = ["setenv", join(["quote", name])];
      _g483.macro = form;
      _g483.form = join(["quote", form]);
      return(_g483);
    })()));
    return(undefined);
  }}, "set-of": {module: "core", export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g484 = elements;
    var _g485 = 0;
    while ((_g485 < length(_g484))) {
      var e = _g484[_g485];
      l[e] = true;
      _g485 = (_g485 + 1);
    }
    return(join(["table"], l));
  }}, "define-special": {module: "core", export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g486 = sub(body, 0);
    var form = join(["fn", args], _g486);
    var keys = sub(_g486, length(_g486));
    eval(join((function () {
      var _g487 = ["setenv", join(["quote", name])];
      _g487.special = form;
      _g487.form = join(["quote", form]);
      return(_g487);
    })(), keys));
    return(undefined);
  }}, dec: {module: "core", export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, target: {global: true, module: "core", export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, at: {module: "core", export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }}, define: {module: "core", export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g488 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g488))) {
      var _g489 = bind42(x, _g488);
      var args = _g489[0];
      var _g490 = _g489[1];
      return(join(["%local-function", name, args], _g490));
    } else {
      return(join(["%local", name, x]));
    }
  }}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "compile-module": {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, infix: {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, "compile-atom": {variable: true, module: "compiler"}, terminator: {variable: true, module: "compiler"}, "compile-infix": {variable: true, module: "compiler"}, "can-return?": {variable: true, module: "compiler"}, "current-module": {global: true, export: true, module: "compiler"}, "module-path": {variable: true, module: "compiler"}, encapsulate: {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, run: {variable: true, module: "compiler"}, "compiler-output": {variable: true, module: "compiler"}, "compilation-level": {variable: true, module: "compiler"}, "%compile-module": {variable: true, module: "compiler"}, prologue: {variable: true, module: "compiler"}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true, module: "system"}}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g491) {
    var char = _g491[0];
    var stream = _g491[1];
    var body = unstash(sublist(arguments, 1));
    var _g492 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g492)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}, delimiters: {variable: true, module: "reader"}, whitespace: {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}, "read-char": {variable: true, module: "reader"}, "skip-non-code": {variable: true, module: "reader"}, eof: {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, "flag?": {variable: true, module: "reader"}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"error": {special: function (_g493) {
    var x = _g493[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, module: "special", export: true, stmt: true}, "%local-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g494) {
    var name = _g494[0];
    var args = _g494[1];
    var body = sub(_g494, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "%function": {module: "special", export: true, special: function (_g495) {
    var args = _g495[0];
    var body = sub(_g495, 1);
    return(compile_function(args, body));
  }}, "%array": {module: "special", export: true, special: function (forms) {
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
    var _g496 = forms;
    var i = 0;
    while ((i < length(_g496))) {
      var x = _g496[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "%for": {module: "special", stmt: true, tr: true, export: true, special: function (_g497) {
    var _g498 = _g497[0];
    var t = _g498[0];
    var k = _g498[1];
    var body = sub(_g497, 1);
    var _g499 = compile(t);
    var ind = indentation();
    var _g500 = (function () {
      indent_level = (indent_level + 1);
      var _g501 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g501);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g499 + " do\n" + _g500 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g499 + ") {\n" + _g500 + ind + "}\n"));
    }
  }}, "%global-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g502) {
    var name = _g502[0];
    var args = _g502[1];
    var body = sub(_g502, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }}, "do": {module: "special", stmt: true, tr: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }}, "set": {special: function (_g503) {
    var lh = _g503[0];
    var rh = _g503[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, module: "special", export: true, stmt: true}, "%try": {module: "special", stmt: true, tr: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g504 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g504);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g505 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g505);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "get": {module: "special", export: true, special: function (_g506) {
    var t = _g506[0];
    var k = _g506[1];
    var _g507 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g507, 0) === "{"))) {
      _g507 = ("(" + _g507 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g507 + "." + inner(k)));
    } else {
      return((_g507 + "[" + k1 + "]"));
    }
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
    var _g508 = pairs;
    var i = 0;
    while ((i < length(_g508))) {
      var _g509 = _g508[i];
      var k = _g509[0];
      var v = _g509[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g510 = compile(v);
      var _g511 = (function () {
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
      str = (str + _g511 + sep + _g510);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "not": {module: "special", export: true, special: function (_g512) {
    var x = _g512[0];
    var _g513 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g513 + ")"));
  }}, "if": {module: "special", stmt: true, tr: true, export: true, special: function (form, tail63) {
    var str = "";
    var _g514 = form;
    var i = 0;
    while ((i < length(_g514))) {
      var condition = _g514[i];
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
  }}, "%local": {special: function (_g515) {
    var name = _g515[0];
    var value = _g515[1];
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
  }, module: "special", export: true, stmt: true}, "while": {module: "special", stmt: true, tr: true, export: true, special: function (_g516) {
    var condition = _g516[0];
    var body = sub(_g516, 1);
    var _g517 = compile(condition);
    var _g518 = (function () {
      indent_level = (indent_level + 1);
      var _g519 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g519);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g517 + ") {\n" + _g518 + ind + "}\n"));
    } else {
      return((ind + "while " + _g517 + " do\n" + _g518 + ind + "end\n"));
    }
  }}, "return": {special: function (_g520) {
    var x = _g520[0];
    var _g521 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g521));
  }, module: "special", export: true, stmt: true}, "break": {special: function (_g109) {
    return((indentation() + "break"));
  }, module: "special", export: true, stmt: true}}}, lib: {import: ["core", "special"], export: {}}, utilities: {import: ["runtime", "special", "core"], export: {getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, "toplevel?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, module: {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, mapo: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "global?": {variable: true, module: "utilities"}, escape: {variable: true, module: "utilities"}, "quoting?": {variable: true, module: "utilities"}, "quasiquoting?": {variable: true, module: "utilities"}, "can-unquote?": {variable: true, module: "utilities"}, "quasisplice?": {variable: true, module: "utilities"}, "quasiquote-list": {variable: true, module: "utilities"}, "indent-level": {global: true, export: true, module: "utilities"}, reserved: {variable: true, module: "utilities"}, "numeric?": {variable: true, module: "utilities"}, "valid-char?": {variable: true, module: "utilities"}, "quote-binding": {variable: true, module: "utilities"}, "quote-frame": {variable: true, module: "utilities"}, "quote-module": {variable: true, module: "utilities"}}}, runtime: {import: ["special", "core"], export: {"nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, setenv: {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, "make-id": {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}, type: {variable: true, module: "runtime"}, "splice?": {variable: true, module: "runtime"}, mapl: {variable: true, module: "runtime"}, fs: {variable: true, module: "runtime"}, print: {global: true, export: true, module: "runtime"}, "id-count": {variable: true, module: "runtime"}}}};
  global.environment = [{"define-module": {module: "core", export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g522 = sub(body, 0);
    var imports = [];
    var imp = _g522.import;
    var exp = _g522.export;
    var _g523 = (imp || []);
    var _g524 = 0;
    while ((_g524 < length(_g523))) {
      var k = _g523[_g524];
      load_module(k);
      imports = join(imports, imported(k));
      _g524 = (_g524 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g525 = (exp || []);
    var _g526 = 0;
    while ((_g526 < length(_g525))) {
      var k = _g525[_g526];
      setenv(k, {_stash: true, export: true});
      _g526 = (_g526 + 1);
    }
    return(join(["do"], imports));
  }}}];
  return;
})();
(function () {
  var _g34 = nexus.runtime;
  var nil63 = _g34["nil?"];
  var is63 = _g34["is?"];
  var length = _g34.length;
  var empty63 = _g34["empty?"];
  var some63 = _g34["some?"];
  var hd = _g34.hd;
  var string63 = _g34["string?"];
  var number63 = _g34["number?"];
  var boolean63 = _g34["boolean?"];
  var function63 = _g34["function?"];
  var composite63 = _g34["composite?"];
  var atom63 = _g34["atom?"];
  var table63 = _g34["table?"];
  var list63 = _g34["list?"];
  var substring = _g34.substring;
  var sublist = _g34.sublist;
  var sub = _g34.sub;
  var inner = _g34.inner;
  var tl = _g34.tl;
  var char = _g34.char;
  var code = _g34.code;
  var string_literal63 = _g34["string-literal?"];
  var id_literal63 = _g34["id-literal?"];
  var add = _g34.add;
  var drop = _g34.drop;
  var last = _g34.last;
  var reverse = _g34.reverse;
  var join = _g34.join;
  var reduce = _g34.reduce;
  var keep = _g34.keep;
  var find = _g34.find;
  var pairwise = _g34.pairwise;
  var iterate = _g34.iterate;
  var replicate = _g34.replicate;
  var splice = _g34.splice;
  var map = _g34.map;
  var keys63 = _g34["keys?"];
  var stash = _g34.stash;
  var unstash = _g34.unstash;
  var setenv = _g34.setenv;
  var extend = _g34.extend;
  var exclude = _g34.exclude;
  var search = _g34.search;
  var split = _g34.split;
  var cat = _g34.cat;
  var _43 = _g34["+"];
  var _ = _g34["-"];
  var _42 = _g34["*"];
  var _47 = _g34["/"];
  var _37 = _g34["%"];
  var _62 = _g34[">"];
  var _60 = _g34["<"];
  var _61 = _g34["="];
  var _6261 = _g34[">="];
  var _6061 = _g34["<="];
  var read_file = _g34["read-file"];
  var write_file = _g34["write-file"];
  var write = _g34.write;
  var exit = _g34.exit;
  var parse_number = _g34["parse-number"];
  var to_string = _g34["to-string"];
  var apply = _g34.apply;
  var make_id = _g34["make-id"];
  var _37message_handler = _g34["%message-handler"];
  var _g73 = nexus.utilities;
  var getenv = _g73.getenv;
  var macro_function = _g73["macro-function"];
  var macro63 = _g73["macro?"];
  var special63 = _g73["special?"];
  var special_form63 = _g73["special-form?"];
  var symbol_expansion = _g73["symbol-expansion"];
  var symbol63 = _g73["symbol?"];
  var variable63 = _g73["variable?"];
  var bound63 = _g73["bound?"];
  var toplevel63 = _g73["toplevel?"];
  var quoted = _g73.quoted;
  var stash42 = _g73["stash*"];
  var bind = _g73.bind;
  var bind42 = _g73["bind*"];
  var quasiexpand = _g73.quasiexpand;
  var macroexpand = _g73.macroexpand;
  var indentation = _g73.indentation;
  var valid_id63 = _g73["valid-id?"];
  var to_id = _g73["to-id"];
  var module_key = _g73["module-key"];
  var module = _g73.module;
  var imported = _g73.imported;
  var exported = _g73.exported;
  var mapo = _g73.mapo;
  var quote_environment = _g73["quote-environment"];
  var quote_modules = _g73["quote-modules"];
  var initial_environment = _g73["initial-environment"];
  var _g82 = nexus.reader;
  var make_stream = _g82["make-stream"];
  var read_table = _g82["read-table"];
  var read = _g82.read;
  var read_all = _g82["read-all"];
  var read_from_string = _g82["read-from-string"];
  var _g108 = nexus.compiler;
  var compile_body = _g108["compile-body"];
  var compile_call = _g108["compile-call"];
  var compile_branch = _g108["compile-branch"];
  var compile_function = _g108["compile-function"];
  var compile_special = _g108["compile-special"];
  var compile = _g108.compile;
  var open_module = _g108["open-module"];
  var load_module = _g108["load-module"];
  var in_module = _g108["in-module"];
  var compile_module = _g108["compile-module"];
  var eval = _g108.eval;
  function rep(str) {
    var _g528 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g531) {
        return([false, _g531]);
      }
    })();
    var _g1 = _g528[0];
    var x = _g528[1];
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
    var _g529 = args;
    var i = 0;
    while ((i < length(_g529))) {
      var arg = _g529[i];
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
  main();
  return;
})();
