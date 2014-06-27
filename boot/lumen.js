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
    var _g20 = (from || 0);
    if (string63(x)) {
      return(substring(x, _g20, upto));
    } else {
      var l = sublist(x, _g20, upto);
      var _g21 = x;
      var k = undefined;
      for (k in _g21) {
        if (isNaN(parseInt(k))) {
          var v = _g21[k];
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
          var _g22 = l1;
          var k = undefined;
          for (k in _g22) {
            if (isNaN(parseInt(k))) {
              var v = _g22[k];
              l[k] = v;
            }
          }
          var _g23 = l2;
          var k = undefined;
          for (k in _g23) {
            if (isNaN(parseInt(k))) {
              var v = _g23[k];
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
    var _g24 = l;
    var _g25 = 0;
    while ((_g25 < length(_g24))) {
      var x = _g24[_g25];
      if (f(x)) {
        add(l1, x);
      }
      _g25 = (_g25 + 1);
    }
    return(l1);
  }
  function find(f, l) {
    var _g26 = l;
    var _g27 = 0;
    while ((_g27 < length(_g26))) {
      var x = _g26[_g27];
      var _g28 = f(x);
      if (_g28) {
        return(_g28);
      }
      _g27 = (_g27 + 1);
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
    var _g29 = l;
    var _g30 = 0;
    while ((_g30 < length(_g29))) {
      var x = _g29[_g30];
      var _g31 = f(x);
      if (splice63(_g31)) {
        l1 = join(l1, _g31.value);
      } else {
        if (is63(_g31)) {
          add(l1, _g31);
        }
      }
      _g30 = (_g30 + 1);
    }
    return(l1);
  }
  function map(f, t) {
    var l = mapl(f, t);
    var _g32 = t;
    var k = undefined;
    for (k in _g32) {
      if (isNaN(parseInt(k))) {
        var v = _g32[k];
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
    var _g33 = t;
    var k = undefined;
    for (k in _g33) {
      if (isNaN(parseInt(k))) {
        var v = _g33[k];
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
      var _g34 = args;
      var k = undefined;
      for (k in _g34) {
        if (isNaN(parseInt(k))) {
          var v = _g34[k];
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
        var _g35 = l;
        var k = undefined;
        for (k in _g35) {
          if (isNaN(parseInt(k))) {
            var v = _g35[k];
            if (!((k === "_stash"))) {
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
    var _g36 = sub(xs, 0);
    return(join(t, _g36));
  }
  function exclude(t) {
    var keys = unstash(sublist(arguments, 1));
    var _g37 = sub(keys, 0);
    var t1 = sublist(t);
    var _g38 = t;
    var k = undefined;
    for (k in _g38) {
      if (isNaN(parseInt(k))) {
        var v = _g38[k];
        if (!(_g37[k])) {
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
    var _g39 = sub(xs, 0);
    if (none63(_g39)) {
      return("");
    } else {
      return(reduce(function (a, b) {
        return((a + b));
      }, _g39));
    }
  }
  function _43() {
    var xs = unstash(sublist(arguments, 0));
    var _g40 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a + b));
    }, _g40));
  }
  function _() {
    var xs = unstash(sublist(arguments, 0));
    var _g41 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b - a));
    }, reverse(_g41)));
  }
  function _42() {
    var xs = unstash(sublist(arguments, 0));
    var _g42 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((a * b));
    }, _g42));
  }
  function _47() {
    var xs = unstash(sublist(arguments, 0));
    var _g43 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b / a));
    }, reverse(_g43)));
  }
  function _37() {
    var xs = unstash(sublist(arguments, 0));
    var _g44 = sub(xs, 0);
    return(reduce(function (a, b) {
      return((b % a));
    }, reverse(_g44)));
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
            var _g45 = x;
            var k = undefined;
            for (k in _g45) {
              if (isNaN(parseInt(k))) {
                var v = _g45[k];
                add(x1, (k + ":"));
                add(x1, v);
              }
            }
            var _g46 = x1;
            var i = 0;
            while ((i < length(_g46))) {
              var y = _g46[i];
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
    var _g47 = stash(args);
    return((f.apply)(f, _g47));
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
    var _g48 = sub(keys, 0);
    if (string63(k)) {
      var frame = last(environment);
      var x = (frame[k] || {});
      var _g49 = _g48;
      var k1 = undefined;
      for (k1 in _g49) {
        if (isNaN(parseInt(k1))) {
          var v = _g49[k1];
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
  var _g50 = {};
  nexus.runtime = _g50;
  _g50["nil?"] = nil63;
  _g50["is?"] = is63;
  _g50.length = length;
  _g50["none?"] = none63;
  _g50["some?"] = some63;
  _g50.hd = hd;
  _g50["string?"] = string63;
  _g50["number?"] = number63;
  _g50["boolean?"] = boolean63;
  _g50["function?"] = function63;
  _g50["composite?"] = composite63;
  _g50["atom?"] = atom63;
  _g50["table?"] = table63;
  _g50["list?"] = list63;
  _g50.substring = substring;
  _g50.sublist = sublist;
  _g50.sub = sub;
  _g50.inner = inner;
  _g50.tl = tl;
  _g50.char = char;
  _g50.code = code;
  _g50["string-literal?"] = string_literal63;
  _g50["id-literal?"] = id_literal63;
  _g50.add = add;
  _g50.drop = drop;
  _g50.last = last;
  _g50.reverse = reverse;
  _g50.join = join;
  _g50.reduce = reduce;
  _g50.keep = keep;
  _g50.find = find;
  _g50.pairwise = pairwise;
  _g50.iterate = iterate;
  _g50.replicate = replicate;
  _g50.splice = splice;
  _g50.map = map;
  _g50["keys?"] = keys63;
  _g50["empty?"] = empty63;
  _g50.stash = stash;
  _g50.unstash = unstash;
  _g50.extend = extend;
  _g50.exclude = exclude;
  _g50.search = search;
  _g50.split = split;
  _g50.cat = cat;
  _g50["+"] = _43;
  _g50["-"] = _;
  _g50["*"] = _42;
  _g50["/"] = _47;
  _g50["%"] = _37;
  _g50[">"] = _62;
  _g50["<"] = _60;
  _g50["="] = _61;
  _g50[">="] = _6261;
  _g50["<="] = _6061;
  _g50["read-file"] = read_file;
  _g50["write-file"] = write_file;
  _g50.write = write;
  _g50.exit = exit;
  _g50["parse-number"] = parse_number;
  _g50["to-string"] = to_string;
  _g50.apply = apply;
  _g50["make-id"] = make_id;
  _g50["%message-handler"] = _37message_handler;
  _g50["toplevel?"] = toplevel63;
  _g50["module-key"] = module_key;
  _g50.module = module;
  _g50.setenv = setenv;
  _g50.type = type;
  _g50["splice?"] = splice63;
  _g50.mapl = mapl;
  _g50.fs = fs;
  _g50["id-count"] = id_count;
})();
(function () {
  var _g55 = nexus.runtime;
  var nil63 = _g55["nil?"];
  var is63 = _g55["is?"];
  var length = _g55.length;
  var none63 = _g55["none?"];
  var some63 = _g55["some?"];
  var hd = _g55.hd;
  var string63 = _g55["string?"];
  var number63 = _g55["number?"];
  var boolean63 = _g55["boolean?"];
  var function63 = _g55["function?"];
  var composite63 = _g55["composite?"];
  var atom63 = _g55["atom?"];
  var table63 = _g55["table?"];
  var list63 = _g55["list?"];
  var substring = _g55.substring;
  var sublist = _g55.sublist;
  var sub = _g55.sub;
  var inner = _g55.inner;
  var tl = _g55.tl;
  var char = _g55.char;
  var code = _g55.code;
  var string_literal63 = _g55["string-literal?"];
  var id_literal63 = _g55["id-literal?"];
  var add = _g55.add;
  var drop = _g55.drop;
  var last = _g55.last;
  var reverse = _g55.reverse;
  var join = _g55.join;
  var reduce = _g55.reduce;
  var keep = _g55.keep;
  var find = _g55.find;
  var pairwise = _g55.pairwise;
  var iterate = _g55.iterate;
  var replicate = _g55.replicate;
  var splice = _g55.splice;
  var map = _g55.map;
  var keys63 = _g55["keys?"];
  var empty63 = _g55["empty?"];
  var stash = _g55.stash;
  var unstash = _g55.unstash;
  var extend = _g55.extend;
  var exclude = _g55.exclude;
  var search = _g55.search;
  var split = _g55.split;
  var cat = _g55.cat;
  var _43 = _g55["+"];
  var _ = _g55["-"];
  var _42 = _g55["*"];
  var _47 = _g55["/"];
  var _37 = _g55["%"];
  var _62 = _g55[">"];
  var _60 = _g55["<"];
  var _61 = _g55["="];
  var _6261 = _g55[">="];
  var _6061 = _g55["<="];
  var read_file = _g55["read-file"];
  var write_file = _g55["write-file"];
  var write = _g55.write;
  var exit = _g55.exit;
  var parse_number = _g55["parse-number"];
  var to_string = _g55["to-string"];
  var apply = _g55.apply;
  var make_id = _g55["make-id"];
  var _37message_handler = _g55["%message-handler"];
  var toplevel63 = _g55["toplevel?"];
  var module_key = _g55["module-key"];
  var module = _g55.module;
  var setenv = _g55.setenv;
  function getenv(k) {
    var keys = unstash(sublist(arguments, 1));
    var _g58 = sub(keys, 0);
    if (string63(k)) {
      var b = find(function (e) {
        return(e[k]);
      }, reverse(environment));
      if (table63(b)) {
        var _g59 = undefined;
        var _g60 = _g58;
        var x = undefined;
        for (x in _g60) {
          if (isNaN(parseInt(x))) {
            var _g51 = _g60[x];
            _g59 = x;
          }
        }
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
  function statement63(k) {
    return((special63(k) && getenv(k, {_stash: true, stmt: true})));
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
      var _g61;
      if ((c === "\n")) {
        _g61 = "\\n";
      } else {
        var _g62;
        if ((c === "\"")) {
          _g62 = "\\\"";
        } else {
          var _g63;
          if ((c === "\\")) {
            _g63 = "\\\\";
          } else {
            _g63 = c;
          }
          _g62 = _g63;
        }
        _g61 = _g62;
      }
      var c1 = _g61;
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
      var _g64 = args;
      var k = undefined;
      for (k in _g64) {
        if (isNaN(parseInt(k))) {
          var v = _g64[k];
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
        var _g65 = lh;
        var i = 0;
        while ((i < length(_g65))) {
          var x = _g65[i];
          bs = join(bs, bind(x, ["at", rh, i]));
          i = (i + 1);
        }
        if (r) {
          bs = join(bs, bind(r, ["sub", rh, length(lh)]));
        }
        var _g66 = lh;
        var k = undefined;
        for (k in _g66) {
          if (isNaN(parseInt(k))) {
            var v = _g66[k];
            if ((v === true)) {
              v = k;
            }
            if (!((k === "rest"))) {
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
      var _g67 = args;
      var _g68 = 0;
      while ((_g68 < length(_g67))) {
        var arg = _g67[_g68];
        if (atom63(arg)) {
          add(args1, arg);
        } else {
          if ((list63(arg) || keys63(arg))) {
            var v = make_id();
            add(args1, v);
            bs = join(bs, [arg, v]);
          }
        }
        _g68 = (_g68 + 1);
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
          var _g52 = form[0];
          var args = form[1];
          var body = sub(form, 2);
          add(environment, {_scope: true});
          var _g71 = args;
          var _g72 = 0;
          while ((_g72 < length(_g71))) {
            var _g69 = _g71[_g72];
            setenv(_g69, {_stash: true, variable: true});
            _g72 = (_g72 + 1);
          }
          var _g70 = join(["%function", map(macroexpand, args)], macroexpand(body));
          drop(environment);
          return(_g70);
        } else {
          if (((x === "%local-function") || (x === "%global-function"))) {
            var _g53 = form[0];
            var name = form[1];
            var _g73 = form[2];
            var _g74 = sub(form, 3);
            add(environment, {_scope: true});
            var _g77 = _g73;
            var _g78 = 0;
            while ((_g78 < length(_g77))) {
              var _g75 = _g77[_g78];
              setenv(_g75, {_stash: true, variable: true});
              _g78 = (_g78 + 1);
            }
            var _g76 = join([x, name, map(macroexpand, _g73)], macroexpand(_g74));
            drop(environment);
            return(_g76);
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
    var _g79 = form;
    var k = undefined;
    for (k in _g79) {
      if (isNaN(parseInt(k))) {
        var v = _g79[k];
        var _g84;
        if (quasisplice63(v, depth)) {
          _g84 = quasiexpand(v[1]);
        } else {
          _g84 = quasiexpand(v, depth);
        }
        var _g80 = _g84;
        last(xs)[k] = _g80;
      }
    }
    var _g81 = form;
    var _g82 = 0;
    while ((_g82 < length(_g81))) {
      var x = _g81[_g82];
      if (quasisplice63(x, depth)) {
        var _g83 = quasiexpand(x[1]);
        add(xs, _g83);
        add(xs, ["list"]);
      } else {
        add(last(xs), quasiexpand(x, depth));
      }
      _g82 = (_g82 + 1);
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
      var _g89;
      if ((c === "-")) {
        _g89 = "_";
      } else {
        var _g90;
        if (valid_char63(n)) {
          _g90 = c;
        } else {
          var _g91;
          if ((i === 0)) {
            _g91 = ("_" + n);
          } else {
            _g91 = n;
          }
          _g90 = _g91;
        }
        _g89 = _g90;
      }
      var c1 = _g89;
      id1 = (id1 + c1);
      i = (i + 1);
    }
    return(id1);
  }
  function exported() {
    var m = make_id();
    var k = module_key(current_module);
    var exports = [];
    var _g92 = module(current_module).export;
    var n = undefined;
    for (n in _g92) {
      if (isNaN(parseInt(n))) {
        var b = _g92[n];
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
    var _g93 = unstash(sublist(arguments, 1));
    var all = _g93.all;
    var m = make_id();
    var k = module_key(spec);
    var imports = [];
    if (nexus[k]) {
      var _g94 = module(spec).export;
      var n = undefined;
      for (n in _g94) {
        if (isNaN(parseInt(n))) {
          var b = _g94[n];
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
    var _g95 = t;
    var k = undefined;
    for (k in _g95) {
      if (isNaN(parseInt(k))) {
        var v = _g95[k];
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
    var _g96 = ["table"];
    _g96.import = quoted(m.import);
    _g96.export = quote_frame(m.export);
    return(_g96);
  }
  function quote_modules() {
    return(join(["table"], map(quote_module, modules)));
  }
  function initial_environment() {
    return([{"define-module": getenv("define-module")}]);
  }
  var _g97 = {};
  nexus.utilities = _g97;
  _g97.getenv = getenv;
  _g97["macro-function"] = macro_function;
  _g97["macro?"] = macro63;
  _g97["special?"] = special63;
  _g97["special-form?"] = special_form63;
  _g97["statement?"] = statement63;
  _g97["symbol-expansion"] = symbol_expansion;
  _g97["symbol?"] = symbol63;
  _g97["variable?"] = variable63;
  _g97["bound?"] = bound63;
  _g97["toplevel?"] = toplevel63;
  _g97.quoted = quoted;
  _g97["stash*"] = stash42;
  _g97.bind = bind;
  _g97["bind*"] = bind42;
  _g97.quasiexpand = quasiexpand;
  _g97.macroexpand = macroexpand;
  _g97.indentation = indentation;
  _g97["reserved?"] = reserved63;
  _g97["valid-id?"] = valid_id63;
  _g97["to-id"] = to_id;
  _g97.imported = imported;
  _g97.exported = exported;
  _g97.mapo = mapo;
  _g97["quote-environment"] = quote_environment;
  _g97["quote-modules"] = quote_modules;
  _g97["initial-environment"] = initial_environment;
  _g97["global?"] = global63;
  _g97.escape = escape;
  _g97["quoting?"] = quoting63;
  _g97["quasiquoting?"] = quasiquoting63;
  _g97["can-unquote?"] = can_unquote63;
  _g97["quasisplice?"] = quasisplice63;
  _g97["quasiquote-list"] = quasiquote_list;
  _g97.reserved = reserved;
  _g97["numeric?"] = numeric63;
  _g97["valid-char?"] = valid_char63;
  _g97["quote-binding"] = quote_binding;
  _g97["quote-frame"] = quote_frame;
  _g97["quote-module"] = quote_module;
})();
(function () {
  var _g98 = nexus.runtime;
  var nil63 = _g98["nil?"];
  var is63 = _g98["is?"];
  var length = _g98.length;
  var none63 = _g98["none?"];
  var some63 = _g98["some?"];
  var hd = _g98.hd;
  var string63 = _g98["string?"];
  var number63 = _g98["number?"];
  var boolean63 = _g98["boolean?"];
  var function63 = _g98["function?"];
  var composite63 = _g98["composite?"];
  var atom63 = _g98["atom?"];
  var table63 = _g98["table?"];
  var list63 = _g98["list?"];
  var substring = _g98.substring;
  var sublist = _g98.sublist;
  var sub = _g98.sub;
  var inner = _g98.inner;
  var tl = _g98.tl;
  var char = _g98.char;
  var code = _g98.code;
  var string_literal63 = _g98["string-literal?"];
  var id_literal63 = _g98["id-literal?"];
  var add = _g98.add;
  var drop = _g98.drop;
  var last = _g98.last;
  var reverse = _g98.reverse;
  var join = _g98.join;
  var reduce = _g98.reduce;
  var keep = _g98.keep;
  var find = _g98.find;
  var pairwise = _g98.pairwise;
  var iterate = _g98.iterate;
  var replicate = _g98.replicate;
  var splice = _g98.splice;
  var map = _g98.map;
  var keys63 = _g98["keys?"];
  var empty63 = _g98["empty?"];
  var stash = _g98.stash;
  var unstash = _g98.unstash;
  var extend = _g98.extend;
  var exclude = _g98.exclude;
  var search = _g98.search;
  var split = _g98.split;
  var cat = _g98.cat;
  var _43 = _g98["+"];
  var _ = _g98["-"];
  var _42 = _g98["*"];
  var _47 = _g98["/"];
  var _37 = _g98["%"];
  var _62 = _g98[">"];
  var _60 = _g98["<"];
  var _61 = _g98["="];
  var _6261 = _g98[">="];
  var _6061 = _g98["<="];
  var read_file = _g98["read-file"];
  var write_file = _g98["write-file"];
  var write = _g98.write;
  var exit = _g98.exit;
  var parse_number = _g98["parse-number"];
  var to_string = _g98["to-string"];
  var apply = _g98.apply;
  var make_id = _g98["make-id"];
  var _37message_handler = _g98["%message-handler"];
  var toplevel63 = _g98["toplevel?"];
  var module_key = _g98["module-key"];
  var module = _g98.module;
  var setenv = _g98.setenv;
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
  var _g108 = {};
  nexus.reader = _g108;
  _g108["make-stream"] = make_stream;
  _g108["read-table"] = read_table;
  _g108.read = read;
  _g108["read-all"] = read_all;
  _g108["read-from-string"] = read_from_string;
  _g108.delimiters = delimiters;
  _g108.whitespace = whitespace;
  _g108["peek-char"] = peek_char;
  _g108["read-char"] = read_char;
  _g108["skip-non-code"] = skip_non_code;
  _g108.eof = eof;
  _g108["key?"] = key63;
  _g108["flag?"] = flag63;
})();
(function () {
  var _g109 = nexus.runtime;
  var nil63 = _g109["nil?"];
  var is63 = _g109["is?"];
  var length = _g109.length;
  var none63 = _g109["none?"];
  var some63 = _g109["some?"];
  var hd = _g109.hd;
  var string63 = _g109["string?"];
  var number63 = _g109["number?"];
  var boolean63 = _g109["boolean?"];
  var function63 = _g109["function?"];
  var composite63 = _g109["composite?"];
  var atom63 = _g109["atom?"];
  var table63 = _g109["table?"];
  var list63 = _g109["list?"];
  var substring = _g109.substring;
  var sublist = _g109.sublist;
  var sub = _g109.sub;
  var inner = _g109.inner;
  var tl = _g109.tl;
  var char = _g109.char;
  var code = _g109.code;
  var string_literal63 = _g109["string-literal?"];
  var id_literal63 = _g109["id-literal?"];
  var add = _g109.add;
  var drop = _g109.drop;
  var last = _g109.last;
  var reverse = _g109.reverse;
  var join = _g109.join;
  var reduce = _g109.reduce;
  var keep = _g109.keep;
  var find = _g109.find;
  var pairwise = _g109.pairwise;
  var iterate = _g109.iterate;
  var replicate = _g109.replicate;
  var splice = _g109.splice;
  var map = _g109.map;
  var keys63 = _g109["keys?"];
  var empty63 = _g109["empty?"];
  var stash = _g109.stash;
  var unstash = _g109.unstash;
  var extend = _g109.extend;
  var exclude = _g109.exclude;
  var search = _g109.search;
  var split = _g109.split;
  var cat = _g109.cat;
  var _43 = _g109["+"];
  var _ = _g109["-"];
  var _42 = _g109["*"];
  var _47 = _g109["/"];
  var _37 = _g109["%"];
  var _62 = _g109[">"];
  var _60 = _g109["<"];
  var _61 = _g109["="];
  var _6261 = _g109[">="];
  var _6061 = _g109["<="];
  var read_file = _g109["read-file"];
  var write_file = _g109["write-file"];
  var write = _g109.write;
  var exit = _g109.exit;
  var parse_number = _g109["parse-number"];
  var to_string = _g109["to-string"];
  var apply = _g109.apply;
  var make_id = _g109["make-id"];
  var _37message_handler = _g109["%message-handler"];
  var toplevel63 = _g109["toplevel?"];
  var module_key = _g109["module-key"];
  var module = _g109.module;
  var setenv = _g109.setenv;
  var _g110 = nexus.utilities;
  var getenv = _g110.getenv;
  var macro_function = _g110["macro-function"];
  var macro63 = _g110["macro?"];
  var special63 = _g110["special?"];
  var special_form63 = _g110["special-form?"];
  var statement63 = _g110["statement?"];
  var symbol_expansion = _g110["symbol-expansion"];
  var symbol63 = _g110["symbol?"];
  var variable63 = _g110["variable?"];
  var bound63 = _g110["bound?"];
  var toplevel63 = _g110["toplevel?"];
  var quoted = _g110.quoted;
  var stash42 = _g110["stash*"];
  var bind = _g110.bind;
  var bind42 = _g110["bind*"];
  var quasiexpand = _g110.quasiexpand;
  var macroexpand = _g110.macroexpand;
  var indentation = _g110.indentation;
  var reserved63 = _g110["reserved?"];
  var valid_id63 = _g110["valid-id?"];
  var to_id = _g110["to-id"];
  var imported = _g110.imported;
  var exported = _g110.exported;
  var mapo = _g110.mapo;
  var quote_environment = _g110["quote-environment"];
  var quote_modules = _g110["quote-modules"];
  var initial_environment = _g110["initial-environment"];
  var _g113 = nexus.reader;
  var make_stream = _g113["make-stream"];
  var read_table = _g113["read-table"];
  var read = _g113.read;
  var read_all = _g113["read-all"];
  var read_from_string = _g113["read-from-string"];
  var infix = {common: {"+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true}, js: {"=": "===", "~=": "!=", "and": "&&", "or": "||", cat: "+"}, lua: {"=": "==", cat: "..", "~=": true, "and": true, "or": true}};
  function getop(op) {
    var op1 = (infix.common[op] || infix[target][op]);
    if ((op1 === true)) {
      return(op);
    } else {
      return(op1);
    }
  }
  function infix63(x) {
    return(is63(getop(x)));
  }
  var compile;
  function compile_args(args) {
    var str = "(";
    var _g114 = args;
    var i = 0;
    while ((i < length(_g114))) {
      var arg = _g114[i];
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
  function compile_special(form, stmt63) {
    var x = form[0];
    var args = sub(form, 1);
    var _g115 = getenv(x);
    var special = _g115.special;
    var stmt = _g115.stmt;
    var self_tr63 = _g115.tr;
    var tr = terminator((stmt63 && !(self_tr63)));
    return((apply(special, args) + tr));
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
  function compile_infix(_g116) {
    var op = _g116[0];
    var args = sub(_g116, 1);
    var str = "(";
    var _g117 = getop(op);
    var _g118 = args;
    var i = 0;
    while ((i < length(_g118))) {
      var arg = _g118[i];
      if (((_g117 === "-") && (length(args) === 1))) {
        str = (str + _g117 + compile(arg));
      } else {
        str = (str + compile(arg));
        if ((i < (length(args) - 1))) {
          str = (str + " " + _g117 + " ");
        }
      }
      i = (i + 1);
    }
    return((str + ")"));
  }
  function compile_function(args, body) {
    var _g119 = unstash(sublist(arguments, 2));
    var name = _g119.name;
    var prefix = _g119.prefix;
    var _g124;
    if (name) {
      _g124 = compile(name);
    } else {
      _g124 = "";
    }
    var id = _g124;
    var _g120 = (prefix || "");
    var _g121 = compile_args(args);
    indent_level = (indent_level + 1);
    var _g123 = compile(body, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var _g122 = _g123;
    var ind = indentation();
    var _g125;
    if ((target === "js")) {
      _g125 = "";
    } else {
      _g125 = "end";
    }
    var tr = _g125;
    if (name) {
      tr = (tr + "\n");
    }
    if ((target === "js")) {
      return(("function " + id + _g121 + " {\n" + _g122 + ind + "}" + tr));
    } else {
      return((_g120 + "function " + id + _g121 + "\n" + _g122 + ind + tr));
    }
  }
  function can_return63(form) {
    return((is63(form) && (atom63(form) || (!((hd(form) === "return")) && !(statement63(hd(form)))))));
  }
  compile = function (form) {
    var _g126 = unstash(sublist(arguments, 1));
    var stmt = _g126.stmt;
    if (nil63(form)) {
      return("");
    } else {
      if (special_form63(form)) {
        return(compile_special(form, stmt));
      } else {
        var tr = terminator(stmt);
        var _g128;
        if (stmt) {
          _g128 = indentation();
        } else {
          _g128 = "";
        }
        var ind = _g128;
        var _g129;
        if (atom63(form)) {
          _g129 = compile_atom(form);
        } else {
          var _g130;
          if (infix63(hd(form))) {
            _g130 = compile_infix(form);
          } else {
            _g130 = compile_call(form);
          }
          _g129 = _g130;
        }
        var _g127 = _g129;
        return((ind + _g127 + tr));
      }
    }
  };
  var lower;
  function lower_statement(form, tail63) {
    var hoist = [];
    var e = lower(form, hoist, true, tail63);
    if ((some63(hoist) && is63(e))) {
      return(join(["do"], join(hoist, [e])));
    } else {
      if (is63(e)) {
        return(e);
      } else {
        if ((length(hoist) > 1)) {
          return(join(["do"], hoist));
        } else {
          return(hd(hoist));
        }
      }
    }
  }
  function lower_body(body, tail63) {
    return(lower_statement(join(["do"], body), tail63));
  }
  function lower_do(args, hoist, stmt63, tail63) {
    var _g131 = sub(args, 0, (length(args) - 1));
    var _g132 = 0;
    while ((_g132 < length(_g131))) {
      var x = _g131[_g132];
      add(hoist, lower(x, hoist, stmt63));
      _g132 = (_g132 + 1);
    }
    var e = lower(last(args), hoist, stmt63, tail63);
    if ((tail63 && can_return63(e))) {
      return(["return", e]);
    } else {
      return(e);
    }
  }
  function lower_if(args, hoist, stmt63, tail63) {
    var cond = args[0];
    var _g133 = args[1];
    var _g134 = args[2];
    if ((stmt63 || tail63)) {
      var _g136;
      if (_g134) {
        _g136 = [lower_body([_g134], tail63)];
      }
      return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_g133], tail63)], _g136)));
    } else {
      var e = make_id();
      add(hoist, ["%local", e]);
      var _g135;
      if (_g134) {
        _g135 = [lower(["set", e, _g134])];
      }
      add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _g133])], _g135));
      return(e);
    }
  }
  function lower_try(args, hoist, tail63) {
    return(add(hoist, ["%try", lower_body(args, tail63)]));
  }
  function lower_while(args, hoist) {
    var c = args[0];
    var body = sub(args, 1);
    return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
  }
  function lower_for(args, hoist) {
    var t = args[0];
    var k = args[1];
    var body = sub(args, 2);
    return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
  }
  function lower_function(args) {
    var a = args[0];
    var body = sub(args, 1);
    return(["%function", a, lower_body(body, true)]);
  }
  function lower_definition(kind, args, hoist) {
    var name = args[0];
    var _g137 = args[1];
    var body = sub(args, 2);
    return(add(hoist, [kind, name, _g137, lower_body(body, true)]));
  }
  function lower_call(form, hoist) {
    var _g138 = map(function (x) {
      return(lower(x, hoist));
    }, form);
    if (some63(_g138)) {
      return(_g138);
    }
  }
  function lower_special(form, hoist) {
    var e = lower_call(form, hoist);
    if (e) {
      return(add(hoist, e));
    }
  }
  lower = function (form, hoist, stmt63, tail63) {
    if (atom63(form)) {
      return(form);
    } else {
      if (empty63(form)) {
        return(["%array"]);
      } else {
        if (nil63(hoist)) {
          return(lower_statement(form));
        } else {
          var x = form[0];
          var args = sub(form, 1);
          if ((x === "do")) {
            return(lower_do(args, hoist, stmt63, tail63));
          } else {
            if ((x === "%if")) {
              return(lower_if(args, hoist, stmt63, tail63));
            } else {
              if ((x === "%try")) {
                return(lower_try(args, hoist, tail63));
              } else {
                if ((x === "while")) {
                  return(lower_while(args, hoist));
                } else {
                  if ((x === "%for")) {
                    return(lower_for(args, hoist));
                  } else {
                    if ((x === "%function")) {
                      return(lower_function(args));
                    } else {
                      if (((x === "%local-function") || (x === "%global-function"))) {
                        return(lower_definition(x, args, hoist));
                      } else {
                        if (statement63(x)) {
                          return(lower_special(form, hoist));
                        } else {
                          return(lower_call(form, hoist));
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  function process(form) {
    return(lower(macroexpand(form)));
  }
  global.current_module = undefined;
  function module_path(spec) {
    return((module_key(spec) + ".l"));
  }
  function encapsulate(body) {
    var _g139 = map(process, body);
    var epilog = map(process, exported());
    return([["%function", [], join(["do"], join(_g139, epilog))]]);
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
    var _g140 = unstash(sublist(arguments, 1));
    var all = _g140.all;
    var m = module(spec);
    var frame = last(environment);
    var _g141 = m.export;
    var k = undefined;
    for (k in _g141) {
      if (isNaN(parseInt(k))) {
        var v = _g141[k];
        if ((v.export || all)) {
          frame[k] = v;
        }
      }
    }
  }
  function load_module(spec) {
    var _g142 = unstash(sublist(arguments, 1));
    var all = _g142.all;
    if (!(module(spec))) {
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
    var m = module(current_module);
    return(join(imported(current_module, {_stash: true, all: true}), map(function (x) {
      return(splice(imported(x)));
    }, m.import)));
  }
  function eval(form) {
    var previous = target;
    target = "js";
    var _g143 = [join(["%function", []], join(prologue(), [form]))];
    var compiled = compile(process(_g143));
    target = previous;
    return(run(compiled));
  }
  var _g144 = {};
  nexus.compiler = _g144;
  _g144["compile-function"] = compile_function;
  _g144.compile = compile;
  _g144["open-module"] = open_module;
  _g144["load-module"] = load_module;
  _g144["in-module"] = in_module;
  _g144["compile-module"] = compile_module;
  _g144.eval = eval;
  _g144.infix = infix;
  _g144.getop = getop;
  _g144["infix?"] = infix63;
  _g144["compile-args"] = compile_args;
  _g144["compile-atom"] = compile_atom;
  _g144.terminator = terminator;
  _g144["compile-special"] = compile_special;
  _g144["compile-call"] = compile_call;
  _g144["compile-infix"] = compile_infix;
  _g144["can-return?"] = can_return63;
  _g144.lower = lower;
  _g144["lower-statement"] = lower_statement;
  _g144["lower-body"] = lower_body;
  _g144["lower-do"] = lower_do;
  _g144["lower-if"] = lower_if;
  _g144["lower-try"] = lower_try;
  _g144["lower-while"] = lower_while;
  _g144["lower-for"] = lower_for;
  _g144["lower-function"] = lower_function;
  _g144["lower-definition"] = lower_definition;
  _g144["lower-call"] = lower_call;
  _g144["lower-special"] = lower_special;
  _g144.process = process;
  _g144["module-path"] = module_path;
  _g144.encapsulate = encapsulate;
  _g144["compile-file"] = compile_file;
  _g144.run = run;
  _g144["compiling?"] = compiling63;
  _g144["compiler-output"] = compiler_output;
  _g144["%compile-module"] = _37compile_module;
  _g144.prologue = prologue;
})();
(function () {
  var _g145 = nexus.runtime;
  var nil63 = _g145["nil?"];
  var is63 = _g145["is?"];
  var length = _g145.length;
  var none63 = _g145["none?"];
  var some63 = _g145["some?"];
  var hd = _g145.hd;
  var string63 = _g145["string?"];
  var number63 = _g145["number?"];
  var boolean63 = _g145["boolean?"];
  var function63 = _g145["function?"];
  var composite63 = _g145["composite?"];
  var atom63 = _g145["atom?"];
  var table63 = _g145["table?"];
  var list63 = _g145["list?"];
  var substring = _g145.substring;
  var sublist = _g145.sublist;
  var sub = _g145.sub;
  var inner = _g145.inner;
  var tl = _g145.tl;
  var char = _g145.char;
  var code = _g145.code;
  var string_literal63 = _g145["string-literal?"];
  var id_literal63 = _g145["id-literal?"];
  var add = _g145.add;
  var drop = _g145.drop;
  var last = _g145.last;
  var reverse = _g145.reverse;
  var join = _g145.join;
  var reduce = _g145.reduce;
  var keep = _g145.keep;
  var find = _g145.find;
  var pairwise = _g145.pairwise;
  var iterate = _g145.iterate;
  var replicate = _g145.replicate;
  var splice = _g145.splice;
  var map = _g145.map;
  var keys63 = _g145["keys?"];
  var empty63 = _g145["empty?"];
  var stash = _g145.stash;
  var unstash = _g145.unstash;
  var extend = _g145.extend;
  var exclude = _g145.exclude;
  var search = _g145.search;
  var split = _g145.split;
  var cat = _g145.cat;
  var _43 = _g145["+"];
  var _ = _g145["-"];
  var _42 = _g145["*"];
  var _47 = _g145["/"];
  var _37 = _g145["%"];
  var _62 = _g145[">"];
  var _60 = _g145["<"];
  var _61 = _g145["="];
  var _6261 = _g145[">="];
  var _6061 = _g145["<="];
  var read_file = _g145["read-file"];
  var write_file = _g145["write-file"];
  var write = _g145.write;
  var exit = _g145.exit;
  var parse_number = _g145["parse-number"];
  var to_string = _g145["to-string"];
  var apply = _g145.apply;
  var make_id = _g145["make-id"];
  var _37message_handler = _g145["%message-handler"];
  var toplevel63 = _g145["toplevel?"];
  var module_key = _g145["module-key"];
  var module = _g145.module;
  var setenv = _g145.setenv;
  var _g146 = nexus.utilities;
  var getenv = _g146.getenv;
  var macro_function = _g146["macro-function"];
  var macro63 = _g146["macro?"];
  var special63 = _g146["special?"];
  var special_form63 = _g146["special-form?"];
  var statement63 = _g146["statement?"];
  var symbol_expansion = _g146["symbol-expansion"];
  var symbol63 = _g146["symbol?"];
  var variable63 = _g146["variable?"];
  var bound63 = _g146["bound?"];
  var toplevel63 = _g146["toplevel?"];
  var quoted = _g146.quoted;
  var stash42 = _g146["stash*"];
  var bind = _g146.bind;
  var bind42 = _g146["bind*"];
  var quasiexpand = _g146.quasiexpand;
  var macroexpand = _g146.macroexpand;
  var indentation = _g146.indentation;
  var reserved63 = _g146["reserved?"];
  var valid_id63 = _g146["valid-id?"];
  var to_id = _g146["to-id"];
  var imported = _g146.imported;
  var exported = _g146.exported;
  var mapo = _g146.mapo;
  var quote_environment = _g146["quote-environment"];
  var quote_modules = _g146["quote-modules"];
  var initial_environment = _g146["initial-environment"];
  var _g149 = nexus.compiler;
  var compile_function = _g149["compile-function"];
  var compile = _g149.compile;
  var open_module = _g149["open-module"];
  var load_module = _g149["load-module"];
  var in_module = _g149["in-module"];
  var compile_module = _g149["compile-module"];
  var eval = _g149.eval;
})();
(function () {
  var _g315 = nexus.runtime;
  var nil63 = _g315["nil?"];
  var is63 = _g315["is?"];
  var length = _g315.length;
  var none63 = _g315["none?"];
  var some63 = _g315["some?"];
  var hd = _g315.hd;
  var string63 = _g315["string?"];
  var number63 = _g315["number?"];
  var boolean63 = _g315["boolean?"];
  var function63 = _g315["function?"];
  var composite63 = _g315["composite?"];
  var atom63 = _g315["atom?"];
  var table63 = _g315["table?"];
  var list63 = _g315["list?"];
  var substring = _g315.substring;
  var sublist = _g315.sublist;
  var sub = _g315.sub;
  var inner = _g315.inner;
  var tl = _g315.tl;
  var char = _g315.char;
  var code = _g315.code;
  var string_literal63 = _g315["string-literal?"];
  var id_literal63 = _g315["id-literal?"];
  var add = _g315.add;
  var drop = _g315.drop;
  var last = _g315.last;
  var reverse = _g315.reverse;
  var join = _g315.join;
  var reduce = _g315.reduce;
  var keep = _g315.keep;
  var find = _g315.find;
  var pairwise = _g315.pairwise;
  var iterate = _g315.iterate;
  var replicate = _g315.replicate;
  var splice = _g315.splice;
  var map = _g315.map;
  var keys63 = _g315["keys?"];
  var empty63 = _g315["empty?"];
  var stash = _g315.stash;
  var unstash = _g315.unstash;
  var extend = _g315.extend;
  var exclude = _g315.exclude;
  var search = _g315.search;
  var split = _g315.split;
  var cat = _g315.cat;
  var _43 = _g315["+"];
  var _ = _g315["-"];
  var _42 = _g315["*"];
  var _47 = _g315["/"];
  var _37 = _g315["%"];
  var _62 = _g315[">"];
  var _60 = _g315["<"];
  var _61 = _g315["="];
  var _6261 = _g315[">="];
  var _6061 = _g315["<="];
  var read_file = _g315["read-file"];
  var write_file = _g315["write-file"];
  var write = _g315.write;
  var exit = _g315.exit;
  var parse_number = _g315["parse-number"];
  var to_string = _g315["to-string"];
  var apply = _g315.apply;
  var make_id = _g315["make-id"];
  var _37message_handler = _g315["%message-handler"];
  var toplevel63 = _g315["toplevel?"];
  var module_key = _g315["module-key"];
  var module = _g315.module;
  var setenv = _g315.setenv;
  var _g316 = nexus.utilities;
  var getenv = _g316.getenv;
  var macro_function = _g316["macro-function"];
  var macro63 = _g316["macro?"];
  var special63 = _g316["special?"];
  var special_form63 = _g316["special-form?"];
  var statement63 = _g316["statement?"];
  var symbol_expansion = _g316["symbol-expansion"];
  var symbol63 = _g316["symbol?"];
  var variable63 = _g316["variable?"];
  var bound63 = _g316["bound?"];
  var toplevel63 = _g316["toplevel?"];
  var quoted = _g316.quoted;
  var stash42 = _g316["stash*"];
  var bind = _g316.bind;
  var bind42 = _g316["bind*"];
  var quasiexpand = _g316.quasiexpand;
  var macroexpand = _g316.macroexpand;
  var indentation = _g316.indentation;
  var reserved63 = _g316["reserved?"];
  var valid_id63 = _g316["valid-id?"];
  var to_id = _g316["to-id"];
  var imported = _g316.imported;
  var exported = _g316.exported;
  var mapo = _g316.mapo;
  var quote_environment = _g316["quote-environment"];
  var quote_modules = _g316["quote-modules"];
  var initial_environment = _g316["initial-environment"];
  var _g319 = nexus.compiler;
  var compile_function = _g319["compile-function"];
  var compile = _g319.compile;
  var open_module = _g319["open-module"];
  var load_module = _g319["load-module"];
  var in_module = _g319["in-module"];
  var compile_module = _g319["compile-module"];
  var eval = _g319.eval;
  global.target = "js";
})();
(function () {
  var _g585 = nexus.runtime;
  var nil63 = _g585["nil?"];
  var is63 = _g585["is?"];
  var length = _g585.length;
  var none63 = _g585["none?"];
  var some63 = _g585["some?"];
  var hd = _g585.hd;
  var string63 = _g585["string?"];
  var number63 = _g585["number?"];
  var boolean63 = _g585["boolean?"];
  var function63 = _g585["function?"];
  var composite63 = _g585["composite?"];
  var atom63 = _g585["atom?"];
  var table63 = _g585["table?"];
  var list63 = _g585["list?"];
  var substring = _g585.substring;
  var sublist = _g585.sublist;
  var sub = _g585.sub;
  var inner = _g585.inner;
  var tl = _g585.tl;
  var char = _g585.char;
  var code = _g585.code;
  var string_literal63 = _g585["string-literal?"];
  var id_literal63 = _g585["id-literal?"];
  var add = _g585.add;
  var drop = _g585.drop;
  var last = _g585.last;
  var reverse = _g585.reverse;
  var join = _g585.join;
  var reduce = _g585.reduce;
  var keep = _g585.keep;
  var find = _g585.find;
  var pairwise = _g585.pairwise;
  var iterate = _g585.iterate;
  var replicate = _g585.replicate;
  var splice = _g585.splice;
  var map = _g585.map;
  var keys63 = _g585["keys?"];
  var empty63 = _g585["empty?"];
  var stash = _g585.stash;
  var unstash = _g585.unstash;
  var extend = _g585.extend;
  var exclude = _g585.exclude;
  var search = _g585.search;
  var split = _g585.split;
  var cat = _g585.cat;
  var _43 = _g585["+"];
  var _ = _g585["-"];
  var _42 = _g585["*"];
  var _47 = _g585["/"];
  var _37 = _g585["%"];
  var _62 = _g585[">"];
  var _60 = _g585["<"];
  var _61 = _g585["="];
  var _6261 = _g585[">="];
  var _6061 = _g585["<="];
  var read_file = _g585["read-file"];
  var write_file = _g585["write-file"];
  var write = _g585.write;
  var exit = _g585.exit;
  var parse_number = _g585["parse-number"];
  var to_string = _g585["to-string"];
  var apply = _g585.apply;
  var make_id = _g585["make-id"];
  var _37message_handler = _g585["%message-handler"];
  var toplevel63 = _g585["toplevel?"];
  var module_key = _g585["module-key"];
  var module = _g585.module;
  var setenv = _g585.setenv;
  var _g586 = nexus.utilities;
  var getenv = _g586.getenv;
  var macro_function = _g586["macro-function"];
  var macro63 = _g586["macro?"];
  var special63 = _g586["special?"];
  var special_form63 = _g586["special-form?"];
  var statement63 = _g586["statement?"];
  var symbol_expansion = _g586["symbol-expansion"];
  var symbol63 = _g586["symbol?"];
  var variable63 = _g586["variable?"];
  var bound63 = _g586["bound?"];
  var toplevel63 = _g586["toplevel?"];
  var quoted = _g586.quoted;
  var stash42 = _g586["stash*"];
  var bind = _g586.bind;
  var bind42 = _g586["bind*"];
  var quasiexpand = _g586.quasiexpand;
  var macroexpand = _g586.macroexpand;
  var indentation = _g586.indentation;
  var reserved63 = _g586["reserved?"];
  var valid_id63 = _g586["valid-id?"];
  var to_id = _g586["to-id"];
  var imported = _g586.imported;
  var exported = _g586.exported;
  var mapo = _g586.mapo;
  var quote_environment = _g586["quote-environment"];
  var quote_modules = _g586["quote-modules"];
  var initial_environment = _g586["initial-environment"];
  var _g589 = nexus.compiler;
  var compile_function = _g589["compile-function"];
  var compile = _g589.compile;
  var open_module = _g589["open-module"];
  var load_module = _g589["load-module"];
  var in_module = _g589["in-module"];
  var compile_module = _g589["compile-module"];
  var eval = _g589.eval;
  global.modules = {main: {import: ["runtime", "special", "core", "reader", "compiler"], export: {save: {macro: function () {
    var specs = unstash(sublist(arguments, 0));
    var _g602 = sub(specs, 0);
    map(compile_module, _g602);
    return(undefined);
  }}}}, special: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"do": {stmt: true, tr: true, export: true, special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "";
    var _g603 = forms;
    var _g604 = 0;
    while ((_g604 < length(_g603))) {
      var x = _g603[_g604];
      str = (str + compile(x, {_stash: true, stmt: true}));
      _g604 = (_g604 + 1);
    }
    return(str);
  }, foo: true}, "%if": {stmt: true, tr: true, export: true, special: function (cond, cons, alt) {
    var _g605 = compile(cond);
    indent_level = (indent_level + 1);
    var _g608 = compile(cons, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var _g606 = _g608;
    var _g674;
    if (alt) {
      indent_level = (indent_level + 1);
      var _g609 = compile(alt, {_stash: true, stmt: true});
      indent_level = (indent_level - 1);
      _g674 = _g609;
    }
    var _g607 = _g674;
    var ind = indentation();
    var str = "";
    if ((target === "js")) {
      str = (str + ind + "if (" + _g605 + ") {\n" + _g606 + ind + "}");
    } else {
      str = (str + ind + "if " + _g605 + " then\n" + _g606);
    }
    if ((_g607 && (target === "js"))) {
      str = (str + " else {\n" + _g607 + ind + "}");
    } else {
      if (_g607) {
        str = (str + ind + "else\n" + _g607);
      }
    }
    if ((target === "lua")) {
      return((str + ind + "end\n"));
    } else {
      return((str + "\n"));
    }
  }, foo: true}, "while": {stmt: true, tr: true, export: true, special: function (cond, form) {
    var _g610 = compile(cond);
    indent_level = (indent_level + 1);
    var _g611 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g611;
    var ind = indentation();
    if ((target === "js")) {
      return((ind + "while (" + _g610 + ") {\n" + body + ind + "}\n"));
    } else {
      return((ind + "while " + _g610 + " do\n" + body + ind + "end\n"));
    }
  }, foo: true}, "%for": {stmt: true, tr: true, export: true, special: function (t, k, form) {
    var _g612 = compile(t);
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g613 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g613;
    if ((target === "lua")) {
      return((ind + "for " + k + " in next, " + _g612 + " do\n" + body + ind + "end\n"));
    } else {
      return((ind + "for (" + k + " in " + _g612 + ") {\n" + body + ind + "}\n"));
    }
  }, foo: true}, "%try": {stmt: true, tr: true, export: true, special: function (form) {
    var ind = indentation();
    indent_level = (indent_level + 1);
    var _g614 = compile(form, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var body = _g614;
    var e = make_id();
    var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
    indent_level = (indent_level + 1);
    var _g615 = compile(hf, {_stash: true, stmt: true});
    indent_level = (indent_level - 1);
    var h = _g615;
    return((ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n"));
  }, foo: true}, "break": {stmt: true, special: function () {
    return((indentation() + "break"));
  }, export: true, foo: true}, "%function": {special: function (args, body) {
    return(compile_function(args, body));
  }, export: true, foo: true}, "%global-function": {stmt: true, tr: true, export: true, special: function (name, args, body) {
    if ((target === "lua")) {
      var x = compile_function(args, body, {_stash: true, name: name});
      return((indentation() + x));
    } else {
      return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
    }
  }, foo: true}, "%local-function": {stmt: true, tr: true, export: true, special: function (name, args, body) {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local "});
    return((indentation() + x));
  }, foo: true}, "return": {stmt: true, special: function (x) {
    var _g675;
    if (nil63(x)) {
      _g675 = "return";
    } else {
      _g675 = ("return(" + compile(x) + ")");
    }
    var _g616 = _g675;
    return((indentation() + _g616));
  }, export: true, foo: true}, "error": {stmt: true, special: function (x) {
    var _g676;
    if ((target === "js")) {
      _g676 = ("throw new " + compile(["Error", x]));
    } else {
      _g676 = ("error(" + compile(x) + ")");
    }
    var e = _g676;
    return((indentation() + e));
  }, export: true, foo: true}, "%local": {stmt: true, special: function (name, value) {
    var id = compile(name);
    var value1 = compile(value);
    var _g677;
    if (is63(value)) {
      _g677 = (" = " + value1);
    } else {
      _g677 = "";
    }
    var rh = _g677;
    var _g678;
    if ((target === "js")) {
      _g678 = "var ";
    } else {
      _g678 = "local ";
    }
    var keyword = _g678;
    var ind = indentation();
    return((ind + keyword + id + rh));
  }, export: true, foo: true}, "set": {stmt: true, special: function (lh, rh) {
    var _g617 = compile(lh);
    var _g679;
    if (nil63(rh)) {
      _g679 = "nil";
    } else {
      _g679 = rh;
    }
    var _g618 = compile(_g679);
    return((indentation() + _g617 + " = " + _g618));
  }, export: true, foo: true}, "get": {special: function (t, k) {
    var _g619 = compile(t);
    var k1 = compile(k);
    if (((target === "lua") && (char(_g619, 0) === "{"))) {
      _g619 = ("(" + _g619 + ")");
    }
    if ((string_literal63(k) && valid_id63(inner(k)))) {
      return((_g619 + "." + inner(k)));
    } else {
      return((_g619 + "[" + k1 + "]"));
    }
  }, export: true, foo: true}, "not": {special: function (x) {
    var _g620 = compile(x);
    var _g680;
    if ((target === "js")) {
      _g680 = "!(";
    } else {
      _g680 = "(not ";
    }
    var open = _g680;
    return((open + _g620 + ")"));
  }, export: true, foo: true}, "%array": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var _g681;
    if ((target === "lua")) {
      _g681 = "{";
    } else {
      _g681 = "[";
    }
    var open = _g681;
    var _g682;
    if ((target === "lua")) {
      _g682 = "}";
    } else {
      _g682 = "]";
    }
    var close = _g682;
    var str = "";
    var _g621 = forms;
    var i = 0;
    while ((i < length(_g621))) {
      var x = _g621[i];
      str = (str + compile(x));
      if ((i < (length(forms) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((open + str + close));
  }, export: true, foo: true}, "%object": {special: function () {
    var forms = unstash(sublist(arguments, 0));
    var str = "{";
    var _g683;
    if ((target === "lua")) {
      _g683 = " = ";
    } else {
      _g683 = ": ";
    }
    var sep = _g683;
    var pairs = pairwise(forms);
    var _g622 = pairs;
    var i = 0;
    while ((i < length(_g622))) {
      var _g623 = _g622[i];
      var k = _g623[0];
      var v = _g623[1];
      if (!(string63(k))) {
        throw new Error(("Illegal key: " + to_string(k)));
      }
      var _g624 = compile(v);
      var _g684;
      if (valid_id63(k)) {
        _g684 = k;
      } else {
        var _g685;
        if (((target === "js") && string_literal63(k))) {
          _g685 = k;
        } else {
          var _g686;
          if ((target === "js")) {
            _g686 = quoted(k);
          } else {
            var _g687;
            if (string_literal63(k)) {
              _g687 = ("[" + k + "]");
            } else {
              _g687 = ("[" + quoted(k) + "]");
            }
            _g686 = _g687;
          }
          _g685 = _g686;
        }
        _g684 = _g685;
      }
      var _g625 = _g684;
      str = (str + _g625 + sep + _g624);
      if ((i < (length(pairs) - 1))) {
        str = (str + ", ");
      }
      i = (i + 1);
    }
    return((str + "}"));
  }, export: true, foo: true}}}, utilities: {import: ["runtime", "special", "core"], export: {getenv: {export: true, variable: true}, "macro-function": {export: true, variable: true}, "macro?": {export: true, variable: true}, "special?": {export: true, variable: true}, "special-form?": {export: true, variable: true}, "statement?": {export: true, variable: true}, "symbol-expansion": {export: true, variable: true}, "symbol?": {export: true, variable: true}, "variable?": {export: true, variable: true}, "bound?": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, quoted: {export: true, variable: true}, "stash*": {export: true, variable: true}, bind: {export: true, variable: true}, "bind*": {export: true, variable: true}, quasiexpand: {export: true, variable: true}, macroexpand: {export: true, variable: true}, indentation: {export: true, variable: true}, "with-indent": {export: true, macro: function (form) {
    var result = make_id();
    return(["do", ["inc", "indent-level"], ["let", [result, form], ["dec", "indent-level"], result]]);
  }}, "reserved?": {export: true, variable: true}, "valid-id?": {export: true, variable: true}, "to-id": {export: true, variable: true}, imported: {export: true, variable: true}, exported: {export: true, variable: true}, mapo: {export: true, variable: true}, "quote-environment": {export: true, variable: true}, "quote-modules": {export: true, variable: true}, "initial-environment": {export: true, variable: true}, "global?": {variable: true}, escape: {variable: true}, "quoting?": {variable: true}, "quasiquoting?": {variable: true}, "can-unquote?": {variable: true}, "quasisplice?": {variable: true}, "quasiquote-list": {variable: true}, "indent-level": {global: true, export: true}, reserved: {variable: true}, "numeric?": {variable: true}, "valid-char?": {variable: true}, "quote-binding": {variable: true}, "quote-frame": {variable: true}, "quote-module": {variable: true}}}, system: {import: ["special", "core"], export: {nexus: {global: true, export: true}}}, lib: {import: ["core", "special"], export: {}}, reader: {import: ["runtime", "special", "core"], export: {"make-stream": {export: true, variable: true}, "read-table": {export: true, variable: true}, "define-reader": {export: true, macro: function (_g626) {
    var char = _g626[0];
    var stream = _g626[1];
    var body = unstash(sublist(arguments, 1));
    var _g627 = sub(body, 0);
    return(["set", ["get", "read-table", char], join(["fn", [stream]], _g627)]);
  }}, read: {export: true, variable: true}, "read-all": {export: true, variable: true}, "read-from-string": {export: true, variable: true}, delimiters: {variable: true}, whitespace: {variable: true}, "peek-char": {variable: true}, "read-char": {variable: true}, "skip-non-code": {variable: true}, eof: {variable: true}, "key?": {variable: true}, "flag?": {variable: true}}}, compiler: {import: ["runtime", "utilities", "special", "core", "reader"], export: {"compile-function": {export: true, variable: true}, compile: {export: true, variable: true}, "open-module": {export: true, variable: true}, "load-module": {export: true, variable: true}, "in-module": {export: true, variable: true}, "compile-module": {export: true, variable: true}, eval: {export: true, variable: true}, infix: {variable: true}, getop: {variable: true}, "infix?": {variable: true}, "compile-args": {variable: true}, "compile-atom": {variable: true}, terminator: {variable: true}, "compile-special": {variable: true}, "compile-call": {variable: true}, "compile-infix": {variable: true}, "can-return?": {variable: true}, lower: {variable: true}, "lower-statement": {variable: true}, "lower-body": {variable: true}, "lower-do": {variable: true}, "lower-if": {variable: true}, "lower-try": {variable: true}, "lower-while": {variable: true}, "lower-for": {variable: true}, "lower-function": {variable: true}, "lower-definition": {variable: true}, "lower-call": {variable: true}, "lower-special": {variable: true}, process: {variable: true}, "current-module": {global: true, export: true}, "module-path": {variable: true}, encapsulate: {variable: true}, "compile-file": {variable: true}, run: {variable: true}, "compiling?": {variable: true}, "compiler-output": {variable: true}, "%compile-module": {variable: true}, prologue: {variable: true}}}, boot: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {"%initial-environment": {macro: function () {
    return(quote_environment(initial_environment()));
  }}, "%initial-modules": {macro: function () {
    return(quote_modules());
  }}, modules: {global: true, export: true}}}, runtime: {import: ["special", "core"], export: {"nil?": {export: true, variable: true}, "is?": {export: true, variable: true}, length: {export: true, variable: true}, "none?": {export: true, variable: true}, "some?": {export: true, variable: true}, hd: {export: true, variable: true}, "string?": {export: true, variable: true}, "number?": {export: true, variable: true}, "boolean?": {export: true, variable: true}, "function?": {export: true, variable: true}, "composite?": {export: true, variable: true}, "atom?": {export: true, variable: true}, "table?": {export: true, variable: true}, "list?": {export: true, variable: true}, substring: {export: true, variable: true}, sublist: {export: true, variable: true}, sub: {export: true, variable: true}, inner: {export: true, variable: true}, tl: {export: true, variable: true}, char: {export: true, variable: true}, code: {export: true, variable: true}, "string-literal?": {export: true, variable: true}, "id-literal?": {export: true, variable: true}, add: {export: true, variable: true}, drop: {export: true, variable: true}, last: {export: true, variable: true}, reverse: {export: true, variable: true}, join: {export: true, variable: true}, reduce: {export: true, variable: true}, keep: {export: true, variable: true}, find: {export: true, variable: true}, pairwise: {export: true, variable: true}, iterate: {export: true, variable: true}, replicate: {export: true, variable: true}, splice: {export: true, variable: true}, map: {export: true, variable: true}, "keys?": {export: true, variable: true}, "empty?": {export: true, variable: true}, stash: {export: true, variable: true}, unstash: {export: true, variable: true}, extend: {export: true, variable: true}, exclude: {export: true, variable: true}, search: {export: true, variable: true}, split: {export: true, variable: true}, cat: {export: true, variable: true}, "+": {export: true, variable: true}, "-": {export: true, variable: true}, "*": {export: true, variable: true}, "/": {export: true, variable: true}, "%": {export: true, variable: true}, ">": {export: true, variable: true}, "<": {export: true, variable: true}, "=": {export: true, variable: true}, ">=": {export: true, variable: true}, "<=": {export: true, variable: true}, "read-file": {export: true, variable: true}, "write-file": {export: true, variable: true}, write: {export: true, variable: true}, exit: {export: true, variable: true}, "parse-number": {export: true, variable: true}, "to-string": {export: true, variable: true}, apply: {export: true, variable: true}, "make-id": {export: true, variable: true}, "%message-handler": {export: true, variable: true}, "toplevel?": {export: true, variable: true}, "module-key": {export: true, variable: true}, module: {export: true, variable: true}, setenv: {export: true, variable: true}, type: {variable: true}, "splice?": {variable: true}, mapl: {variable: true}, require: {global: true, export: true}, fs: {variable: true}, print: {global: true, export: true}, "id-count": {variable: true}}}, optimizer: {import: ["runtime", "special", "core"], export: {optimize: {export: true, variable: true}, optimizations: {variable: true}, "define-optimization": {}}}, core: {import: ["runtime", "utilities", "special", "core", "compiler"], export: {quote: {macro: function (form) {
    return(quoted(form));
  }, export: true}, quasiquote: {macro: function (form) {
    return(quasiexpand(form, 1));
  }, export: true}, at: {macro: function (l, i) {
    if (((target === "lua") && number63(i))) {
      i = (i + 1);
    } else {
      if ((target === "lua")) {
        i = ["+", i, 1];
      }
    }
    return(["get", l, i]);
  }, export: true}, list: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var l = join(["%array"], body);
    if (!(keys63(body))) {
      return(l);
    } else {
      var id = make_id();
      var init = [];
      var _g628 = body;
      var k = undefined;
      for (k in _g628) {
        if (isNaN(parseInt(k))) {
          var v = _g628[k];
          add(init, ["set", ["get", id, ["quote", k]], v]);
        }
      }
      return(join(["let", [id, l]], join(init, [id])));
    }
  }, export: true}, "if": {macro: function () {
    var branches = unstash(sublist(arguments, 0));
    function step(_g629) {
      var a = _g629[0];
      var b = _g629[1];
      var c = sub(_g629, 2);
      if (is63(b)) {
        return([join(["%if", a, b], step(c))]);
      } else {
        if (is63(a)) {
          return([a]);
        }
      }
    }
    return(hd(step(branches)));
  }, export: true}, when: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g630 = sub(body, 0);
    return(["if", cond, join(["do"], _g630)]);
  }, export: true}, unless: {macro: function (cond) {
    var body = unstash(sublist(arguments, 1));
    var _g631 = sub(body, 0);
    return(["if", ["not", cond], join(["do"], _g631)]);
  }, export: true}, table: {macro: function () {
    var body = unstash(sublist(arguments, 0));
    return(join(["%object"], mapo(function (_g314, x) {
      return(x);
    }, body)));
  }, export: true}, let: {macro: function (bindings) {
    var body = unstash(sublist(arguments, 1));
    var _g632 = sub(body, 0);
    var i = 0;
    var renames = [];
    var locals = [];
    map(function (_g633) {
      var lh = _g633[0];
      var rh = _g633[1];
      var _g634 = bind(lh, rh);
      var _g635 = 0;
      while ((_g635 < length(_g634))) {
        var _g636 = _g634[_g635];
        var id = _g636[0];
        var val = _g636[1];
        if ((bound63(id) || reserved63(id) || toplevel63())) {
          var rename = make_id();
          add(renames, id);
          add(renames, rename);
          id = rename;
        } else {
          setenv(id, {_stash: true, variable: true});
        }
        add(locals, ["%local", id, val]);
        _g635 = (_g635 + 1);
      }
    }, pairwise(bindings));
    return(join(["do"], join(locals, [join(["let-symbol", renames], _g632)])));
  }, export: true}, "define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g637 = sub(body, 0);
    var imports = [];
    var imp = _g637.import;
    var exp = _g637.export;
    var _g638 = (imp || []);
    var _g639 = 0;
    while ((_g639 < length(_g638))) {
      var k = _g638[_g639];
      load_module(k);
      imports = join(imports, imported(k));
      _g639 = (_g639 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g640 = (exp || []);
    var _g641 = 0;
    while ((_g641 < length(_g640))) {
      var k = _g640[_g641];
      setenv(k, {_stash: true, export: true});
      _g641 = (_g641 + 1);
    }
    return(join(["do"], imports));
  }, export: true}, "define-macro": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g642 = sub(body, 0);
    var form = join(["fn", args], _g642);
    var _g643 = ["setenv", ["quote", name]];
    _g643.macro = form;
    _g643.form = ["quote", form];
    eval(_g643);
    return(undefined);
  }, export: true}, "define-special": {macro: function (name, args) {
    var body = unstash(sublist(arguments, 2));
    var _g644 = sub(body, 0);
    var form = join(["fn", args], _g644);
    var keys = sub(_g644, length(_g644));
    var _g645 = ["setenv", ["quote", name]];
    _g645.special = form;
    _g645.form = ["quote", form];
    eval(join(_g645, keys));
    return(undefined);
  }, export: true}, "define-symbol": {macro: function (name, expansion) {
    setenv(name, {_stash: true, symbol: expansion});
    return(undefined);
  }, export: true}, define: {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g646 = sub(body, 0);
    setenv(name, {_stash: true, variable: true});
    if (some63(_g646)) {
      var _g647 = bind42(x, _g646);
      var args = _g647[0];
      var _g648 = _g647[1];
      return(join(["%local-function", name, args], _g648));
    } else {
      return(["%local", name, x]);
    }
  }, export: true}, "define*": {macro: function (name, x) {
    var body = unstash(sublist(arguments, 2));
    var _g649 = sub(body, 0);
    setenv(name, {_stash: true, global: true, export: true});
    if (some63(_g649)) {
      var _g650 = bind42(x, _g649);
      var args = _g650[0];
      var _g651 = _g650[1];
      return(join(["%global-function", name, args], _g651));
    } else {
      if ((target === "js")) {
        return(["set", ["get", "global", ["quote", to_id(name)]], x]);
      } else {
        return(["set", name, x]);
      }
    }
  }, export: true}, "with-bindings": {macro: function (_g652) {
    var names = _g652[0];
    var body = unstash(sublist(arguments, 1));
    var _g653 = sub(body, 0);
    var x = make_id();
    var _g655 = ["setenv", x];
    _g655.variable = true;
    var _g654 = ["with-frame", ["each", [x], names, _g655]];
    _g654.scope = true;
    return(join(_g654, _g653));
  }, export: true}, "let-macro": {macro: function (definitions) {
    var body = unstash(sublist(arguments, 1));
    var _g656 = sub(body, 0);
    add(environment, {});
    map(function (m) {
      return(macroexpand(join(["define-macro"], m)));
    }, definitions);
    var _g657 = join(["do"], macroexpand(_g656));
    drop(environment);
    return(_g657);
  }, export: true}, "let-symbol": {macro: function (expansions) {
    var body = unstash(sublist(arguments, 1));
    var _g658 = sub(body, 0);
    add(environment, {});
    map(function (_g660) {
      var name = _g660[0];
      var exp = _g660[1];
      return(macroexpand(["define-symbol", name, exp]));
    }, pairwise(expansions));
    var _g659 = join(["do"], macroexpand(_g658));
    drop(environment);
    return(_g659);
  }, export: true}, fn: {macro: function (args) {
    var body = unstash(sublist(arguments, 1));
    var _g661 = sub(body, 0);
    var _g662 = bind42(args, _g661);
    var _g663 = _g662[0];
    var _g664 = _g662[1];
    return(join(["%function", _g663], _g664));
  }, export: true}, guard: {macro: function (expr) {
    if ((target === "js")) {
      return([["fn", [], ["%try", ["list", true, expr]]]]);
    } else {
      var e = make_id();
      var x = make_id();
      var ex = ("|" + e + "," + x + "|");
      return(["let", [ex, ["xpcall", ["fn", [], expr], "%message-handler"]], ["list", e, x]]);
    }
  }, export: true}, each: {macro: function (b, t) {
    var body = unstash(sublist(arguments, 2));
    var _g665 = sub(body, 0);
    var k = b[0];
    var v = b[1];
    var t1 = make_id();
    var _g688;
    if (nil63(v)) {
      var _g689;
      if (b.i) {
        _g689 = "i";
      } else {
        _g689 = make_id();
      }
      var i = _g689;
      _g688 = ["let", [i, 0], ["while", ["<", i, ["length", t1]], join(["let", [k, ["at", t1, i]]], _g665), ["inc", i]]];
    } else {
      var _g666 = ["target"];
      _g666.js = ["isNaN", ["parseInt", k]];
      _g666.lua = ["not", ["number?", k]];
      _g688 = ["let", [k, "nil"], ["%for", t1, k, ["when", _g666, join(["let", [v, ["get", t1, k]]], _g665)]]];
    }
    return(["let", [t1, t], _g688]);
  }, export: true}, "set-of": {macro: function () {
    var elements = unstash(sublist(arguments, 0));
    var l = [];
    var _g667 = elements;
    var _g668 = 0;
    while ((_g668 < length(_g667))) {
      var e = _g667[_g668];
      l[e] = true;
      _g668 = (_g668 + 1);
    }
    return(join(["table"], l));
  }, export: true}, language: {macro: function () {
    return(["quote", target]);
  }, export: true}, target: {export: true, global: true, macro: function () {
    var clauses = unstash(sublist(arguments, 0));
    return(clauses[target]);
  }}, "join*": {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    return(reduce(function (a, b) {
      return(["join", a, b]);
    }, xs));
  }, export: true}, "join!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g669 = sub(bs, 0);
    return(["set", a, join(["join*", a], _g669)]);
  }, export: true}, "cat!": {macro: function (a) {
    var bs = unstash(sublist(arguments, 1));
    var _g670 = sub(bs, 0);
    return(["set", a, join(["cat", a], _g670)]);
  }, export: true}, inc: {macro: function (n, by) {
    return(["set", n, ["+", n, (by || 1)]]);
  }, export: true}, dec: {macro: function (n, by) {
    return(["set", n, ["-", n, (by || 1)]]);
  }, export: true}, pr: {macro: function () {
    var xs = unstash(sublist(arguments, 0));
    var _g671 = map(function (x) {
      return(splice([["to-string", x], "\" \""]));
    }, xs);
    return(["print", join(["cat"], _g671)]);
  }, export: true}, "with-frame": {macro: function () {
    var body = unstash(sublist(arguments, 0));
    var _g672 = sub(body, 0);
    var scope = body.scope;
    var x = make_id();
    var _g673 = ["table"];
    _g673._scope = scope;
    return(["do", ["add", "environment", _g673], ["let", [x, join(["do"], _g672)], ["drop", "environment"], x]]);
  }, export: true}}}};
  global.environment = [{"define-module": {macro: function (spec) {
    var body = unstash(sublist(arguments, 1));
    var _g690 = sub(body, 0);
    var imports = [];
    var imp = _g690.import;
    var exp = _g690.export;
    var _g691 = (imp || []);
    var _g692 = 0;
    while ((_g692 < length(_g691))) {
      var k = _g691[_g692];
      load_module(k);
      imports = join(imports, imported(k));
      _g692 = (_g692 + 1);
    }
    modules[module_key(spec)] = {import: imp, export: {}};
    var _g693 = (exp || []);
    var _g694 = 0;
    while ((_g694 < length(_g693))) {
      var k = _g693[_g694];
      setenv(k, {_stash: true, export: true});
      _g694 = (_g694 + 1);
    }
    return(join(["do"], imports));
  }, export: true}}];
})();
(function () {
  var _g2 = nexus.runtime;
  var nil63 = _g2["nil?"];
  var is63 = _g2["is?"];
  var length = _g2.length;
  var none63 = _g2["none?"];
  var some63 = _g2["some?"];
  var hd = _g2.hd;
  var string63 = _g2["string?"];
  var number63 = _g2["number?"];
  var boolean63 = _g2["boolean?"];
  var function63 = _g2["function?"];
  var composite63 = _g2["composite?"];
  var atom63 = _g2["atom?"];
  var table63 = _g2["table?"];
  var list63 = _g2["list?"];
  var substring = _g2.substring;
  var sublist = _g2.sublist;
  var sub = _g2.sub;
  var inner = _g2.inner;
  var tl = _g2.tl;
  var char = _g2.char;
  var code = _g2.code;
  var string_literal63 = _g2["string-literal?"];
  var id_literal63 = _g2["id-literal?"];
  var add = _g2.add;
  var drop = _g2.drop;
  var last = _g2.last;
  var reverse = _g2.reverse;
  var join = _g2.join;
  var reduce = _g2.reduce;
  var keep = _g2.keep;
  var find = _g2.find;
  var pairwise = _g2.pairwise;
  var iterate = _g2.iterate;
  var replicate = _g2.replicate;
  var splice = _g2.splice;
  var map = _g2.map;
  var keys63 = _g2["keys?"];
  var empty63 = _g2["empty?"];
  var stash = _g2.stash;
  var unstash = _g2.unstash;
  var extend = _g2.extend;
  var exclude = _g2.exclude;
  var search = _g2.search;
  var split = _g2.split;
  var cat = _g2.cat;
  var _43 = _g2["+"];
  var _ = _g2["-"];
  var _42 = _g2["*"];
  var _47 = _g2["/"];
  var _37 = _g2["%"];
  var _62 = _g2[">"];
  var _60 = _g2["<"];
  var _61 = _g2["="];
  var _6261 = _g2[">="];
  var _6061 = _g2["<="];
  var read_file = _g2["read-file"];
  var write_file = _g2["write-file"];
  var write = _g2.write;
  var exit = _g2.exit;
  var parse_number = _g2["parse-number"];
  var to_string = _g2["to-string"];
  var apply = _g2.apply;
  var make_id = _g2["make-id"];
  var _37message_handler = _g2["%message-handler"];
  var toplevel63 = _g2["toplevel?"];
  var module_key = _g2["module-key"];
  var module = _g2.module;
  var setenv = _g2.setenv;
  var _g5 = nexus.reader;
  var make_stream = _g5["make-stream"];
  var read_table = _g5["read-table"];
  var read = _g5.read;
  var read_all = _g5["read-all"];
  var read_from_string = _g5["read-from-string"];
  var _g6 = nexus.compiler;
  var compile_function = _g6["compile-function"];
  var compile = _g6.compile;
  var open_module = _g6["open-module"];
  var load_module = _g6["load-module"];
  var in_module = _g6["in-module"];
  var compile_module = _g6["compile-module"];
  var eval = _g6.eval;
  function rep(str) {
    var _g696 = (function () {
      try {
        return([true, eval(read_from_string(str))]);
      }
      catch (_g699) {
        return([false, _g699.message]);
      }
    })();
    var _g1 = _g696[0];
    var x = _g696[1];
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
    var _g697 = args;
    var i = 0;
    while ((i < length(_g697))) {
      var arg = _g697[i];
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
  var _g698 = {};
  nexus.main = _g698;
  _g698.rep = rep;
  _g698.repl = repl;
  _g698.usage = usage;
  _g698.main = main;
})();
