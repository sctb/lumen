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
loading = {}
compiler_output = nil
save_env63 = false
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
  local k = nil
  local _g61 = module
  for k in next, _g61 do
    if (not number63(k)) then
      local v = _g61[k]
      setenv(k, v)
    end
  end
end
function quote_binding(x)
  if is63(x.symbol) then
    local _g67 = {"table"}
    _g67.symbol = {"quote", x.symbol}
    return(_g67)
  elseif (x.macro and x.form) then
    local _g68 = {"table"}
    _g68.macro = x.form
    return(_g68)
  elseif (x.special and x.form) then
    local stmt = x.stmt
    local tr = x.tr
    local _g69 = {"table"}
    _g69.special = x.form
    _g69.stmt = stmt
    _g69.tr = tr
    return(_g69)
  end
end
function save_environment()
  local toplevel = hd(environment)
  local save = function (x)
    compiler_output = (compiler_output .. compile_toplevel(x))
  end
  save({"define", "environment", {"list", {"table"}}})
  local k = nil
  local _g70 = map42(quote_binding, toplevel)
  for k in next, _g70 do
    if (not number63(k)) then
      local v = _g70[k]
      save({"setenv", {"quote", k}, v})
    end
  end
  local m = quote_binding(getenv("define-module"))
  save({"setenv", {"quote", "define-module"}, m})
  local _g72 = nil
  local _g71 = modules
  for _g72 in next, _g71 do
    if (not number63(_g72)) then
      local v = _g71[_g72]
      save({"set", {"get", "modules", {"quote", _g72}}, {"table"}})
      local k = nil
      local _g73 = map42(quote_binding, v)
      for k in next, _g73 do
        if (not number63(k)) then
          local v = _g73[k]
          save({"set", {"get", {"get", "modules", {"quote", _g72}}, {"quote", k}}, v})
        end
      end
    end
  end
end
function compile_module(spec)
  compiling63 = true
  compiler_output = ""
  load_module(spec)
  map(open_module, {"lib", "compiler"})
  if save_env63 then
    return(save_environment())
  end
end
function setenv(k, v)
  last(environment)[k] = v
end
function getenv(k)
  if string63(k) then
    return(find(function (e)
      return(e[k])
    end, reverse(environment)))
  end
