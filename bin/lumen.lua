environment = {{}}
target = "lua"
function nil63(x)
  return x == nil
end
function is63(x)
  return not nil63(x)
end
function no(x)
  return nil63(x) or x == false
end
function yes(x)
  return not no(x)
end
function either(x, y)
  if is63(x) then
    return x
  else
    return y
  end
end
function has63(l, k)
  return is63(l[k])
end
function _35(x)
  return #x
end
function none63(x)
  return _35(x) == 0
end
function some63(x)
  return _35(x) > 0
end
function one63(x)
  return _35(x) == 1
end
function two63(x)
  return _35(x) == 2
end
function hd(l)
  return l[1]
end
function string63(x)
  return type(x) == "string"
end
function number63(x)
  return type(x) == "number"
end
function boolean63(x)
  return type(x) == "boolean"
end
function function63(x)
  return type(x) == "function"
end
function obj63(x)
  return is63(x) and type(x) == "table"
end
function atom63(x)
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
end
nan = 0 / 0
inf = 1 / 0
_inf = - inf
function nan63(n)
  return not( n == n)
end
function inf63(n)
  return n == inf or n == _inf
end
function clip(s, from, upto)
  return string.sub(s, from + 1, upto)
end
function cut(x, from, upto)
  local __l = {}
  local __j = 0
  local __e
  if nil63(from) or from < 0 then
    __e = 0
  else
    __e = from
  end
  local __i = __e
  local __n = _35(x)
  local __e1
  if nil63(upto) or upto > __n then
    __e1 = __n
  else
    __e1 = upto
  end
  local __upto = __e1
  while __i < __upto do
    __l[__j + 1] = x[__i + 1]
    __i = __i + 1
    __j = __j + 1
  end
  local ____o = x
  local __k = nil
  for __k in next, ____o do
    local __v = ____o[__k]
    if not number63(__k) then
      __l[__k] = __v
    end
  end
  return __l
end
function keys(x)
  local __t = {}
  local ____o1 = x
  local __k1 = nil
  for __k1 in next, ____o1 do
    local __v1 = ____o1[__k1]
    if not number63(__k1) then
      __t[__k1] = __v1
    end
  end
  return __t
end
function edge(x)
  return _35(x) - 1
end
function inner(x)
  return clip(x, 1, edge(x))
end
function tl(l)
  return cut(l, 1)
end
function char(s, n)
  return clip(s, n, n + 1)
end
function code(s, n)
  local __e2
  if n then
    __e2 = n + 1
  end
  return string.byte(s, __e2)
end
function fromCode(n)
  return string.char(n)
end
function lowercase63(n)
  return n > 96 and n < 123
end
function camelCase(str)
  local __s = ""
  local __n3 = _35(str)
  local __i3 = 0
  while __i3 < __n3 do
    local __c = code(str, __i3)
    if __c == 45 and lowercase63(code(str, __i3 - 1) or 0) and lowercase63(code(str, __i3 + 1) or 0) then
      __i3 = __i3 + 1
      __c = code(str, __i3) - 32
    end
    __s = __s .. fromCode(__c)
    __i3 = __i3 + 1
  end
  return __s
end
function stringLiteral63(x)
  return string63(x) and char(x, 0) == "\""
end
function idLiteral63(x)
  return string63(x) and char(x, 0) == "|"
end
function add(l, x)
  return table.insert(l, x)
end
function drop(l)
  return table.remove(l)
end
function last(l)
  return l[edge(l) + 1]
end
function almost(l)
  return cut(l, 0, edge(l))
end
function reverse(l)
  local __l1 = keys(l)
  local __i4 = edge(l)
  while __i4 >= 0 do
    add(__l1, l[__i4 + 1])
    __i4 = __i4 - 1
  end
  return __l1
end
function reduce(f, x)
  if none63(x) then
    return nil
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))
    end
  end
end
function join(...)
  local __ls = unstash({...})
  local __r39 = {}
  local ____x2 = __ls
  local ____i5 = 0
  while ____i5 < _35(____x2) do
    local __l11 = ____x2[____i5 + 1]
    if __l11 then
      local __n4 = _35(__r39)
      local ____o2 = __l11
      local __k2 = nil
      for __k2 in next, ____o2 do
        local __v2 = ____o2[__k2]
        if number63(__k2) then
          __k2 = __k2 + __n4
        end
        __r39[__k2] = __v2
      end
    end
    ____i5 = ____i5 + 1
  end
  return __r39
