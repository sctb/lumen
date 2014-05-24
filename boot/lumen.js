infix = {js: {"cat": "+", "=": "===", "or": "||", "and": "&&", "~=": "!="}, common: {"<=": true, "%": true, ">=": true, "*": true, "+": true, "<": true, "-": true, ">": true, "/": true}, lua: {"cat": "..", "=": "==", "~=": true, "and": true, "or": true}};
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
    var _g14 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
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
  var stmt = _g17.stmt;
  var self_tr63 = _g17.tr;
  var special = _g17.special;
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
compiling = {};
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  return(compile_toplevel(join(["do"], body)));
};
initial_environment = function () {
  var b = getenv("define-module");
  var x = {"define-module": b};
  return([x]);
};
module_key = function (spec) {
  if (!(atom63(spec))) {
    throw "Unsupported module specification";
  } else {
    return(to_string(spec));
  }
};
module = function (spec) {
  return(modules[module_key(spec)]);
};
module_path = function (spec) {
  return((module_key(spec) + ".l"));
};
recompile63 = function (spec) {
  return((compiling63 && nil63(compiling[module_key(spec)])));
};
load_module = function (spec) {
  if ((nil63(module(spec)) || recompile63(spec))) {
    _37compile_module(spec);
  } else {
    _37load_module(spec);
  }
  return(open_module(spec));
};
_37compile_module = function (spec) {
  var path = module_path(spec);
  var mod0 = current_module;
  var k = module_key(spec);
  compiling[k] = true;
  current_module = spec;
  var _g62 = environment;
  environment = initial_environment();
  var _g63 = (function () {
    var compiled = compile_file(path);
    var m = module(spec);
    var toplevel = hd(environment);
    current_module = mod0;
    var name = undefined;
    var _g64 = toplevel;
    for (name in _g64) {
      if (isNaN(parseInt(name))) {
        var binding = _g64[name];
        if ((binding.module === k)) {
          m.toplevel[name] = binding;
        }
      }
    }
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  })();
  environment = _g62;
  return(_g63);
};
_37load_module = function (spec) {
  var m = module(spec);
  if (!(m.environment)) {
    var env = [m.toplevel, {}];
    var _g67 = environment;
    environment = env;
    var _g68 = (function () {
      map(open_module, m.import);
      m.environment = env;
    })();
    environment = _g67;
    return(_g68);
  }
};
open_module = function (spec) {
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g69 = m.toplevel;
  for (k in _g69) {
    if (isNaN(parseInt(k))) {
      var v = _g69[k];
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
quote_binding = function (b) {
  if (b.module) {
    b = extend(b, {_stash: true, module: ["quote", b.module]});
  }
  if (is63(b.symbol)) {
    return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
  } else if ((b.macro && b.form)) {
    return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
  } else if ((b.special && b.form)) {
    return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
  } else if (is63(b.variable)) {
    return(b);
  }
};
quote_frame = function (t) {
  return(join(["%object"], mapo(function (_g7, b) {
    return(join(["table"], quote_binding(b)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g79 = ["table"];
  _g79.toplevel = quote_frame(m.toplevel);
  _g79.import = quoted(m.import);
  return(_g79);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g80 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g81 = _g80;
    for (k1 in _g81) {
      if (isNaN(parseInt(k1))) {
        var v = _g81[k1];
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
macro63 = function (k) {
  var b = getenv(k);
  return((b && b.macro));
};
special63 = function (k) {
  var b = getenv(k);
  return((b && b.special));
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
  return((b && b.variable));
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
    var _g133 = args;
    for (k in _g133) {
      if (isNaN(parseInt(k))) {
        var v = _g133[k];
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
    var _g134 = args;
    for (k in _g134) {
      if (isNaN(parseInt(k))) {
        var v = _g134[k];
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
      var _g135 = l;
      for (k in _g135) {
        if (isNaN(parseInt(k))) {
          var v = _g135[k];
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
    var _g137 = 0;
    var _g136 = args;
    while ((_g137 < length(_g136))) {
      var arg = _g136[_g137];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g137 = (_g137 + 1);
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
    var _g138 = lh;
    while ((i < length(_g138))) {
      var x = _g138[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g139 = lh;
    for (k in _g139) {
      if (isNaN(parseInt(k))) {
        var v = _g139[k];
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
      var _g140 = form[1];
      var t = _g140[0];
      var k = _g140[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
      var args = form[1];
      var _g141 = sub(form, 2);
      add(environment, {});
      var _g143 = (function () {
        var _g145 = 0;
        var _g144 = args;
        while ((_g145 < length(_g144))) {
          var _g142 = _g144[_g145];
          setenv(_g142, {_stash: true, variable: true});
          _g145 = (_g145 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g141)));
      })();
      drop(environment);
      return(_g143);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g5 = form[0];
      var name = form[1];
      var _g146 = form[2];
      var _g147 = sub(form, 3);
      add(environment, {});
      var _g149 = (function () {
        var _g151 = 0;
        var _g150 = _g146;
        while ((_g151 < length(_g150))) {
          var _g148 = _g150[_g151];
          setenv(_g148, {_stash: true, variable: true});
          _g151 = (_g151 + 1);
        }
        return(join([x, name, map42(macroexpand, _g146)], macroexpand(_g147)));
      })();
      drop(environment);
      return(_g149);
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
  var _g152 = form;
  for (k in _g152) {
    if (isNaN(parseInt(k))) {
      var v = _g152[k];
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
  var _g154 = 0;
  var _g153 = form;
  while ((_g154 < length(_g153))) {
    var x = _g153[_g154];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g154 = (_g154 + 1);
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
  var _g155 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g155, upto));
  } else {
    var l = sublist(x, _g155, upto);
    var k = undefined;
    var _g156 = x;
    for (k in _g156) {
      if (isNaN(parseInt(k))) {
        var v = _g156[k];
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
    var _g157 = l1;
    for (k in _g157) {
      if (isNaN(parseInt(k))) {
        var v = _g157[k];
        l[k] = v;
      }
    }
    var _g159 = undefined;
    var _g158 = l2;
    for (_g159 in _g158) {
      if (isNaN(parseInt(_g159))) {
        var v = _g158[_g159];
        l[_g159] = v;
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
  var _g161 = 0;
  var _g160 = l;
  while ((_g161 < length(_g160))) {
    var x = _g160[_g161];
    if (f(x)) {
      add(l1, x);
    }
    _g161 = (_g161 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g163 = 0;
  var _g162 = l;
  while ((_g163 < length(_g162))) {
    var x = _g162[_g163];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g163 = (_g163 + 1);
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
  var _g173 = 0;
  var _g172 = l;
  while ((_g173 < length(_g172))) {
    var x = _g172[_g173];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g173 = (_g173 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g174 = t;
  for (k in _g174) {
    if (isNaN(parseInt(k))) {
      var v = _g174[k];
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
  var _g175 = t;
  for (k in _g175) {
    if (isNaN(parseInt(k))) {
      var v = _g175[k];
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
  var _g176 = t;
  for (k in _g176) {
    if (isNaN(parseInt(k))) {
      var v = _g176[k];
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
  var _g177 = t;
  for (k in _g177) {
    if (isNaN(parseInt(k))) {
      var v = _g177[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g178 = sub(xs, 0);
  return(join(t, _g178));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g179 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g180 = t;
  for (k in _g180) {
    if (isNaN(parseInt(k))) {
      var v = _g180[k];
      if (!(_g179[k])) {
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
  var _g181 = sub(xs, 0);
  if (empty63(_g181)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g181));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g184 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g184));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g185 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g185)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g186 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g186));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g187 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g187)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g188 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g188)));
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
    var _g189 = x;
    for (k in _g189) {
      if (isNaN(parseInt(k))) {
        var v = _g189[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g190 = x1;
    while ((i < length(_g190))) {
      var y = _g190[i];
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
  var _g191 = stash(args);
  return((f.apply)(f, _g191));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {")": true, "(": true, ";": true, "\n": true};
whitespace = {"\t": true, "\n": true, " ": true};
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
modules = {lib: {toplevel: {_g110: {variable: true, module: "lib"}, "with-bindings": {module: "lib", macro: function (_g195) {
  var names = _g195[0];
  var body = unstash(sublist(arguments, 1));
  var _g196 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g197 = ["setenv", x];
    _g197.variable = true;
    return(_g197);
  })()]], _g196));
}, export: true}, exclude: {variable: true, export: true, module: "lib"}, apply: {variable: true, export: true, module: "lib"}, "keys?": {variable: true, export: true, module: "lib"}, let: {module: "lib", macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g198 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g199) {
    var lh = _g199[0];
    var rh = _g199[1];
    var _g201 = 0;
    var _g200 = bind(lh, rh);
    while ((_g201 < length(_g200))) {
      var _g202 = _g200[_g201];
      var id = _g202[0];
      var val = _g202[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g201 = (_g201 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g198)])));
}, export: true}, "symbol-expansion": {variable: true, module: "lib"}, bind: {variable: true, module: "lib"}, "bound?": {variable: true, module: "lib"}, _g182: {variable: true, module: "lib"}, "<": {variable: true, export: true, module: "lib"}, _g168: {variable: true, module: "lib"}, ">": {variable: true, export: true, module: "lib"}, _g117: {variable: true, module: "lib"}, "message-handler": {variable: true, module: "lib"}, each: {module: "lib", macro: function (_g203) {
  var t = _g203[0];
  var k = _g203[1];
  var v = _g203[2];
  var body = unstash(sublist(arguments, 1));
  var _g204 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g205 = ["target"];
    _g205.js = ["isNaN", ["parseInt", k]];
    _g205.lua = ["not", ["number?", k]];
    return(_g205);
  })(), join(["let", [v, ["get", t1, k]]], _g204)]]]);
}, export: true}, "<=": {variable: true, export: true, module: "lib"}, "is?": {variable: true, export: true, module: "lib"}, ">=": {variable: true, export: true, module: "lib"}, reverse: {variable: true, export: true, module: "lib"}, "empty?": {variable: true, export: true, module: "lib"}, target: {variable: true, export: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, module: "lib"}, search: {variable: true, export: true, module: "lib"}, getenv: {variable: true, export: true, module: "lib"}, "define-local": {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g206 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g206))) {
    var _g207 = bind_arguments(x, _g206);
    var args = _g207[0];
    var _g208 = _g207[1];
    return(join(["%local-function", name, args], _g208));
  } else {
    return(["%local", name, x]);
  }
}, export: true}, sublist: {variable: true, module: "lib"}, _g124: {variable: true, module: "lib"}, type: {variable: true, export: true, module: "lib"}, _g167: {variable: true, module: "lib"}, map: {variable: true, export: true, module: "lib"}, fs: {variable: true, module: "lib"}, "id-count": {variable: true, module: "lib"}, stash: {variable: true, module: "lib"}, _g112: {variable: true, module: "lib"}, _g105: {variable: true, module: "lib"}, _g90: {variable: true, module: "lib"}, "atom?": {variable: true, export: true, module: "lib"}, "table?": {variable: true, export: true, module: "lib"}, "string?": {variable: true, export: true, module: "lib"}, _g113: {variable: true, module: "lib"}, _g99: {variable: true, module: "lib"}, "variable?": {variable: true, module: "lib"}, "list*": {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g209 = xs;
    while ((i < length(_g209))) {
      var x = _g209[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, export: true}, "macro?": {variable: true, module: "lib"}, splice: {variable: true, export: true, module: "lib"}, reduce: {variable: true, export: true, module: "lib"}, pr: {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, export: true}, exit: {variable: true, export: true, module: "lib"}, "with-frame": {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, export: true}, "quasiquote-list": {variable: true, module: "lib"}, write: {variable: true, export: true, module: "lib"}, table: {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}, export: true}, replicate: {variable: true, export: true, module: "lib"}, _g83: {variable: true, module: "lib"}, "number?": {variable: true, export: true, module: "lib"}, split: {variable: true, export: true, module: "lib"}, "let-symbol": {module: "lib", macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g210 = sub(body, 0);
  add(environment, {});
  var _g211 = (function () {
    map(function (_g212) {
      var name = _g212[0];
      var exp = _g212[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g210)));
  })();
  drop(environment);
  return(_g211);
}, export: true}, _g95: {variable: true, module: "lib"}, "cat": {variable: true, export: true, module: "lib"}, extend: {variable: true, export: true, module: "lib"}, "join!": {module: "lib", macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g213 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g213)]);
}, export: true}, "splice?": {variable: true, module: "lib"}, quasiquote: {module: "lib", macro: function (form) {
  return(quasiexpand(form, 1));
}, export: true}, mapt: {variable: true, export: true, module: "lib"}, char: {variable: true, export: true, module: "lib"}, "can-unquote?": {variable: true, module: "lib"}, drop: {variable: true, export: true, module: "lib"}, "function?": {variable: true, export: true, module: "lib"}, _g164: {variable: true, module: "lib"}, "nil?": {variable: true, export: true, module: "lib"}, pending: {variable: true, module: "lib"}, "quoting?": {variable: true, module: "lib"}, quote: {module: "lib", macro: function (form) {
  return(quoted(form));
}, export: true}, code: {variable: true, export: true, module: "lib"}, "list?": {variable: true, export: true, module: "lib"}, inc: {module: "lib", macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, export: true}, across: {module: "lib", macro: function (_g214) {
  var l = _g214[0];
  var v = _g214[1];
  var i = _g214[2];
  var start = _g214[3];
  var body = unstash(sublist(arguments, 1));
  var _g215 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g215, [["inc", i]]))]]);
}, export: true}, escape: {variable: true, module: "lib"}, _g109: {variable: true, module: "lib"}, define: {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g216 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g216));
}, export: true}, add: {variable: true, export: true, module: "lib"}, macroexpand: {variable: true, export: true, module: "lib"}, setenv: {variable: true, export: true, module: "lib"}, _g98: {variable: true, module: "lib"}, "boolean?": {variable: true, export: true, module: "lib"}, "define-macro": {module: "lib", macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g217 = sub(body, 0);
  var form = join(["fn", args], _g217);
  eval((function () {
    var _g218 = ["setenv", ["quote", name]];
    _g218.form = ["quote", form];
    _g218.macro = form;
    return(_g218);
  })());
  return(undefined);
}, export: true}, "symbol?": {variable: true, module: "lib"}, "write-file": {variable: true, export: true, module: "lib"}, "id-literal?": {variable: true, export: true, module: "lib"}, "string-literal?": {variable: true, export: true, module: "lib"}, iterate: {variable: true, export: true, module: "lib"}, "join*": {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, export: true}, list: {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g219 = body;
    for (k in _g219) {
      if (isNaN(parseInt(k))) {
        var v = _g219[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, export: true}, "special?": {variable: true, export: true, module: "lib"}, tl: {variable: true, export: true, module: "lib"}, "bind-arguments": {variable: true, module: "lib"}, "special-form?": {variable: true, export: true, module: "lib"}, "parse-number": {variable: true, export: true, module: "lib"}, quasiexpand: {variable: true, module: "lib"}, hd: {variable: true, export: true, module: "lib"}, "stash*": {variable: true, export: true, module: "lib"}, "define-special": {module: "lib", macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g220 = sub(body, 0);
  var form = join(["fn", args], _g220);
  var keys = sub(_g220, length(_g220));
  eval(join((function () {
    var _g221 = ["setenv", ["quote", name]];
    _g221.form = ["quote", form];
    _g221.special = form;
    return(_g221);
  })(), keys));
  return(undefined);
}, export: true}, quoted: {variable: true, export: true, module: "lib"}, guard: {module: "lib", macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, export: true}, length: {variable: true, export: true, module: "lib"}, "define-symbol": {module: "lib", macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, export: true}, unstash: {variable: true, export: true, module: "lib"}, dec: {module: "lib", macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, export: true}, _g120: {variable: true, module: "lib"}, at: {module: "lib", macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, export: true}, last: {variable: true, export: true, module: "lib"}, _g100: {variable: true, module: "lib"}, "to-string": {variable: true, export: true, module: "lib"}, _g128: {variable: true, module: "lib"}, "map*": {variable: true, export: true, module: "lib"}, mapo: {variable: true, export: true, module: "lib"}, language: {module: "lib", macro: function () {
  return(["quote", target]);
}, export: true}, pairwise: {variable: true, export: true, module: "lib"}, keep: {variable: true, export: true, module: "lib"}, fn: {module: "lib", macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g222 = sub(body, 0);
  var _g223 = bind_arguments(args, _g222);
  var args = _g223[0];
  var _g224 = _g223[1];
  return(join(["%function", args], _g224));
}, export: true}, sub: {variable: true, export: true, module: "lib"}, "*": {variable: true, export: true, module: "lib"}, "+": {variable: true, export: true, module: "lib"}, find: {variable: true, export: true, module: "lib"}, "-": {variable: true, export: true, module: "lib"}, "=": {variable: true, export: true, module: "lib"}, "/": {variable: true, export: true, module: "lib"}, _g94: {variable: true, module: "lib"}, _g91: {variable: true, module: "lib"}, "cat!": {module: "lib", macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g225 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g225)]);
}, export: true}, "let-macro": {module: "lib", macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g226 = sub(body, 0);
  add(environment, {});
  var _g227 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g226)));
  })();
  drop(environment);
  return(_g227);
}, export: true}, "composite?": {variable: true, export: true, module: "lib"}, "%": {variable: true, export: true, module: "lib"}, "set-of": {module: "lib", macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g229 = 0;
  var _g228 = elements;
  while ((_g229 < length(_g228))) {
    var e = _g228[_g229];
    l[e] = true;
    _g229 = (_g229 + 1);
  }
  return(join(["table"], l));
}, export: true}, "make-id": {variable: true, export: true, module: "lib"}, join: {variable: true, export: true, module: "lib"}, "quasiquoting?": {variable: true, module: "lib"}, "define-global": {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g230 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g230))) {
    var _g231 = bind_arguments(x, _g230);
    var args = _g231[0];
    var _g232 = _g231[1];
    return(join(["%global-function", name, args], _g232));
  } else {
    return(["set", name, x]);
  }
}, export: true}, print: {variable: true, export: true, module: "lib"}, _g84: {variable: true, module: "lib"}, "quasisplice?": {variable: true, module: "lib"}, "read-file": {variable: true, export: true, module: "lib"}, inner: {variable: true, export: true, module: "lib"}, _g104: {variable: true, module: "lib"}, substring: {variable: true, module: "lib"}}, import: ["lib", "compiler"]}, reader: {toplevel: {"read-table": {variable: true, module: "reader"}, "define-reader": {export: true, module: "reader", macro: function (_g233) {
  var char = _g233[0];
  var stream = _g233[1];
  var body = unstash(sublist(arguments, 1));
  var _g234 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g234)]);
}}, "flag?": {variable: true, module: "reader"}, "read-from-string": {export: true, module: "reader", variable: true}, "make-stream": {export: true, module: "reader", variable: true}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, whitespace: {variable: true, module: "reader"}, eof: {variable: true, module: "reader"}, delimiters: {variable: true, module: "reader"}, "peek-char": {variable: true, module: "reader"}, _g192: {variable: true, module: "reader"}, "read-char": {variable: true, module: "reader"}, "key?": {variable: true, module: "reader"}, "skip-non-code": {variable: true, module: "reader"}}, import: ["lib", "compiler"]}, compiler: {toplevel: {"%local-function": {stmt: true, module: "compiler", export: true, special: function (_g235) {
  var name = _g235[0];
  var args = _g235[1];
  var body = sub(_g235, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}, tr: true}, _g31: {variable: true, module: "compiler"}, "%try": {stmt: true, module: "compiler", export: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g236 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g236);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g237 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g237);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true}, "set": {export: true, stmt: true, module: "compiler", special: function (_g238) {
  var lh = _g238[0];
  var rh = _g238[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}}, "valid-char?": {variable: true, module: "compiler"}, infix: {variable: true, module: "compiler"}, _g22: {variable: true, module: "compiler"}, _g37: {variable: true, module: "compiler"}, getop: {variable: true, module: "compiler"}, "break": {export: true, stmt: true, module: "compiler", special: function (_g6) {
  return((indentation() + "break"));
}}, "%compile-module": {variable: true, module: "compiler"}, _g75: {variable: true, module: "compiler"}, "compile-call": {variable: true, module: "compiler"}, "get": {module: "compiler", special: function (_g239) {
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
}, export: true}, "open-m0dule": {variable: true, export: true, module: "compiler"}, "with-environment": {module: "compiler", macro: function (env) {
  var body = unstash(sublist(arguments, 1));
  var _g240 = sub(body, 0);
  var env0 = make_id();
  var x = make_id();
  return(["let", [env0, "environment"], ["set", "environment", env], ["let", [x, join(["do"], _g240)], ["set", "environment", env0], x]]);
}, export: true}, terminator: {variable: true, module: "compiler"}, _g46: {variable: true, module: "compiler"}, _g42: {variable: true, module: "compiler"}, "quote-m0dules": {variable: true, export: true, module: "compiler"}, "initial-environment": {variable: true, module: "compiler"}, "return": {export: true, stmt: true, module: "compiler", special: function (_g241) {
  var x = _g241[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}}, "%function": {module: "compiler", special: function (_g242) {
  var args = _g242[0];
  var body = sub(_g242, 1);
  return(compile_function(args, body));
}, export: true}, "%load-module": {variable: true, module: "compiler"}, "quote-module": {variable: true, module: "compiler"}, "current-module": {variable: true, export: true, module: "compiler"}, _g74: {variable: true, module: "compiler"}, _g44: {variable: true, module: "compiler"}, "with-indent": {module: "compiler", macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, export: true}, "compile-branch": {variable: true, module: "compiler"}, "compile-toplevel": {variable: true, export: true, module: "compiler"}, module: {variable: true, module: "compiler"}, "module-path": {variable: true, module: "compiler"}, "module-key": {variable: true, module: "compiler"}, _g50: {variable: true, module: "compiler"}, _g36: {variable: true, module: "compiler"}, "compile-id": {variable: true, module: "compiler"}, "while": {stmt: true, module: "compiler", export: true, special: function (_g243) {
  var condition = _g243[0];
  var body = sub(_g243, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g244 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g244);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true}, run: {variable: true, module: "compiler"}, "with-module": {module: "compiler", macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g245 = sub(body, 0);
  var m = make_id();
  return(["let", [m, ["module", spec]], join(["with-environment", ["get", m, ["quote", "environment"]]], _g245)]);
}, export: true}, _g73: {variable: true, module: "compiler"}, compile: {variable: true, export: true, module: "compiler"}, "%for": {stmt: true, module: "compiler", export: true, special: function (_g246) {
  var _g247 = _g246[0];
  var t = _g247[0];
  var k = _g247[1];
  var body = sub(_g246, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g248 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g248);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true}, _g20: {variable: true, module: "compiler"}, _g41: {variable: true, module: "compiler"}, _g18: {variable: true, module: "compiler"}, _g54: {variable: true, module: "compiler"}, "if": {stmt: true, module: "compiler", export: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g249 = form;
  while ((i < length(_g249))) {
    var condition = _g249[i];
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
}, tr: true}, _g52: {variable: true, module: "compiler"}, "recompile?": {variable: true, module: "compiler"}, "%local": {export: true, stmt: true, module: "compiler", special: function (_g250) {
  var name = _g250[0];
  var value = _g250[1];
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
}}, "%array": {module: "compiler", special: function (forms) {
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
  var _g251 = forms;
  while ((i < length(_g251))) {
    var x = _g251[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}, export: true}, _g23: {variable: true, module: "compiler"}, indentation: {variable: true, module: "compiler"}, _g26: {variable: true, module: "compiler"}, _g48: {variable: true, module: "compiler"}, "valid-id?": {variable: true, module: "compiler"}, _g40: {variable: true, module: "compiler"}, _g45: {variable: true, module: "compiler"}, "define-module": {module: "compiler", macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g252 = sub(body, 0);
  var exp = _g252.export;
  var imp = _g252.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, environment: environment, import: imp};
  var _g254 = 0;
  var _g253 = (exp || []);
  while ((_g254 < length(_g253))) {
    var k = _g253[_g254];
    setenv(k, {_stash: true, export: true});
    _g254 = (_g254 + 1);
  }
  return(undefined);
}, export: true}, "error": {export: true, stmt: true, module: "compiler", special: function (_g255) {
  var x = _g255[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}}, "compiler-output": {variable: true, export: true, module: "compiler"}, "compile-module": {variable: true, export: true, module: "compiler"}, "do": {stmt: true, module: "compiler", export: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true}, "not": {module: "compiler", special: function (_g256) {
  var x = _g256[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, export: true}, "%global-function": {stmt: true, module: "compiler", export: true, special: function (_g257) {
  var name = _g257[0];
  var args = _g257[1];
  var body = sub(_g257, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true}, _g32: {variable: true, module: "compiler"}, "quote-frame": {variable: true, module: "compiler"}, "compile-file": {variable: true, module: "compiler"}, _g27: {variable: true, module: "compiler"}, "quote-environment": {variable: true, export: true, module: "compiler"}, "compile-body": {variable: true, module: "compiler"}, "quote-binding": {variable: true, module: "compiler"}, "numeric?": {variable: true, module: "compiler"}, _g19: {variable: true, module: "compiler"}, "compile-atom": {variable: true, module: "compiler"}, "compile-special": {variable: true, module: "compiler"}, "quote-modules": {variable: true, export: true, module: "compiler"}, "compile-infix": {variable: true, module: "compiler"}, eval: {variable: true, export: true, module: "compiler"}, "infix?": {variable: true, module: "compiler"}, "open-module": {variable: true, export: true, module: "compiler"}, "compile-args": {variable: true, module: "compiler"}, vm: {variable: true, module: "compiler"}, "can-return?": {variable: true, module: "compiler"}, "load-module": {variable: true, export: true, module: "compiler"}, "compiling?": {variable: true, module: "compiler"}, compiling: {variable: true, module: "compiler"}, _g39: {variable: true, module: "compiler"}, "indent-level": {variable: true, module: "compiler"}, "%object": {module: "compiler", special: function (forms) {
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
  var _g258 = pairs;
  while ((i < length(_g258))) {
    var _g259 = _g258[i];
    var k = _g259[0];
    var v = _g259[1];
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
}, export: true}, _g72: {variable: true, module: "compiler"}, _g65: {variable: true, module: "compiler"}, _g70: {variable: true, module: "compiler"}, "compile-function": {variable: true, module: "compiler"}, _g33: {variable: true, module: "compiler"}}, import: ["reader", "lib", "compiler"]}, boot: {toplevel: {}, import: ["lib", "compiler"]}};
environment = [{"define-module": {module: "compiler", macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g260 = sub(body, 0);
  var exp = _g260.export;
  var imp = _g260.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, environment: environment, import: imp};
  var _g262 = 0;
  var _g261 = (exp || []);
  while ((_g262 < length(_g261))) {
    var k = _g261[_g262];
    setenv(k, {_stash: true, export: true});
    _g262 = (_g262 + 1);
  }
  return(undefined);
}, export: true}}];
rep = function (str) {
  var _g263 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g268) {
      return([false, _g268]);
    }
  })();
  var _g1 = _g263[0];
  var x = _g263[1];
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
  var _g264 = args;
  while ((i < length(_g264))) {
    var arg = _g264[i];
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
    spec = (spec || "main");
    load_module(spec);
    var _g265 = module(spec);
    var _g266 = environment;
    environment = _g265.environment;
    var _g267 = (function () {
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    })();
    environment = _g266;
    return(_g267);
  }
};
main();
