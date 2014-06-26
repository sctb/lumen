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
  local function none63(x)
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
    local _g20 = (upto or length(l))
    local l2 = {}
    while (i < _g20) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  local function sub(x, from, upto)
    local _g21 = (from or 0)
    if string63(x) then
      return(substring(x, _g21, upto))
    else
      local l = sublist(x, _g21, upto)
      local _g22 = x
      local k = nil
      for k in next, _g22 do
        if (not number63(k)) then
          local v = _g22[k]
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
    local _g23
    if n then
      _g23 = (n + 1)
    end
    return((string.byte)(str, _g23))
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
    local l1 = sub(l, length(l))
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
    else
      if nil63(l1) then
        return(join({}, l2))
      else
        if nil63(l2) then
          return(join(l1, {}))
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
    end
  end
  local function reduce(f, x)
    if none63(x) then
      return(x)
    else
      if (length(x) == 1) then
        return(hd(x))
      else
        return(f(hd(x), reduce(f, tl(x))))
      end
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
      else
        if is63(_g33) then
          add(l1, _g33)
        end
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
        else
          if is63(x) then
            l[k] = x
          end
        end
      end
    end
    return(l)
  end
  local function keys63(t)
    local k63 = false
    local _g35 = t
    local k = nil
    for k in next, _g35 do
      if (not number63(k)) then
        local v = _g35[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  local function empty63(t)
    return((none63(t) and (not keys63(t))))
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
    if none63(args) then
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
            if (not (k == "_stash")) then
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
  local function extend(t, ...)
    local xs = unstash({...})
    local _g38 = sub(xs, 0)
    return(join(t, _g38))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g39 = sub(keys, 0)
    local t1 = sublist(t)
    local _g40 = t
    local k = nil
    for k in next, _g40 do
      if (not number63(k)) then
        local v = _g40[k]
        if (not _g39[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g42
    if start then
      _g42 = (start + 1)
    end
    local _g41 = _g42
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
    local _g43 = sub(xs, 0)
    if none63(_g43) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g43))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g44 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g44))
  end
  local function _(...)
    local xs = unstash({...})
    local _g45 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g45)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g46))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g47)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g48)))
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
    else
      if boolean63(x) then
        if x then
          return("true")
        else
          return("false")
        end
      else
        if function63(x) then
          return("#<function>")
        else
          if atom63(x) then
            return((x .. ""))
          else
            local str = "("
            local x1 = sub(x)
            local _g49 = x
            local k = nil
            for k in next, _g49 do
              if (not number63(k)) then
                local v = _g49[k]
                add(x1, (k .. ":"))
                add(x1, v)
              end
            end
            local _g50 = x1
            local i = 0
            while (i < length(_g50)) do
              local y = _g50[(i + 1)]
              str = (str .. to_string(y))
              if (i < (length(x1) - 1)) then
                str = (str .. " ")
              end
              i = (i + 1)
            end
            return((str .. ")"))
          end
        end
      end
    end
  end
  local function apply(f, args)
    local _g51 = stash(args)
    return(f(unpack(_g51)))
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
  local function toplevel63()
    return((length(environment) == 1))
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
  local function setenv(k, ...)
    local keys = unstash({...})
    local _g52 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local _g53 = _g52
      local k1 = nil
      for k1 in next, _g53 do
        if (not number63(k1)) then
          local v = _g53[k1]
          x[k1] = v
        end
      end
      if toplevel63() then
        local m = module(current_module)
        m.export[k] = x
      end
      frame[k] = x
    end
  end
  local _g54 = {}
  nexus.runtime = _g54
  _g54["atom?"] = atom63
  _g54["write-file"] = write_file
  _g54.splice = splice
  _g54["number?"] = number63
  _g54.iterate = iterate
  _g54.cat = cat
  _g54.extend = extend
  _g54["make-id"] = make_id
  _g54.drop = drop
  _g54.find = find
  _g54["list?"] = list63
  _g54["string?"] = string63
  _g54["id-literal?"] = id_literal63
  _g54["none?"] = none63
  _g54.split = split
  _g54["/"] = _47
  _g54.stash = stash
  _g54["-"] = _
  _g54["keys?"] = keys63
  _g54.inner = inner
  _g54["splice?"] = splice63
  _g54["nil?"] = nil63
  _g54.last = last
  _g54.join = join
  _g54["toplevel?"] = toplevel63
  _g54["%"] = _37
  _g54["*"] = _42
  _g54["+"] = _43
  _g54.char = char
  _g54.replicate = replicate
  _g54.reverse = reverse
  _g54.hd = hd
  _g54["to-string"] = to_string
  _g54.exit = exit
  _g54.sublist = sublist
  _g54["string-literal?"] = string_literal63
  _g54[">"] = _62
  _g54["<"] = _60
  _g54["="] = _61
  _g54["composite?"] = composite63
  _g54.unstash = unstash
  _g54["boolean?"] = boolean63
  _g54.setenv = setenv
  _g54["%message-handler"] = _37message_handler
  _g54["parse-number"] = parse_number
  _g54.sub = sub
  _g54.tl = tl
  _g54.apply = apply
  _g54.pairwise = pairwise
  _g54["id-count"] = id_count
  _g54.mapl = mapl
  _g54.module = module
  _g54.code = code
  _g54.map = map
  _g54["module-key"] = module_key
  _g54["read-file"] = read_file
  _g54.keep = keep
  _g54.length = length
  _g54.reduce = reduce
  _g54["function?"] = function63
  _g54.write = write
  _g54["some?"] = some63
  _g54.substring = substring
  _g54["<="] = _6061
  _g54.add = add
  _g54[">="] = _6261
  _g54["is?"] = is63
  _g54["empty?"] = empty63
  _g54.search = search
  _g54["table?"] = table63
  _g54.exclude = exclude
