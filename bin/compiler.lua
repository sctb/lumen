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
local function stash42(args)
  if keys63(args) then
    local l = {"%object", "\"_stash\"", true}
    local _u21 = args
    local k = nil
    for k in next, _u21 do
      local v = _u21[k]
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
    local id = unique()
    return(join({{id, rh}}, bind(lh, id)))
  else
    if atom63(lh) then
      return({{lh, rh}})
    else
      local bs = {}
      local _u30 = lh
      local k = nil
      for k in next, _u30 do
        local v = _u30[k]
        local _u316
        if k == "rest" then
          _u316 = {"cut", rh, _35(lh)}
        else
          _u316 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _u316
        if is63(k) then
          local _u317
          if v == true then
            _u317 = k
          else
            _u317 = v
          end
          local _u35 = _u317
          bs = join(bs, bind(_u35, x))
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
    local r = unique()
    local _u51 = args
    local k = nil
    for k in next, _u51 do
      local v = _u51[k]
      if number63(k) then
        if atom63(v) then
          add(args1, v)
        else
          local x = unique()
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
        local _u1 = form[1]
        local name = form[2]
        local value = form[3]
        return({"%local", name, macroexpand(value)})
      else
        if x == "%function" then
          local _u2 = form[1]
          local args = form[2]
          local body = cut(form, 2)
          add(environment, {_scope = true})
          local _u66 = args
          local _u1 = nil
          for _u1 in next, _u66 do
            local _u64 = _u66[_u1]
            setenv(_u64, {_stash = true, variable = true})
          end
          local _u65 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_u65)
        else
          if x == "%local-function" or x == "%global-function" then
            local _u3 = form[1]
            local _u69 = form[2]
            local _u70 = form[3]
            local _u71 = cut(form, 3)
            add(environment, {_scope = true})
            local _u74 = _u70
            local _u1 = nil
            for _u1 in next, _u74 do
              local _u72 = _u74[_u1]
              setenv(_u72, {_stash = true, variable = true})
            end
            local _u73 = join({x, _u69, _u70}, macroexpand(_u71))
            drop(environment)
            return(_u73)
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
  local _u80 = form
  local k = nil
  for k in next, _u80 do
    local v = _u80[k]
    if not number63(k) then
      local _u318
      if quasisplice63(v, depth) then
        _u318 = quasiexpand(v[2])
      else
        _u318 = quasiexpand(v, depth)
      end
      local _u82 = _u318
      last(xs)[k] = _u82
    end
  end
  step(function (x)
    if quasisplice63(x, depth) then
      local _u84 = quasiexpand(x[2])
      add(xs, _u84)
      return(add(xs, {"list"}))
    else
      return(add(last(xs), quasiexpand(x, depth)))
    end
  end, form)
  local pruned = keep(function (x)
    return(_35(x) > 1 or not (hd(x) == "list") or keys63(x))
  end, xs)
  return(join({"join*"}, pruned))
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
function expand_if(_u92)
  local a = _u92[1]
  local b = _u92[2]
  local c = cut(_u92, 2)
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
  return(apply(cat, replicate(indent_level, "  ")))
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
  local _u102 = t
  local k = nil
  for k in next, _u102 do
    local v = _u102[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local _u105 = {}
local _u106 = {}
_u106.lua = "not "
_u106.js = "!"
_u105["not"] = _u106
local _u107 = {}
_u107["/"] = true
_u107["*"] = true
_u107["%"] = true
local _u108 = {}
_u108["+"] = true
_u108["-"] = true
local _u109 = {}
local _u110 = {}
_u110.lua = ".."
_u110.js = "+"
_u109.cat = _u110
local _u111 = {}
_u111["<="] = true
_u111[">="] = true
_u111["<"] = true
_u111[">"] = true
local _u112 = {}
local _u113 = {}
_u113.lua = "=="
_u113.js = "==="
_u112["="] = _u113
local _u114 = {}
local _u115 = {}
_u115.lua = "and"
_u115.js = "&&"
_u114["and"] = _u115
local _u116 = {}
local _u117 = {}
_u117.lua = "or"
_u117.js = "||"
_u116["or"] = _u117
local infix = {_u105, _u107, _u108, _u109, _u111, _u112, _u114, _u116}
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
    local _u122 = infix
    local k = nil
    for k in next, _u122 do
      local v = _u122[k]
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
  step(function (x)
    s = s .. c .. compile(x)
    c = ", "
  end, args)
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _u319
    if c == "\n" then
      _u319 = "\\n"
    else
      _u319 = c
    end
    s1 = s1 .. _u319
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
    local _u320
    if c == "-" then
      _u320 = "_"
    else
      local _u321
      if valid_code63(n) then
        _u321 = c
      else
        local _u322
        if i == 0 then
          _u322 = "_" .. n
        else
          _u322 = n
        end
        _u321 = _u322
      end
      _u320 = _u321
    end
    local c1 = _u320
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
  local _u134 = getenv(x)
  local self_tr63 = _u134.tr
  local stmt = _u134.stmt
  local special = _u134.special
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
  local _u137 = unstash({...})
  local right = _u137.right
  local _u323
  if right then
    _u323 = _6261
  else
    _u323 = _62
  end
  if _u323(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local op = form[1]
  local _u142 = cut(form, 1)
  local a = _u142[1]
  local b = _u142[2]
  local _u143 = op_delims(form, a)
  local ao = _u143[1]
  local ac = _u143[2]
  local _u144 = op_delims(form, b, {_stash = true, right = true})
  local bo = _u144[1]
  local bc = _u144[2]
  local _u145 = compile(a)
  local _u146 = compile(b)
  local _u147 = getop(op)
  if unary63(form) then
    return(_u147 .. ao .. _u145 .. ac)
  else
    return(ao .. _u145 .. ac .. " " .. _u147 .. " " .. bo .. _u146 .. bc)
  end
end
function compile_function(args, body, ...)
  local _u148 = unstash({...})
  local name = _u148.name
  local prefix = _u148.prefix
  local _u324
  if name then
    _u324 = compile(name)
  else
    _u324 = ""
  end
  local id = _u324
  local _u150 = compile_args(args)
  indent_level = indent_level + 1
  local _u152 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u151 = _u152
  local ind = indentation()
  local _u325
  if prefix then
    _u325 = prefix .. " "
  else
    _u325 = ""
  end
  local p = _u325
  local _u326
  if target == "js" then
    _u326 = ""
  else
    _u326 = "end"
  end
  local tr = _u326
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _u150 .. " {\n" .. _u151 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _u150 .. "\n" .. _u151 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _u154 = unstash({...})
  local stmt = _u154.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _u327
      if stmt then
        _u327 = indentation()
      else
        _u327 = ""
      end
      local ind = _u327
      local _u328
      if atom63(form) then
        _u328 = compile_atom(form)
      else
        local _u329
        if infix63(hd(form)) then
          _u329 = compile_infix(form)
        else
          _u329 = compile_call(form)
        end
        _u328 = _u329
      end
      local _u156 = _u328
      return(ind .. _u156 .. tr)
    end
  end
end
local function lower_statement(form, tail63)
  local hoist = {}
  local e = lower(form, hoist, true, tail63)
  if some63(hoist) and is63(e) then
    return(join({"do"}, join(hoist, {e})))
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
  step(function (x)
    return(add(hoist, lower(x, hoist, stmt63)))
  end, butlast(args))
  local e = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(e) then
    return({"return", e})
  else
    return(e)
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local cond = args[1]
  local _u167 = args[2]
  local _u168 = args[3]
  if stmt63 or tail63 then
    local _u331
    if _u168 then
      _u331 = {lower_body({_u168}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u167}, tail63)}, _u331)))
  else
    local e = unique()
    add(hoist, {"%local", e})
    local _u330
    if _u168 then
      _u330 = {lower({"set", e, _u168})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u167})}, _u330))
    return(e)
  end