end
function find(f, t)
  local ____o3 = t
  local ____i7 = nil
  for ____i7 in next, ____o3 do
    local __x3 = ____o3[____i7]
    local __y = f(__x3)
    if __y then
      return __y
    end
  end
end
function first(f, l)
  local ____x4 = l
  local ____i8 = 0
  while ____i8 < _35(____x4) do
    local __x5 = ____x4[____i8 + 1]
    local __y1 = f(__x5)
    if __y1 then
      return __y1
    end
    ____i8 = ____i8 + 1
  end
end
function in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function pair(l)
  local __l12 = {}
  local __i9 = 0
  while __i9 < _35(l) do
    add(__l12, {l[__i9 + 1], l[__i9 + 1 + 1]})
    __i9 = __i9 + 1
    __i9 = __i9 + 1
  end
  return __l12
end
function sort(l, f)
  table.sort(l, f)
  return l
end
function map(f, x)
  local __t1 = {}
  local ____x7 = x
  local ____i10 = 0
  while ____i10 < _35(____x7) do
    local __v3 = ____x7[____i10 + 1]
    local __y2 = f(__v3)
    if is63(__y2) then
      add(__t1, __y2)
    end
    ____i10 = ____i10 + 1
  end
  local ____o4 = x
  local __k3 = nil
  for __k3 in next, ____o4 do
    local __v4 = ____o4[__k3]
    if not number63(__k3) then
      local __y3 = f(__v4)
      if is63(__y3) then
        __t1[__k3] = __y3
      end
    end
  end
  return __t1
end
function keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function keys63(t)
  local ____o5 = t
  local __k4 = nil
  for __k4 in next, ____o5 do
    local __v5 = ____o5[__k4]
    if not number63(__k4) then
      return true
    end
  end
  return false
end
function empty63(t)
  local ____o6 = t
  local ____i13 = nil
  for ____i13 in next, ____o6 do
    local __x8 = ____o6[____i13]
    return false
  end
  return true
end
function stash(args)
  if keys63(args) then
    local __p = {}
    local ____o7 = args
    local __k5 = nil
    for __k5 in next, ____o7 do
      local __v6 = ____o7[__k5]
      if not number63(__k5) then
        __p[__k5] = __v6
      end
    end
    __p._stash = true
    add(args, __p)
  end
  return args
end
function unstash(args)
  if none63(args) then
    return {}
  else
    local __l2 = last(args)
    if obj63(__l2) and __l2._stash then
      local __args1 = almost(args)
      local ____o8 = __l2
      local __k6 = nil
      for __k6 in next, ____o8 do
        local __v7 = ____o8[__k6]
        if not( __k6 == "_stash") then
          __args1[__k6] = __v7
        end
      end
      return __args1
    else
      return args
    end
  end
end
function destash33(l, args1)
  if obj63(l) and l._stash then
    local ____o9 = l
    local __k7 = nil
    for __k7 in next, ____o9 do
      local __v8 = ____o9[__k7]
      if not( __k7 == "_stash") then
        args1[__k7] = __v8
      end
    end
  else
    return l
  end
end
function search(s, pattern, start)
  local __e3
  if start then
    __e3 = start + 1
  end
  local __start = __e3
  local __i17 = string.find(s, pattern, __start, true)
  return __i17 and __i17 - 1
end
function split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l3 = {}
    local __n13 = _35(sep)
    while true do
      local __i18 = search(s, sep)
      if nil63(__i18) then
        break
      else
        add(__l3, clip(s, 0, __i18))
        s = clip(s, __i18 + __n13)
      end
    end
    add(__l3, s)
    return __l3
  end
end
function cat(...)
  local __xs = unstash({...})
  return either(reduce(function (a, b)
    return a .. b
  end, __xs), "")
end
function _43(...)
  local __xs1 = unstash({...})
  return either(reduce(function (a, b)
    return a + b
  end, __xs1), 0)
end
function _45(...)
  local __xs2 = unstash({...})
  return either(reduce(function (b, a)
    return a - b
  end, reverse(__xs2)), 0)
end
function _42(...)
  local __xs3 = unstash({...})
  return either(reduce(function (a, b)
    return a * b
  end, __xs3), 1)
