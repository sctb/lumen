environment = {{}}

setenv = function (k, v)
  last(environment)[k] = v
end

getenv = function (k)
  if is_string(k) then
    local i = (length(environment) - 1)
    while (i >= 0) do
      local v = environment[(i + 1)][k]
      if v then
        return(v)
      end
      i = (i - 1)
    end
  end
end

variable = {}

is_symbol_macro = function (k)
  local v = getenv(k)
  return((is_is(v) and (not (v == variable)) and (not is_macro(k))))
end

is_macro = function (k)
  return(is_function(getenv(k)))
end

is_variable = function (k)
  return((last(environment)[k] == variable))
end

is_bound = function (x)
  return((is_symbol_macro(x) or is_macro(x) or is_variable(x)))
end

is_embed_macros = false

is_vararg = function (x)
  return(((length(x) > 3) and (sub(x, (length(x) - 3), length(x)) == "...")))
end

vararg_name = function (x)
  return(sub(x, 0, (length(x) - 3)))
end

stash = function (args)
  if is_keys(args) then
    local p = properties(args)
    p["_stash"] = true
    return(join(args, {p}))
  else
    return(args)
  end
end

unstash = function (args)
  if is_empty(args) then
    return({})
  else
    local l = last(args)
    if (is_composite(l) and l["_stash"]) then
      local args1 = sub(args, 0, (length(args) - 1))
      mapk(function (k, v)
        if (k ~= "_stash") then
          args1[k] = v
        end
      end, l)
      return(args1)
    else
      return(args)
    end
  end
end

