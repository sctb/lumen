(function () {
  global.nexus = {};
  setenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g7 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g8 = _g7;
      for (k1 in _g8) {
        if (isNaN(parseInt(k1))) {
          var v = _g8[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  };
  getenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g9 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g10 = keys63(_g9);
        if (_g10) {
          return(b[_g10]);
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
      var _g11 = args;
      for (k in _g11) {
        if (isNaN(parseInt(k))) {
          var v = _g11[k];
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
      return(join([[id, rh]], bind(lh, id)));
    } else if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g12 = lh;
      while ((i < length(_g12))) {
        var x = _g12[i];
        bs = join(bs, bind(x, ["at", rh, i]));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, ["sub", rh, length(lh)]));
      }
      var k = undefined;
      var _g13 = lh;
      for (k in _g13) {
        if (isNaN(parseInt(k))) {
          var v = _g13[k];
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
    function rest() {
      if ((target === "js")) {
        return(["unstash", ["sublist", "arguments", length(args1)]]);
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest()]], body)]]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g15 = 0;
      var _g14 = args;
      while ((_g15 < length(_g14))) {
        var arg = _g14[_g15];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g15 = (_g15 + 1);
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
        var _g16 = form[1];
        var t = _g16[0];
        var k = _g16[1];
        var body = sub(form, 2);
        return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g3 = form[0];
        var args = form[1];
        var _g17 = sub(form, 2);
        add(environment, {_scope: true});
        var _g19 = (function () {
          var _g21 = 0;
          var _g20 = args;
          while ((_g21 < length(_g20))) {
            var _g18 = _g20[_g21];
            setenv(_g18, {_stash: true, variable: true});
            _g21 = (_g21 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g17)));
        })();
        drop(environment);
        return(_g19);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g4 = form[0];
        var name = form[1];
        var _g22 = form[2];
        var _g23 = sub(form, 3);
        add(environment, {_scope: true});
        var _g25 = (function () {
          var _g27 = 0;
          var _g26 = _g22;
          while ((_g27 < length(_g26))) {
            var _g24 = _g26[_g27];
            setenv(_g24, {_stash: true, variable: true});
            _g27 = (_g27 + 1);
          }
          return(join([x, name, map42(macroexpand, _g22)], macroexpand(_g23)));
        })();
        drop(environment);
        return(_g25);
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
    var _g28 = form;
    for (k in _g28) {
      if (isNaN(parseInt(k))) {
        var v = _g28[k];
        var _g29 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g29;
      }
    }
    var _g31 = 0;
    var _g30 = form;
    while ((_g31 < length(_g30))) {
      var x = _g30[_g31];
      if (quasisplice63(x, depth)) {
        var _g32 = quasiexpand(x[1]);
        add(xs, _g32);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g31 = (_g31 + 1);
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
  var reserved = {">=": true, "default": true, "*": true, "not": true, "new": true, "=": true, "==": true, "until": true, "switch": true, "delete": true, "and": true, "then": true, "in": true, "while": true, "throw": true, "break": true, "if": true, "or": true, "/": true, "else": true, "-": true, "true": true, "function": true, "elseif": true, "this": true, "for": true, "<": true, "%": true, "void": true, "false": true, "finally": true, "do": true, "nil": true, "typeof": true, "<=": true, "repeat": true, "local": true, "return": true, "try": true, "case": true, "debugger": true, "catch": true, ">": true, "instanceof": true, "end": true, "with": true, "+": true, "continue": true, "var": true};
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
    var _g33 = toplevel;
    for (n in _g33) {
      if (isNaN(parseInt(n))) {
        var b = _g33[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", ["define", m, ["table"]], ["set", ["get", "nexus", ["quote", k]], m]], exports));
    }
  };
  imported = function (k) {
    var imports = [];
    var x = nexus[k];
    if ((x && keys63(x))) {
      var m = make_id();
      add(imports, ["%local", m, ["get", "nexus", ["quote", k]]]);
      var b = undefined;
      var _g34 = x;
      for (b in _g34) {
        if (isNaN(parseInt(b))) {
          var _g5 = _g34[b];
          add(imports, ["%local", b, ["get", m, ["quote", b]]]);
        }
      }
    }
    return(imports);
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
    return(join(["%object"], mapo(function (_g6, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    var _g35 = ["table"];
    _g35.import = quoted(m.import);
    _g35.export = quote_frame(m.export);
    return(_g35);
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g36 = {};
  nexus.utilities = _g36;
  _g36.getenv = getenv;
  _g36.setenv = setenv;
  _g36.bind = bind;
  _g36["macro?"] = macro63;
  _g36.indentation = indentation;
  _g36["valid-id?"] = valid_id63;
  _g36["variable?"] = variable63;
  _g36.macroexpand = macroexpand;
  _g36["stash*"] = stash42;
  _g36["special-form?"] = special_form63;
  _g36["bound?"] = bound63;
  _g36.imported = imported;
  _g36["quote-modules"] = quote_modules;
  _g36["quote-environment"] = quote_environment;
  _g36.exported = exported;
  _g36["module-key"] = module_key;
  _g36["to-id"] = to_id;
  _g36["bind*"] = bind42;
  _g36.quoted = quoted;
  _g36["symbol?"] = symbol63;
  _g36["special?"] = special63;
  _g36["symbol-expansion"] = symbol_expansion;
  _g36["initial-environment"] = initial_environment;
  _g36.quasiexpand = quasiexpand;
  _g36["macro-function"] = macro_function;
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
    var _g38 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g38, upto));
    } else {
      var l = sublist(x, _g38, upto);
      var k = undefined;
      var _g39 = x;
      for (k in _g39) {
        if (isNaN(parseInt(k))) {
          var v = _g39[k];
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
      var _g40 = l1;
      for (k in _g40) {
        if (isNaN(parseInt(k))) {
          var v = _g40[k];
          l[k] = v;
        }
      }
      var _g42 = undefined;
      var _g41 = l2;
      for (_g42 in _g41) {
        if (isNaN(parseInt(_g42))) {
          var v = _g41[_g42];
          l[_g42] = v;
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
    var _g44 = 0;
    var _g43 = l;
    while ((_g44 < length(_g43))) {
      var x = _g43[_g44];
      if (f(x)) {
        add(l1, x);
      }
      _g44 = (_g44 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g46 = 0;
    var _g45 = l;
    while ((_g46 < length(_g45))) {
      var x = _g45[_g46];
      var _g47 = f(x);
      if (_g47) {
        return(_g47);
      }
      _g46 = (_g46 + 1);
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
    var _g49 = 0;
    var _g48 = l;
    while ((_g49 < length(_g48))) {
      var x = _g48[_g49];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g49 = (_g49 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g50 = t;
    for (k in _g50) {
      if (isNaN(parseInt(k))) {
        var v = _g50[k];
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
    var _g51 = t;
    for (k in _g51) {
      if (isNaN(parseInt(k))) {
        var v = _g51[k];
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
    var _g52 = t;
    for (k in _g52) {
      if (isNaN(parseInt(k))) {
        var v = _g52[k];
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
    var _g53 = t;
    for (k1 in _g53) {
      if (isNaN(parseInt(k1))) {
        var v = _g53[k1];
        k = k1;
        break;
      }
    }
    return(k);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g54 = sub(xs, 0);
    return(join(t, _g54));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g55 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g56 = t;
    for (k in _g56) {
      if (isNaN(parseInt(k))) {
        var v = _g56[k];
        if (!(_g55[k])) {
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
    var _g57 = sub(xs, 0);
    if (empty63(_g57)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g57));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g58 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g58));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g59 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g59)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g60 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g60));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g61 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g61)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g62 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g62)));
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
      var _g63 = x;
      for (k in _g63) {
        if (isNaN(parseInt(k))) {
          var v = _g63[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g64 = x1;
      while ((i < length(_g64))) {
        var y = _g64[i];
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
    var _g65 = stash(args);
    return((f.apply)(f, _g65));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g66 = args;
      for (k in _g66) {
        if (isNaN(parseInt(k))) {
          var v = _g66[k];
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
        var _g67 = l;
        for (k in _g67) {
          if (isNaN(parseInt(k))) {
            var v = _g67[k];
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
  _g68 = {};
  nexus.runtime = _g68;
  _g68["list?"] = list63;
  _g68.replicate = replicate;
  _g68["="] = _61;
  _g68["<"] = _60;
  _g68.reduce = reduce;
  _g68["some?"] = some63;
  _g68["to-string"] = to_string;
  _g68.join = join;
  _g68["%message-handler"] = _37message_handler;
  _g68["string-literal?"] = string_literal63;
  _g68[">"] = _62;
  _g68.sub = sub;
  _g68.unstash = unstash;
  _g68[">="] = _6261;
  _g68.hd = hd;
  _g68.mapo = mapo;
  _g68.stash = stash;
  _g68.find = find;
  _g68["composite?"] = composite63;
  _g68["write-file"] = write_file;
  _g68["table?"] = table63;
  _g68["atom?"] = atom63;
  _g68.apply = apply;
  _g68["function?"] = function63;
  _g68["-"] = _;
  _g68["number?"] = number63;
  _g68["id-literal?"] = id_literal63;
  _g68.print = print;
  _g68["string?"] = string63;
  _g68["is?"] = is63;
  _g68["nil?"] = nil63;
  _g68.type = type;
  _g68.add = add;
  _g68.mapt = mapt;
  _g68["parse-number"] = parse_number;
  _g68.write = write;
  _g68["read-file"] = read_file;
  _g68["map*"] = map42;
  _g68["<="] = _6061;
  _g68["%"] = _37;
  _g68["/"] = _47;
  _g68.length = length;
  _g68.char = char;
  _g68.last = last;
  _g68["boolean?"] = boolean63;
  _g68.cat = cat;
  _g68.inner = inner;
  _g68.search = search;
  _g68.code = code;
  _g68.exclude = exclude;
  _g68.tl = tl;
  _g68.extend = extend;
  _g68.sublist = sublist;
  _g68.exit = exit;
  _g68["empty?"] = empty63;
  _g68.map = map;
  _g68.iterate = iterate;
  _g68.keep = keep;
  _g68["keys?"] = keys63;
  _g68.reverse = reverse;
  _g68.drop = drop;
  _g68["+"] = _43;
  _g68["*"] = _42;
  _g68.substring = substring;
  _g68.splice = splice;
  _g68.split = split;
  _g68.pairwise = pairwise;
})();
(function () {
  var delimiters = {";": true, "\n": true, ")": true, "(": true};
  var whitespace = {" ": true, "\n": true, "\t": true};
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
  _g73 = {};
  nexus.reader = _g73;
  _g73["read-from-string"] = read_from_string;
  _g73["read-all"] = read_all;
  _g73.read = read;
  _g73["read-table"] = read_table;
  _g73["make-stream"] = make_stream;
})();
(function () {
  var _g75 = nexus.utilities;
  var setenv = _g75.setenv;
  var bind = _g75.bind;
  var exported = _g75.exported;
  var quoted = _g75.quoted;
  var module_key = _g75["module-key"];
  var symbol63 = _g75["symbol?"];
  var quote_modules = _g75["quote-modules"];
  var macroexpand = _g75.macroexpand;
  var special63 = _g75["special?"];
  var quote_environment = _g75["quote-environment"];
  var macro63 = _g75["macro?"];
  var stash42 = _g75["stash*"];
  var indentation = _g75.indentation;
  var getenv = _g75.getenv;
  var to_id = _g75["to-id"];
  var valid_id63 = _g75["valid-id?"];
  var bound63 = _g75["bound?"];
  var bind42 = _g75["bind*"];
  var symbol_expansion = _g75["symbol-expansion"];
  var initial_environment = _g75["initial-environment"];
  var special_form63 = _g75["special-form?"];
  var quasiexpand = _g75.quasiexpand;
  var variable63 = _g75["variable?"];
  var macro_function = _g75["macro-function"];
  var imported = _g75.imported;
  var _g76 = nexus.runtime;
  var list63 = _g76["list?"];
  var replicate = _g76.replicate;
  var unstash = _g76.unstash;
  var _61 = _g76["="];
  var _60 = _g76["<"];
  var _47 = _g76["/"];
  var some63 = _g76["some?"];
  var to_string = _g76["to-string"];
  var join = _g76.join;
  var string_literal63 = _g76["string-literal?"];
  var _62 = _g76[">"];
  var sub = _g76.sub;
  var sublist = _g76.sublist;
  var _6261 = _g76[">="];
  var hd = _g76.hd;
  var _6061 = _g76["<="];
  var find = _g76.find;
  var number63 = _g76["number?"];
  var code = _g76.code;
  var string63 = _g76["string?"];
  var search = _g76.search;
  var apply = _g76.apply;
  var composite63 = _g76["composite?"];
  var id_literal63 = _g76["id-literal?"];
  var substring = _g76.substring;
  var stash = _g76.stash;
  var table63 = _g76["table?"];
  var add = _g76.add;
  var parse_number = _g76["parse-number"];
  var write = _g76.write;
  var nil63 = _g76["nil?"];
  var mapt = _g76.mapt;
  var char = _g76.char;
  var last = _g76.last;
  var boolean63 = _g76["boolean?"];
  var inner = _g76.inner;
  var tl = _g76.tl;
  var exit = _g76.exit;
  var function63 = _g76["function?"];
  var drop = _g76.drop;
  var map = _g76.map;
  var _37message_handler = _g76["%message-handler"];
  var reverse = _g76.reverse;
  var reduce = _g76.reduce;
  var split = _g76.split;
  var map42 = _g76["map*"];
  var atom63 = _g76["atom?"];
  var cat = _g76.cat;
  var extend = _g76.extend;
  var keys63 = _g76["keys?"];
  var read_file = _g76["read-file"];
  var _37 = _g76["%"];
  var keep = _g76.keep;
  var _ = _g76["-"];
  var write_file = _g76["write-file"];
  var _43 = _g76["+"];
  var _42 = _g76["*"];
  var mapo = _g76.mapo;
  var splice = _g76.splice;
  var empty63 = _g76["empty?"];
  var length = _g76.length;
  var is63 = _g76["is?"];
  var iterate = _g76.iterate;
  var pairwise = _g76.pairwise;
  var exclude = _g76.exclude;
  var _g77 = nexus.reader;
  var read_all = _g77["read-all"];
  var make_stream = _g77["make-stream"];
  var read_from_string = _g77["read-from-string"];
  var read = _g77.read;
  var read_table = _g77["read-table"];
  var infix = {js: {"~=": "!=", "=": "===", "or": "||", cat: "+", "and": "&&"}, common: {">=": true, "<=": true, "-": true, "<": true, "+": true, "*": true, "/": true, ">": true, "%": true}, lua: {"~=": true, "=": "==", cat: "..", "or": true, "and": true}};
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
    var _g78 = args;
    while ((i < length(_g78))) {
      var arg = _g78[i];
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
    var _g79 = unstash(sublist(arguments, 1));
    var tail63 = _g79["tail?"];
    var str = "";
    var i = 0;
    var _g80 = forms;
    while ((i < length(_g80))) {
      var x = _g80[i];
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
  function compile_infix(_g81) {
    var op = _g81[0];
    var args = sub(_g81, 1);
    var str = "(";
    var _g82 = getop(op);
    var i = 0;
    var _g83 = args;
    while ((i < length(_g83))) {
      var arg = _g83[i];
      if (((_g82 === "-") && (length(args) === 1))) {
        str = (str + _g82 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g82 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g84 = (function () {
      indent_level = (indent_level + 1);
      var _g85 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g85);
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
      return((ind + "if (" + cond1 + ") {\n" + _g84 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g84 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g84 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g84 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g84 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g84 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g86 = unstash(sublist(arguments, 2));
    var prefix = _g86.prefix;
    var name = _g86.name;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g87 = (prefix || "");
    var _g88 = compile_args(args);
    var _g89 = (function () {
      indent_level = (indent_level + 1);
      var _g90 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g90);
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
      return(("function " + id + _g88 + " {\n" + _g89 + ind + "}" + tr));
    } else {
      return((_g87 + "function " + id + _g88 + "\n" + _g89 + ind + tr));
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
    var _g91 = getenv(hd(form));
    var stmt = _g91.stmt;
    var self_tr63 = _g91.tr;
    var special = _g91.special;
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
    var _g92 = unstash(sublist(arguments, 1));
    var tail63 = _g92["tail?"];
    var stmt63 = _g92["stmt?"];
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
      var _g93 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g93 + tr));
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
    var _g94 = macroexpand(body);
    var epilog = macroexpand(exported());
    return([join(["%function", []], join(_g94, [epilog]))]);
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
    var _g104 = toplevel;
    for (name in _g104) {
      if (isNaN(parseInt(name))) {
        var binding = _g104[name];
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
    var _g105 = m.export;
    for (k in _g105) {
      if (isNaN(parseInt(k))) {
        var v = _g105[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  _g106 = {};
  nexus.compiler = _g106;
  _g106.eval = eval;
  _g106["compile-branch"] = compile_branch;
  _g106.compile = compile;
  _g106["compile-body"] = compile_body;
  _g106["load-module"] = load_module;
  _g106["compile-special"] = compile_special;
  _g106["compile-function"] = compile_function;
  _g106["compile-call"] = compile_call;
  _g106["open-module"] = open_module;
  _g106["in-module"] = in_module;
})();
(function () {
  var _g109 = nexus.utilities;
  var setenv = _g109.setenv;
  var bind = _g109.bind;
  var exported = _g109.exported;
  var quoted = _g109.quoted;
  var module_key = _g109["module-key"];
  var symbol63 = _g109["symbol?"];
  var quote_modules = _g109["quote-modules"];
  var macroexpand = _g109.macroexpand;
  var special63 = _g109["special?"];
  var quote_environment = _g109["quote-environment"];
  var macro63 = _g109["macro?"];
  var stash42 = _g109["stash*"];
  var indentation = _g109.indentation;
  var getenv = _g109.getenv;
  var to_id = _g109["to-id"];
  var valid_id63 = _g109["valid-id?"];
  var bound63 = _g109["bound?"];
  var bind42 = _g109["bind*"];
  var symbol_expansion = _g109["symbol-expansion"];
  var initial_environment = _g109["initial-environment"];
  var special_form63 = _g109["special-form?"];
  var quasiexpand = _g109.quasiexpand;
  var variable63 = _g109["variable?"];
  var macro_function = _g109["macro-function"];
  var imported = _g109.imported;
  var _g110 = nexus.compiler;
  var compile_function = _g110["compile-function"];
  var compile_body = _g110["compile-body"];
  var compile = _g110.compile;
  var compile_special = _g110["compile-special"];
  var in_module = _g110["in-module"];
  var open_module = _g110["open-module"];
  var load_module = _g110["load-module"];
  var compile_call = _g110["compile-call"];
  var eval = _g110.eval;
  var compile_branch = _g110["compile-branch"];
})();
(function () {
  var _g166 = nexus.utilities;
  var setenv = _g166.setenv;
  var bind = _g166.bind;
  var exported = _g166.exported;
  var quoted = _g166.quoted;
  var module_key = _g166["module-key"];
  var symbol63 = _g166["symbol?"];
  var quote_modules = _g166["quote-modules"];
  var macroexpand = _g166.macroexpand;
  var special63 = _g166["special?"];
  var quote_environment = _g166["quote-environment"];
  var macro63 = _g166["macro?"];
  var stash42 = _g166["stash*"];
  var indentation = _g166.indentation;
  var getenv = _g166.getenv;
  var to_id = _g166["to-id"];
  var valid_id63 = _g166["valid-id?"];
  var bound63 = _g166["bound?"];
  var bind42 = _g166["bind*"];
  var symbol_expansion = _g166["symbol-expansion"];
  var initial_environment = _g166["initial-environment"];
  var special_form63 = _g166["special-form?"];
  var quasiexpand = _g166.quasiexpand;
  var variable63 = _g166["variable?"];
  var macro_function = _g166["macro-function"];
  var imported = _g166.imported;
  var _g167 = nexus.runtime;
  var list63 = _g167["list?"];
  var replicate = _g167.replicate;
  var unstash = _g167.unstash;
  var _61 = _g167["="];
  var _60 = _g167["<"];
  var _47 = _g167["/"];
  var some63 = _g167["some?"];
  var to_string = _g167["to-string"];
  var join = _g167.join;
  var string_literal63 = _g167["string-literal?"];
  var _62 = _g167[">"];
  var sub = _g167.sub;
  var sublist = _g167.sublist;
  var _6261 = _g167[">="];
  var hd = _g167.hd;
  var _6061 = _g167["<="];
  var find = _g167.find;
  var number63 = _g167["number?"];
  var code = _g167.code;
  var string63 = _g167["string?"];
  var search = _g167.search;
  var apply = _g167.apply;
  var composite63 = _g167["composite?"];
  var id_literal63 = _g167["id-literal?"];
  var substring = _g167.substring;
  var stash = _g167.stash;
  var table63 = _g167["table?"];
  var add = _g167.add;
  var parse_number = _g167["parse-number"];
  var write = _g167.write;
  var nil63 = _g167["nil?"];
  var mapt = _g167.mapt;
  var char = _g167.char;
  var last = _g167.last;
  var boolean63 = _g167["boolean?"];
  var inner = _g167.inner;
  var tl = _g167.tl;
  var exit = _g167.exit;
  var function63 = _g167["function?"];
  var drop = _g167.drop;
  var map = _g167.map;
  var _37message_handler = _g167["%message-handler"];
  var reverse = _g167.reverse;
  var reduce = _g167.reduce;
  var split = _g167.split;
  var map42 = _g167["map*"];
  var atom63 = _g167["atom?"];
  var cat = _g167.cat;
  var extend = _g167.extend;
  var keys63 = _g167["keys?"];
  var read_file = _g167["read-file"];
  var _37 = _g167["%"];
  var keep = _g167.keep;
  var _ = _g167["-"];
  var write_file = _g167["write-file"];
  var _43 = _g167["+"];
  var _42 = _g167["*"];
  var mapo = _g167.mapo;
  var splice = _g167.splice;
  var empty63 = _g167["empty?"];
  var length = _g167.length;
  var is63 = _g167["is?"];
  var iterate = _g167.iterate;
  var pairwise = _g167.pairwise;
  var exclude = _g167.exclude;
  global.target = "js";
})();
(function () {
  var _g240 = nexus.utilities;
  var setenv = _g240.setenv;
  var bind = _g240.bind;
  var exported = _g240.exported;
  var quoted = _g240.quoted;
  var module_key = _g240["module-key"];
  var symbol63 = _g240["symbol?"];
  var quote_modules = _g240["quote-modules"];
  var macroexpand = _g240.macroexpand;
  var special63 = _g240["special?"];
  var quote_environment = _g240["quote-environment"];
  var macro63 = _g240["macro?"];
  var stash42 = _g240["stash*"];
  var indentation = _g240.indentation;
  var getenv = _g240.getenv;
  var to_id = _g240["to-id"];
  var valid_id63 = _g240["valid-id?"];
  var bound63 = _g240["bound?"];
  var bind42 = _g240["bind*"];
  var symbol_expansion = _g240["symbol-expansion"];
  var initial_environment = _g240["initial-environment"];
  var special_form63 = _g240["special-form?"];
  var quasiexpand = _g240.quasiexpand;
  var variable63 = _g240["variable?"];
  var macro_function = _g240["macro-function"];
  var imported = _g240.imported;
  modules = {runtime: {import: ["special", "core"], export: {"list?": {module: "runtime", variable: true, export: true}, replicate: {module: "runtime", variable: true, export: true}, unstash: {module: "runtime", variable: true, export: true}, "=": {module: "runtime", variable: true, export: true}, "<": {module: "runtime", variable: true, export: true}, "/": {module: "runtime", variable: true, export: true}, "some?": {module: "runtime", variable: true, export: true}, "to-string": {module: "runtime", variable: true, export: true}, join: {module: "runtime", variable: true, export: true}, "string-literal?": {module: "runtime", variable: true, export: true}, ">": {module: "runtime", variable: true, export: true}, sub: {module: "runtime", variable: true, export: true}, sublist: {module: "runtime", variable: true, export: true}, ">=": {module: "runtime", variable: true, export: true}, hd: {module: "runtime", variable: true, export: true}, mapo: {module: "runtime", variable: true, export: true}, find: {module: "runtime", variable: true, export: true}, "number?": {module: "runtime", variable: true, export: true}, code: {module: "runtime", variable: true, export: true}, "string?": {module: "runtime", variable: true, export: true}, search: {module: "runtime", variable: true, export: true}, apply: {module: "runtime", variable: true, export: true}, "%message-handler": {module: "runtime", variable: true, export: true}, "id-literal?": {module: "runtime", variable: true, export: true}, print: {module: "runtime", variable: true, export: true}, exclude: {module: "runtime", variable: true, export: true}, stash: {module: "runtime", variable: true, export: true}, "table?": {module: "runtime", variable: true, export: true}, add: {module: "runtime", variable: true, export: true}, "parse-number": {module: "runtime", variable: true, export: true}, write: {module: "runtime", variable: true, export: true}, reverse: {module: "runtime", variable: true, export: true}, "map*": {module: "runtime", variable: true, export: true}, "atom?": {module: "runtime", variable: true, export: true}, last: {module: "runtime", variable: true, export: true}, "boolean?": {module: "runtime", variable: true, export: true}, inner: {module: "runtime", variable: true, export: true}, tl: {module: "runtime", variable: true, export: true}, exit: {module: "runtime", variable: true, export: true}, "function?": {module: "runtime", variable: true, export: true}, "empty?": {module: "runtime", variable: true, export: true}, "%": {module: "runtime", variable: true, export: true}, "read-file": {module: "runtime", variable: true, export: true}, split: {module: "runtime", variable: true, export: true}, extend: {module: "runtime", variable: true, export: true}, substring: {module: "runtime", variable: true, export: true}, "nil?": {module: "runtime", variable: true, export: true}, reduce: {module: "runtime", variable: true, export: true}, "<=": {module: "runtime", variable: true, export: true}, "write-file": {module: "runtime", variable: true, export: true}, mapt: {module: "runtime", variable: true, export: true}, "keys?": {module: "runtime", variable: true, export: true}, type: {module: "runtime", variable: true, export: true}, drop: {module: "runtime", variable: true, export: true}, char: {module: "runtime", variable: true, export: true}, "-": {module: "runtime", variable: true, export: true}, keep: {module: "runtime", variable: true, export: true}, "+": {module: "runtime", variable: true, export: true}, "*": {module: "runtime", variable: true, export: true}, map: {module: "runtime", variable: true, export: true}, splice: {module: "runtime", variable: true, export: true}, length: {module: "runtime", variable: true, export: true}, cat: {module: "runtime", variable: true, export: true}, "is?": {module: "runtime", variable: true, export: true}, iterate: {module: "runtime", variable: true, export: true}, pairwise: {module: "runtime", variable: true, export: true}, "composite?": {module: "runtime", variable: true, export: true}}}, boot: {import: ["utilities", "special", "core"], export: {}}, lib: {import: ["core", "special"], export: {}}, reader: {import: ["special", "core"], export: {"read-all": {module: "reader", variable: true, export: true}, "make-stream": {module: "reader", variable: true, export: true}, "define-reader": {module: "reader", macro: function (_g241) {
    var char = _g241[0];
    var stream = _g241[1];
    var body = unstash(sublist(arguments, 1));
    var _g242 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g242)]);
  }, export: true}, "read-from-string": {module: "reader", variable: true, export: true}, read: {module: "reader", variable: true, export: true}, "read-table": {module: "reader", variable: true, export: true}}}, core: {import: ["utilities", "runtime", "special", "core"], export: {"define-local": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g243 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g243))) {
      var _g244 = bind42(x, _g243);
      var args = _g244[0];
      var _g245 = _g244[1];
      return(join(["%local-function", name, args], _g245));
    } else {
      return(["%local", name, x]);
    }
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
  }, export: true}, inc: {module: "core", macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, let: {module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g247 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g248) {
      var lh = _g248[0];
      var rh = _g248[1];
      var _g250 = 0;
      var _g249 = bind(lh, rh);
      while ((_g250 < length(_g249))) {
        var _g251 = _g249[_g250];
        var id = _g251[0];
        var val = _g251[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g250 = (_g250 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g247)])));
  }, export: true}, quasiquote: {module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, pr: {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g252 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g252)]);
  }, export: true}, fn: {module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g253 = sub(body, 0);
    var _g254 = bind42(args, _g253);
    var _g255 = _g254[0];
    var _g256 = _g254[1];
    return(join(["%function", _g255], _g256));
  }, export: true}, "with-frame": {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g257 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(["do", ["add", "environment", (function () {
      var _g258 = ["table"];
      _g258._scope = scope;
      return(_g258);
    })()], ["let", [x, join(["do"], _g257)], ["drop", "environment"], x]]);
  }, export: true}, "with-bindings": {module: "core", macro: function (_g259) {
    var names = _g259[0];
    var body = unstash(sublist(arguments, 1));
    var _g260 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g261 = ["with-frame", ["across", [names, x], (function () {
        var _g262 = ["setenv", x];
        _g262.variable = true;
        return(_g262);
      })()]];
      _g261.scope = true;
      return(_g261);
    })(), _g260));
  }, export: true}, "define-global": {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g263 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g263))) {
      var _g264 = bind42(x, _g263);
      var args = _g264[0];
      var _g265 = _g264[1];
      return(join(["%global-function", name, args], _g265));
    } else if ((target === "js")) {
      return(["set", ["get", "global", ["quote", to_id(name)]], x]);
    } else {
      return(["set", name, x]);
    }
  }, export: true}, "join!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g266 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g266)]);
  }, export: true}, across: {module: "core", macro: function (_g267) {
    var l = _g267[0];
    var v = _g267[1];
    var i = _g267[2];
    var start = _g267[3];
    var body = unstash(sublist(arguments, 1));
    var _g268 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g268, [["inc", i]]))]]);
  }, export: true}, table: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g165, x) {
      return(x);
    }, body)));
  }, export: true}, language: {module: "core", macro: function () {
    return(["quote", target]);
  }, export: true}, guard: {module: "core", macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, "define-special": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g269 = sub(body, 0);
    var form = join(["fn", args], _g269);
    var keys = sub(_g269, length(_g269));
    eval(join((function () {
      var _g270 = ["setenv", ["quote", name]];
      _g270.form = ["quote", form];
      _g270.special = form;
      return(_g270);
    })(), keys));
    return(undefined);
  }, export: true}, at: {module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = ["+", i, 1];
    }
    return(["get", l, i]);
  }, export: true}, "let-symbol": {module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g271 = sub(body, 0);
    add(environment, {});
    var _g272 = (function () {
      map(function (_g273) {
        var name = _g273[0];
        var exp = _g273[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g271)));
    })();
    drop(environment);
    return(_g272);
  }, export: true}, "let-macro": {module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g274 = sub(body, 0);
    add(environment, {});
    var _g275 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g274)));
    })();
    drop(environment);
    return(_g275);
  }, export: true}, "define-symbol": {module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, define: {module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g276 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g276))) {
      var _g277 = bind42(x, _g276);
      var args = _g277[0];
      var _g278 = _g277[1];
      return(join(["%global-function", name, args], _g278));
    } else {
      return(["set", name, x]);
    }
  }, export: true}, "define-macro": {module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g279 = sub(body, 0);
    var form = join(["fn", args], _g279);
    eval((function () {
      var _g280 = ["setenv", ["quote", name]];
      _g280.macro = form;
      _g280.form = ["quote", form];
      return(_g280);
    })());
    return(undefined);
  }, export: true}, list: {module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g281 = body;
      for (k in _g281) {
        if (isNaN(parseInt(k))) {
          var v = _g281[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "join*": {module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, each: {module: "core", macro: function (_g282) {
    var t = _g282[0];
    var k = _g282[1];
    var v = _g282[2];
    var body = unstash(sublist(arguments, 1));
    var _g283 = sub(body, 0);
    var t1 = make_id();
    return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
      var _g284 = ["target"];
      _g284.js = ["isNaN", ["parseInt", k]];
      _g284.lua = ["not", ["number?", k]];
      return(_g284);
    })(), join(["let", [v, ["get", t1, k]]], _g283)]]]);
  }, export: true}, dec: {module: "core", macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, target: {module: "core", global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, export: true}, "set-of": {module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g286 = 0;
    var _g285 = elements;
    while ((_g286 < length(_g285))) {
      var e = _g285[_g286];
      l[e] = true;
      _g286 = (_g286 + 1);
    }
    return(join(["table"], l));
  }, export: true}, quote: {module: "core", macro: function (form) {
    return(quoted(form));
  }, export: true}, "cat!": {module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g287 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g287)]);
  }, export: true}}}, utilities: {import: ["special", "core"], export: {setenv: {module: "utilities", variable: true, export: true}, bind: {module: "utilities", variable: true, export: true}, "macro-function": {module: "utilities", variable: true, export: true}, "bound?": {module: "utilities", variable: true, export: true}, "indent-level": {module: "utilities", global: true, export: true}, "quote-environment": {module: "utilities", variable: true, export: true}, exported: {module: "utilities", variable: true, export: true}, "symbol-expansion": {module: "utilities", variable: true, export: true}, "module-key": {module: "utilities", variable: true, export: true}, "macro?": {module: "utilities", variable: true, export: true}, "symbol?": {module: "utilities", variable: true, export: true}, macroexpand: {module: "utilities", variable: true, export: true}, "special?": {module: "utilities", variable: true, export: true}, quoted: {module: "utilities", variable: true, export: true}, "make-id": {}, "stash*": {module: "utilities", variable: true, export: true}, "quote-modules": {module: "utilities", variable: true, export: true}, getenv: {module: "utilities", variable: true, export: true}, "with-indent": {module: "utilities", macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, "valid-id?": {module: "utilities", variable: true, export: true}, "to-id": {module: "utilities", variable: true, export: true}, indentation: {module: "utilities", variable: true, export: true}, "bind*": {module: "utilities", variable: true, export: true}, "initial-environment": {module: "utilities", variable: true, export: true}, "special-form?": {module: "utilities", variable: true, export: true}, quasiexpand: {module: "utilities", variable: true, export: true}, nexus: {module: "utilities", global: true, export: true}, "variable?": {module: "utilities", variable: true, export: true}, imported: {module: "utilities", variable: true, export: true}}}, compiler: {import: ["utilities", "runtime", "special", "core", "reader"], export: {"current-module": {module: "compiler", global: true, export: true}, "compile-body": {module: "compiler", variable: true, export: true}, compile: {module: "compiler", variable: true, export: true}, "compile-special": {module: "compiler", variable: true, export: true}, "in-module": {module: "compiler", variable: true, export: true}, "open-module": {module: "compiler", variable: true, export: true}, "load-module": {module: "compiler", variable: true, export: true}, "compile-function": {module: "compiler", variable: true, export: true}, "compile-call": {module: "compiler", variable: true, export: true}, eval: {module: "compiler", variable: true, export: true}, "compile-branch": {module: "compiler", variable: true, export: true}, "define-module": {module: "compiler", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g288 = sub(body, 0);
    var imports = [];
    var imp = _g288.import;
    var exp = _g288.export;
    var _g290 = 0;
    var _g289 = (imp || []);
    while ((_g290 < length(_g289))) {
      var k = _g289[_g290];
      load_module(k);
      imports = join(imports, imported(k));
      _g290 = (_g290 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g292 = 0;
    var _g291 = (exp || []);
    while ((_g292 < length(_g291))) {
      var k = _g291[_g292];
      setenv(k, {_stash: true, export: true});
      _g292 = (_g292 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}}, special: {import: ["utilities", "special", "core", "compiler"], export: {"while": {module: "special", stmt: true, tr: true, export: true, special: function (_g293) {
    var condition = _g293[0];
    var body = sub(_g293, 1);
    var _g294 = compile(condition);
    var _g295 = (function () {
      indent_level = (indent_level + 1);
      var _g296 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g296);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g294 + ") {\n" + _g295 + ind + "}\n"));
    } else {
      return((ind + "while " + _g294 + " do\n" + _g295 + ind + "end\n"));
    }
  }}, "%global-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g297) {
    var name = _g297[0];
    var args = _g297[1];
    var body = sub(_g297, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
    }
  }}, "not": {module: "special", export: true, special: function (_g298) {
    var x = _g298[0];
    var _g299 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g299 + ")"));
  }}, "%local": {module: "special", stmt: true, special: function (_g300) {
    var name = _g300[0];
    var value = _g300[1];
    var id = compile(name);
    var _g301 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g301));
  }, export: true}, "if": {module: "special", stmt: true, tr: true, export: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g302 = form;
    while ((i < length(_g302))) {
      var condition = _g302[i];
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
  }}, "get": {module: "special", export: true, special: function (_g303) {
    var t = _g303[0];
    var k = _g303[1];
    var _g304 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g304, 0) === "{"))) {
      _g304 = ("(" + _g304 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g304 + "." + inner(k)));
    } else {
      return((_g304 + "[" + k1 + "]"));
    }
  }}, "set": {module: "special", stmt: true, special: function (_g305) {
    var lh = _g305[0];
    var rh = _g305[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true}, "break": {module: "special", stmt: true, special: function (_g108) {
    return((indentation() + "break"));
  }, export: true}, "%object": {module: "special", export: true, special: function (forms) {
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
    var _g306 = pairs;
    while ((i < length(_g306))) {
      var _g307 = _g306[i];
      var k = _g307[0];
      var v = _g307[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g308 = compile(v);
      var _g309 = (function () {
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
      str = (str + _g309 + sep + _g308);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}, "do": {module: "special", stmt: true, tr: true, export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "%local-function": {module: "special", stmt: true, tr: true, export: true, special: function (_g310) {
    var name = _g310[0];
    var args = _g310[1];
    var body = sub(_g310, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }}, "error": {module: "special", stmt: true, special: function (_g311) {
    var x = _g311[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, export: true}, "%function": {module: "special", export: true, special: function (_g312) {
    var args = _g312[0];
    var body = sub(_g312, 1);
    return(compile_function(args, body));
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
  }}, "%try": {module: "special", stmt: true, tr: true, export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g314 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g314);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, e]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g315 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g315);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "return": {module: "special", stmt: true, special: function (_g316) {
    var x = _g316[0];
    var _g317 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + _g317));
  }, export: true}, "%for": {module: "special", stmt: true, tr: true, export: true, special: function (_g318) {
    var _g319 = _g318[0];
    var t = _g319[0];
    var k = _g319[1];
    var body = sub(_g318, 1);
    var _g320 = compile(t);
    var ind = indentation();
    var _g321 = (function () {
      indent_level = (indent_level + 1);
      var _g322 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g322);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g320 + " do\n" + _g321 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g320 + ") {\n" + _g321 + ind + "}\n"));
    }
  }}}}};
  environment = [{"define-module": {module: "compiler", macro: function (spec) {
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
      imports = join(imports, imported(k));
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
  }, export: true}}];
  _g328 = {};
  nexus.boot = _g328;
  _g328.modules = modules;
  _g328.environment = environment;
})();
(function () {
  var _g37 = nexus.utilities;
  var setenv = _g37.setenv;
  var bind = _g37.bind;
  var exported = _g37.exported;
  var quoted = _g37.quoted;
  var module_key = _g37["module-key"];
  var symbol63 = _g37["symbol?"];
  var quote_modules = _g37["quote-modules"];
  var macroexpand = _g37.macroexpand;
  var special63 = _g37["special?"];
  var quote_environment = _g37["quote-environment"];
  var macro63 = _g37["macro?"];
  var stash42 = _g37["stash*"];
  var indentation = _g37.indentation;
  var getenv = _g37.getenv;
  var to_id = _g37["to-id"];
  var valid_id63 = _g37["valid-id?"];
  var bound63 = _g37["bound?"];
  var bind42 = _g37["bind*"];
  var symbol_expansion = _g37["symbol-expansion"];
  var initial_environment = _g37["initial-environment"];
  var special_form63 = _g37["special-form?"];
  var quasiexpand = _g37.quasiexpand;
  var variable63 = _g37["variable?"];
  var macro_function = _g37["macro-function"];
  var imported = _g37.imported;
  var _g69 = nexus.runtime;
  var list63 = _g69["list?"];
  var replicate = _g69.replicate;
  var unstash = _g69.unstash;
  var _61 = _g69["="];
  var _60 = _g69["<"];
  var _47 = _g69["/"];
  var some63 = _g69["some?"];
  var to_string = _g69["to-string"];
  var join = _g69.join;
  var string_literal63 = _g69["string-literal?"];
  var _62 = _g69[">"];
  var sub = _g69.sub;
  var sublist = _g69.sublist;
  var _6261 = _g69[">="];
  var hd = _g69.hd;
  var _6061 = _g69["<="];
  var find = _g69.find;
  var number63 = _g69["number?"];
  var code = _g69.code;
  var string63 = _g69["string?"];
  var search = _g69.search;
  var apply = _g69.apply;
  var composite63 = _g69["composite?"];
  var id_literal63 = _g69["id-literal?"];
  var substring = _g69.substring;
  var stash = _g69.stash;
  var table63 = _g69["table?"];
  var add = _g69.add;
  var parse_number = _g69["parse-number"];
  var write = _g69.write;
  var nil63 = _g69["nil?"];
  var mapt = _g69.mapt;
  var char = _g69.char;
  var last = _g69.last;
  var boolean63 = _g69["boolean?"];
  var inner = _g69.inner;
  var tl = _g69.tl;
  var exit = _g69.exit;
  var function63 = _g69["function?"];
  var drop = _g69.drop;
  var map = _g69.map;
  var _37message_handler = _g69["%message-handler"];
  var reverse = _g69.reverse;
  var reduce = _g69.reduce;
  var split = _g69.split;
  var map42 = _g69["map*"];
  var atom63 = _g69["atom?"];
  var cat = _g69.cat;
  var extend = _g69.extend;
  var keys63 = _g69["keys?"];
  var read_file = _g69["read-file"];
  var _37 = _g69["%"];
  var keep = _g69.keep;
  var _ = _g69["-"];
  var write_file = _g69["write-file"];
  var _43 = _g69["+"];
  var _42 = _g69["*"];
  var mapo = _g69.mapo;
  var splice = _g69.splice;
  var empty63 = _g69["empty?"];
  var length = _g69.length;
  var is63 = _g69["is?"];
  var iterate = _g69.iterate;
  var pairwise = _g69.pairwise;
  var exclude = _g69.exclude;
  var _g74 = nexus.reader;
  var read_all = _g74["read-all"];
  var make_stream = _g74["make-stream"];
  var read_from_string = _g74["read-from-string"];
  var read = _g74.read;
  var read_table = _g74["read-table"];
  var _g107 = nexus.compiler;
  var compile_function = _g107["compile-function"];
  var compile_body = _g107["compile-body"];
  var compile = _g107.compile;
  var compile_special = _g107["compile-special"];
  var in_module = _g107["in-module"];
  var open_module = _g107["open-module"];
  var load_module = _g107["load-module"];
  var compile_call = _g107["compile-call"];
  var eval = _g107.eval;
  var compile_branch = _g107["compile-branch"];
  var _g329 = nexus.boot;
  var modules = _g329.modules;
  var environment = _g329.environment;
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
  return(main());
})();
