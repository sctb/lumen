local function getenv(k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      local __b = environment[__i + 1][k]
      if is63(__b) then
        local __e21
        if p then
          __e21 = __b[p]
        else
          __e21 = __b
        end
        return __e21
      else
        __i = __i - 1
      end
    end
  end
end
local function macroFunction(k)
  return getenv(k, "macro")
end
local function macro63(k)
  return is63(macroFunction(k))
end
local function special63(k)
  return is63(getenv(k, "special"))
end
local function specialForm63(form)
  return not atom63(form) and special63(hd(form))
end
local function statement63(k)
  return special63(k) and getenv(k, "stmt")
end
local function symbolExpansion(k)
  return getenv(k, "symbol")
end
local function symbol63(k)
  return is63(symbolExpansion(k))
end
local function variable63(k)
  return is63(getenv(k, "variable"))
end
function bound63(x)
  return macro63(x) or special63(x) or symbol63(x) or variable63(x)
end
function quoted(form)
  if string63(form) then
    return escape(form)
  else
    if atom63(form) then
      return form
    else
      return join({"list"}, map(quoted, form))
    end
  end
end
local function literal(s)
  if stringLiteral63(s) then
    return s
  else
    return quoted(s)
  end
end
local function stash42(args)
  if keys63(args) then
    local __l = {"%object", "\"_stash\"", true}
    local ____o = args
    local __k = nil
    for __k in next, ____o do
      local __v = ____o[__k]
      if not number63(__k) then
        add(__l, literal(__k))
        add(__l, __v)
      end
    end
    return join(args, {__l})
  else
    return args
  end
end
local function bias(k)
  if number63(k) and not( target == "lua") then
    if target == "js" then
      k = k - 1
    else
      k = k + 1
    end
  end
  return k
end
function bind(lh, rh)
  if atom63(lh) then
    return {lh, rh}
  else
    local __id = unique("id")
    local __bs = {__id, rh}
    local ____o1 = lh
    local __k1 = nil
    for __k1 in next, ____o1 do
      local __v1 = ____o1[__k1]
      local __e22
      if __k1 == "rest" then
        __e22 = {"cut", __id, _35(lh)}
      else
        __e22 = {"get", __id, {"quote", bias(__k1)}}
      end
      local __x5 = __e22
      if is63(__k1) then
        local __e23
        if __v1 == true then
          __e23 = __k1
        else
          __e23 = __v1
        end
        local __k2 = __e23
        __bs = join(__bs, bind(__k2, __x5))
      end
    end
    return __bs
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return {"Array", ".prototype", ".slice", ".call", "arguments", from}
end})
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1.rest = true
    if target == "js" then
      return {"unstash", {"arguments%", _35(__args1)}}
    else
      return {"unstash", {"list", "|...|"}}
    end
  end
  if atom63(args) then
    return {__args1, join({"let", {args, rest()}}, body)}
  else
    local __bs1 = {}
    local __r19 = unique("r")
    local ____o2 = args
    local __k3 = nil
    for __k3 in next, ____o2 do
      local __v2 = ____o2[__k3]
      if number63(__k3) then
        if atom63(__v2) then
          add(__args1, __v2)
        else
          local __x18 = unique("x")
          add(__args1, __x18)
          __bs1 = join(__bs1, {__v2, __x18})
        end
      end
    end
    if keys63(args) then
      __bs1 = join(__bs1, {__r19, rest()})
      local __n3 = _35(__args1)
      local __i4 = 0
      while __i4 < __n3 do
        local __v3 = __args1[__i4 + 1]
        __bs1 = join(__bs1, {__v3, {"destash!", __v3, __r19}})
        __i4 = __i4 + 1
      end
      __bs1 = join(__bs1, {keys(args), __r19})
    end
    return {__args1, join({"let", __bs1}, body)}
  end
end
local function quoting63(depth)
  return number63(depth)
end
local function quasiquoting63(depth)
  return quoting63(depth) and depth > 0
end
local function canUnquote63(depth)
  return quoting63(depth) and depth == 1
end
local function quasisplice63(x, depth)
  return canUnquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing"
