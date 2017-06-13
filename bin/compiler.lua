local reader = require("reader")
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
        return(__e21)
      else
        __i = __i - 1
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
  return(not atom63(form) and special63(hd(form)))
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
  return(is63(getenv(k, "variable")))
end
function bound63(x)
  return(macro63(x) or special63(x) or symbol63(x) or variable63(x))
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
    return(join(args, {__l}))
  else
    return(args)
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
  return(k)
end
function bind(lh, rh)
  if atom63(lh) then
    return({lh, rh})
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
    return(__bs)
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return({{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", from})
end})
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1.rest = true
    if target == "js" then
      return({"unstash", {"arguments%", _35(__args1)}})
    else
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({__args1, join({"let", {args, rest()}}, body)})
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
          local __x30 = unique("x")
          add(__args1, __x30)
          __bs1 = join(__bs1, {__v2, __x30})
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
    return({__args1, join({"let", __bs1}, body)})
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
  return(can_unquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing")
end
local function expand_macro(form)
  return(expand1(form, true))
end
function expand1(__x38, expand63)
  local ____id1 = __x38
  local __name = ____id1[1]
  local __body = cut(____id1, 1)
  local ____id2 = getenv(__name)
  local __macro = ____id2.macro
  local __once = ____id2.once
  local __form = apply(__macro, __body)
  if expand63 then
    if not __once then
      __form = macroexpand(__form)
    end
  end
  return(__form)
end
function macroexpand(form)
  if symbol63(form) then
    return(macroexpand(symbol_expansion(form)))
  else
    if atom63(form) then
      return(form)
    else
      local __x39 = hd(form)
      if macro63(__x39) then
        return(expand_macro(form))
      else
        return(map(macroexpand, form))
      end
    end
  end
end
local function quasiquote_list(form, depth)
  local __xs = {{"list"}}
  local ____o3 = form
  local __k4 = nil
  for __k4 in next, ____o3 do
    local __v4 = ____o3[__k4]
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
  local ____x42 = form
  local ____i6 = 0
  while ____i6 < _35(____x42) do
    local __x43 = ____x42[____i6 + 1]
    if quasisplice63(__x43, depth) then
      local __x44 = quasiexpand(__x43[2])
      add(__xs, __x44)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x43, depth))
    end
    ____i6 = ____i6 + 1
  end
  local __pruned = keep(function (x)
    return(_35(x) > 1 or not( hd(x) == "list") or keys63(x))
  end, __xs)
  if one63(__pruned) then
    return(hd(__pruned))
  else
    return(join({"join"}, __pruned))
  end
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
function expand_if(__x48)
  local ____id3 = __x48
  local __a = ____id3[1]
  local __b1 = ____id3[2]
  local __c = cut(____id3, 2)
  if is63(__b1) then
    return({join({"%if", __a, __b1}, expand_if(__c))})
  else
    if is63(__a) then
      return({__a})
    end
  end
