(function ()
  nexus = {}
end)();
(function ()
  function length(x)
    return(#x)
  end
  function empty63(x)
    return((length(x) == 0))
  end
  function some63(x)
    return((length(x) > 0))
  end
  function substring(str, from, upto)
    return((string.sub)(str, (from + 1), upto))
  end
  function sublist(l, from, upto)
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
  function sub(x, from, upto)
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
  function find(f, l)
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
  local function splice63(x)
    if table63(x) then
      return(x._splice)
    end
  end
  function map(f, l)
    local l1 = {}
    local _g15 = 0
    local _g14 = l
    while (_g15 < length(_g14)) do
      local x = _g14[(_g15 + 1)]
      local x1 = f(x)
      local s = splice63(x1)
      if list63(s) then
        l1 = join(l1, s)
      elseif is63(s) then
        add(l1, s)
      elseif is63(x1) then
        add(l1, x1)
      end
      _g15 = (_g15 + 1)
    end
    return(l1)
  end
  function map42(f, t)
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
  function mapt(f, t)
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
  function mapo(f, t)
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
  function keys63(t)
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
  function extend(t, ...)
    local xs = unstash({...})
    local _g20 = sub(xs, 0)
    return(join(t, _g20))
  end
  function exclude(t, ...)
    local keys = unstash({...})
    local _g21 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g22 = t
    for k in next, _g22 do
      if (not number63(k)) then
        local v = _g22[k]
        if (not _g21[k]) then
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
    local _g23 = (function ()
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
    local _g24 = sub(xs, 0)
    if empty63(_g24) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g24))
    end
  end
  function _43(...)
    local xs = unstash({...})
    local _g25 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g25))
  end
  function _(...)
    local xs = unstash({...})
    local _g26 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g26)))
  end
  function _42(...)
    local xs = unstash({...})
    local _g27 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g27))
  end
  function _47(...)
    local xs = unstash({...})
    local _g28 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g28)))
  end
  function _37(...)
    local xs = unstash({...})
    local _g29 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g29)))
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
      local _g30 = x
      for k in next, _g30 do
        if (not number63(k)) then
          local v = _g30[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g31 = x1
      while (i < length(_g31)) do
        local y = _g31[(i + 1)]
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
    local _g32 = stash(args)
    return(f(unpack(_g32)))
  end
  function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local k = nil
      local _g33 = args
      for k in next, _g33 do
        if (not number63(k)) then
          local v = _g33[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
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
        local _g34 = l
        for k in next, _g34 do
          if (not number63(k)) then
            local v = _g34[k]
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
  function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  _g35 = {}
  nexus.runtime = _g35
  _g35.sub = sub
  _g35.char = char
  _g35.tl = tl
  _g35.keep = keep
  _g35.last = last
  _g35.drop = drop
  _g35.stash = stash
  _g35.iterate = iterate
  _g35.map = map
  _g35["read-file"] = read_file
  _g35[">="] = _6261
  _g35.cat = cat
  _g35["nil?"] = nil63
  _g35.unstash = unstash
  _g35.search = search
  _g35.apply = apply
  _g35.code = code
  _g35["to-string"] = to_string
  _g35.length = length
  _g35["parse-number"] = parse_number
  _g35["list?"] = list63
  _g35["keys?"] = keys63
  _g35.write = write
  _g35["composite?"] = composite63
  _g35.reverse = reverse
  _g35["%"] = _37
  _g35["function?"] = function63
  _g35.splice = splice
  _g35["boolean?"] = boolean63
  _g35.find = find
  _g35["write-file"] = write_file
  _g35["string-literal?"] = string_literal63
  _g35["-"] = _
  _g35.inner = inner
  _g35["="] = _61
  _g35.add = add
  _g35["id-literal?"] = id_literal63
  _g35.extend = extend
  _g35["<="] = _6061
  _g35["map*"] = map42
  _g35.exit = exit
  _g35["<"] = _60
  _g35[">"] = _62
  _g35["/"] = _47
  _g35["*"] = _42
  _g35["string?"] = string63
  _g35["+"] = _43
  _g35.split = split
  _g35.exclude = exclude
  _g35.substring = substring
  _g35["atom?"] = atom63
  _g35.mapo = mapo
  _g35.mapt = mapt
  _g35.replicate = replicate
  _g35.pairwise = pairwise
  _g35["number?"] = number63
  _g35["is?"] = is63
  _g35.hd = hd
  _g35.join = join
  _g35["table?"] = table63
  _g35.sublist = sublist
  _g35.reduce = reduce
  _g35["some?"] = some63
  _g35["empty?"] = empty63
  _g35["%message-handler"] = _37message_handler
end)();
(function ()
  local _g42 = nexus.runtime
  local sub = _g42.sub
  local _43 = _g42["+"]
  local _ = _g42["-"]
  local char = _g42.char
  local find = _g42.find
  local tl = _g42.tl
  local keep = _g42.keep
  local pairwise = _g42.pairwise
  local last = _g42.last
  local drop = _g42.drop
  local stash = _g42.stash
  local _60 = _g42["<"]
  local iterate = _g42.iterate
  local parse_number = _g42["parse-number"]
  local read_file = _g42["read-file"]
  local keys63 = _g42["keys?"]
  local _6261 = _g42[">="]
  local function63 = _g42["function?"]
  local list63 = _g42["list?"]
  local nil63 = _g42["nil?"]
  local join = _g42.join
  local some63 = _g42["some?"]
  local sublist = _g42.sublist
  local search = _g42.search
  local code = _g42.code
  local length = _g42.length
  local write = _g42.write
  local reverse = _g42.reverse
  local _37 = _g42["%"]
  local replicate = _g42.replicate
  local splice = _g42.splice
  local boolean63 = _g42["boolean?"]
  local apply = _g42.apply
  local add = _g42.add
  local id_literal63 = _g42["id-literal?"]
  local extend = _g42.extend
  local map42 = _g42["map*"]
  local exit = _g42.exit
  local string63 = _g42["string?"]
  local exclude = _g42.exclude
  local substring = _g42.substring
  local atom63 = _g42["atom?"]
  local number63 = _g42["number?"]
  local map = _g42.map
  local _42 = _g42["*"]
  local write_file = _g42["write-file"]
  local is63 = _g42["is?"]
  local split = _g42.split
  local _62 = _g42[">"]
  local hd = _g42.hd
  local _47 = _g42["/"]
  local _61 = _g42["="]
  local table63 = _g42["table?"]
  local mapo = _g42.mapo
  local mapt = _g42.mapt
  local composite63 = _g42["composite?"]
  local reduce = _g42.reduce
  local empty63 = _g42["empty?"]
  local string_literal63 = _g42["string-literal?"]
  local to_string = _g42["to-string"]
  local unstash = _g42.unstash
  local _6061 = _g42["<="]
  local inner = _g42.inner
  local cat = _g42.cat
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
  local reserved = {["local"] = true, ["case"] = true, ["if"] = true, ["else"] = true, [">"] = true, ["elseif"] = true, ["try"] = true, ["break"] = true, ["until"] = true, ["or"] = true, ["finally"] = true, ["=="] = true, ["nil"] = true, ["new"] = true, ["for"] = true, ["in"] = true, ["default"] = true, ["end"] = true, ["="] = true, ["void"] = true, ["while"] = true, ["delete"] = true, ["true"] = true, ["catch"] = true, ["do"] = true, ["function"] = true, ["false"] = true, ["return"] = true, ["<"] = true, ["not"] = true, ["debugger"] = true, ["typeof"] = true, ["instanceof"] = true, ["throw"] = true, [">="] = true, ["/"] = true, ["%"] = true, ["repeat"] = true, ["-"] = true, ["<="] = true, ["+"] = true, ["var"] = true, ["and"] = true, ["then"] = true, ["this"] = true, ["with"] = true, ["switch"] = true, ["*"] = true, ["continue"] = true}
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
    local _g69 = toplevel
    for n in next, _g69 do
      if (not number63(n)) then
        local b = _g69[n]
        if (b.variable and b.export and (b.module == current_module)) then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({"do", join({"define", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  function imported(k)
    local imports = {}
    local x = nexus[k]
    if (x and keys63(x)) then
      local m = make_id()
      add(imports, join({"%local", m, join({"get", "nexus", join({"quote", k})})}))
      local b = nil
      local _g70 = x
      for b in next, _g70 do
        if (not number63(b)) then
          local _g40 = _g70[b]
          add(imports, join({"%local", b, join({"get", m, join({"quote", b})})}))
        end
      end
      return(join({"do"}, imports))
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
      local _g71 = {"table"}
      _g71.export = quote_frame(m.export)
      _g71.import = quoted(m.import)
      return(_g71)
    end)()))
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  _g72 = {}
  nexus.utilities = _g72
  _g72["to-id"] = to_id
  _g72["symbol-expansion"] = symbol_expansion
  _g72["bind*"] = bind42
  _g72["initial-environment"] = initial_environment
  _g72["valid-id?"] = valid_id63
  _g72["stash*"] = stash42
  _g72["macro?"] = macro63
  _g72["quote-modules"] = quote_modules
  _g72.setenv = setenv
  _g72.getenv = getenv
  _g72.quoted = quoted
  _g72["special?"] = special63
  _g72["symbol?"] = symbol63
  _g72.quasiexpand = quasiexpand
  _g72.indentation = indentation
  _g72.macroexpand = macroexpand
  _g72["quote-environment"] = quote_environment
  _g72.exported = exported
  _g72.imported = imported
  _g72["module-key"] = module_key
  _g72.bind = bind
  _g72["bound?"] = bound63
  _g72["variable?"] = variable63
  _g72["special-form?"] = special_form63
  _g72["macro-function"] = macro_function
end)();
(function ()
  local _g74 = nexus.runtime
  local sub = _g74.sub
  local _43 = _g74["+"]
  local _ = _g74["-"]
  local char = _g74.char
  local find = _g74.find
  local tl = _g74.tl
  local keep = _g74.keep
  local pairwise = _g74.pairwise
  local last = _g74.last
  local drop = _g74.drop
  local stash = _g74.stash
  local _60 = _g74["<"]
  local iterate = _g74.iterate
  local parse_number = _g74["parse-number"]
  local read_file = _g74["read-file"]
  local keys63 = _g74["keys?"]
  local _6261 = _g74[">="]
  local function63 = _g74["function?"]
  local list63 = _g74["list?"]
  local nil63 = _g74["nil?"]
  local join = _g74.join
  local some63 = _g74["some?"]
  local sublist = _g74.sublist
  local search = _g74.search
  local code = _g74.code
  local length = _g74.length
  local write = _g74.write
  local reverse = _g74.reverse
  local _37 = _g74["%"]
  local replicate = _g74.replicate
  local splice = _g74.splice
  local boolean63 = _g74["boolean?"]
  local apply = _g74.apply
  local add = _g74.add
  local id_literal63 = _g74["id-literal?"]
  local extend = _g74.extend
  local map42 = _g74["map*"]
  local exit = _g74.exit
  local string63 = _g74["string?"]
  local exclude = _g74.exclude
  local substring = _g74.substring
  local atom63 = _g74["atom?"]
  local number63 = _g74["number?"]
  local map = _g74.map
  local _42 = _g74["*"]
  local write_file = _g74["write-file"]
  local is63 = _g74["is?"]
  local split = _g74.split
  local _62 = _g74[">"]
  local hd = _g74.hd
  local _47 = _g74["/"]
  local _61 = _g74["="]
  local table63 = _g74["table?"]
  local mapo = _g74.mapo
  local mapt = _g74.mapt
  local composite63 = _g74["composite?"]
  local reduce = _g74.reduce
  local empty63 = _g74["empty?"]
  local string_literal63 = _g74["string-literal?"]
  local to_string = _g74["to-string"]
  local unstash = _g74.unstash
  local _6061 = _g74["<="]
  local inner = _g74.inner
  local cat = _g74.cat
  local _37message_handler = _g74["%message-handler"]
  local delimiters = {["("] = true, ["\n"] = true, [")"] = true, [";"] = true}
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
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
  _g78 = {}
  nexus.reader = _g78
  _g78.read = read
  _g78["make-stream"] = make_stream
  _g78["read-all"] = read_all
  _g78["read-from-string"] = read_from_string
  _g78["read-table"] = read_table
end)();
(function ()
  local _g80 = nexus.runtime
  local sub = _g80.sub
  local _43 = _g80["+"]
  local _ = _g80["-"]
  local char = _g80.char
  local find = _g80.find
  local tl = _g80.tl
  local keep = _g80.keep
  local pairwise = _g80.pairwise
  local last = _g80.last
  local drop = _g80.drop
  local stash = _g80.stash
  local _60 = _g80["<"]
  local iterate = _g80.iterate
  local parse_number = _g80["parse-number"]
  local read_file = _g80["read-file"]
  local keys63 = _g80["keys?"]
  local _6261 = _g80[">="]
  local function63 = _g80["function?"]
  local list63 = _g80["list?"]
  local nil63 = _g80["nil?"]
  local join = _g80.join
  local some63 = _g80["some?"]
  local sublist = _g80.sublist
  local search = _g80.search
  local code = _g80.code
  local length = _g80.length
  local write = _g80.write
  local reverse = _g80.reverse
  local _37 = _g80["%"]
  local replicate = _g80.replicate
  local splice = _g80.splice
  local boolean63 = _g80["boolean?"]
  local apply = _g80.apply
  local add = _g80.add
  local id_literal63 = _g80["id-literal?"]
  local extend = _g80.extend
  local map42 = _g80["map*"]
  local exit = _g80.exit
  local string63 = _g80["string?"]
  local exclude = _g80.exclude
  local substring = _g80.substring
  local atom63 = _g80["atom?"]
  local number63 = _g80["number?"]
  local map = _g80.map
  local _42 = _g80["*"]
  local write_file = _g80["write-file"]
  local is63 = _g80["is?"]
  local split = _g80.split
  local _62 = _g80[">"]
  local hd = _g80.hd
  local _47 = _g80["/"]
  local _61 = _g80["="]
  local table63 = _g80["table?"]
  local mapo = _g80.mapo
  local mapt = _g80.mapt
  local composite63 = _g80["composite?"]
  local reduce = _g80.reduce
  local empty63 = _g80["empty?"]
  local string_literal63 = _g80["string-literal?"]
  local to_string = _g80["to-string"]
  local unstash = _g80.unstash
  local _6061 = _g80["<="]
  local inner = _g80.inner
  local cat = _g80.cat
  local _37message_handler = _g80["%message-handler"]
  local _g81 = nexus.utilities
  local quote_modules = _g81["quote-modules"]
  local symbol63 = _g81["symbol?"]
  local quasiexpand = _g81.quasiexpand
  local module_key = _g81["module-key"]
  local variable63 = _g81["variable?"]
  local bind42 = _g81["bind*"]
  local initial_environment = _g81["initial-environment"]
  local valid_id63 = _g81["valid-id?"]
  local bind = _g81.bind
  local bound63 = _g81["bound?"]
  local indentation = _g81.indentation
  local macro_function = _g81["macro-function"]
  local to_id = _g81["to-id"]
  local quoted = _g81.quoted
  local exported = _g81.exported
  local setenv = _g81.setenv
  local macro63 = _g81["macro?"]
  local symbol_expansion = _g81["symbol-expansion"]
  local macroexpand = _g81.macroexpand
  local stash42 = _g81["stash*"]
  local special_form63 = _g81["special-form?"]
  local special63 = _g81["special?"]
  local getenv = _g81.getenv
  local quote_environment = _g81["quote-environment"]
  local imported = _g81.imported
  local _g82 = nexus.reader
  local make_stream = _g82["make-stream"]
  local read_table = _g82["read-table"]
  local read = _g82.read
  local read_from_string = _g82["read-from-string"]
  local read_all = _g82["read-all"]
  local infix = {common = {["*"] = true, ["+"] = true, ["<"] = true, ["-"] = true, [">"] = true, ["/"] = true, ["%"] = true, [">="] = true, ["<="] = true}, lua = {["or"] = true, ["and"] = true, ["="] = "==", ["~="] = true, cat = ".."}, js = {["or"] = "||", ["and"] = "&&", ["~="] = "!=", ["="] = "===", cat = "+"}}
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
    local _g83 = args
    while (i < length(_g83)) do
      local arg = _g83[(i + 1)]
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
    local _g84 = unstash({...})
    local tail63 = _g84["tail?"]
    local str = ""
    local i = 0
    local _g85 = forms
    while (i < length(_g85)) do
      local x = _g85[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, ["tail?"] = t63, ["stmt?"] = true}))
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
  local function compile_infix(_g86)
    local op = _g86[1]
    local args = sub(_g86, 1)
    local str = "("
    local _g87 = getop(op)
    local i = 0
    local _g88 = args
    while (i < length(_g88)) do
      local arg = _g88[(i + 1)]
      if ((_g87 == "-") and (length(args) == 1)) then
        str = (str .. _g87 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g87 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g89 = (function ()
      indent_level = (indent_level + 1)
      local _g90 = compile(body, {_stash = true, ["tail?"] = tail63, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g90)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g89 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g89 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g89 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g89 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g89 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g89 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g91 = unstash({...})
    local name = _g91.name
    local prefix = _g91.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g92 = (prefix or "")
    local _g93 = compile_args(args)
    local _g94 = (function ()
      indent_level = (indent_level + 1)
      local _g95 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g95)
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
      return(("function " .. id .. _g93 .. " {\n" .. _g94 .. ind .. "}" .. tr))
    else
      return((_g92 .. "function " .. id .. _g93 .. "\n" .. _g94 .. ind .. tr))
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
    local _g96 = getenv(hd(form))
    local stmt = _g96.stmt
    local special = _g96.special
    local self_tr63 = _g96.tr
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
    local _g97 = unstash({...})
    local tail63 = _g97["tail?"]
    local stmt63 = _g97["stmt?"]
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
      local _g98 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g98 .. tr))
    end
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
  function eval(form)
    local previous = target
    target = "lua"
    local str = compile(macroexpand(form))
    target = previous
    return(run(str))
  end
  current_module = nil
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g99 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g99, {epilog}))}))
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return((compile(form) .. ";\n"))
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
    local _g109 = toplevel
    for name in next, _g109 do
      if (not number63(name)) then
        local binding = _g109[name]
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
    local _g110 = m.export
    for k in next, _g110 do
      if (not number63(k)) then
        local v = _g110[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  _g111 = {}
  nexus.compiler = _g111
  _g111["load-module"] = load_module
  _g111.compile = compile
  _g111.eval = eval
  _g111["in-module"] = in_module
  _g111["compile-body"] = compile_body
  _g111["compile-function"] = compile_function
  _g111["open-module"] = open_module
  _g111["compile-special"] = compile_special
  _g111["compile-branch"] = compile_branch
  _g111["compile-call"] = compile_call
end)();
(function ()
  local _g114 = nexus.runtime
  local sub = _g114.sub
  local _43 = _g114["+"]
  local _ = _g114["-"]
  local char = _g114.char
  local find = _g114.find
  local tl = _g114.tl
  local keep = _g114.keep
  local pairwise = _g114.pairwise
  local last = _g114.last
  local drop = _g114.drop
  local stash = _g114.stash
  local _60 = _g114["<"]
  local iterate = _g114.iterate
  local parse_number = _g114["parse-number"]
  local read_file = _g114["read-file"]
  local keys63 = _g114["keys?"]
  local _6261 = _g114[">="]
  local function63 = _g114["function?"]
  local list63 = _g114["list?"]
  local nil63 = _g114["nil?"]
  local join = _g114.join
  local some63 = _g114["some?"]
  local sublist = _g114.sublist
  local search = _g114.search
  local code = _g114.code
  local length = _g114.length
  local write = _g114.write
  local reverse = _g114.reverse
  local _37 = _g114["%"]
  local replicate = _g114.replicate
  local splice = _g114.splice
  local boolean63 = _g114["boolean?"]
  local apply = _g114.apply
  local add = _g114.add
  local id_literal63 = _g114["id-literal?"]
  local extend = _g114.extend
  local map42 = _g114["map*"]
  local exit = _g114.exit
  local string63 = _g114["string?"]
  local exclude = _g114.exclude
  local substring = _g114.substring
  local atom63 = _g114["atom?"]
  local number63 = _g114["number?"]
  local map = _g114.map
  local _42 = _g114["*"]
  local write_file = _g114["write-file"]
  local is63 = _g114["is?"]
  local split = _g114.split
  local _62 = _g114[">"]
  local hd = _g114.hd
  local _47 = _g114["/"]
  local _61 = _g114["="]
  local table63 = _g114["table?"]
  local mapo = _g114.mapo
  local mapt = _g114.mapt
  local composite63 = _g114["composite?"]
  local reduce = _g114.reduce
  local empty63 = _g114["empty?"]
  local string_literal63 = _g114["string-literal?"]
  local to_string = _g114["to-string"]
  local unstash = _g114.unstash
  local _6061 = _g114["<="]
  local inner = _g114.inner
  local cat = _g114.cat
  local _37message_handler = _g114["%message-handler"]
  local _g115 = nexus.utilities
  local quote_modules = _g115["quote-modules"]
  local symbol63 = _g115["symbol?"]
  local quasiexpand = _g115.quasiexpand
  local module_key = _g115["module-key"]
  local variable63 = _g115["variable?"]
  local bind42 = _g115["bind*"]
  local initial_environment = _g115["initial-environment"]
  local valid_id63 = _g115["valid-id?"]
  local bind = _g115.bind
  local bound63 = _g115["bound?"]
  local indentation = _g115.indentation
  local macro_function = _g115["macro-function"]
  local to_id = _g115["to-id"]
  local quoted = _g115.quoted
  local exported = _g115.exported
  local setenv = _g115.setenv
  local macro63 = _g115["macro?"]
  local symbol_expansion = _g115["symbol-expansion"]
  local macroexpand = _g115.macroexpand
  local stash42 = _g115["stash*"]
  local special_form63 = _g115["special-form?"]
  local special63 = _g115["special?"]
  local getenv = _g115.getenv
  local quote_environment = _g115["quote-environment"]
  local imported = _g115.imported
  local _g116 = nexus.compiler
  local compile_special = _g116["compile-special"]
  local load_module = _g116["load-module"]
  local compile_branch = _g116["compile-branch"]
  local compile_function = _g116["compile-function"]
  local compile_call = _g116["compile-call"]
  local in_module = _g116["in-module"]
  local eval = _g116.eval
  local open_module = _g116["open-module"]
  local compile_body = _g116["compile-body"]
  local compile = _g116.compile
end)();
(function ()
  local _g172 = nexus.runtime
  local sub = _g172.sub
  local _43 = _g172["+"]
  local _ = _g172["-"]
  local char = _g172.char
  local find = _g172.find
  local tl = _g172.tl
  local keep = _g172.keep
  local pairwise = _g172.pairwise
  local last = _g172.last
  local drop = _g172.drop
  local stash = _g172.stash
  local _60 = _g172["<"]
  local iterate = _g172.iterate
  local parse_number = _g172["parse-number"]
  local read_file = _g172["read-file"]
  local keys63 = _g172["keys?"]
  local _6261 = _g172[">="]
  local function63 = _g172["function?"]
  local list63 = _g172["list?"]
  local nil63 = _g172["nil?"]
  local join = _g172.join
  local some63 = _g172["some?"]
  local sublist = _g172.sublist
  local search = _g172.search
  local code = _g172.code
  local length = _g172.length
  local write = _g172.write
  local reverse = _g172.reverse
  local _37 = _g172["%"]
  local replicate = _g172.replicate
  local splice = _g172.splice
  local boolean63 = _g172["boolean?"]
  local apply = _g172.apply
  local add = _g172.add
  local id_literal63 = _g172["id-literal?"]
  local extend = _g172.extend
  local map42 = _g172["map*"]
  local exit = _g172.exit
  local string63 = _g172["string?"]
  local exclude = _g172.exclude
  local substring = _g172.substring
  local atom63 = _g172["atom?"]
  local number63 = _g172["number?"]
  local map = _g172.map
  local _42 = _g172["*"]
  local write_file = _g172["write-file"]
  local is63 = _g172["is?"]
  local split = _g172.split
  local _62 = _g172[">"]
  local hd = _g172.hd
  local _47 = _g172["/"]
  local _61 = _g172["="]
  local table63 = _g172["table?"]
  local mapo = _g172.mapo
  local mapt = _g172.mapt
  local composite63 = _g172["composite?"]
  local reduce = _g172.reduce
  local empty63 = _g172["empty?"]
  local string_literal63 = _g172["string-literal?"]
  local to_string = _g172["to-string"]
  local unstash = _g172.unstash
  local _6061 = _g172["<="]
  local inner = _g172.inner
  local cat = _g172.cat
  local _37message_handler = _g172["%message-handler"]
  local _g173 = nexus.utilities
  local quote_modules = _g173["quote-modules"]
  local symbol63 = _g173["symbol?"]
  local quasiexpand = _g173.quasiexpand
  local module_key = _g173["module-key"]
  local variable63 = _g173["variable?"]
  local bind42 = _g173["bind*"]
  local initial_environment = _g173["initial-environment"]
  local valid_id63 = _g173["valid-id?"]
  local bind = _g173.bind
  local bound63 = _g173["bound?"]
  local indentation = _g173.indentation
  local macro_function = _g173["macro-function"]
  local to_id = _g173["to-id"]
  local quoted = _g173.quoted
  local exported = _g173.exported
  local setenv = _g173.setenv
  local macro63 = _g173["macro?"]
  local symbol_expansion = _g173["symbol-expansion"]
  local macroexpand = _g173.macroexpand
  local stash42 = _g173["stash*"]
  local special_form63 = _g173["special-form?"]
  local special63 = _g173["special?"]
  local getenv = _g173.getenv
  local quote_environment = _g173["quote-environment"]
  local imported = _g173.imported
  target = "lua"
end)();
(function ()
  local _g246 = nexus.runtime
  local sub = _g246.sub
  local _43 = _g246["+"]
  local _ = _g246["-"]
  local char = _g246.char
  local find = _g246.find
  local tl = _g246.tl
  local keep = _g246.keep
  local pairwise = _g246.pairwise
  local last = _g246.last
  local drop = _g246.drop
  local stash = _g246.stash
  local _60 = _g246["<"]
  local iterate = _g246.iterate
  local parse_number = _g246["parse-number"]
  local read_file = _g246["read-file"]
  local keys63 = _g246["keys?"]
  local _6261 = _g246[">="]
  local function63 = _g246["function?"]
  local list63 = _g246["list?"]
  local nil63 = _g246["nil?"]
  local join = _g246.join
  local some63 = _g246["some?"]
  local sublist = _g246.sublist
  local search = _g246.search
  local code = _g246.code
  local length = _g246.length
  local write = _g246.write
  local reverse = _g246.reverse
  local _37 = _g246["%"]
  local replicate = _g246.replicate
  local splice = _g246.splice
  local boolean63 = _g246["boolean?"]
  local apply = _g246.apply
  local add = _g246.add
  local id_literal63 = _g246["id-literal?"]
  local extend = _g246.extend
  local map42 = _g246["map*"]
  local exit = _g246.exit
  local string63 = _g246["string?"]
  local exclude = _g246.exclude
  local substring = _g246.substring
  local atom63 = _g246["atom?"]
  local number63 = _g246["number?"]
  local map = _g246.map
  local _42 = _g246["*"]
  local write_file = _g246["write-file"]
  local is63 = _g246["is?"]
  local split = _g246.split
  local _62 = _g246[">"]
  local hd = _g246.hd
  local _47 = _g246["/"]
  local _61 = _g246["="]
  local table63 = _g246["table?"]
  local mapo = _g246.mapo
  local mapt = _g246.mapt
  local composite63 = _g246["composite?"]
  local reduce = _g246.reduce
  local empty63 = _g246["empty?"]
  local string_literal63 = _g246["string-literal?"]
  local to_string = _g246["to-string"]
  local unstash = _g246.unstash
  local _6061 = _g246["<="]
  local inner = _g246.inner
  local cat = _g246.cat
  local _37message_handler = _g246["%message-handler"]
  local _g247 = nexus.utilities
  local quote_modules = _g247["quote-modules"]
  local symbol63 = _g247["symbol?"]
  local quasiexpand = _g247.quasiexpand
  local module_key = _g247["module-key"]
  local variable63 = _g247["variable?"]
  local bind42 = _g247["bind*"]
  local initial_environment = _g247["initial-environment"]
  local valid_id63 = _g247["valid-id?"]
  local bind = _g247.bind
  local bound63 = _g247["bound?"]
  local indentation = _g247.indentation
  local macro_function = _g247["macro-function"]
  local to_id = _g247["to-id"]
  local quoted = _g247.quoted
  local exported = _g247.exported
  local setenv = _g247.setenv
  local macro63 = _g247["macro?"]
  local symbol_expansion = _g247["symbol-expansion"]
  local macroexpand = _g247.macroexpand
  local stash42 = _g247["stash*"]
  local special_form63 = _g247["special-form?"]
  local special63 = _g247["special?"]
  local getenv = _g247.getenv
  local quote_environment = _g247["quote-environment"]
  local imported = _g247.imported
  modules = {special = {export = {["set"] = {stmt = true, module = "special", special = function (_g248)
    local lh = _g248[1]
    local rh = _g248[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true}, ["%array"] = {module = "special", special = function (forms)
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
    local _g249 = forms
    while (i < length(_g249)) do
      local x = _g249[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true}, ["%try"] = {module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g250 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g250)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g251 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g251)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, stmt = true, export = true, tr = true}, ["break"] = {stmt = true, module = "special", special = function (_g113)
    return((indentation() .. "break"))
  end, export = true}, ["%function"] = {module = "special", special = function (_g252)
    local args = _g252[1]
    local body = sub(_g252, 1)
    return(compile_function(args, body))
  end, export = true}, ["%local"] = {stmt = true, module = "special", special = function (_g253)
    local name = _g253[1]
    local value = _g253[2]
    local id = compile(name)
    local _g254 = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. _g254))
  end, export = true}, ["%object"] = {module = "special", special = function (forms)
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
    local _g255 = pairs
    while (i < length(_g255)) do
      local _g256 = _g255[(i + 1)]
      local k = _g256[1]
      local v = _g256[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g257 = compile(v)
      local _g258 = (function ()
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
      str = (str .. _g258 .. sep .. _g257)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true}, ["while"] = {module = "special", special = function (_g259)
    local condition = _g259[1]
    local body = sub(_g259, 1)
    local _g260 = compile(condition)
    local _g261 = (function ()
      indent_level = (indent_level + 1)
      local _g262 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g262)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g260 .. ") {\n" .. _g261 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g260 .. " do\n" .. _g261 .. ind .. "end\n"))
    end
  end, stmt = true, export = true, tr = true}, ["return"] = {stmt = true, module = "special", special = function (_g263)
    local x = _g263[1]
    local _g264 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g264))
  end, export = true}, ["%global-function"] = {module = "special", special = function (_g265)
    local name = _g265[1]
    local args = _g265[2]
    local body = sub(_g265, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end, stmt = true, export = true, tr = true}, ["not"] = {module = "special", special = function (_g266)
    local x = _g266[1]
    local _g267 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g267 .. ")"))
  end, export = true}, ["%local-function"] = {module = "special", special = function (_g268)
    local name = _g268[1]
    local args = _g268[2]
    local body = sub(_g268, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, stmt = true, export = true, tr = true}, ["%for"] = {module = "special", special = function (_g269)
    local _g270 = _g269[1]
    local t = _g270[1]
    local k = _g270[2]
    local body = sub(_g269, 1)
    local _g271 = compile(t)
    local ind = indentation()
    local _g272 = (function ()
      indent_level = (indent_level + 1)
      local _g273 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g273)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g271 .. " do\n" .. _g272 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g271 .. ") {\n" .. _g272 .. ind .. "}\n"))
    end
  end, stmt = true, export = true, tr = true}, ["get"] = {module = "special", special = function (_g274)
    local t = _g274[1]
    local k = _g274[2]
    local _g275 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g275, 0) == "{")) then
      _g275 = ("(" .. _g275 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g275 .. "." .. inner(k)))
    else
      return((_g275 .. "[" .. k1 .. "]"))
    end
  end, export = true}, ["if"] = {module = "special", special = function (form, tail63)
    local str = ""
    local i = 0
    local _g276 = form
    while (i < length(_g276)) do
      local condition = _g276[(i + 1)]
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
  end, stmt = true, export = true, tr = true}, ["error"] = {stmt = true, module = "special", special = function (_g277)
    local x = _g277[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true}, ["do"] = {module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end, stmt = true, export = true, tr = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, reader = {export = {["read-all"] = {module = "reader", export = true, variable = true}, ["read-table"] = {module = "reader", export = true, variable = true}, ["define-reader"] = {module = "reader", export = true, macro = function (_g278, ...)
    local char = _g278[1]
    local stream = _g278[2]
    local body = unstash({...})
    local _g279 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g279)}))
  end}, ["read-from-string"] = {module = "reader", export = true, variable = true}, read = {module = "reader", export = true, variable = true}, ["make-stream"] = {module = "reader", export = true, variable = true}}, import = {"runtime", "special", "core"}}, lib = {export = {}, import = {"core", "special"}}, runtime = {export = {["*"] = {module = "runtime", export = true, variable = true}, ["+"] = {module = "runtime", export = true, variable = true}, ["-"] = {module = "runtime", export = true, variable = true}, ["/"] = {module = "runtime", export = true, variable = true}, find = {module = "runtime", export = true, variable = true}, tl = {module = "runtime", export = true, variable = true}, mapo = {module = "runtime", export = true, variable = true}, pairwise = {module = "runtime", export = true, variable = true}, last = {module = "runtime", export = true, variable = true}, drop = {module = "runtime", export = true, variable = true}, stash = {module = "runtime", export = true, variable = true}, ["<"] = {module = "runtime", export = true, variable = true}, ["="] = {module = "runtime", export = true, variable = true}, [">"] = {module = "runtime", export = true, variable = true}, ["read-file"] = {module = "runtime", export = true, variable = true}, ["keys?"] = {module = "runtime", export = true, variable = true}, [">="] = {module = "runtime", export = true, variable = true}, ["function?"] = {module = "runtime", export = true, variable = true}, ["list?"] = {module = "runtime", export = true, variable = true}, ["nil?"] = {module = "runtime", export = true, variable = true}, join = {module = "runtime", export = true, variable = true}, ["some?"] = {module = "runtime", export = true, variable = true}, sublist = {module = "runtime", export = true, variable = true}, search = {module = "runtime", export = true, variable = true}, code = {module = "runtime", export = true, variable = true}, length = {module = "runtime", export = true, variable = true}, write = {module = "runtime", export = true, variable = true}, reverse = {module = "runtime", export = true, variable = true}, ["%"] = {module = "runtime", export = true, variable = true}, replicate = {module = "runtime", export = true, variable = true}, split = {module = "runtime", export = true, variable = true}, print = {}, ["boolean?"] = {module = "runtime", export = true, variable = true}, apply = {module = "runtime", export = true, variable = true}, add = {module = "runtime", export = true, variable = true}, ["id-literal?"] = {module = "runtime", export = true, variable = true}, extend = {module = "runtime", export = true, variable = true}, ["composite?"] = {module = "runtime", export = true, variable = true}, exit = {module = "runtime", export = true, variable = true}, ["string?"] = {module = "runtime", export = true, variable = true}, exclude = {module = "runtime", export = true, variable = true}, substring = {module = "runtime", export = true, variable = true}, ["atom?"] = {module = "runtime", export = true, variable = true}, inner = {module = "runtime", export = true, variable = true}, ["number?"] = {module = "runtime", export = true, variable = true}, ["parse-number"] = {module = "runtime", export = true, variable = true}, reduce = {module = "runtime", export = true, variable = true}, sub = {module = "runtime", export = true, variable = true}, ["is?"] = {module = "runtime", export = true, variable = true}, ["write-file"] = {module = "runtime", export = true, variable = true}, splice = {module = "runtime", export = true, variable = true}, hd = {module = "runtime", export = true, variable = true}, ["to-string"] = {module = "runtime", export = true, variable = true}, char = {module = "runtime", export = true, variable = true}, ["table?"] = {module = "runtime", export = true, variable = true}, type = {}, keep = {module = "runtime", export = true, variable = true}, iterate = {module = "runtime", export = true, variable = true}, map = {module = "runtime", export = true, variable = true}, ["empty?"] = {module = "runtime", export = true, variable = true}, ["string-literal?"] = {module = "runtime", export = true, variable = true}, mapt = {module = "runtime", export = true, variable = true}, unstash = {module = "runtime", export = true, variable = true}, cat = {module = "runtime", export = true, variable = true}, ["map*"] = {module = "runtime", export = true, variable = true}, ["<="] = {module = "runtime", export = true, variable = true}, ["%message-handler"] = {module = "runtime", export = true, variable = true}}, import = {"special", "core"}}, system = {export = {nexus = {module = "system", export = true, global = true}}, import = {"special", "core"}}, boot = {export = {}, import = {"runtime", "utilities", "special", "core"}}, core = {export = {each = {module = "core", macro = function (_g280, ...)
    local t = _g280[1]
    local k = _g280[2]
    local v = _g280[3]
    local body = unstash({...})
    local _g281 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g282 = {"target"}
      _g282.js = join({"isNaN", join({"parseInt", k})})
      _g282.lua = join({"not", join({"number?", k})})
      return(_g282)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g281)})})}))
  end, export = true}, language = {module = "core", macro = function ()
    return(join({"quote", target}))
  end, export = true}, ["define-local"] = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g283 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g283)) then
      local _g284 = bind42(x, _g283)
      local args = _g284[1]
      local _g285 = _g284[2]
      return(join({"%local-function", name, args}, _g285))
    else
      return(join({"%local", name, x}))
    end
  end, export = true}, ["with-bindings"] = {module = "core", macro = function (_g286, ...)
    local names = _g286[1]
    local body = unstash({...})
    local _g287 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g288 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g289 = {"setenv", x}
        _g289.variable = true
        return(_g289)
      end)())})}
      _g288.scope = true
      return(_g288)
    end)(), _g287))
  end, export = true}, ["define-global"] = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g290 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g290)) then
      local _g291 = bind42(x, _g290)
      local args = _g291[1]
      local _g292 = _g291[2]
      return(join({"%global-function", name, args}, _g292))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true}, define = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g293 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g293)) then
      local _g294 = bind42(x, _g293)
      local args = _g294[1]
      local _g295 = _g294[2]
      return(join({"%global-function", name, args}, _g295))
    else
      return(join({"set", name, x}))
    end
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core", export = true, global = true}, ["define-symbol"] = {module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, guard = {module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true}, ["with-frame"] = {module = "core", macro = function (...)
    local body = unstash({...})
    local _g296 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g297 = {"table"}
      _g297._scope = scope
      return(_g297)
    end)())}), join({"let", join({x, join({"do"}, _g296)}), join({"drop", "environment"}), x})}))
  end, export = true}, dec = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true}, ["set-of"] = {module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g299 = 0
    local _g298 = elements
    while (_g299 < length(_g298)) do
      local e = _g298[(_g299 + 1)]
      l[e] = true
      _g299 = (_g299 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, ["list*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g300 = xs
      while (i < length(_g300)) do
        local x = _g300[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true}, across = {module = "core", macro = function (_g301, ...)
    local l = _g301[1]
    local v = _g301[2]
    local i = _g301[3]
    local start = _g301[4]
    local body = unstash({...})
    local _g302 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g302, {join({"inc", i})}))})}))
  end, export = true}, list = {module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g303 = body
      for k in next, _g303 do
        if (not number63(k)) then
          local v = _g303[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true}, inc = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true}, ["let-macro"] = {module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g304 = sub(body, 0)
    add(environment, {})
    local _g305 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g304)))
    end)()
    drop(environment)
    return(_g305)
  end, export = true}, at = {module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true}, ["define-macro"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g306 = sub(body, 0)
    local form = join({"fn", args}, _g306)
    eval(join((function ()
      local _g307 = {"setenv", join({"quote", name})}
      _g307.macro = form
      _g307.form = join({"quote", form})
      return(_g307)
    end)()))
    return(nil)
  end, export = true}, quasiquote = {module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["let-symbol"] = {module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g308 = sub(body, 0)
    add(environment, {})
    local _g309 = (function ()
      map(function (_g310)
        local name = _g310[1]
        local exp = _g310[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g308)))
    end)()
    drop(environment)
    return(_g309)
  end, export = true}, pr = {module = "core", macro = function (...)
    local xs = unstash({...})
    local _g311 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g311)}))
  end, export = true}, table = {module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g171, x)
      return(x)
    end, body)))
  end, export = true}, quote = {module = "core", macro = function (form)
    return(quoted(form))
  end, export = true}, ["join*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true}, let = {module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g312 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g313)
      local lh = _g313[1]
      local rh = _g313[2]
      local _g315 = 0
      local _g314 = bind(lh, rh)
      while (_g315 < length(_g314)) do
        local _g316 = _g314[(_g315 + 1)]
        local id = _g316[1]
        local val = _g316[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g315 = (_g315 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g312)})))
  end, export = true}, ["cat!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g317 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g317)}))
  end, export = true}, ["define-special"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g318 = sub(body, 0)
    local form = join({"fn", args}, _g318)
    local keys = sub(_g318, length(_g318))
    eval(join((function ()
      local _g319 = {"setenv", join({"quote", name})}
      _g319.special = form
      _g319.form = join({"quote", form})
      return(_g319)
    end)(), keys))
    return(nil)
  end, export = true}, ["join!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g320 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g320)}))
  end, export = true}, fn = {module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g321 = sub(body, 0)
    local _g322 = bind42(args, _g321)
    local _g323 = _g322[1]
    local _g324 = _g322[2]
    return(join({"%function", _g323}, _g324))
  end, export = true}}, import = {"runtime", "utilities", "special", "core"}}, compiler = {export = {["%result"] = {module = "compiler", export = true, global = true}, ["load-module"] = {module = "compiler", export = true, variable = true}, ["current-module"] = {module = "compiler", export = true, global = true}, ["compile-branch"] = {module = "compiler", export = true, variable = true}, ["compile-function"] = {module = "compiler", export = true, variable = true}, ["compile-call"] = {module = "compiler", export = true, variable = true}, ["compile-special"] = {module = "compiler", export = true, variable = true}, ["in-module"] = {module = "compiler", export = true, variable = true}, ["define-module"] = {module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g325 = sub(body, 0)
    local imports = {}
    local exp = _g325.export
    local imp = _g325.import
    local _g327 = 0
    local _g326 = (imp or {})
    while (_g327 < length(_g326)) do
      local k = _g326[(_g327 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g327 = (_g327 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g329 = 0
    local _g328 = (exp or {})
    while (_g329 < length(_g328)) do
      local k = _g328[(_g329 + 1)]
      setenv(k, {_stash = true, export = true})
      _g329 = (_g329 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, eval = {module = "compiler", export = true, variable = true}, ["open-module"] = {module = "compiler", export = true, variable = true}, ["compile-body"] = {module = "compiler", export = true, variable = true}, compile = {module = "compiler", export = true, variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, utilities = {export = {["quote-modules"] = {module = "utilities", export = true, variable = true}, ["symbol?"] = {module = "utilities", export = true, variable = true}, quasiexpand = {module = "utilities", export = true, variable = true}, ["special?"] = {module = "utilities", export = true, variable = true}, ["symbol-expansion"] = {module = "utilities", export = true, variable = true}, ["bind*"] = {module = "utilities", export = true, variable = true}, ["initial-environment"] = {module = "utilities", export = true, variable = true}, ["macro-function"] = {module = "utilities", export = true, variable = true}, ["valid-id?"] = {module = "utilities", export = true, variable = true}, bind = {module = "utilities", export = true, variable = true}, ["macro?"] = {module = "utilities", export = true, variable = true}, ["with-indent"] = {module = "utilities", export = true, macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, indentation = {module = "utilities", export = true, variable = true}, setenv = {module = "utilities", export = true, variable = true}, ["to-id"] = {module = "utilities", export = true, variable = true}, quoted = {module = "utilities", export = true, variable = true}, ["special-form?"] = {module = "utilities", export = true, variable = true}, exported = {module = "utilities", export = true, variable = true}, ["variable?"] = {module = "utilities", export = true, variable = true}, ["bound?"] = {module = "utilities", export = true, variable = true}, ["make-id"] = {}, macroexpand = {module = "utilities", export = true, variable = true}, ["module-key"] = {module = "utilities", export = true, variable = true}, ["stash*"] = {module = "utilities", export = true, variable = true}, ["quote-environment"] = {module = "utilities", export = true, variable = true}, getenv = {module = "utilities", export = true, variable = true}, ["indent-level"] = {module = "utilities", export = true, global = true}, imported = {module = "utilities", export = true, variable = true}}, import = {"runtime", "special", "core"}}}
  environment = {{["define-module"] = {module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g330 = sub(body, 0)
    local imports = {}
    local exp = _g330.export
    local imp = _g330.import
    local _g332 = 0
    local _g331 = (imp or {})
    while (_g332 < length(_g331)) do
      local k = _g331[(_g332 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g332 = (_g332 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g334 = 0
    local _g333 = (exp or {})
    while (_g334 < length(_g333)) do
      local k = _g333[(_g334 + 1)]
      setenv(k, {_stash = true, export = true})
      _g334 = (_g334 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g36 = nexus.runtime
  local sub = _g36.sub
  local _43 = _g36["+"]
  local _ = _g36["-"]
  local char = _g36.char
  local find = _g36.find
  local tl = _g36.tl
  local keep = _g36.keep
  local pairwise = _g36.pairwise
  local last = _g36.last
  local drop = _g36.drop
  local stash = _g36.stash
  local _60 = _g36["<"]
  local iterate = _g36.iterate
  local parse_number = _g36["parse-number"]
  local read_file = _g36["read-file"]
  local keys63 = _g36["keys?"]
  local _6261 = _g36[">="]
  local function63 = _g36["function?"]
  local list63 = _g36["list?"]
  local nil63 = _g36["nil?"]
  local join = _g36.join
  local some63 = _g36["some?"]
  local sublist = _g36.sublist
  local search = _g36.search
  local code = _g36.code
  local length = _g36.length
  local write = _g36.write
  local reverse = _g36.reverse
  local _37 = _g36["%"]
  local replicate = _g36.replicate
  local splice = _g36.splice
  local boolean63 = _g36["boolean?"]
  local apply = _g36.apply
  local add = _g36.add
  local id_literal63 = _g36["id-literal?"]
  local extend = _g36.extend
  local map42 = _g36["map*"]
  local exit = _g36.exit
  local string63 = _g36["string?"]
  local exclude = _g36.exclude
  local substring = _g36.substring
  local atom63 = _g36["atom?"]
  local number63 = _g36["number?"]
  local map = _g36.map
  local _42 = _g36["*"]
  local write_file = _g36["write-file"]
  local is63 = _g36["is?"]
  local split = _g36.split
  local _62 = _g36[">"]
  local hd = _g36.hd
  local _47 = _g36["/"]
  local _61 = _g36["="]
  local table63 = _g36["table?"]
  local mapo = _g36.mapo
  local mapt = _g36.mapt
  local composite63 = _g36["composite?"]
  local reduce = _g36.reduce
  local empty63 = _g36["empty?"]
  local string_literal63 = _g36["string-literal?"]
  local to_string = _g36["to-string"]
  local unstash = _g36.unstash
  local _6061 = _g36["<="]
  local inner = _g36.inner
  local cat = _g36.cat
  local _37message_handler = _g36["%message-handler"]
  local _g73 = nexus.utilities
  local quote_modules = _g73["quote-modules"]
  local symbol63 = _g73["symbol?"]
  local quasiexpand = _g73.quasiexpand
  local module_key = _g73["module-key"]
  local variable63 = _g73["variable?"]
  local bind42 = _g73["bind*"]
  local initial_environment = _g73["initial-environment"]
  local valid_id63 = _g73["valid-id?"]
  local bind = _g73.bind
  local bound63 = _g73["bound?"]
  local indentation = _g73.indentation
  local macro_function = _g73["macro-function"]
  local to_id = _g73["to-id"]
  local quoted = _g73.quoted
  local exported = _g73.exported
  local setenv = _g73.setenv
  local macro63 = _g73["macro?"]
  local symbol_expansion = _g73["symbol-expansion"]
  local macroexpand = _g73.macroexpand
  local stash42 = _g73["stash*"]
  local special_form63 = _g73["special-form?"]
  local special63 = _g73["special?"]
  local getenv = _g73.getenv
  local quote_environment = _g73["quote-environment"]
  local imported = _g73.imported
  local _g79 = nexus.reader
  local make_stream = _g79["make-stream"]
  local read_table = _g79["read-table"]
  local read = _g79.read
  local read_from_string = _g79["read-from-string"]
  local read_all = _g79["read-all"]
  local _g112 = nexus.compiler
  local compile_special = _g112["compile-special"]
  local load_module = _g112["load-module"]
  local compile_branch = _g112["compile-branch"]
  local compile_function = _g112["compile-function"]
  local compile_call = _g112["compile-call"]
  local in_module = _g112["in-module"]
  local eval = _g112.eval
  local open_module = _g112["open-module"]
  local compile_body = _g112["compile-body"]
  local compile = _g112.compile
  local function rep(str)
    local _g336 = (function ()
      local _g337,_g338 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g337, _g338})
    end)()
    local _g1 = _g336[1]
    local x = _g336[2]
    if is63(x) then
      return(print((to_string(x) .. " ")))
    end
  end
  local function repl()
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
    local _g339 = args
    while (i < length(_g339)) do
      local arg = _g339[(i + 1)]
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
      local _g340 = (spec or "main")
      in_module(_g340)
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  return(main())
end)();
