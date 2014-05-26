(function () {
  global.exports = {};
  setenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g6 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g7 = _g6;
      for (k1 in _g7) {
        if (isNaN(parseInt(k1))) {
          var v = _g7[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  };
  getenv = function (k) {
    if (string63(k)) {
      return(find(function (e) {
        return(e[k]);
      }, reverse(environment)));
    }
  };
  function macro_function(k) {
    var b = getenv(k);
    return((b && b.macro));
  }  function macro63(k) {
    return(is63(macro_function(k)));
  }  special63 = function (k) {
    var b = getenv(k);
    return((b && is63(b.special)));
  };
  special_form63 = function (form) {
    return((list63(form) && special63(hd(form))));
  };
  function symbol_expansion(k) {
    var b = getenv(k);
    return((b && b.symbol));
  }  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }  function variable63(k) {
    var b = last(environment)[k];
    return((b && is63(b.variable)));
  }  bound63 = function (x) {
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x)));
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
  }  quoted = function (form) {
    if (string63(form)) {
      return(escape(form));
    } else if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map42(quoted, form)));
    }
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g59 = args;
      for (k in _g59) {
        if (isNaN(parseInt(k))) {
          var v = _g59[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  };
  stash42 = function (args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var k = undefined;
      var _g60 = args;
      for (k in _g60) {
        if (isNaN(parseInt(k))) {
          var v = _g60[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
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
        var _g61 = l;
        for (k in _g61) {
          if (isNaN(parseInt(k))) {
            var v = _g61[k];
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
  _37bind42 = function (args, body) {
    var args1 = [];
    var rest = function () {
      if ((target === "js")) {
        return(["unstash", ["sublist", "arguments", length(args1)]]);
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    };
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest()]], body)]]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g63 = 0;
      var _g62 = args;
      while ((_g63 < length(_g62))) {
        var arg = _g62[_g63];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g63 = (_g63 + 1);
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
        return([args1, [join(["let", bs], body)]]);
      }
    }
  };
  _37bind = function (lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([[id, rh]], _37bind(lh, id)));
    } else if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g64 = lh;
      while ((i < length(_g64))) {
        var x = _g64[i];
        bs = join(bs, _37bind(x, ["at", rh, i]));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, _37bind(r, ["sub", rh, length(lh)]));
      }
      var k = undefined;
      var _g65 = lh;
      for (k in _g65) {
        if (isNaN(parseInt(k))) {
          var v = _g65[k];
          if ((v === true)) {
            v = k;
          }
          if ((k != "rest")) {
            bs = join(bs, _37bind(v, ["get", rh, ["quote", k]]));
          }
        }
      }
      return(bs);
    }
  };
  _37message_handler = function (msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  };
  function quoting63(depth) {
    return(number63(depth));
  }  function quasiquoting63(depth) {
    return((quoting63(depth) && (depth > 0)));
  }  function can_unquote63(depth) {
    return((quoting63(depth) && (depth === 1)));
  }  function quasisplice63(x, depth) {
    return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
  }  macroexpand = function (form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if ((x === "%for")) {
        var _g3 = form[0];
        var _g66 = form[1];
        var t = _g66[0];
        var k = _g66[1];
        var body = sub(form, 2);
        return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g4 = form[0];
        var args = form[1];
        var _g67 = sub(form, 2);
        add(environment, {});
        var _g69 = (function () {
          var _g71 = 0;
          var _g70 = args;
          while ((_g71 < length(_g70))) {
            var _g68 = _g70[_g71];
            setenv(_g68, {_stash: true, variable: true});
            _g71 = (_g71 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g67)));
        })();
        drop(environment);
        return(_g69);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g5 = form[0];
        var name = form[1];
        var _g72 = form[2];
        var _g73 = sub(form, 3);
        add(environment, {});
        var _g75 = (function () {
          var _g77 = 0;
          var _g76 = _g72;
          while ((_g77 < length(_g76))) {
            var _g74 = _g76[_g77];
            setenv(_g74, {_stash: true, variable: true});
            _g77 = (_g77 + 1);
          }
          return(join([x, name, map42(macroexpand, _g72)], macroexpand(_g73)));
        })();
        drop(environment);
        return(_g75);
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
    var _g78 = form;
    for (k in _g78) {
      if (isNaN(parseInt(k))) {
        var v = _g78[k];
        var v = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = v;
      }
    }
    var _g80 = 0;
    var _g79 = form;
    while ((_g80 < length(_g79))) {
      var x = _g79[_g80];
      if (quasisplice63(x, depth)) {
        var x = quasiexpand(x[1]);
        add(xs, x);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g80 = (_g80 + 1);
    }
    if ((length(xs) === 1)) {
      return(hd(xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, keep(function (x) {
        return(((length(x) > 1) || !((hd(x) === "list")) || keys63(x)));
      }, xs)));
    }
  }  quasiexpand = function (form, depth) {
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
  target = "js";
  length = function (x) {
    return(x.length);
  };
  empty63 = function (x) {
    return((length(x) === 0));
  };
  substring = function (str, from, upto) {
    return((str.substring)(from, upto));
  };
  sublist = function (l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  };
  sub = function (x, from, upto) {
    var _g81 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g81, upto));
    } else {
      var l = sublist(x, _g81, upto);
      var k = undefined;
      var _g82 = x;
      for (k in _g82) {
        if (isNaN(parseInt(k))) {
          var v = _g82[k];
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
    if (nil63(l1)) {
      return(l2);
    } else if (nil63(l2)) {
      return(l1);
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
      var _g83 = l1;
      for (k in _g83) {
        if (isNaN(parseInt(k))) {
          var v = _g83[k];
          l[k] = v;
        }
      }
      var _g85 = undefined;
      var _g84 = l2;
      for (_g85 in _g84) {
        if (isNaN(parseInt(_g85))) {
          var v = _g84[_g85];
          l[_g85] = v;
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
    var _g87 = 0;
    var _g86 = l;
    while ((_g87 < length(_g86))) {
      var x = _g86[_g87];
      if (f(x)) {
        add(l1, x);
      }
      _g87 = (_g87 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g89 = 0;
    var _g88 = l;
    while ((_g89 < length(_g88))) {
      var x = _g88[_g89];
      var x = f(x);
      if (x) {
        return(x);
      }
      _g89 = (_g89 + 1);
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
  }  map = function (f, l) {
    var l1 = [];
    var _g99 = 0;
    var _g98 = l;
    while ((_g99 < length(_g98))) {
      var x = _g98[_g99];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g99 = (_g99 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g100 = t;
    for (k in _g100) {
      if (isNaN(parseInt(k))) {
        var v = _g100[k];
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
    var _g101 = t;
    for (k in _g101) {
      if (isNaN(parseInt(k))) {
        var v = _g101[k];
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
    var _g102 = t;
    for (k in _g102) {
      if (isNaN(parseInt(k))) {
        var v = _g102[k];
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
    var k63 = false;
    var k = undefined;
    var _g103 = t;
    for (k in _g103) {
      if (isNaN(parseInt(k))) {
        var v = _g103[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g104 = sub(xs, 0);
    return(join(t, _g104));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g105 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g106 = t;
    for (k in _g106) {
      if (isNaN(parseInt(k))) {
        var v = _g106[k];
        if (!(_g105[k])) {
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
    var _g107 = sub(xs, 0);
    if (empty63(_g107)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g107));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g110 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g110));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g111 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g111)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g112 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g112));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g113 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g113)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g114 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g114)));
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
      var _g115 = x;
      for (k in _g115) {
        if (isNaN(parseInt(k))) {
          var v = _g115[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g116 = x1;
      while ((i < length(_g116))) {
        var y = _g116[i];
        str = (str + to_string(y));
        if ((i < (length(x1) - 1))) {
          str = (str + " ");
        }
        i = (i + 1);
      }
      return((str + ")"));
    }
  };
  type = function (x) {
    return(typeof(x));
  };
  apply = function (f, args) {
    var _g117 = stash(args);
    return((f.apply)(f, _g117));
  };
  var id_count = 0;
  make_id = function () {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  };
  _g119 = {};
  exports.core = _g119;
  _g119.replicate = replicate;
  _g119["id-literal?"] = id_literal63;
  _g119.substring = substring;
  _g119.char = char;
  _g119.join = join;
  _g119.map = map;
  _g119.mapo = mapo;
  _g119.hd = hd;
  _g119["special?"] = special63;
  _g119["boolean?"] = boolean63;
  _g119.type = type;
  _g119.add = add;
  _g119["make-id"] = make_id;
  _g119.splice = splice;
  _g119["table?"] = table63;
  _g119.sub = sub;
  _g119["%"] = _37;
  _g119["+"] = _43;
  _g119["*"] = _42;
  _g119["-"] = _;
  _g119["/"] = _47;
  _g119.find = find;
  _g119["%bind"] = _37bind;
  _g119["%bind*"] = _37bind42;
  _g119["keys?"] = keys63;
  _g119["nil?"] = nil63;
  _g119["parse-number"] = parse_number;
  _g119.target = target;
  _g119.unstash = unstash;
  _g119.quasiexpand = quasiexpand;
  _g119["function?"] = function63;
  _g119["cat"] = cat;
  _g119.getenv = getenv;
  _g119.inner = inner;
  _g119.setenv = setenv;
  _g119.iterate = iterate;
  _g119[">="] = _6261;
  _g119["<="] = _6061;
  _g119["bound?"] = bound63;
  _g119["to-string"] = to_string;
  _g119["empty?"] = empty63;
  _g119.exclude = exclude;
  _g119["map*"] = map42;
  _g119.reduce = reduce;
  _g119.write = write;
  _g119["string-literal?"] = string_literal63;
  _g119.apply = apply;
  _g119["atom?"] = atom63;
  _g119.sublist = sublist;
  _g119["<"] = _60;
  _g119.macroexpand = macroexpand;
  _g119["stash*"] = stash42;
  _g119.code = code;
  _g119.exit = exit;
  _g119["is?"] = is63;
  _g119["read-file"] = read_file;
  _g119.last = last;
  _g119.quoted = quoted;
  _g119["%message-handler"] = _37message_handler;
  _g119["="] = _61;
  _g119[">"] = _62;
  _g119.split = split;
  _g119.tl = tl;
  _g119.drop = drop;
  _g119.length = length;
  _g119.extend = extend;
  _g119["special-form?"] = special_form63;
  _g119.mapt = mapt;
  _g119["write-file"] = write_file;
  _g119.reverse = reverse;
  _g119.print = print;
  _g119.search = search;
  _g119["number?"] = number63;
  _g119.pairwise = pairwise;
  _g119["string?"] = string63;
  _g119["composite?"] = composite63;
  _g119["list?"] = list63;
  _g119.keep = keep;
})();
(function () {
  var delimiters = {")": true, ";": true, "(": true, "\n": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
  make_stream = function (str) {
    return({string: str, pos: 0, len: length(str)});
  };
  function peek_char(s) {
    if ((s.pos < s.len)) {
      return(char(s.string, s.pos));
    }
  }  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = (s.pos + 1);
      return(c);
    }
  }  function skip_non_code(s) {
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
  }  read_table = {};
  var eof = {};
  function key63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":")));
  }  function flag63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
  }  read_table[""] = function (s) {
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
        return(["get", b, ["quote", a]]);
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
  read = function (s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return(((read_table[c] || read_table[""]))(s));
    } else {
      return(eof);
    }
  };
  read_all = function (s) {
    var l = [];
    while (true) {
      var form = read(s);
      if ((form === eof)) {
        break;
      }
      add(l, form);
    }
    return(l);
  };
  read_from_string = function (str) {
    return(read(make_stream(str)));
  };
  _g123 = {};
  exports.reader = _g123;
  _g123["read-table"] = read_table;
  _g123["read-all"] = read_all;
  _g123["read-from-string"] = read_from_string;
  _g123.read = read;
  _g123["make-stream"] = make_stream;
})();
(function () {
  var infix = {common: {"%": true, ">=": true, "<=": true, "+": true, "*": true, "-": true, "<": true, "/": true, ">": true}, js: {"and": "&&", "=": "===", "cat": "+", "~=": "!=", "or": "||"}, lua: {"and": true, "=": "==", "cat": "..", "~=": true, "or": true}};
  function getop(op) {
    var op1 = (infix.common[op] || infix[target][op]);
    if ((op1 === true)) {
      return(op);
    } else {
      return(op1);
    }
  }  function infix63(form) {
    return((list63(form) && is63(getop(hd(form)))));
  }  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }  valid_id63 = function (id) {
    if (empty63(id)) {
      return(false);
    } else if (special63(id)) {
      return(false);
    } else if (getop(id)) {
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
  function compile_id(id) {
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
  }  function compile_args(args) {
    var str = "(";
    var i = 0;
    var _g124 = args;
    while ((i < length(_g124))) {
      var arg = _g124[i];
      str = (str + compile(arg));
      if ((i < (length(args) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + ")"));
  }  function compile_atom(x) {
    if (((x === "nil") && (target === "lua"))) {
      return(x);
    } else if ((x === "nil")) {
      return("undefined");
    } else if (id_literal63(x)) {
      return(inner(x));
    } else if (string_literal63(x)) {
      return(x);
    } else if (string63(x)) {
      return(compile_id(x));
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
  }  compile_body = function (forms) {
    var _g125 = unstash(sublist(arguments, 1));
    var tail63 = _g125["tail?"];
    var str = "";
    var i = 0;
    var _g126 = forms;
    while ((i < length(_g126))) {
      var x = _g126[i];
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
  function compile_infix(_g127) {
    var op = _g127[0];
    var args = sub(_g127, 1);
    var str = "(";
    var op = getop(op);
    var i = 0;
    var _g128 = args;
    while ((i < length(_g128))) {
      var arg = _g128[i];
      if (((op === "-") && (length(args) === 1))) {
        str = (str + op + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + op + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g129 = (function () {
      indent_level = (indent_level + 1);
      var _g130 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g130);
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
      return((ind + "if (" + cond1 + ") {\n" + _g129 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g129 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g129 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g129 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g129 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g129 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g131 = unstash(sublist(arguments, 2));
    var name = _g131.name;
    var prefix = _g131.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var prefix = (prefix || "");
    var args = compile_args(args);
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g132 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g132);
    })();
    var ind = indentation();
    var tr = (function () {
      if (name) {
        return("end\n");
      } else {
        return("end");
      }
    })();
    if ((target === "js")) {
      return(("function " + id + args + " {\n" + body + ind + "}"));
    } else {
      return((prefix + "function " + id + args + "\n" + body + ind + tr));
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
  }  compile_special = function (form, stmt63, tail63) {
    var _g133 = getenv(hd(form));
    var self_tr63 = _g133.tr;
    var stmt = _g133.stmt;
    var special = _g133.special;
    if ((!(stmt63) && stmt)) {
      return(compile([["%function", [], form]], {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  };
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }  compile = function (form) {
    var _g134 = unstash(sublist(arguments, 1));
    var stmt63 = _g134["stmt?"];
    var tail63 = _g134["tail?"];
    if ((tail63 && can_return63(form))) {
      form = ["return", form];
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
      var form = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + form + tr));
    }
  };
  compile_toplevel = function (form) {
    return(compile(macroexpand(form), {_stash: true, "stmt?": true}));
  };
  function encapsulate(body) {
    var form = join(["do"], join(body, [["%export"]]));
    return([["%function", [], macroexpand(form)]]);
  }  compile_file = function (file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  };
  var compiler_output = undefined;
  var compilation_level = undefined;
  var run = eval;
  eval = function (form) {
    var previous = target;
    target = "js";
    var str = compile(macroexpand(form));
    target = previous;
    return(run(str));
  };
  current_module = undefined;
  module_key = function (spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw "Unsupported module specification";
    }
  };
  function module(spec) {
    return(modules[module_key(spec)]);
  }  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }  compile_module = function (spec) {
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
    var _g142 = toplevel;
    for (name in _g142) {
      if (isNaN(parseInt(name))) {
        var binding = _g142[name];
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
  }  load_module = function (spec) {
    if ((nil63(module(spec)) || (compilation_level === 1))) {
      _37compile_module(spec);
    }
    return(open_module(spec));
  };
  open_module = function (spec) {
    var m = module(spec);
    var frame = last(environment);
    var k = undefined;
    var _g143 = m.export;
    for (k in _g143) {
      if (isNaN(parseInt(k))) {
        var v = _g143[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g144 = {};
  exports.compiler = _g144;
  _g144["open-module"] = open_module;
  _g144.compile = compile;
  _g144["module-key"] = module_key;
  _g144["in-module"] = in_module;
  _g144["compile-module"] = compile_module;
  _g144["compile-call"] = compile_call;
  _g144["compile-special"] = compile_special;
  _g144["load-module"] = load_module;
  _g144["compile-branch"] = compile_branch;
  _g144.eval = eval;
  _g144["compile-toplevel"] = compile_toplevel;
  _g144["compile-body"] = compile_body;
  _g144["valid-id?"] = valid_id63;
  _g144["compile-function"] = compile_function;
  _g144["compiler-output"] = compiler_output;
})();
(function () {
  indent_level = 0;
  indentation = function () {
    return(apply(cat, replicate(indent_level, "  ")));
  };
  function quote_binding(b) {
    b = extend(b, {_stash: true, module: ["quote", b.module]});
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
    } else if ((b.macro && b.form)) {
      return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
    } else if ((b.special && b.form)) {
      return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
    } else if (is63(b.variable)) {
      return(b);
    }
  }  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g145, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    var _g146 = ["table"];
    _g146.import = quoted(m.import);
    _g146.export = quote_frame(m.export);
    return(_g146);
  }  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g147 = {};
  exports.utilities = _g147;
  _g147["indent-level"] = indent_level;
  _g147.indentation = indentation;
  _g147["initial-environment"] = initial_environment;
  _g147["quote-environment"] = quote_environment;
  _g147["quote-modules"] = quote_modules;
})();
(function () {
  _g192 = {};
  exports.special = _g192;
})();
(function () {
  modules = {utilities: {import: ["core", "special"], export: {indentation: {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "quote-modules": {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "indent-level": {export: true, module: "utilities", variable: true}}}, lib: {import: ["core", "special"], export: {}}, compiler: {import: ["reader", "core", "utilities", "special"], export: {"compiler-output": {export: true, module: "compiler", variable: true}, "valid-id?": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g193 = sub(body, 0);
    var imp = _g193.import;
    var exp = _g193.export;
    map(load_module, imp);
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g195 = 0;
    var _g194 = (exp || []);
    while ((_g195 < length(_g194))) {
      var k = _g194[_g195];
      setenv(k, {_stash: true, export: true});
      _g195 = (_g195 + 1);
    }
  }, export: true}, "in-module": {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-toplevel": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "module-key": {export: true, module: "compiler", variable: true}, "compile-module": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}}}, reader: {import: ["core", "special"], export: {read: {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g196) {
    var char = _g196[0];
    var stream = _g196[1];
    var body = unstash(sublist(arguments, 1));
    var _g197 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g197)]);
  }}, "make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}}}, boot: {import: ["core", "special", "utilities"], export: {}}, special: {import: ["core", "compiler", "special", "utilities"], export: {"not": {module: "special", special: function (_g198) {
    var x = _g198[0];
    var x = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + x + ")"));
  }, export: true}, "%array": {module: "special", special: function (forms) {
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
    var _g199 = forms;
    while ((i < length(_g199))) {
      var x = _g199[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true}, "%object": {module: "special", special: function (forms) {
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
    var _g200 = pairs;
    while ((i < length(_g200))) {
      var _g201 = _g200[i];
      var k = _g201[0];
      var v = _g201[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var v = compile(v);
      var k = (function () {
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
      str = (str + k + sep + v);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true}, "%for": {export: true, tr: true, stmt: true, special: function (_g202) {
    var _g203 = _g202[0];
    var t = _g203[0];
    var k = _g203[1];
    var body = sub(_g202, 1);
    var t = compile(t);
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g204 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g204);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
    }
  }, module: "special"}, "get": {module: "special", special: function (_g205) {
    var t = _g205[0];
    var k = _g205[1];
    var t = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(t, 0) === "{"))) {
      t = ("(" + t + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((t + "." + inner(k)));
    } else {
      return((t + "[" + k1 + "]"));
    }
  }, export: true}, "%local": {module: "special", stmt: true, special: function (_g206) {
    var name = _g206[0];
    var value = _g206[1];
    var id = compile(name);
    var value = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + value));
  }, export: true}, "%global-function": {export: true, tr: true, stmt: true, special: function (_g207) {
    var name = _g207[0];
    var args = _g207[1];
    var body = sub(_g207, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
    }
  }, module: "special"}, "do": {export: true, tr: true, stmt: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, module: "special"}, "while": {export: true, tr: true, stmt: true, special: function (_g208) {
    var condition = _g208[0];
    var body = sub(_g208, 1);
    var condition = compile(condition);
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g209 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g209);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
    }
  }, module: "special"}, "%function": {module: "special", special: function (_g210) {
    var args = _g210[0];
    var body = sub(_g210, 1);
    return(compile_function(args, body));
  }, export: true}, "%local-function": {export: true, tr: true, stmt: true, special: function (_g211) {
    var name = _g211[0];
    var args = _g211[1];
    var body = sub(_g211, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, module: "special"}, "if": {export: true, tr: true, stmt: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g212 = form;
    while ((i < length(_g212))) {
      var condition = _g212[i];
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
  }, module: "special"}, "return": {module: "special", stmt: true, special: function (_g213) {
    var x = _g213[0];
    var x = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + x));
  }, export: true}, "break": {module: "special", stmt: true, special: function (_g148) {
    return((indentation() + "break"));
  }, export: true}, "set": {module: "special", stmt: true, special: function (_g214) {
    var lh = _g214[0];
    var rh = _g214[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true}, "error": {module: "special", stmt: true, special: function (_g215) {
    var x = _g215[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, export: true}, "%try": {export: true, tr: true, stmt: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g216 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g216);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, e]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g217 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g217);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, module: "special"}}}, core: {import: ["core", "special"], export: {replicate: {module: "core", variable: true, export: true}, "empty?": {module: "core", variable: true, export: true}, across: {module: "core", macro: function (_g218) {
    var l = _g218[0];
    var v = _g218[1];
    var i = _g218[2];
    var start = _g218[3];
    var body = unstash(sublist(arguments, 1));
    var _g219 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g219, [["inc", i]]))]]);
  }, export: true}, "define-global": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g220 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g220))) {
      var _g221 = _37bind42(x, _g220);
      var args = _g221[0];
      var _g222 = _g221[1];
      return(join(["%global-function", name, args], _g222));
    } else {
      return(["set", name, x]);
    }
  }, export: true}, char: {module: "core", variable: true, export: true}, exclude: {module: "core", variable: true, export: true}, "map*": {module: "core", variable: true, export: true}, join: {module: "core", variable: true, export: true}, "%export": {module: "core", macro: function () {
    var toplevel = hd(environment);
    var m = make_id();
    var k = module_key(current_module);
    var form = ["do", ["define", m, ["table"]], ["set", ["get", "exports", ["quote", k]], m]];
    var k = undefined;
    var _g223 = toplevel;
    for (k in _g223) {
      if (isNaN(parseInt(k))) {
        var v = _g223[k];
        if ((v.variable && v.export && (v.module === current_module))) {
          add(form, ["set", ["get", m, ["quote", k]], k]);
        }
      }
    }
    return(form);
  }, export: true}, drop: {module: "core", variable: true, export: true}, map: {module: "core", variable: true, export: true}, mapo: {module: "core", variable: true, export: true}, write: {module: "core", variable: true, export: true}, "define-special": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g224 = sub(body, 0);
    var form = join(["fn", args], _g224);
    var keys = sub(_g224, length(_g224));
    eval(join((function () {
      var _g225 = ["setenv", ["quote", name]];
      _g225.special = form;
      _g225.form = ["quote", form];
      return(_g225);
    })(), keys));
    return(undefined);
  }, export: true}, hd: {module: "core", variable: true, export: true}, "special?": {module: "core", variable: true, export: true}, "cat!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g226 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g226)]);
  }, export: true}, "boolean?": {module: "core", variable: true, export: true}, quote: {module: "core", macro: function (form) {
    return(quoted(form));
  }, export: true}, type: {module: "core", variable: true, export: true}, add: {module: "core", variable: true, export: true}, define: {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g227 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    return(join(["define-global", name, x], _g227));
  }, export: true}, "define-local": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g228 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g228))) {
      var _g229 = _37bind42(x, _g228);
      var args = _g229[0];
      var _g230 = _g229[1];
      return(join(["%local-function", name, args], _g230));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "string-literal?": {module: "core", variable: true, export: true}, "make-id": {module: "core", variable: true, export: true}, splice: {module: "core", variable: true, export: true}, "table?": {module: "core", variable: true, export: true}, sub: {module: "core", variable: true, export: true}, keep: {module: "core", variable: true, export: true}, "list?": {module: "core", variable: true, export: true}, apply: {module: "core", variable: true, export: true}, "id-literal?": {module: "core", variable: true, export: true}, "%": {module: "core", variable: true, export: true}, "define-symbol": {module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "join!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g231 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g231)]);
  }, export: true}, "with-bindings": {module: "core", macro: function (_g232) {
    var names = _g232[0];
    var body = unstash(sublist(arguments, 1));
    var _g233 = sub(body, 0);
    var x = make_id();
    return(join(["with-frame", ["across", [names, x], (function () {
      var _g234 = ["setenv", x];
      _g234.variable = true;
      return(_g234);
    })()]], _g233));
  }, export: true}, "composite?": {module: "core", variable: true, export: true}, "set-of": {module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g236 = 0;
    var _g235 = elements;
    while ((_g236 < length(_g235))) {
      var e = _g235[_g236];
      l[e] = true;
      _g236 = (_g236 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "+": {module: "core", variable: true, export: true}, "*": {module: "core", variable: true, export: true}, "-": {module: "core", variable: true, export: true}, dec: {module: "core", macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, "/": {module: "core", variable: true, export: true}, pr: {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var xs = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], xs)]);
  }, export: true}, "string?": {module: "core", variable: true, export: true}, find: {module: "core", variable: true, export: true}, "define-macro": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g237 = sub(body, 0);
    var form = join(["fn", args], _g237);
    eval((function () {
      var _g238 = ["setenv", ["quote", name]];
      _g238.form = ["quote", form];
      _g238.macro = form;
      return(_g238);
    })());
    return(undefined);
  }, export: true}, each: {module: "core", macro: function (_g239) {
    var t = _g239[0];
    var k = _g239[1];
    var v = _g239[2];
    var body = unstash(sublist(arguments, 1));
    var _g240 = sub(body, 0);
    var t1 = make_id();
    return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
      var _g241 = ["target"];
      _g241.lua = ["not", ["number?", k]];
      _g241.js = ["isNaN", ["parseInt", k]];
      return(_g241);
    })(), join(["let", [v, ["get", t1, k]]], _g240)]]]);
  }, export: true}, pairwise: {module: "core", variable: true, export: true}, "%bind": {module: "core", variable: true, export: true}, "read-file": {module: "core", variable: true, export: true}, last: {module: "core", variable: true, export: true}, "%bind*": {module: "core", variable: true, export: true}, "number?": {module: "core", variable: true, export: true}, at: {module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = ["+", i, 1];
    }
    return(["get", l, i]);
  }, export: true}, "%message-handler": {module: "core", variable: true, export: true}, "=": {module: "core", variable: true, export: true}, "keys?": {module: "core", variable: true, export: true}, "let-symbol": {module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g242 = sub(body, 0);
    add(environment, {});
    var _g243 = (function () {
      map(function (_g244) {
        var name = _g244[0];
        var exp = _g244[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g242)));
    })();
    drop(environment);
    return(_g243);
  }, export: true}, ">": {module: "core", variable: true, export: true}, search: {module: "core", variable: true, export: true}, "nil?": {module: "core", variable: true, export: true}, print: {module: "core", variable: true, export: true}, quasiquote: {module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, reverse: {module: "core", variable: true, export: true}, table: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g2, x) {
      return(x);
    }, body)));
  }, export: true}, "write-file": {module: "core", variable: true, export: true}, mapt: {module: "core", variable: true, export: true}, "special-form?": {module: "core", variable: true, export: true}, quoted: {module: "core", variable: true, export: true}, language: {module: "core", macro: function () {
    return(["quote", target]);
  }, export: true}, "with-frame": {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var x = make_id();
    return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}, "list*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g245 = xs;
      while ((i < length(_g245))) {
        var x = _g245[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, export: true}, extend: {module: "core", variable: true, export: true}, split: {module: "core", variable: true, export: true}, "parse-number": {module: "core", variable: true, export: true}, let: {module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g246 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g247) {
      var lh = _g247[0];
      var rh = _g247[1];
      var _g249 = 0;
      var _g248 = _37bind(lh, rh);
      while ((_g249 < length(_g248))) {
        var _g250 = _g248[_g249];
        var id = _g250[0];
        var val = _g250[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g249 = (_g249 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g246)])));
  }, export: true}, tl: {module: "core", variable: true, export: true}, target: {module: "core", export: true, variable: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, unstash: {module: "core", variable: true, export: true}, length: {module: "core", variable: true, export: true}, quasiexpand: {module: "core", variable: true, export: true}, list: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g251 = body;
      for (k in _g251) {
        if (isNaN(parseInt(k))) {
          var v = _g251[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, fn: {module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g252 = sub(body, 0);
    var _g253 = _37bind42(args, _g252);
    var args = _g253[0];
    var _g254 = _g253[1];
    return(join(["%function", args], _g254));
  }, export: true}, "let-macro": {module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g255 = sub(body, 0);
    add(environment, {});
    var _g256 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g255)));
    })();
    drop(environment);
    return(_g256);
  }, export: true}, inc: {module: "core", macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, "is?": {module: "core", variable: true, export: true}, "function?": {module: "core", variable: true, export: true}, exit: {module: "core", variable: true, export: true}, "cat": {module: "core", variable: true, export: true}, getenv: {module: "core", variable: true, export: true}, code: {module: "core", variable: true, export: true}, inner: {module: "core", variable: true, export: true}, "stash*": {module: "core", variable: true, export: true}, setenv: {module: "core", variable: true, export: true}, iterate: {module: "core", variable: true, export: true}, macroexpand: {module: "core", variable: true, export: true}, "<": {module: "core", variable: true, export: true}, ">=": {module: "core", variable: true, export: true}, sublist: {module: "core", variable: true, export: true}, "<=": {module: "core", variable: true, export: true}, "atom?": {module: "core", variable: true, export: true}, guard: {module: "core", macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "bound?": {module: "core", variable: true, export: true}, substring: {module: "core", variable: true, export: true}, "join*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "to-string": {module: "core", variable: true, export: true}, reduce: {module: "core", variable: true, export: true}}}};
  environment = [{"define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g257 = sub(body, 0);
    var imp = _g257.import;
    var exp = _g257.export;
    map(load_module, imp);
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g259 = 0;
    var _g258 = (exp || []);
    while ((_g259 < length(_g258))) {
      var k = _g258[_g259];
      setenv(k, {_stash: true, export: true});
      _g259 = (_g259 + 1);
    }
  }, export: true}}];
  _g260 = {};
  exports.boot = _g260;
  _g260.modules = modules;
  _g260.environment = environment;
})();
(function () {
  function rep(str) {
    var _g261 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g264) {
        return([false, _g264]);
      }
    })();
    var _g1 = _g261[0];
    var x = _g261[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }  function repl() {
    var step = function (str) {
      rep(str);
      return(write("> "));
    };
    write("> ");
    (process.stdin.setEncoding)("utf8");
    return((process.stdin.on)("data", step));
  }  function usage() {
    print((to_string("usage: lumen [options] <module>") + " "));
    print((to_string("options:") + " "));
    print((to_string("  -o <output>\tOutput file") + " "));
    print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
    print((to_string("  -e <expr>\tExpression to evaluate") + " "));
    return(exit());
  }  function main() {
    var args = sub(process.argv, 2);
    if (((hd(args) === "-h") || (hd(args) === "--help"))) {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var i = 0;
    var _g262 = args;
    while ((i < length(_g262))) {
      var arg = _g262[i];
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
      var spec = (spec || "main");
      in_module(spec);
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }  main();
  _g263 = {};
  exports.main = _g263;
})();
