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
modules = {}
exports = {}
loading = {}
compiler_output = nil
save_env63 = false
compiling63 = false
function quote_binding(x)
  if is63(x.symbol) then
    local _g63 = {"table"}
    _g63.symbol = {"quote", x.symbol}
    return(_g63)
  elseif (x.macro and x.form) then
    local _g64 = {"table"}
    _g64.macro = x.form
    return(_g64)
  elseif (x.special and x.form) then
    local stmt = x.stmt
    local tr = x.tr
    local _g65 = {"table"}
    _g65.special = x.form
    _g65.stmt = stmt
    _g65.tr = tr
    return(_g65)
  end
end
function save_environment()
  local env = {"define", "environment", {"list", {"table"}}}
  local toplevel = hd(environment)
  compiler_output = (compiler_output .. compile_toplevel(env))
  local k = nil
  local _g66 = map42(quote_binding, toplevel)
  for k in next, _g66 do
    if (not number63(k)) then
      local v = _g66[k]
      local x = compile_toplevel({"setenv", {"quote", k}, v})
      compiler_output = (compiler_output .. x)
    end
  end
  local m = nil
  local _g67 = modules
  for m in next, _g67 do
    if (not number63(m)) then
      local v = _g67[m]
      local x = compile_toplevel({"set", {"get", "modules", {"quote", m}}, {"table"}})
      compiler_output = (compiler_output .. x)
      local k = nil
      local _g68 = map42(quote_binding, v)
      for k in next, _g68 do
        if (not number63(k)) then
          local v = _g68[k]
          local x = compile_toplevel({"set", {"get", {"get", "modules", {"quote", m}}, {"quote", k}}, v})
          compiler_output = (compiler_output .. x)
        end
      end
    end
  end
end
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  return(compile_toplevel(join({"do"}, body)))
end
function load_module(spec)
  local k = to_string(spec)
  local module = {}
  if list63(spec) then
    error("Unsupported module specification")
  elseif loading[k] then
    return
  elseif ((not compiling63) and modules[k]) then
    module = modules[k]
  else
    local file = (k .. ".l")
    local frame = {}
    loading[k] = true
    add(environment, frame)
    local compiled = compile_file(file)
    drop(environment)
    local x = nil
    local _g69 = frame
    for x in next, _g69 do
      if (not number63(x)) then
        local v = _g69[x]
        module[x] = v
      end
    end
    modules[k] = module
    if compiling63 then
      compiler_output = (compiler_output .. compiled)
    else
      run(compiled)
    end
  end
  local x = nil
  local _g70 = module
  for x in next, _g70 do
    if (not number63(x)) then
      local v = _g70[x]
      setenv(x, v)
    end
  end
