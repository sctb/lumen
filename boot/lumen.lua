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
    return({value = x, _splice = true})
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
  _g40.add = add
  _g40["="] = _61
  _g40["is?"] = is63
  _g40["id-literal?"] = id_literal63
  _g40.code = code
  _g40["%"] = _37
  _g40["+"] = _43
  _g40["keys?"] = keys63
  _g40.split = split
  _g40["-"] = _
  _g40.keep = keep
  _g40["make-id"] = make_id
  _g40["*"] = _42
  _g40["splice?"] = splice63
  _g40["%message-handler"] = _37message_handler
  _g40.pairwise = pairwise
  _g40["id-count"] = id_count
  _g40[">="] = _6261
  _g40.apply = apply
  _g40["function?"] = function63
  _g40["read-file"] = read_file
  _g40["parse-number"] = parse_number
  _g40.iterate = iterate
  _g40["write-file"] = write_file
  _g40.exit = exit
  _g40.length = length
  _g40.cat = cat
  _g40.write = write
  _g40["to-string"] = to_string
  _g40.find = find
  _g40["<="] = _6061
  _g40["<"] = _60
  _g40[">"] = _62
  _g40["/"] = _47
  _g40.mapl = mapl
  _g40["composite?"] = composite63
  _g40.exclude = exclude
  _g40.stash = stash
  _g40.setenv = setenv
  _g40["atom?"] = atom63
  _g40.unstash = unstash
  _g40.extend = extend
  _g40.splice = splice
  _g40.replicate = replicate
  _g40.reduce = reduce
  _g40.join = join
  _g40["nil?"] = nil63
  _g40.drop = drop
  _g40["string-literal?"] = string_literal63
  _g40.sublist = sublist
  _g40.tl = tl
  _g40.map = map
  _g40.sub = sub
  _g40.search = search
  _g40.hd = hd
  _g40.char = char
  _g40["boolean?"] = boolean63
  _g40.substring = substring
  _g40["list?"] = list63
  _g40["table?"] = table63
  _g40.last = last
  _g40.reverse = reverse
  _g40["string?"] = string63
  _g40["some?"] = some63
  _g40["number?"] = number63
  _g40["empty?"] = empty63
  _g40.inner = inner
