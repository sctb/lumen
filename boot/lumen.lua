infix = {common = {[">="] = true, ["%"] = true, ["*"] = true, ["+"] = true, [">"] = true, ["/"] = true, ["<"] = true, ["-"] = true, ["<="] = true}, lua = {["~="] = true, ["or"] = true, ["cat"] = "..", ["="] = "==", ["and"] = true}, js = {["~="] = "!=", ["or"] = "||", ["cat"] = "+", ["="] = "===", ["and"] = "&&"}}
function getop(op)
  local op1 = (infix.common[op] or infix[target][op])
  if (op1 == true) then
    return(op)
  else
    return(op1)
  end
end
function infix63(form)
  return((list63(form) and is63(getop(hd(form)))))
end
indent_level = 0
function indentation()
  return(apply(cat, replicate(indent_level, "  ")))
end
function compile_args(args)
  local str = "("
  local i = 0
  local _g8 = args
  while (i < length(_g8)) do
    local arg = _g8[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_body(forms, ...)
  local _g9 = unstash({...})
  local tail63 = _g9["tail?"]
  local str = ""
  local i = 0
  local _g10 = forms
  while (i < length(_g10)) do
    local x = _g10[(i + 1)]
    local t63 = (tail63 and (i == (length(forms) - 1)))
    str = (str .. compile(x, {_stash = true, ["stmt?"] = true, ["tail?"] = t63}))
    i = (i + 1)
  end
  return(str)
end
function numeric63(n)
  return(((n > 47) and (n < 58)))
end
function valid_char63(n)
  return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
end
function valid_id63(id)
  if empty63(id) then
    return(false)
  elseif special63(id) then
    return(false)
  elseif getop(id) then
    return(false)
  else
    local i = 0
    while (i < length(id)) do
      local n = code(id, i)
      local valid63 = valid_char63(n)
      if ((not valid63) or ((i == 0) and numeric63(n))) then
        return(false)
      end
      i = (i + 1)
    end
    return(true)
  end
end
function compile_id(id)
  local id1 = ""
  local i = 0
  while (i < length(id)) do
    local c = char(id, i)
    local n = code(c)
    local c1 = (function ()
      if (c == "-") then
        return("_")
      elseif valid_char63(n) then
        return(c)
      elseif (i == 0) then
        return(("_" .. n))
      else
        return(n)
      end
    end)()
    id1 = (id1 .. c1)
    i = (i + 1)
  end
  return(id1)
end
function compile_atom(x)
  if ((x == "nil") and (target == "lua")) then
    return(x)
  elseif (x == "nil") then
    return("undefined")
  elseif id_literal63(x) then
    return(inner(x))
  elseif string_literal63(x) then
    return(x)
  elseif string63(x) then
    return(compile_id(x))
  elseif boolean63(x) then
    if x then
      return("true")
    else
      return("false")
    end
  elseif number63(x) then
    return((x .. ""))
  else
    error("Unrecognized atom")
  end
end
function compile_call(form)
  if empty63(form) then
    return(compile_special({"%array"}))
  else
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(stash42(tl(form)))
    if list63(f) then
      return(("(" .. f1 .. ")" .. args))
    elseif string63(f) then
      return((f1 .. args))
    else
      error("Invalid function call")
    end
  end
end
function compile_infix(_g11)
  local op = _g11[1]
  local args = sub(_g11, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _g12 = args
  while (i < length(_g12)) do
    local arg = _g12[(i + 1)]
    if ((op == "-") and (length(args) == 1)) then
      str = (str .. op .. compile(arg))
    else
      str = (str .. compile(arg))
      if (i < (length(args) - 1)) then
        str = (str .. " " .. op .. " ")
      end
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_branch(condition, body, first63, last63, tail63)
  local cond1 = compile(condition)
  local _g13 = (function ()
    indent_level = (indent_level + 1)
    local _g14 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
    indent_level = (indent_level - 1)
    return(_g14)
  end)()
  local ind = indentation()
  local tr = (function ()
    if (last63 and (target == "lua")) then
      return((ind .. "end\n"))
    elseif last63 then
      return("\n")
    else
      return("")
    end
  end)()
  if (first63 and (target == "js")) then
    return((ind .. "if (" .. cond1 .. ") {\n" .. _g13 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _g13 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _g13 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _g13 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _g13 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _g13 .. tr))
  end
end
function compile_function(args, body, ...)
  local _g15 = unstash({...})
  local prefix = _g15.prefix
  local name = _g15.name
  local id = (function ()
    if name then
      return(compile(name))
    else
      return("")
    end
  end)()
  local prefix = (prefix or "")
  local args = compile_args(args)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g16 = compile_body(body, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g16)
  end)()
  local ind = indentation()
  local tr = (function ()
    if name then
      return("end\n")
    else
      return("end")
    end
  end)()
  if (target == "js") then
    return(("function " .. id .. args .. " {\n" .. body .. ind .. "}"))
  else
    return((prefix .. "function " .. id .. args .. "\n" .. body .. ind .. tr))
  end
end
function terminator(stmt63)
  if (not stmt63) then
    return("")
  elseif (target == "js") then
    return(";\n")
  else
    return("\n")
  end
end
function compile_special(form, stmt63, tail63)
  local _g17 = getenv(hd(form))
  local self_tr63 = _g17.tr
  local stmt = _g17.stmt
  local special = _g17.special
  if ((not stmt63) and stmt) then
    return(compile({{"%function", {}, form}}, {_stash = true, ["tail?"] = tail63}))
  else
    local tr = terminator((stmt63 and (not self_tr63)))
    return((special(tl(form), tail63) .. tr))
  end
end
function can_return63(form)
  return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
end
function compile(form, ...)
  local _g61 = unstash({...})
  local stmt63 = _g61["stmt?"]
  local tail63 = _g61["tail?"]
  if (tail63 and can_return63(form)) then
    form = {"return", form}
  end
  if nil63(form) then
    return("")
  elseif special_form63(form) then
    return(compile_special(form, stmt63, tail63))
  else
    local tr = terminator(stmt63)
    local ind = (function ()
      if stmt63 then
        return(indentation())
      else
        return("")
      end
    end)()
    local form = (function ()
      if atom63(form) then
        return(compile_atom(form))
      elseif infix63(form) then
        return(compile_infix(form))
      else
        return(compile_call(form))
      end
    end)()
    return((ind .. form .. tr))
  end
end
function compile_toplevel(form)
  return(compile(macroexpand(form), {_stash = true, ["stmt?"] = true}))
end
run_result = nil
function run(x)
  local f = load((compile("run-result") .. "=" .. x))
  if f then
    f()
    return(run_result)
  else
    local f,e = load(x)
    if f then
      return(f())
    else
      error((e .. " in " .. x))
    end
  end
end
function eval(form)
  local previous = target
  target = "lua"
  local str = compile(macroexpand(form))
  target = previous
  return(run(str))
end
module = nil
loading = {}
compiler_output = nil
compiling63 = false
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  return(compile_toplevel(join({"do"}, body)))
end
function initial_environment()
  local m = getenv("define-module")
  local x = {["define-module"] = m}
  return({x})
end
function load_module(spec)
  local k = to_string(spec)
  if list63(spec) then
    error("Unsupported module specification")
  elseif (nil63(modules[k]) or (compiling63 and nil63(loading[k]))) then
    _37compile_module(k)
  end
  return(open_module(spec))
end
function _37compile_module(k)
  local file = (k .. ".l")
  local mod0 = module
  local env0 = environment
  local env1 = initial_environment()
  loading[k] = true
  module = k
  environment = env1
  local compiled = compile_file(file)
  local top = toplevel(k)
  module = mod0
  environment = env0
  local b = nil
  local _g62 = hd(env1)
  for b in next, _g62 do
    if (not number63(b)) then
      local x = _g62[b]
      if (x.module == k) then
        top[b] = x
      end
    end
  end
  if compiling63 then
    compiler_output = (compiler_output .. compiled)
  else
    return(run(compiled))
  end
end
function _37load_module(spec)
  local k = to_string(spec)
  local m = modules[k]
  if (not m.environment) then
    local env0 = environment
    local env1 = {m.toplevel, {}}
    m.environment = env1
    environment = env1
    map(open_module, m.import)
    environment = env0
  end
end
function toplevel(m)
  return(modules[m].toplevel)
end
function open_module(spec)
  local m = to_string(spec)
  local frame = last(environment)
  local k = nil
  local _g63 = toplevel(m)
  for k in next, _g63 do
    if (not number63(k)) then
      local v = _g63[k]
      if v.export then
        frame[k] = v
      end
    end
  end
end
function compile_module(spec)
  compiling63 = true
  compiler_output = ""
  return(load_module(spec))
end
function quote_binding(x)
  if x.module then
    x = extend(x, {_stash = true, module = {"quote", x.module}})
  end
  if is63(x.symbol) then
    return(extend(x, {_stash = true, symbol = {"quote", x.symbol}}))
  elseif (x.macro and x.form) then
    return(exclude(extend(x, {_stash = true, macro = x.form}), {_stash = true, form = true}))
  elseif (x.special and x.form) then
    return(exclude(extend(x, {_stash = true, special = x.form}), {_stash = true, form = true}))
  elseif is63(x.variable) then
    return(x)
  end
end
function quote_frame(t)
  return(join({"%object"}, mapo(function (_g7, x)
    return(join({"table"}, quote_binding(x)))
  end, t)))
end
function quote_environment(env)
  return(join({"list"}, map(quote_frame, env)))
end
function quote_module(m)
  local _g73 = {"table"}
  _g73.toplevel = quote_frame(m.toplevel)
  _g73.import = quoted(m.import)
  return(_g73)
end
function quote_modules()
  return(join({"table"}, map42(quote_module, modules)))
end
function setenv(k, ...)
  local keys = unstash({...})
  local _g74 = sub(keys, 0)
  local frame = last(environment)
  local x = (frame[k] or {})
  local k1 = nil
  local _g75 = _g74
  for k1 in next, _g75 do
    if (not number63(k1)) then
      local v = _g75[k1]
      x[k1] = v
    end
  end
  x.module = module
  frame[k] = x
end
function getenv(k)
  if string63(k) then
    return(find(function (e)
      return(e[k])
    end, reverse(environment)))
  end
end
function macro_function(k)
  local x = getenv(k)
  return((x and x.macro))
end
function macro63(k)
  return(is63(macro_function(k)))
end
function special63(k)
  local x = getenv(k)
  return((x and x.special))
end
function special_form63(form)
  return((list63(form) and special63(hd(form))))
end
function symbol_expansion(k)
  local x = getenv(k)
  return((x and x.symbol))
end
function symbol63(k)
  return(is63(symbol_expansion(k)))
end
function variable63(k)
  local x = last(environment)[k]
  return((x and x.variable))
end
function bound63(x)
  return((macro63(x) or special63(x) or symbol63(x) or variable63(x)))
end
pending = {}
function escape(str)
  local str1 = "\""
  local i = 0
  while (i < length(str)) do
    local c = char(str, i)
    local c1 = (function ()
      if (c == "\n") then
        return("\\n")
      elseif (c == "\"") then
        return("\\\"")
      elseif (c == "\\") then
        return("\\\\")
      else
        return(c)
      end
    end)()
    str1 = (str1 .. c1)
    i = (i + 1)
  end
  return((str1 .. "\""))
end
function quoted(form)
  if string63(form) then
    return(escape(form))
  elseif atom63(form) then
    return(form)
  else
    return(join({"list"}, map42(quoted, form)))
  end
end
function stash(args)
  if keys63(args) then
    local p = {_stash = true}
    local k = nil
    local _g127 = args
    for k in next, _g127 do
      if (not number63(k)) then
        local v = _g127[k]
        p[k] = v
      end
    end
    return(join(args, {p}))
  else
    return(args)
  end
end
function stash42(args)
  if keys63(args) then
    local l = {"%object", "_stash", true}
    local k = nil
    local _g128 = args
    for k in next, _g128 do
      if (not number63(k)) then
        local v = _g128[k]
        add(l, k)
        add(l, v)
      end
    end
    return(join(args, {l}))
  else
    return(args)
  end
end
function unstash(args)
  if empty63(args) then
    return({})
  else
    local l = last(args)
    if (table63(l) and l._stash) then
      local args1 = sub(args, 0, (length(args) - 1))
      local k = nil
      local _g129 = l
      for k in next, _g129 do
        if (not number63(k)) then
          local v = _g129[k]
          if (k ~= "_stash") then
            args1[k] = v
          end
        end
      end
      return(args1)
    else
      return(args)
    end
  end
end
function bind_arguments(args, body)
  local args1 = {}
  local rest = function ()
    if (target == "js") then
      return({"unstash", {"sublist", "arguments", length(args1)}})
    else
      add(args1, "|...|")
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bs = {}
    local r = (args.rest or (keys63(args) and make_id()))
    local _g131 = 0
    local _g130 = args
    while (_g131 < length(_g130)) do
      local arg = _g130[(_g131 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g131 = (_g131 + 1)
    end
    if r then
      bs = join(bs, {r, rest()})
    end
    if keys63(args) then
      bs = join(bs, {sub(args, length(args)), r})
    end
    if empty63(bs) then
      return({args1, body})
    else
      return({args1, {join({"let", bs}, body)}})
    end
  end
end
function bind(lh, rh)
  if (composite63(lh) and list63(rh)) then
    local id = make_id()
    return(join({{id, rh}}, bind(lh, id)))
  elseif atom63(lh) then
    return({{lh, rh}})
  else
    local bs = {}
    local r = lh.rest
    local i = 0
    local _g132 = lh
    while (i < length(_g132)) do
      local x = _g132[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g133 = lh
    for k in next, _g133 do
      if (not number63(k)) then
        local v = _g133[k]
        if (v == true) then
          v = k
        end
        if (k ~= "rest") then
          bs = join(bs, bind(v, {"get", rh, {"quote", k}}))
        end
      end
    end
    return(bs)
  end
end
function message_handler(msg)
  local i = search(msg, ": ")
  return(sub(msg, (i + 2)))
end
function quoting63(depth)
  return(number63(depth))
end
function quasiquoting63(depth)
  return((quoting63(depth) and (depth > 0)))
end
function can_unquote63(depth)
  return((quoting63(depth) and (depth == 1)))
end
function quasisplice63(x, depth)
  return((list63(x) and can_unquote63(depth) and (hd(x) == "unquote-splicing")))
end
function macroexpand(form)
  if symbol63(form) then
    return(macroexpand(symbol_expansion(form)))
  elseif atom63(form) then
    return(form)
  else
    local x = hd(form)
    if (x == "%for") then
      local _g3 = form[1]
      local _g134 = form[2]
      local t = _g134[1]
      local k = _g134[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g4 = form[1]
      local args = form[2]
      local _g135 = sub(form, 2)
      add(environment, {})
      local _g137 = (function ()
        local _g139 = 0
        local _g138 = args
        while (_g139 < length(_g138)) do
          local _g136 = _g138[(_g139 + 1)]
          setenv(_g136, {_stash = true, variable = true})
          _g139 = (_g139 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g135)))
      end)()
      drop(environment)
      return(_g137)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g5 = form[1]
      local name = form[2]
      local _g140 = form[3]
      local _g141 = sub(form, 3)
      add(environment, {})
      local _g143 = (function ()
        local _g145 = 0
        local _g144 = _g140
        while (_g145 < length(_g144)) do
          local _g142 = _g144[(_g145 + 1)]
          setenv(_g142, {_stash = true, variable = true})
          _g145 = (_g145 + 1)
        end
        return(join({x, name, map42(macroexpand, _g140)}, macroexpand(_g141)))
      end)()
      drop(environment)
      return(_g143)
    elseif macro63(x) then
      return(macroexpand(apply(macro_function(x), tl(form))))
    else
      return(map42(macroexpand, form))
    end
  end
end
function quasiexpand(form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return({"quote", form})
    elseif (can_unquote63(depth) and (hd(form) == "unquote")) then
      return(quasiexpand(form[2]))
    elseif ((hd(form) == "unquote") or (hd(form) == "unquote-splicing")) then
      return(quasiquote_list(form, (depth - 1)))
    elseif (hd(form) == "quasiquote") then
      return(quasiquote_list(form, (depth + 1)))
    else
      return(quasiquote_list(form, depth))
    end
  elseif atom63(form) then
    return(form)
  elseif (hd(form) == "quote") then
    return(form)
  elseif (hd(form) == "quasiquote") then
    return(quasiexpand(form[2], 1))
  else
    return(map42(function (x)
      return(quasiexpand(x, depth))
    end, form))
  end
end
function quasiquote_list(form, depth)
  local xs = {{"list"}}
  local k = nil
  local _g146 = form
  for k in next, _g146 do
    if (not number63(k)) then
      local v = _g146[k]
      local v = (function ()
        if quasisplice63(v, depth) then
          return(quasiexpand(v[2]))
        else
          return(quasiexpand(v, depth))
        end
      end)()
      last(xs)[k] = v
    end
  end
  local _g148 = 0
  local _g147 = form
  while (_g148 < length(_g147)) do
    local x = _g147[(_g148 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g148 = (_g148 + 1)
  end
  if (length(xs) == 1) then
    return(hd(xs))
  else
    return(reduce(function (a, b)
      return({"join", a, b})
    end, keep(function (x)
      return(((length(x) > 1) or (not (hd(x) == "list")) or keys63(x)))
    end, xs)))
  end
end
target = "lua"
function length(x)
  return(#x)
end
function empty63(x)
  return((length(x) == 0))
end
function substring(str, from, upto)
  return((string.sub)(str, (from + 1), upto))
end
function sublist(l, from, upto)
  local i = (from or 0)
  local j = 0
  local _g149 = (upto or length(l))
  local l2 = {}
  while (i < _g149) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g150 = (from or 0)
  if string63(x) then
    return(substring(x, _g150, upto))
  else
    local l = sublist(x, _g150, upto)
    local k = nil
    local _g151 = x
    for k in next, _g151 do
      if (not number63(k)) then
        local v = _g151[k]
        l[k] = v
      end
    end
    return(l)
  end
end
function inner(x)
  return(sub(x, 1, (length(x) - 1)))
end
function hd(l)
  return(l[1])
end
function tl(l)
  return(sub(l, 1))
end
function add(l, x)
  return((table.insert)(l, x))
end
function drop(l)
  return((table.remove)(l))
end
function last(l)
  return(l[((length(l) - 1) + 1)])
end
function reverse(l)
  local l1 = {}
  local i = (length(l) - 1)
  while (i >= 0) do
    add(l1, l[(i + 1)])
    i = (i - 1)
  end
  return(l1)
end
function join(l1, l2)
  if nil63(l1) then
    return(l2)
  elseif nil63(l2) then
    return(l1)
  else
    local l = {}
    local skip63 = false
    if (not skip63) then
      local i = 0
      local len = length(l1)
      while (i < len) do
        l[(i + 1)] = l1[(i + 1)]
        i = (i + 1)
      end
      while (i < (len + length(l2))) do
        l[(i + 1)] = l2[((i - len) + 1)]
        i = (i + 1)
      end
    end
    local k = nil
    local _g152 = l1
    for k in next, _g152 do
      if (not number63(k)) then
        local v = _g152[k]
        l[k] = v
      end
    end
    local _g154 = nil
    local _g153 = l2
    for _g154 in next, _g153 do
      if (not number63(_g154)) then
        local v = _g153[_g154]
        l[_g154] = v
      end
    end
    return(l)
  end
end
function reduce(f, x)
  if empty63(x) then
    return(x)
  elseif (length(x) == 1) then
    return(hd(x))
  else
    return(f(hd(x), reduce(f, tl(x))))
  end
end
function keep(f, l)
  local l1 = {}
  local _g156 = 0
  local _g155 = l
  while (_g156 < length(_g155)) do
    local x = _g155[(_g156 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g156 = (_g156 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g158 = 0
  local _g157 = l
  while (_g158 < length(_g157)) do
    local x = _g157[(_g158 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g158 = (_g158 + 1)
  end
end
function pairwise(l)
  local i = 0
  local l1 = {}
  while (i < length(l)) do
    add(l1, {l[(i + 1)], l[((i + 1) + 1)]})
    i = (i + 2)
  end
  return(l1)
end
function iterate(f, count)
  local i = 0
  while (i < count) do
    f(i)
    i = (i + 1)
  end
end
function replicate(n, x)
  local l = {}
  iterate(function ()
    return(add(l, x))
  end, n)
  return(l)
end
function splice(x)
  return({_splice = x})
end
function splice63(x)
  if table63(x) then
    return(x._splice)
  end
end
function map(f, l)
  local l1 = {}
  local _g168 = 0
  local _g167 = l
  while (_g168 < length(_g167)) do
    local x = _g167[(_g168 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g168 = (_g168 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g169 = t
  for k in next, _g169 do
    if (not number63(k)) then
      local v = _g169[k]
      local x = f(v)
      if is63(x) then
        l[k] = x
      end
    end
  end
  return(l)
end
function mapt(f, t)
  local t1 = {}
  local k = nil
  local _g170 = t
  for k in next, _g170 do
    if (not number63(k)) then
      local v = _g170[k]
      local x = f(k, v)
      if is63(x) then
        t1[k] = x
      end
    end
  end
  return(t1)
end
function mapo(f, t)
  local o = {}
  local k = nil
  local _g171 = t
  for k in next, _g171 do
    if (not number63(k)) then
      local v = _g171[k]
      local x = f(k, v)
      if is63(x) then
        add(o, k)
        add(o, x)
      end
    end
  end
  return(o)
end
function keys63(t)
  local k63 = false
  local k = nil
  local _g172 = t
  for k in next, _g172 do
    if (not number63(k)) then
      local v = _g172[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g173 = sub(xs, 0)
  return(join(t, _g173))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g174 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g175 = t
  for k in next, _g175 do
    if (not number63(k)) then
      local v = _g175[k]
      if (not _g174[k]) then
        t1[k] = v
      end
    end
  end
  return(t1)
end
function char(str, n)
  return(sub(str, n, (n + 1)))
end
function code(str, n)
  return((string.byte)(str, (function ()
    if n then
      return((n + 1))
    end
  end)()))
end
function search(str, pattern, start)
  local _g176 = (function ()
    if start then
      return((start + 1))
    end
  end)()
  local i = (string.find)(str, pattern, start, true)
  return((i and (i - 1)))
end
function split(str, sep)
  if ((str == "") or (sep == "")) then
    return({})
  else
    local strs = {}
    while true do
      local i = search(str, sep)
      if nil63(i) then
        break
      else
        add(strs, sub(str, 0, i))
        str = sub(str, (i + 1))
      end
    end
    add(strs, str)
    return(strs)
  end
end
function cat(...)
  local xs = unstash({...})
  local _g177 = sub(xs, 0)
  if empty63(_g177) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g177))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g180 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g180))
end
function _(...)
  local xs = unstash({...})
  local _g181 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g181)))
end
function _42(...)
  local xs = unstash({...})
  local _g182 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g182))
end
function _47(...)
  local xs = unstash({...})
  local _g183 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g183)))
end
function _37(...)
  local xs = unstash({...})
  local _g184 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g184)))
end
function _62(a, b)
  return((a > b))
end
function _60(a, b)
  return((a < b))
end
function _61(a, b)
  return((a == b))
end
function _6261(a, b)
  return((a >= b))
end
function _6061(a, b)
  return((a <= b))
end
function read_file(path)
  local f = (io.open)(path)
  return((f.read)(f, "*a"))
end
function write_file(path, data)
  local f = (io.open)(path, "w")
  return((f.write)(f, data))
end
function write(x)
  return((io.write)(x))
end
function exit(code)
  return((os.exit)(code))
end
function nil63(x)
  return((x == nil))
end
function is63(x)
  return((not nil63(x)))
end
function string63(x)
  return((type(x) == "string"))
end
function string_literal63(x)
  return((string63(x) and (char(x, 0) == "\"")))
end
function id_literal63(x)
  return((string63(x) and (char(x, 0) == "|")))
end
function number63(x)
  return((type(x) == "number"))
end
function boolean63(x)
  return((type(x) == "boolean"))
end
function function63(x)
  return((type(x) == "function"))
end
function composite63(x)
  return((type(x) == "table"))
end
function atom63(x)
  return((not composite63(x)))
end
function table63(x)
  return((composite63(x) and nil63(hd(x))))
end
function list63(x)
  return((composite63(x) and is63(hd(x))))
end
function parse_number(str)
  return(tonumber(str))
end
function to_string(x)
  if nil63(x) then
    return("nil")
  elseif boolean63(x) then
    if x then
      return("true")
    else
      return("false")
    end
  elseif function63(x) then
    return("#<function>")
  elseif atom63(x) then
    return((x .. ""))
  else
    local str = "("
    local x1 = sub(x)
    local k = nil
    local _g185 = x
    for k in next, _g185 do
      if (not number63(k)) then
        local v = _g185[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g186 = x1
    while (i < length(_g186)) do
      local y = _g186[(i + 1)]
      str = (str .. to_string(y))
      if (i < (length(x1) - 1)) then
        str = (str .. " ")
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
end
function apply(f, args)
  local _g187 = stash(args)
  return(f(unpack(_g187)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
delimiters = {["\n"] = true, [";"] = true, [")"] = true, ["("] = true}
whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
function make_stream(str)
  return({string = str, len = length(str), pos = 0})
end
function peek_char(s)
  if (s.pos < s.len) then
    return(char(s.string, s.pos))
  end
end
function read_char(s)
  local c = peek_char(s)
  if c then
    s.pos = (s.pos + 1)
    return(c)
  end
end
function skip_non_code(s)
  while true do
    local c = peek_char(s)
    if nil63(c) then
      break
    elseif whitespace[c] then
      read_char(s)
    elseif (c == ";") then
      while (c and (not (c == "\n"))) do
        c = read_char(s)
      end
      skip_non_code(s)
    else
      break
    end
  end
end
read_table = {}
eof = {}
function key63(atom)
  return((string63(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
end
function flag63(atom)
  return((string63(atom) and (length(atom) > 1) and (char(atom, 0) == ":")))
end
read_table[""] = function (s)
  local str = ""
  local dot63 = false
  while true do
    local c = peek_char(s)
    if (c and ((not whitespace[c]) and (not delimiters[c]))) then
      if (c == ".") then
        dot63 = true
      end
      str = (str .. c)
      read_char(s)
    else
      break
    end
  end
  local n = parse_number(str)
  if is63(n) then
    return(n)
  elseif (str == "true") then
    return(true)
  elseif (str == "false") then
    return(false)
  elseif (str == "_") then
    return(make_id())
  elseif dot63 then
    return(reduce(function (a, b)
      return({"get", b, {"quote", a}})
    end, reverse(split(str, "."))))
  else
    return(str)
  end
end
read_table["("] = function (s)
  read_char(s)
  local l = {}
  while true do
    skip_non_code(s)
    local c = peek_char(s)
    if (c and (not (c == ")"))) then
      local x = read(s)
      if key63(x) then
        local k = sub(x, 0, (length(x) - 1))
        local v = read(s)
        l[k] = v
      elseif flag63(x) then
        l[sub(x, 1)] = true
      else
        add(l, x)
      end
    elseif c then
      read_char(s)
      break
    else
      error(("Expected ) at " .. s.pos))
    end
  end
  return(l)
end
read_table[")"] = function (s)
  error(("Unexpected ) at " .. s.pos))
end
read_table["\""] = function (s)
  read_char(s)
  local str = "\""
  while true do
    local c = peek_char(s)
    if (c and (not (c == "\""))) then
      if (c == "\\") then
        str = (str .. read_char(s))
      end
      str = (str .. read_char(s))
    elseif c then
      read_char(s)
      break
    else
      error(("Expected \" at " .. s.pos))
    end
  end
  return((str .. "\""))
end
read_table["|"] = function (s)
  read_char(s)
  local str = "|"
  while true do
    local c = peek_char(s)
    if (c and (not (c == "|"))) then
      str = (str .. read_char(s))
    elseif c then
      read_char(s)
      break
    else
      error(("Expected | at " .. s.pos))
    end
  end
  return((str .. "|"))
end
read_table["'"] = function (s)
  read_char(s)
  return({"quote", read(s)})
end
read_table["`"] = function (s)
  read_char(s)
  return({"quasiquote", read(s)})
end
read_table[","] = function (s)
  read_char(s)
  if (peek_char(s) == "@") then
    read_char(s)
    return({"unquote-splicing", read(s)})
  else
    return({"unquote", read(s)})
  end
end
function read(s)
  skip_non_code(s)
  local c = peek_char(s)
  if is63(c) then
    return(((read_table[c] or read_table[""]))(s))
  else
    return(eof)
  end
end
function read_all(s)
  local l = {}
  while true do
    local form = read(s)
    if (form == eof) then
      break
    end
    add(l, form)
  end
  return(l)
end
function read_from_string(str)
  return(read(make_stream(str)))
end
modules = {lib = {toplevel = {join = {export = true, module = "lib", variable = true}, dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, module = "lib", export = true}, ["splice?"] = {variable = true, module = "lib"}, sub = {export = true, module = "lib", variable = true}, ["make-id"] = {export = true, module = "lib", variable = true}, define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g191 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g191))
end, module = "lib", export = true}, quasiexpand = {variable = true, module = "lib"}, _g166 = {variable = true, module = "lib"}, ["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g192 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g192)})
end, module = "lib", export = true}, ["symbol-expansion"] = {variable = true, module = "lib"}, ["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g193 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g193)})
end, module = "lib", export = true}, ["function?"] = {export = true, module = "lib", variable = true}, _g113 = {variable = true, module = "lib"}, _g109 = {variable = true, module = "lib"}, fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g194 = sub(body, 0)
  local _g195 = bind_arguments(args, _g194)
  local args = _g195[1]
  local _g196 = _g195[2]
  return(join({"%function", args}, _g196))
end, module = "lib", export = true}, sublist = {variable = true, module = "lib"}, setenv = {export = true, module = "lib", variable = true}, _g82 = {variable = true, module = "lib"}, splice = {export = true, module = "lib", variable = true}, _g105 = {variable = true, module = "lib"}, inner = {export = true, module = "lib", variable = true}, search = {export = true, module = "lib", variable = true}, ["string-literal?"] = {export = true, module = "lib", variable = true}, pairwise = {export = true, module = "lib", variable = true}, [">="] = {export = true, module = "lib", variable = true}, _g101 = {variable = true, module = "lib"}, ["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g197 = sub(body, 0)
  add(environment, {})
  local _g198 = (function ()
    map(function (_g199)
      local name = _g199[1]
      local exp = _g199[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g197)))
  end)()
  drop(environment)
  return(_g198)
end, module = "lib", export = true}, ["quasisplice?"] = {variable = true, module = "lib"}, bind = {variable = true, module = "lib"}, ["string?"] = {export = true, module = "lib", variable = true}, tl = {export = true, module = "lib", variable = true}, length = {export = true, module = "lib", variable = true}, ["<="] = {export = true, module = "lib", variable = true}, ["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g200 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g200)) then
    local _g201 = bind_arguments(x, _g200)
    local args = _g201[1]
    local _g202 = _g201[2]
    return(join({"%global-function", name, args}, _g202))
  else
    return({"set", name, x})
  end
end, module = "lib", export = true}, ["variable?"] = {variable = true, module = "lib"}, ["bind-arguments"] = {variable = true, module = "lib"}, ["macro-function"] = {variable = true, module = "lib"}, ["bound?"] = {variable = true, module = "lib"}, unstash = {export = true, module = "lib", variable = true}, _g91 = {variable = true, module = "lib"}, add = {export = true, module = "lib", variable = true}, escape = {variable = true, module = "lib"}, map = {export = true, module = "lib", variable = true}, ["composite?"] = {export = true, module = "lib", variable = true}, let = {macro = function (bindings, ...)
  local body = unstash({...})
  local _g203 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g204)
    local lh = _g204[1]
    local rh = _g204[2]
    local _g206 = 0
    local _g205 = bind(lh, rh)
    while (_g206 < length(_g205)) do
      local _g207 = _g205[(_g206 + 1)]
      local id = _g207[1]
      local val = _g207[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g206 = (_g206 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g203)})))
end, module = "lib", export = true}, write = {export = true, module = "lib", variable = true}, ["write-file"] = {export = true, module = "lib", variable = true}, _g92 = {variable = true, module = "lib"}, ["is?"] = {export = true, module = "lib", variable = true}, ["empty?"] = {export = true, module = "lib", variable = true}, drop = {export = true, module = "lib", variable = true}, at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, module = "lib", export = true}, ["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g208 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g208)) then
    local _g209 = bind_arguments(x, _g208)
    local args = _g209[1]
    local _g210 = _g209[2]
    return(join({"%local-function", name, args}, _g210))
  else
    return({"%local", name, x})
  end
end, module = "lib", export = true}, ["boolean?"] = {export = true, module = "lib", variable = true}, ["message-handler"] = {variable = true, module = "lib"}, _g117 = {variable = true, module = "lib"}, ["keys?"] = {export = true, module = "lib", variable = true}, ["id-count"] = {variable = true, module = "lib"}, [">"] = {export = true, module = "lib", variable = true}, ["<"] = {export = true, module = "lib", variable = true}, ["="] = {export = true, module = "lib", variable = true}, table = {macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g2, x)
    return(x)
  end, body)))
