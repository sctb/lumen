local function getenv(k, p, env)
  local __env = env or get_environment()
  if string63(k) then
    local __i = edge(__env)
    while __i >= 0 do
      local __b = __env[__i + 1][k]
      if is63(__b) then
        local __e29
        if p then
          __e29 = __b[p]
        else
          __e29 = __b
        end
        return __e29
      else
        __i = __i - 1
      end
    end
  end
end
local function macro_function(k)
  return getenv(k, "macro")
end
local function macro63(k)
  return is63(macro_function(k))
end
local function special63(k)
  return is63(getenv(k, "special"))
end
local function special_form63(form)
  return not atom63(form) and special63(hd(form))
end
local function statement63(k)
  return special63(k) and getenv(k, "stmt")
end
local function symbol_expansion(k)
  return getenv(k, "symbol")
end
local function symbol63(k)
  return is63(symbol_expansion(k))
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
function literal(s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)
  end
end
local function stash42(args)
  if keys63(args) then
    local __l = {"%stash"}
    local ____o = args
    local __k = nil
    for __k in next, ____o do
      local __v = ____o[__k]
      if not number63(__k) then
        add(__l, {literal(__k), __v})
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
      local __e30
      if __k1 == "rest" then
        __e30 = {"cut", __id, _35(lh)}
      else
        __e30 = {"get", __id, {"quote", bias(__k1)}}
      end
      local __x6 = __e30
      if is63(__k1) then
        local __e31
        if __v1 == true then
          __e31 = __k1
        else
          __e31 = __v1
        end
        local __k2 = __e31
        __bs = join(__bs, bind(__k2, __x6))
      end
    end
    return __bs
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", from}
end})
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1["rest"] = true
    if target == "js" then
      return {"unstash", {"arguments%", _35(__args1)}}
    else
      if target == "r" then
        return {"list", "|...|"}
      else
        return {"unstash", {"list", "|...|"}}
      end
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
          local __x32 = unique("x")
          add(__args1, __x32)
          __bs1 = join(__bs1, {__v2, __x32})
        end
      end
    end
    if keys63(args) then
      __bs1 = join(__bs1, {__r19, rest()})
      if not( target == "r") then
        local __n3 = _35(__args1)
        local __i4 = 0
        while __i4 < __n3 do
          local __v3 = __args1[__i4 + 1]
          __bs1 = join(__bs1, {__v3, {"destash!", __v3, __r19}})
          __i4 = __i4 + 1
        end
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
local function can_unquote63(depth)
  return quoting63(depth) and depth == 1
end
local function quasisplice63(x, depth)
  return can_unquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing"
end
local function expand_local(__x40)
  local ____id1 = __x40
  local __x41 = ____id1[1]
  local __name = ____id1[2]
  local __value = ____id1[3]
  setenv(__name, {_stash = true, variable = true})
  return {"%local", __name, macroexpand(__value)}
end
local function expand_function(__x43)
  local ____id2 = __x43
  local __x44 = ____id2[1]
  local __args = ____id2[2]
  local __body = cut(____id2, 2)
  add(get_environment(), {})
  local ____o3 = __args
  local ____i5 = nil
  for ____i5 in next, ____o3 do
    local ____x45 = ____o3[____i5]
    setenv(____x45, {_stash = true, variable = true})
  end
  local ____x46 = join({"%function", __args}, macroexpand(__body))
  drop(get_environment())
  return ____x46
end
local function expand_definition(__x48)
  local ____id3 = __x48
  local __x49 = ____id3[1]
  local __name1 = ____id3[2]
  local __args11 = ____id3[3]
  local __body1 = cut(____id3, 3)
  add(get_environment(), {})
  local ____o4 = __args11
  local ____i6 = nil
  for ____i6 in next, ____o4 do
    local ____x50 = ____o4[____i6]
    setenv(____x50, {_stash = true, variable = true})
  end
  local ____x51 = join({__x49, __name1, __args11}, macroexpand(__body1))
  drop(get_environment())
  return ____x51
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x53)
  local ____id4 = __x53
  local __name2 = ____id4[1]
  local __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
