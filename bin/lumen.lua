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
function two63(x)
  return(_35(x) == 2)
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
nan = 0 / 0
inf = 1 / 0
_inf = -(1 / 0)
function nan63(n)
  return(not (n == n))
end
function inf63(n)
  return(n == inf or n == _inf)
end
local str = string
function clip(s, from, upto)
  return(str.sub(s, from + 1, upto))
end
function cut(x, from, upto)
  local l = {}
  local j = 0
  local _e
  if nil63(from) or from < 0 then
    _e = 0
  else
    _e = from
  end
  local i = _e
  local n = _35(x)
  local _e1
  if nil63(upto) or upto > n then
    _e1 = n
  else
    _e1 = upto
  end
  local _upto = _e1
  while i < _upto do
    l[j + 1] = x[i + 1]
    i = i + 1
    j = j + 1
  end
  local _o = x
  local k = nil
  for k in next, _o do
    local v = _o[k]
    if not number63(k) then
      l[k] = v
    end
  end
  return(l)
end
function keys(x)
  local t = {}
  local _o1 = x
  local k = nil
  for k in next, _o1 do
    local v = _o1[k]
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
  local _e2
  if n then
    _e2 = n + 1
  end
  return(str.byte(s, _e2))
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
function almost(l)
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
function join(...)
  local ls = unstash({...})
  if two63(ls) then
    local a = ls[1]
    local b = ls[2]
    if a and b then
      local c = {}
      local o = _35(a)
      local _o2 = a
      local k = nil
      for k in next, _o2 do
        local v = _o2[k]
        c[k] = v
      end
      local _o3 = b
      local k = nil
      for k in next, _o3 do
        local v = _o3[k]
        if number63(k) then
          k = k + o
        end
        c[k] = v
      end
      return(c)
    else
      return(a or b or {})
    end
  else
    return(reduce(join, ls))
  end
end
function find(f, t)
  local _o4 = t
  local _i4 = nil
  for _i4 in next, _o4 do
    local x = _o4[_i4]
    local _x2 = f(x)
    if _x2 then
      return(_x2)
    end
  end
end
function first(f, l)
  local n = _35(l)
  local i = 0
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
function map(f, x)
  local t = {}
  local n = _35(x)
  local i = 0
  while i < n do
    local y = f(x[i + 1])
    if is63(y) then
      add(t, y)
    end
    i = i + 1
  end
  local _o5 = x
  local k = nil
  for k in next, _o5 do
    local v = _o5[k]
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
  local _o6 = t
  local k = nil
  for k in next, _o6 do
    local v = _o6[k]
    if not number63(k) then
      return(true)
    end
  end
  return(false)
end
function empty63(t)
  local _o7 = t
  local _i7 = nil
  for _i7 in next, _o7 do
    local x = _o7[_i7]
    return(false)
  end
  return(true)
end
function stash(args)
  if keys63(args) then
    local p = {}
    local _o8 = args
    local k = nil
    for k in next, _o8 do
      local v = _o8[k]
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
      local args1 = almost(args)
      local _o9 = l
      local k = nil
      for k in next, _o9 do
        local v = _o9[k]
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
  local _e3
  if start then
    _e3 = start + 1
  end
  local _start = _e3
  local i = str.find(s, pattern, _start, true)
  return(i and i - 1)
end
function split(s, sep)
  if s == "" or sep == "" then
    return({})
  else
    local l = {}
    local n = _35(sep)
    while true do
      local i = search(s, sep)
      if nil63(i) then
        break
      else
        add(l, clip(s, 0, i))
        s = clip(s, i + n)
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
  local n = _35(s)
  local i = 0
  while i < n do
    if not number_code63(code(s, i)) then
      return(false)
    end
    i = i + 1
  end
  return(true)
end
function escape(s)
  local s1 = "\""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _e4
    if c == "\n" then
      _e4 = "\\n"
    else
      local _e5
      if c == "\"" then
        _e5 = "\\\""
      else
        local _e6
        if c == "\\" then
          _e6 = "\\\\"
        else
          _e6 = c
        end
        _e5 = _e6
      end
      _e4 = _e5
    end
    local c1 = _e4
    s1 = s1 .. c1
    i = i + 1
  end
  return(s1 .. "\"")
