infix = {common = {[">="] = true, ["-"] = true, [">"] = true, ["/"] = true, ["%"] = true, ["<="] = true, ["<"] = true, ["*"] = true, ["+"] = true}, lua = {["~="] = true, ["="] = "==", ["and"] = true, ["cat"] = "..", ["or"] = true}, js = {["~="] = "!=", ["="] = "===", ["and"] = "&&", ["cat"] = "+", ["or"] = "||"}}
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
  local _g9 = args
  while (i < length(_g9)) do
    local arg = _g9[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_body(forms, ...)
  local _g10 = unstash({...})
  local tail63 = _g10["tail?"]
  local str = ""
  local i = 0
  local _g11 = forms
  while (i < length(_g11)) do
    local x = _g11[(i + 1)]
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
function compile_infix(_g12)
  local op = _g12[1]
  local args = sub(_g12, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _g13 = args
  while (i < length(_g13)) do
    local arg = _g13[(i + 1)]
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
  local _g14 = (function ()
    indent_level = (indent_level + 1)
    local _g15 = compile(body, {_stash = true, ["tail?"] = tail63, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g15)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. _g14 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _g14 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _g14 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _g14 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _g14 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _g14 .. tr))
  end
end
function compile_function(args, body, ...)
  local _g16 = unstash({...})
  local prefix = _g16.prefix
  local name = _g16.name
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
    local _g17 = compile_body(body, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g17)
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
  local _g18 = getenv(hd(form))
  local stmt = _g18.stmt
  local special = _g18.special
  local self_tr63 = _g18.tr
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
  local _g62 = unstash({...})
  local stmt63 = _g62["stmt?"]
  local tail63 = _g62["tail?"]
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
exports = {}
imports = {}
loading = {}
compiler_output = nil
compiling63 = false
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  return(compile_toplevel(join({"do"}, body)))
end
function load_module(spec)
  local k = to_string(spec)
  if list63(spec) then
    error("Unsupported module specification")
  elseif (loading[k] and (not modules[k])) then
    return
  elseif (nil63(modules[k]) or (compiling63 and nil63(loading[k]))) then
    _37load_module(k)
  end
  return(open_module(spec))
end
function initial_environment()
  local m = getenv("define-module")
  local x = {["define-module"] = m}
  return({x})
end
function _37load_module(k)
  local file = (k .. ".l")
  local mod0 = module
  local env0 = environment
  local env1 = initial_environment()
  loading[k] = true
  module = k
  environment = env1
  local m = {}
  local compiled = compile_file(file)
  module = mod0
  environment = env0
  local x = nil
  local _g63 = hd(env1)
  for x in next, _g63 do
    if (not number63(x)) then
      local v = _g63[x]
      if exports[x] then
        v.export = true
      end
      m[x] = v
    end
  end
  modules[k] = m
  if compiling63 then
    compiler_output = (compiler_output .. compiled)
  else
    return(run(compiled))
  end
end
function open_module(spec)
  local k = to_string(spec)
  local module = modules[k]
  local toplevel = hd(environment)
  local k = nil
  local _g64 = module
  for k in next, _g64 do
    if (not number63(k)) then
      local v = _g64[k]
      toplevel[k] = v
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
function quote_frame(frame)
  return(join({"table"}, mapt(function (_g7, x)
    return(join({"table"}, quote_binding(x)))
  end, frame)))
end
function quote_environment(env)
  return(join({"list"}, map(quote_frame, env)))
end
function quote_module(k, m)
  return(join({"%object"}, mapo(function (_g8, x)
    if (x.export and (k == x.module)) then
      return(join({"table"}, quote_binding(x)))
    end
  end, m)))
end
function quote_modules()
  return(join({"table"}, mapt(quote_module, modules)))
end
function setenv(k, ...)
  local keys = unstash({...})
  local _g70 = sub(keys, 0)
  local frame = last(environment)
  local x = (frame[k] or {})
  local k1 = nil
  local _g71 = _g70
  for k1 in next, _g71 do
    if (not number63(k1)) then
      local v = _g71[k1]
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
    local _g123 = args
    for k in next, _g123 do
      if (not number63(k)) then
        local v = _g123[k]
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
    local _g124 = args
    for k in next, _g124 do
      if (not number63(k)) then
        local v = _g124[k]
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
      local _g125 = l
      for k in next, _g125 do
        if (not number63(k)) then
          local v = _g125[k]
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
    local _g127 = 0
    local _g126 = args
    while (_g127 < length(_g126)) do
      local arg = _g126[(_g127 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g127 = (_g127 + 1)
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
    local _g128 = lh
    while (i < length(_g128)) do
      local x = _g128[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g129 = lh
    for k in next, _g129 do
      if (not number63(k)) then
        local v = _g129[k]
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
      local _g130 = form[2]
      local t = _g130[1]
      local k = _g130[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g4 = form[1]
      local args = form[2]
      local _g131 = sub(form, 2)
      add(environment, {})
      local _g133 = (function ()
        local _g135 = 0
        local _g134 = args
        while (_g135 < length(_g134)) do
          local _g132 = _g134[(_g135 + 1)]
          setenv(_g132, {_stash = true, variable = true})
          _g135 = (_g135 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g131)))
      end)()
      drop(environment)
      return(_g133)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g5 = form[1]
      local name = form[2]
      local _g136 = form[3]
      local _g137 = sub(form, 3)
      add(environment, {})
      local _g139 = (function ()
        local _g141 = 0
        local _g140 = _g136
        while (_g141 < length(_g140)) do
          local _g138 = _g140[(_g141 + 1)]
          setenv(_g138, {_stash = true, variable = true})
          _g141 = (_g141 + 1)
        end
        return(join({x, name, map42(macroexpand, _g136)}, macroexpand(_g137)))
      end)()
      drop(environment)
      return(_g139)
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
  local _g142 = form
  for k in next, _g142 do
    if (not number63(k)) then
      local v = _g142[k]
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
  local _g144 = 0
  local _g143 = form
  while (_g144 < length(_g143)) do
    local x = _g143[(_g144 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g144 = (_g144 + 1)
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
  local _g145 = (upto or length(l))
  local l2 = {}
  while (i < _g145) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g146 = (from or 0)
  if string63(x) then
    return(substring(x, _g146, upto))
  else
    local l = sublist(x, _g146, upto)
    local k = nil
    local _g147 = x
    for k in next, _g147 do
      if (not number63(k)) then
        local v = _g147[k]
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
    local _g148 = l1
    for k in next, _g148 do
      if (not number63(k)) then
        local v = _g148[k]
        l[k] = v
      end
    end
    local _g150 = nil
    local _g149 = l2
    for _g150 in next, _g149 do
      if (not number63(_g150)) then
        local v = _g149[_g150]
        l[_g150] = v
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
  local _g152 = 0
  local _g151 = l
  while (_g152 < length(_g151)) do
    local x = _g151[(_g152 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g152 = (_g152 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g154 = 0
  local _g153 = l
  while (_g154 < length(_g153)) do
    local x = _g153[(_g154 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g154 = (_g154 + 1)
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
  local _g164 = 0
  local _g163 = l
  while (_g164 < length(_g163)) do
    local x = _g163[(_g164 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g164 = (_g164 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g165 = t
  for k in next, _g165 do
    if (not number63(k)) then
      local v = _g165[k]
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
  local _g166 = t
  for k in next, _g166 do
    if (not number63(k)) then
      local v = _g166[k]
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
  local _g167 = t
  for k in next, _g167 do
    if (not number63(k)) then
      local v = _g167[k]
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
  local _g168 = t
  for k in next, _g168 do
    if (not number63(k)) then
      local v = _g168[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g169 = sub(xs, 0)
  return(join(t, _g169))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g170 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g171 = t
  for k in next, _g171 do
    if (not number63(k)) then
      local v = _g171[k]
      if (not _g170[k]) then
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
  local _g172 = (function ()
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
  local _g173 = sub(xs, 0)
  if empty63(_g173) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g173))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g176 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g176))
end
function _(...)
  local xs = unstash({...})
  local _g177 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g177)))
end
function _42(...)
  local xs = unstash({...})
  local _g178 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g178))
end
function _47(...)
  local xs = unstash({...})
  local _g179 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g179)))
end
function _37(...)
  local xs = unstash({...})
  local _g180 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g180)))
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
    local _g181 = x
    for k in next, _g181 do
      if (not number63(k)) then
        local v = _g181[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g182 = x1
    while (i < length(_g182)) do
      local y = _g182[(i + 1)]
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
  local _g183 = stash(args)
  return(f(unpack(_g183)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
delimiters = {["("] = true, ["\n"] = true, [")"] = true, [";"] = true}
whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
function make_stream(str)
  return({pos = 0, string = str, len = length(str)})
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
modules = {lib = {["composite?"] = {export = true, module = "lib", variable = true}, quoted = {export = true, module = "lib", variable = true}, list = {export = true, macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g187 = body
    for k in next, _g187 do
      if (not number63(k)) then
        local v = _g187[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, module = "lib"}, ["number?"] = {export = true, module = "lib", variable = true}, splice = {export = true, module = "lib", variable = true}, drop = {export = true, module = "lib", variable = true}, reduce = {export = true, module = "lib", variable = true}, quote = {export = true, macro = function (form)
  return(quoted(form))
end, module = "lib"}, last = {export = true, module = "lib", variable = true}, ["write-file"] = {export = true, module = "lib", variable = true}, table = {export = true, macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g2, x)
    return(x)
  end, body)))
end, module = "lib"}, replicate = {export = true, module = "lib", variable = true}, ["read-file"] = {export = true, module = "lib", variable = true}, search = {export = true, module = "lib", variable = true}, ["cat!"] = {export = true, macro = function (a, ...)
  local bs = unstash({...})
  local _g188 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g188)})
end, module = "lib"}, pr = {export = true, macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, module = "lib"}, unstash = {export = true, module = "lib", variable = true}, quasiquote = {export = true, macro = function (form)
  return(quasiexpand(form, 1))
end, module = "lib"}, sub = {export = true, module = "lib", variable = true}, ["stash*"] = {export = true, module = "lib", variable = true}, ["function?"] = {export = true, module = "lib", variable = true}, ["is?"] = {export = true, module = "lib", variable = true}, ["list*"] = {export = true, macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g189 = xs
    while (i < length(_g189)) do
      local x = _g189[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, module = "lib"}, ["table?"] = {export = true, module = "lib", variable = true}, ["with-frame"] = {export = true, macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, module = "lib"}, ["list?"] = {export = true, module = "lib", variable = true}, ["atom?"] = {export = true, module = "lib", variable = true}, find = {export = true, module = "lib", variable = true}, ["*"] = {export = true, module = "lib", variable = true}, split = {export = true, module = "lib", variable = true}, ["with-bindings"] = {export = true, macro = function (_g190, ...)
  local names = _g190[1]
  local body = unstash({...})
  local _g191 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g192 = {"setenv", x}
    _g192.variable = true
    return(_g192)
  end)()}}, _g191))
