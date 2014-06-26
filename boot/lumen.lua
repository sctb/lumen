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
  _g54.inner = inner
  _g54.reduce = reduce
  _g54["empty?"] = empty63
  _g54.drop = drop
  _g54["composite?"] = composite63
  _g54["none?"] = none63
  _g54["table?"] = table63
  _g54["toplevel?"] = toplevel63
  _g54.write = write
  _g54["make-id"] = make_id
  _g54.iterate = iterate
  _g54["write-file"] = write_file
  _g54["%message-handler"] = _37message_handler
  _g54["function?"] = function63
  _g54.last = last
  _g54["some?"] = some63
  _g54.splice = splice
  _g54.exit = exit
  _g54.join = join
  _g54.length = length
  _g54["parse-number"] = parse_number
  _g54.module = module
  _g54.substring = substring
  _g54["id-count"] = id_count
  _g54.extend = extend
  _g54.add = add
  _g54["-"] = _
  _g54.apply = apply
  _g54["*"] = _42
  _g54.sublist = sublist
  _g54["atom?"] = atom63
  _g54.code = code
  _g54["boolean?"] = boolean63
  _g54.map = map
  _g54["/"] = _47
  _g54[">"] = _62
  _g54["="] = _61
  _g54.cat = cat
  _g54.keep = keep
  _g54.char = char
  _g54.hd = hd
  _g54.find = find
  _g54["is?"] = is63
  _g54.search = search
  _g54["string?"] = string63
  _g54.setenv = setenv
  _g54["read-file"] = read_file
  _g54["splice?"] = splice63
  _g54.mapl = mapl
  _g54["+"] = _43
  _g54["module-key"] = module_key
  _g54.pairwise = pairwise
  _g54.tl = tl
  _g54["nil?"] = nil63
  _g54["to-string"] = to_string
  _g54.sub = sub
  _g54["string-literal?"] = string_literal63
  _g54.stash = stash
  _g54.exclude = exclude
  _g54["number?"] = number63
  _g54["<"] = _60
  _g54.split = split
  _g54["keys?"] = keys63
  _g54[">="] = _6261
  _g54["%"] = _37
  _g54["<="] = _6061
  _g54["id-literal?"] = id_literal63
  _g54.unstash = unstash
  _g54.replicate = replicate
  _g54.reverse = reverse
  _g54["list?"] = list63
