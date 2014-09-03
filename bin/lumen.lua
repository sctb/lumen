environment = {{}}
target = "lua"
function nil63(x)
  return(x == nil)
end
function is63(x)
  return(not nil63(x))
end
function length(x)
  return(#x)
end
function none63(x)
  return(length(x) == 0)
end
function some63(x)
  return(length(x) > 0)
end
function one63(x)
  return(length(x) == 1)
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
function composite63(x)
  return(is63(x) and type(x) == "table")
end
function atom63(x)
  return(nil63(x) or not composite63(x))
end
function table63(x)
  return(composite63(x) and nil63(hd(x)))
end
function list63(x)
  return(composite63(x) and is63(hd(x)))
end
function nan63(n)
  return(not (n == n))
end
function inf63(n)
  return(n == 1 / 0 or n == -(1 / 0))
end
strlib = string
function clip(s, from, upto)
  return(strlib.sub(s, from + 1, upto))
end
function cut(x, from, upto)
  local l = {}
  local j = 0
  local _u129
  if nil63(from) or from < 0 then
    _u129 = 0
  else
    _u129 = from
  end
  local i = _u129
  local n = length(x)
  local _u130
  if nil63(upto) or upto > n then
    _u130 = n
  else
    _u130 = upto
  end
  local _u26 = _u130
  while i < _u26 do
    l[j + 1] = x[i + 1]
    i = i + 1
    j = j + 1
  end
  local _u27 = x
  local k = nil
  for k in next, _u27 do
    local v = _u27[k]
    if not number63(k) then
      l[k] = v
    end
  end
  return(l)
end
function keys(x)
  local t = {}
  local _u30 = x
  local k = nil
  for k in next, _u30 do
    local v = _u30[k]
    if not number63(k) then
      t[k] = v
    end
  end
  return(t)
end
function edge(x)
  return(length(x) - 1)
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
  local _u131
  if n then
    _u131 = n + 1
  end
  return(strlib.byte(s, _u131))
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
    local o = length(a)
    local _u45 = a
    local k = nil
    for k in next, _u45 do
      local v = _u45[k]
      c[k] = v
    end
    local _u47 = b
    local k = nil
    for k in next, _u47 do
      local v = _u47[k]
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
function shift(k, n)
  if number63(k) then
    return(k - n)
  else
    return(k)
  end
end
function keep(f, x)
  local t = {}
  local o = 0
  local _u52 = x
  local k = nil
  for k in next, _u52 do
    local v = _u52[k]
    if f(v) then
      t[shift(k, o)] = v
    else
      o = o + 1
    end
  end
  return(t)
end
function find(f, t)
  local _u55 = t
  local _u1 = nil
  for _u1 in next, _u55 do
    local x = _u55[_u1]
    local _u57 = f(x)
    if _u57 then
      return(_u57)
    end
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
  while i < length(l) do
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
function series(f, l)
  return(iterate(function (i)
    return(f(l[i + 1]))
  end, length(l)))
end
function first(f, l)
  local i = 0
  local n = length(l)
  while i < n do
    local x = f(l[i + 1])
    if x then
      return(x)
    end
    i = i + 1
  end
end
function map(f, x)
  local t = {}
  local o = 0
  local _u70 = x
  local k = nil
  for k in next, _u70 do
    local v = _u70[k]
    local y = f(v)
    if is63(y) then
      t[shift(k, o)] = y
    else
      o = o + 1
    end
  end
  return(t)
end
function keys63(t)
  local b = false
  local _u73 = t
  local k = nil
  for k in next, _u73 do
    local _u2 = _u73[k]
    if not number63(k) then
      b = true
      break
    end
  end
  return(b)
end
function empty63(t)
  local b = true
  local _u76 = t
  local _u3 = nil
  for _u3 in next, _u76 do
    local _u4 = _u76[_u3]
    b = false
    break
  end
  return(b)
end
function stash(args)
  if keys63(args) then
    local p = {}
    local _u79 = args
    local k = nil
    for k in next, _u79 do
      local v = _u79[k]
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
    if table63(l) and l._stash then
      local args1 = butlast(args)
      local _u82 = l
      local k = nil
      for k in next, _u82 do
        local v = _u82[k]
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
  local _u132
  if start then
    _u132 = start + 1
  end
  local _u85 = _u132
  local i = strlib.find(s, pattern, _u85, true)
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
function today()
  return(os.date("!%F"))
end
function now()
  return(os.time())
end
function number(s)
  return(tonumber(s))
end
function string(x, depth)
  if depth and depth > 5 then
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
                  local _u108 = x
                  local k = nil
                  for k in next, _u108 do
                    local v = _u108[k]
                    if number63(k) then
                      xs[k] = string(v, d)
                    else
                      add(ks, k .. ":")
                      add(ks, string(v, d))
                    end
                  end
                  local _u110 = join(xs, ks)
                  local _u5 = nil
                  for _u5 in next, _u110 do
                    local v = _u110[_u5]
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
function produces_string63(x)
  return(string_literal63(x) or list63(x) and (hd(x) == "cat" or hd(x) == "string"))
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
  local _u119 = stash(args)
  return(f(unpack(_u119)))
end
local _u120 = 0
function unique()
  _u120 = _u120 + 1
  return("_u" .. _u120)
end
function _37message_handler(msg)
  local i = search(msg, ": ")
  return(clip(msg, i + 2))
end
function toplevel63()
  return(one63(environment))
end
function setenv(k, ...)
  local _u124 = unstash({...})
  local keys = cut(_u124, 0)
  if string63(k) then
    local _u133
    if keys.toplevel then
      _u133 = hd(environment)
    else
      _u133 = last(environment)
    end
    local frame = _u133
    local entry = frame[k] or {}
    local _u126 = keys
    local _u128 = nil
    for _u128 in next, _u126 do
      local v = _u126[_u128]
      entry[_u128] = v
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
function macro_function(k)
  return(getenv(k, "macro"))
end
function macro63(k)
  return(is63(macro_function(k)))
end
function special63(k)
  return(is63(getenv(k, "special")))
end
function special_form63(form)
  return(list63(form) and special63(hd(form)))
end
function statement63(k)
  return(special63(k) and getenv(k, "stmt"))
end
function symbol_expansion(k)
  return(getenv(k, "symbol"))
end
function symbol63(k)
  return(is63(symbol_expansion(k)))
end
function variable63(k)
  local b = first(function (frame)
    return(frame[k] or frame._scope)
  end, reverse(environment))
  return(table63(b) and is63(b.variable))
end
function bound63(x)
  return(macro63(x) or special63(x) or symbol63(x) or variable63(x))
end
function escape(s)
  local s1 = "\""
  local i = 0
  while i < length(s) do
    local c = char(s, i)
    local _u112
    if c == "\n" then
      _u112 = "\\n"
    else
      local _u113
      if c == "\"" then
        _u113 = "\\\""
      else
        local _u114
        if c == "\\" then
          _u114 = "\\\\"
        else
          _u114 = c
        end
        _u113 = _u114
      end
      _u112 = _u113
    end
    local c1 = _u112
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
function literal(s)
  if string_literal63(s) then
    return(s)
  else
    return(quoted(s))
  end
end
function stash42(args)
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
function index(k)
  if number63(k) then
    return(k - 1)
  end
end
function bias(k)
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
  if composite63(lh) and list63(rh) then
    local id = unique()
    return(join({{id, rh}}, bind(lh, id)))
  else
    if atom63(lh) then
      return({{lh, rh}})
    else
      local bs = {}
      local _u32 = lh
      local k = nil
      for k in next, _u32 do
        local v = _u32[k]
        local _u115
        if k == "rest" then
          _u115 = {"cut", rh, length(lh)}
        else
          _u115 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _u115
        local _u116
        if v == true then
          _u116 = k
        else
          _u116 = v
        end
        local _u37 = _u116
        bs = join(bs, bind(_u37, x))
      end
      return(bs)
    end
  end
end
function bind42(args, body)
  local args1 = {}
  local rest = function ()
    if target == "js" then
      return({"unstash", {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", length(args1)}})
    else
      add(args1, "|...|")
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bs = {}
    local k63 = keys63(args)
    local r = unique()
    local _u54 = args
    local k = nil
    for k in next, _u54 do
      local v = _u54[k]
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
    if k63 then
      bs = join(bs, {r, rest()})
      bs = join(bs, {keys(args), r})
    end
    return({args1, {join({"let", bs}, body)}})
  end
end
function quoting63(depth)
  return(number63(depth))
end
function quasiquoting63(depth)
  return(quoting63(depth) and depth > 0)
end
function can_unquote63(depth)
  return(quoting63(depth) and depth == 1)
end
function quasisplice63(x, depth)
  return(list63(x) and can_unquote63(depth) and hd(x) == "unquote-splicing")
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
          local _u70 = args
          local _u72 = nil
          for _u72 in next, _u70 do
            local _u68 = _u70[_u72]
            setenv(_u68, {_stash = true, variable = true})
          end
          local _u69 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_u69)
        else
          if x == "%local-function" or x == "%global-function" then
            local _u3 = form[1]
            local _u74 = form[2]
            local _u75 = form[3]
            local _u76 = cut(form, 3)
            add(environment, {_scope = true})
            local _u79 = _u75
            local _u81 = nil
            for _u81 in next, _u79 do
              local _u77 = _u79[_u81]
              setenv(_u77, {_stash = true, variable = true})
            end
            local _u78 = join({x, _u74, _u75}, macroexpand(_u76))
            drop(environment)
            return(_u78)
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
  local _u86 = form
  local k = nil
  for k in next, _u86 do
    local v = _u86[k]
    if not number63(k) then
      local _u117
      if quasisplice63(v, depth) then
        _u117 = quasiexpand(v[2])
      else
        _u117 = quasiexpand(v, depth)
      end
      local _u88 = _u117
      last(xs)[k] = _u88
    end
  end
  series(function (x)
    if quasisplice63(x, depth) then
      local _u90 = quasiexpand(x[2])
      add(xs, _u90)
      return(add(xs, {"list"}))
    else
      return(add(last(xs), quasiexpand(x, depth)))
    end
  end, form)
  local pruned = keep(function (x)
    return(length(x) > 1 or not (hd(x) == "list") or keys63(x))
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
function expand_if(_u98)
  local a = _u98[1]
  local b = _u98[2]
  local c = cut(_u98, 2)
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
reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return(reserved[x])
end
function numeric63(n)
  return(n > 47 and n < 58)
end
function valid_code63(n)
  return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
end
function valid_id63(id)
  if none63(id) or reserved63(id) then
    return(false)
  else
    local i = 0
    while i < length(id) do
      if not valid_code63(code(id, i)) then
        return(false)
      end
      i = i + 1
    end
    return(true)
  end
end
function id(id)
  local id1 = ""
  local i = 0
  while i < length(id) do
    local c = char(id, i)
    local n = code(c)
    local _u118
    if c == "-" then
      _u118 = "_"
    else
      local _u119
      if valid_code63(n) then
        _u119 = c
      else
        local _u120
        if i == 0 then
          _u120 = "_" .. n
        else
          _u120 = n
        end
        _u119 = _u120
      end
      _u118 = _u119
    end
    local c1 = _u118
    id1 = id1 .. c1
    i = i + 1
  end
  return(id1)
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
  local _u110 = t
  local k = nil
  for k in next, _u110 do
    local v = _u110[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
function stream(str)
  return({pos = 0, string = str, len = length(str)})
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
function skip_non_code(s)
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
function key63(atom)
  return(string63(atom) and length(atom) > 1 and char(atom, edge(atom)) == ":")
end
function flag63(atom)
  return(string63(atom) and length(atom) > 1 and char(atom, 0) == ":")
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
local _u3 = {}
local _u4 = {}
_u4.js = "!"
_u4.lua = "not "
_u3["not"] = _u4
local _u6 = {}
_u6["*"] = true
_u6["/"] = true
_u6["%"] = true
local _u8 = {}
_u8["+"] = true
_u8["-"] = true
local _u10 = {}
local _u11 = {}
_u11.js = "+"
_u11.lua = ".."
_u10.cat = _u11
local _u13 = {}
_u13["<"] = true
_u13[">"] = true
_u13["<="] = true
_u13[">="] = true
local _u15 = {}
local _u16 = {}
_u16.js = "==="
_u16.lua = "=="
_u15["="] = _u16
local _u18 = {}
local _u19 = {}
_u19.js = "&&"
_u19.lua = "and"
_u18["and"] = _u19
local _u21 = {}
local _u22 = {}
_u22.js = "||"
_u22.lua = "or"
_u21["or"] = _u22
infix = {_u3, _u6, _u8, _u10, _u13, _u15, _u18, _u21}
function unary63(form)
  return(length(form) == 2 and in63(hd(form), {"not", "-"}))
end
function precedence(form)
  if list63(form) and not unary63(form) then
    local _u26 = infix
    local k = nil
    for k in next, _u26 do
      local v = _u26[k]
      if v[hd(form)] then
        return(index(k))
      end
    end
  end
  return(0)
end
function getop(op)
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
function infix63(x)
  return(is63(getop(x)))
end
function compile_args(args)
  local s = "("
  local c = ""
  series(function (x)
    s = s .. c .. compile(x)
    c = ", "
  end, args)
  return(s .. ")")
end
function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < length(s) do
    local c = char(s, i)
    local _u117
    if c == "\n" then
      _u117 = "\\n"
    else
      _u117 = c
    end
    s1 = s1 .. _u117
    i = i + 1
  end
  return(s1 .. "")
end
function compile_atom(x)
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
function terminator(stmt63)
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
function compile_special(form, stmt63)
  local x = form[1]
  local args = cut(form, 1)
  local _u37 = getenv(x)
  local special = _u37.special
  local stmt = _u37.stmt
  local self_tr63 = _u37.tr
  local tr = terminator(stmt63 and not self_tr63)
  return(apply(special, args) .. tr)
end
function parenthesize_call63(x)
  return(list63(x) and hd(x) == "%function" or precedence(x) > 0)
end
function compile_call(form)
  local f = hd(form)
  local f1 = compile(f)
  local args = compile_args(stash42(tl(form)))
  if parenthesize_call63(f) then
    return("(" .. f1 .. ")" .. args)
  else
    return(f1 .. args)
  end
end
function op_delims(parent, child, ...)
  local _u40 = unstash({...})
  local right = _u40.right
  local _u118
  if right then
    _u118 = _6261
  else
    _u118 = _62
  end
  if _u118(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
function compile_infix(form)
  local op = form[1]
  local _u45 = cut(form, 1)
  local a = _u45[1]
  local b = _u45[2]
  local _u46 = op_delims(form, a)
  local ao = _u46[1]
  local ac = _u46[2]
  local _u47 = op_delims(form, b, {_stash = true, right = true})
  local bo = _u47[1]
  local bc = _u47[2]
  local _u48 = compile(a)
  local _u49 = compile(b)
  local _u50 = getop(op)
  if unary63(form) then
    return(_u50 .. ao .. _u48 .. ac)
  else
    return(ao .. _u48 .. ac .. " " .. _u50 .. " " .. bo .. _u49 .. bc)
  end
end
function compile_function(args, body, ...)
  local _u51 = unstash({...})
  local name = _u51.name
  local prefix = _u51.prefix
  local _u119
  if name then
    _u119 = compile(name)
  else
    _u119 = ""
  end
  local id = _u119
  local _u53 = compile_args(args)
  indent_level = indent_level + 1
  local _u55 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u54 = _u55
  local ind = indentation()
  local _u120
  if prefix then
    _u120 = prefix .. " "
  else
    _u120 = ""
  end
  local p = _u120
  local _u121
  if target == "js" then
    _u121 = ""
  else
    _u121 = "end"
  end
  local tr = _u121
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _u53 .. " {\n" .. _u54 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _u53 .. "\n" .. _u54 .. ind .. tr)
  end
end
function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _u57 = unstash({...})
  local stmt = _u57.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _u122
      if stmt then
        _u122 = indentation()
      else
        _u122 = ""
      end
      local ind = _u122
      local _u123
      if atom63(form) then
        _u123 = compile_atom(form)
      else
        local _u124
        if infix63(hd(form)) then
          _u124 = compile_infix(form)
        else
          _u124 = compile_call(form)
        end
        _u123 = _u124
      end
      local _u59 = _u123
      return(ind .. _u59 .. tr)
    end
  end
end
function lower_statement(form, tail63)
  local hoist = {}
  local e = lower(form, hoist, true, tail63)
  if some63(hoist) and is63(e) then
    return(join({"do"}, join(hoist, {e})))
  else
    if is63(e) then
      return(e)
    else
      if length(hoist) > 1 then
        return(join({"do"}, hoist))
      else
        return(hd(hoist))
      end
    end
  end
end
function lower_body(body, tail63)
  return(lower_statement(join({"do"}, body), tail63))
end
function lower_do(args, hoist, stmt63, tail63)
  series(function (x)
    return(add(hoist, lower(x, hoist, stmt63)))
  end, butlast(args))
  local e = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(e) then
    return({"return", e})
  else
    return(e)
  end
end
function lower_if(args, hoist, stmt63, tail63)
  local cond = args[1]
  local _u70 = args[2]
  local _u71 = args[3]
  if stmt63 or tail63 then
    local _u126
    if _u71 then
      _u126 = {lower_body({_u71}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u70}, tail63)}, _u126)))
  else
    local e = unique()
    add(hoist, {"%local", e})
    local _u125
    if _u71 then
      _u125 = {lower({"set", e, _u71})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u70})}, _u125))
    return(e)
  end
