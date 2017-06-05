local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
local function stream(str, more)
  return({pos = 0, string = str, len = _35(str), more = more})
end
local function peek_char(s)
  local __id = s
  local _pos = __id.pos
  local _len = __id.len
  local _string = __id.string
  if _pos < _len then
    return(char(_string, _pos))
  end
end
local function read_char(s)
  local _c = peek_char(s)
  if _c then
    s.pos = s.pos + 1
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
local function expected(s, c)
  local __id1 = s
  local _more = __id1.more
  local _pos1 = __id1.pos
  local _id2 = _more
  local _e
  if _id2 then
    _e = _id2
  else
    error("Expected " .. c .. " at " .. _pos1)
    _e = nil
  end
  return(_e)
end
local function wrap(s, x)
  local _y = read(s)
  if _y == s.more then
    return(_y)
  else
    return({x, _y})
  end
end
local function real63(x)
  return(number63(x) and not nan63(x) and not inf63(x))
end
local function hex_prefix63(str)
  local _id3 = char(str, 0) == "0"
  local _e1
  if _id3 then
    local _c3 = char(str, 1)
    _e1 = _c3 == "x" or _c3 == "X"
  else
    _e1 = _id3
  end
  return(_e1)
end
local function parse_number(str)
  if hex_prefix63(str) then
    return(number(clip(str, 2), 16))
  else
    if number_code63(code(str, edge(str))) then
      return(number(str))
    end
  end
end
local function negative_prefix63(str)
  return(_35(str) > 1 and char(str, 0) == "-")
end
local function maybe_number(str)
  if negative_prefix63(str) then
    local _n = parse_number(clip(str, 1))
    if number63(_n) then
      return(- _n)
    else
      return(_n)
    end
  else
    return(parse_number(str))
  end
end
read_table[""] = function (s)
  local _str = ""
  while true do
    local _c4 = peek_char(s)
    if _c4 and (not whitespace[_c4] and not delimiters[_c4]) then
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
      local _n1 = maybe_number(_str)
      if real63(_n1) then
        return(_n1)
      else
        return(_str)
      end
    end
  end
end
read_table["("] = function (s)
  read_char(s)
  local _r18 = nil
  local _l1 = {}
  while nil63(_r18) do
    skip_non_code(s)
    local _c5 = peek_char(s)
    if _c5 == ")" then
      read_char(s)
      _r18 = _l1
    else
      if nil63(_c5) then
        _r18 = expected(s, ")")
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
  return(_r18)
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
read_table["\""] = function (s)
  read_char(s)
  local _r21 = nil
  local _str1 = "\""
  while nil63(_r21) do
    local _c6 = peek_char(s)
    if _c6 == "\"" then
      _r21 = _str1 .. read_char(s)
    else
      if nil63(_c6) then
        _r21 = expected(s, "\"")
      else
        if _c6 == "\\" then
          _str1 = _str1 .. read_char(s)
        end
        _str1 = _str1 .. read_char(s)
      end
    end
  end
  return(_r21)
end
read_table["|"] = function (s)
  read_char(s)
  local _r23 = nil
  local _str2 = "|"
  while nil63(_r23) do
    local _c7 = peek_char(s)
    if _c7 == "|" then
      _r23 = _str2 .. read_char(s)
    else
      if nil63(_c7) then
        _r23 = expected(s, "|")
      else
        _str2 = _str2 .. read_char(s)
      end
    end
  end
  return(_r23)
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
