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
      local _g5 = x
      local k = nil
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
      local _g6 = l1
      local k = nil
      for k in next, _g6 do
        if (not number63(k)) then
          local v = _g6[k]
          l[k] = v
        end
      end
      local _g7 = l2
      local k = nil
      for k in next, _g7 do
        if (not number63(k)) then
          local v = _g7[k]
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
    local _g8 = l
    local _g9 = 0
    while (_g9 < length(_g8)) do
      local x = _g8[(_g9 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g9 = (_g9 + 1)
    end
    return(l1)
  end
  local function find(f, l)
    local _g10 = l
    local _g11 = 0
    while (_g11 < length(_g10)) do
      local x = _g10[(_g11 + 1)]
      local _g12 = f(x)
      if _g12 then
        return(_g12)
      end
      _g11 = (_g11 + 1)
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
    local _g13 = l
    local _g14 = 0
    while (_g14 < length(_g13)) do
      local x = _g13[(_g14 + 1)]
      local _g15 = f(x)
      if splice63(_g15) then
        l1 = join(l1, _g15.value)
      elseif is63(_g15) then
        add(l1, _g15)
      end
      _g14 = (_g14 + 1)
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g16 = t
    local k = nil
    for k in next, _g16 do
      if (not number63(k)) then
        local v = _g16[k]
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
    local _g17 = t
    local k1 = nil
    for k1 in next, _g17 do
      if (not number63(k1)) then
        local v = _g17[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g18 = args
      local k = nil
      for k in next, _g18 do
        if (not number63(k)) then
          local v = _g18[k]
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
        local _g19 = l
        local k = nil
        for k in next, _g19 do
          if (not number63(k)) then
            local v = _g19[k]
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
    local _g20 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local _g21 = _g20
      local k1 = nil
      for k1 in next, _g21 do
        if (not number63(k1)) then
          local v = _g21[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
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
    local _g24 = t
    local k = nil
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
      local _g32 = x
      local k = nil
      for k in next, _g32 do
        if (not number63(k)) then
          local v = _g32[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local _g33 = x1
      local i = 0
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
  local id_count = 0
  local function make_id()
    id_count = (id_count + 1)
    return(("_g" .. id_count))
  end
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  local _g35 = {}
  nexus.runtime = _g35
  _g35.length = length
  _g35.extend = extend
  _g35.keep = keep
  _g35["table?"] = table63
  _g35.hd = hd
  _g35["is?"] = is63
  _g35["keys?"] = keys63
  _g35["boolean?"] = boolean63
  _g35.splice = splice
  _g35.find = find
  _g35["empty?"] = empty63
  _g35["%message-handler"] = _37message_handler
  _g35["make-id"] = make_id
  _g35.apply = apply
  _g35["to-string"] = to_string
  _g35["atom?"] = atom63
  _g35.drop = drop
  _g35["parse-number"] = parse_number
  _g35.exit = exit
  _g35["%"] = _37
  _g35.exclude = exclude
  _g35["string?"] = string63
  _g35["read-file"] = read_file
  _g35["nil?"] = nil63
  _g35["="] = _61
  _g35["<"] = _60
  _g35.sublist = sublist
  _g35["list?"] = list63
  _g35.write = write
  _g35["/"] = _47
  _g35["id-literal?"] = id_literal63
  _g35["<="] = _6061
  _g35.join = join
  _g35.cat = cat
  _g35.split = split
  _g35["string-literal?"] = string_literal63
  _g35.search = search
  _g35["write-file"] = write_file
  _g35.iterate = iterate
  _g35.setenv = setenv
  _g35.unstash = unstash
  _g35.stash = stash
  _g35.reduce = reduce
  _g35.map = map
  _g35.replicate = replicate
  _g35["+"] = _43
  _g35[">="] = _6261
  _g35["-"] = _
  _g35.add = add
  _g35["*"] = _42
  _g35.char = char
  _g35.tl = tl
  _g35.sub = sub
  _g35["composite?"] = composite63
  _g35[">"] = _62
  _g35.substring = substring
  _g35.last = last
  _g35.inner = inner
  _g35["function?"] = function63
  _g35.code = code
  _g35["number?"] = number63
  _g35.pairwise = pairwise
  _g35["some?"] = some63
  _g35.reverse = reverse
end)();
(function ()
  local _g42 = nexus.runtime
  local char = _g42.char
  local setenv = _g42.setenv
  local write = _g42.write
  local search = _g42.search
  local splice = _g42.splice
  local exclude = _g42.exclude
  local hd = _g42.hd
  local _6061 = _g42["<="]
  local tl = _g42.tl
  local length = _g42.length
  local extend = _g42.extend
  local string_literal63 = _g42["string-literal?"]
  local keep = _g42.keep
  local write_file = _g42["write-file"]
  local iterate = _g42.iterate
  local table63 = _g42["table?"]
  local unstash = _g42.unstash
  local sublist = _g42.sublist
  local _37 = _g42["%"]
  local reduce = _g42.reduce
  local inner = _g42.inner
  local parse_number = _g42["parse-number"]
  local _37message_handler = _g42["%message-handler"]
  local list63 = _g42["list?"]
  local _43 = _g42["+"]
  local _6261 = _g42[">="]
  local _ = _g42["-"]
  local id_literal63 = _g42["id-literal?"]
  local add = _g42.add
  local reverse = _g42.reverse
  local join = _g42.join
  local _42 = _g42["*"]
  local is63 = _g42["is?"]
  local keys63 = _g42["keys?"]
  local boolean63 = _g42["boolean?"]
  local nil63 = _g42["nil?"]
  local _47 = _g42["/"]
  local exit = _g42.exit
  local sub = _g42.sub
  local replicate = _g42.replicate
  local find = _g42.find
  local composite63 = _g42["composite?"]
  local _61 = _g42["="]
  local _62 = _g42[">"]
  local map = _g42.map
  local function63 = _g42["function?"]
  local last = _g42.last
  local to_string = _g42["to-string"]
  local substring = _g42.substring
  local split = _g42.split
  local drop = _g42.drop
  local code = _g42.code
  local cat = _g42.cat
  local make_id = _g42["make-id"]
  local number63 = _g42["number?"]
  local pairwise = _g42.pairwise
  local apply = _g42.apply
  local string63 = _g42["string?"]
  local some63 = _g42["some?"]
  local empty63 = _g42["empty?"]
  local _60 = _g42["<"]
  local stash = _g42.stash
  local atom63 = _g42["atom?"]
  local read_file = _g42["read-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g43 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g44 = keys63(_g43)
        if _g44 then
          return(b[_g44])
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
      local _g45 = args
      local k = nil
      for k in next, _g45 do
        if (not number63(k)) then
          local v = _g45[k]
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
      local _g46 = lh
      local i = 0
      while (i < length(_g46)) do
        local x = _g46[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local _g47 = lh
      local k = nil
      for k in next, _g47 do
        if (not number63(k)) then
          local v = _g47[k]
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
      local _g48 = args
      local _g49 = 0
      while (_g49 < length(_g48)) do
        local arg = _g48[(_g49 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g49 = (_g49 + 1)
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
        local _g37 = form[1]
        local _g50 = form[2]
        local t = _g50[1]
        local k = _g50[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g38 = form[1]
        local args = form[2]
        local _g51 = sub(form, 2)
        add(environment, {_scope = true})
        local _g53 = (function ()
          local _g54 = args
          local _g55 = 0
          while (_g55 < length(_g54)) do
            local _g52 = _g54[(_g55 + 1)]
            setenv(_g52, {_stash = true, variable = true})
            _g55 = (_g55 + 1)
          end
          return(join({"%function", map(macroexpand, args)}, macroexpand(_g51)))
        end)()
        drop(environment)
        return(_g53)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g39 = form[1]
        local name = form[2]
        local _g56 = form[3]
        local _g57 = sub(form, 3)
        add(environment, {_scope = true})
        local _g59 = (function ()
          local _g60 = _g56
          local _g61 = 0
          while (_g61 < length(_g60)) do
            local _g58 = _g60[(_g61 + 1)]
            setenv(_g58, {_stash = true, variable = true})
            _g61 = (_g61 + 1)
          end
          return(join({x, name, map(macroexpand, _g56)}, macroexpand(_g57)))
        end)()
        drop(environment)
        return(_g59)
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
    local _g62 = form
    local k = nil
    for k in next, _g62 do
      if (not number63(k)) then
        local v = _g62[k]
        local _g63 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g63
      end
    end
    local _g64 = form
    local _g65 = 0
    while (_g65 < length(_g64)) do
      local x = _g64[(_g65 + 1)]
      if quasisplice63(x, depth) then
        local _g66 = quasiexpand(x[2])
        add(xs, _g66)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g65 = (_g65 + 1)
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
  local reserved = {["case"] = true, ["/"] = true, ["-"] = true, ["+"] = true, ["continue"] = true, ["catch"] = true, ["new"] = true, ["finally"] = true, ["nil"] = true, ["=="] = true, ["then"] = true, ["%"] = true, ["return"] = true, [">"] = true, ["<"] = true, ["switch"] = true, ["local"] = true, ["elseif"] = true, ["true"] = true, ["break"] = true, ["while"] = true, ["until"] = true, ["else"] = true, ["void"] = true, ["instanceof"] = true, ["try"] = true, ["repeat"] = true, ["debugger"] = true, ["if"] = true, ["false"] = true, ["not"] = true, ["this"] = true, ["var"] = true, ["throw"] = true, ["or"] = true, ["*"] = true, ["typeof"] = true, [">="] = true, ["<="] = true, ["delete"] = true, ["default"] = true, ["="] = true, ["for"] = true, ["end"] = true, ["in"] = true, ["function"] = true, ["with"] = true, ["do"] = true, ["and"] = true}
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
    local _g69 = toplevel
    local n = nil
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
  local function imported(spec)
    local k = module_key(spec)
    local x = nexus[k]
    if (x and keys63(x)) then
      local m = make_id()
      local imports = {}
      add(imports, join({"%local", m, join({"get", "nexus", join({"quote", k})})}))
      local _g70 = x
      local b = nil
      for b in next, _g70 do
        if (not number63(b)) then
          local _g40 = _g70[b]
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
    local _g71 = t
    local k = nil
    for k in next, _g71 do
      if (not number63(k)) then
        local v = _g71[k]
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
    return(join({"%object"}, mapo(function (_g41, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g72 = {"table"}
      _g72.export = quote_frame(m.export)
      _g72.import = quoted(m.import)
      return(_g72)
    end)()))
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g73 = {}
  nexus.utilities = _g73
  _g73.indentation = indentation
  _g73["special?"] = special63
  _g73["to-id"] = to_id
  _g73["symbol?"] = symbol63
  _g73.bind = bind
  _g73.getenv = getenv
  _g73.quasiexpand = quasiexpand
  _g73["valid-id?"] = valid_id63
  _g73.mapo = mapo
  _g73["stash*"] = stash42
  _g73["bind*"] = bind42
  _g73.quoted = quoted
  _g73["macro?"] = macro63
  _g73.imported = imported
  _g73["special-form?"] = special_form63
  _g73["initial-environment"] = initial_environment
  _g73["quote-modules"] = quote_modules
  _g73["quote-environment"] = quote_environment
  _g73.exported = exported
  _g73["module-key"] = module_key
  _g73.macroexpand = macroexpand
  _g73["bound?"] = bound63
  _g73["variable?"] = variable63
  _g73["symbol-expansion"] = symbol_expansion
  _g73["macro-function"] = macro_function
end)();
(function ()
  local _g75 = nexus.runtime
  local char = _g75.char
  local setenv = _g75.setenv
  local write = _g75.write
  local search = _g75.search
  local splice = _g75.splice
  local exclude = _g75.exclude
  local hd = _g75.hd
  local _6061 = _g75["<="]
  local tl = _g75.tl
  local length = _g75.length
  local extend = _g75.extend
  local string_literal63 = _g75["string-literal?"]
  local keep = _g75.keep
  local write_file = _g75["write-file"]
  local iterate = _g75.iterate
  local table63 = _g75["table?"]
  local unstash = _g75.unstash
  local sublist = _g75.sublist
  local _37 = _g75["%"]
  local reduce = _g75.reduce
  local inner = _g75.inner
  local parse_number = _g75["parse-number"]
  local _37message_handler = _g75["%message-handler"]
  local list63 = _g75["list?"]
  local _43 = _g75["+"]
  local _6261 = _g75[">="]
  local _ = _g75["-"]
  local id_literal63 = _g75["id-literal?"]
  local add = _g75.add
  local reverse = _g75.reverse
  local join = _g75.join
  local _42 = _g75["*"]
  local is63 = _g75["is?"]
  local keys63 = _g75["keys?"]
  local boolean63 = _g75["boolean?"]
  local nil63 = _g75["nil?"]
  local _47 = _g75["/"]
  local exit = _g75.exit
  local sub = _g75.sub
  local replicate = _g75.replicate
  local find = _g75.find
  local composite63 = _g75["composite?"]
  local _61 = _g75["="]
  local _62 = _g75[">"]
  local map = _g75.map
  local function63 = _g75["function?"]
  local last = _g75.last
  local to_string = _g75["to-string"]
  local substring = _g75.substring
  local split = _g75.split
  local drop = _g75.drop
  local code = _g75.code
  local cat = _g75.cat
  local make_id = _g75["make-id"]
  local number63 = _g75["number?"]
  local pairwise = _g75.pairwise
  local apply = _g75.apply
  local string63 = _g75["string?"]
  local some63 = _g75["some?"]
  local empty63 = _g75["empty?"]
  local _60 = _g75["<"]
  local stash = _g75.stash
  local atom63 = _g75["atom?"]
  local read_file = _g75["read-file"]
  local delimiters = {["("] = true, ["\n"] = true, [";"] = true, [")"] = true}
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  local function make_stream(str)
    return({pos = 0, len = length(str), string = str})
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
  local _g81 = {}
  nexus.reader = _g81
  _g81["read-all"] = read_all
  _g81["read-from-string"] = read_from_string
  _g81.read = read
  _g81["make-stream"] = make_stream
  _g81["read-table"] = read_table
end)();
(function ()
  local _g83 = nexus.runtime
  local char = _g83.char
  local setenv = _g83.setenv
  local write = _g83.write
  local search = _g83.search
  local splice = _g83.splice
  local exclude = _g83.exclude
  local hd = _g83.hd
  local _6061 = _g83["<="]
  local tl = _g83.tl
  local length = _g83.length
  local extend = _g83.extend
  local string_literal63 = _g83["string-literal?"]
  local keep = _g83.keep
  local write_file = _g83["write-file"]
  local iterate = _g83.iterate
  local table63 = _g83["table?"]
  local unstash = _g83.unstash
  local sublist = _g83.sublist
  local _37 = _g83["%"]
  local reduce = _g83.reduce
  local inner = _g83.inner
  local parse_number = _g83["parse-number"]
  local _37message_handler = _g83["%message-handler"]
  local list63 = _g83["list?"]
  local _43 = _g83["+"]
  local _6261 = _g83[">="]
  local _ = _g83["-"]
  local id_literal63 = _g83["id-literal?"]
  local add = _g83.add
  local reverse = _g83.reverse
  local join = _g83.join
  local _42 = _g83["*"]
  local is63 = _g83["is?"]
  local keys63 = _g83["keys?"]
  local boolean63 = _g83["boolean?"]
  local nil63 = _g83["nil?"]
  local _47 = _g83["/"]
  local exit = _g83.exit
  local sub = _g83.sub
  local replicate = _g83.replicate
  local find = _g83.find
  local composite63 = _g83["composite?"]
  local _61 = _g83["="]
  local _62 = _g83[">"]
  local map = _g83.map
  local function63 = _g83["function?"]
  local last = _g83.last
  local to_string = _g83["to-string"]
  local substring = _g83.substring
  local split = _g83.split
  local drop = _g83.drop
  local code = _g83.code
  local cat = _g83.cat
  local make_id = _g83["make-id"]
  local number63 = _g83["number?"]
  local pairwise = _g83.pairwise
  local apply = _g83.apply
  local string63 = _g83["string?"]
  local some63 = _g83["some?"]
  local empty63 = _g83["empty?"]
  local _60 = _g83["<"]
  local stash = _g83.stash
  local atom63 = _g83["atom?"]
  local read_file = _g83["read-file"]
  local _g84 = nexus.utilities
  local indentation = _g84.indentation
  local module_key = _g84["module-key"]
  local special63 = _g84["special?"]
  local bind = _g84.bind
  local bind42 = _g84["bind*"]
  local to_id = _g84["to-id"]
  local symbol63 = _g84["symbol?"]
  local macroexpand = _g84.macroexpand
  local stash42 = _g84["stash*"]
  local macro_function = _g84["macro-function"]
  local valid_id63 = _g84["valid-id?"]
  local macro63 = _g84["macro?"]
  local symbol_expansion = _g84["symbol-expansion"]
  local quoted = _g84.quoted
  local getenv = _g84.getenv
  local exported = _g84.exported
  local mapo = _g84.mapo
  local quasiexpand = _g84.quasiexpand
  local quote_modules = _g84["quote-modules"]
  local bound63 = _g84["bound?"]
  local quote_environment = _g84["quote-environment"]
  local variable63 = _g84["variable?"]
  local initial_environment = _g84["initial-environment"]
  local imported = _g84.imported
  local special_form63 = _g84["special-form?"]
  local _g85 = nexus.reader
  local read_from_string = _g85["read-from-string"]
  local make_stream = _g85["make-stream"]
  local read = _g85.read
  local read_table = _g85["read-table"]
  local read_all = _g85["read-all"]
  local infix = {common = {["%"] = true, ["/"] = true, ["<="] = true, ["+"] = true, ["<"] = true, ["-"] = true, [">"] = true, [">="] = true, ["*"] = true}, js = {["~="] = "!=", ["="] = "===", cat = "+", ["or"] = "||", ["and"] = "&&"}, lua = {["~="] = true, ["="] = "==", cat = "..", ["and"] = true, ["or"] = true}}
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
    local _g86 = args
    local i = 0
    while (i < length(_g86)) do
      local arg = _g86[(i + 1)]
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
    local _g87 = unstash({...})
    local tail = _g87.tail
    local str = ""
    local _g88 = forms
    local i = 0
    while (i < length(_g88)) do
      local x = _g88[(i + 1)]
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
    local _g89 = getenv(hd(form))
    local special = _g89.special
    local self_tr63 = _g89.tr
    local stmt = _g89.stmt
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
  local function compile_infix(_g90)
    local op = _g90[1]
    local args = sub(_g90, 1)
    local str = "("
    local _g91 = getop(op)
    local _g92 = args
    local i = 0
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
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g93 = (function ()
      indent_level = (indent_level + 1)
      local _g94 = compile(body, {_stash = true, stmt = true, tail = tail63})
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
  local function compile_function(args, body, ...)
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
      local _g99 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
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
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g100 = unstash({...})
    local stmt = _g100.stmt
    local tail = _g100.tail
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
      local _g101 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g101 .. tr))
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
    local _g102 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g102, {epilog}))}))
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
    local _g116 = toplevel
    local name = nil
    for name in next, _g116 do
      if (not number63(name)) then
        local binding = _g116[name]
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
    local _g117 = m.export
    local k = nil
    for k in next, _g117 do
      if (not number63(k)) then
        local v = _g117[k]
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
  local _g118 = {}
  nexus.compiler = _g118
  _g118["compile-body"] = compile_body
  _g118["compile-module"] = compile_module
  _g118["compile-function"] = compile_function
  _g118["compile-branch"] = compile_branch
  _g118.compile = compile
  _g118["open-module"] = open_module
  _g118.eval = eval
  _g118["in-module"] = in_module
  _g118["load-module"] = load_module
  _g118["compile-special"] = compile_special
  _g118["compile-call"] = compile_call
end)();
(function ()
  local _g121 = nexus.runtime
  local char = _g121.char
  local setenv = _g121.setenv
  local write = _g121.write
  local search = _g121.search
  local splice = _g121.splice
  local exclude = _g121.exclude
  local hd = _g121.hd
  local _6061 = _g121["<="]
  local tl = _g121.tl
  local length = _g121.length
  local extend = _g121.extend
  local string_literal63 = _g121["string-literal?"]
  local keep = _g121.keep
  local write_file = _g121["write-file"]
  local iterate = _g121.iterate
  local table63 = _g121["table?"]
  local unstash = _g121.unstash
  local sublist = _g121.sublist
  local _37 = _g121["%"]
  local reduce = _g121.reduce
  local inner = _g121.inner
  local parse_number = _g121["parse-number"]
  local _37message_handler = _g121["%message-handler"]
  local list63 = _g121["list?"]
  local _43 = _g121["+"]
  local _6261 = _g121[">="]
  local _ = _g121["-"]
  local id_literal63 = _g121["id-literal?"]
  local add = _g121.add
  local reverse = _g121.reverse
  local join = _g121.join
  local _42 = _g121["*"]
  local is63 = _g121["is?"]
  local keys63 = _g121["keys?"]
  local boolean63 = _g121["boolean?"]
  local nil63 = _g121["nil?"]
  local _47 = _g121["/"]
  local exit = _g121.exit
  local sub = _g121.sub
  local replicate = _g121.replicate
  local find = _g121.find
  local composite63 = _g121["composite?"]
  local _61 = _g121["="]
  local _62 = _g121[">"]
  local map = _g121.map
  local function63 = _g121["function?"]
  local last = _g121.last
  local to_string = _g121["to-string"]
  local substring = _g121.substring
  local split = _g121.split
  local drop = _g121.drop
  local code = _g121.code
  local cat = _g121.cat
  local make_id = _g121["make-id"]
  local number63 = _g121["number?"]
  local pairwise = _g121.pairwise
  local apply = _g121.apply
  local string63 = _g121["string?"]
  local some63 = _g121["some?"]
  local empty63 = _g121["empty?"]
  local _60 = _g121["<"]
  local stash = _g121.stash
  local atom63 = _g121["atom?"]
  local read_file = _g121["read-file"]
  local _g122 = nexus.utilities
  local indentation = _g122.indentation
  local module_key = _g122["module-key"]
  local special63 = _g122["special?"]
  local bind = _g122.bind
  local bind42 = _g122["bind*"]
  local to_id = _g122["to-id"]
  local symbol63 = _g122["symbol?"]
  local macroexpand = _g122.macroexpand
  local stash42 = _g122["stash*"]
  local macro_function = _g122["macro-function"]
  local valid_id63 = _g122["valid-id?"]
  local macro63 = _g122["macro?"]
  local symbol_expansion = _g122["symbol-expansion"]
  local quoted = _g122.quoted
  local getenv = _g122.getenv
  local exported = _g122.exported
  local mapo = _g122.mapo
  local quasiexpand = _g122.quasiexpand
  local quote_modules = _g122["quote-modules"]
  local bound63 = _g122["bound?"]
  local quote_environment = _g122["quote-environment"]
  local variable63 = _g122["variable?"]
  local initial_environment = _g122["initial-environment"]
  local imported = _g122.imported
  local special_form63 = _g122["special-form?"]
  local _g123 = nexus.compiler
  local open_module = _g123["open-module"]
  local eval = _g123.eval
  local compile_body = _g123["compile-body"]
  local load_module = _g123["load-module"]
  local compile_special = _g123["compile-special"]
  local compile = _g123.compile
  local compile_module = _g123["compile-module"]
  local compile_function = _g123["compile-function"]
  local compile_call = _g123["compile-call"]
  local compile_branch = _g123["compile-branch"]
  local in_module = _g123["in-module"]
end)();
(function ()
  local _g232 = nexus.runtime
  local char = _g232.char
  local setenv = _g232.setenv
  local write = _g232.write
  local search = _g232.search
  local splice = _g232.splice
  local exclude = _g232.exclude
  local hd = _g232.hd
  local _6061 = _g232["<="]
  local tl = _g232.tl
  local length = _g232.length
  local extend = _g232.extend
  local string_literal63 = _g232["string-literal?"]
  local keep = _g232.keep
  local write_file = _g232["write-file"]
  local iterate = _g232.iterate
  local table63 = _g232["table?"]
  local unstash = _g232.unstash
  local sublist = _g232.sublist
  local _37 = _g232["%"]
  local reduce = _g232.reduce
  local inner = _g232.inner
  local parse_number = _g232["parse-number"]
  local _37message_handler = _g232["%message-handler"]
  local list63 = _g232["list?"]
  local _43 = _g232["+"]
  local _6261 = _g232[">="]
  local _ = _g232["-"]
  local id_literal63 = _g232["id-literal?"]
  local add = _g232.add
  local reverse = _g232.reverse
  local join = _g232.join
  local _42 = _g232["*"]
  local is63 = _g232["is?"]
  local keys63 = _g232["keys?"]
  local boolean63 = _g232["boolean?"]
  local nil63 = _g232["nil?"]
  local _47 = _g232["/"]
  local exit = _g232.exit
  local sub = _g232.sub
  local replicate = _g232.replicate
  local find = _g232.find
  local composite63 = _g232["composite?"]
  local _61 = _g232["="]
  local _62 = _g232[">"]
  local map = _g232.map
  local function63 = _g232["function?"]
  local last = _g232.last
  local to_string = _g232["to-string"]
  local substring = _g232.substring
  local split = _g232.split
  local drop = _g232.drop
  local code = _g232.code
  local cat = _g232.cat
  local make_id = _g232["make-id"]
  local number63 = _g232["number?"]
  local pairwise = _g232.pairwise
  local apply = _g232.apply
  local string63 = _g232["string?"]
  local some63 = _g232["some?"]
  local empty63 = _g232["empty?"]
  local _60 = _g232["<"]
  local stash = _g232.stash
  local atom63 = _g232["atom?"]
  local read_file = _g232["read-file"]
  local _g233 = nexus.utilities
  local indentation = _g233.indentation
  local module_key = _g233["module-key"]
  local special63 = _g233["special?"]
  local bind = _g233.bind
  local bind42 = _g233["bind*"]
  local to_id = _g233["to-id"]
  local symbol63 = _g233["symbol?"]
  local macroexpand = _g233.macroexpand
  local stash42 = _g233["stash*"]
  local macro_function = _g233["macro-function"]
  local valid_id63 = _g233["valid-id?"]
  local macro63 = _g233["macro?"]
  local symbol_expansion = _g233["symbol-expansion"]
  local quoted = _g233.quoted
  local getenv = _g233.getenv
  local exported = _g233.exported
  local mapo = _g233.mapo
  local quasiexpand = _g233.quasiexpand
  local quote_modules = _g233["quote-modules"]
  local bound63 = _g233["bound?"]
  local quote_environment = _g233["quote-environment"]
  local variable63 = _g233["variable?"]
  local initial_environment = _g233["initial-environment"]
  local imported = _g233.imported
  local special_form63 = _g233["special-form?"]
  local _g234 = nexus.compiler
  local open_module = _g234["open-module"]
  local eval = _g234.eval
  local compile_body = _g234["compile-body"]
  local load_module = _g234["load-module"]
  local compile_special = _g234["compile-special"]
  local compile = _g234.compile
  local compile_module = _g234["compile-module"]
  local compile_function = _g234["compile-function"]
  local compile_call = _g234["compile-call"]
  local compile_branch = _g234["compile-branch"]
  local in_module = _g234["in-module"]
  target = "lua"
end)();
(function ()
  local _g383 = nexus.runtime
  local char = _g383.char
  local setenv = _g383.setenv
  local write = _g383.write
  local search = _g383.search
  local splice = _g383.splice
  local exclude = _g383.exclude
  local hd = _g383.hd
  local _6061 = _g383["<="]
  local tl = _g383.tl
  local length = _g383.length
  local extend = _g383.extend
  local string_literal63 = _g383["string-literal?"]
  local keep = _g383.keep
  local write_file = _g383["write-file"]
  local iterate = _g383.iterate
  local table63 = _g383["table?"]
  local unstash = _g383.unstash
  local sublist = _g383.sublist
  local _37 = _g383["%"]
  local reduce = _g383.reduce
  local inner = _g383.inner
  local parse_number = _g383["parse-number"]
  local _37message_handler = _g383["%message-handler"]
  local list63 = _g383["list?"]
  local _43 = _g383["+"]
  local _6261 = _g383[">="]
  local _ = _g383["-"]
  local id_literal63 = _g383["id-literal?"]
  local add = _g383.add
  local reverse = _g383.reverse
  local join = _g383.join
  local _42 = _g383["*"]
  local is63 = _g383["is?"]
  local keys63 = _g383["keys?"]
  local boolean63 = _g383["boolean?"]
  local nil63 = _g383["nil?"]
  local _47 = _g383["/"]
  local exit = _g383.exit
  local sub = _g383.sub
  local replicate = _g383.replicate
  local find = _g383.find
  local composite63 = _g383["composite?"]
  local _61 = _g383["="]
  local _62 = _g383[">"]
  local map = _g383.map
  local function63 = _g383["function?"]
  local last = _g383.last
  local to_string = _g383["to-string"]
  local substring = _g383.substring
  local split = _g383.split
  local drop = _g383.drop
  local code = _g383.code
  local cat = _g383.cat
  local make_id = _g383["make-id"]
  local number63 = _g383["number?"]
  local pairwise = _g383.pairwise
  local apply = _g383.apply
  local string63 = _g383["string?"]
  local some63 = _g383["some?"]
  local empty63 = _g383["empty?"]
  local _60 = _g383["<"]
  local stash = _g383.stash
  local atom63 = _g383["atom?"]
  local read_file = _g383["read-file"]
  local _g384 = nexus.utilities
  local indentation = _g384.indentation
  local module_key = _g384["module-key"]
  local special63 = _g384["special?"]
  local bind = _g384.bind
  local bind42 = _g384["bind*"]
  local to_id = _g384["to-id"]
  local symbol63 = _g384["symbol?"]
  local macroexpand = _g384.macroexpand
  local stash42 = _g384["stash*"]
  local macro_function = _g384["macro-function"]
  local valid_id63 = _g384["valid-id?"]
  local macro63 = _g384["macro?"]
  local symbol_expansion = _g384["symbol-expansion"]
  local quoted = _g384.quoted
  local getenv = _g384.getenv
  local exported = _g384.exported
  local mapo = _g384.mapo
  local quasiexpand = _g384.quasiexpand
  local quote_modules = _g384["quote-modules"]
  local bound63 = _g384["bound?"]
  local quote_environment = _g384["quote-environment"]
  local variable63 = _g384["variable?"]
  local initial_environment = _g384["initial-environment"]
  local imported = _g384.imported
  local special_form63 = _g384["special-form?"]
  local _g385 = nexus.compiler
  local open_module = _g385["open-module"]
  local eval = _g385.eval
  local compile_body = _g385["compile-body"]
  local load_module = _g385["load-module"]
  local compile_special = _g385["compile-special"]
  local compile = _g385.compile
  local compile_module = _g385["compile-module"]
  local compile_function = _g385["compile-function"]
  local compile_call = _g385["compile-call"]
  local compile_branch = _g385["compile-branch"]
  local in_module = _g385["in-module"]
  modules = {special = {export = {["%try"] = {special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g392 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g392)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g393 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g393)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, tr = true, stmt = true, module = "special", export = true}, ["do"] = {special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, tr = true, stmt = true, module = "special", export = true}, ["not"] = {special = function (_g394)
    local x = _g394[1]
    local _g395 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g395 .. ")"))
  end, module = "special", export = true}, ["set"] = {special = function (_g396)
    local lh = _g396[1]
    local rh = _g396[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, module = "special", stmt = true, export = true}, ["%local"] = {special = function (_g397)
    local name = _g397[1]
    local value = _g397[2]
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
  end, module = "special", stmt = true, export = true}, ["break"] = {special = function (_g120)
    return((indentation() .. "break"))
  end, module = "special", stmt = true, export = true}, ["%array"] = {special = function (forms)
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
    local _g398 = forms
    local i = 0
    while (i < length(_g398)) do
      local x = _g398[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special", export = true}, ["get"] = {special = function (_g399)
    local t = _g399[1]
    local k = _g399[2]
    local _g400 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g400, 0) == "{")) then
      _g400 = ("(" .. _g400 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g400 .. "." .. inner(k)))
    else
      return((_g400 .. "[" .. k1 .. "]"))
    end
  end, module = "special", export = true}, ["return"] = {special = function (_g401)
    local x = _g401[1]
    local _g402 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g402))
  end, module = "special", stmt = true, export = true}, ["while"] = {special = function (_g403)
    local condition = _g403[1]
    local body = sub(_g403, 1)
    local _g404 = compile(condition)
    local _g405 = (function ()
      indent_level = (indent_level + 1)
      local _g406 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g406)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g404 .. ") {\n" .. _g405 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g404 .. " do\n" .. _g405 .. ind .. "end\n"))
    end
  end, tr = true, stmt = true, module = "special", export = true}, ["error"] = {special = function (_g407)
    local x = _g407[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, module = "special", stmt = true, export = true}, ["%object"] = {special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g408 = pairs
    local i = 0
    while (i < length(_g408)) do
      local _g409 = _g408[(i + 1)]
      local k = _g409[1]
      local v = _g409[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g410 = compile(v)
      local _g411 = (function ()
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
      str = (str .. _g411 .. sep .. _g410)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special", export = true}, ["if"] = {special = function (form, tail63)
    local str = ""
    local _g412 = form
    local i = 0
    while (i < length(_g412)) do
      local condition = _g412[(i + 1)]
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
  end, tr = true, stmt = true, module = "special", export = true}, ["%local-function"] = {special = function (_g413)
    local name = _g413[1]
    local args = _g413[2]
    local body = sub(_g413, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, tr = true, stmt = true, module = "special", export = true}, ["%global-function"] = {special = function (_g414)
    local name = _g414[1]
    local args = _g414[2]
    local body = sub(_g414, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, tr = true, stmt = true, module = "special", export = true}, ["%for"] = {special = function (_g415)
    local _g416 = _g415[1]
    local t = _g416[1]
    local k = _g416[2]
    local body = sub(_g415, 1)
    local _g417 = compile(t)
    local ind = indentation()
    local _g418 = (function ()
      indent_level = (indent_level + 1)
      local _g419 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g419)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g417 .. " do\n" .. _g418 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g417 .. ") {\n" .. _g418 .. ind .. "}\n"))
    end
  end, tr = true, stmt = true, module = "special", export = true}, ["%function"] = {special = function (_g420)
    local args = _g420[1]
    local body = sub(_g420, 1)
    return(compile_function(args, body))
  end, module = "special", export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, runtime = {export = {char = {module = "runtime", export = true, variable = true}, ["list?"] = {module = "runtime", export = true, variable = true}, write = {module = "runtime", export = true, variable = true}, reverse = {module = "runtime", export = true, variable = true}, ["<="] = {module = "runtime", export = true, variable = true}, exclude = {module = "runtime", export = true, variable = true}, pairwise = {module = "runtime", export = true, variable = true}, length = {module = "runtime", export = true, variable = true}, join = {module = "runtime", export = true, variable = true}, ["boolean?"] = {module = "runtime", export = true, variable = true}, extend = {module = "runtime", export = true, variable = true}, ["string-literal?"] = {module = "runtime", export = true, variable = true}, keep = {module = "runtime", export = true, variable = true}, ["write-file"] = {module = "runtime", export = true, variable = true}, iterate = {module = "runtime", export = true, variable = true}, ["table?"] = {module = "runtime", export = true, variable = true}, code = {module = "runtime", export = true, variable = true}, sublist = {module = "runtime", export = true, variable = true}, ["%"] = {module = "runtime", export = true, variable = true}, ["<"] = {module = "runtime", export = true, variable = true}, inner = {module = "runtime", export = true, variable = true}, unstash = {module = "runtime", export = true, variable = true}, hd = {module = "runtime", export = true, variable = true}, substring = {module = "runtime", export = true, variable = true}, ["+"] = {module = "runtime", export = true, variable = true}, [">="] = {module = "runtime", export = true, variable = true}, ["-"] = {module = "runtime", export = true, variable = true}, map = {module = "runtime", export = true, variable = true}, ["composite?"] = {module = "runtime", export = true, variable = true}, sub = {module = "runtime", export = true, variable = true}, tl = {module = "runtime", export = true, variable = true}, search = {module = "runtime", export = true, variable = true}, ["is?"] = {module = "runtime", export = true, variable = true}, ["keys?"] = {module = "runtime", export = true, variable = true}, ["id-literal?"] = {module = "runtime", export = true, variable = true}, ["*"] = {module = "runtime", export = true, variable = true}, ["/"] = {module = "runtime", export = true, variable = true}, exit = {module = "runtime", export = true, variable = true}, add = {module = "runtime", export = true, variable = true}, replicate = {module = "runtime", export = true, variable = true}, find = {module = "runtime", export = true, variable = true}, ["read-file"] = {module = "runtime", export = true, variable = true}, ["="] = {module = "runtime", export = true, variable = true}, [">"] = {module = "runtime", export = true, variable = true}, reduce = {module = "runtime", export = true, variable = true}, ["function?"] = {module = "runtime", export = true, variable = true}, last = {module = "runtime", export = true, variable = true}, ["to-string"] = {module = "runtime", export = true, variable = true}, ["atom?"] = {module = "runtime", export = true, variable = true}, split = {module = "runtime", export = true, variable = true}, drop = {module = "runtime", export = true, variable = true}, cat = {module = "runtime", export = true, variable = true}, setenv = {module = "runtime", export = true, variable = true}, ["make-id"] = {module = "runtime", export = true, variable = true}, ["number?"] = {module = "runtime", export = true, variable = true}, ["parse-number"] = {module = "runtime", export = true, variable = true}, ["nil?"] = {module = "runtime", export = true, variable = true}, ["string?"] = {module = "runtime", export = true, variable = true}, ["some?"] = {module = "runtime", export = true, variable = true}, splice = {module = "runtime", export = true, variable = true}, ["empty?"] = {module = "runtime", export = true, variable = true}, stash = {module = "runtime", export = true, variable = true}, ["%message-handler"] = {module = "runtime", export = true, variable = true}, apply = {module = "runtime", export = true, variable = true}}, import = {"special", "core"}}, reader = {export = {["read-from-string"] = {module = "reader", export = true, variable = true}, read = {module = "reader", export = true, variable = true}, ["make-stream"] = {module = "reader", export = true, variable = true}, ["define-reader"] = {module = "reader", macro = function (_g421, ...)
    local char = _g421[1]
    local stream = _g421[2]
    local body = unstash({...})
    local _g422 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g422)}))
  end, export = true}, ["read-table"] = {module = "reader", export = true, variable = true}, ["read-all"] = {module = "reader", export = true, variable = true}}, import = {"runtime", "special", "core"}}, core = {export = {["with-bindings"] = {module = "core", macro = function (_g423, ...)
    local names = _g423[1]
    local body = unstash({...})
    local _g424 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g425 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g426 = {"setenv", x}
        _g426.variable = true
        return(_g426)
      end)())})}
      _g425.scope = true
      return(_g425)
    end)(), _g424))
  end, export = true}, ["define*"] = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g427 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g427)) then
      local _g428 = bind42(x, _g427)
      local args = _g428[1]
      local _g429 = _g428[2]
      return(join({"%global-function", name, args}, _g429))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true}, inc = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true}, ["define-special"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g430 = sub(body, 0)
    local form = join({"fn", args}, _g430)
    local keys = sub(_g430, length(_g430))
    eval(join((function ()
      local _g431 = {"setenv", join({"quote", name})}
      _g431.special = form
      _g431.form = join({"quote", form})
      return(_g431)
    end)(), keys))
    return(nil)
  end, export = true}, define = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g432 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g432)) then
      local _g433 = bind42(x, _g432)
      local args = _g433[1]
      local _g434 = _g433[2]
      return(join({"%local-function", name, args}, _g434))
    else
      return(join({"%local", name, x}))
    end
  end, export = true}, ["join*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true}, ["let-symbol"] = {module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g435 = sub(body, 0)
    add(environment, {})
    local _g436 = (function ()
      map(function (_g437)
        local name = _g437[1]
        local exp = _g437[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g435)))
    end)()
    drop(environment)
    return(_g436)
  end, export = true}, ["define-macro"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g438 = sub(body, 0)
    local form = join({"fn", args}, _g438)
    eval(join((function ()
      local _g439 = {"setenv", join({"quote", name})}
      _g439.macro = form
      _g439.form = join({"quote", form})
      return(_g439)
    end)()))
    return(nil)
  end, export = true}, each = {module = "core", macro = function (b, t, ...)
    local body = unstash({...})
    local _g440 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g440), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g441 = {"target"}
          _g441.lua = join({"not", join({"number?", k})})
          _g441.js = join({"isNaN", join({"parseInt", k})})
          return(_g441)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g440)})})}))
      end
    end)()}))
  end, export = true}, let = {module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g442 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g443)
      local lh = _g443[1]
      local rh = _g443[2]
      local _g444 = bind(lh, rh)
      local _g445 = 0
      while (_g445 < length(_g444)) do
        local _g446 = _g444[(_g445 + 1)]
        local id = _g446[1]
        local val = _g446[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g445 = (_g445 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g442)})))
  end, export = true}, ["define-symbol"] = {module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, table = {module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g231, x)
      return(x)
    end, body)))
  end, export = true}, dec = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true}, quasiquote = {module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, language = {module = "core", macro = function ()
    return(join({"quote", target}))
  end, export = true}, ["let-macro"] = {module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g447 = sub(body, 0)
    add(environment, {})
    local _g448 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g447)))
    end)()
    drop(environment)
    return(_g448)
  end, export = true}, guard = {module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true}, pr = {module = "core", macro = function (...)
    local xs = unstash({...})
    local _g449 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g449)}))
  end, export = true}, at = {module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true}, target = {module = "core", global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true}, list = {module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g450 = body
      local k = nil
      for k in next, _g450 do
        if (not number63(k)) then
          local v = _g450[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true}, quote = {module = "core", macro = function (form)
    return(quoted(form))
  end, export = true}, ["cat!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g451 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g451)}))
  end, export = true}, ["set-of"] = {module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g452 = elements
    local _g453 = 0
    while (_g453 < length(_g452)) do
      local e = _g452[(_g453 + 1)]
      l[e] = true
      _g453 = (_g453 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, fn = {module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g454 = sub(body, 0)
    local _g455 = bind42(args, _g454)
    local _g456 = _g455[1]
    local _g457 = _g455[2]
    return(join({"%function", _g456}, _g457))
  end, export = true}, ["list*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g458 = xs
      local i = 0
      while (i < length(_g458)) do
        local x = _g458[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true}, ["with-frame"] = {module = "core", macro = function (...)
    local body = unstash({...})
    local _g459 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g460 = {"table"}
      _g460._scope = scope
      return(_g460)
    end)())}), join({"let", join({x, join({"do"}, _g459)}), join({"drop", "environment"}), x})}))
  end, export = true}, ["join!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g461 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g461)}))
  end, export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, utilities = {export = {indentation = {module = "utilities", export = true, variable = true}, ["module-key"] = {module = "utilities", export = true, variable = true}, ["macro?"] = {module = "utilities", export = true, variable = true}, bind = {module = "utilities", export = true, variable = true}, ["indent-level"] = {module = "utilities", global = true, export = true}, ["bind*"] = {module = "utilities", export = true, variable = true}, ["to-id"] = {module = "utilities", export = true, variable = true}, ["symbol?"] = {module = "utilities", export = true, variable = true}, ["with-indent"] = {module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, export = true}, ["macro-function"] = {module = "utilities", export = true, variable = true}, ["stash*"] = {module = "utilities", export = true, variable = true}, ["symbol-expansion"] = {module = "utilities", export = true, variable = true}, ["special?"] = {module = "utilities", export = true, variable = true}, imported = {module = "utilities", export = true, variable = true}, macroexpand = {module = "utilities", export = true, variable = true}, quoted = {module = "utilities", export = true, variable = true}, getenv = {module = "utilities", export = true, variable = true}, exported = {module = "utilities", export = true, variable = true}, ["special-form?"] = {module = "utilities", export = true, variable = true}, quasiexpand = {module = "utilities", export = true, variable = true}, ["quote-modules"] = {module = "utilities", export = true, variable = true}, ["bound?"] = {module = "utilities", export = true, variable = true}, ["quote-environment"] = {module = "utilities", export = true, variable = true}, ["variable?"] = {module = "utilities", export = true, variable = true}, ["initial-environment"] = {module = "utilities", export = true, variable = true}, ["valid-id?"] = {module = "utilities", export = true, variable = true}, mapo = {module = "utilities", export = true, variable = true}}, import = {"runtime", "special", "core"}}, boot = {export = {}, import = {"runtime", "utilities", "special", "core", "compiler"}}, lib = {export = {}, import = {"core", "special"}}, compiler = {export = {["open-module"] = {module = "compiler", export = true, variable = true}, eval = {module = "compiler", export = true, variable = true}, ["compile-body"] = {module = "compiler", export = true, variable = true}, ["%result"] = {module = "compiler", global = true, export = true}, ["compile-call"] = {module = "compiler", export = true, variable = true}, ["compile-branch"] = {module = "compiler", export = true, variable = true}, ["current-module"] = {module = "compiler", global = true, export = true}, ["compile-special"] = {module = "compiler", export = true, variable = true}, ["load-module"] = {module = "compiler", export = true, variable = true}, ["compile-module"] = {module = "compiler", export = true, variable = true}, ["compile-function"] = {module = "compiler", export = true, variable = true}, ["in-module"] = {module = "compiler", export = true, variable = true}, ["define-module"] = {module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g462 = sub(body, 0)
    local imports = {}
    local imp = _g462.import
    local exp = _g462.export
    local _g463 = (imp or {})
    local _g464 = 0
    while (_g464 < length(_g463)) do
      local k = _g463[(_g464 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g464 = (_g464 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g465 = (exp or {})
    local _g466 = 0
    while (_g466 < length(_g465)) do
      local k = _g465[(_g466 + 1)]
      setenv(k, {_stash = true, export = true})
      _g466 = (_g466 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, compile = {module = "compiler", export = true, variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, system = {export = {nexus = {module = "system", global = true, export = true}}, import = {"special", "core"}}}
  environment = {{["define-module"] = {module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g467 = sub(body, 0)
    local imports = {}
    local imp = _g467.import
    local exp = _g467.export
    local _g468 = (imp or {})
    local _g469 = 0
    while (_g469 < length(_g468)) do
      local k = _g468[(_g469 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g469 = (_g469 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g470 = (exp or {})
    local _g471 = 0
    while (_g471 < length(_g470)) do
      local k = _g470[(_g471 + 1)]
      setenv(k, {_stash = true, export = true})
      _g471 = (_g471 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g36 = nexus.runtime
  local char = _g36.char
  local setenv = _g36.setenv
  local write = _g36.write
  local search = _g36.search
  local splice = _g36.splice
  local exclude = _g36.exclude
  local hd = _g36.hd
  local _6061 = _g36["<="]
  local tl = _g36.tl
  local length = _g36.length
  local extend = _g36.extend
  local string_literal63 = _g36["string-literal?"]
  local keep = _g36.keep
  local write_file = _g36["write-file"]
  local iterate = _g36.iterate
  local table63 = _g36["table?"]
  local unstash = _g36.unstash
  local sublist = _g36.sublist
  local _37 = _g36["%"]
  local reduce = _g36.reduce
  local inner = _g36.inner
  local parse_number = _g36["parse-number"]
  local _37message_handler = _g36["%message-handler"]
  local list63 = _g36["list?"]
  local _43 = _g36["+"]
  local _6261 = _g36[">="]
  local _ = _g36["-"]
  local id_literal63 = _g36["id-literal?"]
  local add = _g36.add
  local reverse = _g36.reverse
  local join = _g36.join
  local _42 = _g36["*"]
  local is63 = _g36["is?"]
  local keys63 = _g36["keys?"]
  local boolean63 = _g36["boolean?"]
  local nil63 = _g36["nil?"]
  local _47 = _g36["/"]
  local exit = _g36.exit
  local sub = _g36.sub
  local replicate = _g36.replicate
  local find = _g36.find
  local composite63 = _g36["composite?"]
  local _61 = _g36["="]
  local _62 = _g36[">"]
  local map = _g36.map
  local function63 = _g36["function?"]
  local last = _g36.last
  local to_string = _g36["to-string"]
  local substring = _g36.substring
  local split = _g36.split
  local drop = _g36.drop
  local code = _g36.code
  local cat = _g36.cat
  local make_id = _g36["make-id"]
  local number63 = _g36["number?"]
  local pairwise = _g36.pairwise
  local apply = _g36.apply
  local string63 = _g36["string?"]
  local some63 = _g36["some?"]
  local empty63 = _g36["empty?"]
  local _60 = _g36["<"]
  local stash = _g36.stash
  local atom63 = _g36["atom?"]
  local read_file = _g36["read-file"]
  local _g74 = nexus.utilities
  local indentation = _g74.indentation
  local module_key = _g74["module-key"]
  local special63 = _g74["special?"]
  local bind = _g74.bind
  local bind42 = _g74["bind*"]
  local to_id = _g74["to-id"]
  local symbol63 = _g74["symbol?"]
  local macroexpand = _g74.macroexpand
  local stash42 = _g74["stash*"]
  local macro_function = _g74["macro-function"]
  local valid_id63 = _g74["valid-id?"]
  local macro63 = _g74["macro?"]
  local symbol_expansion = _g74["symbol-expansion"]
  local quoted = _g74.quoted
  local getenv = _g74.getenv
  local exported = _g74.exported
  local mapo = _g74.mapo
  local quasiexpand = _g74.quasiexpand
  local quote_modules = _g74["quote-modules"]
  local bound63 = _g74["bound?"]
  local quote_environment = _g74["quote-environment"]
  local variable63 = _g74["variable?"]
  local initial_environment = _g74["initial-environment"]
  local imported = _g74.imported
  local special_form63 = _g74["special-form?"]
  local _g82 = nexus.reader
  local read_from_string = _g82["read-from-string"]
  local make_stream = _g82["make-stream"]
  local read = _g82.read
  local read_table = _g82["read-table"]
  local read_all = _g82["read-all"]
  local _g119 = nexus.compiler
  local open_module = _g119["open-module"]
  local eval = _g119.eval
  local compile_body = _g119["compile-body"]
  local load_module = _g119["load-module"]
  local compile_special = _g119["compile-special"]
  local compile = _g119.compile
  local compile_module = _g119["compile-module"]
  local compile_function = _g119["compile-function"]
  local compile_call = _g119["compile-call"]
  local compile_branch = _g119["compile-branch"]
  local in_module = _g119["in-module"]
  local function rep(str)
    local _g473 = (function ()
      local _g474,_g475 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g474, _g475})
    end)()
    local _g1 = _g473[1]
    local x = _g473[2]
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
    local _g476 = args
    local i = 0
    while (i < length(_g476)) do
      local arg = _g476[(i + 1)]
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
  return(main())
end)();
