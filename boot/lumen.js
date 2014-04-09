environment = [{}];

setenv = function (k, v) {
  last(environment)[k] = v;
};

getenv = function (k) {
  if (string63(k)) {
    var i = (length(environment) - 1);
    while ((i >= 0)) {
      var v = environment[i][k];
      if (v) {
        return(v);
      }
      i = (i - 1);
    }
  }
};

variable = {};

symbol_macro63 = function (k) {
  var v = getenv(k);
  return((is63(v) && !((v === variable)) && !(macro63(k))));
};

macro63 = function (k) {
  return(function63(getenv(k)));
};

variable63 = function (k) {
  return((last(environment)[k] === variable));
};

bound63 = function (x) {
  return((symbol_macro63(x) || macro63(x) || variable63(x)));
};

embed_macros63 = false;

quoted = function (form) {
  if (atom63(form)) {
    if (string_literal63(form)) {
      var str = sub(form, 1, (length(form) - 1));
      return(("\"\\\"" + str + "\\\"\""));
    } else if (string63(form)) {
      return(("\"" + form + "\""));
    } else {
      return(form);
    }
  } else {
    return(join(["list"], map(quoted, form)));
  }
};

stash = function (args) {
  if (keys63(args)) {
    var p = {_stash: true};
    for (k in args) {
      v = args[k];
      if (isNaN(parseInt(k))) {
        p[k] = v;
      }
    }
    return(join(args, [p]));
  } else {
    return(args);
  }
};

unstash = function (args) {
  if (empty63(args)) {
    return([]);
  } else {
    var l = last(args);
    if ((composite63(l) && l["_stash"])) {
      var args1 = sub(args, 0, (length(args) - 1));
      for (k in l) {
        v = l[k];
        if (isNaN(parseInt(k))) {
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
      add(args1, "...");
      return(["unstash", ["list", "..."]]);
    }
  };
  if (atom63(args)) {
    return([args1, [join(["let", [args, rest()]], body)]]);
  } else {
    var bs = [];
    var _16 = 0;
    var _15 = args;
    while ((_16 < length(_15))) {
      var arg = _15[_16];
      if (list63(arg)) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      } else {
        add(args1, arg);
      }
      _16 = (_16 + 1);
    }
    var r = args["rest"];
    if (r) {
      bs = join(bs, [r, rest()]);
    }
    if (empty63(bs)) {
      return([args1, body]);
    } else {
      return([args1, [join(["let", bs], body)]]);
    }
  }
};

bind = function (lh, rh) {
  if ((list63(lh) && list63(rh))) {
    var id = make_id();
    return(join([[id, rh]], bind(lh, id)));
  } else if (atom63(lh)) {
    return([[lh, rh]]);
  } else {
    var r = lh["rest"];
    var i = 0;
    var bs = map(function (x) {
      var b = bind(x, ["at", rh, i]);
      i = (i + 1);
      return(splice(b));
    }, lh);
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, i]));
    }
    return(bs);
  }
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

