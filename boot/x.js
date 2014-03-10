environment = [{}];

n_setenv = function (k, v) {
  last(environment)[k] = v;
};

getenv = function (k) {
  var i = (length(environment) - 1);
  while ((i >= 0)) {
    var v = environment[i][k];
    if (v) {
      return(v);
    }
    i = (i - 1);
  }
};

variable = {};

is_symbol_macro = function (k) {
  var v = getenv(k);
  return((is_is(v) && !((v == variable)) && !(is_macro(k))));
};

is_macro = function (k) {
  return(is_function(getenv(k)));
};

is_variable = function (k) {
  return((last(environment)[k] == variable));
};

is_bound = function (x) {
  return((is_symbol_macro(x) || is_macro(x) || is_variable(x)));
};

is_embed_macros = false;

is_vararg = function (x) {
  return(((length(x) > 3) && (sub(x, (length(x) - 3), length(x)) == "...")));
};

vararg_name = function (x) {
  return(sub(x, 0, (length(x) - 3)));
};

bind_arguments = function (args, body) {
  var args1 = [];
  var bindings = [];
  var _14 = 0;
  var _13 = args;
  while ((_14 < length(_13))) {
    var arg = _13[_14];
    if (is_vararg(arg)) {
      var v = vararg_name(arg);
      var expr = (function () {
        if ((target == "js")) {
          return(["Array.prototype.slice.call", "arguments", length(args1)]);
        } else {
          n_push(args1, "...");
          return(["list", "..."]);
        }
      })();
      bindings = join(bindings, [v, expr]);
      break;
    } else if (is_list(arg)) {
      var _15 = make_id();
      n_push(args1, _15);
      bindings = join(bindings, [arg, _15]);
    } else {
      n_push(args1, arg);
    }
    _14 = (_14 + 1);
  }
  if (is_empty(bindings)) {
    return([args1, body]);
  } else {
    return([args1, [join(["let", bindings], body)]]);
  }
};

bind = function (lh, rh) {
  if ((is_list(lh) && is_list(rh))) {
    var id = make_id();
    return(join([[id, rh]], bind(lh, id)));
  } else if (is_atom(lh)) {
    return([[lh, rh]]);
  } else {
    var bindings = [];
    var i = 0;
    var _16 = lh;
    while ((i < length(_16))) {
      var x = _16[i];
      var b = (function () {
        if (is_vararg(x)) {
          return([[vararg_name(x), ["sub", rh, i]]]);
        } else {
          return(bind(x, ["at", rh, i]));
        }
      })();
      bindings = join(bindings, b);
      i = (i + 1);
    }
    return(bindings);
  }
};

is_quoting = function (depth) {
  return(is_number(depth));
};

is_quasiquoting = function (depth) {
  return((is_quoting(depth) && (depth > 0)));
};

is_can_unquote = function (depth) {
  return((is_quoting(depth) && (depth == 1)));
};

macroexpand = function (form) {
  if (is_symbol_macro(form)) {
    return(macroexpand(getenv(form)));
  } else if (is_atom(form)) {
    return(form);
  } else {
    var name = form[0];
    if ((name == "quote")) {
      return(form);
    } else if ((name == "macro")) {
      return(form);
    } else if (is_macro(name)) {
      return(macroexpand(apply(getenv(name), sub(form, 1))));
    } else if (((name == "function") || (name == "each"))) {
      var _ = form[0];
      var args = form[1];
      var body = sub(form, 2);
      n_push(environment, {});
      var _22 = 0;
      var _21 = args;
      while ((_22 < length(_21))) {
        var _20 = _21[_22];
        n_setenv(_20, variable);
        _22 = (_22 + 1);
      }
      var _19 = join([name, args], macroexpand(body));
      n_pop(environment);
      return(_19);
    } else {
      return(map(macroexpand, form));
    }
  }
};

