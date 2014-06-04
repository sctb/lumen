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
  _g35.keep = keep
  _g35["read-file"] = read_file
  _g35["%message-handler"] = _37message_handler
  _g35["nil?"] = nil63
  _g35["is?"] = is63
  _g35["composite?"] = composite63
  _g35.splice = splice
  _g35[">="] = _6261
  _g35.reduce = reduce
  _g35.unstash = unstash
  _g35.stash = stash
  _g35.drop = drop
  _g35.apply = apply
  _g35["to-string"] = to_string
  _g35["parse-number"] = parse_number
  _g35.sublist = sublist
  _g35["list?"] = list63
  _g35["atom?"] = atom63
  _g35["table?"] = table63
  _g35.replicate = replicate
  _g35["function?"] = function63
  _g35["boolean?"] = boolean63
  _g35.extend = extend
  _g35["="] = _61
  _g35.substring = substring
  _g35.last = last
  _g35["id-literal?"] = id_literal63
  _g35.map = map
  _g35["string-literal?"] = string_literal63
  _g35.join = join
  _g35["keys?"] = keys63
  _g35["*"] = _42
  _g35["-"] = _
  _g35["/"] = _47
  _g35["map*"] = map42
  _g35.split = split
  _g35["some?"] = some63
  _g35.iterate = iterate
  _g35.exit = exit
  _g35.tl = tl
  _g35.write = write
  _g35.code = code
  _g35.char = char
  _g35["<="] = _6061
  _g35.search = search
  _g35["<"] = _60
  _g35[">"] = _62
  _g35["%"] = _37
  _g35["+"] = _43
  _g35.cat = cat
  _g35["write-file"] = write_file
  _g35.add = add
  _g35.exclude = exclude
  _g35.mapt = mapt
  _g35["string?"] = string63
  _g35.pairwise = pairwise
  _g35.find = find
  _g35.sub = sub
  _g35["number?"] = number63
  _g35.inner = inner
  _g35.hd = hd
  _g35.reverse = reverse
  _g35["empty?"] = empty63
  _g35.mapo = mapo
  _g35.length = length
