environment = {{}}
target = "lua"
function nil63(x)
  return(x == nil)
end
function is63(x)
  return(not nil63(x))
end
function _35(x)
  return(#x)
end
function none63(x)
  return(_35(x) == 0)
end
function some63(x)
  return(_35(x) > 0)
end
function one63(x)
  return(_35(x) == 1)
end
function hd(l)
  return(l[1])
end
function string63(x)
  return(type(x) == "string")
end
function number63(x)
  return(type(x) == "number")
end
function boolean63(x)
  return(type(x) == "boolean")
end
function function63(x)
  return(type(x) == "function")
end
function obj63(x)
  return(is63(x) and type(x) == "table")
end
function atom63(x)
  return(nil63(x) or not obj63(x))
end
function nan63(n)
  return(not (n == n))
end
function inf63(n)
  return(n == 1 / 0 or n == -(1 / 0))
end
local strlib = string
function clip(s, from, upto)
  return(strlib.sub(s, from + 1, upto))
end
function cut(x, from, upto)
  local l = {}
  local j = 0
  local _u126
  if nil63(from) or from < 0 then
    _u126 = 0
  else
    _u126 = from
  end
  local i = _u126
  local n = _35(x)
  local _u127
  if nil63(upto) or upto > n then
    _u127 = n
  else
    _u127 = upto
  end
  local _u24 = _u127
  while i < _u24 do
    l[j + 1] = x[i + 1]
    i = i + 1
    j = j + 1
  end
  local _u25 = x
  local k = nil
  for k in next, _u25 do
    local v = _u25[k]
    if not number63(k) then
      l[k] = v
    end
  end
  return(l)
end
function keys(x)
  local t = {}
  local _u28 = x
  local k = nil
  for k in next, _u28 do
    local v = _u28[k]
    if not number63(k) then
      t[k] = v
    end
  end
  return(t)
end
function edge(x)
  return(_35(x) - 1)
end
function inner(x)
  return(clip(x, 1, edge(x)))
end
function tl(l)
  return(cut(l, 1))
end
function char(s, n)
  return(clip(s, n, n + 1))
end
function code(s, n)
  local _u128
  if n then
    _u128 = n + 1
  end
  return(strlib.byte(s, _u128))
end
function string_literal63(x)
  return(string63(x) and char(x, 0) == "\"")
end
function id_literal63(x)
  return(string63(x) and char(x, 0) == "|")
end
function add(l, x)
  return(table.insert(l, x))
end
function drop(l)
  return(table.remove(l))
end
function last(l)
  return(l[edge(l) + 1])
end
function butlast(l)
  return(cut(l, 0, edge(l)))
end
function reverse(l)
  local l1 = keys(l)
  local i = edge(l)
  while i >= 0 do
    add(l1, l[i + 1])
    i = i - 1
  end
  return(l1)
end
function join(a, b)
  if a and b then
    local c = {}
    local o = _35(a)
    local _u43 = a
    local k = nil
    for k in next, _u43 do
      local v = _u43[k]
      c[k] = v
    end
    local _u45 = b
    local k = nil
    for k in next, _u45 do
      local v = _u45[k]
      if number63(k) then
        k = k + o
      end
      c[k] = v
    end
    return(c)
  else
    return(a or b or {})
  end
end
function reduce(f, x)
  if none63(x) then
    return(x)
  else
    if one63(x) then
      return(hd(x))
    else
      return(f(hd(x), reduce(f, tl(x))))
    end
  end
end
function find(f, t)
  local _u49 = t
  local _u1 = nil
  for _u1 in next, _u49 do
    local x = _u49[_u1]
    local _u51 = f(x)
    if _u51 then
      return(_u51)
    end
  end
end
function first(f, l)
  local i = 0
  local n = _35(l)
  while i < n do
    local x = f(l[i + 1])
    if x then
      return(x)
    end
    i = i + 1
  end
end
function in63(x, t)
  return(find(function (y)
    return(x == y)
  end, t))
end
function pair(l)
  local i = 0
  local l1 = {}
  while i < _35(l) do
    add(l1, {l[i + 1], l[i + 1 + 1]})
    i = i + 2
  end
  return(l1)
end
function sort(l, f)
  table.sort(l, f)
  return(l)
end
function iterate(f, count)
  local i = 0
  while i < count do
    f(i)
    i = i + 1
  end
end
function replicate(n, x)
  local l = {}
  iterate(function ()
    return(add(l, x))
  end, n)
  return(l)
end
function step(f, l)
  return(iterate(function (i)
    return(f(l[i + 1]))
  end, _35(l)))
end
function map(f, x)
  local t = {}
  local i = 0
  local n = _35(x)
  while i < n do
    local y = f(x[i + 1])
    if is63(y) then
      add(t, y)
    end
    i = i + 1
  end
  local _u64 = x
  local k = nil
  for k in next, _u64 do
    local v = _u64[k]
    if not number63(k) then
      local y = f(v)
      if is63(y) then
        t[k] = y
      end
    end
  end
  return(t)
end
function keep(f, x)
  return(map(function (v)
    if f(v) then
      return(v)
    end
  end, x))
end
function keys63(t)
  local _u69 = t
  local k = nil
  for k in next, _u69 do
    local _u2 = _u69[k]
    if not number63(k) then
      return(true)
    end
  end
  return(false)
end
function empty63(t)
  local _u72 = t
  local _u3 = nil
  for _u3 in next, _u72 do
    local _u4 = _u72[_u3]
    return(false)
  end
  return(true)
end
function stash(args)
  if keys63(args) then
    local p = {}
    local _u75 = args
    local k = nil
    for k in next, _u75 do
      local v = _u75[k]
      if not number63(k) then
        p[k] = v
      end
    end
    p._stash = true
    add(args, p)
  end
  return(args)
end
function unstash(args)
  if none63(args) then
    return({})
  else
    local l = last(args)
    if obj63(l) and l._stash then
      local args1 = butlast(args)
      local _u78 = l
      local k = nil
      for k in next, _u78 do
        local v = _u78[k]
        if not (k == "_stash") then
          args1[k] = v
        end
      end
      return(args1)
    else
      return(args)
    end
  end
end
function search(s, pattern, start)
  local _u129
  if start then
    _u129 = start + 1
  end
  local _u81 = _u129
  local i = strlib.find(s, pattern, _u81, true)
  return(i and i - 1)
end
function split(s, sep)
  if s == "" or sep == "" then
    return({})
  else
    local l = {}
    while true do
      local i = search(s, sep)
      if nil63(i) then
        break
      else
        add(l, clip(s, 0, i))
        s = clip(s, i + 1)
      end
    end
    add(l, s)
    return(l)
  end
end
function cat(...)
  local xs = unstash({...})
  if none63(xs) then
    return("")
  else
    return(reduce(function (a, b)
      return(a .. b)
    end, xs))
  end
end
function _43(...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return(a + b)
  end, xs))