end
function setenv42(k, v)
  local x = getenv(k)
  if x then
    x.variable = v
  else
    return(setenv(k, {variable = v}))
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
    local _g120 = args
    for k in next, _g120 do
      if (not number63(k)) then
        local v = _g120[k]
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
    local _g121 = args
    for k in next, _g121 do
      if (not number63(k)) then
        local v = _g121[k]
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
      local _g122 = l
      for k in next, _g122 do
        if (not number63(k)) then
          local v = _g122[k]
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
    local _g124 = 0
    local _g123 = args
    while (_g124 < length(_g123)) do
      local arg = _g123[(_g124 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g124 = (_g124 + 1)
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
    local _g125 = lh
    while (i < length(_g125)) do
      local x = _g125[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g126 = lh
    for k in next, _g126 do
      if (not number63(k)) then
        local v = _g126[k]
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
      local _g127 = form[2]
      local t = _g127[1]
      local k = _g127[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g3 = form[1]
      local args = form[2]
      local _g128 = sub(form, 2)
      add(environment, {})
      local _g130 = (function ()
        local _g132 = 0
        local _g131 = args
        while (_g132 < length(_g131)) do
          local _g129 = _g131[(_g132 + 1)]
          setenv42(_g129, pending)
          _g132 = (_g132 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g128)))
      end)()
      drop(environment)
      return(_g130)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g4 = form[1]
      local name = form[2]
      local _g133 = form[3]
      local _g134 = sub(form, 3)
      add(environment, {})
      local _g136 = (function ()
        local _g138 = 0
        local _g137 = _g133
        while (_g138 < length(_g137)) do
          local _g135 = _g137[(_g138 + 1)]
          setenv42(_g135, pending)
          _g138 = (_g138 + 1)
        end
        return(join({x, name, map42(macroexpand, _g133)}, macroexpand(_g134)))
      end)()
      drop(environment)
      return(_g136)
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
  local _g139 = form
  for k in next, _g139 do
    if (not number63(k)) then
      local v = _g139[k]
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
  local _g141 = 0
  local _g140 = form
  while (_g141 < length(_g140)) do
    local x = _g140[(_g141 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g141 = (_g141 + 1)
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
  local _g142 = (from or 0)
  if string63(x) then
    return((string.sub)(x, (_g142 + 1), upto))
  else
    local l = (function ()
      local i = _g142
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
    local _g143 = x
    for k in next, _g143 do
      if (not number63(k)) then
        local v = _g143[k]
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
    local _g144 = l1
    for k in next, _g144 do
      if (not number63(k)) then
        local v = _g144[k]
        l[k] = v
      end
    end
    local _g146 = nil
    local _g145 = l2
    for _g146 in next, _g145 do
      if (not number63(_g146)) then
        local v = _g145[_g146]
        l[_g146] = v
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
  local _g148 = 0
  local _g147 = l
  while (_g148 < length(_g147)) do
    local x = _g147[(_g148 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g148 = (_g148 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g150 = 0
  local _g149 = l
  while (_g150 < length(_g149)) do
    local x = _g149[(_g150 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g150 = (_g150 + 1)
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
  local _g160 = 0
  local _g159 = l
  while (_g160 < length(_g159)) do
    local x = _g159[(_g160 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g160 = (_g160 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g161 = t
  for k in next, _g161 do
    if (not number63(k)) then
      local v = _g161[k]
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
  local _g162 = t
  for k in next, _g162 do
    if (not number63(k)) then
      local v = _g162[k]
      k63 = true
      break
    end
  end
  return(k63)
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
  local _g163 = (function ()
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
  local _g164 = sub(xs, 0)
  if empty63(_g164) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g164))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g167 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g167))
end
function _(...)
  local xs = unstash({...})
  local _g168 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g168)))
end
function _42(...)
  local xs = unstash({...})
  local _g169 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g169))
end
function _47(...)
  local xs = unstash({...})
  local _g170 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g170)))
end
function _37(...)
  local xs = unstash({...})
  local _g171 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g171)))
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
    local _g172 = x
    for k in next, _g172 do
      if (not number63(k)) then
        local v = _g172[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g173 = x1
    while (i < length(_g173)) do
      local y = _g173[(i + 1)]
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
  local _g174 = stash(args)
  return(f(unpack(_g174)))
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
  local _g178 = (function ()
    local _g179,_g180 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g179, _g180})
  end)()
  local _g1 = _g178[1]
  local x = _g178[2]
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
  local _g181 = args
  while (i < length(_g181)) do
    local arg = _g181[(i + 1)]
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
      save_env63 = true
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
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end
environment = {{}}
setenv("each", {macro = function (_g182, ...)
  local t = _g182[1]
  local k = _g182[2]
  local v = _g182[3]
  local body = unstash({...})
  local _g183 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g184 = {"target"}
    _g184.js = {"isNaN", {"parseInt", k}}
    _g184.lua = {"not", {"number?", k}}
    return(_g184)
  end)(), join({"let", {v, {"get", t1, k}}}, _g183)}}})
end})
setenv("define-global", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g185 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g185)) then
    local _g186 = bind_arguments(x, _g185)
    local args = _g186[1]
    local _g187 = _g186[2]
    return(join({"%global-function", name, args}, _g187))
  else
    return({"set", name, x})
  end
end})
setenv("list", {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g188 = body
    for k in next, _g188 do
      if (not number63(k)) then
        local v = _g188[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end})
setenv("dec", {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end})
setenv("across", {macro = function (_g189, ...)
  local l = _g189[1]
  local v = _g189[2]
  local i = _g189[3]
  local start = _g189[4]
  local body = unstash({...})
  local _g190 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g190, {{"inc", i}}))}})
end})
setenv("pr", {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end})
setenv("guard", {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end})
setenv("table", {macro = function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _g191 = body
  for k in next, _g191 do
    if (not number63(k)) then
      local v = _g191[k]
      if is63(v) then
        add(l, k)
        add(l, v)
      end
    end
  end
  return(join({"%object"}, l))
end})
setenv("error", {special = function (_g192)
  local x = _g192[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true})
setenv("quote", {macro = function (form)
  return(quoted(form))
end})
setenv("with-bindings", {macro = function (_g193, ...)
  local names = _g193[1]
  local body = unstash({...})
  local _g194 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, {"setenv*", x, "pending"}}}, _g194))
