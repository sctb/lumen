var delimiters = {"(": true, ")": true, ";": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\n": true};
var marker = function (s) {
  if (s) {
    return(cut(s.point));
  } else {
    return({pos: 0, row: 0, col: 0});
  }
};
var stream = function (str, more) {
  return({point: marker(), string: str, len: _35(str), more: more});
};
var message = function (str, pt) {
  var __id = pt;
  var _pos = __id.pos;
  var _row = __id.row;
  var _col = __id.col;
  var _line = _row + 1;
  return(str + _pos + " line " + _line + ":" + _col);
};
var peek_char = function (s) {
  var __id1 = s;
  var __id2 = __id1.point;
  var _pos1 = __id2.pos;
  var _len = __id1.len;
  var _string = __id1.string;
  if (_pos1 < _len) {
    return(char(_string, _pos1));
  }
};
var read_char = function (s) {
  var __y = peek_char(s);
  if (yes(__y)) {
    var _c = __y;
    var _pt = s.point;
    _pt.pos = _pt.pos + 1;
    _pt.col = _pt.col + 1;
    if (_c === "\n") {
      _pt.row = _pt.row + 1;
      _pt.col = 0;
    }
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
var expected = function (s, c, from) {
  var _id3 = s.more;
  var _e1;
  if (_id3) {
    _e1 = _id3;
  } else {
    var _e2;
    if (from) {
      _e2 = " after ";
    } else {
      _e2 = " at ";
    }
    throw new Error(message("Expected " + c + _e2, from || s.point));
    _e1 = undefined;
  }
  return(_e1);
};
var wrap = function (s, x) {
  var _y1 = read(s);
  if (_y1 === s.more) {
    return(_y1);
  } else {
    return([x, _y1]);
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
  var _from = marker(s);
  read_char(s);
  var _r17 = undefined;
  var _l1 = [];
  while (nil63(_r17)) {
    skip_non_code(s);
    var _c4 = peek_char(s);
    if (_c4 === ")") {
      read_char(s);
      _r17 = _l1;
    } else {
      if (nil63(_c4)) {
        _r17 = expected(s, ")", _from);
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
  return(_r17);
};
read_table[")"] = function (s) {
  throw new Error(message("Unexpected ) at ", s.point));
};
read_table["\""] = function (s) {
  var _from1 = marker(s);
  read_char(s);
  var _r20 = undefined;
  var _str1 = "\"";
  while (nil63(_r20)) {
    var _c5 = peek_char(s);
    if (_c5 === "\"") {
      _r20 = _str1 + read_char(s);
    } else {
      if (nil63(_c5)) {
        _r20 = expected(s, "\"", _from1);
      } else {
        if (_c5 === "\\") {
          _str1 = _str1 + read_char(s);
        }
        _str1 = _str1 + read_char(s);
      }
    }
  }
  return(_r20);
};
read_table["|"] = function (s) {
  var _from2 = marker(s);
  read_char(s);
  var _r22 = undefined;
  var _str2 = "|";
  while (nil63(_r22)) {
    var _c6 = peek_char(s);
    if (_c6 === "|") {
      _r22 = _str2 + read_char(s);
    } else {
      if (nil63(_c6)) {
        _r22 = expected(s, "|", _from2);
      } else {
        _str2 = _str2 + read_char(s);
      }
    }
  }
  return(_r22);
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
