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
        var k = keys63(_g8);
        if (k) {
          return(b[k]);
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
    var b = last(environment)[k];
    return((b && is63(b.variable)));
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
      var _g9 = args;
      for (k in _g9) {
        if (isNaN(parseInt(k))) {
          var v = _g9[k];
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
      var _g10 = lh;
      while ((i < length(_g10))) {
        var x = _g10[i];
        bs = join(bs, bind(x, ["at", rh, i]));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, ["sub", rh, length(lh)]));
      }
      var k = undefined;
      var _g11 = lh;
      for (k in _g11) {
        if (isNaN(parseInt(k))) {
          var v = _g11[k];
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
      var _g13 = 0;
      var _g12 = args;
      while ((_g13 < length(_g12))) {
        var arg = _g12[_g13];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g13 = (_g13 + 1);
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
        var _g14 = form[1];
        var t = _g14[0];
        var k = _g14[1];
        var body = sub(form, 2);
        return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g3 = form[0];
        var args = form[1];
        var _g15 = sub(form, 2);
        add(environment, {});
        var _g17 = (function () {
          var _g19 = 0;
          var _g18 = args;
          while ((_g19 < length(_g18))) {
            var _g16 = _g18[_g19];
            setenv(_g16, {_stash: true, variable: true});
            _g19 = (_g19 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g15)));
        })();
        drop(environment);
        return(_g17);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g4 = form[0];
        var name = form[1];
        var _g20 = form[2];
        var _g21 = sub(form, 3);
        add(environment, {});
        var _g23 = (function () {
          var _g25 = 0;
          var _g24 = _g20;
          while ((_g25 < length(_g24))) {
            var _g22 = _g24[_g25];
            setenv(_g22, {_stash: true, variable: true});
            _g25 = (_g25 + 1);
          }
          return(join([x, name, map42(macroexpand, _g20)], macroexpand(_g21)));
        })();
        drop(environment);
        return(_g23);
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
    var _g26 = form;
    for (k in _g26) {
      if (isNaN(parseInt(k))) {
        var v = _g26[k];
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
    var _g28 = 0;
    var _g27 = form;
    while ((_g28 < length(_g27))) {
      var x = _g27[_g28];
      if (quasisplice63(x, depth)) {
        var x = quasiexpand(x[1]);
        add(xs, x);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g28 = (_g28 + 1);
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
  var reserved = {"for": true, "==": true, "typeof": true, "end": true, "nil": true, "catch": true, "=": true, "in": true, "false": true, "and": true, "/": true, "%": true, "until": true, "not": true, "+": true, "instanceof": true, "var": true, "finally": true, "new": true, "then": true, "return": true, "or": true, ">=": true, "break": true, "do": true, "debugger": true, "switch": true, ">": true, "delete": true, "<=": true, "elseif": true, "if": true, "<": true, "while": true, "case": true, "continue": true, "with": true, "local": true, "void": true, "this": true, "repeat": true, "throw": true, "function": true, "try": true, "default": true, "*": true, "else": true, "true": true, "-": true};
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
    var _g29 = ["table"];
    _g29.export = quote_frame(m.export);
    _g29.import = quoted(m.import);
    return(_g29);
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g30 = {};
  exports.utilities = _g30;
  _g30.macroexpand = macroexpand;
  _g30["module-key"] = module_key;
  _g30["valid-id?"] = valid_id63;
  _g30["special-form?"] = special_form63;
  _g30.setenv = setenv;
  _g30["special?"] = special63;
  _g30.quasiexpand = quasiexpand;
  _g30["initial-environment"] = initial_environment;
  _g30["macro-function"] = macro_function;
  _g30.indentation = indentation;
  _g30["bound?"] = bound63;
  _g30.bind = bind;
  _g30["quote-modules"] = quote_modules;
  _g30["quote-environment"] = quote_environment;
  _g30["to-id"] = to_id;
  _g30["bind*"] = bind42;
  _g30["stash*"] = stash42;
  _g30.quoted = quoted;
  _g30["symbol-expansion"] = symbol_expansion;
  _g30["symbol?"] = symbol63;
  _g30["macro?"] = macro63;
  _g30.getenv = getenv;
  _g30["variable?"] = variable63;
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
    var _g31 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g31, upto));
    } else {
      var l = sublist(x, _g31, upto);
      var k = undefined;
      var _g32 = x;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
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
      var _g33 = l1;
      for (k in _g33) {
        if (isNaN(parseInt(k))) {
          var v = _g33[k];
          l[k] = v;
        }
      }
      var _g35 = undefined;
      var _g34 = l2;
      for (_g35 in _g34) {
        if (isNaN(parseInt(_g35))) {
          var v = _g34[_g35];
          l[_g35] = v;
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
    var _g37 = 0;
    var _g36 = l;
    while ((_g37 < length(_g36))) {
      var x = _g36[_g37];
      if (f(x)) {
        add(l1, x);
      }
      _g37 = (_g37 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g39 = 0;
    var _g38 = l;
    while ((_g39 < length(_g38))) {
      var x = _g38[_g39];
      var x = f(x);
      if (x) {
        return(x);
      }
      _g39 = (_g39 + 1);
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
    var _g41 = 0;
    var _g40 = l;
    while ((_g41 < length(_g40))) {
      var x = _g40[_g41];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g41 = (_g41 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g42 = t;
    for (k in _g42) {
      if (isNaN(parseInt(k))) {
        var v = _g42[k];
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
    var _g43 = t;
    for (k in _g43) {
      if (isNaN(parseInt(k))) {
        var v = _g43[k];
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
    var _g44 = t;
    for (k in _g44) {
      if (isNaN(parseInt(k))) {
        var v = _g44[k];
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
    var _g45 = t;
    for (k1 in _g45) {
      if (isNaN(parseInt(k1))) {
        var v = _g45[k1];
        k = k1;
        break;
      }
    }
    return(k);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g46 = sub(xs, 0);
    return(join(t, _g46));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g47 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g48 = t;
    for (k in _g48) {
      if (isNaN(parseInt(k))) {
        var v = _g48[k];
        if (!(_g47[k])) {
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
    var _g49 = sub(xs, 0);
    if (empty63(_g49)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g49));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g50 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g50));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g51 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g51)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g52 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g52));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g53 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g53)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g54 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g54)));
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
      var _g55 = x;
      for (k in _g55) {
        if (isNaN(parseInt(k))) {
          var v = _g55[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g56 = x1;
      while ((i < length(_g56))) {
        var y = _g56[i];
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
    var _g57 = stash(args);
    return((f.apply)(f, _g57));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g58 = args;
      for (k in _g58) {
        if (isNaN(parseInt(k))) {
          var v = _g58[k];
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
        var _g59 = l;
        for (k in _g59) {
          if (isNaN(parseInt(k))) {
            var v = _g59[k];
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
  _g60 = {};
  exports.runtime = _g60;
  _g60.stash = stash;
  _g60.inner = inner;
  _g60.last = last;
  _g60.splice = splice;
  _g60["id-literal?"] = id_literal63;
  _g60["is?"] = is63;
  _g60.add = add;
  _g60.mapo = mapo;
  _g60["nil?"] = nil63;
  _g60.tl = tl;
  _g60.print = print;
  _g60["%message-handler"] = _37message_handler;
  _g60["string-literal?"] = string_literal63;
  _g60.apply = apply;
  _g60["%"] = _37;
  _g60["to-string"] = to_string;
  _g60.replicate = replicate;
  _g60["parse-number"] = parse_number;
  _g60["*"] = _42;
  _g60.write = write;
  _g60.unstash = unstash;
  _g60["atom?"] = atom63;
  _g60["composite?"] = composite63;
  _g60.keep = keep;
  _g60["function?"] = function63;
  _g60["boolean?"] = boolean63;
  _g60.exit = exit;
  _g60["table?"] = table63;
  _g60["string?"] = string63;
  _g60.extend = extend;
  _g60.length = length;
  _g60["<"] = _60;
  _g60["="] = _61;
  _g60.reverse = reverse;
  _g60.substring = substring;
  _g60["+"] = _43;
  _g60.search = search;
  _g60["number?"] = number63;
  _g60["list?"] = list63;
  _g60["write-file"] = write_file;
  _g60["read-file"] = read_file;
  _g60["<="] = _6061;
  _g60.map = map;
  _g60.find = find;
  _g60[">"] = _62;
  _g60["/"] = _47;
  _g60["-"] = _;
  _g60.type = type;
  _g60.pairwise = pairwise;
  _g60.exclude = exclude;
  _g60.iterate = iterate;
  _g60["keys?"] = keys63;
  _g60["map*"] = map42;
  _g60.sub = sub;
  _g60[">="] = _6261;
  _g60.code = code;
  _g60.reduce = reduce;
  _g60.join = join;
  _g60.mapt = mapt;
  _g60.drop = drop;
  _g60.char = char;
  _g60.hd = hd;
  _g60.sublist = sublist;
  _g60["empty?"] = empty63;
  _g60.cat = cat;
  _g60.split = split;
})();
(function () {
})();
(function () {
  global.target = "js";
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
  _g174 = {};
  exports.reader = _g174;
  _g174["read-table"] = read_table;
  _g174["read-from-string"] = read_from_string;
  _g174["read-all"] = read_all;
  _g174.read = read;
  _g174["make-stream"] = make_stream;
})();
(function () {
  var infix = {common: {"<": true, "-": true, ">": true, "/": true, ">=": true, "<=": true, "%": true, "*": true, "+": true}, js: {"or": "||", cat: "+", "~=": "!=", "=": "===", "and": "&&"}, lua: {"=": "==", cat: "..", "~=": true, "or": true, "and": true}};
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
    var _g175 = args;
    while ((i < length(_g175))) {
      var arg = _g175[i];
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
    var _g176 = unstash(sublist(arguments, 1));
    var tail63 = _g176["tail?"];
    var str = "";
    var i = 0;
    var _g177 = forms;
    while ((i < length(_g177))) {
      var x = _g177[i];
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
  function compile_infix(_g178) {
    var op = _g178[0];
    var args = sub(_g178, 1);
    var str = "(";
    var op = getop(op);
    var i = 0;
    var _g179 = args;
    while ((i < length(_g179))) {
      var arg = _g179[i];
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
    var _g180 = (function () {
      indent_level = (indent_level + 1);
      var _g181 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g181);
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
      return((ind + "if (" + cond1 + ") {\n" + _g180 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g180 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g180 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g180 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g180 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g180 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g182 = unstash(sublist(arguments, 2));
    var name = _g182.name;
    var prefix = _g182.prefix;
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
      var _g183 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g183);
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
    var _g184 = getenv(hd(form));
    var special = _g184.special;
    var stmt = _g184.stmt;
    var self_tr63 = _g184.tr;
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
    var _g185 = unstash(sublist(arguments, 1));
    var tail63 = _g185["tail?"];
    var stmt63 = _g185["stmt?"];
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
    var _g186 = [];
    var n = undefined;
    var _g187 = toplevel;
    for (n in _g187) {
      if (isNaN(parseInt(n))) {
        var b = _g187[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(_g186, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (!(empty63(_g186))) {
      return(join(["do", ["define", m, ["table"]], ["set", ["get", "exports", ["quote", k]], m]], _g186));
    }
  }
  function encapsulate(body) {
    var _g188 = macroexpand(body);
    var epilog = macroexpand(exported());
    return([join(["%function", []], join(_g188, [epilog]))]);
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
    var _g198 = toplevel;
    for (name in _g198) {
      if (isNaN(parseInt(name))) {
        var binding = _g198[name];
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
    var _g199 = m.export;
    for (k in _g199) {
      if (isNaN(parseInt(k))) {
        var v = _g199[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g200 = {};
  exports.compiler = _g200;
  _g200["load-module"] = load_module;
  _g200["compile-call"] = compile_call;
  _g200["in-module"] = in_module;
  _g200.eval = eval;
  _g200.compile = compile;
  _g200["compile-special"] = compile_special;
  _g200["compile-function"] = compile_function;
  _g200["compile-branch"] = compile_branch;
  _g200["compile-body"] = compile_body;
  _g200["open-module"] = open_module;
})();
(function () {
  modules = {utilities: {export: {"indent-level": {global: true, module: "utilities", export: true}, setenv: {module: "utilities", export: true, variable: true}, macroexpand: {module: "utilities", export: true, variable: true}, indentation: {module: "utilities", export: true, variable: true}, quoted: {module: "utilities", export: true, variable: true}, "special?": {module: "utilities", export: true, variable: true}, exports: {global: true, module: "utilities", export: true}, "bind*": {module: "utilities", export: true, variable: true}, getenv: {module: "utilities", export: true, variable: true}, "module-key": {module: "utilities", export: true, variable: true}, "quote-modules": {module: "utilities", export: true, variable: true}, quasiexpand: {module: "utilities", export: true, variable: true}, "make-id": {}, "valid-id?": {module: "utilities", export: true, variable: true}, "macro?": {module: "utilities", export: true, variable: true}, bind: {module: "utilities", export: true, variable: true}, "symbol?": {module: "utilities", export: true, variable: true}, "bound?": {module: "utilities", export: true, variable: true}, "stash*": {module: "utilities", export: true, variable: true}, "symbol-expansion": {module: "utilities", export: true, variable: true}, "with-indent": {module: "utilities", export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "special-form?": {module: "utilities", export: true, variable: true}, "to-id": {module: "utilities", export: true, variable: true}, "macro-function": {module: "utilities", export: true, variable: true}, "quote-environment": {module: "utilities", export: true, variable: true}, "initial-environment": {module: "utilities", export: true, variable: true}, "variable?": {module: "utilities", export: true, variable: true}}, import: ["special", "core"]}, reader: {export: {"read-table": {module: "reader", export: true, variable: true}, "read-all": {module: "reader", export: true, variable: true}, "define-reader": {module: "reader", export: true, macro: function (_g201) {
    var char = _g201[0];
    var stream = _g201[1];
    var body = unstash(sublist(arguments, 1));
    var _g202 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g202)]);
  }}, "make-stream": {module: "reader", export: true, variable: true}, read: {module: "reader", export: true, variable: true}, "read-from-string": {module: "reader", export: true, variable: true}}, import: ["special", "core"]}, runtime: {export: {stash: {module: "runtime", export: true, variable: true}, inner: {module: "runtime", export: true, variable: true}, last: {module: "runtime", export: true, variable: true}, "function?": {module: "runtime", export: true, variable: true}, splice: {module: "runtime", export: true, variable: true}, "id-literal?": {module: "runtime", export: true, variable: true}, "is?": {module: "runtime", export: true, variable: true}, apply: {module: "runtime", export: true, variable: true}, "empty?": {module: "runtime", export: true, variable: true}, add: {module: "runtime", export: true, variable: true}, mapo: {module: "runtime", export: true, variable: true}, "nil?": {module: "runtime", export: true, variable: true}, tl: {module: "runtime", export: true, variable: true}, print: {module: "runtime", export: true, variable: true}, "string?": {module: "runtime", export: true, variable: true}, write: {module: "runtime", export: true, variable: true}, "read-file": {module: "runtime", export: true, variable: true}, "*": {module: "runtime", export: true, variable: true}, "+": {module: "runtime", export: true, variable: true}, unstash: {module: "runtime", export: true, variable: true}, keep: {module: "runtime", export: true, variable: true}, "to-string": {module: "runtime", export: true, variable: true}, "map*": {module: "runtime", export: true, variable: true}, "table?": {module: "runtime", export: true, variable: true}, extend: {module: "runtime", export: true, variable: true}, length: {module: "runtime", export: true, variable: true}, "<": {module: "runtime", export: true, variable: true}, "=": {module: "runtime", export: true, variable: true}, drop: {module: "runtime", export: true, variable: true}, reverse: {module: "runtime", export: true, variable: true}, exclude: {module: "runtime", export: true, variable: true}, search: {module: "runtime", export: true, variable: true}, "number?": {module: "runtime", export: true, variable: true}, "list?": {module: "runtime", export: true, variable: true}, find: {module: "runtime", export: true, variable: true}, "-": {module: "runtime", export: true, variable: true}, "/": {module: "runtime", export: true, variable: true}, type: {module: "runtime", export: true, variable: true}, pairwise: {module: "runtime", export: true, variable: true}, "keys?": {module: "runtime", export: true, variable: true}, iterate: {module: "runtime", export: true, variable: true}, sub: {module: "runtime", export: true, variable: true}, ">=": {module: "runtime", export: true, variable: true}, "string-literal?": {module: "runtime", export: true, variable: true}, "<=": {module: "runtime", export: true, variable: true}, mapt: {module: "runtime", export: true, variable: true}, "composite?": {module: "runtime", export: true, variable: true}, "boolean?": {module: "runtime", export: true, variable: true}, code: {module: "runtime", export: true, variable: true}, exit: {module: "runtime", export: true, variable: true}, "write-file": {module: "runtime", export: true, variable: true}, hd: {module: "runtime", export: true, variable: true}, ">": {module: "runtime", export: true, variable: true}, substring: {module: "runtime", export: true, variable: true}, sublist: {module: "runtime", export: true, variable: true}, "parse-number": {module: "runtime", export: true, variable: true}, "%message-handler": {module: "runtime", export: true, variable: true}, char: {module: "runtime", export: true, variable: true}, join: {module: "runtime", export: true, variable: true}, "atom?": {module: "runtime", export: true, variable: true}, reduce: {module: "runtime", export: true, variable: true}, cat: {module: "runtime", export: true, variable: true}, replicate: {module: "runtime", export: true, variable: true}, map: {module: "runtime", export: true, variable: true}, "%": {module: "runtime", export: true, variable: true}, split: {module: "runtime", export: true, variable: true}}, import: ["special", "core"]}, core: {export: {table: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g106, x) {
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
      var _g203 = body;
      for (k in _g203) {
        if (isNaN(parseInt(k))) {
          var v = _g203[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "define-local": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g204 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g204))) {
      var _g205 = bind42(x, _g204);
      var args = _g205[0];
      var _g206 = _g205[1];
      return(join(["%local-function", name, args], _g206));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "set-of": {module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g208 = 0;
    var _g207 = elements;
    while ((_g208 < length(_g207))) {
      var e = _g207[_g208];
      l[e] = true;
      _g208 = (_g208 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "define-special": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g209 = sub(body, 0);
    var form = join(["fn", args], _g209);
    var keys = sub(_g209, length(_g209));
    eval(join((function () {
      var _g210 = ["setenv", ["quote", name]];
      _g210.special = form;
      _g210.form = ["quote", form];
      return(_g210);
    })(), keys));
    return(undefined);
  }, export: true}, "cat!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g211 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g211)]);
  }, export: true}, "let-symbol": {module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g212 = sub(body, 0);
    add(environment, {});
    var _g213 = (function () {
      map(function (_g214) {
        var name = _g214[0];
        var exp = _g214[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g212)));
    })();
    drop(environment);
    return(_g213);
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
    var x = make_id();
    return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
  }, export: true}, "define-macro": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g215 = sub(body, 0);
    var form = join(["fn", args], _g215);
    eval((function () {
      var _g216 = ["setenv", ["quote", name]];
      _g216.macro = form;
      _g216.form = ["quote", form];
      return(_g216);
    })());
    return(undefined);
  }, export: true}, "list*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g217 = xs;
      while ((i < length(_g217))) {
        var x = _g217[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, export: true}, each: {module: "core", macro: function (_g218) {
    var t = _g218[0];
    var k = _g218[1];
    var v = _g218[2];
    var body = unstash(sublist(arguments, 1));
    var _g219 = sub(body, 0);
    var t1 = make_id();
    return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
      var _g220 = ["target"];
      _g220.lua = ["not", ["number?", k]];
      _g220.js = ["isNaN", ["parseInt", k]];
      return(_g220);
    })(), join(["let", [v, ["get", t1, k]]], _g219)]]]);
  }, export: true}, fn: {module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g221 = sub(body, 0);
    var _g222 = bind42(args, _g221);
    var args = _g222[0];
    var _g223 = _g222[1];
    return(join(["%function", args], _g223));
  }, export: true}, across: {module: "core", macro: function (_g224) {
    var l = _g224[0];
    var v = _g224[1];
    var i = _g224[2];
    var start = _g224[3];
    var body = unstash(sublist(arguments, 1));
    var _g225 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g225, [["inc", i]]))]]);
  }, export: true}, dec: {module: "core", macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, "join!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g226 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g226)]);
  }, export: true}, quote: {module: "core", macro: function (form) {
    return(quoted(form));
  }, export: true}, pr: {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var xs = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], xs)]);
  }, export: true}, "let-macro": {module: "core", macro: function (definitions) {
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
  }, export: true}, target: {global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", export: true}, "define-symbol": {module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "with-bindings": {module: "core", macro: function (_g229) {
    var names = _g229[0];
    var body = unstash(sublist(arguments, 1));
    var _g230 = sub(body, 0);
    var x = make_id();
    return(join(["with-frame", ["across", [names, x], (function () {
      var _g231 = ["setenv", x];
      _g231.variable = true;
      return(_g231);
    })()]], _g230));
  }, export: true}, define: {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g232 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g232))) {
      var _g233 = bind42(x, _g232);
      var args = _g233[0];
      var _g234 = _g233[1];
      return(join(["%global-function", name, args], _g234));
    } else {
      return(["set", name, x]);
    }
  }, export: true}, "define-global": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g235 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g235))) {
      var _g236 = bind42(x, _g235);
      var args = _g236[0];
      var _g237 = _g236[1];
      return(join(["%global-function", name, args], _g237));
    } else if ((target === "js")) {
      return(["set", ["get", "global", ["quote", to_id(name)]], x]);
    } else {
      return(["set", name, x]);
    }
  }, export: true}, let: {module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g238 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g239) {
      var lh = _g239[0];
      var rh = _g239[1];
      var _g241 = 0;
      var _g240 = bind(lh, rh);
      while ((_g241 < length(_g240))) {
        var _g242 = _g240[_g241];
        var id = _g242[0];
        var val = _g242[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g241 = (_g241 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g238)])));
  }, export: true}}, import: ["utilities", "runtime", "special", "core"]}, compiler: {export: {"in-module": {module: "compiler", export: true, variable: true}, "compile-function": {module: "compiler", export: true, variable: true}, "compile-body": {module: "compiler", export: true, variable: true}, eval: {module: "compiler", export: true, variable: true}, "compile-special": {module: "compiler", export: true, variable: true}, "define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g243 = sub(body, 0);
    var imports = [];
    var imp = _g243.import;
    var exp = _g243.export;
    var _g245 = 0;
    var _g244 = (imp || []);
    while ((_g245 < length(_g244))) {
      var k = _g244[_g245];
      load_module(k);
      _g245 = (_g245 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g247 = 0;
    var _g246 = (exp || []);
    while ((_g247 < length(_g246))) {
      var k = _g246[_g247];
      setenv(k, {_stash: true, export: true});
      _g247 = (_g247 + 1);
    }
  }, export: true}, "open-module": {module: "compiler", export: true, variable: true}, "current-module": {global: true, module: "compiler", export: true}, "compile-call": {module: "compiler", export: true, variable: true}, compile: {module: "compiler", export: true, variable: true}, "compile-branch": {module: "compiler", export: true, variable: true}, "load-module": {module: "compiler", export: true, variable: true}}, import: ["utilities", "runtime", "special", "core", "reader"]}, special: {export: {"%for": {module: "special", stmt: true, export: true, special: function (_g248) {
    var _g249 = _g248[0];
    var t = _g249[0];
    var k = _g249[1];
    var body = sub(_g248, 1);
    var t = compile(t);
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g250 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g250);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
    }
  }, tr: true}, "%local": {module: "special", special: function (_g251) {
    var name = _g251[0];
    var value = _g251[1];
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
  }, stmt: true, export: true}, "%function": {special: function (_g252) {
    var args = _g252[0];
    var body = sub(_g252, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "%local-function": {module: "special", stmt: true, export: true, special: function (_g253) {
    var name = _g253[0];
    var args = _g253[1];
    var body = sub(_g253, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, tr: true}, "do": {module: "special", stmt: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, tr: true}, "not": {special: function (_g254) {
    var x = _g254[0];
    var x = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + x + ")"));
  }, module: "special", export: true}, "return": {module: "special", special: function (_g255) {
    var x = _g255[0];
    var x = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + x));
  }, stmt: true, export: true}, "error": {module: "special", special: function (_g256) {
    var x = _g256[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, stmt: true, export: true}, "%global-function": {module: "special", stmt: true, export: true, special: function (_g257) {
    var name = _g257[0];
    var args = _g257[1];
    var body = sub(_g257, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
    }
  }, tr: true}, "if": {module: "special", stmt: true, export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g258 = form;
    while ((i < length(_g258))) {
      var condition = _g258[i];
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
    var _g259 = pairs;
    while ((i < length(_g259))) {
      var _g260 = _g259[i];
      var k = _g260[0];
      var v = _g260[1];
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
  }, module: "special", export: true}, "break": {module: "special", special: function (_g61) {
    return((indentation() + "break"));
  }, stmt: true, export: true}, "get": {special: function (_g261) {
    var t = _g261[0];
    var k = _g261[1];
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
  }, module: "special", export: true}, "while": {module: "special", stmt: true, export: true, special: function (_g262) {
    var condition = _g262[0];
    var body = sub(_g262, 1);
    var condition = compile(condition);
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g263 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g263);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
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
    var _g264 = forms;
    while ((i < length(_g264))) {
      var x = _g264[i];
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
      var _g265 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g265);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, e]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g266 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g266);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true}, "set": {module: "special", special: function (_g267) {
    var lh = _g267[0];
    var rh = _g267[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, stmt: true, export: true}}, import: ["utilities", "special", "core", "compiler"]}, boot: {export: {}, import: ["utilities", "special", "core"]}, lib: {export: {}, import: ["core", "special"]}};
  environment = [{"define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g268 = sub(body, 0);
    var imports = [];
    var imp = _g268.import;
    var exp = _g268.export;
    var _g270 = 0;
    var _g269 = (imp || []);
    while ((_g270 < length(_g269))) {
      var k = _g269[_g270];
      load_module(k);
      _g270 = (_g270 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g272 = 0;
    var _g271 = (exp || []);
    while ((_g272 < length(_g271))) {
      var k = _g271[_g272];
      setenv(k, {_stash: true, export: true});
      _g272 = (_g272 + 1);
    }
  }, export: true}}];
  _g273 = {};
  exports.boot = _g273;
  _g273.modules = modules;
  _g273.environment = environment;
})();
(function () {
  function rep(str) {
    var _g274 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g277) {
        return([false, _g277]);
      }
    })();
    var _g1 = _g274[0];
    var x = _g274[1];
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
    var _g275 = args;
    while ((i < length(_g275))) {
      var arg = _g275[i];
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