end})
setenv("do", {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true})
setenv("%local", {special = function (_g195)
  local name = _g195[1]
  local value = _g195[2]
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
end, stmt = true})
setenv("break", {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true})
setenv("join*", {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end})
setenv("define-module", {macro = function (spec, ...)
  local body = unstash({...})
  local _g196 = sub(body, 0)
  local imp = _g196.import
  local exp = _g196.export
  map(load_module, imp)
  exports = {}
  local _g198 = 0
  local _g197 = (exp or {})
  while (_g198 < length(_g197)) do
    local x = _g197[(_g198 + 1)]
    exports[x] = true
    _g198 = (_g198 + 1)
  end
  return(nil)
end})
setenv("list*", {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g199 = xs
    while (i < length(_g199)) do
      local x = _g199[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end})
setenv("cat!", {macro = function (a, ...)
  local bs = unstash({...})
  local _g200 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g200)})
end})
setenv("let-macro", {macro = function (definitions, ...)
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
end})
setenv("define-symbol", {macro = function (name, expansion)
  setenv(name, {symbol = expansion})
  return(nil)
end})
setenv("language", {macro = function ()
  return({"quote", target})
end})
setenv("%local-function", {special = function (_g203)
  local name = _g203[1]
  local args = _g203[2]
  local body = sub(_g203, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true})
setenv("set", {special = function (_g204)
  local lh = _g204[1]
  local rh = _g204[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true})
setenv("define-local", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g205 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g205)) then
    local _g206 = bind_arguments(x, _g205)
    local args = _g206[1]
    local _g207 = _g206[2]
    return(join({"%local-function", name, args}, _g207))
  else
    return({"%local", name, x})
  end
end})
setenv("while", {special = function (_g208)
  local condition = _g208[1]
  local body = sub(_g208, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g209 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g209)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, tr = true})
setenv("let-symbol", {macro = function (expansions, ...)
  local body = unstash({...})
  local _g210 = sub(body, 0)
  add(environment, {})
  local _g211 = (function ()
    map(function (_g212)
      local name = _g212[1]
      local exp = _g212[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g210)))
  end)()
  drop(environment)
  return(_g211)
end})
setenv("%global-function", {special = function (_g213)
  local name = _g213[1]
  local args = _g213[2]
  local body = sub(_g213, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true})
setenv("with-frame", {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end})
setenv("join!", {macro = function (a, ...)
  local bs = unstash({...})
  local _g214 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g214)})
end})
setenv("target", {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end})
setenv("with-indent", {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end})
setenv("%object", {special = function (forms)
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
  local _g215 = pairs
  while (i < length(_g215)) do
    local _g216 = _g215[(i + 1)]
    local k = _g216[1]
    local v = _g216[2]
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
end})
setenv("define-special", {macro = function (name, args, ...)
  local body = unstash({...})
  local _g217 = sub(body, 0)
  local form = join({"fn", args}, _g217)
  local value = join((function ()
    local _g218 = {"table"}
    _g218.special = form
    _g218.form = {"quote", form}
    return(_g218)
  end)(), _g217)
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end})
setenv("inc", {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end})
setenv("define", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g219 = sub(body, 0)
  setenv42(name, pending)
  return(join({"define-global", name, x}, _g219))
end})
setenv("quasiquote", {macro = function (form)
  return(quasiexpand(form, 1))
end})
setenv("fn", {macro = function (args, ...)
  local body = unstash({...})
  local _g220 = sub(body, 0)
  local _g221 = bind_arguments(args, _g220)
  local args = _g221[1]
  local _g222 = _g221[2]
  return(join({"%function", args}, _g222))
end})
setenv("define-macro", {macro = function (name, args, ...)
  local body = unstash({...})
  local _g223 = sub(body, 0)
  local form = join({"fn", args}, _g223)
  local value = (function ()
    local _g224 = {"table"}
    _g224.macro = form
    _g224.form = {"quote", form}
    return(_g224)
  end)()
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end})
setenv("%array", {special = function (forms)
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
  local _g225 = forms
  while (i < length(_g225)) do
    local x = _g225[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end})
setenv("set-of", {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g227 = 0
  local _g226 = elements
  while (_g227 < length(_g226)) do
    local e = _g226[(_g227 + 1)]
    l[e] = true
    _g227 = (_g227 + 1)
  end
  return(join({"table"}, l))
end})
setenv("%for", {special = function (_g228)
  local _g229 = _g228[1]
  local t = _g229[1]
  local k = _g229[2]
  local body = sub(_g228, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g230 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g230)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, stmt = true, tr = true})
setenv("get", {special = function (_g231)
  local t = _g231[1]
  local k = _g231[2]
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
end})
setenv("%function", {special = function (_g232)
  local args = _g232[1]
  local body = sub(_g232, 1)
  return(compile_function(args, body))
end})
setenv("at", {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end})
setenv("%try", {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g233 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g233)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g234 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g234)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true})
setenv("if", {special = function (form, tail63)
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
end, stmt = true, tr = true})
setenv("not", {special = function (_g236)
  local x = _g236[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end})
setenv("let", {macro = function (bindings, ...)
  local body = unstash({...})
  local _g237 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g238)
    local lh = _g238[1]
    local rh = _g238[2]
    local _g240 = 0
    local _g239 = bind(lh, rh)
    while (_g240 < length(_g239)) do
      local _g241 = _g239[(_g240 + 1)]
      local id = _g241[1]
      local val = _g241[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv42(id, pending)
      end
      add(locals, {"%local", id, val})
      _g240 = (_g240 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g237)})))
