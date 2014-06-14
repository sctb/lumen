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
      return("#<function>");
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
  _g51.reverse = reverse;
  _g51.replicate = replicate;
  _g51.reduce = reduce;
  _g51["atom?"] = atom63;
  _g51.sublist = sublist;
  _g51["/"] = _47;
  _g51["write-file"] = write_file;
  _g51["+"] = _43;
  _g51["-"] = _;
  _g51["splice?"] = splice63;
  _g51.length = length;
  _g51["read-file"] = read_file;
  _g51["id-count"] = id_count;
  _g51.mapl = mapl;
  _g51["%message-handler"] = _37message_handler;
  _g51["keys?"] = keys63;
  _g51["make-id"] = make_id;
  _g51.find = find;
  _g51.map = map;
  _g51.apply = apply;
  _g51.tl = tl;
  _g51["to-string"] = to_string;
  _g51.exit = exit;
  _g51["parse-number"] = parse_number;
  _g51.hd = hd;
  _g51.sub = sub;
  _g51["function?"] = function63;
  _g51.add = add;
  _g51.pairwise = pairwise;
  _g51["nil?"] = nil63;
  _g51["some?"] = some63;
  _g51["="] = _61;
  _g51["<"] = _60;
  _g51[">"] = _62;
  _g51["%"] = _37;
  _g51["*"] = _42;
  _g51.cat = cat;
  _g51.split = split;
  _g51.search = search;
  _g51.last = last;
  _g51.exclude = exclude;
  _g51.extend = extend;
  _g51.setenv = setenv;
  _g51.unstash = unstash;
  _g51.stash = stash;
  _g51["empty?"] = empty63;
  _g51["string-literal?"] = string_literal63;
  _g51["number?"] = number63;
  _g51["boolean?"] = boolean63;
  _g51["string?"] = string63;
  _g51.keep = keep;
  _g51["composite?"] = composite63;
  _g51.code = code;
  _g51.iterate = iterate;
  _g51.char = char;
  _g51[">="] = _6261;
  _g51.inner = inner;
  _g51.splice = splice;
  _g51.type = type;
  _g51["<="] = _6061;
  _g51.substring = substring;
  _g51["list?"] = list63;
  _g51["table?"] = table63;
  _g51["is?"] = is63;
  _g51.join = join;
  _g51.write = write;
  _g51.drop = drop;
  _g51.fs = fs;
  _g51["id-literal?"] = id_literal63;
})();
(function () {
  var _g56 = nexus.runtime;
  var reverse = _g56.reverse;
  var _42 = _g56["*"];
  var replicate = _g56.replicate;
  var reduce = _g56.reduce;
  var atom63 = _g56["atom?"];
  var _37 = _g56["%"];
  var sublist = _g56.sublist;
  var _47 = _g56["/"];
  var write_file = _g56["write-file"];
  var _43 = _g56["+"];
  var _ = _g56["-"];
  var list63 = _g56["list?"];
  var length = _g56.length;
  var to_string = _g56["to-string"];
  var read_file = _g56["read-file"];
  var table63 = _g56["table?"];
  var keys63 = _g56["keys?"];
  var find = _g56.find;
  var map = _g56.map;
  var tl = _g56.tl;
  var substring = _g56.substring;
  var parse_number = _g56["parse-number"];
  var hd = _g56.hd;
  var function63 = _g56["function?"];
  var add = _g56.add;
  var extend = _g56.extend;
  var pairwise = _g56.pairwise;
  var nil63 = _g56["nil?"];
  var some63 = _g56["some?"];
  var stash = _g56.stash;
  var sub = _g56.sub;
  var composite63 = _g56["composite?"];
  var string_literal63 = _g56["string-literal?"];
  var id_literal63 = _g56["id-literal?"];
  var number63 = _g56["number?"];
  var boolean63 = _g56["boolean?"];
  var _62 = _g56[">"];
  var make_id = _g56["make-id"];
  var exclude = _g56.exclude;
  var code = _g56.code;
  var iterate = _g56.iterate;
  var setenv = _g56.setenv;
  var keep = _g56.keep;
  var empty63 = _g56["empty?"];
  var _6261 = _g56[">="];
  var _61 = _g56["="];
  var splice = _g56.splice;
  var cat = _g56.cat;
  var _6061 = _g56["<="];
  var search = _g56.search;
  var _37message_handler = _g56["%message-handler"];
  var last = _g56.last;
  var inner = _g56.inner;
  var char = _g56.char;
  var is63 = _g56["is?"];
  var join = _g56.join;
  var unstash = _g56.unstash;
  var string63 = _g56["string?"];
  var write = _g56.write;
  var drop = _g56.drop;
  var split = _g56.split;
  var _60 = _g56["<"];
  var exit = _g56.exit;
  var apply = _g56.apply;
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
  var reserved = {"throw": true, "for": true, "while": true, "case": true, "function": true, "new": true, "until": true, "else": true, "local": true, ">": true, "false": true, "<": true, "true": true, "+": true, "this": true, "-": true, "/": true, "catch": true, "typeof": true, "default": true, "<=": true, "switch": true, "not": true, "in": true, "nil": true, "%": true, "delete": true, "if": true, "debugger": true, "with": true, "and": true, "end": true, "do": true, "then": true, ">=": true, "var": true, "void": true, "finally": true, "==": true, "try": true, "=": true, "*": true, "instanceof": true, "repeat": true, "continue": true, "break": true, "elseif": true, "return": true, "or": true};
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
  _g92["variable?"] = variable63;
  _g92.indentation = indentation;
  _g92["symbol-expansion"] = symbol_expansion;
  _g92["macro-function"] = macro_function;
  _g92["quasiquoting?"] = quasiquoting63;
  _g92.module = module;
  _g92["toplevel?"] = toplevel63;
  _g92["special?"] = special63;
  _g92["bind*"] = bind42;
  _g92["module-key"] = module_key;
  _g92["global?"] = global63;
  _g92["quote-binding"] = quote_binding;
  _g92.quoted = quoted;
  _g92["symbol?"] = symbol63;
  _g92.quasiexpand = quasiexpand;
  _g92["numeric?"] = numeric63;
  _g92["quote-frame"] = quote_frame;
  _g92.bind = bind;
  _g92["special-form?"] = special_form63;
  _g92["valid-char?"] = valid_char63;
  _g92["quasiquote-list"] = quasiquote_list;
  _g92["valid-id?"] = valid_id63;
  _g92["can-unquote?"] = can_unquote63;
  _g92.escape = escape;
  _g92["quote-modules"] = quote_modules;
  _g92["quote-environment"] = quote_environment;
  _g92.imported = imported;
  _g92["to-id"] = to_id;
  _g92["quasisplice?"] = quasisplice63;
  _g92.macroexpand = macroexpand;
  _g92["stash*"] = stash42;
  _g92["quoting?"] = quoting63;
  _g92["macro?"] = macro63;
  _g92.getenv = getenv;
  _g92["bound?"] = bound63;
  _g92.exported = exported;
  _g92.reserved = reserved;
  _g92["quote-module"] = quote_module;
  _g92["initial-environment"] = initial_environment;
  _g92.mapo = mapo;
})();
(function () {
  var _g93 = nexus.runtime;
  var reverse = _g93.reverse;
  var _42 = _g93["*"];
  var replicate = _g93.replicate;
  var reduce = _g93.reduce;
  var atom63 = _g93["atom?"];
  var _37 = _g93["%"];
  var sublist = _g93.sublist;
  var _47 = _g93["/"];
  var write_file = _g93["write-file"];
  var _43 = _g93["+"];
  var _ = _g93["-"];
  var list63 = _g93["list?"];
  var length = _g93.length;
  var to_string = _g93["to-string"];
  var read_file = _g93["read-file"];
  var table63 = _g93["table?"];
  var keys63 = _g93["keys?"];
  var find = _g93.find;
  var map = _g93.map;
  var tl = _g93.tl;
  var substring = _g93.substring;
  var parse_number = _g93["parse-number"];
  var hd = _g93.hd;
  var function63 = _g93["function?"];
  var add = _g93.add;
  var extend = _g93.extend;
  var pairwise = _g93.pairwise;
  var nil63 = _g93["nil?"];
  var some63 = _g93["some?"];
  var stash = _g93.stash;
  var sub = _g93.sub;
  var composite63 = _g93["composite?"];
  var string_literal63 = _g93["string-literal?"];
  var id_literal63 = _g93["id-literal?"];
  var number63 = _g93["number?"];
  var boolean63 = _g93["boolean?"];
  var _62 = _g93[">"];
  var make_id = _g93["make-id"];
  var exclude = _g93.exclude;
  var code = _g93.code;
  var iterate = _g93.iterate;
  var setenv = _g93.setenv;
  var keep = _g93.keep;
  var empty63 = _g93["empty?"];
  var _6261 = _g93[">="];
  var _61 = _g93["="];
  var splice = _g93.splice;
  var cat = _g93.cat;
  var _6061 = _g93["<="];
  var search = _g93.search;
  var _37message_handler = _g93["%message-handler"];
  var last = _g93.last;
  var inner = _g93.inner;
  var char = _g93.char;
  var is63 = _g93["is?"];
  var join = _g93.join;
  var unstash = _g93.unstash;
  var string63 = _g93["string?"];
  var write = _g93.write;
  var drop = _g93.drop;
  var split = _g93.split;
  var _60 = _g93["<"];
  var exit = _g93.exit;
  var apply = _g93.apply;
  var delimiters = {")": true, "(": true, "\n": true, ";": true};
  var whitespace = {"\t": true, "\n": true, " ": true};
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
  _g104["flag?"] = flag63;
  _g104["key?"] = key63;
  _g104["skip-non-code"] = skip_non_code;
  _g104["peek-char"] = peek_char;
  _g104["read-from-string"] = read_from_string;
  _g104["read-all"] = read_all;
  _g104.read = read;
  _g104["read-table"] = read_table;
  _g104["make-stream"] = make_stream;
  _g104.eof = eof;
  _g104["read-char"] = read_char;
  _g104.delimiters = delimiters;
  _g104.whitespace = whitespace;
})();
(function () {
  var _g105 = nexus.runtime;
  var reverse = _g105.reverse;
  var _42 = _g105["*"];
  var replicate = _g105.replicate;
  var reduce = _g105.reduce;
  var atom63 = _g105["atom?"];
  var _37 = _g105["%"];
  var sublist = _g105.sublist;
  var _47 = _g105["/"];
  var write_file = _g105["write-file"];
  var _43 = _g105["+"];
  var _ = _g105["-"];
  var list63 = _g105["list?"];
  var length = _g105.length;
  var to_string = _g105["to-string"];
  var read_file = _g105["read-file"];
  var table63 = _g105["table?"];
  var keys63 = _g105["keys?"];
  var find = _g105.find;
  var map = _g105.map;
  var tl = _g105.tl;
  var substring = _g105.substring;
  var parse_number = _g105["parse-number"];
  var hd = _g105.hd;
  var function63 = _g105["function?"];
  var add = _g105.add;
  var extend = _g105.extend;
  var pairwise = _g105.pairwise;
  var nil63 = _g105["nil?"];
  var some63 = _g105["some?"];
  var stash = _g105.stash;
  var sub = _g105.sub;
  var composite63 = _g105["composite?"];
  var string_literal63 = _g105["string-literal?"];
  var id_literal63 = _g105["id-literal?"];
  var number63 = _g105["number?"];
  var boolean63 = _g105["boolean?"];
  var _62 = _g105[">"];
  var make_id = _g105["make-id"];
  var exclude = _g105.exclude;
  var code = _g105.code;
  var iterate = _g105.iterate;
  var setenv = _g105.setenv;
  var keep = _g105.keep;
  var empty63 = _g105["empty?"];
  var _6261 = _g105[">="];
  var _61 = _g105["="];
  var splice = _g105.splice;
  var cat = _g105.cat;
  var _6061 = _g105["<="];
  var search = _g105.search;
  var _37message_handler = _g105["%message-handler"];
  var last = _g105.last;
  var inner = _g105.inner;
  var char = _g105.char;
  var is63 = _g105["is?"];
  var join = _g105.join;
  var unstash = _g105.unstash;
  var string63 = _g105["string?"];
  var write = _g105.write;
  var drop = _g105.drop;
  var split = _g105.split;
  var _60 = _g105["<"];
  var exit = _g105.exit;
  var apply = _g105.apply;
  var _g106 = nexus.utilities;
  var variable63 = _g106["variable?"];
  var indentation = _g106.indentation;
  var quote_modules = _g106["quote-modules"];
  var module_key = _g106["module-key"];
  var to_id = _g106["to-id"];
  var symbol63 = _g106["symbol?"];
  var quasiexpand = _g106.quasiexpand;
  var imported = _g106.imported;
  var macro_function = _g106["macro-function"];
  var mapo = _g106.mapo;
  var initial_environment = _g106["initial-environment"];
  var exported = _g106.exported;
  var bound63 = _g106["bound?"];
  var module = _g106.module;
  var toplevel63 = _g106["toplevel?"];
  var special63 = _g106["special?"];
  var bind = _g106.bind;
  var getenv = _g106.getenv;
  var special_form63 = _g106["special-form?"];
  var macro63 = _g106["macro?"];
  var macroexpand = _g106.macroexpand;
  var quote_environment = _g106["quote-environment"];
  var bind42 = _g106["bind*"];
  var quoted = _g106.quoted;
  var stash42 = _g106["stash*"];
  var symbol_expansion = _g106["symbol-expansion"];
  var valid_id63 = _g106["valid-id?"];
  var _g109 = nexus.reader;
  var read_table = _g109["read-table"];
  var read = _g109.read;
  var make_stream = _g109["make-stream"];
  var read_all = _g109["read-all"];
  var read_from_string = _g109["read-from-string"];
  var infix = {common: {"*": true, "%": true, ">=": true, "-": true, "/": true, "<": true, "+": true, ">": true, "<=": true}, js: {"or": "||", "~=": "!=", "and": "&&", cat: "+", "=": "==="}, lua: {"or": true, "~=": true, "and": true, cat: "..", "=": "=="}};
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
    var stmt = _g113.stmt;
    var special = _g113.special;
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
  function lower(form) {
    return(macroexpand(form));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g126 = lower(body);
    var epilog = lower(exported());
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
    var x = compile(lower(form1));
    target = previous;
    return(run(x));
  }
  var _g131 = {};
  nexus.compiler = _g131;
  _g131.run = run;
  _g131.encapsulate = encapsulate;
  _g131["module-path"] = module_path;
  _g131.lower = lower;
  _g131["compile-call"] = compile_call;
  _g131["compile-special"] = compile_special;
  _g131["load-module"] = load_module;
  _g131["open-module"] = open_module;
  _g131["compiler-output"] = compiler_output;
  _g131["can-return?"] = can_return63;
  _g131["compiling?"] = compiling63;
  _g131["compile-branch"] = compile_branch;
  _g131["compile-args"] = compile_args;
  _g131["compile-module"] = compile_module;
  _g131.getop = getop;
  _g131.infix = infix;
  _g131.eval = eval;
  _g131["infix?"] = infix63;
  _g131["in-module"] = in_module;
  _g131.compile = compile;
  _g131["compile-function"] = compile_function;
  _g131["compile-body"] = compile_body;
  _g131["compile-atom"] = compile_atom;
  _g131["compile-infix"] = compile_infix;
  _g131["compile-file"] = compile_file;
  _g131.prologue = prologue;
  _g131.terminator = terminator;
  _g131["%compile-module"] = _37compile_module;
})();
(function () {
  var _g133 = nexus.runtime;
  var reverse = _g133.reverse;
  var _42 = _g133["*"];
  var replicate = _g133.replicate;
  var reduce = _g133.reduce;
  var atom63 = _g133["atom?"];
  var _37 = _g133["%"];
  var sublist = _g133.sublist;
  var _47 = _g133["/"];
  var write_file = _g133["write-file"];
  var _43 = _g133["+"];
  var _ = _g133["-"];
  var list63 = _g133["list?"];
  var length = _g133.length;
  var to_string = _g133["to-string"];
  var read_file = _g133["read-file"];
  var table63 = _g133["table?"];
  var keys63 = _g133["keys?"];
  var find = _g133.find;
  var map = _g133.map;
  var tl = _g133.tl;
  var substring = _g133.substring;
  var parse_number = _g133["parse-number"];
  var hd = _g133.hd;
  var function63 = _g133["function?"];
  var add = _g133.add;
  var extend = _g133.extend;
  var pairwise = _g133.pairwise;
  var nil63 = _g133["nil?"];
  var some63 = _g133["some?"];
  var stash = _g133.stash;
  var sub = _g133.sub;
  var composite63 = _g133["composite?"];
  var string_literal63 = _g133["string-literal?"];
  var id_literal63 = _g133["id-literal?"];
  var number63 = _g133["number?"];
  var boolean63 = _g133["boolean?"];
  var _62 = _g133[">"];
  var make_id = _g133["make-id"];
  var exclude = _g133.exclude;
  var code = _g133.code;
  var iterate = _g133.iterate;
  var setenv = _g133.setenv;
  var keep = _g133.keep;
  var empty63 = _g133["empty?"];
  var _6261 = _g133[">="];
  var _61 = _g133["="];
  var splice = _g133.splice;
  var cat = _g133.cat;
  var _6061 = _g133["<="];
  var search = _g133.search;
  var _37message_handler = _g133["%message-handler"];
  var last = _g133.last;
  var inner = _g133.inner;
  var char = _g133.char;
  var is63 = _g133["is?"];
  var join = _g133.join;
  var unstash = _g133.unstash;
  var string63 = _g133["string?"];
  var write = _g133.write;
  var drop = _g133.drop;
  var split = _g133.split;
  var _60 = _g133["<"];
  var exit = _g133.exit;
  var apply = _g133.apply;
  var _g134 = nexus.utilities;
  var variable63 = _g134["variable?"];
  var indentation = _g134.indentation;
  var quote_modules = _g134["quote-modules"];
  var module_key = _g134["module-key"];
  var to_id = _g134["to-id"];
  var symbol63 = _g134["symbol?"];
  var quasiexpand = _g134.quasiexpand;
  var imported = _g134.imported;
  var macro_function = _g134["macro-function"];
  var mapo = _g134.mapo;
  var initial_environment = _g134["initial-environment"];
  var exported = _g134.exported;
  var bound63 = _g134["bound?"];
  var module = _g134.module;
  var toplevel63 = _g134["toplevel?"];
  var special63 = _g134["special?"];
  var bind = _g134.bind;
  var getenv = _g134.getenv;
  var special_form63 = _g134["special-form?"];
  var macro63 = _g134["macro?"];
  var macroexpand = _g134.macroexpand;
  var quote_environment = _g134["quote-environment"];
  var bind42 = _g134["bind*"];
  var quoted = _g134.quoted;
  var stash42 = _g134["stash*"];
  var symbol_expansion = _g134["symbol-expansion"];
  var valid_id63 = _g134["valid-id?"];
  var _g137 = nexus.compiler;
  var compile_branch = _g137["compile-branch"];
  var compile_body = _g137["compile-body"];
  var compile_call = _g137["compile-call"];
  var load_module = _g137["load-module"];
  var open_module = _g137["open-module"];
  var eval = _g137.eval;
  var in_module = _g137["in-module"];
  var compile_special = _g137["compile-special"];
  var compile_function = _g137["compile-function"];
  var compile = _g137.compile;
  var compile_module = _g137["compile-module"];
})();
(function () {
  var _g323 = nexus.runtime;
  var reverse = _g323.reverse;
  var _42 = _g323["*"];
  var replicate = _g323.replicate;
  var reduce = _g323.reduce;
  var atom63 = _g323["atom?"];
  var _37 = _g323["%"];
  var sublist = _g323.sublist;
  var _47 = _g323["/"];
  var write_file = _g323["write-file"];
  var _43 = _g323["+"];
  var _ = _g323["-"];
  var list63 = _g323["list?"];
  var length = _g323.length;
  var to_string = _g323["to-string"];
  var read_file = _g323["read-file"];
  var table63 = _g323["table?"];
  var keys63 = _g323["keys?"];
  var find = _g323.find;
  var map = _g323.map;
  var tl = _g323.tl;
  var substring = _g323.substring;
  var parse_number = _g323["parse-number"];
  var hd = _g323.hd;
  var function63 = _g323["function?"];
  var add = _g323.add;
  var extend = _g323.extend;
  var pairwise = _g323.pairwise;
  var nil63 = _g323["nil?"];
  var some63 = _g323["some?"];
  var stash = _g323.stash;
  var sub = _g323.sub;
  var composite63 = _g323["composite?"];
  var string_literal63 = _g323["string-literal?"];
  var id_literal63 = _g323["id-literal?"];
  var number63 = _g323["number?"];
  var boolean63 = _g323["boolean?"];
  var _62 = _g323[">"];
  var make_id = _g323["make-id"];
  var exclude = _g323.exclude;
  var code = _g323.code;
  var iterate = _g323.iterate;
  var setenv = _g323.setenv;
  var keep = _g323.keep;
  var empty63 = _g323["empty?"];
  var _6261 = _g323[">="];
  var _61 = _g323["="];
  var splice = _g323.splice;
  var cat = _g323.cat;
  var _6061 = _g323["<="];
  var search = _g323.search;
  var _37message_handler = _g323["%message-handler"];
  var last = _g323.last;
  var inner = _g323.inner;
  var char = _g323.char;
  var is63 = _g323["is?"];
  var join = _g323.join;
  var unstash = _g323.unstash;
  var string63 = _g323["string?"];
  var write = _g323.write;
  var drop = _g323.drop;
  var split = _g323.split;
  var _60 = _g323["<"];
  var exit = _g323.exit;
  var apply = _g323.apply;
  var _g324 = nexus.utilities;
  var variable63 = _g324["variable?"];
  var indentation = _g324.indentation;
  var quote_modules = _g324["quote-modules"];
  var module_key = _g324["module-key"];
  var to_id = _g324["to-id"];
  var symbol63 = _g324["symbol?"];
  var quasiexpand = _g324.quasiexpand;
  var imported = _g324.imported;
  var macro_function = _g324["macro-function"];
  var mapo = _g324.mapo;
  var initial_environment = _g324["initial-environment"];
  var exported = _g324.exported;
  var bound63 = _g324["bound?"];
  var module = _g324.module;
  var toplevel63 = _g324["toplevel?"];
  var special63 = _g324["special?"];
  var bind = _g324.bind;
  var getenv = _g324.getenv;
  var special_form63 = _g324["special-form?"];
  var macro63 = _g324["macro?"];
  var macroexpand = _g324.macroexpand;
  var quote_environment = _g324["quote-environment"];
  var bind42 = _g324["bind*"];
  var quoted = _g324.quoted;
  var stash42 = _g324["stash*"];
  var symbol_expansion = _g324["symbol-expansion"];
  var valid_id63 = _g324["valid-id?"];
  var _g327 = nexus.compiler;
  var compile_branch = _g327["compile-branch"];
  var compile_body = _g327["compile-body"];
  var compile_call = _g327["compile-call"];
  var load_module = _g327["load-module"];
  var open_module = _g327["open-module"];
  var eval = _g327.eval;
  var in_module = _g327["in-module"];
  var compile_special = _g327["compile-special"];
  var compile_function = _g327["compile-function"];
  var compile = _g327.compile;
  var compile_module = _g327["compile-module"];
  global.target = "js";
})();
(function () {
  var _g603 = nexus.runtime;
  var reverse = _g603.reverse;
  var _42 = _g603["*"];
  var replicate = _g603.replicate;
  var reduce = _g603.reduce;
  var atom63 = _g603["atom?"];
  var _37 = _g603["%"];
  var sublist = _g603.sublist;
  var _47 = _g603["/"];
  var write_file = _g603["write-file"];
  var _43 = _g603["+"];
  var _ = _g603["-"];
  var list63 = _g603["list?"];
  var length = _g603.length;
  var to_string = _g603["to-string"];
  var read_file = _g603["read-file"];
  var table63 = _g603["table?"];
  var keys63 = _g603["keys?"];
  var find = _g603.find;
  var map = _g603.map;
  var tl = _g603.tl;
  var substring = _g603.substring;
  var parse_number = _g603["parse-number"];
  var hd = _g603.hd;
  var function63 = _g603["function?"];
  var add = _g603.add;
  var extend = _g603.extend;
  var pairwise = _g603.pairwise;
  var nil63 = _g603["nil?"];
  var some63 = _g603["some?"];
  var stash = _g603.stash;
  var sub = _g603.sub;
  var composite63 = _g603["composite?"];
  var string_literal63 = _g603["string-literal?"];
  var id_literal63 = _g603["id-literal?"];
  var number63 = _g603["number?"];
  var boolean63 = _g603["boolean?"];
  var _62 = _g603[">"];
  var make_id = _g603["make-id"];
  var exclude = _g603.exclude;
  var code = _g603.code;
  var iterate = _g603.iterate;
  var setenv = _g603.setenv;
  var keep = _g603.keep;
  var empty63 = _g603["empty?"];
  var _6261 = _g603[">="];
  var _61 = _g603["="];
  var splice = _g603.splice;
  var cat = _g603.cat;
  var _6061 = _g603["<="];
  var search = _g603.search;
  var _37message_handler = _g603["%message-handler"];
  var last = _g603.last;
  var inner = _g603.inner;
  var char = _g603.char;
  var is63 = _g603["is?"];
  var join = _g603.join;
  var unstash = _g603.unstash;
  var string63 = _g603["string?"];
  var write = _g603.write;
  var drop = _g603.drop;
  var split = _g603.split;
  var _60 = _g603["<"];
  var exit = _g603.exit;
  var apply = _g603.apply;
  var _g604 = nexus.utilities;
  var variable63 = _g604["variable?"];
  var indentation = _g604.indentation;
  var quote_modules = _g604["quote-modules"];
  var module_key = _g604["module-key"];
  var to_id = _g604["to-id"];
  var symbol63 = _g604["symbol?"];
  var quasiexpand = _g604.quasiexpand;
  var imported = _g604.imported;
  var macro_function = _g604["macro-function"];
  var mapo = _g604.mapo;
  var initial_environment = _g604["initial-environment"];
  var exported = _g604.exported;
  var bound63 = _g604["bound?"];
  var module = _g604.module;
  var toplevel63 = _g604["toplevel?"];
  var special63 = _g604["special?"];
  var bind = _g604.bind;
  var getenv = _g604.getenv;
  var special_form63 = _g604["special-form?"];
  var macro63 = _g604["macro?"];
  var macroexpand = _g604.macroexpand;
  var quote_environment = _g604["quote-environment"];
  var bind42 = _g604["bind*"];
  var quoted = _g604.quoted;
  var stash42 = _g604["stash*"];
  var symbol_expansion = _g604["symbol-expansion"];
  var valid_id63 = _g604["valid-id?"];
  var _g607 = nexus.compiler;
  var compile_branch = _g607["compile-branch"];
  var compile_body = _g607["compile-body"];
  var compile_call = _g607["compile-call"];
  var load_module = _g607["load-module"];
  var open_module = _g607["open-module"];
  var eval = _g607.eval;
  var in_module = _g607["in-module"];
  var compile_special = _g607["compile-special"];
  var compile_function = _g607["compile-function"];
  var compile = _g607.compile;
  var compile_module = _g607["compile-module"];
  global.modules = {optimizer: {import: ["runtime", "special", "core"], export: {"define-optimization": {}, optimizations: {module: "optimizer", variable: true}, optimize: {variable: true, module: "optimizer", export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"set": {stmt: true, special: function (_g620) {
    var lh = _g620[0];
    var rh = _g620[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, module: "special"}, "%try": {stmt: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g621 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g621);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g622 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g622);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, module: "special", tr: true}, "return": {stmt: true, special: function (_g623) {
    var x = _g623[0];
    var _g624 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g624));
  }, export: true, module: "special"}, "%array": {special: function (forms) {
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
    var _g625 = forms;
    var i = 0;
    while ((i < length(_g625))) {
      var x = _g625[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true, module: "special"}, "%object": {special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g626 = pairs;
    var i = 0;
    while ((i < length(_g626))) {
      var _g627 = _g626[i];
      var k = _g627[0];
      var v = _g627[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g628 = compile(v);
      var _g629 = (function () {
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
      str = (str + _g629 + sep + _g628);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true, module: "special"}, "%local-function": {stmt: true, export: true, special: function (_g630) {
    var name = _g630[0];
    var args = _g630[1];
    var body = sub(_g630, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, module: "special", tr: true}, "%for": {stmt: true, export: true, special: function (_g631) {
    var _g632 = _g631[0];
    var t = _g632[0];
    var k = _g632[1];
    var body = sub(_g631, 1);
    var _g633 = compile(t);
    var ind = indentation();
    var _g634 = (function () {
      indent_level = (indent_level + 1);
      var _g635 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g635);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g633 + " do\n" + _g634 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g633 + ") {\n" + _g634 + ind + "}\n"));
    }
  }, module: "special", tr: true}, "not": {special: function (_g636) {
    var x = _g636[0];
    var _g637 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g637 + ")"));
  }, export: true, module: "special"}, "if": {stmt: true, export: true, special: function (form, tail63) {
    var str = "";
    var _g638 = form;
    var i = 0;
    while ((i < length(_g638))) {
      var condition = _g638[i];
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
  }, module: "special", tr: true}, "while": {stmt: true, export: true, special: function (_g639) {
    var condition = _g639[0];
    var body = sub(_g639, 1);
    var _g640 = compile(condition);
    var _g641 = (function () {
      indent_level = (indent_level + 1);
      var _g642 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g642);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g640 + ") {\n" + _g641 + ind + "}\n"));
    } else {
      return((ind + "while " + _g640 + " do\n" + _g641 + ind + "end\n"));
    }
  }, module: "special", tr: true}, "%global-function": {stmt: true, export: true, special: function (_g643) {
    var name = _g643[0];
    var args = _g643[1];
    var body = sub(_g643, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, module: "special", tr: true}, "get": {special: function (_g644) {
    var t = _g644[0];
    var k = _g644[1];
    var _g645 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g645, 0) === "{"))) {
      _g645 = ("(" + _g645 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g645 + "." + inner(k)));
    } else {
      return((_g645 + "[" + k1 + "]"));
    }
  }, export: true, module: "special"}, "%function": {special: function (_g646) {
    var args = _g646[0];
    var body = sub(_g646, 1);
    return(compile_function(args, body));
  }, export: true, module: "special"}, "error": {stmt: true, special: function (_g647) {
    var x = _g647[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(join(["Error", x]))));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true, module: "special"}, "break": {stmt: true, special: function (_g132) {
    return((indentation() + "break"));
  }, export: true, module: "special"}, "do": {stmt: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, module: "special", tr: true}, "%local": {stmt: true, special: function (_g648) {
    var name = _g648[0];
    var value = _g648[1];
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
  }, export: true, module: "special"}}}, runtime: {import: ["special", "core"], export: {reverse: {variable: true, export: true, module: "runtime"}, "*": {variable: true, export: true, module: "runtime"}, print: {export: true, global: true, module: "runtime"}, replicate: {variable: true, export: true, module: "runtime"}, reduce: {variable: true, export: true, module: "runtime"}, "atom?": {variable: true, export: true, module: "runtime"}, "%": {variable: true, export: true, module: "runtime"}, sublist: {variable: true, export: true, module: "runtime"}, "/": {variable: true, export: true, module: "runtime"}, "write-file": {variable: true, export: true, module: "runtime"}, "+": {variable: true, export: true, module: "runtime"}, "-": {variable: true, export: true, module: "runtime"}, "splice?": {module: "runtime", variable: true}, "list?": {variable: true, export: true, module: "runtime"}, length: {variable: true, export: true, module: "runtime"}, "to-string": {variable: true, export: true, module: "runtime"}, "read-file": {variable: true, export: true, module: "runtime"}, "id-count": {module: "runtime", variable: true}, "table?": {variable: true, export: true, module: "runtime"}, "keys?": {variable: true, export: true, module: "runtime"}, find: {variable: true, export: true, module: "runtime"}, map: {variable: true, export: true, module: "runtime"}, tl: {variable: true, export: true, module: "runtime"}, substring: {variable: true, export: true, module: "runtime"}, "parse-number": {variable: true, export: true, module: "runtime"}, hd: {variable: true, export: true, module: "runtime"}, "function?": {variable: true, export: true, module: "runtime"}, add: {variable: true, export: true, module: "runtime"}, extend: {variable: true, export: true, module: "runtime"}, pairwise: {variable: true, export: true, module: "runtime"}, "nil?": {variable: true, export: true, module: "runtime"}, "some?": {variable: true, export: true, module: "runtime"}, stash: {variable: true, export: true, module: "runtime"}, sub: {variable: true, export: true, module: "runtime"}, "composite?": {variable: true, export: true, module: "runtime"}, "string-literal?": {variable: true, export: true, module: "runtime"}, "id-literal?": {variable: true, export: true, module: "runtime"}, "number?": {variable: true, export: true, module: "runtime"}, "boolean?": {variable: true, export: true, module: "runtime"}, require: {export: true, global: true, module: "runtime"}, ">": {variable: true, export: true, module: "runtime"}, "make-id": {variable: true, export: true, module: "runtime"}, exclude: {variable: true, export: true, module: "runtime"}, code: {variable: true, export: true, module: "runtime"}, iterate: {variable: true, export: true, module: "runtime"}, setenv: {variable: true, export: true, module: "runtime"}, keep: {variable: true, export: true, module: "runtime"}, "empty?": {variable: true, export: true, module: "runtime"}, ">=": {variable: true, export: true, module: "runtime"}, mapl: {module: "runtime", variable: true}, "=": {variable: true, export: true, module: "runtime"}, splice: {variable: true, export: true, module: "runtime"}, cat: {variable: true, export: true, module: "runtime"}, type: {module: "runtime", variable: true}, "<=": {variable: true, export: true, module: "runtime"}, search: {variable: true, export: true, module: "runtime"}, "%message-handler": {variable: true, export: true, module: "runtime"}, last: {variable: true, export: true, module: "runtime"}, inner: {variable: true, export: true, module: "runtime"}, char: {variable: true, export: true, module: "runtime"}, "is?": {variable: true, export: true, module: "runtime"}, join: {variable: true, export: true, module: "runtime"}, unstash: {variable: true, export: true, module: "runtime"}, "string?": {variable: true, export: true, module: "runtime"}, write: {variable: true, export: true, module: "runtime"}, drop: {variable: true, export: true, module: "runtime"}, split: {variable: true, export: true, module: "runtime"}, "<": {variable: true, export: true, module: "runtime"}, fs: {module: "runtime", variable: true}, exit: {variable: true, export: true, module: "runtime"}, apply: {variable: true, export: true, module: "runtime"}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g649 = sub(body, 0);
    var form = join(["fn", args], _g649);
    var keys = sub(_g649, length(_g649));
    eval(join((function () {
      var _g650 = ["setenv", join(["quote", name])];
      _g650.form = join(["quote", form]);
      _g650.special = form;
      return(_g650);
    })(), keys));
    return(undefined);
  }, export: true, module: "core"}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g651 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g652 = ["table"];
      _g652._scope = scope;
      return(_g652);
    })())]), join(["let", join([x, join(["do"], _g651)]), join(["drop", "environment"]), x])]));
  }, export: true, module: "core"}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, export: true, module: "core"}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, export: true, module: "core"}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g653 = sub(body, 0);
    var form = join(["fn", args], _g653);
    eval(join((function () {
      var _g654 = ["setenv", join(["quote", name])];
      _g654.macro = form;
      _g654.form = join(["quote", form]);
      return(_g654);
    })()));
    return(undefined);
  }, export: true, module: "core"}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g655 = sub(body, 0);
    add(environment, {});
    var _g656 = (function () {
      map(function (_g657) {
        var name = _g657[0];
        var exp = _g657[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g655)));
    })();
    drop(environment);
    return(_g656);
  }, export: true, module: "core"}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g658 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g658))) {
      var _g659 = bind42(x, _g658);
      var args = _g659[0];
      var _g660 = _g659[1];
      return(join(["%local-function", name, args], _g660));
    } else {
      return(join(["%local", name, x]));
    }
  }, export: true, module: "core"}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g661 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g661)]));
  }, export: true, module: "core"}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, export: true, module: "core"}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true, module: "core"}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g662 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g662))) {
      var _g663 = bind42(x, _g662);
      var args = _g663[0];
      var _g664 = _g663[1];
      return(join(["%global-function", name, args], _g664));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, export: true, module: "core"}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, export: true, module: "core"}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g665 = xs;
      var i = 0;
      while ((i < length(_g665))) {
        var x = _g665[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, export: true, module: "core"}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g666 = body;
      var k = undefined;
      for (k in _g666) {
        if (isNaN(parseInt(k))) {
          var v = _g666[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, export: true, module: "core"}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, export: true, module: "core"}, target: {module: "core", global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g667 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g667)]));
  }, export: true, module: "core"}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g322, x) {
      return(x);
    }, body)));
  }, export: true, module: "core"}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g668 = elements;
    var _g669 = 0;
    while ((_g669 < length(_g668))) {
      var e = _g668[_g669];
      l[e] = true;
      _g669 = (_g669 + 1);
    }
    return(join(["table"], l));
  }, export: true, module: "core"}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g670 = sub(body, 0);
    var imports = [];
    var imp = _g670.import;
    var exp = _g670.export;
    var _g671 = (imp || []);
    var _g672 = 0;
    while ((_g672 < length(_g671))) {
      var k = _g671[_g672];
      load_module(k);
      imports = join(imports, imported(k));
      _g672 = (_g672 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g673 = (exp || []);
    var _g674 = 0;
    while ((_g674 < length(_g673))) {
      var k = _g673[_g674];
      setenv(k, {_stash: true, export: true});
      _g674 = (_g674 + 1);
    }
    return(join(["do"], imports));
  }, export: true, module: "core"}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g675 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g675), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g676 = ["target"];
          _g676.lua = join(["not", join(["number?", k])]);
          _g676.js = join(["isNaN", join(["parseInt", k])]);
          return(_g676);
        })()), join(["let", join([v, join(["get", t1, k])])], _g675)])])]));
      }
    })()]));
  }, export: true, module: "core"}, language: {macro: function () {
    return(join(["quote", target]));
  }, export: true, module: "core"}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g677 = sub(body, 0);
    add(environment, {});
    var _g678 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g677)));
    })();
    drop(environment);
    return(_g678);
  }, export: true, module: "core"}, "with-bindings": {macro: function (_g679) {
    var names = _g679[0];
    var body = unstash(sublist(arguments, 1));
    var _g680 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g681 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g682 = ["setenv", x];
        _g682.variable = true;
        return(_g682);
      })())])];
      _g681.scope = true;
      return(_g681);
    })(), _g680));
  }, export: true, module: "core"}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true, module: "core"}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g683 = sub(body, 0);
    var _g684 = bind42(args, _g683);
    var _g685 = _g684[0];
    var _g686 = _g684[1];
    return(join(["%function", _g685], _g686));
  }, export: true, module: "core"}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g687 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g688) {
      var lh = _g688[0];
      var rh = _g688[1];
      var _g689 = bind(lh, rh);
      var _g690 = 0;
      while ((_g690 < length(_g689))) {
        var _g691 = _g689[_g690];
        var id = _g691[0];
        var val = _g691[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g690 = (_g690 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g687)])));
  }, export: true, module: "core"}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g692 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g692)]));
  }, export: true, module: "core"}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true, module: "core"}}}, reader: {import: ["runtime", "special", "core"], export: {delimiters: {module: "reader", variable: true}, "read-table": {variable: true, export: true, module: "reader"}, "flag?": {module: "reader", variable: true}, "key?": {module: "reader", variable: true}, eof: {module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g693) {
    var char = _g693[0];
    var stream = _g693[1];
    var body = unstash(sublist(arguments, 1));
    var _g694 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g694)]));
  }}, whitespace: {module: "reader", variable: true}, "peek-char": {module: "reader", variable: true}, read: {variable: true, export: true, module: "reader"}, "read-char": {module: "reader", variable: true}, "skip-non-code": {module: "reader", variable: true}, "make-stream": {variable: true, export: true, module: "reader"}, "read-all": {variable: true, export: true, module: "reader"}, "read-from-string": {variable: true, export: true, module: "reader"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {prologue: {module: "compiler", variable: true}, "compile-branch": {variable: true, export: true, module: "compiler"}, lower: {module: "compiler", variable: true}, "compile-body": {variable: true, export: true, module: "compiler"}, "compile-call": {variable: true, export: true, module: "compiler"}, "load-module": {variable: true, export: true, module: "compiler"}, "can-return?": {module: "compiler", variable: true}, "open-module": {variable: true, export: true, module: "compiler"}, run: {module: "compiler", variable: true}, "compile-args": {module: "compiler", variable: true}, "compile-infix": {module: "compiler", variable: true}, terminator: {module: "compiler", variable: true}, "compile-file": {module: "compiler", variable: true}, "current-module": {export: true, global: true, module: "compiler"}, "%compile-module": {module: "compiler", variable: true}, "compile-atom": {module: "compiler", variable: true}, eval: {variable: true, export: true, module: "compiler"}, "module-path": {module: "compiler", variable: true}, "in-module": {variable: true, export: true, module: "compiler"}, "compile-special": {variable: true, export: true, module: "compiler"}, "infix?": {module: "compiler", variable: true}, "compiler-output": {module: "compiler", variable: true}, "compile-function": {variable: true, export: true, module: "compiler"}, infix: {module: "compiler", variable: true}, compile: {variable: true, export: true, module: "compiler"}, getop: {module: "compiler", variable: true}, encapsulate: {module: "compiler", variable: true}, "compile-module": {variable: true, export: true, module: "compiler"}, "compiling?": {module: "compiler", variable: true}}}, system: {import: ["special", "core"], export: {nexus: {export: true, global: true, module: "system"}}}, lib: {import: ["core", "special"], export: {}}, utilities: {import: ["runtime", "special", "core"], export: {"variable?": {variable: true, export: true, module: "utilities"}, indentation: {variable: true, export: true, module: "utilities"}, "quote-modules": {variable: true, export: true, module: "utilities"}, "quasisplice?": {module: "utilities", variable: true}, "module-key": {variable: true, export: true, module: "utilities"}, "valid-char?": {module: "utilities", variable: true}, "to-id": {variable: true, export: true, module: "utilities"}, "symbol?": {variable: true, export: true, module: "utilities"}, quasiexpand: {variable: true, export: true, module: "utilities"}, "can-unquote?": {module: "utilities", variable: true}, imported: {variable: true, export: true, module: "utilities"}, escape: {module: "utilities", variable: true}, "macro-function": {variable: true, export: true, module: "utilities"}, mapo: {variable: true, export: true, module: "utilities"}, "quasiquoting?": {module: "utilities", variable: true}, "initial-environment": {variable: true, export: true, module: "utilities"}, "quote-module": {module: "utilities", variable: true}, reserved: {module: "utilities", variable: true}, exported: {variable: true, export: true, module: "utilities"}, "bound?": {variable: true, export: true, module: "utilities"}, module: {variable: true, export: true, module: "utilities"}, "quote-binding": {module: "utilities", variable: true}, "toplevel?": {variable: true, export: true, module: "utilities"}, "special?": {variable: true, export: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, bind: {variable: true, export: true, module: "utilities"}, getenv: {variable: true, export: true, module: "utilities"}, "special-form?": {variable: true, export: true, module: "utilities"}, "macro?": {variable: true, export: true, module: "utilities"}, "quoting?": {module: "utilities", variable: true}, "global?": {module: "utilities", variable: true}, macroexpand: {variable: true, export: true, module: "utilities"}, "quote-frame": {module: "utilities", variable: true}, "quasiquote-list": {module: "utilities", variable: true}, "quote-environment": {variable: true, export: true, module: "utilities"}, "bind*": {variable: true, export: true, module: "utilities"}, quoted: {variable: true, export: true, module: "utilities"}, "numeric?": {module: "utilities", variable: true}, "stash*": {variable: true, export: true, module: "utilities"}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "symbol-expansion": {variable: true, export: true, module: "utilities"}, "valid-id?": {variable: true, export: true, module: "utilities"}}}};
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
  }, export: true, module: "core"}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var reverse = _g2.reverse;
  var _42 = _g2["*"];
  var replicate = _g2.replicate;
  var reduce = _g2.reduce;
  var atom63 = _g2["atom?"];
  var _37 = _g2["%"];
  var sublist = _g2.sublist;
  var _47 = _g2["/"];
  var write_file = _g2["write-file"];
  var _43 = _g2["+"];
  var _ = _g2["-"];
  var list63 = _g2["list?"];
  var length = _g2.length;
  var to_string = _g2["to-string"];
  var read_file = _g2["read-file"];
  var table63 = _g2["table?"];
  var keys63 = _g2["keys?"];
  var find = _g2.find;
  var map = _g2.map;
  var tl = _g2.tl;
  var substring = _g2.substring;
  var parse_number = _g2["parse-number"];
  var hd = _g2.hd;
  var function63 = _g2["function?"];
  var add = _g2.add;
  var extend = _g2.extend;
  var pairwise = _g2.pairwise;
  var nil63 = _g2["nil?"];
  var some63 = _g2["some?"];
  var last = _g2.last;
  var empty63 = _g2["empty?"];
  var composite63 = _g2["composite?"];
  var string_literal63 = _g2["string-literal?"];
  var number63 = _g2["number?"];
  var boolean63 = _g2["boolean?"];
  var string63 = _g2["string?"];
  var keep = _g2.keep;
  var code = _g2.code;
  var iterate = _g2.iterate;
  var _37message_handler = _g2["%message-handler"];
  var make_id = _g2["make-id"];
  var _6261 = _g2[">="];
  var apply = _g2.apply;
  var exit = _g2.exit;
  var splice = _g2.splice;
  var cat = _g2.cat;
  var setenv = _g2.setenv;
  var _6061 = _g2["<="];
  var _61 = _g2["="];
  var inner = _g2.inner;
  var _62 = _g2[">"];
  var split = _g2.split;
  var search = _g2.search;
  var is63 = _g2["is?"];
  var join = _g2.join;
  var unstash = _g2.unstash;
  var sub = _g2.sub;
  var write = _g2.write;
  var drop = _g2.drop;
  var stash = _g2.stash;
  var _60 = _g2["<"];
  var char = _g2.char;
  var id_literal63 = _g2["id-literal?"];
  var exclude = _g2.exclude;
  var _g5 = nexus.reader;
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var make_stream = _g5["make-stream"];
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var _g6 = nexus.compiler;
  var compile_branch = _g6["compile-branch"];
  var compile_body = _g6["compile-body"];
  var compile_call = _g6["compile-call"];
  var load_module = _g6["load-module"];
  var open_module = _g6["open-module"];
  var compile_special = _g6["compile-special"];
  var eval = _g6.eval;
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
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
  _g703.usage = usage;
  _g703.main = main;
  _g703.repl = repl;
})();
