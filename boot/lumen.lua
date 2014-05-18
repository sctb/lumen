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
  local _g6 = args
  while (i < length(_g6)) do
    local arg = _g6[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_body(forms, ...)
  local _g7 = unstash({...})
  local tail63 = _g7["tail?"]
  local str = ""
  local i = 0
  local _g8 = forms
  while (i < length(_g8)) do
    local x = _g8[(i + 1)]
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
function compile_infix(_g9)
  local op = _g9[1]
  local args = sub(_g9, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _g10 = args
  while (i < length(_g10)) do
    local arg = _g10[(i + 1)]
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
  local _g11 = (function ()
    indent_level = (indent_level + 1)
    local _g12 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
    indent_level = (indent_level - 1)
    return(_g12)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. _g11 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _g11 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _g11 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _g11 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _g11 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _g11 .. tr))
  end
end
function compile_function(args, body, ...)
  local _g13 = unstash({...})
  local name = _g13.name
  local prefix = _g13.prefix
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
    local _g14 = compile_body(body, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g14)
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
  local _g15 = getenv(hd(form))
  local special = _g15.special
  local stmt = _g15.stmt
  local self_tr63 = _g15.tr
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
  local _g59 = unstash({...})
  local stmt63 = _g59["stmt?"]
  local tail63 = _g59["tail?"]
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
modules = {}
exports = {}
imports = {}
loading = {}
save_modules63 = false
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
function _37load_module(k)
  local file = (k .. ".l")
  local frame = {}
  local module = {}
  loading[k] = true
  add(environment, frame)
  local compiled = compile_file(file)
  drop(environment)
  local x = nil
  local _g60 = frame
  for x in next, _g60 do
    if (not number63(x)) then
      local v = _g60[x]
      if exports[x] then
        module[x] = v
      end
    end
  end
  modules[k] = module
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
  local _g61 = module
  for k in next, _g61 do
    if (not number63(k)) then
      local v = _g61[k]
      toplevel[k] = v
    end
  end
end
function quote_binding(x)
  if is63(x.symbol) then
    return(extend(x, {_stash = true, symbol = {"quote", x.symbol}}))
  elseif (x.macro and x.form) then
    return(extend(x, {_stash = true, macro = x.form}))
  elseif (x.special and x.form) then
    return(extend(x, {_stash = true, special = x.form}))
  end
end
function save_modules()
  local save = function (x)
    compiler_output = (compiler_output .. compile_toplevel(x))
  end
  save({"define", "environment", {"list", {"table"}}})
  local x = quote_binding(getenv("define-module"))
  save(join({"setenv", {"quote", "define-module"}}, x))
  local m = nil
  local _g67 = modules
  for m in next, _g67 do
    if (not number63(m)) then
      local v = _g67[m]
      save({"set", {"get", "modules", {"quote", m}}, {"table"}})
      local k = nil
      local _g68 = map42(quote_binding, v)
      for k in next, _g68 do
        if (not number63(k)) then
          local v = _g68[k]
          save({"set", {"get", {"get", "modules", {"quote", m}}, {"quote", k}}, join({"table"}, v)})
        end
      end
    end
  end
end
function compile_module(spec)
  compiling63 = true
  compiler_output = ""
  load_module(spec)
  map(open_module, imports)
  if save_modules63 then
    return(save_modules())
  end
end
function setenv(k, ...)
  local keys = unstash({...})
  local _g69 = sub(keys, 0)
  local frame = last(environment)
  local x = (frame[k] or {})
  local k1 = nil
  local _g70 = _g69
  for k1 in next, _g70 do
    if (not number63(k1)) then
      local v = _g70[k1]
      x[k1] = v
    end
  end
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
      return({"unstash", {"sub", "arguments", length(args1)}})
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
      local _g2 = form[1]
      local _g130 = form[2]
      local t = _g130[1]
      local k = _g130[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g3 = form[1]
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
      local _g4 = form[1]
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
function sub(x, from, upto)
  local _g145 = (from or 0)
  if string63(x) then
    return((string.sub)(x, (_g145 + 1), upto))
  else
    local l = (function ()
      local i = _g145
      local j = 0
      local x2 = {}
      local upto = (upto or length(x))
      while (i < upto) do
        x2[(j + 1)] = x[(i + 1)]
        i = (i + 1)
        j = (j + 1)
      end
      return(x2)
    end)()
    local k = nil
    local _g146 = x
    for k in next, _g146 do
      if (not number63(k)) then
        local v = _g146[k]
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
    local k = nil
    local _g147 = l1
    for k in next, _g147 do
      if (not number63(k)) then
        local v = _g147[k]
        l[k] = v
      end
    end
    local _g149 = nil
    local _g148 = l2
    for _g149 in next, _g148 do
      if (not number63(_g149)) then
        local v = _g148[_g149]
        l[_g149] = v
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
  local _g151 = 0
  local _g150 = l
  while (_g151 < length(_g150)) do
    local x = _g150[(_g151 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g151 = (_g151 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g153 = 0
  local _g152 = l
  while (_g153 < length(_g152)) do
    local x = _g152[(_g153 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g153 = (_g153 + 1)
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
  local _g163 = 0
  local _g162 = l
  while (_g163 < length(_g162)) do
    local x = _g162[(_g163 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g163 = (_g163 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g164 = t
  for k in next, _g164 do
    if (not number63(k)) then
      local v = _g164[k]
      local x = f(v)
      if is63(x) then
        l[k] = x
      end
    end
  end
  return(l)
end
function keys63(t)
  local k63 = false
  local k = nil
  local _g165 = t
  for k in next, _g165 do
    if (not number63(k)) then
      local v = _g165[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g166 = sub(xs, 0)
  return(join(t, _g166))
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
  local _g167 = (function ()
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
  local _g168 = sub(xs, 0)
  if empty63(_g168) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g168))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g171 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g171))
end
function _(...)
  local xs = unstash({...})
  local _g172 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g172)))
end
function _42(...)
  local xs = unstash({...})
  local _g173 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g173))
end
function _47(...)
  local xs = unstash({...})
  local _g174 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g174)))