end
function macroexpand(form)
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    if atom63(form) then
      return form
    else
      local __x54 = hd(form)
      if __x54 == "%local" then
        return expand_local(form)
      else
        if __x54 == "%function" then
          return expand_function(form)
        else
          if __x54 == "%global-function" then
            return expand_definition(form)
          else
            if __x54 == "%local-function" then
              return expand_definition(form)
            else
              if macro63(__x54) then
                return expand_macro(form)
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
local function quasiquote_list(form, depth)
  local __xs = {{"list"}}
  local ____o5 = form
  local __k4 = nil
  for __k4 in next, ____o5 do
    local __v4 = ____o5[__k4]
    if not number63(__k4) then
      local __e32
      if quasisplice63(__v4, depth) then
        __e32 = quasiexpand(__v4[2])
      else
        __e32 = quasiexpand(__v4, depth)
      end
      local __v5 = __e32
      last(__xs)[__k4] = __v5
    end
  end
  local ____x57 = form
  local ____i8 = 0
  while ____i8 < _35(____x57) do
    local __x58 = ____x57[____i8 + 1]
    if quasisplice63(__x58, depth) then
      local __x59 = quasiexpand(__x58[2])
      add(__xs, __x59)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x58, depth))
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
      if can_unquote63(depth) and hd(form) == "unquote" then
        return quasiexpand(form[2])
      else
        if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
          return quasiquote_list(form, depth - 1)
        else
          if hd(form) == "quasiquote" then
            return quasiquote_list(form, depth + 1)
          else
            return quasiquote_list(form, depth)
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
function expand_if(__x63)
  local ____id5 = __x63
  local __a = ____id5[1]
  local __b1 = ____id5[2]
  local __c = cut(____id5, 2)
  if is63(__b1) then
    return {join({"%if", __a, __b1}, expand_if(__c))}
  else
    if is63(__a) then
      return {__a}
    end
  end
end
indent_level = 0
function indentation()
  local __s = ""
  local __i9 = 0
  while __i9 < indent_level do
    __s = __s .. "  "
    __i9 = __i9 + 1
  end
  return __s
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return has63(reserved, x)
end
local function valid_code63(n)
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
end
local accessor_prefix = {["."] = true, ["@"] = true, ["$"] = true, ["\\"] = true, [":"] = true}
function accessor_id63(x)
  return string63(x) and accessor_prefix[char(x, 0)] and some63(char(x, 1)) and not accessor_prefix[char(x, 1)]
end
local function prefix(id)
  if target == "r" then
    return "V" .. id
  else
    return id
  end
end
function compile_id(id, raw63)
  local __e33
  if raw63 then
    __e33 = id
  else
    local __e34
    if accessor_id63(id) then
      __e34 = clip(id, 1)
    else
      __e34 = id
    end
    __e33 = __e34
  end
  local __id0 = __e33
  local __e35
  if raw63 then
    __e35 = ""
  else
    local __e36
    if number_code63(code(__id0, 0)) then
      __e36 = prefix("_")
    else
      __e36 = ""
    end
    __e35 = __e36
  end
  local __id11 = __e35
  local __i10 = 0
  while __i10 < _35(__id0) do
    local __c1 = char(__id0, __i10)
    local __n7 = code(__c1)
    local __e37
    if __c1 == "-" and not( __id0 == "-") then
      __e37 = "_"
    else
      local __e38
      if valid_code63(__n7) then
        __e38 = __c1
      else
        local __e39
        if __i10 == 0 then
          __e39 = prefix("_") .. __n7
        else
          __e39 = __n7
        end
        __e38 = __e39
      end
      __e37 = __e38
    end
    local __c11 = __e37
    __id11 = __id11 .. __c11
    __i10 = __i10 + 1
  end
  local __e40
  if reserved63(__id11) then
    __e40 = prefix("_") .. __id11
  else
    __e40 = __id11
  end
  local __id21 = __e40
  if id == __id0 then
    return __id21
  else
    return char(id, 0) .. __id21
  end
end
function valid_id63(x)
  return some63(x) and x == compile_id(x, "raw")
end
local __names = {}
function unique(x)
  local __x67 = compile_id(x)
  if __names[__x67] then
    local __i11 = __names[__x67]
    __names[__x67] = __names[__x67] + 1
    return unique(__x67 .. __i11)
  else
    __names[__x67] = 1
    return prefix("__") .. __x67
  end
end
function key(k)
  local __i12 = inner(k)
  if valid_id63(__i12) then
    return __i12
  else
    if target == "js" then
      return k
    else
      if target == "r" then
        return k
      else
        return "[" .. k .. "]"
      end
    end
  end
