infix = {common = {["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", ["cat"] = "+"}, lua = {["="] = "==", ["cat"] = "..", ["~="] = true, ["and"] = true, ["or"] = true}}
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
  local name = _g15.name
  local prefix = _g15.prefix
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
  local special = _g17.special
  local stmt = _g17.stmt
  local self_tr63 = _g17.tr
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
current_module = nil
compiler_output = nil
compiling63 = false
compiling = {}
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  return(compile_toplevel(join({"do"}, body)))
end
function initial_environment()
  return({{["define-module"] = getenv("define-module")}})
end
function module_key(spec)
  if (not atom63(spec)) then
    error("Unsupported module specification")
  else
    return(to_string(spec))
  end
end
function module(spec)
  return(modules[module_key(spec)])
end
function module_path(spec)
  return((module_key(spec) .. ".l"))
end
function recompile63(spec)
  return((compiling63 and nil63(compiling[module_key(spec)])))
end
function load_module(spec)
  if (nil63(module(spec)) or recompile63(spec)) then
    _37compile_module(spec)
  end
  return(open_module(spec))
end
function _37compile_module(spec)
  local path = module_path(spec)
  local mod0 = current_module
  local env0 = environment
  local k = module_key(spec)
  compiling[k] = true
  current_module = spec
  environment = initial_environment()
  local compiled = compile_file(path)
  local m = module(spec)
  local toplevel = hd(environment)
  current_module = mod0
  environment = env0
  local name = nil
  local _g62 = toplevel
  for name in next, _g62 do
    if (not number63(name)) then
      local binding = _g62[name]
      if (binding.module == k) then
        m.toplevel[name] = binding
      end
    end
  end
  if compiling63 then
    compiler_output = (compiler_output .. compiled)
  else
    return(run(compiled))
  end
end
function open_module(spec)
  local m = module(spec)
  local frame = last(environment)
  local k = nil
  local _g63 = m.toplevel
  for k in next, _g63 do
    if (not number63(k)) then
      local v = _g63[k]
      if v.export then
        frame[k] = v
      end
    end
  end
end
function in_module(spec)
  load_module(spec)
  local m = module(spec)
  local frame = last(environment)
  local k = nil
  local _g64 = m.toplevel
  for k in next, _g64 do
    if (not number63(k)) then
      local v = _g64[k]
      frame[k] = v
    end
  end
  return(map(open_module, m.import))
end
function compile_module(spec)
  compiling63 = true
  compiler_output = ""
  return(load_module(spec))
end
function quote_binding(b)
  if b.module then
    b = extend(b, {_stash = true, module = {"quote", b.module}})
  end
  if is63(b.symbol) then
    return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
  elseif (b.macro and b.form) then
    return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
  elseif (b.special and b.form) then
    return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
  elseif is63(b.variable) then
    return(b)
  end
end
function quote_frame(t)
  return(join({"%object"}, mapo(function (_g7, b)
    return(join({"table"}, quote_binding(b)))
  end, t)))
end
function quote_environment(env)
  return(join({"list"}, map(quote_frame, env)))
end
function quote_module(m)
  local _g72 = {"table"}
  _g72.import = quoted(m.import)
  _g72.toplevel = quote_frame(m.toplevel)
  return(_g72)
end
function quote_modules()
  return(join({"table"}, map42(quote_module, modules)))
end
function setenv(k, ...)
  local keys = unstash({...})
  local _g73 = sub(keys, 0)
  if string63(k) then
    local frame = last(environment)
    local x = (frame[k] or {})
    local k1 = nil
    local _g74 = _g73
    for k1 in next, _g74 do
      if (not number63(k1)) then
        local v = _g74[k1]
        x[k1] = v
      end
    end
    x.module = current_module
    frame[k] = x
  end
end
function getenv(k)
  if string63(k) then
    return(find(function (e)
      return(e[k])
    end, reverse(environment)))
  end
end
function macro_function(k)
  local b = getenv(k)
  return((b and b.macro))
end
function macro63(k)
  return(is63(macro_function(k)))
end
function special63(k)
  local b = getenv(k)
  return((b and is63(b.special)))
end
function special_form63(form)
  return((list63(form) and special63(hd(form))))
end
function symbol_expansion(k)
  local b = getenv(k)
  return((b and b.symbol))
end
function symbol63(k)
  return(is63(symbol_expansion(k)))
end
function variable63(k)
  local b = last(environment)[k]
  return((b and is63(b.variable)))
end
function bound63(x)
  return((macro63(x) or special63(x) or symbol63(x) or variable63(x)))
end
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
    local _g126 = args
    for k in next, _g126 do
      if (not number63(k)) then
        local v = _g126[k]
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
    local _g127 = args
    for k in next, _g127 do
      if (not number63(k)) then
        local v = _g127[k]
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
      local _g128 = l
      for k in next, _g128 do
        if (not number63(k)) then
          local v = _g128[k]
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
    local _g130 = 0
    local _g129 = args
    while (_g130 < length(_g129)) do
      local arg = _g129[(_g130 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g130 = (_g130 + 1)
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
    local _g131 = lh
    while (i < length(_g131)) do
      local x = _g131[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g132 = lh
    for k in next, _g132 do
      if (not number63(k)) then
        local v = _g132[k]
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
      local _g133 = form[2]
      local t = _g133[1]
      local k = _g133[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g4 = form[1]
      local args = form[2]
      local _g134 = sub(form, 2)
      add(environment, {})
      local _g136 = (function ()
        local _g138 = 0
        local _g137 = args
        while (_g138 < length(_g137)) do
          local _g135 = _g137[(_g138 + 1)]
          setenv(_g135, {_stash = true, variable = true})
          _g138 = (_g138 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g134)))
      end)()
      drop(environment)
      return(_g136)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g5 = form[1]
      local name = form[2]
      local _g139 = form[3]
      local _g140 = sub(form, 3)
      add(environment, {})
      local _g142 = (function ()
        local _g144 = 0
        local _g143 = _g139
        while (_g144 < length(_g143)) do
          local _g141 = _g143[(_g144 + 1)]
          setenv(_g141, {_stash = true, variable = true})
          _g144 = (_g144 + 1)
        end
        return(join({x, name, map42(macroexpand, _g139)}, macroexpand(_g140)))
      end)()
      drop(environment)
      return(_g142)
    elseif macro63(x) then
      local b = getenv(x)
      return(macroexpand(apply(b.macro, tl(form))))
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
  local _g145 = form
  for k in next, _g145 do
    if (not number63(k)) then
      local v = _g145[k]
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
  local _g147 = 0
  local _g146 = form
  while (_g147 < length(_g146)) do
    local x = _g146[(_g147 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g147 = (_g147 + 1)
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
  local _g148 = (upto or length(l))
  local l2 = {}
  while (i < _g148) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g149 = (from or 0)
  if string63(x) then
    return(substring(x, _g149, upto))
  else
    local l = sublist(x, _g149, upto)
    local k = nil
    local _g150 = x
    for k in next, _g150 do
      if (not number63(k)) then
        local v = _g150[k]
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
    local _g151 = l1
    for k in next, _g151 do
      if (not number63(k)) then
        local v = _g151[k]
        l[k] = v
      end
    end
    local _g153 = nil
    local _g152 = l2
    for _g153 in next, _g152 do
      if (not number63(_g153)) then
        local v = _g152[_g153]
        l[_g153] = v
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
  local _g155 = 0
  local _g154 = l
  while (_g155 < length(_g154)) do
    local x = _g154[(_g155 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g155 = (_g155 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g157 = 0
  local _g156 = l
  while (_g157 < length(_g156)) do
    local x = _g156[(_g157 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g157 = (_g157 + 1)
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
  local _g167 = 0
  local _g166 = l
  while (_g167 < length(_g166)) do
    local x = _g166[(_g167 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g167 = (_g167 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g168 = t
  for k in next, _g168 do
    if (not number63(k)) then
      local v = _g168[k]
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
  local _g169 = t
  for k in next, _g169 do
    if (not number63(k)) then
      local v = _g169[k]
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
  local _g170 = t
  for k in next, _g170 do
    if (not number63(k)) then
      local v = _g170[k]
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
  local _g171 = t
  for k in next, _g171 do
    if (not number63(k)) then
      local v = _g171[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g172 = sub(xs, 0)
  return(join(t, _g172))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g173 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g174 = t
  for k in next, _g174 do
    if (not number63(k)) then
      local v = _g174[k]
      if (not _g173[k]) then
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
  local _g175 = (function ()
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
  local _g176 = sub(xs, 0)
  if empty63(_g176) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g176))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g179 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g179))
end
function _(...)
  local xs = unstash({...})
  local _g180 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g180)))
end
function _42(...)
  local xs = unstash({...})
  local _g181 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g181))
end
function _47(...)
  local xs = unstash({...})
  local _g182 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g182)))
end
function _37(...)
  local xs = unstash({...})
  local _g183 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g183)))
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
    local _g184 = x
    for k in next, _g184 do
      if (not number63(k)) then
        local v = _g184[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g185 = x1
    while (i < length(_g185)) do
      local y = _g185[(i + 1)]
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
  local _g186 = stash(args)
  return(f(unpack(_g186)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
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
modules = {lib = {toplevel = {keep = {module = "lib", variable = true, export = true}, ["number?"] = {module = "lib", variable = true, export = true}, language = {module = "lib", macro = function ()
  return({"quote", target})
end, export = true}, ["nil?"] = {module = "lib", variable = true, export = true}, ["define-macro"] = {module = "lib", macro = function (name, args, ...)
  local body = unstash({...})
  local _g190 = sub(body, 0)
  local form = join({"fn", args}, _g190)
  eval((function ()
    local _g191 = {"setenv", {"quote", name}}
    _g191.macro = form
    _g191.form = {"quote", form}
    return(_g191)
  end)())
  return(nil)
end, export = true}, ["string-literal?"] = {module = "lib", variable = true, export = true}, [">="] = {module = "lib", variable = true, export = true}, tl = {module = "lib", variable = true, export = true}, map = {module = "lib", variable = true, export = true}, exit = {module = "lib", variable = true, export = true}, replicate = {module = "lib", variable = true, export = true}, write = {module = "lib", variable = true, export = true}, ["keys?"] = {module = "lib", variable = true, export = true}, define = {module = "lib", macro = function (name, x, ...)
  local body = unstash({...})
  local _g192 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g192))
end, export = true}, ["define-global"] = {module = "lib", macro = function (name, x, ...)
  local body = unstash({...})
  local _g193 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g193)) then
    local _g194 = bind_arguments(x, _g193)
    local args = _g194[1]
    local _g195 = _g194[2]
    return(join({"%global-function", name, args}, _g195))
  else
    return({"set", name, x})
  end
end, export = true}, ["parse-number"] = {module = "lib", variable = true, export = true}, type = {module = "lib", variable = true, export = true}, guard = {module = "lib", macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, export = true}, add = {module = "lib", variable = true, export = true}, fn = {module = "lib", macro = function (args, ...)
  local body = unstash({...})
  local _g196 = sub(body, 0)
  local _g197 = bind_arguments(args, _g196)
  local args = _g197[1]
  local _g198 = _g197[2]
  return(join({"%function", args}, _g198))
end, export = true}, ["define-local"] = {module = "lib", macro = function (name, x, ...)
  local body = unstash({...})
  local _g199 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g199)) then
    local _g200 = bind_arguments(x, _g199)
    local args = _g200[1]
    local _g201 = _g200[2]
    return(join({"%local-function", name, args}, _g201))
  else
    return({"%local", name, x})
  end
end, export = true}, dec = {module = "lib", macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, export = true}, char = {module = "lib", variable = true, export = true}, split = {module = "lib", variable = true, export = true}, print = {module = "lib", variable = true, export = true}, quoted = {module = "lib", variable = true, export = true}, ["with-bindings"] = {module = "lib", macro = function (_g202, ...)
  local names = _g202[1]
  local body = unstash({...})
  local _g203 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g204 = {"setenv", x}
    _g204.variable = true
    return(_g204)
  end)()}}, _g203))
