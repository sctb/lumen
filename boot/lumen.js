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

symbol_expansion = function (k) {
  var x = getenv(k);
  return((x && x.symbol));
};

symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};

macro_function = function (k) {
  var x = getenv(k);
  return((x && x.macro));
};

macro63 = function (k) {
  return(is63(macro_function(k)));
};

variable63 = function (k) {
  var x = last(environment)[k];
  return((x && x.variable));
};

bound63 = function (x) {
  return((symbol63(x) || macro63(x) || variable63(x)));
};

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
    var _g30 = args;
    for (k in _g30) {
      if (isNaN(parseInt(k))) {
        var v = _g30[k];
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
    var _g31 = args;
    for (k in _g31) {
      if (isNaN(parseInt(k))) {
        var v = _g31[k];
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
      var _g32 = l;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
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
    var _g34 = 0;
    var _g33 = args;
    while ((_g34 < length(_g33))) {
      var arg = _g33[_g34];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g34 = (_g34 + 1);
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
    var _g35 = lh;
    while ((i < length(_g35))) {
      var x = _g35[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g36 = lh;
    for (k in _g36) {
      if (isNaN(parseInt(k))) {
        var v = _g36[k];
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
  var _g37 = bind_arguments(args, body);
  var _g38 = _g37[0];
  var _g39 = _g37[1];
  add(environment, {});
  var _g41 = 0;
  var _g40 = _g38;
  while ((_g41 < length(_g40))) {
    var arg = _g40[_g41];
    setenv(arg, {variable: true});
    _g41 = (_g41 + 1);
  }
  var _g42 = macroexpand(_g39);
  drop(environment);
  return([_g38, _g42]);
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
    return(macroexpand(symbol_expansion(form)));
  } else if (atom63(form)) {
    return(form);
  } else {
    var name = hd(form);
    if (self_expanding63(name)) {
      return(form);
    } else if (macro63(name)) {
      return(macroexpand(apply(macro_function(name), tl(form))));
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
  var _g43 = form;
  for (k in _g43) {
    if (isNaN(parseInt(k))) {
      var v = _g43[k];
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
  var _g45 = 0;
  var _g44 = form;
  while ((_g45 < length(_g44))) {
    var x = _g44[_g45];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g45 = (_g45 + 1);
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
  var _g46 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g46, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g46, upto);
    var k = undefined;
    var _g47 = x;
    for (k in _g47) {
      if (isNaN(parseInt(k))) {
        var v = _g47[k];
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
    var _g48 = l1;
    for (k in _g48) {
      if (isNaN(parseInt(k))) {
        var v = _g48[k];
        l[k] = v;
      }
    }
    var _g50 = undefined;
    var _g49 = l2;
    for (_g50 in _g49) {
      if (isNaN(parseInt(_g50))) {
        var v = _g49[_g50];
        l[_g50] = v;
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
  var _g52 = 0;
  var _g51 = l;
  while ((_g52 < length(_g51))) {
    var x = _g51[_g52];
    if (f(x)) {
      add(l1, x);
    }
    _g52 = (_g52 + 1);
  }
  return(l1);
};

find = function (f, l) {
  var _g54 = 0;
  var _g53 = l;
  while ((_g54 < length(_g53))) {
    var x = _g53[_g54];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g54 = (_g54 + 1);
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
  var _g64 = 0;
  var _g63 = l;
  while ((_g64 < length(_g63))) {
    var x = _g63[_g64];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g64 = (_g64 + 1);
  }
  return(l1);
};

map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g65 = t;
  for (k in _g65) {
    if (isNaN(parseInt(k))) {
      var v = _g65[k];
      l[k] = f(v);
    }
  }
  return(l);
};

keys63 = function (t) {
  var k63 = false;
  var k = undefined;
  var _g66 = t;
  for (k in _g66) {
    if (isNaN(parseInt(k))) {
      var v = _g66[k];
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
  var _g67 = sub(xs, 0);
  if (empty63(_g67)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g67));
  }
};

_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g70 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g70));
};

_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g71 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g71)));
};

_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g72 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g72));
};

_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g73 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g73)));
};

_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g74 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g74)));
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
    var _g75 = x;
    for (k in _g75) {
      if (isNaN(parseInt(k))) {
        var v = _g75[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g76 = x1;
    while ((i < length(_g76))) {
      var y = _g76[i];
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
  var _g77 = stash(args);
  return((f.apply)(f, _g77));
};

id_count = 0;

make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};

delimiters = {";": true, "\n": true, "(": true, ")": true};

whitespace = {" ": true, "\n": true, "\t": true};

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

read_from_string = function (str) {
  return(read(make_stream(str)));
};

infix = {lua: {"~=": true, "=": "==", "or": true, "cat": "..", "and": true}, common: {"<": true, "-": true, "*": true, "+": true, ">": true, "/": true, ">=": true, "%": true, "<=": true}, js: {"~=": "!=", "=": "===", "or": "||", "and": "&&", "cat": "+"}};

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
  var _g81 = args;
  while ((i < length(_g81))) {
    var arg = _g81[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};

compile_body = function (forms) {
  var _g82 = unstash(sub(arguments, 1));
  var tail63 = _g82["tail?"];
  var str = "";
  var i = 0;
  var _g83 = forms;
  while ((i < length(_g83))) {
    var x = _g83[i];
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

compile_infix = function (_g84) {
  var op = _g84[0];
  var args = sub(_g84, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g85 = args;
  while ((i < length(_g85))) {
    var arg = _g85[i];
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
  var _g86 = (function () {
    indent_level = (indent_level + 1);
    var _g87 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g87);
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
    return((ind + "if (" + cond1 + ") {\n" + _g86 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g86 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g86 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g86 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g86 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g86 + tr));
  }
};

compile_function = function (args, body, name) {
  var _g88 = (name || "");
  var _g89 = compile_args(args);
  var _g90 = (function () {
    indent_level = (indent_level + 1);
    var _g91 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g91);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return(("function " + _g88 + _g89 + " {\n" + _g90 + ind + "}"));
  } else {
    return(("function " + _g88 + _g89 + "\n" + _g90 + ind + "end"));
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

special["do"] = {stmt: true, compiler: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, tr: true};

special["if"] = {stmt: true, compiler: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g96 = form;
  while ((i < length(_g96))) {
    var condition = _g96[i];
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
}, tr: true};

special["while"] = {stmt: true, compiler: function (form) {
  var condition = compile(hd(form));
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g97 = compile_body(tl(form));
    indent_level = (indent_level - 1);
    return(_g97);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, tr: true};

special["%for"] = {stmt: true, compiler: function (_g98) {
  var _g99 = _g98[0];
  var t = _g99[0];
  var k = _g99[1];
  var body = sub(_g98, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g100 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g100);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, tr: true};

special["%try"] = {stmt: true, compiler: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g101 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g101);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g102 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g102);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, tr: true};

special["break"] = {stmt: true, compiler: function (_g103) {
  return((indentation() + "break"));
}};

special["%function"] = {compiler: function (_g104) {
  var args = _g104[0];
  var body = sub(_g104, 1);
  return(compile_function(args, body));
}};

special["define-macro"] = {stmt: true, compiler: function (_g105) {
  var name = _g105[0];
  var args = _g105[1];
  var body = sub(_g105, 2);
  var form = join(["fn", args], body);
  var macro = ["setenv", ["quote", name], (function () {
    var _g106 = ["table"];
    _g106.macro = form;
    _g106.form = ["quote", form];
    return(_g106);
  })()];
  eval(macro);
  return("");
}, tr: true};

special["return"] = {stmt: true, compiler: function (_g107) {
  var x = _g107[0];
  return((indentation() + compile_call(["return", x])));
}};

special["error"] = {stmt: true, compiler: function (_g108) {
  var x = _g108[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}};

special["%local"] = {stmt: true, compiler: function (_g109) {
  var name = _g109[0];
  var value = _g109[1];
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

special["set"] = {stmt: true, compiler: function (_g110) {
  var lh = _g110[0];
  var rh = _g110[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}};

special["get"] = {compiler: function (_g111) {
  var t = _g111[0];
  var k = _g111[1];
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

special["not"] = {compiler: function (_g112) {
  var x = _g112[0];
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
  var _g113 = forms;
  while ((i < length(_g113))) {
    var x = _g113[i];
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
  var _g114 = pairs;
  while ((i < length(_g114))) {
    var _g115 = _g114[i];
    var k = _g115[0];
    var v = _g115[1];
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
  var _g116 = unstash(sub(arguments, 1));
  var stmt63 = _g116["stmt?"];
  var tail63 = _g116["tail?"];
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

compile_toplevel = function (form) {
  var _g117 = compile(macroexpand(form), {_stash: true, "stmt?": true});
  if ((_g117 === "")) {
    return("");
  } else {
    return((_g117 + "\n"));
  }
};

run = eval;

eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};

save_environment63 = false;

save_environment = function () {
  var env = ["define", "environment", ["list", ["table"]]];
  var output = compile_toplevel(env);
  var toplevel = hd(environment);
  var entries = {};
  var k = undefined;
  var _g118 = toplevel;
  for (k in _g118) {
    if (isNaN(parseInt(k))) {
      var v = _g118[k];
      var macro = v.macro;
      var symbol = v.symbol;
      var form = v.form;
      var entry = (function () {
        if (is63(macro)) {
          var _g119 = ["table"];
          _g119.macro = form;
          _g119.form = ["quote", form];
          return(_g119);
        } else if (is63(symbol)) {
          var _g120 = ["table"];
          _g120.symbol = ["quote", symbol];
          return(_g120);
        }
      })();
      if (entry) {
        entries[k] = entry;
      }
    }
  }
  var _g122 = undefined;
  var _g121 = entries;
  for (_g122 in _g121) {
    if (isNaN(parseInt(_g122))) {
      var v = _g121[_g122];
      var compiled = compile_toplevel(["setenv", ["quote", _g122], v]);
      output = (output + compiled);
    }
  }
  return(output);
};

compile_file = function (file) {
  var output = "";
  var s = make_stream(read_file(file));
  while (true) {
    var form = read(s);
    if ((form === eof)) {
      break;
    }
    output = (output + compile_toplevel(form));
  }
  return(output);
};

compile_files = function (files) {
  var output = "";
  var _g124 = 0;
  var _g123 = files;
  while ((_g124 < length(_g123))) {
    var file = _g123[_g124];
    output = (output + compile_file(file));
    _g124 = (_g124 + 1);
  }
  if (save_environment63) {
    return((output + save_environment()));
  } else {
    return(output);
  }
};

load_file = function (file) {
  return(run(compile_file(file)));
};

rep = function (str) {
  var _g126 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g127) {
      return([false, _g127]);
    }
  })();
  var _g125 = _g126[0];
  var x = _g126[1];
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
  var _g128 = args;
  while ((i < length(_g128))) {
    var arg = _g128[i];
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
      save_environment63 = true;
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
    return(write_file(output, (compiled + main)));
  } else {
    var _g130 = 0;
    var _g129 = inputs;
    while ((_g130 < length(_g129))) {
      var file = _g129[_g130];
      load_file(file);
      _g130 = (_g130 + 1);
    }
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};

environment = [{}];

setenv("quasiquote", {macro: function (form) {
  return(quasiexpand(form, 1));
}, form: ["fn", ["form"], ["quasiexpand", "form", 1]]});

setenv("fn", {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g131 = sub(body, 0);
  var _g132 = expand_function(args, _g131);
  var args = _g132[0];
  var _g133 = _g132[1];
  return(join(["%function", args], _g133));
}, form: ["fn", (function () {
  var _g134 = ["args"];
  _g134.rest = "body";
  return(_g134);
})(), ["let", [["args", "body"], ["expand-function", "args", "body"]], ["quasiquote", ["%function", ["unquote", "args"], ["unquote-splicing", "body"]]]]]});

setenv("table", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g135 = body;
  for (k in _g135) {
    if (isNaN(parseInt(k))) {
      var v = _g135[k];
      add(l, k);
      add(l, v);
    }
  }
  return(join(["%object"], l));
}, form: ["fn", "body", ["let", ["l", []], ["each", ["body", "k", "v"], ["add", "l", "k"], ["add", "l", "v"]], ["quasiquote", ["%object", ["unquote-splicing", "l"]]]]]});

setenv("at", {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, form: ["fn", ["l", "i"], ["if", ["and", ["=", "target", ["quote", "lua"]], ["number?", "i"]], ["inc", "i"], ["=", "target", ["quote", "lua"]], ["set", "i", ["quasiquote", ["+", ["unquote", "i"], 1]]]], ["quasiquote", ["get", ["unquote", "l"], ["unquote", "i"]]]]});

setenv("target", {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}, form: ["fn", "clauses", ["get", "clauses", "target"]]});

setenv("cat!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g136 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g136)]);
}, form: ["fn", (function () {
  var _g137 = ["a"];
  _g137.rest = "bs";
  return(_g137);
})(), ["quasiquote", ["set", ["unquote", "a"], ["cat", ["unquote", "a"], ["unquote-splicing", "bs"]]]]]});

setenv("let", {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g138 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g139) {
    var lh = _g139[0];
    var rh = _g139[1];
    var _g141 = 0;
    var _g140 = bind(lh, rh);
    while ((_g141 < length(_g140))) {
      var _g142 = _g140[_g141];
      var id = _g142[0];
      var val = _g142[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {variable: true});
      }
      add(locals, ["%local", id, val]);
      _g141 = (_g141 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g138)])));
}, form: ["fn", (function () {
  var _g143 = ["bindings"];
  _g143.rest = "body";
  return(_g143);
})(), ["let", ["i", 0, "renames", [], "locals", []], ["map", ["fn", [["lh", "rh"]], ["across", [["bind", "lh", "rh"], ["id", "val"]], ["if", ["bound?", "id"], ["let", ["rename", ["make-id"]], ["add", "renames", "id"], ["add", "renames", "rename"], ["set", "id", "rename"]], ["setenv", "id", (function () {
  var _g144 = ["table"];
  _g144.variable = true;
  return(_g144);
})()]], ["add", "locals", ["quasiquote", ["%local", ["unquote", "id"], ["unquote", "val"]]]]]], ["pairwise", "bindings"]], ["quasiquote", ["do", ["unquote-splicing", "locals"], ["let-symbol", ["unquote", "renames"], ["unquote-splicing", "body"]]]]]]});

setenv("dec", {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["-", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]]});

setenv("define-symbol", {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}, form: ["fn", ["name", "expansion"], ["setenv", "name", (function () {
  var _g145 = ["table"];
  _g145.symbol = "expansion";
  return(_g145);
})()], "nil"]});

setenv("set-of", {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g147 = 0;
  var _g146 = elements;
  while ((_g147 < length(_g146))) {
    var e = _g146[_g147];
    l[e] = true;
    _g147 = (_g147 + 1);
  }
  return(join(["table"], l));
}, form: ["fn", "elements", ["let", ["l", []], ["across", ["elements", "e"], ["set", ["get", "l", "e"], true]], ["quasiquote", ["table", ["unquote-splicing", "l"]]]]]});

setenv("pr", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, form: ["fn", "xs", ["let", ["xs", ["map", ["fn", ["x"], ["splice", ["quasiquote", [["to-string", ["unquote", "x"]], "\" \""]]]], "xs"]], ["quasiquote", ["print", ["cat", ["unquote-splicing", "xs"]]]]]]});

setenv("quote", {macro: function (form) {
  return(quoted(form));
}, form: ["fn", ["form"], ["quoted", "form"]]});

setenv("let-symbol", {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g148 = sub(body, 0);
  add(environment, {});
  map(function (_g149) {
    var name = _g149[0];
    var exp = _g149[1];
    return(setenv(name, {symbol: exp}));
  }, pairwise(expansions));
  var _g150 = macroexpand(_g148);
  drop(environment);
  return(join(["do"], _g150));
}, form: ["fn", (function () {
  var _g151 = ["expansions"];
  _g151.rest = "body";
  return(_g151);
})(), ["add", "environment", ["table"]], ["map", ["fn", [["name", "exp"]], ["setenv", "name", (function () {
  var _g152 = ["table"];
  _g152.symbol = "exp";
  return(_g152);
})()]], ["pairwise", "expansions"]], ["let", ["body", ["macroexpand", "body"]], ["drop", "environment"], ["quasiquote", ["do", ["unquote-splicing", "body"]]]]]});

