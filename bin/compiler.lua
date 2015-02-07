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
local _u20 = 0
function unique(x)
  _u20 = _u20 + 1
  return("_u" .. (x or "") .. _u20)
end
local function stash42(args)
  if keys63(args) then
    local l = {"%object", "\"_stash\"", true}
    local _ux24 = args
    local k = nil
    for k in next, _ux24 do
      local v = _ux24[k]
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
      local _ux33 = lh
      local k = nil
      for k in next, _ux33 do
        local v = _ux33[k]
        local _u338
        if k == "rest" then
          _u338 = {"cut", rh, _35(lh)}
        else
          _u338 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _u338
        if is63(k) then
          local _u339
          if v == true then
            _u339 = k
          else
            _u339 = v
          end
          local _u38 = _u339
          bs = join(bs, bind(_u38, x))
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
    local _ux54 = args
    local k = nil
    for k in next, _ux54 do
      local v = _ux54[k]
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
        local _uignored1 = form[1]
        local name = form[2]
        local value = form[3]
        return({"%local", name, macroexpand(value)})
      else
        if x == "%function" then
          local _uignored2 = form[1]
          local args = form[2]
          local body = cut(form, 2)
          add(environment, {_scope = true})
          local _ux69 = args
          local _u1 = nil
          for _u1 in next, _ux69 do
            local _u67 = _ux69[_u1]
            setenv(_u67, {_stash = true, variable = true})
          end
          local _u68 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_u68)
        else
          if x == "%local-function" or x == "%global-function" then
            local _uignored3 = form[1]
            local _u72 = form[2]
            local _u73 = form[3]
            local _u74 = cut(form, 3)
            add(environment, {_scope = true})
            local _ux77 = _u73
            local _u1 = nil
            for _u1 in next, _ux77 do
              local _u75 = _ux77[_u1]
              setenv(_u75, {_stash = true, variable = true})
            end
            local _u76 = join({x, _u72, _u73}, macroexpand(_u74))
            drop(environment)
            return(_u76)
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
  local _ux83 = form
  local k = nil
  for k in next, _ux83 do
    local v = _ux83[k]
    if not number63(k) then
      local _u340
      if quasisplice63(v, depth) then
        _u340 = quasiexpand(v[2])
      else
        _u340 = quasiexpand(v, depth)
      end
      local _u85 = _u340
      last(xs)[k] = _u85
    end
  end
  local _ux86 = form
  local _un87 = _35(_ux86)
  local _ui88 = 0
  while _ui88 < _un87 do
    local x = _ux86[_ui88 + 1]
    if quasisplice63(x, depth) then
      local _u89 = quasiexpand(x[2])
      add(xs, _u89)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _ui88 = _ui88 + 1
  end
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
function expand_if(_u97)
  local a = _u97[1]
  local b = _u97[2]
  local c = cut(_u97, 2)
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
  local _uignored4 = 0
  while _uignored4 < indent_level do
    s = s .. "  "
    _uignored4 = _uignored4 + 1
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
  local _ux107 = t
  local k = nil
  for k in next, _ux107 do
    local v = _ux107[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local _u111 = {}
local _u112 = {}
_u112.js = "!"
_u112.lua = "not "
_u111["not"] = _u112
local _u114 = {}
_u114["*"] = true
_u114["/"] = true
_u114["%"] = true
local _u116 = {}
_u116["+"] = true
_u116["-"] = true
local _u118 = {}
local _u119 = {}
_u119.js = "+"
_u119.lua = ".."
_u118.cat = _u119
local _u121 = {}
_u121["<"] = true
_u121[">"] = true
_u121["<="] = true
_u121[">="] = true
local _u123 = {}
local _u124 = {}
_u124.js = "==="
_u124.lua = "=="
_u123["="] = _u124
local _u126 = {}
local _u127 = {}
_u127.js = "&&"
_u127.lua = "and"
_u126["and"] = _u127
local _u129 = {}
local _u130 = {}
_u130.js = "||"
_u130.lua = "or"
_u129["or"] = _u130
local infix = {_u111, _u114, _u116, _u118, _u121, _u123, _u126, _u129}
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
    local _ux135 = infix
    local k = nil
    for k in next, _ux135 do
      local v = _ux135[k]
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
  local _ux141 = args
  local _un142 = _35(_ux141)
  local _ui143 = 0
  while _ui143 < _un142 do
    local x = _ux141[_ui143 + 1]
    s = s .. c .. compile(x)
    c = ", "
    _ui143 = _ui143 + 1
  end
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _u341
    if c == "\n" then
      _u341 = "\\n"
    else
      _u341 = c
    end
    s1 = s1 .. _u341
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
    local _u342
    if c == "-" then
      _u342 = "_"
    else
      local _u343
      if valid_code63(n) then
        _u343 = c
      else
        local _u344
        if i == 0 then
          _u344 = "_" .. n
        else
          _u344 = n
        end
        _u343 = _u344
      end
      _u342 = _u343
    end
    local c1 = _u342
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
  local _u149 = getenv(x)
  local special = _u149.special
  local stmt = _u149.stmt
  local self_tr63 = _u149.tr
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
  local _u152 = unstash({...})
  local right = _u152.right
  local _u345
  if right then
    _u345 = _6261
  else
    _u345 = _62
  end
  if _u345(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local op = form[1]
  local _u157 = cut(form, 1)
  local a = _u157[1]
  local b = _u157[2]
  local _u158 = op_delims(form, a)
  local ao = _u158[1]
  local ac = _u158[2]
  local _u159 = op_delims(form, b, {_stash = true, right = true})
  local bo = _u159[1]
  local bc = _u159[2]
  local _u160 = compile(a)
  local _u161 = compile(b)
  local _u162 = getop(op)
  if unary63(form) then
    return(_u162 .. ao .. _u160 .. ac)
  else
    return(ao .. _u160 .. ac .. " " .. _u162 .. " " .. bo .. _u161 .. bc)
  end
end
function compile_function(args, body, ...)
  local _u163 = unstash({...})
  local name = _u163.name
  local prefix = _u163.prefix
  local _u346
  if name then
    _u346 = compile(name)
  else
    _u346 = ""
  end
  local id = _u346
  local _u165 = compile_args(args)
  indent_level = indent_level + 1
  local _ux167 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u166 = _ux167
  local ind = indentation()
  local _u347
  if prefix then
    _u347 = prefix .. " "
  else
    _u347 = ""
  end
  local p = _u347
  local _u348
  if target == "js" then
    _u348 = ""
  else
    _u348 = "end"
  end
  local tr = _u348
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _u165 .. " {\n" .. _u166 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _u165 .. "\n" .. _u166 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _u169 = unstash({...})
  local stmt = _u169.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _u349
      if stmt then
        _u349 = indentation()
      else
        _u349 = ""
      end
      local ind = _u349
      local _u350
      if atom63(form) then
        _u350 = compile_atom(form)
      else
        local _u351
        if infix63(hd(form)) then
          _u351 = compile_infix(form)
        else
          _u351 = compile_call(form)
        end
        _u350 = _u351
      end
      local _u171 = _u350
      return(ind .. _u171 .. tr)
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
  local _ux179 = butlast(args)
  local _un180 = _35(_ux179)
  local _ui181 = 0
  while _ui181 < _un180 do
    local x = _ux179[_ui181 + 1]
    add(hoist, lower(x, hoist, stmt63))
    _ui181 = _ui181 + 1
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
  local _u184 = args[2]
  local _u185 = args[3]
  if stmt63 or tail63 then
    local _u353
    if _u185 then
      _u353 = {lower_body({_u185}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u184}, tail63)}, _u353)))
  else
    local e = unique("e")
    add(hoist, {"%local", e})
    local _u352
    if _u185 then
      _u352 = {lower({"set", e, _u185})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u184})}, _u352))
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
    local _u354
    if x == "and" then
      _u354 = {"%if", id, b, id}
    else
      _u354 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _u354}, hoist))
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
  local _u210 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _u210, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _u213 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_u213) then
    return(_u213)
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
  local _ux234 = forms
  local _un235 = _35(_ux234)
  local _ui236 = 0
  while _ui236 < _un235 do
    local x = _ux234[_ui236 + 1]
    s = s .. compile(x, {_stash = true, stmt = true})
    _ui236 = _ui236 + 1
  end
  return(s)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local _u245 = compile(cond)
  indent_level = indent_level + 1
  local _ux247 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u246 = _ux247
  local _u355
  if alt then
    indent_level = indent_level + 1
    local _ux249 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _u355 = _ux249
  end
  local _u248 = _u355
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _u245 .. ") {\n" .. _u246 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _u245 .. " then\n" .. _u246
  end
  if _u248 and target == "js" then
    s = s .. " else {\n" .. _u248 .. ind .. "}"
  else
    if _u248 then
      s = s .. ind .. "else\n" .. _u248
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local _u254 = compile(cond)
  indent_level = indent_level + 1
  local _ux255 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux255
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _u254 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _u254 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local _u260 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _ux261 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux261
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _u260 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _u260 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local e = unique("e")
  local ind = indentation()
  indent_level = indent_level + 1
  local _ux269 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _ux269
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _ux273 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _ux273
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
  local _u356
  if nil63(x) then
    _u356 = "return"
  else
    _u356 = "return(" .. compile(x) .. ")"
  end
  local _u296 = _u356
  return(indentation() .. _u296)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _u357
  if target == "js" then
    _u357 = "throw new " .. compile({"Error", x})
  else
    _u357 = "error(" .. compile(x) .. ")"
  end
  local e = _u357
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _u358
  if is63(value) then
    _u358 = " = " .. value1
  else
    _u358 = ""
  end
  local rh = _u358
  local _u359
  if target == "js" then
    _u359 = "var "
  else
    _u359 = "local "
  end
  local keyword = _u359
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _u311 = compile(lh)
  local _u360
  if nil63(rh) then
    _u360 = "nil"
  else
    _u360 = rh
  end
  local _u312 = compile(_u360)
  return(indentation() .. _u311 .. " = " .. _u312)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _u316 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_u316, 0) == "{" then
    _u316 = "(" .. _u316 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_u316 .. "." .. inner(k))
  else
    return(_u316 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _u361
  if target == "lua" then
    _u361 = "{"
  else
    _u361 = "["
  end
  local open = _u361
  local _u362
  if target == "lua" then
    _u362 = "}"
  else
    _u362 = "]"
  end
  local close = _u362
  local s = ""
  local c = ""
  local _ux324 = forms
  local k = nil
  for k in next, _ux324 do
    local v = _ux324[k]
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
  local _u363
  if target == "lua" then
    _u363 = " = "
  else
    _u363 = ": "
  end
  local sep = _u363
  local _ux334 = pair(forms)
  local k = nil
  for k in next, _ux334 do
    local v = _ux334[k]
    if number63(k) then
      local _u336 = v[1]
      local _u337 = v[2]
      if not string63(_u336) then
        error("Illegal key: " .. string(_u336))
      end
      s = s .. c .. key(_u336) .. sep .. compile(_u337)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({eval = eval, ["run-file"] = run_file, ["compile-file"] = compile_file, expand = expand, compile = compile})
