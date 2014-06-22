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
    return((x.length || 0));
  }
  function none63(x) {
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
    var l1 = sub(l, length(l));
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
    if (none63(x)) {
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
    return({_splice: true, value: x});
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
    var k63 = false;
    var _g34 = t;
    var k = undefined;
    for (k in _g34) {
      if (isNaN(parseInt(k))) {
        var v = _g34[k];
        k63 = true;
        break;
      }
    }
    return(k63);
  }
  function empty63(t) {
    return((none63(t) && !(keys63(t))));
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
    if (none63(args)) {
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
    if (none63(_g40)) {
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
  _g51["id-count"] = id_count;
  _g51["-"] = _;
  _g51["*"] = _42;
  _g51["+"] = _43;
  _g51["none?"] = none63;
  _g51["/"] = _47;
  _g51["%"] = _37;
  _g51["atom?"] = atom63;
  _g51.exclude = exclude;
  _g51.reduce = reduce;
  _g51.split = split;
  _g51["write-file"] = write_file;
  _g51["keys?"] = keys63;
  _g51["splice?"] = splice63;
  _g51.search = search;
  _g51.length = length;
  _g51.stash = stash;
  _g51["some?"] = some63;
  _g51.replicate = replicate;
  _g51.splice = splice;
  _g51["to-string"] = to_string;
  _g51.find = find;
  _g51.extend = extend;
  _g51["id-literal?"] = id_literal63;
  _g51[">="] = _6261;
  _g51["<="] = _6061;
  _g51["is?"] = is63;
  _g51.iterate = iterate;
  _g51.add = add;
  _g51.substring = substring;
  _g51.write = write;
  _g51["string?"] = string63;
  _g51.code = code;
  _g51.fs = fs;
  _g51.sub = sub;
  _g51["toplevel?"] = toplevel63;
  _g51["table?"] = table63;
  _g51.pairwise = pairwise;
  _g51.map = map;
  _g51["function?"] = function63;
  _g51.mapl = mapl;
  _g51.type = type;
  _g51.setenv = setenv;
  _g51.apply = apply;
  _g51["read-file"] = read_file;
  _g51["%message-handler"] = _37message_handler;
  _g51["nil?"] = nil63;
  _g51.last = last;
  _g51["empty?"] = empty63;
  _g51.sublist = sublist;
  _g51.unstash = unstash;
  _g51.module = module;
  _g51.keep = keep;
  _g51["boolean?"] = boolean63;
  _g51.exit = exit;
  _g51.hd = hd;
  _g51.tl = tl;
  _g51.reverse = reverse;
  _g51["="] = _61;
  _g51.char = char;
  _g51["module-key"] = module_key;
  _g51["number?"] = number63;
  _g51.inner = inner;
  _g51[">"] = _62;
  _g51["<"] = _60;
  _g51["list?"] = list63;
  _g51["composite?"] = composite63;
  _g51.cat = cat;
  _g51["make-id"] = make_id;
  _g51.join = join;
  _g51.drop = drop;
  _g51["string-literal?"] = string_literal63;
  _g51["parse-number"] = parse_number;
})();
(function () {
  var _g56 = nexus.runtime;
  var _ = _g56["-"];
  var _42 = _g56["*"];
  var _43 = _g56["+"];
  var none63 = _g56["none?"];
  var _47 = _g56["/"];
  var _37 = _g56["%"];
  var atom63 = _g56["atom?"];
  var exclude = _g56.exclude;
  var reduce = _g56.reduce;
  var split = _g56.split;
  var write_file = _g56["write-file"];
  var keys63 = _g56["keys?"];
  var search = _g56.search;
  var length = _g56.length;
  var stash = _g56.stash;
  var some63 = _g56["some?"];
  var replicate = _g56.replicate;
  var splice = _g56.splice;
  var to_string = _g56["to-string"];
  var find = _g56.find;
  var extend = _g56.extend;
  var id_literal63 = _g56["id-literal?"];
  var _6261 = _g56[">="];
  var _6061 = _g56["<="];
  var is63 = _g56["is?"];
  var iterate = _g56.iterate;
  var add = _g56.add;
  var substring = _g56.substring;
  var write = _g56.write;
  var string63 = _g56["string?"];
  var code = _g56.code;
  var sub = _g56.sub;
  var toplevel63 = _g56["toplevel?"];
  var table63 = _g56["table?"];
  var pairwise = _g56.pairwise;
  var map = _g56.map;
  var function63 = _g56["function?"];
  var setenv = _g56.setenv;
  var apply = _g56.apply;
  var read_file = _g56["read-file"];
  var _37message_handler = _g56["%message-handler"];
  var nil63 = _g56["nil?"];
  var last = _g56.last;
  var empty63 = _g56["empty?"];
  var sublist = _g56.sublist;
  var unstash = _g56.unstash;
  var module = _g56.module;
  var keep = _g56.keep;
  var boolean63 = _g56["boolean?"];
  var exit = _g56.exit;
  var hd = _g56.hd;
  var tl = _g56.tl;
  var reverse = _g56.reverse;
  var _61 = _g56["="];
  var char = _g56.char;
  var module_key = _g56["module-key"];
  var number63 = _g56["number?"];
  var inner = _g56.inner;
  var _62 = _g56[">"];
  var _60 = _g56["<"];
  var list63 = _g56["list?"];
  var composite63 = _g56["composite?"];
  var cat = _g56.cat;
  var make_id = _g56["make-id"];
  var join = _g56.join;
  var drop = _g56.drop;
  var string_literal63 = _g56["string-literal?"];
  var parse_number = _g56["parse-number"];
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g59 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g60 = undefined;
        var _g61 = _g59;
        var x = undefined;
        for (x in _g61) {
          if (isNaN(parseInt(x))) {
            var _g52 = _g61[x];
            _g60 = x;
          }
        }
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
      var _g62 = args;
      var k = undefined;
      for (k in _g62) {
        if (isNaN(parseInt(k))) {
          var v = _g62[k];
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
      return(join([[id, rh]], bind(lh, id)));
    } else {
      if (atom63(lh)) {
        return([[lh, rh]]);
      } else {
        var bs = [];
        var r = lh.rest;
        var _g63 = lh;
        var i = 0;
        while ((i < length(_g63))) {
          var x = _g63[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g64 = lh;
        var k = undefined;
        for (k in _g64) {
          if (isNaN(parseInt(k))) {
            var v = _g64[k];
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
    }
  }
  function bind42(args, body) {
    var args1 = [];
    function rest() {
      if ((target === "js")) {
        return(["unstash", ["sublist", "arguments", length(args1)]]);
      } else {
        add(args1, "|...|");
        return(["unstash", ["list", "|...|"]]);
      }
    }
    if (atom63(args)) {
      return([args1, [join(["let", [args, rest()]], body)]]);
    } else {
      var bs = [];
      var r = (args.rest || (keys63(args) && make_id()));
      var _g65 = args;
      var _g66 = 0;
      while ((_g66 < length(_g65))) {
        var arg = _g65[_g66];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g66 = (_g66 + 1);
      }
      if (r) {
        bs = join(bs, [r, rest()]);
      }
      if (keys63(args)) {
        bs = join(bs, [sub(args, length(args)), r]);
      }
      if (none63(bs)) {
        return([args1, body]);
      } else {
        return([args1, [join(["let", bs], body)]]);
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
          var _g53 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g68 = (function () {
            var _g69 = args;
            var _g70 = 0;
            while ((_g70 < length(_g69))) {
              var _g67 = _g69[_g70];
              setenv(_g67, {_stash: true, variable: true});
              _g70 = (_g70 + 1);
            }
            return(join(["%function", map(macroexpand, args)], macroexpand(body)));
          })();
          drop(environment);
          return(_g68);
        } else {
          if (((x === "%local-function") || (x === "%global-function"))) {
            var _g54 = form[0];
            var name = form[1];
            var _g71 = form[2];
            var _g72 = sub(form, 3);
            add(environment, {_scope: true});
            var _g74 = (function () {
              var _g75 = _g71;
              var _g76 = 0;
              while ((_g76 < length(_g75))) {
                var _g73 = _g75[_g76];
                setenv(_g73, {_stash: true, variable: true});
                _g76 = (_g76 + 1);
              }
              return(join([x, name, map(macroexpand, _g71)], macroexpand(_g72)));
            })();
            drop(environment);
            return(_g74);
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
    var _g77 = form;
    var k = undefined;
    for (k in _g77) {
      if (isNaN(parseInt(k))) {
        var v = _g77[k];
        var _g78 = (function () {
          if (quasisplice63(v, depth)) {
            return(quasiexpand(v[1]));
          } else {
            return(quasiexpand(v, depth));
          }
        })();
        last(xs)[k] = _g78;
      }
    }
    var _g79 = form;
    var _g80 = 0;
    while ((_g80 < length(_g79))) {
      var x = _g79[_g80];
      if (quasisplice63(x, depth)) {
        var _g81 = quasiexpand(x[1]);
        add(xs, _g81);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g80 = (_g80 + 1);
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
  var reserved = {"do": true, "void": true, "=": true, "this": true, "end": true, "new": true, "default": true, "true": true, "/": true, "break": true, "false": true, ">=": true, "then": true, "<=": true, "function": true, "%": true, "not": true, "else": true, "elseif": true, "while": true, "nil": true, "catch": true, "<": true, "typeof": true, "finally": true, "-": true, "and": true, "delete": true, "var": true, "until": true, "repeat": true, "instanceof": true, "try": true, ">": true, "with": true, "or": true, "local": true, "throw": true, "==": true, "in": true, "return": true, "debugger": true, "+": true, "case": true, "*": true, "switch": true, "for": true, "continue": true, "if": true};
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
    if (none63(id)) {
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
    var _g86 = module(current_module).export;
    var n = undefined;
    for (n in _g86) {
      if (isNaN(parseInt(n))) {
        var b = _g86[n];
        if (b.variable) {
          add(exports, ["set", ["get", m, ["quote", n]], n]);
        }
      }
    }
    if (some63(exports)) {
      return(join([["%local", m, ["table"]], ["set", ["get", "nexus", ["quote", k]], m]], exports));
    } else {
      return([]);
    }
  }
  function imported(spec) {
    var _g87 = unstash(sublist(arguments, 1));
    var all = _g87.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g88 = module(spec).export;
      var n = undefined;
      for (n in _g88) {
        if (isNaN(parseInt(n))) {
          var b = _g88[n];
          if ((b.variable && (all || b.export))) {
            add(imports, ["%local", n, ["get", m, ["quote", n]]]);
          }
        }
      }
    }
    if (some63(imports)) {
      return(join([["%local", m, ["get", "nexus", ["quote", k]]]], imports));
    }
  }
  function quote_binding(b) {
    if (is63(b.symbol)) {
      return(extend(b, {_stash: true, symbol: ["quote", b.symbol]}));
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
    var _g89 = t;
    var k = undefined;
    for (k in _g89) {
      if (isNaN(parseInt(k))) {
        var v = _g89[k];
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
    var _g90 = ["table"];
    _g90.import = quoted(m.import);
    _g90.export = quote_frame(m.export);
    return(_g90);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g91 = {};
  nexus.utilities = _g91;
  _g91.escape = escape;
  _g91["toplevel?"] = toplevel63;
  _g91["quote-modules"] = quote_modules;
  _g91["macro-function"] = macro_function;
  _g91.getenv = getenv;
  _g91["stash*"] = stash42;
  _g91.imported = imported;
  _g91["quote-environment"] = quote_environment;
  _g91["quoting?"] = quoting63;
  _g91["valid-id?"] = valid_id63;
  _g91["numeric?"] = numeric63;
  _g91["macro?"] = macro63;
  _g91["reserved?"] = reserved63;
  _g91.reserved = reserved;
  _g91["initial-environment"] = initial_environment;
  _g91.bind = bind;
  _g91["special?"] = special63;
  _g91["to-id"] = to_id;
  _g91["global?"] = global63;
  _g91["quote-binding"] = quote_binding;
  _g91.exported = exported;
  _g91["bound?"] = bound63;
  _g91.quasiexpand = quasiexpand;
  _g91["bind*"] = bind42;
  _g91["symbol-expansion"] = symbol_expansion;
  _g91["quasiquote-list"] = quasiquote_list;
  _g91["valid-char?"] = valid_char63;
  _g91["quasisplice?"] = quasisplice63;
  _g91["can-unquote?"] = can_unquote63;
  _g91.mapo = mapo;
  _g91["quasiquoting?"] = quasiquoting63;
  _g91["symbol?"] = symbol63;
  _g91.macroexpand = macroexpand;
  _g91["variable?"] = variable63;
  _g91["quote-module"] = quote_module;
  _g91["special-form?"] = special_form63;
  _g91.quoted = quoted;
  _g91.indentation = indentation;
  _g91["quote-frame"] = quote_frame;
})();
(function () {
  var _g92 = nexus.runtime;
  var _ = _g92["-"];
  var _42 = _g92["*"];
  var _43 = _g92["+"];
  var none63 = _g92["none?"];
  var _47 = _g92["/"];
  var _37 = _g92["%"];
  var atom63 = _g92["atom?"];
  var exclude = _g92.exclude;
  var reduce = _g92.reduce;
  var split = _g92.split;
  var write_file = _g92["write-file"];
  var keys63 = _g92["keys?"];
  var search = _g92.search;
  var length = _g92.length;
  var stash = _g92.stash;
  var some63 = _g92["some?"];
  var replicate = _g92.replicate;
  var splice = _g92.splice;
  var to_string = _g92["to-string"];
  var find = _g92.find;
  var extend = _g92.extend;
  var id_literal63 = _g92["id-literal?"];
  var _6261 = _g92[">="];
  var _6061 = _g92["<="];
  var is63 = _g92["is?"];
  var iterate = _g92.iterate;
  var add = _g92.add;
  var substring = _g92.substring;
  var write = _g92.write;
  var string63 = _g92["string?"];
  var code = _g92.code;
  var sub = _g92.sub;
  var toplevel63 = _g92["toplevel?"];
  var table63 = _g92["table?"];
  var pairwise = _g92.pairwise;
  var map = _g92.map;
  var function63 = _g92["function?"];
  var setenv = _g92.setenv;
  var apply = _g92.apply;
  var read_file = _g92["read-file"];
  var _37message_handler = _g92["%message-handler"];
  var nil63 = _g92["nil?"];
  var last = _g92.last;
  var empty63 = _g92["empty?"];
  var sublist = _g92.sublist;
  var unstash = _g92.unstash;
  var module = _g92.module;
  var keep = _g92.keep;
  var boolean63 = _g92["boolean?"];
  var exit = _g92.exit;
  var hd = _g92.hd;
  var tl = _g92.tl;
  var reverse = _g92.reverse;
  var _61 = _g92["="];
  var char = _g92.char;
  var module_key = _g92["module-key"];
  var number63 = _g92["number?"];
  var inner = _g92.inner;
  var _62 = _g92[">"];
  var _60 = _g92["<"];
  var list63 = _g92["list?"];
  var composite63 = _g92["composite?"];
  var cat = _g92.cat;
  var make_id = _g92["make-id"];
  var join = _g92.join;
  var drop = _g92.drop;
  var string_literal63 = _g92["string-literal?"];
  var parse_number = _g92["parse-number"];
  var delimiters = {"(": true, ")": true, ";": true, "\n": true};
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
                return(["get", b, ["quote", a]]);
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
  var _g103 = {};
  nexus.reader = _g103;
  _g103["read-all"] = read_all;
  _g103.eof = eof;
  _g103["read-char"] = read_char;
  _g103.read = read;
  _g103["key?"] = key63;
  _g103.whitespace = whitespace;
  _g103["read-from-string"] = read_from_string;
  _g103["make-stream"] = make_stream;
  _g103["skip-non-code"] = skip_non_code;
  _g103.delimiters = delimiters;
  _g103["flag?"] = flag63;
  _g103["peek-char"] = peek_char;
  _g103["read-table"] = read_table;
})();
(function () {
  var _g104 = nexus.runtime;
  var _ = _g104["-"];
  var _42 = _g104["*"];
  var _43 = _g104["+"];
  var none63 = _g104["none?"];
  var _47 = _g104["/"];
  var _37 = _g104["%"];
  var atom63 = _g104["atom?"];
  var exclude = _g104.exclude;
  var reduce = _g104.reduce;
  var split = _g104.split;
  var write_file = _g104["write-file"];
  var keys63 = _g104["keys?"];
  var search = _g104.search;
  var length = _g104.length;
  var stash = _g104.stash;
  var some63 = _g104["some?"];
  var replicate = _g104.replicate;
  var splice = _g104.splice;
  var to_string = _g104["to-string"];
  var find = _g104.find;
  var extend = _g104.extend;
  var id_literal63 = _g104["id-literal?"];
  var _6261 = _g104[">="];
  var _6061 = _g104["<="];
  var is63 = _g104["is?"];
  var iterate = _g104.iterate;
  var add = _g104.add;
  var substring = _g104.substring;
  var write = _g104.write;
  var string63 = _g104["string?"];
  var code = _g104.code;
  var sub = _g104.sub;
  var toplevel63 = _g104["toplevel?"];
  var table63 = _g104["table?"];
  var pairwise = _g104.pairwise;
  var map = _g104.map;
  var function63 = _g104["function?"];
  var setenv = _g104.setenv;
  var apply = _g104.apply;
  var read_file = _g104["read-file"];
  var _37message_handler = _g104["%message-handler"];
  var nil63 = _g104["nil?"];
  var last = _g104.last;
  var empty63 = _g104["empty?"];
  var sublist = _g104.sublist;
  var unstash = _g104.unstash;
  var module = _g104.module;
  var keep = _g104.keep;
  var boolean63 = _g104["boolean?"];
  var exit = _g104.exit;
  var hd = _g104.hd;
  var tl = _g104.tl;
  var reverse = _g104.reverse;
  var _61 = _g104["="];
  var char = _g104.char;
  var module_key = _g104["module-key"];
  var number63 = _g104["number?"];
  var inner = _g104.inner;
  var _62 = _g104[">"];
  var _60 = _g104["<"];
  var list63 = _g104["list?"];
  var composite63 = _g104["composite?"];
  var cat = _g104.cat;
  var make_id = _g104["make-id"];
  var join = _g104.join;
  var drop = _g104.drop;
  var string_literal63 = _g104["string-literal?"];
  var parse_number = _g104["parse-number"];
  var _g105 = nexus.utilities;
  var toplevel63 = _g105["toplevel?"];
  var quote_modules = _g105["quote-modules"];
  var macro_function = _g105["macro-function"];
  var getenv = _g105.getenv;
  var stash42 = _g105["stash*"];
  var imported = _g105.imported;
  var quote_environment = _g105["quote-environment"];
  var valid_id63 = _g105["valid-id?"];
  var macro63 = _g105["macro?"];
  var reserved63 = _g105["reserved?"];
  var initial_environment = _g105["initial-environment"];
  var bind = _g105.bind;
  var special63 = _g105["special?"];
  var to_id = _g105["to-id"];
  var exported = _g105.exported;
  var bound63 = _g105["bound?"];
  var quasiexpand = _g105.quasiexpand;
  var bind42 = _g105["bind*"];
  var symbol_expansion = _g105["symbol-expansion"];
  var mapo = _g105.mapo;
  var symbol63 = _g105["symbol?"];
  var macroexpand = _g105.macroexpand;
  var variable63 = _g105["variable?"];
  var special_form63 = _g105["special-form?"];
  var quoted = _g105.quoted;
  var indentation = _g105.indentation;
  var _g108 = nexus.reader;
  var read_all = _g108["read-all"];
  var read = _g108.read;
  var read_from_string = _g108["read-from-string"];
  var make_stream = _g108["make-stream"];
  var read_table = _g108["read-table"];
  var infix = {js: {"~=": "!=", "=": "===", "or": "||", "and": "&&", cat: "+"}, common: {"<": true, "-": true, "*": true, "+": true, ">": true, "/": true, "%": true, ">=": true, "<=": true}, lua: {"~=": true, cat: "..", "or": true, "and": true, "=": "=="}};
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
    var _g109 = args;
    var i = 0;
    while ((i < length(_g109))) {
      var arg = _g109[i];
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
    var _g110 = unstash(sublist(arguments, 1));
    var tail = _g110.tail;
    var str = "";
    var _g111 = forms;
    var i = 0;
    while ((i < length(_g111))) {
      var x = _g111[i];
      var t63 = (tail && (i === (length(forms) - 1)));
      str = (str + compile(x, {_stash: true, stmt: true, tail: t63}));
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
    var _g112 = getenv(hd(form));
    var stmt = _g112.stmt;
    var special = _g112.special;
    var self_tr63 = _g112.tr;
    if ((!(stmt63) && stmt)) {
      return(compile([["%function", [], form]], {_stash: true, tail: tail63}));
    } else {
      var tr = terminator((stmt63 && !(self_tr63)));
      return((special(tl(form), tail63) + tr));
    }
  }
  function compile_call(form) {
    if (none63(form)) {
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
  function compile_infix(_g113) {
    var op = _g113[0];
    var args = sub(_g113, 1);
    var str = "(";
    var _g114 = getop(op);
    var _g115 = args;
    var i = 0;
    while ((i < length(_g115))) {
      var arg = _g115[i];
      if (((_g114 === "-") && (length(args) === 1))) {
        str = (str + _g114 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g114 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g116 = unstash(sublist(arguments, 2));
    var name = _g116.name;
    var prefix = _g116.prefix;
    var id = (function () {
      if (name) {
        return(compile(name));
      } else {
        return("");
      }
    })();
    var _g117 = (prefix || "");
    var _g118 = compile_args(args);
    var _g119 = (function () {
      indent_level = (indent_level + 1);
      var _g120 = compile_body(body, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g120);
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
      return(("function " + id + _g118 + " {\n" + _g119 + ind + "}" + tr));
    } else {
      return((_g117 + "function " + id + _g118 + "\n" + _g119 + ind + tr));
    }
  }
  function can_return63(form) {
    return((!(special_form63(form)) || !(getenv(hd(form)).stmt)));
  }
  compile = function (form) {
    var _g121 = unstash(sublist(arguments, 1));
    var stmt = _g121.stmt;
    var tail = _g121.tail;
    if ((tail && can_return63(form))) {
      form = ["return", form];
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
        var _g122 = (function () {
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
        return((ind + _g122 + tr));
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
    var _g123 = map(lower, body);
    var epilog = map(lower, exported());
    return([join(["%function", []], join(_g123, epilog))]);
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
    var _g124 = unstash(sublist(arguments, 1));
    var all = _g124.all;
    var m = module(spec);
    var frame = last(environment);
    var _g125 = m.export;
    var k = undefined;
    for (k in _g125) {
      if (isNaN(parseInt(k))) {
        var v = _g125[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g126 = unstash(sublist(arguments, 1));
    var all = _g126.all;
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
    var _g127 = lower(join(["do"], join(prologue(), [form])));
    var compiled = compile(_g127);
    target = previous;
    return(run(compiled));
  }
  var _g128 = {};
  nexus.compiler = _g128;
  _g128["compile-infix"] = compile_infix;
  _g128["compile-args"] = compile_args;
  _g128["module-path"] = module_path;
  _g128["compile-body"] = compile_body;
  _g128["open-module"] = open_module;
  _g128.run = run;
  _g128["in-module"] = in_module;
  _g128["%compile-module"] = _37compile_module;
  _g128.prologue = prologue;
  _g128["compile-module"] = compile_module;
  _g128["compile-atom"] = compile_atom;
  _g128["compile-file"] = compile_file;
  _g128["compiler-output"] = compiler_output;
  _g128["infix?"] = infix63;
  _g128["compiling?"] = compiling63;
  _g128.encapsulate = encapsulate;
  _g128["compile-call"] = compile_call;
  _g128.infix = infix;
  _g128.lower = lower;
  _g128["can-return?"] = can_return63;
  _g128.compile = compile;
  _g128.terminator = terminator;
  _g128["compile-function"] = compile_function;
  _g128["compile-special"] = compile_special;
  _g128.getop = getop;
  _g128.eval = eval;
  _g128["load-module"] = load_module;
})();
(function () {
  var _g130 = nexus.runtime;
  var _ = _g130["-"];
  var _42 = _g130["*"];
  var _43 = _g130["+"];
  var none63 = _g130["none?"];
  var _47 = _g130["/"];
  var _37 = _g130["%"];
  var atom63 = _g130["atom?"];
  var exclude = _g130.exclude;
  var reduce = _g130.reduce;
  var split = _g130.split;
  var write_file = _g130["write-file"];
  var keys63 = _g130["keys?"];
  var search = _g130.search;
  var length = _g130.length;
  var stash = _g130.stash;
  var some63 = _g130["some?"];
  var replicate = _g130.replicate;
  var splice = _g130.splice;
  var to_string = _g130["to-string"];
  var find = _g130.find;
  var extend = _g130.extend;
  var id_literal63 = _g130["id-literal?"];
  var _6261 = _g130[">="];
  var _6061 = _g130["<="];
  var is63 = _g130["is?"];
  var iterate = _g130.iterate;
  var add = _g130.add;
  var substring = _g130.substring;
  var write = _g130.write;
  var string63 = _g130["string?"];
  var code = _g130.code;
  var sub = _g130.sub;
  var toplevel63 = _g130["toplevel?"];
  var table63 = _g130["table?"];
  var pairwise = _g130.pairwise;
  var map = _g130.map;
  var function63 = _g130["function?"];
  var setenv = _g130.setenv;
  var apply = _g130.apply;
  var read_file = _g130["read-file"];
  var _37message_handler = _g130["%message-handler"];
  var nil63 = _g130["nil?"];
  var last = _g130.last;
  var empty63 = _g130["empty?"];
  var sublist = _g130.sublist;
  var unstash = _g130.unstash;
  var module = _g130.module;
  var keep = _g130.keep;
  var boolean63 = _g130["boolean?"];
  var exit = _g130.exit;
  var hd = _g130.hd;
  var tl = _g130.tl;
  var reverse = _g130.reverse;
  var _61 = _g130["="];
  var char = _g130.char;
  var module_key = _g130["module-key"];
  var number63 = _g130["number?"];
  var inner = _g130.inner;
  var _62 = _g130[">"];
  var _60 = _g130["<"];
  var list63 = _g130["list?"];
  var composite63 = _g130["composite?"];
  var cat = _g130.cat;
  var make_id = _g130["make-id"];
  var join = _g130.join;
  var drop = _g130.drop;
  var string_literal63 = _g130["string-literal?"];
  var parse_number = _g130["parse-number"];
  var _g131 = nexus.utilities;
  var toplevel63 = _g131["toplevel?"];
  var quote_modules = _g131["quote-modules"];
  var macro_function = _g131["macro-function"];
  var getenv = _g131.getenv;
  var stash42 = _g131["stash*"];
  var imported = _g131.imported;
  var quote_environment = _g131["quote-environment"];
  var valid_id63 = _g131["valid-id?"];
  var macro63 = _g131["macro?"];
  var reserved63 = _g131["reserved?"];
  var initial_environment = _g131["initial-environment"];
  var bind = _g131.bind;
  var special63 = _g131["special?"];
  var to_id = _g131["to-id"];
  var exported = _g131.exported;
  var bound63 = _g131["bound?"];
  var quasiexpand = _g131.quasiexpand;
  var bind42 = _g131["bind*"];
  var symbol_expansion = _g131["symbol-expansion"];
  var mapo = _g131.mapo;
  var symbol63 = _g131["symbol?"];
  var macroexpand = _g131.macroexpand;
  var variable63 = _g131["variable?"];
  var special_form63 = _g131["special-form?"];
  var quoted = _g131.quoted;
  var indentation = _g131.indentation;
  var _g134 = nexus.compiler;
  var compile_body = _g134["compile-body"];
  var open_module = _g134["open-module"];
  var in_module = _g134["in-module"];
  var compile_module = _g134["compile-module"];
  var compile_call = _g134["compile-call"];
  var compile = _g134.compile;
  var compile_function = _g134["compile-function"];
  var compile_special = _g134["compile-special"];
  var eval = _g134.eval;
  var load_module = _g134["load-module"];
})();
(function () {
  var _g328 = nexus.runtime;
  var _ = _g328["-"];
  var _42 = _g328["*"];
  var _43 = _g328["+"];
  var none63 = _g328["none?"];
  var _47 = _g328["/"];
  var _37 = _g328["%"];
  var atom63 = _g328["atom?"];
  var exclude = _g328.exclude;
  var reduce = _g328.reduce;
  var split = _g328.split;
  var write_file = _g328["write-file"];
  var keys63 = _g328["keys?"];
  var search = _g328.search;
  var length = _g328.length;
  var stash = _g328.stash;
  var some63 = _g328["some?"];
  var replicate = _g328.replicate;
  var splice = _g328.splice;
  var to_string = _g328["to-string"];
  var find = _g328.find;
  var extend = _g328.extend;
  var id_literal63 = _g328["id-literal?"];
  var _6261 = _g328[">="];
  var _6061 = _g328["<="];
  var is63 = _g328["is?"];
  var iterate = _g328.iterate;
  var add = _g328.add;
  var substring = _g328.substring;
  var write = _g328.write;
  var string63 = _g328["string?"];
  var code = _g328.code;
  var sub = _g328.sub;
  var toplevel63 = _g328["toplevel?"];
  var table63 = _g328["table?"];
  var pairwise = _g328.pairwise;
  var map = _g328.map;
  var function63 = _g328["function?"];
  var setenv = _g328.setenv;
  var apply = _g328.apply;
  var read_file = _g328["read-file"];
  var _37message_handler = _g328["%message-handler"];
  var nil63 = _g328["nil?"];
  var last = _g328.last;
  var empty63 = _g328["empty?"];
  var sublist = _g328.sublist;
  var unstash = _g328.unstash;
  var module = _g328.module;
  var keep = _g328.keep;
  var boolean63 = _g328["boolean?"];
  var exit = _g328.exit;
  var hd = _g328.hd;
  var tl = _g328.tl;
  var reverse = _g328.reverse;
  var _61 = _g328["="];
  var char = _g328.char;
  var module_key = _g328["module-key"];
  var number63 = _g328["number?"];
  var inner = _g328.inner;
  var _62 = _g328[">"];
  var _60 = _g328["<"];
  var list63 = _g328["list?"];
  var composite63 = _g328["composite?"];
  var cat = _g328.cat;
  var make_id = _g328["make-id"];
  var join = _g328.join;
  var drop = _g328.drop;
  var string_literal63 = _g328["string-literal?"];
  var parse_number = _g328["parse-number"];
  var _g329 = nexus.utilities;
  var toplevel63 = _g329["toplevel?"];
  var quote_modules = _g329["quote-modules"];
  var macro_function = _g329["macro-function"];
  var getenv = _g329.getenv;
  var stash42 = _g329["stash*"];
  var imported = _g329.imported;
  var quote_environment = _g329["quote-environment"];
  var valid_id63 = _g329["valid-id?"];
  var macro63 = _g329["macro?"];
  var reserved63 = _g329["reserved?"];
  var initial_environment = _g329["initial-environment"];
  var bind = _g329.bind;
  var special63 = _g329["special?"];
  var to_id = _g329["to-id"];
  var exported = _g329.exported;
  var bound63 = _g329["bound?"];
  var quasiexpand = _g329.quasiexpand;
  var bind42 = _g329["bind*"];
  var symbol_expansion = _g329["symbol-expansion"];
  var mapo = _g329.mapo;
  var symbol63 = _g329["symbol?"];
  var macroexpand = _g329.macroexpand;
  var variable63 = _g329["variable?"];
  var special_form63 = _g329["special-form?"];
  var quoted = _g329.quoted;
  var indentation = _g329.indentation;
  var _g332 = nexus.compiler;
  var compile_body = _g332["compile-body"];
  var open_module = _g332["open-module"];
  var in_module = _g332["in-module"];
  var compile_module = _g332["compile-module"];
  var compile_call = _g332["compile-call"];
  var compile = _g332.compile;
  var compile_function = _g332["compile-function"];
  var compile_special = _g332["compile-special"];
  var eval = _g332.eval;
  var load_module = _g332["load-module"];
  global.target = "js";
})();
(function () {
  var _g608 = nexus.runtime;
  var _ = _g608["-"];
  var _42 = _g608["*"];
  var _43 = _g608["+"];
  var none63 = _g608["none?"];
  var _47 = _g608["/"];
  var _37 = _g608["%"];
  var atom63 = _g608["atom?"];
  var exclude = _g608.exclude;
  var reduce = _g608.reduce;
  var split = _g608.split;
  var write_file = _g608["write-file"];
  var keys63 = _g608["keys?"];
  var search = _g608.search;
  var length = _g608.length;
  var stash = _g608.stash;
  var some63 = _g608["some?"];
  var replicate = _g608.replicate;
  var splice = _g608.splice;
  var to_string = _g608["to-string"];
  var find = _g608.find;
  var extend = _g608.extend;
  var id_literal63 = _g608["id-literal?"];
  var _6261 = _g608[">="];
  var _6061 = _g608["<="];
  var is63 = _g608["is?"];
  var iterate = _g608.iterate;
  var add = _g608.add;
  var substring = _g608.substring;
  var write = _g608.write;
  var string63 = _g608["string?"];
  var code = _g608.code;
  var sub = _g608.sub;
  var toplevel63 = _g608["toplevel?"];
  var table63 = _g608["table?"];
  var pairwise = _g608.pairwise;
  var map = _g608.map;
  var function63 = _g608["function?"];
  var setenv = _g608.setenv;
  var apply = _g608.apply;
  var read_file = _g608["read-file"];
  var _37message_handler = _g608["%message-handler"];
  var nil63 = _g608["nil?"];
  var last = _g608.last;
  var empty63 = _g608["empty?"];
  var sublist = _g608.sublist;
  var unstash = _g608.unstash;
  var module = _g608.module;
  var keep = _g608.keep;
  var boolean63 = _g608["boolean?"];
  var exit = _g608.exit;
  var hd = _g608.hd;
  var tl = _g608.tl;
  var reverse = _g608.reverse;
  var _61 = _g608["="];
  var char = _g608.char;
  var module_key = _g608["module-key"];
  var number63 = _g608["number?"];
  var inner = _g608.inner;
  var _62 = _g608[">"];
  var _60 = _g608["<"];
  var list63 = _g608["list?"];
  var composite63 = _g608["composite?"];
  var cat = _g608.cat;
  var make_id = _g608["make-id"];
  var join = _g608.join;
  var drop = _g608.drop;
  var string_literal63 = _g608["string-literal?"];
  var parse_number = _g608["parse-number"];
  var _g609 = nexus.utilities;
  var toplevel63 = _g609["toplevel?"];
  var quote_modules = _g609["quote-modules"];
  var macro_function = _g609["macro-function"];
  var getenv = _g609.getenv;
  var stash42 = _g609["stash*"];
  var imported = _g609.imported;
  var quote_environment = _g609["quote-environment"];
  var valid_id63 = _g609["valid-id?"];
  var macro63 = _g609["macro?"];
  var reserved63 = _g609["reserved?"];
  var initial_environment = _g609["initial-environment"];
  var bind = _g609.bind;
  var special63 = _g609["special?"];
  var to_id = _g609["to-id"];
  var exported = _g609.exported;
  var bound63 = _g609["bound?"];
  var quasiexpand = _g609.quasiexpand;
  var bind42 = _g609["bind*"];
  var symbol_expansion = _g609["symbol-expansion"];
  var mapo = _g609.mapo;
  var symbol63 = _g609["symbol?"];
  var macroexpand = _g609.macroexpand;
  var variable63 = _g609["variable?"];
  var special_form63 = _g609["special-form?"];
  var quoted = _g609.quoted;
  var indentation = _g609.indentation;
  var _g612 = nexus.compiler;
  var compile_body = _g612["compile-body"];
  var open_module = _g612["open-module"];
  var in_module = _g612["in-module"];
  var compile_module = _g612["compile-module"];
  var compile_call = _g612["compile-call"];
  var compile = _g612.compile;
  var compile_function = _g612["compile-function"];
  var compile_special = _g612["compile-special"];
  var eval = _g612.eval;
  var load_module = _g612["load-module"];
  global.modules = {system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g625 = sub(specs, 0);
    map(compile_module, _g625);
    return(undefined);
  }}}}, utilities: {import: ["runtime", "special", "core"], export: {escape: {variable: true}, "indent-level": {global: true, export: true}, "toplevel?": {variable: true, export: true}, "quote-modules": {variable: true, export: true}, "macro-function": {variable: true, export: true}, getenv: {variable: true, export: true}, "stash*": {variable: true, export: true}, imported: {variable: true, export: true}, "quote-environment": {variable: true, export: true}, "quoting?": {variable: true}, "valid-id?": {variable: true, export: true}, "numeric?": {variable: true}, "macro?": {variable: true, export: true}, "reserved?": {variable: true, export: true}, "with-indent": {macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }, export: true}, reserved: {variable: true}, "initial-environment": {variable: true, export: true}, bind: {variable: true, export: true}, "special?": {variable: true, export: true}, "to-id": {variable: true, export: true}, "global?": {variable: true}, "quote-binding": {variable: true}, exported: {variable: true, export: true}, "bound?": {variable: true, export: true}, quasiexpand: {variable: true, export: true}, "bind*": {variable: true, export: true}, "symbol-expansion": {variable: true, export: true}, "quasiquote-list": {variable: true}, "valid-char?": {variable: true}, "quasisplice?": {variable: true}, "can-unquote?": {variable: true}, mapo: {variable: true, export: true}, "quasiquoting?": {variable: true}, "symbol?": {variable: true, export: true}, macroexpand: {variable: true, export: true}, "variable?": {variable: true, export: true}, "quote-module": {variable: true}, "special-form?": {variable: true, export: true}, quoted: {variable: true, export: true}, indentation: {variable: true, export: true}, "quote-frame": {variable: true}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimize: {variable: true, export: true}, optimizations: {variable: true}, "define-optimization": {}}}, runtime: {import: ["special", "core"], export: {"id-count": {variable: true}, "-": {variable: true, export: true}, "*": {variable: true, export: true}, "+": {variable: true, export: true}, "none?": {variable: true, export: true}, "/": {variable: true, export: true}, "%": {variable: true, export: true}, "atom?": {variable: true, export: true}, exclude: {variable: true, export: true}, reduce: {variable: true, export: true}, split: {variable: true, export: true}, "write-file": {variable: true, export: true}, "keys?": {variable: true, export: true}, "splice?": {variable: true}, search: {variable: true, export: true}, length: {variable: true, export: true}, print: {global: true, export: true}, stash: {variable: true, export: true}, "some?": {variable: true, export: true}, replicate: {variable: true, export: true}, splice: {variable: true, export: true}, "to-string": {variable: true, export: true}, find: {variable: true, export: true}, extend: {variable: true, export: true}, "id-literal?": {variable: true, export: true}, ">=": {variable: true, export: true}, "<=": {variable: true, export: true}, "is?": {variable: true, export: true}, iterate: {variable: true, export: true}, add: {variable: true, export: true}, substring: {variable: true, export: true}, write: {variable: true, export: true}, "string?": {variable: true, export: true}, code: {variable: true, export: true}, fs: {variable: true}, sub: {variable: true, export: true}, "toplevel?": {variable: true, export: true}, "table?": {variable: true, export: true}, pairwise: {variable: true, export: true}, map: {variable: true, export: true}, "function?": {variable: true, export: true}, require: {global: true, export: true}, mapl: {variable: true}, type: {variable: true}, setenv: {variable: true, export: true}, apply: {variable: true, export: true}, "read-file": {variable: true, export: true}, "%message-handler": {variable: true, export: true}, "nil?": {variable: true, export: true}, last: {variable: true, export: true}, "empty?": {variable: true, export: true}, sublist: {variable: true, export: true}, unstash: {variable: true, export: true}, module: {variable: true, export: true}, keep: {variable: true, export: true}, "boolean?": {variable: true, export: true}, exit: {variable: true, export: true}, hd: {variable: true, export: true}, tl: {variable: true, export: true}, reverse: {variable: true, export: true}, "=": {variable: true, export: true}, char: {variable: true, export: true}, "module-key": {variable: true, export: true}, "number?": {variable: true, export: true}, inner: {variable: true, export: true}, ">": {variable: true, export: true}, "<": {variable: true, export: true}, "list?": {variable: true, export: true}, "composite?": {variable: true, export: true}, cat: {variable: true, export: true}, "make-id": {variable: true, export: true}, join: {variable: true, export: true}, drop: {variable: true, export: true}, "string-literal?": {variable: true, export: true}, "parse-number": {variable: true, export: true}}}, reader: {import: ["runtime", "special", "core"], export: {"read-all": {variable: true, export: true}, eof: {variable: true}, "read-char": {variable: true}, read: {variable: true, export: true}, "key?": {variable: true}, whitespace: {variable: true}, "read-from-string": {variable: true, export: true}, "make-stream": {variable: true, export: true}, "define-reader": {macro: function (_g626) {
    var char = _g626[0];
    var stream = _g626[1];
    var body = unstash(sublist(arguments, 1));
    var _g627 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g627)]);
  }, export: true}, "skip-non-code": {variable: true}, delimiters: {variable: true}, "flag?": {variable: true}, "peek-char": {variable: true}, "read-table": {variable: true, export: true}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"set": {stmt: true, export: true, special: function (_g628) {
    var lh = _g628[0];
    var rh = _g628[1];
    if (nil63(rh)) {
      throw new Error("Missing right-hand side in assignment");
    }
    return((indentation() + compile(lh) + " = " + compile(rh)));
  }}, "not": {special: function (_g629) {
    var x = _g629[0];
    var _g630 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g630 + ")"));
  }, export: true}, "%if": {stmt: true, special: function (_g631, tail63) {
    var x = _g631[0];
    var _g632 = _g631[1];
    var _g633 = _g631[2];
    var _g634 = compile(x);
    var _g635 = (function () {
      indent_level = (indent_level + 1);
      var _g637 = compile(_g632, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g637);
    })();
    var _g636 = (function () {
      if (_g633) {
        indent_level = (indent_level + 1);
        var _g638 = compile(_g633, {_stash: true, stmt: true, tail: tail63});
        indent_level = (indent_level - 1);
        return(_g638);
      }
    })();
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g634 + ") {\n" + _g635 + ind + "}");
    } else {
      str = (str + ind + "if " + _g634 + " then\n" + _g635);
    }
    if ((_g636 && (target === "js"))) {
      str = (str + " else {\n" + _g636 + ind + "}");
    } else {
      if (_g636) {
        str = (str + ind + "else\n" + _g636);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, export: true, tr: true}, "%try": {stmt: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g639 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g639);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, ["get", e, "\"message\""]]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g640 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g640);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, export: true, tr: true}, "%local-function": {stmt: true, special: function (_g641) {
    var name = _g641[0];
    var args = _g641[1];
    var body = sub(_g641, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, export: true, tr: true}, "%function": {special: function (_g642) {
    var args = _g642[0];
    var body = sub(_g642, 1);
    return(compile_function(args, body));
  }, export: true}, "%global-function": {stmt: true, special: function (_g643) {
    var name = _g643[0];
    var args = _g643[1];
    var body = sub(_g643, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, stmt: true}));
    }
  }, export: true, tr: true}, "%local": {stmt: true, export: true, special: function (_g644) {
    var name = _g644[0];
    var value = _g644[1];
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
  }}, "get": {special: function (_g645) {
    var t = _g645[0];
    var k = _g645[1];
    var _g646 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g646, 0) === "{"))) {
      _g646 = ("(" + _g646 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g646 + "." + inner(k)));
    } else {
      return((_g646 + "[" + k1 + "]"));
    }
  }, export: true}, "%for": {stmt: true, special: function (_g647) {
    var t = _g647[0];
    var k = _g647[1];
    var body = sub(_g647, 2);
    var _g648 = compile(t);
    var ind = indentation();
    var _g649 = (function () {
      indent_level = (indent_level + 1);
      var _g650 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g650);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g648 + " do\n" + _g649 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g648 + ") {\n" + _g649 + ind + "}\n"));
    }
  }, export: true, tr: true}, "%object": {special: function (forms) {
    var str = "{";
    var sep = (function () {
      if ((target === "lua")) {
        return(" = ");
      } else {
        return(": ");
      }
    })();
    var pairs = pairwise(forms);
    var _g651 = pairs;
    var i = 0;
    while ((i < length(_g651))) {
      var _g652 = _g651[i];
      var k = _g652[0];
      var v = _g652[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g653 = compile(v);
      var _g654 = (function () {
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
      str = (str + _g654 + sep + _g653);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true}, "do": {stmt: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, export: true, tr: true}, "return": {stmt: true, export: true, special: function (_g655) {
    var x = _g655[0];
    var _g656 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + _g656));
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
    var _g657 = forms;
    var i = 0;
    while ((i < length(_g657))) {
      var x = _g657[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true}, "break": {stmt: true, export: true, special: function (_g129) {
    return((indentation() + "break"));
  }}, "error": {stmt: true, export: true, special: function (_g658) {
    var x = _g658[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(["Error", x])));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }}, "while": {stmt: true, special: function (_g659) {
    var condition = _g659[0];
    var body = sub(_g659, 1);
    var _g660 = compile(condition);
    var _g661 = (function () {
      indent_level = (indent_level + 1);
      var _g662 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g662);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g660 + ") {\n" + _g661 + ind + "}\n"));
    } else {
      return((ind + "while " + _g660 + " do\n" + _g661 + ind + "end\n"));
    }
  }, export: true, tr: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {modules: {global: true, export: true}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, "%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-infix": {variable: true}, "current-module": {global: true, export: true}, "compile-args": {variable: true}, "module-path": {variable: true}, "compile-body": {variable: true, export: true}, "open-module": {variable: true, export: true}, run: {variable: true}, "in-module": {variable: true, export: true}, "%compile-module": {variable: true}, prologue: {variable: true}, "compile-module": {variable: true, export: true}, "compile-atom": {variable: true}, "compile-file": {variable: true}, "compiler-output": {variable: true}, "infix?": {variable: true}, "compiling?": {variable: true}, encapsulate: {variable: true}, "compile-call": {variable: true, export: true}, infix: {variable: true}, lower: {variable: true}, "can-return?": {variable: true}, compile: {variable: true, export: true}, terminator: {variable: true}, "compile-function": {variable: true, export: true}, "compile-special": {variable: true, export: true}, getop: {variable: true}, eval: {variable: true, export: true}, "load-module": {variable: true, export: true}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, target: {global: true, export: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g663 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    return(["let", [t1, t], (function () {
      if (nil63(v)) {
        var i = (function () {
          if (b.i) {
            return("i");
          } else {
            return(make_id());
          }
        })();
        return(["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g663), ["inc", i]]]);
      } else {
        return(["let", [k, "nil"], ["%for", t1, k, ["if", (function () {
          var _g664 = ["target"];
          _g664.js = ["isNaN", ["parseInt", k]];
          _g664.lua = ["not", ["number?", k]];
          return(_g664);
        })(), join(["let", [v, ["get", t1, k]]], _g663)]]]);
      }
    })()]);
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g665 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g666) {
      var lh = _g666[0];
      var rh = _g666[1];
      var _g667 = bind(lh, rh);
      var _g668 = 0;
      while ((_g668 < length(_g667))) {
        var _g669 = _g667[_g668];
        var id = _g669[0];
        var val = _g669[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g668 = (_g668 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g665)])));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g670 = sub(body, 0);
    add(environment, {});
    var _g671 = (function () {
      map(function (m) {
        return(macroexpand(join(["define-macro"], m)));
      }, definitions);
      return(join(["do"], macroexpand(_g670)));
    })();
    drop(environment);
    return(_g671);
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g672 = elements;
    var _g673 = 0;
    while ((_g673 < length(_g672))) {
      var e = _g672[_g673];
      l[e] = true;
      _g673 = (_g673 + 1);
    }
    return(join(["table"], l));
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g674) {
      var a = _g674[0];
      var b = _g674[1];
      var c = sub(_g674, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g675 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g675)) {
      var _g676 = bind42(x, _g675);
      var args = _g676[0];
      var _g677 = _g676[1];
      return(join(["%global-function", name, args], _g677));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g327, x) {
      return(x);
    }, body)));
  }, export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g678 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g678)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g679 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(["do", ["add", "environment", (function () {
      var _g680 = ["table"];
      _g680._scope = scope;
      return(_g680);
    })()], ["let", [x, join(["do"], _g679)], ["drop", "environment"], x]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g681 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g681)]);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g682 = sub(body, 0);
    var form = join(["fn", args], _g682);
    var keys = sub(_g682, length(_g682));
    eval(join((function () {
      var _g683 = ["setenv", ["quote", name]];
      _g683.form = ["quote", form];
      _g683.special = form;
      return(_g683);
    })(), keys));
    return(undefined);
  }, export: true}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g684 = sub(body, 0);
    var form = join(["fn", args], _g684);
    eval((function () {
      var _g685 = ["setenv", ["quote", name]];
      _g685.macro = form;
      _g685.form = ["quote", form];
      return(_g685);
    })());
    return(undefined);
  }, export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g686 = body;
      var k = undefined;
      for (k in _g686) {
        if (isNaN(parseInt(k))) {
          var v = _g686[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g687 = sub(body, 0);
    var _g688 = bind42(args, _g687);
    var _g689 = _g688[0];
    var _g690 = _g688[1];
    return(join(["%function", _g689], _g690));
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g691 = sub(body, 0);
    add(environment, {});
    var _g692 = (function () {
      map(function (_g693) {
        var name = _g693[0];
        var exp = _g693[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g691)));
    })();
    drop(environment);
    return(_g692);
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g694 = sub(body, 0);
    var imports = [];
    var imp = _g694.import;
    var exp = _g694.export;
    var _g695 = (imp || []);
    var _g696 = 0;
    while ((_g696 < length(_g695))) {
      var k = _g695[_g696];
      load_module(k);
      imports = join(imports, imported(k));
      _g696 = (_g696 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g697 = (exp || []);
    var _g698 = 0;
    while ((_g698 < length(_g697))) {
      var k = _g697[_g698];
      setenv(k, {_stash: true, export: true});
      _g698 = (_g698 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, "with-bindings": {macro: function (_g699) {
    var names = _g699[0];
    var body = unstash(sublist(arguments, 1));
    var _g700 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g701 = ["with-frame", ["each", [x], names, (function () {
        var _g702 = ["setenv", x];
        _g702.variable = true;
        return(_g702);
      })()]];
      _g701.scope = true;
      return(_g701);
    })(), _g700));
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g703 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g703)) {
      var _g704 = bind42(x, _g703);
      var args = _g704[0];
      var _g705 = _g704[1];
      return(join(["%local-function", name, args], _g705));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g706 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g706)]);
  }, export: true}}}, lib: {import: ["core", "special"], export: {}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g707 = sub(body, 0);
    var imports = [];
    var imp = _g707.import;
    var exp = _g707.export;
    var _g708 = (imp || []);
    var _g709 = 0;
    while ((_g709 < length(_g708))) {
      var k = _g708[_g709];
      load_module(k);
      imports = join(imports, imported(k));
      _g709 = (_g709 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g710 = (exp || []);
    var _g711 = 0;
    while ((_g711 < length(_g710))) {
      var k = _g710[_g711];
      setenv(k, {_stash: true, export: true});
      _g711 = (_g711 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var _ = _g2["-"];
  var _42 = _g2["*"];
  var nil63 = _g2["nil?"];
  var none63 = _g2["none?"];
  var sublist = _g2.sublist;
  var _37 = _g2["%"];
  var atom63 = _g2["atom?"];
  var boolean63 = _g2["boolean?"];
  var reduce = _g2.reduce;
  var number63 = _g2["number?"];
  var write_file = _g2["write-file"];
  var keys63 = _g2["keys?"];
  var list63 = _g2["list?"];
  var length = _g2.length;
  var composite63 = _g2["composite?"];
  var some63 = _g2["some?"];
  var replicate = _g2.replicate;
  var splice = _g2.splice;
  var to_string = _g2["to-string"];
  var find = _g2.find;
  var drop = _g2.drop;
  var id_literal63 = _g2["id-literal?"];
  var _6261 = _g2[">="];
  var _6061 = _g2["<="];
  var is63 = _g2["is?"];
  var iterate = _g2.iterate;
  var add = _g2.add;
  var substring = _g2.substring;
  var write = _g2.write;
  var string63 = _g2["string?"];
  var code = _g2.code;
  var sub = _g2.sub;
  var toplevel63 = _g2["toplevel?"];
  var table63 = _g2["table?"];
  var pairwise = _g2.pairwise;
  var map = _g2.map;
  var function63 = _g2["function?"];
  var setenv = _g2.setenv;
  var exit = _g2.exit;
  var _47 = _g2["/"];
  var _37message_handler = _g2["%message-handler"];
  var unstash = _g2.unstash;
  var apply = _g2.apply;
  var empty63 = _g2["empty?"];
  var string_literal63 = _g2["string-literal?"];
  var hd = _g2.hd;
  var module = _g2.module;
  var keep = _g2.keep;
  var read_file = _g2["read-file"];
  var cat = _g2.cat;
  var _60 = _g2["<"];
  var tl = _g2.tl;
  var reverse = _g2.reverse;
  var _61 = _g2["="];
  var char = _g2.char;
  var module_key = _g2["module-key"];
  var _43 = _g2["+"];
  var inner = _g2.inner;
  var _62 = _g2[">"];
  var split = _g2.split;
  var search = _g2.search;
  var exclude = _g2.exclude;
  var extend = _g2.extend;
  var make_id = _g2["make-id"];
  var join = _g2.join;
  var stash = _g2.stash;
  var last = _g2.last;
  var parse_number = _g2["parse-number"];
  var _g5 = nexus.reader;
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_from_string = _g5["read-from-string"];
  var make_stream = _g5["make-stream"];
  var read_all = _g5["read-all"];
  var _g6 = nexus.compiler;
  var compile_body = _g6["compile-body"];
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var compile_module = _g6["compile-module"];
  var compile_call = _g6["compile-call"];
  var compile_special = _g6["compile-special"];
  var compile = _g6.compile;
  var compile_function = _g6["compile-function"];
  var eval = _g6.eval;
  var in_module = _g6["in-module"];
  function rep(str) {
    var _g713 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g716) {
        return([false, _g716.message]);
      }
    })();
    var _g1 = _g713[0];
    var x = _g713[1];
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
    var _g714 = args;
    var i = 0;
    while ((i < length(_g714))) {
      var arg = _g714[i];
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
  var _g715 = {};
  nexus.main = _g715;
  _g715.repl = repl;
  _g715.rep = rep;
  _g715.usage = usage;
  _g715.main = main;
})();