end
local function expandLocal(__x26)
  local ____id1 = __x26
  local __x27 = ____id1[1]
  local __name = ____id1[2]
  local __value = ____id1[3]
  setenv(__name, {_stash = true, variable = true})
  return {"%local", __name, macroexpand(__value)}
end
local function expandFunction(__x29)
  local ____id2 = __x29
  local __x30 = ____id2[1]
  local __args = ____id2[2]
  local __body = cut(____id2, 2)
  add(environment, {})
  local ____o3 = __args
  local ____i5 = nil
  for ____i5 in next, ____o3 do
    local ____x31 = ____o3[____i5]
    setenv(____x31, {_stash = true, variable = true})
  end
  local ____x32 = join({"%function", __args}, macroexpand(__body))
  drop(environment)
  return ____x32
end
local function expandDefinition(__x34)
  local ____id3 = __x34
  local __x35 = ____id3[1]
  local __name1 = ____id3[2]
  local __args11 = ____id3[3]
  local __body1 = cut(____id3, 3)
  add(environment, {})
  local ____o4 = __args11
  local ____i6 = nil
  for ____i6 in next, ____o4 do
    local ____x36 = ____o4[____i6]
    setenv(____x36, {_stash = true, variable = true})
  end
  local ____x37 = join({__x35, __name1, __args11}, macroexpand(__body1))
  drop(environment)
  return ____x37
end
local function expandMacro(form)
  return macroexpand(expand1(form))
end
function expand1(__x39)
  local ____id4 = __x39
  local __name2 = ____id4[1]
  local __body2 = cut(____id4, 1)
  return apply(macroFunction(__name2), __body2)
end
function macroexpand(form)
  if symbol63(form) then
    return macroexpand(symbolExpansion(form))
  else
    if atom63(form) then
      return form
    else
      local __x40 = hd(form)
      if __x40 == "%local" then
        return expandLocal(form)
      else
        if __x40 == "%function" then
          return expandFunction(form)
        else
          if __x40 == "%global-function" then
            return expandDefinition(form)
          else
            if __x40 == "%local-function" then
              return expandDefinition(form)
            else
              if macro63(__x40) then
                return expandMacro(form)
              else
                return map(macroexpand, form)
              end
            end
          end
        end
      end
    end
  end
end
local function quasiquoteList(form, depth)
  local __xs = {{"list"}}
  local ____o5 = form
  local __k4 = nil
  for __k4 in next, ____o5 do
    local __v4 = ____o5[__k4]
    if not number63(__k4) then
      local __e24
      if quasisplice63(__v4, depth) then
        __e24 = quasiexpand(__v4[2])
      else
        __e24 = quasiexpand(__v4, depth)
      end
      local __v5 = __e24
      last(__xs)[__k4] = __v5
    end
  end
  local ____x43 = form
  local ____i8 = 0
  while ____i8 < _35(____x43) do
    local __x44 = ____x43[____i8 + 1]
    if quasisplice63(__x44, depth) then
      local __x45 = quasiexpand(__x44[2])
      add(__xs, __x45)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x44, depth))
    end
    ____i8 = ____i8 + 1
  end
  local __pruned = keep(function (x)
    return _35(x) > 1 or not( hd(x) == "list") or keys63(x)
  end, __xs)
  if one63(__pruned) then
    return hd(__pruned)
  else
    return join({"join"}, __pruned)
  end