end
function string(x, depth)
  if depth and depth > 7 then
    return("circular")
  else
    if nil63(x) then
      return("nil")
    else
      if nan63(x) then
        return("nan")
      else
        if x == inf then
          return("inf")
        else
          if x == _inf then
            return("-inf")
          else
            if boolean63(x) then
              if x then
                return("true")
              else
                return("false")
              end
            else
              if function63(x) then
                return("function")
              else
                if string63(x) then
                  return(escape(x))
                else
                  if atom63(x) then
                    return(tostring(x))
                  else
                    local s = "("
                    local sp = ""
                    local xs = {}
                    local ks = {}
                    local d = (depth or 0) + 1
                    local _o10 = x
                    local k = nil
                    for k in next, _o10 do
                      local v = _o10[k]
                      if number63(k) then
                        xs[k] = string(v, d)
                      else
                        add(ks, k .. ":")
                        add(ks, string(v, d))
                      end
                    end
                    local _o11 = join(xs, ks)
                    local _i11 = nil
                    for _i11 in next, _o11 do
                      local v = _o11[_i11]
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
end
local values = unpack or table.unpack
function apply(f, args)
  local _args = stash(args)
  return(f(values(_args)))
end
function call(f)
  return(f())
end
function _37message_handler(msg)
  local i = search(msg, ": ")
  return(clip(msg, i + 2))
end
function toplevel63()
  return(one63(environment))
end
function setenv(k, ...)
  local _r67 = unstash({...})
  local keys = cut(_r67, 0)
  if string63(k) then
    local _e7
    if keys.toplevel then
      _e7 = hd(environment)
    else
      _e7 = last(environment)
    end
    local frame = _e7
    local entry = frame[k] or {}
    local _o12 = keys
    local _k = nil
    for _k in next, _o12 do
      local v = _o12[_k]
      entry[_k] = v
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
argv = arg
local math = math
abs = math.abs
acos = math.acos
asin = math.asin
atan = math.atan
atan2 = math.atan2
ceil = math.ceil
cos = math.cos
floor = math.floor
log = math.log
log10 = math.log10
max = math.max
min = math.min
pow = math.pow
random = math.random
sin = math.sin
sinh = math.sinh
sqrt = math.sqrt
tan = math.tan
tanh = math.tanh
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
  local x = unique("x")
  local l = {}
  local forms = {}
  local _o1 = body
  local k = nil
  for k in next, _o1 do
    local v = _o1[k]
    if number63(k) then
      l[k] = v
    else
      add(forms, {"set", {"get", x, {"quote", k}}, v})
    end
  end
  if some63(forms) then
    return(join({"let", x, join({"%array"}, l)}, forms, {x}))
  else
    return(join({"%array"}, l))
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local branches = unstash({...})
  return(hd(expand_if(branches)))
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local _r9 = unstash({...})
  local body = cut(_r9, 0)
  return({"if", cond, join({"do"}, body)})
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local _r11 = unstash({...})
  local body = cut(_r11, 0)
  return({"if", {"not", cond}, join({"do"}, body)})
