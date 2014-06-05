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
    return({value: x, _splice: true});
  };
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  map = function (f, l) {
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
  _g33.type = type;
  _g33.split = split;
  _g33["parse-number"] = parse_number;
  _g33.search = search;
  _g33.print = print;
  _g33.inner = inner;
  _g33.exit = exit;
  _g33.unstash = unstash;
  _g33.reduce = reduce;
  _g33[">"] = _62;
  _g33.reverse = reverse;
  _g33.sub = sub;
  _g33["boolean?"] = boolean63;
  _g33["-"] = _;
  _g33.substring = substring;
  _g33["/"] = _47;
  _g33["%message-handler"] = _37message_handler;
  _g33.last = last;
  _g33.stash = stash;
  _g33.apply = apply;
  _g33.sublist = sublist;
  _g33["to-string"] = to_string;
  _g33["list?"] = list63;
  _g33["read-file"] = read_file;
  _g33["function?"] = function63;
  _g33["table?"] = table63;
  _g33.drop = drop;
  _g33.char = char;
  _g33["atom?"] = atom63;
  _g33.mapt = mapt;
  _g33["is?"] = is63;
  _g33["number?"] = number63;
  _g33["id-literal?"] = id_literal63;
  _g33["string-literal?"] = string_literal63;
  _g33["string?"] = string63;
  _g33["nil?"] = nil63;
  _g33.write = write;
  _g33["write-file"] = write_file;
  _g33["<="] = _6061;
  _g33.cat = cat;
  _g33["empty?"] = empty63;
  _g33["="] = _61;
  _g33.hd = hd;
  _g33["keys?"] = keys63;
  _g33["some?"] = some63;
  _g33["<"] = _60;
  _g33["map*"] = map42;
  _g33["%"] = _37;
  _g33.length = length;
  _g33["*"] = _42;
  _g33["+"] = _43;
  _g33.join = join;
  _g33.map = map;
  _g33[">="] = _6261;
  _g33.code = code;
  _g33.exclude = exclude;
  _g33.extend = extend;
  _g33.mapo = mapo;
  _g33.tl = tl;
  _g33["composite?"] = composite63;
  _g33.replicate = replicate;
  _g33.iterate = iterate;
  _g33.pairwise = pairwise;
  _g33.keep = keep;
  _g33.find = find;
  _g33.add = add;
  _g33.splice = splice;
})();
(function () {
  var _g40 = nexus.runtime;
  var split = _g40.split;
  var parse_number = _g40["parse-number"];
  var to_string = _g40["to-string"];
  var search = _g40.search;
  var inner = _g40.inner;
  var table63 = _g40["table?"];
  var exit = _g40.exit;
  var replicate = _g40.replicate;
  var unstash = _g40.unstash;
  var _61 = _g40["="];
  var _60 = _g40["<"];
  var string63 = _g40["string?"];
  var _62 = _g40[">"];
  var reverse = _g40.reverse;
  var exclude = _g40.exclude;
  var _37 = _g40["%"];
  var boolean63 = _g40["boolean?"];
  var mapo = _g40.mapo;
  var _43 = _g40["+"];
  var _42 = _g40["*"];
  var _ = _g40["-"];
  var substring = _g40.substring;
  var _47 = _g40["/"];
  var cat = _g40.cat;
  var sublist = _g40.sublist;
  var read_file = _g40["read-file"];
  var function63 = _g40["function?"];
  var drop = _g40.drop;
  var char = _g40.char;
  var write_file = _g40["write-file"];
  var apply = _g40.apply;
  var is63 = _g40["is?"];
  var empty63 = _g40["empty?"];
  var hd = _g40.hd;
  var keys63 = _g40["keys?"];
  var code = _g40.code;
  var map42 = _g40["map*"];
  var _6061 = _g40["<="];
  var join = _g40.join;
  var map = _g40.map;
  var _6261 = _g40[">="];
  var _37message_handler = _g40["%message-handler"];
  var write = _g40.write;
  var stash = _g40.stash;
  var list63 = _g40["list?"];
  var tl = _g40.tl;
  var composite63 = _g40["composite?"];
  var id_literal63 = _g40["id-literal?"];
  var atom63 = _g40["atom?"];
  var reduce = _g40.reduce;
  var pairwise = _g40.pairwise;
  var keep = _g40.keep;
  var add = _g40.add;
  var number63 = _g40["number?"];
  var string_literal63 = _g40["string-literal?"];
  var nil63 = _g40["nil?"];
  var iterate = _g40.iterate;
  var some63 = _g40["some?"];
  var sub = _g40.sub;
  var length = _g40.length;
  var find = _g40.find;
  var last = _g40.last;
  var splice = _g40.splice;
  var extend = _g40.extend;
  var mapt = _g40.mapt;
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
  var reserved = {">=": true, "switch": true, "nil": true, "and": true, "while": true, ">": true, "return": true, "<": true, "not": true, "this": true, "<=": true, "break": true, "instanceof": true, "*": true, "function": true, "catch": true, "true": true, "var": true, "elseif": true, "or": true, "with": true, "do": true, "case": true, "local": true, "then": true, "end": true, "%": true, "new": true, "=": true, "typeof": true, "false": true, "finally": true, "try": true, "continue": true, "+": true, "in": true, "else": true, "==": true, "void": true, "if": true, "for": true, "delete": true, "until": true, "default": true, "debugger": true, "throw": true, "/": true, "repeat": true, "-": true};
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
      var _g70 = x;
      for (b in _g70) {
        if (isNaN(parseInt(b))) {
          var _g38 = _g70[b];
          add(imports, join(["%local", b, join(["get", m, join(["quote", b])])]));
        }
      }
      return(imports);
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
      var _g71 = ["table"];
      _g71.export = quote_frame(m.export);
      _g71.import = quoted(m.import);
      return(_g71);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g72 = {};
  nexus.utilities = _g72;
  _g72["valid-id?"] = valid_id63;
  _g72["macro-function"] = macro_function;
  _g72.indentation = indentation;
  _g72["macro?"] = macro63;
  _g72["symbol?"] = symbol63;
  _g72["to-id"] = to_id;
  _g72["bind*"] = bind42;
  _g72["special?"] = special63;
  _g72.macroexpand = macroexpand;
  _g72.quasiexpand = quasiexpand;
  _g72["initial-environment"] = initial_environment;
  _g72.imported = imported;
  _g72["bound?"] = bound63;
  _g72["quote-modules"] = quote_modules;
  _g72.exported = exported;
  _g72["module-key"] = module_key;
  _g72.bind = bind;
  _g72["stash*"] = stash42;
  _g72["variable?"] = variable63;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72["special-form?"] = special_form63;
  _g72.getenv = getenv;
  _g72["quote-environment"] = quote_environment;
  _g72.quoted = quoted;
  _g72.setenv = setenv;
})();
(function () {
  var _g74 = nexus.runtime;
  var split = _g74.split;
  var parse_number = _g74["parse-number"];
  var to_string = _g74["to-string"];
  var search = _g74.search;
  var inner = _g74.inner;
  var table63 = _g74["table?"];
  var exit = _g74.exit;
  var replicate = _g74.replicate;
  var unstash = _g74.unstash;
  var _61 = _g74["="];
  var _60 = _g74["<"];
  var string63 = _g74["string?"];
  var _62 = _g74[">"];
  var reverse = _g74.reverse;
  var exclude = _g74.exclude;
  var _37 = _g74["%"];
  var boolean63 = _g74["boolean?"];
  var mapo = _g74.mapo;
  var _43 = _g74["+"];
  var _42 = _g74["*"];
  var _ = _g74["-"];
  var substring = _g74.substring;
  var _47 = _g74["/"];
  var cat = _g74.cat;
  var sublist = _g74.sublist;
  var read_file = _g74["read-file"];
  var function63 = _g74["function?"];
  var drop = _g74.drop;
  var char = _g74.char;
  var write_file = _g74["write-file"];
  var apply = _g74.apply;
  var is63 = _g74["is?"];
  var empty63 = _g74["empty?"];
  var hd = _g74.hd;
  var keys63 = _g74["keys?"];
  var code = _g74.code;
  var map42 = _g74["map*"];
  var _6061 = _g74["<="];
  var join = _g74.join;
  var map = _g74.map;
  var _6261 = _g74[">="];
  var _37message_handler = _g74["%message-handler"];
  var write = _g74.write;
  var stash = _g74.stash;
  var list63 = _g74["list?"];
  var tl = _g74.tl;
  var composite63 = _g74["composite?"];
  var id_literal63 = _g74["id-literal?"];
  var atom63 = _g74["atom?"];
  var reduce = _g74.reduce;
  var pairwise = _g74.pairwise;
  var keep = _g74.keep;
  var add = _g74.add;
  var number63 = _g74["number?"];
  var string_literal63 = _g74["string-literal?"];
  var nil63 = _g74["nil?"];
  var iterate = _g74.iterate;
  var some63 = _g74["some?"];
  var sub = _g74.sub;
  var length = _g74.length;
  var find = _g74.find;
  var last = _g74.last;
  var splice = _g74.splice;
  var extend = _g74.extend;
  var mapt = _g74.mapt;
  var delimiters = {";": true, "\n": true, ")": true, "(": true};
  var whitespace = {" ": true, "\n": true, "\t": true};
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
  _g80 = {};
  nexus.reader = _g80;
  _g80["read-from-string"] = read_from_string;
  _g80["read-table"] = read_table;
  _g80.read = read;
  _g80["read-all"] = read_all;
  _g80["make-stream"] = make_stream;
})();
(function () {
  var _g82 = nexus.runtime;
  var split = _g82.split;
  var parse_number = _g82["parse-number"];
  var to_string = _g82["to-string"];
  var search = _g82.search;
  var inner = _g82.inner;
  var table63 = _g82["table?"];
  var exit = _g82.exit;
  var replicate = _g82.replicate;
  var unstash = _g82.unstash;
  var _61 = _g82["="];
  var _60 = _g82["<"];
  var string63 = _g82["string?"];
  var _62 = _g82[">"];
  var reverse = _g82.reverse;
  var exclude = _g82.exclude;
  var _37 = _g82["%"];
  var boolean63 = _g82["boolean?"];
  var mapo = _g82.mapo;
  var _43 = _g82["+"];
  var _42 = _g82["*"];
  var _ = _g82["-"];
  var substring = _g82.substring;
  var _47 = _g82["/"];
  var cat = _g82.cat;
  var sublist = _g82.sublist;
  var read_file = _g82["read-file"];
  var function63 = _g82["function?"];
  var drop = _g82.drop;
  var char = _g82.char;
  var write_file = _g82["write-file"];
  var apply = _g82.apply;
  var is63 = _g82["is?"];
  var empty63 = _g82["empty?"];
  var hd = _g82.hd;
  var keys63 = _g82["keys?"];
  var code = _g82.code;
  var map42 = _g82["map*"];
  var _6061 = _g82["<="];
  var join = _g82.join;
  var map = _g82.map;
  var _6261 = _g82[">="];
  var _37message_handler = _g82["%message-handler"];
  var write = _g82.write;
  var stash = _g82.stash;
  var list63 = _g82["list?"];
  var tl = _g82.tl;
  var composite63 = _g82["composite?"];
  var id_literal63 = _g82["id-literal?"];
  var atom63 = _g82["atom?"];
  var reduce = _g82.reduce;
  var pairwise = _g82.pairwise;
  var keep = _g82.keep;
  var add = _g82.add;
  var number63 = _g82["number?"];
  var string_literal63 = _g82["string-literal?"];
  var nil63 = _g82["nil?"];
  var iterate = _g82.iterate;
  var some63 = _g82["some?"];
  var sub = _g82.sub;
  var length = _g82.length;
  var find = _g82.find;
  var last = _g82.last;
  var splice = _g82.splice;
  var extend = _g82.extend;
  var mapt = _g82.mapt;
  var _g83 = nexus.utilities;
  var bind42 = _g83["bind*"];
  var imported = _g83.imported;
  var bind = _g83.bind;
  var quasiexpand = _g83.quasiexpand;
  var getenv = _g83.getenv;
  var special_form63 = _g83["special-form?"];
  var initial_environment = _g83["initial-environment"];
  var bound63 = _g83["bound?"];
  var quote_environment = _g83["quote-environment"];
  var special63 = _g83["special?"];
  var valid_id63 = _g83["valid-id?"];
  var macro63 = _g83["macro?"];
  var exported = _g83.exported;
  var macroexpand = _g83.macroexpand;
  var variable63 = _g83["variable?"];
  var macro_function = _g83["macro-function"];
  var symbol63 = _g83["symbol?"];
  var to_id = _g83["to-id"];
  var quote_modules = _g83["quote-modules"];
  var setenv = _g83.setenv;
  var module_key = _g83["module-key"];
  var quoted = _g83.quoted;
  var indentation = _g83.indentation;
  var stash42 = _g83["stash*"];
  var symbol_expansion = _g83["symbol-expansion"];
  var _g84 = nexus.reader;
  var read_table = _g84["read-table"];
  var read = _g84.read;
  var make_stream = _g84["make-stream"];
  var read_from_string = _g84["read-from-string"];
  var read_all = _g84["read-all"];
  var infix = {lua: {"=": "==", "and": true, cat: "..", "or": true, "~=": true}, common: {"%": true, "<=": true, "+": true, "*": true, "-": true, "<": true, "/": true, ">": true, ">=": true}, js: {"=": "===", "and": "&&", "or": "||", cat: "+", "~=": "!="}};
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
  compile_body = function (forms) {
    var _g86 = unstash(sublist(arguments, 1));
    var tail63 = _g86["tail?"];
    var str = "";
    var i = 0;
    var _g87 = forms;
    while ((i < length(_g87))) {
      var x = _g87[i];
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
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g91 = (function () {
      indent_level = (indent_level + 1);
      var _g92 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
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
  };
  compile_function = function (args, body) {
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
    var _g98 = getenv(hd(form));
    var stmt = _g98.stmt;
    var special = _g98.special;
    var self_tr63 = _g98.tr;
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
    var _g99 = unstash(sublist(arguments, 1));
    var stmt63 = _g99["stmt?"];
    var tail63 = _g99["tail?"];
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
  var run = eval;
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
    var _g116 = m.export;
    for (k in _g116) {
      if (isNaN(parseInt(k))) {
        var v = _g116[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  function prologue(spec) {
    if (spec) {
      var m = module(spec);
      return(join(imported(spec), map(function (x) {
        return(splice(imported(x)));
      }, m.import)));
    }
  }
  eval = function (form, spec) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(spec), [form]));
    var x = compile(macroexpand(form1));
    target = previous;
    return(run(x));
  };
  _g117 = {};
  nexus.compiler = _g117;
  _g117["in-module"] = in_module;
  _g117["compile-body"] = compile_body;
  _g117["load-module"] = load_module;
  _g117.eval = eval;
  _g117["open-module"] = open_module;
  _g117["compile-branch"] = compile_branch;
  _g117.compile = compile;
  _g117["compile-call"] = compile_call;
  _g117["compile-special"] = compile_special;
  _g117["compile-function"] = compile_function;
})();
(function () {
  var _g120 = nexus.runtime;
  var split = _g120.split;
  var parse_number = _g120["parse-number"];
  var to_string = _g120["to-string"];
  var search = _g120.search;
  var inner = _g120.inner;
  var table63 = _g120["table?"];
  var exit = _g120.exit;
  var replicate = _g120.replicate;
  var unstash = _g120.unstash;
  var _61 = _g120["="];
  var _60 = _g120["<"];
  var string63 = _g120["string?"];
  var _62 = _g120[">"];
  var reverse = _g120.reverse;
  var exclude = _g120.exclude;
  var _37 = _g120["%"];
  var boolean63 = _g120["boolean?"];
  var mapo = _g120.mapo;
  var _43 = _g120["+"];
  var _42 = _g120["*"];
  var _ = _g120["-"];
  var substring = _g120.substring;
  var _47 = _g120["/"];
  var cat = _g120.cat;
  var sublist = _g120.sublist;
  var read_file = _g120["read-file"];
  var function63 = _g120["function?"];
  var drop = _g120.drop;
  var char = _g120.char;
  var write_file = _g120["write-file"];
  var apply = _g120.apply;
  var is63 = _g120["is?"];
  var empty63 = _g120["empty?"];
  var hd = _g120.hd;
  var keys63 = _g120["keys?"];
  var code = _g120.code;
  var map42 = _g120["map*"];
  var _6061 = _g120["<="];
  var join = _g120.join;
  var map = _g120.map;
  var _6261 = _g120[">="];
  var _37message_handler = _g120["%message-handler"];
  var write = _g120.write;
  var stash = _g120.stash;
  var list63 = _g120["list?"];
  var tl = _g120.tl;
  var composite63 = _g120["composite?"];
  var id_literal63 = _g120["id-literal?"];
  var atom63 = _g120["atom?"];
  var reduce = _g120.reduce;
  var pairwise = _g120.pairwise;
  var keep = _g120.keep;
  var add = _g120.add;
  var number63 = _g120["number?"];
  var string_literal63 = _g120["string-literal?"];
  var nil63 = _g120["nil?"];
  var iterate = _g120.iterate;
  var some63 = _g120["some?"];
  var sub = _g120.sub;
  var length = _g120.length;
  var find = _g120.find;
  var last = _g120.last;
  var splice = _g120.splice;
  var extend = _g120.extend;
  var mapt = _g120.mapt;
  var _g121 = nexus.utilities;
  var bind42 = _g121["bind*"];
  var imported = _g121.imported;
  var bind = _g121.bind;
  var quasiexpand = _g121.quasiexpand;
  var getenv = _g121.getenv;
  var special_form63 = _g121["special-form?"];
  var initial_environment = _g121["initial-environment"];
  var bound63 = _g121["bound?"];
  var quote_environment = _g121["quote-environment"];
  var special63 = _g121["special?"];
  var valid_id63 = _g121["valid-id?"];
  var macro63 = _g121["macro?"];
  var exported = _g121.exported;
  var macroexpand = _g121.macroexpand;
  var variable63 = _g121["variable?"];
  var macro_function = _g121["macro-function"];
  var symbol63 = _g121["symbol?"];
  var to_id = _g121["to-id"];
  var quote_modules = _g121["quote-modules"];
  var setenv = _g121.setenv;
  var module_key = _g121["module-key"];
  var quoted = _g121.quoted;
  var indentation = _g121.indentation;
  var stash42 = _g121["stash*"];
  var symbol_expansion = _g121["symbol-expansion"];
  var _g122 = nexus.compiler;
  var eval = _g122.eval;
  var compile_branch = _g122["compile-branch"];
  var compile_call = _g122["compile-call"];
  var load_module = _g122["load-module"];
  var compile = _g122.compile;
  var in_module = _g122["in-module"];
  var compile_body = _g122["compile-body"];
  var compile_function = _g122["compile-function"];
  var open_module = _g122["open-module"];
  var compile_special = _g122["compile-special"];
})();
(function () {
  var _g229 = nexus.runtime;
  var split = _g229.split;
  var parse_number = _g229["parse-number"];
  var to_string = _g229["to-string"];
  var search = _g229.search;
  var inner = _g229.inner;
  var table63 = _g229["table?"];
  var exit = _g229.exit;
  var replicate = _g229.replicate;
  var unstash = _g229.unstash;
  var _61 = _g229["="];
  var _60 = _g229["<"];
  var string63 = _g229["string?"];
  var _62 = _g229[">"];
  var reverse = _g229.reverse;
  var exclude = _g229.exclude;
  var _37 = _g229["%"];
  var boolean63 = _g229["boolean?"];
  var mapo = _g229.mapo;
  var _43 = _g229["+"];
  var _42 = _g229["*"];
  var _ = _g229["-"];
  var substring = _g229.substring;
  var _47 = _g229["/"];
  var cat = _g229.cat;
  var sublist = _g229.sublist;
  var read_file = _g229["read-file"];
  var function63 = _g229["function?"];
  var drop = _g229.drop;
  var char = _g229.char;
  var write_file = _g229["write-file"];
  var apply = _g229.apply;
  var is63 = _g229["is?"];
  var empty63 = _g229["empty?"];
  var hd = _g229.hd;
  var keys63 = _g229["keys?"];
  var code = _g229.code;
  var map42 = _g229["map*"];
  var _6061 = _g229["<="];
  var join = _g229.join;
  var map = _g229.map;
  var _6261 = _g229[">="];
  var _37message_handler = _g229["%message-handler"];
  var write = _g229.write;
  var stash = _g229.stash;
  var list63 = _g229["list?"];
  var tl = _g229.tl;
  var composite63 = _g229["composite?"];
  var id_literal63 = _g229["id-literal?"];
  var atom63 = _g229["atom?"];
  var reduce = _g229.reduce;
  var pairwise = _g229.pairwise;
  var keep = _g229.keep;
  var add = _g229.add;
  var number63 = _g229["number?"];
  var string_literal63 = _g229["string-literal?"];
  var nil63 = _g229["nil?"];
  var iterate = _g229.iterate;
  var some63 = _g229["some?"];
  var sub = _g229.sub;
  var length = _g229.length;
  var find = _g229.find;
  var last = _g229.last;
  var splice = _g229.splice;
  var extend = _g229.extend;
  var mapt = _g229.mapt;
  var _g230 = nexus.utilities;
  var bind42 = _g230["bind*"];
  var imported = _g230.imported;
  var bind = _g230.bind;
  var quasiexpand = _g230.quasiexpand;
  var getenv = _g230.getenv;
  var special_form63 = _g230["special-form?"];
  var initial_environment = _g230["initial-environment"];
  var bound63 = _g230["bound?"];
  var quote_environment = _g230["quote-environment"];
  var special63 = _g230["special?"];
  var valid_id63 = _g230["valid-id?"];
  var macro63 = _g230["macro?"];
  var exported = _g230.exported;
  var macroexpand = _g230.macroexpand;
  var variable63 = _g230["variable?"];
  var macro_function = _g230["macro-function"];
  var symbol63 = _g230["symbol?"];
  var to_id = _g230["to-id"];
  var quote_modules = _g230["quote-modules"];
  var setenv = _g230.setenv;
  var module_key = _g230["module-key"];
  var quoted = _g230.quoted;
  var indentation = _g230.indentation;
  var stash42 = _g230["stash*"];
  var symbol_expansion = _g230["symbol-expansion"];
  global.target = "js";
})();
(function () {
  var _g365 = nexus.runtime;
  var split = _g365.split;
  var parse_number = _g365["parse-number"];
  var to_string = _g365["to-string"];
  var search = _g365.search;
  var inner = _g365.inner;
  var table63 = _g365["table?"];
  var exit = _g365.exit;
  var replicate = _g365.replicate;
  var unstash = _g365.unstash;
  var _61 = _g365["="];
  var _60 = _g365["<"];
  var string63 = _g365["string?"];
  var _62 = _g365[">"];
  var reverse = _g365.reverse;
  var exclude = _g365.exclude;
  var _37 = _g365["%"];
  var boolean63 = _g365["boolean?"];
  var mapo = _g365.mapo;
  var _43 = _g365["+"];
  var _42 = _g365["*"];
  var _ = _g365["-"];
  var substring = _g365.substring;
  var _47 = _g365["/"];
  var cat = _g365.cat;
  var sublist = _g365.sublist;
  var read_file = _g365["read-file"];
  var function63 = _g365["function?"];
  var drop = _g365.drop;
  var char = _g365.char;
  var write_file = _g365["write-file"];
  var apply = _g365.apply;
  var is63 = _g365["is?"];
  var empty63 = _g365["empty?"];
  var hd = _g365.hd;
  var keys63 = _g365["keys?"];
  var code = _g365.code;
  var map42 = _g365["map*"];
  var _6061 = _g365["<="];
  var join = _g365.join;
  var map = _g365.map;
  var _6261 = _g365[">="];
  var _37message_handler = _g365["%message-handler"];
  var write = _g365.write;
  var stash = _g365.stash;
  var list63 = _g365["list?"];
  var tl = _g365.tl;
  var composite63 = _g365["composite?"];
  var id_literal63 = _g365["id-literal?"];
  var atom63 = _g365["atom?"];
  var reduce = _g365.reduce;
  var pairwise = _g365.pairwise;
  var keep = _g365.keep;
  var add = _g365.add;
  var number63 = _g365["number?"];
  var string_literal63 = _g365["string-literal?"];
  var nil63 = _g365["nil?"];
  var iterate = _g365.iterate;
  var some63 = _g365["some?"];
  var sub = _g365.sub;
  var length = _g365.length;
  var find = _g365.find;
  var last = _g365.last;
  var splice = _g365.splice;
  var extend = _g365.extend;
  var mapt = _g365.mapt;
  var _g366 = nexus.utilities;
  var bind42 = _g366["bind*"];
  var imported = _g366.imported;
  var bind = _g366.bind;
  var quasiexpand = _g366.quasiexpand;
  var getenv = _g366.getenv;
  var special_form63 = _g366["special-form?"];
  var initial_environment = _g366["initial-environment"];
  var bound63 = _g366["bound?"];
  var quote_environment = _g366["quote-environment"];
  var special63 = _g366["special?"];
  var valid_id63 = _g366["valid-id?"];
  var macro63 = _g366["macro?"];
  var exported = _g366.exported;
  var macroexpand = _g366.macroexpand;
  var variable63 = _g366["variable?"];
  var macro_function = _g366["macro-function"];
  var symbol63 = _g366["symbol?"];
  var to_id = _g366["to-id"];
  var quote_modules = _g366["quote-modules"];
  var setenv = _g366.setenv;
  var module_key = _g366["module-key"];
  var quoted = _g366.quoted;
  var indentation = _g366.indentation;
  var stash42 = _g366["stash*"];
  var symbol_expansion = _g366["symbol-expansion"];
  global.modules = {lib: {export: {}, import: ["core", "special"]}, reader: {export: {"read-table": {export: true, variable: true, module: "reader"}, read: {export: true, variable: true, module: "reader"}, "define-reader": {export: true, macro: function (_g371) {
    var char = _g371[0];
    var stream = _g371[1];
    var body = unstash(sublist(arguments, 1));
    var _g372 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g372)]));
  }, module: "reader"}, "make-stream": {export: true, variable: true, module: "reader"}, "read-all": {export: true, variable: true, module: "reader"}, "read-from-string": {export: true, variable: true, module: "reader"}}, import: ["runtime", "special", "core"]}, compiler: {export: {eval: {export: true, variable: true, module: "compiler"}, "compile-branch": {export: true, variable: true, module: "compiler"}, "open-module": {export: true, variable: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, "define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g373 = sub(body, 0);
    var imports = [];
    var exp = _g373.export;
    var imp = _g373.import;
    var _g375 = 0;
    var _g374 = (imp || []);
    while ((_g375 < length(_g374))) {
      var k = _g374[_g375];
      load_module(k);
      imports = join(imports, imported(k));
      _g375 = (_g375 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g377 = 0;
    var _g376 = (exp || []);
    while ((_g377 < length(_g376))) {
      var k = _g376[_g377];
      setenv(k, {_stash: true, export: true});
      _g377 = (_g377 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, "current-module": {global: true, export: true, module: "compiler"}, "compile-body": {export: true, variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, "compile-call": {export: true, variable: true, module: "compiler"}, "compile-special": {export: true, variable: true, module: "compiler"}}, import: ["runtime", "utilities", "special", "core", "reader"]}, system: {export: {nexus: {global: true, export: true, module: "system"}}, import: ["special", "core"]}, boot: {export: {}, import: ["runtime", "utilities", "special", "core"]}, utilities: {export: {"bind*": {export: true, variable: true, module: "utilities"}, imported: {export: true, variable: true, module: "utilities"}, "indent-level": {global: true, export: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, getenv: {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, setenv: {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, "special?": {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, macroexpand: {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, "symbol?": {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "make-id": {}, bind: {export: true, variable: true, module: "utilities"}, indentation: {export: true, variable: true, module: "utilities"}, "stash*": {export: true, variable: true, module: "utilities"}, "symbol-expansion": {export: true, variable: true, module: "utilities"}}, import: ["runtime", "special", "core"]}, special: {export: {"%array": {special: function (forms) {
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
    var _g378 = forms;
    while ((i < length(_g378))) {
      var x = _g378[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "get": {special: function (_g379) {
    var t = _g379[0];
    var k = _g379[1];
    var _g380 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g380, 0) === "{"))) {
      _g380 = ("(" + _g380 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g380 + "." + inner(k)));
    } else {
      return((_g380 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "return": {stmt: true, special: function (_g381) {
    var x = _g381[0];
    var _g382 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g382));
  }, export: true, module: "special"}, "%global-function": {special: function (_g383) {
    var name = _g383[0];
    var args = _g383[1];
    var body = sub(_g383, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, tr: true, stmt: true, module: "special", export: true}, "while": {special: function (_g384) {
    var condition = _g384[0];
    var body = sub(_g384, 1);
    var _g385 = compile(condition);
    var _g386 = (function () {
      indent_level = (indent_level + 1);
      var _g387 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g387);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g385 + ") {\n" + _g386 + ind + "}\n"));
    } else {
      return((ind + "while " + _g385 + " do\n" + _g386 + ind + "end\n"));
    }
  }, tr: true, stmt: true, module: "special", export: true}, "set": {stmt: true, special: function (_g388) {
    var lh = _g388[0];
    var rh = _g388[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, module: "special"}, "%local": {stmt: true, special: function (_g389) {
    var name = _g389[0];
    var value = _g389[1];
    var id = compile(name);
    var _g390 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g390));
  }, export: true, module: "special"}, "%local-function": {special: function (_g391) {
    var name = _g391[0];
    var args = _g391[1];
    var body = sub(_g391, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, tr: true, stmt: true, module: "special", export: true}, "error": {stmt: true, special: function (_g392) {
    var x = _g392[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true, module: "special"}, "%for": {special: function (_g393) {
    var _g394 = _g393[0];
    var t = _g394[0];
    var k = _g394[1];
    var body = sub(_g393, 1);
    var _g395 = compile(t);
    var ind = indentation();
    var _g396 = (function () {
      indent_level = (indent_level + 1);
      var _g397 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g397);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g395 + " do\n" + _g396 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g395 + ") {\n" + _g396 + ind + "}\n"));
    }
  }, tr: true, stmt: true, module: "special", export: true}, "if": {special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g398 = form;
    while ((i < length(_g398))) {
      var condition = _g398[i];
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
  }, tr: true, stmt: true, module: "special", export: true}, "%object": {special: function (forms) {
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
    var _g399 = pairs;
    while ((i < length(_g399))) {
      var _g400 = _g399[i];
      var k = _g400[0];
      var v = _g400[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g401 = compile(v);
      var _g402 = (function () {
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
      str = (str + _g402 + sep + _g401);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "%try": {special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g403 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g403);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g404 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g404);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true, stmt: true, module: "special", export: true}, "%function": {special: function (_g405) {
    var args = _g405[0];
    var body = sub(_g405, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "break": {stmt: true, special: function (_g119) {
    return((indentation() + "break"));
  }, export: true, module: "special"}, "not": {special: function (_g406) {
    var x = _g406[0];
    var _g407 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g407 + ")"));
  }, module: "special", export: true}, "do": {special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, tr: true, stmt: true, module: "special", export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, core: {export: {"let-symbol": {module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g408 = sub(body, 0);
    add(environment, {});
    var _g409 = (function () {
      map(function (_g410) {
        var name = _g410[0];
        var exp = _g410[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g408)));
    })();
    drop(environment);
    return(_g409);
  }, export: true}, "define-global": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g411 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g411))) {
      var _g412 = bind42(x, _g411);
      var args = _g412[0];
      var _g413 = _g412[1];
      return(join(["%global-function", name, args], _g413));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, export: true}, list: {module: "core", macro: function () {
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
  }, export: true}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core"}, language: {module: "core", macro: function () {
    return(join(["quote", target]));
  }, export: true}, "with-frame": {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g415 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g416 = ["table"];
      _g416._scope = scope;
      return(_g416);
    })())]), join(["let", join([x, join(["do"], _g415)]), join(["drop", "environment"]), x])]));
  }, export: true}, "define-local": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g417 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g417))) {
      var _g418 = bind42(x, _g417);
      var args = _g418[0];
      var _g419 = _g418[1];
      return(join(["%local-function", name, args], _g419));
    } else {
      return(join(["%local", name, x]));
    }
  }, export: true}, quasiquote: {module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, dec: {module: "core", macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, export: true}, inc: {module: "core", macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, export: true}, "join*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, export: true}, "let-macro": {module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g420 = sub(body, 0);
    add(environment, {});
    var _g421 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g420)));
    })();
    drop(environment);
    return(_g421);
  }, export: true}, define: {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g422 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g422))) {
      var _g423 = bind42(x, _g422);
      var args = _g423[0];
      var _g424 = _g423[1];
      return(join(["%global-function", name, args], _g424));
    } else {
      return(join(["set", name, x]));
    }
  }, export: true}, pr: {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g425 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g425)]));
  }, export: true}, fn: {module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g426 = sub(body, 0);
    var _g427 = bind42(args, _g426);
    var _g428 = _g427[0];
    var _g429 = _g427[1];
    return(join(["%function", _g428], _g429));
  }, export: true}, "define-symbol": {module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "define-macro": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g430 = sub(body, 0);
    var form = join(["fn", args], _g430);
    var _g431 = join((function () {
      var _g432 = ["setenv", join(["quote", name])];
      _g432.macro = form;
      _g432.form = join(["quote", form]);
      return(_g432);
    })());
    eval(_g431, current_module);
    return(undefined);
  }, export: true}, "list*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g433 = xs;
      while ((i < length(_g433))) {
        var x = _g433[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, export: true}, across: {module: "core", macro: function (_g434) {
    var l = _g434[0];
    var v = _g434[1];
    var i = _g434[2];
    var start = _g434[3];
    var body = unstash(sublist(arguments, 1));
    var _g435 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g435, [join(["inc", i])]))])]));
  }, export: true}, table: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g228, x) {
      return(x);
    }, body)));
  }, export: true}, "define-special": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g436 = sub(body, 0);
    var form = join(["fn", args], _g436);
    var keys = sub(_g436, length(_g436));
    var _g437 = join((function () {
      var _g438 = ["setenv", join(["quote", name])];
      _g438.form = join(["quote", form]);
      _g438.special = form;
      return(_g438);
    })(), keys);
    eval(_g437, current_module);
    return(undefined);
  }, export: true}, guard: {module: "core", macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, export: true}, let: {module: "core", macro: function (bindings) {
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
  }, export: true}, quote: {module: "core", macro: function (form) {
    return(quoted(form));
  }, export: true}, "join!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g444 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g444)]));
  }, export: true}, "cat!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g445 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g445)]));
  }, export: true}, "set-of": {module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g447 = 0;
    var _g446 = elements;
    while ((_g447 < length(_g446))) {
      var e = _g446[_g447];
      l[e] = true;
      _g447 = (_g447 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "with-bindings": {module: "core", macro: function (_g448) {
    var names = _g448[0];
    var body = unstash(sublist(arguments, 1));
    var _g449 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g450 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g451 = ["setenv", x];
        _g451.variable = true;
        return(_g451);
      })())])];
      _g450.scope = true;
      return(_g450);
    })(), _g449));
  }, export: true}, each: {module: "core", macro: function (_g452) {
    var t = _g452[0];
    var k = _g452[1];
    var v = _g452[2];
    var body = unstash(sublist(arguments, 1));
    var _g453 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g454 = ["target"];
      _g454.lua = join(["not", join(["number?", k])]);
      _g454.js = join(["isNaN", join(["parseInt", k])]);
      return(_g454);
    })()), join(["let", join([v, join(["get", t1, k])])], _g453)])])]));
  }, export: true}, at: {module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, export: true}}, import: ["runtime", "utilities", "special", "core"]}, runtime: {export: {type: {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, print: {export: true, variable: true, module: "runtime"}, inner: {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, mapo: {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, "atom?": {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, tl: {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, pairwise: {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, "map*": {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, extend: {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, mapt: {export: true, variable: true, module: "runtime"}}, import: ["special", "core"]}};
  global.environment = [{"define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g455 = sub(body, 0);
    var imports = [];
    var exp = _g455.export;
    var imp = _g455.import;
    var _g457 = 0;
    var _g456 = (imp || []);
    while ((_g457 < length(_g456))) {
      var k = _g456[_g457];
      load_module(k);
      imports = join(imports, imported(k));
      _g457 = (_g457 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g459 = 0;
    var _g458 = (exp || []);
    while ((_g459 < length(_g458))) {
      var k = _g458[_g459];
      setenv(k, {_stash: true, export: true});
      _g459 = (_g459 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g34 = nexus.runtime;
  var split = _g34.split;
  var parse_number = _g34["parse-number"];
  var to_string = _g34["to-string"];
  var search = _g34.search;
  var inner = _g34.inner;
  var table63 = _g34["table?"];
  var exit = _g34.exit;
  var replicate = _g34.replicate;
  var unstash = _g34.unstash;
  var _61 = _g34["="];
  var _60 = _g34["<"];
  var string63 = _g34["string?"];
  var _62 = _g34[">"];
  var reverse = _g34.reverse;
  var exclude = _g34.exclude;
  var _37 = _g34["%"];
  var boolean63 = _g34["boolean?"];
  var mapo = _g34.mapo;
  var _43 = _g34["+"];
  var _42 = _g34["*"];
  var _ = _g34["-"];
  var substring = _g34.substring;
  var _47 = _g34["/"];
  var cat = _g34.cat;
  var sublist = _g34.sublist;
  var read_file = _g34["read-file"];
  var function63 = _g34["function?"];
  var drop = _g34.drop;
  var char = _g34.char;
  var write_file = _g34["write-file"];
  var apply = _g34.apply;
  var is63 = _g34["is?"];
  var empty63 = _g34["empty?"];
  var hd = _g34.hd;
  var keys63 = _g34["keys?"];
  var code = _g34.code;
  var map42 = _g34["map*"];
  var _6061 = _g34["<="];
  var join = _g34.join;
  var map = _g34.map;
  var _6261 = _g34[">="];
  var _37message_handler = _g34["%message-handler"];
  var write = _g34.write;
  var stash = _g34.stash;
  var list63 = _g34["list?"];
  var tl = _g34.tl;
  var composite63 = _g34["composite?"];
  var id_literal63 = _g34["id-literal?"];
  var atom63 = _g34["atom?"];
  var reduce = _g34.reduce;
  var pairwise = _g34.pairwise;
  var keep = _g34.keep;
  var add = _g34.add;
  var number63 = _g34["number?"];
  var string_literal63 = _g34["string-literal?"];
  var nil63 = _g34["nil?"];
  var iterate = _g34.iterate;
  var some63 = _g34["some?"];
  var sub = _g34.sub;
  var length = _g34.length;
  var find = _g34.find;
  var last = _g34.last;
  var splice = _g34.splice;
  var extend = _g34.extend;
  var mapt = _g34.mapt;
  var _g73 = nexus.utilities;
  var bind42 = _g73["bind*"];
  var imported = _g73.imported;
  var bind = _g73.bind;
  var quasiexpand = _g73.quasiexpand;
  var getenv = _g73.getenv;
  var special_form63 = _g73["special-form?"];
  var initial_environment = _g73["initial-environment"];
  var bound63 = _g73["bound?"];
  var quote_environment = _g73["quote-environment"];
  var special63 = _g73["special?"];
  var valid_id63 = _g73["valid-id?"];
  var macro63 = _g73["macro?"];
  var exported = _g73.exported;
  var macroexpand = _g73.macroexpand;
  var variable63 = _g73["variable?"];
  var macro_function = _g73["macro-function"];
  var symbol63 = _g73["symbol?"];
  var to_id = _g73["to-id"];
  var quote_modules = _g73["quote-modules"];
  var setenv = _g73.setenv;
  var module_key = _g73["module-key"];
  var quoted = _g73.quoted;
  var indentation = _g73.indentation;
  var stash42 = _g73["stash*"];
  var symbol_expansion = _g73["symbol-expansion"];
  var _g81 = nexus.reader;
  var read_table = _g81["read-table"];
  var read = _g81.read;
  var make_stream = _g81["make-stream"];
  var read_from_string = _g81["read-from-string"];
  var read_all = _g81["read-all"];
  var _g118 = nexus.compiler;
  var eval = _g118.eval;
  var compile_branch = _g118["compile-branch"];
  var compile_call = _g118["compile-call"];
  var load_module = _g118["load-module"];
  var compile = _g118.compile;
  var in_module = _g118["in-module"];
  var compile_body = _g118["compile-body"];
  var compile_function = _g118["compile-function"];
  var open_module = _g118["open-module"];
  var compile_special = _g118["compile-special"];
  function rep(str, spec) {
    var _g461 = (function () {
      try {
        return([true, eval(read_from_string(str), spec)]);
      }
      catch (_g465) {
        return([false, _g465]);
      }
    })();
    var _g1 = _g461[0];
    var x = _g461[1];
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
    var _g462 = args;
    while ((i < length(_g462))) {
      var arg = _g462[i];
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
      var _g463 = (spec || "main");
      in_module(_g463);
      if (expr) {
        return(rep(expr, _g463));
      } else {
        return(repl(_g463));
      }
    }
  }
  return(main());
})();
