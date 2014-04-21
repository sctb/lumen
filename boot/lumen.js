environment = [{}];

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
      return(("\"\\\"" + inner(form) + "\\\"\""));
    } else if (string63(form)) {
      return(("\"" + form + "\""));
    } else {
      return(form);
    }
  } else {
    return(join(["list"], map42(quoted, form)));
  }
};

stash = function (args) {
  if (keys63(args)) {
    var p = {_stash: true};
    var k = undefined;
    var _19 = args;
    for (k in _19) {
      if (isNaN(parseInt(k))) {
        var v = _19[k];
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
    if ((composite63(l) && l._stash)) {
      var args1 = sub(args, 0, (length(args) - 1));
      var k = undefined;
      var _20 = l;
      for (k in _20) {
        if (isNaN(parseInt(k))) {
          var v = _20[k];
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
    var _22 = 0;
    var _21 = args;
    while ((_22 < length(_21))) {
      var arg = _21[_22];
      if (list63(arg)) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      } else {
        add(args1, arg);
      }
      _22 = (_22 + 1);
    }
    var r = args.rest;
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
    var bs = [];
    var i = 0;
    var _23 = lh;
    while ((i < length(_23))) {
      var x = _23[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (lh.rest) {
      bs = join(bs, bind(lh.rest, ["sub", rh, length(lh)]));
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

quasisplice63 = function (x, depth) {
  return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
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
    } else if ((name === "function")) {
      var _26 = form[0];
      var args = form[1];
      var body = sub(form, 2);
      add(environment, {});
      var _30 = 0;
      var _29 = args;
      while ((_30 < length(_29))) {
        var _28 = _29[_30];
        setenv(_28, variable);
        _30 = (_30 + 1);
      }
      var _27 = join([name, args], macroexpand(body));
      drop(environment);
      return(_27);
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
  var _31 = form;
  for (k in _31) {
    if (isNaN(parseInt(k))) {
      var v = _31[k];
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
  var _33 = 0;
  var _32 = form;
  while ((_33 < length(_32))) {
    var x = _32[_33];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _33 = (_33 + 1);
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
  var _34 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_34, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _34, upto);
    var k = undefined;
    var _35 = x;
    for (k in _35) {
      if (isNaN(parseInt(k))) {
        var v = _35[k];
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
    var _36 = l1;
    for (k in _36) {
      if (isNaN(parseInt(k))) {
        var v = _36[k];
        l[k] = v;
      }
    }
    var _38 = undefined;
    var _37 = l2;
    for (_38 in _37) {
      if (isNaN(parseInt(_38))) {
        var v = _37[_38];
        l[_38] = v;
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
  var _40 = 0;
  var _39 = l;
  while ((_40 < length(_39))) {
    var x = _39[_40];
    if (f(x)) {
      add(l1, x);
    }
    _40 = (_40 + 1);
  }
  return(l1);
};

find = function (f, l) {
  var _42 = 0;
  var _41 = l;
  while ((_42 < length(_41))) {
    var x = _41[_42];
    var x = f(x);
    if (x) {
      return(x);
    }
    _42 = (_42 + 1);
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
    return(x._splice);
  }
};

map = function (f, l) {
  var l1 = [];
  var _50 = 0;
  var _49 = l;
  while ((_50 < length(_49))) {
    var x = _49[_50];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _50 = (_50 + 1);
  }
  return(l1);
};

map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _51 = t;
  for (k in _51) {
    if (isNaN(parseInt(k))) {
      var v = _51[k];
      l[k] = f(v);
    }
  }
  return(l);
};

keys63 = function (t) {
  var k63 = false;
  var k = undefined;
  var _52 = t;
  for (k in _52) {
    if (isNaN(parseInt(k))) {
      var v = _52[k];
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
    var _53 = x;
    for (k in _53) {
      if (isNaN(parseInt(k))) {
        var v = _53[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _54 = x1;
    while ((i < length(_54))) {
      var y = _54[i];
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
  var _55 = stash(args);
  return((f.apply)(f, _55));
};

id_count = 0;

make_id = function (prefix) {
  id_count = (id_count + 1);
  return(("_" + (prefix || "") + id_count));
};

eval0 = eval;

run = function (x) {
  return(eval0(x));
};

eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};

delimiters = {"(": true, ")": true, ";": true, "\n": true};

whitespace = {" ": true, "\t": true, "\n": true};

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

read_from_string = function (str) {
  return(read(make_stream(str)));
};

infix = {lua: {"=": "==", "cat": "..", "and": true, "or": true, "~=": true}, js: {"=": "===", "cat": "+", "and": "&&", "or": "||", "~=": "!="}, common: {"%": true, "<=": true, ">=": true, "-": true, ">": true, "/": true, "*": true, "+": true, "<": true}};

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
  var str = "";
  iterate(function () {
    str = (str + "  ");
  }, indent_level);
  return(str);
};

compile_args = function (args) {
  var str = "(";
  var i = 0;
  var _58 = args;
  while ((i < length(_58))) {
    var arg = _58[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};

compile_body = function (forms, tail63) {
  var str = "";
  var i = 0;
  var _59 = forms;
  while ((i < length(_59))) {
    var x = _59[i];
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
  return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
};

valid_id63 = function (id) {
  if (empty63(id)) {
    return(false);
  } else if (special[id]) {
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
    throw "Unrecongnized atom";
  }
};

compile_call = function (form) {
  if (empty63(form)) {
    return((compiler("array"))(form));
  } else {
    var f = hd(form);
    var f1 = compile(f);
    var args = compile_args(tl(form));
    if (list63(f)) {
      return(("(" + f1 + ")" + args));
    } else if (string63(f)) {
      return((f1 + args));
    } else {
      throw "Invalid function call";
    }
  }
};

compile_infix = function (_60) {
  var op = _60[0];
  var args = sub(_60, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _61 = args;
  while ((i < length(_61))) {
    var arg = _61[i];
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
  var _62 = (function () {
    indent_level = (indent_level + 1);
    var _63 = compile(body, true, tail63);
    indent_level = (indent_level - 1);
    return(_63);
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
    return((ind + "if (" + cond1 + ") {\n" + _62 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _62 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _62 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _62 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _62 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _62 + tr));
  }
};

compile_function = function (args, body, name) {
  var _64 = (name || "");
  var _65 = compile_args(args);
  var _66 = (function () {
    indent_level = (indent_level + 1);
    var _67 = compile_body(body, true);
    indent_level = (indent_level - 1);
    return(_67);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return(("function " + _64 + _65 + " {\n" + _66 + ind + "}"));
  } else {
    return(("function " + _64 + _65 + "\n" + _66 + ind + "end"));
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
    var tr = terminator((stmt63 && !(self_tr63(name))));
    return(((compiler(name))(tl(form), tail63) + tr));
  }
};

special = {};

special63 = function (form) {
  return((list63(form) && is63(special[hd(form)])));
};

compiler = function (name) {
  return(special[name].compiler);
};

statement63 = function (name) {
  return(special[name].stmt);
};

self_tr63 = function (name) {
  return(special[name].tr);
};

special["do"] = {compiler: function (forms, tail63) {
  return(compile_body(forms, tail63));
}, stmt: true, tr: true};

special["if"] = {compiler: function (form, tail63) {
  var str = "";
  var i = 0;
  var _70 = form;
  while ((i < length(_70))) {
    var condition = _70[i];
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
}, stmt: true, tr: true};

special["while"] = {compiler: function (form) {
  var condition = compile(hd(form));
  var body = (function () {
    indent_level = (indent_level + 1);
    var _71 = compile_body(tl(form));
    indent_level = (indent_level - 1);
    return(_71);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, tr: true};

special["for"] = {compiler: function (_72) {
  var _73 = _72[0];
  var t = _73[0];
  var k = _73[1];
  var body = sub(_72, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _74 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_74);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, tr: true};

special["break"] = {stmt: true, compiler: function (_75) {
  return((indentation() + "break"));
}};

special["function"] = {compiler: function (_76) {
  var args = _76[0];
  var body = sub(_76, 1);
  return(compile_function(args, body));
}};

macros = "";

special["define-macro"] = {compiler: function (_77) {
  var name = _77[0];
  var args = _77[1];
  var body = sub(_77, 2);
  var macro = ["setenv", ["quote", name], join(["fn", args], body)];
  eval(macro);
  if (embed_macros63) {
    macros = (macros + compile_toplevel(macro));
  }
  return("");
}, stmt: true, tr: true};

special["return"] = {stmt: true, compiler: function (_78) {
  var x = _78[0];
  return((indentation() + compile_call(["return", x])));
}};

special["error"] = {stmt: true, compiler: function (_79) {
  var x = _79[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}};

special["local"] = {stmt: true, compiler: function (_80) {
  var name = _80[0];
  var value = _80[1];
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

special["set"] = {stmt: true, compiler: function (_81) {
  var lh = _81[0];
  var rh = _81[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}};

special["get"] = {compiler: function (_82) {
  var t = _82[0];
  var k = _82[1];
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

special["not"] = {compiler: function (_83) {
  var x = _83[0];
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
  var _84 = forms;
  while ((i < length(_84))) {
    var x = _84[i];
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
  var sep = (function () {
    if ((target === "lua")) {
      return(" = ");
    } else {
      return(": ");
    }
  })();
  var pairs = pairwise(forms);
  var i = 0;
  var _85 = pairs;
  while ((i < length(_85))) {
    var _86 = _85[i];
    var k = _86[0];
    var v = _86[1];
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

can_return63 = function (form) {
  return((!(special63(form)) || !(statement63(hd(form)))));
};

compile = function (form, stmt63, tail63) {
  if ((tail63 && can_return63(form))) {
    form = ["return", form];
  }
  if (nil63(form)) {
    return("");
  } else if (special63(form)) {
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
    var _87 = (function () {
      if (atom63(form)) {
        return(compile_atom(form));
      } else if (infix63(form)) {
        return(compile_infix(form));
      } else {
        return(compile_call(form));
      }
    })();
    return((ind + _87 + tr));
  }
};

map_forms = function (f, file) {
  var s = make_stream(read_file(file));
  while (true) {
    var form = read(s);
    if ((form === eof)) {
      break;
    }
    f(form);
  }
};

load_file = function (file) {
  return(map_forms(eval, file));
};

compile_file = function (file) {
  var str = "";
  map_forms(function (form) {
    str = (str + compile_toplevel(form));
  }, file);
  return(str);
};

compile_files = function (files) {
  var str = "";
  var _89 = 0;
  var _88 = files;
  while ((_89 < length(_88))) {
    var file = _88[_89];
    str = (str + compile_file(file));
    _89 = (_89 + 1);
  }
  return(str);
};

compile_toplevel = function (form) {
  var _90 = compile(macroexpand(form), true, false, true);
  if ((_90 === "")) {
    return("");
  } else {
    return((_90 + "\n"));
  }
};

rep = function (str) {
  var x = eval(read_from_string(str));
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
  (process.stdin.resume)();
  (process.stdin.setEncoding)("utf8");
  return((process.stdin.on)("data", step));
};

usage = function () {
  print((to_string("usage: x [options] [inputs]") + " "));
  print((to_string("options:") + " "));
  print((to_string("  -o <output>\tOutput file") + " "));
  print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
  print((to_string("  -e <expr>\tExpression to evaluate") + " "));
  print((to_string("  -m \t\tEmbed macro definitions in output") + " "));
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
  var _91 = args;
  while ((i < length(_91))) {
    var arg = _91[i];
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
    } else if ((arg === "-m")) {
      embed_macros63 = true;
    } else if (("-" != char(arg, 0))) {
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
    var _93 = 0;
    var _92 = inputs;
    while ((_93 < length(_92))) {
      var file = _92[_93];
      load_file(file);
      _93 = (_93 + 1);
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
    var k = undefined;
    var _2 = body;
    for (k in _2) {
      if (isNaN(parseInt(k))) {
        var v = _2[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
});

setenv("table", function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _4 = body;
  for (k in _4) {
    if (isNaN(parseInt(k))) {
      var v = _4[k];
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
  map(function (_9) {
    var lh = _9[0];
    var rh = _9[1];
    var _11 = 0;
    var _10 = bind(lh, rh);
    while ((_11 < length(_10))) {
      var _12 = _10[_11];
      var id = _12[0];
      var val = _12[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, variable);
      }
      add(locals, ["local", id, val]);
      _11 = (_11 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], body)])));
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
  var body = macroexpand(body);
  drop(environment);
  return(join(["do"], body));
});

setenv("let-symbol", function (expansions) {
  var body = unstash(sub(arguments, 1));
  add(environment, {});
  map(function (_14) {
    var name = _14[0];
    var expr = _14[1];
    return(setenv(name, expr));
  }, pairwise(expansions));
  var body = macroexpand(body);
  drop(environment);
  return(join(["do"], body));
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
  var _16 = bind_arguments(args, body);
  var args = _16[0];
  var body = _16[1];
  return(join(["function", args], body));
});

setenv("across", function (_18) {
  var l = _18[0];
  var v = _18[1];
  var i = _18[2];
  var start = _18[3];
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

setenv("with-scope", function (_25, expr) {
  var bound = _25[0];
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
  return(clauses[target]);
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
    var _44 = xs;
    while ((i < length(_44))) {
      var x = _44[i];
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

setenv("each", function (_47) {
  var t = _47[0];
  var k = _47[1];
  var v = _47[2];
  var body = unstash(sub(arguments, 1));
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["for", [t1, k], ["if", (function () {
    var _48 = ["target"];
    _48.js = ["isNaN", ["parseInt", k]];
    _48.lua = ["not", ["number?", k]];
    return(_48);
  })(), join(["let", [v, ["get", t1, k]]], body)]]]);
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
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
});

setenv("define-reader", function (_57) {
  var char = _57[0];
  var stream = _57[1];
  var body = unstash(sub(arguments, 1));
  return(["set", ["get", "read-table", char], join(["fn", [stream]], body)]);
});

setenv("with-indent", function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
});

setenv("define-special", function (name, args) {
  var body = unstash(sub(arguments, 2));
  return(["set", ["get", "special", ["quote", name]], join((function () {
    var _69 = ["table"];
    _69.compiler = join(["fn", args], body);
    return(_69);
  })(), body)]);
});

main();
