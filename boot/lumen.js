(function () {
  global.nexus = {};
  return;
})();
(function () {
  length = function (x) {
    return(x.length);
  };
  empty63 = function (x) {
    return((length(x) === 0));
  };
  some63 = function (x) {
    return((length(x) > 0));
  };
  substring = function (str, from, upto) {
    return((str.substring)(from, upto));
  };
  sublist = function (l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  };
  sub = function (x, from, upto) {
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
  };
  inner = function (x) {
    return(sub(x, 1, (length(x) - 1)));
  };
  hd = function (l) {
    return(l[0]);
  };
  tl = function (l) {
    return(sub(l, 1));
  };
  add = function (l, x) {
    return((l.push)(x));
  };
  drop = function (l) {
    return((l.pop)());
  };
  last = function (l) {
    return(l[(length(l) - 1)]);
  };
  reverse = function (l) {
    var l1 = [];
    var i = (length(l) - 1);
    while ((i >= 0)) {
      add(l1, l[i]);
      i = (i - 1);
    }
    return(l1);
  };
  join = function (l1, l2) {
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
  };
  reduce = function (f, x) {
    if (empty63(x)) {
      return(x);
    } else if ((length(x) === 1)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  };
  keep = function (f, l) {
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
  };
  find = function (f, l) {
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
  };
  pairwise = function (l) {
    var i = 0;
    var l1 = [];
    while ((i < length(l))) {
      add(l1, [l[i], l[(i + 1)]]);
      i = (i + 2);
    }
    return(l1);
  };
  iterate = function (f, count) {
    var i = 0;
    while ((i < count)) {
      f(i);
      i = (i + 1);
    }
  };
  replicate = function (n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  };
  splice = function (x) {
    return({_splice: x});
  };
  function splice63(x) {
    if (table63(x)) {
      return(x._splice);
    }
  }
  map = function (f, l) {
    var l1 = [];
    var _g14 = 0;
    var _g13 = l;
    while ((_g14 < length(_g13))) {
      var x = _g13[_g14];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g14 = (_g14 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
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
  };
  mapt = function (f, t) {
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
  };
  mapo = function (f, t) {
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
  };
  keys63 = function (t) {
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
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g19 = sub(xs, 0);
    return(join(t, _g19));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g20 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g21 = t;
    for (k in _g21) {
      if (isNaN(parseInt(k))) {
        var v = _g21[k];
        if (!(_g20[k])) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  };
  char = function (str, n) {
    return((str.charAt)(n));
  };
  code = function (str, n) {
    return((str.charCodeAt)(n));
  };
  search = function (str, pattern, start) {
    var i = (str.indexOf)(pattern, start);
    if ((i >= 0)) {
      return(i);
    }
  };
  split = function (str, sep) {
    return((str.split)(sep));
  };
  cat = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g22 = sub(xs, 0);
    if (empty63(_g22)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g22));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g23 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g23));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g24 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g24)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g25 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g25));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g26 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g26)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g27)));
  };
  _62 = function (a, b) {
    return((a > b));
  };
  _60 = function (a, b) {
    return((a < b));
  };
  _61 = function (a, b) {
    return((a === b));
  };
  _6261 = function (a, b) {
    return((a >= b));
  };
  _6061 = function (a, b) {
    return((a <= b));
  };
  fs = require("fs");
  read_file = function (path) {
    return((fs.readFileSync)(path, "utf8"));
  };
  write_file = function (path, data) {
    return((fs.writeFileSync)(path, data, "utf8"));
  };
  print = function (x) {
    return((console.log)(x));
  };
  write = function (x) {
    return((process.stdout.write)(x));
  };
  exit = function (code) {
    return((process.exit)(code));
  };
  type = function (x) {
    return(typeof(x));
  };
  nil63 = function (x) {
    return((x === undefined));
  };
  is63 = function (x) {
    return(!(nil63(x)));
  };
  string63 = function (x) {
    return((type(x) === "string"));
  };
  string_literal63 = function (x) {
    return((string63(x) && (char(x, 0) === "\"")));
  };
  id_literal63 = function (x) {
    return((string63(x) && (char(x, 0) === "|")));
  };
  number63 = function (x) {
    return((type(x) === "number"));
  };
  boolean63 = function (x) {
    return((type(x) === "boolean"));
  };
  function63 = function (x) {
    return((type(x) === "function"));
  };
  composite63 = function (x) {
    return((type(x) === "object"));
  };
  atom63 = function (x) {
    return(!(composite63(x)));
  };
  table63 = function (x) {
    return((composite63(x) && nil63(hd(x))));
  };
  list63 = function (x) {
    return((composite63(x) && is63(hd(x))));
  };
  parse_number = function (str) {
    var n = parseFloat(str);
    if (!(isNaN(n))) {
      return(n);
    }
  };
  to_string = function (x) {
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
      var _g28 = x;
      for (k in _g28) {
        if (isNaN(parseInt(k))) {
          var v = _g28[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g29 = x1;
      while ((i < length(_g29))) {
        var y = _g29[i];
        str = (str + to_string(y));
        if ((i < (length(x1) - 1))) {
          str = (str + " ");
        }
        i = (i + 1);
      }
      return((str + ")"));
    }
  };
  apply = function (f, args) {
    var _g30 = stash(args);
    return((f.apply)(f, _g30));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g31 = args;
      for (k in _g31) {
        if (isNaN(parseInt(k))) {
          var v = _g31[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  };
  unstash = function (args) {
    if (empty63(args)) {
      return([]);
    } else {
      var l = last(args);
      if ((table63(l) && l._stash)) {
        var args1 = sub(args, 0, (length(args) - 1));
        var k = undefined;
        var _g32 = l;
        for (k in _g32) {
          if (isNaN(parseInt(k))) {
            var v = _g32[k];
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
  };
  _37message_handler = function (msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  };
  _g33 = {};
  nexus.runtime = _g33;
  _g33.length = length;
  _g33["empty?"] = empty63;
  _g33["some?"] = some63;
  _g33.substring = substring;
  _g33.sublist = sublist;
  _g33.sub = sub;
  _g33.inner = inner;
  _g33.hd = hd;
  _g33.tl = tl;
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
  _g33["map*"] = map42;
  _g33.mapt = mapt;
  _g33.mapo = mapo;
  _g33["keys?"] = keys63;
  _g33.extend = extend;
  _g33.exclude = exclude;
  _g33.char = char;
  _g33.code = code;
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
  _g33.print = print;
  _g33.write = write;
  _g33.exit = exit;
  _g33.type = type;
  _g33["nil?"] = nil63;
  _g33["is?"] = is63;
  _g33["string?"] = string63;
  _g33["string-literal?"] = string_literal63;
  _g33["id-literal?"] = id_literal63;
  _g33["number?"] = number63;
  _g33["boolean?"] = boolean63;
  _g33["function?"] = function63;
  _g33["composite?"] = composite63;
  _g33["atom?"] = atom63;
  _g33["table?"] = table63;
  _g33["list?"] = list63;
  _g33["parse-number"] = parse_number;
  _g33["to-string"] = to_string;
  _g33.apply = apply;
  _g33.stash = stash;
  _g33.unstash = unstash;
  _g33["%message-handler"] = _37message_handler;
})();
(function () {
  var _g40 = nexus.runtime;
  var length = _g40.length;
  var empty63 = _g40["empty?"];
  var some63 = _g40["some?"];
  var substring = _g40.substring;
  var sublist = _g40.sublist;
  var sub = _g40.sub;
  var inner = _g40.inner;
  var hd = _g40.hd;
  var tl = _g40.tl;
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
  var map42 = _g40["map*"];
  var mapt = _g40.mapt;
  var mapo = _g40.mapo;
  var keys63 = _g40["keys?"];
  var extend = _g40.extend;
  var exclude = _g40.exclude;
  var char = _g40.char;
  var code = _g40.code;
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
  var print = _g40.print;
  var write = _g40.write;
  var exit = _g40.exit;
  var type = _g40.type;
  var nil63 = _g40["nil?"];
  var is63 = _g40["is?"];
  var string63 = _g40["string?"];
  var string_literal63 = _g40["string-literal?"];
  var id_literal63 = _g40["id-literal?"];
  var number63 = _g40["number?"];
  var boolean63 = _g40["boolean?"];
  var function63 = _g40["function?"];
  var composite63 = _g40["composite?"];
  var atom63 = _g40["atom?"];
  var table63 = _g40["table?"];
  var list63 = _g40["list?"];
  var parse_number = _g40["parse-number"];
  var to_string = _g40["to-string"];
  var apply = _g40.apply;
  var stash = _g40.stash;
  var unstash = _g40.unstash;
  var _37message_handler = _g40["%message-handler"];
  setenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g41 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g42 = _g41;
      for (k1 in _g42) {
        if (isNaN(parseInt(k1))) {
          var v = _g42[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  };
  getenv = function (k) {
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
  };
  macro_function = function (k) {
    return(getenv(k, {_stash: true, macro: true}));
  };
  macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  special63 = function (k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  };
  special_form63 = function (form) {
    return((list63(form) && special63(hd(form))));
  };
  symbol_expansion = function (k) {
    return(getenv(k, {_stash: true, symbol: true}));
  };
  symbol63 = function (k) {
    return(is63(symbol_expansion(k)));
  };
  variable63 = function (k) {
    var b = find(function (frame) {
      return((frame[k] || frame._scope));
    }, reverse(environment));
    return((table63(b) && is63(b.variable)));
  };
  global63 = function (k) {
    return(getenv(k, {_stash: true, global: true}));
  };
  bound63 = function (x) {
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x)));
  };
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
  quoted = function (form) {
    if (string63(form)) {
      return(escape(form));
    } else if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map42(quoted, form)));
    }
  };
  stash42 = function (args) {
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
  };
  var id_count = 0;
  make_id = function () {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  };
  bind = function (lh, rh) {
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
  };
  bind42 = function (args, body) {
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
  };
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
  macroexpand = function (form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if ((x === "%for")) {
        var _g35 = form[0];
        var _g50 = form[1];
        var t = _g50[0];
        var k = _g50[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g36 = form[0];
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
        var _g37 = form[0];
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
  };
  function quasiquote_list(form, depth) {
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
  }
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
  indentation = function () {
    return(apply(cat, replicate(indent_level, "  ")));
  };
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }
  valid_id63 = function (id) {
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
  };
  to_id = function (id) {
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
  };
  module_key = function (spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw "Unsupported module specification";
    }
  };
  exported = function () {
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
  };
  imported = function (k) {
    var imports = [];
    var x = nexus[k];
    if ((x && keys63(x))) {
      var m = make_id();
      add(imports, join(["%local", m, join(["get", "nexus", join(["quote", k])])]));
      var b = undefined;
      var _g68 = x;
      for (b in _g68) {
        if (isNaN(parseInt(b))) {
          var _g38 = _g68[b];
          add(imports, join(["%local", b, join(["get", m, join(["quote", b])])]));
        }
      }
      return(join(["do"], imports));
    }
  };
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
    return(join(["%object"], mapo(function (_g39, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    return(join((function () {
      var _g69 = ["table"];
      _g69.import = quoted(m.import);
      _g69.export = quote_frame(m.export);
      return(_g69);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g70 = {};
  nexus.utilities = _g70;
  _g70.setenv = setenv;
  _g70.getenv = getenv;
  _g70["macro-function"] = macro_function;
  _g70["macro?"] = macro63;
  _g70["special?"] = special63;
  _g70["special-form?"] = special_form63;
  _g70["symbol-expansion"] = symbol_expansion;
  _g70["symbol?"] = symbol63;
  _g70["variable?"] = variable63;
  _g70["bound?"] = bound63;
  _g70.quoted = quoted;
  _g70["stash*"] = stash42;
  _g70.bind = bind;
  _g70["bind*"] = bind42;
  _g70.quasiexpand = quasiexpand;
  _g70.macroexpand = macroexpand;
  _g70.indentation = indentation;
  _g70["valid-id?"] = valid_id63;
  _g70["to-id"] = to_id;
  _g70["module-key"] = module_key;
  _g70.imported = imported;
  _g70.exported = exported;
  _g70["quote-environment"] = quote_environment;
  _g70["quote-modules"] = quote_modules;
  _g70["initial-environment"] = initial_environment;
})();
(function () {
  var _g72 = nexus.runtime;
  var length = _g72.length;
  var empty63 = _g72["empty?"];
  var some63 = _g72["some?"];
  var substring = _g72.substring;
  var sublist = _g72.sublist;
  var sub = _g72.sub;
  var inner = _g72.inner;
  var hd = _g72.hd;
  var tl = _g72.tl;
  var add = _g72.add;
  var drop = _g72.drop;
  var last = _g72.last;
  var reverse = _g72.reverse;
  var join = _g72.join;
  var reduce = _g72.reduce;
  var keep = _g72.keep;
  var find = _g72.find;
  var pairwise = _g72.pairwise;
  var iterate = _g72.iterate;
  var replicate = _g72.replicate;
  var splice = _g72.splice;
  var map = _g72.map;
  var map42 = _g72["map*"];
  var mapt = _g72.mapt;
  var mapo = _g72.mapo;
  var keys63 = _g72["keys?"];
  var extend = _g72.extend;
  var exclude = _g72.exclude;
  var char = _g72.char;
  var code = _g72.code;
  var search = _g72.search;
  var split = _g72.split;
  var cat = _g72.cat;
  var _43 = _g72["+"];
  var _ = _g72["-"];
  var _42 = _g72["*"];
  var _47 = _g72["/"];
  var _37 = _g72["%"];
  var _62 = _g72[">"];
  var _60 = _g72["<"];
  var _61 = _g72["="];
  var _6261 = _g72[">="];
  var _6061 = _g72["<="];
  var read_file = _g72["read-file"];
  var write_file = _g72["write-file"];
  var print = _g72.print;
  var write = _g72.write;
  var exit = _g72.exit;
  var type = _g72.type;
  var nil63 = _g72["nil?"];
  var is63 = _g72["is?"];
  var string63 = _g72["string?"];
  var string_literal63 = _g72["string-literal?"];
  var id_literal63 = _g72["id-literal?"];
  var number63 = _g72["number?"];
  var boolean63 = _g72["boolean?"];
  var function63 = _g72["function?"];
  var composite63 = _g72["composite?"];
  var atom63 = _g72["atom?"];
  var table63 = _g72["table?"];
  var list63 = _g72["list?"];
  var parse_number = _g72["parse-number"];
  var to_string = _g72["to-string"];
  var apply = _g72.apply;
  var stash = _g72.stash;
  var unstash = _g72.unstash;
  var _37message_handler = _g72["%message-handler"];
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
  _g76 = {};
  nexus.reader = _g76;
  _g76["make-stream"] = make_stream;
  _g76["read-table"] = read_table;
  _g76.read = read;
  _g76["read-all"] = read_all;
  _g76["read-from-string"] = read_from_string;
})();
(function () {
  var _g78 = nexus.runtime;
  var length = _g78.length;
  var empty63 = _g78["empty?"];
  var some63 = _g78["some?"];
  var substring = _g78.substring;
  var sublist = _g78.sublist;
  var sub = _g78.sub;
  var inner = _g78.inner;
  var hd = _g78.hd;
  var tl = _g78.tl;
  var add = _g78.add;
  var drop = _g78.drop;
  var last = _g78.last;
  var reverse = _g78.reverse;
  var join = _g78.join;
  var reduce = _g78.reduce;
  var keep = _g78.keep;
  var find = _g78.find;
  var pairwise = _g78.pairwise;
  var iterate = _g78.iterate;
  var replicate = _g78.replicate;
  var splice = _g78.splice;
  var map = _g78.map;
  var map42 = _g78["map*"];
  var mapt = _g78.mapt;
  var mapo = _g78.mapo;
  var keys63 = _g78["keys?"];
  var extend = _g78.extend;
  var exclude = _g78.exclude;
  var char = _g78.char;
  var code = _g78.code;
  var search = _g78.search;
  var split = _g78.split;
  var cat = _g78.cat;
  var _43 = _g78["+"];
  var _ = _g78["-"];
  var _42 = _g78["*"];
  var _47 = _g78["/"];
  var _37 = _g78["%"];
  var _62 = _g78[">"];
  var _60 = _g78["<"];
  var _61 = _g78["="];
  var _6261 = _g78[">="];
  var _6061 = _g78["<="];
  var read_file = _g78["read-file"];
  var write_file = _g78["write-file"];
  var print = _g78.print;
  var write = _g78.write;
  var exit = _g78.exit;
  var type = _g78.type;
  var nil63 = _g78["nil?"];
  var is63 = _g78["is?"];
  var string63 = _g78["string?"];
  var string_literal63 = _g78["string-literal?"];
  var id_literal63 = _g78["id-literal?"];
  var number63 = _g78["number?"];
  var boolean63 = _g78["boolean?"];
  var function63 = _g78["function?"];
  var composite63 = _g78["composite?"];
  var atom63 = _g78["atom?"];
  var table63 = _g78["table?"];
  var list63 = _g78["list?"];
  var parse_number = _g78["parse-number"];
  var to_string = _g78["to-string"];
  var apply = _g78.apply;
  var stash = _g78.stash;
  var unstash = _g78.unstash;
  var _37message_handler = _g78["%message-handler"];
  var _g79 = nexus.utilities;
  var setenv = _g79.setenv;
  var getenv = _g79.getenv;
  var macro_function = _g79["macro-function"];
  var macro63 = _g79["macro?"];
  var special63 = _g79["special?"];
  var special_form63 = _g79["special-form?"];
  var symbol_expansion = _g79["symbol-expansion"];
  var symbol63 = _g79["symbol?"];
  var variable63 = _g79["variable?"];
  var bound63 = _g79["bound?"];
  var quoted = _g79.quoted;
  var stash42 = _g79["stash*"];
  var bind = _g79.bind;
  var bind42 = _g79["bind*"];
  var quasiexpand = _g79.quasiexpand;
  var macroexpand = _g79.macroexpand;
  var indentation = _g79.indentation;
  var valid_id63 = _g79["valid-id?"];
  var to_id = _g79["to-id"];
  var module_key = _g79["module-key"];
  var imported = _g79.imported;
  var exported = _g79.exported;
  var quote_environment = _g79["quote-environment"];
  var quote_modules = _g79["quote-modules"];
  var initial_environment = _g79["initial-environment"];
  var _g80 = nexus.reader;
  var make_stream = _g80["make-stream"];
  var read_table = _g80["read-table"];
  var read = _g80.read;
  var read_all = _g80["read-all"];
  var read_from_string = _g80["read-from-string"];
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
  function compile_args(args) {
    var str = "(";
    var i = 0;
    var _g81 = args;
    while ((i < length(_g81))) {
      var arg = _g81[i];
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
  compile_body = function (forms) {
    var _g82 = unstash(sublist(arguments, 1));
    var tail63 = _g82["tail?"];
    var str = "";
    var i = 0;
    var _g83 = forms;
    while ((i < length(_g83))) {
      var x = _g83[i];
      var t63 = (tail63 && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, "stmt?": true, "tail?": t63}));
      i = (i + 1);
    }
    return(str);
  };
  compile_call = function (form) {
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
  };
  function compile_infix(_g84) {
    var op = _g84[0];
    var args = sub(_g84, 1);
    var str = "(";
    var _g85 = getop(op);
    var i = 0;
    var _g86 = args;
    while ((i < length(_g86))) {
      var arg = _g86[i];
      if (((_g85 === "-") && (length(args) === 1))) {
        str = (str + _g85 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g85 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g87 = (function () {
      indent_level = (indent_level + 1);
      var _g88 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g88);
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
      return((ind + "if (" + cond1 + ") {\n" + _g87 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g87 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g87 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g87 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g87 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g87 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g89 = unstash(sublist(arguments, 2));
    var name = _g89.name;
    var prefix = _g89.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g90 = (prefix || "");
    var _g91 = compile_args(args);
    var _g92 = (function () {
      indent_level = (indent_level + 1);
      var _g93 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g93);
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
      return(("function " + id + _g91 + " {\n" + _g92 + ind + "}" + tr));
    } else {
      return((_g90 + "function " + id + _g91 + "\n" + _g92 + ind + tr));
    }
  };
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else if ((target === "js")) {
      return(";\n");
    } else {
      return("\n");
    }
  }
  compile_special = function (form, stmt63, tail63) {
    var _g94 = getenv(hd(form));
    var special = _g94.special;
    var stmt = _g94.stmt;
    var self_tr63 = _g94.tr;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  };
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g95 = unstash(sublist(arguments, 1));
    var stmt63 = _g95["stmt?"];
    var tail63 = _g95["tail?"];
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
      var _g96 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g96 + tr));
    }
  };
  var run = eval;
  eval = function (form) {
    var previous = target;
    target = "js";
    var str = compile(macroexpand(form));
    target = previous;
    return(run(str));
  };
  global.current_module = undefined;
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g97 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g97, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var compiler_output = undefined;
  var compilation_level = undefined;
  compile_module = function (spec) {
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  };
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
    var _g107 = toplevel;
    for (name in _g107) {
      if (isNaN(parseInt(name))) {
        var binding = _g107[name];
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
  load_module = function (spec) {
    if ((nil63(module(spec)) || (compilation_level === 1))) {
      _37compile_module(spec);
    }
    return(open_module(spec));
  };
  open_module = function (spec) {
    var m = module(spec);
    var frame = last(environment);
    var k = undefined;
    var _g108 = m.export;
    for (k in _g108) {
      if (isNaN(parseInt(k))) {
        var v = _g108[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g109 = {};
  nexus.compiler = _g109;
  _g109["compile-body"] = compile_body;
  _g109["compile-call"] = compile_call;
  _g109["compile-branch"] = compile_branch;
  _g109["compile-function"] = compile_function;
  _g109["compile-special"] = compile_special;
  _g109.compile = compile;
  _g109.eval = eval;
  _g109["load-module"] = load_module;
  _g109["open-module"] = open_module;
  _g109["in-module"] = in_module;
})();
(function () {
  var _g112 = nexus.runtime;
  var length = _g112.length;
  var empty63 = _g112["empty?"];
  var some63 = _g112["some?"];
  var substring = _g112.substring;
  var sublist = _g112.sublist;
  var sub = _g112.sub;
  var inner = _g112.inner;
  var hd = _g112.hd;
  var tl = _g112.tl;
  var add = _g112.add;
  var drop = _g112.drop;
  var last = _g112.last;
  var reverse = _g112.reverse;
  var join = _g112.join;
  var reduce = _g112.reduce;
  var keep = _g112.keep;
  var find = _g112.find;
  var pairwise = _g112.pairwise;
  var iterate = _g112.iterate;
  var replicate = _g112.replicate;
  var splice = _g112.splice;
  var map = _g112.map;
  var map42 = _g112["map*"];
  var mapt = _g112.mapt;
  var mapo = _g112.mapo;
  var keys63 = _g112["keys?"];
  var extend = _g112.extend;
  var exclude = _g112.exclude;
  var char = _g112.char;
  var code = _g112.code;
  var search = _g112.search;
  var split = _g112.split;
  var cat = _g112.cat;
  var _43 = _g112["+"];
  var _ = _g112["-"];
  var _42 = _g112["*"];
  var _47 = _g112["/"];
  var _37 = _g112["%"];
  var _62 = _g112[">"];
  var _60 = _g112["<"];
  var _61 = _g112["="];
  var _6261 = _g112[">="];
  var _6061 = _g112["<="];
  var read_file = _g112["read-file"];
  var write_file = _g112["write-file"];
  var print = _g112.print;
  var write = _g112.write;
  var exit = _g112.exit;
  var type = _g112.type;
  var nil63 = _g112["nil?"];
  var is63 = _g112["is?"];
  var string63 = _g112["string?"];
  var string_literal63 = _g112["string-literal?"];
  var id_literal63 = _g112["id-literal?"];
  var number63 = _g112["number?"];
  var boolean63 = _g112["boolean?"];
  var function63 = _g112["function?"];
  var composite63 = _g112["composite?"];
  var atom63 = _g112["atom?"];
  var table63 = _g112["table?"];
  var list63 = _g112["list?"];
  var parse_number = _g112["parse-number"];
  var to_string = _g112["to-string"];
  var apply = _g112.apply;
  var stash = _g112.stash;
  var unstash = _g112.unstash;
  var _37message_handler = _g112["%message-handler"];
  var _g113 = nexus.utilities;
  var setenv = _g113.setenv;
  var getenv = _g113.getenv;
  var macro_function = _g113["macro-function"];
  var macro63 = _g113["macro?"];
  var special63 = _g113["special?"];
  var special_form63 = _g113["special-form?"];
  var symbol_expansion = _g113["symbol-expansion"];
  var symbol63 = _g113["symbol?"];
  var variable63 = _g113["variable?"];
  var bound63 = _g113["bound?"];
  var quoted = _g113.quoted;
  var stash42 = _g113["stash*"];
  var bind = _g113.bind;
  var bind42 = _g113["bind*"];
  var quasiexpand = _g113.quasiexpand;
  var macroexpand = _g113.macroexpand;
  var indentation = _g113.indentation;
  var valid_id63 = _g113["valid-id?"];
  var to_id = _g113["to-id"];
  var module_key = _g113["module-key"];
  var imported = _g113.imported;
  var exported = _g113.exported;
  var quote_environment = _g113["quote-environment"];
  var quote_modules = _g113["quote-modules"];
  var initial_environment = _g113["initial-environment"];
  var _g114 = nexus.compiler;
  var compile_body = _g114["compile-body"];
  var compile_call = _g114["compile-call"];
  var compile_branch = _g114["compile-branch"];
  var compile_function = _g114["compile-function"];
  var compile_special = _g114["compile-special"];
  var compile = _g114.compile;
  var eval = _g114.eval;
  var load_module = _g114["load-module"];
  var open_module = _g114["open-module"];
  var in_module = _g114["in-module"];
  return;
})();
(function () {
  var _g170 = nexus.runtime;
  var length = _g170.length;
  var empty63 = _g170["empty?"];
  var some63 = _g170["some?"];
  var substring = _g170.substring;
  var sublist = _g170.sublist;
  var sub = _g170.sub;
  var inner = _g170.inner;
  var hd = _g170.hd;
  var tl = _g170.tl;
  var add = _g170.add;
  var drop = _g170.drop;
  var last = _g170.last;
  var reverse = _g170.reverse;
  var join = _g170.join;
  var reduce = _g170.reduce;
  var keep = _g170.keep;
  var find = _g170.find;
  var pairwise = _g170.pairwise;
  var iterate = _g170.iterate;
  var replicate = _g170.replicate;
  var splice = _g170.splice;
  var map = _g170.map;
  var map42 = _g170["map*"];
  var mapt = _g170.mapt;
  var mapo = _g170.mapo;
  var keys63 = _g170["keys?"];
  var extend = _g170.extend;
  var exclude = _g170.exclude;
  var char = _g170.char;
  var code = _g170.code;
  var search = _g170.search;
  var split = _g170.split;
  var cat = _g170.cat;
  var _43 = _g170["+"];
  var _ = _g170["-"];
  var _42 = _g170["*"];
  var _47 = _g170["/"];
  var _37 = _g170["%"];
  var _62 = _g170[">"];
  var _60 = _g170["<"];
  var _61 = _g170["="];
  var _6261 = _g170[">="];
  var _6061 = _g170["<="];
  var read_file = _g170["read-file"];
  var write_file = _g170["write-file"];
  var print = _g170.print;
  var write = _g170.write;
  var exit = _g170.exit;
  var type = _g170.type;
  var nil63 = _g170["nil?"];
  var is63 = _g170["is?"];
  var string63 = _g170["string?"];
  var string_literal63 = _g170["string-literal?"];
  var id_literal63 = _g170["id-literal?"];
  var number63 = _g170["number?"];
  var boolean63 = _g170["boolean?"];
  var function63 = _g170["function?"];
  var composite63 = _g170["composite?"];
  var atom63 = _g170["atom?"];
  var table63 = _g170["table?"];
  var list63 = _g170["list?"];
  var parse_number = _g170["parse-number"];
  var to_string = _g170["to-string"];
  var apply = _g170.apply;
  var stash = _g170.stash;
  var unstash = _g170.unstash;
  var _37message_handler = _g170["%message-handler"];
  var _g171 = nexus.utilities;
  var setenv = _g171.setenv;
  var getenv = _g171.getenv;
  var macro_function = _g171["macro-function"];
  var macro63 = _g171["macro?"];
  var special63 = _g171["special?"];
  var special_form63 = _g171["special-form?"];
  var symbol_expansion = _g171["symbol-expansion"];
  var symbol63 = _g171["symbol?"];
  var variable63 = _g171["variable?"];
  var bound63 = _g171["bound?"];
  var quoted = _g171.quoted;
  var stash42 = _g171["stash*"];
  var bind = _g171.bind;
  var bind42 = _g171["bind*"];
  var quasiexpand = _g171.quasiexpand;
  var macroexpand = _g171.macroexpand;
  var indentation = _g171.indentation;
  var valid_id63 = _g171["valid-id?"];
  var to_id = _g171["to-id"];
  var module_key = _g171["module-key"];
  var imported = _g171.imported;
  var exported = _g171.exported;
  var quote_environment = _g171["quote-environment"];
  var quote_modules = _g171["quote-modules"];
  var initial_environment = _g171["initial-environment"];
  global.target = "js";
  return;
})();
(function () {
  var _g244 = nexus.runtime;
  var length = _g244.length;
  var empty63 = _g244["empty?"];
  var some63 = _g244["some?"];
  var substring = _g244.substring;
  var sublist = _g244.sublist;
  var sub = _g244.sub;
  var inner = _g244.inner;
  var hd = _g244.hd;
  var tl = _g244.tl;
  var add = _g244.add;
  var drop = _g244.drop;
  var last = _g244.last;
  var reverse = _g244.reverse;
  var join = _g244.join;
  var reduce = _g244.reduce;
  var keep = _g244.keep;
  var find = _g244.find;
  var pairwise = _g244.pairwise;
  var iterate = _g244.iterate;
  var replicate = _g244.replicate;
  var splice = _g244.splice;
  var map = _g244.map;
  var map42 = _g244["map*"];
  var mapt = _g244.mapt;
  var mapo = _g244.mapo;
  var keys63 = _g244["keys?"];
  var extend = _g244.extend;
  var exclude = _g244.exclude;
  var char = _g244.char;
  var code = _g244.code;
  var search = _g244.search;
  var split = _g244.split;
  var cat = _g244.cat;
  var _43 = _g244["+"];
  var _ = _g244["-"];
  var _42 = _g244["*"];
  var _47 = _g244["/"];
  var _37 = _g244["%"];
  var _62 = _g244[">"];
  var _60 = _g244["<"];
  var _61 = _g244["="];
  var _6261 = _g244[">="];
  var _6061 = _g244["<="];
  var read_file = _g244["read-file"];
  var write_file = _g244["write-file"];
  var print = _g244.print;
  var write = _g244.write;
  var exit = _g244.exit;
  var type = _g244.type;
  var nil63 = _g244["nil?"];
  var is63 = _g244["is?"];
  var string63 = _g244["string?"];
  var string_literal63 = _g244["string-literal?"];
  var id_literal63 = _g244["id-literal?"];
  var number63 = _g244["number?"];
  var boolean63 = _g244["boolean?"];
  var function63 = _g244["function?"];
  var composite63 = _g244["composite?"];
  var atom63 = _g244["atom?"];
  var table63 = _g244["table?"];
  var list63 = _g244["list?"];
  var parse_number = _g244["parse-number"];
  var to_string = _g244["to-string"];
  var apply = _g244.apply;
  var stash = _g244.stash;
  var unstash = _g244.unstash;
  var _37message_handler = _g244["%message-handler"];
  var _g245 = nexus.utilities;
  var setenv = _g245.setenv;
  var getenv = _g245.getenv;
  var macro_function = _g245["macro-function"];
  var macro63 = _g245["macro?"];
  var special63 = _g245["special?"];
  var special_form63 = _g245["special-form?"];
  var symbol_expansion = _g245["symbol-expansion"];
  var symbol63 = _g245["symbol?"];
  var variable63 = _g245["variable?"];
  var bound63 = _g245["bound?"];
  var quoted = _g245.quoted;
  var stash42 = _g245["stash*"];
  var bind = _g245.bind;
  var bind42 = _g245["bind*"];
  var quasiexpand = _g245.quasiexpand;
  var macroexpand = _g245.macroexpand;
  var indentation = _g245.indentation;
  var valid_id63 = _g245["valid-id?"];
  var to_id = _g245["to-id"];
  var module_key = _g245["module-key"];
  var imported = _g245.imported;
  var exported = _g245.exported;
  var quote_environment = _g245["quote-environment"];
  var quote_modules = _g245["quote-modules"];
  var initial_environment = _g245["initial-environment"];
  global.modules = {reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g246) {
    var char = _g246[0];
    var stream = _g246[1];
    var body = unstash(sublist(arguments, 1));
    var _g247 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g247)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true, module: "system"}}}, core: {import: ["runtime", "utilities", "special", "core"], export: {"define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g248 = sub(body, 0);
    var form = join(["fn", args], _g248);
    var keys = sub(_g248, length(_g248));
    eval(join((function () {
      var _g249 = ["setenv", join(["quote", name])];
      _g249.special = form;
      _g249.form = join(["quote", form]);
      return(_g249);
    })(), keys));
    return(undefined);
  }, module: "core"}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g250 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g251) {
      var lh = _g251[0];
      var rh = _g251[1];
      var _g253 = 0;
      var _g252 = bind(lh, rh);
      while ((_g253 < length(_g252))) {
        var _g254 = _g252[_g253];
        var id = _g254[0];
        var val = _g254[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g253 = (_g253 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g250)])));
  }, module: "core"}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core"}, "define-global": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g255 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g255))) {
      var _g256 = bind42(x, _g255);
      var args = _g256[0];
      var _g257 = _g256[1];
      return(join(["%global-function", name, args], _g257));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g259 = 0;
    var _g258 = elements;
    while ((_g259 < length(_g258))) {
      var e = _g258[_g259];
      l[e] = true;
      _g259 = (_g259 + 1);
    }
    return(join(["table"], l));
  }, module: "core"}, "define-local": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g260 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g260))) {
      var _g261 = bind42(x, _g260);
      var args = _g261[0];
      var _g262 = _g261[1];
      return(join(["%local-function", name, args], _g262));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core"}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g263 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g263)]));
  }, module: "core"}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core"}, each: {export: true, macro: function (_g264) {
    var t = _g264[0];
    var k = _g264[1];
    var v = _g264[2];
    var body = unstash(sublist(arguments, 1));
    var _g265 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g266 = ["target"];
      _g266.js = join(["isNaN", join(["parseInt", k])]);
      _g266.lua = join(["not", join(["number?", k])]);
      return(_g266);
    })()), join(["let", join([v, join(["get", t1, k])])], _g265)])])]));
  }, module: "core"}, dec: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core"}, "list*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g267 = xs;
      while ((i < length(_g267))) {
        var x = _g267[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core"}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g268 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g268))) {
      var _g269 = bind42(x, _g268);
      var args = _g269[0];
      var _g270 = _g269[1];
      return(join(["%global-function", name, args], _g270));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g271 = sub(body, 0);
    var form = join(["fn", args], _g271);
    eval(join((function () {
      var _g272 = ["setenv", join(["quote", name])];
      _g272.macro = form;
      _g272.form = join(["quote", form]);
      return(_g272);
    })()));
    return(undefined);
  }, module: "core"}, across: {export: true, macro: function (_g273) {
    var l = _g273[0];
    var v = _g273[1];
    var i = _g273[2];
    var start = _g273[3];
    var body = unstash(sublist(arguments, 1));
    var _g274 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g274, [join(["inc", i])]))])]));
  }, module: "core"}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g275 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g275)]));
  }, module: "core"}, list: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g276 = body;
      for (k in _g276) {
        if (isNaN(parseInt(k))) {
          var v = _g276[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core"}, guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core"}, inc: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core"}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g169, x) {
      return(x);
    }, body)));
  }, module: "core"}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g277 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g277)]));
  }, module: "core"}, language: {export: true, macro: function () {
    return(join(["quote", target]));
  }, module: "core"}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g278 = sub(body, 0);
    add(environment, {});
    var _g279 = (function () {
      map(function (_g280) {
        var name = _g280[0];
        var exp = _g280[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g278)));
    })();
    drop(environment);
    return(_g279);
  }, module: "core"}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g281 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g282 = ["table"];
      _g282._scope = scope;
      return(_g282);
    })())]), join(["let", join([x, join(["do"], _g281)]), join(["drop", "environment"]), x])]));
  }, module: "core"}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g283 = sub(body, 0);
    var _g284 = bind42(args, _g283);
    var _g285 = _g284[0];
    var _g286 = _g284[1];
    return(join(["%function", _g285], _g286));
  }, module: "core"}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g287 = sub(body, 0);
    add(environment, {});
    var _g288 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g287)));
    })();
    drop(environment);
    return(_g288);
  }, module: "core"}, "with-bindings": {export: true, macro: function (_g289) {
    var names = _g289[0];
    var body = unstash(sublist(arguments, 1));
    var _g290 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g291 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g292 = ["setenv", x];
        _g292.variable = true;
        return(_g292);
      })())])];
      _g291.scope = true;
      return(_g291);
    })(), _g290));
  }, module: "core"}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }, module: "core"}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core"}, target: {export: true, module: "core", global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core"}}}, boot: {import: ["runtime", "utilities", "special", "core"], export: {}}, lib: {import: ["core", "special"], export: {}}, utilities: {import: ["runtime", "special", "core"], export: {setenv: {export: true, module: "utilities", variable: true}, getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, "make-id": {}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "indent-level": {global: true, export: true, module: "utilities"}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%local-function": {stmt: true, tr: true, special: function (_g293) {
    var name = _g293[0];
    var args = _g293[1];
    var body = sub(_g293, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, export: true, module: "special"}, "not": {export: true, special: function (_g294) {
    var x = _g294[0];
    var _g295 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g295 + ")"));
  }, module: "special"}, "%local": {export: true, stmt: true, module: "special", special: function (_g296) {
    var name = _g296[0];
    var value = _g296[1];
    var id = compile(name);
    var _g297 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g297));
  }}, "%function": {export: true, special: function (_g298) {
    var args = _g298[0];
    var body = sub(_g298, 1);
    return(compile_function(args, body));
  }, module: "special"}, "%for": {stmt: true, tr: true, special: function (_g299) {
    var _g300 = _g299[0];
    var t = _g300[0];
    var k = _g300[1];
    var body = sub(_g299, 1);
    var _g301 = compile(t);
    var ind = indentation();
    var _g302 = (function () {
      indent_level = (indent_level + 1);
      var _g303 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g303);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g301 + " do\n" + _g302 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g301 + ") {\n" + _g302 + ind + "}\n"));
    }
  }, export: true, module: "special"}, "return": {export: true, stmt: true, module: "special", special: function (_g304) {
    var x = _g304[0];
    var _g305 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g305));
  }}, "error": {export: true, stmt: true, module: "special", special: function (_g306) {
    var x = _g306[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }}, "if": {stmt: true, tr: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g307 = form;
    while ((i < length(_g307))) {
      var condition = _g307[i];
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
  }, export: true, module: "special"}, "set": {export: true, stmt: true, module: "special", special: function (_g308) {
    var lh = _g308[0];
    var rh = _g308[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "get": {export: true, special: function (_g309) {
    var t = _g309[0];
    var k = _g309[1];
    var _g310 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g310, 0) === "{"))) {
      _g310 = ("(" + _g310 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g310 + "." + inner(k)));
    } else {
      return((_g310 + "[" + k1 + "]"));
    }
  }, module: "special"}, "%object": {export: true, special: function (forms) {
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
    var _g311 = pairs;
    while ((i < length(_g311))) {
      var _g312 = _g311[i];
      var k = _g312[0];
      var v = _g312[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g313 = compile(v);
      var _g314 = (function () {
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
      str = (str + _g314 + sep + _g313);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special"}, "%global-function": {stmt: true, tr: true, special: function (_g315) {
    var name = _g315[0];
    var args = _g315[1];
    var body = sub(_g315, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, export: true, module: "special"}, "%try": {stmt: true, tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g316 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g316);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g317 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g317);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, export: true, module: "special"}, "while": {stmt: true, tr: true, special: function (_g318) {
    var condition = _g318[0];
    var body = sub(_g318, 1);
    var _g319 = compile(condition);
    var _g320 = (function () {
      indent_level = (indent_level + 1);
      var _g321 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g321);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g319 + ") {\n" + _g320 + ind + "}\n"));
    } else {
      return((ind + "while " + _g319 + " do\n" + _g320 + ind + "end\n"));
    }
  }, export: true, module: "special"}, "break": {export: true, stmt: true, module: "special", special: function (_g111) {
    return((indentation() + "break"));
  }}, "%array": {export: true, special: function (forms) {
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
    var _g322 = forms;
    while ((i < length(_g322))) {
      var x = _g322[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special"}, "do": {stmt: true, tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, export: true, module: "special"}}}, runtime: {import: ["special", "core"], export: {length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, mapt: {export: true, module: "runtime", variable: true}, mapo: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, type: {export: true, module: "runtime", variable: true}, "nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g323 = sub(body, 0);
    var imports = [];
    var imp = _g323.import;
    var exp = _g323.export;
    var _g325 = 0;
    var _g324 = (imp || []);
    while ((_g325 < length(_g324))) {
      var k = _g324[_g325];
      load_module(k);
      add(imports, imported(k));
      _g325 = (_g325 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g327 = 0;
    var _g326 = (exp || []);
    while ((_g327 < length(_g326))) {
      var k = _g326[_g327];
      setenv(k, {_stash: true, export: true});
      _g327 = (_g327 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "current-module": {global: true, export: true, module: "compiler"}}}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g328 = sub(body, 0);
    var imports = [];
    var imp = _g328.import;
    var exp = _g328.export;
    var _g330 = 0;
    var _g329 = (imp || []);
    while ((_g330 < length(_g329))) {
      var k = _g329[_g330];
      load_module(k);
      add(imports, imported(k));
      _g330 = (_g330 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g332 = 0;
    var _g331 = (exp || []);
    while ((_g332 < length(_g331))) {
      var k = _g331[_g332];
      setenv(k, {_stash: true, export: true});
      _g332 = (_g332 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}}];
  return;
})();
(function () {
  var _g34 = nexus.runtime;
  var length = _g34.length;
  var empty63 = _g34["empty?"];
  var some63 = _g34["some?"];
  var substring = _g34.substring;
  var sublist = _g34.sublist;
  var sub = _g34.sub;
  var inner = _g34.inner;
  var hd = _g34.hd;
  var tl = _g34.tl;
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
  var map42 = _g34["map*"];
  var mapt = _g34.mapt;
  var mapo = _g34.mapo;
  var keys63 = _g34["keys?"];
  var extend = _g34.extend;
  var exclude = _g34.exclude;
  var char = _g34.char;
  var code = _g34.code;
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
  var print = _g34.print;
  var write = _g34.write;
  var exit = _g34.exit;
  var type = _g34.type;
  var nil63 = _g34["nil?"];
  var is63 = _g34["is?"];
  var string63 = _g34["string?"];
  var string_literal63 = _g34["string-literal?"];
  var id_literal63 = _g34["id-literal?"];
  var number63 = _g34["number?"];
  var boolean63 = _g34["boolean?"];
  var function63 = _g34["function?"];
  var composite63 = _g34["composite?"];
  var atom63 = _g34["atom?"];
  var table63 = _g34["table?"];
  var list63 = _g34["list?"];
  var parse_number = _g34["parse-number"];
  var to_string = _g34["to-string"];
  var apply = _g34.apply;
  var stash = _g34.stash;
  var unstash = _g34.unstash;
  var _37message_handler = _g34["%message-handler"];
  var _g71 = nexus.utilities;
  var setenv = _g71.setenv;
  var getenv = _g71.getenv;
  var macro_function = _g71["macro-function"];
  var macro63 = _g71["macro?"];
  var special63 = _g71["special?"];
  var special_form63 = _g71["special-form?"];
  var symbol_expansion = _g71["symbol-expansion"];
  var symbol63 = _g71["symbol?"];
  var variable63 = _g71["variable?"];
  var bound63 = _g71["bound?"];
  var quoted = _g71.quoted;
  var stash42 = _g71["stash*"];
  var bind = _g71.bind;
  var bind42 = _g71["bind*"];
  var quasiexpand = _g71.quasiexpand;
  var macroexpand = _g71.macroexpand;
  var indentation = _g71.indentation;
  var valid_id63 = _g71["valid-id?"];
  var to_id = _g71["to-id"];
  var module_key = _g71["module-key"];
  var imported = _g71.imported;
  var exported = _g71.exported;
  var quote_environment = _g71["quote-environment"];
  var quote_modules = _g71["quote-modules"];
  var initial_environment = _g71["initial-environment"];
  var _g77 = nexus.reader;
  var make_stream = _g77["make-stream"];
  var read_table = _g77["read-table"];
  var read = _g77.read;
  var read_all = _g77["read-all"];
  var read_from_string = _g77["read-from-string"];
  var _g110 = nexus.compiler;
  var compile_body = _g110["compile-body"];
  var compile_call = _g110["compile-call"];
  var compile_branch = _g110["compile-branch"];
  var compile_function = _g110["compile-function"];
  var compile_special = _g110["compile-special"];
  var compile = _g110.compile;
  var eval = _g110.eval;
  var load_module = _g110["load-module"];
  var open_module = _g110["open-module"];
  var in_module = _g110["in-module"];
  function rep(str) {
    var _g334 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g338) {
        return([false, _g338]);
      }
    })();
    var _g1 = _g334[0];
    var x = _g334[1];
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
    var _g335 = args;
    while ((i < length(_g335))) {
      var arg = _g335[i];
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
      var _g336 = (spec || "main");
      in_module(_g336);
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
