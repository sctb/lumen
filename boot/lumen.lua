infix = {common = {["%"] = true, [">="] = true, ["-"] = true, [">"] = true, ["/"] = true, ["*"] = true, ["<="] = true, ["+"] = true, ["<"] = true}, lua = {["="] = "==", ["or"] = true, ["and"] = true, ["cat"] = "..", ["~="] = true}, js = {["="] = "===", ["or"] = "||", ["and"] = "&&", ["cat"] = "+", ["~="] = "!="}}
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
    local _g15 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
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
  local name = _g16.name
  local prefix = _g16.prefix
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
  local special = _g18.special
  local stmt = _g18.stmt
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
function exported63(m, x)
  return((x.export and (m == x.module)))
end
function open_module(spec)
  local m = to_string(spec)
  local toplevel = hd(environment)
  local k = nil
  local _g64 = modules[m]
  for k in next, _g64 do
    if (not number63(k)) then
      local v = _g64[k]
      if exported63(m, v) then
        toplevel[k] = v
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
    if exported63(k, x) then
      return(join({"table"}, quote_binding(x)))
    end
  end, m)))
end
function quote_modules()
  return(join({"table"}, mapt(quote_module, modules)))
end
function setenv(k, ...)
  local keys = unstash({...})
  local _g72 = sub(keys, 0)
  local frame = last(environment)
  local x = (frame[k] or {})
  local k1 = nil
  local _g73 = _g72
  for k1 in next, _g73 do
    if (not number63(k1)) then
      local v = _g73[k1]
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
    local _g125 = args
    for k in next, _g125 do
      if (not number63(k)) then
        local v = _g125[k]
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
    local _g126 = args
    for k in next, _g126 do
      if (not number63(k)) then
        local v = _g126[k]
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
      local _g127 = l
      for k in next, _g127 do
        if (not number63(k)) then
          local v = _g127[k]
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
    local _g129 = 0
    local _g128 = args
    while (_g129 < length(_g128)) do
      local arg = _g128[(_g129 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g129 = (_g129 + 1)
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
    local _g130 = lh
    while (i < length(_g130)) do
      local x = _g130[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g131 = lh
    for k in next, _g131 do
      if (not number63(k)) then
        local v = _g131[k]
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
      local _g132 = form[2]
      local t = _g132[1]
      local k = _g132[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g4 = form[1]
      local args = form[2]
      local _g133 = sub(form, 2)
      add(environment, {})
      local _g135 = (function ()
        local _g137 = 0
        local _g136 = args
        while (_g137 < length(_g136)) do
          local _g134 = _g136[(_g137 + 1)]
          setenv(_g134, {_stash = true, variable = true})
          _g137 = (_g137 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g133)))
      end)()
      drop(environment)
      return(_g135)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g5 = form[1]
      local name = form[2]
      local _g138 = form[3]
      local _g139 = sub(form, 3)
      add(environment, {})
      local _g141 = (function ()
        local _g143 = 0
        local _g142 = _g138
        while (_g143 < length(_g142)) do
          local _g140 = _g142[(_g143 + 1)]
          setenv(_g140, {_stash = true, variable = true})
          _g143 = (_g143 + 1)
        end
        return(join({x, name, map42(macroexpand, _g138)}, macroexpand(_g139)))
      end)()
      drop(environment)
      return(_g141)
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
  local _g144 = form
  for k in next, _g144 do
    if (not number63(k)) then
      local v = _g144[k]
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
  local _g146 = 0
  local _g145 = form
  while (_g146 < length(_g145)) do
    local x = _g145[(_g146 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g146 = (_g146 + 1)
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
  local _g147 = (upto or length(l))
  local l2 = {}
  while (i < _g147) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g148 = (from or 0)
  if string63(x) then
    return(substring(x, _g148, upto))
  else
    local l = sublist(x, _g148, upto)
    local k = nil
    local _g149 = x
    for k in next, _g149 do
      if (not number63(k)) then
        local v = _g149[k]
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
    local _g150 = l1
    for k in next, _g150 do
      if (not number63(k)) then
        local v = _g150[k]
        l[k] = v
      end
    end
    local _g152 = nil
    local _g151 = l2
    for _g152 in next, _g151 do
      if (not number63(_g152)) then
        local v = _g151[_g152]
        l[_g152] = v
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
  local _g154 = 0
  local _g153 = l
  while (_g154 < length(_g153)) do
    local x = _g153[(_g154 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g154 = (_g154 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g156 = 0
  local _g155 = l
  while (_g156 < length(_g155)) do
    local x = _g155[(_g156 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g156 = (_g156 + 1)
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
  local _g166 = 0
  local _g165 = l
  while (_g166 < length(_g165)) do
    local x = _g165[(_g166 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g166 = (_g166 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g167 = t
  for k in next, _g167 do
    if (not number63(k)) then
      local v = _g167[k]
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
  local _g168 = t
  for k in next, _g168 do
    if (not number63(k)) then
      local v = _g168[k]
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
  local _g169 = t
  for k in next, _g169 do
    if (not number63(k)) then
      local v = _g169[k]
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
  local _g170 = t
  for k in next, _g170 do
    if (not number63(k)) then
      local v = _g170[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g171 = sub(xs, 0)
  return(join(t, _g171))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g172 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g173 = t
  for k in next, _g173 do
    if (not number63(k)) then
      local v = _g173[k]
      if (not _g172[k]) then
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
  local _g174 = (function ()
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
  local _g175 = sub(xs, 0)
  if empty63(_g175) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g175))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g178 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g178))
end
function _(...)
  local xs = unstash({...})
  local _g179 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g179)))
end
function _42(...)
  local xs = unstash({...})
  local _g180 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g180))
end
function _47(...)
  local xs = unstash({...})
  local _g181 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g181)))
end
function _37(...)
  local xs = unstash({...})
  local _g182 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g182)))
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
    local _g183 = x
    for k in next, _g183 do
      if (not number63(k)) then
        local v = _g183[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g184 = x1
    while (i < length(_g184)) do
      local y = _g184[(i + 1)]
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
  local _g185 = stash(args)
  return(f(unpack(_g185)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
delimiters = {["\n"] = true, [";"] = true, [")"] = true, ["("] = true}
whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
function make_stream(str)
  return({len = length(str), string = str, pos = 0})
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
modules = {main = {}, lib = {code = {variable = true, export = true, module = "lib"}, language = {macro = function ()
  return({"quote", target})
end, export = true, module = "lib"}, ["read-file"] = {variable = true, export = true, module = "lib"}, ["special-form?"] = {variable = true, export = true, module = "lib"}, target = {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, variable = true, export = true, module = "lib"}, reverse = {variable = true, export = true, module = "lib"}, drop = {variable = true, export = true, module = "lib"}, list = {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g189 = body
    for k in next, _g189 do
      if (not number63(k)) then
        local v = _g189[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, export = true, module = "lib"}, last = {variable = true, export = true, module = "lib"}, ["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, export = true, module = "lib"}, ["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g190 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g190)})
end, export = true, module = "lib"}, ["nil?"] = {variable = true, export = true, module = "lib"}, search = {variable = true, export = true, module = "lib"}, reduce = {variable = true, export = true, module = "lib"}, getenv = {variable = true, export = true, module = "lib"}, [">="] = {variable = true, export = true, module = "lib"}, ["map*"] = {variable = true, export = true, module = "lib"}, at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, export = true, module = "lib"}, ["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g191 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g191)) then
    local _g192 = bind_arguments(x, _g191)
    local args = _g192[1]
    local _g193 = _g192[2]
    return(join({"%global-function", name, args}, _g193))
  else
    return({"set", name, x})
  end
end, export = true, module = "lib"}, ["composite?"] = {variable = true, export = true, module = "lib"}, inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, export = true, module = "lib"}, split = {variable = true, export = true, module = "lib"}, ["parse-number"] = {variable = true, export = true, module = "lib"}, map = {variable = true, export = true, module = "lib"}, hd = {variable = true, export = true, module = "lib"}, each = {macro = function (_g194, ...)
  local t = _g194[1]
  local k = _g194[2]
  local v = _g194[3]
  local body = unstash({...})
  local _g195 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g196 = {"target"}
    _g196.lua = {"not", {"number?", k}}
    _g196.js = {"isNaN", {"parseInt", k}}
    return(_g196)
  end)(), join({"let", {v, {"get", t1, k}}}, _g195)}}})
