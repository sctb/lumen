infix = {js: {"cat": "+", "and": "&&", "=": "===", "or": "||", "~=": "!="}, common: {"*": true, "<=": true, "<": true, "+": true, "%": true, ">": true, "-": true, "/": true, ">=": true}, lua: {"cat": "..", "and": true, "=": "==", "or": true, "~=": true}};
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
  var special = _g15.special;
  var stmt = _g15.stmt;
  var self_tr63 = _g15.tr;
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
    var _g67 = [];
    _g67.symbol = ["quote", x.symbol];
    return(_g67);
  } else if ((x.macro && x.form)) {
    var _g68 = [];
    _g68.macro = x.form;
    return(_g68);
  } else if ((x.special && x.form)) {
    var tr = x.tr;
    var stmt = x.stmt;
    var _g69 = [];
    _g69.special = x.form;
    _g69.stmt = stmt;
    _g69.tr = tr;
    return(_g69);
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
  var _g70 = modules;
  for (m in _g70) {
    if (isNaN(parseInt(m))) {
      var v = _g70[m];
      save(["set", ["get", "modules", ["quote", m]], ["table"]]);
      var k = undefined;
      var _g71 = map42(quote_binding, v);
      for (k in _g71) {
        if (isNaN(parseInt(k))) {
          var v = _g71[k];
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
  var _g72 = sub(keys, 0);
  var frame = last(environment);
  var x = (frame[k] || {});
  var k1 = undefined;
  var _g73 = _g72;
  for (k1 in _g73) {
    if (isNaN(parseInt(k1))) {
      var v = _g73[k1];
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
    var _g126 = args;
    for (k in _g126) {
      if (isNaN(parseInt(k))) {
        var v = _g126[k];
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
    var _g127 = args;
    for (k in _g127) {
      if (isNaN(parseInt(k))) {
        var v = _g127[k];
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
      var _g128 = l;
      for (k in _g128) {
        if (isNaN(parseInt(k))) {
          var v = _g128[k];
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
    var _g130 = 0;
    var _g129 = args;
    while ((_g130 < length(_g129))) {
      var arg = _g129[_g130];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g130 = (_g130 + 1);
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
    var _g131 = lh;
    while ((i < length(_g131))) {
      var x = _g131[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g132 = lh;
    for (k in _g132) {
      if (isNaN(parseInt(k))) {
        var v = _g132[k];
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
      var _g133 = form[1];
      var t = _g133[0];
      var k = _g133[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g3 = form[0];
      var args = form[1];
      var _g134 = sub(form, 2);
      add(environment, {});
      var _g136 = (function () {
        var _g138 = 0;
        var _g137 = args;
        while ((_g138 < length(_g137))) {
          var _g135 = _g137[_g138];
          setenv(_g135, {_stash: true, variable: true});
          _g138 = (_g138 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g134)));
      })();
      drop(environment);
      return(_g136);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g4 = form[0];
      var name = form[1];
      var _g139 = form[2];
      var _g140 = sub(form, 3);
      add(environment, {});
      var _g142 = (function () {
        var _g144 = 0;
        var _g143 = _g139;
        while ((_g144 < length(_g143))) {
          var _g141 = _g143[_g144];
          setenv(_g141, {_stash: true, variable: true});
          _g144 = (_g144 + 1);
        }
        return(join([x, name, map42(macroexpand, _g139)], macroexpand(_g140)));
      })();
      drop(environment);
      return(_g142);
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
  var _g145 = form;
  for (k in _g145) {
    if (isNaN(parseInt(k))) {
      var v = _g145[k];
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
  var _g147 = 0;
  var _g146 = form;
  while ((_g147 < length(_g146))) {
    var x = _g146[_g147];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g147 = (_g147 + 1);
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
  var _g148 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g148, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g148, upto);
    var k = undefined;
    var _g149 = x;
    for (k in _g149) {
      if (isNaN(parseInt(k))) {
        var v = _g149[k];
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
    l = (l1.concat)(l2);
    var k = undefined;
    var _g150 = l1;
    for (k in _g150) {
      if (isNaN(parseInt(k))) {
        var v = _g150[k];
        l[k] = v;
      }
    }
    var _g152 = undefined;
    var _g151 = l2;
    for (_g152 in _g151) {
      if (isNaN(parseInt(_g152))) {
        var v = _g151[_g152];
        l[_g152] = v;
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
  var _g154 = 0;
  var _g153 = l;
  while ((_g154 < length(_g153))) {
    var x = _g153[_g154];
    if (f(x)) {
      add(l1, x);
    }
    _g154 = (_g154 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g156 = 0;
  var _g155 = l;
  while ((_g156 < length(_g155))) {
    var x = _g155[_g156];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g156 = (_g156 + 1);
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
  var _g166 = 0;
  var _g165 = l;
  while ((_g166 < length(_g165))) {
    var x = _g165[_g166];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g166 = (_g166 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g167 = t;
  for (k in _g167) {
    if (isNaN(parseInt(k))) {
      var v = _g167[k];
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
  var _g168 = t;
  for (k in _g168) {
    if (isNaN(parseInt(k))) {
      var v = _g168[k];
      k63 = true;
      break;
    }
  }
  return(k63);
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
  var _g169 = sub(xs, 0);
  if (empty63(_g169)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g169));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g172 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g172));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g173 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g173)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g174 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g174));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g175 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g175)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g176 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g176)));
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
    var _g177 = x;
    for (k in _g177) {
      if (isNaN(parseInt(k))) {
        var v = _g177[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g178 = x1;
    while ((i < length(_g178))) {
      var y = _g178[i];
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
  var _g179 = stash(args);
  return((f.apply)(f, _g179));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {";": true, ")": true, "(": true, "\n": true};
whitespace = {" ": true, "\t": true, "\n": true};
make_stream = function (str) {
  return({string: str, len: length(str), pos: 0});
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
  var _g183 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g185) {
      return([false, _g185]);
    }
  })();
  var _g1 = _g183[0];
  var x = _g183[1];
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
  var _g184 = args;
  while ((i < length(_g184))) {
    var arg = _g184[i];
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
setenv("define-module", {_stash: true, macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g186 = sub(body, 0);
  var imp = _g186.import;
  var exp = _g186.export;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g188 = 0;
  var _g187 = (exp || []);
  while ((_g188 < length(_g187))) {
    var x = _g187[_g188];
    exports[x] = true;
    _g188 = (_g188 + 1);
  }
  return(undefined);
}});
modules.main = {};
modules.lib = {};
modules.lib.quasiquote = {macro: function (form) {
  return(quasiexpand(form, 1));
}};
modules.lib["let-macro"] = {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g189 = sub(body, 0);
  add(environment, {});
  var _g190 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g189)));
  })();
  drop(environment);
  return(_g190);
}};
modules.lib.table = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g191 = body;
  for (k in _g191) {
    if (isNaN(parseInt(k))) {
      var v = _g191[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}};
modules.lib.pr = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}};
modules.lib.across = {macro: function (_g192) {
  var l = _g192[0];
  var v = _g192[1];
  var i = _g192[2];
  var start = _g192[3];
  var body = unstash(sub(arguments, 1));
  var _g193 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g193, [["inc", i]]))]]);
}};
modules.lib["list*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g194 = xs;
    while ((i < length(_g194))) {
      var x = _g194[i];
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
modules.lib.quote = {macro: function (form) {
  return(quoted(form));
}};
modules.lib["set-of"] = {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g196 = 0;
  var _g195 = elements;
  while ((_g196 < length(_g195))) {
    var e = _g195[_g196];
    l[e] = true;
    _g196 = (_g196 + 1);
  }
  return(join(["table"], l));
}};
modules.lib.define = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g197 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g197));
}};
modules.lib["define-local"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g198 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g198))) {
    var _g199 = bind_arguments(x, _g198);
    var args = _g199[0];
    var _g200 = _g199[1];
    return(join(["%local-function", name, args], _g200));
  } else {
    return(["%local", name, x]);
  }
}};
modules.lib["define-global"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g201 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g201))) {
    var _g202 = bind_arguments(x, _g201);
    var args = _g202[0];
    var _g203 = _g202[1];
    return(join(["%global-function", name, args], _g203));
  } else {
    return(["set", name, x]);
  }
}};
modules.lib["join*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}};
modules.lib["define-special"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g204 = sub(body, 0);
  var form = join(["fn", args], _g204);
  var keys = sub(_g204, length(_g204));
  eval(join((function () {
    var _g205 = ["setenv", ["quote", name]];
    _g205.special = form;
    _g205.form = ["quote", form];
    return(_g205);
  })(), keys));
  return(undefined);
}};
modules.lib.dec = {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}};
modules.lib.guard = {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}};
modules.lib.language = {macro: function () {
  return(["quote", target]);
}};
modules.lib["define-macro"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g206 = sub(body, 0);
  var form = join(["fn", args], _g206);
  eval((function () {
    var _g207 = ["setenv", ["quote", name]];
    _g207.macro = form;
    _g207.form = ["quote", form];
    return(_g207);
  })());
  return(undefined);
}};
modules.lib.list = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g208 = body;
    for (k in _g208) {
      if (isNaN(parseInt(k))) {
        var v = _g208[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}};
modules.lib["let-symbol"] = {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g209 = sub(body, 0);
  add(environment, {});
  var _g210 = (function () {
    map(function (_g211) {
      var name = _g211[0];
      var exp = _g211[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g209)));
  })();
  drop(environment);
  return(_g210);
}};
modules.lib["cat!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g212 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g212)]);
}};
modules.lib.at = {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}};
modules.lib.let = {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g213 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g214) {
    var lh = _g214[0];
    var rh = _g214[1];
    var _g216 = 0;
    var _g215 = bind(lh, rh);
    while ((_g216 < length(_g215))) {
      var _g217 = _g215[_g216];
      var id = _g217[0];
      var val = _g217[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g216 = (_g216 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g213)])));
}};
modules.lib["with-bindings"] = {macro: function (_g218) {
  var names = _g218[0];
  var body = unstash(sub(arguments, 1));
  var _g219 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g220 = ["setenv", x];
    _g220.variable = true;
    return(_g220);
  })()]], _g219));
}};
modules.lib.inc = {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}};
modules.lib.target = {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}};
modules.lib.each = {macro: function (_g221) {
  var t = _g221[0];
  var k = _g221[1];
  var v = _g221[2];
  var body = unstash(sub(arguments, 1));
  var _g222 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g223 = ["target"];
    _g223.js = ["isNaN", ["parseInt", k]];
    _g223.lua = ["not", ["number?", k]];
    return(_g223);
  })(), join(["let", [v, ["get", t1, k]]], _g222)]]]);
}};
modules.lib["with-frame"] = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}};
modules.lib.fn = {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g224 = sub(body, 0);
  var _g225 = bind_arguments(args, _g224);
  var args = _g225[0];
  var _g226 = _g225[1];
  return(join(["%function", args], _g226));
}};
modules.lib["define-symbol"] = {macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}};
modules.lib["join!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g227 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g227)]);
}};
modules.compiler = {};
modules.compiler["%local-function"] = {special: function (_g228) {
  var name = _g228[0];
  var args = _g228[1];
  var body = sub(_g228, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, stmt: true, tr: true};
modules.compiler["with-indent"] = {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.compiler["error"] = {special: function (_g229) {
  var x = _g229[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true};
modules.compiler["while"] = {special: function (_g230) {
  var condition = _g230[0];
  var body = sub(_g230, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g231 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g231);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, tr: true};
modules.compiler["get"] = {special: function (_g232) {
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
}};
modules.compiler["define-module"] = {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g233 = sub(body, 0);
  var imp = _g233.import;
  var exp = _g233.export;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g235 = 0;
  var _g234 = (exp || []);
  while ((_g235 < length(_g234))) {
    var x = _g234[_g235];
    exports[x] = true;
    _g235 = (_g235 + 1);
  }
  return(undefined);
}};
modules.compiler["%function"] = {special: function (_g236) {
  var args = _g236[0];
  var body = sub(_g236, 1);
  return(compile_function(args, body));
}};
modules.compiler["%object"] = {special: function (forms) {
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
  var _g237 = pairs;
  while ((i < length(_g237))) {
    var _g238 = _g237[i];
    var k = _g238[0];
    var v = _g238[1];
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
modules.compiler["%try"] = {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g239 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g239);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g240 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g240);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true, tr: true};
modules.compiler["%for"] = {special: function (_g241) {
  var _g242 = _g241[0];
  var t = _g242[0];
  var k = _g242[1];
  var body = sub(_g241, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g243 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g243);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, tr: true};
modules.compiler["%array"] = {special: function (forms) {
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
  var _g244 = forms;
  while ((i < length(_g244))) {
    var x = _g244[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};
modules.compiler["%local"] = {special: function (_g245) {
  var name = _g245[0];
  var value = _g245[1];
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
}, stmt: true};
modules.compiler["not"] = {special: function (_g246) {
  var x = _g246[0];
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
modules.compiler["if"] = {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g247 = form;
  while ((i < length(_g247))) {
    var condition = _g247[i];
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
}, stmt: true, tr: true};
modules.compiler["%global-function"] = {special: function (_g248) {
  var name = _g248[0];
  var args = _g248[1];
  var body = sub(_g248, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, stmt: true, tr: true};
modules.compiler["set"] = {special: function (_g249) {
  var lh = _g249[0];
  var rh = _g249[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true};
modules.compiler["break"] = {special: function (_g5) {
  return((indentation() + "break"));
}, stmt: true};
modules.compiler["do"] = {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true, tr: true};
modules.compiler["return"] = {special: function (_g250) {
  var x = _g250[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true};
modules.reader = {};
modules.reader["define-reader"] = {macro: function (_g251) {
  var char = _g251[0];
  var stream = _g251[1];
  var body = unstash(sub(arguments, 1));
  var _g252 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g252)]);
}};
main()