end})
setenv("return", {special = function (_g242)
  local x = _g242[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true})
setenv("define-module", {macro = function (spec, ...)
  local body = unstash({...})
  local _g243 = sub(body, 0)
  local imp = _g243.import
  local exp = _g243.export
  map(load_module, imp)
  exports = {}
  local _g245 = 0
  local _g244 = (exp or {})
  while (_g245 < length(_g244)) do
    local x = _g244[(_g245 + 1)]
    exports[x] = true
    _g245 = (_g245 + 1)
  end
  return(nil)
end})
modules.lib = {}
modules.lib.at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end}
modules.lib.quote = {macro = function (form)
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
    local _g246 = body
    for k in next, _g246 do
      if (not number63(k)) then
        local v = _g246[k]
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
  local _g247 = body
  for k in next, _g247 do
    if (not number63(k)) then
      local v = _g247[k]
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
  local _g248 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g249)
    local lh = _g249[1]
    local rh = _g249[2]
    local _g251 = 0
    local _g250 = bind(lh, rh)
    while (_g251 < length(_g250)) do
      local _g252 = _g250[(_g251 + 1)]
      local id = _g252[1]
      local val = _g252[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv42(id, pending)
      end
      add(locals, {"%local", id, val})
      _g251 = (_g251 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g248)})))
end}
modules.lib["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g253 = sub(body, 0)
  local form = join({"fn", args}, _g253)
  local value = (function ()
    local _g254 = {"table"}
    _g254.macro = form
    _g254.form = {"quote", form}
    return(_g254)
  end)()
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end}
modules.lib["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g255 = sub(body, 0)
  local form = join({"fn", args}, _g255)
  local value = join((function ()
    local _g256 = {"table"}
    _g256.special = form
    _g256.form = {"quote", form}
    return(_g256)
  end)(), _g255)
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end}
modules.lib["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {symbol = expansion})
  return(nil)
end}
modules.lib["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g257 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g257)) then
    local _g258 = bind_arguments(x, _g257)
    local args = _g258[1]
    local _g259 = _g258[2]
    return(join({"%global-function", name, args}, _g259))
  else
    return({"set", name, x})
  end
end}
modules.lib["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g260 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g260)) then
    local _g261 = bind_arguments(x, _g260)
    local args = _g261[1]
    local _g262 = _g261[2]
    return(join({"%local-function", name, args}, _g262))
  else
    return({"%local", name, x})
  end
end}
modules.lib.define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g263 = sub(body, 0)
  setenv42(name, pending)
  return(join({"define-global", name, x}, _g263))
end}
modules.lib["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end}
modules.lib["with-bindings"] = {macro = function (_g264, ...)
  local names = _g264[1]
  local body = unstash({...})
  local _g265 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, {"setenv*", x, "pending"}}}, _g265))
end}
modules.lib["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g266 = sub(body, 0)
  add(environment, {})
  local _g267 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g266)))
  end)()
  drop(environment)
  return(_g267)
