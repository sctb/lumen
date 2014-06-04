(function () {
  global.nexus = {};
})();
(function () {
  setenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g8 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g9 = _g8;
      for (k1 in _g9) {
        if (isNaN(parseInt(k1))) {
          var v = _g9[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  };
  getenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g10 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g11 = keys63(_g10);
        if (_g11) {
          return(b[_g11]);
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
      var _g12 = args;
      for (k in _g12) {
        if (isNaN(parseInt(k))) {
          var v = _g12[k];
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
      var _g13 = lh;
      while ((i < length(_g13))) {
        var x = _g13[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
      }
      var k = undefined;
      var _g14 = lh;
      for (k in _g14) {
        if (isNaN(parseInt(k))) {
          var v = _g14[k];
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
      var _g16 = 0;
      var _g15 = args;
      while ((_g16 < length(_g15))) {
        var arg = _g15[_g16];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g16 = (_g16 + 1);
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
        var _g3 = form[0];
        var _g17 = form[1];
        var t = _g17[0];
        var k = _g17[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g4 = form[0];
        var args = form[1];
        var _g18 = sub(form, 2);
        add(environment, {_scope: true});
        var _g20 = (function () {
          var _g22 = 0;
          var _g21 = args;
          while ((_g22 < length(_g21))) {
            var _g19 = _g21[_g22];
            setenv(_g19, {_stash: true, variable: true});
            _g22 = (_g22 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g18)));
        })();
        drop(environment);
        return(_g20);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g5 = form[0];
        var name = form[1];
        var _g23 = form[2];
        var _g24 = sub(form, 3);
        add(environment, {_scope: true});
        var _g26 = (function () {
          var _g28 = 0;
          var _g27 = _g23;
          while ((_g28 < length(_g27))) {
            var _g25 = _g27[_g28];
            setenv(_g25, {_stash: true, variable: true});
            _g28 = (_g28 + 1);
          }
          return(join([x, name, map42(macroexpand, _g23)], macroexpand(_g24)));
        })();
        drop(environment);
        return(_g26);
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
    var _g29 = form;
    for (k in _g29) {
      if (isNaN(parseInt(k))) {
        var v = _g29[k];
        var _g30 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g30;
      }
    }
    var _g32 = 0;
    var _g31 = form;
    while ((_g32 < length(_g31))) {
      var x = _g31[_g32];
      if (quasisplice63(x, depth)) {
        var _g33 = quasiexpand(x[1]);
        add(xs, _g33);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g32 = (_g32 + 1);
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
  var reserved = {"+": true, "-": true, "void": true, "/": true, "debugger": true, "catch": true, "break": true, "throw": true, "until": true, "nil": true, "finally": true, "end": true, "function": true, "try": true, ">=": true, "else": true, "<=": true, "instanceof": true, "=": true, "delete": true, "in": true, "*": true, "do": true, "switch": true, "typeof": true, "or": true, "true": true, "false": true, "and": true, "continue": true, "%": true, "this": true, "local": true, "new": true, "while": true, "repeat": true, "elseif": true, "for": true, "then": true, "if": true, "with": true, "default": true, "==": true, "var": true, "return": true, "<": true, "not": true, ">": true, "case": true};
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
    var _g34 = toplevel;
    for (n in _g34) {
      if (isNaN(parseInt(n))) {
        var b = _g34[n];
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
      var _g35 = x;
      for (b in _g35) {
        if (isNaN(parseInt(b))) {
          var _g6 = _g35[b];
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
    return(join(["%object"], mapo(function (_g7, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    return(join((function () {
      var _g36 = ["table"];
      _g36.export = quote_frame(m.export);
      _g36.import = quoted(m.import);
      return(_g36);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g37 = {};
  nexus.utilities = _g37;
  _g37["symbol?"] = symbol63;
  _g37.bind = bind;
  _g37.quasiexpand = quasiexpand;
  _g37["special-form?"] = special_form63;
  _g37["variable?"] = variable63;
  _g37["symbol-expansion"] = symbol_expansion;
  _g37["to-id"] = to_id;
  _g37["module-key"] = module_key;
  _g37.getenv = getenv;
  _g37["special?"] = special63;
  _g37["quote-modules"] = quote_modules;
  _g37["bind*"] = bind42;
  _g37["macro-function"] = macro_function;
  _g37.quoted = quoted;
  _g37["initial-environment"] = initial_environment;
  _g37.setenv = setenv;
  _g37["quote-environment"] = quote_environment;
  _g37.exported = exported;
  _g37["macro?"] = macro63;
  _g37["valid-id?"] = valid_id63;
  _g37.indentation = indentation;
  _g37.macroexpand = macroexpand;
  _g37["stash*"] = stash42;
  _g37.imported = imported;
  _g37["bound?"] = bound63;
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
    var _g39 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g39, upto));
    } else {
      var l = sublist(x, _g39, upto);
      var k = undefined;
      var _g40 = x;
      for (k in _g40) {
        if (isNaN(parseInt(k))) {
          var v = _g40[k];
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
      var _g41 = l1;
      for (k in _g41) {
        if (isNaN(parseInt(k))) {
          var v = _g41[k];
          l[k] = v;
        }
      }
      var _g43 = undefined;
      var _g42 = l2;
      for (_g43 in _g42) {
        if (isNaN(parseInt(_g43))) {
          var v = _g42[_g43];
          l[_g43] = v;
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
    var _g45 = 0;
    var _g44 = l;
    while ((_g45 < length(_g44))) {
      var x = _g44[_g45];
      if (f(x)) {
        add(l1, x);
      }
      _g45 = (_g45 + 1);
    }
    return(l1);
  };
  find = function (f, l) {
    var _g47 = 0;
    var _g46 = l;
    while ((_g47 < length(_g46))) {
      var x = _g46[_g47];
      var _g48 = f(x);
      if (_g48) {
        return(_g48);
      }
      _g47 = (_g47 + 1);
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
    var _g50 = 0;
    var _g49 = l;
    while ((_g50 < length(_g49))) {
      var x = _g49[_g50];
      var x1 = f(x);
      var s = splice63(x1);
      if (list63(s)) {
        l1 = join(l1, s);
      } else if (is63(s)) {
        add(l1, s);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g50 = (_g50 + 1);
    }
    return(l1);
  };
  map42 = function (f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g51 = t;
    for (k in _g51) {
      if (isNaN(parseInt(k))) {
        var v = _g51[k];
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
    var _g52 = t;
    for (k in _g52) {
      if (isNaN(parseInt(k))) {
        var v = _g52[k];
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
    var _g53 = t;
    for (k in _g53) {
      if (isNaN(parseInt(k))) {
        var v = _g53[k];
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
    var _g54 = t;
    for (k1 in _g54) {
      if (isNaN(parseInt(k1))) {
        var v = _g54[k1];
        k = k1;
        break;
      }
    }
    return(k);
  };
  extend = function (t) {
    var xs = unstash(sublist(arguments, 1));
    var _g55 = sub(xs, 0);
    return(join(t, _g55));
  };
  exclude = function (t) {
    var keys = unstash(sublist(arguments, 1));
    var _g56 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g57 = t;
    for (k in _g57) {
      if (isNaN(parseInt(k))) {
        var v = _g57[k];
        if (!(_g56[k])) {
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
    var _g58 = sub(xs, 0);
    if (empty63(_g58)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g58));
    }
  };
  _43 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g59 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g59));
  };
  _ = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g60 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g60)));
  };
  _42 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g61 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g61));
  };
  _47 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g62 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g62)));
  };
  _37 = function () {
    var xs = unstash(sublist(arguments, 0));
    var _g63 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g63)));
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
      var _g64 = x;
      for (k in _g64) {
        if (isNaN(parseInt(k))) {
          var v = _g64[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g65 = x1;
      while ((i < length(_g65))) {
        var y = _g65[i];
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
    var _g66 = stash(args);
    return((f.apply)(f, _g66));
  };
  stash = function (args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g67 = args;
      for (k in _g67) {
        if (isNaN(parseInt(k))) {
          var v = _g67[k];
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
        var _g68 = l;
        for (k in _g68) {
          if (isNaN(parseInt(k))) {
            var v = _g68[k];
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
  _g69 = {};
  nexus.runtime = _g69;
  _g69["read-file"] = read_file;
  _g69["map*"] = map42;
  _g69.hd = hd;
  _g69.tl = tl;
  _g69.char = char;
  _g69["%message-handler"] = _37message_handler;
  _g69["some?"] = some63;
  _g69.mapo = mapo;
  _g69["composite?"] = composite63;
  _g69["<="] = _6061;
  _g69.unstash = unstash;
  _g69["number?"] = number63;
  _g69.stash = stash;
  _g69["/"] = _47;
  _g69.sublist = sublist;
  _g69["+"] = _43;
  _g69["-"] = _;
  _g69.apply = apply;
  _g69["atom?"] = atom63;
  _g69["to-string"] = to_string;
  _g69.exclude = exclude;
  _g69.split = split;
  _g69.length = length;
  _g69["parse-number"] = parse_number;
  _g69.map = map;
  _g69["list?"] = list63;
  _g69["table?"] = table63;
  _g69["="] = _61;
  _g69["boolean?"] = boolean63;
  _g69["id-literal?"] = id_literal63;
  _g69.sub = sub;
  _g69["%"] = _37;
  _g69.extend = extend;
  _g69["string-literal?"] = string_literal63;
  _g69["string?"] = string63;
  _g69.replicate = replicate;
  _g69["nil?"] = nil63;
  _g69.join = join;
  _g69["is?"] = is63;
  _g69.print = print;
  _g69.type = type;
  _g69[">="] = _6261;
  _g69.exit = exit;
  _g69.write = write;
  _g69["<"] = _60;
  _g69[">"] = _62;
  _g69["function?"] = function63;
  _g69["*"] = _42;
  _g69.cat = cat;
  _g69.search = search;
  _g69.reverse = reverse;
  _g69["keys?"] = keys63;
  _g69.splice = splice;
  _g69.substring = substring;
  _g69.drop = drop;
  _g69.iterate = iterate;
  _g69.pairwise = pairwise;
  _g69.find = find;
  _g69.keep = keep;
  _g69.mapt = mapt;
  _g69.reduce = reduce;
  _g69.code = code;
  _g69.add = add;
  _g69.last = last;
  _g69["empty?"] = empty63;
  _g69.inner = inner;
  _g69["write-file"] = write_file;
})();
(function () {
  var delimiters = {";": true, ")": true, "\n": true, "(": true};
  var whitespace = {"\t": true, " ": true, "\n": true};
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
  _g74 = {};
  nexus.reader = _g74;
  _g74.read = read;
  _g74["read-all"] = read_all;
  _g74["make-stream"] = make_stream;
  _g74["read-table"] = read_table;
  _g74["read-from-string"] = read_from_string;
})();
(function () {
  var _g76 = nexus.utilities;
  var indentation = _g76.indentation;
  var quote_environment = _g76["quote-environment"];
  var symbol63 = _g76["symbol?"];
  var getenv = _g76.getenv;
  var bind42 = _g76["bind*"];
  var quasiexpand = _g76.quasiexpand;
  var special_form63 = _g76["special-form?"];
  var exported = _g76.exported;
  var macro63 = _g76["macro?"];
  var macro_function = _g76["macro-function"];
  var quoted = _g76.quoted;
  var variable63 = _g76["variable?"];
  var symbol_expansion = _g76["symbol-expansion"];
  var initial_environment = _g76["initial-environment"];
  var stash42 = _g76["stash*"];
  var quote_modules = _g76["quote-modules"];
  var module_key = _g76["module-key"];
  var imported = _g76.imported;
  var setenv = _g76.setenv;
  var macroexpand = _g76.macroexpand;
  var valid_id63 = _g76["valid-id?"];
  var to_id = _g76["to-id"];
  var bound63 = _g76["bound?"];
  var bind = _g76.bind;
  var special63 = _g76["special?"];
  var _g77 = nexus.runtime;
  var find = _g77.find;
  var boolean63 = _g77["boolean?"];
  var pairwise = _g77.pairwise;
  var map42 = _g77["map*"];
  var hd = _g77.hd;
  var tl = _g77.tl;
  var unstash = _g77.unstash;
  var exit = _g77.exit;
  var char = _g77.char;
  var _37message_handler = _g77["%message-handler"];
  var some63 = _g77["some?"];
  var composite63 = _g77["composite?"];
  var number63 = _g77["number?"];
  var _47 = _g77["/"];
  var sublist = _g77.sublist;
  var reduce = _g77.reduce;
  var _43 = _g77["+"];
  var list63 = _g77["list?"];
  var _ = _g77["-"];
  var atom63 = _g77["atom?"];
  var keys63 = _g77["keys?"];
  var exclude = _g77.exclude;
  var split = _g77.split;
  var empty63 = _g77["empty?"];
  var length = _g77.length;
  var map = _g77.map;
  var _42 = _g77["*"];
  var sub = _g77.sub;
  var _37 = _g77["%"];
  var extend = _g77.extend;
  var replicate = _g77.replicate;
  var nil63 = _g77["nil?"];
  var join = _g77.join;
  var to_string = _g77["to-string"];
  var _6061 = _g77["<="];
  var _6261 = _g77[">="];
  var write = _g77.write;
  var iterate = _g77.iterate;
  var _60 = _g77["<"];
  var _62 = _g77[">"];
  var string_literal63 = _g77["string-literal?"];
  var add = _g77.add;
  var function63 = _g77["function?"];
  var reverse = _g77.reverse;
  var splice = _g77.splice;
  var substring = _g77.substring;
  var search = _g77.search;
  var drop = _g77.drop;
  var read_file = _g77["read-file"];
  var stash = _g77.stash;
  var cat = _g77.cat;
  var mapt = _g77.mapt;
  var apply = _g77.apply;
  var table63 = _g77["table?"];
  var parse_number = _g77["parse-number"];
  var code = _g77.code;
  var is63 = _g77["is?"];
  var _61 = _g77["="];
  var keep = _g77.keep;
  var string63 = _g77["string?"];
  var last = _g77.last;
  var id_literal63 = _g77["id-literal?"];
  var inner = _g77.inner;
  var mapo = _g77.mapo;
  var write_file = _g77["write-file"];
  var _g78 = nexus.reader;
  var read_all = _g78["read-all"];
  var read_table = _g78["read-table"];
  var make_stream = _g78["make-stream"];
  var read = _g78.read;
  var read_from_string = _g78["read-from-string"];
  var infix = {common: {"/": true, "<": true, "+": true, ">": true, "-": true, "*": true, "<=": true, "%": true, ">=": true}, lua: {cat: "..", "and": true, "=": "==", "or": true, "~=": true}, js: {cat: "+", "and": "&&", "=": "===", "or": "||", "~=": "!="}};
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
      var _g86 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
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
    var self_tr63 = _g92.tr;
    var stmt = _g92.stmt;
    var special = _g92.special;
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
    var tail63 = _g93["tail?"];
    var stmt63 = _g93["stmt?"];
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
  _g107["compile-branch"] = compile_branch;
  _g107.compile = compile;
  _g107["compile-body"] = compile_body;
  _g107["open-module"] = open_module;
  _g107["in-module"] = in_module;
  _g107.eval = eval;
  _g107["compile-function"] = compile_function;
  _g107["compile-call"] = compile_call;
  _g107["compile-special"] = compile_special;
  _g107["load-module"] = load_module;
})();
(function () {
  var _g110 = nexus.utilities;
  var indentation = _g110.indentation;
  var quote_environment = _g110["quote-environment"];
  var symbol63 = _g110["symbol?"];
  var getenv = _g110.getenv;
  var bind42 = _g110["bind*"];
  var quasiexpand = _g110.quasiexpand;
  var special_form63 = _g110["special-form?"];
  var exported = _g110.exported;
  var macro63 = _g110["macro?"];
  var macro_function = _g110["macro-function"];
  var quoted = _g110.quoted;
  var variable63 = _g110["variable?"];
  var symbol_expansion = _g110["symbol-expansion"];
  var initial_environment = _g110["initial-environment"];
  var stash42 = _g110["stash*"];
  var quote_modules = _g110["quote-modules"];
  var module_key = _g110["module-key"];
  var imported = _g110.imported;
  var setenv = _g110.setenv;
  var macroexpand = _g110.macroexpand;
  var valid_id63 = _g110["valid-id?"];
  var to_id = _g110["to-id"];
  var bound63 = _g110["bound?"];
  var bind = _g110.bind;
  var special63 = _g110["special?"];
  var _g111 = nexus.compiler;
  var compile = _g111.compile;
  var eval = _g111.eval;
  var compile_branch = _g111["compile-branch"];
  var compile_body = _g111["compile-body"];
  var compile_special = _g111["compile-special"];
  var load_module = _g111["load-module"];
  var open_module = _g111["open-module"];
  var in_module = _g111["in-module"];
  var compile_call = _g111["compile-call"];
  var compile_function = _g111["compile-function"];
})();
(function () {
  var _g167 = nexus.utilities;
  var indentation = _g167.indentation;
  var quote_environment = _g167["quote-environment"];
  var symbol63 = _g167["symbol?"];
  var getenv = _g167.getenv;
  var bind42 = _g167["bind*"];
  var quasiexpand = _g167.quasiexpand;
  var special_form63 = _g167["special-form?"];
  var exported = _g167.exported;
  var macro63 = _g167["macro?"];
  var macro_function = _g167["macro-function"];
  var quoted = _g167.quoted;
  var variable63 = _g167["variable?"];
  var symbol_expansion = _g167["symbol-expansion"];
  var initial_environment = _g167["initial-environment"];
  var stash42 = _g167["stash*"];
  var quote_modules = _g167["quote-modules"];
  var module_key = _g167["module-key"];
  var imported = _g167.imported;
  var setenv = _g167.setenv;
  var macroexpand = _g167.macroexpand;
  var valid_id63 = _g167["valid-id?"];
  var to_id = _g167["to-id"];
  var bound63 = _g167["bound?"];
  var bind = _g167.bind;
  var special63 = _g167["special?"];
  var _g168 = nexus.runtime;
  var find = _g168.find;
  var boolean63 = _g168["boolean?"];
  var pairwise = _g168.pairwise;
  var map42 = _g168["map*"];
  var hd = _g168.hd;
  var tl = _g168.tl;
  var unstash = _g168.unstash;
  var exit = _g168.exit;
  var char = _g168.char;
  var _37message_handler = _g168["%message-handler"];
  var some63 = _g168["some?"];
  var composite63 = _g168["composite?"];
  var number63 = _g168["number?"];
  var _47 = _g168["/"];
  var sublist = _g168.sublist;
  var reduce = _g168.reduce;
  var _43 = _g168["+"];
  var list63 = _g168["list?"];
  var _ = _g168["-"];
  var atom63 = _g168["atom?"];
  var keys63 = _g168["keys?"];
  var exclude = _g168.exclude;
  var split = _g168.split;
  var empty63 = _g168["empty?"];
  var length = _g168.length;
  var map = _g168.map;
  var _42 = _g168["*"];
  var sub = _g168.sub;
  var _37 = _g168["%"];
  var extend = _g168.extend;
  var replicate = _g168.replicate;
  var nil63 = _g168["nil?"];
  var join = _g168.join;
  var to_string = _g168["to-string"];
  var _6061 = _g168["<="];
  var _6261 = _g168[">="];
  var write = _g168.write;
  var iterate = _g168.iterate;
  var _60 = _g168["<"];
  var _62 = _g168[">"];
  var string_literal63 = _g168["string-literal?"];
  var add = _g168.add;
  var function63 = _g168["function?"];
  var reverse = _g168.reverse;
  var splice = _g168.splice;
  var substring = _g168.substring;
  var search = _g168.search;
  var drop = _g168.drop;
  var read_file = _g168["read-file"];
  var stash = _g168.stash;
  var cat = _g168.cat;
  var mapt = _g168.mapt;
  var apply = _g168.apply;
  var table63 = _g168["table?"];
  var parse_number = _g168["parse-number"];
  var code = _g168.code;
  var is63 = _g168["is?"];
  var _61 = _g168["="];
  var keep = _g168.keep;
  var string63 = _g168["string?"];
  var last = _g168.last;
  var id_literal63 = _g168["id-literal?"];
  var inner = _g168.inner;
  var mapo = _g168.mapo;
  var write_file = _g168["write-file"];
  global.target = "js";
})();
(function () {
  var _g241 = nexus.utilities;
  var indentation = _g241.indentation;
  var quote_environment = _g241["quote-environment"];
  var symbol63 = _g241["symbol?"];
  var getenv = _g241.getenv;
  var bind42 = _g241["bind*"];
  var quasiexpand = _g241.quasiexpand;
  var special_form63 = _g241["special-form?"];
  var exported = _g241.exported;
  var macro63 = _g241["macro?"];
  var macro_function = _g241["macro-function"];
  var quoted = _g241.quoted;
  var variable63 = _g241["variable?"];
  var symbol_expansion = _g241["symbol-expansion"];
  var initial_environment = _g241["initial-environment"];
  var stash42 = _g241["stash*"];
  var quote_modules = _g241["quote-modules"];
  var module_key = _g241["module-key"];
  var imported = _g241.imported;
  var setenv = _g241.setenv;
  var macroexpand = _g241.macroexpand;
  var valid_id63 = _g241["valid-id?"];
  var to_id = _g241["to-id"];
  var bound63 = _g241["bound?"];
  var bind = _g241.bind;
  var special63 = _g241["special?"];
  global.modules = {utilities: {export: {"module-key": {variable: true, module: "utilities", export: true}, "quote-environment": {variable: true, module: "utilities", export: true}, "quote-modules": {variable: true, module: "utilities", export: true}, "make-id": {}, "bind*": {variable: true, module: "utilities", export: true}, quasiexpand: {variable: true, module: "utilities", export: true}, "special-form?": {variable: true, module: "utilities", export: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }, module: "utilities", export: true}, exported: {variable: true, module: "utilities", export: true}, "special?": {variable: true, module: "utilities", export: true}, "macro-function": {variable: true, module: "utilities", export: true}, quoted: {variable: true, module: "utilities", export: true}, "variable?": {variable: true, module: "utilities", export: true}, getenv: {variable: true, module: "utilities", export: true}, "symbol-expansion": {variable: true, module: "utilities", export: true}, "valid-id?": {variable: true, module: "utilities", export: true}, "initial-environment": {variable: true, module: "utilities", export: true}, "stash*": {variable: true, module: "utilities", export: true}, macroexpand: {variable: true, module: "utilities", export: true}, indentation: {variable: true, module: "utilities", export: true}, imported: {variable: true, module: "utilities", export: true}, setenv: {variable: true, module: "utilities", export: true}, "macro?": {variable: true, module: "utilities", export: true}, "indent-level": {export: true, module: "utilities", global: true}, "to-id": {variable: true, module: "utilities", export: true}, "bound?": {variable: true, module: "utilities", export: true}, "symbol?": {variable: true, module: "utilities", export: true}, bind: {variable: true, module: "utilities", export: true}}, import: ["special", "core"]}, core: {export: {"let-macro": {macro: function (definitions) {
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
      _g250.lua = join(["not", join(["number?", k])]);
      _g250.js = join(["isNaN", join(["parseInt", k])]);
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
      _g274.form = join(["quote", form]);
      _g274.macro = form;
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
  }, module: "core", export: true}}, import: ["utilities", "runtime", "special", "core"]}, boot: {export: {}, import: ["utilities", "special", "core"]}, system: {export: {nexus: {export: true, module: "system", global: true}}, import: ["special", "core"]}, reader: {export: {"define-reader": {macro: function (_g287) {
    var char = _g287[0];
    var stream = _g287[1];
    var body = unstash(sublist(arguments, 1));
    var _g288 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g288)]));
  }, module: "reader", export: true}, "read-all": {variable: true, module: "reader", export: true}, "read-table": {variable: true, module: "reader", export: true}, "make-stream": {variable: true, module: "reader", export: true}, read: {variable: true, module: "reader", export: true}, "read-from-string": {variable: true, module: "reader", export: true}}, import: ["special", "core"]}, lib: {export: {}, import: ["core", "special"]}, runtime: {export: {find: {variable: true, module: "runtime", export: true}, "read-file": {variable: true, module: "runtime", export: true}, pairwise: {variable: true, module: "runtime", export: true}, "map*": {variable: true, module: "runtime", export: true}, hd: {variable: true, module: "runtime", export: true}, tl: {variable: true, module: "runtime", export: true}, unstash: {variable: true, module: "runtime", export: true}, exit: {variable: true, module: "runtime", export: true}, char: {variable: true, module: "runtime", export: true}, "%message-handler": {variable: true, module: "runtime", export: true}, "some?": {variable: true, module: "runtime", export: true}, "composite?": {variable: true, module: "runtime", export: true}, "number?": {variable: true, module: "runtime", export: true}, "/": {variable: true, module: "runtime", export: true}, sublist: {variable: true, module: "runtime", export: true}, reduce: {variable: true, module: "runtime", export: true}, "+": {variable: true, module: "runtime", export: true}, "list?": {variable: true, module: "runtime", export: true}, "-": {variable: true, module: "runtime", export: true}, "atom?": {variable: true, module: "runtime", export: true}, "is?": {variable: true, module: "runtime", export: true}, exclude: {variable: true, module: "runtime", export: true}, split: {variable: true, module: "runtime", export: true}, "empty?": {variable: true, module: "runtime", export: true}, length: {variable: true, module: "runtime", export: true}, map: {variable: true, module: "runtime", export: true}, "*": {variable: true, module: "runtime", export: true}, sub: {variable: true, module: "runtime", export: true}, "parse-number": {variable: true, module: "runtime", export: true}, extend: {variable: true, module: "runtime", export: true}, replicate: {variable: true, module: "runtime", export: true}, "nil?": {variable: true, module: "runtime", export: true}, join: {variable: true, module: "runtime", export: true}, print: {variable: true, module: "runtime", export: true}, "<=": {variable: true, module: "runtime", export: true}, ">=": {variable: true, module: "runtime", export: true}, write: {variable: true, module: "runtime", export: true}, iterate: {variable: true, module: "runtime", export: true}, "<": {variable: true, module: "runtime", export: true}, ">": {variable: true, module: "runtime", export: true}, "id-literal?": {variable: true, module: "runtime", export: true}, add: {variable: true, module: "runtime", export: true}, "function?": {variable: true, module: "runtime", export: true}, reverse: {variable: true, module: "runtime", export: true}, splice: {variable: true, module: "runtime", export: true}, substring: {variable: true, module: "runtime", export: true}, "table?": {variable: true, module: "runtime", export: true}, drop: {variable: true, module: "runtime", export: true}, "%": {variable: true, module: "runtime", export: true}, inner: {variable: true, module: "runtime", export: true}, "boolean?": {variable: true, module: "runtime", export: true}, stash: {variable: true, module: "runtime", export: true}, cat: {variable: true, module: "runtime", export: true}, mapt: {variable: true, module: "runtime", export: true}, "string-literal?": {variable: true, module: "runtime", export: true}, keep: {variable: true, module: "runtime", export: true}, "to-string": {variable: true, module: "runtime", export: true}, code: {variable: true, module: "runtime", export: true}, "=": {variable: true, module: "runtime", export: true}, type: {variable: true, module: "runtime", export: true}, "keys?": {variable: true, module: "runtime", export: true}, search: {variable: true, module: "runtime", export: true}, last: {variable: true, module: "runtime", export: true}, apply: {variable: true, module: "runtime", export: true}, mapo: {variable: true, module: "runtime", export: true}, "string?": {variable: true, module: "runtime", export: true}, "write-file": {variable: true, module: "runtime", export: true}}, import: ["special", "core"]}, special: {export: {"get": {special: function (_g289) {
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
  }, stmt: true}}, import: ["utilities", "special", "core", "compiler"]}, compiler: {export: {"in-module": {variable: true, module: "compiler", export: true}, eval: {variable: true, module: "compiler", export: true}, "compile-branch": {variable: true, module: "compiler", export: true}, "compile-body": {variable: true, module: "compiler", export: true}, "compile-special": {variable: true, module: "compiler", export: true}, "current-module": {export: true, module: "compiler", global: true}, "load-module": {variable: true, module: "compiler", export: true}, "compile-call": {variable: true, module: "compiler", export: true}, "open-module": {variable: true, module: "compiler", export: true}, "define-module": {macro: function (spec) {
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
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g323 = 0;
    var _g322 = (exp || []);
    while ((_g323 < length(_g322))) {
      var k = _g322[_g323];
      setenv(k, {_stash: true, export: true});
      _g323 = (_g323 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}, compile: {variable: true, module: "compiler", export: true}, "compile-function": {variable: true, module: "compiler", export: true}}, import: ["utilities", "runtime", "special", "core", "reader"]}};
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
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g328 = 0;
    var _g327 = (exp || []);
    while ((_g328 < length(_g327))) {
      var k = _g327[_g328];
      setenv(k, {_stash: true, export: true});
      _g328 = (_g328 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}}];
})();
(function () {
  var _g38 = nexus.utilities;
  var indentation = _g38.indentation;
  var quote_environment = _g38["quote-environment"];
  var symbol63 = _g38["symbol?"];
  var getenv = _g38.getenv;
  var bind42 = _g38["bind*"];
  var quasiexpand = _g38.quasiexpand;
  var special_form63 = _g38["special-form?"];
  var exported = _g38.exported;
  var macro63 = _g38["macro?"];
  var macro_function = _g38["macro-function"];
  var quoted = _g38.quoted;
  var variable63 = _g38["variable?"];
  var symbol_expansion = _g38["symbol-expansion"];
  var initial_environment = _g38["initial-environment"];
  var stash42 = _g38["stash*"];
  var quote_modules = _g38["quote-modules"];
  var module_key = _g38["module-key"];
  var imported = _g38.imported;
  var setenv = _g38.setenv;
  var macroexpand = _g38.macroexpand;
  var valid_id63 = _g38["valid-id?"];
  var to_id = _g38["to-id"];
  var bound63 = _g38["bound?"];
  var bind = _g38.bind;
  var special63 = _g38["special?"];
  var _g70 = nexus.runtime;
  var find = _g70.find;
  var boolean63 = _g70["boolean?"];
  var pairwise = _g70.pairwise;
  var map42 = _g70["map*"];
  var hd = _g70.hd;
  var tl = _g70.tl;
  var unstash = _g70.unstash;
  var exit = _g70.exit;
  var char = _g70.char;
  var _37message_handler = _g70["%message-handler"];
  var some63 = _g70["some?"];
  var composite63 = _g70["composite?"];
  var number63 = _g70["number?"];
  var _47 = _g70["/"];
  var sublist = _g70.sublist;
  var reduce = _g70.reduce;
  var _43 = _g70["+"];
  var list63 = _g70["list?"];
  var _ = _g70["-"];
  var atom63 = _g70["atom?"];
  var keys63 = _g70["keys?"];
  var exclude = _g70.exclude;
  var split = _g70.split;
  var empty63 = _g70["empty?"];
  var length = _g70.length;
  var map = _g70.map;
  var _42 = _g70["*"];
  var sub = _g70.sub;
  var _37 = _g70["%"];
  var extend = _g70.extend;
  var replicate = _g70.replicate;
  var nil63 = _g70["nil?"];
  var join = _g70.join;
  var to_string = _g70["to-string"];
  var _6061 = _g70["<="];
  var _6261 = _g70[">="];
  var write = _g70.write;
  var iterate = _g70.iterate;
  var _60 = _g70["<"];
  var _62 = _g70[">"];
  var string_literal63 = _g70["string-literal?"];
  var add = _g70.add;
  var function63 = _g70["function?"];
  var reverse = _g70.reverse;
  var splice = _g70.splice;
  var substring = _g70.substring;
  var search = _g70.search;
  var drop = _g70.drop;
  var read_file = _g70["read-file"];
  var stash = _g70.stash;
  var cat = _g70.cat;
  var mapt = _g70.mapt;
  var apply = _g70.apply;
  var table63 = _g70["table?"];
  var parse_number = _g70["parse-number"];
  var code = _g70.code;
  var is63 = _g70["is?"];
  var _61 = _g70["="];
  var keep = _g70.keep;
  var string63 = _g70["string?"];
  var last = _g70.last;
  var id_literal63 = _g70["id-literal?"];
  var inner = _g70.inner;
  var mapo = _g70.mapo;
  var write_file = _g70["write-file"];
  var _g75 = nexus.reader;
  var read_all = _g75["read-all"];
  var read_table = _g75["read-table"];
  var make_stream = _g75["make-stream"];
  var read = _g75.read;
  var read_from_string = _g75["read-from-string"];
  var _g108 = nexus.compiler;
  var compile = _g108.compile;
  var eval = _g108.eval;
  var compile_branch = _g108["compile-branch"];
  var compile_body = _g108["compile-body"];
  var compile_special = _g108["compile-special"];
  var load_module = _g108["load-module"];
  var open_module = _g108["open-module"];
  var in_module = _g108["in-module"];
  var compile_call = _g108["compile-call"];
  var compile_function = _g108["compile-function"];
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