end})
setenv("obj", {_stash = true, macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (x)
    return(x)
  end, body)))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local _r15 = unstash({...})
  local body = cut(_r15, 0)
  if atom63(bs) then
    return(join({"let", {bs, hd(body)}}, tl(body)))
  else
    if none63(bs) then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bs[1]
      local rh = bs[2]
      local _o3 = bind(lh, rh)
      local k = nil
      for k in next, _o3 do
        local _id1 = _o3[k]
        local id = _id1[1]
        local val = _id1[2]
        if number63(k) then
          if bound63(id) or reserved63(id) or toplevel63() then
            local id1 = unique(id)
            add(renames, id)
            add(renames, id1)
            id = id1
          else
            setenv(id, {_stash = true, variable = true})
          end
          add(locals, {"%local", id, val})
        end
      end
      return(join({"do"}, locals, {{"let-symbol", renames, join({"let", cut(bs, 2)}, body)}}))
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local _r17 = unstash({...})
  local body = cut(_r17, 0)
  return(join({"let", {x, v}}, body, {x}))
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local _r19 = unstash({...})
  local body = cut(_r19, 0)
  local _x67 = {"setenv", {"quote", name}}
  _x67.macro = join({"fn", args}, body)
  local form = _x67
  eval(form)
  return(form)
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local _r21 = unstash({...})
  local body = cut(_r21, 0)
  local _x74 = {"setenv", {"quote", name}}
  _x74.special = join({"fn", args}, body)
  local form = join(_x74, keys(body))
  eval(form)
  return(form)
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local _x80 = {"setenv", {"quote", name}}
  _x80.symbol = {"quote", expansion}
  return(_x80)
end})
setenv("define-reader", {_stash = true, macro = function (_x88, ...)
  local char = _x88[1]
  local s = _x88[2]
  local _r25 = unstash({...})
  local body = cut(_r25, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {s}}, body)})
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local _r27 = unstash({...})
  local body = cut(_r27, 0)
  setenv(name, {_stash = true, variable = true})
  if some63(body) then
    return(join({"%local-function", name}, bind42(x, body)))
  else
    return({"%local", name, x})
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local _r29 = unstash({...})
  local body = cut(_r29, 0)
  setenv(name, {_stash = true, toplevel = true, variable = true})
  if some63(body) then
    return(join({"%global-function", name}, bind42(x, body)))
  else
    return({"set", name, x})
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local _r31 = unstash({...})
  local body = cut(_r31, 0)
  local scope = _r31.scope
  local x = unique("x")
  local _x113 = {"obj"}
  _x113._scope = scope
  return({"do", {"add", "environment", _x113}, {"let", x, join({"do"}, body), {"drop", "environment"}, x}})
