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
  function map(f, l) {
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
  function map42(f, t) {
    var l = map(f, t);
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
  _g33.last = last;
  _g33.sub = sub;
  _g33["to-string"] = to_string;
  _g33["number?"] = number63;
  _g33["%message-handler"] = _37message_handler;
  _g33["<="] = _6061;
  _g33["atom?"] = atom63;
  _g33.hd = hd;
  _g33["some?"] = some63;
  _g33["function?"] = function63;
  _g33["="] = _61;
  _g33[">"] = _62;
  _g33["<"] = _60;
  _g33.unstash = unstash;
  _g33["string?"] = string63;
  _g33.reverse = reverse;
  _g33["id-literal?"] = id_literal63;
  _g33["make-id"] = make_id;
  _g33.cat = cat;
  _g33[">="] = _6261;
  _g33["parse-number"] = parse_number;
  _g33.find = find;
  _g33.exit = exit;
  _g33.write = write;
  _g33["read-file"] = read_file;
  _g33.apply = apply;
  _g33.stash = stash;
  _g33.length = length;
  _g33["empty?"] = empty63;
  _g33.reduce = reduce;
  _g33["*"] = _42;
  _g33["composite?"] = composite63;
  _g33["-"] = _;
  _g33.map = map;
  _g33.inner = inner;
  _g33["+"] = _43;
  _g33.split = split;
  _g33["%"] = _37;
  _g33.pairwise = pairwise;
  _g33.substring = substring;
  _g33["map*"] = map42;
  _g33.setenv = setenv;
  _g33.search = search;
  _g33["keys?"] = keys63;
  _g33.keep = keep;
  _g33.extend = extend;
  _g33.char = char;
  _g33.splice = splice;
  _g33.iterate = iterate;
  _g33.exclude = exclude;
  _g33.join = join;
  _g33["/"] = _47;
  _g33.sublist = sublist;
  _g33.drop = drop;
  _g33["string-literal?"] = string_literal63;
  _g33["write-file"] = write_file;
  _g33.code = code;
  _g33["list?"] = list63;
  _g33["table?"] = table63;
  _g33.tl = tl;
  _g33["boolean?"] = boolean63;
  _g33.replicate = replicate;
  _g33["is?"] = is63;
  _g33["nil?"] = nil63;
  _g33.add = add;
})();
(function () {
  var _g40 = nexus.runtime;
  var last = _g40.last;
  var sub = _g40.sub;
  var to_string = _g40["to-string"];
  var stash = _g40.stash;
  var keys63 = _g40["keys?"];
  var drop = _g40.drop;
  var _6261 = _g40[">="];
  var _37message_handler = _g40["%message-handler"];
  var _6061 = _g40["<="];
  var atom63 = _g40["atom?"];
  var table63 = _g40["table?"];
  var hd = _g40.hd;
  var some63 = _g40["some?"];
  var function63 = _g40["function?"];
  var _61 = _g40["="];
  var _62 = _g40[">"];
  var _60 = _g40["<"];
  var pairwise = _g40.pairwise;
  var reverse = _g40.reverse;
  var reduce = _g40.reduce;
  var make_id = _g40["make-id"];
  var cat = _g40.cat;
  var find = _g40.find;
  var apply = _g40.apply;
  var length = _g40.length;
  var empty63 = _g40["empty?"];
  var composite63 = _g40["composite?"];
  var map = _g40.map;
  var inner = _g40.inner;
  var _37 = _g40["%"];
  var substring = _g40.substring;
  var _ = _g40["-"];
  var keep = _g40.keep;
  var setenv = _g40.setenv;
  var extend = _g40.extend;
  var _42 = _g40["*"];
  var list63 = _g40["list?"];
  var exclude = _g40.exclude;
  var join = _g40.join;
  var _47 = _g40["/"];
  var sublist = _g40.sublist;
  var write_file = _g40["write-file"];
  var code = _g40.code;
  var splice = _g40.splice;
  var id_literal63 = _g40["id-literal?"];
  var number63 = _g40["number?"];
  var unstash = _g40.unstash;
  var boolean63 = _g40["boolean?"];
  var exit = _g40.exit;
  var tl = _g40.tl;
  var map42 = _g40["map*"];
  var search = _g40.search;
  var write = _g40.write;
  var char = _g40.char;
  var replicate = _g40.replicate;
  var _43 = _g40["+"];
  var read_file = _g40["read-file"];
  var split = _g40.split;
  var parse_number = _g40["parse-number"];
  var string63 = _g40["string?"];
  var is63 = _g40["is?"];
  var nil63 = _g40["nil?"];
  var iterate = _g40.iterate;
  var string_literal63 = _g40["string-literal?"];
  var add = _g40.add;
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
      return(join(["list"], map42(quoted, form)));
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
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g49)));
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
          return(join([x, name, map42(macroexpand, _g54)], macroexpand(_g55)));
        })();
        drop(environment);
        return(_g57);
      } else if (macro63(x)) {
        return(macroexpand(apply(macro_function(x), tl(form))));
      } else {
        return(map42(macroexpand, form));
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
      return(map42(function (x) {
        return(quasiexpand(x, depth));
      }, form));
    }
  };
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"void": true, "continue": true, "instanceof": true, "this": true, "*": true, "throw": true, "or": true, "default": true, "elseif": true, "function": true, "return": true, "=": true, "catch": true, "else": true, "nil": true, "<": true, "delete": true, "finally": true, "/": true, "debugger": true, "repeat": true, ">=": true, "false": true, "while": true, "new": true, "with": true, "until": true, "var": true, "end": true, "not": true, "break": true, "and": true, "then": true, "do": true, "%": true, "typeof": true, "-": true, "try": true, "case": true, "<=": true, "==": true, "for": true, "+": true, "true": true, ">": true, "switch": true, "in": true, "if": true, "local": true};
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
    return(join(["table"], map42(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g71 = {};
  nexus.utilities = _g71;
  _g71["bound?"] = bound63;
  _g71["stash*"] = stash42;
  _g71["to-id"] = to_id;
  _g71["symbol?"] = symbol63;
  _g71["macro?"] = macro63;
  _g71["special-form?"] = special_form63;
  _g71["module-key"] = module_key;
  _g71.quasiexpand = quasiexpand;
  _g71["bind*"] = bind42;
  _g71.mapo = mapo;
  _g71.imported = imported;
  _g71.indentation = indentation;
  _g71["valid-id?"] = valid_id63;
  _g71.quoted = quoted;
  _g71["initial-environment"] = initial_environment;
  _g71.bind = bind;
  _g71["variable?"] = variable63;
  _g71.exported = exported;
  _g71.getenv = getenv;
  _g71["quote-modules"] = quote_modules;
  _g71["quote-environment"] = quote_environment;
  _g71["symbol-expansion"] = symbol_expansion;
  _g71["special?"] = special63;
  _g71["macro-function"] = macro_function;
  _g71.macroexpand = macroexpand;
})();
(function () {
  var _g73 = nexus.runtime;
  var last = _g73.last;
  var sub = _g73.sub;
  var to_string = _g73["to-string"];
  var stash = _g73.stash;
  var keys63 = _g73["keys?"];
  var drop = _g73.drop;
  var _6261 = _g73[">="];
  var _37message_handler = _g73["%message-handler"];
  var _6061 = _g73["<="];
  var atom63 = _g73["atom?"];
  var table63 = _g73["table?"];
  var hd = _g73.hd;
  var some63 = _g73["some?"];
  var function63 = _g73["function?"];
  var _61 = _g73["="];
  var _62 = _g73[">"];
  var _60 = _g73["<"];
  var pairwise = _g73.pairwise;
  var reverse = _g73.reverse;
  var reduce = _g73.reduce;
  var make_id = _g73["make-id"];
  var cat = _g73.cat;
  var find = _g73.find;
  var apply = _g73.apply;
  var length = _g73.length;
  var empty63 = _g73["empty?"];
  var composite63 = _g73["composite?"];
  var map = _g73.map;
  var inner = _g73.inner;
  var _37 = _g73["%"];
  var substring = _g73.substring;
  var _ = _g73["-"];
  var keep = _g73.keep;
  var setenv = _g73.setenv;
  var extend = _g73.extend;
  var _42 = _g73["*"];
  var list63 = _g73["list?"];
  var exclude = _g73.exclude;
  var join = _g73.join;
  var _47 = _g73["/"];
  var sublist = _g73.sublist;
  var write_file = _g73["write-file"];
  var code = _g73.code;
  var splice = _g73.splice;
  var id_literal63 = _g73["id-literal?"];
  var number63 = _g73["number?"];
  var unstash = _g73.unstash;
  var boolean63 = _g73["boolean?"];
  var exit = _g73.exit;
  var tl = _g73.tl;
  var map42 = _g73["map*"];
  var search = _g73.search;
  var write = _g73.write;
  var char = _g73.char;
  var replicate = _g73.replicate;
  var _43 = _g73["+"];
  var read_file = _g73["read-file"];
  var split = _g73.split;
  var parse_number = _g73["parse-number"];
  var string63 = _g73["string?"];
  var is63 = _g73["is?"];
  var nil63 = _g73["nil?"];
  var iterate = _g73.iterate;
  var string_literal63 = _g73["string-literal?"];
  var add = _g73.add;
  var delimiters = {"\n": true, ")": true, ";": true, "(": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
  function make_stream(str) {
    return({len: length(str), string: str, pos: 0});
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
  _g79["read-table"] = read_table;
  _g79["make-stream"] = make_stream;
  _g79.read = read;
})();
(function () {
  var _g81 = nexus.runtime;
  var last = _g81.last;
  var sub = _g81.sub;
  var to_string = _g81["to-string"];
  var stash = _g81.stash;
  var keys63 = _g81["keys?"];
  var drop = _g81.drop;
  var _6261 = _g81[">="];
  var _37message_handler = _g81["%message-handler"];
  var _6061 = _g81["<="];
  var atom63 = _g81["atom?"];
  var table63 = _g81["table?"];
  var hd = _g81.hd;
  var some63 = _g81["some?"];
  var function63 = _g81["function?"];
  var _61 = _g81["="];
  var _62 = _g81[">"];
  var _60 = _g81["<"];
  var pairwise = _g81.pairwise;
  var reverse = _g81.reverse;
  var reduce = _g81.reduce;
  var make_id = _g81["make-id"];
  var cat = _g81.cat;
  var find = _g81.find;
  var apply = _g81.apply;
  var length = _g81.length;
  var empty63 = _g81["empty?"];
  var composite63 = _g81["composite?"];
  var map = _g81.map;
  var inner = _g81.inner;
  var _37 = _g81["%"];
  var substring = _g81.substring;
  var _ = _g81["-"];
  var keep = _g81.keep;
  var setenv = _g81.setenv;
  var extend = _g81.extend;
  var _42 = _g81["*"];
  var list63 = _g81["list?"];
  var exclude = _g81.exclude;
  var join = _g81.join;
  var _47 = _g81["/"];
  var sublist = _g81.sublist;
  var write_file = _g81["write-file"];
  var code = _g81.code;
  var splice = _g81.splice;
  var id_literal63 = _g81["id-literal?"];
  var number63 = _g81["number?"];
  var unstash = _g81.unstash;
  var boolean63 = _g81["boolean?"];
  var exit = _g81.exit;
  var tl = _g81.tl;
  var map42 = _g81["map*"];
  var search = _g81.search;
  var write = _g81.write;
  var char = _g81.char;
  var replicate = _g81.replicate;
  var _43 = _g81["+"];
  var read_file = _g81["read-file"];
  var split = _g81.split;
  var parse_number = _g81["parse-number"];
  var string63 = _g81["string?"];
  var is63 = _g81["is?"];
  var nil63 = _g81["nil?"];
  var iterate = _g81.iterate;
  var string_literal63 = _g81["string-literal?"];
  var add = _g81.add;
  var _g82 = nexus.utilities;
  var valid_id63 = _g82["valid-id?"];
  var module_key = _g82["module-key"];
  var quote_modules = _g82["quote-modules"];
  var exported = _g82.exported;
  var getenv = _g82.getenv;
  var imported = _g82.imported;
  var special63 = _g82["special?"];
  var indentation = _g82.indentation;
  var macro_function = _g82["macro-function"];
  var bound63 = _g82["bound?"];
  var quasiexpand = _g82.quasiexpand;
  var stash42 = _g82["stash*"];
  var quoted = _g82.quoted;
  var initial_environment = _g82["initial-environment"];
  var macro63 = _g82["macro?"];
  var bind42 = _g82["bind*"];
  var bind = _g82.bind;
  var quote_environment = _g82["quote-environment"];
  var variable63 = _g82["variable?"];
  var special_form63 = _g82["special-form?"];
  var macroexpand = _g82.macroexpand;
  var symbol_expansion = _g82["symbol-expansion"];
  var to_id = _g82["to-id"];
  var mapo = _g82.mapo;
  var symbol63 = _g82["symbol?"];
  var _g83 = nexus.reader;
  var read = _g83.read;
  var read_from_string = _g83["read-from-string"];
  var read_table = _g83["read-table"];
  var make_stream = _g83["make-stream"];
  var read_all = _g83["read-all"];
  var infix = {common: {"-": true, ">": true, "+": true, "<": true, "*": true, "%": true, ">=": true, "/": true, "<=": true}, js: {"or": "||", "and": "&&", "~=": "!=", "=": "===", cat: "+"}, lua: {"=": "==", "and": true, "~=": true, cat: "..", "or": true}};
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
    var stmt = _g87.stmt;
    var self_tr63 = _g87.tr;
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
  _g116["open-module"] = open_module;
  _g116["compile-module"] = compile_module;
  _g116["compile-function"] = compile_function;
  _g116["load-module"] = load_module;
  _g116["compile-branch"] = compile_branch;
  _g116.eval = eval;
  _g116.compile = compile;
  _g116["compile-call"] = compile_call;
  _g116["in-module"] = in_module;
  _g116["compile-special"] = compile_special;
  _g116["compile-body"] = compile_body;
})();
(function () {
  var _g119 = nexus.runtime;
  var last = _g119.last;
  var sub = _g119.sub;
  var to_string = _g119["to-string"];
  var stash = _g119.stash;
  var keys63 = _g119["keys?"];
  var drop = _g119.drop;
  var _6261 = _g119[">="];
  var _37message_handler = _g119["%message-handler"];
  var _6061 = _g119["<="];
  var atom63 = _g119["atom?"];
  var table63 = _g119["table?"];
  var hd = _g119.hd;
  var some63 = _g119["some?"];
  var function63 = _g119["function?"];
  var _61 = _g119["="];
  var _62 = _g119[">"];
  var _60 = _g119["<"];
  var pairwise = _g119.pairwise;
  var reverse = _g119.reverse;
  var reduce = _g119.reduce;
  var make_id = _g119["make-id"];
  var cat = _g119.cat;
  var find = _g119.find;
  var apply = _g119.apply;
  var length = _g119.length;
  var empty63 = _g119["empty?"];
  var composite63 = _g119["composite?"];
  var map = _g119.map;
  var inner = _g119.inner;
  var _37 = _g119["%"];
  var substring = _g119.substring;
  var _ = _g119["-"];
  var keep = _g119.keep;
  var setenv = _g119.setenv;
  var extend = _g119.extend;
  var _42 = _g119["*"];
  var list63 = _g119["list?"];
  var exclude = _g119.exclude;
  var join = _g119.join;
  var _47 = _g119["/"];
  var sublist = _g119.sublist;
  var write_file = _g119["write-file"];
  var code = _g119.code;
  var splice = _g119.splice;
  var id_literal63 = _g119["id-literal?"];
  var number63 = _g119["number?"];
  var unstash = _g119.unstash;
  var boolean63 = _g119["boolean?"];
  var exit = _g119.exit;
  var tl = _g119.tl;
  var map42 = _g119["map*"];
  var search = _g119.search;
  var write = _g119.write;
  var char = _g119.char;
  var replicate = _g119.replicate;
  var _43 = _g119["+"];
  var read_file = _g119["read-file"];
  var split = _g119.split;
  var parse_number = _g119["parse-number"];
  var string63 = _g119["string?"];
  var is63 = _g119["is?"];
  var nil63 = _g119["nil?"];
  var iterate = _g119.iterate;
  var string_literal63 = _g119["string-literal?"];
  var add = _g119.add;
  var _g120 = nexus.utilities;
  var valid_id63 = _g120["valid-id?"];
  var module_key = _g120["module-key"];
  var quote_modules = _g120["quote-modules"];
  var exported = _g120.exported;
  var getenv = _g120.getenv;
  var imported = _g120.imported;
  var special63 = _g120["special?"];
  var indentation = _g120.indentation;
  var macro_function = _g120["macro-function"];
  var bound63 = _g120["bound?"];
  var quasiexpand = _g120.quasiexpand;
  var stash42 = _g120["stash*"];
  var quoted = _g120.quoted;
  var initial_environment = _g120["initial-environment"];
  var macro63 = _g120["macro?"];
  var bind42 = _g120["bind*"];
  var bind = _g120.bind;
  var quote_environment = _g120["quote-environment"];
  var variable63 = _g120["variable?"];
  var special_form63 = _g120["special-form?"];
  var macroexpand = _g120.macroexpand;
  var symbol_expansion = _g120["symbol-expansion"];
  var to_id = _g120["to-id"];
  var mapo = _g120.mapo;
  var symbol63 = _g120["symbol?"];
  var _g121 = nexus.compiler;
  var compile_function = _g121["compile-function"];
  var open_module = _g121["open-module"];
  var compile_call = _g121["compile-call"];
  var load_module = _g121["load-module"];
  var compile_module = _g121["compile-module"];
  var compile_special = _g121["compile-special"];
  var compile_branch = _g121["compile-branch"];
  var compile_body = _g121["compile-body"];
  var in_module = _g121["in-module"];
  var eval = _g121.eval;
  var compile = _g121.compile;
})();
(function () {
  var _g227 = nexus.runtime;
  var last = _g227.last;
  var sub = _g227.sub;
  var to_string = _g227["to-string"];
  var stash = _g227.stash;
  var keys63 = _g227["keys?"];
  var drop = _g227.drop;
  var _6261 = _g227[">="];
  var _37message_handler = _g227["%message-handler"];
  var _6061 = _g227["<="];
  var atom63 = _g227["atom?"];
  var table63 = _g227["table?"];
  var hd = _g227.hd;
  var some63 = _g227["some?"];
  var function63 = _g227["function?"];
  var _61 = _g227["="];
  var _62 = _g227[">"];
  var _60 = _g227["<"];
  var pairwise = _g227.pairwise;
  var reverse = _g227.reverse;
  var reduce = _g227.reduce;
  var make_id = _g227["make-id"];
  var cat = _g227.cat;
  var find = _g227.find;
  var apply = _g227.apply;
  var length = _g227.length;
  var empty63 = _g227["empty?"];
  var composite63 = _g227["composite?"];
  var map = _g227.map;
  var inner = _g227.inner;
  var _37 = _g227["%"];
  var substring = _g227.substring;
  var _ = _g227["-"];
  var keep = _g227.keep;
  var setenv = _g227.setenv;
  var extend = _g227.extend;
  var _42 = _g227["*"];
  var list63 = _g227["list?"];
  var exclude = _g227.exclude;
  var join = _g227.join;
  var _47 = _g227["/"];
  var sublist = _g227.sublist;
  var write_file = _g227["write-file"];
  var code = _g227.code;
  var splice = _g227.splice;
  var id_literal63 = _g227["id-literal?"];
  var number63 = _g227["number?"];
  var unstash = _g227.unstash;
  var boolean63 = _g227["boolean?"];
  var exit = _g227.exit;
  var tl = _g227.tl;
  var map42 = _g227["map*"];
  var search = _g227.search;
  var write = _g227.write;
  var char = _g227.char;
  var replicate = _g227.replicate;
  var _43 = _g227["+"];
  var read_file = _g227["read-file"];
  var split = _g227.split;
  var parse_number = _g227["parse-number"];
  var string63 = _g227["string?"];
  var is63 = _g227["is?"];
  var nil63 = _g227["nil?"];
  var iterate = _g227.iterate;
  var string_literal63 = _g227["string-literal?"];
  var add = _g227.add;
  var _g228 = nexus.utilities;
  var valid_id63 = _g228["valid-id?"];
  var module_key = _g228["module-key"];
  var quote_modules = _g228["quote-modules"];
  var exported = _g228.exported;
  var getenv = _g228.getenv;
  var imported = _g228.imported;
  var special63 = _g228["special?"];
  var indentation = _g228.indentation;
  var macro_function = _g228["macro-function"];
  var bound63 = _g228["bound?"];
  var quasiexpand = _g228.quasiexpand;
  var stash42 = _g228["stash*"];
  var quoted = _g228.quoted;
  var initial_environment = _g228["initial-environment"];
  var macro63 = _g228["macro?"];
  var bind42 = _g228["bind*"];
  var bind = _g228.bind;
  var quote_environment = _g228["quote-environment"];
  var variable63 = _g228["variable?"];
  var special_form63 = _g228["special-form?"];
  var macroexpand = _g228.macroexpand;
  var symbol_expansion = _g228["symbol-expansion"];
  var to_id = _g228["to-id"];
  var mapo = _g228.mapo;
  var symbol63 = _g228["symbol?"];
  var _g229 = nexus.compiler;
  var compile_function = _g229["compile-function"];
  var open_module = _g229["open-module"];
  var compile_call = _g229["compile-call"];
  var load_module = _g229["load-module"];
  var compile_module = _g229["compile-module"];
  var compile_special = _g229["compile-special"];
  var compile_branch = _g229["compile-branch"];
  var compile_body = _g229["compile-body"];
  var in_module = _g229["in-module"];
  var eval = _g229.eval;
  var compile = _g229.compile;
  global.target = "js";
})();
(function () {
  var _g384 = nexus.runtime;
  var last = _g384.last;
  var sub = _g384.sub;
  var to_string = _g384["to-string"];
  var stash = _g384.stash;
  var keys63 = _g384["keys?"];
  var drop = _g384.drop;
  var _6261 = _g384[">="];
  var _37message_handler = _g384["%message-handler"];
  var _6061 = _g384["<="];
  var atom63 = _g384["atom?"];
  var table63 = _g384["table?"];
  var hd = _g384.hd;
  var some63 = _g384["some?"];
  var function63 = _g384["function?"];
  var _61 = _g384["="];
  var _62 = _g384[">"];
  var _60 = _g384["<"];
  var pairwise = _g384.pairwise;
  var reverse = _g384.reverse;
  var reduce = _g384.reduce;
  var make_id = _g384["make-id"];
  var cat = _g384.cat;
  var find = _g384.find;
  var apply = _g384.apply;
  var length = _g384.length;
  var empty63 = _g384["empty?"];
  var composite63 = _g384["composite?"];
  var map = _g384.map;
  var inner = _g384.inner;
  var _37 = _g384["%"];
  var substring = _g384.substring;
  var _ = _g384["-"];
  var keep = _g384.keep;
  var setenv = _g384.setenv;
  var extend = _g384.extend;
  var _42 = _g384["*"];
  var list63 = _g384["list?"];
  var exclude = _g384.exclude;
  var join = _g384.join;
  var _47 = _g384["/"];
  var sublist = _g384.sublist;
  var write_file = _g384["write-file"];
  var code = _g384.code;
  var splice = _g384.splice;
  var id_literal63 = _g384["id-literal?"];
  var number63 = _g384["number?"];
  var unstash = _g384.unstash;
  var boolean63 = _g384["boolean?"];
  var exit = _g384.exit;
  var tl = _g384.tl;
  var map42 = _g384["map*"];
  var search = _g384.search;
  var write = _g384.write;
  var char = _g384.char;
  var replicate = _g384.replicate;
  var _43 = _g384["+"];
  var read_file = _g384["read-file"];
  var split = _g384.split;
  var parse_number = _g384["parse-number"];
  var string63 = _g384["string?"];
  var is63 = _g384["is?"];
  var nil63 = _g384["nil?"];
  var iterate = _g384.iterate;
  var string_literal63 = _g384["string-literal?"];
  var add = _g384.add;
  var _g385 = nexus.utilities;
  var valid_id63 = _g385["valid-id?"];
  var module_key = _g385["module-key"];
  var quote_modules = _g385["quote-modules"];
  var exported = _g385.exported;
  var getenv = _g385.getenv;
  var imported = _g385.imported;
  var special63 = _g385["special?"];
  var indentation = _g385.indentation;
  var macro_function = _g385["macro-function"];
  var bound63 = _g385["bound?"];
  var quasiexpand = _g385.quasiexpand;
  var stash42 = _g385["stash*"];
  var quoted = _g385.quoted;
  var initial_environment = _g385["initial-environment"];
  var macro63 = _g385["macro?"];
  var bind42 = _g385["bind*"];
  var bind = _g385.bind;
  var quote_environment = _g385["quote-environment"];
  var variable63 = _g385["variable?"];
  var special_form63 = _g385["special-form?"];
  var macroexpand = _g385.macroexpand;
  var symbol_expansion = _g385["symbol-expansion"];
  var to_id = _g385["to-id"];
  var mapo = _g385.mapo;
  var symbol63 = _g385["symbol?"];
  var _g386 = nexus.compiler;
  var compile_function = _g386["compile-function"];
  var open_module = _g386["open-module"];
  var compile_call = _g386["compile-call"];
  var load_module = _g386["load-module"];
  var compile_module = _g386["compile-module"];
  var compile_special = _g386["compile-special"];
  var compile_branch = _g386["compile-branch"];
  var compile_body = _g386["compile-body"];
  var in_module = _g386["in-module"];
  var eval = _g386.eval;
  var compile = _g386.compile;
  global.modules = {reader: {export: {"define-reader": {export: true, module: "reader", macro: function (_g393) {
    var char = _g393[0];
    var stream = _g393[1];
    var body = unstash(sublist(arguments, 1));
    var _g394 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g394)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "make-stream": {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}}, import: ["runtime", "special", "core"]}, system: {export: {nexus: {export: true, module: "system", global: true}}, import: ["special", "core"]}, utilities: {export: {"valid-id?": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, getenv: {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "macro?": {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, bind: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "indent-level": {export: true, module: "utilities", global: true}, "to-id": {export: true, module: "utilities", variable: true}, mapo: {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}}, import: ["runtime", "special", "core"]}, runtime: {export: {last: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, "make-id": {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", global: true}, search: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, setenv: {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, "nil?": {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}}, import: ["special", "core"]}, boot: {export: {}, import: ["runtime", "utilities", "special", "core", "compiler"]}, lib: {export: {}, import: ["core", "special"]}, core: {export: {fn: {export: true, module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g395 = sub(body, 0);
    var _g396 = bind42(args, _g395);
    var _g397 = _g396[0];
    var _g398 = _g396[1];
    return(join(["%function", _g397], _g398));
  }}, pr: {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g399 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g399)]));
  }}, dec: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, let: {export: true, module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g400 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g401) {
      var lh = _g401[0];
      var rh = _g401[1];
      var _g403 = 0;
      var _g402 = bind(lh, rh);
      while ((_g403 < length(_g402))) {
        var _g404 = _g402[_g403];
        var id = _g404[0];
        var val = _g404[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g403 = (_g403 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g400)])));
  }}, "cat!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g405 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g405)]));
  }}, "with-bindings": {export: true, module: "core", macro: function (_g406) {
    var names = _g406[0];
    var body = unstash(sublist(arguments, 1));
    var _g407 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g408 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g409 = ["setenv", x];
        _g409.variable = true;
        return(_g409);
      })())])];
      _g408.scope = true;
      return(_g408);
    })(), _g407));
  }}, "join*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, "join!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g410 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g410)]));
  }}, inc: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, quasiquote: {export: true, module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }}, table: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g226, x) {
      return(x);
    }, body)));
  }}, define: {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g411 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g411))) {
      var _g412 = bind42(x, _g411);
      var args = _g412[0];
      var _g413 = _g412[1];
      return(join(["%local-function", name, args], _g413));
    } else {
      return(join(["%local", name, x]));
    }
  }}, list: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g414 = body;
      for (k in _g414) {
        if (isNaN(parseInt(k))) {
          var v = _g414[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, "set-of": {export: true, module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g416 = 0;
    var _g415 = elements;
    while ((_g416 < length(_g415))) {
      var e = _g415[_g416];
      l[e] = true;
      _g416 = (_g416 + 1);
    }
    return(join(["table"], l));
  }}, target: {export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, global: true, module: "core"}, "define-macro": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g417 = sub(body, 0);
    var form = join(["fn", args], _g417);
    eval(join((function () {
      var _g418 = ["setenv", join(["quote", name])];
      _g418.form = join(["quote", form]);
      _g418.macro = form;
      return(_g418);
    })()));
    return(undefined);
  }}, across: {export: true, module: "core", macro: function (_g419) {
    var l = _g419[0];
    var v = _g419[1];
    var i = _g419[2];
    var start = _g419[3];
    var body = unstash(sublist(arguments, 1));
    var _g420 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g420, [join(["inc", i])]))])]));
  }}, "let-symbol": {export: true, module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g421 = sub(body, 0);
    add(environment, {});
    var _g422 = (function () {
      map(function (_g423) {
        var name = _g423[0];
        var exp = _g423[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g421)));
    })();
    drop(environment);
    return(_g422);
  }}, "let-macro": {export: true, module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g424 = sub(body, 0);
    add(environment, {});
    var _g425 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g424)));
    })();
    drop(environment);
    return(_g425);
  }}, "define-special": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g426 = sub(body, 0);
    var form = join(["fn", args], _g426);
    var keys = sub(_g426, length(_g426));
    eval(join((function () {
      var _g427 = ["setenv", join(["quote", name])];
      _g427.special = form;
      _g427.form = join(["quote", form]);
      return(_g427);
    })(), keys));
    return(undefined);
  }}, "list*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g428 = xs;
      while ((i < length(_g428))) {
        var x = _g428[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, guard: {export: true, module: "core", macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, "with-frame": {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g429 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g430 = ["table"];
      _g430._scope = scope;
      return(_g430);
    })())]), join(["let", join([x, join(["do"], _g429)]), join(["drop", "environment"]), x])]));
  }}, "define-symbol": {export: true, module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, at: {export: true, module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }}, language: {export: true, module: "core", macro: function () {
    return(join(["quote", target]));
  }}, quote: {export: true, module: "core", macro: function (form) {
    return(quoted(form));
  }}, "define*": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g431 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g431))) {
      var _g432 = bind42(x, _g431);
      var args = _g432[0];
      var _g433 = _g432[1];
      return(join(["%global-function", name, args], _g433));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }}, each: {export: true, module: "core", macro: function (_g434) {
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
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, compiler: {export: {"compile-function": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "current-module": {export: true, module: "compiler", global: true}, "compile-call": {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "compile-module": {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, "define-module": {export: true, module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g437 = sub(body, 0);
    var imports = [];
    var exp = _g437.export;
    var imp = _g437.import;
    var _g439 = 0;
    var _g438 = (imp || []);
    while ((_g439 < length(_g438))) {
      var k = _g438[_g439];
      load_module(k);
      imports = join(imports, imported(k));
      _g439 = (_g439 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g441 = 0;
    var _g440 = (exp || []);
    while ((_g441 < length(_g440))) {
      var k = _g440[_g441];
      setenv(k, {_stash: true, export: true});
      _g441 = (_g441 + 1);
    }
    return(join(["do"], imports));
  }}, "in-module": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}}, import: ["runtime", "utilities", "special", "core", "reader"]}, special: {export: {"%object": {export: true, module: "special", special: function (forms) {
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
    var _g442 = pairs;
    while ((i < length(_g442))) {
      var _g443 = _g442[i];
      var k = _g443[0];
      var v = _g443[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g444 = compile(v);
      var _g445 = (function () {
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
      str = (str + _g445 + sep + _g444);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "%local": {stmt: true, module: "special", export: true, special: function (_g446) {
    var name = _g446[0];
    var value = _g446[1];
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
  }}, "not": {export: true, module: "special", special: function (_g447) {
    var x = _g447[0];
    var _g448 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g448 + ")"));
  }}, "%global-function": {stmt: true, tr: true, module: "special", export: true, special: function (_g449) {
    var name = _g449[0];
    var args = _g449[1];
    var body = sub(_g449, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }}, "error": {stmt: true, module: "special", export: true, special: function (_g450) {
    var x = _g450[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "while": {stmt: true, tr: true, module: "special", export: true, special: function (_g451) {
    var condition = _g451[0];
    var body = sub(_g451, 1);
    var _g452 = compile(condition);
    var _g453 = (function () {
      indent_level = (indent_level + 1);
      var _g454 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g454);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g452 + ") {\n" + _g453 + ind + "}\n"));
    } else {
      return((ind + "while " + _g452 + " do\n" + _g453 + ind + "end\n"));
    }
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
    var _g455 = forms;
    while ((i < length(_g455))) {
      var x = _g455[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "do": {stmt: true, tr: true, module: "special", export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "%function": {export: true, module: "special", special: function (_g456) {
    var args = _g456[0];
    var body = sub(_g456, 1);
    return(compile_function(args, body));
  }}, "break": {stmt: true, module: "special", export: true, special: function (_g118) {
    return((indentation() + "break"));
  }}, "if": {stmt: true, tr: true, module: "special", export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g457 = form;
    while ((i < length(_g457))) {
      var condition = _g457[i];
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
  }}, "return": {stmt: true, module: "special", export: true, special: function (_g458) {
    var x = _g458[0];
    var _g459 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g459));
  }}, "set": {stmt: true, module: "special", export: true, special: function (_g460) {
    var lh = _g460[0];
    var rh = _g460[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "%local-function": {stmt: true, tr: true, module: "special", export: true, special: function (_g461) {
    var name = _g461[0];
    var args = _g461[1];
    var body = sub(_g461, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "get": {export: true, module: "special", special: function (_g462) {
    var t = _g462[0];
    var k = _g462[1];
    var _g463 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g463, 0) === "{"))) {
      _g463 = ("(" + _g463 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g463 + "." + inner(k)));
    } else {
      return((_g463 + "[" + k1 + "]"));
    }
  }}, "%try": {stmt: true, tr: true, module: "special", export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g464 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g464);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g465 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g465);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "%for": {stmt: true, tr: true, module: "special", export: true, special: function (_g466) {
    var _g467 = _g466[0];
    var t = _g467[0];
    var k = _g467[1];
    var body = sub(_g466, 1);
    var _g468 = compile(t);
    var ind = indentation();
    var _g469 = (function () {
      indent_level = (indent_level + 1);
      var _g470 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g470);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g468 + " do\n" + _g469 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g468 + ") {\n" + _g469 + ind + "}\n"));
    }
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}};
  global.environment = [{"define-module": {export: true, module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g471 = sub(body, 0);
    var imports = [];
    var exp = _g471.export;
    var imp = _g471.import;
    var _g473 = 0;
    var _g472 = (imp || []);
    while ((_g473 < length(_g472))) {
      var k = _g472[_g473];
      load_module(k);
      imports = join(imports, imported(k));
      _g473 = (_g473 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
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
  var last = _g34.last;
  var sub = _g34.sub;
  var to_string = _g34["to-string"];
  var stash = _g34.stash;
  var keys63 = _g34["keys?"];
  var drop = _g34.drop;
  var _6261 = _g34[">="];
  var _37message_handler = _g34["%message-handler"];
  var _6061 = _g34["<="];
  var atom63 = _g34["atom?"];
  var table63 = _g34["table?"];
  var hd = _g34.hd;
  var some63 = _g34["some?"];
  var function63 = _g34["function?"];
  var _61 = _g34["="];
  var _62 = _g34[">"];
  var _60 = _g34["<"];
  var pairwise = _g34.pairwise;
  var reverse = _g34.reverse;
  var reduce = _g34.reduce;
  var make_id = _g34["make-id"];
  var cat = _g34.cat;
  var find = _g34.find;
  var apply = _g34.apply;
  var length = _g34.length;
  var empty63 = _g34["empty?"];
  var composite63 = _g34["composite?"];
  var map = _g34.map;
  var inner = _g34.inner;
  var _37 = _g34["%"];
  var substring = _g34.substring;
  var _ = _g34["-"];
  var keep = _g34.keep;
  var setenv = _g34.setenv;
  var extend = _g34.extend;
  var _42 = _g34["*"];
  var list63 = _g34["list?"];
  var exclude = _g34.exclude;
  var join = _g34.join;
  var _47 = _g34["/"];
  var sublist = _g34.sublist;
  var write_file = _g34["write-file"];
  var code = _g34.code;
  var splice = _g34.splice;
  var id_literal63 = _g34["id-literal?"];
  var number63 = _g34["number?"];
  var unstash = _g34.unstash;
  var boolean63 = _g34["boolean?"];
  var exit = _g34.exit;
  var tl = _g34.tl;
  var map42 = _g34["map*"];
  var search = _g34.search;
  var write = _g34.write;
  var char = _g34.char;
  var replicate = _g34.replicate;
  var _43 = _g34["+"];
  var read_file = _g34["read-file"];
  var split = _g34.split;
  var parse_number = _g34["parse-number"];
  var string63 = _g34["string?"];
  var is63 = _g34["is?"];
  var nil63 = _g34["nil?"];
  var iterate = _g34.iterate;
  var string_literal63 = _g34["string-literal?"];
  var add = _g34.add;
  var _g72 = nexus.utilities;
  var valid_id63 = _g72["valid-id?"];
  var module_key = _g72["module-key"];
  var quote_modules = _g72["quote-modules"];
  var exported = _g72.exported;
  var getenv = _g72.getenv;
  var imported = _g72.imported;
  var special63 = _g72["special?"];
  var indentation = _g72.indentation;
  var macro_function = _g72["macro-function"];
  var bound63 = _g72["bound?"];
  var quasiexpand = _g72.quasiexpand;
  var stash42 = _g72["stash*"];
  var quoted = _g72.quoted;
  var initial_environment = _g72["initial-environment"];
  var macro63 = _g72["macro?"];
  var bind42 = _g72["bind*"];
  var bind = _g72.bind;
  var quote_environment = _g72["quote-environment"];
  var variable63 = _g72["variable?"];
  var special_form63 = _g72["special-form?"];
  var macroexpand = _g72.macroexpand;
  var symbol_expansion = _g72["symbol-expansion"];
  var to_id = _g72["to-id"];
  var mapo = _g72.mapo;
  var symbol63 = _g72["symbol?"];
  var _g80 = nexus.reader;
  var read = _g80.read;
  var read_from_string = _g80["read-from-string"];
  var read_table = _g80["read-table"];
  var make_stream = _g80["make-stream"];
  var read_all = _g80["read-all"];
  var _g117 = nexus.compiler;
  var compile_function = _g117["compile-function"];
  var open_module = _g117["open-module"];
  var compile_call = _g117["compile-call"];
  var load_module = _g117["load-module"];
  var compile_module = _g117["compile-module"];
  var compile_special = _g117["compile-special"];
  var compile_branch = _g117["compile-branch"];
  var compile_body = _g117["compile-body"];
  var in_module = _g117["in-module"];
  var eval = _g117.eval;
  var compile = _g117.compile;
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
