(function () {
  global.nexus = {};
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
  _g33.replicate = replicate;
  _g33.extend = extend;
  _g33["table?"] = table63;
  _g33["nil?"] = nil63;
  _g33.drop = drop;
  _g33["id-literal?"] = id_literal63;
  _g33.join = join;
  _g33.inner = inner;
  _g33.type = type;
  _g33[">="] = _6261;
  _g33["+"] = _43;
  _g33["*"] = _42;
  _g33.keep = keep;
  _g33["/"] = _47;
  _g33.unstash = unstash;
  _g33.code = code;
  _g33.cat = cat;
  _g33.stash = stash;
  _g33.apply = apply;
  _g33["to-string"] = to_string;
  _g33["parse-number"] = parse_number;
  _g33["list?"] = list63;
  _g33["some?"] = some63;
  _g33.map = map;
  _g33["map*"] = map42;
  _g33.sub = sub;
  _g33["boolean?"] = boolean63;
  _g33.iterate = iterate;
  _g33.split = split;
  _g33.tl = tl;
  _g33["string?"] = string63;
  _g33["is?"] = is63;
  _g33.search = search;
  _g33["number?"] = number63;
  _g33.print = print;
  _g33["write-file"] = write_file;
  _g33["read-file"] = read_file;
  _g33["<="] = _6061;
  _g33["="] = _61;
  _g33["<"] = _60;
  _g33[">"] = _62;
  _g33["-"] = _;
  _g33["string-literal?"] = string_literal63;
  _g33.exit = exit;
  _g33.sublist = sublist;
  _g33.substring = substring;
  _g33["empty?"] = empty63;
  _g33.reduce = reduce;
  _g33.exclude = exclude;
  _g33["%"] = _37;
  _g33.mapo = mapo;
  _g33.mapt = mapt;
  _g33["composite?"] = composite63;
  _g33.splice = splice;
  _g33.write = write;
  _g33["atom?"] = atom63;
  _g33.find = find;
  _g33["%message-handler"] = _37message_handler;
  _g33["function?"] = function63;
  _g33.reverse = reverse;
  _g33.last = last;
  _g33.add = add;
  _g33.length = length;
  _g33.char = char;
  _g33["keys?"] = keys63;
  _g33.hd = hd;
  _g33.pairwise = pairwise;
})();
(function () {
  var _g40 = nexus.runtime;
  var replicate = _g40.replicate;
  var extend = _g40.extend;
  var table63 = _g40["table?"];
  var nil63 = _g40["nil?"];
  var drop = _g40.drop;
  var read_file = _g40["read-file"];
  var id_literal63 = _g40["id-literal?"];
  var apply = _g40.apply;
  var join = _g40.join;
  var inner = _g40.inner;
  var _6261 = _g40[">="];
  var write_file = _g40["write-file"];
  var to_string = _g40["to-string"];
  var _43 = _g40["+"];
  var _42 = _g40["*"];
  var _47 = _g40["/"];
  var _ = _g40["-"];
  var code = _g40.code;
  var cat = _g40.cat;
  var length = _g40.length;
  var some63 = _g40["some?"];
  var exclude = _g40.exclude;
  var split = _g40.split;
  var map = _g40.map;
  var list63 = _g40["list?"];
  var find = _g40.find;
  var splice = _g40.splice;
  var tl = _g40.tl;
  var number63 = _g40["number?"];
  var parse_number = _g40["parse-number"];
  var string_literal63 = _g40["string-literal?"];
  var is63 = _g40["is?"];
  var exit = _g40.exit;
  var sublist = _g40.sublist;
  var mapo = _g40.mapo;
  var empty63 = _g40["empty?"];
  var reduce = _g40.reduce;
  var _37 = _g40["%"];
  var composite63 = _g40["composite?"];
  var write = _g40.write;
  var atom63 = _g40["atom?"];
  var stash = _g40.stash;
  var _37message_handler = _g40["%message-handler"];
  var function63 = _g40["function?"];
  var unstash = _g40.unstash;
  var map42 = _g40["map*"];
  var _6061 = _g40["<="];
  var iterate = _g40.iterate;
  var sub = _g40.sub;
  var _60 = _g40["<"];
  var substring = _g40.substring;
  var boolean63 = _g40["boolean?"];
  var string63 = _g40["string?"];
  var add = _g40.add;
  var _61 = _g40["="];
  var char = _g40.char;
  var _62 = _g40[">"];
  var keys63 = _g40["keys?"];
  var last = _g40.last;
  var search = _g40.search;
  var hd = _g40.hd;
  var keep = _g40.keep;
  var mapt = _g40.mapt;
  var pairwise = _g40.pairwise;
  var reverse = _g40.reverse;
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
  var reserved = {"false": true, "<": true, "return": true, "/": true, "throw": true, "do": true, "+": true, "switch": true, "instanceof": true, "repeat": true, "or": true, "if": true, "until": true, "continue": true, "with": true, "new": true, "then": true, "in": true, "nil": true, "%": true, "==": true, "=": true, "and": true, "finally": true, "end": true, "default": true, "*": true, "for": true, "try": true, "elseif": true, "function": true, "this": true, "break": true, "local": true, "else": true, ">": true, "debugger": true, "while": true, "void": true, "catch": true, "var": true, "typeof": true, "case": true, "-": true, "not": true, ">=": true, "delete": true, "<=": true, "true": true};
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
  imported = function (spec) {
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
  _g70["symbol?"] = symbol63;
  _g70.setenv = setenv;
  _g70.getenv = getenv;
  _g70.indentation = indentation;
  _g70["quote-environment"] = quote_environment;
  _g70.macroexpand = macroexpand;
  _g70["macro-function"] = macro_function;
  _g70.quoted = quoted;
  _g70.bind = bind;
  _g70["quote-modules"] = quote_modules;
  _g70["macro?"] = macro63;
  _g70.imported = imported;
  _g70["special-form?"] = special_form63;
  _g70["initial-environment"] = initial_environment;
  _g70.exported = exported;
  _g70["module-key"] = module_key;
  _g70["to-id"] = to_id;
  _g70["valid-id?"] = valid_id63;
  _g70.quasiexpand = quasiexpand;
  _g70["bind*"] = bind42;
  _g70["stash*"] = stash42;
  _g70["bound?"] = bound63;
  _g70["variable?"] = variable63;
  _g70["symbol-expansion"] = symbol_expansion;
  _g70["special?"] = special63;
})();
(function () {
  var _g72 = nexus.runtime;
  var replicate = _g72.replicate;
  var extend = _g72.extend;
  var table63 = _g72["table?"];
  var nil63 = _g72["nil?"];
  var drop = _g72.drop;
  var read_file = _g72["read-file"];
  var id_literal63 = _g72["id-literal?"];
  var apply = _g72.apply;
  var join = _g72.join;
  var inner = _g72.inner;
  var _6261 = _g72[">="];
  var write_file = _g72["write-file"];
  var to_string = _g72["to-string"];
  var _43 = _g72["+"];
  var _42 = _g72["*"];
  var _47 = _g72["/"];
  var _ = _g72["-"];
  var code = _g72.code;
  var cat = _g72.cat;
  var length = _g72.length;
  var some63 = _g72["some?"];
  var exclude = _g72.exclude;
  var split = _g72.split;
  var map = _g72.map;
  var list63 = _g72["list?"];
  var find = _g72.find;
  var splice = _g72.splice;
  var tl = _g72.tl;
  var number63 = _g72["number?"];
  var parse_number = _g72["parse-number"];
  var string_literal63 = _g72["string-literal?"];
  var is63 = _g72["is?"];
  var exit = _g72.exit;
  var sublist = _g72.sublist;
  var mapo = _g72.mapo;
  var empty63 = _g72["empty?"];
  var reduce = _g72.reduce;
  var _37 = _g72["%"];
  var composite63 = _g72["composite?"];
  var write = _g72.write;
  var atom63 = _g72["atom?"];
  var stash = _g72.stash;
  var _37message_handler = _g72["%message-handler"];
  var function63 = _g72["function?"];
  var unstash = _g72.unstash;
  var map42 = _g72["map*"];
  var _6061 = _g72["<="];
  var iterate = _g72.iterate;
  var sub = _g72.sub;
  var _60 = _g72["<"];
  var substring = _g72.substring;
  var boolean63 = _g72["boolean?"];
  var string63 = _g72["string?"];
  var add = _g72.add;
  var _61 = _g72["="];
  var char = _g72.char;
  var _62 = _g72[">"];
  var keys63 = _g72["keys?"];
  var last = _g72.last;
  var search = _g72.search;
  var hd = _g72.hd;
  var keep = _g72.keep;
  var mapt = _g72.mapt;
  var pairwise = _g72.pairwise;
  var reverse = _g72.reverse;
  var delimiters = {"\n": true, "(": true, ";": true, ")": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
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
  _g76 = {};
  nexus.reader = _g76;
  _g76["read-from-string"] = read_from_string;
  _g76.read = read;
  _g76["read-table"] = read_table;
  _g76["read-all"] = read_all;
  _g76["make-stream"] = make_stream;
})();
(function () {
  var _g78 = nexus.runtime;
  var replicate = _g78.replicate;
  var extend = _g78.extend;
  var table63 = _g78["table?"];
  var nil63 = _g78["nil?"];
  var drop = _g78.drop;
  var read_file = _g78["read-file"];
  var id_literal63 = _g78["id-literal?"];
  var apply = _g78.apply;
  var join = _g78.join;
  var inner = _g78.inner;
  var _6261 = _g78[">="];
  var write_file = _g78["write-file"];
  var to_string = _g78["to-string"];
  var _43 = _g78["+"];
  var _42 = _g78["*"];
  var _47 = _g78["/"];
  var _ = _g78["-"];
  var code = _g78.code;
  var cat = _g78.cat;
  var length = _g78.length;
  var some63 = _g78["some?"];
  var exclude = _g78.exclude;
  var split = _g78.split;
  var map = _g78.map;
  var list63 = _g78["list?"];
  var find = _g78.find;
  var splice = _g78.splice;
  var tl = _g78.tl;
  var number63 = _g78["number?"];
  var parse_number = _g78["parse-number"];
  var string_literal63 = _g78["string-literal?"];
  var is63 = _g78["is?"];
  var exit = _g78.exit;
  var sublist = _g78.sublist;
  var mapo = _g78.mapo;
  var empty63 = _g78["empty?"];
  var reduce = _g78.reduce;
  var _37 = _g78["%"];
  var composite63 = _g78["composite?"];
  var write = _g78.write;
  var atom63 = _g78["atom?"];
  var stash = _g78.stash;
  var _37message_handler = _g78["%message-handler"];
  var function63 = _g78["function?"];
  var unstash = _g78.unstash;
  var map42 = _g78["map*"];
  var _6061 = _g78["<="];
  var iterate = _g78.iterate;
  var sub = _g78.sub;
  var _60 = _g78["<"];
  var substring = _g78.substring;
  var boolean63 = _g78["boolean?"];
  var string63 = _g78["string?"];
  var add = _g78.add;
  var _61 = _g78["="];
  var char = _g78.char;
  var _62 = _g78[">"];
  var keys63 = _g78["keys?"];
  var last = _g78.last;
  var search = _g78.search;
  var hd = _g78.hd;
  var keep = _g78.keep;
  var mapt = _g78.mapt;
  var pairwise = _g78.pairwise;
  var reverse = _g78.reverse;
  var _g79 = nexus.utilities;
  var bind = _g79.bind;
  var module_key = _g79["module-key"];
  var macro_function = _g79["macro-function"];
  var special_form63 = _g79["special-form?"];
  var quoted = _g79.quoted;
  var quote_environment = _g79["quote-environment"];
  var initial_environment = _g79["initial-environment"];
  var to_id = _g79["to-id"];
  var getenv = _g79.getenv;
  var exported = _g79.exported;
  var imported = _g79.imported;
  var quote_modules = _g79["quote-modules"];
  var valid_id63 = _g79["valid-id?"];
  var bound63 = _g79["bound?"];
  var symbol63 = _g79["symbol?"];
  var symbol_expansion = _g79["symbol-expansion"];
  var indentation = _g79.indentation;
  var special63 = _g79["special?"];
  var variable63 = _g79["variable?"];
  var stash42 = _g79["stash*"];
  var setenv = _g79.setenv;
  var macroexpand = _g79.macroexpand;
  var quasiexpand = _g79.quasiexpand;
  var bind42 = _g79["bind*"];
  var macro63 = _g79["macro?"];
  var _g80 = nexus.reader;
  var read_all = _g80["read-all"];
  var read_from_string = _g80["read-from-string"];
  var read_table = _g80["read-table"];
  var make_stream = _g80["make-stream"];
  var read = _g80.read;
  var infix = {common: {"+": true, "*": true, "/": true, ">": true, "-": true, "<": true, "<=": true, "%": true, ">=": true}, js: {cat: "+", "or": "||", "~=": "!=", "=": "===", "and": "&&"}, lua: {cat: "..", "or": true, "~=": true, "=": "==", "and": true}};
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
      str = (str + compile(x, {_stash: true, "tail?": t63, "stmt?": true}));
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
      var _g88 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
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
    var stmt = _g94.stmt;
    var special = _g94.special;
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
    var tail63 = _g95["tail?"];
    var stmt63 = _g95["stmt?"];
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
  _g109["compile-call"] = compile_call;
  _g109["load-module"] = load_module;
  _g109.compile = compile;
  _g109["compile-special"] = compile_special;
  _g109["compile-body"] = compile_body;
  _g109["compile-branch"] = compile_branch;
  _g109["in-module"] = in_module;
  _g109.eval = eval;
  _g109["compile-function"] = compile_function;
  _g109["open-module"] = open_module;
})();
(function () {
  var _g112 = nexus.runtime;
  var replicate = _g112.replicate;
  var extend = _g112.extend;
  var table63 = _g112["table?"];
  var nil63 = _g112["nil?"];
  var drop = _g112.drop;
  var read_file = _g112["read-file"];
  var id_literal63 = _g112["id-literal?"];
  var apply = _g112.apply;
  var join = _g112.join;
  var inner = _g112.inner;
  var _6261 = _g112[">="];
  var write_file = _g112["write-file"];
  var to_string = _g112["to-string"];
  var _43 = _g112["+"];
  var _42 = _g112["*"];
  var _47 = _g112["/"];
  var _ = _g112["-"];
  var code = _g112.code;
  var cat = _g112.cat;
  var length = _g112.length;
  var some63 = _g112["some?"];
  var exclude = _g112.exclude;
  var split = _g112.split;
  var map = _g112.map;
  var list63 = _g112["list?"];
  var find = _g112.find;
  var splice = _g112.splice;
  var tl = _g112.tl;
  var number63 = _g112["number?"];
  var parse_number = _g112["parse-number"];
  var string_literal63 = _g112["string-literal?"];
  var is63 = _g112["is?"];
  var exit = _g112.exit;
  var sublist = _g112.sublist;
  var mapo = _g112.mapo;
  var empty63 = _g112["empty?"];
  var reduce = _g112.reduce;
  var _37 = _g112["%"];
  var composite63 = _g112["composite?"];
  var write = _g112.write;
  var atom63 = _g112["atom?"];
  var stash = _g112.stash;
  var _37message_handler = _g112["%message-handler"];
  var function63 = _g112["function?"];
  var unstash = _g112.unstash;
  var map42 = _g112["map*"];
  var _6061 = _g112["<="];
  var iterate = _g112.iterate;
  var sub = _g112.sub;
  var _60 = _g112["<"];
  var substring = _g112.substring;
  var boolean63 = _g112["boolean?"];
  var string63 = _g112["string?"];
  var add = _g112.add;
  var _61 = _g112["="];
  var char = _g112.char;
  var _62 = _g112[">"];
  var keys63 = _g112["keys?"];
  var last = _g112.last;
  var search = _g112.search;
  var hd = _g112.hd;
  var keep = _g112.keep;
  var mapt = _g112.mapt;
  var pairwise = _g112.pairwise;
  var reverse = _g112.reverse;
  var _g113 = nexus.utilities;
  var bind = _g113.bind;
  var module_key = _g113["module-key"];
  var macro_function = _g113["macro-function"];
  var special_form63 = _g113["special-form?"];
  var quoted = _g113.quoted;
  var quote_environment = _g113["quote-environment"];
  var initial_environment = _g113["initial-environment"];
  var to_id = _g113["to-id"];
  var getenv = _g113.getenv;
  var exported = _g113.exported;
  var imported = _g113.imported;
  var quote_modules = _g113["quote-modules"];
  var valid_id63 = _g113["valid-id?"];
  var bound63 = _g113["bound?"];
  var symbol63 = _g113["symbol?"];
  var symbol_expansion = _g113["symbol-expansion"];
  var indentation = _g113.indentation;
  var special63 = _g113["special?"];
  var variable63 = _g113["variable?"];
  var stash42 = _g113["stash*"];
  var setenv = _g113.setenv;
  var macroexpand = _g113.macroexpand;
  var quasiexpand = _g113.quasiexpand;
  var bind42 = _g113["bind*"];
  var macro63 = _g113["macro?"];
  var _g114 = nexus.compiler;
  var open_module = _g114["open-module"];
  var compile_call = _g114["compile-call"];
  var load_module = _g114["load-module"];
  var compile_body = _g114["compile-body"];
  var eval = _g114.eval;
  var compile_special = _g114["compile-special"];
  var compile_function = _g114["compile-function"];
  var in_module = _g114["in-module"];
  var compile = _g114.compile;
  var compile_branch = _g114["compile-branch"];
})();
(function () {
  var _g170 = nexus.runtime;
  var replicate = _g170.replicate;
  var extend = _g170.extend;
  var table63 = _g170["table?"];
  var nil63 = _g170["nil?"];
  var drop = _g170.drop;
  var read_file = _g170["read-file"];
  var id_literal63 = _g170["id-literal?"];
  var apply = _g170.apply;
  var join = _g170.join;
  var inner = _g170.inner;
  var _6261 = _g170[">="];
  var write_file = _g170["write-file"];
  var to_string = _g170["to-string"];
  var _43 = _g170["+"];
  var _42 = _g170["*"];
  var _47 = _g170["/"];
  var _ = _g170["-"];
  var code = _g170.code;
  var cat = _g170.cat;
  var length = _g170.length;
  var some63 = _g170["some?"];
  var exclude = _g170.exclude;
  var split = _g170.split;
  var map = _g170.map;
  var list63 = _g170["list?"];
  var find = _g170.find;
  var splice = _g170.splice;
  var tl = _g170.tl;
  var number63 = _g170["number?"];
  var parse_number = _g170["parse-number"];
  var string_literal63 = _g170["string-literal?"];
  var is63 = _g170["is?"];
  var exit = _g170.exit;
  var sublist = _g170.sublist;
  var mapo = _g170.mapo;
  var empty63 = _g170["empty?"];
  var reduce = _g170.reduce;
  var _37 = _g170["%"];
  var composite63 = _g170["composite?"];
  var write = _g170.write;
  var atom63 = _g170["atom?"];
  var stash = _g170.stash;
  var _37message_handler = _g170["%message-handler"];
  var function63 = _g170["function?"];
  var unstash = _g170.unstash;
  var map42 = _g170["map*"];
  var _6061 = _g170["<="];
  var iterate = _g170.iterate;
  var sub = _g170.sub;
  var _60 = _g170["<"];
  var substring = _g170.substring;
  var boolean63 = _g170["boolean?"];
  var string63 = _g170["string?"];
  var add = _g170.add;
  var _61 = _g170["="];
  var char = _g170.char;
  var _62 = _g170[">"];
  var keys63 = _g170["keys?"];
  var last = _g170.last;
  var search = _g170.search;
  var hd = _g170.hd;
  var keep = _g170.keep;
  var mapt = _g170.mapt;
  var pairwise = _g170.pairwise;
  var reverse = _g170.reverse;
  var _g171 = nexus.utilities;
  var bind = _g171.bind;
  var module_key = _g171["module-key"];
  var macro_function = _g171["macro-function"];
  var special_form63 = _g171["special-form?"];
  var quoted = _g171.quoted;
  var quote_environment = _g171["quote-environment"];
  var initial_environment = _g171["initial-environment"];
  var to_id = _g171["to-id"];
  var getenv = _g171.getenv;
  var exported = _g171.exported;
  var imported = _g171.imported;
  var quote_modules = _g171["quote-modules"];
  var valid_id63 = _g171["valid-id?"];
  var bound63 = _g171["bound?"];
  var symbol63 = _g171["symbol?"];
  var symbol_expansion = _g171["symbol-expansion"];
  var indentation = _g171.indentation;
  var special63 = _g171["special?"];
  var variable63 = _g171["variable?"];
  var stash42 = _g171["stash*"];
  var setenv = _g171.setenv;
  var macroexpand = _g171.macroexpand;
  var quasiexpand = _g171.quasiexpand;
  var bind42 = _g171["bind*"];
  var macro63 = _g171["macro?"];
  global.target = "js";
})();
(function () {
  var _g244 = nexus.runtime;
  var replicate = _g244.replicate;
  var extend = _g244.extend;
  var table63 = _g244["table?"];
  var nil63 = _g244["nil?"];
  var drop = _g244.drop;
  var read_file = _g244["read-file"];
  var id_literal63 = _g244["id-literal?"];
  var apply = _g244.apply;
  var join = _g244.join;
  var inner = _g244.inner;
  var _6261 = _g244[">="];
  var write_file = _g244["write-file"];
  var to_string = _g244["to-string"];
  var _43 = _g244["+"];
  var _42 = _g244["*"];
  var _47 = _g244["/"];
  var _ = _g244["-"];
  var code = _g244.code;
  var cat = _g244.cat;
  var length = _g244.length;
  var some63 = _g244["some?"];
  var exclude = _g244.exclude;
  var split = _g244.split;
  var map = _g244.map;
  var list63 = _g244["list?"];
  var find = _g244.find;
  var splice = _g244.splice;
  var tl = _g244.tl;
  var number63 = _g244["number?"];
  var parse_number = _g244["parse-number"];
  var string_literal63 = _g244["string-literal?"];
  var is63 = _g244["is?"];
  var exit = _g244.exit;
  var sublist = _g244.sublist;
  var mapo = _g244.mapo;
  var empty63 = _g244["empty?"];
  var reduce = _g244.reduce;
  var _37 = _g244["%"];
  var composite63 = _g244["composite?"];
  var write = _g244.write;
  var atom63 = _g244["atom?"];
  var stash = _g244.stash;
  var _37message_handler = _g244["%message-handler"];
  var function63 = _g244["function?"];
  var unstash = _g244.unstash;
  var map42 = _g244["map*"];
  var _6061 = _g244["<="];
  var iterate = _g244.iterate;
  var sub = _g244.sub;
  var _60 = _g244["<"];
  var substring = _g244.substring;
  var boolean63 = _g244["boolean?"];
  var string63 = _g244["string?"];
  var add = _g244.add;
  var _61 = _g244["="];
  var char = _g244.char;
  var _62 = _g244[">"];
  var keys63 = _g244["keys?"];
  var last = _g244.last;
  var search = _g244.search;
  var hd = _g244.hd;
  var keep = _g244.keep;
  var mapt = _g244.mapt;
  var pairwise = _g244.pairwise;
  var reverse = _g244.reverse;
  var _g245 = nexus.utilities;
  var bind = _g245.bind;
  var module_key = _g245["module-key"];
  var macro_function = _g245["macro-function"];
  var special_form63 = _g245["special-form?"];
  var quoted = _g245.quoted;
  var quote_environment = _g245["quote-environment"];
  var initial_environment = _g245["initial-environment"];
  var to_id = _g245["to-id"];
  var getenv = _g245.getenv;
  var exported = _g245.exported;
  var imported = _g245.imported;
  var quote_modules = _g245["quote-modules"];
  var valid_id63 = _g245["valid-id?"];
  var bound63 = _g245["bound?"];
  var symbol63 = _g245["symbol?"];
  var symbol_expansion = _g245["symbol-expansion"];
  var indentation = _g245.indentation;
  var special63 = _g245["special?"];
  var variable63 = _g245["variable?"];
  var stash42 = _g245["stash*"];
  var setenv = _g245.setenv;
  var macroexpand = _g245.macroexpand;
  var quasiexpand = _g245.quasiexpand;
  var bind42 = _g245["bind*"];
  var macro63 = _g245["macro?"];
  global.modules = {compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"open-module": {export: true, variable: true, module: "compiler"}, "current-module": {export: true, global: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g246 = sub(body, 0);
    var imports = [];
    var imp = _g246.import;
    var exp = _g246.export;
    var _g248 = 0;
    var _g247 = (imp || []);
    while ((_g248 < length(_g247))) {
      var k = _g247[_g248];
      load_module(k);
      add(imports, imported(k));
      _g248 = (_g248 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g250 = 0;
    var _g249 = (exp || []);
    while ((_g250 < length(_g249))) {
      var k = _g249[_g250];
      setenv(k, {_stash: true, export: true});
      _g250 = (_g250 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}}}, core: {import: ["runtime", "utilities", "special", "core"], export: {guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core"}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g251 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g252 = ["table"];
      _g252._scope = scope;
      return(_g252);
    })())]), join(["let", join([x, join(["do"], _g251)]), join(["drop", "environment"]), x])]));
  }, module: "core"}, list: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g253 = body;
      for (k in _g253) {
        if (isNaN(parseInt(k))) {
          var v = _g253[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core"}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core"}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g254 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g254)]));
  }, module: "core"}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core"}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g255 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g255)]));
  }, module: "core"}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g256 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g257) {
      var lh = _g257[0];
      var rh = _g257[1];
      var _g259 = 0;
      var _g258 = bind(lh, rh);
      while ((_g259 < length(_g258))) {
        var _g260 = _g258[_g259];
        var id = _g260[0];
        var val = _g260[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g259 = (_g259 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g256)])));
  }, module: "core"}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core"}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g169, x) {
      return(x);
    }, body)));
  }, module: "core"}, "list*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g261 = xs;
      while ((i < length(_g261))) {
        var x = _g261[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core"}, "define-local": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g262 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g262))) {
      var _g263 = bind42(x, _g262);
      var args = _g263[0];
      var _g264 = _g263[1];
      return(join(["%local-function", name, args], _g264));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core"}, inc: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core"}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }, module: "core"}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g265 = sub(body, 0);
    var form = join(["fn", args], _g265);
    eval(join((function () {
      var _g266 = ["setenv", join(["quote", name])];
      _g266.macro = form;
      _g266.form = join(["quote", form]);
      return(_g266);
    })()));
    return(undefined);
  }, module: "core"}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g267 = sub(body, 0);
    var _g268 = bind42(args, _g267);
    var _g269 = _g268[0];
    var _g270 = _g268[1];
    return(join(["%function", _g269], _g270));
  }, module: "core"}, "with-bindings": {export: true, macro: function (_g271) {
    var names = _g271[0];
    var body = unstash(sublist(arguments, 1));
    var _g272 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g273 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g274 = ["setenv", x];
        _g274.variable = true;
        return(_g274);
      })())])];
      _g273.scope = true;
      return(_g273);
    })(), _g272));
  }, module: "core"}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g275 = sub(body, 0);
    var form = join(["fn", args], _g275);
    var keys = sub(_g275, length(_g275));
    eval(join((function () {
      var _g276 = ["setenv", join(["quote", name])];
      _g276.special = form;
      _g276.form = join(["quote", form]);
      return(_g276);
    })(), keys));
    return(undefined);
  }, module: "core"}, language: {export: true, macro: function () {
    return(join(["quote", target]));
  }, module: "core"}, each: {export: true, macro: function (_g277) {
    var t = _g277[0];
    var k = _g277[1];
    var v = _g277[2];
    var body = unstash(sublist(arguments, 1));
    var _g278 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g279 = ["target"];
      _g279.lua = join(["not", join(["number?", k])]);
      _g279.js = join(["isNaN", join(["parseInt", k])]);
      return(_g279);
    })()), join(["let", join([v, join(["get", t1, k])])], _g278)])])]));
  }, module: "core"}, across: {export: true, macro: function (_g280) {
    var l = _g280[0];
    var v = _g280[1];
    var i = _g280[2];
    var start = _g280[3];
    var body = unstash(sublist(arguments, 1));
    var _g281 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g281, [join(["inc", i])]))])]));
  }, module: "core"}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core"}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core"}, "define-global": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g282 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g282))) {
      var _g283 = bind42(x, _g282);
      var args = _g283[0];
      var _g284 = _g283[1];
      return(join(["%global-function", name, args], _g284));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g285 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g285)]));
  }, module: "core"}, dec: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core"}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g286 = sub(body, 0);
    add(environment, {});
    var _g287 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g286)));
    })();
    drop(environment);
    return(_g287);
  }, module: "core"}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g288 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g288))) {
      var _g289 = bind42(x, _g288);
      var args = _g289[0];
      var _g290 = _g289[1];
      return(join(["%global-function", name, args], _g290));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core"}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g292 = 0;
    var _g291 = elements;
    while ((_g292 < length(_g291))) {
      var e = _g291[_g292];
      l[e] = true;
      _g292 = (_g292 + 1);
    }
    return(join(["table"], l));
  }, module: "core"}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g293 = sub(body, 0);
    add(environment, {});
    var _g294 = (function () {
      map(function (_g295) {
        var name = _g295[0];
        var exp = _g295[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g293)));
    })();
    drop(environment);
    return(_g294);
  }, module: "core"}}}, reader: {import: ["runtime", "special", "core"], export: {read: {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, "read-table": {export: true, variable: true, module: "reader"}, "define-reader": {export: true, macro: function (_g296) {
    var char = _g296[0];
    var stream = _g296[1];
    var body = unstash(sublist(arguments, 1));
    var _g297 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g297)]));
  }, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}}}, lib: {import: ["core", "special"], export: {}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%local-function": {stmt: true, export: true, special: function (_g298) {
    var name = _g298[0];
    var args = _g298[1];
    var body = sub(_g298, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, tr: true, module: "special"}, "%for": {stmt: true, export: true, special: function (_g299) {
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
  }, tr: true, module: "special"}, "%local": {stmt: true, export: true, special: function (_g304) {
    var name = _g304[0];
    var value = _g304[1];
    var id = compile(name);
    var _g305 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g305));
  }, module: "special"}, "%function": {export: true, special: function (_g306) {
    var args = _g306[0];
    var body = sub(_g306, 1);
    return(compile_function(args, body));
  }, module: "special"}, "while": {stmt: true, export: true, special: function (_g307) {
    var condition = _g307[0];
    var body = sub(_g307, 1);
    var _g308 = compile(condition);
    var _g309 = (function () {
      indent_level = (indent_level + 1);
      var _g310 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g310);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g308 + ") {\n" + _g309 + ind + "}\n"));
    } else {
      return((ind + "while " + _g308 + " do\n" + _g309 + ind + "end\n"));
    }
  }, tr: true, module: "special"}, "error": {stmt: true, export: true, special: function (_g311) {
    var x = _g311[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, module: "special"}, "%global-function": {stmt: true, export: true, special: function (_g312) {
    var name = _g312[0];
    var args = _g312[1];
    var body = sub(_g312, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, tr: true, module: "special"}, "%array": {export: true, special: function (forms) {
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
    var _g313 = forms;
    while ((i < length(_g313))) {
      var x = _g313[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special"}, "%try": {stmt: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g314 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g314);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g315 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g315);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true, module: "special"}, "do": {stmt: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, tr: true, module: "special"}, "return": {stmt: true, export: true, special: function (_g316) {
    var x = _g316[0];
    var _g317 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g317));
  }, module: "special"}, "if": {stmt: true, export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g318 = form;
    while ((i < length(_g318))) {
      var condition = _g318[i];
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
  }, tr: true, module: "special"}, "break": {stmt: true, export: true, special: function (_g111) {
    return((indentation() + "break"));
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
    var _g319 = pairs;
    while ((i < length(_g319))) {
      var _g320 = _g319[i];
      var k = _g320[0];
      var v = _g320[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g321 = compile(v);
      var _g322 = (function () {
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
      str = (str + _g322 + sep + _g321);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special"}, "not": {export: true, special: function (_g323) {
    var x = _g323[0];
    var _g324 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g324 + ")"));
  }, module: "special"}, "get": {export: true, special: function (_g325) {
    var t = _g325[0];
    var k = _g325[1];
    var _g326 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g326, 0) === "{"))) {
      _g326 = ("(" + _g326 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g326 + "." + inner(k)));
    } else {
      return((_g326 + "[" + k1 + "]"));
    }
  }, module: "special"}, "set": {stmt: true, export: true, special: function (_g327) {
    var lh = _g327[0];
    var rh = _g327[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, module: "special"}}}, system: {import: ["special", "core"], export: {nexus: {export: true, global: true, module: "system"}}}, runtime: {import: ["special", "core"], export: {replicate: {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, type: {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, mapo: {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, "map*": {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, print: {export: true, variable: true, module: "runtime"}, mapt: {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}}}, utilities: {import: ["runtime", "special", "core"], export: {bind: {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, "make-id": {}, setenv: {export: true, variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, macroexpand: {export: true, variable: true, module: "utilities"}, "bind*": {export: true, variable: true, module: "utilities"}, indentation: {export: true, variable: true, module: "utilities"}}}, boot: {import: ["runtime", "utilities", "special", "core"], export: {}}};
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
})();
(function () {
  var _g34 = nexus.runtime;
  var replicate = _g34.replicate;
  var extend = _g34.extend;
  var table63 = _g34["table?"];
  var nil63 = _g34["nil?"];
  var drop = _g34.drop;
  var read_file = _g34["read-file"];
  var id_literal63 = _g34["id-literal?"];
  var apply = _g34.apply;
  var join = _g34.join;
  var inner = _g34.inner;
  var _6261 = _g34[">="];
  var write_file = _g34["write-file"];
  var to_string = _g34["to-string"];
  var _43 = _g34["+"];
  var _42 = _g34["*"];
  var _47 = _g34["/"];
  var _ = _g34["-"];
  var code = _g34.code;
  var cat = _g34.cat;
  var length = _g34.length;
  var some63 = _g34["some?"];
  var exclude = _g34.exclude;
  var split = _g34.split;
  var map = _g34.map;
  var list63 = _g34["list?"];
  var find = _g34.find;
  var splice = _g34.splice;
  var tl = _g34.tl;
  var number63 = _g34["number?"];
  var parse_number = _g34["parse-number"];
  var string_literal63 = _g34["string-literal?"];
  var is63 = _g34["is?"];
  var exit = _g34.exit;
  var sublist = _g34.sublist;
  var mapo = _g34.mapo;
  var empty63 = _g34["empty?"];
  var reduce = _g34.reduce;
  var _37 = _g34["%"];
  var composite63 = _g34["composite?"];
  var write = _g34.write;
  var atom63 = _g34["atom?"];
  var stash = _g34.stash;
  var _37message_handler = _g34["%message-handler"];
  var function63 = _g34["function?"];
  var unstash = _g34.unstash;
  var map42 = _g34["map*"];
  var _6061 = _g34["<="];
  var iterate = _g34.iterate;
  var sub = _g34.sub;
  var _60 = _g34["<"];
  var substring = _g34.substring;
  var boolean63 = _g34["boolean?"];
  var string63 = _g34["string?"];
  var add = _g34.add;
  var _61 = _g34["="];
  var char = _g34.char;
  var _62 = _g34[">"];
  var keys63 = _g34["keys?"];
  var last = _g34.last;
  var search = _g34.search;
  var hd = _g34.hd;
  var keep = _g34.keep;
  var mapt = _g34.mapt;
  var pairwise = _g34.pairwise;
  var reverse = _g34.reverse;
  var _g71 = nexus.utilities;
  var bind = _g71.bind;
  var module_key = _g71["module-key"];
  var macro_function = _g71["macro-function"];
  var special_form63 = _g71["special-form?"];
  var quoted = _g71.quoted;
  var quote_environment = _g71["quote-environment"];
  var initial_environment = _g71["initial-environment"];
  var to_id = _g71["to-id"];
  var getenv = _g71.getenv;
  var exported = _g71.exported;
  var imported = _g71.imported;
  var quote_modules = _g71["quote-modules"];
  var valid_id63 = _g71["valid-id?"];
  var bound63 = _g71["bound?"];
  var symbol63 = _g71["symbol?"];
  var symbol_expansion = _g71["symbol-expansion"];
  var indentation = _g71.indentation;
  var special63 = _g71["special?"];
  var variable63 = _g71["variable?"];
  var stash42 = _g71["stash*"];
  var setenv = _g71.setenv;
  var macroexpand = _g71.macroexpand;
  var quasiexpand = _g71.quasiexpand;
  var bind42 = _g71["bind*"];
  var macro63 = _g71["macro?"];
  var _g77 = nexus.reader;
  var read_all = _g77["read-all"];
  var read_from_string = _g77["read-from-string"];
  var read_table = _g77["read-table"];
  var make_stream = _g77["make-stream"];
  var read = _g77.read;
  var _g110 = nexus.compiler;
  var open_module = _g110["open-module"];
  var compile_call = _g110["compile-call"];
  var load_module = _g110["load-module"];
  var compile_body = _g110["compile-body"];
  var eval = _g110.eval;
  var compile_special = _g110["compile-special"];
  var compile_function = _g110["compile-function"];
  var in_module = _g110["in-module"];
  var compile = _g110.compile;
  var compile_branch = _g110["compile-branch"];
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
  return(main());
})();
