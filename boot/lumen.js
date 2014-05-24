infix = {common: {"*": true, "+": true, "<": true, "-": true, ">": true, "/": true, "%": true, ">=": true, "<=": true}, lua: {"or": true, "and": true, "=": "==", "~=": true, "cat": ".."}, js: {"or": "||", "and": "&&", "~=": "!=", "=": "===", "cat": "+"}};
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
  var self_tr63 = _g17.tr;
  var stmt = _g17.stmt;
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
  var tail63 = _g61["tail?"];
  var stmt63 = _g61["stmt?"];
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
  }
  return(open_module(spec));
};
_37compile_module = function (spec) {
  var path = module_path(spec);
  var mod0 = current_module;
  var env0 = environment;
  var k = module_key(spec);
  compiling[k] = true;
  current_module = spec;
  environment = initial_environment();
  var compiled = compile_file(path);
  var m = module(spec);
  var toplevel = hd(environment);
  current_module = mod0;
  environment = env0;
  var name = undefined;
  var _g62 = toplevel;
  for (name in _g62) {
    if (isNaN(parseInt(name))) {
      var binding = _g62[name];
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
};
open_module = function (spec) {
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g63 = m.toplevel;
  for (k in _g63) {
    if (isNaN(parseInt(k))) {
      var v = _g63[k];
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
  var _g64 = m.toplevel;
  for (k in _g64) {
    if (isNaN(parseInt(k))) {
      var v = _g64[k];
      frame[k] = v;
    }
  }
  return(map(open_module, m.import));
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
  var _g72 = ["table"];
  _g72.toplevel = quote_frame(m.toplevel);
  _g72.import = quoted(m.import);
  return(_g72);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g73 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g74 = _g73;
    for (k1 in _g74) {
      if (isNaN(parseInt(k1))) {
        var v = _g74[k1];
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
      var _g3 = form[0];
      var _g133 = form[1];
      var t = _g133[0];
      var k = _g133[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
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
      var _g5 = form[0];
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
substring = function (str, from, upto) {
  return((str.substring)(from, upto));
};
sublist = function (l, from, upto) {
  return((Array.prototype.slice.call)(l, from, upto));
};
sub = function (x, from, upto) {
  var _g148 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g148, upto));
  } else {
    var l = sublist(x, _g148, upto);
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
mapt = function (f, t) {
  var t1 = {};
  var k = undefined;
  var _g168 = t;
  for (k in _g168) {
    if (isNaN(parseInt(k))) {
      var v = _g168[k];
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
  var _g169 = t;
  for (k in _g169) {
    if (isNaN(parseInt(k))) {
      var v = _g169[k];
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
  var _g170 = t;
  for (k in _g170) {
    if (isNaN(parseInt(k))) {
      var v = _g170[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g171 = sub(xs, 0);
  return(join(t, _g171));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g172 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g173 = t;
  for (k in _g173) {
    if (isNaN(parseInt(k))) {
      var v = _g173[k];
      if (!(_g172[k])) {
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
  var _g174 = sub(xs, 0);
  if (empty63(_g174)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g174));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g177 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g177));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g178 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g178)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g179 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g179));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g180 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g180)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g181 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g181)));
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
    var _g182 = x;
    for (k in _g182) {
      if (isNaN(parseInt(k))) {
        var v = _g182[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g183 = x1;
    while ((i < length(_g183))) {
      var y = _g183[i];
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
  var _g184 = stash(args);
  return((f.apply)(f, _g184));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {"\n": true, "(": true, ")": true, ";": true};
whitespace = {"\n": true, " ": true, "\t": true};
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
modules = {lib: {toplevel: {length: {module: "lib", variable: true, export: true}, _g95: {module: "lib", variable: true}, "string-literal?": {module: "lib", variable: true, export: true}, "parse-number": {module: "lib", variable: true, export: true}, _g85: {module: "lib", variable: true}, "define-macro": {module: "lib", macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g188 = sub(body, 0);
  var form = join(["fn", args], _g188);
  eval((function () {
    var _g189 = ["setenv", ["quote", name]];
    _g189.macro = form;
    _g189.form = ["quote", form];
    return(_g189);
  })());
  return(undefined);
}, export: true}, _g91: {module: "lib", variable: true}, _g164: {module: "lib", variable: true}, "nil?": {module: "lib", variable: true, export: true}, _g158: {module: "lib", variable: true}, "define-global": {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g190 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g190))) {
    var _g191 = bind_arguments(x, _g190);
    var args = _g191[0];
    var _g192 = _g191[1];
    return(join(["%global-function", name, args], _g192));
  } else {
    return(["set", name, x]);
  }
}, export: true}, "macro-function": {module: "lib", variable: true}, _g103: {module: "lib", variable: true}, fn: {module: "lib", macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g193 = sub(body, 0);
  var _g194 = bind_arguments(args, _g193);
  var args = _g194[0];
  var _g195 = _g194[1];
  return(join(["%function", args], _g195));
}, export: true}, reverse: {module: "lib", variable: true, export: true}, "symbol?": {module: "lib", variable: true}, "id-count": {module: "lib", variable: true}, "join*": {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, export: true}, print: {module: "lib", variable: true, export: true}, exit: {module: "lib", variable: true, export: true}, "read-file": {module: "lib", variable: true, export: true}, "list?": {module: "lib", variable: true, export: true}, "define-symbol": {module: "lib", macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, export: true}, let: {module: "lib", macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g196 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g197) {
    var lh = _g197[0];
    var rh = _g197[1];
    var _g199 = 0;
    var _g198 = bind(lh, rh);
    while ((_g199 < length(_g198))) {
      var _g200 = _g198[_g199];
      var id = _g200[0];
      var val = _g200[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g199 = (_g199 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g196)])));
}, export: true}, _g163: {module: "lib", variable: true}, _g100: {module: "lib", variable: true}, language: {module: "lib", macro: function () {
  return(["quote", target]);
}, export: true}, "make-id": {module: "lib", variable: true, export: true}, "special-form?": {module: "lib", variable: true, export: true}, "cat!": {module: "lib", macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g201 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g201)]);
}, export: true}, sublist: {module: "lib", variable: true}, dec: {module: "lib", macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, export: true}, find: {module: "lib", variable: true, export: true}, "quasiquoting?": {module: "lib", variable: true}, bind: {module: "lib", variable: true}, "id-literal?": {module: "lib", variable: true, export: true}, "composite?": {module: "lib", variable: true, export: true}, define: {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g202 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g202));
}, export: true}, _g120: {module: "lib", variable: true}, "quasiquote-list": {module: "lib", variable: true}, _g116: {module: "lib", variable: true}, escape: {module: "lib", variable: true}, _g176: {module: "lib", variable: true}, "number?": {module: "lib", variable: true, export: true}, quoted: {module: "lib", variable: true, export: true}, add: {module: "lib", variable: true, export: true}, "splice?": {module: "lib", variable: true}, replicate: {module: "lib", variable: true, export: true}, keep: {module: "lib", variable: true, export: true}, table: {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}, export: true}, "table?": {module: "lib", variable: true, export: true}, mapt: {module: "lib", variable: true, export: true}, "empty?": {module: "lib", variable: true, export: true}, splice: {module: "lib", variable: true, export: true}, quasiexpand: {module: "lib", variable: true}, inner: {module: "lib", variable: true, export: true}, "*": {module: "lib", variable: true, export: true}, "+": {module: "lib", variable: true, export: true}, "define-local": {module: "lib", macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g203 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g203))) {
    var _g204 = bind_arguments(x, _g203);
    var args = _g204[0];
    var _g205 = _g204[1];
    return(join(["%local-function", name, args], _g205));
  } else {
    return(["%local", name, x]);
  }
}, export: true}, "list*": {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g206 = xs;
    while ((i < length(_g206))) {
      var x = _g206[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, export: true}, fs: {module: "lib", variable: true}, substring: {module: "lib", variable: true}, search: {module: "lib", variable: true, export: true}, list: {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g207 = body;
    for (k in _g207) {
      if (isNaN(parseInt(k))) {
        var v = _g207[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, export: true}, _g108: {module: "lib", variable: true}, "quoting?": {module: "lib", variable: true}, apply: {module: "lib", variable: true, export: true}, "<": {module: "lib", variable: true, export: true}, "stash*": {module: "lib", variable: true, export: true}, ">": {module: "lib", variable: true, export: true}, _g96: {module: "lib", variable: true}, sub: {module: "lib", variable: true, export: true}, "quasisplice?": {module: "lib", variable: true}, setenv: {module: "lib", variable: true, export: true}, mapo: {module: "lib", variable: true, export: true}, "variable?": {module: "lib", variable: true}, "symbol-expansion": {module: "lib", variable: true}, each: {module: "lib", macro: function (_g208) {
  var t = _g208[0];
  var k = _g208[1];
  var v = _g208[2];
  var body = unstash(sublist(arguments, 1));
  var _g209 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g210 = ["target"];
    _g210.js = ["isNaN", ["parseInt", k]];
    _g210.lua = ["not", ["number?", k]];
    return(_g210);
  })(), join(["let", [v, ["get", t1, k]]], _g209)]]]);
}, export: true}, "message-handler": {module: "lib", variable: true}, "join!": {module: "lib", macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g211 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g211)]);
}, export: true}, iterate: {module: "lib", variable: true, export: true}, pairwise: {module: "lib", variable: true, export: true}, code: {module: "lib", variable: true, export: true}, "function?": {module: "lib", variable: true, export: true}, stash: {module: "lib", variable: true}, "%": {module: "lib", variable: true, export: true}, "special?": {module: "lib", variable: true, export: true}, _g81: {module: "lib", variable: true}, "map*": {module: "lib", variable: true, export: true}, _g123: {module: "lib", variable: true}, write: {module: "lib", variable: true, export: true}, _g104: {module: "lib", variable: true}, unstash: {module: "lib", variable: true, export: true}, "string?": {module: "lib", variable: true, export: true}, _g112: {module: "lib", variable: true}, "boolean?": {module: "lib", variable: true, export: true}, "let-macro": {module: "lib", macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g212 = sub(body, 0);
  add(environment, {});
  var _g213 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g212)));
  })();
  drop(environment);
  return(_g213);
}, export: true}, _g82: {module: "lib", variable: true}, _g86: {module: "lib", variable: true}, quote: {module: "lib", macro: function (form) {
  return(quoted(form));
}, export: true}, at: {module: "lib", macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, export: true}, extend: {module: "lib", variable: true, export: true}, type: {module: "lib", variable: true, export: true}, join: {module: "lib", variable: true, export: true}, macroexpand: {module: "lib", variable: true, export: true}, "set-of": {module: "lib", macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g215 = 0;
  var _g214 = elements;
  while ((_g215 < length(_g214))) {
    var e = _g214[_g215];
    l[e] = true;
    _g215 = (_g215 + 1);
  }
  return(join(["table"], l));
}, export: true}, "define-special": {module: "lib", macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g216 = sub(body, 0);
  var form = join(["fn", args], _g216);
  var keys = sub(_g216, length(_g216));
  eval(join((function () {
    var _g217 = ["setenv", ["quote", name]];
    _g217.special = form;
    _g217.form = ["quote", form];
    return(_g217);
  })(), keys));
  return(undefined);
}, export: true}, "cat": {module: "lib", variable: true, export: true}, "write-file": {module: "lib", variable: true, export: true}, ">=": {module: "lib", variable: true, export: true}, char: {module: "lib", variable: true, export: true}, "atom?": {module: "lib", variable: true, export: true}, tl: {module: "lib", variable: true, export: true}, _g89: {module: "lib", variable: true}, "with-frame": {module: "lib", macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, export: true}, "bind-arguments": {module: "lib", variable: true}, "bound?": {module: "lib", variable: true}, "=": {module: "lib", variable: true, export: true}, split: {module: "lib", variable: true, export: true}, "-": {module: "lib", variable: true, export: true}, "with-bindings": {module: "lib", macro: function (_g218) {
  var names = _g218[0];
  var body = unstash(sublist(arguments, 1));
  var _g219 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g220 = ["setenv", x];
    _g220.variable = true;
    return(_g220);
  })()]], _g219));
}, export: true}, "/": {module: "lib", variable: true, export: true}, getenv: {module: "lib", variable: true, export: true}, exclude: {module: "lib", variable: true, export: true}, drop: {module: "lib", variable: true, export: true}, quasiquote: {module: "lib", macro: function (form) {
  return(quasiexpand(form, 1));
}, export: true}, _g90: {module: "lib", variable: true}, "keys?": {module: "lib", variable: true, export: true}, target: {module: "lib", macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, variable: true, export: true}, "is?": {module: "lib", variable: true, export: true}, "can-unquote?": {module: "lib", variable: true}, "to-string": {module: "lib", variable: true, export: true}, across: {module: "lib", macro: function (_g221) {
  var l = _g221[0];
  var v = _g221[1];
  var i = _g221[2];
  var start = _g221[3];
  var body = unstash(sublist(arguments, 1));
  var _g222 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g222, [["inc", i]]))]]);
}, export: true}, reduce: {module: "lib", variable: true, export: true}, last: {module: "lib", variable: true, export: true}, _g109: {module: "lib", variable: true}, inc: {module: "lib", macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, export: true}, "let-symbol": {module: "lib", macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g223 = sub(body, 0);
  add(environment, {});
  var _g224 = (function () {
    map(function (_g225) {
      var name = _g225[0];
      var exp = _g225[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g223)));
  })();
  drop(environment);
  return(_g224);
}, export: true}, "<=": {module: "lib", variable: true, export: true}, hd: {module: "lib", variable: true, export: true}, "macro?": {module: "lib", variable: true}, _g101: {module: "lib", variable: true}, guard: {module: "lib", macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, export: true}, map: {module: "lib", variable: true, export: true}, pr: {module: "lib", macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, export: true}}, import: ["lib", "compiler"]}, compiler: {toplevel: {"compile-branch": {module: "compiler", variable: true}, "compile-id": {module: "compiler", variable: true}, terminator: {module: "compiler", variable: true}, getop: {module: "compiler", variable: true}, _g68: {module: "compiler", variable: true}, "if": {stmt: true, module: "compiler", tr: true, export: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g226 = form;
  while ((i < length(_g226))) {
    var condition = _g226[i];
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
}}, _g40: {module: "compiler", variable: true}, _g41: {module: "compiler", variable: true}, _g45: {module: "compiler", variable: true}, "%compile-module": {module: "compiler", variable: true}, _g44: {module: "compiler", variable: true}, "infix?": {module: "compiler", variable: true}, "quote-modules": {module: "compiler", variable: true, export: true}, _g27: {module: "compiler", variable: true}, "compile-call": {module: "compiler", variable: true}, _g38: {module: "compiler", variable: true}, _g50: {module: "compiler", variable: true}, "%local-function": {stmt: true, module: "compiler", tr: true, export: true, special: function (_g227) {
  var name = _g227[0];
  var args = _g227[1];
  var body = sub(_g227, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}}, "error": {module: "compiler", export: true, stmt: true, special: function (_g228) {
  var x = _g228[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}}, "module-path": {module: "compiler", variable: true}, "%function": {module: "compiler", export: true, special: function (_g229) {
  var args = _g229[0];
  var body = sub(_g229, 1);
  return(compile_function(args, body));
}}, "load-module": {module: "compiler", variable: true, export: true}, compiling: {module: "compiler", variable: true}, "quote-m0dules": {module: "compiler", variable: true, export: true}, _g69: {module: "compiler", variable: true}, "get": {module: "compiler", export: true, special: function (_g230) {
  var t = _g230[0];
  var k = _g230[1];
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
}}, "do": {stmt: true, module: "compiler", tr: true, export: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}}, "set": {module: "compiler", export: true, stmt: true, special: function (_g231) {
  var lh = _g231[0];
  var rh = _g231[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}}, module: {module: "compiler", variable: true}, _g32: {module: "compiler", variable: true}, indentation: {module: "compiler", variable: true}, "indent-level": {module: "compiler", variable: true}, "current-module": {module: "compiler", variable: true, export: true}, "valid-char?": {module: "compiler", variable: true}, _g71: {module: "compiler", variable: true}, "compile-function": {module: "compiler", variable: true}, "compile-atom": {module: "compiler", variable: true}, vm: {module: "compiler", variable: true}, _g48: {module: "compiler", variable: true}, "define-module": {module: "compiler", macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g232 = sub(body, 0);
  var imp = _g232.import;
  var exp = _g232.export;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp};
  var _g234 = 0;
  var _g233 = (exp || []);
  while ((_g234 < length(_g233))) {
    var k = _g233[_g234];
    setenv(k, {_stash: true, export: true});
    _g234 = (_g234 + 1);
  }
  return(undefined);
}, export: true}, "compile-infix": {module: "compiler", variable: true}, "%for": {stmt: true, module: "compiler", tr: true, export: true, special: function (_g235) {
  var _g236 = _g235[0];
  var t = _g236[0];
  var k = _g236[1];
  var body = sub(_g235, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g237 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g237);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}}, _g46: {module: "compiler", variable: true}, "%global-function": {stmt: true, module: "compiler", tr: true, export: true, special: function (_g238) {
  var name = _g238[0];
  var args = _g238[1];
  var body = sub(_g238, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}}, "while": {stmt: true, module: "compiler", tr: true, export: true, special: function (_g239) {
  var condition = _g239[0];
  var body = sub(_g239, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g240 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g240);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}}, "%local": {module: "compiler", export: true, stmt: true, special: function (_g241) {
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
}}, "%object": {module: "compiler", export: true, special: function (forms) {
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
  var _g242 = pairs;
  while ((i < length(_g242))) {
    var _g243 = _g242[i];
    var k = _g243[0];
    var v = _g243[1];
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
}}, "compile-module": {module: "compiler", variable: true, export: true}, _g22: {module: "compiler", variable: true}, _g36: {module: "compiler", variable: true}, "compile-args": {module: "compiler", variable: true}, "in-module": {module: "compiler", variable: true, export: true}, "quote-binding": {module: "compiler", variable: true}, "compile-toplevel": {module: "compiler", variable: true, export: true}, "not": {module: "compiler", export: true, special: function (_g244) {
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
}}, _g52: {module: "compiler", variable: true}, _g26: {module: "compiler", variable: true}, "open-m0dule": {module: "compiler", variable: true, export: true}, "compile-file": {module: "compiler", variable: true}, _g39: {module: "compiler", variable: true}, "%try": {stmt: true, module: "compiler", tr: true, export: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g245 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g245);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g246 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g246);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}}, "compile-special": {module: "compiler", variable: true}, "break": {module: "compiler", export: true, stmt: true, special: function (_g6) {
  return((indentation() + "break"));
}}, "open-module": {module: "compiler", variable: true, export: true}, _g54: {module: "compiler", variable: true}, "module-key": {module: "compiler", variable: true}, "compiler-output": {module: "compiler", variable: true, export: true}, compile: {module: "compiler", variable: true, export: true}, "can-return?": {module: "compiler", variable: true}, _g42: {module: "compiler", variable: true}, "compile-body": {module: "compiler", variable: true}, "valid-id?": {module: "compiler", variable: true}, "quote-module": {module: "compiler", variable: true}, infix: {module: "compiler", variable: true}, run: {module: "compiler", variable: true}, _g18: {module: "compiler", variable: true}, "quote-frame": {module: "compiler", variable: true}, _g23: {module: "compiler", variable: true}, _g19: {module: "compiler", variable: true}, _g20: {module: "compiler", variable: true}, "compiling?": {module: "compiler", variable: true}, "initial-environment": {module: "compiler", variable: true}, "return": {module: "compiler", export: true, stmt: true, special: function (_g247) {
  var x = _g247[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}}, _g31: {module: "compiler", variable: true}, _g33: {module: "compiler", variable: true}, _g70: {module: "compiler", variable: true}, eval: {module: "compiler", variable: true, export: true}, "with-indent": {module: "compiler", macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, export: true}, "%array": {module: "compiler", export: true, special: function (forms) {
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
  var _g248 = forms;
  while ((i < length(_g248))) {
    var x = _g248[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}}, "quote-environment": {module: "compiler", variable: true, export: true}, "recompile?": {module: "compiler", variable: true}, "numeric?": {module: "compiler", variable: true}}, import: ["reader", "lib", "compiler"]}, boot: {toplevel: {}, import: ["lib", "compiler"]}, reader: {toplevel: {"read-all": {module: "reader", variable: true, export: true}, _g187: {module: "reader", variable: true}, "skip-non-code": {module: "reader", variable: true}, eof: {module: "reader", variable: true}, whitespace: {module: "reader", variable: true}, "flag?": {module: "reader", variable: true}, "peek-char": {module: "reader", variable: true}, delimiters: {module: "reader", variable: true}, "read-char": {module: "reader", variable: true}, "key?": {module: "reader", variable: true}, "read-from-string": {module: "reader", variable: true, export: true}, read: {module: "reader", variable: true, export: true}, "define-reader": {module: "reader", macro: function (_g249) {
  var char = _g249[0];
  var stream = _g249[1];
  var body = unstash(sublist(arguments, 1));
  var _g250 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g250)]);
}, export: true}, "read-table": {module: "reader", variable: true}, "make-stream": {module: "reader", variable: true, export: true}}, import: ["lib", "compiler"]}};
environment = [{"define-module": {module: "compiler", macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g251 = sub(body, 0);
  var imp = _g251.import;
  var exp = _g251.export;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp};
  var _g253 = 0;
  var _g252 = (exp || []);
  while ((_g253 < length(_g252))) {
    var k = _g252[_g253];
    setenv(k, {_stash: true, export: true});
    _g253 = (_g253 + 1);
  }
  return(undefined);
}, export: true}}];
rep = function (str) {
  var _g254 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g256) {
      return([false, _g256]);
    }
  })();
  var _g1 = _g254[0];
  var x = _g254[1];
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
  var _g255 = args;
  while ((i < length(_g255))) {
    var arg = _g255[i];
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
