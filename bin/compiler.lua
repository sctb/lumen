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
    local _u22 = args
    local k = nil
    for k in next, _u22 do
      local v = _u22[k]
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
      local _u31 = lh
      local k = nil
      for k in next, _u31 do
        local v = _u31[k]
        local _u328
        if k == "rest" then
          _u328 = {"cut", rh, _35(lh)}
        else
          _u328 = {"get", rh, {"quote", bias(k)}}
        end
        local x = _u328
        if is63(k) then
          local _u329
          if v == true then
            _u329 = k
          else
            _u329 = v
          end
          local _u36 = _u329
          bs = join(bs, bind(_u36, x))
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
    local _u52 = args
    local k = nil
    for k in next, _u52 do
      local v = _u52[k]
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
          local _u67 = args
          local _u1 = nil
          for _u1 in next, _u67 do
            local _u65 = _u67[_u1]
            setenv(_u65, {_stash = true, variable = true})
          end
          local _u66 = join({"%function", args}, macroexpand(body))
          drop(environment)
          return(_u66)
        else
          if x == "%local-function" or x == "%global-function" then
            local _u3 = form[1]
            local _u70 = form[2]
            local _u71 = form[3]
            local _u72 = cut(form, 3)
            add(environment, {_scope = true})
            local _u75 = _u71
            local _u1 = nil
            for _u1 in next, _u75 do
              local _u73 = _u75[_u1]
              setenv(_u73, {_stash = true, variable = true})
            end
            local _u74 = join({x, _u70, _u71}, macroexpand(_u72))
            drop(environment)
            return(_u74)
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
  local _u81 = form
  local k = nil
  for k in next, _u81 do
    local v = _u81[k]
    if not number63(k) then
      local _u330
      if quasisplice63(v, depth) then
        _u330 = quasiexpand(v[2])
      else
        _u330 = quasiexpand(v, depth)
      end
      local _u83 = _u330
      last(xs)[k] = _u83
    end
  end
  local _u84 = form
  local _u85 = _35(_u84)
  local _u86 = 0
  while _u86 < _u85 do
    local x = _u84[_u86 + 1]
    if quasisplice63(x, depth) then
      local _u87 = quasiexpand(x[2])
      add(xs, _u87)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _u86 = _u86 + 1
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
function expand_if(_u95)
  local a = _u95[1]
  local b = _u95[2]
  local c = cut(_u95, 2)
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
  local _u4 = 0
  while _u4 < indent_level do
    s = s .. "  "
    _u4 = _u4 + 1
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
  local _u105 = t
  local k = nil
  for k in next, _u105 do
    local v = _u105[k]
    local x = f(v)
    if is63(x) then
      add(o, literal(k))
      add(o, x)
    end
  end
  return(o)
end
local _u108 = {}
local _u109 = {}
_u109.js = "!"
_u109.lua = "not "
_u108["not"] = _u109
local _u110 = {}
_u110["*"] = true
_u110["/"] = true
_u110["%"] = true
local _u111 = {}
_u111["+"] = true
_u111["-"] = true
local _u112 = {}
local _u113 = {}
_u113.js = "+"
_u113.lua = ".."
_u112.cat = _u113
local _u114 = {}
_u114["<"] = true
_u114[">"] = true
_u114["<="] = true
_u114[">="] = true
local _u115 = {}
local _u116 = {}
_u116.js = "==="
_u116.lua = "=="
_u115["="] = _u116
local _u117 = {}
local _u118 = {}
_u118.js = "&&"
_u118.lua = "and"
_u117["and"] = _u118
local _u119 = {}
local _u120 = {}
_u120.js = "||"
_u120.lua = "or"
_u119["or"] = _u120
local infix = {_u108, _u110, _u111, _u112, _u114, _u115, _u117, _u119}
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
    local _u125 = infix
    local k = nil
    for k in next, _u125 do
      local v = _u125[k]
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
  local _u131 = args
  local _u132 = _35(_u131)
  local _u133 = 0
  while _u133 < _u132 do
    local x = _u131[_u133 + 1]
    s = s .. c .. compile(x)
    c = ", "
    _u133 = _u133 + 1
  end
  return(s .. ")")