end
function _(...)
  local xs = unstash({...})
  return(reduce(function (b, a)
    return(a - b)
  end, reverse(xs)))
end
function _42(...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return(a * b)
  end, xs))
end
function _47(...)
  local xs = unstash({...})
  return(reduce(function (b, a)
    return(a / b)
  end, reverse(xs)))
end
function _37(...)
  local xs = unstash({...})
  return(reduce(function (b, a)
    return(a % b)
  end, reverse(xs)))
end
function _62(a, b)
  return(a > b)
end
function _60(a, b)
  return(a < b)
end
function _61(a, b)
  return(a == b)
end
function _6261(a, b)
  return(a >= b)
end
function _6061(a, b)
  return(a <= b)
end
function number(s)
  return(tonumber(s))
end
function number_code63(n)
  return(n > 47 and n < 58)
end
function numeric63(s)
  local i = 0
  local n = _35(s)
  while i < n do
    if not number_code63(code(s, i)) then
      return(false)
    end
    i = i + 1
  end
  return(true)
end
function string(x, depth)
  if depth and depth > 7 then
    return("#<circular>")
  else
    if nil63(x) then
      return("nil")
    else
      if nan63(x) then
        return("#nan")
      else
        if x == 1 / 0 then
          return("#+inf")
        else
          if x == -(1 / 0) then
            return("#-inf")
          else
            if boolean63(x) then
              if x then
                return("#t")
              else
                return("#f")
              end
            else
              if function63(x) then
                return("#<function>")
              else
                if atom63(x) then
                  return(x .. "")
                else
                  local s = "("
                  local sp = ""
                  local xs = {}
                  local ks = {}
                  local d = (depth or 0) + 1
                  local _u104 = x
                  local k = nil
                  for k in next, _u104 do
                    local v = _u104[k]
                    if number63(k) then
                      xs[k] = string(v, d)
                    else
                      add(ks, k .. ":")
                      add(ks, string(v, d))
                    end
                  end
                  local _u106 = join(xs, ks)
                  local _u5 = nil
                  for _u5 in next, _u106 do
                    local v = _u106[_u5]
                    s = s .. sp .. v
                    sp = " "
                  end
                  return(s .. ")")
                end
              end
            end
          end
        end
      end
    end
  end
end
local function produces_string63(x)
  return(string_literal63(x) or obj63(x) and (hd(x) == "cat" or hd(x) == "string"))
end
function space(xs)
  local string = function (x)
    if produces_string63(x) then
      return(x)
    else
      return({"string", x})
    end
  end
  if one63(xs) then
    return(string(hd(xs)))
  else
    return(reduce(function (a, b)
      return({"cat", string(a), "\" \"", string(b)})
    end, xs))
  end
end
function apply(f, args)
  local _u115 = stash(args)
  return(f(unpack(_u115)))
end
local _u116 = 0
function unique()
  _u116 = _u116 + 1
  return("_u" .. _u116)
end
function unique63(id)
  return("_u" == clip(id, 0, 2))
end
function _37message_handler(msg)
  local i = search(msg, ": ")
  return(clip(msg, i + 2))
end
function toplevel63()
  return(one63(environment))
end
function setenv(k, ...)
  local _u121 = unstash({...})
  local keys = cut(_u121, 0)
  if string63(k) then
    local _u130
    if keys.toplevel then
      _u130 = hd(environment)
    else
      _u130 = last(environment)
    end
    local frame = _u130
    local entry = frame[k] or {}
    local _u123 = keys
    local _u125 = nil
    for _u125 in next, _u123 do
      local v = _u123[_u125]
      entry[_u125] = v
    end
    frame[k] = entry
  end
end
function read_file(path)
  local f = io.open(path)
  return(f.read(f, "*a"))
end
function write_file(path, data)
  local f = io.open(path, "w")
  return(f.write(f, data))
