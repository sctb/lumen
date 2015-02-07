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
  return(obj63(form) and special63(hd(form)))
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
    return(frame[k] or frame._scope)
  end, reverse(environment))
  return(obj63(b) and is63(b.variable))
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
local _uid116 = 0
function unique(x)
  _uid116 = _uid116 + 1
  return("_u" .. x .. _uid116)
end
local function stash42(args)
  if keys63(args) then
    local l = {"%object", "\"_stash\"", true}
    local _uo20 = args
    local k = nil
    for k in next, _uo20 do
      local v = _uo20[k]
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
  if obj63(lh) and obj63(rh) then
    local id = unique("id")
    return(join({{id, rh}}, bind(lh, id)))
  else
    if atom63(lh) then
      return({{lh, rh}})
    else
      local bs = {}
      local _uo30 = lh
      local k = nil
      for k in next, _uo30 do
        local v = _uo30[k]
        local _ue349
        if k == "rest" then
          _ue349 = {"cut", rh, _35(lh)}
        else
          _ue349 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _ue349
        if is63(k) then
          local _ue350
          if v == true then
            _ue350 = k
          else
            _ue350 = v
          end
          local _uid136 = _ue350
          bs = join(bs, bind(_uid136, x))
        end
      end
      return(bs)
    end
  end