end
function quasiexpand(form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return {"quote", form}
    else
      if canUnquote63(depth) and hd(form) == "unquote" then
        return quasiexpand(form[2])
      else
        if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
          return quasiquoteList(form, depth - 1)
        else
          if hd(form) == "quasiquote" then
            return quasiquoteList(form, depth + 1)
          else
            return quasiquoteList(form, depth)
          end
        end
      end
    end
  else
    if atom63(form) then
      return form
    else
      if hd(form) == "quote" then
        return form
      else
        if hd(form) == "quasiquote" then
          return quasiexpand(form[2], 1)
        else
          return map(function (x)
            return quasiexpand(x, depth)
          end, form)
        end
      end
    end
  end
end
function expandIf(__x49)
  local ____id5 = __x49
  local __a = ____id5[1]
  local __b1 = ____id5[2]
  local __c = cut(____id5, 2)
  if is63(__b1) then
    return {join({"%if", __a, __b1}, expandIf(__c))}
  else
    if is63(__a) then
      return {__a}
    end
  end
end
indentLevel = 0
function indentation()
  local __s = ""
  local __i9 = 0
  while __i9 < indentLevel do
    __s = __s .. "  "
    __i9 = __i9 + 1
  end
  return __s
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return has63(reserved, x)
end
local function validCode63(n)
  return numberCode63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
end
function accessor63(x)
  return string63(x) and _35(x) > 1 and code(x, 0) == 46 and not( code(x, 1) == 46) or obj63(x) and hd(x) == "%brackets"
end
function compileId(id)
  local __id6 = camelCase(id)
  local __e25
  if numberCode63(code(__id6, 0)) then
    __e25 = "_"
  else
    __e25 = ""
  end
  local __id11 = __e25
  local __i10 = 0
  while __i10 < _35(__id6) do
    local __c1 = char(__id6, __i10)
    local __n7 = code(__c1)
    local __e26
    if __c1 == "-" and not( __id6 == "-") then
      __e26 = "_"
    else
      local __e27
      if validCode63(__n7) then
        __e27 = __c1
      else
        local __e28
        if __i10 == 0 then
          __e28 = "_" .. __n7
        else
          __e28 = __n7
        end
        __e27 = __e28
      end
      __e26 = __e27
    end
    local __c11 = __e26
    __id11 = __id11 .. __c11
    __i10 = __i10 + 1
  end
  return __id11
end
function validId63(x)
  local __id33 = some63(x) and x == compileId(x)
  local __e30
  if __id33 then
    local __e31
    if target == "lua" then
      __e31 = not reserved63(x)
    else
      __e31 = true
    end
    __e30 = __e31
  else
    __e30 = __id33
  end
  return __e30
end
local __names = {}
function unique(x)
  local __x53 = compileId(x)
  if __names[__x53] then
    local __i11 = __names[__x53]
    __names[__x53] = __names[__x53] + 1
    return unique(__x53 .. __i11)
  else
    __names[__x53] = 1
    return "__" .. __x53
  end
end
function key(k)
  local __i12 = inner(k)
  if validId63(__i12) then
    return __i12
  else
    if target == "js" then
      return k
    else
      return "[" .. k .. "]"
    end
  end
end
function mapo(f, t)
  local __o6 = {}
  local ____o7 = t
  local __k5 = nil
  for __k5 in next, ____o7 do
    local __v6 = ____o7[__k5]
    local __x54 = f(__v6)
    if is63(__x54) then
      add(__o6, literal(__k5))
      add(__o6, __x54)
    end
  end
  return __o6
end
local ____x56 = {}
local ____x57 = {}
____x57.js = "!"
____x57.lua = "not"
____x56["not"] = ____x57
local ____x58 = {}
____x58["*"] = true
____x58["/"] = true
____x58["%"] = true
local ____x59 = {}
local ____x60 = {}
____x60.js = "+"
____x60.lua = ".."
____x59.cat = ____x60
local ____x61 = {}
____x61["+"] = true
____x61["-"] = true
local ____x62 = {}
____x62["<"] = true
____x62[">"] = true
____x62["<="] = true
____x62[">="] = true
local ____x63 = {}
local ____x64 = {}
____x64.js = "==="
____x64.lua = "=="
____x63["="] = ____x64
local ____x65 = {}
local ____x66 = {}
____x66.js = "&&"
____x66.lua = "and"
____x65["and"] = ____x66
local ____x67 = {}
local ____x68 = {}
____x68.js = "||"
____x68.lua = "or"
____x67["or"] = ____x68
local infix = {____x56, ____x58, ____x59, ____x61, ____x62, ____x63, ____x65, ____x67}
local function unary63(form)
  return two63(form) and in63(hd(form), {"not", "-"})
end
local function index(k)
  if number63(k) then
    return k - 1
  end
end
local function precedence(form)
  if not( atom63(form) or unary63(form)) then
    local ____o8 = infix
    local __k6 = nil
    for __k6 in next, ____o8 do
      local __v7 = ____o8[__k6]
      if __v7[hd(form)] then
        return index(__k6)
      end
    end
  end
  return 0
end
local function getop(op)
  return find(function (level)
    local __x70 = level[op]
    if __x70 == true then
      return op
    else
      if is63(__x70) then
        return __x70[target]
      end
    end
  end, infix)
end
local function infix63(x)
  return is63(getop(x))
end
function infixOperator63(x)
  return obj63(x) and infix63(hd(x))
end
function compileNext(x, args, call63)
  if none63(args) then
    if call63 then
      return x .. "()"
    else
      return x
    end
  else
    return x .. compileArgs(args, call63)
  end
end
function compileArgs(args, call63)
  local __a1 = hd(args)
  if accessor63(__a1) then
    return compileNext(compile(__a1), tl(args), call63)
  else
    if obj63(__a1) and accessor63(hd(__a1)) then
      local ____id7 = __a1
      local __x71 = ____id7[1]
      local __ys = cut(____id7, 1)
      local __s1 = compileNext(compile(__x71), __ys, true)
      return compileNext(__s1, tl(args), call63)
    else
      local __s2 = ""
      local __c2 = ""
      local __i15 = 0
      while __i15 < _35(args) do
        local __x72 = args[__i15 + 1]
        if accessor63(__x72) or obj63(__x72) and accessor63(hd(__x72)) then
          return compileNext("(" .. __s2 .. ")", cut(args, __i15), call63)
        else
          __s2 = __s2 .. __c2 .. compile(__x72)
        end
        __c2 = ", "
        __i15 = __i15 + 1
      end
      return "(" .. __s2 .. ")"
    end
  end
end
local function escapeNewlines(s)
  local __s11 = ""
  local __i16 = 0
  while __i16 < _35(s) do
    local __c3 = char(s, __i16)
    local __e32
    if __c3 == "\n" then
      __e32 = "\\n"
    else
      local __e33
      if __c3 == "\r" then
        __e33 = "\\r"
      else
        __e33 = __c3
      end
      __e32 = __e33
    end
    __s11 = __s11 .. __e32
    __i16 = __i16 + 1
  end
  return __s11
end
function accessor(x)
  local __prop = compileId(clip(x, 1))
  if validId63(__prop) then
    return "." .. __prop
  else
    return "[" .. escape(__prop) .. "]"
  end
end
local function compileAtom(x)
  if accessor63(x) then
    return accessor(x)
  else
    if x == "nil" and target == "lua" then
      return x
    else
      if x == "nil" then
        return "undefined"
      else
        if idLiteral63(x) then
          return inner(x)
        else
          if stringLiteral63(x) then
            return escapeNewlines(x)
          else
            if string63(x) then
              local __s3 = compileId(x)
              if reserved63(__s3) then
                return "_" .. __s3
              else
                return __s3
              end
            else
              if boolean63(x) then
                if x then
                  return "true"
                else
                  return "false"
                end
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
                      if number63(x) then
                        return x .. ""
                      else
                        error("Cannot compile atom: " .. str(x))
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
local function terminator(stmt63)
  if not stmt63 then
    return ""
  else
    if target == "js" then
      return ";\n"
    else
      return "\n"
    end
  end
end
local function compileSpecial(form, stmt63)
  local ____id8 = form
  local __x73 = ____id8[1]
  local __args2 = cut(____id8, 1)
  local ____id9 = getenv(__x73)
  local __special = ____id9.special
  local __stmt = ____id9.stmt
  local __selfTr63 = ____id9.tr
  local __tr = terminator(stmt63 and not __selfTr63)
  return apply(__special, __args2) .. __tr
end
local function parenthesizeCall63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
local function compileCall(form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args3 = compileArgs(stash42(tl(form)))
  if parenthesizeCall63(__f) then
    return "(" .. __f1 .. ")" .. __args3
  else
    return __f1 .. __args3
  end
end
local function opDelims(parent, child, ...)
  local ____r60 = unstash({...})
  local __parent = destash33(parent, ____r60)
  local __child = destash33(child, ____r60)
  local ____id10 = ____r60
  local __right = ____id10.right
  local __e34
  if __right then
    __e34 = _6261
  else
    __e34 = _62
  end
  if __e34(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compileInfix(form)
  local ____id111 = form
  local __op = ____id111[1]
  local ____id12 = cut(____id111, 1)
  local __a2 = ____id12[1]
  local __b2 = ____id12[2]
  local ____id13 = opDelims(form, __a2)
  local __ao = ____id13[1]
  local __ac = ____id13[2]
  local ____id14 = opDelims(form, __b2, {_stash = true, right = true})
  local __bo = ____id14[1]
  local __bc = ____id14[2]
  local __a3 = compile(__a2)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return __op1 .. __ao .. " " .. __a3 .. __ac
  else
    return __ao .. __a3 .. __ac .. " " .. __op1 .. " " .. __bo .. __b3 .. __bc
  end
end
function compileFunction(args, body, ...)
  local ____r62 = unstash({...})
  local __args4 = destash33(args, ____r62)
  local __body3 = destash33(body, ____r62)
  local ____id15 = ____r62
  local __name3 = ____id15.name
  local __prefix = ____id15.prefix
  local __e35
  if __name3 then
    __e35 = compile(__name3)
  else
    __e35 = ""
  end
  local __id16 = __e35
  local __e36
  if target == "lua" and __args4.rest then
    __e36 = join(__args4, {"|...|"})
  else
    __e36 = __args4
  end
  local __args12 = __e36
  local __args5 = compileArgs(__args12)
  indentLevel = indentLevel + 1
  local ____x79 = compile(__body3, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __body4 = ____x79
  local __ind = indentation()
  local __e37
  if __prefix then
    __e37 = __prefix .. " "
  else
    __e37 = ""
  end
  local __p = __e37
  local __e38
  if target == "js" then
    __e38 = ""
  else
    __e38 = "end"
  end
  local __tr1 = __e38
  if __name3 then
    __tr1 = __tr1 .. "\n"
  end
  if target == "js" then
    return "function " .. __id16 .. __args5 .. " {\n" .. __body4 .. __ind .. "}" .. __tr1
  else
    return __p .. "function " .. __id16 .. __args5 .. "\n" .. __body4 .. __ind .. __tr1
  end
end
local function canReturn63(form)
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
end
function compile(form, ...)
  local ____r64 = unstash({...})
  local __form = destash33(form, ____r64)
  local ____id17 = ____r64
  local __stmt1 = ____id17.stmt
  if nil63(__form) then
    return ""
  else
    if specialForm63(__form) then
      return compileSpecial(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e39
      if __stmt1 then
        __e39 = indentation()
      else
        __e39 = ""
      end
      local __ind1 = __e39
      local __e40
      if atom63(__form) then
        __e40 = compileAtom(__form)
      else
        local __e41
        if infix63(hd(__form)) then
          __e41 = compileInfix(__form)
        else
          __e41 = compileCall(__form)
        end
        __e40 = __e41
      end
      local __form1 = __e40
      return __ind1 .. __form1 .. __tr2
    end
  end
end
local function lowerStatement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e42
  if some63(__hoist) and is63(__e) then
    __e42 = join({"do"}, __hoist, {__e})
  else
    local __e43
    if is63(__e) then
      __e43 = __e
    else
      local __e44
      if _35(__hoist) > 1 then
        __e44 = join({"do"}, __hoist)
      else
        __e44 = hd(__hoist)
      end
      __e43 = __e44
    end
    __e42 = __e43
  end
  return either(__e42, {"do"})
end
local function lowerBody(body, tail63)
  return lowerStatement(join({"do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object"
end
local function standalone63(form)
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or idLiteral63(form)
end
local function lowerDo(args, hoist, stmt63, tail63)
  local ____x86 = almost(args)
  local ____i17 = 0
  while ____i17 < _35(____x86) do
    local __x87 = ____x86[____i17 + 1]
    local ____y = lower(__x87, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i17 = ____i17 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and canReturn63(__e2) then
    return {"return", __e2}
  else
    return __e2
  end
end
local function lowerSet(args, hoist, stmt63, tail63)
  local ____id18 = args
  local __lh = ____id18[1]
  local __rh = ____id18[2]
  add(hoist, {"%set", lower(__lh, hoist), lower(__rh, hoist)})
  if not( stmt63 and not tail63) then
    return __lh
  end
end
local function lowerIf(args, hoist, stmt63, tail63)
  local ____id19 = args
  local __cond = ____id19[1]
  local __then = ____id19[2]
  local __else = ____id19[3]
  if stmt63 then
    local __e46
    if is63(__else) then
      __e46 = {lowerBody({__else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lowerBody({__then}, tail63)}, __e46))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3})
    local __e45
    if is63(__else) then
      __e45 = {lower({"%set", __e3, __else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, __then})}, __e45))
    return __e3
  end
end
local function lowerShort(x, args, hoist)
  local ____id20 = args
  local __a4 = ____id20[1]
  local __b4 = ____id20[2]
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id21 = unique("id")
    local __e47
    if x == "and" then
      __e47 = {"%if", __id21, __b4, __id21}
    else
      __e47 = {"%if", __id21, __id21, __b4}
    end
    return lower({"do", {"%local", __id21, __a4}, __e47}, hoist)
  else
    return {x, lower(__a4, hoist), __b11}
  end
end
local function lowerTry(args, hoist, tail63)
  return add(hoist, {"%try", lowerBody(args, tail63)})
end
local function lowerWhile(args, hoist)
  local ____id22 = args
  local __c4 = ____id22[1]
  local __body5 = cut(____id22, 1)
  local __pre = {}
  local __c5 = lower(__c4, __pre)
  local __e48
  if none63(__pre) then
    __e48 = {"while", __c5, lowerBody(__body5)}
  else
    __e48 = {"while", true, join({"do"}, __pre, {{"%if", {"not", __c5}, {"break"}}, lowerBody(__body5)})}
  end
  return add(hoist, __e48)
end
local function lowerFor(args, hoist)
  local ____id23 = args
  local __t = ____id23[1]
  local __k7 = ____id23[2]
  local __body6 = cut(____id23, 2)
  return add(hoist, {"%for", lower(__t, hoist), __k7, lowerBody(__body6)})
end
local function lowerFunction(args)
  local ____id24 = args
  local __a5 = ____id24[1]
  local __body7 = cut(____id24, 1)
  return {"%function", __a5, lowerBody(__body7, true)}
end
local function lowerDefinition(kind, args, hoist)
  local ____id25 = args
  local __name4 = ____id25[1]
  local __args6 = ____id25[2]
  local __body8 = cut(____id25, 2)
  return add(hoist, {kind, __name4, __args6, lowerBody(__body8, true)})
end
local function lowerCall(form, hoist)
  local __form2 = map(function (x)
    return lower(x, hoist)
  end, form)
  if some63(__form2) then
    return __form2
  end
end
local function pairwise63(form)
  return in63(hd(form), {"<", "<=", "=", ">=", ">"})
end
local function lowerPairwise(form)
  if pairwise63(form) then
    local __e4 = {}
    local ____id26 = form
    local __x116 = ____id26[1]
    local __args7 = cut(____id26, 1)
    reduce(function (a, b)
      add(__e4, {__x116, a, b})
      return a
    end, __args7)
    return join({"and"}, reverse(__e4))
  else
    return form
  end
end
local function lowerInfix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lowerInfix(form, hoist)
  local __form3 = lowerPairwise(form)
  local ____id27 = __form3
  local __x119 = ____id27[1]
  local __args8 = cut(____id27, 1)
  return lower(reduce(function (a, b)
    return {__x119, b, a}
  end, reverse(__args8)), hoist)
end
local function lowerSpecial(form, hoist)
  local __e5 = lowerCall(form, hoist)
  if __e5 then
    return add(hoist, __e5)
  end
end
function lower(form, hoist, stmt63, tail63)
  if atom63(form) then
    return form
  else
    if empty63(form) then
      return {"%array"}
    else
      if nil63(hoist) then
        return lowerStatement(form)
      else
        if lowerInfix63(form) then
          return lowerInfix(form, hoist)
        else
          local ____id28 = form
          local __x122 = ____id28[1]
          local __args9 = cut(____id28, 1)
          if __x122 == "do" then
            return lowerDo(__args9, hoist, stmt63, tail63)
          else
            if __x122 == "%call" then
              return lower(__args9, hoist, stmt63, tail63)
            else
              if __x122 == "%set" then
                return lowerSet(__args9, hoist, stmt63, tail63)
              else
                if __x122 == "%if" then
                  return lowerIf(__args9, hoist, stmt63, tail63)
                else
                  if __x122 == "%try" then
                    return lowerTry(__args9, hoist, tail63)
                  else
                    if __x122 == "while" then
                      return lowerWhile(__args9, hoist)
                    else
                      if __x122 == "%for" then
                        return lowerFor(__args9, hoist)
                      else
                        if __x122 == "%function" then
                          return lowerFunction(__args9)
                        else
                          if __x122 == "%local-function" or __x122 == "%global-function" then
                            return lowerDefinition(__x122, __args9, hoist)
                          else
                            if in63(__x122, {"and", "or"}) then
                              return lowerShort(__x122, __args9, hoist)
                            else
                              if statement63(__x122) then
                                return lowerSpecial(form, hoist)
                              else
                                return lowerCall(form, hoist)
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
  end
end
function expand(form)
  return lower(macroexpand(form))
end
local load1 = loadstring or load
local function run(code)
  local f,e = load1(code)
  if f then
    return f()
  else
    error(e .. " in " .. code)
  end
end
_37result = nil
function _eval(form)
  local __previous = target
  target = "lua"
  local __code = compile(expand({"set", "%result", form}))
  target = __previous
  run(__code)
  return _37result
end
function immediateCall63(x)
  return obj63(x) and obj63(hd(x)) and hd(hd(x)) == "%function"
end
setenv("do", {_stash = true, special = function (...)
  local __forms1 = unstash({...})
  local __s5 = ""
  local ____x128 = __forms1
  local ____i19 = 0
  while ____i19 < _35(____x128) do
    local __x129 = ____x128[____i19 + 1]
    if target == "lua" and immediateCall63(__x129) and "\n" == char(__s5, edge(__s5)) then
      __s5 = clip(__s5, 0, edge(__s5)) .. ";\n"
    end
    __s5 = __s5 .. compile(__x129, {_stash = true, stmt = true})
    if not atom63(__x129) then
      if hd(__x129) == "return" or hd(__x129) == "break" then
        break
      end
    end
    ____i19 = ____i19 + 1
  end
  return __s5
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local __cond2 = compile(cond)
  indentLevel = indentLevel + 1
  local ____x132 = compile(cons, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __cons1 = ____x132
  local __e49
  if alt then
    indentLevel = indentLevel + 1
    local ____x133 = compile(alt, {_stash = true, stmt = true})
    indentLevel = indentLevel - 1
    __e49 = ____x133
  end
  local __alt1 = __e49
  local __ind3 = indentation()
  local __s7 = ""
  if target == "js" then
    __s7 = __s7 .. __ind3 .. "if (" .. __cond2 .. ") {\n" .. __cons1 .. __ind3 .. "}"
  else
    __s7 = __s7 .. __ind3 .. "if " .. __cond2 .. " then\n" .. __cons1
  end
  if __alt1 and target == "js" then
    __s7 = __s7 .. " else {\n" .. __alt1 .. __ind3 .. "}"
  else
    if __alt1 then
      __s7 = __s7 .. __ind3 .. "else\n" .. __alt1
    end
  end
  if target == "lua" then
    return __s7 .. __ind3 .. "end\n"
  else
    return __s7 .. "\n"
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local __cond4 = compile(cond)
  indentLevel = indentLevel + 1
  local ____x135 = compile(form, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __body10 = ____x135
  local __ind5 = indentation()
  if target == "js" then
    return __ind5 .. "while (" .. __cond4 .. ") {\n" .. __body10 .. __ind5 .. "}\n"
  else
    return __ind5 .. "while " .. __cond4 .. " do\n" .. __body10 .. __ind5 .. "end\n"
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local __t2 = compile(t)
  local __ind7 = indentation()
  indentLevel = indentLevel + 1
  local ____x137 = compile(form, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __body12 = ____x137
  if target == "lua" then
    return __ind7 .. "for " .. k .. " in next, " .. __t2 .. " do\n" .. __body12 .. __ind7 .. "end\n"
  else
    return __ind7 .. "for (" .. k .. " in " .. __t2 .. ") {\n" .. __body12 .. __ind7 .. "}\n"
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __e8 = unique("e")
  local __ind9 = indentation()
  indentLevel = indentLevel + 1
  local ____x142 = compile(form, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __body14 = ____x142
  local __hf1 = {"return", {"%array", false, __e8}}
  indentLevel = indentLevel + 1
  local ____x145 = compile(__hf1, {_stash = true, stmt = true})
  indentLevel = indentLevel - 1
  local __h1 = ____x145
  return __ind9 .. "try {\n" .. __body14 .. __ind9 .. "}\n" .. __ind9 .. "catch (" .. __e8 .. ") {\n" .. __h1 .. __ind9 .. "}\n"
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  return indentation() .. "delete " .. compile(place)
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return indentation() .. "break"
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return compileFunction(args, body)
end})
setenv("%global-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x149 = compileFunction(args, body, {_stash = true, name = name})
    return indentation() .. __x149
  else
    return compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x155 = compileFunction(args, body, {_stash = true, name = name, prefix = "local"})
    return indentation() .. __x155
  else
    return compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e50
  if nil63(x) then
    __e50 = "return"
  else
    __e50 = "return " .. compile(x)
  end
  local __x159 = __e50
  return indentation() .. __x159
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return "new " .. compile(x)
end})
setenv("typeof", {_stash = true, special = function (x)
  return "typeof(" .. compile(x) .. ")"
end})
setenv("error", {_stash = true, special = function (x)
  local __e51
  if target == "js" then
    __e51 = "throw " .. compile({"new", {"Error", x}})
  else
    __e51 = "error(" .. compile(x) .. ")"
  end
  local __e12 = __e51
  return indentation() .. __e12
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local __id30 = compile(name)
  local __value11 = compile(value)
  local __e52
  if is63(value) then
    __e52 = " = " .. __value11
  else
    __e52 = ""
  end
  local __rh2 = __e52
  local __e53
  if target == "js" then
    __e53 = "var "
  else
    __e53 = "local "
  end
  local __keyword1 = __e53
  local __ind11 = indentation()
  return __ind11 .. __keyword1 .. __id30 .. __rh2
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh2 = compile(lh)
  local __e54
  if nil63(rh) then
    __e54 = "nil"
  else
    __e54 = rh
  end
  local __rh4 = compile(__e54)
  return indentation() .. __lh2 .. " = " .. __rh4
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k12 = compile(k)
  if target == "lua" and char(__t12, 0) == "{" or infixOperator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if stringLiteral63(k) and validId63(inner(k)) then
    return __t12 .. "." .. inner(k)
  else
    return __t12 .. "[" .. __k12 .. "]"
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local __forms3 = unstash({...})
  local __e55
  if target == "lua" then
    __e55 = "{"
  else
    __e55 = "["
  end
  local __open1 = __e55
  local __e56
  if target == "lua" then
    __e56 = "}"
  else
    __e56 = "]"
  end
  local __close1 = __e56
  local __s9 = ""
  local __c7 = ""
  local ____o10 = __forms3
  local __k10 = nil
  for __k10 in next, ____o10 do
    local __v9 = ____o10[__k10]
    if number63(__k10) then
      __s9 = __s9 .. __c7 .. compile(__v9)
      __c7 = ", "
    end
  end
  return __open1 .. __s9 .. __close1
end})
setenv("%object", {_stash = true, special = function (...)
  local __forms5 = unstash({...})
  local __s111 = "{"
  local __c9 = ""
  local __e57
  if target == "lua" then
    __e57 = " = "
  else
    __e57 = ": "
  end
  local __sep1 = __e57
  local ____o12 = pair(__forms5)
  local __k14 = nil
  for __k14 in next, ____o12 do
    local __v12 = ____o12[__k14]
    if number63(__k14) then
      local ____id32 = __v12
      local __k15 = ____id32[1]
      local __v13 = ____id32[2]
      if not string63(__k15) then
        error("Illegal key: " .. str(__k15))
      end
      __s111 = __s111 .. __c9 .. key(__k15) .. __sep1 .. compile(__v13)
      __c9 = ", "
    end
  end
  return __s111 .. "}"
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args111 = unstash({...})
  return apply(cat, map(compile, __args111))
end})
return {run = run, ["eval"] = _eval, expand = expand, compile = compile}
