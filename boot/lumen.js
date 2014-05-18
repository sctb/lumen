infix = {common: {"+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", "and": "&&", "or": "||", "cat": "+"}, lua: {"=": "==", "cat": "..", "~=": true, "and": true, "or": true}};
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
  var _g9 = args;
  while ((i < length(_g9))) {
    var arg = _g9[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g10 = unstash(sublist(arguments, 1));
  var tail63 = _g10["tail?"];
  var str = "";
  var i = 0;
  var _g11 = forms;
  while ((i < length(_g11))) {
    var x = _g11[i];
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
compile_infix = function (_g12) {
  var op = _g12[0];
  var args = sub(_g12, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g13 = args;
  while ((i < length(_g13))) {
    var arg = _g13[i];
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
  var _g14 = (function () {
    indent_level = (indent_level + 1);
    var _g15 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g15);
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
    return((ind + "if (" + cond1 + ") {\n" + _g14 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g14 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g14 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g14 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g14 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g14 + tr));
  }
};
compile_function = function (args, body) {
  var _g16 = unstash(sublist(arguments, 2));
  var name = _g16.name;
  var prefix = _g16.prefix;
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
    var _g17 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g17);
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
  var _g18 = getenv(hd(form));
  var special = _g18.special;
  var stmt = _g18.stmt;
  var self_tr63 = _g18.tr;
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
  var _g62 = unstash(sublist(arguments, 1));
  var stmt63 = _g62["stmt?"];
  var tail63 = _g62["tail?"];
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
module = undefined;
exports = {};
imports = {};
loading = {};
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
initial_environment = function () {
  var m = getenv("define-module");
  var x = {"define-module": m};
  return([x]);
};
_37load_module = function (k) {
  var file = (k + ".l");
  var mod0 = module;
  var env0 = environment;
  var env1 = initial_environment();
  loading[k] = true;
  module = k;
  environment = env1;
  var m = {};
  var compiled = compile_file(file);
  module = mod0;
  environment = env0;
  var x = undefined;
  var _g63 = hd(env1);
  for (x in _g63) {
    if (isNaN(parseInt(x))) {
      var v = _g63[x];
      if (exports[x]) {
        v.export = true;
      }
      m[x] = v;
    }
  }
  modules[k] = m;
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
  var _g64 = module;
  for (k in _g64) {
    if (isNaN(parseInt(k))) {
      var v = _g64[k];
      toplevel[k] = v;
    }
  }
};
compile_module = function (spec) {
  compiling63 = true;
  compiler_output = "";
  return(load_module(spec));
};
quote_binding = function (x) {
  if (x.module) {
    x = extend(x, {_stash: true, module: ["quote", x.module]});
  }
  if (is63(x.symbol)) {
    return(extend(x, {_stash: true, symbol: ["quote", x.symbol]}));
  } else if ((x.macro && x.form)) {
    return(exclude(extend(x, {_stash: true, macro: x.form}), {_stash: true, form: true}));
  } else if ((x.special && x.form)) {
    return(exclude(extend(x, {_stash: true, special: x.form}), {_stash: true, form: true}));
  } else if (is63(x.variable)) {
    return(x);
  }
};
quote_frame = function (frame) {
  return(join(["table"], mapt(function (_g7, x) {
    return(join(["table"], quote_binding(x)));
  }, frame)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (k, m) {
  return(join(["%object"], mapo(function (_g8, x) {
    if ((x.export && (k === x.module))) {
      return(join(["table"], quote_binding(x)));
    }
  }, m)));
};
quote_modules = function () {
  return(join(["table"], mapt(quote_module, modules)));
};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g70 = sub(keys, 0);
  var frame = last(environment);
  var x = (frame[k] || {});
  var k1 = undefined;
  var _g71 = _g70;
  for (k1 in _g71) {
    if (isNaN(parseInt(k1))) {
      var v = _g71[k1];
      x[k1] = v;
    }
  }
  x.module = module;
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
      var _g3 = form[0];
      var _g130 = form[1];
      var t = _g130[0];
      var k = _g130[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
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
      var _g5 = form[0];
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
substring = function (str, from, upto) {
  return((str.substring)(from, upto));
};
sublist = function (l, from, upto) {
  return((Array.prototype.slice.call)(l, from, upto));
};
sub = function (x, from, upto) {
  var _g145 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g145, upto));
  } else {
    var l = sublist(x, _g145, upto);
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
mapt = function (f, t) {
  var t1 = {};
  var k = undefined;
  var _g165 = t;
  for (k in _g165) {
    if (isNaN(parseInt(k))) {
      var v = _g165[k];
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
  var _g166 = t;
  for (k in _g166) {
    if (isNaN(parseInt(k))) {
      var v = _g166[k];
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
  var _g167 = t;
  for (k in _g167) {
    if (isNaN(parseInt(k))) {
      var v = _g167[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g168 = sub(xs, 0);
  return(join(t, _g168));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g169 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g170 = t;
  for (k in _g170) {
    if (isNaN(parseInt(k))) {
      var v = _g170[k];
      if (!(_g169[k])) {
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
  var _g171 = sub(xs, 0);
  if (empty63(_g171)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g171));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g174 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g174));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g175 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g175)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g176 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g176));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g177 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g177)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g178 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g178)));
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
    var _g179 = x;
    for (k in _g179) {
      if (isNaN(parseInt(k))) {
        var v = _g179[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g180 = x1;
    while ((i < length(_g180))) {
      var y = _g180[i];
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
  var _g181 = stash(args);
  return((f.apply)(f, _g181));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {"(": true, ")": true, ";": true, "\n": true};
whitespace = {" ": true, "\t": true, "\n": true};
make_stream = function (str) {
  return({pos: 0, string: str, len: length(str)});
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
modules = {reader: {"define-reader": {macro: function (_g185) {
  var char = _g185[0];
  var stream = _g185[1];
  var body = unstash(sublist(arguments, 1));
  var _g186 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g186)]);
}, export: true, module: "reader"}, "make-stream": {variable: true, module: "reader", export: true}, read: {variable: true, module: "reader", export: true}, "read-all": {variable: true, module: "reader", export: true}, "read-from-string": {variable: true, module: "reader", export: true}}, lib: {at: {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, export: true, module: "lib"}, quote: {macro: function (form) {
  return(quoted(form));
}, export: true, module: "lib"}, list: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g187 = body;
    for (k in _g187) {
      if (isNaN(parseInt(k))) {
        var v = _g187[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, export: true, module: "lib"}, table: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}, export: true, module: "lib"}, let: {macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g188 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g189) {
    var lh = _g189[0];
    var rh = _g189[1];
    var _g191 = 0;
    var _g190 = bind(lh, rh);
    while ((_g191 < length(_g190))) {
      var _g192 = _g190[_g191];
      var id = _g192[0];
      var val = _g192[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g191 = (_g191 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g188)])));
}, export: true, module: "lib"}, "define-macro": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g193 = sub(body, 0);
  var form = join(["fn", args], _g193);
  eval((function () {
    var _g194 = ["setenv", ["quote", name]];
    _g194.macro = form;
    _g194.form = ["quote", form];
    return(_g194);
  })());
  return(undefined);
}, export: true, module: "lib"}, "define-special": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g195 = sub(body, 0);
  var form = join(["fn", args], _g195);
  var keys = sub(_g195, length(_g195));
  eval(join((function () {
    var _g196 = ["setenv", ["quote", name]];
    _g196.special = form;
    _g196.form = ["quote", form];
    return(_g196);
  })(), keys));
  return(undefined);
}, export: true, module: "lib"}, "define-symbol": {macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, export: true, module: "lib"}, "define-global": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g197 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g197))) {
    var _g198 = bind_arguments(x, _g197);
    var args = _g198[0];
    var _g199 = _g198[1];
    return(join(["%global-function", name, args], _g199));
  } else {
    return(["set", name, x]);
  }
}, export: true, module: "lib"}, "define-local": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g200 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g200))) {
    var _g201 = bind_arguments(x, _g200);
    var args = _g201[0];
    var _g202 = _g201[1];
    return(join(["%local-function", name, args], _g202));
  } else {
    return(["%local", name, x]);
  }
}, export: true, module: "lib"}, define: {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g203 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g203));
}, export: true, module: "lib"}, "with-frame": {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, export: true, module: "lib"}, "with-bindings": {macro: function (_g204) {
  var names = _g204[0];
  var body = unstash(sublist(arguments, 1));
  var _g205 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g206 = ["setenv", x];
    _g206.variable = true;
    return(_g206);
  })()]], _g205));
}, export: true, module: "lib"}, "let-macro": {macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g207 = sub(body, 0);
  add(environment, {});
  var _g208 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g207)));
  })();
  drop(environment);
  return(_g208);
}, export: true, module: "lib"}, "let-symbol": {macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
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
}, export: true, module: "lib"}, fn: {macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g212 = sub(body, 0);
  var _g213 = bind_arguments(args, _g212);
  var args = _g213[0];
  var _g214 = _g213[1];
  return(join(["%function", args], _g214));
}, export: true, module: "lib"}, guard: {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, export: true, module: "lib"}, across: {macro: function (_g215) {
  var l = _g215[0];
  var v = _g215[1];
  var i = _g215[2];
  var start = _g215[3];
  var body = unstash(sublist(arguments, 1));
  var _g216 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g216, [["inc", i]]))]]);
}, export: true, module: "lib"}, "set-of": {macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g218 = 0;
  var _g217 = elements;
  while ((_g218 < length(_g217))) {
    var e = _g217[_g218];
    l[e] = true;
    _g218 = (_g218 + 1);
  }
  return(join(["table"], l));
}, export: true, module: "lib"}, quasiquote: {macro: function (form) {
  return(quasiexpand(form, 1));
}, export: true, module: "lib"}, language: {macro: function () {
  return(["quote", target]);
}, export: true, module: "lib"}, target: {variable: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, export: true, module: "lib"}, "join*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, export: true, module: "lib"}, "join!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g219 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g219)]);
}, export: true, module: "lib"}, "list*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g220 = xs;
    while ((i < length(_g220))) {
      var x = _g220[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, export: true, module: "lib"}, each: {macro: function (_g221) {
  var t = _g221[0];
  var k = _g221[1];
  var v = _g221[2];
  var body = unstash(sublist(arguments, 1));
  var _g222 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g223 = ["target"];
    _g223.js = ["isNaN", ["parseInt", k]];
    _g223.lua = ["not", ["number?", k]];
    return(_g223);
  })(), join(["let", [v, ["get", t1, k]]], _g222)]]]);
}, export: true, module: "lib"}, "cat!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g224 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g224)]);
}, export: true, module: "lib"}, inc: {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, export: true, module: "lib"}, dec: {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, export: true, module: "lib"}, pr: {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, export: true, module: "lib"}, setenv: {variable: true, module: "lib", export: true}, getenv: {variable: true, module: "lib", export: true}, "special?": {variable: true, module: "lib", export: true}, "special-form?": {variable: true, module: "lib", export: true}, quoted: {variable: true, module: "lib", export: true}, "stash*": {variable: true, module: "lib", export: true}, unstash: {variable: true, module: "lib", export: true}, macroexpand: {variable: true, module: "lib", export: true}, length: {variable: true, module: "lib", export: true}, "empty?": {variable: true, module: "lib", export: true}, sub: {variable: true, module: "lib", export: true}, inner: {variable: true, module: "lib", export: true}, hd: {variable: true, module: "lib", export: true}, tl: {variable: true, module: "lib", export: true}, add: {variable: true, module: "lib", export: true}, drop: {variable: true, module: "lib", export: true}, last: {variable: true, module: "lib", export: true}, reverse: {variable: true, module: "lib", export: true}, join: {variable: true, module: "lib", export: true}, reduce: {variable: true, module: "lib", export: true}, keep: {variable: true, module: "lib", export: true}, find: {variable: true, module: "lib", export: true}, pairwise: {variable: true, module: "lib", export: true}, iterate: {variable: true, module: "lib", export: true}, replicate: {variable: true, module: "lib", export: true}, splice: {variable: true, module: "lib", export: true}, map: {variable: true, module: "lib", export: true}, "map*": {variable: true, module: "lib", export: true}, "keys?": {variable: true, module: "lib", export: true}, extend: {variable: true, module: "lib", export: true}, exclude: {variable: true, module: "lib", export: true}, char: {variable: true, module: "lib", export: true}, code: {variable: true, module: "lib", export: true}, search: {variable: true, module: "lib", export: true}, split: {variable: true, module: "lib", export: true}, "cat": {variable: true, module: "lib", export: true}, "+": {variable: true, module: "lib", export: true}, "-": {variable: true, module: "lib", export: true}, "*": {variable: true, module: "lib", export: true}, "/": {variable: true, module: "lib", export: true}, "%": {variable: true, module: "lib", export: true}, ">": {variable: true, module: "lib", export: true}, "<": {variable: true, module: "lib", export: true}, "=": {variable: true, module: "lib", export: true}, ">=": {variable: true, module: "lib", export: true}, "<=": {variable: true, module: "lib", export: true}, "read-file": {variable: true, module: "lib", export: true}, "write-file": {variable: true, module: "lib", export: true}, print: {variable: true, module: "lib", export: true}, write: {variable: true, module: "lib", export: true}, exit: {variable: true, module: "lib", export: true}, "nil?": {variable: true, module: "lib", export: true}, "is?": {variable: true, module: "lib", export: true}, "string?": {variable: true, module: "lib", export: true}, "string-literal?": {variable: true, module: "lib", export: true}, "id-literal?": {variable: true, module: "lib", export: true}, "number?": {variable: true, module: "lib", export: true}, "boolean?": {variable: true, module: "lib", export: true}, "function?": {variable: true, module: "lib", export: true}, "composite?": {variable: true, module: "lib", export: true}, "atom?": {variable: true, module: "lib", export: true}, "table?": {variable: true, module: "lib", export: true}, "list?": {variable: true, module: "lib", export: true}, "parse-number": {variable: true, module: "lib", export: true}, "to-string": {variable: true, module: "lib", export: true}, type: {variable: true, module: "lib", export: true}, apply: {variable: true, module: "lib", export: true}, "make-id": {variable: true, module: "lib", export: true}, mapt: {variable: true, module: "lib", export: true}, mapo: {variable: true, module: "lib", export: true}}, main: {}, compiler: {"define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g225 = sub(body, 0);
  var imp = _g225.import;
  var exp = _g225.export;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g227 = 0;
  var _g226 = (exp || []);
  while ((_g227 < length(_g226))) {
    var x = _g226[_g227];
    exports[x] = true;
    _g227 = (_g227 + 1);
  }
  return(undefined);
}, export: true, module: "compiler"}, "with-indent": {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, export: true, module: "compiler"}, "do": {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true, tr: true, export: true, module: "compiler"}, "if": {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g228 = form;
  while ((i < length(_g228))) {
    var condition = _g228[i];
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
}, stmt: true, tr: true, export: true, module: "compiler"}, "while": {special: function (_g229) {
  var condition = _g229[0];
  var body = sub(_g229, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g230 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g230);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, tr: true, export: true, module: "compiler"}, "%for": {special: function (_g231) {
  var _g232 = _g231[0];
  var t = _g232[0];
  var k = _g232[1];
  var body = sub(_g231, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g233 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g233);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, tr: true, export: true, module: "compiler"}, "%try": {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g234 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g234);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g235 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g235);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true, tr: true, export: true, module: "compiler"}, "break": {special: function (_g6) {
  return((indentation() + "break"));
}, stmt: true, export: true, module: "compiler"}, "%function": {special: function (_g236) {
  var args = _g236[0];
  var body = sub(_g236, 1);
  return(compile_function(args, body));
}, export: true, module: "compiler"}, "%global-function": {special: function (_g237) {
  var name = _g237[0];
  var args = _g237[1];
  var body = sub(_g237, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, stmt: true, tr: true, export: true, module: "compiler"}, "%local-function": {special: function (_g238) {
  var name = _g238[0];
  var args = _g238[1];
  var body = sub(_g238, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}, stmt: true, tr: true, export: true, module: "compiler"}, "return": {special: function (_g239) {
  var x = _g239[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true, export: true, module: "compiler"}, "error": {special: function (_g240) {
  var x = _g240[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true, export: true, module: "compiler"}, "%local": {special: function (_g241) {
  var name = _g241[0];
  var value = _g241[1];
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
}, stmt: true, export: true, module: "compiler"}, "set": {special: function (_g242) {
  var lh = _g242[0];
  var rh = _g242[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true, export: true, module: "compiler"}, "get": {special: function (_g243) {
  var t = _g243[0];
  var k = _g243[1];
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
}, export: true, module: "compiler"}, "not": {special: function (_g244) {
  var x = _g244[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, export: true, module: "compiler"}, "%array": {special: function (forms) {
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
  var _g245 = forms;
  while ((i < length(_g245))) {
    var x = _g245[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}, export: true, module: "compiler"}, "%object": {special: function (forms) {
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
  var _g246 = pairs;
  while ((i < length(_g246))) {
    var _g247 = _g246[i];
    var k = _g247[0];
    var v = _g247[1];
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
}, export: true, module: "compiler"}, compile: {variable: true, module: "compiler", export: true}, "compile-toplevel": {variable: true, module: "compiler", export: true}, eval: {variable: true, module: "compiler", export: true}, "compiler-output": {variable: true, module: "compiler", export: true}, "load-module": {variable: true, module: "compiler", export: true}, "open-module": {variable: true, module: "compiler", export: true}, "compile-module": {variable: true, module: "compiler", export: true}, "quote-environment": {variable: true, module: "compiler", export: true}, "quote-modules": {variable: true, module: "compiler", export: true}}};
environment = [{"define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g248 = sub(body, 0);
  var imp = _g248.import;
  var exp = _g248.export;
  map(load_module, imp);
  imports = imp;
  exports = {};
  var _g250 = 0;
  var _g249 = (exp || []);
  while ((_g250 < length(_g249))) {
    var x = _g249[_g250];
    exports[x] = true;
    _g250 = (_g250 + 1);
  }
  return(undefined);
}, export: true, module: "compiler"}}];
rep = function (str) {
  var _g251 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g253) {
      return([false, _g253]);
    }
  })();
  var _g1 = _g251[0];
  var x = _g251[1];
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
  var _g252 = args;
  while ((i < length(_g252))) {
    var arg = _g252[i];
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
    return(write_file(output, compiler_output));
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
main();