end
function bind42(args, body)
  local args1 = {}
  local function rest()
    if target == "js" then
      return({"unstash", {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", _35(args1)}})
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
    local _uo52 = args
    local k = nil
    for k in next, _uo52 do
      local v = _uo52[k]
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
  return(can_unquote63(depth) and obj63(x) and hd(x) == "unquote-splicing")
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
        local _uid165 = form[1]
        local name = form[2]
        local value = form[3]
        return({"%local", name, macroexpand(value)})
      else
        if x == "%function" then
          local _uid167 = form[1]
          local args = form[2]
          local body = cut(form, 2)
          add(environment, {_scope = true})
          local _uo70 = args
          local _ui72 = nil
          for _ui72 in next, _uo70 do
            local _ux68 = _uo70[_ui72]
            setenv(_ux68, {_stash = true, variable = true})
          end
          local _ux69 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_ux69)
        else
          if x == "%local-function" or x == "%global-function" then
            local _uid174 = form[1]
            local _uid175 = form[2]
            local _uid176 = form[3]
            local _uid177 = cut(form, 3)
            add(environment, {_scope = true})
            local _uo80 = _uid176
            local _ui82 = nil
            for _ui82 in next, _uo80 do
              local _ux78 = _uo80[_ui82]
              setenv(_ux78, {_stash = true, variable = true})
            end
            local _ux79 = join({_uid174, _uid175, _uid176}, macroexpand(_uid177))
            drop(environment)
            return(_ux79)
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
local function quasiquote_list(form, depth)
  local xs = {{"list"}}
  local _uo87 = form
  local k = nil
  for k in next, _uo87 do
    local v = _uo87[k]
    if not number63(k) then
      local _ue351
      if quasisplice63(v, depth) then
        _ue351 = quasiexpand(v[2])
      else
        _ue351 = quasiexpand(v, depth)
      end
      local _uid190 = _ue351
      last(xs)[k] = _uid190
    end
  end
  local _ux91 = form
  local _un92 = _35(_ux91)
  local _ui93 = 0
  while _ui93 < _un92 do
    local x = _ux91[_ui93 + 1]
    if quasisplice63(x, depth) then
      local _uid194 = quasiexpand(x[2])
      add(xs, _uid194)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _ui93 = _ui93 + 1
  end
  local pruned = keep(function (x)
    return(_35(x) > 1 or not (hd(x) == "list") or keys63(x))
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
function expand_if(_ux102)
  local a = _ux102[1]
  local b = _ux102[2]
  local c = cut(_ux102, 2)
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
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
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
  local _uo112 = t
  local k = nil
  for k in next, _uo112 do
    local v = _uo112[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local _uid1117 = {}
local _uid118 = {}
_uid118.js = "!"
_uid118.lua = "not "
_uid1117["not"] = _uid118
local _uid1120 = {}
_uid1120["*"] = true
_uid1120["/"] = true
_uid1120["%"] = true
local _uid1122 = {}
_uid1122["+"] = true
_uid1122["-"] = true
local _uid1124 = {}
local _uid125 = {}
_uid125.js = "+"
_uid125.lua = ".."
_uid1124.cat = _uid125
local _uid1127 = {}
_uid1127["<"] = true
_uid1127[">"] = true
_uid1127["<="] = true
_uid1127[">="] = true
local _uid1129 = {}
local _uid130 = {}
_uid130.js = "==="
_uid130.lua = "=="
_uid1129["="] = _uid130
local _uid1132 = {}
local _uid133 = {}
_uid133.js = "&&"
_uid133.lua = "and"
_uid1132["and"] = _uid133
local _uid1135 = {}
local _uid136 = {}
_uid136.js = "||"
_uid136.lua = "or"
_uid1135["or"] = _uid136
local infix = {_uid1117, _uid1120, _uid1122, _uid1124, _uid1127, _uid1129, _uid1132, _uid1135}
local function unary63(form)
  return(_35(form) == 2 and in63(hd(form), {"not", "-"}))
end
local function index(k)
  if number63(k) then
    return(k - 1)
  end
end
local function precedence(form)
  if not (atom63(form) or unary63(form)) then
    local _uo141 = infix
    local k = nil
    for k in next, _uo141 do
      local v = _uo141[k]
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
  local _ux148 = args
  local _un149 = _35(_ux148)
  local _ui150 = 0
  while _ui150 < _un149 do
    local x = _ux148[_ui150 + 1]
    s = s .. c .. compile(x)
    c = ", "
    _ui150 = _ui150 + 1
  end
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _ue352
    if c == "\n" then
      _ue352 = "\\n"
    else
      _ue352 = c
    end
    s1 = s1 .. _ue352
    i = i + 1
  end
  return(s1 .. "")
end
local function id(id)
  local id1 = ""
  local i = 0
  while i < _35(id) do
    local c = char(id, i)
    local n = code(c)
    local _ue353
    if c == "-" then
      _ue353 = "_"
    else
      local _ue354
      if valid_code63(n) then
        _ue354 = c
      else
        local _ue355
        if i == 0 then
          _ue355 = "_" .. n
        else
          _ue355 = n
        end
        _ue354 = _ue355
      end
      _ue353 = _ue354
    end
    local c1 = _ue353
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
  local x = form[1]
  local args = cut(form, 1)
  local _uid156 = getenv(x)
  local special = _uid156.special
  local stmt = _uid156.stmt
  local self_tr63 = _uid156.tr
  local tr = terminator(stmt63 and not self_tr63)
  return(apply(special, args) .. tr)
end
local function parenthesize_call63(x)
  return(obj63(x) and hd(x) == "%function" or precedence(x) > 0)
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
  local _ur159 = unstash({...})
  local right = _ur159.right
  local _ue356
  if right then
    _ue356 = _6261
  else
    _ue356 = _62
  end
  if _ue356(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local op = form[1]
  local _uid164 = cut(form, 1)
  local a = _uid164[1]
  local b = _uid164[2]
  local _uid165 = op_delims(form, a)
  local ao = _uid165[1]
  local ac = _uid165[2]
  local _uid166 = op_delims(form, b, {_stash = true, right = true})
  local bo = _uid166[1]
  local bc = _uid166[2]
  local _uid1167 = compile(a)
  local _uid1168 = compile(b)
  local _uid1169 = getop(op)
  if unary63(form) then
    return(_uid1169 .. ao .. _uid1167 .. ac)
  else
    return(ao .. _uid1167 .. ac .. " " .. _uid1169 .. " " .. bo .. _uid1168 .. bc)
  end
end
function compile_function(args, body, ...)
  local _ur170 = unstash({...})
  local name = _ur170.name
  local prefix = _ur170.prefix
  local _ue357
  if name then
    _ue357 = compile(name)
  else
    _ue357 = ""
  end
  local id = _ue357
  local _uid1172 = compile_args(args)
  indent_level = indent_level + 1
  local _ux174 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _uid1173 = _ux174
  local ind = indentation()
  local _ue358
  if prefix then
    _ue358 = prefix .. " "
  else
    _ue358 = ""
  end
  local p = _ue358
  local _ue359
  if target == "js" then
    _ue359 = ""
  else
    _ue359 = "end"
  end
  local tr = _ue359
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _uid1172 .. " {\n" .. _uid1173 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _uid1172 .. "\n" .. _uid1173 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _ur176 = unstash({...})
  local stmt = _ur176.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _ue360
      if stmt then
        _ue360 = indentation()
      else
        _ue360 = ""
      end
      local ind = _ue360
      local _ue361
      if atom63(form) then
        _ue361 = compile_atom(form)
      else
        local _ue362
        if infix63(hd(form)) then
          _ue362 = compile_infix(form)
        else
          _ue362 = compile_call(form)
        end
        _ue361 = _ue362
      end
      local _uid1178 = _ue361
      return(ind .. _uid1178 .. tr)
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
local function lower_do(args, hoist, stmt63, tail63)
  local _ux186 = butlast(args)
  local _un187 = _35(_ux186)
  local _ui188 = 0
  while _ui188 < _un187 do
    local x = _ux186[_ui188 + 1]
    add(hoist, lower(x, hoist, stmt63))
    _ui188 = _ui188 + 1
  end
  local e = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(e) then
    return({"return", e})
  else
    return(e)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local cond = args[1]
  local _uid1191 = args[2]
  local _uid1192 = args[3]
  if stmt63 or tail63 then
    local _ue364
    if _uid1192 then
      _ue364 = {lower_body({_uid1192}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_uid1191}, tail63)}, _ue364)))
  else
    local e = unique("e")
    add(hoist, {"%local", e})
    local _ue363
    if _uid1192 then
      _ue363 = {lower({"set", e, _uid1192})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _uid1191})}, _ue363))
    return(e)
  end