end, module = "lib"}, mapt = {export = true, module = "lib", variable = true}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
  local body = unstash({...})
  local _g193 = sub(body, 0)
  add(environment, {})
  local _g194 = (function ()
    map(function (_g195)
      local name = _g195[1]
      local exp = _g195[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g193)))
  end)()
  drop(environment)
  return(_g194)
end, module = "lib"}, ["id-literal?"] = {export = true, module = "lib", variable = true}, write = {export = true, module = "lib", variable = true}, ["define-symbol"] = {export = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, module = "lib"}, inner = {export = true, module = "lib", variable = true}, pairwise = {export = true, module = "lib", variable = true}, keep = {export = true, module = "lib", variable = true}, guard = {export = true, macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, module = "lib"}, ["nil?"] = {export = true, module = "lib", variable = true}, each = {export = true, macro = function (_g196, ...)
  local t = _g196[1]
  local k = _g196[2]
  local v = _g196[3]
  local body = unstash({...})
  local _g197 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g198 = {"target"}
    _g198.lua = {"not", {"number?", k}}
    _g198.js = {"isNaN", {"parseInt", k}}
    return(_g198)
  end)(), join({"let", {v, {"get", t1, k}}}, _g197)}}})
end, module = "lib"}, ["empty?"] = {export = true, module = "lib", variable = true}, ["define-special"] = {export = true, macro = function (name, args, ...)
  local body = unstash({...})
  local _g199 = sub(body, 0)
  local form = join({"fn", args}, _g199)
  local keys = sub(_g199, length(_g199))
  eval(join((function ()
    local _g200 = {"setenv", {"quote", name}}
    _g200.form = {"quote", form}
    _g200.special = form
    return(_g200)
  end)(), keys))
  return(nil)
end, module = "lib"}, [">="] = {export = true, module = "lib", variable = true}, ["cat"] = {export = true, module = "lib", variable = true}, ["string-literal?"] = {export = true, module = "lib", variable = true}, ["let-macro"] = {export = true, macro = function (definitions, ...)
  local body = unstash({...})
  local _g201 = sub(body, 0)
  add(environment, {})
  local _g202 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g201)))
  end)()
  drop(environment)
  return(_g202)
