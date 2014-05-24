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
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g9 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g10 = _g9;
    for (k1 in _g10) {
      if (isNaN(parseInt(k1))) {
        var v = _g10[k1];
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
    var _g62 = args;
    for (k in _g62) {
      if (isNaN(parseInt(k))) {
        var v = _g62[k];
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
    var _g63 = args;
    for (k in _g63) {
      if (isNaN(parseInt(k))) {
        var v = _g63[k];
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
      var _g64 = l;
      for (k in _g64) {
        if (isNaN(parseInt(k))) {
          var v = _g64[k];
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
    var _g66 = 0;
    var _g65 = args;
    while ((_g66 < length(_g65))) {
      var arg = _g65[_g66];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g66 = (_g66 + 1);
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
    var _g67 = lh;
    while ((i < length(_g67))) {
      var x = _g67[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g68 = lh;
    for (k in _g68) {
      if (isNaN(parseInt(k))) {
        var v = _g68[k];
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
      var _g6 = form[0];
      var _g69 = form[1];
      var t = _g69[0];
      var k = _g69[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g7 = form[0];
      var args = form[1];
      var _g70 = sub(form, 2);
      add(environment, {});
      var _g72 = (function () {
        var _g74 = 0;
        var _g73 = args;
        while ((_g74 < length(_g73))) {
          var _g71 = _g73[_g74];
          setenv(_g71, {_stash: true, variable: true});
          _g74 = (_g74 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g70)));
      })();
      drop(environment);
      return(_g72);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g8 = form[0];
      var name = form[1];
      var _g75 = form[2];
      var _g76 = sub(form, 3);
      add(environment, {});
      var _g78 = (function () {
        var _g80 = 0;
        var _g79 = _g75;
        while ((_g80 < length(_g79))) {
          var _g77 = _g79[_g80];
          setenv(_g77, {_stash: true, variable: true});
          _g80 = (_g80 + 1);
        }
        return(join([x, name, map42(macroexpand, _g75)], macroexpand(_g76)));
      })();
      drop(environment);
      return(_g78);
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
  var _g81 = form;
  for (k in _g81) {
    if (isNaN(parseInt(k))) {
      var v = _g81[k];
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
  var _g83 = 0;
  var _g82 = form;
  while ((_g83 < length(_g82))) {
    var x = _g82[_g83];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g83 = (_g83 + 1);
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
  var _g84 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g84, upto));
  } else {
    var l = sublist(x, _g84, upto);
    var k = undefined;
    var _g85 = x;
    for (k in _g85) {
      if (isNaN(parseInt(k))) {
        var v = _g85[k];
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
    var _g86 = l1;
    for (k in _g86) {
      if (isNaN(parseInt(k))) {
        var v = _g86[k];
        l[k] = v;
      }
    }
    var _g88 = undefined;
    var _g87 = l2;
    for (_g88 in _g87) {
      if (isNaN(parseInt(_g88))) {
        var v = _g87[_g88];
        l[_g88] = v;
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
  var _g90 = 0;
  var _g89 = l;
  while ((_g90 < length(_g89))) {
    var x = _g89[_g90];
    if (f(x)) {
      add(l1, x);
    }
    _g90 = (_g90 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g92 = 0;
  var _g91 = l;
  while ((_g92 < length(_g91))) {
    var x = _g91[_g92];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g92 = (_g92 + 1);
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
  var _g102 = 0;
  var _g101 = l;
  while ((_g102 < length(_g101))) {
    var x = _g101[_g102];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g102 = (_g102 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g103 = t;
  for (k in _g103) {
    if (isNaN(parseInt(k))) {
      var v = _g103[k];
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
  var _g104 = t;
  for (k in _g104) {
    if (isNaN(parseInt(k))) {
      var v = _g104[k];
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
  var _g105 = t;
  for (k in _g105) {
    if (isNaN(parseInt(k))) {
      var v = _g105[k];
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
  var _g106 = t;
  for (k in _g106) {
    if (isNaN(parseInt(k))) {
      var v = _g106[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g107 = sub(xs, 0);
  return(join(t, _g107));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g108 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g109 = t;
  for (k in _g109) {
    if (isNaN(parseInt(k))) {
      var v = _g109[k];
      if (!(_g108[k])) {
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
  var _g110 = sub(xs, 0);
  if (empty63(_g110)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g110));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g113 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g113));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g114 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g114)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g115 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g115));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g116 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g116)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g117 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g117)));
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
    var _g118 = x;
    for (k in _g118) {
      if (isNaN(parseInt(k))) {
        var v = _g118[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g119 = x1;
    while ((i < length(_g119))) {
      var y = _g119[i];
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
  var _g120 = stash(args);
  return((f.apply)(f, _g120));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
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
  var _g123 = args;
  while ((i < length(_g123))) {
    var arg = _g123[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g124 = unstash(sublist(arguments, 1));
  var tail63 = _g124["tail?"];
  var str = "";
  var i = 0;
  var _g125 = forms;
  while ((i < length(_g125))) {
    var x = _g125[i];
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
compile_infix = function (_g126) {
  var op = _g126[0];
  var args = sub(_g126, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g127 = args;
  while ((i < length(_g127))) {
    var arg = _g127[i];
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
  var _g128 = (function () {
    indent_level = (indent_level + 1);
    var _g129 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
    indent_level = (indent_level - 1);
    return(_g129);
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
    return((ind + "if (" + cond1 + ") {\n" + _g128 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g128 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g128 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g128 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g128 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g128 + tr));
  }
};
compile_function = function (args, body) {
  var _g130 = unstash(sublist(arguments, 2));
  var name = _g130.name;
  var prefix = _g130.prefix;
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
    var _g131 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g131);
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
  var _g132 = getenv(hd(form));
  var special = _g132.special;
  var stmt = _g132.stmt;
  var self_tr63 = _g132.tr;
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
  var _g176 = unstash(sublist(arguments, 1));
  var stmt63 = _g176["stmt?"];
  var tail63 = _g176["tail?"];
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
compile_file = function (file) {
  var str = read_file(file);
  var body = read_all(make_stream(str));
  var form = join(["do"], body);
  return(compile_toplevel(form));
};
compiler_output = undefined;
compilation_level = undefined;
compile_module = function (spec) {
  compilation_level = 0;
  compiler_output = "";
  return(load_module(spec));
};
global.require = require;
run = eval;
eval = function (form) {
  var previous = target;
  target = "js";
  var str = compile(macroexpand(form));
  target = previous;
  return(run(str));
};
current_module = undefined;
initial_environment = function () {
  return([{"define-module": getenv("define-module")}]);
};
module_key = function (spec) {
  if (atom63(spec)) {
    return(to_string(spec));
  } else {
    throw "Unsupported module specification";
  }
};
module = function (spec) {
  return(modules[module_key(spec)]);
};
module_path = function (spec) {
  return((module_key(spec) + ".l"));
};
load_module = function (spec) {
  if (nil63(module(spec))) {
    _37compile_module(spec);
  } else if ((compilation_level === 0)) {
    compilation_level = (compilation_level + 1);
    _37compile_module(spec);
    compilation_level = (compilation_level - 1);
  }
  return(open_module(spec));
};
_37compile_module = function (spec) {
  var path = module_path(spec);
  var mod0 = current_module;
  var env0 = environment;
  var k = module_key(spec);
  current_module = spec;
  environment = initial_environment();
  var compiled = compile_file(path);
  var m = module(spec);
  var toplevel = hd(environment);
  current_module = mod0;
  environment = env0;
  var name = undefined;
  var _g184 = toplevel;
  for (name in _g184) {
    if (isNaN(parseInt(name))) {
      var binding = _g184[name];
      if ((binding.export && (binding.module === k))) {
        m.toplevel[name] = binding;
      }
    }
  }
  if (number63(compilation_level)) {
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
open_module = function (spec) {
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g185 = m.toplevel;
  for (k in _g185) {
    if (isNaN(parseInt(k))) {
      var v = _g185[k];
      frame[k] = v;
    }
  }
};
in_module = function (spec) {
  load_module(spec);
  var m = module(spec);
  return(map(open_module, m.import));
};
quote_binding = function (b) {
  b = extend(b, {_stash: true, module: ["quote", b.module]});
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
  return(join(["%object"], mapo(function (_g122, b) {
    return(join(["table"], quote_binding(b)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g186 = ["table"];
  _g186.import = quoted(m.import);
  _g186.toplevel = quote_frame(m.toplevel);
  return(_g186);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
modules = {boot: {import: ["lib", "compiler"], toplevel: {}}, reader: {import: ["lib", "compiler"], toplevel: {"make-stream": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g187) {
  var char = _g187[0];
  var stream = _g187[1];
  var body = unstash(sublist(arguments, 1));
  var _g188 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g188)]);
}}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}}, lib: {import: ["lib", "compiler"], toplevel: {at: {export: true, macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, module: "lib"}, tl: {export: true, variable: true, module: "lib"}, "parse-number": {export: true, variable: true, module: "lib"}, hd: {export: true, variable: true, module: "lib"}, quasiquote: {export: true, macro: function (form) {
  return(quasiexpand(form, 1));
}, module: "lib"}, search: {export: true, variable: true, module: "lib"}, dec: {export: true, macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, module: "lib"}, "empty?": {export: true, variable: true, module: "lib"}, getenv: {export: true, variable: true, module: "lib"}, mapt: {export: true, variable: true, module: "lib"}, "define-symbol": {export: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, module: "lib"}, "list*": {export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g189 = xs;
    while ((i < length(_g189))) {
      var x = _g189[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, module: "lib"}, guard: {export: true, macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, module: "lib"}, ">": {export: true, variable: true, module: "lib"}, "=": {export: true, variable: true, module: "lib"}, "let-symbol": {export: true, macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g190 = sub(body, 0);
  add(environment, {});
  var _g191 = (function () {
    map(function (_g192) {
      var name = _g192[0];
      var exp = _g192[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g190)));
  })();
  drop(environment);
  return(_g191);
}, module: "lib"}, "<": {export: true, variable: true, module: "lib"}, "function?": {export: true, variable: true, module: "lib"}, "atom?": {export: true, variable: true, module: "lib"}, setenv: {export: true, variable: true, module: "lib"}, language: {export: true, macro: function () {
  return(["quote", target]);
}, module: "lib"}, "with-bindings": {export: true, macro: function (_g193) {
  var names = _g193[0];
  var body = unstash(sublist(arguments, 1));
  var _g194 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g195 = ["setenv", x];
    _g195.variable = true;
    return(_g195);
  })()]], _g194));
}, module: "lib"}, pairwise: {export: true, variable: true, module: "lib"}, "special?": {export: true, variable: true, module: "lib"}, code: {export: true, variable: true, module: "lib"}, define: {export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g196 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g196));
}, module: "lib"}, mapo: {export: true, variable: true, module: "lib"}, "join!": {export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g197 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g197)]);
}, module: "lib"}, target: {export: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, module: "lib", variable: true}, "string-literal?": {export: true, variable: true, module: "lib"}, "read-file": {export: true, variable: true, module: "lib"}, "define-global": {export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g198 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g198))) {
    var _g199 = bind_arguments(x, _g198);
    var args = _g199[0];
    var _g200 = _g199[1];
    return(join(["%global-function", name, args], _g200));
  } else {
    return(["set", name, x]);
  }
}, module: "lib"}, "with-frame": {export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, module: "lib"}, let: {export: true, macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g201 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g202) {
    var lh = _g202[0];
    var rh = _g202[1];
    var _g204 = 0;
    var _g203 = bind(lh, rh);
    while ((_g204 < length(_g203))) {
      var _g205 = _g203[_g204];
      var id = _g205[0];
      var val = _g205[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g204 = (_g204 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g201)])));
}, module: "lib"}, unstash: {export: true, variable: true, module: "lib"}, iterate: {export: true, variable: true, module: "lib"}, table: {export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g5, x) {
    return(x);
  }, body)));
}, module: "lib"}, keep: {export: true, variable: true, module: "lib"}, "string?": {export: true, variable: true, module: "lib"}, char: {export: true, variable: true, module: "lib"}, fn: {export: true, macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g206 = sub(body, 0);
  var _g207 = bind_arguments(args, _g206);
  var args = _g207[0];
  var _g208 = _g207[1];
  return(join(["%function", args], _g208));
}, module: "lib"}, splice: {export: true, variable: true, module: "lib"}, drop: {export: true, variable: true, module: "lib"}, replicate: {export: true, variable: true, module: "lib"}, length: {export: true, variable: true, module: "lib"}, "nil?": {export: true, variable: true, module: "lib"}, join: {export: true, variable: true, module: "lib"}, "to-string": {export: true, variable: true, module: "lib"}, inner: {export: true, variable: true, module: "lib"}, sub: {export: true, variable: true, module: "lib"}, add: {export: true, variable: true, module: "lib"}, reverse: {export: true, variable: true, module: "lib"}, "id-literal?": {export: true, variable: true, module: "lib"}, "define-local": {export: true, macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g209 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g209))) {
    var _g210 = bind_arguments(x, _g209);
    var args = _g210[0];
    var _g211 = _g210[1];
    return(join(["%local-function", name, args], _g211));
  } else {
    return(["%local", name, x]);
  }
}, module: "lib"}, "set-of": {export: true, macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g213 = 0;
  var _g212 = elements;
  while ((_g213 < length(_g212))) {
    var e = _g212[_g213];
    l[e] = true;
    _g213 = (_g213 + 1);
  }
  return(join(["table"], l));
}, module: "lib"}, write: {export: true, variable: true, module: "lib"}, map: {export: true, variable: true, module: "lib"}, "table?": {export: true, variable: true, module: "lib"}, "composite?": {export: true, variable: true, module: "lib"}, "stash*": {export: true, variable: true, module: "lib"}, "-": {export: true, variable: true, module: "lib"}, "make-id": {export: true, variable: true, module: "lib"}, "/": {export: true, variable: true, module: "lib"}, "*": {export: true, variable: true, module: "lib"}, "+": {export: true, variable: true, module: "lib"}, "%": {export: true, variable: true, module: "lib"}, "write-file": {export: true, variable: true, module: "lib"}, split: {export: true, variable: true, module: "lib"}, "is?": {export: true, variable: true, module: "lib"}, ">=": {export: true, variable: true, module: "lib"}, "<=": {export: true, variable: true, module: "lib"}, type: {export: true, variable: true, module: "lib"}, extend: {export: true, variable: true, module: "lib"}, "cat!": {export: true, macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g214 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g214)]);
}, module: "lib"}, "boolean?": {export: true, variable: true, module: "lib"}, "list?": {export: true, variable: true, module: "lib"}, inc: {export: true, macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, module: "lib"}, "join*": {export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, module: "lib"}, "define-macro": {export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g215 = sub(body, 0);
  var form = join(["fn", args], _g215);
  eval((function () {
    var _g216 = ["setenv", ["quote", name]];
    _g216.macro = form;
    _g216.form = ["quote", form];
    return(_g216);
  })());
  return(undefined);
}, module: "lib"}, print: {export: true, variable: true, module: "lib"}, list: {export: true, macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g217 = body;
    for (k in _g217) {
      if (isNaN(parseInt(k))) {
        var v = _g217[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, module: "lib"}, "let-macro": {export: true, macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g218 = sub(body, 0);
  add(environment, {});
  var _g219 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g218)));
  })();
  drop(environment);
  return(_g219);
}, module: "lib"}, quote: {export: true, macro: function (form) {
  return(quoted(form));
}, module: "lib"}, last: {export: true, variable: true, module: "lib"}, macroexpand: {export: true, variable: true, module: "lib"}, "keys?": {export: true, variable: true, module: "lib"}, "special-form?": {export: true, variable: true, module: "lib"}, across: {export: true, macro: function (_g220) {
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
}, module: "lib"}, "%export": {}, "map*": {export: true, variable: true, module: "lib"}, "number?": {export: true, variable: true, module: "lib"}, exclude: {export: true, variable: true, module: "lib"}, each: {export: true, macro: function (_g222) {
  var t = _g222[0];
  var k = _g222[1];
  var v = _g222[2];
  var body = unstash(sublist(arguments, 1));
  var _g223 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g224 = ["target"];
    _g224.js = ["isNaN", ["parseInt", k]];
    _g224.lua = ["not", ["number?", k]];
    return(_g224);
  })(), join(["let", [v, ["get", t1, k]]], _g223)]]]);
}, module: "lib"}, exit: {export: true, variable: true, module: "lib"}, quoted: {export: true, variable: true, module: "lib"}, apply: {export: true, variable: true, module: "lib"}, pr: {export: true, macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, module: "lib"}, "cat": {export: true, variable: true, module: "lib"}, find: {export: true, variable: true, module: "lib"}, "define-special": {export: true, macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g225 = sub(body, 0);
  var form = join(["fn", args], _g225);
  var keys = sub(_g225, length(_g225));
  eval(join((function () {
    var _g226 = ["setenv", ["quote", name]];
    _g226.special = form;
    _g226.form = ["quote", form];
    return(_g226);
  })(), keys));
  return(undefined);
}, module: "lib"}, reduce: {export: true, variable: true, module: "lib"}}}, compiler: {import: ["reader", "lib", "compiler"], toplevel: {"define-module": {export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g227 = sub(body, 0);
  var imp = _g227.import;
  var exp = _g227.export;
  map(load_module, imp);
  modules[module_key(spec)] = {import: imp, toplevel: {}, export: {}};
  var _g229 = 0;
  var _g228 = (exp || []);
  while ((_g229 < length(_g228))) {
    var k = _g228[_g229];
    setenv(k, {_stash: true, export: true});
    _g229 = (_g229 + 1);
  }
}, module: "compiler"}, "while": {special: function (_g230) {
  var condition = _g230[0];
  var body = sub(_g230, 1);
  var condition = compile(condition);
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g231 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g231);
  })();
  var ind = indentation();
  if ((target === "js")) {
    return((ind + "while (" + condition + ") {\n" + body + ind + "}\n"));
  } else {
    return((ind + "while " + condition + " do\n" + body + ind + "end\n"));
  }
}, export: true, tr: true, module: "compiler", stmt: true}, "error": {special: function (_g232) {
  var x = _g232[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, export: true, module: "compiler", stmt: true}, "not": {special: function (_g233) {
  var x = _g233[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}, export: true, module: "compiler"}, "compiler-output": {export: true, variable: true, module: "compiler"}, "%local": {special: function (_g234) {
  var name = _g234[0];
  var value = _g234[1];
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
}, export: true, module: "compiler", stmt: true}, "%object": {special: function (forms) {
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
  var _g235 = pairs;
  while ((i < length(_g235))) {
    var _g236 = _g235[i];
    var k = _g236[0];
    var v = _g236[1];
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
}, export: true, module: "compiler"}, "with-indent": {export: true, macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, module: "compiler"}, "%try": {special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g237 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g237);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g238 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g238);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}, export: true, tr: true, module: "compiler", stmt: true}, "%local-function": {special: function (_g239) {
  var name = _g239[0];
  var args = _g239[1];
  var body = sub(_g239, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}, export: true, tr: true, module: "compiler", stmt: true}, "break": {special: function (_g121) {
  return((indentation() + "break"));
}, export: true, module: "compiler", stmt: true}, "initial-environment": {variable: true, module: "compiler", export: true}, "open-module": {export: true, variable: true, module: "compiler"}, "open-m0dule": {export: true, variable: true, module: "compiler"}, "current-module": {export: true, variable: true, module: "compiler"}, "compile-module": {export: true, variable: true, module: "compiler"}, "if": {special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g240 = form;
  while ((i < length(_g240))) {
    var condition = _g240[i];
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
}, export: true, tr: true, module: "compiler", stmt: true}, "%global-function": {special: function (_g241) {
  var name = _g241[0];
  var args = _g241[1];
  var body = sub(_g241, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}, export: true, tr: true, module: "compiler", stmt: true}, "load-module": {export: true, variable: true, module: "compiler"}, eval: {export: true, variable: true, module: "compiler"}, "set": {special: function (_g242) {
  var lh = _g242[0];
  var rh = _g242[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, export: true, module: "compiler", stmt: true}, "get": {special: function (_g243) {
  var t = _g243[0];
  var k = _g243[1];
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
}, export: true, module: "compiler"}, "do": {special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}, export: true, tr: true, module: "compiler", stmt: true}, "%for": {special: function (_g244) {
  var _g245 = _g244[0];
  var t = _g245[0];
  var k = _g245[1];
  var body = sub(_g244, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g246 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g246);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}, export: true, tr: true, module: "compiler", stmt: true}, "quote-m0dules": {export: true, variable: true, module: "compiler"}, "quote-modules": {export: true, variable: true, module: "compiler"}, compile: {export: true, variable: true, module: "compiler"}, "compile-toplevel": {export: true, variable: true, module: "compiler"}, "return": {special: function (_g247) {
  var x = _g247[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, export: true, module: "compiler", stmt: true}, "quote-environment": {export: true, variable: true, module: "compiler"}, "in-module": {export: true, variable: true, module: "compiler"}, "%array": {special: function (forms) {
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
}, export: true, module: "compiler"}, "%function": {special: function (_g249) {
  var args = _g249[0];
  var body = sub(_g249, 1);
  return(compile_function(args, body));
}, export: true, module: "compiler"}}}};
environment = [{"define-module": {export: true, macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g250 = sub(body, 0);
  var imp = _g250.import;
  var exp = _g250.export;
  map(load_module, imp);
  modules[module_key(spec)] = {import: imp, toplevel: {}, export: {}};
  var _g252 = 0;
  var _g251 = (exp || []);
  while ((_g252 < length(_g251))) {
    var k = _g251[_g252];
    setenv(k, {_stash: true, export: true});
    _g252 = (_g252 + 1);
  }
}, module: "compiler"}}];
rep = function (str) {
  var _g253 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g255) {
      return([false, _g255]);
    }
  })();
  var _g1 = _g253[0];
  var x = _g253[1];
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
  var _g254 = args;
  while ((i < length(_g254))) {
    var arg = _g254[i];
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
