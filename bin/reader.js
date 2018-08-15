var delimiters = {"(": true, ")": true, ";": true, "\r": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\r": true, "\n": true};
var stream = function (str, more) {
  return {pos: 0, string: str, len: _35(str), more: more};
};
var peek_char = function (s) {
  var ____id = s;
  var __pos = ____id.pos;
  var __len = ____id.len;
  var __string = ____id.string;
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c = peek_char(s);
  if (__c) {
    s.pos = s.pos + 1;
    return __c;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c1 = peek_char(s);
    if (nil63(__c1)) {
      break;
    } else {
      if (whitespace[__c1]) {
        read_char(s);
      } else {
        if (__c1 === ";") {
          while (__c1 && !( __c1 === "\n")) {
            __c1 = read_char(s);
          }
          skip_non_code(s);
        } else {
          break;
        }
      }
    }
  }
};
var read_table = {};
var eof = {};
var read = function (s) {
  skip_non_code(s);
  var __c2 = peek_char(s);
  if (is63(__c2)) {
    return (read_table[__c2] || read_table[""])(s);
  } else {
    return eof;
  }
};
var read_all = function (s) {
  var __l = [];
  while (true) {
    var __form = read(s);
    if (__form === eof) {
      break;
    }
    add(__l, __form);
  }
  return __l;
};
read_string = function (str, more) {
  var __x = read(stream(str, more));
  if (!( __x === eof)) {
    return __x;
  }
};
var key63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
};
var flag63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, 0) === ":";
};
var expected = function (s, c) {
  var ____id1 = s;
  var __more = ____id1.more;
  var __pos1 = ____id1.pos;
  return __more || error("Expected " + c + " at " + __pos1);
};
var wrap = function (s, x) {
  var __y = read(s);
  if (__y === s.more) {
    return __y;
  } else {
    return [x, __y];
  }
};
var hex_prefix63 = function (str) {
  var __e;
  if (code(str, 0) === 45) {
    __e = 1;
  } else {
    __e = 0;
  }
  var __i = __e;
  var __id2 = code(str, __i) === 48;
  var __e1;
  if (__id2) {
    __i = __i + 1;
    var __n = code(str, __i);
    __e1 = __n === 120 || __n === 88;
  } else {
    __e1 = __id2;
  }
  return __e1;
};
var maybe_number = function (str) {
  if (hex_prefix63(str)) {
    return parseInt(str, 16);
  } else {
    if (number_code63(code(str, edge(str)))) {
      return number(str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
read_table[""] = function (s) {
  var __str = "";
  while (true) {
    var __c3 = peek_char(s);
    if (__c3 && (! whitespace[__c3] && ! delimiters[__c3])) {
      __str = __str + read_char(s);
    } else {
      break;
    }
  }
  if (__str === "true") {
    return true;
  } else {
    if (__str === "false") {
      return false;
    } else {
      var __n1 = maybe_number(__str);
      if (real63(__n1)) {
        return __n1;
      } else {
        return __str;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r16 = undefined;
  var __l1 = [];
  while (nil63(__r16)) {
    skip_non_code(s);
    var __c4 = peek_char(s);
    if (__c4 === ")") {
      read_char(s);
      __r16 = __l1;
    } else {
      if (nil63(__c4)) {
        __r16 = expected(s, ")");
      } else {
        var __x2 = read(s);
        if (key63(__x2)) {
          var __k = clip(__x2, 0, edge(__x2));
          var __v = read(s);
          __l1[__k] = __v;
        } else {
          if (flag63(__x2)) {
            __l1[clip(__x2, 1)] = true;
          } else {
            add(__l1, __x2);
          }
        }
      }
    }
  }
  return __r16;
};
read_table[")"] = function (s) {
  return error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  read_char(s);
  var __r19 = undefined;
  var __str1 = "\"";
  while (nil63(__r19)) {
    var __c5 = peek_char(s);
    if (__c5 === "\"") {
      __r19 = __str1 + read_char(s);
    } else {
      if (nil63(__c5)) {
        __r19 = expected(s, "\"");
      } else {
        if (__c5 === "\\") {
          __str1 = __str1 + read_char(s);
        }
        __str1 = __str1 + read_char(s);
      }
    }
  }
  return __r19;
};
read_table["|"] = function (s) {
  read_char(s);
  var __r21 = undefined;
  var __str2 = "|";
  while (nil63(__r21)) {
    var __c6 = peek_char(s);
    if (__c6 === "|") {
      __r21 = __str2 + read_char(s);
    } else {
      if (nil63(__c6)) {
        __r21 = expected(s, "|");
      } else {
        __str2 = __str2 + read_char(s);
      }
    }
  }
  return __r21;
};
read_table["'"] = function (s) {
  read_char(s);
  return wrap(s, "quote");
};
read_table["`"] = function (s) {
  read_char(s);
  return wrap(s, "quasiquote");
};
read_table[","] = function (s) {
  read_char(s);
  if (peek_char(s) === "@") {
    read_char(s);
    return wrap(s, "unquote-splicing");
  } else {
    return wrap(s, "unquote");
  }
};
exports.stream = stream;
exports.read = read;
exports["read-all"] = read_all;
exports["read-string"] = read_string;
exports["read-table"] = read_table;
