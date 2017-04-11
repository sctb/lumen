local reader = require("reader")
local function getenv(k, p)
  if string63(k) then
    local i = edge(environment)
    while i >= 0 do
      local b = environment[i + 1][k]
      if is63(b) then
        local _e9
        if p then
          _e9 = b[p]
        else
          _e9 = b
        end
        return(_e9)
      else
        i = i - 1
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
  local b = first(function (frame)
    return(frame[k])
  end, reverse(environment))
  return(not atom63(b) and is63(b.variable))
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
local _names = {}
function unique(x)
  if _names[x] then
    local i = _names[x]
    _names[x] = _names[x] + 1
    return(unique(x .. i))
  else
    _names[x] = 1
    return("_" .. x)
  end
end
local function stash42(args)
  if keys63(args) then
    local l = {"%object", "\"_stash\"", true}
    local _o = args
    local k = nil
    for k in next, _o do
      local v = _o[k]
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
    local id = unique("id")
    local bs = {id, rh}
    local _o1 = lh
    local k = nil
    for k in next, _o1 do
      local v = _o1[k]
      local _e10
      if k == "rest" then
        _e10 = {"cut", id, _35(lh)}
      else
        _e10 = {"get", id, {"quote", bias(k)}}
      end
      local x = _e10
      if is63(k) then
        local _e11
        if v == true then
          _e11 = k
        else
          _e11 = v
        end
        local _k = _e11
        bs = join(bs, bind(_k, x))
      end
    end
    return(bs)
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return({{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", from})
end})
function bind42(args, body)
  local args1 = {}
  local function rest()
    if target == "js" then
      return({"unstash", {"arguments%", _35(args1)}})
    else
      add(args1, "|...|")
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({args1, join({"let", {args, rest()}}, body)})
  else
    local bs = {}
    local r = unique("r")
    local _o2 = args
    local k = nil
    for k in next, _o2 do
      local v = _o2[k]
      if number63(k) then
        if atom63(v) then
          add(args1, v)
        else
          local x = unique("x")
          add(args1, x)
          bs = join(bs, {v, x})
        end
      end
    end
    if keys63(args) then
      bs = join(bs, {r, rest()})
      local _e12
      if target == "lua" then
        _e12 = edge(args1)
      else
        _e12 = _35(args1)
      end
      local n = _e12
      local i = 0
      while i < n do
        local v = args1[i + 1]
        bs = join(bs, {v, {"destash!", v, r}})
        i = i + 1
      end
      bs = join(bs, {keys(args), r})
    end
    return({args1, join({"let", bs}, body)})
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
local function expand_local(_x36)
  local _id = _x36
  local x = _id[1]
  local name = _id[2]
  local value = _id[3]
  return({"%local", name, macroexpand(value)})
end
local function expand_function(_x38)
  local _id1 = _x38
  local x = _id1[1]
  local args = _id1[2]
  local body = cut(_id1, 2)
  add(environment, {})
  local _o3 = args
  local _i3 = nil
  for _i3 in next, _o3 do
    local _x39 = _o3[_i3]
    setenv(_x39, {_stash = true, variable = true})
  end
  local _x40 = join({"%function", args}, macroexpand(body))
  drop(environment)
  return(_x40)
end
local function expand_definition(_x42)
  local _id2 = _x42
  local x = _id2[1]
  local name = _id2[2]
  local args = _id2[3]
  local body = cut(_id2, 3)
  add(environment, {})
  local _o4 = args
  local _i4 = nil
  for _i4 in next, _o4 do
    local _x43 = _o4[_i4]
    setenv(_x43, {_stash = true, variable = true})
  end
  local _x44 = join({x, name, args}, macroexpand(body))
  drop(environment)
  return(_x44)
end
local function expand_macro(form)
  return(macroexpand(expand1(form)))
end
function expand1(_x46)
  local _id3 = _x46
  local name = _id3[1]
  local body = cut(_id3, 1)
  return(apply(macro_function(name), body))
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
        return(expand_local(form))
      else
        if x == "%function" then
          return(expand_function(form))
        else
          if x == "%global-function" then
            return(expand_definition(form))
          else
            if x == "%local-function" then
              return(expand_definition(form))
            else
              if macro63(x) then
                return(expand_macro(form))
              else
                return(map(macroexpand, form))
              end
            end
          end
        end
      end
    end
  end
end
local function quasiquote_list(form, depth)
  local xs = {{"list"}}
  local _o5 = form
  local k = nil
  for k in next, _o5 do
    local v = _o5[k]
    if not number63(k) then
      local _e13
      if quasisplice63(v, depth) then
        _e13 = quasiexpand(v[2])
      else
        _e13 = quasiexpand(v, depth)
      end
      local _v = _e13
      last(xs)[k] = _v
    end
  end
  local _x49 = form
  local _i6 = 0
  while _i6 < _35(_x49) do
    local x = _x49[_i6 + 1]
    if quasisplice63(x, depth) then
      local _x50 = quasiexpand(x[2])
      add(xs, _x50)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _i6 = _i6 + 1
  end
  local pruned = keep(function (x)
    return(_35(x) > 1 or not( hd(x) == "list") or keys63(x))
  end, xs)
  if one63(pruned) then
    return(hd(pruned))
  else
    return(join({"join"}, pruned))
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
function expand_if(_x54)
  local _id4 = _x54
  local a = _id4[1]
  local b = _id4[2]
  local c = cut(_id4, 2)
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
  local s = ""
  local i = 0
  while i < indent_level do
    s = s .. "  "
    i = i + 1
  end
  return(s)
end
local reserved = {["return"] = true, ["if"] = true, ["until"] = true, ["false"] = true, ["instanceof"] = true, ["true"] = true, ["in"] = true, ["or"] = true, ["else"] = true, ["typeof"] = true, ["end"] = true, ["function"] = true, ["<"] = true, [">="] = true, ["while"] = true, ["and"] = true, ["debugger"] = true, ["delete"] = true, ["var"] = true, ["elseif"] = true, ["repeat"] = true, [">"] = true, ["<="] = true, ["-"] = true, ["nil"] = true, ["+"] = true, ["import"] = true, ["with"] = true, ["local"] = true, ["%"] = true, ["break"] = true, ["not"] = true, ["finally"] = true, ["new"] = true, ["throw"] = true, ["="] = true, ["/"] = true, ["=="] = true, ["catch"] = true, ["switch"] = true, ["const"] = true, ["continue"] = true, ["case"] = true, ["then"] = true, ["class"] = true, ["void"] = true, ["for"] = true, ["default"] = true, ["do"] = true, ["*"] = true, ["try"] = true}
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
  local _o6 = t
  local k = nil
  for k in next, _o6 do
    local v = _o6[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local __x59 = {}
local _x60 = {}
_x60.js = "!"
_x60.lua = "not"
__x59["not"] = _x60
local __x61 = {}
__x61["/"] = true
__x61["*"] = true
__x61["%"] = true
local __x62 = {}
__x62["-"] = true
__x62["+"] = true
local __x63 = {}
local _x64 = {}
_x64.js = "+"
_x64.lua = ".."
__x63.cat = _x64
local __x65 = {}
__x65["<"] = true
__x65[">"] = true
__x65[">="] = true
__x65["<="] = true
local __x66 = {}
local _x67 = {}
_x67.js = "==="
_x67.lua = "=="
__x66["="] = _x67
local __x68 = {}
local _x69 = {}
_x69.js = "&&"
_x69.lua = "and"
__x68["and"] = _x69
local __x70 = {}
local _x71 = {}
_x71.js = "||"
_x71.lua = "or"
__x70["or"] = _x71
local infix = {__x59, __x61, __x62, __x63, __x65, __x66, __x68, __x70}
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
    local _o7 = infix
    local k = nil
    for k in next, _o7 do
      local v = _o7[k]
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
  local _x73 = args
  local _i9 = 0
  while _i9 < _35(_x73) do
    local x = _x73[_i9 + 1]
    s = s .. c .. compile(x)
    c = ", "
    _i9 = _i9 + 1
  end
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _e14
    if c == "\n" then
      _e14 = "\\n"
    else
      _e14 = c
    end
    s1 = s1 .. _e14
    i = i + 1
  end
  return(s1)
end
local function id(id)
  local _e15
  if number_code63(code(id, 0)) then
    _e15 = "_"
  else
    _e15 = ""
  end
  local id1 = _e15
  local i = 0
  while i < _35(id) do
    local c = char(id, i)
    local n = code(c)
    local _e16
    if c == "-" and not( id == "-") then
      _e16 = "_"
    else
      local _e17
      if valid_code63(n) then
        _e17 = c
      else
        local _e18
        if i == 0 then
          _e18 = "_" .. n
        else
          _e18 = n
        end
        _e17 = _e18
      end
      _e16 = _e17
    end
    local c1 = _e16
    id1 = id1 .. c1
    i = i + 1
  end
  if reserved63(id1) then
    return("_" .. id1)
  else
    return(id1)
  end
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
                  if x == -inf then
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
  local _id5 = form
  local x = _id5[1]
  local args = cut(_id5, 1)
  local _id6 = getenv(x)
  local stmt = _id6.stmt
  local self_tr63 = _id6.tr
  local special = _id6.special
  local tr = terminator(stmt63 and not self_tr63)
  return(apply(special, args) .. tr)
end
local function parenthesize_call63(x)
  return(not atom63(x) and hd(x) == "%function" or precedence(x) > 0)
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
  local _r56 = unstash({...})
  local _parent = destash33(parent, _r56)
  local _child = destash33(child, _r56)
  local _id7 = _r56
  local right = _id7.right
  local _e19
  if right then
    _e19 = _6261
  else
    _e19 = _62
  end
  if _e19(precedence(_child), precedence(_parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local _id8 = form
  local op = _id8[1]
  local _id9 = cut(_id8, 1)
  local a = _id9[1]
  local b = _id9[2]
  local _id10 = op_delims(form, a)
  local ao = _id10[1]
  local ac = _id10[2]
  local _id11 = op_delims(form, b, {_stash = true, right = true})
  local bo = _id11[1]
  local bc = _id11[2]
  local _a = compile(a)
  local _b = compile(b)
  local _op = getop(op)
  if unary63(form) then
    return(_op .. ao .. " " .. _a .. ac)
  else
    return(ao .. _a .. ac .. " " .. _op .. " " .. bo .. _b .. bc)
  end
end
function compile_function(args, body, ...)
  local _r58 = unstash({...})
  local _args = destash33(args, _r58)
  local _body = destash33(body, _r58)
  local _id12 = _r58
  local prefix = _id12.prefix
  local name = _id12.name
  local _e20
  if name then
    _e20 = compile(name)
  else
    _e20 = ""
  end
  local _id13 = _e20
  local _args1 = compile_args(_args)
  indent_level = indent_level + 1
  local _x78 = compile(_body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body1 = _x78
  local ind = indentation()
  local _e21
  if prefix then
    _e21 = prefix .. " "
  else
    _e21 = ""
  end
  local p = _e21
  local _e22
  if target == "js" then
    _e22 = ""
  else
    _e22 = "end"
  end
  local tr = _e22
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. _id13 .. _args1 .. " {\n" .. _body1 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. _id13 .. _args1 .. "\n" .. _body1 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _r60 = unstash({...})
  local _form = destash33(form, _r60)
  local _id14 = _r60
  local stmt = _id14.stmt
  if nil63(_form) then
    return("")
  else
    if special_form63(_form) then
      return(compile_special(_form, stmt))
    else
      local tr = terminator(stmt)
      local _e23
      if stmt then
        _e23 = indentation()
      else
        _e23 = ""
      end
      local ind = _e23
      local _e24
      if atom63(_form) then
        _e24 = compile_atom(_form)
      else
        local _e25
        if infix63(hd(_form)) then
          _e25 = compile_infix(_form)
        else
          _e25 = compile_call(_form)
        end
        _e24 = _e25
      end
      local _form1 = _e24
      return(ind .. _form1 .. tr)
    end
  end
end
local function lower_statement(form, tail63)
  local hoist = {}
  local e = lower(form, hoist, true, tail63)
  if some63(hoist) and is63(e) then
    return(join({"do"}, hoist, {e}))
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
local function literal63(form)
  return(atom63(form) or hd(form) == "%array" or hd(form) == "%object")
end
local function standalone63(form)
  return(not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form))
end
local function lower_do(args, hoist, stmt63, tail63)
  local _x84 = almost(args)
  local _i10 = 0
  while _i10 < _35(_x84) do
    local x = _x84[_i10 + 1]
    local _y = lower(x, hoist, stmt63)
    if yes(_y) then
      local e = _y
      if standalone63(e) then
        add(hoist, e)
      end
    end
    _i10 = _i10 + 1
  end
  local e = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(e) then
    return({"return", e})
  else
    return(e)
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local _id15 = args
  local lh = _id15[1]
  local rh = _id15[2]
  add(hoist, {"%set", lh, lower(rh, hoist)})
  if not( stmt63 and not tail63) then
    return(lh)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local _id16 = args
  local cond = _id16[1]
  local _then = _id16[2]
  local _else = _id16[3]
  if stmt63 then
    local _e27
    if is63(_else) then
      _e27 = {lower_body({_else}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_then}, tail63)}, _e27)))
  else
    local e = unique("e")
    add(hoist, {"%local", e})
    local _e26
    if is63(_else) then
      _e26 = {lower({"%set", e, _else})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"%set", e, _then})}, _e26))
    return(e)
  end
