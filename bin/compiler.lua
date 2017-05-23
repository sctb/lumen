local reader = require("reader")
local function getenv(k, p)
  if string63(k) then
    local _i = edge(environment)
    while _i >= 0 do
      local _b = environment[_i + 1][k]
      if is63(_b) then
        local _e8
        if p then
          _e8 = _b[p]
        else
          _e8 = _b
        end
        return(_e8)
      else
        _i = _i - 1
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
  local _b1 = first(function (frame)
    return(frame[k])
  end, reverse(environment))
  return(not atom63(_b1) and is63(_b1.variable))
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
    local _i1 = _names[x]
    _names[x] = _names[x] + 1
    return(unique(x .. _i1))
  else
    _names[x] = 1
    return("_" .. x)
  end
end
local function stash42(args)
  if keys63(args) then
    local _l = {"%object", "\"_stash\"", true}
    local __o = args
    local _k = nil
    for _k in next, __o do
      local _v = __o[_k]
      if not number63(_k) then
        add(_l, literal(_k))
        add(_l, _v)
      end
    end
    return(join(args, {_l}))
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
    local _id = unique("id")
    local _bs = {_id, rh}
    local __o1 = lh
    local _k1 = nil
    for _k1 in next, __o1 do
      local _v1 = __o1[_k1]
      local _e9
      if _k1 == "rest" then
        _e9 = {"cut", _id, _35(lh)}
      else
        _e9 = {"get", _id, {"quote", bias(_k1)}}
      end
      local _x5 = _e9
      if is63(_k1) then
        local _e10
        if _v1 == true then
          _e10 = _k1
        else
          _e10 = _v1
        end
        local _k2 = _e10
        _bs = join(_bs, bind(_k2, _x5))
      end
    end
    return(_bs)
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return({{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", from})
end})
function bind42(args, body)
  local _args1 = {}
  local function rest()
    _args1.rest = true
    if target == "js" then
      return({"unstash", {"arguments%", _35(_args1)}})
    else
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({_args1, join({"let", {args, rest()}}, body)})
  else
    local _bs1 = {}
    local _r20 = unique("r")
    local __o2 = args
    local _k3 = nil
    for _k3 in next, __o2 do
      local _v2 = __o2[_k3]
      if number63(_k3) then
        if atom63(_v2) then
          add(_args1, _v2)
        else
          local _x23 = unique("x")
          add(_args1, _x23)
          _bs1 = join(_bs1, {_v2, _x23})
        end
      end
    end
    if keys63(args) then
      _bs1 = join(_bs1, {_r20, rest()})
      local _n3 = _35(_args1)
      local _i5 = 0
      while _i5 < _n3 do
        local _v3 = _args1[_i5 + 1]
        _bs1 = join(_bs1, {_v3, {"destash!", _v3, _r20}})
        _i5 = _i5 + 1
      end
      _bs1 = join(_bs1, {keys(args), _r20})
    end
    return({_args1, join({"let", _bs1}, body)})
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
local function expand_local(_x31)
  local __id1 = _x31
  local _x32 = __id1[1]
  local _name = __id1[2]
  local _value = __id1[3]
  setenv(_name, {_stash = true, variable = true})
  return({"%local", _name, macroexpand(_value)})
end
local function expand_function(_x34)
  local __id2 = _x34
  local _x35 = __id2[1]
  local _args = __id2[2]
  local _body = cut(__id2, 2)
  add(environment, {})
  local __o3 = _args
  local __i6 = nil
  for __i6 in next, __o3 do
    local __x36 = __o3[__i6]
    setenv(__x36, {_stash = true, variable = true})
  end
  local __x37 = join({"%function", _args}, macroexpand(_body))
  drop(environment)
  return(__x37)
end
local function expand_definition(_x39)
  local __id3 = _x39
  local _x40 = __id3[1]
  local _name1 = __id3[2]
  local _args11 = __id3[3]
  local _body1 = cut(__id3, 3)
  add(environment, {})
  local __o4 = _args11
  local __i7 = nil
  for __i7 in next, __o4 do
    local __x41 = __o4[__i7]
    setenv(__x41, {_stash = true, variable = true})
  end
  local __x42 = join({_x40, _name1, _args11}, macroexpand(_body1))
  drop(environment)
  return(__x42)
end
local function expand_macro(form)
  return(macroexpand(expand1(form)))
end
function expand1(_x44)
  local __id4 = _x44
  local _name2 = __id4[1]
  local _body2 = cut(__id4, 1)
  return(apply(macro_function(_name2), _body2))
end
function macroexpand(form)
  if symbol63(form) then
    return(macroexpand(symbol_expansion(form)))
  else
    if atom63(form) then
      return(form)
    else
      local _x45 = hd(form)
      if _x45 == "%local" then
        return(expand_local(form))
      else
        if _x45 == "%function" then
          return(expand_function(form))
        else
          if _x45 == "%global-function" then
            return(expand_definition(form))
          else
            if _x45 == "%local-function" then
              return(expand_definition(form))
            else
              if macro63(_x45) then
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
  local _xs = {{"list"}}
  local __o5 = form
  local _k4 = nil
  for _k4 in next, __o5 do
    local _v4 = __o5[_k4]
    if not number63(_k4) then
      local _e11
      if quasisplice63(_v4, depth) then
        _e11 = quasiexpand(_v4[2])
      else
        _e11 = quasiexpand(_v4, depth)
      end
      local _v5 = _e11
      last(_xs)[_k4] = _v5
    end
  end
  local __x48 = form
  local __i9 = 0
  while __i9 < _35(__x48) do
    local _x49 = __x48[__i9 + 1]
    if quasisplice63(_x49, depth) then
      local _x50 = quasiexpand(_x49[2])
      add(_xs, _x50)
      add(_xs, {"list"})
    else
      add(last(_xs), quasiexpand(_x49, depth))
    end
    __i9 = __i9 + 1
  end
  local _pruned = keep(function (x)
    return(_35(x) > 1 or not( hd(x) == "list") or keys63(x))
  end, _xs)
  if one63(_pruned) then
    return(hd(_pruned))
  else
    return(join({"join"}, _pruned))
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
  local __id5 = _x54
  local _a = __id5[1]
  local _b2 = __id5[2]
  local _c = cut(__id5, 2)
  if is63(_b2) then
    return({join({"%if", _a, _b2}, expand_if(_c))})
  else
    if is63(_a) then
      return({_a})
    end
  end
end
indent_level = 0
function indentation()
  local _s = ""
  local _i10 = 0
  while _i10 < indent_level do
    _s = _s .. "  "
    _i10 = _i10 + 1
  end
  return(_s)
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return(has63(reserved, x))
end
local function valid_code63(n)
  return(number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
end
function valid_id63(id)
  if none63(id) or reserved63(id) then
    return(false)
  else
    local _i11 = 0
    while _i11 < _35(id) do
      if not valid_code63(code(id, _i11)) then
        return(false)
      end
      _i11 = _i11 + 1
    end
    return(true)
  end
end
function key(k)
  local _i12 = inner(k)
  if valid_id63(_i12) then
    return(_i12)
  else
    if target == "js" then
      return(k)
    else
      return("[" .. k .. "]")
    end
  end
end
function mapo(f, t)
  local _o6 = {}
  local __o7 = t
  local _k5 = nil
  for _k5 in next, __o7 do
    local _v6 = __o7[_k5]
    local _x58 = f(_v6)
    if is63(_x58) then
      add(_o6, literal(_k5))
      add(_o6, _x58)
    end
  end
  return(_o6)
end
local __x60 = {}
local __x61 = {}
__x61.js = "!"
__x61.lua = "not"
__x60["not"] = __x61
local __x62 = {}
__x62["*"] = true
__x62["/"] = true
__x62["%"] = true
local __x63 = {}
__x63["+"] = true
__x63["-"] = true
local __x64 = {}
local __x65 = {}
__x65.js = "+"
__x65.lua = ".."
__x64.cat = __x65
local __x66 = {}
__x66["<"] = true
__x66[">"] = true
__x66["<="] = true
__x66[">="] = true
local __x67 = {}
local __x68 = {}
__x68.js = "==="
__x68.lua = "=="
__x67["="] = __x68
local __x69 = {}
local __x70 = {}
__x70.js = "&&"
__x70.lua = "and"
__x69["and"] = __x70
local __x71 = {}
local __x72 = {}
__x72.js = "||"
__x72.lua = "or"
__x71["or"] = __x72
local infix = {__x60, __x62, __x63, __x64, __x66, __x67, __x69, __x71}
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
    local __o8 = infix
    local _k6 = nil
    for _k6 in next, __o8 do
      local _v7 = __o8[_k6]
      if _v7[hd(form)] then
        return(index(_k6))
      end
    end
  end
  return(0)
end
local function getop(op)
  return(find(function (level)
    local _x74 = level[op]
    if _x74 == true then
      return(op)
    else
      if is63(_x74) then
        return(_x74[target])
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
  local _s1 = "("
  local _c1 = ""
  local __x75 = args
  local __i15 = 0
  while __i15 < _35(__x75) do
    local _x76 = __x75[__i15 + 1]
    _s1 = _s1 .. _c1 .. compile(_x76)
    _c1 = ", "
    __i15 = __i15 + 1
  end
  return(_s1 .. ")")
end
local function escape_newlines(s)
  local _s11 = ""
  local _i16 = 0
  while _i16 < _35(s) do
    local _c2 = char(s, _i16)
    local _e12
    if _c2 == "\n" then
      _e12 = "\\n"
    else
      _e12 = _c2
    end
    _s11 = _s11 .. _e12
    _i16 = _i16 + 1
  end
  return(_s11)
end
local function id(id)
  local _e13
  if number_code63(code(id, 0)) then
    _e13 = "_"
  else
    _e13 = ""
  end
  local _id11 = _e13
  local _i17 = 0
  while _i17 < _35(id) do
    local _c3 = char(id, _i17)
    local _n9 = code(_c3)
    local _e14
    if _c3 == "-" and not( id == "-") then
      _e14 = "_"
    else
      local _e15
      if valid_code63(_n9) then
        _e15 = _c3
      else
        local _e16
        if _i17 == 0 then
          _e16 = "_" .. _n9
        else
          _e16 = _n9
        end
        _e15 = _e16
      end
      _e14 = _e15
    end
    local _c11 = _e14
    _id11 = _id11 .. _c11
    _i17 = _i17 + 1
  end
  if reserved63(_id11) then
    return("_" .. _id11)
  else
    return(_id11)
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
  local __id6 = form
  local _x77 = __id6[1]
  local _args2 = cut(__id6, 1)
  local __id7 = getenv(_x77)
  local _special = __id7.special
  local _stmt = __id7.stmt
  local _self_tr63 = __id7.tr
  local _tr = terminator(stmt63 and not _self_tr63)
  return(apply(_special, _args2) .. _tr)
end
local function parenthesize_call63(x)
  return(not atom63(x) and hd(x) == "%function" or precedence(x) > 0)
end
local function compile_call(form)
  local _f = hd(form)
  local _f1 = compile(_f)
  local _args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(_f) then
    return("(" .. _f1 .. ")" .. _args3)
  else
    return(_f1 .. _args3)
  end
end
local function op_delims(parent, child, ...)
  local __r57 = unstash({...})
  local _parent = destash33(parent, __r57)
  local _child = destash33(child, __r57)
  local __id8 = __r57
  local _right = __id8.right
  local _e17
  if _right then
    _e17 = _6261
  else
    _e17 = _62
  end
  if _e17(precedence(_child), precedence(_parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local __id9 = form
  local _op = __id9[1]
  local __id10 = cut(__id9, 1)
  local _a1 = __id10[1]
  local _b3 = __id10[2]
  local __id111 = op_delims(form, _a1)
  local _ao = __id111[1]
  local _ac = __id111[2]
  local __id12 = op_delims(form, _b3, {_stash = true, right = true})
  local _bo = __id12[1]
  local _bc = __id12[2]
  local _a2 = compile(_a1)
  local _b4 = compile(_b3)
  local _op1 = getop(_op)
  if unary63(form) then
    return(_op1 .. _ao .. " " .. _a2 .. _ac)
  else
    return(_ao .. _a2 .. _ac .. " " .. _op1 .. " " .. _bo .. _b4 .. _bc)
  end
end
function compile_function(args, body, ...)
  local __r59 = unstash({...})
  local _args4 = destash33(args, __r59)
  local _body3 = destash33(body, __r59)
  local __id13 = __r59
  local _name3 = __id13.name
  local _prefix = __id13.prefix
  local _e18
  if _name3 then
    _e18 = compile(_name3)
  else
    _e18 = ""
  end
  local _id14 = _e18
  local _e19
  if target == "lua" and _args4.rest then
    _e19 = join(_args4, {"|...|"})
  else
    _e19 = _args4
  end
  local _args12 = _e19
  local _args5 = compile_args(_args12)
  indent_level = indent_level + 1
  local __x83 = compile(_body3, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body4 = __x83
  local _ind = indentation()
  local _e20
  if _prefix then
    _e20 = _prefix .. " "
  else
    _e20 = ""
  end
  local _p = _e20
  local _e21
  if target == "js" then
    _e21 = ""
  else
    _e21 = "end"
  end
  local _tr1 = _e21
  if _name3 then
    _tr1 = _tr1 .. "\n"
  end
  if target == "js" then
    return("function " .. _id14 .. _args5 .. " {\n" .. _body4 .. _ind .. "}" .. _tr1)
  else
    return(_p .. "function " .. _id14 .. _args5 .. "\n" .. _body4 .. _ind .. _tr1)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local __r61 = unstash({...})
  local _form = destash33(form, __r61)
  local __id15 = __r61
  local _stmt1 = __id15.stmt
  if nil63(_form) then
    return("")
  else
    if special_form63(_form) then
      return(compile_special(_form, _stmt1))
    else
      local _tr2 = terminator(_stmt1)
      local _e22
      if _stmt1 then
        _e22 = indentation()
      else
        _e22 = ""
      end
      local _ind1 = _e22
      local _e23
      if atom63(_form) then
        _e23 = compile_atom(_form)
      else
        local _e24
        if infix63(hd(_form)) then
          _e24 = compile_infix(_form)
        else
          _e24 = compile_call(_form)
        end
        _e23 = _e24
      end
      local _form1 = _e23
      return(_ind1 .. _form1 .. _tr2)
    end
  end
end
local function lower_statement(form, tail63)
  local _hoist = {}
  local _e = lower(form, _hoist, true, tail63)
  if some63(_hoist) and is63(_e) then
    return(join({"do"}, _hoist, {_e}))
  else
    if is63(_e) then
      return(_e)
    else
      if _35(_hoist) > 1 then
        return(join({"do"}, _hoist))
      else
        return(hd(_hoist))
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
  local __x89 = almost(args)
  local __i18 = 0
  while __i18 < _35(__x89) do
    local _x90 = __x89[__i18 + 1]
    local __y = lower(_x90, hoist, stmt63)
    if yes(__y) then
      local _e1 = __y
      if standalone63(_e1) then
        add(hoist, _e1)
      end
    end
    __i18 = __i18 + 1
  end
  local _e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(_e2) then
    return({"return", _e2})
  else
    return(_e2)
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local __id16 = args
  local _lh = __id16[1]
  local _rh = __id16[2]
  add(hoist, {"%set", _lh, lower(_rh, hoist)})
  if not( stmt63 and not tail63) then
    return(_lh)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local __id17 = args
  local _cond = __id17[1]
  local _then = __id17[2]
  local _else = __id17[3]
  if stmt63 then
    local _e26
    if is63(_else) then
      _e26 = {lower_body({_else}, tail63)}
    end
    return(add(hoist, join({"%if", lower(_cond, hoist), lower_body({_then}, tail63)}, _e26)))
  else
    local _e3 = unique("e")
    add(hoist, {"%local", _e3})
    local _e25
    if is63(_else) then
      _e25 = {lower({"%set", _e3, _else})}
    end
    add(hoist, join({"%if", lower(_cond, hoist), lower({"%set", _e3, _then})}, _e25))
    return(_e3)
  end
end
local function lower_short(x, args, hoist)
  local __id18 = args
  local _a3 = __id18[1]
  local _b5 = __id18[2]
  local _hoist1 = {}
  local _b11 = lower(_b5, _hoist1)
  if some63(_hoist1) then
    local _id19 = unique("id")
    local _e27
    if x == "and" then
      _e27 = {"%if", _id19, _b5, _id19}
    else
      _e27 = {"%if", _id19, _id19, _b5}
    end
    return(lower({"do", {"%local", _id19, _a3}, _e27}, hoist))
  else
    return({x, lower(_a3, hoist), _b11})
  end
end
local function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
local function lower_while(args, hoist)
  local __id20 = args
  local _c4 = __id20[1]
  local _body5 = cut(__id20, 1)
  local _pre = {}
  local _c5 = lower(_c4, _pre)
  local _e28
  if none63(_pre) then
    _e28 = {"while", _c5, lower_body(_body5)}
  else
    _e28 = {"while", true, join({"do"}, _pre, {{"%if", {"not", _c5}, {"break"}}, lower_body(_body5)})}
  end
  return(add(hoist, _e28))
end
local function lower_for(args, hoist)
  local __id21 = args
  local _t = __id21[1]
  local _k7 = __id21[2]
  local _body6 = cut(__id21, 2)
  return(add(hoist, {"%for", lower(_t, hoist), _k7, lower_body(_body6)}))
end
local function lower_function(args)
  local __id22 = args
  local _a4 = __id22[1]
  local _body7 = cut(__id22, 1)
  return({"%function", _a4, lower_body(_body7, true)})
end
local function lower_definition(kind, args, hoist)
  local __id23 = args
  local _name4 = __id23[1]
  local _args6 = __id23[2]
  local _body8 = cut(__id23, 2)
  return(add(hoist, {kind, _name4, _args6, lower_body(_body8, true)}))
end
local function lower_call(form, hoist)
  local _form2 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_form2) then
    return(_form2)
  end
end
local function pairwise63(form)
  return(in63(hd(form), {"<", "<=", "=", ">=", ">"}))
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local _e4 = {}
    local __id24 = form
    local _x119 = __id24[1]
    local _args7 = cut(__id24, 1)
    reduce(function (a, b)
      add(_e4, {_x119, a, b})
      return(a)
    end, _args7)
    return(join({"and"}, reverse(_e4)))
  else
    return(form)
  end
end
local function lower_infix63(form)
  return(infix63(hd(form)) and _35(form) > 3)
end
local function lower_infix(form, hoist)
  local _form3 = lower_pairwise(form)
  local __id25 = _form3
  local _x122 = __id25[1]
  local _args8 = cut(__id25, 1)
  return(lower(reduce(function (a, b)
    return({_x122, b, a})
  end, reverse(_args8)), hoist))
end
local function lower_special(form, hoist)
  local _e5 = lower_call(form, hoist)
  if _e5 then
    return(add(hoist, _e5))
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
          local __id26 = form
          local _x125 = __id26[1]
          local _args9 = cut(__id26, 1)
          if _x125 == "do" then
            return(lower_do(_args9, hoist, stmt63, tail63))
          else
            if _x125 == "%set" then
              return(lower_set(_args9, hoist, stmt63, tail63))
            else
              if _x125 == "%if" then
                return(lower_if(_args9, hoist, stmt63, tail63))
              else
                if _x125 == "%try" then
                  return(lower_try(_args9, hoist, tail63))
                else
                  if _x125 == "while" then
                    return(lower_while(_args9, hoist))
                  else
                    if _x125 == "%for" then
                      return(lower_for(_args9, hoist))
                    else
                      if _x125 == "%function" then
                        return(lower_function(_args9))
                      else
                        if _x125 == "%local-function" or _x125 == "%global-function" then
                          return(lower_definition(_x125, _args9, hoist))
                        else
                          if in63(_x125, {"and", "or"}) then
                            return(lower_short(_x125, _args9, hoist))
                          else
                            if statement63(_x125) then
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
  local _previous = target
  target = "lua"
  local _code = compile(expand({"set", "%result", form}))
  target = _previous
  run(_code)
  return(_37result)
end
setenv("do", {_stash = true, special = function (...)
  local _forms = unstash({...})
  local _s2 = ""
  local __x129 = _forms
  local __i19 = 0
  while __i19 < _35(__x129) do
    local _x130 = __x129[__i19 + 1]
    _s2 = _s2 .. compile(_x130, {_stash = true, stmt = true})
    if not atom63(_x130) then
      if hd(_x130) == "return" or hd(_x130) == "break" then
        break
      end
    end
    __i19 = __i19 + 1
  end
  return(_s2)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local _cond1 = compile(cond)
  indent_level = indent_level + 1
  local __x131 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _cons = __x131
  local _e29
  if alt then
    indent_level = indent_level + 1
    local __x132 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _e29 = __x132
  end
  local _alt = _e29
  local _ind2 = indentation()
  local _s3 = ""
  if target == "js" then
    _s3 = _s3 .. _ind2 .. "if (" .. _cond1 .. ") {\n" .. _cons .. _ind2 .. "}"
  else
    _s3 = _s3 .. _ind2 .. "if " .. _cond1 .. " then\n" .. _cons
  end
  if _alt and target == "js" then
    _s3 = _s3 .. " else {\n" .. _alt .. _ind2 .. "}"
  else
    if _alt then
      _s3 = _s3 .. _ind2 .. "else\n" .. _alt
    end
  end
  if target == "lua" then
    return(_s3 .. _ind2 .. "end\n")
  else
    return(_s3 .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local _cond2 = compile(cond)
  indent_level = indent_level + 1
  local __x133 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body9 = __x133
  local _ind3 = indentation()
  if target == "js" then
    return(_ind3 .. "while (" .. _cond2 .. ") {\n" .. _body9 .. _ind3 .. "}\n")
  else
    return(_ind3 .. "while " .. _cond2 .. " do\n" .. _body9 .. _ind3 .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local _t1 = compile(t)
  local _ind4 = indentation()
  indent_level = indent_level + 1
  local __x134 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body10 = __x134
  if target == "lua" then
    return(_ind4 .. "for " .. k .. " in next, " .. _t1 .. " do\n" .. _body10 .. _ind4 .. "end\n")
  else
    return(_ind4 .. "for (" .. k .. " in " .. _t1 .. ") {\n" .. _body10 .. _ind4 .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local _e6 = unique("e")
  local _ind5 = indentation()
  indent_level = indent_level + 1
  local __x135 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _body11 = __x135
  local _hf = {"return", {"%array", false, _e6}}
  indent_level = indent_level + 1
  local __x138 = compile(_hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _h = __x138
  return(_ind5 .. "try {\n" .. _body11 .. _ind5 .. "}\n" .. _ind5 .. "catch (" .. _e6 .. ") {\n" .. _h .. _ind5 .. "}\n")
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
    local _x139 = compile_function(args, body, {_stash = true, name = name})
    return(indentation() .. _x139)
  else
    return(compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local _x142 = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return(indentation() .. _x142)
  else
    return(compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true}))
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local _e30
  if nil63(x) then
    _e30 = "return"
  else
    _e30 = "return(" .. compile(x) .. ")"
  end
  local _x145 = _e30
  return(indentation() .. _x145)
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return("new " .. compile(x))
end})
setenv("typeof", {_stash = true, special = function (x)
  return("typeof(" .. compile(x) .. ")")
end})
setenv("error", {_stash = true, special = function (x)
  local _e31
  if target == "js" then
    _e31 = "throw " .. compile({"new", {"Error", x}})
  else
    _e31 = "error(" .. compile(x) .. ")"
  end
  local _e7 = _e31
  return(indentation() .. _e7)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local _id27 = compile(name)
  local _value1 = compile(value)
  local _e32
  if is63(value) then
    _e32 = " = " .. _value1
  else
    _e32 = ""
  end
  local _rh1 = _e32
  local _e33
  if target == "js" then
    _e33 = "var "
  else
    _e33 = "local "
  end
  local _keyword = _e33
  local _ind6 = indentation()
  return(_ind6 .. _keyword .. _id27 .. _rh1)
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local _lh1 = compile(lh)
  local _e34
  if nil63(rh) then
    _e34 = "nil"
  else
    _e34 = rh
  end
  local _rh2 = compile(_e34)
  return(indentation() .. _lh1 .. " = " .. _rh2)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _t11 = compile(t)
  local _k11 = compile(k)
  if target == "lua" and char(_t11, 0) == "{" or infix_operator63(t) then
    _t11 = "(" .. _t11 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_t11 .. "." .. inner(k))
  else
    return(_t11 .. "[" .. _k11 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local _forms1 = unstash({...})
  local _e35
  if target == "lua" then
    _e35 = "{"
  else
    _e35 = "["
  end
  local _open = _e35
  local _e36
  if target == "lua" then
    _e36 = "}"
  else
    _e36 = "]"
  end
  local _close = _e36
  local _s4 = ""
  local _c6 = ""
  local __o9 = _forms1
  local _k8 = nil
  for _k8 in next, __o9 do
    local _v8 = __o9[_k8]
    if number63(_k8) then
      _s4 = _s4 .. _c6 .. compile(_v8)
      _c6 = ", "
    end
  end
  return(_open .. _s4 .. _close)
end})
setenv("%object", {_stash = true, special = function (...)
  local _forms2 = unstash({...})
  local _s5 = "{"
  local _c7 = ""
  local _e37
  if target == "lua" then
    _e37 = " = "
  else
    _e37 = ": "
  end
  local _sep = _e37
  local __o10 = pair(_forms2)
  local _k9 = nil
  for _k9 in next, __o10 do
    local _v9 = __o10[_k9]
    if number63(_k9) then
      local __id28 = _v9
      local _k10 = __id28[1]
      local _v10 = __id28[2]
      if not string63(_k10) then
        error("Illegal key: " .. str(_k10))
      end
      _s5 = _s5 .. _c7 .. key(_k10) .. _sep .. compile(_v10)
      _c7 = ", "
    end
  end
  return(_s5 .. "}")
end})
setenv("%literal", {_stash = true, special = function (...)
  local _args10 = unstash({...})
  return(apply(cat, map(compile, _args10)))
end})
return({run = run, eval = eval, expand = expand, compile = compile})