end
function write(x)
  return(io.write(x))
end
function exit(code)
  return(os.exit(code))
end
function argv()
  return(arg)
end
function getenv(k, p)
  if string63(k) then
    local b = find(function (e)
      return(e[k])
    end, reverse(environment))
    if is63(b) then
      if p then
        return(b[p])
      else
        return(b)
      end
    end
  end
end
local function macro_function(k)
  return(getenv(k, "macro"))
end
local function macro63(k)
  return(is63(macro_function(k)))
end
local function special63(k)
  return(is63(getenv(k, "special")))
end
local function special_form63(form)
  return(obj63(form) and special63(hd(form)))
end
local function statement63(k)
  return(special63(k) and getenv(k, "stmt"))
end
local function symbol_expansion(k)
  return(getenv(k, "symbol"))
end
local function symbol63(k)
  return(is63(symbol_expansion(k)))
end
local function variable63(k)
  local b = first(function (frame)
    return(frame[k] or frame._scope)
  end, reverse(environment))
  return(obj63(b) and is63(b.variable))
end
function bound63(x)
  return(macro63(x) or special63(x) or symbol63(x) or variable63(x))
end
local function escape(s)
  local s1 = "\""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _u107
    if c == "\n" then
      _u107 = "\\n"
    else
      local _u108
      if c == "\"" then
        _u108 = "\\\""
      else
        local _u109
        if c == "\\" then
          _u109 = "\\\\"
        else
          _u109 = c
        end
        _u108 = _u109
      end
      _u107 = _u108
    end
    local c1 = _u107
    s1 = s1 .. c1
    i = i + 1
  end
  return(s1 .. "\"")
end
function quoted(form)
  if string63(form) then
    return(escape(form))
  else
    if atom63(form) then
      return(form)
    else
      return(join({"list"}, map(quoted, form)))
    end
  end
end
local function literal(s)
  if string_literal63(s) then
    return(s)
  else
    return(quoted(s))
  end
end
local function stash42(args)
  if keys63(args) then
    local l = {"%object", "\"_stash\"", true}
    local _u22 = args
    local k = nil
    for k in next, _u22 do
      local v = _u22[k]
      if not number63(k) then
        add(l, literal(k))
        add(l, v)
      end
    end
    return(join(args, {l}))
  else
    return(args)
  end
end
local function bias(k)
  if number63(k) and not (target == "lua") then
    if target == "js" then
      k = k - 1
    else
      k = k + 1
    end
  end
  return(k)
end
function bind(lh, rh)
  if obj63(lh) and obj63(rh) then
    local id = unique()
    return(join({{id, rh}}, bind(lh, id)))
  else
    if atom63(lh) then
      return({{lh, rh}})
    else
      local bs = {}
      local _u31 = lh
      local k = nil
      for k in next, _u31 do
        local v = _u31[k]
        local _u110
        if k == "rest" then
          _u110 = {"cut", rh, _35(lh)}
        else
          _u110 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _u110
        if is63(k) then
          local _u111
          if v == true then
            _u111 = k
          else
            _u111 = v
          end
          local _u36 = _u111
          bs = join(bs, bind(_u36, x))
        end
      end
      return(bs)
    end
  end