end
function compile_module(spec)
  compiling63 = true
  compiler_output = ""
  load_module(spec)
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
    local _g122 = args
    for k in next, _g122 do
      if (not number63(k)) then
        local v = _g122[k]
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
    local _g123 = args
    for k in next, _g123 do
      if (not number63(k)) then
        local v = _g123[k]
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
      local _g124 = l
      for k in next, _g124 do
        if (not number63(k)) then
          local v = _g124[k]
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
    local _g126 = 0
    local _g125 = args
    while (_g126 < length(_g125)) do
      local arg = _g125[(_g126 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g126 = (_g126 + 1)
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
    local _g127 = lh
    while (i < length(_g127)) do
      local x = _g127[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g128 = lh
    for k in next, _g128 do
      if (not number63(k)) then
        local v = _g128[k]
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
      local _g129 = form[2]
      local t = _g129[1]
      local k = _g129[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g3 = form[1]
      local args = form[2]
      local _g130 = sub(form, 2)
      add(environment, {})
      local _g132 = (function ()
        local _g134 = 0
        local _g133 = args
        while (_g134 < length(_g133)) do
          local _g131 = _g133[(_g134 + 1)]
          setenv42(_g131, pending)
          _g134 = (_g134 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g130)))
      end)()
      drop(environment)
      return(_g132)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g4 = form[1]
      local name = form[2]
      local _g135 = form[3]
      local _g136 = sub(form, 3)
      add(environment, {})
      local _g138 = (function ()
        local _g140 = 0
        local _g139 = _g135
        while (_g140 < length(_g139)) do
          local _g137 = _g139[(_g140 + 1)]
          setenv42(_g137, pending)
          _g140 = (_g140 + 1)
        end
        return(join({x, name, map42(macroexpand, _g135)}, macroexpand(_g136)))
      end)()
      drop(environment)
      return(_g138)
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
  local _g141 = form
  for k in next, _g141 do
    if (not number63(k)) then
      local v = _g141[k]
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
  local _g143 = 0
  local _g142 = form
  while (_g143 < length(_g142)) do
    local x = _g142[(_g143 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g143 = (_g143 + 1)
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
  local _g144 = (from or 0)
  if string63(x) then
    return((string.sub)(x, (_g144 + 1), upto))
  else
    local l = (function ()
      local i = _g144
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
    local _g145 = x
    for k in next, _g145 do
      if (not number63(k)) then
        local v = _g145[k]
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
    local _g146 = l1
    for k in next, _g146 do
      if (not number63(k)) then
        local v = _g146[k]
        l[k] = v
      end
    end
    local _g148 = nil
    local _g147 = l2
    for _g148 in next, _g147 do
      if (not number63(_g148)) then
        local v = _g147[_g148]
        l[_g148] = v
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
  local _g150 = 0
  local _g149 = l
  while (_g150 < length(_g149)) do
    local x = _g149[(_g150 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g150 = (_g150 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g152 = 0
  local _g151 = l
  while (_g152 < length(_g151)) do
    local x = _g151[(_g152 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g152 = (_g152 + 1)
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
  local _g162 = 0
  local _g161 = l
  while (_g162 < length(_g161)) do
    local x = _g161[(_g162 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g162 = (_g162 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g163 = t
  for k in next, _g163 do
    if (not number63(k)) then
      local v = _g163[k]
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
  local _g164 = t
  for k in next, _g164 do
    if (not number63(k)) then
      local v = _g164[k]
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
  local _g165 = (function ()
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
  local _g166 = sub(xs, 0)
  if empty63(_g166) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g166))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g169 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g169))
end
function _(...)
  local xs = unstash({...})
  local _g170 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g170)))
end
function _42(...)
  local xs = unstash({...})
  local _g171 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g171))
end
function _47(...)
  local xs = unstash({...})
  local _g172 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g172)))
end
function _37(...)
  local xs = unstash({...})
  local _g173 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g173)))
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
    local _g174 = x
    for k in next, _g174 do
      if (not number63(k)) then
        local v = _g174[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g175 = x1
    while (i < length(_g175)) do
      local y = _g175[(i + 1)]
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
  local _g176 = stash(args)
  return(f(unpack(_g176)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
function rep(str)
  local _g177 = (function ()
    local _g178,_g179 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g178, _g179})
  end)()
  local _g1 = _g177[1]
  local x = _g177[2]
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
  local _g180 = args
  while (i < length(_g180)) do
    local arg = _g180[(i + 1)]
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
setenv("%try", {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g181 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g181)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g182 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g182)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true})
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
  local _g183 = forms
  while (i < length(_g183)) do
    local x = _g183[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end})
setenv("at", {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end})
setenv("join!", {macro = function (a, ...)
  local bs = unstash({...})
  local _g184 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g184)})
end})
setenv("break", {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true})
setenv("set-of", {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g186 = 0
  local _g185 = elements
  while (_g186 < length(_g185)) do
    local e = _g185[(_g186 + 1)]
    l[e] = true
    _g186 = (_g186 + 1)
  end
  return(join({"table"}, l))
end})
setenv("define-module", {macro = function (spec, ...)
  local body = unstash({...})
  local _g187 = sub(body, 0)
  local imp = _g187.import
  local exp = _g187.export
  map(load_module, imp)
  exports = {}
  local _g189 = 0
  local _g188 = (exp or {})
  while (_g189 < length(_g188)) do
    local x = _g188[(_g189 + 1)]
    exports[x] = true
    _g189 = (_g189 + 1)
  end
  return(nil)
end})
setenv("language", {macro = function ()
  return({"quote", target})
end})
setenv("get", {special = function (_g190)
  local t = _g190[1]
  local k = _g190[2]
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
setenv("with-bindings", {macro = function (_g191, ...)
  local names = _g191[1]
  local body = unstash({...})
  local _g192 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, {"setenv*", x, "pending"}}}, _g192))