setenv("define", {macro: function (name, x) {
  var body = unstash(sub(arguments, 2));
  var _g153 = sub(body, 0);
  if (!(empty63(_g153))) {
    x = join(["fn", x], _g153);
  }
  return(["set", name, x]);
}, form: ["fn", (function () {
  var _g154 = ["name", "x"];
  _g154.rest = "body";
  return(_g154);
})(), ["if", ["not", ["empty?", "body"]], ["set", "x", ["quasiquote", ["fn", ["unquote", "x"], ["unquote-splicing", "body"]]]]], ["quasiquote", ["set", ["unquote", "name"], ["unquote", "x"]]]]});

setenv("guard", {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, form: ["fn", ["expr"], ["if", ["=", "target", ["quote", "js"]], ["quasiquote", [["fn", [], ["%try", ["list", true, ["unquote", "expr"]]]]]], ["let", ["e", ["make-id"], "x", ["make-id"], "ex", ["cat", "\"|\"", "e", "\",\"", "x", "\"|\""]], ["quasiquote", ["let", [["unquote", "ex"], ["xpcall", ["fn", [], ["unquote", "expr"]], "message-handler"]], ["list", ["unquote", "e"], ["unquote", "x"]]]]]]]});

setenv("list*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g155 = xs;
    while ((i < length(_g155))) {
      var x = _g155[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, form: ["fn", "xs", ["if", ["empty?", "xs"], [], ["let", ["l", []], ["across", ["xs", "x", "i"], ["if", ["=", "i", ["-", ["length", "xs"], 1]], ["set", "l", ["list", ["quote", "join"], ["join", ["quote", ["list"]], "l"], "x"]], ["add", "l", "x"]]], "l"]]]});

setenv("inc", {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, form: ["fn", ["n", "by"], ["quasiquote", ["set", ["unquote", "n"], ["+", ["unquote", "n"], ["unquote", ["or", "by", 1]]]]]]});

setenv("define-reader", {macro: function (_g156) {
  var char = _g156[0];
  var stream = _g156[1];
  var body = unstash(sub(arguments, 1));
  var _g157 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g157)]);
}, form: ["fn", (function () {
  var _g158 = [["char", "stream"]];
  _g158.rest = "body";
  return(_g158);
})(), ["quasiquote", ["set", ["get", "read-table", ["unquote", "char"]], ["fn", [["unquote", "stream"]], ["unquote-splicing", "body"]]]]]});

