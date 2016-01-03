if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(function(require) {
var exports = {};
setenv("quote", {_stash: true, macro: function (form) {
  return(quoted(form));
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (target === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (target === "lua") {
      i = ["+", i, 1];
    }
  }
  return(["get", l, i]);
}});
setenv("wipe", {_stash: true, macro: function (place) {
  if (target === "lua") {
    return(["set", place, "nil"]);
  } else {
    return(["%delete", place]);
  }
}});
setenv("list", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var x = unique("x");
  var l = [];
  var forms = [];
  var _o1 = body;
  var k = undefined;
  for (k in _o1) {
    var v = _o1[k];
    var _e3;
    if (numeric63(k)) {
      _e3 = parseInt(k);
    } else {
      _e3 = k;
    }
    var _k = _e3;
    if (number63(_k)) {
      l[_k] = v;
    } else {
      add(forms, ["set", ["get", x, ["quote", _k]], v]);
    }
  }
  if (some63(forms)) {
    return(join(["let", x, join(["%array"], l)], forms, [x]));
  } else {
    return(join(["%array"], l));
  }
}});
setenv("if", {_stash: true, macro: function () {
  var branches = unstash(Array.prototype.slice.call(arguments, 0));
  return(hd(expand_if(branches)));
}});
setenv("case", {_stash: true, macro: function (x) {
  var _r10 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id2 = _r10;
  var clauses = cut(_id2, 0);
  var bs = map(function (_x31) {
    var _id3 = _x31;
    var a = _id3[0];
    var b = _id3[1];
    if (nil63(b)) {
      return([a]);
    } else {
      return([["=", ["quote", a], x], b]);
    }
  }, pair(clauses));
  return(join(["if"], apply(join, bs)));
}});
setenv("when", {_stash: true, macro: function (cond) {
  var _r13 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id5 = _r13;
  var body = cut(_id5, 0);
  return(["if", cond, join(["do"], body)]);
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var _r15 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id7 = _r15;
  var body = cut(_id7, 0);
  return(["if", ["not", cond], join(["do"], body)]);
}});
setenv("obj", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  return(join(["%object"], mapo(function (x) {
    return(x);
  }, body)));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var _r19 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id11 = _r19;
  var body = cut(_id11, 0);
  if (atom63(bs)) {
    return(join(["let", [bs, hd(body)]], tl(body)));
  } else {
    if (none63(bs)) {
      return(join(["do"], body));
    } else {
      var _id12 = bs;
      var lh = _id12[0];
      var rh = _id12[1];
      var bs2 = cut(_id12, 2);
      var _id13 = bind(lh, rh);
      var id = _id13[0];
      var val = _id13[1];
      var bs1 = cut(_id13, 2);
      var renames = [];
      if (bound63(id) || toplevel63()) {
        var id1 = unique(id);
        renames = [id, id1];
        id = id1;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      return(["do", ["%local", id, val], ["let-symbol", renames, join(["let", join(bs1, bs2)], body)]]);
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var _r21 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id15 = _r21;
  var body = cut(_id15, 0);
  return(join(["let", [x, v]], body, [x]));
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var _r23 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id17 = _r23;
  var body = cut(_id17, 0);
  var y = unique("y");
  return(["let", y, v, ["when", y, join(["let", [x, y]], body)]]);
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var _r25 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id19 = _r25;
  var body = cut(_id19, 0);
  var _x89 = ["setenv", ["quote", name]];
  _x89.macro = join(["fn", args], body);
  var form = _x89;
  eval(form);
  return(form);
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var _r27 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id21 = _r27;
  var body = cut(_id21, 0);
  var _x96 = ["setenv", ["quote", name]];
  _x96.special = join(["fn", args], body);
  var form = join(_x96, keys(body));
  eval(form);
  return(form);
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var _x102 = ["setenv", ["quote", name]];
  _x102.symbol = ["quote", expansion];
  return(_x102);
}});
setenv("define-reader", {_stash: true, macro: function (_x111) {
  var _id24 = _x111;
  var char = _id24[0];
  var s = _id24[1];
  var _r31 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id25 = _r31;
  var body = cut(_id25, 0);
  return(["set", ["get", "read-table", char], join(["fn", [s]], body)]);
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var _r33 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id27 = _r33;
  var body = cut(_id27, 0);
  setenv(name, {_stash: true, variable: true});
  if (some63(body)) {
    return(join(["%local-function", name], bind42(x, body)));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var _r35 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id29 = _r35;
  var body = cut(_id29, 0);
  setenv(name, {_stash: true, toplevel: true, variable: true});
  if (some63(body)) {
    return(join(["%global-function", name], bind42(x, body)));
  } else {
    return(["set", name, x]);
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var body = unstash(Array.prototype.slice.call(arguments, 0));
  var x = unique("x");
  return(["do", ["add", "environment", ["obj"]], ["with", x, join(["do"], body), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (_x144) {
  var _id32 = _x144;
  var names = _id32[0];
  var _r37 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id33 = _r37;
  var body = cut(_id33, 0);
  var x = unique("x");
  var _x147 = ["setenv", x];
  _x147.variable = true;
  return(join(["with-frame", ["each", x, names, _x147]], body));
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var _r40 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id35 = _r40;
  var body = cut(_id35, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _x152 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x152);
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var _r44 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id38 = _r44;
  var body = cut(_id38, 0);
  add(environment, {});
  map(function (_x161) {
    var _id39 = _x161;
    var name = _id39[0];
    var exp = _id39[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pair(expansions));
  var _x160 = join(["do"], macroexpand(body));
  drop(environment);
  return(_x160);
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var _r48 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id41 = _r48;
  var body = cut(_id41, 0);
  var bs = map(function (n) {
    return([n, ["unique", ["quote", n]]]);
  }, names);
  return(join(["let", apply(join, bs)], body));
}});
setenv("fn", {_stash: true, macro: function (args) {
  var _r51 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id43 = _r51;
  var body = cut(_id43, 0);
  return(join(["%function"], bind42(args, body)));
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return([["fn", join(), ["%try", ["list", true, expr]]]]);
  } else {
    var x = unique("x");
    var msg = unique("msg");
    var trace = unique("trace");
    return(["let", [x, "nil", msg, "nil", trace, "nil"], ["if", ["xpcall", ["fn", join(), ["set", x, expr]], ["fn", ["m"], ["set", msg, ["clip", "m", ["+", ["search", "m", "\": \""], 2]]], ["set", trace, [["get", "debug", ["quote", "traceback"]]]]]], ["list", true, x], ["list", false, msg, trace]]]);
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var _r55 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id46 = _r55;
  var body = cut(_id46, 0);
  var o = unique("o");
  var n = unique("n");
  var i = unique("i");
  var _e4;
  if (atom63(x)) {
    _e4 = [i, x];
  } else {
    var _e5;
    if (_35(x) > 1) {
      _e5 = x;
    } else {
      _e5 = [i, hd(x)];
    }
    _e4 = _e5;
  }
  var _id47 = _e4;
  var k = _id47[0];
  var v = _id47[1];
  var _e6;
  if (target === "lua") {
    _e6 = body;
  } else {
    _e6 = [join(["let", k, ["if", ["numeric?", k], ["parseInt", k], k]], body)];
  }
  return(["let", [o, t, k, "nil"], ["%for", o, k, join(["let", [v, ["get", o, k]]], _e6)]]);
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var _r57 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id49 = _r57;
  var body = cut(_id49, 0);
  return(["let", i, 0, join(["while", ["<", i, to]], body, [["inc", i]])]);
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var _r59 = unstash(Array.prototype.slice.call(arguments, 2));
  var _id51 = _r59;
  var body = cut(_id51, 0);
  var x = unique("x");
  var n = unique("n");
  var i = unique("i");
  return(["let", [x, t, n, ["#", x]], ["for", i, n, join(["let", [v, ["at", x, i]]], body)]]);
}});
setenv("set-of", {_stash: true, macro: function () {
  var xs = unstash(Array.prototype.slice.call(arguments, 0));
  var l = [];
  var _o3 = xs;
  var _i3 = undefined;
  for (_i3 in _o3) {
    var x = _o3[_i3];
    var _e7;
    if (numeric63(_i3)) {
      _e7 = parseInt(_i3);
    } else {
      _e7 = _i3;
    }
    var __i3 = _e7;
    l[x] = true;
  }
  return(join(["obj"], l));
}});
setenv("language", {_stash: true, macro: function () {
  return(["quote", target]);
}});
setenv("target", {_stash: true, macro: function () {
  var clauses = unstash(Array.prototype.slice.call(arguments, 0));
  return(clauses[target]);
}});
setenv("join!", {_stash: true, macro: function (a) {
  var _r63 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id53 = _r63;
  var bs = cut(_id53, 0);
  return(["set", a, join(["join", a], bs)]);
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var _r65 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id55 = _r65;
  var bs = cut(_id55, 0);
  return(["set", a, join(["cat", a], bs)]);
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  return(["set", n, ["+", n, by || 1]]);
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  return(["set", n, ["-", n, by || 1]]);
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var x = unique("x");
  return(["do", ["inc", "indent-level"], ["with", x, form, ["dec", "indent-level"]]]);
}});
setenv("export", {_stash: true, macro: function () {
  var names = unstash(Array.prototype.slice.call(arguments, 0));
  if (target === "js") {
    return(join(["do"], map(function (k) {
      return(["set", ["get", "exports", ["quote", k]], k]);
    }, names)));
  } else {
    var x = {};
    var _o5 = names;
    var _i5 = undefined;
    for (_i5 in _o5) {
      var k = _o5[_i5];
      var _e8;
      if (numeric63(_i5)) {
        _e8 = parseInt(_i5);
      } else {
        _e8 = _i5;
      }
      var __i5 = _e8;
      x[k] = k;
    }
    return(["return", join(["obj"], x)]);
  }
}});
return exports;
});