end)();
(function ()
  function setenv(k, ...)
    local keys = unstash({...})
    local _g42 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g43 = _g42
      for k1 in next, _g43 do
        if (not number63(k1)) then
          local v = _g43[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  function getenv(k, ...)
    local keys = unstash({...})
    local _g44 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g45 = keys63(_g44)
        if _g45 then
          return(b[_g45])
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
      local _g46 = args
      for k in next, _g46 do
        if (not number63(k)) then
          local v = _g46[k]
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
      local _g47 = lh
      while (i < length(_g47)) do
        local x = _g47[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local k = nil
      local _g48 = lh
      for k in next, _g48 do
        if (not number63(k)) then
          local v = _g48[k]
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
      local _g50 = 0
      local _g49 = args
      while (_g50 < length(_g49)) do
        local arg = _g49[(_g50 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g50 = (_g50 + 1)
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
        local _g51 = form[2]
        local t = _g51[1]
        local k = _g51[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g38 = form[1]
        local args = form[2]
        local _g52 = sub(form, 2)
        add(environment, {_scope = true})
        local _g54 = (function ()
          local _g56 = 0
          local _g55 = args
          while (_g56 < length(_g55)) do
            local _g53 = _g55[(_g56 + 1)]
            setenv(_g53, {_stash = true, variable = true})
            _g56 = (_g56 + 1)
          end
          return(join({"%function", map42(macroexpand, args)}, macroexpand(_g52)))
        end)()
        drop(environment)
        return(_g54)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g39 = form[1]
        local name = form[2]
        local _g57 = form[3]
        local _g58 = sub(form, 3)
        add(environment, {_scope = true})
        local _g60 = (function ()
          local _g62 = 0
          local _g61 = _g57
          while (_g62 < length(_g61)) do
            local _g59 = _g61[(_g62 + 1)]
            setenv(_g59, {_stash = true, variable = true})
            _g62 = (_g62 + 1)
          end
          return(join({x, name, map42(macroexpand, _g57)}, macroexpand(_g58)))
        end)()
        drop(environment)
        return(_g60)
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
    local _g63 = form
    for k in next, _g63 do
      if (not number63(k)) then
        local v = _g63[k]
        local _g64 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g64
      end
    end
    local _g66 = 0
    local _g65 = form
    while (_g66 < length(_g65)) do
      local x = _g65[(_g66 + 1)]
      if quasisplice63(x, depth) then
        local _g67 = quasiexpand(x[2])
        add(xs, _g67)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g66 = (_g66 + 1)
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
  local reserved = {["catch"] = true, ["%"] = true, ["for"] = true, ["then"] = true, ["var"] = true, ["/"] = true, ["+"] = true, ["typeof"] = true, ["this"] = true, ["<="] = true, [">="] = true, ["elseif"] = true, ["throw"] = true, ["or"] = true, ["in"] = true, ["="] = true, ["function"] = true, [">"] = true, ["while"] = true, ["end"] = true, ["-"] = true, ["and"] = true, ["false"] = true, ["do"] = true, ["new"] = true, ["return"] = true, ["local"] = true, ["break"] = true, ["*"] = true, ["instanceof"] = true, ["if"] = true, ["with"] = true, ["not"] = true, ["switch"] = true, ["nil"] = true, ["=="] = true, ["void"] = true, ["delete"] = true, ["case"] = true, ["try"] = true, ["continue"] = true, ["finally"] = true, ["default"] = true, ["<"] = true, ["until"] = true, ["debugger"] = true, ["true"] = true, ["else"] = true, ["repeat"] = true}
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
    local _g68 = toplevel
    for n in next, _g68 do
      if (not number63(n)) then
        local b = _g68[n]
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
      local _g69 = x
      for b in next, _g69 do
        if (not number63(b)) then
          local _g40 = _g69[b]
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
      local _g70 = {"table"}
      _g70.export = quote_frame(m.export)
      _g70.import = quoted(m.import)
      return(_g70)
    end)()))
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  _g71 = {}
  nexus.utilities = _g71
  _g71.quoted = quoted
  _g71["variable?"] = variable63
  _g71["valid-id?"] = valid_id63
  _g71["symbol-expansion"] = symbol_expansion
  _g71["quote-environment"] = quote_environment
  _g71["macro?"] = macro63
  _g71["bound?"] = bound63
  _g71["special-form?"] = special_form63
  _g71["initial-environment"] = initial_environment
  _g71["symbol?"] = symbol63
  _g71.macroexpand = macroexpand
  _g71.imported = imported
  _g71["quote-modules"] = quote_modules
  _g71["bind*"] = bind42
  _g71.setenv = setenv
  _g71.bind = bind
  _g71.exported = exported
  _g71.getenv = getenv
  _g71["stash*"] = stash42
  _g71["special?"] = special63
  _g71.quasiexpand = quasiexpand
  _g71["macro-function"] = macro_function
  _g71["module-key"] = module_key
  _g71["to-id"] = to_id
  _g71.indentation = indentation
end)();
(function ()
  local delimiters = {["("] = true, [";"] = true, [")"] = true, ["\n"] = true}
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  local function make_stream(str)
    return({len = length(str), string = str, pos = 0})
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
  _g76 = {}
  nexus.reader = _g76
  _g76["read-all"] = read_all
  _g76["read-from-string"] = read_from_string
  _g76["make-stream"] = make_stream
  _g76["read-table"] = read_table
  _g76.read = read
end)();
(function ()
  local _g78 = nexus.utilities
  local bound63 = _g78["bound?"]
  local special_form63 = _g78["special-form?"]
  local variable63 = _g78["variable?"]
  local quote_modules = _g78["quote-modules"]
  local valid_id63 = _g78["valid-id?"]
  local symbol_expansion = _g78["symbol-expansion"]
  local exported = _g78.exported
  local initial_environment = _g78["initial-environment"]
  local quote_environment = _g78["quote-environment"]
  local imported = _g78.imported
  local bind42 = _g78["bind*"]
  local to_id = _g78["to-id"]
  local getenv = _g78.getenv
  local bind = _g78.bind
  local macroexpand = _g78.macroexpand
  local quoted = _g78.quoted
  local quasiexpand = _g78.quasiexpand
  local special63 = _g78["special?"]
  local stash42 = _g78["stash*"]
  local module_key = _g78["module-key"]
  local macro63 = _g78["macro?"]
  local setenv = _g78.setenv
  local macro_function = _g78["macro-function"]
  local symbol63 = _g78["symbol?"]
  local indentation = _g78.indentation
  local _g79 = nexus.runtime
  local keep = _g79.keep
  local read_file = _g79["read-file"]
  local _37message_handler = _g79["%message-handler"]
  local nil63 = _g79["nil?"]
  local exclude = _g79.exclude
  local exit = _g79.exit
  local is63 = _g79["is?"]
  local composite63 = _g79["composite?"]
  local splice = _g79.splice
  local _6061 = _g79["<="]
  local _6261 = _g79[">="]
  local drop = _g79.drop
  local find = _g79.find
  local cat = _g79.cat
  local sublist = _g79.sublist
  local table63 = _g79["table?"]
  local replicate = _g79.replicate
  local extend = _g79.extend
  local _61 = _g79["="]
  local _60 = _g79["<"]
  local substring = _g79.substring
  local last = _g79.last
  local iterate = _g79.iterate
  local list63 = _g79["list?"]
  local map = _g79.map
  local join = _g79.join
  local _43 = _g79["+"]
  local _42 = _g79["*"]
  local _ = _g79["-"]
  local _47 = _g79["/"]
  local map42 = _g79["map*"]
  local split = _g79.split
  local some63 = _g79["some?"]
  local _37 = _g79["%"]
  local string_literal63 = _g79["string-literal?"]
  local apply = _g79.apply
  local code = _g79.code
  local search = _g79.search
  local length = _g79.length
  local write_file = _g79["write-file"]
  local add = _g79.add
  local mapt = _g79.mapt
  local string63 = _g79["string?"]
  local sub = _g79.sub
  local keys63 = _g79["keys?"]
  local number63 = _g79["number?"]
  local hd = _g79.hd
  local to_string = _g79["to-string"]
  local inner = _g79.inner
  local tl = _g79.tl
  local char = _g79.char
  local stash = _g79.stash
  local reduce = _g79.reduce
  local reverse = _g79.reverse
  local empty63 = _g79["empty?"]
  local unstash = _g79.unstash
  local parse_number = _g79["parse-number"]
  local pairwise = _g79.pairwise
  local mapo = _g79.mapo
  local atom63 = _g79["atom?"]
  local function63 = _g79["function?"]
  local boolean63 = _g79["boolean?"]
  local write = _g79.write
  local id_literal63 = _g79["id-literal?"]
  local _62 = _g79[">"]
  local _g80 = nexus.reader
  local read_from_string = _g80["read-from-string"]
  local make_stream = _g80["make-stream"]
  local read_all = _g80["read-all"]
  local read_table = _g80["read-table"]
  local read = _g80.read
  local infix = {common = {["+"] = true, ["<="] = true, ["-"] = true, ["<"] = true, ["/"] = true, [">"] = true, ["%"] = true, ["*"] = true, [">="] = true}, lua = {["="] = "==", ["~="] = true, ["and"] = true, cat = "..", ["or"] = true}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", cat = "+", ["or"] = "||"}}
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
    local _g81 = args
    while (i < length(_g81)) do
      local arg = _g81[(i + 1)]
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
    local _g82 = unstash({...})
    local tail63 = _g82["tail?"]
    local str = ""
    local i = 0
    local _g83 = forms
    while (i < length(_g83)) do
      local x = _g83[(i + 1)]
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
  local function compile_infix(_g84)
    local op = _g84[1]
    local args = sub(_g84, 1)
    local str = "("
    local _g85 = getop(op)
    local i = 0
    local _g86 = args
    while (i < length(_g86)) do
      local arg = _g86[(i + 1)]
      if ((_g85 == "-") and (length(args) == 1)) then
        str = (str .. _g85 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g85 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g87 = (function ()
      indent_level = (indent_level + 1)
      local _g88 = compile(body, {_stash = true, ["tail?"] = tail63, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g88)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g87 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g87 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g87 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g87 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g87 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g87 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g89 = unstash({...})
    local name = _g89.name
    local prefix = _g89.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g90 = (prefix or "")
    local _g91 = compile_args(args)
    local _g92 = (function ()
      indent_level = (indent_level + 1)
      local _g93 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g93)
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
      return(("function " .. id .. _g91 .. " {\n" .. _g92 .. ind .. "}" .. tr))
    else
      return((_g90 .. "function " .. id .. _g91 .. "\n" .. _g92 .. ind .. tr))
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
    local _g94 = getenv(hd(form))
    local self_tr63 = _g94.tr
    local stmt = _g94.stmt
    local special = _g94.special
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
    local _g95 = unstash({...})
    local stmt63 = _g95["stmt?"]
    local tail63 = _g95["tail?"]
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
      local _g96 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g96 .. tr))
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
    local _g97 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g97, {epilog}))}))
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
    local _g107 = toplevel
    for name in next, _g107 do
      if (not number63(name)) then
        local binding = _g107[name]
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
    local _g108 = m.export
    for k in next, _g108 do
      if (not number63(k)) then
        local v = _g108[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  _g109 = {}
  nexus.compiler = _g109
  _g109["compile-body"] = compile_body
  _g109["compile-branch"] = compile_branch
  _g109["load-module"] = load_module
  _g109["in-module"] = in_module
  _g109["open-module"] = open_module
  _g109["compile-call"] = compile_call
  _g109.compile = compile
  _g109["compile-function"] = compile_function
  _g109["compile-special"] = compile_special
  _g109.eval = eval
end)();
(function ()
  local _g112 = nexus.utilities
  local bound63 = _g112["bound?"]
  local special_form63 = _g112["special-form?"]
  local variable63 = _g112["variable?"]
  local quote_modules = _g112["quote-modules"]
  local valid_id63 = _g112["valid-id?"]
  local symbol_expansion = _g112["symbol-expansion"]
  local exported = _g112.exported
  local initial_environment = _g112["initial-environment"]
  local quote_environment = _g112["quote-environment"]
  local imported = _g112.imported
  local bind42 = _g112["bind*"]
  local to_id = _g112["to-id"]
  local getenv = _g112.getenv
  local bind = _g112.bind
  local macroexpand = _g112.macroexpand
  local quoted = _g112.quoted
  local quasiexpand = _g112.quasiexpand
  local special63 = _g112["special?"]
  local stash42 = _g112["stash*"]
  local module_key = _g112["module-key"]
  local macro63 = _g112["macro?"]
  local setenv = _g112.setenv
  local macro_function = _g112["macro-function"]
  local symbol63 = _g112["symbol?"]
  local indentation = _g112.indentation
  local _g113 = nexus.compiler
  local eval = _g113.eval
  local compile_branch = _g113["compile-branch"]
  local compile_call = _g113["compile-call"]
  local compile = _g113.compile
  local compile_function = _g113["compile-function"]
  local in_module = _g113["in-module"]
  local compile_body = _g113["compile-body"]
  local load_module = _g113["load-module"]
  local compile_special = _g113["compile-special"]
  local open_module = _g113["open-module"]
end)();
(function ()
  local _g169 = nexus.utilities
  local bound63 = _g169["bound?"]
  local special_form63 = _g169["special-form?"]
  local variable63 = _g169["variable?"]
  local quote_modules = _g169["quote-modules"]
  local valid_id63 = _g169["valid-id?"]
  local symbol_expansion = _g169["symbol-expansion"]
  local exported = _g169.exported
  local initial_environment = _g169["initial-environment"]
  local quote_environment = _g169["quote-environment"]
  local imported = _g169.imported
  local bind42 = _g169["bind*"]
  local to_id = _g169["to-id"]
  local getenv = _g169.getenv
  local bind = _g169.bind
  local macroexpand = _g169.macroexpand
  local quoted = _g169.quoted
  local quasiexpand = _g169.quasiexpand
  local special63 = _g169["special?"]
  local stash42 = _g169["stash*"]
  local module_key = _g169["module-key"]
  local macro63 = _g169["macro?"]
  local setenv = _g169.setenv
  local macro_function = _g169["macro-function"]
  local symbol63 = _g169["symbol?"]
  local indentation = _g169.indentation
  local _g170 = nexus.runtime
  local keep = _g170.keep
  local read_file = _g170["read-file"]
  local _37message_handler = _g170["%message-handler"]
  local nil63 = _g170["nil?"]
  local exclude = _g170.exclude
  local exit = _g170.exit
  local is63 = _g170["is?"]
  local composite63 = _g170["composite?"]
  local splice = _g170.splice
  local _6061 = _g170["<="]
  local _6261 = _g170[">="]
  local drop = _g170.drop
  local find = _g170.find
  local cat = _g170.cat
  local sublist = _g170.sublist
  local table63 = _g170["table?"]
  local replicate = _g170.replicate
  local extend = _g170.extend
  local _61 = _g170["="]
  local _60 = _g170["<"]
  local substring = _g170.substring
  local last = _g170.last
  local iterate = _g170.iterate
  local list63 = _g170["list?"]
  local map = _g170.map
  local join = _g170.join
  local _43 = _g170["+"]
  local _42 = _g170["*"]
  local _ = _g170["-"]
  local _47 = _g170["/"]
  local map42 = _g170["map*"]
  local split = _g170.split
  local some63 = _g170["some?"]
  local _37 = _g170["%"]
  local string_literal63 = _g170["string-literal?"]
  local apply = _g170.apply
  local code = _g170.code
  local search = _g170.search
  local length = _g170.length
  local write_file = _g170["write-file"]
  local add = _g170.add
  local mapt = _g170.mapt
  local string63 = _g170["string?"]
  local sub = _g170.sub
  local keys63 = _g170["keys?"]
  local number63 = _g170["number?"]
  local hd = _g170.hd
  local to_string = _g170["to-string"]
  local inner = _g170.inner
  local tl = _g170.tl
  local char = _g170.char
  local stash = _g170.stash
  local reduce = _g170.reduce
  local reverse = _g170.reverse
  local empty63 = _g170["empty?"]
  local unstash = _g170.unstash
  local parse_number = _g170["parse-number"]
  local pairwise = _g170.pairwise
  local mapo = _g170.mapo
  local atom63 = _g170["atom?"]
  local function63 = _g170["function?"]
  local boolean63 = _g170["boolean?"]
  local write = _g170.write
  local id_literal63 = _g170["id-literal?"]
  local _62 = _g170[">"]
  target = "lua"
end)();
(function ()
  local _g243 = nexus.utilities
  local bound63 = _g243["bound?"]
  local special_form63 = _g243["special-form?"]
  local variable63 = _g243["variable?"]
  local quote_modules = _g243["quote-modules"]
  local valid_id63 = _g243["valid-id?"]
  local symbol_expansion = _g243["symbol-expansion"]
  local exported = _g243.exported
  local initial_environment = _g243["initial-environment"]
  local quote_environment = _g243["quote-environment"]
  local imported = _g243.imported
  local bind42 = _g243["bind*"]
  local to_id = _g243["to-id"]
  local getenv = _g243.getenv
  local bind = _g243.bind
  local macroexpand = _g243.macroexpand
  local quoted = _g243.quoted
  local quasiexpand = _g243.quasiexpand
  local special63 = _g243["special?"]
  local stash42 = _g243["stash*"]
  local module_key = _g243["module-key"]
  local macro63 = _g243["macro?"]
  local setenv = _g243.setenv
  local macro_function = _g243["macro-function"]
  local symbol63 = _g243["symbol?"]
  local indentation = _g243.indentation
  modules = {compiler = {import = {"utilities", "runtime", "special", "core", "reader"}, export = {eval = {variable = true, export = true, module = "compiler"}, ["compile-branch"] = {variable = true, export = true, module = "compiler"}, ["compile-body"] = {variable = true, export = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g244 = sub(body, 0)
    local imports = {}
    local imp = _g244.import
    local exp = _g244.export
    local _g246 = 0
    local _g245 = (imp or {})
    while (_g246 < length(_g245)) do
      local k = _g245[(_g246 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g246 = (_g246 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g248 = 0
    local _g247 = (exp or {})
    while (_g248 < length(_g247)) do
      local k = _g247[(_g248 + 1)]
      setenv(k, {_stash = true, export = true})
      _g248 = (_g248 + 1)
    end
    return(join({"do"}, imports))
  end, module = "compiler", export = true}, compile = {variable = true, export = true, module = "compiler"}, ["compile-function"] = {variable = true, export = true, module = "compiler"}, ["in-module"] = {variable = true, export = true, module = "compiler"}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["compile-call"] = {variable = true, export = true, module = "compiler"}, ["load-module"] = {variable = true, export = true, module = "compiler"}, ["compile-special"] = {variable = true, export = true, module = "compiler"}, ["open-module"] = {variable = true, export = true, module = "compiler"}}}, runtime = {import = {"special", "core"}, export = {keep = {variable = true, export = true, module = "runtime"}, ["read-file"] = {variable = true, export = true, module = "runtime"}, ["%message-handler"] = {variable = true, export = true, module = "runtime"}, ["nil?"] = {variable = true, export = true, module = "runtime"}, exclude = {variable = true, export = true, module = "runtime"}, pairwise = {variable = true, export = true, module = "runtime"}, ["is?"] = {variable = true, export = true, module = "runtime"}, ["composite?"] = {variable = true, export = true, module = "runtime"}, splice = {variable = true, export = true, module = "runtime"}, ["<="] = {variable = true, export = true, module = "runtime"}, [">="] = {variable = true, export = true, module = "runtime"}, stash = {variable = true, export = true, module = "runtime"}, find = {variable = true, export = true, module = "runtime"}, cat = {variable = true, export = true, module = "runtime"}, sublist = {variable = true, export = true, module = "runtime"}, ["table?"] = {variable = true, export = true, module = "runtime"}, replicate = {variable = true, export = true, module = "runtime"}, extend = {variable = true, export = true, module = "runtime"}, ["boolean?"] = {variable = true, export = true, module = "runtime"}, ["<"] = {variable = true, export = true, module = "runtime"}, substring = {variable = true, export = true, module = "runtime"}, last = {variable = true, export = true, module = "runtime"}, iterate = {variable = true, export = true, module = "runtime"}, ["list?"] = {variable = true, export = true, module = "runtime"}, map = {variable = true, export = true, module = "runtime"}, join = {variable = true, export = true, module = "runtime"}, ["+"] = {variable = true, export = true, module = "runtime"}, ["*"] = {variable = true, export = true, module = "runtime"}, ["-"] = {variable = true, export = true, module = "runtime"}, ["/"] = {variable = true, export = true, module = "runtime"}, ["map*"] = {variable = true, export = true, module = "runtime"}, split = {variable = true, export = true, module = "runtime"}, ["some?"] = {variable = true, export = true, module = "runtime"}, ["%"] = {variable = true, export = true, module = "runtime"}, ["string-literal?"] = {variable = true, export = true, module = "runtime"}, apply = {variable = true, export = true, module = "runtime"}, code = {variable = true, export = true, module = "runtime"}, search = {variable = true, export = true, module = "runtime"}, length = {variable = true, export = true, module = "runtime"}, ["write-file"] = {variable = true, export = true, module = "runtime"}, ["to-string"] = {variable = true, export = true, module = "runtime"}, mapt = {variable = true, export = true, module = "runtime"}, ["string?"] = {variable = true, export = true, module = "runtime"}, ["="] = {variable = true, export = true, module = "runtime"}, mapo = {variable = true, export = true, module = "runtime"}, sub = {variable = true, export = true, module = "runtime"}, ["keys?"] = {variable = true, export = true, module = "runtime"}, ["number?"] = {variable = true, export = true, module = "runtime"}, exit = {variable = true, export = true, module = "runtime"}, reduce = {variable = true, export = true, module = "runtime"}, inner = {variable = true, export = true, module = "runtime"}, ["function?"] = {variable = true, export = true, module = "runtime"}, ["parse-number"] = {variable = true, export = true, module = "runtime"}, reverse = {variable = true, export = true, module = "runtime"}, hd = {variable = true, export = true, module = "runtime"}, type = {}, ["empty?"] = {variable = true, export = true, module = "runtime"}, unstash = {variable = true, export = true, module = "runtime"}, add = {variable = true, export = true, module = "runtime"}, char = {variable = true, export = true, module = "runtime"}, ["id-literal?"] = {variable = true, export = true, module = "runtime"}, drop = {variable = true, export = true, module = "runtime"}, [">"] = {variable = true, export = true, module = "runtime"}, write = {variable = true, export = true, module = "runtime"}, tl = {variable = true, export = true, module = "runtime"}, print = {}, ["atom?"] = {variable = true, export = true, module = "runtime"}}}, boot = {import = {"utilities", "special", "core"}, export = {}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}, core = {import = {"utilities", "runtime", "special", "core"}, export = {["define-global"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g249 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g249)) then
      local _g250 = bind42(x, _g249)
      local args = _g250[1]
      local _g251 = _g250[2]
      return(join({"%global-function", name, args}, _g251))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, module = "core", export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, module = "core", export = true}, language = {macro = function ()
    return(join({"quote", target}))
  end, module = "core", export = true}, across = {macro = function (_g252, ...)
    local l = _g252[1]
    local v = _g252[2]
    local i = _g252[3]
    local start = _g252[4]
    local body = unstash({...})
    local _g253 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g253, {join({"inc", i})}))})}))
  end, module = "core", export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g254 = sub(body, 0)
    add(environment, {})
    local _g255 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g254)))
    end)()
    drop(environment)
    return(_g255)
  end, module = "core", export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, module = "core", export = true}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g256 = xs
      while (i < length(_g256)) do
        local x = _g256[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, module = "core", export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g168, x)
      return(x)
    end, body)))
  end, module = "core", export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, module = "core", export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g257 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g257)}))
  end, module = "core", export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, module = "core", export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, module = "core", export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g258 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g258)) then
      local _g259 = bind42(x, _g258)
      local args = _g259[1]
      local _g260 = _g259[2]
      return(join({"%global-function", name, args}, _g260))
    else
      return(join({"set", name, x}))
    end
  end, module = "core", export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, module = "core", export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g261 = sub(body, 0)
    local form = join({"fn", args}, _g261)
    eval(join((function ()
      local _g262 = {"setenv", join({"quote", name})}
      _g262.macro = form
      _g262.form = join({"quote", form})
      return(_g262)
    end)()))
    return(nil)
  end, module = "core", export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g263 = sub(body, 0)
    local form = join({"fn", args}, _g263)
    local keys = sub(_g263, length(_g263))
    eval(join((function ()
      local _g264 = {"setenv", join({"quote", name})}
      _g264.form = join({"quote", form})
      _g264.special = form
      return(_g264)
    end)(), keys))
    return(nil)
  end, module = "core", export = true}, ["with-bindings"] = {macro = function (_g265, ...)
    local names = _g265[1]
    local body = unstash({...})
    local _g266 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g267 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g268 = {"setenv", x}
        _g268.variable = true
        return(_g268)
      end)())})}
      _g267.scope = true
      return(_g267)
    end)(), _g266))
  end, module = "core", export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g270 = 0
    local _g269 = elements
    while (_g270 < length(_g269)) do
      local e = _g269[(_g270 + 1)]
      l[e] = true
      _g270 = (_g270 + 1)
    end
    return(join({"table"}, l))
  end, module = "core", export = true}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, module = "core", export = true}, ["define-local"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g271 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g271)) then
      local _g272 = bind42(x, _g271)
      local args = _g272[1]
      local _g273 = _g272[2]
      return(join({"%local-function", name, args}, _g273))
    else
      return(join({"%local", name, x}))
    end
  end, module = "core", export = true}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, module = "core", export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g274 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g275)
      local lh = _g275[1]
      local rh = _g275[2]
      local _g277 = 0
      local _g276 = bind(lh, rh)
      while (_g277 < length(_g276)) do
        local _g278 = _g276[(_g277 + 1)]
        local id = _g278[1]
        local val = _g278[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g277 = (_g277 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g274)})))
  end, module = "core", export = true}, each = {macro = function (_g279, ...)
    local t = _g279[1]
    local k = _g279[2]
    local v = _g279[3]
    local body = unstash({...})
    local _g280 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g281 = {"target"}
      _g281.js = join({"isNaN", join({"parseInt", k})})
      _g281.lua = join({"not", join({"number?", k})})
      return(_g281)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g280)})})}))
  end, module = "core", export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g282 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g283 = {"table"}
      _g283._scope = scope
      return(_g283)
    end)())}), join({"let", join({x, join({"do"}, _g282)}), join({"drop", "environment"}), x})}))
  end, module = "core", export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g284 = sub(body, 0)
    add(environment, {})
    local _g285 = (function ()
      map(function (_g286)
        local name = _g286[1]
        local exp = _g286[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g284)))
    end)()
    drop(environment)
    return(_g285)
  end, module = "core", export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g287 = body
      for k in next, _g287 do
        if (not number63(k)) then
          local v = _g287[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, module = "core", export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g288 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g288)}))
  end, module = "core", export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g289 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g289)}))
  end, module = "core", export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, module = "core", export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g290 = sub(body, 0)
    local _g291 = bind42(args, _g290)
    local _g292 = _g291[1]
    local _g293 = _g291[2]
    return(join({"%function", _g292}, _g293))
  end, module = "core", export = true}}}, lib = {import = {"core", "special"}, export = {}}, special = {import = {"utilities", "special", "core", "compiler"}, export = {["%local"] = {stmt = true, export = true, module = "special", special = function (_g294)
    local name = _g294[1]
    local value = _g294[2]
    local id = compile(name)
    local _g295 = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. _g295))
  end}, ["return"] = {stmt = true, export = true, module = "special", special = function (_g296)
    local x = _g296[1]
    local _g297 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g297))
  end}, ["if"] = {tr = true, module = "special", special = function (form, tail63)
    local str = ""
    local i = 0
    local _g298 = form
    while (i < length(_g298)) do
      local condition = _g298[(i + 1)]
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
  end, export = true, stmt = true}, ["%global-function"] = {tr = true, module = "special", special = function (_g299)
    local name = _g299[1]
    local args = _g299[2]
    local body = sub(_g299, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end, export = true, stmt = true}, ["%try"] = {tr = true, module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g300 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g300)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g301 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g301)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, export = true, stmt = true}, ["%array"] = {export = true, module = "special", special = function (forms)
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
    local _g302 = forms
    while (i < length(_g302)) do
      local x = _g302[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["not"] = {export = true, module = "special", special = function (_g303)
    local x = _g303[1]
    local _g304 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g304 .. ")"))
  end}, ["%object"] = {export = true, module = "special", special = function (forms)
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
    local _g305 = pairs
    while (i < length(_g305)) do
      local _g306 = _g305[(i + 1)]
      local k = _g306[1]
      local v = _g306[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g307 = compile(v)
      local _g308 = (function ()
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
      str = (str .. _g308 .. sep .. _g307)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}, ["break"] = {stmt = true, export = true, module = "special", special = function (_g111)
    return((indentation() .. "break"))
  end}, ["set"] = {stmt = true, export = true, module = "special", special = function (_g309)
    local lh = _g309[1]
    local rh = _g309[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end}, ["while"] = {tr = true, module = "special", special = function (_g310)
    local condition = _g310[1]
    local body = sub(_g310, 1)
    local _g311 = compile(condition)
    local _g312 = (function ()
      indent_level = (indent_level + 1)
      local _g313 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g313)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g311 .. ") {\n" .. _g312 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g311 .. " do\n" .. _g312 .. ind .. "end\n"))
    end
  end, export = true, stmt = true}, ["do"] = {tr = true, module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end, export = true, stmt = true}, ["get"] = {export = true, module = "special", special = function (_g314)
    local t = _g314[1]
    local k = _g314[2]
    local _g315 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g315, 0) == "{")) then
      _g315 = ("(" .. _g315 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g315 .. "." .. inner(k)))
    else
      return((_g315 .. "[" .. k1 .. "]"))
    end
  end}, ["%for"] = {tr = true, module = "special", special = function (_g316)
    local _g317 = _g316[1]
    local t = _g317[1]
    local k = _g317[2]
    local body = sub(_g316, 1)
    local _g318 = compile(t)
    local ind = indentation()
    local _g319 = (function ()
      indent_level = (indent_level + 1)
      local _g320 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g320)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g318 .. " do\n" .. _g319 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g318 .. ") {\n" .. _g319 .. ind .. "}\n"))
    end
  end, export = true, stmt = true}, ["%function"] = {export = true, module = "special", special = function (_g321)
    local args = _g321[1]
    local body = sub(_g321, 1)
    return(compile_function(args, body))
  end}, ["%local-function"] = {tr = true, module = "special", special = function (_g322)
    local name = _g322[1]
    local args = _g322[2]
    local body = sub(_g322, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, export = true, stmt = true}, ["error"] = {stmt = true, export = true, module = "special", special = function (_g323)
    local x = _g323[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end}}}, reader = {import = {"special", "core"}, export = {["define-reader"] = {macro = function (_g324, ...)
    local char = _g324[1]
    local stream = _g324[2]
    local body = unstash({...})
    local _g325 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g325)}))
  end, export = true, module = "reader"}, ["make-stream"] = {variable = true, export = true, module = "reader"}, ["read-all"] = {variable = true, export = true, module = "reader"}, ["read-from-string"] = {variable = true, export = true, module = "reader"}, ["read-table"] = {variable = true, export = true, module = "reader"}, read = {variable = true, export = true, module = "reader"}}}, utilities = {import = {"special", "core"}, export = {["bound?"] = {variable = true, export = true, module = "utilities"}, ["special-form?"] = {variable = true, export = true, module = "utilities"}, indentation = {variable = true, export = true, module = "utilities"}, ["to-id"] = {variable = true, export = true, module = "utilities"}, ["variable?"] = {variable = true, export = true, module = "utilities"}, quoted = {variable = true, export = true, module = "utilities"}, ["macro-function"] = {variable = true, export = true, module = "utilities"}, ["valid-id?"] = {variable = true, export = true, module = "utilities"}, ["symbol-expansion"] = {variable = true, export = true, module = "utilities"}, exported = {variable = true, export = true, module = "utilities"}, ["initial-environment"] = {variable = true, export = true, module = "utilities"}, quasiexpand = {variable = true, export = true, module = "utilities"}, ["special?"] = {variable = true, export = true, module = "utilities"}, ["indent-level"] = {global = true, export = true, module = "utilities"}, ["bind*"] = {variable = true, export = true, module = "utilities"}, getenv = {variable = true, export = true, module = "utilities"}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, export = true, module = "utilities"}, macroexpand = {variable = true, export = true, module = "utilities"}, bind = {variable = true, export = true, module = "utilities"}, ["quote-environment"] = {variable = true, export = true, module = "utilities"}, setenv = {variable = true, export = true, module = "utilities"}, ["stash*"] = {variable = true, export = true, module = "utilities"}, ["module-key"] = {variable = true, export = true, module = "utilities"}, ["macro?"] = {variable = true, export = true, module = "utilities"}, ["make-id"] = {}, imported = {variable = true, export = true, module = "utilities"}, ["symbol?"] = {variable = true, export = true, module = "utilities"}, ["quote-modules"] = {variable = true, export = true, module = "utilities"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g326 = sub(body, 0)
    local imports = {}
    local imp = _g326.import
    local exp = _g326.export
    local _g328 = 0
    local _g327 = (imp or {})
    while (_g328 < length(_g327)) do
      local k = _g327[(_g328 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g328 = (_g328 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g330 = 0
    local _g329 = (exp or {})
    while (_g330 < length(_g329)) do
      local k = _g329[(_g330 + 1)]
      setenv(k, {_stash = true, export = true})
      _g330 = (_g330 + 1)
    end
    return(join({"do"}, imports))
  end, module = "compiler", export = true}}}
end)();
(function ()
  local _g36 = nexus.runtime
  local keep = _g36.keep
  local read_file = _g36["read-file"]
  local _37message_handler = _g36["%message-handler"]
  local nil63 = _g36["nil?"]
  local exclude = _g36.exclude
  local exit = _g36.exit
  local is63 = _g36["is?"]
  local composite63 = _g36["composite?"]
  local splice = _g36.splice
  local _6061 = _g36["<="]
  local _6261 = _g36[">="]
  local drop = _g36.drop
  local find = _g36.find
  local cat = _g36.cat
  local sublist = _g36.sublist
  local table63 = _g36["table?"]
  local replicate = _g36.replicate
  local extend = _g36.extend
  local _61 = _g36["="]
  local _60 = _g36["<"]
  local substring = _g36.substring
  local last = _g36.last
  local iterate = _g36.iterate
  local list63 = _g36["list?"]
  local map = _g36.map
  local join = _g36.join
  local _43 = _g36["+"]
  local _42 = _g36["*"]
  local _ = _g36["-"]
  local _47 = _g36["/"]
  local map42 = _g36["map*"]
  local split = _g36.split
  local some63 = _g36["some?"]
  local _37 = _g36["%"]
  local string_literal63 = _g36["string-literal?"]
  local apply = _g36.apply
  local code = _g36.code
  local search = _g36.search
  local length = _g36.length
  local write_file = _g36["write-file"]
  local add = _g36.add
  local mapt = _g36.mapt
  local string63 = _g36["string?"]
  local sub = _g36.sub
  local keys63 = _g36["keys?"]
  local number63 = _g36["number?"]
  local hd = _g36.hd
  local to_string = _g36["to-string"]
  local inner = _g36.inner
  local tl = _g36.tl
  local char = _g36.char
  local stash = _g36.stash
  local reduce = _g36.reduce
  local reverse = _g36.reverse
  local empty63 = _g36["empty?"]
  local unstash = _g36.unstash
  local parse_number = _g36["parse-number"]
  local pairwise = _g36.pairwise
  local mapo = _g36.mapo
  local atom63 = _g36["atom?"]
  local function63 = _g36["function?"]
  local boolean63 = _g36["boolean?"]
  local write = _g36.write
  local id_literal63 = _g36["id-literal?"]
  local _62 = _g36[">"]
  local _g72 = nexus.utilities
  local bound63 = _g72["bound?"]
  local special_form63 = _g72["special-form?"]
  local variable63 = _g72["variable?"]
  local quote_modules = _g72["quote-modules"]
  local valid_id63 = _g72["valid-id?"]
  local symbol_expansion = _g72["symbol-expansion"]
  local exported = _g72.exported
  local initial_environment = _g72["initial-environment"]
  local quote_environment = _g72["quote-environment"]
  local imported = _g72.imported
  local bind42 = _g72["bind*"]
  local to_id = _g72["to-id"]
  local getenv = _g72.getenv
  local bind = _g72.bind
  local macroexpand = _g72.macroexpand
  local quoted = _g72.quoted
  local quasiexpand = _g72.quasiexpand
  local special63 = _g72["special?"]
  local stash42 = _g72["stash*"]
  local module_key = _g72["module-key"]
  local macro63 = _g72["macro?"]
  local setenv = _g72.setenv
  local macro_function = _g72["macro-function"]
  local symbol63 = _g72["symbol?"]
  local indentation = _g72.indentation
  local _g77 = nexus.reader
  local read_from_string = _g77["read-from-string"]
  local make_stream = _g77["make-stream"]
  local read_all = _g77["read-all"]
  local read_table = _g77["read-table"]
  local read = _g77.read
  local _g110 = nexus.compiler
  local eval = _g110.eval
  local compile_branch = _g110["compile-branch"]
  local compile_call = _g110["compile-call"]
  local compile = _g110.compile
  local compile_function = _g110["compile-function"]
  local in_module = _g110["in-module"]
  local compile_body = _g110["compile-body"]
  local load_module = _g110["load-module"]
  local compile_special = _g110["compile-special"]
  local open_module = _g110["open-module"]
  local function rep(str)
    local _g332 = (function ()
      local _g333,_g334 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g333, _g334})
    end)()
    local _g1 = _g332[1]
    local x = _g332[2]
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
    local _g335 = args
    while (i < length(_g335)) do
      local arg = _g335[(i + 1)]
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
      local _g336 = (spec or "main")
      in_module(_g336)
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  return(main())
end)();