setenv("list", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g159 = body;
    for (k in _g159) {
      if (isNaN(parseInt(k))) {
        var v = _g159[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, form: ["fn", "body", ["let", ["l", ["quasiquote", ["%array", ["unquote-splicing", "body"]]]], ["if", ["not", ["keys?", "body"]], "l", ["let", ["id", ["make-id"], "init", []], ["each", ["body", "k", "v"], ["add", "init", ["quasiquote", ["set", ["get", ["unquote", "id"], ["quote", ["unquote", "k"]]], ["unquote", "v"]]]]], ["quasiquote", ["let", [["unquote", "id"], ["unquote", "l"]], ["unquote-splicing", "init"], ["unquote", "id"]]]]]]]});

setenv("across", {macro: function (_g160) {
  var l = _g160[0];
  var v = _g160[1];
  var i = _g160[2];
  var start = _g160[3];
  var body = unstash(sub(arguments, 1));
  var _g161 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g161, [["inc", i]]))]]);
}, form: ["fn", (function () {
  var _g162 = [["l", "v", "i", "start"]];
  _g162.rest = "body";
  return(_g162);
})(), ["let", ["l1", ["make-id"]], ["set", "i", ["or", "i", ["make-id"]]], ["set", "start", ["or", "start", 0]], ["quasiquote", ["let", [["unquote", "i"], ["unquote", "start"], ["unquote", "l1"], ["unquote", "l"]], ["while", ["<", ["unquote", "i"], ["length", ["unquote", "l1"]]], ["let", [["unquote", "v"], ["at", ["unquote", "l1"], ["unquote", "i"]]], ["unquote-splicing", "body"], ["inc", ["unquote", "i"]]]]]]]]});

