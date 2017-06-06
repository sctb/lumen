var delimiters = {"(": true, ")": true, ";": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\n": true};
var stream = function (str, more) {
  return({pos: 0, string: str, len: _35(str), more: more});
};
var peek_char = function (s) {
  var __id_ = s;
  var _pos = __id_.pos;
  var _len = __id_.len;
  var _string = __id_.string;
  if (_pos < _len) {
    return(char(_string, _pos));
  }
};
var read_char = function (s) {
  var _c = peek_char(s);
  if (_c) {
    s.pos = s.pos + 1;
    return(_c);
  }
};
var skip_non_code = function (s) {
  while (true) {
    var _c1 = peek_char(s);
    if (nil63(_c1)) {
      break;
    } else {
      if (whitespace[_c1]) {
        read_char(s);
      } else {
        if (_c1 === ";") {
          while (_c1 && !( _c1 === "\n")) {
            _c1 = read_char(s);
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
  var _c2 = peek_char(s);
  if (is63(_c2)) {
    return((read_table[_c2] || read_table[""])(s));
  } else {
    return(eof);
  }
};
var read_all = function (s) {
  var _l = [];
  while (true) {
    var _form = read(s);
    if (_form === eof) {
      break;
    }
    add(_l, _form);
  }
  return(_l);
};
read_string = function (str, more) {
  var _x = read(stream(str, more));
  if (!( _x === eof)) {
    return(_x);
  }
};
var key63 = function (atom) {
  return(string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":");
};
var flag63 = function (atom) {
  return(string63(atom) && _35(atom) > 1 && char(atom, 0) === ":");
};
var expected = function (s, c) {
  var __id1_ = s;
  var _more = __id1_.more;
  var _pos1 = __id1_.pos;
  var _id2 = _more;
  var _e;
  if (_id2) {
    _e = _id2;
  } else {
    throw new Error("Expected " + c + " at " + _pos1);
    _e = undefined;
  }
  return(_e);
};
var wrap = function (s, x) {
  var _y = read(s);
  if (_y === s.more) {
    return(_y);
  } else {
    return([x, _y]);
  }
};
var hex_prefix63 = function (str) {
  var _e1;
  if (code(str, 0) === 45) {
    _e1 = 1;
  } else {
    _e1 = 0;
  }
  var _i = _e1;
  var _id3 = code(str, _i) === 48;
  var _e2;
  if (_id3) {
    _i = _i + 1;
    var _n = code(str, _i);
    _e2 = _n === 120 || _n === 88;
  } else {
    _e2 = _id3;
  }
  return(_e2);
};
var maybe_number = function (str) {
  if (hex_prefix63(str)) {
    return(parseInt(str, 16));
  } else {
    if (number_code63(code(str, edge(str)))) {
      return(number(str));
    }
  }
};
var real63 = function (x) {
  return(number63(x) && ! nan63(x) && ! inf63(x));
};
read_table[""] = function (s) {
  var _str = "";
  while (true) {
    var _c3 = peek_char(s);
    if (_c3 && (! whitespace[_c3] && ! delimiters[_c3])) {
      _str = _str + read_char(s);
    } else {
      break;
    }
  }
  if (_str === "true") {
    return(true);
  } else {
    if (_str === "false") {
      return(false);
    } else {
      var _n1 = maybe_number(_str);
      if (real63(_n1)) {
        return(_n1);
      } else {
        return(_str);
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var _r16 = undefined;
  var _l1 = [];
  while (nil63(_r16)) {
    skip_non_code(s);
    var _c4 = peek_char(s);
    if (_c4 === ")") {
      read_char(s);
      _r16 = _l1;
    } else {
      if (nil63(_c4)) {
        _r16 = expected(s, ")");
      } else {
        var _x2 = read(s);
        if (key63(_x2)) {
          var _k = clip(_x2, 0, edge(_x2));
          var _v = read(s);
          _l1[_k] = _v;
        } else {
          if (flag63(_x2)) {
            _l1[clip(_x2, 1)] = true;
          } else {
            add(_l1, _x2);
          }
        }
      }
    }
  }
  return(_r16);
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  read_char(s);
  var _r19 = undefined;
  var _str1 = "\"";
  while (nil63(_r19)) {
    var _c5 = peek_char(s);
    if (_c5 === "\"") {
      _r19 = _str1 + read_char(s);
    } else {
      if (nil63(_c5)) {
        _r19 = expected(s, "\"");
      } else {
        if (_c5 === "\\") {
          _str1 = _str1 + read_char(s);
        }
        _str1 = _str1 + read_char(s);
      }
    }
  }
  return(_r19);
};
read_table["|"] = function (s) {
  read_char(s);
  var _r21 = undefined;
  var _str2 = "|";
  while (nil63(_r21)) {
    var _c6 = peek_char(s);
    if (_c6 === "|") {
      _r21 = _str2 + read_char(s);
    } else {
      if (nil63(_c6)) {
        _r21 = expected(s, "|");
      } else {
        _str2 = _str2 + read_char(s);
      }
    }
  }
  return(_r21);
};
read_table["'"] = function (s) {
  read_char(s);
  return(wrap(s, "quote"));
};
read_table["`"] = function (s) {
  read_char(s);
  return(wrap(s, "quasiquote"));
};
read_table[","] = function (s) {
  read_char(s);
  if (peek_char(s) === "@") {
    read_char(s);
    return(wrap(s, "unquote-splicing"));
  } else {
    return(wrap(s, "unquote"));
  }
};
exports.stream = stream;
exports.read = read;
exports["read-all"] = read_all;
exports["read-string"] = read_string;
exports["read-table"] = read_table;
