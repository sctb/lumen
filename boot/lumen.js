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
  macro_function = function (k) {
    var b = getenv(k);
    return((b && b.macro));
  };
  macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  special63 = function (k) {
    var b = getenv(k);
    return((b && is63(b.special)));
  };
  special_form63 = function (form) {
    return((list63(form) && special63(hd(form))));
  };
  symbol_expansion = function (k) {
    var b = getenv(k);
    return((b && b.symbol));
  };
  symbol63 = function (k) {
    return(is63(symbol_expansion(k)));
  };
  variable63 = function (k) {
    var b = last(environment)[k];
    return((b && is63(b.variable)));
  };
  global63 = function (k) {
    var b = getenv(k);
    return((b && b.global));
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
      var _g8 = args;
      for (k in _g8) {
        if (isNaN(parseInt(k))) {
          var v = _g8[k];
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
      var _g9 = lh;
      while ((i < length(_g9))) {
        var x = _g9[i];
        bs = join(bs, bind(x, ["at", rh, i]));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, ["sub", rh, length(lh)]));
      }
      var k = undefined;
      var _g10 = lh;
      for (k in _g10) {
        if (isNaN(parseInt(k))) {
          var v = _g10[k];
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
      var _g12 = 0;
      var _g11 = args;
      while ((_g12 < length(_g11))) {
        var arg = _g11[_g12];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g12 = (_g12 + 1);
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
        var _g13 = form[1];
        var t = _g13[0];
        var k = _g13[1];
        var body = sub(form, 2);
        return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g3 = form[0];
        var args = form[1];
        var _g14 = sub(form, 2);
        add(environment, {});
        var _g16 = (function () {
          var _g18 = 0;
          var _g17 = args;
          while ((_g18 < length(_g17))) {
            var _g15 = _g17[_g18];
            setenv(_g15, {_stash: true, variable: true});
            _g18 = (_g18 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g14)));
        })();
        drop(environment);
        return(_g16);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g4 = form[0];
        var name = form[1];
        var _g19 = form[2];
        var _g20 = sub(form, 3);
        add(environment, {});
        var _g22 = (function () {
          var _g24 = 0;
          var _g23 = _g19;
          while ((_g24 < length(_g23))) {
            var _g21 = _g23[_g24];
            setenv(_g21, {_stash: true, variable: true});
            _g24 = (_g24 + 1);
          }
          return(join([x, name, map42(macroexpand, _g19)], macroexpand(_g20)));
        })();
        drop(environment);
        return(_g22);
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
    var _g25 = form;
    for (k in _g25) {
      if (isNaN(parseInt(k))) {
        var v = _g25[k];
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
    var _g27 = 0;
    var _g26 = form;
    while ((_g27 < length(_g26))) {
      var x = _g26[_g27];
      if (quasisplice63(x, depth)) {
        var x = quasiexpand(x[1]);
        add(xs, x);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g27 = (_g27 + 1);
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
  var reserved = {"repeat": true, "function": true, "return": true, "finally": true, "<": true, "continue": true, "throw": true, ">": true, "elseif": true, "==": true, "in": true, "*": true, "false": true, "then": true, "not": true, "switch": true, "%": true, "typeof": true, "until": true, "new": true, "or": true, "delete": true, "nil": true, "local": true, "instanceof": true, "true": true, "debugger": true, "and": true, "try": true, "=": true, "catch": true, "do": true, "end": true, "-": true, ">=": true, "/": true, "<=": true, "var": true, "this": true, "else": true, "+": true, "for": true, "break": true, "case": true, "void": true, "with": true, "while": true, "default": true, "if": true};
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
    var _g28 = ["table"];
    _g28.export = quote_frame(m.export);
    _g28.import = quoted(m.import);
    return(_g28);
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g29 = {};
  exports.utilities = _g29;
  _g29.setenv = setenv;
  _g29["macro?"] = macro63;
  _g29["quote-modules"] = quote_modules;
  _g29.macroexpand = macroexpand;
  _g29["module-key"] = module_key;
  _g29["stash*"] = stash42;
  _g29["quote-environment"] = quote_environment;
  _g29["special-form?"] = special_form63;
  _g29["bind*"] = bind42;
  _g29.indentation = indentation;
  _g29["to-id"] = to_id;
  _g29["bound?"] = bound63;
  _g29["symbol?"] = symbol63;
  _g29["initial-environment"] = initial_environment;
  _g29["valid-id?"] = valid_id63;
  _g29.quasiexpand = quasiexpand;
  _g29.getenv = getenv;
  _g29.bind = bind;
  _g29.quoted = quoted;
  _g29["variable?"] = variable63;
  _g29["symbol-expansion"] = symbol_expansion;
  _g29["macro-function"] = macro_function;
  _g29["special?"] = special63;
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
    var _g30 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g30, upto));
    } else {
      var l = sublist(x, _g30, upto);
      var k = undefined;
      var _g31 = x;
      for (k in _g31) {
        if (isNaN(parseInt(k))) {
          var v = _g31[k];
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
      var _g32 = l1;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
          l[k] = v;
        }
      }
      var _g34 = undefined;
      var _g33 = l2;
      for (_g34 in _g33) {
        if (isNaN(parseInt(_g34))) {
          var v = _g33[_g34];
          l[_g34] = v;
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
    var _g36 = 0;
    var _g35 = l;
    while ((_g36 < length(_g35))) {
      var x = _g35[_g36];
      if (f(x)) {
        add(l1, x);
      }
      _g36 = (_g36 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g38 = 0;
    var _g37 = l;
    while ((_g38 < length(_g37))) {
      var x = _g37[_g38];
      var x = f(x);
      if (x) {
        return(x);
      }
      _g38 = (_g38 + 1);
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
    var _g40 = 0;
    var _g39 = l;
    while ((_g40 < length(_g39))) {
      var x = _g39[_g40];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g40 = (_g40 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g41 = t;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
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
    var _g42 = t;
    for (k in _g42) {
      if (isNaN(parseInt(k))) {
        var v = _g42[k];
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
    var _g43 = t;
    for (k in _g43) {
      if (isNaN(parseInt(k))) {
        var v = _g43[k];
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
    var _g44 = t;
    for (k in _g44) {
      if (isNaN(parseInt(k))) {
        var v = _g44[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g45 = sub(xs, 0);
    return(join(t, _g45));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g46 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g47 = t;
    for (k in _g47) {
      if (isNaN(parseInt(k))) {
        var v = _g47[k];
        if (!(_g46[k])) {
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
    var _g48 = sub(xs, 0);
    if (empty63(_g48)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g48));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g49 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g49));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g50)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g51));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g52)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g53)));
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
      var _g54 = x;
      for (k in _g54) {
        if (isNaN(parseInt(k))) {
          var v = _g54[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g55 = x1;
      while ((i < length(_g55))) {
        var y = _g55[i];
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
    var _g56 = stash(args);
    return((f.apply)(f, _g56));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g57 = args;
      for (k in _g57) {
        if (isNaN(parseInt(k))) {
          var v = _g57[k];
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
        var _g58 = l;
        for (k in _g58) {
          if (isNaN(parseInt(k))) {
            var v = _g58[k];
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
  _g59 = {};
  exports.runtime = _g59;
  _g59.inner = inner;
  _g59["string-literal?"] = string_literal63;
  _g59.search = search;
  _g59["/"] = _47;
  _g59["+"] = _43;
  _g59["*"] = _42;
  _g59.pairwise = pairwise;
  _g59.splice = splice;
  _g59["%"] = _37;
  _g59.code = code;
  _g59.drop = drop;
  _g59["map*"] = map42;
  _g59["empty?"] = empty63;
  _g59["%message-handler"] = _37message_handler;
  _g59.unstash = unstash;
  _g59.stash = stash;
  _g59.cat = cat;
  _g59.mapt = mapt;
  _g59.print = print;
  _g59.apply = apply;
  _g59.sublist = sublist;
  _g59["to-string"] = to_string;
  _g59["parse-number"] = parse_number;
  _g59["list?"] = list63;
  _g59["table?"] = table63;
  _g59["composite?"] = composite63;
  _g59["id-literal?"] = id_literal63;
  _g59["boolean?"] = boolean63;
  _g59["number?"] = number63;
  _g59["function?"] = function63;
  _g59["<"] = _60;
  _g59["is?"] = is63;
  _g59["nil?"] = nil63;
  _g59.write = write;
  _g59.exit = exit;
  _g59.type = type;
  _g59["write-file"] = write_file;
  _g59["read-file"] = read_file;
  _g59["<="] = _6061;
  _g59[">="] = _6261;
  _g59["="] = _61;
  _g59.substring = substring;
  _g59["string?"] = string63;
  _g59[">"] = _62;
  _g59["-"] = _;
  _g59.tl = tl;
  _g59.split = split;
  _g59.mapo = mapo;
  _g59.char = char;
  _g59.iterate = iterate;
  _g59.join = join;
  _g59["keys?"] = keys63;
  _g59["atom?"] = atom63;
  _g59.last = last;
  _g59.replicate = replicate;
  _g59.exclude = exclude;
  _g59.find = find;
  _g59.map = map;
  _g59.keep = keep;
  _g59.reduce = reduce;
  _g59.reverse = reverse;
  _g59.length = length;
  _g59.add = add;
  _g59.hd = hd;
  _g59.sub = sub;
  _g59.extend = extend;
})();
(function () {
})();
(function () {
  global.target = "js";
})();
(function () {
  var delimiters = {"(": true, "\n": true, ")": true, ";": true};
  var whitespace = {"\n": true, "\t": true, " ": true};
  make_stream = function (str) {
    return({string: str, pos: 0, len: length(str)});
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
  _g173 = {};
  exports.reader = _g173;
  _g173["read-from-string"] = read_from_string;
  _g173.read = read;
  _g173["read-all"] = read_all;
  _g173["read-table"] = read_table;
  _g173["make-stream"] = make_stream;
})();
(function () {
  var infix = {lua: {"and": true, "=": "==", cat: "..", "~=": true, "or": true}, common: {"/": true, ">": true, "-": true, "<": true, "+": true, "*": true, "%": true, "<=": true, ">=": true}, js: {"and": "&&", "=": "===", "or": "||", "~=": "!=", cat: "+"}};
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
    var _g174 = args;
    while ((i < length(_g174))) {
      var arg = _g174[i];
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
    var _g175 = unstash(sublist(arguments, 1));
    var tail63 = _g175["tail?"];
    var str = "";
    var i = 0;
    var _g176 = forms;
    while ((i < length(_g176))) {
      var x = _g176[i];
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
  function compile_infix(_g177) {
    var op = _g177[0];
    var args = sub(_g177, 1);
    var str = "(";
    var op = getop(op);
    var i = 0;
    var _g178 = args;
    while ((i < length(_g178))) {
      var arg = _g178[i];
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
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g179 = (function () {
      indent_level = (indent_level + 1);
      var _g180 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g180);
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
      return((ind + "if (" + cond1 + ") {\n" + _g179 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g179 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g179 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g179 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g179 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g179 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g181 = unstash(sublist(arguments, 2));
    var name = _g181.name;
    var prefix = _g181.prefix;
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
      var _g182 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g182);
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
      return(("function " + id + args + " {\n" + body + ind + "}" + tr));
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
  }
  compile_special = function (form, stmt63, tail63) {
    var _g183 = getenv(hd(form));
    var stmt = _g183.stmt;
    var self_tr63 = _g183.tr;
    var special = _g183.special;
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
    var _g184 = unstash(sublist(arguments, 1));
    var stmt63 = _g184["stmt?"];
    var tail63 = _g184["tail?"];
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
    var _g185 = [];
    var n = undefined;
    var _g186 = toplevel;
    for (n in _g186) {
      if (isNaN(parseInt(n))) {
        var b = _g186[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(_g185, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (!(empty63(_g185))) {
      return(join(["do", ["define", m, ["table"]], ["set", ["get", "exports", ["quote", k]], m]], _g185));
    }
  }
  function encapsulate(body) {
    var _g187 = macroexpand(body);
    var epilog = macroexpand(exported());
    return([join(["%function", []], join(_g187, [epilog]))]);
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
    var _g197 = toplevel;
    for (name in _g197) {
      if (isNaN(parseInt(name))) {
        var binding = _g197[name];
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
    var _g198 = m.export;
    for (k in _g198) {
      if (isNaN(parseInt(k))) {
        var v = _g198[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g199 = {};
  exports.compiler = _g199;
  _g199["compile-function"] = compile_function;
  _g199["compile-branch"] = compile_branch;
  _g199["load-module"] = load_module;
  _g199["in-module"] = in_module;
  _g199["open-module"] = open_module;
  _g199.eval = eval;
  _g199["compile-call"] = compile_call;
  _g199.compile = compile;
  _g199["compile-body"] = compile_body;
  _g199["compile-special"] = compile_special;
})();
(function () {
  modules = {special: {import: ["utilities", "special", "core", "compiler"], export: {"%global-function": {tr: true, stmt: true, module: "special", export: true, special: function (_g200) {
    var name = _g200[0];
    var args = _g200[1];
    var body = sub(_g200, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
    }
  }}, "not": {module: "special", export: true, special: function (_g201) {
    var x = _g201[0];
    var x = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + x + ")"));
  }}, "do": {tr: true, stmt: true, module: "special", export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "return": {special: function (_g202) {
    var x = _g202[0];
    var x = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + x));
  }, export: true, module: "special", stmt: true}, "%local-function": {tr: true, stmt: true, module: "special", export: true, special: function (_g203) {
    var name = _g203[0];
    var args = _g203[1];
    var body = sub(_g203, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "%function": {module: "special", export: true, special: function (_g204) {
    var args = _g204[0];
    var body = sub(_g204, 1);
    return(compile_function(args, body));
  }}, "break": {special: function (_g60) {
    return((indentation() + "break"));
  }, export: true, module: "special", stmt: true}, "%try": {tr: true, stmt: true, module: "special", export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g205 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g205);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, e]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g206 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g206);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "if": {tr: true, stmt: true, module: "special", export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g207 = form;
    while ((i < length(_g207))) {
      var condition = _g207[i];
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
  }}, "error": {special: function (_g208) {
    var x = _g208[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, export: true, module: "special", stmt: true}, "%local": {special: function (_g209) {
    var name = _g209[0];
    var value = _g209[1];
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
  }, export: true, module: "special", stmt: true}, "get": {module: "special", export: true, special: function (_g210) {
    var t = _g210[0];
    var k = _g210[1];
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
  }}, "set": {special: function (_g211) {
    var lh = _g211[0];
    var rh = _g211[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true, module: "special", stmt: true}, "%object": {module: "special", export: true, special: function (forms) {
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
    var _g212 = pairs;
    while ((i < length(_g212))) {
      var _g213 = _g212[i];
      var k = _g213[0];
      var v = _g213[1];
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
  }}, "%for": {tr: true, stmt: true, module: "special", export: true, special: function (_g214) {
    var _g215 = _g214[0];
    var t = _g215[0];
    var k = _g215[1];
    var body = sub(_g214, 1);
    var t = compile(t);
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g216 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g216);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
    }
  }}, "%array": {module: "special", export: true, special: function (forms) {
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
    var _g217 = forms;
    while ((i < length(_g217))) {
      var x = _g217[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "while": {tr: true, stmt: true, module: "special", export: true, special: function (_g218) {
    var condition = _g218[0];
    var body = sub(_g218, 1);
    var condition = compile(condition);
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g219 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g219);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
    }
  }}}}, reader: {import: ["special", "core"], export: {"read-from-string": {variable: true, module: "reader", export: true}, read: {variable: true, module: "reader", export: true}, "read-table": {variable: true, module: "reader", export: true}, "read-all": {variable: true, module: "reader", export: true}, "make-stream": {variable: true, module: "reader", export: true}, "define-reader": {module: "reader", export: true, macro: function (_g220) {
    var char = _g220[0];
    var stream = _g220[1];
    var body = unstash(sublist(arguments, 1));
    var _g221 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g221)]);
  }}}}, boot: {import: ["utilities", "special", "core"], export: {}}, lib: {import: ["core", "special"], export: {}}, compiler: {import: ["utilities", "runtime", "special", "core", "reader"], export: {"compile-call": {variable: true, module: "compiler", export: true}, "load-module": {variable: true, module: "compiler", export: true}, "current-module": {global: true, export: true, module: "compiler"}, "define-module": {export: true, module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g222 = sub(body, 0);
    var imports = [];
    var imp = _g222.import;
    var exp = _g222.export;
    var _g224 = 0;
    var _g223 = (imp || []);
    while ((_g224 < length(_g223))) {
      var k = _g223[_g224];
      load_module(k);
      _g224 = (_g224 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g226 = 0;
    var _g225 = (exp || []);
    while ((_g226 < length(_g225))) {
      var k = _g225[_g226];
      setenv(k, {_stash: true, export: true});
      _g226 = (_g226 + 1);
    }
    return(join(["do"], imports));
  }}, eval: {variable: true, module: "compiler", export: true}, compile: {variable: true, module: "compiler", export: true}, "in-module": {variable: true, module: "compiler", export: true}, "compile-function": {variable: true, module: "compiler", export: true}, "open-module": {variable: true, module: "compiler", export: true}, "compile-special": {variable: true, module: "compiler", export: true}, "compile-branch": {variable: true, module: "compiler", export: true}, "compile-body": {variable: true, module: "compiler", export: true}}}, core: {import: ["utilities", "runtime", "special", "core"], export: {"let-macro": {export: true, module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g227 = sub(body, 0);
    add(environment, {});
    var _g228 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g227)));
    })();
    drop(environment);
    return(_g228);
  }}, each: {export: true, module: "core", macro: function (_g229) {
    var t = _g229[0];
    var k = _g229[1];
    var v = _g229[2];
    var body = unstash(sublist(arguments, 1));
    var _g230 = sub(body, 0);
    var t1 = make_id();
    return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
      var _g231 = ["target"];
      _g231.js = ["isNaN", ["parseInt", k]];
      _g231.lua = ["not", ["number?", k]];
      return(_g231);
    })(), join(["let", [v, ["get", t1, k]]], _g230)]]]);
  }}, fn: {export: true, module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g232 = sub(body, 0);
    var _g233 = bind42(args, _g232);
    var args = _g233[0];
    var _g234 = _g233[1];
    return(join(["%function", args], _g234));
  }}, across: {export: true, module: "core", macro: function (_g235) {
    var l = _g235[0];
    var v = _g235[1];
    var i = _g235[2];
    var start = _g235[3];
    var body = unstash(sublist(arguments, 1));
    var _g236 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g236, [["inc", i]]))]]);
  }}, "cat!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g237 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g237)]);
  }}, pr: {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var xs = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], xs)]);
  }}, at: {export: true, module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = ["+", i, 1];
    }
    return(["get", l, i]);
  }}, inc: {export: true, module: "core", macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }}, list: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g238 = body;
      for (k in _g238) {
        if (isNaN(parseInt(k))) {
          var v = _g238[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, dec: {export: true, module: "core", macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }}, quasiquote: {export: true, module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }}, table: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g105, x) {
      return(x);
    }, body)));
  }}, "join*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, quote: {export: true, module: "core", macro: function (form) {
    return(quoted(form));
  }}, "let-symbol": {export: true, module: "core", macro: function (expansions) {
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
  }}, target: {export: true, global: true, module: "core", macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, "set-of": {export: true, module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g243 = 0;
    var _g242 = elements;
    while ((_g243 < length(_g242))) {
      var e = _g242[_g243];
      l[e] = true;
      _g243 = (_g243 + 1);
    }
    return(join(["table"], l));
  }}, language: {export: true, module: "core", macro: function () {
    return(["quote", target]);
  }}, "list*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g244 = xs;
      while ((i < length(_g244))) {
        var x = _g244[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, "define-special": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g245 = sub(body, 0);
    var form = join(["fn", args], _g245);
    var keys = sub(_g245, length(_g245));
    eval(join((function () {
      var _g246 = ["setenv", ["quote", name]];
      _g246.special = form;
      _g246.form = ["quote", form];
      return(_g246);
    })(), keys));
    return(undefined);
  }}, "define-local": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g247 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g247))) {
      var _g248 = bind42(x, _g247);
      var args = _g248[0];
      var _g249 = _g248[1];
      return(join(["%local-function", name, args], _g249));
    } else {
      return(["%local", name, x]);
    }
  }}, "define-global": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g250 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g250))) {
      var _g251 = bind42(x, _g250);
      var args = _g251[0];
      var _g252 = _g251[1];
      return(join(["%global-function", name, args], _g252));
    } else if ((target === "js")) {
      return(["set", ["get", "global", ["quote", to_id(name)]], x]);
    } else {
      return(["set", name, x]);
    }
  }}, "with-frame": {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var x = make_id();
    return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }}, "define-macro": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g253 = sub(body, 0);
    var form = join(["fn", args], _g253);
    eval((function () {
      var _g254 = ["setenv", ["quote", name]];
      _g254.macro = form;
      _g254.form = ["quote", form];
      return(_g254);
    })());
    return(undefined);
  }}, "define-symbol": {export: true, module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "with-bindings": {export: true, module: "core", macro: function (_g255) {
    var names = _g255[0];
    var body = unstash(sublist(arguments, 1));
    var _g256 = sub(body, 0);
    var x = make_id();
    return(join(["with-frame", ["across", [names, x], (function () {
      var _g257 = ["setenv", x];
      _g257.variable = true;
      return(_g257);
    })()]], _g256));
  }}, "join!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g258 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g258)]);
  }}, let: {export: true, module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g259 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g260) {
      var lh = _g260[0];
      var rh = _g260[1];
      var _g262 = 0;
      var _g261 = bind(lh, rh);
      while ((_g262 < length(_g261))) {
        var _g263 = _g261[_g262];
        var id = _g263[0];
        var val = _g263[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g262 = (_g262 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g259)])));
  }}, guard: {export: true, module: "core", macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, define: {export: true, module: "core", macro: function (name, x) {
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
  }}}}, runtime: {import: ["special", "core"], export: {">": {variable: true, module: "runtime", export: true}, "=": {variable: true, module: "runtime", export: true}, "<": {variable: true, module: "runtime", export: true}, "string-literal?": {variable: true, module: "runtime", export: true}, "write-file": {variable: true, module: "runtime", export: true}, search: {variable: true, module: "runtime", export: true}, "/": {variable: true, module: "runtime", export: true}, "-": {variable: true, module: "runtime", export: true}, "+": {variable: true, module: "runtime", export: true}, "*": {variable: true, module: "runtime", export: true}, pairwise: {variable: true, module: "runtime", export: true}, splice: {variable: true, module: "runtime", export: true}, "%": {variable: true, module: "runtime", export: true}, code: {variable: true, module: "runtime", export: true}, drop: {variable: true, module: "runtime", export: true}, "read-file": {variable: true, module: "runtime", export: true}, find: {variable: true, module: "runtime", export: true}, "empty?": {variable: true, module: "runtime", export: true}, cat: {variable: true, module: "runtime", export: true}, mapt: {variable: true, module: "runtime", export: true}, "boolean?": {variable: true, module: "runtime", export: true}, sublist: {variable: true, module: "runtime", export: true}, unstash: {variable: true, module: "runtime", export: true}, length: {variable: true, module: "runtime", export: true}, "<=": {variable: true, module: "runtime", export: true}, "parse-number": {variable: true, module: "runtime", export: true}, "nil?": {variable: true, module: "runtime", export: true}, "function?": {variable: true, module: "runtime", export: true}, type: {variable: true, module: "runtime", export: true}, "is?": {variable: true, module: "runtime", export: true}, substring: {variable: true, module: "runtime", export: true}, "list?": {variable: true, module: "runtime", export: true}, tl: {variable: true, module: "runtime", export: true}, "keys?": {variable: true, module: "runtime", export: true}, mapo: {variable: true, module: "runtime", export: true}, "table?": {variable: true, module: "runtime", export: true}, split: {variable: true, module: "runtime", export: true}, "id-literal?": {variable: true, module: "runtime", export: true}, write: {variable: true, module: "runtime", export: true}, "atom?": {variable: true, module: "runtime", export: true}, "number?": {variable: true, module: "runtime", export: true}, exclude: {variable: true, module: "runtime", export: true}, hd: {variable: true, module: "runtime", export: true}, extend: {variable: true, module: "runtime", export: true}, sub: {variable: true, module: "runtime", export: true}, char: {variable: true, module: "runtime", export: true}, add: {variable: true, module: "runtime", export: true}, map: {variable: true, module: "runtime", export: true}, exit: {variable: true, module: "runtime", export: true}, inner: {variable: true, module: "runtime", export: true}, ">=": {variable: true, module: "runtime", export: true}, reverse: {variable: true, module: "runtime", export: true}, reduce: {variable: true, module: "runtime", export: true}, keep: {variable: true, module: "runtime", export: true}, "string?": {variable: true, module: "runtime", export: true}, iterate: {variable: true, module: "runtime", export: true}, replicate: {variable: true, module: "runtime", export: true}, last: {variable: true, module: "runtime", export: true}, join: {variable: true, module: "runtime", export: true}, "map*": {variable: true, module: "runtime", export: true}, apply: {variable: true, module: "runtime", export: true}, print: {variable: true, module: "runtime", export: true}, "composite?": {variable: true, module: "runtime", export: true}, "to-string": {variable: true, module: "runtime", export: true}, stash: {variable: true, module: "runtime", export: true}, "%message-handler": {variable: true, module: "runtime", export: true}}}, utilities: {import: ["special", "core"], export: {"symbol?": {variable: true, module: "utilities", export: true}, quasiexpand: {variable: true, module: "utilities", export: true}, "indent-level": {global: true, export: true, module: "utilities"}, "with-indent": {module: "utilities", export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "quote-modules": {variable: true, module: "utilities", export: true}, macroexpand: {variable: true, module: "utilities", export: true}, getenv: {variable: true, module: "utilities", export: true}, "module-key": {variable: true, module: "utilities", export: true}, "special?": {variable: true, module: "utilities", export: true}, "macro-function": {variable: true, module: "utilities", export: true}, exports: {global: true, export: true, module: "utilities"}, "symbol-expansion": {variable: true, module: "utilities", export: true}, "variable?": {variable: true, module: "utilities", export: true}, "bind*": {variable: true, module: "utilities", export: true}, setenv: {variable: true, module: "utilities", export: true}, quoted: {variable: true, module: "utilities", export: true}, bind: {variable: true, module: "utilities", export: true}, "make-id": {}, "stash*": {variable: true, module: "utilities", export: true}, "valid-id?": {variable: true, module: "utilities", export: true}, "initial-environment": {variable: true, module: "utilities", export: true}, "special-form?": {variable: true, module: "utilities", export: true}, "quote-environment": {variable: true, module: "utilities", export: true}, "to-id": {variable: true, module: "utilities", export: true}, "macro?": {variable: true, module: "utilities", export: true}, indentation: {variable: true, module: "utilities", export: true}, "bound?": {variable: true, module: "utilities", export: true}}}};
  environment = [{"define-module": {export: true, module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g267 = sub(body, 0);
    var imports = [];
    var imp = _g267.import;
    var exp = _g267.export;
    var _g269 = 0;
    var _g268 = (imp || []);
    while ((_g269 < length(_g268))) {
      var k = _g268[_g269];
      load_module(k);
      _g269 = (_g269 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g271 = 0;
    var _g270 = (exp || []);
    while ((_g271 < length(_g270))) {
      var k = _g270[_g271];
      setenv(k, {_stash: true, export: true});
      _g271 = (_g271 + 1);
    }
    return(join(["do"], imports));
  }}}];
  _g272 = {};
  exports.boot = _g272;
  _g272.environment = environment;
  _g272.modules = modules;
})();
(function () {
  function rep(str) {
    var _g273 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g276) {
        return([false, _g276]);
      }
    })();
    var _g1 = _g273[0];
    var x = _g273[1];
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
    var _g274 = args;
    while ((i < length(_g274))) {
      var arg = _g274[i];
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
  }
  return(main());
})();