end
function _37(...)
  local xs = unstash({...})
  local _g175 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g175)))
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
    local _g176 = x
    for k in next, _g176 do
      if (not number63(k)) then
        local v = _g176[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g177 = x1
    while (i < length(_g177)) do
      local y = _g177[(i + 1)]
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
  local _g178 = stash(args)
  return(f(unpack(_g178)))
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
function rep(str)
  local _g182 = (function ()
    local _g183,_g184 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g183, _g184})
  end)()
  local _g1 = _g182[1]
  local x = _g182[2]
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
  print((to_string("  -s \t\tSave environment") .. " "))
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
  local _g185 = args
  while (i < length(_g185)) do
    local arg = _g185[(i + 1)]
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
    elseif (arg == "-s") then
      save_modules63 = true
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
    local main = compile({"main"})
    local compiled = (compiler_output .. main)
    return(write_file(output, compiled))
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
environment = {{}}
setenv("define-module", {_stash = true, macro = function (spec, ...)
  local body = unstash({...})
  local _g186 = sub(body, 0)
  local imp = _g186.import
  local exp = _g186.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g188 = 0
  local _g187 = (exp or {})
  while (_g188 < length(_g187)) do
    local x = _g187[(_g188 + 1)]
    exports[x] = true
    _g188 = (_g188 + 1)
  end
  return(nil)
end, form = function (spec, ...)
  local body = unstash({...})
  local _g189 = sub(body, 0)
  local imp = _g189.import
  local exp = _g189.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g191 = 0
  local _g190 = (exp or {})
  while (_g191 < length(_g190)) do
    local x = _g190[(_g191 + 1)]
    exports[x] = true
    _g191 = (_g191 + 1)
  end
  return(nil)
end})
modules.main = {}
modules.lib = {}
modules.lib.at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, form = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end}
modules.lib.quote = {macro = function (form)
  return(quoted(form))
end, form = function (form)
  return(quoted(form))
end}
modules.lib.list = {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g192 = body
    for k in next, _g192 do
      if (not number63(k)) then
        local v = _g192[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, form = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g193 = body
    for k in next, _g193 do
      if (not number63(k)) then
        local v = _g193[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end}
modules.lib.table = {macro = function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _g194 = body
  for k in next, _g194 do
    if (not number63(k)) then
      local v = _g194[k]
      if is63(v) then
        add(l, k)
        add(l, v)
      end
    end
  end
  return(join({"%object"}, l))
end, form = function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _g195 = body
  for k in next, _g195 do
    if (not number63(k)) then
      local v = _g195[k]
      if is63(v) then
        add(l, k)
        add(l, v)
      end
    end
  end
  return(join({"%object"}, l))
end}
modules.lib.let = {macro = function (bindings, ...)
  local body = unstash({...})
  local _g196 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g197)
    local lh = _g197[1]
    local rh = _g197[2]
    local _g199 = 0
    local _g198 = bind(lh, rh)
    while (_g199 < length(_g198)) do
      local _g200 = _g198[(_g199 + 1)]
      local id = _g200[1]
      local val = _g200[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g199 = (_g199 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g196)})))