end
indent_level = 0
function indentation()
  local __s = ""
  local __i7 = 0
  while __i7 < indent_level do
    __s = __s .. "  "
    __i7 = __i7 + 1
  end
  return(__s)
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return(has63(reserved, x))
end
local function valid_code63(n)
  return(number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
end
local function id(id)
  local __e25
  if number_code63(code(id, 0)) then
    __e25 = "_"
  else
    __e25 = ""
  end
  local __id11 = __e25
  local __i8 = 0
  while __i8 < _35(id) do
    local __c1 = char(id, __i8)
    local __n5 = code(__c1)
    local __e26
    if __c1 == "-" and not( id == "-") then
      __e26 = "_"
    else
      local __e27
      if valid_code63(__n5) then
        __e27 = __c1
      else
        local __e28
        if __i8 == 0 then
          __e28 = "_" .. __n5
        else
          __e28 = __n5
        end
        __e27 = __e28
      end
      __e26 = __e27
    end
    local __c11 = __e26
    __id11 = __id11 .. __c11
    __i8 = __i8 + 1
  end
  if reserved63(__id11) then
    return("_" .. __id11)
  else
    return(__id11)
  end
end
function valid_id63(x)
  return(some63(x) and x == id(x))
end
local __names = {}
function unique(x)
  local __x52 = id(x)
  if __names[__x52] then
    local __i9 = __names[__x52]
    __names[__x52] = __names[__x52] + 1
    return(unique(__x52 .. __i9))
  else
    __names[__x52] = 1
    return("__" .. __x52)
  end
end
function key(k)
  local __i10 = inner(k)
  if valid_id63(__i10) then
    return(__i10)
  else
    if target == "js" then
      return(k)
    else
      return("[" .. k .. "]")
    end
  end
end
function mapo(f, t)
  local __o4 = {}
  local ____o5 = t
  local __k5 = nil
  for __k5 in next, ____o5 do
    local __v6 = ____o5[__k5]
    local __x53 = f(__v6)
    if is63(__x53) then
      add(__o4, literal(__k5))
      add(__o4, __x53)
    end
  end
  return(__o4)
end
local ____x55 = {}
local ____x56 = {}
____x56.js = "!"
____x56.lua = "not"
____x55["not"] = ____x56
local ____x57 = {}
____x57["*"] = true
____x57["/"] = true
____x57["%"] = true
local ____x58 = {}
local ____x59 = {}
____x59.js = "+"
____x59.lua = ".."
____x58.cat = ____x59
local ____x60 = {}
____x60["+"] = true
____x60["-"] = true
local ____x61 = {}
____x61["<"] = true
____x61[">"] = true
____x61["<="] = true
____x61[">="] = true
local ____x62 = {}
local ____x63 = {}
____x63.js = "==="
____x63.lua = "=="
____x62["="] = ____x63
local ____x64 = {}
local ____x65 = {}
____x65.js = "&&"
____x65.lua = "and"
____x64["and"] = ____x65
local ____x66 = {}
local ____x67 = {}
____x67.js = "||"
____x67.lua = "or"
____x66["or"] = ____x67
local infix = {____x55, ____x57, ____x58, ____x60, ____x61, ____x62, ____x64, ____x66}
local function unary63(form)
  return(two63(form) and in63(hd(form), {"not", "-"}))
end
local function index(k)
  if number63(k) then
    return(k - 1)
  end
end
local function precedence(form)
  if not( atom63(form) or unary63(form)) then
    local ____o6 = infix
    local __k6 = nil
    for __k6 in next, ____o6 do
      local __v7 = ____o6[__k6]
      if __v7[hd(form)] then
        return(index(__k6))
      end
    end
  end
  return(0)
end
local function getop(op)
  return(find(function (level)
    local __x69 = level[op]
    if __x69 == true then
      return(op)
    else
      if is63(__x69) then
        return(__x69[target])
      end
    end
  end, infix))
end
local function infix63(x)
  return(is63(getop(x)))
end
function infix_operator63(x)
  return(obj63(x) and infix63(hd(x)))
end
local function compile_args(args)
  local __s1 = "("
  local __c2 = ""
  local ____x70 = args
  local ____i13 = 0
  while ____i13 < _35(____x70) do
    local __x71 = ____x70[____i13 + 1]
    __s1 = __s1 .. __c2 .. compile(__x71)
    __c2 = ", "
    ____i13 = ____i13 + 1
  end
  return(__s1 .. ")")
end
local function escape_newlines(s)
  local __s11 = ""
  local __i14 = 0
  while __i14 < _35(s) do
    local __c3 = char(s, __i14)
    local __e29
    if __c3 == "\n" then
      __e29 = "\\n"
    else
      local __e30
      if __c3 == "\r" then
        __e30 = "\\r"
      else
        __e30 = __c3
      end
      __e29 = __e30
    end
    __s11 = __s11 .. __e29
    __i14 = __i14 + 1
  end
  return(__s11)
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
              if nan63(x) then
                return("nan")
              else
                if x == inf then
                  return("inf")
                else
                  if x == _inf then
                    return("-inf")
                  else
                    if number63(x) then
                      return(x .. "")
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
  local ____id4 = form
  local __x72 = ____id4[1]
  local __args = cut(____id4, 1)
  local ____id5 = getenv(__x72)
  local __special = ____id5.special
  local __stmt = ____id5.stmt
  local __self_tr63 = ____id5.tr
  local __tr = terminator(stmt63 and not __self_tr63)
  return(apply(__special, __args) .. __tr)
end
local function parenthesize_call63(x)
  return(not atom63(x) and hd(x) == "%function" or precedence(x) > 0)
end
local function compile_call(form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args11 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f) then
    return("(" .. __f1 .. ")" .. __args11)
  else
    return(__f1 .. __args11)
  end
end
local function op_delims(parent, child, ...)
  local ____r54 = unstash({...})
  local __parent = destash33(parent, ____r54)
  local __child = destash33(child, ____r54)
  local ____id6 = ____r54
  local __right = ____id6.right
  local __e31
  if __right then
    __e31 = _6261
  else
    __e31 = _62
  end
  if __e31(precedence(__child), precedence(__parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local ____id7 = form
  local __op = ____id7[1]
  local ____id8 = cut(____id7, 1)
  local __a1 = ____id8[1]
  local __b2 = ____id8[2]
  local ____id9 = op_delims(form, __a1)
  local __ao = ____id9[1]
  local __ac = ____id9[2]
  local ____id10 = op_delims(form, __b2, {_stash = true, right = true})
  local __bo = ____id10[1]
  local __bc = ____id10[2]
  local __a2 = compile(__a1)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return(__op1 .. __ao .. " " .. __a2 .. __ac)
  else
    return(__ao .. __a2 .. __ac .. " " .. __op1 .. " " .. __bo .. __b3 .. __bc)
  end
end
function compile_function(args, body, ...)
  local ____r56 = unstash({...})
  local __args2 = destash33(args, ____r56)
  local __body1 = destash33(body, ____r56)
  local ____id111 = ____r56
  local __name1 = ____id111.name
  local __prefix = ____id111.prefix
  local __e32
  if __name1 then
    __e32 = compile(__name1)
  else
    __e32 = ""
  end
  local __id12 = __e32
  local __e33
  if target == "lua" and __args2.rest then
    __e33 = join(__args2, {"|...|"})
  else
    __e33 = __args2
  end
  local __args12 = __e33
  local __args3 = compile_args(__args12)
  indent_level = indent_level + 1
  local ____x78 = compile(__body1, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body2 = ____x78
  local __ind = indentation()
  local __e34
  if __prefix then
    __e34 = __prefix .. " "
  else
    __e34 = ""
  end
  local __p = __e34
  local __e35
  if target == "js" then
    __e35 = ""
  else
    __e35 = "end"
  end
  local __tr1 = __e35
  if __name1 then
    __tr1 = __tr1 .. "\n"
  end
  if target == "js" then
    return("function " .. __id12 .. __args3 .. " {\n" .. __body2 .. __ind .. "}" .. __tr1)
  else
    return(__p .. "function " .. __id12 .. __args3 .. "\n" .. __body2 .. __ind .. __tr1)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local ____r58 = unstash({...})
  local __form1 = destash33(form, ____r58)
  local ____id13 = ____r58
  local __stmt1 = ____id13.stmt
  if nil63(__form1) then
    return("")
  else
    if special_form63(__form1) then
      return(compile_special(__form1, __stmt1))
    else
      local __tr2 = terminator(__stmt1)
      local __e36
      if __stmt1 then
        __e36 = indentation()
      else
        __e36 = ""
      end
      local __ind1 = __e36
      local __e37
      if atom63(__form1) then
        __e37 = compile_atom(__form1)
      else
        local __e38
        if infix63(hd(__form1)) then
          __e38 = compile_infix(__form1)
        else
          __e38 = compile_call(__form1)
        end
        __e37 = __e38
      end
      local __form2 = __e37
      return(__ind1 .. __form2 .. __tr2)
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e39
  if some63(__hoist) and is63(__e) then
    __e39 = join({"do"}, __hoist, {__e})
  else
    local __e40
    if is63(__e) then
      __e40 = __e
    else
      local __e41
      if _35(__hoist) > 1 then
        __e41 = join({"do"}, __hoist)
      else
        __e41 = hd(__hoist)
      end
      __e40 = __e41
    end
    __e39 = __e40
  end
  return(either(__e39, {"do"}))
end
local function lower_body(body, tail63)
  return(lower_statement(join({"do"}, body), tail63))
end
local function literal63(form)
  return(atom63(form) or hd(form) == "%array" or hd(form) == "%object")
end
local function standalone63(form)
  return(not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form))
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x85 = almost(args)
  local ____i15 = 0
  while ____i15 < _35(____x85) do
    local __x86 = ____x85[____i15 + 1]
    local ____y = lower(__x86, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i15 = ____i15 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2) then
    return({"return", __e2})
  else
    return(__e2)
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local ____id14 = args
  local __lh = ____id14[1]
  local __rh = ____id14[2]
  add(hoist, {"%set", lower(__lh, hoist), lower(__rh, hoist)})
  if not( stmt63 and not tail63) then
    return(__lh)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id15 = args
  local __cond = ____id15[1]
  local ___then = ____id15[2]
  local ___else = ____id15[3]
  if stmt63 then
    local __e43
    if is63(___else) then
      __e43 = {lower_body({___else}, tail63)}
    end
    return(add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e43)))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3})
    local __e42
    if is63(___else) then
      __e42 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e42))
    return(__e3)
  end