end, export = true}, inc = {module = "lib", macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, export = true}, last = {module = "lib", variable = true, export = true}, ["empty?"] = {module = "lib", variable = true, export = true}, iterate = {module = "lib", variable = true, export = true}, sub = {module = "lib", variable = true, export = true}, ["let-symbol"] = {module = "lib", macro = function (expansions, ...)
  local body = unstash({...})
  local _g205 = sub(body, 0)
  add(environment, {})
  local _g206 = (function ()
    map(function (_g207)
      local name = _g207[1]
      local exp = _g207[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g205)))
  end)()
  drop(environment)
  return(_g206)
end, export = true}, ["read-file"] = {module = "lib", variable = true, export = true}, quasiquote = {module = "lib", macro = function (form)
  return(quasiexpand(form, 1))
end, export = true}, exclude = {module = "lib", variable = true, export = true}, ["map*"] = {module = "lib", variable = true, export = true}, ["boolean?"] = {module = "lib", variable = true, export = true}, ["stash*"] = {module = "lib", variable = true, export = true}, search = {module = "lib", variable = true, export = true}, ["+"] = {module = "lib", variable = true, export = true}, getenv = {module = "lib", variable = true, export = true}, setenv = {module = "lib", variable = true, export = true}, ["is?"] = {module = "lib", variable = true, export = true}, ["%"] = {module = "lib", variable = true, export = true}, length = {module = "lib", variable = true, export = true}, reverse = {module = "lib", variable = true, export = true}, ["="] = {module = "lib", variable = true, export = true}, ["/"] = {module = "lib", variable = true, export = true}, ["with-frame"] = {module = "lib", macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, export = true}, table = {module = "lib", macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g2, x)
    return(x)
  end, body)))
