delimiters = {")": true, "(": true, ";": true, "\n": true};
whitespace = {"\t": true, "\n": true, " ": true};
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
infix = {lua: {"cat": "..", "or": true, "and": true, "=": "==", "~=": true}, common: {"*": true, "+": true, ">": true, "/": true, "<": true, "-": true, "<=": true, "%": true, ">=": true}, js: {"cat": "+", "or": "||", "and": "&&", "=": "===", "~=": "!="}};
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
  var _g10 = unstash(sub(arguments, 1));
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
  var _g16 = unstash(sub(arguments, 2));
  var prefix = _g16.prefix;
  var name = _g16.name;
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
  var self_tr63 = _g18.tr;
  var stmt = _g18.stmt;
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
  var _g62 = unstash(sub(arguments, 1));
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
modules = {};
exports = {};
loading = {};
compiler_output = undefined;
save_env63 = false;
compiling63 = false;
quote_binding = function (x) {
  if (is63(x.symbol)) {
    var _g63 = ["table"];
    _g63.symbol = ["quote", x.symbol];
    return(_g63);
  } else if ((x.macro && x.form)) {
    var _g64 = ["table"];
    _g64.macro = x.form;
    return(_g64);
  } else if ((x.special && x.form)) {
    var tr = x.tr;
    var stmt = x.stmt;
    var _g65 = ["table"];
    _g65.special = x.form;
    _g65.tr = tr;
    _g65.stmt = stmt;
    return(_g65);
  }
};
save_environment = function () {
  var env = ["define", "environment", ["list", ["table"]]];
  var toplevel = hd(environment);
  compiler_output = (compiler_output + compile_toplevel(env));
  var k = undefined;
  var _g66 = map42(quote_binding, toplevel);
  for (k in _g66) {
    if (isNaN(parseInt(k))) {
      var v = _g66[k];
      var x = compile_toplevel(["setenv", ["quote", k], v]);
      compiler_output = (compiler_output + x);
    }
  }
  var _g68 = undefined;
  var _g67 = modules;
  for (_g68 in _g67) {
    if (isNaN(parseInt(_g68))) {
      var v = _g67[_g68];
      var x = compile_toplevel(["set", ["get", "modules", ["quote", _g68]], true]);
      compiler_output = (compiler_output + x);
    }
  }
};
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  return(compile_toplevel(join(["do"], body)));
};
load_module = function (spec) {
  var k = to_string(spec);
  if (list63(spec)) {
    throw "Unsupported module specification";
  } else if (loading[k]) {
    return(undefined);
  } else if ((!(compiling63) && modules[k])) {
    return(undefined);
  } else {
    var file = (k + ".l");
    var frame = {};
    loading[k] = true;
    add(environment, frame);
    var module = {};
    var compiled = compile_file(file);
    drop(environment);
    var x = undefined;
    var _g69 = frame;
    for (x in _g69) {
      if (isNaN(parseInt(x))) {
        var v = _g69[x];
        if (!(v.variable)) {
          module[x] = v;
        }
      }
    }
    var _g71 = undefined;
    var _g70 = module;
    for (_g71 in _g70) {
      if (isNaN(parseInt(_g71))) {
        var v = _g70[_g71];
        setenv(_g71, v);
      }
    }
    modules[k] = module;
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
};
compile_module = function (spec) {
  compiling63 = true;
  compiler_output = "";
  load_module(spec);
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
    var _g121 = args;
    for (k in _g121) {
      if (isNaN(parseInt(k))) {
        var v = _g121[k];
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
    var _g122 = args;
    for (k in _g122) {
      if (isNaN(parseInt(k))) {
        var v = _g122[k];
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
      var _g123 = l;
      for (k in _g123) {
        if (isNaN(parseInt(k))) {
          var v = _g123[k];
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
    var _g125 = 0;
    var _g124 = args;
    while ((_g125 < length(_g124))) {
      var arg = _g124[_g125];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g125 = (_g125 + 1);
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
    var _g126 = lh;
    while ((i < length(_g126))) {
      var x = _g126[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g127 = lh;
    for (k in _g127) {
      if (isNaN(parseInt(k))) {
        var v = _g127[k];
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
      var _g128 = form[1];
      var t = _g128[0];
      var k = _g128[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g3 = form[0];
      var args = form[1];
      var _g129 = sub(form, 2);
      add(environment, {});
      var _g131 = (function () {
        var _g133 = 0;
        var _g132 = args;
        while ((_g133 < length(_g132))) {
          var _g130 = _g132[_g133];
          setenv42(_g130, pending);
          _g133 = (_g133 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g129)));
      })();
      drop(environment);
      return(_g131);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g4 = form[0];
      var name = form[1];
      var _g134 = form[2];
      var _g135 = sub(form, 3);
      add(environment, {});
      var _g137 = (function () {
        var _g139 = 0;
        var _g138 = _g134;
        while ((_g139 < length(_g138))) {
          var _g136 = _g138[_g139];
          setenv42(_g136, pending);
          _g139 = (_g139 + 1);
        }
        return(join([x, name, map42(macroexpand, _g134)], macroexpand(_g135)));
      })();
      drop(environment);
      return(_g137);
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
  var _g140 = form;
  for (k in _g140) {
    if (isNaN(parseInt(k))) {
      var v = _g140[k];
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
  var _g142 = 0;
  var _g141 = form;
  while ((_g142 < length(_g141))) {
    var x = _g141[_g142];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g142 = (_g142 + 1);
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
  var _g143 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g143, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g143, upto);
    var k = undefined;
    var _g144 = x;
    for (k in _g144) {
      if (isNaN(parseInt(k))) {
        var v = _g144[k];
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
    var _g145 = l1;
    for (k in _g145) {
      if (isNaN(parseInt(k))) {
        var v = _g145[k];
        l[k] = v;
      }
    }
    var _g147 = undefined;
    var _g146 = l2;
    for (_g147 in _g146) {
      if (isNaN(parseInt(_g147))) {
        var v = _g146[_g147];
        l[_g147] = v;
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
  var _g149 = 0;
  var _g148 = l;
  while ((_g149 < length(_g148))) {
    var x = _g148[_g149];
    if (f(x)) {
      add(l1, x);
    }
    _g149 = (_g149 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g151 = 0;
  var _g150 = l;
  while ((_g151 < length(_g150))) {
    var x = _g150[_g151];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g151 = (_g151 + 1);
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
  var _g161 = 0;
  var _g160 = l;
  while ((_g161 < length(_g160))) {
    var x = _g160[_g161];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g161 = (_g161 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g162 = t;
  for (k in _g162) {
    if (isNaN(parseInt(k))) {
      var v = _g162[k];
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
  var _g163 = t;
  for (k in _g163) {
    if (isNaN(parseInt(k))) {
      var v = _g163[k];
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
  var _g164 = sub(xs, 0);
  if (empty63(_g164)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g164));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g167 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g167));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g168 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g168)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g169 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g169));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g170 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g170)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g171 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g171)));
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
    var _g172 = x;
    for (k in _g172) {
      if (isNaN(parseInt(k))) {
        var v = _g172[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g173 = x1;
    while ((i < length(_g173))) {
      var y = _g173[i];
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
  var _g174 = stash(args);
  return((f.apply)(f, _g174));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
rep = function (str) {
  var _g175 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g177) {
      return([false, _g177]);
    }
  })();
  var _g1 = _g175[0];
  var x = _g175[1];
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
  var _g176 = args;
  while ((i < length(_g176))) {
    var arg = _g176[i];
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
setenv("define-macro", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g178 = sub(body, 0);
  var form = join(["fn", args], _g178);
  var value = (function () {
    var _g179 = ["table"];
    _g179.form = ["quote", form];
    _g179.macro = form;
    return(_g179);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("across", {macro: function (_g180) {
  var l = _g180[0];
  var v = _g180[1];
  var i = _g180[2];
  var start = _g180[3];
  var body = unstash(sub(arguments, 1));
  var _g181 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g181, [["inc", i]]))]]);
}});
setenv("with-indent", {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
setenv("define-module", {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g182 = sub(body, 0);
  var exp = _g182.export;
  var imp = _g182.import;
  map(load_module, imp);
  exports = (exp || {});
  return(undefined);
}});
setenv("%function", {special: function (_g183) {
  var args = _g183[0];
  var body = sub(_g183, 1);
  return(compile_function(args, body));
}});
setenv("fn", {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g184 = sub(body, 0);
  var _g185 = bind_arguments(args, _g184);
  var args = _g185[0];
  var _g186 = _g185[1];
  return(join(["%function", args], _g186));
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
  var _g187 = pairs;
  while ((i < length(_g187))) {
    var _g188 = _g187[i];
    var k = _g188[0];
    var v = _g188[1];
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
setenv("set", {stmt: true, special: function (_g189) {
  var lh = _g189[0];
  var rh = _g189[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}});
setenv("quote", {macro: function (form) {
  return(quoted(form));
}});
setenv("language", {macro: function () {
  return(["quote", target]);
}});
setenv("%for", {special: function (_g190) {
  var _g191 = _g190[0];
  var t = _g191[0];
  var k = _g191[1];
  var body = sub(_g190, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g192 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g192);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true});
setenv("cat!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g193 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g193)]);
}});
setenv("quasiquote", {macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("return", {stmt: true, special: function (_g194) {
  var x = _g194[0];
  return((indentation() + compile_call(["return", x])));
}});
setenv("let-macro", {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g195 = sub(body, 0);
  add(environment, {});
  var _g196 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g195)));
  })();
  drop(environment);
  return(_g196);
}});
setenv("get", {special: function (_g197) {
  var t = _g197[0];
  var k = _g197[1];
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
setenv("define-symbol", {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}});
setenv("list*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
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
}});
setenv("error", {stmt: true, special: function (_g199) {
  var x = _g199[0];
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
  var _g200 = form;
  while ((i < length(_g200))) {
    var condition = _g200[i];
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
setenv("set-of", {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g202 = 0;
  var _g201 = elements;
  while ((_g202 < length(_g201))) {
    var e = _g201[_g202];
    l[e] = true;
    _g202 = (_g202 + 1);
  }
  return(join(["table"], l));
}});
setenv("pr", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}});
setenv("each", {macro: function (_g203) {
  var t = _g203[0];
  var k = _g203[1];
  var v = _g203[2];
  var body = unstash(sub(arguments, 1));
  var _g204 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g205 = ["target"];
    _g205.lua = ["not", ["number?", k]];
    _g205.js = ["isNaN", ["parseInt", k]];
    return(_g205);
  })(), join(["let", [v, ["get", t1, k]]], _g204)]]]);
}});
setenv("let-symbol", {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g206 = sub(body, 0);
  add(environment, {});
  var _g207 = (function () {
    map(function (_g208) {
      var name = _g208[0];
      var exp = _g208[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g206)));
  })();
  drop(environment);
  return(_g207);
}});
setenv("%try", {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g209 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g209);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g210 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g210);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true});
setenv("break", {stmt: true, special: function (_g5) {
  return((indentation() + "break"));
}});
setenv("inc", {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}});
setenv("dec", {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}});
setenv("do", {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true});
setenv("define-special", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g211 = sub(body, 0);
  var form = join(["fn", args], _g211);
  var value = join((function () {
    var _g212 = ["table"];
    _g212.form = ["quote", form];
    _g212.special = form;
    return(_g212);
  })(), _g211);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("table", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g213 = body;
  for (k in _g213) {
    if (isNaN(parseInt(k))) {
      var v = _g213[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}});
setenv("define", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g214 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g214));
}});
setenv("%local", {stmt: true, special: function (_g215) {
  var name = _g215[0];
  var value = _g215[1];
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
setenv("define-reader", {macro: function (_g216) {
  var char = _g216[0];
  var stream = _g216[1];
  var body = unstash(sub(arguments, 1));
  var _g217 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g217)]);
}});
setenv("join*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}});
setenv("at", {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
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
    var _g218 = body;
    for (k in _g218) {
      if (isNaN(parseInt(k))) {
        var v = _g218[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}});
setenv("%local-function", {special: function (_g219) {
  var name = _g219[0];
  var args = _g219[1];
  var body = sub(_g219, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true});
setenv("while", {special: function (_g220) {
  var condition = _g220[0];
  var body = sub(_g220, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g221 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g221);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true});
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
  var _g222 = forms;
  while ((i < length(_g222))) {
    var x = _g222[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}});
setenv("not", {special: function (_g223) {
  var x = _g223[0];
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
setenv("target", {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}});
setenv("%global-function", {special: function (_g224) {
  var name = _g224[0];
  var args = _g224[1];
  var body = sub(_g224, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true});
setenv("define-local", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g225 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g225))) {
    var _g226 = bind_arguments(x, _g225);
    var args = _g226[0];
    var _g227 = _g226[1];
    return(join(["%local-function", name, args], _g227));
  } else {
    return(["%local", name, x]);
  }
}});
setenv("with-bindings", {macro: function (_g228) {
  var names = _g228[0];
  var body = unstash(sub(arguments, 1));
  var _g229 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g229));
}});
setenv("with-frame", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("let", {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g230 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g231) {
    var lh = _g231[0];
    var rh = _g231[1];
    var _g233 = 0;
    var _g232 = bind(lh, rh);
    while ((_g233 < length(_g232))) {
      var _g234 = _g232[_g233];
      var id = _g234[0];
      var val = _g234[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g233 = (_g233 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g230)])));
}});
setenv("define-global", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g235 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g235))) {
    var _g236 = bind_arguments(x, _g235);
    var args = _g236[0];
    var _g237 = _g236[1];
    return(join(["%global-function", name, args], _g237));
  } else {
    return(["set", name, x]);
  }
}});
setenv("join!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g238 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g238)]);
}});
modules.compiler = true;
modules.main = true;
modules.lib = true;
modules.reader = true;
main()