end, module = "lib"}, ["special-form?"] = {export = true, module = "lib", variable = true}, extend = {export = true, module = "lib", variable = true}, ["-"] = {export = true, module = "lib", variable = true}, ["/"] = {export = true, module = "lib", variable = true}, ["keys?"] = {export = true, module = "lib", variable = true}, define = {export = true, macro = function (name, x, ...)
  local body = unstash({...})
  local _g203 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g203))
end, module = "lib"}, getenv = {export = true, module = "lib", variable = true}, setenv = {export = true, module = "lib", variable = true}, ["%"] = {export = true, module = "lib", variable = true}, let = {export = true, macro = function (bindings, ...)
  local body = unstash({...})
  local _g204 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g205)
    local lh = _g205[1]
    local rh = _g205[2]
    local _g207 = 0
    local _g206 = bind(lh, rh)
    while (_g207 < length(_g206)) do
      local _g208 = _g206[(_g207 + 1)]
      local id = _g208[1]
      local val = _g208[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g207 = (_g207 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g204)})))
end, module = "lib"}, ["join*"] = {export = true, macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, module = "lib"}, ["make-id"] = {export = true, module = "lib", variable = true}, ["+"] = {export = true, module = "lib", variable = true}, ["to-string"] = {export = true, module = "lib", variable = true}, ["<"] = {export = true, module = "lib", variable = true}, inc = {export = true, macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, module = "lib"}, fn = {export = true, macro = function (args, ...)
  local body = unstash({...})
  local _g209 = sub(body, 0)
  local _g210 = bind_arguments(args, _g209)
  local args = _g210[1]
  local _g211 = _g210[2]
  return(join({"%function", args}, _g211))
end, module = "lib"}, ["="] = {export = true, module = "lib", variable = true}, [">"] = {export = true, module = "lib", variable = true}, across = {export = true, macro = function (_g212, ...)
  local l = _g212[1]
  local v = _g212[2]
  local i = _g212[3]
  local start = _g212[4]
  local body = unstash({...})
  local _g213 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g213, {{"inc", i}}))}})