end
local function lower_short(x, args, hoist)
  local a = args[1]
  local b = args[2]
  local hoist1 = {}
  local b1 = lower(b, hoist1)
  if some63(hoist1) then
    local id = unique("id")
    local _ue365
    if x == "and" then
      _ue365 = {"%if", id, b, id}
    else
      _ue365 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _ue365}, hoist))
  else
    return({x, lower(a, hoist), b1})
  end
end
local function lower_try(args, hoist, tail63)
  return(add(hoist, {"%try", lower_body(args, tail63)}))
end
local function lower_while(args, hoist)
  local c = args[1]
  local body = cut(args, 1)
  return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
end
local function lower_for(args, hoist)
  local t = args[1]
  local k = args[2]
  local body = cut(args, 2)
  return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
end
local function lower_function(args)
  local a = args[1]
  local body = cut(args, 1)
  return({"%function", a, lower_body(body, true)})
end
local function lower_definition(kind, args, hoist)
  local name = args[1]
  local _uid1217 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _uid1217, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _uid1220 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_uid1220) then
    return(_uid1220)
  end
end
local function lower_infix63(form)
  return(infix63(hd(form)) and _35(form) > 3)
end
local function lower_infix(form, hoist)
  local x = form[1]
  local args = cut(form, 1)
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
local function run_file(path)
  return(run(read_file(path)))
end
local function compile_file(path)
  local s = reader.stream(read_file(path))
  local body = reader["read-all"](s)
  local form = expand(join({"do"}, body))
  return(compile(form, {_stash = true, stmt = true}))
end
setenv("do", {_stash = true, special = function (...)
  local forms = unstash({...})
  local s = ""
  local _ux241 = forms
  local _un242 = _35(_ux241)
  local _ui243 = 0
  while _ui243 < _un242 do
    local x = _ux241[_ui243 + 1]
    s = s .. compile(x, {_stash = true, stmt = true})
    _ui243 = _ui243 + 1
  end
  return(s)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local _uid1252 = compile(cond)
  indent_level = indent_level + 1
  local _ux254 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _uid1253 = _ux254
  local _ue366
  if alt then
    indent_level = indent_level + 1
    local _ux256 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _ue366 = _ux256
  end
  local _uid1255 = _ue366
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _uid1252 .. ") {\n" .. _uid1253 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _uid1252 .. " then\n" .. _uid1253
  end
  if _uid1255 and target == "js" then
    s = s .. " else {\n" .. _uid1255 .. ind .. "}"
  else
    if _uid1255 then
      s = s .. ind .. "else\n" .. _uid1255
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local _uid1261 = compile(cond)
  indent_level = indent_level + 1
  local _ux262 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux262
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _uid1261 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _uid1261 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local _uid1267 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _ux268 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux268
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _uid1267 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _uid1267 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local e = unique("e")
  local ind = indentation()
  indent_level = indent_level + 1
  local _ux276 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux276
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _ux280 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _ux280
  return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
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
  local _ue367
  if nil63(x) then
    _ue367 = "return"
  else
    _ue367 = "return(" .. compile(x) .. ")"
  end
  local _uid1303 = _ue367
  return(indentation() .. _uid1303)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _ue368
  if target == "js" then
    _ue368 = "throw new " .. compile({"Error", x})
  else
    _ue368 = "error(" .. compile(x) .. ")"
  end
  local e = _ue368
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _ue369
  if is63(value) then
    _ue369 = " = " .. value1
  else
    _ue369 = ""
  end
  local rh = _ue369
  local _ue370
  if target == "js" then
    _ue370 = "var "
  else
    _ue370 = "local "
  end
  local keyword = _ue370
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _uid1318 = compile(lh)
  local _ue371
  if nil63(rh) then
    _ue371 = "nil"
  else
    _ue371 = rh
  end
  local _uid1319 = compile(_ue371)
  return(indentation() .. _uid1318 .. " = " .. _uid1319)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _uid1323 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_uid1323, 0) == "{" then
    _uid1323 = "(" .. _uid1323 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_uid1323 .. "." .. inner(k))
  else
    return(_uid1323 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _ue372
  if target == "lua" then
    _ue372 = "{"
  else
    _ue372 = "["
  end
  local open = _ue372
  local _ue373
  if target == "lua" then
    _ue373 = "}"
  else
    _ue373 = "]"
  end
  local close = _ue373
  local s = ""
  local c = ""
  local _uo332 = forms
  local k = nil
  for k in next, _uo332 do
    local v = _uo332[k]
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
  local _ue374
  if target == "lua" then
    _ue374 = " = "
  else
    _ue374 = ": "
  end
  local sep = _ue374
  local _uo344 = pair(forms)
  local k = nil
  for k in next, _uo344 do
    local v = _uo344[k]
    if number63(k) then
      local _uid1347 = v[1]
      local _uid1348 = v[2]
      if not string63(_uid1347) then
        error("Illegal key: " .. string(_uid1347))
      end
      s = s .. c .. key(_uid1347) .. sep .. compile(_uid1348)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({eval = eval, ["run-file"] = run_file, ["compile-file"] = compile_file, expand = expand, compile = compile})
