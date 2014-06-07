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
  function mapt(f, t) {
    var t1 = {};
    var k = undefined;
    var _g16 = t;
    for (k in _g16) {
      if (isNaN(parseInt(k))) {
        var v = _g16[k];
        var x = f(k, v);
        if (is63(x)) {
          t1[k] = x;
        }
      }
    }
    return(t1);
  }
  function mapo(f, t) {
    var o = [];
    var k = undefined;
    var _g17 = t;
    for (k in _g17) {
      if (isNaN(parseInt(k))) {
        var v = _g17[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function keys63(t) {
    var k = undefined;
    var k1 = undefined;
    var _g18 = t;
    for (k1 in _g18) {
      if (isNaN(parseInt(k1))) {
        var v = _g18[k1];
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
      var _g19 = args;
      for (k in _g19) {
        if (isNaN(parseInt(k))) {
          var v = _g19[k];
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
        var _g20 = l;
        for (k in _g20) {
          if (isNaN(parseInt(k))) {
            var v = _g20[k];
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
    var _g21 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g22 = _g21;
      for (k1 in _g22) {
        if (isNaN(parseInt(k1))) {
          var v = _g22[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g23 = sub(xs, 0);
    return(join(t, _g23));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g24 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g25 = t;
    for (k in _g25) {
      if (isNaN(parseInt(k))) {
        var v = _g25[k];
        if (!(_g24[k])) {
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
    var _g26 = sub(xs, 0);
    if (empty63(_g26)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g26));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g27));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g28 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g28)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g29 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g29));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g30 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g30)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g31 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g31)));
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
  function print(x) {
    return((console.log)(x));
  }
  function write(x) {
    return((process.stdout.write)(x));
  }
  function exit(code) {
    return((process.exit)(code));
  }
  function type(x) {
    return(typeof(x));
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
      var _g32 = x;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g33 = x1;
      while ((i < length(_g33))) {
        var y = _g33[i];
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
    var _g34 = stash(args);
    return((f.apply)(f, _g34));
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
  var _g35 = {};
  nexus.runtime = _g35;
  _g35.iterate = iterate;
  _g35.mapo = mapo;
  _g35.unstash = unstash;
  _g35["id-literal?"] = id_literal63;
  _g35.join = join;
  _g35["nil?"] = nil63;
  _g35["atom?"] = atom63;
  _g35["function?"] = function63;
  _g35.mapt = mapt;
  _g35.reduce = reduce;
  _g35.replicate = replicate;
  _g35["make-id"] = make_id;
  _g35.pairwise = pairwise;
  _g35.drop = drop;
  _g35.splice = splice;
  _g35["%message-handler"] = _37message_handler;
  _g35.keep = keep;
  _g35.stash = stash;
  _g35.find = find;
  _g35.apply = apply;
  _g35["to-string"] = to_string;
  _g35["parse-number"] = parse_number;
  _g35["table?"] = table63;
  _g35.print = print;
  _g35.extend = extend;
  _g35["composite?"] = composite63;
  _g35[">="] = _6261;
  _g35["="] = _61;
  _g35[">"] = _62;
  _g35.exclude = exclude;
  _g35.sub = sub;
  _g35["/"] = _47;
  _g35["*"] = _42;
  _g35.tl = tl;
  _g35["string?"] = string63;
  _g35.search = search;
  _g35.write = write;
  _g35.hd = hd;
  _g35.cat = cat;
  _g35["<"] = _60;
  _g35["write-file"] = write_file;
  _g35["keys?"] = keys63;
  _g35["map*"] = map42;
  _g35.map = map;
  _g35.last = last;
  _g35["empty?"] = empty63;
  _g35["number?"] = number63;
  _g35.add = add;
  _g35.substring = substring;
  _g35.split = split;
  _g35.code = code;
  _g35.char = char;
  _g35.inner = inner;
  _g35["%"] = _37;
  _g35.sublist = sublist;
  _g35["list?"] = list63;
  _g35.exit = exit;
  _g35["<="] = _6061;
  _g35["read-file"] = read_file;
  _g35["boolean?"] = boolean63;
  _g35["some?"] = some63;
  _g35.reverse = reverse;
  _g35["string-literal?"] = string_literal63;
  _g35.setenv = setenv;
  _g35["is?"] = is63;
  _g35.length = length;
  _g35["+"] = _43;
  _g35["-"] = _;
})();
(function () {
  var _g42 = nexus.runtime;
  var char = _g42.char;
  var extend = _g42.extend;
  var iterate = _g42.iterate;
  var mapo = _g42.mapo;
  var unstash = _g42.unstash;
  var id_literal63 = _g42["id-literal?"];
  var join = _g42.join;
  var nil63 = _g42["nil?"];
  var atom63 = _g42["atom?"];
  var to_string = _g42["to-string"];
  var keys63 = _g42["keys?"];
  var composite63 = _g42["composite?"];
  var code = _g42.code;
  var inner = _g42.inner;
  var reduce = _g42.reduce;
  var replicate = _g42.replicate;
  var pairwise = _g42.pairwise;
  var drop = _g42.drop;
  var splice = _g42.splice;
  var _37message_handler = _g42["%message-handler"];
  var keep = _g42.keep;
  var stash = _g42.stash;
  var find = _g42.find;
  var number63 = _g42["number?"];
  var _62 = _g42[">"];
  var tl = _g42.tl;
  var string63 = _g42["string?"];
  var write = _g42.write;
  var hd = _g42.hd;
  var cat = _g42.cat;
  var _60 = _g42["<"];
  var write_file = _g42["write-file"];
  var map42 = _g42["map*"];
  var function63 = _g42["function?"];
  var sublist = _g42.sublist;
  var last = _g42.last;
  var empty63 = _g42["empty?"];
  var substring = _g42.substring;
  var split = _g42.split;
  var table63 = _g42["table?"];
  var search = _g42.search;
  var _37 = _g42["%"];
  var make_id = _g42["make-id"];
  var apply = _g42.apply;
  var exit = _g42.exit;
  var _6061 = _g42["<="];
  var read_file = _g42["read-file"];
  var _47 = _g42["/"];
  var some63 = _g42["some?"];
  var reverse = _g42.reverse;
  var map = _g42.map;
  var mapt = _g42.mapt;
  var boolean63 = _g42["boolean?"];
  var _6261 = _g42[">="];
  var exclude = _g42.exclude;
  var _61 = _g42["="];
  var parse_number = _g42["parse-number"];
  var sub = _g42.sub;
  var list63 = _g42["list?"];
  var setenv = _g42.setenv;
  var is63 = _g42["is?"];
  var string_literal63 = _g42["string-literal?"];
  var length = _g42.length;
  var _43 = _g42["+"];
  var _42 = _g42["*"];
  var _ = _g42["-"];
  var add = _g42.add;
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g43 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g44 = keys63(_g43);
        if (_g44) {
          return(b[_g44]);
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
      var _g45 = args;
      for (k in _g45) {
        if (isNaN(parseInt(k))) {
          var v = _g45[k];
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
      var _g46 = lh;
      while ((i < length(_g46))) {
        var x = _g46[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g47 = lh;
      for (k in _g47) {
        if (isNaN(parseInt(k))) {
          var v = _g47[k];
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
      var _g49 = 0;
      var _g48 = args;
      while ((_g49 < length(_g48))) {
        var arg = _g48[_g49];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g49 = (_g49 + 1);
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
        var _g37 = form[0];
        var _g50 = form[1];
        var t = _g50[0];
        var k = _g50[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g38 = form[0];
        var args = form[1];
        var _g51 = sub(form, 2);
        add(environment, {_scope: true});
        var _g53 = (function () {
          var _g55 = 0;
          var _g54 = args;
          while ((_g55 < length(_g54))) {
            var _g52 = _g54[_g55];
            setenv(_g52, {_stash: true, variable: true});
            _g55 = (_g55 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g51)));
        })();
        drop(environment);
        return(_g53);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g39 = form[0];
        var name = form[1];
        var _g56 = form[2];
        var _g57 = sub(form, 3);
        add(environment, {_scope: true});
        var _g59 = (function () {
          var _g61 = 0;
          var _g60 = _g56;
          while ((_g61 < length(_g60))) {
            var _g58 = _g60[_g61];
            setenv(_g58, {_stash: true, variable: true});
            _g61 = (_g61 + 1);
          }
          return(join([x, name, map42(macroexpand, _g56)], macroexpand(_g57)));
        })();
        drop(environment);
        return(_g59);
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
    var _g62 = form;
    for (k in _g62) {
      if (isNaN(parseInt(k))) {
        var v = _g62[k];
        var _g63 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g63;
      }
    }
    var _g65 = 0;
    var _g64 = form;
    while ((_g65 < length(_g64))) {
      var x = _g64[_g65];
      if (quasisplice63(x, depth)) {
        var _g66 = quasiexpand(x[1]);
        add(xs, _g66);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g65 = (_g65 + 1);
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
  var reserved = {"function": true, "instanceof": true, "var": true, "and": true, "throw": true, "==": true, "-": true, "return": true, "=": true, "delete": true, "this": true, "repeat": true, "void": true, "in": true, "break": true, "case": true, "%": true, "if": true, "<=": true, "default": true, "new": true, "*": true, "true": true, ">=": true, "not": true, "<": true, "debugger": true, ">": true, "catch": true, "for": true, "/": true, "finally": true, "until": true, "else": true, "try": true, "typeof": true, "local": true, "false": true, "while": true, "end": true, "with": true, "or": true, "continue": true, "then": true, "+": true, "elseif": true, "switch": true, "nil": true, "do": true};
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
    var _g69 = toplevel;
    for (n in _g69) {
      if (isNaN(parseInt(n))) {
        var b = _g69[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["define-local", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
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
      var _g70 = x;
      for (b in _g70) {
        if (isNaN(parseInt(b))) {
          var _g40 = _g70[b];
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
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g41, b) {
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
    return(join(["table"], map42(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g72 = {};
  nexus.utilities = _g72;
  _g72.indentation = indentation;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72["macro-function"] = macro_function;
  _g72["variable?"] = variable63;
  _g72.exported = exported;
  _g72.macroexpand = macroexpand;
  _g72["special?"] = special63;
  _g72["bind*"] = bind42;
  _g72["valid-id?"] = valid_id63;
  _g72["quote-modules"] = quote_modules;
  _g72["macro?"] = macro63;
  _g72["special-form?"] = special_form63;
  _g72.bind = bind;
  _g72["module-key"] = module_key;
  _g72.quasiexpand = quasiexpand;
  _g72["to-id"] = to_id;
  _g72.imported = imported;
  _g72["initial-environment"] = initial_environment;
  _g72["stash*"] = stash42;
  _g72["bound?"] = bound63;
  _g72["symbol?"] = symbol63;
  _g72["quote-environment"] = quote_environment;
  _g72.quoted = quoted;
  _g72.getenv = getenv;
})();
(function () {
  var _g74 = nexus.runtime;
  var char = _g74.char;
  var extend = _g74.extend;
  var iterate = _g74.iterate;
  var mapo = _g74.mapo;
  var unstash = _g74.unstash;
  var id_literal63 = _g74["id-literal?"];
  var join = _g74.join;
  var nil63 = _g74["nil?"];
  var atom63 = _g74["atom?"];
  var to_string = _g74["to-string"];
  var keys63 = _g74["keys?"];
  var composite63 = _g74["composite?"];
  var code = _g74.code;
  var inner = _g74.inner;
  var reduce = _g74.reduce;
  var replicate = _g74.replicate;
  var pairwise = _g74.pairwise;
  var drop = _g74.drop;
  var splice = _g74.splice;
  var _37message_handler = _g74["%message-handler"];
  var keep = _g74.keep;
  var stash = _g74.stash;
  var find = _g74.find;
  var number63 = _g74["number?"];
  var _62 = _g74[">"];
  var tl = _g74.tl;
  var string63 = _g74["string?"];
  var write = _g74.write;
  var hd = _g74.hd;
  var cat = _g74.cat;
  var _60 = _g74["<"];
  var write_file = _g74["write-file"];
  var map42 = _g74["map*"];
  var function63 = _g74["function?"];
  var sublist = _g74.sublist;
  var last = _g74.last;
  var empty63 = _g74["empty?"];
  var substring = _g74.substring;
  var split = _g74.split;
  var table63 = _g74["table?"];
  var search = _g74.search;
  var _37 = _g74["%"];
  var make_id = _g74["make-id"];
  var apply = _g74.apply;
  var exit = _g74.exit;
  var _6061 = _g74["<="];
  var read_file = _g74["read-file"];
  var _47 = _g74["/"];
  var some63 = _g74["some?"];
  var reverse = _g74.reverse;
  var map = _g74.map;
  var mapt = _g74.mapt;
  var boolean63 = _g74["boolean?"];
  var _6261 = _g74[">="];
  var exclude = _g74.exclude;
  var _61 = _g74["="];
  var parse_number = _g74["parse-number"];
  var sub = _g74.sub;
  var list63 = _g74["list?"];
  var setenv = _g74.setenv;
  var is63 = _g74["is?"];
  var string_literal63 = _g74["string-literal?"];
  var length = _g74.length;
  var _43 = _g74["+"];
  var _42 = _g74["*"];
  var _ = _g74["-"];
  var add = _g74.add;
  var delimiters = {"\n": true, "(": true, ")": true, ";": true};
  var whitespace = {"\n": true, "\t": true, " ": true};
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
  var _g80 = {};
  nexus.reader = _g80;
  _g80["read-from-string"] = read_from_string;
  _g80["read-all"] = read_all;
  _g80["make-stream"] = make_stream;
  _g80.read = read;
  _g80["read-table"] = read_table;
})();
(function () {
  var _g82 = nexus.runtime;
  var char = _g82.char;
  var extend = _g82.extend;
  var iterate = _g82.iterate;
  var mapo = _g82.mapo;
  var unstash = _g82.unstash;
  var id_literal63 = _g82["id-literal?"];
  var join = _g82.join;
  var nil63 = _g82["nil?"];
  var atom63 = _g82["atom?"];
  var to_string = _g82["to-string"];
  var keys63 = _g82["keys?"];
  var composite63 = _g82["composite?"];
  var code = _g82.code;
  var inner = _g82.inner;
  var reduce = _g82.reduce;
  var replicate = _g82.replicate;
  var pairwise = _g82.pairwise;
  var drop = _g82.drop;
  var splice = _g82.splice;
  var _37message_handler = _g82["%message-handler"];
  var keep = _g82.keep;
  var stash = _g82.stash;
  var find = _g82.find;
  var number63 = _g82["number?"];
  var _62 = _g82[">"];
  var tl = _g82.tl;
  var string63 = _g82["string?"];
  var write = _g82.write;
  var hd = _g82.hd;
  var cat = _g82.cat;
  var _60 = _g82["<"];
  var write_file = _g82["write-file"];
  var map42 = _g82["map*"];
  var function63 = _g82["function?"];
  var sublist = _g82.sublist;
  var last = _g82.last;
  var empty63 = _g82["empty?"];
  var substring = _g82.substring;
  var split = _g82.split;
  var table63 = _g82["table?"];
  var search = _g82.search;
  var _37 = _g82["%"];
  var make_id = _g82["make-id"];
  var apply = _g82.apply;
  var exit = _g82.exit;
  var _6061 = _g82["<="];
  var read_file = _g82["read-file"];
  var _47 = _g82["/"];
  var some63 = _g82["some?"];
  var reverse = _g82.reverse;
  var map = _g82.map;
  var mapt = _g82.mapt;
  var boolean63 = _g82["boolean?"];
  var _6261 = _g82[">="];
  var exclude = _g82.exclude;
  var _61 = _g82["="];
  var parse_number = _g82["parse-number"];
  var sub = _g82.sub;
  var list63 = _g82["list?"];
  var setenv = _g82.setenv;
  var is63 = _g82["is?"];
  var string_literal63 = _g82["string-literal?"];
  var length = _g82.length;
  var _43 = _g82["+"];
  var _42 = _g82["*"];
  var _ = _g82["-"];
  var add = _g82.add;
  var _g83 = nexus.utilities;
  var variable63 = _g83["variable?"];
  var symbol63 = _g83["symbol?"];
  var bind = _g83.bind;
  var quote_environment = _g83["quote-environment"];
  var special63 = _g83["special?"];
  var bind42 = _g83["bind*"];
  var special_form63 = _g83["special-form?"];
  var symbol_expansion = _g83["symbol-expansion"];
  var quoted = _g83.quoted;
  var initial_environment = _g83["initial-environment"];
  var module_key = _g83["module-key"];
  var quasiexpand = _g83.quasiexpand;
  var stash42 = _g83["stash*"];
  var quote_modules = _g83["quote-modules"];
  var imported = _g83.imported;
  var exported = _g83.exported;
  var to_id = _g83["to-id"];
  var macro63 = _g83["macro?"];
  var macro_function = _g83["macro-function"];
  var valid_id63 = _g83["valid-id?"];
  var getenv = _g83.getenv;
  var bound63 = _g83["bound?"];
  var indentation = _g83.indentation;
  var macroexpand = _g83.macroexpand;
  var _g84 = nexus.reader;
  var read_table = _g84["read-table"];
  var read_from_string = _g84["read-from-string"];
  var read = _g84.read;
  var make_stream = _g84["make-stream"];
  var read_all = _g84["read-all"];
  var infix = {js: {"or": "||", "and": "&&", "~=": "!=", "=": "===", cat: "+"}, common: {"/": true, ">": true, ">=": true, "%": true, "<=": true, "+": true, "*": true, "-": true, "<": true}, lua: {"or": true, "and": true, "~=": true, cat: "..", "=": "=="}};
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
    var special = _g88.special;
    var self_tr63 = _g88.tr;
    var stmt = _g88.stmt;
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
    return(map(open_module, m.import));
  }
  function compile_module(spec) {
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  }
  function prologue(spec) {
    if (spec) {
      var m = module(spec);
      return(join(imported(spec), map(function (x) {
        return(splice(imported(x)));
      }, m.import)));
    }
  }
  function eval(form, spec) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(spec), [form]));
    var x = compile(macroexpand(form1));
    target = previous;
    return(run(x));
  }
  var _g117 = {};
  nexus.compiler = _g117;
  _g117["compile-function"] = compile_function;
  _g117["compile-module"] = compile_module;
  _g117["compile-body"] = compile_body;
  _g117["load-module"] = load_module;
  _g117["open-module"] = open_module;
  _g117.compile = compile;
  _g117["compile-special"] = compile_special;
  _g117["compile-branch"] = compile_branch;
  _g117["in-module"] = in_module;
  _g117.eval = eval;
  _g117["compile-call"] = compile_call;
})();
(function () {
  var _g120 = nexus.runtime;
  var char = _g120.char;
  var extend = _g120.extend;
  var iterate = _g120.iterate;
  var mapo = _g120.mapo;
  var unstash = _g120.unstash;
  var id_literal63 = _g120["id-literal?"];
  var join = _g120.join;
  var nil63 = _g120["nil?"];
  var atom63 = _g120["atom?"];
  var to_string = _g120["to-string"];
  var keys63 = _g120["keys?"];
  var composite63 = _g120["composite?"];
  var code = _g120.code;
  var inner = _g120.inner;
  var reduce = _g120.reduce;
  var replicate = _g120.replicate;
  var pairwise = _g120.pairwise;
  var drop = _g120.drop;
  var splice = _g120.splice;
  var _37message_handler = _g120["%message-handler"];
  var keep = _g120.keep;
  var stash = _g120.stash;
  var find = _g120.find;
  var number63 = _g120["number?"];
  var _62 = _g120[">"];
  var tl = _g120.tl;
  var string63 = _g120["string?"];
  var write = _g120.write;
  var hd = _g120.hd;
  var cat = _g120.cat;
  var _60 = _g120["<"];
  var write_file = _g120["write-file"];
  var map42 = _g120["map*"];
  var function63 = _g120["function?"];
  var sublist = _g120.sublist;
  var last = _g120.last;
  var empty63 = _g120["empty?"];
  var substring = _g120.substring;
  var split = _g120.split;
  var table63 = _g120["table?"];
  var search = _g120.search;
  var _37 = _g120["%"];
  var make_id = _g120["make-id"];
  var apply = _g120.apply;
  var exit = _g120.exit;
  var _6061 = _g120["<="];
  var read_file = _g120["read-file"];
  var _47 = _g120["/"];
  var some63 = _g120["some?"];
  var reverse = _g120.reverse;
  var map = _g120.map;
  var mapt = _g120.mapt;
  var boolean63 = _g120["boolean?"];
  var _6261 = _g120[">="];
  var exclude = _g120.exclude;
  var _61 = _g120["="];
  var parse_number = _g120["parse-number"];
  var sub = _g120.sub;
  var list63 = _g120["list?"];
  var setenv = _g120.setenv;
  var is63 = _g120["is?"];
  var string_literal63 = _g120["string-literal?"];
  var length = _g120.length;
  var _43 = _g120["+"];
  var _42 = _g120["*"];
  var _ = _g120["-"];
  var add = _g120.add;
  var _g121 = nexus.utilities;
  var variable63 = _g121["variable?"];
  var symbol63 = _g121["symbol?"];
  var bind = _g121.bind;
  var quote_environment = _g121["quote-environment"];
  var special63 = _g121["special?"];
  var bind42 = _g121["bind*"];
  var special_form63 = _g121["special-form?"];
  var symbol_expansion = _g121["symbol-expansion"];
  var quoted = _g121.quoted;
  var initial_environment = _g121["initial-environment"];
  var module_key = _g121["module-key"];
  var quasiexpand = _g121.quasiexpand;
  var stash42 = _g121["stash*"];
  var quote_modules = _g121["quote-modules"];
  var imported = _g121.imported;
  var exported = _g121.exported;
  var to_id = _g121["to-id"];
  var macro63 = _g121["macro?"];
  var macro_function = _g121["macro-function"];
  var valid_id63 = _g121["valid-id?"];
  var getenv = _g121.getenv;
  var bound63 = _g121["bound?"];
  var indentation = _g121.indentation;
  var macroexpand = _g121.macroexpand;
  var _g122 = nexus.compiler;
  var compile_function = _g122["compile-function"];
  var open_module = _g122["open-module"];
  var compile_module = _g122["compile-module"];
  var compile = _g122.compile;
  var in_module = _g122["in-module"];
  var eval = _g122.eval;
  var compile_special = _g122["compile-special"];
  var load_module = _g122["load-module"];
  var compile_branch = _g122["compile-branch"];
  var compile_call = _g122["compile-call"];
  var compile_body = _g122["compile-body"];
})();
(function () {
  var _g228 = nexus.runtime;
  var char = _g228.char;
  var extend = _g228.extend;
  var iterate = _g228.iterate;
  var mapo = _g228.mapo;
  var unstash = _g228.unstash;
  var id_literal63 = _g228["id-literal?"];
  var join = _g228.join;
  var nil63 = _g228["nil?"];
  var atom63 = _g228["atom?"];
  var to_string = _g228["to-string"];
  var keys63 = _g228["keys?"];
  var composite63 = _g228["composite?"];
  var code = _g228.code;
  var inner = _g228.inner;
  var reduce = _g228.reduce;
  var replicate = _g228.replicate;
  var pairwise = _g228.pairwise;
  var drop = _g228.drop;
  var splice = _g228.splice;
  var _37message_handler = _g228["%message-handler"];
  var keep = _g228.keep;
  var stash = _g228.stash;
  var find = _g228.find;
  var number63 = _g228["number?"];
  var _62 = _g228[">"];
  var tl = _g228.tl;
  var string63 = _g228["string?"];
  var write = _g228.write;
  var hd = _g228.hd;
  var cat = _g228.cat;
  var _60 = _g228["<"];
  var write_file = _g228["write-file"];
  var map42 = _g228["map*"];
  var function63 = _g228["function?"];
  var sublist = _g228.sublist;
  var last = _g228.last;
  var empty63 = _g228["empty?"];
  var substring = _g228.substring;
  var split = _g228.split;
  var table63 = _g228["table?"];
  var search = _g228.search;
  var _37 = _g228["%"];
  var make_id = _g228["make-id"];
  var apply = _g228.apply;
  var exit = _g228.exit;
  var _6061 = _g228["<="];
  var read_file = _g228["read-file"];
  var _47 = _g228["/"];
  var some63 = _g228["some?"];
  var reverse = _g228.reverse;
  var map = _g228.map;
  var mapt = _g228.mapt;
  var boolean63 = _g228["boolean?"];
  var _6261 = _g228[">="];
  var exclude = _g228.exclude;
  var _61 = _g228["="];
  var parse_number = _g228["parse-number"];
  var sub = _g228.sub;
  var list63 = _g228["list?"];
  var setenv = _g228.setenv;
  var is63 = _g228["is?"];
  var string_literal63 = _g228["string-literal?"];
  var length = _g228.length;
  var _43 = _g228["+"];
  var _42 = _g228["*"];
  var _ = _g228["-"];
  var add = _g228.add;
  var _g229 = nexus.utilities;
  var variable63 = _g229["variable?"];
  var symbol63 = _g229["symbol?"];
  var bind = _g229.bind;
  var quote_environment = _g229["quote-environment"];
  var special63 = _g229["special?"];
  var bind42 = _g229["bind*"];
  var special_form63 = _g229["special-form?"];
  var symbol_expansion = _g229["symbol-expansion"];
  var quoted = _g229.quoted;
  var initial_environment = _g229["initial-environment"];
  var module_key = _g229["module-key"];
  var quasiexpand = _g229.quasiexpand;
  var stash42 = _g229["stash*"];
  var quote_modules = _g229["quote-modules"];
  var imported = _g229.imported;
  var exported = _g229.exported;
  var to_id = _g229["to-id"];
  var macro63 = _g229["macro?"];
  var macro_function = _g229["macro-function"];
  var valid_id63 = _g229["valid-id?"];
  var getenv = _g229.getenv;
  var bound63 = _g229["bound?"];
  var indentation = _g229.indentation;
  var macroexpand = _g229.macroexpand;
  var _g230 = nexus.compiler;
  var compile_function = _g230["compile-function"];
  var open_module = _g230["open-module"];
  var compile_module = _g230["compile-module"];
  var compile = _g230.compile;
  var in_module = _g230["in-module"];
  var eval = _g230.eval;
  var compile_special = _g230["compile-special"];
  var load_module = _g230["load-module"];
  var compile_branch = _g230["compile-branch"];
  var compile_call = _g230["compile-call"];
  var compile_body = _g230["compile-body"];
  global.target = "js";
})();
(function () {
  var _g395 = nexus.runtime;
  var char = _g395.char;
  var extend = _g395.extend;
  var iterate = _g395.iterate;
  var mapo = _g395.mapo;
  var unstash = _g395.unstash;
  var id_literal63 = _g395["id-literal?"];
  var join = _g395.join;
  var nil63 = _g395["nil?"];
  var atom63 = _g395["atom?"];
  var to_string = _g395["to-string"];
  var keys63 = _g395["keys?"];
  var composite63 = _g395["composite?"];
  var code = _g395.code;
  var inner = _g395.inner;
  var reduce = _g395.reduce;
  var replicate = _g395.replicate;
  var pairwise = _g395.pairwise;
  var drop = _g395.drop;
  var splice = _g395.splice;
  var _37message_handler = _g395["%message-handler"];
  var keep = _g395.keep;
  var stash = _g395.stash;
  var find = _g395.find;
  var number63 = _g395["number?"];
  var _62 = _g395[">"];
  var tl = _g395.tl;
  var string63 = _g395["string?"];
  var write = _g395.write;
  var hd = _g395.hd;
  var cat = _g395.cat;
  var _60 = _g395["<"];
  var write_file = _g395["write-file"];
  var map42 = _g395["map*"];
  var function63 = _g395["function?"];
  var sublist = _g395.sublist;
  var last = _g395.last;
  var empty63 = _g395["empty?"];
  var substring = _g395.substring;
  var split = _g395.split;
  var table63 = _g395["table?"];
  var search = _g395.search;
  var _37 = _g395["%"];
  var make_id = _g395["make-id"];
  var apply = _g395.apply;
  var exit = _g395.exit;
  var _6061 = _g395["<="];
  var read_file = _g395["read-file"];
  var _47 = _g395["/"];
  var some63 = _g395["some?"];
  var reverse = _g395.reverse;
  var map = _g395.map;
  var mapt = _g395.mapt;
  var boolean63 = _g395["boolean?"];
  var _6261 = _g395[">="];
  var exclude = _g395.exclude;
  var _61 = _g395["="];
  var parse_number = _g395["parse-number"];
  var sub = _g395.sub;
  var list63 = _g395["list?"];
  var setenv = _g395.setenv;
  var is63 = _g395["is?"];
  var string_literal63 = _g395["string-literal?"];
  var length = _g395.length;
  var _43 = _g395["+"];
  var _42 = _g395["*"];
  var _ = _g395["-"];
  var add = _g395.add;
  var _g396 = nexus.utilities;
  var variable63 = _g396["variable?"];
  var symbol63 = _g396["symbol?"];
  var bind = _g396.bind;
  var quote_environment = _g396["quote-environment"];
  var special63 = _g396["special?"];
  var bind42 = _g396["bind*"];
  var special_form63 = _g396["special-form?"];
  var symbol_expansion = _g396["symbol-expansion"];
  var quoted = _g396.quoted;
  var initial_environment = _g396["initial-environment"];
  var module_key = _g396["module-key"];
  var quasiexpand = _g396.quasiexpand;
  var stash42 = _g396["stash*"];
  var quote_modules = _g396["quote-modules"];
  var imported = _g396.imported;
  var exported = _g396.exported;
  var to_id = _g396["to-id"];
  var macro63 = _g396["macro?"];
  var macro_function = _g396["macro-function"];
  var valid_id63 = _g396["valid-id?"];
  var getenv = _g396.getenv;
  var bound63 = _g396["bound?"];
  var indentation = _g396.indentation;
  var macroexpand = _g396.macroexpand;
  var _g397 = nexus.compiler;
  var compile_function = _g397["compile-function"];
  var open_module = _g397["open-module"];
  var compile_module = _g397["compile-module"];
  var compile = _g397.compile;
  var in_module = _g397["in-module"];
  var eval = _g397.eval;
  var compile_special = _g397["compile-special"];
  var load_module = _g397["load-module"];
  var compile_branch = _g397["compile-branch"];
  var compile_call = _g397["compile-call"];
  var compile_body = _g397["compile-body"];
  global.modules = {lib: {import: ["core", "special"], export: {}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"with-bindings": {export: true, macro: function (_g404) {
    var names = _g404[0];
    var body = unstash(sublist(arguments, 1));
    var _g405 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g406 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g407 = ["setenv", x];
        _g407.variable = true;
        return(_g407);
      })())])];
      _g406.scope = true;
      return(_g406);
    })(), _g405));
  }, module: "core"}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g409 = 0;
    var _g408 = elements;
    while ((_g409 < length(_g408))) {
      var e = _g408[_g409];
      l[e] = true;
      _g409 = (_g409 + 1);
    }
    return(join(["table"], l));
  }, module: "core"}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g410 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g410)]));
  }, module: "core"}, "define-local": {export: true, macro: function (name, x) {
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
  }, module: "core"}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g414 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g414))) {
      var _g415 = bind42(x, _g414);
      var args = _g415[0];
      var _g416 = _g415[1];
      return(join(["%global-function", name, args], _g416));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g417 = sub(body, 0);
    var form = join(["fn", args], _g417);
    var keys = sub(_g417, length(_g417));
    var _g418 = join((function () {
      var _g419 = ["setenv", join(["quote", name])];
      _g419.form = join(["quote", form]);
      _g419.special = form;
      return(_g419);
    })(), keys);
    eval(_g418, current_module);
    return(undefined);
  }, module: "core"}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core"}, "define-global": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g420 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g420))) {
      var _g421 = bind42(x, _g420);
      var args = _g421[0];
      var _g422 = _g421[1];
      return(join(["%global-function", name, args], _g422));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g423 = sub(body, 0);
    add(environment, {});
    var _g424 = (function () {
      map(function (_g425) {
        var name = _g425[0];
        var exp = _g425[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g423)));
    })();
    drop(environment);
    return(_g424);
  }, module: "core"}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g426 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g426)]));
  }, module: "core"}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g427 = sub(body, 0);
    var form = join(["fn", args], _g427);
    var _g428 = join((function () {
      var _g429 = ["setenv", join(["quote", name])];
      _g429.form = join(["quote", form]);
      _g429.macro = form;
      return(_g429);
    })());
    eval(_g428, current_module);
    return(undefined);
  }, module: "core"}, "list*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g430 = xs;
      while ((i < length(_g430))) {
        var x = _g430[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
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
      var _g431 = body;
      for (k in _g431) {
        if (isNaN(parseInt(k))) {
          var v = _g431[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core"}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g432 = sub(body, 0);
    var _g433 = bind42(args, _g432);
    var _g434 = _g433[0];
    var _g435 = _g433[1];
    return(join(["%function", _g434], _g435));
  }, module: "core"}, guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core"}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g436 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g436)]));
  }, module: "core"}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core"}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g227, x) {
      return(x);
    }, body)));
  }, module: "core"}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g437 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g438 = ["table"];
      _g438._scope = scope;
      return(_g438);
    })())]), join(["let", join([x, join(["do"], _g437)]), join(["drop", "environment"]), x])]));
  }, module: "core"}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g439 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g440) {
      var lh = _g440[0];
      var rh = _g440[1];
      var _g442 = 0;
      var _g441 = bind(lh, rh);
      while ((_g442 < length(_g441))) {
        var _g443 = _g441[_g442];
        var id = _g443[0];
        var val = _g443[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g442 = (_g442 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g439)])));
  }, module: "core"}, language: {export: true, macro: function () {
    return(join(["quote", target]));
  }, module: "core"}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g444 = sub(body, 0);
    add(environment, {});
    var _g445 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g444)));
    })();
    drop(environment);
    return(_g445);
  }, module: "core"}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core"}, across: {export: true, macro: function (_g446) {
    var l = _g446[0];
    var v = _g446[1];
    var i = _g446[2];
    var start = _g446[3];
    var body = unstash(sublist(arguments, 1));
    var _g447 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g447, [join(["inc", i])]))])]));
  }, module: "core"}, dec: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core"}, each: {export: true, macro: function (_g448) {
    var t = _g448[0];
    var k = _g448[1];
    var v = _g448[2];
    var body = unstash(sublist(arguments, 1));
    var _g449 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g450 = ["target"];
      _g450.js = join(["isNaN", join(["parseInt", k])]);
      _g450.lua = join(["not", join(["number?", k])]);
      return(_g450);
    })()), join(["let", join([v, join(["get", t1, k])])], _g449)])])]));
  }, module: "core"}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core"}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }, module: "core"}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core"}, inc: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core"}}}, reader: {import: ["runtime", "special", "core"], export: {"read-table": {export: true, variable: true, module: "reader"}, "define-reader": {export: true, macro: function (_g451) {
    var char = _g451[0];
    var stream = _g451[1];
    var body = unstash(sublist(arguments, 1));
    var _g452 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g452)]));
  }, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, read: {export: true, variable: true, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, runtime: {import: ["special", "core"], export: {char: {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, mapo: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, print: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, "map*": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, mapt: {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true, module: "system"}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%try": {export: true, module: "special", special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g453 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g453);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g454 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g454);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true, tr: true}, "%global-function": {export: true, module: "special", special: function (_g455) {
    var name = _g455[0];
    var args = _g455[1];
    var body = sub(_g455, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, stmt: true, tr: true}, "set": {special: function (_g456) {
    var lh = _g456[0];
    var rh = _g456[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, stmt: true, module: "special"}, "while": {export: true, module: "special", special: function (_g457) {
    var condition = _g457[0];
    var body = sub(_g457, 1);
    var _g458 = compile(condition);
    var _g459 = (function () {
      indent_level = (indent_level + 1);
      var _g460 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g460);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g458 + ") {\n" + _g459 + ind + "}\n"));
    } else {
      return((ind + "while " + _g458 + " do\n" + _g459 + ind + "end\n"));
    }
  }, stmt: true, tr: true}, "%object": {special: function (forms) {
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
    var _g461 = pairs;
    while ((i < length(_g461))) {
      var _g462 = _g461[i];
      var k = _g462[0];
      var v = _g462[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g463 = compile(v);
      var _g464 = (function () {
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
      str = (str + _g464 + sep + _g463);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true, module: "special"}, "break": {special: function (_g119) {
    return((indentation() + "break"));
  }, export: true, stmt: true, module: "special"}, "%array": {special: function (forms) {
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
    var _g465 = forms;
    while ((i < length(_g465))) {
      var x = _g465[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true, module: "special"}, "get": {special: function (_g466) {
    var t = _g466[0];
    var k = _g466[1];
    var _g467 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g467, 0) === "{"))) {
      _g467 = ("(" + _g467 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g467 + "." + inner(k)));
    } else {
      return((_g467 + "[" + k1 + "]"));
    }
  }, export: true, module: "special"}, "not": {special: function (_g468) {
    var x = _g468[0];
    var _g469 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g469 + ")"));
  }, export: true, module: "special"}, "%for": {export: true, module: "special", special: function (_g470) {
    var _g471 = _g470[0];
    var t = _g471[0];
    var k = _g471[1];
    var body = sub(_g470, 1);
    var _g472 = compile(t);
    var ind = indentation();
    var _g473 = (function () {
      indent_level = (indent_level + 1);
      var _g474 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g474);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g472 + " do\n" + _g473 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g472 + ") {\n" + _g473 + ind + "}\n"));
    }
  }, stmt: true, tr: true}, "do": {export: true, module: "special", special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, stmt: true, tr: true}, "return": {special: function (_g475) {
    var x = _g475[0];
    var _g476 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g476));
  }, export: true, stmt: true, module: "special"}, "%function": {special: function (_g477) {
    var args = _g477[0];
    var body = sub(_g477, 1);
    return(compile_function(args, body));
  }, export: true, module: "special"}, "%local-function": {export: true, module: "special", special: function (_g478) {
    var name = _g478[0];
    var args = _g478[1];
    var body = sub(_g478, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, stmt: true, tr: true}, "if": {export: true, module: "special", special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g479 = form;
    while ((i < length(_g479))) {
      var condition = _g479[i];
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
  }, stmt: true, tr: true}, "error": {special: function (_g480) {
    var x = _g480[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true, stmt: true, module: "special"}, "%local": {special: function (_g481) {
    var name = _g481[0];
    var value = _g481[1];
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
  }, export: true, stmt: true, module: "special"}}}, utilities: {import: ["runtime", "special", "core"], export: {"indent-level": {global: true, export: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, "bind*": {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, indentation: {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, macroexpand: {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities"}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-function": {export: true, variable: true, module: "compiler"}, "open-module": {export: true, variable: true, module: "compiler"}, "compile-module": {export: true, variable: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g482 = sub(body, 0);
    var imports = [];
    var exp = _g482.export;
    var imp = _g482.import;
    var _g484 = 0;
    var _g483 = (imp || []);
    while ((_g484 < length(_g483))) {
      var k = _g483[_g484];
      load_module(k);
      imports = join(imports, imported(k));
      _g484 = (_g484 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g486 = 0;
    var _g485 = (exp || []);
    while ((_g486 < length(_g485))) {
      var k = _g485[_g486];
      setenv(k, {_stash: true, export: true});
      _g486 = (_g486 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}, "current-module": {global: true, export: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g487 = sub(body, 0);
    var imports = [];
    var exp = _g487.export;
    var imp = _g487.import;
    var _g489 = 0;
    var _g488 = (imp || []);
    while ((_g489 < length(_g488))) {
      var k = _g488[_g489];
      load_module(k);
      imports = join(imports, imported(k));
      _g489 = (_g489 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g491 = 0;
    var _g490 = (exp || []);
    while ((_g491 < length(_g490))) {
      var k = _g490[_g491];
      setenv(k, {_stash: true, export: true});
      _g491 = (_g491 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}}];
})();
(function () {
  var _g36 = nexus.runtime;
  var char = _g36.char;
  var extend = _g36.extend;
  var iterate = _g36.iterate;
  var mapo = _g36.mapo;
  var unstash = _g36.unstash;
  var id_literal63 = _g36["id-literal?"];
  var join = _g36.join;
  var nil63 = _g36["nil?"];
  var atom63 = _g36["atom?"];
  var to_string = _g36["to-string"];
  var keys63 = _g36["keys?"];
  var composite63 = _g36["composite?"];
  var code = _g36.code;
  var inner = _g36.inner;
  var reduce = _g36.reduce;
  var replicate = _g36.replicate;
  var pairwise = _g36.pairwise;
  var drop = _g36.drop;
  var splice = _g36.splice;
  var _37message_handler = _g36["%message-handler"];
  var keep = _g36.keep;
  var stash = _g36.stash;
  var find = _g36.find;
  var number63 = _g36["number?"];
  var _62 = _g36[">"];
  var tl = _g36.tl;
  var string63 = _g36["string?"];
  var write = _g36.write;
  var hd = _g36.hd;
  var cat = _g36.cat;
  var _60 = _g36["<"];
  var write_file = _g36["write-file"];
  var map42 = _g36["map*"];
  var function63 = _g36["function?"];
  var sublist = _g36.sublist;
  var last = _g36.last;
  var empty63 = _g36["empty?"];
  var substring = _g36.substring;
  var split = _g36.split;
  var table63 = _g36["table?"];
  var search = _g36.search;
  var _37 = _g36["%"];
  var make_id = _g36["make-id"];
  var apply = _g36.apply;
  var exit = _g36.exit;
  var _6061 = _g36["<="];
  var read_file = _g36["read-file"];
  var _47 = _g36["/"];
  var some63 = _g36["some?"];
  var reverse = _g36.reverse;
  var map = _g36.map;
  var mapt = _g36.mapt;
  var boolean63 = _g36["boolean?"];
  var _6261 = _g36[">="];
  var exclude = _g36.exclude;
  var _61 = _g36["="];
  var parse_number = _g36["parse-number"];
  var sub = _g36.sub;
  var list63 = _g36["list?"];
  var setenv = _g36.setenv;
  var is63 = _g36["is?"];
  var string_literal63 = _g36["string-literal?"];
  var length = _g36.length;
  var _43 = _g36["+"];
  var _42 = _g36["*"];
  var _ = _g36["-"];
  var add = _g36.add;
  var _g73 = nexus.utilities;
  var variable63 = _g73["variable?"];
  var symbol63 = _g73["symbol?"];
  var bind = _g73.bind;
  var quote_environment = _g73["quote-environment"];
  var special63 = _g73["special?"];
  var bind42 = _g73["bind*"];
  var special_form63 = _g73["special-form?"];
  var symbol_expansion = _g73["symbol-expansion"];
  var quoted = _g73.quoted;
  var initial_environment = _g73["initial-environment"];
  var module_key = _g73["module-key"];
  var quasiexpand = _g73.quasiexpand;
  var stash42 = _g73["stash*"];
  var quote_modules = _g73["quote-modules"];
  var imported = _g73.imported;
  var exported = _g73.exported;
  var to_id = _g73["to-id"];
  var macro63 = _g73["macro?"];
  var macro_function = _g73["macro-function"];
  var valid_id63 = _g73["valid-id?"];
  var getenv = _g73.getenv;
  var bound63 = _g73["bound?"];
  var indentation = _g73.indentation;
  var macroexpand = _g73.macroexpand;
  var _g81 = nexus.reader;
  var read_table = _g81["read-table"];
  var read_from_string = _g81["read-from-string"];
  var read = _g81.read;
  var make_stream = _g81["make-stream"];
  var read_all = _g81["read-all"];
  var _g118 = nexus.compiler;
  var compile_function = _g118["compile-function"];
  var open_module = _g118["open-module"];
  var compile_module = _g118["compile-module"];
  var compile = _g118.compile;
  var in_module = _g118["in-module"];
  var eval = _g118.eval;
  var compile_special = _g118["compile-special"];
  var load_module = _g118["load-module"];
  var compile_branch = _g118["compile-branch"];
  var compile_call = _g118["compile-call"];
  var compile_body = _g118["compile-body"];
  function rep(str, spec) {
    var _g493 = (function () {
      try {
        return([true, eval(read_from_string(str), spec)]);
      }
      catch (_g497) {
        return([false, _g497]);
      }
    })();
    var _g1 = _g493[0];
    var x = _g493[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl(spec) {
    var step = function (str) {
      rep(str, spec);
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
    var _g494 = args;
    while ((i < length(_g494))) {
      var arg = _g494[i];
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
      var _g495 = (spec || "main");
      in_module(_g495);
      if (expr) {
        return(rep(expr, _g495));
      } else {
        return(repl(_g495));
      }
    }
  }
  return(main());
})();