macroexpand = function (form) {
  if (symbol_macro63(form)) {
    return(macroexpand(getenv(form)));
  } else if (atom63(form)) {
    return(form);
  } else {
    var name = hd(form);
    if ((name === "define-macro")) {
      return(form);
    } else if (macro63(name)) {
      return(macroexpand(apply(getenv(name), tl(form))));
    } else if (((name === "function") || (name === "for"))) {
      var _ = form[0];
      var args = form[1];
      var body = sub(form, 2);
      add(environment, {});
      var _22 = 0;
      var _21 = args;
      while ((_22 < length(_21))) {
        var _20 = _21[_22];
        setenv(_20, variable);
        _22 = (_22 + 1);
      }
      var _19 = join([name, args], macroexpand(body));
      drop(environment);
      return(_19);
    } else {
      return(map(macroexpand, form));
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
    return(["quote", form[1]]);
  } else if ((hd(form) === "quasiquote")) {
    return(quasiexpand(form[1], 1));
  } else {
    return(map(function (x) {
      return(quasiexpand(x, depth));
    }, form));
  }
};

quasiquote_list = function (form, depth) {
  var xs = [["array"]];
  var _24 = 0;
  var _23 = form;
  while ((_24 < length(_23))) {
    var x = _23[_24];
    if ((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing"))) {
      add(xs, quasiexpand(x[1]));
      add(xs, ["array"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _24 = (_24 + 1);
  }
  if ((length(xs) === 1)) {
    return(hd(xs));
  } else {
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, keep(function (x) {
      return((empty63(x) || !(((length(x) === 1) && (hd(x) === "array")))));
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
  from = (from || 0);
  if (string63(x)) {
    return(x.substring(from, upto));
  } else {
    var l = Array.prototype.slice.call(x, from, upto);
    for (k in x) {
      v = x[k];
      if (isNaN(parseInt(k))) {
        l[k] = v;
      }
    }
    return(l);
  }
};

hd = function (l) {
  return(l[0]);
};

tl = function (l) {
  return(sub(l, 1));
};

add = function (l, x) {
  return(l.push(x));
};

drop = function (l) {
  return(l.pop());
};

shift = function (l) {
  return(l.shift());
};

last = function (l) {
  return(l[(length(l) - 1)]);
};

join = function (l1, l2) {
  if (nil63(l1)) {
    return(l2);
  } else if (nil63(l2)) {
    return(l1);
  } else {
    var l = [];
    l = l1.concat(l2);
    for (k in l1) {
      v = l1[k];
      if (isNaN(parseInt(k))) {
        l[k] = v;
      }
    }
    for (k in l2) {
      v = l2[k];
      if (isNaN(parseInt(k))) {
        l[k] = v;
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
  var _26 = 0;
  var _25 = l;
  while ((_26 < length(_25))) {
    var x = _25[_26];
    if (f(x)) {
      add(l1, x);
    }
    _26 = (_26 + 1);
  }
  return(l1);
};

find = function (f, l) {
  var _28 = 0;
  var _27 = l;
  while ((_28 < length(_27))) {
    var x = _27[_28];
    var x1 = f(x);
    if (x1) {
      return(x1);
    }
    _28 = (_28 + 1);
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

splice = function (x) {
  return({_splice: x});
};

splice63 = function (x) {
  if (table63(x)) {
    return(x["_splice"]);
  }
};

map = function (f, l) {
  var l1 = [];
  var _34 = 0;
  var _33 = l;
  while ((_34 < length(_33))) {
    var x = _33[_34];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _34 = (_34 + 1);
  }
  return(l1);
};

map42 = function (f, t) {
  var l = map(f, t);
  for (k in t) {
    v = t[k];
    if (isNaN(parseInt(k))) {
      l[k] = f(v);
    }
  }
  return(l);
};

keys63 = function (t) {
  var k63 = false;
  for (k in t) {
    v = t[k];
    if (isNaN(parseInt(k))) {
      k63 = true;
      break;
    }
  }
  return(k63);
};

char = function (str, n) {
  return(str.charAt(n));
};

code = function (str, n) {
  return(str.charCodeAt(n));
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
    for (k in x) {
      v = x[k];
      if (isNaN(parseInt(k))) {
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _35 = x1;
    while ((i < length(_35))) {
      var y = _35[i];
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
  var args1 = stash(args);
  return(f.apply(f, args1));
};

id_counter = 0;

make_id = function (prefix) {
  id_counter = (id_counter + 1);
  return(("_" + (prefix || "") + id_counter));
};

eval_result = undefined;

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

key = function (str) {
  if (string_literal63(str)) {
    return(sub(str, 1, (length(str) - 1)));
  } else {
    return(str);
  }
};

flag63 = function (atom) {
  return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
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
  if (is63(n)) {
    return(n);
  } else if ((str === "true")) {
    return(true);
  } else if ((str === "false")) {
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
    if ((c && !((c === ")")))) {
      var x = read(s);
      if (key63(x)) {
        var k = sub(x, 0, (length(x) - 1));
        var v = read(s);
        l[key(k)] = v;
      } else if (flag63(x)) {
        l[key(sub(x, 1))] = true;
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
  var colon = "";
  while (true) {
    var c = peek_char(s);
    if ((c && !((c === "\"")))) {
      if ((c === "\\")) {
        str = (str + read_char(s));
      }
      str = (str + read_char(s));
    } else if (c) {
      read_char(s);
      if ((peek_char(s) === ":")) {
        colon = read_char(s);
      }
      break;
    } else {
      throw ("Expected \" at " + s.pos);
    }
  }
  return((str + "\"" + colon));
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

read_from_string = function (str) {
  return(read(make_stream(str)));
};

operators = {common: {"+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", and: "&&", or: "||", cat: "+"}, lua: {"=": "==", cat: "..", "~=": true, and: true, or: true}};

getop = function (op) {
  var op1 = (operators["common"][op] || operators[target][op]);
  if ((op1 === true)) {
    return(op);
  } else {
    return(op1);
  }
};

operator63 = function (form) {
  return((list63(form) && is63(getop(hd(form)))));
};

indent_level = 0;

indentation = function () {
  var str = "";
  iterate(function () {
    str = (str + "  ");
  }, indent_level);
  return(str);
};

compile_args = function (forms, compile63) {
  var str = "(";
  var i = 0;
  var _38 = forms;
  while ((i < length(_38))) {
    var x = _38[i];
    str = (str + (function () {
      if (compile63) {
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

compile_body = function (forms, tail63) {
  var str = "";
  var i = 0;
  var _39 = forms;
  while ((i < length(_39))) {
    var x = _39[i];
    var t63 = (tail63 && (i === (length(forms) - 1)));
    str = (str + compile(x, true, t63));
    i = (i + 1);
  }
  return(str);
};

numeric63 = function (n) {
  return(((n > 47) && (n < 58)));
};

valid_char63 = function (n) {
  return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 173)) || (n === 95)));
};

valid_id63 = function (id) {
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
};

identifier = function (id) {
  var id1 = "";
  var i = 0;
  while ((i < length(id))) {
    var c = char(id, i);
    var n = code(c);
    var c1 = (function () {
      if ((c === "-")) {
        return("_");
      } else if ((c === ".")) {
        return(".");
      } else if ((c === "#")) {
        return("#");
      } else if ((c === ":")) {
        return(":");
      } else if ((c === ",")) {
        return(",");
      } else if (valid_char63(n)) {
        return(c);
      } else {
        return(n);
      }
    })();
    id1 = (id1 + c1);
    i = (i + 1);
  }
  return(id1);
};

compile_atom = function (form) {
  if ((form === "nil")) {
    if ((target === "js")) {
      return("undefined");
    } else {
      return("nil");
    }
  } else if ((string63(form) && !(string_literal63(form)))) {
    return(identifier(form));
  } else {
    return(to_string(form));
  }
};

compile_call = function (form) {
  if (empty63(form)) {
    return((compiler("array"))(form));
  } else {
    var f = hd(form);
    var f1 = compile(f);
    var args = compile_args(tl(form), true);
    if (list63(f)) {
      return(("(" + f1 + ")" + args));
    } else if (string63(f)) {
      return((f1 + args));
    } else {
      throw "Invalid function call";
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
    if (((op1 === "-") && (length(args) === 1))) {
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

compile_branch = function (condition, body, first63, last63, tail63) {
  var cond1 = compile(condition);
  var body1 = (function () {
    indent_level = (indent_level + 1);
    var _42 = compile(body, true, tail63);
    indent_level = (indent_level - 1);
    return(_42);
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
    return((ind + "if (" + cond1 + ") {\n" + body1 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + body1 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + body1 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + body1 + tr));
  } else if ((target === "js")) {
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
  if ((target === "js")) {
    return(("function " + name + args1 + " {\n" + body1 + ind + "}"));
  } else {
    return(("function " + name + args1 + "\n" + body1 + ind + "end"));
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
  var name = hd(form);
  if ((!(stmt63) && statement63(name))) {
    return(compile([["function", [], form]], false, tail63));
  } else {
    var tr = terminator((stmt63 && !(self_terminating63(name))));
    return(((compiler(name))(tl(form), tail63) + tr));
  }
};

special = {};

special63 = function (form) {
  return((list63(form) && is63(special[hd(form)])));
};

compiler = function (name) {
  return(special[name]["compiler"]);
};

statement63 = function (name) {
  return(special[name]["statement"]);
};

self_terminating63 = function (name) {
  return(special[name]["terminated"]);
};

special["do"] = {compiler: function (forms, tail63) {
  return(compile_body(forms, tail63));
}, statement: true, terminated: true};

special["if"] = {compiler: function (form, tail63) {
  var str = "";
  var i = 0;
  var _44 = form;
  while ((i < length(_44))) {
    var condition = _44[i];
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
}, statement: true, terminated: true};

special["while"] = {compiler: function (form) {
  var condition = compile(hd(form));
  var body = (function () {
    indent_level = (indent_level + 1);
    var _45 = compile_body(tl(form));
    indent_level = (indent_level - 1);
    return(_45);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, statement: true, terminated: true};

special["break"] = {compiler: function (form) {
  return((indentation() + "break"));
}, statement: true};

special["function"] = {compiler: function (_46) {
  var args = _46[0];
  var body = sub(_46, 1);
  return(compile_function(args, body));
}};

macros = "";

special["define-macro"] = {compiler: function (_47) {
  var name = _47[0];
  var args = _47[1];
  var body = sub(_47, 2);
  var macro = ["setenv", ["quote", name], join(["fn", args], body)];
  eval(compile_for_target("js", macro));
  if (embed_macros63) {
    macros = (macros + compile_toplevel(macro));
  }
  return("");
}, statement: true, terminated: true};

special["return"] = {compiler: function (form) {
  return((indentation() + compile_call(join(["return"], form))));
}, statement: true};

special["error"] = {compiler: function (_48) {
  var expr = _48[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(expr)));
    } else {
      return(compile_call(["error", expr]));
    }
  })();
  return((indentation() + e));
}, statement: true};

special["local"] = {compiler: function (_49) {
  var name = _49[0];
  var value = _49[1];
  var id = identifier(name);
  var keyword = (function () {
    if ((target === "js")) {
      return("var ");
    } else {
      return("local ");
    }
  })();
  var ind = indentation();
  if (nil63(value)) {
    return((ind + keyword + id));
  } else {
    return((ind + keyword + id + " = " + compile(value)));
  }
}, statement: true};

special["for"] = {compiler: function (_50) {
  var _51 = _50[0];
  var t = _51[0];
  var k = _51[1];
  var v = _51[2];
  var body = sub(_50, 1);
  var t1 = compile(t);
  var ind = indentation();
  if ((target === "lua")) {
    var body1 = (function () {
      indent_level = (indent_level + 1);
      var _52 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_52);
    })();
    return((ind + "for " + k + ", " + v + " in pairs(" + t1 + ") do\n" + body1 + ind + "end\n"));
  } else {
    var _53 = (function () {
      indent_level = (indent_level + 1);
      var _54 = compile_body(join([["set", v, ["get", t, k]]], body));
      indent_level = (indent_level - 1);
      return(_54);
    })();
    return((ind + "for (" + k + " in " + t1 + ") {\n" + _53 + ind + "}\n"));
  }
}, statement: true, terminated: true};

special["set"] = {compiler: function (_55) {
  var lh = _55[0];
  var rh = _55[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, statement: true};

special["get"] = {compiler: function (_56) {
  var object = _56[0];
  var key = _56[1];
  var o = compile(object);
  var k = compile(key);
  if (((target === "lua") && (char(o, 0) === "{"))) {
    o = ("(" + o + ")");
  }
  return((o + "[" + k + "]"));
}};

special["not"] = {compiler: function (_57) {
  var expr = _57[0];
  var e = compile(expr);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + e + ")"));
}};

special["array"] = {compiler: function (forms) {
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
  var _58 = forms;
  while ((i < length(_58))) {
    var x = _58[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};

special["object"] = {compiler: function (forms) {
  var str = "{";
  var i = 0;
  var sep = (function () {
    if ((target === "lua")) {
      return(" = ");
    } else {
      return(": ");
    }
  })();
  while ((i < (length(forms) - 1))) {
    var k = forms[i];
    var v = compile(forms[(i + 1)]);
    if (!(string63(k))) {
      throw ("Illegal object key: " + to_string(k));
    }
    if ((target === "lua")) {
      var k1 = (function () {
        if (string_literal63(k)) {
          return(k);
        } else {
          return(quoted(k));
        }
      })();
      k = ("[" + k1 + "]");
    } else if ((!(valid_id63(k)) && !(string_literal63(k)))) {
      k = quoted(k);
    }
    str = (str + k + sep + v);
    if ((i < (length(forms) - 2))) {
      str = (str + ", ");
    }
    i = (i + 2);
  }
  return((str + "}"));
}};

can_return63 = function (form) {
  if (special63(form)) {
    return(!(statement63(hd(form))));
  } else {
    return(true);
  }
};

compile = function (form, stmt63, tail63) {
  var tr = terminator(stmt63);
  var ind = (function () {
    if (stmt63) {
      return(indentation());
    } else {
      return("");
    }
  })();
  if ((tail63 && can_return63(form))) {
    form = ["return", form];
  }
  if (nil63(form)) {
    return("");
  } else if (atom63(form)) {
    return((ind + compile_atom(form) + tr));
  } else if (operator63(form)) {
    return((ind + compile_operator(form) + tr));
  } else if (special63(form)) {
    return(compile_special(form, stmt63, tail63));
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
    if ((form === eof)) {
      break;
    }
    var result = compile_toplevel(form);
    output = (output + result);
  }
  return(output);
};

compile_files = function (files) {
  var output = "";
  var _60 = 0;
  var _59 = files;
  while ((_60 < length(_59))) {
    var file = _59[_60];
    output = (output + compile_file(file));
    _60 = (_60 + 1);
  }
  return(output);
};

compile_toplevel = function (form) {
  var form1 = compile(macroexpand(form), true, false, true);
  if ((form1 === "")) {
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
  var form = read_from_string(str);
  var result = eval(compile_toplevel(form));
  if (is63(result)) {
    return(print((to_string(result))));
  }
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
  if (((hd(args) === "-h") || (hd(args) === "--help"))) {
    usage();
  }
  var inputs = [];
  var output = undefined;
  var target1 = undefined;
  var expr = undefined;
  var i = 0;
  var _61 = args;
  while ((i < length(_61))) {
    var arg = _61[i];
    if (((arg === "-o") || (arg === "-t") || (arg === "-e"))) {
      if ((i === (length(args) - 1))) {
        print((to_string("missing argument for") + to_string(arg)));
      } else {
        i = (i + 1);
        var arg2 = args[i];
        if ((arg === "-o")) {
          output = arg2;
        } else if ((arg === "-t")) {
          target1 = arg2;
        } else if ((arg === "-e")) {
          expr = arg2;
        }
      }
    } else if ((arg === "-m")) {
      embed_macros63 = true;
    } else if (("-" != sub(arg, 0, 1))) {
      add(inputs, arg);
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
    var _63 = 0;
    var _62 = inputs;
    while ((_63 < length(_62))) {
      var file = _62[_63];
      eval(compile_file(file));
      _63 = (_63 + 1);
    }
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};

setenv("at", function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
});

setenv("quote", function (form) {
  return(quoted(form));
});

setenv("list", function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    for (k in body) {
      v = body[k];
      if (isNaN(parseInt(k))) {
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
});

setenv("table", function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  for (k in body) {
    v = body[k];
    if (isNaN(parseInt(k))) {
      add(l, k);
      add(l, v);
    }
  }
  return(join(["object"], l));
});

setenv("let", function (bindings) {
  var body = unstash(sub(arguments, 1));
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_5) {
    var lh = _5[0];
    var rh = _5[1];
    var _7 = 0;
    var _6 = bind(lh, rh);
    while ((_7 < length(_6))) {
      var _8 = _6[_7];
      var id = _8[0];
      var val = _8[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, variable);
      }
      add(locals, ["local", id, val]);
      _7 = (_7 + 1);
    }
  }, pairwise(bindings));
  return(join(["let-symbol", renames], join(locals, body)));
});

setenv("let-macro", function (definitions) {
  var body = unstash(sub(arguments, 1));
  add(environment, {});
  var embed63 = embed_macros63;
  embed_macros63 = false;
  map(function (m) {
    return((compiler("define-macro"))(m));
  }, definitions);
  embed_macros63 = embed63;
  var body1 = macroexpand(body);
  drop(environment);
  return(join(["do"], body1));
});

setenv("let-symbol", function (expansions) {
  var body = unstash(sub(arguments, 1));
  add(environment, {});
  map(function (_10) {
    var name = _10[0];
    var expr = _10[1];
    return(setenv(name, expr));
  }, pairwise(expansions));
  var body1 = macroexpand(body);
  drop(environment);
  return(join(["do"], body1));
});

setenv("define-symbol", function (name, expansion) {
  setenv(name, expansion);
  return(undefined);
});

setenv("define", function (name, x) {
  var body = unstash(sub(arguments, 2));
  if (!(empty63(body))) {
    x = join(["fn", x], body);
  }
  return(["set", name, x]);
});

setenv("fn", function (args) {
  var body = unstash(sub(arguments, 1));
  var _12 = bind_arguments(args, body);
  var args1 = _12[0];
  var body1 = _12[1];
  return(join(["function", args1], body1));
});

setenv("across", function (_14) {
  var l = _14[0];
  var v = _14[1];
  var i = _14[2];
  var start = _14[3];
  var body = unstash(sub(arguments, 1));
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(body, [["inc", i]]))]]);
});

setenv("set-of", function () {
  var elements = unstash(sub(arguments, 0));
  return(join(["object"], map(function (x) {
    return(splice([x, true]));
  }, elements)));
});

setenv("with-scope", function (_18, expr) {
  var bound = _18[0];
  var result = make_id();
  var arg = make_id();
  return(["do", ["add", "environment", ["table"]], ["across", [bound, arg], ["setenv", arg, "variable"]], ["let", [result, expr], ["drop", "environment"], result]]);
});

setenv("quasiquote", function (form) {
  return(quasiexpand(form, 1));
});

setenv("language", function () {
  return(["quote", target]);
});

setenv("target", function () {
  var clauses = unstash(sub(arguments, 0));
  return(find(function (x) {
    if ((hd(x) === target)) {
      return(x[1]);
    }
  }, clauses));
});

setenv("join*", function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
});

setenv("join!", function (a) {
  var bs = unstash(sub(arguments, 1));
  return(["set", a, join(["join*", a], bs)]);
});

setenv("list*", function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _30 = xs;
    while ((i < length(_30))) {
      var x = _30[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
});

setenv("each", function (_32) {
  var t = _32[0];
  var k = _32[1];
  var v = _32[2];
  var body = unstash(sub(arguments, 1));
  return(["for", [t, k, v], ["if", ["target", ["lua", ["not", ["number?", k]]], ["js", ["isNaN", ["parseInt", k]]]], join(["do"], body)]]);
});

setenv("cat!", function (a) {
  var bs = unstash(sub(arguments, 1));
  return(["set", a, join(["cat", a], bs)]);
});

setenv("inc", function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
});

setenv("dec", function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
});

setenv("pr", function () {
  var xs = unstash(sub(arguments, 0));
  return(["print", join(["cat"], map(function (x) {
    return(["to-string", x]);
  }, xs))]);
});

setenv("define-reader", function (_37) {
  var char = _37[0];
  var stream = _37[1];
  var body = unstash(sub(arguments, 1));
  return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
});

setenv("with-indent", function (form) {
  var result = make_id();
  return(["do", ["set", "indent-level", ["+", "indent-level", 1]], ["let", [result, form], ["set", "indent-level", ["-", "indent-level", 1]], result]]);
});

setenv("define-special", function (name, keys, args) {
  var body = unstash(sub(arguments, 3));
  return(["set", ["get", "special", ["quote", name]], join(["object", "compiler", join(["fn", args], body)], map(function (k) {
    return(splice([k, true]));
  }, keys))]);
});

main();
