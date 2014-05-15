infix = {common: {"/": true, ">": true, "-": true, "<": true, "+": true, "*": true, "%": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", "cat": "+", "and": "&&", "or": "||"}, lua: {"=": "==", "~=": true, "cat": "..", "and": true, "or": true}};
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
    var _g12 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
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
  var stmt63 = _g59["stmt?"];
  var tail63 = _g59["tail?"];
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
loading = {};
compiler_output = undefined;
save_env63 = false;
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
  var k = undefined;
  var _g61 = module;
  for (k in _g61) {
    if (isNaN(parseInt(k))) {
      var v = _g61[k];
      setenv(k, v);
    }
  }
};
quote_binding = function (x) {
  if (is63(x.symbol)) {
    var _g67 = ["table"];
    _g67.symbol = ["quote", x.symbol];
    return(_g67);
  } else if ((x.macro && x.form)) {
    var _g68 = ["table"];
    _g68.macro = x.form;
    return(_g68);
  } else if ((x.special && x.form)) {
    var stmt = x.stmt;
    var tr = x.tr;
    var _g69 = ["table"];
    _g69.special = x.form;
    _g69.tr = tr;
    _g69.stmt = stmt;
    return(_g69);
  }
};
save_environment = function () {
  var toplevel = hd(environment);
  var save = function (x) {
    compiler_output = (compiler_output + compile_toplevel(x));
  };
  save(["define", "environment", ["list", ["table"]]]);
  var k = undefined;
  var _g70 = map42(quote_binding, toplevel);
  for (k in _g70) {
    if (isNaN(parseInt(k))) {
      var v = _g70[k];
      save(["setenv", ["quote", k], v]);
    }
  }
  var m = quote_binding(getenv("define-module"));
  save(["setenv", ["quote", "define-module"], m]);
  var _g72 = undefined;
  var _g71 = modules;
  for (_g72 in _g71) {
    if (isNaN(parseInt(_g72))) {
      var v = _g71[_g72];
      save(["set", ["get", "modules", ["quote", _g72]], ["table"]]);
      var k = undefined;
      var _g73 = map42(quote_binding, v);
      for (k in _g73) {
        if (isNaN(parseInt(k))) {
          var v = _g73[k];
          save(["set", ["get", ["get", "modules", ["quote", _g72]], ["quote", k]], v]);
        }
      }
    }
  }
};
compile_module = function (spec) {
  compiling63 = true;
  compiler_output = "";
  load_module(spec);
  map(open_module, ["lib", "compiler"]);
  if (save_env63) {
    return(save_environment());
  }
};
setenv = function (k, v) {
  last(environment)[k] = v;
};
getenv = function (k) {
  if (string63(k)) {
    return(find(function (e) {
      return(e[k]);
    }, reverse(environment)));
  }
};
setenv42 = function (k, v) {
  var x = getenv(k);
  if (x) {
    x.variable = v;
  } else {
    return(setenv(k, {variable: v}));
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
    var _g120 = args;
    for (k in _g120) {
      if (isNaN(parseInt(k))) {
        var v = _g120[k];
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
    var _g121 = args;
    for (k in _g121) {
      if (isNaN(parseInt(k))) {
        var v = _g121[k];
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
      var _g122 = l;
      for (k in _g122) {
        if (isNaN(parseInt(k))) {
          var v = _g122[k];
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
    var _g124 = 0;
    var _g123 = args;
    while ((_g124 < length(_g123))) {
      var arg = _g123[_g124];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g124 = (_g124 + 1);
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
    var _g125 = lh;
    while ((i < length(_g125))) {
      var x = _g125[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g126 = lh;
    for (k in _g126) {
      if (isNaN(parseInt(k))) {
        var v = _g126[k];
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
      var _g127 = form[1];
      var t = _g127[0];
      var k = _g127[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g3 = form[0];
      var args = form[1];
      var _g128 = sub(form, 2);
      add(environment, {});
      var _g130 = (function () {
        var _g132 = 0;
        var _g131 = args;
        while ((_g132 < length(_g131))) {
          var _g129 = _g131[_g132];
          setenv42(_g129, pending);
          _g132 = (_g132 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g128)));
      })();
      drop(environment);
      return(_g130);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g4 = form[0];
      var name = form[1];
      var _g133 = form[2];
      var _g134 = sub(form, 3);
      add(environment, {});
      var _g136 = (function () {
        var _g138 = 0;
        var _g137 = _g133;
        while ((_g138 < length(_g137))) {
          var _g135 = _g137[_g138];
          setenv42(_g135, pending);
          _g138 = (_g138 + 1);
        }
        return(join([x, name, map42(macroexpand, _g133)], macroexpand(_g134)));
      })();
      drop(environment);
      return(_g136);
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
  var _g139 = form;
  for (k in _g139) {
    if (isNaN(parseInt(k))) {
      var v = _g139[k];
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
  var _g141 = 0;
  var _g140 = form;
  while ((_g141 < length(_g140))) {
    var x = _g140[_g141];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g141 = (_g141 + 1);
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
  var _g142 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g142, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g142, upto);
    var k = undefined;
    var _g143 = x;
    for (k in _g143) {
      if (isNaN(parseInt(k))) {
        var v = _g143[k];
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
    var _g144 = l1;
    for (k in _g144) {
      if (isNaN(parseInt(k))) {
        var v = _g144[k];
        l[k] = v;
      }
    }
    var _g146 = undefined;
    var _g145 = l2;
    for (_g146 in _g145) {
      if (isNaN(parseInt(_g146))) {
        var v = _g145[_g146];
        l[_g146] = v;
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
  var _g148 = 0;
  var _g147 = l;
  while ((_g148 < length(_g147))) {
    var x = _g147[_g148];
    if (f(x)) {
      add(l1, x);
    }
    _g148 = (_g148 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g150 = 0;
  var _g149 = l;
  while ((_g150 < length(_g149))) {
    var x = _g149[_g150];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g150 = (_g150 + 1);
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
  var _g160 = 0;
  var _g159 = l;
  while ((_g160 < length(_g159))) {
    var x = _g159[_g160];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g160 = (_g160 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g161 = t;
  for (k in _g161) {
    if (isNaN(parseInt(k))) {
      var v = _g161[k];
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
  var _g162 = t;
  for (k in _g162) {
    if (isNaN(parseInt(k))) {
      var v = _g162[k];
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
  var _g163 = sub(xs, 0);
  if (empty63(_g163)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g163));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g166 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g166));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g167 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g167)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g168 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g168));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g169 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g169)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g170 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g170)));
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
    var _g171 = x;
    for (k in _g171) {
      if (isNaN(parseInt(k))) {
        var v = _g171[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g172 = x1;
    while ((i < length(_g172))) {
      var y = _g172[i];
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
  var _g173 = stash(args);
  return((f.apply)(f, _g173));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {"\n": true, ";": true, ")": true, "(": true};
whitespace = {" ": true, "\t": true, "\n": true};
make_stream = function (str) {
  return({pos: 0, len: length(str), string: str});
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
  var _g177 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g179) {
      return([false, _g179]);
    }
  })();
  var _g1 = _g177[0];
  var x = _g177[1];
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
  var _g178 = args;
  while ((i < length(_g178))) {
    var arg = _g178[i];
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
      save_env63 = true;
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
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
environment = [{}];
setenv("define-global", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g180 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g180))) {
    var _g181 = bind_arguments(x, _g180);
    var args = _g181[0];
    var _g182 = _g181[1];
    return(join(["%global-function", name, args], _g182));
  } else {
    return(["set", name, x]);
  }
}});
setenv("%for", {special: function (_g183) {
  var _g184 = _g183[0];
  var t = _g184[0];
  var k = _g184[1];
  var body = sub(_g183, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g185 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g185);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true});
setenv("join!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g186 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g186)]);
}});
setenv("table", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g187 = body;
  for (k in _g187) {
    if (isNaN(parseInt(k))) {
      var v = _g187[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}});
setenv("at", {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}});
setenv("target", {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}});
setenv("%array", {special: function (forms) {
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
  var _g188 = forms;
  while ((i < length(_g188))) {
    var x = _g188[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}});
setenv("with-bindings", {macro: function (_g189) {
  var names = _g189[0];
  var body = unstash(sub(arguments, 1));
  var _g190 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g190));
}});
setenv("with-frame", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("error", {stmt: true, special: function (_g191) {
  var x = _g191[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}});
setenv("if", {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g192 = form;
  while ((i < length(_g192))) {
    var condition = _g192[i];
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
}, tr: true, stmt: true});
setenv("inc", {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}});
setenv("set-of", {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g194 = 0;
  var _g193 = elements;
  while ((_g194 < length(_g193))) {
    var e = _g193[_g194];
    l[e] = true;
    _g194 = (_g194 + 1);
  }
  return(join(["table"], l));
}});
setenv("language", {macro: function () {
  return(["quote", target]);
}});
setenv("quasiquote", {macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("pr", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}});
setenv("%local", {stmt: true, special: function (_g195) {
  var name = _g195[0];
  var value = _g195[1];
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
}});
setenv("%function", {special: function (_g196) {
  var args = _g196[0];
  var body = sub(_g196, 1);
  return(compile_function(args, body));
}});
setenv("let", {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g197 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g198) {
    var lh = _g198[0];
    var rh = _g198[1];
    var _g200 = 0;
    var _g199 = bind(lh, rh);
    while ((_g200 < length(_g199))) {
      var _g201 = _g199[_g200];
      var id = _g201[0];
      var val = _g201[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g200 = (_g200 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g197)])));
}});
setenv("let-symbol", {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g202 = sub(body, 0);
  add(environment, {});
  var _g203 = (function () {
    map(function (_g204) {
      var name = _g204[0];
      var exp = _g204[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g202)));
  })();
  drop(environment);
  return(_g203);
}});
setenv("define-local", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g205 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g205))) {
    var _g206 = bind_arguments(x, _g205);
    var args = _g206[0];
    var _g207 = _g206[1];
    return(join(["%local-function", name, args], _g207));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("%try", {special: function (forms) {
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
}, tr: true, stmt: true});
setenv("define-module", {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g210 = sub(body, 0);
  var imp = _g210.import;
  var exp = _g210.export;
  map(load_module, imp);
  exports = {};
  var _g212 = 0;
  var _g211 = (exp || []);
  while ((_g212 < length(_g211))) {
    var x = _g211[_g212];
    exports[x] = true;
    _g212 = (_g212 + 1);
  }
  return(undefined);
}});
setenv("%local-function", {special: function (_g213) {
  var name = _g213[0];
  var args = _g213[1];
  var body = sub(_g213, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true});
setenv("define-macro", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g214 = sub(body, 0);
  var form = join(["fn", args], _g214);
  var value = (function () {
    var _g215 = ["table"];
    _g215.macro = form;
    _g215.form = ["quote", form];
    return(_g215);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("define-symbol", {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}});
setenv("get", {special: function (_g216) {
  var t = _g216[0];
  var k = _g216[1];
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
}});
setenv("let-macro", {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g217 = sub(body, 0);
  add(environment, {});
  var _g218 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g217)));
  })();
  drop(environment);
  return(_g218);
}});
setenv("not", {special: function (_g219) {
  var x = _g219[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}});
setenv("define-special", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g220 = sub(body, 0);
  var form = join(["fn", args], _g220);
  var value = join((function () {
    var _g221 = ["table"];
    _g221.form = ["quote", form];
    _g221.special = form;
    return(_g221);
  })(), _g220);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("list", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g222 = body;
    for (k in _g222) {
      if (isNaN(parseInt(k))) {
        var v = _g222[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}});
setenv("list*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g223 = xs;
    while ((i < length(_g223))) {
      var x = _g223[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}});
setenv("while", {special: function (_g224) {
  var condition = _g224[0];
  var body = sub(_g224, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g225 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g225);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true});
setenv("fn", {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g226 = sub(body, 0);
  var _g227 = bind_arguments(args, _g226);
  var args = _g227[0];
  var _g228 = _g227[1];
  return(join(["%function", args], _g228));
}});
setenv("cat!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g229 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g229)]);
}});
setenv("with-indent", {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
setenv("break", {stmt: true, special: function (_g5) {
  return((indentation() + "break"));
}});
setenv("return", {stmt: true, special: function (_g230) {
  var x = _g230[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}});
setenv("each", {macro: function (_g231) {
  var t = _g231[0];
  var k = _g231[1];
  var v = _g231[2];
  var body = unstash(sub(arguments, 1));
  var _g232 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g233 = ["target"];
    _g233.lua = ["not", ["number?", k]];
    _g233.js = ["isNaN", ["parseInt", k]];
    return(_g233);
  })(), join(["let", [v, ["get", t1, k]]], _g232)]]]);
}});
setenv("guard", {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}});
setenv("across", {macro: function (_g234) {
  var l = _g234[0];
  var v = _g234[1];
  var i = _g234[2];
  var start = _g234[3];
  var body = unstash(sub(arguments, 1));
  var _g235 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g235, [["inc", i]]))]]);
}});
setenv("set", {stmt: true, special: function (_g236) {
  var lh = _g236[0];
  var rh = _g236[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}});
setenv("dec", {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}});
setenv("do", {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true});
setenv("define", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g237 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g237));
}});
setenv("%object", {special: function (forms) {
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
  var _g238 = pairs;
  while ((i < length(_g238))) {
    var _g239 = _g238[i];
    var k = _g239[0];
    var v = _g239[1];
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
}});
setenv("%global-function", {special: function (_g240) {
  var name = _g240[0];
  var args = _g240[1];
  var body = sub(_g240, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true});
setenv("quote", {macro: function (form) {
  return(quoted(form));
}});
setenv("join*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}});
setenv("define-module", {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g241 = sub(body, 0);
  var imp = _g241.import;
  var exp = _g241.export;
  map(load_module, imp);
  exports = {};
  var _g243 = 0;
  var _g242 = (exp || []);
  while ((_g243 < length(_g242))) {
    var x = _g242[_g243];
    exports[x] = true;
    _g243 = (_g243 + 1);
  }
  return(undefined);
}});
modules.reader = {};
modules.reader["define-reader"] = {macro: function (_g244) {
  var char = _g244[0];
  var stream = _g244[1];
  var body = unstash(sub(arguments, 1));
  var _g245 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g245)]);
}};
modules.lib = {};
modules.lib["define-global"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g246 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g246))) {
    var _g247 = bind_arguments(x, _g246);
    var args = _g247[0];
    var _g248 = _g247[1];
    return(join(["%global-function", name, args], _g248));
  } else {
    return(["set", name, x]);
  }
}};
modules.lib["define-local"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g249 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g249))) {
    var _g250 = bind_arguments(x, _g249);
    var args = _g250[0];
    var _g251 = _g250[1];
    return(join(["%local-function", name, args], _g251));
  } else {
    return(["%local", name, x]);
  }
}};
modules.lib.across = {macro: function (_g252) {
  var l = _g252[0];
  var v = _g252[1];
  var i = _g252[2];
  var start = _g252[3];
  var body = unstash(sub(arguments, 1));
  var _g253 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g253, [["inc", i]]))]]);
}};
modules.lib["join!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g254 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g254)]);
}};
modules.lib["define-macro"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g255 = sub(body, 0);
  var form = join(["fn", args], _g255);
  var value = (function () {
    var _g256 = ["table"];
    _g256.macro = form;
    _g256.form = ["quote", form];
    return(_g256);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.lib.table = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g257 = body;
  for (k in _g257) {
    if (isNaN(parseInt(k))) {
      var v = _g257[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}};
modules.lib["define-symbol"] = {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}};
modules.lib.each = {macro: function (_g258) {
  var t = _g258[0];
  var k = _g258[1];
  var v = _g258[2];
  var body = unstash(sub(arguments, 1));
  var _g259 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g260 = ["target"];
    _g260.lua = ["not", ["number?", k]];
    _g260.js = ["isNaN", ["parseInt", k]];
    return(_g260);
  })(), join(["let", [v, ["get", t1, k]]], _g259)]]]);
}};
modules.lib.fn = {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g261 = sub(body, 0);
  var _g262 = bind_arguments(args, _g261);
  var args = _g262[0];
  var _g263 = _g262[1];
  return(join(["%function", args], _g263));
}};
modules.lib.quote = {macro: function (form) {
  return(quoted(form));
}};
modules.lib.target = {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
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
    var _g264 = body;
    for (k in _g264) {
      if (isNaN(parseInt(k))) {
        var v = _g264[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}};
modules.lib.language = {macro: function () {
  return(["quote", target]);
}};
modules.lib["with-bindings"] = {macro: function (_g265) {
  var names = _g265[0];
  var body = unstash(sub(arguments, 1));
  var _g266 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g266));
}};
modules.lib["define-special"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g267 = sub(body, 0);
  var form = join(["fn", args], _g267);
  var value = join((function () {
    var _g268 = ["table"];
    _g268.form = ["quote", form];
    _g268.special = form;
    return(_g268);
  })(), _g267);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.lib["cat!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g269 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g269)]);
}};
modules.lib.at = {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}};
modules.lib.define = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g270 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g270));
}};
modules.lib["with-frame"] = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}};
modules.lib.let = {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g271 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g272) {
    var lh = _g272[0];
    var rh = _g272[1];
    var _g274 = 0;
    var _g273 = bind(lh, rh);
    while ((_g274 < length(_g273))) {
      var _g275 = _g273[_g274];
      var id = _g275[0];
      var val = _g275[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g274 = (_g274 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g271)])));
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
modules.lib.inc = {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}};
modules.lib["set-of"] = {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g277 = 0;
  var _g276 = elements;
  while ((_g277 < length(_g276))) {
    var e = _g276[_g277];
    l[e] = true;
    _g277 = (_g277 + 1);
  }
  return(join(["table"], l));
}};
modules.lib.dec = {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}};
modules.lib["let-symbol"] = {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g278 = sub(body, 0);
  add(environment, {});
  var _g279 = (function () {
    map(function (_g280) {
      var name = _g280[0];
      var exp = _g280[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g278)));
  })();
  drop(environment);
  return(_g279);
}};
modules.lib.quasiquote = {macro: function (form) {
  return(quasiexpand(form, 1));
}};
modules.lib["let-macro"] = {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g281 = sub(body, 0);
  add(environment, {});
  var _g282 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g281)));
  })();
  drop(environment);
  return(_g282);
}};
modules.lib["list*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g283 = xs;
    while ((i < length(_g283))) {
      var x = _g283[i];
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
modules.lib.pr = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}};
modules.lib["join*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}};
modules.main = {};
modules.compiler = {};
modules.compiler["%function"] = {special: function (_g284) {
  var args = _g284[0];
  var body = sub(_g284, 1);
  return(compile_function(args, body));
}};
modules.compiler["%for"] = {special: function (_g285) {
  var _g286 = _g285[0];
  var t = _g286[0];
  var k = _g286[1];
  var body = sub(_g285, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g287 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g287);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true};
modules.compiler["get"] = {special: function (_g288) {
  var t = _g288[0];
  var k = _g288[1];
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
modules.compiler["%local-function"] = {special: function (_g289) {
  var name = _g289[0];
  var args = _g289[1];
  var body = sub(_g289, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true};
modules.compiler["return"] = {stmt: true, special: function (_g290) {
  var x = _g290[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}};
modules.compiler["%global-function"] = {special: function (_g291) {
  var name = _g291[0];
  var args = _g291[1];
  var body = sub(_g291, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true};
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
  var _g292 = forms;
  while ((i < length(_g292))) {
    var x = _g292[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};
modules.compiler["with-indent"] = {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.compiler["break"] = {stmt: true, special: function (_g5) {
  return((indentation() + "break"));
}};
modules.compiler["error"] = {stmt: true, special: function (_g293) {
  var x = _g293[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}};
modules.compiler["if"] = {special: function (form, tail63) {
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
}, tr: true, stmt: true};
modules.compiler["set"] = {stmt: true, special: function (_g295) {
  var lh = _g295[0];
  var rh = _g295[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}};
modules.compiler["define-module"] = {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g296 = sub(body, 0);
  var imp = _g296.import;
  var exp = _g296.export;
  map(load_module, imp);
  exports = {};
  var _g298 = 0;
  var _g297 = (exp || []);
  while ((_g298 < length(_g297))) {
    var x = _g297[_g298];
    exports[x] = true;
    _g298 = (_g298 + 1);
  }
  return(undefined);
}};
modules.compiler["do"] = {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true};
modules.compiler["%try"] = {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g299 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g299);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g300 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g300);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true};
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
  var _g301 = pairs;
  while ((i < length(_g301))) {
    var _g302 = _g301[i];
    var k = _g302[0];
    var v = _g302[1];
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
modules.compiler["while"] = {special: function (_g303) {
  var condition = _g303[0];
  var body = sub(_g303, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g304 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g304);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true};
modules.compiler["not"] = {special: function (_g305) {
  var x = _g305[0];
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
modules.compiler["%local"] = {stmt: true, special: function (_g306) {
  var name = _g306[0];
  var value = _g306[1];
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
main()