setenv("each", {macro: function (_g163) {
  var t = _g163[0];
  var k = _g163[1];
  var v = _g163[2];
  var body = unstash(sub(arguments, 1));
  var _g164 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g165 = ["target"];
    _g165.lua = ["not", ["number?", k]];
    _g165.js = ["isNaN", ["parseInt", k]];
    return(_g165);
  })(), join(["let", [v, ["get", t1, k]]], _g164)]]]);
}, form: ["fn", (function () {
  var _g166 = [["t", "k", "v"]];
  _g166.rest = "body";
  return(_g166);
})(), ["let", ["t1", ["make-id"]], ["quasiquote", ["let", [["unquote", "k"], "nil", ["unquote", "t1"], ["unquote", "t"]], ["%for", [["unquote", "t1"], ["unquote", "k"]], ["if", (function () {
  var _g167 = ["target"];
  _g167.js = ["isNaN", ["parseInt", ["unquote", "k"]]];
  _g167.lua = ["not", ["number?", ["unquote", "k"]]];
  return(_g167);
})(), ["let", [["unquote", "v"], ["get", ["unquote", "t1"], ["unquote", "k"]]], ["unquote-splicing", "body"]]]]]]]]});

setenv("define-special", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g168 = sub(body, 0);
  return(["set", ["get", "special", ["quote", name]], join((function () {
    var _g169 = ["table"];
    _g169.compiler = join(["fn", args], _g168);
    return(_g169);
  })(), _g168)]);
}, form: ["fn", (function () {
  var _g170 = ["name", "args"];
  _g170.rest = "body";
  return(_g170);
})(), ["quasiquote", ["set", ["get", "special", ["quote", ["unquote", "name"]]], (function () {
  var _g171 = ["table", ["unquote-splicing", "body"]];
  _g171.compiler = ["fn", ["unquote", "args"], ["unquote-splicing", "body"]];
  return(_g171);
})()]]]});