end)();
(function ()
  local _g59 = nexus.runtime
  local atom63 = _g59["atom?"]
  local write_file = _g59["write-file"]
  local splice = _g59.splice
  local number63 = _g59["number?"]
  local iterate = _g59.iterate
  local cat = _g59.cat
  local extend = _g59.extend
  local make_id = _g59["make-id"]
  local drop = _g59.drop
  local find = _g59.find
  local list63 = _g59["list?"]
  local string63 = _g59["string?"]
  local id_literal63 = _g59["id-literal?"]
  local none63 = _g59["none?"]
  local split = _g59.split
  local _47 = _g59["/"]
  local stash = _g59.stash
  local _ = _g59["-"]
  local keys63 = _g59["keys?"]
  local inner = _g59.inner
  local nil63 = _g59["nil?"]
  local last = _g59.last
  local join = _g59.join
  local toplevel63 = _g59["toplevel?"]
  local _37 = _g59["%"]
  local _42 = _g59["*"]
  local _43 = _g59["+"]
  local char = _g59.char
  local replicate = _g59.replicate
  local reverse = _g59.reverse
  local hd = _g59.hd
  local to_string = _g59["to-string"]
  local exit = _g59.exit
  local sublist = _g59.sublist
  local string_literal63 = _g59["string-literal?"]
  local _62 = _g59[">"]
  local _60 = _g59["<"]
  local _61 = _g59["="]
  local composite63 = _g59["composite?"]
  local unstash = _g59.unstash
  local boolean63 = _g59["boolean?"]
  local setenv = _g59.setenv
  local _37message_handler = _g59["%message-handler"]
  local parse_number = _g59["parse-number"]
  local sub = _g59.sub
  local tl = _g59.tl
  local apply = _g59.apply
  local pairwise = _g59.pairwise
  local module = _g59.module
  local code = _g59.code
  local map = _g59.map
  local module_key = _g59["module-key"]
  local read_file = _g59["read-file"]
  local keep = _g59.keep
  local length = _g59.length
  local reduce = _g59.reduce
  local function63 = _g59["function?"]
  local write = _g59.write
  local some63 = _g59["some?"]
  local substring = _g59.substring
  local _6061 = _g59["<="]
  local add = _g59.add
  local _6261 = _g59[">="]
  local is63 = _g59["is?"]
  local empty63 = _g59["empty?"]
  local search = _g59.search
  local table63 = _g59["table?"]
  local exclude = _g59.exclude
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g62 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g63 = nil
        local _g64 = _g62
        local x = nil
        for x in next, _g64 do
          if (not number63(x)) then
            local _g55 = _g64[x]
            _g63 = x
          end
        end
        if _g63 then
          return(b[_g63])
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
  local function statement63(k)
    return((special63(k) and getenv(k, {_stash = true, stmt = true})))
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
      local _g65
      if (c == "\n") then
        _g65 = "\\n"
      else
        local _g66
        if (c == "\"") then
          _g66 = "\\\""
        else
          local _g67
          if (c == "\\") then
            _g67 = "\\\\"
          else
            _g67 = c
          end
          _g66 = _g67
        end
        _g65 = _g66
      end
      local c1 = _g65
      str1 = (str1 .. c1)
      i = (i + 1)
    end
    return((str1 .. "\""))
  end
  local function quoted(form)
    if string63(form) then
      return(escape(form))
    else
      if atom63(form) then
        return(form)
      else
        return(join({"list"}, map(quoted, form)))
      end
    end
  end
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local _g68 = args
      local k = nil
      for k in next, _g68 do
        if (not number63(k)) then
          local v = _g68[k]
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
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local r = lh.rest
        local _g69 = lh
        local i = 0
        while (i < length(_g69)) do
          local x = _g69[(i + 1)]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = (i + 1)
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g70 = lh
        local k = nil
        for k in next, _g70 do
          if (not number63(k)) then
            local v = _g70[k]
            if (v == true) then
              v = k
            end
            if (not (k == "rest")) then
              bs = join(bs, bind(v, {"get", rh, {"quote", k}}))
            end
          end
        end
        return(bs)
      end
    end
  end
  local function bind42(args, body)
    local args1 = {}
    local function rest()
      if (target == "js") then
        return({"unstash", {"sublist", "arguments", length(args1)}})
      else
        add(args1, "|...|")
        return({"unstash", {"list", "|...|"}})
      end
    end
    if atom63(args) then
      return({args1, {join({"let", {args, rest()}}, body)}})
    else
      local bs = {}
      local r = (args.rest or (keys63(args) and make_id()))
      local _g71 = args
      local _g72 = 0
      while (_g72 < length(_g71)) do
        local arg = _g71[(_g72 + 1)]
        if atom63(arg) then
          add(args1, arg)
        else
          if (list63(arg) or keys63(arg)) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g72 = (_g72 + 1)
      end
      if r then
        bs = join(bs, {r, rest()})
      end
      if keys63(args) then
        bs = join(bs, {sub(args, length(args)), r})
      end
      if none63(bs) then
        return({args1, body})
      else
        return({args1, {join({"let", bs}, body)}})
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
    else
      if atom63(form) then
        return(form)
      else
        local x = hd(form)
        if (x == "%function") then
          local _g56 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g75 = args
          local _g76 = 0
          while (_g76 < length(_g75)) do
            local _g73 = _g75[(_g76 + 1)]
            setenv(_g73, {_stash = true, variable = true})
            _g76 = (_g76 + 1)
          end
          local _g74 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g74)
        else
          if ((x == "%local-function") or (x == "%global-function")) then
            local _g57 = form[1]
            local name = form[2]
            local _g77 = form[3]
            local _g78 = sub(form, 3)
            add(environment, {_scope = true})
            local _g81 = _g77
            local _g82 = 0
            while (_g82 < length(_g81)) do
              local _g79 = _g81[(_g82 + 1)]
              setenv(_g79, {_stash = true, variable = true})
              _g82 = (_g82 + 1)
            end
            local _g80 = join({x, name, map(macroexpand, _g77)}, macroexpand(_g78))
            drop(environment)
            return(_g80)
          else
            if macro63(x) then
              return(macroexpand(apply(macro_function(x), tl(form))))
            else
              return(map(macroexpand, form))
            end
          end
        end
      end
    end
  end
  local quasiexpand
  local quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g83 = form
    local k = nil
    for k in next, _g83 do
      if (not number63(k)) then
        local v = _g83[k]
        local _g88
        if quasisplice63(v, depth) then
          _g88 = quasiexpand(v[2])
        else
          _g88 = quasiexpand(v, depth)
        end
        local _g84 = _g88
        last(xs)[k] = _g84
      end
    end
    local _g85 = form
    local _g86 = 0
    while (_g86 < length(_g85)) do
      local x = _g85[(_g86 + 1)]
      if quasisplice63(x, depth) then
        local _g87 = quasiexpand(x[2])
        add(xs, _g87)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g86 = (_g86 + 1)
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
      else
        if (can_unquote63(depth) and (hd(form) == "unquote")) then
          return(quasiexpand(form[2]))
        else
          if ((hd(form) == "unquote") or (hd(form) == "unquote-splicing")) then
            return(quasiquote_list(form, (depth - 1)))
          else
            if (hd(form) == "quasiquote") then
              return(quasiquote_list(form, (depth + 1)))
            else
              return(quasiquote_list(form, depth))
            end
          end
        end
      end
    else
      if atom63(form) then
        return(form)
      else
        if (hd(form) == "quote") then
          return(form)
        else
          if (hd(form) == "quasiquote") then
            return(quasiexpand(form[2], 1))
          else
            return(map(function (x)
              return(quasiexpand(x, depth))
            end, form))
          end
        end
      end
    end
  end
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["new"] = true, ["then"] = true, ["instanceof"] = true, ["do"] = true, ["="] = true, ["throw"] = true, ["and"] = true, ["case"] = true, ["local"] = true, ["try"] = true, ["/"] = true, ["delete"] = true, ["-"] = true, ["debugger"] = true, ["this"] = true, ["or"] = true, ["not"] = true, ["function"] = true, ["finally"] = true, ["=="] = true, ["false"] = true, ["if"] = true, ["switch"] = true, ["elseif"] = true, ["while"] = true, ["in"] = true, ["with"] = true, ["<"] = true, ["nil"] = true, ["true"] = true, [">"] = true, ["%"] = true, ["void"] = true, ["continue"] = true, ["var"] = true, ["catch"] = true, ["for"] = true, ["else"] = true, ["return"] = true, ["typeof"] = true, ["*"] = true, ["break"] = true, ["end"] = true, ["until"] = true, ["default"] = true, [">="] = true, ["repeat"] = true, ["<="] = true, ["+"] = true}
  local function reserved63(x)
    return(reserved[x])
  end
  local function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  local function valid_char63(n)
    return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
  end
  local function valid_id63(id)
    if none63(id) then
      return(false)
    else
      if special63(id) then
        return(false)
      else
        if reserved63(id) then
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
    end
  end
  local function to_id(id)
    local id1 = ""
    local i = 0
    while (i < length(id)) do
      local c = char(id, i)
      local n = code(c)
      local _g93
      if (c == "-") then
        _g93 = "_"
      else
        local _g94
        if valid_char63(n) then
          _g94 = c
        else
          local _g95
          if (i == 0) then
            _g95 = ("_" .. n)
          else
            _g95 = n
          end
          _g94 = _g95
        end
        _g93 = _g94
      end
      local c1 = _g93
      id1 = (id1 .. c1)
      i = (i + 1)
    end
    return(id1)
  end
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g96 = module(current_module).export
    local n = nil
    for n in next, _g96 do
      if (not number63(n)) then
        local b = _g96[n]
        if b.variable then
          add(exports, {"set", {"get", m, {"quote", n}}, n})
        end
      end
    end
    if some63(exports) then
      return(join({{"%local", m, {"table"}}, {"set", {"get", "nexus", {"quote", k}}, m}}, exports))
    else
      return({})
    end
  end
  local function imported(spec, ...)
    local _g97 = unstash({...})
    local all = _g97.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g98 = module(spec).export
      local n = nil
      for n in next, _g98 do
        if (not number63(n)) then
          local b = _g98[n]
          if (b.variable and (all or b.export)) then
            add(imports, {"%local", n, {"get", m, {"quote", n}}})
          end
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, imports))
    end
  end
  local function quote_binding(b)
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
    else
      if (b.macro and b.form) then
        return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
      else
        if (b.special and b.form) then
          return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
        else
          if is63(b.variable) then
            return(b)
          else
            if is63(b.global) then
              return(b)
            end
          end
        end
      end
    end
  end
  local function mapo(f, t)
    local o = {}
    local _g99 = t
    local k = nil
    for k in next, _g99 do
      if (not number63(k)) then
        local v = _g99[k]
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
    return(join({"%object"}, mapo(function (_g58, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    local _g100 = {"table"}
    _g100.export = quote_frame(m.export)
    _g100.import = quoted(m.import)
    return(_g100)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g101 = {}
  nexus.utilities = _g101
  _g101["can-unquote?"] = can_unquote63
  _g101.bind = bind
  _g101["special?"] = special63
  _g101["global?"] = global63
  _g101["quote-environment"] = quote_environment
  _g101["macro?"] = macro63
  _g101.getenv = getenv
  _g101.macroexpand = macroexpand
  _g101.escape = escape
  _g101["quote-modules"] = quote_modules
  _g101.mapo = mapo
  _g101["valid-char?"] = valid_char63
  _g101["stash*"] = stash42
  _g101["symbol-expansion"] = symbol_expansion
  _g101["quote-binding"] = quote_binding
  _g101.indentation = indentation
  _g101["to-id"] = to_id
  _g101["initial-environment"] = initial_environment
  _g101.quasiexpand = quasiexpand
  _g101["numeric?"] = numeric63
  _g101["valid-id?"] = valid_id63
  _g101.reserved = reserved
  _g101["quote-module"] = quote_module
  _g101["quote-frame"] = quote_frame
  _g101["quasiquote-list"] = quasiquote_list
  _g101["symbol?"] = symbol63
  _g101["macro-function"] = macro_function
  _g101["quasisplice?"] = quasisplice63
  _g101["quasiquoting?"] = quasiquoting63
  _g101["quoting?"] = quoting63
  _g101["toplevel?"] = toplevel63
  _g101["special-form?"] = special_form63
  _g101["bind*"] = bind42
  _g101["variable?"] = variable63
  _g101["reserved?"] = reserved63
  _g101.exported = exported
  _g101.quoted = quoted
  _g101["bound?"] = bound63
  _g101.imported = imported
  _g101["statement?"] = statement63
end)();
(function ()
  local _g102 = nexus.runtime
  local atom63 = _g102["atom?"]
  local write_file = _g102["write-file"]
  local splice = _g102.splice
  local number63 = _g102["number?"]
  local iterate = _g102.iterate
  local cat = _g102.cat
  local extend = _g102.extend
  local make_id = _g102["make-id"]
  local drop = _g102.drop
  local find = _g102.find
  local list63 = _g102["list?"]
  local string63 = _g102["string?"]
  local id_literal63 = _g102["id-literal?"]
  local none63 = _g102["none?"]
  local split = _g102.split
  local _47 = _g102["/"]
  local stash = _g102.stash
  local _ = _g102["-"]
  local keys63 = _g102["keys?"]
  local inner = _g102.inner
  local nil63 = _g102["nil?"]
  local last = _g102.last
  local join = _g102.join
  local toplevel63 = _g102["toplevel?"]
  local _37 = _g102["%"]
  local _42 = _g102["*"]
  local _43 = _g102["+"]
  local char = _g102.char
  local replicate = _g102.replicate
  local reverse = _g102.reverse
  local hd = _g102.hd
  local to_string = _g102["to-string"]
  local exit = _g102.exit
  local sublist = _g102.sublist
  local string_literal63 = _g102["string-literal?"]
  local _62 = _g102[">"]
  local _60 = _g102["<"]
  local _61 = _g102["="]
  local composite63 = _g102["composite?"]
  local unstash = _g102.unstash
  local boolean63 = _g102["boolean?"]
  local setenv = _g102.setenv
  local _37message_handler = _g102["%message-handler"]
  local parse_number = _g102["parse-number"]
  local sub = _g102.sub
  local tl = _g102.tl
  local apply = _g102.apply
  local pairwise = _g102.pairwise
  local module = _g102.module
  local code = _g102.code
  local map = _g102.map
  local module_key = _g102["module-key"]
  local read_file = _g102["read-file"]
  local keep = _g102.keep
  local length = _g102.length
  local reduce = _g102.reduce
  local function63 = _g102["function?"]
  local write = _g102.write
  local some63 = _g102["some?"]
  local substring = _g102.substring
  local _6061 = _g102["<="]
  local add = _g102.add
  local _6261 = _g102[">="]
  local is63 = _g102["is?"]
  local empty63 = _g102["empty?"]
  local search = _g102.search
  local table63 = _g102["table?"]
  local exclude = _g102.exclude
  local delimiters = {["\n"] = true, ["("] = true, [")"] = true, [";"] = true}
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
      else
        if whitespace[c] then
          read_char(s)
        else
          if (c == ";") then
            while (c and (not (c == "\n"))) do
              c = read_char(s)
            end
            skip_non_code(s)
          else
            break
          end
        end
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
    else
      if (str == "true") then
        return(true)
      else
        if (str == "false") then
          return(false)
        else
          if (str == "_") then
            return(make_id())
          else
            if dot63 then
              return(reduce(function (a, b)
                return({"get", b, {"quote", a}})
              end, reverse(split(str, "."))))
            else
              return(str)
            end
          end
        end
      end
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
        else
          if flag63(x) then
            l[sub(x, 1)] = true
          else
            add(l, x)
          end
        end
      else
        if c then
          read_char(s)
          break
        else
          error(("Expected ) at " .. s.pos))
        end
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
      else
        if c then
          read_char(s)
          break
        else
          error(("Expected \" at " .. s.pos))
        end
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
      else
        if c then
          read_char(s)
          break
        else
          error(("Expected | at " .. s.pos))
        end
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
  local _g112 = {}
  nexus.reader = _g112
  _g112["read-from-string"] = read_from_string
  _g112["read-table"] = read_table
  _g112.read = read
  _g112["flag?"] = flag63
  _g112["key?"] = key63
  _g112.eof = eof
  _g112["read-all"] = read_all
  _g112["skip-non-code"] = skip_non_code
  _g112["read-char"] = read_char
  _g112["peek-char"] = peek_char
  _g112.whitespace = whitespace
  _g112["make-stream"] = make_stream
  _g112.delimiters = delimiters
end)();
(function ()
  local _g113 = nexus.runtime
  local atom63 = _g113["atom?"]
  local write_file = _g113["write-file"]
  local splice = _g113.splice
  local number63 = _g113["number?"]
  local iterate = _g113.iterate
  local cat = _g113.cat
  local extend = _g113.extend
  local make_id = _g113["make-id"]
  local drop = _g113.drop
  local find = _g113.find
  local list63 = _g113["list?"]
  local string63 = _g113["string?"]
  local id_literal63 = _g113["id-literal?"]
  local none63 = _g113["none?"]
  local split = _g113.split
  local _47 = _g113["/"]
  local stash = _g113.stash
  local _ = _g113["-"]
  local keys63 = _g113["keys?"]
  local inner = _g113.inner
  local nil63 = _g113["nil?"]
  local last = _g113.last
  local join = _g113.join
  local toplevel63 = _g113["toplevel?"]
  local _37 = _g113["%"]
  local _42 = _g113["*"]
  local _43 = _g113["+"]
  local char = _g113.char
  local replicate = _g113.replicate
  local reverse = _g113.reverse
  local hd = _g113.hd
  local to_string = _g113["to-string"]
  local exit = _g113.exit
  local sublist = _g113.sublist
  local string_literal63 = _g113["string-literal?"]
  local _62 = _g113[">"]
  local _60 = _g113["<"]
  local _61 = _g113["="]
  local composite63 = _g113["composite?"]
  local unstash = _g113.unstash
  local boolean63 = _g113["boolean?"]
  local setenv = _g113.setenv
  local _37message_handler = _g113["%message-handler"]
  local parse_number = _g113["parse-number"]
  local sub = _g113.sub
  local tl = _g113.tl
  local apply = _g113.apply
  local pairwise = _g113.pairwise
  local module = _g113.module
  local code = _g113.code
  local map = _g113.map
  local module_key = _g113["module-key"]
  local read_file = _g113["read-file"]
  local keep = _g113.keep
  local length = _g113.length
  local reduce = _g113.reduce
  local function63 = _g113["function?"]
  local write = _g113.write
  local some63 = _g113["some?"]
  local substring = _g113.substring
  local _6061 = _g113["<="]
  local add = _g113.add
  local _6261 = _g113[">="]
  local is63 = _g113["is?"]
  local empty63 = _g113["empty?"]
  local search = _g113.search
  local table63 = _g113["table?"]
  local exclude = _g113.exclude
  local _g114 = nexus.utilities
  local bind = _g114.bind
  local special63 = _g114["special?"]
  local quote_environment = _g114["quote-environment"]
  local macro63 = _g114["macro?"]
  local getenv = _g114.getenv
  local macroexpand = _g114.macroexpand
  local quote_modules = _g114["quote-modules"]
  local mapo = _g114.mapo
  local stash42 = _g114["stash*"]
  local symbol_expansion = _g114["symbol-expansion"]
  local indentation = _g114.indentation
  local to_id = _g114["to-id"]
  local initial_environment = _g114["initial-environment"]
  local quasiexpand = _g114.quasiexpand
  local valid_id63 = _g114["valid-id?"]
  local symbol63 = _g114["symbol?"]
  local macro_function = _g114["macro-function"]
  local toplevel63 = _g114["toplevel?"]
  local special_form63 = _g114["special-form?"]
  local bind42 = _g114["bind*"]
  local variable63 = _g114["variable?"]
  local reserved63 = _g114["reserved?"]
  local exported = _g114.exported
  local quoted = _g114.quoted
  local bound63 = _g114["bound?"]
  local imported = _g114.imported
  local statement63 = _g114["statement?"]
  local _g117 = nexus.reader
  local read_from_string = _g117["read-from-string"]
  local read_table = _g117["read-table"]
  local read = _g117.read
  local read_all = _g117["read-all"]
  local make_stream = _g117["make-stream"]
  local infix = {js = {cat = "+", ["~="] = "!=", ["="] = "===", ["and"] = "&&", ["or"] = "||"}, common = {[">"] = true, ["/"] = true, ["<"] = true, ["-"] = true, ["<="] = true, [">="] = true, ["%"] = true, ["*"] = true, ["+"] = true}, lua = {cat = "..", ["~="] = true, ["="] = "==", ["and"] = true, ["or"] = true}}
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
    local _g118 = args
    local i = 0
    while (i < length(_g118)) do
      local arg = _g118[(i + 1)]
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
    else
      if (x == "nil") then
        return("undefined")
      else
        if id_literal63(x) then
          return(inner(x))
        else
          if string_literal63(x) then
            return(x)
          else
            if string63(x) then
              return(to_id(x))
            else
              if boolean63(x) then
                if x then
                  return("true")
                else
                  return("false")
                end
              else
                if number63(x) then
                  return((x .. ""))
                else
                  error("Unrecognized atom")
                end
              end
            end
          end
        end
      end
    end
  end
  local function terminator(stmt63)
    if (not stmt63) then
      return("")
    else
      if (target == "js") then
        return(";\n")
      else
        return("\n")
      end
    end
  end
  local function compile_special(form, stmt63, tail63)
    local _g119 = getenv(hd(form))
    local self_tr63 = _g119.tr
    local special = _g119.special
    local stmt = _g119.stmt
    local tr = terminator((stmt63 and (not self_tr63)))
    return((special(tl(form), tail63) .. tr))
  end
  local function compile_call(form)
    if none63(form) then
      return(compile_special({"%array"}))
    else
      local f = hd(form)
      local f1 = compile(f)
      local args = compile_args(stash42(tl(form)))
      if list63(f) then
        return(("(" .. f1 .. ")" .. args))
      else
        if string63(f) then
          return((f1 .. args))
        else
          error("Invalid function call")
        end
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
  local function compile_function(args, body, ...)
    local _g123 = unstash({...})
    local name = _g123.name
    local prefix = _g123.prefix
    local _g128
    if name then
      _g128 = compile(name)
    else
      _g128 = ""
    end
    local id = _g128
    local _g124 = (prefix or "")
    local _g125 = compile_args(args)
    indent_level = (indent_level + 1)
    local _g127 = compile(body, {_stash = true, tail = true, stmt = true})
    indent_level = (indent_level - 1)
    local _g126 = _g127
    local ind = indentation()
    local _g129
    if (target == "js") then
      _g129 = ""
    else
      _g129 = "end"
    end
    local tr = _g129
    if name then
      tr = (tr .. "\n")
    end
    if (target == "js") then
      return(("function " .. id .. _g125 .. " {\n" .. _g126 .. ind .. "}" .. tr))
    else
      return((_g124 .. "function " .. id .. _g125 .. "\n" .. _g126 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return((is63(form) and (atom63(form) or ((not (hd(form) == "return")) and (not statement63(hd(form)))))))
  end
  compile = function (form, ...)
    local _g130 = unstash({...})
    local tail = _g130.tail
    local stmt = _g130.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt, tail))
      else
        local tr = terminator(stmt)
        local _g132
        if stmt then
          _g132 = indentation()
        else
          _g132 = ""
        end
        local ind = _g132
        local _g133
        if atom63(form) then
          _g133 = compile_atom(form)
        else
          local _g134
          if infix63(form) then
            _g134 = compile_infix(form)
          else
            _g134 = compile_call(form)
          end
          _g133 = _g134
        end
        local _g131 = _g133
        return((ind .. _g131 .. tr))
      end
    end
  end
  local lower
  local function lower_statement(form, tail63)
    local hoist = {}
    local e = lower(form, hoist, true, tail63)
    if (some63(hoist) and is63(e)) then
      return(join({"do"}, join(hoist, {e})))
    else
      if is63(e) then
        return(e)
      else
        if (length(hoist) > 1) then
          return(join({"do"}, hoist))
        else
          return(hd(hoist))
        end
      end
    end
  end
  local function lower_body(body, tail63)
    return(lower_statement(join({"do"}, body), tail63))
  end
  local function lower_do(args, hoist, stmt63, tail63)
    local _g135 = sub(args, 0, (length(args) - 1))
    local _g136 = 0
    while (_g136 < length(_g135)) do
      local x = _g135[(_g136 + 1)]
      add(hoist, lower(x, hoist, stmt63))
      _g136 = (_g136 + 1)
    end
    local e = lower(last(args), hoist, stmt63, tail63)
    if (tail63 and can_return63(e)) then
      return({"return", e})
    else
      return(e)
    end
  end
  local function lower_if(args, hoist, stmt63, tail63)
    local cond = args[1]
    local _g137 = args[2]
    local _g138 = args[3]
    if (stmt63 or tail63) then
      local _g140
      if _g138 then
        _g140 = {lower_body({_g138}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g137}, tail63)}, _g140)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g139
      if _g138 then
        _g139 = {lower({"set", e, _g138})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g137})}, _g139))
      return(e)
    end
  end
  local function lower_try(args, hoist, tail63)
    return(add(hoist, {"%try", lower_body(args, tail63)}))
  end
  local function lower_while(args, hoist)
    local c = args[1]
    local body = sub(args, 1)
    return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
  end
  local function lower_for(args, hoist)
    local t = args[1]
    local k = args[2]
    local body = sub(args, 2)
    return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
  end
  local function lower_function(args)
    local a = args[1]
    local body = sub(args, 1)
    return({"%function", a, lower_body(body, true)})
  end
  local function lower_definition(kind, args, hoist)
    local name = args[1]
    local _g141 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g141, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g142 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g142) then
      return(_g142)
    end
  end
  local function lower_special(form, hoist)
    local e = lower_call(form, hoist)
    if e then
      return(add(hoist, e))
    end
  end
  lower = function (form, hoist, stmt63, tail63)
    if atom63(form) then
      return(form)
    else
      if empty63(form) then
        return({"%array"})
      else
        if nil63(hoist) then
          return(lower_statement(form))
        else
          local x = form[1]
          local args = sub(form, 1)
          if (x == "do") then
            return(lower_do(args, hoist, stmt63, tail63))
          else
            if (x == "%if") then
              return(lower_if(args, hoist, stmt63, tail63))
            else
              if (x == "%try") then
                return(lower_try(args, hoist, tail63))
              else
                if (x == "while") then
                  return(lower_while(args, hoist))
                else
                  if (x == "%for") then
                    return(lower_for(args, hoist))
                  else
                    if (x == "%function") then
                      return(lower_function(args))
                    else
                      if ((x == "%local-function") or (x == "%global-function")) then
                        return(lower_definition(x, args, hoist))
                      else
                        if statement63(x) then
                          return(lower_special(form, hoist))
                        else
                          return(lower_call(form, hoist))
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
  lower = lower
  local function process(form)
    return(lower(macroexpand(form)))
  end
  current_module = nil
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g143 = map(process, body)
    local epilog = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g143, epilog))}})
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
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    current_module = mod0
    environment = env0
    if compiling63 then
      compiler_output = (compiler_output .. compiled)
    else
      return(run(compiled))
    end
  end
  local function open_module(spec, ...)
    local _g144 = unstash({...})
    local all = _g144.all
    local m = module(spec)
    local frame = last(environment)
    local _g145 = m.export
    local k = nil
    for k in next, _g145 do
      if (not number63(k)) then
        local v = _g145[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g146 = unstash({...})
    local all = _g146.all
    if (not module(spec)) then
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
    local m = module(current_module)
    return(join(imported(current_module, {_stash = true, all = true}), map(function (x)
      return(splice(imported(x)))
    end, m.import)))
  end
  local function eval(form)
    local previous = target
    target = "lua"
    local _g147 = {join({"%function", {}}, join(prologue(), {form}))}
    local compiled = compile(process(_g147))
    target = previous
    return(run(compiled))
  end
  local _g148 = {}
  nexus.compiler = _g148
  _g148["compile-special"] = compile_special
  _g148["load-module"] = load_module
  _g148["lower-function"] = lower_function
  _g148["lower-for"] = lower_for
  _g148["compile-call"] = compile_call
  _g148.lower = lower
  _g148["compile-file"] = compile_file
  _g148["lower-special"] = lower_special
  _g148["in-module"] = in_module
  _g148["lower-while"] = lower_while
  _g148["compile-infix"] = compile_infix
  _g148["%compile-module"] = _37compile_module
  _g148["can-return?"] = can_return63
  _g148.terminator = terminator
  _g148.eval = eval
  _g148["lower-statement"] = lower_statement
  _g148["lower-try"] = lower_try
  _g148["module-path"] = module_path
  _g148.run = run
  _g148["compile-module"] = compile_module
  _g148["open-module"] = open_module
  _g148.prologue = prologue
  _g148["compile-args"] = compile_args
  _g148.infix = infix
  _g148["compiler-output"] = compiler_output
  _g148["infix?"] = infix63
  _g148["compiling?"] = compiling63
  _g148["lower-do"] = lower_do
  _g148["compile-function"] = compile_function
  _g148.encapsulate = encapsulate
  _g148.compile = compile
  _g148.getop = getop
  _g148["lower-call"] = lower_call
  _g148["lower-body"] = lower_body
  _g148.process = process
  _g148["lower-definition"] = lower_definition
  _g148["lower-if"] = lower_if
  _g148["compile-atom"] = compile_atom
end)();
(function ()
  local _g150 = nexus.runtime
  local atom63 = _g150["atom?"]
  local write_file = _g150["write-file"]
  local splice = _g150.splice
  local number63 = _g150["number?"]
  local iterate = _g150.iterate
  local cat = _g150.cat
  local extend = _g150.extend
  local make_id = _g150["make-id"]
  local drop = _g150.drop
  local find = _g150.find
  local list63 = _g150["list?"]
  local string63 = _g150["string?"]
  local id_literal63 = _g150["id-literal?"]
  local none63 = _g150["none?"]
  local split = _g150.split
  local _47 = _g150["/"]
  local stash = _g150.stash
  local _ = _g150["-"]
  local keys63 = _g150["keys?"]
  local inner = _g150.inner
  local nil63 = _g150["nil?"]
  local last = _g150.last
  local join = _g150.join
  local toplevel63 = _g150["toplevel?"]
  local _37 = _g150["%"]
  local _42 = _g150["*"]
  local _43 = _g150["+"]
  local char = _g150.char
  local replicate = _g150.replicate
  local reverse = _g150.reverse
  local hd = _g150.hd
  local to_string = _g150["to-string"]
  local exit = _g150.exit
  local sublist = _g150.sublist
  local string_literal63 = _g150["string-literal?"]
  local _62 = _g150[">"]
  local _60 = _g150["<"]
  local _61 = _g150["="]
  local composite63 = _g150["composite?"]
  local unstash = _g150.unstash
  local boolean63 = _g150["boolean?"]
  local setenv = _g150.setenv
  local _37message_handler = _g150["%message-handler"]
  local parse_number = _g150["parse-number"]
  local sub = _g150.sub
  local tl = _g150.tl
  local apply = _g150.apply
  local pairwise = _g150.pairwise
  local module = _g150.module
  local code = _g150.code
  local map = _g150.map
  local module_key = _g150["module-key"]
  local read_file = _g150["read-file"]
  local keep = _g150.keep
  local length = _g150.length
  local reduce = _g150.reduce
  local function63 = _g150["function?"]
  local write = _g150.write
  local some63 = _g150["some?"]
  local substring = _g150.substring
  local _6061 = _g150["<="]
  local add = _g150.add
  local _6261 = _g150[">="]
  local is63 = _g150["is?"]
  local empty63 = _g150["empty?"]
  local search = _g150.search
  local table63 = _g150["table?"]
  local exclude = _g150.exclude
  local _g151 = nexus.utilities
  local bind = _g151.bind
  local special63 = _g151["special?"]
  local quote_environment = _g151["quote-environment"]
  local macro63 = _g151["macro?"]
  local getenv = _g151.getenv
  local macroexpand = _g151.macroexpand
  local quote_modules = _g151["quote-modules"]
  local mapo = _g151.mapo
  local stash42 = _g151["stash*"]
  local symbol_expansion = _g151["symbol-expansion"]
  local indentation = _g151.indentation
  local to_id = _g151["to-id"]
  local initial_environment = _g151["initial-environment"]
  local quasiexpand = _g151.quasiexpand
  local valid_id63 = _g151["valid-id?"]
  local symbol63 = _g151["symbol?"]
  local macro_function = _g151["macro-function"]
  local toplevel63 = _g151["toplevel?"]
  local special_form63 = _g151["special-form?"]
  local bind42 = _g151["bind*"]
  local variable63 = _g151["variable?"]
  local reserved63 = _g151["reserved?"]
  local exported = _g151.exported
  local quoted = _g151.quoted
  local bound63 = _g151["bound?"]
  local imported = _g151.imported
  local statement63 = _g151["statement?"]
  local _g154 = nexus.compiler
  local load_module = _g154["load-module"]
  local lower = _g154.lower
  local in_module = _g154["in-module"]
  local eval = _g154.eval
  local compile_module = _g154["compile-module"]
  local open_module = _g154["open-module"]
  local compile_function = _g154["compile-function"]
  local compile = _g154.compile
end)();
(function ()
  local _g335 = nexus.runtime
  local atom63 = _g335["atom?"]
  local write_file = _g335["write-file"]
  local splice = _g335.splice
  local number63 = _g335["number?"]
  local iterate = _g335.iterate
  local cat = _g335.cat
  local extend = _g335.extend
  local make_id = _g335["make-id"]
  local drop = _g335.drop
  local find = _g335.find
  local list63 = _g335["list?"]
  local string63 = _g335["string?"]
  local id_literal63 = _g335["id-literal?"]
  local none63 = _g335["none?"]
  local split = _g335.split
  local _47 = _g335["/"]
  local stash = _g335.stash
  local _ = _g335["-"]
  local keys63 = _g335["keys?"]
  local inner = _g335.inner
  local nil63 = _g335["nil?"]
  local last = _g335.last
  local join = _g335.join
  local toplevel63 = _g335["toplevel?"]
  local _37 = _g335["%"]
  local _42 = _g335["*"]
  local _43 = _g335["+"]
  local char = _g335.char
  local replicate = _g335.replicate
  local reverse = _g335.reverse
  local hd = _g335.hd
  local to_string = _g335["to-string"]
  local exit = _g335.exit
  local sublist = _g335.sublist
  local string_literal63 = _g335["string-literal?"]
  local _62 = _g335[">"]
  local _60 = _g335["<"]
  local _61 = _g335["="]
  local composite63 = _g335["composite?"]
  local unstash = _g335.unstash
  local boolean63 = _g335["boolean?"]
  local setenv = _g335.setenv
  local _37message_handler = _g335["%message-handler"]
  local parse_number = _g335["parse-number"]
  local sub = _g335.sub
  local tl = _g335.tl
  local apply = _g335.apply
  local pairwise = _g335.pairwise
  local module = _g335.module
  local code = _g335.code
  local map = _g335.map
  local module_key = _g335["module-key"]
  local read_file = _g335["read-file"]
  local keep = _g335.keep
  local length = _g335.length
  local reduce = _g335.reduce
  local function63 = _g335["function?"]
  local write = _g335.write
  local some63 = _g335["some?"]
  local substring = _g335.substring
  local _6061 = _g335["<="]
  local add = _g335.add
  local _6261 = _g335[">="]
  local is63 = _g335["is?"]
  local empty63 = _g335["empty?"]
  local search = _g335.search
  local table63 = _g335["table?"]
  local exclude = _g335.exclude
  local _g336 = nexus.utilities
  local bind = _g336.bind
  local special63 = _g336["special?"]
  local quote_environment = _g336["quote-environment"]
  local macro63 = _g336["macro?"]
  local getenv = _g336.getenv
  local macroexpand = _g336.macroexpand
  local quote_modules = _g336["quote-modules"]
  local mapo = _g336.mapo
  local stash42 = _g336["stash*"]
  local symbol_expansion = _g336["symbol-expansion"]
  local indentation = _g336.indentation
  local to_id = _g336["to-id"]
  local initial_environment = _g336["initial-environment"]
  local quasiexpand = _g336.quasiexpand
  local valid_id63 = _g336["valid-id?"]
  local symbol63 = _g336["symbol?"]
  local macro_function = _g336["macro-function"]
  local toplevel63 = _g336["toplevel?"]
  local special_form63 = _g336["special-form?"]
  local bind42 = _g336["bind*"]
  local variable63 = _g336["variable?"]
  local reserved63 = _g336["reserved?"]
  local exported = _g336.exported
  local quoted = _g336.quoted
  local bound63 = _g336["bound?"]
  local imported = _g336.imported
  local statement63 = _g336["statement?"]
  local _g339 = nexus.compiler
  local load_module = _g339["load-module"]
  local lower = _g339.lower
  local in_module = _g339["in-module"]
  local eval = _g339.eval
  local compile_module = _g339["compile-module"]
  local open_module = _g339["open-module"]
  local compile_function = _g339["compile-function"]
  local compile = _g339.compile
  target = "lua"
end)();
(function ()
  local _g605 = nexus.runtime
  local atom63 = _g605["atom?"]
  local write_file = _g605["write-file"]
  local splice = _g605.splice
  local number63 = _g605["number?"]
  local iterate = _g605.iterate
  local cat = _g605.cat
  local extend = _g605.extend
  local make_id = _g605["make-id"]
  local drop = _g605.drop
  local find = _g605.find
  local list63 = _g605["list?"]
  local string63 = _g605["string?"]
  local id_literal63 = _g605["id-literal?"]
  local none63 = _g605["none?"]
  local split = _g605.split
  local _47 = _g605["/"]
  local stash = _g605.stash
  local _ = _g605["-"]
  local keys63 = _g605["keys?"]
  local inner = _g605.inner
  local nil63 = _g605["nil?"]
  local last = _g605.last
  local join = _g605.join
  local toplevel63 = _g605["toplevel?"]
  local _37 = _g605["%"]
  local _42 = _g605["*"]
  local _43 = _g605["+"]
  local char = _g605.char
  local replicate = _g605.replicate
  local reverse = _g605.reverse
  local hd = _g605.hd
  local to_string = _g605["to-string"]
  local exit = _g605.exit
  local sublist = _g605.sublist
  local string_literal63 = _g605["string-literal?"]
  local _62 = _g605[">"]
  local _60 = _g605["<"]
  local _61 = _g605["="]
  local composite63 = _g605["composite?"]
  local unstash = _g605.unstash
  local boolean63 = _g605["boolean?"]
  local setenv = _g605.setenv
  local _37message_handler = _g605["%message-handler"]
  local parse_number = _g605["parse-number"]
  local sub = _g605.sub
  local tl = _g605.tl
  local apply = _g605.apply
  local pairwise = _g605.pairwise
  local module = _g605.module
  local code = _g605.code
  local map = _g605.map
  local module_key = _g605["module-key"]
  local read_file = _g605["read-file"]
  local keep = _g605.keep
  local length = _g605.length
  local reduce = _g605.reduce
  local function63 = _g605["function?"]
  local write = _g605.write
  local some63 = _g605["some?"]
  local substring = _g605.substring
  local _6061 = _g605["<="]
  local add = _g605.add
  local _6261 = _g605[">="]
  local is63 = _g605["is?"]
  local empty63 = _g605["empty?"]
  local search = _g605.search
  local table63 = _g605["table?"]
  local exclude = _g605.exclude
  local _g606 = nexus.utilities
  local bind = _g606.bind
  local special63 = _g606["special?"]
  local quote_environment = _g606["quote-environment"]
  local macro63 = _g606["macro?"]
  local getenv = _g606.getenv
  local macroexpand = _g606.macroexpand
  local quote_modules = _g606["quote-modules"]
  local mapo = _g606.mapo
  local stash42 = _g606["stash*"]
  local symbol_expansion = _g606["symbol-expansion"]
  local indentation = _g606.indentation
  local to_id = _g606["to-id"]
  local initial_environment = _g606["initial-environment"]
  local quasiexpand = _g606.quasiexpand
  local valid_id63 = _g606["valid-id?"]
  local symbol63 = _g606["symbol?"]
  local macro_function = _g606["macro-function"]
  local toplevel63 = _g606["toplevel?"]
  local special_form63 = _g606["special-form?"]
  local bind42 = _g606["bind*"]
  local variable63 = _g606["variable?"]
  local reserved63 = _g606["reserved?"]
  local exported = _g606.exported
  local quoted = _g606.quoted
  local bound63 = _g606["bound?"]
  local imported = _g606.imported
  local statement63 = _g606["statement?"]
  local _g609 = nexus.compiler
  local load_module = _g609["load-module"]
  local lower = _g609.lower
  local in_module = _g609["in-module"]
  local eval = _g609.eval
  local compile_module = _g609["compile-module"]
  local open_module = _g609["open-module"]
  local compile_function = _g609["compile-function"]
  local compile = _g609.compile
  modules = {runtime = {export = {["atom?"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, splice = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, cat = {export = true, variable = true}, extend = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, drop = {export = true, variable = true}, find = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, split = {export = true, variable = true}, ["/"] = {export = true, variable = true}, stash = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["splice?"] = {variable = true}, ["nil?"] = {export = true, variable = true}, last = {export = true, variable = true}, join = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, char = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, hd = {export = true, variable = true}, ["to-string"] = {export = true, variable = true}, exit = {export = true, variable = true}, sublist = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, setenv = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["parse-number"] = {export = true, variable = true}, sub = {export = true, variable = true}, tl = {export = true, variable = true}, apply = {export = true, variable = true}, pairwise = {export = true, variable = true}, ["id-count"] = {variable = true}, mapl = {variable = true}, module = {export = true, variable = true}, code = {export = true, variable = true}, map = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, keep = {export = true, variable = true}, length = {export = true, variable = true}, reduce = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, write = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, substring = {export = true, variable = true}, ["<="] = {export = true, variable = true}, add = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, search = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, exclude = {export = true, variable = true}}, import = {"special", "core"}}, boot = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, special = {export = {["%local-function"] = {stmt = true, special = function (_g622)
    local name = _g622[1]
    local args = _g622[2]
    local body = _g622[3]
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, tr = true, export = true}, ["set"] = {export = true, special = function (_g623)
    local lh = _g623[1]
    local rh = _g623[2]
    local _g624 = compile(lh)
    local _g708
    if nil63(rh) then
      _g708 = "nil"
    else
      _g708 = rh
    end
    local _g625 = compile(_g708)
    return((indentation() .. _g624 .. " = " .. _g625))
  end, stmt = true}, ["%try"] = {stmt = true, special = function (_g626)
    local form = _g626[1]
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g627 = compile(form, {_stash = true, tail = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g627
    local e = make_id()
    local handler = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = (indent_level + 1)
    local _g628 = compile(handler, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local h = _g628
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, tr = true, export = true}, ["%if"] = {stmt = true, special = function (_g629, tail63)
    local cond = _g629[1]
    local _g630 = _g629[2]
    local _g631 = _g629[3]
    local _g632 = compile(cond)
    indent_level = (indent_level + 1)
    local _g635 = compile(_g630, {_stash = true, tail = tail63, stmt = true})
    indent_level = (indent_level - 1)
    local _g633 = _g635
    local _g709
    if _g631 then
      indent_level = (indent_level + 1)
      local _g636 = compile(_g631, {_stash = true, tail = tail63, stmt = true})
      indent_level = (indent_level - 1)
      _g709 = _g636
    end
    local _g634 = _g709
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g632 .. ") {\n" .. _g633 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g632 .. " then\n" .. _g633)
    end
    if (_g634 and (target == "js")) then
      str = (str .. " else {\n" .. _g634 .. ind .. "}")
    else
      if _g634 then
        str = (str .. ind .. "else\n" .. _g634)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end, tr = true, export = true}, ["%local"] = {export = true, special = function (_g637)
    local name = _g637[1]
    local value = _g637[2]
    local id = compile(name)
    local value1 = compile(value)
    local _g710
    if is63(value) then
      _g710 = (" = " .. value1)
    else
      _g710 = ""
    end
    local rh = _g710
    local _g711
    if (target == "js") then
      _g711 = "var "
    else
      _g711 = "local "
    end
    local keyword = _g711
    local ind = indentation()
    return((ind .. keyword .. id .. rh))
  end, stmt = true}, ["%function"] = {special = function (_g638)
    local args = _g638[1]
    local body = _g638[2]
    return(compile_function(args, body))
  end, export = true}, ["while"] = {stmt = true, special = function (_g639)
    local condition = _g639[1]
    local form = _g639[2]
    local _g640 = compile(condition)
    indent_level = (indent_level + 1)
    local _g641 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g641
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g640 .. ") {\n" .. body .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g640 .. " do\n" .. body .. ind .. "end\n"))
    end
  end, tr = true, export = true}, ["break"] = {export = true, special = function (_g149)
    return((indentation() .. "break"))
  end, stmt = true}, ["not"] = {special = function (_g642)
    local x = _g642[1]
    local _g643 = compile(x)
    local _g712
    if (target == "js") then
      _g712 = "!("
    else
      _g712 = "(not "
    end
    local open = _g712
    return((open .. _g643 .. ")"))
  end, export = true}, ["do"] = {stmt = true, special = function (forms, tail63)
    local str = ""
    local _g644 = forms
    local i = 0
    while (i < length(_g644)) do
      local x = _g644[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, tail = t63, stmt = true}))
      i = (i + 1)
    end
    return(str)
  end, tr = true, export = true}, ["%array"] = {special = function (forms)
    local _g713
    if (target == "lua") then
      _g713 = "{"
    else
      _g713 = "["
    end
    local open = _g713
    local _g714
    if (target == "lua") then
      _g714 = "}"
    else
      _g714 = "]"
    end
    local close = _g714
    local str = ""
    local _g645 = forms
    local i = 0
    while (i < length(_g645)) do
      local x = _g645[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true}, ["return"] = {export = true, special = function (_g646)
    local x = _g646[1]
    local _g715
    if nil63(x) then
      _g715 = "return"
    else
      _g715 = ("return(" .. compile(x) .. ")")
    end
    local _g647 = _g715
    return((indentation() .. _g647))
  end, stmt = true}, ["%for"] = {stmt = true, special = function (_g648)
    local t = _g648[1]
    local k = _g648[2]
    local form = _g648[3]
    local _g649 = compile(t)
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g650 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g650
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g649 .. " do\n" .. body .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g649 .. ") {\n" .. body .. ind .. "}\n"))
    end
  end, tr = true, export = true}, ["%global-function"] = {stmt = true, special = function (_g651)
    local name = _g651[1]
    local args = _g651[2]
    local body = _g651[3]
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true, export = true}, ["%object"] = {special = function (forms)
    local str = "{"
    local _g716
    if (target == "lua") then
      _g716 = " = "
    else
      _g716 = ": "
    end
    local sep = _g716
    local pairs = pairwise(forms)
    local _g652 = pairs
    local i = 0
    while (i < length(_g652)) do
      local _g653 = _g652[(i + 1)]
      local k = _g653[1]
      local v = _g653[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g654 = compile(v)
      local _g717
      if valid_id63(k) then
        _g717 = k
      else
        local _g718
        if ((target == "js") and string_literal63(k)) then
          _g718 = k
        else
          local _g719
          if (target == "js") then
            _g719 = quoted(k)
          else
            local _g720
            if string_literal63(k) then
              _g720 = ("[" .. k .. "]")
            else
              _g720 = ("[" .. quoted(k) .. "]")
            end
            _g719 = _g720
          end
          _g718 = _g719
        end
        _g717 = _g718
      end
      local _g655 = _g717
      str = (str .. _g655 .. sep .. _g654)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true}, ["error"] = {export = true, special = function (_g656)
    local x = _g656[1]
    local _g721
    if (target == "js") then
      _g721 = ("throw new " .. compile({"Error", x}))
    else
      _g721 = ("error(" .. compile(x) .. ")")
    end
    local e = _g721
    return((indentation() .. e))
  end, stmt = true}, ["get"] = {special = function (_g657)
    local t = _g657[1]
    local k = _g657[2]
    local _g658 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g658, 0) == "{")) then
      _g658 = ("(" .. _g658 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g658 .. "." .. inner(k)))
    else
      return((_g658 .. "[" .. k1 .. "]"))
    end
  end, export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, main = {export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g659 = sub(specs, 0)
    map(compile_module, _g659)
    return(nil)
  end}}, import = {"runtime", "special", "core", "reader", "compiler"}}, core = {export = {when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g660 = sub(body, 0)
    return({"if", cond, join({"do"}, _g660)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g661 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g662 = {"table"}
    _g662._scope = scope
    return({"do", {"add", "environment", _g662}, {"let", {x, join({"do"}, _g661)}, {"drop", "environment"}, x}})
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g663 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g663)})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g664)
      local a = _g664[1]
      local b = _g664[2]
      local c = sub(_g664, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g665 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g665)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g666 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g666)})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g667 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g668 = join({"do"}, macroexpand(_g667))
    drop(environment)
    return(_g668)
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g334, x)
      return(x)
    end, body)))
  end, export = true}, list = {macro = function (...)
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
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, target = {global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g670 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g722
    if nil63(v) then
      local _g723
      if b.i then
        _g723 = "i"
      else
        _g723 = make_id()
      end
      local i = _g723
      _g722 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g670), {"inc", i}}}
    else
      local _g671 = {"target"}
      _g671.lua = {"not", {"number?", k}}
      _g671.js = {"isNaN", {"parseInt", k}}
      _g722 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g671, join({"let", {v, {"get", t1, k}}}, _g670)}}}
    end
    return({"let", {t1, t}, _g722})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g672 = sub(body, 0)
    local imports = {}
    local imp = _g672.import
    local exp = _g672.export
    local _g673 = (imp or {})
    local _g674 = 0
    while (_g674 < length(_g673)) do
      local k = _g673[(_g674 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g674 = (_g674 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g675 = (exp or {})
    local _g676 = 0
    while (_g676 < length(_g675)) do
      local k = _g675[(_g676 + 1)]
      setenv(k, {_stash = true, export = true})
      _g676 = (_g676 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g677 = sub(body, 0)
    local form = join({"fn", args}, _g677)
    local _g678 = {"setenv", {"quote", name}}
    _g678.macro = form
    _g678.form = {"quote", form}
    eval(_g678)
    return(nil)
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g679 = sub(body, 0)
    local form = join({"fn", args}, _g679)
    local keys = sub(_g679, length(_g679))
    local _g680 = {"setenv", {"quote", name}}
    _g680.form = {"quote", form}
    _g680.special = form
    eval(join(_g680, keys))
    return(nil)
  end, export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g681 = elements
    local _g682 = 0
    while (_g682 < length(_g681)) do
      local e = _g681[(_g682 + 1)]
      l[e] = true
      _g682 = (_g682 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g683 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g683) then
      local _g684 = bind42(x, _g683)
      local args = _g684[1]
      local _g685 = _g684[2]
      return(join({"%local-function", name, args}, _g685))
    else
      return({"%local", name, x})
    end
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g686 = sub(body, 0)
    local _g687 = bind42(args, _g686)
    local _g688 = _g687[1]
    local _g689 = _g687[2]
    return(join({"%function", _g688}, _g689))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, ["with-bindings"] = {macro = function (_g690, ...)
    local names = _g690[1]
    local body = unstash({...})
    local _g691 = sub(body, 0)
    local x = make_id()
    local _g693 = {"setenv", x}
    _g693.variable = true
    local _g692 = {"with-frame", {"each", {x}, names, _g693}}
    _g692.scope = true
    return(join(_g692, _g691))
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g694 = sub(body, 0)
    add(environment, {})
    map(function (_g696)
      local name = _g696[1]
      local exp = _g696[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g695 = join({"do"}, macroexpand(_g694))
    drop(environment)
    return(_g695)
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g698)
      local lh = _g698[1]
      local rh = _g698[2]
      local _g699 = bind(lh, rh)
      local _g700 = 0
      while (_g700 < length(_g699)) do
        local _g701 = _g699[(_g700 + 1)]
        local id = _g701[1]
        local val = _g701[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g700 = (_g700 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g697)})))
  end, export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g702 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g702)})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g703 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g703) then
      local _g704 = bind42(x, _g703)
      local args = _g704[1]
      local _g705 = _g704[2]
      return(join({"%global-function", name, args}, _g705))
    else
      if (target == "js") then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, system = {export = {nexus = {global = true, export = true}}, import = {"special", "core"}}, compiler = {export = {["compile-special"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["lower-function"] = {variable = true}, ["lower-for"] = {variable = true}, ["compile-call"] = {variable = true}, lower = {global = true, variable = true, export = true}, ["compile-file"] = {variable = true}, ["lower-special"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["lower-while"] = {variable = true}, ["compile-infix"] = {variable = true}, ["%compile-module"] = {variable = true}, ["can-return?"] = {variable = true}, terminator = {variable = true}, eval = {export = true, variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["module-path"] = {variable = true}, run = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, prologue = {variable = true}, ["compile-args"] = {variable = true}, infix = {variable = true}, ["compiler-output"] = {variable = true}, ["infix?"] = {variable = true}, ["compiling?"] = {variable = true}, ["lower-do"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["%result"] = {global = true, export = true}, encapsulate = {variable = true}, compile = {export = true, variable = true}, getop = {variable = true}, ["lower-call"] = {variable = true}, ["lower-body"] = {variable = true}, ["current-module"] = {global = true, export = true}, process = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-if"] = {variable = true}, ["compile-atom"] = {variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, lib = {export = {}, import = {"core", "special"}}, optimizer = {export = {optimizations = {variable = true}, optimize = {export = true, variable = true}, ["define-optimization"] = {}}, import = {"runtime", "special", "core"}}, utilities = {export = {["can-unquote?"] = {variable = true}, bind = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["global?"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, getenv = {export = true, variable = true}, ["indent-level"] = {global = true, export = true}, macroexpand = {export = true, variable = true}, escape = {variable = true}, ["quote-modules"] = {export = true, variable = true}, mapo = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["stash*"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["quote-binding"] = {variable = true}, indentation = {export = true, variable = true}, ["to-id"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["numeric?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, reserved = {variable = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["symbol?"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quoting?"] = {variable = true}, ["toplevel?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["reserved?"] = {export = true, variable = true}, exported = {export = true, variable = true}, quoted = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["statement?"] = {export = true, variable = true}}, import = {"runtime", "special", "core"}}, reader = {export = {["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, read = {export = true, variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, eof = {variable = true}, ["define-reader"] = {macro = function (_g706, ...)
    local char = _g706[1]
    local stream = _g706[2]
    local body = unstash({...})
    local _g707 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g707)})
  end, export = true}, ["read-all"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, whitespace = {variable = true}, ["make-stream"] = {export = true, variable = true}, delimiters = {variable = true}}, import = {"runtime", "special", "core"}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g724 = sub(body, 0)
    local imports = {}
    local imp = _g724.import
    local exp = _g724.export
    local _g725 = (imp or {})
    local _g726 = 0
    while (_g726 < length(_g725)) do
      local k = _g725[(_g726 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g726 = (_g726 + 1)
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g727 = (exp or {})
    local _g728 = 0
    while (_g728 < length(_g727)) do
      local k = _g727[(_g728 + 1)]
      setenv(k, {_stash = true, export = true})
      _g728 = (_g728 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local exclude = _g2.exclude
  local write_file = _g2["write-file"]
  local splice = _g2.splice
  local number63 = _g2["number?"]
  local function63 = _g2["function?"]
  local cat = _g2.cat
  local extend = _g2.extend
  local make_id = _g2["make-id"]
  local drop = _g2.drop
  local find = _g2.find
  local list63 = _g2["list?"]
  local string63 = _g2["string?"]
  local is63 = _g2["is?"]
  local none63 = _g2["none?"]
  local split = _g2.split
  local module = _g2.module
  local stash = _g2.stash
  local _ = _g2["-"]
  local keys63 = _g2["keys?"]
  local inner = _g2.inner
  local nil63 = _g2["nil?"]
  local last = _g2.last
  local join = _g2.join
  local toplevel63 = _g2["toplevel?"]
  local _37 = _g2["%"]
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local char = _g2.char
  local replicate = _g2.replicate
  local reverse = _g2.reverse
  local hd = _g2.hd
  local to_string = _g2["to-string"]
  local exit = _g2.exit
  local sublist = _g2.sublist
  local string_literal63 = _g2["string-literal?"]
  local _62 = _g2[">"]
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local composite63 = _g2["composite?"]
  local substring = _g2.substring
  local boolean63 = _g2["boolean?"]
  local setenv = _g2.setenv
  local _37message_handler = _g2["%message-handler"]
  local parse_number = _g2["parse-number"]
  local sub = _g2.sub
  local length = _g2.length
  local apply = _g2.apply
  local pairwise = _g2.pairwise
  local table63 = _g2["table?"]
  local tl = _g2.tl
  local unstash = _g2.unstash
  local code = _g2.code
  local map = _g2.map
  local iterate = _g2.iterate
  local module_key = _g2["module-key"]
  local some63 = _g2["some?"]
  local reduce = _g2.reduce
  local keep = _g2.keep
  local id_literal63 = _g2["id-literal?"]
  local atom63 = _g2["atom?"]
  local _6061 = _g2["<="]
  local add = _g2.add
  local _6261 = _g2[">="]
  local read_file = _g2["read-file"]
  local search = _g2.search
  local write = _g2.write
  local _47 = _g2["/"]
  local empty63 = _g2["empty?"]
  local _g5 = nexus.reader
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local _g6 = nexus.compiler
  local load_module = _g6["load-module"]
  local lower = _g6.lower
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local open_module = _g6["open-module"]
  local eval = _g6.eval
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local function rep(str)
    local _g731,_g732 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g730 = {_g731, _g732}
    local _g1 = _g730[1]
    local x = _g730[2]
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
    local _g733 = args
    local i = 0
    while (i < length(_g733)) do
      local arg = _g733[(i + 1)]
      if ((arg == "-o") or (arg == "-t") or (arg == "-e")) then
        if (i == (length(args) - 1)) then
          print((to_string("missing argument for") .. " " .. to_string(arg) .. " "))
        else
          i = (i + 1)
          local val = args[(i + 1)]
          if (arg == "-o") then
            output = val
          else
            if (arg == "-t") then
              target1 = val
            else
              if (arg == "-e") then
                expr = val
              end
            end
          end
        end
      else
        if (nil63(spec) and ("-" ~= char(arg, 0))) then
          spec = arg
        end
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
  local _g734 = {}
  nexus.main = _g734
  _g734.repl = repl
  _g734.usage = usage
  _g734.rep = rep
  _g734.main = main
end)();
