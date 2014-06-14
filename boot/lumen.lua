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
    return({_splice = true, value = x})
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
  _g53["nil?"] = nil63
  _g53["is?"] = is63
  _g53.length = length
  _g53["empty?"] = empty63
  _g53["some?"] = some63
  _g53.hd = hd
  _g53["string?"] = string63
  _g53["number?"] = number63
  _g53["boolean?"] = boolean63
  _g53["function?"] = function63
  _g53["composite?"] = composite63
  _g53["atom?"] = atom63
  _g53["table?"] = table63
  _g53["list?"] = list63
  _g53.substring = substring
  _g53.sublist = sublist
  _g53.sub = sub
  _g53.inner = inner
  _g53.tl = tl
  _g53.char = char
  _g53.code = code
  _g53["string-literal?"] = string_literal63
  _g53["id-literal?"] = id_literal63
  _g53.add = add
  _g53.drop = drop
  _g53.last = last
  _g53.reverse = reverse
  _g53.join = join
  _g53.reduce = reduce
  _g53.keep = keep
  _g53.find = find
  _g53.pairwise = pairwise
  _g53.iterate = iterate
  _g53.replicate = replicate
  _g53.splice = splice
  _g53.map = map
  _g53["keys?"] = keys63
  _g53.stash = stash
  _g53.unstash = unstash
  _g53.setenv = setenv
  _g53.extend = extend
  _g53.exclude = exclude
  _g53.search = search
  _g53.split = split
  _g53.cat = cat
  _g53["+"] = _43
  _g53["-"] = _
  _g53["*"] = _42
  _g53["/"] = _47
  _g53["%"] = _37
  _g53[">"] = _62
  _g53["<"] = _60
  _g53["="] = _61
  _g53[">="] = _6261
  _g53["<="] = _6061
  _g53["read-file"] = read_file
  _g53["write-file"] = write_file
  _g53.write = write
  _g53.exit = exit
  _g53["parse-number"] = parse_number
  _g53["to-string"] = to_string
  _g53.apply = apply
  _g53["make-id"] = make_id
  _g53["%message-handler"] = _37message_handler
  _g53["splice?"] = splice63
  _g53.mapl = mapl
  _g53["id-count"] = id_count