end
function lower_short(x, args, hoist)
  local a = args[1]
  local b = args[2]
  local hoist1 = {}
  local b1 = lower(b, hoist1)
  if some63(hoist1) then
    local id = unique()
    local _u127
    if x == "and" then
      _u127 = {"%if", id, b, id}
    else
      _u127 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _u127}, hoist))
  else
    return({x, lower(a, hoist), b1})
  end
end
function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
function lower_while(args, hoist)
  local c = args[1]
  local body = cut(args, 1)
  return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
end
function lower_for(args, hoist)
  local t = args[1]
  local k = args[2]
  local body = cut(args, 2)
  return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
end
function lower_function(args)
  local a = args[1]
  local body = cut(args, 1)
  return({"%function", a, lower_body(body, true)})
end
function lower_definition(kind, args, hoist)
  local name = args[1]
  local _u96 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _u96, lower_body(body, true)}))
end
function lower_call(form, hoist)
  local _u99 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_u99) then
    return(_u99)
  end
end
function lower_infix63(form)
  return(infix63(hd(form)) and length(form) > 3)
end
function lower_infix(form, hoist)
  local x = form[1]
  local args = cut(form, 1)
  return(lower(reduce(function (a, b)
    return({x, b, a})
  end, reverse(args)), hoist))
