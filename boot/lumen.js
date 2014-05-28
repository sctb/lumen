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
    var keys = unstash(sublist(arguments, 1));
    var _g8 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g9 = keys63(_g8);
        if (_g9) {
          return(b[_g9]);
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
      var _g10 = args;
      for (k in _g10) {
        if (isNaN(parseInt(k))) {
          var v = _g10[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  };
  function rest(args) {
    if ((target === "js")) {
      return(["unstash", ["sublist", "arguments", length(args)]]);
    } else {
      add(args, "|...|");
      return(["unstash", ["list", "|...|"]]);
    }
  }
  var id_count = 0;
  make_id = function () {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  };
  bind = function (lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([[id, rh]], bind(lh, id)));
    } else if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g11 = lh;
      while ((i < length(_g11))) {
        var x = _g11[i];
        bs = join(bs, bind(x, ["at", rh, i]));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, ["sub", rh, length(lh)]));
      }
      var k = undefined;
      var _g12 = lh;
      for (k in _g12) {
        if (isNaN(parseInt(k))) {
          var v = _g12[k];
          if ((v === true)) {
            v = k;
          }
          if ((k != "rest")) {
            bs = join(bs, bind(v, ["get", rh, ["quote", k]]));
          }
        }
      }
      return(bs);
    }
  };
  bind42 = function (args, body) {
    var args1 = [];
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest(args1)]], body)]]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g14 = 0;
      var _g13 = args;
      while ((_g14 < length(_g13))) {
        var arg = _g13[_g14];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g14 = (_g14 + 1);
      }
      if (r) {
        bs = join(bs, [r, rest(args1)]);
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
        var _g2 = form[0];
        var _g15 = form[1];
        var t = _g15[0];
        var k = _g15[1];
        var body = sub(form, 2);
        return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g3 = form[0];
        var args = form[1];
        var _g16 = sub(form, 2);
        add(environment, {_scope: true});
        var _g18 = (function () {
          var _g20 = 0;
          var _g19 = args;
          while ((_g20 < length(_g19))) {
            var _g17 = _g19[_g20];
            setenv(_g17, {_stash: true, variable: true});
            _g20 = (_g20 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g16)));
        })();
        drop(environment);
        return(_g18);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g4 = form[0];
        var name = form[1];
        var _g21 = form[2];
        var _g22 = sub(form, 3);
        add(environment, {_scope: true});
        var _g24 = (function () {
          var _g26 = 0;
          var _g25 = _g21;
          while ((_g26 < length(_g25))) {
            var _g23 = _g25[_g26];
            setenv(_g23, {_stash: true, variable: true});
            _g26 = (_g26 + 1);
          }
          return(join([x, name, map42(macroexpand, _g21)], macroexpand(_g22)));
        })();
        drop(environment);
        return(_g24);
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
    var _g27 = form;
    for (k in _g27) {
      if (isNaN(parseInt(k))) {
        var v = _g27[k];
        var _g28 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g28;
      }
    }
    var _g30 = 0;
    var _g29 = form;
    while ((_g30 < length(_g29))) {
      var x = _g29[_g30];
      if (quasisplice63(x, depth)) {
        var _g31 = quasiexpand(x[1]);
        add(xs, _g31);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g30 = (_g30 + 1);
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
    } else if (is63(b.global)) {
      return(b);
    }
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g5, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    var _g32 = ["table"];
    _g32.import = quoted(m.import);
    _g32.export = quote_frame(m.export);
    return(_g32);
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g33 = {};
  exports.utilities = _g33;
  _g33.setenv = setenv;
  _g33.getenv = getenv;
  _g33["macro-function"] = macro_function;
  _g33["macro?"] = macro63;
  _g33["special?"] = special63;
  _g33["special-form?"] = special_form63;
  _g33["symbol-expansion"] = symbol_expansion;
  _g33["symbol?"] = symbol63;
  _g33["variable?"] = variable63;
  _g33["bound?"] = bound63;
  _g33.quoted = quoted;
  _g33["stash*"] = stash42;
  _g33.bind = bind;
  _g33["bind*"] = bind42;
  _g33.quasiexpand = quasiexpand;
  _g33.macroexpand = macroexpand;
  _g33.indentation = indentation;
  _g33["valid-id?"] = valid_id63;
  _g33["to-id"] = to_id;
  _g33["module-key"] = module_key;
  _g33["quote-environment"] = quote_environment;
  _g33["quote-modules"] = quote_modules;
  _g33["initial-environment"] = initial_environment;
})();
(function () {
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
    var _g34 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g34, upto));
    } else {
      var l = sublist(x, _g34, upto);
      var k = undefined;
      var _g35 = x;
      for (k in _g35) {
        if (isNaN(parseInt(k))) {
          var v = _g35[k];
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
      var _g36 = l1;
      for (k in _g36) {
        if (isNaN(parseInt(k))) {
          var v = _g36[k];
          l[k] = v;
        }
      }
      var _g38 = undefined;
      var _g37 = l2;
      for (_g38 in _g37) {
        if (isNaN(parseInt(_g38))) {
          var v = _g37[_g38];
          l[_g38] = v;
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
    var _g40 = 0;
    var _g39 = l;
    while ((_g40 < length(_g39))) {
      var x = _g39[_g40];
      if (f(x)) {
        add(l1, x);
      }
      _g40 = (_g40 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g42 = 0;
    var _g41 = l;
    while ((_g42 < length(_g41))) {
      var x = _g41[_g42];
      var _g43 = f(x);
      if (_g43) {
        return(_g43);
      }
      _g42 = (_g42 + 1);
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
    var _g45 = 0;
    var _g44 = l;
    while ((_g45 < length(_g44))) {
      var x = _g44[_g45];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g45 = (_g45 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g46 = t;
    for (k in _g46) {
      if (isNaN(parseInt(k))) {
        var v = _g46[k];
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
    var _g47 = t;
    for (k in _g47) {
      if (isNaN(parseInt(k))) {
        var v = _g47[k];
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
    var _g48 = t;
    for (k in _g48) {
      if (isNaN(parseInt(k))) {
        var v = _g48[k];
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
    var _g49 = t;
    for (k1 in _g49) {
      if (isNaN(parseInt(k1))) {
        var v = _g49[k1];
        k = k1;
        break;
      }
    }
    return(k);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g50 = sub(xs, 0);
    return(join(t, _g50));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g51 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g52 = t;
    for (k in _g52) {
      if (isNaN(parseInt(k))) {
        var v = _g52[k];
        if (!(_g51[k])) {
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
    var _g53 = sub(xs, 0);
    if (empty63(_g53)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g53));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g54));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g55 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g55)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g56 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g56));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g57 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g57)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g58 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g58)));
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
      var _g59 = x;
      for (k in _g59) {
        if (isNaN(parseInt(k))) {
          var v = _g59[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g60 = x1;
      while ((i < length(_g60))) {
        var y = _g60[i];
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
    var _g61 = stash(args);
    return((f.apply)(f, _g61));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g62 = args;
      for (k in _g62) {
        if (isNaN(parseInt(k))) {
          var v = _g62[k];
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
        var _g63 = l;
        for (k in _g63) {
          if (isNaN(parseInt(k))) {
            var v = _g63[k];
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
  _g64 = {};
  exports.runtime = _g64;
  _g64.length = length;
  _g64["empty?"] = empty63;
  _g64.substring = substring;
  _g64.sublist = sublist;
  _g64.sub = sub;
  _g64.inner = inner;
  _g64.hd = hd;
  _g64.tl = tl;
  _g64.add = add;
  _g64.drop = drop;
  _g64.last = last;
  _g64.reverse = reverse;
  _g64.join = join;
  _g64.reduce = reduce;
  _g64.keep = keep;
  _g64.find = find;
  _g64.pairwise = pairwise;
  _g64.iterate = iterate;
  _g64.replicate = replicate;
  _g64.splice = splice;
  _g64.map = map;
  _g64["map*"] = map42;
  _g64.mapt = mapt;
  _g64.mapo = mapo;
  _g64["keys?"] = keys63;
  _g64.extend = extend;
  _g64.exclude = exclude;
  _g64.char = char;
  _g64.code = code;
  _g64.search = search;
  _g64.split = split;
  _g64.cat = cat;
  _g64["+"] = _43;
  _g64["-"] = _;
  _g64["*"] = _42;
  _g64["/"] = _47;
  _g64["%"] = _37;
  _g64[">"] = _62;
  _g64["<"] = _60;
  _g64["="] = _61;
  _g64[">="] = _6261;
  _g64["<="] = _6061;
  _g64["read-file"] = read_file;
  _g64["write-file"] = write_file;
  _g64.print = print;
  _g64.write = write;
  _g64.exit = exit;
  _g64.type = type;
  _g64["nil?"] = nil63;
  _g64["is?"] = is63;
  _g64["string?"] = string63;
  _g64["string-literal?"] = string_literal63;
  _g64["id-literal?"] = id_literal63;
  _g64["number?"] = number63;
  _g64["boolean?"] = boolean63;
  _g64["function?"] = function63;
  _g64["composite?"] = composite63;
  _g64["atom?"] = atom63;
  _g64["table?"] = table63;
  _g64["list?"] = list63;
  _g64["parse-number"] = parse_number;
  _g64["to-string"] = to_string;
  _g64.apply = apply;
  _g64.stash = stash;
  _g64.unstash = unstash;
  _g64["%message-handler"] = _37message_handler;
})();
(function () {
  return;
})();
(function () {
  global.target = "js";
  return;
})();
(function () {
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
  make_stream = function (str) {
    return({pos: 0, string: str, len: length(str)});
  };
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
  read_table = {};
  var eof = {};
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
  _g196 = {};
  exports.reader = _g196;
  _g196["make-stream"] = make_stream;
  _g196["read-table"] = read_table;
  _g196.read = read;
  _g196["read-all"] = read_all;
  _g196["read-from-string"] = read_from_string;
})();
(function () {
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
    var _g197 = args;
    while ((i < length(_g197))) {
      var arg = _g197[i];
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
    var _g198 = unstash(sublist(arguments, 1));
    var tail63 = _g198["tail?"];
    var str = "";
    var i = 0;
    var _g199 = forms;
    while ((i < length(_g199))) {
      var x = _g199[i];
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
  function compile_infix(_g200) {
    var op = _g200[0];
    var args = sub(_g200, 1);
    var str = "(";
    var _g201 = getop(op);
    var i = 0;
    var _g202 = args;
    while ((i < length(_g202))) {
      var arg = _g202[i];
      if (((_g201 === "-") && (length(args) === 1))) {
        str = (str + _g201 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g201 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g203 = (function () {
      indent_level = (indent_level + 1);
      var _g204 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g204);
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
      return((ind + "if (" + cond1 + ") {\n" + _g203 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g203 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g203 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g203 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g203 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g203 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g205 = unstash(sublist(arguments, 2));
    var name = _g205.name;
    var prefix = _g205.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g206 = (prefix || "");
    var _g207 = compile_args(args);
    var _g208 = (function () {
      indent_level = (indent_level + 1);
      var _g209 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g209);
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
      return(("function " + id + _g207 + " {\n" + _g208 + ind + "}" + tr));
    } else {
      return((_g206 + "function " + id + _g207 + "\n" + _g208 + ind + tr));
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
    var _g210 = getenv(hd(form));
    var special = _g210.special;
    var stmt = _g210.stmt;
    var self_tr63 = _g210.tr;
    if ((!(stmt63) && stmt)) {
      return(compile([["%function", [], form]], {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  };
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g211 = unstash(sublist(arguments, 1));
    var stmt63 = _g211["stmt?"];
    var tail63 = _g211["tail?"];
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
      var _g212 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g212 + tr));
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
  function exported() {
    var toplevel = hd(environment);
    var m = make_id();
    var k = module_key(current_module);
    var _g213 = [];
    var n = undefined;
    var _g214 = toplevel;
    for (n in _g214) {
      if (isNaN(parseInt(n))) {
        var b = _g214[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(_g213, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (!(empty63(_g213))) {
      return(join(["do", ["define", m, ["table"]], ["set", ["get", "exports", ["quote", k]], m]], _g213));
    }
  }
  function encapsulate(body) {
    var _g215 = macroexpand(body);
    var epilog = macroexpand(exported());
    return([join(["%function", []], join(_g215, [epilog]))]);
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
    var _g225 = toplevel;
    for (name in _g225) {
      if (isNaN(parseInt(name))) {
        var binding = _g225[name];
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
    var _g226 = m.export;
    for (k in _g226) {
      if (isNaN(parseInt(k))) {
        var v = _g226[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g227 = {};
  exports.compiler = _g227;
  _g227["compile-body"] = compile_body;
  _g227["compile-call"] = compile_call;
  _g227["compile-branch"] = compile_branch;
  _g227["compile-function"] = compile_function;
  _g227["compile-special"] = compile_special;
  _g227.compile = compile;
  _g227.eval = eval;
  _g227["load-module"] = load_module;
  _g227["open-module"] = open_module;
  _g227["in-module"] = in_module;
})();
(function () {
  modules = {utilities: {import: ["special", "core"], export: {setenv: {export: true, module: "utilities", variable: true}, getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, "make-id": {}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, exports: {global: true, export: true, module: "utilities"}, "indent-level": {global: true, export: true, module: "utilities"}}}, reader: {import: ["special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g228) {
    var char = _g228[0];
    var stream = _g228[1];
    var body = unstash(sublist(arguments, 1));
    var _g229 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g229)]);
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}}, runtime: {import: ["special", "core"], export: {length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, mapt: {export: true, module: "runtime", variable: true}, mapo: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, type: {export: true, module: "runtime", variable: true}, "nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}}}, core: {import: ["utilities", "runtime", "special", "core"], export: {table: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g120, x) {
      return(x);
    }, body)));
  }, export: true}, language: {module: "core", macro: function () {
    return(["quote", target]);
  }, export: true}, at: {module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = ["+", i, 1];
    }
    return(["get", l, i]);
  }, export: true}, list: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g230 = body;
      for (k in _g230) {
        if (isNaN(parseInt(k))) {
          var v = _g230[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "define-local": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g231 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g231))) {
      var _g232 = bind42(x, _g231);
      var args = _g232[0];
      var _g233 = _g232[1];
      return(join(["%local-function", name, args], _g233));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "set-of": {module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g235 = 0;
    var _g234 = elements;
    while ((_g235 < length(_g234))) {
      var e = _g234[_g235];
      l[e] = true;
      _g235 = (_g235 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "define-special": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g236 = sub(body, 0);
    var form = join(["fn", args], _g236);
    var keys = sub(_g236, length(_g236));
    eval(join((function () {
      var _g237 = ["setenv", ["quote", name]];
      _g237.special = form;
      _g237.form = ["quote", form];
      return(_g237);
    })(), keys));
    return(undefined);
  }, export: true}, "cat!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g238 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g238)]);
  }, export: true}, "let-symbol": {module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g239 = sub(body, 0);
    add(environment, {});
    var _g240 = (function () {
      map(function (_g241) {
        var name = _g241[0];
        var exp = _g241[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g239)));
    })();
    drop(environment);
    return(_g240);
  }, export: true}, "join*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, inc: {module: "core", macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, guard: {module: "core", macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, quasiquote: {module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, "with-frame": {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g242 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(["do", ["add", "environment", (function () {
      var _g243 = ["table"];
      _g243._scope = scope;
      return(_g243);
    })()], ["let", [x, join(["do"], _g242)], ["drop", "environment"], x]]);
  }, export: true}, "define-macro": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g244 = sub(body, 0);
    var form = join(["fn", args], _g244);
    eval((function () {
      var _g245 = ["setenv", ["quote", name]];
      _g245.macro = form;
      _g245.form = ["quote", form];
      return(_g245);
    })());
    return(undefined);
  }, export: true}, "list*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g246 = xs;
      while ((i < length(_g246))) {
        var x = _g246[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, export: true}, each: {module: "core", macro: function (_g247) {
    var t = _g247[0];
    var k = _g247[1];
    var v = _g247[2];
    var body = unstash(sublist(arguments, 1));
    var _g248 = sub(body, 0);
    var t1 = make_id();
    return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
      var _g249 = ["target"];
      _g249.js = ["isNaN", ["parseInt", k]];
      _g249.lua = ["not", ["number?", k]];
      return(_g249);
    })(), join(["let", [v, ["get", t1, k]]], _g248)]]]);
  }, export: true}, fn: {module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g250 = sub(body, 0);
    var _g251 = bind42(args, _g250);
    var _g252 = _g251[0];
    var _g253 = _g251[1];
    return(join(["%function", _g252], _g253));
  }, export: true}, across: {module: "core", macro: function (_g254) {
    var l = _g254[0];
    var v = _g254[1];
    var i = _g254[2];
    var start = _g254[3];
    var body = unstash(sublist(arguments, 1));
    var _g255 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g255, [["inc", i]]))]]);
  }, export: true}, dec: {module: "core", macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, "join!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g256 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g256)]);
  }, export: true}, quote: {module: "core", macro: function (form) {
    return(quoted(form));
  }, export: true}, pr: {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g257 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g257)]);
  }, export: true}, "let-macro": {module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g258 = sub(body, 0);
    add(environment, {});
    var _g259 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g258)));
    })();
    drop(environment);
    return(_g259);
  }, export: true}, target: {global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", export: true}, "define-symbol": {module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "with-bindings": {module: "core", macro: function (_g260) {
    var names = _g260[0];
    var body = unstash(sublist(arguments, 1));
    var _g261 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g262 = ["with-frame", ["across", [names, x], (function () {
        var _g263 = ["setenv", x];
        _g263.variable = true;
        return(_g263);
      })()]];
      _g262.scope = true;
      return(_g262);
    })(), _g261));
  }, export: true}, define: {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g264 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g264))) {
      var _g265 = bind42(x, _g264);
      var args = _g265[0];
      var _g266 = _g265[1];
      return(join(["%global-function", name, args], _g266));
    } else {
      return(["set", name, x]);
    }
  }, export: true}, "define-global": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g267 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g267))) {
      var _g268 = bind42(x, _g267);
      var args = _g268[0];
      var _g269 = _g268[1];
      return(join(["%global-function", name, args], _g269));
    } else if ((target === "js")) {
      return(["set", ["get", "global", ["quote", to_id(name)]], x]);
    } else {
      return(["set", name, x]);
    }
  }, export: true}, let: {module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g270 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g271) {
      var lh = _g271[0];
      var rh = _g271[1];
      var _g273 = 0;
      var _g272 = bind(lh, rh);
      while ((_g273 < length(_g272))) {
        var _g274 = _g272[_g273];
        var id = _g274[0];
        var val = _g274[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g273 = (_g273 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g270)])));
  }, export: true}}}, compiler: {import: ["utilities", "runtime", "special", "core", "reader"], export: {"define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g275 = sub(body, 0);
    var imports = [];
    var imp = _g275.import;
    var exp = _g275.export;
    var _g277 = 0;
    var _g276 = (imp || []);
    while ((_g277 < length(_g276))) {
      var k = _g276[_g277];
      load_module(k);
      _g277 = (_g277 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g279 = 0;
    var _g278 = (exp || []);
    while ((_g279 < length(_g278))) {
      var k = _g278[_g279];
      setenv(k, {_stash: true, export: true});
      _g279 = (_g279 + 1);
    }
  }, export: true}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "current-module": {global: true, export: true, module: "compiler"}}}, special: {import: ["utilities", "special", "core", "compiler"], export: {"%for": {module: "special", stmt: true, export: true, special: function (_g280) {
    var _g281 = _g280[0];
    var t = _g281[0];
    var k = _g281[1];
    var body = sub(_g280, 1);
    var _g282 = compile(t);
    var ind = indentation();
    var _g283 = (function () {
      indent_level = (indent_level + 1);
      var _g284 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g284);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g282 + " do\n" + _g283 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g282 + ") {\n" + _g283 + ind + "}\n"));
    }
  }, tr: true}, "%local": {module: "special", special: function (_g285) {
    var name = _g285[0];
    var value = _g285[1];
    var id = compile(name);
    var _g286 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g286));
  }, stmt: true, export: true}, "%function": {special: function (_g287) {
    var args = _g287[0];
    var body = sub(_g287, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "%local-function": {module: "special", stmt: true, export: true, special: function (_g288) {
    var name = _g288[0];
    var args = _g288[1];
    var body = sub(_g288, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, tr: true}, "do": {module: "special", stmt: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, tr: true}, "not": {special: function (_g289) {
    var x = _g289[0];
    var _g290 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g290 + ")"));
  }, module: "special", export: true}, "return": {module: "special", special: function (_g291) {
    var x = _g291[0];
    var _g292 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + _g292));
  }, stmt: true, export: true}, "error": {module: "special", special: function (_g293) {
    var x = _g293[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, stmt: true, export: true}, "%global-function": {module: "special", stmt: true, export: true, special: function (_g294) {
    var name = _g294[0];
    var args = _g294[1];
    var body = sub(_g294, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
    }
  }, tr: true}, "if": {module: "special", stmt: true, export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g295 = form;
    while ((i < length(_g295))) {
      var condition = _g295[i];
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
  }, tr: true}, "%object": {special: function (forms) {
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
    var _g296 = pairs;
    while ((i < length(_g296))) {
      var _g297 = _g296[i];
      var k = _g297[0];
      var v = _g297[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g298 = compile(v);
      var _g299 = (function () {
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
      str = (str + _g299 + sep + _g298);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "break": {module: "special", special: function (_g65) {
    return((indentation() + "break"));
  }, stmt: true, export: true}, "get": {special: function (_g300) {
    var t = _g300[0];
    var k = _g300[1];
    var _g301 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g301, 0) === "{"))) {
      _g301 = ("(" + _g301 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g301 + "." + inner(k)));
    } else {
      return((_g301 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}, "while": {module: "special", stmt: true, export: true, special: function (_g302) {
    var condition = _g302[0];
    var body = sub(_g302, 1);
    var _g303 = compile(condition);
    var _g304 = (function () {
      indent_level = (indent_level + 1);
      var _g305 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g305);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g303 + ") {\n" + _g304 + ind + "}\n"));
    } else {
      return((ind + "while " + _g303 + " do\n" + _g304 + ind + "end\n"));
    }
  }, tr: true}, "%array": {special: function (forms) {
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
    var _g306 = forms;
    while ((i < length(_g306))) {
      var x = _g306[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "%try": {module: "special", stmt: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g307 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g307);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, e]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g308 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g308);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true}, "set": {module: "special", special: function (_g309) {
    var lh = _g309[0];
    var rh = _g309[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, stmt: true, export: true}}}, boot: {import: ["utilities", "special", "core"], export: {}}, lib: {import: ["core", "special"], export: {}}};
  environment = [{"define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g310 = sub(body, 0);
    var imports = [];
    var imp = _g310.import;
    var exp = _g310.export;
    var _g312 = 0;
    var _g311 = (imp || []);
    while ((_g312 < length(_g311))) {
      var k = _g311[_g312];
      load_module(k);
      _g312 = (_g312 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g314 = 0;
    var _g313 = (exp || []);
    while ((_g314 < length(_g313))) {
      var k = _g313[_g314];
      setenv(k, {_stash: true, export: true});
      _g314 = (_g314 + 1);
    }
  }, export: true}}];
  _g315 = {};
  exports.boot = _g315;
  _g315.environment = environment;
  _g315.modules = modules;
})();
(function () {
  function rep(str) {
    var _g316 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g320) {
        return([false, _g320]);
      }
    })();
    var _g1 = _g316[0];
    var x = _g316[1];
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
    var _g317 = args;
    while ((i < length(_g317))) {
      var arg = _g317[i];
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
      var _g318 = (spec || "main");
      in_module(_g318);
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
