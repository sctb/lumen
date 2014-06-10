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
  _g35["nil?"] = nil63
  _g35["is?"] = is63
  _g35.length = length
  _g35["empty?"] = empty63
  _g35["some?"] = some63
  _g35.hd = hd
  _g35["string?"] = string63
  _g35["number?"] = number63
  _g35["boolean?"] = boolean63
  _g35["function?"] = function63
  _g35["composite?"] = composite63
  _g35["atom?"] = atom63
  _g35["table?"] = table63
  _g35["list?"] = list63
  _g35.substring = substring
  _g35.sublist = sublist
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
  _g35["keys?"] = keys63
  _g35.stash = stash
  _g35.unstash = unstash
  _g35.setenv = setenv
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
  _g35["make-id"] = make_id
  _g35["%message-handler"] = _37message_handler
end)();
(function ()
  local _g42 = nexus.runtime
  local nil63 = _g42["nil?"]
  local is63 = _g42["is?"]
  local length = _g42.length
  local empty63 = _g42["empty?"]
  local some63 = _g42["some?"]
  local hd = _g42.hd
  local string63 = _g42["string?"]
  local number63 = _g42["number?"]
  local boolean63 = _g42["boolean?"]
  local function63 = _g42["function?"]
  local composite63 = _g42["composite?"]
  local atom63 = _g42["atom?"]
  local table63 = _g42["table?"]
  local list63 = _g42["list?"]
  local substring = _g42.substring
  local sublist = _g42.sublist
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
  local keys63 = _g42["keys?"]
  local stash = _g42.stash
  local unstash = _g42.unstash
  local setenv = _g42.setenv
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
  local write = _g42.write
  local exit = _g42.exit
  local parse_number = _g42["parse-number"]
  local to_string = _g42["to-string"]
  local apply = _g42.apply
  local make_id = _g42["make-id"]
  local _37message_handler = _g42["%message-handler"]
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
      _g72.import = quoted(m.import)
      _g72.export = quote_frame(m.export)
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
  _g73.getenv = getenv
  _g73["macro-function"] = macro_function
  _g73["macro?"] = macro63
  _g73["special?"] = special63
  _g73["special-form?"] = special_form63
  _g73["symbol-expansion"] = symbol_expansion
  _g73["symbol?"] = symbol63
  _g73["variable?"] = variable63
  _g73["bound?"] = bound63
  _g73["toplevel?"] = toplevel63
  _g73.quoted = quoted
  _g73["stash*"] = stash42
  _g73.bind = bind
  _g73["bind*"] = bind42
  _g73.quasiexpand = quasiexpand
  _g73.macroexpand = macroexpand
  _g73.indentation = indentation
  _g73["valid-id?"] = valid_id63
  _g73["to-id"] = to_id
  _g73["module-key"] = module_key
  _g73.module = module
  _g73.imported = imported
  _g73.exported = exported
  _g73.mapo = mapo
  _g73["quote-environment"] = quote_environment
  _g73["quote-modules"] = quote_modules
  _g73["initial-environment"] = initial_environment
end)();
(function ()
  local _g75 = nexus.runtime
  local nil63 = _g75["nil?"]
  local is63 = _g75["is?"]
  local length = _g75.length
  local empty63 = _g75["empty?"]
  local some63 = _g75["some?"]
  local hd = _g75.hd
  local string63 = _g75["string?"]
  local number63 = _g75["number?"]
  local boolean63 = _g75["boolean?"]
  local function63 = _g75["function?"]
  local composite63 = _g75["composite?"]
  local atom63 = _g75["atom?"]
  local table63 = _g75["table?"]
  local list63 = _g75["list?"]
  local substring = _g75.substring
  local sublist = _g75.sublist
  local sub = _g75.sub
  local inner = _g75.inner
  local tl = _g75.tl
  local char = _g75.char
  local code = _g75.code
  local string_literal63 = _g75["string-literal?"]
  local id_literal63 = _g75["id-literal?"]
  local add = _g75.add
  local drop = _g75.drop
  local last = _g75.last
  local reverse = _g75.reverse
  local join = _g75.join
  local reduce = _g75.reduce
  local keep = _g75.keep
  local find = _g75.find
  local pairwise = _g75.pairwise
  local iterate = _g75.iterate
  local replicate = _g75.replicate
  local splice = _g75.splice
  local map = _g75.map
  local keys63 = _g75["keys?"]
  local stash = _g75.stash
  local unstash = _g75.unstash
  local setenv = _g75.setenv
  local extend = _g75.extend
  local exclude = _g75.exclude
  local search = _g75.search
  local split = _g75.split
  local cat = _g75.cat
  local _43 = _g75["+"]
  local _ = _g75["-"]
  local _42 = _g75["*"]
  local _47 = _g75["/"]
  local _37 = _g75["%"]
  local _62 = _g75[">"]
  local _60 = _g75["<"]
  local _61 = _g75["="]
  local _6261 = _g75[">="]
  local _6061 = _g75["<="]
  local read_file = _g75["read-file"]
  local write_file = _g75["write-file"]
  local write = _g75.write
  local exit = _g75.exit
  local parse_number = _g75["parse-number"]
  local to_string = _g75["to-string"]
  local apply = _g75.apply
  local make_id = _g75["make-id"]
  local _37message_handler = _g75["%message-handler"]
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
  local toplevel63 = _g85["toplevel?"]
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
  local module = _g85.module
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
    local _g87 = args
    local i = 0
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
    local tail = _g88.tail
    local str = ""
    local _g89 = forms
    local i = 0
    while (i < length(_g89)) do
      local x = _g89[(i + 1)]
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
    local _g90 = getenv(hd(form))
    local special = _g90.special
    local stmt = _g90.stmt
    local self_tr63 = _g90.tr
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
  local function compile_infix(_g91)
    local op = _g91[1]
    local args = sub(_g91, 1)
    local str = "("
    local _g92 = getop(op)
    local _g93 = args
    local i = 0
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
      local _g95 = compile(body, {_stash = true, stmt = true, tail = tail63})
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
      local _g100 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
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
    local stmt = _g101.stmt
    local tail = _g101.tail
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
    local _g121 = toplevel
    local name = nil
    for name in next, _g121 do
      if (not number63(name)) then
        local binding = _g121[name]
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
    local _g122 = unstash({...})
    local all = _g122.all
    local m = module(spec)
    local frame = last(environment)
    local _g123 = m.export
    local k = nil
    for k in next, _g123 do
      if (not number63(k)) then
        local v = _g123[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g124 = unstash({...})
    local all = _g124.all
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
  local _g125 = {}
  nexus.compiler = _g125
  _g125["compile-body"] = compile_body
  _g125["compile-call"] = compile_call
  _g125["compile-branch"] = compile_branch
  _g125["compile-function"] = compile_function
  _g125["compile-special"] = compile_special
  _g125.compile = compile
  _g125["open-module"] = open_module
  _g125["load-module"] = load_module
  _g125["in-module"] = in_module
  _g125["compile-module"] = compile_module
  _g125.eval = eval
end)();
(function ()
  local _g128 = nexus.runtime
  local nil63 = _g128["nil?"]
  local is63 = _g128["is?"]
  local length = _g128.length
  local empty63 = _g128["empty?"]
  local some63 = _g128["some?"]
  local hd = _g128.hd
  local string63 = _g128["string?"]
  local number63 = _g128["number?"]
  local boolean63 = _g128["boolean?"]
  local function63 = _g128["function?"]
  local composite63 = _g128["composite?"]
  local atom63 = _g128["atom?"]
  local table63 = _g128["table?"]
  local list63 = _g128["list?"]
  local substring = _g128.substring
  local sublist = _g128.sublist
  local sub = _g128.sub
  local inner = _g128.inner
  local tl = _g128.tl
  local char = _g128.char
  local code = _g128.code
  local string_literal63 = _g128["string-literal?"]
  local id_literal63 = _g128["id-literal?"]
  local add = _g128.add
  local drop = _g128.drop
  local last = _g128.last
  local reverse = _g128.reverse
  local join = _g128.join
  local reduce = _g128.reduce
  local keep = _g128.keep
  local find = _g128.find
  local pairwise = _g128.pairwise
  local iterate = _g128.iterate
  local replicate = _g128.replicate
  local splice = _g128.splice
  local map = _g128.map
  local keys63 = _g128["keys?"]
  local stash = _g128.stash
  local unstash = _g128.unstash
  local setenv = _g128.setenv
  local extend = _g128.extend
  local exclude = _g128.exclude
  local search = _g128.search
  local split = _g128.split
  local cat = _g128.cat
  local _43 = _g128["+"]
  local _ = _g128["-"]
  local _42 = _g128["*"]
  local _47 = _g128["/"]
  local _37 = _g128["%"]
  local _62 = _g128[">"]
  local _60 = _g128["<"]
  local _61 = _g128["="]
  local _6261 = _g128[">="]
  local _6061 = _g128["<="]
  local read_file = _g128["read-file"]
  local write_file = _g128["write-file"]
  local write = _g128.write
  local exit = _g128.exit
  local parse_number = _g128["parse-number"]
  local to_string = _g128["to-string"]
  local apply = _g128.apply
  local make_id = _g128["make-id"]
  local _37message_handler = _g128["%message-handler"]
  local _g129 = nexus.utilities
  local getenv = _g129.getenv
  local macro_function = _g129["macro-function"]
  local macro63 = _g129["macro?"]
  local special63 = _g129["special?"]
  local special_form63 = _g129["special-form?"]
  local symbol_expansion = _g129["symbol-expansion"]
  local symbol63 = _g129["symbol?"]
  local variable63 = _g129["variable?"]
  local bound63 = _g129["bound?"]
  local toplevel63 = _g129["toplevel?"]
  local quoted = _g129.quoted
  local stash42 = _g129["stash*"]
  local bind = _g129.bind
  local bind42 = _g129["bind*"]
  local quasiexpand = _g129.quasiexpand
  local macroexpand = _g129.macroexpand
  local indentation = _g129.indentation
  local valid_id63 = _g129["valid-id?"]
  local to_id = _g129["to-id"]
  local module_key = _g129["module-key"]
  local module = _g129.module
  local imported = _g129.imported
  local exported = _g129.exported
  local mapo = _g129.mapo
  local quote_environment = _g129["quote-environment"]
  local quote_modules = _g129["quote-modules"]
  local initial_environment = _g129["initial-environment"]
  local _g130 = nexus.compiler
  local compile_body = _g130["compile-body"]
  local compile_call = _g130["compile-call"]
  local compile_branch = _g130["compile-branch"]
  local compile_function = _g130["compile-function"]
  local compile_special = _g130["compile-special"]
  local compile = _g130.compile
  local open_module = _g130["open-module"]
  local load_module = _g130["load-module"]
  local in_module = _g130["in-module"]
  local compile_module = _g130["compile-module"]
  local eval = _g130.eval
  return
end)();
(function ()
  local _g265 = nexus.runtime
  local nil63 = _g265["nil?"]
  local is63 = _g265["is?"]
  local length = _g265.length
  local empty63 = _g265["empty?"]
  local some63 = _g265["some?"]
  local hd = _g265.hd
  local string63 = _g265["string?"]
  local number63 = _g265["number?"]
  local boolean63 = _g265["boolean?"]
  local function63 = _g265["function?"]
  local composite63 = _g265["composite?"]
  local atom63 = _g265["atom?"]
  local table63 = _g265["table?"]
  local list63 = _g265["list?"]
  local substring = _g265.substring
  local sublist = _g265.sublist
  local sub = _g265.sub
  local inner = _g265.inner
  local tl = _g265.tl
  local char = _g265.char
  local code = _g265.code
  local string_literal63 = _g265["string-literal?"]
  local id_literal63 = _g265["id-literal?"]
  local add = _g265.add
  local drop = _g265.drop
  local last = _g265.last
  local reverse = _g265.reverse
  local join = _g265.join
  local reduce = _g265.reduce
  local keep = _g265.keep
  local find = _g265.find
  local pairwise = _g265.pairwise
  local iterate = _g265.iterate
  local replicate = _g265.replicate
  local splice = _g265.splice
  local map = _g265.map
  local keys63 = _g265["keys?"]
  local stash = _g265.stash
  local unstash = _g265.unstash
  local setenv = _g265.setenv
  local extend = _g265.extend
  local exclude = _g265.exclude
  local search = _g265.search
  local split = _g265.split
  local cat = _g265.cat
  local _43 = _g265["+"]
  local _ = _g265["-"]
  local _42 = _g265["*"]
  local _47 = _g265["/"]
  local _37 = _g265["%"]
  local _62 = _g265[">"]
  local _60 = _g265["<"]
  local _61 = _g265["="]
  local _6261 = _g265[">="]
  local _6061 = _g265["<="]
  local read_file = _g265["read-file"]
  local write_file = _g265["write-file"]
  local write = _g265.write
  local exit = _g265.exit
  local parse_number = _g265["parse-number"]
  local to_string = _g265["to-string"]
  local apply = _g265.apply
  local make_id = _g265["make-id"]
  local _37message_handler = _g265["%message-handler"]
  local _g266 = nexus.utilities
  local getenv = _g266.getenv
  local macro_function = _g266["macro-function"]
  local macro63 = _g266["macro?"]
  local special63 = _g266["special?"]
  local special_form63 = _g266["special-form?"]
  local symbol_expansion = _g266["symbol-expansion"]
  local symbol63 = _g266["symbol?"]
  local variable63 = _g266["variable?"]
  local bound63 = _g266["bound?"]
  local toplevel63 = _g266["toplevel?"]
  local quoted = _g266.quoted
  local stash42 = _g266["stash*"]
  local bind = _g266.bind
  local bind42 = _g266["bind*"]
  local quasiexpand = _g266.quasiexpand
  local macroexpand = _g266.macroexpand
  local indentation = _g266.indentation
  local valid_id63 = _g266["valid-id?"]
  local to_id = _g266["to-id"]
  local module_key = _g266["module-key"]
  local module = _g266.module
  local imported = _g266.imported
  local exported = _g266.exported
  local mapo = _g266.mapo
  local quote_environment = _g266["quote-environment"]
  local quote_modules = _g266["quote-modules"]
  local initial_environment = _g266["initial-environment"]
  local _g267 = nexus.compiler
  local compile_body = _g267["compile-body"]
  local compile_call = _g267["compile-call"]
  local compile_branch = _g267["compile-branch"]
  local compile_function = _g267["compile-function"]
  local compile_special = _g267["compile-special"]
  local compile = _g267.compile
  local open_module = _g267["open-module"]
  local load_module = _g267["load-module"]
  local in_module = _g267["in-module"]
  local compile_module = _g267["compile-module"]
  local eval = _g267.eval
  target = "lua"
  return
end)();
(function ()
  local _g440 = nexus.runtime
  local nil63 = _g440["nil?"]
  local is63 = _g440["is?"]
  local length = _g440.length
  local empty63 = _g440["empty?"]
  local some63 = _g440["some?"]
  local hd = _g440.hd
  local string63 = _g440["string?"]
  local number63 = _g440["number?"]
  local boolean63 = _g440["boolean?"]
  local function63 = _g440["function?"]
  local composite63 = _g440["composite?"]
  local atom63 = _g440["atom?"]
  local table63 = _g440["table?"]
  local list63 = _g440["list?"]
  local substring = _g440.substring
  local sublist = _g440.sublist
  local sub = _g440.sub
  local inner = _g440.inner
  local tl = _g440.tl
  local char = _g440.char
  local code = _g440.code
  local string_literal63 = _g440["string-literal?"]
  local id_literal63 = _g440["id-literal?"]
  local add = _g440.add
  local drop = _g440.drop
  local last = _g440.last
  local reverse = _g440.reverse
  local join = _g440.join
  local reduce = _g440.reduce
  local keep = _g440.keep
  local find = _g440.find
  local pairwise = _g440.pairwise
  local iterate = _g440.iterate
  local replicate = _g440.replicate
  local splice = _g440.splice
  local map = _g440.map
  local keys63 = _g440["keys?"]
  local stash = _g440.stash
  local unstash = _g440.unstash
  local setenv = _g440.setenv
  local extend = _g440.extend
  local exclude = _g440.exclude
  local search = _g440.search
  local split = _g440.split
  local cat = _g440.cat
  local _43 = _g440["+"]
  local _ = _g440["-"]
  local _42 = _g440["*"]
  local _47 = _g440["/"]
  local _37 = _g440["%"]
  local _62 = _g440[">"]
  local _60 = _g440["<"]
  local _61 = _g440["="]
  local _6261 = _g440[">="]
  local _6061 = _g440["<="]
  local read_file = _g440["read-file"]
  local write_file = _g440["write-file"]
  local write = _g440.write
  local exit = _g440.exit
  local parse_number = _g440["parse-number"]
  local to_string = _g440["to-string"]
  local apply = _g440.apply
  local make_id = _g440["make-id"]
  local _37message_handler = _g440["%message-handler"]
  local _g441 = nexus.utilities
  local getenv = _g441.getenv
  local macro_function = _g441["macro-function"]
  local macro63 = _g441["macro?"]
  local special63 = _g441["special?"]
  local special_form63 = _g441["special-form?"]
  local symbol_expansion = _g441["symbol-expansion"]
  local symbol63 = _g441["symbol?"]
  local variable63 = _g441["variable?"]
  local bound63 = _g441["bound?"]
  local toplevel63 = _g441["toplevel?"]
  local quoted = _g441.quoted
  local stash42 = _g441["stash*"]
  local bind = _g441.bind
  local bind42 = _g441["bind*"]
  local quasiexpand = _g441.quasiexpand
  local macroexpand = _g441.macroexpand
  local indentation = _g441.indentation
  local valid_id63 = _g441["valid-id?"]
  local to_id = _g441["to-id"]
  local module_key = _g441["module-key"]
  local module = _g441.module
  local imported = _g441.imported
  local exported = _g441.exported
  local mapo = _g441.mapo
  local quote_environment = _g441["quote-environment"]
  local quote_modules = _g441["quote-modules"]
  local initial_environment = _g441["initial-environment"]
  local _g442 = nexus.compiler
  local compile_body = _g442["compile-body"]
  local compile_call = _g442["compile-call"]
  local compile_branch = _g442["compile-branch"]
  local compile_function = _g442["compile-function"]
  local compile_special = _g442["compile-special"]
  local compile = _g442.compile
  local open_module = _g442["open-module"]
  local load_module = _g442["load-module"]
  local in_module = _g442["in-module"]
  local compile_module = _g442["compile-module"]
  local eval = _g442.eval
  modules = {system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}, lib = {import = {"core", "special"}, export = {}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["define-special"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g449 = sub(body, 0)
    local form = join({"fn", args}, _g449)
    local keys = sub(_g449, length(_g449))
    eval(join((function ()
      local _g450 = {"setenv", join({"quote", name})}
      _g450.special = form
      _g450.form = join({"quote", form})
      return(_g450)
    end)(), keys))
    return(nil)
  end, export = true}, pr = {module = "core", macro = function (...)
    local xs = unstash({...})
    local _g451 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g451)}))
  end, export = true}, ["define-symbol"] = {module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["list*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g452 = xs
      local i = 0
      while (i < length(_g452)) do
        local x = _g452[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true}, dec = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true}, ["cat!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g453 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g453)}))
  end, export = true}, ["with-bindings"] = {module = "core", macro = function (_g454, ...)
    local names = _g454[1]
    local body = unstash({...})
    local _g455 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g456 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g457 = {"setenv", x}
        _g457.variable = true
        return(_g457)
      end)())})}
      _g456.scope = true
      return(_g456)
    end)(), _g455))
  end, export = true}, ["define-macro"] = {module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g458 = sub(body, 0)
    local form = join({"fn", args}, _g458)
    eval(join((function ()
      local _g459 = {"setenv", join({"quote", name})}
      _g459.macro = form
      _g459.form = join({"quote", form})
      return(_g459)
    end)()))
    return(nil)
  end, export = true}, at = {module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true}, let = {module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g460 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g461)
      local lh = _g461[1]
      local rh = _g461[2]
      local _g462 = bind(lh, rh)
      local _g463 = 0
      while (_g463 < length(_g462)) do
        local _g464 = _g462[(_g463 + 1)]
        local id = _g464[1]
        local val = _g464[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g463 = (_g463 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g460)})))
  end, export = true}, fn = {module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g465 = sub(body, 0)
    local _g466 = bind42(args, _g465)
    local _g467 = _g466[1]
    local _g468 = _g466[2]
    return(join({"%function", _g467}, _g468))
  end, export = true}, ["let-symbol"] = {module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g469 = sub(body, 0)
    add(environment, {})
    local _g470 = (function ()
      map(function (_g471)
        local name = _g471[1]
        local exp = _g471[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g469)))
    end)()
    drop(environment)
    return(_g470)
  end, export = true}, ["join*"] = {module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true}, language = {module = "core", macro = function ()
    return(join({"quote", target}))
  end, export = true}, each = {module = "core", macro = function (b, t, ...)
    local body = unstash({...})
    local _g472 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g472), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g473 = {"target"}
          _g473.js = join({"isNaN", join({"parseInt", k})})
          _g473.lua = join({"not", join({"number?", k})})
          return(_g473)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g472)})})}))
      end
    end)()}))
  end, export = true}, inc = {module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true}, define = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g474 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g474)) then
      local _g475 = bind42(x, _g474)
      local args = _g475[1]
      local _g476 = _g475[2]
      return(join({"%local-function", name, args}, _g476))
    else
      return(join({"%local", name, x}))
    end
  end, export = true}, ["let-macro"] = {module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g477 = sub(body, 0)
    add(environment, {})
    local _g478 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g477)))
    end)()
    drop(environment)
    return(_g478)
  end, export = true}, ["set-of"] = {module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g479 = elements
    local _g480 = 0
    while (_g480 < length(_g479)) do
      local e = _g479[(_g480 + 1)]
      l[e] = true
      _g480 = (_g480 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, ["with-frame"] = {module = "core", macro = function (...)
    local body = unstash({...})
    local _g481 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g482 = {"table"}
      _g482._scope = scope
      return(_g482)
    end)())}), join({"let", join({x, join({"do"}, _g481)}), join({"drop", "environment"}), x})}))
  end, export = true}, quote = {module = "core", macro = function (form)
    return(quoted(form))
  end, export = true}, list = {module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g483 = body
      local k = nil
      for k in next, _g483 do
        if (not number63(k)) then
          local v = _g483[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true}, ["define*"] = {module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g484 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g484)) then
      local _g485 = bind42(x, _g484)
      local args = _g485[1]
      local _g486 = _g485[2]
      return(join({"%global-function", name, args}, _g486))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true}, quasiquote = {module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, table = {module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g264, x)
      return(x)
    end, body)))
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core", global = true, export = true}, ["join!"] = {module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g487 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g487)}))
  end, export = true}, guard = {module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%try"] = {special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g488 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g488)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g489 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g489)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, module = "special", tr = true, stmt = true, export = true}, ["%for"] = {special = function (_g490)
    local _g491 = _g490[1]
    local t = _g491[1]
    local k = _g491[2]
    local body = sub(_g490, 1)
    local _g492 = compile(t)
    local ind = indentation()
    local _g493 = (function ()
      indent_level = (indent_level + 1)
      local _g494 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g494)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g492 .. " do\n" .. _g493 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g492 .. ") {\n" .. _g493 .. ind .. "}\n"))
    end
  end, module = "special", tr = true, stmt = true, export = true}, ["error"] = {stmt = true, module = "special", special = function (_g495)
    local x = _g495[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true}, ["not"] = {special = function (_g496)
    local x = _g496[1]
    local _g497 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g497 .. ")"))
  end, module = "special", export = true}, ["do"] = {special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, module = "special", tr = true, stmt = true, export = true}, ["%global-function"] = {special = function (_g498)
    local name = _g498[1]
    local args = _g498[2]
    local body = sub(_g498, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, module = "special", tr = true, stmt = true, export = true}, ["%local-function"] = {special = function (_g499)
    local name = _g499[1]
    local args = _g499[2]
    local body = sub(_g499, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, module = "special", tr = true, stmt = true, export = true}, ["return"] = {stmt = true, module = "special", special = function (_g500)
    local x = _g500[1]
    local _g501 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g501))
  end, export = true}, ["set"] = {stmt = true, module = "special", special = function (_g502)
    local lh = _g502[1]
    local rh = _g502[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true}, ["if"] = {special = function (form, tail63)
    local str = ""
    local _g503 = form
    local i = 0
    while (i < length(_g503)) do
      local condition = _g503[(i + 1)]
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
  end, module = "special", tr = true, stmt = true, export = true}, ["break"] = {stmt = true, module = "special", special = function (_g127)
    return((indentation() .. "break"))
  end, export = true}, ["%object"] = {special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g504 = pairs
    local i = 0
    while (i < length(_g504)) do
      local _g505 = _g504[(i + 1)]
      local k = _g505[1]
      local v = _g505[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g506 = compile(v)
      local _g507 = (function ()
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
      str = (str .. _g507 .. sep .. _g506)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special", export = true}, ["while"] = {special = function (_g508)
    local condition = _g508[1]
    local body = sub(_g508, 1)
    local _g509 = compile(condition)
    local _g510 = (function ()
      indent_level = (indent_level + 1)
      local _g511 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g511)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g509 .. ") {\n" .. _g510 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g509 .. " do\n" .. _g510 .. ind .. "end\n"))
    end
  end, module = "special", tr = true, stmt = true, export = true}, ["%array"] = {special = function (forms)
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
    local _g512 = forms
    local i = 0
    while (i < length(_g512)) do
      local x = _g512[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special", export = true}, ["%function"] = {special = function (_g513)
    local args = _g513[1]
    local body = sub(_g513, 1)
    return(compile_function(args, body))
  end, module = "special", export = true}, ["get"] = {special = function (_g514)
    local t = _g514[1]
    local k = _g514[2]
    local _g515 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g515, 0) == "{")) then
      _g515 = ("(" .. _g515 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g515 .. "." .. inner(k)))
    else
      return((_g515 .. "[" .. k1 .. "]"))
    end
  end, module = "special", export = true}, ["%local"] = {stmt = true, module = "special", special = function (_g516)
    local name = _g516[1]
    local value = _g516[2]
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
  end, export = true}}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, module = "runtime", variable = true}, ["is?"] = {export = true, module = "runtime", variable = true}, length = {export = true, module = "runtime", variable = true}, ["empty?"] = {export = true, module = "runtime", variable = true}, ["some?"] = {export = true, module = "runtime", variable = true}, hd = {export = true, module = "runtime", variable = true}, ["string?"] = {export = true, module = "runtime", variable = true}, ["number?"] = {export = true, module = "runtime", variable = true}, ["boolean?"] = {export = true, module = "runtime", variable = true}, ["function?"] = {export = true, module = "runtime", variable = true}, ["composite?"] = {export = true, module = "runtime", variable = true}, ["atom?"] = {export = true, module = "runtime", variable = true}, ["table?"] = {export = true, module = "runtime", variable = true}, ["list?"] = {export = true, module = "runtime", variable = true}, substring = {export = true, module = "runtime", variable = true}, sublist = {export = true, module = "runtime", variable = true}, sub = {export = true, module = "runtime", variable = true}, inner = {export = true, module = "runtime", variable = true}, tl = {export = true, module = "runtime", variable = true}, char = {export = true, module = "runtime", variable = true}, code = {export = true, module = "runtime", variable = true}, ["string-literal?"] = {export = true, module = "runtime", variable = true}, ["id-literal?"] = {export = true, module = "runtime", variable = true}, add = {export = true, module = "runtime", variable = true}, drop = {export = true, module = "runtime", variable = true}, last = {export = true, module = "runtime", variable = true}, reverse = {export = true, module = "runtime", variable = true}, join = {export = true, module = "runtime", variable = true}, reduce = {export = true, module = "runtime", variable = true}, keep = {export = true, module = "runtime", variable = true}, find = {export = true, module = "runtime", variable = true}, pairwise = {export = true, module = "runtime", variable = true}, iterate = {export = true, module = "runtime", variable = true}, replicate = {export = true, module = "runtime", variable = true}, splice = {export = true, module = "runtime", variable = true}, map = {export = true, module = "runtime", variable = true}, ["keys?"] = {export = true, module = "runtime", variable = true}, stash = {export = true, module = "runtime", variable = true}, unstash = {export = true, module = "runtime", variable = true}, setenv = {export = true, module = "runtime", variable = true}, extend = {export = true, module = "runtime", variable = true}, exclude = {export = true, module = "runtime", variable = true}, search = {export = true, module = "runtime", variable = true}, split = {export = true, module = "runtime", variable = true}, cat = {export = true, module = "runtime", variable = true}, ["+"] = {export = true, module = "runtime", variable = true}, ["-"] = {export = true, module = "runtime", variable = true}, ["*"] = {export = true, module = "runtime", variable = true}, ["/"] = {export = true, module = "runtime", variable = true}, ["%"] = {export = true, module = "runtime", variable = true}, [">"] = {export = true, module = "runtime", variable = true}, ["<"] = {export = true, module = "runtime", variable = true}, ["="] = {export = true, module = "runtime", variable = true}, [">="] = {export = true, module = "runtime", variable = true}, ["<="] = {export = true, module = "runtime", variable = true}, ["read-file"] = {export = true, module = "runtime", variable = true}, ["write-file"] = {export = true, module = "runtime", variable = true}, write = {export = true, module = "runtime", variable = true}, exit = {export = true, module = "runtime", variable = true}, ["parse-number"] = {export = true, module = "runtime", variable = true}, ["to-string"] = {export = true, module = "runtime", variable = true}, apply = {export = true, module = "runtime", variable = true}, ["make-id"] = {export = true, module = "runtime", variable = true}, ["%message-handler"] = {export = true, module = "runtime", variable = true}, ["splice?"] = {variable = true, module = "runtime"}, mapl = {variable = true, module = "runtime"}, ["id-count"] = {variable = true, module = "runtime"}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["define-module"] = {module = "compiler", macro = function (spec, ...)
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
  end, export = true}, ["compile-body"] = {export = true, module = "compiler", variable = true}, ["compile-call"] = {export = true, module = "compiler", variable = true}, ["compile-branch"] = {export = true, module = "compiler", variable = true}, ["compile-function"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {export = true, module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, ["compile-module"] = {export = true, module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, infix = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["compile-args"] = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, terminator = {variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["can-return?"] = {variable = true, module = "compiler"}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["module-path"] = {variable = true, module = "compiler"}, encapsulate = {variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}, run = {variable = true, module = "compiler"}, ["compiler-output"] = {variable = true, module = "compiler"}, ["compilation-level"] = {variable = true, module = "compiler"}, ["%compile-module"] = {variable = true, module = "compiler"}, prologue = {variable = true, module = "compiler"}}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["read-table"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g522, ...)
    local char = _g522[1]
    local stream = _g522[2]
    local body = unstash({...})
    local _g523 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g523)}))
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}, delimiters = {variable = true, module = "reader"}, whitespace = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, ["skip-non-code"] = {variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}}}, utilities = {import = {"runtime", "special", "core"}, export = {getenv = {export = true, module = "utilities", variable = true}, ["macro-function"] = {export = true, module = "utilities", variable = true}, ["macro?"] = {export = true, module = "utilities", variable = true}, ["special?"] = {export = true, module = "utilities", variable = true}, ["special-form?"] = {export = true, module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, module = "utilities", variable = true}, ["symbol?"] = {export = true, module = "utilities", variable = true}, ["variable?"] = {export = true, module = "utilities", variable = true}, ["bound?"] = {export = true, module = "utilities", variable = true}, ["toplevel?"] = {export = true, module = "utilities", variable = true}, quoted = {export = true, module = "utilities", variable = true}, ["stash*"] = {export = true, module = "utilities", variable = true}, bind = {export = true, module = "utilities", variable = true}, ["bind*"] = {export = true, module = "utilities", variable = true}, quasiexpand = {export = true, module = "utilities", variable = true}, macroexpand = {export = true, module = "utilities", variable = true}, indentation = {export = true, module = "utilities", variable = true}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["valid-id?"] = {export = true, module = "utilities", variable = true}, ["to-id"] = {export = true, module = "utilities", variable = true}, ["module-key"] = {export = true, module = "utilities", variable = true}, module = {export = true, module = "utilities", variable = true}, imported = {export = true, module = "utilities", variable = true}, exported = {export = true, module = "utilities", variable = true}, mapo = {export = true, module = "utilities", variable = true}, ["quote-environment"] = {export = true, module = "utilities", variable = true}, ["quote-modules"] = {export = true, module = "utilities", variable = true}, ["initial-environment"] = {export = true, module = "utilities", variable = true}, ["global?"] = {variable = true, module = "utilities"}, escape = {variable = true, module = "utilities"}, ["quoting?"] = {variable = true, module = "utilities"}, ["quasiquoting?"] = {variable = true, module = "utilities"}, ["can-unquote?"] = {variable = true, module = "utilities"}, ["quasisplice?"] = {variable = true, module = "utilities"}, ["quasiquote-list"] = {variable = true, module = "utilities"}, ["indent-level"] = {global = true, export = true, module = "utilities"}, reserved = {variable = true, module = "utilities"}, ["numeric?"] = {variable = true, module = "utilities"}, ["valid-char?"] = {variable = true, module = "utilities"}, ["quote-binding"] = {variable = true, module = "utilities"}, ["quote-frame"] = {variable = true, module = "utilities"}, ["quote-module"] = {variable = true, module = "utilities"}}}}
  environment = {{["define-module"] = {module = "compiler", macro = function (spec, ...)
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
  return
end)();
(function ()
  local _g36 = nexus.runtime
  local nil63 = _g36["nil?"]
  local is63 = _g36["is?"]
  local length = _g36.length
  local empty63 = _g36["empty?"]
  local some63 = _g36["some?"]
  local hd = _g36.hd
  local string63 = _g36["string?"]
  local number63 = _g36["number?"]
  local boolean63 = _g36["boolean?"]
  local function63 = _g36["function?"]
  local composite63 = _g36["composite?"]
  local atom63 = _g36["atom?"]
  local table63 = _g36["table?"]
  local list63 = _g36["list?"]
  local substring = _g36.substring
  local sublist = _g36.sublist
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
  local keys63 = _g36["keys?"]
  local stash = _g36.stash
  local unstash = _g36.unstash
  local setenv = _g36.setenv
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
  local write = _g36.write
  local exit = _g36.exit
  local parse_number = _g36["parse-number"]
  local to_string = _g36["to-string"]
  local apply = _g36.apply
  local make_id = _g36["make-id"]
  local _37message_handler = _g36["%message-handler"]
  local _g74 = nexus.utilities
  local getenv = _g74.getenv
  local macro_function = _g74["macro-function"]
  local macro63 = _g74["macro?"]
  local special63 = _g74["special?"]
  local special_form63 = _g74["special-form?"]
  local symbol_expansion = _g74["symbol-expansion"]
  local symbol63 = _g74["symbol?"]
  local variable63 = _g74["variable?"]
  local bound63 = _g74["bound?"]
  local toplevel63 = _g74["toplevel?"]
  local quoted = _g74.quoted
  local stash42 = _g74["stash*"]
  local bind = _g74.bind
  local bind42 = _g74["bind*"]
  local quasiexpand = _g74.quasiexpand
  local macroexpand = _g74.macroexpand
  local indentation = _g74.indentation
  local valid_id63 = _g74["valid-id?"]
  local to_id = _g74["to-id"]
  local module_key = _g74["module-key"]
  local module = _g74.module
  local imported = _g74.imported
  local exported = _g74.exported
  local mapo = _g74.mapo
  local quote_environment = _g74["quote-environment"]
  local quote_modules = _g74["quote-modules"]
  local initial_environment = _g74["initial-environment"]
  local _g83 = nexus.reader
  local make_stream = _g83["make-stream"]
  local read_table = _g83["read-table"]
  local read = _g83.read
  local read_all = _g83["read-all"]
  local read_from_string = _g83["read-from-string"]
  local _g126 = nexus.compiler
  local compile_body = _g126["compile-body"]
  local compile_call = _g126["compile-call"]
  local compile_branch = _g126["compile-branch"]
  local compile_function = _g126["compile-function"]
  local compile_special = _g126["compile-special"]
  local compile = _g126.compile
  local open_module = _g126["open-module"]
  local load_module = _g126["load-module"]
  local in_module = _g126["in-module"]
  local compile_module = _g126["compile-module"]
  local eval = _g126.eval
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
  main()
  return
end)();
