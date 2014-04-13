environment = {{}}

setenv = function (k, v)
  last(environment)[k] = v
end

getenv = function (k)
  if string63(k) then
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

symbol_macro63 = function (k)
  local v = getenv(k)
  return((is63(v) and (not (v == variable)) and (not macro63(k))))
end

macro63 = function (k)
  return(function63(getenv(k)))
end

variable63 = function (k)
  return((last(environment)[k] == variable))
end

bound63 = function (x)
  return((symbol_macro63(x) or macro63(x) or variable63(x)))
end

embed_macros63 = false

quoted = function (form)
  if atom63(form) then
    if string_literal63(form) then
      local str = sub(form, 1, (length(form) - 1))
      return(("\"\\\"" .. str .. "\\\"\""))
    elseif string63(form) then
      return(("\"" .. form .. "\""))
    else
      return(form)
    end
  else
    return(join({"list"}, map42(quoted, form)))
  end
end

stash = function (args)
  if keys63(args) then
    local p = {["_stash"] = true}
    for k, v in pairs(args) do
      if (not number63(k)) then
        p[k] = v
      end
    end
    return(join(args, {p}))
  else
    return(args)
  end
end

unstash = function (args)
  if empty63(args) then
    return({})
  else
    local l = last(args)
    if (composite63(l) and l["_stash"]) then
      local args1 = sub(args, 0, (length(args) - 1))
      for k, v in pairs(l) do
        if (not number63(k)) then
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
  if atom63(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bs = {}
    local _16 = 0
    local _15 = args
    while (_16 < length(_15)) do
      local arg = _15[(_16 + 1)]
      if list63(arg) then
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
    if empty63(bs) then
      return({args1, body})
    else
      return({args1, {join({"let", bs}, body)}})
    end
  end
end

bind = function (lh, rh)
  if (list63(lh) and list63(rh)) then
    local id = make_id()
    return(join({{id, rh}}, bind(lh, id)))
  elseif atom63(lh) then
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

quoting63 = function (depth)
  return(number63(depth))
end

quasiquoting63 = function (depth)
  return((quoting63(depth) and (depth > 0)))
end

can_unquote63 = function (depth)
  return((quoting63(depth) and (depth == 1)))
end

macroexpand = function (form)
  if symbol_macro63(form) then
    return(macroexpand(getenv(form)))
  elseif atom63(form) then
    return(form)
  else
    local name = hd(form)
    if (name == "define-macro") then
      return(form)
    elseif macro63(name) then
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
      return(map42(macroexpand, form))
    end
  end
end

quasiexpand = function (form, depth)
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
    return({"quote", form[2]})
  elseif (hd(form) == "quasiquote") then
    return(quasiexpand(form[2], 1))
  else
    return(map42(function (x)
      return(quasiexpand(x, depth))
    end, form))
  end
end

quasiquote_list = function (form, depth)
  local xs = {{"list"}}
  local splice63 = function (x)
    return((list63(x) and can_unquote63(depth) and (hd(x) == "unquote-splicing")))
  end
  for k, v in pairs(form) do
    if (not number63(k)) then
      local v1 = (function ()
        if splice63(v) then
          return(quasiexpand(v[2]))
        else
          return(quasiexpand(v, depth))
        end
      end)()
      last(xs)[k] = v1
    end
  end
  local _24 = 0
  local _23 = form
  while (_24 < length(_23)) do
    local x = _23[(_24 + 1)]
    if splice63(x) then
      local x1 = quasiexpand(x[2])
      add(xs, x1)
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
      return(((length(x) > 1) or (not (hd(x) == "list")) or keys63(x)))
    end, xs)))
  end
end

target = "lua"