end, module = "lib", export = true}, pr = {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, module = "lib", export = true}, ["stash*"] = {export = true, module = "lib", variable = true}, ["%"] = {export = true, module = "lib", variable = true}, ["*"] = {export = true, module = "lib", variable = true}, ["+"] = {export = true, module = "lib", variable = true}, ["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g211 = xs
    while (i < length(_g211)) do
      local x = _g211[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, module = "lib", export = true}, code = {export = true, module = "lib", variable = true}, ["/"] = {export = true, module = "lib", variable = true}, ["-"] = {export = true, module = "lib", variable = true}, apply = {export = true, module = "lib", variable = true}, exit = {export = true, module = "lib", variable = true}, ["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g213 = 0
  local _g212 = elements
  while (_g213 < length(_g212)) do
    local e = _g212[(_g213 + 1)]
    l[e] = true
    _g213 = (_g213 + 1)
  end
  return(join({"table"}, l))
end, module = "lib", export = true}, list = {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g214 = body
    for k in next, _g214 do
      if (not number63(k)) then
        local v = _g214[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, module = "lib", export = true}, last = {export = true, module = "lib", variable = true}, ["atom?"] = {export = true, module = "lib", variable = true}, _g90 = {variable = true, module = "lib"}, reduce = {export = true, module = "lib", variable = true}, ["quasiquoting?"] = {variable = true, module = "lib"}, ["map*"] = {export = true, module = "lib", variable = true}, type = {export = true, module = "lib", variable = true}, quote = {macro = function (form)
  return(quoted(form))
end, module = "lib", export = true}, ["parse-number"] = {export = true, module = "lib", variable = true}, ["number?"] = {export = true, module = "lib", variable = true}, _g104 = {variable = true, module = "lib"}, pending = {variable = true, module = "lib"}, replicate = {export = true, module = "lib", variable = true}, extend = {export = true, module = "lib", variable = true}, each = {macro = function (_g215, ...)
  local t = _g215[1]
  local k = _g215[2]
  local v = _g215[3]
  local body = unstash({...})
  local _g216 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g217 = {"target"}
    _g217.lua = {"not", {"number?", k}}
    _g217.js = {"isNaN", {"parseInt", k}}
    return(_g217)
  end)(), join({"let", {v, {"get", t1, k}}}, _g216)}}})