end
local function lower_short(x, args, hoist)
  local _id17 = args
  local a = _id17[1]
  local b = _id17[2]
  local hoist1 = {}
  local b1 = lower(b, hoist1)
  if some63(hoist1) then
    local _id18 = unique("id")
    local _e28
    if x == "and" then
      _e28 = {"%if", _id18, b, _id18}
    else
      _e28 = {"%if", _id18, _id18, b}
    end
    return(lower({"do", {"%local", _id18, a}, _e28}, hoist))
  else
    return({x, lower(a, hoist), b1})
  end
end
local function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
local function lower_while(args, hoist)
  local _id19 = args
  local c = _id19[1]
  local body = cut(_id19, 1)
  local pre = {}
  local _c = lower(c, pre)
  local _e29
  if none63(pre) then
    _e29 = {"while", _c, lower_body(body)}
  else
    _e29 = {"while", true, join({"do"}, pre, {{"%if", {"not", _c}, {"break"}}, lower_body(body)})}
  end
  return(add(hoist, _e29))
end
local function lower_for(args, hoist)
  local _id20 = args
  local t = _id20[1]
  local k = _id20[2]
  local body = cut(_id20, 2)
  return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
end
local function lower_function(args)
  local _id21 = args
  local a = _id21[1]
  local body = cut(_id21, 1)
  return({"%function", a, lower_body(body, true)})