end
function lower_special(form, hoist)
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
function expand(form)
  return(lower(macroexpand(form)))
end
load1 = load
function run(code)
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
  series(function (x)
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
  local _u103
  if alt then
    indent_level = indent_level + 1
    local _u16 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _u103 = _u16
  end
  local _u15 = _u103
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
  local _u104
  if nil63(x) then
    _u104 = "return"
  else
    _u104 = "return(" .. compile(x) .. ")"
  end
  local _u61 = _u104
  return(indentation() .. _u61)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _u105
  if target == "js" then
    _u105 = "throw new " .. compile({"Error", x})
  else
    _u105 = "error(" .. compile(x) .. ")"
  end
  local e = _u105
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _u106
  if is63(value) then
    _u106 = " = " .. value1
  else
    _u106 = ""
  end
  local rh = _u106
  local _u107
  if target == "js" then
    _u107 = "var "
  else
    _u107 = "local "
  end
  local keyword = _u107
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _u76 = compile(lh)
  local _u108
  if nil63(rh) then
    _u108 = "nil"
  else
    _u108 = rh
  end
  local _u77 = compile(_u108)
  return(indentation() .. _u76 .. " = " .. _u77)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _u81 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_u81, 0) == "{" then
    _u81 = "(" .. _u81 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_u81 .. "." .. inner(k))
  else
    return(_u81 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _u109
  if target == "lua" then
    _u109 = "{"
  else
    _u109 = "["
  end
  local open = _u109
  local _u110
  if target == "lua" then
    _u110 = "}"
  else
    _u110 = "]"
  end
  local close = _u110
  local s = ""
  local c = ""
  local _u89 = forms
  local k = nil
  for k in next, _u89 do
    local v = _u89[k]
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
  local _u111
  if target == "lua" then
    _u111 = " = "
  else
    _u111 = ": "
  end
  local sep = _u111
  local _u99 = pair(forms)
  local k = nil
  for k in next, _u99 do
    local v = _u99[k]
    if number63(k) then
      local _u101 = v[1]
      local _u102 = v[2]
      if not string63(_u101) then
        error("Illegal key: " .. string(_u101))
      end
      s = s .. c .. key(_u101) .. sep .. compile(_u102)
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
setenv("list", {_stash = true, macro = function (...)
  local body = unstash({...})
  local l = {}
  local forms = {}
  local id = unique()
  local _u26 = body
  local k = nil
  for k in next, _u26 do
    local v = _u26[k]
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
  local _u40 = unstash({...})
  local body = cut(_u40, 0)
  return({"if", cond, join({"do"}, body)})
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local _u48 = unstash({...})
  local body = cut(_u48, 0)
  return({"if", {"not", cond}, join({"do"}, body)})
end})
setenv("table", {_stash = true, macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (x)
    return(x)
  end, body)))
