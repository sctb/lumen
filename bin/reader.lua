local delimiters = {[")"] = true, ["("] = true, ["\n"] = true, [";"] = true}
local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
local function stream(str, more)
  return({pos = 0, len = _35(str), string = str, more = more})
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
  local _pos1 = __id1.pos
  local _more = __id1.more
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
local function hex_prefix63(str)
  local _e1
  if code(str, 0) == 45 then
    _e1 = 1
  else
    _e1 = 0
  end
  local _i = _e1
  local _id3 = code(str, _i) == 48
  local _e2
  if _id3 then
    _i = _i + 1
    local _n = code(str, _i)
    _e2 = _n == 120 or _n == 88
  else
    _e2 = _id3
  end
  return(_e2)
end
local function maybe_number(str)
  if hex_prefix63(str) then
    return(tonumber(str))
  else
    if number_code63(code(str, edge(str))) then
      return(number(str))
    end
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
  local _r16 = nil
  local _l1 = {}
  while nil63(_r16) do
    skip_non_code(s)
    local _c4 = peek_char(s)
    if _c4 == ")" then
      read_char(s)
      _r16 = _l1
    else
      if nil63(_c4) then
        _r16 = expected(s, ")")
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
  return(_r16)
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
read_table["\""] = function (s)
  read_char(s)
  local _r19 = nil
  local _str1 = "\""
  while nil63(_r19) do
    local _c5 = peek_char(s)
    if _c5 == "\"" then
      _r19 = _str1 .. read_char(s)
    else
      if nil63(_c5) then
        _r19 = expected(s, "\"")
      else
        if _c5 == "\\" then
          _str1 = _str1 .. read_char(s)
        end
        _str1 = _str1 .. read_char(s)
      end
    end
  end
  return(_r19)
end
read_table["|"] = function (s)
  read_char(s)
  local _r21 = nil
  local _str2 = "|"
  while nil63(_r21) do
    local _c6 = peek_char(s)
    if _c6 == "|" then
      _r21 = _str2 .. read_char(s)
    else
      if nil63(_c6) then
        _r21 = expected(s, "|")
      else
        _str2 = _str2 .. read_char(s)
      end
    end
  end
  return(_r21)
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
return({stream = stream, read = read, ["read-table"] = read_table, ["read-string"] = read_string, ["read-all"] = read_all})