length = function (x)
  return(#x)
end

empty63 = function (x)
  return((length(x) == 0))
end

sub = function (x, from, upto)
  from = (from or 0)
  if string63(x) then
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
      if (not number63(k)) then
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
    for k, v in pairs(l1) do
      if (not number63(k)) then
        l[k] = v
      end
    end
    for k, v in pairs(l2) do
      if (not number63(k)) then
        l[k] = v
      end
    end
    return(l)
  end
end

reduce = function (f, x)
  if empty63(x) then
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
  return({["_splice"] = x})
end

splice63 = function (x)
  if table63(x) then
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
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _34 = (_34 + 1)
  end
  return(l1)
end

map42 = function (f, t)
  local l = map(f, t)
  for k, v in pairs(t) do
    if (not number63(k)) then
      l[k] = f(v)
    end
  end
  return(l)
end

keys63 = function (t)
  local k63 = false
  for k, v in pairs(t) do
    if (not number63(k)) then
      k63 = true
      break
    end
  end
  return(k63)
end

char = function (str, n)
  return(sub(str, n, (n + 1)))
end

code = function (str, n)
  return(string.byte(str, (function ()
    if n then
      return((n + 1))
    end
  end)()))
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

nil63 = function (x)
  return((x == nil))
end

is63 = function (x)
  return((not nil63(x)))
end

string63 = function (x)
  return((type(x) == "string"))
end

string_literal63 = function (x)
  return((string63(x) and (char(x, 0) == "\"")))
end

number63 = function (x)
  return((type(x) == "number"))
end

boolean63 = function (x)
  return((type(x) == "boolean"))
end

function63 = function (x)
  return((type(x) == "function"))
end

composite63 = function (x)
  return((type(x) == "table"))
end

atom63 = function (x)
  return((not composite63(x)))
end

table63 = function (x)
  return((composite63(x) and nil63(hd(x))))
end

list63 = function (x)
  return((composite63(x) and is63(hd(x))))
end

parse_number = function (str)
  return(tonumber(str))
end

to_string = function (x)
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
    for k, v in pairs(x) do
      if (not number63(k)) then
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
  return({["len"] = length(str), ["string"] = str, ["pos"] = 0})
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

key63 = function (atom)
  return((string63(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
end

key = function (str)
  if string_literal63(str) then
    return(sub(str, 1, (length(str) - 1)))
  else
    return(str)
  end
end

flag63 = function (atom)
  return((string63(atom) and (length(atom) > 1) and (char(atom, 0) == ":")))
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
  if is63(n) then
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
      if key63(x) then
        local k = sub(x, 0, (length(x) - 1))
        local v = read(s)
        l[key(k)] = v
      elseif flag63(x) then
        l[key(sub(x, 1))] = true
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
  local colon = ""
  while true do
    local c = peek_char(s)
    if (c and (not (c == "\""))) then
      if (c == "\\") then
        str = (str .. read_char(s))
      end
      str = (str .. read_char(s))
    elseif c then
      read_char(s)
      if (peek_char(s) == ":") then
        colon = read_char(s)
      end
      break
    else
      error(("Expected \" at " .. s.pos))
    end
  end
  return((str .. "\"" .. colon))
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
  if is63(c) then
    return(((read_table[c] or read_table[""]))(s))
  else
    return(eof)
  end
end

read_from_string = function (str)
  return(read(make_stream(str)))
end

operators = {["js"] = {["cat"] = "+", ["and"] = "&&", ["="] = "===", ["~="] = "!=", ["or"] = "||"}, ["lua"] = {["cat"] = "..", ["and"] = true, ["="] = "==", ["~="] = true, ["or"] = true}, ["common"] = {["<="] = true, ["*"] = true, ["%"] = true, ["/"] = true, ["+"] = true, ["-"] = true, [">"] = true, [">="] = true, ["<"] = true}}

getop = function (op)
  local op1 = (operators["common"][op] or operators[target][op])
  if (op1 == true) then
    return(op)
  else
    return(op1)
  end
end

operator63 = function (form)
  return((list63(form) and is63(getop(hd(form)))))
end

indent_level = 0

indentation = function ()
  local str = ""
  iterate(function ()
    str = (str .. "  ")
  end, indent_level)
  return(str)
end

compile_args = function (forms, compile63)
  local str = "("
  local i = 0
  local _38 = forms
  while (i < length(_38)) do
    local x = _38[(i + 1)]
    str = (str .. (function ()
      if compile63 then
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

compile_body = function (forms, tail63)
  local str = ""
  local i = 0
  local _39 = forms
  while (i < length(_39)) do
    local x = _39[(i + 1)]
    local t63 = (tail63 and (i == (length(forms) - 1)))
    str = (str .. compile(x, true, t63))
    i = (i + 1)
  end
  return(str)
end

numeric63 = function (n)
  return(((n > 47) and (n < 58)))
end

valid_char63 = function (n)
  return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 173)) or (n == 95)))
end

valid_id63 = function (id)
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

identifier = function (id)
  local id1 = ""
  local i = 0
  while (i < length(id)) do
    local c = char(id, i)
    local n = code(c)
    local c1 = (function ()
      if (c == "-") then
        return("_")
      elseif (c == ".") then
        return(".")
      elseif (c == "#") then
        return("#")
      elseif (c == ":") then
        return(":")
      elseif (c == ",") then
        return(",")
      elseif valid_char63(n) then
        return(c)
      else
        return(n)
      end
    end)()
    id1 = (id1 .. c1)
    i = (i + 1)
  end
  return(id1)
end

compile_atom = function (form)
  if (form == "nil") then
    if (target == "js") then
      return("undefined")
    else
      return("nil")
    end
  elseif (string63(form) and (not string_literal63(form))) then
    return(identifier(form))
  else
    return(to_string(form))
  end
end

compile_call = function (form)
  if empty63(form) then
    return((compiler("array"))(form))
  else
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(tl(form), true)
    if list63(f) then
      return(("(" .. f1 .. ")" .. args))
    elseif string63(f) then
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

compile_branch = function (condition, body, first63, last63, tail63)
  local cond1 = compile(condition)
  local body1 = (function ()
    indent_level = (indent_level + 1)
    local _42 = compile(body, true, tail63)
    indent_level = (indent_level - 1)
    return(_42)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. body1 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. body1 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. body1 .. ind .. "}\n"))
  elseif nil63(condition) then
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

terminator = function (stmt63)
  if (not stmt63) then
    return("")
  elseif (target == "js") then
    return(";\n")
  else
    return("\n")
  end
end

compile_special = function (form, stmt63, tail63)
  local name = hd(form)
  if ((not stmt63) and statement63(name)) then
    return(compile({{"function", {}, form}}, false, tail63))
  else
    local tr = terminator((stmt63 and (not self_terminating63(name))))
    return(((compiler(name))(tl(form), tail63) .. tr))
  end
end

special = {}

special63 = function (form)
  return((list63(form) and is63(special[hd(form)])))
end

compiler = function (name)
  return(special[name]["compiler"])
end

statement63 = function (name)
  return(special[name]["statement"])
end

self_terminating63 = function (name)
  return(special[name]["terminated"])
end

special["do"] = {["compiler"] = function (forms, tail63)
  return(compile_body(forms, tail63))
end, ["statement"] = true, ["terminated"] = true}

special["if"] = {["compiler"] = function (form, tail63)
  local str = ""
  local i = 0
  local _44 = form
  while (i < length(_44)) do
    local condition = _44[(i + 1)]
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
end, ["statement"] = true, ["terminated"] = true}

special["while"] = {["compiler"] = function (form)
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
end, ["statement"] = true, ["terminated"] = true}

special["break"] = {["compiler"] = function (form)
  return((indentation() .. "break"))
end, ["statement"] = true}

special["function"] = {["compiler"] = function (_46)
  local args = _46[1]
  local body = sub(_46, 1)
  return(compile_function(args, body))
end}

macros = ""

special["define-macro"] = {["compiler"] = function (_47)
  local name = _47[1]
  local args = _47[2]
  local body = sub(_47, 2)
  local macro = {"setenv", {"quote", name}, join({"fn", args}, body)}
  eval(compile_for_target("lua", macro))
  if embed_macros63 then
    macros = (macros .. compile_toplevel(macro))
  end
  return("")
end, ["statement"] = true, ["terminated"] = true}

special["return"] = {["compiler"] = function (form)
  return((indentation() .. compile_call(join({"return"}, form))))
end, ["statement"] = true}

special["error"] = {["compiler"] = function (_48)
  local expr = _48[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(expr)))
    else
      return(compile_call({"error", expr}))
    end
  end)()
  return((indentation() .. e))
