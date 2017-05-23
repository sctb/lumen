environment = {{}}
target = "lua"
function nil63(x)
  return(x == nil)
end
function is63(x)
  return(not nil63(x))
end
function no(x)
  return(nil63(x) or x == false)
end
function yes(x)
  return(not no(x))
end
function either(x, y)
  if is63(x) then
    return(x)
  else
    return(y)
  end
end
function has63(l, k)
  return(is63(l[k]))
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
  return(nil63(x) or string63(x) or number63(x) or boolean63(x))
end
nan = 0 / 0
inf = 1 / 0
function nan63(n)
  return(not( n == n))
end
function inf63(n)
  return(n == inf or n == -inf)
end
function clip(s, from, upto)
  return(string.sub(s, from + 1, upto))
end
function cut(x, from, upto)
  local _l = {}
  local _j = 0
  local _e
  if nil63(from) or from < 0 then
    _e = 0
  else
    _e = from
  end
  local _i = _e
  local _n = _35(x)
  local _e1
  if nil63(upto) or upto > _n then
    _e1 = _n
  else
    _e1 = upto
  end
  local _upto = _e1
  while _i < _upto do
    _l[_j + 1] = x[_i + 1]
    _i = _i + 1
    _j = _j + 1
  end
  local __o = x
  local _k = nil
  for _k in next, __o do
    local _v = __o[_k]
    if not number63(_k) then
      _l[_k] = _v
    end
  end
  return(_l)
end
function keys(x)
  local _t = {}
  local __o1 = x
  local _k1 = nil
  for _k1 in next, __o1 do
    local _v1 = __o1[_k1]
    if not number63(_k1) then
      _t[_k1] = _v1
    end
  end
  return(_t)
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
  return(string.byte(s, _e2))
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
  local _l1 = keys(l)
  local _i3 = edge(l)
  while _i3 >= 0 do
    add(_l1, l[_i3 + 1])
    _i3 = _i3 - 1
  end
  return(_l1)
end
function reduce(f, x)
  if none63(x) then
    return(nil)
  else
    if one63(x) then
      return(hd(x))
    else
      return(f(hd(x), reduce(f, tl(x))))
    end
  end
end
function join(...)
  local _ls = unstash({...})
  local _r36 = {}
  local __x2 = _ls
  local __i4 = 0
  while __i4 < _35(__x2) do
    local _l11 = __x2[__i4 + 1]
    if _l11 then
      local _n3 = _35(_r36)
      local __o2 = _l11
      local _k2 = nil
      for _k2 in next, __o2 do
        local _v2 = __o2[_k2]
        if number63(_k2) then
          _k2 = _k2 + _n3
        end
        _r36[_k2] = _v2
      end
    end
    __i4 = __i4 + 1
  end
  return(_r36)
end
function find(f, t)
  local __o3 = t
  local __i6 = nil
  for __i6 in next, __o3 do
    local _x3 = __o3[__i6]
    local _y = f(_x3)
    if _y then
      return(_y)
    end
  end
end
function first(f, l)
  local __x4 = l
  local __i7 = 0
  while __i7 < _35(__x4) do
    local _x5 = __x4[__i7 + 1]
    local _y1 = f(_x5)
    if _y1 then
      return(_y1)
    end
    __i7 = __i7 + 1
  end
end
function in63(x, t)
  return(find(function (y)
    return(x == y)
  end, t))
end
function pair(l)
  local _l12 = {}
  local _i8 = 0
  while _i8 < _35(l) do
    add(_l12, {l[_i8 + 1], l[_i8 + 1 + 1]})
    _i8 = _i8 + 1
    _i8 = _i8 + 1
  end
  return(_l12)
end
function sort(l, f)
  table.sort(l, f)
  return(l)
end
function map(f, x)
  local _t1 = {}
  local __x7 = x
  local __i9 = 0
  while __i9 < _35(__x7) do
    local _v3 = __x7[__i9 + 1]
    local _y2 = f(_v3)
    if is63(_y2) then
      add(_t1, _y2)
    end
    __i9 = __i9 + 1
  end
  local __o4 = x
  local _k3 = nil
  for _k3 in next, __o4 do
    local _v4 = __o4[_k3]
    if not number63(_k3) then
      local _y3 = f(_v4)
      if is63(_y3) then
        _t1[_k3] = _y3
      end
    end
  end
  return(_t1)
