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
  setenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g40 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g41 = _g40;
      for (k1 in _g41) {
        if (isNaN(parseInt(k1))) {
          var v = _g41[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  };
  getenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g42 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g43 = keys63(_g42);
        if (_g43) {
          return(b[_g43]);
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
      var _g44 = args;
      for (k in _g44) {
        if (isNaN(parseInt(k))) {
          var v = _g44[k];
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
      var _g45 = lh;
      while ((i < length(_g45))) {
        var x = _g45[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g46 = lh;
      for (k in _g46) {
        if (isNaN(parseInt(k))) {
          var v = _g46[k];
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
      var _g48 = 0;
      var _g47 = args;
      while ((_g48 < length(_g47))) {
        var arg = _g47[_g48];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g48 = (_g48 + 1);
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
        var _g49 = form[1];
        var t = _g49[0];
        var k = _g49[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g36 = form[0];
        var args = form[1];
        var _g50 = sub(form, 2);
        add(environment, {_scope: true});
        var _g52 = (function () {
          var _g54 = 0;
          var _g53 = args;
          while ((_g54 < length(_g53))) {
            var _g51 = _g53[_g54];
            setenv(_g51, {_stash: true, variable: true});
            _g54 = (_g54 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g50)));
        })();
        drop(environment);
        return(_g52);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g37 = form[0];
        var name = form[1];
        var _g55 = form[2];
        var _g56 = sub(form, 3);
        add(environment, {_scope: true});
        var _g58 = (function () {
          var _g60 = 0;
          var _g59 = _g55;
          while ((_g60 < length(_g59))) {
            var _g57 = _g59[_g60];
            setenv(_g57, {_stash: true, variable: true});
            _g60 = (_g60 + 1);
          }
          return(join([x, name, map42(macroexpand, _g55)], macroexpand(_g56)));
        })();
        drop(environment);
        return(_g58);
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
    var _g61 = form;
    for (k in _g61) {
      if (isNaN(parseInt(k))) {
        var v = _g61[k];
        var _g62 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g62;
      }
    }
    var _g64 = 0;
    var _g63 = form;
    while ((_g64 < length(_g63))) {
      var x = _g63[_g64];
      if (quasisplice63(x, depth)) {
        var _g65 = quasiexpand(x[1]);
        add(xs, _g65);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g64 = (_g64 + 1);
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
    var _g66 = toplevel;
    for (n in _g66) {
      if (isNaN(parseInt(n))) {
        var b = _g66[n];
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
      var _g67 = x;
      for (b in _g67) {
        if (isNaN(parseInt(b))) {
          var _g38 = _g67[b];
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
      var _g68 = ["table"];
      _g68.import = quoted(m.import);
      _g68.export = quote_frame(m.export);
      return(_g68);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g69 = {};
  nexus.utilities = _g69;
  _g69.setenv = setenv;
  _g69.getenv = getenv;
  _g69["macro-function"] = macro_function;
  _g69["macro?"] = macro63;
  _g69["special?"] = special63;
  _g69["special-form?"] = special_form63;
  _g69["symbol-expansion"] = symbol_expansion;
  _g69["symbol?"] = symbol63;
  _g69["variable?"] = variable63;
  _g69["bound?"] = bound63;
  _g69.quoted = quoted;
  _g69["stash*"] = stash42;
  _g69.bind = bind;
  _g69["bind*"] = bind42;
  _g69.quasiexpand = quasiexpand;
  _g69.macroexpand = macroexpand;
  _g69.indentation = indentation;
  _g69["valid-id?"] = valid_id63;
  _g69["to-id"] = to_id;
  _g69["module-key"] = module_key;
  _g69.imported = imported;
  _g69.exported = exported;
  _g69["quote-environment"] = quote_environment;
  _g69["quote-modules"] = quote_modules;
  _g69["initial-environment"] = initial_environment;
})();
(function () {
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
  _g74 = {};
  nexus.reader = _g74;
  _g74["make-stream"] = make_stream;
  _g74["read-table"] = read_table;
  _g74.read = read;
  _g74["read-all"] = read_all;
  _g74["read-from-string"] = read_from_string;
})();
(function () {
  var _g76 = nexus.utilities;
  var symbol63 = _g76["symbol?"];
  var bind = _g76.bind;
  var quasiexpand = _g76.quasiexpand;
  var special_form63 = _g76["special-form?"];
  var variable63 = _g76["variable?"];
  var symbol_expansion = _g76["symbol-expansion"];
  var to_id = _g76["to-id"];
  var module_key = _g76["module-key"];
  var getenv = _g76.getenv;
  var special63 = _g76["special?"];
  var quote_modules = _g76["quote-modules"];
  var bind42 = _g76["bind*"];
  var macro_function = _g76["macro-function"];
  var quoted = _g76.quoted;
  var initial_environment = _g76["initial-environment"];
  var setenv = _g76.setenv;
  var quote_environment = _g76["quote-environment"];
  var exported = _g76.exported;
  var macro63 = _g76["macro?"];
  var valid_id63 = _g76["valid-id?"];
  var indentation = _g76.indentation;
  var macroexpand = _g76.macroexpand;
  var stash42 = _g76["stash*"];
  var imported = _g76.imported;
  var bound63 = _g76["bound?"];
  var _g77 = nexus.runtime;
  var read_file = _g77["read-file"];
  var map42 = _g77["map*"];
  var hd = _g77.hd;
  var tl = _g77.tl;
  var char = _g77.char;
  var _37message_handler = _g77["%message-handler"];
  var some63 = _g77["some?"];
  var mapo = _g77.mapo;
  var composite63 = _g77["composite?"];
  var _6061 = _g77["<="];
  var unstash = _g77.unstash;
  var number63 = _g77["number?"];
  var stash = _g77.stash;
  var _47 = _g77["/"];
  var sublist = _g77.sublist;
  var _43 = _g77["+"];
  var _ = _g77["-"];
  var apply = _g77.apply;
  var atom63 = _g77["atom?"];
  var to_string = _g77["to-string"];
  var exclude = _g77.exclude;
  var split = _g77.split;
  var length = _g77.length;
  var parse_number = _g77["parse-number"];
  var map = _g77.map;
  var list63 = _g77["list?"];
  var table63 = _g77["table?"];
  var _61 = _g77["="];
  var boolean63 = _g77["boolean?"];
  var id_literal63 = _g77["id-literal?"];
  var sub = _g77.sub;
  var _37 = _g77["%"];
  var extend = _g77.extend;
  var string_literal63 = _g77["string-literal?"];
  var string63 = _g77["string?"];
  var replicate = _g77.replicate;
  var nil63 = _g77["nil?"];
  var join = _g77.join;
  var is63 = _g77["is?"];
  var print = _g77.print;
  var type = _g77.type;
  var _6261 = _g77[">="];
  var exit = _g77.exit;
  var write = _g77.write;
  var _60 = _g77["<"];
  var _62 = _g77[">"];
  var function63 = _g77["function?"];
  var _42 = _g77["*"];
  var cat = _g77.cat;
  var search = _g77.search;
  var reverse = _g77.reverse;
  var keys63 = _g77["keys?"];
  var splice = _g77.splice;
  var substring = _g77.substring;
  var drop = _g77.drop;
  var iterate = _g77.iterate;
  var pairwise = _g77.pairwise;
  var find = _g77.find;
  var keep = _g77.keep;
  var mapt = _g77.mapt;
  var reduce = _g77.reduce;
  var code = _g77.code;
  var add = _g77.add;
  var last = _g77.last;
  var empty63 = _g77["empty?"];
  var inner = _g77.inner;
  var write_file = _g77["write-file"];
  var _g78 = nexus.reader;
  var read = _g78.read;
  var read_all = _g78["read-all"];
  var make_stream = _g78["make-stream"];
  var read_table = _g78["read-table"];
  var read_from_string = _g78["read-from-string"];
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
    var _g79 = args;
    while ((i < length(_g79))) {
      var arg = _g79[i];
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
    var _g80 = unstash(sublist(arguments, 1));
    var tail63 = _g80["tail?"];
    var str = "";
    var i = 0;
    var _g81 = forms;
    while ((i < length(_g81))) {
      var x = _g81[i];
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
  function compile_infix(_g82) {
    var op = _g82[0];
    var args = sub(_g82, 1);
    var str = "(";
    var _g83 = getop(op);
    var i = 0;
    var _g84 = args;
    while ((i < length(_g84))) {
      var arg = _g84[i];
      if (((_g83 === "-") && (length(args) === 1))) {
        str = (str + _g83 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g83 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g85 = (function () {
      indent_level = (indent_level + 1);
      var _g86 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g86);
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
      return((ind + "if (" + cond1 + ") {\n" + _g85 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g85 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g85 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g85 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g85 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g85 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g87 = unstash(sublist(arguments, 2));
    var name = _g87.name;
    var prefix = _g87.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g88 = (prefix || "");
    var _g89 = compile_args(args);
    var _g90 = (function () {
      indent_level = (indent_level + 1);
      var _g91 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g91);
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
      return(("function " + id + _g89 + " {\n" + _g90 + ind + "}" + tr));
    } else {
      return((_g88 + "function " + id + _g89 + "\n" + _g90 + ind + tr));
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
    var _g92 = getenv(hd(form));
    var special = _g92.special;
    var stmt = _g92.stmt;
    var self_tr63 = _g92.tr;
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
    var _g93 = unstash(sublist(arguments, 1));
    var stmt63 = _g93["stmt?"];
    var tail63 = _g93["tail?"];
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
      var _g94 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g94 + tr));
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
    var _g95 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g95, [epilog]))]));
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
    var _g105 = toplevel;
    for (name in _g105) {
      if (isNaN(parseInt(name))) {
        var binding = _g105[name];
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
    var _g106 = m.export;
    for (k in _g106) {
      if (isNaN(parseInt(k))) {
        var v = _g106[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g107 = {};
  nexus.compiler = _g107;
  _g107["compile-body"] = compile_body;
  _g107["compile-call"] = compile_call;
  _g107["compile-branch"] = compile_branch;
  _g107["compile-function"] = compile_function;
  _g107["compile-special"] = compile_special;
  _g107.compile = compile;
  _g107.eval = eval;
  _g107["load-module"] = load_module;
  _g107["open-module"] = open_module;
  _g107["in-module"] = in_module;
})();
(function () {
  var _g110 = nexus.utilities;
  var symbol63 = _g110["symbol?"];
  var bind = _g110.bind;
  var quasiexpand = _g110.quasiexpand;
  var special_form63 = _g110["special-form?"];
  var variable63 = _g110["variable?"];
  var symbol_expansion = _g110["symbol-expansion"];
  var to_id = _g110["to-id"];
  var module_key = _g110["module-key"];
  var getenv = _g110.getenv;
  var special63 = _g110["special?"];
  var quote_modules = _g110["quote-modules"];
  var bind42 = _g110["bind*"];
  var macro_function = _g110["macro-function"];
  var quoted = _g110.quoted;
  var initial_environment = _g110["initial-environment"];
  var setenv = _g110.setenv;
  var quote_environment = _g110["quote-environment"];
  var exported = _g110.exported;
  var macro63 = _g110["macro?"];
  var valid_id63 = _g110["valid-id?"];
  var indentation = _g110.indentation;
  var macroexpand = _g110.macroexpand;
  var stash42 = _g110["stash*"];
  var imported = _g110.imported;
  var bound63 = _g110["bound?"];
  var _g111 = nexus.compiler;
  var compile_branch = _g111["compile-branch"];
  var compile = _g111.compile;
  var compile_body = _g111["compile-body"];
  var open_module = _g111["open-module"];
  var in_module = _g111["in-module"];
  var eval = _g111.eval;
  var compile_function = _g111["compile-function"];
  var compile_call = _g111["compile-call"];
  var compile_special = _g111["compile-special"];
  var load_module = _g111["load-module"];
  return;
})();
(function () {
  var _g167 = nexus.utilities;
  var symbol63 = _g167["symbol?"];
  var bind = _g167.bind;
  var quasiexpand = _g167.quasiexpand;
  var special_form63 = _g167["special-form?"];
  var variable63 = _g167["variable?"];
  var symbol_expansion = _g167["symbol-expansion"];
  var to_id = _g167["to-id"];
  var module_key = _g167["module-key"];
  var getenv = _g167.getenv;
  var special63 = _g167["special?"];
  var quote_modules = _g167["quote-modules"];
  var bind42 = _g167["bind*"];
  var macro_function = _g167["macro-function"];
  var quoted = _g167.quoted;
  var initial_environment = _g167["initial-environment"];
  var setenv = _g167.setenv;
  var quote_environment = _g167["quote-environment"];
  var exported = _g167.exported;
  var macro63 = _g167["macro?"];
  var valid_id63 = _g167["valid-id?"];
  var indentation = _g167.indentation;
  var macroexpand = _g167.macroexpand;
  var stash42 = _g167["stash*"];
  var imported = _g167.imported;
  var bound63 = _g167["bound?"];
  var _g168 = nexus.runtime;
  var read_file = _g168["read-file"];
  var map42 = _g168["map*"];
  var hd = _g168.hd;
  var tl = _g168.tl;
  var char = _g168.char;
  var _37message_handler = _g168["%message-handler"];
  var some63 = _g168["some?"];
  var mapo = _g168.mapo;
  var composite63 = _g168["composite?"];
  var _6061 = _g168["<="];
  var unstash = _g168.unstash;
  var number63 = _g168["number?"];
  var stash = _g168.stash;
  var _47 = _g168["/"];
  var sublist = _g168.sublist;
  var _43 = _g168["+"];
  var _ = _g168["-"];
  var apply = _g168.apply;
  var atom63 = _g168["atom?"];
  var to_string = _g168["to-string"];
  var exclude = _g168.exclude;
  var split = _g168.split;
  var length = _g168.length;
  var parse_number = _g168["parse-number"];
  var map = _g168.map;
  var list63 = _g168["list?"];
  var table63 = _g168["table?"];
  var _61 = _g168["="];
  var boolean63 = _g168["boolean?"];
  var id_literal63 = _g168["id-literal?"];
  var sub = _g168.sub;
  var _37 = _g168["%"];
  var extend = _g168.extend;
  var string_literal63 = _g168["string-literal?"];
  var string63 = _g168["string?"];
  var replicate = _g168.replicate;
  var nil63 = _g168["nil?"];
  var join = _g168.join;
  var is63 = _g168["is?"];
  var print = _g168.print;
  var type = _g168.type;
  var _6261 = _g168[">="];
  var exit = _g168.exit;
  var write = _g168.write;
  var _60 = _g168["<"];
  var _62 = _g168[">"];
  var function63 = _g168["function?"];
  var _42 = _g168["*"];
  var cat = _g168.cat;
  var search = _g168.search;
  var reverse = _g168.reverse;
  var keys63 = _g168["keys?"];
  var splice = _g168.splice;
  var substring = _g168.substring;
  var drop = _g168.drop;
  var iterate = _g168.iterate;
  var pairwise = _g168.pairwise;
  var find = _g168.find;
  var keep = _g168.keep;
  var mapt = _g168.mapt;
  var reduce = _g168.reduce;
  var code = _g168.code;
  var add = _g168.add;
  var last = _g168.last;
  var empty63 = _g168["empty?"];
  var inner = _g168.inner;
  var write_file = _g168["write-file"];
  global.target = "js";
  return;
})();
(function () {
  var _g241 = nexus.utilities;
  var symbol63 = _g241["symbol?"];
  var bind = _g241.bind;
  var quasiexpand = _g241.quasiexpand;
  var special_form63 = _g241["special-form?"];
  var variable63 = _g241["variable?"];
  var symbol_expansion = _g241["symbol-expansion"];
  var to_id = _g241["to-id"];
  var module_key = _g241["module-key"];
  var getenv = _g241.getenv;
  var special63 = _g241["special?"];
  var quote_modules = _g241["quote-modules"];
  var bind42 = _g241["bind*"];
  var macro_function = _g241["macro-function"];
  var quoted = _g241.quoted;
  var initial_environment = _g241["initial-environment"];
  var setenv = _g241.setenv;
  var quote_environment = _g241["quote-environment"];
  var exported = _g241.exported;
  var macro63 = _g241["macro?"];
  var valid_id63 = _g241["valid-id?"];
  var indentation = _g241.indentation;
  var macroexpand = _g241.macroexpand;
  var stash42 = _g241["stash*"];
  var imported = _g241.imported;
  var bound63 = _g241["bound?"];
  global.modules = {utilities: {export: {setenv: {export: true, module: "utilities", variable: true}, getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, "make-id": {}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "indent-level": {global: true, export: true, module: "utilities"}}, import: ["special", "core"]}, core: {export: {"let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g242 = sub(body, 0);
    add(environment, {});
    var _g243 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g242)));
    })();
    drop(environment);
    return(_g243);
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g244 = sub(body, 0);
    var _g245 = bind42(args, _g244);
    var _g246 = _g245[0];
    var _g247 = _g245[1];
    return(join(["%function", _g246], _g247));
  }, module: "core", export: true}, each: {macro: function (_g248) {
    var t = _g248[0];
    var k = _g248[1];
    var v = _g248[2];
    var body = unstash(sublist(arguments, 1));
    var _g249 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g250 = ["target"];
      _g250.js = join(["isNaN", join(["parseInt", k])]);
      _g250.lua = join(["not", join(["number?", k])]);
      return(_g250);
    })()), join(["let", join([v, join(["get", t1, k])])], _g249)])])]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g251 = sub(body, 0);
    add(environment, {});
    var _g252 = (function () {
      map(function (_g253) {
        var name = _g253[0];
        var exp = _g253[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g251)));
    })();
    drop(environment);
    return(_g252);
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g254 = xs;
      while ((i < length(_g254))) {
        var x = _g254[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g255 = sub(body, 0);
    var form = join(["fn", args], _g255);
    var keys = sub(_g255, length(_g255));
    eval(join((function () {
      var _g256 = ["setenv", join(["quote", name])];
      _g256.special = form;
      _g256.form = join(["quote", form]);
      return(_g256);
    })(), keys));
    return(undefined);
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g166, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, "define-global": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g257 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g257))) {
      var _g258 = bind42(x, _g257);
      var args = _g258[0];
      var _g259 = _g258[1];
      return(join(["%global-function", name, args], _g259));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g260 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g260))) {
      var _g261 = bind42(x, _g260);
      var args = _g261[0];
      var _g262 = _g261[1];
      return(join(["%global-function", name, args], _g262));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g263 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g263)]));
  }, module: "core", export: true}, "with-bindings": {macro: function (_g264) {
    var names = _g264[0];
    var body = unstash(sublist(arguments, 1));
    var _g265 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g266 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g267 = ["setenv", x];
        _g267.variable = true;
        return(_g267);
      })())])];
      _g266.scope = true;
      return(_g266);
    })(), _g265));
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g268 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g268)]));
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g269 = body;
      for (k in _g269) {
        if (isNaN(parseInt(k))) {
          var v = _g269[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g270 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g270)]));
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g272 = 0;
    var _g271 = elements;
    while ((_g272 < length(_g271))) {
      var e = _g271[_g272];
      l[e] = true;
      _g272 = (_g272 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g273 = sub(body, 0);
    var form = join(["fn", args], _g273);
    eval(join((function () {
      var _g274 = ["setenv", join(["quote", name])];
      _g274.macro = form;
      _g274.form = join(["quote", form]);
      return(_g274);
    })()));
    return(undefined);
  }, module: "core", export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g275 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g276) {
      var lh = _g276[0];
      var rh = _g276[1];
      var _g278 = 0;
      var _g277 = bind(lh, rh);
      while ((_g278 < length(_g277))) {
        var _g279 = _g277[_g278];
        var id = _g279[0];
        var val = _g279[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g278 = (_g278 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g275)])));
  }, module: "core", export: true}, target: {global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, across: {macro: function (_g280) {
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
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g282 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g283 = ["table"];
      _g283._scope = scope;
      return(_g283);
    })())]), join(["let", join([x, join(["do"], _g282)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, "define-local": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g284 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g284))) {
      var _g285 = bind42(x, _g284);
      var args = _g285[0];
      var _g286 = _g285[1];
      return(join(["%local-function", name, args], _g286));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}}, import: ["utilities", "runtime", "special", "core"]}, boot: {export: {}, import: ["utilities", "special", "core"]}, system: {export: {nexus: {global: true, export: true, module: "system"}}, import: ["special", "core"]}, reader: {export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g287) {
    var char = _g287[0];
    var stream = _g287[1];
    var body = unstash(sublist(arguments, 1));
    var _g288 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g288)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}, import: ["special", "core"]}, lib: {export: {}, import: ["core", "special"]}, runtime: {export: {length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, mapt: {export: true, module: "runtime", variable: true}, mapo: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, type: {export: true, module: "runtime", variable: true}, "nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}}, import: ["special", "core"]}, special: {export: {"get": {special: function (_g289) {
    var t = _g289[0];
    var k = _g289[1];
    var _g290 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g290, 0) === "{"))) {
      _g290 = ("(" + _g290 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g290 + "." + inner(k)));
    } else {
      return((_g290 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "%global-function": {module: "special", export: true, tr: true, special: function (_g291) {
    var name = _g291[0];
    var args = _g291[1];
    var body = sub(_g291, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, stmt: true}, "%object": {special: function (forms) {
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
    var _g292 = pairs;
    while ((i < length(_g292))) {
      var _g293 = _g292[i];
      var k = _g293[0];
      var v = _g293[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g294 = compile(v);
      var _g295 = (function () {
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
      str = (str + _g295 + sep + _g294);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "%for": {module: "special", export: true, tr: true, special: function (_g296) {
    var _g297 = _g296[0];
    var t = _g297[0];
    var k = _g297[1];
    var body = sub(_g296, 1);
    var _g298 = compile(t);
    var ind = indentation();
    var _g299 = (function () {
      indent_level = (indent_level + 1);
      var _g300 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g300);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g298 + " do\n" + _g299 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g298 + ") {\n" + _g299 + ind + "}\n"));
    }
  }, stmt: true}, "do": {module: "special", export: true, tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, stmt: true}, "%local-function": {module: "special", export: true, tr: true, special: function (_g301) {
    var name = _g301[0];
    var args = _g301[1];
    var body = sub(_g301, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, stmt: true}, "%array": {special: function (forms) {
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
    var _g302 = forms;
    while ((i < length(_g302))) {
      var x = _g302[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "%try": {module: "special", export: true, tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g303 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g303);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g304 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g304);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true}, "error": {stmt: true, special: function (_g305) {
    var x = _g305[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, module: "special", export: true}, "set": {stmt: true, special: function (_g306) {
    var lh = _g306[0];
    var rh = _g306[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, module: "special", export: true}, "%function": {special: function (_g307) {
    var args = _g307[0];
    var body = sub(_g307, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "not": {special: function (_g308) {
    var x = _g308[0];
    var _g309 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g309 + ")"));
  }, module: "special", export: true}, "break": {stmt: true, special: function (_g109) {
    return((indentation() + "break"));
  }, module: "special", export: true}, "return": {stmt: true, special: function (_g310) {
    var x = _g310[0];
    var _g311 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g311));
  }, module: "special", export: true}, "while": {module: "special", export: true, tr: true, special: function (_g312) {
    var condition = _g312[0];
    var body = sub(_g312, 1);
    var _g313 = compile(condition);
    var _g314 = (function () {
      indent_level = (indent_level + 1);
      var _g315 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g315);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g313 + ") {\n" + _g314 + ind + "}\n"));
    } else {
      return((ind + "while " + _g313 + " do\n" + _g314 + ind + "end\n"));
    }
  }, stmt: true}, "%local": {stmt: true, special: function (_g316) {
    var name = _g316[0];
    var value = _g316[1];
    var id = compile(name);
    var _g317 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g317));
  }, module: "special", export: true}, "if": {module: "special", export: true, tr: true, special: function (form, tail63) {
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
  }, stmt: true}}, import: ["utilities", "special", "core", "compiler"]}, compiler: {export: {"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g319 = sub(body, 0);
    var imports = [];
    var imp = _g319.import;
    var exp = _g319.export;
    var _g321 = 0;
    var _g320 = (imp || []);
    while ((_g321 < length(_g320))) {
      var k = _g320[_g321];
      load_module(k);
      add(imports, imported(k));
      _g321 = (_g321 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g323 = 0;
    var _g322 = (exp || []);
    while ((_g323 < length(_g322))) {
      var k = _g322[_g323];
      setenv(k, {_stash: true, export: true});
      _g323 = (_g323 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "current-module": {global: true, export: true, module: "compiler"}}, import: ["utilities", "runtime", "special", "core", "reader"]}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g324 = sub(body, 0);
    var imports = [];
    var imp = _g324.import;
    var exp = _g324.export;
    var _g326 = 0;
    var _g325 = (imp || []);
    while ((_g326 < length(_g325))) {
      var k = _g325[_g326];
      load_module(k);
      add(imports, imported(k));
      _g326 = (_g326 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g328 = 0;
    var _g327 = (exp || []);
    while ((_g328 < length(_g327))) {
      var k = _g327[_g328];
      setenv(k, {_stash: true, export: true});
      _g328 = (_g328 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}}];
  return;
})();
(function () {
  var _g34 = nexus.runtime;
  var read_file = _g34["read-file"];
  var map42 = _g34["map*"];
  var hd = _g34.hd;
  var tl = _g34.tl;
  var char = _g34.char;
  var _37message_handler = _g34["%message-handler"];
  var some63 = _g34["some?"];
  var mapo = _g34.mapo;
  var composite63 = _g34["composite?"];
  var _6061 = _g34["<="];
  var unstash = _g34.unstash;
  var number63 = _g34["number?"];
  var stash = _g34.stash;
  var _47 = _g34["/"];
  var sublist = _g34.sublist;
  var _43 = _g34["+"];
  var _ = _g34["-"];
  var apply = _g34.apply;
  var atom63 = _g34["atom?"];
  var to_string = _g34["to-string"];
  var exclude = _g34.exclude;
  var split = _g34.split;
  var length = _g34.length;
  var parse_number = _g34["parse-number"];
  var map = _g34.map;
  var list63 = _g34["list?"];
  var table63 = _g34["table?"];
  var _61 = _g34["="];
  var boolean63 = _g34["boolean?"];
  var id_literal63 = _g34["id-literal?"];
  var sub = _g34.sub;
  var _37 = _g34["%"];
  var extend = _g34.extend;
  var string_literal63 = _g34["string-literal?"];
  var string63 = _g34["string?"];
  var replicate = _g34.replicate;
  var nil63 = _g34["nil?"];
  var join = _g34.join;
  var is63 = _g34["is?"];
  var print = _g34.print;
  var type = _g34.type;
  var _6261 = _g34[">="];
  var exit = _g34.exit;
  var write = _g34.write;
  var _60 = _g34["<"];
  var _62 = _g34[">"];
  var function63 = _g34["function?"];
  var _42 = _g34["*"];
  var cat = _g34.cat;
  var search = _g34.search;
  var reverse = _g34.reverse;
  var keys63 = _g34["keys?"];
  var splice = _g34.splice;
  var substring = _g34.substring;
  var drop = _g34.drop;
  var iterate = _g34.iterate;
  var pairwise = _g34.pairwise;
  var find = _g34.find;
  var keep = _g34.keep;
  var mapt = _g34.mapt;
  var reduce = _g34.reduce;
  var code = _g34.code;
  var add = _g34.add;
  var last = _g34.last;
  var empty63 = _g34["empty?"];
  var inner = _g34.inner;
  var write_file = _g34["write-file"];
  var _g70 = nexus.utilities;
  var symbol63 = _g70["symbol?"];
  var bind = _g70.bind;
  var quasiexpand = _g70.quasiexpand;
  var special_form63 = _g70["special-form?"];
  var variable63 = _g70["variable?"];
  var symbol_expansion = _g70["symbol-expansion"];
  var to_id = _g70["to-id"];
  var module_key = _g70["module-key"];
  var getenv = _g70.getenv;
  var special63 = _g70["special?"];
  var quote_modules = _g70["quote-modules"];
  var bind42 = _g70["bind*"];
  var macro_function = _g70["macro-function"];
  var quoted = _g70.quoted;
  var initial_environment = _g70["initial-environment"];
  var setenv = _g70.setenv;
  var quote_environment = _g70["quote-environment"];
  var exported = _g70.exported;
  var macro63 = _g70["macro?"];
  var valid_id63 = _g70["valid-id?"];
  var indentation = _g70.indentation;
  var macroexpand = _g70.macroexpand;
  var stash42 = _g70["stash*"];
  var imported = _g70.imported;
  var bound63 = _g70["bound?"];
  var _g75 = nexus.reader;
  var read = _g75.read;
  var read_all = _g75["read-all"];
  var make_stream = _g75["make-stream"];
  var read_table = _g75["read-table"];
  var read_from_string = _g75["read-from-string"];
  var _g108 = nexus.compiler;
  var compile_branch = _g108["compile-branch"];
  var compile = _g108.compile;
  var compile_body = _g108["compile-body"];
  var open_module = _g108["open-module"];
  var in_module = _g108["in-module"];
  var eval = _g108.eval;
  var compile_function = _g108["compile-function"];
  var compile_call = _g108["compile-call"];
  var compile_special = _g108["compile-special"];
  var load_module = _g108["load-module"];
  function rep(str) {
    var _g330 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g334) {
        return([false, _g334]);
      }
    })();
    var _g1 = _g330[0];
    var x = _g330[1];
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
    var _g331 = args;
    while ((i < length(_g331))) {
      var arg = _g331[i];
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
      var _g332 = (spec || "main");
      in_module(_g332);
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