end})
setenv("define-special", {macro = function (name, args, ...)
  local body = unstash({...})
  local _g193 = sub(body, 0)
  local form = join({"fn", args}, _g193)
  local value = join((function ()
    local _g194 = {"table"}
    _g194.special = form
    _g194.form = {"quote", form}
    return(_g194)
  end)(), _g193)
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end})
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
setenv("list*", {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g196 = xs
    while (i < length(_g196)) do
      local x = _g196[(i + 1)]
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
setenv("%global-function", {special = function (_g197)
  local name = _g197[1]
  local args = _g197[2]
  local body = sub(_g197, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true})
setenv("list", {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g198 = body
    for k in next, _g198 do
      if (not number63(k)) then
        local v = _g198[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end})
setenv("inc", {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end})
setenv("quote", {macro = function (form)
  return(quoted(form))
end})
setenv("each", {macro = function (_g199, ...)
  local t = _g199[1]
  local k = _g199[2]
  local v = _g199[3]
  local body = unstash({...})
  local _g200 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g201 = {"target"}
    _g201.js = {"isNaN", {"parseInt", k}}
    _g201.lua = {"not", {"number?", k}}
    return(_g201)
  end)(), join({"let", {v, {"get", t1, k}}}, _g200)}}})
end})
setenv("pr", {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end})
setenv("let-macro", {macro = function (definitions, ...)
  local body = unstash({...})
  local _g202 = sub(body, 0)
  add(environment, {})
  local _g203 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g202)))
  end)()
  drop(environment)
  return(_g203)
end})
setenv("define", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g204 = sub(body, 0)
  setenv42(name, pending)
  return(join({"define-global", name, x}, _g204))
end})
setenv("dec", {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end})
setenv("let-symbol", {macro = function (expansions, ...)
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
end})
setenv("define-symbol", {macro = function (name, expansion)
  setenv(name, {symbol = expansion})
  return(nil)
end})
setenv("target", {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end})
setenv("define-local", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g208 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g208)) then
    local _g209 = bind_arguments(x, _g208)
    local args = _g209[1]
    local _g210 = _g209[2]
    return(join({"%local-function", name, args}, _g210))
  else
    return({"%local", name, x})
  end
end})
setenv("%function", {special = function (_g211)
  local args = _g211[1]
  local body = sub(_g211, 1)
  return(compile_function(args, body))
end})
setenv("with-frame", {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end})
setenv("across", {macro = function (_g212, ...)
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
end})
setenv("%local-function", {special = function (_g214)
  local name = _g214[1]
  local args = _g214[2]
  local body = sub(_g214, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true})
setenv("if", {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g215 = form
  while (i < length(_g215)) do
    local condition = _g215[(i + 1)]
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
setenv("table", {macro = function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _g216 = body
  for k in next, _g216 do
    if (not number63(k)) then
      local v = _g216[k]
      if is63(v) then
        add(l, k)
        add(l, v)
      end
    end
  end
  return(join({"%object"}, l))
end})
setenv("do", {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true})
setenv("quasiquote", {macro = function (form)
  return(quasiexpand(form, 1))
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
setenv("define-reader", {macro = function (_g217, ...)
  local char = _g217[1]
  local stream = _g217[2]
  local body = unstash({...})
  local _g218 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g218)})
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
  local _g219 = pairs
  while (i < length(_g219)) do
    local _g220 = _g219[(i + 1)]
    local k = _g220[1]
    local v = _g220[2]
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
setenv("return", {special = function (_g221)
  local x = _g221[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true})
setenv("with-indent", {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end})
setenv("define-macro", {macro = function (name, args, ...)
  local body = unstash({...})
  local _g222 = sub(body, 0)
  local form = join({"fn", args}, _g222)
  local value = (function ()
    local _g223 = {"table"}
    _g223.macro = form
    _g223.form = {"quote", form}
    return(_g223)
  end)()
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end})
setenv("define-global", {macro = function (name, x, ...)
  local body = unstash({...})
  local _g224 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g224)) then
    local _g225 = bind_arguments(x, _g224)
    local args = _g225[1]
    local _g226 = _g225[2]
    return(join({"%global-function", name, args}, _g226))
  else
    return({"set", name, x})
  end
end})
setenv("let", {macro = function (bindings, ...)
  local body = unstash({...})
  local _g227 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g228)
    local lh = _g228[1]
    local rh = _g228[2]
    local _g230 = 0
    local _g229 = bind(lh, rh)
    while (_g230 < length(_g229)) do
      local _g231 = _g229[(_g230 + 1)]
      local id = _g231[1]
      local val = _g231[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv42(id, pending)
      end
      add(locals, {"%local", id, val})
      _g230 = (_g230 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g227)})))
end})
setenv("cat!", {macro = function (a, ...)
  local bs = unstash({...})
  local _g232 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g232)})