end
local function lower_short(x, args, hoist)
  local ____id16 = args
  local __a3 = ____id16[1]
  local __b4 = ____id16[2]
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id17 = unique("id")
    local __e44
    if x == "and" then
      __e44 = {"%if", __id17, __b4, __id17}
    else
      __e44 = {"%if", __id17, __id17, __b4}
    end
    return(lower({"do", {"%local", __id17, __a3}, __e44}, hoist))
  else
    return({x, lower(__a3, hoist), __b11})
  end
end
local function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
local function lower_while(args, hoist)
  local ____id18 = args
  local __c4 = ____id18[1]
  local __body3 = cut(____id18, 1)
  local __pre = {}
  local __c5 = lower(__c4, __pre)
  local __e45
  if none63(__pre) then
    __e45 = {"while", __c5, lower_body(__body3)}
  else
    __e45 = {"while", true, join({"do"}, __pre, {{"%if", {"not", __c5}, {"break"}}, lower_body(__body3)})}
  end
  return(add(hoist, __e45))
end
local function lower_for(args, hoist)
  local ____id19 = args
  local __t = ____id19[1]
  local __k7 = ____id19[2]
  local __body4 = cut(____id19, 2)
  return(add(hoist, {"%for", lower(__t, hoist), __k7, lower_body(__body4)}))
