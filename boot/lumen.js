(function () {
  global.nexus = {};
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
    var _g21 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g21, upto));
    } else {
      var l = sublist(x, _g21, upto);
      var _g22 = x;
      var k = undefined;
      for (k in _g22) {
        if (isNaN(parseInt(k))) {
          var v = _g22[k];
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
    } else {
      if (nil63(l1)) {
        return(join([], l2));
      } else {
        if (nil63(l2)) {
          return(join(l1, []));
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
          var _g23 = l1;
          var k = undefined;
          for (k in _g23) {
            if (isNaN(parseInt(k))) {
              var v = _g23[k];
              l[k] = v;
            }
          }
          var _g24 = l2;
          var k = undefined;
          for (k in _g24) {
            if (isNaN(parseInt(k))) {
              var v = _g24[k];
              l[k] = v;
            }
          }
          return(l);
        }
      }
    }
  }
  function reduce(f, x) {
    if (empty63(x)) {
      return(x);
    } else {
      if ((length(x) === 1)) {
        return(hd(x));
      } else {
        return(f(hd(x), reduce(f, tl(x))));
      }
    }
  }
  function keep(f, l) {
    var l1 = [];
    var _g25 = l;
    var _g26 = 0;
    while ((_g26 < length(_g25))) {
      var x = _g25[_g26];
      if (f(x)) {
        add(l1, x);
      }
      _g26 = (_g26 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g27 = l;
    var _g28 = 0;
    while ((_g28 < length(_g27))) {
      var x = _g27[_g28];
      var _g29 = f(x);
      if (_g29) {
        return(_g29);
      }
      _g28 = (_g28 + 1);
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
    return({value: x, _splice: true});
  }
  function splice63(x) {
    return((table63(x) && x._splice));
  }
  function mapl(f, l) {
    var l1 = [];
    var _g30 = l;
    var _g31 = 0;
    while ((_g31 < length(_g30))) {
      var x = _g30[_g31];
      var _g32 = f(x);
      if (splice63(_g32)) {
        l1 = join(l1, _g32.value);
      } else {
        if (is63(_g32)) {
          add(l1, _g32);
        }
      }
      _g31 = (_g31 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g33 = t;
    var k = undefined;
    for (k in _g33) {
      if (isNaN(parseInt(k))) {
        var v = _g33[k];
        var x = f(v);
        if (splice63(x)) {
          l[k] = x.value;
        } else {
          if (is63(x)) {
            l[k] = x;
          }
        }
      }
    }
    return(l);
  }
  function keys63(t) {
    var k = undefined;
    var _g34 = t;
    var k1 = undefined;
    for (k1 in _g34) {
      if (isNaN(parseInt(k1))) {
        var v = _g34[k1];
        k = k1;
        break;
      }
    }
    return(k);
  }
  function stash(args) {
    if (keys63(args)) {
      var p = {_stash: true};
      var _g35 = args;
      var k = undefined;
      for (k in _g35) {
        if (isNaN(parseInt(k))) {
          var v = _g35[k];
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
        var _g36 = l;
        var k = undefined;
        for (k in _g36) {
          if (isNaN(parseInt(k))) {
            var v = _g36[k];
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
    var _g37 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g38 = _g37;
      var k1 = undefined;
      for (k1 in _g38) {
        if (isNaN(parseInt(k1))) {
          var v = _g38[k1];
          x[k1] = v;
        }
      }
      x.module = current_module;
      frame[k] = x;
    }
  }
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g39 = sub(xs, 0);
    return(join(t, _g39));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g40 = sub(keys, 0);
    var t1 = sublist(t);
    var _g41 = t;
    var k = undefined;
    for (k in _g41) {
      if (isNaN(parseInt(k))) {
        var v = _g41[k];
        if (!(_g40[k])) {
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
    var _g42 = sub(xs, 0);
    if (empty63(_g42)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g42));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g43));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g44)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g45));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g46 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g46)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g47 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g47)));
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
  global.require = require;
  var fs = require("fs");
  function read_file(path) {
    return((fs.readFileSync)(path, "utf8"));
  }
  function write_file(path, data) {
    return((fs.writeFileSync)(path, data, "utf8"));
  }
  print = function (x) {
    return((console.log)(x));
  };
  function type(x) {
    return(typeof(x));
  }
  function write(x) {
    return((process.stdout.write)(x));
  }
  function exit(code) {
    return((process.exit)(code));
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
    } else {
      if (boolean63(x)) {
        if (x) {
          return("true");
        } else {
          return("false");
        }
      } else {
        if (function63(x)) {
          return("#<function>");
        } else {
          if (atom63(x)) {
            return((x + ""));
          } else {
            var str = "(";
            var x1 = sub(x);
            var _g48 = x;
            var k = undefined;
            for (k in _g48) {
              if (isNaN(parseInt(k))) {
                var v = _g48[k];
                add(x1, (k + ":"));
                add(x1, v);
              }
            }
            var _g49 = x1;
            var i = 0;
            while ((i < length(_g49))) {
              var y = _g49[i];
              str = (str + to_string(y));
              if ((i < (length(x1) - 1))) {
                str = (str + " ");
              }
              i = (i + 1);
            }
            return((str + ")"));
          }
        }
      }
    }
  }
  function apply(f, args) {
    var _g50 = stash(args);
    return((f.apply)(f, _g50));
  }
  var id_count = 0;
  function make_id() {
    id_count = (id_count + 1);
    return(("_g" + id_count));
  }
  function _37message_handler(msg) {
    var i = search(msg, ": ");
    return(sub(msg, (i + 2)));
  }
  var _g51 = {};
  nexus.runtime = _g51;
  _g51.inner = inner;
  _g51.length = length;
  _g51.split = split;
  _g51["table?"] = table63;
  _g51["is?"] = is63;
  _g51["nil?"] = nil63;
  _g51.fs = fs;
  _g51["atom?"] = atom63;
  _g51.reduce = reduce;
  _g51["id-literal?"] = id_literal63;
  _g51[">"] = _62;
  _g51["boolean?"] = boolean63;
  _g51["keys?"] = keys63;
  _g51.mapl = mapl;
  _g51["splice?"] = splice63;
  _g51.type = type;
  _g51["%message-handler"] = _37message_handler;
  _g51["make-id"] = make_id;
  _g51.drop = drop;
  _g51.write = write;
  _g51.apply = apply;
  _g51.substring = substring;
  _g51.sub = sub;
  _g51.find = find;
  _g51["to-string"] = to_string;
  _g51["<"] = _60;
  _g51["parse-number"] = parse_number;
  _g51.add = add;
  _g51.exit = exit;
  _g51["write-file"] = write_file;
  _g51.stash = stash;
  _g51["="] = _61;
  _g51["number?"] = number63;
  _g51["<="] = _6061;
  _g51["string?"] = string63;
  _g51[">="] = _6261;
  _g51["empty?"] = empty63;
  _g51["%"] = _37;
  _g51["*"] = _42;
  _g51["/"] = _47;
  _g51["-"] = _;
  _g51["function?"] = function63;
  _g51["+"] = _43;
  _g51.cat = cat;
  _g51.search = search;
  _g51.exclude = exclude;
  _g51.char = char;
  _g51.setenv = setenv;
  _g51.extend = extend;
  _g51.unstash = unstash;
  _g51["read-file"] = read_file;
  _g51.hd = hd;
  _g51.map = map;
  _g51.join = join;
  _g51.sublist = sublist;
  _g51.last = last;
  _g51["list?"] = list63;
  _g51.replicate = replicate;
  _g51.iterate = iterate;
  _g51.pairwise = pairwise;
  _g51.keep = keep;
  _g51["id-count"] = id_count;
  _g51.reverse = reverse;
  _g51.splice = splice;
  _g51.code = code;
  _g51.tl = tl;
  _g51["some?"] = some63;
  _g51["composite?"] = composite63;
  _g51["string-literal?"] = string_literal63;
})();
(function () {
  var _g56 = nexus.runtime;
  var inner = _g56.inner;
  var reduce = _g56.reduce;
  var split = _g56.split;
  var unstash = _g56.unstash;
  var map = _g56.map;
  var last = _g56.last;
  var is63 = _g56["is?"];
  var nil63 = _g56["nil?"];
  var atom63 = _g56["atom?"];
  var id_literal63 = _g56["id-literal?"];
  var parse_number = _g56["parse-number"];
  var boolean63 = _g56["boolean?"];
  var keys63 = _g56["keys?"];
  var composite63 = _g56["composite?"];
  var drop = _g56.drop;
  var write = _g56.write;
  var _37message_handler = _g56["%message-handler"];
  var substring = _g56.substring;
  var replicate = _g56.replicate;
  var reverse = _g56.reverse;
  var sub = _g56.sub;
  var _61 = _g56["="];
  var _62 = _g56[">"];
  var exit = _g56.exit;
  var add = _g56.add;
  var code = _g56.code;
  var number63 = _g56["number?"];
  var _6061 = _g56["<="];
  var _ = _g56["-"];
  var _6261 = _g56[">="];
  var empty63 = _g56["empty?"];
  var _42 = _g56["*"];
  var function63 = _g56["function?"];
  var write_file = _g56["write-file"];
  var search = _g56.search;
  var char = _g56.char;
  var setenv = _g56.setenv;
  var tl = _g56.tl;
  var read_file = _g56["read-file"];
  var hd = _g56.hd;
  var join = _g56.join;
  var sublist = _g56.sublist;
  var keep = _g56.keep;
  var list63 = _g56["list?"];
  var extend = _g56.extend;
  var table63 = _g56["table?"];
  var splice = _g56.splice;
  var some63 = _g56["some?"];
  var iterate = _g56.iterate;
  var length = _g56.length;
  var to_string = _g56["to-string"];
  var string63 = _g56["string?"];
  var stash = _g56.stash;
  var _43 = _g56["+"];
  var _37 = _g56["%"];
  var make_id = _g56["make-id"];
  var pairwise = _g56.pairwise;
  var _47 = _g56["/"];
  var string_literal63 = _g56["string-literal?"];
  var exclude = _g56.exclude;
  var cat = _g56.cat;
  var apply = _g56.apply;
  var find = _g56.find;
  var _60 = _g56["<"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g59 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g60 = keys63(_g59);
        if (_g60) {
          return(b[_g60]);
        } else {
          return(b);
        }
      }
    }
  }
  function macro_function(k) {
    return(getenv(k, {_stash: true, macro: true}));
  }
  function macro63(k) {
    return(is63(macro_function(k)));
  }
  function special63(k) {
    return(is63(getenv(k, {_stash: true, special: true})));
  }
  function special_form63(form) {
    return((list63(form) && special63(hd(form))));
  }
  function symbol_expansion(k) {
    return(getenv(k, {_stash: true, symbol: true}));
  }
  function symbol63(k) {
    return(is63(symbol_expansion(k)));
  }
  function variable63(k) {
    var b = find(function (frame) {
      return((frame[k] || frame._scope));
    }, reverse(environment));
    return((table63(b) && is63(b.variable)));
  }
  function global63(k) {
    return(getenv(k, {_stash: true, global: true}));
  }
  function bound63(x) {
    return((macro63(x) || special63(x) || symbol63(x) || variable63(x) || global63(x)));
  }
  function toplevel63() {
    return((length(environment) === 1));
  }
  function escape(str) {
    var str1 = "\"";
    var i = 0;
    while ((i < length(str))) {
      var c = char(str, i);
      var c1 = (function () {
        if ((c === "\n")) {
          return("\\n");
        } else {
          if ((c === "\"")) {
            return("\\\"");
          } else {
            if ((c === "\\")) {
              return("\\\\");
            } else {
              return(c);
            }
          }
        }
      })();
      str1 = (str1 + c1);
      i = (i + 1);
    }
    return((str1 + "\""));
  }
  function quoted(form) {
    if (string63(form)) {
      return(escape(form));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        return(join(["list"], map(quoted, form)));
      }
    }
  }
  function stash42(args) {
    if (keys63(args)) {
      var l = ["%object", "_stash", true];
      var _g61 = args;
      var k = undefined;
      for (k in _g61) {
        if (isNaN(parseInt(k))) {
          var v = _g61[k];
          add(l, k);
          add(l, v);
        }
      }
      return(join(args, [l]));
    } else {
      return(args);
    }
  }
  function bind(lh, rh) {
    if ((composite63(lh) && list63(rh))) {
      var id = make_id();
      return(join([join([id, rh])], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return(join([join([lh, rh])]));
      } else {
        var bs = [];
        var r = lh.rest;
        var _g62 = lh;
        var i = 0;
        while ((i < length(_g62))) {
          var x = _g62[i];
          bs = join(bs, bind(x, join(["at", rh, i])));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
        }
        var _g63 = lh;
        var k = undefined;
        for (k in _g63) {
          if (isNaN(parseInt(k))) {
            var v = _g63[k];
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
    }
  }
  function bind42(args, body) {
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
      var _g64 = args;
      var _g65 = 0;
      while ((_g65 < length(_g64))) {
        var arg = _g64[_g65];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g65 = (_g65 + 1);
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
  }
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
  function macroexpand(form) {
    if (symbol63(form)) {
      return(macroexpand(symbol_expansion(form)));
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        var x = hd(form);
        if ((x === "%for")) {
          var _g52 = form[0];
          var _g66 = form[1];
          var t = _g66[0];
          var k = _g66[1];
          var body = sub(form, 2);
          return(join(["%for", join([macroexpand(t), macroexpand(k)])], macroexpand(body)));
        } else {
          if ((x === "%function")) {
            var _g53 = form[0];
            var args = form[1];
            var _g67 = sub(form, 2);
            add(environment, {_scope: true});
            var _g69 = (function () {
              var _g70 = args;
              var _g71 = 0;
              while ((_g71 < length(_g70))) {
                var _g68 = _g70[_g71];
                setenv(_g68, {_stash: true, variable: true});
                _g71 = (_g71 + 1);
              }
              return(join(["%function", map(macroexpand, args)], macroexpand(_g67)));
            })();
            drop(environment);
            return(_g69);
          } else {
            if (((x === "%local-function") || (x === "%global-function"))) {
              var _g54 = form[0];
              var name = form[1];
              var _g72 = form[2];
              var _g73 = sub(form, 3);
              add(environment, {_scope: true});
              var _g75 = (function () {
                var _g76 = _g72;
                var _g77 = 0;
                while ((_g77 < length(_g76))) {
                  var _g74 = _g76[_g77];
                  setenv(_g74, {_stash: true, variable: true});
                  _g77 = (_g77 + 1);
                }
                return(join([x, name, map(macroexpand, _g72)], macroexpand(_g73)));
              })();
              drop(environment);
              return(_g75);
            } else {
              if (macro63(x)) {
                return(macroexpand(apply(macro_function(x), tl(form))));
              } else {
                return(map(macroexpand, form));
              }
            }
          }
        }
      }
    }
  }
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g78 = form;
    var k = undefined;
    for (k in _g78) {
      if (isNaN(parseInt(k))) {
        var v = _g78[k];
        var _g79 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g79;
      }
    }
    var _g80 = form;
    var _g81 = 0;
    while ((_g81 < length(_g80))) {
      var x = _g80[_g81];
      if (quasisplice63(x, depth)) {
        var _g82 = quasiexpand(x[1]);
        add(xs, _g82);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g81 = (_g81 + 1);
    }
    var pruned = keep(function (x) {
      return(((length(x) > 1) || !((hd(x) === "list")) || keys63(x)));
    }, xs);
    return(join(["join*"], pruned));
  };
  quasiexpand = function (form, depth) {
    if (quasiquoting63(depth)) {
      if (atom63(form)) {
        return(["quote", form]);
      } else {
        if ((can_unquote63(depth) && (hd(form) === "unquote"))) {
          return(quasiexpand(form[1]));
        } else {
          if (((hd(form) === "unquote") || (hd(form) === "unquote-splicing"))) {
            return(quasiquote_list(form, (depth - 1)));
          } else {
            if ((hd(form) === "quasiquote")) {
              return(quasiquote_list(form, (depth + 1)));
            } else {
              return(quasiquote_list(form, depth));
            }
          }
        }
      }
    } else {
      if (atom63(form)) {
        return(form);
      } else {
        if ((hd(form) === "quote")) {
          return(form);
        } else {
          if ((hd(form) === "quasiquote")) {
            return(quasiexpand(form[1], 1));
          } else {
            return(map(function (x) {
              return(quasiexpand(x, depth));
            }, form));
          }
        }
      }
    }
  };
  global.indent_level = 0;
  function indentation() {
    return(apply(cat, replicate(indent_level, "  ")));
  }
  var reserved = {"this": true, "do": true, ">": true, ">=": true, "<": true, "elseif": true, "with": true, "break": true, "delete": true, "instanceof": true, "continue": true, "if": true, "*": true, "in": true, "-": true, "/": true, "else": true, "then": true, "true": true, "finally": true, "and": true, "var": true, "catch": true, "not": true, "return": true, "=": true, "debugger": true, "while": true, "==": true, "false": true, "case": true, "or": true, "try": true, "until": true, "end": true, "switch": true, "typeof": true, "for": true, "function": true, "repeat": true, "new": true, "default": true, "+": true, "void": true, "<=": true, "nil": true, "throw": true, "%": true, "local": true};
  function reserved63(x) {
    return(reserved[x]);
  }
  function numeric63(n) {
    return(((n > 47) && (n < 58)));
  }
  function valid_char63(n) {
    return((numeric63(n) || ((n > 64) && (n < 91)) || ((n > 96) && (n < 123)) || (n === 95)));
  }
  function valid_id63(id) {
    if (empty63(id)) {
      return(false);
    } else {
      if (special63(id)) {
        return(false);
      } else {
        if (reserved63(id)) {
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
      }
    }
  }
  function to_id(id) {
    var id1 = "";
    var i = 0;
    while ((i < length(id))) {
      var c = char(id, i);
      var n = code(c);
      var c1 = (function () {
        if ((c === "-")) {
          return("_");
        } else {
          if (valid_char63(n)) {
            return(c);
          } else {
            if ((i === 0)) {
              return(("_" + n));
            } else {
              return(n);
            }
          }
        }
      })();
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function module_key(spec) {
    if (atom63(spec)) {
      return(to_string(spec));
    } else {
      throw new Error("Unsupported module specification");
    }
  }
  function module(spec) {
    return(modules[module_key(spec)]);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g87 = hd(environment);
    var n = undefined;
    for (n in _g87) {
      if (isNaN(parseInt(n))) {
        var b = _g87[n];
        if ((b.variable && (b.module === current_module))) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join(["do", join(["%local", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    }
  }
  function imported(spec) {
    var _g88 = unstash(sublist(arguments, 1));
    var all = _g88.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g89 = module(spec).export;
      var n = undefined;
      for (n in _g89) {
        if (isNaN(parseInt(n))) {
          var b = _g89[n];
          if ((b.variable && (all || b.export))) {
            add(imports, join(["%local", n, join(["get", m, join(["quote", n])])]));
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([join(["%local", m, join(["get", "nexus", join(["quote", k])])])], imports));
    }
  }
  function quote_binding(b) {
    b = extend(b, {_stash: true, module: join(["quote", b.module])});
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: join(["quote", b.symbol])}));
    } else {
      if ((b.macro && b.form)) {
        return(exclude(extend(b, {_stash: true, macro: b.form}), {_stash: true, form: true}));
      } else {
        if ((b.special && b.form)) {
          return(exclude(extend(b, {_stash: true, special: b.form}), {_stash: true, form: true}));
        } else {
          if (is63(b.variable)) {
            return(b);
          } else {
            if (is63(b.global)) {
              return(b);
            }
          }
        }
      }
    }
  }
  function mapo(f, t) {
    var o = [];
    var _g90 = t;
    var k = undefined;
    for (k in _g90) {
      if (isNaN(parseInt(k))) {
        var v = _g90[k];
        var x = f(k, v);
        if (is63(x)) {
          add(o, k);
          add(o, x);
        }
      }
    }
    return(o);
  }
  function quote_frame(t) {
    return(join(["%object"], mapo(function (_g55, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g91 = ["table"];
      _g91.export = quote_frame(m.export);
      _g91.import = quoted(m.import);
      return(_g91);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g92 = {};
  nexus.utilities = _g92;
  _g92["special-form?"] = special_form63;
  _g92["bind*"] = bind42;
  _g92["quote-modules"] = quote_modules;
  _g92["quasisplice?"] = quasisplice63;
  _g92.quasiexpand = quasiexpand;
  _g92["quasiquote-list"] = quasiquote_list;
  _g92["module-key"] = module_key;
  _g92["symbol-expansion"] = symbol_expansion;
  _g92["to-id"] = to_id;
  _g92["valid-id?"] = valid_id63;
  _g92.imported = imported;
  _g92["reserved?"] = reserved63;
  _g92["variable?"] = variable63;
  _g92["bound?"] = bound63;
  _g92["quote-environment"] = quote_environment;
  _g92["quote-module"] = quote_module;
  _g92["quote-frame"] = quote_frame;
  _g92["valid-char?"] = valid_char63;
  _g92["numeric?"] = numeric63;
  _g92.reserved = reserved;
  _g92["stash*"] = stash42;
  _g92["can-unquote?"] = can_unquote63;
  _g92["quasiquoting?"] = quasiquoting63;
  _g92["global?"] = global63;
  _g92["special?"] = special63;
  _g92["initial-environment"] = initial_environment;
  _g92.mapo = mapo;
  _g92.exported = exported;
  _g92.module = module;
  _g92.bind = bind;
  _g92.macroexpand = macroexpand;
  _g92["quote-binding"] = quote_binding;
  _g92.indentation = indentation;
  _g92.quoted = quoted;
  _g92["symbol?"] = symbol63;
  _g92["macro?"] = macro63;
  _g92["macro-function"] = macro_function;
  _g92.getenv = getenv;
  _g92["toplevel?"] = toplevel63;
  _g92.escape = escape;
  _g92["quoting?"] = quoting63;
})();
(function () {
  var _g93 = nexus.runtime;
  var inner = _g93.inner;
  var reduce = _g93.reduce;
  var split = _g93.split;
  var unstash = _g93.unstash;
  var map = _g93.map;
  var last = _g93.last;
  var is63 = _g93["is?"];
  var nil63 = _g93["nil?"];
  var atom63 = _g93["atom?"];
  var id_literal63 = _g93["id-literal?"];
  var parse_number = _g93["parse-number"];
  var boolean63 = _g93["boolean?"];
  var keys63 = _g93["keys?"];
  var composite63 = _g93["composite?"];
  var drop = _g93.drop;
  var write = _g93.write;
  var _37message_handler = _g93["%message-handler"];
  var substring = _g93.substring;
  var replicate = _g93.replicate;
  var reverse = _g93.reverse;
  var sub = _g93.sub;
  var _61 = _g93["="];
  var _62 = _g93[">"];
  var exit = _g93.exit;
  var add = _g93.add;
  var code = _g93.code;
  var number63 = _g93["number?"];
  var _6061 = _g93["<="];
  var _ = _g93["-"];
  var _6261 = _g93[">="];
  var empty63 = _g93["empty?"];
  var _42 = _g93["*"];
  var function63 = _g93["function?"];
  var write_file = _g93["write-file"];
  var search = _g93.search;
  var char = _g93.char;
  var setenv = _g93.setenv;
  var tl = _g93.tl;
  var read_file = _g93["read-file"];
  var hd = _g93.hd;
  var join = _g93.join;
  var sublist = _g93.sublist;
  var keep = _g93.keep;
  var list63 = _g93["list?"];
  var extend = _g93.extend;
  var table63 = _g93["table?"];
  var splice = _g93.splice;
  var some63 = _g93["some?"];
  var iterate = _g93.iterate;
  var length = _g93.length;
  var to_string = _g93["to-string"];
  var string63 = _g93["string?"];
  var stash = _g93.stash;
  var _43 = _g93["+"];
  var _37 = _g93["%"];
  var make_id = _g93["make-id"];
  var pairwise = _g93.pairwise;
  var _47 = _g93["/"];
  var string_literal63 = _g93["string-literal?"];
  var exclude = _g93.exclude;
  var cat = _g93.cat;
  var apply = _g93.apply;
  var find = _g93.find;
  var _60 = _g93["<"];
  var delimiters = {";": true, "\n": true, "(": true, ")": true};
  var whitespace = {"\n": true, "\t": true, " ": true};
  function make_stream(str) {
    return({pos: 0, len: length(str), string: str});
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
      } else {
        if (whitespace[c]) {
          read_char(s);
        } else {
          if ((c === ";")) {
            while ((c && !((c === "\n")))) {
              c = read_char(s);
            }
            skip_non_code(s);
          } else {
            break;
          }
        }
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
    } else {
      if ((str === "true")) {
        return(true);
      } else {
        if ((str === "false")) {
          return(false);
        } else {
          if ((str === "_")) {
            return(make_id());
          } else {
            if (dot63) {
              return(reduce(function (a, b) {
                return(join(["get", b, join(["quote", a])]));
              }, reverse(split(str, "."))));
            } else {
              return(str);
            }
          }
        }
      }
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
        } else {
          if (flag63(x)) {
            l[sub(x, 1)] = true;
          } else {
            add(l, x);
          }
        }
      } else {
        if (c) {
          read_char(s);
          break;
        } else {
          throw new Error(("Expected ) at " + s.pos));
        }
      }
    }
    return(l);
  };
  read_table[")"] = function (s) {
    throw new Error(("Unexpected ) at " + s.pos));
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
      } else {
        if (c) {
          read_char(s);
          break;
        } else {
          throw new Error(("Expected \" at " + s.pos));
        }
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
      } else {
        if (c) {
          read_char(s);
          break;
        } else {
          throw new Error(("Expected | at " + s.pos));
        }
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
  var _g104 = {};
  nexus.reader = _g104;
  _g104["key?"] = key63;
  _g104.eof = eof;
  _g104["peek-char"] = peek_char;
  _g104.whitespace = whitespace;
  _g104.delimiters = delimiters;
  _g104["read-all"] = read_all;
  _g104.read = read;
  _g104["make-stream"] = make_stream;
  _g104["read-char"] = read_char;
  _g104["flag?"] = flag63;
  _g104["skip-non-code"] = skip_non_code;
  _g104["read-table"] = read_table;
  _g104["read-from-string"] = read_from_string;
})();
(function () {
  var _g105 = nexus.runtime;
  var inner = _g105.inner;
  var reduce = _g105.reduce;
  var split = _g105.split;
  var unstash = _g105.unstash;
  var map = _g105.map;
  var last = _g105.last;
  var is63 = _g105["is?"];
  var nil63 = _g105["nil?"];
  var atom63 = _g105["atom?"];
  var id_literal63 = _g105["id-literal?"];
  var parse_number = _g105["parse-number"];
  var boolean63 = _g105["boolean?"];
  var keys63 = _g105["keys?"];
  var composite63 = _g105["composite?"];
  var drop = _g105.drop;
  var write = _g105.write;
  var _37message_handler = _g105["%message-handler"];
  var substring = _g105.substring;
  var replicate = _g105.replicate;
  var reverse = _g105.reverse;
  var sub = _g105.sub;
  var _61 = _g105["="];
  var _62 = _g105[">"];
  var exit = _g105.exit;
  var add = _g105.add;
  var code = _g105.code;
  var number63 = _g105["number?"];
  var _6061 = _g105["<="];
  var _ = _g105["-"];
  var _6261 = _g105[">="];
  var empty63 = _g105["empty?"];
  var _42 = _g105["*"];
  var function63 = _g105["function?"];
  var write_file = _g105["write-file"];
  var search = _g105.search;
  var char = _g105.char;
  var setenv = _g105.setenv;
  var tl = _g105.tl;
  var read_file = _g105["read-file"];
  var hd = _g105.hd;
  var join = _g105.join;
  var sublist = _g105.sublist;
  var keep = _g105.keep;
  var list63 = _g105["list?"];
  var extend = _g105.extend;
  var table63 = _g105["table?"];
  var splice = _g105.splice;
  var some63 = _g105["some?"];
  var iterate = _g105.iterate;
  var length = _g105.length;
  var to_string = _g105["to-string"];
  var string63 = _g105["string?"];
  var stash = _g105.stash;
  var _43 = _g105["+"];
  var _37 = _g105["%"];
  var make_id = _g105["make-id"];
  var pairwise = _g105.pairwise;
  var _47 = _g105["/"];
  var string_literal63 = _g105["string-literal?"];
  var exclude = _g105.exclude;
  var cat = _g105.cat;
  var apply = _g105.apply;
  var find = _g105.find;
  var _60 = _g105["<"];
  var _g106 = nexus.utilities;
  var macroexpand = _g106.macroexpand;
  var imported = _g106.imported;
  var special63 = _g106["special?"];
  var quoted = _g106.quoted;
  var reserved63 = _g106["reserved?"];
  var special_form63 = _g106["special-form?"];
  var bind = _g106.bind;
  var initial_environment = _g106["initial-environment"];
  var bind42 = _g106["bind*"];
  var bound63 = _g106["bound?"];
  var quote_environment = _g106["quote-environment"];
  var quasiexpand = _g106.quasiexpand;
  var exported = _g106.exported;
  var stash42 = _g106["stash*"];
  var getenv = _g106.getenv;
  var macro_function = _g106["macro-function"];
  var macro63 = _g106["macro?"];
  var symbol63 = _g106["symbol?"];
  var indentation = _g106.indentation;
  var toplevel63 = _g106["toplevel?"];
  var module = _g106.module;
  var mapo = _g106.mapo;
  var module_key = _g106["module-key"];
  var symbol_expansion = _g106["symbol-expansion"];
  var to_id = _g106["to-id"];
  var valid_id63 = _g106["valid-id?"];
  var quote_modules = _g106["quote-modules"];
  var variable63 = _g106["variable?"];
  var _g109 = nexus.reader;
  var make_stream = _g109["make-stream"];
  var read_all = _g109["read-all"];
  var read_table = _g109["read-table"];
  var read = _g109.read;
  var read_from_string = _g109["read-from-string"];
  var infix = {lua: {cat: "..", "=": "==", "~=": true, "and": true, "or": true}, js: {cat: "+", "=": "===", "~=": "!=", "and": "&&", "or": "||"}, common: {"/": true, "<=": true, "-": true, ">": true, "+": true, "<": true, "*": true, "%": true, ">=": true}};
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
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g110 = args;
    var i = 0;
    while ((i < length(_g110))) {
      var arg = _g110[i];
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
    } else {
      if ((x === "nil")) {
        return("undefined");
      } else {
        if (id_literal63(x)) {
          return(inner(x));
        } else {
          if (string_literal63(x)) {
            return(x);
          } else {
            if (string63(x)) {
              return(to_id(x));
            } else {
              if (boolean63(x)) {
                if (x) {
                  return("true");
                } else {
                  return("false");
                }
              } else {
                if (number63(x)) {
                  return((x + ""));
                } else {
                  throw new Error("Unrecognized atom");
                }
              }
            }
          }
        }
      }
    }
  }
  function compile_body(forms) {
    var _g111 = unstash(sublist(arguments, 1));
    var tail = _g111.tail;
    var str = "";
    var _g112 = forms;
    var i = 0;
    while ((i < length(_g112))) {
      var x = _g112[i];
      var t63 = (tail && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, tail: t63, stmt: true}));
      i = (i + 1);
    }
    return(str);
  }
  function terminator(stmt63) {
    if (!(stmt63)) {
      return("");
    } else {
      if ((target === "js")) {
        return(";\n");
      } else {
        return("\n");
      }
    }
  }
  function compile_special(form, stmt63, tail63) {
    var _g113 = getenv(hd(form));
    var self_tr63 = _g113.tr;
    var special = _g113.special;
    var stmt = _g113.stmt;
    if ((!(stmt63) && stmt)) {
      return(compile(join([join(["%function", [], form])]), {_stash: true, tail: tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  }
  function compile_call(form) {
    if (empty63(form)) {
      return(compile_special(["%array"]));
    } else {
      var f = hd(form);
      var f1 = compile(f);
      var args = compile_args(stash42(tl(form)));
      if (list63(f)) {
        return(("(" + f1 + ")" + args));
      } else {
        if (string63(f)) {
          return((f1 + args));
        } else {
          throw new Error("Invalid function call");
        }
      }
    }
  }
  function compile_infix(_g114) {
    var op = _g114[0];
    var args = sub(_g114, 1);
    var str = "(";
    var _g115 = getop(op);
    var _g116 = args;
    var i = 0;
    while ((i < length(_g116))) {
      var arg = _g116[i];
      if (((_g115 === "-") && (length(args) === 1))) {
        str = (str + _g115 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g115 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g117 = unstash(sublist(arguments, 2));
    var name = _g117.name;
    var prefix = _g117.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g118 = (prefix || "");
    var _g119 = compile_args(args);
    var _g120 = (function () {
      indent_level = (indent_level + 1);
      var _g121 = compile_body(body, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g121);
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
      return(("function " + id + _g119 + " {\n" + _g120 + ind + "}" + tr));
    } else {
      return((_g118 + "function " + id + _g119 + "\n" + _g120 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g122 = unstash(sublist(arguments, 1));
    var stmt = _g122.stmt;
    var tail = _g122.tail;
    if ((tail && can_return63(form))) {
      form = join(["return", form]);
    }
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt, tail));
      } else {
        var tr = terminator(stmt);
        var ind = (function () {
          if (stmt) {
            return(indentation());
          } else {
            return("");
          }
        })();
        var _g123 = (function () {
          if (atom63(form)) {
            return(compile_atom(form));
          } else {
            if (infix63(form)) {
              return(compile_infix(form));
            } else {
              return(compile_call(form));
            }
          }
        })();
        return((ind + _g123 + tr));
      }
    }
  };
  function lower(form) {
    return(macroexpand(form));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g124 = lower(body);
    var epilog = lower(exported());
    return(join([join(["%function", []], join(_g124, [epilog]))]));
  }
  function compile_file(file) {
    var str = read_file(file);
    var body = read_all(make_stream(str));
    var form = encapsulate(body);
    return((compile(form) + ";\n"));
  }
  var run = global.eval;
  var compiling63 = false;
  var compiler_output = "";
  function _37compile_module(spec) {
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
    var _g125 = toplevel;
    var name = undefined;
    for (name in _g125) {
      if (isNaN(parseInt(name))) {
        var binding = _g125[name];
        if ((binding.module === k)) {
          m.export[name] = binding;
        }
      }
    }
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g126 = unstash(sublist(arguments, 1));
    var all = _g126.all;
    var m = module(spec);
    var frame = last(environment);
    var _g127 = m.export;
    var k = undefined;
    for (k in _g127) {
      if (isNaN(parseInt(k))) {
        var v = _g127[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g128 = unstash(sublist(arguments, 1));
    var all = _g128.all;
    if (nil63(module(spec))) {
      _37compile_module(spec);
    }
    return(open_module(spec, {_stash: true, all: all}));
  }
  function in_module(spec) {
    load_module(spec, {_stash: true, all: true});
    var m = module(spec);
    map(open_module, m.import);
    current_module = spec;
  }
  function compile_module(spec) {
    compiling63 = true;
    _37compile_module(spec);
    return(compiler_output);
  }
  function prologue() {
    if (current_module) {
      return(join(imported(current_module, {_stash: true, all: true}), (function () {
        var m = module(current_module);
        return(map(function (x) {
          return(splice(imported(x)));
        }, m.import));
      })()));
    }
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var form1 = join(["do"], join(prologue(), [form]));
    var x = compile(lower(form1));
    target = previous;
    return(run(x));
  }
  var _g129 = {};
  nexus.compiler = _g129;
  _g129.prologue = prologue;
  _g129["compile-file"] = compile_file;
  _g129["in-module"] = in_module;
  _g129["compile-call"] = compile_call;
  _g129.infix = infix;
  _g129["compile-atom"] = compile_atom;
  _g129.compile = compile;
  _g129["compile-infix"] = compile_infix;
  _g129["infix?"] = infix63;
  _g129["load-module"] = load_module;
  _g129.terminator = terminator;
  _g129["open-module"] = open_module;
  _g129["%compile-module"] = _37compile_module;
  _g129["compiling?"] = compiling63;
  _g129.getop = getop;
  _g129.run = run;
  _g129["module-path"] = module_path;
  _g129.lower = lower;
  _g129["can-return?"] = can_return63;
  _g129["compile-args"] = compile_args;
  _g129.eval = eval;
  _g129["compile-module"] = compile_module;
  _g129["compile-function"] = compile_function;
  _g129["compile-body"] = compile_body;
  _g129["compile-special"] = compile_special;
  _g129["compiler-output"] = compiler_output;
  _g129.encapsulate = encapsulate;
})();
(function () {
  var _g131 = nexus.runtime;
  var inner = _g131.inner;
  var reduce = _g131.reduce;
  var split = _g131.split;
  var unstash = _g131.unstash;
  var map = _g131.map;
  var last = _g131.last;
  var is63 = _g131["is?"];
  var nil63 = _g131["nil?"];
  var atom63 = _g131["atom?"];
  var id_literal63 = _g131["id-literal?"];
  var parse_number = _g131["parse-number"];
  var boolean63 = _g131["boolean?"];
  var keys63 = _g131["keys?"];
  var composite63 = _g131["composite?"];
  var drop = _g131.drop;
  var write = _g131.write;
  var _37message_handler = _g131["%message-handler"];
  var substring = _g131.substring;
  var replicate = _g131.replicate;
  var reverse = _g131.reverse;
  var sub = _g131.sub;
  var _61 = _g131["="];
  var _62 = _g131[">"];
  var exit = _g131.exit;
  var add = _g131.add;
  var code = _g131.code;
  var number63 = _g131["number?"];
  var _6061 = _g131["<="];
  var _ = _g131["-"];
  var _6261 = _g131[">="];
  var empty63 = _g131["empty?"];
  var _42 = _g131["*"];
  var function63 = _g131["function?"];
  var write_file = _g131["write-file"];
  var search = _g131.search;
  var char = _g131.char;
  var setenv = _g131.setenv;
  var tl = _g131.tl;
  var read_file = _g131["read-file"];
  var hd = _g131.hd;
  var join = _g131.join;
  var sublist = _g131.sublist;
  var keep = _g131.keep;
  var list63 = _g131["list?"];
  var extend = _g131.extend;
  var table63 = _g131["table?"];
  var splice = _g131.splice;
  var some63 = _g131["some?"];
  var iterate = _g131.iterate;
  var length = _g131.length;
  var to_string = _g131["to-string"];
  var string63 = _g131["string?"];
  var stash = _g131.stash;
  var _43 = _g131["+"];
  var _37 = _g131["%"];
  var make_id = _g131["make-id"];
  var pairwise = _g131.pairwise;
  var _47 = _g131["/"];
  var string_literal63 = _g131["string-literal?"];
  var exclude = _g131.exclude;
  var cat = _g131.cat;
  var apply = _g131.apply;
  var find = _g131.find;
  var _60 = _g131["<"];
  var _g132 = nexus.utilities;
  var macroexpand = _g132.macroexpand;
  var imported = _g132.imported;
  var special63 = _g132["special?"];
  var quoted = _g132.quoted;
  var reserved63 = _g132["reserved?"];
  var special_form63 = _g132["special-form?"];
  var bind = _g132.bind;
  var initial_environment = _g132["initial-environment"];
  var bind42 = _g132["bind*"];
  var bound63 = _g132["bound?"];
  var quote_environment = _g132["quote-environment"];
  var quasiexpand = _g132.quasiexpand;
  var exported = _g132.exported;
  var stash42 = _g132["stash*"];
  var getenv = _g132.getenv;
  var macro_function = _g132["macro-function"];
  var macro63 = _g132["macro?"];
  var symbol63 = _g132["symbol?"];
  var indentation = _g132.indentation;
  var toplevel63 = _g132["toplevel?"];
  var module = _g132.module;
  var mapo = _g132.mapo;
  var module_key = _g132["module-key"];
  var symbol_expansion = _g132["symbol-expansion"];
  var to_id = _g132["to-id"];
  var valid_id63 = _g132["valid-id?"];
  var quote_modules = _g132["quote-modules"];
  var variable63 = _g132["variable?"];
  var _g135 = nexus.compiler;
  var in_module = _g135["in-module"];
  var load_module = _g135["load-module"];
  var compile_call = _g135["compile-call"];
  var eval = _g135.eval;
  var compile_module = _g135["compile-module"];
  var open_module = _g135["open-module"];
  var compile_function = _g135["compile-function"];
  var compile_special = _g135["compile-special"];
  var compile_body = _g135["compile-body"];
  var compile = _g135.compile;
})();
(function () {
  var _g330 = nexus.runtime;
  var inner = _g330.inner;
  var reduce = _g330.reduce;
  var split = _g330.split;
  var unstash = _g330.unstash;
  var map = _g330.map;
  var last = _g330.last;
  var is63 = _g330["is?"];
  var nil63 = _g330["nil?"];
  var atom63 = _g330["atom?"];
  var id_literal63 = _g330["id-literal?"];
  var parse_number = _g330["parse-number"];
  var boolean63 = _g330["boolean?"];
  var keys63 = _g330["keys?"];
  var composite63 = _g330["composite?"];
  var drop = _g330.drop;
  var write = _g330.write;
  var _37message_handler = _g330["%message-handler"];
  var substring = _g330.substring;
  var replicate = _g330.replicate;
  var reverse = _g330.reverse;
  var sub = _g330.sub;
  var _61 = _g330["="];
  var _62 = _g330[">"];
  var exit = _g330.exit;
  var add = _g330.add;
  var code = _g330.code;
  var number63 = _g330["number?"];
  var _6061 = _g330["<="];
  var _ = _g330["-"];
  var _6261 = _g330[">="];
  var empty63 = _g330["empty?"];
  var _42 = _g330["*"];
  var function63 = _g330["function?"];
  var write_file = _g330["write-file"];
  var search = _g330.search;
  var char = _g330.char;
  var setenv = _g330.setenv;
  var tl = _g330.tl;
  var read_file = _g330["read-file"];
  var hd = _g330.hd;
  var join = _g330.join;
  var sublist = _g330.sublist;
  var keep = _g330.keep;
  var list63 = _g330["list?"];
  var extend = _g330.extend;
  var table63 = _g330["table?"];
  var splice = _g330.splice;
  var some63 = _g330["some?"];
  var iterate = _g330.iterate;
  var length = _g330.length;
  var to_string = _g330["to-string"];
  var string63 = _g330["string?"];
  var stash = _g330.stash;
  var _43 = _g330["+"];
  var _37 = _g330["%"];
  var make_id = _g330["make-id"];
  var pairwise = _g330.pairwise;
  var _47 = _g330["/"];
  var string_literal63 = _g330["string-literal?"];
  var exclude = _g330.exclude;
  var cat = _g330.cat;
  var apply = _g330.apply;
  var find = _g330.find;
  var _60 = _g330["<"];
  var _g331 = nexus.utilities;
  var macroexpand = _g331.macroexpand;
  var imported = _g331.imported;
  var special63 = _g331["special?"];
  var quoted = _g331.quoted;
  var reserved63 = _g331["reserved?"];
  var special_form63 = _g331["special-form?"];
  var bind = _g331.bind;
  var initial_environment = _g331["initial-environment"];
  var bind42 = _g331["bind*"];
  var bound63 = _g331["bound?"];
  var quote_environment = _g331["quote-environment"];
  var quasiexpand = _g331.quasiexpand;
  var exported = _g331.exported;
  var stash42 = _g331["stash*"];
  var getenv = _g331.getenv;
  var macro_function = _g331["macro-function"];
  var macro63 = _g331["macro?"];
  var symbol63 = _g331["symbol?"];
  var indentation = _g331.indentation;
  var toplevel63 = _g331["toplevel?"];
  var module = _g331.module;
  var mapo = _g331.mapo;
  var module_key = _g331["module-key"];
  var symbol_expansion = _g331["symbol-expansion"];
  var to_id = _g331["to-id"];
  var valid_id63 = _g331["valid-id?"];
  var quote_modules = _g331["quote-modules"];
  var variable63 = _g331["variable?"];
  var _g334 = nexus.compiler;
  var in_module = _g334["in-module"];
  var load_module = _g334["load-module"];
  var compile_call = _g334["compile-call"];
  var eval = _g334.eval;
  var compile_module = _g334["compile-module"];
  var open_module = _g334["open-module"];
  var compile_function = _g334["compile-function"];
  var compile_special = _g334["compile-special"];
  var compile_body = _g334["compile-body"];
  var compile = _g334.compile;
  global.target = "js";
})();
(function () {
  var _g619 = nexus.runtime;
  var inner = _g619.inner;
  var reduce = _g619.reduce;
  var split = _g619.split;
  var unstash = _g619.unstash;
  var map = _g619.map;
  var last = _g619.last;
  var is63 = _g619["is?"];
  var nil63 = _g619["nil?"];
  var atom63 = _g619["atom?"];
  var id_literal63 = _g619["id-literal?"];
  var parse_number = _g619["parse-number"];
  var boolean63 = _g619["boolean?"];
  var keys63 = _g619["keys?"];
  var composite63 = _g619["composite?"];
  var drop = _g619.drop;
  var write = _g619.write;
  var _37message_handler = _g619["%message-handler"];
  var substring = _g619.substring;
  var replicate = _g619.replicate;
  var reverse = _g619.reverse;
  var sub = _g619.sub;
  var _61 = _g619["="];
  var _62 = _g619[">"];
  var exit = _g619.exit;
  var add = _g619.add;
  var code = _g619.code;
  var number63 = _g619["number?"];
  var _6061 = _g619["<="];
  var _ = _g619["-"];
  var _6261 = _g619[">="];
  var empty63 = _g619["empty?"];
  var _42 = _g619["*"];
  var function63 = _g619["function?"];
  var write_file = _g619["write-file"];
  var search = _g619.search;
  var char = _g619.char;
  var setenv = _g619.setenv;
  var tl = _g619.tl;
  var read_file = _g619["read-file"];
  var hd = _g619.hd;
  var join = _g619.join;
  var sublist = _g619.sublist;
  var keep = _g619.keep;
  var list63 = _g619["list?"];
  var extend = _g619.extend;
  var table63 = _g619["table?"];
  var splice = _g619.splice;
  var some63 = _g619["some?"];
  var iterate = _g619.iterate;
  var length = _g619.length;
  var to_string = _g619["to-string"];
  var string63 = _g619["string?"];
  var stash = _g619.stash;
  var _43 = _g619["+"];
  var _37 = _g619["%"];
  var make_id = _g619["make-id"];
  var pairwise = _g619.pairwise;
  var _47 = _g619["/"];
  var string_literal63 = _g619["string-literal?"];
  var exclude = _g619.exclude;
  var cat = _g619.cat;
  var apply = _g619.apply;
  var find = _g619.find;
  var _60 = _g619["<"];
  var _g620 = nexus.utilities;
  var macroexpand = _g620.macroexpand;
  var imported = _g620.imported;
  var special63 = _g620["special?"];
  var quoted = _g620.quoted;
  var reserved63 = _g620["reserved?"];
  var special_form63 = _g620["special-form?"];
  var bind = _g620.bind;
  var initial_environment = _g620["initial-environment"];
  var bind42 = _g620["bind*"];
  var bound63 = _g620["bound?"];
  var quote_environment = _g620["quote-environment"];
  var quasiexpand = _g620.quasiexpand;
  var exported = _g620.exported;
  var stash42 = _g620["stash*"];
  var getenv = _g620.getenv;
  var macro_function = _g620["macro-function"];
  var macro63 = _g620["macro?"];
  var symbol63 = _g620["symbol?"];
  var indentation = _g620.indentation;
  var toplevel63 = _g620["toplevel?"];
  var module = _g620.module;
  var mapo = _g620.mapo;
  var module_key = _g620["module-key"];
  var symbol_expansion = _g620["symbol-expansion"];
  var to_id = _g620["to-id"];
  var valid_id63 = _g620["valid-id?"];
  var quote_modules = _g620["quote-modules"];
  var variable63 = _g620["variable?"];
  var _g623 = nexus.compiler;
  var in_module = _g623["in-module"];
  var load_module = _g623["load-module"];
  var compile_call = _g623["compile-call"];
  var eval = _g623.eval;
  var compile_module = _g623["compile-module"];
  var open_module = _g623["open-module"];
  var compile_function = _g623["compile-function"];
  var compile_special = _g623["compile-special"];
  var compile_body = _g623["compile-body"];
  var compile = _g623.compile;
  global.modules = {core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"with-bindings": {export: true, module: "core", macro: function (_g636) {
    var names = _g636[0];
    var body = unstash(sublist(arguments, 1));
    var _g637 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g638 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g639 = ["setenv", x];
        _g639.variable = true;
        return(_g639);
      })())])];
      _g638.scope = true;
      return(_g638);
    })(), _g637));
  }}, define: {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g640 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g640))) {
      var _g641 = bind42(x, _g640);
      var args = _g641[0];
      var _g642 = _g641[1];
      return(join(["%local-function", name, args], _g642));
    } else {
      return(join(["%local", name, x]));
    }
  }}, "let-macro": {export: true, module: "core", macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g643 = sub(body, 0);
    add(environment, {});
    var _g644 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g643)));
    })();
    drop(environment);
    return(_g644);
  }}, "define-macro": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g645 = sub(body, 0);
    var form = join(["fn", args], _g645);
    eval(join((function () {
      var _g646 = ["setenv", join(["quote", name])];
      _g646.form = join(["quote", form]);
      _g646.macro = form;
      return(_g646);
    })()));
    return(undefined);
  }}, list: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g647 = body;
      var k = undefined;
      for (k in _g647) {
        if (isNaN(parseInt(k))) {
          var v = _g647[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, dec: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, each: {export: true, module: "core", macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g648 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    return(join(["let", join([t1, t]), (function () {
      if (nil63(v)) {
        var i = (function () {
          if (b.i) {
            return("i");
          } else {
            return(make_id());
          }
        })();
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g648), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", join([t1, k]), join(["if", join((function () {
          var _g649 = ["target"];
          _g649.js = join(["isNaN", join(["parseInt", k])]);
          _g649.lua = join(["not", join(["number?", k])]);
          return(_g649);
        })()), join(["let", join([v, join(["get", t1, k])])], _g648)])])]));
      }
    })()]));
  }}, "let-symbol": {export: true, module: "core", macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g650 = sub(body, 0);
    add(environment, {});
    var _g651 = (function () {
      map(function (_g652) {
        var name = _g652[0];
        var exp = _g652[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g650)));
    })();
    drop(environment);
    return(_g651);
  }}, guard: {export: true, module: "core", macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, pr: {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g653 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g653)]));
  }}, "cat!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g654 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g654)]));
  }}, inc: {export: true, module: "core", macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, fn: {export: true, module: "core", macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g655 = sub(body, 0);
    var _g656 = bind42(args, _g655);
    var _g657 = _g656[0];
    var _g658 = _g656[1];
    return(join(["%function", _g657], _g658));
  }}, target: {export: true, global: true, module: "core", macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, quasiquote: {export: true, module: "core", macro: function (form) {
    return(quasiexpand(form, 1));
  }}, "define-module": {export: true, module: "core", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g659 = sub(body, 0);
    var imports = [];
    var imp = _g659.import;
    var exp = _g659.export;
    var _g660 = (imp || []);
    var _g661 = 0;
    while ((_g661 < length(_g660))) {
      var k = _g660[_g661];
      load_module(k);
      imports = join(imports, imported(k));
      _g661 = (_g661 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g662 = (exp || []);
    var _g663 = 0;
    while ((_g663 < length(_g662))) {
      var k = _g662[_g663];
      setenv(k, {_stash: true, export: true});
      _g663 = (_g663 + 1);
    }
    return(join(["do"], imports));
  }}, "with-frame": {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g664 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g665 = ["table"];
      _g665._scope = scope;
      return(_g665);
    })())]), join(["let", join([x, join(["do"], _g664)]), join(["drop", "environment"]), x])]));
  }}, "join*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, table: {export: true, module: "core", macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g329, x) {
      return(x);
    }, body)));
  }}, "define-symbol": {export: true, module: "core", macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, at: {export: true, module: "core", macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = join(["+", i, 1]);
      }
    }
    return(join(["get", l, i]));
  }}, "define-special": {export: true, module: "core", macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g666 = sub(body, 0);
    var form = join(["fn", args], _g666);
    var keys = sub(_g666, length(_g666));
    eval(join((function () {
      var _g667 = ["setenv", join(["quote", name])];
      _g667.special = form;
      _g667.form = join(["quote", form]);
      return(_g667);
    })(), keys));
    return(undefined);
  }}, "list*": {export: true, module: "core", macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g668 = xs;
      var i = 0;
      while ((i < length(_g668))) {
        var x = _g668[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, language: {export: true, module: "core", macro: function () {
    return(join(["quote", target]));
  }}, "set-of": {export: true, module: "core", macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g669 = elements;
    var _g670 = 0;
    while ((_g670 < length(_g669))) {
      var e = _g669[_g670];
      l[e] = true;
      _g670 = (_g670 + 1);
    }
    return(join(["table"], l));
  }}, "if": {export: true, module: "core", macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g671) {
      var a = _g671[0];
      var b = _g671[1];
      var c = sub(_g671, 2);
      if (is63(b)) {
        return(join([join(["%if", a, b], step(c))]));
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }}, quote: {export: true, module: "core", macro: function (form) {
    return(quoted(form));
  }}, let: {export: true, module: "core", macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g672 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g673) {
      var lh = _g673[0];
      var rh = _g673[1];
      var _g674 = bind(lh, rh);
      var _g675 = 0;
      while ((_g675 < length(_g674))) {
        var _g676 = _g674[_g675];
        var id = _g676[0];
        var val = _g676[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g675 = (_g675 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g672)])));
  }}, "join!": {export: true, module: "core", macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g677 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g677)]));
  }}, "define*": {export: true, module: "core", macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g678 = sub(body, 0);
    setenv(name, {_stash: true, export: true, global: true});
    if (!(empty63(_g678))) {
      var _g679 = bind42(x, _g678);
      var args = _g679[0];
      var _g680 = _g679[1];
      return(join(["%global-function", name, args], _g680));
    } else {
      if ((target === "js")) {
        return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
      } else {
        return(join(["set", name, x]));
      }
    }
  }}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimizations: {module: "optimizer", variable: true}, "define-optimization": {}, optimize: {export: true, variable: true, module: "optimizer"}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {}}, system: {import: ["special", "core"], export: {nexus: {export: true, global: true, module: "system"}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"current-module": {export: true, global: true, module: "compiler"}, lower: {module: "compiler", variable: true}, terminator: {module: "compiler", variable: true}, "in-module": {export: true, variable: true, module: "compiler"}, "load-module": {export: true, variable: true, module: "compiler"}, "%compile-module": {module: "compiler", variable: true}, "compile-call": {export: true, variable: true, module: "compiler"}, "compile-infix": {module: "compiler", variable: true}, infix: {module: "compiler", variable: true}, "compile-args": {module: "compiler", variable: true}, eval: {export: true, variable: true, module: "compiler"}, "compiling?": {module: "compiler", variable: true}, "compile-module": {export: true, variable: true, module: "compiler"}, "compiler-output": {module: "compiler", variable: true}, "can-return?": {module: "compiler", variable: true}, "infix?": {module: "compiler", variable: true}, "module-path": {module: "compiler", variable: true}, "open-module": {export: true, variable: true, module: "compiler"}, "compile-function": {export: true, variable: true, module: "compiler"}, run: {module: "compiler", variable: true}, encapsulate: {module: "compiler", variable: true}, "compile-special": {export: true, variable: true, module: "compiler"}, "compile-atom": {module: "compiler", variable: true}, "compile-body": {export: true, variable: true, module: "compiler"}, getop: {module: "compiler", variable: true}, "compile-file": {module: "compiler", variable: true}, compile: {export: true, variable: true, module: "compiler"}, prologue: {module: "compiler", variable: true}}}, runtime: {import: ["special", "core"], export: {inner: {export: true, variable: true, module: "runtime"}, reduce: {export: true, variable: true, module: "runtime"}, split: {export: true, variable: true, module: "runtime"}, unstash: {export: true, variable: true, module: "runtime"}, map: {export: true, variable: true, module: "runtime"}, last: {export: true, variable: true, module: "runtime"}, "is?": {export: true, variable: true, module: "runtime"}, "nil?": {export: true, variable: true, module: "runtime"}, fs: {module: "runtime", variable: true}, "atom?": {export: true, variable: true, module: "runtime"}, "id-literal?": {export: true, variable: true, module: "runtime"}, "parse-number": {export: true, variable: true, module: "runtime"}, "boolean?": {export: true, variable: true, module: "runtime"}, "keys?": {export: true, variable: true, module: "runtime"}, "composite?": {export: true, variable: true, module: "runtime"}, drop: {export: true, variable: true, module: "runtime"}, write: {export: true, variable: true, module: "runtime"}, "%message-handler": {export: true, variable: true, module: "runtime"}, substring: {export: true, variable: true, module: "runtime"}, replicate: {export: true, variable: true, module: "runtime"}, reverse: {export: true, variable: true, module: "runtime"}, sub: {export: true, variable: true, module: "runtime"}, "=": {export: true, variable: true, module: "runtime"}, ">": {export: true, variable: true, module: "runtime"}, exit: {export: true, variable: true, module: "runtime"}, add: {export: true, variable: true, module: "runtime"}, code: {export: true, variable: true, module: "runtime"}, print: {export: true, global: true, module: "runtime"}, "number?": {export: true, variable: true, module: "runtime"}, "<=": {export: true, variable: true, module: "runtime"}, "-": {export: true, variable: true, module: "runtime"}, ">=": {export: true, variable: true, module: "runtime"}, "empty?": {export: true, variable: true, module: "runtime"}, "*": {export: true, variable: true, module: "runtime"}, "function?": {export: true, variable: true, module: "runtime"}, "write-file": {export: true, variable: true, module: "runtime"}, search: {export: true, variable: true, module: "runtime"}, char: {export: true, variable: true, module: "runtime"}, setenv: {export: true, variable: true, module: "runtime"}, mapl: {module: "runtime", variable: true}, "splice?": {module: "runtime", variable: true}, tl: {export: true, variable: true, module: "runtime"}, "read-file": {export: true, variable: true, module: "runtime"}, hd: {export: true, variable: true, module: "runtime"}, join: {export: true, variable: true, module: "runtime"}, sublist: {export: true, variable: true, module: "runtime"}, keep: {export: true, variable: true, module: "runtime"}, "list?": {export: true, variable: true, module: "runtime"}, "id-count": {module: "runtime", variable: true}, extend: {export: true, variable: true, module: "runtime"}, "table?": {export: true, variable: true, module: "runtime"}, splice: {export: true, variable: true, module: "runtime"}, "some?": {export: true, variable: true, module: "runtime"}, iterate: {export: true, variable: true, module: "runtime"}, length: {export: true, variable: true, module: "runtime"}, "to-string": {export: true, variable: true, module: "runtime"}, "string?": {export: true, variable: true, module: "runtime"}, stash: {export: true, variable: true, module: "runtime"}, "+": {export: true, variable: true, module: "runtime"}, "%": {export: true, variable: true, module: "runtime"}, require: {export: true, global: true, module: "runtime"}, "make-id": {export: true, variable: true, module: "runtime"}, type: {module: "runtime", variable: true}, pairwise: {export: true, variable: true, module: "runtime"}, "/": {export: true, variable: true, module: "runtime"}, "string-literal?": {export: true, variable: true, module: "runtime"}, exclude: {export: true, variable: true, module: "runtime"}, cat: {export: true, variable: true, module: "runtime"}, apply: {export: true, variable: true, module: "runtime"}, find: {export: true, variable: true, module: "runtime"}, "<": {export: true, variable: true, module: "runtime"}}}, lib: {import: ["core", "special"], export: {}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%for": {export: true, special: function (_g681) {
    var _g682 = _g681[0];
    var t = _g682[0];
    var k = _g682[1];
    var body = sub(_g681, 1);
    var _g683 = compile(t);
    var ind = indentation();
    var _g684 = (function () {
      indent_level = (indent_level + 1);
      var _g685 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g685);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g683 + " do\n" + _g684 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g683 + ") {\n" + _g684 + ind + "}\n"));
    }
  }, stmt: true, module: "special", tr: true}, "break": {export: true, special: function (_g130) {
    return((indentation() + "break"));
  }, module: "special", stmt: true}, "%try": {export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g686 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g686);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g687 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g687);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, stmt: true, module: "special", tr: true}, "%object": {export: true, special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g688 = pairs;
    var i = 0;
    while ((i < length(_g688))) {
      var _g689 = _g688[i];
      var k = _g689[0];
      var v = _g689[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g690 = compile(v);
      var _g691 = (function () {
        if (valid_id63(k)) {
          return(k);
        } else {
          if (((target === "js") && string_literal63(k))) {
            return(k);
          } else {
            if ((target === "js")) {
              return(quoted(k));
            } else {
              if (string_literal63(k)) {
                return(("[" + k + "]"));
              } else {
                return(("[" + quoted(k) + "]"));
              }
            }
          }
        }
      })();
      str = (str + _g691 + sep + _g690);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, module: "special"}, "return": {export: true, special: function (_g692) {
    var x = _g692[0];
    var _g693 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g693));
  }, module: "special", stmt: true}, "%local-function": {export: true, special: function (_g694) {
    var name = _g694[0];
    var args = _g694[1];
    var body = sub(_g694, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, stmt: true, module: "special", tr: true}, "do": {export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, stmt: true, module: "special", tr: true}, "%function": {export: true, special: function (_g695) {
    var args = _g695[0];
    var body = sub(_g695, 1);
    return(compile_function(args, body));
  }, module: "special"}, "%if": {export: true, special: function (_g696, tail63) {
    var x = _g696[0];
    var _g697 = _g696[1];
    var _g698 = _g696[2];
    var _g699 = compile(x);
    var _g700 = (function () {
      indent_level = (indent_level + 1);
      var _g702 = compile(_g697, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g702);
    })();
    var _g701 = (function () {
      if (_g698) {
        indent_level = (indent_level + 1);
        var _g703 = compile(_g698, {_stash: true, stmt: true, tail: tail63});
        indent_level = (indent_level - 1);
        return(_g703);
      }
    })();
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g699 + ") {\n" + _g700 + ind + "}");
    } else {
      str = (str + ind + "if " + _g699 + " then\n" + _g700);
    }
    if ((_g701 && (target === "js"))) {
      str = (str + " else {\n" + _g701 + ind + "}");
    } else {
      if (_g701) {
        str = (str + ind + "else\n" + _g701);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, stmt: true, module: "special", tr: true}, "set": {export: true, special: function (_g704) {
    var lh = _g704[0];
    var rh = _g704[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, module: "special", stmt: true}, "not": {export: true, special: function (_g705) {
    var x = _g705[0];
    var _g706 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g706 + ")"));
  }, module: "special"}, "%global-function": {export: true, special: function (_g707) {
    var name = _g707[0];
    var args = _g707[1];
    var body = sub(_g707, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, stmt: true, module: "special", tr: true}, "get": {export: true, special: function (_g708) {
    var t = _g708[0];
    var k = _g708[1];
    var _g709 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g709, 0) === "{"))) {
      _g709 = ("(" + _g709 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g709 + "." + inner(k)));
    } else {
      return((_g709 + "[" + k1 + "]"));
    }
  }, module: "special"}, "error": {export: true, special: function (_g710) {
    var x = _g710[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(join(["Error", x]))));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, module: "special", stmt: true}, "%array": {export: true, special: function (forms) {
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
    var _g711 = forms;
    var i = 0;
    while ((i < length(_g711))) {
      var x = _g711[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, module: "special"}, "%local": {export: true, special: function (_g712) {
    var name = _g712[0];
    var value = _g712[1];
    var id = compile(name);
    var value1 = compile(value);
    var rh = (function () {
      if (is63(value)) {
        return((" = " + value1));
      } else {
        return("");
      }
    })();
    var keyword = (function () {
      if ((target === "js")) {
        return("var ");
      } else {
        return("local ");
      }
    })();
    var ind = indentation();
    return((ind + keyword + id + rh));
  }, module: "special", stmt: true}, "while": {export: true, special: function (_g713) {
    var condition = _g713[0];
    var body = sub(_g713, 1);
    var _g714 = compile(condition);
    var _g715 = (function () {
      indent_level = (indent_level + 1);
      var _g716 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g716);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g714 + ") {\n" + _g715 + ind + "}\n"));
    } else {
      return((ind + "while " + _g714 + " do\n" + _g715 + ind + "end\n"));
    }
  }, stmt: true, module: "special", tr: true}}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, variable: true, module: "reader"}, delimiters: {module: "reader", variable: true}, "read-all": {export: true, variable: true, module: "reader"}, "read-table": {export: true, variable: true, module: "reader"}, "read-char": {module: "reader", variable: true}, read: {export: true, variable: true, module: "reader"}, "define-reader": {export: true, module: "reader", macro: function (_g717) {
    var char = _g717[0];
    var stream = _g717[1];
    var body = unstash(sublist(arguments, 1));
    var _g718 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g718)]));
  }}, "peek-char": {module: "reader", variable: true}, "skip-non-code": {module: "reader", variable: true}, whitespace: {module: "reader", variable: true}, "flag?": {module: "reader", variable: true}, "key?": {module: "reader", variable: true}, "read-from-string": {export: true, variable: true, module: "reader"}, eof: {module: "reader", variable: true}}}, utilities: {import: ["runtime", "special", "core"], export: {macroexpand: {export: true, variable: true, module: "utilities"}, "quasiquoting?": {module: "utilities", variable: true}, imported: {export: true, variable: true, module: "utilities"}, reserved: {module: "utilities", variable: true}, "special?": {export: true, variable: true, module: "utilities"}, quoted: {export: true, variable: true, module: "utilities"}, "reserved?": {export: true, variable: true, module: "utilities"}, "special-form?": {export: true, variable: true, module: "utilities"}, bind: {export: true, variable: true, module: "utilities"}, "initial-environment": {export: true, variable: true, module: "utilities"}, "quasisplice?": {module: "utilities", variable: true}, "quote-binding": {module: "utilities", variable: true}, "bind*": {export: true, variable: true, module: "utilities"}, "bound?": {export: true, variable: true, module: "utilities"}, "quote-environment": {export: true, variable: true, module: "utilities"}, quasiexpand: {export: true, variable: true, module: "utilities"}, exported: {export: true, variable: true, module: "utilities"}, "quoting?": {module: "utilities", variable: true}, escape: {module: "utilities", variable: true}, "stash*": {export: true, variable: true, module: "utilities"}, "quote-frame": {module: "utilities", variable: true}, "quasiquote-list": {module: "utilities", variable: true}, getenv: {export: true, variable: true, module: "utilities"}, "macro-function": {export: true, variable: true, module: "utilities"}, "macro?": {export: true, variable: true, module: "utilities"}, "quote-module": {module: "utilities", variable: true}, "symbol?": {export: true, variable: true, module: "utilities"}, "with-indent": {export: true, module: "utilities", macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, indentation: {export: true, variable: true, module: "utilities"}, "toplevel?": {export: true, variable: true, module: "utilities"}, "valid-char?": {module: "utilities", variable: true}, module: {export: true, variable: true, module: "utilities"}, "numeric?": {module: "utilities", variable: true}, mapo: {export: true, variable: true, module: "utilities"}, "module-key": {export: true, variable: true, module: "utilities"}, "global?": {module: "utilities", variable: true}, "can-unquote?": {module: "utilities", variable: true}, "symbol-expansion": {export: true, variable: true, module: "utilities"}, "to-id": {export: true, variable: true, module: "utilities"}, "indent-level": {export: true, global: true, module: "utilities"}, "valid-id?": {export: true, variable: true, module: "utilities"}, "quote-modules": {export: true, variable: true, module: "utilities"}, "variable?": {export: true, variable: true, module: "utilities"}}}};
  global.environment = [{"define-module": {export: true, module: "core", macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g719 = sub(body, 0);
    var imports = [];
    var imp = _g719.import;
    var exp = _g719.export;
    var _g720 = (imp || []);
    var _g721 = 0;
    while ((_g721 < length(_g720))) {
      var k = _g720[_g721];
      load_module(k);
      imports = join(imports, imported(k));
      _g721 = (_g721 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g722 = (exp || []);
    var _g723 = 0;
    while ((_g723 < length(_g722))) {
      var k = _g722[_g723];
      setenv(k, {_stash: true, export: true});
      _g723 = (_g723 + 1);
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var inner = _g2.inner;
  var length = _g2.length;
  var split = _g2.split;
  var stash = _g2.stash;
  var table63 = _g2["table?"];
  var last = _g2.last;
  var is63 = _g2["is?"];
  var nil63 = _g2["nil?"];
  var atom63 = _g2["atom?"];
  var id_literal63 = _g2["id-literal?"];
  var parse_number = _g2["parse-number"];
  var boolean63 = _g2["boolean?"];
  var keys63 = _g2["keys?"];
  var composite63 = _g2["composite?"];
  var drop = _g2.drop;
  var write = _g2.write;
  var _37message_handler = _g2["%message-handler"];
  var substring = _g2.substring;
  var replicate = _g2.replicate;
  var reverse = _g2.reverse;
  var sub = _g2.sub;
  var find = _g2.find;
  var extend = _g2.extend;
  var _60 = _g2["<"];
  var add = _g2.add;
  var code = _g2.code;
  var number63 = _g2["number?"];
  var _6061 = _g2["<="];
  var some63 = _g2["some?"];
  var _6261 = _g2[">="];
  var empty63 = _g2["empty?"];
  var _42 = _g2["*"];
  var function63 = _g2["function?"];
  var write_file = _g2["write-file"];
  var search = _g2.search;
  var char = _g2.char;
  var setenv = _g2.setenv;
  var pairwise = _g2.pairwise;
  var tl = _g2.tl;
  var read_file = _g2["read-file"];
  var hd = _g2.hd;
  var join = _g2.join;
  var sublist = _g2.sublist;
  var keep = _g2.keep;
  var list63 = _g2["list?"];
  var splice = _g2.splice;
  var iterate = _g2.iterate;
  var _47 = _g2["/"];
  var to_string = _g2["to-string"];
  var apply = _g2.apply;
  var exit = _g2.exit;
  var _61 = _g2["="];
  var _62 = _g2[">"];
  var _37 = _g2["%"];
  var make_id = _g2["make-id"];
  var _ = _g2["-"];
  var _43 = _g2["+"];
  var cat = _g2.cat;
  var string_literal63 = _g2["string-literal?"];
  var exclude = _g2.exclude;
  var unstash = _g2.unstash;
  var map = _g2.map;
  var reduce = _g2.reduce;
  var string63 = _g2["string?"];
  var _g5 = nexus.reader;
  var make_stream = _g5["make-stream"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_table = _g5["read-table"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus.compiler;
  var in_module = _g6["in-module"];
  var compile = _g6.compile;
  var compile_call = _g6["compile-call"];
  var eval = _g6.eval;
  var open_module = _g6["open-module"];
  var compile_special = _g6["compile-special"];
  var compile_body = _g6["compile-body"];
  var compile_module = _g6["compile-module"];
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  function rep(str) {
    var _g725 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g728) {
        return([false, _g728.message]);
      }
    })();
    var _g1 = _g725[0];
    var x = _g725[1];
    if (is63(x)) {
      return(print((to_string(x) + " ")));
    }
  }
  function repl() {
    function step(str) {
      rep(str);
      return(write("> "));
    }
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
    var _g726 = args;
    var i = 0;
    while ((i < length(_g726))) {
      var arg = _g726[i];
      if (((arg === "-o") || (arg === "-t") || (arg === "-e"))) {
        if ((i === (length(args) - 1))) {
          print((to_string("missing argument for") + " " + to_string(arg) + " "));
        } else {
          i = (i + 1);
          var val = args[i];
          if ((arg === "-o")) {
            output = val;
          } else {
            if ((arg === "-t")) {
              target1 = val;
            } else {
              if ((arg === "-e")) {
                expr = val;
              }
            }
          }
        }
      } else {
        if ((nil63(spec) && ("-" != char(arg, 0)))) {
          spec = arg;
        }
      }
      i = (i + 1);
    }
    if (output) {
      if (target1) {
        target = target1;
      }
      return(write_file(output, compile_module(spec)));
    } else {
      in_module((spec || "main"));
      if (expr) {
        return(rep(expr));
      } else {
        return(repl());
      }
    }
  }
  main();
  var _g727 = {};
  nexus.main = _g727;
  _g727.usage = usage;
  _g727.main = main;
  _g727.rep = rep;
  _g727.repl = repl;
})();
