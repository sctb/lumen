if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(function(require) {
var exports = {};
var passed = 0;
var failed = 0;
var tests = [];
var reader = require("reader");
var compiler = require("compiler");
setenv("test", {_stash: true, macro: function (x, msg) {
  return(["if", ["not", x], ["do", ["set", "failed", ["+", "failed", 1]], ["return", msg]], ["inc", "passed"]]);
}});
var equal63 = function (a, b) {
  if (atom63(a)) {
    return(a === b);
  } else {
    return(str(a) === str(b));
  }
};
setenv("test=", {_stash: true, macro: function (a, b) {
  return(["test", ["equal?", a, b], ["cat", "\"failed: expected \"", ["str", a], "\", was \"", ["str", b]]]);
}});
setenv("define-test", {_stash: true, macro: function (name) {
  var _r6 = unstash(Array.prototype.slice.call(arguments, 1));
  var _id1 = _r6;
  var body = cut(_id1, 0);
  return(["add", "tests", ["list", ["quote", name], join(["fn", join()], body)]]);
}});
run = function () {
  var _o = tests;
  var _i = undefined;
  for (_i in _o) {
    var _id2 = _o[_i];
    var name = _id2[0];
    var f = _id2[1];
    var _e;
    if (numeric63(_i)) {
      _e = parseInt(_i);
    } else {
      _e = _i;
    }
    var __i = _e;
    var result = f();
    if (string63(result)) {
      print(" " + name + " " + result);
    }
  }
  return(print(" " + passed + " passed, " + failed + " failed"));
};
add(tests, ["reader", function () {
  var read = reader["read-string"];
  if (! equal63(undefined, read(""))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(read("")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("nil", read("nil"))) {
    failed = failed + 1;
    return("failed: expected " + str("nil") + ", was " + str(read("nil")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, read("17"))) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(read("17")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(0.015, read("1.5e-2"))) {
    failed = failed + 1;
    return("failed: expected " + str(0.015) + ", was " + str(read("1.5e-2")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, read("true"))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(read("true")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(! true, read("false"))) {
    failed = failed + 1;
    return("failed: expected " + str(! true) + ", was " + str(read("false")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("hi", read("hi"))) {
    failed = failed + 1;
    return("failed: expected " + str("hi") + ", was " + str(read("hi")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("\"hi\"", read("\"hi\""))) {
    failed = failed + 1;
    return("failed: expected " + str("\"hi\"") + ", was " + str(read("\"hi\"")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("|hi|", read("|hi|"))) {
    failed = failed + 1;
    return("failed: expected " + str("|hi|") + ", was " + str(read("|hi|")));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2], read("(1 2)"))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2]) + ", was " + str(read("(1 2)")));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, ["a"]], read("(1 (a))"))) {
    failed = failed + 1;
    return("failed: expected " + str([1, ["a"]]) + ", was " + str(read("(1 (a))")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quote", "a"], read("'a"))) {
    failed = failed + 1;
    return("failed: expected " + str(["quote", "a"]) + ", was " + str(read("'a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", "a"], read("`a"))) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", "a"]) + ", was " + str(read("`a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["unquote", "a"]], read("`,a"))) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["unquote", "a"]]) + ", was " + str(read("`,a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["unquote-splicing", "a"]], read("`,@a"))) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["unquote-splicing", "a"]]) + ", was " + str(read("`,@a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, _35(read("(1 2 a: 7)")))) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(_35(read("(1 2 a: 7)"))));
  } else {
    passed = passed + 1;
  }
  if (! equal63(7, read("(1 2 a: 7)").a)) {
    failed = failed + 1;
    return("failed: expected " + str(7) + ", was " + str(read("(1 2 a: 7)").a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, read("(:a)").a)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(read("(:a)").a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, - -1)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(- -1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, nan63(read("nan")))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(nan63(read("nan"))));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, nan63(read("-nan")))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(nan63(read("-nan"))));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, inf63(read("inf")))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(inf63(read("inf"))));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, inf63(read("-inf")))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(inf63(read("-inf"))));
  } else {
    passed = passed + 1;
  }
  if (! equal63("0?", read("0?"))) {
    failed = failed + 1;
    return("failed: expected " + str("0?") + ", was " + str(read("0?")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("0!", read("0!"))) {
    failed = failed + 1;
    return("failed: expected " + str("0!") + ", was " + str(read("0!")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("0.", read("0."))) {
    failed = failed + 1;
    return("failed: expected " + str("0.") + ", was " + str(read("0.")));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["read-more", function () {
  var read = reader["read-string"];
  if (! equal63(17, read("17", true))) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(read("17", true)));
  } else {
    passed = passed + 1;
  }
  var more = [];
  if (! equal63(more, read("(open", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("(open", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("\"unterminated ", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("\"unterminated ", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("|identifier", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("|identifier", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("'(a b c", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("'(a b c", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("`(a b c", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("`(a b c", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("`(a b ,(z", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("`(a b ,(z", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("`\"biz", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("`\"biz", more)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(more, read("'\"boz", more))) {
    failed = failed + 1;
    return("failed: expected " + str(more) + ", was " + str(read("'\"boz", more)));
  } else {
    passed = passed + 1;
  }
  var _id3 = (function () {
    try {
      return([true, read("(open")]);
    }
    catch (_e60) {
      return([false, _e60.message, _e60.stack]);
    }
  })();
  var ok = _id3[0];
  var msg = _id3[1];
  if (! equal63(false, ok)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(ok));
  } else {
    passed = passed + 1;
  }
  if (! equal63("Expected ) at 5", msg)) {
    failed = failed + 1;
    return("failed: expected " + str("Expected ) at 5") + ", was " + str(msg));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["boolean", function () {
  if (! equal63(true, true || false)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(true || false));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, false || false)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(false || false));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, false || false || true)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(false || false || true));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, ! false)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(! false));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, !( false && true))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(!( false && true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, !( false || true))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(!( false || true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, true && true)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(true && true));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, true && false)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(true && false));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, true && true && false)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(true && true && false));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["short", function () {
  var _id46 = true;
  var _e1;
  if (_id46) {
    _e1 = _id46;
  } else {
    throw new Error("bad");
    _e1 = undefined;
  }
  if (! equal63(true, _e1)) {
    failed = failed + 1;
    var _id47 = true;
    var _e2;
    if (_id47) {
      _e2 = _id47;
    } else {
      throw new Error("bad");
      _e2 = undefined;
    }
    return("failed: expected " + str(true) + ", was " + str(_e2));
  } else {
    passed = passed + 1;
  }
  var _id48 = false;
  var _e3;
  if (_id48) {
    throw new Error("bad");
    _e3 = undefined;
  } else {
    _e3 = _id48;
  }
  if (! equal63(false, _e3)) {
    failed = failed + 1;
    var _id49 = false;
    var _e4;
    if (_id49) {
      throw new Error("bad");
      _e4 = undefined;
    } else {
      _e4 = _id49;
    }
    return("failed: expected " + str(false) + ", was " + str(_e4));
  } else {
    passed = passed + 1;
  }
  var a = true;
  var _id50 = true;
  var _e5;
  if (_id50) {
    _e5 = _id50;
  } else {
    a = false;
    _e5 = false;
  }
  if (! equal63(true, _e5)) {
    failed = failed + 1;
    var _id51 = true;
    var _e6;
    if (_id51) {
      _e6 = _id51;
    } else {
      a = false;
      _e6 = false;
    }
    return("failed: expected " + str(true) + ", was " + str(_e6));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, a)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  var _id52 = false;
  var _e7;
  if (_id52) {
    a = false;
    _e7 = true;
  } else {
    _e7 = _id52;
  }
  if (! equal63(false, _e7)) {
    failed = failed + 1;
    var _id53 = false;
    var _e8;
    if (_id53) {
      a = false;
      _e8 = true;
    } else {
      _e8 = _id53;
    }
    return("failed: expected " + str(false) + ", was " + str(_e8));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, a)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  var b = true;
  b = false;
  var _id54 = false;
  var _e9;
  if (_id54) {
    _e9 = _id54;
  } else {
    b = true;
    _e9 = b;
  }
  if (! equal63(true, _e9)) {
    failed = failed + 1;
    b = false;
    var _id55 = false;
    var _e10;
    if (_id55) {
      _e10 = _id55;
    } else {
      b = true;
      _e10 = b;
    }
    return("failed: expected " + str(true) + ", was " + str(_e10));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, b)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  b = true;
  var _id56 = b;
  var _e11;
  if (_id56) {
    _e11 = _id56;
  } else {
    b = true;
    _e11 = b;
  }
  if (! equal63(true, _e11)) {
    failed = failed + 1;
    b = true;
    var _id57 = b;
    var _e12;
    if (_id57) {
      _e12 = _id57;
    } else {
      b = true;
      _e12 = b;
    }
    return("failed: expected " + str(true) + ", was " + str(_e12));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, b)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  b = false;
  var _id58 = true;
  var _e13;
  if (_id58) {
    b = true;
    _e13 = b;
  } else {
    _e13 = _id58;
  }
  if (! equal63(true, _e13)) {
    failed = failed + 1;
    b = false;
    var _id59 = true;
    var _e14;
    if (_id59) {
      b = true;
      _e14 = b;
    } else {
      _e14 = _id59;
    }
    return("failed: expected " + str(true) + ", was " + str(_e14));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, b)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  b = false;
  var _id60 = b;
  var _e15;
  if (_id60) {
    b = true;
    _e15 = b;
  } else {
    _e15 = _id60;
  }
  if (! equal63(false, _e15)) {
    failed = failed + 1;
    b = false;
    var _id61 = b;
    var _e16;
    if (_id61) {
      b = true;
      _e16 = b;
    } else {
      _e16 = _id61;
    }
    return("failed: expected " + str(false) + ", was " + str(_e16));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, b)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(b));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["numeric", function () {
  if (! equal63(4, 2 + 2)) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(2 + 2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(18, 18)) {
    failed = failed + 1;
    return("failed: expected " + str(18) + ", was " + str(18));
  } else {
    passed = passed + 1;
  }
  if (! equal63(4, 7 - 3)) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(7 - 3));
  } else {
    passed = passed + 1;
  }
  if (! equal63(5, 10 / 2)) {
    failed = failed + 1;
    return("failed: expected " + str(5) + ", was " + str(10 / 2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(6, 2 * 3)) {
    failed = failed + 1;
    return("failed: expected " + str(6) + ", was " + str(2 * 3));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, 2.01 > 2)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(2.01 > 2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, 5 >= 5)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(5 >= 5));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, 2100 > 2000)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(2100 > 2000));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, 0.002 < 0.0021)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(0.002 < 0.0021));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, 2 < 2)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(2 < 2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, 2 <= 2)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(2 <= 2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(-7, - 7)) {
    failed = failed + 1;
    return("failed: expected " + str(-7) + ", was " + str(- 7));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["math", function () {
  if (! equal63(3, max(1, 3))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(max(1, 3)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, min(2, 7))) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(min(2, 7)));
  } else {
    passed = passed + 1;
  }
  var n = random();
  if (! equal63(true, n > 0 && n < 1)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(n > 0 && n < 1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(4, floor(4.78))) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(floor(4.78)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["precedence", function () {
  if (! equal63(-3, -( 1 + 2))) {
    failed = failed + 1;
    return("failed: expected " + str(-3) + ", was " + str(-( 1 + 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, 12 - (1 + 1))) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(12 - (1 + 1)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(11, 12 - 1 * 1)) {
    failed = failed + 1;
    return("failed: expected " + str(11) + ", was " + str(12 - 1 * 1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, 4 / 2 + 8)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(4 / 2 + 8));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["standalone", function () {
  if (! equal63(10, 10)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(10));
  } else {
    passed = passed + 1;
  }
  var x = undefined;
  x = 10;
  if (! equal63(9, 9)) {
    failed = failed + 1;
    x = 10;
    return("failed: expected " + str(9) + ", was " + str(9));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, x)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(x));
  } else {
    passed = passed + 1;
  }
  if (! equal63(12, 12)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(12));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["string", function () {
  if (! equal63(3, _35("foo"))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_35("foo")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, _35("\"a\""))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_35("\"a\"")));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", "a")) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str("a"));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", char("bar", 1))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(char("bar", 1)));
  } else {
    passed = passed + 1;
  }
  var s = "a\nb";
  if (! equal63(3, _35(s))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_35(s)));
  } else {
    passed = passed + 1;
  }
  var _s = "a\nb\nc";
  if (! equal63(5, _35(_s))) {
    failed = failed + 1;
    return("failed: expected " + str(5) + ", was " + str(_35(_s)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, _35("a\nb"))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_35("a\nb")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, _35("a\\b"))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_35("a\\b")));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["quote", function () {
  if (! equal63(7, 7)) {
    failed = failed + 1;
    return("failed: expected " + str(7) + ", was " + str(7));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, true)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(true));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, false)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(false));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", "a")) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str("a"));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quote", "a"], ["quote", "a"])) {
    failed = failed + 1;
    return("failed: expected " + str(["quote", "a"]) + ", was " + str(["quote", "a"]));
  } else {
    passed = passed + 1;
  }
  if (! equal63("\"a\"", "\"a\"")) {
    failed = failed + 1;
    return("failed: expected " + str("\"a\"") + ", was " + str("\"a\""));
  } else {
    passed = passed + 1;
  }
  if (! equal63("\"\\n\"", "\"\\n\"")) {
    failed = failed + 1;
    return("failed: expected " + str("\"\\n\"") + ", was " + str("\"\\n\""));
  } else {
    passed = passed + 1;
  }
  if (! equal63("\"\\\\\"", "\"\\\\\"")) {
    failed = failed + 1;
    return("failed: expected " + str("\"\\\\\"") + ", was " + str("\"\\\\\""));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quote", "\"a\""], ["quote", "\"a\""])) {
    failed = failed + 1;
    return("failed: expected " + str(["quote", "\"a\""]) + ", was " + str(["quote", "\"a\""]));
  } else {
    passed = passed + 1;
  }
  if (! equal63("|(|", "|(|")) {
    failed = failed + 1;
    return("failed: expected " + str("|(|") + ", was " + str("|(|"));
  } else {
    passed = passed + 1;
  }
  if (! equal63("unquote", "unquote")) {
    failed = failed + 1;
    return("failed: expected " + str("unquote") + ", was " + str("unquote"));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["unquote"], ["unquote"])) {
    failed = failed + 1;
    return("failed: expected " + str(["unquote"]) + ", was " + str(["unquote"]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["unquote", "a"], ["unquote", "a"])) {
    failed = failed + 1;
    return("failed: expected " + str(["unquote", "a"]) + ", was " + str(["unquote", "a"]));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["list", function () {
  if (! equal63([], [])) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str([]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], [])) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str([]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], ["a"])) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(["a"]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], ["a"])) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(["a"]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([[]], [[]])) {
    failed = failed + 1;
    return("failed: expected " + str([[]]) + ", was " + str([[]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(0, _35([]))) {
    failed = failed + 1;
    return("failed: expected " + str(0) + ", was " + str(_35([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, _35([1, 2]))) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(_35([1, 2])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3], [1, 2, 3])) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str([1, 2, 3]));
  } else {
    passed = passed + 1;
  }
  var _x111 = [];
  _x111.foo = 17;
  if (! equal63(17, _x111.foo)) {
    failed = failed + 1;
    var _x112 = [];
    _x112.foo = 17;
    return("failed: expected " + str(17) + ", was " + str(_x112.foo));
  } else {
    passed = passed + 1;
  }
  var _x113 = [1];
  _x113.foo = 17;
  if (! equal63(17, _x113.foo)) {
    failed = failed + 1;
    var _x114 = [1];
    _x114.foo = 17;
    return("failed: expected " + str(17) + ", was " + str(_x114.foo));
  } else {
    passed = passed + 1;
  }
  var _x115 = [];
  _x115.foo = true;
  if (! equal63(true, _x115.foo)) {
    failed = failed + 1;
    var _x116 = [];
    _x116.foo = true;
    return("failed: expected " + str(true) + ", was " + str(_x116.foo));
  } else {
    passed = passed + 1;
  }
  var _x117 = [];
  _x117.foo = true;
  if (! equal63(true, _x117.foo)) {
    failed = failed + 1;
    var _x118 = [];
    _x118.foo = true;
    return("failed: expected " + str(true) + ", was " + str(_x118.foo));
  } else {
    passed = passed + 1;
  }
  var _x120 = [];
  _x120.foo = true;
  if (! equal63(true, hd([_x120]).foo)) {
    failed = failed + 1;
    var _x122 = [];
    _x122.foo = true;
    return("failed: expected " + str(true) + ", was " + str(hd([_x122]).foo));
  } else {
    passed = passed + 1;
  }
  var _x123 = [];
  _x123.a = true;
  var _x124 = [];
  _x124.a = true;
  if (! equal63(_x123, _x124)) {
    failed = failed + 1;
    var _x125 = [];
    _x125.a = true;
    var _x126 = [];
    _x126.a = true;
    return("failed: expected " + str(_x125) + ", was " + str(_x126));
  } else {
    passed = passed + 1;
  }
  var _x127 = [];
  _x127.b = false;
  var _x128 = [];
  _x128.b = false;
  if (! equal63(_x127, _x128)) {
    failed = failed + 1;
    var _x129 = [];
    _x129.b = false;
    var _x130 = [];
    _x130.b = false;
    return("failed: expected " + str(_x129) + ", was " + str(_x130));
  } else {
    passed = passed + 1;
  }
  var _x131 = [];
  _x131.c = 0;
  var _x132 = [];
  _x132.c = 0;
  if (! equal63(_x131, _x132)) {
    failed = failed + 1;
    var _x133 = [];
    _x133.c = 0;
    var _x134 = [];
    _x134.c = 0;
    return("failed: expected " + str(_x133) + ", was " + str(_x134));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["quasiquote", function () {
  if (! equal63("a", "a")) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str("a"));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", "a")) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str("a"));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join())) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, undefined)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(undefined));
  } else {
    passed = passed + 1;
  }
  var a = 42;
  if (! equal63(42, a)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, a)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["unquote", "a"]], ["quasiquote", ["unquote", "a"]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["unquote", "a"]]) + ", was " + str(["quasiquote", ["unquote", "a"]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["unquote", 42]], ["quasiquote", ["unquote", a]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["unquote", 42]]) + ", was " + str(["quasiquote", ["unquote", a]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]], ["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]]) + ", was " + str(["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", ["quasiquote", ["unquote", ["unquote", 42]]]], ["quasiquote", ["quasiquote", ["unquote", ["unquote", a]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", ["quasiquote", ["unquote", ["unquote", 42]]]]) + ", was " + str(["quasiquote", ["quasiquote", ["unquote", ["unquote", a]]]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", ["quasiquote", ["b", ["unquote", "c"]]]], ["a", ["quasiquote", ["b", ["unquote", "c"]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["a", ["quasiquote", ["b", ["unquote", "c"]]]]) + ", was " + str(["a", ["quasiquote", ["b", ["unquote", "c"]]]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", ["quasiquote", ["b", ["unquote", 42]]]], ["a", ["quasiquote", ["b", ["unquote", a]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["a", ["quasiquote", ["b", ["unquote", 42]]]]) + ", was " + str(["a", ["quasiquote", ["b", ["unquote", a]]]]));
  } else {
    passed = passed + 1;
  }
  var b = "c";
  if (! equal63(["quote", "c"], ["quote", b])) {
    failed = failed + 1;
    return("failed: expected " + str(["quote", "c"]) + ", was " + str(["quote", b]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([42], [a])) {
    failed = failed + 1;
    return("failed: expected " + str([42]) + ", was " + str([a]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([[42]], [[a]])) {
    failed = failed + 1;
    return("failed: expected " + str([[42]]) + ", was " + str([[a]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([41, [42]], [41, [a]])) {
    failed = failed + 1;
    return("failed: expected " + str([41, [42]]) + ", was " + str([41, [a]]));
  } else {
    passed = passed + 1;
  }
  var c = [1, 2, 3];
  if (! equal63([[1, 2, 3]], [c])) {
    failed = failed + 1;
    return("failed: expected " + str([[1, 2, 3]]) + ", was " + str([c]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3], c)) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(c));
  } else {
    passed = passed + 1;
  }
  if (! equal63([0, 1, 2, 3], join([0], c))) {
    failed = failed + 1;
    return("failed: expected " + str([0, 1, 2, 3]) + ", was " + str(join([0], c)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([0, 1, 2, 3, 4], join([0], c, [4]))) {
    failed = failed + 1;
    return("failed: expected " + str([0, 1, 2, 3, 4]) + ", was " + str(join([0], c, [4])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([0, [1, 2, 3], 4], [0, c, 4])) {
    failed = failed + 1;
    return("failed: expected " + str([0, [1, 2, 3], 4]) + ", was " + str([0, c, 4]));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3, 1, 2, 3], join(c, c))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3, 1, 2, 3]) + ", was " + str(join(c, c)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([[1, 2, 3], 1, 2, 3], join([c], c))) {
    failed = failed + 1;
    return("failed: expected " + str([[1, 2, 3], 1, 2, 3]) + ", was " + str(join([c], c)));
  } else {
    passed = passed + 1;
  }
  var _a = 42;
  if (! equal63(["quasiquote", [["unquote-splicing", ["list", "a"]]]], ["quasiquote", [["unquote-splicing", ["list", "a"]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", [["unquote-splicing", ["list", "a"]]]]) + ", was " + str(["quasiquote", [["unquote-splicing", ["list", "a"]]]]));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["quasiquote", [["unquote-splicing", ["list", 42]]]], ["quasiquote", [["unquote-splicing", ["list", _a]]]])) {
    failed = failed + 1;
    return("failed: expected " + str(["quasiquote", [["unquote-splicing", ["list", 42]]]]) + ", was " + str(["quasiquote", [["unquote-splicing", ["list", _a]]]]));
  } else {
    passed = passed + 1;
  }
  var _x305 = [];
  _x305.foo = true;
  if (! equal63(true, _x305.foo)) {
    failed = failed + 1;
    var _x306 = [];
    _x306.foo = true;
    return("failed: expected " + str(true) + ", was " + str(_x306.foo));
  } else {
    passed = passed + 1;
  }
  var _a1 = 17;
  var b = [1, 2];
  var _c = {a: 10};
  var _x308 = [];
  _x308.a = 10;
  var d = _x308;
  var _x309 = [];
  _x309.foo = _a1;
  if (! equal63(17, _x309.foo)) {
    failed = failed + 1;
    var _x310 = [];
    _x310.foo = _a1;
    return("failed: expected " + str(17) + ", was " + str(_x310.foo));
  } else {
    passed = passed + 1;
  }
  var _x311 = [];
  _x311.foo = _a1;
  if (! equal63(2, _35(join(_x311, b)))) {
    failed = failed + 1;
    var _x312 = [];
    _x312.foo = _a1;
    return("failed: expected " + str(2) + ", was " + str(_35(join(_x312, b))));
  } else {
    passed = passed + 1;
  }
  var _x313 = [];
  _x313.foo = _a1;
  if (! equal63(17, _x313.foo)) {
    failed = failed + 1;
    var _x314 = [];
    _x314.foo = _a1;
    return("failed: expected " + str(17) + ", was " + str(_x314.foo));
  } else {
    passed = passed + 1;
  }
  var _x315 = [1];
  _x315.a = 10;
  if (! equal63(_x315, join([1], _c))) {
    failed = failed + 1;
    var _x317 = [1];
    _x317.a = 10;
    return("failed: expected " + str(_x317) + ", was " + str(join([1], _c)));
  } else {
    passed = passed + 1;
  }
  var _x319 = [1];
  _x319.a = 10;
  if (! equal63(_x319, join([1], d))) {
    failed = failed + 1;
    var _x321 = [1];
    _x321.a = 10;
    return("failed: expected " + str(_x321) + ", was " + str(join([1], d)));
  } else {
    passed = passed + 1;
  }
  var _x324 = [];
  _x324.foo = true;
  if (! equal63(true, hd([_x324]).foo)) {
    failed = failed + 1;
    var _x326 = [];
    _x326.foo = true;
    return("failed: expected " + str(true) + ", was " + str(hd([_x326]).foo));
  } else {
    passed = passed + 1;
  }
  var _x328 = [];
  _x328.foo = true;
  if (! equal63(true, hd([_x328]).foo)) {
    failed = failed + 1;
    var _x330 = [];
    _x330.foo = true;
    return("failed: expected " + str(true) + ", was " + str(hd([_x330]).foo));
  } else {
    passed = passed + 1;
  }
  var _x331 = [];
  _x331.foo = true;
  if (! equal63(true, _x331.foo)) {
    failed = failed + 1;
    var _x332 = [];
    _x332.foo = true;
    return("failed: expected " + str(true) + ", was " + str(_x332.foo));
  } else {
    passed = passed + 1;
  }
  var _x334 = [];
  _x334.foo = true;
  if (! equal63(true, join([1, 2, 3], _x334).foo)) {
    failed = failed + 1;
    var _x336 = [];
    _x336.foo = true;
    return("failed: expected " + str(true) + ", was " + str(join([1, 2, 3], _x336).foo));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, {foo: true}.foo)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str({foo: true}.foo));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, {bar: 17}.bar)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str({bar: 17}.bar));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, {baz: function () {
    return(17);
  }}.baz())) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str({baz: function () {
      return(17);
    }}.baz()));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["quasiexpand", function () {
  if (! equal63("a", macroexpand("a"))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(macroexpand("a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63([17], macroexpand([17]))) {
    failed = failed + 1;
    return("failed: expected " + str([17]) + ", was " + str(macroexpand([17])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, "z"], macroexpand([1, "z"]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, "z"]) + ", was " + str(macroexpand([1, "z"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", 1, "\"z\""], macroexpand(["quasiquote", [1, "z"]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", 1, "\"z\""]) + ", was " + str(macroexpand(["quasiquote", [1, "z"]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", 1, "z"], macroexpand(["quasiquote", [["unquote", 1], ["unquote", "z"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", 1, "z"]) + ", was " + str(macroexpand(["quasiquote", [["unquote", 1], ["unquote", "z"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63("z", macroexpand(["quasiquote", [["unquote-splicing", "z"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str("z") + ", was " + str(macroexpand(["quasiquote", [["unquote-splicing", "z"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["join", ["%array", 1], "z"], macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["join", ["%array", 1], "z"]) + ", was " + str(macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["join", ["%array", 1], "x", "y"], macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "x"], ["unquote-splicing", "y"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["join", ["%array", 1], "x", "y"]) + ", was " + str(macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "x"], ["unquote-splicing", "y"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["join", ["%array", 1], "z", ["%array", 2]], macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], ["unquote", 2]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["join", ["%array", 1], "z", ["%array", 2]]) + ", was " + str(macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], ["unquote", 2]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["join", ["%array", 1], "z", ["%array", "\"a\""]], macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], "a"]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["join", ["%array", 1], "z", ["%array", "\"a\""]]) + ", was " + str(macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], "a"]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63("\"x\"", macroexpand(["quasiquote", "x"]))) {
    failed = failed + 1;
    return("failed: expected " + str("\"x\"") + ", was " + str(macroexpand(["quasiquote", "x"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quasiquote\"", "\"x\""], macroexpand(["quasiquote", ["quasiquote", "x"]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quasiquote\"", "\"x\""]) + ", was " + str(macroexpand(["quasiquote", ["quasiquote", "x"]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quasiquote\"", ["%array", "\"quasiquote\"", "\"x\""]], macroexpand(["quasiquote", ["quasiquote", ["quasiquote", "x"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quasiquote\"", ["%array", "\"quasiquote\"", "\"x\""]]) + ", was " + str(macroexpand(["quasiquote", ["quasiquote", ["quasiquote", "x"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63("x", macroexpand(["quasiquote", ["unquote", "x"]]))) {
    failed = failed + 1;
    return("failed: expected " + str("x") + ", was " + str(macroexpand(["quasiquote", ["unquote", "x"]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quote\"", "x"], macroexpand(["quasiquote", ["quote", ["unquote", "x"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quote\"", "x"]) + ", was " + str(macroexpand(["quasiquote", ["quote", ["unquote", "x"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quasiquote\"", ["%array", "\"x\""]], macroexpand(["quasiquote", ["quasiquote", ["x"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quasiquote\"", ["%array", "\"x\""]]) + ", was " + str(macroexpand(["quasiquote", ["quasiquote", ["x"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quasiquote\"", ["%array", "\"unquote\"", "\"a\""]], macroexpand(["quasiquote", ["quasiquote", ["unquote", "a"]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quasiquote\"", ["%array", "\"unquote\"", "\"a\""]]) + ", was " + str(macroexpand(["quasiquote", ["quasiquote", ["unquote", "a"]]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%array", "\"quasiquote\"", ["%array", ["%array", "\"unquote\"", "\"x\""]]], macroexpand(["quasiquote", ["quasiquote", [["unquote", "x"]]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%array", "\"quasiquote\"", ["%array", ["%array", "\"unquote\"", "\"x\""]]]) + ", was " + str(macroexpand(["quasiquote", ["quasiquote", [["unquote", "x"]]]])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["calls", function () {
  var f = function () {
    return(42);
  };
  var l = [f];
  var t = {f: f};
  if (! equal63(42, f())) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(f()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, l[0]())) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(l[0]()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, t.f())) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(t.f()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, (function () {
    return;
  })())) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str((function () {
      return;
    })()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, (function (x) {
    return(x - 2);
  })(12))) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str((function (x) {
      return(x - 2);
    })(12)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["id", function () {
  var a = 10;
  var b = {x: 20};
  var f = function () {
    return(30);
  };
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, b.x)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(b.x));
  } else {
    passed = passed + 1;
  }
  if (! equal63(30, f())) {
    failed = failed + 1;
    return("failed: expected " + str(30) + ", was " + str(f()));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["names", function () {
  var a33 = 0;
  var b63 = 1;
  var _37 = 2;
  var _4242 = 3;
  var _break = 4;
  if (! equal63(0, a33)) {
    failed = failed + 1;
    return("failed: expected " + str(0) + ", was " + str(a33));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, b63)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(b63));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, _37)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(_37));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, _4242)) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(_4242));
  } else {
    passed = passed + 1;
  }
  if (! equal63(4, _break)) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(_break));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["set", function () {
  var a = 42;
  a = "bar";
  if (! equal63("bar", a)) {
    failed = failed + 1;
    return("failed: expected " + str("bar") + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  a = 10;
  var x = a;
  if (! equal63(10, x)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(x));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  a = false;
  if (! equal63(false, a)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  a = undefined;
  if (! equal63(undefined, a)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(a));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["wipe", function () {
  var _x501 = [];
  _x501.b = true;
  _x501.c = true;
  _x501.a = true;
  var x = _x501;
  delete x.a;
  if (! equal63(undefined, x.a)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(x.a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, x.b)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(x.b));
  } else {
    passed = passed + 1;
  }
  delete x.c;
  if (! equal63(undefined, x.c)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(x.c));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, x.b)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(x.b));
  } else {
    passed = passed + 1;
  }
  delete x.b;
  if (! equal63(undefined, x.b)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(x.b));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], x)) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(x));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["do", function () {
  var a = 17;
  a = 10;
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  a = 2;
  var b = a + 5;
  if (! equal63(a, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(a) + ", was " + str(2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(b, 7)) {
    failed = failed + 1;
    return("failed: expected " + str(b) + ", was " + str(7));
  } else {
    passed = passed + 1;
  }
  a = 10;
  a = 20;
  if (! equal63(20, a)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  a = 10;
  a = 20;
  if (! equal63(20, a)) {
    failed = failed + 1;
    a = 10;
    a = 20;
    return("failed: expected " + str(20) + ", was " + str(a));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["if", function () {
  if (! equal63("a", macroexpand(["if", "a"]))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(macroexpand(["if", "a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%if", "a", "b"], macroexpand(["if", "a", "b"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%if", "a", "b"]) + ", was " + str(macroexpand(["if", "a", "b"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%if", "a", "b", "c"], macroexpand(["if", "a", "b", "c"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%if", "a", "b", "c"]) + ", was " + str(macroexpand(["if", "a", "b", "c"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%if", "a", "b", ["%if", "c", "d"]], macroexpand(["if", "a", "b", "c", "d"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%if", "a", "b", ["%if", "c", "d"]]) + ", was " + str(macroexpand(["if", "a", "b", "c", "d"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["%if", "a", "b", ["%if", "c", "d", "e"]], macroexpand(["if", "a", "b", "c", "d", "e"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["%if", "a", "b", ["%if", "c", "d", "e"]]) + ", was " + str(macroexpand(["if", "a", "b", "c", "d", "e"])));
  } else {
    passed = passed + 1;
  }
  if (true) {
    if (! equal63(true, true)) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(true));
    } else {
      passed = passed + 1;
    }
  } else {
    if (! equal63(true, false)) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(false));
    } else {
      passed = passed + 1;
    }
  }
  if (false) {
    if (! equal63(true, false)) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(false));
    } else {
      passed = passed + 1;
    }
  } else {
    if (false) {
      if (! equal63(false, true)) {
        failed = failed + 1;
        return("failed: expected " + str(false) + ", was " + str(true));
      } else {
        passed = passed + 1;
      }
    } else {
      if (! equal63(true, true)) {
        failed = failed + 1;
        return("failed: expected " + str(true) + ", was " + str(true));
      } else {
        passed = passed + 1;
      }
    }
  }
  if (false) {
    if (! equal63(true, false)) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(false));
    } else {
      passed = passed + 1;
    }
  } else {
    if (false) {
      if (! equal63(false, true)) {
        failed = failed + 1;
        return("failed: expected " + str(false) + ", was " + str(true));
      } else {
        passed = passed + 1;
      }
    } else {
      if (false) {
        if (! equal63(false, true)) {
          failed = failed + 1;
          return("failed: expected " + str(false) + ", was " + str(true));
        } else {
          passed = passed + 1;
        }
      } else {
        if (! equal63(true, true)) {
          failed = failed + 1;
          return("failed: expected " + str(true) + ", was " + str(true));
        } else {
          passed = passed + 1;
        }
      }
    }
  }
  if (false) {
    if (! equal63(true, false)) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(false));
    } else {
      passed = passed + 1;
    }
  } else {
    if (true) {
      if (! equal63(true, true)) {
        failed = failed + 1;
        return("failed: expected " + str(true) + ", was " + str(true));
      } else {
        passed = passed + 1;
      }
    } else {
      if (false) {
        if (! equal63(false, true)) {
          failed = failed + 1;
          return("failed: expected " + str(false) + ", was " + str(true));
        } else {
          passed = passed + 1;
        }
      } else {
        if (! equal63(true, true)) {
          failed = failed + 1;
          return("failed: expected " + str(true) + ", was " + str(true));
        } else {
          passed = passed + 1;
        }
      }
    }
  }
  var _e17;
  if (true) {
    _e17 = 1;
  } else {
    _e17 = 2;
  }
  if (! equal63(1, _e17)) {
    failed = failed + 1;
    var _e18;
    if (true) {
      _e18 = 1;
    } else {
      _e18 = 2;
    }
    return("failed: expected " + str(1) + ", was " + str(_e18));
  } else {
    passed = passed + 1;
  }
  var _e19;
  var a = 10;
  if (a) {
    _e19 = 1;
  } else {
    _e19 = 2;
  }
  if (! equal63(1, _e19)) {
    failed = failed + 1;
    var _e20;
    var _a2 = 10;
    if (_a2) {
      _e20 = 1;
    } else {
      _e20 = 2;
    }
    return("failed: expected " + str(1) + ", was " + str(_e20));
  } else {
    passed = passed + 1;
  }
  var _e21;
  if (true) {
    var _a3 = 1;
    _e21 = _a3;
  } else {
    _e21 = 2;
  }
  if (! equal63(1, _e21)) {
    failed = failed + 1;
    var _e22;
    if (true) {
      var _a4 = 1;
      _e22 = _a4;
    } else {
      _e22 = 2;
    }
    return("failed: expected " + str(1) + ", was " + str(_e22));
  } else {
    passed = passed + 1;
  }
  var _e23;
  if (false) {
    _e23 = 2;
  } else {
    var _a5 = 1;
    _e23 = _a5;
  }
  if (! equal63(1, _e23)) {
    failed = failed + 1;
    var _e24;
    if (false) {
      _e24 = 2;
    } else {
      var _a6 = 1;
      _e24 = _a6;
    }
    return("failed: expected " + str(1) + ", was " + str(_e24));
  } else {
    passed = passed + 1;
  }
  var _e25;
  if (false) {
    _e25 = 2;
  } else {
    var _e26;
    if (true) {
      var _a7 = 1;
      _e26 = _a7;
    }
    _e25 = _e26;
  }
  if (! equal63(1, _e25)) {
    failed = failed + 1;
    var _e27;
    if (false) {
      _e27 = 2;
    } else {
      var _e28;
      if (true) {
        var _a8 = 1;
        _e28 = _a8;
      }
      _e27 = _e28;
    }
    return("failed: expected " + str(1) + ", was " + str(_e27));
  } else {
    passed = passed + 1;
  }
  var _e29;
  if (false) {
    _e29 = 2;
  } else {
    var _e30;
    if (false) {
      _e30 = 3;
    } else {
      var _a9 = 1;
      _e30 = _a9;
    }
    _e29 = _e30;
  }
  if (! equal63(1, _e29)) {
    failed = failed + 1;
    var _e31;
    if (false) {
      _e31 = 2;
    } else {
      var _e32;
      if (false) {
        _e32 = 3;
      } else {
        var _a10 = 1;
        _e32 = _a10;
      }
      _e31 = _e32;
    }
    return("failed: expected " + str(1) + ", was " + str(_e31));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["case", function () {
  var x = 10;
  var _e33;
  if (9 === x) {
    _e33 = 9;
  } else {
    var _e34;
    if (10 === x) {
      _e34 = 2;
    } else {
      _e34 = 4;
    }
    _e33 = _e34;
  }
  if (! equal63(2, _e33)) {
    failed = failed + 1;
    var _e35;
    if (9 === x) {
      _e35 = 9;
    } else {
      var _e36;
      if (10 === x) {
        _e36 = 2;
      } else {
        _e36 = 4;
      }
      _e35 = _e36;
    }
    return("failed: expected " + str(2) + ", was " + str(_e35));
  } else {
    passed = passed + 1;
  }
  var _x527 = "z";
  var _e37;
  if ("z" === _x527) {
    _e37 = 9;
  } else {
    _e37 = 10;
  }
  if (! equal63(9, _e37)) {
    failed = failed + 1;
    var _e38;
    if ("z" === _x527) {
      _e38 = 9;
    } else {
      _e38 = 10;
    }
    return("failed: expected " + str(9) + ", was " + str(_e38));
  } else {
    passed = passed + 1;
  }
  var _e39;
  if ("a" === _x527) {
    _e39 = 1;
  } else {
    var _e40;
    if ("b" === _x527) {
      _e40 = 2;
    } else {
      _e40 = 7;
    }
    _e39 = _e40;
  }
  if (! equal63(7, _e39)) {
    failed = failed + 1;
    var _e41;
    if ("a" === _x527) {
      _e41 = 1;
    } else {
      var _e42;
      if ("b" === _x527) {
        _e42 = 2;
      } else {
        _e42 = 7;
      }
      _e41 = _e42;
    }
    return("failed: expected " + str(7) + ", was " + str(_e41));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["while", function () {
  var i = 0;
  while (i < 5) {
    if (i === 3) {
      break;
    } else {
      i = i + 1;
    }
  }
  if (! equal63(3, i)) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(i));
  } else {
    passed = passed + 1;
  }
  while (i < 10) {
    i = i + 1;
  }
  if (! equal63(10, i)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(i));
  } else {
    passed = passed + 1;
  }
  while (i < 15) {
    i = i + 1;
  }
  var a;
  if (! equal63(undefined, a)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(15, i)) {
    failed = failed + 1;
    return("failed: expected " + str(15) + ", was " + str(i));
  } else {
    passed = passed + 1;
  }
  while (i < 20) {
    if (i === 19) {
      break;
    } else {
      i = i + 1;
    }
  }
  var b;
  if (! equal63(undefined, a)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(19, i)) {
    failed = failed + 1;
    return("failed: expected " + str(19) + ", was " + str(i));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["for", function () {
  var l = [];
  var i = 0;
  while (i < 5) {
    add(l, i);
    i = i + 1;
  }
  if (! equal63([0, 1, 2, 3, 4], l)) {
    failed = failed + 1;
    return("failed: expected " + str([0, 1, 2, 3, 4]) + ", was " + str(l));
  } else {
    passed = passed + 1;
  }
  var _l = [];
  var i = 0;
  while (i < 2) {
    add(_l, i);
    i = i + 1;
  }
  if (! equal63([0, 1], _l)) {
    failed = failed + 1;
    var _l1 = [];
    var i = 0;
    while (i < 2) {
      add(_l1, i);
      i = i + 1;
    }
    return("failed: expected " + str([0, 1]) + ", was " + str(_l1));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["table", function () {
  if (! equal63(10, {a: 10}.a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str({a: 10}.a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, {a: true}.a)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str({a: true}.a));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["empty", function () {
  if (! equal63(true, empty63([]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(empty63([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, empty63({}))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(empty63({})));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, empty63([1]))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(empty63([1])));
  } else {
    passed = passed + 1;
  }
  var _x538 = [];
  _x538.a = true;
  if (! equal63(false, empty63(_x538))) {
    failed = failed + 1;
    var _x539 = [];
    _x539.a = true;
    return("failed: expected " + str(false) + ", was " + str(empty63(_x539)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, empty63({a: true}))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(empty63({a: true})));
  } else {
    passed = passed + 1;
  }
  var _x540 = [];
  _x540.b = false;
  if (! equal63(false, empty63(_x540))) {
    failed = failed + 1;
    var _x541 = [];
    _x541.b = false;
    return("failed: expected " + str(false) + ", was " + str(empty63(_x541)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["at", function () {
  var l = ["a", "b", "c", "d"];
  if (! equal63("a", l[0])) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(l[0]));
  } else {
    passed = passed + 1;
  }
  if (! equal63("b", l[1])) {
    failed = failed + 1;
    return("failed: expected " + str("b") + ", was " + str(l[1]));
  } else {
    passed = passed + 1;
  }
  l[0] = 9;
  if (! equal63(9, l[0])) {
    failed = failed + 1;
    return("failed: expected " + str(9) + ", was " + str(l[0]));
  } else {
    passed = passed + 1;
  }
  l[3] = 10;
  if (! equal63(10, l[3])) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(l[3]));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["get-set", function () {
  var t = {};
  t.foo = "bar";
  if (! equal63("bar", t.foo)) {
    failed = failed + 1;
    return("failed: expected " + str("bar") + ", was " + str(t.foo));
  } else {
    passed = passed + 1;
  }
  if (! equal63("bar", t.foo)) {
    failed = failed + 1;
    return("failed: expected " + str("bar") + ", was " + str(t.foo));
  } else {
    passed = passed + 1;
  }
  var k = "foo";
  if (! equal63("bar", t[k])) {
    failed = failed + 1;
    return("failed: expected " + str("bar") + ", was " + str(t[k]));
  } else {
    passed = passed + 1;
  }
  if (! equal63("bar", t["f" + "oo"])) {
    failed = failed + 1;
    return("failed: expected " + str("bar") + ", was " + str(t["f" + "oo"]));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["each", function () {
  var _x546 = [1, 2, 3];
  _x546.b = false;
  _x546.a = true;
  var t = _x546;
  var a = 0;
  var b = 0;
  var _o1 = t;
  var k = undefined;
  for (k in _o1) {
    var v = _o1[k];
    var _e43;
    if (numeric63(k)) {
      _e43 = parseInt(k);
    } else {
      _e43 = k;
    }
    var _k = _e43;
    if (number63(_k)) {
      a = a + 1;
    } else {
      b = b + 1;
    }
  }
  if (! equal63(3, a)) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, b)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  var _a11 = 0;
  var _o2 = t;
  var _i2 = undefined;
  for (_i2 in _o2) {
    var x = _o2[_i2];
    var _e44;
    if (numeric63(_i2)) {
      _e44 = parseInt(_i2);
    } else {
      _e44 = _i2;
    }
    var __i2 = _e44;
    _a11 = _a11 + 1;
  }
  if (! equal63(5, _a11)) {
    failed = failed + 1;
    return("failed: expected " + str(5) + ", was " + str(_a11));
  } else {
    passed = passed + 1;
  }
  var _x547 = [[1], [2]];
  _x547.b = [3];
  var _t = _x547;
  var _o3 = _t;
  var _i3 = undefined;
  for (_i3 in _o3) {
    var x = _o3[_i3];
    var _e45;
    if (numeric63(_i3)) {
      _e45 = parseInt(_i3);
    } else {
      _e45 = _i3;
    }
    var __i3 = _e45;
    if (! equal63(false, atom63(x))) {
      failed = failed + 1;
      return("failed: expected " + str(false) + ", was " + str(atom63(x)));
    } else {
      passed = passed + 1;
    }
  }
  var _o4 = _t;
  var _i4 = undefined;
  for (_i4 in _o4) {
    var x = _o4[_i4];
    var _e46;
    if (numeric63(_i4)) {
      _e46 = parseInt(_i4);
    } else {
      _e46 = _i4;
    }
    var __i4 = _e46;
    if (! equal63(false, atom63(x))) {
      failed = failed + 1;
      return("failed: expected " + str(false) + ", was " + str(atom63(x)));
    } else {
      passed = passed + 1;
    }
  }
  var _o5 = _t;
  var _i5 = undefined;
  for (_i5 in _o5) {
    var _id4 = _o5[_i5];
    var x = _id4[0];
    var _e47;
    if (numeric63(_i5)) {
      _e47 = parseInt(_i5);
    } else {
      _e47 = _i5;
    }
    var __i5 = _e47;
    if (! equal63(true, number63(x))) {
      failed = failed + 1;
      return("failed: expected " + str(true) + ", was " + str(number63(x)));
    } else {
      passed = passed + 1;
    }
  }
}]);
add(tests, ["fn", function () {
  var f = function (n) {
    return(n + 10);
  };
  if (! equal63(20, f(10))) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(f(10)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(30, f(20))) {
    failed = failed + 1;
    return("failed: expected " + str(30) + ", was " + str(f(20)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(40, (function (n) {
    return(n + 10);
  })(30))) {
    failed = failed + 1;
    return("failed: expected " + str(40) + ", was " + str((function (n) {
      return(n + 10);
    })(30)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([2, 3, 4], map(function (x) {
    return(x + 1);
  }, [1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str([2, 3, 4]) + ", was " + str(map(function (x) {
      return(x + 1);
    }, [1, 2, 3])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["define", function () {
  var x = 20;
  var f = function () {
    return(42);
  };
  if (! equal63(20, x)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(x));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, f())) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(f()));
  } else {
    passed = passed + 1;
  }
  (function () {
    var f = function () {
      return(38);
    };
    if (! equal63(38, f())) {
      failed = failed + 1;
      return("failed: expected " + str(38) + ", was " + str(f()));
    } else {
      passed = passed + 1;
      return(passed);
    }
  })();
  if (! equal63(42, f())) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(f()));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["return", function () {
  var a = (function () {
    return(17);
  })();
  if (! equal63(17, a)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  var _a12 = (function () {
    if (true) {
      return(10);
    } else {
      return(20);
    }
  })();
  if (! equal63(10, _a12)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(_a12));
  } else {
    passed = passed + 1;
  }
  var _a13 = (function () {
    while (false) {
      blah();
    }
  })();
  if (! equal63(undefined, _a13)) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(_a13));
  } else {
    passed = passed + 1;
  }
  var _a14 = 11;
  var b = (function () {
    _a14 = _a14 + 1;
    return(_a14);
  })();
  if (! equal63(12, b)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  if (! equal63(12, _a14)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(_a14));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["guard", function () {
  if (! equal63([true, 42], cut((function () {
    try {
      return([true, 42]);
    }
    catch (_e61) {
      return([false, _e61.message, _e61.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([true, 42]) + ", was " + str(cut((function () {
      try {
        return([true, 42]);
      }
      catch (_e62) {
        return([false, _e62.message, _e62.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([false, "foo"], cut((function () {
    try {
      throw new Error("foo");
      return([true]);
    }
    catch (_e63) {
      return([false, _e63.message, _e63.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([false, "foo"]) + ", was " + str(cut((function () {
      try {
        throw new Error("foo");
        return([true]);
      }
      catch (_e64) {
        return([false, _e64.message, _e64.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([false, "foo"], cut((function () {
    try {
      throw new Error("foo");
      throw new Error("baz");
      return([true]);
    }
    catch (_e65) {
      return([false, _e65.message, _e65.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([false, "foo"]) + ", was " + str(cut((function () {
      try {
        throw new Error("foo");
        throw new Error("baz");
        return([true]);
      }
      catch (_e66) {
        return([false, _e66.message, _e66.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([false, "baz"], cut((function () {
    try {
      cut((function () {
        try {
          throw new Error("foo");
          return([true]);
        }
        catch (_e68) {
          return([false, _e68.message, _e68.stack]);
        }
      })(), 0, 2);
      throw new Error("baz");
      return([true]);
    }
    catch (_e67) {
      return([false, _e67.message, _e67.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([false, "baz"]) + ", was " + str(cut((function () {
      try {
        cut((function () {
          try {
            throw new Error("foo");
            return([true]);
          }
          catch (_e70) {
            return([false, _e70.message, _e70.stack]);
          }
        })(), 0, 2);
        throw new Error("baz");
        return([true]);
      }
      catch (_e69) {
        return([false, _e69.message, _e69.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([true, 42], cut((function () {
    try {
      var _e48;
      if (true) {
        _e48 = 42;
      } else {
        throw new Error("baz");
        _e48 = undefined;
      }
      return([true, _e48]);
    }
    catch (_e71) {
      return([false, _e71.message, _e71.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([true, 42]) + ", was " + str(cut((function () {
      try {
        var _e49;
        if (true) {
          _e49 = 42;
        } else {
          throw new Error("baz");
          _e49 = undefined;
        }
        return([true, _e49]);
      }
      catch (_e72) {
        return([false, _e72.message, _e72.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([false, "baz"], cut((function () {
    try {
      var _e50;
      if (false) {
        _e50 = 42;
      } else {
        throw new Error("baz");
        _e50 = undefined;
      }
      return([true, _e50]);
    }
    catch (_e73) {
      return([false, _e73.message, _e73.stack]);
    }
  })(), 0, 2))) {
    failed = failed + 1;
    return("failed: expected " + str([false, "baz"]) + ", was " + str(cut((function () {
      try {
        var _e51;
        if (false) {
          _e51 = 42;
        } else {
          throw new Error("baz");
          _e51 = undefined;
        }
        return([true, _e51]);
      }
      catch (_e74) {
        return([false, _e74.message, _e74.stack]);
      }
    })(), 0, 2)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let", function () {
  var a = 10;
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  var _a15 = 10;
  if (! equal63(10, _a15)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(_a15));
  } else {
    passed = passed + 1;
  }
  var _a16 = 11;
  var b = 12;
  if (! equal63(11, _a16)) {
    failed = failed + 1;
    return("failed: expected " + str(11) + ", was " + str(_a16));
  } else {
    passed = passed + 1;
  }
  if (! equal63(12, b)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  var _a17 = 1;
  if (! equal63(1, _a17)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(_a17));
  } else {
    passed = passed + 1;
  }
  var _a18 = 2;
  if (! equal63(2, _a18)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(_a18));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, _a17)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(_a17));
  } else {
    passed = passed + 1;
  }
  var _a19 = 1;
  var _a20 = 2;
  var _a21 = 3;
  if (! equal63(_a21, 3)) {
    failed = failed + 1;
    return("failed: expected " + str(_a21) + ", was " + str(3));
  } else {
    passed = passed + 1;
  }
  if (! equal63(_a20, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(_a20) + ", was " + str(2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(_a19, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(_a19) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  var _a22 = 20;
  if (! equal63(20, _a22)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(_a22));
  } else {
    passed = passed + 1;
  }
  var _a23 = _a22 + 7;
  if (! equal63(27, _a23)) {
    failed = failed + 1;
    return("failed: expected " + str(27) + ", was " + str(_a23));
  } else {
    passed = passed + 1;
  }
  var _a24 = _a22 + 10;
  if (! equal63(30, _a24)) {
    failed = failed + 1;
    return("failed: expected " + str(30) + ", was " + str(_a24));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, _a22)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(_a22));
  } else {
    passed = passed + 1;
  }
  var _a25 = 10;
  if (! equal63(10, _a25)) {
    failed = failed + 1;
    var _a26 = 10;
    return("failed: expected " + str(10) + ", was " + str(_a26));
  } else {
    passed = passed + 1;
  }
  var b = 12;
  var _a27 = b;
  if (! equal63(12, _a27)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(_a27));
  } else {
    passed = passed + 1;
  }
  var _a29 = 10;
  var _a28 = _a29;
  if (! equal63(10, _a28)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(_a28));
  } else {
    passed = passed + 1;
  }
  var _a31 = 0;
  _a31 = 10;
  var _a30 = _a31 + 2 + 3;
  if (! equal63(_a30, 15)) {
    failed = failed + 1;
    return("failed: expected " + str(_a30) + ", was " + str(15));
  } else {
    passed = passed + 1;
  }
  (function (zz) {
    if (! equal63(20, zz)) {
      failed = failed + 1;
      return("failed: expected " + str(20) + ", was " + str(zz));
    } else {
      passed = passed + 1;
    }
    var _zz = 21;
    if (! equal63(21, _zz)) {
      failed = failed + 1;
      return("failed: expected " + str(21) + ", was " + str(_zz));
    } else {
      passed = passed + 1;
    }
    if (! equal63(20, zz)) {
      failed = failed + 1;
      return("failed: expected " + str(20) + ", was " + str(zz));
    } else {
      passed = passed + 1;
      return(passed);
    }
  })(20);
  var q = 9;
  return((function () {
    var _q = 10;
    if (! equal63(10, _q)) {
      failed = failed + 1;
      return("failed: expected " + str(10) + ", was " + str(_q));
    } else {
      passed = passed + 1;
    }
    if (! equal63(9, q)) {
      failed = failed + 1;
      return("failed: expected " + str(9) + ", was " + str(q));
    } else {
      passed = passed + 1;
      return(passed);
    }
  })());
}]);
add(tests, ["with", function () {
  var x = 9;
  x = x + 1;
  if (! equal63(10, x)) {
    failed = failed + 1;
    var _x591 = 9;
    _x591 = _x591 + 1;
    return("failed: expected " + str(10) + ", was " + str(_x591));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let-when", function () {
  var _y = "a" === "b";
  var _e52;
  if (_y) {
    var frips = _y;
    _e52 = 19;
  }
  if (! equal63(undefined, _e52)) {
    failed = failed + 1;
    var _y1 = "a" === "b";
    var _e53;
    if (_y1) {
      var frips = _y1;
      _e53 = 19;
    }
    return("failed: expected " + str(undefined) + ", was " + str(_e53));
  } else {
    passed = passed + 1;
  }
  var _y2 = 20;
  var _e54;
  if (_y2) {
    var frips = _y2;
    _e54 = frips - 1;
  }
  if (! equal63(19, _e54)) {
    failed = failed + 1;
    var _y3 = 20;
    var _e55;
    if (_y3) {
      var frips = _y3;
      _e55 = frips - 1;
    }
    return("failed: expected " + str(19) + ", was " + str(_e55));
  } else {
    passed = passed + 1;
  }
  var _y4 = [19, 20];
  var _e56;
  if (_y4) {
    var _id5 = _y4;
    var a = _id5[0];
    var b = _id5[1];
    _e56 = b;
  }
  if (! equal63(20, _e56)) {
    failed = failed + 1;
    var _y5 = [19, 20];
    var _e57;
    if (_y5) {
      var _id6 = _y5;
      var a = _id6[0];
      var b = _id6[1];
      _e57 = b;
    }
    return("failed: expected " + str(20) + ", was " + str(_e57));
  } else {
    passed = passed + 1;
  }
  var _y6 = undefined;
  var _e58;
  if (_y6) {
    var _id7 = _y6;
    var a = _id7[0];
    var b = _id7[1];
    _e58 = b;
  }
  if (! equal63(undefined, _e58)) {
    failed = failed + 1;
    var _y7 = undefined;
    var _e59;
    if (_y7) {
      var _id8 = _y7;
      var a = _id8[0];
      var b = _id8[1];
      _e59 = b;
    }
    return("failed: expected " + str(undefined) + ", was " + str(_e59));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
var zzop = 99;
var zzap = 100;
var _zzop = 10;
var _zzap = _zzop + 10;
var _x595 = [1, 2, 3];
_x595.b = 20;
_x595.a = 10;
var _id9 = _x595;
var zza = _id9[0];
var zzb = _id9[1];
add(tests, ["let-toplevel1", function () {
  if (! equal63(10, _zzop)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(_zzop));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, _zzap)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(_zzap));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, zza)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(zza));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, zzb)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(zzb));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let-toplevel", function () {
  if (! equal63(99, zzop)) {
    failed = failed + 1;
    return("failed: expected " + str(99) + ", was " + str(zzop));
  } else {
    passed = passed + 1;
  }
  if (! equal63(100, zzap)) {
    failed = failed + 1;
    return("failed: expected " + str(100) + ", was " + str(zzap));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["reserved", function () {
  var _end = "zz";
  var _try = "yy";
  var _return = 99;
  if (! equal63("zz", _end)) {
    failed = failed + 1;
    _return("failed: expected " + str("zz") + ", was " + str(_end));
  } else {
    passed = passed + 1;
  }
  if (! equal63("yy", _try)) {
    failed = failed + 1;
    _return("failed: expected " + str("yy") + ", was " + str(_try));
  } else {
    passed = passed + 1;
  }
  if (! equal63(99, _return)) {
    failed = failed + 1;
    _return("failed: expected " + str(99) + ", was " + str(_return));
  } else {
    passed = passed + 1;
  }
  var _var = function (_if, _end, _return) {
    return(_if + _end + _return);
  };
  if (! equal63(6, _var(1, 2, 3))) {
    failed = failed + 1;
    return("failed: expected " + str(6) + ", was " + str(_var(1, 2, 3)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["destructuring", function () {
  var _id10 = [1, 2, 3];
  var a = _id10[0];
  var b = _id10[1];
  var c = _id10[2];
  if (! equal63(1, a)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, b)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, c)) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(c));
  } else {
    passed = passed + 1;
  }
  var _id11 = [1, [2, [3], 4]];
  var w = _id11[0];
  var _id12 = _id11[1];
  var x = _id12[0];
  var _id13 = _id12[1];
  var y = _id13[0];
  var z = _id12[2];
  if (! equal63(1, w)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(w));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, x)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(x));
  } else {
    passed = passed + 1;
  }
  if (! equal63(3, y)) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(y));
  } else {
    passed = passed + 1;
  }
  if (! equal63(4, z)) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(z));
  } else {
    passed = passed + 1;
  }
  var _id14 = [1, 2, 3, 4];
  var a = _id14[0];
  var b = _id14[1];
  var c = cut(_id14, 2);
  if (! equal63([3, 4], c)) {
    failed = failed + 1;
    return("failed: expected " + str([3, 4]) + ", was " + str(c));
  } else {
    passed = passed + 1;
  }
  var _id15 = [1, [2, 3, 4], 5, 6, 7];
  var w = _id15[0];
  var _id16 = _id15[1];
  var x = _id16[0];
  var y = cut(_id16, 1);
  var z = cut(_id15, 2);
  if (! equal63([3, 4], y)) {
    failed = failed + 1;
    return("failed: expected " + str([3, 4]) + ", was " + str(y));
  } else {
    passed = passed + 1;
  }
  if (! equal63([5, 6, 7], z)) {
    failed = failed + 1;
    return("failed: expected " + str([5, 6, 7]) + ", was " + str(z));
  } else {
    passed = passed + 1;
  }
  var _id17 = {foo: 99};
  var foo = _id17.foo;
  if (! equal63(99, foo)) {
    failed = failed + 1;
    return("failed: expected " + str(99) + ", was " + str(foo));
  } else {
    passed = passed + 1;
  }
  var _x613 = [];
  _x613.foo = 99;
  var _id18 = _x613;
  var foo = _id18.foo;
  if (! equal63(99, foo)) {
    failed = failed + 1;
    return("failed: expected " + str(99) + ", was " + str(foo));
  } else {
    passed = passed + 1;
  }
  var _id19 = {foo: 99};
  var a = _id19.foo;
  if (! equal63(99, a)) {
    failed = failed + 1;
    return("failed: expected " + str(99) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  var _id20 = {foo: [98, 99]};
  var _id21 = _id20.foo;
  var a = _id21[0];
  var b = _id21[1];
  if (! equal63(98, a)) {
    failed = failed + 1;
    return("failed: expected " + str(98) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(99, b)) {
    failed = failed + 1;
    return("failed: expected " + str(99) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  var _x615 = [99];
  _x615.baz = true;
  var _id22 = {foo: 42, bar: _x615};
  var foo = _id22.foo;
  var _id23 = _id22.bar;
  var baz = _id23.baz;
  if (! equal63(42, foo)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(foo));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, baz)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(baz));
  } else {
    passed = passed + 1;
  }
  var _x617 = [20];
  _x617.foo = 17;
  var _x616 = [10, _x617];
  _x616.bar = [1, 2, 3];
  var _id24 = _x616;
  var a = _id24[0];
  var _id25 = _id24[1];
  var b = _id25[0];
  var foo = _id25.foo;
  var bar = _id24.bar;
  if (! equal63(10, a)) {
    failed = failed + 1;
    return("failed: expected " + str(10) + ", was " + str(a));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, b)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(b));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, foo)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(foo));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3], bar)) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(bar));
  } else {
    passed = passed + 1;
  }
  var yy = [1, 2, 3];
  var _id26 = yy;
  var xx = _id26[0];
  var _yy = _id26[1];
  var zz = cut(_id26, 2);
  if (! equal63(1, xx)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(xx));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, _yy)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(_yy));
  } else {
    passed = passed + 1;
  }
  if (! equal63([3], zz)) {
    failed = failed + 1;
    return("failed: expected " + str([3]) + ", was " + str(zz));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let-macro", function () {
  if (! equal63(17, 17)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(17));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, 32 + 10)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(32 + 10));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, 17)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(17));
  } else {
    passed = passed + 1;
  }
  var b = function () {
    return(20);
  };
  if (! equal63(18, 18)) {
    failed = failed + 1;
    return("failed: expected " + str(18) + ", was " + str(18));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, b())) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(b()));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, 1 + 1)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(1 + 1));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let-symbol", function () {
  if (! equal63(17, 17)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(17));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, 10 + 7)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(10 + 7));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(17, 17)) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(17));
  } else {
    passed = passed + 1;
  }
  var b = 20;
  if (! equal63(18, 18)) {
    failed = failed + 1;
    return("failed: expected " + str(18) + ", was " + str(18));
  } else {
    passed = passed + 1;
  }
  if (! equal63(20, b)) {
    failed = failed + 1;
    return("failed: expected " + str(20) + ", was " + str(b));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["define-symbol", function () {
  setenv("zzz", {_stash: true, symbol: 42});
  if (! equal63(42, 42)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(42));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["macros-and-symbols", function () {
  if (! equal63(2, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(1, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(2));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["macros-and-let", function () {
  var a = 10;
  if (! equal63(a, 10)) {
    failed = failed + 1;
    return("failed: expected " + str(a) + ", was " + str(10));
  } else {
    passed = passed + 1;
  }
  if (! equal63(12, 12)) {
    failed = failed + 1;
    return("failed: expected " + str(12) + ", was " + str(12));
  } else {
    passed = passed + 1;
  }
  if (! equal63(a, 10)) {
    failed = failed + 1;
    return("failed: expected " + str(a) + ", was " + str(10));
  } else {
    passed = passed + 1;
  }
  var b = 20;
  if (! equal63(b, 20)) {
    failed = failed + 1;
    return("failed: expected " + str(b) + ", was " + str(20));
  } else {
    passed = passed + 1;
  }
  if (! equal63(22, 22)) {
    failed = failed + 1;
    return("failed: expected " + str(22) + ", was " + str(22));
  } else {
    passed = passed + 1;
  }
  if (! equal63(b, 20)) {
    failed = failed + 1;
    return("failed: expected " + str(b) + ", was " + str(20));
  } else {
    passed = passed + 1;
  }
  if (! equal63(30, 30)) {
    failed = failed + 1;
    return("failed: expected " + str(30) + ", was " + str(30));
  } else {
    passed = passed + 1;
  }
  var _c1 = 32;
  if (! equal63(32, _c1)) {
    failed = failed + 1;
    return("failed: expected " + str(32) + ", was " + str(_c1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(30, 30)) {
    failed = failed + 1;
    return("failed: expected " + str(30) + ", was " + str(30));
  } else {
    passed = passed + 1;
  }
  if (! equal63(40, 40)) {
    failed = failed + 1;
    return("failed: expected " + str(40) + ", was " + str(40));
  } else {
    passed = passed + 1;
  }
  var _d = 42;
  if (! equal63(42, _d)) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(_d));
  } else {
    passed = passed + 1;
  }
  if (! equal63(40, 40)) {
    failed = failed + 1;
    return("failed: expected " + str(40) + ", was " + str(40));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["let-unique", function () {
  var ham = unique("ham");
  var chap = unique("chap");
  if (! equal63("_ham", ham)) {
    failed = failed + 1;
    return("failed: expected " + str("_ham") + ", was " + str(ham));
  } else {
    passed = passed + 1;
  }
  if (! equal63("_chap", chap)) {
    failed = failed + 1;
    return("failed: expected " + str("_chap") + ", was " + str(chap));
  } else {
    passed = passed + 1;
  }
  var _ham = unique("ham");
  if (! equal63("_ham1", _ham)) {
    failed = failed + 1;
    return("failed: expected " + str("_ham1") + ", was " + str(_ham));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["literals", function () {
  if (! equal63(true, true)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(true));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, false)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(false));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, -inf < -10000000000)) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(-inf < -10000000000));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, inf < -10000000000)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(inf < -10000000000));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, nan === nan)) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(nan === nan));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, nan63(nan))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(nan63(nan)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, nan63(nan * 20))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(nan63(nan * 20)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(-inf, - inf)) {
    failed = failed + 1;
    return("failed: expected " + str(-inf) + ", was " + str(- inf));
  } else {
    passed = passed + 1;
  }
  if (! equal63(inf, - -inf)) {
    failed = failed + 1;
    return("failed: expected " + str(inf) + ", was " + str(- -inf));
  } else {
    passed = passed + 1;
  }
  var Inf = 1;
  var NaN = 2;
  var _Inf = "a";
  var _NaN = "b";
  if (! equal63(Inf, 1)) {
    failed = failed + 1;
    return("failed: expected " + str(Inf) + ", was " + str(1));
  } else {
    passed = passed + 1;
  }
  if (! equal63(NaN, 2)) {
    failed = failed + 1;
    return("failed: expected " + str(NaN) + ", was " + str(2));
  } else {
    passed = passed + 1;
  }
  if (! equal63(_Inf, "a")) {
    failed = failed + 1;
    return("failed: expected " + str(_Inf) + ", was " + str("a"));
  } else {
    passed = passed + 1;
  }
  if (! equal63(_NaN, "b")) {
    failed = failed + 1;
    return("failed: expected " + str(_NaN) + ", was " + str("b"));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["add", function () {
  var l = [];
  add(l, "a");
  add(l, "b");
  add(l, "c");
  if (! equal63(["a", "b", "c"], l)) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b", "c"]) + ", was " + str(l));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, add([], "a"))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(add([], "a")));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["drop", function () {
  var l = ["a", "b", "c"];
  if (! equal63("c", drop(l))) {
    failed = failed + 1;
    return("failed: expected " + str("c") + ", was " + str(drop(l)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("b", drop(l))) {
    failed = failed + 1;
    return("failed: expected " + str("b") + ", was " + str(drop(l)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", drop(l))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(drop(l)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, drop(l))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(drop(l)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["last", function () {
  if (! equal63(3, last([1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str(3) + ", was " + str(last([1, 2, 3])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, last([]))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(last([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63("c", last(["a", "b", "c"]))) {
    failed = failed + 1;
    return("failed: expected " + str("c") + ", was " + str(last(["a", "b", "c"])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["join", function () {
  if (! equal63([1, 2, 3], join([1, 2], [3]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(join([1, 2], [3])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2], join([], [1, 2]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2]) + ", was " + str(join([], [1, 2])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join([], []))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join([], [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join(undefined, undefined))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join(undefined, undefined)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join(undefined, []))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join(undefined, [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join())) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join()));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], join([]))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(join([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1], join([1], undefined))) {
    failed = failed + 1;
    return("failed: expected " + str([1]) + ", was " + str(join([1], undefined)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], join(["a"], []))) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(join(["a"], [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], join(undefined, ["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(join(undefined, ["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], join(["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(join(["a"])));
  } else {
    passed = passed + 1;
  }
  var _x675 = ["a"];
  _x675.b = true;
  if (! equal63(_x675, join(["a"], {b: true}))) {
    failed = failed + 1;
    var _x677 = ["a"];
    _x677.b = true;
    return("failed: expected " + str(_x677) + ", was " + str(join(["a"], {b: true})));
  } else {
    passed = passed + 1;
  }
  var _x679 = ["a", "b"];
  _x679.b = true;
  var _x681 = ["b"];
  _x681.b = true;
  if (! equal63(_x679, join(["a"], _x681))) {
    failed = failed + 1;
    var _x682 = ["a", "b"];
    _x682.b = true;
    var _x684 = ["b"];
    _x684.b = true;
    return("failed: expected " + str(_x682) + ", was " + str(join(["a"], _x684)));
  } else {
    passed = passed + 1;
  }
  var _x685 = ["a"];
  _x685.b = 10;
  var _x686 = ["a"];
  _x686.b = true;
  if (! equal63(_x685, join(_x686, {b: 10}))) {
    failed = failed + 1;
    var _x687 = ["a"];
    _x687.b = 10;
    var _x688 = ["a"];
    _x688.b = true;
    return("failed: expected " + str(_x687) + ", was " + str(join(_x688, {b: 10})));
  } else {
    passed = passed + 1;
  }
  var _x689 = [];
  _x689.b = 10;
  var _x690 = [];
  _x690.b = 10;
  if (! equal63(_x689, join({b: true}, _x690))) {
    failed = failed + 1;
    var _x691 = [];
    _x691.b = 10;
    var _x692 = [];
    _x692.b = 10;
    return("failed: expected " + str(_x691) + ", was " + str(join({b: true}, _x692)));
  } else {
    passed = passed + 1;
  }
  var _x693 = ["a"];
  _x693.b = 1;
  var _x694 = ["b"];
  _x694.c = 2;
  var t = join(_x693, _x694);
  if (! equal63(1, t.b)) {
    failed = failed + 1;
    return("failed: expected " + str(1) + ", was " + str(t.b));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, t.c)) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(t.c));
  } else {
    passed = passed + 1;
  }
  if (! equal63("b", t[1])) {
    failed = failed + 1;
    return("failed: expected " + str("b") + ", was " + str(t[1]));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["reverse", function () {
  if (! equal63([], reverse([]))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(reverse([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([3, 2, 1], reverse([1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str([3, 2, 1]) + ", was " + str(reverse([1, 2, 3])));
  } else {
    passed = passed + 1;
  }
  var _x700 = [3, 2, 1];
  _x700.a = true;
  var _x701 = [1, 2, 3];
  _x701.a = true;
  if (! equal63(_x700, reverse(_x701))) {
    failed = failed + 1;
    var _x702 = [3, 2, 1];
    _x702.a = true;
    var _x703 = [1, 2, 3];
    _x703.a = true;
    return("failed: expected " + str(_x702) + ", was " + str(reverse(_x703)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["map", function () {
  if (! equal63([], map(function (x) {
    return(x);
  }, []))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(map(function (x) {
      return(x);
    }, [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1], map(function (x) {
    return(x);
  }, [1]))) {
    failed = failed + 1;
    return("failed: expected " + str([1]) + ", was " + str(map(function (x) {
      return(x);
    }, [1])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([2, 3, 4], map(function (x) {
    return(x + 1);
  }, [1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str([2, 3, 4]) + ", was " + str(map(function (x) {
      return(x + 1);
    }, [1, 2, 3])));
  } else {
    passed = passed + 1;
  }
  var _x713 = [2, 3, 4];
  _x713.a = 5;
  var _x714 = [1, 2, 3];
  _x714.a = 4;
  if (! equal63(_x713, map(function (x) {
    return(x + 1);
  }, _x714))) {
    failed = failed + 1;
    var _x715 = [2, 3, 4];
    _x715.a = 5;
    var _x716 = [1, 2, 3];
    _x716.a = 4;
    return("failed: expected " + str(_x715) + ", was " + str(map(function (x) {
      return(x + 1);
    }, _x716)));
  } else {
    passed = passed + 1;
  }
  var _x717 = [];
  _x717.a = true;
  var _x718 = [];
  _x718.a = true;
  if (! equal63(_x717, map(function (x) {
    return(x);
  }, _x718))) {
    failed = failed + 1;
    var _x719 = [];
    _x719.a = true;
    var _x720 = [];
    _x720.a = true;
    return("failed: expected " + str(_x719) + ", was " + str(map(function (x) {
      return(x);
    }, _x720)));
  } else {
    passed = passed + 1;
  }
  var _x721 = [];
  _x721.b = false;
  var _x722 = [];
  _x722.b = false;
  if (! equal63(_x721, map(function (x) {
    return(x);
  }, _x722))) {
    failed = failed + 1;
    var _x723 = [];
    _x723.b = false;
    var _x724 = [];
    _x724.b = false;
    return("failed: expected " + str(_x723) + ", was " + str(map(function (x) {
      return(x);
    }, _x724)));
  } else {
    passed = passed + 1;
  }
  var _x725 = [];
  _x725.b = false;
  _x725.a = true;
  var _x726 = [];
  _x726.b = false;
  _x726.a = true;
  if (! equal63(_x725, map(function (x) {
    return(x);
  }, _x726))) {
    failed = failed + 1;
    var _x727 = [];
    _x727.b = false;
    _x727.a = true;
    var _x728 = [];
    _x728.b = false;
    _x728.a = true;
    return("failed: expected " + str(_x727) + ", was " + str(map(function (x) {
      return(x);
    }, _x728)));
  } else {
    passed = passed + 1;
  }
  var evens = function (x) {
    if (x % 2 === 0) {
      return(x);
    }
  };
  if (! equal63([2, 4, 6], map(evens, [1, 2, 3, 4, 5, 6]))) {
    failed = failed + 1;
    return("failed: expected " + str([2, 4, 6]) + ", was " + str(map(evens, [1, 2, 3, 4, 5, 6])));
  } else {
    passed = passed + 1;
  }
  var _x733 = [2, 4, 6];
  _x733.b = 8;
  var _x734 = [1, 2, 3, 4, 5, 6];
  _x734.b = 8;
  _x734.a = 7;
  if (! equal63(_x733, map(evens, _x734))) {
    failed = failed + 1;
    var _x735 = [2, 4, 6];
    _x735.b = 8;
    var _x736 = [1, 2, 3, 4, 5, 6];
    _x736.b = 8;
    _x736.a = 7;
    return("failed: expected " + str(_x735) + ", was " + str(map(evens, _x736)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["cut", function () {
  if (! equal63([], cut([]))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(cut([])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], cut(["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(cut(["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["b", "c"], cut(["a", "b", "c"], 1))) {
    failed = failed + 1;
    return("failed: expected " + str(["b", "c"]) + ", was " + str(cut(["a", "b", "c"], 1)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["b", "c"], cut(["a", "b", "c", "d"], 1, 3))) {
    failed = failed + 1;
    return("failed: expected " + str(["b", "c"]) + ", was " + str(cut(["a", "b", "c", "d"], 1, 3)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3], cut([1, 2, 3], 0, 10))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(cut([1, 2, 3], 0, 10)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1], cut([1, 2, 3], -4, 1))) {
    failed = failed + 1;
    return("failed: expected " + str([1]) + ", was " + str(cut([1, 2, 3], -4, 1)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3], cut([1, 2, 3], -4))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(cut([1, 2, 3], -4)));
  } else {
    passed = passed + 1;
  }
  var _x762 = [2];
  _x762.a = true;
  var _x763 = [1, 2];
  _x763.a = true;
  if (! equal63(_x762, cut(_x763, 1))) {
    failed = failed + 1;
    var _x764 = [2];
    _x764.a = true;
    var _x765 = [1, 2];
    _x765.a = true;
    return("failed: expected " + str(_x764) + ", was " + str(cut(_x765, 1)));
  } else {
    passed = passed + 1;
  }
  var _x766 = [];
  _x766.b = 2;
  _x766.a = true;
  var _x767 = [];
  _x767.b = 2;
  _x767.a = true;
  if (! equal63(_x766, cut(_x767))) {
    failed = failed + 1;
    var _x768 = [];
    _x768.b = 2;
    _x768.a = true;
    var _x769 = [];
    _x769.b = 2;
    _x769.a = true;
    return("failed: expected " + str(_x768) + ", was " + str(cut(_x769)));
  } else {
    passed = passed + 1;
  }
  var t = [1, 2, 3];
  if (! equal63([], cut(t, _35(t)))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(cut(t, _35(t))));
  } else {
    passed = passed + 1;
  }
  var _x771 = [1, 2, 3];
  _x771.a = true;
  var _t1 = _x771;
  var _x772 = [];
  _x772.a = true;
  if (! equal63(_x772, cut(_t1, _35(_t1)))) {
    failed = failed + 1;
    var _x773 = [];
    _x773.a = true;
    return("failed: expected " + str(_x773) + ", was " + str(cut(_t1, _35(_t1))));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["clip", function () {
  if (! equal63("uux", clip("quux", 1))) {
    failed = failed + 1;
    return("failed: expected " + str("uux") + ", was " + str(clip("quux", 1)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("uu", clip("quux", 1, 3))) {
    failed = failed + 1;
    return("failed: expected " + str("uu") + ", was " + str(clip("quux", 1, 3)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("", clip("quux", 5))) {
    failed = failed + 1;
    return("failed: expected " + str("") + ", was " + str(clip("quux", 5)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("ab", clip("ab", 0, 4))) {
    failed = failed + 1;
    return("failed: expected " + str("ab") + ", was " + str(clip("ab", 0, 4)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("ab", clip("ab", -4, 4))) {
    failed = failed + 1;
    return("failed: expected " + str("ab") + ", was " + str(clip("ab", -4, 4)));
  } else {
    passed = passed + 1;
  }
  if (! equal63("a", clip("ab", -1, 1))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(clip("ab", -1, 1)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["search", function () {
  if (! equal63(undefined, search("", "a"))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(search("", "a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(0, search("", ""))) {
    failed = failed + 1;
    return("failed: expected " + str(0) + ", was " + str(search("", "")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(0, search("a", ""))) {
    failed = failed + 1;
    return("failed: expected " + str(0) + ", was " + str(search("a", "")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(0, search("abc", "a"))) {
    failed = failed + 1;
    return("failed: expected " + str(0) + ", was " + str(search("abc", "a")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(2, search("abcd", "cd"))) {
    failed = failed + 1;
    return("failed: expected " + str(2) + ", was " + str(search("abcd", "cd")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, search("abcd", "ce"))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(search("abcd", "ce")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, search("abc", "z"))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(search("abc", "z")));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["split", function () {
  if (! equal63([], split("", ""))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(split("", "")));
  } else {
    passed = passed + 1;
  }
  if (! equal63([], split("", ","))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(split("", ",")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a"], split("a", ","))) {
    failed = failed + 1;
    return("failed: expected " + str(["a"]) + ", was " + str(split("a", ",")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", ""], split("a,", ","))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", ""]) + ", was " + str(split("a,", ",")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", "b"], split("a,b", ","))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b"]) + ", was " + str(split("a,b", ",")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", "b", ""], split("a,b,", ","))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b", ""]) + ", was " + str(split("a,b,", ",")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", "b"], split("azzb", "zz"))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b"]) + ", was " + str(split("azzb", "zz")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(["a", "b", ""], split("azzbzz", "zz"))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b", ""]) + ", was " + str(split("azzbzz", "zz")));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["reduce", function () {
  if (! equal63("a", reduce(function (a, b) {
    return(a + b);
  }, ["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str("a") + ", was " + str(reduce(function (a, b) {
      return(a + b);
    }, ["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(6, reduce(function (a, b) {
    return(a + b);
  }, [1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str(6) + ", was " + str(reduce(function (a, b) {
      return(a + b);
    }, [1, 2, 3])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, [2, 3]], reduce(function (a, b) {
    return([a, b]);
  }, [1, 2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, [2, 3]]) + ", was " + str(reduce(function (a, b) {
      return([a, b]);
    }, [1, 2, 3])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([1, 2, 3, 4, 5], reduce(function (a, b) {
    return(join(a, b));
  }, [[1], [2, 3], [4, 5]]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3, 4, 5]) + ", was " + str(reduce(function (a, b) {
      return(join(a, b));
    }, [[1], [2, 3], [4, 5]])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["keep", function () {
  if (! equal63([], keep(function (x) {
    return(x);
  }, []))) {
    failed = failed + 1;
    return("failed: expected " + str([]) + ", was " + str(keep(function (x) {
      return(x);
    }, [])));
  } else {
    passed = passed + 1;
  }
  var even = function (x) {
    return(x % 2 === 0);
  };
  if (! equal63([6], keep(even, [5, 6, 7]))) {
    failed = failed + 1;
    return("failed: expected " + str([6]) + ", was " + str(keep(even, [5, 6, 7])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([[1], [2, 3]], keep(some63, [[], [1], [], [2, 3]]))) {
    failed = failed + 1;
    return("failed: expected " + str([[1], [2, 3]]) + ", was " + str(keep(some63, [[], [1], [], [2, 3]])));
  } else {
    passed = passed + 1;
  }
  var even63 = function (x) {
    return(x % 2 === 0);
  };
  if (! equal63([2, 4, 6], keep(even63, [1, 2, 3, 4, 5, 6]))) {
    failed = failed + 1;
    return("failed: expected " + str([2, 4, 6]) + ", was " + str(keep(even63, [1, 2, 3, 4, 5, 6])));
  } else {
    passed = passed + 1;
  }
  var _x837 = [2, 4, 6];
  _x837.b = 8;
  var _x838 = [1, 2, 3, 4, 5, 6];
  _x838.b = 8;
  _x838.a = 7;
  if (! equal63(_x837, keep(even63, _x838))) {
    failed = failed + 1;
    var _x839 = [2, 4, 6];
    _x839.b = 8;
    var _x840 = [1, 2, 3, 4, 5, 6];
    _x840.b = 8;
    _x840.a = 7;
    return("failed: expected " + str(_x839) + ", was " + str(keep(even63, _x840)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["in?", function () {
  if (! equal63(true, in63("x", ["x", "y", "z"]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(in63("x", ["x", "y", "z"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, in63(7, [5, 6, 7]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(in63(7, [5, 6, 7])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(undefined, in63("baz", ["no", "can", "do"]))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(in63("baz", ["no", "can", "do"])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["find", function () {
  if (! equal63(undefined, find(function (x) {
    return(x);
  }, []))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(find(function (x) {
      return(x);
    }, [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(7, find(function (x) {
    return(x);
  }, [7]))) {
    failed = failed + 1;
    return("failed: expected " + str(7) + ", was " + str(find(function (x) {
      return(x);
    }, [7])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, find(function (x) {
    return(x === 7);
  }, [2, 4, 7]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(find(function (x) {
      return(x === 7);
    }, [2, 4, 7])));
  } else {
    passed = passed + 1;
  }
  var _x853 = [2, 4];
  _x853.foo = 7;
  if (! equal63(true, find(function (x) {
    return(x === 7);
  }, _x853))) {
    failed = failed + 1;
    var _x854 = [2, 4];
    _x854.foo = 7;
    return("failed: expected " + str(true) + ", was " + str(find(function (x) {
      return(x === 7);
    }, _x854)));
  } else {
    passed = passed + 1;
  }
  var _x855 = [2, 4];
  _x855.bar = true;
  if (! equal63(true, find(function (x) {
    return(x === true);
  }, _x855))) {
    failed = failed + 1;
    var _x856 = [2, 4];
    _x856.bar = true;
    return("failed: expected " + str(true) + ", was " + str(find(function (x) {
      return(x === true);
    }, _x856)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, in63(7, [2, 4, 7]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(in63(7, [2, 4, 7])));
  } else {
    passed = passed + 1;
  }
  var _x859 = [2, 4];
  _x859.foo = 7;
  if (! equal63(true, in63(7, _x859))) {
    failed = failed + 1;
    var _x860 = [2, 4];
    _x860.foo = 7;
    return("failed: expected " + str(true) + ", was " + str(in63(7, _x860)));
  } else {
    passed = passed + 1;
  }
  var _x861 = [2, 4];
  _x861.bar = true;
  if (! equal63(true, in63(true, _x861))) {
    failed = failed + 1;
    var _x862 = [2, 4];
    _x862.bar = true;
    return("failed: expected " + str(true) + ", was " + str(in63(true, _x862)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["find", function () {
  if (! equal63(undefined, first(function (x) {
    return(x);
  }, []))) {
    failed = failed + 1;
    return("failed: expected " + str(undefined) + ", was " + str(first(function (x) {
      return(x);
    }, [])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(7, first(function (x) {
    return(x);
  }, [7]))) {
    failed = failed + 1;
    return("failed: expected " + str(7) + ", was " + str(first(function (x) {
      return(x);
    }, [7])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, first(function (x) {
    return(x === 7);
  }, [2, 4, 7]))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(first(function (x) {
      return(x === 7);
    }, [2, 4, 7])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(4, first(function (x) {
    return(x > 3 && x);
  }, [1, 2, 3, 4, 5, 6]))) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(first(function (x) {
      return(x > 3 && x);
    }, [1, 2, 3, 4, 5, 6])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["sort", function () {
  if (! equal63(["a", "b", "c"], sort(["c", "a", "b"]))) {
    failed = failed + 1;
    return("failed: expected " + str(["a", "b", "c"]) + ", was " + str(sort(["c", "a", "b"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([3, 2, 1], sort([1, 2, 3], _62))) {
    failed = failed + 1;
    return("failed: expected " + str([3, 2, 1]) + ", was " + str(sort([1, 2, 3], _62)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["type", function () {
  if (! equal63(true, string63("abc"))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(string63("abc")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, string63(17))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(string63(17)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, string63(["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(string63(["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, string63(true))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(string63(true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, string63({}))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(string63({})));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, number63("abc"))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(number63("abc")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, number63(17))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(number63(17)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, number63(["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(number63(["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, number63(true))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(number63(true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, number63({}))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(number63({})));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, boolean63("abc"))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(boolean63("abc")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, boolean63(17))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(boolean63(17)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, boolean63(["a"]))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(boolean63(["a"])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, boolean63(true))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(boolean63(true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, boolean63({}))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(boolean63({})));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, atom63(undefined))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(atom63(undefined)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, atom63("abc"))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(atom63("abc")));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, atom63(42))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(atom63(42)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(true, atom63(true))) {
    failed = failed + 1;
    return("failed: expected " + str(true) + ", was " + str(atom63(true)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, atom63(function () {
  }))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(atom63(function () {
    })));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, atom63([1]))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(atom63([1])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(false, atom63({}))) {
    failed = failed + 1;
    return("failed: expected " + str(false) + ", was " + str(atom63({})));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["apply", function () {
  if (! equal63(4, apply(function (a, b) {
    return(a + b);
  }, [2, 2]))) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(apply(function (a, b) {
      return(a + b);
    }, [2, 2])));
  } else {
    passed = passed + 1;
  }
  if (! equal63([2, 2], apply(function () {
    var a = unstash(Array.prototype.slice.call(arguments, 0));
    return(a);
  }, [2, 2]))) {
    failed = failed + 1;
    return("failed: expected " + str([2, 2]) + ", was " + str(apply(function () {
      var a = unstash(Array.prototype.slice.call(arguments, 0));
      return(a);
    }, [2, 2])));
  } else {
    passed = passed + 1;
  }
  var t = [1];
  t.foo = 17;
  if (! equal63(17, apply(function () {
    var a = unstash(Array.prototype.slice.call(arguments, 0));
    return(a.foo);
  }, t))) {
    failed = failed + 1;
    return("failed: expected " + str(17) + ", was " + str(apply(function () {
      var a = unstash(Array.prototype.slice.call(arguments, 0));
      return(a.foo);
    }, t)));
  } else {
    passed = passed + 1;
  }
  var _x896 = [];
  _x896.foo = 42;
  if (! equal63(42, apply(function () {
    var _r182 = unstash(Array.prototype.slice.call(arguments, 0));
    var _id27 = _r182;
    var foo = _id27.foo;
    return(foo);
  }, _x896))) {
    failed = failed + 1;
    var _x897 = [];
    _x897.foo = 42;
    return("failed: expected " + str(42) + ", was " + str(apply(function () {
      var _r183 = unstash(Array.prototype.slice.call(arguments, 0));
      var _id28 = _r183;
      var foo = _id28.foo;
      return(foo);
    }, _x897)));
  } else {
    passed = passed + 1;
  }
  var _x900 = [];
  _x900.foo = 42;
  if (! equal63(42, apply(function (_x898) {
    var _id29 = _x898;
    var foo = _id29.foo;
    return(foo);
  }, [_x900]))) {
    failed = failed + 1;
    var _x903 = [];
    _x903.foo = 42;
    return("failed: expected " + str(42) + ", was " + str(apply(function (_x901) {
      var _id30 = _x901;
      var foo = _id30.foo;
      return(foo);
    }, [_x903])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["eval", function () {
  var eval = compiler.eval;
  if (! equal63(4, eval(["+", 2, 2]))) {
    failed = failed + 1;
    return("failed: expected " + str(4) + ", was " + str(eval(["+", 2, 2])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(5, eval(["let", "a", 3, ["+", 2, "a"]]))) {
    failed = failed + 1;
    return("failed: expected " + str(5) + ", was " + str(eval(["let", "a", 3, ["+", 2, "a"]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(9, eval(["do", ["define", "x", 7], ["+", "x", 2]]))) {
    failed = failed + 1;
    return("failed: expected " + str(9) + ", was " + str(eval(["do", ["define", "x", 7], ["+", "x", 2]])));
  } else {
    passed = passed + 1;
  }
  if (! equal63(6, eval(["apply", "+", ["quote", [1, 2, 3]]]))) {
    failed = failed + 1;
    return("failed: expected " + str(6) + ", was " + str(eval(["apply", "+", ["quote", [1, 2, 3]]])));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["call", function () {
  var f = function () {
    return(42);
  };
  if (! equal63(42, call(f))) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str(call(f)));
  } else {
    passed = passed + 1;
  }
  var fs = [function () {
    return(1);
  }, function () {
    return(10);
  }];
  if (! equal63([1, 10], map(call, fs))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 10]) + ", was " + str(map(call, fs)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
add(tests, ["parameters", function () {
  if (! equal63(42, (function (_x928) {
    var _id31 = _x928;
    var a = _id31[0];
    return(a);
  })([42]))) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str((function (_x930) {
      var _id32 = _x930;
      var a = _id32[0];
      return(a);
    })([42])));
  } else {
    passed = passed + 1;
  }
  var f = function (a, _x932) {
    var _id33 = _x932;
    var b = _id33[0];
    var c = _id33[1];
    return([a, b, c]);
  };
  if (! equal63([1, 2, 3], f(1, [2, 3]))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(f(1, [2, 3])));
  } else {
    passed = passed + 1;
  }
  var _f = function (a, _x938) {
    var _id34 = _x938;
    var b = _id34[0];
    var c = cut(_id34, 1);
    var _r195 = unstash(Array.prototype.slice.call(arguments, 2));
    var _id35 = _r195;
    var d = cut(_id35, 0);
    return([a, b, c, d]);
  };
  if (! equal63([1, 2, [3, 4], [5, 6, 7]], _f(1, [2, 3, 4], 5, 6, 7))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, [3, 4], [5, 6, 7]]) + ", was " + str(_f(1, [2, 3, 4], 5, 6, 7)));
  } else {
    passed = passed + 1;
  }
  if (! equal63([3, 4], (function (a, b) {
    var _r196 = unstash(Array.prototype.slice.call(arguments, 2));
    var _id36 = _r196;
    var c = cut(_id36, 0);
    return(c);
  })(1, 2, 3, 4))) {
    failed = failed + 1;
    return("failed: expected " + str([3, 4]) + ", was " + str((function (a, b) {
      var _r197 = unstash(Array.prototype.slice.call(arguments, 2));
      var _id37 = _r197;
      var c = cut(_id37, 0);
      return(c);
    })(1, 2, 3, 4)));
  } else {
    passed = passed + 1;
  }
  var _f1 = function (w, _x950) {
    var _id38 = _x950;
    var x = _id38[0];
    var y = cut(_id38, 1);
    var _r198 = unstash(Array.prototype.slice.call(arguments, 2));
    var _id39 = _r198;
    var z = cut(_id39, 0);
    return([y, z]);
  };
  if (! equal63([[3, 4], [5, 6, 7]], _f1(1, [2, 3, 4], 5, 6, 7))) {
    failed = failed + 1;
    return("failed: expected " + str([[3, 4], [5, 6, 7]]) + ", was " + str(_f1(1, [2, 3, 4], 5, 6, 7)));
  } else {
    passed = passed + 1;
  }
  if (! equal63(42, (function () {
    var _r199 = unstash(Array.prototype.slice.call(arguments, 0));
    var _id40 = _r199;
    var foo = _id40.foo;
    return(foo);
  })({_stash: true, foo: 42}))) {
    failed = failed + 1;
    return("failed: expected " + str(42) + ", was " + str((function () {
      var _r200 = unstash(Array.prototype.slice.call(arguments, 0));
      var _id41 = _r200;
      var foo = _id41.foo;
      return(foo);
    })({_stash: true, foo: 42})));
  } else {
    passed = passed + 1;
  }
  var _x961 = [];
  _x961.foo = 42;
  if (! equal63(42, (function (_x960) {
    var _id42 = _x960;
    var foo = _id42.foo;
    return(foo);
  })(_x961))) {
    failed = failed + 1;
    var _x963 = [];
    _x963.foo = 42;
    return("failed: expected " + str(42) + ", was " + str((function (_x962) {
      var _id43 = _x962;
      var foo = _id43.foo;
      return(foo);
    })(_x963)));
  } else {
    passed = passed + 1;
  }
  var _f2 = function (a, _x964) {
    var _id44 = _x964;
    var foo = _id44.foo;
    var _r203 = unstash(Array.prototype.slice.call(arguments, 2));
    var _id45 = _r203;
    var b = _id45.bar;
    return([a, b, foo]);
  };
  var _x967 = [];
  _x967.foo = 42;
  if (! equal63([10, 20, 42], _f2(10, _x967, {_stash: true, bar: 20}))) {
    failed = failed + 1;
    var _x969 = [];
    _x969.foo = 42;
    return("failed: expected " + str([10, 20, 42]) + ", was " + str(_f2(10, _x969, {_stash: true, bar: 20})));
  } else {
    passed = passed + 1;
  }
  var _f3 = function () {
    var args = unstash(Array.prototype.slice.call(arguments, 0));
    return(args);
  };
  if (! equal63([1, 2, 3], _f3(1, 2, 3))) {
    failed = failed + 1;
    return("failed: expected " + str([1, 2, 3]) + ", was " + str(_f3(1, 2, 3)));
  } else {
    passed = passed + 1;
    return(passed);
  }
}]);
return exports;
});