end, form = function (bindings, ...)
  local body = unstash({...})
  local _g201 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g202)
    local lh = _g202[1]
    local rh = _g202[2]
    local _g204 = 0
    local _g203 = bind(lh, rh)
    while (_g204 < length(_g203)) do
      local _g205 = _g203[(_g204 + 1)]
      local id = _g205[1]
      local val = _g205[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g204 = (_g204 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g201)})))
end}
modules.lib["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g206 = sub(body, 0)
  local form = join({"fn", args}, _g206)
  eval((function ()
    local _g207 = {"setenv", {"quote", name}}
    _g207.macro = form
    _g207.form = {"quote", form}
    return(_g207)
  end)())
  return(nil)
end, form = function (name, args, ...)
  local body = unstash({...})
  local _g208 = sub(body, 0)
  local form = join({"fn", args}, _g208)
  eval((function ()
    local _g209 = {"setenv", {"quote", name}}
    _g209.macro = form
    _g209.form = {"quote", form}
    return(_g209)
  end)())
  return(nil)
end}
modules.lib["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g210 = sub(body, 0)
  local form = join({"fn", args}, _g210)
  local keys = sub(_g210, length(_g210))
  eval(join((function ()
    local _g211 = {"setenv", {"quote", name}}
    _g211.special = form
    _g211.form = {"quote", form}
    return(_g211)
  end)(), keys))
  return(nil)
end, form = function (name, args, ...)
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
end}
modules.lib["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, form = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end}
modules.lib["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g214 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g214)) then
    local _g215 = bind_arguments(x, _g214)
    local args = _g215[1]
    local _g216 = _g215[2]
    return(join({"%global-function", name, args}, _g216))
  else
    return({"set", name, x})
  end
end, form = function (name, x, ...)
  local body = unstash({...})
  local _g217 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g217)) then
    local _g218 = bind_arguments(x, _g217)
    local args = _g218[1]
    local _g219 = _g218[2]
    return(join({"%global-function", name, args}, _g219))
  else
    return({"set", name, x})
  end
end}
modules.lib["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g220 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g220)) then
    local _g221 = bind_arguments(x, _g220)
    local args = _g221[1]
    local _g222 = _g221[2]
    return(join({"%local-function", name, args}, _g222))
  else
    return({"%local", name, x})
  end
end, form = function (name, x, ...)
  local body = unstash({...})
  local _g223 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g223)) then
    local _g224 = bind_arguments(x, _g223)
    local args = _g224[1]
    local _g225 = _g224[2]
    return(join({"%local-function", name, args}, _g225))
  else
    return({"%local", name, x})
  end
end}
modules.lib.define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g226 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g226))
end, form = function (name, x, ...)
  local body = unstash({...})
  local _g227 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g227))
end}
modules.lib["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, form = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end}
modules.lib["with-bindings"] = {macro = function (_g228, ...)
  local names = _g228[1]
  local body = unstash({...})
  local _g229 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g230 = {"setenv", x}
    _g230.variable = true
    return(_g230)
  end)()}}, _g229))
end, form = function (_g231, ...)
  local names = _g231[1]
  local body = unstash({...})
  local _g232 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g233 = {"setenv", x}
    _g233.variable = true
    return(_g233)
  end)()}}, _g232))
end}
modules.lib["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g234 = sub(body, 0)
  add(environment, {})
  local _g235 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g234)))
  end)()
  drop(environment)
  return(_g235)
end, form = function (definitions, ...)
  local body = unstash({...})
  local _g236 = sub(body, 0)
  add(environment, {})
  local _g237 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g236)))
  end)()
  drop(environment)
  return(_g237)
end}
modules.lib["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g238 = sub(body, 0)
  add(environment, {})
  local _g239 = (function ()
    map(function (_g240)
      local name = _g240[1]
      local exp = _g240[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g238)))
  end)()
  drop(environment)
  return(_g239)