end
function keep(f, x)
  return(map(function (v)
    if yes(f(v)) then
      return(v)
    end
  end, x))
end
function keys63(t)
  local __o5 = t
  local _k4 = nil
  for _k4 in next, __o5 do
    local _v5 = __o5[_k4]
    if not number63(_k4) then
      return(true)
    end
  end
  return(false)
end
function empty63(t)
  local __o6 = t
  local __i12 = nil
  for __i12 in next, __o6 do
    local _x8 = __o6[__i12]
    return(false)
  end
  return(true)
end
function stash(args)
  if keys63(args) then
    local _p = {}
    local __o7 = args
    local _k5 = nil
    for _k5 in next, __o7 do
      local _v6 = __o7[_k5]
      if not number63(_k5) then
        _p[_k5] = _v6
      end
    end
    _p._stash = true
    add(args, _p)
  end
  return(args)
end
function unstash(args)
  if none63(args) then
    return({})
  else
    local _l2 = last(args)
    if obj63(_l2) and _l2._stash then
      local _args1 = almost(args)
      local __o8 = _l2
      local _k6 = nil
      for _k6 in next, __o8 do
        local _v7 = __o8[_k6]
        if not( _k6 == "_stash") then
          _args1[_k6] = _v7
        end
      end
      return(_args1)
    else
      return(args)
    end
  end
end
function destash33(l, args1)
  if obj63(l) and l._stash then
    local __o9 = l
    local _k7 = nil
    for _k7 in next, __o9 do
      local _v8 = __o9[_k7]
      if not( _k7 == "_stash") then
        args1[_k7] = _v8
      end
    end
  else
    return(l)
  end
end
function search(s, pattern, start)
  local _e3
  if start then
    _e3 = start + 1
  end
  local _start = _e3
  local _i16 = string.find(s, pattern, _start, true)
  return(_i16 and _i16 - 1)
end
function split(s, sep)
  if s == "" or sep == "" then
    return({})
  else
    local _l3 = {}
    local _n12 = _35(sep)
    while true do
      local _i17 = search(s, sep)
      if nil63(_i17) then
        break
      else
        add(_l3, clip(s, 0, _i17))
        s = clip(s, _i17 + _n12)
      end
    end
    add(_l3, s)
    return(_l3)
  end
end
function cat(...)
  local _xs = unstash({...})
  return(either(reduce(function (a, b)
    return(a .. b)
  end, _xs), ""))
end
function _43(...)
  local _xs1 = unstash({...})
  return(either(reduce(function (a, b)
    return(a + b)
  end, _xs1), 0))
end
function _45(...)
  local _xs2 = unstash({...})
  return(either(reduce(function (b, a)
    return(a - b)
  end, reverse(_xs2)), 0))
end
function _42(...)
  local _xs3 = unstash({...})
  return(either(reduce(function (a, b)
    return(a * b)
  end, _xs3), 1))
end
function _47(...)
  local _xs4 = unstash({...})
  return(either(reduce(function (b, a)
    return(a / b)
  end, reverse(_xs4)), 1))
end
function _37(...)
  local _xs5 = unstash({...})
  return(either(reduce(function (b, a)
    return(a % b)
  end, reverse(_xs5)), 0))
end
local function pairwise(f, xs)
  local _i18 = 0
  while _i18 < edge(xs) do
    local _a = xs[_i18 + 1]
    local _b = xs[_i18 + 1 + 1]
    if not f(_a, _b) then
      return(false)
    end
    _i18 = _i18 + 1
  end
  return(true)
end
function _60(...)
  local _xs6 = unstash({...})
  return(pairwise(function (a, b)
    return(a < b)
  end, _xs6))
end
function _62(...)
  local _xs7 = unstash({...})
  return(pairwise(function (a, b)
    return(a > b)
  end, _xs7))
end
function _61(...)
  local _xs8 = unstash({...})
  return(pairwise(function (a, b)
    return(a == b)
  end, _xs8))