end
function mapo(f, t)
  local __o6 = {}
  local ____o7 = t
  local __k5 = nil
  for __k5 in next, ____o7 do
    local __v6 = ____o7[__k5]
    local __x68 = f(__v6)
    if is63(__x68) then
      add(__o6, literal(__k5))
      add(__o6, __x68)
    end
  end
  return __o6
end
local ____x70 = {}
local ____x71 = {}
____x71["r"] = "!"
____x71["js"] = "!"
____x71["lua"] = "not"
____x70["not"] = ____x71
local ____x72 = {}
____x72["*"] = true
____x72["/"] = true
____x72["%"] = true
local ____x73 = {}
local ____x74 = {}
____x74["js"] = "+"
____x74["lua"] = ".."
____x73["cat"] = ____x74
local ____x75 = {}
____x75["+"] = true
____x75["-"] = true
local ____x76 = {}
____x76["<"] = true
____x76[">"] = true
____x76["<="] = true
____x76[">="] = true
local ____x77 = {}
local ____x78 = {}
____x78["r"] = "=="
____x78["js"] = "==="
____x78["lua"] = "=="
____x77["="] = ____x78
local ____x79 = {}
local ____x80 = {}
____x80["r"] = "&&"
____x80["js"] = "&&"
____x80["lua"] = "and"
____x79["and"] = ____x80
local ____x81 = {}
local ____x82 = {}
____x82["r"] = "||"
____x82["js"] = "||"
____x82["lua"] = "or"
____x81["or"] = ____x82
local infix = {____x70, ____x72, ____x73, ____x75, ____x76, ____x77, ____x79, ____x81}
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
    local __x84 = level[op]
    if __x84 == true then
      return op
    else
      if is63(__x84) then
        return __x84[target]
      end
    end
  end, infix)
end
local function infix63(x)
  return is63(getop(x))
end
function infix_operator63(x)
  return obj63(x) and infix63(hd(x))
end
function compile_args(args)
  local __s1 = "("
  local __c2 = ""
  local ____x85 = args
  local ____i15 = 0
  while ____i15 < _35(____x85) do
    local __x86 = ____x85[____i15 + 1]
    __s1 = __s1 .. __c2 .. compile(__x86)
    __c2 = ", "
    ____i15 = ____i15 + 1
  end
  return __s1 .. ")"
end
local function escape_newlines(s)
  local __s11 = ""
  local __i16 = 0
  while __i16 < _35(s) do
    local __c3 = char(s, __i16)
    local __e41
    if __c3 == "\n" then
      __e41 = "\\n"
    else
      local __e42
      if __c3 == "\r" then
        __e42 = "\\r"
      else
        __e42 = __c3
      end
      __e41 = __e42
    end
    __s11 = __s11 .. __e41
    __i16 = __i16 + 1
  end
  return __s11
end
local function compile_nil(x)
  if target == "lua" then
    return "nil"
  else
    if target == "js" then
      return "undefined"
    else
      if target == "r" then
        return "NULL"
      else
        return "nil"
      end
    end
  end
end
local function compile_boolean(x)
  if target == "r" then
    if x then
      return "TRUE"
    else
      return "FALSE"
    end
  else
    if x then
      return "true"
    else
      return "false"
    end
  end
end
local function compile_atom(x)
  if x == "nil" then
    return compile_nil(x)
  else
    if id_literal63(x) then
      return inner(x)
    else
      if string_literal63(x) then
        return escape_newlines(x)
      else
        if string63(x) then
          return compile_id(x)
        else
          if boolean63(x) then
            return compile_boolean(x)
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
                    return error("Cannot compile atom: " .. str(x))
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
local function compile_special(form, stmt63)
  local ____id6 = form
  local __x87 = ____id6[1]
  local __args2 = cut(____id6, 1)
  local ____id7 = getenv(__x87)
  local __special = ____id7["special"]
  local __stmt = ____id7["stmt"]
  local __self_tr63 = ____id7["tr"]
  local __tr = terminator(stmt63 and not __self_tr63)
  return apply(__special, __args2) .. __tr
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
local function compile_call(form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f) then
    return "(" .. __f1 .. ")" .. __args3
  else
    return __f1 .. __args3
  end