end, module = "lib"}, add = {export = true, module = "lib", variable = true}, exclude = {export = true, module = "lib", variable = true}, map = {export = true, module = "lib", variable = true}, ["special?"] = {export = true, module = "lib", variable = true}, dec = {export = true, macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, module = "lib"}, ["string?"] = {export = true, module = "lib", variable = true}, iterate = {export = true, module = "lib", variable = true}, code = {export = true, module = "lib", variable = true}, reverse = {export = true, module = "lib", variable = true}, ["<="] = {export = true, module = "lib", variable = true}, ["parse-number"] = {export = true, module = "lib", variable = true}, macroexpand = {export = true, module = "lib", variable = true}, at = {export = true, macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, module = "lib"}, mapo = {export = true, module = "lib", variable = true}, ["boolean?"] = {export = true, module = "lib", variable = true}, ["join!"] = {export = true, macro = function (a, ...)
  local bs = unstash({...})
  local _g214 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g214)})
end, module = "lib"}, language = {export = true, macro = function ()
  return({"quote", target})
end, module = "lib"}, ["map*"] = {export = true, module = "lib", variable = true}, exit = {export = true, module = "lib", variable = true}, ["define-local"] = {export = true, macro = function (name, x, ...)
  local body = unstash({...})
  local _g215 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g215)) then
    local _g216 = bind_arguments(x, _g215)
    local args = _g216[1]
    local _g217 = _g216[2]
    return(join({"%local-function", name, args}, _g217))
  else
    return({"%local", name, x})
  end