end
function _47(...)
  local __xs4 = unstash({...})
  return either(reduce(function (b, a)
    return a / b
  end, reverse(__xs4)), 1)
end
function _37(...)
  local __xs5 = unstash({...})
  return either(reduce(function (b, a)
    return a % b
  end, reverse(__xs5)), 0)
end
local function pairwise(f, xs)
  local __i19 = 0
  while __i19 < edge(xs) do
    local __a = xs[__i19 + 1]
    local __b = xs[__i19 + 1 + 1]
    if not f(__a, __b) then
      return false
    end
    __i19 = __i19 + 1
  end
  return true
end
function _60(...)
  local __xs6 = unstash({...})
  return pairwise(function (a, b)
    return a < b
  end, __xs6)
end
function _62(...)
  local __xs7 = unstash({...})
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
function _61(...)
  local __xs8 = unstash({...})
  return pairwise(function (a, b)
    return a == b
  end, __xs8)
end
function _6061(...)
  local __xs9 = unstash({...})
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
function _6261(...)
  local __xs10 = unstash({...})
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
function number(s)
  return tonumber(s)
end
function numberCode63(n)
  return n > 47 and n < 58
end
function numeric63(s)
  local __n14 = _35(s)
  local __i20 = 0
  while __i20 < __n14 do
    if not numberCode63(code(s, __i20)) then
      return false
    end
    __i20 = __i20 + 1
  end
  return some63(s)
end
function escape(s)
  local __s1 = "\""
  local __i21 = 0
  while __i21 < _35(s) do
    local __c1 = char(s, __i21)
    local __e4
    if __c1 == "\n" then
      __e4 = "\\n"
    else
      local __e5
      if __c1 == "\r" then
        __e5 = "\\r"
      else
        local __e6
        if __c1 == "\"" then
          __e6 = "\\\""
        else
          local __e7
          if __c1 == "\\" then
            __e7 = "\\\\"
          else
            __e7 = __c1
          end
          __e6 = __e7
        end
        __e5 = __e6
      end
      __e4 = __e5
    end
    local __c11 = __e4
    __s1 = __s1 .. __c11
    __i21 = __i21 + 1
  end
  return __s1 .. "\""
end
function str(x, stack)
  if nil63(x) then
    return "nil"
  else
    if nan63(x) then
      return "nan"
    else
      if x == inf then
        return "inf"
      else
        if x == _inf then
          return "-inf"
        else
          if boolean63(x) then
            if x then
              return "true"
            else
              return "false"
            end
          else
            if string63(x) then
              return escape(x)
            else
              if atom63(x) then
                return tostring(x)
              else
                if function63(x) then
                  return "function"
                else
                  if stack and in63(x, stack) then
                    return "circular"
                  else
                    if not( type(x) == "table") then
                      return escape(tostring(x))
                    else
                      local __s11 = "("
                      local __sp = ""
                      local __xs11 = {}
                      local __ks = {}
                      local __l4 = stack or {}
                      add(__l4, x)
                      local ____o10 = x
                      local __k8 = nil
                      for __k8 in next, ____o10 do
                        local __v9 = ____o10[__k8]
                        if number63(__k8) then
                          __xs11[__k8] = str(__v9, __l4)
                        else
                          if not string63(__k8) then
                            __k8 = str(__k8, __l4)
                          end
                          add(__ks, __k8 .. ":")
                          add(__ks, str(__v9, __l4))
                        end
                      end
                      drop(__l4)
                      local ____o11 = join(__xs11, __ks)
                      local ____i23 = nil
                      for ____i23 in next, ____o11 do
                        local __v10 = ____o11[____i23]
                        __s11 = __s11 .. __sp .. __v10
                        __sp = " "
                      end
                      return __s11 .. ")"
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
local values = unpack or table.unpack
function apply(f, args)
  local __args = stash(args)
  return f(values(__args))
end
function call(f, ...)
  local ____r74 = unstash({...})
  local __f = destash33(f, ____r74)
  local ____id = ____r74
  local __args11 = cut(____id, 0)
  return apply(__f, __args11)