end, ["statement"] = true}

special["local"] = {["compiler"] = function (_49)
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
  if nil63(value) then
    return((ind .. keyword .. id))
  else
    return((ind .. keyword .. id .. " = " .. compile(value)))
  end
end, ["statement"] = true}

special["for"] = {["compiler"] = function (_50)
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
end, ["statement"] = true, ["terminated"] = true}

special["set"] = {["compiler"] = function (_55)
  local lh = _55[1]
  local rh = _55[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, ["statement"] = true}

special["get"] = {["compiler"] = function (_56)
  local object = _56[1]
  local key = _56[2]
  local o = compile(object)
  local k = compile(key)
  if ((target == "lua") and (char(o, 0) == "{")) then
    o = ("(" .. o .. ")")
  end
  return((o .. "[" .. k .. "]"))
end}

special["not"] = {["compiler"] = function (_57)
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

special["array"] = {["compiler"] = function (forms)
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
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end}

special["object"] = {["compiler"] = function (forms)
  local str = "{"
  local i = 0
  local sep = (function ()
    if (target == "lua") then
      return(" = ")
    else
      return(": ")
    end
  end)()
  while (i < (length(forms) - 1)) do
    local k = forms[(i + 1)]
    local v = compile(forms[((i + 1) + 1)])
    if (not string63(k)) then
      error(("Illegal object key: " .. to_string(k)))
    end
    if (target == "lua") then
      local k1 = (function ()
        if string_literal63(k) then
          return(k)
        else
          return(quoted(k))
        end
      end)()
      k = ("[" .. k1 .. "]")
    elseif ((not valid_id63(k)) and (not string_literal63(k))) then
      k = quoted(k)
    end
    str = (str .. k .. sep .. v)
    if (i < (length(forms) - 2)) then
      str = (str .. ", ")
    end
    i = (i + 2)
  end
  return((str .. "}"))
end}

can_return63 = function (form)
  if special63(form) then
    return((not statement63(hd(form))))
  else
    return(true)
  end
end

compile = function (form, stmt63, tail63)
  local tr = terminator(stmt63)
  local ind = (function ()
    if stmt63 then
      return(indentation())
    else
      return("")
    end
  end)()
  if (tail63 and can_return63(form)) then
    form = {"return", form}
  end
  if nil63(form) then
    return("")
  elseif atom63(form) then
    return((ind .. compile_atom(form) .. tr))
  elseif operator63(form) then
    return((ind .. compile_operator(form) .. tr))
  elseif special63(form) then
    return(compile_special(form, stmt63, tail63))
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
  local _60 = 0
  local _59 = files
  while (_60 < length(_59)) do
    local file = _59[(_60 + 1)]
    output = (output .. compile_file(file))
    _60 = (_60 + 1)
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
  if is63(result) then
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
  local _61 = args
  while (i < length(_61)) do
    local arg = _61[(i + 1)]
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
      embed_macros63 = true
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
    local _63 = 0
    local _62 = inputs
    while (_63 < length(_62)) do
      local file = _62[(_63 + 1)]
      eval(compile_file(file))
      _63 = (_63 + 1)
    end
    if expr then
      return(rep(expr))
    else
      return(repl())
    end
  end
end

setenv("at", function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end)

setenv("quote", function (form)
  return(quoted(form))
end)

setenv("list", function (...)
  local body = unstash({...})
  local l = join({"array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    for k, v in pairs(body) do
      if (not number63(k)) then
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end)

setenv("table", function (...)
  local body = unstash({...})
  local l = {}
  for k, v in pairs(body) do
    if (not number63(k)) then
      add(l, k)
      add(l, v)
    end
  end
  return(join({"object"}, l))
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
      if bound63(id) then
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
  local embed63 = embed_macros63
  embed_macros63 = false
  map(function (m)
    return((compiler("define-macro"))(m))
  end, definitions)
  embed_macros63 = embed63
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
  if (not empty63(body)) then
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
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(body, {{"inc", i}}))}})
end)

setenv("set-of", function (...)
  local elements = unstash({...})
  return(join({"object"}, map(function (x)
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
  if empty63(xs) then
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

setenv("inc", function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end)

setenv("dec", function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
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
  return({"set", {"get", "special", {"quote", name}}, join({"object", "compiler", join({"fn", args}, body)}, map(function (k)
    return(splice({k, true}))
  end, keys))})
end)

main()
