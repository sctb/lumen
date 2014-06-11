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
    local _g8 = (upto or length(l))
    local l2 = {}
    while (i < _g8) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  local function sub(x, from, upto)
    local _g9 = (from or 0)
    if string63(x) then
      return(substring(x, _g9, upto))
    else
      local l = sublist(x, _g9, upto)
      local _g10 = x
      local k = nil
      for k in next, _g10 do
        if (not number63(k)) then
          local v = _g10[k]
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
      local _g11 = l1
      local k = nil
      for k in next, _g11 do
        if (not number63(k)) then
          local v = _g11[k]
          l[k] = v
        end
      end
      local _g12 = l2
      local k = nil
      for k in next, _g12 do
        if (not number63(k)) then
          local v = _g12[k]
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
    local _g13 = l
    local _g14 = 0
    while (_g14 < length(_g13)) do
      local x = _g13[(_g14 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g14 = (_g14 + 1)
    end
    return(l1)
  end
  local function find(f, l)
    local _g15 = l
    local _g16 = 0
    while (_g16 < length(_g15)) do
      local x = _g15[(_g16 + 1)]
      local _g17 = f(x)
      if _g17 then
        return(_g17)
      end
      _g16 = (_g16 + 1)
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
    local _g18 = l
    local _g19 = 0
    while (_g19 < length(_g18)) do
      local x = _g18[(_g19 + 1)]
      local _g20 = f(x)
      if splice63(_g20) then
        l1 = join(l1, _g20.value)
      elseif is63(_g20) then
        add(l1, _g20)
      end
      _g19 = (_g19 + 1)
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g21 = t
    local k = nil
    for k in next, _g21 do
      if (not number63(k)) then
        local v = _g21[k]
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
    local _g22 = t
    local k1 = nil
    for k1 in next, _g22 do
      if (not number63(k1)) then
        local v = _g22[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g23 = args
      local k = nil
      for k in next, _g23 do
        if (not number63(k)) then
          local v = _g23[k]
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
        local _g24 = l
        local k = nil
        for k in next, _g24 do
          if (not number63(k)) then
            local v = _g24[k]
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
    local _g25 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local _g26 = _g25
      local k1 = nil
      for k1 in next, _g26 do
        if (not number63(k1)) then
          local v = _g26[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  local function extend(t, ...)
    local xs = unstash({...})
    local _g27 = sub(xs, 0)
    return(join(t, _g27))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g28 = sub(keys, 0)
    local t1 = sublist(t)
    local _g29 = t
    local k = nil
    for k in next, _g29 do
      if (not number63(k)) then
        local v = _g29[k]
        if (not _g28[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g30 = (function ()
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
    local _g31 = sub(xs, 0)
    if empty63(_g31) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g31))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g32 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g32))
  end
  local function _(...)
    local xs = unstash({...})
    local _g33 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g33)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g34 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g34))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g35 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g35)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g36 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g36)))
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
      local _g37 = x
      local k = nil
      for k in next, _g37 do
        if (not number63(k)) then
          local v = _g37[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local _g38 = x1
      local i = 0
      while (i < length(_g38)) do
        local y = _g38[(i + 1)]
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
    local _g39 = stash(args)
    return(f(unpack(_g39)))
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
  local _g40 = {}
  nexus.runtime = _g40
  _g40.keep = keep
  _g40.search = search
  _g40["to-string"] = to_string
  _g40.splice = splice
  _g40["atom?"] = atom63
  _g40.sub = sub
  _g40["id-count"] = id_count
  _g40.mapl = mapl
  _g40["parse-number"] = parse_number
  _g40["splice?"] = splice63
  _g40.iterate = iterate
  _g40.length = length
  _g40["-"] = _
  _g40["make-id"] = make_id
  _g40["*"] = _42
  _g40["+"] = _43
  _g40.apply = apply
  _g40["keys?"] = keys63
  _g40["table?"] = table63
  _g40.split = split
  _g40["string?"] = string63
  _g40["/"] = _47
  _g40["="] = _61
  _g40[">"] = _62
  _g40["<="] = _6061
  _g40[">="] = _6261
  _g40["<"] = _60
  _g40["%"] = _37
  _g40.add = add
  _g40["read-file"] = read_file
  _g40["write-file"] = write_file
  _g40.substring = substring
  _g40.hd = hd
  _g40.exclude = exclude
  _g40.extend = extend
  _g40.sublist = sublist
  _g40.setenv = setenv
  _g40.unstash = unstash
  _g40.stash = stash
  _g40["boolean?"] = boolean63
  _g40.reverse = reverse
  _g40["function?"] = function63
  _g40.code = code
  _g40.find = find
  _g40.last = last
  _g40.reduce = reduce
  _g40.pairwise = pairwise
  _g40["some?"] = some63
  _g40.drop = drop
  _g40["id-literal?"] = id_literal63
  _g40["string-literal?"] = string_literal63
  _g40.char = char
  _g40.tl = tl
  _g40.cat = cat
  _g40["is?"] = is63
  _g40.inner = inner
  _g40.write = write
  _g40["composite?"] = composite63
  _g40["nil?"] = nil63
  _g40["empty?"] = empty63
  _g40.replicate = replicate
  _g40["number?"] = number63
  _g40["%message-handler"] = _37message_handler
  _g40.exit = exit
  _g40.join = join
  _g40.map = map
  _g40["list?"] = list63
end)();
(function ()
  local _g46 = nexus.runtime
  local number63 = _g46["number?"]
  local setenv = _g46.setenv
  local keep = _g46.keep
  local search = _g46.search
  local extend = _g46.extend
  local to_string = _g46["to-string"]
  local make_id = _g46["make-id"]
  local splice = _g46.splice
  local split = _g46.split
  local sub = _g46.sub
  local parse_number = _g46["parse-number"]
  local iterate = _g46.iterate
  local table63 = _g46["table?"]
  local length = _g46.length
  local _ = _g46["-"]
  local _47 = _g46["/"]
  local _42 = _g46["*"]
  local _43 = _g46["+"]
  local _37 = _g46["%"]
  local string63 = _g46["string?"]
  local reverse = _g46.reverse
  local _61 = _g46["="]
  local _62 = _g46[">"]
  local add = _g46.add
  local _60 = _g46["<"]
  local apply = _g46.apply
  local read_file = _g46["read-file"]
  local write_file = _g46["write-file"]
  local substring = _g46.substring
  local hd = _g46.hd
  local sublist = _g46.sublist
  local unstash = _g46.unstash
  local function63 = _g46["function?"]
  local code = _g46.code
  local last = _g46.last
  local pairwise = _g46.pairwise
  local some63 = _g46["some?"]
  local reduce = _g46.reduce
  local _6261 = _g46[">="]
  local cat = _g46.cat
  local _6061 = _g46["<="]
  local atom63 = _g46["atom?"]
  local write = _g46.write
  local id_literal63 = _g46["id-literal?"]
  local join = _g46.join
  local is63 = _g46["is?"]
  local inner = _g46.inner
  local nil63 = _g46["nil?"]
  local stash = _g46.stash
  local empty63 = _g46["empty?"]
  local replicate = _g46.replicate
  local boolean63 = _g46["boolean?"]
  local composite63 = _g46["composite?"]
  local _37message_handler = _g46["%message-handler"]
  local exit = _g46.exit
  local exclude = _g46.exclude
  local map = _g46.map
  local list63 = _g46["list?"]
  local keys63 = _g46["keys?"]
  local char = _g46.char
  local string_literal63 = _g46["string-literal?"]
  local drop = _g46.drop
  local tl = _g46.tl
  local find = _g46.find
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g49 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g50 = keys63(_g49)
        if _g50 then
          return(b[_g50])
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
      local _g51 = args
      local k = nil
      for k in next, _g51 do
        if (not number63(k)) then
          local v = _g51[k]
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
      local _g52 = lh
      local i = 0
      while (i < length(_g52)) do
        local x = _g52[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local _g53 = lh
      local k = nil
      for k in next, _g53 do
        if (not number63(k)) then
          local v = _g53[k]
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
      local _g54 = args
      local _g55 = 0
      while (_g55 < length(_g54)) do
        local arg = _g54[(_g55 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g55 = (_g55 + 1)
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
        local _g42 = form[1]
        local _g56 = form[2]
        local t = _g56[1]
        local k = _g56[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g43 = form[1]
        local args = form[2]
        local _g57 = sub(form, 2)
        add(environment, {_scope = true})
        local _g59 = (function ()
          local _g60 = args
          local _g61 = 0
          while (_g61 < length(_g60)) do
            local _g58 = _g60[(_g61 + 1)]
            setenv(_g58, {_stash = true, variable = true})
            _g61 = (_g61 + 1)
          end
          return(join({"%function", map(macroexpand, args)}, macroexpand(_g57)))
        end)()
        drop(environment)
        return(_g59)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g44 = form[1]
        local name = form[2]
        local _g62 = form[3]
        local _g63 = sub(form, 3)
        add(environment, {_scope = true})
        local _g65 = (function ()
          local _g66 = _g62
          local _g67 = 0
          while (_g67 < length(_g66)) do
            local _g64 = _g66[(_g67 + 1)]
            setenv(_g64, {_stash = true, variable = true})
            _g67 = (_g67 + 1)
          end
          return(join({x, name, map(macroexpand, _g62)}, macroexpand(_g63)))
        end)()
        drop(environment)
        return(_g65)
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
    local _g68 = form
    local k = nil
    for k in next, _g68 do
      if (not number63(k)) then
        local v = _g68[k]
        local _g69 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g69
      end
    end
    local _g70 = form
    local _g71 = 0
    while (_g71 < length(_g70)) do
      local x = _g70[(_g71 + 1)]
      if quasisplice63(x, depth) then
        local _g72 = quasiexpand(x[2])
        add(xs, _g72)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g71 = (_g71 + 1)
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
  local reserved = {["continue"] = true, ["void"] = true, ["this"] = true, ["new"] = true, ["case"] = true, ["return"] = true, ["local"] = true, ["until"] = true, ["<"] = true, ["delete"] = true, [">"] = true, ["typeof"] = true, ["%"] = true, ["nil"] = true, ["+"] = true, ["then"] = true, ["true"] = true, ["do"] = true, ["or"] = true, ["instanceof"] = true, ["try"] = true, ["while"] = true, ["<="] = true, ["var"] = true, ["if"] = true, ["throw"] = true, ["finally"] = true, ["debugger"] = true, ["end"] = true, ["and"] = true, ["elseif"] = true, ["in"] = true, ["with"] = true, ["function"] = true, [">="] = true, ["=="] = true, ["default"] = true, ["="] = true, ["repeat"] = true, ["switch"] = true, ["break"] = true, ["-"] = true, ["else"] = true, ["/"] = true, ["false"] = true, ["*"] = true, ["not"] = true, ["catch"] = true, ["for"] = true}
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
    local _g77 = hd(environment)
    local n = nil
    for n in next, _g77 do
      if (not number63(n)) then
        local b = _g77[n]
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
    local _g78 = unstash({...})
    local all = _g78.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    local _g79 = module(spec).export
    local n = nil
    for n in next, _g79 do
      if (not number63(n)) then
        local b = _g79[n]
        if (b.variable and (all or b.export)) then
          add(imports, join({"%local", n, join({"get", m, join({"quote", n})})}))
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
    local _g80 = t
    local k = nil
    for k in next, _g80 do
      if (not number63(k)) then
        local v = _g80[k]
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
    return(join({"%object"}, mapo(function (_g45, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g81 = {"table"}
      _g81.import = quoted(m.import)
      _g81.export = quote_frame(m.export)
      return(_g81)
    end)()))
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g82 = {}
  nexus.utilities = _g82
  _g82.quasiexpand = quasiexpand
  _g82["quasisplice?"] = quasisplice63
  _g82["initial-environment"] = initial_environment
  _g82["bind*"] = bind42
  _g82["special-form?"] = special_form63
  _g82.exported = exported
  _g82.mapo = mapo
  _g82["bound?"] = bound63
  _g82["quote-environment"] = quote_environment
  _g82["can-unquote?"] = can_unquote63
  _g82["quoting?"] = quoting63
  _g82["to-id"] = to_id
  _g82.getenv = getenv
  _g82["toplevel?"] = toplevel63
  _g82["numeric?"] = numeric63
  _g82["quote-module"] = quote_module
  _g82["quote-frame"] = quote_frame
  _g82["symbol?"] = symbol63
  _g82.bind = bind
  _g82["quote-modules"] = quote_modules
  _g82["quote-binding"] = quote_binding
  _g82["valid-char?"] = valid_char63
  _g82.reserved = reserved
  _g82["special?"] = special63
  _g82["quasiquote-list"] = quasiquote_list
  _g82["quasiquoting?"] = quasiquoting63
  _g82["module-key"] = module_key
  _g82["global?"] = global63
  _g82.imported = imported
  _g82.module = module
  _g82.escape = escape
  _g82["variable?"] = variable63
  _g82.indentation = indentation
  _g82.macroexpand = macroexpand
  _g82["stash*"] = stash42
  _g82.quoted = quoted
  _g82["valid-id?"] = valid_id63
  _g82["symbol-expansion"] = symbol_expansion
  _g82["macro?"] = macro63
  _g82["macro-function"] = macro_function
end)();
(function ()
  local _g84 = nexus.runtime
  local number63 = _g84["number?"]
  local setenv = _g84.setenv
  local keep = _g84.keep
  local search = _g84.search
  local extend = _g84.extend
  local to_string = _g84["to-string"]
  local make_id = _g84["make-id"]
  local splice = _g84.splice
  local split = _g84.split
  local sub = _g84.sub
  local parse_number = _g84["parse-number"]
  local iterate = _g84.iterate
  local table63 = _g84["table?"]
  local length = _g84.length
  local _ = _g84["-"]
  local _47 = _g84["/"]
  local _42 = _g84["*"]
  local _43 = _g84["+"]
  local _37 = _g84["%"]
  local string63 = _g84["string?"]
  local reverse = _g84.reverse
  local _61 = _g84["="]
  local _62 = _g84[">"]
  local add = _g84.add
  local _60 = _g84["<"]
  local apply = _g84.apply
  local read_file = _g84["read-file"]
  local write_file = _g84["write-file"]
  local substring = _g84.substring
  local hd = _g84.hd
  local sublist = _g84.sublist
  local unstash = _g84.unstash
  local function63 = _g84["function?"]
  local code = _g84.code
  local last = _g84.last
  local pairwise = _g84.pairwise
  local some63 = _g84["some?"]
  local reduce = _g84.reduce
  local _6261 = _g84[">="]
  local cat = _g84.cat
  local _6061 = _g84["<="]
  local atom63 = _g84["atom?"]
  local write = _g84.write
  local id_literal63 = _g84["id-literal?"]
  local join = _g84.join
  local is63 = _g84["is?"]
  local inner = _g84.inner
  local nil63 = _g84["nil?"]
  local stash = _g84.stash
  local empty63 = _g84["empty?"]
  local replicate = _g84.replicate
  local boolean63 = _g84["boolean?"]
  local composite63 = _g84["composite?"]
  local _37message_handler = _g84["%message-handler"]
  local exit = _g84.exit
  local exclude = _g84.exclude
  local map = _g84.map
  local list63 = _g84["list?"]
  local keys63 = _g84["keys?"]
  local char = _g84.char
  local string_literal63 = _g84["string-literal?"]
  local drop = _g84.drop
  local tl = _g84.tl
  local find = _g84.find
  local delimiters = {["\n"] = true, [";"] = true, ["("] = true, [")"] = true}
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
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
  local _g95 = {}
  nexus.reader = _g95
  _g95["skip-non-code"] = skip_non_code
  _g95.eof = eof
  _g95["read-char"] = read_char
  _g95["peek-char"] = peek_char
  _g95.whitespace = whitespace
  _g95["read-from-string"] = read_from_string
  _g95["read-all"] = read_all
  _g95["make-stream"] = make_stream
  _g95["read-table"] = read_table
  _g95["key?"] = key63
  _g95.delimiters = delimiters
  _g95["flag?"] = flag63
  _g95.read = read
end)();
(function ()
  local _g97 = nexus.runtime
  local number63 = _g97["number?"]
  local setenv = _g97.setenv
  local keep = _g97.keep
  local search = _g97.search
  local extend = _g97.extend
  local to_string = _g97["to-string"]
  local make_id = _g97["make-id"]
  local splice = _g97.splice
  local split = _g97.split
  local sub = _g97.sub
  local parse_number = _g97["parse-number"]
  local iterate = _g97.iterate
  local table63 = _g97["table?"]
  local length = _g97.length
  local _ = _g97["-"]
  local _47 = _g97["/"]
  local _42 = _g97["*"]
  local _43 = _g97["+"]
  local _37 = _g97["%"]
  local string63 = _g97["string?"]
  local reverse = _g97.reverse
  local _61 = _g97["="]
  local _62 = _g97[">"]
  local add = _g97.add
  local _60 = _g97["<"]
  local apply = _g97.apply
  local read_file = _g97["read-file"]
  local write_file = _g97["write-file"]
  local substring = _g97.substring
  local hd = _g97.hd
  local sublist = _g97.sublist
  local unstash = _g97.unstash
  local function63 = _g97["function?"]
  local code = _g97.code
  local last = _g97.last
  local pairwise = _g97.pairwise
  local some63 = _g97["some?"]
  local reduce = _g97.reduce
  local _6261 = _g97[">="]
  local cat = _g97.cat
  local _6061 = _g97["<="]
  local atom63 = _g97["atom?"]
  local write = _g97.write
  local id_literal63 = _g97["id-literal?"]
  local join = _g97.join
  local is63 = _g97["is?"]
  local inner = _g97.inner
  local nil63 = _g97["nil?"]
  local stash = _g97.stash
  local empty63 = _g97["empty?"]
  local replicate = _g97.replicate
  local boolean63 = _g97["boolean?"]
  local composite63 = _g97["composite?"]
  local _37message_handler = _g97["%message-handler"]
  local exit = _g97.exit
  local exclude = _g97.exclude
  local map = _g97.map
  local list63 = _g97["list?"]
  local keys63 = _g97["keys?"]
  local char = _g97.char
  local string_literal63 = _g97["string-literal?"]
  local drop = _g97.drop
  local tl = _g97.tl
  local find = _g97.find
  local _g98 = nexus.utilities
  local quote_modules = _g98["quote-modules"]
  local bound63 = _g98["bound?"]
  local quasiexpand = _g98.quasiexpand
  local getenv = _g98.getenv
  local toplevel63 = _g98["toplevel?"]
  local quote_environment = _g98["quote-environment"]
  local module_key = _g98["module-key"]
  local symbol_expansion = _g98["symbol-expansion"]
  local imported = _g98.imported
  local module = _g98.module
  local bind42 = _g98["bind*"]
  local macro_function = _g98["macro-function"]
  local macro63 = _g98["macro?"]
  local valid_id63 = _g98["valid-id?"]
  local special_form63 = _g98["special-form?"]
  local indentation = _g98.indentation
  local quoted = _g98.quoted
  local macroexpand = _g98.macroexpand
  local stash42 = _g98["stash*"]
  local exported = _g98.exported
  local to_id = _g98["to-id"]
  local initial_environment = _g98["initial-environment"]
  local symbol63 = _g98["symbol?"]
  local special63 = _g98["special?"]
  local variable63 = _g98["variable?"]
  local mapo = _g98.mapo
  local bind = _g98.bind
  local _g101 = nexus.reader
  local read_all = _g101["read-all"]
  local read = _g101.read
  local make_stream = _g101["make-stream"]
  local read_from_string = _g101["read-from-string"]
  local read_table = _g101["read-table"]
  local infix = {lua = {["="] = "==", ["~="] = true, cat = "..", ["and"] = true, ["or"] = true}, common = {["-"] = true, [">"] = true, ["/"] = true, ["*"] = true, ["+"] = true, ["<"] = true, ["%"] = true, ["<="] = true, [">="] = true}, js = {["~="] = "!=", ["="] = "===", ["or"] = "||", ["and"] = "&&", cat = "+"}}
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
    local _g102 = args
    local i = 0
    while (i < length(_g102)) do
      local arg = _g102[(i + 1)]
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
    local _g103 = unstash({...})
    local tail = _g103.tail
    local str = ""
    local _g104 = forms
    local i = 0
    while (i < length(_g104)) do
      local x = _g104[(i + 1)]
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
    local _g105 = getenv(hd(form))
    local self_tr63 = _g105.tr
    local stmt = _g105.stmt
    local special = _g105.special
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
  local function compile_infix(_g106)
    local op = _g106[1]
    local args = sub(_g106, 1)
    local str = "("
    local _g107 = getop(op)
    local _g108 = args
    local i = 0
    while (i < length(_g108)) do
      local arg = _g108[(i + 1)]
      if ((_g107 == "-") and (length(args) == 1)) then
        str = (str .. _g107 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g107 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g109 = (function ()
      indent_level = (indent_level + 1)
      local _g110 = compile(body, {_stash = true, stmt = true, tail = tail63})
      indent_level = (indent_level - 1)
      return(_g110)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g109 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g109 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g109 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g109 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g109 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g109 .. tr))
    end
  end
  local function compile_function(args, body, ...)
    local _g111 = unstash({...})
    local prefix = _g111.prefix
    local name = _g111.name
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g112 = (prefix or "")
    local _g113 = compile_args(args)
    local _g114 = (function ()
      indent_level = (indent_level + 1)
      local _g115 = compile_body(body, {_stash = true, tail = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g115)
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
      return(("function " .. id .. _g113 .. " {\n" .. _g114 .. ind .. "}" .. tr))
    else
      return((_g112 .. "function " .. id .. _g113 .. "\n" .. _g114 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g116 = unstash({...})
    local stmt = _g116.stmt
    local tail = _g116.tail
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
      local _g117 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g117 .. tr))
    end
  end
  current_module = nil
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g118 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g118, {epilog}))}))
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
    local _g119 = toplevel
    local name = nil
    for name in next, _g119 do
      if (not number63(name)) then
        local binding = _g119[name]
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
    local _g120 = unstash({...})
    local all = _g120.all
    local m = module(spec)
    local frame = last(environment)
    local _g121 = m.export
    local k = nil
    for k in next, _g121 do
      if (not number63(k)) then
        local v = _g121[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g122 = unstash({...})
    local all = _g122.all
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
  local _g123 = {}
  nexus.compiler = _g123
  _g123["open-module"] = open_module
  _g123["can-return?"] = can_return63
  _g123.encapsulate = encapsulate
  _g123["compilation-level"] = compilation_level
  _g123["module-path"] = module_path
  _g123["compile-file"] = compile_file
  _g123["infix?"] = infix63
  _g123["compile-body"] = compile_body
  _g123["in-module"] = in_module
  _g123.prologue = prologue
  _g123["%compile-module"] = _37compile_module
  _g123["compiler-output"] = compiler_output
  _g123["compile-args"] = compile_args
  _g123.run = run
  _g123["compile-infix"] = compile_infix
  _g123.terminator = terminator
  _g123["compile-atom"] = compile_atom
  _g123.getop = getop
  _g123.infix = infix
  _g123["compile-module"] = compile_module
  _g123.eval = eval
  _g123["load-module"] = load_module
  _g123["compile-function"] = compile_function
  _g123["compile-call"] = compile_call
  _g123.compile = compile
  _g123["compile-special"] = compile_special
  _g123["compile-branch"] = compile_branch
end)();
(function ()
  local _g126 = nexus.runtime
  local number63 = _g126["number?"]
  local setenv = _g126.setenv
  local keep = _g126.keep
  local search = _g126.search
  local extend = _g126.extend
  local to_string = _g126["to-string"]
  local make_id = _g126["make-id"]
  local splice = _g126.splice
  local split = _g126.split
  local sub = _g126.sub
  local parse_number = _g126["parse-number"]
  local iterate = _g126.iterate
  local table63 = _g126["table?"]
  local length = _g126.length
  local _ = _g126["-"]
  local _47 = _g126["/"]
  local _42 = _g126["*"]
  local _43 = _g126["+"]
  local _37 = _g126["%"]
  local string63 = _g126["string?"]
  local reverse = _g126.reverse
  local _61 = _g126["="]
  local _62 = _g126[">"]
  local add = _g126.add
  local _60 = _g126["<"]
  local apply = _g126.apply
  local read_file = _g126["read-file"]
  local write_file = _g126["write-file"]
  local substring = _g126.substring
  local hd = _g126.hd
  local sublist = _g126.sublist
  local unstash = _g126.unstash
  local function63 = _g126["function?"]
  local code = _g126.code
  local last = _g126.last
  local pairwise = _g126.pairwise
  local some63 = _g126["some?"]
  local reduce = _g126.reduce
  local _6261 = _g126[">="]
  local cat = _g126.cat
  local _6061 = _g126["<="]
  local atom63 = _g126["atom?"]
  local write = _g126.write
  local id_literal63 = _g126["id-literal?"]
  local join = _g126.join
  local is63 = _g126["is?"]
  local inner = _g126.inner
  local nil63 = _g126["nil?"]
  local stash = _g126.stash
  local empty63 = _g126["empty?"]
  local replicate = _g126.replicate
  local boolean63 = _g126["boolean?"]
  local composite63 = _g126["composite?"]
  local _37message_handler = _g126["%message-handler"]
  local exit = _g126.exit
  local exclude = _g126.exclude
  local map = _g126.map
  local list63 = _g126["list?"]
  local keys63 = _g126["keys?"]
  local char = _g126.char
  local string_literal63 = _g126["string-literal?"]
  local drop = _g126.drop
  local tl = _g126.tl
  local find = _g126.find
  local _g127 = nexus.utilities
  local quote_modules = _g127["quote-modules"]
  local bound63 = _g127["bound?"]
  local quasiexpand = _g127.quasiexpand
  local getenv = _g127.getenv
  local toplevel63 = _g127["toplevel?"]
  local quote_environment = _g127["quote-environment"]
  local module_key = _g127["module-key"]
  local symbol_expansion = _g127["symbol-expansion"]
  local imported = _g127.imported
  local module = _g127.module
  local bind42 = _g127["bind*"]
  local macro_function = _g127["macro-function"]
  local macro63 = _g127["macro?"]
  local valid_id63 = _g127["valid-id?"]
  local special_form63 = _g127["special-form?"]
  local indentation = _g127.indentation
  local quoted = _g127.quoted
  local macroexpand = _g127.macroexpand
  local stash42 = _g127["stash*"]
  local exported = _g127.exported
  local to_id = _g127["to-id"]
  local initial_environment = _g127["initial-environment"]
  local symbol63 = _g127["symbol?"]
  local special63 = _g127["special?"]
  local variable63 = _g127["variable?"]
  local mapo = _g127.mapo
  local bind = _g127.bind
  local _g130 = nexus.compiler
  local compile_body = _g130["compile-body"]
  local load_module = _g130["load-module"]
  local compile_branch = _g130["compile-branch"]
  local in_module = _g130["in-module"]
  local compile = _g130.compile
  local compile_special = _g130["compile-special"]
  local compile_call = _g130["compile-call"]
  local compile_function = _g130["compile-function"]
  local compile_module = _g130["compile-module"]
  local eval = _g130.eval
  local open_module = _g130["open-module"]
end)();
(function ()
  local _g317 = nexus.runtime
  local number63 = _g317["number?"]
  local setenv = _g317.setenv
  local keep = _g317.keep
  local search = _g317.search
  local extend = _g317.extend
  local to_string = _g317["to-string"]
  local make_id = _g317["make-id"]
  local splice = _g317.splice
  local split = _g317.split
  local sub = _g317.sub
  local parse_number = _g317["parse-number"]
  local iterate = _g317.iterate
  local table63 = _g317["table?"]
  local length = _g317.length
  local _ = _g317["-"]
  local _47 = _g317["/"]
  local _42 = _g317["*"]
  local _43 = _g317["+"]
  local _37 = _g317["%"]
  local string63 = _g317["string?"]
  local reverse = _g317.reverse
  local _61 = _g317["="]
  local _62 = _g317[">"]
  local add = _g317.add
  local _60 = _g317["<"]
  local apply = _g317.apply
  local read_file = _g317["read-file"]
  local write_file = _g317["write-file"]
  local substring = _g317.substring
  local hd = _g317.hd
  local sublist = _g317.sublist
  local unstash = _g317.unstash
  local function63 = _g317["function?"]
  local code = _g317.code
  local last = _g317.last
  local pairwise = _g317.pairwise
  local some63 = _g317["some?"]
  local reduce = _g317.reduce
  local _6261 = _g317[">="]
  local cat = _g317.cat
  local _6061 = _g317["<="]
  local atom63 = _g317["atom?"]
  local write = _g317.write
  local id_literal63 = _g317["id-literal?"]
  local join = _g317.join
  local is63 = _g317["is?"]
  local inner = _g317.inner
  local nil63 = _g317["nil?"]
  local stash = _g317.stash
  local empty63 = _g317["empty?"]
  local replicate = _g317.replicate
  local boolean63 = _g317["boolean?"]
  local composite63 = _g317["composite?"]
  local _37message_handler = _g317["%message-handler"]
  local exit = _g317.exit
  local exclude = _g317.exclude
  local map = _g317.map
  local list63 = _g317["list?"]
  local keys63 = _g317["keys?"]
  local char = _g317.char
  local string_literal63 = _g317["string-literal?"]
  local drop = _g317.drop
  local tl = _g317.tl
  local find = _g317.find
  local _g318 = nexus.utilities
  local quote_modules = _g318["quote-modules"]
  local bound63 = _g318["bound?"]
  local quasiexpand = _g318.quasiexpand
  local getenv = _g318.getenv
  local toplevel63 = _g318["toplevel?"]
  local quote_environment = _g318["quote-environment"]
  local module_key = _g318["module-key"]
  local symbol_expansion = _g318["symbol-expansion"]
  local imported = _g318.imported
  local module = _g318.module
  local bind42 = _g318["bind*"]
  local macro_function = _g318["macro-function"]
  local macro63 = _g318["macro?"]
  local valid_id63 = _g318["valid-id?"]
  local special_form63 = _g318["special-form?"]
  local indentation = _g318.indentation
  local quoted = _g318.quoted
  local macroexpand = _g318.macroexpand
  local stash42 = _g318["stash*"]
  local exported = _g318.exported
  local to_id = _g318["to-id"]
  local initial_environment = _g318["initial-environment"]
  local symbol63 = _g318["symbol?"]
  local special63 = _g318["special?"]
  local variable63 = _g318["variable?"]
  local mapo = _g318.mapo
  local bind = _g318.bind
  local _g321 = nexus.compiler
  local compile_body = _g321["compile-body"]
  local load_module = _g321["load-module"]
  local compile_branch = _g321["compile-branch"]
  local in_module = _g321["in-module"]
  local compile = _g321.compile
  local compile_special = _g321["compile-special"]
  local compile_call = _g321["compile-call"]
  local compile_function = _g321["compile-function"]
  local compile_module = _g321["compile-module"]
  local eval = _g321.eval
  local open_module = _g321["open-module"]
  target = "lua"
end)();
(function ()
  local _g598 = nexus.runtime
  local number63 = _g598["number?"]
  local setenv = _g598.setenv
  local keep = _g598.keep
  local search = _g598.search
  local extend = _g598.extend
  local to_string = _g598["to-string"]
  local make_id = _g598["make-id"]
  local splice = _g598.splice
  local split = _g598.split
  local sub = _g598.sub
  local parse_number = _g598["parse-number"]
  local iterate = _g598.iterate
  local table63 = _g598["table?"]
  local length = _g598.length
  local _ = _g598["-"]
  local _47 = _g598["/"]
  local _42 = _g598["*"]
  local _43 = _g598["+"]
  local _37 = _g598["%"]
  local string63 = _g598["string?"]
  local reverse = _g598.reverse
  local _61 = _g598["="]
  local _62 = _g598[">"]
  local add = _g598.add
  local _60 = _g598["<"]
  local apply = _g598.apply
  local read_file = _g598["read-file"]
  local write_file = _g598["write-file"]
  local substring = _g598.substring
  local hd = _g598.hd
  local sublist = _g598.sublist
  local unstash = _g598.unstash
  local function63 = _g598["function?"]
  local code = _g598.code
  local last = _g598.last
  local pairwise = _g598.pairwise
  local some63 = _g598["some?"]
  local reduce = _g598.reduce
  local _6261 = _g598[">="]
  local cat = _g598.cat
  local _6061 = _g598["<="]
  local atom63 = _g598["atom?"]
  local write = _g598.write
  local id_literal63 = _g598["id-literal?"]
  local join = _g598.join
  local is63 = _g598["is?"]
  local inner = _g598.inner
  local nil63 = _g598["nil?"]
  local stash = _g598.stash
  local empty63 = _g598["empty?"]
  local replicate = _g598.replicate
  local boolean63 = _g598["boolean?"]
  local composite63 = _g598["composite?"]
  local _37message_handler = _g598["%message-handler"]
  local exit = _g598.exit
  local exclude = _g598.exclude
  local map = _g598.map
  local list63 = _g598["list?"]
  local keys63 = _g598["keys?"]
  local char = _g598.char
  local string_literal63 = _g598["string-literal?"]
  local drop = _g598.drop
  local tl = _g598.tl
  local find = _g598.find
  local _g599 = nexus.utilities
  local quote_modules = _g599["quote-modules"]
  local bound63 = _g599["bound?"]
  local quasiexpand = _g599.quasiexpand
  local getenv = _g599.getenv
  local toplevel63 = _g599["toplevel?"]
  local quote_environment = _g599["quote-environment"]
  local module_key = _g599["module-key"]
  local symbol_expansion = _g599["symbol-expansion"]
  local imported = _g599.imported
  local module = _g599.module
  local bind42 = _g599["bind*"]
  local macro_function = _g599["macro-function"]
  local macro63 = _g599["macro?"]
  local valid_id63 = _g599["valid-id?"]
  local special_form63 = _g599["special-form?"]
  local indentation = _g599.indentation
  local quoted = _g599.quoted
  local macroexpand = _g599.macroexpand
  local stash42 = _g599["stash*"]
  local exported = _g599.exported
  local to_id = _g599["to-id"]
  local initial_environment = _g599["initial-environment"]
  local symbol63 = _g599["symbol?"]
  local special63 = _g599["special?"]
  local variable63 = _g599["variable?"]
  local mapo = _g599.mapo
  local bind = _g599.bind
  local _g602 = nexus.compiler
  local compile_body = _g602["compile-body"]
  local load_module = _g602["load-module"]
  local compile_branch = _g602["compile-branch"]
  local in_module = _g602["in-module"]
  local compile = _g602.compile
  local compile_special = _g602["compile-special"]
  local compile_call = _g602["compile-call"]
  local compile_function = _g602["compile-function"]
  local compile_module = _g602["compile-module"]
  local eval = _g602.eval
  local open_module = _g602["open-module"]
  modules = {lib = {export = {}, import = {"core", "special"}}, core = {export = {["define-macro"] = {export = true, module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g615 = sub(body, 0)
    local form = join({"fn", args}, _g615)
    eval(join((function ()
      local _g616 = {"setenv", join({"quote", name})}
      _g616.form = join({"quote", form})
      _g616.macro = form
      return(_g616)
    end)()))
    return(nil)
  end}, ["with-bindings"] = {export = true, module = "core", macro = function (_g617, ...)
    local names = _g617[1]
    local body = unstash({...})
    local _g618 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g619 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g620 = {"setenv", x}
        _g620.variable = true
        return(_g620)
      end)())})}
      _g619.scope = true
      return(_g619)
    end)(), _g618))
  end}, quote = {export = true, module = "core", macro = function (form)
    return(quoted(form))
  end}, target = {export = true, global = true, module = "core", macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, define = {export = true, module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g621 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g621)) then
      local _g622 = bind42(x, _g621)
      local args = _g622[1]
      local _g623 = _g622[2]
      return(join({"%local-function", name, args}, _g623))
    else
      return(join({"%local", name, x}))
    end
  end}, ["define-module"] = {export = true, module = "core", macro = function (spec, ...)
    local body = unstash({...})
    local _g624 = sub(body, 0)
    local imports = {}
    local imp = _g624.import
    local exp = _g624.export
    local _g625 = (imp or {})
    local _g626 = 0
    while (_g626 < length(_g625)) do
      local k = _g625[(_g626 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g626 = (_g626 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g627 = (exp or {})
    local _g628 = 0
    while (_g628 < length(_g627)) do
      local k = _g627[(_g628 + 1)]
      setenv(k, {_stash = true, export = true})
      _g628 = (_g628 + 1)
    end
    return(join({"do"}, imports))
  end}, quasiquote = {export = true, module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end}, language = {export = true, module = "core", macro = function ()
    return(join({"quote", target}))
  end}, fn = {export = true, module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g629 = sub(body, 0)
    local _g630 = bind42(args, _g629)
    local _g631 = _g630[1]
    local _g632 = _g630[2]
    return(join({"%function", _g631}, _g632))
  end}, dec = {export = true, module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end}, at = {export = true, module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end}, ["define*"] = {export = true, module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g633 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if (not empty63(_g633)) then
      local _g634 = bind42(x, _g633)
      local args = _g634[1]
      local _g635 = _g634[2]
      return(join({"%global-function", name, args}, _g635))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end}, ["let-symbol"] = {export = true, module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g636 = sub(body, 0)
    add(environment, {})
    local _g637 = (function ()
      map(function (_g638)
        local name = _g638[1]
        local exp = _g638[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g636)))
    end)()
    drop(environment)
    return(_g637)
  end}, guard = {export = true, module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end}, ["with-frame"] = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    local _g639 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g640 = {"table"}
      _g640._scope = scope
      return(_g640)
    end)())}), join({"let", join({x, join({"do"}, _g639)}), join({"drop", "environment"}), x})}))
  end}, ["let-macro"] = {export = true, module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g641 = sub(body, 0)
    add(environment, {})
    local _g642 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g641)))
    end)()
    drop(environment)
    return(_g642)
  end}, ["define-special"] = {export = true, module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g643 = sub(body, 0)
    local form = join({"fn", args}, _g643)
    local keys = sub(_g643, length(_g643))
    eval(join((function ()
      local _g644 = {"setenv", join({"quote", name})}
      _g644.form = join({"quote", form})
      _g644.special = form
      return(_g644)
    end)(), keys))
    return(nil)
  end}, table = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g316, x)
      return(x)
    end, body)))
  end}, ["set-of"] = {export = true, module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g645 = elements
    local _g646 = 0
    while (_g646 < length(_g645)) do
      local e = _g645[(_g646 + 1)]
      l[e] = true
      _g646 = (_g646 + 1)
    end
    return(join({"table"}, l))
  end}, pr = {export = true, module = "core", macro = function (...)
    local xs = unstash({...})
    local _g647 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g647)}))
  end}, ["list*"] = {export = true, module = "core", macro = function (...)
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
  end}, inc = {export = true, module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end}, ["join*"] = {export = true, module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end}, each = {export = true, module = "core", macro = function (b, t, ...)
    local body = unstash({...})
    local _g649 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g649), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g650 = {"target"}
          _g650.js = join({"isNaN", join({"parseInt", k})})
          _g650.lua = join({"not", join({"number?", k})})
          return(_g650)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g649)})})}))
      end
    end)()}))
  end}, let = {export = true, module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g651 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g652)
      local lh = _g652[1]
      local rh = _g652[2]
      local _g653 = bind(lh, rh)
      local _g654 = 0
      while (_g654 < length(_g653)) do
        local _g655 = _g653[(_g654 + 1)]
        local id = _g655[1]
        local val = _g655[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g654 = (_g654 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g651)})))
  end}, ["join!"] = {export = true, module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g656 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g656)}))
  end}, ["cat!"] = {export = true, module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g657 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g657)}))
  end}, ["define-symbol"] = {export = true, module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, list = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g658 = body
      local k = nil
      for k in next, _g658 do
        if (not number63(k)) then
          local v = _g658[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, compiler = {export = {["module-path"] = {module = "compiler", variable = true}, prologue = {module = "compiler", variable = true}, ["compile-file"] = {module = "compiler", variable = true}, ["%result"] = {global = true, module = "compiler", export = true}, ["compile-body"] = {export = true, variable = true, module = "compiler"}, ["infix?"] = {module = "compiler", variable = true}, ["current-module"] = {global = true, module = "compiler", export = true}, run = {module = "compiler", variable = true}, ["load-module"] = {export = true, variable = true, module = "compiler"}, ["can-return?"] = {module = "compiler", variable = true}, encapsulate = {module = "compiler", variable = true}, ["compile-branch"] = {export = true, variable = true, module = "compiler"}, ["in-module"] = {export = true, variable = true, module = "compiler"}, ["compilation-level"] = {module = "compiler", variable = true}, compile = {export = true, variable = true, module = "compiler"}, ["compile-special"] = {export = true, variable = true, module = "compiler"}, getop = {module = "compiler", variable = true}, ["compile-call"] = {export = true, variable = true, module = "compiler"}, ["compile-function"] = {export = true, variable = true, module = "compiler"}, ["compile-module"] = {export = true, variable = true, module = "compiler"}, eval = {export = true, variable = true, module = "compiler"}, ["compile-atom"] = {module = "compiler", variable = true}, ["compiler-output"] = {module = "compiler", variable = true}, infix = {module = "compiler", variable = true}, ["compile-infix"] = {module = "compiler", variable = true}, terminator = {module = "compiler", variable = true}, ["compile-args"] = {module = "compiler", variable = true}, ["%compile-module"] = {module = "compiler", variable = true}, ["open-module"] = {export = true, variable = true, module = "compiler"}}, import = {"runtime", "utilities", "special", "core", "reader"}}, boot = {export = {}, import = {"runtime", "utilities", "special", "core", "compiler"}}, utilities = {export = {["quoting?"] = {module = "utilities", variable = true}, ["quote-modules"] = {export = true, variable = true, module = "utilities"}, ["quasiquote-list"] = {module = "utilities", variable = true}, ["quasiquoting?"] = {module = "utilities", variable = true}, reserved = {module = "utilities", variable = true}, ["bound?"] = {export = true, variable = true, module = "utilities"}, quasiexpand = {export = true, variable = true, module = "utilities"}, getenv = {export = true, variable = true, module = "utilities"}, ["toplevel?"] = {export = true, variable = true, module = "utilities"}, ["quote-environment"] = {export = true, variable = true, module = "utilities"}, ["module-key"] = {export = true, variable = true, module = "utilities"}, ["quote-binding"] = {module = "utilities", variable = true}, escape = {module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, variable = true, module = "utilities"}, ["numeric?"] = {module = "utilities", variable = true}, imported = {export = true, variable = true, module = "utilities"}, ["can-unquote?"] = {module = "utilities", variable = true}, ["indent-level"] = {global = true, module = "utilities", export = true}, ["global?"] = {module = "utilities", variable = true}, module = {export = true, variable = true, module = "utilities"}, ["bind*"] = {export = true, variable = true, module = "utilities"}, ["macro-function"] = {export = true, variable = true, module = "utilities"}, ["macro?"] = {export = true, variable = true, module = "utilities"}, ["valid-id?"] = {export = true, variable = true, module = "utilities"}, ["special-form?"] = {export = true, variable = true, module = "utilities"}, ["quote-module"] = {module = "utilities", variable = true}, indentation = {export = true, variable = true, module = "utilities"}, quoted = {export = true, variable = true, module = "utilities"}, macroexpand = {export = true, variable = true, module = "utilities"}, ["stash*"] = {export = true, variable = true, module = "utilities"}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, exported = {export = true, variable = true, module = "utilities"}, ["quasisplice?"] = {module = "utilities", variable = true}, ["to-id"] = {export = true, variable = true, module = "utilities"}, ["valid-char?"] = {module = "utilities", variable = true}, ["initial-environment"] = {export = true, variable = true, module = "utilities"}, ["symbol?"] = {export = true, variable = true, module = "utilities"}, ["quote-frame"] = {module = "utilities", variable = true}, ["special?"] = {export = true, variable = true, module = "utilities"}, ["variable?"] = {export = true, variable = true, module = "utilities"}, mapo = {export = true, variable = true, module = "utilities"}, bind = {export = true, variable = true, module = "utilities"}}, import = {"runtime", "special", "core"}}, special = {export = {["do"] = {special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, tr = true, export = true, module = "special", stmt = true}, ["if"] = {special = function (form, tail63)
    local str = ""
    local _g659 = form
    local i = 0
    while (i < length(_g659)) do
      local condition = _g659[(i + 1)]
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
  end, tr = true, export = true, module = "special", stmt = true}, ["%for"] = {special = function (_g660)
    local _g661 = _g660[1]
    local t = _g661[1]
    local k = _g661[2]
    local body = sub(_g660, 1)
    local _g662 = compile(t)
    local ind = indentation()
    local _g663 = (function ()
      indent_level = (indent_level + 1)
      local _g664 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g664)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g662 .. " do\n" .. _g663 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g662 .. ") {\n" .. _g663 .. ind .. "}\n"))
    end
  end, tr = true, export = true, module = "special", stmt = true}, ["error"] = {special = function (_g665)
    local x = _g665[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true, stmt = true, module = "special"}, ["%global-function"] = {special = function (_g666)
    local name = _g666[1]
    local args = _g666[2]
    local body = sub(_g666, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, tr = true, export = true, module = "special", stmt = true}, ["%local"] = {special = function (_g667)
    local name = _g667[1]
    local value = _g667[2]
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
  end, export = true, stmt = true, module = "special"}, ["while"] = {special = function (_g668)
    local condition = _g668[1]
    local body = sub(_g668, 1)
    local _g669 = compile(condition)
    local _g670 = (function ()
      indent_level = (indent_level + 1)
      local _g671 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g671)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g669 .. ") {\n" .. _g670 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g669 .. " do\n" .. _g670 .. ind .. "end\n"))
    end
  end, tr = true, export = true, module = "special", stmt = true}, ["%function"] = {export = true, special = function (_g672)
    local args = _g672[1]
    local body = sub(_g672, 1)
    return(compile_function(args, body))
  end, module = "special"}, ["set"] = {special = function (_g673)
    local lh = _g673[1]
    local rh = _g673[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true, stmt = true, module = "special"}, ["%array"] = {export = true, special = function (forms)
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
    local _g674 = forms
    local i = 0
    while (i < length(_g674)) do
      local x = _g674[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special"}, ["%try"] = {special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g675 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g675)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g676 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g676)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, tr = true, export = true, module = "special", stmt = true}, ["return"] = {special = function (_g677)
    local x = _g677[1]
    local _g678 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g678))
  end, export = true, stmt = true, module = "special"}, ["break"] = {special = function (_g125)
    return((indentation() .. "break"))
  end, export = true, stmt = true, module = "special"}, ["%local-function"] = {special = function (_g679)
    local name = _g679[1]
    local args = _g679[2]
    local body = sub(_g679, 2)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, tr = true, export = true, module = "special", stmt = true}, ["not"] = {export = true, special = function (_g680)
    local x = _g680[1]
    local _g681 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g681 .. ")"))
  end, module = "special"}, ["get"] = {export = true, special = function (_g682)
    local t = _g682[1]
    local k = _g682[2]
    local _g683 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g683, 0) == "{")) then
      _g683 = ("(" .. _g683 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g683 .. "." .. inner(k)))
    else
      return((_g683 .. "[" .. k1 .. "]"))
    end
  end, module = "special"}, ["%object"] = {export = true, special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g684 = pairs
    local i = 0
    while (i < length(_g684)) do
      local _g685 = _g684[(i + 1)]
      local k = _g685[1]
      local v = _g685[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g686 = compile(v)
      local _g687 = (function ()
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
      str = (str .. _g687 .. sep .. _g686)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special"}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, system = {export = {nexus = {global = true, module = "system", export = true}}, import = {"special", "core"}}, reader = {export = {["read-all"] = {export = true, variable = true, module = "reader"}, read = {export = true, variable = true, module = "reader"}, ["read-char"] = {module = "reader", variable = true}, ["peek-char"] = {module = "reader", variable = true}, ["key?"] = {module = "reader", variable = true}, eof = {module = "reader", variable = true}, ["make-stream"] = {export = true, variable = true, module = "reader"}, ["skip-non-code"] = {module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g688, ...)
    local char = _g688[1]
    local stream = _g688[2]
    local body = unstash({...})
    local _g689 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g689)}))
  end}, delimiters = {module = "reader", variable = true}, ["read-from-string"] = {export = true, variable = true, module = "reader"}, ["flag?"] = {module = "reader", variable = true}, ["read-table"] = {export = true, variable = true, module = "reader"}, whitespace = {module = "reader", variable = true}}, import = {"runtime", "special", "core"}}, runtime = {export = {["number?"] = {export = true, variable = true, module = "runtime"}, setenv = {export = true, variable = true, module = "runtime"}, keep = {export = true, variable = true, module = "runtime"}, search = {export = true, variable = true, module = "runtime"}, extend = {export = true, variable = true, module = "runtime"}, ["to-string"] = {export = true, variable = true, module = "runtime"}, ["make-id"] = {export = true, variable = true, module = "runtime"}, splice = {export = true, variable = true, module = "runtime"}, split = {export = true, variable = true, module = "runtime"}, ["splice?"] = {module = "runtime", variable = true}, sub = {export = true, variable = true, module = "runtime"}, ["parse-number"] = {export = true, variable = true, module = "runtime"}, iterate = {export = true, variable = true, module = "runtime"}, ["table?"] = {export = true, variable = true, module = "runtime"}, length = {export = true, variable = true, module = "runtime"}, ["-"] = {export = true, variable = true, module = "runtime"}, ["/"] = {export = true, variable = true, module = "runtime"}, mapl = {module = "runtime", variable = true}, ["*"] = {export = true, variable = true, module = "runtime"}, ["+"] = {export = true, variable = true, module = "runtime"}, ["%"] = {export = true, variable = true, module = "runtime"}, ["string?"] = {export = true, variable = true, module = "runtime"}, reverse = {export = true, variable = true, module = "runtime"}, ["="] = {export = true, variable = true, module = "runtime"}, [">"] = {export = true, variable = true, module = "runtime"}, add = {export = true, variable = true, module = "runtime"}, ["<"] = {export = true, variable = true, module = "runtime"}, apply = {export = true, variable = true, module = "runtime"}, ["read-file"] = {export = true, variable = true, module = "runtime"}, ["write-file"] = {export = true, variable = true, module = "runtime"}, substring = {export = true, variable = true, module = "runtime"}, hd = {export = true, variable = true, module = "runtime"}, sublist = {export = true, variable = true, module = "runtime"}, unstash = {export = true, variable = true, module = "runtime"}, ["function?"] = {export = true, variable = true, module = "runtime"}, code = {export = true, variable = true, module = "runtime"}, last = {export = true, variable = true, module = "runtime"}, pairwise = {export = true, variable = true, module = "runtime"}, ["some?"] = {export = true, variable = true, module = "runtime"}, reduce = {export = true, variable = true, module = "runtime"}, [">="] = {export = true, variable = true, module = "runtime"}, cat = {export = true, variable = true, module = "runtime"}, ["<="] = {export = true, variable = true, module = "runtime"}, ["atom?"] = {export = true, variable = true, module = "runtime"}, write = {export = true, variable = true, module = "runtime"}, ["id-literal?"] = {export = true, variable = true, module = "runtime"}, join = {export = true, variable = true, module = "runtime"}, ["is?"] = {export = true, variable = true, module = "runtime"}, inner = {export = true, variable = true, module = "runtime"}, ["nil?"] = {export = true, variable = true, module = "runtime"}, stash = {export = true, variable = true, module = "runtime"}, ["empty?"] = {export = true, variable = true, module = "runtime"}, replicate = {export = true, variable = true, module = "runtime"}, ["boolean?"] = {export = true, variable = true, module = "runtime"}, ["composite?"] = {export = true, variable = true, module = "runtime"}, ["%message-handler"] = {export = true, variable = true, module = "runtime"}, exit = {export = true, variable = true, module = "runtime"}, exclude = {export = true, variable = true, module = "runtime"}, map = {export = true, variable = true, module = "runtime"}, ["list?"] = {export = true, variable = true, module = "runtime"}, ["keys?"] = {export = true, variable = true, module = "runtime"}, char = {export = true, variable = true, module = "runtime"}, ["string-literal?"] = {export = true, variable = true, module = "runtime"}, ["id-count"] = {module = "runtime", variable = true}, drop = {export = true, variable = true, module = "runtime"}, tl = {export = true, variable = true, module = "runtime"}, find = {export = true, variable = true, module = "runtime"}}, import = {"special", "core"}}}
  environment = {{["define-module"] = {export = true, module = "core", macro = function (spec, ...)
    local body = unstash({...})
    local _g690 = sub(body, 0)
    local imports = {}
    local imp = _g690.import
    local exp = _g690.export
    local _g691 = (imp or {})
    local _g692 = 0
    while (_g692 < length(_g691)) do
      local k = _g691[(_g692 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g692 = (_g692 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g693 = (exp or {})
    local _g694 = 0
    while (_g694 < length(_g693)) do
      local k = _g693[(_g694 + 1)]
      setenv(k, {_stash = true, export = true})
      _g694 = (_g694 + 1)
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g41 = nexus.runtime
  local number63 = _g41["number?"]
  local setenv = _g41.setenv
  local keep = _g41.keep
  local search = _g41.search
  local extend = _g41.extend
  local to_string = _g41["to-string"]
  local make_id = _g41["make-id"]
  local splice = _g41.splice
  local split = _g41.split
  local sub = _g41.sub
  local parse_number = _g41["parse-number"]
  local iterate = _g41.iterate
  local table63 = _g41["table?"]
  local length = _g41.length
  local _ = _g41["-"]
  local _47 = _g41["/"]
  local _42 = _g41["*"]
  local _43 = _g41["+"]
  local _37 = _g41["%"]
  local string63 = _g41["string?"]
  local reverse = _g41.reverse
  local _61 = _g41["="]
  local _62 = _g41[">"]
  local add = _g41.add
  local _60 = _g41["<"]
  local apply = _g41.apply
  local read_file = _g41["read-file"]
  local write_file = _g41["write-file"]
  local substring = _g41.substring
  local hd = _g41.hd
  local sublist = _g41.sublist
  local unstash = _g41.unstash
  local function63 = _g41["function?"]
  local code = _g41.code
  local last = _g41.last
  local pairwise = _g41.pairwise
  local some63 = _g41["some?"]
  local reduce = _g41.reduce
  local _6261 = _g41[">="]
  local cat = _g41.cat
  local _6061 = _g41["<="]
  local atom63 = _g41["atom?"]
  local write = _g41.write
  local id_literal63 = _g41["id-literal?"]
  local join = _g41.join
  local is63 = _g41["is?"]
  local inner = _g41.inner
  local nil63 = _g41["nil?"]
  local stash = _g41.stash
  local empty63 = _g41["empty?"]
  local replicate = _g41.replicate
  local boolean63 = _g41["boolean?"]
  local composite63 = _g41["composite?"]
  local _37message_handler = _g41["%message-handler"]
  local exit = _g41.exit
  local exclude = _g41.exclude
  local map = _g41.map
  local list63 = _g41["list?"]
  local keys63 = _g41["keys?"]
  local char = _g41.char
  local string_literal63 = _g41["string-literal?"]
  local drop = _g41.drop
  local tl = _g41.tl
  local find = _g41.find
  local _g83 = nexus.utilities
  local quote_modules = _g83["quote-modules"]
  local bound63 = _g83["bound?"]
  local quasiexpand = _g83.quasiexpand
  local getenv = _g83.getenv
  local toplevel63 = _g83["toplevel?"]
  local quote_environment = _g83["quote-environment"]
  local module_key = _g83["module-key"]
  local symbol_expansion = _g83["symbol-expansion"]
  local imported = _g83.imported
  local module = _g83.module
  local bind42 = _g83["bind*"]
  local macro_function = _g83["macro-function"]
  local macro63 = _g83["macro?"]
  local valid_id63 = _g83["valid-id?"]
  local special_form63 = _g83["special-form?"]
  local indentation = _g83.indentation
  local quoted = _g83.quoted
  local macroexpand = _g83.macroexpand
  local stash42 = _g83["stash*"]
  local exported = _g83.exported
  local to_id = _g83["to-id"]
  local initial_environment = _g83["initial-environment"]
  local symbol63 = _g83["symbol?"]
  local special63 = _g83["special?"]
  local variable63 = _g83["variable?"]
  local mapo = _g83.mapo
  local bind = _g83.bind
  local _g96 = nexus.reader
  local read_all = _g96["read-all"]
  local read = _g96.read
  local make_stream = _g96["make-stream"]
  local read_from_string = _g96["read-from-string"]
  local read_table = _g96["read-table"]
  local _g124 = nexus.compiler
  local compile_body = _g124["compile-body"]
  local load_module = _g124["load-module"]
  local compile_branch = _g124["compile-branch"]
  local in_module = _g124["in-module"]
  local compile = _g124.compile
  local compile_special = _g124["compile-special"]
  local compile_call = _g124["compile-call"]
  local compile_function = _g124["compile-function"]
  local compile_module = _g124["compile-module"]
  local eval = _g124.eval
  local open_module = _g124["open-module"]
  local function rep(str)
    local _g697 = (function ()
      local _g698,_g699 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g698, _g699})
    end)()
    local _g1 = _g697[1]
    local x = _g697[2]
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
    local _g700 = args
    local i = 0
    while (i < length(_g700)) do
      local arg = _g700[(i + 1)]
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
  local _g701 = {}
  nexus.main = _g701
  _g701.main = main
  _g701.usage = usage
  _g701.repl = repl
  _g701.rep = rep
end)();