end
function bind42(args, body)
  local args1 = {}
  local function rest()
    if target == "js" then
      return({"unstash", {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", _35(args1)}})
    else
      add(args1, "|...|")
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bs = {}
    local r = unique()
    local _u53 = args
    local k = nil
    for k in next, _u53 do
      local v = _u53[k]
      if number63(k) then
        if atom63(v) then
          add(args1, v)
        else
          local x = unique()
          add(args1, x)
          bs = join(bs, {v, x})
        end
      end
    end
    if keys63(args) then
      bs = join(bs, {r, rest()})
      bs = join(bs, {keys(args), r})
    end
    return({args1, {join({"let", bs}, body)}})
  end
end
local function quoting63(depth)
  return(number63(depth))
end
local function quasiquoting63(depth)
  return(quoting63(depth) and depth > 0)
end
local function can_unquote63(depth)
  return(quoting63(depth) and depth == 1)
end
local function quasisplice63(x, depth)
  return(can_unquote63(depth) and obj63(x) and hd(x) == "unquote-splicing")
end
function macroexpand(form)
  if symbol63(form) then
    return(macroexpand(symbol_expansion(form)))
  else
    if atom63(form) then
      return(form)
    else
      local x = hd(form)
      if x == "%local" then
        local _u1 = form[1]
        local name = form[2]
        local value = form[3]
        return({"%local", name, macroexpand(value)})
      else
        if x == "%function" then
          local _u2 = form[1]
          local args = form[2]
          local body = cut(form, 2)
          add(environment, {_scope = true})
          local _u69 = args
          local _u1 = nil
          for _u1 in next, _u69 do
            local _u67 = _u69[_u1]
            setenv(_u67, {_stash = true, variable = true})
          end
          local _u68 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_u68)
        else
          if x == "%local-function" or x == "%global-function" then
            local _u3 = form[1]
            local _u72 = form[2]
            local _u73 = form[3]
            local _u74 = cut(form, 3)
            add(environment, {_scope = true})
            local _u77 = _u73
            local _u1 = nil
            for _u1 in next, _u77 do
              local _u75 = _u77[_u1]
              setenv(_u75, {_stash = true, variable = true})
            end
            local _u76 = join({x, _u72, _u73}, macroexpand(_u74))
            drop(environment)
            return(_u76)
          else
            if macro63(x) then
              return(macroexpand(apply(macro_function(x), tl(form))))
            else
              return(map(macroexpand, form))
            end
          end
        end
      end
    end
  end
end
function quasiquote_list(form, depth)
  local xs = {{"list"}}
  local _u83 = form
  local k = nil
  for k in next, _u83 do
    local v = _u83[k]
    if not number63(k) then
      local _u112
      if quasisplice63(v, depth) then
        _u112 = quasiexpand(v[2])
      else
        _u112 = quasiexpand(v, depth)
      end
      local _u85 = _u112
      last(xs)[k] = _u85
    end
  end
  step(function (x)
    if quasisplice63(x, depth) then
      local _u87 = quasiexpand(x[2])
      add(xs, _u87)
      return(add(xs, {"list"}))
    else
      return(add(last(xs), quasiexpand(x, depth)))
    end
  end, form)
  local pruned = keep(function (x)
    return(_35(x) > 1 or not (hd(x) == "list") or keys63(x))
  end, xs)
  return(join({"join*"}, pruned))
end
function quasiexpand(form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return({"quote", form})
    else
      if can_unquote63(depth) and hd(form) == "unquote" then
        return(quasiexpand(form[2]))
      else
        if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
          return(quasiquote_list(form, depth - 1))
        else
          if hd(form) == "quasiquote" then
            return(quasiquote_list(form, depth + 1))
          else
            return(quasiquote_list(form, depth))
          end
        end
      end
    end
  else
    if atom63(form) then
      return(form)
    else
      if hd(form) == "quote" then
        return(form)
      else
        if hd(form) == "quasiquote" then
          return(quasiexpand(form[2], 1))
        else
          return(map(function (x)
            return(quasiexpand(x, depth))
          end, form))
        end
      end
    end
  end
end
function expand_if(_u95)
  local a = _u95[1]
  local b = _u95[2]
  local c = cut(_u95, 2)
  if is63(b) then
    return({join({"%if", a, b}, expand_if(c))})
  else
    if is63(a) then
      return({a})
    end
  end
end
indent_level = 0
function indentation()
  return(apply(cat, replicate(indent_level, "  ")))
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return(reserved[x])
end
local function valid_code63(n)
  return(number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
end
function valid_id63(id)
  if none63(id) or reserved63(id) then
    return(false)
  else
    local i = 0
    while i < _35(id) do
      if not valid_code63(code(id, i)) then
        return(false)
      end
      i = i + 1
    end
    return(true)
  end
end
function key(k)
  local i = inner(k)
  if valid_id63(i) then
    return(i)
  else
    if target == "js" then
      return(k)
    else
      return("[" .. k .. "]")
    end
  end
end
function mapo(f, t)
  local o = {}
  local _u105 = t
  local k = nil
  for k in next, _u105 do
    local v = _u105[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
function stream(str)
  return({pos = 0, string = str, len = _35(str)})
end
function peek_char(s)
  if s.pos < s.len then
    return(char(s.string, s.pos))
  end
end
function read_char(s)
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
read_table = {}
eof = {}
function read(s)
  skip_non_code(s)
  local c = peek_char(s)
  if is63(c) then
    return((read_table[c] or read_table[""])(s))
  else
    return(eof)
  end
end
function read_all(s)
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
function read_from_string(str)
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
local _u2 = {}
local _u3 = {}
_u3.js = "!"
_u3.lua = "not "
_u2["not"] = _u3
local _u4 = {}
_u4["*"] = true
_u4["/"] = true
_u4["%"] = true
local _u5 = {}
_u5["+"] = true
_u5["-"] = true
local _u6 = {}
local _u7 = {}
_u7.js = "+"
_u7.lua = ".."
_u6.cat = _u7
local _u8 = {}
_u8["<"] = true
_u8[">"] = true
_u8["<="] = true
_u8[">="] = true
local _u9 = {}
local _u10 = {}
_u10.js = "==="
_u10.lua = "=="
_u9["="] = _u10
local _u11 = {}
local _u12 = {}
_u12.js = "&&"
_u12.lua = "and"
_u11["and"] = _u12
local _u13 = {}
local _u14 = {}
_u14.js = "||"
_u14.lua = "or"
_u13["or"] = _u14
local infix = {_u2, _u4, _u5, _u6, _u8, _u9, _u11, _u13}
local function unary63(form)
  return(_35(form) == 2 and in63(hd(form), {"not", "-"}))
end
local function index(k)
  if number63(k) then
    return(k - 1)
  end
end
local function precedence(form)
  if not (atom63(form) or unary63(form)) then
    local _u19 = infix
    local k = nil
    for k in next, _u19 do
      local v = _u19[k]
      if v[hd(form)] then
        return(index(k))
      end
    end
  end
  return(0)
end
local function getop(op)
  return(find(function (level)
    local x = level[op]
    if x == true then
      return(op)
    else
      if is63(x) then
        return(x[target])
      end
    end
  end, infix))
end
local function infix63(x)
  return(is63(getop(x)))
end
local function compile_args(args)
  local s = "("
  local c = ""
  step(function (x)
    s = s .. c .. compile(x)
    c = ", "
  end, args)
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _u111
    if c == "\n" then
      _u111 = "\\n"
    else
      _u111 = c
    end
    s1 = s1 .. _u111
    i = i + 1
  end
  return(s1 .. "")
end
local function id(id)
  local id1 = ""
  local i = 0
  while i < _35(id) do
    local c = char(id, i)
    local n = code(c)
    local _u112
    if c == "-" then
      _u112 = "_"
    else
      local _u113
      if valid_code63(n) then
        _u113 = c
      else
        local _u114
        if i == 0 then
          _u114 = "_" .. n
        else
          _u114 = n
        end
        _u113 = _u114
      end
      _u112 = _u113
    end
    local c1 = _u112
    id1 = id1 .. c1
    i = i + 1
  end
  return(id1)
end
local function compile_atom(x)
  if x == "nil" and target == "lua" then
    return(x)
  else
    if x == "nil" then
      return("undefined")
    else
      if id_literal63(x) then
        return(inner(x))
      else
        if string_literal63(x) then
          return(escape_newlines(x))
        else
          if string63(x) then
            return(id(x))
          else
            if boolean63(x) then
              if x then
                return("true")
              else
                return("false")
              end
            else
              if number63(x) then
                return(x .. "")
              else
                error("Cannot compile atom: " .. string(x))
              end
            end
          end
        end
      end
    end
  end
end
local function terminator(stmt63)
  if not stmt63 then
    return("")
  else
    if target == "js" then
      return(";\n")
    else
      return("\n")
    end
  end
end
local function compile_special(form, stmt63)
  local x = form[1]
  local args = cut(form, 1)
  local _u31 = getenv(x)
  local special = _u31.special
  local stmt = _u31.stmt
  local self_tr63 = _u31.tr
  local tr = terminator(stmt63 and not self_tr63)
  return(apply(special, args) .. tr)
end
local function parenthesize_call63(x)
  return(obj63(x) and hd(x) == "%function" or precedence(x) > 0)
end
local function compile_call(form)
  local f = hd(form)
  local f1 = compile(f)
  local args = compile_args(stash42(tl(form)))
  if parenthesize_call63(f) then
    return("(" .. f1 .. ")" .. args)
  else
    return(f1 .. args)
  end
end
local function op_delims(parent, child, ...)
  local _u34 = unstash({...})
  local right = _u34.right
  local _u115
  if right then
    _u115 = _6261
  else
    _u115 = _62
  end
  if _u115(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local op = form[1]
  local _u39 = cut(form, 1)
  local a = _u39[1]
  local b = _u39[2]
  local _u40 = op_delims(form, a)
  local ao = _u40[1]
  local ac = _u40[2]
  local _u41 = op_delims(form, b, {_stash = true, right = true})
  local bo = _u41[1]
  local bc = _u41[2]
  local _u42 = compile(a)
  local _u43 = compile(b)
  local _u44 = getop(op)
  if unary63(form) then
    return(_u44 .. ao .. _u42 .. ac)
  else
    return(ao .. _u42 .. ac .. " " .. _u44 .. " " .. bo .. _u43 .. bc)
  end
end
function compile_function(args, body, ...)
  local _u45 = unstash({...})
  local name = _u45.name
  local prefix = _u45.prefix
  local _u116
  if name then
    _u116 = compile(name)
  else
    _u116 = ""
  end
  local id = _u116
  local _u47 = compile_args(args)
  indent_level = indent_level + 1
  local _u49 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u48 = _u49
  local ind = indentation()
  local _u117
  if prefix then
    _u117 = prefix .. " "
  else
    _u117 = ""
  end
  local p = _u117
  local _u118
  if target == "js" then
    _u118 = ""
  else
    _u118 = "end"
  end
  local tr = _u118
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _u47 .. " {\n" .. _u48 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _u47 .. "\n" .. _u48 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _u51 = unstash({...})
  local stmt = _u51.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _u119
      if stmt then
        _u119 = indentation()
      else
        _u119 = ""
      end
      local ind = _u119
      local _u120
      if atom63(form) then
        _u120 = compile_atom(form)
      else
        local _u121
        if infix63(hd(form)) then
          _u121 = compile_infix(form)
        else
          _u121 = compile_call(form)
        end
        _u120 = _u121
      end
      local _u53 = _u120
      return(ind .. _u53 .. tr)
    end
  end
end
local function lower_statement(form, tail63)
  local hoist = {}
  local e = lower(form, hoist, true, tail63)
  if some63(hoist) and is63(e) then
    return(join({"do"}, join(hoist, {e})))
  else
    if is63(e) then
      return(e)
    else
      if _35(hoist) > 1 then
        return(join({"do"}, hoist))
      else
        return(hd(hoist))
      end
    end
  end
end
local function lower_body(body, tail63)
  return(lower_statement(join({"do"}, body), tail63))
end
local function lower_do(args, hoist, stmt63, tail63)
  step(function (x)
    return(add(hoist, lower(x, hoist, stmt63)))
  end, butlast(args))
  local e = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(e) then
    return({"return", e})
  else
    return(e)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local cond = args[1]
  local _u64 = args[2]
  local _u65 = args[3]
  if stmt63 or tail63 then
    local _u123
    if _u65 then
      _u123 = {lower_body({_u65}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u64}, tail63)}, _u123)))
  else
    local e = unique()
    add(hoist, {"%local", e})
    local _u122
    if _u65 then
      _u122 = {lower({"set", e, _u65})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u64})}, _u122))
    return(e)
  end
