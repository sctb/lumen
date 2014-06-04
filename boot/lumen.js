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
      return(join([join([id, rh])], bind(lh, id)));
    } else if (atom63(lh)) {
      return(join([join([lh, rh])]));
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g12 = lh;
      while ((i < length(_g12))) {
        var x = _g12[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
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
        var _g2 = form[0];
        var _g16 = form[1];
        var t = _g16[0];
        var k = _g16[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
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
    var _g33 = toplevel;
    for (n in _g33) {
      if (isNaN(parseInt(n))) {
        var b = _g33[n];
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
      var _g34 = x;
      for (b in _g34) {
        if (isNaN(parseInt(b))) {
          var _g5 = _g34[b];
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
    return(join(["%object"], mapo(function (_g6, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    return(join((function () {
      var _g35 = ["table"];
      _g35.import = quoted(m.import);
      _g35.export = quote_frame(m.export);
      return(_g35);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g36 = {};
  nexus.utilities = _g36;
  _g36.setenv = setenv;
  _g36.getenv = getenv;
  _g36["macro-function"] = macro_function;
  _g36["macro?"] = macro63;
  _g36["special?"] = special63;
  _g36["special-form?"] = special_form63;
  _g36["symbol-expansion"] = symbol_expansion;
  _g36["symbol?"] = symbol63;
  _g36["variable?"] = variable63;
  _g36["bound?"] = bound63;
  _g36.quoted = quoted;
  _g36["stash*"] = stash42;
  _g36.bind = bind;
  _g36["bind*"] = bind42;
  _g36.quasiexpand = quasiexpand;
  _g36.macroexpand = macroexpand;
  _g36.indentation = indentation;
  _g36["valid-id?"] = valid_id63;
  _g36["to-id"] = to_id;
  _g36["module-key"] = module_key;
  _g36.imported = imported;
  _g36.exported = exported;
  _g36["quote-environment"] = quote_environment;
  _g36["quote-modules"] = quote_modules;
  _g36["initial-environment"] = initial_environment;
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
  _g68.length = length;
  _g68["empty?"] = empty63;
  _g68["some?"] = some63;
  _g68.substring = substring;
  _g68.sublist = sublist;
  _g68.sub = sub;
  _g68.inner = inner;
  _g68.hd = hd;
  _g68.tl = tl;
  _g68.add = add;
  _g68.drop = drop;
  _g68.last = last;
  _g68.reverse = reverse;
  _g68.join = join;
  _g68.reduce = reduce;
  _g68.keep = keep;
  _g68.find = find;
  _g68.pairwise = pairwise;
  _g68.iterate = iterate;
  _g68.replicate = replicate;
  _g68.splice = splice;
  _g68.map = map;
  _g68["map*"] = map42;
  _g68.mapt = mapt;
  _g68.mapo = mapo;
  _g68["keys?"] = keys63;
  _g68.extend = extend;
  _g68.exclude = exclude;
  _g68.char = char;
  _g68.code = code;
  _g68.search = search;
  _g68.split = split;
  _g68.cat = cat;
  _g68["+"] = _43;
  _g68["-"] = _;
  _g68["*"] = _42;
  _g68["/"] = _47;
  _g68["%"] = _37;
  _g68[">"] = _62;
  _g68["<"] = _60;
  _g68["="] = _61;
  _g68[">="] = _6261;
  _g68["<="] = _6061;
  _g68["read-file"] = read_file;
  _g68["write-file"] = write_file;
  _g68.print = print;
  _g68.write = write;
  _g68.exit = exit;
  _g68.type = type;
  _g68["nil?"] = nil63;
  _g68["is?"] = is63;
  _g68["string?"] = string63;
  _g68["string-literal?"] = string_literal63;
  _g68["id-literal?"] = id_literal63;
  _g68["number?"] = number63;
  _g68["boolean?"] = boolean63;
  _g68["function?"] = function63;
  _g68["composite?"] = composite63;
  _g68["atom?"] = atom63;
  _g68["table?"] = table63;
  _g68["list?"] = list63;
  _g68["parse-number"] = parse_number;
  _g68["to-string"] = to_string;
  _g68.apply = apply;
  _g68.stash = stash;
  _g68.unstash = unstash;
  _g68["%message-handler"] = _37message_handler;
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
  _g73 = {};
  nexus.reader = _g73;
  _g73["make-stream"] = make_stream;
  _g73["read-table"] = read_table;
  _g73.read = read;
  _g73["read-all"] = read_all;
  _g73["read-from-string"] = read_from_string;
})();
(function () {
  var _g75 = nexus.utilities;
  var setenv = _g75.setenv;
  var getenv = _g75.getenv;
  var macro_function = _g75["macro-function"];
  var macro63 = _g75["macro?"];
  var special63 = _g75["special?"];
  var special_form63 = _g75["special-form?"];
  var symbol_expansion = _g75["symbol-expansion"];
  var symbol63 = _g75["symbol?"];
  var variable63 = _g75["variable?"];
  var bound63 = _g75["bound?"];
  var quoted = _g75.quoted;
  var stash42 = _g75["stash*"];
  var bind = _g75.bind;
  var bind42 = _g75["bind*"];
  var quasiexpand = _g75.quasiexpand;
  var macroexpand = _g75.macroexpand;
  var indentation = _g75.indentation;
  var valid_id63 = _g75["valid-id?"];
  var to_id = _g75["to-id"];
  var module_key = _g75["module-key"];
  var imported = _g75.imported;
  var exported = _g75.exported;
  var quote_environment = _g75["quote-environment"];
  var quote_modules = _g75["quote-modules"];
  var initial_environment = _g75["initial-environment"];
  var _g76 = nexus.runtime;
  var length = _g76.length;
  var empty63 = _g76["empty?"];
  var some63 = _g76["some?"];
  var substring = _g76.substring;
  var sublist = _g76.sublist;
  var sub = _g76.sub;
  var inner = _g76.inner;
  var hd = _g76.hd;
  var tl = _g76.tl;
  var add = _g76.add;
  var drop = _g76.drop;
  var last = _g76.last;
  var reverse = _g76.reverse;
  var join = _g76.join;
  var reduce = _g76.reduce;
  var keep = _g76.keep;
  var find = _g76.find;
  var pairwise = _g76.pairwise;
  var iterate = _g76.iterate;
  var replicate = _g76.replicate;
  var splice = _g76.splice;
  var map = _g76.map;
  var map42 = _g76["map*"];
  var mapt = _g76.mapt;
  var mapo = _g76.mapo;
  var keys63 = _g76["keys?"];
  var extend = _g76.extend;
  var exclude = _g76.exclude;
  var char = _g76.char;
  var code = _g76.code;
  var search = _g76.search;
  var split = _g76.split;
  var cat = _g76.cat;
  var _43 = _g76["+"];
  var _ = _g76["-"];
  var _42 = _g76["*"];
  var _47 = _g76["/"];
  var _37 = _g76["%"];
  var _62 = _g76[">"];
  var _60 = _g76["<"];
  var _61 = _g76["="];
  var _6261 = _g76[">="];
  var _6061 = _g76["<="];
  var read_file = _g76["read-file"];
  var write_file = _g76["write-file"];
  var print = _g76.print;
  var write = _g76.write;
  var exit = _g76.exit;
  var type = _g76.type;
  var nil63 = _g76["nil?"];
  var is63 = _g76["is?"];
  var string63 = _g76["string?"];
  var string_literal63 = _g76["string-literal?"];
  var id_literal63 = _g76["id-literal?"];
  var number63 = _g76["number?"];
  var boolean63 = _g76["boolean?"];
  var function63 = _g76["function?"];
  var composite63 = _g76["composite?"];
  var atom63 = _g76["atom?"];
  var table63 = _g76["table?"];
  var list63 = _g76["list?"];
  var parse_number = _g76["parse-number"];
  var to_string = _g76["to-string"];
  var apply = _g76.apply;
  var stash = _g76.stash;
  var unstash = _g76.unstash;
  var _37message_handler = _g76["%message-handler"];
  var _g77 = nexus.reader;
  var make_stream = _g77["make-stream"];
  var read_table = _g77["read-table"];
  var read = _g77.read;
  var read_all = _g77["read-all"];
  var read_from_string = _g77["read-from-string"];
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
      var _g85 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
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
    var name = _g86.name;
    var prefix = _g86.prefix;
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
    var special = _g91.special;
    var stmt = _g91.stmt;
    var self_tr63 = _g91.tr;
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
    var _g92 = unstash(sublist(arguments, 1));
    var stmt63 = _g92["stmt?"];
    var tail63 = _g92["tail?"];
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
    return(join([join(["%function", []], join(_g94, [epilog]))]));
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
  _g106["compile-body"] = compile_body;
  _g106["compile-call"] = compile_call;
  _g106["compile-branch"] = compile_branch;
  _g106["compile-function"] = compile_function;
  _g106["compile-special"] = compile_special;
  _g106.compile = compile;
  _g106.eval = eval;
  _g106["load-module"] = load_module;
  _g106["open-module"] = open_module;
  _g106["in-module"] = in_module;
})();
(function () {
  var _g109 = nexus.utilities;
  var setenv = _g109.setenv;
  var getenv = _g109.getenv;
  var macro_function = _g109["macro-function"];
  var macro63 = _g109["macro?"];
  var special63 = _g109["special?"];
  var special_form63 = _g109["special-form?"];
  var symbol_expansion = _g109["symbol-expansion"];
  var symbol63 = _g109["symbol?"];
  var variable63 = _g109["variable?"];
  var bound63 = _g109["bound?"];
  var quoted = _g109.quoted;
  var stash42 = _g109["stash*"];
  var bind = _g109.bind;
  var bind42 = _g109["bind*"];
  var quasiexpand = _g109.quasiexpand;
  var macroexpand = _g109.macroexpand;
  var indentation = _g109.indentation;
  var valid_id63 = _g109["valid-id?"];
  var to_id = _g109["to-id"];
  var module_key = _g109["module-key"];
  var imported = _g109.imported;
  var exported = _g109.exported;
  var quote_environment = _g109["quote-environment"];
  var quote_modules = _g109["quote-modules"];
  var initial_environment = _g109["initial-environment"];
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
  return;
})();
(function () {
  var _g166 = nexus.utilities;
  var setenv = _g166.setenv;
  var getenv = _g166.getenv;
  var macro_function = _g166["macro-function"];
  var macro63 = _g166["macro?"];
  var special63 = _g166["special?"];
  var special_form63 = _g166["special-form?"];
  var symbol_expansion = _g166["symbol-expansion"];
  var symbol63 = _g166["symbol?"];
  var variable63 = _g166["variable?"];
  var bound63 = _g166["bound?"];
  var quoted = _g166.quoted;
  var stash42 = _g166["stash*"];
  var bind = _g166.bind;
  var bind42 = _g166["bind*"];
  var quasiexpand = _g166.quasiexpand;
  var macroexpand = _g166.macroexpand;
  var indentation = _g166.indentation;
  var valid_id63 = _g166["valid-id?"];
  var to_id = _g166["to-id"];
  var module_key = _g166["module-key"];
  var imported = _g166.imported;
  var exported = _g166.exported;
  var quote_environment = _g166["quote-environment"];
  var quote_modules = _g166["quote-modules"];
  var initial_environment = _g166["initial-environment"];
  var _g167 = nexus.runtime;
  var length = _g167.length;
  var empty63 = _g167["empty?"];
  var some63 = _g167["some?"];
  var substring = _g167.substring;
  var sublist = _g167.sublist;
  var sub = _g167.sub;
  var inner = _g167.inner;
  var hd = _g167.hd;
  var tl = _g167.tl;
  var add = _g167.add;
  var drop = _g167.drop;
  var last = _g167.last;
  var reverse = _g167.reverse;
  var join = _g167.join;
  var reduce = _g167.reduce;
  var keep = _g167.keep;
  var find = _g167.find;
  var pairwise = _g167.pairwise;
  var iterate = _g167.iterate;
  var replicate = _g167.replicate;
  var splice = _g167.splice;
  var map = _g167.map;
  var map42 = _g167["map*"];
  var mapt = _g167.mapt;
  var mapo = _g167.mapo;
  var keys63 = _g167["keys?"];
  var extend = _g167.extend;
  var exclude = _g167.exclude;
  var char = _g167.char;
  var code = _g167.code;
  var search = _g167.search;
  var split = _g167.split;
  var cat = _g167.cat;
  var _43 = _g167["+"];
  var _ = _g167["-"];
  var _42 = _g167["*"];
  var _47 = _g167["/"];
  var _37 = _g167["%"];
  var _62 = _g167[">"];
  var _60 = _g167["<"];
  var _61 = _g167["="];
  var _6261 = _g167[">="];
  var _6061 = _g167["<="];
  var read_file = _g167["read-file"];
  var write_file = _g167["write-file"];
  var print = _g167.print;
  var write = _g167.write;
  var exit = _g167.exit;
  var type = _g167.type;
  var nil63 = _g167["nil?"];
  var is63 = _g167["is?"];
  var string63 = _g167["string?"];
  var string_literal63 = _g167["string-literal?"];
  var id_literal63 = _g167["id-literal?"];
  var number63 = _g167["number?"];
  var boolean63 = _g167["boolean?"];
  var function63 = _g167["function?"];
  var composite63 = _g167["composite?"];
  var atom63 = _g167["atom?"];
  var table63 = _g167["table?"];
  var list63 = _g167["list?"];
  var parse_number = _g167["parse-number"];
  var to_string = _g167["to-string"];
  var apply = _g167.apply;
  var stash = _g167.stash;
  var unstash = _g167.unstash;
  var _37message_handler = _g167["%message-handler"];
  global.target = "js";
  return;
})();
(function () {
  var _g240 = nexus.utilities;
  var setenv = _g240.setenv;
  var getenv = _g240.getenv;
  var macro_function = _g240["macro-function"];
  var macro63 = _g240["macro?"];
  var special63 = _g240["special?"];
  var special_form63 = _g240["special-form?"];
  var symbol_expansion = _g240["symbol-expansion"];
  var symbol63 = _g240["symbol?"];
  var variable63 = _g240["variable?"];
  var bound63 = _g240["bound?"];
  var quoted = _g240.quoted;
  var stash42 = _g240["stash*"];
  var bind = _g240.bind;
  var bind42 = _g240["bind*"];
  var quasiexpand = _g240.quasiexpand;
  var macroexpand = _g240.macroexpand;
  var indentation = _g240.indentation;
  var valid_id63 = _g240["valid-id?"];
  var to_id = _g240["to-id"];
  var module_key = _g240["module-key"];
  var imported = _g240.imported;
  var exported = _g240.exported;
  var quote_environment = _g240["quote-environment"];
  var quote_modules = _g240["quote-modules"];
  var initial_environment = _g240["initial-environment"];
  global.modules = {boot: {import: ["utilities", "special", "core"], export: {}}, core: {import: ["utilities", "runtime", "special", "core"], export: {"list*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g241 = xs;
      while ((i < length(_g241))) {
        var x = _g241[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, each: {export: true, module: "core", macro: function (_g242) {
    var t = _g242[0];
    var k = _g242[1];
    var v = _g242[2];
    var body = unstash(sublist(arguments, 1));
    var _g243 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g244 = ["target"];
      _g244.js = join(["isNaN", join(["parseInt", k])]);
      _g244.lua = join(["not", join(["number?", k])]);
      return(_g244);
    })()), join(["let", join([v, join(["get", t1, k])])], _g243)])])]));
  }}, inc: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, quote: {export: true, module: "core", macro: function (form) {
    return(quoted(form));
  }}, "join*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, fn: {export: true, module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g245 = sub(body, 0);
    var _g246 = bind42(args, _g245);
    var _g247 = _g246[0];
    var _g248 = _g246[1];
    return(join(["%function", _g247], _g248));
  }}, table: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g165, x) {
      return(x);
    }, body)));
  }}, "join!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g249 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g249)]));
  }}, "let-symbol": {export: true, module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g250 = sub(body, 0);
    add(environment, {});
    var _g251 = (function () {
      map(function (_g252) {
        var name = _g252[0];
        var exp = _g252[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g250)));
    })();
    drop(environment);
    return(_g251);
  }}, pr: {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g253 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g253)]));
  }}, "with-frame": {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g254 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g255 = ["table"];
      _g255._scope = scope;
      return(_g255);
    })())]), join(["let", join([x, join(["do"], _g254)]), join(["drop", "environment"]), x])]));
  }}, define: {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g256 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g256))) {
      var _g257 = bind42(x, _g256);
      var args = _g257[0];
      var _g258 = _g257[1];
      return(join(["%global-function", name, args], _g258));
    } else {
      return(join(["set", name, x]));
    }
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
        add(locals, join(["%local", id, val]));
        _g262 = (_g262 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g259)])));
  }}, "define-local": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g264 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g264))) {
      var _g265 = bind42(x, _g264);
      var args = _g265[0];
      var _g266 = _g265[1];
      return(join(["%local-function", name, args], _g266));
    } else {
      return(join(["%local", name, x]));
    }
  }}, dec: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, "set-of": {export: true, module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g268 = 0;
    var _g267 = elements;
    while ((_g268 < length(_g267))) {
      var e = _g267[_g268];
      l[e] = true;
      _g268 = (_g268 + 1);
    }
    return(join(["table"], l));
  }}, quasiquote: {export: true, module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }}, "with-bindings": {export: true, module: "core", macro: function (_g269) {
    var names = _g269[0];
    var body = unstash(sublist(arguments, 1));
    var _g270 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g271 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g272 = ["setenv", x];
        _g272.variable = true;
        return(_g272);
      })())])];
      _g271.scope = true;
      return(_g271);
    })(), _g270));
  }}, "define-special": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g273 = sub(body, 0);
    var form = join(["fn", args], _g273);
    var keys = sub(_g273, length(_g273));
    eval(join((function () {
      var _g274 = ["setenv", join(["quote", name])];
      _g274.special = form;
      _g274.form = join(["quote", form]);
      return(_g274);
    })(), keys));
    return(undefined);
  }}, "cat!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g275 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g275)]));
  }}, "define-macro": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g276 = sub(body, 0);
    var form = join(["fn", args], _g276);
    eval(join((function () {
      var _g277 = ["setenv", join(["quote", name])];
      _g277.macro = form;
      _g277.form = join(["quote", form]);
      return(_g277);
    })()));
    return(undefined);
  }}, "define-symbol": {export: true, module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, "let-macro": {export: true, module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g278 = sub(body, 0);
    add(environment, {});
    var _g279 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g278)));
    })();
    drop(environment);
    return(_g279);
  }}, language: {export: true, module: "core", macro: function () {
    return(join(["quote", target]));
  }}, list: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g280 = body;
      for (k in _g280) {
        if (isNaN(parseInt(k))) {
          var v = _g280[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, target: {export: true, global: true, module: "core", macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, across: {export: true, module: "core", macro: function (_g281) {
    var l = _g281[0];
    var v = _g281[1];
    var i = _g281[2];
    var start = _g281[3];
    var body = unstash(sublist(arguments, 1));
    var _g282 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g282, [join(["inc", i])]))])]));
  }}, guard: {export: true, module: "core", macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, "define-global": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g283 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g283))) {
      var _g284 = bind42(x, _g283);
      var args = _g284[0];
      var _g285 = _g284[1];
      return(join(["%global-function", name, args], _g285));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }}, at: {export: true, module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }}}}, reader: {import: ["special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g286) {
    var char = _g286[0];
    var stream = _g286[1];
    var body = unstash(sublist(arguments, 1));
    var _g287 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g287)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}}, compiler: {import: ["utilities", "runtime", "special", "core", "reader"], export: {"define-module": {export: true, module: "compiler", macro: function (spec) {
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
      add(imports, imported(k));
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
  }}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "current-module": {global: true, export: true, module: "compiler"}}}, runtime: {import: ["special", "core"], export: {length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, mapt: {export: true, module: "runtime", variable: true}, mapo: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, type: {export: true, module: "runtime", variable: true}, "nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}}}, special: {import: ["utilities", "special", "core", "compiler"], export: {"%function": {export: true, special: function (_g293) {
    var args = _g293[0];
    var body = sub(_g293, 1);
    return(compile_function(args, body));
  }, module: "special"}, "if": {module: "special", special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g294 = form;
    while ((i < length(_g294))) {
      var condition = _g294[i];
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
  }, stmt: true, tr: true, export: true}, "not": {export: true, special: function (_g295) {
    var x = _g295[0];
    var _g296 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g296 + ")"));
  }, module: "special"}, "while": {module: "special", special: function (_g297) {
    var condition = _g297[0];
    var body = sub(_g297, 1);
    var _g298 = compile(condition);
    var _g299 = (function () {
      indent_level = (indent_level + 1);
      var _g300 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g300);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g298 + ") {\n" + _g299 + ind + "}\n"));
    } else {
      return((ind + "while " + _g298 + " do\n" + _g299 + ind + "end\n"));
    }
  }, stmt: true, tr: true, export: true}, "do": {module: "special", special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }, stmt: true, tr: true, export: true}, "%try": {module: "special", special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g301 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g301);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g302 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g302);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true, tr: true, export: true}, "%for": {module: "special", special: function (_g303) {
    var _g304 = _g303[0];
    var t = _g304[0];
    var k = _g304[1];
    var body = sub(_g303, 1);
    var _g305 = compile(t);
    var ind = indentation();
    var _g306 = (function () {
      indent_level = (indent_level + 1);
      var _g307 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g307);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g305 + " do\n" + _g306 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g305 + ") {\n" + _g306 + ind + "}\n"));
    }
  }, stmt: true, tr: true, export: true}, "%object": {export: true, special: function (forms) {
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
    var _g308 = pairs;
    while ((i < length(_g308))) {
      var _g309 = _g308[i];
      var k = _g309[0];
      var v = _g309[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g310 = compile(v);
      var _g311 = (function () {
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
      str = (str + _g311 + sep + _g310);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special"}, "set": {stmt: true, module: "special", special: function (_g312) {
    var lh = _g312[0];
    var rh = _g312[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, export: true}, "return": {stmt: true, module: "special", special: function (_g313) {
    var x = _g313[0];
    var _g314 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g314));
  }, export: true}, "%local-function": {module: "special", special: function (_g315) {
    var name = _g315[0];
    var args = _g315[1];
    var body = sub(_g315, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, stmt: true, tr: true, export: true}, "%local": {stmt: true, module: "special", special: function (_g316) {
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
  }, export: true}, "error": {stmt: true, module: "special", special: function (_g318) {
    var x = _g318[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, export: true}, "break": {stmt: true, module: "special", special: function (_g108) {
    return((indentation() + "break"));
  }, export: true}, "get": {export: true, special: function (_g319) {
    var t = _g319[0];
    var k = _g319[1];
    var _g320 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g320, 0) === "{"))) {
      _g320 = ("(" + _g320 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g320 + "." + inner(k)));
    } else {
      return((_g320 + "[" + k1 + "]"));
    }
  }, module: "special"}, "%array": {export: true, special: function (forms) {
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
    var _g321 = forms;
    while ((i < length(_g321))) {
      var x = _g321[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special"}, "%global-function": {module: "special", special: function (_g322) {
    var name = _g322[0];
    var args = _g322[1];
    var body = sub(_g322, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }, stmt: true, tr: true, export: true}}}, lib: {import: ["core", "special"], export: {}}, utilities: {import: ["special", "core"], export: {setenv: {export: true, module: "utilities", variable: true}, getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, "make-id": {}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, nexus: {global: true, export: true, module: "utilities"}, "indent-level": {global: true, export: true, module: "utilities"}}}};
  global.environment = [{"define-module": {export: true, module: "compiler", macro: function (spec) {
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
  }}}];
  return;
})();
(function () {
  var _g37 = nexus.utilities;
  var setenv = _g37.setenv;
  var getenv = _g37.getenv;
  var macro_function = _g37["macro-function"];
  var macro63 = _g37["macro?"];
  var special63 = _g37["special?"];
  var special_form63 = _g37["special-form?"];
  var symbol_expansion = _g37["symbol-expansion"];
  var symbol63 = _g37["symbol?"];
  var variable63 = _g37["variable?"];
  var bound63 = _g37["bound?"];
  var quoted = _g37.quoted;
  var stash42 = _g37["stash*"];
  var bind = _g37.bind;
  var bind42 = _g37["bind*"];
  var quasiexpand = _g37.quasiexpand;
  var macroexpand = _g37.macroexpand;
  var indentation = _g37.indentation;
  var valid_id63 = _g37["valid-id?"];
  var to_id = _g37["to-id"];
  var module_key = _g37["module-key"];
  var imported = _g37.imported;
  var exported = _g37.exported;
  var quote_environment = _g37["quote-environment"];
  var quote_modules = _g37["quote-modules"];
  var initial_environment = _g37["initial-environment"];
  var _g69 = nexus.runtime;
  var length = _g69.length;
  var empty63 = _g69["empty?"];
  var some63 = _g69["some?"];
  var substring = _g69.substring;
  var sublist = _g69.sublist;
  var sub = _g69.sub;
  var inner = _g69.inner;
  var hd = _g69.hd;
  var tl = _g69.tl;
  var add = _g69.add;
  var drop = _g69.drop;
  var last = _g69.last;
  var reverse = _g69.reverse;
  var join = _g69.join;
  var reduce = _g69.reduce;
  var keep = _g69.keep;
  var find = _g69.find;
  var pairwise = _g69.pairwise;
  var iterate = _g69.iterate;
  var replicate = _g69.replicate;
  var splice = _g69.splice;
  var map = _g69.map;
  var map42 = _g69["map*"];
  var mapt = _g69.mapt;
  var mapo = _g69.mapo;
  var keys63 = _g69["keys?"];
  var extend = _g69.extend;
  var exclude = _g69.exclude;
  var char = _g69.char;
  var code = _g69.code;
  var search = _g69.search;
  var split = _g69.split;
  var cat = _g69.cat;
  var _43 = _g69["+"];
  var _ = _g69["-"];
  var _42 = _g69["*"];
  var _47 = _g69["/"];
  var _37 = _g69["%"];
  var _62 = _g69[">"];
  var _60 = _g69["<"];
  var _61 = _g69["="];
  var _6261 = _g69[">="];
  var _6061 = _g69["<="];
  var read_file = _g69["read-file"];
  var write_file = _g69["write-file"];
  var print = _g69.print;
  var write = _g69.write;
  var exit = _g69.exit;
  var type = _g69.type;
  var nil63 = _g69["nil?"];
  var is63 = _g69["is?"];
  var string63 = _g69["string?"];
  var string_literal63 = _g69["string-literal?"];
  var id_literal63 = _g69["id-literal?"];
  var number63 = _g69["number?"];
  var boolean63 = _g69["boolean?"];
  var function63 = _g69["function?"];
  var composite63 = _g69["composite?"];
  var atom63 = _g69["atom?"];
  var table63 = _g69["table?"];
  var list63 = _g69["list?"];
  var parse_number = _g69["parse-number"];
  var to_string = _g69["to-string"];
  var apply = _g69.apply;
  var stash = _g69.stash;
  var unstash = _g69.unstash;
  var _37message_handler = _g69["%message-handler"];
  var _g74 = nexus.reader;
  var make_stream = _g74["make-stream"];
  var read_table = _g74["read-table"];
  var read = _g74.read;
  var read_all = _g74["read-all"];
  var read_from_string = _g74["read-from-string"];
  var _g107 = nexus.compiler;
  var compile_body = _g107["compile-body"];
  var compile_call = _g107["compile-call"];
  var compile_branch = _g107["compile-branch"];
  var compile_function = _g107["compile-function"];
  var compile_special = _g107["compile-special"];
  var compile = _g107.compile;
  var eval = _g107.eval;
  var load_module = _g107["load-module"];
  var open_module = _g107["open-module"];
  var in_module = _g107["in-module"];
  function rep(str) {
    var _g329 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g333) {
        return([false, _g333]);
      }
    })();
    var _g1 = _g329[0];
    var x = _g329[1];
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
    var _g330 = args;
    while ((i < length(_g330))) {
      var arg = _g330[i];
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
      var _g331 = (spec || "main");
      in_module(_g331);
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