end, module = "lib", export = true}, _g165 = {variable = true, module = "lib"}, mapt = {export = true, module = "lib", variable = true}, _g96 = {variable = true, module = "lib"}, guard = {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, module = "lib", export = true}, _g124 = {variable = true, module = "lib"}, macroexpand = {export = true, module = "lib", variable = true}, _g179 = {variable = true, module = "lib"}, reverse = {export = true, module = "lib", variable = true}, language = {macro = function ()
  return({"quote", target})
end, module = "lib", export = true}, _g97 = {variable = true, module = "lib"}, inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, module = "lib", export = true}, _g160 = {variable = true, module = "lib"}, print = {export = true, module = "lib", variable = true}, find = {export = true, module = "lib", variable = true}, quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end, module = "lib", export = true}, ["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, module = "lib", export = true}, quoted = {export = true, module = "lib", variable = true}, ["read-file"] = {export = true, module = "lib", variable = true}, ["with-bindings"] = {macro = function (_g218, ...)
  local names = _g218[1]
  local body = unstash({...})
  local _g219 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g220 = {"setenv", x}
    _g220.variable = true
    return(_g220)
  end)()}}, _g219))
end, module = "lib", export = true}, char = {export = true, module = "lib", variable = true}, ["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, module = "lib", export = true}, across = {macro = function (_g221, ...)
  local l = _g221[1]
  local v = _g221[2]
  local i = _g221[3]
  local start = _g221[4]
  local body = unstash({...})
  local _g222 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g222, {{"inc", i}}))}})