end
local function lower_function(args)
  local ____id20 = args
  local __a4 = ____id20[1]
  local __body5 = cut(____id20, 1)
  return({"%function", __a4, lower_body(__body5, true)})
end
local function lower_definition(kind, args, hoist)
  local ____id21 = args
  local __name2 = ____id21[1]
  local __args4 = ____id21[2]
  local __body6 = cut(____id21, 2)
  return(add(hoist, {kind, __name2, __args4, lower_body(__body6, true)}))
end
local function lower_call(form, hoist)
  local __form3 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(__form3) then
    return(__form3)
  end
end
local function pairwise63(form)
  return(in63(hd(form), {"<", "<=", "=", ">=", ">"}))
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e4 = {}
    local ____id22 = form
    local __x115 = ____id22[1]
    local __args5 = cut(____id22, 1)
    reduce(function (a, b)
      add(__e4, {__x115, a, b})
      return(a)
    end, __args5)
    return(join({"and"}, reverse(__e4)))
  else
    return(form)
  end
end
local function lower_infix63(form)
  return(infix63(hd(form)) and _35(form) > 3)
end
local function lower_infix(form, hoist)
  local __form4 = lower_pairwise(form)
  local ____id23 = __form4
  local __x118 = ____id23[1]
  local __args6 = cut(____id23, 1)
  return(lower(reduce(function (a, b)
    return({__x118, b, a})
  end, reverse(__args6)), hoist))