setenv("join*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, form: ["fn", "xs", ["reduce", ["fn", ["a", "b"], ["list", ["quote", "join"], "a", "b"]], "xs"]]});

setenv("let-macro", {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g172 = sub(body, 0);
  add(environment, {});
  map(function (m) {
    return(compile(join(["define-macro"], m)));
  }, definitions);
  var _g173 = macroexpand(_g172);
  drop(environment);
  return(join(["do"], _g173));
}, form: ["fn", (function () {
  var _g174 = ["definitions"];
  _g174.rest = "body";
  return(_g174);
})(), ["add", "environment", ["table"]], ["map", ["fn", ["m"], ["compile", ["quasiquote", ["define-macro", ["unquote-splicing", "m"]]]]], "definitions"], ["let", ["body", ["macroexpand", "body"]], ["drop", "environment"], ["quasiquote", ["do", ["unquote-splicing", "body"]]]]]});

setenv("language", {macro: function () {
  return(["quote", target]);
}, form: ["fn", [], ["quasiquote", ["quote", ["unquote", "target"]]]]});

setenv("with-indent", {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, form: ["fn", ["form"], ["let", ["result", ["make-id"]], ["quasiquote", ["do", ["inc", "indent-level"], ["let", [["unquote", "result"], ["unquote", "form"]], ["dec", "indent-level"], ["unquote", "result"]]]]]]});

setenv("join!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g175 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g175)]);
}, form: ["fn", (function () {
  var _g176 = ["a"];
  _g176.rest = "bs";
  return(_g176);
})(), ["quasiquote", ["set", ["unquote", "a"], ["join*", ["unquote", "a"], ["unquote-splicing", "bs"]]]]]});

main()