end
local function lower_short(x, args, hoist)
  local a = args[1]
  local b = args[2]
  local hoist1 = {}
  local b1 = lower(b, hoist1)
  if some63(hoist1) then
    local id = unique()
    local _u124
    if x == "and" then
      _u124 = {"%if", id, b, id}
    else
      _u124 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _u124}, hoist))
  else
    return({x, lower(a, hoist), b1})
  end
end
local function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
local function lower_while(args, hoist)
  local c = args[1]
  local body = cut(args, 1)
  return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
end
local function lower_for(args, hoist)
  local t = args[1]
  local k = args[2]
  local body = cut(args, 2)
  return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
end
local function lower_function(args)
  local a = args[1]
  local body = cut(args, 1)
  return({"%function", a, lower_body(body, true)})
end
local function lower_definition(kind, args, hoist)
  local name = args[1]
  local _u90 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _u90, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _u93 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_u93) then
    return(_u93)
  end
end
local function lower_infix63(form)
  return(infix63(hd(form)) and _35(form) > 3)
end
local function lower_infix(form, hoist)
  local x = form[1]
  local args = cut(form, 1)
  return(lower(reduce(function (a, b)
    return({x, b, a})
  end, reverse(args)), hoist))
end
local function lower_special(form, hoist)
  local e = lower_call(form, hoist)
  if e then
    return(add(hoist, e))
  end
