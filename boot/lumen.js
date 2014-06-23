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
    (l.push)(x);
    return(undefined);
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
  _g51["nil?"] = nil63;
  _g51["is?"] = is63;
  _g51.length = length;
  _g51["none?"] = none63;
  _g51["some?"] = some63;
  _g51.hd = hd;
  _g51["string?"] = string63;
  _g51["number?"] = number63;
  _g51["boolean?"] = boolean63;
  _g51["function?"] = function63;
  _g51["composite?"] = composite63;
  _g51["atom?"] = atom63;
  _g51["table?"] = table63;
  _g51["list?"] = list63;
  _g51.substring = substring;
  _g51.sublist = sublist;
  _g51.sub = sub;
  _g51.inner = inner;
  _g51.tl = tl;
  _g51.char = char;
  _g51.code = code;
  _g51["string-literal?"] = string_literal63;
  _g51["id-literal?"] = id_literal63;
  _g51.add = add;
  _g51.drop = drop;
  _g51.last = last;
  _g51.reverse = reverse;
  _g51.join = join;
  _g51.reduce = reduce;
  _g51.keep = keep;
  _g51.find = find;
  _g51.pairwise = pairwise;
  _g51.iterate = iterate;
  _g51.replicate = replicate;
  _g51.splice = splice;
  _g51.map = map;
  _g51["keys?"] = keys63;
  _g51["empty?"] = empty63;
  _g51.stash = stash;
  _g51.unstash = unstash;
  _g51.extend = extend;
  _g51.exclude = exclude;
  _g51.search = search;
  _g51.split = split;
  _g51.cat = cat;
  _g51["+"] = _43;
  _g51["-"] = _;
  _g51["*"] = _42;
  _g51["/"] = _47;
  _g51["%"] = _37;
  _g51[">"] = _62;
  _g51["<"] = _60;
  _g51["="] = _61;
  _g51[">="] = _6261;
  _g51["<="] = _6061;
  _g51["read-file"] = read_file;
  _g51["write-file"] = write_file;
  _g51.write = write;
  _g51.exit = exit;
  _g51["parse-number"] = parse_number;
  _g51["to-string"] = to_string;
  _g51.apply = apply;
  _g51["make-id"] = make_id;
  _g51["%message-handler"] = _37message_handler;
  _g51["toplevel?"] = toplevel63;
  _g51["module-key"] = module_key;
  _g51.module = module;
  _g51.setenv = setenv;
  _g51.type = type;
  _g51["splice?"] = splice63;
  _g51.mapl = mapl;
  _g51.fs = fs;
  _g51["id-count"] = id_count;
})();
(function () {
  var _g56 = nexus.runtime;
  var nil63 = _g56["nil?"];
  var is63 = _g56["is?"];
  var length = _g56.length;
  var none63 = _g56["none?"];
  var some63 = _g56["some?"];
  var hd = _g56.hd;
  var string63 = _g56["string?"];
  var number63 = _g56["number?"];
  var boolean63 = _g56["boolean?"];
  var function63 = _g56["function?"];
  var composite63 = _g56["composite?"];
  var atom63 = _g56["atom?"];
  var table63 = _g56["table?"];
  var list63 = _g56["list?"];
  var substring = _g56.substring;
  var sublist = _g56.sublist;
  var sub = _g56.sub;
  var inner = _g56.inner;
  var tl = _g56.tl;
  var char = _g56.char;
  var code = _g56.code;
  var string_literal63 = _g56["string-literal?"];
  var id_literal63 = _g56["id-literal?"];
  var add = _g56.add;
  var drop = _g56.drop;
  var last = _g56.last;
  var reverse = _g56.reverse;
  var join = _g56.join;
  var reduce = _g56.reduce;
  var keep = _g56.keep;
  var find = _g56.find;
  var pairwise = _g56.pairwise;
  var iterate = _g56.iterate;
  var replicate = _g56.replicate;
  var splice = _g56.splice;
  var map = _g56.map;
  var keys63 = _g56["keys?"];
  var empty63 = _g56["empty?"];
  var stash = _g56.stash;
  var unstash = _g56.unstash;
  var extend = _g56.extend;
  var exclude = _g56.exclude;
  var search = _g56.search;
  var split = _g56.split;
  var cat = _g56.cat;
  var _43 = _g56["+"];
  var _ = _g56["-"];
  var _42 = _g56["*"];
  var _47 = _g56["/"];
  var _37 = _g56["%"];
  var _62 = _g56[">"];
  var _60 = _g56["<"];
  var _61 = _g56["="];
  var _6261 = _g56[">="];
  var _6061 = _g56["<="];
  var read_file = _g56["read-file"];
  var write_file = _g56["write-file"];
  var write = _g56.write;
  var exit = _g56.exit;
  var parse_number = _g56["parse-number"];
  var to_string = _g56["to-string"];
  var apply = _g56.apply;
  var make_id = _g56["make-id"];
  var _37message_handler = _g56["%message-handler"];
  var toplevel63 = _g56["toplevel?"];
  var module_key = _g56["module-key"];
  var module = _g56.module;
  var setenv = _g56.setenv;
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
  var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
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
  _g91.getenv = getenv;
  _g91["macro-function"] = macro_function;
  _g91["macro?"] = macro63;
  _g91["special?"] = special63;
  _g91["special-form?"] = special_form63;
  _g91["symbol-expansion"] = symbol_expansion;
  _g91["symbol?"] = symbol63;
  _g91["variable?"] = variable63;
  _g91["bound?"] = bound63;
  _g91["toplevel?"] = toplevel63;
  _g91.quoted = quoted;
  _g91["stash*"] = stash42;
  _g91.bind = bind;
  _g91["bind*"] = bind42;
  _g91.quasiexpand = quasiexpand;
  _g91.macroexpand = macroexpand;
  _g91.indentation = indentation;
  _g91["reserved?"] = reserved63;
  _g91["valid-id?"] = valid_id63;
  _g91["to-id"] = to_id;
  _g91.imported = imported;
  _g91.exported = exported;
  _g91.mapo = mapo;
  _g91["quote-environment"] = quote_environment;
  _g91["quote-modules"] = quote_modules;
  _g91["initial-environment"] = initial_environment;
  _g91["global?"] = global63;
  _g91.escape = escape;
  _g91["quoting?"] = quoting63;
  _g91["quasiquoting?"] = quasiquoting63;
  _g91["can-unquote?"] = can_unquote63;
  _g91["quasisplice?"] = quasisplice63;
  _g91["quasiquote-list"] = quasiquote_list;
  _g91.reserved = reserved;
  _g91["numeric?"] = numeric63;
  _g91["valid-char?"] = valid_char63;
  _g91["quote-binding"] = quote_binding;
  _g91["quote-frame"] = quote_frame;
  _g91["quote-module"] = quote_module;
})();
(function () {
  var _g92 = nexus.runtime;
  var nil63 = _g92["nil?"];
  var is63 = _g92["is?"];
  var length = _g92.length;
  var none63 = _g92["none?"];
  var some63 = _g92["some?"];
  var hd = _g92.hd;
  var string63 = _g92["string?"];
  var number63 = _g92["number?"];
  var boolean63 = _g92["boolean?"];
  var function63 = _g92["function?"];
  var composite63 = _g92["composite?"];
  var atom63 = _g92["atom?"];
  var table63 = _g92["table?"];
  var list63 = _g92["list?"];
  var substring = _g92.substring;
  var sublist = _g92.sublist;
  var sub = _g92.sub;
  var inner = _g92.inner;
  var tl = _g92.tl;
  var char = _g92.char;
  var code = _g92.code;
  var string_literal63 = _g92["string-literal?"];
  var id_literal63 = _g92["id-literal?"];
  var add = _g92.add;
  var drop = _g92.drop;
  var last = _g92.last;
  var reverse = _g92.reverse;
  var join = _g92.join;
  var reduce = _g92.reduce;
  var keep = _g92.keep;
  var find = _g92.find;
  var pairwise = _g92.pairwise;
  var iterate = _g92.iterate;
  var replicate = _g92.replicate;
  var splice = _g92.splice;
  var map = _g92.map;
  var keys63 = _g92["keys?"];
  var empty63 = _g92["empty?"];
  var stash = _g92.stash;
  var unstash = _g92.unstash;
  var extend = _g92.extend;
  var exclude = _g92.exclude;
  var search = _g92.search;
  var split = _g92.split;
  var cat = _g92.cat;
  var _43 = _g92["+"];
  var _ = _g92["-"];
  var _42 = _g92["*"];
  var _47 = _g92["/"];
  var _37 = _g92["%"];
  var _62 = _g92[">"];
  var _60 = _g92["<"];
  var _61 = _g92["="];
  var _6261 = _g92[">="];
  var _6061 = _g92["<="];
  var read_file = _g92["read-file"];
  var write_file = _g92["write-file"];
  var write = _g92.write;
  var exit = _g92.exit;
  var parse_number = _g92["parse-number"];
  var to_string = _g92["to-string"];
  var apply = _g92.apply;
  var make_id = _g92["make-id"];
  var _37message_handler = _g92["%message-handler"];
  var toplevel63 = _g92["toplevel?"];
  var module_key = _g92["module-key"];
  var module = _g92.module;
  var setenv = _g92.setenv;
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
  _g103["make-stream"] = make_stream;
  _g103["read-table"] = read_table;
  _g103.read = read;
  _g103["read-all"] = read_all;
  _g103["read-from-string"] = read_from_string;
  _g103.delimiters = delimiters;
  _g103.whitespace = whitespace;
  _g103["peek-char"] = peek_char;
  _g103["read-char"] = read_char;
  _g103["skip-non-code"] = skip_non_code;
  _g103.eof = eof;
  _g103["key?"] = key63;
  _g103["flag?"] = flag63;
})();
(function () {
  var _g104 = nexus.runtime;
  var nil63 = _g104["nil?"];
  var is63 = _g104["is?"];
  var length = _g104.length;
  var none63 = _g104["none?"];
  var some63 = _g104["some?"];
  var hd = _g104.hd;
  var string63 = _g104["string?"];
  var number63 = _g104["number?"];
  var boolean63 = _g104["boolean?"];
  var function63 = _g104["function?"];
  var composite63 = _g104["composite?"];
  var atom63 = _g104["atom?"];
  var table63 = _g104["table?"];
  var list63 = _g104["list?"];
  var substring = _g104.substring;
  var sublist = _g104.sublist;
  var sub = _g104.sub;
  var inner = _g104.inner;
  var tl = _g104.tl;
  var char = _g104.char;
  var code = _g104.code;
  var string_literal63 = _g104["string-literal?"];
  var id_literal63 = _g104["id-literal?"];
  var add = _g104.add;
  var drop = _g104.drop;
  var last = _g104.last;
  var reverse = _g104.reverse;
  var join = _g104.join;
  var reduce = _g104.reduce;
  var keep = _g104.keep;
  var find = _g104.find;
  var pairwise = _g104.pairwise;
  var iterate = _g104.iterate;
  var replicate = _g104.replicate;
  var splice = _g104.splice;
  var map = _g104.map;
  var keys63 = _g104["keys?"];
  var empty63 = _g104["empty?"];
  var stash = _g104.stash;
  var unstash = _g104.unstash;
  var extend = _g104.extend;
  var exclude = _g104.exclude;
  var search = _g104.search;
  var split = _g104.split;
  var cat = _g104.cat;
  var _43 = _g104["+"];
  var _ = _g104["-"];
  var _42 = _g104["*"];
  var _47 = _g104["/"];
  var _37 = _g104["%"];
  var _62 = _g104[">"];
  var _60 = _g104["<"];
  var _61 = _g104["="];
  var _6261 = _g104[">="];
  var _6061 = _g104["<="];
  var read_file = _g104["read-file"];
  var write_file = _g104["write-file"];
  var write = _g104.write;
  var exit = _g104.exit;
  var parse_number = _g104["parse-number"];
  var to_string = _g104["to-string"];
  var apply = _g104.apply;
  var make_id = _g104["make-id"];
  var _37message_handler = _g104["%message-handler"];
  var toplevel63 = _g104["toplevel?"];
  var module_key = _g104["module-key"];
  var module = _g104.module;
  var setenv = _g104.setenv;
  var _g105 = nexus.utilities;
  var getenv = _g105.getenv;
  var macro_function = _g105["macro-function"];
  var macro63 = _g105["macro?"];
  var special63 = _g105["special?"];
  var special_form63 = _g105["special-form?"];
  var symbol_expansion = _g105["symbol-expansion"];
  var symbol63 = _g105["symbol?"];
  var variable63 = _g105["variable?"];
  var bound63 = _g105["bound?"];
  var toplevel63 = _g105["toplevel?"];
  var quoted = _g105.quoted;
  var stash42 = _g105["stash*"];
  var bind = _g105.bind;
  var bind42 = _g105["bind*"];
  var quasiexpand = _g105.quasiexpand;
  var macroexpand = _g105.macroexpand;
  var indentation = _g105.indentation;
  var reserved63 = _g105["reserved?"];
  var valid_id63 = _g105["valid-id?"];
  var to_id = _g105["to-id"];
  var imported = _g105.imported;
  var exported = _g105.exported;
  var mapo = _g105.mapo;
  var quote_environment = _g105["quote-environment"];
  var quote_modules = _g105["quote-modules"];
  var initial_environment = _g105["initial-environment"];
  var _g108 = nexus.reader;
  var make_stream = _g108["make-stream"];
  var read_table = _g108["read-table"];
  var read = _g108.read;
  var read_all = _g108["read-all"];
  var read_from_string = _g108["read-from-string"];
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
    var special = _g112.special;
    var stmt = _g112.stmt;
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
  _g128["compile-body"] = compile_body;
  _g128["compile-call"] = compile_call;
  _g128["compile-function"] = compile_function;
  _g128["compile-special"] = compile_special;
  _g128.compile = compile;
  _g128["open-module"] = open_module;
  _g128["load-module"] = load_module;
  _g128["in-module"] = in_module;
  _g128["compile-module"] = compile_module;
  _g128.eval = eval;
  _g128.infix = infix;
  _g128.getop = getop;
  _g128["infix?"] = infix63;
  _g128["compile-args"] = compile_args;
  _g128["compile-atom"] = compile_atom;
  _g128.terminator = terminator;
  _g128["compile-infix"] = compile_infix;
  _g128["can-return?"] = can_return63;
  _g128.lower = lower;
  _g128["module-path"] = module_path;
  _g128.encapsulate = encapsulate;
  _g128["compile-file"] = compile_file;
  _g128.run = run;
  _g128["compiling?"] = compiling63;
  _g128["compiler-output"] = compiler_output;
  _g128["%compile-module"] = _37compile_module;
  _g128.prologue = prologue;
})();
(function () {
  var _g130 = nexus.runtime;
  var nil63 = _g130["nil?"];
  var is63 = _g130["is?"];
  var length = _g130.length;
  var none63 = _g130["none?"];
  var some63 = _g130["some?"];
  var hd = _g130.hd;
  var string63 = _g130["string?"];
  var number63 = _g130["number?"];
  var boolean63 = _g130["boolean?"];
  var function63 = _g130["function?"];
  var composite63 = _g130["composite?"];
  var atom63 = _g130["atom?"];
  var table63 = _g130["table?"];
  var list63 = _g130["list?"];
  var substring = _g130.substring;
  var sublist = _g130.sublist;
  var sub = _g130.sub;
  var inner = _g130.inner;
  var tl = _g130.tl;
  var char = _g130.char;
  var code = _g130.code;
  var string_literal63 = _g130["string-literal?"];
  var id_literal63 = _g130["id-literal?"];
  var add = _g130.add;
  var drop = _g130.drop;
  var last = _g130.last;
  var reverse = _g130.reverse;
  var join = _g130.join;
  var reduce = _g130.reduce;
  var keep = _g130.keep;
  var find = _g130.find;
  var pairwise = _g130.pairwise;
  var iterate = _g130.iterate;
  var replicate = _g130.replicate;
  var splice = _g130.splice;
  var map = _g130.map;
  var keys63 = _g130["keys?"];
  var empty63 = _g130["empty?"];
  var stash = _g130.stash;
  var unstash = _g130.unstash;
  var extend = _g130.extend;
  var exclude = _g130.exclude;
  var search = _g130.search;
  var split = _g130.split;
  var cat = _g130.cat;
  var _43 = _g130["+"];
  var _ = _g130["-"];
  var _42 = _g130["*"];
  var _47 = _g130["/"];
  var _37 = _g130["%"];
  var _62 = _g130[">"];
  var _60 = _g130["<"];
  var _61 = _g130["="];
  var _6261 = _g130[">="];
  var _6061 = _g130["<="];
  var read_file = _g130["read-file"];
  var write_file = _g130["write-file"];
  var write = _g130.write;
  var exit = _g130.exit;
  var parse_number = _g130["parse-number"];
  var to_string = _g130["to-string"];
  var apply = _g130.apply;
  var make_id = _g130["make-id"];
  var _37message_handler = _g130["%message-handler"];
  var toplevel63 = _g130["toplevel?"];
  var module_key = _g130["module-key"];
  var module = _g130.module;
  var setenv = _g130.setenv;
  var _g131 = nexus.utilities;
  var getenv = _g131.getenv;
  var macro_function = _g131["macro-function"];
  var macro63 = _g131["macro?"];
  var special63 = _g131["special?"];
  var special_form63 = _g131["special-form?"];
  var symbol_expansion = _g131["symbol-expansion"];
  var symbol63 = _g131["symbol?"];
  var variable63 = _g131["variable?"];
  var bound63 = _g131["bound?"];
  var toplevel63 = _g131["toplevel?"];
  var quoted = _g131.quoted;
  var stash42 = _g131["stash*"];
  var bind = _g131.bind;
  var bind42 = _g131["bind*"];
  var quasiexpand = _g131.quasiexpand;
  var macroexpand = _g131.macroexpand;
  var indentation = _g131.indentation;
  var reserved63 = _g131["reserved?"];
  var valid_id63 = _g131["valid-id?"];
  var to_id = _g131["to-id"];
  var imported = _g131.imported;
  var exported = _g131.exported;
  var mapo = _g131.mapo;
  var quote_environment = _g131["quote-environment"];
  var quote_modules = _g131["quote-modules"];
  var initial_environment = _g131["initial-environment"];
  var _g134 = nexus.compiler;
  var compile_body = _g134["compile-body"];
  var compile_call = _g134["compile-call"];
  var compile_function = _g134["compile-function"];
  var compile_special = _g134["compile-special"];
  var compile = _g134.compile;
  var open_module = _g134["open-module"];
  var load_module = _g134["load-module"];
  var in_module = _g134["in-module"];
  var compile_module = _g134["compile-module"];
  var eval = _g134.eval;
})();
(function () {
  var _g330 = nexus.runtime;
  var nil63 = _g330["nil?"];
  var is63 = _g330["is?"];
  var length = _g330.length;
  var none63 = _g330["none?"];
  var some63 = _g330["some?"];
  var hd = _g330.hd;
  var string63 = _g330["string?"];
  var number63 = _g330["number?"];
  var boolean63 = _g330["boolean?"];
  var function63 = _g330["function?"];
  var composite63 = _g330["composite?"];
  var atom63 = _g330["atom?"];
  var table63 = _g330["table?"];
  var list63 = _g330["list?"];
  var substring = _g330.substring;
  var sublist = _g330.sublist;
  var sub = _g330.sub;
  var inner = _g330.inner;
  var tl = _g330.tl;
  var char = _g330.char;
  var code = _g330.code;
  var string_literal63 = _g330["string-literal?"];
  var id_literal63 = _g330["id-literal?"];
  var add = _g330.add;
  var drop = _g330.drop;
  var last = _g330.last;
  var reverse = _g330.reverse;
  var join = _g330.join;
  var reduce = _g330.reduce;
  var keep = _g330.keep;
  var find = _g330.find;
  var pairwise = _g330.pairwise;
  var iterate = _g330.iterate;
  var replicate = _g330.replicate;
  var splice = _g330.splice;
  var map = _g330.map;
  var keys63 = _g330["keys?"];
  var empty63 = _g330["empty?"];
  var stash = _g330.stash;
  var unstash = _g330.unstash;
  var extend = _g330.extend;
  var exclude = _g330.exclude;
  var search = _g330.search;
  var split = _g330.split;
  var cat = _g330.cat;
  var _43 = _g330["+"];
  var _ = _g330["-"];
  var _42 = _g330["*"];
  var _47 = _g330["/"];
  var _37 = _g330["%"];
  var _62 = _g330[">"];
  var _60 = _g330["<"];
  var _61 = _g330["="];
  var _6261 = _g330[">="];
  var _6061 = _g330["<="];
  var read_file = _g330["read-file"];
  var write_file = _g330["write-file"];
  var write = _g330.write;
  var exit = _g330.exit;
  var parse_number = _g330["parse-number"];
  var to_string = _g330["to-string"];
  var apply = _g330.apply;
  var make_id = _g330["make-id"];
  var _37message_handler = _g330["%message-handler"];
  var toplevel63 = _g330["toplevel?"];
  var module_key = _g330["module-key"];
  var module = _g330.module;
  var setenv = _g330.setenv;
  var _g331 = nexus.utilities;
  var getenv = _g331.getenv;
  var macro_function = _g331["macro-function"];
  var macro63 = _g331["macro?"];
  var special63 = _g331["special?"];
  var special_form63 = _g331["special-form?"];
  var symbol_expansion = _g331["symbol-expansion"];
  var symbol63 = _g331["symbol?"];
  var variable63 = _g331["variable?"];
  var bound63 = _g331["bound?"];
  var toplevel63 = _g331["toplevel?"];
  var quoted = _g331.quoted;
  var stash42 = _g331["stash*"];
  var bind = _g331.bind;
  var bind42 = _g331["bind*"];
  var quasiexpand = _g331.quasiexpand;
  var macroexpand = _g331.macroexpand;
  var indentation = _g331.indentation;
  var reserved63 = _g331["reserved?"];
  var valid_id63 = _g331["valid-id?"];
  var to_id = _g331["to-id"];
  var imported = _g331.imported;
  var exported = _g331.exported;
  var mapo = _g331.mapo;
  var quote_environment = _g331["quote-environment"];
  var quote_modules = _g331["quote-modules"];
  var initial_environment = _g331["initial-environment"];
  var _g334 = nexus.compiler;
  var compile_body = _g334["compile-body"];
  var compile_call = _g334["compile-call"];
  var compile_function = _g334["compile-function"];
  var compile_special = _g334["compile-special"];
  var compile = _g334.compile;
  var open_module = _g334["open-module"];
  var load_module = _g334["load-module"];
  var in_module = _g334["in-module"];
  var compile_module = _g334["compile-module"];
  var eval = _g334.eval;
  global.target = "js";
})();
(function () {
  var _g610 = nexus.runtime;
  var nil63 = _g610["nil?"];
  var is63 = _g610["is?"];
  var length = _g610.length;
  var none63 = _g610["none?"];
  var some63 = _g610["some?"];
  var hd = _g610.hd;
  var string63 = _g610["string?"];
  var number63 = _g610["number?"];
  var boolean63 = _g610["boolean?"];
  var function63 = _g610["function?"];
  var composite63 = _g610["composite?"];
  var atom63 = _g610["atom?"];
  var table63 = _g610["table?"];
  var list63 = _g610["list?"];
  var substring = _g610.substring;
  var sublist = _g610.sublist;
  var sub = _g610.sub;
  var inner = _g610.inner;
  var tl = _g610.tl;
  var char = _g610.char;
  var code = _g610.code;
  var string_literal63 = _g610["string-literal?"];
  var id_literal63 = _g610["id-literal?"];
  var add = _g610.add;
  var drop = _g610.drop;
  var last = _g610.last;
  var reverse = _g610.reverse;
  var join = _g610.join;
  var reduce = _g610.reduce;
  var keep = _g610.keep;
  var find = _g610.find;
  var pairwise = _g610.pairwise;
  var iterate = _g610.iterate;
  var replicate = _g610.replicate;
  var splice = _g610.splice;
  var map = _g610.map;
  var keys63 = _g610["keys?"];
  var empty63 = _g610["empty?"];
  var stash = _g610.stash;
  var unstash = _g610.unstash;
  var extend = _g610.extend;
  var exclude = _g610.exclude;
  var search = _g610.search;
  var split = _g610.split;
  var cat = _g610.cat;
  var _43 = _g610["+"];
  var _ = _g610["-"];
  var _42 = _g610["*"];
  var _47 = _g610["/"];
  var _37 = _g610["%"];
  var _62 = _g610[">"];
  var _60 = _g610["<"];
  var _61 = _g610["="];
  var _6261 = _g610[">="];
  var _6061 = _g610["<="];
  var read_file = _g610["read-file"];
  var write_file = _g610["write-file"];
  var write = _g610.write;
  var exit = _g610.exit;
  var parse_number = _g610["parse-number"];
  var to_string = _g610["to-string"];
  var apply = _g610.apply;
  var make_id = _g610["make-id"];
  var _37message_handler = _g610["%message-handler"];
  var toplevel63 = _g610["toplevel?"];
  var module_key = _g610["module-key"];
  var module = _g610.module;
  var setenv = _g610.setenv;
  var _g611 = nexus.utilities;
  var getenv = _g611.getenv;
  var macro_function = _g611["macro-function"];
  var macro63 = _g611["macro?"];
  var special63 = _g611["special?"];
  var special_form63 = _g611["special-form?"];
  var symbol_expansion = _g611["symbol-expansion"];
  var symbol63 = _g611["symbol?"];
  var variable63 = _g611["variable?"];
  var bound63 = _g611["bound?"];
  var toplevel63 = _g611["toplevel?"];
  var quoted = _g611.quoted;
  var stash42 = _g611["stash*"];
  var bind = _g611.bind;
  var bind42 = _g611["bind*"];
  var quasiexpand = _g611.quasiexpand;
  var macroexpand = _g611.macroexpand;
  var indentation = _g611.indentation;
  var reserved63 = _g611["reserved?"];
  var valid_id63 = _g611["valid-id?"];
  var to_id = _g611["to-id"];
  var imported = _g611.imported;
  var exported = _g611.exported;
  var mapo = _g611.mapo;
  var quote_environment = _g611["quote-environment"];
  var quote_modules = _g611["quote-modules"];
  var initial_environment = _g611["initial-environment"];
  var _g614 = nexus.compiler;
  var compile_body = _g614["compile-body"];
  var compile_call = _g614["compile-call"];
  var compile_function = _g614["compile-function"];
  var compile_special = _g614["compile-special"];
  var compile = _g614.compile;
  var open_module = _g614["open-module"];
  var load_module = _g614["load-module"];
  var in_module = _g614["in-module"];
  var compile_module = _g614["compile-module"];
  var eval = _g614.eval;
  global.modules = {optimizer: {export: {optimizations: {variable: true}, optimize: {variable: true, export: true}, "define-optimization": {}}, import: ["runtime", "special", "core"]}, main: {export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g627 = sub(specs, 0);
    map(compile_module, _g627);
    return(undefined);
  }}}, import: ["runtime", "special", "core", "reader", "compiler"]}, lib: {export: {}, import: ["core", "special"]}, runtime: {export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sublist: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, find: {export: true, variable: true}, pairwise: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, splice: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, extend: {export: true, variable: true}, exclude: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, "parse-number": {export: true, variable: true}, "to-string": {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, "splice?": {variable: true}, mapl: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}, import: ["special", "core"]}, special: {export: {"do": {stmt: true, special: function (forms, tail63) {
    return(compile_body(forms, {_stash: true, tail: tail63}));
  }, tr: true, export: true}, "%if": {stmt: true, special: function (_g628, tail63) {
    var x = _g628[0];
    var _g629 = _g628[1];
    var _g630 = _g628[2];
    var _g631 = compile(x);
    var _g632 = (function () {
      indent_level = (indent_level + 1);
      var _g634 = compile(_g629, {_stash: true, stmt: true, tail: tail63});
      indent_level = (indent_level - 1);
      return(_g634);
    })();
    var _g633 = (function () {
      if (_g630) {
        indent_level = (indent_level + 1);
        var _g635 = compile(_g630, {_stash: true, stmt: true, tail: tail63});
        indent_level = (indent_level - 1);
        return(_g635);
      }
    })();
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g631 + ") {\n" + _g632 + ind + "}");
    } else {
      str = (str + ind + "if " + _g631 + " then\n" + _g632);
    }
    if ((_g633 && (target === "js"))) {
      str = (str + " else {\n" + _g633 + ind + "}");
    } else {
      if (_g633) {
        str = (str + ind + "else\n" + _g633);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, tr: true, export: true}, "while": {stmt: true, special: function (_g636) {
    var condition = _g636[0];
    var body = sub(_g636, 1);
    var _g637 = compile(condition);
    var _g638 = (function () {
      indent_level = (indent_level + 1);
      var _g639 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g639);
    })();
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g637 + ") {\n" + _g638 + ind + "}\n"));
    } else {
      return((ind + "while " + _g637 + " do\n" + _g638 + ind + "end\n"));
    }
  }, tr: true, export: true}, "%for": {stmt: true, special: function (_g640) {
    var t = _g640[0];
    var k = _g640[1];
    var body = sub(_g640, 2);
    var _g641 = compile(t);
    var ind = indentation();
    var _g642 = (function () {
      indent_level = (indent_level + 1);
      var _g643 = compile_body(body);
      indent_level = (indent_level - 1);
      return(_g643);
    })();
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g641 + " do\n" + _g642 + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g641 + ") {\n" + _g642 + ind + "}\n"));
    }
  }, tr: true, export: true}, "%try": {stmt: true, special: function (forms) {
    var ind = indentation();
    var body = (function () {
      indent_level = (indent_level + 1);
      var _g644 = compile_body(forms, {_stash: true, tail: true});
      indent_level = (indent_level - 1);
      return(_g644);
    })();
    var e = make_id();
    var handler = ["return", ["%array", false, ["get", e, "\"message\""]]];
    var h = (function () {
      indent_level = (indent_level + 1);
      var _g645 = compile(handler, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      return(_g645);
    })();
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, tr: true, export: true}, "break": {special: function (_g129) {
    return((indentation() + "break"));
  }, stmt: true, export: true}, "%function": {export: true, special: function (_g646) {
    var args = _g646[0];
    var body = sub(_g646, 1);
    return(compile_function(args, body));
  }}, "%global-function": {stmt: true, special: function (_g647) {
    var name = _g647[0];
    var args = _g647[1];
    var body = sub(_g647, 2);
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, join(["%function", args], body)], {_stash: true, stmt: true}));
    }
  }, tr: true, export: true}, "%local-function": {stmt: true, special: function (_g648) {
    var name = _g648[0];
    var args = _g648[1];
    var body = sub(_g648, 2);
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, tr: true, export: true}, "return": {special: function (_g649) {
    var x = _g649[0];
    var _g650 = (function () {
      if (nil63(x)) {
        return("return");
      } else {
        return(compile_call(["return", x]));
      }
    })();
    return((indentation() + _g650));
  }, stmt: true, export: true}, "error": {special: function (_g651) {
    var x = _g651[0];
    var e = (function () {
      if ((target === "js")) {
        return(("throw new " + compile(["Error", x])));
      } else {
        return(compile_call(["error", x]));
      }
    })();
    return((indentation() + e));
  }, stmt: true, export: true}, "%local": {special: function (_g652) {
    var name = _g652[0];
    var value = _g652[1];
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
  }, stmt: true, export: true}, "set": {special: function (_g653) {
    var lh = _g653[0];
    var rh = _g653[1];
    var _g654 = compile(lh);
    var _g655 = compile((function () {
      if (nil63(rh)) {
        return("nil");
      } else {
        return(rh);
      }
    })());
    return((indentation() + _g654 + " = " + _g655));
  }, stmt: true, export: true}, "get": {export: true, special: function (_g656) {
    var t = _g656[0];
    var k = _g656[1];
    var _g657 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g657, 0) === "{"))) {
      _g657 = ("(" + _g657 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g657 + "." + inner(k)));
    } else {
      return((_g657 + "[" + k1 + "]"));
    }
  }}, "not": {export: true, special: function (_g658) {
    var x = _g658[0];
    var _g659 = compile(x);
    var open = (function () {
      if ((target === "js")) {
        return("!(");
      } else {
        return("(not ");
      }
    })();
    return((open + _g659 + ")"));
  }}, "%array": {export: true, special: function (forms) {
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
    var _g660 = forms;
    var i = 0;
    while ((i < length(_g660))) {
      var x = _g660[i];
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
    var _g661 = pairs;
    var i = 0;
    while ((i < length(_g661))) {
      var _g662 = _g661[i];
      var k = _g662[0];
      var v = _g662[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g663 = compile(v);
      var _g664 = (function () {
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
      str = (str + _g664 + sep + _g663);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, boot: {export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, reader: {export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g665) {
    var char = _g665[0];
    var stream = _g665[1];
    var body = unstash(sublist(arguments, 1));
    var _g666 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g666)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}, import: ["runtime", "special", "core"]}, utilities: {export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "to-id": {export: true, variable: true}, imported: {export: true, variable: true}, exported: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-char?": {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}, import: ["runtime", "special", "core"]}, core: {export: {quote: {export: true, macro: function (form) {
    return(quoted(form));
  }}, quasiquote: {export: true, macro: function (form) {
    return(quasiexpand(form, 1));
  }}, at: {export: true, macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }}, list: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g667 = body;
      var k = undefined;
      for (k in _g667) {
        if (isNaN(parseInt(k))) {
          var v = _g667[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }}, "if": {export: true, macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g668) {
      var a = _g668[0];
      var b = _g668[1];
      var c = sub(_g668, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }}, table: {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g329, x) {
      return(x);
    }, body)));
  }}, let: {export: true, macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g669 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g670) {
      var lh = _g670[0];
      var rh = _g670[1];
      var _g671 = bind(lh, rh);
      var _g672 = 0;
      while ((_g672 < length(_g671))) {
        var _g673 = _g671[_g672];
        var id = _g673[0];
        var val = _g673[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g672 = (_g672 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g669)])));
  }}, "define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g674 = sub(body, 0);
    var imports = [];
    var imp = _g674.import;
    var exp = _g674.export;
    var _g675 = (imp || []);
    var _g676 = 0;
    while ((_g676 < length(_g675))) {
      var k = _g675[_g676];
      load_module(k);
      imports = join(imports, imported(k));
      _g676 = (_g676 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g677 = (exp || []);
    var _g678 = 0;
    while ((_g678 < length(_g677))) {
      var k = _g677[_g678];
      setenv(k, {_stash: true, export: true});
      _g678 = (_g678 + 1);
    }
    return(join(["do"], imports));
  }}, "define-macro": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g679 = sub(body, 0);
    var form = join(["fn", args], _g679);
    eval((function () {
      var _g680 = ["setenv", ["quote", name]];
      _g680.macro = form;
      _g680.form = ["quote", form];
      return(_g680);
    })());
    return(undefined);
  }}, "define-special": {export: true, macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g681 = sub(body, 0);
    var form = join(["fn", args], _g681);
    var keys = sub(_g681, length(_g681));
    eval(join((function () {
      var _g682 = ["setenv", ["quote", name]];
      _g682.special = form;
      _g682.form = ["quote", form];
      return(_g682);
    })(), keys));
    return(undefined);
  }}, "define-symbol": {export: true, macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }}, define: {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g683 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g683)) {
      var _g684 = bind42(x, _g683);
      var args = _g684[0];
      var _g685 = _g684[1];
      return(join(["%local-function", name, args], _g685));
    } else {
      return(["%local", name, x]);
    }
  }}, "define*": {export: true, macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g686 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g686)) {
      var _g687 = bind42(x, _g686);
      var args = _g687[0];
      var _g688 = _g687[1];
      return(join(["%global-function", name, args], _g688));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }}, "with-bindings": {export: true, macro: function (_g689) {
    var names = _g689[0];
    var body = unstash(sublist(arguments, 1));
    var _g690 = sub(body, 0);
    var x = make_id();
    return(join((function () {
      var _g691 = ["with-frame", ["each", [x], names, (function () {
        var _g692 = ["setenv", x];
        _g692.variable = true;
        return(_g692);
      })()]];
      _g691.scope = true;
      return(_g691);
    })(), _g690));
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
  }}, "let-symbol": {export: true, macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g695 = sub(body, 0);
    add(environment, {});
    var _g696 = (function () {
      map(function (_g697) {
        var name = _g697[0];
        var exp = _g697[1];
        return(macroexpand(["define-symbol", name, exp]));
      }, pairwise(expansions));
      return(join(["do"], macroexpand(_g695)));
    })();
    drop(environment);
    return(_g696);
  }}, fn: {export: true, macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g698 = sub(body, 0);
    var _g699 = bind42(args, _g698);
    var _g700 = _g699[0];
    var _g701 = _g699[1];
    return(join(["%function", _g700], _g701));
  }}, guard: {export: true, macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }}, each: {export: true, macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g702 = sub(body, 0);
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
        return(["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g702), ["inc", i]]]);
      } else {
        return(["let", [k, "nil"], ["%for", t1, k, ["if", (function () {
          var _g703 = ["target"];
          _g703.js = ["isNaN", ["parseInt", k]];
          _g703.lua = ["not", ["number?", k]];
          return(_g703);
        })(), join(["let", [v, ["get", t1, k]]], _g702)]]]);
      }
    })()]);
  }}, "set-of": {export: true, macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g704 = elements;
    var _g705 = 0;
    while ((_g705 < length(_g704))) {
      var e = _g704[_g705];
      l[e] = true;
      _g705 = (_g705 + 1);
    }
    return(join(["table"], l));
  }}, language: {export: true, macro: function () {
    return(["quote", target]);
  }}, target: {macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }, export: true, global: true}, "join*": {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }}, "join!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g706 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g706)]);
  }}, "cat!": {export: true, macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g707 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g707)]);
  }}, inc: {export: true, macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }}, dec: {export: true, macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }}, pr: {export: true, macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g708 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g708)]);
  }}, "with-frame": {export: true, macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g709 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    return(["do", ["add", "environment", (function () {
      var _g710 = ["table"];
      _g710._scope = scope;
      return(_g710);
    })()], ["let", [x, join(["do"], _g709)], ["drop", "environment"], x]]);
  }}}, import: ["runtime", "utilities", "special", "core", "compiler"]}, compiler: {export: {"compile-body": {export: true, variable: true}, "compile-call": {export: true, variable: true}, "compile-function": {export: true, variable: true}, "compile-special": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "compile-module": {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, "%compile-module": {variable: true}, prologue: {variable: true}}, import: ["runtime", "utilities", "special", "core", "reader"]}, system: {export: {nexus: {global: true, export: true}}, import: ["special", "core"]}};
  global.environment = [{"define-module": {export: true, macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g711 = sub(body, 0);
    var imports = [];
    var imp = _g711.import;
    var exp = _g711.export;
    var _g712 = (imp || []);
    var _g713 = 0;
    while ((_g713 < length(_g712))) {
      var k = _g712[_g713];
      load_module(k);
      imports = join(imports, imported(k));
      _g713 = (_g713 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g714 = (exp || []);
    var _g715 = 0;
    while ((_g715 < length(_g714))) {
      var k = _g714[_g715];
      setenv(k, {_stash: true, export: true});
      _g715 = (_g715 + 1);
    }
    return(join(["do"], imports));
  }}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var splice = _g2.splice;
  var char = _g2.char;
  var write = _g2.write;
  var to_string = _g2["to-string"];
  var some63 = _g2["some?"];
  var id_literal63 = _g2["id-literal?"];
  var pairwise = _g2.pairwise;
  var parse_number = _g2["parse-number"];
  var make_id = _g2["make-id"];
  var _37 = _g2["%"];
  var _42 = _g2["*"];
  var _43 = _g2["+"];
  var _47 = _g2["/"];
  var setenv = _g2.setenv;
  var _ = _g2["-"];
  var _37message_handler = _g2["%message-handler"];
  var exclude = _g2.exclude;
  var sub = _g2.sub;
  var cat = _g2.cat;
  var boolean63 = _g2["boolean?"];
  var _62 = _g2[">"];
  var add = _g2.add;
  var _60 = _g2["<"];
  var empty63 = _g2["empty?"];
  var replicate = _g2.replicate;
  var code = _g2.code;
  var string_literal63 = _g2["string-literal?"];
  var number63 = _g2["number?"];
  var is63 = _g2["is?"];
  var find = _g2.find;
  var none63 = _g2["none?"];
  var extend = _g2.extend;
  var reduce = _g2.reduce;
  var last = _g2.last;
  var list63 = _g2["list?"];
  var search = _g2.search;
  var atom63 = _g2["atom?"];
  var toplevel63 = _g2["toplevel?"];
  var unstash = _g2.unstash;
  var function63 = _g2["function?"];
  var hd = _g2.hd;
  var join = _g2.join;
  var map = _g2.map;
  var sublist = _g2.sublist;
  var module_key = _g2["module-key"];
  var composite63 = _g2["composite?"];
  var inner = _g2.inner;
  var _6261 = _g2[">="];
  var keep = _g2.keep;
  var length = _g2.length;
  var iterate = _g2.iterate;
  var apply = _g2.apply;
  var exit = _g2.exit;
  var write_file = _g2["write-file"];
  var keys63 = _g2["keys?"];
  var split = _g2.split;
  var read_file = _g2["read-file"];
  var _6061 = _g2["<="];
  var _61 = _g2["="];
  var tl = _g2.tl;
  var stash = _g2.stash;
  var table63 = _g2["table?"];
  var module = _g2.module;
  var substring = _g2.substring;
  var string63 = _g2["string?"];
  var reverse = _g2.reverse;
  var nil63 = _g2["nil?"];
  var drop = _g2.drop;
  var _g5 = nexus.reader;
  var read_from_string = _g5["read-from-string"];
  var read_table = _g5["read-table"];
  var make_stream = _g5["make-stream"];
  var read_all = _g5["read-all"];
  var read = _g5.read;
  var _g6 = nexus.compiler;
  var compile_body = _g6["compile-body"];
  var compile_special = _g6["compile-special"];
  var compile_function = _g6["compile-function"];
  var compile_call = _g6["compile-call"];
  var in_module = _g6["in-module"];
  var eval = _g6.eval;
  var load_module = _g6["load-module"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var compile_module = _g6["compile-module"];
  function rep(str) {
    var _g717 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g720) {
        return([false, _g720.message]);
      }
    })();
    var _g1 = _g717[0];
    var x = _g717[1];
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
    var _g718 = args;
    var i = 0;
    while ((i < length(_g718))) {
      var arg = _g718[i];
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
  var _g719 = {};
  nexus.main = _g719;
  _g719.rep = rep;
  _g719.repl = repl;
  _g719.usage = usage;
  _g719.main = main;
})();