end, module = "lib"}, length = {export = true, module = "lib", variable = true}, hd = {export = true, module = "lib", variable = true}, ["define-global"] = {export = true, macro = function (name, x, ...)
  local body = unstash({...})
  local _g218 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g218)) then
    local _g219 = bind_arguments(x, _g218)
    local args = _g219[1]
    local _g220 = _g219[2]
    return(join({"%global-function", name, args}, _g220))
  else
    return({"set", name, x})
  end
end, module = "lib"}, ["set-of"] = {export = true, macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g222 = 0
  local _g221 = elements
  while (_g222 < length(_g221)) do
    local e = _g221[(_g222 + 1)]
    l[e] = true
    _g222 = (_g222 + 1)
  end
  return(join({"table"}, l))
end, module = "lib"}, join = {export = true, module = "lib", variable = true}, char = {export = true, module = "lib", variable = true}, apply = {export = true, module = "lib", variable = true}, ["define-macro"] = {export = true, macro = function (name, args, ...)
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
end, module = "lib"}, target = {variable = true, export = true, macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, module = "lib"}, tl = {export = true, module = "lib", variable = true}}, reader = {["read-all"] = {export = true, module = "reader", variable = true}, ["make-stream"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, macro = function (_g225, ...)
  local char = _g225[1]
  local stream = _g225[2]
  local body = unstash({...})
  local _g226 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g226)})