end)();
(function ()
  local _g46 = nexus.runtime
  local parse_number = _g46["parse-number"]
  local add = _g46.add
  local reduce = _g46.reduce
  local _62 = _g46[">"]
  local _61 = _g46["="]
  local _60 = _g46["<"]
  local id_literal63 = _g46["id-literal?"]
  local code = _g46.code
  local _37 = _g46["%"]
  local _43 = _g46["+"]
  local _42 = _g46["*"]
  local keys63 = _g46["keys?"]
  local _47 = _g46["/"]
  local _ = _g46["-"]
  local drop = _g46.drop
  local some63 = _g46["some?"]
  local sub = _g46.sub
  local stash = _g46.stash
  local unstash = _g46.unstash
  local string63 = _g46["string?"]
  local make_id = _g46["make-id"]
  local replicate = _g46.replicate
  local pairwise = _g46.pairwise
  local _6261 = _g46[">="]
  local apply = _g46.apply
  local function63 = _g46["function?"]
  local iterate = _g46.iterate
  local write_file = _g46["write-file"]
  local length = _g46.length
  local cat = _g46.cat
  local to_string = _g46["to-string"]
  local find = _g46.find
  local composite63 = _g46["composite?"]
  local atom63 = _g46["atom?"]
  local extend = _g46.extend
  local nil63 = _g46["nil?"]
  local tl = _g46.tl
  local write = _g46.write
  local setenv = _g46.setenv
  local search = _g46.search
  local hd = _g46.hd
  local string_literal63 = _g46["string-literal?"]
  local exclude = _g46.exclude
  local join = _g46.join
  local keep = _g46.keep
  local number63 = _g46["number?"]
  local sublist = _g46.sublist
  local splice = _g46.splice
  local last = _g46.last
  local is63 = _g46["is?"]
  local reverse = _g46.reverse
  local _6061 = _g46["<="]
  local list63 = _g46["list?"]
  local substring = _g46.substring
  local boolean63 = _g46["boolean?"]
  local char = _g46.char
  local split = _g46.split
  local map = _g46.map
  local table63 = _g46["table?"]
  local _37message_handler = _g46["%message-handler"]
  local empty63 = _g46["empty?"]
  local inner = _g46.inner
  local read_file = _g46["read-file"]
  local exit = _g46.exit
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
  local reserved = {["do"] = true, ["=="] = true, ["void"] = true, ["for"] = true, ["="] = true, ["if"] = true, ["debugger"] = true, ["false"] = true, ["with"] = true, ["repeat"] = true, ["in"] = true, ["and"] = true, ["delete"] = true, ["%"] = true, ["new"] = true, ["elseif"] = true, ["+"] = true, ["instanceof"] = true, ["<"] = true, ["typeof"] = true, ["break"] = true, ["/"] = true, ["<="] = true, ["return"] = true, [">="] = true, ["-"] = true, [">"] = true, ["continue"] = true, ["switch"] = true, ["try"] = true, ["or"] = true, ["this"] = true, ["var"] = true, ["then"] = true, ["finally"] = true, ["function"] = true, ["catch"] = true, ["not"] = true, ["else"] = true, ["default"] = true, ["while"] = true, ["end"] = true, ["true"] = true, ["throw"] = true, ["*"] = true, ["nil"] = true, ["case"] = true, ["until"] = true, ["local"] = true}
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
    if nexus[k] then
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
      _g81.export = quote_frame(m.export)
      _g81.import = quoted(m.import)
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
  _g82["bound?"] = bound63
  _g82["quote-modules"] = quote_modules
  _g82["module-key"] = module_key
  _g82["valid-id?"] = valid_id63
  _g82["bind*"] = bind42
  _g82["initial-environment"] = initial_environment
  _g82["special-form?"] = special_form63
  _g82.quasiexpand = quasiexpand
  _g82.reserved = reserved
  _g82["quasiquoting?"] = quasiquoting63
  _g82["quoting?"] = quoting63
  _g82["variable?"] = variable63
  _g82.mapo = mapo
  _g82["quasisplice?"] = quasisplice63
  _g82["quote-module"] = quote_module
  _g82["quote-frame"] = quote_frame
  _g82["quote-binding"] = quote_binding
  _g82["stash*"] = stash42
  _g82["numeric?"] = numeric63
  _g82["quasiquote-list"] = quasiquote_list
  _g82["global?"] = global63
  _g82.getenv = getenv
  _g82.exported = exported
  _g82.imported = imported
  _g82["quote-environment"] = quote_environment
  _g82.indentation = indentation
  _g82["can-unquote?"] = can_unquote63
  _g82.bind = bind
  _g82["valid-char?"] = valid_char63
  _g82["toplevel?"] = toplevel63
  _g82["to-id"] = to_id
  _g82.macroexpand = macroexpand
  _g82["symbol?"] = symbol63
  _g82["symbol-expansion"] = symbol_expansion
  _g82["special?"] = special63
  _g82["macro-function"] = macro_function
  _g82.quoted = quoted
  _g82["macro?"] = macro63
  _g82.escape = escape
  _g82.module = module
end)();
(function ()
  local _g84 = nexus.runtime
  local parse_number = _g84["parse-number"]
  local add = _g84.add
  local reduce = _g84.reduce
  local _62 = _g84[">"]
  local _61 = _g84["="]
  local _60 = _g84["<"]
  local id_literal63 = _g84["id-literal?"]
  local code = _g84.code
  local _37 = _g84["%"]
  local _43 = _g84["+"]
  local _42 = _g84["*"]
  local keys63 = _g84["keys?"]
  local _47 = _g84["/"]
  local _ = _g84["-"]
  local drop = _g84.drop
  local some63 = _g84["some?"]
  local sub = _g84.sub
  local stash = _g84.stash
  local unstash = _g84.unstash
  local string63 = _g84["string?"]
  local make_id = _g84["make-id"]
  local replicate = _g84.replicate
  local pairwise = _g84.pairwise
  local _6261 = _g84[">="]
  local apply = _g84.apply
  local function63 = _g84["function?"]
  local iterate = _g84.iterate
  local write_file = _g84["write-file"]
  local length = _g84.length
  local cat = _g84.cat
  local to_string = _g84["to-string"]
  local find = _g84.find
  local composite63 = _g84["composite?"]
  local atom63 = _g84["atom?"]
  local extend = _g84.extend
  local nil63 = _g84["nil?"]
  local tl = _g84.tl
  local write = _g84.write
  local setenv = _g84.setenv
  local search = _g84.search
  local hd = _g84.hd
  local string_literal63 = _g84["string-literal?"]
  local exclude = _g84.exclude
  local join = _g84.join
  local keep = _g84.keep
  local number63 = _g84["number?"]
  local sublist = _g84.sublist
  local splice = _g84.splice
  local last = _g84.last
  local is63 = _g84["is?"]
  local reverse = _g84.reverse
  local _6061 = _g84["<="]
  local list63 = _g84["list?"]
  local substring = _g84.substring
  local boolean63 = _g84["boolean?"]
  local char = _g84.char
  local split = _g84.split
  local map = _g84.map
  local table63 = _g84["table?"]
  local _37message_handler = _g84["%message-handler"]
  local empty63 = _g84["empty?"]
  local inner = _g84.inner
  local read_file = _g84["read-file"]
  local exit = _g84.exit
  local delimiters = {[";"] = true, ["("] = true, ["\n"] = true, [")"] = true}
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  local function make_stream(str)
    return({len = length(str), pos = 0, string = str})
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
  _g95.eof = eof
  _g95["flag?"] = flag63
  _g95["key?"] = key63
  _g95["read-table"] = read_table
  _g95["peek-char"] = peek_char
  _g95["read-all"] = read_all
  _g95["make-stream"] = make_stream
  _g95.read = read
  _g95["read-char"] = read_char
  _g95["skip-non-code"] = skip_non_code
  _g95.delimiters = delimiters
  _g95.whitespace = whitespace
  _g95["read-from-string"] = read_from_string
end)();
(function ()
  local _g97 = nexus.runtime
  local parse_number = _g97["parse-number"]
  local add = _g97.add
  local reduce = _g97.reduce
  local _62 = _g97[">"]
  local _61 = _g97["="]
  local _60 = _g97["<"]
  local id_literal63 = _g97["id-literal?"]
  local code = _g97.code
  local _37 = _g97["%"]
  local _43 = _g97["+"]
  local _42 = _g97["*"]
  local keys63 = _g97["keys?"]
  local _47 = _g97["/"]
  local _ = _g97["-"]
  local drop = _g97.drop
  local some63 = _g97["some?"]
  local sub = _g97.sub
  local stash = _g97.stash
  local unstash = _g97.unstash
  local string63 = _g97["string?"]
  local make_id = _g97["make-id"]
  local replicate = _g97.replicate
  local pairwise = _g97.pairwise
  local _6261 = _g97[">="]
  local apply = _g97.apply
  local function63 = _g97["function?"]
  local iterate = _g97.iterate
  local write_file = _g97["write-file"]
  local length = _g97.length
  local cat = _g97.cat
  local to_string = _g97["to-string"]
  local find = _g97.find
  local composite63 = _g97["composite?"]
  local atom63 = _g97["atom?"]
  local extend = _g97.extend
  local nil63 = _g97["nil?"]
  local tl = _g97.tl
  local write = _g97.write
  local setenv = _g97.setenv
  local search = _g97.search
  local hd = _g97.hd
  local string_literal63 = _g97["string-literal?"]
  local exclude = _g97.exclude
  local join = _g97.join
  local keep = _g97.keep
  local number63 = _g97["number?"]
  local sublist = _g97.sublist
  local splice = _g97.splice
  local last = _g97.last
  local is63 = _g97["is?"]
  local reverse = _g97.reverse
  local _6061 = _g97["<="]
  local list63 = _g97["list?"]
  local substring = _g97.substring
  local boolean63 = _g97["boolean?"]
  local char = _g97.char
  local split = _g97.split
  local map = _g97.map
  local table63 = _g97["table?"]
  local _37message_handler = _g97["%message-handler"]
  local empty63 = _g97["empty?"]
  local inner = _g97.inner
  local read_file = _g97["read-file"]
  local exit = _g97.exit
  local _g98 = nexus.utilities
  local quote_environment = _g98["quote-environment"]
  local imported = _g98.imported
  local quasiexpand = _g98.quasiexpand
  local bound63 = _g98["bound?"]
  local to_id = _g98["to-id"]
  local macro_function = _g98["macro-function"]
  local macroexpand = _g98.macroexpand
  local quote_modules = _g98["quote-modules"]
  local module_key = _g98["module-key"]
  local stash42 = _g98["stash*"]
  local module = _g98.module
  local valid_id63 = _g98["valid-id?"]
  local indentation = _g98.indentation
  local macro63 = _g98["macro?"]
  local special63 = _g98["special?"]
  local quoted = _g98.quoted
  local symbol_expansion = _g98["symbol-expansion"]
  local bind = _g98.bind
  local symbol63 = _g98["symbol?"]
  local mapo = _g98.mapo
  local exported = _g98.exported
  local special_form63 = _g98["special-form?"]
  local bind42 = _g98["bind*"]
  local getenv = _g98.getenv
  local initial_environment = _g98["initial-environment"]
  local toplevel63 = _g98["toplevel?"]
  local variable63 = _g98["variable?"]
  local _g101 = nexus.reader
  local read_all = _g101["read-all"]
  local read_from_string = _g101["read-from-string"]
  local read_table = _g101["read-table"]
  local read = _g101.read
  local make_stream = _g101["make-stream"]
  local infix = {common = {[">="] = true, ["%"] = true, ["+"] = true, ["*"] = true, ["/"] = true, [">"] = true, ["-"] = true, ["<"] = true, ["<="] = true}, js = {["or"] = "||", ["~="] = "!=", ["and"] = "&&", cat = "+", ["="] = "==="}, lua = {["or"] = true, ["~="] = true, ["="] = "==", cat = "..", ["and"] = true}}
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
    local _g105 = getenv(hd(form))
    local self_tr63 = _g105.tr
    local special = _g105.special
    local stmt = _g105.stmt
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
      local _g110 = compile(body, {_stash = true, tail = tail63, stmt = true})
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
      local _g115 = compile_body(body, {_stash = true, ["tail?"] = true, tail = true})
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
  compilation_level = nil
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
  local _g132 = {}
  nexus.compiler = _g132
  _g132["compiler-output"] = compiler_output
  _g132["open-module"] = open_module
  _g132["in-module"] = in_module
  _g132["compile-atom"] = compile_atom
  _g132["compile-args"] = compile_args
  _g132["compile-call"] = compile_call
  _g132.encapsulate = encapsulate
  _g132["compile-body"] = compile_body
  _g132["infix?"] = infix63
  _g132["compile-function"] = compile_function
  _g132["compile-file"] = compile_file
  _g132.infix = infix
  _g132.prologue = prologue
  _g132.run = run
  _g132["module-path"] = module_path
  _g132["can-return?"] = can_return63
  _g132["compile-infix"] = compile_infix
  _g132.terminator = terminator
  _g132.getop = getop
  _g132.eval = eval
  _g132["load-module"] = load_module
  _g132["compile-module"] = compile_module
  _g132.compile = compile
  _g132["compile-branch"] = compile_branch
  _g132["%compile-module"] = _37compile_module
  _g132["compile-special"] = compile_special
end)();
(function ()
  local _g135 = nexus.runtime
  local parse_number = _g135["parse-number"]
  local add = _g135.add
  local reduce = _g135.reduce
  local _62 = _g135[">"]
  local _61 = _g135["="]
  local _60 = _g135["<"]
  local id_literal63 = _g135["id-literal?"]
  local code = _g135.code
  local _37 = _g135["%"]
  local _43 = _g135["+"]
  local _42 = _g135["*"]
  local keys63 = _g135["keys?"]
  local _47 = _g135["/"]
  local _ = _g135["-"]
  local drop = _g135.drop
  local some63 = _g135["some?"]
  local sub = _g135.sub
  local stash = _g135.stash
  local unstash = _g135.unstash
  local string63 = _g135["string?"]
  local make_id = _g135["make-id"]
  local replicate = _g135.replicate
  local pairwise = _g135.pairwise
  local _6261 = _g135[">="]
  local apply = _g135.apply
  local function63 = _g135["function?"]
  local iterate = _g135.iterate
  local write_file = _g135["write-file"]
  local length = _g135.length
  local cat = _g135.cat
  local to_string = _g135["to-string"]
  local find = _g135.find
  local composite63 = _g135["composite?"]
  local atom63 = _g135["atom?"]
  local extend = _g135.extend
  local nil63 = _g135["nil?"]
  local tl = _g135.tl
  local write = _g135.write
  local setenv = _g135.setenv
  local search = _g135.search
  local hd = _g135.hd
  local string_literal63 = _g135["string-literal?"]
  local exclude = _g135.exclude
  local join = _g135.join
  local keep = _g135.keep
  local number63 = _g135["number?"]
  local sublist = _g135.sublist
  local splice = _g135.splice
  local last = _g135.last
  local is63 = _g135["is?"]
  local reverse = _g135.reverse
  local _6061 = _g135["<="]
  local list63 = _g135["list?"]
  local substring = _g135.substring
  local boolean63 = _g135["boolean?"]
  local char = _g135.char
  local split = _g135.split
  local map = _g135.map
  local table63 = _g135["table?"]
  local _37message_handler = _g135["%message-handler"]
  local empty63 = _g135["empty?"]
  local inner = _g135.inner
  local read_file = _g135["read-file"]
  local exit = _g135.exit
  local _g136 = nexus.utilities
  local quote_environment = _g136["quote-environment"]
  local imported = _g136.imported
  local quasiexpand = _g136.quasiexpand
  local bound63 = _g136["bound?"]
  local to_id = _g136["to-id"]
  local macro_function = _g136["macro-function"]
  local macroexpand = _g136.macroexpand
  local quote_modules = _g136["quote-modules"]
  local module_key = _g136["module-key"]
  local stash42 = _g136["stash*"]
  local module = _g136.module
  local valid_id63 = _g136["valid-id?"]
  local indentation = _g136.indentation
  local macro63 = _g136["macro?"]
  local special63 = _g136["special?"]
  local quoted = _g136.quoted
  local symbol_expansion = _g136["symbol-expansion"]
  local bind = _g136.bind
  local symbol63 = _g136["symbol?"]
  local mapo = _g136.mapo
  local exported = _g136.exported
  local special_form63 = _g136["special-form?"]
  local bind42 = _g136["bind*"]
  local getenv = _g136.getenv
  local initial_environment = _g136["initial-environment"]
  local toplevel63 = _g136["toplevel?"]
  local variable63 = _g136["variable?"]
  local _g139 = nexus.compiler
  local compile_special = _g139["compile-special"]
  local compile = _g139.compile
  local compile_branch = _g139["compile-branch"]
  local compile_call = _g139["compile-call"]
  local compile_module = _g139["compile-module"]
  local eval = _g139.eval
  local load_module = _g139["load-module"]
  local open_module = _g139["open-module"]
  local in_module = _g139["in-module"]
  local compile_body = _g139["compile-body"]
  local compile_function = _g139["compile-function"]
end)();
(function ()
  local _g326 = nexus.runtime
  local parse_number = _g326["parse-number"]
  local add = _g326.add
  local reduce = _g326.reduce
  local _62 = _g326[">"]
  local _61 = _g326["="]
  local _60 = _g326["<"]
  local id_literal63 = _g326["id-literal?"]
  local code = _g326.code
  local _37 = _g326["%"]
  local _43 = _g326["+"]
  local _42 = _g326["*"]
  local keys63 = _g326["keys?"]
  local _47 = _g326["/"]
  local _ = _g326["-"]
  local drop = _g326.drop
  local some63 = _g326["some?"]
  local sub = _g326.sub
  local stash = _g326.stash
  local unstash = _g326.unstash
  local string63 = _g326["string?"]
  local make_id = _g326["make-id"]
  local replicate = _g326.replicate
  local pairwise = _g326.pairwise
  local _6261 = _g326[">="]
  local apply = _g326.apply
  local function63 = _g326["function?"]
  local iterate = _g326.iterate
  local write_file = _g326["write-file"]
  local length = _g326.length
  local cat = _g326.cat
  local to_string = _g326["to-string"]
  local find = _g326.find
  local composite63 = _g326["composite?"]
  local atom63 = _g326["atom?"]
  local extend = _g326.extend
  local nil63 = _g326["nil?"]
  local tl = _g326.tl
  local write = _g326.write
  local setenv = _g326.setenv
  local search = _g326.search
  local hd = _g326.hd
  local string_literal63 = _g326["string-literal?"]
  local exclude = _g326.exclude
  local join = _g326.join
  local keep = _g326.keep
  local number63 = _g326["number?"]
  local sublist = _g326.sublist
  local splice = _g326.splice
  local last = _g326.last
  local is63 = _g326["is?"]
  local reverse = _g326.reverse
  local _6061 = _g326["<="]
  local list63 = _g326["list?"]
  local substring = _g326.substring
  local boolean63 = _g326["boolean?"]
  local char = _g326.char
  local split = _g326.split
  local map = _g326.map
  local table63 = _g326["table?"]
  local _37message_handler = _g326["%message-handler"]
  local empty63 = _g326["empty?"]
  local inner = _g326.inner
  local read_file = _g326["read-file"]
  local exit = _g326.exit
  local _g327 = nexus.utilities
  local quote_environment = _g327["quote-environment"]
  local imported = _g327.imported
  local quasiexpand = _g327.quasiexpand
  local bound63 = _g327["bound?"]
  local to_id = _g327["to-id"]
  local macro_function = _g327["macro-function"]
  local macroexpand = _g327.macroexpand
  local quote_modules = _g327["quote-modules"]
  local module_key = _g327["module-key"]
  local stash42 = _g327["stash*"]
  local module = _g327.module
  local valid_id63 = _g327["valid-id?"]
  local indentation = _g327.indentation
  local macro63 = _g327["macro?"]
  local special63 = _g327["special?"]
  local quoted = _g327.quoted
  local symbol_expansion = _g327["symbol-expansion"]
  local bind = _g327.bind
  local symbol63 = _g327["symbol?"]
  local mapo = _g327.mapo
  local exported = _g327.exported
  local special_form63 = _g327["special-form?"]
  local bind42 = _g327["bind*"]
  local getenv = _g327.getenv
  local initial_environment = _g327["initial-environment"]
  local toplevel63 = _g327["toplevel?"]
  local variable63 = _g327["variable?"]
  local _g330 = nexus.compiler
  local compile_special = _g330["compile-special"]
  local compile = _g330.compile
  local compile_branch = _g330["compile-branch"]
  local compile_call = _g330["compile-call"]
  local compile_module = _g330["compile-module"]
  local eval = _g330.eval
  local load_module = _g330["load-module"]
  local open_module = _g330["open-module"]
  local in_module = _g330["in-module"]
  local compile_body = _g330["compile-body"]
  local compile_function = _g330["compile-function"]
  target = "lua"
end)();
(function ()
  local _g607 = nexus.runtime
  local parse_number = _g607["parse-number"]
  local add = _g607.add
  local reduce = _g607.reduce
  local _62 = _g607[">"]
  local _61 = _g607["="]
  local _60 = _g607["<"]
  local id_literal63 = _g607["id-literal?"]
  local code = _g607.code
  local _37 = _g607["%"]
  local _43 = _g607["+"]
  local _42 = _g607["*"]
  local keys63 = _g607["keys?"]
  local _47 = _g607["/"]
  local _ = _g607["-"]
  local drop = _g607.drop
  local some63 = _g607["some?"]
  local sub = _g607.sub
  local stash = _g607.stash
  local unstash = _g607.unstash
  local string63 = _g607["string?"]
  local make_id = _g607["make-id"]
  local replicate = _g607.replicate
  local pairwise = _g607.pairwise
  local _6261 = _g607[">="]
  local apply = _g607.apply
  local function63 = _g607["function?"]
  local iterate = _g607.iterate
  local write_file = _g607["write-file"]
  local length = _g607.length
  local cat = _g607.cat
  local to_string = _g607["to-string"]
  local find = _g607.find
  local composite63 = _g607["composite?"]
  local atom63 = _g607["atom?"]
  local extend = _g607.extend
  local nil63 = _g607["nil?"]
  local tl = _g607.tl
  local write = _g607.write
  local setenv = _g607.setenv
  local search = _g607.search
  local hd = _g607.hd
  local string_literal63 = _g607["string-literal?"]
  local exclude = _g607.exclude
  local join = _g607.join
  local keep = _g607.keep
  local number63 = _g607["number?"]
  local sublist = _g607.sublist
  local splice = _g607.splice
  local last = _g607.last
  local is63 = _g607["is?"]
  local reverse = _g607.reverse
  local _6061 = _g607["<="]
  local list63 = _g607["list?"]
  local substring = _g607.substring
  local boolean63 = _g607["boolean?"]
  local char = _g607.char
  local split = _g607.split
  local map = _g607.map
  local table63 = _g607["table?"]
  local _37message_handler = _g607["%message-handler"]
  local empty63 = _g607["empty?"]
  local inner = _g607.inner
  local read_file = _g607["read-file"]
  local exit = _g607.exit
  local _g608 = nexus.utilities
  local quote_environment = _g608["quote-environment"]
  local imported = _g608.imported
  local quasiexpand = _g608.quasiexpand
  local bound63 = _g608["bound?"]
  local to_id = _g608["to-id"]
  local macro_function = _g608["macro-function"]
  local macroexpand = _g608.macroexpand
  local quote_modules = _g608["quote-modules"]
  local module_key = _g608["module-key"]
  local stash42 = _g608["stash*"]
  local module = _g608.module
  local valid_id63 = _g608["valid-id?"]
  local indentation = _g608.indentation
  local macro63 = _g608["macro?"]
  local special63 = _g608["special?"]
  local quoted = _g608.quoted
  local symbol_expansion = _g608["symbol-expansion"]
  local bind = _g608.bind
  local symbol63 = _g608["symbol?"]
  local mapo = _g608.mapo
  local exported = _g608.exported
  local special_form63 = _g608["special-form?"]
  local bind42 = _g608["bind*"]
  local getenv = _g608.getenv
  local initial_environment = _g608["initial-environment"]
  local toplevel63 = _g608["toplevel?"]
  local variable63 = _g608["variable?"]
  local _g611 = nexus.compiler
  local compile_special = _g611["compile-special"]
  local compile = _g611.compile
  local compile_branch = _g611["compile-branch"]
  local compile_call = _g611["compile-call"]
  local compile_module = _g611["compile-module"]
  local eval = _g611.eval
  local load_module = _g611["load-module"]
  local open_module = _g611["open-module"]
  local in_module = _g611["in-module"]
  local compile_body = _g611["compile-body"]
  local compile_function = _g611["compile-function"]
  modules = {system = {export = {nexus = {global = true, export = true, module = "system"}}, import = {"special", "core"}}, utilities = {export = {["quote-frame"] = {variable = true, module = "utilities"}, ["numeric?"] = {variable = true, module = "utilities"}, ["quote-environment"] = {export = true, variable = true, module = "utilities"}, imported = {export = true, variable = true, module = "utilities"}, ["indent-level"] = {global = true, export = true, module = "utilities"}, quasiexpand = {export = true, variable = true, module = "utilities"}, ["valid-char?"] = {variable = true, module = "utilities"}, ["bound?"] = {export = true, variable = true, module = "utilities"}, ["quote-binding"] = {variable = true, module = "utilities"}, ["to-id"] = {export = true, variable = true, module = "utilities"}, ["macro-function"] = {export = true, variable = true, module = "utilities"}, macroexpand = {export = true, variable = true, module = "utilities"}, ["quote-modules"] = {export = true, variable = true, module = "utilities"}, ["module-key"] = {export = true, variable = true, module = "utilities"}, ["stash*"] = {export = true, variable = true, module = "utilities"}, ["quasisplice?"] = {variable = true, module = "utilities"}, ["quasiquote-list"] = {variable = true, module = "utilities"}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, export = true, module = "utilities"}, ["quote-module"] = {variable = true, module = "utilities"}, module = {export = true, variable = true, module = "utilities"}, ["can-unquote?"] = {variable = true, module = "utilities"}, ["valid-id?"] = {export = true, variable = true, module = "utilities"}, indentation = {export = true, variable = true, module = "utilities"}, ["macro?"] = {export = true, variable = true, module = "utilities"}, ["special?"] = {export = true, variable = true, module = "utilities"}, ["global?"] = {variable = true, module = "utilities"}, quoted = {export = true, variable = true, module = "utilities"}, reserved = {variable = true, module = "utilities"}, ["symbol-expansion"] = {export = true, variable = true, module = "utilities"}, bind = {export = true, variable = true, module = "utilities"}, ["symbol?"] = {export = true, variable = true, module = "utilities"}, mapo = {export = true, variable = true, module = "utilities"}, exported = {export = true, variable = true, module = "utilities"}, ["quasiquoting?"] = {variable = true, module = "utilities"}, ["quoting?"] = {variable = true, module = "utilities"}, ["special-form?"] = {export = true, variable = true, module = "utilities"}, ["bind*"] = {export = true, variable = true, module = "utilities"}, escape = {variable = true, module = "utilities"}, getenv = {export = true, variable = true, module = "utilities"}, ["initial-environment"] = {export = true, variable = true, module = "utilities"}, ["toplevel?"] = {export = true, variable = true, module = "utilities"}, ["variable?"] = {export = true, variable = true, module = "utilities"}}, import = {"runtime", "special", "core"}}, lib = {export = {}, import = {"core", "special"}}, reader = {export = {delimiters = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}, whitespace = {variable = true, module = "reader"}, ["read-all"] = {export = true, variable = true, module = "reader"}, ["read-from-string"] = {export = true, variable = true, module = "reader"}, ["read-table"] = {export = true, variable = true, module = "reader"}, ["skip-non-code"] = {variable = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, ["define-reader"] = {macro = function (_g624, ...)
    local char = _g624[1]
    local stream = _g624[2]
    local body = unstash({...})
    local _g625 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g625)}))
  end, export = true, module = "reader"}, read = {export = true, variable = true, module = "reader"}, ["make-stream"] = {export = true, variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}}, import = {"runtime", "special", "core"}}, runtime = {export = {["parse-number"] = {export = true, variable = true, module = "runtime"}, add = {export = true, variable = true, module = "runtime"}, reduce = {export = true, variable = true, module = "runtime"}, [">"] = {export = true, variable = true, module = "runtime"}, ["="] = {export = true, variable = true, module = "runtime"}, ["<"] = {export = true, variable = true, module = "runtime"}, ["id-literal?"] = {export = true, variable = true, module = "runtime"}, code = {export = true, variable = true, module = "runtime"}, ["%"] = {export = true, variable = true, module = "runtime"}, ["+"] = {export = true, variable = true, module = "runtime"}, ["*"] = {export = true, variable = true, module = "runtime"}, ["keys?"] = {export = true, variable = true, module = "runtime"}, ["/"] = {export = true, variable = true, module = "runtime"}, ["-"] = {export = true, variable = true, module = "runtime"}, drop = {export = true, variable = true, module = "runtime"}, ["some?"] = {export = true, variable = true, module = "runtime"}, sub = {export = true, variable = true, module = "runtime"}, stash = {export = true, variable = true, module = "runtime"}, unstash = {export = true, variable = true, module = "runtime"}, ["string?"] = {export = true, variable = true, module = "runtime"}, ["make-id"] = {export = true, variable = true, module = "runtime"}, replicate = {export = true, variable = true, module = "runtime"}, pairwise = {export = true, variable = true, module = "runtime"}, ["id-count"] = {variable = true, module = "runtime"}, [">="] = {export = true, variable = true, module = "runtime"}, apply = {export = true, variable = true, module = "runtime"}, ["function?"] = {export = true, variable = true, module = "runtime"}, iterate = {export = true, variable = true, module = "runtime"}, ["write-file"] = {export = true, variable = true, module = "runtime"}, length = {export = true, variable = true, module = "runtime"}, cat = {export = true, variable = true, module = "runtime"}, ["to-string"] = {export = true, variable = true, module = "runtime"}, find = {export = true, variable = true, module = "runtime"}, mapl = {variable = true, module = "runtime"}, ["composite?"] = {export = true, variable = true, module = "runtime"}, ["atom?"] = {export = true, variable = true, module = "runtime"}, extend = {export = true, variable = true, module = "runtime"}, ["nil?"] = {export = true, variable = true, module = "runtime"}, tl = {export = true, variable = true, module = "runtime"}, write = {export = true, variable = true, module = "runtime"}, setenv = {export = true, variable = true, module = "runtime"}, search = {export = true, variable = true, module = "runtime"}, hd = {export = true, variable = true, module = "runtime"}, ["string-literal?"] = {export = true, variable = true, module = "runtime"}, ["splice?"] = {variable = true, module = "runtime"}, exclude = {export = true, variable = true, module = "runtime"}, join = {export = true, variable = true, module = "runtime"}, keep = {export = true, variable = true, module = "runtime"}, ["number?"] = {export = true, variable = true, module = "runtime"}, sublist = {export = true, variable = true, module = "runtime"}, splice = {export = true, variable = true, module = "runtime"}, last = {export = true, variable = true, module = "runtime"}, ["is?"] = {export = true, variable = true, module = "runtime"}, reverse = {export = true, variable = true, module = "runtime"}, ["<="] = {export = true, variable = true, module = "runtime"}, ["list?"] = {export = true, variable = true, module = "runtime"}, substring = {export = true, variable = true, module = "runtime"}, ["boolean?"] = {export = true, variable = true, module = "runtime"}, char = {export = true, variable = true, module = "runtime"}, split = {export = true, variable = true, module = "runtime"}, map = {export = true, variable = true, module = "runtime"}, ["table?"] = {export = true, variable = true, module = "runtime"}, ["%message-handler"] = {export = true, variable = true, module = "runtime"}, ["empty?"] = {export = true, variable = true, module = "runtime"}, inner = {export = true, variable = true, module = "runtime"}, ["read-file"] = {export = true, variable = true, module = "runtime"}, exit = {export = true, variable = true, module = "runtime"}}, import = {"special", "core"}}, core = {export = {["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g626 = xs
      local i = 0
      while (i < length(_g626)) do
        local x = _g626[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, module = "core", export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g627 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g628)
      local lh = _g628[1]
      local rh = _g628[2]
      local _g629 = bind(lh, rh)
      local _g630 = 0
      while (_g630 < length(_g629)) do
        local _g631 = _g629[(_g630 + 1)]
        local id = _g631[1]
        local val = _g631[2]
        if (bound63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g630 = (_g630 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g627)})))
  end, module = "core", export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, module = "core", export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g632 = sub(body, 0)
    local form = join({"fn", args}, _g632)
    eval(join((function ()
      local _g633 = {"setenv", join({"quote", name})}
      _g633.macro = form
      _g633.form = join({"quote", form})
      return(_g633)
    end)()))
    return(nil)
  end, module = "core", export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g634 = sub(body, 0)
    local imports = {}
    local imp = _g634.import
    local exp = _g634.export
    local _g635 = (imp or {})
    local _g636 = 0
    while (_g636 < length(_g635)) do
      local k = _g635[(_g636 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g636 = (_g636 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g637 = (exp or {})
    local _g638 = 0
    while (_g638 < length(_g637)) do
      local k = _g637[(_g638 + 1)]
      setenv(k, {_stash = true, export = true})
      _g638 = (_g638 + 1)
    end
    return(join({"do"}, imports))
  end, module = "core", export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g639 = sub(body, 0)
    add(environment, {})
    local _g640 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g639)))
    end)()
    drop(environment)
    return(_g640)
  end, module = "core", export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, module = "core", export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, module = "core", export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g641 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g641)}))
  end, module = "core", export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core", global = true, export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, module = "core", export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g642 = sub(body, 0)
    local _g643 = bind42(args, _g642)
    local _g644 = _g643[1]
    local _g645 = _g643[2]
    return(join({"%function", _g644}, _g645))
  end, module = "core", export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g646 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g646), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g647 = {"target"}
          _g647.js = join({"isNaN", join({"parseInt", k})})
          _g647.lua = join({"not", join({"number?", k})})
          return(_g647)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g646)})})}))
      end
    end)()}))
  end, module = "core", export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g648 = elements
    local _g649 = 0
    while (_g649 < length(_g648)) do
      local e = _g648[(_g649 + 1)]
      l[e] = true
      _g649 = (_g649 + 1)
    end
    return(join({"table"}, l))
  end, module = "core", export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g325, x)
      return(x)
    end, body)))
  end, module = "core", export = true}, language = {macro = function ()
    return(join({"quote", target}))
  end, module = "core", export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, module = "core", export = true}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, module = "core", export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g650 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g650)}))
  end, module = "core", export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g651 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g651)}))
  end, module = "core", export = true}, ["with-bindings"] = {macro = function (_g652, ...)
    local names = _g652[1]
    local body = unstash({...})
    local _g653 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g654 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g655 = {"setenv", x}
        _g655.variable = true
        return(_g655)
      end)())})}
      _g654.scope = true
      return(_g654)
    end)(), _g653))
  end, module = "core", export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g656 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g656)) then
      local _g657 = bind42(x, _g656)
      local args = _g657[1]
      local _g658 = _g657[2]
      return(join({"%global-function", name, args}, _g658))
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
  end, module = "core", export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g659 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g660 = {"table"}
      _g660._scope = scope
      return(_g660)
    end)())}), join({"let", join({x, join({"do"}, _g659)}), join({"drop", "environment"}), x})}))
  end, module = "core", export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g661 = sub(body, 0)
    add(environment, {})
    local _g662 = (function ()
      map(function (_g663)
        local name = _g663[1]
        local exp = _g663[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g661)))
    end)()
    drop(environment)
    return(_g662)
  end, module = "core", export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g664 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g664)) then
      local _g665 = bind42(x, _g664)
      local args = _g665[1]
      local _g666 = _g665[2]
      return(join({"%local-function", name, args}, _g666))
    else
      return(join({"%local", name, x}))
    end
  end, module = "core", export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g667 = sub(body, 0)
    local form = join({"fn", args}, _g667)
    local keys = sub(_g667, length(_g667))
    eval(join((function ()
      local _g668 = {"setenv", join({"quote", name})}
      _g668.form = join({"quote", form})
      _g668.special = form
      return(_g668)
    end)(), keys))
    return(nil)
  end, module = "core", export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g669 = body
      local k = nil
      for k in next, _g669 do
        if (not number63(k)) then
          local v = _g669[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, module = "core", export = true}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, module = "core", export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, special = {export = {["%global-function"] = {stmt = true, export = true, tr = true, special = function (_g670)
    local name = _g670[1]
    local args = _g670[2]
    local body = sub(_g670, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, module = "special"}, ["if"] = {stmt = true, export = true, tr = true, special = function (form, tail63)
    local str = ""
    local _g671 = form
    local i = 0
    while (i < length(_g671)) do
      local condition = _g671[(i + 1)]
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
  end, module = "special"}, ["set"] = {module = "special", stmt = true, special = function (_g672)
    local lh = _g672[1]
    local rh = _g672[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true}, ["do"] = {stmt = true, export = true, tr = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, module = "special"}, ["%local-function"] = {stmt = true, export = true, tr = true, special = function (_g673)
    local name = _g673[1]
    local args = _g673[2]
    local body = sub(_g673, 2)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, module = "special"}, ["return"] = {module = "special", stmt = true, special = function (_g674)
    local x = _g674[1]
    local _g675 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g675))
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
    local _g676 = pairs
    local i = 0
    while (i < length(_g676)) do
      local _g677 = _g676[(i + 1)]
      local k = _g677[1]
      local v = _g677[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g678 = compile(v)
      local _g679 = (function ()
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
      str = (str .. _g679 .. sep .. _g678)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true}, ["%function"] = {module = "special", special = function (_g680)
    local args = _g680[1]
    local body = sub(_g680, 1)
    return(compile_function(args, body))
  end, export = true}, ["error"] = {module = "special", stmt = true, special = function (_g681)
    local x = _g681[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true}, ["not"] = {module = "special", special = function (_g682)
    local x = _g682[1]
    local _g683 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g683 .. ")"))
  end, export = true}, ["%for"] = {stmt = true, export = true, tr = true, special = function (_g684)
    local _g685 = _g684[1]
    local t = _g685[1]
    local k = _g685[2]
    local body = sub(_g684, 1)
    local _g686 = compile(t)
    local ind = indentation()
    local _g687 = (function ()
      indent_level = (indent_level + 1)
      local _g688 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g688)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g686 .. " do\n" .. _g687 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g686 .. ") {\n" .. _g687 .. ind .. "}\n"))
    end
  end, module = "special"}, ["while"] = {stmt = true, export = true, tr = true, special = function (_g689)
    local condition = _g689[1]
    local body = sub(_g689, 1)
    local _g690 = compile(condition)
    local _g691 = (function ()
      indent_level = (indent_level + 1)
      local _g692 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g692)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g690 .. ") {\n" .. _g691 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g690 .. " do\n" .. _g691 .. ind .. "end\n"))
    end
  end, module = "special"}, ["%local"] = {module = "special", stmt = true, special = function (_g693)
    local name = _g693[1]
    local value = _g693[2]
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
  end, export = true}, ["%try"] = {stmt = true, export = true, tr = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g694 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g694)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g695 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g695)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, module = "special"}, ["%array"] = {module = "special", special = function (forms)
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
    local _g696 = forms
    local i = 0
    while (i < length(_g696)) do
      local x = _g696[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true}, ["break"] = {module = "special", stmt = true, special = function (_g134)
    return((indentation() .. "break"))
  end, export = true}, ["get"] = {module = "special", special = function (_g697)
    local t = _g697[1]
    local k = _g697[2]
    local _g698 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g698, 0) == "{")) then
      _g698 = ("(" .. _g698 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g698 .. "." .. inner(k)))
    else
      return((_g698 .. "[" .. k1 .. "]"))
    end
  end, export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, boot = {export = {}, import = {"runtime", "utilities", "special", "core", "compiler"}}, compiler = {export = {["compile-args"] = {variable = true, module = "compiler"}, ["compile-special"] = {export = true, variable = true, module = "compiler"}, compile = {export = true, variable = true, module = "compiler"}, ["current-module"] = {global = true, export = true, module = "compiler"}, ["compile-branch"] = {export = true, variable = true, module = "compiler"}, ["%compile-module"] = {variable = true, module = "compiler"}, ["compile-call"] = {export = true, variable = true, module = "compiler"}, ["compile-module"] = {export = true, variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["compilation-level"] = {global = true, export = true, module = "compiler"}, eval = {export = true, variable = true, module = "compiler"}, ["module-path"] = {variable = true, module = "compiler"}, ["load-module"] = {export = true, variable = true, module = "compiler"}, ["open-module"] = {export = true, variable = true, module = "compiler"}, ["compile-only"] = {macro = function (...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    if number63(compilation_level) then
      return(join({"do"}, _g699))
    end
  end, export = true, module = "compiler"}, run = {variable = true, module = "compiler"}, encapsulate = {variable = true, module = "compiler"}, prologue = {variable = true, module = "compiler"}, terminator = {variable = true, module = "compiler"}, ["in-module"] = {export = true, variable = true, module = "compiler"}, ["can-return?"] = {variable = true, module = "compiler"}, ["%result"] = {global = true, export = true, module = "compiler"}, ["compile-body"] = {export = true, variable = true, module = "compiler"}, ["compile-function"] = {export = true, variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, infix = {variable = true, module = "compiler"}, ["compiler-output"] = {variable = true, module = "compiler"}}, import = {"runtime", "utilities", "special", "core", "reader"}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g700 = sub(body, 0)
    local imports = {}
    local imp = _g700.import
    local exp = _g700.export
    local _g701 = (imp or {})
    local _g702 = 0
    while (_g702 < length(_g701)) do
      local k = _g701[(_g702 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g702 = (_g702 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g703 = (exp or {})
    local _g704 = 0
    while (_g704 < length(_g703)) do
      local k = _g703[(_g704 + 1)]
      setenv(k, {_stash = true, export = true})
      _g704 = (_g704 + 1)
    end
    return(join({"do"}, imports))
  end, module = "core", export = true}}}
end)();
(function ()
  local _g41 = nexus.runtime
  local parse_number = _g41["parse-number"]
  local add = _g41.add
  local reduce = _g41.reduce
  local _62 = _g41[">"]
  local _61 = _g41["="]
  local _60 = _g41["<"]
  local id_literal63 = _g41["id-literal?"]
  local code = _g41.code
  local _37 = _g41["%"]
  local _43 = _g41["+"]
  local _42 = _g41["*"]
  local keys63 = _g41["keys?"]
  local _47 = _g41["/"]
  local _ = _g41["-"]
  local drop = _g41.drop
  local some63 = _g41["some?"]
  local sub = _g41.sub
  local stash = _g41.stash
  local unstash = _g41.unstash
  local string63 = _g41["string?"]
  local make_id = _g41["make-id"]
  local replicate = _g41.replicate
  local pairwise = _g41.pairwise
  local _6261 = _g41[">="]
  local apply = _g41.apply
  local function63 = _g41["function?"]
  local iterate = _g41.iterate
  local write_file = _g41["write-file"]
  local length = _g41.length
  local cat = _g41.cat
  local to_string = _g41["to-string"]
  local find = _g41.find
  local composite63 = _g41["composite?"]
  local atom63 = _g41["atom?"]
  local extend = _g41.extend
  local nil63 = _g41["nil?"]
  local tl = _g41.tl
  local write = _g41.write
  local setenv = _g41.setenv
  local search = _g41.search
  local hd = _g41.hd
  local string_literal63 = _g41["string-literal?"]
  local exclude = _g41.exclude
  local join = _g41.join
  local keep = _g41.keep
  local number63 = _g41["number?"]
  local sublist = _g41.sublist
  local splice = _g41.splice
  local last = _g41.last
  local is63 = _g41["is?"]
  local reverse = _g41.reverse
  local _6061 = _g41["<="]
  local list63 = _g41["list?"]
  local substring = _g41.substring
  local boolean63 = _g41["boolean?"]
  local char = _g41.char
  local split = _g41.split
  local map = _g41.map
  local table63 = _g41["table?"]
  local _37message_handler = _g41["%message-handler"]
  local empty63 = _g41["empty?"]
  local inner = _g41.inner
  local read_file = _g41["read-file"]
  local exit = _g41.exit
  local _g83 = nexus.utilities
  local quote_environment = _g83["quote-environment"]
  local imported = _g83.imported
  local quasiexpand = _g83.quasiexpand
  local bound63 = _g83["bound?"]
  local to_id = _g83["to-id"]
  local macro_function = _g83["macro-function"]
  local macroexpand = _g83.macroexpand
  local quote_modules = _g83["quote-modules"]
  local module_key = _g83["module-key"]
  local stash42 = _g83["stash*"]
  local module = _g83.module
  local valid_id63 = _g83["valid-id?"]
  local indentation = _g83.indentation
  local macro63 = _g83["macro?"]
  local special63 = _g83["special?"]
  local quoted = _g83.quoted
  local symbol_expansion = _g83["symbol-expansion"]
  local bind = _g83.bind
  local symbol63 = _g83["symbol?"]
  local mapo = _g83.mapo
  local exported = _g83.exported
  local special_form63 = _g83["special-form?"]
  local bind42 = _g83["bind*"]
  local getenv = _g83.getenv
  local initial_environment = _g83["initial-environment"]
  local toplevel63 = _g83["toplevel?"]
  local variable63 = _g83["variable?"]
  local _g96 = nexus.reader
  local read_all = _g96["read-all"]
  local read_from_string = _g96["read-from-string"]
  local read_table = _g96["read-table"]
  local read = _g96.read
  local make_stream = _g96["make-stream"]
  local _g133 = nexus.compiler
  local compile_special = _g133["compile-special"]
  local compile = _g133.compile
  local compile_branch = _g133["compile-branch"]
  local compile_call = _g133["compile-call"]
  local compile_module = _g133["compile-module"]
  local eval = _g133.eval
  local load_module = _g133["load-module"]
  local open_module = _g133["open-module"]
  local in_module = _g133["in-module"]
  local compile_body = _g133["compile-body"]
  local compile_function = _g133["compile-function"]
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
  _g711.usage = usage
  _g711.rep = rep
  _g711.repl = repl
  _g711.main = main
end)();