end, export = true}, ["-"] = {module = "lib", variable = true, export = true}, reduce = {module = "lib", variable = true, export = true}, ["composite?"] = {module = "lib", variable = true, export = true}, ["join*"] = {module = "lib", macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, export = true}, mapt = {module = "lib", variable = true, export = true}, [">"] = {module = "lib", variable = true, export = true}, ["list*"] = {module = "lib", macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g208 = xs
    while (i < length(_g208)) do
      local x = _g208[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, export = true}, ["cat!"] = {module = "lib", macro = function (a, ...)
  local bs = unstash({...})
  local _g209 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g209)})
end, export = true}, join = {module = "lib", variable = true, export = true}, unstash = {module = "lib", variable = true, export = true}, ["list?"] = {module = "lib", variable = true, export = true}, ["let-macro"] = {module = "lib", macro = function (definitions, ...)
  local body = unstash({...})
  local _g210 = sub(body, 0)
  add(environment, {})
  local _g211 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g210)))
  end)()
  drop(environment)
  return(_g211)
end, export = true}, extend = {module = "lib", variable = true, export = true}, target = {module = "lib", macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, variable = true, export = true}, quote = {module = "lib", macro = function (form)
  return(quoted(form))
end, export = true}, ["define-special"] = {module = "lib", macro = function (name, args, ...)
  local body = unstash({...})
  local _g212 = sub(body, 0)
  local form = join({"fn", args}, _g212)
  local keys = sub(_g212, length(_g212))
  eval(join((function ()
    local _g213 = {"setenv", {"quote", name}}
    _g213.special = form
    _g213.form = {"quote", form}
    return(_g213)
  end)(), keys))
  return(nil)
end, export = true}, ["function?"] = {module = "lib", variable = true, export = true}, ["id-literal?"] = {module = "lib", variable = true, export = true}, ["make-id"] = {module = "lib", variable = true, export = true}, ["define-symbol"] = {module = "lib", macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, export = true}, ["join!"] = {module = "lib", macro = function (a, ...)
  local bs = unstash({...})
  local _g214 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g214)})
