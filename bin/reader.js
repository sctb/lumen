var delimiters = {"(": true, ")": true, ";": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\n": true};
var stream = function (str, more) {
  return({pos: 0, string: str, len: _35(str), more: more});
};
var peek_char = function (s) {
  var __id = s;
  var _pos = __id.pos;
  var _len = __id.len;
  var _string = __id.string;
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
var expected = function (s, c, pos) {
  var __id1 = s;
  var _more = __id1.more;
  var _id2 = _more;
  var _e;
  if (_id2) {
    _e = _id2;
  } else {
    throw new Error("Expected " + c + " after " + pos);
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
var maybe_number = function (str) {
  if (number_code63(code(str, edge(str)))) {
    return(number(str));
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
      var _n = maybe_number(_str);
      if (real63(_n)) {
        return(_n);
      } else {
        return(_str);
      }
    }
  }
};
read_table["("] = function (s) {
  var _pos1 = s.pos;
  read_char(s);
  var _r15 = undefined;
  var _l1 = [];
  while (nil63(_r15)) {
    skip_non_code(s);
    var _c4 = peek_char(s);
    if (_c4 === ")") {
      read_char(s);
      _r15 = _l1;
    } else {
      if (nil63(_c4)) {
        _r15 = expected(s, ")", _pos1);
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
  return(_r15);
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  var _pos2 = s.pos;
  read_char(s);
  var _r18 = undefined;
  var _str1 = "\"";
  while (nil63(_r18)) {
    var _c5 = peek_char(s);
    if (_c5 === "\"") {
      _r18 = _str1 + read_char(s);
    } else {
      if (nil63(_c5)) {
        _r18 = expected(s, "\"", _pos2);
      } else {
        if (_c5 === "\\") {
          _str1 = _str1 + read_char(s);
        }
        _str1 = _str1 + read_char(s);
      }
    }
  }
  return(_r18);
};
read_table["|"] = function (s) {
  var _pos3 = s.pos;
  read_char(s);
  var _r20 = undefined;
  var _str2 = "|";
  while (nil63(_r20)) {
    var _c6 = peek_char(s);
    if (_c6 === "|") {
      _r20 = _str2 + read_char(s);
    } else {
      if (nil63(_c6)) {
        _r20 = expected(s, "|", _pos3);
      } else {
        _str2 = _str2 + read_char(s);
      }
    }
  }
  return(_r20);
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