end})
setenv("%for", {special = function (_g233)
  local _g234 = _g233[1]
  local t = _g234[1]
  local k = _g234[2]
  local body = sub(_g233, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g235 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g235)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, stmt = true, tr = true})
setenv("join*", {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end})
setenv("error", {special = function (_g236)
  local x = _g236[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true})
setenv("not", {special = function (_g237)
  local x = _g237[1]
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
setenv("fn", {macro = function (args, ...)
  local body = unstash({...})
  local _g238 = sub(body, 0)
  local _g239 = bind_arguments(args, _g238)
  local args = _g239[1]
  local _g240 = _g239[2]
  return(join({"%function", args}, _g240))
end})
setenv("set", {special = function (_g241)
  local lh = _g241[1]
  local rh = _g241[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true})
setenv("while", {special = function (_g242)
  local condition = _g242[1]
  local body = sub(_g242, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g243 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g243)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, tr = true})
modules.compiler = {}
modules.compiler["define-reader"] = {macro = function (_g244, ...)
  local char = _g244[1]
  local stream = _g244[2]
  local body = unstash({...})
  local _g245 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g245)})
end}
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
end, stmt = true, tr = true}
modules.compiler["while"] = {special = function (_g247)
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
end, stmt = true, tr = true}
modules.compiler["%for"] = {special = function (_g249)
  local _g250 = _g249[1]
  local t = _g250[1]
  local k = _g250[2]
  local body = sub(_g249, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g251 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g251)
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
    local _g252 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g252)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g253 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g253)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true}