end
function _6061(...)
  local _xs9 = unstash({...})
  return(pairwise(function (a, b)
    return(a <= b)
  end, _xs9))
end
function _6261(...)
  local _xs10 = unstash({...})
  return(pairwise(function (a, b)
    return(a >= b)
  end, _xs10))
end
function number(s)
  return(tonumber(s))
end
function number_code63(n)
  return(n > 47 and n < 58)
end
function numeric63(s)
  local _n13 = _35(s)
  local _i19 = 0
  while _i19 < _n13 do
    if not number_code63(code(s, _i19)) then
      return(false)
    end
    _i19 = _i19 + 1
  end
  return(some63(s))
end
function escape(s)
  local _s1 = "\""
  local _i20 = 0
  while _i20 < _35(s) do
    local _c = char(s, _i20)
    local _e4
    if _c == "\n" then
      _e4 = "\\n"
    else
      local _e5
      if _c == "\"" then
        _e5 = "\\\""
      else
        local _e6
        if _c == "\\" then
          _e6 = "\\\\"
        else
          _e6 = _c
        end
        _e5 = _e6
      end
      _e4 = _e5
    end
    local _c1 = _e4
    _s1 = _s1 .. _c1
    _i20 = _i20 + 1
  end
  return(_s1 .. "\"")
end
function str(x, stack)
  if nil63(x) then
    return("nil")
  else
    if nan63(x) then
      return("nan")
    else
      if x == inf then
        return("inf")
      else
        if x == -inf then
          return("-inf")
        else
          if boolean63(x) then
            if x then
              return("true")
            else
              return("false")
            end
          else
            if string63(x) then
              return(escape(x))
            else
              if atom63(x) then
                return(tostring(x))
              else
                if function63(x) then
                  return("function")
                else
                  if stack and in63(x, stack) then
                    return("circular")
                  else
                    if not( type(x) == "table") then
                      return(escape(tostring(x)))
                    else
                      local _s = "("
                      local _sp = ""
                      local _xs11 = {}
                      local _ks = {}
                      local _l4 = stack or {}
                      add(_l4, x)
                      local __o10 = x
                      local _k8 = nil
                      for _k8 in next, __o10 do
                        local _v9 = __o10[_k8]
                        if number63(_k8) then
                          _xs11[_k8] = str(_v9, _l4)
                        else
                          if not string63(_k8) then
                            _k8 = str(_k8, _l4)
                          end
                          add(_ks, _k8 .. ":")
                          add(_ks, str(_v9, _l4))
                        end
                      end
                      drop(_l4)
                      local __o11 = join(_xs11, _ks)
                      local __i22 = nil
                      for __i22 in next, __o11 do
                        local _v10 = __o11[__i22]
                        _s = _s .. _sp .. _v10
                        _sp = " "
                      end
                      return(_s .. ")")
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
  local _args = stash(args)
  return(f(values(_args)))
end
function call(f, ...)
  local __r71 = unstash({...})
  local _f = destash33(f, __r71)
  local __id = __r71
  local _args11 = cut(__id, 0)
  return(apply(_f, _args11))