end, export = true, module = "lib"}, define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g197 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g197))
end, export = true, module = "lib"}, ["cat"] = {variable = true, export = true, module = "lib"}, ["list?"] = {variable = true, export = true, module = "lib"}, exclude = {variable = true, export = true, module = "lib"}, apply = {variable = true, export = true, module = "lib"}, ["="] = {variable = true, export = true, module = "lib"}, [">"] = {variable = true, export = true, module = "lib"}, pr = {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, export = true, module = "lib"}, macroexpand = {variable = true, export = true, module = "lib"}, ["<"] = {variable = true, export = true, module = "lib"}, ["is?"] = {variable = true, export = true, module = "lib"}, ["make-id"] = {variable = true, export = true, module = "lib"}, char = {variable = true, export = true, module = "lib"}, ["-"] = {variable = true, export = true, module = "lib"}, ["to-string"] = {variable = true, export = true, module = "lib"}, ["/"] = {variable = true, export = true, module = "lib"}, ["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g198 = sub(body, 0)
  local form = join({"fn", args}, _g198)
  local keys = sub(_g198, length(_g198))
  eval(join((function ()
    local _g199 = {"setenv", {"quote", name}}
    _g199.special = form
    _g199.form = {"quote", form}
    return(_g199)
  end)(), keys))
  return(nil)
end, export = true, module = "lib"}, ["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, export = true, module = "lib"}, ["+"] = {variable = true, export = true, module = "lib"}, ["string?"] = {variable = true, export = true, module = "lib"}, ["with-bindings"] = {macro = function (_g200, ...)
  local names = _g200[1]
  local body = unstash({...})
  local _g201 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g202 = {"setenv", x}
    _g202.variable = true
    return(_g202)
  end)()}}, _g201))