end
function lower(form, hoist, stmt63, tail63)
  if atom63(form) then
    return(form)
  else
    if empty63(form) then
      return({"%array"})
    else
      if nil63(hoist) then
        return(lower_statement(form))
      else
        if lower_infix63(form) then
          return(lower_infix(form, hoist))
        else
          local x = form[1]
          local args = cut(form, 1)
          if x == "do" then
            return(lower_do(args, hoist, stmt63, tail63))
          else
            if x == "%if" then
              return(lower_if(args, hoist, stmt63, tail63))
            else
              if x == "%try" then
                return(lower_try(args, hoist, tail63))
              else
                if x == "while" then
                  return(lower_while(args, hoist))
                else
                  if x == "%for" then
                    return(lower_for(args, hoist))
                  else
                    if x == "%function" then
                      return(lower_function(args))
                    else
                      if x == "%local-function" or x == "%global-function" then
                        return(lower_definition(x, args, hoist))
                      else
                        if in63(x, {"and", "or"}) then
                          return(lower_short(x, args, hoist))
                        else
                          if statement63(x) then
                            return(lower_special(form, hoist))
                          else
                            return(lower_call(form, hoist))
                          end
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
local function expand(form)
  return(lower(macroexpand(form)))
end
local load1 = load
local function run(code)
  local f,e = load1(code)
  if f then
    return(f())
  else
    error(e .. " in " .. code)
  end
end
_37result = nil
function eval(form)
  local previous = target
  target = "lua"
  local code = compile(expand({"set", "%result", form}))
  target = previous
  run(code)
  return(_37result)
end
function run_file(path)
  return(run(read_file(path)))
end
function compile_file(path)
  local s = stream(read_file(path))
  local body = read_all(s)
  local form = expand(join({"do"}, body))
  return(compile(form))
end
function load(path)
  return(run(compile_file(path)))