end, form = function (expansions, ...)
  local body = unstash({...})
  local _g241 = sub(body, 0)
  add(environment, {})
  local _g242 = (function ()
    map(function (_g243)
      local name = _g243[1]
      local exp = _g243[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g241)))
  end)()
  drop(environment)
  return(_g242)
end}
modules.lib.fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g244 = sub(body, 0)
  local _g245 = bind_arguments(args, _g244)
  local args = _g245[1]
  local _g246 = _g245[2]
  return(join({"%function", args}, _g246))
end, form = function (args, ...)
  local body = unstash({...})
  local _g247 = sub(body, 0)
  local _g248 = bind_arguments(args, _g247)
  local args = _g248[1]
  local _g249 = _g248[2]
  return(join({"%function", args}, _g249))
end}
modules.lib.guard = {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, form = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end}
modules.lib.across = {macro = function (_g250, ...)
  local l = _g250[1]
  local v = _g250[2]
  local i = _g250[3]
  local start = _g250[4]
  local body = unstash({...})
  local _g251 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g251, {{"inc", i}}))}})
end, form = function (_g252, ...)
  local l = _g252[1]
  local v = _g252[2]
  local i = _g252[3]
  local start = _g252[4]
  local body = unstash({...})
  local _g253 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g253, {{"inc", i}}))}})
end}
modules.lib["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g255 = 0
  local _g254 = elements
  while (_g255 < length(_g254)) do
    local e = _g254[(_g255 + 1)]
    l[e] = true
    _g255 = (_g255 + 1)
  end
  return(join({"table"}, l))
end, form = function (...)
  local elements = unstash({...})
  local l = {}
  local _g257 = 0
  local _g256 = elements
  while (_g257 < length(_g256)) do
    local e = _g256[(_g257 + 1)]
    l[e] = true
    _g257 = (_g257 + 1)
  end
  return(join({"table"}, l))
end}
modules.lib.quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end, form = function (form)
  return(quasiexpand(form, 1))
end}
modules.lib.language = {macro = function ()
  return({"quote", target})
end, form = function ()
  return({"quote", target})
end}
modules.lib.target = {variable = true, macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, form = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end}
modules.lib["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, form = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end}
modules.lib["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g258 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g258)})
end, form = function (a, ...)
  local bs = unstash({...})
  local _g259 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g259)})
end}
modules.lib["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g260 = xs
    while (i < length(_g260)) do
      local x = _g260[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, form = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g261 = xs
    while (i < length(_g261)) do
      local x = _g261[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end}
modules.lib.each = {macro = function (_g262, ...)
  local t = _g262[1]
  local k = _g262[2]
  local v = _g262[3]
  local body = unstash({...})
  local _g263 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g264 = {"target"}
    _g264.js = {"isNaN", {"parseInt", k}}
    _g264.lua = {"not", {"number?", k}}
    return(_g264)
  end)(), join({"let", {v, {"get", t1, k}}}, _g263)}}})
end, form = function (_g265, ...)
  local t = _g265[1]
  local k = _g265[2]
  local v = _g265[3]
  local body = unstash({...})
  local _g266 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g267 = {"target"}
    _g267.js = {"isNaN", {"parseInt", k}}
    _g267.lua = {"not", {"number?", k}}
    return(_g267)
  end)(), join({"let", {v, {"get", t1, k}}}, _g266)}}})
end}
modules.lib["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g268 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g268)})
end, form = function (a, ...)
  local bs = unstash({...})
  local _g269 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g269)})
