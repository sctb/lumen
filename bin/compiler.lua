local reader = require("reader")
local function getenv(k, p)
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
      local _e9
      if k == "rest" then
        _e9 = {"cut", id, _35(lh)}
      else
        _e9 = {"get", id, {"quote", bias(k)}}
      end
      local x = _e9
      if is63(k) then
        local _e10
        if v == true then
          _e10 = k
        else
          _e10 = v
        end
        local _k = _e10
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
local function expand_local(_x34)
  local _id = _x34
  local x = _id[1]
  local name = _id[2]
  local value = _id[3]
  return({"%local", name, macroexpand(value)})
end
local function expand_function(_x36)
  local _id1 = _x36
  local x = _id1[1]
  local args = _id1[2]
  local body = cut(_id1, 2)
  add(environment, {})
  local _o3 = args
  local _i3 = nil
  for _i3 in next, _o3 do
    local _x37 = _o3[_i3]
    setenv(_x37, {_stash = true, variable = true})
  end
  local _x38 = join({"%function", args}, macroexpand(body))
  drop(environment)
  return(_x38)
end
local function expand_definition(_x40)
  local _id2 = _x40
  local x = _id2[1]
  local name = _id2[2]
  local args = _id2[3]
  local body = cut(_id2, 3)
  add(environment, {})
  local _o4 = args
  local _i4 = nil
  for _i4 in next, _o4 do
    local _x41 = _o4[_i4]
    setenv(_x41, {_stash = true, variable = true})
  end
  local _x42 = join({x, name, args}, macroexpand(body))
  drop(environment)
  return(_x42)
end
local function expand_macro(_x44)
  local _id3 = _x44
  local name = _id3[1]
  local body = cut(_id3, 1)
  return(macroexpand(apply(macro_function(name), body)))
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
      local _e11
      if quasisplice63(v, depth) then
        _e11 = quasiexpand(v[2])
      else
        _e11 = quasiexpand(v, depth)
      end
      local _v = _e11
      last(xs)[k] = _v
    end
  end
  local _x47 = form
  local _n6 = _35(_x47)
  local _i6 = 0
  while _i6 < _n6 do
    local x = _x47[_i6 + 1]
    if quasisplice63(x, depth) then
      local _x48 = quasiexpand(x[2])
      add(xs, _x48)
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
function expand_if(_x52)
  local _id4 = _x52
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
local reserved = {["else"] = true, ["<"] = true, ["true"] = true, ["/"] = true, ["end"] = true, ["typeof"] = true, ["function"] = true, ["switch"] = true, ["="] = true, ["or"] = true, ["try"] = true, ["catch"] = true, ["until"] = true, ["local"] = true, ["repeat"] = true, ["-"] = true, ["false"] = true, ["continue"] = true, ["=="] = true, ["and"] = true, ["if"] = true, ["for"] = true, [">="] = true, ["<="] = true, ["with"] = true, ["return"] = true, ["finally"] = true, ["nil"] = true, ["new"] = true, ["do"] = true, ["case"] = true, ["break"] = true, ["elseif"] = true, ["+"] = true, ["not"] = true, ["void"] = true, ["var"] = true, ["%"] = true, ["in"] = true, ["delete"] = true, ["throw"] = true, ["debugger"] = true, ["instanceof"] = true, ["this"] = true, ["while"] = true, ["then"] = true, ["default"] = true, ["*"] = true, [">"] = true}
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
local __x57 = {}
local _x58 = {}
_x58.lua = "not"
_x58.js = "!"
__x57["not"] = _x58
local __x59 = {}
__x59["/"] = true
__x59["*"] = true
__x59["%"] = true
local __x60 = {}
__x60["+"] = true
__x60["-"] = true
local __x61 = {}
local _x62 = {}
_x62.lua = ".."
_x62.js = "+"
__x61.cat = _x62
local __x63 = {}
__x63["<="] = true
__x63[">="] = true
__x63["<"] = true
__x63[">"] = true
local __x64 = {}
local _x65 = {}
_x65.lua = "=="
_x65.js = "==="
__x64["="] = _x65
local __x66 = {}
local _x67 = {}
_x67.lua = "and"
_x67.js = "&&"
__x66["and"] = _x67
local __x68 = {}
local _x69 = {}
_x69.lua = "or"
_x69.js = "||"
__x68["or"] = _x69
local infix = {__x57, __x59, __x60, __x61, __x63, __x64, __x66, __x68}
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
  local _x71 = args
  local _n9 = _35(_x71)
  local _i9 = 0
  while _i9 < _n9 do
    local x = _x71[_i9 + 1]
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
    local _e12
    if c == "\n" then
      _e12 = "\\n"
    else
      _e12 = c
    end
    s1 = s1 .. _e12
    i = i + 1
  end
  return(s1)