end, module = "reader"}, read = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}}, main = {}, compiler = {eval = {export = true, module = "compiler", variable = true}, ["%local"] = {stmt = true, export = true, special = function (_g227)
  local name = _g227[1]
  local value = _g227[2]
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
end, module = "compiler"}, ["not"] = {special = function (_g228)
  local x = _g228[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, export = true, module = "compiler"}, ["compile-toplevel"] = {export = true, module = "compiler", variable = true}, ["do"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["%try"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g229 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g229)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g230 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g230)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end}, ["%global-function"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (_g231)
  local name = _g231[1]
  local args = _g231[2]
  local body = sub(_g231, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end}, ["error"] = {stmt = true, export = true, special = function (_g232)
  local x = _g232[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, module = "compiler"}, compile = {export = true, module = "compiler", variable = true}, ["%array"] = {special = function (forms)
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
  local _g233 = forms
  while (i < length(_g233)) do
    local x = _g233[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, export = true, module = "compiler"}, ["compile-module"] = {export = true, module = "compiler", variable = true}, ["compiler-output"] = {export = true, module = "compiler", variable = true}, ["if"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (form, tail63)
  local str = ""
  local i = 0
  local _g234 = form
  while (i < length(_g234)) do
    local condition = _g234[(i + 1)]
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
end}, ["while"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (_g235)
  local condition = _g235[1]
  local body = sub(_g235, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g236 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g236)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end}, ["return"] = {stmt = true, export = true, special = function (_g237)
  local x = _g237[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, module = "compiler"}, ["set"] = {stmt = true, export = true, special = function (_g238)
  local lh = _g238[1]
  local rh = _g238[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, module = "compiler"}, ["break"] = {stmt = true, export = true, special = function (_g6)
  return((indentation() .. "break"))
end, module = "compiler"}, ["%object"] = {special = function (forms)
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
  local _g239 = pairs
  while (i < length(_g239)) do
    local _g240 = _g239[(i + 1)]
    local k = _g240[1]
    local v = _g240[2]
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
end, export = true, module = "compiler"}, ["quote-environment"] = {export = true, module = "compiler", variable = true}, ["quote-modules"] = {export = true, module = "compiler", variable = true}, ["%for"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (_g241)
  local _g242 = _g241[1]
  local t = _g242[1]
  local k = _g242[2]
  local body = sub(_g241, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g243 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g243)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end}, ["%function"] = {special = function (_g244)
  local args = _g244[1]
  local body = sub(_g244, 1)
  return(compile_function(args, body))
end, export = true, module = "compiler"}, ["get"] = {special = function (_g245)
  local t = _g245[1]
  local k = _g245[2]
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
end, export = true, module = "compiler"}, ["define-module"] = {export = true, macro = function (spec, ...)
  local body = unstash({...})
  local _g246 = sub(body, 0)
  local exp = _g246.export
  local imp = _g246.import
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g248 = 0
  local _g247 = (exp or {})
  while (_g248 < length(_g247)) do
    local x = _g247[(_g248 + 1)]
    exports[x] = true
    _g248 = (_g248 + 1)
  end
  return(nil)
end, module = "compiler"}, ["with-indent"] = {export = true, macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, module = "compiler"}, ["%local-function"] = {tr = true, export = true, module = "compiler", stmt = true, special = function (_g249)
  local name = _g249[1]
  local args = _g249[2]
  local body = sub(_g249, 2)
  return(compile_function(args, body, {_stash = true, prefix = "local ", name = name}))
end}, ["open-module"] = {export = true, module = "compiler", variable = true}}}
environment = {{["define-module"] = {export = true, macro = function (spec, ...)
  local body = unstash({...})
  local _g250 = sub(body, 0)
  local exp = _g250.export
  local imp = _g250.import
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g252 = 0
  local _g251 = (exp or {})
  while (_g252 < length(_g251)) do
    local x = _g251[(_g252 + 1)]
    exports[x] = true
    _g252 = (_g252 + 1)
  end
  return(nil)
end, module = "compiler"}}}
function rep(str)
  local _g253 = (function ()
    local _g254,_g255 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g254, _g255})
  end)()
  local _g1 = _g253[1]
  local x = _g253[2]
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
  print((to_string("usage: lumen [options] [inputs]") .. " "))
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
  local inputs = {}
  local output = nil
  local target1 = nil
  local expr = nil
  local i = 0
  local _g256 = args
  while (i < length(_g256)) do
    local arg = _g256[(i + 1)]
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
    elseif ("-" ~= char(arg, 0)) then
      add(inputs, arg)
    end
    i = (i + 1)
  end
  if output then
    if target1 then
      target = target1
    end
    map(compile_module, inputs)
    return(write_file(output, compiler_output))
  else
    map(load_module, inputs)
    map(open_module, imports)
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end
main()
