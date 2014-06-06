(function ()
  nexus = {}
  return
end)();
(function ()
  local function nil63(x)
    return((x == nil))
  end
  local function is63(x)
    return((not nil63(x)))
  end
  local function length(x)
    return(#x)
  end
  local function empty63(x)
    return((length(x) == 0))
  end
  local function some63(x)
    return((length(x) > 0))
  end
  local function substring(str, from, upto)
    return((string.sub)(str, (from + 1), upto))
  end
  local function sublist(l, from, upto)
    local i = (from or 0)
    local j = 0
    local _g3 = (upto or length(l))
    local l2 = {}
    while (i < _g3) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  local function hd(l)
    return(l[1])
  end
  local function string63(x)
    return((type(x) == "string"))
  end
  local function number63(x)
    return((type(x) == "number"))
  end
  local function boolean63(x)
    return((type(x) == "boolean"))
  end
  local function function63(x)
    return((type(x) == "function"))
  end
  local function composite63(x)
    return((type(x) == "table"))
  end
  local function atom63(x)
    return((not composite63(x)))
  end
  local function table63(x)
    return((composite63(x) and nil63(hd(x))))
  end
  local function list63(x)
    return((composite63(x) and is63(hd(x))))
  end
  local function sub(x, from, upto)
    local _g4 = (from or 0)
    if string63(x) then
      return(substring(x, _g4, upto))
    else
      local l = sublist(x, _g4, upto)
      local k = nil
      local _g5 = x
      for k in next, _g5 do
        if (not number63(k)) then
          local v = _g5[k]
          l[k] = v
        end
      end
      return(l)
    end
  end
  local function inner(x)
    return(sub(x, 1, (length(x) - 1)))
  end
  local function tl(l)
    return(sub(l, 1))
  end
  local function char(str, n)
    return(sub(str, n, (n + 1)))
  end
  local function code(str, n)
    return((string.byte)(str, (function ()
      if n then
        return((n + 1))
      end
    end)()))
  end
  local function string_literal63(x)
    return((string63(x) and (char(x, 0) == "\"")))
  end
  local function id_literal63(x)
    return((string63(x) and (char(x, 0) == "|")))
  end
  local function add(l, x)
    return((table.insert)(l, x))
  end
  local function drop(l)
    return((table.remove)(l))
  end
  local function last(l)
    return(l[((length(l) - 1) + 1)])
  end
  local function reverse(l)
    local l1 = {}
    local i = (length(l) - 1)
    while (i >= 0) do
      add(l1, l[(i + 1)])
      i = (i - 1)
    end
    return(l1)
  end
  local function join(l1, l2)
    if (nil63(l2) and nil63(l1)) then
      return({})
    elseif nil63(l1) then
      return(join({}, l2))
    elseif nil63(l2) then
      return(join(l1, {}))
    elseif (atom63(l1) and atom63(l2)) then
      return({l1, l2})
    elseif atom63(l1) then
      return(join({l1}, l2))
    elseif atom63(l2) then
      return(join(l1, {l2}))
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
      local _g6 = l1
      for k in next, _g6 do
        if (not number63(k)) then
          local v = _g6[k]
          l[k] = v
        end
      end
      local _g8 = nil
      local _g7 = l2
      for _g8 in next, _g7 do
        if (not number63(_g8)) then
          local v = _g7[_g8]
          l[_g8] = v
        end
      end
      return(l)
    end
  end
  local function reduce(f, x)
    if empty63(x) then
      return(x)
    elseif (length(x) == 1) then
      return(hd(x))
    else
      return(f(hd(x), reduce(f, tl(x))))
    end
  end
  local function keep(f, l)
    local l1 = {}
    local _g10 = 0
    local _g9 = l
    while (_g10 < length(_g9)) do
      local x = _g9[(_g10 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g10 = (_g10 + 1)
    end
    return(l1)
  end
  local function find(f, l)
    local _g12 = 0
    local _g11 = l
    while (_g12 < length(_g11)) do
      local x = _g11[(_g12 + 1)]
      local _g13 = f(x)
      if _g13 then
        return(_g13)
      end
      _g12 = (_g12 + 1)
    end
  end
  local function pairwise(l)
    local i = 0
    local l1 = {}
    while (i < length(l)) do
      add(l1, {l[(i + 1)], l[((i + 1) + 1)]})
      i = (i + 2)
    end
    return(l1)
  end
  local function iterate(f, count)
    local i = 0
    while (i < count) do
      f(i)
      i = (i + 1)
    end
  end
  local function replicate(n, x)
    local l = {}
    iterate(function ()
      return(add(l, x))
    end, n)
    return(l)
  end
  local function splice(x)
    return({_splice = true, value = x})
  end
  local function splice63(x)
    return((table63(x) and x._splice))
  end
  local function map(f, l)
    local l1 = {}
    local _g15 = 0
    local _g14 = l
    while (_g15 < length(_g14)) do
      local x = _g14[(_g15 + 1)]
      local x1 = f(x)
      if splice63(x1) then
        l1 = join(l1, x1.value)
      elseif is63(x1) then
        add(l1, x1)
      end
      _g15 = (_g15 + 1)
    end
    return(l1)
  end
  local function map42(f, t)
    local l = map(f, t)
    local k = nil
    local _g16 = t
    for k in next, _g16 do
      if (not number63(k)) then
        local v = _g16[k]
        local x = f(v)
        if is63(x) then
          l[k] = x
        end
      end
    end
    return(l)
  end
  local function mapt(f, t)
    local t1 = {}
    local k = nil
    local _g17 = t
    for k in next, _g17 do
      if (not number63(k)) then
        local v = _g17[k]
        local x = f(k, v)
        if is63(x) then
          t1[k] = x
        end
      end
    end
    return(t1)
  end
  local function mapo(f, t)
    local o = {}
    local k = nil
    local _g18 = t
    for k in next, _g18 do
      if (not number63(k)) then
        local v = _g18[k]
        local x = f(k, v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  local function keys63(t)
    local k = nil
    local k1 = nil
    local _g19 = t
    for k1 in next, _g19 do
      if (not number63(k1)) then
        local v = _g19[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local k = nil
      local _g20 = args
      for k in next, _g20 do
        if (not number63(k)) then
          local v = _g20[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  local function unstash(args)
    if empty63(args) then
      return({})
    else
      local l = last(args)
      if (table63(l) and l._stash) then
        local args1 = sub(args, 0, (length(args) - 1))
        local k = nil
        local _g21 = l
        for k in next, _g21 do
          if (not number63(k)) then
            local v = _g21[k]
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
  local function extend(t, ...)
    local xs = unstash({...})
    local _g22 = sub(xs, 0)
    return(join(t, _g22))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g23 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g24 = t
    for k in next, _g24 do
      if (not number63(k)) then
        local v = _g24[k]
        if (not _g23[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g25 = (function ()
      if start then
        return((start + 1))
      end
    end)()
    local i = (string.find)(str, pattern, start, true)
    return((i and (i - 1)))
  end
  local function split(str, sep)
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
  local function cat(...)
    local xs = unstash({...})
    local _g26 = sub(xs, 0)
    if empty63(_g26) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g26))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g27 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g27))
  end
  local function _(...)
    local xs = unstash({...})
    local _g28 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g28)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g29 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g29))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g30 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g30)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g31 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g31)))
  end
  local function _62(a, b)
    return((a > b))
  end
  local function _60(a, b)
    return((a < b))
  end
  local function _61(a, b)
    return((a == b))
  end
  local function _6261(a, b)
    return((a >= b))
  end
  local function _6061(a, b)
    return((a <= b))
  end
  local function read_file(path)
    local f = (io.open)(path)
    return((f.read)(f, "*a"))
  end
  local function write_file(path, data)
    local f = (io.open)(path, "w")
    return((f.write)(f, data))
  end
  local function write(x)
    return((io.write)(x))
  end
  local function exit(code)
    return((os.exit)(code))
  end
  local function parse_number(str)
    return(tonumber(str))
  end
  local function to_string(x)
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
      local _g32 = x
      for k in next, _g32 do
        if (not number63(k)) then
          local v = _g32[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g33 = x1
      while (i < length(_g33)) do
        local y = _g33[(i + 1)]
        str = (str .. to_string(y))
        if (i < (length(x1) - 1)) then
          str = (str .. " ")
        end
        i = (i + 1)
      end
      return((str .. ")"))
    end
  end
  local function apply(f, args)
    local _g34 = stash(args)
    return(f(unpack(_g34)))
  end
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  _g35 = {}
  nexus.runtime = _g35
  _g35["nil?"] = nil63
  _g35["is?"] = is63
  _g35.length = length
  _g35["empty?"] = empty63
  _g35["some?"] = some63
  _g35.substring = substring
  _g35.sublist = sublist
  _g35.hd = hd
  _g35["string?"] = string63
  _g35["number?"] = number63
  _g35["boolean?"] = boolean63
  _g35["function?"] = function63
  _g35["composite?"] = composite63
  _g35["atom?"] = atom63
  _g35["table?"] = table63
  _g35["list?"] = list63
  _g35.sub = sub
  _g35.inner = inner
  _g35.tl = tl
  _g35.char = char
  _g35.code = code
  _g35["string-literal?"] = string_literal63
  _g35["id-literal?"] = id_literal63
  _g35.add = add
  _g35.drop = drop
  _g35.last = last
  _g35.reverse = reverse
  _g35.join = join
  _g35.reduce = reduce
  _g35.keep = keep
  _g35.find = find
  _g35.pairwise = pairwise
  _g35.iterate = iterate
  _g35.replicate = replicate
  _g35.splice = splice
  _g35.map = map
  _g35["map*"] = map42
  _g35.mapt = mapt
  _g35.mapo = mapo
  _g35["keys?"] = keys63
  _g35.stash = stash
  _g35.unstash = unstash
  _g35.extend = extend
  _g35.exclude = exclude
  _g35.search = search
  _g35.split = split
  _g35.cat = cat
  _g35["+"] = _43
  _g35["-"] = _
  _g35["*"] = _42
  _g35["/"] = _47
  _g35["%"] = _37
  _g35[">"] = _62
  _g35["<"] = _60
  _g35["="] = _61
  _g35[">="] = _6261
  _g35["<="] = _6061
  _g35["read-file"] = read_file
  _g35["write-file"] = write_file
  _g35.write = write
  _g35.exit = exit
  _g35["parse-number"] = parse_number
  _g35["to-string"] = to_string
  _g35.apply = apply
  _g35["%message-handler"] = _37message_handler
end)();
(function ()
  local _g42 = nexus.runtime
  local nil63 = _g42["nil?"]
  local is63 = _g42["is?"]
  local length = _g42.length
  local empty63 = _g42["empty?"]
  local some63 = _g42["some?"]
  local substring = _g42.substring
  local sublist = _g42.sublist
  local hd = _g42.hd
  local string63 = _g42["string?"]
  local number63 = _g42["number?"]
  local boolean63 = _g42["boolean?"]
  local function63 = _g42["function?"]
  local composite63 = _g42["composite?"]
  local atom63 = _g42["atom?"]
  local table63 = _g42["table?"]
  local list63 = _g42["list?"]
  local sub = _g42.sub
  local inner = _g42.inner
  local tl = _g42.tl
  local char = _g42.char
  local code = _g42.code
  local string_literal63 = _g42["string-literal?"]
  local id_literal63 = _g42["id-literal?"]
  local add = _g42.add
  local drop = _g42.drop
  local last = _g42.last
  local reverse = _g42.reverse
  local join = _g42.join
  local reduce = _g42.reduce
  local keep = _g42.keep
  local find = _g42.find
  local pairwise = _g42.pairwise
  local iterate = _g42.iterate
  local replicate = _g42.replicate
  local splice = _g42.splice
  local map = _g42.map
  local map42 = _g42["map*"]
  local mapt = _g42.mapt
  local mapo = _g42.mapo
  local keys63 = _g42["keys?"]
  local stash = _g42.stash
  local unstash = _g42.unstash
  local extend = _g42.extend
  local exclude = _g42.exclude
  local search = _g42.search
  local split = _g42.split
  local cat = _g42.cat
  local _43 = _g42["+"]
  local _ = _g42["-"]
  local _42 = _g42["*"]
  local _47 = _g42["/"]
  local _37 = _g42["%"]
  local _62 = _g42[">"]
  local _60 = _g42["<"]
  local _61 = _g42["="]
  local _6261 = _g42[">="]
  local _6061 = _g42["<="]
  local read_file = _g42["read-file"]
  local write_file = _g42["write-file"]
  local print = _g42.print
  local write = _g42.write
  local exit = _g42.exit
  local parse_number = _g42["parse-number"]
  local to_string = _g42["to-string"]
  local apply = _g42.apply
  local _37message_handler = _g42["%message-handler"]
  function setenv(k, ...)
    local keys = unstash({...})
    local _g43 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g44 = _g43
      for k1 in next, _g44 do
        if (not number63(k1)) then
          local v = _g44[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  function getenv(k, ...)
    local keys = unstash({...})
    local _g45 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g46 = keys63(_g45)
        if _g46 then
          return(b[_g46])
        else
          return(b)
        end
      end
    end
  end
  function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  function macro63(k)
    return(is63(macro_function(k)))
  end
  function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  function special_form63(form)
    return((list63(form) and special63(hd(form))))
  end
  function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  function variable63(k)
    local b = find(function (frame)
      return((frame[k] or frame._scope))
    end, reverse(environment))
    return((table63(b) and is63(b.variable)))
  end
  function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  function bound63(x)
    return((macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x)))
  end
  local function escape(str)
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
  function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local k = nil
      local _g47 = args
      for k in next, _g47 do
        if (not number63(k)) then
          local v = _g47[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  local id_count = 0
  function make_id()
    id_count = (id_count + 1)
    return(("_g" .. id_count))
  end
  function bind(lh, rh)
    if (composite63(lh) and list63(rh)) then
      local id = make_id()
      return(join({join({id, rh})}, bind(lh, id)))
    elseif atom63(lh) then
      return(join({join({lh, rh})}))
    else
      local bs = {}
      local r = lh.rest
      local i = 0
      local _g48 = lh
      while (i < length(_g48)) do
        local x = _g48[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local k = nil
      local _g49 = lh
      for k in next, _g49 do
        if (not number63(k)) then
          local v = _g49[k]
          if (v == true) then
            v = k
          end
          if (k ~= "rest") then
            bs = join(bs, bind(v, join({"get", rh, join({"quote", k})})))
          end
        end
      end
      return(bs)
    end
  end
  function bind42(args, body)
    local args1 = {}
    local function rest()
      if (target == "js") then
        return(join({"unstash", join({"sublist", "arguments", length(args1)})}))
      else
        add(args1, "|...|")
        return({"unstash", {"list", "|...|"}})
      end
    end
    if atom63(args) then
      return({args1, join({join({"let", {args, rest()}}, body)})})
    else
      local bs = {}
      local r = (args.rest or (keys63(args) and make_id()))
      local _g51 = 0
      local _g50 = args
      while (_g51 < length(_g50)) do
        local arg = _g50[(_g51 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g51 = (_g51 + 1)
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
        return({args1, join({join({"let", bs}, body)})})
      end
    end
  end
  local function quoting63(depth)
    return(number63(depth))
  end
  local function quasiquoting63(depth)
    return((quoting63(depth) and (depth > 0)))
  end
  local function can_unquote63(depth)
    return((quoting63(depth) and (depth == 1)))
  end
  local function quasisplice63(x, depth)
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
        local _g37 = form[1]
        local _g52 = form[2]
        local t = _g52[1]
        local k = _g52[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g38 = form[1]
        local args = form[2]
        local _g53 = sub(form, 2)
        add(environment, {_scope = true})
        local _g55 = (function ()
          local _g57 = 0
          local _g56 = args
          while (_g57 < length(_g56)) do
            local _g54 = _g56[(_g57 + 1)]
            setenv(_g54, {_stash = true, variable = true})
            _g57 = (_g57 + 1)
          end
          return(join({"%function", map42(macroexpand, args)}, macroexpand(_g53)))
        end)()
        drop(environment)
        return(_g55)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g39 = form[1]
        local name = form[2]
        local _g58 = form[3]
        local _g59 = sub(form, 3)
        add(environment, {_scope = true})
        local _g61 = (function ()
          local _g63 = 0
          local _g62 = _g58
          while (_g63 < length(_g62)) do
            local _g60 = _g62[(_g63 + 1)]
            setenv(_g60, {_stash = true, variable = true})
            _g63 = (_g63 + 1)
          end
          return(join({x, name, map42(macroexpand, _g58)}, macroexpand(_g59)))
        end)()
        drop(environment)
        return(_g61)
      elseif macro63(x) then
        return(macroexpand(apply(macro_function(x), tl(form))))
      else
        return(map42(macroexpand, form))
      end
    end
  end
  local function quasiquote_list(form, depth)
    local xs = {{"list"}}
    local k = nil
    local _g64 = form
    for k in next, _g64 do
      if (not number63(k)) then
        local v = _g64[k]
        local _g65 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g65
      end
    end
    local _g67 = 0
    local _g66 = form
    while (_g67 < length(_g66)) do
      local x = _g66[(_g67 + 1)]
      if quasisplice63(x, depth) then
        local _g68 = quasiexpand(x[2])
        add(xs, _g68)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g67 = (_g67 + 1)
    end
    local pruned = keep(function (x)
      return(((length(x) > 1) or (not (hd(x) == "list")) or keys63(x)))
    end, xs)
    return(join({"join*"}, pruned))
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
  indent_level = 0
  function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
  local function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  local function valid_char63(n)
    return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
  end
  function valid_id63(id)
    if empty63(id) then
      return(false)
    elseif special63(id) then
      return(false)
    elseif reserved[id] then
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
  function to_id(id)
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
  function module_key(spec)
    if atom63(spec) then
      return(to_string(spec))
    else
      error("Unsupported module specification")
    end
  end
  function exported()
    local toplevel = hd(environment)
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local n = nil
    local _g71 = toplevel
    for n in next, _g71 do
      if (not number63(n)) then
        local b = _g71[n]
        if (b.variable and b.export and (b.module == current_module)) then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({"do", join({"define", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  function imported(spec)
    local k = module_key(spec)
    local x = nexus[k]
    if (x and keys63(x)) then
      local m = make_id()
      local imports = {}
      add(imports, join({"%local", m, join({"get", "nexus", join({"quote", k})})}))
      local b = nil
      local _g72 = x
      for b in next, _g72 do
        if (not number63(b)) then
          local _g40 = _g72[b]
          add(imports, join({"%local", b, join({"get", m, join({"quote", b})})}))
        end
      end
      return(imports)
    end
  end
  local function quote_binding(b)
    b = extend(b, {_stash = true, module = join({"quote", b.module})})
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = join({"quote", b.symbol})}))
    elseif (b.macro and b.form) then
      return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
    elseif (b.special and b.form) then
      return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
    elseif is63(b.variable) then
      return(b)
    elseif is63(b.global) then
      return(b)
    end
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (_g41, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g73 = {"table"}
      _g73.import = quoted(m.import)
      _g73.export = quote_frame(m.export)
      return(_g73)
    end)()))
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  _g74 = {}
  nexus.utilities = _g74
  _g74.setenv = setenv
  _g74.getenv = getenv
  _g74["macro-function"] = macro_function
  _g74["macro?"] = macro63
  _g74["special?"] = special63
  _g74["special-form?"] = special_form63
  _g74["symbol-expansion"] = symbol_expansion
  _g74["symbol?"] = symbol63
  _g74["variable?"] = variable63
  _g74["bound?"] = bound63
  _g74.quoted = quoted
  _g74["stash*"] = stash42
  _g74.bind = bind
  _g74["bind*"] = bind42
  _g74.quasiexpand = quasiexpand
  _g74.macroexpand = macroexpand
  _g74.indentation = indentation
  _g74["valid-id?"] = valid_id63
  _g74["to-id"] = to_id
  _g74["module-key"] = module_key
  _g74.imported = imported
  _g74.exported = exported
  _g74["quote-environment"] = quote_environment
  _g74["quote-modules"] = quote_modules
  _g74["initial-environment"] = initial_environment
end)();
(function ()
  local _g76 = nexus.runtime
  local nil63 = _g76["nil?"]
  local is63 = _g76["is?"]
  local length = _g76.length
  local empty63 = _g76["empty?"]
  local some63 = _g76["some?"]
  local substring = _g76.substring
  local sublist = _g76.sublist
  local hd = _g76.hd
  local string63 = _g76["string?"]
  local number63 = _g76["number?"]
  local boolean63 = _g76["boolean?"]
  local function63 = _g76["function?"]
  local composite63 = _g76["composite?"]
  local atom63 = _g76["atom?"]
  local table63 = _g76["table?"]
  local list63 = _g76["list?"]
  local sub = _g76.sub
  local inner = _g76.inner
  local tl = _g76.tl
  local char = _g76.char
  local code = _g76.code
  local string_literal63 = _g76["string-literal?"]
  local id_literal63 = _g76["id-literal?"]
  local add = _g76.add
  local drop = _g76.drop
  local last = _g76.last
  local reverse = _g76.reverse
  local join = _g76.join
  local reduce = _g76.reduce
  local keep = _g76.keep
  local find = _g76.find
  local pairwise = _g76.pairwise
  local iterate = _g76.iterate
  local replicate = _g76.replicate
  local splice = _g76.splice
  local map = _g76.map
  local map42 = _g76["map*"]
  local mapt = _g76.mapt
  local mapo = _g76.mapo
  local keys63 = _g76["keys?"]
  local stash = _g76.stash
  local unstash = _g76.unstash
  local extend = _g76.extend
  local exclude = _g76.exclude
  local search = _g76.search
  local split = _g76.split
  local cat = _g76.cat
  local _43 = _g76["+"]
  local _ = _g76["-"]
  local _42 = _g76["*"]
  local _47 = _g76["/"]
  local _37 = _g76["%"]
  local _62 = _g76[">"]
  local _60 = _g76["<"]
  local _61 = _g76["="]
  local _6261 = _g76[">="]
  local _6061 = _g76["<="]
  local read_file = _g76["read-file"]
  local write_file = _g76["write-file"]
  local print = _g76.print
  local write = _g76.write
  local exit = _g76.exit
  local parse_number = _g76["parse-number"]
  local to_string = _g76["to-string"]
  local apply = _g76.apply
  local _37message_handler = _g76["%message-handler"]
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  local function make_stream(str)
    return({pos = 0, string = str, len = length(str)})
  end
  local function peek_char(s)
    if (s.pos < s.len) then
      return(char(s.string, s.pos))
    end
  end
  local function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = (s.pos + 1)
      return(c)
    end
  end
  local function skip_non_code(s)
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
  local read_table = {}
  local eof = {}
  local function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return(((read_table[c] or read_table[""]))(s))
    else
      return(eof)
    end
  end
  local function read_all(s)
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
  local function read_from_string(str)
    return(read(make_stream(str)))
  end
  local function key63(atom)
    return((string63(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
  end
  local function flag63(atom)
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
        return(join({"get", b, join({"quote", a})}))
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
  _g82 = {}
  nexus.reader = _g82
  _g82["make-stream"] = make_stream
  _g82["read-table"] = read_table
  _g82.read = read
  _g82["read-all"] = read_all
  _g82["read-from-string"] = read_from_string
end)();
(function ()
  local _g84 = nexus.runtime
  local nil63 = _g84["nil?"]
  local is63 = _g84["is?"]
  local length = _g84.length
  local empty63 = _g84["empty?"]
  local some63 = _g84["some?"]
  local substring = _g84.substring
  local sublist = _g84.sublist
  local hd = _g84.hd
  local string63 = _g84["string?"]
  local number63 = _g84["number?"]
  local boolean63 = _g84["boolean?"]
  local function63 = _g84["function?"]
  local composite63 = _g84["composite?"]
  local atom63 = _g84["atom?"]
  local table63 = _g84["table?"]
  local list63 = _g84["list?"]
  local sub = _g84.sub
  local inner = _g84.inner
  local tl = _g84.tl
  local char = _g84.char
  local code = _g84.code
  local string_literal63 = _g84["string-literal?"]
  local id_literal63 = _g84["id-literal?"]
  local add = _g84.add
  local drop = _g84.drop
  local last = _g84.last
  local reverse = _g84.reverse
  local join = _g84.join
  local reduce = _g84.reduce
  local keep = _g84.keep
  local find = _g84.find
  local pairwise = _g84.pairwise
  local iterate = _g84.iterate
  local replicate = _g84.replicate
  local splice = _g84.splice
  local map = _g84.map
  local map42 = _g84["map*"]
  local mapt = _g84.mapt
  local mapo = _g84.mapo
  local keys63 = _g84["keys?"]
  local stash = _g84.stash
  local unstash = _g84.unstash
  local extend = _g84.extend
  local exclude = _g84.exclude
  local search = _g84.search
  local split = _g84.split
  local cat = _g84.cat
  local _43 = _g84["+"]
  local _ = _g84["-"]
  local _42 = _g84["*"]
  local _47 = _g84["/"]
  local _37 = _g84["%"]
  local _62 = _g84[">"]
  local _60 = _g84["<"]
  local _61 = _g84["="]
  local _6261 = _g84[">="]
  local _6061 = _g84["<="]
  local read_file = _g84["read-file"]
  local write_file = _g84["write-file"]
  local print = _g84.print
  local write = _g84.write
  local exit = _g84.exit
  local parse_number = _g84["parse-number"]
  local to_string = _g84["to-string"]
  local apply = _g84.apply
  local _37message_handler = _g84["%message-handler"]
  local _g85 = nexus.utilities
  local setenv = _g85.setenv
  local getenv = _g85.getenv
  local macro_function = _g85["macro-function"]
  local macro63 = _g85["macro?"]
  local special63 = _g85["special?"]
  local special_form63 = _g85["special-form?"]
  local symbol_expansion = _g85["symbol-expansion"]
  local symbol63 = _g85["symbol?"]
  local variable63 = _g85["variable?"]
  local bound63 = _g85["bound?"]
  local quoted = _g85.quoted
  local stash42 = _g85["stash*"]
  local bind = _g85.bind
  local bind42 = _g85["bind*"]
  local quasiexpand = _g85.quasiexpand
  local macroexpand = _g85.macroexpand
  local indentation = _g85.indentation
  local valid_id63 = _g85["valid-id?"]
  local to_id = _g85["to-id"]
  local module_key = _g85["module-key"]
  local imported = _g85.imported
  local exported = _g85.exported
  local quote_environment = _g85["quote-environment"]
  local quote_modules = _g85["quote-modules"]
  local initial_environment = _g85["initial-environment"]
  local _g86 = nexus.reader
  local make_stream = _g86["make-stream"]
  local read_table = _g86["read-table"]
  local read = _g86.read
  local read_all = _g86["read-all"]
  local read_from_string = _g86["read-from-string"]
  local infix = {common = {["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", cat = "+"}, lua = {["="] = "==", cat = "..", ["~="] = true, ["and"] = true, ["or"] = true}}
  local function getop(op)
    local op1 = (infix.common[op] or infix[target][op])
    if (op1 == true) then
      return(op)
    else
      return(op1)
    end
  end
  local function infix63(form)
    return((list63(form) and is63(getop(hd(form)))))
  end
  local function compile_args(args)
    local str = "("
    local i = 0
    local _g87 = args
    while (i < length(_g87)) do
      local arg = _g87[(i + 1)]
      str = (str .. compile(arg))
      if (i < (length(args) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_atom(x)
    if ((x == "nil") and (target == "lua")) then
      return(x)
    elseif (x == "nil") then
      return("undefined")
    elseif id_literal63(x) then
      return(inner(x))
    elseif string_literal63(x) then
      return(x)
    elseif string63(x) then
      return(to_id(x))
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
  function compile_body(forms, ...)
    local _g88 = unstash({...})
    local tail63 = _g88["tail?"]
    local str = ""
    local i = 0
    local _g89 = forms
    while (i < length(_g89)) do
      local x = _g89[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, ["stmt?"] = true, ["tail?"] = t63}))
      i = (i + 1)
    end
    return(str)
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
  local function compile_infix(_g90)
    local op = _g90[1]
    local args = sub(_g90, 1)
    local str = "("
    local _g91 = getop(op)
    local i = 0
    local _g92 = args
    while (i < length(_g92)) do
      local arg = _g92[(i + 1)]
      if ((_g91 == "-") and (length(args) == 1)) then
        str = (str .. _g91 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g91 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g93 = (function ()
      indent_level = (indent_level + 1)
      local _g94 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
      indent_level = (indent_level - 1)
      return(_g94)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g93 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g93 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g93 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g93 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g93 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g93 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g95 = unstash({...})
    local name = _g95.name
    local prefix = _g95.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g96 = (prefix or "")
    local _g97 = compile_args(args)
    local _g98 = (function ()
      indent_level = (indent_level + 1)
      local _g99 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g99)
    end)()
    local ind = indentation()
    local tr = (function ()
      if (target == "js") then
        return("")
      else
        return("end")
      end
    end)()
    if name then
      tr = (tr .. "\n")
    end
    if (target == "js") then
      return(("function " .. id .. _g97 .. " {\n" .. _g98 .. ind .. "}" .. tr))
    else
      return((_g96 .. "function " .. id .. _g97 .. "\n" .. _g98 .. ind .. tr))
    end
  end
  local function terminator(stmt63)
    if (not stmt63) then
      return("")
    elseif (target == "js") then
      return(";\n")
    else
      return("\n")
    end
  end
  function compile_special(form, stmt63, tail63)
    local _g100 = getenv(hd(form))
    local special = _g100.special
    local stmt = _g100.stmt
    local self_tr63 = _g100.tr
    if ((not stmt63) and stmt) then
      return(compile(join({join({"%function", {}, form})}), {_stash = true, ["tail?"] = tail63}))
    else
      local tr = terminator((stmt63 and (not self_tr63)))
      return((special(tl(form), tail63) .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  function compile(form, ...)
    local _g101 = unstash({...})
    local stmt63 = _g101["stmt?"]
    local tail63 = _g101["tail?"]
    if (tail63 and can_return63(form)) then
      form = join({"return", form})
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
      local _g102 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g102 .. tr))
    end
  end
  current_module = nil
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g103 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g103, {epilog}))}))
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return((compile(form) .. ";\n"))
  end
  _37result = nil
  local function run(x)
    local f = load((compile("%result") .. "=" .. x))
    if f then
      f()
      return(_37result)
    else
      local f,e = load(x)
      if f then
        return(f())
      else
        error((e .. " in " .. x))
      end
    end
  end
  local compiler_output = nil
  local compilation_level = nil
  function compile_module(spec)
    compilation_level = 0
    compiler_output = ""
    load_module(spec)
    return(compiler_output)
  end
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    local k = module_key(spec)
    if number63(compilation_level) then
      compilation_level = (compilation_level + 1)
    end
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    local m = module(spec)
    local toplevel = hd(environment)
    current_module = mod0
    environment = env0
    local name = nil
    local _g117 = toplevel
    for name in next, _g117 do
      if (not number63(name)) then
        local binding = _g117[name]
        if (binding.export and (binding.module == k)) then
          m.export[name] = binding
        end
      end
    end
    if number63(compilation_level) then
      compilation_level = (compilation_level - 1)
      compiler_output = (compiler_output .. compiled)
    else
      return(run(compiled))
    end
  end
  function load_module(spec)
    if (nil63(module(spec)) or (compilation_level == 1)) then
      _37compile_module(spec)
    end
    return(open_module(spec))
  end
  function open_module(spec)
    local m = module(spec)
    local frame = last(environment)
    local k = nil
    local _g118 = m.export
    for k in next, _g118 do
      if (not number63(k)) then
        local v = _g118[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  local function prologue(spec)
    if spec then
      local m = module(spec)
      return(join(imported(spec), map(function (x)
        return(splice(imported(x)))
      end, m.import)))
    end
  end
  function eval(form, spec)
    local previous = target
    target = "lua"
    local form1 = join({"do"}, join(prologue(spec), {form}))
    local x = compile(macroexpand(form1))
    target = previous
    return(run(x))
  end
  _g119 = {}
  nexus.compiler = _g119
  _g119["compile-body"] = compile_body
  _g119["compile-call"] = compile_call
  _g119["compile-branch"] = compile_branch
  _g119["compile-function"] = compile_function
  _g119["compile-special"] = compile_special
  _g119.compile = compile
  _g119.eval = eval
  _g119["load-module"] = load_module
  _g119["open-module"] = open_module
  _g119["in-module"] = in_module
end)();
(function ()
  local _g122 = nexus.runtime
  local nil63 = _g122["nil?"]
  local is63 = _g122["is?"]
  local length = _g122.length
  local empty63 = _g122["empty?"]
  local some63 = _g122["some?"]
  local substring = _g122.substring
  local sublist = _g122.sublist
  local hd = _g122.hd
  local string63 = _g122["string?"]
  local number63 = _g122["number?"]
  local boolean63 = _g122["boolean?"]
  local function63 = _g122["function?"]
  local composite63 = _g122["composite?"]
  local atom63 = _g122["atom?"]
  local table63 = _g122["table?"]
  local list63 = _g122["list?"]
  local sub = _g122.sub
  local inner = _g122.inner
  local tl = _g122.tl
  local char = _g122.char
  local code = _g122.code
  local string_literal63 = _g122["string-literal?"]
  local id_literal63 = _g122["id-literal?"]
  local add = _g122.add
  local drop = _g122.drop
  local last = _g122.last
  local reverse = _g122.reverse
  local join = _g122.join
  local reduce = _g122.reduce
  local keep = _g122.keep
  local find = _g122.find
  local pairwise = _g122.pairwise
  local iterate = _g122.iterate
  local replicate = _g122.replicate
  local splice = _g122.splice
  local map = _g122.map
  local map42 = _g122["map*"]
  local mapt = _g122.mapt
  local mapo = _g122.mapo
  local keys63 = _g122["keys?"]
  local stash = _g122.stash
  local unstash = _g122.unstash
  local extend = _g122.extend
  local exclude = _g122.exclude
  local search = _g122.search
  local split = _g122.split
  local cat = _g122.cat
  local _43 = _g122["+"]
  local _ = _g122["-"]
  local _42 = _g122["*"]
  local _47 = _g122["/"]
  local _37 = _g122["%"]
  local _62 = _g122[">"]
  local _60 = _g122["<"]
  local _61 = _g122["="]
  local _6261 = _g122[">="]
  local _6061 = _g122["<="]
  local read_file = _g122["read-file"]
  local write_file = _g122["write-file"]
  local print = _g122.print
  local write = _g122.write
  local exit = _g122.exit
  local parse_number = _g122["parse-number"]
  local to_string = _g122["to-string"]
  local apply = _g122.apply
  local _37message_handler = _g122["%message-handler"]
  local _g123 = nexus.utilities
  local setenv = _g123.setenv
  local getenv = _g123.getenv
  local macro_function = _g123["macro-function"]
  local macro63 = _g123["macro?"]
  local special63 = _g123["special?"]
  local special_form63 = _g123["special-form?"]
  local symbol_expansion = _g123["symbol-expansion"]
  local symbol63 = _g123["symbol?"]
  local variable63 = _g123["variable?"]
  local bound63 = _g123["bound?"]
  local quoted = _g123.quoted
  local stash42 = _g123["stash*"]
  local bind = _g123.bind
  local bind42 = _g123["bind*"]
  local quasiexpand = _g123.quasiexpand
  local macroexpand = _g123.macroexpand
  local indentation = _g123.indentation
  local valid_id63 = _g123["valid-id?"]
  local to_id = _g123["to-id"]
  local module_key = _g123["module-key"]
  local imported = _g123.imported
  local exported = _g123.exported
  local quote_environment = _g123["quote-environment"]
  local quote_modules = _g123["quote-modules"]
  local initial_environment = _g123["initial-environment"]
  local _g124 = nexus.compiler
  local compile_body = _g124["compile-body"]
  local compile_call = _g124["compile-call"]
  local compile_branch = _g124["compile-branch"]
  local compile_function = _g124["compile-function"]
  local compile_special = _g124["compile-special"]
  local compile = _g124.compile
  local eval = _g124.eval
  local load_module = _g124["load-module"]
  local open_module = _g124["open-module"]
  local in_module = _g124["in-module"]
  return
end)();
(function ()
  local _g231 = nexus.runtime
  local nil63 = _g231["nil?"]
  local is63 = _g231["is?"]
  local length = _g231.length
  local empty63 = _g231["empty?"]
  local some63 = _g231["some?"]
  local substring = _g231.substring
  local sublist = _g231.sublist
  local hd = _g231.hd
  local string63 = _g231["string?"]
  local number63 = _g231["number?"]
  local boolean63 = _g231["boolean?"]
  local function63 = _g231["function?"]
  local composite63 = _g231["composite?"]
  local atom63 = _g231["atom?"]
  local table63 = _g231["table?"]
  local list63 = _g231["list?"]
  local sub = _g231.sub
  local inner = _g231.inner
  local tl = _g231.tl
  local char = _g231.char
  local code = _g231.code
  local string_literal63 = _g231["string-literal?"]
  local id_literal63 = _g231["id-literal?"]
  local add = _g231.add
  local drop = _g231.drop
  local last = _g231.last
  local reverse = _g231.reverse
  local join = _g231.join
  local reduce = _g231.reduce
  local keep = _g231.keep
  local find = _g231.find
  local pairwise = _g231.pairwise
  local iterate = _g231.iterate
  local replicate = _g231.replicate
  local splice = _g231.splice
  local map = _g231.map
  local map42 = _g231["map*"]
  local mapt = _g231.mapt
  local mapo = _g231.mapo
  local keys63 = _g231["keys?"]
  local stash = _g231.stash
  local unstash = _g231.unstash
  local extend = _g231.extend
  local exclude = _g231.exclude
  local search = _g231.search
  local split = _g231.split
  local cat = _g231.cat
  local _43 = _g231["+"]
  local _ = _g231["-"]
  local _42 = _g231["*"]
  local _47 = _g231["/"]
  local _37 = _g231["%"]
  local _62 = _g231[">"]
  local _60 = _g231["<"]
  local _61 = _g231["="]
  local _6261 = _g231[">="]
  local _6061 = _g231["<="]
  local read_file = _g231["read-file"]
  local write_file = _g231["write-file"]
  local print = _g231.print
  local write = _g231.write
  local exit = _g231.exit
  local parse_number = _g231["parse-number"]
  local to_string = _g231["to-string"]
  local apply = _g231.apply
  local _37message_handler = _g231["%message-handler"]
  local _g232 = nexus.utilities
  local setenv = _g232.setenv
  local getenv = _g232.getenv
  local macro_function = _g232["macro-function"]
  local macro63 = _g232["macro?"]
  local special63 = _g232["special?"]
  local special_form63 = _g232["special-form?"]
  local symbol_expansion = _g232["symbol-expansion"]
  local symbol63 = _g232["symbol?"]
  local variable63 = _g232["variable?"]
  local bound63 = _g232["bound?"]
  local quoted = _g232.quoted
  local stash42 = _g232["stash*"]
  local bind = _g232.bind
  local bind42 = _g232["bind*"]
  local quasiexpand = _g232.quasiexpand
  local macroexpand = _g232.macroexpand
  local indentation = _g232.indentation
  local valid_id63 = _g232["valid-id?"]
  local to_id = _g232["to-id"]
  local module_key = _g232["module-key"]
  local imported = _g232.imported
  local exported = _g232.exported
  local quote_environment = _g232["quote-environment"]
  local quote_modules = _g232["quote-modules"]
  local initial_environment = _g232["initial-environment"]
  target = "lua"
  return
end)();
(function ()
  local _g367 = nexus.runtime
  local nil63 = _g367["nil?"]
  local is63 = _g367["is?"]
  local length = _g367.length
  local empty63 = _g367["empty?"]
  local some63 = _g367["some?"]
  local substring = _g367.substring
  local sublist = _g367.sublist
  local hd = _g367.hd
  local string63 = _g367["string?"]
  local number63 = _g367["number?"]
  local boolean63 = _g367["boolean?"]
  local function63 = _g367["function?"]
  local composite63 = _g367["composite?"]
  local atom63 = _g367["atom?"]
  local table63 = _g367["table?"]
  local list63 = _g367["list?"]
  local sub = _g367.sub
  local inner = _g367.inner
  local tl = _g367.tl
  local char = _g367.char
  local code = _g367.code
  local string_literal63 = _g367["string-literal?"]
  local id_literal63 = _g367["id-literal?"]
  local add = _g367.add
  local drop = _g367.drop
  local last = _g367.last
  local reverse = _g367.reverse
  local join = _g367.join
  local reduce = _g367.reduce
  local keep = _g367.keep
  local find = _g367.find
  local pairwise = _g367.pairwise
  local iterate = _g367.iterate
  local replicate = _g367.replicate
  local splice = _g367.splice
  local map = _g367.map
  local map42 = _g367["map*"]
  local mapt = _g367.mapt
  local mapo = _g367.mapo
  local keys63 = _g367["keys?"]
  local stash = _g367.stash
  local unstash = _g367.unstash
  local extend = _g367.extend
  local exclude = _g367.exclude
  local search = _g367.search
  local split = _g367.split
  local cat = _g367.cat
  local _43 = _g367["+"]
  local _ = _g367["-"]
  local _42 = _g367["*"]
  local _47 = _g367["/"]
  local _37 = _g367["%"]
  local _62 = _g367[">"]
  local _60 = _g367["<"]
  local _61 = _g367["="]
  local _6261 = _g367[">="]
  local _6061 = _g367["<="]
  local read_file = _g367["read-file"]
  local write_file = _g367["write-file"]
  local print = _g367.print
  local write = _g367.write
  local exit = _g367.exit
  local parse_number = _g367["parse-number"]
  local to_string = _g367["to-string"]
  local apply = _g367.apply
  local _37message_handler = _g367["%message-handler"]
  local _g368 = nexus.utilities
  local setenv = _g368.setenv
  local getenv = _g368.getenv
  local macro_function = _g368["macro-function"]
  local macro63 = _g368["macro?"]
  local special63 = _g368["special?"]
  local special_form63 = _g368["special-form?"]
  local symbol_expansion = _g368["symbol-expansion"]
  local symbol63 = _g368["symbol?"]
  local variable63 = _g368["variable?"]
  local bound63 = _g368["bound?"]
  local quoted = _g368.quoted
  local stash42 = _g368["stash*"]
  local bind = _g368.bind
  local bind42 = _g368["bind*"]
  local quasiexpand = _g368.quasiexpand
  local macroexpand = _g368.macroexpand
  local indentation = _g368.indentation
  local valid_id63 = _g368["valid-id?"]
  local to_id = _g368["to-id"]
  local module_key = _g368["module-key"]
  local imported = _g368.imported
  local exported = _g368.exported
  local quote_environment = _g368["quote-environment"]
  local quote_modules = _g368["quote-modules"]
  local initial_environment = _g368["initial-environment"]
  modules = {compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g373 = sub(body, 0)
    local imports = {}
    local imp = _g373.import
    local exp = _g373.export
    local _g375 = 0
    local _g374 = (imp or {})
    while (_g375 < length(_g374)) do
      local k = _g374[(_g375 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g375 = (_g375 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g377 = 0
    local _g376 = (exp or {})
    while (_g377 < length(_g376)) do
      local k = _g376[(_g377 + 1)]
      setenv(k, {_stash = true, export = true})
      _g377 = (_g377 + 1)
    end
    return(join({"do"}, imports))
  end, module = "compiler", export = true}, ["compile-body"] = {export = true, module = "compiler", variable = true}, ["compile-call"] = {export = true, module = "compiler", variable = true}, ["compile-branch"] = {export = true, module = "compiler", variable = true}, ["compile-function"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {export = true, module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}}}, core = {import = {"runtime", "utilities", "special", "core"}, export = {quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, module = "core", export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g378 = body
      for k in next, _g378 do
        if (not number63(k)) then
          local v = _g378[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, module = "core", export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g230, x)
      return(x)
    end, body)))
  end, module = "core", export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, module = "core", export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g379 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g380)
      local lh = _g380[1]
      local rh = _g380[2]
      local _g382 = 0
      local _g381 = bind(lh, rh)
      while (_g382 < length(_g381)) do
        local _g383 = _g381[(_g382 + 1)]
        local id = _g383[1]
        local val = _g383[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g382 = (_g382 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g379)})))
  end, module = "core", export = true}, ["define-global"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g384 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g384)) then
      local _g385 = bind42(x, _g384)
      local args = _g385[1]
      local _g386 = _g385[2]
      return(join({"%global-function", name, args}, _g386))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, module = "core", export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, module = "core", export = true}, target = {module = "core", macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g387 = sub(body, 0)
    add(environment, {})
    local _g388 = (function ()
      map(function (_g389)
        local name = _g389[1]
        local exp = _g389[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g387)))
    end)()
    drop(environment)
    return(_g388)
  end, module = "core", export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g390 = sub(body, 0)
    local form = join({"fn", args}, _g390)
    local keys = sub(_g390, length(_g390))
    local _g391 = join((function ()
      local _g392 = {"setenv", join({"quote", name})}
      _g392.special = form
      _g392.form = join({"quote", form})
      return(_g392)
    end)(), keys)
    eval(_g391, current_module)
    return(nil)
  end, module = "core", export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g394 = 0
    local _g393 = elements
    while (_g394 < length(_g393)) do
      local e = _g393[(_g394 + 1)]
      l[e] = true
      _g394 = (_g394 + 1)
    end
    return(join({"table"}, l))
  end, module = "core", export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g395 = sub(body, 0)
    local _g396 = bind42(args, _g395)
    local _g397 = _g396[1]
    local _g398 = _g396[2]
    return(join({"%function", _g397}, _g398))
  end, module = "core", export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, module = "core", export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, module = "core", export = true}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, module = "core", export = true}, each = {macro = function (_g399, ...)
    local t = _g399[1]
    local k = _g399[2]
    local v = _g399[3]
    local body = unstash({...})
    local _g400 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g401 = {"target"}
      _g401.js = join({"isNaN", join({"parseInt", k})})
      _g401.lua = join({"not", join({"number?", k})})
      return(_g401)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g400)})})}))
  end, module = "core", export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g402 = sub(body, 0)
    add(environment, {})
    local _g403 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g402)))
    end)()
    drop(environment)
    return(_g403)
  end, module = "core", export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g404 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g404)}))
  end, module = "core", export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g405 = sub(body, 0)
    local form = join({"fn", args}, _g405)
    local _g406 = join((function ()
      local _g407 = {"setenv", join({"quote", name})}
      _g407.macro = form
      _g407.form = join({"quote", form})
      return(_g407)
    end)())
    eval(_g406, current_module)
    return(nil)
  end, module = "core", export = true}, across = {macro = function (_g408, ...)
    local l = _g408[1]
    local v = _g408[2]
    local i = _g408[3]
    local start = _g408[4]
    local body = unstash({...})
    local _g409 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g409, {join({"inc", i})}))})}))
  end, module = "core", export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g410 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g411 = {"table"}
      _g411._scope = scope
      return(_g411)
    end)())}), join({"let", join({x, join({"do"}, _g410)}), join({"drop", "environment"}), x})}))
  end, module = "core", export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g412 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g412)) then
      local _g413 = bind42(x, _g412)
      local args = _g413[1]
      local _g414 = _g413[2]
      return(join({"%global-function", name, args}, _g414))
    else
      return(join({"set", name, x}))
    end
  end, module = "core", export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g415 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g415)}))
  end, module = "core", export = true}, ["with-bindings"] = {macro = function (_g416, ...)
    local names = _g416[1]
    local body = unstash({...})
    local _g417 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g418 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g419 = {"setenv", x}
        _g419.variable = true
        return(_g419)
      end)())})}
      _g418.scope = true
      return(_g418)
    end)(), _g417))
  end, module = "core", export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, module = "core", export = true}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, module = "core", export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g420 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g420)}))
  end, module = "core", export = true}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g421 = xs
      while (i < length(_g421)) do
        local x = _g421[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, module = "core", export = true}, ["define-local"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g422 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g422)) then
      local _g423 = bind42(x, _g422)
      local args = _g423[1]
      local _g424 = _g423[2]
      return(join({"%local-function", name, args}, _g424))
    else
      return(join({"%local", name, x}))
    end
  end, module = "core", export = true}, language = {macro = function ()
    return(join({"quote", target}))
  end, module = "core", export = true}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["while"] = {stmt = true, module = "special", export = true, tr = true, special = function (_g425)
    local condition = _g425[1]
    local body = sub(_g425, 1)
    local _g426 = compile(condition)
    local _g427 = (function ()
      indent_level = (indent_level + 1)
      local _g428 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g428)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g426 .. ") {\n" .. _g427 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g426 .. " do\n" .. _g427 .. ind .. "end\n"))
    end
  end}, ["%local"] = {special = function (_g429)
    local name = _g429[1]
    local value = _g429[2]
    local id = compile(name)
    local _g430 = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. _g430))
  end, stmt = true, module = "special", export = true}, ["%function"] = {special = function (_g431)
    local args = _g431[1]
    local body = sub(_g431, 1)
    return(compile_function(args, body))
  end, module = "special", export = true}, ["error"] = {special = function (_g432)
    local x = _g432[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, stmt = true, module = "special", export = true}, ["not"] = {special = function (_g433)
    local x = _g433[1]
    local _g434 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g434 .. ")"))
  end, module = "special", export = true}, ["if"] = {stmt = true, module = "special", export = true, tr = true, special = function (form, tail63)
    local str = ""
    local i = 0
    local _g435 = form
    while (i < length(_g435)) do
      local condition = _g435[(i + 1)]
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
  end}, ["return"] = {special = function (_g436)
    local x = _g436[1]
    local _g437 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g437))
  end, stmt = true, module = "special", export = true}, ["%object"] = {special = function (forms)
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
    local _g438 = pairs
    while (i < length(_g438)) do
      local _g439 = _g438[(i + 1)]
      local k = _g439[1]
      local v = _g439[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g440 = compile(v)
      local _g441 = (function ()
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
      str = (str .. _g441 .. sep .. _g440)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special", export = true}, ["%for"] = {stmt = true, module = "special", export = true, tr = true, special = function (_g442)
    local _g443 = _g442[1]
    local t = _g443[1]
    local k = _g443[2]
    local body = sub(_g442, 1)
    local _g444 = compile(t)
    local ind = indentation()
    local _g445 = (function ()
      indent_level = (indent_level + 1)
      local _g446 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g446)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g444 .. " do\n" .. _g445 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g444 .. ") {\n" .. _g445 .. ind .. "}\n"))
    end
  end}, ["%local-function"] = {stmt = true, module = "special", export = true, tr = true, special = function (_g447)
    local name = _g447[1]
    local args = _g447[2]
    local body = sub(_g447, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end}, ["set"] = {special = function (_g448)
    local lh = _g448[1]
    local rh = _g448[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, stmt = true, module = "special", export = true}, ["%global-function"] = {stmt = true, module = "special", export = true, tr = true, special = function (_g449)
    local name = _g449[1]
    local args = _g449[2]
    local body = sub(_g449, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end}, ["break"] = {special = function (_g121)
    return((indentation() .. "break"))
  end, stmt = true, module = "special", export = true}, ["%try"] = {stmt = true, module = "special", export = true, tr = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g450 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g450)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g451 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g451)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end}, ["do"] = {stmt = true, module = "special", export = true, tr = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end}, ["%array"] = {special = function (forms)
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
    local _g452 = forms
    while (i < length(_g452)) do
      local x = _g452[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special", export = true}, ["get"] = {special = function (_g453)
    local t = _g453[1]
    local k = _g453[2]
    local _g454 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g454, 0) == "{")) then
      _g454 = ("(" .. _g454 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g454 .. "." .. inner(k)))
    else
      return((_g454 .. "[" .. k1 .. "]"))
    end
  end, module = "special", export = true}}}, utilities = {import = {"runtime", "special", "core"}, export = {setenv = {export = true, module = "utilities", variable = true}, getenv = {export = true, module = "utilities", variable = true}, ["macro-function"] = {export = true, module = "utilities", variable = true}, ["macro?"] = {export = true, module = "utilities", variable = true}, ["special?"] = {export = true, module = "utilities", variable = true}, ["special-form?"] = {export = true, module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, module = "utilities", variable = true}, ["symbol?"] = {export = true, module = "utilities", variable = true}, ["variable?"] = {export = true, module = "utilities", variable = true}, ["bound?"] = {export = true, module = "utilities", variable = true}, quoted = {export = true, module = "utilities", variable = true}, ["stash*"] = {export = true, module = "utilities", variable = true}, ["make-id"] = {}, bind = {export = true, module = "utilities", variable = true}, ["bind*"] = {export = true, module = "utilities", variable = true}, quasiexpand = {export = true, module = "utilities", variable = true}, macroexpand = {export = true, module = "utilities", variable = true}, indentation = {export = true, module = "utilities", variable = true}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["valid-id?"] = {export = true, module = "utilities", variable = true}, ["to-id"] = {export = true, module = "utilities", variable = true}, ["module-key"] = {export = true, module = "utilities", variable = true}, imported = {export = true, module = "utilities", variable = true}, exported = {export = true, module = "utilities", variable = true}, ["quote-environment"] = {export = true, module = "utilities", variable = true}, ["quote-modules"] = {export = true, module = "utilities", variable = true}, ["initial-environment"] = {export = true, module = "utilities", variable = true}, ["indent-level"] = {global = true, export = true, module = "utilities"}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["read-table"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g455, ...)
    local char = _g455[1]
    local stream = _g455[2]
    local body = unstash({...})
    local _g456 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g456)}))
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, module = "runtime", variable = true}, ["is?"] = {export = true, module = "runtime", variable = true}, length = {export = true, module = "runtime", variable = true}, ["empty?"] = {export = true, module = "runtime", variable = true}, ["some?"] = {export = true, module = "runtime", variable = true}, substring = {export = true, module = "runtime", variable = true}, sublist = {export = true, module = "runtime", variable = true}, hd = {export = true, module = "runtime", variable = true}, ["string?"] = {export = true, module = "runtime", variable = true}, ["number?"] = {export = true, module = "runtime", variable = true}, ["boolean?"] = {export = true, module = "runtime", variable = true}, ["function?"] = {export = true, module = "runtime", variable = true}, ["composite?"] = {export = true, module = "runtime", variable = true}, ["atom?"] = {export = true, module = "runtime", variable = true}, ["table?"] = {export = true, module = "runtime", variable = true}, ["list?"] = {export = true, module = "runtime", variable = true}, sub = {export = true, module = "runtime", variable = true}, inner = {export = true, module = "runtime", variable = true}, tl = {export = true, module = "runtime", variable = true}, char = {export = true, module = "runtime", variable = true}, code = {export = true, module = "runtime", variable = true}, ["string-literal?"] = {export = true, module = "runtime", variable = true}, ["id-literal?"] = {export = true, module = "runtime", variable = true}, add = {export = true, module = "runtime", variable = true}, drop = {export = true, module = "runtime", variable = true}, last = {export = true, module = "runtime", variable = true}, reverse = {export = true, module = "runtime", variable = true}, join = {export = true, module = "runtime", variable = true}, reduce = {export = true, module = "runtime", variable = true}, keep = {export = true, module = "runtime", variable = true}, find = {export = true, module = "runtime", variable = true}, pairwise = {export = true, module = "runtime", variable = true}, iterate = {export = true, module = "runtime", variable = true}, replicate = {export = true, module = "runtime", variable = true}, splice = {export = true, module = "runtime", variable = true}, map = {export = true, module = "runtime", variable = true}, ["map*"] = {export = true, module = "runtime", variable = true}, mapt = {export = true, module = "runtime", variable = true}, mapo = {export = true, module = "runtime", variable = true}, ["keys?"] = {export = true, module = "runtime", variable = true}, stash = {export = true, module = "runtime", variable = true}, unstash = {export = true, module = "runtime", variable = true}, extend = {export = true, module = "runtime", variable = true}, exclude = {export = true, module = "runtime", variable = true}, search = {export = true, module = "runtime", variable = true}, split = {export = true, module = "runtime", variable = true}, cat = {export = true, module = "runtime", variable = true}, ["+"] = {export = true, module = "runtime", variable = true}, ["-"] = {export = true, module = "runtime", variable = true}, ["*"] = {export = true, module = "runtime", variable = true}, ["/"] = {export = true, module = "runtime", variable = true}, ["%"] = {export = true, module = "runtime", variable = true}, [">"] = {export = true, module = "runtime", variable = true}, ["<"] = {export = true, module = "runtime", variable = true}, ["="] = {export = true, module = "runtime", variable = true}, [">="] = {export = true, module = "runtime", variable = true}, ["<="] = {export = true, module = "runtime", variable = true}, ["read-file"] = {export = true, module = "runtime", variable = true}, ["write-file"] = {export = true, module = "runtime", variable = true}, print = {}, write = {export = true, module = "runtime", variable = true}, exit = {export = true, module = "runtime", variable = true}, ["parse-number"] = {export = true, module = "runtime", variable = true}, ["to-string"] = {export = true, module = "runtime", variable = true}, apply = {export = true, module = "runtime", variable = true}, ["%message-handler"] = {export = true, module = "runtime", variable = true}}}, lib = {import = {"core", "special"}, export = {}}, boot = {import = {"runtime", "utilities", "special", "core"}, export = {}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g457 = sub(body, 0)
    local imports = {}
    local imp = _g457.import
    local exp = _g457.export
    local _g459 = 0
    local _g458 = (imp or {})
    while (_g459 < length(_g458)) do
      local k = _g458[(_g459 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g459 = (_g459 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g461 = 0
    local _g460 = (exp or {})
    while (_g461 < length(_g460)) do
      local k = _g460[(_g461 + 1)]
      setenv(k, {_stash = true, export = true})
      _g461 = (_g461 + 1)
    end
    return(join({"do"}, imports))
  end, module = "compiler", export = true}}}
  return
end)();
(function ()
  local _g36 = nexus.runtime
  local nil63 = _g36["nil?"]
  local is63 = _g36["is?"]
  local length = _g36.length
  local empty63 = _g36["empty?"]
  local some63 = _g36["some?"]
  local substring = _g36.substring
  local sublist = _g36.sublist
  local hd = _g36.hd
  local string63 = _g36["string?"]
  local number63 = _g36["number?"]
  local boolean63 = _g36["boolean?"]
  local function63 = _g36["function?"]
  local composite63 = _g36["composite?"]
  local atom63 = _g36["atom?"]
  local table63 = _g36["table?"]
  local list63 = _g36["list?"]
  local sub = _g36.sub
  local inner = _g36.inner
  local tl = _g36.tl
  local char = _g36.char
  local code = _g36.code
  local string_literal63 = _g36["string-literal?"]
  local id_literal63 = _g36["id-literal?"]
  local add = _g36.add
  local drop = _g36.drop
  local last = _g36.last
  local reverse = _g36.reverse
  local join = _g36.join
  local reduce = _g36.reduce
  local keep = _g36.keep
  local find = _g36.find
  local pairwise = _g36.pairwise
  local iterate = _g36.iterate
  local replicate = _g36.replicate
  local splice = _g36.splice
  local map = _g36.map
  local map42 = _g36["map*"]
  local mapt = _g36.mapt
  local mapo = _g36.mapo
  local keys63 = _g36["keys?"]
  local stash = _g36.stash
  local unstash = _g36.unstash
  local extend = _g36.extend
  local exclude = _g36.exclude
  local search = _g36.search
  local split = _g36.split
  local cat = _g36.cat
  local _43 = _g36["+"]
  local _ = _g36["-"]
  local _42 = _g36["*"]
  local _47 = _g36["/"]
  local _37 = _g36["%"]
  local _62 = _g36[">"]
  local _60 = _g36["<"]
  local _61 = _g36["="]
  local _6261 = _g36[">="]
  local _6061 = _g36["<="]
  local read_file = _g36["read-file"]
  local write_file = _g36["write-file"]
  local print = _g36.print
  local write = _g36.write
  local exit = _g36.exit
  local parse_number = _g36["parse-number"]
  local to_string = _g36["to-string"]
  local apply = _g36.apply
  local _37message_handler = _g36["%message-handler"]
  local _g75 = nexus.utilities
  local setenv = _g75.setenv
  local getenv = _g75.getenv
  local macro_function = _g75["macro-function"]
  local macro63 = _g75["macro?"]
  local special63 = _g75["special?"]
  local special_form63 = _g75["special-form?"]
  local symbol_expansion = _g75["symbol-expansion"]
  local symbol63 = _g75["symbol?"]
  local variable63 = _g75["variable?"]
  local bound63 = _g75["bound?"]
  local quoted = _g75.quoted
  local stash42 = _g75["stash*"]
  local bind = _g75.bind
  local bind42 = _g75["bind*"]
  local quasiexpand = _g75.quasiexpand
  local macroexpand = _g75.macroexpand
  local indentation = _g75.indentation
  local valid_id63 = _g75["valid-id?"]
  local to_id = _g75["to-id"]
  local module_key = _g75["module-key"]
  local imported = _g75.imported
  local exported = _g75.exported
  local quote_environment = _g75["quote-environment"]
  local quote_modules = _g75["quote-modules"]
  local initial_environment = _g75["initial-environment"]
  local _g83 = nexus.reader
  local make_stream = _g83["make-stream"]
  local read_table = _g83["read-table"]
  local read = _g83.read
  local read_all = _g83["read-all"]
  local read_from_string = _g83["read-from-string"]
  local _g120 = nexus.compiler
  local compile_body = _g120["compile-body"]
  local compile_call = _g120["compile-call"]
  local compile_branch = _g120["compile-branch"]
  local compile_function = _g120["compile-function"]
  local compile_special = _g120["compile-special"]
  local compile = _g120.compile
  local eval = _g120.eval
  local load_module = _g120["load-module"]
  local open_module = _g120["open-module"]
  local in_module = _g120["in-module"]
  local function rep(str, spec)
    local _g463 = (function ()
      local _g464,_g465 = xpcall(function ()
        return(eval(read_from_string(str), spec))
      end, _37message_handler)
      return({_g464, _g465})
    end)()
    local _g1 = _g463[1]
    local x = _g463[2]
    if is63(x) then
      return(print((to_string(x) .. " ")))
    end
  end
  local function repl(spec)
    local step = function (str)
      rep(str, spec)
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
  local function usage()
    print((to_string("usage: lumen [options] <module>") .. " "))
    print((to_string("options:") .. " "))
    print((to_string("  -o <output>\tOutput file") .. " "))
    print((to_string("  -t <target>\tTarget language (default: lua)") .. " "))
    print((to_string("  -e <expr>\tExpression to evaluate") .. " "))
    return(exit())
  end
  local function main()
    local args = arg
    if ((hd(args) == "-h") or (hd(args) == "--help")) then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local i = 0
    local _g466 = args
    while (i < length(_g466)) do
      local arg = _g466[(i + 1)]
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
      return(write_file(output, compile_module(spec)))
    else
      local _g467 = (spec or "main")
      in_module(_g467)
      if expr then
        return(rep(expr, _g467))
      else
        return(repl(_g467))
      end
    end
  end
  main()
  return
end)();
