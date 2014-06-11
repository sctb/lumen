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
  _g35.inner = inner
  _g35.find = find
  _g35["string?"] = string63
  _g35["table?"] = table63
  _g35["some?"] = some63
  _g35.sublist = sublist
  _g35.drop = drop
  _g35.reduce = reduce
  _g35["list?"] = list63
  _g35["is?"] = is63
  _g35["make-id"] = make_id
  _g35.exclude = exclude
  _g35.exit = exit
  _g35[">="] = _6261
  _g35["function?"] = function63
  _g35["keys?"] = keys63
  _g35["%message-handler"] = _37message_handler
  _g35.apply = apply
  _g35["to-string"] = to_string
  _g35["nil?"] = nil63
  _g35["parse-number"] = parse_number
  _g35.write = write
  _g35.char = char
  _g35["="] = _61
  _g35[">"] = _62
  _g35.sub = sub
  _g35.search = search
  _g35["<="] = _6061
  _g35["%"] = _37
  _g35["<"] = _60
  _g35["*"] = _42
  _g35.map = map
  _g35["/"] = _47
  _g35["-"] = _
  _g35.stash = stash
  _g35["+"] = _43
  _g35.cat = cat
  _g35.split = split
  _g35["read-file"] = read_file
  _g35.extend = extend
  _g35["composite?"] = composite63
  _g35["boolean?"] = boolean63
  _g35.setenv = setenv
  _g35.unstash = unstash
  _g35.splice = splice
  _g35.replicate = replicate
  _g35["atom?"] = atom63
  _g35["id-literal?"] = id_literal63
  _g35.iterate = iterate
  _g35.substring = substring
  _g35.pairwise = pairwise
  _g35.keep = keep
  _g35.last = last
  _g35.join = join
  _g35.reverse = reverse
  _g35["empty?"] = empty63
  _g35.code = code
  _g35.add = add
  _g35["string-literal?"] = string_literal63
  _g35["write-file"] = write_file
  _g35.tl = tl
  _g35.hd = hd
  _g35.length = length
  _g35["number?"] = number63
