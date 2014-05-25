global.exports = {};
setenv = function (k) {
  var keys = unstash(sublist(arguments, 1));
  var _g6 = sub(keys, 0);
  if (string63(k)) {
    var frame = last(environment);
    var x = (frame[k] || {});
    var k1 = undefined;
    var _g7 = _g6;
    for (k1 in _g7) {
      if (isNaN(parseInt(k1))) {
        var v = _g7[k1];
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
    var _g59 = args;
    for (k in _g59) {
      if (isNaN(parseInt(k))) {
        var v = _g59[k];
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
    var _g60 = args;
    for (k in _g60) {
      if (isNaN(parseInt(k))) {
        var v = _g60[k];
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
      var _g61 = l;
      for (k in _g61) {
        if (isNaN(parseInt(k))) {
          var v = _g61[k];
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
    var _g63 = 0;
    var _g62 = args;
    while ((_g63 < length(_g62))) {
      var arg = _g62[_g63];
      if (atom63(arg)) {
        add(args1, arg);
      } else if ((list63(arg) || keys63(arg))) {
        var v = make_id();
        add(args1, v);
        bs = join(bs, [arg, v]);
      }
      _g63 = (_g63 + 1);
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
    var _g64 = lh;
    while ((i < length(_g64))) {
      var x = _g64[i];
      bs = join(bs, bind(x, ["at", rh, i]));
      i = (i + 1);
    }
    if (r) {
      bs = join(bs, bind(r, ["sub", rh, length(lh)]));
    }
    var k = undefined;
    var _g65 = lh;
    for (k in _g65) {
      if (isNaN(parseInt(k))) {
        var v = _g65[k];
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
      var _g66 = form[1];
      var t = _g66[0];
      var k = _g66[1];
      var body = sub(form, 2);
      return(join(["%for", [macroexpand(t), macroexpand(k)]], macroexpand(body)));
    } else if ((x === "%function")) {
      var _g4 = form[0];
      var args = form[1];
      var _g67 = sub(form, 2);
      add(environment, {});
      var _g69 = (function () {
        var _g71 = 0;
        var _g70 = args;
        while ((_g71 < length(_g70))) {
          var _g68 = _g70[_g71];
          setenv(_g68, {_stash: true, variable: true});
          _g71 = (_g71 + 1);
        }
        return(join(["%function", map42(macroexpand, args)], macroexpand(_g67)));
      })();
      drop(environment);
      return(_g69);
    } else if (((x === "%local-function") || (x === "%global-function"))) {
      var _g5 = form[0];
      var name = form[1];
      var _g72 = form[2];
      var _g73 = sub(form, 3);
      add(environment, {});
      var _g75 = (function () {
        var _g77 = 0;
        var _g76 = _g72;
        while ((_g77 < length(_g76))) {
          var _g74 = _g76[_g77];
          setenv(_g74, {_stash: true, variable: true});
          _g77 = (_g77 + 1);
        }
        return(join([x, name, map42(macroexpand, _g72)], macroexpand(_g73)));
      })();
      drop(environment);
      return(_g75);
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
  var _g78 = form;
  for (k in _g78) {
    if (isNaN(parseInt(k))) {
      var v = _g78[k];
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
  var _g80 = 0;
  var _g79 = form;
  while ((_g80 < length(_g79))) {
    var x = _g79[_g80];
    if (quasisplice63(x, depth)) {
      var x = quasiexpand(x[1]);
      add(xs, x);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _g80 = (_g80 + 1);
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
  var _g81 = (from || 0);
  if (string63(x)) {
    return(substring(x, _g81, upto));
  } else {
    var l = sublist(x, _g81, upto);
    var k = undefined;
    var _g82 = x;
    for (k in _g82) {
      if (isNaN(parseInt(k))) {
        var v = _g82[k];
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
    var _g83 = l1;
    for (k in _g83) {
      if (isNaN(parseInt(k))) {
        var v = _g83[k];
        l[k] = v;
      }
    }
    var _g85 = undefined;
    var _g84 = l2;
    for (_g85 in _g84) {
      if (isNaN(parseInt(_g85))) {
        var v = _g84[_g85];
        l[_g85] = v;
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
  var _g87 = 0;
  var _g86 = l;
  while ((_g87 < length(_g86))) {
    var x = _g86[_g87];
    if (f(x)) {
      add(l1, x);
    }
    _g87 = (_g87 + 1);
  }
  return(l1);
};
find = function (f, l) {
  var _g89 = 0;
  var _g88 = l;
  while ((_g89 < length(_g88))) {
    var x = _g88[_g89];
    var x = f(x);
    if (x) {
      return(x);
    }
    _g89 = (_g89 + 1);
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
  var _g99 = 0;
  var _g98 = l;
  while ((_g99 < length(_g98))) {
    var x = _g98[_g99];
    var x1 = f(x);
    var s = splice63(x1);
    if (list63(s)) {
      l1 = join(l1, s);
    } else if (is63(s)) {
      add(l1, s);
    } else if (is63(x1)) {
      add(l1, x1);
    }
    _g99 = (_g99 + 1);
  }
  return(l1);
};
map42 = function (f, t) {
  var l = map(f, t);
  var k = undefined;
  var _g100 = t;
  for (k in _g100) {
    if (isNaN(parseInt(k))) {
      var v = _g100[k];
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
  var _g101 = t;
  for (k in _g101) {
    if (isNaN(parseInt(k))) {
      var v = _g101[k];
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
  var _g102 = t;
  for (k in _g102) {
    if (isNaN(parseInt(k))) {
      var v = _g102[k];
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
  var _g103 = t;
  for (k in _g103) {
    if (isNaN(parseInt(k))) {
      var v = _g103[k];
      k63 = true;
      break;
    }
  }
  return(k63);
};
extend = function (t) {
  var xs = unstash(sublist(arguments, 1));
  var _g104 = sub(xs, 0);
  return(join(t, _g104));
};
exclude = function (t) {
  var keys = unstash(sublist(arguments, 1));
  var _g105 = sub(keys, 0);
  var t1 = sublist(t);
  var k = undefined;
  var _g106 = t;
  for (k in _g106) {
    if (isNaN(parseInt(k))) {
      var v = _g106[k];
      if (!(_g105[k])) {
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
  var _g107 = sub(xs, 0);
  if (empty63(_g107)) {
    return("");
  } else {
    return(reduce(function (a, b) {
      return((a + b));
    }, _g107));
  }
};
_43 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g110 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a + b));
  }, _g110));
};
_ = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g111 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b - a));
  }, reverse(_g111)));
};
_42 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g112 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((a * b));
  }, _g112));
};
_47 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g113 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b / a));
  }, reverse(_g113)));
};
_37 = function () {
  var xs = unstash(sublist(arguments, 0));
  var _g114 = sub(xs, 0);
  return(reduce(function (a, b) {
    return((b % a));
  }, reverse(_g114)));
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
    var _g115 = x;
    for (k in _g115) {
      if (isNaN(parseInt(k))) {
        var v = _g115[k];
        add(x1, (k + ":"));
        add(x1, v);
      }
    }
    var i = 0;
    var _g116 = x1;
    while ((i < length(_g116))) {
      var y = _g116[i];
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
  var _g117 = stash(args);
  return((f.apply)(f, _g117));
};
id_count = 0;
make_id = function () {
  id_count = (id_count + 1);
  return(("_g" + id_count));
};
_g119 = {};
exports.lib = _g119;
_g119["composite?"] = composite63;
_g119.unstash = unstash;
_g119.mapt = mapt;
_g119.char = char;
_g119["table?"] = table63;
_g119.replicate = replicate;
_g119.hd = hd;
_g119.tl = tl;
_g119.mapo = mapo;
_g119["to-string"] = to_string;
_g119.code = code;
_g119.length = length;
_g119["empty?"] = empty63;
_g119["atom?"] = atom63;
_g119.pairwise = pairwise;
_g119["make-id"] = make_id;
_g119.write = write;
_g119.type = type;
_g119.search = search;
_g119["keys?"] = keys63;
_g119.map = map;
_g119.exit = exit;
_g119["map*"] = map42;
_g119.last = last;
_g119["parse-number"] = parse_number;
_g119.setenv = setenv;
_g119["special-form?"] = special_form63;
_g119["nil?"] = nil63;
_g119.getenv = getenv;
_g119["string-literal?"] = string_literal63;
_g119.exclude = exclude;
_g119["cat"] = cat;
_g119.macroexpand = macroexpand;
_g119["-"] = _;
_g119["/"] = _47;
_g119.inner = inner;
_g119["function?"] = function63;
_g119[">="] = _6261;
_g119.apply = apply;
_g119["<="] = _6061;
_g119["boolean?"] = boolean63;
_g119.drop = drop;
_g119.sub = sub;
_g119.quoted = quoted;
_g119["%"] = _37;
_g119["+"] = _43;
_g119["*"] = _42;
_g119.find = find;
_g119["special?"] = special63;
_g119.reverse = reverse;
_g119["string?"] = string63;
_g119["read-file"] = read_file;
_g119["="] = _61;
_g119["<"] = _60;
_g119[">"] = _62;
_g119.iterate = iterate;
_g119.extend = extend;
_g119["id-literal?"] = id_literal63;
_g119.split = split;
_g119["stash*"] = stash42;
_g119["is?"] = is63;
_g119.keep = keep;
_g119.join = join;
_g119["number?"] = number63;
_g119.target = target;
_g119.add = add;
_g119["write-file"] = write_file;
_g119.print = print;
_g119.reduce = reduce;
_g119.splice = splice;
_g119["list?"] = list63;
delimiters = {"\n": true, ")": true, "(": true, ";": true};
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
_g123 = {};
exports.reader = _g123;
_g123.read = read;
_g123["make-stream"] = make_stream;
_g123["read-from-string"] = read_from_string;
_g123["read-all"] = read_all;
infix = {common: {"-": true, "<": true, "/": true, ">": true, "%": true, ">=": true, "<=": true, "+": true, "*": true}, lua: {"=": "==", "~=": true, "cat": "..", "or": true, "and": true}, js: {"=": "===", "~=": "!=", "cat": "+", "or": "||", "and": "&&"}};
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
  var _g126 = args;
  while ((i < length(_g126))) {
    var arg = _g126[i];
    str = (str + compile(arg));
    if ((i < (length(args) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((str + ")"));
};
compile_body = function (forms) {
  var _g127 = unstash(sublist(arguments, 1));
  var tail63 = _g127["tail?"];
  var str = "";
  var i = 0;
  var _g128 = forms;
  while ((i < length(_g128))) {
    var x = _g128[i];
    var t63 = (tail63 && (i === (length(forms) - 1)));
    str = (str + compile(x, {_stash: true, "tail?": t63, "stmt?": true}));
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
compile_infix = function (_g129) {
  var op = _g129[0];
  var args = sub(_g129, 1);
  var str = "(";
  var op = getop(op);
  var i = 0;
  var _g130 = args;
  while ((i < length(_g130))) {
    var arg = _g130[i];
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
  var _g131 = (function () {
    indent_level = (indent_level + 1);
    var _g132 = compile(body, {_stash: true, "tail?": tail63, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g132);
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
    return((ind + "if (" + cond1 + ") {\n" + _g131 + ind + "}" + tr));
  } else if (first63) {
    return((ind + "if " + cond1 + " then\n" + _g131 + tr));
  } else if ((nil63(condition) && (target === "js"))) {
    return((" else {\n" + _g131 + ind + "}\n"));
  } else if (nil63(condition)) {
    return((ind + "else\n" + _g131 + tr));
  } else if ((target === "js")) {
    return((" else if (" + cond1 + ") {\n" + _g131 + ind + "}" + tr));
  } else {
    return((ind + "elseif " + cond1 + " then\n" + _g131 + tr));
  }
};
compile_function = function (args, body) {
  var _g133 = unstash(sublist(arguments, 2));
  var name = _g133.name;
  var prefix = _g133.prefix;
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
    var _g134 = compile_body(body, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g134);
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
  var _g135 = getenv(hd(form));
  var stmt = _g135.stmt;
  var self_tr63 = _g135.tr;
  var special = _g135.special;
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
  var _g179 = unstash(sublist(arguments, 1));
  var tail63 = _g179["tail?"];
  var stmt63 = _g179["stmt?"];
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
  var form = join(["do"], join(body, [["%export"]]));
  return(compile_toplevel(form));
};
compiler_output = undefined;
compilation_level = undefined;
compile_module = function (spec) {
  compilation_level = 0;
  compiler_output = "";
  return(load_module(spec));
};
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
  if ((nil63(module(spec)) || (compilation_level === 1))) {
    _37compile_module(spec);
  }
  return(open_module(spec));
};
_37compile_module = function (spec) {
  var path = module_path(spec);
  var mod0 = current_module;
  var env0 = environment;
  var k = module_key(spec);
  if (number63(compilation_level)) {
    compilation_level = (compilation_level + 1);
  }
  current_module = spec;
  environment = initial_environment();
  var compiled = compile_file(path);
  var m = module(spec);
  var toplevel = hd(environment);
  current_module = mod0;
  environment = env0;
  var name = undefined;
  var _g187 = toplevel;
  for (name in _g187) {
    if (isNaN(parseInt(name))) {
      var binding = _g187[name];
      if ((binding.export && (binding.module === k))) {
        m.toplevel[name] = binding;
      }
    }
  }
  if (number63(compilation_level)) {
    compilation_level = (compilation_level - 1);
    compiler_output = (compiler_output + compiled);
  } else {
    return(run(compiled));
  }
};
open_module = function (spec) {
  var m = module(spec);
  var frame = last(environment);
  var k = undefined;
  var _g188 = m.toplevel;
  for (k in _g188) {
    if (isNaN(parseInt(k))) {
      var v = _g188[k];
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
  return(join(["%object"], mapo(function (_g125, b) {
    return(join(["table"], quote_binding(b)));
  }, t)));
};
quote_environment = function (env) {
  return(join(["list"], map(quote_frame, env)));
};
quote_module = function (m) {
  var _g189 = ["table"];
  _g189.import = quoted(m.import);
  _g189.toplevel = quote_frame(m.toplevel);
  return(_g189);
};
quote_modules = function () {
  return(join(["table"], map42(quote_module, modules)));
};
_g190 = {};
exports.compiler = _g190;
_g190["compiler-output"] = compiler_output;
_g190.eval = eval;
_g190["current-module"] = current_module;
_g190["quote-environment"] = quote_environment;
_g190["quote-modules"] = quote_modules;
_g190["initial-environment"] = initial_environment;
_g190["compile-toplevel"] = compile_toplevel;
_g190["open-module"] = open_module;
_g190["in-module"] = in_module;
_g190.compile = compile;
_g190["compile-module"] = compile_module;
_g190["load-module"] = load_module;
modules = {compiler: {import: ["reader", "lib", "compiler"], toplevel: {"%for": {stmt: true, module: "compiler", export: true, tr: true, special: function (_g191) {
  var _g192 = _g191[0];
  var t = _g192[0];
  var k = _g192[1];
  var body = sub(_g191, 1);
  var t = compile(t);
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g193 = compile_body(body);
    indent_level = (indent_level - 1);
    return(_g193);
  })();
  if ((target === "lua")) {
    return((ind + "for " + k + " in next, " + t + " do\n" + body + ind + "end\n"));
  } else {
    return((ind + "for (" + k + " in " + t + ") {\n" + body + ind + "}\n"));
  }
}}, "load-module": {variable: true, export: true, module: "compiler"}, "initial-environment": {variable: true, export: true, module: "compiler"}, "get": {export: true, module: "compiler", special: function (_g194) {
  var t = _g194[0];
  var k = _g194[1];
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
}}, "do": {stmt: true, module: "compiler", export: true, tr: true, special: function (forms, tail63) {
  return(compile_body(forms, {_stash: true, "tail?": tail63}));
}}, "compile-module": {variable: true, export: true, module: "compiler"}, "define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g195 = sub(body, 0);
  var exp = _g195.export;
  var imp = _g195.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp, export: {}};
  var _g197 = 0;
  var _g196 = (exp || []);
  while ((_g197 < length(_g196))) {
    var k = _g196[_g197];
    setenv(k, {_stash: true, export: true});
    _g197 = (_g197 + 1);
  }
}, export: true, module: "compiler"}, "set": {export: true, stmt: true, special: function (_g198) {
  var lh = _g198[0];
  var rh = _g198[1];
  if (nil63(rh)) {
    throw "Missing right-hand side in assignment";
  }
  return((indentation() + compile(lh) + " = " + compile(rh)));
}, module: "compiler"}, "break": {export: true, stmt: true, special: function (_g124) {
  return((indentation() + "break"));
}, module: "compiler"}, "%try": {stmt: true, module: "compiler", export: true, tr: true, special: function (forms) {
  var ind = indentation();
  var body = (function () {
    indent_level = (indent_level + 1);
    var _g199 = compile_body(forms, {_stash: true, "tail?": true});
    indent_level = (indent_level - 1);
    return(_g199);
  })();
  var e = make_id();
  var handler = ["return", ["%array", false, e]];
  var h = (function () {
    indent_level = (indent_level + 1);
    var _g200 = compile(handler, {_stash: true, "stmt?": true});
    indent_level = (indent_level - 1);
    return(_g200);
  })();
  return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
}}, compile: {variable: true, export: true, module: "compiler"}, "in-module": {variable: true, export: true, module: "compiler"}, "quote-modules": {variable: true, export: true, module: "compiler"}, "compiler-output": {variable: true, export: true, module: "compiler"}, "%global-function": {stmt: true, module: "compiler", export: true, tr: true, special: function (_g201) {
  var name = _g201[0];
  var args = _g201[1];
  var body = sub(_g201, 2);
  if ((target === "lua")) {
    return(compile_function(args, body, {_stash: true, name: name}));
  } else {
    return(compile(["set", name, join(["%function", args], body)], {_stash: true, "stmt?": true}));
  }
}}, eval: {variable: true, export: true, module: "compiler"}, "not": {export: true, module: "compiler", special: function (_g202) {
  var x = _g202[0];
  var x = compile(x);
  var open = (function () {
    if ((target === "js")) {
      return("!(");
    } else {
      return("(not ");
    }
  })();
  return((open + x + ")"));
}}, "open-module": {variable: true, export: true, module: "compiler"}, "%array": {export: true, module: "compiler", special: function (forms) {
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
  var _g203 = forms;
  while ((i < length(_g203))) {
    var x = _g203[i];
    str = (str + compile(x));
    if ((i < (length(forms) - 1))) {
      str = (str + ", ");
    }
    i = (i + 1);
  }
  return((open + str + close));
}}, "%object": {export: true, module: "compiler", special: function (forms) {
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
  var _g204 = pairs;
  while ((i < length(_g204))) {
    var _g205 = _g204[i];
    var k = _g205[0];
    var v = _g205[1];
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
}}, "%local": {export: true, stmt: true, special: function (_g206) {
  var name = _g206[0];
  var value = _g206[1];
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
}, module: "compiler"}, "current-module": {variable: true, export: true, module: "compiler"}, "if": {stmt: true, module: "compiler", export: true, tr: true, special: function (form, tail63) {
  var str = "";
  var i = 0;
  var _g207 = form;
  while ((i < length(_g207))) {
    var condition = _g207[i];
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
}}, "while": {stmt: true, module: "compiler", export: true, tr: true, special: function (_g208) {
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
}}, "with-indent": {macro: function (form) {
  var result = make_id();
  return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
}, export: true, module: "compiler"}, "compile-toplevel": {variable: true, export: true, module: "compiler"}, "%local-function": {stmt: true, module: "compiler", export: true, tr: true, special: function (_g210) {
  var name = _g210[0];
  var args = _g210[1];
  var body = sub(_g210, 2);
  return(compile_function(args, body, {_stash: true, name: name, prefix: "local "}));
}}, "quote-environment": {variable: true, export: true, module: "compiler"}, "%function": {export: true, module: "compiler", special: function (_g211) {
  var args = _g211[0];
  var body = sub(_g211, 1);
  return(compile_function(args, body));
}}, "return": {export: true, stmt: true, special: function (_g212) {
  var x = _g212[0];
  var x = (function () {
    if (nil63(x)) {
      return("return");
    } else {
      return(compile_call(["return", x]));
    }
  })();
  return((indentation() + x));
}, module: "compiler"}, "error": {export: true, stmt: true, special: function (_g213) {
  var x = _g213[0];
  var e = (function () {
    if ((target === "js")) {
      return(("throw " + compile(x)));
    } else {
      return(compile_call(["error", x]));
    }
  })();
  return((indentation() + e));
}, module: "compiler"}}}, reader: {import: ["lib", "compiler"], toplevel: {"read-from-string": {variable: true, export: true, module: "reader"}, "define-reader": {macro: function (_g214) {
  var char = _g214[0];
  var stream = _g214[1];
  var body = unstash(sublist(arguments, 1));
  var _g215 = sub(body, 0);
  return(["set", ["get", "read-table", char], join(["fn", [stream]], _g215)]);
}, export: true, module: "reader"}, read: {variable: true, export: true, module: "reader"}, "make-stream": {variable: true, export: true, module: "reader"}, "read-all": {variable: true, export: true, module: "reader"}}}, boot: {import: ["lib", "compiler"], toplevel: {}}, init: {import: ["lib", "compiler"], toplevel: {}}, lib: {import: ["lib", "compiler"], toplevel: {last: {variable: true, export: true, module: "lib"}, "composite?": {variable: true, export: true, module: "lib"}, "with-bindings": {macro: function (_g216) {
  var names = _g216[0];
  var body = unstash(sublist(arguments, 1));
  var _g217 = sub(body, 0);
  var x = make_id();
  return(join(["with-frame", ["across", [names, x], (function () {
    var _g218 = ["setenv", x];
    _g218.variable = true;
    return(_g218);
  })()]], _g217));
}, export: true, module: "lib"}, "parse-number": {variable: true, export: true, module: "lib"}, unstash: {variable: true, export: true, module: "lib"}, setenv: {variable: true, export: true, module: "lib"}, "special-form?": {variable: true, export: true, module: "lib"}, mapt: {variable: true, export: true, module: "lib"}, "nil?": {variable: true, export: true, module: "lib"}, "cat!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g219 = sub(bs, 0);
  return(["set", a, join(["cat", a], _g219)]);
}, export: true, module: "lib"}, getenv: {variable: true, export: true, module: "lib"}, "string-literal?": {variable: true, export: true, module: "lib"}, exclude: {variable: true, export: true, module: "lib"}, "cat": {variable: true, export: true, module: "lib"}, macroexpand: {variable: true, export: true, module: "lib"}, language: {macro: function () {
  return(["quote", target]);
}, export: true, module: "lib"}, "-": {variable: true, export: true, module: "lib"}, "/": {variable: true, export: true, module: "lib"}, "function?": {variable: true, export: true, module: "lib"}, "table?": {variable: true, export: true, module: "lib"}, across: {macro: function (_g220) {
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
}, export: true, module: "lib"}, apply: {variable: true, export: true, module: "lib"}, "<=": {variable: true, export: true, module: "lib"}, "boolean?": {variable: true, export: true, module: "lib"}, drop: {variable: true, export: true, module: "lib"}, replicate: {variable: true, export: true, module: "lib"}, quoted: {variable: true, export: true, module: "lib"}, dec: {macro: function (n, by) {
  return(["set", n, ["-", n, (by || 1)]]);
}, export: true, module: "lib"}, hd: {variable: true, export: true, module: "lib"}, tl: {variable: true, export: true, module: "lib"}, mapo: {variable: true, export: true, module: "lib"}, "%export": {macro: function () {
  var toplevel = hd(environment);
  var m = make_id();
  var k = module_key(current_module);
  var form = ["do", ["define", m, ["table"]], ["set", ["get", "exports", ["quote", k]], m]];
  var k = undefined;
  var _g222 = toplevel;
  for (k in _g222) {
    if (isNaN(parseInt(k))) {
      var v = _g222[k];
      if ((v.variable && v.export && (v.module === current_module))) {
        add(form, ["set", ["get", m, ["quote", k]], k]);
      }
    }
  }
  return(form);
}, export: true, module: "lib"}, "list?": {variable: true, export: true, module: "lib"}, splice: {variable: true, export: true, module: "lib"}, reduce: {variable: true, export: true, module: "lib"}, "+": {variable: true, export: true, module: "lib"}, "to-string": {variable: true, export: true, module: "lib"}, "set-of": {macro: function () {
  var elements = unstash(sublist(arguments, 0));
  var l = [];
  var _g224 = 0;
  var _g223 = elements;
  while ((_g224 < length(_g223))) {
    var e = _g223[_g224];
    l[e] = true;
    _g224 = (_g224 + 1);
  }
  return(join(["table"], l));
}, export: true, module: "lib"}, print: {variable: true, export: true, module: "lib"}, find: {variable: true, export: true, module: "lib"}, code: {variable: true, export: true, module: "lib"}, length: {variable: true, export: true, module: "lib"}, "empty?": {variable: true, export: true, module: "lib"}, "write-file": {variable: true, export: true, module: "lib"}, table: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  return(join(["%object"], mapo(function (_g2, x) {
    return(x);
  }, body)));
}, export: true, module: "lib"}, reverse: {variable: true, export: true, module: "lib"}, "%": {variable: true, export: true, module: "lib"}, "special?": {variable: true, export: true, module: "lib"}, "define-local": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g225 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g225))) {
    var _g226 = bind_arguments(x, _g225);
    var args = _g226[0];
    var _g227 = _g226[1];
    return(join(["%local-function", name, args], _g227));
  } else {
    return(["%local", name, x]);
  }
}, export: true, module: "lib"}, each: {macro: function (_g228) {
  var t = _g228[0];
  var k = _g228[1];
  var v = _g228[2];
  var body = unstash(sublist(arguments, 1));
  var _g229 = sub(body, 0);
  var t1 = make_id();
  return(["let", [k, "nil", t1, t], ["%for", [t1, k], ["if", (function () {
    var _g230 = ["target"];
    _g230.js = ["isNaN", ["parseInt", k]];
    _g230.lua = ["not", ["number?", k]];
    return(_g230);
  })(), join(["let", [v, ["get", t1, k]]], _g229)]]]);
}, export: true, module: "lib"}, "string?": {variable: true, export: true, module: "lib"}, "atom?": {variable: true, export: true, module: "lib"}, "define-special": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g231 = sub(body, 0);
  var form = join(["fn", args], _g231);
  var keys = sub(_g231, length(_g231));
  eval(join((function () {
    var _g232 = ["setenv", ["quote", name]];
    _g232.form = ["quote", form];
    _g232.special = form;
    return(_g232);
  })(), keys));
  return(undefined);
}, export: true, module: "lib"}, "=": {variable: true, export: true, module: "lib"}, pairwise: {variable: true, export: true, module: "lib"}, target: {variable: true, export: true, macro: function () {
  var clauses = unstash(sublist(arguments, 0));
  return(clauses[target]);
}, module: "lib"}, inc: {macro: function (n, by) {
  return(["set", n, ["+", n, (by || 1)]]);
}, export: true, module: "lib"}, "read-file": {variable: true, export: true, module: "lib"}, "make-id": {variable: true, export: true, module: "lib"}, "<": {variable: true, export: true, module: "lib"}, quasiquote: {macro: function (form) {
  return(quasiexpand(form, 1));
}, export: true, module: "lib"}, "join!": {macro: function (a) {
  var bs = unstash(sublist(arguments, 1));
  var _g233 = sub(bs, 0);
  return(["set", a, join(["join*", a], _g233)]);
}, export: true, module: "lib"}, write: {variable: true, export: true, module: "lib"}, define: {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g234 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  return(join(["define-global", name, x], _g234));
}, export: true, module: "lib"}, type: {variable: true, export: true, module: "lib"}, "list*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  if (empty63(xs)) {
    return([]);
  } else {
    var l = [];
    var i = 0;
    var _g235 = xs;
    while ((i < length(_g235))) {
      var x = _g235[i];
      if ((i === (length(xs) - 1))) {
        l = ["join", join(["list"], l), x];
      } else {
        add(l, x);
      }
      i = (i + 1);
    }
    return(l);
  }
}, export: true, module: "lib"}, search: {variable: true, export: true, module: "lib"}, extend: {variable: true, export: true, module: "lib"}, "keys?": {variable: true, export: true, module: "lib"}, "id-literal?": {variable: true, export: true, module: "lib"}, let: {macro: function (bindings) {
  var body = unstash(sublist(arguments, 1));
  var _g236 = sub(body, 0);
  var i = 0;
  var renames = [];
  var locals = [];
  map(function (_g237) {
    var lh = _g237[0];
    var rh = _g237[1];
    var _g239 = 0;
    var _g238 = bind(lh, rh);
    while ((_g239 < length(_g238))) {
      var _g240 = _g238[_g239];
      var id = _g240[0];
      var val = _g240[1];
      if (bound63(id)) {
        var rename = make_id();
        add(renames, id);
        add(renames, rename);
        id = rename;
      } else {
        setenv(id, {_stash: true, variable: true});
      }
      add(locals, ["%local", id, val]);
      _g239 = (_g239 + 1);
    }
  }, pairwise(bindings));
  return(join(["do"], join(locals, [join(["let-symbol", renames], _g236)])));
}, export: true, module: "lib"}, keep: {variable: true, export: true, module: "lib"}, split: {variable: true, export: true, module: "lib"}, "stash*": {variable: true, export: true, module: "lib"}, map: {variable: true, export: true, module: "lib"}, fn: {macro: function (args) {
  var body = unstash(sublist(arguments, 1));
  var _g241 = sub(body, 0);
  var _g242 = bind_arguments(args, _g241);
  var args = _g242[0];
  var _g243 = _g242[1];
  return(join(["%function", args], _g243));
}, export: true, module: "lib"}, "is?": {variable: true, export: true, module: "lib"}, "with-frame": {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var x = make_id();
  return(["do", ["add", "environment", ["table"]], ["let", [x, join(["do"], body)], ["drop", "environment"], x]]);
}, export: true, module: "lib"}, "join*": {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  return(reduce(function (a, b) {
    return(["join", a, b]);
  }, xs));
}, export: true, module: "lib"}, at: {macro: function (l, i) {
  if (((target === "lua") && number63(i))) {
    i = (i + 1);
  } else if ((target === "lua")) {
    i = ["+", i, 1];
  }
  return(["get", l, i]);
}, export: true, module: "lib"}, iterate: {variable: true, export: true, module: "lib"}, ">": {variable: true, export: true, module: "lib"}, guard: {macro: function (expr) {
  if ((target === "js")) {
    return([["fn", [], ["%try", ["list", true, expr]]]]);
  } else {
    var e = make_id();
    var x = make_id();
    var ex = ("|" + e + "," + x + "|");
    return(["let", [ex, ["xpcall", ["fn", [], expr], "message-handler"]], ["list", e, x]]);
  }
}, export: true, module: "lib"}, list: {macro: function () {
  var body = unstash(sublist(arguments, 0));
  var l = join(["%array"], body);
  if (!(keys63(body))) {
    return(l);
  } else {
    var id = make_id();
    var init = [];
    var k = undefined;
    var _g244 = body;
    for (k in _g244) {
      if (isNaN(parseInt(k))) {
        var v = _g244[k];
        add(init, ["set", ["get", id, ["quote", k]], v]);
      }
    }
    return(join(["let", [id, l]], join(init, [id])));
  }
}, export: true, module: "lib"}, join: {variable: true, export: true, module: "lib"}, "number?": {variable: true, export: true, module: "lib"}, exit: {variable: true, export: true, module: "lib"}, add: {variable: true, export: true, module: "lib"}, quote: {macro: function (form) {
  return(quoted(form));
}, export: true, module: "lib"}, "let-macro": {macro: function (definitions) {
  var body = unstash(sublist(arguments, 1));
  var _g245 = sub(body, 0);
  add(environment, {});
  var _g246 = (function () {
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    return(join(["do"], macroexpand(_g245)));
  })();
  drop(environment);
  return(_g246);
}, export: true, module: "lib"}, pr: {macro: function () {
  var xs = unstash(sublist(arguments, 0));
  var xs = map(function (x) {
    return(splice([["to-string", x], "\" \""]));
  }, xs);
  return(["print", join(["cat"], xs)]);
}, export: true, module: "lib"}, "*": {variable: true, export: true, module: "lib"}, "define-symbol": {macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  return(undefined);
}, export: true, module: "lib"}, "define-macro": {macro: function (name, args) {
  var body = unstash(sublist(arguments, 2));
  var _g247 = sub(body, 0);
  var form = join(["fn", args], _g247);
  eval((function () {
    var _g248 = ["setenv", ["quote", name]];
    _g248.macro = form;
    _g248.form = ["quote", form];
    return(_g248);
  })());
  return(undefined);
}, export: true, module: "lib"}, sub: {variable: true, export: true, module: "lib"}, "map*": {variable: true, export: true, module: "lib"}, char: {variable: true, export: true, module: "lib"}, "define-global": {macro: function (name, x) {
  var body = unstash(sublist(arguments, 2));
  var _g249 = sub(body, 0);
  setenv(name, {_stash: true, variable: true});
  if (!(empty63(_g249))) {
    var _g250 = bind_arguments(x, _g249);
    var args = _g250[0];
    var _g251 = _g250[1];
    return(join(["%global-function", name, args], _g251));
  } else {
    return(["set", name, x]);
  }
}, export: true, module: "lib"}, ">=": {variable: true, export: true, module: "lib"}, inner: {variable: true, export: true, module: "lib"}, "let-symbol": {macro: function (expansions) {
  var body = unstash(sublist(arguments, 1));
  var _g252 = sub(body, 0);
  add(environment, {});
  var _g253 = (function () {
    map(function (_g254) {
      var name = _g254[0];
      var exp = _g254[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    return(join(["do"], macroexpand(_g252)));
  })();
  drop(environment);
  return(_g253);
}, export: true, module: "lib"}}}};
environment = [{"define-module": {macro: function (spec) {
  var body = unstash(sublist(arguments, 1));
  var _g255 = sub(body, 0);
  var exp = _g255.export;
  var imp = _g255.import;
  map(load_module, imp);
  modules[module_key(spec)] = {toplevel: {}, import: imp, export: {}};
  var _g257 = 0;
  var _g256 = (exp || []);
  while ((_g257 < length(_g256))) {
    var k = _g256[_g257];
    setenv(k, {_stash: true, export: true});
    _g257 = (_g257 + 1);
  }
}, export: true, module: "compiler"}}];
_g258 = {};
exports.boot = _g258;
_g258.environment = environment;
_g258.modules = modules;
rep = function (str) {
  var _g259 = (function () {
    try {
      return([true, eval(read_from_string(str))]);
    }
    catch (_g262) {
      return([false, _g262]);
    }
  })();
  var _g1 = _g259[0];
  var x = _g259[1];
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
  var _g260 = args;
  while ((i < length(_g260))) {
    var arg = _g260[i];
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
_g261 = {};
exports.main = _g261;