end}
modules.lib["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g268 = sub(body, 0)
  add(environment, {})
  local _g269 = (function ()
    map(function (_g270)
      local name = _g270[1]
      local exp = _g270[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g268)))
  end)()
  drop(environment)
  return(_g269)
end}
modules.lib.fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g271 = sub(body, 0)
  local _g272 = bind_arguments(args, _g271)
  local args = _g272[1]
  local _g273 = _g272[2]
  return(join({"%function", args}, _g273))
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
end}
modules.lib.across = {macro = function (_g274, ...)
  local l = _g274[1]
  local v = _g274[2]
  local i = _g274[3]
  local start = _g274[4]
  local body = unstash({...})
  local _g275 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g275, {{"inc", i}}))}})
end}
modules.lib["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g277 = 0
  local _g276 = elements
  while (_g277 < length(_g276)) do
    local e = _g276[(_g277 + 1)]
    l[e] = true
    _g277 = (_g277 + 1)
  end
  return(join({"table"}, l))
end}
modules.lib.quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end}
modules.lib.language = {macro = function ()
  return({"quote", target})
end}
modules.lib.target = {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end}
modules.lib["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end}
modules.lib["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g278 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g278)})
end}
modules.lib["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g279 = xs
    while (i < length(_g279)) do
      local x = _g279[(i + 1)]
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
modules.lib.each = {macro = function (_g280, ...)
  local t = _g280[1]
  local k = _g280[2]
  local v = _g280[3]
  local body = unstash({...})
  local _g281 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g282 = {"target"}
    _g282.js = {"isNaN", {"parseInt", k}}
    _g282.lua = {"not", {"number?", k}}
    return(_g282)
  end)(), join({"let", {v, {"get", t1, k}}}, _g281)}}})
end}
modules.lib["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g283 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g283)})
end}
modules.lib.inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end}
modules.lib.dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end}
modules.lib.pr = {macro = function (...)
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
end}
modules.compiler["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true}
modules.compiler["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g284 = form
  while (i < length(_g284)) do
    local condition = _g284[(i + 1)]
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
modules.compiler["while"] = {special = function (_g285)
  local condition = _g285[1]
  local body = sub(_g285, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g286 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g286)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, tr = true}
modules.compiler["%for"] = {special = function (_g287)
  local _g288 = _g287[1]
  local t = _g288[1]
  local k = _g288[2]
  local body = sub(_g287, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g289 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g289)
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
    local _g290 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g290)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g291 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g291)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true}
modules.compiler["break"] = {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true}
modules.compiler["%function"] = {special = function (_g292)
  local args = _g292[1]
  local body = sub(_g292, 1)
  return(compile_function(args, body))
end}
modules.compiler["%global-function"] = {special = function (_g293)
  local name = _g293[1]
  local args = _g293[2]
  local body = sub(_g293, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true}
modules.compiler["%local-function"] = {special = function (_g294)
  local name = _g294[1]
  local args = _g294[2]
  local body = sub(_g294, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true}
modules.compiler["error"] = {special = function (_g295)
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
end, stmt = true}
modules.compiler["set"] = {special = function (_g297)
  local lh = _g297[1]
  local rh = _g297[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true}
modules.compiler["get"] = {special = function (_g298)
  local t = _g298[1]
  local k = _g298[2]
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
modules.compiler["not"] = {special = function (_g299)
  local x = _g299[1]
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
  local _g300 = forms
  while (i < length(_g300)) do
    local x = _g300[(i + 1)]
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
  local _g301 = pairs
  while (i < length(_g301)) do
    local _g302 = _g301[(i + 1)]
    local k = _g302[1]
    local v = _g302[2]
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
  local _g303 = sub(body, 0)
  local imp = _g303.import
  local exp = _g303.export
  map(load_module, imp)
  exports = {}
  local _g305 = 0
  local _g304 = (exp or {})
  while (_g305 < length(_g304)) do
    local x = _g304[(_g305 + 1)]
    exports[x] = true
    _g305 = (_g305 + 1)
  end
  return(nil)
end}
modules.compiler["return"] = {special = function (_g306)
  local x = _g306[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true}
modules.reader = {}
modules.reader["define-reader"] = {macro = function (_g307, ...)
  local char = _g307[1]
  local stream = _g307[2]
  local body = unstash({...})
  local _g308 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g308)})
end}
modules.main = {}
main()