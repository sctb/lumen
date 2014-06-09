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
  local function mapl(f, l)
    local l1 = {}
    local _g15 = 0
    local _g14 = l
    while (_g15 < length(_g14)) do
      local x = _g14[(_g15 + 1)]
      local _g16 = f(x)
      if splice63(_g16) then
        l1 = join(l1, _g16.value)
      elseif is63(_g16) then
        add(l1, _g16)
      end
      _g15 = (_g15 + 1)
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local k = nil
    local _g17 = t
    for k in next, _g17 do
      if (not number63(k)) then
        local v = _g17[k]
        local x = f(v)
        if splice63(x) then
          l[k] = x.value
        elseif is63(x) then
          l[k] = x
        end
      end
    end
    return(l)
  end
  local function keys63(t)
    local k = nil
    local k1 = nil
    local _g18 = t
    for k1 in next, _g18 do
      if (not number63(k1)) then
        local v = _g18[k1]
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
      local _g19 = args
      for k in next, _g19 do
        if (not number63(k)) then
          local v = _g19[k]
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
        local _g20 = l
        for k in next, _g20 do
          if (not number63(k)) then
            local v = _g20[k]
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
  local function setenv(k, ...)
    local keys = unstash({...})
    local _g21 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g22 = _g21
      for k1 in next, _g22 do
        if (not number63(k1)) then
          local v = _g22[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  local function extend(t, ...)
    local xs = unstash({...})
    local _g23 = sub(xs, 0)
    return(join(t, _g23))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g24 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g25 = t
    for k in next, _g25 do
      if (not number63(k)) then
        local v = _g25[k]
        if (not _g24[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g26 = (function ()
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
    local _g27 = sub(xs, 0)
    if empty63(_g27) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g27))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g28 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g28))
  end
  local function _(...)
    local xs = unstash({...})
    local _g29 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g29)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g30 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g30))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g31 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g31)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g32 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g32)))
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
      local _g33 = x
      for k in next, _g33 do
        if (not number63(k)) then
          local v = _g33[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g34 = x1
      while (i < length(_g34)) do
        local y = _g34[(i + 1)]
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
    local _g35 = stash(args)
    return(f(unpack(_g35)))
  end
  local id_count = 0
  local function make_id()
    id_count = (id_count + 1)
    return(("_g" .. id_count))
  end
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  local _g36 = {}
  nexus.runtime = _g36
  _g36["nil?"] = nil63
  _g36["is?"] = is63
  _g36.length = length
  _g36["empty?"] = empty63
  _g36["some?"] = some63
  _g36.hd = hd
  _g36["string?"] = string63
  _g36["number?"] = number63
  _g36["boolean?"] = boolean63
  _g36["function?"] = function63
  _g36["composite?"] = composite63
  _g36["atom?"] = atom63
  _g36["table?"] = table63
  _g36["list?"] = list63
  _g36.substring = substring
  _g36.sublist = sublist
  _g36.sub = sub
  _g36.inner = inner
  _g36.tl = tl
  _g36.char = char
  _g36.code = code
  _g36["string-literal?"] = string_literal63
  _g36["id-literal?"] = id_literal63
  _g36.add = add
  _g36.drop = drop
  _g36.last = last
  _g36.reverse = reverse
  _g36.join = join
  _g36.reduce = reduce
  _g36.keep = keep
  _g36.find = find
  _g36.pairwise = pairwise
  _g36.iterate = iterate
  _g36.replicate = replicate
  _g36.splice = splice
  _g36.map = map
  _g36["keys?"] = keys63
  _g36.stash = stash
  _g36.unstash = unstash
  _g36.setenv = setenv
  _g36.extend = extend
  _g36.exclude = exclude
  _g36.search = search
  _g36.split = split
  _g36.cat = cat
  _g36["+"] = _43
  _g36["-"] = _
  _g36["*"] = _42
  _g36["/"] = _47
  _g36["%"] = _37
  _g36[">"] = _62
  _g36["<"] = _60
  _g36["="] = _61
  _g36[">="] = _6261
  _g36["<="] = _6061
  _g36["read-file"] = read_file
  _g36["write-file"] = write_file
  _g36.write = write
  _g36.exit = exit
  _g36["parse-number"] = parse_number
  _g36["to-string"] = to_string
  _g36.apply = apply
  _g36["make-id"] = make_id
  _g36["%message-handler"] = _37message_handler
end)();
(function ()
  local _g43 = nexus.runtime
  local nil63 = _g43["nil?"]
  local is63 = _g43["is?"]
  local length = _g43.length
  local empty63 = _g43["empty?"]
  local some63 = _g43["some?"]
  local hd = _g43.hd
  local string63 = _g43["string?"]
  local number63 = _g43["number?"]
  local boolean63 = _g43["boolean?"]
  local function63 = _g43["function?"]
  local composite63 = _g43["composite?"]
  local atom63 = _g43["atom?"]
  local table63 = _g43["table?"]
  local list63 = _g43["list?"]
  local substring = _g43.substring
  local sublist = _g43.sublist
  local sub = _g43.sub
  local inner = _g43.inner
  local tl = _g43.tl
  local char = _g43.char
  local code = _g43.code
  local string_literal63 = _g43["string-literal?"]
  local id_literal63 = _g43["id-literal?"]
  local add = _g43.add
  local drop = _g43.drop
  local last = _g43.last
  local reverse = _g43.reverse
  local join = _g43.join
  local reduce = _g43.reduce
  local keep = _g43.keep
  local find = _g43.find
  local pairwise = _g43.pairwise
  local iterate = _g43.iterate
  local replicate = _g43.replicate
  local splice = _g43.splice
  local map = _g43.map
  local keys63 = _g43["keys?"]
  local stash = _g43.stash
  local unstash = _g43.unstash
  local setenv = _g43.setenv
  local extend = _g43.extend
  local exclude = _g43.exclude
  local search = _g43.search
  local split = _g43.split
  local cat = _g43.cat
  local _43 = _g43["+"]
  local _ = _g43["-"]
  local _42 = _g43["*"]
  local _47 = _g43["/"]
  local _37 = _g43["%"]
  local _62 = _g43[">"]
  local _60 = _g43["<"]
  local _61 = _g43["="]
  local _6261 = _g43[">="]
  local _6061 = _g43["<="]
  local read_file = _g43["read-file"]
  local write_file = _g43["write-file"]
  local write = _g43.write
  local exit = _g43.exit
  local parse_number = _g43["parse-number"]
  local to_string = _g43["to-string"]
  local apply = _g43.apply
  local make_id = _g43["make-id"]
  local _37message_handler = _g43["%message-handler"]
  local function getenv(k, ...)
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
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  local function special_form63(form)
    return((list63(form) and special63(hd(form))))
  end
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  local function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  local function variable63(k)
    local b = find(function (frame)
      return((frame[k] or frame._scope))
    end, reverse(environment))
    return((table63(b) and is63(b.variable)))
  end
  local function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  local function bound63(x)
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
  local function quoted(form)
    if string63(form) then
      return(escape(form))
    elseif atom63(form) then
      return(form)
    else
      return(join({"list"}, map(quoted, form)))
    end
  end
  local function stash42(args)
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
  local function bind(lh, rh)
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
  local function bind42(args, body)
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
  local function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    elseif atom63(form) then
      return(form)
    else
      local x = hd(form)
      if (x == "%for") then
        local _g38 = form[1]
        local _g51 = form[2]
        local t = _g51[1]
        local k = _g51[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g39 = form[1]
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
          return(join({"%function", map(macroexpand, args)}, macroexpand(_g52)))
        end)()
        drop(environment)
        return(_g54)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g40 = form[1]
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
          return(join({x, name, map(macroexpand, _g57)}, macroexpand(_g58)))
        end)()
        drop(environment)
        return(_g60)
      elseif macro63(x) then
        return(macroexpand(apply(macro_function(x), tl(form))))
      else
        return(map(macroexpand, form))
      end
    end
  end
  local quasiexpand
  local quasiquote_list
  quasiquote_list = function (form, depth)
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
      return(map(function (x)
        return(quasiexpand(x, depth))
      end, form))
    end
  end
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
  local function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  local function valid_char63(n)
    return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
  end
  local function valid_id63(id)
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
  local function to_id(id)
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
  local function module_key(spec)
    if atom63(spec) then
      return(to_string(spec))
    else
      error("Unsupported module specification")
    end
  end
  local function exported()
    local toplevel = hd(environment)
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local n = nil
    local _g70 = toplevel
    for n in next, _g70 do
      if (not number63(n)) then
        local b = _g70[n]
        if (b.variable and b.export and (b.module == current_module)) then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({"do", join({"define", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  local function imported(spec)
    local k = module_key(spec)
    local x = nexus[k]
    if (x and keys63(x)) then
      local m = make_id()
      local imports = {}
      add(imports, join({"%local", m, join({"get", "nexus", join({"quote", k})})}))
      local b = nil
      local _g71 = x
      for b in next, _g71 do
        if (not number63(b)) then
          local _g41 = _g71[b]
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
  local function mapo(f, t)
    local o = {}
    local k = nil
    local _g72 = t
    for k in next, _g72 do
      if (not number63(k)) then
        local v = _g72[k]
        local x = f(k, v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (_g42, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
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
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g74 = {}
  nexus.utilities = _g74
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
  _g74.mapo = mapo
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
  local hd = _g76.hd
  local string63 = _g76["string?"]
  local number63 = _g76["number?"]
  local boolean63 = _g76["boolean?"]
  local function63 = _g76["function?"]
  local composite63 = _g76["composite?"]
  local atom63 = _g76["atom?"]
  local table63 = _g76["table?"]
  local list63 = _g76["list?"]
  local substring = _g76.substring
  local sublist = _g76.sublist
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
  local keys63 = _g76["keys?"]
  local stash = _g76.stash
  local unstash = _g76.unstash
  local setenv = _g76.setenv
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
  local write = _g76.write
  local exit = _g76.exit
  local parse_number = _g76["parse-number"]
  local to_string = _g76["to-string"]
  local apply = _g76.apply
  local make_id = _g76["make-id"]
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
  local _g82 = {}
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
  local hd = _g84.hd
  local string63 = _g84["string?"]
  local number63 = _g84["number?"]
  local boolean63 = _g84["boolean?"]
  local function63 = _g84["function?"]
  local composite63 = _g84["composite?"]
  local atom63 = _g84["atom?"]
  local table63 = _g84["table?"]
  local list63 = _g84["list?"]
  local substring = _g84.substring
  local sublist = _g84.sublist
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
  local keys63 = _g84["keys?"]
  local stash = _g84.stash
  local unstash = _g84.unstash
  local setenv = _g84.setenv
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
  local write = _g84.write
  local exit = _g84.exit
  local parse_number = _g84["parse-number"]
  local to_string = _g84["to-string"]
  local apply = _g84.apply
  local make_id = _g84["make-id"]
  local _37message_handler = _g84["%message-handler"]
  local _g85 = nexus.utilities
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
  local mapo = _g85.mapo
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
  local compile
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
  local function compile_body(forms, ...)
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
  local function terminator(stmt63)
    if (not stmt63) then
      return("")
    elseif (target == "js") then
      return(";\n")
    else
      return("\n")
    end
  end
  local function compile_special(form, stmt63, tail63)
    local _g90 = getenv(hd(form))
    local special = _g90.special
    local stmt = _g90.stmt
    local self_tr63 = _g90.tr
    if ((not stmt63) and stmt) then
      return(compile(join({join({"%function", {}, form})}), {_stash = true, ["tail?"] = tail63}))
    else
      local tr = terminator((stmt63 and (not self_tr63)))
      return((special(tl(form), tail63) .. tr))
    end
  end
  local function compile_call(form)
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
  local function compile_infix(_g91)
    local op = _g91[1]
    local args = sub(_g91, 1)
    local str = "("
    local _g92 = getop(op)
    local i = 0
    local _g93 = args
    while (i < length(_g93)) do
      local arg = _g93[(i + 1)]
      if ((_g92 == "-") and (length(args) == 1)) then
        str = (str .. _g92 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g92 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g94 = (function ()
      indent_level = (indent_level + 1)
      local _g95 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
      indent_level = (indent_level - 1)
      return(_g95)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g94 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g94 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g94 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g94 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g94 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g94 .. tr))
    end
  end
  local function compile_function(args, body, ...)
    local _g96 = unstash({...})
    local name = _g96.name
    local prefix = _g96.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g97 = (prefix or "")
    local _g98 = compile_args(args)
    local _g99 = (function ()
      indent_level = (indent_level + 1)
      local _g100 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g100)
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
      return(("function " .. id .. _g98 .. " {\n" .. _g99 .. ind .. "}" .. tr))
    else
      return((_g97 .. "function " .. id .. _g98 .. "\n" .. _g99 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
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
  local compiler_output
  local compilation_level
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
  local function open_module(spec)
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
  local function load_module(spec)
    if (nil63(module(spec)) or (compilation_level == 1)) then
      _37compile_module(spec)
    end
    return(open_module(spec))
  end
  local function in_module(spec)
    load_module(spec)
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  local function compile_module(spec)
    compilation_level = 0
    compiler_output = ""
    load_module(spec)
    return(compiler_output)
  end
  local function prologue()
    if current_module then
      local m = module(current_module)
      return(join(imported(current_module), map(function (x)
        return(splice(imported(x)))
      end, m.import)))
    end
  end
  local function eval(form)
    local previous = target
    target = "lua"
    local form1 = join({"do"}, join(prologue(), {form}))
    local x = compile(macroexpand(form1))
    target = previous
    return(run(x))
  end
  local _g119 = {}
  nexus.compiler = _g119
  _g119["compile-body"] = compile_body
  _g119["compile-call"] = compile_call
  _g119["compile-branch"] = compile_branch
  _g119["compile-function"] = compile_function
  _g119["compile-special"] = compile_special
  _g119.compile = compile
  _g119["open-module"] = open_module
  _g119["load-module"] = load_module
  _g119["in-module"] = in_module
  _g119["compile-module"] = compile_module
  _g119.eval = eval
end)();
(function ()
  local _g122 = nexus.runtime
  local nil63 = _g122["nil?"]
  local is63 = _g122["is?"]
  local length = _g122.length
  local empty63 = _g122["empty?"]
  local some63 = _g122["some?"]
  local hd = _g122.hd
  local string63 = _g122["string?"]
  local number63 = _g122["number?"]
  local boolean63 = _g122["boolean?"]
  local function63 = _g122["function?"]
  local composite63 = _g122["composite?"]
  local atom63 = _g122["atom?"]
  local table63 = _g122["table?"]
  local list63 = _g122["list?"]
  local substring = _g122.substring
  local sublist = _g122.sublist
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
  local keys63 = _g122["keys?"]
  local stash = _g122.stash
  local unstash = _g122.unstash
  local setenv = _g122.setenv
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
  local write = _g122.write
  local exit = _g122.exit
  local parse_number = _g122["parse-number"]
  local to_string = _g122["to-string"]
  local apply = _g122.apply
  local make_id = _g122["make-id"]
  local _37message_handler = _g122["%message-handler"]
  local _g123 = nexus.utilities
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
  local mapo = _g123.mapo
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
  local open_module = _g124["open-module"]
  local load_module = _g124["load-module"]
  local in_module = _g124["in-module"]
  local compile_module = _g124["compile-module"]
  local eval = _g124.eval
  return
end)();
(function ()
  local _g230 = nexus.runtime
  local nil63 = _g230["nil?"]
  local is63 = _g230["is?"]
  local length = _g230.length
  local empty63 = _g230["empty?"]
  local some63 = _g230["some?"]
  local hd = _g230.hd
  local string63 = _g230["string?"]
  local number63 = _g230["number?"]
  local boolean63 = _g230["boolean?"]
  local function63 = _g230["function?"]
  local composite63 = _g230["composite?"]
  local atom63 = _g230["atom?"]
  local table63 = _g230["table?"]
  local list63 = _g230["list?"]
  local substring = _g230.substring
  local sublist = _g230.sublist
  local sub = _g230.sub
  local inner = _g230.inner
  local tl = _g230.tl
  local char = _g230.char
  local code = _g230.code
  local string_literal63 = _g230["string-literal?"]
  local id_literal63 = _g230["id-literal?"]
  local add = _g230.add
  local drop = _g230.drop
  local last = _g230.last
  local reverse = _g230.reverse
  local join = _g230.join
  local reduce = _g230.reduce
  local keep = _g230.keep
  local find = _g230.find
  local pairwise = _g230.pairwise
  local iterate = _g230.iterate
  local replicate = _g230.replicate
  local splice = _g230.splice
  local map = _g230.map
  local keys63 = _g230["keys?"]
  local stash = _g230.stash
  local unstash = _g230.unstash
  local setenv = _g230.setenv
  local extend = _g230.extend
  local exclude = _g230.exclude
  local search = _g230.search
  local split = _g230.split
  local cat = _g230.cat
  local _43 = _g230["+"]
  local _ = _g230["-"]
  local _42 = _g230["*"]
  local _47 = _g230["/"]
  local _37 = _g230["%"]
  local _62 = _g230[">"]
  local _60 = _g230["<"]
  local _61 = _g230["="]
  local _6261 = _g230[">="]
  local _6061 = _g230["<="]
  local read_file = _g230["read-file"]
  local write_file = _g230["write-file"]
  local write = _g230.write
  local exit = _g230.exit
  local parse_number = _g230["parse-number"]
  local to_string = _g230["to-string"]
  local apply = _g230.apply
  local make_id = _g230["make-id"]
  local _37message_handler = _g230["%message-handler"]
  local _g231 = nexus.utilities
  local getenv = _g231.getenv
  local macro_function = _g231["macro-function"]
  local macro63 = _g231["macro?"]
  local special63 = _g231["special?"]
  local special_form63 = _g231["special-form?"]
  local symbol_expansion = _g231["symbol-expansion"]
  local symbol63 = _g231["symbol?"]
  local variable63 = _g231["variable?"]
  local bound63 = _g231["bound?"]
  local quoted = _g231.quoted
  local stash42 = _g231["stash*"]
  local bind = _g231.bind
  local bind42 = _g231["bind*"]
  local quasiexpand = _g231.quasiexpand
  local macroexpand = _g231.macroexpand
  local indentation = _g231.indentation
  local valid_id63 = _g231["valid-id?"]
  local to_id = _g231["to-id"]
  local module_key = _g231["module-key"]
  local imported = _g231.imported
  local exported = _g231.exported
  local mapo = _g231.mapo
  local quote_environment = _g231["quote-environment"]
  local quote_modules = _g231["quote-modules"]
  local initial_environment = _g231["initial-environment"]
  local _g232 = nexus.compiler
  local compile_body = _g232["compile-body"]
  local compile_call = _g232["compile-call"]
  local compile_branch = _g232["compile-branch"]
  local compile_function = _g232["compile-function"]
  local compile_special = _g232["compile-special"]
  local compile = _g232.compile
  local open_module = _g232["open-module"]
  local load_module = _g232["load-module"]
  local in_module = _g232["in-module"]
  local compile_module = _g232["compile-module"]
  local eval = _g232.eval
  target = "lua"
  return
end)();
(function ()
  local _g387 = nexus.runtime
  local nil63 = _g387["nil?"]
  local is63 = _g387["is?"]
  local length = _g387.length
  local empty63 = _g387["empty?"]
  local some63 = _g387["some?"]
  local hd = _g387.hd
  local string63 = _g387["string?"]
  local number63 = _g387["number?"]
  local boolean63 = _g387["boolean?"]
  local function63 = _g387["function?"]
  local composite63 = _g387["composite?"]
  local atom63 = _g387["atom?"]
  local table63 = _g387["table?"]
  local list63 = _g387["list?"]
  local substring = _g387.substring
  local sublist = _g387.sublist
  local sub = _g387.sub
  local inner = _g387.inner
  local tl = _g387.tl
  local char = _g387.char
  local code = _g387.code
  local string_literal63 = _g387["string-literal?"]
  local id_literal63 = _g387["id-literal?"]
  local add = _g387.add
  local drop = _g387.drop
  local last = _g387.last
  local reverse = _g387.reverse
  local join = _g387.join
  local reduce = _g387.reduce
  local keep = _g387.keep
  local find = _g387.find
  local pairwise = _g387.pairwise
  local iterate = _g387.iterate
  local replicate = _g387.replicate
  local splice = _g387.splice
  local map = _g387.map
  local keys63 = _g387["keys?"]
  local stash = _g387.stash
  local unstash = _g387.unstash
  local setenv = _g387.setenv
  local extend = _g387.extend
  local exclude = _g387.exclude
  local search = _g387.search
  local split = _g387.split
  local cat = _g387.cat
  local _43 = _g387["+"]
  local _ = _g387["-"]
  local _42 = _g387["*"]
  local _47 = _g387["/"]
  local _37 = _g387["%"]
  local _62 = _g387[">"]
  local _60 = _g387["<"]
  local _61 = _g387["="]
  local _6261 = _g387[">="]
  local _6061 = _g387["<="]
  local read_file = _g387["read-file"]
  local write_file = _g387["write-file"]
  local write = _g387.write
  local exit = _g387.exit
  local parse_number = _g387["parse-number"]
  local to_string = _g387["to-string"]
  local apply = _g387.apply
  local make_id = _g387["make-id"]
  local _37message_handler = _g387["%message-handler"]
  local _g388 = nexus.utilities
  local getenv = _g388.getenv
  local macro_function = _g388["macro-function"]
  local macro63 = _g388["macro?"]
  local special63 = _g388["special?"]
  local special_form63 = _g388["special-form?"]
  local symbol_expansion = _g388["symbol-expansion"]
  local symbol63 = _g388["symbol?"]
  local variable63 = _g388["variable?"]
  local bound63 = _g388["bound?"]
  local quoted = _g388.quoted
  local stash42 = _g388["stash*"]
  local bind = _g388.bind
  local bind42 = _g388["bind*"]
  local quasiexpand = _g388.quasiexpand
  local macroexpand = _g388.macroexpand
  local indentation = _g388.indentation
  local valid_id63 = _g388["valid-id?"]
  local to_id = _g388["to-id"]
  local module_key = _g388["module-key"]
  local imported = _g388.imported
  local exported = _g388.exported
  local mapo = _g388.mapo
  local quote_environment = _g388["quote-environment"]
  local quote_modules = _g388["quote-modules"]
  local initial_environment = _g388["initial-environment"]
  local _g389 = nexus.compiler
  local compile_body = _g389["compile-body"]
  local compile_call = _g389["compile-call"]
  local compile_branch = _g389["compile-branch"]
  local compile_function = _g389["compile-function"]
  local compile_special = _g389["compile-special"]
  local compile = _g389.compile
  local open_module = _g389["open-module"]
  local load_module = _g389["load-module"]
  local in_module = _g389["in-module"]
  local compile_module = _g389["compile-module"]
  local eval = _g389.eval
  modules = {core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true, module = "core"}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true, module = "core"}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g396 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g396)}))
  end, export = true, module = "core"}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g397 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g398)
      local lh = _g398[1]
      local rh = _g398[2]
      local _g400 = 0
      local _g399 = bind(lh, rh)
      while (_g400 < length(_g399)) do
        local _g401 = _g399[(_g400 + 1)]
        local id = _g401[1]
        local val = _g401[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g400 = (_g400 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g397)})))
  end, export = true, module = "core"}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g402 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g402)) then
      local _g403 = bind42(x, _g402)
      local args = _g403[1]
      local _g404 = _g403[2]
      return(join({"%global-function", name, args}, _g404))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true, module = "core"}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true, module = "core"}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g405 = sub(body, 0)
    local form = join({"fn", args}, _g405)
    eval(join((function ()
      local _g406 = {"setenv", join({"quote", name})}
      _g406.macro = form
      _g406.form = join({"quote", form})
      return(_g406)
    end)()))
    return(nil)
  end, export = true, module = "core"}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g407 = sub(body, 0)
    local form = join({"fn", args}, _g407)
    local keys = sub(_g407, length(_g407))
    eval(join((function ()
      local _g408 = {"setenv", join({"quote", name})}
      _g408.special = form
      _g408.form = join({"quote", form})
      return(_g408)
    end)(), keys))
    return(nil)
  end, export = true, module = "core"}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g229, x)
      return(x)
    end, body)))
  end, export = true, module = "core"}, language = {macro = function ()
    return(join({"quote", target}))
  end, export = true, module = "core"}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g409 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g409)}))
  end, export = true, module = "core"}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g410 = sub(body, 0)
    local _g411 = bind42(args, _g410)
    local _g412 = _g411[1]
    local _g413 = _g411[2]
    return(join({"%function", _g412}, _g413))
  end, export = true, module = "core"}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true, module = "core"}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g414 = sub(body, 0)
    add(environment, {})
    local _g415 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g414)))
    end)()
    drop(environment)
    return(_g415)
  end, export = true, module = "core"}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, module = "core", global = true}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true, module = "core"}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g416 = sub(body, 0)
    add(environment, {})
    local _g417 = (function ()
      map(function (_g418)
        local name = _g418[1]
        local exp = _g418[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g416)))
    end)()
    drop(environment)
    return(_g417)
  end, export = true, module = "core"}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true, module = "core"}, ["with-bindings"] = {macro = function (_g419, ...)
    local names = _g419[1]
    local body = unstash({...})
    local _g420 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g421 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g422 = {"setenv", x}
        _g422.variable = true
        return(_g422)
      end)())})}
      _g421.scope = true
      return(_g421)
    end)(), _g420))
  end, export = true, module = "core"}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g424 = 0
    local _g423 = elements
    while (_g424 < length(_g423)) do
      local e = _g423[(_g424 + 1)]
      l[e] = true
      _g424 = (_g424 + 1)
    end
    return(join({"table"}, l))
  end, export = true, module = "core"}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g425 = xs
      while (i < length(_g425)) do
        local x = _g425[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true, module = "core"}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g426 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g426)}))
  end, export = true, module = "core"}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g427 = body
      for k in next, _g427 do
        if (not number63(k)) then
          local v = _g427[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true, module = "core"}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g428 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g428)) then
      local _g429 = bind42(x, _g428)
      local args = _g429[1]
      local _g430 = _g429[2]
      return(join({"%local-function", name, args}, _g430))
    else
      return(join({"%local", name, x}))
    end
  end, export = true, module = "core"}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true, module = "core"}, across = {macro = function (_g431, ...)
    local l = _g431[1]
    local v = _g431[2]
    local i = _g431[3]
    local start = _g431[4]
    local body = unstash({...})
    local _g432 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g432, {join({"inc", i})}))})}))
  end, export = true, module = "core"}, each = {macro = function (_g433, ...)
    local t = _g433[1]
    local k = _g433[2]
    local v = _g433[3]
    local body = unstash({...})
    local _g434 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g435 = {"target"}
      _g435.js = join({"isNaN", join({"parseInt", k})})
      _g435.lua = join({"not", join({"number?", k})})
      return(_g435)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g434)})})}))
  end, export = true, module = "core"}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g436 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g437 = {"table"}
      _g437._scope = scope
      return(_g437)
    end)())}), join({"let", join({x, join({"do"}, _g436)}), join({"drop", "environment"}), x})}))
  end, export = true, module = "core"}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true, module = "core"}}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["read-table"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g438, ...)
    local char = _g438[1]
    local stream = _g438[2]
    local body = unstash({...})
    local _g439 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g439)}))
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g440 = sub(body, 0)
    local imports = {}
    local imp = _g440.import
    local exp = _g440.export
    local _g442 = 0
    local _g441 = (imp or {})
    while (_g442 < length(_g441)) do
      local k = _g441[(_g442 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g442 = (_g442 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g444 = 0
    local _g443 = (exp or {})
    while (_g444 < length(_g443)) do
      local k = _g443[(_g444 + 1)]
      setenv(k, {_stash = true, export = true})
      _g444 = (_g444 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "compiler"}, ["compile-body"] = {export = true, module = "compiler", variable = true}, ["compile-call"] = {export = true, module = "compiler", variable = true}, ["compile-branch"] = {export = true, module = "compiler", variable = true}, ["compile-function"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {export = true, module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, ["compile-module"] = {export = true, module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, module = "runtime", variable = true}, ["is?"] = {export = true, module = "runtime", variable = true}, length = {export = true, module = "runtime", variable = true}, ["empty?"] = {export = true, module = "runtime", variable = true}, ["some?"] = {export = true, module = "runtime", variable = true}, hd = {export = true, module = "runtime", variable = true}, ["string?"] = {export = true, module = "runtime", variable = true}, ["number?"] = {export = true, module = "runtime", variable = true}, ["boolean?"] = {export = true, module = "runtime", variable = true}, ["function?"] = {export = true, module = "runtime", variable = true}, ["composite?"] = {export = true, module = "runtime", variable = true}, ["atom?"] = {export = true, module = "runtime", variable = true}, ["table?"] = {export = true, module = "runtime", variable = true}, ["list?"] = {export = true, module = "runtime", variable = true}, substring = {export = true, module = "runtime", variable = true}, sublist = {export = true, module = "runtime", variable = true}, sub = {export = true, module = "runtime", variable = true}, inner = {export = true, module = "runtime", variable = true}, tl = {export = true, module = "runtime", variable = true}, char = {export = true, module = "runtime", variable = true}, code = {export = true, module = "runtime", variable = true}, ["string-literal?"] = {export = true, module = "runtime", variable = true}, ["id-literal?"] = {export = true, module = "runtime", variable = true}, add = {export = true, module = "runtime", variable = true}, drop = {export = true, module = "runtime", variable = true}, last = {export = true, module = "runtime", variable = true}, reverse = {export = true, module = "runtime", variable = true}, join = {export = true, module = "runtime", variable = true}, reduce = {export = true, module = "runtime", variable = true}, keep = {export = true, module = "runtime", variable = true}, find = {export = true, module = "runtime", variable = true}, pairwise = {export = true, module = "runtime", variable = true}, iterate = {export = true, module = "runtime", variable = true}, replicate = {export = true, module = "runtime", variable = true}, splice = {export = true, module = "runtime", variable = true}, map = {export = true, module = "runtime", variable = true}, ["keys?"] = {export = true, module = "runtime", variable = true}, stash = {export = true, module = "runtime", variable = true}, unstash = {export = true, module = "runtime", variable = true}, setenv = {export = true, module = "runtime", variable = true}, extend = {export = true, module = "runtime", variable = true}, exclude = {export = true, module = "runtime", variable = true}, search = {export = true, module = "runtime", variable = true}, split = {export = true, module = "runtime", variable = true}, cat = {export = true, module = "runtime", variable = true}, ["+"] = {export = true, module = "runtime", variable = true}, ["-"] = {export = true, module = "runtime", variable = true}, ["*"] = {export = true, module = "runtime", variable = true}, ["/"] = {export = true, module = "runtime", variable = true}, ["%"] = {export = true, module = "runtime", variable = true}, [">"] = {export = true, module = "runtime", variable = true}, ["<"] = {export = true, module = "runtime", variable = true}, ["="] = {export = true, module = "runtime", variable = true}, [">="] = {export = true, module = "runtime", variable = true}, ["<="] = {export = true, module = "runtime", variable = true}, ["read-file"] = {export = true, module = "runtime", variable = true}, ["write-file"] = {export = true, module = "runtime", variable = true}, write = {export = true, module = "runtime", variable = true}, exit = {export = true, module = "runtime", variable = true}, ["parse-number"] = {export = true, module = "runtime", variable = true}, ["to-string"] = {export = true, module = "runtime", variable = true}, apply = {export = true, module = "runtime", variable = true}, ["make-id"] = {export = true, module = "runtime", variable = true}, ["%message-handler"] = {export = true, module = "runtime", variable = true}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {}}, lib = {import = {"core", "special"}, export = {}}, utilities = {import = {"runtime", "special", "core"}, export = {getenv = {export = true, module = "utilities", variable = true}, ["macro-function"] = {export = true, module = "utilities", variable = true}, ["macro?"] = {export = true, module = "utilities", variable = true}, ["special?"] = {export = true, module = "utilities", variable = true}, ["special-form?"] = {export = true, module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, module = "utilities", variable = true}, ["symbol?"] = {export = true, module = "utilities", variable = true}, ["variable?"] = {export = true, module = "utilities", variable = true}, ["bound?"] = {export = true, module = "utilities", variable = true}, quoted = {export = true, module = "utilities", variable = true}, ["stash*"] = {export = true, module = "utilities", variable = true}, bind = {export = true, module = "utilities", variable = true}, ["bind*"] = {export = true, module = "utilities", variable = true}, quasiexpand = {export = true, module = "utilities", variable = true}, macroexpand = {export = true, module = "utilities", variable = true}, indentation = {export = true, module = "utilities", variable = true}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["valid-id?"] = {export = true, module = "utilities", variable = true}, ["to-id"] = {export = true, module = "utilities", variable = true}, ["module-key"] = {export = true, module = "utilities", variable = true}, imported = {export = true, module = "utilities", variable = true}, exported = {export = true, module = "utilities", variable = true}, mapo = {export = true, module = "utilities", variable = true}, ["quote-environment"] = {export = true, module = "utilities", variable = true}, ["quote-modules"] = {export = true, module = "utilities", variable = true}, ["initial-environment"] = {export = true, module = "utilities", variable = true}, ["indent-level"] = {global = true, export = true, module = "utilities"}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["break"] = {module = "special", export = true, stmt = true, special = function (_g121)
    return((indentation() .. "break"))
  end}, ["%try"] = {export = true, module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g445 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g445)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g446 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g446)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, stmt = true, tr = true}, ["while"] = {export = true, module = "special", special = function (_g447)
    local condition = _g447[1]
    local body = sub(_g447, 1)
    local _g448 = compile(condition)
    local _g449 = (function ()
      indent_level = (indent_level + 1)
      local _g450 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g450)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g448 .. ") {\n" .. _g449 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g448 .. " do\n" .. _g449 .. ind .. "end\n"))
    end
  end, stmt = true, tr = true}, ["get"] = {export = true, module = "special", special = function (_g451)
    local t = _g451[1]
    local k = _g451[2]
    local _g452 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g452, 0) == "{")) then
      _g452 = ("(" .. _g452 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g452 .. "." .. inner(k)))
    else
      return((_g452 .. "[" .. k1 .. "]"))
    end
  end}, ["if"] = {export = true, module = "special", special = function (form, tail63)
    local str = ""
    local i = 0
    local _g453 = form
    while (i < length(_g453)) do
      local condition = _g453[(i + 1)]
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
  end, stmt = true, tr = true}, ["%array"] = {export = true, module = "special", special = function (forms)
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
    local _g454 = forms
    while (i < length(_g454)) do
      local x = _g454[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["not"] = {export = true, module = "special", special = function (_g455)
    local x = _g455[1]
    local _g456 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g456 .. ")"))
  end}, ["%local-function"] = {export = true, module = "special", special = function (_g457)
    local name = _g457[1]
    local args = _g457[2]
    local body = sub(_g457, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, stmt = true, tr = true}, ["%local"] = {module = "special", export = true, stmt = true, special = function (_g458)
    local name = _g458[1]
    local value = _g458[2]
    local id = compile(name)
    local value1 = compile(value)
    local rh = (function ()
      if is63(value) then
        return((" = " .. value1))
      else
        return("")
      end
    end)()
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. rh))
  end}, ["%for"] = {export = true, module = "special", special = function (_g459)
    local _g460 = _g459[1]
    local t = _g460[1]
    local k = _g460[2]
    local body = sub(_g459, 1)
    local _g461 = compile(t)
    local ind = indentation()
    local _g462 = (function ()
      indent_level = (indent_level + 1)
      local _g463 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g463)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g461 .. " do\n" .. _g462 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g461 .. ") {\n" .. _g462 .. ind .. "}\n"))
    end
  end, stmt = true, tr = true}, ["error"] = {module = "special", export = true, stmt = true, special = function (_g464)
    local x = _g464[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end}, ["%function"] = {export = true, module = "special", special = function (_g465)
    local args = _g465[1]
    local body = sub(_g465, 1)
    return(compile_function(args, body))
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
    local _g466 = pairs
    while (i < length(_g466)) do
      local _g467 = _g466[(i + 1)]
      local k = _g467[1]
      local v = _g467[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g468 = compile(v)
      local _g469 = (function ()
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
      str = (str .. _g469 .. sep .. _g468)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}, ["do"] = {export = true, module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end, stmt = true, tr = true}, ["%global-function"] = {export = true, module = "special", special = function (_g470)
    local name = _g470[1]
    local args = _g470[2]
    local body = sub(_g470, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end, stmt = true, tr = true}, ["return"] = {module = "special", export = true, stmt = true, special = function (_g471)
    local x = _g471[1]
    local _g472 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g472))
  end}, ["set"] = {module = "special", export = true, stmt = true, special = function (_g473)
    local lh = _g473[1]
    local rh = _g473[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g474 = sub(body, 0)
    local imports = {}
    local imp = _g474.import
    local exp = _g474.export
    local _g476 = 0
    local _g475 = (imp or {})
    while (_g476 < length(_g475)) do
      local k = _g475[(_g476 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g476 = (_g476 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g478 = 0
    local _g477 = (exp or {})
    while (_g478 < length(_g477)) do
      local k = _g477[(_g478 + 1)]
      setenv(k, {_stash = true, export = true})
      _g478 = (_g478 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "compiler"}}}
  return
end)();
(function ()
  local _g37 = nexus.runtime
  local nil63 = _g37["nil?"]
  local is63 = _g37["is?"]
  local length = _g37.length
  local empty63 = _g37["empty?"]
  local some63 = _g37["some?"]
  local hd = _g37.hd
  local string63 = _g37["string?"]
  local number63 = _g37["number?"]
  local boolean63 = _g37["boolean?"]
  local function63 = _g37["function?"]
  local composite63 = _g37["composite?"]
  local atom63 = _g37["atom?"]
  local table63 = _g37["table?"]
  local list63 = _g37["list?"]
  local substring = _g37.substring
  local sublist = _g37.sublist
  local sub = _g37.sub
  local inner = _g37.inner
  local tl = _g37.tl
  local char = _g37.char
  local code = _g37.code
  local string_literal63 = _g37["string-literal?"]
  local id_literal63 = _g37["id-literal?"]
  local add = _g37.add
  local drop = _g37.drop
  local last = _g37.last
  local reverse = _g37.reverse
  local join = _g37.join
  local reduce = _g37.reduce
  local keep = _g37.keep
  local find = _g37.find
  local pairwise = _g37.pairwise
  local iterate = _g37.iterate
  local replicate = _g37.replicate
  local splice = _g37.splice
  local map = _g37.map
  local keys63 = _g37["keys?"]
  local stash = _g37.stash
  local unstash = _g37.unstash
  local setenv = _g37.setenv
  local extend = _g37.extend
  local exclude = _g37.exclude
  local search = _g37.search
  local split = _g37.split
  local cat = _g37.cat
  local _43 = _g37["+"]
  local _ = _g37["-"]
  local _42 = _g37["*"]
  local _47 = _g37["/"]
  local _37 = _g37["%"]
  local _62 = _g37[">"]
  local _60 = _g37["<"]
  local _61 = _g37["="]
  local _6261 = _g37[">="]
  local _6061 = _g37["<="]
  local read_file = _g37["read-file"]
  local write_file = _g37["write-file"]
  local write = _g37.write
  local exit = _g37.exit
  local parse_number = _g37["parse-number"]
  local to_string = _g37["to-string"]
  local apply = _g37.apply
  local make_id = _g37["make-id"]
  local _37message_handler = _g37["%message-handler"]
  local _g75 = nexus.utilities
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
  local mapo = _g75.mapo
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
  local open_module = _g120["open-module"]
  local load_module = _g120["load-module"]
  local in_module = _g120["in-module"]
  local compile_module = _g120["compile-module"]
  local eval = _g120.eval
  local function rep(str)
    local _g480 = (function ()
      local _g481,_g482 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g481, _g482})
    end)()
    local _g1 = _g480[1]
    local x = _g480[2]
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
    local _g483 = args
    while (i < length(_g483)) do
      local arg = _g483[(i + 1)]
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
      in_module((spec or "main"))
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  return
end)();
