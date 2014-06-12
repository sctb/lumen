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
      } else if (is63(_g32)) {
        add(l1, _g32);
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
        } else if (is63(x)) {
          l[k] = x;
        }
      }
    }
    return(l);
  }
  function keys63(t) {
    var k = undefined;
    var _g34 = t;
    var k1 = undefined;
    for (k1 in _g34) {
      if (isNaN(parseInt(k1))) {
        var v = _g34[k1];
        k = k1;
        break;
      }
    }
    return(k);
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
    if (empty63(args)) {
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
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g37 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g38 = _g37;
      var k1 = undefined;
      for (k1 in _g38) {
        if (isNaN(parseInt(k1))) {
          var v = _g38[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g39 = sub(xs, 0);
    return(join(t, _g39));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g40 = sub(keys, 0);
    var t1 = sublist(t);
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
        if (!(_g40[k])) {
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
    var _g42 = sub(xs, 0);
    if (empty63(_g42)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g42));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g43));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g44)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g45));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g46)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g47)));
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
    } else if (boolean63(x)) {
      if (x) {
        return("true");
      } else {
        return("false");
      }
    } else if (function63(x)) {
      return("<function>");
    } else if (atom63(x)) {
      return((x + ""));
    } else {
      var str = "(";
      var x1 = sub(x);
      var _g48 = x;
      var k = undefined;
      for (k in _g48) {
        if (isNaN(parseInt(k))) {
          var v = _g48[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var _g49 = x1;
      var i = 0;
      while ((i < length(_g49))) {
        var y = _g49[i];
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
    var _g50 = stash(args);
    return((f.apply)(f, _g50));
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
  var _g51 = {};
  nexus.runtime = _g51;
  _g51["nil?"] = nil63;
  _g51["is?"] = is63;
  _g51.length = length;
  _g51["empty?"] = empty63;
  _g51["some?"] = some63;
  _g51.hd = hd;
  _g51["string?"] = string63;
  _g51["number?"] = number63;
  _g51["boolean?"] = boolean63;
  _g51["function?"] = function63;
  _g51["composite?"] = composite63;
  _g51["atom?"] = atom63;
  _g51["table?"] = table63;
  _g51["list?"] = list63;
  _g51.substring = substring;
  _g51.sublist = sublist;
  _g51.sub = sub;
  _g51.inner = inner;
  _g51.tl = tl;
  _g51.char = char;
  _g51.code = code;
  _g51["string-literal?"] = string_literal63;
  _g51["id-literal?"] = id_literal63;
  _g51.add = add;
  _g51.drop = drop;
  _g51.last = last;
  _g51.reverse = reverse;
  _g51.join = join;
  _g51.reduce = reduce;
  _g51.keep = keep;
  _g51.find = find;
  _g51.pairwise = pairwise;
  _g51.iterate = iterate;
  _g51.replicate = replicate;
  _g51.splice = splice;
  _g51.map = map;
  _g51["keys?"] = keys63;
  _g51.stash = stash;
  _g51.unstash = unstash;
  _g51.setenv = setenv;
  _g51.extend = extend;
  _g51.exclude = exclude;
  _g51.search = search;
  _g51.split = split;
  _g51.cat = cat;
  _g51["+"] = _43;
  _g51["-"] = _;
  _g51["*"] = _42;
  _g51["/"] = _47;
  _g51["%"] = _37;
  _g51[">"] = _62;
  _g51["<"] = _60;
  _g51["="] = _61;
  _g51[">="] = _6261;
  _g51["<="] = _6061;
  _g51["read-file"] = read_file;
  _g51["write-file"] = write_file;
  _g51.write = write;
  _g51.exit = exit;
  _g51["parse-number"] = parse_number;
  _g51["to-string"] = to_string;
  _g51.apply = apply;
  _g51["make-id"] = make_id;
  _g51["%message-handler"] = _37message_handler;
  _g51.type = type;
  _g51["splice?"] = splice63;
  _g51.mapl = mapl;
  _g51.fs = fs;
  _g51["id-count"] = id_count;
})();
(function () {
  var _g56 = nexus.runtime;
  var nil63 = _g56["nil?"];
  var is63 = _g56["is?"];
  var length = _g56.length;
  var empty63 = _g56["empty?"];
  var some63 = _g56["some?"];
  var hd = _g56.hd;
  var string63 = _g56["string?"];
  var number63 = _g56["number?"];
  var boolean63 = _g56["boolean?"];
  var function63 = _g56["function?"];
  var composite63 = _g56["composite?"];
  var atom63 = _g56["atom?"];
  var table63 = _g56["table?"];
  var list63 = _g56["list?"];
  var substring = _g56.substring;
  var sublist = _g56.sublist;
  var sub = _g56.sub;
  var inner = _g56.inner;
  var tl = _g56.tl;
  var char = _g56.char;
  var code = _g56.code;
  var string_literal63 = _g56["string-literal?"];
  var id_literal63 = _g56["id-literal?"];
  var add = _g56.add;
  var drop = _g56.drop;
  var last = _g56.last;
  var reverse = _g56.reverse;
  var join = _g56.join;
  var reduce = _g56.reduce;
  var keep = _g56.keep;
  var find = _g56.find;
  var pairwise = _g56.pairwise;
  var iterate = _g56.iterate;
  var replicate = _g56.replicate;
  var splice = _g56.splice;
  var map = _g56.map;
  var keys63 = _g56["keys?"];
  var stash = _g56.stash;
  var unstash = _g56.unstash;
  var setenv = _g56.setenv;
  var extend = _g56.extend;
  var exclude = _g56.exclude;
  var search = _g56.search;
  var split = _g56.split;
  var cat = _g56.cat;
  var _43 = _g56["+"];
  var _ = _g56["-"];
  var _42 = _g56["*"];
  var _47 = _g56["/"];
  var _37 = _g56["%"];
  var _62 = _g56[">"];
  var _60 = _g56["<"];
  var _61 = _g56["="];
  var _6261 = _g56[">="];
  var _6061 = _g56["<="];
  var read_file = _g56["read-file"];
  var write_file = _g56["write-file"];
  var write = _g56.write;
  var exit = _g56.exit;
  var parse_number = _g56["parse-number"];
  var to_string = _g56["to-string"];
  var apply = _g56.apply;
  var make_id = _g56["make-id"];
  var _37message_handler = _g56["%message-handler"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g59 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g60 = keys63(_g59);
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
      var _g61 = args;
      var k = undefined;
      for (k in _g61) {
        if (isNaN(parseInt(k))) {
          var v = _g61[k];
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
      var _g62 = lh;
      var i = 0;
      while ((i < length(_g62))) {
        var x = _g62[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var _g63 = lh;
      var k = undefined;
      for (k in _g63) {
        if (isNaN(parseInt(k))) {
          var v = _g63[k];
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
      var _g64 = args;
      var _g65 = 0;
      while ((_g65 < length(_g64))) {
        var arg = _g64[_g65];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g65 = (_g65 + 1);
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
        var _g52 = form[0];
        var _g66 = form[1];
        var t = _g66[0];
        var k = _g66[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g53 = form[0];
        var args = form[1];
        var _g67 = sub(form, 2);
        add(environment, {_scope: true});
        var _g69 = (function () {
          var _g70 = args;
          var _g71 = 0;
          while ((_g71 < length(_g70))) {
            var _g68 = _g70[_g71];
            setenv(_g68, {_stash: true, variable: true});
            _g71 = (_g71 + 1);
          }
          return(join(["%function", map(macroexpand, args)], macroexpand(_g67)));
        })();
        drop(environment);
        return(_g69);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g54 = form[0];
        var name = form[1];
        var _g72 = form[2];
        var _g73 = sub(form, 3);
        add(environment, {_scope: true});
        var _g75 = (function () {
          var _g76 = _g72;
          var _g77 = 0;
          while ((_g77 < length(_g76))) {
            var _g74 = _g76[_g77];
            setenv(_g74, {_stash: true, variable: true});
            _g77 = (_g77 + 1);
          }
          return(join([x, name, map(macroexpand, _g72)], macroexpand(_g73)));
        })();
        drop(environment);
        return(_g75);
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
    var _g78 = form;
    var k = undefined;
    for (k in _g78) {
      if (isNaN(parseInt(k))) {
        var v = _g78[k];
        var _g79 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g79;
      }
    }
    var _g80 = form;
    var _g81 = 0;
    while ((_g81 < length(_g80))) {
      var x = _g80[_g81];
      if (quasisplice63(x, depth)) {
        var _g82 = quasiexpand(x[1]);
        add(xs, _g82);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g81 = (_g81 + 1);
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
    var _g87 = hd(environment);
    var n = undefined;
    for (n in _g87) {
      if (isNaN(parseInt(n))) {
        var b = _g87[n];
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
    var _g88 = unstash(sublist(arguments, 1));
    var all = _g88.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g89 = module(spec).export;
      var n = undefined;
      for (n in _g89) {
        if (isNaN(parseInt(n))) {
          var b = _g89[n];
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
    var _g90 = t;
    var k = undefined;
    for (k in _g90) {
      if (isNaN(parseInt(k))) {
        var v = _g90[k];
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
    return(join((function () {
      var _g91 = ["table"];
      _g91.import = quoted(m.import);
      _g91.export = quote_frame(m.export);
      return(_g91);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g92 = {};
  nexus.utilities = _g92;
  _g92.getenv = getenv;
  _g92["macro-function"] = macro_function;
  _g92["macro?"] = macro63;
  _g92["special?"] = special63;
  _g92["special-form?"] = special_form63;
  _g92["symbol-expansion"] = symbol_expansion;
  _g92["symbol?"] = symbol63;
  _g92["variable?"] = variable63;
  _g92["bound?"] = bound63;
  _g92["toplevel?"] = toplevel63;
  _g92.quoted = quoted;
  _g92["stash*"] = stash42;
  _g92.bind = bind;
  _g92["bind*"] = bind42;
  _g92.quasiexpand = quasiexpand;
  _g92.macroexpand = macroexpand;
  _g92.indentation = indentation;
  _g92["valid-id?"] = valid_id63;
  _g92["to-id"] = to_id;
  _g92["module-key"] = module_key;
  _g92.module = module;
  _g92.imported = imported;
  _g92.exported = exported;
  _g92.mapo = mapo;
  _g92["quote-environment"] = quote_environment;
  _g92["quote-modules"] = quote_modules;
  _g92["initial-environment"] = initial_environment;
  _g92["global?"] = global63;
  _g92.escape = escape;
  _g92["quoting?"] = quoting63;
  _g92["quasiquoting?"] = quasiquoting63;
  _g92["can-unquote?"] = can_unquote63;
  _g92["quasisplice?"] = quasisplice63;
  _g92["quasiquote-list"] = quasiquote_list;
  _g92.reserved = reserved;
  _g92["numeric?"] = numeric63;
  _g92["valid-char?"] = valid_char63;
  _g92["quote-binding"] = quote_binding;
  _g92["quote-frame"] = quote_frame;
  _g92["quote-module"] = quote_module;
})();
(function () {
  var _g93 = nexus.runtime;
  var nil63 = _g93["nil?"];
  var is63 = _g93["is?"];
  var length = _g93.length;
  var empty63 = _g93["empty?"];
  var some63 = _g93["some?"];
  var hd = _g93.hd;
  var string63 = _g93["string?"];
  var number63 = _g93["number?"];
  var boolean63 = _g93["boolean?"];
  var function63 = _g93["function?"];
  var composite63 = _g93["composite?"];
  var atom63 = _g93["atom?"];
  var table63 = _g93["table?"];
  var list63 = _g93["list?"];
  var substring = _g93.substring;
  var sublist = _g93.sublist;
  var sub = _g93.sub;
  var inner = _g93.inner;
  var tl = _g93.tl;
  var char = _g93.char;
  var code = _g93.code;
  var string_literal63 = _g93["string-literal?"];
  var id_literal63 = _g93["id-literal?"];
  var add = _g93.add;
  var drop = _g93.drop;
  var last = _g93.last;
  var reverse = _g93.reverse;
  var join = _g93.join;
  var reduce = _g93.reduce;
  var keep = _g93.keep;
  var find = _g93.find;
  var pairwise = _g93.pairwise;
  var iterate = _g93.iterate;
  var replicate = _g93.replicate;
  var splice = _g93.splice;
  var map = _g93.map;
  var keys63 = _g93["keys?"];
  var stash = _g93.stash;
  var unstash = _g93.unstash;
  var setenv = _g93.setenv;
  var extend = _g93.extend;
  var exclude = _g93.exclude;
  var search = _g93.search;
  var split = _g93.split;
  var cat = _g93.cat;
  var _43 = _g93["+"];
  var _ = _g93["-"];
  var _42 = _g93["*"];
  var _47 = _g93["/"];
  var _37 = _g93["%"];
  var _62 = _g93[">"];
  var _60 = _g93["<"];
  var _61 = _g93["="];
  var _6261 = _g93[">="];
  var _6061 = _g93["<="];
  var read_file = _g93["read-file"];
  var write_file = _g93["write-file"];
  var write = _g93.write;
  var exit = _g93.exit;
  var parse_number = _g93["parse-number"];
  var to_string = _g93["to-string"];
  var apply = _g93.apply;
  var make_id = _g93["make-id"];
  var _37message_handler = _g93["%message-handler"];
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
  var _g104 = {};
  nexus.reader = _g104;
  _g104["make-stream"] = make_stream;
  _g104["read-table"] = read_table;
  _g104.read = read;
  _g104["read-all"] = read_all;
  _g104["read-from-string"] = read_from_string;
  _g104.delimiters = delimiters;
  _g104.whitespace = whitespace;
  _g104["peek-char"] = peek_char;
  _g104["read-char"] = read_char;
  _g104["skip-non-code"] = skip_non_code;
  _g104.eof = eof;
  _g104["key?"] = key63;
  _g104["flag?"] = flag63;
})();
(function () {
  var _g105 = nexus.runtime;
  var nil63 = _g105["nil?"];
  var is63 = _g105["is?"];
  var length = _g105.length;
  var empty63 = _g105["empty?"];
  var some63 = _g105["some?"];
  var hd = _g105.hd;
  var string63 = _g105["string?"];
  var number63 = _g105["number?"];
  var boolean63 = _g105["boolean?"];
  var function63 = _g105["function?"];
  var composite63 = _g105["composite?"];
  var atom63 = _g105["atom?"];
  var table63 = _g105["table?"];
  var list63 = _g105["list?"];
  var substring = _g105.substring;
  var sublist = _g105.sublist;
  var sub = _g105.sub;
  var inner = _g105.inner;
  var tl = _g105.tl;
  var char = _g105.char;
  var code = _g105.code;
  var string_literal63 = _g105["string-literal?"];
  var id_literal63 = _g105["id-literal?"];
  var add = _g105.add;
  var drop = _g105.drop;
  var last = _g105.last;
  var reverse = _g105.reverse;
  var join = _g105.join;
  var reduce = _g105.reduce;
  var keep = _g105.keep;
  var find = _g105.find;
  var pairwise = _g105.pairwise;
  var iterate = _g105.iterate;
  var replicate = _g105.replicate;
  var splice = _g105.splice;
  var map = _g105.map;
  var keys63 = _g105["keys?"];
  var stash = _g105.stash;
  var unstash = _g105.unstash;
  var setenv = _g105.setenv;
  var extend = _g105.extend;
  var exclude = _g105.exclude;
  var search = _g105.search;
  var split = _g105.split;
  var cat = _g105.cat;
  var _43 = _g105["+"];
  var _ = _g105["-"];
  var _42 = _g105["*"];
  var _47 = _g105["/"];
  var _37 = _g105["%"];
  var _62 = _g105[">"];
  var _60 = _g105["<"];
  var _61 = _g105["="];
  var _6261 = _g105[">="];
  var _6061 = _g105["<="];
  var read_file = _g105["read-file"];
  var write_file = _g105["write-file"];
  var write = _g105.write;
  var exit = _g105.exit;
  var parse_number = _g105["parse-number"];
  var to_string = _g105["to-string"];
  var apply = _g105.apply;
  var make_id = _g105["make-id"];
  var _37message_handler = _g105["%message-handler"];
  var _g106 = nexus.utilities;
  var getenv = _g106.getenv;
  var macro_function = _g106["macro-function"];
  var macro63 = _g106["macro?"];
  var special63 = _g106["special?"];
  var special_form63 = _g106["special-form?"];
  var symbol_expansion = _g106["symbol-expansion"];
  var symbol63 = _g106["symbol?"];
  var variable63 = _g106["variable?"];
  var bound63 = _g106["bound?"];
  var toplevel63 = _g106["toplevel?"];
  var quoted = _g106.quoted;
  var stash42 = _g106["stash*"];
  var bind = _g106.bind;
  var bind42 = _g106["bind*"];
  var quasiexpand = _g106.quasiexpand;
  var macroexpand = _g106.macroexpand;
  var indentation = _g106.indentation;
  var valid_id63 = _g106["valid-id?"];
  var to_id = _g106["to-id"];
  var module_key = _g106["module-key"];
  var module = _g106.module;
  var imported = _g106.imported;
  var exported = _g106.exported;
  var mapo = _g106.mapo;
  var quote_environment = _g106["quote-environment"];
  var quote_modules = _g106["quote-modules"];
  var initial_environment = _g106["initial-environment"];
  var _g109 = nexus.reader;
  var make_stream = _g109["make-stream"];
  var read_table = _g109["read-table"];
  var read = _g109.read;
  var read_all = _g109["read-all"];
  var read_from_string = _g109["read-from-string"];
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
    var _g110 = args;
    var i = 0;
    while ((i < length(_g110))) {
      var arg = _g110[i];
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
    var _g111 = unstash(sublist(arguments, 1));
    var tail = _g111.tail;
    var str = "";
    var _g112 = forms;
    var i = 0;
    while ((i < length(_g112))) {
      var x = _g112[i];
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
    var _g113 = getenv(hd(form));
    var special = _g113.special;
    var stmt = _g113.stmt;
    var self_tr63 = _g113.tr;
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
  function compile_infix(_g114) {
    var op = _g114[0];
    var args = sub(_g114, 1);
    var str = "(";
    var _g115 = getop(op);
    var _g116 = args;
    var i = 0;
    while ((i < length(_g116))) {
      var arg = _g116[i];
      if (((_g115 === "-") && (length(args) === 1))) {
        str = (str + _g115 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g115 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g117 = (function () {
      indent_level = (indent_level + 1);
      var _g118 = compile(body, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g118);
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
      return((ind + "if (" + cond1 + ") {\n" + _g117 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g117 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g117 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g117 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g117 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g117 + tr));
    }
  }
  function compile_function(args, body) {
    var _g119 = unstash(sublist(arguments, 2));
    var name = _g119.name;
    var prefix = _g119.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g120 = (prefix || "");
    var _g121 = compile_args(args);
    var _g122 = (function () {
      indent_level = (indent_level + 1);
      var _g123 = compile_body(body, {_stash: true, tail: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g123);
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
      return(("function " + id + _g121 + " {\n" + _g122 + ind + "}" + tr));
    } else {
      return((_g120 + "function " + id + _g121 + "\n" + _g122 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g124 = unstash(sublist(arguments, 1));
    var stmt = _g124.stmt;
    var tail = _g124.tail;
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
      var _g125 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g125 + tr));
    }
  };
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g126 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g126, [epilog]))]));
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
    var k = module_key(spec);
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    var m = module(spec);
    var toplevel = hd(environment);
    current_module = mod0;
    environment = env0;
    var _g127 = toplevel;
    var name = undefined;
    for (name in _g127) {
      if (isNaN(parseInt(name))) {
        var binding = _g127[name];
        if ((binding.module === k)) {
          m.export[name] = binding;
        }
      }
    }
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g128 = unstash(sublist(arguments, 1));
    var all = _g128.all;
    var m = module(spec);
    var frame = last(environment);
    var _g129 = m.export;
    var k = undefined;
    for (k in _g129) {
      if (isNaN(parseInt(k))) {
        var v = _g129[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g130 = unstash(sublist(arguments, 1));
    var all = _g130.all;
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
  var _g131 = {};
  nexus.compiler = _g131;
  _g131["compile-body"] = compile_body;
  _g131["compile-call"] = compile_call;
  _g131["compile-branch"] = compile_branch;
  _g131["compile-function"] = compile_function;
  _g131["compile-special"] = compile_special;
  _g131.compile = compile;
  _g131["open-module"] = open_module;
  _g131["load-module"] = load_module;
  _g131["in-module"] = in_module;
  _g131["compile-module"] = compile_module;
  _g131.eval = eval;
  _g131.infix = infix;
  _g131.getop = getop;
  _g131["infix?"] = infix63;
  _g131["compile-args"] = compile_args;
  _g131["compile-atom"] = compile_atom;
  _g131.terminator = terminator;
  _g131["compile-infix"] = compile_infix;
  _g131["can-return?"] = can_return63;
  _g131["module-path"] = module_path;
  _g131.encapsulate = encapsulate;
  _g131["compile-file"] = compile_file;
  _g131.run = run;
  _g131["compiling?"] = compiling63;
  _g131["compiler-output"] = compiler_output;
  _g131["%compile-module"] = _37compile_module;
  _g131.prologue = prologue;
})();
(function () {
  var _g133 = nexus.runtime;
  var nil63 = _g133["nil?"];
  var is63 = _g133["is?"];
  var length = _g133.length;
  var empty63 = _g133["empty?"];
  var some63 = _g133["some?"];
  var hd = _g133.hd;
  var string63 = _g133["string?"];
  var number63 = _g133["number?"];
  var boolean63 = _g133["boolean?"];
  var function63 = _g133["function?"];
  var composite63 = _g133["composite?"];
  var atom63 = _g133["atom?"];
  var table63 = _g133["table?"];
  var list63 = _g133["list?"];
  var substring = _g133.substring;
  var sublist = _g133.sublist;
  var sub = _g133.sub;
  var inner = _g133.inner;
  var tl = _g133.tl;
  var char = _g133.char;
  var code = _g133.code;
  var string_literal63 = _g133["string-literal?"];
  var id_literal63 = _g133["id-literal?"];
  var add = _g133.add;
  var drop = _g133.drop;
  var last = _g133.last;
  var reverse = _g133.reverse;
  var join = _g133.join;
  var reduce = _g133.reduce;
  var keep = _g133.keep;
  var find = _g133.find;
  var pairwise = _g133.pairwise;
  var iterate = _g133.iterate;
  var replicate = _g133.replicate;
  var splice = _g133.splice;
  var map = _g133.map;
  var keys63 = _g133["keys?"];
  var stash = _g133.stash;
  var unstash = _g133.unstash;
  var setenv = _g133.setenv;
  var extend = _g133.extend;
  var exclude = _g133.exclude;
  var search = _g133.search;
  var split = _g133.split;
  var cat = _g133.cat;
  var _43 = _g133["+"];
  var _ = _g133["-"];
  var _42 = _g133["*"];
  var _47 = _g133["/"];
  var _37 = _g133["%"];
  var _62 = _g133[">"];
  var _60 = _g133["<"];
  var _61 = _g133["="];
  var _6261 = _g133[">="];
  var _6061 = _g133["<="];
  var read_file = _g133["read-file"];
  var write_file = _g133["write-file"];
  var write = _g133.write;
  var exit = _g133.exit;
  var parse_number = _g133["parse-number"];
  var to_string = _g133["to-string"];
  var apply = _g133.apply;
  var make_id = _g133["make-id"];
  var _37message_handler = _g133["%message-handler"];
  var _g134 = nexus.utilities;
  var getenv = _g134.getenv;
  var macro_function = _g134["macro-function"];
  var macro63 = _g134["macro?"];
  var special63 = _g134["special?"];
  var special_form63 = _g134["special-form?"];
  var symbol_expansion = _g134["symbol-expansion"];
  var symbol63 = _g134["symbol?"];
  var variable63 = _g134["variable?"];
  var bound63 = _g134["bound?"];
  var toplevel63 = _g134["toplevel?"];
  var quoted = _g134.quoted;
  var stash42 = _g134["stash*"];
  var bind = _g134.bind;
  var bind42 = _g134["bind*"];
  var quasiexpand = _g134.quasiexpand;
  var macroexpand = _g134.macroexpand;
  var indentation = _g134.indentation;
  var valid_id63 = _g134["valid-id?"];
  var to_id = _g134["to-id"];
  var module_key = _g134["module-key"];
  var module = _g134.module;
  var imported = _g134.imported;
  var exported = _g134.exported;
  var mapo = _g134.mapo;
  var quote_environment = _g134["quote-environment"];
  var quote_modules = _g134["quote-modules"];
  var initial_environment = _g134["initial-environment"];
  var _g137 = nexus.compiler;
  var compile_body = _g137["compile-body"];
  var compile_call = _g137["compile-call"];
  var compile_branch = _g137["compile-branch"];
  var compile_function = _g137["compile-function"];
  var compile_special = _g137["compile-special"];
  var compile = _g137.compile;
  var open_module = _g137["open-module"];
  var load_module = _g137["load-module"];
  var in_module = _g137["in-module"];
  var compile_module = _g137["compile-module"];
  var eval = _g137.eval;
  return;
})();
(function () {
  var _g323 = nexus.runtime;
  var nil63 = _g323["nil?"];
  var is63 = _g323["is?"];
  var length = _g323.length;
  var empty63 = _g323["empty?"];
  var some63 = _g323["some?"];
  var hd = _g323.hd;
  var string63 = _g323["string?"];
  var number63 = _g323["number?"];
  var boolean63 = _g323["boolean?"];
  var function63 = _g323["function?"];
  var composite63 = _g323["composite?"];
  var atom63 = _g323["atom?"];
  var table63 = _g323["table?"];
  var list63 = _g323["list?"];
  var substring = _g323.substring;
  var sublist = _g323.sublist;
  var sub = _g323.sub;
  var inner = _g323.inner;
  var tl = _g323.tl;
  var char = _g323.char;
  var code = _g323.code;
  var string_literal63 = _g323["string-literal?"];
  var id_literal63 = _g323["id-literal?"];
  var add = _g323.add;
  var drop = _g323.drop;
  var last = _g323.last;
  var reverse = _g323.reverse;
  var join = _g323.join;
  var reduce = _g323.reduce;
  var keep = _g323.keep;
  var find = _g323.find;
  var pairwise = _g323.pairwise;
  var iterate = _g323.iterate;
  var replicate = _g323.replicate;
  var splice = _g323.splice;
  var map = _g323.map;
  var keys63 = _g323["keys?"];
  var stash = _g323.stash;
  var unstash = _g323.unstash;
  var setenv = _g323.setenv;
  var extend = _g323.extend;
  var exclude = _g323.exclude;
  var search = _g323.search;
  var split = _g323.split;
  var cat = _g323.cat;
  var _43 = _g323["+"];
  var _ = _g323["-"];
  var _42 = _g323["*"];
  var _47 = _g323["/"];
  var _37 = _g323["%"];
  var _62 = _g323[">"];
  var _60 = _g323["<"];
  var _61 = _g323["="];
  var _6261 = _g323[">="];
  var _6061 = _g323["<="];
  var read_file = _g323["read-file"];
  var write_file = _g323["write-file"];
  var write = _g323.write;
  var exit = _g323.exit;
  var parse_number = _g323["parse-number"];
  var to_string = _g323["to-string"];
  var apply = _g323.apply;
  var make_id = _g323["make-id"];
  var _37message_handler = _g323["%message-handler"];
  var _g324 = nexus.utilities;
  var getenv = _g324.getenv;
  var macro_function = _g324["macro-function"];
  var macro63 = _g324["macro?"];
  var special63 = _g324["special?"];
  var special_form63 = _g324["special-form?"];
  var symbol_expansion = _g324["symbol-expansion"];
  var symbol63 = _g324["symbol?"];
  var variable63 = _g324["variable?"];
  var bound63 = _g324["bound?"];
  var toplevel63 = _g324["toplevel?"];
  var quoted = _g324.quoted;
  var stash42 = _g324["stash*"];
  var bind = _g324.bind;
  var bind42 = _g324["bind*"];
  var quasiexpand = _g324.quasiexpand;
  var macroexpand = _g324.macroexpand;
  var indentation = _g324.indentation;
  var valid_id63 = _g324["valid-id?"];
  var to_id = _g324["to-id"];
  var module_key = _g324["module-key"];
  var module = _g324.module;
  var imported = _g324.imported;
  var exported = _g324.exported;
  var mapo = _g324.mapo;
  var quote_environment = _g324["quote-environment"];
  var quote_modules = _g324["quote-modules"];
  var initial_environment = _g324["initial-environment"];
  var _g327 = nexus.compiler;
  var compile_body = _g327["compile-body"];
  var compile_call = _g327["compile-call"];
  var compile_branch = _g327["compile-branch"];
  var compile_function = _g327["compile-function"];
  var compile_special = _g327["compile-special"];
  var compile = _g327.compile;
  var open_module = _g327["open-module"];
  var load_module = _g327["load-module"];
  var in_module = _g327["in-module"];
  var compile_module = _g327["compile-module"];
  var eval = _g327.eval;
  global.target = "js";
  return;
})();
(function () {
  var _g603 = nexus.runtime;
  var nil63 = _g603["nil?"];
  var is63 = _g603["is?"];
  var length = _g603.length;
  var empty63 = _g603["empty?"];
  var some63 = _g603["some?"];
  var hd = _g603.hd;
  var string63 = _g603["string?"];
  var number63 = _g603["number?"];
  var boolean63 = _g603["boolean?"];
  var function63 = _g603["function?"];
  var composite63 = _g603["composite?"];
  var atom63 = _g603["atom?"];
  var table63 = _g603["table?"];
  var list63 = _g603["list?"];
  var substring = _g603.substring;
  var sublist = _g603.sublist;
  var sub = _g603.sub;
  var inner = _g603.inner;
  var tl = _g603.tl;
  var char = _g603.char;
  var code = _g603.code;
  var string_literal63 = _g603["string-literal?"];
  var id_literal63 = _g603["id-literal?"];
  var add = _g603.add;
  var drop = _g603.drop;
  var last = _g603.last;
  var reverse = _g603.reverse;
  var join = _g603.join;
  var reduce = _g603.reduce;
  var keep = _g603.keep;
  var find = _g603.find;
  var pairwise = _g603.pairwise;
  var iterate = _g603.iterate;
  var replicate = _g603.replicate;
  var splice = _g603.splice;
  var map = _g603.map;
  var keys63 = _g603["keys?"];
  var stash = _g603.stash;
  var unstash = _g603.unstash;
  var setenv = _g603.setenv;
  var extend = _g603.extend;
  var exclude = _g603.exclude;
  var search = _g603.search;
  var split = _g603.split;
  var cat = _g603.cat;
  var _43 = _g603["+"];
  var _ = _g603["-"];
  var _42 = _g603["*"];
  var _47 = _g603["/"];
  var _37 = _g603["%"];
  var _62 = _g603[">"];
  var _60 = _g603["<"];
  var _61 = _g603["="];
  var _6261 = _g603[">="];
  var _6061 = _g603["<="];
  var read_file = _g603["read-file"];
  var write_file = _g603["write-file"];
  var write = _g603.write;
  var exit = _g603.exit;
  var parse_number = _g603["parse-number"];
  var to_string = _g603["to-string"];
  var apply = _g603.apply;
  var make_id = _g603["make-id"];
  var _37message_handler = _g603["%message-handler"];
  var _g604 = nexus.utilities;
  var getenv = _g604.getenv;
  var macro_function = _g604["macro-function"];
  var macro63 = _g604["macro?"];
  var special63 = _g604["special?"];
  var special_form63 = _g604["special-form?"];
  var symbol_expansion = _g604["symbol-expansion"];
  var symbol63 = _g604["symbol?"];
  var variable63 = _g604["variable?"];
  var bound63 = _g604["bound?"];
  var toplevel63 = _g604["toplevel?"];
  var quoted = _g604.quoted;
  var stash42 = _g604["stash*"];
  var bind = _g604.bind;
  var bind42 = _g604["bind*"];
  var quasiexpand = _g604.quasiexpand;
  var macroexpand = _g604.macroexpand;
  var indentation = _g604.indentation;
  var valid_id63 = _g604["valid-id?"];
  var to_id = _g604["to-id"];
  var module_key = _g604["module-key"];
  var module = _g604.module;
  var imported = _g604.imported;
  var exported = _g604.exported;
  var mapo = _g604.mapo;
  var quote_environment = _g604["quote-environment"];
  var quote_modules = _g604["quote-modules"];
  var initial_environment = _g604["initial-environment"];
  var _g607 = nexus.compiler;
  var compile_body = _g607["compile-body"];
  var compile_call = _g607["compile-call"];
  var compile_branch = _g607["compile-branch"];
  var compile_function = _g607["compile-function"];
  var compile_special = _g607["compile-special"];
  var compile = _g607.compile;
  var open_module = _g607["open-module"];
  var load_module = _g607["load-module"];
  var in_module = _g607["in-module"];
  var compile_module = _g607["compile-module"];
  var eval = _g607.eval;
  global.modules = {core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g620 = sub(body, 0);
    var imports = [];
    var imp = _g620.import;
    var exp = _g620.export;
    var _g621 = (imp || []);
    var _g622 = 0;
    while ((_g622 < length(_g621))) {
      var k = _g621[_g622];
      load_module(k);
      imports = join(imports, imported(k));
      _g622 = (_g622 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g623 = (exp || []);
    var _g624 = 0;
    while ((_g624 < length(_g623))) {
      var k = _g623[_g624];
      setenv(k, {_stash: true, export: true});
      _g624 = (_g624 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g625 = body;
      var k = undefined;
      for (k in _g625) {
        if (isNaN(parseInt(k))) {
          var v = _g625[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g626 = sub(body, 0);
    var _g627 = bind42(args, _g626);
    var _g628 = _g627[0];
    var _g629 = _g627[1];
    return(join(["%function", _g628], _g629));
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g630 = sub(body, 0);
    var form = join(["fn", args], _g630);
    var keys = sub(_g630, length(_g630));
    eval(join((function () {
      var _g631 = ["setenv", join(["quote", name])];
      _g631.special = form;
      _g631.form = join(["quote", form]);
      return(_g631);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g632 = xs;
      var i = 0;
      while ((i < length(_g632))) {
        var x = _g632[i];
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
    var _g633 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g633))) {
      var _g634 = bind42(x, _g633);
      var args = _g634[0];
      var _g635 = _g634[1];
      return(join(["%global-function", name, args], _g635));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g636 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g636), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g637 = ["target"];
          _g637.js = join(["isNaN", join(["parseInt", k])]);
          _g637.lua = join(["not", join(["number?", k])]);
          return(_g637);
        })()), join(["let", join([v, join(["get", t1, k])])], _g636)])])]));
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
    var _g638 = elements;
    var _g639 = 0;
    while ((_g639 < length(_g638))) {
      var e = _g638[_g639];
      l[e] = true;
      _g639 = (_g639 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g640 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g640)]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g641 = sub(body, 0);
    add(environment, {});
    var _g642 = (function () {
      map(function (_g643) {
        var name = _g643[0];
        var exp = _g643[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g641)));
    })();
    drop(environment);
    return(_g642);
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g644 = sub(body, 0);
    var form = join(["fn", args], _g644);
    eval(join((function () {
      var _g645 = ["setenv", join(["quote", name])];
      _g645.macro = form;
      _g645.form = join(["quote", form]);
      return(_g645);
    })()));
    return(undefined);
  }, module: "core", export: true}, "with-bindings": {macro: function (_g646) {
    var names = _g646[0];
    var body = unstash(sublist(arguments, 1));
    var _g647 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g648 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g649 = ["setenv", x];
        _g649.variable = true;
        return(_g649);
      })())])];
      _g648.scope = true;
      return(_g648);
    })(), _g647));
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g650 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g650))) {
      var _g651 = bind42(x, _g650);
      var args = _g651[0];
      var _g652 = _g651[1];
      return(join(["%local-function", name, args], _g652));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g653 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g654 = ["table"];
      _g654._scope = scope;
      return(_g654);
    })())]), join(["let", join([x, join(["do"], _g653)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g655 = sub(body, 0);
    add(environment, {});
    var _g656 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g655)));
    })();
    drop(environment);
    return(_g656);
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g657 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g657)]));
  }, module: "core", export: true}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", global: true, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g322, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g658 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g659) {
      var lh = _g659[0];
      var rh = _g659[1];
      var _g660 = bind(lh, rh);
      var _g661 = 0;
      while ((_g661 < length(_g660))) {
        var _g662 = _g660[_g661];
        var id = _g662[0];
        var val = _g662[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g661 = (_g661 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g658)])));
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g663 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g663)]));
  }, module: "core", export: true}}}, runtime: {import: ["special", "core"], export: {"nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, setenv: {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, "make-id": {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}, type: {variable: true, module: "runtime"}, "splice?": {variable: true, module: "runtime"}, mapl: {variable: true, module: "runtime"}, require: {global: true, export: true, module: "runtime"}, fs: {variable: true, module: "runtime"}, print: {global: true, export: true, module: "runtime"}, "id-count": {variable: true, module: "runtime"}}}, lib: {import: ["core", "special"], export: {}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true, module: "system"}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "compile-module": {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, infix: {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, "compile-atom": {variable: true, module: "compiler"}, terminator: {variable: true, module: "compiler"}, "compile-infix": {variable: true, module: "compiler"}, "can-return?": {variable: true, module: "compiler"}, "current-module": {global: true, export: true, module: "compiler"}, "module-path": {variable: true, module: "compiler"}, encapsulate: {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, run: {variable: true, module: "compiler"}, "compiling?": {variable: true, module: "compiler"}, "compiler-output": {variable: true, module: "compiler"}, "%compile-module": {variable: true, module: "compiler"}, prologue: {variable: true, module: "compiler"}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"error": {module: "special", special: function (_g664) {
    var x = _g664[0];
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
    var _g665 = form;
    var i = 0;
    while ((i < length(_g665))) {
      var condition = _g665[i];
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
    var _g666 = forms;
    var i = 0;
    while ((i < length(_g666))) {
      var x = _g666[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "return": {module: "special", special: function (_g667) {
    var x = _g667[0];
    var _g668 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g668));
  }, export: true, stmt: true}, "%for": {tr: true, special: function (_g669) {
    var _g670 = _g669[0];
    var t = _g670[0];
    var k = _g670[1];
    var body = sub(_g669, 1);
    var _g671 = compile(t);
    var ind = indentation();
    var _g672 = (function () {
      indent_level = (indent_level + 1);
      var _g673 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g673);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g671 + " do\n" + _g672 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g671 + ") {\n" + _g672 + ind + "}\n"));
    }
  }, stmt: true, export: true, module: "special"}, "%function": {special: function (_g674) {
    var args = _g674[0];
    var body = sub(_g674, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "%try": {tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g675 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g675);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g676 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g676);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true, export: true, module: "special"}, "%local-function": {tr: true, special: function (_g677) {
    var name = _g677[0];
    var args = _g677[1];
    var body = sub(_g677, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, stmt: true, export: true, module: "special"}, "not": {special: function (_g678) {
    var x = _g678[0];
    var _g679 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g679 + ")"));
  }, module: "special", export: true}, "get": {special: function (_g680) {
    var t = _g680[0];
    var k = _g680[1];
    var _g681 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g681, 0) === "{"))) {
      _g681 = ("(" + _g681 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g681 + "." + inner(k)));
    } else {
      return((_g681 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "%local": {module: "special", special: function (_g682) {
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
    var _g683 = pairs;
    var i = 0;
    while ((i < length(_g683))) {
      var _g684 = _g683[i];
      var k = _g684[0];
      var v = _g684[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g685 = compile(v);
      var _g686 = (function () {
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
      str = (str + _g686 + sep + _g685);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "while": {tr: true, special: function (_g687) {
    var condition = _g687[0];
    var body = sub(_g687, 1);
    var _g688 = compile(condition);
    var _g689 = (function () {
      indent_level = (indent_level + 1);
      var _g690 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g690);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g688 + ") {\n" + _g689 + ind + "}\n"));
    } else {
      return((ind + "while " + _g688 + " do\n" + _g689 + ind + "end\n"));
    }
  }, stmt: true, export: true, module: "special"}, "%global-function": {tr: true, special: function (_g691) {
    var name = _g691[0];
    var args = _g691[1];
    var body = sub(_g691, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, stmt: true, export: true, module: "special"}, "set": {module: "special", special: function (_g692) {
    var lh = _g692[0];
    var rh = _g692[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, stmt: true}, "do": {tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, stmt: true, export: true, module: "special"}, "break": {module: "special", special: function (_g132) {
    return((indentation() + "break"));
  }, export: true, stmt: true}}}, utilities: {import: ["runtime", "special", "core"], export: {getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, "toplevel?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, module: {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, mapo: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "global?": {variable: true, module: "utilities"}, escape: {variable: true, module: "utilities"}, "quoting?": {variable: true, module: "utilities"}, "quasiquoting?": {variable: true, module: "utilities"}, "can-unquote?": {variable: true, module: "utilities"}, "quasisplice?": {variable: true, module: "utilities"}, "quasiquote-list": {variable: true, module: "utilities"}, "indent-level": {global: true, export: true, module: "utilities"}, reserved: {variable: true, module: "utilities"}, "numeric?": {variable: true, module: "utilities"}, "valid-char?": {variable: true, module: "utilities"}, "quote-binding": {variable: true, module: "utilities"}, "quote-frame": {variable: true, module: "utilities"}, "quote-module": {variable: true, module: "utilities"}}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g693) {
    var char = _g693[0];
    var stream = _g693[1];
    var body = unstash(sublist(arguments, 1));
    var _g694 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g694)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}, delimiters: {variable: true, module: "reader"}, whitespace: {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}, "read-char": {variable: true, module: "reader"}, "skip-non-code": {variable: true, module: "reader"}, eof: {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, "flag?": {variable: true, module: "reader"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g695 = sub(body, 0);
    var imports = [];
    var imp = _g695.import;
    var exp = _g695.export;
    var _g696 = (imp || []);
    var _g697 = 0;
    while ((_g697 < length(_g696))) {
      var k = _g696[_g697];
      load_module(k);
      imports = join(imports, imported(k));
      _g697 = (_g697 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g698 = (exp || []);
    var _g699 = 0;
    while ((_g699 < length(_g698))) {
      var k = _g698[_g699];
      setenv(k, {_stash: true, export: true});
      _g699 = (_g699 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}}];
  return;
})();
(function () {
  var _g2 = nexus.runtime;
  var nil63 = _g2["nil?"];
  var is63 = _g2["is?"];
  var length = _g2.length;
  var empty63 = _g2["empty?"];
  var some63 = _g2["some?"];
  var hd = _g2.hd;
  var string63 = _g2["string?"];
  var number63 = _g2["number?"];
  var boolean63 = _g2["boolean?"];
  var function63 = _g2["function?"];
  var composite63 = _g2["composite?"];
  var atom63 = _g2["atom?"];
  var table63 = _g2["table?"];
  var list63 = _g2["list?"];
  var substring = _g2.substring;
  var sublist = _g2.sublist;
  var sub = _g2.sub;
  var inner = _g2.inner;
  var tl = _g2.tl;
  var char = _g2.char;
  var code = _g2.code;
  var string_literal63 = _g2["string-literal?"];
  var id_literal63 = _g2["id-literal?"];
  var add = _g2.add;
  var drop = _g2.drop;
  var last = _g2.last;
  var reverse = _g2.reverse;
  var join = _g2.join;
  var reduce = _g2.reduce;
  var keep = _g2.keep;
  var find = _g2.find;
  var pairwise = _g2.pairwise;
  var iterate = _g2.iterate;
  var replicate = _g2.replicate;
  var splice = _g2.splice;
  var map = _g2.map;
  var keys63 = _g2["keys?"];
  var stash = _g2.stash;
  var unstash = _g2.unstash;
  var setenv = _g2.setenv;
  var extend = _g2.extend;
  var exclude = _g2.exclude;
  var search = _g2.search;
  var split = _g2.split;
  var cat = _g2.cat;
  var _43 = _g2["+"];
  var _ = _g2["-"];
  var _42 = _g2["*"];
  var _47 = _g2["/"];
  var _37 = _g2["%"];
  var _62 = _g2[">"];
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _6261 = _g2[">="];
  var _6061 = _g2["<="];
  var read_file = _g2["read-file"];
  var write_file = _g2["write-file"];
  var write = _g2.write;
  var exit = _g2.exit;
  var parse_number = _g2["parse-number"];
  var to_string = _g2["to-string"];
  var apply = _g2.apply;
  var make_id = _g2["make-id"];
  var _37message_handler = _g2["%message-handler"];
  var _g5 = nexus.reader;
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus.compiler;
  var compile_body = _g6["compile-body"];
  var compile_call = _g6["compile-call"];
  var compile_branch = _g6["compile-branch"];
  var compile_function = _g6["compile-function"];
  var compile_special = _g6["compile-special"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  function rep(str) {
    var _g701 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g704) {
        return([false, _g704.message]);
      }
    })();
    var _g1 = _g701[0];
    var x = _g701[1];
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
    var _g702 = args;
    var i = 0;
    while ((i < length(_g702))) {
      var arg = _g702[i];
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
  var _g703 = {};
  nexus.main = _g703;
  _g703.rep = rep;
  _g703.repl = repl;
  _g703.usage = usage;
  _g703.main = main;
})();