end, export = true, module = "lib"}, across = {macro = function (_g203, ...)
  local l = _g203[1]
  local v = _g203[2]
  local i = _g203[3]
  local start = _g203[4]
  local body = unstash({...})
  local _g204 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g204, {{"inc", i}}))}})
end, export = true, module = "lib"}, length = {variable = true, export = true, module = "lib"}, ["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g205 = sub(body, 0)
  add(environment, {})
  local _g206 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g205)))
  end)()
  drop(environment)
  return(_g206)
end, export = true, module = "lib"}, ["id-literal?"] = {variable = true, export = true, module = "lib"}, ["string-literal?"] = {variable = true, export = true, module = "lib"}, inner = {variable = true, export = true, module = "lib"}, ["special?"] = {variable = true, export = true, module = "lib"}, ["boolean?"] = {variable = true, export = true, module = "lib"}, ["write-file"] = {variable = true, export = true, module = "lib"}, guard = {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, export = true, module = "lib"}, pairwise = {variable = true, export = true, module = "lib"}, quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end, export = true, module = "lib"}, ["number?"] = {variable = true, export = true, module = "lib"}, ["stash*"] = {variable = true, export = true, module = "lib"}, extend = {variable = true, export = true, module = "lib"}, ["function?"] = {variable = true, export = true, module = "lib"}, write = {variable = true, export = true, module = "lib"}, ["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g207 = sub(body, 0)
  local form = join({"fn", args}, _g207)
  eval((function ()
    local _g208 = {"setenv", {"quote", name}}
    _g208.form = {"quote", form}
    _g208.macro = form
    return(_g208)
  end)())
  return(nil)
end, export = true, module = "lib"}, exit = {variable = true, export = true, module = "lib"}, setenv = {variable = true, export = true, module = "lib"}, sub = {variable = true, export = true, module = "lib"}, ["*"] = {variable = true, export = true, module = "lib"}, ["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g209 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g209)})
end, export = true, module = "lib"}, ["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g210 = xs
    while (i < length(_g210)) do
      local x = _g210[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, export = true, module = "lib"}, replicate = {variable = true, export = true, module = "lib"}, add = {variable = true, export = true, module = "lib"}, ["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, export = true, module = "lib"}, ["table?"] = {variable = true, export = true, module = "lib"}, ["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g211 = sub(body, 0)
  add(environment, {})
  local _g212 = (function ()
    map(function (_g213)
      local name = _g213[1]
      local exp = _g213[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g211)))
  end)()
  drop(environment)
  return(_g212)
end, export = true, module = "lib"}, quoted = {variable = true, export = true, module = "lib"}, unstash = {variable = true, export = true, module = "lib"}, join = {variable = true, export = true, module = "lib"}, fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g214 = sub(body, 0)
  local _g215 = bind_arguments(args, _g214)
  local args = _g215[1]
  local _g216 = _g215[2]
  return(join({"%function", args}, _g216))
