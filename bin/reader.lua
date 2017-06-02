local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
local function marker(s)
  if s then
    return(cut(s.point))
  else
    return({pos = 0, row = 0, col = 0})
  end
end
local function stream(str, more)
  return({point = marker(), string = str, len = _35(str), more = more})
end
local function message(str, pt)
  local __id = pt
  local _pos = __id.pos
  local _row = __id.row
  local _col = __id.col
  local _line = _row + 1
  return(str .. _pos .. " line " .. _line .. ":" .. _col)
end
local function peek_char(s)
  local __id1 = s
  local __id2 = __id1.point
  local _pos1 = __id2.pos
  local _len = __id1.len
  local _string = __id1.string
  if _pos1 < _len then
    return(char(_string, _pos1))
  end
end
local function read_char(s)
  local __y = peek_char(s)
  if yes(__y) then
    local _c = __y
    local _pt = s.point
    _pt.pos = _pt.pos + 1
    _pt.col = _pt.col + 1
    if _c == "\n" then
      _pt.row = _pt.row + 1
      _pt.col = 0
    end
    return(_c)
  end
end
local function skip_non_code(s)
  while true do
    local _c1 = peek_char(s)
    if nil63(_c1) then
      break
    else
      if whitespace[_c1] then
        read_char(s)
      else
        if _c1 == ";" then
          while _c1 and not( _c1 == "\n") do
            _c1 = read_char(s)
          end
          skip_non_code(s)
        else
          break
        end
      end
    end
  end
end
local read_table = {}
local eof = {}
local function read(s)
  skip_non_code(s)
  local _c2 = peek_char(s)
  if is63(_c2) then
    return((read_table[_c2] or read_table[""])(s))
  else
    return(eof)
  end
end
local function read_all(s)
  local _l = {}
  while true do
    local _form = read(s)
    if _form == eof then
      break
    end
    add(_l, _form)
  end
  return(_l)
end
function read_string(str, more)
  local _x = read(stream(str, more))
  if not( _x == eof) then
    return(_x)
  end
end
local function key63(atom)
  return(string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":")
end
local function flag63(atom)
  return(string63(atom) and _35(atom) > 1 and char(atom, 0) == ":")
end
local function expected(s, c, from)
  local _id3 = s.more
  local _e1
  if _id3 then
    _e1 = _id3
  else
    local _e2
    if from then
      _e2 = " after "
    else
      _e2 = " at "
    end
    error(message("Expected " .. c .. _e2, from or s.point))
    _e1 = nil
  end
  return(_e1)
end
local function wrap(s, x)
  local _y1 = read(s)
  if _y1 == s.more then
    return(_y1)
  else
    return({x, _y1})
  end
end
local function maybe_number(str)
  if number_code63(code(str, edge(str))) then
    return(number(str))
  end
end
local function real63(x)
  return(number63(x) and not nan63(x) and not inf63(x))
end
read_table[""] = function (s)
  local _str = ""
  while true do
    local _c3 = peek_char(s)
    if _c3 and (not whitespace[_c3] and not delimiters[_c3]) then
      _str = _str .. read_char(s)
    else
      break
    end
  end
  if _str == "true" then
    return(true)
  else
    if _str == "false" then
      return(false)
    else
      if _str == "nan" then
        return(nan)
      else
        if _str == "-nan" then
          return(nan)
        else
          if _str == "inf" then
            return(inf)
          else
            if _str == "-inf" then
              return(-inf)
            else
              local _n = maybe_number(_str)
              if real63(_n) then
                return(_n)
              else
                return(_str)
              end
            end
          end
        end
      end
    end
  end
end
read_table["("] = function (s)
  local _from = marker(s)
  read_char(s)
  local _r17 = nil
  local _l1 = {}
  while nil63(_r17) do
    skip_non_code(s)
    local _c4 = peek_char(s)
    if _c4 == ")" then
      read_char(s)
      _r17 = _l1
    else
      if nil63(_c4) then
        _r17 = expected(s, ")", _from)
      else
        local _x2 = read(s)
        if key63(_x2) then
          local _k = clip(_x2, 0, edge(_x2))
          local _v = read(s)
          _l1[_k] = _v
        else
          if flag63(_x2) then
            _l1[clip(_x2, 1)] = true
          else
            add(_l1, _x2)
          end
        end
      end
    end
  end
  return(_r17)
end
read_table[")"] = function (s)
  error(message("Unexpected ) at ", s.point))
end
read_table["\""] = function (s)
  local _from1 = marker(s)
  read_char(s)
  local _r20 = nil
  local _str1 = "\""
  while nil63(_r20) do
    local _c5 = peek_char(s)
    if _c5 == "\"" then
      _r20 = _str1 .. read_char(s)
    else
      if nil63(_c5) then
        _r20 = expected(s, "\"", _from1)
      else
        if _c5 == "\\" then
          _str1 = _str1 .. read_char(s)
        end
        _str1 = _str1 .. read_char(s)
      end
    end
  end
  return(_r20)
end
read_table["|"] = function (s)
  local _from2 = marker(s)
  read_char(s)
  local _r22 = nil
  local _str2 = "|"
  while nil63(_r22) do
    local _c6 = peek_char(s)
    if _c6 == "|" then
      _r22 = _str2 .. read_char(s)
    else
      if nil63(_c6) then
        _r22 = expected(s, "|", _from2)
      else
        _str2 = _str2 .. read_char(s)
      end
    end
  end
  return(_r22)
end
read_table["'"] = function (s)
  read_char(s)
  return(wrap(s, "quote"))
end
read_table["`"] = function (s)
  read_char(s)
  return(wrap(s, "quasiquote"))
end
read_table[","] = function (s)
  read_char(s)
  if peek_char(s) == "@" then
    read_char(s)
    return(wrap(s, "unquote-splicing"))
  else
    return(wrap(s, "unquote"))
  end
end
return({stream = stream, read = read, ["read-all"] = read_all, ["read-string"] = read_string, ["read-table"] = read_table})