end)();
(function ()
  local _g59 = nexus.runtime
  local inner = _g59.inner
  local reduce = _g59.reduce
  local empty63 = _g59["empty?"]
  local drop = _g59.drop
  local composite63 = _g59["composite?"]
  local none63 = _g59["none?"]
  local table63 = _g59["table?"]
  local toplevel63 = _g59["toplevel?"]
  local write = _g59.write
  local make_id = _g59["make-id"]
  local iterate = _g59.iterate
  local write_file = _g59["write-file"]
  local _37message_handler = _g59["%message-handler"]
  local function63 = _g59["function?"]
  local last = _g59.last
  local some63 = _g59["some?"]
  local splice = _g59.splice
  local exit = _g59.exit
  local join = _g59.join
  local length = _g59.length
  local parse_number = _g59["parse-number"]
  local module = _g59.module
  local substring = _g59.substring
  local extend = _g59.extend
  local add = _g59.add
  local _ = _g59["-"]
  local apply = _g59.apply
  local _42 = _g59["*"]
  local sublist = _g59.sublist
  local atom63 = _g59["atom?"]
  local code = _g59.code
  local boolean63 = _g59["boolean?"]
  local map = _g59.map
  local _47 = _g59["/"]
  local _62 = _g59[">"]
  local _61 = _g59["="]
  local cat = _g59.cat
  local keep = _g59.keep
  local char = _g59.char
  local hd = _g59.hd
  local find = _g59.find
  local is63 = _g59["is?"]
  local search = _g59.search
  local string63 = _g59["string?"]
  local setenv = _g59.setenv
  local read_file = _g59["read-file"]
  local _43 = _g59["+"]
  local module_key = _g59["module-key"]
  local pairwise = _g59.pairwise
  local tl = _g59.tl
  local nil63 = _g59["nil?"]
  local to_string = _g59["to-string"]
  local sub = _g59.sub
  local string_literal63 = _g59["string-literal?"]
  local stash = _g59.stash
  local exclude = _g59.exclude
  local number63 = _g59["number?"]
  local _60 = _g59["<"]
  local split = _g59.split
  local keys63 = _g59["keys?"]
  local _6261 = _g59[">="]
  local _37 = _g59["%"]
  local _6061 = _g59["<="]
  local id_literal63 = _g59["id-literal?"]
  local unstash = _g59.unstash
  local replicate = _g59.replicate
  local reverse = _g59.reverse
  local list63 = _g59["list?"]
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
  local reserved = {["break"] = true, ["function"] = true, ["or"] = true, ["delete"] = true, ["*"] = true, ["true"] = true, ["debugger"] = true, ["in"] = true, ["this"] = true, ["="] = true, ["nil"] = true, ["false"] = true, ["<="] = true, [">="] = true, ["and"] = true, ["with"] = true, ["typeof"] = true, ["-"] = true, ["switch"] = true, ["/"] = true, ["if"] = true, ["end"] = true, ["default"] = true, ["return"] = true, ["+"] = true, ["continue"] = true, ["not"] = true, ["<"] = true, ["until"] = true, ["finally"] = true, [">"] = true, ["repeat"] = true, ["local"] = true, ["throw"] = true, ["instanceof"] = true, ["while"] = true, ["void"] = true, ["catch"] = true, ["case"] = true, ["var"] = true, ["try"] = true, ["%"] = true, ["for"] = true, ["=="] = true, ["elseif"] = true, ["then"] = true, ["else"] = true, ["do"] = true, ["new"] = true}
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
  _g101["numeric?"] = numeric63
  _g101["quote-module"] = quote_module
  _g101["can-unquote?"] = can_unquote63
  _g101["special?"] = special63
  _g101["quote-frame"] = quote_frame
  _g101.quoted = quoted
  _g101.quasiexpand = quasiexpand
  _g101["to-id"] = to_id
  _g101["global?"] = global63
  _g101["toplevel?"] = toplevel63
  _g101.getenv = getenv
  _g101["quote-modules"] = quote_modules
  _g101["symbol-expansion"] = symbol_expansion
  _g101["macro-function"] = macro_function
  _g101["valid-char?"] = valid_char63
  _g101.macroexpand = macroexpand
  _g101["valid-id?"] = valid_id63
  _g101["symbol?"] = symbol63
  _g101["quote-binding"] = quote_binding
  _g101["quasiquote-list"] = quasiquote_list
  _g101.reserved = reserved
  _g101["special-form?"] = special_form63
  _g101["variable?"] = variable63
  _g101["initial-environment"] = initial_environment
  _g101["quasiquoting?"] = quasiquoting63
  _g101["reserved?"] = reserved63
  _g101.exported = exported
  _g101.escape = escape
  _g101.imported = imported
  _g101["bind*"] = bind42
  _g101.indentation = indentation
  _g101["quote-environment"] = quote_environment
  _g101.mapo = mapo
  _g101["quoting?"] = quoting63
  _g101["stash*"] = stash42
  _g101["statement?"] = statement63
  _g101["quasisplice?"] = quasisplice63
  _g101["bound?"] = bound63
  _g101["macro?"] = macro63
  _g101.bind = bind
end)();
(function ()
  local _g102 = nexus.runtime
  local inner = _g102.inner
  local reduce = _g102.reduce
  local empty63 = _g102["empty?"]
  local drop = _g102.drop
  local composite63 = _g102["composite?"]
  local none63 = _g102["none?"]
  local table63 = _g102["table?"]
  local toplevel63 = _g102["toplevel?"]
  local write = _g102.write
  local make_id = _g102["make-id"]
  local iterate = _g102.iterate
  local write_file = _g102["write-file"]
  local _37message_handler = _g102["%message-handler"]
  local function63 = _g102["function?"]
  local last = _g102.last
  local some63 = _g102["some?"]
  local splice = _g102.splice
  local exit = _g102.exit
  local join = _g102.join
  local length = _g102.length
  local parse_number = _g102["parse-number"]
  local module = _g102.module
  local substring = _g102.substring
  local extend = _g102.extend
  local add = _g102.add
  local _ = _g102["-"]
  local apply = _g102.apply
  local _42 = _g102["*"]
  local sublist = _g102.sublist
  local atom63 = _g102["atom?"]
  local code = _g102.code
  local boolean63 = _g102["boolean?"]
  local map = _g102.map
  local _47 = _g102["/"]
  local _62 = _g102[">"]
  local _61 = _g102["="]
  local cat = _g102.cat
  local keep = _g102.keep
  local char = _g102.char
  local hd = _g102.hd
  local find = _g102.find
  local is63 = _g102["is?"]
  local search = _g102.search
  local string63 = _g102["string?"]
  local setenv = _g102.setenv
  local read_file = _g102["read-file"]
  local _43 = _g102["+"]
  local module_key = _g102["module-key"]
  local pairwise = _g102.pairwise
  local tl = _g102.tl
  local nil63 = _g102["nil?"]
  local to_string = _g102["to-string"]
  local sub = _g102.sub
  local string_literal63 = _g102["string-literal?"]
  local stash = _g102.stash
  local exclude = _g102.exclude
  local number63 = _g102["number?"]
  local _60 = _g102["<"]
  local split = _g102.split
  local keys63 = _g102["keys?"]
  local _6261 = _g102[">="]
  local _37 = _g102["%"]
  local _6061 = _g102["<="]
  local id_literal63 = _g102["id-literal?"]
  local unstash = _g102.unstash
  local replicate = _g102.replicate
  local reverse = _g102.reverse
  local list63 = _g102["list?"]
  local delimiters = {[")"] = true, ["("] = true, ["\n"] = true, [";"] = true}
  local whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
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
  _g112["flag?"] = flag63
  _g112["peek-char"] = peek_char
  _g112["read-table"] = read_table
  _g112["make-stream"] = make_stream
  _g112["skip-non-code"] = skip_non_code
  _g112["read-char"] = read_char
  _g112["read-all"] = read_all
  _g112["key?"] = key63
  _g112.whitespace = whitespace
  _g112.read = read
  _g112.eof = eof
  _g112["read-from-string"] = read_from_string
  _g112.delimiters = delimiters
end)();
(function ()
  local _g113 = nexus.runtime
  local inner = _g113.inner
  local reduce = _g113.reduce
  local empty63 = _g113["empty?"]
  local drop = _g113.drop
  local composite63 = _g113["composite?"]
  local none63 = _g113["none?"]
  local table63 = _g113["table?"]
  local toplevel63 = _g113["toplevel?"]
  local write = _g113.write
  local make_id = _g113["make-id"]
  local iterate = _g113.iterate
  local write_file = _g113["write-file"]
  local _37message_handler = _g113["%message-handler"]
  local function63 = _g113["function?"]
  local last = _g113.last
  local some63 = _g113["some?"]
  local splice = _g113.splice
  local exit = _g113.exit
  local join = _g113.join
  local length = _g113.length
  local parse_number = _g113["parse-number"]
  local module = _g113.module
  local substring = _g113.substring
  local extend = _g113.extend
  local add = _g113.add
  local _ = _g113["-"]
  local apply = _g113.apply
  local _42 = _g113["*"]
  local sublist = _g113.sublist
  local atom63 = _g113["atom?"]
  local code = _g113.code
  local boolean63 = _g113["boolean?"]
  local map = _g113.map
  local _47 = _g113["/"]
  local _62 = _g113[">"]
  local _61 = _g113["="]
  local cat = _g113.cat
  local keep = _g113.keep
  local char = _g113.char
  local hd = _g113.hd
  local find = _g113.find
  local is63 = _g113["is?"]
  local search = _g113.search
  local string63 = _g113["string?"]
  local setenv = _g113.setenv
  local read_file = _g113["read-file"]
  local _43 = _g113["+"]
  local module_key = _g113["module-key"]
  local pairwise = _g113.pairwise
  local tl = _g113.tl
  local nil63 = _g113["nil?"]
  local to_string = _g113["to-string"]
  local sub = _g113.sub
  local string_literal63 = _g113["string-literal?"]
  local stash = _g113.stash
  local exclude = _g113.exclude
  local number63 = _g113["number?"]
  local _60 = _g113["<"]
  local split = _g113.split
  local keys63 = _g113["keys?"]
  local _6261 = _g113[">="]
  local _37 = _g113["%"]
  local _6061 = _g113["<="]
  local id_literal63 = _g113["id-literal?"]
  local unstash = _g113.unstash
  local replicate = _g113.replicate
  local reverse = _g113.reverse
  local list63 = _g113["list?"]
  local _g114 = nexus.utilities
  local special63 = _g114["special?"]
  local quoted = _g114.quoted
  local quasiexpand = _g114.quasiexpand
  local to_id = _g114["to-id"]
  local toplevel63 = _g114["toplevel?"]
  local getenv = _g114.getenv
  local quote_modules = _g114["quote-modules"]
  local symbol_expansion = _g114["symbol-expansion"]
  local macro_function = _g114["macro-function"]
  local macroexpand = _g114.macroexpand
  local valid_id63 = _g114["valid-id?"]
  local symbol63 = _g114["symbol?"]
  local special_form63 = _g114["special-form?"]
  local variable63 = _g114["variable?"]
  local initial_environment = _g114["initial-environment"]
  local reserved63 = _g114["reserved?"]
  local exported = _g114.exported
  local imported = _g114.imported
  local bind42 = _g114["bind*"]
  local indentation = _g114.indentation
  local quote_environment = _g114["quote-environment"]
  local mapo = _g114.mapo
  local stash42 = _g114["stash*"]
  local statement63 = _g114["statement?"]
  local bound63 = _g114["bound?"]
  local macro63 = _g114["macro?"]
  local bind = _g114.bind
  local _g117 = nexus.reader
  local read_table = _g117["read-table"]
  local make_stream = _g117["make-stream"]
  local read_all = _g117["read-all"]
  local read = _g117.read
  local read_from_string = _g117["read-from-string"]
  local infix = {js = {["~="] = "!=", ["="] = "===", ["and"] = "&&", ["or"] = "||", cat = "+"}, lua = {["~="] = true, ["="] = "==", ["and"] = true, ["or"] = true, cat = ".."}, common = {[">"] = true, ["-"] = true, ["<"] = true, ["+"] = true, ["*"] = true, [">="] = true, ["%"] = true, ["<="] = true, ["/"] = true}}
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
  local function compile_special(form, stmt63)
    local _g119 = getenv(hd(form))
    local self_tr63 = _g119.tr
    local special = _g119.special
    local stmt = _g119.stmt
    local tr = terminator((stmt63 and (not self_tr63)))
    return((special(tl(form)) .. tr))
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
    local _g127 = compile(body, {_stash = true, stmt = true})
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
    local stmt = _g130.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
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
  _g148["compile-call"] = compile_call
  _g148["lower-do"] = lower_do
  _g148["compile-function"] = compile_function
  _g148["module-path"] = module_path
  _g148["lower-definition"] = lower_definition
  _g148["lower-try"] = lower_try
  _g148.lower = lower
  _g148["lower-statement"] = lower_statement
  _g148["lower-for"] = lower_for
  _g148["load-module"] = load_module
  _g148["compile-infix"] = compile_infix
  _g148.compile = compile
  _g148["lower-call"] = lower_call
  _g148.encapsulate = encapsulate
  _g148["lower-if"] = lower_if
  _g148["compile-module"] = compile_module
  _g148["compiler-output"] = compiler_output
  _g148["in-module"] = in_module
  _g148.terminator = terminator
  _g148.infix = infix
  _g148["compiling?"] = compiling63
  _g148["open-module"] = open_module
  _g148["lower-while"] = lower_while
  _g148["compile-atom"] = compile_atom
  _g148.prologue = prologue
  _g148["%compile-module"] = _37compile_module
  _g148.eval = eval
  _g148.run = run
  _g148["lower-function"] = lower_function
  _g148["compile-file"] = compile_file
  _g148["lower-body"] = lower_body
  _g148.process = process
  _g148["can-return?"] = can_return63
  _g148["lower-special"] = lower_special
  _g148.getop = getop
  _g148["infix?"] = infix63
  _g148["compile-special"] = compile_special
  _g148["compile-args"] = compile_args
end)();
(function ()
  local _g150 = nexus.runtime
  local inner = _g150.inner
  local reduce = _g150.reduce
  local empty63 = _g150["empty?"]
  local drop = _g150.drop
  local composite63 = _g150["composite?"]
  local none63 = _g150["none?"]
  local table63 = _g150["table?"]
  local toplevel63 = _g150["toplevel?"]
  local write = _g150.write
  local make_id = _g150["make-id"]
  local iterate = _g150.iterate
  local write_file = _g150["write-file"]
  local _37message_handler = _g150["%message-handler"]
  local function63 = _g150["function?"]
  local last = _g150.last
  local some63 = _g150["some?"]
  local splice = _g150.splice
  local exit = _g150.exit
  local join = _g150.join
  local length = _g150.length
  local parse_number = _g150["parse-number"]
  local module = _g150.module
  local substring = _g150.substring
  local extend = _g150.extend
  local add = _g150.add
  local _ = _g150["-"]
  local apply = _g150.apply
  local _42 = _g150["*"]
  local sublist = _g150.sublist
  local atom63 = _g150["atom?"]
  local code = _g150.code
  local boolean63 = _g150["boolean?"]
  local map = _g150.map
  local _47 = _g150["/"]
  local _62 = _g150[">"]
  local _61 = _g150["="]
  local cat = _g150.cat
  local keep = _g150.keep
  local char = _g150.char
  local hd = _g150.hd
  local find = _g150.find
  local is63 = _g150["is?"]
  local search = _g150.search
  local string63 = _g150["string?"]
  local setenv = _g150.setenv
  local read_file = _g150["read-file"]
  local _43 = _g150["+"]
  local module_key = _g150["module-key"]
  local pairwise = _g150.pairwise
  local tl = _g150.tl
  local nil63 = _g150["nil?"]
  local to_string = _g150["to-string"]
  local sub = _g150.sub
  local string_literal63 = _g150["string-literal?"]
  local stash = _g150.stash
  local exclude = _g150.exclude
  local number63 = _g150["number?"]
  local _60 = _g150["<"]
  local split = _g150.split
  local keys63 = _g150["keys?"]
  local _6261 = _g150[">="]
  local _37 = _g150["%"]
  local _6061 = _g150["<="]
  local id_literal63 = _g150["id-literal?"]
  local unstash = _g150.unstash
  local replicate = _g150.replicate
  local reverse = _g150.reverse
  local list63 = _g150["list?"]
  local _g151 = nexus.utilities
  local special63 = _g151["special?"]
  local quoted = _g151.quoted
  local quasiexpand = _g151.quasiexpand
  local to_id = _g151["to-id"]
  local toplevel63 = _g151["toplevel?"]
  local getenv = _g151.getenv
  local quote_modules = _g151["quote-modules"]
  local symbol_expansion = _g151["symbol-expansion"]
  local macro_function = _g151["macro-function"]
  local macroexpand = _g151.macroexpand
  local valid_id63 = _g151["valid-id?"]
  local symbol63 = _g151["symbol?"]
  local special_form63 = _g151["special-form?"]
  local variable63 = _g151["variable?"]
  local initial_environment = _g151["initial-environment"]
  local reserved63 = _g151["reserved?"]
  local exported = _g151.exported
  local imported = _g151.imported
  local bind42 = _g151["bind*"]
  local indentation = _g151.indentation
  local quote_environment = _g151["quote-environment"]
  local mapo = _g151.mapo
  local stash42 = _g151["stash*"]
  local statement63 = _g151["statement?"]
  local bound63 = _g151["bound?"]
  local macro63 = _g151["macro?"]
  local bind = _g151.bind
  local _g154 = nexus.compiler
  local compile_function = _g154["compile-function"]
  local load_module = _g154["load-module"]
  local compile = _g154.compile
  local compile_module = _g154["compile-module"]
  local in_module = _g154["in-module"]
  local open_module = _g154["open-module"]
  local eval = _g154.eval
end)();
(function ()
  local _g335 = nexus.runtime
  local inner = _g335.inner
  local reduce = _g335.reduce
  local empty63 = _g335["empty?"]
  local drop = _g335.drop
  local composite63 = _g335["composite?"]
  local none63 = _g335["none?"]
  local table63 = _g335["table?"]
  local toplevel63 = _g335["toplevel?"]
  local write = _g335.write
  local make_id = _g335["make-id"]
  local iterate = _g335.iterate
  local write_file = _g335["write-file"]
  local _37message_handler = _g335["%message-handler"]
  local function63 = _g335["function?"]
  local last = _g335.last
  local some63 = _g335["some?"]
  local splice = _g335.splice
  local exit = _g335.exit
  local join = _g335.join
  local length = _g335.length
  local parse_number = _g335["parse-number"]
  local module = _g335.module
  local substring = _g335.substring
  local extend = _g335.extend
  local add = _g335.add
  local _ = _g335["-"]
  local apply = _g335.apply
  local _42 = _g335["*"]
  local sublist = _g335.sublist
  local atom63 = _g335["atom?"]
  local code = _g335.code
  local boolean63 = _g335["boolean?"]
  local map = _g335.map
  local _47 = _g335["/"]
  local _62 = _g335[">"]
  local _61 = _g335["="]
  local cat = _g335.cat
  local keep = _g335.keep
  local char = _g335.char
  local hd = _g335.hd
  local find = _g335.find
  local is63 = _g335["is?"]
  local search = _g335.search
  local string63 = _g335["string?"]
  local setenv = _g335.setenv
  local read_file = _g335["read-file"]
  local _43 = _g335["+"]
  local module_key = _g335["module-key"]
  local pairwise = _g335.pairwise
  local tl = _g335.tl
  local nil63 = _g335["nil?"]
  local to_string = _g335["to-string"]
  local sub = _g335.sub
  local string_literal63 = _g335["string-literal?"]
  local stash = _g335.stash
  local exclude = _g335.exclude
  local number63 = _g335["number?"]
  local _60 = _g335["<"]
  local split = _g335.split
  local keys63 = _g335["keys?"]
  local _6261 = _g335[">="]
  local _37 = _g335["%"]
  local _6061 = _g335["<="]
  local id_literal63 = _g335["id-literal?"]
  local unstash = _g335.unstash
  local replicate = _g335.replicate
  local reverse = _g335.reverse
  local list63 = _g335["list?"]
  local _g336 = nexus.utilities
  local special63 = _g336["special?"]
  local quoted = _g336.quoted
  local quasiexpand = _g336.quasiexpand
  local to_id = _g336["to-id"]
  local toplevel63 = _g336["toplevel?"]
  local getenv = _g336.getenv
  local quote_modules = _g336["quote-modules"]
  local symbol_expansion = _g336["symbol-expansion"]
  local macro_function = _g336["macro-function"]
  local macroexpand = _g336.macroexpand
  local valid_id63 = _g336["valid-id?"]
  local symbol63 = _g336["symbol?"]
  local special_form63 = _g336["special-form?"]
  local variable63 = _g336["variable?"]
  local initial_environment = _g336["initial-environment"]
  local reserved63 = _g336["reserved?"]
  local exported = _g336.exported
  local imported = _g336.imported
  local bind42 = _g336["bind*"]
  local indentation = _g336.indentation
  local quote_environment = _g336["quote-environment"]
  local mapo = _g336.mapo
  local stash42 = _g336["stash*"]
  local statement63 = _g336["statement?"]
  local bound63 = _g336["bound?"]
  local macro63 = _g336["macro?"]
  local bind = _g336.bind
  local _g339 = nexus.compiler
  local compile_function = _g339["compile-function"]
  local load_module = _g339["load-module"]
  local compile = _g339.compile
  local compile_module = _g339["compile-module"]
  local in_module = _g339["in-module"]
  local open_module = _g339["open-module"]
  local eval = _g339.eval
  target = "lua"
end)();
(function ()
  local _g605 = nexus.runtime
  local inner = _g605.inner
  local reduce = _g605.reduce
  local empty63 = _g605["empty?"]
  local drop = _g605.drop
  local composite63 = _g605["composite?"]
  local none63 = _g605["none?"]
  local table63 = _g605["table?"]
  local toplevel63 = _g605["toplevel?"]
  local write = _g605.write
  local make_id = _g605["make-id"]
  local iterate = _g605.iterate
  local write_file = _g605["write-file"]
  local _37message_handler = _g605["%message-handler"]
  local function63 = _g605["function?"]
  local last = _g605.last
  local some63 = _g605["some?"]
  local splice = _g605.splice
  local exit = _g605.exit
  local join = _g605.join
  local length = _g605.length
  local parse_number = _g605["parse-number"]
  local module = _g605.module
  local substring = _g605.substring
  local extend = _g605.extend
  local add = _g605.add
  local _ = _g605["-"]
  local apply = _g605.apply
  local _42 = _g605["*"]
  local sublist = _g605.sublist
  local atom63 = _g605["atom?"]
  local code = _g605.code
  local boolean63 = _g605["boolean?"]
  local map = _g605.map
  local _47 = _g605["/"]
  local _62 = _g605[">"]
  local _61 = _g605["="]
  local cat = _g605.cat
  local keep = _g605.keep
  local char = _g605.char
  local hd = _g605.hd
  local find = _g605.find
  local is63 = _g605["is?"]
  local search = _g605.search
  local string63 = _g605["string?"]
  local setenv = _g605.setenv
  local read_file = _g605["read-file"]
  local _43 = _g605["+"]
  local module_key = _g605["module-key"]
  local pairwise = _g605.pairwise
  local tl = _g605.tl
  local nil63 = _g605["nil?"]
  local to_string = _g605["to-string"]
  local sub = _g605.sub
  local string_literal63 = _g605["string-literal?"]
  local stash = _g605.stash
  local exclude = _g605.exclude
  local number63 = _g605["number?"]
  local _60 = _g605["<"]
  local split = _g605.split
  local keys63 = _g605["keys?"]
  local _6261 = _g605[">="]
  local _37 = _g605["%"]
  local _6061 = _g605["<="]
  local id_literal63 = _g605["id-literal?"]
  local unstash = _g605.unstash
  local replicate = _g605.replicate
  local reverse = _g605.reverse
  local list63 = _g605["list?"]
  local _g606 = nexus.utilities
  local special63 = _g606["special?"]
  local quoted = _g606.quoted
  local quasiexpand = _g606.quasiexpand
  local to_id = _g606["to-id"]
  local toplevel63 = _g606["toplevel?"]
  local getenv = _g606.getenv
  local quote_modules = _g606["quote-modules"]
  local symbol_expansion = _g606["symbol-expansion"]
  local macro_function = _g606["macro-function"]
  local macroexpand = _g606.macroexpand
  local valid_id63 = _g606["valid-id?"]
  local symbol63 = _g606["symbol?"]
  local special_form63 = _g606["special-form?"]
  local variable63 = _g606["variable?"]
  local initial_environment = _g606["initial-environment"]
  local reserved63 = _g606["reserved?"]
  local exported = _g606.exported
  local imported = _g606.imported
  local bind42 = _g606["bind*"]
  local indentation = _g606.indentation
  local quote_environment = _g606["quote-environment"]
  local mapo = _g606.mapo
  local stash42 = _g606["stash*"]
  local statement63 = _g606["statement?"]
  local bound63 = _g606["bound?"]
  local macro63 = _g606["macro?"]
  local bind = _g606.bind
  local _g609 = nexus.compiler
  local compile_function = _g609["compile-function"]
  local load_module = _g609["load-module"]
  local compile = _g609.compile
  local compile_module = _g609["compile-module"]
  local in_module = _g609["in-module"]
  local open_module = _g609["open-module"]
  local eval = _g609.eval
  modules = {compiler = {export = {["compile-call"] = {variable = true}, ["lower-do"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["module-path"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-try"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["current-module"] = {export = true, global = true}, ["lower-for"] = {variable = true}, ["load-module"] = {variable = true, export = true}, ["compile-infix"] = {variable = true}, compile = {variable = true, export = true}, ["lower-call"] = {variable = true}, encapsulate = {variable = true}, ["lower-if"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["compiler-output"] = {variable = true}, ["in-module"] = {variable = true, export = true}, terminator = {variable = true}, infix = {variable = true}, ["compiling?"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["lower-while"] = {variable = true}, ["compile-atom"] = {variable = true}, prologue = {variable = true}, ["%compile-module"] = {variable = true}, eval = {variable = true, export = true}, run = {variable = true}, ["lower-function"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-body"] = {variable = true}, process = {variable = true}, ["can-return?"] = {variable = true}, ["lower-special"] = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-special"] = {variable = true}, ["%result"] = {export = true, global = true}, ["compile-args"] = {variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, core = {export = {["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g622 = sub(body, 0)
    local form = join({"fn", args}, _g622)
    local keys = sub(_g622, length(_g622))
    local _g623 = {"setenv", {"quote", name}}
    _g623.form = {"quote", form}
    _g623.special = form
    eval(join(_g623, keys))
    return(nil)
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g624 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g625 = join({"do"}, macroexpand(_g624))
    drop(environment)
    return(_g625)
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g626 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g626)})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g627 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g627)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g628 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g629 = {"table"}
    _g629._scope = scope
    return({"do", {"add", "environment", _g629}, {"let", {x, join({"do"}, _g628)}, {"drop", "environment"}, x}})
  end}, guard = {export = true, macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, target = {global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g334, x)
      return(x)
    end, body)))
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g630 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g709
    if nil63(v) then
      local _g710
      if b.i then
        _g710 = "i"
      else
        _g710 = make_id()
      end
      local i = _g710
      _g709 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g630), {"inc", i}}}
    else
      local _g631 = {"target"}
      _g631.js = {"isNaN", {"parseInt", k}}
      _g631.lua = {"not", {"number?", k}}
      _g709 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g631, join({"let", {v, {"get", t1, k}}}, _g630)}}}
    end
    return({"let", {t1, t}, _g709})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g632 = body
      local k = nil
      for k in next, _g632 do
        if (not number63(k)) then
          local v = _g632[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["with-bindings"] = {export = true, macro = function (_g633, ...)
    local names = _g633[1]
    local body = unstash({...})
    local _g634 = sub(body, 0)
    local x = make_id()
    local _g636 = {"setenv", x}
    _g636.variable = true
    local _g635 = {"with-frame", {"each", {x}, names, _g636}}
    _g635.scope = true
    return(join(_g635, _g634))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g637 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g638)
      local lh = _g638[1]
      local rh = _g638[2]
      local _g639 = bind(lh, rh)
      local _g640 = 0
      while (_g640 < length(_g639)) do
        local _g641 = _g639[(_g640 + 1)]
        local id = _g641[1]
        local val = _g641[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g640 = (_g640 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g637)})))
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g642 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g642) then
      local _g643 = bind42(x, _g642)
      local args = _g643[1]
      local _g644 = _g643[2]
      return(join({"%global-function", name, args}, _g644))
    else
      if (target == "js") then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g645 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g645) then
      local _g646 = bind42(x, _g645)
      local args = _g646[1]
      local _g647 = _g646[2]
      return(join({"%local-function", name, args}, _g647))
    else
      return({"%local", name, x})
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g648 = sub(body, 0)
    local form = join({"fn", args}, _g648)
    local _g649 = {"setenv", {"quote", name}}
    _g649.form = {"quote", form}
    _g649.macro = form
    eval(_g649)
    return(nil)
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g650 = sub(body, 0)
    add(environment, {})
    map(function (_g652)
      local name = _g652[1]
      local exp = _g652[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g651 = join({"do"}, macroexpand(_g650))
    drop(environment)
    return(_g651)
  end}, at = {export = true, macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g653)
      local a = _g653[1]
      local b = _g653[2]
      local c = sub(_g653, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g654 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g654)})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g655 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g655)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g656 = elements
    local _g657 = 0
    while (_g657 < length(_g656)) do
      local e = _g656[(_g657 + 1)]
      l[e] = true
      _g657 = (_g657 + 1)
    end
    return(join({"table"}, l))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g658 = sub(body, 0)
    local _g659 = bind42(args, _g658)
    local _g660 = _g659[1]
    local _g661 = _g659[2]
    return(join({"%function", _g660}, _g661))
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g662 = sub(body, 0)
    local imports = {}
    local exp = _g662.export
    local imp = _g662.import
    local _g663 = (imp or {})
    local _g664 = 0
    while (_g664 < length(_g663)) do
      local k = _g663[(_g664 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g664 = (_g664 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g665 = (exp or {})
    local _g666 = 0
    while (_g666 < length(_g665)) do
      local k = _g665[(_g666 + 1)]
      setenv(k, {_stash = true, export = true})
      _g666 = (_g666 + 1)
    end
    return(join({"do"}, imports))
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g667 = sub(body, 0)
    return({"if", cond, join({"do"}, _g667)})
  end}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, boot = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, lib = {export = {}, import = {"core", "special"}}, optimizer = {export = {["define-optimization"] = {}, optimize = {variable = true, export = true}, optimizations = {variable = true}}, import = {"runtime", "special", "core"}}, main = {export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g668 = sub(specs, 0)
    map(compile_module, _g668)
    return(nil)
  end}}, import = {"runtime", "special", "core", "reader", "compiler"}}, runtime = {export = {inner = {variable = true, export = true}, reduce = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, drop = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, write = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, iterate = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, last = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, splice = {variable = true, export = true}, exit = {variable = true, export = true}, join = {variable = true, export = true}, length = {variable = true, export = true}, ["parse-number"] = {variable = true, export = true}, module = {variable = true, export = true}, substring = {variable = true, export = true}, ["id-count"] = {variable = true}, extend = {variable = true, export = true}, add = {variable = true, export = true}, ["-"] = {variable = true, export = true}, apply = {variable = true, export = true}, ["*"] = {variable = true, export = true}, sublist = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, code = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, map = {variable = true, export = true}, ["/"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, cat = {variable = true, export = true}, keep = {variable = true, export = true}, char = {variable = true, export = true}, hd = {variable = true, export = true}, find = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, search = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, setenv = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["splice?"] = {variable = true}, mapl = {variable = true}, ["+"] = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, pairwise = {variable = true, export = true}, tl = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, ["to-string"] = {variable = true, export = true}, sub = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, stash = {variable = true, export = true}, exclude = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, split = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, unstash = {variable = true, export = true}, replicate = {variable = true, export = true}, reverse = {variable = true, export = true}, ["list?"] = {variable = true, export = true}}, import = {"special", "core"}}, system = {export = {nexus = {export = true, global = true}}, import = {"special", "core"}}, special = {export = {["%if"] = {tr = true, stmt = true, special = function (_g669)
    local cond = _g669[1]
    local _g670 = _g669[2]
    local _g671 = _g669[3]
    local _g672 = compile(cond)
    indent_level = (indent_level + 1)
    local _g675 = compile(_g670, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local _g673 = _g675
    local _g711
    if _g671 then
      indent_level = (indent_level + 1)
      local _g676 = compile(_g671, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      _g711 = _g676
    end
    local _g674 = _g711
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g672 .. ") {\n" .. _g673 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g672 .. " then\n" .. _g673)
    end
    if (_g674 and (target == "js")) then
      str = (str .. " else {\n" .. _g674 .. ind .. "}")
    else
      if _g674 then
        str = (str .. ind .. "else\n" .. _g674)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end, export = true}, ["%try"] = {tr = true, stmt = true, special = function (_g677)
    local form = _g677[1]
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g678 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g678
    local e = make_id()
    local handler = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = (indent_level + 1)
    local _g679 = compile(handler, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local h = _g679
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, export = true}, ["return"] = {special = function (_g680)
    local x = _g680[1]
    local _g712
    if nil63(x) then
      _g712 = "return"
    else
      _g712 = ("return(" .. compile(x) .. ")")
    end
    local _g681 = _g712
    return((indentation() .. _g681))
  end, stmt = true, export = true}, ["set"] = {special = function (_g682)
    local lh = _g682[1]
    local rh = _g682[2]
    local _g683 = compile(lh)
    local _g713
    if nil63(rh) then
      _g713 = "nil"
    else
      _g713 = rh
    end
    local _g684 = compile(_g713)
    return((indentation() .. _g683 .. " = " .. _g684))
  end, stmt = true, export = true}, ["%for"] = {tr = true, stmt = true, special = function (_g685)
    local t = _g685[1]
    local k = _g685[2]
    local form = _g685[3]
    local _g686 = compile(t)
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g687 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g687
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g686 .. " do\n" .. body .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g686 .. ") {\n" .. body .. ind .. "}\n"))
    end
  end, export = true}, ["%array"] = {export = true, special = function (forms)
    local _g714
    if (target == "lua") then
      _g714 = "{"
    else
      _g714 = "["
    end
    local open = _g714
    local _g715
    if (target == "lua") then
      _g715 = "}"
    else
      _g715 = "]"
    end
    local close = _g715
    local str = ""
    local _g688 = forms
    local i = 0
    while (i < length(_g688)) do
      local x = _g688[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["get"] = {export = true, special = function (_g689)
    local t = _g689[1]
    local k = _g689[2]
    local _g690 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g690, 0) == "{")) then
      _g690 = ("(" .. _g690 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g690 .. "." .. inner(k)))
    else
      return((_g690 .. "[" .. k1 .. "]"))
    end
  end}, ["error"] = {special = function (_g691)
    local x = _g691[1]
    local _g716
    if (target == "js") then
      _g716 = ("throw new " .. compile({"Error", x}))
    else
      _g716 = ("error(" .. compile(x) .. ")")
    end
    local e = _g716
    return((indentation() .. e))
  end, stmt = true, export = true}, ["do"] = {tr = true, stmt = true, special = function (forms)
    local str = ""
    local _g692 = forms
    local _g693 = 0
    while (_g693 < length(_g692)) do
      local x = _g692[(_g693 + 1)]
      str = (str .. compile(x, {_stash = true, stmt = true}))
      _g693 = (_g693 + 1)
    end
    return(str)
  end, export = true}, ["while"] = {tr = true, stmt = true, special = function (_g694)
    local condition = _g694[1]
    local form = _g694[2]
    local _g695 = compile(condition)
    indent_level = (indent_level + 1)
    local _g696 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g696
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g695 .. ") {\n" .. body .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g695 .. " do\n" .. body .. ind .. "end\n"))
    end
  end, export = true}, ["%object"] = {export = true, special = function (forms)
    local str = "{"
    local _g717
    if (target == "lua") then
      _g717 = " = "
    else
      _g717 = ": "
    end
    local sep = _g717
    local pairs = pairwise(forms)
    local _g697 = pairs
    local i = 0
    while (i < length(_g697)) do
      local _g698 = _g697[(i + 1)]
      local k = _g698[1]
      local v = _g698[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g699 = compile(v)
      local _g718
      if valid_id63(k) then
        _g718 = k
      else
        local _g719
        if ((target == "js") and string_literal63(k)) then
          _g719 = k
        else
          local _g720
          if (target == "js") then
            _g720 = quoted(k)
          else
            local _g721
            if string_literal63(k) then
              _g721 = ("[" .. k .. "]")
            else
              _g721 = ("[" .. quoted(k) .. "]")
            end
            _g720 = _g721
          end
          _g719 = _g720
        end
        _g718 = _g719
      end
      local _g700 = _g718
      str = (str .. _g700 .. sep .. _g699)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}, ["%local"] = {special = function (_g701)
    local name = _g701[1]
    local value = _g701[2]
    local id = compile(name)
    local value1 = compile(value)
    local _g722
    if is63(value) then
      _g722 = (" = " .. value1)
    else
      _g722 = ""
    end
    local rh = _g722
    local _g723
    if (target == "js") then
      _g723 = "var "
    else
      _g723 = "local "
    end
    local keyword = _g723
    local ind = indentation()
    return((ind .. keyword .. id .. rh))
  end, stmt = true, export = true}, ["%global-function"] = {tr = true, stmt = true, special = function (_g702)
    local name = _g702[1]
    local args = _g702[2]
    local body = _g702[3]
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true}, ["%function"] = {export = true, special = function (_g703)
    local args = _g703[1]
    local body = _g703[2]
    return(compile_function(args, body))
  end}, ["break"] = {special = function (_g149)
    return((indentation() .. "break"))
  end, stmt = true, export = true}, ["not"] = {export = true, special = function (_g704)
    local x = _g704[1]
    local _g705 = compile(x)
    local _g724
    if (target == "js") then
      _g724 = "!("
    else
      _g724 = "(not "
    end
    local open = _g724
    return((open .. _g705 .. ")"))
  end}, ["%local-function"] = {tr = true, stmt = true, special = function (_g706)
    local name = _g706[1]
    local args = _g706[2]
    local body = _g706[3]
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, export = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, utilities = {export = {["indent-level"] = {export = true, global = true}, ["numeric?"] = {variable = true}, ["quote-module"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["special?"] = {variable = true, export = true}, ["quote-frame"] = {variable = true}, quoted = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["to-id"] = {variable = true, export = true}, ["global?"] = {variable = true}, ["toplevel?"] = {variable = true, export = true}, getenv = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, ["valid-char?"] = {variable = true}, macroexpand = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["symbol?"] = {variable = true, export = true}, ["quote-binding"] = {variable = true}, ["quasiquote-list"] = {variable = true}, reserved = {variable = true}, ["special-form?"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["quasiquoting?"] = {variable = true}, ["reserved?"] = {variable = true, export = true}, exported = {variable = true, export = true}, escape = {variable = true}, imported = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, indentation = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, mapo = {variable = true, export = true}, ["quoting?"] = {variable = true}, ["stash*"] = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, ["bound?"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, bind = {variable = true, export = true}}, import = {"runtime", "special", "core"}}, reader = {export = {["flag?"] = {variable = true}, ["peek-char"] = {variable = true}, ["read-table"] = {variable = true, export = true}, ["make-stream"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["read-char"] = {variable = true}, ["read-all"] = {variable = true, export = true}, ["define-reader"] = {export = true, macro = function (_g707, ...)
    local char = _g707[1]
    local stream = _g707[2]
    local body = unstash({...})
    local _g708 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g708)})
  end}, ["key?"] = {variable = true}, whitespace = {variable = true}, read = {variable = true, export = true}, eof = {variable = true}, ["read-from-string"] = {variable = true, export = true}, delimiters = {variable = true}}, import = {"runtime", "special", "core"}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g725 = sub(body, 0)
    local imports = {}
    local exp = _g725.export
    local imp = _g725.import
    local _g726 = (imp or {})
    local _g727 = 0
    while (_g727 < length(_g726)) do
      local k = _g726[(_g727 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g727 = (_g727 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g728 = (exp or {})
    local _g729 = 0
    while (_g729 < length(_g728)) do
      local k = _g728[(_g729 + 1)]
      setenv(k, {_stash = true, export = true})
      _g729 = (_g729 + 1)
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local inner = _g2.inner
  local stash = _g2.stash
  local empty63 = _g2["empty?"]
  local drop = _g2.drop
  local string_literal63 = _g2["string-literal?"]
  local none63 = _g2["none?"]
  local table63 = _g2["table?"]
  local toplevel63 = _g2["toplevel?"]
  local make_id = _g2["make-id"]
  local number63 = _g2["number?"]
  local write_file = _g2["write-file"]
  local _37message_handler = _g2["%message-handler"]
  local function63 = _g2["function?"]
  local last = _g2.last
  local some63 = _g2["some?"]
  local splice = _g2.splice
  local exit = _g2.exit
  local join = _g2.join
  local list63 = _g2["list?"]
  local parse_number = _g2["parse-number"]
  local module = _g2.module
  local substring = _g2.substring
  local extend = _g2.extend
  local add = _g2.add
  local _ = _g2["-"]
  local _43 = _g2["+"]
  local _42 = _g2["*"]
  local nil63 = _g2["nil?"]
  local atom63 = _g2["atom?"]
  local code = _g2.code
  local boolean63 = _g2["boolean?"]
  local map = _g2.map
  local _47 = _g2["/"]
  local _62 = _g2[">"]
  local _61 = _g2["="]
  local cat = _g2.cat
  local keep = _g2.keep
  local char = _g2.char
  local hd = _g2.hd
  local find = _g2.find
  local is63 = _g2["is?"]
  local search = _g2.search
  local string63 = _g2["string?"]
  local setenv = _g2.setenv
  local read_file = _g2["read-file"]
  local exclude = _g2.exclude
  local _6261 = _g2[">="]
  local module_key = _g2["module-key"]
  local sublist = _g2.sublist
  local tl = _g2.tl
  local write = _g2.write
  local reduce = _g2.reduce
  local length = _g2.length
  local pairwise = _g2.pairwise
  local apply = _g2.apply
  local sub = _g2.sub
  local unstash = _g2.unstash
  local composite63 = _g2["composite?"]
  local _60 = _g2["<"]
  local keys63 = _g2["keys?"]
  local to_string = _g2["to-string"]
  local _37 = _g2["%"]
  local _6061 = _g2["<="]
  local id_literal63 = _g2["id-literal?"]
  local split = _g2.split
  local replicate = _g2.replicate
  local reverse = _g2.reverse
  local iterate = _g2.iterate
  local _g5 = nexus.reader
  local read_table = _g5["read-table"]
  local make_stream = _g5["make-stream"]
  local read_from_string = _g5["read-from-string"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local _g6 = nexus.compiler
  local compile_function = _g6["compile-function"]
  local lower = _g6.lower
  local load_module = _g6["load-module"]
  local compile = _g6.compile
  local compile_module = _g6["compile-module"]
  local in_module = _g6["in-module"]
  local eval = _g6.eval
  local open_module = _g6["open-module"]
  local function rep(str)
    local _g732,_g733 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g731 = {_g732, _g733}
    local _g1 = _g731[1]
    local x = _g731[2]
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
    local _g734 = args
    local i = 0
    while (i < length(_g734)) do
      local arg = _g734[(i + 1)]
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
  local _g735 = {}
  nexus.main = _g735
  _g735.repl = repl
  _g735.rep = rep
  _g735.usage = usage
  _g735.main = main
end)();