quasiexpand = function (form, depth) {
  if (is_quasiquoting(depth)) {
    if (is_atom(form)) {
      return(["quote", form]);
    } else if ((is_can_unquote(depth) && (form[0] == "unquote"))) {
      return(quasiexpand(form[1]));
    } else if (((form[0] == "unquote") || (form[0] == "unquote-splicing"))) {
      return(quasiquote_list(form, (depth - 1)));
    } else if ((form[0] == "quasiquote")) {
      return(quasiquote_list(form, (depth + 1)));
    } else {
      return(quasiquote_list(form, depth));
    }
  } else if (is_atom(form)) {
    return(form);
  } else if ((form[0] == "quote")) {
    return(["quote", form[1]]);
  } else if ((form[0] == "quasiquote")) {
    return(quasiexpand(form[1], 1));
  } else {
    return(map(function (x) {
      return(quasiexpand(x, depth));
    }, form));
  }
};

quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var _24 = 0;
  var _23 = form;
  while ((_24 < length(_23))) {
    var x = _23[_24];
    if ((is_list(x) && is_can_unquote(depth) && (x[0] == "unquote-splicing"))) {
      n_push(xs, quasiexpand(x[1]));
      n_push(xs, ["list"]);
    } else {
      n_push(last(xs), quasiexpand(x, depth));
    }
    _24 = (_24 + 1);
  }
  if ((length(xs) == 1)) {
    return(xs[0]);
  } else {
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, keep(function (x) {
      return(((length(x) == 0) || !(((length(x) == 1) && (x[0] == "list")))));
    }, xs)));
  }
};

target = "js";

length = function (x) {
  return(x.length);
};

is_empty = function (x) {
  return((length(x) == 0));
};

sub = function (x, from, upto) {
  if (is_string(x)) {
    return(x.substring(from, upto));
  } else {
    return(x.slice(from, upto));
  }
};

n_push = function (arr, x) {
  return(arr.push(x));
};

n_pop = function (arr) {
  return(arr.pop());
};

last = function (arr) {
  return(arr[(length(arr) - 1)]);
};

join = function (a1, a2) {
  if (is_nil(a1)) {
    return(a2);
  } else if (is_nil(a2)) {
    return(a1);
  } else {
    return(a1.concat(a2));
  }
};

reduce = function (f, x) {
  if (is_empty(x)) {
    return(x);
  } else if ((length(x) == 1)) {
    return(x[0]);
  } else {
    return(f(x[0], reduce(f, sub(x, 1))));
  }
};

keep = function (f, a) {
  var a1 = [];
  var _26 = 0;
  var _25 = a;
  while ((_26 < length(_25))) {
    var x = _25[_26];
    if (f(x)) {
      n_push(a1, x);
    }
    _26 = (_26 + 1);
  }
  return(a1);
};

find = function (f, a) {
  var _28 = 0;
  var _27 = a;
  while ((_28 < length(_27))) {
    var x = _27[_28];
    var x1 = f(x);
    if (x1) {
      return(x1);
    }
    _28 = (_28 + 1);
  }
};

map = function (f, a) {
  var a1 = [];
  var _30 = 0;
  var _29 = a;
  while ((_30 < length(_29))) {
    var x = _29[_30];
    n_push(a1, f(x));
    _30 = (_30 + 1);
  }
  return(a1);
};

iterate = function (f, count) {
  var i = 0;
  while ((i < count)) {
    f(i);
    i = (i + 1);
  }
};

merge = function (f, a) {
  var a1 = [];
  var _32 = 0;
  var _31 = a;
  while ((_32 < length(_31))) {
    var x = _31[_32];
    a1 = join(a1, f(x));
    _32 = (_32 + 1);
  }
  return(a1);
};

char = function (str, n) {
  return(str.charAt(n));
};

search = function (str, pattern, start) {
  var i = str.indexOf(pattern, start);
  if ((i >= 0)) {
    return(i);
  }
};

split = function (str, sep) {
  return(str.split(sep));
};

fs = require("fs");

read_file = function (path) {
  return(fs.readFileSync(path, "utf8"));
};

write_file = function (path, data) {
  return(fs.writeFileSync(path, data, "utf8"));
};

print = function (x) {
  return(console.log(x));
};

write = function (x) {
  return(process.stdout.write(x));
};

exit = function (code) {
  return(process.exit(code));
};

is_nil = function (x) {
  return((x == undefined));
};

is_is = function (x) {
  return(!(is_nil(x)));
};

