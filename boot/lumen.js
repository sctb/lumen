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
  _g51.mapl = mapl;
  _g51.iterate = iterate;
  _g51.exit = exit;
  _g51.substring = substring;
  _g51.reverse = reverse;
  _g51.sub = sub;
  _g51.fs = fs;
  _g51["table?"] = table63;
  _g51.char = char;
  _g51["to-string"] = to_string;
  _g51["id-literal?"] = id_literal63;
  _g51.add = add;
  _g51.keep = keep;
  _g51[">"] = _62;
  _g51.hd = hd;
  _g51["id-count"] = id_count;
  _g51["write-file"] = write_file;
  _g51.join = join;
  _g51["string-literal?"] = string_literal63;
  _g51.setenv = setenv;
  _g51["nil?"] = nil63;
  _g51.drop = drop;
  _g51.type = type;
  _g51["+"] = _43;
  _g51["*"] = _42;
  _g51["-"] = _;
  _g51["make-id"] = make_id;
  _g51["parse-number"] = parse_number;
  _g51.write = write;
  _g51["read-file"] = read_file;
  _g51["<="] = _6061;
  _g51.length = length;
  _g51["number?"] = number63;
  _g51.map = map;
  _g51[">="] = _6261;
  _g51["="] = _61;
  _g51.stash = stash;
  _g51["string?"] = string63;
  _g51["<"] = _60;
  _g51["boolean?"] = boolean63;
  _g51["%"] = _37;
  _g51["/"] = _47;
  _g51.cat = cat;
  _g51["some?"] = some63;
  _g51.split = split;
  _g51.search = search;
  _g51.code = code;
  _g51["is?"] = is63;
  _g51.extend = extend;
  _g51.unstash = unstash;
  _g51["composite?"] = composite63;
  _g51.tl = tl;
  _g51["keys?"] = keys63;
  _g51.splice = splice;
  _g51.exclude = exclude;
  _g51.pairwise = pairwise;
  _g51["atom?"] = atom63;
  _g51.inner = inner;
  _g51.reduce = reduce;
  _g51["function?"] = function63;
  _g51.last = last;
  _g51["splice?"] = splice63;
  _g51.find = find;
  _g51.apply = apply;
  _g51.sublist = sublist;
  _g51["list?"] = list63;
  _g51["%message-handler"] = _37message_handler;
  _g51["empty?"] = empty63;
  _g51.replicate = replicate;
})();
(function () {
  var _g56 = nexus.runtime;
  var search = _g56.search;
  var iterate = _g56.iterate;
  var exit = _g56.exit;
  var substring = _g56.substring;
  var join = _g56.join;
  var reverse = _g56.reverse;
  var extend = _g56.extend;
  var table63 = _g56["table?"];
  var char = _g56.char;
  var to_string = _g56["to-string"];
  var splice = _g56.splice;
  var id_literal63 = _g56["id-literal?"];
  var add = _g56.add;
  var keys63 = _g56["keys?"];
  var _61 = _g56["="];
  var _60 = _g56["<"];
  var _62 = _g56[">"];
  var hd = _g56.hd;
  var write_file = _g56["write-file"];
  var setenv = _g56.setenv;
  var nil63 = _g56["nil?"];
  var _43 = _g56["+"];
  var _42 = _g56["*"];
  var _ = _g56["-"];
  var _47 = _g56["/"];
  var _37 = _g56["%"];
  var inner = _g56.inner;
  var length = _g56.length;
  var number63 = _g56["number?"];
  var split = _g56.split;
  var stash = _g56.stash;
  var string63 = _g56["string?"];
  var pairwise = _g56.pairwise;
  var parse_number = _g56["parse-number"];
  var cat = _g56.cat;
  var some63 = _g56["some?"];
  var code = _g56.code;
  var drop = _g56.drop;
  var make_id = _g56["make-id"];
  var tl = _g56.tl;
  var reduce = _g56.reduce;
  var exclude = _g56.exclude;
  var atom63 = _g56["atom?"];
  var function63 = _g56["function?"];
  var empty63 = _g56["empty?"];
  var find = _g56.find;
  var sub = _g56.sub;
  var last = _g56.last;
  var apply = _g56.apply;
  var boolean63 = _g56["boolean?"];
  var sublist = _g56.sublist;
  var string_literal63 = _g56["string-literal?"];
  var map = _g56.map;
  var list63 = _g56["list?"];
  var _37message_handler = _g56["%message-handler"];
  var read_file = _g56["read-file"];
  var replicate = _g56.replicate;
  var is63 = _g56["is?"];
  var composite63 = _g56["composite?"];
  var keep = _g56.keep;
  var unstash = _g56.unstash;
  var _6061 = _g56["<="];
  var write = _g56.write;
  var _6261 = _g56[">="];
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
  var reserved = {"continue": true, "while": true, "then": true, "*": true, "with": true, "new": true, "do": true, "for": true, "==": true, "break": true, "or": true, "if": true, "<": true, ">": true, "case": true, "this": true, "end": true, "default": true, "%": true, "/": true, ">=": true, "+": true, "typeof": true, "-": true, "instanceof": true, "until": true, "nil": true, "<=": true, "true": true, "finally": true, "throw": true, "return": true, "debugger": true, "elseif": true, "delete": true, "=": true, "function": true, "local": true, "and": true, "false": true, "repeat": true, "switch": true, "var": true, "not": true, "catch": true, "void": true, "else": true, "try": true, "in": true};
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
      _g91.export = quote_frame(m.export);
      _g91.import = quoted(m.import);
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
  _g92["bound?"] = bound63;
  _g92["quote-environment"] = quote_environment;
  _g92.quasiexpand = quasiexpand;
  _g92["stash*"] = stash42;
  _g92["special?"] = special63;
  _g92["macro?"] = macro63;
  _g92.escape = escape;
  _g92["valid-id?"] = valid_id63;
  _g92.imported = imported;
  _g92["macro-function"] = macro_function;
  _g92["quote-module"] = quote_module;
  _g92.mapo = mapo;
  _g92.macroexpand = macroexpand;
  _g92["numeric?"] = numeric63;
  _g92.indentation = indentation;
  _g92["quote-frame"] = quote_frame;
  _g92["quote-binding"] = quote_binding;
  _g92["valid-char?"] = valid_char63;
  _g92.getenv = getenv;
  _g92.reserved = reserved;
  _g92["quasisplice?"] = quasisplice63;
  _g92["can-unquote?"] = can_unquote63;
  _g92["quasiquoting?"] = quasiquoting63;
  _g92.bind = bind;
  _g92["global?"] = global63;
  _g92["initial-environment"] = initial_environment;
  _g92["quote-modules"] = quote_modules;
  _g92.exported = exported;
  _g92["bind*"] = bind42;
  _g92.module = module;
  _g92["module-key"] = module_key;
  _g92["to-id"] = to_id;
  _g92["quasiquote-list"] = quasiquote_list;
  _g92["quoting?"] = quoting63;
  _g92.quoted = quoted;
  _g92["symbol?"] = symbol63;
  _g92["symbol-expansion"] = symbol_expansion;
  _g92["special-form?"] = special_form63;
  _g92["toplevel?"] = toplevel63;
  _g92["variable?"] = variable63;
})();
(function () {
  var _g93 = nexus.runtime;
  var search = _g93.search;
  var iterate = _g93.iterate;
  var exit = _g93.exit;
  var substring = _g93.substring;
  var join = _g93.join;
  var reverse = _g93.reverse;
  var extend = _g93.extend;
  var table63 = _g93["table?"];
  var char = _g93.char;
  var to_string = _g93["to-string"];
  var splice = _g93.splice;
  var id_literal63 = _g93["id-literal?"];
  var add = _g93.add;
  var keys63 = _g93["keys?"];
  var _61 = _g93["="];
  var _60 = _g93["<"];
  var _62 = _g93[">"];
  var hd = _g93.hd;
  var write_file = _g93["write-file"];
  var setenv = _g93.setenv;
  var nil63 = _g93["nil?"];
  var _43 = _g93["+"];
  var _42 = _g93["*"];
  var _ = _g93["-"];
  var _47 = _g93["/"];
  var _37 = _g93["%"];
  var inner = _g93.inner;
  var length = _g93.length;
  var number63 = _g93["number?"];
  var split = _g93.split;
  var stash = _g93.stash;
  var string63 = _g93["string?"];
  var pairwise = _g93.pairwise;
  var parse_number = _g93["parse-number"];
  var cat = _g93.cat;
  var some63 = _g93["some?"];
  var code = _g93.code;
  var drop = _g93.drop;
  var make_id = _g93["make-id"];
  var tl = _g93.tl;
  var reduce = _g93.reduce;
  var exclude = _g93.exclude;
  var atom63 = _g93["atom?"];
  var function63 = _g93["function?"];
  var empty63 = _g93["empty?"];
  var find = _g93.find;
  var sub = _g93.sub;
  var last = _g93.last;
  var apply = _g93.apply;
  var boolean63 = _g93["boolean?"];
  var sublist = _g93.sublist;
  var string_literal63 = _g93["string-literal?"];
  var map = _g93.map;
  var list63 = _g93["list?"];
  var _37message_handler = _g93["%message-handler"];
  var read_file = _g93["read-file"];
  var replicate = _g93.replicate;
  var is63 = _g93["is?"];
  var composite63 = _g93["composite?"];
  var keep = _g93.keep;
  var unstash = _g93.unstash;
  var _6061 = _g93["<="];
  var write = _g93.write;
  var _6261 = _g93[">="];
  var delimiters = {"(": true, ")": true, "\n": true, ";": true};
  var whitespace = {"\n": true, " ": true, "\t": true};
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
  _g104.read = read;
  _g104["read-char"] = read_char;
  _g104["peek-char"] = peek_char;
  _g104.whitespace = whitespace;
  _g104.delimiters = delimiters;
  _g104["read-all"] = read_all;
  _g104.eof = eof;
  _g104["read-table"] = read_table;
  _g104["make-stream"] = make_stream;
  _g104["skip-non-code"] = skip_non_code;
  _g104["read-from-string"] = read_from_string;
})();
(function () {
  var _g105 = nexus.runtime;
  var search = _g105.search;
  var iterate = _g105.iterate;
  var exit = _g105.exit;
  var substring = _g105.substring;
  var join = _g105.join;
  var reverse = _g105.reverse;
  var extend = _g105.extend;
  var table63 = _g105["table?"];
  var char = _g105.char;
  var to_string = _g105["to-string"];
  var splice = _g105.splice;
  var id_literal63 = _g105["id-literal?"];
  var add = _g105.add;
  var keys63 = _g105["keys?"];
  var _61 = _g105["="];
  var _60 = _g105["<"];
  var _62 = _g105[">"];
  var hd = _g105.hd;
  var write_file = _g105["write-file"];
  var setenv = _g105.setenv;
  var nil63 = _g105["nil?"];
  var _43 = _g105["+"];
  var _42 = _g105["*"];
  var _ = _g105["-"];
  var _47 = _g105["/"];
  var _37 = _g105["%"];
  var inner = _g105.inner;
  var length = _g105.length;
  var number63 = _g105["number?"];
  var split = _g105.split;
  var stash = _g105.stash;
  var string63 = _g105["string?"];
  var pairwise = _g105.pairwise;
  var parse_number = _g105["parse-number"];
  var cat = _g105.cat;
  var some63 = _g105["some?"];
  var code = _g105.code;
  var drop = _g105.drop;
  var make_id = _g105["make-id"];
  var tl = _g105.tl;
  var reduce = _g105.reduce;
  var exclude = _g105.exclude;
  var atom63 = _g105["atom?"];
  var function63 = _g105["function?"];
  var empty63 = _g105["empty?"];
  var find = _g105.find;
  var sub = _g105.sub;
  var last = _g105.last;
  var apply = _g105.apply;
  var boolean63 = _g105["boolean?"];
  var sublist = _g105.sublist;
  var string_literal63 = _g105["string-literal?"];
  var map = _g105.map;
  var list63 = _g105["list?"];
  var _37message_handler = _g105["%message-handler"];
  var read_file = _g105["read-file"];
  var replicate = _g105.replicate;
  var is63 = _g105["is?"];
  var composite63 = _g105["composite?"];
  var keep = _g105.keep;
  var unstash = _g105.unstash;
  var _6061 = _g105["<="];
  var write = _g105.write;
  var _6261 = _g105[">="];
  var optimizations = [];
  var optimize;
  add(optimizations, {optimizer: function (form) {
    return(optimize(form[1]));
  }, match: function (form) {
    return(((hd(form) === "do") && (length(form) === 2)));
  }});
  optimize = function (form) {
    if (atom63(form)) {
      return(form);
    } else {
      var _g119 = optimizations;
      var _g120 = 0;
      while ((_g120 < length(_g119))) {
        var _g121 = _g119[_g120];
        var match = _g121.match;
        var optimizer = _g121.optimizer;
        if (match(form)) {
          return(optimizer(form));
        }
        _g120 = (_g120 + 1);
      }
      return(map(optimize, form));
    }
  };
  var _g122 = {};
  nexus.optimizer = _g122;
  _g122.optimize = optimize;
  _g122.optimizations = optimizations;
})();
(function () {
  var _g123 = nexus.runtime;
  var search = _g123.search;
  var iterate = _g123.iterate;
  var exit = _g123.exit;
  var substring = _g123.substring;
  var join = _g123.join;
  var reverse = _g123.reverse;
  var extend = _g123.extend;
  var table63 = _g123["table?"];
  var char = _g123.char;
  var to_string = _g123["to-string"];
  var splice = _g123.splice;
  var id_literal63 = _g123["id-literal?"];
  var add = _g123.add;
  var keys63 = _g123["keys?"];
  var _61 = _g123["="];
  var _60 = _g123["<"];
  var _62 = _g123[">"];
  var hd = _g123.hd;
  var write_file = _g123["write-file"];
  var setenv = _g123.setenv;
  var nil63 = _g123["nil?"];
  var _43 = _g123["+"];
  var _42 = _g123["*"];
  var _ = _g123["-"];
  var _47 = _g123["/"];
  var _37 = _g123["%"];
  var inner = _g123.inner;
  var length = _g123.length;
  var number63 = _g123["number?"];
  var split = _g123.split;
  var stash = _g123.stash;
  var string63 = _g123["string?"];
  var pairwise = _g123.pairwise;
  var parse_number = _g123["parse-number"];
  var cat = _g123.cat;
  var some63 = _g123["some?"];
  var code = _g123.code;
  var drop = _g123.drop;
  var make_id = _g123["make-id"];
  var tl = _g123.tl;
  var reduce = _g123.reduce;
  var exclude = _g123.exclude;
  var atom63 = _g123["atom?"];
  var function63 = _g123["function?"];
  var empty63 = _g123["empty?"];
  var find = _g123.find;
  var sub = _g123.sub;
  var last = _g123.last;
  var apply = _g123.apply;
  var boolean63 = _g123["boolean?"];
  var sublist = _g123.sublist;
  var string_literal63 = _g123["string-literal?"];
  var map = _g123.map;
  var list63 = _g123["list?"];
  var _37message_handler = _g123["%message-handler"];
  var read_file = _g123["read-file"];
  var replicate = _g123.replicate;
  var is63 = _g123["is?"];
  var composite63 = _g123["composite?"];
  var keep = _g123.keep;
  var unstash = _g123.unstash;
  var _6061 = _g123["<="];
  var write = _g123.write;
  var _6261 = _g123[">="];
  var _g124 = nexus.utilities;
  var macroexpand = _g124.macroexpand;
  var valid_id63 = _g124["valid-id?"];
  var bind42 = _g124["bind*"];
  var quote_environment = _g124["quote-environment"];
  var imported = _g124.imported;
  var indentation = _g124.indentation;
  var macro_function = _g124["macro-function"];
  var exported = _g124.exported;
  var initial_environment = _g124["initial-environment"];
  var quote_modules = _g124["quote-modules"];
  var bind = _g124.bind;
  var quasiexpand = _g124.quasiexpand;
  var variable63 = _g124["variable?"];
  var toplevel63 = _g124["toplevel?"];
  var stash42 = _g124["stash*"];
  var module_key = _g124["module-key"];
  var symbol_expansion = _g124["symbol-expansion"];
  var special63 = _g124["special?"];
  var to_id = _g124["to-id"];
  var macro63 = _g124["macro?"];
  var symbol63 = _g124["symbol?"];
  var quoted = _g124.quoted;
  var getenv = _g124.getenv;
  var module = _g124.module;
  var special_form63 = _g124["special-form?"];
  var mapo = _g124.mapo;
  var bound63 = _g124["bound?"];
  var _g127 = nexus.reader;
  var make_stream = _g127["make-stream"];
  var read_all = _g127["read-all"];
  var read_from_string = _g127["read-from-string"];
  var read = _g127.read;
  var read_table = _g127["read-table"];
  var _g128 = nexus.optimizer;
  var optimize = _g128.optimize;
  var infix = {common: {"+": true, "*": true, "-": true, "<": true, "/": true, ">": true, "%": true, "<=": true, ">=": true}, lua: {cat: "..", "=": "==", "or": true, "~=": true, "and": true}, js: {cat: "+", "=": "===", "or": "||", "~=": "!=", "and": "&&"}};
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
    var _g129 = args;
    var i = 0;
    while ((i < length(_g129))) {
      var arg = _g129[i];
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
    var _g130 = unstash(sublist(arguments, 1));
    var tail = _g130.tail;
    var str = "";
    var _g131 = forms;
    var i = 0;
    while ((i < length(_g131))) {
      var x = _g131[i];
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
    var _g132 = getenv(hd(form));
    var stmt = _g132.stmt;
    var self_tr63 = _g132.tr;
    var special = _g132.special;
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
  function compile_infix(_g133) {
    var op = _g133[0];
    var args = sub(_g133, 1);
    var str = "(";
    var _g134 = getop(op);
    var _g135 = args;
    var i = 0;
    while ((i < length(_g135))) {
      var arg = _g135[i];
      if (((_g134 === "-") && (length(args) === 1))) {
        str = (str + _g134 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g134 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_branch(condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g136 = (function () {
      indent_level = (indent_level + 1);
      var _g137 = compile(body, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g137);
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
      return((ind + "if (" + cond1 + ") {\n" + _g136 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g136 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g136 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g136 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g136 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g136 + tr));
    }
  }
  function compile_function(args, body) {
    var _g138 = unstash(sublist(arguments, 2));
    var name = _g138.name;
    var prefix = _g138.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g139 = (prefix || "");
    var _g140 = compile_args(args);
    var _g141 = (function () {
      indent_level = (indent_level + 1);
      var _g142 = compile_body(body, {_stash: true, "tail?": true, tail: true});
      indent_level = (indent_level - 1);
      return(_g142);
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
      return(("function " + id + _g140 + " {\n" + _g141 + ind + "}" + tr));
    } else {
      return((_g139 + "function " + id + _g140 + "\n" + _g141 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g143 = unstash(sublist(arguments, 1));
    var stmt = _g143.stmt;
    var tail = _g143.tail;
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
      var _g144 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g144 + tr));
    }
  };
  function process(form) {
    return(optimize(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g145 = process(body);
    var epilog = process(exported());
    return(join([join(["%function", []], join(_g145, [epilog]))]));
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
    var _g146 = toplevel;
    var name = undefined;
    for (name in _g146) {
      if (isNaN(parseInt(name))) {
        var binding = _g146[name];
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
    var _g147 = unstash(sublist(arguments, 1));
    var all = _g147.all;
    var m = module(spec);
    var frame = last(environment);
    var _g148 = m.export;
    var k = undefined;
    for (k in _g148) {
      if (isNaN(parseInt(k))) {
        var v = _g148[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g149 = unstash(sublist(arguments, 1));
    var all = _g149.all;
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
    var x = compile(process(form1));
    target = previous;
    return(run(x));
  }
  var _g150 = {};
  nexus.compiler = _g150;
  _g150.compile = compile;
  _g150["module-path"] = module_path;
  _g150.infix = infix;
  _g150["compile-function"] = compile_function;
  _g150["compile-body"] = compile_body;
  _g150["compile-special"] = compile_special;
  _g150["compile-infix"] = compile_infix;
  _g150.terminator = terminator;
  _g150["compiler-output"] = compiler_output;
  _g150.eval = eval;
  _g150.run = run;
  _g150["load-module"] = load_module;
  _g150["%compile-module"] = _37compile_module;
  _g150["compile-branch"] = compile_branch;
  _g150["compile-file"] = compile_file;
  _g150.encapsulate = encapsulate;
  _g150["can-return?"] = can_return63;
  _g150["compile-args"] = compile_args;
  _g150["infix?"] = infix63;
  _g150.getop = getop;
  _g150["compile-module"] = compile_module;
  _g150["in-module"] = in_module;
  _g150.prologue = prologue;
  _g150["open-module"] = open_module;
  _g150["compile-call"] = compile_call;
  _g150["compiling?"] = compiling63;
  _g150.process = process;
  _g150["compile-atom"] = compile_atom;
})();
(function () {
  var _g152 = nexus.runtime;
  var search = _g152.search;
  var iterate = _g152.iterate;
  var exit = _g152.exit;
  var substring = _g152.substring;
  var join = _g152.join;
  var reverse = _g152.reverse;
  var extend = _g152.extend;
  var table63 = _g152["table?"];
  var char = _g152.char;
  var to_string = _g152["to-string"];
  var splice = _g152.splice;
  var id_literal63 = _g152["id-literal?"];
  var add = _g152.add;
  var keys63 = _g152["keys?"];
  var _61 = _g152["="];
  var _60 = _g152["<"];
  var _62 = _g152[">"];
  var hd = _g152.hd;
  var write_file = _g152["write-file"];
  var setenv = _g152.setenv;
  var nil63 = _g152["nil?"];
  var _43 = _g152["+"];
  var _42 = _g152["*"];
  var _ = _g152["-"];
  var _47 = _g152["/"];
  var _37 = _g152["%"];
  var inner = _g152.inner;
  var length = _g152.length;
  var number63 = _g152["number?"];
  var split = _g152.split;
  var stash = _g152.stash;
  var string63 = _g152["string?"];
  var pairwise = _g152.pairwise;
  var parse_number = _g152["parse-number"];
  var cat = _g152.cat;
  var some63 = _g152["some?"];
  var code = _g152.code;
  var drop = _g152.drop;
  var make_id = _g152["make-id"];
  var tl = _g152.tl;
  var reduce = _g152.reduce;
  var exclude = _g152.exclude;
  var atom63 = _g152["atom?"];
  var function63 = _g152["function?"];
  var empty63 = _g152["empty?"];
  var find = _g152.find;
  var sub = _g152.sub;
  var last = _g152.last;
  var apply = _g152.apply;
  var boolean63 = _g152["boolean?"];
  var sublist = _g152.sublist;
  var string_literal63 = _g152["string-literal?"];
  var map = _g152.map;
  var list63 = _g152["list?"];
  var _37message_handler = _g152["%message-handler"];
  var read_file = _g152["read-file"];
  var replicate = _g152.replicate;
  var is63 = _g152["is?"];
  var composite63 = _g152["composite?"];
  var keep = _g152.keep;
  var unstash = _g152.unstash;
  var _6061 = _g152["<="];
  var write = _g152.write;
  var _6261 = _g152[">="];
  var _g153 = nexus.utilities;
  var macroexpand = _g153.macroexpand;
  var valid_id63 = _g153["valid-id?"];
  var bind42 = _g153["bind*"];
  var quote_environment = _g153["quote-environment"];
  var imported = _g153.imported;
  var indentation = _g153.indentation;
  var macro_function = _g153["macro-function"];
  var exported = _g153.exported;
  var initial_environment = _g153["initial-environment"];
  var quote_modules = _g153["quote-modules"];
  var bind = _g153.bind;
  var quasiexpand = _g153.quasiexpand;
  var variable63 = _g153["variable?"];
  var toplevel63 = _g153["toplevel?"];
  var stash42 = _g153["stash*"];
  var module_key = _g153["module-key"];
  var symbol_expansion = _g153["symbol-expansion"];
  var special63 = _g153["special?"];
  var to_id = _g153["to-id"];
  var macro63 = _g153["macro?"];
  var symbol63 = _g153["symbol?"];
  var quoted = _g153.quoted;
  var getenv = _g153.getenv;
  var module = _g153.module;
  var special_form63 = _g153["special-form?"];
  var mapo = _g153.mapo;
  var bound63 = _g153["bound?"];
  var _g156 = nexus.compiler;
  var compile = _g156.compile;
  var compile_call = _g156["compile-call"];
  var compile_body = _g156["compile-body"];
  var open_module = _g156["open-module"];
  var compile_special = _g156["compile-special"];
  var compile_module = _g156["compile-module"];
  var eval = _g156.eval;
  var load_module = _g156["load-module"];
  var compile_function = _g156["compile-function"];
  var compile_branch = _g156["compile-branch"];
  var in_module = _g156["in-module"];
})();
(function () {
  var _g342 = nexus.runtime;
  var search = _g342.search;
  var iterate = _g342.iterate;
  var exit = _g342.exit;
  var substring = _g342.substring;
  var join = _g342.join;
  var reverse = _g342.reverse;
  var extend = _g342.extend;
  var table63 = _g342["table?"];
  var char = _g342.char;
  var to_string = _g342["to-string"];
  var splice = _g342.splice;
  var id_literal63 = _g342["id-literal?"];
  var add = _g342.add;
  var keys63 = _g342["keys?"];
  var _61 = _g342["="];
  var _60 = _g342["<"];
  var _62 = _g342[">"];
  var hd = _g342.hd;
  var write_file = _g342["write-file"];
  var setenv = _g342.setenv;
  var nil63 = _g342["nil?"];
  var _43 = _g342["+"];
  var _42 = _g342["*"];
  var _ = _g342["-"];
  var _47 = _g342["/"];
  var _37 = _g342["%"];
  var inner = _g342.inner;
  var length = _g342.length;
  var number63 = _g342["number?"];
  var split = _g342.split;
  var stash = _g342.stash;
  var string63 = _g342["string?"];
  var pairwise = _g342.pairwise;
  var parse_number = _g342["parse-number"];
  var cat = _g342.cat;
  var some63 = _g342["some?"];
  var code = _g342.code;
  var drop = _g342.drop;
  var make_id = _g342["make-id"];
  var tl = _g342.tl;
  var reduce = _g342.reduce;
  var exclude = _g342.exclude;
  var atom63 = _g342["atom?"];
  var function63 = _g342["function?"];
  var empty63 = _g342["empty?"];
  var find = _g342.find;
  var sub = _g342.sub;
  var last = _g342.last;
  var apply = _g342.apply;
  var boolean63 = _g342["boolean?"];
  var sublist = _g342.sublist;
  var string_literal63 = _g342["string-literal?"];
  var map = _g342.map;
  var list63 = _g342["list?"];
  var _37message_handler = _g342["%message-handler"];
  var read_file = _g342["read-file"];
  var replicate = _g342.replicate;
  var is63 = _g342["is?"];
  var composite63 = _g342["composite?"];
  var keep = _g342.keep;
  var unstash = _g342.unstash;
  var _6061 = _g342["<="];
  var write = _g342.write;
  var _6261 = _g342[">="];
  var _g343 = nexus.utilities;
  var macroexpand = _g343.macroexpand;
  var valid_id63 = _g343["valid-id?"];
  var bind42 = _g343["bind*"];
  var quote_environment = _g343["quote-environment"];
  var imported = _g343.imported;
  var indentation = _g343.indentation;
  var macro_function = _g343["macro-function"];
  var exported = _g343.exported;
  var initial_environment = _g343["initial-environment"];
  var quote_modules = _g343["quote-modules"];
  var bind = _g343.bind;
  var quasiexpand = _g343.quasiexpand;
  var variable63 = _g343["variable?"];
  var toplevel63 = _g343["toplevel?"];
  var stash42 = _g343["stash*"];
  var module_key = _g343["module-key"];
  var symbol_expansion = _g343["symbol-expansion"];
  var special63 = _g343["special?"];
  var to_id = _g343["to-id"];
  var macro63 = _g343["macro?"];
  var symbol63 = _g343["symbol?"];
  var quoted = _g343.quoted;
  var getenv = _g343.getenv;
  var module = _g343.module;
  var special_form63 = _g343["special-form?"];
  var mapo = _g343.mapo;
  var bound63 = _g343["bound?"];
  var _g346 = nexus.compiler;
  var compile = _g346.compile;
  var compile_call = _g346["compile-call"];
  var compile_body = _g346["compile-body"];
  var open_module = _g346["open-module"];
  var compile_special = _g346["compile-special"];
  var compile_module = _g346["compile-module"];
  var eval = _g346.eval;
  var load_module = _g346["load-module"];
  var compile_function = _g346["compile-function"];
  var compile_branch = _g346["compile-branch"];
  var in_module = _g346["in-module"];
  global.target = "js";
})();
(function () {
  var _g622 = nexus.runtime;
  var search = _g622.search;
  var iterate = _g622.iterate;
  var exit = _g622.exit;
  var substring = _g622.substring;
  var join = _g622.join;
  var reverse = _g622.reverse;
  var extend = _g622.extend;
  var table63 = _g622["table?"];
  var char = _g622.char;
  var to_string = _g622["to-string"];
  var splice = _g622.splice;
  var id_literal63 = _g622["id-literal?"];
  var add = _g622.add;
  var keys63 = _g622["keys?"];
  var _61 = _g622["="];
  var _60 = _g622["<"];
  var _62 = _g622[">"];
  var hd = _g622.hd;
  var write_file = _g622["write-file"];
  var setenv = _g622.setenv;
  var nil63 = _g622["nil?"];
  var _43 = _g622["+"];
  var _42 = _g622["*"];
  var _ = _g622["-"];
  var _47 = _g622["/"];
  var _37 = _g622["%"];
  var inner = _g622.inner;
  var length = _g622.length;
  var number63 = _g622["number?"];
  var split = _g622.split;
  var stash = _g622.stash;
  var string63 = _g622["string?"];
  var pairwise = _g622.pairwise;
  var parse_number = _g622["parse-number"];
  var cat = _g622.cat;
  var some63 = _g622["some?"];
  var code = _g622.code;
  var drop = _g622.drop;
  var make_id = _g622["make-id"];
  var tl = _g622.tl;
  var reduce = _g622.reduce;
  var exclude = _g622.exclude;
  var atom63 = _g622["atom?"];
  var function63 = _g622["function?"];
  var empty63 = _g622["empty?"];
  var find = _g622.find;
  var sub = _g622.sub;
  var last = _g622.last;
  var apply = _g622.apply;
  var boolean63 = _g622["boolean?"];
  var sublist = _g622.sublist;
  var string_literal63 = _g622["string-literal?"];
  var map = _g622.map;
  var list63 = _g622["list?"];
  var _37message_handler = _g622["%message-handler"];
  var read_file = _g622["read-file"];
  var replicate = _g622.replicate;
  var is63 = _g622["is?"];
  var composite63 = _g622["composite?"];
  var keep = _g622.keep;
  var unstash = _g622.unstash;
  var _6061 = _g622["<="];
  var write = _g622.write;
  var _6261 = _g622[">="];
  var _g623 = nexus.utilities;
  var macroexpand = _g623.macroexpand;
  var valid_id63 = _g623["valid-id?"];
  var bind42 = _g623["bind*"];
  var quote_environment = _g623["quote-environment"];
  var imported = _g623.imported;
  var indentation = _g623.indentation;
  var macro_function = _g623["macro-function"];
  var exported = _g623.exported;
  var initial_environment = _g623["initial-environment"];
  var quote_modules = _g623["quote-modules"];
  var bind = _g623.bind;
  var quasiexpand = _g623.quasiexpand;
  var variable63 = _g623["variable?"];
  var toplevel63 = _g623["toplevel?"];
  var stash42 = _g623["stash*"];
  var module_key = _g623["module-key"];
  var symbol_expansion = _g623["symbol-expansion"];
  var special63 = _g623["special?"];
  var to_id = _g623["to-id"];
  var macro63 = _g623["macro?"];
  var symbol63 = _g623["symbol?"];
  var quoted = _g623.quoted;
  var getenv = _g623.getenv;
  var module = _g623.module;
  var special_form63 = _g623["special-form?"];
  var mapo = _g623.mapo;
  var bound63 = _g623["bound?"];
  var _g626 = nexus.compiler;
  var compile = _g626.compile;
  var compile_call = _g626["compile-call"];
  var compile_body = _g626["compile-body"];
  var open_module = _g626["open-module"];
  var compile_special = _g626["compile-special"];
  var compile_module = _g626["compile-module"];
  var eval = _g626.eval;
  var load_module = _g626["load-module"];
  var compile_function = _g626["compile-function"];
  var compile_branch = _g626["compile-branch"];
  var in_module = _g626["in-module"];
  global.modules = {special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"while": {special: function (_g639) {
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
  }, module: "special", stmt: true, export: true, tr: true}, "%for": {special: function (_g643) {
    var _g644 = _g643[0];
    var t = _g644[0];
    var k = _g644[1];
    var body = sub(_g643, 1);
    var _g645 = compile(t);
    var ind = indentation();
    var _g646 = (function () {
      indent_level = (indent_level + 1);
      var _g647 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g647);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g645 + " do\n" + _g646 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g645 + ") {\n" + _g646 + ind + "}\n"));
    }
  }, module: "special", stmt: true, export: true, tr: true}, "%object": {special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g648 = pairs;
    var i = 0;
    while ((i < length(_g648))) {
      var _g649 = _g648[i];
      var k = _g649[0];
      var v = _g649[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g650 = compile(v);
      var _g651 = (function () {
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
      str = (str + _g651 + sep + _g650);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "%local-function": {special: function (_g652) {
    var name = _g652[0];
    var args = _g652[1];
    var body = sub(_g652, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, module: "special", stmt: true, export: true, tr: true}, "not": {special: function (_g653) {
    var x = _g653[0];
    var _g654 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g654 + ")"));
  }, module: "special", export: true}, "error": {stmt: true, export: true, module: "special", special: function (_g655) {
    var x = _g655[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(join(["Error", x]))));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "do": {special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, module: "special", stmt: true, export: true, tr: true}, "return": {stmt: true, export: true, module: "special", special: function (_g656) {
    var x = _g656[0];
    var _g657 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g657));
  }}, "get": {special: function (_g658) {
    var t = _g658[0];
    var k = _g658[1];
    var _g659 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g659, 0) === "{"))) {
      _g659 = ("(" + _g659 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g659 + "." + inner(k)));
    } else {
      return((_g659 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "%try": {special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g660 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g660);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g661 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g661);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, module: "special", stmt: true, export: true, tr: true}, "%array": {special: function (forms) {
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
    var _g662 = forms;
    var i = 0;
    while ((i < length(_g662))) {
      var x = _g662[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "set": {stmt: true, export: true, module: "special", special: function (_g663) {
    var lh = _g663[0];
    var rh = _g663[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "%global-function": {special: function (_g664) {
    var name = _g664[0];
    var args = _g664[1];
    var body = sub(_g664, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, module: "special", stmt: true, export: true, tr: true}, "break": {stmt: true, export: true, module: "special", special: function (_g151) {
    return((indentation() + "break"));
  }}, "%function": {special: function (_g665) {
    var args = _g665[0];
    var body = sub(_g665, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "%local": {stmt: true, export: true, module: "special", special: function (_g666) {
    var name = _g666[0];
    var value = _g666[1];
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
  }}, "if": {special: function (form, tail63) {
    var str = "";
    var _g667 = form;
    var i = 0;
    while ((i < length(_g667))) {
      var condition = _g667[i];
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
  }, module: "special", stmt: true, export: true, tr: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g668 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g668))) {
      var _g669 = bind42(x, _g668);
      var args = _g669[0];
      var _g670 = _g669[1];
      return(join(["%global-function", name, args], _g670));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g671 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g671))) {
      var _g672 = bind42(x, _g671);
      var args = _g672[0];
      var _g673 = _g672[1];
      return(join(["%local-function", name, args], _g673));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, export: true, module: "core", global: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g674 = sub(body, 0);
    var form = join(["fn", args], _g674);
    var keys = sub(_g674, length(_g674));
    eval(join((function () {
      var _g675 = ["setenv", join(["quote", name])];
      _g675.special = form;
      _g675.form = join(["quote", form]);
      return(_g675);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g341, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g676 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g676)]));
  }, module: "core", export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g677 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g677), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g678 = ["target"];
          _g678.lua = join(["not", join(["number?", k])]);
          _g678.js = join(["isNaN", join(["parseInt", k])]);
          return(_g678);
        })()), join(["let", join([v, join(["get", t1, k])])], _g677)])])]));
      }
    })()]));
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g679 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g679)]));
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g680 = sub(body, 0);
    var _g681 = bind42(args, _g680);
    var _g682 = _g681[0];
    var _g683 = _g681[1];
    return(join(["%function", _g682], _g683));
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "with-bindings": {macro: function (_g684) {
    var names = _g684[0];
    var body = unstash(sublist(arguments, 1));
    var _g685 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g686 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g687 = ["setenv", x];
        _g687.variable = true;
        return(_g687);
      })())])];
      _g686.scope = true;
      return(_g686);
    })(), _g685));
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g688 = sub(body, 0);
    var form = join(["fn", args], _g688);
    eval(join((function () {
      var _g689 = ["setenv", join(["quote", name])];
      _g689.macro = form;
      _g689.form = join(["quote", form]);
      return(_g689);
    })()));
    return(undefined);
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g690 = body;
      var k = undefined;
      for (k in _g690) {
        if (isNaN(parseInt(k))) {
          var v = _g690[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g691 = sub(body, 0);
    add(environment, {});
    var _g692 = (function () {
      map(function (_g693) {
        var name = _g693[0];
        var exp = _g693[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g691)));
    })();
    drop(environment);
    return(_g692);
  }, module: "core", export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g694 = sub(body, 0);
    var imports = [];
    var imp = _g694.import;
    var exp = _g694.export;
    var _g695 = (imp || []);
    var _g696 = 0;
    while ((_g696 < length(_g695))) {
      var k = _g695[_g696];
      load_module(k);
      imports = join(imports, imported(k));
      _g696 = (_g696 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g697 = (exp || []);
    var _g698 = 0;
    while ((_g698 < length(_g697))) {
      var k = _g697[_g698];
      setenv(k, {_stash: true, export: true});
      _g698 = (_g698 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g699 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g700) {
      var lh = _g700[0];
      var rh = _g700[1];
      var _g701 = bind(lh, rh);
      var _g702 = 0;
      while ((_g702 < length(_g701))) {
        var _g703 = _g701[_g702];
        var id = _g703[0];
        var val = _g703[1];
        if ((bound63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g702 = (_g702 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g699)])));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g704 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g704)]));
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
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g705 = elements;
    var _g706 = 0;
    while ((_g706 < length(_g705))) {
      var e = _g705[_g706];
      l[e] = true;
      _g706 = (_g706 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g707 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g708 = ["table"];
      _g708._scope = scope;
      return(_g708);
    })())]), join(["let", join([x, join(["do"], _g707)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g709 = xs;
      var i = 0;
      while ((i < length(_g709))) {
        var x = _g709[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g710 = sub(body, 0);
    add(environment, {});
    var _g711 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g710)));
    })();
    drop(environment);
    return(_g711);
  }, module: "core", export: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader", "optimizer"], export: {"compile-atom": {variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, process: {variable: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, "compiling?": {variable: true, module: "compiler"}, "open-module": {export: true, variable: true, module: "compiler"}, prologue: {variable: true, module: "compiler"}, "%compile-module": {variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}, "module-path": {variable: true, module: "compiler"}, "compile-module": {export: true, variable: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, run: {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, infix: {variable: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, "can-return?": {variable: true, module: "compiler"}, "compile-infix": {variable: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, "current-module": {export: true, module: "compiler", global: true}, "compiler-output": {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, terminator: {variable: true, module: "compiler"}, encapsulate: {variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}}}, system: {import: ["special", "core"], export: {nexus: {export: true, module: "system", global: true}}}, utilities: {import: ["runtime", "special", "core"], export: {"quasisplice?": {variable: true, module: "utilities"}, "quote-frame": {variable: true, module: "utilities"}, macroexpand: {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "bind*": {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "quasiquote-list": {variable: true, module: "utilities"}, "quoting?": {variable: true, module: "utilities"}, "numeric?": {variable: true, module: "utilities"}, "quote-binding": {variable: true, module: "utilities"}, indentation: {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, "quasiquoting?": {variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, "toplevel?": {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, module: "utilities", global: true}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, reserved: {variable: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, escape: {variable: true, module: "utilities"}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "quote-module": {variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, "valid-char?": {variable: true, module: "utilities"}, module: {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, mapo: {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "can-unquote?": {variable: true, module: "utilities"}, "global?": {variable: true, module: "utilities"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {delimiters: {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, whitespace: {variable: true, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}, read: {export: true, variable: true, module: "reader"}, "skip-non-code": {variable: true, module: "reader"}, "read-table": {export: true, variable: true, module: "reader"}, eof: {variable: true, module: "reader"}, "define-reader": {export: true, module: "reader", macro: function (_g712) {
    var char = _g712[0];
    var stream = _g712[1];
    var body = unstash(sublist(arguments, 1));
    var _g713 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g713)]));
  }}, "flag?": {variable: true, module: "reader"}, "read-char": {variable: true, module: "reader"}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimize: {export: true, variable: true, module: "optimizer"}, "define-optimization": {macro: function (_g714) {
    var form = _g714[0];
    var body = unstash(sublist(arguments, 1));
    var _g715 = sub(body, 0);
    return(join(["add", "optimizations", join((function () {
      var _g716 = ["table"];
      _g716.optimizer = join(["fn", join([form])], _g715);
      _g716.match = join(["fn", join([form]), _g715.match]);
      return(_g716);
    })())]));
  }, module: "optimizer"}, optimizations: {variable: true, module: "optimizer"}}}, runtime: {import: ["special", "core"], export: {search: {export: true, variable: true, module: "runtime"}, mapl: {variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, "id-count": {variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, fs: {variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, print: {export: true, module: "runtime", global: true}, "empty?": {export: true, variable: true, module: "runtime"}, "splice?": {variable: true, module: "runtime"}, require: {export: true, module: "runtime", global: true}, find: {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, type: {variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {}}, lib: {import: ["core", "special"], export: {}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g717 = sub(body, 0);
    var imports = [];
    var imp = _g717.import;
    var exp = _g717.export;
    var _g718 = (imp || []);
    var _g719 = 0;
    while ((_g719 < length(_g718))) {
      var k = _g718[_g719];
      load_module(k);
      imports = join(imports, imported(k));
      _g719 = (_g719 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g720 = (exp || []);
    var _g721 = 0;
    while ((_g721 < length(_g720))) {
      var k = _g720[_g721];
      setenv(k, {_stash: true, export: true});
      _g721 = (_g721 + 1);
    }
    return(join(["do"], imports));
  }, module: "core", export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var search = _g2.search;
  var iterate = _g2.iterate;
  var exit = _g2.exit;
  var substring = _g2.substring;
  var join = _g2.join;
  var reverse = _g2.reverse;
  var sub = _g2.sub;
  var table63 = _g2["table?"];
  var char = _g2.char;
  var to_string = _g2["to-string"];
  var splice = _g2.splice;
  var id_literal63 = _g2["id-literal?"];
  var add = _g2.add;
  var keys63 = _g2["keys?"];
  var keep = _g2.keep;
  var _60 = _g2["<"];
  var _62 = _g2[">"];
  var hd = _g2.hd;
  var write_file = _g2["write-file"];
  var setenv = _g2.setenv;
  var nil63 = _g2["nil?"];
  var _43 = _g2["+"];
  var _42 = _g2["*"];
  var _ = _g2["-"];
  var _47 = _g2["/"];
  var _37 = _g2["%"];
  var inner = _g2.inner;
  var length = _g2.length;
  var number63 = _g2["number?"];
  var map = _g2.map;
  var stash = _g2.stash;
  var string63 = _g2["string?"];
  var boolean63 = _g2["boolean?"];
  var parse_number = _g2["parse-number"];
  var cat = _g2.cat;
  var some63 = _g2["some?"];
  var code = _g2.code;
  var drop = _g2.drop;
  var composite63 = _g2["composite?"];
  var tl = _g2.tl;
  var reduce = _g2.reduce;
  var exclude = _g2.exclude;
  var atom63 = _g2["atom?"];
  var function63 = _g2["function?"];
  var empty63 = _g2["empty?"];
  var find = _g2.find;
  var unstash = _g2.unstash;
  var apply = _g2.apply;
  var make_id = _g2["make-id"];
  var sublist = _g2.sublist;
  var string_literal63 = _g2["string-literal?"];
  var write = _g2.write;
  var read_file = _g2["read-file"];
  var list63 = _g2["list?"];
  var _37message_handler = _g2["%message-handler"];
  var last = _g2.last;
  var replicate = _g2.replicate;
  var is63 = _g2["is?"];
  var _61 = _g2["="];
  var split = _g2.split;
  var extend = _g2.extend;
  var _6061 = _g2["<="];
  var pairwise = _g2.pairwise;
  var _6261 = _g2[">="];
  var _g5 = nexus.reader;
  var read = _g5.read;
  var read_from_string = _g5["read-from-string"];
  var make_stream = _g5["make-stream"];
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var _g6 = nexus.compiler;
  var compile = _g6.compile;
  var compile_call = _g6["compile-call"];
  var compile_body = _g6["compile-body"];
  var compile_special = _g6["compile-special"];
  var open_module = _g6["open-module"];
  var eval = _g6.eval;
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  var compile_module = _g6["compile-module"];
  var compile_branch = _g6["compile-branch"];
  var in_module = _g6["in-module"];
  function rep(str) {
    var _g723 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g726) {
        return([false, _g726.message]);
      }
    })();
    var _g1 = _g723[0];
    var x = _g723[1];
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
    var _g724 = args;
    var i = 0;
    while ((i < length(_g724))) {
      var arg = _g724[i];
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
  var _g725 = {};
  nexus.main = _g725;
  _g725.repl = repl;
  _g725.usage = usage;
  _g725.rep = rep;
  _g725.main = main;
})();