end, export = true, module = "lib"}, find = {variable = true, export = true, module = "lib"}, ["empty?"] = {variable = true, export = true, module = "lib"}, ["atom?"] = {variable = true, export = true, module = "lib"}, ["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g218 = 0
  local _g217 = elements
  while (_g218 < length(_g217)) do
    local e = _g217[(_g218 + 1)]
    l[e] = true
    _g218 = (_g218 + 1)
  end
  return(join({"table"}, l))
end, export = true, module = "lib"}, mapo = {variable = true, export = true, module = "lib"}, quote = {macro = function (form)
  return(quoted(form))
end, export = true, module = "lib"}, ["%"] = {variable = true, export = true, module = "lib"}, splice = {variable = true, export = true, module = "lib"}, let = {macro = function (bindings, ...)
  local body = unstash({...})
  local _g219 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g220)
    local lh = _g220[1]
    local rh = _g220[2]
    local _g222 = 0
    local _g221 = bind(lh, rh)
    while (_g222 < length(_g221)) do
      local _g223 = _g221[(_g222 + 1)]
      local id = _g223[1]
      local val = _g223[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g222 = (_g222 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g219)})))
end, export = true, module = "lib"}, keep = {variable = true, export = true, module = "lib"}, ["keys?"] = {variable = true, export = true, module = "lib"}, dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, export = true, module = "lib"}, table = {macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g2, x)
    return(x)
  end, body)))
end, export = true, module = "lib"}, tl = {variable = true, export = true, module = "lib"}, ["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g224 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g224)) then
    local _g225 = bind_arguments(x, _g224)
    local args = _g225[1]
    local _g226 = _g225[2]
    return(join({"%local-function", name, args}, _g226))
  else
    return({"%local", name, x})
  end
end, export = true, module = "lib"}, iterate = {variable = true, export = true, module = "lib"}, ["<="] = {variable = true, export = true, module = "lib"}, mapt = {variable = true, export = true, module = "lib"}}, reader = {read = {variable = true, export = true, module = "reader"}, ["read-from-string"] = {variable = true, export = true, module = "reader"}, ["define-reader"] = {macro = function (_g227, ...)
  local char = _g227[1]
  local stream = _g227[2]
  local body = unstash({...})
  local _g228 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g228)})