end
local function lower_definition(kind, args, hoist)
  local _id22 = args
  local name = _id22[1]
  local _args2 = _id22[2]
  local body = cut(_id22, 2)
  return(add(hoist, {kind, name, _args2, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _form2 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_form2) then
    return(_form2)
  end
end
local function lower_infix63(form)
  return(infix63(hd(form)) and _35(form) > 3)
end
local function lower_infix(form, hoist)
  local _id23 = form
  local x = _id23[1]
  local args = cut(_id23, 1)
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
          local _id24 = form
          local x = _id24[1]
          local args = cut(_id24, 1)
          if x == "do" then
            return(lower_do(args, hoist, stmt63, tail63))
          else
            if x == "%set" then
              return(lower_set(args, hoist, stmt63, tail63))
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
function eval(form)
  local previous = target
  target = "lua"
  local code = compile(expand({"set", "%result", form}))
  target = previous
  run(code)
  return(_37result)
end
setenv("do", {_stash = true, stmt = true, tr = true, special = function (...)
  local forms = unstash({...})
  local s = ""
  local _x119 = forms
  local _i12 = 0
  while _i12 < _35(_x119) do
    local x = _x119[_i12 + 1]
    s = s .. compile(x, {_stash = true, stmt = true})
    if not atom63(x) then
      if hd(x) == "return" or hd(x) == "break" then
        break
      end
    end
    _i12 = _i12 + 1
  end
  return(s)
end})
setenv("%if", {_stash = true, stmt = true, tr = true, special = function (cond, cons, alt)
  local _cond1 = compile(cond)
  indent_level = indent_level + 1
  local _x122 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _cons1 = _x122
  local _e30
  if alt then
    indent_level = indent_level + 1
    local _x123 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _e30 = _x123
  end
  local _alt1 = _e30
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _cond1 .. ") {\n" .. _cons1 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _cond1 .. " then\n" .. _cons1
  end
  if _alt1 and target == "js" then
    s = s .. " else {\n" .. _alt1 .. ind .. "}"
  else
    if _alt1 then
      s = s .. ind .. "else\n" .. _alt1
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end})
setenv("while", {_stash = true, stmt = true, tr = true, special = function (cond, form)
  local _cond3 = compile(cond)
  indent_level = indent_level + 1
  local _x125 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x125
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _cond3 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _cond3 .. " do\n" .. body .. ind .. "end\n")
  end
end})
setenv("%for", {_stash = true, stmt = true, tr = true, special = function (t, k, form)
  local _t1 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _x127 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x127
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _t1 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _t1 .. ") {\n" .. body .. ind .. "}\n")
  end
end})
setenv("%try", {_stash = true, stmt = true, tr = true, special = function (form)
  local e = unique("e")
  local ind = indentation()
  indent_level = indent_level + 1
  local _x132 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x132
  local hf = {"return", {"%array", false, e}}
  indent_level = indent_level + 1
  local _x135 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _x135
  return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
end})
setenv("%delete", {_stash = true, special = function (place)
  return(indentation() .. "delete " .. compile(place))
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return(indentation() .. "break")
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return(compile_function(args, body))
end})
setenv("%global-function", {_stash = true, stmt = true, tr = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, name = name})
    return(indentation() .. x)
  else
    return(compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end})