end
local function lower_short(x, args, hoist)
  local a = args[1]
  local b = args[2]
  local hoist1 = {}
  local b1 = lower(b, hoist1)
  if some63(hoist1) then
    local id = unique()
    local _u332
    if x == "and" then
      _u332 = {"%if", id, b, id}
    else
      _u332 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _u332}, hoist))
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
  local _u193 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _u193, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _u196 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_u196) then
    return(_u196)
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
setenv("do", {_stash = true, tr = true, special = function (...)
  local forms = unstash({...})
  local s = ""
  step(function (x)
    s = s .. compile(x, {_stash = true, stmt = true})
  end, forms)
  return(s)
end, stmt = true})
setenv("%if", {_stash = true, tr = true, special = function (cond, cons, alt)
  local _u225 = compile(cond)
  indent_level = indent_level + 1
  local _u227 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u226 = _u227
  local _u333
  if alt then
    indent_level = indent_level + 1
    local _u229 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _u333 = _u229
  end
  local _u228 = _u333
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _u225 .. ") {\n" .. _u226 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _u225 .. " then\n" .. _u226
  end
  if _u228 and target == "js" then
    s = s .. " else {\n" .. _u228 .. ind .. "}"
  else
    if _u228 then
      s = s .. ind .. "else\n" .. _u228
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end, stmt = true})
setenv("while", {_stash = true, tr = true, special = function (cond, form)
  local _u234 = compile(cond)
  indent_level = indent_level + 1
  local _u235 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u235
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _u234 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _u234 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true})
setenv("%for", {_stash = true, tr = true, special = function (t, k, form)
  local _u240 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u241 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u241
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _u240 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _u240 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true})
setenv("%try", {_stash = true, tr = true, special = function (form)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u249 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u249
  local e = unique()
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _u253 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _u253
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
  local _u334
  if nil63(x) then
    _u334 = "return"
  else
    _u334 = "return(" .. compile(x) .. ")"
  end
  local _u276 = _u334
  return(indentation() .. _u276)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _u335
  if target == "js" then
    _u335 = "throw new " .. compile({"Error", x})
  else
    _u335 = "error(" .. compile(x) .. ")"
  end
  local e = _u335
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _u336
  if is63(value) then
    _u336 = " = " .. value1
  else
    _u336 = ""
  end
  local rh = _u336
  local _u337
  if target == "js" then
    _u337 = "var "
  else
    _u337 = "local "
  end
  local keyword = _u337
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _u291 = compile(lh)
  local _u338
  if nil63(rh) then
    _u338 = "nil"
  else
    _u338 = rh
  end
  local _u292 = compile(_u338)
  return(indentation() .. _u291 .. " = " .. _u292)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _u296 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_u296, 0) == "{" then
    _u296 = "(" .. _u296 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_u296 .. "." .. inner(k))
  else
    return(_u296 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _u339
  if target == "lua" then
    _u339 = "{"
  else
    _u339 = "["
  end
  local open = _u339
  local _u340
  if target == "lua" then
    _u340 = "}"
  else
    _u340 = "]"
  end
  local close = _u340
  local s = ""
  local c = ""
  local _u303 = forms
  local k = nil
  for k in next, _u303 do
    local v = _u303[k]
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
  local _u341
  if target == "lua" then
    _u341 = " = "
  else
    _u341 = ": "
  end
  local sep = _u341
  local _u312 = pair(forms)
  local k = nil
  for k in next, _u312 do
    local v = _u312[k]
    if number63(k) then
      local _u314 = v[1]
      local _u315 = v[2]
      if not string63(_u314) then
        error("Illegal key: " .. string(_u314))
      end
      s = s .. c .. key(_u314) .. sep .. compile(_u315)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({expand = expand, eval = eval, ["run-file"] = run_file, compile = compile, ["compile-file"] = compile_file})
