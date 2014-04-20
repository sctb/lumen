environment = {{}}

setenv = function (k, v)
  last(environment)[k] = v
end

getenv = function (k)
  if string63(k) then
    return(find(function (e)
      return(e[k])
    end, reverse(environment)))
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
      return(("\"\\\"" .. inner(form) .. "\\\"\""))
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
    local k = nil
    local _19 = args
    for k in next, _19 do
      if (not number63(k)) then
        local v = _19[k]
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
    if (composite63(l) and l._stash) then
      local args1 = sub(args, 0, (length(args) - 1))
      local k = nil
      local _20 = l
      for k in next, _20 do
        if (not number63(k)) then
          local v = _20[k]
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
      add(args1, "|...|")
      return({"unstash", {"list", "|...|"}})
    end
  end
  if atom63(args) then
    return({args1, {join({"let", {args, rest()}}, body)}})
  else
    local bs = {}
    local _22 = 0
    local _21 = args
    while (_22 < length(_21)) do
      local arg = _21[(_22 + 1)]
      if list63(arg) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      else
        add(args1, arg)
      end
      _22 = (_22 + 1)
    end
    local r = args.rest
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
    local bs = {}
    local i = 0
    local _23 = lh
    while (i < length(_23)) do
      local x = _23[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if lh.rest then
      bs = join(bs, bind(lh.rest, {"sub", rh, length(lh)}))
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

quasisplice63 = function (x, depth)
  return((list63(x) and can_unquote63(depth) and (hd(x) == "unquote-splicing")))
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
    elseif (name == "function") then
      local _26 = form[1]
      local args = form[2]
      local body = sub(form, 2)
      add(environment, {})
      local _30 = 0
      local _29 = args
      while (_30 < length(_29)) do
        local _28 = _29[(_30 + 1)]
        setenv(_28, variable)
        _30 = (_30 + 1)
      end
      local _27 = join({name, args}, macroexpand(body))
      drop(environment)
      return(_27)
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
    return(form)
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
  local k = nil
  local _31 = form
  for k in next, _31 do
    if (not number63(k)) then
      local v = _31[k]
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
  local _33 = 0
  local _32 = form
  while (_33 < length(_32)) do
    local x = _32[(_33 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _33 = (_33 + 1)
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
  local _34 = (from or 0)
  if string63(x) then
    return((string.sub)(x, (_34 + 1), upto))
  else
    local l = (function ()
      local i = _34
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
    local _35 = x
    for k in next, _35 do
      if (not number63(k)) then
        local v = _35[k]
        l[k] = v
      end
    end
    return(l)
  end
end

inner = function (x)
  return(sub(x, 1, (length(x) - 1)))
end

hd = function (l)
  return(l[1])
end

tl = function (l)
  return(sub(l, 1))
end

add = function (l, x)
  return((table.insert)(l, x))
end

drop = function (l)
  return((table.remove)(l))
end

last = function (l)
  return(l[((length(l) - 1) + 1)])
end

reverse = function (l)
  local l1 = {}
  local i = (length(l) - 1)
  while (i >= 0) do
    add(l1, l[(i + 1)])
    i = (i - 1)
  end
  return(l1)
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
    local k = nil
    local _36 = l1
    for k in next, _36 do
      if (not number63(k)) then
        local v = _36[k]
        l[k] = v
      end
    end
    local _38 = nil
    local _37 = l2
    for _38 in next, _37 do
      if (not number63(_38)) then
        local v = _37[_38]
        l[_38] = v
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
  local _40 = 0
  local _39 = l
  while (_40 < length(_39)) do
    local x = _39[(_40 + 1)]
    if f(x) then
      add(l1, x)
    end
    _40 = (_40 + 1)
  end
  return(l1)
end

find = function (f, l)
  local _42 = 0
  local _41 = l
  while (_42 < length(_41)) do
    local x = _41[(_42 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _42 = (_42 + 1)
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
    return(x._splice)
  end
end

map = function (f, l)
  local l1 = {}
  local _50 = 0
  local _49 = l
  while (_50 < length(_49)) do
    local x = _49[(_50 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _50 = (_50 + 1)
  end
  return(l1)
end

map42 = function (f, t)
  local l = map(f, t)
  local k = nil
  local _51 = t
  for k in next, _51 do
    if (not number63(k)) then
      local v = _51[k]
      l[k] = f(v)
    end
  end
  return(l)
end

keys63 = function (t)
  local k63 = false
  local k = nil
  local _52 = t
  for k in next, _52 do
    if (not number63(k)) then
      local v = _52[k]
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
  return((string.byte)(str, (function ()
    if n then
      return((n + 1))
    end
  end)()))
end

search = function (str, pattern, start)
  local _53 = (function ()
    if start then
      return((start + 1))
    end
  end)()
  local i = (string.find)(str, pattern, start, true)
  return((i and (i - 1)))
end

split = function (str, sep)
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

read_file = function (path)
  local f = (io.open)(path)
  return((f.read)(f, "*a"))
end

write_file = function (path, data)
  local f = (io.open)(path, "w")
  return((f.write)(f, data))
end

write = function (x)
  return((io.write)(x))
end

exit = function (code)
  return((os.exit)(code))
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

id_literal63 = function (x)
  return((string63(x) and (char(x, 0) == "|")))
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
    local k = nil
    local _54 = x
    for k in next, _54 do
      if (not number63(k)) then
        local v = _54[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _55 = x1
    while (i < length(_55)) do
      local y = _55[(i + 1)]
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
  local _56 = stash(args)
  return(f(unpack(_56)))
end

id_count = 0

make_id = function (prefix)
  id_count = (id_count + 1)
  return(("_" .. (prefix or "") .. id_count))
end

eval_result = nil

eval = function (x)
  local f = load((compile("eval-result") .. "=" .. x))
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
  return({["pos"] = 0, ["string"] = str, ["len"] = length(str)})
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

flag63 = function (atom)
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

infix = {["common"] = {["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true}, ["js"] = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", ["cat"] = "+"}, ["lua"] = {["="] = "==", ["cat"] = "..", ["~="] = true, ["and"] = true, ["or"] = true}}

getop = function (op)
  local op1 = (infix.common[op] or infix[target][op])
  if (op1 == true) then
    return(op)
  else
    return(op1)
  end
end

infix63 = function (form)
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

compile_args = function (args)
  local str = "("
  local i = 0
  local _59 = args
  while (i < length(_59)) do
    local arg = _59[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end

compile_body = function (forms, tail63)
  local str = ""
  local i = 0
  local _60 = forms
  while (i < length(_60)) do
    local x = _60[(i + 1)]
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
  return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
end

valid_id63 = function (id)
  if empty63(id) then
    return(false)
  elseif special[id] then
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

compile_id = function (id)
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
      else
        return(n)
      end
    end)()
    id1 = (id1 .. c1)
    i = (i + 1)
  end
  return(id1)
end

compile_atom = function (x)
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
    error("Unrecongnized atom")
  end
end

compile_call = function (form)
  if empty63(form) then
    return((compiler("array"))(form))
  else
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(tl(form))
    if list63(f) then
      return(("(" .. f1 .. ")" .. args))
    elseif string63(f) then
      return((f1 .. args))
    else
      error("Invalid function call")
    end
  end
end

compile_infix = function (_61)
  local op = _61[1]
  local args = sub(_61, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _62 = args
  while (i < length(_62)) do
    local arg = _62[(i + 1)]
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

compile_branch = function (condition, body, first63, last63, tail63)
  local cond1 = compile(condition)
  local _63 = (function ()
    indent_level = (indent_level + 1)
    local _64 = compile(body, true, tail63)
    indent_level = (indent_level - 1)
    return(_64)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. _63 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _63 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _63 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _63 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _63 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _63 .. tr))
  end
end

compile_function = function (args, body, name)
  local _65 = (name or "")
  local _66 = compile_args(args)
  local _67 = (function ()
    indent_level = (indent_level + 1)
    local _68 = compile_body(body, true)
    indent_level = (indent_level - 1)
    return(_68)
  end)()
  local ind = indentation()
  if (target == "js") then
    return(("function " .. _65 .. _66 .. " {\n" .. _67 .. ind .. "}"))
  else
    return(("function " .. _65 .. _66 .. "\n" .. _67 .. ind .. "end"))
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
    local tr = terminator((stmt63 and (not self_tr63(name))))
    return(((compiler(name))(tl(form), tail63) .. tr))
  end
end

special = {}

special63 = function (form)
  return((list63(form) and is63(special[hd(form)])))
end

compiler = function (name)
  return(special[name].compiler)
end

statement63 = function (name)
  return(special[name].stmt)
end

self_tr63 = function (name)
  return(special[name].tr)
end

special["do"] = {["compiler"] = function (forms, tail63)
  return(compile_body(forms, tail63))
end, ["stmt"] = true, ["tr"] = true}

special["if"] = {["compiler"] = function (form, tail63)
  local str = ""
  local i = 0
  local _71 = form
  while (i < length(_71)) do
    local condition = _71[(i + 1)]
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
end, ["stmt"] = true, ["tr"] = true}

special["while"] = {["compiler"] = function (form)
  local condition = compile(hd(form))
  local body = (function ()
    indent_level = (indent_level + 1)
    local _72 = compile_body(tl(form))
    indent_level = (indent_level - 1)
    return(_72)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, ["stmt"] = true, ["tr"] = true}

special["for"] = {["compiler"] = function (_73)
  local _74 = _73[1]
  local t = _74[1]
  local k = _74[2]
  local body = sub(_73, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _75 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_75)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, ["stmt"] = true, ["tr"] = true}

special["break"] = {["compiler"] = function (_76)
  return((indentation() .. "break"))
end, ["stmt"] = true}

special["function"] = {["compiler"] = function (_77)
  local args = _77[1]
  local body = sub(_77, 1)
  return(compile_function(args, body))
end}

macros = ""

special["define-macro"] = {["compiler"] = function (_78)
  local name = _78[1]
  local args = _78[2]
  local body = sub(_78, 2)
  local macro = {"setenv", {"quote", name}, join({"fn", args}, body)}
  eval(compile_for_target("lua", macro))
  if embed_macros63 then
    macros = (macros .. compile_toplevel(macro))
  end
  return("")
end, ["stmt"] = true, ["tr"] = true}

special["return"] = {["compiler"] = function (_79)
  local x = _79[1]
  return((indentation() .. compile_call({"return", x})))
end, ["stmt"] = true}

special["error"] = {["compiler"] = function (_80)
  local x = _80[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, ["stmt"] = true}

special["local"] = {["compiler"] = function (_81)
  local name = _81[1]
  local value = _81[2]
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
end, ["stmt"] = true}

special["set"] = {["compiler"] = function (_82)
  local lh = _82[1]
  local rh = _82[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, ["stmt"] = true}

special["get"] = {["compiler"] = function (_83)
  local t = _83[1]
  local k = _83[2]
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

special["not"] = {["compiler"] = function (_84)
  local x = _84[1]
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
  local _85 = forms
  while (i < length(_85)) do
    local x = _85[(i + 1)]
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
  local sep = (function ()
    if (target == "lua") then
      return(" = ")
    else
      return(": ")
    end
  end)()
  local pairs = pairwise(forms)
  local i = 0
  local _86 = pairs
  while (i < length(_86)) do
    local _87 = _86[(i + 1)]
    local k = _87[1]
    local v = _87[2]
    if (not string63(k)) then
      error(("Illegal object key: " .. to_string(k)))
    end
    local v = compile(v)
    local k = (function ()
      if string_literal63(k) then
        return(k)
      elseif ((target == "js") and valid_id63(k)) then
        return(k)
      else
        return(quoted(k))
      end
    end)()
    if (target == "lua") then
      k = ("[" .. k .. "]")
    end
    str = (str .. k .. sep .. v)
    if (i < (length(pairs) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. "}"))
end}

can_return63 = function (form)
  return(((not special63(form)) or (not statement63(hd(form)))))
end

compile = function (form, stmt63, tail63)
  if (tail63 and can_return63(form)) then
    form = {"return", form}
  end
  if nil63(form) then
    return("")
  elseif special63(form) then
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
    local _88 = (function ()
      if atom63(form) then
        return(compile_atom(form))
      elseif infix63(form) then
        return(compile_infix(form))
      else
        return(compile_call(form))
      end
    end)()
    return((ind .. _88 .. tr))
  end
end

compile_file = function (file)
  local str = ""
  local s = make_stream(read_file(file))
  while true do
    local form = read(s)
    if (form == eof) then
      break
    end
    str = (str .. compile_toplevel(form))
  end
  return(str)
end

compile_files = function (files)
  local str = ""
  local _90 = 0
  local _89 = files
  while (_90 < length(_89)) do
    local file = _89[(_90 + 1)]
    str = (str .. compile_file(file))
    _90 = (_90 + 1)
  end
  return(str)
end

compile_toplevel = function (form)
  local _91 = compile(macroexpand(form), true, false, true)
  if (_91 == "") then
    return("")
  else
    return((_91 .. "\n"))
  end
end

compile_for_target = function (target1, form)
  local previous = target
  target = target1
  local str = compile_toplevel(form)
  target = previous
  return(str)
end

rep = function (str)
  local form = read_from_string(str)
  local x = eval(compile_toplevel(form))
  if is63(x) then
    return(print((to_string(x) .. " ")))
  end
end

repl = function ()
  local step = function (str)
    rep(str)
    return(write("> "))
  end
  write("> ")
  while true do
    local str = (io.stdin.read)(io.stdin)
    if str then
      step(str)
    else
      break
    end
  end
end

usage = function ()
  print((to_string("usage: x [options] [inputs]") .. " "))
  print((to_string("options:") .. " "))
  print((to_string("  -o <output>\tOutput file") .. " "))
  print((to_string("  -t <target>\tTarget language (default: lua)") .. " "))
  print((to_string("  -e <expr>\tExpression to evaluate") .. " "))
  print((to_string("  -m \t\tEmbed macro definitions in output") .. " "))
  return(exit())
end

main = function ()
  local args = arg
  if ((hd(args) == "-h") or (hd(args) == "--help")) then
    usage()
  end
  local inputs = {}
  local output = nil
  local target1 = nil
  local expr = nil
  local i = 0
  local _92 = args
  while (i < length(_92)) do
    local arg = _92[(i + 1)]
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
    elseif (arg == "-m") then
      embed_macros63 = true
    elseif ("-" ~= char(arg, 0)) then
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
    local _94 = 0
    local _93 = inputs
    while (_94 < length(_93)) do
      local file = _93[(_94 + 1)]
      eval(compile_file(file))
      _94 = (_94 + 1)
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
    local k = nil
    local _2 = body
    for k in next, _2 do
      if (not number63(k)) then
        local v = _2[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end)

setenv("table", function (...)
  local body = unstash({...})
  local l = {}
  local k = nil
  local _4 = body
  for k in next, _4 do
    if (not number63(k)) then
      local v = _4[k]
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
  map(function (_9)
    local lh = _9[1]
    local rh = _9[2]
    local _11 = 0
    local _10 = bind(lh, rh)
    while (_11 < length(_10)) do
      local _12 = _10[(_11 + 1)]
      local id = _12[1]
      local val = _12[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, variable)
      end
      add(locals, {"local", id, val})
      _11 = (_11 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, body)})))
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
  local body = macroexpand(body)
  drop(environment)
  return(join({"do"}, body))
end)

setenv("let-symbol", function (expansions, ...)
  local body = unstash({...})
  add(environment, {})
  map(function (_14)
    local name = _14[1]
    local expr = _14[2]
    return(setenv(name, expr))
  end, pairwise(expansions))
  local body = macroexpand(body)
  drop(environment)
  return(join({"do"}, body))
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
  local _16 = bind_arguments(args, body)
  local args = _16[1]
  local body = _16[2]
  return(join({"function", args}, body))
end)

setenv("across", function (_18, ...)
  local l = _18[1]
  local v = _18[2]
  local i = _18[3]
  local start = _18[4]
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

setenv("with-scope", function (_25, expr)
  local bound = _25[1]
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
  return(clauses[target])
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
    local _44 = xs
    while (i < length(_44)) do
      local x = _44[(i + 1)]
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

setenv("each", function (_47, ...)
  local t = _47[1]
  local k = _47[2]
  local v = _47[3]
  local body = unstash({...})
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"for", {t1, k}, {"if", (function ()
    local _48 = {"target"}
    _48.js = {"isNaN", {"parseInt", k}}
    _48.lua = {"not", {"number?", k}}
    return(_48)
  end)(), join({"let", {v, {"get", t1, k}}}, body)}}})
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
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end)

setenv("define-reader", function (_58, ...)
  local char = _58[1]
  local stream = _58[2]
  local body = unstash({...})
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
end)

setenv("with-indent", function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end)

setenv("define-special", function (name, args, ...)
  local body = unstash({...})
  return({"set", {"get", "special", {"quote", name}}, join((function ()
    local _70 = {"table"}
    _70.compiler = join({"fn", args}, body)
    return(_70)
  end)(), body)})
end)

main()