bind_arguments = function (args, body)
  local args1 = {}
  local rest = function ()
    if (target == "js") then
      return({"unstash", {"sub", "arguments", length(args1)}})
    else
      add(args1, "...")
      return({"unstash", {"list", "..."}})
    end
  end
  if is_atom(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bindings = {}
    local _16 = 0
    local _15 = args
    while (_16 < length(_15)) do
      local arg = _15[(_16 + 1)]
      if is_vararg(arg) then
        local v = vararg_name(arg)
        local expr = rest()
        bindings = join(bindings, {v, expr})
        break
      elseif is_list(arg) then
        local _17 = make_id()
        add(args1, _17)
        bindings = join(bindings, {arg, _17})
      else
        add(args1, arg)
      end
      _16 = (_16 + 1)
    end
    if is_empty(bindings) then
      return({args1, body})
    else
      return({args1, {join({"let", bindings}, body)}})
    end
  end
end

bind = function (lh, rh)
  if (is_list(lh) and is_list(rh)) then
    local id = make_id()
    return(join({{id, rh}}, bind(lh, id)))
  elseif is_atom(lh) then
    return({{lh, rh}})
  else
    local bindings = {}
    local i = 0
    local _18 = lh
    while (i < length(_18)) do
      local x = _18[(i + 1)]
      local b = (function ()
        if is_vararg(x) then
          return({{vararg_name(x), {"sub", rh, i}}})
        else
          return(bind(x, {"at", rh, i}))
        end
      end)()
      bindings = join(bindings, b)
      i = (i + 1)
    end
    return(bindings)
  end
end

is_quoting = function (depth)
  return(is_number(depth))
end

is_quasiquoting = function (depth)
  return((is_quoting(depth) and (depth > 0)))
end

is_can_unquote = function (depth)
  return((is_quoting(depth) and (depth == 1)))
end

macroexpand = function (form)
  if is_symbol_macro(form) then
    return(macroexpand(getenv(form)))
  elseif is_atom(form) then
    return(form)
  else
    local name = hd(form)
    if (name == "quote") then
      return(form)
    elseif (name == "define-macro") then
      return(form)
    elseif is_macro(name) then
      return(macroexpand(apply(getenv(name), tl(form))))
    elseif ((name == "function") or (name == "for")) then
      local _ = form[1]
      local args = form[2]
      local body = sub(form, 2)
      add(environment, {})
      local _24 = 0
      local _23 = args
      while (_24 < length(_23)) do
        local _22 = _23[(_24 + 1)]
        setenv(_22, variable)
        _24 = (_24 + 1)
      end
      local _21 = join({name, args}, macroexpand(body))
      drop(environment)
      return(_21)
    else
      return(mapi(macroexpand, form))
    end
  end
end

quasiexpand = function (form, depth)
  if is_quasiquoting(depth) then
    if is_atom(form) then
      return({"quote", form})
    elseif (is_can_unquote(depth) and (hd(form) == "unquote")) then
      return(quasiexpand(form[2]))
    elseif ((hd(form) == "unquote") or (hd(form) == "unquote-splicing")) then
      return(quasiquote_list(form, (depth - 1)))
    elseif (hd(form) == "quasiquote") then
      return(quasiquote_list(form, (depth + 1)))
    else
      return(quasiquote_list(form, depth))
    end
  elseif is_atom(form) then
    return(form)
  elseif (hd(form) == "quote") then
    return({"quote", form[2]})
  elseif (hd(form) == "quasiquote") then
    return(quasiexpand(form[2], 1))
  else
    return(mapi(function (x)
      return(quasiexpand(x, depth))
    end, form))
  end
end

quasiquote_list = function (form, depth)
  local xs = {{"list"}}
  local _26 = 0
  local _25 = form
  while (_26 < length(_25)) do
    local x = _25[(_26 + 1)]
    if (is_list(x) and is_can_unquote(depth) and (hd(x) == "unquote-splicing")) then
      add(xs, quasiexpand(x[2]))
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _26 = (_26 + 1)
  end
  if (length(xs) == 1) then
    return(hd(xs))
  else
    return(reduce(function (a, b)
      return({"join", a, b})
    end, keep(function (x)
      return((is_empty(x) or (not ((length(x) == 1) and (hd(x) == "list")))))
    end, xs)))
  end
end

target = "lua"

length = function (x)
  return(#x)
end

is_empty = function (x)
  return((length(x) == 0))
end

sub = function (x, from, upto)
  from = (from or 0)
  if is_string(x) then
    return(string.sub(x, (from + 1), upto))
  else
    local l = (function ()
      upto = (upto or length(x))
      local i = from
      local j = 0
      local x2 = {}
      while (i < upto) do
        x2[(j + 1)] = x[(i + 1)]
        i = (i + 1)
        j = (j + 1)
      end
      return(x2)
    end)()
    mapk(function (k, v)
      l[k] = v
    end, x)
    return(l)
  end
end

hd = function (a)
  return(a[1])
end

tl = function (a)
  return(sub(a, 1))
end

add = function (a, x)
  return(table.insert(a, x))
end

drop = function (a)
  return(table.remove(a))
end

shift = function (a)
  return(table.remove(a, 1))
end

last = function (a)
  return(a[((length(a) - 1) + 1)])
end

join = function (a1, a2)
  if is_nil(a1) then
    return(a2)
  elseif is_nil(a2) then
    return(a1)
  else
    local a3 = {}
    local i = 0
    local len = length(a1)
    while (i < len) do
      a3[(i + 1)] = a1[(i + 1)]
      i = (i + 1)
    end
    while (i < (len + length(a2))) do
      a3[(i + 1)] = a2[((i - len) + 1)]
      i = (i + 1)
    end
    local f = function (k, v)
      a3[k] = v
    end
    mapk(f, a1)
    mapk(f, a2)
    return(a3)
  end
end

reduce = function (f, x)
  if is_empty(x) then
    return(x)
  elseif (length(x) == 1) then
    return(hd(x))
  else
    return(f(hd(x), reduce(f, tl(x))))
  end
end

keep = function (f, a)
  local a1 = {}
  local _28 = 0
  local _27 = a
  while (_28 < length(_27)) do
    local x = _27[(_28 + 1)]
    if f(x) then
      add(a1, x)
    end
    _28 = (_28 + 1)
  end
  return(a1)
end

find = function (f, a)
  local _30 = 0
  local _29 = a
  while (_30 < length(_29)) do
    local x = _29[(_30 + 1)]
    local x1 = f(x)
    if x1 then
      return(x1)
    end
    _30 = (_30 + 1)
  end
end

pairwise = function (a)
  local i = 0
  local a1 = {}
  while (i < length(a)) do
    add(a1, {a[(i + 1)], a[((i + 1) + 1)]})
    i = (i + 2)
  end
  return(a1)
end

iterate = function (f, count)
  local i = 0
  while (i < count) do
    f(i)
    i = (i + 1)
  end
end

pair = function (k, v)
  return({_key = k, _value = v})
end

is_pair = function (x)
  if is_composite(x) then
    local k = x["_key"]
    local v = x["_value"]
    return((is_is(k) and is_is(v) and {k, v}))
  end
end

splice = function (x)
  return({_splice = x})
end

is_splice = function (x)
  if is_composite(x) then
    return(x["_splice"])
  end
end

map = function (f, t)
  local t1 = {}
  local step = function (k, v)
    local x = f(k, v)
    local p = is_pair(x)
    local s = is_splice(x)
    if p then
      local k1 = p[1]
      local v1 = p[2]
      t1[k1] = v1
    elseif is_composite(s) then
      t1 = join(t1, s)
    elseif is_is(s) then
      return(add(t1, s))
    elseif is_is(x) then
      return(add(t1, x))
    end
  end
  local _36 = 0
  local _35 = t
  while (_36 < length(_35)) do
    local x = _35[(_36 + 1)]
    step(x)
    _36 = (_36 + 1)
  end
  for k, v in pairs(t) do
    if (not is_number(k)) then
      step(k, v)
    end
  end
  return(t1)
end

mapi = function (f, t)
  return(map(function (k, v)
    if is_nil(v) then
      return(f(k))
    end
  end, t))
end

mapk = function (f, t)
  return(map(function (k, v)
    if is_is(v) then
      return(f(k, v))
    end
  end, t))
end

is_keys = function (t)
  local is_k = false
  for k, v in pairs(t) do
    if (not is_number(k)) then
      is_k = true
      break
    end
  end
  return(is_k)
end

properties = function (t)
  return(mapk(function (k, v)
    return(pair(k, v))
  end, t))
end

char = function (str, n)
  return(sub(str, n, (n + 1)))
end

search = function (str, pattern, start)
  if start then
    start = (start + 1)
  end
  local i = string.find(str, pattern, start, true)
  return((i and (i - 1)))
end

split = function (str, sep)
  local strs = {}
  while true do
    local i = search(str, sep)
    if is_nil(i) then
      break
    else
      add(strs, sub(str, 0, i))
      str = sub(str, (i + 1))
    end
  end
  add(strs, str)
  return(strs)
end

read_file = function (path)
  local f = io.open(path)
  return(f:read("*a"))
end

write_file = function (path, data)
  local f = io.open(path, "w")
  return(f:write(data))
end

write = function (x)
  return(io.write(x))
end

exit = function (code)
  return(os.exit(code))
end

is_nil = function (x)
  return((x == nil))
end

is_is = function (x)
  return((not is_nil(x)))
end

is_string = function (x)
  return((type(x) == "string"))
end

is_string_literal = function (x)
  return((is_string(x) and (char(x, 0) == "\"")))
end

is_number = function (x)
  return((type(x) == "number"))
end

is_boolean = function (x)
  return((type(x) == "boolean"))
end

is_function = function (x)
  return((type(x) == "function"))
end

is_composite = function (x)
  return((type(x) == "table"))
end

is_atom = function (x)
  return((not is_composite(x)))
end

is_table = function (x)
  return((is_composite(x) and is_nil(hd(x))))
end

is_list = function (x)
  return((is_composite(x) and is_is(hd(x))))
end

parse_number = function (str)
  return(tonumber(str))
end

to_string = function (x)
  if is_nil(x) then
    return("nil")
  elseif is_boolean(x) then
    if x then
      return("true")
    else
      return("false")
    end
  elseif is_function(x) then
    return("#<function>")
  elseif is_atom(x) then
    return((x .. ""))
  else
    local str = "("
    local ks = mapk(function (k, v)
      return(splice({(k .. ":"), v}))
    end, x)
    local x1 = join(sub(x), ks)
    local i = 0
    local _37 = x1
    while (i < length(_37)) do
      local y = _37[(i + 1)]
      str = (str .. to_string(y))
      if (i < (length(x1) - 1)) then
        str = (str .. " ")
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
end

apply = function (f, args)
  local args1 = stash(args)
  return(f(unpack(args1)))
end

id_counter = 0

make_id = function (prefix)
  id_counter = (id_counter + 1)
  return(("_" .. (prefix or "") .. id_counter))
end

eval_result = nil

eval = function (x)
  local y = ("eval_result=" .. x)
  local f = load(y)
  if f then
    f()
    return(eval_result)
  else
    local f,e = load(x)
    if f then
      return(f())
    else
      error((e .. " in " .. x))
    end
  end
end

delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}

whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}

