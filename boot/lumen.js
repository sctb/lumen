modules = {lib: {toplevel: {splice: {module: "lib", export: true, variable: true}, code: {module: "lib", export: true, variable: true}, "with-frame": {form: ["fn", "body", ["let", ["x", ["make-id"]], ["quasiquote", ["do", ["add", "environment", ["table"]], ["let", [["unquote", "x"], ["do", ["unquote-splicing", "body"]]], ["drop", "environment"], ["unquote", "x"]]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, module: "lib"}, fn: {form: ["fn", (function () {
  var _g2 = ["args"];
  _g2.rest = "body";
  return(_g2);
})(), ["let", [["args", "body"], ["bind-arguments", "args", "body"]], ["quasiquote", ["%function", ["unquote", "args"], ["unquote-splicing", "body"]]]]], export: true, macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g3 = sub(body, 0);
  var _g4 = bind_arguments(args, _g3);
  var args = _g4[0];
  var _g5 = _g4[1];
  return(join(["%function", args], _g5));
}, module: "lib"}, "join!": {form: ["fn", (function () {
  var _g6 = ["a"];
  _g6.rest = "bs";
  return(_g6);
})(), ["quasiquote", ["set", ["unquote", "a"], ["join*", ["unquote", "a"], ["unquote-splicing", "bs"]]]]], export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g7 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g7)]);
}, module: "lib"}, "quasisplice?": {module: "lib", variable: true}, "symbol?": {module: "lib", variable: true}, "<=": {module: "lib", export: true, variable: true}, char: {module: "lib", export: true, variable: true}, "bind-arguments": {module: "lib", variable: true}, join: {module: "lib", export: true, variable: true}, split: {module: "lib", export: true, variable: true}, "macro-function": {module: "lib", variable: true}, let: {form: ["fn", (function () {
  var _g8 = ["bindings"];
  _g8.rest = "body";
  return(_g8);
})(), ["let", ["i", 0, "renames", [], "locals", []], ["map", ["fn", [["lh", "rh"]], ["across", [["bind", "lh", "rh"], ["id", "val"]], ["if", ["bound?", "id"], ["let", ["rename", ["make-id"]], ["add", "renames", "id"], ["add", "renames", "rename"], ["set", "id", "rename"]], (function () {
  var _g9 = ["setenv", "id"];
  _g9.variable = true;
  return(_g9);
})()], ["add", "locals", ["quasiquote", ["%local", ["unquote", "id"], ["unquote", "val"]]]]]], ["pairwise", "bindings"]], ["quasiquote", ["do", ["unquote-splicing", "locals"], ["let-symbol", ["unquote", "renames"], ["unquote-splicing", "body"]]]]]], export: true, macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g10 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g11) {
    var lh = _g11[0];
    var rh = _g11[1];
    var _g13 = 0;
    var _g12 = bind(lh, rh);
    while ((_g13 < length(_g12))) {
      var _g14 = _g12[_g13];
      var id = _g14[0];
      var val = _g14[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g13 = (_g13 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g10)])));
}, module: "lib"}, search: {module: "lib", export: true, variable: true}, write: {module: "lib", export: true, variable: true}, "bound?": {module: "lib", variable: true}, "define-special": {form: ["fn", (function () {
  var _g15 = ["name", "args"];
  _g15.rest = "body";
  return(_g15);
})(), ["let", ["form", ["quasiquote", ["fn", ["unquote", "args"], ["unquote-splicing", "body"]]], "keys", ["sub", "body", ["length", "body"]]], ["eval", ["quasiquote", (function () {
  var _g16 = ["setenv", ["quote", ["unquote", "name"]], ["unquote-splicing", "keys"]];
  _g16.form = ["quote", ["unquote", "form"]];
  _g16.special = ["unquote", "form"];
  return(_g16);
})()]]], "nil"], export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g17 = sub(body, 0);
  var form = join(["fn", args], _g17);
  var keys = sub(_g17, length(_g17));
  eval(join((function () {
    var _g18 = ["setenv", ["quote", name]];
    _g18.form = ["quote", form];
    _g18.special = form;
    return(_g18);
  })(), keys));
  return(undefined);
}, module: "lib"}, target: {form: ["fn", "clauses", ["get", "clauses", "target"]], macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, module: "lib", export: true, variable: true}, inner: {module: "lib", export: true, variable: true}, _g45: {module: "lib", variable: true}, "atom?": {module: "lib", export: true, variable: true}, _g37: {module: "lib", variable: true}, getenv: {module: "lib", export: true, variable: true}, "is?": {module: "lib", export: true, variable: true}, "read-file": {module: "lib", export: true, variable: true}, "make-id": {module: "lib", export: true, variable: true}, _g36: {module: "lib", variable: true}, type: {module: "lib", export: true, variable: true}, "variable?": {module: "lib", variable: true}, sublist: {module: "lib", variable: true}, "+": {module: "lib", export: true, variable: true}, "*": {module: "lib", export: true, variable: true}, substring: {module: "lib", variable: true}, "list?": {module: "lib", export: true, variable: true}, "%": {module: "lib", export: true, variable: true}, "define-local": {form: ["fn", (function () {
  var _g19 = ["name", "x"];
  _g19.rest = "body";
  return(_g19);
})(), (function () {
  var _g20 = ["setenv", "name"];
  _g20.variable = true;
  return(_g20);
})(), ["if", ["not", ["empty?", "body"]], ["let", [["args", "body"], ["bind-arguments", "x", "body"]], ["quasiquote", ["%local-function", ["unquote", "name"], ["unquote", "args"], ["unquote-splicing", "body"]]]], ["quasiquote", ["%local", ["unquote", "name"], ["unquote", "x"]]]]], export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g21 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g21))) {
    var _g22 = bind_arguments(x, _g21);
    var args = _g22[0];
    var _g23 = _g22[1];
    return(join(["%local-function", name, args], _g23));
  } else {
    return(["%local", name, x]);
  }
}, module: "lib"}, define: {form: ["fn", (function () {
  var _g24 = ["name", "x"];
  _g24.rest = "body";
  return(_g24);
})(), (function () {
  var _g26 = ["setenv", "name"];
  _g26.variable = true;
  return(_g26);
})(), ["quasiquote", ["define-global", ["unquote", "name"], ["unquote", "x"], ["unquote-splicing", "body"]]]], export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g27 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g27));
}, module: "lib"}, mapo: {module: "lib", export: true, variable: true}, "with-bindings": {form: ["fn", (function () {
  var _g28 = [["names"]];
  _g28.rest = "body";
  return(_g28);
})(), ["let", ["x", ["make-id"]], ["quasiquote", ["with-frame", ["across", [["unquote", "names"], ["unquote", "x"]], (function () {
  var _g29 = ["setenv", ["unquote", "x"]];
  _g29.variable = true;
  return(_g29);
})()], ["unquote-splicing", "body"]]]]], export: true, macro: function (_g30) {
  var names = _g30[0];
  var body = unstash(sublist(arguments, 1));
  var _g31 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g32 = ["setenv", x];
    _g32.variable = true;
    return(_g32);
  })()]], _g31));
}, module: "lib"}, "list*": {form: ["fn", "xs", ["if", ["empty?", "xs"], [], ["let", ["l", []], ["across", ["xs", "x", "i"], ["if", ["=", "i", ["-", ["length", "xs"], 1]], ["set", "l", ["list", ["quote", "join"], ["join", ["quote", ["list"]], "l"], "x"]], ["add", "l", "x"]]], "l"]]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g33 = xs;
    while ((i < length(_g33))) {
      var x = _g33[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, module: "lib"}, "<": {module: "lib", export: true, variable: true}, language: {form: ["fn", [], ["quasiquote", ["quote", ["unquote", "target"]]]], export: true, macro: function () {
  return(["quote", target]);
}, module: "lib"}, _g32: {module: "lib", variable: true}, add: {module: "lib", export: true, variable: true}, "/": {module: "lib", export: true, variable: true}, table: {form: ["fn", "body", ["quasiquote", ["%object", ["unquote-splicing", ["mapo", ["fn", ["_g5", "x"], "x"], "body"]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g5, x) {
    return(x);
  }, body)));
}, module: "lib"}, "-": {module: "lib", export: true, variable: true}, find: {module: "lib", export: true, variable: true}, "parse-number": {module: "lib", export: true, variable: true}, mapt: {module: "lib", export: true, variable: true}, quasiexpand: {module: "lib", variable: true}, "cat": {module: "lib", export: true, variable: true}, "quasiquoting?": {module: "lib", variable: true}, bind: {module: "lib", variable: true}, "quasiquote-list": {module: "lib", variable: true}, "=": {module: "lib", export: true, variable: true}, ">": {module: "lib", export: true, variable: true}, "string?": {module: "lib", export: true, variable: true}, _g39: {module: "lib", variable: true}, "cat!": {form: ["fn", (function () {
  var _g34 = ["a"];
  _g34.rest = "bs";
  return(_g34);
})(), ["quasiquote", ["set", ["unquote", "a"], ["cat", ["unquote", "a"], ["unquote-splicing", "bs"]]]]], export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g35 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g35)]);
}, module: "lib"}, "quoting?": {module: "lib", variable: true}, _g48: {module: "lib", variable: true}, "let-symbol": {form: ["fn", (function () {
  var _g37 = ["expansions"];
  _g37.rest = "body";
  return(_g37);
})(), ["with-frame", ["map", ["fn", [["name", "exp"]], ["macroexpand", ["quasiquote", ["define-symbol", ["unquote", "name"], ["unquote", "exp"]]]]], ["pairwise", "expansions"]], ["quasiquote", ["do", ["unquote-splicing", ["macroexpand", "body"]]]]]], export: true, macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g38 = sub(body, 0);
  add(environment, {});
  var _g39 = (function () {
    map(function (_g40) {
      var name = _g40[0];
      var exp = _g40[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g38)));
  })();
  drop(environment);
  return(_g39);
}, module: "lib"}, escape: {module: "lib", variable: true}, apply: {module: "lib", export: true, variable: true}, "keys?": {module: "lib", export: true, variable: true}, quasiquote: {form: ["fn", ["form"], ["quasiexpand", "form", 1]], export: true, macro: function (form) {
  return(quasiexpand(form, 1));
}, module: "lib"}, _g99: {module: "lib", variable: true}, map: {module: "lib", export: true, variable: true}, length: {module: "lib", export: true, variable: true}, _g17: {module: "lib", variable: true}, exit: {module: "lib", export: true, variable: true}, setenv: {module: "lib", export: true, variable: true}, _g112: {module: "lib", variable: true}, print: {module: "lib", export: true, variable: true}, "define-symbol": {form: ["fn", ["name", "expansion"], (function () {
  var _g41 = ["setenv", "name"];
  _g41.symbol = "expansion";
  return(_g41);
})(), "nil"], export: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, module: "lib"}, "id-count": {module: "lib", variable: true}, each: {form: ["fn", (function () {
  var _g42 = [["t", "k", "v"]];
  _g42.rest = "body";
  return(_g42);
})(), ["let", ["t1", ["make-id"]], ["quasiquote", ["let", [["unquote", "k"], "nil", ["unquote", "t1"], ["unquote", "t"]], ["%for", [["unquote", "t1"], ["unquote", "k"]], ["if", (function () {
  var _g43 = ["target"];
  _g43.lua = ["not", ["number?", ["unquote", "k"]]];
  _g43.js = ["isNaN", ["parseInt", ["unquote", "k"]]];
  return(_g43);
})(), ["let", [["unquote", "v"], ["get", ["unquote", "t1"], ["unquote", "k"]]], ["unquote-splicing", "body"]]]]]]]], export: true, macro: function (_g44) {
  var t = _g44[0];
  var k = _g44[1];
  var v = _g44[2];
  var body = unstash(sublist(arguments, 1));
  var _g45 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g46 = ["target"];
    _g46.lua = ["not", ["number?", k]];
    _g46.js = ["isNaN", ["parseInt", k]];
    return(_g46);
  })(), join(["let", [v, ["get", t1, k]]], _g45)]]]);
}, module: "lib"}, keep: {module: "lib", export: true, variable: true}, _g94: {module: "lib", variable: true}, unstash: {module: "lib", export: true, variable: true}, exclude: {module: "lib", export: true, variable: true}, iterate: {module: "lib", export: true, variable: true}, "number?": {module: "lib", export: true, variable: true}, "map*": {module: "lib", export: true, variable: true}, "symbol-expansion": {module: "lib", variable: true}, _g31: {module: "lib", variable: true}, "composite?": {module: "lib", export: true, variable: true}, across: {form: ["fn", (function () {
  var _g47 = [["l", "v", "i", "start"]];
  _g47.rest = "body";
  return(_g47);
})(), ["let", ["l1", ["make-id"]], ["set", "i", ["or", "i", ["make-id"]]], ["set", "start", ["or", "start", 0]], ["quasiquote", ["let", [["unquote", "i"], ["unquote", "start"], ["unquote", "l1"], ["unquote", "l"]], ["while", ["<", ["unquote", "i"], ["length", ["unquote", "l1"]]], ["let", [["unquote", "v"], ["at", ["unquote", "l1"], ["unquote", "i"]]], ["unquote-splicing", "body"], ["inc", ["unquote", "i"]]]]]]]], export: true, macro: function (_g48) {
  var l = _g48[0];
  var v = _g48[1];
  var i = _g48[2];
  var start = _g48[3];
  var body = unstash(sublist(arguments, 1));
  var _g49 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g49, [["inc", i]]))]]);
}, module: "lib"}, "table?": {module: "lib", export: true, variable: true}, guard: {form: ["fn", ["expr"], ["if", ["=", "target", ["quote", "js"]], ["quasiquote", [["fn", [], ["%try", ["list", true, ["unquote", "expr"]]]]]], ["let", ["e", ["make-id"], "x", ["make-id"], "ex", ["cat", "\"|\"", "e", "\",\"", "x", "\"|\""]], ["quasiquote", ["let", [["unquote", "ex"], ["xpcall", ["fn", [], ["unquote", "expr"]], "message-handler"]], ["list", ["unquote", "e"], ["unquote", "x"]]]]]]], export: true, macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, module: "lib"}, "special?": {module: "lib", export: true, variable: true}, drop: {module: "lib", export: true, variable: true}, _g52: {module: "lib", variable: true}, "%export": {form: ["fn", [], ["let", ["toplevel", ["hd", "environment"], "m", ["make-id"], "k", ["module-key", "current-module"], "body", ["quasiquote", [["define", ["unquote", "m"], ["get", "modules", ["quote", ["unquote", "k"]]]]]]], ["each", ["toplevel", "k", "v"], ["let", ["b", ["quasiquote", ["get", ["get", ["unquote", "m"], ["quote", ["unquote", "k"]]], ["quote", "variable"]]]], ["if", ["and", ["get", "v", ["quote", "variable"]], ["=", ["get", "v", ["quote", "module"]], "current-module"]], ["add", "body", ["quasiquote", ["set", ["unquote", "b"], ["unquote", "k"]]]]]]], ["quasiquote", ["do", ["unquote-splicing", "body"]]]]], export: true, macro: function () {
  var toplevel = hd(environment);
  var m = make_id();
  var k = module_key(current_module);
  var body = [["define", m, ["get", "modules", ["quote", k]]]];
  var k = undefined;
  var _g50 = toplevel;
  for (k in _g50) {
    if (isNaN(parseInt(k))) {
      var v = _g50[k];
      var b = ["get", ["get", m, ["quote", k]], ["quote", "variable"]];
      if ((v.variable && (v.module === current_module))) {
        add(body, ["set", b, k]);
      }
    }
  }
  return(join(["do"], body));
}, module: "lib"}, hd: {module: "lib", export: true, variable: true}, "special-form?": {module: "lib", export: true, variable: true}, _g22: {module: "lib", variable: true}, reverse: {module: "lib", export: true, variable: true}, _g27: {module: "lib", variable: true}, inc: {form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["+", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]], export: true, macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, module: "lib"}, quoted: {module: "lib", export: true, variable: true}, "can-unquote?": {module: "lib", variable: true}, pairwise: {module: "lib", export: true, variable: true}, macroexpand: {module: "lib", export: true, variable: true}, "splice?": {module: "lib", variable: true}, "set-of": {form: ["fn", "elements", ["let", ["l", []], ["across", ["elements", "e"], ["set", ["get", "l", "e"], true]], ["quasiquote", ["table", ["unquote-splicing", "l"]]]]], export: true, macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g52 = 0;
  var _g51 = elements;
  while ((_g52 < length(_g51))) {
    var e = _g51[_g52];
    l[e] = true;
    _g52 = (_g52 + 1);
  }
  return(join(["table"], l));
}, module: "lib"}, _g18: {module: "lib", variable: true}, extend: {module: "lib", export: true, variable: true}, "string-literal?": {module: "lib", export: true, variable: true}, "write-file": {module: "lib", export: true, variable: true}, last: {module: "lib", export: true, variable: true}, "id-literal?": {module: "lib", export: true, variable: true}, quote: {form: ["fn", ["form"], ["quoted", "form"]], export: true, macro: function (form) {
  return(quoted(form));
}, module: "lib"}, _g21: {module: "lib", variable: true}, "function?": {module: "lib", export: true, variable: true}, "let-macro": {form: ["fn", (function () {
  var _g53 = ["definitions"];
  _g53.rest = "body";
  return(_g53);
})(), ["with-frame", ["map", ["fn", ["m"], ["macroexpand", ["quasiquote", ["define-macro", ["unquote-splicing", "m"]]]]], "definitions"], ["quasiquote", ["do", ["unquote-splicing", ["macroexpand", "body"]]]]]], export: true, macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g54 = sub(body, 0);
  add(environment, {});
  var _g55 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g54)));
  })();
  drop(environment);
  return(_g55);
}, module: "lib"}, "empty?": {module: "lib", export: true, variable: true}, list: {form: ["fn", "body", ["let", ["l", ["quasiquote", ["%array", ["unquote-splicing", "body"]]]], ["if", ["not", ["keys?", "body"]], "l", ["let", ["id", ["make-id"], "init", []], ["each", ["body", "k", "v"], ["add", "init", ["quasiquote", ["set", ["get", ["unquote", "id"], ["quote", ["unquote", "k"]]], ["unquote", "v"]]]]], ["quasiquote", ["let", [["unquote", "id"], ["unquote", "l"]], ["unquote-splicing", "init"], ["unquote", "id"]]]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g56 = body;
    for (k in _g56) {
      if (isNaN(parseInt(k))) {
        var v = _g56[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, module: "lib"}, _g25: {module: "lib", variable: true}, "nil?": {module: "lib", export: true, variable: true}, _g56: {module: "lib", variable: true}, "define-macro": {form: ["fn", (function () {
  var _g57 = ["name", "args"];
  _g57.rest = "body";
  return(_g57);
})(), ["let", ["form", ["quasiquote", ["fn", ["unquote", "args"], ["unquote-splicing", "body"]]]], ["eval", ["quasiquote", (function () {
  var _g58 = ["setenv", ["quote", ["unquote", "name"]]];
  _g58.macro = ["unquote", "form"];
  _g58.form = ["quote", ["unquote", "form"]];
  return(_g58);
})()]]], "nil"], export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g59 = sub(body, 0);
  var form = join(["fn", args], _g59);
  eval((function () {
    var _g60 = ["setenv", ["quote", name]];
    _g60.macro = form;
    _g60.form = ["quote", form];
    return(_g60);
  })());
  return(undefined);
}, module: "lib"}, "join*": {form: ["fn", "xs", ["reduce", ["fn", ["a", "b"], ["list", ["quote", "join"], "a", "b"]], "xs"]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, module: "lib"}, reduce: {module: "lib", export: true, variable: true}, "boolean?": {module: "lib", export: true, variable: true}, _g59: {module: "lib", variable: true}, pr: {form: ["fn", "xs", ["let", ["xs", ["map", ["fn", ["x"], ["splice", ["quasiquote", [["to-string", ["unquote", "x"]], "\" \""]]]], "xs"]], ["quasiquote", ["print", ["cat", ["unquote-splicing", "xs"]]]]]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, module: "lib"}, _g26: {module: "lib", variable: true}, _g44: {module: "lib", variable: true}, "macro?": {module: "lib", variable: true}, "message-handler": {module: "lib", variable: true}, at: {form: ["fn", ["l", "i"], ["if", ["and", ["=", "target", ["quote", "lua"]], ["number?", "i"]], ["inc", "i"], ["=", "target", ["quote", "lua"]], ["set", "i", ["quasiquote", ["+", ["unquote", "i"], 1]]]], ["quasiquote", ["get", ["unquote", "l"], ["unquote", "i"]]]], export: true, macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, module: "lib"}, replicate: {module: "lib", export: true, variable: true}, stash: {module: "lib", variable: true}, ">=": {module: "lib", export: true, variable: true}, fs: {module: "lib", variable: true}, _g40: {module: "lib", variable: true}, dec: {form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["-", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]], export: true, macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, module: "lib"}, _g100: {module: "lib", variable: true}, "to-string": {module: "lib", export: true, variable: true}, sub: {module: "lib", export: true, variable: true}, "stash*": {module: "lib", export: true, variable: true}, tl: {module: "lib", export: true, variable: true}, "define-global": {form: ["fn", (function () {
  var _g61 = ["name", "x"];
  _g61.rest = "body";
  return(_g61);
})(), (function () {
  var _g62 = ["setenv", "name"];
  _g62.variable = true;
  return(_g62);
})(), ["if", ["not", ["empty?", "body"]], ["let", [["args", "body"], ["bind-arguments", "x", "body"]], ["quasiquote", ["%global-function", ["unquote", "name"], ["unquote", "args"], ["unquote-splicing", "body"]]]], ["quasiquote", ["set", ["unquote", "name"], ["unquote", "x"]]]]], export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g63 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g63))) {
    var _g64 = bind_arguments(x, _g63);
    var args = _g64[0];
    var _g65 = _g64[1];
    return(join(["%global-function", name, args], _g65));
  } else {
    return(["set", name, x]);
  }
}, module: "lib"}}, import: ["lib", "compiler"]}, boot: {toplevel: {}, import: ["lib", "compiler"]}, compiler: {toplevel: {_g156: {module: "compiler", variable: true}, "module-path": {module: "compiler", variable: true}, "current-module": {module: "compiler", export: true, variable: true}, "valid-char?": {module: "compiler", variable: true}, "compile-file": {module: "compiler", variable: true}, infix: {module: "compiler", variable: true}, "if": {form: (function () {
  var _g66 = ["fn", ["form", "tail?"], ["let", ["str", "\"\""], ["across", ["form", "condition", "i"], ["let", ["last?", [">=", "i", ["-", ["length", "form"], 2]], "else?", ["=", "i", ["-", ["length", "form"], 1]], "first?", ["=", "i", 0], "body", ["at", "form", ["+", "i", 1]]], ["if", "else?", ["do", ["set", "body", "condition"], ["set", "condition", "nil"]]], ["cat!", "str", ["compile-branch", "condition", "body", "first?", "last?", "tail?"]]], ["inc", "i"]], "str"]];
  _g66.stmt = true;
  _g66.tr = true;
  return(_g66);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g67 = form;
  while ((i < length(_g67))) {
    var condition = _g67[i];
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
}}, _g161: {module: "compiler", variable: true}, "break": {form: (function () {
  var _g68 = ["fn", ["_g122"], ["cat", ["indentation"], "\"break\""]];
  _g68.stmt = true;
  return(_g68);
})(), export: true, module: "compiler", stmt: true, special: function (_g122) {
  return((indentation() + "break"));
}}, _g165: {module: "compiler", variable: true}, _g167: {module: "compiler", variable: true}, "quote-frame": {module: "compiler", variable: true}, _g141: {module: "compiler", variable: true}, "initial-environment": {module: "compiler", variable: true}, "compile-special": {module: "compiler", variable: true}, eval: {module: "compiler", export: true, variable: true}, "set": {form: (function () {
  var _g69 = ["fn", [["lh", "rh"]], ["if", ["nil?", "rh"], ["error", "\"Missing right-hand side in assignment\""]], ["cat", ["indentation"], ["compile", "lh"], "\" = \"", ["compile", "rh"]]];
  _g69.stmt = true;
  return(_g69);
})(), export: true, module: "compiler", stmt: true, special: function (_g70) {
  var lh = _g70[0];
  var rh = _g70[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}}, "compile-toplevel": {module: "compiler", export: true, variable: true}, "define-module": {form: ["fn", (function () {
  var _g71 = ["spec"];
  _g71.rest = "body";
  return(_g71);
})(), ["let", [(function () {
  var _g72 = [];
  _g72.export = "exp";
  _g72.import = "imp";
  return(_g72);
})(), "body"], ["map", "load-module", "imp"], ["set", ["get", "modules", ["module-key", "spec"]], (function () {
  var _g73 = ["table"];
  _g73.toplevel = ["table"];
  _g73.import = "imp";
  return(_g73);
})()], ["across", [["or", "exp", []], "k"], (function () {
  var _g74 = ["setenv", "k"];
  _g74.export = true;
  return(_g74);
})()]], "nil"], export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g75 = sub(body, 0);
  var exp = _g75.export;
  var imp = _g75.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp};
  var _g77 = 0;
  var _g76 = (exp || []);
  while ((_g77 < length(_g76))) {
    var k = _g76[_g77];
    setenv(k, {_stash: true, export: true});
    _g77 = (_g77 + 1);
  }
  return(undefined);
}, module: "compiler"}, "compiler-output": {module: "compiler", export: true, variable: true}, _g158: {module: "compiler", variable: true}, "%function": {form: ["fn", [(function () {
  var _g78 = ["args"];
  _g78.rest = "body";
  return(_g78);
})()], ["compile-function", "args", "body"]], special: function (_g79) {
  var args = _g79[0];
  var body = sub(_g79, 1);
  return(compile_function(args, body));
}, export: true, module: "compiler"}, _g154: {module: "compiler", variable: true}, "indent-level": {module: "compiler", variable: true}, _g149: {module: "compiler", variable: true}, "%array": {form: ["fn", ["forms"], ["let", ["open", ["if", ["=", "target", ["quote", "lua"]], "\"{\"", "\"[\""], "close", ["if", ["=", "target", ["quote", "lua"]], "\"}\"", "\"]\""], "str", "\"\""], ["across", ["forms", "x", "i"], ["cat!", "str", ["compile", "x"]], ["if", ["<", "i", ["-", ["length", "forms"], 1]], ["cat!", "str", "\", \""]]], ["cat", "open", "str", "close"]]], special: function (forms) {
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
  var _g80 = forms;
  while ((i < length(_g80))) {
    var x = _g80[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}, export: true, module: "compiler"}, "load-module": {module: "compiler", export: true, variable: true}, "return": {form: (function () {
  var _g81 = ["fn", [["x"]], ["let", ["x", ["if", ["nil?", "x"], "\"return\"", ["compile-call", ["quasiquote", ["return", ["unquote", "x"]]]]]], ["cat", ["indentation"], "x"]]];
  _g81.stmt = true;
  return(_g81);
})(), export: true, module: "compiler", stmt: true, special: function (_g82) {
  var x = _g82[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}}, _g152: {module: "compiler", variable: true}, "get": {form: ["fn", [["t", "k"]], ["let", ["t", ["compile", "t"], "k1", ["compile", "k"]], ["if", ["and", ["=", "target", ["quote", "lua"]], ["=", ["char", "t", 0], "\"{\""]], ["set", "t", ["cat", "\"(\"", "t", "\")\""]]], ["if", ["and", ["string-literal?", "k"], ["valid-id?", ["inner", "k"]]], ["cat", "t", "\".\"", ["inner", "k"]], ["cat", "t", "\"[\"", "k1", "\"]\""]]]], special: function (_g83) {
  var t = _g83[0];
  var k = _g83[1];
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
}, export: true, module: "compiler"}, "quote-binding": {module: "compiler", variable: true}, "in-module": {module: "compiler", export: true, variable: true}, "numeric?": {module: "compiler", variable: true}, _g150: {module: "compiler", variable: true}, "compile-args": {module: "compiler", variable: true}, "infix?": {module: "compiler", variable: true}, "quote-m0dules": {module: "compiler", export: true, variable: true}, "%local": {form: (function () {
  var _g84 = ["fn", [["name", "value"]], ["let", ["id", ["compile", "name"], "value", ["compile", "value"], "keyword", ["if", ["=", "target", ["quote", "js"]], "\"var \"", "\"local \""], "ind", ["indentation"]], ["cat", "ind", "keyword", "id", "\" = \"", "value"]]];
  _g84.stmt = true;
  return(_g84);
})(), export: true, module: "compiler", stmt: true, special: function (_g85) {
  var name = _g85[0];
  var value = _g85[1];
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
}}, "%compile-module": {module: "compiler", variable: true}, _g163: {module: "compiler", variable: true}, run: {module: "compiler", variable: true}, "%object": {form: ["fn", ["forms"], ["let", ["str", "\"{\"", "sep", ["if", ["=", "target", ["quote", "lua"]], "\" = \"", "\": \""], "pairs", ["pairwise", "forms"]], ["across", ["pairs", ["k", "v"], "i"], ["if", ["not", ["string?", "k"]], ["error", ["cat", "\"Illegal key: \"", ["to-string", "k"]]]], ["let", ["v", ["compile", "v"], "k", ["if", ["valid-id?", "k"], "k", ["and", ["=", "target", ["quote", "js"]], ["string-literal?", "k"]], "k", ["=", "target", ["quote", "js"]], ["quoted", "k"], ["string-literal?", "k"], ["cat", "\"[\"", "k", "\"]\""], ["cat", "\"[\"", ["quoted", "k"], "\"]\""]]], ["cat!", "str", "k", "sep", "v"]], ["if", ["<", "i", ["-", ["length", "pairs"], 1]], ["cat!", "str", "\", \""]]], ["cat", "str", "\"}\""]]], special: function (forms) {
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
  var _g86 = pairs;
  while ((i < length(_g86))) {
    var _g87 = _g86[i];
    var k = _g87[0];
    var v = _g87[1];
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
}, export: true, module: "compiler"}, "while": {form: (function () {
  var _g88 = ["fn", [(function () {
    var _g89 = ["condition"];
    _g89.rest = "body";
    return(_g89);
  })()], ["let", ["condition", ["compile", "condition"], "body", ["with-indent", ["compile-body", "body"]], "ind", ["indentation"]], ["if", ["=", "target", ["quote", "js"]], ["cat", "ind", "\"while (\"", "condition", "\") {\\n\"", "body", "ind", "\"}\\n\""], ["cat", "ind", "\"while \"", "condition", "\" do\\n\"", "body", "ind", "\"end\\n\""]]]];
  _g88.stmt = true;
  _g88.tr = true;
  return(_g88);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (_g90) {
  var condition = _g90[0];
  var body = sub(_g90, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g91 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g91);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}}, _g184: {module: "compiler", variable: true}, _g151: {module: "compiler", variable: true}, "quote-environment": {module: "compiler", export: true, variable: true}, "quote-module": {module: "compiler", variable: true}, _g134: {module: "compiler", variable: true}, "valid-id?": {module: "compiler", variable: true}, "compile-body": {module: "compiler", variable: true}, _g157: {module: "compiler", variable: true}, "with-indent": {form: ["fn", ["form"], ["let", ["result", ["make-id"]], ["quasiquote", ["do", ["inc", "indent-level"], ["let", [["unquote", "result"], ["unquote", "form"]], ["dec", "indent-level"], ["unquote", "result"]]]]]], export: true, macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, module: "compiler"}, "compile-id": {module: "compiler", variable: true}, "open-module": {module: "compiler", export: true, variable: true}, "compilation-level": {module: "compiler", variable: true}, terminator: {module: "compiler", variable: true}, module: {module: "compiler", variable: true}, "compile-infix": {module: "compiler", variable: true}, _g169: {module: "compiler", variable: true}, _g145: {module: "compiler", variable: true}, _g162: {module: "compiler", variable: true}, "module-key": {module: "compiler", variable: true}, "not": {form: ["fn", [["x"]], ["let", ["x", ["compile", "x"], "open", ["if", ["=", "target", ["quote", "js"]], "\"!(\"", "\"(not \""]], ["cat", "open", "x", "\")\""]]], special: function (_g92) {
  var x = _g92[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, export: true, module: "compiler"}, "%local-function": {form: (function () {
  var _g93 = ["fn", [(function () {
    var _g95 = ["name", "args"];
    _g95.rest = "body";
    return(_g95);
  })()], (function () {
    var _g96 = ["compile-function", "args", "body"];
    _g96.prefix = "\"local \"";
    _g96.name = "name";
    return(_g96);
  })()];
  _g93.stmt = true;
  _g93.tr = true;
  return(_g93);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (_g97) {
  var name = _g97[0];
  var args = _g97[1];
  var body = sub(_g97, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}}, "open-m0dule": {module: "compiler", export: true, variable: true}, _g171: {module: "compiler", variable: true}, "%global-function": {form: (function () {
  var _g98 = ["fn", [(function () {
    var _g100 = ["name", "args"];
    _g100.rest = "body";
    return(_g100);
  })()], ["if", ["=", "target", ["quote", "lua"]], (function () {
    var _g101 = ["compile-function", "args", "body"];
    _g101.name = "name";
    return(_g101);
  })(), (function () {
    var _g102 = ["compile", ["quasiquote", ["set", ["unquote", "name"], ["%function", ["unquote", "args"], ["unquote-splicing", "body"]]]]];
    _g102["stmt?"] = true;
    return(_g102);
  })()]];
  _g98.stmt = true;
  _g98.tr = true;
  return(_g98);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (_g103) {
  var name = _g103[0];
  var args = _g103[1];
  var body = sub(_g103, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}}, _g146: {module: "compiler", variable: true}, indentation: {module: "compiler", variable: true}, "compile-atom": {module: "compiler", variable: true}, "compile-call": {module: "compiler", variable: true}, compile: {module: "compiler", export: true, variable: true}, "compile-module": {module: "compiler", export: true, variable: true}, "compile-function": {module: "compiler", variable: true}, _g135: {module: "compiler", variable: true}, _g140: {module: "compiler", variable: true}, "%try": {form: (function () {
  var _g104 = ["fn", ["forms"], ["let", ["ind", ["indentation"], "body", ["with-indent", (function () {
    var _g105 = ["compile-body", "forms"];
    _g105["tail?"] = true;
    return(_g105);
  })()], "e", ["make-id"], "handler", ["quasiquote", ["return", ["%array", false, ["unquote", "e"]]]], "h", ["with-indent", (function () {
    var _g106 = ["compile", "handler"];
    _g106["stmt?"] = true;
    return(_g106);
  })()]], ["cat", "ind", "\"try {\\n\"", "body", "ind", "\"}\\n\"", "ind", "\"catch (\"", "e", "\") {\\n\"", "h", "ind", "\"}\\n\""]]];
  _g104.stmt = true;
  _g104.tr = true;
  return(_g104);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g107 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g107);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g108 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g108);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}}, "do": {form: (function () {
  var _g109 = ["fn", ["forms", "tail?"], (function () {
    var _g110 = ["compile-body", "forms"];
    _g110["tail?"] = "tail?";
    return(_g110);
  })()];
  _g109.stmt = true;
  _g109.tr = true;
  return(_g109);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}}, "%for": {form: (function () {
  var _g111 = ["fn", [(function () {
    var _g113 = [["t", "k"]];
    _g113.rest = "body";
    return(_g113);
  })()], ["let", ["t", ["compile", "t"], "ind", ["indentation"], "body", ["with-indent", ["compile-body", "body"]]], ["if", ["=", "target", ["quote", "lua"]], ["cat", "ind", "\"for \"", "k", "\" in next, \"", "t", "\" do\\n\"", "body", "ind", "\"end\\n\""], ["cat", "ind", "\"for (\"", "k", "\" in \"", "t", "\") {\\n\"", "body", "ind", "\"}\\n\""]]]];
  _g111.stmt = true;
  _g111.tr = true;
  return(_g111);
})(), tr: true, module: "compiler", export: true, stmt: true, special: function (_g114) {
  var _g115 = _g114[0];
  var t = _g115[0];
  var k = _g115[1];
  var body = sub(_g114, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g116 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g116);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}}, _g137: {module: "compiler", variable: true}, "can-return?": {module: "compiler", variable: true}, "quote-modules": {module: "compiler", export: true, variable: true}, _g185: {module: "compiler", variable: true}, "error": {form: (function () {
  var _g117 = ["fn", [["x"]], ["let", ["e", ["if", ["=", "target", ["quote", "js"]], ["cat", "\"throw \"", ["compile", "x"]], ["compile-call", ["quasiquote", ["error", ["unquote", "x"]]]]]], ["cat", ["indentation"], "e"]]];
  _g117.stmt = true;
  return(_g117);
})(), export: true, module: "compiler", stmt: true, special: function (_g118) {
  var x = _g118[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}}, _g186: {module: "compiler", variable: true}, _g159: {module: "compiler", variable: true}, _g187: {module: "compiler", variable: true}, "compile-branch": {module: "compiler", variable: true}, getop: {module: "compiler", variable: true}}, import: ["reader", "lib", "compiler"]}, reader: {toplevel: {"read-from-string": {module: "reader", export: true, variable: true}, "read-char": {module: "reader", variable: true}, "flag?": {module: "reader", variable: true}, _g4: {module: "reader", variable: true}, eof: {module: "reader", variable: true}, "peek-char": {module: "reader", variable: true}, "read-all": {module: "reader", export: true, variable: true}, read: {module: "reader", export: true, variable: true}, "skip-non-code": {module: "reader", variable: true}, "read-table": {module: "reader", variable: true}, whitespace: {module: "reader", variable: true}, "make-stream": {module: "reader", export: true, variable: true}, "define-reader": {form: ["fn", (function () {
  var _g119 = [["char", "stream"]];
  _g119.rest = "body";
  return(_g119);
})(), ["quasiquote", ["set", ["get", "read-table", ["unquote", "char"]], ["fn", [["unquote", "stream"]], ["unquote-splicing", "body"]]]]], export: true, macro: function (_g120) {
  var char = _g120[0];
  var stream = _g120[1];
  var body = unstash(sublist(arguments, 1));
  var _g121 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g121)]);
}, module: "reader"}, "key?": {module: "reader", variable: true}, delimiters: {module: "reader", variable: true}}, import: ["lib", "compiler"]}};
environment = [{"define-module": {form: ["fn", (function () {
  var _g122 = ["spec"];
  _g122.rest = "body";
  return(_g122);
})(), ["let", [(function () {
  var _g123 = [];
  _g123.export = "exp";
  _g123.import = "imp";
  return(_g123);
})(), "body"], ["map", "load-module", "imp"], ["set", ["get", "modules", ["module-key", "spec"]], (function () {
  var _g124 = ["table"];
  _g124.toplevel = ["table"];
  _g124.import = "imp";
  return(_g124);
})()], ["across", [["or", "exp", []], "k"], (function () {
  var _g125 = ["setenv", "k"];
  _g125.export = true;
  return(_g125);
})()]], "nil"], export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g126 = sub(body, 0);
  var exp = _g126.export;
  var imp = _g126.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp};
  var _g128 = 0;
  var _g127 = (exp || []);
  while ((_g128 < length(_g127))) {
    var k = _g127[_g128];
    setenv(k, {_stash: true, export: true});
    _g128 = (_g128 + 1);
  }
  return(undefined);
}, module: "compiler"}}];
delimiters = {"\n": true, ";": true, ")": true, "(": true};
whitespace = {"\n": true, " ": true, "\t": true};
make_stream = function (str) {
  return({string: str, pos: 0, len: length(str)});
};
peek_char = function (s) {
  if ((s.pos < s.len)) {
    return(char(s.string, s.pos));
  }
};
read_char = function (s) {
  var c = peek_char(s);
  if (c) {
    s.pos = (s.pos + 1);
    return(c);
  }
};
skip_non_code = function (s) {
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
};
read_table = {};
eof = {};
key63 = function (atom) {
  return((string63(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":")));
};
flag63 = function (atom) {
  return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
};
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
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g136 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g137 = _g136;
    for (k1 in _g137) {
      if (isNaN(parseInt(k1))) {
        var v = _g137[k1];
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
bound63 = function (x) {
  return((macro63(x) || special63(x) || symbol63(x) || variable63(x)));
};
escape = function (str) {
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
};
quoted = function (form) {
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
    var _g198 = args;
    for (k in _g198) {
      if (isNaN(parseInt(k))) {
        var v = _g198[k];
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
    var _g199 = args;
    for (k in _g199) {
      if (isNaN(parseInt(k))) {
        var v = _g199[k];
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
      var _g200 = l;
      for (k in _g200) {
        if (isNaN(parseInt(k))) {
          var v = _g200[k];
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
bind_arguments = function (args, body) {
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
    var _g202 = 0;
    var _g201 = args;
    while ((_g202 < length(_g201))) {
      var arg = _g201[_g202];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g202 = (_g202 + 1);
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
    var _g203 = lh;
    while ((i < length(_g203))) {
      var x = _g203[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g204 = lh;
    for (k in _g204) {
      if (isNaN(parseInt(k))) {
        var v = _g204[k];
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
message_handler = function (msg) {
  var i = search(msg, ": ");
  return(sub(msg, (i + 2)));
};
quoting63 = function (depth) {
  return(number63(depth));
};
quasiquoting63 = function (depth) {
  return((quoting63(depth) && (depth > 0)));
};
can_unquote63 = function (depth) {
  return((quoting63(depth) && (depth === 1)));
};
quasisplice63 = function (x, depth) {
  return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else if (atom63(form)) {
    return(form);
  } else {
    var x = hd(form);
    if ((x === "%for")) {
      var _g133 = form[0];
      var _g205 = form[1];
      var t = _g205[0];
      var k = _g205[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g134 = form[0];
      var args = form[1];
      var _g206 = sub(form, 2);
      add(environment, {});
      var _g208 = (function () {
        var _g210 = 0;
        var _g209 = args;
        while ((_g210 < length(_g209))) {
          var _g207 = _g209[_g210];
          setenv(_g207, {_stash: true, variable: true});
          _g210 = (_g210 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g206)));
      })();
      drop(environment);
      return(_g208);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g135 = form[0];
      var name = form[1];
      var _g211 = form[2];
      var _g212 = sub(form, 3);
      add(environment, {});
      var _g214 = (function () {
        var _g216 = 0;
        var _g215 = _g211;
        while ((_g216 < length(_g215))) {
          var _g213 = _g215[_g216];
          setenv(_g213, {_stash: true, variable: true});
          _g216 = (_g216 + 1);
        }
        return(join([x, name, map42(macroexpand, _g211)], macroexpand(_g212)));
      })();
      drop(environment);
      return(_g214);
    } else if (macro63(x)) {
      var b = getenv(x);
      return(macroexpand(apply(b.macro, tl(form))));
    } else {
      return(map42(macroexpand, form));
    }
  }
};
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
quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var k = undefined;
  var _g217 = form;
  for (k in _g217) {
    if (isNaN(parseInt(k))) {
      var v = _g217[k];
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
  var _g219 = 0;
  var _g218 = form;
  while ((_g219 < length(_g218))) {
    var x = _g218[_g219];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g219 = (_g219 + 1);
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
  var _g220 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g220, upto));
  } else {
    var l = sublist(x, _g220, upto);
    var k = undefined;
    var _g221 = x;
    for (k in _g221) {
      if (isNaN(parseInt(k))) {
        var v = _g221[k];
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
    var _g222 = l1;
    for (k in _g222) {
      if (isNaN(parseInt(k))) {
        var v = _g222[k];
        l[k] = v;
      }
    }
    var _g224 = undefined;
    var _g223 = l2;
    for (_g224 in _g223) {
      if (isNaN(parseInt(_g224))) {
        var v = _g223[_g224];
        l[_g224] = v;
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
  var _g226 = 0;
  var _g225 = l;
  while ((_g226 < length(_g225))) {
    var x = _g225[_g226];
    if (f(x)) {
      add(l1, x);
    }
    _g226 = (_g226 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g228 = 0;
  var _g227 = l;
  while ((_g228 < length(_g227))) {
    var x = _g227[_g228];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g228 = (_g228 + 1);
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
splice63 = function (x) {
  if (table63(x)) {
    return(x._splice);
  }
};
map = function (f, l) {
  var l1 = [];
  var _g238 = 0;
  var _g237 = l;
  while ((_g238 < length(_g237))) {
    var x = _g237[_g238];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g238 = (_g238 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g239 = t;
  for (k in _g239) {
    if (isNaN(parseInt(k))) {
      var v = _g239[k];
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
  var _g240 = t;
  for (k in _g240) {
    if (isNaN(parseInt(k))) {
      var v = _g240[k];
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
  var _g241 = t;
  for (k in _g241) {
    if (isNaN(parseInt(k))) {
      var v = _g241[k];
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
  var _g242 = t;
  for (k in _g242) {
    if (isNaN(parseInt(k))) {
      var v = _g242[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g243 = sub(xs, 0);
  return(join(t, _g243));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g244 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g245 = t;
  for (k in _g245) {
    if (isNaN(parseInt(k))) {
      var v = _g245[k];
      if (!(_g244[k])) {
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
  var _g246 = sub(xs, 0);
  if (empty63(_g246)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g246));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g249 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g249));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g250 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g250)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g251 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g251));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g252 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g252)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g253 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g253)));
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
    var _g254 = x;
    for (k in _g254) {
      if (isNaN(parseInt(k))) {
        var v = _g254[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g255 = x1;
    while ((i < length(_g255))) {
      var y = _g255[i];
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
  var _g256 = stash(args);
  return((f.apply)(f, _g256));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
infix = {common: {"+": true, "<": true, "*": true, ">=": true, "%": true, "<=": true, "/": true, "-": true, ">": true}, lua: {"cat": "..", "and": true, "~=": true, "or": true, "=": "=="}, js: {"cat": "+", "and": "&&", "~=": "!=", "or": "||", "=": "==="}};
getop = function (op) {
  var op1 = (infix.common[op] || infix[target][op]);
  if ((op1 === true)) {
    return(op);
  } else {
    return(op1);
  }
};
infix63 = function (form) {
  return((list63(form) && is63(getop(hd(form)))));
};
indent_level = 0;
indentation = function () {
  return(apply(cat, replicate(indent_level, "  ")));
};
compile_args = function (args) {
  var str = "(";
  var i = 0;
  var _g259 = args;
  while ((i < length(_g259))) {
    var arg = _g259[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g260 = unstash(sublist(arguments, 1));
  var tail63 = _g260["tail?"];
  var str = "";
  var i = 0;
  var _g261 = forms;
  while ((i < length(_g261))) {
    var x = _g261[i];
    var t63 = (tail63 && (i === (length(forms) - 1)));
    str = (str + compile(x, {_stash: true, "stmt?": true, "tail?": t63}));
    i = (i + 1);
  }
  return(str);
};
numeric63 = function (n) {
  return(((n > 47) && (n < 58)));
};
valid_char63 = function (n) {
  return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
};
valid_id63 = function (id) {
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
compile_id = function (id) {
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
compile_atom = function (x) {
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
compile_infix = function (_g262) {
  var op = _g262[0];
  var args = sub(_g262, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g263 = args;
  while ((i < length(_g263))) {
    var arg = _g263[i];
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
};
compile_branch = function (condition, body, first63, last63, tail63) {
  var cond1 = compile(condition);
  var _g264 = (function () {
    indent_level = (indent_level + 1);
    var _g265 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g265);
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
    return((ind + "if (" + cond1 + ") {\n" + _g264 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g264 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g264 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g264 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g264 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g264 + tr));
  }
};
compile_function = function (args, body) {
  var _g266 = unstash(sublist(arguments, 2));
  var name = _g266.name;
  var prefix = _g266.prefix;
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
    var _g267 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g267);
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
terminator = function (stmt63) {
  if (!(stmt63)) {
    return("");
  } else if ((target === "js")) {
    return(";\n");
  } else {
    return("\n");
  }
};
compile_special = function (form, stmt63, tail63) {
  var _g268 = getenv(hd(form));
  var self_tr63 = _g268.tr;
  var stmt = _g268.stmt;
  var special = _g268.special;
  if ((!(stmt63) && stmt)) {
    return(compile([["%function", [], form]], {_stash: true, "tail?": tail63}));
  } else {
    var tr = terminator((stmt63 && !(self_tr63)));
    return((special(tl(form), tail63) + tr));
  }
};
can_return63 = function (form) {
  return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
};
compile = function (form) {
  var _g312 = unstash(sublist(arguments, 1));
  var stmt63 = _g312["stmt?"];
  var tail63 = _g312["tail?"];
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
global.require = require;
run = eval;
eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};
current_module = undefined;
compiler_output = undefined;
compilation_level = undefined;
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  var form = join(["do"], body);
  return(compile_toplevel(form));
};
initial_environment = function () {
  return([{"define-module": getenv("define-module")}]);
};
module_key = function (spec) {
  if (atom63(spec)) {
    return(to_string(spec));
  } else {
    throw "Unsupported module specification";
  }
};
module = function (spec) {
  return(modules[module_key(spec)]);
};
module_path = function (spec) {
  return((module_key(spec) + ".l"));
};
load_module = function (spec) {
  if (nil63(module(spec))) {
    _37compile_module(spec);
  } else if ((compilation_level === 0)) {
    compilation_level = (compilation_level + 1);
    _37compile_module(spec);
    compilation_level = (compilation_level - 1);
  }
  return(open_module(spec));
};
_37compile_module = function (spec) {
  var path = module_path(spec);
  var mod0 = current_module;
  var env0 = environment;
  var k = module_key(spec);
  current_module = spec;
  environment = initial_environment();
  var compiled = compile_file(path);
  var m = module(spec);
  var toplevel = hd(environment);
  current_module = mod0;
  environment = env0;
  var name = undefined;
  var _g313 = toplevel;
  for (name in _g313) {
    if (isNaN(parseInt(name))) {
      var binding = _g313[name];
      if ((binding.export && (binding.module === k))) {
        m.toplevel[name] = binding;
      }
    }
  }
  if (number63(compilation_level)) {
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
open_module = function (spec) {
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g314 = m.toplevel;
  for (k in _g314) {
    if (isNaN(parseInt(k))) {
      var v = _g314[k];
      frame[k] = v;
    }
  }
};
in_module = function (spec) {
  load_module(spec);
  var m = module(spec);
  return(map(open_module, m.import));
};
compile_module = function (spec) {
  compilation_level = 0;
  compiler_output = "";
  return(load_module(spec));
};
quote_binding = function (b) {
  b = extend(b, {_stash: true, module: ["quote", b.module]});
  if (is63(b.symbol)) {
    return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
  } else if ((b.macro && b.form)) {
    return(extend(b, {_stash: true, macro: b.form, form: ["quote", b.form]}));
  } else if ((b.special && b.form)) {
    return(extend(b, {_stash: true, form: ["quote", b.form], special: b.form}));
  } else if (is63(b.variable)) {
    return(b);
  }
};
quote_frame = function (t) {
  return(join(["%object"], mapo(function (_g258, b) {
    return(join(["table"], quote_binding(b)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g322 = ["table"];
  _g322.toplevel = quote_frame(m.toplevel);
  _g322.import = quoted(m.import);
  return(_g322);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
rep = function (str) {
  var _g323 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g325) {
      return([false, _g325]);
    }
  })();
  var _g1 = _g323[0];
  var x = _g323[1];
  if (is63(x)) {
    return(print((to_string(x) + " ")));
  }
};
repl = function () {
  var step = function (str) {
    rep(str);
    return(write("> "));
  };
  write("> ");
  (process.stdin.setEncoding)("utf8");
  return((process.stdin.on)("data", step));
};
usage = function () {
  print((to_string("usage: lumen [options] <module>") + " "));
  print((to_string("options:") + " "));
  print((to_string("  -o <output>\tOutput file") + " "));
  print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
  print((to_string("  -e <expr>\tExpression to evaluate") + " "));
  return(exit());
};
main = function () {
  var args = sub(process.argv, 2);
  if (((hd(args) === "-h") || (hd(args) === "--help"))) {
    usage();
  }
  var spec = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var i = 0;
  var _g324 = args;
  while ((i < length(_g324))) {
    var arg = _g324[i];
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
    compile_module(spec);
    return(write_file(output, compiler_output));
  } else {
    var spec = (spec || "main");
    in_module(spec);
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
main();