end})
setenv("let", {_stash = true, macro = function (bindings, ...)
  local _u70 = unstash({...})
  local body = cut(_u70, 0)
  if length(bindings) < 2 then
    return(join({"do"}, body))
  else
    local renames = {}
    local locals = {}
    local lh = bindings[1]
    local rh = bindings[2]
    local _u73 = bind(lh, rh)
    local k = nil
    for k in next, _u73 do
      local _u75 = _u73[k]
      local id = _u75[1]
      local val = _u75[2]
      if number63(k) then
        if bound63(id) or reserved63(id) or toplevel63() then
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
  local _u85 = unstash({...})
  local body = cut(_u85, 0)
  local _u87 = {"setenv", {"quote", name}}
  _u87.macro = join({"fn", args}, body)
  local form = _u87
  eval(form)
  return(form)
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local _u94 = unstash({...})
  local body = cut(_u94, 0)
  local _u96 = {"setenv", {"quote", name}}
  _u96.special = join({"fn", args}, body)
  local form = join(_u96, keys(body))
  eval(form)
  return(form)
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local _u104 = {"setenv", {"quote", name}}
  _u104.symbol = {"quote", expansion}
  return(_u104)
end})
setenv("define-reader", {_stash = true, macro = function (_u114, ...)
  local char = _u114[1]
  local s = _u114[2]
  local _u113 = unstash({...})
  local body = cut(_u113, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {s}}, body)})
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local _u125 = unstash({...})
  local body = cut(_u125, 0)
  setenv(name, {_stash = true, toplevel = true, variable = true})
  if some63(body) then
    local _u127 = bind42(x, body)
    local args = _u127[1]
    local _u128 = _u127[2]
    return(join({"%global-function", name, args}, _u128))
  else
    return({"set", name, x})
  end