end
local function op_delims(parent, child, ...)
  local ____r61 = unstash({...})
  local __parent = destash33(parent, ____r61)
  local __child = destash33(child, ____r61)
  local ____id8 = ____r61
  local __right = ____id8["right"]
  local __e43
  if __right then
    __e43 = _6261
  else
    __e43 = _62
  end
  if __e43(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compile_infix(form)
  local ____id9 = form
  local __op = ____id9[1]
  local ____id10 = cut(____id9, 1)
  local __a1 = ____id10[1]
  local __b2 = ____id10[2]
  local ____id111 = op_delims(form, __a1)
  local __ao = ____id111[1]
  local __ac = ____id111[2]
  local ____id12 = op_delims(form, __b2, {_stash = true, right = true})
  local __bo = ____id12[1]
  local __bc = ____id12[2]
  local __a2 = compile(__a1)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return __op1 .. __ao .. " " .. __a2 .. __ac
  else
    return __ao .. __a2 .. __ac .. " " .. __op1 .. " " .. __bo .. __b3 .. __bc
  end
end
function compile_function(args, body, ...)
  local ____r63 = unstash({...})
  local __args4 = destash33(args, ____r63)
  local __body3 = destash33(body, ____r63)
  local ____id13 = ____r63
  local __name3 = ____id13["name"]
  local __prefix = ____id13["prefix"]
  local __e44
  if __name3 then
    __e44 = compile(__name3)
  else
    __e44 = ""
  end
  local __id14 = __e44
  local __e45
  if (target == "lua" or target == "r") and __args4["rest"] then
    __e45 = join(__args4, {"|...|"})
  else
    __e45 = __args4
  end
  local __args12 = __e45
  local __args5 = compile_args(__args12)
  indent_level = indent_level + 1
  local ____x93 = compile(__body3, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body4 = ____x93
  local __ind = indentation()
  local __e46
  if __prefix then
    __e46 = __prefix .. " "
  else
    __e46 = ""
  end
  local __p = __e46
  local __e47
  if target == "lua" then
    __e47 = "end"
  else
    __e47 = ""
  end
  local __tr1 = __e47
  if __name3 then
    __tr1 = __tr1 .. "\n"
  end
  if target == "lua" then
    return __p .. "function " .. __id14 .. __args5 .. "\n" .. __body4 .. __ind .. __tr1
  else
    return "function " .. __id14 .. __args5 .. " {\n" .. __body4 .. __ind .. "}" .. __tr1
  end
end
local function can_return63(form)
  return is63(form) and not( target == "r") and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
end
function compile(form, ...)
  local ____r65 = unstash({...})
  local __form = destash33(form, ____r65)
  local ____id15 = ____r65
  local __stmt1 = ____id15["stmt"]
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e48
      if __stmt1 then
        __e48 = indentation()
      else
        __e48 = ""
      end
      local __ind1 = __e48
      local __e49
      if atom63(__form) then
        __e49 = compile_atom(__form)
      else
        local __e50
        if infix63(hd(__form)) then
          __e50 = compile_infix(__form)
        else
          __e50 = compile_call(__form)
        end
        __e49 = __e50
      end
      local __form1 = __e49
      return __ind1 .. __form1 .. __tr2
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e51
  if some63(__hoist) and is63(__e) then
    __e51 = join({"do"}, __hoist, {__e})
  else
    local __e52
    if is63(__e) then
      __e52 = __e
    else
      local __e53
      if _35(__hoist) > 1 then
        __e53 = join({"do"}, __hoist)
      else
        __e53 = hd(__hoist)
      end
      __e52 = __e53
    end
    __e51 = __e52
  end
  return either(__e51, {"do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"do"}, body), tail63)
end
local function lower_block(body, tail63)
  return join({"%block"}, tl(lower_body(body, tail63)))
end
local function literal63(form)
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object"
end
local function standalone63(form)
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x101 = almost(args)
  local ____i17 = 0
  while ____i17 < _35(____x101) do
    local __x102 = ____x101[____i17 + 1]
    local ____y = lower(__x102, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i17 = ____i17 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2) then
    return {"return", __e2}
  else
    return __e2
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local ____id16 = args
  local __lh = ____id16[1]
  local __rh = ____id16[2]
  local __lh1 = lower(__lh, hoist)
  local __rh1 = lower(__rh, hoist)
  add(hoist, {"%set", __lh1, __rh1})
  if not( stmt63 and not tail63) then
    return __lh1
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id17 = args
  local __cond = ____id17[1]
  local ___then = ____id17[2]
  local ___else = ____id17[3]
  if stmt63 then
    local __e55
    if is63(___else) then
      __e55 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e55))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3})
    local __e54
    if is63(___else) then
      __e54 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e54))
    return __e3
  end
