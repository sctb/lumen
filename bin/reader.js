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
var expected = function (s, c) {
  var __id1 = s;
  var _more = __id1.more;
  var _pos1 = __id1.pos;
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
var maybe_number = function (str) {
  if (number_code63(code(str, edge(str)))) {
    return(number(str));
  }
};
var real63 = function (x) {
  return(number63(x) && ! nan63(x) && ! inf63(x));
};
var valid_access63 = function (str) {
  return(_35(str) > 2 && !( "." === char(str, 0)) && !( "." === char(str, edge(str))) && ! search(str, ".."));
};
var parse_access = function (str) {
  return(reduce(function (a, b) {
    var _n = number(a);
    if (is63(_n)) {
      return(["at", b, _n]);
    } else {
      return(["get", b, ["quote", a]]);
    }
  }, reverse(split(str, "."))));
};
read_table[""] = function (s) {
  var _str = "";
  var _dot63 = false;
  while (true) {
    var _c3 = peek_char(s);
    if (_c3 && (! whitespace[_c3] && ! delimiters[_c3])) {
      if (_c3 === ".") {
        _dot63 = true;
      }
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
      if (_str === "nan") {
        return(nan);
      } else {
        if (_str === "-nan") {
          return(nan);
        } else {
          if (_str === "inf") {
            return(inf);
          } else {
            if (_str === "-inf") {
              return(-inf);
            } else {
              var _n1 = maybe_number(_str);
              if (real63(_n1)) {
                return(_n1);
              } else {
                if (_dot63 && valid_access63(_str)) {
                  return(parse_access(_str));
                } else {
                  return(_str);
                }
              }
            }
          }
        }
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var _r18 = undefined;
  var _l1 = [];
  while (nil63(_r18)) {
    skip_non_code(s);
    var _c4 = peek_char(s);
    if (_c4 === ")") {
      read_char(s);
      _r18 = _l1;
    } else {
      if (nil63(_c4)) {
        _r18 = expected(s, ")");
      } else {
        var _x5 = read(s);
        if (key63(_x5)) {
          var _k = clip(_x5, 0, edge(_x5));
          var _v = read(s);
          _l1[_k] = _v;
        } else {
          if (flag63(_x5)) {
            _l1[clip(_x5, 1)] = true;
          } else {
            add(_l1, _x5);
          }
        }
      }
    }
  }
  return(_r18);
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  read_char(s);
  var _r21 = undefined;
  var _str1 = "\"";
  while (nil63(_r21)) {
    var _c5 = peek_char(s);
    if (_c5 === "\"") {
      _r21 = _str1 + read_char(s);
    } else {
      if (nil63(_c5)) {
        _r21 = expected(s, "\"");
      } else {
        if (_c5 === "\\") {
          _str1 = _str1 + read_char(s);
        }
        _str1 = _str1 + read_char(s);
      }
    }
  }
  return(_r21);
};
read_table["|"] = function (s) {
  read_char(s);
  var _r23 = undefined;
  var _str2 = "|";
  while (nil63(_r23)) {
    var _c6 = peek_char(s);
    if (_c6 === "|") {
      _r23 = _str2 + read_char(s);
    } else {
      if (nil63(_c6)) {
        _r23 = expected(s, "|");
      } else {
        _str2 = _str2 + read_char(s);
      }
    }
  }
  return(_r23);
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