end})
setenv("define-local", {_stash = true, macro = function (name, x, ...)
  local _u136 = unstash({...})
  local body = cut(_u136, 0)
  setenv(name, {_stash = true, variable = true})
  if some63(body) then
    local _u138 = bind42(x, body)
    local args = _u138[1]
    local _u139 = _u138[2]
    return(join({"%local-function", name, args}, _u139))
  else
    return({"%local", name, x})
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local _u150 = unstash({...})
  local body = cut(_u150, 0)
  local scope = _u150.scope
  local x = unique()
  local _u154 = {"table"}
  _u154._scope = scope
  return({"do", {"add", "environment", _u154}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end})
setenv("with-bindings", {_stash = true, macro = function (_u166, ...)
  local names = _u166[1]
  local _u165 = unstash({...})
  local body = cut(_u165, 0)
  local x = unique()
  local _u171 = {"setenv", x}
  _u171.variable = true
  local _u168 = {"with-frame", {"all", {"_u1", x}, names, _u171}}
  _u168.scope = true
  return(join(_u168, body))
end})
setenv("let-fn", {_stash = true, macro = function (_u178, ...)
  local name = _u178[1]
  local args = _u178[2]
  local fn_body = cut(_u178, 2)
  local _u177 = unstash({...})
  local body = cut(_u177, 0)
  return(join({"let", {name, join({"fn", args}, fn_body)}}, body))
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local _u188 = unstash({...})
  local body = cut(_u188, 0)
  add(environment, {})
  map(function (m)
    return(macroexpand(join({"define-macro"}, m)))
  end, definitions)
  local _u190 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_u190)
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local _u200 = unstash({...})
  local body = cut(_u200, 0)
  add(environment, {})
  map(function (_u204)
    local name = _u204[1]
    local exp = _u204[2]
    return(macroexpand({"define-symbol", name, exp}))
  end, pair(expansions))
  local _u202 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_u202)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local _u212 = unstash({...})
  local body = cut(_u212, 0)
  local _u214 = bind42(args, body)
  local _u215 = _u214[1]
  local _u216 = _u214[2]
  return(join({"%function", _u215}, _u216))
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
setenv("all", {_stash = true, macro = function (_u254, t, ...)
  local k = _u254[1]
  local v = _u254[2]
  local _u253 = unstash({...})
  local body = cut(_u253, 0)
  local x = unique()
  local n = unique()
  local _u332
  if target == "lua" then
    _u332 = body
  else
    _u332 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
  end
  return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u332)}})
end})
setenv("set-of", {_stash = true, macro = function (...)
  local xs = unstash({...})
  local l = {}
  local _u274 = xs
  local _u2 = nil
  for _u2 in next, _u274 do
    local x = _u274[_u2]
    l[x] = true
  end
  return(join({"table"}, l))
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
  local _u290 = unstash({...})
  local bs = cut(_u290, 0)
  return({"set", a, join({"join*", a}, bs)})
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local _u297 = unstash({...})
  local bs = cut(_u297, 0)
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
function rep(s)
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
function repl()
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
function usage()
  print("usage: lumen [options] <object files>")
  print("options:")
  print("  -c <input>\tInput file")
  print("  -o <output>\tOutput file")
  print("  -t <target>\tTarget language (default: lua)")
  print("  -e <expr>\tExpression to evaluate")
  return(exit())
end
function main()
  local as = argv()
  if hd(as) == "-h" or hd(as) == "--help" then
    usage()
  end
  local pre = {}
  local input = nil
  local output = nil
  local target1 = nil
  local expr = nil
  local n = length(as)
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
  series(run_file, pre)
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
