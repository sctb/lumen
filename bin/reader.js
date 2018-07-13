var delimiters = {"(": true, ")": true, ";": true, "\r": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\r": true, "\n": true};
var stream = function (str, more) {
  return {pos: 0, string: str, len: _35(str), more: more};
};
var peekChar = function (s) {
  var ____id = s;
  var __pos = ____id.pos;
  var __len = ____id.len;
  var __string = ____id.string;
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var readChar = function (s) {
  var __c = peekChar(s);
  if (__c) {
    s.pos = s.pos + 1;
    return __c;
  }
};
var skipNonCode = function (s) {
  while (true) {
    var __c1 = peekChar(s);
    if (nil63(__c1)) {
      break;
    } else {
      if (whitespace[__c1]) {
        readChar(s);
      } else {
        if (__c1 === ";") {
          while (__c1 && !( __c1 === "\n")) {
            __c1 = readChar(s);
          }
          skipNonCode(s);
        } else {
          break;
        }
      }
    }
  }
};
var readTable = {};
var eof = {};
var read = function (s) {
  skipNonCode(s);
  var __c2 = peekChar(s);
  if (is63(__c2)) {
    return (readTable[__c2] || readTable[""])(s);
  } else {
    return eof;
  }
};
var readAll = function (s) {
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
readString = function (str, more) {
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
  var __id2 = __more;
  var __e;
  if (__id2) {
    __e = __id2;
  } else {
    throw new Error("Expected " + c + " at " + __pos1);
    __e = undefined;
  }
  return __e;
};
var wrap = function (s, x) {
  var __y = read(s);
  if (__y === s.more) {
    return __y;
  } else {
    return [x, __y];
  }
};
var hexPrefix63 = function (str) {
  var __e1;
  if (code(str, 0) === 45) {
    __e1 = 1;
  } else {
    __e1 = 0;
  }
  var __i = __e1;
  var __id3 = code(str, __i) === 48;
  var __e2;
  if (__id3) {
    __i = __i + 1;
    var __n = code(str, __i);
    __e2 = __n === 120 || __n === 88;
  } else {
    __e2 = __id3;
  }
  return __e2;
};
var maybeNumber = function (str) {
  if (hexPrefix63(str)) {
    return parseInt(str, 16);
  } else {
    if (numberCode63(code(str, edge(str)))) {
      return number(str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
readTable[""] = function (s) {
  var __str = "";
  while (true) {
    var __c3 = peekChar(s);
    if (__c3 && (! whitespace[__c3] && ! delimiters[__c3])) {
      __str = __str + readChar(s);
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
      var __n1 = maybeNumber(__str);
      if (real63(__n1)) {
        return __n1;
      } else {
        return __str;
      }
    }
  }
};
readTable["("] = function (s) {
  readChar(s);
  var __r16 = undefined;
  var __l1 = [];
  while (nil63(__r16)) {
    skipNonCode(s);
    var __c4 = peekChar(s);
    if (__c4 === ")") {
      readChar(s);
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
readTable[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
readTable["\""] = function (s) {
  readChar(s);
  var __r19 = undefined;
  var __str1 = "\"";
  while (nil63(__r19)) {
    var __c5 = peekChar(s);
    if (__c5 === "\"") {
      __r19 = __str1 + readChar(s);
    } else {
      if (nil63(__c5)) {
        __r19 = expected(s, "\"");
      } else {
        if (__c5 === "\\") {
          __str1 = __str1 + readChar(s);
        }
        __str1 = __str1 + readChar(s);
      }
    }
  }
  return __r19;
};
readTable["|"] = function (s) {
  readChar(s);
  var __r21 = undefined;
  var __str2 = "|";
  while (nil63(__r21)) {
    var __c6 = peekChar(s);
    if (__c6 === "|") {
      __r21 = __str2 + readChar(s);
    } else {
      if (nil63(__c6)) {
        __r21 = expected(s, "|");
      } else {
        __str2 = __str2 + readChar(s);
      }
    }
  }
  return __r21;
};
readTable["'"] = function (s) {
  readChar(s);
  return wrap(s, "quote");
};
readTable["`"] = function (s) {
  readChar(s);
  return wrap(s, "quasiquote");
};
readTable[","] = function (s) {
  readChar(s);
  if (peekChar(s) === "@") {
    readChar(s);
    return wrap(s, "unquote-splicing");
  } else {
    return wrap(s, "unquote");
  }
};
exports.stream = stream;
exports.read = read;
exports.readAll = readAll;
exports.readString = readString;
exports.readTable = readTable;