make_stream = function (str)
  return({pos = 0, string = str, len = length(str)})
end

peek_char = function (s)
  if (s.pos < s.len) then
    return(char(s.string, s.pos))
  end
end

read_char = function (s)
  local c = peek_char(s)
  if c then
    s.pos = (s.pos + 1)
    return(c)
  end
end

skip_non_code = function (s)
  while true do
    local c = peek_char(s)
    if is_nil(c) then
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

is_key = function (atom)
  return((is_string(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
end

read_table[""] = function (s)
  local str = ""
  while true do
    local c = peek_char(s)
    if (c and ((not whitespace[c]) and (not delimiters[c]))) then
      str = (str .. c)
      read_char(s)
    else
      break
    end
  end
  local n = parse_number(str)
  if is_is(n) then
    return(n)
  elseif (str == "true") then
    return(true)
  elseif (str == "false") then
    return(false)
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
      if is_key(x) then
        local key = sub(x, 0, (length(x) - 1))
        local val = read(s)
        l[key] = val
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

read = function (s)
  skip_non_code(s)
  local c = peek_char(s)
  if is_is(c) then
    return(((read_table[c] or read_table[""]))(s))
  else
    return(eof)
  end
end

read_from_string = function (str)
  return(read(make_stream(str)))
end

operators = {common = {["+"] = "+", ["-"] = "-", ["%"] = "%", ["*"] = "*", ["/"] = "/", ["<"] = "<", [">"] = ">", ["<="] = "<=", [">="] = ">="}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", ["cat"] = "+"}, lua = {["="] = "==", ["~="] = "~=", ["and"] = "and", ["or"] = "or", ["cat"] = ".."}}

getop = function (op)
  return((operators["common"][op] or operators[target][op]))
end

is_operator = function (form)
  return((is_list(form) and is_is(getop(hd(form)))))
end

indent_level = 0

indentation = function ()
  local str = ""
  iterate(function ()
    str = (str .. "  ")
  end, indent_level)
  return(str)
end

compile_args = function (forms, is_compile)
  local str = "("
  local i = 0
  local _40 = forms
  while (i < length(_40)) do
    local x = _40[(i + 1)]
    str = (str .. (function ()
      if is_compile then
        return(compile(x))
      else
        return(identifier(x))
      end
    end)())
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end

compile_body = function (forms, is_tail)
  local str = ""
  local i = 0
  local _41 = forms
  while (i < length(_41)) do
    local x = _41[(i + 1)]
    local is_t = (is_tail and (i == (length(forms) - 1)))
    str = (str .. compile(x, true, is_t))
    i = (i + 1)
  end
  return(str)
end

identifier = function (id)
  local id2 = ""
  local i = 0
  while (i < length(id)) do
    local c = char(id, i)
    if (c == "-") then
      c = "_"
    end
    id2 = (id2 .. c)
    i = (i + 1)
  end
  local last = (length(id) - 1)
  local suffix = char(id, last)
  local name = sub(id2, 0, last)
  if (suffix == "?") then
    return(("is_" .. name))
  elseif (suffix == "!") then
    return(("n_" .. name))
  else
    return(id2)
  end
end

compile_atom = function (form)
  if (form == "nil") then
    if (target == "js") then
      return("undefined")
    else
      return("nil")
    end
  elseif (is_string(form) and (not is_string_literal(form))) then
    return(identifier(form))
  else
    return(to_string(form))
  end
end

compile_call = function (form)
  if is_empty(form) then
    return((compiler("list"))(form))
  else
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(tl(form), true)
    if is_list(f) then
      return(("(" .. f1 .. ")" .. args))
    elseif is_string(f) then
      return((f1 .. args))
    else
      error("Invalid function call")
    end
  end
end

compile_operator = function (_42)
  local op = _42[1]
  local args = sub(_42, 1)
  local str = "("
  local op1 = getop(op)
  local i = 0
  local _43 = args
  while (i < length(_43)) do
    local arg = _43[(i + 1)]
    if ((op1 == "-") and (length(args) == 1)) then
      str = (str .. op1 .. compile(arg))
    else
      str = (str .. compile(arg))
      if (i < (length(args) - 1)) then
        str = (str .. " " .. op1 .. " ")
      end
    end
    i = (i + 1)
  end
  return((str .. ")"))
end

compile_branch = function (condition, body, is_first, is_last, is_tail)
  local cond1 = compile(condition)
  local body1 = (function ()
    indent_level = (indent_level + 1)
    local _44 = compile(body, true, is_tail)
    indent_level = (indent_level - 1)
    return(_44)
  end)()
  local ind = indentation()
  local tr = (function ()
    if (is_last and (target == "lua")) then
      return((ind .. "end\n"))
    elseif is_last then
      return("\n")
    else
      return("")
    end
  end)()
  if (is_first and (target == "js")) then
    return((ind .. "if (" .. cond1 .. ") {\n" .. body1 .. ind .. "}" .. tr))
  elseif is_first then
    return((ind .. "if " .. cond1 .. " then\n" .. body1 .. tr))
  elseif (is_nil(condition) and (target == "js")) then
    return((" else {\n" .. body1 .. ind .. "}\n"))
  elseif is_nil(condition) then
    return((ind .. "else\n" .. body1 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. body1 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. body1 .. tr))
  end
end

compile_function = function (args, body, name)
  name = (name or "")
  local args1 = compile_args(args)
  local body1 = (function ()
    indent_level = (indent_level + 1)
    local _45 = compile_body(body, true)
    indent_level = (indent_level - 1)
    return(_45)
  end)()
  local ind = indentation()
  if (target == "js") then
    return(("function " .. name .. args1 .. " {\n" .. body1 .. ind .. "}"))
  else
    return(("function " .. name .. args1 .. "\n" .. body1 .. ind .. "end"))
  end
end

quote_form = function (form)
  if is_atom(form) then
    if is_string_literal(form) then
      local str = sub(form, 1, (length(form) - 1))
      return(("\"\\\"" .. str .. "\\\"\""))
    elseif is_string(form) then
      return(("\"" .. form .. "\""))
    else
      return(to_string(form))
    end
  else
    return((compiler("list"))(form, 0))
  end
end

terminator = function (is_stmt)
  if (not is_stmt) then
    return("")
  else
    return("\n")
  end
end

compile_special = function (form, is_stmt, is_tail)
  local name = hd(form)
  if ((not is_stmt) and is_statement(name)) then
    return(compile({{"function", {}, form}}, false, is_tail))
  else
    local tr = terminator((is_stmt and (not is_self_terminating(name))))
    return(((compiler(name))(tl(form), is_tail) .. tr))
  end
end

special = {}

is_special = function (form)
  return((is_list(form) and is_is(special[hd(form)])))
end

compiler = function (name)
  return(special[name]["compiler"])
end

is_statement = function (name)
  return(special[name]["statement"])
end

is_self_terminating = function (name)
  return(special[name]["terminated"])
end

special["do"] = {compiler = function (forms, is_tail)
  return(compile_body(forms, is_tail))
end, statement = true, terminated = true}

special["if"] = {compiler = function (form, is_tail)
  local str = ""
  local i = 0
  local _46 = form
  while (i < length(_46)) do
    local condition = _46[(i + 1)]
    local is_last = (i >= (length(form) - 2))
    local is_else = (i == (length(form) - 1))
    local is_first = (i == 0)
    local body = form[((i + 1) + 1)]
    if is_else then
      body = condition
      condition = nil
    end
    str = (str .. compile_branch(condition, body, is_first, is_last, is_tail))
    i = (i + 1)
    i = (i + 1)
  end
  return(str)
end, statement = true, terminated = true}

special["while"] = {compiler = function (form)
  local condition = compile(hd(form))
  local body = (function ()
    indent_level = (indent_level + 1)
    local _47 = compile_body(tl(form))
    indent_level = (indent_level - 1)
    return(_47)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, statement = true, terminated = true}

special["break"] = {compiler = function (form)
  return((indentation() .. "break"))
end, statement = true}

special["function"] = {compiler = function (_48)
  local args = _48[1]
  local body = sub(_48, 1)
  return(compile_function(args, body))
end}

macros = ""

special["define-macro"] = {compiler = function (_49)
  local name = _49[1]
  local args = _49[2]
  local body = sub(_49, 2)
  local macro = {"setenv", {"quote", name}, join({"fn", args}, body)}
  eval(compile_for_target("lua", macro))
  if is_embed_macros then
    macros = (macros .. compile_toplevel(macro))
  end
  return("")
end, statement = true, terminated = true}

special["return"] = {compiler = function (form)
  return((indentation() .. compile_call(join({"return"}, form))))
end, statement = true}

special["error"] = {compiler = function (_50)
  local expr = _50[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(expr)))
    else
      return(compile_call({"error", expr}))
    end
  end)()
  return((indentation() .. e))
end, statement = true}

special["local"] = {compiler = function (_51)
  local name = _51[1]
  local value = _51[2]
  local id = identifier(name)
  local keyword = (function ()
    if (target == "js") then
      return("var ")
    else
      return("local ")
    end
  end)()
  local ind = indentation()
  if is_nil(value) then
    return((ind .. keyword .. id))
  else
    return((ind .. keyword .. id .. " = " .. compile(value)))
  end
end, statement = true}

special["for"] = {compiler = function (_52)
  local _53 = _52[1]
  local t = _53[1]
  local k = _53[2]
  local v = _53[3]
  local body = sub(_52, 1)
  local t1 = compile(t)
  local ind = indentation()
  if (target == "lua") then
    local body1 = (function ()
      indent_level = (indent_level + 1)
      local _54 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_54)
    end)()
    return((ind .. "for " .. k .. ", " .. v .. " in pairs(" .. t1 .. ") do\n" .. body1 .. ind .. "end\n"))
  else
    local _55 = (function ()
      indent_level = (indent_level + 1)
      local _56 = compile_body(join({{"set", v, {"get", t, k}}}, body))
      indent_level = (indent_level - 1)
      return(_56)
    end)()
    return((ind .. "for (" .. k .. " in " .. t1 .. ") {\n" .. _55 .. ind .. "}\n"))
  end
end, statement = true, terminated = true}

special["set"] = {compiler = function (_57)
  local lh = _57[1]
  local rh = _57[2]
  if is_nil(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, statement = true}

special["get"] = {compiler = function (_58)
  local object = _58[1]
  local key = _58[2]
  local o = compile(object)
  local k = compile(key)
  if ((target == "lua") and (char(o, 0) == "{")) then
    o = ("(" .. o .. ")")
  end
  return((o .. "[" .. k .. "]"))
end}

special["not"] = {compiler = function (_59)
  local expr = _59[1]
  local e = compile(expr)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. e .. ")"))
end}

special["list"] = {compiler = function (forms, depth)
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
  local _60 = forms
  while (i < length(_60)) do
    local x = _60[(i + 1)]
    str = (str .. (function ()
      if is_quoting(depth) then
        return(quote_form(x))
      else
        return(compile(x))
      end
    end)())
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}

special["table"] = {compiler = function (forms)
  local sep = (function ()
    if (target == "lua") then
      return(" = ")
    else
      return(" : ")
    end
  end)()
  local str = "{"
  local i = 0
  while (i < (length(forms) - 1)) do
    local k = forms[(i + 1)]
    local v = compile(forms[((i + 1) + 1)])
    if (not is_string(k)) then
      error(("Illegal table key: " .. to_string(k)))
    end
    if ((target == "lua") and is_string_literal(k)) then
      k = ("[" .. k .. "]")
    end
    str = (str .. k .. sep .. v)
    if (i < (length(forms) - 2)) then
      str = (str .. ", ")
    end
    i = (i + 2)
  end
  return((str .. "}"))
end}

special["quote"] = {compiler = function (_61)
  local form = _61[1]
  return(quote_form(form))
end}

is_can_return = function (form)
  if is_special(form) then
    return((not is_statement(hd(form))))
  else
    return(true)
  end
end

compile = function (form, is_stmt, is_tail)
  local tr = terminator(is_stmt)
  local ind = (function ()
    if is_stmt then
      return(indentation())
    else
      return("")
    end
  end)()
  if (is_tail and is_can_return(form)) then
    form = {"return", form}
  end
  if is_nil(form) then
    return("")
  elseif is_atom(form) then
    return((ind .. compile_atom(form) .. tr))
  elseif is_operator(form) then
    return((ind .. compile_operator(form) .. tr))
  elseif is_special(form) then
    return(compile_special(form, is_stmt, is_tail))
  else
    return((ind .. compile_call(form) .. tr))
  end
end

compile_file = function (file)
  local form = nil
  local output = ""
  local s = make_stream(read_file(file))
  while true do
    form = read(s)
    if (form == eof) then
      break
    end
    local result = compile_toplevel(form)
    output = (output .. result)
  end
  return(output)
end

compile_files = function (files)
  local output = ""
  local _63 = 0
  local _62 = files
  while (_63 < length(_62)) do
    local file = _62[(_63 + 1)]
    output = (output .. compile_file(file))
    _63 = (_63 + 1)
  end
  return(output)
end

compile_toplevel = function (form)
  local form1 = compile(macroexpand(form), true, false, true)
  if (form1 == "") then
    return("")
  else
    return((form1 .. "\n"))
  end
end

compile_for_target = function (target1, form)
  local previous = target
  target = target1
  local result = compile_toplevel(form)
  target = previous
  return(result)
end

rep = function (str)
  local form = read_from_string(str)
  local result = eval(compile_toplevel(form))
  if is_is(result) then
    return(print((to_string(result))))
  end
end

repl = function ()
  local execute = function (str)
    rep(str)
    return(write("> "))
  end
  write("> ")
  while true do
    local str = io.stdin:read()
    if str then
      execute(str)
    else
      break
    end
  end
end

usage = function ()
  print((to_string("usage: x [options] [inputs]")))
  print((to_string("options:")))
  print((to_string("  -o <output>\tOutput file")))
  print((to_string("  -t <target>\tTarget language (default: lua)")))
  print((to_string("  -e <expr>\tExpression to evaluate")))
  print((to_string("  -m \t\tEmbed macro definitions in output")))
  return(exit())
end

main = function ()
  args = arg
  if ((hd(args) == "-h") or (hd(args) == "--help")) then
    usage()
  end
  local inputs = {}
  local output = nil
  local target1 = nil
  local expr = nil
  local i = 0
  local _64 = args
  while (i < length(_64)) do
    local arg = _64[(i + 1)]
    if ((arg == "-o") or (arg == "-t") or (arg == "-e")) then
      if (i == (length(args) - 1)) then
        print((to_string("missing argument for") .. to_string(arg)))
      else
        i = (i + 1)
        local arg2 = args[(i + 1)]
        if (arg == "-o") then
          output = arg2
        elseif (arg == "-t") then
          target1 = arg2
        elseif (arg == "-e") then
          expr = arg2
        end
      end
    elseif (arg == "-m") then
      is_embed_macros = true
    elseif ("-" ~= sub(arg, 0, 1)) then
      add(inputs, arg)
    end
    i = (i + 1)
  end
  if output then
    if target1 then
      target = target1
    end
    local compiled = compile_files(inputs)
    local main = compile({"main"}, true)
    return(write_file(output, (compiled .. macros .. main)))
  else
    local _66 = 0
    local _65 = inputs
    while (_66 < length(_65)) do
      local file = _65[(_66 + 1)]
      eval(compile_file(file))
      _66 = (_66 + 1)
    end
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end

setenv("at", function (a, i)
  if ((target == "lua") and is_number(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", a, i})
end)

setenv("let", function (bindings, ...)
  local body = unstash({...})
  local i = 0
  local renames = {}
  local locals = {}
  mapi(function (_5)
    local lh = _5[1]
    local rh = _5[2]
    local _7 = 0
    local _6 = bind(lh, rh)
    while (_7 < length(_6)) do
      local _8 = _6[(_7 + 1)]
      local id = _8[1]
      local val = _8[2]
      if is_bound(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, variable)
      end
      add(locals, {"local", id, val})
      _7 = (_7 + 1)
    end
  end, pairwise(bindings))
  return(join({"let-symbol", renames}, join(locals, body)))
end)

setenv("let-macro", function (definitions, ...)
  local body = unstash({...})
  add(environment, {})
  local is_embed = is_embed_macros
  is_embed_macros = false
  mapi(function (m)
    return((compiler("define-macro"))(m))
  end, definitions)
  is_embed_macros = is_embed
  local body1 = macroexpand(body)
  drop(environment)
  return(join({"do"}, body1))
end)

setenv("let-symbol", function (expansions, ...)
  local body = unstash({...})
  add(environment, {})
  map(function (_10)
    local name = _10[1]
    local expr = _10[2]
    return(setenv(name, expr))
  end, pairwise(expansions))
  local body1 = macroexpand(body)
  drop(environment)
  return(join({"do"}, body1))
end)

setenv("define-symbol", function (name, expansion)
  setenv(name, expansion)
  return(nil)
end)

setenv("define", function (name, x, ...)
  local body = unstash({...})
  if (not is_empty(body)) then
    x = join({"fn", x}, body)
  end
  return({"set", name, x})
end)

setenv("fn", function (args, ...)
  local body = unstash({...})
  local _12 = bind_arguments(args, body)
  local args1 = _12[1]
  local body1 = _12[2]
  return(join({"function", args1}, body1))
end)

setenv("across", function (_14, ...)
  local list = _14[1]
  local v = _14[2]
  local i = _14[3]
  local start = _14[4]
  local body = unstash({...})
  local l = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l, list}, {"while", {"<", i, {"length", l}}, join({"let", {v, {"at", l, i}}}, join(body, {{"set", i, {"+", i, 1}}}))}})
end)

