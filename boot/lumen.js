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
    var _g8 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g8, upto));
    } else {
      var l = sublist(x, _g8, upto);
      var _g9 = x;
      var k = undefined;
      for (k in _g9) {
        if (isNaN(parseInt(k))) {
          var v = _g9[k];
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
      var _g10 = l1;
      var k = undefined;
      for (k in _g10) {
        if (isNaN(parseInt(k))) {
          var v = _g10[k];
          l[k] = v;
        }
      }
      var _g11 = l2;
      var k = undefined;
      for (k in _g11) {
        if (isNaN(parseInt(k))) {
          var v = _g11[k];
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
    var _g12 = l;
    var _g13 = 0;
    while ((_g13 < length(_g12))) {
      var x = _g12[_g13];
      if (f(x)) {
        add(l1, x);
      }
      _g13 = (_g13 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g14 = l;
    var _g15 = 0;
    while ((_g15 < length(_g14))) {
      var x = _g14[_g15];
      var _g16 = f(x);
      if (_g16) {
        return(_g16);
      }
      _g15 = (_g15 + 1);
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
    var _g17 = l;
    var _g18 = 0;
    while ((_g18 < length(_g17))) {
      var x = _g17[_g18];
      var _g19 = f(x);
      if (splice63(_g19)) {
        l1 = join(l1, _g19.value);
      } else if (is63(_g19)) {
        add(l1, _g19);
      }
      _g18 = (_g18 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g20 = t;
    var k = undefined;
    for (k in _g20) {
      if (isNaN(parseInt(k))) {
        var v = _g20[k];
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
    var _g21 = t;
    var k1 = undefined;
    for (k1 in _g21) {
      if (isNaN(parseInt(k1))) {
        var v = _g21[k1];
        k = k1;
        break;
      }
    }
    return(k);
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g22 = args;
      var k = undefined;
      for (k in _g22) {
        if (isNaN(parseInt(k))) {
          var v = _g22[k];
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
        var _g23 = l;
        var k = undefined;
        for (k in _g23) {
          if (isNaN(parseInt(k))) {
            var v = _g23[k];
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
    var _g24 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g25 = _g24;
      var k1 = undefined;
      for (k1 in _g25) {
        if (isNaN(parseInt(k1))) {
          var v = _g25[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g26 = sub(xs, 0);
    return(join(t, _g26));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g27 = sub(keys, 0);
    var t1 = sublist(t);
    var _g28 = t;
    var k = undefined;
    for (k in _g28) {
      if (isNaN(parseInt(k))) {
        var v = _g28[k];
        if (!(_g27[k])) {
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
    var _g29 = sub(xs, 0);
    if (empty63(_g29)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g29));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g30 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g30));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g31 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g31)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g32 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g32));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g33 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g33)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g34 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g34)));
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
      var _g35 = x;
      var k = undefined;
      for (k in _g35) {
        if (isNaN(parseInt(k))) {
          var v = _g35[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var _g36 = x1;
      var i = 0;
      while ((i < length(_g36))) {
        var y = _g36[i];
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
    var _g37 = stash(args);
    return((f.apply)(f, _g37));
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
  var _g38 = {};
  nexus.runtime = _g38;
  _g38.pairwise = pairwise;
  _g38[">"] = _62;
  _g38["keys?"] = keys63;
  _g38["is?"] = is63;
  _g38["nil?"] = nil63;
  _g38["make-id"] = make_id;
  _g38.extend = extend;
  _g38["empty?"] = empty63;
  _g38["read-file"] = read_file;
  _g38.exclude = exclude;
  _g38.map = map;
  _g38["%message-handler"] = _37message_handler;
  _g38.apply = apply;
  _g38["<="] = _6061;
  _g38["parse-number"] = parse_number;
  _g38.split = split;
  _g38["*"] = _42;
  _g38["+"] = _43;
  _g38["write-file"] = write_file;
  _g38["to-string"] = to_string;
  _g38["/"] = _47;
  _g38.setenv = setenv;
  _g38["-"] = _;
  _g38[">="] = _6261;
  _g38.drop = drop;
  _g38["="] = _61;
  _g38["id-literal?"] = id_literal63;
  _g38.char = char;
  _g38["<"] = _60;
  _g38["%"] = _37;
  _g38.code = code;
  _g38.find = find;
  _g38.hd = hd;
  _g38.inner = inner;
  _g38.splice = splice;
  _g38.tl = tl;
  _g38["table?"] = table63;
  _g38.replicate = replicate;
  _g38.iterate = iterate;
  _g38["string?"] = string63;
  _g38.search = search;
  _g38.reverse = reverse;
  _g38["composite?"] = composite63;
  _g38.keep = keep;
  _g38.unstash = unstash;
  _g38["number?"] = number63;
  _g38["boolean?"] = boolean63;
  _g38["function?"] = function63;
  _g38["list?"] = list63;
  _g38.join = join;
  _g38.last = last;
  _g38.add = add;
  _g38["string-literal?"] = string_literal63;
  _g38.cat = cat;
  _g38.reduce = reduce;
  _g38.sub = sub;
  _g38.stash = stash;
  _g38["atom?"] = atom63;
  _g38.substring = substring;
  _g38["some?"] = some63;
  _g38.sublist = sublist;
  _g38.length = length;
  _g38.exit = exit;
  _g38.write = write;
})();
(function () {
  var _g44 = nexus.runtime;
  var splice = _g44.splice;
  var keep = _g44.keep;
  var _62 = _g44[">"];
  var _60 = _g44["<"];
  var keys63 = _g44["keys?"];
  var is63 = _g44["is?"];
  var replicate = _g44.replicate;
  var find = _g44.find;
  var make_id = _g44["make-id"];
  var empty63 = _g44["empty?"];
  var read_file = _g44["read-file"];
  var exclude = _g44.exclude;
  var _6061 = _g44["<="];
  var _6261 = _g44[">="];
  var map = _g44.map;
  var last = _g44.last;
  var split = _g44.split;
  var _42 = _g44["*"];
  var _43 = _g44["+"];
  var to_string = _g44["to-string"];
  var _47 = _g44["/"];
  var setenv = _g44.setenv;
  var _ = _g44["-"];
  var _37message_handler = _g44["%message-handler"];
  var id_literal63 = _g44["id-literal?"];
  var extend = _g44.extend;
  var code = _g44.code;
  var char = _g44.char;
  var add = _g44.add;
  var hd = _g44.hd;
  var tl = _g44.tl;
  var table63 = _g44["table?"];
  var string63 = _g44["string?"];
  var search = _g44.search;
  var reverse = _g44.reverse;
  var composite63 = _g44["composite?"];
  var parse_number = _g44["parse-number"];
  var unstash = _g44.unstash;
  var number63 = _g44["number?"];
  var boolean63 = _g44["boolean?"];
  var sub = _g44.sub;
  var function63 = _g44["function?"];
  var list63 = _g44["list?"];
  var iterate = _g44.iterate;
  var write_file = _g44["write-file"];
  var cat = _g44.cat;
  var reduce = _g44.reduce;
  var nil63 = _g44["nil?"];
  var _61 = _g44["="];
  var stash = _g44.stash;
  var atom63 = _g44["atom?"];
  var substring = _g44.substring;
  var some63 = _g44["some?"];
  var length = _g44.length;
  var sublist = _g44.sublist;
  var pairwise = _g44.pairwise;
  var join = _g44.join;
  var exit = _g44.exit;
  var write = _g44.write;
  var apply = _g44.apply;
  var inner = _g44.inner;
  var string_literal63 = _g44["string-literal?"];
  var _37 = _g44["%"];
  var drop = _g44.drop;
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g47 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g48 = keys63(_g47);
        if (_g48) {
          return(b[_g48]);
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
      var _g49 = args;
      var k = undefined;
      for (k in _g49) {
        if (isNaN(parseInt(k))) {
          var v = _g49[k];
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
      var _g50 = lh;
      var i = 0;
      while ((i < length(_g50))) {
        var x = _g50[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var _g51 = lh;
      var k = undefined;
      for (k in _g51) {
        if (isNaN(parseInt(k))) {
          var v = _g51[k];
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
      var _g52 = args;
      var _g53 = 0;
      while ((_g53 < length(_g52))) {
        var arg = _g52[_g53];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g53 = (_g53 + 1);
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
        var _g40 = form[0];
        var _g54 = form[1];
        var t = _g54[0];
        var k = _g54[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g41 = form[0];
        var args = form[1];
        var _g55 = sub(form, 2);
        add(environment, {_scope: true});
        var _g57 = (function () {
          var _g58 = args;
          var _g59 = 0;
          while ((_g59 < length(_g58))) {
            var _g56 = _g58[_g59];
            setenv(_g56, {_stash: true, variable: true});
            _g59 = (_g59 + 1);
          }
          return(join(["%function", map(macroexpand, args)], macroexpand(_g55)));
        })();
        drop(environment);
        return(_g57);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g42 = form[0];
        var name = form[1];
        var _g60 = form[2];
        var _g61 = sub(form, 3);
        add(environment, {_scope: true});
        var _g63 = (function () {
          var _g64 = _g60;
          var _g65 = 0;
          while ((_g65 < length(_g64))) {
            var _g62 = _g64[_g65];
            setenv(_g62, {_stash: true, variable: true});
            _g65 = (_g65 + 1);
          }
          return(join([x, name, map(macroexpand, _g60)], macroexpand(_g61)));
        })();
        drop(environment);
        return(_g63);
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
    var _g66 = form;
    var k = undefined;
    for (k in _g66) {
      if (isNaN(parseInt(k))) {
        var v = _g66[k];
        var _g67 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g67;
      }
    }
    var _g68 = form;
    var _g69 = 0;
    while ((_g69 < length(_g68))) {
      var x = _g68[_g69];
      if (quasisplice63(x, depth)) {
        var _g70 = quasiexpand(x[1]);
        add(xs, _g70);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g69 = (_g69 + 1);
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
  var reserved = {"false": true, "/": true, "==": true, "-": true, "elseif": true, "+": true, "void": true, "local": true, "catch": true, "in": true, "var": true, "if": true, "or": true, "with": true, "not": true, "and": true, "then": true, "while": true, "break": true, ">=": true, "<=": true, "return": true, "until": true, "case": true, "repeat": true, "for": true, "end": true, "do": true, "*": true, "this": true, "default": true, "=": true, "nil": true, "throw": true, "else": true, "continue": true, "delete": true, ">": true, "finally": true, "<": true, "function": true, "debugger": true, "true": true, "%": true, "new": true, "switch": true, "instanceof": true, "typeof": true, "try": true};
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
    var _g75 = hd(environment);
    var n = undefined;
    for (n in _g75) {
      if (isNaN(parseInt(n))) {
        var b = _g75[n];
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
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    var _g76 = module(spec).export;
    var n = undefined;
    for (n in _g76) {
      if (isNaN(parseInt(n))) {
        var b = _g76[n];
        if ((b.variable && b.export)) {
          add(imports, join(["%local", n, join(["get", m, join(["quote", n])])]));
        }
      }
    }
    if (some63(imports)) {
      return(join([join(["%local", m, join(["get", "nexus", join(["quote", k])])])], imports));
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
    var _g77 = t;
    var k = undefined;
    for (k in _g77) {
      if (isNaN(parseInt(k))) {
        var v = _g77[k];
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
    return(join(["%object"], mapo(function (_g43, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g78 = ["table"];
      _g78.import = quoted(m.import);
      _g78.export = quote_frame(m.export);
      return(_g78);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g79 = {};
  nexus.utilities = _g79;
  _g79.imported = imported;
  _g79["symbol-expansion"] = symbol_expansion;
  _g79["bind*"] = bind42;
  _g79["bound?"] = bound63;
  _g79["special-form?"] = special_form63;
  _g79["quote-environment"] = quote_environment;
  _g79["initial-environment"] = initial_environment;
  _g79.mapo = mapo;
  _g79["to-id"] = to_id;
  _g79.quasiexpand = quasiexpand;
  _g79["macro-function"] = macro_function;
  _g79["toplevel?"] = toplevel63;
  _g79["special?"] = special63;
  _g79["variable?"] = variable63;
  _g79.quoted = quoted;
  _g79["quote-modules"] = quote_modules;
  _g79.exported = exported;
  _g79.indentation = indentation;
  _g79.module = module;
  _g79["module-key"] = module_key;
  _g79.macroexpand = macroexpand;
  _g79.bind = bind;
  _g79["symbol?"] = symbol63;
  _g79["macro?"] = macro63;
  _g79.getenv = getenv;
  _g79["valid-id?"] = valid_id63;
  _g79["stash*"] = stash42;
})();
(function () {
  var _g81 = nexus.runtime;
  var splice = _g81.splice;
  var keep = _g81.keep;
  var _62 = _g81[">"];
  var _60 = _g81["<"];
  var keys63 = _g81["keys?"];
  var is63 = _g81["is?"];
  var replicate = _g81.replicate;
  var find = _g81.find;
  var make_id = _g81["make-id"];
  var empty63 = _g81["empty?"];
  var read_file = _g81["read-file"];
  var exclude = _g81.exclude;
  var _6061 = _g81["<="];
  var _6261 = _g81[">="];
  var map = _g81.map;
  var last = _g81.last;
  var split = _g81.split;
  var _42 = _g81["*"];
  var _43 = _g81["+"];
  var to_string = _g81["to-string"];
  var _47 = _g81["/"];
  var setenv = _g81.setenv;
  var _ = _g81["-"];
  var _37message_handler = _g81["%message-handler"];
  var id_literal63 = _g81["id-literal?"];
  var extend = _g81.extend;
  var code = _g81.code;
  var char = _g81.char;
  var add = _g81.add;
  var hd = _g81.hd;
  var tl = _g81.tl;
  var table63 = _g81["table?"];
  var string63 = _g81["string?"];
  var search = _g81.search;
  var reverse = _g81.reverse;
  var composite63 = _g81["composite?"];
  var parse_number = _g81["parse-number"];
  var unstash = _g81.unstash;
  var number63 = _g81["number?"];
  var boolean63 = _g81["boolean?"];
  var sub = _g81.sub;
  var function63 = _g81["function?"];
  var list63 = _g81["list?"];
  var iterate = _g81.iterate;
  var write_file = _g81["write-file"];
  var cat = _g81.cat;
  var reduce = _g81.reduce;
  var nil63 = _g81["nil?"];
  var _61 = _g81["="];
  var stash = _g81.stash;
  var atom63 = _g81["atom?"];
  var substring = _g81.substring;
  var some63 = _g81["some?"];
  var length = _g81.length;
  var sublist = _g81.sublist;
  var pairwise = _g81.pairwise;
  var join = _g81.join;
  var exit = _g81.exit;
  var write = _g81.write;
  var apply = _g81.apply;
  var inner = _g81.inner;
  var string_literal63 = _g81["string-literal?"];
  var _37 = _g81["%"];
  var drop = _g81.drop;
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {"\t": true, " ": true, "\n": true};
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
  var _g92 = {};
  nexus.reader = _g92;
  _g92["read-from-string"] = read_from_string;
  _g92["read-all"] = read_all;
  _g92.read = read;
  _g92["read-table"] = read_table;
  _g92["make-stream"] = make_stream;
})();
(function () {
  var _g94 = nexus.runtime;
  var splice = _g94.splice;
  var keep = _g94.keep;
  var _62 = _g94[">"];
  var _60 = _g94["<"];
  var keys63 = _g94["keys?"];
  var is63 = _g94["is?"];
  var replicate = _g94.replicate;
  var find = _g94.find;
  var make_id = _g94["make-id"];
  var empty63 = _g94["empty?"];
  var read_file = _g94["read-file"];
  var exclude = _g94.exclude;
  var _6061 = _g94["<="];
  var _6261 = _g94[">="];
  var map = _g94.map;
  var last = _g94.last;
  var split = _g94.split;
  var _42 = _g94["*"];
  var _43 = _g94["+"];
  var to_string = _g94["to-string"];
  var _47 = _g94["/"];
  var setenv = _g94.setenv;
  var _ = _g94["-"];
  var _37message_handler = _g94["%message-handler"];
  var id_literal63 = _g94["id-literal?"];
  var extend = _g94.extend;
  var code = _g94.code;
  var char = _g94.char;
  var add = _g94.add;
  var hd = _g94.hd;
  var tl = _g94.tl;
  var table63 = _g94["table?"];
  var string63 = _g94["string?"];
  var search = _g94.search;
  var reverse = _g94.reverse;
  var composite63 = _g94["composite?"];
  var parse_number = _g94["parse-number"];
  var unstash = _g94.unstash;
  var number63 = _g94["number?"];
  var boolean63 = _g94["boolean?"];
  var sub = _g94.sub;
  var function63 = _g94["function?"];
  var list63 = _g94["list?"];
  var iterate = _g94.iterate;
  var write_file = _g94["write-file"];
  var cat = _g94.cat;
  var reduce = _g94.reduce;
  var nil63 = _g94["nil?"];
  var _61 = _g94["="];
  var stash = _g94.stash;
  var atom63 = _g94["atom?"];
  var substring = _g94.substring;
  var some63 = _g94["some?"];
  var length = _g94.length;
  var sublist = _g94.sublist;
  var pairwise = _g94.pairwise;
  var join = _g94.join;
  var exit = _g94.exit;
  var write = _g94.write;
  var apply = _g94.apply;
  var inner = _g94.inner;
  var string_literal63 = _g94["string-literal?"];
  var _37 = _g94["%"];
  var drop = _g94.drop;
  var _g95 = nexus.utilities;
  var imported = _g95.imported;
  var symbol_expansion = _g95["symbol-expansion"];
  var macroexpand = _g95.macroexpand;
  var to_id = _g95["to-id"];
  var bind = _g95.bind;
  var quoted = _g95.quoted;
  var bind42 = _g95["bind*"];
  var indentation = _g95.indentation;
  var quasiexpand = _g95.quasiexpand;
  var bound63 = _g95["bound?"];
  var macro63 = _g95["macro?"];
  var macro_function = _g95["macro-function"];
  var quote_environment = _g95["quote-environment"];
  var toplevel63 = _g95["toplevel?"];
  var initial_environment = _g95["initial-environment"];
  var stash42 = _g95["stash*"];
  var mapo = _g95.mapo;
  var exported = _g95.exported;
  var special63 = _g95["special?"];
  var valid_id63 = _g95["valid-id?"];
  var quote_modules = _g95["quote-modules"];
  var variable63 = _g95["variable?"];
  var symbol63 = _g95["symbol?"];
  var getenv = _g95.getenv;
  var module = _g95.module;
  var special_form63 = _g95["special-form?"];
  var module_key = _g95["module-key"];
  var _g98 = nexus.reader;
  var read_from_string = _g98["read-from-string"];
  var read_table = _g98["read-table"];
  var make_stream = _g98["make-stream"];
  var read = _g98.read;
  var read_all = _g98["read-all"];
  var infix = {common: {"*": true, "<=": true, ">=": true, ">": true, "/": true, "<": true, "-": true, "+": true, "%": true}, js: {cat: "+", "and": "&&", "~=": "!=", "or": "||", "=": "==="}, lua: {cat: "..", "~=": true, "and": true, "or": true, "=": "=="}};
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
    var _g99 = args;
    var i = 0;
    while ((i < length(_g99))) {
      var arg = _g99[i];
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
    var _g100 = unstash(sublist(arguments, 1));
    var tail = _g100.tail;
    var str = "";
    var _g101 = forms;
    var i = 0;
    while ((i < length(_g101))) {
      var x = _g101[i];
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
    var _g102 = getenv(hd(form));
    var self_tr63 = _g102.tr;
    var stmt = _g102.stmt;
    var special = _g102.special;
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
  function compile_infix(_g103) {
    var op = _g103[0];
    var args = sub(_g103, 1);
    var str = "(";
    var _g104 = getop(op);
    var _g105 = args;
    var i = 0;
    while ((i < length(_g105))) {
      var arg = _g105[i];
      if (((_g104 === "-") && (length(args) === 1))) {
        str = (str + _g104 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g104 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g106 = (function () {
      indent_level = (indent_level + 1);
      var _g107 = compile(body, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g107);
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
      return((ind + "if (" + cond1 + ") {\n" + _g106 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g106 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g106 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g106 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g106 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g106 + tr));
    }
  }
  function compile_function(args, body) {
    var _g108 = unstash(sublist(arguments, 2));
    var name = _g108.name;
    var prefix = _g108.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g109 = (prefix || "");
    var _g110 = compile_args(args);
    var _g111 = (function () {
      indent_level = (indent_level + 1);
      var _g112 = compile_body(body, {_stash: true, "tail?": true, tail: true});
      indent_level = (indent_level - 1);
      return(_g112);
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
      return(("function " + id + _g110 + " {\n" + _g111 + ind + "}" + tr));
    } else {
      return((_g109 + "function " + id + _g110 + "\n" + _g111 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g113 = unstash(sublist(arguments, 1));
    var stmt = _g113.stmt;
    var tail = _g113.tail;
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
      var _g114 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g114 + tr));
    }
  };
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g115 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g115, [epilog]))]));
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
    var _g116 = toplevel;
    var name = undefined;
    for (name in _g116) {
      if (isNaN(parseInt(name))) {
        var binding = _g116[name];
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
    var _g117 = unstash(sublist(arguments, 1));
    var all = _g117.all;
    var m = module(spec);
    var frame = last(environment);
    var _g118 = m.export;
    var k = undefined;
    for (k in _g118) {
      if (isNaN(parseInt(k))) {
        var v = _g118[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g119 = unstash(sublist(arguments, 1));
    var all = _g119.all;
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
  var _g120 = {};
  nexus.compiler = _g120;
  _g120["open-module"] = open_module;
  _g120.eval = eval;
  _g120["compile-module"] = compile_module;
  _g120["load-module"] = load_module;
  _g120.compile = compile;
  _g120["compile-function"] = compile_function;
  _g120["compile-call"] = compile_call;
  _g120["compile-body"] = compile_body;
  _g120["in-module"] = in_module;
  _g120["compile-branch"] = compile_branch;
  _g120["compile-special"] = compile_special;
})();
(function () {
  var _g123 = nexus.runtime;
  var splice = _g123.splice;
  var keep = _g123.keep;
  var _62 = _g123[">"];
  var _60 = _g123["<"];
  var keys63 = _g123["keys?"];
  var is63 = _g123["is?"];
  var replicate = _g123.replicate;
  var find = _g123.find;
  var make_id = _g123["make-id"];
  var empty63 = _g123["empty?"];
  var read_file = _g123["read-file"];
  var exclude = _g123.exclude;
  var _6061 = _g123["<="];
  var _6261 = _g123[">="];
  var map = _g123.map;
  var last = _g123.last;
  var split = _g123.split;
  var _42 = _g123["*"];
  var _43 = _g123["+"];
  var to_string = _g123["to-string"];
  var _47 = _g123["/"];
  var setenv = _g123.setenv;
  var _ = _g123["-"];
  var _37message_handler = _g123["%message-handler"];
  var id_literal63 = _g123["id-literal?"];
  var extend = _g123.extend;
  var code = _g123.code;
  var char = _g123.char;
  var add = _g123.add;
  var hd = _g123.hd;
  var tl = _g123.tl;
  var table63 = _g123["table?"];
  var string63 = _g123["string?"];
  var search = _g123.search;
  var reverse = _g123.reverse;
  var composite63 = _g123["composite?"];
  var parse_number = _g123["parse-number"];
  var unstash = _g123.unstash;
  var number63 = _g123["number?"];
  var boolean63 = _g123["boolean?"];
  var sub = _g123.sub;
  var function63 = _g123["function?"];
  var list63 = _g123["list?"];
  var iterate = _g123.iterate;
  var write_file = _g123["write-file"];
  var cat = _g123.cat;
  var reduce = _g123.reduce;
  var nil63 = _g123["nil?"];
  var _61 = _g123["="];
  var stash = _g123.stash;
  var atom63 = _g123["atom?"];
  var substring = _g123.substring;
  var some63 = _g123["some?"];
  var length = _g123.length;
  var sublist = _g123.sublist;
  var pairwise = _g123.pairwise;
  var join = _g123.join;
  var exit = _g123.exit;
  var write = _g123.write;
  var apply = _g123.apply;
  var inner = _g123.inner;
  var string_literal63 = _g123["string-literal?"];
  var _37 = _g123["%"];
  var drop = _g123.drop;
  var _g124 = nexus.utilities;
  var imported = _g124.imported;
  var symbol_expansion = _g124["symbol-expansion"];
  var macroexpand = _g124.macroexpand;
  var to_id = _g124["to-id"];
  var bind = _g124.bind;
  var quoted = _g124.quoted;
  var bind42 = _g124["bind*"];
  var indentation = _g124.indentation;
  var quasiexpand = _g124.quasiexpand;
  var bound63 = _g124["bound?"];
  var macro63 = _g124["macro?"];
  var macro_function = _g124["macro-function"];
  var quote_environment = _g124["quote-environment"];
  var toplevel63 = _g124["toplevel?"];
  var initial_environment = _g124["initial-environment"];
  var stash42 = _g124["stash*"];
  var mapo = _g124.mapo;
  var exported = _g124.exported;
  var special63 = _g124["special?"];
  var valid_id63 = _g124["valid-id?"];
  var quote_modules = _g124["quote-modules"];
  var variable63 = _g124["variable?"];
  var symbol63 = _g124["symbol?"];
  var getenv = _g124.getenv;
  var module = _g124.module;
  var special_form63 = _g124["special-form?"];
  var module_key = _g124["module-key"];
  var _g127 = nexus.compiler;
  var compile_branch = _g127["compile-branch"];
  var open_module = _g127["open-module"];
  var in_module = _g127["in-module"];
  var compile_call = _g127["compile-call"];
  var eval = _g127.eval;
  var compile_body = _g127["compile-body"];
  var compile_special = _g127["compile-special"];
  var load_module = _g127["load-module"];
  var compile_module = _g127["compile-module"];
  var compile_function = _g127["compile-function"];
  var compile = _g127.compile;
})();
(function () {
  var _g314 = nexus.runtime;
  var splice = _g314.splice;
  var keep = _g314.keep;
  var _62 = _g314[">"];
  var _60 = _g314["<"];
  var keys63 = _g314["keys?"];
  var is63 = _g314["is?"];
  var replicate = _g314.replicate;
  var find = _g314.find;
  var make_id = _g314["make-id"];
  var empty63 = _g314["empty?"];
  var read_file = _g314["read-file"];
  var exclude = _g314.exclude;
  var _6061 = _g314["<="];
  var _6261 = _g314[">="];
  var map = _g314.map;
  var last = _g314.last;
  var split = _g314.split;
  var _42 = _g314["*"];
  var _43 = _g314["+"];
  var to_string = _g314["to-string"];
  var _47 = _g314["/"];
  var setenv = _g314.setenv;
  var _ = _g314["-"];
  var _37message_handler = _g314["%message-handler"];
  var id_literal63 = _g314["id-literal?"];
  var extend = _g314.extend;
  var code = _g314.code;
  var char = _g314.char;
  var add = _g314.add;
  var hd = _g314.hd;
  var tl = _g314.tl;
  var table63 = _g314["table?"];
  var string63 = _g314["string?"];
  var search = _g314.search;
  var reverse = _g314.reverse;
  var composite63 = _g314["composite?"];
  var parse_number = _g314["parse-number"];
  var unstash = _g314.unstash;
  var number63 = _g314["number?"];
  var boolean63 = _g314["boolean?"];
  var sub = _g314.sub;
  var function63 = _g314["function?"];
  var list63 = _g314["list?"];
  var iterate = _g314.iterate;
  var write_file = _g314["write-file"];
  var cat = _g314.cat;
  var reduce = _g314.reduce;
  var nil63 = _g314["nil?"];
  var _61 = _g314["="];
  var stash = _g314.stash;
  var atom63 = _g314["atom?"];
  var substring = _g314.substring;
  var some63 = _g314["some?"];
  var length = _g314.length;
  var sublist = _g314.sublist;
  var pairwise = _g314.pairwise;
  var join = _g314.join;
  var exit = _g314.exit;
  var write = _g314.write;
  var apply = _g314.apply;
  var inner = _g314.inner;
  var string_literal63 = _g314["string-literal?"];
  var _37 = _g314["%"];
  var drop = _g314.drop;
  var _g315 = nexus.utilities;
  var imported = _g315.imported;
  var symbol_expansion = _g315["symbol-expansion"];
  var macroexpand = _g315.macroexpand;
  var to_id = _g315["to-id"];
  var bind = _g315.bind;
  var quoted = _g315.quoted;
  var bind42 = _g315["bind*"];
  var indentation = _g315.indentation;
  var quasiexpand = _g315.quasiexpand;
  var bound63 = _g315["bound?"];
  var macro63 = _g315["macro?"];
  var macro_function = _g315["macro-function"];
  var quote_environment = _g315["quote-environment"];
  var toplevel63 = _g315["toplevel?"];
  var initial_environment = _g315["initial-environment"];
  var stash42 = _g315["stash*"];
  var mapo = _g315.mapo;
  var exported = _g315.exported;
  var special63 = _g315["special?"];
  var valid_id63 = _g315["valid-id?"];
  var quote_modules = _g315["quote-modules"];
  var variable63 = _g315["variable?"];
  var symbol63 = _g315["symbol?"];
  var getenv = _g315.getenv;
  var module = _g315.module;
  var special_form63 = _g315["special-form?"];
  var module_key = _g315["module-key"];
  var _g318 = nexus.compiler;
  var compile_branch = _g318["compile-branch"];
  var open_module = _g318["open-module"];
  var in_module = _g318["in-module"];
  var compile_call = _g318["compile-call"];
  var eval = _g318.eval;
  var compile_body = _g318["compile-body"];
  var compile_special = _g318["compile-special"];
  var load_module = _g318["load-module"];
  var compile_module = _g318["compile-module"];
  var compile_function = _g318["compile-function"];
  var compile = _g318.compile;
  global.target = "js";
})();
(function () {
  var _g595 = nexus.runtime;
  var splice = _g595.splice;
  var keep = _g595.keep;
  var _62 = _g595[">"];
  var _60 = _g595["<"];
  var keys63 = _g595["keys?"];
  var is63 = _g595["is?"];
  var replicate = _g595.replicate;
  var find = _g595.find;
  var make_id = _g595["make-id"];
  var empty63 = _g595["empty?"];
  var read_file = _g595["read-file"];
  var exclude = _g595.exclude;
  var _6061 = _g595["<="];
  var _6261 = _g595[">="];
  var map = _g595.map;
  var last = _g595.last;
  var split = _g595.split;
  var _42 = _g595["*"];
  var _43 = _g595["+"];
  var to_string = _g595["to-string"];
  var _47 = _g595["/"];
  var setenv = _g595.setenv;
  var _ = _g595["-"];
  var _37message_handler = _g595["%message-handler"];
  var id_literal63 = _g595["id-literal?"];
  var extend = _g595.extend;
  var code = _g595.code;
  var char = _g595.char;
  var add = _g595.add;
  var hd = _g595.hd;
  var tl = _g595.tl;
  var table63 = _g595["table?"];
  var string63 = _g595["string?"];
  var search = _g595.search;
  var reverse = _g595.reverse;
  var composite63 = _g595["composite?"];
  var parse_number = _g595["parse-number"];
  var unstash = _g595.unstash;
  var number63 = _g595["number?"];
  var boolean63 = _g595["boolean?"];
  var sub = _g595.sub;
  var function63 = _g595["function?"];
  var list63 = _g595["list?"];
  var iterate = _g595.iterate;
  var write_file = _g595["write-file"];
  var cat = _g595.cat;
  var reduce = _g595.reduce;
  var nil63 = _g595["nil?"];
  var _61 = _g595["="];
  var stash = _g595.stash;
  var atom63 = _g595["atom?"];
  var substring = _g595.substring;
  var some63 = _g595["some?"];
  var length = _g595.length;
  var sublist = _g595.sublist;
  var pairwise = _g595.pairwise;
  var join = _g595.join;
  var exit = _g595.exit;
  var write = _g595.write;
  var apply = _g595.apply;
  var inner = _g595.inner;
  var string_literal63 = _g595["string-literal?"];
  var _37 = _g595["%"];
  var drop = _g595.drop;
  var _g596 = nexus.utilities;
  var imported = _g596.imported;
  var symbol_expansion = _g596["symbol-expansion"];
  var macroexpand = _g596.macroexpand;
  var to_id = _g596["to-id"];
  var bind = _g596.bind;
  var quoted = _g596.quoted;
  var bind42 = _g596["bind*"];
  var indentation = _g596.indentation;
  var quasiexpand = _g596.quasiexpand;
  var bound63 = _g596["bound?"];
  var macro63 = _g596["macro?"];
  var macro_function = _g596["macro-function"];
  var quote_environment = _g596["quote-environment"];
  var toplevel63 = _g596["toplevel?"];
  var initial_environment = _g596["initial-environment"];
  var stash42 = _g596["stash*"];
  var mapo = _g596.mapo;
  var exported = _g596.exported;
  var special63 = _g596["special?"];
  var valid_id63 = _g596["valid-id?"];
  var quote_modules = _g596["quote-modules"];
  var variable63 = _g596["variable?"];
  var symbol63 = _g596["symbol?"];
  var getenv = _g596.getenv;
  var module = _g596.module;
  var special_form63 = _g596["special-form?"];
  var module_key = _g596["module-key"];
  var _g599 = nexus.compiler;
  var compile_branch = _g599["compile-branch"];
  var open_module = _g599["open-module"];
  var in_module = _g599["in-module"];
  var compile_call = _g599["compile-call"];
  var eval = _g599.eval;
  var compile_body = _g599["compile-body"];
  var compile_special = _g599["compile-special"];
  var load_module = _g599["load-module"];
  var compile_module = _g599["compile-module"];
  var compile_function = _g599["compile-function"];
  var compile = _g599.compile;
  global.modules = {utilities: {import: ["runtime", "special", "core"], export: {imported: {export: true, variable: true, module: "utilities"}, "quoting?": {module: "utilities", variable: true}, "valid-char?": {module: "utilities", variable: true}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "quasiquote-list": {module: "utilities", variable: true}, macroexpand: {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "numeric?": {module: "utilities", variable: true}, "bind*": {export: true, variable: true, module: "utilities"}, escape: {module: "utilities", variable: true}, reserved: {module: "utilities", variable: true}, indentation: {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "quote-frame": {module: "utilities", variable: true}, "macro?": {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, "can-unquote?": {module: "utilities", variable: true}, "quote-environment": {export: true, variable: true, module: "utilities"}, "toplevel?": {export: true, variable: true, module: "utilities"}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities", export: true}, "initial-environment": {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, mapo: {export: true, variable: true, module: "utilities"}, "quote-binding": {module: "utilities", variable: true}, exported: {export: true, variable: true, module: "utilities"}, "global?": {module: "utilities", variable: true}, "special?": {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, module: "utilities", global: true}, "variable?": {export: true, variable: true, module: "utilities"}, "quasiquoting?": {module: "utilities", variable: true}, "symbol?": {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, module: {export: true, variable: true, module: "utilities"}, "quote-module": {module: "utilities", variable: true}, "quasisplice?": {module: "utilities", variable: true}, "special-form?": {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-branch": {export: true, variable: true, module: "compiler"}, "current-module": {export: true, module: "compiler", global: true}, terminator: {module: "compiler", variable: true}, "open-module": {export: true, variable: true, module: "compiler"}, "compile-infix": {module: "compiler", variable: true}, "compilation-level": {module: "compiler", variable: true}, "compiler-output": {module: "compiler", variable: true}, encapsulate: {module: "compiler", variable: true}, run: {module: "compiler", variable: true}, "compile-file": {module: "compiler", variable: true}, getop: {module: "compiler", variable: true}, "in-module": {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, prologue: {module: "compiler", variable: true}, "compile-special": {export: true, variable: true, module: "compiler"}, "%compile-module": {module: "compiler", variable: true}, "can-return?": {module: "compiler", variable: true}, "load-module": {export: true, variable: true, module: "compiler"}, "compile-args": {module: "compiler", variable: true}, "infix?": {module: "compiler", variable: true}, "module-path": {module: "compiler", variable: true}, "compile-module": {export: true, variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, infix: {module: "compiler", variable: true}, "compile-atom": {module: "compiler", variable: true}, compile: {export: true, variable: true, module: "compiler"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {"key?": {module: "reader", variable: true}, whitespace: {module: "reader", variable: true}, "define-reader": {macro: function (_g612) {
    var char = _g612[0];
    var stream = _g612[1];
    var body = unstash(sublist(arguments, 1));
    var _g613 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g613)]));
  }, module: "reader", export: true}, "read-from-string": {export: true, variable: true, module: "reader"}, "read-char": {module: "reader", variable: true}, "skip-non-code": {module: "reader", variable: true}, "read-table": {export: true, variable: true, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "flag?": {module: "reader", variable: true}, "peek-char": {module: "reader", variable: true}, read: {export: true, variable: true, module: "reader"}, delimiters: {module: "reader", variable: true}, eof: {module: "reader", variable: true}, "read-all": {export: true, variable: true, module: "reader"}}}, runtime: {import: ["special", "core"], export: {splice: {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, mapl: {module: "runtime", variable: true}, "to-string": {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, print: {export: true, module: "runtime", global: true}, "id-literal?": {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, "id-count": {module: "runtime", variable: true}, hd: {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, fs: {module: "runtime", variable: true}, "splice?": {module: "runtime", variable: true}, exit: {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, type: {module: "runtime", variable: true}, "string-literal?": {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}}}, lib: {import: ["core", "special"], export: {}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g614 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g614), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g615 = ["target"];
          _g615.js = join(["isNaN", join(["parseInt", k])]);
          _g615.lua = join(["not", join(["number?", k])]);
          return(_g615);
        })()), join(["let", join([v, join(["get", t1, k])])], _g614)])])]));
      }
    })()]));
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g616 = sub(body, 0);
    var imports = [];
    var imp = _g616.import;
    var exp = _g616.export;
    var _g617 = (imp || []);
    var _g618 = 0;
    while ((_g618 < length(_g617))) {
      var k = _g617[_g618];
      load_module(k);
      imports = join(imports, imported(k));
      _g618 = (_g618 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g619 = (exp || []);
    var _g620 = 0;
    while ((_g620 < length(_g619))) {
      var k = _g619[_g620];
      setenv(k, {_stash: true, export: true});
      _g620 = (_g620 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g621 = sub(body, 0);
    add(environment, {});
    var _g622 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g621)));
    })();
    drop(environment);
    return(_g622);
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g313, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g623 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g623))) {
      var _g624 = bind42(x, _g623);
      var args = _g624[0];
      var _g625 = _g624[1];
      return(join(["%local-function", name, args], _g625));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g626 = body;
      var k = undefined;
      for (k in _g626) {
        if (isNaN(parseInt(k))) {
          var v = _g626[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g627 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g627)]));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g628 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g628)]));
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g629 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g629)]));
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g630 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g631) {
      var lh = _g631[0];
      var rh = _g631[1];
      var _g632 = bind(lh, rh);
      var _g633 = 0;
      while ((_g633 < length(_g632))) {
        var _g634 = _g632[_g633];
        var id = _g634[0];
        var val = _g634[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g633 = (_g633 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g630)])));
  }, module: "core", export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g635 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g635))) {
      var _g636 = bind42(x, _g635);
      var args = _g636[0];
      var _g637 = _g636[1];
      return(join(["%global-function", name, args], _g637));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g638 = sub(body, 0);
    add(environment, {});
    var _g639 = (function () {
      map(function (_g640) {
        var name = _g640[0];
        var exp = _g640[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g638)));
    })();
    drop(environment);
    return(_g639);
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g641 = elements;
    var _g642 = 0;
    while ((_g642 < length(_g641))) {
      var e = _g641[_g642];
      l[e] = true;
      _g642 = (_g642 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "with-bindings": {macro: function (_g643) {
    var names = _g643[0];
    var body = unstash(sublist(arguments, 1));
    var _g644 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g645 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g646 = ["setenv", x];
        _g646.variable = true;
        return(_g646);
      })())])];
      _g645.scope = true;
      return(_g645);
    })(), _g644));
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g647 = sub(body, 0);
    var form = join(["fn", args], _g647);
    var keys = sub(_g647, length(_g647));
    eval(join((function () {
      var _g648 = ["setenv", join(["quote", name])];
      _g648.special = form;
      _g648.form = join(["quote", form]);
      return(_g648);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g649 = xs;
      var i = 0;
      while ((i < length(_g649))) {
        var x = _g649[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g650 = sub(body, 0);
    var form = join(["fn", args], _g650);
    eval(join((function () {
      var _g651 = ["setenv", join(["quote", name])];
      _g651.form = join(["quote", form]);
      _g651.macro = form;
      return(_g651);
    })()));
    return(undefined);
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g652 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g653 = ["table"];
      _g653._scope = scope;
      return(_g653);
    })())]), join(["let", join([x, join(["do"], _g652)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, export: true, module: "core", global: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g654 = sub(body, 0);
    var _g655 = bind42(args, _g654);
    var _g656 = _g655[0];
    var _g657 = _g655[1];
    return(join(["%function", _g656], _g657));
  }, module: "core", export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%try": {tr: true, module: "special", stmt: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g658 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g658);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g659 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g659);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, export: true}, "return": {stmt: true, export: true, module: "special", special: function (_g660) {
    var x = _g660[0];
    var _g661 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g661));
  }}, "%function": {export: true, module: "special", special: function (_g662) {
    var args = _g662[0];
    var body = sub(_g662, 1);
    return(compile_function(args, body));
  }}, "error": {stmt: true, export: true, module: "special", special: function (_g663) {
    var x = _g663[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "while": {tr: true, module: "special", stmt: true, special: function (_g664) {
    var condition = _g664[0];
    var body = sub(_g664, 1);
    var _g665 = compile(condition);
    var _g666 = (function () {
      indent_level = (indent_level + 1);
      var _g667 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g667);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g665 + ") {\n" + _g666 + ind + "}\n"));
    } else {
      return((ind + "while " + _g665 + " do\n" + _g666 + ind + "end\n"));
    }
  }, export: true}, "%object": {export: true, module: "special", special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g668 = pairs;
    var i = 0;
    while ((i < length(_g668))) {
      var _g669 = _g668[i];
      var k = _g669[0];
      var v = _g669[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g670 = compile(v);
      var _g671 = (function () {
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
      str = (str + _g671 + sep + _g670);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "%global-function": {tr: true, module: "special", stmt: true, special: function (_g672) {
    var name = _g672[0];
    var args = _g672[1];
    var body = sub(_g672, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, export: true}, "get": {export: true, module: "special", special: function (_g673) {
    var t = _g673[0];
    var k = _g673[1];
    var _g674 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g674, 0) === "{"))) {
      _g674 = ("(" + _g674 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g674 + "." + inner(k)));
    } else {
      return((_g674 + "[" + k1 + "]"));
    }
  }}, "break": {stmt: true, export: true, module: "special", special: function (_g122) {
    return((indentation() + "break"));
  }}, "if": {tr: true, module: "special", stmt: true, special: function (form, tail63) {
    var str = "";
    var _g675 = form;
    var i = 0;
    while ((i < length(_g675))) {
      var condition = _g675[i];
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
  }, export: true}, "%local-function": {tr: true, module: "special", stmt: true, special: function (_g676) {
    var name = _g676[0];
    var args = _g676[1];
    var body = sub(_g676, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, export: true}, "%for": {tr: true, module: "special", stmt: true, special: function (_g677) {
    var _g678 = _g677[0];
    var t = _g678[0];
    var k = _g678[1];
    var body = sub(_g677, 1);
    var _g679 = compile(t);
    var ind = indentation();
    var _g680 = (function () {
      indent_level = (indent_level + 1);
      var _g681 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g681);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g679 + " do\n" + _g680 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g679 + ") {\n" + _g680 + ind + "}\n"));
    }
  }, export: true}, "%local": {stmt: true, export: true, module: "special", special: function (_g682) {
    var name = _g682[0];
    var value = _g682[1];
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
  }}, "not": {export: true, module: "special", special: function (_g683) {
    var x = _g683[0];
    var _g684 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g684 + ")"));
  }}, "set": {stmt: true, export: true, module: "special", special: function (_g685) {
    var lh = _g685[0];
    var rh = _g685[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
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
    var _g686 = forms;
    var i = 0;
    while ((i < length(_g686))) {
      var x = _g686[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "do": {tr: true, module: "special", stmt: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, export: true}}}, system: {import: ["special", "core"], export: {nexus: {export: true, module: "system", global: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g687 = sub(body, 0);
    var imports = [];
    var imp = _g687.import;
    var exp = _g687.export;
    var _g688 = (imp || []);
    var _g689 = 0;
    while ((_g689 < length(_g688))) {
      var k = _g688[_g689];
      load_module(k);
      imports = join(imports, imported(k));
      _g689 = (_g689 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g690 = (exp || []);
    var _g691 = 0;
    while ((_g691 < length(_g690))) {
      var k = _g690[_g691];
      setenv(k, {_stash: true, export: true});
      _g691 = (_g691 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}}];
})();
(function () {
  var _g39 = nexus.runtime;
  var splice = _g39.splice;
  var keep = _g39.keep;
  var _62 = _g39[">"];
  var _60 = _g39["<"];
  var keys63 = _g39["keys?"];
  var is63 = _g39["is?"];
  var replicate = _g39.replicate;
  var find = _g39.find;
  var make_id = _g39["make-id"];
  var empty63 = _g39["empty?"];
  var read_file = _g39["read-file"];
  var exclude = _g39.exclude;
  var _6061 = _g39["<="];
  var _6261 = _g39[">="];
  var map = _g39.map;
  var last = _g39.last;
  var split = _g39.split;
  var _42 = _g39["*"];
  var _43 = _g39["+"];
  var to_string = _g39["to-string"];
  var _47 = _g39["/"];
  var setenv = _g39.setenv;
  var _ = _g39["-"];
  var _37message_handler = _g39["%message-handler"];
  var id_literal63 = _g39["id-literal?"];
  var extend = _g39.extend;
  var code = _g39.code;
  var char = _g39.char;
  var add = _g39.add;
  var hd = _g39.hd;
  var tl = _g39.tl;
  var table63 = _g39["table?"];
  var string63 = _g39["string?"];
  var search = _g39.search;
  var reverse = _g39.reverse;
  var composite63 = _g39["composite?"];
  var parse_number = _g39["parse-number"];
  var unstash = _g39.unstash;
  var number63 = _g39["number?"];
  var boolean63 = _g39["boolean?"];
  var sub = _g39.sub;
  var function63 = _g39["function?"];
  var list63 = _g39["list?"];
  var iterate = _g39.iterate;
  var write_file = _g39["write-file"];
  var cat = _g39.cat;
  var reduce = _g39.reduce;
  var nil63 = _g39["nil?"];
  var _61 = _g39["="];
  var stash = _g39.stash;
  var atom63 = _g39["atom?"];
  var substring = _g39.substring;
  var some63 = _g39["some?"];
  var length = _g39.length;
  var sublist = _g39.sublist;
  var pairwise = _g39.pairwise;
  var join = _g39.join;
  var exit = _g39.exit;
  var write = _g39.write;
  var apply = _g39.apply;
  var inner = _g39.inner;
  var string_literal63 = _g39["string-literal?"];
  var _37 = _g39["%"];
  var drop = _g39.drop;
  var _g80 = nexus.utilities;
  var imported = _g80.imported;
  var symbol_expansion = _g80["symbol-expansion"];
  var macroexpand = _g80.macroexpand;
  var to_id = _g80["to-id"];
  var bind = _g80.bind;
  var quoted = _g80.quoted;
  var bind42 = _g80["bind*"];
  var indentation = _g80.indentation;
  var quasiexpand = _g80.quasiexpand;
  var bound63 = _g80["bound?"];
  var macro63 = _g80["macro?"];
  var macro_function = _g80["macro-function"];
  var quote_environment = _g80["quote-environment"];
  var toplevel63 = _g80["toplevel?"];
  var initial_environment = _g80["initial-environment"];
  var stash42 = _g80["stash*"];
  var mapo = _g80.mapo;
  var exported = _g80.exported;
  var special63 = _g80["special?"];
  var valid_id63 = _g80["valid-id?"];
  var quote_modules = _g80["quote-modules"];
  var variable63 = _g80["variable?"];
  var symbol63 = _g80["symbol?"];
  var getenv = _g80.getenv;
  var module = _g80.module;
  var special_form63 = _g80["special-form?"];
  var module_key = _g80["module-key"];
  var _g93 = nexus.reader;
  var read_from_string = _g93["read-from-string"];
  var read_table = _g93["read-table"];
  var make_stream = _g93["make-stream"];
  var read = _g93.read;
  var read_all = _g93["read-all"];
  var _g121 = nexus.compiler;
  var compile_branch = _g121["compile-branch"];
  var open_module = _g121["open-module"];
  var in_module = _g121["in-module"];
  var compile_call = _g121["compile-call"];
  var eval = _g121.eval;
  var compile_body = _g121["compile-body"];
  var compile_special = _g121["compile-special"];
  var load_module = _g121["load-module"];
  var compile_module = _g121["compile-module"];
  var compile_function = _g121["compile-function"];
  var compile = _g121.compile;
  function rep(str) {
    var _g694 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g697) {
        return([false, _g697]);
      }
    })();
    var _g1 = _g694[0];
    var x = _g694[1];
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
    var _g695 = args;
    var i = 0;
    while ((i < length(_g695))) {
      var arg = _g695[i];
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