end
function setenv(k, ...)
  local __r72 = unstash({...})
  local _k9 = destash33(k, __r72)
  local __id1 = __r72
  local _keys = cut(__id1, 0)
  if string63(_k9) then
    local _e7
    if _keys.toplevel then
      _e7 = hd(environment)
    else
      _e7 = last(environment)
    end
    local _frame = _e7
    local _entry = _frame[_k9] or {}
    local __o12 = _keys
    local _k10 = nil
    for _k10 in next, __o12 do
      local _v11 = __o12[_k10]
      _entry[_k10] = _v11
    end
    _frame[_k9] = _entry
    return(_frame[_k9])
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
  return(quoted(form))
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return(quasiexpand(form, 1))
end})
setenv("set", {_stash = true, macro = function (...)
  local _args = unstash({...})
  return(join({"do"}, map(function (_x2)
    local __id = _x2
    local _lh = __id[1]
    local _rh = __id[2]
    return({"%set", _lh, _rh})
  end, pair(_args))))
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
  local _body = unstash({...})
  local _x9 = unique("x")
  local _l = {}
  local _forms = {}
  local __o = _body
  local _k = nil
  for _k in next, __o do
    local _v = __o[_k]
    if number63(_k) then
      _l[_k] = _v
    else
      add(_forms, {"set", {"get", _x9, {"quote", _k}}, _v})
    end
  end
  if some63(_forms) then
    return(join({"let", _x9, join({"%array"}, _l)}, _forms, {_x9}))
  else
    return(join({"%array"}, _l))
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local _branches = unstash({...})
  return(hd(expand_if(_branches)))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local __r5 = unstash({...})
  local _expr = destash33(expr, __r5)
  local __id1 = __r5
  local _clauses = cut(__id1, 0)
  local _x19 = unique("x")
  local _eq = function (_)
    return({"=", {"quote", _}, _x19})
  end
  local _cl = function (_x22)
    local __id2 = _x22
    local _a = __id2[1]
    local _b = __id2[2]
    if nil63(_b) then
      return({_a})
    else
      if string63(_a) or number63(_a) then
        return({_eq(_a), _b})
      else
        if one63(_a) then
          return({_eq(hd(_a)), _b})
        else
          if _35(_a) > 1 then
            return({join({"or"}, map(_eq, _a)), _b})
          end
        end
      end
    end
  end
  return({"let", _x19, _expr, join({"if"}, apply(join, map(_cl, pair(_clauses))))})
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local __r8 = unstash({...})
  local _cond = destash33(cond, __r8)
  local __id3 = __r8
  local _body1 = cut(__id3, 0)
  return({"if", _cond, join({"do"}, _body1)})
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local __r9 = unstash({...})
  local _cond1 = destash33(cond, __r9)
  local __id4 = __r9
  local _body2 = cut(__id4, 0)
  return({"if", {"not", _cond1}, join({"do"}, _body2)})
end})
setenv("obj", {_stash = true, macro = function (...)
  local _body3 = unstash({...})
  return(join({"%object"}, mapo(function (x)
    return(x)
  end, _body3)))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local __r11 = unstash({...})
  local _bs = destash33(bs, __r11)
  local __id5 = __r11
  local _body4 = cut(__id5, 0)
  if atom63(_bs) then
    return(join({"let", {_bs, hd(_body4)}}, tl(_body4)))
  else
    if none63(_bs) then
      return(join({"do"}, _body4))
    else
      local __id6 = _bs
      local _lh1 = __id6[1]
      local _rh1 = __id6[2]
      local _bs2 = cut(__id6, 2)
      local __id7 = bind(_lh1, _rh1)
      local _id8 = __id7[1]
      local _val = __id7[2]
      local _bs1 = cut(__id7, 2)
      local _renames = {}
      if not id_literal63(_id8) then
        local _id11 = unique(_id8)
        _renames = {_id8, _id11}
        _id8 = _id11
      end
      return({"do", {"%local", _id8, _val}, {"let-symbol", _renames, join({"let", join(_bs1, _bs2)}, _body4)}})
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local __r12 = unstash({...})
  local _x49 = destash33(x, __r12)
  local _v1 = destash33(v, __r12)
  local __id9 = __r12
  local _body5 = cut(__id9, 0)
  return(join({"let", {_x49, _v1}}, _body5, {_x49}))
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local __r13 = unstash({...})
  local _x54 = destash33(x, __r13)
  local _v2 = destash33(v, __r13)
  local __id10 = __r13
  local _body6 = cut(__id10, 0)
  local _y = unique("y")
  return({"let", _y, _v2, {"when", {"yes", _y}, join({"let", {_x54, _y}}, _body6)}})
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local __r14 = unstash({...})
  local _name = destash33(name, __r14)
  local _args1 = destash33(args, __r14)
  local __id111 = __r14
  local _body7 = cut(__id111, 0)
  local __x61 = {"setenv", {"quote", _name}}
  __x61.macro = join({"fn", _args1}, _body7)
  return(__x61)
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local __r15 = unstash({...})
  local _name1 = destash33(name, __r15)
  local _args2 = destash33(args, __r15)
  local __id12 = __r15
  local _body8 = cut(__id12, 0)
  local __x65 = {"setenv", {"quote", _name1}}
  __x65.special = join({"fn", _args2}, _body8)
  return(join(__x65, keys(_body8)))
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  local __x68 = {"setenv", {"quote", name}}
  __x68.symbol = {"quote", expansion}
  return(__x68)
end})
setenv("define-reader", {_stash = true, macro = function (_x71, ...)
  local __id13 = _x71
  local _char = __id13[1]
  local _s = __id13[2]
  local __r17 = unstash({...})
  local __x71 = destash33(_x71, __r17)
  local __id14 = __r17
  local _body9 = cut(__id14, 0)
  return({"set", {"get", "read-table", _char}, join({"fn", {_s}}, _body9)})
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local __r18 = unstash({...})
  local _name2 = destash33(name, __r18)
  local _x78 = destash33(x, __r18)
  local __id15 = __r18
  local _body10 = cut(__id15, 0)
  setenv(_name2, {_stash = true, variable = true})
  if some63(_body10) then
    return(join({"%local-function", _name2}, bind42(_x78, _body10)))
  else
    return({"%local", _name2, _x78})
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local __r19 = unstash({...})
  local _name3 = destash33(name, __r19)
  local _x82 = destash33(x, __r19)
  local __id16 = __r19
  local _body11 = cut(__id16, 0)
  setenv(_name3, {_stash = true, toplevel = true, variable = true})
  if some63(_body11) then
    return(join({"%global-function", _name3}, bind42(_x82, _body11)))
  else
    return({"set", _name3, _x82})
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local _body12 = unstash({...})
  local _x86 = unique("x")
  return({"do", {"add", "environment", {"obj"}}, {"with", _x86, join({"do"}, _body12), {"drop", "environment"}}})
end})
setenv("with-bindings", {_stash = true, macro = function (_x93, ...)
  local __id17 = _x93
  local _names = __id17[1]
  local __r20 = unstash({...})
  local __x93 = destash33(_x93, __r20)
  local __id18 = __r20
  local _body13 = cut(__id18, 0)
  local _x95 = unique("x")
  local __x98 = {"setenv", _x95}
  __x98.variable = true
  return(join({"with-frame", {"each", _x95, _names, __x98}}, _body13))
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local __r21 = unstash({...})
  local _definitions = destash33(definitions, __r21)
  local __id19 = __r21
  local _body14 = cut(__id19, 0)
  add(environment, {})
  map(function (m)
    return(eval(join({"define-macro"}, m)))
  end, _definitions)
  local __x100 = join({"do"}, macroexpand(_body14))
  drop(environment)
  return(__x100)
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local __r23 = unstash({...})
  local _expansions = destash33(expansions, __r23)
  local __id20 = __r23
  local _body15 = cut(__id20, 0)
  add(environment, {})
  map(function (_x105)
    local __id21 = _x105
    local _name4 = __id21[1]
    local _exp = __id21[2]
    return(setenv(_name4, {_stash = true, symbol = _exp}))
  end, pair(_expansions))
  local __x104 = join({"do"}, macroexpand(_body15))
  drop(environment)
  return(__x104)
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local __r25 = unstash({...})
  local _names1 = destash33(names, __r25)
  local __id22 = __r25
  local _body16 = cut(__id22, 0)
  local _bs11 = map(function (n)
    return({n, {"unique", {"quote", n}}})
  end, _names1)
  return(join({"let", apply(join, _bs11)}, _body16))
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local __r27 = unstash({...})
  local _args3 = destash33(args, __r27)
  local __id23 = __r27
  local _body17 = cut(__id23, 0)
  return(join({"%function"}, bind42(_args3, _body17)))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local __r28 = unstash({...})
  local _f = destash33(f, __r28)
  local __id24 = __r28
  local _args4 = cut(__id24, 0)
  if _35(_args4) > 1 then
    return({{"do", "apply"}, _f, {"join", join({"list"}, almost(_args4)), last(_args4)}})
  else
    return(join({{"do", "apply"}, _f}, _args4))
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if target == "js" then
    return({{"fn", join(), {"%try", {"list", true, expr}}}})
  else
    local _x125 = unique("x")
    local _msg = unique("msg")
    local _trace = unique("trace")
    local __x147 = {"obj"}
    __x147.message = _msg
    __x147.stack = _trace
    return({"let", {_x125, "nil", _msg, "nil", _trace, "nil"}, {"if", {"xpcall", {"fn", join(), {"set", _x125, expr}}, {"fn", {"m"}, {"set", _trace, {{"get", "debug", {"quote", "traceback"}}}, _msg, {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}}}}, {"list", true, _x125}, {"list", false, __x147}}})
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local __r30 = unstash({...})
  local _x149 = destash33(x, __r30)
  local _t = destash33(t, __r30)
  local __id25 = __r30
  local _body18 = cut(__id25, 0)
  local _o1 = unique("o")
  local _n1 = unique("n")
  local _i1 = unique("i")
  local _e
  if atom63(_x149) then
    _e = {_i1, _x149}
  else
    local _e1
    if _35(_x149) > 1 then
      _e1 = _x149
    else
      _e1 = {_i1, hd(_x149)}
    end
    _e = _e1
  end
  local __id26 = _e
  local _k1 = __id26[1]
  local _v3 = __id26[2]
  local _e2
  if target == "lua" then
    _e2 = _body18
  else
    _e2 = {join({"let", _k1, {"if", {"numeric?", _k1}, {"parseInt", _k1}, _k1}}, _body18)}
  end
  return({"let", {_o1, _t, _k1, "nil"}, {"%for", _o1, _k1, join({"let", {_v3, {"get", _o1, _k1}}}, _e2)}})
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local __r31 = unstash({...})
  local _i2 = destash33(i, __r31)
  local _to = destash33(to, __r31)
  local __id27 = __r31
  local _body19 = cut(__id27, 0)
  return({"let", _i2, 0, join({"while", {"<", _i2, _to}}, _body19, {{"inc", _i2}})})
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local __r32 = unstash({...})
  local _v4 = destash33(v, __r32)
  local _t1 = destash33(t, __r32)
  local __id28 = __r32
  local _body20 = cut(__id28, 0)
  local _x170 = unique("x")
  local _i3 = unique("i")
  return({"let", {_x170, _t1}, {"for", _i3, {"#", _x170}, join({"let", {_v4, {"at", _x170, _i3}}}, _body20)}})
end})
setenv("set-of", {_stash = true, macro = function (...)
  local _xs = unstash({...})
  local _l1 = {}
  local __o2 = _xs
  local __i4 = nil
  for __i4 in next, __o2 do
    local _x179 = __o2[__i4]
    _l1[_x179] = true
  end
  return(join({"obj"}, _l1))
end})
setenv("language", {_stash = true, macro = function ()
  return({"quote", target})
end})
setenv("target", {_stash = true, macro = function (...)
  local _clauses1 = unstash({...})
  return(_clauses1[target])
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local __r34 = unstash({...})
  local _a1 = destash33(a, __r34)
  local __id29 = __r34
  local _bs21 = cut(__id29, 0)
  return({"set", _a1, join({"join", _a1}, _bs21)})
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local __r35 = unstash({...})
  local _a2 = destash33(a, __r35)
  local __id30 = __r35
  local _bs3 = cut(__id30, 0)
  return({"set", _a2, join({"cat", _a2}, _bs3)})
end})
setenv("inc", {_stash = true, macro = function (n, by)
  local _e3
  if nil63(by) then
    _e3 = 1
  else
    _e3 = by
  end
  return({"set", n, {"+", n, _e3}})
end})
setenv("dec", {_stash = true, macro = function (n, by)
  local _e4
  if nil63(by) then
    _e4 = 1
  else
    _e4 = by
  end
  return({"set", n, {"-", n, _e4}})
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local _x193 = unique("x")
  return({"do", {"inc", "indent-level"}, {"with", _x193, form, {"dec", "indent-level"}}})
end})
setenv("export", {_stash = true, macro = function (...)
  local _names2 = unstash({...})
  if target == "js" then
    return(join({"do"}, map(function (k)
      return({"set", {"get", "exports", {"quote", k}}, k})
    end, _names2)))
  else
    local _x203 = {}
    local __o3 = _names2
    local __i5 = nil
    for __i5 in next, __o3 do
      local _k2 = __o3[__i5]
      _x203[_k2] = _k2
    end
    return({"return", join({"%object"}, mapo(function (x)
      return(x)
    end, _x203))})
  end
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local _body21 = unstash({...})
  return(eval(join({"do"}, _body21)))
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
local function eval_print(form)
  local __x = nil
  local __msg = nil
  local __trace = nil
  local _e
  if xpcall(function ()
    __x = compiler.eval(form)
    return(__x)
  end, function (m)
    __trace = debug.traceback()
    local _e1
    if string63(m) then
      _e1 = clip(m, search(m, ": ") + 2)
    else
      local _e2
      if nil63(m) then
        _e2 = ""
      else
        _e2 = str(m)
      end
      _e1 = _e2
    end
    __msg = _e1
    return(__msg)
  end) then
    _e = {true, __x}
  else
    _e = {false, {message = __msg, stack = __trace}}
  end
  local __id = _e
  local _ok = __id[1]
  local _v = __id[2]
  if not _ok then
    return(print("error: " .. _v.message .. "\n" .. _v.stack))
  else
    if is63(_v) then
      return(print(str(_v)))
    end
  end
end
local function rep(s)
  return(eval_print(reader["read-string"](s)))
end
local function repl()
  local _buf = ""
  local function rep1(s)
    _buf = _buf .. s
    local _more = {}
    local _form = reader["read-string"](_buf, _more)
    if not( _form == _more) then
      eval_print(_form)
      _buf = ""
      return(system.write("> "))
    end
  end
  system.write("> ")
  while true do
    local _s = io.read()
    if _s then
      rep1(_s .. "\n")
    else
      break
    end
  end
end
function compile_file(path)
  local _s1 = reader.stream(system["read-file"](path))
  local _body = reader["read-all"](_s1)
  local _form1 = compiler.expand(join({"do"}, _body))
  return(compiler.compile(_form1, {_stash = true, stmt = true}))
end
function load(path)
  local _previous = target
  target = "lua"
  local _code = compile_file(path)
  target = _previous
  return(compiler.run(_code))
end
local function run_file(path)
  return(compiler.run(system["read-file"](path)))
end
local function script_file63(path)
  return(not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4)))
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
  return(print(" -e <expr>\tExpression to evaluate"))
