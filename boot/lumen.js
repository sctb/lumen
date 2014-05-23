infix = {js: {"cat": "+", "and": "&&", "=": "===", "or": "||", "~=": "!="}, lua: {"cat": "..", "and": true, "=": "==", "or": true, "~=": true}, common: {"-": true, "<": true, "+": true, "*": true, ">=": true, "/": true, ">": true, "%": true, "<=": true}};
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
  var _g8 = args;
  while ((i < length(_g8))) {
    var arg = _g8[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g9 = unstash(sublist(arguments, 1));
  var tail63 = _g9["tail?"];
  var str = "";
  var i = 0;
  var _g10 = forms;
  while ((i < length(_g10))) {
    var x = _g10[i];
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
compile_infix = function (_g11) {
  var op = _g11[0];
  var args = sub(_g11, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g12 = args;
  while ((i < length(_g12))) {
    var arg = _g12[i];
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
  var _g13 = (function () {
    indent_level = (indent_level + 1);
    var _g14 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g14);
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
    return((ind + "if (" + cond1 + ") {\n" + _g13 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g13 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g13 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g13 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g13 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g13 + tr));
  }
};
compile_function = function (args, body) {
  var _g15 = unstash(sublist(arguments, 2));
  var name = _g15.name;
  var prefix = _g15.prefix;
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
    var _g16 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g16);
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
  var _g17 = getenv(hd(form));
  var special = _g17.special;
  var self_tr63 = _g17.tr;
  var stmt = _g17.stmt;
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
  var _g61 = unstash(sublist(arguments, 1));
  var stmt63 = _g61["stmt?"];
  var tail63 = _g61["tail?"];
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
current_module = undefined;
compiler_output = undefined;
compiling63 = false;
loading = {};
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  return(compile_toplevel(join(["do"], body)));
};
initial_environment = function () {
  var m = getenv("define-module");
  var x = {"define-module": m};
  return([x]);
};
load_module = function (spec) {
  var k = to_string(spec);
  if (list63(spec)) {
    throw "Unsupported module specification";
  } else if ((nil63(modules[k]) || (compiling63 && nil63(loading[k])))) {
    _37compile_module(k);
  }
  _37load_module(spec);
  return(open_module(spec));
};
_37compile_module = function (k) {
  var file = (k + ".l");
  var mod0 = current_module;
  var env0 = environment;
  var env1 = initial_environment();
  loading[k] = true;
  current_module = k;
  environment = env1;
  var compiled = compile_file(file);
  var top = toplevel(k);
  current_module = mod0;
  environment = env0;
  var b = undefined;
  var _g62 = hd(env1);
  for (b in _g62) {
    if (isNaN(parseInt(b))) {
      var x = _g62[b];
      if ((x.module === k)) {
        top[b] = x;
      }
    }
  }
  if (compiling63) {
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
_37load_module = function (spec) {
  var k = to_string(spec);
  var m = modules[k];
  if (!(m.environment)) {
    var env = [m.toplevel, {}];
    var _g65 = environment;
    environment = env;
    var _g66 = (function () {
      map(open_module, m.import);
      m.environment = env;
    })();
    environment = _g65;
    return(_g66);
  }
};
toplevel = function (m) {
  return(modules[m].toplevel);
};
open_module = function (spec) {
  var m = to_string(spec);
  var frame = last(environment);
  var k = undefined;
  var _g67 = toplevel(m);
  for (k in _g67) {
    if (isNaN(parseInt(k))) {
      var v = _g67[k];
      if (v.export) {
        frame[k] = v;
      }
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
quote_frame = function (t) {
  return(join(["%object"], mapo(function (_g7, x) {
    return(join(["table"], quote_binding(x)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g77 = ["table"];
  _g77.toplevel = quote_frame(m.toplevel);
  _g77.import = quoted(m.import);
  return(_g77);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g78 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g79 = _g78;
    for (k1 in _g79) {
      if (isNaN(parseInt(k1))) {
        var v = _g79[k1];
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
    var _g131 = args;
    for (k in _g131) {
      if (isNaN(parseInt(k))) {
        var v = _g131[k];
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
    var _g132 = args;
    for (k in _g132) {
      if (isNaN(parseInt(k))) {
        var v = _g132[k];
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
      var _g133 = l;
      for (k in _g133) {
        if (isNaN(parseInt(k))) {
          var v = _g133[k];
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
    var _g135 = 0;
    var _g134 = args;
    while ((_g135 < length(_g134))) {
      var arg = _g134[_g135];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g135 = (_g135 + 1);
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
    var _g136 = lh;
    while ((i < length(_g136))) {
      var x = _g136[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g137 = lh;
    for (k in _g137) {
      if (isNaN(parseInt(k))) {
        var v = _g137[k];
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
      var _g138 = form[1];
      var t = _g138[0];
      var k = _g138[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
      var args = form[1];
      var _g139 = sub(form, 2);
      add(environment, {});
      var _g141 = (function () {
        var _g143 = 0;
        var _g142 = args;
        while ((_g143 < length(_g142))) {
          var _g140 = _g142[_g143];
          setenv(_g140, {_stash: true, variable: true});
          _g143 = (_g143 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g139)));
      })();
      drop(environment);
      return(_g141);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g5 = form[0];
      var name = form[1];
      var _g144 = form[2];
      var _g145 = sub(form, 3);
      add(environment, {});
      var _g147 = (function () {
        var _g149 = 0;
        var _g148 = _g144;
        while ((_g149 < length(_g148))) {
          var _g146 = _g148[_g149];
          setenv(_g146, {_stash: true, variable: true});
          _g149 = (_g149 + 1);
        }
        return(join([x, name, map42(macroexpand, _g144)], macroexpand(_g145)));
      })();
      drop(environment);
      return(_g147);
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
  var _g150 = form;
  for (k in _g150) {
    if (isNaN(parseInt(k))) {
      var v = _g150[k];
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
  var _g152 = 0;
  var _g151 = form;
  while ((_g152 < length(_g151))) {
    var x = _g151[_g152];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g152 = (_g152 + 1);
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
  var _g153 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g153, upto));
  } else {
    var l = sublist(x, _g153, upto);
    var k = undefined;
    var _g154 = x;
    for (k in _g154) {
      if (isNaN(parseInt(k))) {
        var v = _g154[k];
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
    var _g155 = l1;
    for (k in _g155) {
      if (isNaN(parseInt(k))) {
        var v = _g155[k];
        l[k] = v;
      }
    }
    var _g157 = undefined;
    var _g156 = l2;
    for (_g157 in _g156) {
      if (isNaN(parseInt(_g157))) {
        var v = _g156[_g157];
        l[_g157] = v;
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
  var _g159 = 0;
  var _g158 = l;
  while ((_g159 < length(_g158))) {
    var x = _g158[_g159];
    if (f(x)) {
      add(l1, x);
    }
    _g159 = (_g159 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g161 = 0;
  var _g160 = l;
  while ((_g161 < length(_g160))) {
    var x = _g160[_g161];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g161 = (_g161 + 1);
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
  var _g171 = 0;
  var _g170 = l;
  while ((_g171 < length(_g170))) {
    var x = _g170[_g171];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g171 = (_g171 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g172 = t;
  for (k in _g172) {
    if (isNaN(parseInt(k))) {
      var v = _g172[k];
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
  var _g173 = t;
  for (k in _g173) {
    if (isNaN(parseInt(k))) {
      var v = _g173[k];
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
  var _g174 = t;
  for (k in _g174) {
    if (isNaN(parseInt(k))) {
      var v = _g174[k];
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
  var _g175 = t;
  for (k in _g175) {
    if (isNaN(parseInt(k))) {
      var v = _g175[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g176 = sub(xs, 0);
  return(join(t, _g176));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g177 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g178 = t;
  for (k in _g178) {
    if (isNaN(parseInt(k))) {
      var v = _g178[k];
      if (!(_g177[k])) {
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
  var _g179 = sub(xs, 0);
  if (empty63(_g179)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g179));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g182 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g182));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g183 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g183)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g184 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g184));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g185 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g185)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g186 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g186)));
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
    var _g187 = x;
    for (k in _g187) {
      if (isNaN(parseInt(k))) {
        var v = _g187[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g188 = x1;
    while ((i < length(_g188))) {
      var y = _g188[i];
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
  var _g189 = stash(args);
  return((f.apply)(f, _g189));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {"(": true, "\n": true, ";": true, ")": true};
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
modules = {reader: {toplevel: {_g192: {variable: true, module: "reader"}, read: {module: "reader", export: true, variable: true}, "read-from-string": {module: "reader", export: true, variable: true}, "make-stream": {module: "reader", export: true, variable: true}, "define-reader": {module: "reader", export: true, macro: function (_g193) {
  var char = _g193[0];
  var stream = _g193[1];
  var body = unstash(sublist(arguments, 1));
  var _g194 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g194)]);
}}, delimiters: {variable: true, module: "reader"}, whitespace: {variable: true, module: "reader"}, "read-table": {variable: true, module: "reader"}, "read-all": {module: "reader", export: true, variable: true}, "read-char": {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, "skip-non-code": {variable: true, module: "reader"}, "flag?": {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}, eof: {variable: true, module: "reader"}}, import: ["lib", "compiler"]}, boot: {toplevel: {}, import: ["lib", "compiler"]}, lib: {toplevel: {fn: {module: "lib", export: true, macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g195 = sub(body, 0);
  var _g196 = bind_arguments(args, _g195);
  var args = _g196[0];
  var _g197 = _g196[1];
  return(join(["%function", args], _g197));
}}, "function?": {module: "lib", export: true, variable: true}, _g163: {variable: true, module: "lib"}, target: {variable: true, export: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, module: "lib"}, "read-file": {module: "lib", export: true, variable: true}, _g113: {variable: true, module: "lib"}, "id-literal?": {module: "lib", export: true, variable: true}, "is?": {module: "lib", export: true, variable: true}, "list*": {module: "lib", export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g198 = xs;
    while ((i < length(_g198))) {
      var x = _g198[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}}, "empty?": {module: "lib", export: true, variable: true}, splice: {module: "lib", export: true, variable: true}, dec: {module: "lib", export: true, macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}}, sub: {module: "lib", export: true, variable: true}, exit: {module: "lib", export: true, variable: true}, replicate: {module: "lib", export: true, variable: true}, find: {module: "lib", export: true, variable: true}, length: {module: "lib", export: true, variable: true}, inc: {module: "lib", export: true, macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}}, "make-id": {module: "lib", export: true, variable: true}, bind: {variable: true, module: "lib"}, "join*": {module: "lib", export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}}, _g169: {variable: true, module: "lib"}, "with-frame": {module: "lib", export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}}, char: {module: "lib", export: true, variable: true}, "let-macro": {module: "lib", export: true, macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g199 = sub(body, 0);
  add(environment, {});
  var _g200 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g199)));
  })();
  drop(environment);
  return(_g200);
}}, "bound?": {variable: true, module: "lib"}, _g91: {variable: true, module: "lib"}, guard: {module: "lib", export: true, macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}}, drop: {module: "lib", export: true, variable: true}, _g94: {variable: true, module: "lib"}, _g108: {variable: true, module: "lib"}, quote: {module: "lib", export: true, macro: function (form) {
  return(quoted(form));
}}, _g106: {variable: true, module: "lib"}, quasiexpand: {variable: true, module: "lib"}, "atom?": {module: "lib", export: true, variable: true}, "map*": {module: "lib", export: true, variable: true}, mapt: {module: "lib", export: true, variable: true}, _g101: {variable: true, module: "lib"}, "define-macro": {module: "lib", export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g201 = sub(body, 0);
  var form = join(["fn", args], _g201);
  eval((function () {
    var _g202 = ["setenv", ["quote", name]];
    _g202.macro = form;
    _g202.form = ["quote", form];
    return(_g202);
  })());
  return(undefined);
}}, "let-symbol": {module: "lib", export: true, macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g203 = sub(body, 0);
  add(environment, {});
  var _g204 = (function () {
    map(function (_g205) {
      var name = _g205[0];
      var exp = _g205[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g203)));
  })();
  drop(environment);
  return(_g204);
}}, each: {module: "lib", export: true, macro: function (_g206) {
  var t = _g206[0];
  var k = _g206[1];
  var v = _g206[2];
  var body = unstash(sublist(arguments, 1));
  var _g207 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g208 = ["target"];
    _g208.js = ["isNaN", ["parseInt", k]];
    _g208.lua = ["not", ["number?", k]];
    return(_g208);
  })(), join(["let", [v, ["get", t1, k]]], _g207)]]]);
}}, "boolean?": {module: "lib", export: true, variable: true}, table: {module: "lib", export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}}, _g125: {variable: true, module: "lib"}, "join!": {module: "lib", export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g209 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g209)]);
}}, "nil?": {module: "lib", export: true, variable: true}, _g121: {variable: true, module: "lib"}, last: {module: "lib", export: true, variable: true}, _g96: {variable: true, module: "lib"}, iterate: {module: "lib", export: true, variable: true}, list: {module: "lib", export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g210 = body;
    for (k in _g210) {
      if (isNaN(parseInt(k))) {
        var v = _g210[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}}, "message-handler": {variable: true, module: "lib"}, _g117: {variable: true, module: "lib"}, exclude: {module: "lib", export: true, variable: true}, _g114: {variable: true, module: "lib"}, "quoting?": {variable: true, module: "lib"}, "list?": {module: "lib", export: true, variable: true}, _g100: {variable: true, module: "lib"}, tl: {module: "lib", export: true, variable: true}, _g128: {variable: true, module: "lib"}, "<=": {module: "lib", export: true, variable: true}, escape: {variable: true, module: "lib"}, "bind-arguments": {variable: true, module: "lib"}, "-": {module: "lib", export: true, variable: true}, define: {module: "lib", export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g211 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g211));
}}, write: {module: "lib", export: true, variable: true}, "*": {module: "lib", export: true, variable: true}, hd: {module: "lib", export: true, variable: true}, "%": {module: "lib", export: true, variable: true}, "string?": {module: "lib", export: true, variable: true}, across: {module: "lib", export: true, macro: function (_g212) {
  var l = _g212[0];
  var v = _g212[1];
  var i = _g212[2];
  var start = _g212[3];
  var body = unstash(sublist(arguments, 1));
  var _g213 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g213, [["inc", i]]))]]);
}}, "write-file": {module: "lib", export: true, variable: true}, setenv: {module: "lib", export: true, variable: true}, "=": {module: "lib", export: true, variable: true}, reduce: {module: "lib", export: true, variable: true}, stash: {variable: true, module: "lib"}, "macro-function": {variable: true, module: "lib"}, _g105: {variable: true, module: "lib"}, "to-string": {module: "lib", export: true, variable: true}, "/": {module: "lib", export: true, variable: true}, "define-special": {module: "lib", export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g214 = sub(body, 0);
  var form = join(["fn", args], _g214);
  var keys = sub(_g214, length(_g214));
  eval(join((function () {
    var _g215 = ["setenv", ["quote", name]];
    _g215.form = ["quote", form];
    _g215.special = form;
    return(_g215);
  })(), keys));
  return(undefined);
}}, "cat": {module: "lib", export: true, variable: true}, getenv: {module: "lib", export: true, variable: true}, split: {module: "lib", export: true, variable: true}, "id-count": {variable: true, module: "lib"}, "define-global": {module: "lib", export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g216 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g216))) {
    var _g217 = bind_arguments(x, _g216);
    var args = _g217[0];
    var _g218 = _g217[1];
    return(join(["%global-function", name, args], _g218));
  } else {
    return(["set", name, x]);
  }
}}, _g109: {variable: true, module: "lib"}, keep: {module: "lib", export: true, variable: true}, "can-unquote?": {variable: true, module: "lib"}, _g90: {variable: true, module: "lib"}, pairwise: {module: "lib", export: true, variable: true}, search: {module: "lib", export: true, variable: true}, at: {module: "lib", export: true, macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}}, "string-literal?": {module: "lib", export: true, variable: true}, "composite?": {module: "lib", export: true, variable: true}, map: {module: "lib", export: true, variable: true}, inner: {module: "lib", export: true, variable: true}, "table?": {module: "lib", export: true, variable: true}, "define-local": {module: "lib", export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g219 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g219))) {
    var _g220 = bind_arguments(x, _g219);
    var args = _g220[0];
    var _g221 = _g220[1];
    return(join(["%local-function", name, args], _g221));
  } else {
    return(["%local", name, x]);
  }
}}, "cat!": {module: "lib", export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g222 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g222)]);
}}, join: {module: "lib", export: true, variable: true}, code: {module: "lib", export: true, variable: true}, quoted: {module: "lib", export: true, variable: true}, "special?": {module: "lib", export: true, variable: true}, mapo: {module: "lib", export: true, variable: true}, print: {module: "lib", export: true, variable: true}, extend: {module: "lib", export: true, variable: true}, apply: {module: "lib", export: true, variable: true}, "quasisplice?": {variable: true, module: "lib"}, "define-symbol": {module: "lib", export: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}}, let: {module: "lib", export: true, macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g223 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g224) {
    var lh = _g224[0];
    var rh = _g224[1];
    var _g226 = 0;
    var _g225 = bind(lh, rh);
    while ((_g226 < length(_g225))) {
      var _g227 = _g225[_g226];
      var id = _g227[0];
      var val = _g227[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g226 = (_g226 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g223)])));
}}, language: {module: "lib", export: true, macro: function () {
  return(["quote", target]);
}}, "number?": {module: "lib", export: true, variable: true}, "with-bindings": {module: "lib", export: true, macro: function (_g228) {
  var names = _g228[0];
  var body = unstash(sublist(arguments, 1));
  var _g229 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g230 = ["setenv", x];
    _g230.variable = true;
    return(_g230);
  })()]], _g229));
}}, fs: {variable: true, module: "lib"}, sublist: {variable: true, module: "lib"}, "splice?": {variable: true, module: "lib"}, "set-of": {module: "lib", export: true, macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g232 = 0;
  var _g231 = elements;
  while ((_g232 < length(_g231))) {
    var e = _g231[_g232];
    l[e] = true;
    _g232 = (_g232 + 1);
  }
  return(join(["table"], l));
}}, type: {module: "lib", export: true, variable: true}, unstash: {module: "lib", export: true, variable: true}, pr: {module: "lib", export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}}, "+": {module: "lib", export: true, variable: true}, macroexpand: {module: "lib", export: true, variable: true}, pending: {variable: true, module: "lib"}, add: {module: "lib", export: true, variable: true}, "special-form?": {module: "lib", export: true, variable: true}, "stash*": {module: "lib", export: true, variable: true}, reverse: {module: "lib", export: true, variable: true}, _g87: {variable: true, module: "lib"}, ">=": {module: "lib", export: true, variable: true}, "<": {module: "lib", export: true, variable: true}, ">": {module: "lib", export: true, variable: true}, "symbol-expansion": {variable: true, module: "lib"}, "keys?": {module: "lib", export: true, variable: true}, "variable?": {variable: true, module: "lib"}, "macro?": {variable: true, module: "lib"}, substring: {variable: true, module: "lib"}, "parse-number": {module: "lib", export: true, variable: true}, _g95: {variable: true, module: "lib"}, _g86: {variable: true, module: "lib"}, quasiquote: {module: "lib", export: true, macro: function (form) {
  return(quasiexpand(form, 1));
}}, _g181: {variable: true, module: "lib"}, "quasiquoting?": {variable: true, module: "lib"}, "symbol?": {variable: true, module: "lib"}, "quasiquote-list": {variable: true, module: "lib"}, _g168: {variable: true, module: "lib"}}, import: ["lib", "compiler"]}, compiler: {toplevel: {_g31: {variable: true, module: "compiler"}, "compile-branch": {variable: true, module: "compiler"}, terminator: {variable: true, module: "compiler"}, _g50: {variable: true, module: "compiler"}, _g39: {variable: true, module: "compiler"}, "%local-function": {module: "compiler", tr: true, export: true, special: function (_g233) {
  var name = _g233[0];
  var args = _g233[1];
  var body = sub(_g233, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}, stmt: true}, "quote-frame": {variable: true, module: "compiler"}, "define-module": {module: "compiler", export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g234 = sub(body, 0);
  var imp = _g234.import;
  var exp = _g234.export;
  map(load_module, imp);
  var k = to_string(spec);
  modules[k] = {toplevel: {}, import: imp};
  var _g236 = 0;
  var _g235 = (exp || []);
  while ((_g236 < length(_g235))) {
    var k = _g235[_g236];
    setenv(k, {_stash: true, export: true});
    _g236 = (_g236 + 1);
  }
  return(undefined);
}}, _g54: {variable: true, module: "compiler"}, _g64: {variable: true, module: "compiler"}, "compile-special": {variable: true, module: "compiler"}, "%function": {module: "compiler", export: true, special: function (_g237) {
  var args = _g237[0];
  var body = sub(_g237, 1);
  return(compile_function(args, body));
}}, "not": {module: "compiler", export: true, special: function (_g238) {
  var x = _g238[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}}, _g19: {variable: true, module: "compiler"}, "quote-m0dules": {module: "compiler", export: true, variable: true}, "compiler-output": {module: "compiler", export: true, variable: true}, "can-return?": {variable: true, module: "compiler"}, "get": {module: "compiler", export: true, special: function (_g239) {
  var t = _g239[0];
  var k = _g239[1];
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
}}, _g18: {variable: true, module: "compiler"}, _g46: {variable: true, module: "compiler"}, "%local": {module: "compiler", export: true, special: function (_g240) {
  var name = _g240[0];
  var value = _g240[1];
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
}, stmt: true}, "current-module": {module: "compiler", export: true, variable: true}, "%load-module": {variable: true, module: "compiler"}, indentation: {variable: true, module: "compiler"}, "do": {module: "compiler", tr: true, export: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true}, _g44: {variable: true, module: "compiler"}, "%array": {module: "compiler", export: true, special: function (forms) {
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
  var _g241 = forms;
  while ((i < length(_g241))) {
    var x = _g241[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}}, _g33: {variable: true, module: "compiler"}, _g26: {variable: true, module: "compiler"}, toplevel: {variable: true, module: "compiler"}, "indent-level": {variable: true, module: "compiler"}, _g42: {variable: true, module: "compiler"}, "with-indent": {module: "compiler", export: true, macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}}, "%for": {module: "compiler", tr: true, export: true, special: function (_g242) {
  var _g243 = _g242[0];
  var t = _g243[0];
  var k = _g243[1];
  var body = sub(_g242, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g244 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g244);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true}, "open-m0dule": {module: "compiler", export: true, variable: true}, "compile-function": {variable: true, module: "compiler"}, _g32: {variable: true, module: "compiler"}, _g41: {variable: true, module: "compiler"}, infix: {variable: true, module: "compiler"}, "return": {module: "compiler", export: true, special: function (_g245) {
  var x = _g245[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true}, loading: {variable: true, module: "compiler"}, "numeric?": {variable: true, module: "compiler"}, "valid-id?": {variable: true, module: "compiler"}, "compiling?": {variable: true, module: "compiler"}, _g45: {variable: true, module: "compiler"}, "with-module": {module: "compiler", export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g246 = sub(body, 0);
  var m = make_id();
  return(["let", [m, ["get", "modules", ["to-string", spec]]], join(["with-environment", ["get", m, ["quote", "environment"]]], _g246)]);
}}, _g75: {variable: true, module: "compiler"}, "open-module": {module: "compiler", export: true, variable: true}, "compile-infix": {variable: true, module: "compiler"}, "quote-modules": {module: "compiler", export: true, variable: true}, "quote-binding": {variable: true, module: "compiler"}, _g74: {variable: true, module: "compiler"}, "break": {module: "compiler", export: true, special: function (_g6) {
  return((indentation() + "break"));
}, stmt: true}, "compile-atom": {variable: true, module: "compiler"}, "quote-module": {variable: true, module: "compiler"}, "while": {module: "compiler", tr: true, export: true, special: function (_g247) {
  var condition = _g247[0];
  var body = sub(_g247, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g248 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g248);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true}, _g48: {variable: true, module: "compiler"}, "error": {module: "compiler", export: true, special: function (_g249) {
  var x = _g249[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true}, "set": {module: "compiler", export: true, special: function (_g250) {
  var lh = _g250[0];
  var rh = _g250[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true}, "quote-environment": {module: "compiler", export: true, variable: true}, "%try": {module: "compiler", tr: true, export: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g251 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g251);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g252 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g252);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true}, "load-module": {module: "compiler", export: true, variable: true}, run: {variable: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, "compile-body": {variable: true, module: "compiler"}, vm: {variable: true, module: "compiler"}, "compile-toplevel": {module: "compiler", export: true, variable: true}, _g76: {variable: true, module: "compiler"}, "compile-call": {variable: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, "compile-id": {variable: true, module: "compiler"}, _g20: {variable: true, module: "compiler"}, _g36: {variable: true, module: "compiler"}, _g23: {variable: true, module: "compiler"}, "%compile-module": {variable: true, module: "compiler"}, _g22: {variable: true, module: "compiler"}, "valid-char?": {variable: true, module: "compiler"}, _g27: {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, "%object": {module: "compiler", export: true, special: function (forms) {
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
  var _g253 = pairs;
  while ((i < length(_g253))) {
    var _g254 = _g253[i];
    var k = _g254[0];
    var v = _g254[1];
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
}}, _g40: {variable: true, module: "compiler"}, compile: {module: "compiler", export: true, variable: true}, "with-environment": {module: "compiler", export: true, macro: function (env) {
  var body = unstash(sublist(arguments, 1));
  var _g255 = sub(body, 0);
  var env0 = make_id();
  var x = make_id();
  return(["let", [env0, "environment"], ["set", "environment", env], ["let", [x, join(["do"], _g255)], ["set", "environment", env0], x]]);
}}, eval: {module: "compiler", export: true, variable: true}, _g38: {variable: true, module: "compiler"}, "if": {module: "compiler", tr: true, export: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g256 = form;
  while ((i < length(_g256))) {
    var condition = _g256[i];
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
}, stmt: true}, _g73: {variable: true, module: "compiler"}, "initial-environment": {variable: true, module: "compiler"}, "%global-function": {module: "compiler", tr: true, export: true, special: function (_g257) {
  var name = _g257[0];
  var args = _g257[1];
  var body = sub(_g257, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, stmt: true}, _g52: {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, "compile-module": {module: "compiler", export: true, variable: true}, _g69: {variable: true, module: "compiler"}}, import: ["reader", "lib", "compiler"]}};
environment = [{"define-module": {module: "compiler", export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g258 = sub(body, 0);
  var imp = _g258.import;
  var exp = _g258.export;
  map(load_module, imp);
  var k = to_string(spec);
  modules[k] = {toplevel: {}, import: imp};
  var _g260 = 0;
  var _g259 = (exp || []);
  while ((_g260 < length(_g259))) {
    var k = _g259[_g260];
    setenv(k, {_stash: true, export: true});
    _g260 = (_g260 + 1);
  }
  return(undefined);
}}}];
rep = function (str) {
  var _g261 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g266) {
      return([false, _g266]);
    }
  })();
  var _g1 = _g261[0];
  var x = _g261[1];
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
  var module = undefined;
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var i = 0;
  var _g262 = args;
  while ((i < length(_g262))) {
    var arg = _g262[i];
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
    } else if ((nil63(module) && ("-" != char(arg, 0)))) {
      module = arg;
    }
    i = (i + 1);
  }
  if (output) {
    if (target1) {
      target = target1;
    }
    compile_module(module);
    return(write_file(output, compiler_output));
  } else {
    module = (module || "main");
    load_module(module);
    var _g263 = modules[to_string(module)];
    var _g264 = environment;
    environment = _g263.environment;
    var _g265 = (function () {
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    })();
    environment = _g264;
    return(_g265);
  }
};
main();