setenv("set-of", function (...)
  local elements = unstash({...})
  return(join({"table"}, mapi(function (x)
    return(splice({x, true}))
  end, elements)))
end)

setenv("with-scope", function (_20, expr)
  local bound = _20[1]
  local result = make_id()
  local arg = make_id()
  return({"do", {"add", "environment", {"table"}}, {"across", {bound, arg}, {"setenv", arg, "variable"}}, {"let", {result, expr}, {"drop", "environment"}, result}})
end)

setenv("quasiquote", function (form)
  return(quasiexpand(form, 1))
end)

setenv("language", function ()
  return({"quote", target})
end)

setenv("target", function (...)
  local clauses = unstash({...})
  return(find(function (x)
    if (hd(x) == target) then
      return(x[2])
    end
  end, clauses))
end)

setenv("join*", function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end)

setenv("join!", function (a, ...)
  local bs = unstash({...})
  return({"set", a, join({"join*", a}, bs)})
end)

setenv("list*", function (...)
  local xs = unstash({...})
  if is_empty(xs) then
    return({})
  else
    local t = {}
    local i = 0
    local _32 = xs
    while (i < length(_32)) do
      local x = _32[(i + 1)]
      if (i == (length(xs) - 1)) then
        t = {"join", join({"list"}, t), x}
      else
        add(t, x)
      end
      i = (i + 1)
    end
    return(t)
  end
end)

