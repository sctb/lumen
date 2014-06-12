(function ()
  nexus = {}
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
    local _g21 = (upto or length(l))
    local l2 = {}
    while (i < _g21) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  local function sub(x, from, upto)
    local _g22 = (from or 0)
    if string63(x) then
      return(substring(x, _g22, upto))
    else
      local l = sublist(x, _g22, upto)
      local _g23 = x
      local k = nil
      for k in next, _g23 do
        if (not number63(k)) then
          local v = _g23[k]
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
      local _g24 = l1
      local k = nil
      for k in next, _g24 do
        if (not number63(k)) then
          local v = _g24[k]
          l[k] = v
        end
      end
      local _g25 = l2
      local k = nil
      for k in next, _g25 do
        if (not number63(k)) then
          local v = _g25[k]
          l[k] = v
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
    local _g26 = l
    local _g27 = 0
    while (_g27 < length(_g26)) do
      local x = _g26[(_g27 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g27 = (_g27 + 1)
    end
    return(l1)
  end
  local function find(f, l)
    local _g28 = l
    local _g29 = 0
    while (_g29 < length(_g28)) do
      local x = _g28[(_g29 + 1)]
      local _g30 = f(x)
      if _g30 then
        return(_g30)
      end
      _g29 = (_g29 + 1)
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
    return({value = x, _splice = true})
  end
  local function splice63(x)
    return((table63(x) and x._splice))
  end
  local function mapl(f, l)
    local l1 = {}
    local _g31 = l
    local _g32 = 0
    while (_g32 < length(_g31)) do
      local x = _g31[(_g32 + 1)]
      local _g33 = f(x)
      if splice63(_g33) then
        l1 = join(l1, _g33.value)
      elseif is63(_g33) then
        add(l1, _g33)
      end
      _g32 = (_g32 + 1)
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g34 = t
    local k = nil
    for k in next, _g34 do
      if (not number63(k)) then
        local v = _g34[k]
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
    local _g35 = t
    local k1 = nil
    for k1 in next, _g35 do
      if (not number63(k1)) then
        local v = _g35[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g36 = args
      local k = nil
      for k in next, _g36 do
        if (not number63(k)) then
          local v = _g36[k]
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
        local _g37 = l
        local k = nil
        for k in next, _g37 do
          if (not number63(k)) then
            local v = _g37[k]
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
    local _g38 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local _g39 = _g38
      local k1 = nil
      for k1 in next, _g39 do
        if (not number63(k1)) then
          local v = _g39[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  local function extend(t, ...)
    local xs = unstash({...})
    local _g40 = sub(xs, 0)
    return(join(t, _g40))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g41 = sub(keys, 0)
    local t1 = sublist(t)
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      if (not number63(k)) then
        local v = _g42[k]
        if (not _g41[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g43 = (function ()
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
    local _g44 = sub(xs, 0)
    if empty63(_g44) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g44))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g45 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g45))
  end
  local function _(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g46)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g47))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g48)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g49)))
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
      local _g50 = x
      local k = nil
      for k in next, _g50 do
        if (not number63(k)) then
          local v = _g50[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local _g51 = x1
      local i = 0
      while (i < length(_g51)) do
        local y = _g51[(i + 1)]
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
    local _g52 = stash(args)
    return(f(unpack(_g52)))
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
  local _g53 = {}
  nexus.runtime = _g53
  _g53.sublist = sublist
  _g53.add = add
  _g53["empty?"] = empty63
  _g53.pairwise = pairwise
  _g53.setenv = setenv
  _g53["number?"] = number63
  _g53["="] = _61
  _g53[">"] = _62
  _g53["composite?"] = composite63
  _g53["<"] = _60
  _g53["id-count"] = id_count
  _g53.map = map
  _g53["is?"] = is63
  _g53.mapl = mapl
  _g53.char = char
  _g53["splice?"] = splice63
  _g53["%message-handler"] = _37message_handler
  _g53["make-id"] = make_id
  _g53.keep = keep
  _g53.apply = apply
  _g53["to-string"] = to_string
  _g53.find = find
  _g53.reduce = reduce
  _g53["parse-number"] = parse_number
  _g53.exclude = exclude
  _g53.exit = exit
  _g53.write = write
  _g53["-"] = _
  _g53["read-file"] = read_file
  _g53["<="] = _6061
  _g53["string?"] = string63
  _g53.drop = drop
  _g53[">="] = _6261
  _g53.length = length
  _g53.sub = sub
  _g53["*"] = _42
  _g53["some?"] = some63
  _g53["boolean?"] = boolean63
  _g53.extend = extend
  _g53["write-file"] = write_file
  _g53.last = last
  _g53.splice = splice
  _g53.cat = cat
  _g53.split = split
  _g53.reverse = reverse
  _g53.inner = inner
  _g53.stash = stash
  _g53["keys?"] = keys63
  _g53.replicate = replicate
  _g53.iterate = iterate
  _g53.join = join
  _g53["id-literal?"] = id_literal63
  _g53["string-literal?"] = string_literal63
  _g53.code = code
  _g53.unstash = unstash
  _g53["/"] = _47
  _g53["function?"] = function63
  _g53["+"] = _43
  _g53["%"] = _37
  _g53.search = search
  _g53["list?"] = list63
  _g53["table?"] = table63
  _g53["atom?"] = atom63
  _g53.substring = substring
  _g53.hd = hd
  _g53.tl = tl
  _g53["nil?"] = nil63
end)();
(function ()
  local _g58 = nexus.runtime
  local parse_number = _g58["parse-number"]
  local sublist = _g58.sublist
  local add = _g58.add
  local split = _g58.split
  local _37message_handler = _g58["%message-handler"]
  local pairwise = _g58.pairwise
  local setenv = _g58.setenv
  local number63 = _g58["number?"]
  local stash = _g58.stash
  local _61 = _g58["="]
  local _62 = _g58[">"]
  local exit = _g58.exit
  local _60 = _g58["<"]
  local string_literal63 = _g58["string-literal?"]
  local map = _g58.map
  local is63 = _g58["is?"]
  local char = _g58.char
  local keep = _g58.keep
  local find = _g58.find
  local reduce = _g58.reduce
  local exclude = _g58.exclude
  local join = _g58.join
  local sub = _g58.sub
  local write = _g58.write
  local drop = _g58.drop
  local length = _g58.length
  local some63 = _g58["some?"]
  local boolean63 = _g58["boolean?"]
  local extend = _g58.extend
  local write_file = _g58["write-file"]
  local splice = _g58.splice
  local reverse = _g58.reverse
  local replicate = _g58.replicate
  local function63 = _g58["function?"]
  local to_string = _g58["to-string"]
  local nil63 = _g58["nil?"]
  local tl = _g58.tl
  local composite63 = _g58["composite?"]
  local substring = _g58.substring
  local atom63 = _g58["atom?"]
  local _6261 = _g58[">="]
  local _ = _g58["-"]
  local list63 = _g58["list?"]
  local _47 = _g58["/"]
  local table63 = _g58["table?"]
  local _42 = _g58["*"]
  local _43 = _g58["+"]
  local apply = _g58.apply
  local _37 = _g58["%"]
  local search = _g58.search
  local last = _g58.last
  local empty63 = _g58["empty?"]
  local make_id = _g58["make-id"]
  local cat = _g58.cat
  local unstash = _g58.unstash
  local code = _g58.code
  local iterate = _g58.iterate
  local hd = _g58.hd
  local id_literal63 = _g58["id-literal?"]
  local keys63 = _g58["keys?"]
  local inner = _g58.inner
  local _6061 = _g58["<="]
  local string63 = _g58["string?"]
  local read_file = _g58["read-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g61 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g62 = keys63(_g61)
        if _g62 then
          return(b[_g62])
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
  local function toplevel63()
    return((length(environment) == 1))
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
      local _g63 = args
      local k = nil
      for k in next, _g63 do
        if (not number63(k)) then
          local v = _g63[k]
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
      local _g64 = lh
      local i = 0
      while (i < length(_g64)) do
        local x = _g64[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local _g65 = lh
      local k = nil
      for k in next, _g65 do
        if (not number63(k)) then
          local v = _g65[k]
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
      local _g66 = args
      local _g67 = 0
      while (_g67 < length(_g66)) do
        local arg = _g66[(_g67 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g67 = (_g67 + 1)
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
        local _g54 = form[1]
        local _g68 = form[2]
        local t = _g68[1]
        local k = _g68[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g55 = form[1]
        local args = form[2]
        local _g69 = sub(form, 2)
        add(environment, {_scope = true})
        local _g71 = (function ()
          local _g72 = args
          local _g73 = 0
          while (_g73 < length(_g72)) do
            local _g70 = _g72[(_g73 + 1)]
            setenv(_g70, {_stash = true, variable = true})
            _g73 = (_g73 + 1)
          end
          return(join({"%function", map(macroexpand, args)}, macroexpand(_g69)))
        end)()
        drop(environment)
        return(_g71)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g56 = form[1]
        local name = form[2]
        local _g74 = form[3]
        local _g75 = sub(form, 3)
        add(environment, {_scope = true})
        local _g77 = (function ()
          local _g78 = _g74
          local _g79 = 0
          while (_g79 < length(_g78)) do
            local _g76 = _g78[(_g79 + 1)]
            setenv(_g76, {_stash = true, variable = true})
            _g79 = (_g79 + 1)
          end
          return(join({x, name, map(macroexpand, _g74)}, macroexpand(_g75)))
        end)()
        drop(environment)
        return(_g77)
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
    local _g80 = form
    local k = nil
    for k in next, _g80 do
      if (not number63(k)) then
        local v = _g80[k]
        local _g81 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g81
      end
    end
    local _g82 = form
    local _g83 = 0
    while (_g83 < length(_g82)) do
      local x = _g82[(_g83 + 1)]
      if quasisplice63(x, depth) then
        local _g84 = quasiexpand(x[2])
        add(xs, _g84)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g83 = (_g83 + 1)
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
  local reserved = {["try"] = true, ["this"] = true, ["then"] = true, ["typeof"] = true, ["function"] = true, ["local"] = true, ["case"] = true, ["void"] = true, [">"] = true, ["not"] = true, ["<"] = true, ["<="] = true, ["end"] = true, ["elseif"] = true, ["nil"] = true, ["default"] = true, ["continue"] = true, ["catch"] = true, ["do"] = true, ["while"] = true, ["until"] = true, ["or"] = true, ["delete"] = true, ["false"] = true, [">="] = true, ["true"] = true, ["switch"] = true, ["and"] = true, ["in"] = true, ["="] = true, ["for"] = true, ["else"] = true, ["throw"] = true, ["return"] = true, ["=="] = true, ["with"] = true, ["break"] = true, ["new"] = true, ["instanceof"] = true, ["%"] = true, ["var"] = true, ["-"] = true, ["if"] = true, ["+"] = true, ["repeat"] = true, ["debugger"] = true, ["*"] = true, ["finally"] = true, ["/"] = true}
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
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g89 = hd(environment)
    local n = nil
    for n in next, _g89 do
      if (not number63(n)) then
        local b = _g89[n]
        if (b.variable and (b.module == current_module)) then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({"do", join({"%local", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  local function imported(spec, ...)
    local _g90 = unstash({...})
    local all = _g90.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g91 = module(spec).export
      local n = nil
      for n in next, _g91 do
        if (not number63(n)) then
          local b = _g91[n]
          if (b.variable and (all or b.export)) then
            add(imports, join({"%local", n, join({"get", m, join({"quote", n})})}))
          end
        end
      end
    end
    if some63(imports) then
      return(join({join({"%local", m, join({"get", "nexus", join({"quote", k})})})}, imports))
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
    local _g92 = t
    local k = nil
    for k in next, _g92 do
      if (not number63(k)) then
        local v = _g92[k]
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
    return(join({"%object"}, mapo(function (_g57, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g93 = {"table"}
      _g93.export = quote_frame(m.export)
      _g93.import = quoted(m.import)
      return(_g93)
    end)()))
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g94 = {}
  nexus.utilities = _g94
  _g94.quoted = quoted
  _g94["quasisplice?"] = quasisplice63
  _g94["special?"] = special63
  _g94["bound?"] = bound63
  _g94["macro?"] = macro63
  _g94.escape = escape
  _g94["stash*"] = stash42
  _g94.indentation = indentation
  _g94.quasiexpand = quasiexpand
  _g94["toplevel?"] = toplevel63
  _g94["can-unquote?"] = can_unquote63
  _g94["global?"] = global63
  _g94["quote-modules"] = quote_modules
  _g94["quote-frame"] = quote_frame
  _g94["initial-environment"] = initial_environment
  _g94.getenv = getenv
  _g94["module-key"] = module_key
  _g94["quote-module"] = quote_module
  _g94["quote-binding"] = quote_binding
  _g94["special-form?"] = special_form63
  _g94["valid-char?"] = valid_char63
  _g94["numeric?"] = numeric63
  _g94.reserved = reserved
  _g94["quasiquote-list"] = quasiquote_list
  _g94["quasiquoting?"] = quasiquoting63
  _g94["quoting?"] = quoting63
  _g94["quote-environment"] = quote_environment
  _g94.mapo = mapo
  _g94.exported = exported
  _g94.imported = imported
  _g94["to-id"] = to_id
  _g94.module = module
  _g94.macroexpand = macroexpand
  _g94["bind*"] = bind42
  _g94.bind = bind
  _g94["variable?"] = variable63
  _g94["symbol?"] = symbol63
  _g94["macro-function"] = macro_function
  _g94["symbol-expansion"] = symbol_expansion
  _g94["valid-id?"] = valid_id63
end)();
(function ()
  local _g95 = nexus.runtime
  local parse_number = _g95["parse-number"]
  local sublist = _g95.sublist
  local add = _g95.add
  local split = _g95.split
  local _37message_handler = _g95["%message-handler"]
  local pairwise = _g95.pairwise
  local setenv = _g95.setenv
  local number63 = _g95["number?"]
  local stash = _g95.stash
  local _61 = _g95["="]
  local _62 = _g95[">"]
  local exit = _g95.exit
  local _60 = _g95["<"]
  local string_literal63 = _g95["string-literal?"]
  local map = _g95.map
  local is63 = _g95["is?"]
  local char = _g95.char
  local keep = _g95.keep
  local find = _g95.find
  local reduce = _g95.reduce
  local exclude = _g95.exclude
  local join = _g95.join
  local sub = _g95.sub
  local write = _g95.write
  local drop = _g95.drop
  local length = _g95.length
  local some63 = _g95["some?"]
  local boolean63 = _g95["boolean?"]
  local extend = _g95.extend
  local write_file = _g95["write-file"]
  local splice = _g95.splice
  local reverse = _g95.reverse
  local replicate = _g95.replicate
  local function63 = _g95["function?"]
  local to_string = _g95["to-string"]
  local nil63 = _g95["nil?"]
  local tl = _g95.tl
  local composite63 = _g95["composite?"]
  local substring = _g95.substring
  local atom63 = _g95["atom?"]
  local _6261 = _g95[">="]
  local _ = _g95["-"]
  local list63 = _g95["list?"]
  local _47 = _g95["/"]
  local table63 = _g95["table?"]
  local _42 = _g95["*"]
  local _43 = _g95["+"]
  local apply = _g95.apply
  local _37 = _g95["%"]
  local search = _g95.search
  local last = _g95.last
  local empty63 = _g95["empty?"]
  local make_id = _g95["make-id"]
  local cat = _g95.cat
  local unstash = _g95.unstash
  local code = _g95.code
  local iterate = _g95.iterate
  local hd = _g95.hd
  local id_literal63 = _g95["id-literal?"]
  local keys63 = _g95["keys?"]
  local inner = _g95.inner
  local _6061 = _g95["<="]
  local string63 = _g95["string?"]
  local read_file = _g95["read-file"]
  local delimiters = {["("] = true, [";"] = true, ["\n"] = true, [")"] = true}
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
  local function make_stream(str)
    return({string = str, len = length(str), pos = 0})
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
  local _g106 = {}
  nexus.reader = _g106
  _g106["flag?"] = flag63
  _g106.eof = eof
  _g106["skip-non-code"] = skip_non_code
  _g106["read-char"] = read_char
  _g106.whitespace = whitespace
  _g106.delimiters = delimiters
  _g106["read-from-string"] = read_from_string
  _g106["read-table"] = read_table
  _g106["read-all"] = read_all
  _g106["make-stream"] = make_stream
  _g106["peek-char"] = peek_char
  _g106["key?"] = key63
  _g106.read = read
end)();
(function ()
  local _g107 = nexus.runtime
  local parse_number = _g107["parse-number"]
  local sublist = _g107.sublist
  local add = _g107.add
  local split = _g107.split
  local _37message_handler = _g107["%message-handler"]
  local pairwise = _g107.pairwise
  local setenv = _g107.setenv
  local number63 = _g107["number?"]
  local stash = _g107.stash
  local _61 = _g107["="]
  local _62 = _g107[">"]
  local exit = _g107.exit
  local _60 = _g107["<"]
  local string_literal63 = _g107["string-literal?"]
  local map = _g107.map
  local is63 = _g107["is?"]
  local char = _g107.char
  local keep = _g107.keep
  local find = _g107.find
  local reduce = _g107.reduce
  local exclude = _g107.exclude
  local join = _g107.join
  local sub = _g107.sub
  local write = _g107.write
  local drop = _g107.drop
  local length = _g107.length
  local some63 = _g107["some?"]
  local boolean63 = _g107["boolean?"]
  local extend = _g107.extend
  local write_file = _g107["write-file"]
  local splice = _g107.splice
  local reverse = _g107.reverse
  local replicate = _g107.replicate
  local function63 = _g107["function?"]
  local to_string = _g107["to-string"]
  local nil63 = _g107["nil?"]
  local tl = _g107.tl
  local composite63 = _g107["composite?"]
  local substring = _g107.substring
  local atom63 = _g107["atom?"]
  local _6261 = _g107[">="]
  local _ = _g107["-"]
  local list63 = _g107["list?"]
  local _47 = _g107["/"]
  local table63 = _g107["table?"]
  local _42 = _g107["*"]
  local _43 = _g107["+"]
  local apply = _g107.apply
  local _37 = _g107["%"]
  local search = _g107.search
  local last = _g107.last
  local empty63 = _g107["empty?"]
  local make_id = _g107["make-id"]
  local cat = _g107.cat
  local unstash = _g107.unstash
  local code = _g107.code
  local iterate = _g107.iterate
  local hd = _g107.hd
  local id_literal63 = _g107["id-literal?"]
  local keys63 = _g107["keys?"]
  local inner = _g107.inner
  local _6061 = _g107["<="]
  local string63 = _g107["string?"]
  local read_file = _g107["read-file"]
  local function optimize(form)
    return(form)
  end
  local _g110 = {}
  nexus.optimizer = _g110
  _g110.optimize = optimize
end)();
(function ()
  local _g111 = nexus.runtime
  local parse_number = _g111["parse-number"]
  local sublist = _g111.sublist
  local add = _g111.add
  local split = _g111.split
  local _37message_handler = _g111["%message-handler"]
  local pairwise = _g111.pairwise
  local setenv = _g111.setenv
  local number63 = _g111["number?"]
  local stash = _g111.stash
  local _61 = _g111["="]
  local _62 = _g111[">"]
  local exit = _g111.exit
  local _60 = _g111["<"]
  local string_literal63 = _g111["string-literal?"]
  local map = _g111.map
  local is63 = _g111["is?"]
  local char = _g111.char
  local keep = _g111.keep
  local find = _g111.find
  local reduce = _g111.reduce
  local exclude = _g111.exclude
  local join = _g111.join
  local sub = _g111.sub
  local write = _g111.write
  local drop = _g111.drop
  local length = _g111.length
  local some63 = _g111["some?"]
  local boolean63 = _g111["boolean?"]
  local extend = _g111.extend
  local write_file = _g111["write-file"]
  local splice = _g111.splice
  local reverse = _g111.reverse
  local replicate = _g111.replicate
  local function63 = _g111["function?"]
  local to_string = _g111["to-string"]
  local nil63 = _g111["nil?"]
  local tl = _g111.tl
  local composite63 = _g111["composite?"]
  local substring = _g111.substring
  local atom63 = _g111["atom?"]
  local _6261 = _g111[">="]
  local _ = _g111["-"]
  local list63 = _g111["list?"]
  local _47 = _g111["/"]
  local table63 = _g111["table?"]
  local _42 = _g111["*"]
  local _43 = _g111["+"]
  local apply = _g111.apply
  local _37 = _g111["%"]
  local search = _g111.search
  local last = _g111.last
  local empty63 = _g111["empty?"]
  local make_id = _g111["make-id"]
  local cat = _g111.cat
  local unstash = _g111.unstash
  local code = _g111.code
  local iterate = _g111.iterate
  local hd = _g111.hd
  local id_literal63 = _g111["id-literal?"]
  local keys63 = _g111["keys?"]
  local inner = _g111.inner
  local _6061 = _g111["<="]
  local string63 = _g111["string?"]
  local read_file = _g111["read-file"]
  local _g112 = nexus.utilities
  local macro63 = _g112["macro?"]
  local mapo = _g112.mapo
  local stash42 = _g112["stash*"]
  local symbol63 = _g112["symbol?"]
  local quote_modules = _g112["quote-modules"]
  local module = _g112.module
  local indentation = _g112.indentation
  local quoted = _g112.quoted
  local initial_environment = _g112["initial-environment"]
  local getenv = _g112.getenv
  local symbol_expansion = _g112["symbol-expansion"]
  local bind = _g112.bind
  local macro_function = _g112["macro-function"]
  local exported = _g112.exported
  local module_key = _g112["module-key"]
  local special_form63 = _g112["special-form?"]
  local quote_environment = _g112["quote-environment"]
  local macroexpand = _g112.macroexpand
  local bind42 = _g112["bind*"]
  local imported = _g112.imported
  local quasiexpand = _g112.quasiexpand
  local variable63 = _g112["variable?"]
  local special63 = _g112["special?"]
  local to_id = _g112["to-id"]
  local toplevel63 = _g112["toplevel?"]
  local bound63 = _g112["bound?"]
  local valid_id63 = _g112["valid-id?"]
  local _g115 = nexus.reader
  local read_from_string = _g115["read-from-string"]
  local make_stream = _g115["make-stream"]
  local read = _g115.read
  local read_all = _g115["read-all"]
  local read_table = _g115["read-table"]
  local infix = {lua = {["="] = "==", ["and"] = true, cat = "..", ["or"] = true, ["~="] = true}, js = {["="] = "===", ["and"] = "&&", cat = "+", ["or"] = "||", ["~="] = "!="}, common = {["%"] = true, ["<="] = true, [">="] = true, ["-"] = true, [">"] = true, ["/"] = true, ["*"] = true, ["+"] = true, ["<"] = true}}
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
    local _g116 = args
    local i = 0
    while (i < length(_g116)) do
      local arg = _g116[(i + 1)]
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
    local _g117 = unstash({...})
    local tail = _g117.tail
    local str = ""
    local _g118 = forms
    local i = 0
    while (i < length(_g118)) do
      local x = _g118[(i + 1)]
      local t63 = (tail and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, tail = t63, stmt = true}))
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
    local _g119 = getenv(hd(form))
    local special = _g119.special
    local stmt = _g119.stmt
    local self_tr63 = _g119.tr
    if ((not stmt63) and stmt) then
      return(compile(join({join({"%function", {}, form})}), {_stash = true, tail = tail63}))
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
  local function compile_infix(_g120)
    local op = _g120[1]
    local args = sub(_g120, 1)
    local str = "("
    local _g121 = getop(op)
    local _g122 = args
    local i = 0
    while (i < length(_g122)) do
      local arg = _g122[(i + 1)]
      if ((_g121 == "-") and (length(args) == 1)) then
        str = (str .. _g121 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g121 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g123 = (function ()
      indent_level = (indent_level + 1)
      local _g124 = compile(body, {_stash = true, tail = tail63, stmt = true})
      indent_level = (indent_level - 1)
      return(_g124)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g123 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g123 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g123 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g123 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g123 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g123 .. tr))
    end
  end
  local function compile_function(args, body, ...)
    local _g125 = unstash({...})
    local name = _g125.name
    local prefix = _g125.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g126 = (prefix or "")
    local _g127 = compile_args(args)
    local _g128 = (function ()
      indent_level = (indent_level + 1)
      local _g129 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g129)
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
      return(("function " .. id .. _g127 .. " {\n" .. _g128 .. ind .. "}" .. tr))
    else
      return((_g126 .. "function " .. id .. _g127 .. "\n" .. _g128 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g130 = unstash({...})
    local tail = _g130.tail
    local stmt = _g130.stmt
    if (tail and can_return63(form)) then
      form = join({"return", form})
    end
    if nil63(form) then
      return("")
    elseif special_form63(form) then
      return(compile_special(form, stmt, tail))
    else
      local tr = terminator(stmt)
      local ind = (function ()
        if stmt then
          return(indentation())
        else
          return("")
        end
      end)()
      local _g131 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g131 .. tr))
    end
  end
  current_module = nil
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g132 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g132, {epilog}))}))
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
  local compiling63 = false
  local compiler_output = ""
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    local k = module_key(spec)
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    local m = module(spec)
    local toplevel = hd(environment)
    current_module = mod0
    environment = env0
    local _g133 = toplevel
    local name = nil
    for name in next, _g133 do
      if (not number63(name)) then
        local binding = _g133[name]
        if (binding.module == k) then
          m.export[name] = binding
        end
      end
    end
    if compiling63 then
      compiler_output = (compiler_output .. compiled)
    else
      return(run(compiled))
    end
  end
  local function open_module(spec, ...)
    local _g134 = unstash({...})
    local all = _g134.all
    local m = module(spec)
    local frame = last(environment)
    local _g135 = m.export
    local k = nil
    for k in next, _g135 do
      if (not number63(k)) then
        local v = _g135[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g136 = unstash({...})
    local all = _g136.all
    if nil63(module(spec)) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = all}))
  end
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  local function compile_module(spec)
    compiling63 = true
    _37compile_module(spec)
    return(compiler_output)
  end
  local function prologue()
    if current_module then
      return(join(imported(current_module, {_stash = true, all = true}), (function ()
        local m = module(current_module)
        return(map(function (x)
          return(splice(imported(x)))
        end, m.import))
      end)()))
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
  local _g137 = {}
  nexus.compiler = _g137
  _g137["compile-module"] = compile_module
  _g137["in-module"] = in_module
  _g137["module-path"] = module_path
  _g137.getop = getop
  _g137["compile-function"] = compile_function
  _g137["compile-call"] = compile_call
  _g137.run = run
  _g137.terminator = terminator
  _g137["load-module"] = load_module
  _g137.prologue = prologue
  _g137["%compile-module"] = _37compile_module
  _g137["infix?"] = infix63
  _g137["compiler-output"] = compiler_output
  _g137["compiling?"] = compiling63
  _g137["compile-file"] = compile_file
  _g137.encapsulate = encapsulate
  _g137["can-return?"] = can_return63
  _g137["compile-infix"] = compile_infix
  _g137["compile-atom"] = compile_atom
  _g137["compile-args"] = compile_args
  _g137.infix = infix
  _g137["open-module"] = open_module
  _g137.compile = compile
  _g137["compile-special"] = compile_special
  _g137["compile-branch"] = compile_branch
  _g137["compile-body"] = compile_body
  _g137.eval = eval
end)();
(function ()
  local _g139 = nexus.runtime
  local parse_number = _g139["parse-number"]
  local sublist = _g139.sublist
  local add = _g139.add
  local split = _g139.split
  local _37message_handler = _g139["%message-handler"]
  local pairwise = _g139.pairwise
  local setenv = _g139.setenv
  local number63 = _g139["number?"]
  local stash = _g139.stash
  local _61 = _g139["="]
  local _62 = _g139[">"]
  local exit = _g139.exit
  local _60 = _g139["<"]
  local string_literal63 = _g139["string-literal?"]
  local map = _g139.map
  local is63 = _g139["is?"]
  local char = _g139.char
  local keep = _g139.keep
  local find = _g139.find
  local reduce = _g139.reduce
  local exclude = _g139.exclude
  local join = _g139.join
  local sub = _g139.sub
  local write = _g139.write
  local drop = _g139.drop
  local length = _g139.length
  local some63 = _g139["some?"]
  local boolean63 = _g139["boolean?"]
  local extend = _g139.extend
  local write_file = _g139["write-file"]
  local splice = _g139.splice
  local reverse = _g139.reverse
  local replicate = _g139.replicate
  local function63 = _g139["function?"]
  local to_string = _g139["to-string"]
  local nil63 = _g139["nil?"]
  local tl = _g139.tl
  local composite63 = _g139["composite?"]
  local substring = _g139.substring
  local atom63 = _g139["atom?"]
  local _6261 = _g139[">="]
  local _ = _g139["-"]
  local list63 = _g139["list?"]
  local _47 = _g139["/"]
  local table63 = _g139["table?"]
  local _42 = _g139["*"]
  local _43 = _g139["+"]
  local apply = _g139.apply
  local _37 = _g139["%"]
  local search = _g139.search
  local last = _g139.last
  local empty63 = _g139["empty?"]
  local make_id = _g139["make-id"]
  local cat = _g139.cat
  local unstash = _g139.unstash
  local code = _g139.code
  local iterate = _g139.iterate
  local hd = _g139.hd
  local id_literal63 = _g139["id-literal?"]
  local keys63 = _g139["keys?"]
  local inner = _g139.inner
  local _6061 = _g139["<="]
  local string63 = _g139["string?"]
  local read_file = _g139["read-file"]
  local _g140 = nexus.utilities
  local macro63 = _g140["macro?"]
  local mapo = _g140.mapo
  local stash42 = _g140["stash*"]
  local symbol63 = _g140["symbol?"]
  local quote_modules = _g140["quote-modules"]
  local module = _g140.module
  local indentation = _g140.indentation
  local quoted = _g140.quoted
  local initial_environment = _g140["initial-environment"]
  local getenv = _g140.getenv
  local symbol_expansion = _g140["symbol-expansion"]
  local bind = _g140.bind
  local macro_function = _g140["macro-function"]
  local exported = _g140.exported
  local module_key = _g140["module-key"]
  local special_form63 = _g140["special-form?"]
  local quote_environment = _g140["quote-environment"]
  local macroexpand = _g140.macroexpand
  local bind42 = _g140["bind*"]
  local imported = _g140.imported
  local quasiexpand = _g140.quasiexpand
  local variable63 = _g140["variable?"]
  local special63 = _g140["special?"]
  local to_id = _g140["to-id"]
  local toplevel63 = _g140["toplevel?"]
  local bound63 = _g140["bound?"]
  local valid_id63 = _g140["valid-id?"]
  local _g143 = nexus.compiler
  local load_module = _g143["load-module"]
  local eval = _g143.eval
  local compile_branch = _g143["compile-branch"]
  local open_module = _g143["open-module"]
  local compile = _g143.compile
  local compile_function = _g143["compile-function"]
  local compile_body = _g143["compile-body"]
  local compile_module = _g143["compile-module"]
  local in_module = _g143["in-module"]
  local compile_call = _g143["compile-call"]
  local compile_special = _g143["compile-special"]
end)();
(function ()
  local _g329 = nexus.runtime
  local parse_number = _g329["parse-number"]
  local sublist = _g329.sublist
  local add = _g329.add
  local split = _g329.split
  local _37message_handler = _g329["%message-handler"]
  local pairwise = _g329.pairwise
  local setenv = _g329.setenv
  local number63 = _g329["number?"]
  local stash = _g329.stash
  local _61 = _g329["="]
  local _62 = _g329[">"]
  local exit = _g329.exit
  local _60 = _g329["<"]
  local string_literal63 = _g329["string-literal?"]
  local map = _g329.map
  local is63 = _g329["is?"]
  local char = _g329.char
  local keep = _g329.keep
  local find = _g329.find
  local reduce = _g329.reduce
  local exclude = _g329.exclude
  local join = _g329.join
  local sub = _g329.sub
  local write = _g329.write
  local drop = _g329.drop
  local length = _g329.length
  local some63 = _g329["some?"]
  local boolean63 = _g329["boolean?"]
  local extend = _g329.extend
  local write_file = _g329["write-file"]
  local splice = _g329.splice
  local reverse = _g329.reverse
  local replicate = _g329.replicate
  local function63 = _g329["function?"]
  local to_string = _g329["to-string"]
  local nil63 = _g329["nil?"]
  local tl = _g329.tl
  local composite63 = _g329["composite?"]
  local substring = _g329.substring
  local atom63 = _g329["atom?"]
  local _6261 = _g329[">="]
  local _ = _g329["-"]
  local list63 = _g329["list?"]
  local _47 = _g329["/"]
  local table63 = _g329["table?"]
  local _42 = _g329["*"]
  local _43 = _g329["+"]
  local apply = _g329.apply
  local _37 = _g329["%"]
  local search = _g329.search
  local last = _g329.last
  local empty63 = _g329["empty?"]
  local make_id = _g329["make-id"]
  local cat = _g329.cat
  local unstash = _g329.unstash
  local code = _g329.code
  local iterate = _g329.iterate
  local hd = _g329.hd
  local id_literal63 = _g329["id-literal?"]
  local keys63 = _g329["keys?"]
  local inner = _g329.inner
  local _6061 = _g329["<="]
  local string63 = _g329["string?"]
  local read_file = _g329["read-file"]
  local _g330 = nexus.utilities
  local macro63 = _g330["macro?"]
  local mapo = _g330.mapo
  local stash42 = _g330["stash*"]
  local symbol63 = _g330["symbol?"]
  local quote_modules = _g330["quote-modules"]
  local module = _g330.module
  local indentation = _g330.indentation
  local quoted = _g330.quoted
  local initial_environment = _g330["initial-environment"]
  local getenv = _g330.getenv
  local symbol_expansion = _g330["symbol-expansion"]
  local bind = _g330.bind
  local macro_function = _g330["macro-function"]
  local exported = _g330.exported
  local module_key = _g330["module-key"]
  local special_form63 = _g330["special-form?"]
  local quote_environment = _g330["quote-environment"]
  local macroexpand = _g330.macroexpand
  local bind42 = _g330["bind*"]
  local imported = _g330.imported
  local quasiexpand = _g330.quasiexpand
  local variable63 = _g330["variable?"]
  local special63 = _g330["special?"]
  local to_id = _g330["to-id"]
  local toplevel63 = _g330["toplevel?"]
  local bound63 = _g330["bound?"]
  local valid_id63 = _g330["valid-id?"]
  local _g333 = nexus.compiler
  local load_module = _g333["load-module"]
  local eval = _g333.eval
  local compile_branch = _g333["compile-branch"]
  local open_module = _g333["open-module"]
  local compile = _g333.compile
  local compile_function = _g333["compile-function"]
  local compile_body = _g333["compile-body"]
  local compile_module = _g333["compile-module"]
  local in_module = _g333["in-module"]
  local compile_call = _g333["compile-call"]
  local compile_special = _g333["compile-special"]
  target = "lua"
end)();
(function ()
  local _g609 = nexus.runtime
  local parse_number = _g609["parse-number"]
  local sublist = _g609.sublist
  local add = _g609.add
  local split = _g609.split
  local _37message_handler = _g609["%message-handler"]
  local pairwise = _g609.pairwise
  local setenv = _g609.setenv
  local number63 = _g609["number?"]
  local stash = _g609.stash
  local _61 = _g609["="]
  local _62 = _g609[">"]
  local exit = _g609.exit
  local _60 = _g609["<"]
  local string_literal63 = _g609["string-literal?"]
  local map = _g609.map
  local is63 = _g609["is?"]
  local char = _g609.char
  local keep = _g609.keep
  local find = _g609.find
  local reduce = _g609.reduce
  local exclude = _g609.exclude
  local join = _g609.join
  local sub = _g609.sub
  local write = _g609.write
  local drop = _g609.drop
  local length = _g609.length
  local some63 = _g609["some?"]
  local boolean63 = _g609["boolean?"]
  local extend = _g609.extend
  local write_file = _g609["write-file"]
  local splice = _g609.splice
  local reverse = _g609.reverse
  local replicate = _g609.replicate
  local function63 = _g609["function?"]
  local to_string = _g609["to-string"]
  local nil63 = _g609["nil?"]
  local tl = _g609.tl
  local composite63 = _g609["composite?"]
  local substring = _g609.substring
  local atom63 = _g609["atom?"]
  local _6261 = _g609[">="]
  local _ = _g609["-"]
  local list63 = _g609["list?"]
  local _47 = _g609["/"]
  local table63 = _g609["table?"]
  local _42 = _g609["*"]
  local _43 = _g609["+"]
  local apply = _g609.apply
  local _37 = _g609["%"]
  local search = _g609.search
  local last = _g609.last
  local empty63 = _g609["empty?"]
  local make_id = _g609["make-id"]
  local cat = _g609.cat
  local unstash = _g609.unstash
  local code = _g609.code
  local iterate = _g609.iterate
  local hd = _g609.hd
  local id_literal63 = _g609["id-literal?"]
  local keys63 = _g609["keys?"]
  local inner = _g609.inner
  local _6061 = _g609["<="]
  local string63 = _g609["string?"]
  local read_file = _g609["read-file"]
  local _g610 = nexus.utilities
  local macro63 = _g610["macro?"]
  local mapo = _g610.mapo
  local stash42 = _g610["stash*"]
  local symbol63 = _g610["symbol?"]
  local quote_modules = _g610["quote-modules"]
  local module = _g610.module
  local indentation = _g610.indentation
  local quoted = _g610.quoted
  local initial_environment = _g610["initial-environment"]
  local getenv = _g610.getenv
  local symbol_expansion = _g610["symbol-expansion"]
  local bind = _g610.bind
  local macro_function = _g610["macro-function"]
  local exported = _g610.exported
  local module_key = _g610["module-key"]
  local special_form63 = _g610["special-form?"]
  local quote_environment = _g610["quote-environment"]
  local macroexpand = _g610.macroexpand
  local bind42 = _g610["bind*"]
  local imported = _g610.imported
  local quasiexpand = _g610.quasiexpand
  local variable63 = _g610["variable?"]
  local special63 = _g610["special?"]
  local to_id = _g610["to-id"]
  local toplevel63 = _g610["toplevel?"]
  local bound63 = _g610["bound?"]
  local valid_id63 = _g610["valid-id?"]
  local _g613 = nexus.compiler
  local load_module = _g613["load-module"]
  local eval = _g613.eval
  local compile_branch = _g613["compile-branch"]
  local open_module = _g613["open-module"]
  local compile = _g613.compile
  local compile_function = _g613["compile-function"]
  local compile_body = _g613["compile-body"]
  local compile_module = _g613["compile-module"]
  local in_module = _g613["in-module"]
  local compile_call = _g613["compile-call"]
  local compile_special = _g613["compile-special"]
  modules = {reader = {export = {["read-from-string"] = {export = true, variable = true, module = "reader"}, ["make-stream"] = {export = true, variable = true, module = "reader"}, ["peek-char"] = {module = "reader", variable = true}, delimiters = {module = "reader", variable = true}, ["read-char"] = {module = "reader", variable = true}, ["skip-non-code"] = {module = "reader", variable = true}, read = {export = true, variable = true, module = "reader"}, ["read-all"] = {export = true, variable = true, module = "reader"}, whitespace = {module = "reader", variable = true}, eof = {module = "reader", variable = true}, ["read-table"] = {export = true, variable = true, module = "reader"}, ["define-reader"] = {export = true, macro = function (_g626, ...)
    local char = _g626[1]
    local stream = _g626[2]
    local body = unstash({...})
    local _g627 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g627)}))
  end, module = "reader"}, ["key?"] = {module = "reader", variable = true}, ["flag?"] = {module = "reader", variable = true}}, import = {"runtime", "special", "core"}}, boot = {export = {}, import = {"runtime", "utilities", "special", "core", "compiler"}}, optimizer = {export = {optimize = {export = true, variable = true, module = "optimizer"}}, import = {"runtime", "special", "core"}}, main = {export = {}, import = {"runtime", "special", "core", "reader", "compiler"}}, core = {export = {fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g628 = sub(body, 0)
    local _g629 = bind42(args, _g628)
    local _g630 = _g629[1]
    local _g631 = _g629[2]
    return(join({"%function", _g630}, _g631))
  end, export = true, module = "core"}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g632 = sub(body, 0)
    local imports = {}
    local exp = _g632.export
    local imp = _g632.import
    local _g633 = (imp or {})
    local _g634 = 0
    while (_g634 < length(_g633)) do
      local k = _g633[(_g634 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g634 = (_g634 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g635 = (exp or {})
    local _g636 = 0
    while (_g636 < length(_g635)) do
      local k = _g635[(_g636 + 1)]
      setenv(k, {_stash = true, export = true})
      _g636 = (_g636 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "core"}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g637 = body
      local k = nil
      for k in next, _g637 do
        if (not number63(k)) then
          local v = _g637[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true, module = "core"}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core", export = true, global = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g638 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g639 = {"table"}
      _g639._scope = scope
      return(_g639)
    end)())}), join({"let", join({x, join({"do"}, _g638)}), join({"drop", "environment"}), x})}))
  end, export = true, module = "core"}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true, module = "core"}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g640 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g641)
      local lh = _g641[1]
      local rh = _g641[2]
      local _g642 = bind(lh, rh)
      local _g643 = 0
      while (_g643 < length(_g642)) do
        local _g644 = _g642[(_g643 + 1)]
        local id = _g644[1]
        local val = _g644[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g643 = (_g643 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g640)})))
  end, export = true, module = "core"}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g645 = sub(body, 0)
    add(environment, {})
    local _g646 = (function ()
      map(function (_g647)
        local name = _g647[1]
        local exp = _g647[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g645)))
    end)()
    drop(environment)
    return(_g646)
  end, export = true, module = "core"}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g648 = xs
      local i = 0
      while (i < length(_g648)) do
        local x = _g648[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
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
  end, export = true, module = "core"}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g649 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g649)}))
  end, export = true, module = "core"}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g650 = sub(body, 0)
    local form = join({"fn", args}, _g650)
    local keys = sub(_g650, length(_g650))
    eval(join((function ()
      local _g651 = {"setenv", join({"quote", name})}
      _g651.special = form
      _g651.form = join({"quote", form})
      return(_g651)
    end)(), keys))
    return(nil)
  end, export = true, module = "core"}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true, module = "core"}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true, module = "core"}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true, module = "core"}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true, module = "core"}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g652 = sub(body, 0)
    local form = join({"fn", args}, _g652)
    eval(join((function ()
      local _g653 = {"setenv", join({"quote", name})}
      _g653.macro = form
      _g653.form = join({"quote", form})
      return(_g653)
    end)()))
    return(nil)
  end, export = true, module = "core"}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g654 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g654)) then
      local _g655 = bind42(x, _g654)
      local args = _g655[1]
      local _g656 = _g655[2]
      return(join({"%global-function", name, args}, _g656))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true, module = "core"}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g657 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g657)}))
  end, export = true, module = "core"}, language = {macro = function ()
    return(join({"quote", target}))
  end, export = true, module = "core"}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g658 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g658)}))
  end, export = true, module = "core"}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g659 = sub(body, 0)
    add(environment, {})
    local _g660 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g659)))
    end)()
    drop(environment)
    return(_g660)
  end, export = true, module = "core"}, ["with-bindings"] = {macro = function (_g661, ...)
    local names = _g661[1]
    local body = unstash({...})
    local _g662 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g663 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g664 = {"setenv", x}
        _g664.variable = true
        return(_g664)
      end)())})}
      _g663.scope = true
      return(_g663)
    end)(), _g662))
  end, export = true, module = "core"}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true, module = "core"}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g665 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    return(join({"let", join({t1, t}), (function ()
      if nil63(v) then
        local i = (function ()
          if b.i then
            return("i")
          else
            return(make_id())
          end
        end)()
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g665), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g666 = {"target"}
          _g666.js = join({"isNaN", join({"parseInt", k})})
          _g666.lua = join({"not", join({"number?", k})})
          return(_g666)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g665)})})}))
      end
    end)()}))
  end, export = true, module = "core"}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g667 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g667)) then
      local _g668 = bind42(x, _g667)
      local args = _g668[1]
      local _g669 = _g668[2]
      return(join({"%local-function", name, args}, _g669))
    else
      return(join({"%local", name, x}))
    end
  end, export = true, module = "core"}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g670 = elements
    local _g671 = 0
    while (_g671 < length(_g670)) do
      local e = _g670[(_g671 + 1)]
      l[e] = true
      _g671 = (_g671 + 1)
    end
    return(join({"table"}, l))
  end, export = true, module = "core"}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g328, x)
      return(x)
    end, body)))
  end, export = true, module = "core"}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true, module = "core"}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, lib = {export = {}, import = {"core", "special"}}, compiler = {export = {getop = {module = "compiler", variable = true}, terminator = {module = "compiler", variable = true}, ["load-module"] = {export = true, variable = true, module = "compiler"}, eval = {export = true, variable = true, module = "compiler"}, ["%compile-module"] = {module = "compiler", variable = true}, infix = {module = "compiler", variable = true}, ["compiling?"] = {module = "compiler", variable = true}, ["current-module"] = {export = true, global = true, module = "compiler"}, ["compile-branch"] = {export = true, variable = true, module = "compiler"}, prologue = {module = "compiler", variable = true}, ["open-module"] = {export = true, variable = true, module = "compiler"}, ["%result"] = {export = true, global = true, module = "compiler"}, compile = {export = true, variable = true, module = "compiler"}, ["compile-args"] = {module = "compiler", variable = true}, ["compile-file"] = {module = "compiler", variable = true}, ["compile-function"] = {export = true, variable = true, module = "compiler"}, ["can-return?"] = {module = "compiler", variable = true}, ["compile-infix"] = {module = "compiler", variable = true}, ["compile-body"] = {export = true, variable = true, module = "compiler"}, ["compile-atom"] = {module = "compiler", variable = true}, ["compile-module"] = {export = true, variable = true, module = "compiler"}, ["module-path"] = {module = "compiler", variable = true}, ["compiler-output"] = {module = "compiler", variable = true}, ["in-module"] = {export = true, variable = true, module = "compiler"}, ["compile-call"] = {export = true, variable = true, module = "compiler"}, encapsulate = {module = "compiler", variable = true}, ["infix?"] = {module = "compiler", variable = true}, ["compile-special"] = {export = true, variable = true, module = "compiler"}, run = {module = "compiler", variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, special = {export = {["%global-function"] = {module = "special", special = function (_g672)
    local name = _g672[1]
    local args = _g672[2]
    local body = sub(_g672, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, stmt = true, export = true, tr = true}, ["error"] = {export = true, stmt = true, special = function (_g673)
    local x = _g673[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile(join({"Error", x}))))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, module = "special"}, ["set"] = {export = true, stmt = true, special = function (_g674)
    local lh = _g674[1]
    local rh = _g674[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, module = "special"}, ["%array"] = {special = function (forms)
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
    local _g675 = forms
    local i = 0
    while (i < length(_g675)) do
      local x = _g675[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true, module = "special"}, ["%try"] = {module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g676 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g676)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, join({"get", e, "\"message\""})})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g677 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g677)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, stmt = true, export = true, tr = true}, ["break"] = {export = true, stmt = true, special = function (_g138)
    return((indentation() .. "break"))
  end, module = "special"}, ["while"] = {module = "special", special = function (_g678)
    local condition = _g678[1]
    local body = sub(_g678, 1)
    local _g679 = compile(condition)
    local _g680 = (function ()
      indent_level = (indent_level + 1)
      local _g681 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g681)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g679 .. ") {\n" .. _g680 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g679 .. " do\n" .. _g680 .. ind .. "end\n"))
    end
  end, stmt = true, export = true, tr = true}, ["%local"] = {export = true, stmt = true, special = function (_g682)
    local name = _g682[1]
    local value = _g682[2]
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
  end, module = "special"}, ["do"] = {module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, stmt = true, export = true, tr = true}, ["%object"] = {special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g683 = pairs
    local i = 0
    while (i < length(_g683)) do
      local _g684 = _g683[(i + 1)]
      local k = _g684[1]
      local v = _g684[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g685 = compile(v)
      local _g686 = (function ()
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
      str = (str .. _g686 .. sep .. _g685)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true, module = "special"}, ["get"] = {special = function (_g687)
    local t = _g687[1]
    local k = _g687[2]
    local _g688 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g688, 0) == "{")) then
      _g688 = ("(" .. _g688 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g688 .. "." .. inner(k)))
    else
      return((_g688 .. "[" .. k1 .. "]"))
    end
  end, export = true, module = "special"}, ["return"] = {export = true, stmt = true, special = function (_g689)
    local x = _g689[1]
    local _g690 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g690))
  end, module = "special"}, ["%for"] = {module = "special", special = function (_g691)
    local _g692 = _g691[1]
    local t = _g692[1]
    local k = _g692[2]
    local body = sub(_g691, 1)
    local _g693 = compile(t)
    local ind = indentation()
    local _g694 = (function ()
      indent_level = (indent_level + 1)
      local _g695 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g695)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g693 .. " do\n" .. _g694 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g693 .. ") {\n" .. _g694 .. ind .. "}\n"))
    end
  end, stmt = true, export = true, tr = true}, ["%local-function"] = {module = "special", special = function (_g696)
    local name = _g696[1]
    local args = _g696[2]
    local body = sub(_g696, 2)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, stmt = true, export = true, tr = true}, ["not"] = {special = function (_g697)
    local x = _g697[1]
    local _g698 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g698 .. ")"))
  end, export = true, module = "special"}, ["%function"] = {special = function (_g699)
    local args = _g699[1]
    local body = sub(_g699, 1)
    return(compile_function(args, body))
  end, export = true, module = "special"}, ["if"] = {module = "special", special = function (form, tail63)
    local str = ""
    local _g700 = form
    local i = 0
    while (i < length(_g700)) do
      local condition = _g700[(i + 1)]
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
  end, stmt = true, export = true, tr = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, runtime = {export = {["parse-number"] = {export = true, variable = true, module = "runtime"}, sublist = {export = true, variable = true, module = "runtime"}, add = {export = true, variable = true, module = "runtime"}, split = {export = true, variable = true, module = "runtime"}, ["%message-handler"] = {export = true, variable = true, module = "runtime"}, pairwise = {export = true, variable = true, module = "runtime"}, setenv = {export = true, variable = true, module = "runtime"}, ["number?"] = {export = true, variable = true, module = "runtime"}, stash = {export = true, variable = true, module = "runtime"}, ["="] = {export = true, variable = true, module = "runtime"}, [">"] = {export = true, variable = true, module = "runtime"}, exit = {export = true, variable = true, module = "runtime"}, ["<"] = {export = true, variable = true, module = "runtime"}, ["string-literal?"] = {export = true, variable = true, module = "runtime"}, map = {export = true, variable = true, module = "runtime"}, ["is?"] = {export = true, variable = true, module = "runtime"}, char = {export = true, variable = true, module = "runtime"}, keep = {export = true, variable = true, module = "runtime"}, find = {export = true, variable = true, module = "runtime"}, reduce = {export = true, variable = true, module = "runtime"}, exclude = {export = true, variable = true, module = "runtime"}, join = {export = true, variable = true, module = "runtime"}, sub = {export = true, variable = true, module = "runtime"}, write = {export = true, variable = true, module = "runtime"}, drop = {export = true, variable = true, module = "runtime"}, length = {export = true, variable = true, module = "runtime"}, ["some?"] = {export = true, variable = true, module = "runtime"}, ["boolean?"] = {export = true, variable = true, module = "runtime"}, extend = {export = true, variable = true, module = "runtime"}, ["write-file"] = {export = true, variable = true, module = "runtime"}, ["id-count"] = {module = "runtime", variable = true}, splice = {export = true, variable = true, module = "runtime"}, reverse = {export = true, variable = true, module = "runtime"}, replicate = {export = true, variable = true, module = "runtime"}, ["function?"] = {export = true, variable = true, module = "runtime"}, ["splice?"] = {module = "runtime", variable = true}, ["to-string"] = {export = true, variable = true, module = "runtime"}, ["nil?"] = {export = true, variable = true, module = "runtime"}, tl = {export = true, variable = true, module = "runtime"}, ["composite?"] = {export = true, variable = true, module = "runtime"}, substring = {export = true, variable = true, module = "runtime"}, ["atom?"] = {export = true, variable = true, module = "runtime"}, [">="] = {export = true, variable = true, module = "runtime"}, ["-"] = {export = true, variable = true, module = "runtime"}, ["list?"] = {export = true, variable = true, module = "runtime"}, ["/"] = {export = true, variable = true, module = "runtime"}, ["table?"] = {export = true, variable = true, module = "runtime"}, mapl = {module = "runtime", variable = true}, ["*"] = {export = true, variable = true, module = "runtime"}, ["+"] = {export = true, variable = true, module = "runtime"}, apply = {export = true, variable = true, module = "runtime"}, ["%"] = {export = true, variable = true, module = "runtime"}, search = {export = true, variable = true, module = "runtime"}, last = {export = true, variable = true, module = "runtime"}, ["empty?"] = {export = true, variable = true, module = "runtime"}, ["make-id"] = {export = true, variable = true, module = "runtime"}, cat = {export = true, variable = true, module = "runtime"}, unstash = {export = true, variable = true, module = "runtime"}, code = {export = true, variable = true, module = "runtime"}, iterate = {export = true, variable = true, module = "runtime"}, hd = {export = true, variable = true, module = "runtime"}, ["id-literal?"] = {export = true, variable = true, module = "runtime"}, ["keys?"] = {export = true, variable = true, module = "runtime"}, inner = {export = true, variable = true, module = "runtime"}, ["<="] = {export = true, variable = true, module = "runtime"}, ["string?"] = {export = true, variable = true, module = "runtime"}, ["read-file"] = {export = true, variable = true, module = "runtime"}}, import = {"special", "core"}}, system = {export = {nexus = {export = true, global = true, module = "system"}}, import = {"special", "core"}}, utilities = {export = {["macro?"] = {export = true, variable = true, module = "utilities"}, escape = {module = "utilities", variable = true}, mapo = {export = true, variable = true, module = "utilities"}, ["stash*"] = {export = true, variable = true, module = "utilities"}, ["symbol?"] = {export = true, variable = true, module = "utilities"}, ["quote-binding"] = {module = "utilities", variable = true}, ["quote-modules"] = {export = true, variable = true, module = "utilities"}, ["quoting?"] = {module = "utilities", variable = true}, module = {export = true, variable = true, module = "utilities"}, reserved = {module = "utilities", variable = true}, indentation = {export = true, variable = true, module = "utilities"}, quoted = {export = true, variable = true, module = "utilities"}, ["quote-frame"] = {module = "utilities", variable = true}, ["initial-environment"] = {export = true, variable = true, module = "utilities"}, getenv = {export = true, variable = true, module = "utilities"}, ["symbol-expansion"] = {export = true, variable = true, module = "utilities"}, ["quasisplice?"] = {module = "utilities", variable = true}, bind = {export = true, variable = true, module = "utilities"}, ["macro-function"] = {export = true, variable = true, module = "utilities"}, exported = {export = true, variable = true, module = "utilities"}, ["numeric?"] = {module = "utilities", variable = true}, ["module-key"] = {export = true, variable = true, module = "utilities"}, ["special-form?"] = {export = true, variable = true, module = "utilities"}, ["valid-char?"] = {module = "utilities", variable = true}, ["quote-environment"] = {export = true, variable = true, module = "utilities"}, macroexpand = {export = true, variable = true, module = "utilities"}, ["bind*"] = {export = true, variable = true, module = "utilities"}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, module = "utilities"}, imported = {export = true, variable = true, module = "utilities"}, ["can-unquote?"] = {module = "utilities", variable = true}, quasiexpand = {export = true, variable = true, module = "utilities"}, ["variable?"] = {export = true, variable = true, module = "utilities"}, ["special?"] = {export = true, variable = true, module = "utilities"}, ["global?"] = {module = "utilities", variable = true}, ["quasiquoting?"] = {module = "utilities", variable = true}, ["to-id"] = {export = true, variable = true, module = "utilities"}, ["toplevel?"] = {export = true, variable = true, module = "utilities"}, ["quote-module"] = {module = "utilities", variable = true}, ["indent-level"] = {export = true, global = true, module = "utilities"}, ["bound?"] = {export = true, variable = true, module = "utilities"}, ["quasiquote-list"] = {module = "utilities", variable = true}, ["valid-id?"] = {export = true, variable = true, module = "utilities"}}, import = {"runtime", "special", "core"}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g701 = sub(body, 0)
    local imports = {}
    local exp = _g701.export
    local imp = _g701.import
    local _g702 = (imp or {})
    local _g703 = 0
    while (_g703 < length(_g702)) do
      local k = _g702[(_g703 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g703 = (_g703 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g704 = (exp or {})
    local _g705 = 0
    while (_g705 < length(_g704)) do
      local k = _g704[(_g705 + 1)]
      setenv(k, {_stash = true, export = true})
      _g705 = (_g705 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "core"}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local parse_number = _g2["parse-number"]
  local sublist = _g2.sublist
  local add = _g2.add
  local _37message_handler = _g2["%message-handler"]
  local pairwise = _g2.pairwise
  local setenv = _g2.setenv
  local number63 = _g2["number?"]
  local stash = _g2.stash
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local id_literal63 = _g2["id-literal?"]
  local _60 = _g2["<"]
  local string_literal63 = _g2["string-literal?"]
  local map = _g2.map
  local is63 = _g2["is?"]
  local char = _g2.char
  local keep = _g2.keep
  local find = _g2.find
  local reduce = _g2.reduce
  local exclude = _g2.exclude
  local join = _g2.join
  local sub = _g2.sub
  local write = _g2.write
  local drop = _g2.drop
  local length = _g2.length
  local some63 = _g2["some?"]
  local boolean63 = _g2["boolean?"]
  local extend = _g2.extend
  local write_file = _g2["write-file"]
  local last = _g2.last
  local splice = _g2.splice
  local reverse = _g2.reverse
  local replicate = _g2.replicate
  local function63 = _g2["function?"]
  local _6061 = _g2["<="]
  local cat = _g2.cat
  local nil63 = _g2["nil?"]
  local exit = _g2.exit
  local atom63 = _g2["atom?"]
  local tl = _g2.tl
  local unstash = _g2.unstash
  local _ = _g2["-"]
  local list63 = _g2["list?"]
  local _47 = _g2["/"]
  local composite63 = _g2["composite?"]
  local split = _g2.split
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local apply = _g2.apply
  local _37 = _g2["%"]
  local search = _g2.search
  local _6261 = _g2[">="]
  local to_string = _g2["to-string"]
  local make_id = _g2["make-id"]
  local table63 = _g2["table?"]
  local empty63 = _g2["empty?"]
  local code = _g2.code
  local iterate = _g2.iterate
  local hd = _g2.hd
  local read_file = _g2["read-file"]
  local keys63 = _g2["keys?"]
  local inner = _g2.inner
  local substring = _g2.substring
  local string63 = _g2["string?"]
  local _g5 = nexus.reader
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus.compiler
  local compile_branch = _g6["compile-branch"]
  local compile_module = _g6["compile-module"]
  local in_module = _g6["in-module"]
  local load_module = _g6["load-module"]
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local compile_body = _g6["compile-body"]
  local compile_special = _g6["compile-special"]
  local open_module = _g6["open-module"]
  local compile_call = _g6["compile-call"]
  local eval = _g6.eval
  local function rep(str)
    local _g707 = (function ()
      local _g708,_g709 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g708, _g709})
    end)()
    local _g1 = _g707[1]
    local x = _g707[2]
    if is63(x) then
      return(print((to_string(x) .. " ")))
    end
  end
  local function repl()
    local function step(str)
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
    local _g710 = args
    local i = 0
    while (i < length(_g710)) do
      local arg = _g710[(i + 1)]
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
  local _g711 = {}
  nexus.main = _g711
  _g711.main = main
  _g711.rep = rep
  _g711.usage = usage
  _g711.repl = repl
end)();
