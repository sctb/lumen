local delimiters = {["("] = true, [")"] = true, ["\n"] = true, [";"] = true}
local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
local function stream(str)
  return({pos = 0, len = _35(str), string = str})
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
local function read_string(str)
  local x = read(stream(str))
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
        if str == "_" then
          return(unique())
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
end
read_table["("] = function (s)
  read_char(s)
  local l = {}
  while true do
    skip_non_code(s)
    local c = peek_char(s)
    if c and not (c == ")") then
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
    else
      if c then
        read_char(s)
        break
      else
        error("Expected ) at " .. s.pos)
      end
    end
  end
  return(l)
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
read_table["\""] = function (s)
  read_char(s)
  local str = "\""
  while true do
    local c = peek_char(s)
    if c and not (c == "\"") then
      if c == "\\" then
        str = str .. read_char(s)
      end
      str = str .. read_char(s)
    else
      if c then
        read_char(s)
        break
      else
        error("Expected \" at " .. s.pos)
      end
    end
  end
  return(str .. "\"")
end
read_table["|"] = function (s)
  read_char(s)
  local str = "|"
  while true do
    local c = peek_char(s)
    if c and not (c == "|") then
      str = str .. read_char(s)
    else
      if c then
        read_char(s)
        break
      else
        error("Expected | at " .. s.pos)
      end
    end
  end
  return(str .. "|")
end
read_table["'"] = function (s)
  read_char(s)
  return({"quote", read(s)})
end
read_table["`"] = function (s)
  read_char(s)
  return({"quasiquote", read(s)})
end
read_table[","] = function (s)
  read_char(s)
  if peek_char(s) == "@" then
    read_char(s)
    return({"unquote-splicing", read(s)})
  else
    return({"unquote", read(s)})
  end
end
return({["read-string"] = read_string, read = read, ["read-all"] = read_all, stream = stream})