end
function setenv(k, ...)
  local ____r75 = unstash({...})
  local __k9 = destash33(k, ____r75)
  local ____id1 = ____r75
  local __keys = cut(____id1, 0)
  if string63(__k9) then
    local __e8
    if __keys.toplevel then
      __e8 = hd(environment)
    else
      __e8 = last(environment)
    end
    local __frame = __e8
    local __entry = __frame[__k9] or {}
    local ____o12 = __keys
    local __k10 = nil
    for __k10 in next, ____o12 do
      local __v11 = ____o12[__k10]
      __entry[__k10] = __v11
    end
    __frame[__k9] = __entry
    return __frame[__k9]
  end
end
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
trunc = math.floor
setenv("quote", {_stash = true, macro = function (form)
  return quoted(form)
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return quasiexpand(form, 1)
end})
setenv("set", {_stash = true, macro = function (...)
  local __args = unstash({...})
  return join({"do"}, map(function (__x2)
    local ____id = __x2
    local __lh = ____id[1]
    local __rh = ____id[2]
    return {"%set", __lh, __rh}
  end, pair(__args)))
end})
setenv("at", {_stash = true, macro = function (l, i)
  if target == "lua" and number63(i) then
    i = i + 1
  else
    if target == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"get", l, i}
end})
setenv("wipe", {_stash = true, macro = function (place)
  if target == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end})