end
setenv("do", {_stash = true, special = function (...)
  local forms = unstash({...})
  local s = ""
  step(function (x)
    s = s .. compile(x, {_stash = true, stmt = true})
  end, forms)
  return(s)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local _u12 = compile(cond)
  indent_level = indent_level + 1
  local _u14 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u13 = _u14
  local _u105
  if alt then
    indent_level = indent_level + 1
    local _u16 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _u105 = _u16
  end
  local _u15 = _u105
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _u12 .. ") {\n" .. _u13 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _u12 .. " then\n" .. _u13
  end
  if _u15 and target == "js" then
    s = s .. " else {\n" .. _u15 .. ind .. "}"
  else
    if _u15 then
      s = s .. ind .. "else\n" .. _u15
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local _u21 = compile(cond)
  indent_level = indent_level + 1
  local _u22 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u22
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _u21 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _u21 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local _u27 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u28 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u28
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _u27 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _u27 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u36 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u36
  local e = unique()
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _u40 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _u40
  return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  return(indentation() .. "delete " .. compile(place))
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return(indentation() .. "break")
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return(compile_function(args, body))
end})
setenv("%global-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, name = name})
    return(indentation() .. x)
  else
    return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return(indentation() .. x)
  else
    return(compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local _u106
  if nil63(x) then
    _u106 = "return"
  else
    _u106 = "return(" .. compile(x) .. ")"
  end
  local _u63 = _u106
  return(indentation() .. _u63)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _u107
  if target == "js" then
    _u107 = "throw new " .. compile({"Error", x})
  else
    _u107 = "error(" .. compile(x) .. ")"
  end
  local e = _u107
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _u108
  if is63(value) then
    _u108 = " = " .. value1
  else
    _u108 = ""
  end
  local rh = _u108
  local _u109
  if target == "js" then
    _u109 = "var "
  else
    _u109 = "local "
  end
  local keyword = _u109
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _u78 = compile(lh)
  local _u110
  if nil63(rh) then
    _u110 = "nil"
  else
    _u110 = rh
  end
  local _u79 = compile(_u110)
  return(indentation() .. _u78 .. " = " .. _u79)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _u83 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_u83, 0) == "{" then
    _u83 = "(" .. _u83 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_u83 .. "." .. inner(k))
  else
    return(_u83 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _u111
  if target == "lua" then
    _u111 = "{"
  else
    _u111 = "["
  end
  local open = _u111
  local _u112
  if target == "lua" then
    _u112 = "}"
  else
    _u112 = "]"
  end
  local close = _u112
  local s = ""
  local c = ""
  local _u91 = forms
  local k = nil
  for k in next, _u91 do
    local v = _u91[k]
    if number63(k) then
      s = s .. c .. compile(v)
      c = ", "
    end
  end
  return(open .. s .. close)
end})
setenv("%object", {_stash = true, special = function (...)
  local forms = unstash({...})
  local s = "{"
  local c = ""
  local _u113
  if target == "lua" then
    _u113 = " = "
  else
    _u113 = ": "
  end
  local sep = _u113
  local _u101 = pair(forms)
  local k = nil
  for k in next, _u101 do
    local v = _u101[k]
    if number63(k) then
      local _u103 = v[1]
      local _u104 = v[2]
      if not string63(_u103) then
        error("Illegal key: " .. string(_u103))
      end
      s = s .. c .. key(_u103) .. sep .. compile(_u104)
      c = ", "
    end
  end
  return(s .. "}")
end})
setenv("quote", {_stash = true, macro = function (form)
  return(quoted(form))
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return(quasiexpand(form, 1))
end})
setenv("at", {_stash = true, macro = function (l, i)
  if target == "lua" and number63(i) then
    i = i + 1
  else
    if target == "lua" then
      i = {"+", i, 1}
    end
  end
  return({"get", l, i})
end})
setenv("wipe", {_stash = true, macro = function (place)
  if target == "lua" then
    return({"set", place, "nil"})
  else
    return({"%delete", place})
  end
end})
setenv("list", {_stash = true, macro = function (...)
  local body = unstash({...})
  local l = {}
  local forms = {}
  local id = unique()
  local _u32 = body
  local k = nil
  for k in next, _u32 do
    local v = _u32[k]
    if number63(k) then
      l[k] = v
    else
      add(forms, {"set", {"get", id, {"quote", k}}, v})
    end
  end
  if some63(forms) then
    return(join({"let", {id, join({"%array"}, l)}}, join(forms, {id})))
  else
    return(join({"%array"}, l))
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local branches = unstash({...})
  return(hd(expand_if(branches)))
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local _u46 = unstash({...})
  local body = cut(_u46, 0)
  return({"if", cond, join({"do"}, body)})
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local _u54 = unstash({...})
  local body = cut(_u54, 0)
  return({"if", {"not", cond}, join({"do"}, body)})
end})
setenv("obj", {_stash = true, macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (x)
    return(x)
  end, body)))
end})
setenv("let", {_stash = true, macro = function (bindings, ...)
  local _u76 = unstash({...})
  local body = cut(_u76, 0)
  if _35(bindings) < 2 then
    return(join({"do"}, body))
  else
    local renames = {}
    local locals = {}
    local lh = bindings[1]
    local rh = bindings[2]
    local _u79 = bind(lh, rh)
    local k = nil
    for k in next, _u79 do
      local _u81 = _u79[k]
      local id = _u81[1]
      local val = _u81[2]
      if number63(k) then
        if not unique63(id) and (bound63(id) or reserved63(id) or toplevel63()) then
          local id1 = unique()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
      end
    end
    return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", cut(bindings, 2)}, body)}})))
  end
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local _u91 = unstash({...})
  local body = cut(_u91, 0)
  local _u93 = {"setenv", {"quote", name}}
  _u93.macro = join({"fn", args}, body)
  local form = _u93
  eval(form)
  return(form)
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local _u100 = unstash({...})
  local body = cut(_u100, 0)
  local _u102 = {"setenv", {"quote", name}}
  _u102.special = join({"fn", args}, body)
  local form = join(_u102, keys(body))
  eval(form)
  return(form)
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local _u110 = {"setenv", {"quote", name}}
  _u110.symbol = {"quote", expansion}
  return(_u110)
end})
setenv("define-reader", {_stash = true, macro = function (_u120, ...)
  local char = _u120[1]
  local s = _u120[2]
  local _u119 = unstash({...})
  local body = cut(_u119, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {s}}, body)})
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local _u131 = unstash({...})
  local body = cut(_u131, 0)
  setenv(name, {_stash = true, toplevel = true, variable = true})
  if some63(body) then
    local _u133 = bind42(x, body)
    local args = _u133[1]
    local _u134 = _u133[2]
    return(join({"%global-function", name, args}, _u134))
  else
    return({"set", name, x})
  end