modules.compiler["break"] = {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true}
modules.compiler["%function"] = {special = function (_g254)
  local args = _g254[1]
  local body = sub(_g254, 1)
  return(compile_function(args, body))
end}
modules.compiler["%global-function"] = {special = function (_g255)
  local name = _g255[1]
  local args = _g255[2]
  local body = sub(_g255, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true}
modules.compiler["%local-function"] = {special = function (_g256)
  local name = _g256[1]
  local args = _g256[2]
  local body = sub(_g256, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true}
modules.compiler["return"] = {special = function (_g257)
  local x = _g257[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true}
modules.compiler["error"] = {special = function (_g258)
  local x = _g258[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true}
modules.compiler["%local"] = {special = function (_g259)
  local name = _g259[1]
  local value = _g259[2]
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
modules.compiler["set"] = {special = function (_g260)
  local lh = _g260[1]
  local rh = _g260[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true}
modules.compiler["get"] = {special = function (_g261)
  local t = _g261[1]
  local k = _g261[2]
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
modules.compiler["not"] = {special = function (_g262)
  local x = _g262[1]
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
  local _g263 = forms
  while (i < length(_g263)) do
    local x = _g263[(i + 1)]
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
  local _g264 = pairs
  while (i < length(_g264)) do
    local _g265 = _g264[(i + 1)]
    local k = _g265[1]
    local v = _g265[2]
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
  local _g266 = sub(body, 0)
  local imp = _g266.import
  local exp = _g266.export
  map(load_module, imp)
  exports = {}
  local _g268 = 0
  local _g267 = (exp or {})
  while (_g268 < length(_g267)) do
    local x = _g267[(_g268 + 1)]
    exports[x] = true
    _g268 = (_g268 + 1)
  end
  return(nil)
end}
modules.reader = {}
modules.reader["define-reader"] = {macro = function (_g269, ...)
  local char = _g269[1]
  local stream = _g269[2]
  local body = unstash({...})
  local _g270 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g270)})
end}
modules.lib = {}
modules.lib["define-reader"] = {macro = function (_g271, ...)
  local char = _g271[1]
  local stream = _g271[2]
  local body = unstash({...})
  local _g272 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g272)})
end}
modules.lib["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end}
modules.lib["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true}
modules.lib["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g273 = form
  while (i < length(_g273)) do
    local condition = _g273[(i + 1)]
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
modules.lib["while"] = {special = function (_g274)
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
modules.lib["%for"] = {special = function (_g276)
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
end, stmt = true, tr = true}
modules.lib["%try"] = {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g279 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g279)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g280 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g280)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true}
modules.lib["break"] = {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true}
modules.lib["%function"] = {special = function (_g281)
  local args = _g281[1]
  local body = sub(_g281, 1)
  return(compile_function(args, body))
end}
modules.lib["%global-function"] = {special = function (_g282)
  local name = _g282[1]
  local args = _g282[2]
  local body = sub(_g282, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true}
modules.lib["%local-function"] = {special = function (_g283)
  local name = _g283[1]
  local args = _g283[2]
  local body = sub(_g283, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true}
modules.lib["return"] = {special = function (_g284)
  local x = _g284[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true}
modules.lib["error"] = {special = function (_g285)
  local x = _g285[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true}
modules.lib["%local"] = {special = function (_g286)
  local name = _g286[1]
  local value = _g286[2]
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
modules.lib["set"] = {special = function (_g287)
  local lh = _g287[1]
  local rh = _g287[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true}
modules.lib["get"] = {special = function (_g288)
  local t = _g288[1]
  local k = _g288[2]
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
modules.lib["not"] = {special = function (_g289)
  local x = _g289[1]
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
modules.lib["%array"] = {special = function (forms)
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
  local _g290 = forms
  while (i < length(_g290)) do
    local x = _g290[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}
modules.lib["%object"] = {special = function (forms)
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
  local _g291 = pairs
  while (i < length(_g291)) do
    local _g292 = _g291[(i + 1)]
    local k = _g292[1]
    local v = _g292[2]
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
modules.lib["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g293 = sub(body, 0)
  local imp = _g293.import
  local exp = _g293.export
  map(load_module, imp)
  exports = {}
  local _g295 = 0
  local _g294 = (exp or {})
  while (_g295 < length(_g294)) do
    local x = _g294[(_g295 + 1)]
    exports[x] = true
    _g295 = (_g295 + 1)
  end
  return(nil)
end}
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
    local _g296 = body
    for k in next, _g296 do
      if (not number63(k)) then
        local v = _g296[k]
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
  local _g297 = body
  for k in next, _g297 do
    if (not number63(k)) then
      local v = _g297[k]
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
  local _g298 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g299)
    local lh = _g299[1]
    local rh = _g299[2]
    local _g301 = 0
    local _g300 = bind(lh, rh)
    while (_g301 < length(_g300)) do
      local _g302 = _g300[(_g301 + 1)]
      local id = _g302[1]
      local val = _g302[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv42(id, pending)
      end
      add(locals, {"%local", id, val})
      _g301 = (_g301 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g298)})))
end}
modules.lib["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g303 = sub(body, 0)
  local form = join({"fn", args}, _g303)
  local value = (function ()
    local _g304 = {"table"}
    _g304.macro = form
    _g304.form = {"quote", form}
    return(_g304)
  end)()
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end}
modules.lib["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g305 = sub(body, 0)
  local form = join({"fn", args}, _g305)
  local value = join((function ()
    local _g306 = {"table"}
    _g306.special = form
    _g306.form = {"quote", form}
    return(_g306)
  end)(), _g305)
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
  local _g307 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g307)) then
    local _g308 = bind_arguments(x, _g307)
    local args = _g308[1]
    local _g309 = _g308[2]
    return(join({"%global-function", name, args}, _g309))
  else
    return({"set", name, x})
  end
end}
modules.lib["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g310 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g310)) then
    local _g311 = bind_arguments(x, _g310)
    local args = _g311[1]
    local _g312 = _g311[2]
    return(join({"%local-function", name, args}, _g312))
  else
    return({"%local", name, x})
  end
end}
modules.lib.define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g313 = sub(body, 0)
  setenv42(name, pending)
  return(join({"define-global", name, x}, _g313))
end}
modules.lib["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end}
modules.lib["with-bindings"] = {macro = function (_g314, ...)
  local names = _g314[1]
  local body = unstash({...})
  local _g315 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, {"setenv*", x, "pending"}}}, _g315))
end}
modules.lib["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g316 = sub(body, 0)
  add(environment, {})
  local _g317 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g316)))
  end)()
  drop(environment)
  return(_g317)
end}
modules.lib["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g318 = sub(body, 0)
  add(environment, {})
  local _g319 = (function ()
    map(function (_g320)
      local name = _g320[1]
      local exp = _g320[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g318)))
  end)()
  drop(environment)
  return(_g319)