end
local function lower_short(x, args, hoist)
  local ____id18 = args
  local __a3 = ____id18[1]
  local __b4 = ____id18[2]
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id19 = unique("id")
    local __e56
    if x == "and" then
      __e56 = {"%if", __id19, __b4, __id19}
    else
      __e56 = {"%if", __id19, __id19, __b4}
    end
    return lower({"do", {"%local", __id19, __a3}, __e56}, hoist)
  else
    return {x, lower(__a3, hoist), __b11}
  end
end
local function lower_try(args, hoist, tail63)
  return add(hoist, {"%try", lower_body(args, tail63)})
end
local function lower_while(args, hoist)
  local ____id20 = args
  local __c4 = ____id20[1]
  local __body5 = cut(____id20, 1)
  local __pre = {}
  local __c5 = lower(__c4, __pre)
  local __e57
  if none63(__pre) then
    __e57 = {"while", __c5, lower_body(__body5)}
  else
    __e57 = {"while", true, join({"do"}, __pre, {{"%if", {"not", __c5}, {"break"}}, lower_body(__body5)})}
  end
  return add(hoist, __e57)
end
local function lower_for(args, hoist)
  local ____id211 = args
  local __t = ____id211[1]
  local __k7 = ____id211[2]
  local __body6 = cut(____id211, 2)
  return add(hoist, {"%for", lower(__t, hoist), __k7, lower_body(__body6)})
end
local function lower_function(args)
  local ____id22 = args
  local __a4 = ____id22[1]
  local __body7 = cut(____id22, 1)
  return {"%function", __a4, lower_body(__body7, true)}
end
local function lower_definition(kind, args, hoist)
  local ____id23 = args
  local __name4 = ____id23[1]
  local __args6 = ____id23[2]
  local __body8 = cut(____id23, 2)
  return add(hoist, {kind, __name4, __args6, lower_body(__body8, true)})
end
local function lower_call(form, hoist)
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
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e4 = {}
    local ____id24 = form
    local __x131 = ____id24[1]
    local __args7 = cut(____id24, 1)
    reduce(function (a, b)
      add(__e4, {__x131, a, b})
      return a
    end, __args7)
    return join({"and"}, reverse(__e4))
  else
    return form
  end
end
local function lower_infix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lower_infix(form, hoist)
  local __form3 = lower_pairwise(form)
  local ____id25 = __form3
  local __x134 = ____id25[1]
  local __args8 = cut(____id25, 1)
  return lower(reduce(function (a, b)
    return {__x134, b, a}
  end, reverse(__args8)), hoist)
end
local function lower_special(form, hoist)
  local __e5 = lower_call(form, hoist)
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
        return lower_statement(form)
      else
        if lower_infix63(form) then
          return lower_infix(form, hoist)
        else
          local ____id26 = form
          local __x137 = ____id26[1]
          local __args9 = cut(____id26, 1)
          if __x137 == "do" then
            return lower_do(__args9, hoist, stmt63, tail63)
          else
            if __x137 == "%block" then
              return lower_block(__args9, tail63)
            else
              if __x137 == "%call" then
                return lower(__args9, hoist, stmt63, tail63)
              else
                if __x137 == "%set" then
                  return lower_set(__args9, hoist, stmt63, tail63)
                else
                  if __x137 == "%if" then
                    return lower_if(__args9, hoist, stmt63, tail63)
                  else
                    if __x137 == "%try" then
                      return lower_try(__args9, hoist, tail63)
                    else
                      if __x137 == "while" then
                        return lower_while(__args9, hoist)
                      else
                        if __x137 == "%for" then
                          return lower_for(__args9, hoist)
                        else
                          if __x137 == "%function" then
                            return lower_function(__args9)
                          else
                            if __x137 == "%local-function" or __x137 == "%global-function" then
                              return lower_definition(__x137, __args9, hoist)
                            else
                              if in63(__x137, {"and", "or"}) then
                                return lower_short(__x137, __args9, hoist)
                              else
                                if statement63(__x137) then
                                  return lower_special(form, hoist)
                                else
                                  return lower_call(form, hoist)
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
    return error(e .. " in " .. code)
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
function immediate_call63(x)
  return obj63(x) and obj63(hd(x)) and hd(hd(x)) == "%function"