end
local function id(id)
  local id1 = ""
  local i = 0
  while i < _35(id) do
    local c = char(id, i)
    local n = code(c)
    local _e13
    if c == "-" then
      _e13 = "_"
    else
      local _e14
      if valid_code63(n) then
        _e14 = c
      else
        local _e15
        if i == 0 then
          _e15 = "_" .. n
        else
          _e15 = n
        end
        _e14 = _e15
      end
      _e13 = _e14
    end
    local c1 = _e13
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
                      error("Cannot compile atom: " .. string(x))
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
  local self_tr63 = _id6.tr
  local stmt = _id6.stmt
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
  local _id7 = _r56
  local right = _id7.right
  local _e16
  if right then
    _e16 = _6261
  else
    _e16 = _62
  end
  if _e16(precedence(child), precedence(parent)) then
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
  local _id12 = _r58
  local name = _id12.name
  local prefix = _id12.prefix
  local _e17
  if name then
    _e17 = compile(name)
  else
    _e17 = ""
  end
  local _id13 = _e17
  local _args = compile_args(args)
  indent_level = indent_level + 1
  local _x76 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body = _x76
  local ind = indentation()
  local _e18
  if prefix then
    _e18 = prefix .. " "
  else
    _e18 = ""
  end
  local p = _e18
  local _e19
  if target == "js" then
    _e19 = ""
  else
    _e19 = "end"
  end
  local tr = _e19
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. _id13 .. _args .. " {\n" .. _body .. ind .. "}" .. tr)
  else
    return(p .. "function " .. _id13 .. _args .. "\n" .. _body .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _r60 = unstash({...})
  local _id14 = _r60
  local stmt = _id14.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _e20
      if stmt then
        _e20 = indentation()
      else
        _e20 = ""
      end
      local ind = _e20
      local _e21
      if atom63(form) then
        _e21 = compile_atom(form)
      else
        local _e22
        if infix63(hd(form)) then
          _e22 = compile_infix(form)
        else
          _e22 = compile_call(form)
        end
        _e21 = _e22
      end
      local _form = _e21
      return(ind .. _form .. tr)
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
  return(not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)))