end)();
(function ()
  local _g42 = nexus.runtime
  local inner = _g42.inner
  local _42 = _g42["*"]
  local find = _g42.find
  local splice = _g42.splice
  local _37 = _g42["%"]
  local string63 = _g42["string?"]
  local nil63 = _g42["nil?"]
  local iterate = _g42.iterate
  local table63 = _g42["table?"]
  local map = _g42.map
  local _47 = _g42["/"]
  local hd = _g42.hd
  local _ = _g42["-"]
  local some63 = _g42["some?"]
  local _43 = _g42["+"]
  local make_id = _g42["make-id"]
  local stash = _g42.stash
  local read_file = _g42["read-file"]
  local to_string = _g42["to-string"]
  local drop = _g42.drop
  local sublist = _g42.sublist
  local composite63 = _g42["composite?"]
  local parse_number = _g42["parse-number"]
  local unstash = _g42.unstash
  local list63 = _g42["list?"]
  local sub = _g42.sub
  local is63 = _g42["is?"]
  local _37message_handler = _g42["%message-handler"]
  local replicate = _g42.replicate
  local atom63 = _g42["atom?"]
  local id_literal63 = _g42["id-literal?"]
  local keys63 = _g42["keys?"]
  local substring = _g42.substring
  local keep = _g42.keep
  local exclude = _g42.exclude
  local exit = _g42.exit
  local last = _g42.last
  local search = _g42.search
  local reduce = _g42.reduce
  local extend = _g42.extend
  local join = _g42.join
  local length = _g42.length
  local _6261 = _g42[">="]
  local empty63 = _g42["empty?"]
  local _6061 = _g42["<="]
  local code = _g42.code
  local function63 = _g42["function?"]
  local string_literal63 = _g42["string-literal?"]
  local pairwise = _g42.pairwise
  local boolean63 = _g42["boolean?"]
  local write = _g42.write
  local tl = _g42.tl
  local split = _g42.split
  local add = _g42.add
  local _62 = _g42[">"]
  local cat = _g42.cat
  local number63 = _g42["number?"]
  local char = _g42.char
  local reverse = _g42.reverse
  local setenv = _g42.setenv
  local _61 = _g42["="]
  local apply = _g42.apply
  local write_file = _g42["write-file"]
  local _60 = _g42["<"]
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
  local reserved = {["true"] = true, ["delete"] = true, ["nil"] = true, ["%"] = true, ["if"] = true, ["for"] = true, ["return"] = true, ["in"] = true, ["throw"] = true, ["instanceof"] = true, ["typeof"] = true, ["catch"] = true, ["repeat"] = true, ["try"] = true, ["="] = true, ["/"] = true, ["-"] = true, [">="] = true, ["+"] = true, ["<="] = true, ["while"] = true, ["continue"] = true, ["new"] = true, ["debugger"] = true, ["default"] = true, ["then"] = true, ["function"] = true, ["until"] = true, ["false"] = true, ["elseif"] = true, ["local"] = true, ["not"] = true, ["with"] = true, ["else"] = true, ["case"] = true, ["or"] = true, ["this"] = true, ["end"] = true, ["finally"] = true, ["and"] = true, ["void"] = true, ["var"] = true, ["<"] = true, ["=="] = true, ["switch"] = true, ["do"] = true, ["break"] = true, [">"] = true, ["*"] = true}
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
    local _g69 = hd(environment)
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
      return(join({"do", join({"%local", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  local function imported(spec)
    local m = module(spec)
    local k = module_key(spec)
    local x = nexus[k]
    if (x and keys63(x)) then
      local imports = {}
      local id = make_id()
      add(imports, join({"%local", id, join({"get", "nexus", join({"quote", k})})}))
      local _g70 = x
      local _g71 = nil
      for _g71 in next, _g70 do
        if (not number63(_g71)) then
          local _g40 = _g70[_g71]
          add(imports, join({"%local", _g71, join({"get", id, join({"quote", _g71})})}))
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
    local _g72 = t
    local k = nil
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
    return(join({"%object"}, mapo(function (_g41, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g73 = {"table"}
      _g73.export = quote_frame(m.export)
      _g73.import = quoted(m.import)
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
  _g74["quote-modules"] = quote_modules
  _g74["variable?"] = variable63
  _g74.quasiexpand = quasiexpand
  _g74["bind*"] = bind42
  _g74.quoted = quoted
  _g74["special?"] = special63
  _g74.bind = bind
  _g74["macro-function"] = macro_function
  _g74.indentation = indentation
  _g74["initial-environment"] = initial_environment
  _g74["quote-environment"] = quote_environment
  _g74.mapo = mapo
  _g74.exported = exported
  _g74.imported = imported
  _g74.module = module
  _g74["to-id"] = to_id
  _g74["valid-id?"] = valid_id63
  _g74["module-key"] = module_key
  _g74.macroexpand = macroexpand
  _g74["symbol-expansion"] = symbol_expansion
  _g74["symbol?"] = symbol63
  _g74["bound?"] = bound63
  _g74["special-form?"] = special_form63
  _g74["toplevel?"] = toplevel63
  _g74["macro?"] = macro63
  _g74.getenv = getenv
  _g74["stash*"] = stash42
end)();
(function ()
  local _g76 = nexus.runtime
  local inner = _g76.inner
  local _42 = _g76["*"]
  local find = _g76.find
  local splice = _g76.splice
  local _37 = _g76["%"]
  local string63 = _g76["string?"]
  local nil63 = _g76["nil?"]
  local iterate = _g76.iterate
  local table63 = _g76["table?"]
  local map = _g76.map
  local _47 = _g76["/"]
  local hd = _g76.hd
  local _ = _g76["-"]
  local some63 = _g76["some?"]
  local _43 = _g76["+"]
  local make_id = _g76["make-id"]
  local stash = _g76.stash
  local read_file = _g76["read-file"]
  local to_string = _g76["to-string"]
  local drop = _g76.drop
  local sublist = _g76.sublist
  local composite63 = _g76["composite?"]
  local parse_number = _g76["parse-number"]
  local unstash = _g76.unstash
  local list63 = _g76["list?"]
  local sub = _g76.sub
  local is63 = _g76["is?"]
  local _37message_handler = _g76["%message-handler"]
  local replicate = _g76.replicate
  local atom63 = _g76["atom?"]
  local id_literal63 = _g76["id-literal?"]
  local keys63 = _g76["keys?"]
  local substring = _g76.substring
  local keep = _g76.keep
  local exclude = _g76.exclude
  local exit = _g76.exit
  local last = _g76.last
  local search = _g76.search
  local reduce = _g76.reduce
  local extend = _g76.extend
  local join = _g76.join
  local length = _g76.length
  local _6261 = _g76[">="]
  local empty63 = _g76["empty?"]
  local _6061 = _g76["<="]
  local code = _g76.code
  local function63 = _g76["function?"]
  local string_literal63 = _g76["string-literal?"]
  local pairwise = _g76.pairwise
  local boolean63 = _g76["boolean?"]
  local write = _g76.write
  local tl = _g76.tl
  local split = _g76.split
  local add = _g76.add
  local _62 = _g76[">"]
  local cat = _g76.cat
  local number63 = _g76["number?"]
  local char = _g76.char
  local reverse = _g76.reverse
  local setenv = _g76.setenv
  local _61 = _g76["="]
  local apply = _g76.apply
  local write_file = _g76["write-file"]
  local _60 = _g76["<"]
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  local function make_stream(str)
    return({string = str, pos = 0, len = length(str)})
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
  local _g83 = {}
  nexus.reader = _g83
  _g83["read-all"] = read_all
  _g83["read-from-string"] = read_from_string
  _g83["read-table"] = read_table
  _g83["make-stream"] = make_stream
  _g83.read = read
end)();
(function ()
  local _g85 = nexus.runtime
  local inner = _g85.inner
  local _42 = _g85["*"]
  local find = _g85.find
  local splice = _g85.splice
  local _37 = _g85["%"]
  local string63 = _g85["string?"]
  local nil63 = _g85["nil?"]
  local iterate = _g85.iterate
  local table63 = _g85["table?"]
  local map = _g85.map
  local _47 = _g85["/"]
  local hd = _g85.hd
  local _ = _g85["-"]
  local some63 = _g85["some?"]
  local _43 = _g85["+"]
  local make_id = _g85["make-id"]
  local stash = _g85.stash
  local read_file = _g85["read-file"]
  local to_string = _g85["to-string"]
  local drop = _g85.drop
  local sublist = _g85.sublist
  local composite63 = _g85["composite?"]
  local parse_number = _g85["parse-number"]
  local unstash = _g85.unstash
  local list63 = _g85["list?"]
  local sub = _g85.sub
  local is63 = _g85["is?"]
  local _37message_handler = _g85["%message-handler"]
  local replicate = _g85.replicate
  local atom63 = _g85["atom?"]
  local id_literal63 = _g85["id-literal?"]
  local keys63 = _g85["keys?"]
  local substring = _g85.substring
  local keep = _g85.keep
  local exclude = _g85.exclude
  local exit = _g85.exit
  local last = _g85.last
  local search = _g85.search
  local reduce = _g85.reduce
  local extend = _g85.extend
  local join = _g85.join
  local length = _g85.length
  local _6261 = _g85[">="]
  local empty63 = _g85["empty?"]
  local _6061 = _g85["<="]
  local code = _g85.code
  local function63 = _g85["function?"]
  local string_literal63 = _g85["string-literal?"]
  local pairwise = _g85.pairwise
  local boolean63 = _g85["boolean?"]
  local write = _g85.write
  local tl = _g85.tl
  local split = _g85.split
  local add = _g85.add
  local _62 = _g85[">"]
  local cat = _g85.cat
  local number63 = _g85["number?"]
  local char = _g85.char
  local reverse = _g85.reverse
  local setenv = _g85.setenv
  local _61 = _g85["="]
  local apply = _g85.apply
  local write_file = _g85["write-file"]
  local _60 = _g85["<"]
  local _g86 = nexus.utilities
  local symbol_expansion = _g86["symbol-expansion"]
  local initial_environment = _g86["initial-environment"]
  local quasiexpand = _g86.quasiexpand
  local bind42 = _g86["bind*"]
  local symbol63 = _g86["symbol?"]
  local bind = _g86.bind
  local bound63 = _g86["bound?"]
  local module = _g86.module
  local exported = _g86.exported
  local mapo = _g86.mapo
  local imported = _g86.imported
  local getenv = _g86.getenv
  local indentation = _g86.indentation
  local stash42 = _g86["stash*"]
  local to_id = _g86["to-id"]
  local variable63 = _g86["variable?"]
  local toplevel63 = _g86["toplevel?"]
  local quoted = _g86.quoted
  local macro_function = _g86["macro-function"]
  local special_form63 = _g86["special-form?"]
  local special63 = _g86["special?"]
  local valid_id63 = _g86["valid-id?"]
  local macroexpand = _g86.macroexpand
  local module_key = _g86["module-key"]
  local macro63 = _g86["macro?"]
  local quote_environment = _g86["quote-environment"]
  local quote_modules = _g86["quote-modules"]
  local _g87 = nexus.reader
  local read = _g87.read
  local read_from_string = _g87["read-from-string"]
  local read_all = _g87["read-all"]
  local make_stream = _g87["make-stream"]
  local read_table = _g87["read-table"]
  local infix = {lua = {["~="] = true, ["or"] = true, ["="] = "==", ["and"] = true, cat = ".."}, js = {["~="] = "!=", ["or"] = "||", ["="] = "===", ["and"] = "&&", cat = "+"}, common = {["*"] = true, ["%"] = true, ["<="] = true, [">="] = true, ["/"] = true, ["-"] = true, [">"] = true, ["+"] = true, ["<"] = true}}
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
    local _g88 = args
    local i = 0
    while (i < length(_g88)) do
      local arg = _g88[(i + 1)]
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
    local _g89 = unstash({...})
    local tail = _g89.tail
    local str = ""
    local _g90 = forms
    local i = 0
    while (i < length(_g90)) do
      local x = _g90[(i + 1)]
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
    local _g91 = getenv(hd(form))
    local self_tr63 = _g91.tr
    local stmt = _g91.stmt
    local special = _g91.special
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
  local function compile_infix(_g92)
    local op = _g92[1]
    local args = sub(_g92, 1)
    local str = "("
    local _g93 = getop(op)
    local _g94 = args
    local i = 0
    while (i < length(_g94)) do
      local arg = _g94[(i + 1)]
      if ((_g93 == "-") and (length(args) == 1)) then
        str = (str .. _g93 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g93 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g95 = (function ()
      indent_level = (indent_level + 1)
      local _g96 = compile(body, {_stash = true, tail = tail63, stmt = true})
      indent_level = (indent_level - 1)
      return(_g96)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g95 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g95 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g95 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g95 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g95 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g95 .. tr))
    end
  end
  local function compile_function(args, body, ...)
    local _g97 = unstash({...})
    local name = _g97.name
    local prefix = _g97.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g98 = (prefix or "")
    local _g99 = compile_args(args)
    local _g100 = (function ()
      indent_level = (indent_level + 1)
      local _g101 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g101)
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
      return(("function " .. id .. _g99 .. " {\n" .. _g100 .. ind .. "}" .. tr))
    else
      return((_g98 .. "function " .. id .. _g99 .. "\n" .. _g100 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g102 = unstash({...})
    local stmt = _g102.stmt
    local tail = _g102.tail
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
      local _g103 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g103 .. tr))
    end
  end
  current_module = nil
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g104 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g104, {epilog}))}))
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
    local _g105 = toplevel
    local name = nil
    for name in next, _g105 do
      if (not number63(name)) then
        local binding = _g105[name]
        if (binding.module == k) then
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
  local function open_module(spec, ...)
    local _g106 = unstash({...})
    local all = _g106.all
    local m = module(spec)
    local frame = last(environment)
    local _g107 = m.export
    local k = nil
    for k in next, _g107 do
      if (not number63(k)) then
        local v = _g107[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g108 = unstash({...})
    local all = _g108.all
    if (nil63(module(spec)) or (compilation_level == 1)) then
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
  local _g109 = {}
  nexus.compiler = _g109
  _g109["compile-special"] = compile_special
  _g109.eval = eval
  _g109["compile-function"] = compile_function
  _g109["open-module"] = open_module
  _g109.compile = compile
  _g109["compile-call"] = compile_call
  _g109["compile-module"] = compile_module
  _g109["in-module"] = in_module
  _g109["load-module"] = load_module
  _g109["compile-branch"] = compile_branch
  _g109["compile-body"] = compile_body
end)();
(function ()
  local _g112 = nexus.runtime
  local inner = _g112.inner
  local _42 = _g112["*"]
  local find = _g112.find
  local splice = _g112.splice
  local _37 = _g112["%"]
  local string63 = _g112["string?"]
  local nil63 = _g112["nil?"]
  local iterate = _g112.iterate
  local table63 = _g112["table?"]
  local map = _g112.map
  local _47 = _g112["/"]
  local hd = _g112.hd
  local _ = _g112["-"]
  local some63 = _g112["some?"]
  local _43 = _g112["+"]
  local make_id = _g112["make-id"]
  local stash = _g112.stash
  local read_file = _g112["read-file"]
  local to_string = _g112["to-string"]
  local drop = _g112.drop
  local sublist = _g112.sublist
  local composite63 = _g112["composite?"]
  local parse_number = _g112["parse-number"]
  local unstash = _g112.unstash
  local list63 = _g112["list?"]
  local sub = _g112.sub
  local is63 = _g112["is?"]
  local _37message_handler = _g112["%message-handler"]
  local replicate = _g112.replicate
  local atom63 = _g112["atom?"]
  local id_literal63 = _g112["id-literal?"]
  local keys63 = _g112["keys?"]
  local substring = _g112.substring
  local keep = _g112.keep
  local exclude = _g112.exclude
  local exit = _g112.exit
  local last = _g112.last
  local search = _g112.search
  local reduce = _g112.reduce
  local extend = _g112.extend
  local join = _g112.join
  local length = _g112.length
  local _6261 = _g112[">="]
  local empty63 = _g112["empty?"]
  local _6061 = _g112["<="]
  local code = _g112.code
  local function63 = _g112["function?"]
  local string_literal63 = _g112["string-literal?"]
  local pairwise = _g112.pairwise
  local boolean63 = _g112["boolean?"]
  local write = _g112.write
  local tl = _g112.tl
  local split = _g112.split
  local add = _g112.add
  local _62 = _g112[">"]
  local cat = _g112.cat
  local number63 = _g112["number?"]
  local char = _g112.char
  local reverse = _g112.reverse
  local setenv = _g112.setenv
  local _61 = _g112["="]
  local apply = _g112.apply
  local write_file = _g112["write-file"]
  local _60 = _g112["<"]
  local _g113 = nexus.utilities
  local symbol_expansion = _g113["symbol-expansion"]
  local initial_environment = _g113["initial-environment"]
  local quasiexpand = _g113.quasiexpand
  local bind42 = _g113["bind*"]
  local symbol63 = _g113["symbol?"]
  local bind = _g113.bind
  local bound63 = _g113["bound?"]
  local module = _g113.module
  local exported = _g113.exported
  local mapo = _g113.mapo
  local imported = _g113.imported
  local getenv = _g113.getenv
  local indentation = _g113.indentation
  local stash42 = _g113["stash*"]
  local to_id = _g113["to-id"]
  local variable63 = _g113["variable?"]
  local toplevel63 = _g113["toplevel?"]
  local quoted = _g113.quoted
  local macro_function = _g113["macro-function"]
  local special_form63 = _g113["special-form?"]
  local special63 = _g113["special?"]
  local valid_id63 = _g113["valid-id?"]
  local macroexpand = _g113.macroexpand
  local module_key = _g113["module-key"]
  local macro63 = _g113["macro?"]
  local quote_environment = _g113["quote-environment"]
  local quote_modules = _g113["quote-modules"]
  local _g114 = nexus.compiler
  local compile = _g114.compile
  local compile_special = _g114["compile-special"]
  local compile_branch = _g114["compile-branch"]
  local compile_function = _g114["compile-function"]
  local compile_body = _g114["compile-body"]
  local in_module = _g114["in-module"]
  local load_module = _g114["load-module"]
  local open_module = _g114["open-module"]
  local compile_module = _g114["compile-module"]
  local compile_call = _g114["compile-call"]
  local eval = _g114.eval
end)();
(function ()
  local _g249 = nexus.runtime
  local inner = _g249.inner
  local _42 = _g249["*"]
  local find = _g249.find
  local splice = _g249.splice
  local _37 = _g249["%"]
  local string63 = _g249["string?"]
  local nil63 = _g249["nil?"]
  local iterate = _g249.iterate
  local table63 = _g249["table?"]
  local map = _g249.map
  local _47 = _g249["/"]
  local hd = _g249.hd
  local _ = _g249["-"]
  local some63 = _g249["some?"]
  local _43 = _g249["+"]
  local make_id = _g249["make-id"]
  local stash = _g249.stash
  local read_file = _g249["read-file"]
  local to_string = _g249["to-string"]
  local drop = _g249.drop
  local sublist = _g249.sublist
  local composite63 = _g249["composite?"]
  local parse_number = _g249["parse-number"]
  local unstash = _g249.unstash
  local list63 = _g249["list?"]
  local sub = _g249.sub
  local is63 = _g249["is?"]
  local _37message_handler = _g249["%message-handler"]
  local replicate = _g249.replicate
  local atom63 = _g249["atom?"]
  local id_literal63 = _g249["id-literal?"]
  local keys63 = _g249["keys?"]
  local substring = _g249.substring
  local keep = _g249.keep
  local exclude = _g249.exclude
  local exit = _g249.exit
  local last = _g249.last
  local search = _g249.search
  local reduce = _g249.reduce
  local extend = _g249.extend
  local join = _g249.join
  local length = _g249.length
  local _6261 = _g249[">="]
  local empty63 = _g249["empty?"]
  local _6061 = _g249["<="]
  local code = _g249.code
  local function63 = _g249["function?"]
  local string_literal63 = _g249["string-literal?"]
  local pairwise = _g249.pairwise
  local boolean63 = _g249["boolean?"]
  local write = _g249.write
  local tl = _g249.tl
  local split = _g249.split
  local add = _g249.add
  local _62 = _g249[">"]
  local cat = _g249.cat
  local number63 = _g249["number?"]
  local char = _g249.char
  local reverse = _g249.reverse
  local setenv = _g249.setenv
  local _61 = _g249["="]
  local apply = _g249.apply
  local write_file = _g249["write-file"]
  local _60 = _g249["<"]
  local _g250 = nexus.utilities
  local symbol_expansion = _g250["symbol-expansion"]
  local initial_environment = _g250["initial-environment"]
  local quasiexpand = _g250.quasiexpand
  local bind42 = _g250["bind*"]
  local symbol63 = _g250["symbol?"]
  local bind = _g250.bind
  local bound63 = _g250["bound?"]
  local module = _g250.module
  local exported = _g250.exported
  local mapo = _g250.mapo
  local imported = _g250.imported
  local getenv = _g250.getenv
  local indentation = _g250.indentation
  local stash42 = _g250["stash*"]
  local to_id = _g250["to-id"]
  local variable63 = _g250["variable?"]
  local toplevel63 = _g250["toplevel?"]
  local quoted = _g250.quoted
  local macro_function = _g250["macro-function"]
  local special_form63 = _g250["special-form?"]
  local special63 = _g250["special?"]
  local valid_id63 = _g250["valid-id?"]
  local macroexpand = _g250.macroexpand
  local module_key = _g250["module-key"]
  local macro63 = _g250["macro?"]
  local quote_environment = _g250["quote-environment"]
  local quote_modules = _g250["quote-modules"]
  local _g251 = nexus.compiler
  local compile = _g251.compile
  local compile_special = _g251["compile-special"]
  local compile_branch = _g251["compile-branch"]
  local compile_function = _g251["compile-function"]
  local compile_body = _g251["compile-body"]
  local in_module = _g251["in-module"]
  local load_module = _g251["load-module"]
  local open_module = _g251["open-module"]
  local compile_module = _g251["compile-module"]
  local compile_call = _g251["compile-call"]
  local eval = _g251.eval
  target = "lua"
end)();
(function ()
  local _g440 = nexus.runtime
  local inner = _g440.inner
  local _42 = _g440["*"]
  local find = _g440.find
  local splice = _g440.splice
  local _37 = _g440["%"]
  local string63 = _g440["string?"]
  local nil63 = _g440["nil?"]
  local iterate = _g440.iterate
  local table63 = _g440["table?"]
  local map = _g440.map
  local _47 = _g440["/"]
  local hd = _g440.hd
  local _ = _g440["-"]
  local some63 = _g440["some?"]
  local _43 = _g440["+"]
  local make_id = _g440["make-id"]
  local stash = _g440.stash
  local read_file = _g440["read-file"]
  local to_string = _g440["to-string"]
  local drop = _g440.drop
  local sublist = _g440.sublist
  local composite63 = _g440["composite?"]
  local parse_number = _g440["parse-number"]
  local unstash = _g440.unstash
  local list63 = _g440["list?"]
  local sub = _g440.sub
  local is63 = _g440["is?"]
  local _37message_handler = _g440["%message-handler"]
  local replicate = _g440.replicate
  local atom63 = _g440["atom?"]
  local id_literal63 = _g440["id-literal?"]
  local keys63 = _g440["keys?"]
  local substring = _g440.substring
  local keep = _g440.keep
  local exclude = _g440.exclude
  local exit = _g440.exit
  local last = _g440.last
  local search = _g440.search
  local reduce = _g440.reduce
  local extend = _g440.extend
  local join = _g440.join
  local length = _g440.length
  local _6261 = _g440[">="]
  local empty63 = _g440["empty?"]
  local _6061 = _g440["<="]
  local code = _g440.code
  local function63 = _g440["function?"]
  local string_literal63 = _g440["string-literal?"]
  local pairwise = _g440.pairwise
  local boolean63 = _g440["boolean?"]
  local write = _g440.write
  local tl = _g440.tl
  local split = _g440.split
  local add = _g440.add
  local _62 = _g440[">"]
  local cat = _g440.cat
  local number63 = _g440["number?"]
  local char = _g440.char
  local reverse = _g440.reverse
  local setenv = _g440.setenv
  local _61 = _g440["="]
  local apply = _g440.apply
  local write_file = _g440["write-file"]
  local _60 = _g440["<"]
  local _g441 = nexus.utilities
  local symbol_expansion = _g441["symbol-expansion"]
  local initial_environment = _g441["initial-environment"]
  local quasiexpand = _g441.quasiexpand
  local bind42 = _g441["bind*"]
  local symbol63 = _g441["symbol?"]
  local bind = _g441.bind
  local bound63 = _g441["bound?"]
  local module = _g441.module
  local exported = _g441.exported
  local mapo = _g441.mapo
  local imported = _g441.imported
  local getenv = _g441.getenv
  local indentation = _g441.indentation
  local stash42 = _g441["stash*"]
  local to_id = _g441["to-id"]
  local variable63 = _g441["variable?"]
  local toplevel63 = _g441["toplevel?"]
  local quoted = _g441.quoted
  local macro_function = _g441["macro-function"]
  local special_form63 = _g441["special-form?"]
  local special63 = _g441["special?"]
  local valid_id63 = _g441["valid-id?"]
  local macroexpand = _g441.macroexpand
  local module_key = _g441["module-key"]
  local macro63 = _g441["macro?"]
  local quote_environment = _g441["quote-environment"]
  local quote_modules = _g441["quote-modules"]
  local _g442 = nexus.compiler
  local compile = _g442.compile
  local compile_special = _g442["compile-special"]
  local compile_branch = _g442["compile-branch"]
  local compile_function = _g442["compile-function"]
  local compile_body = _g442["compile-body"]
  local in_module = _g442["in-module"]
  local load_module = _g442["load-module"]
  local open_module = _g442["open-module"]
  local compile_module = _g442["compile-module"]
  local compile_call = _g442["compile-call"]
  local eval = _g442.eval
  modules = {special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["error"] = {module = "special", stmt = true, export = true, special = function (_g449)
    local x = _g449[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end}, ["set"] = {module = "special", stmt = true, export = true, special = function (_g450)
    local lh = _g450[1]
    local rh = _g450[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end}, ["%for"] = {module = "special", stmt = true, export = true, special = function (_g451)
    local _g452 = _g451[1]
    local t = _g452[1]
    local k = _g452[2]
    local body = sub(_g451, 1)
    local _g453 = compile(t)
    local ind = indentation()
    local _g454 = (function ()
      indent_level = (indent_level + 1)
      local _g455 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g455)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g453 .. " do\n" .. _g454 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g453 .. ") {\n" .. _g454 .. ind .. "}\n"))
    end
  end, tr = true}, ["while"] = {module = "special", stmt = true, export = true, special = function (_g456)
    local condition = _g456[1]
    local body = sub(_g456, 1)
    local _g457 = compile(condition)
    local _g458 = (function ()
      indent_level = (indent_level + 1)
      local _g459 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g459)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g457 .. ") {\n" .. _g458 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g457 .. " do\n" .. _g458 .. ind .. "end\n"))
    end
  end, tr = true}, ["do"] = {module = "special", stmt = true, export = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, tr = true}, ["not"] = {module = "special", export = true, special = function (_g460)
    local x = _g460[1]
    local _g461 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g461 .. ")"))
  end}, ["%local-function"] = {module = "special", stmt = true, export = true, special = function (_g462)
    local name = _g462[1]
    local args = _g462[2]
    local body = sub(_g462, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, tr = true}, ["%array"] = {module = "special", export = true, special = function (forms)
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
    local _g463 = forms
    local i = 0
    while (i < length(_g463)) do
      local x = _g463[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["return"] = {module = "special", stmt = true, export = true, special = function (_g464)
    local x = _g464[1]
    local _g465 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g465))
  end}, ["%object"] = {module = "special", export = true, special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g466 = pairs
    local i = 0
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
  end}, ["%try"] = {module = "special", stmt = true, export = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g470 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g470)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g471 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g471)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, tr = true}, ["break"] = {module = "special", stmt = true, export = true, special = function (_g111)
    return((indentation() .. "break"))
  end}, ["%global-function"] = {module = "special", stmt = true, export = true, special = function (_g472)
    local name = _g472[1]
    local args = _g472[2]
    local body = sub(_g472, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, tr = true}, ["%function"] = {module = "special", export = true, special = function (_g473)
    local args = _g473[1]
    local body = sub(_g473, 1)
    return(compile_function(args, body))
  end}, ["if"] = {module = "special", stmt = true, export = true, special = function (form, tail63)
    local str = ""
    local _g474 = form
    local i = 0
    while (i < length(_g474)) do
      local condition = _g474[(i + 1)]
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
  end, tr = true}, ["%local"] = {module = "special", stmt = true, export = true, special = function (_g475)
    local name = _g475[1]
    local value = _g475[2]
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
  end}, ["get"] = {module = "special", export = true, special = function (_g476)
    local t = _g476[1]
    local k = _g476[2]
    local _g477 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g477, 0) == "{")) then
      _g477 = ("(" .. _g477 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g477 .. "." .. inner(k)))
    else
      return((_g477 .. "[" .. k1 .. "]"))
    end
  end}}}, runtime = {import = {"special", "core"}, export = {inner = {module = "runtime", export = true, variable = true}, find = {module = "runtime", export = true, variable = true}, unstash = {module = "runtime", export = true, variable = true}, ["table?"] = {module = "runtime", export = true, variable = true}, splice = {module = "runtime", export = true, variable = true}, ["some?"] = {module = "runtime", export = true, variable = true}, ["to-string"] = {module = "runtime", export = true, variable = true}, drop = {module = "runtime", export = true, variable = true}, reduce = {module = "runtime", export = true, variable = true}, ["list?"] = {module = "runtime", export = true, variable = true}, ["is?"] = {module = "runtime", export = true, variable = true}, ["%message-handler"] = {module = "runtime", export = true, variable = true}, mapl = {module = "runtime", variable = true}, exclude = {module = "runtime", export = true, variable = true}, exit = {module = "runtime", export = true, variable = true}, search = {module = "runtime", export = true, variable = true}, [">="] = {module = "runtime", export = true, variable = true}, ["<="] = {module = "runtime", export = true, variable = true}, ["keys?"] = {module = "runtime", export = true, variable = true}, reverse = {module = "runtime", export = true, variable = true}, write = {module = "runtime", export = true, variable = true}, ["id-count"] = {module = "runtime", variable = true}, ["nil?"] = {module = "runtime", export = true, variable = true}, char = {module = "runtime", export = true, variable = true}, setenv = {module = "runtime", export = true, variable = true}, ["="] = {module = "runtime", export = true, variable = true}, apply = {module = "runtime", export = true, variable = true}, sub = {module = "runtime", export = true, variable = true}, ["*"] = {module = "runtime", export = true, variable = true}, ["splice?"] = {module = "runtime", variable = true}, iterate = {module = "runtime", export = true, variable = true}, map = {module = "runtime", export = true, variable = true}, ["/"] = {module = "runtime", export = true, variable = true}, ["-"] = {module = "runtime", export = true, variable = true}, stash = {module = "runtime", export = true, variable = true}, ["+"] = {module = "runtime", export = true, variable = true}, ["read-file"] = {module = "runtime", export = true, variable = true}, ["composite?"] = {module = "runtime", export = true, variable = true}, ["boolean?"] = {module = "runtime", export = true, variable = true}, ["atom?"] = {module = "runtime", export = true, variable = true}, ["id-literal?"] = {module = "runtime", export = true, variable = true}, substring = {module = "runtime", export = true, variable = true}, last = {module = "runtime", export = true, variable = true}, ["parse-number"] = {module = "runtime", export = true, variable = true}, length = {module = "runtime", export = true, variable = true}, extend = {module = "runtime", export = true, variable = true}, ["empty?"] = {module = "runtime", export = true, variable = true}, split = {module = "runtime", export = true, variable = true}, code = {module = "runtime", export = true, variable = true}, hd = {module = "runtime", export = true, variable = true}, ["string-literal?"] = {module = "runtime", export = true, variable = true}, pairwise = {module = "runtime", export = true, variable = true}, ["<"] = {module = "runtime", export = true, variable = true}, ["write-file"] = {module = "runtime", export = true, variable = true}, tl = {module = "runtime", export = true, variable = true}, ["%"] = {module = "runtime", export = true, variable = true}, add = {module = "runtime", export = true, variable = true}, ["string?"] = {module = "runtime", export = true, variable = true}, sublist = {module = "runtime", export = true, variable = true}, ["number?"] = {module = "runtime", export = true, variable = true}, join = {module = "runtime", export = true, variable = true}, ["make-id"] = {module = "runtime", export = true, variable = true}, cat = {module = "runtime", export = true, variable = true}, keep = {module = "runtime", export = true, variable = true}, replicate = {module = "runtime", export = true, variable = true}, ["function?"] = {module = "runtime", export = true, variable = true}, [">"] = {module = "runtime", export = true, variable = true}}}, lib = {import = {"core", "special"}, export = {}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["join*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true}, each = {module = "core", macro = function (b, t, ...)
    local body = unstash({...})
    local _g478 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g478), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g479 = {"target"}
          _g479.js = join({"isNaN", join({"parseInt", k})})
          _g479.lua = join({"not", join({"number?", k})})
          return(_g479)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g478)})})}))
      end
    end)()}))
  end, export = true}, define = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g480 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g480)) then
      local _g481 = bind42(x, _g480)
      local args = _g481[1]
      local _g482 = _g481[2]
      return(join({"%local-function", name, args}, _g482))
    else
      return(join({"%local", name, x}))
    end
  end, export = true}, ["set-of"] = {module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g483 = elements
    local _g484 = 0
    while (_g484 < length(_g483)) do
      local e = _g483[(_g484 + 1)]
      l[e] = true
      _g484 = (_g484 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, target = {module = "core", global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["define-special"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g485 = sub(body, 0)
    local form = join({"fn", args}, _g485)
    local keys = sub(_g485, length(_g485))
    eval(join((function ()
      local _g486 = {"setenv", join({"quote", name})}
      _g486.form = join({"quote", form})
      _g486.special = form
      return(_g486)
    end)(), keys))
    return(nil)
  end, export = true}, ["let-symbol"] = {module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g487 = sub(body, 0)
    add(environment, {})
    local _g488 = (function ()
      map(function (_g489)
        local name = _g489[1]
        local exp = _g489[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g487)))
    end)()
    drop(environment)
    return(_g488)
  end, export = true}, language = {module = "core", macro = function ()
    return(join({"quote", target}))
  end, export = true}, table = {module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g248, x)
      return(x)
    end, body)))
  end, export = true}, ["define-macro"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g490 = sub(body, 0)
    local form = join({"fn", args}, _g490)
    eval(join((function ()
      local _g491 = {"setenv", join({"quote", name})}
      _g491.form = join({"quote", form})
      _g491.macro = form
      return(_g491)
    end)()))
    return(nil)
  end, export = true}, ["define*"] = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g492 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g492)) then
      local _g493 = bind42(x, _g492)
      local args = _g493[1]
      local _g494 = _g493[2]
      return(join({"%global-function", name, args}, _g494))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true}, ["join!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g495 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g495)}))
  end, export = true}, quote = {module = "core", macro = function (form)
    return(quoted(form))
  end, export = true}, pr = {module = "core", macro = function (...)
    local xs = unstash({...})
    local _g496 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g496)}))
  end, export = true}, list = {module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g497 = body
      local k = nil
      for k in next, _g497 do
        if (not number63(k)) then
          local v = _g497[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true}, at = {module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true}, dec = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true}, ["with-bindings"] = {module = "core", macro = function (_g498, ...)
    local names = _g498[1]
    local body = unstash({...})
    local _g499 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g500 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g501 = {"setenv", x}
        _g501.variable = true
        return(_g501)
      end)())})}
      _g500.scope = true
      return(_g500)
    end)(), _g499))
  end, export = true}, ["let-macro"] = {module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g502 = sub(body, 0)
    add(environment, {})
    local _g503 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g502)))
    end)()
    drop(environment)
    return(_g503)
  end, export = true}, ["with-frame"] = {module = "core", macro = function (...)
    local body = unstash({...})
    local _g504 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g505 = {"table"}
      _g505._scope = scope
      return(_g505)
    end)())}), join({"let", join({x, join({"do"}, _g504)}), join({"drop", "environment"}), x})}))
  end, export = true}, guard = {module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true}, quasiquote = {module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["list*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g506 = xs
      local i = 0
      while (i < length(_g506)) do
        local x = _g506[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true}, let = {module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g507 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g508)
      local lh = _g508[1]
      local rh = _g508[2]
      local _g509 = bind(lh, rh)
      local _g510 = 0
      while (_g510 < length(_g509)) do
        local _g511 = _g509[(_g510 + 1)]
        local id = _g511[1]
        local val = _g511[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g510 = (_g510 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g507)})))
  end, export = true}, ["cat!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g512 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g512)}))
  end, export = true}, inc = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true}, fn = {module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g513 = sub(body, 0)
    local _g514 = bind42(args, _g513)
    local _g515 = _g514[1]
    local _g516 = _g514[2]
    return(join({"%function", _g515}, _g516))
  end, export = true}, ["define-module"] = {module = "core", macro = function (spec, ...)
    local body = unstash({...})
    local _g517 = sub(body, 0)
    local imports = {}
    local imp = _g517.import
    local exp = _g517.export
    local _g518 = (imp or {})
    local _g519 = 0
    while (_g519 < length(_g518)) do
      local k = _g518[(_g519 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g519 = (_g519 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g520 = (exp or {})
    local _g521 = 0
    while (_g521 < length(_g520)) do
      local k = _g520[(_g521 + 1)]
      setenv(k, {_stash = true, export = true})
      _g521 = (_g521 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, ["define-symbol"] = {module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {}}, utilities = {import = {"runtime", "special", "core"}, export = {["numeric?"] = {module = "utilities", variable = true}, ["initial-environment"] = {module = "utilities", export = true, variable = true}, ["quoting?"] = {module = "utilities", variable = true}, bind = {module = "utilities", export = true, variable = true}, ["quasisplice?"] = {module = "utilities", variable = true}, ["quasiquote-list"] = {module = "utilities", variable = true}, ["global?"] = {module = "utilities", variable = true}, ["to-id"] = {module = "utilities", export = true, variable = true}, ["variable?"] = {module = "utilities", export = true, variable = true}, ["quote-frame"] = {module = "utilities", variable = true}, ["macro-function"] = {module = "utilities", export = true, variable = true}, ["special-form?"] = {module = "utilities", export = true, variable = true}, escape = {module = "utilities", variable = true}, ["with-indent"] = {module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, export = true}, ["symbol-expansion"] = {module = "utilities", export = true, variable = true}, ["special?"] = {module = "utilities", export = true, variable = true}, ["quote-environment"] = {module = "utilities", export = true, variable = true}, ["bind*"] = {module = "utilities", export = true, variable = true}, ["quote-module"] = {module = "utilities", variable = true}, ["bound?"] = {module = "utilities", export = true, variable = true}, module = {module = "utilities", export = true, variable = true}, ["toplevel?"] = {module = "utilities", export = true, variable = true}, ["valid-char?"] = {module = "utilities", variable = true}, imported = {module = "utilities", export = true, variable = true}, ["symbol?"] = {module = "utilities", export = true, variable = true}, getenv = {module = "utilities", export = true, variable = true}, ["macro?"] = {module = "utilities", export = true, variable = true}, indentation = {module = "utilities", export = true, variable = true}, ["stash*"] = {module = "utilities", export = true, variable = true}, ["quote-binding"] = {module = "utilities", variable = true}, macroexpand = {module = "utilities", export = true, variable = true}, ["module-key"] = {module = "utilities", export = true, variable = true}, quasiexpand = {module = "utilities", export = true, variable = true}, ["quote-modules"] = {module = "utilities", export = true, variable = true}, ["can-unquote?"] = {module = "utilities", variable = true}, ["quasiquoting?"] = {module = "utilities", variable = true}, ["valid-id?"] = {module = "utilities", export = true, variable = true}, ["indent-level"] = {module = "utilities", global = true, export = true}, quoted = {module = "utilities", export = true, variable = true}, reserved = {module = "utilities", variable = true}, exported = {module = "utilities", export = true, variable = true}, mapo = {module = "utilities", export = true, variable = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["can-return?"] = {module = "compiler", variable = true}, ["compile-function"] = {module = "compiler", export = true, variable = true}, ["%compile-module"] = {module = "compiler", variable = true}, ["in-module"] = {module = "compiler", export = true, variable = true}, prologue = {module = "compiler", variable = true}, infix = {module = "compiler", variable = true}, eval = {module = "compiler", export = true, variable = true}, ["compile-branch"] = {module = "compiler", export = true, variable = true}, ["compile-atom"] = {module = "compiler", variable = true}, run = {module = "compiler", variable = true}, ["compile-call"] = {module = "compiler", export = true, variable = true}, encapsulate = {module = "compiler", variable = true}, ["compile-args"] = {module = "compiler", variable = true}, compile = {module = "compiler", export = true, variable = true}, getop = {module = "compiler", variable = true}, ["compiler-output"] = {module = "compiler", variable = true}, ["%result"] = {module = "compiler", global = true, export = true}, ["compile-module"] = {module = "compiler", export = true, variable = true}, ["compile-body"] = {module = "compiler", export = true, variable = true}, ["current-module"] = {module = "compiler", global = true, export = true}, ["compile-infix"] = {module = "compiler", variable = true}, ["compilation-level"] = {module = "compiler", variable = true}, ["load-module"] = {module = "compiler", export = true, variable = true}, terminator = {module = "compiler", variable = true}, ["module-path"] = {module = "compiler", variable = true}, ["infix?"] = {module = "compiler", variable = true}, ["compile-special"] = {module = "compiler", export = true, variable = true}, ["open-module"] = {module = "compiler", export = true, variable = true}, ["compile-file"] = {module = "compiler", variable = true}}}, reader = {import = {"runtime", "special", "core"}, export = {whitespace = {module = "reader", variable = true}, read = {module = "reader", export = true, variable = true}, ["key?"] = {module = "reader", variable = true}, ["skip-non-code"] = {module = "reader", variable = true}, ["define-reader"] = {module = "reader", macro = function (_g522, ...)
    local char = _g522[1]
    local stream = _g522[2]
    local body = unstash({...})
    local _g523 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g523)}))
  end, export = true}, ["make-stream"] = {module = "reader", export = true, variable = true}, ["read-table"] = {module = "reader", export = true, variable = true}, eof = {module = "reader", variable = true}, ["read-from-string"] = {module = "reader", export = true, variable = true}, delimiters = {module = "reader", variable = true}, ["flag?"] = {module = "reader", variable = true}, ["peek-char"] = {module = "reader", variable = true}, ["read-char"] = {module = "reader", variable = true}, ["read-all"] = {module = "reader", export = true, variable = true}}}, system = {import = {"special", "core"}, export = {nexus = {module = "system", global = true, export = true}}}}
  environment = {{["define-module"] = {module = "core", macro = function (spec, ...)
    local body = unstash({...})
    local _g524 = sub(body, 0)
    local imports = {}
    local imp = _g524.import
    local exp = _g524.export
    local _g525 = (imp or {})
    local _g526 = 0
    while (_g526 < length(_g525)) do
      local k = _g525[(_g526 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g526 = (_g526 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g527 = (exp or {})
    local _g528 = 0
    while (_g528 < length(_g527)) do
      local k = _g527[(_g528 + 1)]
      setenv(k, {_stash = true, export = true})
      _g528 = (_g528 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g36 = nexus.runtime
  local inner = _g36.inner
  local _42 = _g36["*"]
  local find = _g36.find
  local splice = _g36.splice
  local _37 = _g36["%"]
  local string63 = _g36["string?"]
  local nil63 = _g36["nil?"]
  local iterate = _g36.iterate
  local table63 = _g36["table?"]
  local map = _g36.map
  local _47 = _g36["/"]
  local hd = _g36.hd
  local _ = _g36["-"]
  local some63 = _g36["some?"]
  local _43 = _g36["+"]
  local make_id = _g36["make-id"]
  local stash = _g36.stash
  local read_file = _g36["read-file"]
  local to_string = _g36["to-string"]
  local drop = _g36.drop
  local sublist = _g36.sublist
  local composite63 = _g36["composite?"]
  local parse_number = _g36["parse-number"]
  local unstash = _g36.unstash
  local list63 = _g36["list?"]
  local sub = _g36.sub
  local is63 = _g36["is?"]
  local _37message_handler = _g36["%message-handler"]
  local replicate = _g36.replicate
  local atom63 = _g36["atom?"]
  local id_literal63 = _g36["id-literal?"]
  local keys63 = _g36["keys?"]
  local substring = _g36.substring
  local keep = _g36.keep
  local exclude = _g36.exclude
  local exit = _g36.exit
  local last = _g36.last
  local search = _g36.search
  local reduce = _g36.reduce
  local extend = _g36.extend
  local join = _g36.join
  local length = _g36.length
  local _6261 = _g36[">="]
  local empty63 = _g36["empty?"]
  local _6061 = _g36["<="]
  local code = _g36.code
  local function63 = _g36["function?"]
  local string_literal63 = _g36["string-literal?"]
  local pairwise = _g36.pairwise
  local boolean63 = _g36["boolean?"]
  local write = _g36.write
  local tl = _g36.tl
  local split = _g36.split
  local add = _g36.add
  local _62 = _g36[">"]
  local cat = _g36.cat
  local number63 = _g36["number?"]
  local char = _g36.char
  local reverse = _g36.reverse
  local setenv = _g36.setenv
  local _61 = _g36["="]
  local apply = _g36.apply
  local write_file = _g36["write-file"]
  local _60 = _g36["<"]
  local _g75 = nexus.utilities
  local symbol_expansion = _g75["symbol-expansion"]
  local initial_environment = _g75["initial-environment"]
  local quasiexpand = _g75.quasiexpand
  local bind42 = _g75["bind*"]
  local symbol63 = _g75["symbol?"]
  local bind = _g75.bind
  local bound63 = _g75["bound?"]
  local module = _g75.module
  local exported = _g75.exported
  local mapo = _g75.mapo
  local imported = _g75.imported
  local getenv = _g75.getenv
  local indentation = _g75.indentation
  local stash42 = _g75["stash*"]
  local to_id = _g75["to-id"]
  local variable63 = _g75["variable?"]
  local toplevel63 = _g75["toplevel?"]
  local quoted = _g75.quoted
  local macro_function = _g75["macro-function"]
  local special_form63 = _g75["special-form?"]
  local special63 = _g75["special?"]
  local valid_id63 = _g75["valid-id?"]
  local macroexpand = _g75.macroexpand
  local module_key = _g75["module-key"]
  local macro63 = _g75["macro?"]
  local quote_environment = _g75["quote-environment"]
  local quote_modules = _g75["quote-modules"]
  local _g84 = nexus.reader
  local read = _g84.read
  local read_from_string = _g84["read-from-string"]
  local read_all = _g84["read-all"]
  local make_stream = _g84["make-stream"]
  local read_table = _g84["read-table"]
  local _g110 = nexus.compiler
  local compile = _g110.compile
  local compile_special = _g110["compile-special"]
  local compile_branch = _g110["compile-branch"]
  local compile_function = _g110["compile-function"]
  local compile_body = _g110["compile-body"]
  local in_module = _g110["in-module"]
  local load_module = _g110["load-module"]
  local open_module = _g110["open-module"]
  local compile_module = _g110["compile-module"]
  local compile_call = _g110["compile-call"]
  local eval = _g110.eval
  local function rep(str)
    local _g530 = (function ()
      local _g531,_g532 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g531, _g532})
    end)()
    local _g1 = _g530[1]
    local x = _g530[2]
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
    local _g533 = args
    local i = 0
    while (i < length(_g533)) do
      local arg = _g533[(i + 1)]
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