setenv("each", function (_34, ...)
  local t = _34[1]
  local k = _34[2]
  local v = _34[3]
  local body = unstash({...})
  return({"for", {t, k, v}, {"if", {"target", {"lua", {"not", {"number?", k}}}, {"js", {"isNaN", {"parseInt", k}}}}, join({"do"}, body)}})
end)

setenv("make", function (...)
  local body = unstash({...})
  local l = join({"list"}, body)
  if (not is_keys(body)) then
    return(l)
  else
    local id = make_id()
    return(join({"let", {id, l}}, join(mapk(function (k, v)
      return({"set", {"get", id, {"quote", k}}, v})
    end, body), {id})))
  end
end)

setenv("cat!", function (a, ...)
  local bs = unstash({...})
  return({"set", a, join({"cat", a}, bs)})
end)

setenv("pr", function (...)
  local xs = unstash({...})
  return({"print", join({"cat"}, mapi(function (x)
    return({"to-string", x})
  end, xs))})
end)

setenv("define-reader", function (_39, ...)
  local char = _39[1]
  local stream = _39[2]
  local body = unstash({...})
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
end)

setenv("with-indent", function (form)
  local result = make_id()
  return({"do", {"set", "indent-level", {"+", "indent-level", 1}}, {"let", {result, form}, {"set", "indent-level", {"-", "indent-level", 1}}, result}})
end)

setenv("define-special", function (name, keys, args, ...)
  local body = unstash({...})
  return({"set", {"get", "special", {"quote", name}}, join({"table", "compiler", join({"fn", args}, body)}, mapi(function (k)
    return(splice({k, true}))
  end, keys))})
end)

main()