is_string = function (x) {
  return((type(x) == "string"));
};

is_string_literal = function (x) {
  return((is_string(x) && (char(x, 0) == "\"")));
};

is_number = function (x) {
  return((type(x) == "number"));
};

is_boolean = function (x) {
  return((type(x) == "boolean"));
};

is_function = function (x) {
  return((type(x) == "function"));
};

is_composite = function (x) {
  return((type(x) == "object"));
};

is_atom = function (x) {
  return(!(is_composite(x)));
};

is_table = function (x) {
  return((is_composite(x) && is_nil(x[0])));
};

is_list = function (x) {
  return((is_composite(x) && is_is(x[0])));
};

parse_number = function (str) {
  var n = parseFloat(str);
  if (!(isNaN(n))) {
    return(n);
  }
};

to_string = function (x) {
  if (is_nil(x)) {
    return("nil");
  } else if (is_boolean(x)) {
    if (x) {
      return("true");
    } else {
      return("false");
    }
  } else if (is_function(x)) {
    return("#<function>");
  } else if (is_atom(x)) {
    return((x + ""));
  } else if (is_table(x)) {
    var a = [];
    for (k in x) {
      v = x[k];
      n_push(a, (to_string(k) + ":"));
      n_push(a, v);
    }
    if ((length(a) > 0)) {
      return(to_string(a));
    } else {
      return("()");
    }
  } else {
    var str = "(";
    var i = 0;
    var _35 = x;
    while ((i < length(_35))) {
      var y = _35[i];
      str = (str + to_string(y));
      if ((i < (length(x) - 1))) {
        str = (str + " ");
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
};

error = function (msg) {
  throw(msg);
  return(undefined);
};

type = function (x) {
  return(typeof(x));
};

apply = function (f, args) {
  return(f.apply(f, args));
};

id_counter = 0;

make_id = function (prefix) {
  id_counter = (id_counter + 1);
  return(("_" + (prefix || "") + id_counter));
};

eval_result = undefined;

delimiters = {"(" : true, ")" : true, ";" : true, "\n" : true};

whitespace = {" " : true, "\t" : true, "\n" : true};

make_stream = function (str) {
  return({pos : 0, string : str, len : length(str)});
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
    if (is_nil(c)) {
      break;
    } else if (whitespace[c]) {
      read_char(s);
    } else if ((c == ";")) {
      while ((c && !((c == "\n")))) {
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

is_key = function (atom) {
  return((is_string(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) == ":")));
};

read_table[""] = function (s) {
  var str = "";
  while (true) {
    var c = peek_char(s);
    if ((c && (!(whitespace[c]) && !(delimiters[c])))) {
      str = (str + c);
      read_char(s);
    } else {
      break;
    }
  }
  var n = parse_number(str);
  if (is_is(n)) {
    return(n);
  } else if ((str == "true")) {
    return(true);
  } else if ((str == "false")) {
    return(false);
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
    if ((c && !((c == ")")))) {
      var x = read(s);
      if (is_key(x)) {
        var key = sub(x, 0, (length(x) - 1));
        var val = read(s);
        l[key] = val;
      } else {
        n_push(l, x);
      }
    } else if (c) {
      read_char(s);
      break;
    } else {
      error(("Expected ) at " + s.pos));
    }
  }
  return(l);
};

read_table[")"] = function (s) {
  return(error(("Unexpected ) at " + s.pos)));
};

read_table["\""] = function (s) {
  read_char(s);
  var str = "\"";
  while (true) {
    var c = peek_char(s);
    if ((c && !((c == "\"")))) {
      if ((c == "\\")) {
        str = (str + read_char(s));
      }
      str = (str + read_char(s));
    } else if (c) {
      read_char(s);
      break;
    } else {
      error(("Expected \" at " + s.pos));
    }
  }
  return((str + "\""));
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
  if ((peek_char(s) == "@")) {
    read_char(s);
    return(["unquote-splicing", read(s)]);
  } else {
    return(["unquote", read(s)]);
  }
};

read = function (s) {
  skip_non_code(s);
  var c = peek_char(s);
  if (is_is(c)) {
    return(((read_table[c] || read_table[""]))(s));
  } else {
    return(eof);
  }
};

read_from_string = function (str) {
  return(read(make_stream(str)));
};

operators = {common : {"+" : "+", "-" : "-", "%" : "%", "*" : "*", "/" : "/", "<" : "<", ">" : ">", "<=" : "<=", ">=" : ">=", "=" : "=="}, js : {"~=" : "!=", "and" : "&&", "or" : "||", "cat" : "+"}, lua : {"~=" : "~=", "and" : "and", "or" : "or", "cat" : ".."}};

getop = function (op) {
  return((operators["common"][op] || operators[target][op]));
};

is_operator = function (form) {
  return((is_list(form) && is_is(getop(form[0]))));
};

indent_level = 0;

indentation = function () {
  var str = "";
  iterate(function () {
    str = (str + "  ");
  }, indent_level);
  return(str);
};

compile_args = function (forms, is_compile) {
  var str = "(";
  var i = 0;
  var _38 = forms;
  while ((i < length(_38))) {
    var x = _38[i];
    str = (str + (function () {
      if (is_compile) {
        return(compile(x));
      } else {
        return(identifier(x));
      }
    })());
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};

compile_body = function (forms, is_tail) {
  var str = "";
  var i = 0;
  var _39 = forms;
  while ((i < length(_39))) {
    var x = _39[i];
    var is_t = (is_tail && (i == (length(forms) - 1)));
    str = (str + compile(x, true, is_t));
    i = (i + 1);
  }
  return(str);
};

identifier = function (id) {
  var id2 = "";
  var i = 0;
  while ((i < length(id))) {
    var c = char(id, i);
    if ((c == "-")) {
      c = "_";
    }
    id2 = (id2 + c);
    i = (i + 1);
  }
  var last = (length(id) - 1);
  var suffix = char(id, last);
  var name = sub(id2, 0, last);
  if ((suffix == "?")) {
    return(("is_" + name));
  } else if ((suffix == "!")) {
    return(("n_" + name));
  } else {
    return(id2);
  }
};

compile_atom = function (form) {
  if ((form == "nil")) {
    if ((target == "js")) {
      return("undefined");
    } else {
      return("nil");
    }
  } else if ((is_string(form) && !(is_string_literal(form)))) {
    return(identifier(form));
  } else {
    return(to_string(form));
  }
};

compile_call = function (form) {
  if ((length(form) == 0)) {
    return((compiler("list"))(form));
  } else {
    var f = form[0];
    var f1 = compile(f);
    var args = compile_args(sub(form, 1), true);
    if (is_list(f)) {
      return(("(" + f1 + ")" + args));
    } else if (is_string(f)) {
      return((f1 + args));
    } else {
      return(error("Invalid function call"));
    }
  }
};

compile_operator = function (_40) {
  var op = _40[0];
  var args = sub(_40, 1);
  var str = "(";
  var op1 = getop(op);
  var i = 0;
  var _41 = args;
  while ((i < length(_41))) {
    var arg = _41[i];
    if (((op1 == "-") && (length(args) == 1))) {
      str = (str + op1 + compile(arg));
    } else {
      str = (str + compile(arg));
      if ((i < (length(args) - 1))) {
        str = (str + " " + op1 + " ");
      }
    }
    i = (i + 1);
  }
  return((str + ")"));
};

compile_branch = function (condition, body, is_first, is_last, is_tail) {
  var cond1 = compile(condition);
  var body1 = (function () {
    indent_level = (indent_level + 1);
    var _42 = compile(body, true, is_tail);
    indent_level = (indent_level - 1);
    return(_42);
  })();
  var ind = indentation();
  var tr = (function () {
    if ((is_last && (target == "lua"))) {
      return((ind + "end\n"));
    } else if (is_last) {
      return("\n");
    } else {
      return("");
    }
  })();
  if ((is_first && (target == "js"))) {
    return((ind + "if (" + cond1 + ") {\n" + body1 + ind + "}" + tr));
  } else if (is_first) {
    return((ind + "if " + cond1 + " then\n" + body1 + tr));
  } else if ((is_nil(condition) && (target == "js"))) {
    return((" else {\n" + body1 + ind + "}\n"));
  } else if (is_nil(condition)) {
    return((ind + "else\n" + body1 + tr));
  } else if ((target == "js")) {
    return((" else if (" + cond1 + ") {\n" + body1 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + body1 + tr));
  }
};

compile_function = function (args, body, name) {
  name = (name || "");
  var args1 = compile_args(args);
  var body1 = (function () {
    indent_level = (indent_level + 1);
    var _43 = compile_body(body, true);
    indent_level = (indent_level - 1);
    return(_43);
  })();
  var ind = indentation();
  if ((target == "js")) {
    return(("function " + name + args1 + " {\n" + body1 + ind + "}"));
  } else {
    return(("function " + name + args1 + "\n" + body1 + ind + "end"));
  }
};

quote_form = function (form) {
  if (is_atom(form)) {
    if (is_string_literal(form)) {
      var str = sub(form, 1, (length(form) - 1));
      return(("\"\\\"" + str + "\\\"\""));
    } else if (is_string(form)) {
      return(("\"" + form + "\""));
    } else {
      return(to_string(form));
    }
  } else {
    return((compiler("list"))(form, 0));
  }
};

terminator = function (is_stmt) {
  if (!(is_stmt)) {
    return("");
  } else {
    return(";\n");
  }
};

compile_special = function (form, is_stmt, is_tail) {
  var name = form[0];
  if ((!(is_stmt) && is_statement(name))) {
    return(compile([["function", [], form]], false, is_tail));
  } else {
    var tr = terminator((is_stmt && !(is_self_terminating(name))));
    return(((compiler(name))(sub(form, 1), is_tail) + tr));
  }
};

special = {};

is_special = function (form) {
  return((is_list(form) && is_is(special[form[0]])));
};

compiler = function (name) {
  return(special[name]["compiler"]);
};

is_statement = function (name) {
  return(special[name]["statement"]);
};

is_self_terminating = function (name) {
  return(special[name]["terminated"]);
};

special["do"] = {compiler : function (forms, is_tail) {
  return(compile_body(forms, is_tail));
}, statement : true, terminated : true};

special["if"] = {compiler : function (form, is_tail) {
  var str = "";
  var i = 0;
  var _46 = form;
  while ((i < length(_46))) {
    var condition = _46[i];
    var is_last = (i >= (length(form) - 2));
    var is_else = (i == (length(form) - 1));
    var is_first = (i == 0);
    var body = form[(i + 1)];
    if (is_else) {
      body = condition;
      condition = undefined;
    }
    str = (str + compile_branch(condition, body, is_first, is_last, is_tail));
    i = (i + 1);
    i = (i + 1);
  }
  return(str);
}, statement : true, terminated : true};

special["while"] = {compiler : function (form) {
  var condition = compile(form[0]);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _47 = compile_body(sub(form, 1));
    indent_level = (indent_level - 1);
    return(_47);
  })();
  var ind = indentation();
  if ((target == "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, statement : true, terminated : true};

special["function"] = {compiler : function (_48) {
  var args = _48[0];
  var body = sub(_48, 1);
  return(compile_function(args, body));
}};

macros = "";

special["macro"] = {compiler : function (_49) {
  var name = _49[0];
  var args = _49[1];
  var body = sub(_49, 2);
  var macro = ["setenv!", ["quote", name], join(["fn", args], body)];
  eval(compile_for_target("js", macro));
  if (is_embed_macros) {
    macros = (macros + compile_toplevel(macro));
  }
  return("");
}, statement : true, terminated : true};

special["return"] = {compiler : function (form) {
  return((indentation() + compile_call(join(["return"], form))));
}, statement : true};

special["local"] = {compiler : function (_50) {
  var name = _50[0];
  var value = _50[1];
  var id = identifier(name);
  var keyword = (function () {
    if ((target == "js")) {
      return("var ");
    } else {
      return("local ");
    }
  })();
  var ind = indentation();
  if (is_nil(value)) {
    return((ind + keyword + id));
  } else {
    return((ind + keyword + id + " = " + compile(value)));
  }
}, statement : true};

special["each"] = {compiler : function (_51) {
  var _52 = _51[0];
  var t = _52[0];
  var k = _52[1];
  var v = _52[2];
  var body = sub(_51, 1);
  var t1 = compile(t);
  var ind = indentation();
  if ((target == "lua")) {
    var body1 = (function () {
      indent_level = (indent_level + 1);
      var _53 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_53);
    })();
    return((ind + "for " + k + ", " + v + " in pairs(" + t1 + ") do\n" + body1 + ind + "end\n"));
  } else {
    var _54 = (function () {
      indent_level = (indent_level + 1);
      var _55 = compile_body(join([["set!", v, ["get", t, k]]], body));
      indent_level = (indent_level - 1);
      return(_55);
    })();
    return((ind + "for (" + k + " in " + t1 + ") {\n" + _54 + ind + "}\n"));
  }
}, statement : true, terminated : true};

special["set!"] = {compiler : function (_56) {
  var lh = _56[0];
  var rh = _56[1];
  if (is_nil(rh)) {
    error("Missing right-hand side in assignment");
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, statement : true};

special["get"] = {compiler : function (_57) {
  var object = _57[0];
  var key = _57[1];
  var o = compile(object);
  var k = compile(key);
  if (((target == "lua") && (char(o, 0) == "{"))) {
    o = ("(" + o + ")");
  }
  return((o + "[" + k + "]"));
}};

special["not"] = {compiler : function (_58) {
  var expr = _58[0];
  var e = compile(expr);
  var open = (function () {
    if ((target == "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + e + ")"));
}};

special["list"] = {compiler : function (forms, depth) {
  var open = (function () {
    if ((target == "lua")) {
      return("{");
    } else {
      return("[");
    }
  })();
  var close = (function () {
    if ((target == "lua")) {
      return("}");
    } else {
      return("]");
    }
  })();
  var str = "";
  var i = 0;
  var _59 = forms;
  while ((i < length(_59))) {
    var x = _59[i];
    str = (str + (function () {
      if (is_quoting(depth)) {
        return(quote_form(x));
      } else {
        return(compile(x));
      }
    })());
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};

special["table"] = {compiler : function (forms) {
  var sep = (function () {
    if ((target == "lua")) {
      return(" = ");
    } else {
      return(" : ");
    }
  })();
  var str = "{";
  var i = 0;
  while ((i < (length(forms) - 1))) {
    var k = forms[i];
    var v = compile(forms[(i + 1)]);
    if (!(is_string(k))) {
      error(("Illegal table key: " + to_string(k)));
    }
    if (((target == "lua") && is_string_literal(k))) {
      k = ("[" + k + "]");
    }
    str = (str + k + sep + v);
    if ((i < (length(forms) - 2))) {
      str = (str + ", ");
    }
    i = (i + 2);
  }
  return((str + "}"));
}};

special["quote"] = {compiler : function (_60) {
  var form = _60[0];
  return(quote_form(form));
}};

is_can_return = function (form) {
  if (is_special(form)) {
    return(!(is_statement(form[0])));
  } else {
    return(true);
  }
};

compile = function (form, is_stmt, is_tail) {
  var tr = terminator(is_stmt);
  var ind = (function () {
    if (is_stmt) {
      return(indentation());
    } else {
      return("");
    }
  })();
  if ((is_tail && is_can_return(form))) {
    form = ["return", form];
  }
  if (is_nil(form)) {
    return("");
  } else if (is_atom(form)) {
    return((ind + compile_atom(form) + tr));
  } else if (is_operator(form)) {
    return((ind + compile_operator(form) + tr));
  } else if (is_special(form)) {
    return(compile_special(form, is_stmt, is_tail));
  } else {
    return((ind + compile_call(form) + tr));
  }
};

compile_file = function (file) {
  var form = undefined;
  var output = "";
  var s = make_stream(read_file(file));
  while (true) {
    form = read(s);
    if ((form == eof)) {
      break;
    }
    var result = compile_toplevel(form);
    output = (output + result);
  }
  return(output);
};

compile_files = function (files) {
  var output = "";
  var _62 = 0;
  var _61 = files;
  while ((_62 < length(_61))) {
    var file = _61[_62];
    output = (output + compile_file(file));
    _62 = (_62 + 1);
  }
  return(output);
};

compile_toplevel = function (form) {
  var form1 = compile(macroexpand(form), true, false, true);
  if ((form1 == "")) {
    return("");
  } else {
    return((form1 + "\n"));
  }
};

compile_for_target = function (target1, form) {
  var previous = target;
  target = target1;
  var result = compile_toplevel(form);
  target = previous;
  return(result);
};

rep = function (str) {
  return(print((to_string(eval(compile_toplevel(read_from_string(str)))))));
};

repl = function () {
  var execute = function (str) {
    rep(str);
    return(write("> "));
  };
  write("> ");
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  return(process.stdin.on("data", execute));
};

usage = function () {
  print((to_string("usage: x [options] [inputs]")));
  print((to_string("options:")));
  print((to_string("  -o <output>\tOutput file")));
  print((to_string("  -t <target>\tTarget language (default: lua)")));
  print((to_string("  -e <expr>\tExpression to evaluate")));
  print((to_string("  -m \t\tEmbed macro definitions in output")));
  return(exit());
};

main = function () {
  args = sub(process.argv, 2);
  if (((args[0] == "-h") || (args[0] == "--help"))) {
    usage();
  }
  var inputs = [];
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var i = 0;
  var _63 = args;
  while ((i < length(_63))) {
    var arg = _63[i];
    if (((arg == "-o") || (arg == "-t") || (arg == "-e"))) {
      if ((i == (length(args) - 1))) {
        print((to_string("missing argument for") + to_string(arg)));
      } else {
        i = (i + 1);
        var arg2 = args[i];
        if ((arg == "-o")) {
          output = arg2;
        } else if ((arg == "-t")) {
          target1 = arg2;
        } else if ((arg == "-e")) {
          expr = arg2;
        }
      }
    } else if ((arg == "-m")) {
      is_embed_macros = true;
    } else if (("-" == sub(arg, 0, 1))) {
      print((to_string("unrecognized option: ") + to_string(arg)));
      usage();
    } else {
      n_push(inputs, arg);
    }
    i = (i + 1);
  }
  if (output) {
    if (target1) {
      target = target1;
    }
    var compiled = compile_files(inputs);
    var main = compile(["main"], true);
    return(write_file(output, (compiled + macros + main)));
  } else {
    var _65 = 0;
    var _64 = inputs;
    while ((_65 < length(_64))) {
      var file = _64[_65];
      eval(compile_file(file));
      _65 = (_65 + 1);
    }
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};

n_setenv("at", function (arr, i) {
  if (((target == "lua") && is_number(i))) {
    i = (i + 1);
  } else if ((target == "lua")) {
    i = ["+", i, 1];
  }
  return(["get", arr, i]);
});

n_setenv("let", function (bindings) {
  var body = Array.prototype.slice.call(arguments, 1);
  var i = 0;
  var renames = [];
  var locals = [];
  var bindings1 = [];
  while ((i < length(bindings))) {
    var lh = bindings[i];
    var rh = bindings[(i + 1)];
    bindings1 = join(bindings1, bind(lh, rh));
    i = (i + 2);
  }
  var _5 = 0;
  var _4 = bindings1;
  while ((_5 < length(_4))) {
    var _6 = _4[_5];
    var id = _6[0];
    var rh = _6[1];
    if (is_bound(id)) {
      var rename = make_id();
      n_push(renames, [id, rename]);
      id = rename;
    } else {
      n_setenv(id, variable);
    }
    n_push(locals, ["local", id, rh]);
    _5 = (_5 + 1);
  }
  return(join(["let-symbol", renames], join(locals, body)));
});

n_setenv("let-macro", function (definitions) {
  var body = Array.prototype.slice.call(arguments, 1);
  n_push(environment, {});
  var is_embed = is_embed_macros;
  is_embed_macros = false;
  map(function (m) {
    return((compiler("macro"))(m));
  }, definitions);
  is_embed_macros = is_embed;
  var body1 = macroexpand(body);
  n_pop(environment);
  return(join(["do"], body1));
});

n_setenv("let-symbol", function (expansions) {
  var body = Array.prototype.slice.call(arguments, 1);
  n_push(environment, {});
  map(function (_8) {
    var name = _8[0];
    var expr = _8[1];
    return(n_setenv(name, expr));
  }, expansions);
  var body1 = macroexpand(body);
  n_pop(environment);
  return(join(["do"], body1));
});

n_setenv("symbol", function (name, expansion) {
  n_setenv(name, expansion);
  return(undefined);
});

n_setenv("define", function (name, x) {
  var body = Array.prototype.slice.call(arguments, 2);
  if (!(is_empty(body))) {
    x = join(["fn", x], body);
  }
  return(["set!", name, x]);
});

n_setenv("fn", function (args) {
  var body = Array.prototype.slice.call(arguments, 1);
  var _10 = bind_arguments(args, body);
  var args1 = _10[0];
  var body1 = _10[1];
  return(join(["function", args1], body1));
});

n_setenv("across", function (_12) {
  var list = _12[0];
  var v = _12[1];
  var i = _12[2];
  var start = _12[3];
  var body = Array.prototype.slice.call(arguments, 1);
  var l = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l, list], ["while", ["<", i, ["length", l]], join(["let", [v, ["at", l, i]]], join(body, [["set!", i, ["+", i, 1]]]))]]);
});

n_setenv("set", function () {
  var elements = Array.prototype.slice.call(arguments, 0);
  return(join(["table"], merge(function (x) {
    return([x, true]);
  }, elements)));
});

n_setenv("with-scope", function (_18, expr) {
  var bound = _18[0];
  var result = make_id();
  var arg = make_id();
  return(["do", ["push!", "environment", ["table"]], ["across", [bound, arg], ["setenv!", arg, "variable"]], ["let", [result, expr], ["pop!", "environment"], result]]);
});

n_setenv("quasiquote", function (form) {
  return(quasiexpand(form, 1));
});

n_setenv("language", function () {
  return(["quote", target]);
});

n_setenv("target", function () {
  var clauses = Array.prototype.slice.call(arguments, 0);
  return(find(function (x) {
    if ((x[0] == target)) {
      return(x[1]);
    }
  }, clauses));
});

n_setenv("join*", function () {
  var xs = Array.prototype.slice.call(arguments, 0);
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
});

n_setenv("join!", function (a) {
  var bs = Array.prototype.slice.call(arguments, 1);
  return(["set!", a, join(["join*", a], bs)]);
});

n_setenv("list*", function () {
  var xs = Array.prototype.slice.call(arguments, 0);
  if ((length(xs) == 0)) {
    return([]);
  } else {
    var t = [];
    var i = 0;
    var _34 = xs;
    while ((i < length(_34))) {
      var x = _34[i];
      if ((i == (length(xs) - 1))) {
        t = ["join", join(["list"], t), x];
      } else {
        n_push(t, x);
      }
      i = (i + 1);
    }
    return(t);
  }
});

n_setenv("cat!", function (a) {
  var bs = Array.prototype.slice.call(arguments, 1);
  return(["set!", a, join(["cat", a], bs)]);
});

n_setenv("pr", function () {
  var xs = Array.prototype.slice.call(arguments, 0);
  return(["print", join(["cat"], map(function (x) {
    return(["to-string", x]);
  }, xs))]);
});

n_setenv("define-reader", function (_37) {
  var char = _37[0];
  var stream = _37[1];
  var body = Array.prototype.slice.call(arguments, 1);
  return(["set!", ["get", "read-table", char], join(["fn", [stream]], body)]);
});

n_setenv("with-indent", function (form) {
  var result = make_id();
  return(["do", ["set!", "indent-level", ["+", "indent-level", 1]], ["let", [result, form], ["set!", "indent-level", ["-", "indent-level", 1]], result]]);
});

n_setenv("define-compiler", function (name, _45, args) {
  var keys = sub(_45, 0);
  var body = Array.prototype.slice.call(arguments, 3);
  return(["set!", ["get", "special", ["quote", name]], join(["table", "compiler", join(["fn", args], body)], merge(function (k) {
    return([k, true]);
  }, keys))]);
});

main();
