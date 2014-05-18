infix = {js: {"and": "&&", "~=": "!=", "or": "||", "=": "===", "cat": "+"}, common: {"<=": true, "*": true, "%": true, "/": true, ">=": true, "+": true, "<": true, "-": true, ">": true}, lua: {"and": true, "~=": true, "or": true, "=": "==", "cat": ".."}};
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
  var _g6 = args;
  while ((i < length(_g6))) {
    var arg = _g6[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g7 = unstash(sub(arguments, 1));
  var tail63 = _g7["tail?"];
  var str = "";
  var i = 0;
  var _g8 = forms;
  while ((i < length(_g8))) {
    var x = _g8[i];
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
compile_infix = function (_g9) {
  var op = _g9[0];
  var args = sub(_g9, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g10 = args;
  while ((i < length(_g10))) {
    var arg = _g10[i];
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
  var _g11 = (function () {
    indent_level = (indent_level + 1);
    var _g12 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g12);
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
    return((ind + "if (" + cond1 + ") {\n" + _g11 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g11 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g11 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g11 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g11 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g11 + tr));
  }
};
compile_function = function (args, body) {
  var _g13 = unstash(sub(arguments, 2));
  var name = _g13.name;
  var prefix = _g13.prefix;
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
    var _g14 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g14);
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
  var _g15 = getenv(hd(form));
  var self_tr63 = _g15.tr;
  var stmt = _g15.stmt;
  var special = _g15.special;
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
  var _g59 = unstash(sub(arguments, 1));
  var tail63 = _g59["tail?"];
  var stmt63 = _g59["stmt?"];
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
vm = require("vm");
global.require = require;
run = vm.runInThisContext;
eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};
modules = {};
exports = {};
imports = {};
loading = {};
save_modules63 = false;
compiler_output = undefined;
compiling63 = false;
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  return(compile_toplevel(join(["do"], body)));
};
load_module = function (spec) {
  var k = to_string(spec);
  if (list63(spec)) {
    throw "Unsupported module specification";
  } else if ((loading[k] && !(modules[k]))) {
    return;
  } else if ((nil63(modules[k]) || (compiling63 && nil63(loading[k])))) {
    _37load_module(k);
  }
  return(open_module(spec));
};
_37load_module = function (k) {
  var file = (k + ".l");
  var frame = {};
  var module = {};
  loading[k] = true;
  add(environment, frame);
  var compiled = compile_file(file);
  drop(environment);
  var x = undefined;
  var _g60 = frame;
  for (x in _g60) {
    if (isNaN(parseInt(x))) {
      var v = _g60[x];
      if (exports[x]) {
        module[x] = v;
      }
    }
  }
  modules[k] = module;
  if (compiling63) {
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
open_module = function (spec) {
  var k = to_string(spec);
  var module = modules[k];
  var toplevel = hd(environment);
  var k = undefined;
  var _g61 = module;
  for (k in _g61) {
    if (isNaN(parseInt(k))) {
      var v = _g61[k];
      toplevel[k] = v;
    }
  }
};
quote_binding = function (x) {
  if (is63(x.symbol)) {
    return(extend(x, {_stash: true, symbol: ["quote", x.symbol]}));
  } else if ((x.macro && x.form)) {
    return(extend(x, {_stash: true, macro: x.form}));
  } else if ((x.special && x.form)) {
    return(extend(x, {_stash: true, special: x.form}));
  }
};
save_modules = function () {
  var save = function (x) {
    compiler_output = (compiler_output + compile_toplevel(x));
  };
  save(["define", "environment", ["list", ["table"]]]);
  var x = quote_binding(getenv("define-module"));
  save(join(["setenv", ["quote", "define-module"]], x));
  var m = undefined;
  var _g67 = modules;
  for (m in _g67) {
    if (isNaN(parseInt(m))) {
      var v = _g67[m];
      save(["set", ["get", "modules", ["quote", m]], ["table"]]);
      var k = undefined;
      var _g68 = map42(quote_binding, v);
      for (k in _g68) {
        if (isNaN(parseInt(k))) {
          var v = _g68[k];
          save(["set", ["get", ["get", "modules", ["quote", m]], ["quote", k]], join(["table"], v)]);
        }
      }
    }
  }
};
compile_module = function (spec) {
  compiling63 = true;
  compiler_output = "";
  load_module(spec);
  map(open_module, imports);
  if (save_modules63) {
    return(save_modules());
  }
};
setenv = function (k) {
  var keys = unstash(sub(arguments, 1));
  var _g69 = sub(keys, 0);
  var frame = last(environment);
  var x = (frame[k] || {});
  var k1 = undefined;
  var _g70 = _g69;
  for (k1 in _g70) {
    if (isNaN(parseInt(k1))) {
      var v = _g70[k1];
      x[k1] = v;
    }
  }
  frame[k] = x;
};
getenv = function (k) {
  if (string63(k)) {
    return(find(function (e) {
      return(e[k]);
    }, reverse(environment)));
  }
};
macro_function = function (k) {
  var x = getenv(k);
  return((x && x.macro));
};
macro63 = function (k) {
  return(is63(macro_function(k)));
};
special63 = function (k) {
  var x = getenv(k);
  return((x && x.special));
};
special_form63 = function (form) {
  return((list63(form) && special63(hd(form))));
};
symbol_expansion = function (k) {
  var x = getenv(k);
  return((x && x.symbol));
};
symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};
variable63 = function (k) {
  var x = last(environment)[k];
  return((x && x.variable));
};
bound63 = function (x) {
  return((macro63(x) || special63(x) || symbol63(x) || variable63(x)));
};
pending = {};
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
    var _g123 = args;
    for (k in _g123) {
      if (isNaN(parseInt(k))) {
        var v = _g123[k];
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
    var _g124 = args;
    for (k in _g124) {
      if (isNaN(parseInt(k))) {
        var v = _g124[k];
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
      var _g125 = l;
      for (k in _g125) {
        if (isNaN(parseInt(k))) {
          var v = _g125[k];
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
      return(["unstash", ["sub", "arguments", length(args1)]]);
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
    var _g127 = 0;
    var _g126 = args;
    while ((_g127 < length(_g126))) {
      var arg = _g126[_g127];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g127 = (_g127 + 1);
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
    var _g128 = lh;
    while ((i < length(_g128))) {
      var x = _g128[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g129 = lh;
    for (k in _g129) {
      if (isNaN(parseInt(k))) {
        var v = _g129[k];
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
      var _g2 = form[0];
      var _g130 = form[1];
      var t = _g130[0];
      var k = _g130[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g3 = form[0];
      var args = form[1];
      var _g131 = sub(form, 2);
      add(environment, {});
      var _g133 = (function () {
        var _g135 = 0;
        var _g134 = args;
        while ((_g135 < length(_g134))) {
          var _g132 = _g134[_g135];
          setenv(_g132, {_stash: true, variable: true});
          _g135 = (_g135 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g131)));
      })();
      drop(environment);
      return(_g133);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g4 = form[0];
      var name = form[1];
      var _g136 = form[2];
      var _g137 = sub(form, 3);
      add(environment, {});
      var _g139 = (function () {
        var _g141 = 0;
        var _g140 = _g136;
        while ((_g141 < length(_g140))) {
          var _g138 = _g140[_g141];
          setenv(_g138, {_stash: true, variable: true});
          _g141 = (_g141 + 1);
        }
        return(join([x, name, map42(macroexpand, _g136)], macroexpand(_g137)));
      })();
      drop(environment);
      return(_g139);
    } else if (macro63(x)) {
      return(macroexpand(apply(macro_function(x), tl(form))));
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
  var _g142 = form;
  for (k in _g142) {
    if (isNaN(parseInt(k))) {
      var v = _g142[k];
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
  var _g144 = 0;
  var _g143 = form;
  while ((_g144 < length(_g143))) {
    var x = _g143[_g144];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g144 = (_g144 + 1);
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
sub = function (x, from, upto) {
  var _g145 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g145, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g145, upto);
    var k = undefined;
    var _g146 = x;
    for (k in _g146) {
      if (isNaN(parseInt(k))) {
        var v = _g146[k];
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
    var k = undefined;
    var _g147 = l1;
    for (k in _g147) {
      if (isNaN(parseInt(k))) {
        var v = _g147[k];
        l[k] = v;
      }
    }
    var _g149 = undefined;
    var _g148 = l2;
    for (_g149 in _g148) {
      if (isNaN(parseInt(_g149))) {
        var v = _g148[_g149];
        l[_g149] = v;
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
  var _g151 = 0;
  var _g150 = l;
  while ((_g151 < length(_g150))) {
    var x = _g150[_g151];
    if (f(x)) {
      add(l1, x);
    }
    _g151 = (_g151 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g153 = 0;
  var _g152 = l;
  while ((_g153 < length(_g152))) {
    var x = _g152[_g153];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g153 = (_g153 + 1);
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
  var _g163 = 0;
  var _g162 = l;
  while ((_g163 < length(_g162))) {
    var x = _g162[_g163];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g163 = (_g163 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g164 = t;
  for (k in _g164) {
    if (isNaN(parseInt(k))) {
      var v = _g164[k];
      var x = f(v);
      if (is63(x)) {
        l[k] = x;
      }
    }
  }
  return(l);
};
keys63 = function (t) {
  var k63 = false;
  var k = undefined;
  var _g165 = t;
  for (k in _g165) {
    if (isNaN(parseInt(k))) {
      var v = _g165[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sub(arguments, 1));
  var _g166 = sub(xs, 0);
  return(join(t, _g166));
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
  var xs = unstash(sub(arguments, 0));
  var _g167 = sub(xs, 0);
  if (empty63(_g167)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g167));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g170 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g170));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g171 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g171)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g172 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g172));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g173 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g173)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g174 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g174)));
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
    var _g175 = x;
    for (k in _g175) {
      if (isNaN(parseInt(k))) {
        var v = _g175[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g176 = x1;
    while ((i < length(_g176))) {
      var y = _g176[i];
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
  var _g177 = stash(args);
  return((f.apply)(f, _g177));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {")": true, "(": true, ";": true, "\n": true};
whitespace = {"\t": true, "\n": true, " ": true};
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
rep = function (str) {
  var _g181 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g183) {
      return([false, _g183]);
    }
  })();
  var _g1 = _g181[0];
  var x = _g181[1];
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
  print((to_string("usage: lumen [options] [inputs]") + " "));
  print((to_string("options:") + " "));
  print((to_string("  -o <output>\tOutput file") + " "));
  print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
  print((to_string("  -e <expr>\tExpression to evaluate") + " "));
  print((to_string("  -s \t\tSave environment") + " "));
  return(exit());
};
main = function () {
  var args = sub(process.argv, 2);
  if (((hd(args) === "-h") || (hd(args) === "--help"))) {
    usage();
  }
  var inputs = [];
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var i = 0;
  var _g182 = args;
  while ((i < length(_g182))) {
    var arg = _g182[i];
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
    } else if ((arg === "-s")) {
      save_modules63 = true;
    } else if (("-" != char(arg, 0))) {
      add(inputs, arg);
    }
    i = (i + 1);
  }
  if (output) {
    if (target1) {
      target = target1;
    }
    map(compile_module, inputs);
    var main = compile(["main"]);
    var compiled = (compiler_output + main);
    return(write_file(output, compiled));
  } else {
    map(load_module, inputs);
    map(open_module, imports);
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
environment = [{}];
setenv("define-module", {_stash: true, form: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g184 = sub(body, 0);
  var exp = _g184.export;
  var imp = _g184.import;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g186 = 0;
  var _g185 = (exp || []);
  while ((_g186 < length(_g185))) {
    var x = _g185[_g186];
    exports[x] = true;
    _g186 = (_g186 + 1);
  }
  return(undefined);
}, macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g187 = sub(body, 0);
  var exp = _g187.export;
  var imp = _g187.import;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g189 = 0;
  var _g188 = (exp || []);
  while ((_g189 < length(_g188))) {
    var x = _g188[_g189];
    exports[x] = true;
    _g189 = (_g189 + 1);
  }
  return(undefined);
}});
modules.reader = {};
modules.reader["define-reader"] = {form: function (_g190) {
  var char = _g190[0];
  var stream = _g190[1];
  var body = unstash(sub(arguments, 1));
  var _g191 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g191)]);
}, macro: function (_g192) {
  var char = _g192[0];
  var stream = _g192[1];
  var body = unstash(sub(arguments, 1));
  var _g193 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g193)]);
}};
modules.compiler = {};
modules.compiler["do"] = {form: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}};
modules.compiler["error"] = {form: function (_g194) {
  var x = _g194[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true, special: function (_g195) {
  var x = _g195[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}};
modules.compiler["%local-function"] = {form: function (_g196) {
  var name = _g196[0];
  var args = _g196[1];
  var body = sub(_g196, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}, tr: true, stmt: true, special: function (_g197) {
  var name = _g197[0];
  var args = _g197[1];
  var body = sub(_g197, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}};
modules.compiler["with-indent"] = {form: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.compiler["set"] = {form: function (_g198) {
  var lh = _g198[0];
  var rh = _g198[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true, special: function (_g199) {
  var lh = _g199[0];
  var rh = _g199[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}};
modules.compiler["%object"] = {form: function (forms) {
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
  var _g200 = pairs;
  while ((i < length(_g200))) {
    var _g201 = _g200[i];
    var k = _g201[0];
    var v = _g201[1];
    if (!(string63(k))) {
      throw ("Illegal object key: " + to_string(k));
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
}, special: function (forms) {
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
  var _g202 = pairs;
  while ((i < length(_g202))) {
    var _g203 = _g202[i];
    var k = _g203[0];
    var v = _g203[1];
    if (!(string63(k))) {
      throw ("Illegal object key: " + to_string(k));
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
}};
modules.compiler["if"] = {form: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g204 = form;
  while ((i < length(_g204))) {
    var condition = _g204[i];
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
}, tr: true, stmt: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g205 = form;
  while ((i < length(_g205))) {
    var condition = _g205[i];
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
}};
modules.compiler["break"] = {form: function (_g5) {
  return((indentation() + "break"));
}, stmt: true, special: function (_g5) {
  return((indentation() + "break"));
}};
modules.compiler["%try"] = {form: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g206 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g206);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g207 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g207);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g208 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g208);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g209 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g209);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}};
modules.compiler["while"] = {form: function (_g210) {
  var condition = _g210[0];
  var body = sub(_g210, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g211 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g211);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true, special: function (_g212) {
  var condition = _g212[0];
  var body = sub(_g212, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g213 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g213);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}};
modules.compiler["define-module"] = {form: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g214 = sub(body, 0);
  var exp = _g214.export;
  var imp = _g214.import;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g216 = 0;
  var _g215 = (exp || []);
  while ((_g216 < length(_g215))) {
    var x = _g215[_g216];
    exports[x] = true;
    _g216 = (_g216 + 1);
  }
  return(undefined);
}, macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g217 = sub(body, 0);
  var exp = _g217.export;
  var imp = _g217.import;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g219 = 0;
  var _g218 = (exp || []);
  while ((_g219 < length(_g218))) {
    var x = _g218[_g219];
    exports[x] = true;
    _g219 = (_g219 + 1);
  }
  return(undefined);
}};
modules.compiler["%global-function"] = {form: function (_g220) {
  var name = _g220[0];
  var args = _g220[1];
  var body = sub(_g220, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true, special: function (_g221) {
  var name = _g221[0];
  var args = _g221[1];
  var body = sub(_g221, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}};
modules.compiler["%local"] = {form: function (_g222) {
  var name = _g222[0];
  var value = _g222[1];
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
}, stmt: true, special: function (_g223) {
  var name = _g223[0];
  var value = _g223[1];
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
}};
modules.compiler["return"] = {form: function (_g224) {
  var x = _g224[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true, special: function (_g225) {
  var x = _g225[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}};
modules.compiler["%for"] = {form: function (_g226) {
  var _g227 = _g226[0];
  var t = _g227[0];
  var k = _g227[1];
  var body = sub(_g226, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g228 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g228);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true, special: function (_g229) {
  var _g230 = _g229[0];
  var t = _g230[0];
  var k = _g230[1];
  var body = sub(_g229, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g231 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g231);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}};
modules.compiler["get"] = {form: function (_g232) {
  var t = _g232[0];
  var k = _g232[1];
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
}, special: function (_g233) {
  var t = _g233[0];
  var k = _g233[1];
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
}};
modules.compiler["not"] = {form: function (_g234) {
  var x = _g234[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, special: function (_g235) {
  var x = _g235[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}};
modules.compiler["%array"] = {form: function (forms) {
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
  var _g236 = forms;
  while ((i < length(_g236))) {
    var x = _g236[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}, special: function (forms) {
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
  var _g237 = forms;
  while ((i < length(_g237))) {
    var x = _g237[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};
modules.compiler["%function"] = {form: function (_g238) {
  var args = _g238[0];
  var body = sub(_g238, 1);
  return(compile_function(args, body));
}, special: function (_g239) {
  var args = _g239[0];
  var body = sub(_g239, 1);
  return(compile_function(args, body));
}};
modules.lib = {};
modules.lib.language = {form: function () {
  return(["quote", target]);
}, macro: function () {
  return(["quote", target]);
}};
modules.lib.fn = {form: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g240 = sub(body, 0);
  var _g241 = bind_arguments(args, _g240);
  var args = _g241[0];
  var _g242 = _g241[1];
  return(join(["%function", args], _g242));
}, macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g243 = sub(body, 0);
  var _g244 = bind_arguments(args, _g243);
  var args = _g244[0];
  var _g245 = _g244[1];
  return(join(["%function", args], _g245));
}};
modules.lib["define-special"] = {form: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g246 = sub(body, 0);
  var form = join(["fn", args], _g246);
  var keys = sub(_g246, length(_g246));
  eval(join((function () {
    var _g247 = ["setenv", ["quote", name]];
    _g247.form = ["quote", form];
    _g247.special = form;
    return(_g247);
  })(), keys));
  return(undefined);
}, macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g248 = sub(body, 0);
  var form = join(["fn", args], _g248);
  var keys = sub(_g248, length(_g248));
  eval(join((function () {
    var _g249 = ["setenv", ["quote", name]];
    _g249.form = ["quote", form];
    _g249.special = form;
    return(_g249);
  })(), keys));
  return(undefined);
}};
modules.lib.quasiquote = {form: function (form) {
  return(quasiexpand(form, 1));
}, macro: function (form) {
  return(quasiexpand(form, 1));
}};
modules.lib["join!"] = {form: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g250 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g250)]);
}, macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g251 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g251)]);
}};
modules.lib["list*"] = {form: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g252 = xs;
    while ((i < length(_g252))) {
      var x = _g252[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g253 = xs;
    while ((i < length(_g253))) {
      var x = _g253[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}};
modules.lib.target = {variable: true, macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}, form: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}};
modules.lib["define-global"] = {form: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g254 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g254))) {
    var _g255 = bind_arguments(x, _g254);
    var args = _g255[0];
    var _g256 = _g255[1];
    return(join(["%global-function", name, args], _g256));
  } else {
    return(["set", name, x]);
  }
}, macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g257 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g257))) {
    var _g258 = bind_arguments(x, _g257);
    var args = _g258[0];
    var _g259 = _g258[1];
    return(join(["%global-function", name, args], _g259));
  } else {
    return(["set", name, x]);
  }
}};
modules.lib.across = {form: function (_g260) {
  var l = _g260[0];
  var v = _g260[1];
  var i = _g260[2];
  var start = _g260[3];
  var body = unstash(sub(arguments, 1));
  var _g261 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g261, [["inc", i]]))]]);
}, macro: function (_g262) {
  var l = _g262[0];
  var v = _g262[1];
  var i = _g262[2];
  var start = _g262[3];
  var body = unstash(sub(arguments, 1));
  var _g263 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g263, [["inc", i]]))]]);
}};
modules.lib.dec = {form: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}};
modules.lib["define-local"] = {form: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g264 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g264))) {
    var _g265 = bind_arguments(x, _g264);
    var args = _g265[0];
    var _g266 = _g265[1];
    return(join(["%local-function", name, args], _g266));
  } else {
    return(["%local", name, x]);
  }
}, macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g267 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g267))) {
    var _g268 = bind_arguments(x, _g267);
    var args = _g268[0];
    var _g269 = _g268[1];
    return(join(["%local-function", name, args], _g269));
  } else {
    return(["%local", name, x]);
  }
}};
modules.lib["cat!"] = {form: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g270 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g270)]);
}, macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g271 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g271)]);
}};
modules.lib["join*"] = {form: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}};
modules.lib["define-symbol"] = {form: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}};
modules.lib["define-macro"] = {form: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g272 = sub(body, 0);
  var form = join(["fn", args], _g272);
  eval((function () {
    var _g273 = ["setenv", ["quote", name]];
    _g273.form = ["quote", form];
    _g273.macro = form;
    return(_g273);
  })());
  return(undefined);
}, macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g274 = sub(body, 0);
  var form = join(["fn", args], _g274);
  eval((function () {
    var _g275 = ["setenv", ["quote", name]];
    _g275.form = ["quote", form];
    _g275.macro = form;
    return(_g275);
  })());
  return(undefined);
}};
modules.lib["with-bindings"] = {form: function (_g276) {
  var names = _g276[0];
  var body = unstash(sub(arguments, 1));
  var _g277 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g278 = ["setenv", x];
    _g278.variable = true;
    return(_g278);
  })()]], _g277));
}, macro: function (_g279) {
  var names = _g279[0];
  var body = unstash(sub(arguments, 1));
  var _g280 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g281 = ["setenv", x];
    _g281.variable = true;
    return(_g281);
  })()]], _g280));
}};
modules.lib.guard = {form: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}};
modules.lib.let = {form: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g282 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g283) {
    var lh = _g283[0];
    var rh = _g283[1];
    var _g285 = 0;
    var _g284 = bind(lh, rh);
    while ((_g285 < length(_g284))) {
      var _g286 = _g284[_g285];
      var id = _g286[0];
      var val = _g286[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g285 = (_g285 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g282)])));
}, macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g287 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g288) {
    var lh = _g288[0];
    var rh = _g288[1];
    var _g290 = 0;
    var _g289 = bind(lh, rh);
    while ((_g290 < length(_g289))) {
      var _g291 = _g289[_g290];
      var id = _g291[0];
      var val = _g291[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g290 = (_g290 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g287)])));
}};
modules.lib.list = {form: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g292 = body;
    for (k in _g292) {
      if (isNaN(parseInt(k))) {
        var v = _g292[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g293 = body;
    for (k in _g293) {
      if (isNaN(parseInt(k))) {
        var v = _g293[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}};
modules.lib.inc = {form: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}};
modules.lib["let-macro"] = {form: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g294 = sub(body, 0);
  add(environment, {});
  var _g295 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g294)));
  })();
  drop(environment);
  return(_g295);
}, macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g296 = sub(body, 0);
  add(environment, {});
  var _g297 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g296)));
  })();
  drop(environment);
  return(_g297);
}};
modules.lib.each = {form: function (_g298) {
  var t = _g298[0];
  var k = _g298[1];
  var v = _g298[2];
  var body = unstash(sub(arguments, 1));
  var _g299 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g300 = ["target"];
    _g300.lua = ["not", ["number?", k]];
    _g300.js = ["isNaN", ["parseInt", k]];
    return(_g300);
  })(), join(["let", [v, ["get", t1, k]]], _g299)]]]);
}, macro: function (_g301) {
  var t = _g301[0];
  var k = _g301[1];
  var v = _g301[2];
  var body = unstash(sub(arguments, 1));
  var _g302 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g303 = ["target"];
    _g303.lua = ["not", ["number?", k]];
    _g303.js = ["isNaN", ["parseInt", k]];
    return(_g303);
  })(), join(["let", [v, ["get", t1, k]]], _g302)]]]);
}};
modules.lib["set-of"] = {form: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g305 = 0;
  var _g304 = elements;
  while ((_g305 < length(_g304))) {
    var e = _g304[_g305];
    l[e] = true;
    _g305 = (_g305 + 1);
  }
  return(join(["table"], l));
}, macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g307 = 0;
  var _g306 = elements;
  while ((_g307 < length(_g306))) {
    var e = _g306[_g307];
    l[e] = true;
    _g307 = (_g307 + 1);
  }
  return(join(["table"], l));
}};
modules.lib["let-symbol"] = {form: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g308 = sub(body, 0);
  add(environment, {});
  var _g309 = (function () {
    map(function (_g310) {
      var name = _g310[0];
      var exp = _g310[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g308)));
  })();
  drop(environment);
  return(_g309);
}, macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g311 = sub(body, 0);
  add(environment, {});
  var _g312 = (function () {
    map(function (_g313) {
      var name = _g313[0];
      var exp = _g313[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g311)));
  })();
  drop(environment);
  return(_g312);
}};
modules.lib["with-frame"] = {form: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}};
modules.lib.at = {form: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}};
modules.lib.table = {form: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g314 = body;
  for (k in _g314) {
    if (isNaN(parseInt(k))) {
      var v = _g314[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}, macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g315 = body;
  for (k in _g315) {
    if (isNaN(parseInt(k))) {
      var v = _g315[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}};
modules.lib.quote = {form: function (form) {
  return(quoted(form));
}, macro: function (form) {
  return(quoted(form));
}};
modules.lib.pr = {form: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}};
modules.lib.define = {form: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g316 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g316));
}, macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g317 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g317));
}};
modules.main = {};
main()