end})
setenv("define-local", {_stash = true, macro = function (name, x, ...)
  local _u142 = unstash({...})
  local body = cut(_u142, 0)
  setenv(name, {_stash = true, variable = true})
  if some63(body) then
    local _u144 = bind42(x, body)
    local args = _u144[1]
    local _u145 = _u144[2]
    return(join({"%local-function", name, args}, _u145))
  else
    return({"%local", name, x})
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local _u156 = unstash({...})
  local body = cut(_u156, 0)
  local scope = _u156.scope
  local x = unique()
  local _u160 = {"obj"}
  _u160._scope = scope
  return({"do", {"add", "environment", _u160}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end})
setenv("with-bindings", {_stash = true, macro = function (_u172, ...)
  local names = _u172[1]
  local _u171 = unstash({...})
  local body = cut(_u171, 0)
  local x = unique()
  local _u177 = {"setenv", x}
  _u177.variable = true
  local _u174 = {"with-frame", {"each", {"_u1", x}, names, _u177}}
  _u174.scope = true
  return(join(_u174, body))
end})
setenv("let-fn", {_stash = true, macro = function (_u184, ...)
  local name = _u184[1]
  local args = _u184[2]
  local fn_body = cut(_u184, 2)
  local _u183 = unstash({...})
  local body = cut(_u183, 0)
  return(join({"let", {name, join({"fn", args}, fn_body)}}, body))
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local _u194 = unstash({...})
  local body = cut(_u194, 0)
  add(environment, {})
  map(function (m)
    return(macroexpand(join({"define-macro"}, m)))
  end, definitions)
  local _u196 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_u196)
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local _u206 = unstash({...})
  local body = cut(_u206, 0)
  add(environment, {})
  map(function (_u210)
    local name = _u210[1]
    local exp = _u210[2]
    return(macroexpand({"define-symbol", name, exp}))
  end, pair(expansions))
  local _u208 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_u208)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local _u218 = unstash({...})
  local body = cut(_u218, 0)
  local _u220 = bind42(args, body)
  local _u221 = _u220[1]
  local _u222 = _u220[2]
  return(join({"%function", _u221}, _u222))
end})
setenv("guard", {_stash = true, macro = function (expr)
  if target == "js" then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = unique()
    local x = unique()
    local ex = "|" .. e .. "," .. x .. "|"
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
  end
end})
setenv("each", {_stash = true, macro = function (_u260, t, ...)
  local k = _u260[1]
  local v = _u260[2]
  local _u259 = unstash({...})
  local body = cut(_u259, 0)
  local x = unique()
  local n = unique()
  local _u337
  if target == "lua" then
    _u337 = body
  else
    _u337 = {join({"let", {k, {"if", {"numeric?", k}, {"parseInt", k}, k}}}, body)}
  end
  return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u337)}})
end})
setenv("set-of", {_stash = true, macro = function (...)
  local xs = unstash({...})
  local l = {}
  local _u279 = xs
  local _u2 = nil
  for _u2 in next, _u279 do
    local x = _u279[_u2]
    l[x] = true
  end
  return(join({"obj"}, l))
end})
setenv("language", {_stash = true, macro = function ()
  return({"quote", target})
end})
setenv("target", {_stash = true, macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end})
setenv("join*", {_stash = true, macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local _u295 = unstash({...})
  local bs = cut(_u295, 0)
  return({"set", a, join({"join*", a}, bs)})
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local _u302 = unstash({...})
  local bs = cut(_u302, 0)
  return({"set", a, join({"cat", a}, bs)})
end})
setenv("inc", {_stash = true, macro = function (n, by)
  return({"set", n, {"+", n, by or 1}})
end})
setenv("dec", {_stash = true, macro = function (n, by)
  return({"set", n, {"-", n, by or 1}})
end})
setenv("pr", {_stash = true, macro = function (...)
  local xs = unstash({...})
  return({"print", space(xs)})
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local result = unique()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end})
setenv("#t", {_stash = true, symbol = true})
setenv("#f", {_stash = true, symbol = false})
setenv("#nan", {_stash = true, symbol = {"/", 0, 0}})
setenv("#+inf", {_stash = true, symbol = {"/", 1, 0}})
setenv("#-inf", {_stash = true, symbol = {"-", {"/", 1, 0}}})
local function rep(s)
  local _u4,_u5 = xpcall(function ()
    return(eval(read_from_string(s)))
  end, _37message_handler)
  local _u3 = {_u4, _u5}
  local _u1 = _u3[1]
  local x = _u3[2]
  if is63(x) then
    return(print(string(x)))
  end
end
local function repl()
  write("> ")
  local rep1 = function (s)
    rep(s)
    return(write("> "))
  end
  while true do
    local s = io.read()
    if s then
      rep1(s)
    else
      break
    end
  end
end
local function usage()
  print("usage: lumen [options] <object files>")
  print("options:")
  print("  -c <input>\tInput file")
  print("  -o <output>\tOutput file")
  print("  -t <target>\tTarget language (default: lua)")
  print("  -e <expr>\tExpression to evaluate")
  return(exit())
end
local function main()
  local as = argv()
  if hd(as) == "-h" or hd(as) == "--help" then
    usage()
  end
  local pre = {}
  local input = nil
  local output = nil
  local target1 = nil
  local expr = nil
  local n = _35(as)
  local i = 0
  while i < n do
    local a = as[i + 1]
    if a == "-c" or a == "-o" or a == "-t" or a == "-e" then
      if i == n - 1 then
        print("missing argument for" .. " " .. string(a))
      else
        i = i + 1
        local val = as[i + 1]
        if a == "-c" then
          input = val
        else
          if a == "-o" then
            output = val
          else
            if a == "-t" then
              target1 = val
            else
              if a == "-e" then
                expr = val
              end
            end
          end
        end
      end
    else
      if not ("-" == char(a, 0)) then
        add(pre, a)
      end
    end
    i = i + 1
  end
  step(run_file, pre)
  if input and output then
    if target1 then
      target = target1
    end
    local code = compile_file(input)
    return(write_file(output, code))
  else
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end
main()
