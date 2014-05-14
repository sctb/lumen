delimiters = {";": true, "\n": true, "(": true, ")": true};
whitespace = {"\t": true, "\n": true, " ": true};
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
infix = {js: {"=": "===", "and": "&&", "or": "||", "cat": "+", "~=": "!="}, lua: {"=": "==", "~=": true, "or": true, "cat": "..", "and": true}, common: {"-": true, ">": true, "+": true, "<": true, "*": true, "%": true, "<=": true, "/": true, ">=": true}};
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
    var stmt = x.stmt;
    var tr = x.tr;
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
  var m = undefined;
  var _g67 = modules;
  for (m in _g67) {
    if (isNaN(parseInt(m))) {
      var v = _g67[m];
      var x = compile_toplevel(["set", ["get", "modules", ["quote", m]], ["table"]]);
      compiler_output = (compiler_output + x);
      var k = undefined;
      var _g68 = map42(quote_binding, v);
      for (k in _g68) {
        if (isNaN(parseInt(k))) {
          var v = _g68[k];
          var x = compile_toplevel(["set", ["get", ["get", "modules", ["quote", m]], ["quote", k]], v]);
          compiler_output = (compiler_output + x);
        }
      }
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
  var module = {};
  if (list63(spec)) {
    throw "Unsupported module specification";
  } else if (loading[k]) {
    return;
  } else if ((!(compiling63) && modules[k])) {
    module = modules[k];
  } else {
    var file = (k + ".l");
    var frame = {};
    loading[k] = true;
    add(environment, frame);
    var compiled = compile_file(file);
    drop(environment);
    var x = undefined;
    var _g69 = frame;
    for (x in _g69) {
      if (isNaN(parseInt(x))) {
        var v = _g69[x];
        module[x] = v;
      }
    }
    modules[k] = module;
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      run(compiled);
    }
  }
  var x = undefined;
  var _g70 = module;
  for (x in _g70) {
    if (isNaN(parseInt(x))) {
      var v = _g70[x];
      setenv(x, v);
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
    var _g122 = args;
    for (k in _g122) {
      if (isNaN(parseInt(k))) {
        var v = _g122[k];
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
    var _g123 = args;
    for (k in _g123) {
      if (isNaN(parseInt(k))) {
        var v = _g123[k];
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
      var _g124 = l;
      for (k in _g124) {
        if (isNaN(parseInt(k))) {
          var v = _g124[k];
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
    var _g126 = 0;
    var _g125 = args;
    while ((_g126 < length(_g125))) {
      var arg = _g125[_g126];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g126 = (_g126 + 1);
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
    var _g127 = lh;
    while ((i < length(_g127))) {
      var x = _g127[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g128 = lh;
    for (k in _g128) {
      if (isNaN(parseInt(k))) {
        var v = _g128[k];
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
      var _g129 = form[1];
      var t = _g129[0];
      var k = _g129[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g3 = form[0];
      var args = form[1];
      var _g130 = sub(form, 2);
      add(environment, {});
      var _g132 = (function () {
        var _g134 = 0;
        var _g133 = args;
        while ((_g134 < length(_g133))) {
          var _g131 = _g133[_g134];
          setenv42(_g131, pending);
          _g134 = (_g134 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g130)));
      })();
      drop(environment);
      return(_g132);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g4 = form[0];
      var name = form[1];
      var _g135 = form[2];
      var _g136 = sub(form, 3);
      add(environment, {});
      var _g138 = (function () {
        var _g140 = 0;
        var _g139 = _g135;
        while ((_g140 < length(_g139))) {
          var _g137 = _g139[_g140];
          setenv42(_g137, pending);
          _g140 = (_g140 + 1);
        }
        return(join([x, name, map42(macroexpand, _g135)], macroexpand(_g136)));
      })();
      drop(environment);
      return(_g138);
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
  var _g141 = form;
  for (k in _g141) {
    if (isNaN(parseInt(k))) {
      var v = _g141[k];
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
  var _g143 = 0;
  var _g142 = form;
  while ((_g143 < length(_g142))) {
    var x = _g142[_g143];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g143 = (_g143 + 1);
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
  var _g144 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g144, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g144, upto);
    var k = undefined;
    var _g145 = x;
    for (k in _g145) {
      if (isNaN(parseInt(k))) {
        var v = _g145[k];
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
    var _g146 = l1;
    for (k in _g146) {
      if (isNaN(parseInt(k))) {
        var v = _g146[k];
        l[k] = v;
      }
    }
    var _g148 = undefined;
    var _g147 = l2;
    for (_g148 in _g147) {
      if (isNaN(parseInt(_g148))) {
        var v = _g147[_g148];
        l[_g148] = v;
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
  var _g150 = 0;
  var _g149 = l;
  while ((_g150 < length(_g149))) {
    var x = _g149[_g150];
    if (f(x)) {
      add(l1, x);
    }
    _g150 = (_g150 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g152 = 0;
  var _g151 = l;
  while ((_g152 < length(_g151))) {
    var x = _g151[_g152];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g152 = (_g152 + 1);
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
  var _g162 = 0;
  var _g161 = l;
  while ((_g162 < length(_g161))) {
    var x = _g161[_g162];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g162 = (_g162 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g163 = t;
  for (k in _g163) {
    if (isNaN(parseInt(k))) {
      var v = _g163[k];
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
  var _g164 = t;
  for (k in _g164) {
    if (isNaN(parseInt(k))) {
      var v = _g164[k];
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
  var _g165 = sub(xs, 0);
  if (empty63(_g165)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g165));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g168 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g168));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g169 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g169)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g170 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g170));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g171 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g171)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g172 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g172)));
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
    var _g173 = x;
    for (k in _g173) {
      if (isNaN(parseInt(k))) {
        var v = _g173[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g174 = x1;
    while ((i < length(_g174))) {
      var y = _g174[i];
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
  var _g175 = stash(args);
  return((f.apply)(f, _g175));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
rep = function (str) {
  var _g176 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g178) {
      return([false, _g178]);
    }
  })();
  var _g1 = _g176[0];
  var x = _g176[1];
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
  var _g177 = args;
  while ((i < length(_g177))) {
    var arg = _g177[i];
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
setenv("return", {special: function (_g179) {
  var x = _g179[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true});
setenv("each", {macro: function (_g180) {
  var t = _g180[0];
  var k = _g180[1];
  var v = _g180[2];
  var body = unstash(sub(arguments, 1));
  var _g181 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g182 = ["target"];
    _g182.lua = ["not", ["number?", k]];
    _g182.js = ["isNaN", ["parseInt", k]];
    return(_g182);
  })(), join(["let", [v, ["get", t1, k]]], _g181)]]]);
}});
setenv("define-global", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g183 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g183))) {
    var _g184 = bind_arguments(x, _g183);
    var args = _g184[0];
    var _g185 = _g184[1];
    return(join(["%global-function", name, args], _g185));
  } else {
    return(["set", name, x]);
  }
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
    var _g186 = body;
    for (k in _g186) {
      if (isNaN(parseInt(k))) {
        var v = _g186[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}});
setenv("dec", {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}});
setenv("across", {macro: function (_g187) {
  var l = _g187[0];
  var v = _g187[1];
  var i = _g187[2];
  var start = _g187[3];
  var body = unstash(sub(arguments, 1));
  var _g188 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g188, [["inc", i]]))]]);
}});
setenv("pr", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
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
setenv("table", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g189 = body;
  for (k in _g189) {
    if (isNaN(parseInt(k))) {
      var v = _g189[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}});
setenv("error", {special: function (_g190) {
  var x = _g190[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true});
setenv("quote", {macro: function (form) {
  return(quoted(form));
}});
setenv("with-bindings", {macro: function (_g191) {
  var names = _g191[0];
  var body = unstash(sub(arguments, 1));
  var _g192 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g192));
}});
setenv("do", {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true});
setenv("%local", {special: function (_g193) {
  var name = _g193[0];
  var value = _g193[1];
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
}, stmt: true});
setenv("break", {special: function (_g5) {
  return((indentation() + "break"));
}, stmt: true});
setenv("join*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}});
setenv("define-module", {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g194 = sub(body, 0);
  var imp = _g194.import;
  var exp = _g194.export;
  map(load_module, imp);
  exports = {};
  var _g196 = 0;
  var _g195 = (exp || []);
  while ((_g196 < length(_g195))) {
    var x = _g195[_g196];
    exports[x] = true;
    _g196 = (_g196 + 1);
  }
  return(undefined);
}});
setenv("list*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g197 = xs;
    while ((i < length(_g197))) {
      var x = _g197[i];
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
setenv("cat!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g198 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g198)]);
}});
setenv("let-macro", {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
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
}});
setenv("define-reader", {macro: function (_g201) {
  var char = _g201[0];
  var stream = _g201[1];
  var body = unstash(sub(arguments, 1));
  var _g202 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g202)]);
}});
setenv("define-symbol", {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}});
setenv("language", {macro: function () {
  return(["quote", target]);
}});
setenv("%local-function", {special: function (_g203) {
  var name = _g203[0];
  var args = _g203[1];
  var body = sub(_g203, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true});
setenv("set", {special: function (_g204) {
  var lh = _g204[0];
  var rh = _g204[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true});
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
setenv("while", {special: function (_g208) {
  var condition = _g208[0];
  var body = sub(_g208, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g209 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g209);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true});
setenv("let-symbol", {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
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
}});
setenv("%global-function", {special: function (_g213) {
  var name = _g213[0];
  var args = _g213[1];
  var body = sub(_g213, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true});
setenv("with-frame", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}});
setenv("join!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g214 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g214)]);
}});
setenv("target", {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}});
setenv("with-indent", {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
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
  var _g215 = pairs;
  while ((i < length(_g215))) {
    var _g216 = _g215[i];
    var k = _g216[0];
    var v = _g216[1];
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
setenv("define-special", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g217 = sub(body, 0);
  var form = join(["fn", args], _g217);
  var value = join((function () {
    var _g218 = ["table"];
    _g218.special = form;
    _g218.form = ["quote", form];
    return(_g218);
  })(), _g217);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("inc", {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}});
setenv("define", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g219 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g219));
}});
setenv("quasiquote", {macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("fn", {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g220 = sub(body, 0);
  var _g221 = bind_arguments(args, _g220);
  var args = _g221[0];
  var _g222 = _g221[1];
  return(join(["%function", args], _g222));
}});
setenv("define-macro", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g223 = sub(body, 0);
  var form = join(["fn", args], _g223);
  var value = (function () {
    var _g224 = ["table"];
    _g224.macro = form;
    _g224.form = ["quote", form];
    return(_g224);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
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
  var _g225 = forms;
  while ((i < length(_g225))) {
    var x = _g225[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}});
setenv("set-of", {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g227 = 0;
  var _g226 = elements;
  while ((_g227 < length(_g226))) {
    var e = _g226[_g227];
    l[e] = true;
    _g227 = (_g227 + 1);
  }
  return(join(["table"], l));
}});
setenv("%for", {special: function (_g228) {
  var _g229 = _g228[0];
  var t = _g229[0];
  var k = _g229[1];
  var body = sub(_g228, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g230 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g230);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true});
setenv("get", {special: function (_g231) {
  var t = _g231[0];
  var k = _g231[1];
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
setenv("%function", {special: function (_g232) {
  var args = _g232[0];
  var body = sub(_g232, 1);
  return(compile_function(args, body));
}});
setenv("at", {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}});
setenv("%try", {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g233 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g233);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g234 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g234);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true});
setenv("if", {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g235 = form;
  while ((i < length(_g235))) {
    var condition = _g235[i];
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
setenv("not", {special: function (_g236) {
  var x = _g236[0];
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
setenv("let", {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
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
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g240 = (_g240 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g237)])));
}});
modules.lib = {};
modules.lib["return"] = {special: function (_g242) {
  var x = _g242[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true};
modules.lib.each = {macro: function (_g243) {
  var t = _g243[0];
  var k = _g243[1];
  var v = _g243[2];
  var body = unstash(sub(arguments, 1));
  var _g244 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g245 = ["target"];
    _g245.lua = ["not", ["number?", k]];
    _g245.js = ["isNaN", ["parseInt", k]];
    return(_g245);
  })(), join(["let", [v, ["get", t1, k]]], _g244)]]]);
}};
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
modules.lib.list = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g249 = body;
    for (k in _g249) {
      if (isNaN(parseInt(k))) {
        var v = _g249[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}};
modules.lib.dec = {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}};
modules.lib["with-indent"] = {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.lib.pr = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
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
modules.lib.table = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g250 = body;
  for (k in _g250) {
    if (isNaN(parseInt(k))) {
      var v = _g250[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}};
modules.lib["error"] = {special: function (_g251) {
  var x = _g251[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true};
modules.lib["with-bindings"] = {macro: function (_g252) {
  var names = _g252[0];
  var body = unstash(sub(arguments, 1));
  var _g253 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g253));
}};
modules.lib["define-module"] = {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g254 = sub(body, 0);
  var imp = _g254.import;
  var exp = _g254.export;
  map(load_module, imp);
  exports = {};
  var _g256 = 0;
  var _g255 = (exp || []);
  while ((_g256 < length(_g255))) {
    var x = _g255[_g256];
    exports[x] = true;
    _g256 = (_g256 + 1);
  }
  return(undefined);
}};
modules.lib["do"] = {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true};
modules.lib["%local"] = {special: function (_g257) {
  var name = _g257[0];
  var value = _g257[1];
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
modules.lib["cat!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g258 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g258)]);
}};
modules.lib["join*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}};
modules.lib.across = {macro: function (_g259) {
  var l = _g259[0];
  var v = _g259[1];
  var i = _g259[2];
  var start = _g259[3];
  var body = unstash(sub(arguments, 1));
  var _g260 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g260, [["inc", i]]))]]);
}};
modules.lib["let-symbol"] = {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g261 = sub(body, 0);
  add(environment, {});
  var _g262 = (function () {
    map(function (_g263) {
      var name = _g263[0];
      var exp = _g263[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g261)));
  })();
  drop(environment);
  return(_g262);
}};
modules.lib.language = {macro: function () {
  return(["quote", target]);
}};
modules.lib["let-macro"] = {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g264 = sub(body, 0);
  add(environment, {});
  var _g265 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g264)));
  })();
  drop(environment);
  return(_g265);
}};
modules.lib["%object"] = {special: function (forms) {
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
  var _g266 = pairs;
  while ((i < length(_g266))) {
    var _g267 = _g266[i];
    var k = _g267[0];
    var v = _g267[1];
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
modules.lib["define-symbol"] = {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}};
modules.lib["set"] = {special: function (_g268) {
  var lh = _g268[0];
  var rh = _g268[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true};
modules.lib["define-special"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g269 = sub(body, 0);
  var form = join(["fn", args], _g269);
  var value = join((function () {
    var _g270 = ["table"];
    _g270.special = form;
    _g270.form = ["quote", form];
    return(_g270);
  })(), _g269);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.lib["set-of"] = {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g272 = 0;
  var _g271 = elements;
  while ((_g272 < length(_g271))) {
    var e = _g271[_g272];
    l[e] = true;
    _g272 = (_g272 + 1);
  }
  return(join(["table"], l));
}};
modules.lib["define-local"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g273 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g273))) {
    var _g274 = bind_arguments(x, _g273);
    var args = _g274[0];
    var _g275 = _g274[1];
    return(join(["%local-function", name, args], _g275));
  } else {
    return(["%local", name, x]);
  }
}};
modules.lib["join!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g276 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g276)]);
}};
modules.lib["while"] = {special: function (_g277) {
  var condition = _g277[0];
  var body = sub(_g277, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g278 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g278);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true};
modules.lib["%global-function"] = {special: function (_g279) {
  var name = _g279[0];
  var args = _g279[1];
  var body = sub(_g279, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true};
modules.lib["with-frame"] = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}};
modules.lib["define-reader"] = {macro: function (_g280) {
  var char = _g280[0];
  var stream = _g280[1];
  var body = unstash(sub(arguments, 1));
  var _g281 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g281)]);
}};
modules.lib["if"] = {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g282 = form;
  while ((i < length(_g282))) {
    var condition = _g282[i];
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
modules.lib["%local-function"] = {special: function (_g283) {
  var name = _g283[0];
  var args = _g283[1];
  var body = sub(_g283, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true};
modules.lib["list*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g284 = xs;
    while ((i < length(_g284))) {
      var x = _g284[i];
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
modules.lib.inc = {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}};
modules.lib["get"] = {special: function (_g285) {
  var t = _g285[0];
  var k = _g285[1];
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
modules.lib.define = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g286 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g286));
}};
modules.lib.quasiquote = {macro: function (form) {
  return(quasiexpand(form, 1));
}};
modules.lib.fn = {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g287 = sub(body, 0);
  var _g288 = bind_arguments(args, _g287);
  var args = _g288[0];
  var _g289 = _g288[1];
  return(join(["%function", args], _g289));
}};
modules.lib["define-macro"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g290 = sub(body, 0);
  var form = join(["fn", args], _g290);
  var value = (function () {
    var _g291 = ["table"];
    _g291.macro = form;
    _g291.form = ["quote", form];
    return(_g291);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.lib["%array"] = {special: function (forms) {
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
modules.lib.target = {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}};
modules.lib["%try"] = {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g293 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g293);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g294 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g294);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true};
modules.lib["%for"] = {special: function (_g295) {
  var _g296 = _g295[0];
  var t = _g296[0];
  var k = _g296[1];
  var body = sub(_g295, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g297 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g297);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true};
modules.lib["%function"] = {special: function (_g298) {
  var args = _g298[0];
  var body = sub(_g298, 1);
  return(compile_function(args, body));
}};
modules.lib.at = {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}};
modules.lib["break"] = {special: function (_g5) {
  return((indentation() + "break"));
}, stmt: true};
modules.lib.quote = {macro: function (form) {
  return(quoted(form));
}};
modules.lib["not"] = {special: function (_g299) {
  var x = _g299[0];
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
modules.lib.let = {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g300 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g301) {
    var lh = _g301[0];
    var rh = _g301[1];
    var _g303 = 0;
    var _g302 = bind(lh, rh);
    while ((_g303 < length(_g302))) {
      var _g304 = _g302[_g303];
      var id = _g304[0];
      var val = _g304[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g303 = (_g303 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g300)])));
}};
modules.compiler = {};
modules.compiler["define-reader"] = {macro: function (_g305) {
  var char = _g305[0];
  var stream = _g305[1];
  var body = unstash(sub(arguments, 1));
  var _g306 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g306)]);
}};
modules.compiler["%local-function"] = {special: function (_g307) {
  var name = _g307[0];
  var args = _g307[1];
  var body = sub(_g307, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true};
modules.compiler["while"] = {special: function (_g308) {
  var condition = _g308[0];
  var body = sub(_g308, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g309 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g309);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true};
modules.compiler["%global-function"] = {special: function (_g310) {
  var name = _g310[0];
  var args = _g310[1];
  var body = sub(_g310, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true};
modules.compiler["with-indent"] = {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.compiler["define-module"] = {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g311 = sub(body, 0);
  var imp = _g311.import;
  var exp = _g311.export;
  map(load_module, imp);
  exports = {};
  var _g313 = 0;
  var _g312 = (exp || []);
  while ((_g313 < length(_g312))) {
    var x = _g312[_g313];
    exports[x] = true;
    _g313 = (_g313 + 1);
  }
  return(undefined);
}};
modules.compiler["get"] = {special: function (_g314) {
  var t = _g314[0];
  var k = _g314[1];
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
modules.compiler["%for"] = {special: function (_g315) {
  var _g316 = _g315[0];
  var t = _g316[0];
  var k = _g316[1];
  var body = sub(_g315, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g317 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g317);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true};
modules.compiler["error"] = {special: function (_g318) {
  var x = _g318[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true};
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
  var _g319 = pairs;
  while ((i < length(_g319))) {
    var _g320 = _g319[i];
    var k = _g320[0];
    var v = _g320[1];
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
  var _g321 = forms;
  while ((i < length(_g321))) {
    var x = _g321[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};
modules.compiler["set"] = {special: function (_g322) {
  var lh = _g322[0];
  var rh = _g322[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true};
modules.compiler["%try"] = {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g323 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g323);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g324 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g324);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true};
modules.compiler["return"] = {special: function (_g325) {
  var x = _g325[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true};
modules.compiler["%function"] = {special: function (_g326) {
  var args = _g326[0];
  var body = sub(_g326, 1);
  return(compile_function(args, body));
}};
modules.compiler["break"] = {special: function (_g5) {
  return((indentation() + "break"));
}, stmt: true};
modules.compiler["%local"] = {special: function (_g327) {
  var name = _g327[0];
  var value = _g327[1];
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
modules.compiler["if"] = {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g328 = form;
  while ((i < length(_g328))) {
    var condition = _g328[i];
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
modules.compiler["not"] = {special: function (_g329) {
  var x = _g329[0];
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
modules.compiler["do"] = {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true};
modules.reader = {};
modules.reader["define-reader"] = {macro: function (_g330) {
  var char = _g330[0];
  var stream = _g330[1];
  var body = unstash(sub(arguments, 1));
  var _g331 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g331)]);
}};
modules.main = {};
modules.main["return"] = {special: function (_g332) {
  var x = _g332[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, stmt: true};
modules.main.target = {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}};
modules.main["define-global"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g333 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g333))) {
    var _g334 = bind_arguments(x, _g333);
    var args = _g334[0];
    var _g335 = _g334[1];
    return(join(["%global-function", name, args], _g335));
  } else {
    return(["set", name, x]);
  }
}};
modules.main.list = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g336 = body;
    for (k in _g336) {
      if (isNaN(parseInt(k))) {
        var v = _g336[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}};
modules.main.dec = {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}};
modules.main["with-indent"] = {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}};
modules.main.pr = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}};
modules.main.guard = {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}};
modules.main["join!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g337 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g337)]);
}};
modules.main["error"] = {special: function (_g338) {
  var x = _g338[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true};
modules.main["with-bindings"] = {macro: function (_g339) {
  var names = _g339[0];
  var body = unstash(sub(arguments, 1));
  var _g340 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], ["setenv*", x, "pending"]]], _g340));
}};
modules.main["let-symbol"] = {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g341 = sub(body, 0);
  add(environment, {});
  var _g342 = (function () {
    map(function (_g343) {
      var name = _g343[0];
      var exp = _g343[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g341)));
  })();
  drop(environment);
  return(_g342);
}};
modules.main["do"] = {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true, stmt: true};
modules.main["%local"] = {special: function (_g344) {
  var name = _g344[0];
  var value = _g344[1];
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
modules.main["set-of"] = {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g346 = 0;
  var _g345 = elements;
  while ((_g346 < length(_g345))) {
    var e = _g345[_g346];
    l[e] = true;
    _g346 = (_g346 + 1);
  }
  return(join(["table"], l));
}};
modules.main["join*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}};
modules.main["cat!"] = {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g347 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g347)]);
}};
modules.main["define-module"] = {macro: function (spec) {
  var body = unstash(sub(arguments, 1));
  var _g348 = sub(body, 0);
  var imp = _g348.import;
  var exp = _g348.export;
  map(load_module, imp);
  exports = {};
  var _g350 = 0;
  var _g349 = (exp || []);
  while ((_g350 < length(_g349))) {
    var x = _g349[_g350];
    exports[x] = true;
    _g350 = (_g350 + 1);
  }
  return(undefined);
}};
modules.main["break"] = {special: function (_g5) {
  return((indentation() + "break"));
}, stmt: true};
modules.main["let-macro"] = {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g351 = sub(body, 0);
  add(environment, {});
  var _g352 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g351)));
  })();
  drop(environment);
  return(_g352);
}};
modules.main["%object"] = {special: function (forms) {
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
  var _g353 = pairs;
  while ((i < length(_g353))) {
    var _g354 = _g353[i];
    var k = _g354[0];
    var v = _g354[1];
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
modules.main["define-symbol"] = {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}};
modules.main.table = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g355 = body;
  for (k in _g355) {
    if (isNaN(parseInt(k))) {
      var v = _g355[k];
      if (is63(v)) {
        add(l, k);
        add(l, v);
      }
    }
  }
  return(join(["%object"], l));
}};
modules.main.language = {macro: function () {
  return(["quote", target]);
}};
modules.main["set"] = {special: function (_g356) {
  var lh = _g356[0];
  var rh = _g356[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true};
modules.main["define-local"] = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g357 = sub(body, 0);
  setenv42(name, pending);
  if (!(empty63(_g357))) {
    var _g358 = bind_arguments(x, _g357);
    var args = _g358[0];
    var _g359 = _g358[1];
    return(join(["%local-function", name, args], _g359));
  } else {
    return(["%local", name, x]);
  }
}};
modules.main["%local-function"] = {special: function (_g360) {
  var name = _g360[0];
  var args = _g360[1];
  var body = sub(_g360, 2);
  return(compile_function(args, body, {_stash: true, prefix: "local ", name: name}));
}, tr: true, stmt: true};
modules.main["while"] = {special: function (_g361) {
  var condition = _g361[0];
  var body = sub(_g361, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g362 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g362);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true, stmt: true};
modules.main["%global-function"] = {special: function (_g363) {
  var name = _g363[0];
  var args = _g363[1];
  var body = sub(_g363, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, tr: true, stmt: true};
modules.main["with-frame"] = {macro: function () {
  var body = unstash(sub(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}};
modules.main["define-reader"] = {macro: function (_g364) {
  var char = _g364[0];
  var stream = _g364[1];
  var body = unstash(sub(arguments, 1));
  var _g365 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g365)]);
}};
modules.main.across = {macro: function (_g366) {
  var l = _g366[0];
  var v = _g366[1];
  var i = _g366[2];
  var start = _g366[3];
  var body = unstash(sub(arguments, 1));
  var _g367 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g367, [["inc", i]]))]]);
}};
modules.main.each = {macro: function (_g368) {
  var t = _g368[0];
  var k = _g368[1];
  var v = _g368[2];
  var body = unstash(sub(arguments, 1));
  var _g369 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g370 = ["target"];
    _g370.lua = ["not", ["number?", k]];
    _g370.js = ["isNaN", ["parseInt", k]];
    return(_g370);
  })(), join(["let", [v, ["get", t1, k]]], _g369)]]]);
}};
modules.main["list*"] = {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g371 = xs;
    while ((i < length(_g371))) {
      var x = _g371[i];
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
modules.main.inc = {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}};
modules.main["get"] = {special: function (_g372) {
  var t = _g372[0];
  var k = _g372[1];
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
modules.main.define = {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g373 = sub(body, 0);
  setenv42(name, pending);
  return(join(["define-global", name, x], _g373));
}};
modules.main.quasiquote = {macro: function (form) {
  return(quasiexpand(form, 1));
}};
modules.main.fn = {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g374 = sub(body, 0);
  var _g375 = bind_arguments(args, _g374);
  var args = _g375[0];
  var _g376 = _g375[1];
  return(join(["%function", args], _g376));
}};
modules.main["define-macro"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g377 = sub(body, 0);
  var form = join(["fn", args], _g377);
  var value = (function () {
    var _g378 = ["table"];
    _g378.macro = form;
    _g378.form = ["quote", form];
    return(_g378);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.main["%array"] = {special: function (forms) {
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
  var _g379 = forms;
  while ((i < length(_g379))) {
    var x = _g379[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};
modules.main["define-special"] = {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g380 = sub(body, 0);
  var form = join(["fn", args], _g380);
  var value = join((function () {
    var _g381 = ["table"];
    _g381.special = form;
    _g381.form = ["quote", form];
    return(_g381);
  })(), _g380);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}};
modules.main["%try"] = {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g382 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g382);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g383 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g383);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true, stmt: true};
modules.main["if"] = {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g384 = form;
  while ((i < length(_g384))) {
    var condition = _g384[i];
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
modules.main["%function"] = {special: function (_g385) {
  var args = _g385[0];
  var body = sub(_g385, 1);
  return(compile_function(args, body));
}};
modules.main.at = {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}};
modules.main["%for"] = {special: function (_g386) {
  var _g387 = _g386[0];
  var t = _g387[0];
  var k = _g387[1];
  var body = sub(_g386, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g388 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g388);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true, stmt: true};
modules.main.quote = {macro: function (form) {
  return(quoted(form));
}};
modules.main["not"] = {special: function (_g389) {
  var x = _g389[0];
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
modules.main.let = {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g390 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g391) {
    var lh = _g391[0];
    var rh = _g391[1];
    var _g393 = 0;
    var _g392 = bind(lh, rh);
    while ((_g393 < length(_g392))) {
      var _g394 = _g392[_g393];
      var id = _g394[0];
      var val = _g394[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv42(id, pending);
      }
      add(locals, ["%local", id, val]);
      _g393 = (_g393 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g390)])));
}};
main()