setenv("%local-function", {_stash = true, stmt = true, tr = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, prefix = "local", name = name})
    return(indentation() .. x)
  else
    return(compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end})
setenv("return", {_stash = true, special = function (x)
  local _e31
  if nil63(x) then
    _e31 = "return"
  else
    _e31 = "return(" .. compile(x) .. ")"
  end
  local _x145 = _e31
  return(indentation() .. _x145)
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return("new " .. compile(x))
end})
setenv("typeof", {_stash = true, special = function (x)
  return("typeof(" .. compile(x) .. ")")
end})
setenv("error", {_stash = true, special = function (x)
  local _e32
  if target == "js" then
    _e32 = "throw " .. compile({"new", {"Error", x}})
  else
    _e32 = "error(" .. compile(x) .. ")"
  end
  local e = _e32
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local _id26 = compile(name)
  local value1 = compile(value)
  local _e33
  if is63(value) then
    _e33 = " = " .. value1
  else
    _e33 = ""
  end
  local rh = _e33
  local _e34
  if target == "js" then
    _e34 = "var "
  else
    _e34 = "local "
  end
  local keyword = _e34
  local ind = indentation()
  return(ind .. keyword .. _id26 .. rh)
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local _lh1 = compile(lh)
  local _e35
  if nil63(rh) then
    _e35 = "nil"
  else
    _e35 = rh
  end
  local _rh1 = compile(_e35)
  return(indentation() .. _lh1 .. " = " .. _rh1)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _t3 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_t3, 0) == "{" then
    _t3 = "(" .. _t3 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_t3 .. "." .. inner(k))
  else
    return(_t3 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _e36
  if target == "lua" then
    _e36 = "{"
  else
    _e36 = "["
  end
  local open = _e36
  local _e37
  if target == "lua" then
    _e37 = "}"
  else
    _e37 = "]"
  end
  local close = _e37
  local s = ""
  local c = ""
  local _o9 = forms
  local k = nil
  for k in next, _o9 do
    local v = _o9[k]
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
  local _e38
  if target == "lua" then
    _e38 = " = "
  else
    _e38 = ": "
  end
  local sep = _e38
  local _o11 = pair(forms)
  local k = nil
  for k in next, _o11 do
    local v = _o11[k]
    if number63(k) then
      local _id28 = v
      local _k2 = _id28[1]
      local _v2 = _id28[2]
      if not string63(_k2) then
        error("Illegal key: " .. str(_k2))
      end
      s = s .. c .. key(_k2) .. sep .. compile(_v2)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({run = run, eval = eval, expand = expand, compile = compile})