end, module = "lib", export = true}, exclude = {export = true, module = "lib", variable = true}, ["nil?"] = {export = true, module = "lib", variable = true}, mapo = {export = true, module = "lib", variable = true}, ["cat"] = {export = true, module = "lib", variable = true}, iterate = {export = true, module = "lib", variable = true}, ["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g223 = sub(body, 0)
  local form = join({"fn", args}, _g223)
  eval((function ()
    local _g224 = {"setenv", {"quote", name}}
    _g224.macro = form
    _g224.form = {"quote", form}
    return(_g224)
  end)())
  return(nil)
end, module = "lib", export = true}, _g110 = {variable = true, module = "lib"}, substring = {variable = true, module = "lib"}, ["table?"] = {export = true, module = "lib", variable = true}, ["quoting?"] = {variable = true, module = "lib"}, ["symbol?"] = {variable = true, module = "lib"}, ["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g225 = sub(body, 0)
  local form = join({"fn", args}, _g225)
  local keys = sub(_g225, length(_g225))
  eval(join((function ()
    local _g226 = {"setenv", {"quote", name}}
    _g226.form = {"quote", form}
    _g226.special = form
    return(_g226)
  end)(), keys))
  return(nil)
end, module = "lib", export = true}, _g87 = {variable = true, module = "lib"}, split = {export = true, module = "lib", variable = true}, ["list?"] = {export = true, module = "lib", variable = true}, ["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g227 = sub(body, 0)
  add(environment, {})
  local _g228 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g227)))
  end)()
  drop(environment)
  return(_g228)
