local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
local function stream(str, more)
  return({pos = 0, string = str, len = _35(str), more = more})
end
local function peek_char(s)
  if s.pos < s.len then
    return(char(s.string, s.pos))
  end
end
local function read_char(s)
  local c = peek_char(s)
  if c then
    s.pos = s.pos + 1
    return(c)
  end
end
local function skip_non_code(s)
  while true do
    local c = peek_char(s)
    if nil63(c) then
      break
    else
      if whitespace[c] then
        read_char(s)
      else
        if c == ";" then
          while c and not (c == "\n") do
            c = read_char(s)
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
  local c = peek_char(s)
  if is63(c) then
    return((read_table[c] or read_table[""])(s))
  else
    return(eof)
  end
end
local function read_all(s)
  local l = {}
  while true do
    local form = read(s)
    if form == eof then
      break
    end
    add(l, form)
  end
  return(l)
end
local function read_string(str, more)
  local x = read(stream(str, more))
  if not (x == eof) then
    return(x)
  end
end
local function key63(atom)
  return(string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":")
end
local function flag63(atom)
  return(string63(atom) and _35(atom) > 1 and char(atom, 0) == ":")
end
local function expected(s, c)
  local _id = s.more
  local _e
  if _id then
    _e = _id
  else
    error("Expected " .. c .. " at " .. s.pos)
    _e = nil
  end
  return(_e)
end
local function wrap(s, x)
  local y = read(s)
  if y == s.more then
    return(y)
  else
    return({x, y})
  end
end
read_table[""] = function (s)
  local str = ""
  local dot63 = false
  while true do
    local c = peek_char(s)
    if c and (not whitespace[c] and not delimiters[c]) then
      if c == "." then
        dot63 = true
      end
      str = str .. read_char(s)
    else
      break
    end
  end
  local n = number(str)
  if is63(n) then
    return(n)
  else
    if str == "true" then
      return(true)
    else
      if str == "false" then
        return(false)
      else
        if dot63 and not one63(str) then
          return(reduce(function (a, b)
            return({"get", b, {"quote", a}})
          end, reverse(split(str, "."))))
        else
          return(str)
        end
      end
    end
  end
end
read_table["("] = function (s)
  read_char(s)
  local r = nil
  local l = {}
  while nil63(r) do
    skip_non_code(s)
    local c = peek_char(s)
    if c == ")" then
      read_char(s)
      r = l
    else
      if nil63(c) then
        r = expected(s, ")")
      else
        local x = read(s)
        if key63(x) then
          local k = clip(x, 0, edge(x))
          local v = read(s)
          l[k] = v
        else
          if flag63(x) then
            l[clip(x, 1)] = true
          else
            add(l, x)
          end
        end
      end
    end
  end
  return(r)
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
read_table["\""] = function (s)
  read_char(s)
  local r = nil
  local str = "\""
  while nil63(r) do
    local c = peek_char(s)
    if c == "\"" then
      r = str .. read_char(s)
    else
      if nil63(c) then
        r = expected(s, "\"")
      else
        if c == "\\" then
          str = str .. read_char(s)
        end
        str = str .. read_char(s)
      end
    end
  end
  return(r)
end
read_table["|"] = function (s)
  read_char(s)
  local r = nil
  local str = "|"
  while nil63(r) do
    local c = peek_char(s)
    if c == "|" then
      r = str .. read_char(s)
    else
      if nil63(c) then
        r = expected(s, "|")
      else
        str = str .. read_char(s)
      end
    end
  end
  return(r)
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
return({stream = stream, read = read, ["read-all"] = read_all, ["read-string"] = read_string})