end
local function lower_special(form, hoist)
  local __e5 = lower_call(form, hoist)
  if __e5 then
    return(add(hoist, __e5))
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
          local ____id24 = form
          local __x121 = ____id24[1]
          local __args7 = cut(____id24, 1)
          if __x121 == "do" then
            return(lower_do(__args7, hoist, stmt63, tail63))
          else
            if __x121 == "%set" then
              return(lower_set(__args7, hoist, stmt63, tail63))
            else
              if __x121 == "%if" then
                return(lower_if(__args7, hoist, stmt63, tail63))
              else
                if __x121 == "%try" then
                  return(lower_try(__args7, hoist, tail63))
                else
                  if __x121 == "while" then
                    return(lower_while(__args7, hoist))
                  else
                    if __x121 == "%for" then
                      return(lower_for(__args7, hoist))
                    else
                      if __x121 == "%function" then
                        return(lower_function(__args7))
                      else
                        if __x121 == "%local-function" or __x121 == "%global-function" then
                          return(lower_definition(__x121, __args7, hoist))
                        else
                          if in63(__x121, {"and", "or"}) then
                            return(lower_short(__x121, __args7, hoist))
                          else
                            if statement63(__x121) then
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
end
function expand(form)
  return(lower(macroexpand(form)))
end
local load1 = loadstring or load
local function run(code)
  local f,e = load1(code)
  if f then
    return(f())
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
  return(_37result)
end
function immediate_call63(x)
  return(obj63(x) and obj63(hd(x)) and hd(hd(x)) == "%function")
