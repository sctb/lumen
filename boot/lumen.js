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

symbol63 = function (k) {
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
  return((symbol63(x) || macro63(x) || variable63(x)));
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
    var _g41 = args;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
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
    var _g42 = args;
    for (k in _g42) {
      if (isNaN(parseInt(k))) {
        var v = _g42[k];
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
      var _g43 = l;
      for (k in _g43) {
        if (isNaN(parseInt(k))) {
          var v = _g43[k];
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
    var _g45 = 0;
    var _g44 = args;
    while ((_g45 < length(_g44))) {
      var arg = _g44[_g45];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g45 = (_g45 + 1);
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
  if ((list63(lh) && list63(rh))) {
    var id = make_id();
    return(join([[id, rh]], bind(lh, id)));
  } else if (atom63(lh)) {
    return([[lh, rh]]);
  } else {
    var bs = [];
    var r = lh.rest;
    var i = 0;
    var _g46 = lh;
    while ((i < length(_g46))) {
      var x = _g46[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g47 = lh;
    for (k in _g47) {
      if (isNaN(parseInt(k))) {
        var v = _g47[k];
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

expand_function = function (args, body) {
  var _g48 = bind_arguments(args, body);
  var _g49 = _g48[0];
  var _g50 = _g48[1];
  add(environment, {});
  var _g52 = 0;
  var _g51 = _g49;
  while ((_g52 < length(_g51))) {
    var arg = _g51[_g52];
    setenv(arg, variable);
    _g52 = (_g52 + 1);
  }
  var _g53 = macroexpand(_g50);
  drop(environment);
  return([_g49, _g53]);
};

message_handler = function (msg) {
  var i = search(msg, ": ");
  return(sub(msg, (i + 2)));
};

self_expanding63 = function (x) {
  return(((x === "%function") || (x === "define-macro")));
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
    return(macroexpand(getenv(form)));
  } else if (atom63(form)) {
    return(form);
  } else {
    var name = hd(form);
    if (self_expanding63(name)) {
      return(form);
    } else if (macro63(name)) {
      return(macroexpand(apply(getenv(name), tl(form))));
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
  var _g54 = form;
  for (k in _g54) {
    if (isNaN(parseInt(k))) {
      var v = _g54[k];
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
  var _g56 = 0;
  var _g55 = form;
  while ((_g56 < length(_g55))) {
    var x = _g55[_g56];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g56 = (_g56 + 1);
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
  var _g57 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g57, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g57, upto);
    var k = undefined;
    var _g58 = x;
    for (k in _g58) {
      if (isNaN(parseInt(k))) {
        var v = _g58[k];
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
    var _g59 = l1;
    for (k in _g59) {
      if (isNaN(parseInt(k))) {
        var v = _g59[k];
        l[k] = v;
      }
    }
    var _g61 = undefined;
    var _g60 = l2;
    for (_g61 in _g60) {
      if (isNaN(parseInt(_g61))) {
        var v = _g60[_g61];
        l[_g61] = v;
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
  var _g63 = 0;
  var _g62 = l;
  while ((_g63 < length(_g62))) {
    var x = _g62[_g63];
    if (f(x)) {
      add(l1, x);
    }
    _g63 = (_g63 + 1);
  }
  return(l1);
};

find = function (f, l) {
  var _g65 = 0;
  var _g64 = l;
  while ((_g65 < length(_g64))) {
    var x = _g64[_g65];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g65 = (_g65 + 1);
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
  var _g77 = 0;
  var _g76 = l;
  while ((_g77 < length(_g76))) {
    var x = _g76[_g77];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g77 = (_g77 + 1);
  }
  return(l1);
};

map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g78 = t;
  for (k in _g78) {
    if (isNaN(parseInt(k))) {
      var v = _g78[k];
      l[k] = f(v);
    }
  }
  return(l);
};

keys63 = function (t) {
  var k63 = false;
  var k = undefined;
  var _g79 = t;
  for (k in _g79) {
    if (isNaN(parseInt(k))) {
      var v = _g79[k];
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
  var _g80 = sub(xs, 0);
  if (empty63(_g80)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g80));
  }
};

_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g83 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g83));
};

_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g84 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g84)));
};

_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g85 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g85));
};

_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g86 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g86)));
};

_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g87 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g87)));
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
    var _g88 = x;
    for (k in _g88) {
      if (isNaN(parseInt(k))) {
        var v = _g88[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g89 = x1;
    while ((i < length(_g89))) {
      var y = _g89[i];
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
  var _g90 = stash(args);
  return((f.apply)(f, _g90));
};

id_count = 0;

make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};

run = eval;

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

read_from_string = function (str) {
  return(read(make_stream(str)));
};

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
  var _g95 = args;
  while ((i < length(_g95))) {
    var arg = _g95[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};

compile_body = function (forms) {
  var _g96 = unstash(sub(arguments, 1));
  var tail63 = _g96["tail?"];
  var str = "";
  var i = 0;
  var _g97 = forms;
  while ((i < length(_g97))) {
    var x = _g97[i];
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
    return((compiler("%array"))(form));
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

compile_infix = function (_g98) {
  var op = _g98[0];
  var args = sub(_g98, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g99 = args;
  while ((i < length(_g99))) {
    var arg = _g99[i];
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
  var _g100 = (function () {
    indent_level = (indent_level + 1);
    var _g101 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g101);
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
    return((ind + "if (" + cond1 + ") {\n" + _g100 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g100 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g100 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g100 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g100 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g100 + tr));
  }
};

compile_function = function (args, body, name) {
  var _g102 = (name || "");
  var _g103 = compile_args(args);
  var _g104 = (function () {
    indent_level = (indent_level + 1);
    var _g105 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g105);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return(("function " + _g102 + _g103 + " {\n" + _g104 + ind + "}"));
  } else {
    return(("function " + _g102 + _g103 + "\n" + _g104 + ind + "end"));
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
    return(compile([["%function", [], form]], {_stash: true, "tail?": tail63}));
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
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true, tr: true};

special["if"] = {compiler: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g110 = form;
  while ((i < length(_g110))) {
    var condition = _g110[i];
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
    var _g111 = compile_body(tl(form));
    indent_level = (indent_level - 1);
    return(_g111);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, tr: true};

special["%for"] = {compiler: function (_g112) {
  var _g113 = _g112[0];
  var t = _g113[0];
  var k = _g113[1];
  var body = sub(_g112, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g114 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g114);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, tr: true};

special["%try"] = {compiler: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g115 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g115);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g116 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g116);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true, tr: true};

special["break"] = {compiler: function (_g117) {
  return((indentation() + "break"));
}, stmt: true};

special["%function"] = {compiler: function (_g118) {
  var args = _g118[0];
  var body = sub(_g118, 1);
  return(compile_function(args, body));
}};

macros = "";

special["define-macro"] = {compiler: function (_g119) {
  var name = _g119[0];
  var args = _g119[1];
  var body = sub(_g119, 2);
  var macro = ["setenv", ["quote", name], join(["fn", args], body)];
  eval(macro);
  if (embed_macros63) {
    macros = (macros + compile_toplevel(macro));
  }
  return("");
}, stmt: true, tr: true};

special["return"] = {compiler: function (_g120) {
  var x = _g120[0];
  return((indentation() + compile_call(["return", x])));
}, stmt: true};

special["error"] = {compiler: function (_g121) {
  var x = _g121[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true};

special["%local"] = {compiler: function (_g122) {
  var name = _g122[0];
  var value = _g122[1];
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

special["set"] = {compiler: function (_g123) {
  var lh = _g123[0];
  var rh = _g123[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true};

special["get"] = {compiler: function (_g124) {
  var t = _g124[0];
  var k = _g124[1];
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

special["not"] = {compiler: function (_g125) {
  var x = _g125[0];
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

special["%array"] = {compiler: function (forms) {
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
  var _g126 = forms;
  while ((i < length(_g126))) {
    var x = _g126[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}};

special["%object"] = {compiler: function (forms) {
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
  var _g127 = pairs;
  while ((i < length(_g127))) {
    var _g128 = _g127[i];
    var k = _g128[0];
    var v = _g128[1];
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

compile = function (form) {
  var _g129 = unstash(sub(arguments, 1));
  var stmt63 = _g129["stmt?"];
  var tail63 = _g129["tail?"];
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
  var _g131 = 0;
  var _g130 = files;
  while ((_g131 < length(_g130))) {
    var file = _g130[_g131];
    str = (str + compile_file(file));
    _g131 = (_g131 + 1);
  }
  return(str);
};

compile_toplevel = function (form) {
  var _g132 = compile(macroexpand(form), {_stash: true, "stmt?": true});
  if ((_g132 === "")) {
    return("");
  } else {
    return((_g132 + "\n"));
  }
};

rep = function (str) {
  var _g134 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g135) {
      return([false, _g135]);
    }
  })();
  var _g133 = _g134[0];
  var x = _g134[1];
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
  var _g136 = args;
  while ((i < length(_g136))) {
    var arg = _g136[i];
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
    var main = compile(["main"]);
    return(write_file(output, (compiled + macros + main)));
  } else {
    var _g138 = 0;
    var _g137 = inputs;
    while ((_g138 < length(_g137))) {
      var file = _g137[_g138];
      load_file(file);
      _g138 = (_g138 + 1);
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
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g2 = body;
    for (k in _g2) {
      if (isNaN(parseInt(k))) {
        var v = _g2[k];
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
  var _g4 = body;
  for (k in _g4) {
    if (isNaN(parseInt(k))) {
      var v = _g4[k];
      add(l, k);
      add(l, v);
    }
  }
  return(join(["%object"], l));
});

setenv("let", function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g10 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g11) {
    var lh = _g11[0];
    var rh = _g11[1];
    var _g13 = 0;
    var _g12 = bind(lh, rh);
    while ((_g13 < length(_g12))) {
      var _g14 = _g12[_g13];
      var id = _g14[0];
      var val = _g14[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, variable);
      }
      add(locals, ["%local", id, val]);
      _g13 = (_g13 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g10)])));
});

setenv("let-macro", function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g17 = sub(body, 0);
  add(environment, {});
  var embed63 = embed_macros63;
  embed_macros63 = false;
  map(function (m) {
    return((compiler("define-macro"))(m));
  }, definitions);
  embed_macros63 = embed63;
  var _g18 = macroexpand(_g17);
  drop(environment);
  return(join(["do"], _g18));
});

setenv("let-symbol", function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g22 = sub(body, 0);
  add(environment, {});
  map(function (_g23) {
    var name = _g23[0];
    var expr = _g23[1];
    return(setenv(name, expr));
  }, pairwise(expansions));
  var _g24 = macroexpand(_g22);
  drop(environment);
  return(join(["do"], _g24));
});

setenv("define-symbol", function (name, expansion) {
  setenv(name, expansion);
  return(undefined);
});

setenv("define", function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g26 = sub(body, 0);
  if (!(empty63(_g26))) {
    x = join(["fn", x], _g26);
  }
  return(["set", name, x]);
});

setenv("fn", function (args) {
  var body = unstash(sub(arguments, 1));
  var _g30 = sub(body, 0);
  var _g31 = expand_function(args, _g30);
  var args = _g31[0];
  var _g32 = _g31[1];
  return(join(["%function", args], _g32));
});

setenv("guard", function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
});

setenv("across", function (_g35) {
  var l = _g35[0];
  var v = _g35[1];
  var i = _g35[2];
  var start = _g35[3];
  var body = unstash(sub(arguments, 1));
  var _g36 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g36, [["inc", i]]))]]);
});

setenv("set-of", function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g40 = 0;
  var _g39 = elements;
  while ((_g40 < length(_g39))) {
    var e = _g39[_g40];
    l[e] = true;
    _g40 = (_g40 + 1);
  }
  return(join(["table"], l));
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
  var _g67 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g67)]);
});

setenv("list*", function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g69 = xs;
    while ((i < length(_g69))) {
      var x = _g69[i];
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

setenv("each", function (_g73) {
  var t = _g73[0];
  var k = _g73[1];
  var v = _g73[2];
  var body = unstash(sub(arguments, 1));
  var _g74 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g75 = ["target"];
    _g75.js = ["isNaN", ["parseInt", k]];
    _g75.lua = ["not", ["number?", k]];
    return(_g75);
  })(), join(["let", [v, ["get", t1, k]]], _g74)]]]);
});

setenv("cat!", function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g82 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g82)]);
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

setenv("define-reader", function (_g93) {
  var char = _g93[0];
  var stream = _g93[1];
  var body = unstash(sub(arguments, 1));
  var _g94 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g94)]);
});

setenv("with-indent", function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
});

setenv("define-special", function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g108 = sub(body, 0);
  return(["set", ["get", "special", ["quote", name]], join((function () {
    var _g109 = ["table"];
    _g109.compiler = join(["fn", args], _g108);
    return(_g109);
  })(), _g108)]);
});

main()