end
setenv("do", {_stash = true, special = function (...)
  local __forms1 = unstash({...})
  local __s3 = ""
  local ____x143 = __forms1
  local ____i19 = 0
  while ____i19 < _35(____x143) do
    local __x144 = ____x143[____i19 + 1]
    if target == "lua" and immediate_call63(__x144) and "\n" == char(__s3, edge(__s3)) then
      __s3 = clip(__s3, 0, edge(__s3)) .. ";\n"
    end
    __s3 = __s3 .. compile(__x144, {_stash = true, stmt = true})
    if not atom63(__x144) then
      if hd(__x144) == "return" or hd(__x144) == "break" then
        break
      end
    end
    ____i19 = ____i19 + 1
  end
  return __s3
end, stmt = true, tr = true})
setenv("%block", {_stash = true, special = function (...)
  local __forms3 = unstash({...})
  local __s5 = "{\n"
  indent_level = indent_level + 1
  local ____x150 = __forms3
  local ____i21 = 0
  while ____i21 < _35(____x150) do
    local __x151 = ____x150[____i21 + 1]
    __s5 = __s5 .. compile(__x151, {_stash = true, stmt = true})
    ____i21 = ____i21 + 1
  end
  local ____x149
  indent_level = indent_level - 1
  __s5 = __s5 .. indentation() .. "}"
  return __s5
end})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local __cond2 = compile(cond)
  indent_level = indent_level + 1
  local ____x154 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __cons1 = ____x154
  local __e58
  if alt then
    indent_level = indent_level + 1
    local ____x155 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    __e58 = ____x155
  end
  local __alt1 = __e58
  local __ind3 = indentation()
  local __s7 = ""
  if target == "lua" then
    __s7 = __s7 .. __ind3 .. "if " .. __cond2 .. " then\n" .. __cons1
  else
    __s7 = __s7 .. __ind3 .. "if (" .. __cond2 .. ") {\n" .. __cons1 .. __ind3 .. "}"
  end
  if __alt1 and target == "lua" then
    __s7 = __s7 .. __ind3 .. "else\n" .. __alt1
  else
    if __alt1 then
      __s7 = __s7 .. " else {\n" .. __alt1 .. __ind3 .. "}"
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
  indent_level = indent_level + 1
  local ____x157 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body10 = ____x157
  local __ind5 = indentation()
  if target == "lua" then
    return __ind5 .. "while " .. __cond4 .. " do\n" .. __body10 .. __ind5 .. "end\n"
  else
    return __ind5 .. "while (" .. __cond4 .. ") {\n" .. __body10 .. __ind5 .. "}\n"
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local __t2 = compile(t)
  local __ind7 = indentation()
  indent_level = indent_level + 1
  local ____x159 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body12 = ____x159
  if target == "lua" then
    return __ind7 .. "for " .. k .. " in next, " .. __t2 .. " do\n" .. __body12 .. __ind7 .. "end\n"
  else
    return __ind7 .. "for (" .. k .. " in " .. __t2 .. ") {\n" .. __body12 .. __ind7 .. "}\n"
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __e8 = unique("e")
  local __ind9 = indentation()
  indent_level = indent_level + 1
  local ____x164 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body14 = ____x164
  local __hf1 = {"return", {"%array", false, __e8}}
  indent_level = indent_level + 1
  local ____x167 = compile(__hf1, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __h1 = ____x167
  return __ind9 .. "try {\n" .. __body14 .. __ind9 .. "}\n" .. __ind9 .. "catch (" .. __e8 .. ") {\n" .. __h1 .. __ind9 .. "}\n"
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  return indentation() .. "delete " .. compile(place)
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return indentation() .. "break"
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return compile_function(args, body)
end})
setenv("%global-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x171 = compile_function(args, body, {_stash = true, name = name})
    return indentation() .. __x171
  else
    return compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x177 = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return indentation() .. __x177
  else
    return compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e59
  if nil63(x) then
    __e59 = "return"
  else
    __e59 = "return " .. compile(x)
  end
  local __x181 = __e59
  return indentation() .. __x181
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return "new " .. compile(x)
end})
setenv("typeof", {_stash = true, special = function (x)
  return "typeof(" .. compile(x) .. ")"
end})
setenv("throw", {_stash = true, special = function (x)
  local __e60
  if target == "js" then
    __e60 = "throw " .. compile(x)
  else
    __e60 = "error(" .. compile(x) .. ")"
  end
  local __e12 = __e60
  return indentation() .. __e12
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local __id28 = compile(name)
  local __value11 = compile(value)
  local __e61
  if target == "r" then
    __e61 = " <- "
  else
    __e61 = " = "
  end
  local __sep1 = __e61
  local __e62
  if is63(value) then
    __e62 = __sep1 .. __value11
  else
    __e62 = ""
  end
  local __rh2 = __e62
  local __e63
  if target == "js" then
    __e63 = "var "
  else
    local __e64
    if target == "lua" then
      __e64 = "local "
    else
      __e64 = ""
    end
    __e63 = __e64
  end
  local __keyword1 = __e63
  local __ind11 = indentation()
  return __ind11 .. __keyword1 .. __id28 .. __rh2
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh12 = compile(lh)
  local __e65
  if nil63(rh) then
    __e65 = "nil"
  else
    __e65 = rh
  end
  local __rh13 = compile(__e65)
  local __e66
  if target == "r" then
    local __e67
    if hd63(lh, "get") then
      __e67 = " <<- "
    else
      __e67 = " <- "
    end
    __e66 = __e67
  else
    __e66 = " = "
  end
  local __sep3 = __e66
  return indentation() .. __lh12 .. __sep3 .. __rh13
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k12 = compile(k)
  if target == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if accessor_id63(k) then
    return __t12 .. __k12
  else
    if target == "r" then
      return __t12 .. "[[" .. __k12 .. "]]"
    else
      return __t12 .. "[" .. __k12 .. "]"
    end
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local __forms5 = unstash({...})
  local __e68
  if target == "r" then
    __e68 = "list("
  else
    local __e69
    if target == "lua" then
      __e69 = "{"
    else
      __e69 = "["
    end
    __e68 = __e69
  end
  local __open1 = __e68
  local __e70
  if target == "r" then
    __e70 = ")"
  else
    local __e71
    if target == "lua" then
      __e71 = "}"
    else
      __e71 = "]"
    end
    __e70 = __e71
  end
  local __close1 = __e70
  local __s9 = ""
  local __c7 = ""
  local ____o10 = __forms5
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
  local __forms7 = unstash({...})
  local __e72
  if target == "r" then
    __e72 = "list("
  else
    __e72 = "{"
  end
  local __s111 = __e72
  local __c9 = ""
  local __e73
  if target == "js" then
    __e73 = ": "
  else
    __e73 = " = "
  end
  local __sep5 = __e73
  local ____o12 = pair(__forms7)
  local __k14 = nil
  for __k14 in next, ____o12 do
    local __v12 = ____o12[__k14]
    if number63(__k14) then
      local ____id30 = __v12
      local __k15 = ____id30[1]
      local __v13 = ____id30[2]
      if not string63(__k15) then
        error("Illegal key: " .. str(__k15))
      end
      __s111 = __s111 .. __c9 .. key(__k15) .. __sep5 .. compile(__v13)
      __c9 = ", "
    end
  end
  local __e74
  if target == "r" then
    __e74 = ")"
  else
    __e74 = "}"
  end
  return __s111 .. __e74
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args111 = unstash({...})
  return apply(cat, map(compile, __args111))
end})
setenv("%stash", {_stash = true, special = function (...)
  local __args13 = unstash({...})
  if target == "r" then
    indent_level = indent_level + 1
    local __ind13 = indentation()
    local __s13 = ""
    local __c111 = ""
    local ____x191 = __args13
    local ____i28 = 0
    while ____i28 < _35(____x191) do
      local ____id33 = ____x191[____i28 + 1]
      local __k18 = ____id33[1]
      local __v16 = ____id33[2]
      __s13 = __s13 .. __c111 .. "\n" .. __ind13 .. inner(compile(__k18)) .. " = " .. compile(__v16)
      __c111 = ","
      ____i28 = ____i28 + 1
    end
    local ____x190 = __s13
    indent_level = indent_level - 1
    return ____x190
  else
    local __l2 = {"%object", "\"_stash\"", true}
    local ____x193 = __args13
    local ____i29 = 0
    while ____i29 < _35(____x193) do
      local ____id34 = ____x193[____i29 + 1]
      local __k19 = ____id34[1]
      local __v17 = ____id34[2]
      add(__l2, literal(__k19))
      add(__l2, __v17)
      ____i29 = ____i29 + 1
    end
    return compile(__l2)
  end
end})
return {run = run, ["eval"] = _eval, expand = expand, compile = compile}