end, export = true}, let = {module = "lib", macro = function (bindings, ...)
  local body = unstash({...})
  local _g215 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g216)
    local lh = _g216[1]
    local rh = _g216[2]
    local _g218 = 0
    local _g217 = bind(lh, rh)
    while (_g218 < length(_g217)) do
      local _g219 = _g217[(_g218 + 1)]
      local id = _g219[1]
      local val = _g219[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g218 = (_g218 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g215)})))
end, export = true}, apply = {module = "lib", variable = true, export = true}, ["<="] = {module = "lib", variable = true, export = true}, each = {module = "lib", macro = function (_g220, ...)
  local t = _g220[1]
  local k = _g220[2]
  local v = _g220[3]
  local body = unstash({...})
  local _g221 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g222 = {"target"}
    _g222.js = {"isNaN", {"parseInt", k}}
    _g222.lua = {"not", {"number?", k}}
    return(_g222)
  end)(), join({"let", {v, {"get", t1, k}}}, _g221)}}})
end, export = true}, inner = {module = "lib", variable = true, export = true}, at = {module = "lib", macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, export = true}, code = {module = "lib", variable = true, export = true}, ["*"] = {module = "lib", variable = true, export = true}, ["set-of"] = {module = "lib", macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g224 = 0
  local _g223 = elements
  while (_g224 < length(_g223)) do
    local e = _g223[(_g224 + 1)]
    l[e] = true
    _g224 = (_g224 + 1)
  end
  return(join({"table"}, l))
end, export = true}, ["atom?"] = {module = "lib", variable = true, export = true}, ["cat"] = {module = "lib", variable = true, export = true}, ["<"] = {module = "lib", variable = true, export = true}, macroexpand = {module = "lib", variable = true, export = true}, ["table?"] = {module = "lib", variable = true, export = true}, ["write-file"] = {module = "lib", variable = true, export = true}, find = {module = "lib", variable = true, export = true}, hd = {module = "lib", variable = true, export = true}, ["special?"] = {module = "lib", variable = true, export = true}, mapo = {module = "lib", variable = true, export = true}, splice = {module = "lib", variable = true, export = true}, ["to-string"] = {module = "lib", variable = true, export = true}, across = {module = "lib", macro = function (_g225, ...)
  local l = _g225[1]
  local v = _g225[2]
  local i = _g225[3]
  local start = _g225[4]
  local body = unstash({...})
  local _g226 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g226, {{"inc", i}}))}})