end})
setenv("with-bindings", {_stash = true, macro = function (_x121, ...)
  local names = _x121[1]
  local _r33 = unstash({...})
  local body = cut(_r33, 0)
  local x = unique("x")
  local _x125 = {"setenv", x}
  _x125.variable = true
  local _x123 = {"with-frame", {"each", x, names, _x125}}
  _x123.scope = true
  return(join(_x123, body))
end})
setenv("let-fn", {_stash = true, macro = function (_x129, ...)
  local name = _x129[1]
  local args = _x129[2]
  local fn_body = cut(_x129, 2)
  local _r35 = unstash({...})
  local body = cut(_r35, 0)
  return(join({"let", name, join({"fn", args}, fn_body)}, body))
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local _r38 = unstash({...})
  local body = cut(_r38, 0)
  add(environment, {})
  map(function (m)
    return(macroexpand(join({"define-macro"}, m)))
  end, definitions)
  local _x137 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_x137)
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local _r42 = unstash({...})
  local body = cut(_r42, 0)
  add(environment, {})
  map(function (_x146)
    local name = _x146[1]
    local exp = _x146[2]
    return(macroexpand({"define-symbol", name, exp}))
  end, pair(expansions))
  local _x145 = join({"do"}, macroexpand(body))
  drop(environment)
  return(_x145)
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local _r46 = unstash({...})
  local body = cut(_r46, 0)
  local bs = map(function (n)
    return({n, {"unique", {"quote", n}}})
  end, names)
  return(join({"let", apply(join, bs)}, body))
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local _r49 = unstash({...})
  local body = cut(_r49, 0)
  return(join({"%function"}, bind42(args, body)))
end})
setenv("guard", {_stash = true, macro = function (expr)
  if target == "js" then
    return({{"fn", join(), {"%try", {"list", true, expr}}}})
  else
    local e = unique("e")
    local x = unique("x")
    local ex = "|" .. e .. "," .. x .. "|"
    return({"let", ex, {"xpcall", {"fn", join(), expr}, "%message-handler"}, {"list", e, x}})
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local _r53 = unstash({...})
  local body = cut(_r53, 0)
  local o = unique("o")
  local n = unique("n")
  local i = unique("i")
  local _e7
  if obj63(x) then
    local _e8
    if _35(x) > 1 then
      _e8 = x
    else
      _e8 = {i, hd(x)}
    end
    _e7 = _e8
  else
    _e7 = {i, x}
  end
  local _id3 = _e7
  local k = _id3[1]
  local v = _id3[2]
  local _e9
  if target == "lua" then
    _e9 = body
  else
    _e9 = {join({"let", k, {"if", {"numeric?", k}, {"parseInt", k}, k}}, body)}
  end
  return({"let", {o, t, k, "nil"}, {"%for", o, k, join({"let", {v, {"get", o, k}}}, _e9)}})
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local _r55 = unstash({...})
  local body = cut(_r55, 0)
  return({"let", i, 0, join({"while", {"<", i, to}}, body, {{"inc", i}})})
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local _r57 = unstash({...})
  local body = cut(_r57, 0)
  local x = unique("x")
  local n = unique("n")
  local i = unique("i")
  return({"let", {x, t, n, {"#", x}}, {"for", i, n, join({"let", {v, {"at", x, i}}}, body)}})
end})
setenv("set-of", {_stash = true, macro = function (...)
  local xs = unstash({...})
  local l = {}
  local _o5 = xs
  local _i5 = nil
  for _i5 in next, _o5 do
    local x = _o5[_i5]
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
setenv("join!", {_stash = true, macro = function (a, ...)
  local _r61 = unstash({...})
  local bs = cut(_r61, 0)
  return({"set", a, join({"join", a}, bs)})
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local _r63 = unstash({...})
  local bs = cut(_r63, 0)
  return({"set", a, join({"cat", a}, bs)})
end})
setenv("inc", {_stash = true, macro = function (n, by)
  return({"set", n, {"+", n, by or 1}})
end})
setenv("dec", {_stash = true, macro = function (n, by)
  return({"set", n, {"-", n, by or 1}})
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local x = unique("x")
  return({"do", {"inc", "indent-level"}, {"let", x, form, {"dec", "indent-level"}, x}})
end})
setenv("export", {_stash = true, macro = function (...)
  local names = unstash({...})
  if target == "js" then
    return(join({"do"}, map(function (k)
      return({"set", {"get", "exports", {"quote", k}}, k})
    end, names)))
  else
    local x = {}
    local _o7 = names
    local _i7 = nil
    for _i7 in next, _o7 do
      local k = _o7[_i7]
      x[k] = k
    end
    return({"return", join({"obj"}, x)})
  end
end})
local reader = require("reader")
local compiler = require("compiler")
local function rep(s)
  local form = reader["read-string"](s)
  local _e,_x = xpcall(function ()
    return(compiler.eval(form))
  end, _37message_handler)
  local _id = {_e, _x}
  local ok = _id[1]
  local x = _id[2]
  if not ok then
    return(print("error: " .. x))
  else
    if is63(x) then
      return(print(string(x)))
    end
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
  print("  -c <input>\tCompile input file")
  print("  -o <output>\tOutput file")
  print("  -t <target>\tTarget language (default: lua)")
  print("  -e <expr>\tExpression to evaluate")
  return(exit())
end
local function main()
  if hd(argv) == "-h" or hd(argv) == "--help" then
    usage()
  end
  local pre = {}
  local input = nil
  local output = nil
  local target1 = nil
  local expr = nil
  local n = _35(argv)
  local i = 0
  while i < n do
    local a = argv[i + 1]
    if a == "-c" or a == "-o" or a == "-t" or a == "-e" then
      if i == n - 1 then
        print("missing argument for " .. a)
      else
        i = i + 1
        local val = argv[i + 1]
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
  local _x2 = pre
  local _n = _35(_x2)
  local _i = 0
  while _i < _n do
    local file = _x2[_i + 1]
    compiler["run-file"](file)
    _i = _i + 1
  end
  if input and output then
    if target1 then
      target = target1
    end
    local code = compiler["compile-file"](input)
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