end}
modules.lib.inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, form = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end}
modules.lib.dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, form = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end}
modules.lib.pr = {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, form = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end}
modules.compiler = {}
modules.compiler["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, form = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end}
modules.compiler["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, form = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true}
modules.compiler["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g270 = form
  while (i < length(_g270)) do
    local condition = _g270[(i + 1)]
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
end, form = function (form, tail63)
  local str = ""
  local i = 0
  local _g271 = form
  while (i < length(_g271)) do
    local condition = _g271[(i + 1)]
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
end, stmt = true, tr = true}
modules.compiler["while"] = {special = function (_g272)
  local condition = _g272[1]
  local body = sub(_g272, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g273 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g273)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, form = function (_g274)
  local condition = _g274[1]
  local body = sub(_g274, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g275 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g275)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, tr = true}
modules.compiler["%for"] = {special = function (_g276)
  local _g277 = _g276[1]
  local t = _g277[1]
  local k = _g277[2]
  local body = sub(_g276, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g278 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g278)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, form = function (_g279)
  local _g280 = _g279[1]
  local t = _g280[1]
  local k = _g280[2]
  local body = sub(_g279, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g281 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g281)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, stmt = true, tr = true}
modules.compiler["%try"] = {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g282 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g282)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g283 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g283)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, form = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g284 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g284)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g285 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g285)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true}
modules.compiler["break"] = {special = function (_g5)
  return((indentation() .. "break"))
end, form = function (_g5)
  return((indentation() .. "break"))
end, stmt = true}
modules.compiler["%function"] = {special = function (_g286)
  local args = _g286[1]
  local body = sub(_g286, 1)
  return(compile_function(args, body))
end, form = function (_g287)
  local args = _g287[1]
  local body = sub(_g287, 1)
  return(compile_function(args, body))
end}
modules.compiler["%global-function"] = {special = function (_g288)
  local name = _g288[1]
  local args = _g288[2]
  local body = sub(_g288, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, form = function (_g289)
  local name = _g289[1]
  local args = _g289[2]
  local body = sub(_g289, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true}
modules.compiler["%local-function"] = {special = function (_g290)
  local name = _g290[1]
  local args = _g290[2]
  local body = sub(_g290, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, form = function (_g291)
  local name = _g291[1]
  local args = _g291[2]
  local body = sub(_g291, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true}
modules.compiler["return"] = {special = function (_g292)
  local x = _g292[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, form = function (_g293)
  local x = _g293[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true}
modules.compiler["error"] = {special = function (_g294)
  local x = _g294[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, form = function (_g295)
  local x = _g295[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true}
modules.compiler["%local"] = {special = function (_g296)
  local name = _g296[1]
  local value = _g296[2]
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
end, form = function (_g297)
  local name = _g297[1]
  local value = _g297[2]
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
end, stmt = true}
modules.compiler["set"] = {special = function (_g298)
  local lh = _g298[1]
  local rh = _g298[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, form = function (_g299)
  local lh = _g299[1]
  local rh = _g299[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true}
modules.compiler["get"] = {special = function (_g300)
  local t = _g300[1]
  local k = _g300[2]
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
end, form = function (_g301)
  local t = _g301[1]
  local k = _g301[2]
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
end}
modules.compiler["not"] = {special = function (_g302)
  local x = _g302[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, form = function (_g303)
  local x = _g303[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end}
modules.compiler["%array"] = {special = function (forms)
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
  local _g304 = forms
  while (i < length(_g304)) do
    local x = _g304[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, form = function (forms)
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
  local _g305 = forms
  while (i < length(_g305)) do
    local x = _g305[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}
modules.compiler["%object"] = {special = function (forms)
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
  local _g306 = pairs
  while (i < length(_g306)) do
    local _g307 = _g306[(i + 1)]
    local k = _g307[1]
    local v = _g307[2]
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
end, form = function (forms)
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
  local _g308 = pairs
  while (i < length(_g308)) do
    local _g309 = _g308[(i + 1)]
    local k = _g309[1]
    local v = _g309[2]
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
end}
modules.compiler["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g310 = sub(body, 0)
  local imp = _g310.import
  local exp = _g310.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g312 = 0
  local _g311 = (exp or {})
  while (_g312 < length(_g311)) do
    local x = _g311[(_g312 + 1)]
    exports[x] = true
    _g312 = (_g312 + 1)
  end
  return(nil)
end, form = function (spec, ...)
  local body = unstash({...})
  local _g313 = sub(body, 0)
  local imp = _g313.import
  local exp = _g313.export
  map(load_module, imp)
  imports = imp
  exports = {}
  local _g315 = 0
  local _g314 = (exp or {})
  while (_g315 < length(_g314)) do
    local x = _g314[(_g315 + 1)]
    exports[x] = true
    _g315 = (_g315 + 1)
  end
  return(nil)
end}
modules.reader = {}
modules.reader["define-reader"] = {macro = function (_g316, ...)
  local char = _g316[1]
  local stream = _g316[2]
  local body = unstash({...})
  local _g317 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g317)})
end, form = function (_g318, ...)
  local char = _g318[1]
  local stream = _g318[2]
  local body = unstash({...})
  local _g319 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g319)})
end}
main()