end
local function main()
  local _arg = hd(system.argv)
  if _arg and script_file63(_arg) then
    return(load(_arg))
  else
    if _arg == "-h" or _arg == "--help" then
      return(usage())
    else
      local _pre = {}
      local _input = nil
      local _output = nil
      local _target1 = nil
      local _expr = nil
      local _argv = system.argv
      local _i = 0
      while _i < _35(_argv) do
        local _a = _argv[_i + 1]
        if _a == "-c" or _a == "-o" or _a == "-t" or _a == "-e" then
          if _i == edge(_argv) then
            print("missing argument for " .. _a)
          else
            _i = _i + 1
            local _val = _argv[_i + 1]
            if _a == "-c" then
              _input = _val
            else
              if _a == "-o" then
                _output = _val
              else
                if _a == "-t" then
                  _target1 = _val
                else
                  if _a == "-e" then
                    _expr = _val
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(_a, 0)) then
            add(_pre, _a)
          end
        end
        _i = _i + 1
      end
      local __x4 = _pre
      local __i1 = 0
      while __i1 < _35(__x4) do
        local _file = __x4[__i1 + 1]
        run_file(_file)
        __i1 = __i1 + 1
      end
      if nil63(_input) then
        if _expr then
          return(rep(_expr))
        else
          return(repl())
        end
      else
        if _target1 then
          target = _target1
        end
        local _code1 = compile_file(_input)
        if nil63(_output) or _output == "-" then
          return(print(_code1))
        else
          return(system["write-file"](_output, _code1))
        end
      end
    end
  end
end
main()