end}
modules.lib.fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g321 = sub(body, 0)
  local _g322 = bind_arguments(args, _g321)
  local args = _g322[1]
  local _g323 = _g322[2]
  return(join({"%function", args}, _g323))
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
modules.lib.across = {macro = function (_g324, ...)
  local l = _g324[1]
  local v = _g324[2]
  local i = _g324[3]
  local start = _g324[4]
  local body = unstash({...})
  local _g325 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g325, {{"inc", i}}))}})
end}
modules.lib["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g327 = 0
  local _g326 = elements
  while (_g327 < length(_g326)) do
    local e = _g326[(_g327 + 1)]
    l[e] = true
    _g327 = (_g327 + 1)
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
  local _g328 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g328)})
end}
modules.lib["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g329 = xs
    while (i < length(_g329)) do
      local x = _g329[(i + 1)]
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
modules.lib.each = {macro = function (_g330, ...)
  local t = _g330[1]
  local k = _g330[2]
  local v = _g330[3]
  local body = unstash({...})
  local _g331 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g332 = {"target"}
    _g332.js = {"isNaN", {"parseInt", k}}
    _g332.lua = {"not", {"number?", k}}
    return(_g332)
  end)(), join({"let", {v, {"get", t1, k}}}, _g331)}}})
end}
modules.lib["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g333 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g333)})
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
modules.main = {}
modules.main["define-reader"] = {macro = function (_g334, ...)
  local char = _g334[1]
  local stream = _g334[2]
  local body = unstash({...})
  local _g335 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g335)})
end}
modules.main["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end}
modules.main["do"] = {special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, stmt = true, tr = true}
modules.main["if"] = {special = function (form, tail63)
  local str = ""
  local i = 0
  local _g336 = form
  while (i < length(_g336)) do
    local condition = _g336[(i + 1)]
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
modules.main["while"] = {special = function (_g337)
  local condition = _g337[1]
  local body = sub(_g337, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g338 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g338)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, stmt = true, tr = true}
modules.main["%for"] = {special = function (_g339)
  local _g340 = _g339[1]
  local t = _g340[1]
  local k = _g340[2]
  local body = sub(_g339, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g341 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g341)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, stmt = true, tr = true}
modules.main["%try"] = {special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g342 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g342)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g343 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g343)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, stmt = true, tr = true}
modules.main["break"] = {special = function (_g5)
  return((indentation() .. "break"))
end, stmt = true}
modules.main["%function"] = {special = function (_g344)
  local args = _g344[1]
  local body = sub(_g344, 1)
  return(compile_function(args, body))
end}
modules.main["%global-function"] = {special = function (_g345)
  local name = _g345[1]
  local args = _g345[2]
  local body = sub(_g345, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, stmt = true, tr = true}
modules.main["%local-function"] = {special = function (_g346)
  local name = _g346[1]
  local args = _g346[2]
  local body = sub(_g346, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, stmt = true, tr = true}
modules.main["return"] = {special = function (_g347)
  local x = _g347[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, stmt = true}
modules.main["error"] = {special = function (_g348)
  local x = _g348[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, stmt = true}
modules.main["%local"] = {special = function (_g349)
  local name = _g349[1]
  local value = _g349[2]
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
modules.main["set"] = {special = function (_g350)
  local lh = _g350[1]
  local rh = _g350[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, stmt = true}
modules.main["get"] = {special = function (_g351)
  local t = _g351[1]
  local k = _g351[2]
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
modules.main["not"] = {special = function (_g352)
  local x = _g352[1]
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
modules.main["%array"] = {special = function (forms)
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
  local _g353 = forms
  while (i < length(_g353)) do
    local x = _g353[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}
modules.main["%object"] = {special = function (forms)
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
  local _g354 = pairs
  while (i < length(_g354)) do
    local _g355 = _g354[(i + 1)]
    local k = _g355[1]
    local v = _g355[2]
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
modules.main["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g356 = sub(body, 0)
  local imp = _g356.import
  local exp = _g356.export
  map(load_module, imp)
  exports = {}
  local _g358 = 0
  local _g357 = (exp or {})
  while (_g358 < length(_g357)) do
    local x = _g357[(_g358 + 1)]
    exports[x] = true
    _g358 = (_g358 + 1)
  end
  return(nil)
end}
modules.main.at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end}
modules.main.quote = {macro = function (form)
  return(quoted(form))
end}
modules.main.list = {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g359 = body
    for k in next, _g359 do
      if (not number63(k)) then
        local v = _g359[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end}
modules.main.table = {macro = function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _g360 = body
  for k in next, _g360 do
    if (not number63(k)) then
      local v = _g360[k]
      if is63(v) then
        add(l, k)
        add(l, v)
      end
    end
  end
  return(join({"%object"}, l))
end}
modules.main.let = {macro = function (bindings, ...)
  local body = unstash({...})
  local _g361 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g362)
    local lh = _g362[1]
    local rh = _g362[2]
    local _g364 = 0
    local _g363 = bind(lh, rh)
    while (_g364 < length(_g363)) do
      local _g365 = _g363[(_g364 + 1)]
      local id = _g365[1]
      local val = _g365[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv42(id, pending)
      end
      add(locals, {"%local", id, val})
      _g364 = (_g364 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g361)})))
end}
modules.main["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g366 = sub(body, 0)
  local form = join({"fn", args}, _g366)
  local value = (function ()
    local _g367 = {"table"}
    _g367.macro = form
    _g367.form = {"quote", form}
    return(_g367)
  end)()
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end}
modules.main["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g368 = sub(body, 0)
  local form = join({"fn", args}, _g368)
  local value = join((function ()
    local _g369 = {"table"}
    _g369.special = form
    _g369.form = {"quote", form}
    return(_g369)
  end)(), _g368)
  local binding = {"setenv", {"quote", name}, value}
  eval(binding)
  return(nil)
end}
modules.main["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {symbol = expansion})
  return(nil)
end}
modules.main["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g370 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g370)) then
    local _g371 = bind_arguments(x, _g370)
    local args = _g371[1]
    local _g372 = _g371[2]
    return(join({"%global-function", name, args}, _g372))
  else
    return({"set", name, x})
  end
end}
modules.main["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g373 = sub(body, 0)
  setenv42(name, pending)
  if (not empty63(_g373)) then
    local _g374 = bind_arguments(x, _g373)
    local args = _g374[1]
    local _g375 = _g374[2]
    return(join({"%local-function", name, args}, _g375))
  else
    return({"%local", name, x})
  end
end}
modules.main.define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g376 = sub(body, 0)
  setenv42(name, pending)
  return(join({"define-global", name, x}, _g376))
end}
modules.main["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end}
modules.main["with-bindings"] = {macro = function (_g377, ...)
  local names = _g377[1]
  local body = unstash({...})
  local _g378 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, {"setenv*", x, "pending"}}}, _g378))
end}
modules.main["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g379 = sub(body, 0)
  add(environment, {})
  local _g380 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g379)))
  end)()
  drop(environment)
  return(_g380)