end
local function escape_newlines(s)
  local s1 = ""
  local i = 0
  while i < _35(s) do
    local c = char(s, i)
    local _u331
    if c == "\n" then
      _u331 = "\\n"
    else
      _u331 = c
    end
    s1 = s1 .. _u331
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
    local _u332
    if c == "-" then
      _u332 = "_"
    else
      local _u333
      if valid_code63(n) then
        _u333 = c
      else
        local _u334
        if i == 0 then
          _u334 = "_" .. n
        else
          _u334 = n
        end
        _u333 = _u334
      end
      _u332 = _u333
    end
    local c1 = _u332
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
  local _u139 = getenv(x)
  local special = _u139.special
  local stmt = _u139.stmt
  local self_tr63 = _u139.tr
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
  local _u142 = unstash({...})
  local right = _u142.right
  local _u335
  if right then
    _u335 = _6261
  else
    _u335 = _62
  end
  if _u335(precedence(child), precedence(parent)) then
    return({"(", ")"})
  else
    return({"", ""})
  end
end
local function compile_infix(form)
  local op = form[1]
  local _u147 = cut(form, 1)
  local a = _u147[1]
  local b = _u147[2]
  local _u148 = op_delims(form, a)
  local ao = _u148[1]
  local ac = _u148[2]
  local _u149 = op_delims(form, b, {_stash = true, right = true})
  local bo = _u149[1]
  local bc = _u149[2]
  local _u150 = compile(a)
  local _u151 = compile(b)
  local _u152 = getop(op)
  if unary63(form) then
    return(_u152 .. ao .. _u150 .. ac)
  else
    return(ao .. _u150 .. ac .. " " .. _u152 .. " " .. bo .. _u151 .. bc)
  end
end
function compile_function(args, body, ...)
  local _u153 = unstash({...})
  local name = _u153.name
  local prefix = _u153.prefix
  local _u336
  if name then
    _u336 = compile(name)
  else
    _u336 = ""
  end
  local id = _u336
  local _u155 = compile_args(args)
  indent_level = indent_level + 1
  local _u157 = compile(body, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u156 = _u157
  local ind = indentation()
  local _u337
  if prefix then
    _u337 = prefix .. " "
  else
    _u337 = ""
  end
  local p = _u337
  local _u338
  if target == "js" then
    _u338 = ""
  else
    _u338 = "end"
  end
  local tr = _u338
  if name then
    tr = tr .. "\n"
  end
  if target == "js" then
    return("function " .. id .. _u155 .. " {\n" .. _u156 .. ind .. "}" .. tr)
  else
    return(p .. "function " .. id .. _u155 .. "\n" .. _u156 .. ind .. tr)
  end
end
local function can_return63(form)
  return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
end
function compile(form, ...)
  local _u159 = unstash({...})
  local stmt = _u159.stmt
  if nil63(form) then
    return("")
  else
    if special_form63(form) then
      return(compile_special(form, stmt))
    else
      local tr = terminator(stmt)
      local _u339
      if stmt then
        _u339 = indentation()
      else
        _u339 = ""
      end
      local ind = _u339
      local _u340
      if atom63(form) then
        _u340 = compile_atom(form)
      else
        local _u341
        if infix63(hd(form)) then
          _u341 = compile_infix(form)
        else
          _u341 = compile_call(form)
        end
        _u340 = _u341
      end
      local _u161 = _u340
      return(ind .. _u161 .. tr)
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
  local _u169 = butlast(args)
  local _u170 = _35(_u169)
  local _u171 = 0
  while _u171 < _u170 do
    local x = _u169[_u171 + 1]
    add(hoist, lower(x, hoist, stmt63))
    _u171 = _u171 + 1
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
  local _u174 = args[2]
  local _u175 = args[3]
  if stmt63 or tail63 then
    local _u343
    if _u175 then
      _u343 = {lower_body({_u175}, tail63)}
    end
    return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u174}, tail63)}, _u343)))
  else
    local e = unique()
    add(hoist, {"%local", e})
    local _u342
    if _u175 then
      _u342 = {lower({"set", e, _u175})}
    end
    add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u174})}, _u342))
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
    local _u344
    if x == "and" then
      _u344 = {"%if", id, b, id}
    else
      _u344 = {"%if", id, id, b}
    end
    return(lower({"do", {"%local", id, a}, _u344}, hoist))
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
  local _u200 = args[2]
  local body = cut(args, 2)
  return(add(hoist, {kind, name, _u200, lower_body(body, true)}))