setenv("list", {_stash = true, macro = function (...)
  local __body = unstash({...})
  local __x9 = unique("x")
  local __l = {}
  local __forms = {}
  local ____o = __body
  local __k = nil
  for __k in next, ____o do
    local __v = ____o[__k]
    if number63(__k) then
      __l[__k] = __v
    else
      add(__forms, {"set", {"get", __x9, {"quote", __k}}, __v})
    end
  end
  if some63(__forms) then
    return join({"let", __x9, join({"%array"}, __l)}, __forms, {__x9})
  else
    return join({"%array"}, __l)
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local __branches = unstash({...})
  return hd(expandIf(__branches))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local ____r5 = unstash({...})
  local __expr = destash33(expr, ____r5)
  local ____id1 = ____r5
  local __clauses = cut(____id1, 0)
  local __x19 = unique("x")
  local __eq = function (_)
    return {"=", {"quote", _}, __x19}
  end
  local __cl = function (__x22)
    local ____id2 = __x22
    local __a = ____id2[1]
    local __b = ____id2[2]
    if nil63(__b) then
      return {__a}
    else
      if string63(__a) or number63(__a) then
        return {__eq(__a), __b}
      else
        if one63(__a) then
          return {__eq(hd(__a)), __b}
        else
          if _35(__a) > 1 then
            return {join({"or"}, map(__eq, __a)), __b}
          end
        end
      end
    end
  end
  return {"let", __x19, __expr, join({"if"}, apply(join, map(__cl, pair(__clauses))))}
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local ____r8 = unstash({...})
  local __cond = destash33(cond, ____r8)
  local ____id3 = ____r8
  local __body1 = cut(____id3, 0)
  return {"if", __cond, join({"do"}, __body1)}
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local ____r9 = unstash({...})
  local __cond1 = destash33(cond, ____r9)
  local ____id4 = ____r9
  local __body2 = cut(____id4, 0)
  return {"if", {"not", __cond1}, join({"do"}, __body2)}
end})
setenv("obj", {_stash = true, macro = function (...)
  local __body3 = unstash({...})
  return join({"%object"}, mapo(function (x)
    return x
  end, __body3))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local ____r11 = unstash({...})
  local __bs = destash33(bs, ____r11)
  local ____id5 = ____r11
  local __body4 = cut(____id5, 0)
  if atom63(__bs) then
    return join({"let", {__bs, hd(__body4)}}, tl(__body4))
  else
    if none63(__bs) then
      return join({"do"}, __body4)
    else
      local ____id6 = __bs
      local __lh1 = ____id6[1]
      local __rh1 = ____id6[2]
      local __bs2 = cut(____id6, 2)
      local ____id7 = bind(__lh1, __rh1)
      local __id8 = ____id7[1]
      local __val = ____id7[2]
      local __bs1 = cut(____id7, 2)
      local __renames = {}
      if not idLiteral63(__id8) then
        local __id11 = unique(__id8)
        __renames = {__id8, __id11}
        __id8 = __id11
      end
      return {"do", {"%local", __id8, __val}, {"let-symbol", __renames, join({"let", join(__bs1, __bs2)}, __body4)}}
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local ____r12 = unstash({...})
  local __x49 = destash33(x, ____r12)
  local __v1 = destash33(v, ____r12)
  local ____id9 = ____r12
  local __body5 = cut(____id9, 0)
  return join({"let", {__x49, __v1}}, __body5, {__x49})
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local ____r13 = unstash({...})
  local __x54 = destash33(x, ____r13)
  local __v2 = destash33(v, ____r13)
  local ____id10 = ____r13
  local __body6 = cut(____id10, 0)
  local __y = unique("y")
  return {"let", __y, __v2, {"when", {"yes", __y}, join({"let", {__x54, __y}}, __body6)}}
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local ____r14 = unstash({...})
  local __name = destash33(name, ____r14)
  local __args1 = destash33(args, ____r14)
  local ____id111 = ____r14
  local __body7 = cut(____id111, 0)
  local ____x61 = {"setenv", {"quote", __name}}
  ____x61.macro = join({"fn", __args1}, __body7)
  local __form = ____x61
  return __form
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local ____r15 = unstash({...})
  local __name1 = destash33(name, ____r15)
  local __args2 = destash33(args, ____r15)
  local ____id12 = ____r15
  local __body8 = cut(____id12, 0)
  local ____x65 = {"setenv", {"quote", __name1}}
  ____x65.special = join({"fn", __args2}, __body8)
  local __form1 = join(____x65, keys(__body8))
  return __form1
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local ____x68 = {"setenv", {"quote", name}}
  ____x68.symbol = {"quote", expansion}
  return ____x68
end})
setenv("define-reader", {_stash = true, macro = function (__x71, ...)
  local ____id13 = __x71
  local __char = ____id13[1]
  local __s = ____id13[2]
  local ____r17 = unstash({...})
  local ____x71 = destash33(__x71, ____r17)
  local ____id14 = ____r17
  local __body9 = cut(____id14, 0)
  return {"set", {"get", "read-table", __char}, join({"fn", {__s}}, __body9)}
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local ____r18 = unstash({...})
  local __name2 = destash33(name, ____r18)
  local __x78 = destash33(x, ____r18)
  local ____id15 = ____r18
  local __body10 = cut(____id15, 0)
  setenv(__name2, {_stash = true, variable = true})
  if some63(__body10) then
    return join({"%local-function", __name2}, bind42(__x78, __body10))
  else
    return {"%local", __name2, __x78}
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local ____r19 = unstash({...})
  local __name3 = destash33(name, ____r19)
  local __x82 = destash33(x, ____r19)
  local ____id16 = ____r19
  local __body11 = cut(____id16, 0)
  setenv(__name3, {_stash = true, toplevel = true, variable = true})
  if some63(__body11) then
    return join({"%global-function", __name3}, bind42(__x82, __body11))
  else
    return {"set", __name3, __x82}
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local __body12 = unstash({...})
  local __x86 = unique("x")
  return {"do", {"add", "environment", {"obj"}}, {"with", __x86, join({"do"}, __body12), {"drop", "environment"}}}
end})
setenv("with-bindings", {_stash = true, macro = function (__x93, ...)
  local ____id17 = __x93
  local __names = ____id17[1]
  local ____r20 = unstash({...})
  local ____x93 = destash33(__x93, ____r20)
  local ____id18 = ____r20
  local __body13 = cut(____id18, 0)
  local __x95 = unique("x")
  local ____x98 = {"setenv", __x95}
  ____x98.variable = true
  return join({"with-frame", {"each", __x95, __names, ____x98}}, __body13)
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local ____r21 = unstash({...})
  local __definitions = destash33(definitions, ____r21)
  local ____id19 = ____r21
  local __body14 = cut(____id19, 0)
  add(environment, {})
  map(function (m)
    return _eval(join({"define-macro"}, m))
  end, __definitions)
  local ____x100 = join({"do"}, macroexpand(__body14))
  drop(environment)
  return ____x100
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local ____r23 = unstash({...})
  local __expansions = destash33(expansions, ____r23)
  local ____id20 = ____r23
  local __body15 = cut(____id20, 0)
  add(environment, {})
  map(function (__x105)
    local ____id21 = __x105
    local __name4 = ____id21[1]
    local __exp = ____id21[2]
    return macroexpand({"define-symbol", __name4, __exp})
  end, pair(__expansions))
  local ____x104 = join({"do"}, macroexpand(__body15))
  drop(environment)
  return ____x104
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local ____r25 = unstash({...})
  local __names1 = destash33(names, ____r25)
  local ____id22 = ____r25
  local __body16 = cut(____id22, 0)
  local __bs11 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names1)
  return join({"let", apply(join, __bs11)}, __body16)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local ____r27 = unstash({...})
  local __args3 = destash33(args, ____r27)
  local ____id23 = ____r27
  local __body17 = cut(____id23, 0)
  return join({"%function"}, bind42(__args3, __body17))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local ____r28 = unstash({...})
  local __f = destash33(f, ____r28)
  local ____id24 = ____r28
  local __args4 = cut(____id24, 0)
  if _35(__args4) > 1 then
    return {"%call", "apply", __f, {"join", join({"list"}, almost(__args4)), last(__args4)}}
  else
    return join({"%call", "apply", __f}, __args4)
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if target == "js" then
    return {{"fn", join(), {"%try", {"list", true, expr}}}}
  else
    local ____x131 = {"obj"}
    ____x131.stack = {"debug", {".traceback"}}
    ____x131.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
    return {"list", {"xpcall", {"fn", join(), expr}, {"fn", {"m"}, {"if", {"obj?", "m"}, "m", ____x131}}}}
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local ____r30 = unstash({...})
  local __x142 = destash33(x, ____r30)
  local __t = destash33(t, ____r30)
  local ____id25 = ____r30
  local __body18 = cut(____id25, 0)
  local __o1 = unique("o")
  local __n1 = unique("n")
  local __i1 = unique("i")
  local __e
  if atom63(__x142) then
    __e = {__i1, __x142}
  else
    local __e1
    if _35(__x142) > 1 then
      __e1 = __x142
    else
      __e1 = {__i1, hd(__x142)}
    end
    __e = __e1
  end
  local ____id26 = __e
  local __k1 = ____id26[1]
  local __v3 = ____id26[2]
  local __e2
  if target == "lua" then
    __e2 = __body18
  else
    __e2 = {join({"let", __k1, {"if", {"numeric?", __k1}, {"parseInt", __k1}, __k1}}, __body18)}
  end
  return {"let", {__o1, __t, __k1, "nil"}, {"%for", __o1, __k1, join({"let", {__v3, {"get", __o1, __k1}}}, __e2)}}
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local ____r31 = unstash({...})
  local __i2 = destash33(i, ____r31)
  local __to = destash33(to, ____r31)
  local ____id27 = ____r31
  local __body19 = cut(____id27, 0)
  return {"let", __i2, 0, join({"while", {"<", __i2, __to}}, __body19, {{"inc", __i2}})}
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local ____r32 = unstash({...})
  local __v4 = destash33(v, ____r32)
  local __t1 = destash33(t, ____r32)
  local ____id28 = ____r32
  local __body20 = cut(____id28, 0)
  local __x163 = unique("x")
  local __i3 = unique("i")
  return {"let", {__x163, __t1}, {"for", __i3, {"#", __x163}, join({"let", {__v4, {"at", __x163, __i3}}}, __body20)}}
end})
setenv("set-of", {_stash = true, macro = function (...)
  local __xs = unstash({...})
  local __l1 = {}
  local ____o2 = __xs
  local ____i4 = nil
  for ____i4 in next, ____o2 do
    local __x172 = ____o2[____i4]
    __l1[__x172] = true
  end
  return join({"obj"}, __l1)
end})
setenv("language", {_stash = true, macro = function ()
  return {"quote", target}
end})
setenv("target", {_stash = true, macro = function (...)
  local __clauses1 = unstash({...})
  return __clauses1[target]
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local ____r34 = unstash({...})
  local __a1 = destash33(a, ____r34)
  local ____id29 = ____r34
  local __bs21 = cut(____id29, 0)
  return {"set", __a1, join({"join", __a1}, __bs21)}
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local ____r35 = unstash({...})
  local __a2 = destash33(a, ____r35)
  local ____id30 = ____r35
  local __bs3 = cut(____id30, 0)
  return {"set", __a2, join({"cat", __a2}, __bs3)}
end})
setenv("inc", {_stash = true, macro = function (n, by)
  local __e3
  if nil63(by) then
    __e3 = 1
  else
    __e3 = by
  end
  return {"set", n, {"+", n, __e3}}
end})
setenv("dec", {_stash = true, macro = function (n, by)
  local __e4
  if nil63(by) then
    __e4 = 1
  else
    __e4 = by
  end
  return {"set", n, {"-", n, __e4}}
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local __x186 = unique("x")
  return {"do", {"inc", "indent-level"}, {"with", __x186, form, {"dec", "indent-level"}}}
end})
setenv("export", {_stash = true, macro = function (...)
  local __names2 = unstash({...})
  if target == "js" then
    return join({"do"}, map(function (k)
      return {"set", {"exports", "." .. k}, k}
    end, __names2))
  else
    local __x195 = {}
    local ____o3 = __names2
    local ____i5 = nil
    for ____i5 in next, ____o3 do
      local __k2 = ____o3[____i5]
      local __k3 = compileId(__k2)
      __x195[__k3] = __k3
    end
    return {"return", join({"%object"}, mapo(function (x)
      return x
    end, __x195))}
  end
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local __body21 = unstash({...})
  return _eval(join({"do"}, __body21))
end})
setenv("during-compilation", {_stash = true, macro = function (...)
  local __body22 = unstash({...})
  local __form2 = join({"do"}, __body22)
  _eval(__form2)
  return __form2
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
local function evalPrint(form)
  local ____id = {xpcall(function ()
    return compiler["eval"](form)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e
      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else
        local __e1
        if nil63(m) then
          __e1 = ""
        else
          __e1 = str(m)
        end
        __e = __e1
      end
      return {stack = debug.traceback(), message = __e}
    end
  end)}
  local __ok = ____id[1]
  local __v = ____id[2]
  if not __ok then
    return print("error: " .. __v.message .. "\n" .. __v.stack)
  else
    if is63(__v) then
      return print(str(__v))
    end
  end
end
local function rep(s)
  return evalPrint(reader.readString(s))
end
local function repl()
  local __buf = ""
  local function rep1(s)
    __buf = __buf .. s
    local __more = {}
    local __form = reader.readString(__buf, __more)
    if not( __form == __more) then
      evalPrint(__form)
      __buf = ""
      return system.write("> ")
    end
  end
  system.write("> ")
  while true do
    local __s = io.read()
    if __s then
      rep1(__s .. "\n")
    else
      break
    end
  end
end
function compileFile(path)
  local __s1 = reader.stream(system.readFile(path))
  local __body = reader.readAll(__s1)
  local __form1 = compiler.expand(join({"do"}, __body))
  return compiler.compile(__form1, {_stash = true, stmt = true})
end
function _load(path)
  local __previous = target
  target = "lua"
  local __code = compileFile(path)
  target = __previous
  return compiler.run(__code)
end
local function scriptFile63(path)
  return not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
end
local function runFile(path)
  if scriptFile63(path) then
    return _load(path)
  else
    return compiler.run(system.readFile(path))
  end
end
local function usage()
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
end
local function main()
  local __arg = hd(system.argv)
  if __arg and scriptFile63(__arg) then
    return _load(__arg)
  else
    if __arg == "-h" or __arg == "--help" then
      return usage()
    else
      local __pre = {}
      local __input = nil
      local __output = nil
      local __target1 = nil
      local __expr = nil
      local __argv = system.argv
      local __i = 0
      while __i < _35(__argv) do
        local __a = __argv[__i + 1]
        if __a == "-c" or __a == "-o" or __a == "-t" or __a == "-e" then
          if __i == edge(__argv) then
            print("missing argument for " .. __a)
          else
            __i = __i + 1
            local __val = __argv[__i + 1]
            if __a == "-c" then
              __input = __val
            else
              if __a == "-o" then
                __output = __val
              else
                if __a == "-t" then
                  __target1 = __val
                else
                  if __a == "-e" then
                    __expr = __val
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a, 0)) then
            add(__pre, __a)
          end
        end
        __i = __i + 1
      end
      local ____x2 = __pre
      local ____i1 = 0
      while ____i1 < _35(____x2) do
        local __file = ____x2[____i1 + 1]
        runFile(__file)
        ____i1 = ____i1 + 1
      end
      if nil63(__input) then
        if __expr then
          return rep(__expr)
        else
          return repl()
        end
      else
        if __target1 then
          target = __target1
        end
        local __code1 = compileFile(__input)
        if nil63(__output) or __output == "-" then
          return print(__code1)
        else
          return system.writeFile(__output, __code1)
        end
      end
    end
  end
end
main()