end)();
(function ()
  local _g58 = nexus.runtime
  local nil63 = _g58["nil?"]
  local is63 = _g58["is?"]
  local length = _g58.length
  local empty63 = _g58["empty?"]
  local some63 = _g58["some?"]
  local hd = _g58.hd
  local string63 = _g58["string?"]
  local number63 = _g58["number?"]
  local boolean63 = _g58["boolean?"]
  local function63 = _g58["function?"]
  local composite63 = _g58["composite?"]
  local atom63 = _g58["atom?"]
  local table63 = _g58["table?"]
  local list63 = _g58["list?"]
  local substring = _g58.substring
  local sublist = _g58.sublist
  local sub = _g58.sub
  local inner = _g58.inner
  local tl = _g58.tl
  local char = _g58.char
  local code = _g58.code
  local string_literal63 = _g58["string-literal?"]
  local id_literal63 = _g58["id-literal?"]
  local add = _g58.add
  local drop = _g58.drop
  local last = _g58.last
  local reverse = _g58.reverse
  local join = _g58.join
  local reduce = _g58.reduce
  local keep = _g58.keep
  local find = _g58.find
  local pairwise = _g58.pairwise
  local iterate = _g58.iterate
  local replicate = _g58.replicate
  local splice = _g58.splice
  local map = _g58.map
  local keys63 = _g58["keys?"]
  local stash = _g58.stash
  local unstash = _g58.unstash
  local setenv = _g58.setenv
  local extend = _g58.extend
  local exclude = _g58.exclude
  local search = _g58.search
  local split = _g58.split
  local cat = _g58.cat
  local _43 = _g58["+"]
  local _ = _g58["-"]
  local _42 = _g58["*"]
  local _47 = _g58["/"]
  local _37 = _g58["%"]
  local _62 = _g58[">"]
  local _60 = _g58["<"]
  local _61 = _g58["="]
  local _6261 = _g58[">="]
  local _6061 = _g58["<="]
  local read_file = _g58["read-file"]
  local write_file = _g58["write-file"]
  local write = _g58.write
  local exit = _g58.exit
  local parse_number = _g58["parse-number"]
  local to_string = _g58["to-string"]
  local apply = _g58.apply
  local make_id = _g58["make-id"]
  local _37message_handler = _g58["%message-handler"]
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
      _g93.import = quoted(m.import)
      _g93.export = quote_frame(m.export)
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
  _g94.getenv = getenv
  _g94["macro-function"] = macro_function
  _g94["macro?"] = macro63
  _g94["special?"] = special63
  _g94["special-form?"] = special_form63
  _g94["symbol-expansion"] = symbol_expansion
  _g94["symbol?"] = symbol63
  _g94["variable?"] = variable63
  _g94["bound?"] = bound63
  _g94["toplevel?"] = toplevel63
  _g94.quoted = quoted
  _g94["stash*"] = stash42
  _g94.bind = bind
  _g94["bind*"] = bind42
  _g94.quasiexpand = quasiexpand
  _g94.macroexpand = macroexpand
  _g94.indentation = indentation
  _g94["valid-id?"] = valid_id63
  _g94["to-id"] = to_id
  _g94["module-key"] = module_key
  _g94.module = module
  _g94.imported = imported
  _g94.exported = exported
  _g94.mapo = mapo
  _g94["quote-environment"] = quote_environment
  _g94["quote-modules"] = quote_modules
  _g94["initial-environment"] = initial_environment
  _g94["global?"] = global63
  _g94.escape = escape
  _g94["quoting?"] = quoting63
  _g94["quasiquoting?"] = quasiquoting63
  _g94["can-unquote?"] = can_unquote63
  _g94["quasisplice?"] = quasisplice63
  _g94["quasiquote-list"] = quasiquote_list
  _g94.reserved = reserved
  _g94["numeric?"] = numeric63
  _g94["valid-char?"] = valid_char63
  _g94["quote-binding"] = quote_binding
  _g94["quote-frame"] = quote_frame
  _g94["quote-module"] = quote_module
end)();
(function ()
  local _g95 = nexus.runtime
  local nil63 = _g95["nil?"]
  local is63 = _g95["is?"]
  local length = _g95.length
  local empty63 = _g95["empty?"]
  local some63 = _g95["some?"]
  local hd = _g95.hd
  local string63 = _g95["string?"]
  local number63 = _g95["number?"]
  local boolean63 = _g95["boolean?"]
  local function63 = _g95["function?"]
  local composite63 = _g95["composite?"]
  local atom63 = _g95["atom?"]
  local table63 = _g95["table?"]
  local list63 = _g95["list?"]
  local substring = _g95.substring
  local sublist = _g95.sublist
  local sub = _g95.sub
  local inner = _g95.inner
  local tl = _g95.tl
  local char = _g95.char
  local code = _g95.code
  local string_literal63 = _g95["string-literal?"]
  local id_literal63 = _g95["id-literal?"]
  local add = _g95.add
  local drop = _g95.drop
  local last = _g95.last
  local reverse = _g95.reverse
  local join = _g95.join
  local reduce = _g95.reduce
  local keep = _g95.keep
  local find = _g95.find
  local pairwise = _g95.pairwise
  local iterate = _g95.iterate
  local replicate = _g95.replicate
  local splice = _g95.splice
  local map = _g95.map
  local keys63 = _g95["keys?"]
  local stash = _g95.stash
  local unstash = _g95.unstash
  local setenv = _g95.setenv
  local extend = _g95.extend
  local exclude = _g95.exclude
  local search = _g95.search
  local split = _g95.split
  local cat = _g95.cat
  local _43 = _g95["+"]
  local _ = _g95["-"]
  local _42 = _g95["*"]
  local _47 = _g95["/"]
  local _37 = _g95["%"]
  local _62 = _g95[">"]
  local _60 = _g95["<"]
  local _61 = _g95["="]
  local _6261 = _g95[">="]
  local _6061 = _g95["<="]
  local read_file = _g95["read-file"]
  local write_file = _g95["write-file"]
  local write = _g95.write
  local exit = _g95.exit
  local parse_number = _g95["parse-number"]
  local to_string = _g95["to-string"]
  local apply = _g95.apply
  local make_id = _g95["make-id"]
  local _37message_handler = _g95["%message-handler"]
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
  local _g106 = {}
  nexus.reader = _g106
  _g106["make-stream"] = make_stream
  _g106["read-table"] = read_table
  _g106.read = read
  _g106["read-all"] = read_all
  _g106["read-from-string"] = read_from_string
  _g106.delimiters = delimiters
  _g106.whitespace = whitespace
  _g106["peek-char"] = peek_char
  _g106["read-char"] = read_char
  _g106["skip-non-code"] = skip_non_code
  _g106.eof = eof
  _g106["key?"] = key63
  _g106["flag?"] = flag63
end)();
(function ()
  local _g107 = nexus.runtime
  local nil63 = _g107["nil?"]
  local is63 = _g107["is?"]
  local length = _g107.length
  local empty63 = _g107["empty?"]
  local some63 = _g107["some?"]
  local hd = _g107.hd
  local string63 = _g107["string?"]
  local number63 = _g107["number?"]
  local boolean63 = _g107["boolean?"]
  local function63 = _g107["function?"]
  local composite63 = _g107["composite?"]
  local atom63 = _g107["atom?"]
  local table63 = _g107["table?"]
  local list63 = _g107["list?"]
  local substring = _g107.substring
  local sublist = _g107.sublist
  local sub = _g107.sub
  local inner = _g107.inner
  local tl = _g107.tl
  local char = _g107.char
  local code = _g107.code
  local string_literal63 = _g107["string-literal?"]
  local id_literal63 = _g107["id-literal?"]
  local add = _g107.add
  local drop = _g107.drop
  local last = _g107.last
  local reverse = _g107.reverse
  local join = _g107.join
  local reduce = _g107.reduce
  local keep = _g107.keep
  local find = _g107.find
  local pairwise = _g107.pairwise
  local iterate = _g107.iterate
  local replicate = _g107.replicate
  local splice = _g107.splice
  local map = _g107.map
  local keys63 = _g107["keys?"]
  local stash = _g107.stash
  local unstash = _g107.unstash
  local setenv = _g107.setenv
  local extend = _g107.extend
  local exclude = _g107.exclude
  local search = _g107.search
  local split = _g107.split
  local cat = _g107.cat
  local _43 = _g107["+"]
  local _ = _g107["-"]
  local _42 = _g107["*"]
  local _47 = _g107["/"]
  local _37 = _g107["%"]
  local _62 = _g107[">"]
  local _60 = _g107["<"]
  local _61 = _g107["="]
  local _6261 = _g107[">="]
  local _6061 = _g107["<="]
  local read_file = _g107["read-file"]
  local write_file = _g107["write-file"]
  local write = _g107.write
  local exit = _g107.exit
  local parse_number = _g107["parse-number"]
  local to_string = _g107["to-string"]
  local apply = _g107.apply
  local make_id = _g107["make-id"]
  local _37message_handler = _g107["%message-handler"]
  local _g108 = nexus.utilities
  local getenv = _g108.getenv
  local macro_function = _g108["macro-function"]
  local macro63 = _g108["macro?"]
  local special63 = _g108["special?"]
  local special_form63 = _g108["special-form?"]
  local symbol_expansion = _g108["symbol-expansion"]
  local symbol63 = _g108["symbol?"]
  local variable63 = _g108["variable?"]
  local bound63 = _g108["bound?"]
  local toplevel63 = _g108["toplevel?"]
  local quoted = _g108.quoted
  local stash42 = _g108["stash*"]
  local bind = _g108.bind
  local bind42 = _g108["bind*"]
  local quasiexpand = _g108.quasiexpand
  local macroexpand = _g108.macroexpand
  local indentation = _g108.indentation
  local valid_id63 = _g108["valid-id?"]
  local to_id = _g108["to-id"]
  local module_key = _g108["module-key"]
  local module = _g108.module
  local imported = _g108.imported
  local exported = _g108.exported
  local mapo = _g108.mapo
  local quote_environment = _g108["quote-environment"]
  local quote_modules = _g108["quote-modules"]
  local initial_environment = _g108["initial-environment"]
  local _g111 = nexus.reader
  local make_stream = _g111["make-stream"]
  local read_table = _g111["read-table"]
  local read = _g111.read
  local read_all = _g111["read-all"]
  local read_from_string = _g111["read-from-string"]
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
    local _g112 = args
    local i = 0
    while (i < length(_g112)) do
      local arg = _g112[(i + 1)]
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
    local _g113 = unstash({...})
    local tail = _g113.tail
    local str = ""
    local _g114 = forms
    local i = 0
    while (i < length(_g114)) do
      local x = _g114[(i + 1)]
      local t63 = (tail and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, stmt = true, tail = t63}))
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
    local _g115 = getenv(hd(form))
    local special = _g115.special
    local stmt = _g115.stmt
    local self_tr63 = _g115.tr
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
  local function compile_infix(_g116)
    local op = _g116[1]
    local args = sub(_g116, 1)
    local str = "("
    local _g117 = getop(op)
    local _g118 = args
    local i = 0
    while (i < length(_g118)) do
      local arg = _g118[(i + 1)]
      if ((_g117 == "-") and (length(args) == 1)) then
        str = (str .. _g117 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g117 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g119 = (function ()
      indent_level = (indent_level + 1)
      local _g120 = compile(body, {_stash = true, stmt = true, tail = tail63})
      indent_level = (indent_level - 1)
      return(_g120)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g119 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g119 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g119 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g119 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g119 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g119 .. tr))
    end
  end
  local function compile_function(args, body, ...)
    local _g121 = unstash({...})
    local name = _g121.name
    local prefix = _g121.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g122 = (prefix or "")
    local _g123 = compile_args(args)
    local _g124 = (function ()
      indent_level = (indent_level + 1)
      local _g125 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g125)
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
      return(("function " .. id .. _g123 .. " {\n" .. _g124 .. ind .. "}" .. tr))
    else
      return((_g122 .. "function " .. id .. _g123 .. "\n" .. _g124 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g126 = unstash({...})
    local stmt = _g126.stmt
    local tail = _g126.tail
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
      local _g127 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g127 .. tr))
    end
  end
  local function lower(form)
    return(macroexpand(form))
  end
  current_module = nil
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g128 = lower(body)
    local epilog = lower(exported())
    return(join({join({"%function", {}}, join(_g128, {epilog}))}))
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
    local _g129 = toplevel
    local name = nil
    for name in next, _g129 do
      if (not number63(name)) then
        local binding = _g129[name]
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
    local _g130 = unstash({...})
    local all = _g130.all
    local m = module(spec)
    local frame = last(environment)
    local _g131 = m.export
    local k = nil
    for k in next, _g131 do
      if (not number63(k)) then
        local v = _g131[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g132 = unstash({...})
    local all = _g132.all
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
    local x = compile(lower(form1))
    target = previous
    return(run(x))
  end
  local _g133 = {}
  nexus.compiler = _g133
  _g133["compile-body"] = compile_body
  _g133["compile-call"] = compile_call
  _g133["compile-branch"] = compile_branch
  _g133["compile-function"] = compile_function
  _g133["compile-special"] = compile_special
  _g133.compile = compile
  _g133["open-module"] = open_module
  _g133["load-module"] = load_module
  _g133["in-module"] = in_module
  _g133["compile-module"] = compile_module
  _g133.eval = eval
  _g133.infix = infix
  _g133.getop = getop
  _g133["infix?"] = infix63
  _g133["compile-args"] = compile_args
  _g133["compile-atom"] = compile_atom
  _g133.terminator = terminator
  _g133["compile-infix"] = compile_infix
  _g133["can-return?"] = can_return63
  _g133.lower = lower
  _g133["module-path"] = module_path
  _g133.encapsulate = encapsulate
  _g133["compile-file"] = compile_file
  _g133.run = run
  _g133["compiling?"] = compiling63
  _g133["compiler-output"] = compiler_output
  _g133["%compile-module"] = _37compile_module
  _g133.prologue = prologue
end)();
(function ()
  local _g135 = nexus.runtime
  local nil63 = _g135["nil?"]
  local is63 = _g135["is?"]
  local length = _g135.length
  local empty63 = _g135["empty?"]
  local some63 = _g135["some?"]
  local hd = _g135.hd
  local string63 = _g135["string?"]
  local number63 = _g135["number?"]
  local boolean63 = _g135["boolean?"]
  local function63 = _g135["function?"]
  local composite63 = _g135["composite?"]
  local atom63 = _g135["atom?"]
  local table63 = _g135["table?"]
  local list63 = _g135["list?"]
  local substring = _g135.substring
  local sublist = _g135.sublist
  local sub = _g135.sub
  local inner = _g135.inner
  local tl = _g135.tl
  local char = _g135.char
  local code = _g135.code
  local string_literal63 = _g135["string-literal?"]
  local id_literal63 = _g135["id-literal?"]
  local add = _g135.add
  local drop = _g135.drop
  local last = _g135.last
  local reverse = _g135.reverse
  local join = _g135.join
  local reduce = _g135.reduce
  local keep = _g135.keep
  local find = _g135.find
  local pairwise = _g135.pairwise
  local iterate = _g135.iterate
  local replicate = _g135.replicate
  local splice = _g135.splice
  local map = _g135.map
  local keys63 = _g135["keys?"]
  local stash = _g135.stash
  local unstash = _g135.unstash
  local setenv = _g135.setenv
  local extend = _g135.extend
  local exclude = _g135.exclude
  local search = _g135.search
  local split = _g135.split
  local cat = _g135.cat
  local _43 = _g135["+"]
  local _ = _g135["-"]
  local _42 = _g135["*"]
  local _47 = _g135["/"]
  local _37 = _g135["%"]
  local _62 = _g135[">"]
  local _60 = _g135["<"]
  local _61 = _g135["="]
  local _6261 = _g135[">="]
  local _6061 = _g135["<="]
  local read_file = _g135["read-file"]
  local write_file = _g135["write-file"]
  local write = _g135.write
  local exit = _g135.exit
  local parse_number = _g135["parse-number"]
  local to_string = _g135["to-string"]
  local apply = _g135.apply
  local make_id = _g135["make-id"]
  local _37message_handler = _g135["%message-handler"]
  local _g136 = nexus.utilities
  local getenv = _g136.getenv
  local macro_function = _g136["macro-function"]
  local macro63 = _g136["macro?"]
  local special63 = _g136["special?"]
  local special_form63 = _g136["special-form?"]
  local symbol_expansion = _g136["symbol-expansion"]
  local symbol63 = _g136["symbol?"]
  local variable63 = _g136["variable?"]
  local bound63 = _g136["bound?"]
  local toplevel63 = _g136["toplevel?"]
  local quoted = _g136.quoted
  local stash42 = _g136["stash*"]
  local bind = _g136.bind
  local bind42 = _g136["bind*"]
  local quasiexpand = _g136.quasiexpand
  local macroexpand = _g136.macroexpand
  local indentation = _g136.indentation
  local valid_id63 = _g136["valid-id?"]
  local to_id = _g136["to-id"]
  local module_key = _g136["module-key"]
  local module = _g136.module
  local imported = _g136.imported
  local exported = _g136.exported
  local mapo = _g136.mapo
  local quote_environment = _g136["quote-environment"]
  local quote_modules = _g136["quote-modules"]
  local initial_environment = _g136["initial-environment"]
  local _g139 = nexus.compiler
  local compile_body = _g139["compile-body"]
  local compile_call = _g139["compile-call"]
  local compile_branch = _g139["compile-branch"]
  local compile_function = _g139["compile-function"]
  local compile_special = _g139["compile-special"]
  local compile = _g139.compile
  local open_module = _g139["open-module"]
  local load_module = _g139["load-module"]
  local in_module = _g139["in-module"]
  local compile_module = _g139["compile-module"]
  local eval = _g139.eval
  return
end)();
(function ()
  local _g325 = nexus.runtime
  local nil63 = _g325["nil?"]
  local is63 = _g325["is?"]
  local length = _g325.length
  local empty63 = _g325["empty?"]
  local some63 = _g325["some?"]
  local hd = _g325.hd
  local string63 = _g325["string?"]
  local number63 = _g325["number?"]
  local boolean63 = _g325["boolean?"]
  local function63 = _g325["function?"]
  local composite63 = _g325["composite?"]
  local atom63 = _g325["atom?"]
  local table63 = _g325["table?"]
  local list63 = _g325["list?"]
  local substring = _g325.substring
  local sublist = _g325.sublist
  local sub = _g325.sub
  local inner = _g325.inner
  local tl = _g325.tl
  local char = _g325.char
  local code = _g325.code
  local string_literal63 = _g325["string-literal?"]
  local id_literal63 = _g325["id-literal?"]
  local add = _g325.add
  local drop = _g325.drop
  local last = _g325.last
  local reverse = _g325.reverse
  local join = _g325.join
  local reduce = _g325.reduce
  local keep = _g325.keep
  local find = _g325.find
  local pairwise = _g325.pairwise
  local iterate = _g325.iterate
  local replicate = _g325.replicate
  local splice = _g325.splice
  local map = _g325.map
  local keys63 = _g325["keys?"]
  local stash = _g325.stash
  local unstash = _g325.unstash
  local setenv = _g325.setenv
  local extend = _g325.extend
  local exclude = _g325.exclude
  local search = _g325.search
  local split = _g325.split
  local cat = _g325.cat
  local _43 = _g325["+"]
  local _ = _g325["-"]
  local _42 = _g325["*"]
  local _47 = _g325["/"]
  local _37 = _g325["%"]
  local _62 = _g325[">"]
  local _60 = _g325["<"]
  local _61 = _g325["="]
  local _6261 = _g325[">="]
  local _6061 = _g325["<="]
  local read_file = _g325["read-file"]
  local write_file = _g325["write-file"]
  local write = _g325.write
  local exit = _g325.exit
  local parse_number = _g325["parse-number"]
  local to_string = _g325["to-string"]
  local apply = _g325.apply
  local make_id = _g325["make-id"]
  local _37message_handler = _g325["%message-handler"]
  local _g326 = nexus.utilities
  local getenv = _g326.getenv
  local macro_function = _g326["macro-function"]
  local macro63 = _g326["macro?"]
  local special63 = _g326["special?"]
  local special_form63 = _g326["special-form?"]
  local symbol_expansion = _g326["symbol-expansion"]
  local symbol63 = _g326["symbol?"]
  local variable63 = _g326["variable?"]
  local bound63 = _g326["bound?"]
  local toplevel63 = _g326["toplevel?"]
  local quoted = _g326.quoted
  local stash42 = _g326["stash*"]
  local bind = _g326.bind
  local bind42 = _g326["bind*"]
  local quasiexpand = _g326.quasiexpand
  local macroexpand = _g326.macroexpand
  local indentation = _g326.indentation
  local valid_id63 = _g326["valid-id?"]
  local to_id = _g326["to-id"]
  local module_key = _g326["module-key"]
  local module = _g326.module
  local imported = _g326.imported
  local exported = _g326.exported
  local mapo = _g326.mapo
  local quote_environment = _g326["quote-environment"]
  local quote_modules = _g326["quote-modules"]
  local initial_environment = _g326["initial-environment"]
  local _g329 = nexus.compiler
  local compile_body = _g329["compile-body"]
  local compile_call = _g329["compile-call"]
  local compile_branch = _g329["compile-branch"]
  local compile_function = _g329["compile-function"]
  local compile_special = _g329["compile-special"]
  local compile = _g329.compile
  local open_module = _g329["open-module"]
  local load_module = _g329["load-module"]
  local in_module = _g329["in-module"]
  local compile_module = _g329["compile-module"]
  local eval = _g329.eval
  target = "lua"
  return
end)();
(function ()
  local _g605 = nexus.runtime
  local nil63 = _g605["nil?"]
  local is63 = _g605["is?"]
  local length = _g605.length
  local empty63 = _g605["empty?"]
  local some63 = _g605["some?"]
  local hd = _g605.hd
  local string63 = _g605["string?"]
  local number63 = _g605["number?"]
  local boolean63 = _g605["boolean?"]
  local function63 = _g605["function?"]
  local composite63 = _g605["composite?"]
  local atom63 = _g605["atom?"]
  local table63 = _g605["table?"]
  local list63 = _g605["list?"]
  local substring = _g605.substring
  local sublist = _g605.sublist
  local sub = _g605.sub
  local inner = _g605.inner
  local tl = _g605.tl
  local char = _g605.char
  local code = _g605.code
  local string_literal63 = _g605["string-literal?"]
  local id_literal63 = _g605["id-literal?"]
  local add = _g605.add
  local drop = _g605.drop
  local last = _g605.last
  local reverse = _g605.reverse
  local join = _g605.join
  local reduce = _g605.reduce
  local keep = _g605.keep
  local find = _g605.find
  local pairwise = _g605.pairwise
  local iterate = _g605.iterate
  local replicate = _g605.replicate
  local splice = _g605.splice
  local map = _g605.map
  local keys63 = _g605["keys?"]
  local stash = _g605.stash
  local unstash = _g605.unstash
  local setenv = _g605.setenv
  local extend = _g605.extend
  local exclude = _g605.exclude
  local search = _g605.search
  local split = _g605.split
  local cat = _g605.cat
  local _43 = _g605["+"]
  local _ = _g605["-"]
  local _42 = _g605["*"]
  local _47 = _g605["/"]
  local _37 = _g605["%"]
  local _62 = _g605[">"]
  local _60 = _g605["<"]
  local _61 = _g605["="]
  local _6261 = _g605[">="]
  local _6061 = _g605["<="]
  local read_file = _g605["read-file"]
  local write_file = _g605["write-file"]
  local write = _g605.write
  local exit = _g605.exit
  local parse_number = _g605["parse-number"]
  local to_string = _g605["to-string"]
  local apply = _g605.apply
  local make_id = _g605["make-id"]
  local _37message_handler = _g605["%message-handler"]
  local _g606 = nexus.utilities
  local getenv = _g606.getenv
  local macro_function = _g606["macro-function"]
  local macro63 = _g606["macro?"]
  local special63 = _g606["special?"]
  local special_form63 = _g606["special-form?"]
  local symbol_expansion = _g606["symbol-expansion"]
  local symbol63 = _g606["symbol?"]
  local variable63 = _g606["variable?"]
  local bound63 = _g606["bound?"]
  local toplevel63 = _g606["toplevel?"]
  local quoted = _g606.quoted
  local stash42 = _g606["stash*"]
  local bind = _g606.bind
  local bind42 = _g606["bind*"]
  local quasiexpand = _g606.quasiexpand
  local macroexpand = _g606.macroexpand
  local indentation = _g606.indentation
  local valid_id63 = _g606["valid-id?"]
  local to_id = _g606["to-id"]
  local module_key = _g606["module-key"]
  local module = _g606.module
  local imported = _g606.imported
  local exported = _g606.exported
  local mapo = _g606.mapo
  local quote_environment = _g606["quote-environment"]
  local quote_modules = _g606["quote-modules"]
  local initial_environment = _g606["initial-environment"]
  local _g609 = nexus.compiler
  local compile_body = _g609["compile-body"]
  local compile_call = _g609["compile-call"]
  local compile_branch = _g609["compile-branch"]
  local compile_function = _g609["compile-function"]
  local compile_special = _g609["compile-special"]
  local compile = _g609.compile
  local open_module = _g609["open-module"]
  local load_module = _g609["load-module"]
  local in_module = _g609["in-module"]
  local compile_module = _g609["compile-module"]
  local eval = _g609.eval
  modules = {core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g622 = sub(body, 0)
    local imports = {}
    local imp = _g622.import
    local exp = _g622.export
    local _g623 = (imp or {})
    local _g624 = 0
    while (_g624 < length(_g623)) do
      local k = _g623[(_g624 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g624 = (_g624 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g625 = (exp or {})
    local _g626 = 0
    while (_g626 < length(_g625)) do
      local k = _g625[(_g626 + 1)]
      setenv(k, {_stash = true, export = true})
      _g626 = (_g626 + 1)
    end
    return(join({"do"}, imports))
  end, module = "core"}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g627 = body
      local k = nil
      for k in next, _g627 do
        if (not number63(k)) then
          local v = _g627[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, module = "core"}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g628 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g629 = {"table"}
      _g629._scope = scope
      return(_g629)
    end)())}), join({"let", join({x, join({"do"}, _g628)}), join({"drop", "environment"}), x})}))
  end, module = "core"}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g630 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g630)) then
      local _g631 = bind42(x, _g630)
      local args = _g631[1]
      local _g632 = _g631[2]
      return(join({"%local-function", name, args}, _g632))
    else
      return(join({"%local", name, x}))
    end
  end, module = "core"}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g633 = sub(body, 0)
    local form = join({"fn", args}, _g633)
    eval(join((function ()
      local _g634 = {"setenv", join({"quote", name})}
      _g634.macro = form
      _g634.form = join({"quote", form})
      return(_g634)
    end)()))
    return(nil)
  end, module = "core"}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g635 = sub(body, 0)
    add(environment, {})
    local _g636 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g635)))
    end)()
    drop(environment)
    return(_g636)
  end, module = "core"}, inc = {export = true, macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, module = "core"}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g637 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g637)}))
  end, module = "core"}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g638 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g638)) then
      local _g639 = bind42(x, _g638)
      local args = _g639[1]
      local _g640 = _g639[2]
      return(join({"%global-function", name, args}, _g640))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, module = "core"}, ["list*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g641 = xs
      local i = 0
      while (i < length(_g641)) do
        local x = _g641[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, module = "core"}, at = {export = true, macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, module = "core"}, guard = {export = true, macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, module = "core"}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g642 = sub(body, 0)
    local _g643 = bind42(args, _g642)
    local _g644 = _g643[1]
    local _g645 = _g643[2]
    return(join({"%function", _g644}, _g645))
  end, module = "core"}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g646 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g647)
      local lh = _g647[1]
      local rh = _g647[2]
      local _g648 = bind(lh, rh)
      local _g649 = 0
      while (_g649 < length(_g648)) do
        local _g650 = _g648[(_g649 + 1)]
        local id = _g650[1]
        local val = _g650[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g649 = (_g649 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g646)})))
  end, module = "core"}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core"}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g651 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g651), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g652 = {"target"}
          _g652.js = join({"isNaN", join({"parseInt", k})})
          _g652.lua = join({"not", join({"number?", k})})
          return(_g652)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g651)})})}))
      end
    end)()}))
  end, module = "core"}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g653 = sub(body, 0)
    add(environment, {})
    local _g654 = (function ()
      map(function (_g655)
        local name = _g655[1]
        local exp = _g655[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g653)))
    end)()
    drop(environment)
    return(_g654)
  end, module = "core"}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, module = "core"}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g656 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g656)}))
  end, module = "core"}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end, module = "core"}, language = {export = true, macro = function ()
    return(join({"quote", target}))
  end, module = "core"}, ["with-bindings"] = {export = true, macro = function (_g657, ...)
    local names = _g657[1]
    local body = unstash({...})
    local _g658 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g659 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g660 = {"setenv", x}
        _g660.variable = true
        return(_g660)
      end)())})}
      _g659.scope = true
      return(_g659)
    end)(), _g658))
  end, module = "core"}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g324, x)
      return(x)
    end, body)))
  end, module = "core"}, dec = {export = true, macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, module = "core"}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end, module = "core"}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g661 = elements
    local _g662 = 0
    while (_g662 < length(_g661)) do
      local e = _g661[(_g662 + 1)]
      l[e] = true
      _g662 = (_g662 + 1)
    end
    return(join({"table"}, l))
  end, module = "core"}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g663 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g663)}))
  end, module = "core"}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g664 = sub(body, 0)
    local form = join({"fn", args}, _g664)
    local keys = sub(_g664, length(_g664))
    eval(join((function ()
      local _g665 = {"setenv", join({"quote", name})}
      _g665.special = form
      _g665.form = join({"quote", form})
      return(_g665)
    end)(), keys))
    return(nil)
  end, module = "core"}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, module = "core"}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}, utilities = {import = {"runtime", "special", "core"}, export = {getenv = {export = true, module = "utilities", variable = true}, ["macro-function"] = {export = true, module = "utilities", variable = true}, ["macro?"] = {export = true, module = "utilities", variable = true}, ["special?"] = {export = true, module = "utilities", variable = true}, ["special-form?"] = {export = true, module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, module = "utilities", variable = true}, ["symbol?"] = {export = true, module = "utilities", variable = true}, ["variable?"] = {export = true, module = "utilities", variable = true}, ["bound?"] = {export = true, module = "utilities", variable = true}, ["toplevel?"] = {export = true, module = "utilities", variable = true}, quoted = {export = true, module = "utilities", variable = true}, ["stash*"] = {export = true, module = "utilities", variable = true}, bind = {export = true, module = "utilities", variable = true}, ["bind*"] = {export = true, module = "utilities", variable = true}, quasiexpand = {export = true, module = "utilities", variable = true}, macroexpand = {export = true, module = "utilities", variable = true}, indentation = {export = true, module = "utilities", variable = true}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["valid-id?"] = {export = true, module = "utilities", variable = true}, ["to-id"] = {export = true, module = "utilities", variable = true}, ["module-key"] = {export = true, module = "utilities", variable = true}, module = {export = true, module = "utilities", variable = true}, imported = {export = true, module = "utilities", variable = true}, exported = {export = true, module = "utilities", variable = true}, mapo = {export = true, module = "utilities", variable = true}, ["quote-environment"] = {export = true, module = "utilities", variable = true}, ["quote-modules"] = {export = true, module = "utilities", variable = true}, ["initial-environment"] = {export = true, module = "utilities", variable = true}, ["global?"] = {variable = true, module = "utilities"}, escape = {variable = true, module = "utilities"}, ["quoting?"] = {variable = true, module = "utilities"}, ["quasiquoting?"] = {variable = true, module = "utilities"}, ["can-unquote?"] = {variable = true, module = "utilities"}, ["quasisplice?"] = {variable = true, module = "utilities"}, ["quasiquote-list"] = {variable = true, module = "utilities"}, ["indent-level"] = {global = true, export = true, module = "utilities"}, reserved = {variable = true, module = "utilities"}, ["numeric?"] = {variable = true, module = "utilities"}, ["valid-char?"] = {variable = true, module = "utilities"}, ["quote-binding"] = {variable = true, module = "utilities"}, ["quote-frame"] = {variable = true, module = "utilities"}, ["quote-module"] = {variable = true, module = "utilities"}}}, optimizer = {import = {"runtime", "special", "core"}, export = {["define-optimization"] = {}, optimize = {export = true, variable = true, module = "optimizer"}, optimizations = {variable = true, module = "optimizer"}}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, module = "runtime", variable = true}, ["is?"] = {export = true, module = "runtime", variable = true}, length = {export = true, module = "runtime", variable = true}, ["empty?"] = {export = true, module = "runtime", variable = true}, ["some?"] = {export = true, module = "runtime", variable = true}, hd = {export = true, module = "runtime", variable = true}, ["string?"] = {export = true, module = "runtime", variable = true}, ["number?"] = {export = true, module = "runtime", variable = true}, ["boolean?"] = {export = true, module = "runtime", variable = true}, ["function?"] = {export = true, module = "runtime", variable = true}, ["composite?"] = {export = true, module = "runtime", variable = true}, ["atom?"] = {export = true, module = "runtime", variable = true}, ["table?"] = {export = true, module = "runtime", variable = true}, ["list?"] = {export = true, module = "runtime", variable = true}, substring = {export = true, module = "runtime", variable = true}, sublist = {export = true, module = "runtime", variable = true}, sub = {export = true, module = "runtime", variable = true}, inner = {export = true, module = "runtime", variable = true}, tl = {export = true, module = "runtime", variable = true}, char = {export = true, module = "runtime", variable = true}, code = {export = true, module = "runtime", variable = true}, ["string-literal?"] = {export = true, module = "runtime", variable = true}, ["id-literal?"] = {export = true, module = "runtime", variable = true}, add = {export = true, module = "runtime", variable = true}, drop = {export = true, module = "runtime", variable = true}, last = {export = true, module = "runtime", variable = true}, reverse = {export = true, module = "runtime", variable = true}, join = {export = true, module = "runtime", variable = true}, reduce = {export = true, module = "runtime", variable = true}, keep = {export = true, module = "runtime", variable = true}, find = {export = true, module = "runtime", variable = true}, pairwise = {export = true, module = "runtime", variable = true}, iterate = {export = true, module = "runtime", variable = true}, replicate = {export = true, module = "runtime", variable = true}, splice = {export = true, module = "runtime", variable = true}, map = {export = true, module = "runtime", variable = true}, ["keys?"] = {export = true, module = "runtime", variable = true}, stash = {export = true, module = "runtime", variable = true}, unstash = {export = true, module = "runtime", variable = true}, setenv = {export = true, module = "runtime", variable = true}, extend = {export = true, module = "runtime", variable = true}, exclude = {export = true, module = "runtime", variable = true}, search = {export = true, module = "runtime", variable = true}, split = {export = true, module = "runtime", variable = true}, cat = {export = true, module = "runtime", variable = true}, ["+"] = {export = true, module = "runtime", variable = true}, ["-"] = {export = true, module = "runtime", variable = true}, ["*"] = {export = true, module = "runtime", variable = true}, ["/"] = {export = true, module = "runtime", variable = true}, ["%"] = {export = true, module = "runtime", variable = true}, [">"] = {export = true, module = "runtime", variable = true}, ["<"] = {export = true, module = "runtime", variable = true}, ["="] = {export = true, module = "runtime", variable = true}, [">="] = {export = true, module = "runtime", variable = true}, ["<="] = {export = true, module = "runtime", variable = true}, ["read-file"] = {export = true, module = "runtime", variable = true}, ["write-file"] = {export = true, module = "runtime", variable = true}, write = {export = true, module = "runtime", variable = true}, exit = {export = true, module = "runtime", variable = true}, ["parse-number"] = {export = true, module = "runtime", variable = true}, ["to-string"] = {export = true, module = "runtime", variable = true}, apply = {export = true, module = "runtime", variable = true}, ["make-id"] = {export = true, module = "runtime", variable = true}, ["%message-handler"] = {export = true, module = "runtime", variable = true}, ["splice?"] = {variable = true, module = "runtime"}, mapl = {variable = true, module = "runtime"}, ["id-count"] = {variable = true, module = "runtime"}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["while"] = {export = true, special = function (_g666)
    local condition = _g666[1]
    local body = sub(_g666, 1)
    local _g667 = compile(condition)
    local _g668 = (function ()
      indent_level = (indent_level + 1)
      local _g669 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g669)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g667 .. ") {\n" .. _g668 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g667 .. " do\n" .. _g668 .. ind .. "end\n"))
    end
  end, module = "special", tr = true, stmt = true}, ["%local-function"] = {export = true, special = function (_g670)
    local name = _g670[1]
    local args = _g670[2]
    local body = sub(_g670, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, module = "special", tr = true, stmt = true}, ["do"] = {export = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, module = "special", tr = true, stmt = true}, ["not"] = {export = true, special = function (_g671)
    local x = _g671[1]
    local _g672 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g672 .. ")"))
  end, module = "special"}, ["get"] = {export = true, special = function (_g673)
    local t = _g673[1]
    local k = _g673[2]
    local _g674 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g674, 0) == "{")) then
      _g674 = ("(" .. _g674 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g674 .. "." .. inner(k)))
    else
      return((_g674 .. "[" .. k1 .. "]"))
    end
  end, module = "special"}, ["%function"] = {export = true, special = function (_g675)
    local args = _g675[1]
    local body = sub(_g675, 1)
    return(compile_function(args, body))
  end, module = "special"}, ["if"] = {export = true, special = function (form, tail63)
    local str = ""
    local _g676 = form
    local i = 0
    while (i < length(_g676)) do
      local condition = _g676[(i + 1)]
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
  end, module = "special", tr = true, stmt = true}, ["%object"] = {export = true, special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g677 = pairs
    local i = 0
    while (i < length(_g677)) do
      local _g678 = _g677[(i + 1)]
      local k = _g678[1]
      local v = _g678[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g679 = compile(v)
      local _g680 = (function ()
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
      str = (str .. _g680 .. sep .. _g679)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special"}, ["%try"] = {export = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g681 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g681)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, join({"get", e, "\"message\""})})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g682 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g682)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, module = "special", tr = true, stmt = true}, ["set"] = {export = true, stmt = true, special = function (_g683)
    local lh = _g683[1]
    local rh = _g683[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, module = "special"}, ["%local"] = {export = true, stmt = true, special = function (_g684)
    local name = _g684[1]
    local value = _g684[2]
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
  end, module = "special"}, ["%global-function"] = {export = true, special = function (_g685)
    local name = _g685[1]
    local args = _g685[2]
    local body = sub(_g685, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, module = "special", tr = true, stmt = true}, ["error"] = {export = true, stmt = true, special = function (_g686)
    local x = _g686[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile(join({"Error", x}))))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, module = "special"}, ["%array"] = {export = true, special = function (forms)
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
    local _g687 = forms
    local i = 0
    while (i < length(_g687)) do
      local x = _g687[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special"}, ["return"] = {export = true, stmt = true, special = function (_g688)
    local x = _g688[1]
    local _g689 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g689))
  end, module = "special"}, ["%for"] = {export = true, special = function (_g690)
    local _g691 = _g690[1]
    local t = _g691[1]
    local k = _g691[2]
    local body = sub(_g690, 1)
    local _g692 = compile(t)
    local ind = indentation()
    local _g693 = (function ()
      indent_level = (indent_level + 1)
      local _g694 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g694)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g692 .. " do\n" .. _g693 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g692 .. ") {\n" .. _g693 .. ind .. "}\n"))
    end
  end, module = "special", tr = true, stmt = true}, ["break"] = {export = true, stmt = true, special = function (_g134)
    return((indentation() .. "break"))
  end, module = "special"}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["compile-body"] = {export = true, module = "compiler", variable = true}, ["compile-call"] = {export = true, module = "compiler", variable = true}, ["compile-branch"] = {export = true, module = "compiler", variable = true}, ["compile-function"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {export = true, module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, ["compile-module"] = {export = true, module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, infix = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["compile-args"] = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, terminator = {variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["can-return?"] = {variable = true, module = "compiler"}, lower = {variable = true, module = "compiler"}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["module-path"] = {variable = true, module = "compiler"}, encapsulate = {variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}, run = {variable = true, module = "compiler"}, ["compiling?"] = {variable = true, module = "compiler"}, ["compiler-output"] = {variable = true, module = "compiler"}, ["%compile-module"] = {variable = true, module = "compiler"}, prologue = {variable = true, module = "compiler"}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {}}, lib = {import = {"core", "special"}, export = {}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["read-table"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g695, ...)
    local char = _g695[1]
    local stream = _g695[2]
    local body = unstash({...})
    local _g696 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g696)}))
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}, delimiters = {variable = true, module = "reader"}, whitespace = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, ["skip-non-code"] = {variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    local imports = {}
    local imp = _g697.import
    local exp = _g697.export
    local _g698 = (imp or {})
    local _g699 = 0
    while (_g699 < length(_g698)) do
      local k = _g698[(_g699 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g699 = (_g699 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g700 = (exp or {})
    local _g701 = 0
    while (_g701 < length(_g700)) do
      local k = _g700[(_g701 + 1)]
      setenv(k, {_stash = true, export = true})
      _g701 = (_g701 + 1)
    end
    return(join({"do"}, imports))
  end, module = "core"}}}
  return
end)();
(function ()
  local _g2 = nexus.runtime
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local length = _g2.length
  local empty63 = _g2["empty?"]
  local some63 = _g2["some?"]
  local hd = _g2.hd
  local string63 = _g2["string?"]
  local number63 = _g2["number?"]
  local boolean63 = _g2["boolean?"]
  local function63 = _g2["function?"]
  local composite63 = _g2["composite?"]
  local atom63 = _g2["atom?"]
  local table63 = _g2["table?"]
  local list63 = _g2["list?"]
  local substring = _g2.substring
  local sublist = _g2.sublist
  local sub = _g2.sub
  local inner = _g2.inner
  local tl = _g2.tl
  local char = _g2.char
  local code = _g2.code
  local string_literal63 = _g2["string-literal?"]
  local id_literal63 = _g2["id-literal?"]
  local add = _g2.add
  local drop = _g2.drop
  local last = _g2.last
  local reverse = _g2.reverse
  local join = _g2.join
  local reduce = _g2.reduce
  local keep = _g2.keep
  local find = _g2.find
  local pairwise = _g2.pairwise
  local iterate = _g2.iterate
  local replicate = _g2.replicate
  local splice = _g2.splice
  local map = _g2.map
  local keys63 = _g2["keys?"]
  local stash = _g2.stash
  local unstash = _g2.unstash
  local setenv = _g2.setenv
  local extend = _g2.extend
  local exclude = _g2.exclude
  local search = _g2.search
  local split = _g2.split
  local cat = _g2.cat
  local _43 = _g2["+"]
  local _ = _g2["-"]
  local _42 = _g2["*"]
  local _47 = _g2["/"]
  local _37 = _g2["%"]
  local _62 = _g2[">"]
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local _6261 = _g2[">="]
  local _6061 = _g2["<="]
  local read_file = _g2["read-file"]
  local write_file = _g2["write-file"]
  local write = _g2.write
  local exit = _g2.exit
  local parse_number = _g2["parse-number"]
  local to_string = _g2["to-string"]
  local apply = _g2.apply
  local make_id = _g2["make-id"]
  local _37message_handler = _g2["%message-handler"]
  local _g5 = nexus.reader
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus.compiler
  local compile_body = _g6["compile-body"]
  local compile_call = _g6["compile-call"]
  local compile_branch = _g6["compile-branch"]
  local compile_function = _g6["compile-function"]
  local compile_special = _g6["compile-special"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local function rep(str)
    local _g703 = (function ()
      local _g704,_g705 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g704, _g705})
    end)()
    local _g1 = _g703[1]
    local x = _g703[2]
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
    local _g706 = args
    local i = 0
    while (i < length(_g706)) do
      local arg = _g706[(i + 1)]
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
  local _g707 = {}
  nexus.main = _g707
  _g707.rep = rep
  _g707.repl = repl
  _g707.usage = usage
  _g707.main = main
end)();