end, export = true}, pr = {module = "lib", macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, export = true}, pairwise = {module = "lib", variable = true, export = true}, ["special-form?"] = {module = "lib", variable = true, export = true}, list = {module = "lib", macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g227 = body
    for k in next, _g227 do
      if (not number63(k)) then
        local v = _g227[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, export = true}, ["string?"] = {module = "lib", variable = true, export = true}, drop = {module = "lib", variable = true, export = true}, ["macro-function"] = {variable = true, module = "lib"}, ["macro?"] = {variable = true, module = "lib"}, ["symbol-expansion"] = {variable = true, module = "lib"}, ["symbol?"] = {variable = true, module = "lib"}, ["variable?"] = {variable = true, module = "lib"}, ["bound?"] = {variable = true, module = "lib"}, _g81 = {variable = true, module = "lib"}, _g82 = {variable = true, module = "lib"}, _g85 = {variable = true, module = "lib"}, _g86 = {variable = true, module = "lib"}, _g89 = {variable = true, module = "lib"}, _g90 = {variable = true, module = "lib"}, _g91 = {variable = true, module = "lib"}, _g95 = {variable = true, module = "lib"}, _g96 = {variable = true, module = "lib"}, _g100 = {variable = true, module = "lib"}, _g101 = {variable = true, module = "lib"}, _g103 = {variable = true, module = "lib"}, _g104 = {variable = true, module = "lib"}, _g108 = {variable = true, module = "lib"}, _g109 = {variable = true, module = "lib"}, _g112 = {variable = true, module = "lib"}, _g116 = {variable = true, module = "lib"}, _g120 = {variable = true, module = "lib"}, _g123 = {variable = true, module = "lib"}, escape = {variable = true, module = "lib"}, stash = {variable = true, module = "lib"}, ["bind-arguments"] = {variable = true, module = "lib"}, bind = {variable = true, module = "lib"}, ["message-handler"] = {variable = true, module = "lib"}, ["quoting?"] = {variable = true, module = "lib"}, ["quasiquoting?"] = {variable = true, module = "lib"}, ["can-unquote?"] = {variable = true, module = "lib"}, ["quasisplice?"] = {variable = true, module = "lib"}, quasiexpand = {variable = true, module = "lib"}, ["quasiquote-list"] = {variable = true, module = "lib"}, substring = {variable = true, module = "lib"}, sublist = {variable = true, module = "lib"}, _g159 = {variable = true, module = "lib"}, _g164 = {variable = true, module = "lib"}, _g165 = {variable = true, module = "lib"}, ["splice?"] = {variable = true, module = "lib"}, _g178 = {variable = true, module = "lib"}, ["id-count"] = {variable = true, module = "lib"}}, import = {"lib", "compiler"}}, boot = {toplevel = {}, import = {"lib", "compiler"}}, compiler = {toplevel = {["define-module"] = {module = "compiler", macro = function (spec, ...)
  local body = unstash({...})
  local _g228 = sub(body, 0)
  local imp = _g228.import
  local exp = _g228.export
  map(load_module, imp)
  modules[module_key(spec)] = {import = imp, toplevel = {}}
  local _g230 = 0
  local _g229 = (exp or {})
  while (_g230 < length(_g229)) do
    local k = _g229[(_g230 + 1)]
    setenv(k, {_stash = true, export = true})
    _g230 = (_g230 + 1)
  end
  return(nil)
end, export = true}, compile = {module = "compiler", variable = true, export = true}, ["%function"] = {module = "compiler", special = function (_g231)
  local args = _g231[1]
  local body = sub(_g231, 1)
  return(compile_function(args, body))
end, export = true}, ["compile-module"] = {module = "compiler", variable = true, export = true}, ["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, tr = true, stmt = true, module = "compiler", export = true}, ["quote-m0dules"] = {module = "compiler", variable = true, export = true}, ["open-m0dule"] = {module = "compiler", variable = true, export = true}, ["%for"] = {special = function (_g232)
  local _g233 = _g232[1]
  local t = _g233[1]
  local k = _g233[2]
  local body = sub(_g232, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g234 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g234)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, tr = true, stmt = true, module = "compiler", export = true}, ["compiler-output"] = {module = "compiler", variable = true, export = true}, ["%array"] = {module = "compiler", special = function (forms)
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
  local _g235 = forms
  while (i < length(_g235)) do
    local x = _g235[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, export = true}, eval = {module = "compiler", variable = true, export = true}, ["%try"] = {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g236 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g236)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g237 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g237)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, tr = true, stmt = true, module = "compiler", export = true}, ["load-module"] = {module = "compiler", variable = true, export = true}, ["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g238 = form
  while (i < length(_g238)) do
    local condition = _g238[(i + 1)]
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
end, tr = true, stmt = true, module = "compiler", export = true}, ["%local-function"] = {special = function (_g239)
  local name = _g239[1]
  local args = _g239[2]
  local body = sub(_g239, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, tr = true, stmt = true, module = "compiler", export = true}, ["%global-function"] = {special = function (_g240)
  local name = _g240[1]
  local args = _g240[2]
  local body = sub(_g240, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, tr = true, stmt = true, module = "compiler", export = true}, ["current-module"] = {module = "compiler", variable = true, export = true}, ["quote-environment"] = {module = "compiler", variable = true, export = true}, ["get"] = {module = "compiler", special = function (_g241)
  local t = _g241[1]
  local k = _g241[2]
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
end, export = true}, ["with-indent"] = {module = "compiler", macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, export = true}, ["%local"] = {special = function (_g242)
  local name = _g242[1]
  local value = _g242[2]
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
end, stmt = true, module = "compiler", export = true}, ["open-module"] = {module = "compiler", variable = true, export = true}, ["return"] = {special = function (_g243)
  local x = _g243[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true, module = "compiler", export = true}, ["%object"] = {module = "compiler", special = function (forms)
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
      error(("Illegal key: " .. to_string(k)))
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
end, export = true}, ["not"] = {module = "compiler", special = function (_g246)
  local x = _g246[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, export = true}, ["while"] = {special = function (_g247)
  local condition = _g247[1]
  local body = sub(_g247, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g248 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g248)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, tr = true, stmt = true, module = "compiler", export = true}, ["error"] = {special = function (_g249)
  local x = _g249[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true, module = "compiler", export = true}, ["quote-modules"] = {module = "compiler", variable = true, export = true}, ["compile-toplevel"] = {module = "compiler", variable = true, export = true}, ["in-module"] = {module = "compiler", variable = true, export = true}, ["set"] = {special = function (_g250)
  local lh = _g250[1]
  local rh = _g250[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true, module = "compiler", export = true}, ["break"] = {special = function (_g6)
  return((indentation() .. "break"))
end, stmt = true, module = "compiler", export = true}, infix = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["indent-level"] = {variable = true, module = "compiler"}, indentation = {variable = true, module = "compiler"}, ["compile-args"] = {variable = true, module = "compiler"}, ["compile-body"] = {variable = true, module = "compiler"}, ["numeric?"] = {variable = true, module = "compiler"}, ["valid-char?"] = {variable = true, module = "compiler"}, ["valid-id?"] = {variable = true, module = "compiler"}, ["compile-id"] = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, ["compile-call"] = {variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["compile-branch"] = {variable = true, module = "compiler"}, ["compile-function"] = {variable = true, module = "compiler"}, terminator = {variable = true, module = "compiler"}, ["compile-special"] = {variable = true, module = "compiler"}, _g18 = {variable = true, module = "compiler"}, _g19 = {variable = true, module = "compiler"}, _g21 = {variable = true, module = "compiler"}, _g24 = {variable = true, module = "compiler"}, _g25 = {variable = true, module = "compiler"}, _g29 = {variable = true, module = "compiler"}, _g30 = {variable = true, module = "compiler"}, _g33 = {variable = true, module = "compiler"}, _g34 = {variable = true, module = "compiler"}, _g35 = {variable = true, module = "compiler"}, _g36 = {variable = true, module = "compiler"}, _g38 = {variable = true, module = "compiler"}, _g40 = {variable = true, module = "compiler"}, _g41 = {variable = true, module = "compiler"}, _g42 = {variable = true, module = "compiler"}, _g43 = {variable = true, module = "compiler"}, _g45 = {variable = true, module = "compiler"}, _g46 = {variable = true, module = "compiler"}, _g47 = {variable = true, module = "compiler"}, _g49 = {variable = true, module = "compiler"}, _g51 = {variable = true, module = "compiler"}, _g53 = {variable = true, module = "compiler"}, _g55 = {variable = true, module = "compiler"}, ["can-return?"] = {variable = true, module = "compiler"}, ["run-result"] = {variable = true, module = "compiler"}, run = {variable = true, module = "compiler"}, ["compiling?"] = {variable = true, module = "compiler"}, compiling = {variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, ["initial-environment"] = {variable = true, module = "compiler"}, ["module-key"] = {variable = true, module = "compiler"}, module = {variable = true, module = "compiler"}, ["module-path"] = {variable = true, module = "compiler"}, ["recompile?"] = {variable = true, module = "compiler"}, ["%compile-module"] = {variable = true, module = "compiler"}, _g68 = {variable = true, module = "compiler"}, _g69 = {variable = true, module = "compiler"}, _g70 = {variable = true, module = "compiler"}, _g71 = {variable = true, module = "compiler"}, ["quote-binding"] = {variable = true, module = "compiler"}, ["quote-frame"] = {variable = true, module = "compiler"}, ["quote-module"] = {variable = true, module = "compiler"}}, import = {"reader", "lib", "compiler"}}, reader = {toplevel = {["make-stream"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g251, ...)
  local char = _g251[1]
  local stream = _g251[2]
  local body = unstash({...})
  local _g252 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g252)})
end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}, delimiters = {variable = true, module = "reader"}, whitespace = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, ["skip-non-code"] = {variable = true, module = "reader"}, ["read-table"] = {variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}, _g189 = {variable = true, module = "reader"}}, import = {"lib", "compiler"}}}
environment = {{["define-module"] = {module = "compiler", macro = function (spec, ...)
  local body = unstash({...})
  local _g253 = sub(body, 0)
  local imp = _g253.import
  local exp = _g253.export
  map(load_module, imp)
  modules[module_key(spec)] = {import = imp, toplevel = {}}
  local _g255 = 0
  local _g254 = (exp or {})
  while (_g255 < length(_g254)) do
    local k = _g254[(_g255 + 1)]
    setenv(k, {_stash = true, export = true})
    _g255 = (_g255 + 1)
  end
  return(nil)
end, export = true}}}
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
  local spec = nil
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
    elseif (nil63(spec) and ("-" ~= char(arg, 0))) then
      spec = arg
    end
    i = (i + 1)
  end
  if output then
    if target1 then
      target = target1
    end
    compile_module(spec)
    return(write_file(output, compiler_output))
  else
    local spec = (spec or "main")
    in_module(spec)
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end
main()