end, export = true, module = "reader"}, ["read-all"] = {variable = true, export = true, module = "reader"}, ["make-stream"] = {variable = true, export = true, module = "reader"}}, compiler = {["%function"] = {special = function (_g229)
  local args = _g229[1]
  local body = sub(_g229, 1)
  return(compile_function(args, body))
end, export = true, module = "compiler"}, ["%array"] = {special = function (forms)
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
  local _g230 = forms
  while (i < length(_g230)) do
    local x = _g230[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, export = true, module = "compiler"}, ["not"] = {special = function (_g231)
  local x = _g231[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, export = true, module = "compiler"}, ["return"] = {special = function (_g232)
  local x = _g232[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true, export = true, module = "compiler"}, compile = {variable = true, export = true, module = "compiler"}, ["quote-environment"] = {variable = true, export = true, module = "compiler"}, ["open-module"] = {variable = true, export = true, module = "compiler"}, ["break"] = {special = function (_g6)
  return((indentation() .. "break"))
end, stmt = true, export = true, module = "compiler"}, ["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g233 = sub(body, 0)
  local imp = _g233.import
  local exp = _g233.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g235 = 0
  local _g234 = (exp or {})
  while (_g235 < length(_g234)) do
    local x = _g234[(_g235 + 1)]
    exports[x] = true
    _g235 = (_g235 + 1)
  end
  return(nil)
end, export = true, module = "compiler"}, eval = {variable = true, export = true, module = "compiler"}, ["%for"] = {special = function (_g236)
  local _g237 = _g236[1]
  local t = _g237[1]
  local k = _g237[2]
  local body = sub(_g236, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g238 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g238)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, stmt = true, export = true, module = "compiler", tr = true}, ["%local"] = {special = function (_g239)
  local name = _g239[1]
  local value = _g239[2]
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
end, stmt = true, export = true, module = "compiler"}, ["%local-function"] = {special = function (_g240)
  local name = _g240[1]
  local args = _g240[2]
  local body = sub(_g240, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, export = true, module = "compiler", tr = true}, ["while"] = {special = function (_g241)
  local condition = _g241[1]
  local body = sub(_g241, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g242 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g242)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, export = true, module = "compiler", tr = true}, ["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, export = true, module = "compiler", tr = true}, ["compiler-output"] = {variable = true, export = true, module = "compiler"}, ["set"] = {special = function (_g243)
  local lh = _g243[1]
  local rh = _g243[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true, export = true, module = "compiler"}, ["compile-toplevel"] = {variable = true, export = true, module = "compiler"}, ["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, export = true, module = "compiler"}, ["%object"] = {special = function (forms)
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
  local _g244 = pairs
  while (i < length(_g244)) do
    local _g245 = _g244[(i + 1)]
    local k = _g245[1]
    local v = _g245[2]
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
end, export = true, module = "compiler"}, ["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g246 = form
  while (i < length(_g246)) do
    local condition = _g246[(i + 1)]
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
end, stmt = true, export = true, module = "compiler", tr = true}, ["with-module"] = {macro = function (k, ...)
  local body = unstash({...})
  local _g247 = sub(body, 0)
  local env0 = make_id()
  local env1 = make_id()
  local x = make_id()
  return({"let", {env0, "environment", env1, {"list", {"get", "modules", k}, {"tl", "environment"}}}, {"set", "environment", env1}, {"let", {x, join({"do"}, _g247)}, {"set", "environment", env0}, x}})
end, export = true, module = "compiler"}, ["load-module"] = {variable = true, export = true, module = "compiler"}, ["error"] = {special = function (_g248)
  local x = _g248[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true, export = true, module = "compiler"}, ["compile-module"] = {variable = true, export = true, module = "compiler"}, ["%global-function"] = {special = function (_g249)
  local name = _g249[1]
  local args = _g249[2]
  local body = sub(_g249, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, export = true, module = "compiler", tr = true}, ["%try"] = {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g250 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g250)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g251 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g251)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, export = true, module = "compiler", tr = true}, ["get"] = {special = function (_g252)
  local t = _g252[1]
  local k = _g252[2]
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
end, export = true, module = "compiler"}, ["quote-modules"] = {variable = true, export = true, module = "compiler"}}}
environment = {{["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g253 = sub(body, 0)
  local imp = _g253.import
  local exp = _g253.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g255 = 0
  local _g254 = (exp or {})
  while (_g255 < length(_g254)) do
    local x = _g254[(_g255 + 1)]
    exports[x] = true
    _g255 = (_g255 + 1)
  end
  return(nil)
end, export = true, module = "compiler"}}}
function rep(str)
  local _g256 = (function ()
    local _g257,_g258 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g257, _g258})
  end)()
  local _g1 = _g256[1]
  local x = _g256[2]
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
  local _g259 = args
  while (i < length(_g259)) do
    local arg = _g259[(i + 1)]
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
    print((to_string(environment) .. " "))
    load_module(module)
    local _g260 = environment
    local _g261 = {modules[module], tl(environment)}
    environment = _g261
    local _g262 = (function ()
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end)()
    environment = _g260
    return(_g262)
  end
end
main()
