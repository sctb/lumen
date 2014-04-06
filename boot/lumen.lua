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

stash = function (args)
  if is_keys(args) then
    local p = {_stash = true}
    for k, v in pairs(args) do
      if (not is_number(k)) then
        p[k] = v
      end
    end
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
      for k, v in pairs(l) do
        if (not is_number(k)) then
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
    local bs = {}
    local _16 = 0
    local _15 = args
    while (_16 < length(_15)) do
      local arg = _15[(_16 + 1)]
      if is_list(arg) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      else
        add(args1, arg)
      end
      _16 = (_16 + 1)
    end
    local r = args["rest"]
    if r then
      bs = join(bs, {r, rest()})
    end
    if is_empty(bs) then
      return({args1, body})
    else
      return({args1, {join({"let", bs}, body)}})
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
    local r = lh["rest"]
    local i = 0
    local bs = map(function (x)
      local b = bind(x, {"at", rh, i})
      i = (i + 1)
      return(splice(b))
    end, lh)
    if r then
      bs = join(bs, bind(r, {"sub", rh, i}))
    end
    return(bs)
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
      local _22 = 0
      local _21 = args
      while (_22 < length(_21)) do
        local _20 = _21[(_22 + 1)]
        setenv(_20, variable)
        _22 = (_22 + 1)
      end
      local _19 = join({name, args}, macroexpand(body))
      drop(environment)
      return(_19)
    else
      return(map(macroexpand, form))
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
    return(map(function (x)
      return(quasiexpand(x, depth))
    end, form))
  end
end

quasiquote_list = function (form, depth)
  local xs = {{"list"}}
  local _24 = 0
  local _23 = form
  while (_24 < length(_23)) do
    local x = _23[(_24 + 1)]
    if (is_list(x) and is_can_unquote(depth) and (hd(x) == "unquote-splicing")) then
      add(xs, quasiexpand(x[2]))
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _24 = (_24 + 1)
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
    for k, v in pairs(x) do
      if (not is_number(k)) then
        l[k] = v
      end
    end
    return(l)
  end
end

hd = function (l)
  return(l[1])
end

tl = function (l)
  return(sub(l, 1))
end

add = function (l, x)
  return(table.insert(l, x))
end

drop = function (l)
  return(table.remove(l))
end

shift = function (l)
  return(table.remove(l, 1))
end

last = function (l)
  return(l[((length(l) - 1) + 1)])
end

join = function (l1, l2)
  if is_nil(l1) then
    return(l2)
  elseif is_nil(l2) then
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
    for k, v in pairs(l1) do
      if (not is_number(k)) then
        l[k] = v
      end
    end
    for k, v in pairs(l2) do
      if (not is_number(k)) then
        l[k] = v
      end
    end
    return(l)
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

keep = function (f, l)
  local l1 = {}
  local _26 = 0
  local _25 = l
  while (_26 < length(_25)) do
    local x = _25[(_26 + 1)]
    if f(x) then
      add(l1, x)
    end
    _26 = (_26 + 1)
  end
  return(l1)
end

find = function (f, l)
  local _28 = 0
  local _27 = l
  while (_28 < length(_27)) do
    local x = _27[(_28 + 1)]
    local x1 = f(x)
    if x1 then
      return(x1)
    end
    _28 = (_28 + 1)
  end
end

pairwise = function (l)
  local i = 0
  local l1 = {}
  while (i < length(l)) do
    add(l1, {l[(i + 1)], l[((i + 1) + 1)]})
    i = (i + 2)
  end
  return(l1)
end

iterate = function (f, count)
  local i = 0
  while (i < count) do
    f(i)
    i = (i + 1)
  end
end

splice = function (x)
  return({_splice = x})
end

is_splice = function (x)
  if is_table(x) then
    return(x["_splice"])
  end
end

map = function (f, l)
  local l1 = {}
  local _34 = 0
  local _33 = l
  while (_34 < length(_33)) do
    local x = _33[(_34 + 1)]
    local x1 = f(x)
    local s = is_splice(x1)
    if is_list(s) then
      l1 = join(l1, s)
    elseif is_is(s) then
      add(l1, s)
    elseif is_is(x1) then
      add(l1, x1)
    end
    _34 = (_34 + 1)
  end
  return(l1)
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
    local x1 = sub(x)
    for k, v in pairs(x) do
      if (not is_number(k)) then
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _35 = x1
    while (i < length(_35)) do
      local y = _35[(i + 1)]
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
  local _38 = forms
  while (i < length(_38)) do
    local x = _38[(i + 1)]
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
  local _39 = forms
  while (i < length(_39)) do
    local x = _39[(i + 1)]
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

compile_operator = function (_40)
  local op = _40[1]
  local args = sub(_40, 1)
  local str = "("
  local op1 = getop(op)
  local i = 0
  local _41 = args
  while (i < length(_41)) do
    local arg = _41[(i + 1)]
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
    local _42 = compile(body, true, is_tail)
    indent_level = (indent_level - 1)
    return(_42)
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
    local _43 = compile_body(body, true)
    indent_level = (indent_level - 1)
    return(_43)
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
  elseif (target == "js") then
    return(";\n")
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
  local _44 = form
  while (i < length(_44)) do
    local condition = _44[(i + 1)]
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
    local _45 = compile_body(tl(form))
    indent_level = (indent_level - 1)
    return(_45)
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

