local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\r"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\r"] = true, ["\n"] = true}
local function stream(str, more)
  return {pos = 0, string = str, len = _35(str), more = more}
end
local function peekChar(s)
  local ____id = s
  local __pos = ____id.pos
  local __len = ____id.len
  local __string = ____id.string
  if __pos < __len then
    return char(__string, __pos)
  end
end
local function readChar(s)
  local __c = peekChar(s)
  if __c then
    s.pos = s.pos + 1
    return __c
  end
end
local function skipNonCode(s)
  while true do
    local __c1 = peekChar(s)
    if nil63(__c1) then
      break
    else
      if whitespace[__c1] then
        readChar(s)
      else
        if __c1 == ";" then
          while __c1 and not( __c1 == "\n") do
            __c1 = readChar(s)
          end
          skipNonCode(s)
        else
          break
        end
      end
    end
  end
end
local readTable = {}
local eof = {}
local function read(s)
  skipNonCode(s)
  local __c2 = peekChar(s)
  if is63(__c2) then
    return (readTable[__c2] or readTable[""])(s)
  else
    return eof
  end
end
local function readAll(s)
  local __l = {}
  while true do
    local __form = read(s)
    if __form == eof then
      break
    end
    add(__l, __form)
  end
  return __l
end
function readString(str, more)
  local __x = read(stream(str, more))
  if not( __x == eof) then
    return __x
  end
end
local function key63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":"
end
local function flag63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, 0) == ":"
end
local function expected(s, c)
  local ____id1 = s
  local __more = ____id1.more
  local __pos1 = ____id1.pos
  local __id2 = __more
  local __e
  if __id2 then
    __e = __id2
  else
    error("Expected " .. c .. " at " .. __pos1)
    __e = nil
  end
  return __e
end
local function wrap(s, x)
  local __y = read(s)
  if __y == s.more then
    return __y
  else
    return {x, __y}
  end
end
local function hexPrefix63(str)
  local __e1
  if code(str, 0) == 45 then
    __e1 = 1
  else
    __e1 = 0
  end
  local __i = __e1
  local __id3 = code(str, __i) == 48
  local __e2
  if __id3 then
    __i = __i + 1
    local __n = code(str, __i)
    __e2 = __n == 120 or __n == 88
  else
    __e2 = __id3
  end
  return __e2
end
local function maybeNumber(str)
  if hexPrefix63(str) then
    return tonumber(str)
  else
    if numberCode63(code(str, edge(str))) then
      return number(str)
    end
  end
end
local function real63(x)
  return number63(x) and not nan63(x) and not inf63(x)
end
readTable[""] = function (s)
  local __str = ""
  while true do
    local __c3 = peekChar(s)
    if __c3 and (not whitespace[__c3] and not delimiters[__c3]) then
      __str = __str .. readChar(s)
    else
      break
    end
  end
  if __str == "true" then
    return true
  else
    if __str == "false" then
      return false
    else
      local __n1 = maybeNumber(__str)
      if real63(__n1) then
        return __n1
      else
        return __str
      end
    end
  end
end
readTable["("] = function (s)
  readChar(s)
  local __r16 = nil
  local __l1 = {}
  while nil63(__r16) do
    skipNonCode(s)
    local __c4 = peekChar(s)
    if __c4 == ")" then
      readChar(s)
      __r16 = __l1
    else
      if nil63(__c4) then
        __r16 = expected(s, ")")
      else
        local __x2 = read(s)
        if key63(__x2) then
          local __k = clip(__x2, 0, edge(__x2))
          local __v = read(s)
          __l1[__k] = __v
        else
          if flag63(__x2) then
            __l1[clip(__x2, 1)] = true
          else
            add(__l1, __x2)
          end
        end
      end
    end
  end
  return __r16
end
readTable[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
readTable["\""] = function (s)
  readChar(s)
  local __r19 = nil
  local __str1 = "\""
  while nil63(__r19) do
    local __c5 = peekChar(s)
    if __c5 == "\"" then
      __r19 = __str1 .. readChar(s)
    else
      if nil63(__c5) then
        __r19 = expected(s, "\"")
      else
        if __c5 == "\\" then
          __str1 = __str1 .. readChar(s)
        end
        __str1 = __str1 .. readChar(s)
      end
    end
  end
  return __r19
end
readTable["|"] = function (s)
  readChar(s)
  local __r21 = nil
  local __str2 = "|"
  while nil63(__r21) do
    local __c6 = peekChar(s)
    if __c6 == "|" then
      __r21 = __str2 .. readChar(s)
    else
      if nil63(__c6) then
        __r21 = expected(s, "|")
      else
        __str2 = __str2 .. readChar(s)
      end
    end
  end
  return __r21
end
readTable["'"] = function (s)
  readChar(s)
  return wrap(s, "quote")
end
readTable["`"] = function (s)
  readChar(s)
  return wrap(s, "quasiquote")
end
readTable[","] = function (s)
  readChar(s)
  if peekChar(s) == "@" then
    readChar(s)
    return wrap(s, "unquote-splicing")
  else
    return wrap(s, "unquote")
  end
end
return {stream = stream, read = read, readAll = readAll, readString = readString, readTable = readTable}
