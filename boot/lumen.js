(function () {
  global.nexus = {};
  return;
})();
(function () {
  function nil63(x) {
    return((x === undefined));
  }
  function is63(x) {
    return(!(nil63(x)));
  }
  function length(x) {
    return(x.length);
  }
  function empty63(x) {
    return((length(x) === 0));
  }
  function some63(x) {
    return((length(x) > 0));
  }
  function hd(l) {
    return(l[0]);
  }
  function type(x) {
    return(typeof(x));
  }
  function string63(x) {
    return((type(x) === "string"));
  }
  function number63(x) {
    return((type(x) === "number"));
  }
  function boolean63(x) {
    return((type(x) === "boolean"));
  }
  function function63(x) {
    return((type(x) === "function"));
  }
  function composite63(x) {
    return((type(x) === "object"));
  }
  function atom63(x) {
    return(!(composite63(x)));
  }
  function table63(x) {
    return((composite63(x) && nil63(hd(x))));
  }
  function list63(x) {
    return((composite63(x) && is63(hd(x))));
  }
  function substring(str, from, upto) {
    return((str.substring)(from, upto));
  }
  function sublist(l, from, upto) {
    return((Array.prototype.slice.call)(l, from, upto));
  }
  function sub(x, from, upto) {
    var _g3 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g3, upto));
    } else {
      var l = sublist(x, _g3, upto);
      var k = undefined;
      var _g4 = x;
      for (k in _g4) {
        if (isNaN(parseInt(k))) {
          var v = _g4[k];
          l[k] = v;
        }
      }
      return(l);
    }
  }
  function inner(x) {
    return(sub(x, 1, (length(x) - 1)));
  }
  function tl(l) {
    return(sub(l, 1));
  }
  function char(str, n) {
    return((str.charAt)(n));
  }
  function code(str, n) {
    return((str.charCodeAt)(n));
  }
  function string_literal63(x) {
    return((string63(x) && (char(x, 0) === "\"")));
  }
  function id_literal63(x) {
    return((string63(x) && (char(x, 0) === "|")));
  }
  function add(l, x) {
    return((l.push)(x));
  }
  function drop(l) {
    return((l.pop)());
  }
  function last(l) {
    return(l[(length(l) - 1)]);
  }
  function reverse(l) {
    var l1 = [];
    var i = (length(l) - 1);
    while ((i >= 0)) {
      add(l1, l[i]);
      i = (i - 1);
    }
    return(l1);
  }
  function join(l1, l2) {
    if ((nil63(l2) && nil63(l1))) {
      return([]);
    } else if (nil63(l1)) {
      return(join([], l2));
    } else if (nil63(l2)) {
      return(join(l1, []));
    } else if ((atom63(l1) && atom63(l2))) {
      return([l1, l2]);
    } else if (atom63(l1)) {
      return(join([l1], l2));
    } else if (atom63(l2)) {
      return(join(l1, [l2]));
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
      var _g5 = l1;
      for (k in _g5) {
        if (isNaN(parseInt(k))) {
          var v = _g5[k];
          l[k] = v;
        }
      }
      var _g7 = undefined;
      var _g6 = l2;
      for (_g7 in _g6) {
        if (isNaN(parseInt(_g7))) {
          var v = _g6[_g7];
          l[_g7] = v;
        }
      }
      return(l);
    }
  }
  function reduce(f, x) {
    if (empty63(x)) {
      return(x);
    } else if ((length(x) === 1)) {
      return(hd(x));
    } else {
      return(f(hd(x), reduce(f, tl(x))));
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g9 = 0;
    var _g8 = l;
    while ((_g9 < length(_g8))) {
      var x = _g8[_g9];
      if (f(x)) {
        add(l1, x);
      }
      _g9 = (_g9 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g11 = 0;
    var _g10 = l;
    while ((_g11 < length(_g10))) {
      var x = _g10[_g11];
      var _g12 = f(x);
      if (_g12) {
        return(_g12);
      }
      _g11 = (_g11 + 1);
    }
  }
  function pairwise(l) {
    var i = 0;
    var l1 = [];
    while ((i < length(l))) {
      add(l1, [l[i], l[(i + 1)]]);
      i = (i + 2);
    }
    return(l1);
  }
  function iterate(f, count) {
    var i = 0;
    while ((i < count)) {
      f(i);
      i = (i + 1);
    }
  }
  function replicate(n, x) {
    var l = [];
    iterate(function () {
      return(add(l, x));
    }, n);
    return(l);
  }
  function splice(x) {
    return({_splice: true, value: x});
  }
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  function map(f, l) {
    var l1 = [];
    var _g14 = 0;
    var _g13 = l;
    while ((_g14 < length(_g13))) {
      var x = _g13[_g14];
      var x1 = f(x);
      if (splice63(x1)) {
        l1 = join(l1, x1.value);
      } else if (is63(x1)) {
        add(l1, x1);
      }
      _g14 = (_g14 + 1);
    }
    return(l1);
  }
  function map42(f, t) {
    var l = map(f, t);
    var k = undefined;
    var _g15 = t;
    for (k in _g15) {
      if (isNaN(parseInt(k))) {
        var v = _g15[k];
        var x = f(v);
        if (is63(x)) {
          l[k] = x;
        }
      }
    }
    return(l);
  }
  function mapt(f, t) {
    var t1 = {};
    var k = undefined;
    var _g16 = t;
    for (k in _g16) {
      if (isNaN(parseInt(k))) {
        var v = _g16[k];
        var x = f(k, v);
        if (is63(x)) {
          t1[k] = x;
        }
      }
    }
    return(t1);
  }
  function mapo(f, t) {
    var o = [];
    var k = undefined;
    var _g17 = t;
    for (k in _g17) {
      if (isNaN(parseInt(k))) {
        var v = _g17[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function keys63(t) {
    var k = undefined;
    var k1 = undefined;
    var _g18 = t;
    for (k1 in _g18) {
      if (isNaN(parseInt(k1))) {
        var v = _g18[k1];
        k = k1;
        break;
      }
    }
    return(k);
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var k = undefined;
      var _g19 = args;
      for (k in _g19) {
        if (isNaN(parseInt(k))) {
          var v = _g19[k];
          p[k] = v;
        }
      }
      return(join(args, [p]));
    } else {
      return(args);
    }
  }
  function unstash(args) {
    if (empty63(args)) {
      return([]);
    } else {
      var l = last(args);
      if ((table63(l) && l._stash)) {
        var args1 = sub(args, 0, (length(args) - 1));
        var k = undefined;
        var _g20 = l;
        for (k in _g20) {
          if (isNaN(parseInt(k))) {
            var v = _g20[k];
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
  }
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g21 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var k1 = undefined;
      var _g22 = _g21;
      for (k1 in _g22) {
        if (isNaN(parseInt(k1))) {
          var v = _g22[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g23 = sub(xs, 0);
    return(join(t, _g23));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g24 = sub(keys, 0);
    var t1 = sublist(t);
    var k = undefined;
    var _g25 = t;
    for (k in _g25) {
      if (isNaN(parseInt(k))) {
        var v = _g25[k];
        if (!(_g24[k])) {
          t1[k] = v;
        }
      }
    }
    return(t1);
  }
  function search(str, pattern, start) {
    var i = (str.indexOf)(pattern, start);
    if ((i >= 0)) {
      return(i);
    }
  }
  function split(str, sep) {
    return((str.split)(sep));
  }
  function cat() {
    var xs = unstash(sublist(arguments, 0));
    var _g26 = sub(xs, 0);
    if (empty63(_g26)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g26));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g27 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g27));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g28 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g28)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g29 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g29));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g30 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g30)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g31 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g31)));
  }
  function _62(a, b) {
    return((a > b));
  }
  function _60(a, b) {
    return((a < b));
  }
  function _61(a, b) {
    return((a === b));
  }
  function _6261(a, b) {
    return((a >= b));
  }
  function _6061(a, b) {
    return((a <= b));
  }
  var fs = require("fs");
  function read_file(path) {
    return((fs.readFileSync)(path, "utf8"));
  }
  function write_file(path, data) {
    return((fs.writeFileSync)(path, data, "utf8"));
  }
  function print(x) {
    return((console.log)(x));
  }
  function write(x) {
    return((process.stdout.write)(x));
  }
  function exit(code) {
    return((process.exit)(code));
  }
  function type(x) {
    return(typeof(x));
  }
  function parse_number(str) {
    var n = parseFloat(str);
    if (!(isNaN(n))) {
      return(n);
    }
  }
  function to_string(x) {
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
      var _g32 = x;
      for (k in _g32) {
        if (isNaN(parseInt(k))) {
          var v = _g32[k];
          add(x1, (k + ":"));
          add(x1, v);
        }
      }
      var i = 0;
      var _g33 = x1;
      while ((i < length(_g33))) {
        var y = _g33[i];
        str = (str + to_string(y));
        if ((i < (length(x1) - 1))) {
          str = (str + " ");
        }
        i = (i + 1);
      }
      return((str + ")"));
    }
  }
  function apply(f, args) {
    var _g34 = stash(args);
    return((f.apply)(f, _g34));
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  }
  _g35 = {};
  nexus.runtime = _g35;
  _g35["nil?"] = nil63;
  _g35["is?"] = is63;
  _g35.length = length;
  _g35["empty?"] = empty63;
  _g35["some?"] = some63;
  _g35.hd = hd;
  _g35["string?"] = string63;
  _g35["number?"] = number63;
  _g35["boolean?"] = boolean63;
  _g35["function?"] = function63;
  _g35["composite?"] = composite63;
  _g35["atom?"] = atom63;
  _g35["table?"] = table63;
  _g35["list?"] = list63;
  _g35.substring = substring;
  _g35.sublist = sublist;
  _g35.sub = sub;
  _g35.inner = inner;
  _g35.tl = tl;
  _g35.char = char;
  _g35.code = code;
  _g35["string-literal?"] = string_literal63;
  _g35["id-literal?"] = id_literal63;
  _g35.add = add;
  _g35.drop = drop;
  _g35.last = last;
  _g35.reverse = reverse;
  _g35.join = join;
  _g35.reduce = reduce;
  _g35.keep = keep;
  _g35.find = find;
  _g35.pairwise = pairwise;
  _g35.iterate = iterate;
  _g35.replicate = replicate;
  _g35.splice = splice;
  _g35.map = map;
  _g35["map*"] = map42;
  _g35.mapt = mapt;
  _g35.mapo = mapo;
  _g35["keys?"] = keys63;
  _g35.setenv = setenv;
  _g35.stash = stash;
  _g35.unstash = unstash;
  _g35.extend = extend;
  _g35.exclude = exclude;
  _g35.search = search;
  _g35.split = split;
  _g35.cat = cat;
  _g35["+"] = _43;
  _g35["-"] = _;
  _g35["*"] = _42;
  _g35["/"] = _47;
  _g35["%"] = _37;
  _g35[">"] = _62;
  _g35["<"] = _60;
  _g35["="] = _61;
  _g35[">="] = _6261;
  _g35["<="] = _6061;
  _g35["read-file"] = read_file;
  _g35["write-file"] = write_file;
  _g35.print = print;
  _g35.write = write;
  _g35.exit = exit;
  _g35["parse-number"] = parse_number;
  _g35["to-string"] = to_string;
  _g35.apply = apply;
  _g35["%message-handler"] = _37message_handler;
})();
(function () {
  var _g42 = nexus.runtime;
  var nil63 = _g42["nil?"];
  var is63 = _g42["is?"];
  var length = _g42.length;
  var empty63 = _g42["empty?"];
  var some63 = _g42["some?"];
  var hd = _g42.hd;
  var string63 = _g42["string?"];
  var number63 = _g42["number?"];
  var boolean63 = _g42["boolean?"];
  var function63 = _g42["function?"];
  var composite63 = _g42["composite?"];
  var atom63 = _g42["atom?"];
  var table63 = _g42["table?"];
  var list63 = _g42["list?"];
  var substring = _g42.substring;
  var sublist = _g42.sublist;
  var sub = _g42.sub;
  var inner = _g42.inner;
  var tl = _g42.tl;
  var char = _g42.char;
  var code = _g42.code;
  var string_literal63 = _g42["string-literal?"];
  var id_literal63 = _g42["id-literal?"];
  var add = _g42.add;
  var drop = _g42.drop;
  var last = _g42.last;
  var reverse = _g42.reverse;
  var join = _g42.join;
  var reduce = _g42.reduce;
  var keep = _g42.keep;
  var find = _g42.find;
  var pairwise = _g42.pairwise;
  var iterate = _g42.iterate;
  var replicate = _g42.replicate;
  var splice = _g42.splice;
  var map = _g42.map;
  var map42 = _g42["map*"];
  var mapt = _g42.mapt;
  var mapo = _g42.mapo;
  var keys63 = _g42["keys?"];
  var setenv = _g42.setenv;
  var stash = _g42.stash;
  var unstash = _g42.unstash;
  var extend = _g42.extend;
  var exclude = _g42.exclude;
  var search = _g42.search;
  var split = _g42.split;
  var cat = _g42.cat;
  var _43 = _g42["+"];
  var _ = _g42["-"];
  var _42 = _g42["*"];
  var _47 = _g42["/"];
  var _37 = _g42["%"];
  var _62 = _g42[">"];
  var _60 = _g42["<"];
  var _61 = _g42["="];
  var _6261 = _g42[">="];
  var _6061 = _g42["<="];
  var read_file = _g42["read-file"];
  var write_file = _g42["write-file"];
  var print = _g42.print;
  var write = _g42.write;
  var exit = _g42.exit;
  var parse_number = _g42["parse-number"];
  var to_string = _g42["to-string"];
  var apply = _g42.apply;
  var _37message_handler = _g42["%message-handler"];
  getenv = function (k) {
    var keys = unstash(sublist(arguments, 1));
    var _g43 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g44 = keys63(_g43);
        if (_g44) {
          return(b[_g44]);
        } else {
          return(b);
        }
      }
    }
  };
  macro_function = function (k) {
    return(getenv(k, {_stash: true, macro: true}));
  };
  macro63 = function (k) {
    return(is63(macro_function(k)));
  };
  special63 = function (k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  };
  special_form63 = function (form) {
    return((list63(form) && special63(hd(form))));
  };
  symbol_expansion = function (k) {
    return(getenv(k, {_stash: true, symbol: true}));
  };
  symbol63 = function (k) {
    return(is63(symbol_expansion(k)));
  };
  variable63 = function (k) {
    var b = find(function (frame) {
      return((frame[k] || frame._scope));
    }, reverse(environment));
    return((table63(b) && is63(b.variable)));
  };
  global63 = function (k) {
    return(getenv(k, {_stash: true, global: true}));
  };
  bound63 = function (x) {
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x)));
  };
  function escape(str) {
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
  }
  quoted = function (form) {
    if (string63(form)) {
      return(escape(form));
    } else if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map42(quoted, form)));
    }
  };
  stash42 = function (args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var k = undefined;
      var _g45 = args;
      for (k in _g45) {
        if (isNaN(parseInt(k))) {
          var v = _g45[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  };
  var id_count = 0;
  make_id = function () {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  };
  bind = function (lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([join([id, rh])], bind(lh, id)));
    } else if (atom63(lh)) {
      return(join([join([lh, rh])]));
    } else {
      var bs = [];
      var r = lh.rest;
      var i = 0;
      var _g46 = lh;
      while ((i < length(_g46))) {
        var x = _g46[i];
        bs = join(bs, bind(x, join(["at", rh, i])));
        i = (i + 1);
      }
      if (r) {
        bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
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
            bs = join(bs, bind(v, join(["get", rh, join(["quote", k])])));
          }
        }
      }
      return(bs);
    }
  };
  bind42 = function (args, body) {
    var args1 = [];
    function rest() {
      if ((target === "js")) {
        return(join(["unstash", join(["sublist", "arguments", length(args1)])]));
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, join([join(["let", [args, rest()]], body)])]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g49 = 0;
      var _g48 = args;
      while ((_g49 < length(_g48))) {
        var arg = _g48[_g49];
        if (atom63(arg)) {
          add(args1, arg);
        } else if ((list63(arg) || keys63(arg))) {
          var v = make_id();
          add(args1, v);
          bs = join(bs, [arg, v]);
        }
        _g49 = (_g49 + 1);
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
        return([args1, join([join(["let", bs], body)])]);
      }
    }
  };
  function quoting63(depth) {
    return(number63(depth));
  }
  function quasiquoting63(depth) {
    return((quoting63(depth) && (depth > 0)));
  }
  function can_unquote63(depth) {
    return((quoting63(depth) && (depth === 1)));
  }
  function quasisplice63(x, depth) {
    return((list63(x) && can_unquote63(depth) && (hd(x) === "unquote-splicing")));
  }
  macroexpand = function (form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if ((x === "%for")) {
        var _g37 = form[0];
        var _g50 = form[1];
        var t = _g50[0];
        var k = _g50[1];
        var body = sub(form, 2);
        return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
      } else if ((x === "%function")) {
        var _g38 = form[0];
        var args = form[1];
        var _g51 = sub(form, 2);
        add(environment, {_scope: true});
        var _g53 = (function () {
          var _g55 = 0;
          var _g54 = args;
          while ((_g55 < length(_g54))) {
            var _g52 = _g54[_g55];
            setenv(_g52, {_stash: true, variable: true});
            _g55 = (_g55 + 1);
          }
          return(join(["%function", map42(macroexpand, args)], macroexpand(_g51)));
        })();
        drop(environment);
        return(_g53);
      } else if (((x === "%local-function") || (x === "%global-function"))) {
        var _g39 = form[0];
        var name = form[1];
        var _g56 = form[2];
        var _g57 = sub(form, 3);
        add(environment, {_scope: true});
        var _g59 = (function () {
          var _g61 = 0;
          var _g60 = _g56;
          while ((_g61 < length(_g60))) {
            var _g58 = _g60[_g61];
            setenv(_g58, {_stash: true, variable: true});
            _g61 = (_g61 + 1);
          }
          return(join([x, name, map42(macroexpand, _g56)], macroexpand(_g57)));
        })();
        drop(environment);
        return(_g59);
      } else if (macro63(x)) {
        return(macroexpand(apply(macro_function(x), tl(form))));
      } else {
        return(map42(macroexpand, form));
      }
    }
  };
  function quasiquote_list(form, depth) {
    var xs = [["list"]];
    var k = undefined;
    var _g62 = form;
    for (k in _g62) {
      if (isNaN(parseInt(k))) {
        var v = _g62[k];
        var _g63 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g63;
      }
    }
    var _g65 = 0;
    var _g64 = form;
    while ((_g65 < length(_g64))) {
      var x = _g64[_g65];
      if (quasisplice63(x, depth)) {
        var _g66 = quasiexpand(x[1]);
        add(xs, _g66);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g65 = (_g65 + 1);
    }
    var pruned = keep(function (x) {
      return(((length(x) > 1) || !((hd(x) === "list")) || keys63(x)));
    }, xs);
    return(join(["join*"], pruned));
  }
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
  global.indent_level = 0;
  indentation = function () {
    return(apply(cat, replicate(indent_level, "  ")));
  };
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }
  valid_id63 = function (id) {
    if (empty63(id)) {
      return(false);
    } else if (special63(id)) {
      return(false);
    } else if (reserved[id]) {
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
  to_id = function (id) {
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
  module_key = function (spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw "Unsupported module specification";
    }
  };
  exported = function () {
    var toplevel = hd(environment);
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var n = undefined;
    var _g69 = toplevel;
    for (n in _g69) {
      if (isNaN(parseInt(n))) {
        var b = _g69[n];
        if ((b.variable && b.export && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["define", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  };
  imported = function (spec) {
    var k = module_key(spec);
    var x = nexus[k];
    if ((x && keys63(x))) {
      var m = make_id();
      var imports = [];
      add(imports, join(["%local", m, join(["get", "nexus", join(["quote", k])])]));
      var b = undefined;
      var _g70 = x;
      for (b in _g70) {
        if (isNaN(parseInt(b))) {
          var _g40 = _g70[b];
          add(imports, join(["%local", b, join(["get", m, join(["quote", b])])]));
        }
      }
      return(imports);
    }
  };
  function quote_binding(b) {
    b = extend(b, {_stash: true, module: join(["quote", b.module])});
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: join(["quote", b.symbol])}));
    } else if ((b.macro && b.form)) {
      return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
    } else if ((b.special && b.form)) {
      return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
    } else if (is63(b.variable)) {
      return(b);
    } else if (is63(b.global)) {
      return(b);
    }
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g41, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  quote_environment = function (env) {
    return(join(["list"], map(quote_frame, env)));
  };
  function quote_module(m) {
    return(join((function () {
      var _g71 = ["table"];
      _g71.import = quoted(m.import);
      _g71.export = quote_frame(m.export);
      return(_g71);
    })()));
  }
  quote_modules = function () {
    return(join(["table"], map42(quote_module, modules)));
  };
  initial_environment = function () {
    return([{"define-module": getenv("define-module")}]);
  };
  _g72 = {};
  nexus.utilities = _g72;
  _g72.getenv = getenv;
  _g72["macro-function"] = macro_function;
  _g72["macro?"] = macro63;
  _g72["special?"] = special63;
  _g72["special-form?"] = special_form63;
  _g72["symbol-expansion"] = symbol_expansion;
  _g72["symbol?"] = symbol63;
  _g72["variable?"] = variable63;
  _g72["bound?"] = bound63;
  _g72.quoted = quoted;
  _g72["stash*"] = stash42;
  _g72.bind = bind;
  _g72["bind*"] = bind42;
  _g72.quasiexpand = quasiexpand;
  _g72.macroexpand = macroexpand;
  _g72.indentation = indentation;
  _g72["valid-id?"] = valid_id63;
  _g72["to-id"] = to_id;
  _g72["module-key"] = module_key;
  _g72.imported = imported;
  _g72.exported = exported;
  _g72["quote-environment"] = quote_environment;
  _g72["quote-modules"] = quote_modules;
  _g72["initial-environment"] = initial_environment;
})();
(function () {
  var _g74 = nexus.runtime;
  var nil63 = _g74["nil?"];
  var is63 = _g74["is?"];
  var length = _g74.length;
  var empty63 = _g74["empty?"];
  var some63 = _g74["some?"];
  var hd = _g74.hd;
  var string63 = _g74["string?"];
  var number63 = _g74["number?"];
  var boolean63 = _g74["boolean?"];
  var function63 = _g74["function?"];
  var composite63 = _g74["composite?"];
  var atom63 = _g74["atom?"];
  var table63 = _g74["table?"];
  var list63 = _g74["list?"];
  var substring = _g74.substring;
  var sublist = _g74.sublist;
  var sub = _g74.sub;
  var inner = _g74.inner;
  var tl = _g74.tl;
  var char = _g74.char;
  var code = _g74.code;
  var string_literal63 = _g74["string-literal?"];
  var id_literal63 = _g74["id-literal?"];
  var add = _g74.add;
  var drop = _g74.drop;
  var last = _g74.last;
  var reverse = _g74.reverse;
  var join = _g74.join;
  var reduce = _g74.reduce;
  var keep = _g74.keep;
  var find = _g74.find;
  var pairwise = _g74.pairwise;
  var iterate = _g74.iterate;
  var replicate = _g74.replicate;
  var splice = _g74.splice;
  var map = _g74.map;
  var map42 = _g74["map*"];
  var mapt = _g74.mapt;
  var mapo = _g74.mapo;
  var keys63 = _g74["keys?"];
  var setenv = _g74.setenv;
  var stash = _g74.stash;
  var unstash = _g74.unstash;
  var extend = _g74.extend;
  var exclude = _g74.exclude;
  var search = _g74.search;
  var split = _g74.split;
  var cat = _g74.cat;
  var _43 = _g74["+"];
  var _ = _g74["-"];
  var _42 = _g74["*"];
  var _47 = _g74["/"];
  var _37 = _g74["%"];
  var _62 = _g74[">"];
  var _60 = _g74["<"];
  var _61 = _g74["="];
  var _6261 = _g74[">="];
  var _6061 = _g74["<="];
  var read_file = _g74["read-file"];
  var write_file = _g74["write-file"];
  var print = _g74.print;
  var write = _g74.write;
  var exit = _g74.exit;
  var parse_number = _g74["parse-number"];
  var to_string = _g74["to-string"];
  var apply = _g74.apply;
  var _37message_handler = _g74["%message-handler"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
  var whitespace = {" ": true, "\t": true, "\n": true};
  function make_stream(str) {
    return({pos: 0, string: str, len: length(str)});
  }
  function peek_char(s) {
    if ((s.pos < s.len)) {
      return(char(s.string, s.pos));
    }
  }
  function read_char(s) {
    var c = peek_char(s);
    if (c) {
      s.pos = (s.pos + 1);
      return(c);
    }
  }
  function skip_non_code(s) {
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
  }
  var read_table = {};
  var eof = {};
  function read(s) {
    skip_non_code(s);
    var c = peek_char(s);
    if (is63(c)) {
      return(((read_table[c] || read_table[""]))(s));
    } else {
      return(eof);
    }
  }
  function read_all(s) {
    var l = [];
    while (true) {
      var form = read(s);
      if ((form === eof)) {
        break;
      }
      add(l, form);
    }
    return(l);
  }
  function read_from_string(str) {
    return(read(make_stream(str)));
  }
  function key63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, (length(atom) - 1)) === ":")));
  }
  function flag63(atom) {
    return((string63(atom) && (length(atom) > 1) && (char(atom, 0) === ":")));
  }
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
        return(join(["get", b, join(["quote", a])]));
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
  _g80 = {};
  nexus.reader = _g80;
  _g80["make-stream"] = make_stream;
  _g80["read-table"] = read_table;
  _g80.read = read;
  _g80["read-all"] = read_all;
  _g80["read-from-string"] = read_from_string;
})();
(function () {
  var _g82 = nexus.runtime;
  var nil63 = _g82["nil?"];
  var is63 = _g82["is?"];
  var length = _g82.length;
  var empty63 = _g82["empty?"];
  var some63 = _g82["some?"];
  var hd = _g82.hd;
  var string63 = _g82["string?"];
  var number63 = _g82["number?"];
  var boolean63 = _g82["boolean?"];
  var function63 = _g82["function?"];
  var composite63 = _g82["composite?"];
  var atom63 = _g82["atom?"];
  var table63 = _g82["table?"];
  var list63 = _g82["list?"];
  var substring = _g82.substring;
  var sublist = _g82.sublist;
  var sub = _g82.sub;
  var inner = _g82.inner;
  var tl = _g82.tl;
  var char = _g82.char;
  var code = _g82.code;
  var string_literal63 = _g82["string-literal?"];
  var id_literal63 = _g82["id-literal?"];
  var add = _g82.add;
  var drop = _g82.drop;
  var last = _g82.last;
  var reverse = _g82.reverse;
  var join = _g82.join;
  var reduce = _g82.reduce;
  var keep = _g82.keep;
  var find = _g82.find;
  var pairwise = _g82.pairwise;
  var iterate = _g82.iterate;
  var replicate = _g82.replicate;
  var splice = _g82.splice;
  var map = _g82.map;
  var map42 = _g82["map*"];
  var mapt = _g82.mapt;
  var mapo = _g82.mapo;
  var keys63 = _g82["keys?"];
  var setenv = _g82.setenv;
  var stash = _g82.stash;
  var unstash = _g82.unstash;
  var extend = _g82.extend;
  var exclude = _g82.exclude;
  var search = _g82.search;
  var split = _g82.split;
  var cat = _g82.cat;
  var _43 = _g82["+"];
  var _ = _g82["-"];
  var _42 = _g82["*"];
  var _47 = _g82["/"];
  var _37 = _g82["%"];
  var _62 = _g82[">"];
  var _60 = _g82["<"];
  var _61 = _g82["="];
  var _6261 = _g82[">="];
  var _6061 = _g82["<="];
  var read_file = _g82["read-file"];
  var write_file = _g82["write-file"];
  var print = _g82.print;
  var write = _g82.write;
  var exit = _g82.exit;
  var parse_number = _g82["parse-number"];
  var to_string = _g82["to-string"];
  var apply = _g82.apply;
  var _37message_handler = _g82["%message-handler"];
  var _g83 = nexus.utilities;
  var getenv = _g83.getenv;
  var macro_function = _g83["macro-function"];
  var macro63 = _g83["macro?"];
  var special63 = _g83["special?"];
  var special_form63 = _g83["special-form?"];
  var symbol_expansion = _g83["symbol-expansion"];
  var symbol63 = _g83["symbol?"];
  var variable63 = _g83["variable?"];
  var bound63 = _g83["bound?"];
  var quoted = _g83.quoted;
  var stash42 = _g83["stash*"];
  var bind = _g83.bind;
  var bind42 = _g83["bind*"];
  var quasiexpand = _g83.quasiexpand;
  var macroexpand = _g83.macroexpand;
  var indentation = _g83.indentation;
  var valid_id63 = _g83["valid-id?"];
  var to_id = _g83["to-id"];
  var module_key = _g83["module-key"];
  var imported = _g83.imported;
  var exported = _g83.exported;
  var quote_environment = _g83["quote-environment"];
  var quote_modules = _g83["quote-modules"];
  var initial_environment = _g83["initial-environment"];
  var _g84 = nexus.reader;
  var make_stream = _g84["make-stream"];
  var read_table = _g84["read-table"];
  var read = _g84.read;
  var read_all = _g84["read-all"];
  var read_from_string = _g84["read-from-string"];
  var infix = {common: {"+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", "and": "&&", "or": "||", cat: "+"}, lua: {"=": "==", cat: "..", "~=": true, "and": true, "or": true}};
  function getop(op) {
    var op1 = (infix.common[op] || infix[target][op]);
    if ((op1 === true)) {
      return(op);
    } else {
      return(op1);
    }
  }
  function infix63(form) {
    return((list63(form) && is63(getop(hd(form)))));
  }
  function compile_args(args) {
    var str = "(";
    var i = 0;
    var _g85 = args;
    while ((i < length(_g85))) {
      var arg = _g85[i];
      str = (str + compile(arg));
      if ((i < (length(args) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_atom(x) {
    if (((x === "nil") && (target === "lua"))) {
      return(x);
    } else if ((x === "nil")) {
      return("undefined");
    } else if (id_literal63(x)) {
      return(inner(x));
    } else if (string_literal63(x)) {
      return(x);
    } else if (string63(x)) {
      return(to_id(x));
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
  }
  compile_body = function (forms) {
    var _g86 = unstash(sublist(arguments, 1));
    var tail63 = _g86["tail?"];
    var str = "";
    var i = 0;
    var _g87 = forms;
    while ((i < length(_g87))) {
      var x = _g87[i];
      var t63 = (tail63 && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, "stmt?": true, "tail?": t63}));
      i = (i + 1);
    }
    return(str);
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
  function compile_infix(_g88) {
    var op = _g88[0];
    var args = sub(_g88, 1);
    var str = "(";
    var _g89 = getop(op);
    var i = 0;
    var _g90 = args;
    while ((i < length(_g90))) {
      var arg = _g90[i];
      if (((_g89 === "-") && (length(args) === 1))) {
        str = (str + _g89 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g89 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  compile_branch = function (condition, body, first63, last63, tail63) {
    var cond1 = compile(condition);
    var _g91 = (function () {
      indent_level = (indent_level + 1);
      var _g92 = compile(body, {_stash: true, "stmt?": true, "tail?": tail63});
      indent_level = (indent_level - 1);
      return(_g92);
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
      return((ind + "if (" + cond1 + ") {\n" + _g91 + ind + "}" + tr));
    } else if (first63) {
      return((ind + "if " + cond1 + " then\n" + _g91 + tr));
    } else if ((nil63(condition) && (target === "js"))) {
      return((" else {\n" + _g91 + ind + "}\n"));
    } else if (nil63(condition)) {
      return((ind + "else\n" + _g91 + tr));
    } else if ((target === "js")) {
      return((" else if (" + cond1 + ") {\n" + _g91 + ind + "}" + tr));
    } else {
      return((ind + "elseif " + cond1 + " then\n" + _g91 + tr));
    }
  };
  compile_function = function (args, body) {
    var _g93 = unstash(sublist(arguments, 2));
    var name = _g93.name;
    var prefix = _g93.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g94 = (prefix || "");
    var _g95 = compile_args(args);
    var _g96 = (function () {
      indent_level = (indent_level + 1);
      var _g97 = compile_body(body, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g97);
    })();
    var ind = indentation();
    var tr = (function () {
      if ((target === "js")) {
        return("");
      } else {
        return("end");
      }
    })();
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g95 + " {\n" + _g96 + ind + "}" + tr));
    } else {
      return((_g94 + "function " + id + _g95 + "\n" + _g96 + ind + tr));
    }
  };
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else if ((target === "js")) {
      return(";\n");
    } else {
      return("\n");
    }
  }
  compile_special = function (form, stmt63, tail63) {
    var _g98 = getenv(hd(form));
    var special = _g98.special;
    var stmt = _g98.stmt;
    var self_tr63 = _g98.tr;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, "tail?": tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  };
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g99 = unstash(sublist(arguments, 1));
    var stmt63 = _g99["stmt?"];
    var tail63 = _g99["tail?"];
    if ((tail63 && can_return63(form))) {
      form = join(["return", form]);
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
      var _g100 = (function () {
        if (atom63(form)) {
          return(compile_atom(form));
        } else if (infix63(form)) {
          return(compile_infix(form));
        } else {
          return(compile_call(form));
        }
      })();
      return((ind + _g100 + tr));
    }
  };
  global.current_module = undefined;
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g101 = macroexpand(body);
    var epilog = macroexpand(exported());
    return(join([join(["%function", []], join(_g101, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = eval;
  var compiler_output = undefined;
  var compilation_level = undefined;
  compile_module = function (spec) {
    compilation_level = 0;
    compiler_output = "";
    load_module(spec);
    return(compiler_output);
  };
  function _37compile_module(spec) {
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
    var _g115 = toplevel;
    for (name in _g115) {
      if (isNaN(parseInt(name))) {
        var binding = _g115[name];
        if ((binding.export && (binding.module === k))) {
          m.export[name] = binding;
        }
      }
    }
    if (number63(compilation_level)) {
      compilation_level = (compilation_level - 1);
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  load_module = function (spec) {
    if ((nil63(module(spec)) || (compilation_level === 1))) {
      _37compile_module(spec);
    }
    return(open_module(spec));
  };
  open_module = function (spec) {
    var m = module(spec);
    var frame = last(environment);
    var k = undefined;
    var _g116 = m.export;
    for (k in _g116) {
      if (isNaN(parseInt(k))) {
        var v = _g116[k];
        frame[k] = v;
      }
    }
  };
  in_module = function (spec) {
    load_module(spec);
    var m = module(spec);
    return(map(open_module, m.import));
  };
  function prologue(spec) {
    if (spec) {
      var m = module(spec);
      return(join(imported(spec), map(function (x) {
        return(splice(imported(x)));
      }, m.import)));
    }
  }
  eval = function (form, spec) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(spec), [form]));
    var x = compile(macroexpand(form1));
    target = previous;
    return(run(x));
  };
  _g117 = {};
  nexus.compiler = _g117;
  _g117["compile-body"] = compile_body;
  _g117["compile-call"] = compile_call;
  _g117["compile-branch"] = compile_branch;
  _g117["compile-function"] = compile_function;
  _g117["compile-special"] = compile_special;
  _g117.compile = compile;
  _g117.eval = eval;
  _g117["load-module"] = load_module;
  _g117["open-module"] = open_module;
  _g117["in-module"] = in_module;
})();
(function () {
  var _g120 = nexus.runtime;
  var nil63 = _g120["nil?"];
  var is63 = _g120["is?"];
  var length = _g120.length;
  var empty63 = _g120["empty?"];
  var some63 = _g120["some?"];
  var hd = _g120.hd;
  var string63 = _g120["string?"];
  var number63 = _g120["number?"];
  var boolean63 = _g120["boolean?"];
  var function63 = _g120["function?"];
  var composite63 = _g120["composite?"];
  var atom63 = _g120["atom?"];
  var table63 = _g120["table?"];
  var list63 = _g120["list?"];
  var substring = _g120.substring;
  var sublist = _g120.sublist;
  var sub = _g120.sub;
  var inner = _g120.inner;
  var tl = _g120.tl;
  var char = _g120.char;
  var code = _g120.code;
  var string_literal63 = _g120["string-literal?"];
  var id_literal63 = _g120["id-literal?"];
  var add = _g120.add;
  var drop = _g120.drop;
  var last = _g120.last;
  var reverse = _g120.reverse;
  var join = _g120.join;
  var reduce = _g120.reduce;
  var keep = _g120.keep;
  var find = _g120.find;
  var pairwise = _g120.pairwise;
  var iterate = _g120.iterate;
  var replicate = _g120.replicate;
  var splice = _g120.splice;
  var map = _g120.map;
  var map42 = _g120["map*"];
  var mapt = _g120.mapt;
  var mapo = _g120.mapo;
  var keys63 = _g120["keys?"];
  var setenv = _g120.setenv;
  var stash = _g120.stash;
  var unstash = _g120.unstash;
  var extend = _g120.extend;
  var exclude = _g120.exclude;
  var search = _g120.search;
  var split = _g120.split;
  var cat = _g120.cat;
  var _43 = _g120["+"];
  var _ = _g120["-"];
  var _42 = _g120["*"];
  var _47 = _g120["/"];
  var _37 = _g120["%"];
  var _62 = _g120[">"];
  var _60 = _g120["<"];
  var _61 = _g120["="];
  var _6261 = _g120[">="];
  var _6061 = _g120["<="];
  var read_file = _g120["read-file"];
  var write_file = _g120["write-file"];
  var print = _g120.print;
  var write = _g120.write;
  var exit = _g120.exit;
  var parse_number = _g120["parse-number"];
  var to_string = _g120["to-string"];
  var apply = _g120.apply;
  var _37message_handler = _g120["%message-handler"];
  var _g121 = nexus.utilities;
  var getenv = _g121.getenv;
  var macro_function = _g121["macro-function"];
  var macro63 = _g121["macro?"];
  var special63 = _g121["special?"];
  var special_form63 = _g121["special-form?"];
  var symbol_expansion = _g121["symbol-expansion"];
  var symbol63 = _g121["symbol?"];
  var variable63 = _g121["variable?"];
  var bound63 = _g121["bound?"];
  var quoted = _g121.quoted;
  var stash42 = _g121["stash*"];
  var bind = _g121.bind;
  var bind42 = _g121["bind*"];
  var quasiexpand = _g121.quasiexpand;
  var macroexpand = _g121.macroexpand;
  var indentation = _g121.indentation;
  var valid_id63 = _g121["valid-id?"];
  var to_id = _g121["to-id"];
  var module_key = _g121["module-key"];
  var imported = _g121.imported;
  var exported = _g121.exported;
  var quote_environment = _g121["quote-environment"];
  var quote_modules = _g121["quote-modules"];
  var initial_environment = _g121["initial-environment"];
  var _g122 = nexus.compiler;
  var compile_body = _g122["compile-body"];
  var compile_call = _g122["compile-call"];
  var compile_branch = _g122["compile-branch"];
  var compile_function = _g122["compile-function"];
  var compile_special = _g122["compile-special"];
  var compile = _g122.compile;
  var eval = _g122.eval;
  var load_module = _g122["load-module"];
  var open_module = _g122["open-module"];
  var in_module = _g122["in-module"];
  return;
})();
(function () {
  var _g229 = nexus.runtime;
  var nil63 = _g229["nil?"];
  var is63 = _g229["is?"];
  var length = _g229.length;
  var empty63 = _g229["empty?"];
  var some63 = _g229["some?"];
  var hd = _g229.hd;
  var string63 = _g229["string?"];
  var number63 = _g229["number?"];
  var boolean63 = _g229["boolean?"];
  var function63 = _g229["function?"];
  var composite63 = _g229["composite?"];
  var atom63 = _g229["atom?"];
  var table63 = _g229["table?"];
  var list63 = _g229["list?"];
  var substring = _g229.substring;
  var sublist = _g229.sublist;
  var sub = _g229.sub;
  var inner = _g229.inner;
  var tl = _g229.tl;
  var char = _g229.char;
  var code = _g229.code;
  var string_literal63 = _g229["string-literal?"];
  var id_literal63 = _g229["id-literal?"];
  var add = _g229.add;
  var drop = _g229.drop;
  var last = _g229.last;
  var reverse = _g229.reverse;
  var join = _g229.join;
  var reduce = _g229.reduce;
  var keep = _g229.keep;
  var find = _g229.find;
  var pairwise = _g229.pairwise;
  var iterate = _g229.iterate;
  var replicate = _g229.replicate;
  var splice = _g229.splice;
  var map = _g229.map;
  var map42 = _g229["map*"];
  var mapt = _g229.mapt;
  var mapo = _g229.mapo;
  var keys63 = _g229["keys?"];
  var setenv = _g229.setenv;
  var stash = _g229.stash;
  var unstash = _g229.unstash;
  var extend = _g229.extend;
  var exclude = _g229.exclude;
  var search = _g229.search;
  var split = _g229.split;
  var cat = _g229.cat;
  var _43 = _g229["+"];
  var _ = _g229["-"];
  var _42 = _g229["*"];
  var _47 = _g229["/"];
  var _37 = _g229["%"];
  var _62 = _g229[">"];
  var _60 = _g229["<"];
  var _61 = _g229["="];
  var _6261 = _g229[">="];
  var _6061 = _g229["<="];
  var read_file = _g229["read-file"];
  var write_file = _g229["write-file"];
  var print = _g229.print;
  var write = _g229.write;
  var exit = _g229.exit;
  var parse_number = _g229["parse-number"];
  var to_string = _g229["to-string"];
  var apply = _g229.apply;
  var _37message_handler = _g229["%message-handler"];
  var _g230 = nexus.utilities;
  var getenv = _g230.getenv;
  var macro_function = _g230["macro-function"];
  var macro63 = _g230["macro?"];
  var special63 = _g230["special?"];
  var special_form63 = _g230["special-form?"];
  var symbol_expansion = _g230["symbol-expansion"];
  var symbol63 = _g230["symbol?"];
  var variable63 = _g230["variable?"];
  var bound63 = _g230["bound?"];
  var quoted = _g230.quoted;
  var stash42 = _g230["stash*"];
  var bind = _g230.bind;
  var bind42 = _g230["bind*"];
  var quasiexpand = _g230.quasiexpand;
  var macroexpand = _g230.macroexpand;
  var indentation = _g230.indentation;
  var valid_id63 = _g230["valid-id?"];
  var to_id = _g230["to-id"];
  var module_key = _g230["module-key"];
  var imported = _g230.imported;
  var exported = _g230.exported;
  var quote_environment = _g230["quote-environment"];
  var quote_modules = _g230["quote-modules"];
  var initial_environment = _g230["initial-environment"];
  global.target = "js";
  return;
})();
(function () {
  var _g365 = nexus.runtime;
  var nil63 = _g365["nil?"];
  var is63 = _g365["is?"];
  var length = _g365.length;
  var empty63 = _g365["empty?"];
  var some63 = _g365["some?"];
  var hd = _g365.hd;
  var string63 = _g365["string?"];
  var number63 = _g365["number?"];
  var boolean63 = _g365["boolean?"];
  var function63 = _g365["function?"];
  var composite63 = _g365["composite?"];
  var atom63 = _g365["atom?"];
  var table63 = _g365["table?"];
  var list63 = _g365["list?"];
  var substring = _g365.substring;
  var sublist = _g365.sublist;
  var sub = _g365.sub;
  var inner = _g365.inner;
  var tl = _g365.tl;
  var char = _g365.char;
  var code = _g365.code;
  var string_literal63 = _g365["string-literal?"];
  var id_literal63 = _g365["id-literal?"];
  var add = _g365.add;
  var drop = _g365.drop;
  var last = _g365.last;
  var reverse = _g365.reverse;
  var join = _g365.join;
  var reduce = _g365.reduce;
  var keep = _g365.keep;
  var find = _g365.find;
  var pairwise = _g365.pairwise;
  var iterate = _g365.iterate;
  var replicate = _g365.replicate;
  var splice = _g365.splice;
  var map = _g365.map;
  var map42 = _g365["map*"];
  var mapt = _g365.mapt;
  var mapo = _g365.mapo;
  var keys63 = _g365["keys?"];
  var setenv = _g365.setenv;
  var stash = _g365.stash;
  var unstash = _g365.unstash;
  var extend = _g365.extend;
  var exclude = _g365.exclude;
  var search = _g365.search;
  var split = _g365.split;
  var cat = _g365.cat;
  var _43 = _g365["+"];
  var _ = _g365["-"];
  var _42 = _g365["*"];
  var _47 = _g365["/"];
  var _37 = _g365["%"];
  var _62 = _g365[">"];
  var _60 = _g365["<"];
  var _61 = _g365["="];
  var _6261 = _g365[">="];
  var _6061 = _g365["<="];
  var read_file = _g365["read-file"];
  var write_file = _g365["write-file"];
  var print = _g365.print;
  var write = _g365.write;
  var exit = _g365.exit;
  var parse_number = _g365["parse-number"];
  var to_string = _g365["to-string"];
  var apply = _g365.apply;
  var _37message_handler = _g365["%message-handler"];
  var _g366 = nexus.utilities;
  var getenv = _g366.getenv;
  var macro_function = _g366["macro-function"];
  var macro63 = _g366["macro?"];
  var special63 = _g366["special?"];
  var special_form63 = _g366["special-form?"];
  var symbol_expansion = _g366["symbol-expansion"];
  var symbol63 = _g366["symbol?"];
  var variable63 = _g366["variable?"];
  var bound63 = _g366["bound?"];
  var quoted = _g366.quoted;
  var stash42 = _g366["stash*"];
  var bind = _g366.bind;
  var bind42 = _g366["bind*"];
  var quasiexpand = _g366.quasiexpand;
  var macroexpand = _g366.macroexpand;
  var indentation = _g366.indentation;
  var valid_id63 = _g366["valid-id?"];
  var to_id = _g366["to-id"];
  var module_key = _g366["module-key"];
  var imported = _g366.imported;
  var exported = _g366.exported;
  var quote_environment = _g366["quote-environment"];
  var quote_modules = _g366["quote-modules"];
  var initial_environment = _g366["initial-environment"];
  global.modules = {compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g371 = sub(body, 0);
    var imports = [];
    var imp = _g371.import;
    var exp = _g371.export;
    var _g373 = 0;
    var _g372 = (imp || []);
    while ((_g373 < length(_g372))) {
      var k = _g372[_g373];
      load_module(k);
      imports = join(imports, imported(k));
      _g373 = (_g373 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g375 = 0;
    var _g374 = (exp || []);
    while ((_g375 < length(_g374))) {
      var k = _g374[_g375];
      setenv(k, {_stash: true, export: true});
      _g375 = (_g375 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}, "compile-body": {export: true, module: "compiler", variable: true}, "compile-call": {export: true, module: "compiler", variable: true}, "compile-branch": {export: true, module: "compiler", variable: true}, "compile-function": {export: true, module: "compiler", variable: true}, "compile-special": {export: true, module: "compiler", variable: true}, compile: {export: true, module: "compiler", variable: true}, eval: {export: true, module: "compiler", variable: true}, "load-module": {export: true, module: "compiler", variable: true}, "open-module": {export: true, module: "compiler", variable: true}, "in-module": {export: true, module: "compiler", variable: true}, "current-module": {global: true, export: true, module: "compiler"}}}, lib: {import: ["core", "special"], export: {}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"while": {stmt: true, module: "special", export: true, tr: true, special: function (_g376) {
    var condition = _g376[0];
    var body = sub(_g376, 1);
    var _g377 = compile(condition);
    var _g378 = (function () {
      indent_level = (indent_level + 1);
      var _g379 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g379);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g377 + ") {\n" + _g378 + ind + "}\n"));
    } else {
      return((ind + "while " + _g377 + " do\n" + _g378 + ind + "end\n"));
    }
  }}, "%local": {special: function (_g380) {
    var name = _g380[0];
    var value = _g380[1];
    var id = compile(name);
    var _g381 = compile(value);
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + " = " + _g381));
  }, stmt: true, module: "special", export: true}, "%function": {special: function (_g382) {
    var args = _g382[0];
    var body = sub(_g382, 1);
    return(compile_function(args, body));
  }, module: "special", export: true}, "error": {special: function (_g383) {
    var x = _g383[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw " + compile(x)));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, stmt: true, module: "special", export: true}, "not": {special: function (_g384) {
    var x = _g384[0];
    var _g385 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g385 + ")"));
  }, module: "special", export: true}, "%try": {stmt: true, module: "special", export: true, tr: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g386 = compile_body(forms, {_stash: true, "tail?": true});
      indent_level = (indent_level - 1);
      return(_g386);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, e])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g387 = compile(handler, {_stash: true, "stmt?": true});
      indent_level = (indent_level - 1);
      return(_g387);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }}, "return": {special: function (_g388) {
    var x = _g388[0];
    var _g389 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g389));
  }, stmt: true, module: "special", export: true}, "%object": {special: function (forms) {
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
    var _g390 = pairs;
    while ((i < length(_g390))) {
      var _g391 = _g390[i];
      var k = _g391[0];
      var v = _g391[1];
      if (!(string63(k))) {
        throw ("Illegal key: " + to_string(k));
      }
      var _g392 = compile(v);
      var _g393 = (function () {
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
      str = (str + _g393 + sep + _g392);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special", export: true}, "%for": {stmt: true, module: "special", export: true, tr: true, special: function (_g394) {
    var _g395 = _g394[0];
    var t = _g395[0];
    var k = _g395[1];
    var body = sub(_g394, 1);
    var _g396 = compile(t);
    var ind = indentation();
    var _g397 = (function () {
      indent_level = (indent_level + 1);
      var _g398 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g398);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g396 + " do\n" + _g397 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g396 + ") {\n" + _g397 + ind + "}\n"));
    }
  }}, "%local-function": {stmt: true, module: "special", export: true, tr: true, special: function (_g399) {
    var name = _g399[0];
    var args = _g399[1];
    var body = sub(_g399, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }}, "set": {special: function (_g400) {
    var lh = _g400[0];
    var rh = _g400[1];
    if (nil63(rh)) {
      throw "Missing right-hand side in assignment";
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, stmt: true, module: "special", export: true}, "%global-function": {stmt: true, module: "special", export: true, tr: true, special: function (_g401) {
    var name = _g401[0];
    var args = _g401[1];
    var body = sub(_g401, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, "stmt?": true}));
    }
  }}, "if": {stmt: true, module: "special", export: true, tr: true, special: function (form, tail63) {
    var str = "";
    var i = 0;
    var _g402 = form;
    while ((i < length(_g402))) {
      var condition = _g402[i];
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
  }}, "%array": {special: function (forms) {
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
    var _g403 = forms;
    while ((i < length(_g403))) {
      var x = _g403[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special", export: true}, "do": {stmt: true, module: "special", export: true, tr: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, "tail?": tail63}));
  }}, "break": {special: function (_g119) {
    return((indentation() + "break"));
  }, stmt: true, module: "special", export: true}, "get": {special: function (_g404) {
    var t = _g404[0];
    var k = _g404[1];
    var _g405 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g405, 0) === "{"))) {
      _g405 = ("(" + _g405 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g405 + "." + inner(k)));
    } else {
      return((_g405 + "[" + k1 + "]"));
    }
  }, module: "special", export: true}}}, boot: {import: ["runtime", "utilities", "special", "core"], export: {}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true, module: "system"}}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, module: "reader", variable: true}, "read-table": {export: true, module: "reader", variable: true}, "define-reader": {export: true, module: "reader", macro: function (_g406) {
    var char = _g406[0];
    var stream = _g406[1];
    var body = unstash(sublist(arguments, 1));
    var _g407 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g407)]));
  }}, read: {export: true, module: "reader", variable: true}, "read-all": {export: true, module: "reader", variable: true}, "read-from-string": {export: true, module: "reader", variable: true}}}, runtime: {import: ["special", "core"], export: {"nil?": {export: true, module: "runtime", variable: true}, "is?": {export: true, module: "runtime", variable: true}, length: {export: true, module: "runtime", variable: true}, "empty?": {export: true, module: "runtime", variable: true}, "some?": {export: true, module: "runtime", variable: true}, hd: {export: true, module: "runtime", variable: true}, "string?": {export: true, module: "runtime", variable: true}, "number?": {export: true, module: "runtime", variable: true}, "boolean?": {export: true, module: "runtime", variable: true}, "function?": {export: true, module: "runtime", variable: true}, "composite?": {export: true, module: "runtime", variable: true}, "atom?": {export: true, module: "runtime", variable: true}, "table?": {export: true, module: "runtime", variable: true}, "list?": {export: true, module: "runtime", variable: true}, substring: {export: true, module: "runtime", variable: true}, sublist: {export: true, module: "runtime", variable: true}, sub: {export: true, module: "runtime", variable: true}, inner: {export: true, module: "runtime", variable: true}, tl: {export: true, module: "runtime", variable: true}, char: {export: true, module: "runtime", variable: true}, code: {export: true, module: "runtime", variable: true}, "string-literal?": {export: true, module: "runtime", variable: true}, "id-literal?": {export: true, module: "runtime", variable: true}, add: {export: true, module: "runtime", variable: true}, drop: {export: true, module: "runtime", variable: true}, last: {export: true, module: "runtime", variable: true}, reverse: {export: true, module: "runtime", variable: true}, join: {export: true, module: "runtime", variable: true}, reduce: {export: true, module: "runtime", variable: true}, keep: {export: true, module: "runtime", variable: true}, find: {export: true, module: "runtime", variable: true}, pairwise: {export: true, module: "runtime", variable: true}, iterate: {export: true, module: "runtime", variable: true}, replicate: {export: true, module: "runtime", variable: true}, splice: {export: true, module: "runtime", variable: true}, map: {export: true, module: "runtime", variable: true}, "map*": {export: true, module: "runtime", variable: true}, mapt: {export: true, module: "runtime", variable: true}, mapo: {export: true, module: "runtime", variable: true}, "keys?": {export: true, module: "runtime", variable: true}, setenv: {export: true, module: "runtime", variable: true}, stash: {export: true, module: "runtime", variable: true}, unstash: {export: true, module: "runtime", variable: true}, extend: {export: true, module: "runtime", variable: true}, exclude: {export: true, module: "runtime", variable: true}, search: {export: true, module: "runtime", variable: true}, split: {export: true, module: "runtime", variable: true}, cat: {export: true, module: "runtime", variable: true}, "+": {export: true, module: "runtime", variable: true}, "-": {export: true, module: "runtime", variable: true}, "*": {export: true, module: "runtime", variable: true}, "/": {export: true, module: "runtime", variable: true}, "%": {export: true, module: "runtime", variable: true}, ">": {export: true, module: "runtime", variable: true}, "<": {export: true, module: "runtime", variable: true}, "=": {export: true, module: "runtime", variable: true}, ">=": {export: true, module: "runtime", variable: true}, "<=": {export: true, module: "runtime", variable: true}, "read-file": {export: true, module: "runtime", variable: true}, "write-file": {export: true, module: "runtime", variable: true}, print: {export: true, module: "runtime", variable: true}, write: {export: true, module: "runtime", variable: true}, exit: {export: true, module: "runtime", variable: true}, "parse-number": {export: true, module: "runtime", variable: true}, "to-string": {export: true, module: "runtime", variable: true}, apply: {export: true, module: "runtime", variable: true}, "%message-handler": {export: true, module: "runtime", variable: true}}}, core: {import: ["runtime", "utilities", "special", "core"], export: {quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, module: "core", export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var k = undefined;
      var _g408 = body;
      for (k in _g408) {
        if (isNaN(parseInt(k))) {
          var v = _g408[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }, module: "core", export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g228, x) {
      return(x);
    }, body)));
  }, module: "core", export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, module: "core", export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g409 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g410) {
      var lh = _g410[0];
      var rh = _g410[1];
      var _g412 = 0;
      var _g411 = bind(lh, rh);
      while ((_g412 < length(_g411))) {
        var _g413 = _g411[_g412];
        var id = _g413[0];
        var val = _g413[1];
        if (bound63(id)) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g412 = (_g412 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g409)])));
  }, module: "core", export: true}, "define-global": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g414 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g414))) {
      var _g415 = bind42(x, _g414);
      var args = _g415[0];
      var _g416 = _g415[1];
      return(join(["%global-function", name, args], _g416));
    } else if ((target === "js")) {
      return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, inc: {macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }, module: "core", export: true}, target: {global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, module: "core", export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g417 = sub(body, 0);
    var form = join(["fn", args], _g417);
    var _g418 = join((function () {
      var _g419 = ["setenv", join(["quote", name])];
      _g419.macro = form;
      _g419.form = join(["quote", form]);
      return(_g419);
    })());
    eval(_g418, current_module);
    return(undefined);
  }, module: "core", export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g420 = sub(body, 0);
    var form = join(["fn", args], _g420);
    var keys = sub(_g420, length(_g420));
    var _g421 = join((function () {
      var _g422 = ["setenv", join(["quote", name])];
      _g422.special = form;
      _g422.form = join(["quote", form]);
      return(_g422);
    })(), keys);
    eval(_g421, current_module);
    return(undefined);
  }, module: "core", export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g424 = 0;
    var _g423 = elements;
    while ((_g424 < length(_g423))) {
      var e = _g423[_g424];
      l[e] = true;
      _g424 = (_g424 + 1);
    }
    return(join(["table"], l));
  }, module: "core", export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g425 = sub(body, 0);
    var _g426 = bind42(args, _g425);
    var _g427 = _g426[0];
    var _g428 = _g426[1];
    return(join(["%function", _g427], _g428));
  }, module: "core", export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }, module: "core", export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else if ((target === "lua")) {
      i = join(["+", i, 1]);
    }
    return(join(["get", l, i]));
  }, module: "core", export: true}, dec: {macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }, module: "core", export: true}, each: {macro: function (_g429) {
    var t = _g429[0];
    var k = _g429[1];
    var v = _g429[2];
    var body = unstash(sublist(arguments, 1));
    var _g430 = sub(body, 0);
    var t1 = make_id();
    return(join(["let", join([k, "nil", t1, t]), join(["%for", join([t1, k]), join(["if", join((function () {
      var _g431 = ["target"];
      _g431.js = join(["isNaN", join(["parseInt", k])]);
      _g431.lua = join(["not", join(["number?", k])]);
      return(_g431);
    })()), join(["let", join([v, join(["get", t1, k])])], _g430)])])]));
  }, module: "core", export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g432 = sub(body, 0);
    add(environment, {});
    var _g433 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g432)));
    })();
    drop(environment);
    return(_g433);
  }, module: "core", export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g434 = sub(body, 0);
    add(environment, {});
    var _g435 = (function () {
      map(function (_g436) {
        var name = _g436[0];
        var exp = _g436[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g434)));
    })();
    drop(environment);
    return(_g435);
  }, module: "core", export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g437 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g437)]));
  }, module: "core", export: true}, across: {macro: function (_g438) {
    var l = _g438[0];
    var v = _g438[1];
    var i = _g438[2];
    var start = _g438[3];
    var body = unstash(sublist(arguments, 1));
    var _g439 = sub(body, 0);
    var l1 = make_id();
    i = (i || make_id());
    start = (start || 0);
    return(join(["let", join([i, start, l1, l]), join(["while", join(["<", i, join(["length", l1])]), join(["let", join([v, join(["at", l1, i])])], join(_g439, [join(["inc", i])]))])]));
  }, module: "core", export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g440 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g441 = ["table"];
      _g441._scope = scope;
      return(_g441);
    })())]), join(["let", join([x, join(["do"], _g440)]), join(["drop", "environment"]), x])]));
  }, module: "core", export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g442 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g442))) {
      var _g443 = bind42(x, _g442);
      var args = _g443[0];
      var _g444 = _g443[1];
      return(join(["%global-function", name, args], _g444));
    } else {
      return(join(["set", name, x]));
    }
  }, module: "core", export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g445 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g445)]));
  }, module: "core", export: true}, "with-bindings": {macro: function (_g446) {
    var names = _g446[0];
    var body = unstash(sublist(arguments, 1));
    var _g447 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g448 = ["with-frame", join(["across", join([names, x]), join((function () {
        var _g449 = ["setenv", x];
        _g449.variable = true;
        return(_g449);
      })())])];
      _g448.scope = true;
      return(_g448);
    })(), _g447));
  }, module: "core", export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, module: "core", export: true}, "list*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var i = 0;
      var _g450 = xs;
      while ((i < length(_g450))) {
        var x = _g450[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }, module: "core", export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g451 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g451)]));
  }, module: "core", export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }, module: "core", export: true}, "define-local": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g452 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g452))) {
      var _g453 = bind42(x, _g452);
      var args = _g453[0];
      var _g454 = _g453[1];
      return(join(["%local-function", name, args], _g454));
    } else {
      return(join(["%local", name, x]));
    }
  }, module: "core", export: true}, language: {macro: function () {
    return(join(["quote", target]));
  }, module: "core", export: true}}}, utilities: {import: ["runtime", "special", "core"], export: {getenv: {export: true, module: "utilities", variable: true}, "macro-function": {export: true, module: "utilities", variable: true}, "macro?": {export: true, module: "utilities", variable: true}, "special?": {export: true, module: "utilities", variable: true}, "special-form?": {export: true, module: "utilities", variable: true}, "symbol-expansion": {export: true, module: "utilities", variable: true}, "symbol?": {export: true, module: "utilities", variable: true}, "variable?": {export: true, module: "utilities", variable: true}, "bound?": {export: true, module: "utilities", variable: true}, quoted: {export: true, module: "utilities", variable: true}, "stash*": {export: true, module: "utilities", variable: true}, "make-id": {}, bind: {export: true, module: "utilities", variable: true}, "bind*": {export: true, module: "utilities", variable: true}, quasiexpand: {export: true, module: "utilities", variable: true}, macroexpand: {export: true, module: "utilities", variable: true}, indentation: {export: true, module: "utilities", variable: true}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "valid-id?": {export: true, module: "utilities", variable: true}, "to-id": {export: true, module: "utilities", variable: true}, "module-key": {export: true, module: "utilities", variable: true}, imported: {export: true, module: "utilities", variable: true}, exported: {export: true, module: "utilities", variable: true}, "quote-environment": {export: true, module: "utilities", variable: true}, "quote-modules": {export: true, module: "utilities", variable: true}, "initial-environment": {export: true, module: "utilities", variable: true}, "indent-level": {global: true, export: true, module: "utilities"}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g455 = sub(body, 0);
    var imports = [];
    var imp = _g455.import;
    var exp = _g455.export;
    var _g457 = 0;
    var _g456 = (imp || []);
    while ((_g457 < length(_g456))) {
      var k = _g456[_g457];
      load_module(k);
      imports = join(imports, imported(k));
      _g457 = (_g457 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g459 = 0;
    var _g458 = (exp || []);
    while ((_g459 < length(_g458))) {
      var k = _g458[_g459];
      setenv(k, {_stash: true, export: true});
      _g459 = (_g459 + 1);
    }
    return(join(["do"], imports));
  }, module: "compiler", export: true}}];
  return;
})();
(function () {
  var _g36 = nexus.runtime;
  var nil63 = _g36["nil?"];
  var is63 = _g36["is?"];
  var length = _g36.length;
  var empty63 = _g36["empty?"];
  var some63 = _g36["some?"];
  var hd = _g36.hd;
  var string63 = _g36["string?"];
  var number63 = _g36["number?"];
  var boolean63 = _g36["boolean?"];
  var function63 = _g36["function?"];
  var composite63 = _g36["composite?"];
  var atom63 = _g36["atom?"];
  var table63 = _g36["table?"];
  var list63 = _g36["list?"];
  var substring = _g36.substring;
  var sublist = _g36.sublist;
  var sub = _g36.sub;
  var inner = _g36.inner;
  var tl = _g36.tl;
  var char = _g36.char;
  var code = _g36.code;
  var string_literal63 = _g36["string-literal?"];
  var id_literal63 = _g36["id-literal?"];
  var add = _g36.add;
  var drop = _g36.drop;
  var last = _g36.last;
  var reverse = _g36.reverse;
  var join = _g36.join;
  var reduce = _g36.reduce;
  var keep = _g36.keep;
  var find = _g36.find;
  var pairwise = _g36.pairwise;
  var iterate = _g36.iterate;
  var replicate = _g36.replicate;
  var splice = _g36.splice;
  var map = _g36.map;
  var map42 = _g36["map*"];
  var mapt = _g36.mapt;
  var mapo = _g36.mapo;
  var keys63 = _g36["keys?"];
  var setenv = _g36.setenv;
  var stash = _g36.stash;
  var unstash = _g36.unstash;
  var extend = _g36.extend;
  var exclude = _g36.exclude;
  var search = _g36.search;
  var split = _g36.split;
  var cat = _g36.cat;
  var _43 = _g36["+"];
  var _ = _g36["-"];
  var _42 = _g36["*"];
  var _47 = _g36["/"];
  var _37 = _g36["%"];
  var _62 = _g36[">"];
  var _60 = _g36["<"];
  var _61 = _g36["="];
  var _6261 = _g36[">="];
  var _6061 = _g36["<="];
  var read_file = _g36["read-file"];
  var write_file = _g36["write-file"];
  var print = _g36.print;
  var write = _g36.write;
  var exit = _g36.exit;
  var parse_number = _g36["parse-number"];
  var to_string = _g36["to-string"];
  var apply = _g36.apply;
  var _37message_handler = _g36["%message-handler"];
  var _g73 = nexus.utilities;
  var getenv = _g73.getenv;
  var macro_function = _g73["macro-function"];
  var macro63 = _g73["macro?"];
  var special63 = _g73["special?"];
  var special_form63 = _g73["special-form?"];
  var symbol_expansion = _g73["symbol-expansion"];
  var symbol63 = _g73["symbol?"];
  var variable63 = _g73["variable?"];
  var bound63 = _g73["bound?"];
  var quoted = _g73.quoted;
  var stash42 = _g73["stash*"];
  var bind = _g73.bind;
  var bind42 = _g73["bind*"];
  var quasiexpand = _g73.quasiexpand;
  var macroexpand = _g73.macroexpand;
  var indentation = _g73.indentation;
  var valid_id63 = _g73["valid-id?"];
  var to_id = _g73["to-id"];
  var module_key = _g73["module-key"];
  var imported = _g73.imported;
  var exported = _g73.exported;
  var quote_environment = _g73["quote-environment"];
  var quote_modules = _g73["quote-modules"];
  var initial_environment = _g73["initial-environment"];
  var _g81 = nexus.reader;
  var make_stream = _g81["make-stream"];
  var read_table = _g81["read-table"];
  var read = _g81.read;
  var read_all = _g81["read-all"];
  var read_from_string = _g81["read-from-string"];
  var _g118 = nexus.compiler;
  var compile_body = _g118["compile-body"];
  var compile_call = _g118["compile-call"];
  var compile_branch = _g118["compile-branch"];
  var compile_function = _g118["compile-function"];
  var compile_special = _g118["compile-special"];
  var compile = _g118.compile;
  var eval = _g118.eval;
  var load_module = _g118["load-module"];
  var open_module = _g118["open-module"];
  var in_module = _g118["in-module"];
  function rep(str, spec) {
    var _g461 = (function () {
      try {
        return([true, eval(read_from_string(str), spec)]);
      }
      catch (_g465) {
        return([false, _g465]);
      }
    })();
    var _g1 = _g461[0];
    var x = _g461[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl(spec) {
    var step = function (str) {
      rep(str, spec);
      return(write("> "));
    };
    write("> ");
    (process.stdin.setEncoding)("utf8");
    return((process.stdin.on)("data", step));
  }
  function usage() {
    print((to_string("usage: lumen [options] <module>") + " "));
    print((to_string("options:") + " "));
    print((to_string("  -o <output>\tOutput file") + " "));
    print((to_string("  -t <target>\tTarget language (default: lua)") + " "));
    print((to_string("  -e <expr>\tExpression to evaluate") + " "));
    return(exit());
  }
  function main() {
    var args = sub(process.argv, 2);
    if (((hd(args) === "-h") || (hd(args) === "--help"))) {
      usage();
    }
    var spec = undefined;
    var output = undefined;
    var target1 = undefined;
    var expr = undefined;
    var i = 0;
    var _g462 = args;
    while ((i < length(_g462))) {
      var arg = _g462[i];
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
      return(write_file(output, compile_module(spec)));
    } else {
      var _g463 = (spec || "main");
      in_module(_g463);
      if (expr) {
        return(rep(expr, _g463));
      } else {
        return(repl(_g463));
      }
    }
  }
  main();
  return;
})();