special["function"] = {compiler = function (_46)
  local args = _46[1]
  local body = sub(_46, 1)
  return(compile_function(args, body))
end}

macros = ""

special["define-macro"] = {compiler = function (_47)
  local name = _47[1]
  local args = _47[2]
  local body = sub(_47, 2)
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

special["error"] = {compiler = function (_48)
  local expr = _48[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(expr)))
    else
      return(compile_call({"error", expr}))
    end
  end)()
  return((indentation() .. e))
end, statement = true}

special["local"] = {compiler = function (_49)
  local name = _49[1]
  local value = _49[2]
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

special["for"] = {compiler = function (_50)
  local _51 = _50[1]
  local t = _51[1]
  local k = _51[2]
  local v = _51[3]
  local body = sub(_50, 1)
  local t1 = compile(t)
  local ind = indentation()
  if (target == "lua") then
    local body1 = (function ()
      indent_level = (indent_level + 1)
      local _52 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_52)
    end)()
    return((ind .. "for " .. k .. ", " .. v .. " in pairs(" .. t1 .. ") do\n" .. body1 .. ind .. "end\n"))
  else
    local _53 = (function ()
      indent_level = (indent_level + 1)
      local _54 = compile_body(join({{"set", v, {"get", t, k}}}, body))
      indent_level = (indent_level - 1)
      return(_54)
    end)()
    return((ind .. "for (" .. k .. " in " .. t1 .. ") {\n" .. _53 .. ind .. "}\n"))
  end
end, statement = true, terminated = true}

special["set"] = {compiler = function (_55)
  local lh = _55[1]
  local rh = _55[2]
  if is_nil(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, statement = true}

special["get"] = {compiler = function (_56)
  local object = _56[1]
  local key = _56[2]
  local o = compile(object)
  local k = compile(key)
  if ((target == "lua") and (char(o, 0) == "{")) then
    o = ("(" .. o .. ")")
  end
  return((o .. "[" .. k .. "]"))
end}

special["not"] = {compiler = function (_57)
  local expr = _57[1]
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
  local _58 = forms
  while (i < length(_58)) do
    local x = _58[(i + 1)]
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

special["quote"] = {compiler = function (_59)
  local form = _59[1]
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
  local _61 = 0
  local _60 = files
  while (_61 < length(_60)) do
    local file = _60[(_61 + 1)]
    output = (output .. compile_file(file))
    _61 = (_61 + 1)
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
  local _62 = args
  while (i < length(_62)) do
    local arg = _62[(i + 1)]
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
    local _64 = 0
    local _63 = inputs
    while (_64 < length(_63)) do
      local file = _63[(_64 + 1)]
      eval(compile_file(file))
      _64 = (_64 + 1)
    end
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end

setenv("at", function (l, i)
  if ((target == "lua") and is_number(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end)

setenv("let", function (bindings, ...)
  local body = unstash({...})
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_5)
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
  map(function (m)
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
  local l = _14[1]
  local v = _14[2]
  local i = _14[3]
  local start = _14[4]
  local body = unstash({...})
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(body, {{"set", i, {"+", i, 1}}}))}})
end)

setenv("set-of", function (...)
  local elements = unstash({...})
  return(join({"table"}, map(function (x)
    return(splice({x, true}))
  end, elements)))
end)

setenv("with-scope", function (_18, expr)
  local bound = _18[1]
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
    local l = {}
    local i = 0
    local _30 = xs
    while (i < length(_30)) do
      local x = _30[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end)

setenv("each", function (_32, ...)
  local t = _32[1]
  local k = _32[2]
  local v = _32[3]
  local body = unstash({...})
  return({"for", {t, k, v}, {"if", {"target", {"lua", {"not", {"number?", k}}}, {"js", {"isNaN", {"parseInt", k}}}}, join({"do"}, body)}})
end)

setenv("cat!", function (a, ...)
  local bs = unstash({...})
  return({"set", a, join({"cat", a}, bs)})
end)

setenv("pr", function (...)
  local xs = unstash({...})
  return({"print", join({"cat"}, map(function (x)
    return({"to-string", x})
  end, xs))})
end)

setenv("define-reader", function (_37, ...)
  local char = _37[1]
  local stream = _37[2]
  local body = unstash({...})
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
end)

setenv("with-indent", function (form)
  local result = make_id()
  return({"do", {"set", "indent-level", {"+", "indent-level", 1}}, {"let", {result, form}, {"set", "indent-level", {"-", "indent-level", 1}}, result}})
end)

setenv("define-special", function (name, keys, args, ...)
  local body = unstash({...})
  return({"set", {"get", "special", {"quote", name}}, join({"table", "compiler", join({"fn", args}, body)}, map(function (k)
    return(splice({k, true}))
  end, keys))})
end)

main()