end
setenv("do", {_stash = true, special = function (...)
  local __forms1 = unstash({...})
  local __s3 = ""
  local ____x127 = __forms1
  local ____i17 = 0
  while ____i17 < _35(____x127) do
    local __x128 = ____x127[____i17 + 1]
    if target == "lua" and immediate_call63(__x128) and "\n" == char(__s3, edge(__s3)) then
      __s3 = clip(__s3, 0, edge(__s3)) .. ";\n"
    end
    __s3 = __s3 .. compile(__x128, {_stash = true, stmt = true})
    if not atom63(__x128) then
      if hd(__x128) == "return" or hd(__x128) == "break" then
        break
      end
    end
    ____i17 = ____i17 + 1
  end
  return(__s3)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local __cond2 = compile(cond)
  indent_level = indent_level + 1
  local ____x131 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __cons1 = ____x131
  local __e46
  if alt then
    indent_level = indent_level + 1
    local ____x132 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    __e46 = ____x132
  end
  local __alt1 = __e46
  local __ind3 = indentation()
  local __s5 = ""
  if target == "js" then
    __s5 = __s5 .. __ind3 .. "if (" .. __cond2 .. ") {\n" .. __cons1 .. __ind3 .. "}"
  else
    __s5 = __s5 .. __ind3 .. "if " .. __cond2 .. " then\n" .. __cons1
  end
  if __alt1 and target == "js" then
    __s5 = __s5 .. " else {\n" .. __alt1 .. __ind3 .. "}"
  else
    if __alt1 then
      __s5 = __s5 .. __ind3 .. "else\n" .. __alt1
    end
  end
  if target == "lua" then
    return(__s5 .. __ind3 .. "end\n")
  else
    return(__s5 .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local __cond4 = compile(cond)
  indent_level = indent_level + 1
  local ____x134 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body8 = ____x134
  local __ind5 = indentation()
  if target == "js" then
    return(__ind5 .. "while (" .. __cond4 .. ") {\n" .. __body8 .. __ind5 .. "}\n")
  else
    return(__ind5 .. "while " .. __cond4 .. " do\n" .. __body8 .. __ind5 .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local __t2 = compile(t)
  local __ind7 = indentation()
  indent_level = indent_level + 1
  local ____x136 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body10 = ____x136
  if target == "lua" then
    return(__ind7 .. "for " .. k .. " in next, " .. __t2 .. " do\n" .. __body10 .. __ind7 .. "end\n")
  else
    return(__ind7 .. "for (" .. k .. " in " .. __t2 .. ") {\n" .. __body10 .. __ind7 .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __e8 = unique("e")
  local __ind9 = indentation()
  indent_level = indent_level + 1
  local ____x141 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body12 = ____x141
  local __hf1 = {"return", {"%array", false, __e8}}
  indent_level = indent_level + 1
  local ____x144 = compile(__hf1, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __h1 = ____x144
  return(__ind9 .. "try {\n" .. __body12 .. __ind9 .. "}\n" .. __ind9 .. "catch (" .. __e8 .. ") {\n" .. __h1 .. __ind9 .. "}\n")
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
    local __x148 = compile_function(args, body, {_stash = true, name = name})
    return(indentation() .. __x148)
  else
    return(compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x154 = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return(indentation() .. __x154)
  else
    return(compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e47
  if nil63(x) then
    __e47 = "return"
  else
    __e47 = "return(" .. compile(x) .. ")"
  end
  local __x158 = __e47
  return(indentation() .. __x158)
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return("new " .. compile(x))
end})
setenv("typeof", {_stash = true, special = function (x)
  return("typeof(" .. compile(x) .. ")")
end})
setenv("error", {_stash = true, special = function (x)
  local __e48
  if target == "js" then
    __e48 = "throw " .. compile({"new", {"Error", x}})
  else
    __e48 = "error(" .. compile(x) .. ")"
  end
  local __e12 = __e48
  return(indentation() .. __e12)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local __id26 = compile(name)
  local __value11 = compile(value)
  local __e49
  if is63(value) then
    __e49 = " = " .. __value11
  else
    __e49 = ""
  end
  local __rh2 = __e49
  local __e50
  if target == "js" then
    __e50 = "var "
  else
    __e50 = "local "
  end
  local __keyword1 = __e50
  local __ind11 = indentation()
  return(__ind11 .. __keyword1 .. __id26 .. __rh2)
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh2 = compile(lh)
  local __e51
  if nil63(rh) then
    __e51 = "nil"
  else
    __e51 = rh
  end
  local __rh4 = compile(__e51)
  return(indentation() .. __lh2 .. " = " .. __rh4)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k12 = compile(k)
  if target == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(__t12 .. "." .. inner(k))
  else
    return(__t12 .. "[" .. __k12 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local __forms3 = unstash({...})
  local __e52
  if target == "lua" then
    __e52 = "{"
  else
    __e52 = "["
  end
  local __open1 = __e52
  local __e53
  if target == "lua" then
    __e53 = "}"
  else
    __e53 = "]"
  end
  local __close1 = __e53
  local __s7 = ""
  local __c7 = ""
  local ____o8 = __forms3
  local __k10 = nil
  for __k10 in next, ____o8 do
    local __v9 = ____o8[__k10]
    if number63(__k10) then
      __s7 = __s7 .. __c7 .. compile(__v9)
      __c7 = ", "
    end
  end
  return(__open1 .. __s7 .. __close1)
end})
setenv("%object", {_stash = true, special = function (...)
  local __forms5 = unstash({...})
  local __s9 = "{"
  local __c9 = ""
  local __e54
  if target == "lua" then
    __e54 = " = "
  else
    __e54 = ": "
  end
  local __sep1 = __e54
  local ____o10 = pair(__forms5)
  local __k14 = nil
  for __k14 in next, ____o10 do
    local __v12 = ____o10[__k14]
    if number63(__k14) then
      local ____id28 = __v12
      local __k15 = ____id28[1]
      local __v13 = ____id28[2]
      if not string63(__k15) then
        error("Illegal key: " .. str(__k15))
      end
      __s9 = __s9 .. __c9 .. key(__k15) .. __sep1 .. compile(__v13)
      __c9 = ", "
    end
  end
  return(__s9 .. "}")
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args9 = unstash({...})
  return(apply(cat, map(compile, __args9)))
end})
return({run = run, ["eval"] = _eval, expand = expand, compile = compile})