end
local function lower_do(args, hoist, stmt63, tail63)
  local _x82 = almost(args)
  local _n10 = _35(_x82)
  local _i10 = 0
  while _i10 < _n10 do
    local x = _x82[_i10 + 1]
    local _y = lower(x, hoist, stmt63)
    if _y then
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
  add(hoist, {"set", lh, lower(rh, hoist)})
  if not( stmt63 and not tail63) then
    return(lh)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local _id16 = args
  local cond = _id16[1]
  local _then = _id16[2]
  local _else = _id16[3]
  if stmt63 or tail63 then
    local _e24
    if _else then
      _e24 = {lower_body({_else}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_then}, tail63)}, _e24)))
  else
    local e = unique("e")
    add(hoist, {"%local", e})
    local _e23
    if _else then
      _e23 = {lower({"set", e, _else})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _then})}, _e23))
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
    local _e25
    if x == "and" then
      _e25 = {"%if", _id18, b, _id18}
    else
      _e25 = {"%if", _id18, _id18, b}
    end
    return(lower({"do", {"%local", _id18, a}, _e25}, hoist))
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
  return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
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
  local _args1 = _id22[2]
  local body = cut(_id22, 2)
  return(add(hoist, {kind, name, _args1, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _form1 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_form1) then
    return(_form1)
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
            if x == "set" then
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
setenv("do", {_stash = true, tr = true, special = function (...)
  local forms = unstash({...})
  local s = ""
  local _x111 = forms
  local _n12 = _35(_x111)
  local _i12 = 0
  while _i12 < _n12 do
    local x = _x111[_i12 + 1]
    s = s .. compile(x, {_stash = true, stmt = true})
    _i12 = _i12 + 1
  end
  return(s)
end, stmt = true})
setenv("%if", {_stash = true, tr = true, special = function (cond, cons, alt)
  local _cond1 = compile(cond)
  indent_level = indent_level + 1
  local _x114 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _cons1 = _x114
  local _e26
  if alt then
    indent_level = indent_level + 1
    local _x115 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _e26 = _x115
  end
  local _alt1 = _e26
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
end, stmt = true})
setenv("while", {_stash = true, tr = true, special = function (cond, form)
  local _cond3 = compile(cond)
  indent_level = indent_level + 1
  local _x117 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x117
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _cond3 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _cond3 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true})
setenv("%for", {_stash = true, tr = true, special = function (t, k, form)
  local _t1 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _x119 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x119
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _t1 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _t1 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true})
setenv("%try", {_stash = true, tr = true, special = function (form)
  local e = unique("e")
  local ind = indentation()
  indent_level = indent_level + 1
  local _x125 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _x125
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _x129 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _x129
  return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
end, stmt = true})
setenv("%delete", {_stash = true, special = function (place)
  return(indentation() .. "delete " .. compile(place))
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return(indentation() .. "break")
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return(compile_function(args, body))
end})
setenv("%global-function", {_stash = true, tr = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, name = name})
    return(indentation() .. x)
  else
    return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true})
setenv("%local-function", {_stash = true, tr = true, special = function (name, args, body)
  if target == "lua" then
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return(indentation() .. x)
  else
    return(compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true})
setenv("return", {_stash = true, special = function (x)
  local _e27
  if nil63(x) then
    _e27 = "return"
  else
    _e27 = "return(" .. compile(x) .. ")"
  end
  local _x139 = _e27
  return(indentation() .. _x139)
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return("new " .. compile(x))
end})
setenv("error", {_stash = true, special = function (x)
  local _e28
  if target == "js" then
    _e28 = "throw " .. compile({"new", {"Error", x}})
  else
    _e28 = "error(" .. compile(x) .. ")"
  end
  local e = _e28
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local _id26 = compile(name)
  local value1 = compile(value)
  local _e29
  if is63(value) then
    _e29 = " = " .. value1
  else
    _e29 = ""
  end
  local rh = _e29
  local _e30
  if target == "js" then
    _e30 = "var "
  else
    _e30 = "local "
  end
  local keyword = _e30
  local ind = indentation()
  return(ind .. keyword .. _id26 .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _lh1 = compile(lh)
  local _e31
  if nil63(rh) then
    _e31 = "nil"
  else
    _e31 = rh
  end
  local _rh1 = compile(_e31)
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
  local _e32
  if target == "lua" then
    _e32 = "{"
  else
    _e32 = "["
  end
  local open = _e32
  local _e33
  if target == "lua" then
    _e33 = "}"
  else
    _e33 = "]"
  end
  local close = _e33
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
  local _e34
  if target == "lua" then
    _e34 = " = "
  else
    _e34 = ": "
  end
  local sep = _e34
  local _o11 = pair(forms)
  local k = nil
  for k in next, _o11 do
    local v = _o11[k]
    if number63(k) then
      local _id28 = v
      local _k2 = _id28[1]
      local _v2 = _id28[2]
      if not string63(_k2) then
        error("Illegal key: " .. string(_k2))
      end
      s = s .. c .. key(_k2) .. sep .. compile(_v2)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({run = run, expand = expand, compile = compile, eval = eval})
