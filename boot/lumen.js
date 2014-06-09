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
  _g33["empty?"] = empty63;
  _g33.tl = tl;
  _g33["id-literal?"] = id_literal63;
  _g33.splice = splice;
  _g33.reverse = reverse;
  _g33.replicate = replicate;
  _g33["keys?"] = keys63;
  _g33.reduce = reduce;
  _g33.add = add;
  _g33.exit = exit;
  _g33.pairwise = pairwise;
  _g33["string?"] = string63;
  _g33["+"] = _43;
  _g33["*"] = _42;
  _g33["-"] = _;
  _g33.split = split;
  _g33["number?"] = number63;
  _g33["table?"] = table63;
  _g33.iterate = iterate;
  _g33.inner = inner;
  _g33["nil?"] = nil63;
  _g33["list?"] = list63;
  _g33["%message-handler"] = _37message_handler;
  _g33["make-id"] = make_id;
  _g33.apply = apply;
  _g33.cat = cat;
  _g33["is?"] = is63;
  _g33["write-file"] = write_file;
  _g33["atom?"] = atom63;
  _g33.drop = drop;
  _g33["parse-number"] = parse_number;
  _g33.write = write;
  _g33.last = last;
  _g33["read-file"] = read_file;
  _g33["<="] = _6061;
  _g33["="] = _61;
  _g33[">="] = _6261;
  _g33.sub = sub;
  _g33["boolean?"] = boolean63;
  _g33["string-literal?"] = string_literal63;
  _g33["<"] = _60;
  _g33[">"] = _62;
  _g33["%"] = _37;
  _g33["/"] = _47;
  _g33["to-string"] = to_string;
  _g33.exclude = exclude;
  _g33.extend = extend;
  _g33.setenv = setenv;
  _g33.unstash = unstash;
  _g33.stash = stash;
  _g33.map = map;
  _g33.find = find;
  _g33.length = length;
  _g33.keep = keep;
  _g33.join = join;
  _g33.code = code;
  _g33.char = char;
  _g33["function?"] = function63;
  _g33["some?"] = some63;
  _g33["composite?"] = composite63;
  _g33.sublist = sublist;
  _g33.search = search;
  _g33.hd = hd;
  _g33.substring = substring;
})();
(function () {
  var _g40 = nexus.runtime;
  var _37message_handler = _g40["%message-handler"];
  var drop = _g40.drop;
  var empty63 = _g40["empty?"];
  var function63 = _g40["function?"];
  var tl = _g40.tl;
  var last = _g40.last;
  var id_literal63 = _g40["id-literal?"];
  var splice = _g40.splice;
  var number63 = _g40["number?"];
  var _6061 = _g40["<="];
  var apply = _g40.apply;
  var _6261 = _g40[">="];
  var sub = _g40.sub;
  var boolean63 = _g40["boolean?"];
  var reverse = _g40.reverse;
  var string_literal63 = _g40["string-literal?"];
  var to_string = _g40["to-string"];
  var find = _g40.find;
  var _61 = _g40["="];
  var join = _g40.join;
  var reduce = _g40.reduce;
  var add = _g40.add;
  var read_file = _g40["read-file"];
  var map = _g40.map;
  var exclude = _g40.exclude;
  var write_file = _g40["write-file"];
  var write = _g40.write;
  var exit = _g40.exit;
  var extend = _g40.extend;
  var pairwise = _g40.pairwise;
  var string63 = _g40["string?"];
  var _60 = _g40["<"];
  var length = _g40.length;
  var _42 = _g40["*"];
  var _ = _g40["-"];
  var _62 = _g40[">"];
  var _47 = _g40["/"];
  var _37 = _g40["%"];
  var _43 = _g40["+"];
  var some63 = _g40["some?"];
  var stash = _g40.stash;
  var split = _g40.split;
  var code = _g40.code;
  var table63 = _g40["table?"];
  var composite63 = _g40["composite?"];
  var search = _g40.search;
  var atom63 = _g40["atom?"];
  var substring = _g40.substring;
  var iterate = _g40.iterate;
  var make_id = _g40["make-id"];
  var hd = _g40.hd;
  var char = _g40.char;
  var keys63 = _g40["keys?"];
  var nil63 = _g40["nil?"];
  var list63 = _g40["list?"];
  var parse_number = _g40["parse-number"];
  var replicate = _g40.replicate;
  var unstash = _g40.unstash;
  var sublist = _g40.sublist;
  var keep = _g40.keep;
  var cat = _g40.cat;
  var inner = _g40.inner;
  var is63 = _g40["is?"];
  var setenv = _g40.setenv;
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
  var reserved = {"/": true, "nil": true, "throw": true, "-": true, "do": true, "+": true, "for": true, "in": true, "var": true, "else": true, "not": true, "continue": true, "true": true, "then": true, "debugger": true, "elseif": true, "switch": true, "or": true, "typeof": true, "and": true, "while": true, "this": true, "default": true, "local": true, "end": true, "with": true, ">=": true, "*": true, "if": true, "instanceof": true, "try": true, "function": true, "catch": true, "until": true, "==": true, "break": true, "case": true, "<": true, ">": true, "false": true, "finally": true, "return": true, "<=": true, "new": true, "%": true, "repeat": true, "delete": true, "=": true, "void": true};
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
    var _g67 = toplevel;
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
      var _g68 = x;
      var b = undefined;
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
    var _g69 = t;
    var k = undefined;
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
  _g71["module-key"] = module_key;
  _g71["variable?"] = variable63;
  _g71["symbol-expansion"] = symbol_expansion;
  _g71.getenv = getenv;
  _g71["special?"] = special63;
  _g71.macroexpand = macroexpand;
  _g71.mapo = mapo;
  _g71.exported = exported;
  _g71.quoted = quoted;
  _g71["stash*"] = stash42;
  _g71["quote-modules"] = quote_modules;
  _g71["quote-environment"] = quote_environment;
  _g71.imported = imported;
  _g71["to-id"] = to_id;
  _g71["symbol?"] = symbol63;
  _g71.indentation = indentation;
  _g71.quasiexpand = quasiexpand;
  _g71["bind*"] = bind42;
  _g71.bind = bind;
  _g71["special-form?"] = special_form63;
  _g71["bound?"] = bound63;
  _g71["valid-id?"] = valid_id63;
  _g71["macro-function"] = macro_function;
  _g71["initial-environment"] = initial_environment;
  _g71["macro?"] = macro63;
})();
(function () {
  var _g73 = nexus.runtime;
  var _37message_handler = _g73["%message-handler"];
  var drop = _g73.drop;
  var empty63 = _g73["empty?"];
  var function63 = _g73["function?"];
  var tl = _g73.tl;
  var last = _g73.last;
  var id_literal63 = _g73["id-literal?"];
  var splice = _g73.splice;
  var number63 = _g73["number?"];
  var _6061 = _g73["<="];
  var apply = _g73.apply;
  var _6261 = _g73[">="];
  var sub = _g73.sub;
  var boolean63 = _g73["boolean?"];
  var reverse = _g73.reverse;
  var string_literal63 = _g73["string-literal?"];
  var to_string = _g73["to-string"];
  var find = _g73.find;
  var _61 = _g73["="];
  var join = _g73.join;
  var reduce = _g73.reduce;
  var add = _g73.add;
  var read_file = _g73["read-file"];
  var map = _g73.map;
  var exclude = _g73.exclude;
  var write_file = _g73["write-file"];
  var write = _g73.write;
  var exit = _g73.exit;
  var extend = _g73.extend;
  var pairwise = _g73.pairwise;
  var string63 = _g73["string?"];
  var _60 = _g73["<"];
  var length = _g73.length;
  var _42 = _g73["*"];
  var _ = _g73["-"];
  var _62 = _g73[">"];
  var _47 = _g73["/"];
  var _37 = _g73["%"];
  var _43 = _g73["+"];
  var some63 = _g73["some?"];
  var stash = _g73.stash;
  var split = _g73.split;
  var code = _g73.code;
  var table63 = _g73["table?"];
  var composite63 = _g73["composite?"];
  var search = _g73.search;
  var atom63 = _g73["atom?"];
  var substring = _g73.substring;
  var iterate = _g73.iterate;
  var make_id = _g73["make-id"];
  var hd = _g73.hd;
  var char = _g73.char;
  var keys63 = _g73["keys?"];
  var nil63 = _g73["nil?"];
  var list63 = _g73["list?"];
  var parse_number = _g73["parse-number"];
  var replicate = _g73.replicate;
  var unstash = _g73.unstash;
  var sublist = _g73.sublist;
  var keep = _g73.keep;
  var cat = _g73.cat;
  var inner = _g73.inner;
  var is63 = _g73["is?"];
  var setenv = _g73.setenv;
  var delimiters = {")": true, "(": true, "\n": true, ";": true};
  var whitespace = {"\t": true, "\n": true, " ": true};
  function make_stream(str) {
    return({string: str, pos: 0, len: length(str)});
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
  _g79["read-table"] = read_table;
  _g79["read-all"] = read_all;
  _g79.read = read;
  _g79["read-from-string"] = read_from_string;
  _g79["make-stream"] = make_stream;
})();
(function () {
  var _g81 = nexus.runtime;
  var _37message_handler = _g81["%message-handler"];
  var drop = _g81.drop;
  var empty63 = _g81["empty?"];
  var function63 = _g81["function?"];
  var tl = _g81.tl;
  var last = _g81.last;
  var id_literal63 = _g81["id-literal?"];
  var splice = _g81.splice;
  var number63 = _g81["number?"];
  var _6061 = _g81["<="];
  var apply = _g81.apply;
  var _6261 = _g81[">="];
  var sub = _g81.sub;
  var boolean63 = _g81["boolean?"];
  var reverse = _g81.reverse;
  var string_literal63 = _g81["string-literal?"];
  var to_string = _g81["to-string"];
  var find = _g81.find;
  var _61 = _g81["="];
  var join = _g81.join;
  var reduce = _g81.reduce;
  var add = _g81.add;
  var read_file = _g81["read-file"];
  var map = _g81.map;
  var exclude = _g81.exclude;
  var write_file = _g81["write-file"];
  var write = _g81.write;
  var exit = _g81.exit;
  var extend = _g81.extend;
  var pairwise = _g81.pairwise;
  var string63 = _g81["string?"];
  var _60 = _g81["<"];
  var length = _g81.length;
  var _42 = _g81["*"];
  var _ = _g81["-"];
  var _62 = _g81[">"];
  var _47 = _g81["/"];
  var _37 = _g81["%"];
  var _43 = _g81["+"];
  var some63 = _g81["some?"];
  var stash = _g81.stash;
  var split = _g81.split;
  var code = _g81.code;
  var table63 = _g81["table?"];
  var composite63 = _g81["composite?"];
  var search = _g81.search;
  var atom63 = _g81["atom?"];
  var substring = _g81.substring;
  var iterate = _g81.iterate;
  var make_id = _g81["make-id"];
  var hd = _g81.hd;
  var char = _g81.char;
  var keys63 = _g81["keys?"];
  var nil63 = _g81["nil?"];
  var list63 = _g81["list?"];
  var parse_number = _g81["parse-number"];
  var replicate = _g81.replicate;
  var unstash = _g81.unstash;
  var sublist = _g81.sublist;
  var keep = _g81.keep;
  var cat = _g81.cat;
  var inner = _g81.inner;
  var is63 = _g81["is?"];
  var setenv = _g81.setenv;
  var _g82 = nexus.utilities;
  var macro_function = _g82["macro-function"];
  var special_form63 = _g82["special-form?"];
  var getenv = _g82.getenv;
  var quasiexpand = _g82.quasiexpand;
  var exported = _g82.exported;
  var quoted = _g82.quoted;
  var valid_id63 = _g82["valid-id?"];
  var special63 = _g82["special?"];
  var stash42 = _g82["stash*"];
  var quote_modules = _g82["quote-modules"];
  var symbol_expansion = _g82["symbol-expansion"];
  var initial_environment = _g82["initial-environment"];
  var macroexpand = _g82.macroexpand;
  var variable63 = _g82["variable?"];
  var bind = _g82.bind;
  var macro63 = _g82["macro?"];
  var indentation = _g82.indentation;
  var quote_environment = _g82["quote-environment"];
  var symbol63 = _g82["symbol?"];
  var mapo = _g82.mapo;
  var imported = _g82.imported;
  var module_key = _g82["module-key"];
  var to_id = _g82["to-id"];
  var bound63 = _g82["bound?"];
  var bind42 = _g82["bind*"];
  var _g83 = nexus.reader;
  var read_table = _g83["read-table"];
  var read_all = _g83["read-all"];
  var read_from_string = _g83["read-from-string"];
  var make_stream = _g83["make-stream"];
  var read = _g83.read;
  var infix = {common: {"+": true, "*": true, "-": true, "<": true, "/": true, ">": true, "<=": true, "%": true, ">=": true}, js: {"=": "===", "~=": "!=", "and": "&&", cat: "+", "or": "||"}, lua: {"=": "==", "~=": true, "and": true, cat: "..", "or": true}};
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
    var _g84 = args;
    var i = 0;
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
    var _g86 = forms;
    var i = 0;
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
    var stmt = _g87.stmt;
    var special = _g87.special;
    var self_tr63 = _g87.tr;
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
    var _g90 = args;
    var i = 0;
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
    var _g114 = toplevel;
    var name = undefined;
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
    var _g115 = m.export;
    var k = undefined;
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
  _g116.eval = eval;
  _g116["open-module"] = open_module;
  _g116["in-module"] = in_module;
  _g116["compile-branch"] = compile_branch;
  _g116["compile-special"] = compile_special;
  _g116["load-module"] = load_module;
  _g116["compile-function"] = compile_function;
  _g116["compile-call"] = compile_call;
  _g116["compile-body"] = compile_body;
  _g116["compile-module"] = compile_module;
  _g116.compile = compile;
})();
(function () {
  var _g119 = nexus.runtime;
  var _37message_handler = _g119["%message-handler"];
  var drop = _g119.drop;
  var empty63 = _g119["empty?"];
  var function63 = _g119["function?"];
  var tl = _g119.tl;
  var last = _g119.last;
  var id_literal63 = _g119["id-literal?"];
  var splice = _g119.splice;
  var number63 = _g119["number?"];
  var _6061 = _g119["<="];
  var apply = _g119.apply;
  var _6261 = _g119[">="];
  var sub = _g119.sub;
  var boolean63 = _g119["boolean?"];
  var reverse = _g119.reverse;
  var string_literal63 = _g119["string-literal?"];
  var to_string = _g119["to-string"];
  var find = _g119.find;
  var _61 = _g119["="];
  var join = _g119.join;
  var reduce = _g119.reduce;
  var add = _g119.add;
  var read_file = _g119["read-file"];
  var map = _g119.map;
  var exclude = _g119.exclude;
  var write_file = _g119["write-file"];
  var write = _g119.write;
  var exit = _g119.exit;
  var extend = _g119.extend;
  var pairwise = _g119.pairwise;
  var string63 = _g119["string?"];
  var _60 = _g119["<"];
  var length = _g119.length;
  var _42 = _g119["*"];
  var _ = _g119["-"];
  var _62 = _g119[">"];
  var _47 = _g119["/"];
  var _37 = _g119["%"];
  var _43 = _g119["+"];
  var some63 = _g119["some?"];
  var stash = _g119.stash;
  var split = _g119.split;
  var code = _g119.code;
  var table63 = _g119["table?"];
  var composite63 = _g119["composite?"];
  var search = _g119.search;
  var atom63 = _g119["atom?"];
  var substring = _g119.substring;
  var iterate = _g119.iterate;
  var make_id = _g119["make-id"];
  var hd = _g119.hd;
  var char = _g119.char;
  var keys63 = _g119["keys?"];
  var nil63 = _g119["nil?"];
  var list63 = _g119["list?"];
  var parse_number = _g119["parse-number"];
  var replicate = _g119.replicate;
  var unstash = _g119.unstash;
  var sublist = _g119.sublist;
  var keep = _g119.keep;
  var cat = _g119.cat;
  var inner = _g119.inner;
  var is63 = _g119["is?"];
  var setenv = _g119.setenv;
  var _g120 = nexus.utilities;
  var macro_function = _g120["macro-function"];
  var special_form63 = _g120["special-form?"];
  var getenv = _g120.getenv;
  var quasiexpand = _g120.quasiexpand;
  var exported = _g120.exported;
  var quoted = _g120.quoted;
  var valid_id63 = _g120["valid-id?"];
  var special63 = _g120["special?"];
  var stash42 = _g120["stash*"];
  var quote_modules = _g120["quote-modules"];
  var symbol_expansion = _g120["symbol-expansion"];
  var initial_environment = _g120["initial-environment"];
  var macroexpand = _g120.macroexpand;
  var variable63 = _g120["variable?"];
  var bind = _g120.bind;
  var macro63 = _g120["macro?"];
  var indentation = _g120.indentation;
  var quote_environment = _g120["quote-environment"];
  var symbol63 = _g120["symbol?"];
  var mapo = _g120.mapo;
  var imported = _g120.imported;
  var module_key = _g120["module-key"];
  var to_id = _g120["to-id"];
  var bound63 = _g120["bound?"];
  var bind42 = _g120["bind*"];
  var _g121 = nexus.compiler;
  var compile_branch = _g121["compile-branch"];
  var compile_module = _g121["compile-module"];
  var compile_function = _g121["compile-function"];
  var in_module = _g121["in-module"];
  var open_module = _g121["open-module"];
  var compile_body = _g121["compile-body"];
  var compile_call = _g121["compile-call"];
  var eval = _g121.eval;
  var load_module = _g121["load-module"];
  var compile = _g121.compile;
  var compile_special = _g121["compile-special"];
})();
(function () {
  var _g230 = nexus.runtime;
  var _37message_handler = _g230["%message-handler"];
  var drop = _g230.drop;
  var empty63 = _g230["empty?"];
  var function63 = _g230["function?"];
  var tl = _g230.tl;
  var last = _g230.last;
  var id_literal63 = _g230["id-literal?"];
  var splice = _g230.splice;
  var number63 = _g230["number?"];
  var _6061 = _g230["<="];
  var apply = _g230.apply;
  var _6261 = _g230[">="];
  var sub = _g230.sub;
  var boolean63 = _g230["boolean?"];
  var reverse = _g230.reverse;
  var string_literal63 = _g230["string-literal?"];
  var to_string = _g230["to-string"];
  var find = _g230.find;
  var _61 = _g230["="];
  var join = _g230.join;
  var reduce = _g230.reduce;
  var add = _g230.add;
  var read_file = _g230["read-file"];
  var map = _g230.map;
  var exclude = _g230.exclude;
  var write_file = _g230["write-file"];
  var write = _g230.write;
  var exit = _g230.exit;
  var extend = _g230.extend;
  var pairwise = _g230.pairwise;
  var string63 = _g230["string?"];
  var _60 = _g230["<"];
  var length = _g230.length;
  var _42 = _g230["*"];
  var _ = _g230["-"];
  var _62 = _g230[">"];
  var _47 = _g230["/"];
  var _37 = _g230["%"];
  var _43 = _g230["+"];
  var some63 = _g230["some?"];
  var stash = _g230.stash;
  var split = _g230.split;
  var code = _g230.code;
  var table63 = _g230["table?"];
  var composite63 = _g230["composite?"];
  var search = _g230.search;
  var atom63 = _g230["atom?"];
  var substring = _g230.substring;
  var iterate = _g230.iterate;
  var make_id = _g230["make-id"];
  var hd = _g230.hd;
  var char = _g230.char;
  var keys63 = _g230["keys?"];
  var nil63 = _g230["nil?"];
  var list63 = _g230["list?"];
  var parse_number = _g230["parse-number"];
  var replicate = _g230.replicate;
  var unstash = _g230.unstash;
  var sublist = _g230.sublist;
  var keep = _g230.keep;
  var cat = _g230.cat;
  var inner = _g230.inner;
  var is63 = _g230["is?"];
  var setenv = _g230.setenv;
  var _g231 = nexus.utilities;
  var macro_function = _g231["macro-function"];
  var special_form63 = _g231["special-form?"];
  var getenv = _g231.getenv;
  var quasiexpand = _g231.quasiexpand;
  var exported = _g231.exported;
  var quoted = _g231.quoted;
  var valid_id63 = _g231["valid-id?"];
  var special63 = _g231["special?"];
  var stash42 = _g231["stash*"];
  var quote_modules = _g231["quote-modules"];
  var symbol_expansion = _g231["symbol-expansion"];
  var initial_environment = _g231["initial-environment"];
  var macroexpand = _g231.macroexpand;
  var variable63 = _g231["variable?"];
  var bind = _g231.bind;
  var macro63 = _g231["macro?"];
  var indentation = _g231.indentation;
  var quote_environment = _g231["quote-environment"];
  var symbol63 = _g231["symbol?"];
  var mapo = _g231.mapo;
  var imported = _g231.imported;
  var module_key = _g231["module-key"];
  var to_id = _g231["to-id"];
  var bound63 = _g231["bound?"];
  var bind42 = _g231["bind*"];
  var _g232 = nexus.compiler;
  var compile_branch = _g232["compile-branch"];
  var compile_module = _g232["compile-module"];
  var compile_function = _g232["compile-function"];
  var in_module = _g232["in-module"];
  var open_module = _g232["open-module"];
  var compile_body = _g232["compile-body"];
  var compile_call = _g232["compile-call"];
  var eval = _g232.eval;
  var load_module = _g232["load-module"];
  var compile = _g232.compile;
  var compile_special = _g232["compile-special"];
  global.target = "js";
})();
(function () {
  var _g381 = nexus.runtime;
  var _37message_handler = _g381["%message-handler"];
  var drop = _g381.drop;
  var empty63 = _g381["empty?"];
  var function63 = _g381["function?"];
  var tl = _g381.tl;
  var last = _g381.last;
  var id_literal63 = _g381["id-literal?"];
  var splice = _g381.splice;
  var number63 = _g381["number?"];
  var _6061 = _g381["<="];
  var apply = _g381.apply;
  var _6261 = _g381[">="];
  var sub = _g381.sub;
  var boolean63 = _g381["boolean?"];
  var reverse = _g381.reverse;
  var string_literal63 = _g381["string-literal?"];
  var to_string = _g381["to-string"];
  var find = _g381.find;
  var _61 = _g381["="];
  var join = _g381.join;
  var reduce = _g381.reduce;
  var add = _g381.add;
  var read_file = _g381["read-file"];
  var map = _g381.map;
  var exclude = _g381.exclude;
  var write_file = _g381["write-file"];
  var write = _g381.write;
  var exit = _g381.exit;
  var extend = _g381.extend;
  var pairwise = _g381.pairwise;
  var string63 = _g381["string?"];
  var _60 = _g381["<"];
  var length = _g381.length;
  var _42 = _g381["*"];
  var _ = _g381["-"];
  var _62 = _g381[">"];
  var _47 = _g381["/"];
  var _37 = _g381["%"];
  var _43 = _g381["+"];
  var some63 = _g381["some?"];
  var stash = _g381.stash;
  var split = _g381.split;
  var code = _g381.code;
  var table63 = _g381["table?"];
  var composite63 = _g381["composite?"];
  var search = _g381.search;
  var atom63 = _g381["atom?"];
  var substring = _g381.substring;
  var iterate = _g381.iterate;
  var make_id = _g381["make-id"];
  var hd = _g381.hd;
  var char = _g381.char;
  var keys63 = _g381["keys?"];
  var nil63 = _g381["nil?"];
  var list63 = _g381["list?"];
  var parse_number = _g381["parse-number"];
  var replicate = _g381.replicate;
  var unstash = _g381.unstash;
  var sublist = _g381.sublist;
  var keep = _g381.keep;
  var cat = _g381.cat;
  var inner = _g381.inner;
  var is63 = _g381["is?"];
  var setenv = _g381.setenv;
  var _g382 = nexus.utilities;
  var macro_function = _g382["macro-function"];
  var special_form63 = _g382["special-form?"];
  var getenv = _g382.getenv;
  var quasiexpand = _g382.quasiexpand;
  var exported = _g382.exported;
  var quoted = _g382.quoted;
  var valid_id63 = _g382["valid-id?"];
  var special63 = _g382["special?"];
  var stash42 = _g382["stash*"];
  var quote_modules = _g382["quote-modules"];
  var symbol_expansion = _g382["symbol-expansion"];
  var initial_environment = _g382["initial-environment"];
  var macroexpand = _g382.macroexpand;
  var variable63 = _g382["variable?"];
  var bind = _g382.bind;
  var macro63 = _g382["macro?"];
  var indentation = _g382.indentation;
  var quote_environment = _g382["quote-environment"];
  var symbol63 = _g382["symbol?"];
  var mapo = _g382.mapo;
  var imported = _g382.imported;
  var module_key = _g382["module-key"];
  var to_id = _g382["to-id"];
  var bound63 = _g382["bound?"];
  var bind42 = _g382["bind*"];
  var _g383 = nexus.compiler;
  var compile_branch = _g383["compile-branch"];
  var compile_module = _g383["compile-module"];
  var compile_function = _g383["compile-function"];
  var in_module = _g383["in-module"];
  var open_module = _g383["open-module"];
  var compile_body = _g383["compile-body"];
  var compile_call = _g383["compile-call"];
  var eval = _g383.eval;
  var load_module = _g383["load-module"];
  var compile = _g383.compile;
  var compile_special = _g383["compile-special"];
  global.modules = {core: {export: {"join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g390 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g390)]));
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g391 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g391)]));
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g392 = sub(body, 0);
    var form = join(["fn", args], _g392);
    eval(join((function () {
      var _g393 = ["setenv", join(["quote", name])];
      _g393.macro = form;
      _g393.form = join(["quote", form]);
      return(_g393);
    })()));
    return(undefined);
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g394 = xs;
      var i = 0;
      while ((i < length(_g394))) {
        var x = _g394[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g395 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g395))) {
      var _g396 = bind42(x, _g395);
      var args = _g396[0];
      var _g397 = _g396[1];
      return(join(["%global-function", name, args], _g397));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g398 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g399 = ["table"];
      _g399._scope = scope;
      return(_g399);
    })())]), join(["let", join([x, join(["do"], _g398)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g400 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g400))) {
      var _g401 = bind42(x, _g400);
      var args = _g401[0];
      var _g402 = _g401[1];
      return(join(["%local-function", name, args], _g402));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g403 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g403)]));
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g404 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g404), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g405 = ["target"];
          _g405.lua = join(["not", join(["number?", k])]);
          _g405.js = join(["isNaN", join(["parseInt", k])]);
          return(_g405);
        })()), join(["let", join([v, join(["get", t1, k])])], _g404)])])]));
      }
    })()]));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g406 = sub(body, 0);
    var _g407 = bind42(args, _g406);
    var _g408 = _g407[0];
    var _g409 = _g407[1];
    return(join(["%function", _g408], _g409));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g410 = sub(body, 0);
    add(environment, {});
    var _g411 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g410)));
    })();
    drop(environment);
    return(_g411);
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g412 = body;
      var k = undefined;
      for (k in _g412) {
        if (isNaN(parseInt(k))) {
          var v = _g412[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g413 = sub(body, 0);
    var form = join(["fn", args], _g413);
    var keys = sub(_g413, length(_g413));
    eval(join((function () {
      var _g414 = ["setenv", join(["quote", name])];
      _g414.special = form;
      _g414.form = join(["quote", form]);
      return(_g414);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g415 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g416) {
      var lh = _g416[0];
      var rh = _g416[1];
      var _g417 = bind(lh, rh);
      var _g418 = 0;
      while ((_g418 < length(_g417))) {
        var _g419 = _g417[_g418];
        var id = _g419[0];
        var val = _g419[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g418 = (_g418 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g415)])));
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g420 = elements;
    var _g421 = 0;
    while ((_g421 < length(_g420))) {
      var e = _g420[_g421];
      l[e] = true;
      _g421 = (_g421 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, "with-bindings": {macro: function (_g422) {
    var names = _g422[0];
    var body = unstash(sublist(arguments, 1));
    var _g423 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g424 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g425 = ["setenv", x];
        _g425.variable = true;
        return(_g425);
      })())])];
      _g424.scope = true;
      return(_g424);
    })(), _g423));
  }, module: "core", export: true}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", global: true, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g229, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g426 = sub(body, 0);
    add(environment, {});
    var _g427 = (function () {
      map(function (_g428) {
        var name = _g428[0];
        var exp = _g428[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g426)));
    })();
    drop(environment);
    return(_g427);
  }, module: "core", export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, boot: {export: {}, import: ["runtime", "utilities", "special", "core", "compiler"]}, compiler: {export: {"compile-branch": {variable: true, export: true, module: "compiler"}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g429 = sub(body, 0);
    var imports = [];
    var imp = _g429.import;
    var exp = _g429.export;
    var _g430 = (imp || []);
    var _g431 = 0;
    while ((_g431 < length(_g430))) {
      var k = _g430[_g431];
      load_module(k);
      imports = join(imports, imported(k));
      _g431 = (_g431 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g432 = (exp || []);
    var _g433 = 0;
    while ((_g433 < length(_g432))) {
      var k = _g432[_g433];
      setenv(k, {_stash: true, export: true});
      _g433 = (_g433 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}, "load-module": {variable: true, export: true, module: "compiler"}, "in-module": {variable: true, export: true, module: "compiler"}, compile: {variable: true, export: true, module: "compiler"}, "open-module": {variable: true, export: true, module: "compiler"}, eval: {variable: true, export: true, module: "compiler"}, "compile-module": {variable: true, export: true, module: "compiler"}, "compile-call": {variable: true, export: true, module: "compiler"}, "compile-body": {variable: true, export: true, module: "compiler"}, "compile-function": {variable: true, export: true, module: "compiler"}, "current-module": {export: true, global: true, module: "compiler"}, "compile-special": {variable: true, export: true, module: "compiler"}}, import: ["runtime", "utilities", "special", "core", "reader"]}, special: {export: {"%object": {module: "special", special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g434 = pairs;
    var i = 0;
    while ((i < length(_g434))) {
      var _g435 = _g434[i];
      var k = _g435[0];
      var v = _g435[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g436 = compile(v);
      var _g437 = (function () {
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
      str = (str + _g437 + sep + _g436);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true}, "not": {module: "special", special: function (_g438) {
    var x = _g438[0];
    var _g439 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g439 + ")"));
  }, export: true}, "error": {stmt: true, module: "special", special: function (_g440) {
    var x = _g440[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true}, "%global-function": {tr: true, special: function (_g441) {
    var name = _g441[0];
    var args = _g441[1];
    var body = sub(_g441, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, export: true, stmt: true, module: "special"}, "%array": {module: "special", special: function (forms) {
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
    var _g442 = forms;
    var i = 0;
    while ((i < length(_g442))) {
      var x = _g442[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true}, "if": {tr: true, special: function (form, tail63) {
    var str = "";
    var _g443 = form;
    var i = 0;
    while ((i < length(_g443))) {
      var condition = _g443[i];
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
  }, export: true, stmt: true, module: "special"}, "while": {tr: true, special: function (_g444) {
    var condition = _g444[0];
    var body = sub(_g444, 1);
    var _g445 = compile(condition);
    var _g446 = (function () {
      indent_level = (indent_level + 1);
      var _g447 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g447);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g445 + ") {\n" + _g446 + ind + "}\n"));
    } else {
      return((ind + "while " + _g445 + " do\n" + _g446 + ind + "end\n"));
    }
  }, export: true, stmt: true, module: "special"}, "%local-function": {tr: true, special: function (_g448) {
    var name = _g448[0];
    var args = _g448[1];
    var body = sub(_g448, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, export: true, stmt: true, module: "special"}, "get": {module: "special", special: function (_g449) {
    var t = _g449[0];
    var k = _g449[1];
    var _g450 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g450, 0) === "{"))) {
      _g450 = ("(" + _g450 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g450 + "." + inner(k)));
    } else {
      return((_g450 + "[" + k1 + "]"));
    }
  }, export: true}, "return": {stmt: true, module: "special", special: function (_g451) {
    var x = _g451[0];
    var _g452 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g452));
  }, export: true}, "break": {stmt: true, module: "special", special: function (_g118) {
    return((indentation() + "break"));
  }, export: true}, "do": {tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, export: true, stmt: true, module: "special"}, "%function": {module: "special", special: function (_g453) {
    var args = _g453[0];
    var body = sub(_g453, 1);
    return(compile_function(args, body));
  }, export: true}, "%try": {tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g454 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g454);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g455 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g455);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, export: true, stmt: true, module: "special"}, "set": {stmt: true, module: "special", special: function (_g456) {
    var lh = _g456[0];
    var rh = _g456[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true}, "%local": {stmt: true, module: "special", special: function (_g457) {
    var name = _g457[0];
    var value = _g457[1];
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
  }, export: true}, "%for": {tr: true, special: function (_g458) {
    var _g459 = _g458[0];
    var t = _g459[0];
    var k = _g459[1];
    var body = sub(_g458, 1);
    var _g460 = compile(t);
    var ind = indentation();
    var _g461 = (function () {
      indent_level = (indent_level + 1);
      var _g462 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g462);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g460 + " do\n" + _g461 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g460 + ") {\n" + _g461 + ind + "}\n"));
    }
  }, export: true, stmt: true, module: "special"}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, lib: {export: {}, import: ["core", "special"]}, runtime: {export: {print: {export: true, global: true, module: "runtime"}, "empty?": {variable: true, export: true, module: "runtime"}, tl: {variable: true, export: true, module: "runtime"}, "id-literal?": {variable: true, export: true, module: "runtime"}, splice: {variable: true, export: true, module: "runtime"}, reverse: {variable: true, export: true, module: "runtime"}, replicate: {variable: true, export: true, module: "runtime"}, find: {variable: true, export: true, module: "runtime"}, "=": {variable: true, export: true, module: "runtime"}, apply: {variable: true, export: true, module: "runtime"}, reduce: {variable: true, export: true, module: "runtime"}, ">": {variable: true, export: true, module: "runtime"}, exclude: {variable: true, export: true, module: "runtime"}, exit: {variable: true, export: true, module: "runtime"}, extend: {variable: true, export: true, module: "runtime"}, pairwise: {variable: true, export: true, module: "runtime"}, "string?": {variable: true, export: true, module: "runtime"}, "+": {variable: true, export: true, module: "runtime"}, "*": {variable: true, export: true, module: "runtime"}, "-": {variable: true, export: true, module: "runtime"}, "/": {variable: true, export: true, module: "runtime"}, stash: {variable: true, export: true, module: "runtime"}, split: {variable: true, export: true, module: "runtime"}, "number?": {variable: true, export: true, module: "runtime"}, "table?": {variable: true, export: true, module: "runtime"}, iterate: {variable: true, export: true, module: "runtime"}, "make-id": {variable: true, export: true, module: "runtime"}, inner: {variable: true, export: true, module: "runtime"}, "nil?": {variable: true, export: true, module: "runtime"}, "list?": {variable: true, export: true, module: "runtime"}, sublist: {variable: true, export: true, module: "runtime"}, cat: {variable: true, export: true, module: "runtime"}, "is?": {variable: true, export: true, module: "runtime"}, "write-file": {variable: true, export: true, module: "runtime"}, drop: {variable: true, export: true, module: "runtime"}, "function?": {variable: true, export: true, module: "runtime"}, last: {variable: true, export: true, module: "runtime"}, "<=": {variable: true, export: true, module: "runtime"}, ">=": {variable: true, export: true, module: "runtime"}, sub: {variable: true, export: true, module: "runtime"}, keep: {variable: true, export: true, module: "runtime"}, map: {variable: true, export: true, module: "runtime"}, join: {variable: true, export: true, module: "runtime"}, "read-file": {variable: true, export: true, module: "runtime"}, "to-string": {variable: true, export: true, module: "runtime"}, length: {variable: true, export: true, module: "runtime"}, "some?": {variable: true, export: true, module: "runtime"}, "composite?": {variable: true, export: true, module: "runtime"}, "atom?": {variable: true, export: true, module: "runtime"}, "string-literal?": {variable: true, export: true, module: "runtime"}, "%": {variable: true, export: true, module: "runtime"}, hd: {variable: true, export: true, module: "runtime"}, search: {variable: true, export: true, module: "runtime"}, "boolean?": {variable: true, export: true, module: "runtime"}, write: {variable: true, export: true, module: "runtime"}, "keys?": {variable: true, export: true, module: "runtime"}, "parse-number": {variable: true, export: true, module: "runtime"}, add: {variable: true, export: true, module: "runtime"}, unstash: {variable: true, export: true, module: "runtime"}, substring: {variable: true, export: true, module: "runtime"}, char: {variable: true, export: true, module: "runtime"}, code: {variable: true, export: true, module: "runtime"}, setenv: {variable: true, export: true, module: "runtime"}, "<": {variable: true, export: true, module: "runtime"}, "%message-handler": {variable: true, export: true, module: "runtime"}}, import: ["special", "core"]}, utilities: {export: {"macro-function": {variable: true, export: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, "special-form?": {variable: true, export: true, module: "utilities"}, getenv: {variable: true, export: true, module: "utilities"}, quasiexpand: {variable: true, export: true, module: "utilities"}, exported: {variable: true, export: true, module: "utilities"}, quoted: {variable: true, export: true, module: "utilities"}, "valid-id?": {variable: true, export: true, module: "utilities"}, "special?": {variable: true, export: true, module: "utilities"}, "stash*": {variable: true, export: true, module: "utilities"}, "quote-modules": {variable: true, export: true, module: "utilities"}, "symbol-expansion": {variable: true, export: true, module: "utilities"}, "bound?": {variable: true, export: true, module: "utilities"}, "initial-environment": {variable: true, export: true, module: "utilities"}, macroexpand: {variable: true, export: true, module: "utilities"}, "variable?": {variable: true, export: true, module: "utilities"}, mapo: {variable: true, export: true, module: "utilities"}, "macro?": {variable: true, export: true, module: "utilities"}, indentation: {variable: true, export: true, module: "utilities"}, bind: {variable: true, export: true, module: "utilities"}, "symbol?": {variable: true, export: true, module: "utilities"}, "bind*": {variable: true, export: true, module: "utilities"}, "to-id": {variable: true, export: true, module: "utilities"}, imported: {variable: true, export: true, module: "utilities"}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, export: true, module: "utilities"}, "quote-environment": {variable: true, export: true, module: "utilities"}, "module-key": {variable: true, export: true, module: "utilities"}}, import: ["runtime", "special", "core"]}, reader: {export: {"define-reader": {macro: function (_g463) {
    var char = _g463[0];
    var stream = _g463[1];
    var body = unstash(sublist(arguments, 1));
    var _g464 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g464)]));
  }, export: true, module: "reader"}, "read-all": {variable: true, export: true, module: "reader"}, "read-table": {variable: true, export: true, module: "reader"}, "read-from-string": {variable: true, export: true, module: "reader"}, "make-stream": {variable: true, export: true, module: "reader"}, read: {variable: true, export: true, module: "reader"}}, import: ["runtime", "special", "core"]}, system: {export: {nexus: {export: true, global: true, module: "system"}}, import: ["special", "core"]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g465 = sub(body, 0);
    var imports = [];
    var imp = _g465.import;
    var exp = _g465.export;
    var _g466 = (imp || []);
    var _g467 = 0;
    while ((_g467 < length(_g466))) {
      var k = _g466[_g467];
      load_module(k);
      imports = join(imports, imported(k));
      _g467 = (_g467 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g468 = (exp || []);
    var _g469 = 0;
    while ((_g469 < length(_g468))) {
      var k = _g468[_g469];
      setenv(k, {_stash: true, export: true});
      _g469 = (_g469 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}}];
})();
(function () {
  var _g34 = nexus.runtime;
  var _37message_handler = _g34["%message-handler"];
  var drop = _g34.drop;
  var empty63 = _g34["empty?"];
  var function63 = _g34["function?"];
  var tl = _g34.tl;
  var last = _g34.last;
  var id_literal63 = _g34["id-literal?"];
  var splice = _g34.splice;
  var number63 = _g34["number?"];
  var _6061 = _g34["<="];
  var apply = _g34.apply;
  var _6261 = _g34[">="];
  var sub = _g34.sub;
  var boolean63 = _g34["boolean?"];
  var reverse = _g34.reverse;
  var string_literal63 = _g34["string-literal?"];
  var to_string = _g34["to-string"];
  var find = _g34.find;
  var _61 = _g34["="];
  var join = _g34.join;
  var reduce = _g34.reduce;
  var add = _g34.add;
  var read_file = _g34["read-file"];
  var map = _g34.map;
  var exclude = _g34.exclude;
  var write_file = _g34["write-file"];
  var write = _g34.write;
  var exit = _g34.exit;
  var extend = _g34.extend;
  var pairwise = _g34.pairwise;
  var string63 = _g34["string?"];
  var _60 = _g34["<"];
  var length = _g34.length;
  var _42 = _g34["*"];
  var _ = _g34["-"];
  var _62 = _g34[">"];
  var _47 = _g34["/"];
  var _37 = _g34["%"];
  var _43 = _g34["+"];
  var some63 = _g34["some?"];
  var stash = _g34.stash;
  var split = _g34.split;
  var code = _g34.code;
  var table63 = _g34["table?"];
  var composite63 = _g34["composite?"];
  var search = _g34.search;
  var atom63 = _g34["atom?"];
  var substring = _g34.substring;
  var iterate = _g34.iterate;
  var make_id = _g34["make-id"];
  var hd = _g34.hd;
  var char = _g34.char;
  var keys63 = _g34["keys?"];
  var nil63 = _g34["nil?"];
  var list63 = _g34["list?"];
  var parse_number = _g34["parse-number"];
  var replicate = _g34.replicate;
  var unstash = _g34.unstash;
  var sublist = _g34.sublist;
  var keep = _g34.keep;
  var cat = _g34.cat;
  var inner = _g34.inner;
  var is63 = _g34["is?"];
  var setenv = _g34.setenv;
  var _g72 = nexus.utilities;
  var macro_function = _g72["macro-function"];
  var special_form63 = _g72["special-form?"];
  var getenv = _g72.getenv;
  var quasiexpand = _g72.quasiexpand;
  var exported = _g72.exported;
  var quoted = _g72.quoted;
  var valid_id63 = _g72["valid-id?"];
  var special63 = _g72["special?"];
  var stash42 = _g72["stash*"];
  var quote_modules = _g72["quote-modules"];
  var symbol_expansion = _g72["symbol-expansion"];
  var initial_environment = _g72["initial-environment"];
  var macroexpand = _g72.macroexpand;
  var variable63 = _g72["variable?"];
  var bind = _g72.bind;
  var macro63 = _g72["macro?"];
  var indentation = _g72.indentation;
  var quote_environment = _g72["quote-environment"];
  var symbol63 = _g72["symbol?"];
  var mapo = _g72.mapo;
  var imported = _g72.imported;
  var module_key = _g72["module-key"];
  var to_id = _g72["to-id"];
  var bound63 = _g72["bound?"];
  var bind42 = _g72["bind*"];
  var _g80 = nexus.reader;
  var read_table = _g80["read-table"];
  var read_all = _g80["read-all"];
  var read_from_string = _g80["read-from-string"];
  var make_stream = _g80["make-stream"];
  var read = _g80.read;
  var _g117 = nexus.compiler;
  var compile_branch = _g117["compile-branch"];
  var compile_module = _g117["compile-module"];
  var compile_function = _g117["compile-function"];
  var in_module = _g117["in-module"];
  var open_module = _g117["open-module"];
  var compile_body = _g117["compile-body"];
  var compile_call = _g117["compile-call"];
  var eval = _g117.eval;
  var load_module = _g117["load-module"];
  var compile = _g117.compile;
  var compile_special = _g117["compile-special"];
  function rep(str) {
    var _g471 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g474) {
        return([false, _g474]);
      }
    })();
    var _g1 = _g471[0];
    var x = _g471[1];
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
    var _g472 = args;
    var i = 0;
    while ((i < length(_g472))) {
      var arg = _g472[i];
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