end}
modules.main["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g381 = sub(body, 0)
  add(environment, {})
  local _g382 = (function ()
    map(function (_g383)
      local name = _g383[1]
      local exp = _g383[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g381)))
  end)()
  drop(environment)
  return(_g382)
end}
modules.main.fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g384 = sub(body, 0)
  local _g385 = bind_arguments(args, _g384)
  local args = _g385[1]
  local _g386 = _g385[2]
  return(join({"%function", args}, _g386))
end}
modules.main.guard = {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end}
modules.main.across = {macro = function (_g387, ...)
  local l = _g387[1]
  local v = _g387[2]
  local i = _g387[3]
  local start = _g387[4]
  local body = unstash({...})
  local _g388 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g388, {{"inc", i}}))}})
end}
modules.main["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g390 = 0
  local _g389 = elements
  while (_g390 < length(_g389)) do
    local e = _g389[(_g390 + 1)]
    l[e] = true
    _g390 = (_g390 + 1)
  end
  return(join({"table"}, l))
end}
modules.main.quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end}
modules.main.language = {macro = function ()
  return({"quote", target})
end}
modules.main.target = {macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end}
modules.main["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end}
modules.main["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g391 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g391)})
end}
modules.main["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g392 = xs
    while (i < length(_g392)) do
      local x = _g392[(i + 1)]
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
modules.main.each = {macro = function (_g393, ...)
  local t = _g393[1]
  local k = _g393[2]
  local v = _g393[3]
  local body = unstash({...})
  local _g394 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g395 = {"target"}
    _g395.js = {"isNaN", {"parseInt", k}}
    _g395.lua = {"not", {"number?", k}}
    return(_g395)
  end)(), join({"let", {v, {"get", t1, k}}}, _g394)}}})
end}
modules.main["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g396 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g396)})
end}
modules.main.inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end}
modules.main.dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end}
modules.main.pr = {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end}
main()