end, module = "lib", export = true}, _g102 = {variable = true, module = "lib"}, ["special?"] = {export = true, module = "lib", variable = true}, ["to-string"] = {export = true, module = "lib", variable = true}, ["special-form?"] = {export = true, module = "lib", variable = true}, ["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, module = "lib", export = true}, ["id-literal?"] = {export = true, module = "lib", variable = true}, _g83 = {variable = true, module = "lib"}, _g121 = {variable = true, module = "lib"}, target = {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, module = "lib", variable = true, export = true}, getenv = {export = true, module = "lib", variable = true}, _g86 = {variable = true, module = "lib"}, keep = {export = true, module = "lib", variable = true}, ["can-unquote?"] = {variable = true, module = "lib"}, ["macro?"] = {variable = true, module = "lib"}, hd = {export = true, module = "lib", variable = true}, stash = {variable = true, module = "lib"}, ["quasiquote-list"] = {variable = true, module = "lib"}}, import = {"lib", "compiler"}}, boot = {toplevel = {}, import = {"lib", "compiler"}}, reader = {toplevel = {["define-reader"] = {macro = function (_g229, ...)
  local char = _g229[1]
  local stream = _g229[2]
  local body = unstash({...})
  local _g230 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g230)})
end, module = "reader", export = true}, whitespace = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}, delimiters = {variable = true, module = "reader"}, ["read-table"] = {variable = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, ["read-all"] = {export = true, module = "reader", variable = true}, ["skip-non-code"] = {variable = true, module = "reader"}, ["read-from-string"] = {export = true, module = "reader", variable = true}, ["make-stream"] = {export = true, module = "reader", variable = true}, _g190 = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, read = {export = true, module = "reader", variable = true}}, import = {"lib", "compiler"}}, compiler = {toplevel = {["quote-binding"] = {variable = true, module = "compiler"}, ["compile-body"] = {variable = true, module = "compiler"}, run = {variable = true, module = "compiler"}, ["valid-char?"] = {variable = true, module = "compiler"}, ["compile-function"] = {variable = true, module = "compiler"}, ["%array"] = {export = true, module = "compiler", special = function (forms)
  local open = (function ()
    if (target == "lua") then
      return("{")
    else
      return("[")
    end
  end)()
  local close = (function ()
    if (target == "lua") then
      return("}")
    else
      return("]")
    end
  end)()
  local str = ""
  local i = 0
  local _g231 = forms
  while (i < length(_g231)) do
    local x = _g231[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}, ["break"] = {export = true, module = "compiler", stmt = true, special = function (_g6)
  return((indentation() .. "break"))
end}, ["%compile-module"] = {variable = true, module = "compiler"}, compile = {export = true, module = "compiler", variable = true}, ["%try"] = {export = true, module = "compiler", special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g232 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g232)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g233 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g233)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, tr = true, stmt = true}, module = {variable = true, module = "compiler"}, ["run-result"] = {variable = true, module = "compiler"}, _g69 = {variable = true, module = "compiler"}, ["%global-function"] = {export = true, module = "compiler", special = function (_g234)
  local name = _g234[1]
  local args = _g234[2]
  local body = sub(_g234, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, tr = true, stmt = true}, ["if"] = {export = true, module = "compiler", special = function (form, tail63)
  local str = ""
  local i = 0
  local _g235 = form
  while (i < length(_g235)) do
    local condition = _g235[(i + 1)]
    local last63 = (i >= (length(form) - 2))
    local else63 = (i == (length(form) - 1))
    local first63 = (i == 0)
    local body = form[((i + 1) + 1)]
    if else63 then
      body = condition
      condition = nil
    end
    str = (str .. compile_branch(condition, body, first63, last63, tail63))
    i = (i + 1)
    i = (i + 1)
  end
  return(str)
end, tr = true, stmt = true}, ["compile-branch"] = {variable = true, module = "compiler"}, ["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g236 = sub(body, 0)
  local imp = _g236.import
  local exp = _g236.export
  map(load_module, imp)
  local k = to_string(spec)
  modules[k] = {import = imp, toplevel = {}}
  local _g238 = 0
  local _g237 = (exp or {})
  while (_g238 < length(_g237)) do
    local k = _g237[(_g238 + 1)]
    setenv(k, {_stash = true, export = true})
    _g238 = (_g238 + 1)
  end
  return(nil)
end, module = "compiler", export = true}, _g22 = {variable = true, module = "compiler"}, ["open-module"] = {export = true, module = "compiler", variable = true}, _g48 = {variable = true, module = "compiler"}, _g18 = {variable = true, module = "compiler"}, _g50 = {variable = true, module = "compiler"}, _g20 = {variable = true, module = "compiler"}, _g65 = {variable = true, module = "compiler"}, _g71 = {variable = true, module = "compiler"}, ["indent-level"] = {variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["quote-environment"] = {export = true, module = "compiler", variable = true}, ["compiling?"] = {variable = true, module = "compiler"}, _g45 = {variable = true, module = "compiler"}, _g70 = {variable = true, module = "compiler"}, loading = {variable = true, module = "compiler"}, ["do"] = {export = true, module = "compiler", special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, tr = true, stmt = true}, ["compile-module"] = {export = true, module = "compiler", variable = true}, ["not"] = {export = true, module = "compiler", special = function (_g239)
  local x = _g239[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end}, _g27 = {variable = true, module = "compiler"}, ["%load-module"] = {variable = true, module = "compiler"}, toplevel = {variable = true, module = "compiler"}, terminator = {variable = true, module = "compiler"}, _g33 = {variable = true, module = "compiler"}, ["%function"] = {export = true, module = "compiler", special = function (_g240)
  local args = _g240[1]
  local body = sub(_g240, 1)
  return(compile_function(args, body))
end}, _g46 = {variable = true, module = "compiler"}, ["%local-function"] = {export = true, module = "compiler", special = function (_g241)
  local name = _g241[1]
  local args = _g241[2]
  local body = sub(_g241, 2)
  return(compile_function(args, body, {_stash = true, prefix = "local ", name = name}))
end, tr = true, stmt = true}, ["can-return?"] = {variable = true, module = "compiler"}, ["with-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g242 = sub(body, 0)
  local env0 = make_id()
  local env1 = make_id()
  local x = make_id()
  local m = make_id()
  return({"let", {env0, "environment", m, {"get", "modules", {"to-string", spec}}}, {"%load-module", spec}, {"set", "environment", {"get", m, {"quote", "environment"}}}, {"let", {x, join({"do"}, _g242)}, {"set", "environment", env0}, x}})
end, module = "compiler", export = true}, _g26 = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, indentation = {variable = true, module = "compiler"}, _g44 = {variable = true, module = "compiler"}, _g40 = {variable = true, module = "compiler"}, infix = {variable = true, module = "compiler"}, _g37 = {variable = true, module = "compiler"}, ["%for"] = {export = true, module = "compiler", special = function (_g243)
  local _g244 = _g243[1]
  local t = _g244[1]
  local k = _g244[2]
  local body = sub(_g243, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g245 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g245)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, tr = true, stmt = true}, _g72 = {variable = true, module = "compiler"}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["%local"] = {export = true, module = "compiler", stmt = true, special = function (_g246)
  local name = _g246[1]
  local value = _g246[2]
  local id = compile(name)
  local value = compile(value)
  local keyword = (function ()
    if (target == "js") then
      return("var ")
    else
      return("local ")
    end
  end)()
  local ind = indentation()
  return((ind .. keyword .. id .. " = " .. value))
end}, ["return"] = {export = true, module = "compiler", stmt = true, special = function (_g247)
  local x = _g247[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end}, _g52 = {variable = true, module = "compiler"}, _g19 = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["error"] = {export = true, module = "compiler", stmt = true, special = function (_g248)
  local x = _g248[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end}, _g32 = {variable = true, module = "compiler"}, ["open-m0dule"] = {export = true, module = "compiler", variable = true}, _g36 = {variable = true, module = "compiler"}, ["numeric?"] = {variable = true, module = "compiler"}, ["compile-id"] = {variable = true, module = "compiler"}, _g42 = {variable = true, module = "compiler"}, ["initial-environment"] = {variable = true, module = "compiler"}, ["compile-toplevel"] = {export = true, module = "compiler", variable = true}, ["quote-module"] = {variable = true, module = "compiler"}, _g31 = {variable = true, module = "compiler"}, ["get"] = {export = true, module = "compiler", special = function (_g249)
  local t = _g249[1]
  local k = _g249[2]
  local t = compile(t)
  local k1 = compile(k)
  if ((target == "lua") and (char(t, 0) == "{")) then
    t = ("(" .. t .. ")")
  end
  if (string_literal63(k) and valid_id63(inner(k))) then
    return((t .. "." .. inner(k)))
  else
    return((t .. "[" .. k1 .. "]"))
  end
end}, _g39 = {variable = true, module = "compiler"}, ["quote-modules"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {variable = true, module = "compiler"}, ["set"] = {export = true, module = "compiler", stmt = true, special = function (_g250)
  local lh = _g250[1]
  local rh = _g250[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end}, ["while"] = {export = true, module = "compiler", special = function (_g251)
  local condition = _g251[1]
  local body = sub(_g251, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g252 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g252)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, tr = true, stmt = true}, ["compile-args"] = {variable = true, module = "compiler"}, ["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, module = "compiler", export = true}, ["valid-id?"] = {variable = true, module = "compiler"}, ["compile-call"] = {variable = true, module = "compiler"}, _g23 = {variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, eval = {export = true, module = "compiler", variable = true}, ["quote-m0dules"] = {export = true, module = "compiler", variable = true}, _g41 = {variable = true, module = "compiler"}, ["compiler-output"] = {export = true, module = "compiler", variable = true}, ["%object"] = {export = true, module = "compiler", special = function (forms)
  local str = "{"
  local sep = (function ()
    if (target == "lua") then
      return(" = ")
    else
      return(": ")
    end
  end)()
  local pairs = pairwise(forms)
  local i = 0
  local _g253 = pairs
  while (i < length(_g253)) do
    local _g254 = _g253[(i + 1)]
    local k = _g254[1]
    local v = _g254[2]
    if (not string63(k)) then
      error(("Illegal object key: " .. to_string(k)))
    end
    local v = compile(v)
    local k = (function ()
      if valid_id63(k) then
        return(k)
      elseif ((target == "js") and string_literal63(k)) then
        return(k)
      elseif (target == "js") then
        return(quoted(k))
      elseif string_literal63(k) then
        return(("[" .. k .. "]"))
      else
        return(("[" .. quoted(k) .. "]"))
      end
    end)()
    str = (str .. k .. sep .. v)
    if (i < (length(pairs) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. "}"))
end}, _g54 = {variable = true, module = "compiler"}, ["quote-frame"] = {variable = true, module = "compiler"}}, import = {"reader", "lib", "compiler"}}}
environment = {{["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g255 = sub(body, 0)
  local imp = _g255.import
  local exp = _g255.export
  map(load_module, imp)
  local k = to_string(spec)
  modules[k] = {import = imp, toplevel = {}}
  local _g257 = 0
  local _g256 = (exp or {})
  while (_g257 < length(_g256)) do
    local k = _g256[(_g257 + 1)]
    setenv(k, {_stash = true, export = true})
    _g257 = (_g257 + 1)
  end
  return(nil)
end, module = "compiler", export = true}}}
function rep(str)
  local _g258 = (function ()
    local _g259,_g260 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g259, _g260})
  end)()
  local _g1 = _g258[1]
  local x = _g258[2]
  if is63(x) then
    return(print((to_string(x) .. " ")))
  end
end
function repl()
  local step = function (str)
    rep(str)
    return(write("> "))
  end
  write("> ")
  while true do
    local str = (io.read)()
    if str then
      step(str)
    else
      break
    end
  end
end
function usage()
  print((to_string("usage: lumen [options] <module>") .. " "))
  print((to_string("options:") .. " "))
  print((to_string("  -o <output>\tOutput file") .. " "))
  print((to_string("  -t <target>\tTarget language (default: lua)") .. " "))
  print((to_string("  -e <expr>\tExpression to evaluate") .. " "))
  return(exit())
end
function main()
  local args = arg
  if ((hd(args) == "-h") or (hd(args) == "--help")) then
    usage()
  end
  local module = nil
  local output = nil
  local target1 = nil
  local expr = nil
  local i = 0
  local _g261 = args
  while (i < length(_g261)) do
    local arg = _g261[(i + 1)]
    if ((arg == "-o") or (arg == "-t") or (arg == "-e")) then
      if (i == (length(args) - 1)) then
        print((to_string("missing argument for") .. " " .. to_string(arg) .. " "))
      else
        i = (i + 1)
        local val = args[(i + 1)]
        if (arg == "-o") then
          output = val
        elseif (arg == "-t") then
          target1 = val
        elseif (arg == "-e") then
          expr = val
        end
      end
    elseif (nil63(module) and ("-" ~= char(arg, 0))) then
      module = arg
    end
    i = (i + 1)
  end
  if output then
    if target1 then
      target = target1
    end
    compile_module(module)
    return(write_file(output, compiler_output))
  else
    module = (module or "main")
    load_module(module)
    local _g262 = environment
    local _g265 = modules[to_string(module)]
    _37load_module(module)
    environment = _g265.environment
    local _g264 = (function ()
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end)()
    environment = _g262
    return(_g264)
  end
end
main()
