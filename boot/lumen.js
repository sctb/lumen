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
  _g38.inner = inner;
  _g38["list?"] = list63;
  _g38.add = add;
  _g38["number?"] = number63;
  _g38.sub = sub;
  _g38.map = map;
  _g38[">="] = _6261;
  _g38.cat = cat;
  _g38["is?"] = is63;
  _g38.fs = fs;
  _g38.mapl = mapl;
  _g38.reverse = reverse;
  _g38["string-literal?"] = string_literal63;
  _g38["to-string"] = to_string;
  _g38["splice?"] = splice63;
  _g38.replicate = replicate;
  _g38["empty?"] = empty63;
  _g38["%message-handler"] = _37message_handler;
  _g38["make-id"] = make_id;
  _g38.apply = apply;
  _g38["parse-number"] = parse_number;
  _g38.exit = exit;
  _g38.write = write;
  _g38["write-file"] = write_file;
  _g38["id-literal?"] = id_literal63;
  _g38["read-file"] = read_file;
  _g38.iterate = iterate;
  _g38["id-count"] = id_count;
  _g38.char = char;
  _g38["="] = _61;
  _g38.substring = substring;
  _g38.drop = drop;
  _g38[">"] = _62;
  _g38.stash = stash;
  _g38["/"] = _47;
  _g38.pairwise = pairwise;
  _g38["*"] = _42;
  _g38["atom?"] = atom63;
  _g38["-"] = _;
  _g38["+"] = _43;
  _g38.keep = keep;
  _g38.hd = hd;
  _g38.reduce = reduce;
  _g38["boolean?"] = boolean63;
  _g38["<"] = _60;
  _g38.last = last;
  _g38.split = split;
  _g38.exclude = exclude;
  _g38["<="] = _6061;
  _g38.splice = splice;
  _g38["function?"] = function63;
  _g38.type = type;
  _g38["keys?"] = keys63;
  _g38.find = find;
  _g38.setenv = setenv;
  _g38["table?"] = table63;
  _g38["string?"] = string63;
  _g38.join = join;
  _g38.extend = extend;
  _g38.unstash = unstash;
  _g38.code = code;
  _g38.tl = tl;
  _g38["%"] = _37;
  _g38["composite?"] = composite63;
  _g38["some?"] = some63;
  _g38.sublist = sublist;
  _g38.search = search;
  _g38.length = length;
  _g38["nil?"] = nil63;
})();
(function () {
  var _g44 = nexus.runtime;
  var inner = _g44.inner;
  var find = _g44.find;
  var add = _g44.add;
  var number63 = _g44["number?"];
  var composite63 = _g44["composite?"];
  var parse_number = _g44["parse-number"];
  var map = _g44.map;
  var cat = _g44.cat;
  var write = _g44.write;
  var reverse = _g44.reverse;
  var string_literal63 = _g44["string-literal?"];
  var to_string = _g44["to-string"];
  var iterate = _g44.iterate;
  var empty63 = _g44["empty?"];
  var keep = _g44.keep;
  var id_literal63 = _g44["id-literal?"];
  var char = _g44.char;
  var substring = _g44.substring;
  var stash = _g44.stash;
  var code = _g44.code;
  var pairwise = _g44.pairwise;
  var read_file = _g44["read-file"];
  var last = _g44.last;
  var reduce = _g44.reduce;
  var boolean63 = _g44["boolean?"];
  var apply = _g44.apply;
  var _62 = _g44[">"];
  var exclude = _g44.exclude;
  var _6061 = _g44["<="];
  var nil63 = _g44["nil?"];
  var _6261 = _g44[">="];
  var _37message_handler = _g44["%message-handler"];
  var keys63 = _g44["keys?"];
  var length = _g44.length;
  var _43 = _g44["+"];
  var _42 = _g44["*"];
  var _ = _g44["-"];
  var string63 = _g44["string?"];
  var _47 = _g44["/"];
  var extend = _g44.extend;
  var exit = _g44.exit;
  var sublist = _g44.sublist;
  var search = _g44.search;
  var _60 = _g44["<"];
  var _37 = _g44["%"];
  var hd = _g44.hd;
  var unstash = _g44.unstash;
  var some63 = _g44["some?"];
  var list63 = _g44["list?"];
  var join = _g44.join;
  var drop = _g44.drop;
  var make_id = _g44["make-id"];
  var table63 = _g44["table?"];
  var tl = _g44.tl;
  var setenv = _g44.setenv;
  var split = _g44.split;
  var sub = _g44.sub;
  var _61 = _g44["="];
  var function63 = _g44["function?"];
  var splice = _g44.splice;
  var is63 = _g44["is?"];
  var write_file = _g44["write-file"];
  var atom63 = _g44["atom?"];
  var replicate = _g44.replicate;
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
  var reserved = {"function": true, "=": true, ">=": true, "while": true, "throw": true, "switch": true, "instanceof": true, "repeat": true, "typeof": true, "delete": true, "break": true, "else": true, "*": true, "finally": true, "local": true, "this": true, "elseif": true, "continue": true, ">": true, "default": true, "not": true, "until": true, "nil": true, "if": true, "true": true, "<": true, "false": true, "==": true, "for": true, "then": true, "var": true, "or": true, "%": true, "end": true, "and": true, "with": true, "do": true, "+": true, "void": true, "debugger": true, "case": true, "return": true, "new": true, "<=": true, "-": true, "/": true, "catch": true, "try": true, "in": true};
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
      throw new Error("Unsupported module specification");
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
        if ((b.variable && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["%local", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  }
  function imported(spec) {
    var _g76 = unstash(sublist(arguments, 1));
    var all = _g76.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g77 = module(spec).export;
      var n = undefined;
      for (n in _g77) {
        if (isNaN(parseInt(n))) {
          var b = _g77[n];
          if ((b.variable && (all || b.export))) {
            add(imports, join(["%local", n, join(["get", m, join(["quote", n])])]));
          }
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
    var _g78 = t;
    var k = undefined;
    for (k in _g78) {
      if (isNaN(parseInt(k))) {
        var v = _g78[k];
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
      var _g79 = ["table"];
      _g79.export = quote_frame(m.export);
      _g79.import = quoted(m.import);
      return(_g79);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g80 = {};
  nexus.utilities = _g80;
  _g80["variable?"] = variable63;
  _g80["bind*"] = bind42;
  _g80["bound?"] = bound63;
  _g80["symbol?"] = symbol63;
  _g80.indentation = indentation;
  _g80["quote-modules"] = quote_modules;
  _g80.quasiexpand = quasiexpand;
  _g80.quoted = quoted;
  _g80["can-unquote?"] = can_unquote63;
  _g80["quote-binding"] = quote_binding;
  _g80["toplevel?"] = toplevel63;
  _g80["initial-environment"] = initial_environment;
  _g80.bind = bind;
  _g80.module = module;
  _g80["quote-module"] = quote_module;
  _g80["special?"] = special63;
  _g80["quote-environment"] = quote_environment;
  _g80["macro-function"] = macro_function;
  _g80["quote-frame"] = quote_frame;
  _g80["valid-char?"] = valid_char63;
  _g80["numeric?"] = numeric63;
  _g80["macro?"] = macro63;
  _g80.reserved = reserved;
  _g80["quasiquote-list"] = quasiquote_list;
  _g80["quasiquoting?"] = quasiquoting63;
  _g80.exported = exported;
  _g80["quoting?"] = quoting63;
  _g80.escape = escape;
  _g80["global?"] = global63;
  _g80["to-id"] = to_id;
  _g80["module-key"] = module_key;
  _g80.mapo = mapo;
  _g80.imported = imported;
  _g80["valid-id?"] = valid_id63;
  _g80.macroexpand = macroexpand;
  _g80["stash*"] = stash42;
  _g80["quasisplice?"] = quasisplice63;
  _g80["symbol-expansion"] = symbol_expansion;
  _g80.getenv = getenv;
  _g80["special-form?"] = special_form63;
})();
(function () {
  var _g82 = nexus.runtime;
  var inner = _g82.inner;
  var find = _g82.find;
  var add = _g82.add;
  var number63 = _g82["number?"];
  var composite63 = _g82["composite?"];
  var parse_number = _g82["parse-number"];
  var map = _g82.map;
  var cat = _g82.cat;
  var write = _g82.write;
  var reverse = _g82.reverse;
  var string_literal63 = _g82["string-literal?"];
  var to_string = _g82["to-string"];
  var iterate = _g82.iterate;
  var empty63 = _g82["empty?"];
  var keep = _g82.keep;
  var id_literal63 = _g82["id-literal?"];
  var char = _g82.char;
  var substring = _g82.substring;
  var stash = _g82.stash;
  var code = _g82.code;
  var pairwise = _g82.pairwise;
  var read_file = _g82["read-file"];
  var last = _g82.last;
  var reduce = _g82.reduce;
  var boolean63 = _g82["boolean?"];
  var apply = _g82.apply;
  var _62 = _g82[">"];
  var exclude = _g82.exclude;
  var _6061 = _g82["<="];
  var nil63 = _g82["nil?"];
  var _6261 = _g82[">="];
  var _37message_handler = _g82["%message-handler"];
  var keys63 = _g82["keys?"];
  var length = _g82.length;
  var _43 = _g82["+"];
  var _42 = _g82["*"];
  var _ = _g82["-"];
  var string63 = _g82["string?"];
  var _47 = _g82["/"];
  var extend = _g82.extend;
  var exit = _g82.exit;
  var sublist = _g82.sublist;
  var search = _g82.search;
  var _60 = _g82["<"];
  var _37 = _g82["%"];
  var hd = _g82.hd;
  var unstash = _g82.unstash;
  var some63 = _g82["some?"];
  var list63 = _g82["list?"];
  var join = _g82.join;
  var drop = _g82.drop;
  var make_id = _g82["make-id"];
  var table63 = _g82["table?"];
  var tl = _g82.tl;
  var setenv = _g82.setenv;
  var split = _g82.split;
  var sub = _g82.sub;
  var _61 = _g82["="];
  var function63 = _g82["function?"];
  var splice = _g82.splice;
  var is63 = _g82["is?"];
  var write_file = _g82["write-file"];
  var atom63 = _g82["atom?"];
  var replicate = _g82.replicate;
  var delimiters = {")": true, "(": true, "\n": true, ";": true};
  var whitespace = {"\t": true, "\n": true, " ": true};
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
        throw new Error(("Expected ) at " + s.pos));
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
      } else if (c) {
        read_char(s);
        break;
      } else {
        throw new Error(("Expected \" at " + s.pos));
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
        throw new Error(("Expected | at " + s.pos));
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
  var _g93 = {};
  nexus.reader = _g93;
  _g93["make-stream"] = make_stream;
  _g93["flag?"] = flag63;
  _g93["read-char"] = read_char;
  _g93["read-from-string"] = read_from_string;
  _g93["key?"] = key63;
  _g93.eof = eof;
  _g93["skip-non-code"] = skip_non_code;
  _g93.delimiters = delimiters;
  _g93["read-all"] = read_all;
  _g93.read = read;
  _g93["read-table"] = read_table;
  _g93["peek-char"] = peek_char;
  _g93.whitespace = whitespace;
})();
(function () {
  var _g95 = nexus.runtime;
  var inner = _g95.inner;
  var find = _g95.find;
  var add = _g95.add;
  var number63 = _g95["number?"];
  var composite63 = _g95["composite?"];
  var parse_number = _g95["parse-number"];
  var map = _g95.map;
  var cat = _g95.cat;
  var write = _g95.write;
  var reverse = _g95.reverse;
  var string_literal63 = _g95["string-literal?"];
  var to_string = _g95["to-string"];
  var iterate = _g95.iterate;
  var empty63 = _g95["empty?"];
  var keep = _g95.keep;
  var id_literal63 = _g95["id-literal?"];
  var char = _g95.char;
  var substring = _g95.substring;
  var stash = _g95.stash;
  var code = _g95.code;
  var pairwise = _g95.pairwise;
  var read_file = _g95["read-file"];
  var last = _g95.last;
  var reduce = _g95.reduce;
  var boolean63 = _g95["boolean?"];
  var apply = _g95.apply;
  var _62 = _g95[">"];
  var exclude = _g95.exclude;
  var _6061 = _g95["<="];
  var nil63 = _g95["nil?"];
  var _6261 = _g95[">="];
  var _37message_handler = _g95["%message-handler"];
  var keys63 = _g95["keys?"];
  var length = _g95.length;
  var _43 = _g95["+"];
  var _42 = _g95["*"];
  var _ = _g95["-"];
  var string63 = _g95["string?"];
  var _47 = _g95["/"];
  var extend = _g95.extend;
  var exit = _g95.exit;
  var sublist = _g95.sublist;
  var search = _g95.search;
  var _60 = _g95["<"];
  var _37 = _g95["%"];
  var hd = _g95.hd;
  var unstash = _g95.unstash;
  var some63 = _g95["some?"];
  var list63 = _g95["list?"];
  var join = _g95.join;
  var drop = _g95.drop;
  var make_id = _g95["make-id"];
  var table63 = _g95["table?"];
  var tl = _g95.tl;
  var setenv = _g95.setenv;
  var split = _g95.split;
  var sub = _g95.sub;
  var _61 = _g95["="];
  var function63 = _g95["function?"];
  var splice = _g95.splice;
  var is63 = _g95["is?"];
  var write_file = _g95["write-file"];
  var atom63 = _g95["atom?"];
  var replicate = _g95.replicate;
  var _g96 = nexus.utilities;
  var macroexpand = _g96.macroexpand;
  var bind = _g96.bind;
  var variable63 = _g96["variable?"];
  var exported = _g96.exported;
  var to_id = _g96["to-id"];
  var quote_modules = _g96["quote-modules"];
  var module = _g96.module;
  var quasiexpand = _g96.quasiexpand;
  var bind42 = _g96["bind*"];
  var special63 = _g96["special?"];
  var quoted = _g96.quoted;
  var bound63 = _g96["bound?"];
  var special_form63 = _g96["special-form?"];
  var quote_environment = _g96["quote-environment"];
  var getenv = _g96.getenv;
  var mapo = _g96.mapo;
  var stash42 = _g96["stash*"];
  var valid_id63 = _g96["valid-id?"];
  var imported = _g96.imported;
  var macro_function = _g96["macro-function"];
  var module_key = _g96["module-key"];
  var toplevel63 = _g96["toplevel?"];
  var macro63 = _g96["macro?"];
  var symbol_expansion = _g96["symbol-expansion"];
  var initial_environment = _g96["initial-environment"];
  var symbol63 = _g96["symbol?"];
  var indentation = _g96.indentation;
  var _g99 = nexus.reader;
  var make_stream = _g99["make-stream"];
  var read_table = _g99["read-table"];
  var read = _g99.read;
  var read_from_string = _g99["read-from-string"];
  var read_all = _g99["read-all"];
  var infix = {js: {"and": "&&", "=": "===", "~=": "!=", cat: "+", "or": "||"}, common: {"+": true, "*": true, "-": true, "<": true, "/": true, ">": true, "<=": true, "%": true, ">=": true}, lua: {"and": true, "=": "==", "~=": true, cat: "..", "or": true}};
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
    var _g100 = args;
    var i = 0;
    while ((i < length(_g100))) {
      var arg = _g100[i];
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
      throw new Error("Unrecognized atom");
    }
  }
  function compile_body(forms) {
    var _g101 = unstash(sublist(arguments, 1));
    var tail = _g101.tail;
    var str = "";
    var _g102 = forms;
    var i = 0;
    while ((i < length(_g102))) {
      var x = _g102[i];
      var t63 = (tail && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, tail: t63, stmt: true}));
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
    var _g103 = getenv(hd(form));
    var self_tr63 = _g103.tr;
    var special = _g103.special;
    var stmt = _g103.stmt;
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
        throw new Error("Invalid function call");
      }
    }
  }
  function compile_infix(_g104) {
    var op = _g104[0];
    var args = sub(_g104, 1);
    var str = "(";
    var _g105 = getop(op);
    var _g106 = args;
    var i = 0;
    while ((i < length(_g106))) {
      var arg = _g106[i];
      if (((_g105 === "-") && (length(args) === 1))) {
        str = (str + _g105 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g105 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g107 = (function () {
      indent_level = (indent_level + 1);
      var _g108 = compile(body, {_stash: true, tail: tail63, stmt: true});
      indent_level = (indent_level - 1);
      return(_g108);
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
      return((ind + "if (" + cond1 + ") {\n" + _g107 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g107 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g107 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g107 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g107 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g107 + tr));
    }
  }
  function compile_function(args, body) {
    var _g109 = unstash(sublist(arguments, 2));
    var name = _g109.name;
    var prefix = _g109.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g110 = (prefix || "");
    var _g111 = compile_args(args);
    var _g112 = (function () {
      indent_level = (indent_level + 1);
      var _g113 = compile_body(body, {_stash: true, tail: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g113);
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
      return(("function " + id + _g111 + " {\n" + _g112 + ind + "}" + tr));
    } else {
      return((_g110 + "function " + id + _g111 + "\n" + _g112 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g114 = unstash(sublist(arguments, 1));
    var tail = _g114.tail;
    var stmt = _g114.stmt;
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
      var _g115 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g115 + tr));
    }
  };
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g116 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g116, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = global.eval;
  var compiler_output;
  global.compiling63 = false;
  global.compilation_level = undefined;
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
    var _g117 = toplevel;
    var name = undefined;
    for (name in _g117) {
      if (isNaN(parseInt(name))) {
        var binding = _g117[name];
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
    var _g118 = unstash(sublist(arguments, 1));
    var all = _g118.all;
    var m = module(spec);
    var frame = last(environment);
    var _g119 = m.export;
    var k = undefined;
    for (k in _g119) {
      if (isNaN(parseInt(k))) {
        var v = _g119[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g120 = unstash(sublist(arguments, 1));
    var all = _g120.all;
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
    compiling63 = true;
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  }
  function prologue() {
    if (current_module) {
      return(join(imported(current_module, {_stash: true, all: true}), (function () {
        var m = module(current_module);
        return(map(function (x) {
          return(splice(imported(x)));
        }, m.import));
      })()));
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
  var _g130 = {};
  nexus.compiler = _g130;
  _g130["compiler-output"] = compiler_output;
  _g130["in-module"] = in_module;
  _g130.prologue = prologue;
  _g130["%compile-module"] = _37compile_module;
  _g130["infix?"] = infix63;
  _g130["compile-special"] = compile_special;
  _g130.run = run;
  _g130["compile-file"] = compile_file;
  _g130.encapsulate = encapsulate;
  _g130["module-path"] = module_path;
  _g130["can-return?"] = can_return63;
  _g130["compile-infix"] = compile_infix;
  _g130.terminator = terminator;
  _g130["load-module"] = load_module;
  _g130["compile-args"] = compile_args;
  _g130.getop = getop;
  _g130.infix = infix;
  _g130.eval = eval;
  _g130["compile-module"] = compile_module;
  _g130["open-module"] = open_module;
  _g130.compile = compile;
  _g130["compile-function"] = compile_function;
  _g130["compile-call"] = compile_call;
  _g130["compile-body"] = compile_body;
  _g130["compile-atom"] = compile_atom;
  _g130["compile-branch"] = compile_branch;
})();
(function () {
  var _g133 = nexus.runtime;
  var inner = _g133.inner;
  var find = _g133.find;
  var add = _g133.add;
  var number63 = _g133["number?"];
  var composite63 = _g133["composite?"];
  var parse_number = _g133["parse-number"];
  var map = _g133.map;
  var cat = _g133.cat;
  var write = _g133.write;
  var reverse = _g133.reverse;
  var string_literal63 = _g133["string-literal?"];
  var to_string = _g133["to-string"];
  var iterate = _g133.iterate;
  var empty63 = _g133["empty?"];
  var keep = _g133.keep;
  var id_literal63 = _g133["id-literal?"];
  var char = _g133.char;
  var substring = _g133.substring;
  var stash = _g133.stash;
  var code = _g133.code;
  var pairwise = _g133.pairwise;
  var read_file = _g133["read-file"];
  var last = _g133.last;
  var reduce = _g133.reduce;
  var boolean63 = _g133["boolean?"];
  var apply = _g133.apply;
  var _62 = _g133[">"];
  var exclude = _g133.exclude;
  var _6061 = _g133["<="];
  var nil63 = _g133["nil?"];
  var _6261 = _g133[">="];
  var _37message_handler = _g133["%message-handler"];
  var keys63 = _g133["keys?"];
  var length = _g133.length;
  var _43 = _g133["+"];
  var _42 = _g133["*"];
  var _ = _g133["-"];
  var string63 = _g133["string?"];
  var _47 = _g133["/"];
  var extend = _g133.extend;
  var exit = _g133.exit;
  var sublist = _g133.sublist;
  var search = _g133.search;
  var _60 = _g133["<"];
  var _37 = _g133["%"];
  var hd = _g133.hd;
  var unstash = _g133.unstash;
  var some63 = _g133["some?"];
  var list63 = _g133["list?"];
  var join = _g133.join;
  var drop = _g133.drop;
  var make_id = _g133["make-id"];
  var table63 = _g133["table?"];
  var tl = _g133.tl;
  var setenv = _g133.setenv;
  var split = _g133.split;
  var sub = _g133.sub;
  var _61 = _g133["="];
  var function63 = _g133["function?"];
  var splice = _g133.splice;
  var is63 = _g133["is?"];
  var write_file = _g133["write-file"];
  var atom63 = _g133["atom?"];
  var replicate = _g133.replicate;
  var _g134 = nexus.utilities;
  var macroexpand = _g134.macroexpand;
  var bind = _g134.bind;
  var variable63 = _g134["variable?"];
  var exported = _g134.exported;
  var to_id = _g134["to-id"];
  var quote_modules = _g134["quote-modules"];
  var module = _g134.module;
  var quasiexpand = _g134.quasiexpand;
  var bind42 = _g134["bind*"];
  var special63 = _g134["special?"];
  var quoted = _g134.quoted;
  var bound63 = _g134["bound?"];
  var special_form63 = _g134["special-form?"];
  var quote_environment = _g134["quote-environment"];
  var getenv = _g134.getenv;
  var mapo = _g134.mapo;
  var stash42 = _g134["stash*"];
  var valid_id63 = _g134["valid-id?"];
  var imported = _g134.imported;
  var macro_function = _g134["macro-function"];
  var module_key = _g134["module-key"];
  var toplevel63 = _g134["toplevel?"];
  var macro63 = _g134["macro?"];
  var symbol_expansion = _g134["symbol-expansion"];
  var initial_environment = _g134["initial-environment"];
  var symbol63 = _g134["symbol?"];
  var indentation = _g134.indentation;
  var _g137 = nexus.compiler;
  var compile_function = _g137["compile-function"];
  var eval = _g137.eval;
  var compile_call = _g137["compile-call"];
  var compile_body = _g137["compile-body"];
  var compile = _g137.compile;
  var open_module = _g137["open-module"];
  var compile_branch = _g137["compile-branch"];
  var compile_module = _g137["compile-module"];
  var load_module = _g137["load-module"];
  var compile_special = _g137["compile-special"];
  var in_module = _g137["in-module"];
})();
(function () {
  var _g324 = nexus.runtime;
  var inner = _g324.inner;
  var find = _g324.find;
  var add = _g324.add;
  var number63 = _g324["number?"];
  var composite63 = _g324["composite?"];
  var parse_number = _g324["parse-number"];
  var map = _g324.map;
  var cat = _g324.cat;
  var write = _g324.write;
  var reverse = _g324.reverse;
  var string_literal63 = _g324["string-literal?"];
  var to_string = _g324["to-string"];
  var iterate = _g324.iterate;
  var empty63 = _g324["empty?"];
  var keep = _g324.keep;
  var id_literal63 = _g324["id-literal?"];
  var char = _g324.char;
  var substring = _g324.substring;
  var stash = _g324.stash;
  var code = _g324.code;
  var pairwise = _g324.pairwise;
  var read_file = _g324["read-file"];
  var last = _g324.last;
  var reduce = _g324.reduce;
  var boolean63 = _g324["boolean?"];
  var apply = _g324.apply;
  var _62 = _g324[">"];
  var exclude = _g324.exclude;
  var _6061 = _g324["<="];
  var nil63 = _g324["nil?"];
  var _6261 = _g324[">="];
  var _37message_handler = _g324["%message-handler"];
  var keys63 = _g324["keys?"];
  var length = _g324.length;
  var _43 = _g324["+"];
  var _42 = _g324["*"];
  var _ = _g324["-"];
  var string63 = _g324["string?"];
  var _47 = _g324["/"];
  var extend = _g324.extend;
  var exit = _g324.exit;
  var sublist = _g324.sublist;
  var search = _g324.search;
  var _60 = _g324["<"];
  var _37 = _g324["%"];
  var hd = _g324.hd;
  var unstash = _g324.unstash;
  var some63 = _g324["some?"];
  var list63 = _g324["list?"];
  var join = _g324.join;
  var drop = _g324.drop;
  var make_id = _g324["make-id"];
  var table63 = _g324["table?"];
  var tl = _g324.tl;
  var setenv = _g324.setenv;
  var split = _g324.split;
  var sub = _g324.sub;
  var _61 = _g324["="];
  var function63 = _g324["function?"];
  var splice = _g324.splice;
  var is63 = _g324["is?"];
  var write_file = _g324["write-file"];
  var atom63 = _g324["atom?"];
  var replicate = _g324.replicate;
  var _g325 = nexus.utilities;
  var macroexpand = _g325.macroexpand;
  var bind = _g325.bind;
  var variable63 = _g325["variable?"];
  var exported = _g325.exported;
  var to_id = _g325["to-id"];
  var quote_modules = _g325["quote-modules"];
  var module = _g325.module;
  var quasiexpand = _g325.quasiexpand;
  var bind42 = _g325["bind*"];
  var special63 = _g325["special?"];
  var quoted = _g325.quoted;
  var bound63 = _g325["bound?"];
  var special_form63 = _g325["special-form?"];
  var quote_environment = _g325["quote-environment"];
  var getenv = _g325.getenv;
  var mapo = _g325.mapo;
  var stash42 = _g325["stash*"];
  var valid_id63 = _g325["valid-id?"];
  var imported = _g325.imported;
  var macro_function = _g325["macro-function"];
  var module_key = _g325["module-key"];
  var toplevel63 = _g325["toplevel?"];
  var macro63 = _g325["macro?"];
  var symbol_expansion = _g325["symbol-expansion"];
  var initial_environment = _g325["initial-environment"];
  var symbol63 = _g325["symbol?"];
  var indentation = _g325.indentation;
  var _g328 = nexus.compiler;
  var compile_function = _g328["compile-function"];
  var eval = _g328.eval;
  var compile_call = _g328["compile-call"];
  var compile_body = _g328["compile-body"];
  var compile = _g328.compile;
  var open_module = _g328["open-module"];
  var compile_branch = _g328["compile-branch"];
  var compile_module = _g328["compile-module"];
  var load_module = _g328["load-module"];
  var compile_special = _g328["compile-special"];
  var in_module = _g328["in-module"];
  global.target = "js";
})();
(function () {
  var _g605 = nexus.runtime;
  var inner = _g605.inner;
  var find = _g605.find;
  var add = _g605.add;
  var number63 = _g605["number?"];
  var composite63 = _g605["composite?"];
  var parse_number = _g605["parse-number"];
  var map = _g605.map;
  var cat = _g605.cat;
  var write = _g605.write;
  var reverse = _g605.reverse;
  var string_literal63 = _g605["string-literal?"];
  var to_string = _g605["to-string"];
  var iterate = _g605.iterate;
  var empty63 = _g605["empty?"];
  var keep = _g605.keep;
  var id_literal63 = _g605["id-literal?"];
  var char = _g605.char;
  var substring = _g605.substring;
  var stash = _g605.stash;
  var code = _g605.code;
  var pairwise = _g605.pairwise;
  var read_file = _g605["read-file"];
  var last = _g605.last;
  var reduce = _g605.reduce;
  var boolean63 = _g605["boolean?"];
  var apply = _g605.apply;
  var _62 = _g605[">"];
  var exclude = _g605.exclude;
  var _6061 = _g605["<="];
  var nil63 = _g605["nil?"];
  var _6261 = _g605[">="];
  var _37message_handler = _g605["%message-handler"];
  var keys63 = _g605["keys?"];
  var length = _g605.length;
  var _43 = _g605["+"];
  var _42 = _g605["*"];
  var _ = _g605["-"];
  var string63 = _g605["string?"];
  var _47 = _g605["/"];
  var extend = _g605.extend;
  var exit = _g605.exit;
  var sublist = _g605.sublist;
  var search = _g605.search;
  var _60 = _g605["<"];
  var _37 = _g605["%"];
  var hd = _g605.hd;
  var unstash = _g605.unstash;
  var some63 = _g605["some?"];
  var list63 = _g605["list?"];
  var join = _g605.join;
  var drop = _g605.drop;
  var make_id = _g605["make-id"];
  var table63 = _g605["table?"];
  var tl = _g605.tl;
  var setenv = _g605.setenv;
  var split = _g605.split;
  var sub = _g605.sub;
  var _61 = _g605["="];
  var function63 = _g605["function?"];
  var splice = _g605.splice;
  var is63 = _g605["is?"];
  var write_file = _g605["write-file"];
  var atom63 = _g605["atom?"];
  var replicate = _g605.replicate;
  var _g606 = nexus.utilities;
  var macroexpand = _g606.macroexpand;
  var bind = _g606.bind;
  var variable63 = _g606["variable?"];
  var exported = _g606.exported;
  var to_id = _g606["to-id"];
  var quote_modules = _g606["quote-modules"];
  var module = _g606.module;
  var quasiexpand = _g606.quasiexpand;
  var bind42 = _g606["bind*"];
  var special63 = _g606["special?"];
  var quoted = _g606.quoted;
  var bound63 = _g606["bound?"];
  var special_form63 = _g606["special-form?"];
  var quote_environment = _g606["quote-environment"];
  var getenv = _g606.getenv;
  var mapo = _g606.mapo;
  var stash42 = _g606["stash*"];
  var valid_id63 = _g606["valid-id?"];
  var imported = _g606.imported;
  var macro_function = _g606["macro-function"];
  var module_key = _g606["module-key"];
  var toplevel63 = _g606["toplevel?"];
  var macro63 = _g606["macro?"];
  var symbol_expansion = _g606["symbol-expansion"];
  var initial_environment = _g606["initial-environment"];
  var symbol63 = _g606["symbol?"];
  var indentation = _g606.indentation;
  var _g609 = nexus.compiler;
  var compile_function = _g609["compile-function"];
  var eval = _g609.eval;
  var compile_call = _g609["compile-call"];
  var compile_body = _g609["compile-body"];
  var compile = _g609.compile;
  var open_module = _g609["open-module"];
  var compile_branch = _g609["compile-branch"];
  var compile_module = _g609["compile-module"];
  var load_module = _g609["load-module"];
  var compile_special = _g609["compile-special"];
  var in_module = _g609["in-module"];
  global.modules = {core: {export: {list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g622 = body;
      var k = undefined;
      for (k in _g622) {
        if (isNaN(parseInt(k))) {
          var v = _g622[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g623 = sub(body, 0);
    var _g624 = bind42(args, _g623);
    var _g625 = _g624[0];
    var _g626 = _g624[1];
    return(join(["%function", _g625], _g626));
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g627 = sub(body, 0);
    var form = join(["fn", args], _g627);
    var keys = sub(_g627, length(_g627));
    eval(join((function () {
      var _g628 = ["setenv", join(["quote", name])];
      _g628.form = join(["quote", form]);
      _g628.special = form;
      return(_g628);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g629 = sub(body, 0);
    var imports = [];
    var exp = _g629.export;
    var imp = _g629.import;
    var _g630 = (imp || []);
    var _g631 = 0;
    while ((_g631 < length(_g630))) {
      var k = _g630[_g631];
      load_module(k);
      imports = join(imports, imported(k));
      _g631 = (_g631 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g632 = (exp || []);
    var _g633 = 0;
    while ((_g633 < length(_g632))) {
      var k = _g632[_g633];
      setenv(k, {_stash: true, export: true});
      _g633 = (_g633 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g634 = xs;
      var i = 0;
      while ((i < length(_g634))) {
        var x = _g634[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
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
  }, module: "core", export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g638 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g638), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g639 = ["target"];
          _g639.lua = join(["not", join(["number?", k])]);
          _g639.js = join(["isNaN", join(["parseInt", k])]);
          return(_g639);
        })()), join(["let", join([v, join(["get", t1, k])])], _g638)])])]));
      }
    })()]));
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g640 = elements;
    var _g641 = 0;
    while ((_g641 < length(_g640))) {
      var e = _g640[_g641];
      l[e] = true;
      _g641 = (_g641 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g642 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g642)]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g643 = sub(body, 0);
    add(environment, {});
    var _g644 = (function () {
      map(function (_g645) {
        var name = _g645[0];
        var exp = _g645[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g643)));
    })();
    drop(environment);
    return(_g644);
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g646 = sub(body, 0);
    var form = join(["fn", args], _g646);
    eval(join((function () {
      var _g647 = ["setenv", join(["quote", name])];
      _g647.macro = form;
      _g647.form = join(["quote", form]);
      return(_g647);
    })()));
    return(undefined);
  }, module: "core", export: true}, "with-bindings": {macro: function (_g648) {
    var names = _g648[0];
    var body = unstash(sublist(arguments, 1));
    var _g649 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g650 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g651 = ["setenv", x];
        _g651.variable = true;
        return(_g651);
      })())])];
      _g650.scope = true;
      return(_g650);
    })(), _g649));
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g652 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g652))) {
      var _g653 = bind42(x, _g652);
      var args = _g653[0];
      var _g654 = _g653[1];
      return(join(["%local-function", name, args], _g654));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g655 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g656 = ["table"];
      _g656._scope = scope;
      return(_g656);
    })())]), join(["let", join([x, join(["do"], _g655)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g657 = sub(body, 0);
    add(environment, {});
    var _g658 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g657)));
    })();
    drop(environment);
    return(_g658);
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g659 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g659)]));
  }, module: "core", export: true}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", global: true, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g323, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g660 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g661) {
      var lh = _g661[0];
      var rh = _g661[1];
      var _g662 = bind(lh, rh);
      var _g663 = 0;
      while ((_g663 < length(_g662))) {
        var _g664 = _g662[_g663];
        var id = _g664[0];
        var val = _g664[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g663 = (_g663 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g660)])));
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g665 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g665)]));
  }, module: "core", export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, runtime: {export: {inner: {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, "splice?": {variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, mapl: {variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, "id-count": {variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, type: {variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, print: {export: true, global: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, fs: {variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}}, import: ["special", "core"]}, lib: {export: {}, import: ["core", "special"]}, system: {export: {nexus: {export: true, global: true, module: "system"}}, import: ["special", "core"]}, compiler: {export: {"compiler-output": {variable: true, module: "compiler"}, "current-module": {export: true, global: true, module: "compiler"}, encapsulate: {variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, prologue: {variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, "compile-atom": {variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, "%compile-module": {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, "can-return?": {variable: true, module: "compiler"}, "open-module": {export: true, variable: true, module: "compiler"}, "compile-infix": {variable: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, infix: {variable: true, module: "compiler"}, "compile-module": {export: true, variable: true, module: "compiler"}, "module-path": {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, "compilation-level": {export: true, global: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}, "compile-only": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g666 = sub(body, 0);
    if (compiling63) {
      return(join(["do"], _g666));
    }
  }, export: true, module: "compiler"}, terminator: {variable: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, run: {variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, "compiling?": {export: true, global: true, module: "compiler"}}, import: ["runtime", "utilities", "special", "core", "reader"]}, special: {export: {"error": {module: "special", special: function (_g667) {
    var x = _g667[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(join(["Error", x]))));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true, stmt: true}, "if": {tr: true, special: function (form, tail63) {
    var str = "";
    var _g668 = form;
    var i = 0;
    while ((i < length(_g668))) {
      var condition = _g668[i];
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
  }, stmt: true, export: true, module: "special"}, "%array": {special: function (forms) {
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
    var _g669 = forms;
    var i = 0;
    while ((i < length(_g669))) {
      var x = _g669[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "return": {module: "special", special: function (_g670) {
    var x = _g670[0];
    var _g671 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g671));
  }, export: true, stmt: true}, "%for": {tr: true, special: function (_g672) {
    var _g673 = _g672[0];
    var t = _g673[0];
    var k = _g673[1];
    var body = sub(_g672, 1);
    var _g674 = compile(t);
    var ind = indentation();
    var _g675 = (function () {
      indent_level = (indent_level + 1);
      var _g676 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g676);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g674 + " do\n" + _g675 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g674 + ") {\n" + _g675 + ind + "}\n"));
    }
  }, stmt: true, export: true, module: "special"}, "%function": {special: function (_g677) {
    var args = _g677[0];
    var body = sub(_g677, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "%try": {tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g678 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g678);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g679 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g679);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true, export: true, module: "special"}, "%local-function": {tr: true, special: function (_g680) {
    var name = _g680[0];
    var args = _g680[1];
    var body = sub(_g680, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, stmt: true, export: true, module: "special"}, "not": {special: function (_g681) {
    var x = _g681[0];
    var _g682 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g682 + ")"));
  }, module: "special", export: true}, "get": {special: function (_g683) {
    var t = _g683[0];
    var k = _g683[1];
    var _g684 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g684, 0) === "{"))) {
      _g684 = ("(" + _g684 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g684 + "." + inner(k)));
    } else {
      return((_g684 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "%local": {module: "special", special: function (_g685) {
    var name = _g685[0];
    var value = _g685[1];
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
  }, export: true, stmt: true}, "%object": {special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g686 = pairs;
    var i = 0;
    while ((i < length(_g686))) {
      var _g687 = _g686[i];
      var k = _g687[0];
      var v = _g687[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g688 = compile(v);
      var _g689 = (function () {
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
      str = (str + _g689 + sep + _g688);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "while": {tr: true, special: function (_g690) {
    var condition = _g690[0];
    var body = sub(_g690, 1);
    var _g691 = compile(condition);
    var _g692 = (function () {
      indent_level = (indent_level + 1);
      var _g693 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g693);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g691 + ") {\n" + _g692 + ind + "}\n"));
    } else {
      return((ind + "while " + _g691 + " do\n" + _g692 + ind + "end\n"));
    }
  }, stmt: true, export: true, module: "special"}, "%global-function": {tr: true, special: function (_g694) {
    var name = _g694[0];
    var args = _g694[1];
    var body = sub(_g694, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, stmt: true, export: true, module: "special"}, "set": {module: "special", special: function (_g695) {
    var lh = _g695[0];
    var rh = _g695[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, stmt: true}, "do": {tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, stmt: true, export: true, module: "special"}, "break": {module: "special", special: function (_g132) {
    return((indentation() + "break"));
  }, export: true, stmt: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, utilities: {export: {macroexpand: {export: true, variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, escape: {variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, module: {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "quote-frame": {variable: true, module: "utilities"}, "numeric?": {variable: true, module: "utilities"}, "quote-module": {variable: true, module: "utilities"}, "bind*": {export: true, variable: true, module: "utilities"}, "valid-char?": {variable: true, module: "utilities"}, "quasiquote-list": {variable: true, module: "utilities"}, "global?": {variable: true, module: "utilities"}, "quoting?": {variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, "quasiquoting?": {variable: true, module: "utilities"}, mapo: {export: true, variable: true, module: "utilities"}, "quasisplice?": {variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, export: true, module: "utilities"}, "can-unquote?": {variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "toplevel?": {export: true, variable: true, module: "utilities"}, reserved: {variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, indentation: {export: true, variable: true, module: "utilities"}, "quote-binding": {variable: true, module: "utilities"}}, import: ["runtime", "special", "core"]}, reader: {export: {"skip-non-code": {variable: true, module: "reader"}, eof: {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, "define-reader": {macro: function (_g696) {
    var char = _g696[0];
    var stream = _g696[1];
    var body = unstash(sublist(arguments, 1));
    var _g697 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g697)]));
  }, export: true, module: "reader"}, "flag?": {variable: true, module: "reader"}, whitespace: {variable: true, module: "reader"}, "read-char": {variable: true, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "read-table": {export: true, variable: true, module: "reader"}, read: {export: true, variable: true, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, delimiters: {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}}, import: ["runtime", "special", "core"]}, boot: {export: {}, import: ["runtime", "utilities", "special", "core", "compiler"]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g698 = sub(body, 0);
    var imports = [];
    var exp = _g698.export;
    var imp = _g698.import;
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
  }, module: "core", export: true}}];
})();
(function () {
  var _g39 = nexus.runtime;
  var inner = _g39.inner;
  var find = _g39.find;
  var add = _g39.add;
  var number63 = _g39["number?"];
  var composite63 = _g39["composite?"];
  var parse_number = _g39["parse-number"];
  var map = _g39.map;
  var cat = _g39.cat;
  var write = _g39.write;
  var reverse = _g39.reverse;
  var string_literal63 = _g39["string-literal?"];
  var to_string = _g39["to-string"];
  var iterate = _g39.iterate;
  var empty63 = _g39["empty?"];
  var keep = _g39.keep;
  var id_literal63 = _g39["id-literal?"];
  var char = _g39.char;
  var substring = _g39.substring;
  var stash = _g39.stash;
  var code = _g39.code;
  var pairwise = _g39.pairwise;
  var read_file = _g39["read-file"];
  var last = _g39.last;
  var reduce = _g39.reduce;
  var boolean63 = _g39["boolean?"];
  var apply = _g39.apply;
  var _62 = _g39[">"];
  var exclude = _g39.exclude;
  var _6061 = _g39["<="];
  var nil63 = _g39["nil?"];
  var _6261 = _g39[">="];
  var _37message_handler = _g39["%message-handler"];
  var keys63 = _g39["keys?"];
  var length = _g39.length;
  var _43 = _g39["+"];
  var _42 = _g39["*"];
  var _ = _g39["-"];
  var string63 = _g39["string?"];
  var _47 = _g39["/"];
  var extend = _g39.extend;
  var exit = _g39.exit;
  var sublist = _g39.sublist;
  var search = _g39.search;
  var _60 = _g39["<"];
  var _37 = _g39["%"];
  var hd = _g39.hd;
  var unstash = _g39.unstash;
  var some63 = _g39["some?"];
  var list63 = _g39["list?"];
  var join = _g39.join;
  var drop = _g39.drop;
  var make_id = _g39["make-id"];
  var table63 = _g39["table?"];
  var tl = _g39.tl;
  var setenv = _g39.setenv;
  var split = _g39.split;
  var sub = _g39.sub;
  var _61 = _g39["="];
  var function63 = _g39["function?"];
  var splice = _g39.splice;
  var is63 = _g39["is?"];
  var write_file = _g39["write-file"];
  var atom63 = _g39["atom?"];
  var replicate = _g39.replicate;
  var _g81 = nexus.utilities;
  var macroexpand = _g81.macroexpand;
  var bind = _g81.bind;
  var variable63 = _g81["variable?"];
  var exported = _g81.exported;
  var to_id = _g81["to-id"];
  var quote_modules = _g81["quote-modules"];
  var module = _g81.module;
  var quasiexpand = _g81.quasiexpand;
  var bind42 = _g81["bind*"];
  var special63 = _g81["special?"];
  var quoted = _g81.quoted;
  var bound63 = _g81["bound?"];
  var special_form63 = _g81["special-form?"];
  var quote_environment = _g81["quote-environment"];
  var getenv = _g81.getenv;
  var mapo = _g81.mapo;
  var stash42 = _g81["stash*"];
  var valid_id63 = _g81["valid-id?"];
  var imported = _g81.imported;
  var macro_function = _g81["macro-function"];
  var module_key = _g81["module-key"];
  var toplevel63 = _g81["toplevel?"];
  var macro63 = _g81["macro?"];
  var symbol_expansion = _g81["symbol-expansion"];
  var initial_environment = _g81["initial-environment"];
  var symbol63 = _g81["symbol?"];
  var indentation = _g81.indentation;
  var _g94 = nexus.reader;
  var make_stream = _g94["make-stream"];
  var read_table = _g94["read-table"];
  var read = _g94.read;
  var read_from_string = _g94["read-from-string"];
  var read_all = _g94["read-all"];
  var _g131 = nexus.compiler;
  var compile_function = _g131["compile-function"];
  var eval = _g131.eval;
  var compile_call = _g131["compile-call"];
  var compile_body = _g131["compile-body"];
  var compile = _g131.compile;
  var open_module = _g131["open-module"];
  var compile_branch = _g131["compile-branch"];
  var compile_module = _g131["compile-module"];
  var load_module = _g131["load-module"];
  var compile_special = _g131["compile-special"];
  var in_module = _g131["in-module"];
  function rep(str) {
    var _g705 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g708) {
        return([false, _g708.message]);
      }
    })();
    var _g1 = _g705[0];
    var x = _g705[1];
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
    var _g706 = args;
    var i = 0;
    while ((i < length(_g706))) {
      var arg = _g706[i];
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
  var _g707 = {};
  nexus.main = _g707;
  _g707.rep = rep;
  _g707.main = main;
  _g707.usage = usage;
  _g707.repl = repl;
})();