end
local function lower_call(form, hoist)
  local _u203 = map(function (x)
    return(lower(x, hoist))
  end, form)
  if some63(_u203) then
    return(_u203)
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
  local _u224 = forms
  local _u225 = _35(_u224)
  local _u226 = 0
  while _u226 < _u225 do
    local x = _u224[_u226 + 1]
    s = s .. compile(x, {_stash = true, stmt = true})
    _u226 = _u226 + 1
  end
  return(s)
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local _u235 = compile(cond)
  indent_level = indent_level + 1
  local _u237 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local _u236 = _u237
  local _u345
  if alt then
    indent_level = indent_level + 1
    local _u239 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    _u345 = _u239
  end
  local _u238 = _u345
  local ind = indentation()
  local s = ""
  if target == "js" then
    s = s .. ind .. "if (" .. _u235 .. ") {\n" .. _u236 .. ind .. "}"
  else
    s = s .. ind .. "if " .. _u235 .. " then\n" .. _u236
  end
  if _u238 and target == "js" then
    s = s .. " else {\n" .. _u238 .. ind .. "}"
  else
    if _u238 then
      s = s .. ind .. "else\n" .. _u238
    end
  end
  if target == "lua" then
    return(s .. ind .. "end\n")
  else
    return(s .. "\n")
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local _u244 = compile(cond)
  indent_level = indent_level + 1
  local _u245 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u245
  local ind = indentation()
  if target == "js" then
    return(ind .. "while (" .. _u244 .. ") {\n" .. body .. ind .. "}\n")
  else
    return(ind .. "while " .. _u244 .. " do\n" .. body .. ind .. "end\n")
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local _u250 = compile(t)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u251 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u251
  if target == "lua" then
    return(ind .. "for " .. k .. " in next, " .. _u250 .. " do\n" .. body .. ind .. "end\n")
  else
    return(ind .. "for (" .. k .. " in " .. _u250 .. ") {\n" .. body .. ind .. "}\n")
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local ind = indentation()
  indent_level = indent_level + 1
  local _u259 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local body = _u259
  local e = unique()
  local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
  indent_level = indent_level + 1
  local _u263 = compile(hf, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local h = _u263
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
  local _u346
  if nil63(x) then
    _u346 = "return"
  else
    _u346 = "return(" .. compile(x) .. ")"
  end
  local _u286 = _u346
  return(indentation() .. _u286)
end, stmt = true})
setenv("error", {_stash = true, special = function (x)
  local _u347
  if target == "js" then
    _u347 = "throw new " .. compile({"Error", x})
  else
    _u347 = "error(" .. compile(x) .. ")"
  end
  local e = _u347
  return(indentation() .. e)
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local id = compile(name)
  local value1 = compile(value)
  local _u348
  if is63(value) then
    _u348 = " = " .. value1
  else
    _u348 = ""
  end
  local rh = _u348
  local _u349
  if target == "js" then
    _u349 = "var "
  else
    _u349 = "local "
  end
  local keyword = _u349
  local ind = indentation()
  return(ind .. keyword .. id .. rh)
end, stmt = true})
setenv("set", {_stash = true, special = function (lh, rh)
  local _u301 = compile(lh)
  local _u350
  if nil63(rh) then
    _u350 = "nil"
  else
    _u350 = rh
  end
  local _u302 = compile(_u350)
  return(indentation() .. _u301 .. " = " .. _u302)
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local _u306 = compile(t)
  local k1 = compile(k)
  if target == "lua" and char(_u306, 0) == "{" then
    _u306 = "(" .. _u306 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) then
    return(_u306 .. "." .. inner(k))
  else
    return(_u306 .. "[" .. k1 .. "]")
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local forms = unstash({...})
  local _u351
  if target == "lua" then
    _u351 = "{"
  else
    _u351 = "["
  end
  local open = _u351
  local _u352
  if target == "lua" then
    _u352 = "}"
  else
    _u352 = "]"
  end
  local close = _u352
  local s = ""
  local c = ""
  local _u314 = forms
  local k = nil
  for k in next, _u314 do
    local v = _u314[k]
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
  local _u353
  if target == "lua" then
    _u353 = " = "
  else
    _u353 = ": "
  end
  local sep = _u353
  local _u324 = pair(forms)
  local k = nil
  for k in next, _u324 do
    local v = _u324[k]
    if number63(k) then
      local _u326 = v[1]
      local _u327 = v[2]
      if not string63(_u326) then
        error("Illegal key: " .. string(_u326))
      end
      s = s .. c .. key(_u326) .. sep .. compile(_u327)
      c = ", "
    end
  end
  return(s .. "}")
end})
return({eval = eval, ["run-file"] = run_file, ["compile-file"] = compile_file, expand = expand, compile = compile})
