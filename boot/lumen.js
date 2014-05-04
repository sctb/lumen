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
    var _g39 = args;
    for (k in _g39) {
      if (isNaN(parseInt(k))) {
        var v = _g39[k];
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
    var _g40 = args;
    for (k in _g40) {
      if (isNaN(parseInt(k))) {
        var v = _g40[k];
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
      var _g41 = l;
      for (k in _g41) {
        if (isNaN(parseInt(k))) {
          var v = _g41[k];
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
    var _g43 = 0;
    var _g42 = args;
    while ((_g43 < length(_g42))) {
      var arg = _g42[_g43];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g43 = (_g43 + 1);
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
    var _g44 = lh;
    while ((i < length(_g44))) {
      var x = _g44[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g45 = lh;
    for (k in _g45) {
      if (isNaN(parseInt(k))) {
        var v = _g45[k];
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
    var name = hd(form);
    if ((name === "%for")) {
      var _g1 = form[0];
      var _g46 = form[1];
      var t = _g46[0];
      var k = _g46[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((name === "%function")) {
      var _g2 = form[0];
      var args = form[1];
      var _g47 = sub(form, 2);
      add(environment, {});
      var _g49 = 0;
      var _g48 = args;
      while ((_g49 < length(_g48))) {
        var arg = _g48[_g49];
        setenv(arg, {variable: true});
        _g49 = (_g49 + 1);
      }
      var expanded = join(["%function", map42(macroexpand, args)], macroexpand(_g47));
      drop(environment);
      return(expanded);
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
  var _g50 = form;
  for (k in _g50) {
    if (isNaN(parseInt(k))) {
      var v = _g50[k];
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
  var _g52 = 0;
  var _g51 = form;
  while ((_g52 < length(_g51))) {
    var x = _g51[_g52];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g52 = (_g52 + 1);
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
  var _g53 = (from || 0);
  if (string63(x)) {
    return((x.substring)(_g53, upto));
  } else {
    var l = (Array.prototype.slice.call)(x, _g53, upto);
    var k = undefined;
    var _g54 = x;
    for (k in _g54) {
      if (isNaN(parseInt(k))) {
        var v = _g54[k];
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
    var _g55 = l1;
    for (k in _g55) {
      if (isNaN(parseInt(k))) {
        var v = _g55[k];
        l[k] = v;
      }
    }
    var _g57 = undefined;
    var _g56 = l2;
    for (_g57 in _g56) {
      if (isNaN(parseInt(_g57))) {
        var v = _g56[_g57];
        l[_g57] = v;
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
  var _g59 = 0;
  var _g58 = l;
  while ((_g59 < length(_g58))) {
    var x = _g58[_g59];
    if (f(x)) {
      add(l1, x);
    }
    _g59 = (_g59 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g61 = 0;
  var _g60 = l;
  while ((_g61 < length(_g60))) {
    var x = _g60[_g61];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g61 = (_g61 + 1);
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
  var _g71 = 0;
  var _g70 = l;
  while ((_g71 < length(_g70))) {
    var x = _g70[_g71];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g71 = (_g71 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g72 = t;
  for (k in _g72) {
    if (isNaN(parseInt(k))) {
      var v = _g72[k];
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
  var _g73 = t;
  for (k in _g73) {
    if (isNaN(parseInt(k))) {
      var v = _g73[k];
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
  var _g74 = sub(xs, 0);
  if (empty63(_g74)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g74));
  }
};
_43 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g77 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g77));
};
_ = function () {
  var xs = unstash(sub(arguments, 0));
  var _g78 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g78)));
};
_42 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g79 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g79));
};
_47 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g80 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g80)));
};
_37 = function () {
  var xs = unstash(sub(arguments, 0));
  var _g81 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g81)));
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
    var _g82 = x;
    for (k in _g82) {
      if (isNaN(parseInt(k))) {
        var v = _g82[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g83 = x1;
    while ((i < length(_g83))) {
      var y = _g83[i];
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
  var _g84 = stash(args);
  return((f.apply)(f, _g84));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
delimiters = {";": true, ")": true, "\n": true, "(": true};
whitespace = {" ": true, "\t": true, "\n": true};
make_stream = function (str) {
  return({string: str, pos: 0, len: length(str)});
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
infix = {common: {"%": true, "-": true, ">": true, "/": true, "<": true, "<=": true, "*": true, "+": true, ">=": true}, js: {"=": "===", "cat": "+", "and": "&&", "or": "||", "~=": "!="}, lua: {"=": "==", "cat": "..", "and": true, "or": true, "~=": true}};
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
  var _g89 = args;
  while ((i < length(_g89))) {
    var arg = _g89[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g90 = unstash(sub(arguments, 1));
  var tail63 = _g90["tail?"];
  var str = "";
  var i = 0;
  var _g91 = forms;
  while ((i < length(_g91))) {
    var x = _g91[i];
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
compile_infix = function (_g92) {
  var op = _g92[0];
  var args = sub(_g92, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g93 = args;
  while ((i < length(_g93))) {
    var arg = _g93[i];
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
  var _g94 = (function () {
    indent_level = (indent_level + 1);
    var _g95 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g95);
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
    return((ind + "if (" + cond1 + ") {\n" + _g94 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g94 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g94 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g94 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g94 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g94 + tr));
  }
};
compile_function = function (args, body, name) {
  var _g96 = (name || "");
  var _g97 = compile_args(args);
  var _g98 = (function () {
    indent_level = (indent_level + 1);
    var _g99 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g99);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return(("function " + _g96 + _g97 + " {\n" + _g98 + ind + "}"));
  } else {
    return(("function " + _g96 + _g97 + "\n" + _g98 + ind + "end"));
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
  var _g100 = getenv(hd(form));
  var special = _g100.special;
  var stmt = _g100.stmt;
  var self_tr63 = _g100.tr;
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
  var _g135 = unstash(sub(arguments, 1));
  var stmt63 = _g135["stmt?"];
  var tail63 = _g135["tail?"];
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
run = eval;
eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};
save_environment63 = false;
quote_binding = function (x) {
  if (is63(x.symbol)) {
    var _g136 = ["table"];
    _g136.symbol = ["quote", x.symbol];
    return(_g136);
  } else if ((x.macro && x.form)) {
    var _g137 = ["table"];
    _g137.macro = x.form;
    return(_g137);
  } else if ((x.special && x.form)) {
    var stmt = x.stmt;
    var tr = x.tr;
    var _g138 = ["table"];
    _g138.special = x.form;
    _g138.stmt = stmt;
    _g138.tr = tr;
    return(_g138);
  }
};
save_environment = function () {
  var env = ["define", "environment", ["list", ["table"]]];
  var output = compile_toplevel(env);
  var toplevel = hd(environment);
  var k = undefined;
  var _g139 = map42(quote_binding, toplevel);
  for (k in _g139) {
    if (isNaN(parseInt(k))) {
      var v = _g139[k];
      var compiled = compile_toplevel(["setenv", ["quote", k], v]);
      output = (output + compiled);
    }
  }
  return(output);
};
compile_file = function (file) {
  var body = [];
  var s = make_stream(read_file(file));
  while (true) {
    var form = read(s);
    if ((form === eof)) {
      break;
    }
    add(body, form);
  }
  return(compile_toplevel(join(["do"], body)));
};
compile_files = function (files) {
  var output = "";
  var _g141 = 0;
  var _g140 = files;
  while ((_g141 < length(_g140))) {
    var file = _g140[_g141];
    output = (output + compile_file(file));
    _g141 = (_g141 + 1);
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
  var _g143 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g147) {
      return([false, _g147]);
    }
  })();
  var _g142 = _g143[0];
  var x = _g143[1];
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
  var _g144 = args;
  while ((i < length(_g144))) {
    var arg = _g144[i];
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
    var _g146 = 0;
    var _g145 = inputs;
    while ((_g146 < length(_g145))) {
      var file = _g145[_g146];
      load_file(file);
      _g146 = (_g146 + 1);
    }
    if (expr) {
      return(rep(expr));
    } else {
      return(repl());
    }
  }
};
environment = [{}];
setenv("%for", {special: function (_g148) {
  var _g149 = _g148[0];
  var t = _g149[0];
  var k = _g149[1];
  var body = sub(_g148, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g150 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g150);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, stmt: true, tr: true});
setenv("with-indent", {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}});
setenv("cat!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g151 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g151)]);
}});
setenv("define-macro", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g152 = sub(body, 0);
  var form = join(["fn", args], _g152);
  var value = (function () {
    var _g153 = ["table"];
    _g153.macro = form;
    _g153.form = ["quote", form];
    return(_g153);
  })();
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("define-special", {macro: function (name, args) {
  var body = unstash(sub(arguments, 2));
  var _g154 = sub(body, 0);
  var form = join(["fn", args], _g154);
  var value = join((function () {
    var _g155 = ["table"];
    _g155.special = form;
    _g155.form = ["quote", form];
    return(_g155);
  })(), _g154);
  var binding = ["setenv", ["quote", name], value];
  eval(binding);
  return(undefined);
}});
setenv("let-macro", {macro: function (definitions) {
  var body = unstash(sub(arguments, 1));
  var _g156 = sub(body, 0);
  add(environment, {});
  map(function (m) {
    return(macroexpand(join(["define-macro"], m)));
  }, definitions);
  var _g157 = macroexpand(_g156);
  drop(environment);
  return(join(["do"], _g157));
}});
setenv("inc", {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}});
setenv("across", {macro: function (_g158) {
  var l = _g158[0];
  var v = _g158[1];
  var i = _g158[2];
  var start = _g158[3];
  var body = unstash(sub(arguments, 1));
  var _g159 = sub(body, 0);
  var l1 = make_id();
  i = (i || make_id());
  start = (start || 0);
  return(["let", [i, start, l1, l], ["while", ["<", i, ["length", l1]], join(["let", [v, ["at", l1, i]]], join(_g159, [["inc", i]]))]]);
}});
setenv("each", {macro: function (_g160) {
  var t = _g160[0];
  var k = _g160[1];
  var v = _g160[2];
  var body = unstash(sub(arguments, 1));
  var _g161 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g162 = ["target"];
    _g162.js = ["isNaN", ["parseInt", k]];
    _g162.lua = ["not", ["number?", k]];
    return(_g162);
  })(), join(["let", [v, ["get", t1, k]]], _g161)]]]);
}});
setenv("quote", {macro: function (form) {
  return(quoted(form));
}});
setenv("table", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = [];
  var k = undefined;
  var _g163 = body;
  for (k in _g163) {
    if (isNaN(parseInt(k))) {
      var v = _g163[k];
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
  var _g164 = sub(body, 0);
  if (!(empty63(_g164))) {
    x = join(["fn", x], _g164);
  }
  return(["set", name, x]);
}});
setenv("set-of", {macro: function () {
  var elements = unstash(sub(arguments, 0));
  var l = [];
  var _g166 = 0;
  var _g165 = elements;
  while ((_g166 < length(_g165))) {
    var e = _g165[_g166];
    l[e] = true;
    _g166 = (_g166 + 1);
  }
  return(join(["table"], l));
}});
setenv("%try", {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g167 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g167);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g168 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g168);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, stmt: true, tr: true});
setenv("%function", {special: function (_g169) {
  var args = _g169[0];
  var body = sub(_g169, 1);
  return(compile_function(args, body));
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
  var _g170 = pairs;
  while ((i < length(_g170))) {
    var _g171 = _g170[i];
    var k = _g171[0];
    var v = _g171[1];
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
setenv("define-reader", {macro: function (_g172) {
  var char = _g172[0];
  var stream = _g172[1];
  var body = unstash(sub(arguments, 1));
  var _g173 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g173)]);
}});
setenv("quasiquote", {macro: function (form) {
  return(quasiexpand(form, 1));
}});
setenv("if", {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g174 = form;
  while ((i < length(_g174))) {
    var condition = _g174[i];
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
}, stmt: true, tr: true});
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
  var _g175 = forms;
  while ((i < length(_g175))) {
    var x = _g175[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}});
setenv("at", {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}});
setenv("break", {special: function (_g88) {
  return((indentation() + "break"));
}, stmt: true});
setenv("define-symbol", {macro: function (name, expansion) {
  setenv(name, {symbol: expansion});
  return(undefined);
}});
setenv("get", {special: function (_g176) {
  var t = _g176[0];
  var k = _g176[1];
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
setenv("return", {special: function (_g177) {
  var x = _g177[0];
  return((indentation() + compile_call(["return", x])));
}, stmt: true});
setenv("let-symbol", {macro: function (expansions) {
  var body = unstash(sub(arguments, 1));
  var _g178 = sub(body, 0);
  add(environment, {});
  map(function (_g179) {
    var name = _g179[0];
    var exp = _g179[1];
    return(macroexpand(["define-symbol", name, exp]));
  }, pairwise(expansions));
  var _g180 = macroexpand(_g178);
  drop(environment);
  return(join(["do"], _g180));
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
setenv("language", {macro: function () {
  return(["quote", target]);
}});
setenv("%local", {special: function (_g181) {
  var name = _g181[0];
  var value = _g181[1];
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
setenv("list*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g182 = xs;
    while ((i < length(_g182))) {
      var x = _g182[i];
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
setenv("dec", {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}});
setenv("target", {macro: function () {
  var clauses = unstash(sub(arguments, 0));
  return(clauses[target]);
}});
setenv("error", {special: function (_g183) {
  var x = _g183[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, stmt: true});
setenv("join*", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}});
setenv("let", {macro: function (bindings) {
  var body = unstash(sub(arguments, 1));
  var _g184 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g185) {
    var lh = _g185[0];
    var rh = _g185[1];
    var _g187 = 0;
    var _g186 = bind(lh, rh);
    while ((_g187 < length(_g186))) {
      var _g188 = _g186[_g187];
      var id = _g188[0];
      var val = _g188[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {variable: true});
      }
      add(locals, ["%local", id, val]);
      _g187 = (_g187 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g184)])));
}});
setenv("set", {special: function (_g189) {
  var lh = _g189[0];
  var rh = _g189[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, stmt: true});
setenv("list", {macro: function () {
  var body = unstash(sub(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g190 = body;
    for (k in _g190) {
      if (isNaN(parseInt(k))) {
        var v = _g190[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}});
setenv("fn", {macro: function (args) {
  var body = unstash(sub(arguments, 1));
  var _g191 = sub(body, 0);
  var _g192 = bind_arguments(args, _g191);
  var args = _g192[0];
  var _g193 = _g192[1];
  return(join(["%function", args], _g193));
}});
setenv("join!", {macro: function (a) {
  var bs = unstash(sub(arguments, 1));
  var _g194 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g194)]);
}});
setenv("do", {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, stmt: true, tr: true});
setenv("not", {special: function (_g195) {
  var x = _g195[0];
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
setenv("while", {special: function (_g196) {
  var condition = _g196[0];
  var body = sub(_g196, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g197 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g197);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, stmt: true, tr: true});
setenv("pr", {macro: function () {
  var xs = unstash(sub(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}});
main()