infix = {lua: {"~=": true, "=": "==", "and": true, "or": true, "cat": ".."}, common: {"<=": true, "+": true, "<": true, "-": true, ">": true, "/": true, "%": true, "*": true, ">=": true}, js: {"~=": "!=", "=": "===", "and": "&&", "or": "||", "cat": "+"}};
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
  var _g10 = args;
  while ((i < length(_g10))) {
    var arg = _g10[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g11 = unstash(sublist(arguments, 1));
  var tail63 = _g11["tail?"];
  var str = "";
  var i = 0;
  var _g12 = forms;
  while ((i < length(_g12))) {
    var x = _g12[i];
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
compile_infix = function (_g13) {
  var op = _g13[0];
  var args = sub(_g13, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g14 = args;
  while ((i < length(_g14))) {
    var arg = _g14[i];
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
  var _g15 = (function () {
    indent_level = (indent_level + 1);
    var _g16 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g16);
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
    return((ind + "if (" + cond1 + ") {\n" + _g15 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g15 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g15 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g15 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g15 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g15 + tr));
  }
};
compile_function = function (args, body) {
  var _g17 = unstash(sublist(arguments, 2));
  var name = _g17.name;
  var prefix = _g17.prefix;
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
    var _g18 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g18);
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
  var _g19 = getenv(hd(form));
  var self_tr63 = _g19.tr;
  var stmt = _g19.stmt;
  var special = _g19.special;
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
  var _g63 = unstash(sublist(arguments, 1));
  var stmt63 = _g63["stmt?"];
  var tail63 = _g63["tail?"];
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
  var compiled = compile_file(file);
  module = mod0;
  environment = env0;
  modules[k] = hd(env1);
  if (compiling63) {
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
exported63 = function (m, x) {
  return((x.export && (m === x.module)));
};
open_module = function (spec) {
  var m = to_string(spec);
  var toplevel = hd(environment);
  var k = undefined;
  var _g64 = modules[m];
  for (k in _g64) {
    if (isNaN(parseInt(k))) {
      var v = _g64[k];
      if (exported63(m, v)) {
        toplevel[k] = v;
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
quote_frame = function (frame) {
  return(join(["table"], mapt(function (_g8, x) {
    return(join(["table"], quote_binding(x)));
  }, frame)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (k, m) {
  return(join(["%object"], mapo(function (_g9, x) {
    if (exported63(k, x)) {
      return(join(["table"], quote_binding(x)));
    }
  }, m)));
};
quote_modules = function () {
  return(join(["table"], mapt(quote_module, modules)));
};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
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
    var _g125 = args;
    for (k in _g125) {
      if (isNaN(parseInt(k))) {
        var v = _g125[k];
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
    var _g126 = args;
    for (k in _g126) {
      if (isNaN(parseInt(k))) {
        var v = _g126[k];
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
      var _g127 = l;
      for (k in _g127) {
        if (isNaN(parseInt(k))) {
          var v = _g127[k];
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
    var _g129 = 0;
    var _g128 = args;
    while ((_g129 < length(_g128))) {
      var arg = _g128[_g129];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g129 = (_g129 + 1);
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
    var _g130 = lh;
    while ((i < length(_g130))) {
      var x = _g130[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g131 = lh;
    for (k in _g131) {
      if (isNaN(parseInt(k))) {
        var v = _g131[k];
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
      var _g132 = form[1];
      var t = _g132[0];
      var k = _g132[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
      var args = form[1];
      var _g133 = sub(form, 2);
      add(environment, {});
      var _g135 = (function () {
        var _g137 = 0;
        var _g136 = args;
        while ((_g137 < length(_g136))) {
          var _g134 = _g136[_g137];
          setenv(_g134, {_stash: true, variable: true});
          _g137 = (_g137 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g133)));
      })();
      drop(environment);
      return(_g135);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g5 = form[0];
      var name = form[1];
      var _g138 = form[2];
      var _g139 = sub(form, 3);
      add(environment, {});
      var _g141 = (function () {
        var _g143 = 0;
        var _g142 = _g138;
        while ((_g143 < length(_g142))) {
          var _g140 = _g142[_g143];
          setenv(_g140, {_stash: true, variable: true});
          _g143 = (_g143 + 1);
        }
        return(join([x, name, map42(macroexpand, _g138)], macroexpand(_g139)));
      })();
      drop(environment);
      return(_g141);
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
  var _g144 = form;
  for (k in _g144) {
    if (isNaN(parseInt(k))) {
      var v = _g144[k];
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
  var _g146 = 0;
  var _g145 = form;
  while ((_g146 < length(_g145))) {
    var x = _g145[_g146];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g146 = (_g146 + 1);
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
  var _g147 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g147, upto));
  } else {
    var l = sublist(x, _g147, upto);
    var k = undefined;
    var _g148 = x;
    for (k in _g148) {
      if (isNaN(parseInt(k))) {
        var v = _g148[k];
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
    var _g149 = l1;
    for (k in _g149) {
      if (isNaN(parseInt(k))) {
        var v = _g149[k];
        l[k] = v;
      }
    }
    var _g151 = undefined;
    var _g150 = l2;
    for (_g151 in _g150) {
      if (isNaN(parseInt(_g151))) {
        var v = _g150[_g151];
        l[_g151] = v;
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
  var _g153 = 0;
  var _g152 = l;
  while ((_g153 < length(_g152))) {
    var x = _g152[_g153];
    if (f(x)) {
      add(l1, x);
    }
    _g153 = (_g153 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g155 = 0;
  var _g154 = l;
  while ((_g155 < length(_g154))) {
    var x = _g154[_g155];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g155 = (_g155 + 1);
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
  var _g165 = 0;
  var _g164 = l;
  while ((_g165 < length(_g164))) {
    var x = _g164[_g165];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g165 = (_g165 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g166 = t;
  for (k in _g166) {
    if (isNaN(parseInt(k))) {
      var v = _g166[k];
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
  var _g167 = t;
  for (k in _g167) {
    if (isNaN(parseInt(k))) {
      var v = _g167[k];
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
  var _g168 = t;
  for (k in _g168) {
    if (isNaN(parseInt(k))) {
      var v = _g168[k];
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
  var _g169 = t;
  for (k in _g169) {
    if (isNaN(parseInt(k))) {
      var v = _g169[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g170 = sub(xs, 0);
  return(join(t, _g170));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g171 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g172 = t;
  for (k in _g172) {
    if (isNaN(parseInt(k))) {
      var v = _g172[k];
      if (!(_g171[k])) {
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
  var _g173 = sub(xs, 0);
  if (empty63(_g173)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g173));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g176 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g176));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g177 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g177)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g178 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g178));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g179 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g179)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g180 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g180)));
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
    var _g181 = x;
    for (k in _g181) {
      if (isNaN(parseInt(k))) {
        var v = _g181[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g182 = x1;
    while ((i < length(_g182))) {
      var y = _g182[i];
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
  var _g183 = stash(args);
  return((f.apply)(f, _g183));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {";": true, ")": true, "(": true, "\n": true};
whitespace = {" ": true, "\t": true, "\n": true};
make_stream = function (str) {
  return({len: length(str), pos: 0, string: str});
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
modules = {compiler: {"not": {special: function (_g187) {
  var x = _g187[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, module: "compiler", export: true}, "%local": {export: true, stmt: true, module: "compiler", special: function (_g188) {
  var name = _g188[0];
  var value = _g188[1];
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
}}, "%function": {special: function (_g189) {
  var args = _g189[0];
  var body = sub(_g189, 1);
  return(compile_function(args, body));
}, module: "compiler", export: true}, "%try": {tr: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g190 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g190);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g191 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g191);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true, module: "compiler", export: true}, "compile-module": {variable: true, module: "compiler", export: true}, "compile-toplevel": {variable: true, module: "compiler", export: true}, "%global-function": {tr: true, special: function (_g192) {
  var name = _g192[0];
  var args = _g192[1];
  var body = sub(_g192, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, stmt: true, module: "compiler", export: true}, "quote-modules": {variable: true, module: "compiler", export: true}, "open-module": {variable: true, module: "compiler", export: true}, "define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g193 = sub(body, 0);
  var exp = _g193.export;
  var imp = _g193.import;
  map(load_module, imp);
  var k = undefined;
  var _g194 = (exp || []);
  for (k in _g194) {
    if (isNaN(parseInt(k))) {
      var _g7 = _g194[k];
      setenv(k, {_stash: true, export: true});
    }
  }
  return(undefined);
}, module: "compiler", export: true}, "error": {export: true, stmt: true, module: "compiler", special: function (_g195) {
  var x = _g195[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}}, "%local-function": {tr: true, special: function (_g196) {
  var name = _g196[0];
  var args = _g196[1];
  var body = sub(_g196, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, stmt: true, module: "compiler", export: true}, "set": {export: true, stmt: true, module: "compiler", special: function (_g197) {
  var lh = _g197[0];
  var rh = _g197[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}}, "break": {export: true, stmt: true, module: "compiler", special: function (_g6) {
  return((indentation() + "break"));
}}, "if": {tr: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g198 = form;
  while ((i < length(_g198))) {
    var condition = _g198[i];
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
}, stmt: true, module: "compiler", export: true}, compile: {variable: true, module: "compiler", export: true}, "%for": {tr: true, special: function (_g199) {
  var _g200 = _g199[0];
  var t = _g200[0];
  var k = _g200[1];
  var body = sub(_g199, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g201 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g201);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, module: "compiler", export: true}, eval: {variable: true, module: "compiler", export: true}, "while": {tr: true, special: function (_g202) {
  var condition = _g202[0];
  var body = sub(_g202, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g203 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g203);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, module: "compiler", export: true}, "get": {special: function (_g204) {
  var t = _g204[0];
  var k = _g204[1];
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
}, module: "compiler", export: true}, "%array": {special: function (forms) {
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
  var _g205 = forms;
  while ((i < length(_g205))) {
    var x = _g205[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}, module: "compiler", export: true}, "quote-environment": {variable: true, module: "compiler", export: true}, "with-module": {macro: function (k) {
  var body = unstash(sublist(arguments, 1));
  var _g206 = sub(body, 0);
  var env0 = make_id();
  var env1 = make_id();
  var x = make_id();
  return(["let", [env0, "environment", env1, ["list", ["get", "modules", k], ["tl", "environment"]]], ["set", "environment", env1], ["let", [x, join(["do"], _g206)], ["set", "environment", env0], x]]);
}, module: "compiler", export: true}, "with-indent": {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, module: "compiler", export: true}, "return": {export: true, stmt: true, module: "compiler", special: function (_g207) {
  var x = _g207[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}}, "do": {tr: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true, module: "compiler", export: true}, "compiler-output": {variable: true, module: "compiler", export: true}, "%object": {special: function (forms) {
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
  var _g208 = pairs;
  while ((i < length(_g208))) {
    var _g209 = _g208[i];
    var k = _g209[0];
    var v = _g209[1];
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
}, module: "compiler", export: true}, "load-module": {variable: true, module: "compiler", export: true}}, lib: {quoted: {variable: true, module: "lib", export: true}, pairwise: {variable: true, module: "lib", export: true}, "map*": {variable: true, module: "lib", export: true}, "nil?": {variable: true, module: "lib", export: true}, pr: {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, module: "lib", export: true}, exit: {variable: true, module: "lib", export: true}, mapt: {variable: true, module: "lib", export: true}, reverse: {variable: true, module: "lib", export: true}, macroexpand: {variable: true, module: "lib", export: true}, "special?": {variable: true, module: "lib", export: true}, "define-macro": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g210 = sub(body, 0);
  var form = join(["fn", args], _g210);
  eval((function () {
    var _g211 = ["setenv", ["quote", name]];
    _g211.macro = form;
    _g211.form = ["quote", form];
    return(_g211);
  })());
  return(undefined);
}, module: "lib", export: true}, "<=": {variable: true, module: "lib", export: true}, getenv: {variable: true, module: "lib", export: true}, ">=": {variable: true, module: "lib", export: true}, "is?": {variable: true, module: "lib", export: true}, type: {variable: true, module: "lib", export: true}, setenv: {variable: true, module: "lib", export: true}, "table?": {variable: true, module: "lib", export: true}, "write-file": {variable: true, module: "lib", export: true}, "*": {variable: true, module: "lib", export: true}, "+": {variable: true, module: "lib", export: true}, "-": {variable: true, module: "lib", export: true}, list: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g212 = body;
    for (k in _g212) {
      if (isNaN(parseInt(k))) {
        var v = _g212[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, module: "lib", export: true}, "/": {variable: true, module: "lib", export: true}, guard: {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, module: "lib", export: true}, "cat!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g213 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g213)]);
}, module: "lib", export: true}, find: {variable: true, module: "lib", export: true}, exclude: {variable: true, module: "lib", export: true}, last: {variable: true, module: "lib", export: true}, "string-literal?": {variable: true, module: "lib", export: true}, sub: {variable: true, module: "lib", export: true}, "define-local": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g214 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g214))) {
    var _g215 = bind_arguments(x, _g214);
    var args = _g215[0];
    var _g216 = _g215[1];
    return(join(["%local-function", name, args], _g216));
  } else {
    return(["%local", name, x]);
  }
}, module: "lib", export: true}, reduce: {variable: true, module: "lib", export: true}, "empty?": {variable: true, module: "lib", export: true}, "stash*": {variable: true, module: "lib", export: true}, "define-special": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g217 = sub(body, 0);
  var form = join(["fn", args], _g217);
  var keys = sub(_g217, length(_g217));
  eval(join((function () {
    var _g218 = ["setenv", ["quote", name]];
    _g218.form = ["quote", form];
    _g218.special = form;
    return(_g218);
  })(), keys));
  return(undefined);
}, module: "lib", export: true}, split: {variable: true, module: "lib", export: true}, define: {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g219 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g219));
}, module: "lib", export: true}, dec: {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, module: "lib", export: true}, "composite?": {variable: true, module: "lib", export: true}, "keys?": {variable: true, module: "lib", export: true}, "cat": {variable: true, module: "lib", export: true}, "parse-number": {variable: true, module: "lib", export: true}, target: {module: "lib", variable: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, export: true}, iterate: {variable: true, module: "lib", export: true}, "define-symbol": {macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, module: "lib", export: true}, "read-file": {variable: true, module: "lib", export: true}, map: {variable: true, module: "lib", export: true}, across: {macro: function (_g220) {
  var l = _g220[0];
  var v = _g220[1];
  var i = _g220[2];
  var start = _g220[3];
  var body = unstash(sublist(arguments, 1));
  var _g221 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g221, [["inc", i]]))]]);
}, module: "lib", export: true}, extend: {variable: true, module: "lib", export: true}, apply: {variable: true, module: "lib", export: true}, "number?": {variable: true, module: "lib", export: true}, inner: {variable: true, module: "lib", export: true}, "with-frame": {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, module: "lib", export: true}, fn: {macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g222 = sub(body, 0);
  var _g223 = bind_arguments(args, _g222);
  var args = _g223[0];
  var _g224 = _g223[1];
  return(join(["%function", args], _g224));
}, module: "lib", export: true}, join: {variable: true, module: "lib", export: true}, search: {variable: true, module: "lib", export: true}, "string?": {variable: true, module: "lib", export: true}, "make-id": {variable: true, module: "lib", export: true}, "<": {variable: true, module: "lib", export: true}, "=": {variable: true, module: "lib", export: true}, ">": {variable: true, module: "lib", export: true}, drop: {variable: true, module: "lib", export: true}, "function?": {variable: true, module: "lib", export: true}, "with-bindings": {macro: function (_g225) {
  var names = _g225[0];
  var body = unstash(sublist(arguments, 1));
  var _g226 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g227 = ["setenv", x];
    _g227.variable = true;
    return(_g227);
  })()]], _g226));
}, module: "lib", export: true}, "let-macro": {macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g228 = sub(body, 0);
  add(environment, {});
  var _g229 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g228)));
  })();
  drop(environment);
  return(_g229);
}, module: "lib", export: true}, "let-symbol": {macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g230 = sub(body, 0);
  add(environment, {});
  var _g231 = (function () {
    map(function (_g232) {
      var name = _g232[0];
      var exp = _g232[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g230)));
  })();
  drop(environment);
  return(_g231);
}, module: "lib", export: true}, add: {variable: true, module: "lib", export: true}, write: {variable: true, module: "lib", export: true}, mapo: {variable: true, module: "lib", export: true}, unstash: {variable: true, module: "lib", export: true}, inc: {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, module: "lib", export: true}, "set-of": {macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g234 = 0;
  var _g233 = elements;
  while ((_g234 < length(_g233))) {
    var e = _g233[_g234];
    l[e] = true;
    _g234 = (_g234 + 1);
  }
  return(join(["table"], l));
}, module: "lib", export: true}, quasiquote: {macro: function (form) {
  return(quasiexpand(form, 1));
}, module: "lib", export: true}, "join!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g235 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g235)]);
}, module: "lib", export: true}, print: {variable: true, module: "lib", export: true}, "id-literal?": {variable: true, module: "lib", export: true}, "atom?": {variable: true, module: "lib", export: true}, "list?": {variable: true, module: "lib", export: true}, at: {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, module: "lib", export: true}, "list*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g236 = xs;
    while ((i < length(_g236))) {
      var x = _g236[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, module: "lib", export: true}, char: {variable: true, module: "lib", export: true}, table: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}, module: "lib", export: true}, "to-string": {variable: true, module: "lib", export: true}, length: {variable: true, module: "lib", export: true}, let: {macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g237 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g238) {
    var lh = _g238[0];
    var rh = _g238[1];
    var _g240 = 0;
    var _g239 = bind(lh, rh);
    while ((_g240 < length(_g239))) {
      var _g241 = _g239[_g240];
      var id = _g241[0];
      var val = _g241[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g240 = (_g240 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g237)])));
}, module: "lib", export: true}, splice: {variable: true, module: "lib", export: true}, keep: {variable: true, module: "lib", export: true}, replicate: {variable: true, module: "lib", export: true}, "boolean?": {variable: true, module: "lib", export: true}, each: {macro: function (_g242) {
  var t = _g242[0];
  var k = _g242[1];
  var v = _g242[2];
  var body = unstash(sublist(arguments, 1));
  var _g243 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g244 = ["target"];
    _g244.lua = ["not", ["number?", k]];
    _g244.js = ["isNaN", ["parseInt", k]];
    return(_g244);
  })(), join(["let", [v, ["get", t1, k]]], _g243)]]]);
}, module: "lib", export: true}, "join*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, module: "lib", export: true}, quote: {macro: function (form) {
  return(quoted(form));
}, module: "lib", export: true}, "%": {variable: true, module: "lib", export: true}, "special-form?": {variable: true, module: "lib", export: true}, language: {macro: function () {
  return(["quote", target]);
}, module: "lib", export: true}, hd: {variable: true, module: "lib", export: true}, tl: {variable: true, module: "lib", export: true}, code: {variable: true, module: "lib", export: true}, "define-global": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g245 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g245))) {
    var _g246 = bind_arguments(x, _g245);
    var args = _g246[0];
    var _g247 = _g246[1];
    return(join(["%global-function", name, args], _g247));
  } else {
    return(["set", name, x]);
  }
}, module: "lib", export: true}}, main: {}, reader: {}};
environment = [{"define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g248 = sub(body, 0);
  var exp = _g248.export;
  var imp = _g248.import;
  map(load_module, imp);
  var k = undefined;
  var _g249 = (exp || []);
  for (k in _g249) {
    if (isNaN(parseInt(k))) {
      var _g7 = _g249[k];
      setenv(k, {_stash: true, export: true});
    }
  }
  return(undefined);
}, module: "compiler", export: true}}];
rep = function (str) {
  var _g250 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g255) {
      return([false, _g255]);
    }
  })();
  var _g1 = _g250[0];
  var x = _g250[1];
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
  var _g251 = args;
  while ((i < length(_g251))) {
    var arg = _g251[i];
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
    var _g252 = environment;
    var _g253 = [modules[module], tl(environment)];
    environment = _g253;
    var _g254 = (function () {
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    })();
    environment = _g252;
    return(_g254);
  }
};
main();
