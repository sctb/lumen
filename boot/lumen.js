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
  function extend(t) {
    var xs = unstash(sublist(arguments, 1));
    var _g37 = sub(xs, 0);
    return(join(t, _g37));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g38 = sub(keys, 0);
    var t1 = sublist(t);
    var _g39 = t;
    var k = undefined;
    for (k in _g39) {
      if (isNaN(parseInt(k))) {
        var v = _g39[k];
        if (!(_g38[k])) {
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
    var _g40 = sub(xs, 0);
    if (empty63(_g40)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g40));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g41 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g41));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g42)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g43));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g44)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g45 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g45)));
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
            var _g46 = x;
            var k = undefined;
            for (k in _g46) {
              if (isNaN(parseInt(k))) {
                var v = _g46[k];
                add(x1, (k + ":"));
                add(x1, v);
              }
            }
            var _g47 = x1;
            var i = 0;
            while ((i < length(_g47))) {
              var y = _g47[i];
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
    var _g48 = stash(args);
    return((f.apply)(f, _g48));
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
  function toplevel63() {
    return((length(environment) === 1));
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
  function setenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g49 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g50 = _g49;
      var k1 = undefined;
      for (k1 in _g50) {
        if (isNaN(parseInt(k1))) {
          var v = _g50[k1];
          x[k1] = v;
        }
      }
      if (toplevel63()) {
        var m = module(current_module);
        m.export[k] = x;
      }
      frame[k] = x;
    }
  }
  var _g51 = {};
  nexus.runtime = _g51;
  _g51["module-key"] = module_key;
  _g51.exit = exit;
  _g51.last = last;
  _g51.substring = substring;
  _g51["write-file"] = write_file;
  _g51["id-count"] = id_count;
  _g51.pairwise = pairwise;
  _g51["parse-number"] = parse_number;
  _g51.inner = inner;
  _g51.apply = apply;
  _g51.find = find;
  _g51.exclude = exclude;
  _g51["is?"] = is63;
  _g51.drop = drop;
  _g51["atom?"] = atom63;
  _g51.splice = splice;
  _g51["empty?"] = empty63;
  _g51.unstash = unstash;
  _g51.type = type;
  _g51.cat = cat;
  _g51["id-literal?"] = id_literal63;
  _g51.iterate = iterate;
  _g51[">"] = _62;
  _g51["="] = _61;
  _g51.length = length;
  _g51["splice?"] = splice63;
  _g51["<"] = _60;
  _g51.add = add;
  _g51.search = search;
  _g51["toplevel?"] = toplevel63;
  _g51.map = map;
  _g51["-"] = _;
  _g51["/"] = _47;
  _g51["keys?"] = keys63;
  _g51["%message-handler"] = _37message_handler;
  _g51.replicate = replicate;
  _g51["+"] = _43;
  _g51["%"] = _37;
  _g51["some?"] = some63;
  _g51["string-literal?"] = string_literal63;
  _g51.extend = extend;
  _g51["boolean?"] = boolean63;
  _g51.stash = stash;
  _g51["list?"] = list63;
  _g51.mapl = mapl;
  _g51.reverse = reverse;
  _g51.fs = fs;
  _g51.setenv = setenv;
  _g51.tl = tl;
  _g51.module = module;
  _g51.sub = sub;
  _g51.char = char;
  _g51["nil?"] = nil63;
  _g51.write = write;
  _g51.hd = hd;
  _g51.join = join;
  _g51[">="] = _6261;
  _g51.sublist = sublist;
  _g51["<="] = _6061;
  _g51["make-id"] = make_id;
  _g51.reduce = reduce;
  _g51["string?"] = string63;
  _g51.code = code;
  _g51["to-string"] = to_string;
  _g51["read-file"] = read_file;
  _g51.keep = keep;
  _g51.split = split;
  _g51["function?"] = function63;
  _g51["number?"] = number63;
  _g51["table?"] = table63;
  _g51["composite?"] = composite63;
  _g51["*"] = _42;
})();
(function () {
  var _g55 = nexus.runtime;
  var module_key = _g55["module-key"];
  var exit = _g55.exit;
  var last = _g55.last;
  var substring = _g55.substring;
  var write_file = _g55["write-file"];
  var pairwise = _g55.pairwise;
  var parse_number = _g55["parse-number"];
  var inner = _g55.inner;
  var apply = _g55.apply;
  var find = _g55.find;
  var exclude = _g55.exclude;
  var is63 = _g55["is?"];
  var drop = _g55.drop;
  var atom63 = _g55["atom?"];
  var splice = _g55.splice;
  var empty63 = _g55["empty?"];
  var unstash = _g55.unstash;
  var cat = _g55.cat;
  var id_literal63 = _g55["id-literal?"];
  var iterate = _g55.iterate;
  var _62 = _g55[">"];
  var _61 = _g55["="];
  var length = _g55.length;
  var _60 = _g55["<"];
  var add = _g55.add;
  var search = _g55.search;
  var toplevel63 = _g55["toplevel?"];
  var map = _g55.map;
  var _ = _g55["-"];
  var _47 = _g55["/"];
  var keys63 = _g55["keys?"];
  var _37message_handler = _g55["%message-handler"];
  var replicate = _g55.replicate;
  var _43 = _g55["+"];
  var _37 = _g55["%"];
  var some63 = _g55["some?"];
  var string_literal63 = _g55["string-literal?"];
  var extend = _g55.extend;
  var boolean63 = _g55["boolean?"];
  var stash = _g55.stash;
  var list63 = _g55["list?"];
  var reverse = _g55.reverse;
  var setenv = _g55.setenv;
  var tl = _g55.tl;
  var module = _g55.module;
  var sub = _g55.sub;
  var char = _g55.char;
  var nil63 = _g55["nil?"];
  var write = _g55.write;
  var hd = _g55.hd;
  var join = _g55.join;
  var _6261 = _g55[">="];
  var sublist = _g55.sublist;
  var _6061 = _g55["<="];
  var make_id = _g55["make-id"];
  var reduce = _g55.reduce;
  var string63 = _g55["string?"];
  var code = _g55.code;
  var to_string = _g55["to-string"];
  var read_file = _g55["read-file"];
  var keep = _g55.keep;
  var split = _g55.split;
  var function63 = _g55["function?"];
  var number63 = _g55["number?"];
  var table63 = _g55["table?"];
  var composite63 = _g55["composite?"];
  var _42 = _g55["*"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g58 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g59 = keys63(_g58);
        if (_g59) {
          return(b[_g59]);
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
      var _g60 = args;
      var k = undefined;
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
        var _g61 = lh;
        var i = 0;
        while ((i < length(_g61))) {
          var x = _g61[i];
          bs = join(bs, bind(x, join(["at", rh, i])));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, join(["sub", rh, length(lh)])));
        }
        var _g62 = lh;
        var k = undefined;
        for (k in _g62) {
          if (isNaN(parseInt(k))) {
            var v = _g62[k];
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
      var _g63 = args;
      var _g64 = 0;
      while ((_g64 < length(_g63))) {
        var arg = _g63[_g64];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g64 = (_g64 + 1);
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
        if ((x === "%function")) {
          var _g52 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g66 = (function () {
            var _g67 = args;
            var _g68 = 0;
            while ((_g68 < length(_g67))) {
              var _g65 = _g67[_g68];
              setenv(_g65, {_stash: true, variable: true});
              _g68 = (_g68 + 1);
            }
            return(join(["%function", map(macroexpand, args)], macroexpand(body)));
          })();
          drop(environment);
          return(_g66);
        } else {
          if (((x === "%local-function") || (x === "%global-function"))) {
            var _g53 = form[0];
            var name = form[1];
            var _g69 = form[2];
            var _g70 = sub(form, 3);
            add(environment, {_scope: true});
            var _g72 = (function () {
              var _g73 = _g69;
              var _g74 = 0;
              while ((_g74 < length(_g73))) {
                var _g71 = _g73[_g74];
                setenv(_g71, {_stash: true, variable: true});
                _g74 = (_g74 + 1);
              }
              return(join([x, name, map(macroexpand, _g69)], macroexpand(_g70)));
            })();
            drop(environment);
            return(_g72);
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
  var quasiexpand;
  var quasiquote_list;
  quasiquote_list = function (form, depth) {
    var xs = [["list"]];
    var _g75 = form;
    var k = undefined;
    for (k in _g75) {
      if (isNaN(parseInt(k))) {
        var v = _g75[k];
        var _g76 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g76;
      }
    }
    var _g77 = form;
    var _g78 = 0;
    while ((_g78 < length(_g77))) {
      var x = _g77[_g78];
      if (quasisplice63(x, depth)) {
        var _g79 = quasiexpand(x[1]);
        add(xs, _g79);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g78 = (_g78 + 1);
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
  var reserved = {"catch": true, "debugger": true, "/": true, "or": true, "this": true, "elseif": true, "function": true, "not": true, "throw": true, ">": true, "var": true, "<=": true, "switch": true, "end": true, "case": true, "in": true, "new": true, "finally": true, "return": true, "false": true, "continue": true, "then": true, "nil": true, "with": true, "<": true, "local": true, "true": true, "repeat": true, "until": true, "else": true, "if": true, "void": true, "instanceof": true, "and": true, "*": true, "while": true, "=": true, "delete": true, "-": true, "typeof": true, "%": true, "for": true, "==": true, "try": true, "do": true, "break": true, "default": true, "+": true, ">=": true};
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
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g84 = module(current_module).export;
    var n = undefined;
    for (n in _g84) {
      if (isNaN(parseInt(n))) {
        var b = _g84[n];
        if (b.variable) {
          add(exports, join(["set", join(["get", m, join(["quote", n])]), n]));
        }
      }
    }
    if (some63(exports)) {
      return(join([join(["%local", m, join(["table"])]), join(["set", join(["get", "nexus", join(["quote", k])]), m])], exports));
    } else {
      return([]);
    }
  }
  function imported(spec) {
    var _g85 = unstash(sublist(arguments, 1));
    var all = _g85.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g86 = module(spec).export;
      var n = undefined;
      for (n in _g86) {
        if (isNaN(parseInt(n))) {
          var b = _g86[n];
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
    var _g87 = t;
    var k = undefined;
    for (k in _g87) {
      if (isNaN(parseInt(k))) {
        var v = _g87[k];
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
    return(join(["%object"], mapo(function (_g54, b) {
      return(join(["table"], quote_binding(b)));
    }, t)));
  }
  function quote_environment(env) {
    return(join(["list"], map(quote_frame, env)));
  }
  function quote_module(m) {
    return(join((function () {
      var _g88 = ["table"];
      _g88.export = quote_frame(m.export);
      _g88.import = quoted(m.import);
      return(_g88);
    })()));
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g89 = {};
  nexus.utilities = _g89;
  _g89["to-id"] = to_id;
  _g89["quoting?"] = quoting63;
  _g89["global?"] = global63;
  _g89["valid-char?"] = valid_char63;
  _g89.exported = exported;
  _g89.indentation = indentation;
  _g89.quasiexpand = quasiexpand;
  _g89["valid-id?"] = valid_id63;
  _g89["stash*"] = stash42;
  _g89["reserved?"] = reserved63;
  _g89.bind = bind;
  _g89.macroexpand = macroexpand;
  _g89["numeric?"] = numeric63;
  _g89["special?"] = special63;
  _g89["bind*"] = bind42;
  _g89["symbol-expansion"] = symbol_expansion;
  _g89["initial-environment"] = initial_environment;
  _g89["macro?"] = macro63;
  _g89.getenv = getenv;
  _g89["quote-module"] = quote_module;
  _g89["quote-frame"] = quote_frame;
  _g89["quote-binding"] = quote_binding;
  _g89.imported = imported;
  _g89.reserved = reserved;
  _g89.escape = escape;
  _g89["quasiquote-list"] = quasiquote_list;
  _g89["quote-environment"] = quote_environment;
  _g89["quasisplice?"] = quasisplice63;
  _g89["can-unquote?"] = can_unquote63;
  _g89["variable?"] = variable63;
  _g89["special-form?"] = special_form63;
  _g89["quasiquoting?"] = quasiquoting63;
  _g89.quoted = quoted;
  _g89["quote-modules"] = quote_modules;
  _g89.mapo = mapo;
  _g89["macro-function"] = macro_function;
  _g89["symbol?"] = symbol63;
  _g89["bound?"] = bound63;
  _g89["toplevel?"] = toplevel63;
})();
(function () {
  var _g90 = nexus.runtime;
  var module_key = _g90["module-key"];
  var exit = _g90.exit;
  var last = _g90.last;
  var substring = _g90.substring;
  var write_file = _g90["write-file"];
  var pairwise = _g90.pairwise;
  var parse_number = _g90["parse-number"];
  var inner = _g90.inner;
  var apply = _g90.apply;
  var find = _g90.find;
  var exclude = _g90.exclude;
  var is63 = _g90["is?"];
  var drop = _g90.drop;
  var atom63 = _g90["atom?"];
  var splice = _g90.splice;
  var empty63 = _g90["empty?"];
  var unstash = _g90.unstash;
  var cat = _g90.cat;
  var id_literal63 = _g90["id-literal?"];
  var iterate = _g90.iterate;
  var _62 = _g90[">"];
  var _61 = _g90["="];
  var length = _g90.length;
  var _60 = _g90["<"];
  var add = _g90.add;
  var search = _g90.search;
  var toplevel63 = _g90["toplevel?"];
  var map = _g90.map;
  var _ = _g90["-"];
  var _47 = _g90["/"];
  var keys63 = _g90["keys?"];
  var _37message_handler = _g90["%message-handler"];
  var replicate = _g90.replicate;
  var _43 = _g90["+"];
  var _37 = _g90["%"];
  var some63 = _g90["some?"];
  var string_literal63 = _g90["string-literal?"];
  var extend = _g90.extend;
  var boolean63 = _g90["boolean?"];
  var stash = _g90.stash;
  var list63 = _g90["list?"];
  var reverse = _g90.reverse;
  var setenv = _g90.setenv;
  var tl = _g90.tl;
  var module = _g90.module;
  var sub = _g90.sub;
  var char = _g90.char;
  var nil63 = _g90["nil?"];
  var write = _g90.write;
  var hd = _g90.hd;
  var join = _g90.join;
  var _6261 = _g90[">="];
  var sublist = _g90.sublist;
  var _6061 = _g90["<="];
  var make_id = _g90["make-id"];
  var reduce = _g90.reduce;
  var string63 = _g90["string?"];
  var code = _g90.code;
  var to_string = _g90["to-string"];
  var read_file = _g90["read-file"];
  var keep = _g90.keep;
  var split = _g90.split;
  var function63 = _g90["function?"];
  var number63 = _g90["number?"];
  var table63 = _g90["table?"];
  var composite63 = _g90["composite?"];
  var _42 = _g90["*"];
  var delimiters = {")": true, "\n": true, "(": true, ";": true};
  var whitespace = {" ": true, "\n": true, "\t": true};
  function make_stream(str) {
    return({string: str, len: length(str), pos: 0});
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
  var _g101 = {};
  nexus.reader = _g101;
  _g101["read-table"] = read_table;
  _g101["skip-non-code"] = skip_non_code;
  _g101["flag?"] = flag63;
  _g101.delimiters = delimiters;
  _g101.eof = eof;
  _g101["key?"] = key63;
  _g101["read-char"] = read_char;
  _g101.whitespace = whitespace;
  _g101["read-all"] = read_all;
  _g101["peek-char"] = peek_char;
  _g101["make-stream"] = make_stream;
  _g101["read-from-string"] = read_from_string;
  _g101.read = read;
})();
(function () {
  var _g102 = nexus.runtime;
  var module_key = _g102["module-key"];
  var exit = _g102.exit;
  var last = _g102.last;
  var substring = _g102.substring;
  var write_file = _g102["write-file"];
  var pairwise = _g102.pairwise;
  var parse_number = _g102["parse-number"];
  var inner = _g102.inner;
  var apply = _g102.apply;
  var find = _g102.find;
  var exclude = _g102.exclude;
  var is63 = _g102["is?"];
  var drop = _g102.drop;
  var atom63 = _g102["atom?"];
  var splice = _g102.splice;
  var empty63 = _g102["empty?"];
  var unstash = _g102.unstash;
  var cat = _g102.cat;
  var id_literal63 = _g102["id-literal?"];
  var iterate = _g102.iterate;
  var _62 = _g102[">"];
  var _61 = _g102["="];
  var length = _g102.length;
  var _60 = _g102["<"];
  var add = _g102.add;
  var search = _g102.search;
  var toplevel63 = _g102["toplevel?"];
  var map = _g102.map;
  var _ = _g102["-"];
  var _47 = _g102["/"];
  var keys63 = _g102["keys?"];
  var _37message_handler = _g102["%message-handler"];
  var replicate = _g102.replicate;
  var _43 = _g102["+"];
  var _37 = _g102["%"];
  var some63 = _g102["some?"];
  var string_literal63 = _g102["string-literal?"];
  var extend = _g102.extend;
  var boolean63 = _g102["boolean?"];
  var stash = _g102.stash;
  var list63 = _g102["list?"];
  var reverse = _g102.reverse;
  var setenv = _g102.setenv;
  var tl = _g102.tl;
  var module = _g102.module;
  var sub = _g102.sub;
  var char = _g102.char;
  var nil63 = _g102["nil?"];
  var write = _g102.write;
  var hd = _g102.hd;
  var join = _g102.join;
  var _6261 = _g102[">="];
  var sublist = _g102.sublist;
  var _6061 = _g102["<="];
  var make_id = _g102["make-id"];
  var reduce = _g102.reduce;
  var string63 = _g102["string?"];
  var code = _g102.code;
  var to_string = _g102["to-string"];
  var read_file = _g102["read-file"];
  var keep = _g102.keep;
  var split = _g102.split;
  var function63 = _g102["function?"];
  var number63 = _g102["number?"];
  var table63 = _g102["table?"];
  var composite63 = _g102["composite?"];
  var _42 = _g102["*"];
  var _g103 = nexus.utilities;
  var to_id = _g103["to-id"];
  var exported = _g103.exported;
  var indentation = _g103.indentation;
  var quasiexpand = _g103.quasiexpand;
  var valid_id63 = _g103["valid-id?"];
  var stash42 = _g103["stash*"];
  var reserved63 = _g103["reserved?"];
  var bind = _g103.bind;
  var macroexpand = _g103.macroexpand;
  var special63 = _g103["special?"];
  var bind42 = _g103["bind*"];
  var symbol_expansion = _g103["symbol-expansion"];
  var initial_environment = _g103["initial-environment"];
  var macro63 = _g103["macro?"];
  var getenv = _g103.getenv;
  var imported = _g103.imported;
  var quote_environment = _g103["quote-environment"];
  var variable63 = _g103["variable?"];
  var special_form63 = _g103["special-form?"];
  var quoted = _g103.quoted;
  var quote_modules = _g103["quote-modules"];
  var mapo = _g103.mapo;
  var macro_function = _g103["macro-function"];
  var symbol63 = _g103["symbol?"];
  var bound63 = _g103["bound?"];
  var toplevel63 = _g103["toplevel?"];
  var _g106 = nexus.reader;
  var read_table = _g106["read-table"];
  var read_all = _g106["read-all"];
  var make_stream = _g106["make-stream"];
  var read_from_string = _g106["read-from-string"];
  var read = _g106.read;
  var infix = {js: {"~=": "!=", "and": "&&", cat: "+", "or": "||", "=": "==="}, lua: {"~=": true, "and": true, cat: "..", "=": "==", "or": true}, common: {">=": true, "-": true, "<=": true, "/": true, "*": true, "<": true, "+": true, "%": true, ">": true}};
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
    var _g107 = args;
    var i = 0;
    while ((i < length(_g107))) {
      var arg = _g107[i];
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
    var _g108 = unstash(sublist(arguments, 1));
    var tail = _g108.tail;
    var str = "";
    var _g109 = forms;
    var i = 0;
    while ((i < length(_g109))) {
      var x = _g109[i];
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
    var _g110 = getenv(hd(form));
    var self_tr63 = _g110.tr;
    var special = _g110.special;
    var stmt = _g110.stmt;
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
  function compile_infix(_g111) {
    var op = _g111[0];
    var args = sub(_g111, 1);
    var str = "(";
    var _g112 = getop(op);
    var _g113 = args;
    var i = 0;
    while ((i < length(_g113))) {
      var arg = _g113[i];
      if (((_g112 === "-") && (length(args) === 1))) {
        str = (str + _g112 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g112 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g114 = unstash(sublist(arguments, 2));
    var name = _g114.name;
    var prefix = _g114.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g115 = (prefix || "");
    var _g116 = compile_args(args);
    var _g117 = (function () {
      indent_level = (indent_level + 1);
      var _g118 = compile_body(body, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g118);
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
      return(("function " + id + _g116 + " {\n" + _g117 + ind + "}" + tr));
    } else {
      return((_g115 + "function " + id + _g116 + "\n" + _g117 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g119 = unstash(sublist(arguments, 1));
    var stmt = _g119.stmt;
    var tail = _g119.tail;
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
        var _g120 = (function () {
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
        return((ind + _g120 + tr));
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
    var _g121 = lower(body);
    var epilog = map(lower, exported());
    return(join([join(["%function", []], join(_g121, epilog))]));
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
    current_module = spec;
    environment = initial_environment();
    var compiled = compile_file(path);
    current_module = mod0;
    environment = env0;
    if (compiling63) {
      compiler_output = (compiler_output + compiled);
    } else {
      return(run(compiled));
    }
  }
  function open_module(spec) {
    var _g122 = unstash(sublist(arguments, 1));
    var all = _g122.all;
    var m = module(spec);
    var frame = last(environment);
    var _g123 = m.export;
    var k = undefined;
    for (k in _g123) {
      if (isNaN(parseInt(k))) {
        var v = _g123[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g124 = unstash(sublist(arguments, 1));
    var all = _g124.all;
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
    return(join(imported(current_module, {_stash: true, all: true}), (function () {
      var m = module(current_module);
      return(map(function (x) {
        return(splice(imported(x)));
      }, m.import));
    })()));
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var _g125 = lower(join(["do"], join(prologue(), [form])));
    var compiled = compile(_g125);
    target = previous;
    return(run(compiled));
  }
  var _g126 = {};
  nexus.compiler = _g126;
  _g126.lower = lower;
  _g126["compile-atom"] = compile_atom;
  _g126["infix?"] = infix63;
  _g126["compile-module"] = compile_module;
  _g126.prologue = prologue;
  _g126["module-path"] = module_path;
  _g126.terminator = terminator;
  _g126["%compile-module"] = _37compile_module;
  _g126.run = run;
  _g126.compile = compile;
  _g126.infix = infix;
  _g126["load-module"] = load_module;
  _g126["compile-function"] = compile_function;
  _g126["compiling?"] = compiling63;
  _g126.eval = eval;
  _g126["compile-body"] = compile_body;
  _g126["compile-call"] = compile_call;
  _g126["compile-file"] = compile_file;
  _g126.encapsulate = encapsulate;
  _g126["can-return?"] = can_return63;
  _g126["compile-infix"] = compile_infix;
  _g126.getop = getop;
  _g126["in-module"] = in_module;
  _g126["compile-special"] = compile_special;
  _g126["compiler-output"] = compiler_output;
  _g126["compile-args"] = compile_args;
  _g126["open-module"] = open_module;
})();
(function () {
  var _g128 = nexus.runtime;
  var module_key = _g128["module-key"];
  var exit = _g128.exit;
  var last = _g128.last;
  var substring = _g128.substring;
  var write_file = _g128["write-file"];
  var pairwise = _g128.pairwise;
  var parse_number = _g128["parse-number"];
  var inner = _g128.inner;
  var apply = _g128.apply;
  var find = _g128.find;
  var exclude = _g128.exclude;
  var is63 = _g128["is?"];
  var drop = _g128.drop;
  var atom63 = _g128["atom?"];
  var splice = _g128.splice;
  var empty63 = _g128["empty?"];
  var unstash = _g128.unstash;
  var cat = _g128.cat;
  var id_literal63 = _g128["id-literal?"];
  var iterate = _g128.iterate;
  var _62 = _g128[">"];
  var _61 = _g128["="];
  var length = _g128.length;
  var _60 = _g128["<"];
  var add = _g128.add;
  var search = _g128.search;
  var toplevel63 = _g128["toplevel?"];
  var map = _g128.map;
  var _ = _g128["-"];
  var _47 = _g128["/"];
  var keys63 = _g128["keys?"];
  var _37message_handler = _g128["%message-handler"];
  var replicate = _g128.replicate;
  var _43 = _g128["+"];
  var _37 = _g128["%"];
  var some63 = _g128["some?"];
  var string_literal63 = _g128["string-literal?"];
  var extend = _g128.extend;
  var boolean63 = _g128["boolean?"];
  var stash = _g128.stash;
  var list63 = _g128["list?"];
  var reverse = _g128.reverse;
  var setenv = _g128.setenv;
  var tl = _g128.tl;
  var module = _g128.module;
  var sub = _g128.sub;
  var char = _g128.char;
  var nil63 = _g128["nil?"];
  var write = _g128.write;
  var hd = _g128.hd;
  var join = _g128.join;
  var _6261 = _g128[">="];
  var sublist = _g128.sublist;
  var _6061 = _g128["<="];
  var make_id = _g128["make-id"];
  var reduce = _g128.reduce;
  var string63 = _g128["string?"];
  var code = _g128.code;
  var to_string = _g128["to-string"];
  var read_file = _g128["read-file"];
  var keep = _g128.keep;
  var split = _g128.split;
  var function63 = _g128["function?"];
  var number63 = _g128["number?"];
  var table63 = _g128["table?"];
  var composite63 = _g128["composite?"];
  var _42 = _g128["*"];
  var _g129 = nexus.utilities;
  var to_id = _g129["to-id"];
  var exported = _g129.exported;
  var indentation = _g129.indentation;
  var quasiexpand = _g129.quasiexpand;
  var valid_id63 = _g129["valid-id?"];
  var stash42 = _g129["stash*"];
  var reserved63 = _g129["reserved?"];
  var bind = _g129.bind;
  var macroexpand = _g129.macroexpand;
  var special63 = _g129["special?"];
  var bind42 = _g129["bind*"];
  var symbol_expansion = _g129["symbol-expansion"];
  var initial_environment = _g129["initial-environment"];
  var macro63 = _g129["macro?"];
  var getenv = _g129.getenv;
  var imported = _g129.imported;
  var quote_environment = _g129["quote-environment"];
  var variable63 = _g129["variable?"];
  var special_form63 = _g129["special-form?"];
  var quoted = _g129.quoted;
  var quote_modules = _g129["quote-modules"];
  var mapo = _g129.mapo;
  var macro_function = _g129["macro-function"];
  var symbol63 = _g129["symbol?"];
  var bound63 = _g129["bound?"];
  var toplevel63 = _g129["toplevel?"];
  var _g132 = nexus.compiler;
  var compile_module = _g132["compile-module"];
  var compile = _g132.compile;
  var load_module = _g132["load-module"];
  var compile_function = _g132["compile-function"];
  var eval = _g132.eval;
  var compile_body = _g132["compile-body"];
  var compile_call = _g132["compile-call"];
  var in_module = _g132["in-module"];
  var compile_special = _g132["compile-special"];
  var open_module = _g132["open-module"];
})();
(function () {
  var _g326 = nexus.runtime;
  var module_key = _g326["module-key"];
  var exit = _g326.exit;
  var last = _g326.last;
  var substring = _g326.substring;
  var write_file = _g326["write-file"];
  var pairwise = _g326.pairwise;
  var parse_number = _g326["parse-number"];
  var inner = _g326.inner;
  var apply = _g326.apply;
  var find = _g326.find;
  var exclude = _g326.exclude;
  var is63 = _g326["is?"];
  var drop = _g326.drop;
  var atom63 = _g326["atom?"];
  var splice = _g326.splice;
  var empty63 = _g326["empty?"];
  var unstash = _g326.unstash;
  var cat = _g326.cat;
  var id_literal63 = _g326["id-literal?"];
  var iterate = _g326.iterate;
  var _62 = _g326[">"];
  var _61 = _g326["="];
  var length = _g326.length;
  var _60 = _g326["<"];
  var add = _g326.add;
  var search = _g326.search;
  var toplevel63 = _g326["toplevel?"];
  var map = _g326.map;
  var _ = _g326["-"];
  var _47 = _g326["/"];
  var keys63 = _g326["keys?"];
  var _37message_handler = _g326["%message-handler"];
  var replicate = _g326.replicate;
  var _43 = _g326["+"];
  var _37 = _g326["%"];
  var some63 = _g326["some?"];
  var string_literal63 = _g326["string-literal?"];
  var extend = _g326.extend;
  var boolean63 = _g326["boolean?"];
  var stash = _g326.stash;
  var list63 = _g326["list?"];
  var reverse = _g326.reverse;
  var setenv = _g326.setenv;
  var tl = _g326.tl;
  var module = _g326.module;
  var sub = _g326.sub;
  var char = _g326.char;
  var nil63 = _g326["nil?"];
  var write = _g326.write;
  var hd = _g326.hd;
  var join = _g326.join;
  var _6261 = _g326[">="];
  var sublist = _g326.sublist;
  var _6061 = _g326["<="];
  var make_id = _g326["make-id"];
  var reduce = _g326.reduce;
  var string63 = _g326["string?"];
  var code = _g326.code;
  var to_string = _g326["to-string"];
  var read_file = _g326["read-file"];
  var keep = _g326.keep;
  var split = _g326.split;
  var function63 = _g326["function?"];
  var number63 = _g326["number?"];
  var table63 = _g326["table?"];
  var composite63 = _g326["composite?"];
  var _42 = _g326["*"];
  var _g327 = nexus.utilities;
  var to_id = _g327["to-id"];
  var exported = _g327.exported;
  var indentation = _g327.indentation;
  var quasiexpand = _g327.quasiexpand;
  var valid_id63 = _g327["valid-id?"];
  var stash42 = _g327["stash*"];
  var reserved63 = _g327["reserved?"];
  var bind = _g327.bind;
  var macroexpand = _g327.macroexpand;
  var special63 = _g327["special?"];
  var bind42 = _g327["bind*"];
  var symbol_expansion = _g327["symbol-expansion"];
  var initial_environment = _g327["initial-environment"];
  var macro63 = _g327["macro?"];
  var getenv = _g327.getenv;
  var imported = _g327.imported;
  var quote_environment = _g327["quote-environment"];
  var variable63 = _g327["variable?"];
  var special_form63 = _g327["special-form?"];
  var quoted = _g327.quoted;
  var quote_modules = _g327["quote-modules"];
  var mapo = _g327.mapo;
  var macro_function = _g327["macro-function"];
  var symbol63 = _g327["symbol?"];
  var bound63 = _g327["bound?"];
  var toplevel63 = _g327["toplevel?"];
  var _g330 = nexus.compiler;
  var compile_module = _g330["compile-module"];
  var compile = _g330.compile;
  var load_module = _g330["load-module"];
  var compile_function = _g330["compile-function"];
  var eval = _g330.eval;
  var compile_body = _g330["compile-body"];
  var compile_call = _g330["compile-call"];
  var in_module = _g330["in-module"];
  var compile_special = _g330["compile-special"];
  var open_module = _g330["open-module"];
  global.target = "js";
})();
(function () {
  var _g615 = nexus.runtime;
  var module_key = _g615["module-key"];
  var exit = _g615.exit;
  var last = _g615.last;
  var substring = _g615.substring;
  var write_file = _g615["write-file"];
  var pairwise = _g615.pairwise;
  var parse_number = _g615["parse-number"];
  var inner = _g615.inner;
  var apply = _g615.apply;
  var find = _g615.find;
  var exclude = _g615.exclude;
  var is63 = _g615["is?"];
  var drop = _g615.drop;
  var atom63 = _g615["atom?"];
  var splice = _g615.splice;
  var empty63 = _g615["empty?"];
  var unstash = _g615.unstash;
  var cat = _g615.cat;
  var id_literal63 = _g615["id-literal?"];
  var iterate = _g615.iterate;
  var _62 = _g615[">"];
  var _61 = _g615["="];
  var length = _g615.length;
  var _60 = _g615["<"];
  var add = _g615.add;
  var search = _g615.search;
  var toplevel63 = _g615["toplevel?"];
  var map = _g615.map;
  var _ = _g615["-"];
  var _47 = _g615["/"];
  var keys63 = _g615["keys?"];
  var _37message_handler = _g615["%message-handler"];
  var replicate = _g615.replicate;
  var _43 = _g615["+"];
  var _37 = _g615["%"];
  var some63 = _g615["some?"];
  var string_literal63 = _g615["string-literal?"];
  var extend = _g615.extend;
  var boolean63 = _g615["boolean?"];
  var stash = _g615.stash;
  var list63 = _g615["list?"];
  var reverse = _g615.reverse;
  var setenv = _g615.setenv;
  var tl = _g615.tl;
  var module = _g615.module;
  var sub = _g615.sub;
  var char = _g615.char;
  var nil63 = _g615["nil?"];
  var write = _g615.write;
  var hd = _g615.hd;
  var join = _g615.join;
  var _6261 = _g615[">="];
  var sublist = _g615.sublist;
  var _6061 = _g615["<="];
  var make_id = _g615["make-id"];
  var reduce = _g615.reduce;
  var string63 = _g615["string?"];
  var code = _g615.code;
  var to_string = _g615["to-string"];
  var read_file = _g615["read-file"];
  var keep = _g615.keep;
  var split = _g615.split;
  var function63 = _g615["function?"];
  var number63 = _g615["number?"];
  var table63 = _g615["table?"];
  var composite63 = _g615["composite?"];
  var _42 = _g615["*"];
  var _g616 = nexus.utilities;
  var to_id = _g616["to-id"];
  var exported = _g616.exported;
  var indentation = _g616.indentation;
  var quasiexpand = _g616.quasiexpand;
  var valid_id63 = _g616["valid-id?"];
  var stash42 = _g616["stash*"];
  var reserved63 = _g616["reserved?"];
  var bind = _g616.bind;
  var macroexpand = _g616.macroexpand;
  var special63 = _g616["special?"];
  var bind42 = _g616["bind*"];
  var symbol_expansion = _g616["symbol-expansion"];
  var initial_environment = _g616["initial-environment"];
  var macro63 = _g616["macro?"];
  var getenv = _g616.getenv;
  var imported = _g616.imported;
  var quote_environment = _g616["quote-environment"];
  var variable63 = _g616["variable?"];
  var special_form63 = _g616["special-form?"];
  var quoted = _g616.quoted;
  var quote_modules = _g616["quote-modules"];
  var mapo = _g616.mapo;
  var macro_function = _g616["macro-function"];
  var symbol63 = _g616["symbol?"];
  var bound63 = _g616["bound?"];
  var toplevel63 = _g616["toplevel?"];
  var _g619 = nexus.compiler;
  var compile_module = _g619["compile-module"];
  var compile = _g619.compile;
  var load_module = _g619["load-module"];
  var compile_function = _g619["compile-function"];
  var eval = _g619.eval;
  var compile_body = _g619["compile-body"];
  var compile_call = _g619["compile-call"];
  var in_module = _g619["in-module"];
  var compile_special = _g619["compile-special"];
  var open_module = _g619["open-module"];
  global.modules = {lib: {export: {}, import: ["core", "special"]}, runtime: {export: {"module-key": {export: true, variable: true}, exit: {export: true, variable: true}, last: {export: true, variable: true}, substring: {export: true, variable: true}, "write-file": {export: true, variable: true}, "id-count": {variable: true}, pairwise: {export: true, variable: true}, "parse-number": {export: true, variable: true}, inner: {export: true, variable: true}, apply: {export: true, variable: true}, find: {export: true, variable: true}, exclude: {export: true, variable: true}, "is?": {export: true, variable: true}, drop: {export: true, variable: true}, "atom?": {export: true, variable: true}, splice: {export: true, variable: true}, "empty?": {export: true, variable: true}, unstash: {export: true, variable: true}, type: {variable: true}, cat: {export: true, variable: true}, "id-literal?": {export: true, variable: true}, iterate: {export: true, variable: true}, ">": {export: true, variable: true}, "=": {export: true, variable: true}, length: {export: true, variable: true}, "splice?": {variable: true}, "<": {export: true, variable: true}, add: {export: true, variable: true}, search: {export: true, variable: true}, "toplevel?": {export: true, variable: true}, map: {export: true, variable: true}, "-": {export: true, variable: true}, "/": {export: true, variable: true}, "keys?": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, replicate: {export: true, variable: true}, "+": {export: true, variable: true}, "%": {export: true, variable: true}, "some?": {export: true, variable: true}, "string-literal?": {export: true, variable: true}, extend: {export: true, variable: true}, "boolean?": {export: true, variable: true}, stash: {export: true, variable: true}, "list?": {export: true, variable: true}, mapl: {variable: true}, reverse: {export: true, variable: true}, print: {global: true, export: true}, fs: {variable: true}, require: {global: true, export: true}, setenv: {export: true, variable: true}, tl: {export: true, variable: true}, module: {export: true, variable: true}, sub: {export: true, variable: true}, char: {export: true, variable: true}, "nil?": {export: true, variable: true}, write: {export: true, variable: true}, hd: {export: true, variable: true}, join: {export: true, variable: true}, ">=": {export: true, variable: true}, sublist: {export: true, variable: true}, "<=": {export: true, variable: true}, "make-id": {export: true, variable: true}, reduce: {export: true, variable: true}, "string?": {export: true, variable: true}, code: {export: true, variable: true}, "to-string": {export: true, variable: true}, "read-file": {export: true, variable: true}, keep: {export: true, variable: true}, split: {export: true, variable: true}, "function?": {export: true, variable: true}, "number?": {export: true, variable: true}, "table?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "*": {export: true, variable: true}}, import: ["special", "core"]}, optimizer: {export: {"define-optimization": {}, optimizations: {variable: true}, optimize: {variable: true, export: true}}, import: ["runtime", "special", "core"]}, utilities: {export: {"to-id": {export: true, variable: true}, "quoting?": {variable: true}, "global?": {variable: true}, "valid-char?": {variable: true}, exported: {export: true, variable: true}, indentation: {export: true, variable: true}, quasiexpand: {export: true, variable: true}, "indent-level": {global: true, export: true}, "valid-id?": {export: true, variable: true}, "stash*": {export: true, variable: true}, "reserved?": {export: true, variable: true}, bind: {export: true, variable: true}, macroexpand: {export: true, variable: true}, "numeric?": {variable: true}, "special?": {export: true, variable: true}, "bind*": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "macro?": {export: true, variable: true}, getenv: {export: true, variable: true}, "quote-module": {variable: true}, "quote-frame": {variable: true}, "quote-binding": {variable: true}, imported: {export: true, variable: true}, reserved: {variable: true}, escape: {variable: true}, "quasiquote-list": {variable: true}, "quote-environment": {export: true, variable: true}, "quasisplice?": {variable: true}, "can-unquote?": {variable: true}, "variable?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "quasiquoting?": {variable: true}, quoted: {export: true, variable: true}, "quote-modules": {export: true, variable: true}, mapo: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "bound?": {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(join(["do", join(["inc", "indent-level"]), join(["let", join([result, form]), join(["dec", "indent-level"]), result])]));
  }}, "toplevel?": {export: true, variable: true}}, import: ["runtime", "special", "core"]}, special: {export: {"return": {export: true, special: function (_g632) {
    var x = _g632[0];
    var _g633 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(join(["return", x])));
      }
    })();
    return((indentation() + _g633));
  }, stmt: true}, "get": {export: true, special: function (_g634) {
    var t = _g634[0];
    var k = _g634[1];
    var _g635 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g635, 0) === "{"))) {
      _g635 = ("(" + _g635 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g635 + "." + inner(k)));
    } else {
      return((_g635 + "[" + k1 + "]"));
    }
  }}, "%for": {export: true, special: function (_g636) {
    var t = _g636[0];
    var k = _g636[1];
    var body = sub(_g636, 2);
    var _g637 = compile(t);
    var ind = indentation();
    var _g638 = (function () {
      indent_level = (indent_level + 1);
      var _g639 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g639);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g637 + " do\n" + _g638 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g637 + ") {\n" + _g638 + ind + "}\n"));
    }
  }, tr: true, stmt: true}, "%try": {export: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g640 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g640);
    })();
    var e = make_id();
    var handler = join(["return", join(["%array", false, join(["get", e, "\"message\""])])]);
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g641 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g641);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true, stmt: true}, "%if": {export: true, special: function (_g642, tail63) {
    var x = _g642[0];
    var _g643 = _g642[1];
    var _g644 = _g642[2];
    var _g645 = compile(x);
    var _g646 = (function () {
      indent_level = (indent_level + 1);
      var _g648 = compile(_g643, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g648);
    })();
    var _g647 = (function () {
      if (_g644) {
        indent_level = (indent_level + 1);
        var _g649 = compile(_g644, {_stash: true, stmt: true, tail: tail63});
        indent_level = (indent_level - 1);
        return(_g649);
      }
    })();
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g645 + ") {\n" + _g646 + ind + "}");
    } else {
      str = (str + ind + "if " + _g645 + " then\n" + _g646);
    }
    if ((_g647 && (target === "js"))) {
      str = (str + " else {\n" + _g647 + ind + "}");
    } else {
      if (_g647) {
        str = (str + ind + "else\n" + _g647);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, tr: true, stmt: true}, "not": {export: true, special: function (_g650) {
    var x = _g650[0];
    var _g651 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g651 + ")"));
  }}, "while": {export: true, special: function (_g652) {
    var condition = _g652[0];
    var body = sub(_g652, 1);
    var _g653 = compile(condition);
    var _g654 = (function () {
      indent_level = (indent_level + 1);
      var _g655 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g655);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g653 + ") {\n" + _g654 + ind + "}\n"));
    } else {
      return((ind + "while " + _g653 + " do\n" + _g654 + ind + "end\n"));
    }
  }, tr: true, stmt: true}, "%local-function": {export: true, special: function (_g656) {
    var name = _g656[0];
    var args = _g656[1];
    var body = sub(_g656, 2);
    var x = compile_function(args, body, {_stash: true, prefix: "local ", name: name});
    return((indentation() + x));
  }, tr: true, stmt: true}, "error": {export: true, special: function (_g657) {
    var x = _g657[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(join(["Error", x]))));
      } else {
        return(compile_call(join(["error", x])));
      }
    })();
    return((indentation() + e));
  }, stmt: true}, "set": {export: true, special: function (_g658) {
    var lh = _g658[0];
    var rh = _g658[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }, stmt: true}, "break": {export: true, special: function (_g127) {
    return((indentation() + "break"));
  }, stmt: true}, "%function": {export: true, special: function (_g659) {
    var args = _g659[0];
    var body = sub(_g659, 1);
    return(compile_function(args, body));
  }}, "%global-function": {export: true, special: function (_g660) {
    var name = _g660[0];
    var args = _g660[1];
    var body = sub(_g660, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(join(["set", name, join(["%function", args], body)]), {_stash: true, stmt: true}));
    }
  }, tr: true, stmt: true}, "do": {export: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, tr: true, stmt: true}, "%local": {export: true, special: function (_g661) {
    var name = _g661[0];
    var value = _g661[1];
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
  }, stmt: true}, "%array": {export: true, special: function (forms) {
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
    var _g662 = forms;
    var i = 0;
    while ((i < length(_g662))) {
      var x = _g662[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }}, "%object": {export: true, special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g663 = pairs;
    var i = 0;
    while ((i < length(_g663))) {
      var _g664 = _g663[i];
      var k = _g664[0];
      var v = _g664[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g665 = compile(v);
      var _g666 = (function () {
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
      str = (str + _g666 + sep + _g665);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, core: {export: {"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g667 = sub(body, 0);
    var imports = [];
    var exp = _g667.export;
    var imp = _g667.import;
    var _g668 = (imp || []);
    var _g669 = 0;
    while ((_g669 < length(_g668))) {
      var k = _g668[_g669];
      load_module(k);
      imports = join(imports, imported(k));
      _g669 = (_g669 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g670 = (exp || []);
    var _g671 = 0;
    while ((_g671 < length(_g670))) {
      var k = _g670[_g671];
      setenv(k, {_stash: true, export: true});
      _g671 = (_g671 + 1);
    }
    return(join(["do"], imports));
  }}, list: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g672 = body;
      var k = undefined;
      for (k in _g672) {
        if (isNaN(parseInt(k))) {
          var v = _g672[k];
          add(init, join(["set", join(["get", id, join(["quote", k])]), v]));
        }
      }
      return(join(["let", join([id, l])], join(init, [id])));
    }
  }}, quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = join(["+", i, 1]);
      }
    }
    return(join(["get", l, i]));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g673 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g674) {
      var lh = _g674[0];
      var rh = _g674[1];
      var _g675 = bind(lh, rh);
      var _g676 = 0;
      while ((_g676 < length(_g675))) {
        var _g677 = _g675[_g676];
        var id = _g677[0];
        var val = _g677[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, join(["%local", id, val]));
        _g676 = (_g676 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g673)])));
  }}, "if": {export: true, macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g678) {
      var a = _g678[0];
      var b = _g678[1];
      var c = sub(_g678, 2);
      if (is63(b)) {
        return(join([join(["%if", a, b], step(c))]));
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }}, "with-bindings": {export: true, macro: function (_g679) {
    var names = _g679[0];
    var body = unstash(sublist(arguments, 1));
    var _g680 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g681 = ["with-frame", join(["each", join([x]), names, join((function () {
        var _g682 = ["setenv", x];
        _g682.variable = true;
        return(_g682);
      })())])];
      _g681.scope = true;
      return(_g681);
    })(), _g680));
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g683 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (!(empty63(_g683))) {
      var _g684 = bind42(x, _g683);
      var args = _g684[0];
      var _g685 = _g684[1];
      return(join(["%global-function", name, args], _g685));
    } else {
      if ((target === "js")) {
        return(join(["set", join(["get", "global", join(["quote", to_id(name)])]), x]));
      } else {
        return(join(["set", name, x]));
      }
    }
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g686 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (!(empty63(_g686))) {
      var _g687 = bind42(x, _g686);
      var args = _g687[0];
      var _g688 = _g687[1];
      return(join(["%local-function", name, args], _g688));
    } else {
      return(join(["%local", name, x]));
    }
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g689 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(join(["do", join(["add", "environment", join((function () {
      var _g690 = ["table"];
      _g690._scope = scope;
      return(_g690);
    })())]), join(["let", join([x, join(["do"], _g689)]), join(["drop", "environment"]), x])]));
  }}, target: {export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, global: true}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g691 = sub(body, 0);
    var form = join(["fn", args], _g691);
    var keys = sub(_g691, length(_g691));
    eval(join((function () {
      var _g692 = ["setenv", join(["quote", name])];
      _g692.form = join(["quote", form]);
      _g692.special = form;
      return(_g692);
    })(), keys));
    return(undefined);
  }}, "let-macro": {export: true, macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g693 = sub(body, 0);
    add(environment, {});
    var _g694 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g693)));
    })();
    drop(environment);
    return(_g694);
  }}, inc: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["+", n, (by || 1)])]));
  }}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if ((length(xs) === 1)) {
      return(join(["join"], xs));
    } else {
      return(reduce(function (a, b) {
        return(["join", a, b]);
      }, xs));
    }
  }}, dec: {export: true, macro: function (n, by) {
    return(join(["set", n, join(["-", n, (by || 1)])]));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g695 = sub(body, 0);
    var form = join(["fn", args], _g695);
    eval(join((function () {
      var _g696 = ["setenv", join(["quote", name])];
      _g696.macro = form;
      _g696.form = join(["quote", form]);
      return(_g696);
    })()));
    return(undefined);
  }}, "list*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    if (empty63(xs)) {
      return([]);
    } else {
      var l = [];
      var _g697 = xs;
      var i = 0;
      while ((i < length(_g697))) {
        var x = _g697[i];
        if ((i === (length(xs) - 1))) {
          l = ["join", join(["list"], l), x];
        } else {
          add(l, x);
        }
        i = (i + 1);
      }
      return(l);
    }
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g698 = sub(bs, 0);
    return(join(["set", a, join(["join*", a], _g698)]));
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g699 = sub(bs, 0);
    return(join(["set", a, join(["cat", a], _g699)]));
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g700 = map(function (x) {
      return(splice(join([join(["to-string", x]), "\" \""])));
    }, xs);
    return(join(["print", join(["cat"], _g700)]));
  }}, language: {export: true, macro: function () {
    return(join(["quote", target]));
  }}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g325, x) {
      return(x);
    }, body)));
  }}, guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return(join([join(["fn", [], join(["%try", join(["list", true, expr])])])]));
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(join(["let", join([ex, join(["xpcall", join(["fn", [], expr]), "%message-handler"])]), join(["list", e, x])]));
    }
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g701 = sub(body, 0);
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
        return(join(["let", join([i, 0]), join(["while", join(["<", i, join(["length", t1])]), join(["let", join([k, join(["at", t1, i])])], _g701), join(["inc", i])])]));
      } else {
        return(join(["let", join([k, "nil"]), join(["%for", t1, k, join(["if", join((function () {
          var _g702 = ["target"];
          _g702.lua = join(["not", join(["number?", k])]);
          _g702.js = join(["isNaN", join(["parseInt", k])]);
          return(_g702);
        })()), join(["let", join([v, join(["get", t1, k])])], _g701)])])]));
      }
    })()]));
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g703 = sub(body, 0);
    var _g704 = bind42(args, _g703);
    var _g705 = _g704[0];
    var _g706 = _g704[1];
    return(join(["%function", _g705], _g706));
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g707 = sub(body, 0);
    add(environment, {});
    var _g708 = (function () {
      map(function (_g709) {
        var name = _g709[0];
        var exp = _g709[1];
        return(macroexpand(join(["define-symbol", name, exp])));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g707)));
    })();
    drop(environment);
    return(_g708);
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g710 = elements;
    var _g711 = 0;
    while ((_g711 < length(_g710))) {
      var e = _g710[_g711];
      l[e] = true;
      _g711 = (_g711 + 1);
    }
    return(join(["table"], l));
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, system: {export: {nexus: {global: true, export: true}}, import: ["special", "core"]}, compiler: {export: {lower: {variable: true}, "compile-atom": {variable: true}, "infix?": {variable: true}, "compile-module": {export: true, variable: true}, prologue: {variable: true}, "module-path": {variable: true}, terminator: {variable: true}, "%compile-module": {variable: true}, run: {variable: true}, compile: {export: true, variable: true}, infix: {variable: true}, "load-module": {export: true, variable: true}, "compile-function": {export: true, variable: true}, "compiling?": {variable: true}, eval: {export: true, variable: true}, "compile-body": {export: true, variable: true}, "compile-call": {export: true, variable: true}, "compile-file": {variable: true}, encapsulate: {variable: true}, "can-return?": {variable: true}, "current-module": {global: true, export: true}, "compile-infix": {variable: true}, getop: {variable: true}, "in-module": {export: true, variable: true}, "compile-special": {export: true, variable: true}, "compiler-output": {variable: true}, "compile-args": {variable: true}, "open-module": {export: true, variable: true}}, import: ["runtime", "utilities", "special", "core", "reader"]}, main: {export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g712 = sub(specs, 0);
    map(compile_module, _g712);
    return(undefined);
  }}}, import: ["runtime", "special", "core", "reader", "compiler"]}, reader: {export: {"read-table": {export: true, variable: true}, "skip-non-code": {variable: true}, "flag?": {variable: true}, delimiters: {variable: true}, eof: {variable: true}, "key?": {variable: true}, "read-char": {variable: true}, whitespace: {variable: true}, "read-all": {export: true, variable: true}, "peek-char": {variable: true}, "define-reader": {export: true, macro: function (_g713) {
    var char = _g713[0];
    var stream = _g713[1];
    var body = unstash(sublist(arguments, 1));
    var _g714 = sub(body, 0);
    return(join(["set", join(["get", "read-table", char]), join(["fn", join([stream])], _g714)]));
  }}, "make-stream": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, read: {export: true, variable: true}}, import: ["runtime", "special", "core"]}, boot: {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, modules: {global: true, export: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g715 = sub(body, 0);
    var imports = [];
    var exp = _g715.export;
    var imp = _g715.import;
    var _g716 = (imp || []);
    var _g717 = 0;
    while ((_g717 < length(_g716))) {
      var k = _g716[_g717];
      load_module(k);
      imports = join(imports, imported(k));
      _g717 = (_g717 + 1);
    }
    modules[module_key(spec)] = {export: {}, import: imp};
    var _g718 = (exp || []);
    var _g719 = 0;
    while ((_g719 < length(_g718))) {
      var k = _g718[_g719];
      setenv(k, {_stash: true, export: true});
      _g719 = (_g719 + 1);
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var module_key = _g2["module-key"];
  var exit = _g2.exit;
  var last = _g2.last;
  var substring = _g2.substring;
  var write_file = _g2["write-file"];
  var pairwise = _g2.pairwise;
  var parse_number = _g2["parse-number"];
  var inner = _g2.inner;
  var reduce = _g2.reduce;
  var find = _g2.find;
  var exclude = _g2.exclude;
  var is63 = _g2["is?"];
  var drop = _g2.drop;
  var atom63 = _g2["atom?"];
  var splice = _g2.splice;
  var empty63 = _g2["empty?"];
  var function63 = _g2["function?"];
  var cat = _g2.cat;
  var number63 = _g2["number?"];
  var iterate = _g2.iterate;
  var _62 = _g2[">"];
  var _61 = _g2["="];
  var length = _g2.length;
  var _60 = _g2["<"];
  var add = _g2.add;
  var search = _g2.search;
  var toplevel63 = _g2["toplevel?"];
  var map = _g2.map;
  var char = _g2.char;
  var _47 = _g2["/"];
  var keys63 = _g2["keys?"];
  var _37message_handler = _g2["%message-handler"];
  var replicate = _g2.replicate;
  var _43 = _g2["+"];
  var sublist = _g2.sublist;
  var some63 = _g2["some?"];
  var string_literal63 = _g2["string-literal?"];
  var extend = _g2.extend;
  var boolean63 = _g2["boolean?"];
  var stash = _g2.stash;
  var list63 = _g2["list?"];
  var reverse = _g2.reverse;
  var setenv = _g2.setenv;
  var tl = _g2.tl;
  var module = _g2.module;
  var sub = _g2.sub;
  var make_id = _g2["make-id"];
  var apply = _g2.apply;
  var write = _g2.write;
  var hd = _g2.hd;
  var to_string = _g2["to-string"];
  var _6261 = _g2[">="];
  var read_file = _g2["read-file"];
  var _6061 = _g2["<="];
  var _37 = _g2["%"];
  var _42 = _g2["*"];
  var string63 = _g2["string?"];
  var _ = _g2["-"];
  var join = _g2.join;
  var unstash = _g2.unstash;
  var keep = _g2.keep;
  var split = _g2.split;
  var id_literal63 = _g2["id-literal?"];
  var code = _g2.code;
  var table63 = _g2["table?"];
  var nil63 = _g2["nil?"];
  var composite63 = _g2["composite?"];
  var _g5 = nexus.reader;
  var read_table = _g5["read-table"];
  var make_stream = _g5["make-stream"];
  var read_from_string = _g5["read-from-string"];
  var read_all = _g5["read-all"];
  var read = _g5.read;
  var _g6 = nexus.compiler;
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  var compile = _g6.compile;
  var load_module = _g6["load-module"];
  var compile_function = _g6["compile-function"];
  var eval = _g6.eval;
  var compile_body = _g6["compile-body"];
  var compile_call = _g6["compile-call"];
  var compile_special = _g6["compile-special"];
  var open_module = _g6["open-module"];
  function rep(str) {
    var _g721 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g724) {
        return([false, _g724.message]);
      }
    })();
    var _g1 = _g721[0];
    var x = _g721[1];
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
    var _g722 = args;
    var i = 0;
    while ((i < length(_g722))) {
      var arg = _g722[i];
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
  var _g723 = {};
  nexus.main = _g723;
  _g723.rep = rep;
  _g723.usage = usage;
  _g723.main = main;
  _g723.repl = repl;
})();
