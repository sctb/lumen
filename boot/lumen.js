modules = {reader: {import: ["lib", "compiler"], toplevel: {_g4: {module: "reader", variable: true}, "peek-char": {module: "reader", variable: true}, eof: {module: "reader", variable: true}, "flag?": {module: "reader", variable: true}, delimiters: {module: "reader", variable: true}, read: {module: "reader", export: true, variable: true}, "read-char": {module: "reader", variable: true}, "read-all": {module: "reader", export: true, variable: true}, "define-reader": {module: "reader", form: ["fn", (function () {
  var _g2 = [["char", "stream"]];
  _g2.rest = "body";
  return(_g2);
})(), ["quasiquote", ["set", ["get", "read-table", ["unquote", "char"]], ["fn", [["unquote", "stream"]], ["unquote-splicing", "body"]]]]], export: true, macro: function (_g3) {
  var char = _g3[0];
  var stream = _g3[1];
  var body = unstash(sublist(arguments, 1));
  var _g4 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g4)]);
}}, "key?": {module: "reader", variable: true}, "skip-non-code": {module: "reader", variable: true}, whitespace: {module: "reader", variable: true}, "read-table": {module: "reader", variable: true}, "make-stream": {module: "reader", export: true, variable: true}, "read-from-string": {module: "reader", export: true, variable: true}}}, compiler: {import: ["reader", "lib", "compiler"], toplevel: {"%local": {module: "compiler", stmt: true, form: (function () {
  var _g5 = ["fn", [["name", "value"]], ["let", ["id", ["compile", "name"], "value", ["compile", "value"], "keyword", ["if", ["=", "target", ["quote", "js"]], "\"var \"", "\"local \""], "ind", ["indentation"]], ["cat", "ind", "keyword", "id", "\" = \"", "value"]]];
  _g5.stmt = true;
  return(_g5);
})(), export: true, special: function (_g6) {
  var name = _g6[0];
  var value = _g6[1];
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
}}, getop: {module: "compiler", variable: true}, "%try": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g7 = ["fn", ["forms"], ["let", ["ind", ["indentation"], "body", ["with-indent", (function () {
    var _g8 = ["compile-body", "forms"];
    _g8["tail?"] = true;
    return(_g8);
  })()], "e", ["make-id"], "handler", ["quasiquote", ["return", ["%array", false, ["unquote", "e"]]]], "h", ["with-indent", (function () {
    var _g9 = ["compile", "handler"];
    _g9["stmt?"] = true;
    return(_g9);
  })()]], ["cat", "ind", "\"try {\\n\"", "body", "ind", "\"}\\n\"", "ind", "\"catch (\"", "e", "\") {\\n\"", "h", "ind", "\"}\\n\""]]];
  _g7.stmt = true;
  _g7.tr = true;
  return(_g7);
})(), export: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g10 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g10);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g11 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g11);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}}, "do": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g12 = ["fn", ["forms", "tail?"], (function () {
    var _g13 = ["compile-body", "forms"];
    _g13["tail?"] = "tail?";
    return(_g13);
  })()];
  _g12.stmt = true;
  _g12.tr = true;
  return(_g12);
})(), export: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}}, terminator: {module: "compiler", variable: true}, "%array": {module: "compiler", form: ["fn", ["forms"], ["let", ["open", ["if", ["=", "target", ["quote", "lua"]], "\"{\"", "\"[\""], "close", ["if", ["=", "target", ["quote", "lua"]], "\"}\"", "\"]\""], "str", "\"\""], ["across", ["forms", "x", "i"], ["cat!", "str", ["compile", "x"]], ["if", ["<", "i", ["-", ["length", "forms"], 1]], ["cat!", "str", "\", \""]]], ["cat", "open", "str", "close"]]], export: true, special: function (forms) {
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
  var _g14 = forms;
  while ((i < length(_g14))) {
    var x = _g14[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}}, "quote-binding": {module: "compiler", variable: true}, _g186: {module: "compiler", variable: true}, _g137: {module: "compiler", variable: true}, "infix?": {module: "compiler", variable: true}, "module-path": {module: "compiler", variable: true}, _g158: {module: "compiler", variable: true}, "compile-special": {module: "compiler", variable: true}, _g134: {module: "compiler", variable: true}, "current-module": {module: "compiler", export: true, variable: true}, "compile-toplevel": {module: "compiler", export: true, variable: true}, _g135: {module: "compiler", variable: true}, "compile-file": {module: "compiler", variable: true}, _g187: {module: "compiler", variable: true}, "get": {module: "compiler", form: ["fn", [["t", "k"]], ["let", ["t", ["compile", "t"], "k1", ["compile", "k"]], ["if", ["and", ["=", "target", ["quote", "lua"]], ["=", ["char", "t", 0], "\"{\""]], ["set", "t", ["cat", "\"(\"", "t", "\")\""]]], ["if", ["and", ["string-literal?", "k"], ["valid-id?", ["inner", "k"]]], ["cat", "t", "\".\"", ["inner", "k"]], ["cat", "t", "\"[\"", "k1", "\"]\""]]]], export: true, special: function (_g15) {
  var t = _g15[0];
  var k = _g15[1];
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
}}, "error": {module: "compiler", stmt: true, form: (function () {
  var _g16 = ["fn", [["x"]], ["let", ["e", ["if", ["=", "target", ["quote", "js"]], ["cat", "\"throw \"", ["compile", "x"]], ["compile-call", ["quasiquote", ["error", ["unquote", "x"]]]]]], ["cat", ["indentation"], "e"]]];
  _g16.stmt = true;
  return(_g16);
})(), export: true, special: function (_g17) {
  var x = _g17[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}}, "%function": {module: "compiler", form: ["fn", [(function () {
  var _g18 = ["args"];
  _g18.rest = "body";
  return(_g18);
})()], ["compile-function", "args", "body"]], export: true, special: function (_g19) {
  var args = _g19[0];
  var body = sub(_g19, 1);
  return(compile_function(args, body));
}}, "set": {module: "compiler", stmt: true, form: (function () {
  var _g20 = ["fn", [["lh", "rh"]], ["if", ["nil?", "rh"], ["error", "\"Missing right-hand side in assignment\""]], ["cat", ["indentation"], ["compile", "lh"], "\" = \"", ["compile", "rh"]]];
  _g20.stmt = true;
  return(_g20);
})(), export: true, special: function (_g21) {
  var lh = _g21[0];
  var rh = _g21[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}}, "compile-args": {module: "compiler", variable: true}, _g161: {module: "compiler", variable: true}, "initial-environment": {module: "compiler", variable: true}, "in-module": {module: "compiler", export: true, variable: true}, _g151: {module: "compiler", variable: true}, "compile-branch": {module: "compiler", variable: true}, _g169: {module: "compiler", variable: true}, "module-key": {module: "compiler", variable: true}, _g159: {module: "compiler", variable: true}, _g185: {module: "compiler", variable: true}, "numeric?": {module: "compiler", variable: true}, _g154: {module: "compiler", variable: true}, "while": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g22 = ["fn", [(function () {
    var _g23 = ["condition"];
    _g23.rest = "body";
    return(_g23);
  })()], ["let", ["condition", ["compile", "condition"], "body", ["with-indent", ["compile-body", "body"]], "ind", ["indentation"]], ["if", ["=", "target", ["quote", "js"]], ["cat", "ind", "\"while (\"", "condition", "\") {\\n\"", "body", "ind", "\"}\\n\""], ["cat", "ind", "\"while \"", "condition", "\" do\\n\"", "body", "ind", "\"end\\n\""]]]];
  _g22.stmt = true;
  _g22.tr = true;
  return(_g22);
})(), export: true, special: function (_g24) {
  var condition = _g24[0];
  var body = sub(_g24, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g25 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g25);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}}, "quote-frame": {module: "compiler", variable: true}, "can-return?": {module: "compiler", variable: true}, "quote-modules": {module: "compiler", export: true, variable: true}, run: {module: "compiler", variable: true}, "open-module": {module: "compiler", export: true, variable: true}, _g140: {module: "compiler", variable: true}, "compile-call": {module: "compiler", variable: true}, "valid-id?": {module: "compiler", variable: true}, compile: {module: "compiler", export: true, variable: true}, "break": {module: "compiler", stmt: true, form: (function () {
  var _g26 = ["fn", ["_g122"], ["cat", ["indentation"], "\"break\""]];
  _g26.stmt = true;
  return(_g26);
})(), export: true, special: function (_g122) {
  return((indentation() + "break"));
}}, "compile-function": {module: "compiler", variable: true}, _g156: {module: "compiler", variable: true}, _g150: {module: "compiler", variable: true}, "compile-atom": {module: "compiler", variable: true}, "compile-id": {module: "compiler", variable: true}, "valid-char?": {module: "compiler", variable: true}, _g146: {module: "compiler", variable: true}, "load-module": {module: "compiler", export: true, variable: true}, "%local-function": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g27 = ["fn", [(function () {
    var _g28 = ["name", "args"];
    _g28.rest = "body";
    return(_g28);
  })()], (function () {
    var _g29 = ["compile-function", "args", "body"];
    _g29.prefix = "\"local \"";
    _g29.name = "name";
    return(_g29);
  })()];
  _g27.stmt = true;
  _g27.tr = true;
  return(_g27);
})(), export: true, special: function (_g30) {
  var name = _g30[0];
  var args = _g30[1];
  var body = sub(_g30, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}}, "return": {module: "compiler", stmt: true, form: (function () {
  var _g31 = ["fn", [["x"]], ["let", ["x", ["if", ["nil?", "x"], "\"return\"", ["compile-call", ["quasiquote", ["return", ["unquote", "x"]]]]]], ["cat", ["indentation"], "x"]]];
  _g31.stmt = true;
  return(_g31);
})(), export: true, special: function (_g32) {
  var x = _g32[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}}, _g141: {module: "compiler", variable: true}, "indent-level": {module: "compiler", variable: true}, "%compile-module": {module: "compiler", variable: true}, "%object": {module: "compiler", form: ["fn", ["forms"], ["let", ["str", "\"{\"", "sep", ["if", ["=", "target", ["quote", "lua"]], "\" = \"", "\": \""], "pairs", ["pairwise", "forms"]], ["across", ["pairs", ["k", "v"], "i"], ["if", ["not", ["string?", "k"]], ["error", ["cat", "\"Illegal key: \"", ["to-string", "k"]]]], ["let", ["v", ["compile", "v"], "k", ["if", ["valid-id?", "k"], "k", ["and", ["=", "target", ["quote", "js"]], ["string-literal?", "k"]], "k", ["=", "target", ["quote", "js"]], ["quoted", "k"], ["string-literal?", "k"], ["cat", "\"[\"", "k", "\"]\""], ["cat", "\"[\"", ["quoted", "k"], "\"]\""]]], ["cat!", "str", "k", "sep", "v"]], ["if", ["<", "i", ["-", ["length", "pairs"], 1]], ["cat!", "str", "\", \""]]], ["cat", "str", "\"}\""]]], export: true, special: function (forms) {
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
  var _g33 = pairs;
  while ((i < length(_g33))) {
    var _g34 = _g33[i];
    var k = _g34[0];
    var v = _g34[1];
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
}}, _g171: {module: "compiler", variable: true}, _g145: {module: "compiler", variable: true}, _g162: {module: "compiler", variable: true}, "quote-m0dules": {module: "compiler", export: true, variable: true}, "if": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g35 = ["fn", ["form", "tail?"], ["let", ["str", "\"\""], ["across", ["form", "condition", "i"], ["let", ["last?", [">=", "i", ["-", ["length", "form"], 2]], "else?", ["=", "i", ["-", ["length", "form"], 1]], "first?", ["=", "i", 0], "body", ["at", "form", ["+", "i", 1]]], ["if", "else?", ["do", ["set", "body", "condition"], ["set", "condition", "nil"]]], ["cat!", "str", ["compile-branch", "condition", "body", "first?", "last?", "tail?"]]], ["inc", "i"]], "str"]];
  _g35.stmt = true;
  _g35.tr = true;
  return(_g35);
})(), export: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g36 = form;
  while ((i < length(_g36))) {
    var condition = _g36[i];
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
}}, "open-m0dule": {module: "compiler", export: true, variable: true}, "%global-function": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g37 = ["fn", [(function () {
    var _g38 = ["name", "args"];
    _g38.rest = "body";
    return(_g38);
  })()], ["if", ["=", "target", ["quote", "lua"]], (function () {
    var _g39 = ["compile-function", "args", "body"];
    _g39.name = "name";
    return(_g39);
  })(), (function () {
    var _g40 = ["compile", ["quasiquote", ["set", ["unquote", "name"], ["%function", ["unquote", "args"], ["unquote-splicing", "body"]]]]];
    _g40["stmt?"] = true;
    return(_g40);
  })()]];
  _g37.stmt = true;
  _g37.tr = true;
  return(_g37);
})(), export: true, special: function (_g41) {
  var name = _g41[0];
  var args = _g41[1];
  var body = sub(_g41, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}}, _g152: {module: "compiler", variable: true}, _g184: {module: "compiler", variable: true}, "%for": {module: "compiler", tr: true, stmt: true, form: (function () {
  var _g42 = ["fn", [(function () {
    var _g43 = [["t", "k"]];
    _g43.rest = "body";
    return(_g43);
  })()], ["let", ["t", ["compile", "t"], "ind", ["indentation"], "body", ["with-indent", ["compile-body", "body"]]], ["if", ["=", "target", ["quote", "lua"]], ["cat", "ind", "\"for \"", "k", "\" in next, \"", "t", "\" do\\n\"", "body", "ind", "\"end\\n\""], ["cat", "ind", "\"for (\"", "k", "\" in \"", "t", "\") {\\n\"", "body", "ind", "\"}\\n\""]]]];
  _g42.stmt = true;
  _g42.tr = true;
  return(_g42);
})(), export: true, special: function (_g44) {
  var _g45 = _g44[0];
  var t = _g45[0];
  var k = _g45[1];
  var body = sub(_g44, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g46 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g46);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}}, "compile-infix": {module: "compiler", variable: true}, infix: {module: "compiler", variable: true}, _g157: {module: "compiler", variable: true}, module: {module: "compiler", variable: true}, _g165: {module: "compiler", variable: true}, "compilation-level": {module: "compiler", variable: true}, "not": {module: "compiler", form: ["fn", [["x"]], ["let", ["x", ["compile", "x"], "open", ["if", ["=", "target", ["quote", "js"]], "\"!(\"", "\"(not \""]], ["cat", "open", "x", "\")\""]]], export: true, special: function (_g47) {
  var x = _g47[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}}, indentation: {module: "compiler", variable: true}, _g149: {module: "compiler", variable: true}, "with-indent": {module: "compiler", form: ["fn", ["form"], ["let", ["result", ["make-id"]], ["quasiquote", ["do", ["inc", "indent-level"], ["let", [["unquote", "result"], ["unquote", "form"]], ["dec", "indent-level"], ["unquote", "result"]]]]]], export: true, macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}}, "quote-module": {module: "compiler", variable: true}, eval: {module: "compiler", export: true, variable: true}, "compile-module": {module: "compiler", export: true, variable: true}, _g167: {module: "compiler", variable: true}, "compiler-output": {module: "compiler", export: true, variable: true}, "compile-body": {module: "compiler", variable: true}, "define-module": {module: "compiler", form: ["fn", (function () {
  var _g48 = ["spec"];
  _g48.rest = "body";
  return(_g48);
})(), ["let", [(function () {
  var _g49 = [];
  _g49.import = "imp";
  _g49.export = "exp";
  return(_g49);
})(), "body"], ["map", "load-module", "imp"], ["set", ["get", "modules", ["module-key", "spec"]], (function () {
  var _g50 = ["table"];
  _g50.import = "imp";
  _g50.toplevel = ["table"];
  return(_g50);
})()], ["across", [["or", "exp", []], "k"], (function () {
  var _g51 = ["setenv", "k"];
  _g51.export = true;
  return(_g51);
})()]], "nil"], export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g52 = sub(body, 0);
  var imp = _g52.import;
  var exp = _g52.export;
  map(load_module, imp);
  modules[module_key(spec)] = {import: imp, toplevel: {}};
  var _g54 = 0;
  var _g53 = (exp || []);
  while ((_g54 < length(_g53))) {
    var k = _g53[_g54];
    setenv(k, {_stash: true, export: true});
    _g54 = (_g54 + 1);
  }
  return(undefined);
}}, _g163: {module: "compiler", variable: true}, "quote-environment": {module: "compiler", export: true, variable: true}}}, lib: {import: ["lib", "compiler"], toplevel: {"set-of": {module: "lib", form: ["fn", "elements", ["let", ["l", []], ["across", ["elements", "e"], ["set", ["get", "l", "e"], true]], ["quasiquote", ["table", ["unquote-splicing", "l"]]]]], export: true, macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g56 = 0;
  var _g55 = elements;
  while ((_g56 < length(_g55))) {
    var e = _g55[_g56];
    l[e] = true;
    _g56 = (_g56 + 1);
  }
  return(join(["table"], l));
}}, print: {module: "lib", export: true, variable: true}, pairwise: {module: "lib", export: true, variable: true}, "is?": {module: "lib", export: true, variable: true}, "read-file": {module: "lib", export: true, variable: true}, "with-frame": {module: "lib", form: ["fn", "body", ["let", ["x", ["make-id"]], ["quasiquote", ["do", ["add", "environment", ["table"]], ["let", [["unquote", "x"], ["do", ["unquote-splicing", "body"]]], ["drop", "environment"], ["unquote", "x"]]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}}, "bind-arguments": {module: "lib", variable: true}, "define-special": {module: "lib", form: ["fn", (function () {
  var _g57 = ["name", "args"];
  _g57.rest = "body";
  return(_g57);
})(), ["let", ["form", ["quasiquote", ["fn", ["unquote", "args"], ["unquote-splicing", "body"]]], "keys", ["sub", "body", ["length", "body"]]], ["eval", ["quasiquote", (function () {
  var _g58 = ["setenv", ["quote", ["unquote", "name"]], ["unquote-splicing", "keys"]];
  _g58.special = ["unquote", "form"];
  _g58.form = ["quote", ["unquote", "form"]];
  return(_g58);
})()]]], "nil"], export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g59 = sub(body, 0);
  var form = join(["fn", args], _g59);
  var keys = sub(_g59, length(_g59));
  eval(join((function () {
    var _g60 = ["setenv", ["quote", name]];
    _g60.special = form;
    _g60.form = ["quote", form];
    return(_g60);
  })(), keys));
  return(undefined);
}}, macroexpand: {module: "lib", export: true, variable: true}, "bound?": {module: "lib", variable: true}, "quoting?": {module: "lib", variable: true}, search: {module: "lib", export: true, variable: true}, quasiexpand: {module: "lib", variable: true}, "write-file": {module: "lib", export: true, variable: true}, "atom?": {module: "lib", export: true, variable: true}, exit: {module: "lib", export: true, variable: true}, "quasisplice?": {module: "lib", variable: true}, splice: {module: "lib", export: true, variable: true}, "variable?": {module: "lib", variable: true}, length: {module: "lib", export: true, variable: true}, _g32: {module: "lib", variable: true}, apply: {module: "lib", export: true, variable: true}, bind: {module: "lib", variable: true}, "quasiquoting?": {module: "lib", variable: true}, find: {module: "lib", export: true, variable: true}, "define-global": {module: "lib", form: ["fn", (function () {
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
}}, define: {module: "lib", form: ["fn", (function () {
  var _g66 = ["name", "x"];
  _g66.rest = "body";
  return(_g66);
})(), (function () {
  var _g67 = ["setenv", "name"];
  _g67.variable = true;
  return(_g67);
})(), ["quasiquote", ["define-global", ["unquote", "name"], ["unquote", "x"], ["unquote-splicing", "body"]]]], export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g68 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g68));
}}, "quasiquote-list": {module: "lib", variable: true}, add: {module: "lib", export: true, variable: true}, "join!": {module: "lib", form: ["fn", (function () {
  var _g69 = ["a"];
  _g69.rest = "bs";
  return(_g69);
})(), ["quasiquote", ["set", ["unquote", "a"], ["join*", ["unquote", "a"], ["unquote-splicing", "bs"]]]]], export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g70 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g70)]);
}}, "number?": {module: "lib", export: true, variable: true}, tl: {module: "lib", export: true, variable: true}, inc: {module: "lib", form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["+", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]], export: true, macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}}, "macro-function": {module: "lib", variable: true}, "parse-number": {module: "lib", export: true, variable: true}, "make-id": {module: "lib", export: true, variable: true}, guard: {module: "lib", form: ["fn", ["expr"], ["if", ["=", "target", ["quote", "js"]], ["quasiquote", [["fn", [], ["%try", ["list", true, ["unquote", "expr"]]]]]], ["let", ["e", ["make-id"], "x", ["make-id"], "ex", ["cat", "\"|\"", "e", "\",\"", "x", "\"|\""]], ["quasiquote", ["let", [["unquote", "ex"], ["xpcall", ["fn", [], ["unquote", "expr"]], "message-handler"]], ["list", ["unquote", "e"], ["unquote", "x"]]]]]]], export: true, macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}}, language: {module: "lib", form: ["fn", [], ["quasiquote", ["quote", ["unquote", "target"]]]], export: true, macro: function () {
  return(["quote", target]);
}}, _g59: {module: "lib", variable: true}, inner: {module: "lib", export: true, variable: true}, _g112: {module: "lib", variable: true}, "empty?": {module: "lib", export: true, variable: true}, "stash*": {module: "lib", export: true, variable: true}, _g52: {module: "lib", variable: true}, replicate: {module: "lib", export: true, variable: true}, sub: {module: "lib", export: true, variable: true}, "boolean?": {module: "lib", export: true, variable: true}, _g40: {module: "lib", variable: true}, type: {module: "lib", export: true, variable: true}, exclude: {module: "lib", export: true, variable: true}, _g48: {module: "lib", variable: true}, ">": {module: "lib", export: true, variable: true}, "to-string": {module: "lib", export: true, variable: true}, "id-literal?": {module: "lib", export: true, variable: true}, _g18: {module: "lib", variable: true}, substring: {module: "lib", variable: true}, "=": {module: "lib", export: true, variable: true}, "<": {module: "lib", export: true, variable: true}, fs: {module: "lib", variable: true}, pr: {module: "lib", form: ["fn", "xs", ["let", ["xs", ["map", ["fn", ["x"], ["splice", ["quasiquote", [["to-string", ["unquote", "x"]], "\" \""]]]], "xs"]], ["quasiquote", ["print", ["cat", ["unquote-splicing", "xs"]]]]]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}}, dec: {module: "lib", form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["-", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]], export: true, macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}}, ">=": {module: "lib", export: true, variable: true}, "<=": {module: "lib", export: true, variable: true}, _g39: {module: "lib", variable: true}, stash: {module: "lib", variable: true}, _g26: {module: "lib", variable: true}, at: {module: "lib", form: ["fn", ["l", "i"], ["if", ["and", ["=", "target", ["quote", "lua"]], ["number?", "i"]], ["inc", "i"], ["=", "target", ["quote", "lua"]], ["set", "i", ["quasiquote", ["+", ["unquote", "i"], 1]]]], ["quasiquote", ["get", ["unquote", "l"], ["unquote", "i"]]]], export: true, macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}}, _g45: {module: "lib", variable: true}, "%": {module: "lib", export: true, variable: true}, split: {module: "lib", export: true, variable: true}, _g100: {module: "lib", variable: true}, "special-form?": {module: "lib", export: true, variable: true}, "let-symbol": {module: "lib", form: ["fn", (function () {
  var _g71 = ["expansions"];
  _g71.rest = "body";
  return(_g71);
})(), ["with-frame", ["map", ["fn", [["name", "exp"]], ["macroexpand", ["quasiquote", ["define-symbol", ["unquote", "name"], ["unquote", "exp"]]]]], ["pairwise", "expansions"]], ["quasiquote", ["do", ["unquote-splicing", ["macroexpand", "body"]]]]]], export: true, macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g72 = sub(body, 0);
  add(environment, {});
  var _g73 = (function () {
    map(function (_g74) {
      var name = _g74[0];
      var exp = _g74[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g72)));
  })();
  drop(environment);
  return(_g73);
}}, reverse: {module: "lib", export: true, variable: true}, "cat": {module: "lib", export: true, variable: true}, "/": {module: "lib", export: true, variable: true}, "message-handler": {module: "lib", variable: true}, write: {module: "lib", export: true, variable: true}, "-": {module: "lib", export: true, variable: true}, getenv: {module: "lib", export: true, variable: true}, "+": {module: "lib", export: true, variable: true}, "*": {module: "lib", export: true, variable: true}, reduce: {module: "lib", export: true, variable: true}, table: {module: "lib", form: ["fn", "body", ["quasiquote", ["%object", ["unquote-splicing", ["mapo", ["fn", ["_g5", "x"], "x"], "body"]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g5, x) {
    return(x);
  }, body)));
}}, "join*": {module: "lib", form: ["fn", "xs", ["reduce", ["fn", ["a", "b"], ["list", ["quote", "join"], "a", "b"]], "xs"]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}}, "define-macro": {module: "lib", form: ["fn", (function () {
  var _g75 = ["name", "args"];
  _g75.rest = "body";
  return(_g75);
})(), ["let", ["form", ["quasiquote", ["fn", ["unquote", "args"], ["unquote-splicing", "body"]]]], ["eval", ["quasiquote", (function () {
  var _g76 = ["setenv", ["quote", ["unquote", "name"]]];
  _g76.macro = ["unquote", "form"];
  _g76.form = ["quote", ["unquote", "form"]];
  return(_g76);
})()]]], "nil"], export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g77 = sub(body, 0);
  var form = join(["fn", args], _g77);
  eval((function () {
    var _g78 = ["setenv", ["quote", name]];
    _g78.form = ["quote", form];
    _g78.macro = form;
    return(_g78);
  })());
  return(undefined);
}}, _g56: {module: "lib", variable: true}, "nil?": {module: "lib", export: true, variable: true}, "list*": {module: "lib", form: ["fn", "xs", ["if", ["empty?", "xs"], [], ["let", ["l", []], ["across", ["xs", "x", "i"], ["if", ["=", "i", ["-", ["length", "xs"], 1]], ["set", "l", ["list", ["quote", "join"], ["join", ["quote", ["list"]], "l"], "x"]], ["add", "l", "x"]]], "l"]]], export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g79 = xs;
    while ((i < length(_g79))) {
      var x = _g79[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}}, let: {module: "lib", form: ["fn", (function () {
  var _g80 = ["bindings"];
  _g80.rest = "body";
  return(_g80);
})(), ["let", ["i", 0, "renames", [], "locals", []], ["map", ["fn", [["lh", "rh"]], ["across", [["bind", "lh", "rh"], ["id", "val"]], ["if", ["bound?", "id"], ["let", ["rename", ["make-id"]], ["add", "renames", "id"], ["add", "renames", "rename"], ["set", "id", "rename"]], (function () {
  var _g81 = ["setenv", "id"];
  _g81.variable = true;
  return(_g81);
})()], ["add", "locals", ["quasiquote", ["%local", ["unquote", "id"], ["unquote", "val"]]]]]], ["pairwise", "bindings"]], ["quasiquote", ["do", ["unquote-splicing", "locals"], ["let-symbol", ["unquote", "renames"], ["unquote-splicing", "body"]]]]]], export: true, macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g82 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g83) {
    var lh = _g83[0];
    var rh = _g83[1];
    var _g85 = 0;
    var _g84 = bind(lh, rh);
    while ((_g85 < length(_g84))) {
      var _g86 = _g84[_g85];
      var id = _g86[0];
      var val = _g86[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g85 = (_g85 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g82)])));
}}, "id-count": {module: "lib", variable: true}, "define-local": {module: "lib", form: ["fn", (function () {
  var _g87 = ["name", "x"];
  _g87.rest = "body";
  return(_g87);
})(), (function () {
  var _g88 = ["setenv", "name"];
  _g88.variable = true;
  return(_g88);
})(), ["if", ["not", ["empty?", "body"]], ["let", [["args", "body"], ["bind-arguments", "x", "body"]], ["quasiquote", ["%local-function", ["unquote", "name"], ["unquote", "args"], ["unquote-splicing", "body"]]]], ["quasiquote", ["%local", ["unquote", "name"], ["unquote", "x"]]]]], export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g89 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g89))) {
    var _g90 = bind_arguments(x, _g89);
    var args = _g90[0];
    var _g91 = _g90[1];
    return(join(["%local-function", name, args], _g91));
  } else {
    return(["%local", name, x]);
  }
}}, "string?": {module: "lib", export: true, variable: true}, join: {module: "lib", export: true, variable: true}, "keys?": {module: "lib", export: true, variable: true}, _g99: {module: "lib", variable: true}, "let-macro": {module: "lib", form: ["fn", (function () {
  var _g92 = ["definitions"];
  _g92.rest = "body";
  return(_g92);
})(), ["with-frame", ["map", ["fn", ["m"], ["macroexpand", ["quasiquote", ["define-macro", ["unquote-splicing", "m"]]]]], "definitions"], ["quasiquote", ["do", ["unquote-splicing", ["macroexpand", "body"]]]]]], export: true, macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g93 = sub(body, 0);
  add(environment, {});
  var _g94 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g93)));
  })();
  drop(environment);
  return(_g94);
}}, "symbol?": {module: "lib", variable: true}, setenv: {module: "lib", export: true, variable: true}, _g25: {module: "lib", variable: true}, fn: {module: "lib", form: ["fn", (function () {
  var _g95 = ["args"];
  _g95.rest = "body";
  return(_g95);
})(), ["let", [["args", "body"], ["bind-arguments", "args", "body"]], ["quasiquote", ["%function", ["unquote", "args"], ["unquote-splicing", "body"]]]]], export: true, macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g96 = sub(body, 0);
  var _g97 = bind_arguments(args, _g96);
  var args = _g97[0];
  var _g98 = _g97[1];
  return(join(["%function", args], _g98));
}}, list: {module: "lib", form: ["fn", "body", ["let", ["l", ["quasiquote", ["%array", ["unquote-splicing", "body"]]]], ["if", ["not", ["keys?", "body"]], "l", ["let", ["id", ["make-id"], "init", []], ["each", ["body", "k", "v"], ["add", "init", ["quasiquote", ["set", ["get", ["unquote", "id"], ["quote", ["unquote", "k"]]], ["unquote", "v"]]]]], ["quasiquote", ["let", [["unquote", "id"], ["unquote", "l"]], ["unquote-splicing", "init"], ["unquote", "id"]]]]]]], export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g99 = body;
    for (k in _g99) {
      if (isNaN(parseInt(k))) {
        var v = _g99[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}}, mapo: {module: "lib", export: true, variable: true}, "function?": {module: "lib", export: true, variable: true}, escape: {module: "lib", variable: true}, _g21: {module: "lib", variable: true}, each: {module: "lib", form: ["fn", (function () {
  var _g100 = [["t", "k", "v"]];
  _g100.rest = "body";
  return(_g100);
})(), ["let", ["t1", ["make-id"]], ["quasiquote", ["let", [["unquote", "k"], "nil", ["unquote", "t1"], ["unquote", "t"]], ["%for", [["unquote", "t1"], ["unquote", "k"]], ["if", (function () {
  var _g101 = ["target"];
  _g101.lua = ["not", ["number?", ["unquote", "k"]]];
  _g101.js = ["isNaN", ["parseInt", ["unquote", "k"]]];
  return(_g101);
})(), ["let", [["unquote", "v"], ["get", ["unquote", "t1"], ["unquote", "k"]]], ["unquote-splicing", "body"]]]]]]]], export: true, macro: function (_g102) {
  var t = _g102[0];
  var k = _g102[1];
  var v = _g102[2];
  var body = unstash(sublist(arguments, 1));
  var _g103 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g104 = ["target"];
    _g104.lua = ["not", ["number?", k]];
    _g104.js = ["isNaN", ["parseInt", k]];
    return(_g104);
  })(), join(["let", [v, ["get", t1, k]]], _g103)]]]);
}}, last: {module: "lib", export: true, variable: true}, "string-literal?": {module: "lib", export: true, variable: true}, keep: {module: "lib", export: true, variable: true}, _g37: {module: "lib", variable: true}, "splice?": {module: "lib", variable: true}, "can-unquote?": {module: "lib", variable: true}, quoted: {module: "lib", export: true, variable: true}, target: {module: "lib", form: ["fn", "clauses", ["get", "clauses", "target"]], macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, export: true, variable: true}, _g94: {module: "lib", variable: true}, map: {module: "lib", export: true, variable: true}, "symbol-expansion": {module: "lib", variable: true}, iterate: {module: "lib", export: true, variable: true}, _g36: {module: "lib", variable: true}, sublist: {module: "lib", variable: true}, _g27: {module: "lib", variable: true}, _g44: {module: "lib", variable: true}, _g22: {module: "lib", variable: true}, "macro?": {module: "lib", variable: true}, hd: {module: "lib", export: true, variable: true}, quasiquote: {module: "lib", form: ["fn", ["form"], ["quasiexpand", "form", 1]], export: true, macro: function (form) {
  return(quasiexpand(form, 1));
}}, _g17: {module: "lib", variable: true}, char: {module: "lib", export: true, variable: true}, "%export": {module: "lib", form: ["fn", [], ["let", ["toplevel", ["hd", "environment"], "m", ["make-id"], "k", ["module-key", "current-module"], "body", ["quasiquote", [["define", ["unquote", "m"], ["get", "modules", ["quote", ["unquote", "k"]]]]]]], ["each", ["toplevel", "k", "v"], ["let", ["b", ["quasiquote", ["get", ["get", ["unquote", "m"], ["quote", ["unquote", "k"]]], ["quote", "variable"]]]], ["if", ["and", ["get", "v", ["quote", "variable"]], ["=", ["get", "v", ["quote", "module"]], "current-module"]], ["add", "body", ["quasiquote", ["set", ["unquote", "b"], ["unquote", "k"]]]]]]], ["quasiquote", ["do", ["unquote-splicing", "body"]]]]], export: true, macro: function () {
  var toplevel = hd(environment);
  var m = make_id();
  var k = module_key(current_module);
  var body = [["define", m, ["get", "modules", ["quote", k]]]];
  var k = undefined;
  var _g105 = toplevel;
  for (k in _g105) {
    if (isNaN(parseInt(k))) {
      var v = _g105[k];
      var b = ["get", ["get", m, ["quote", k]], ["quote", "variable"]];
      if ((v.variable && (v.module === current_module))) {
        add(body, ["set", b, k]);
      }
    }
  }
  return(join(["do"], body));
}}, drop: {module: "lib", export: true, variable: true}, "special?": {module: "lib", export: true, variable: true}, "with-bindings": {module: "lib", form: ["fn", (function () {
  var _g106 = [["names"]];
  _g106.rest = "body";
  return(_g106);
})(), ["let", ["x", ["make-id"]], ["quasiquote", ["with-frame", ["across", [["unquote", "names"], ["unquote", "x"]], (function () {
  var _g107 = ["setenv", ["unquote", "x"]];
  _g107.variable = true;
  return(_g107);
})()], ["unquote-splicing", "body"]]]]], export: true, macro: function (_g108) {
  var names = _g108[0];
  var body = unstash(sublist(arguments, 1));
  var _g109 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g110 = ["setenv", x];
    _g110.variable = true;
    return(_g110);
  })()]], _g109));
}}, mapt: {module: "lib", export: true, variable: true}, "table?": {module: "lib", export: true, variable: true}, across: {module: "lib", form: ["fn", (function () {
  var _g111 = [["l", "v", "i", "start"]];
  _g111.rest = "body";
  return(_g111);
})(), ["let", ["l1", ["make-id"]], ["set", "i", ["or", "i", ["make-id"]]], ["set", "start", ["or", "start", 0]], ["quasiquote", ["let", [["unquote", "i"], ["unquote", "start"], ["unquote", "l1"], ["unquote", "l"]], ["while", ["<", ["unquote", "i"], ["length", ["unquote", "l1"]]], ["let", [["unquote", "v"], ["at", ["unquote", "l1"], ["unquote", "i"]]], ["unquote-splicing", "body"], ["inc", ["unquote", "i"]]]]]]]], export: true, macro: function (_g112) {
  var l = _g112[0];
  var v = _g112[1];
  var i = _g112[2];
  var start = _g112[3];
  var body = unstash(sublist(arguments, 1));
  var _g113 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g113, [["inc", i]]))]]);
}}, "cat!": {module: "lib", form: ["fn", (function () {
  var _g114 = ["a"];
  _g114.rest = "bs";
  return(_g114);
})(), ["quasiquote", ["set", ["unquote", "a"], ["cat", ["unquote", "a"], ["unquote-splicing", "bs"]]]]], export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g115 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g115)]);
}}, "composite?": {module: "lib", export: true, variable: true}, _g31: {module: "lib", variable: true}, "map*": {module: "lib", export: true, variable: true}, unstash: {module: "lib", export: true, variable: true}, "list?": {module: "lib", export: true, variable: true}, extend: {module: "lib", export: true, variable: true}, quote: {module: "lib", form: ["fn", ["form"], ["quoted", "form"]], export: true, macro: function (form) {
  return(quoted(form));
}}, code: {module: "lib", export: true, variable: true}, "define-symbol": {module: "lib", form: ["fn", ["name", "expansion"], (function () {
  var _g116 = ["setenv", "name"];
  _g116.symbol = "expansion";
  return(_g116);
})(), "nil"], export: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}}}}, boot: {import: ["lib", "compiler"], toplevel: {}}};
environment = [{"define-module": {module: "compiler", form: ["fn", (function () {
  var _g117 = ["spec"];
  _g117.rest = "body";
  return(_g117);
})(), ["let", [(function () {
  var _g118 = [];
  _g118.import = "imp";
  _g118.export = "exp";
  return(_g118);
})(), "body"], ["map", "load-module", "imp"], ["set", ["get", "modules", ["module-key", "spec"]], (function () {
  var _g119 = ["table"];
  _g119.import = "imp";
  _g119.toplevel = ["table"];
  return(_g119);
})()], ["across", [["or", "exp", []], "k"], (function () {
  var _g120 = ["setenv", "k"];
  _g120.export = true;
  return(_g120);
})()]], "nil"], export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g121 = sub(body, 0);
  var imp = _g121.import;
  var exp = _g121.export;
  map(load_module, imp);
  modules[module_key(spec)] = {import: imp, toplevel: {}};
  var _g123 = 0;
  var _g122 = (exp || []);
  while ((_g123 < length(_g122))) {
    var k = _g122[_g123];
    setenv(k, {_stash: true, export: true});
    _g123 = (_g123 + 1);
  }
  return(undefined);
}}}];
delimiters = {")": true, "\n": true, ";": true, "(": true};
whitespace = {"\n": true, "\t": true, " ": true};
make_stream = function (str) {
  return({len: length(str), string: str, pos: 0});
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
  var _g131 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g132 = _g131;
    for (k1 in _g132) {
      if (isNaN(parseInt(k1))) {
        var v = _g132[k1];
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
    var _g184 = args;
    for (k in _g184) {
      if (isNaN(parseInt(k))) {
        var v = _g184[k];
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
    var _g185 = args;
    for (k in _g185) {
      if (isNaN(parseInt(k))) {
        var v = _g185[k];
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
      var _g186 = l;
      for (k in _g186) {
        if (isNaN(parseInt(k))) {
          var v = _g186[k];
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
    var _g188 = 0;
    var _g187 = args;
    while ((_g188 < length(_g187))) {
      var arg = _g187[_g188];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g188 = (_g188 + 1);
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
    var _g189 = lh;
    while ((i < length(_g189))) {
      var x = _g189[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g190 = lh;
    for (k in _g190) {
      if (isNaN(parseInt(k))) {
        var v = _g190[k];
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
      var _g128 = form[0];
      var _g191 = form[1];
      var t = _g191[0];
      var k = _g191[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g129 = form[0];
      var args = form[1];
      var _g192 = sub(form, 2);
      add(environment, {});
      var _g194 = (function () {
        var _g196 = 0;
        var _g195 = args;
        while ((_g196 < length(_g195))) {
          var _g193 = _g195[_g196];
          setenv(_g193, {_stash: true, variable: true});
          _g196 = (_g196 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g192)));
      })();
      drop(environment);
      return(_g194);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g130 = form[0];
      var name = form[1];
      var _g197 = form[2];
      var _g198 = sub(form, 3);
      add(environment, {});
      var _g200 = (function () {
        var _g202 = 0;
        var _g201 = _g197;
        while ((_g202 < length(_g201))) {
          var _g199 = _g201[_g202];
          setenv(_g199, {_stash: true, variable: true});
          _g202 = (_g202 + 1);
        }
        return(join([x, name, map42(macroexpand, _g197)], macroexpand(_g198)));
      })();
      drop(environment);
      return(_g200);
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
  var _g203 = form;
  for (k in _g203) {
    if (isNaN(parseInt(k))) {
      var v = _g203[k];
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
  var _g205 = 0;
  var _g204 = form;
  while ((_g205 < length(_g204))) {
    var x = _g204[_g205];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g205 = (_g205 + 1);
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
  var _g206 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g206, upto));
  } else {
    var l = sublist(x, _g206, upto);
    var k = undefined;
    var _g207 = x;
    for (k in _g207) {
      if (isNaN(parseInt(k))) {
        var v = _g207[k];
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
    var _g208 = l1;
    for (k in _g208) {
      if (isNaN(parseInt(k))) {
        var v = _g208[k];
        l[k] = v;
      }
    }
    var _g210 = undefined;
    var _g209 = l2;
    for (_g210 in _g209) {
      if (isNaN(parseInt(_g210))) {
        var v = _g209[_g210];
        l[_g210] = v;
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
  var _g212 = 0;
  var _g211 = l;
  while ((_g212 < length(_g211))) {
    var x = _g211[_g212];
    if (f(x)) {
      add(l1, x);
    }
    _g212 = (_g212 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g214 = 0;
  var _g213 = l;
  while ((_g214 < length(_g213))) {
    var x = _g213[_g214];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g214 = (_g214 + 1);
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
  var _g224 = 0;
  var _g223 = l;
  while ((_g224 < length(_g223))) {
    var x = _g223[_g224];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g224 = (_g224 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g225 = t;
  for (k in _g225) {
    if (isNaN(parseInt(k))) {
      var v = _g225[k];
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
  var _g226 = t;
  for (k in _g226) {
    if (isNaN(parseInt(k))) {
      var v = _g226[k];
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
  var _g227 = t;
  for (k in _g227) {
    if (isNaN(parseInt(k))) {
      var v = _g227[k];
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
  var _g228 = t;
  for (k in _g228) {
    if (isNaN(parseInt(k))) {
      var v = _g228[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g229 = sub(xs, 0);
  return(join(t, _g229));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g230 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g231 = t;
  for (k in _g231) {
    if (isNaN(parseInt(k))) {
      var v = _g231[k];
      if (!(_g230[k])) {
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
  var _g232 = sub(xs, 0);
  if (empty63(_g232)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g232));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g235 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g235));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g236 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g236)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g237 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g237));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g238 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g238)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g239 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g239)));
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
    var _g240 = x;
    for (k in _g240) {
      if (isNaN(parseInt(k))) {
        var v = _g240[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g241 = x1;
    while ((i < length(_g241))) {
      var y = _g241[i];
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
  var _g242 = stash(args);
  return((f.apply)(f, _g242));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
infix = {common: {"/": true, ">": true, "%": true, ">=": true, "<=": true, "-": true, "<": true, "+": true, "*": true}, js: {"or": "||", "=": "===", "and": "&&", "~=": "!=", "cat": "+"}, lua: {"cat": "..", "=": "==", "and": true, "~=": true, "or": true}};
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
  var _g246 = args;
  while ((i < length(_g246))) {
    var arg = _g246[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g247 = unstash(sublist(arguments, 1));
  var tail63 = _g247["tail?"];
  var str = "";
  var i = 0;
  var _g248 = forms;
  while ((i < length(_g248))) {
    var x = _g248[i];
    var t63 = (tail63 && (i === (length(forms) - 1)));
    str = (str + compile(x, {_stash: true, "tail?": t63, "stmt?": true}));
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
compile_infix = function (_g249) {
  var op = _g249[0];
  var args = sub(_g249, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g250 = args;
  while ((i < length(_g250))) {
    var arg = _g250[i];
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
  var _g251 = (function () {
    indent_level = (indent_level + 1);
    var _g252 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g252);
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
    return((ind + "if (" + cond1 + ") {\n" + _g251 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g251 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g251 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g251 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g251 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g251 + tr));
  }
};
compile_function = function (args, body) {
  var _g253 = unstash(sublist(arguments, 2));
  var prefix = _g253.prefix;
  var name = _g253.name;
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
    var _g254 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g254);
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
  var _g255 = getenv(hd(form));
  var stmt = _g255.stmt;
  var self_tr63 = _g255.tr;
  var special = _g255.special;
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
  var _g299 = unstash(sublist(arguments, 1));
  var tail63 = _g299["tail?"];
  var stmt63 = _g299["stmt?"];
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
  var _g300 = toplevel;
  for (name in _g300) {
    if (isNaN(parseInt(name))) {
      var binding = _g300[name];
      if ((binding.module === k)) {
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
  var _g301 = m.toplevel;
  for (k in _g301) {
    if (isNaN(parseInt(k))) {
      var v = _g301[k];
      if (v.export) {
        frame[k] = v;
      }
    }
  }
};
in_module = function (spec) {
  load_module(spec);
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g302 = m.toplevel;
  for (k in _g302) {
    if (isNaN(parseInt(k))) {
      var v = _g302[k];
      frame[k] = v;
    }
  }
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
    return(extend(b, {_stash: true, form: ["quote", b.form], macro: b.form}));
  } else if ((b.special && b.form)) {
    return(extend(b, {_stash: true, form: ["quote", b.form], special: b.form}));
  } else if (is63(b.variable)) {
    return(b);
  }
};
quote_frame = function (t) {
  return(join(["%object"], mapo(function (_g245, b) {
    return(join(["table"], quote_binding(b)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g310 = ["table"];
  _g310.import = quoted(m.import);
  _g310.toplevel = quote_frame(m.toplevel);
  return(_g310);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
rep = function (str) {
  var _g311 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g313) {
      return([false, _g313]);
    }
  })();
  var _g1 = _g311[0];
  var x = _g311[1];
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
  var _g312 = args;
  while ((i < length(_g312))) {
    var arg = _g312[i];
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
