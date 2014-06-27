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
  _g54["composite?"] = composite63
  _g54["<"] = _60
  _g54[">"] = _62
  _g54["="] = _61
  _g54.last = last
  _g54.sub = sub
  _g54["/"] = _47
  _g54["+"] = _43
  _g54.split = split
  _g54["-"] = _
  _g54.exit = exit
  _g54["some?"] = some63
  _g54.replicate = replicate
  _g54["table?"] = table63
  _g54["<="] = _6061
  _g54.splice = splice
  _g54[">="] = _6261
  _g54.stash = stash
  _g54.join = join
  _g54["none?"] = none63
  _g54.cat = cat
  _g54["toplevel?"] = toplevel63
  _g54.hd = hd
  _g54["is?"] = is63
  _g54["atom?"] = atom63
  _g54.exclude = exclude
  _g54["boolean?"] = boolean63
  _g54["read-file"] = read_file
  _g54.search = search
  _g54.sublist = sublist
  _g54["empty?"] = empty63
  _g54.reverse = reverse
  _g54["nil?"] = nil63
  _g54.unstash = unstash
  _g54.find = find
  _g54.map = map
  _g54.pairwise = pairwise
  _g54["list?"] = list63
  _g54.module = module
  _g54.char = char
  _g54["id-count"] = id_count
  _g54.mapl = mapl
  _g54["id-literal?"] = id_literal63
  _g54["splice?"] = splice63
  _g54.setenv = setenv
  _g54.tl = tl
  _g54["module-key"] = module_key
  _g54["%message-handler"] = _37message_handler
  _g54["number?"] = number63
  _g54["*"] = _42
  _g54.apply = apply
  _g54["keys?"] = keys63
  _g54.length = length
  _g54["string?"] = string63
  _g54["%"] = _37
  _g54.reduce = reduce
  _g54["function?"] = function63
  _g54.drop = drop
  _g54["to-string"] = to_string
  _g54.inner = inner
  _g54["write-file"] = write_file
  _g54["parse-number"] = parse_number
  _g54.extend = extend
  _g54.write = write
  _g54.code = code
  _g54["string-literal?"] = string_literal63
  _g54.substring = substring
  _g54.add = add
  _g54.iterate = iterate
  _g54["make-id"] = make_id
  _g54.keep = keep
end)();
(function ()
  local _g59 = nexus.runtime
  local composite63 = _g59["composite?"]
  local _60 = _g59["<"]
  local _62 = _g59[">"]
  local _61 = _g59["="]
  local last = _g59.last
  local sub = _g59.sub
  local _47 = _g59["/"]
  local _43 = _g59["+"]
  local split = _g59.split
  local _ = _g59["-"]
  local exit = _g59.exit
  local some63 = _g59["some?"]
  local replicate = _g59.replicate
  local table63 = _g59["table?"]
  local _6061 = _g59["<="]
  local splice = _g59.splice
  local _6261 = _g59[">="]
  local stash = _g59.stash
  local join = _g59.join
  local none63 = _g59["none?"]
  local cat = _g59.cat
  local toplevel63 = _g59["toplevel?"]
  local hd = _g59.hd
  local is63 = _g59["is?"]
  local atom63 = _g59["atom?"]
  local exclude = _g59.exclude
  local boolean63 = _g59["boolean?"]
  local read_file = _g59["read-file"]
  local search = _g59.search
  local sublist = _g59.sublist
  local empty63 = _g59["empty?"]
  local reverse = _g59.reverse
  local nil63 = _g59["nil?"]
  local unstash = _g59.unstash
  local find = _g59.find
  local map = _g59.map
  local pairwise = _g59.pairwise
  local list63 = _g59["list?"]
  local module = _g59.module
  local char = _g59.char
  local id_literal63 = _g59["id-literal?"]
  local setenv = _g59.setenv
  local tl = _g59.tl
  local module_key = _g59["module-key"]
  local _37message_handler = _g59["%message-handler"]
  local number63 = _g59["number?"]
  local _42 = _g59["*"]
  local apply = _g59.apply
  local keys63 = _g59["keys?"]
  local length = _g59.length
  local string63 = _g59["string?"]
  local _37 = _g59["%"]
  local reduce = _g59.reduce
  local function63 = _g59["function?"]
  local drop = _g59.drop
  local to_string = _g59["to-string"]
  local inner = _g59.inner
  local write_file = _g59["write-file"]
  local parse_number = _g59["parse-number"]
  local extend = _g59.extend
  local write = _g59.write
  local code = _g59.code
  local string_literal63 = _g59["string-literal?"]
  local substring = _g59.substring
  local add = _g59.add
  local iterate = _g59.iterate
  local make_id = _g59["make-id"]
  local keep = _g59.keep
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
    return((macro63(x) or (special63(x) or (symbol63(x) or (variable63(x) or global63(x))))))
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
    return((list63(x) and (can_unquote63(depth) and (hd(x) == "unquote-splicing"))))
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
      return(((length(x) > 1) or ((not (hd(x) == "list")) or keys63(x))))
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
  local reserved = {["or"] = true, ["=="] = true, ["else"] = true, ["*"] = true, ["try"] = true, ["instanceof"] = true, ["then"] = true, ["do"] = true, ["local"] = true, [">"] = true, ["end"] = true, ["<"] = true, ["if"] = true, ["until"] = true, ["default"] = true, ["case"] = true, ["in"] = true, ["/"] = true, ["nil"] = true, ["-"] = true, ["function"] = true, ["<="] = true, ["+"] = true, ["while"] = true, ["delete"] = true, ["and"] = true, ["throw"] = true, [">="] = true, ["this"] = true, ["false"] = true, ["with"] = true, ["for"] = true, ["typeof"] = true, ["continue"] = true, ["not"] = true, ["switch"] = true, ["break"] = true, ["true"] = true, ["%"] = true, ["catch"] = true, ["void"] = true, ["return"] = true, ["finally"] = true, ["new"] = true, ["elseif"] = true, ["="] = true, ["repeat"] = true, ["debugger"] = true, ["var"] = true}
  local function reserved63(x)
    return(reserved[x])
  end
  local function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  local function valid_char63(n)
    return((numeric63(n) or (((n > 64) and (n < 91)) or (((n > 96) and (n < 123)) or (n == 95)))))
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
    _g100.import = quoted(m.import)
    _g100.export = quote_frame(m.export)
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
  _g101["quasisplice?"] = quasisplice63
  _g101["quoting?"] = quoting63
  _g101["global?"] = global63
  _g101.mapo = mapo
  _g101["special?"] = special63
  _g101.getenv = getenv
  _g101["quote-modules"] = quote_modules
  _g101["variable?"] = variable63
  _g101["quasiquoting?"] = quasiquoting63
  _g101.escape = escape
  _g101.indentation = indentation
  _g101.quasiexpand = quasiexpand
  _g101["valid-char?"] = valid_char63
  _g101["numeric?"] = numeric63
  _g101["bind*"] = bind42
  _g101["bound?"] = bound63
  _g101.reserved = reserved
  _g101["statement?"] = statement63
  _g101["symbol?"] = symbol63
  _g101["macro?"] = macro63
  _g101["symbol-expansion"] = symbol_expansion
  _g101["quote-module"] = quote_module
  _g101["quote-frame"] = quote_frame
  _g101["quote-binding"] = quote_binding
  _g101["quasiquote-list"] = quasiquote_list
  _g101["special-form?"] = special_form63
  _g101.quoted = quoted
  _g101["can-unquote?"] = can_unquote63
  _g101["toplevel?"] = toplevel63
  _g101["quote-environment"] = quote_environment
  _g101["macro-function"] = macro_function
  _g101["stash*"] = stash42
  _g101["reserved?"] = reserved63
  _g101.imported = imported
  _g101["initial-environment"] = initial_environment
  _g101.macroexpand = macroexpand
  _g101.exported = exported
  _g101["to-id"] = to_id
  _g101.bind = bind
  _g101["valid-id?"] = valid_id63
end)();
(function ()
  local _g102 = nexus.runtime
  local composite63 = _g102["composite?"]
  local _60 = _g102["<"]
  local _62 = _g102[">"]
  local _61 = _g102["="]
  local last = _g102.last
  local sub = _g102.sub
  local _47 = _g102["/"]
  local _43 = _g102["+"]
  local split = _g102.split
  local _ = _g102["-"]
  local exit = _g102.exit
  local some63 = _g102["some?"]
  local replicate = _g102.replicate
  local table63 = _g102["table?"]
  local _6061 = _g102["<="]
  local splice = _g102.splice
  local _6261 = _g102[">="]
  local stash = _g102.stash
  local join = _g102.join
  local none63 = _g102["none?"]
  local cat = _g102.cat
  local toplevel63 = _g102["toplevel?"]
  local hd = _g102.hd
  local is63 = _g102["is?"]
  local atom63 = _g102["atom?"]
  local exclude = _g102.exclude
  local boolean63 = _g102["boolean?"]
  local read_file = _g102["read-file"]
  local search = _g102.search
  local sublist = _g102.sublist
  local empty63 = _g102["empty?"]
  local reverse = _g102.reverse
  local nil63 = _g102["nil?"]
  local unstash = _g102.unstash
  local find = _g102.find
  local map = _g102.map
  local pairwise = _g102.pairwise
  local list63 = _g102["list?"]
  local module = _g102.module
  local char = _g102.char
  local id_literal63 = _g102["id-literal?"]
  local setenv = _g102.setenv
  local tl = _g102.tl
  local module_key = _g102["module-key"]
  local _37message_handler = _g102["%message-handler"]
  local number63 = _g102["number?"]
  local _42 = _g102["*"]
  local apply = _g102.apply
  local keys63 = _g102["keys?"]
  local length = _g102.length
  local string63 = _g102["string?"]
  local _37 = _g102["%"]
  local reduce = _g102.reduce
  local function63 = _g102["function?"]
  local drop = _g102.drop
  local to_string = _g102["to-string"]
  local inner = _g102.inner
  local write_file = _g102["write-file"]
  local parse_number = _g102["parse-number"]
  local extend = _g102.extend
  local write = _g102.write
  local code = _g102.code
  local string_literal63 = _g102["string-literal?"]
  local substring = _g102.substring
  local add = _g102.add
  local iterate = _g102.iterate
  local make_id = _g102["make-id"]
  local keep = _g102.keep
  local delimiters = {["\n"] = true, [";"] = true, ["("] = true, [")"] = true}
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
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
    return((string63(atom) and ((length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":"))))
  end
  local function flag63(atom)
    return((string63(atom) and ((length(atom) > 1) and (char(atom, 0) == ":"))))
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
  _g112.eof = eof
  _g112["make-stream"] = make_stream
  _g112["read-from-string"] = read_from_string
  _g112["flag?"] = flag63
  _g112["read-table"] = read_table
  _g112["skip-non-code"] = skip_non_code
  _g112["key?"] = key63
  _g112["read-char"] = read_char
  _g112["peek-char"] = peek_char
  _g112.delimiters = delimiters
  _g112.whitespace = whitespace
  _g112.read = read
  _g112["read-all"] = read_all
end)();
(function ()
  local _g113 = nexus.runtime
  local composite63 = _g113["composite?"]
  local _60 = _g113["<"]
  local _62 = _g113[">"]
  local _61 = _g113["="]
  local last = _g113.last
  local sub = _g113.sub
  local _47 = _g113["/"]
  local _43 = _g113["+"]
  local split = _g113.split
  local _ = _g113["-"]
  local exit = _g113.exit
  local some63 = _g113["some?"]
  local replicate = _g113.replicate
  local table63 = _g113["table?"]
  local _6061 = _g113["<="]
  local splice = _g113.splice
  local _6261 = _g113[">="]
  local stash = _g113.stash
  local join = _g113.join
  local none63 = _g113["none?"]
  local cat = _g113.cat
  local toplevel63 = _g113["toplevel?"]
  local hd = _g113.hd
  local is63 = _g113["is?"]
  local atom63 = _g113["atom?"]
  local exclude = _g113.exclude
  local boolean63 = _g113["boolean?"]
  local read_file = _g113["read-file"]
  local search = _g113.search
  local sublist = _g113.sublist
  local empty63 = _g113["empty?"]
  local reverse = _g113.reverse
  local nil63 = _g113["nil?"]
  local unstash = _g113.unstash
  local find = _g113.find
  local map = _g113.map
  local pairwise = _g113.pairwise
  local list63 = _g113["list?"]
  local module = _g113.module
  local char = _g113.char
  local id_literal63 = _g113["id-literal?"]
  local setenv = _g113.setenv
  local tl = _g113.tl
  local module_key = _g113["module-key"]
  local _37message_handler = _g113["%message-handler"]
  local number63 = _g113["number?"]
  local _42 = _g113["*"]
  local apply = _g113.apply
  local keys63 = _g113["keys?"]
  local length = _g113.length
  local string63 = _g113["string?"]
  local _37 = _g113["%"]
  local reduce = _g113.reduce
  local function63 = _g113["function?"]
  local drop = _g113.drop
  local to_string = _g113["to-string"]
  local inner = _g113.inner
  local write_file = _g113["write-file"]
  local parse_number = _g113["parse-number"]
  local extend = _g113.extend
  local write = _g113.write
  local code = _g113.code
  local string_literal63 = _g113["string-literal?"]
  local substring = _g113.substring
  local add = _g113.add
  local iterate = _g113.iterate
  local make_id = _g113["make-id"]
  local keep = _g113.keep
  local _g114 = nexus.utilities
  local mapo = _g114.mapo
  local special63 = _g114["special?"]
  local getenv = _g114.getenv
  local quote_modules = _g114["quote-modules"]
  local variable63 = _g114["variable?"]
  local indentation = _g114.indentation
  local quasiexpand = _g114.quasiexpand
  local bind42 = _g114["bind*"]
  local bound63 = _g114["bound?"]
  local statement63 = _g114["statement?"]
  local symbol63 = _g114["symbol?"]
  local macro63 = _g114["macro?"]
  local symbol_expansion = _g114["symbol-expansion"]
  local special_form63 = _g114["special-form?"]
  local quoted = _g114.quoted
  local toplevel63 = _g114["toplevel?"]
  local quote_environment = _g114["quote-environment"]
  local macro_function = _g114["macro-function"]
  local stash42 = _g114["stash*"]
  local reserved63 = _g114["reserved?"]
  local imported = _g114.imported
  local initial_environment = _g114["initial-environment"]
  local macroexpand = _g114.macroexpand
  local exported = _g114.exported
  local to_id = _g114["to-id"]
  local bind = _g114.bind
  local valid_id63 = _g114["valid-id?"]
  local _g117 = nexus.reader
  local make_stream = _g117["make-stream"]
  local read_from_string = _g117["read-from-string"]
  local read_table = _g117["read-table"]
  local read = _g117.read
  local read_all = _g117["read-all"]
  local infix = {common = {["/"] = true, [">="] = true, ["<"] = true, ["+"] = true, [">"] = true, ["-"] = true, ["*"] = true, ["<="] = true, ["%"] = true}, js = {["or"] = "||", ["~="] = "!=", ["and"] = "&&", cat = "+", ["="] = "==="}, lua = {["or"] = true, ["~="] = true, ["and"] = true, cat = "..", ["="] = "=="}}
  local function getop(op)
    local op1 = (infix.common[op] or infix[target][op])
    if (op1 == true) then
      return(op)
    else
      return(op1)
    end
  end
  local function infix63(x)
    return(is63(getop(x)))
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
    local x = form[1]
    local args = sub(form, 1)
    local _g119 = getenv(x)
    local stmt = _g119.stmt
    local special = _g119.special
    local self_tr63 = _g119.tr
    local tr = terminator((stmt63 and (not self_tr63)))
    return((apply(special, args) .. tr))
  end
  local function compile_call(form)
    if none63(form) then
      return(compile_special({"%array"}))
    else
      local f = hd(form)
      local f1 = compile(f)
      local args = compile_args(stash42(tl(form)))
      if list63(f) then
        return(("(" .. (f1 .. (")" .. args))))
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
    if ((op == "-") and (length(args) == 1)) then
      return((op .. compile(hd(args))))
    else
      local _g121 = getop(op)
      local a = args[1]
      local b = args[2]
      return(("(" .. (compile(a) .. (" " .. (_g121 .. (" " .. (compile(b) .. ")")))))))
    end
  end
  local function compile_function(args, body, ...)
    local _g122 = unstash({...})
    local prefix = _g122.prefix
    local name = _g122.name
    local _g127
    if name then
      _g127 = compile(name)
    else
      _g127 = ""
    end
    local id = _g127
    local _g123 = (prefix or "")
    local _g124 = compile_args(args)
    indent_level = (indent_level + 1)
    local _g126 = compile(body, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local _g125 = _g126
    local ind = indentation()
    local _g128
    if (target == "js") then
      _g128 = ""
    else
      _g128 = "end"
    end
    local tr = _g128
    if name then
      tr = (tr .. "\n")
    end
    if (target == "js") then
      return(("function " .. (id .. (_g124 .. (" {\n" .. (_g125 .. (ind .. ("}" .. tr))))))))
    else
      return((_g123 .. ("function " .. (id .. (_g124 .. ("\n" .. (_g125 .. (ind .. tr))))))))
    end
  end
  local function can_return63(form)
    return((is63(form) and (atom63(form) or ((not (hd(form) == "return")) and (not statement63(hd(form)))))))
  end
  compile = function (form, ...)
    local _g129 = unstash({...})
    local stmt = _g129.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g131
        if stmt then
          _g131 = indentation()
        else
          _g131 = ""
        end
        local ind = _g131
        local _g132
        if atom63(form) then
          _g132 = compile_atom(form)
        else
          local _g133
          if infix63(hd(form)) then
            _g133 = compile_infix(form)
          else
            _g133 = compile_call(form)
          end
          _g132 = _g133
        end
        local _g130 = _g132
        return((ind .. (_g130 .. tr)))
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
    local _g134 = sub(args, 0, (length(args) - 1))
    local _g135 = 0
    while (_g135 < length(_g134)) do
      local x = _g134[(_g135 + 1)]
      add(hoist, lower(x, hoist, stmt63))
      _g135 = (_g135 + 1)
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
    local _g136 = args[2]
    local _g137 = args[3]
    if (stmt63 or tail63) then
      local _g139
      if _g137 then
        _g139 = {lower_body({_g137}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g136}, tail63)}, _g139)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g138
      if _g137 then
        _g138 = {lower({"set", e, _g137})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g136})}, _g138))
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
    local _g140 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g140, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g141 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g141) then
      return(_g141)
    end
  end
  local function lower_infix63(form)
    return((infix63(hd(form)) and (length(form) > 3)))
  end
  local function lower_infix(form, hoist)
    local x = form[1]
    local args = sub(form, 1)
    return(lower(reduce(function (a, b)
      return({x, a, b})
    end, args), hoist))
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
          if lower_infix63(form) then
            return(lower_infix(form, hoist))
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
    local _g142 = map(process, body)
    local epilog = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g142, epilog))}})
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return((compile(form) .. ";\n"))
  end
  _37result = nil
  local function run(x)
    local f = load((compile("%result") .. ("=" .. x)))
    if f then
      f()
      return(_37result)
    else
      local f,e = load(x)
      if f then
        return(f())
      else
        error((e .. (" in " .. x)))
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
    local _g143 = unstash({...})
    local all = _g143.all
    local m = module(spec)
    local frame = last(environment)
    local _g144 = m.export
    local k = nil
    for k in next, _g144 do
      if (not number63(k)) then
        local v = _g144[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g145 = unstash({...})
    local all = _g145.all
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
    local _g146 = {join({"%function", {}}, join(prologue(), {form}))}
    local compiled = compile(process(_g146))
    target = previous
    return(run(compiled))
  end
  local _g147 = {}
  nexus.compiler = _g147
  _g147["module-path"] = module_path
  _g147["compile-special"] = compile_special
  _g147.process = process
  _g147["compile-function"] = compile_function
  _g147["compile-atom"] = compile_atom
  _g147["compile-module"] = compile_module
  _g147.prologue = prologue
  _g147["lower-do"] = lower_do
  _g147["can-return?"] = can_return63
  _g147["%compile-module"] = _37compile_module
  _g147["compile-args"] = compile_args
  _g147.lower = lower
  _g147["lower-special"] = lower_special
  _g147.compile = compile
  _g147.terminator = terminator
  _g147["compile-call"] = compile_call
  _g147["load-module"] = load_module
  _g147["lower-infix?"] = lower_infix63
  _g147["lower-call"] = lower_call
  _g147["compiling?"] = compiling63
  _g147["lower-function"] = lower_function
  _g147.encapsulate = encapsulate
  _g147["lower-infix"] = lower_infix
  _g147["infix?"] = infix63
  _g147["compiler-output"] = compiler_output
  _g147["lower-body"] = lower_body
  _g147["lower-statement"] = lower_statement
  _g147["lower-if"] = lower_if
  _g147["open-module"] = open_module
  _g147["in-module"] = in_module
  _g147["compile-file"] = compile_file
  _g147["lower-for"] = lower_for
  _g147.eval = eval
  _g147["compile-infix"] = compile_infix
  _g147["lower-definition"] = lower_definition
  _g147.run = run
  _g147.infix = infix
  _g147["lower-while"] = lower_while
  _g147["lower-try"] = lower_try
  _g147.getop = getop
end)();
(function ()
  local _g148 = nexus.runtime
  local composite63 = _g148["composite?"]
  local _60 = _g148["<"]
  local _62 = _g148[">"]
  local _61 = _g148["="]
  local last = _g148.last
  local sub = _g148.sub
  local _47 = _g148["/"]
  local _43 = _g148["+"]
  local split = _g148.split
  local _ = _g148["-"]
  local exit = _g148.exit
  local some63 = _g148["some?"]
  local replicate = _g148.replicate
  local table63 = _g148["table?"]
  local _6061 = _g148["<="]
  local splice = _g148.splice
  local _6261 = _g148[">="]
  local stash = _g148.stash
  local join = _g148.join
  local none63 = _g148["none?"]
  local cat = _g148.cat
  local toplevel63 = _g148["toplevel?"]
  local hd = _g148.hd
  local is63 = _g148["is?"]
  local atom63 = _g148["atom?"]
  local exclude = _g148.exclude
  local boolean63 = _g148["boolean?"]
  local read_file = _g148["read-file"]
  local search = _g148.search
  local sublist = _g148.sublist
  local empty63 = _g148["empty?"]
  local reverse = _g148.reverse
  local nil63 = _g148["nil?"]
  local unstash = _g148.unstash
  local find = _g148.find
  local map = _g148.map
  local pairwise = _g148.pairwise
  local list63 = _g148["list?"]
  local module = _g148.module
  local char = _g148.char
  local id_literal63 = _g148["id-literal?"]
  local setenv = _g148.setenv
  local tl = _g148.tl
  local module_key = _g148["module-key"]
  local _37message_handler = _g148["%message-handler"]
  local number63 = _g148["number?"]
  local _42 = _g148["*"]
  local apply = _g148.apply
  local keys63 = _g148["keys?"]
  local length = _g148.length
  local string63 = _g148["string?"]
  local _37 = _g148["%"]
  local reduce = _g148.reduce
  local function63 = _g148["function?"]
  local drop = _g148.drop
  local to_string = _g148["to-string"]
  local inner = _g148.inner
  local write_file = _g148["write-file"]
  local parse_number = _g148["parse-number"]
  local extend = _g148.extend
  local write = _g148.write
  local code = _g148.code
  local string_literal63 = _g148["string-literal?"]
  local substring = _g148.substring
  local add = _g148.add
  local iterate = _g148.iterate
  local make_id = _g148["make-id"]
  local keep = _g148.keep
  local _g149 = nexus.utilities
  local mapo = _g149.mapo
  local special63 = _g149["special?"]
  local getenv = _g149.getenv
  local quote_modules = _g149["quote-modules"]
  local variable63 = _g149["variable?"]
  local indentation = _g149.indentation
  local quasiexpand = _g149.quasiexpand
  local bind42 = _g149["bind*"]
  local bound63 = _g149["bound?"]
  local statement63 = _g149["statement?"]
  local symbol63 = _g149["symbol?"]
  local macro63 = _g149["macro?"]
  local symbol_expansion = _g149["symbol-expansion"]
  local special_form63 = _g149["special-form?"]
  local quoted = _g149.quoted
  local toplevel63 = _g149["toplevel?"]
  local quote_environment = _g149["quote-environment"]
  local macro_function = _g149["macro-function"]
  local stash42 = _g149["stash*"]
  local reserved63 = _g149["reserved?"]
  local imported = _g149.imported
  local initial_environment = _g149["initial-environment"]
  local macroexpand = _g149.macroexpand
  local exported = _g149.exported
  local to_id = _g149["to-id"]
  local bind = _g149.bind
  local valid_id63 = _g149["valid-id?"]
  local _g152 = nexus.compiler
  local compile_function = _g152["compile-function"]
  local compile_module = _g152["compile-module"]
  local lower = _g152.lower
  local compile = _g152.compile
  local load_module = _g152["load-module"]
  local open_module = _g152["open-module"]
  local in_module = _g152["in-module"]
  local eval = _g152.eval
end)();
(function ()
  local _g318 = nexus.runtime
  local composite63 = _g318["composite?"]
  local _60 = _g318["<"]
  local _62 = _g318[">"]
  local _61 = _g318["="]
  local last = _g318.last
  local sub = _g318.sub
  local _47 = _g318["/"]
  local _43 = _g318["+"]
  local split = _g318.split
  local _ = _g318["-"]
  local exit = _g318.exit
  local some63 = _g318["some?"]
  local replicate = _g318.replicate
  local table63 = _g318["table?"]
  local _6061 = _g318["<="]
  local splice = _g318.splice
  local _6261 = _g318[">="]
  local stash = _g318.stash
  local join = _g318.join
  local none63 = _g318["none?"]
  local cat = _g318.cat
  local toplevel63 = _g318["toplevel?"]
  local hd = _g318.hd
  local is63 = _g318["is?"]
  local atom63 = _g318["atom?"]
  local exclude = _g318.exclude
  local boolean63 = _g318["boolean?"]
  local read_file = _g318["read-file"]
  local search = _g318.search
  local sublist = _g318.sublist
  local empty63 = _g318["empty?"]
  local reverse = _g318.reverse
  local nil63 = _g318["nil?"]
  local unstash = _g318.unstash
  local find = _g318.find
  local map = _g318.map
  local pairwise = _g318.pairwise
  local list63 = _g318["list?"]
  local module = _g318.module
  local char = _g318.char
  local id_literal63 = _g318["id-literal?"]
  local setenv = _g318.setenv
  local tl = _g318.tl
  local module_key = _g318["module-key"]
  local _37message_handler = _g318["%message-handler"]
  local number63 = _g318["number?"]
  local _42 = _g318["*"]
  local apply = _g318.apply
  local keys63 = _g318["keys?"]
  local length = _g318.length
  local string63 = _g318["string?"]
  local _37 = _g318["%"]
  local reduce = _g318.reduce
  local function63 = _g318["function?"]
  local drop = _g318.drop
  local to_string = _g318["to-string"]
  local inner = _g318.inner
  local write_file = _g318["write-file"]
  local parse_number = _g318["parse-number"]
  local extend = _g318.extend
  local write = _g318.write
  local code = _g318.code
  local string_literal63 = _g318["string-literal?"]
  local substring = _g318.substring
  local add = _g318.add
  local iterate = _g318.iterate
  local make_id = _g318["make-id"]
  local keep = _g318.keep
  local _g319 = nexus.utilities
  local mapo = _g319.mapo
  local special63 = _g319["special?"]
  local getenv = _g319.getenv
  local quote_modules = _g319["quote-modules"]
  local variable63 = _g319["variable?"]
  local indentation = _g319.indentation
  local quasiexpand = _g319.quasiexpand
  local bind42 = _g319["bind*"]
  local bound63 = _g319["bound?"]
  local statement63 = _g319["statement?"]
  local symbol63 = _g319["symbol?"]
  local macro63 = _g319["macro?"]
  local symbol_expansion = _g319["symbol-expansion"]
  local special_form63 = _g319["special-form?"]
  local quoted = _g319.quoted
  local toplevel63 = _g319["toplevel?"]
  local quote_environment = _g319["quote-environment"]
  local macro_function = _g319["macro-function"]
  local stash42 = _g319["stash*"]
  local reserved63 = _g319["reserved?"]
  local imported = _g319.imported
  local initial_environment = _g319["initial-environment"]
  local macroexpand = _g319.macroexpand
  local exported = _g319.exported
  local to_id = _g319["to-id"]
  local bind = _g319.bind
  local valid_id63 = _g319["valid-id?"]
  local _g322 = nexus.compiler
  local compile_function = _g322["compile-function"]
  local compile_module = _g322["compile-module"]
  local lower = _g322.lower
  local compile = _g322.compile
  local load_module = _g322["load-module"]
  local open_module = _g322["open-module"]
  local in_module = _g322["in-module"]
  local eval = _g322.eval
  target = "lua"
end)();
(function ()
  local _g588 = nexus.runtime
  local composite63 = _g588["composite?"]
  local _60 = _g588["<"]
  local _62 = _g588[">"]
  local _61 = _g588["="]
  local last = _g588.last
  local sub = _g588.sub
  local _47 = _g588["/"]
  local _43 = _g588["+"]
  local split = _g588.split
  local _ = _g588["-"]
  local exit = _g588.exit
  local some63 = _g588["some?"]
  local replicate = _g588.replicate
  local table63 = _g588["table?"]
  local _6061 = _g588["<="]
  local splice = _g588.splice
  local _6261 = _g588[">="]
  local stash = _g588.stash
  local join = _g588.join
  local none63 = _g588["none?"]
  local cat = _g588.cat
  local toplevel63 = _g588["toplevel?"]
  local hd = _g588.hd
  local is63 = _g588["is?"]
  local atom63 = _g588["atom?"]
  local exclude = _g588.exclude
  local boolean63 = _g588["boolean?"]
  local read_file = _g588["read-file"]
  local search = _g588.search
  local sublist = _g588.sublist
  local empty63 = _g588["empty?"]
  local reverse = _g588.reverse
  local nil63 = _g588["nil?"]
  local unstash = _g588.unstash
  local find = _g588.find
  local map = _g588.map
  local pairwise = _g588.pairwise
  local list63 = _g588["list?"]
  local module = _g588.module
  local char = _g588.char
  local id_literal63 = _g588["id-literal?"]
  local setenv = _g588.setenv
  local tl = _g588.tl
  local module_key = _g588["module-key"]
  local _37message_handler = _g588["%message-handler"]
  local number63 = _g588["number?"]
  local _42 = _g588["*"]
  local apply = _g588.apply
  local keys63 = _g588["keys?"]
  local length = _g588.length
  local string63 = _g588["string?"]
  local _37 = _g588["%"]
  local reduce = _g588.reduce
  local function63 = _g588["function?"]
  local drop = _g588.drop
  local to_string = _g588["to-string"]
  local inner = _g588.inner
  local write_file = _g588["write-file"]
  local parse_number = _g588["parse-number"]
  local extend = _g588.extend
  local write = _g588.write
  local code = _g588.code
  local string_literal63 = _g588["string-literal?"]
  local substring = _g588.substring
  local add = _g588.add
  local iterate = _g588.iterate
  local make_id = _g588["make-id"]
  local keep = _g588.keep
  local _g589 = nexus.utilities
  local mapo = _g589.mapo
  local special63 = _g589["special?"]
  local getenv = _g589.getenv
  local quote_modules = _g589["quote-modules"]
  local variable63 = _g589["variable?"]
  local indentation = _g589.indentation
  local quasiexpand = _g589.quasiexpand
  local bind42 = _g589["bind*"]
  local bound63 = _g589["bound?"]
  local statement63 = _g589["statement?"]
  local symbol63 = _g589["symbol?"]
  local macro63 = _g589["macro?"]
  local symbol_expansion = _g589["symbol-expansion"]
  local special_form63 = _g589["special-form?"]
  local quoted = _g589.quoted
  local toplevel63 = _g589["toplevel?"]
  local quote_environment = _g589["quote-environment"]
  local macro_function = _g589["macro-function"]
  local stash42 = _g589["stash*"]
  local reserved63 = _g589["reserved?"]
  local imported = _g589.imported
  local initial_environment = _g589["initial-environment"]
  local macroexpand = _g589.macroexpand
  local exported = _g589.exported
  local to_id = _g589["to-id"]
  local bind = _g589.bind
  local valid_id63 = _g589["valid-id?"]
  local _g592 = nexus.compiler
  local compile_function = _g592["compile-function"]
  local compile_module = _g592["compile-module"]
  local lower = _g592.lower
  local compile = _g592.compile
  local load_module = _g592["load-module"]
  local open_module = _g592["open-module"]
  local in_module = _g592["in-module"]
  local eval = _g592.eval
  modules = {boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {global = true, export = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["module-path"] = {variable = true}, ["compile-special"] = {variable = true}, process = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["compile-atom"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, prologue = {variable = true}, ["lower-do"] = {variable = true}, ["can-return?"] = {variable = true}, ["%compile-module"] = {variable = true}, ["compile-args"] = {variable = true}, lower = {variable = true, export = true, global = true}, ["lower-special"] = {variable = true}, compile = {variable = true, export = true}, terminator = {variable = true}, ["compile-call"] = {variable = true}, ["load-module"] = {variable = true, export = true}, ["lower-infix?"] = {variable = true}, ["lower-call"] = {variable = true}, ["compiling?"] = {variable = true}, ["lower-function"] = {variable = true}, encapsulate = {variable = true}, ["lower-infix"] = {variable = true}, ["infix?"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-if"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["in-module"] = {variable = true, export = true}, ["compile-file"] = {variable = true}, ["lower-for"] = {variable = true}, ["current-module"] = {global = true, export = true}, eval = {variable = true, export = true}, ["compile-infix"] = {variable = true}, ["lower-definition"] = {variable = true}, ["%result"] = {global = true, export = true}, run = {variable = true}, infix = {variable = true}, ["lower-while"] = {variable = true}, ["lower-try"] = {variable = true}, getop = {variable = true}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g605 = sub(specs, 0)
    map(compile_module, _g605)
    return(nil)
  end}}}, utilities = {import = {"runtime", "special", "core"}, export = {["quasisplice?"] = {variable = true}, ["quoting?"] = {variable = true}, ["global?"] = {variable = true}, mapo = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, getenv = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["quasiquoting?"] = {variable = true}, escape = {variable = true}, indentation = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["valid-char?"] = {variable = true}, ["numeric?"] = {variable = true}, ["bind*"] = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}, reserved = {variable = true}, ["statement?"] = {variable = true, export = true}, ["symbol?"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-binding"] = {variable = true}, ["indent-level"] = {global = true, export = true}, ["quasiquote-list"] = {variable = true}, ["special-form?"] = {variable = true, export = true}, quoted = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["toplevel?"] = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["macro-function"] = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, imported = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, macroexpand = {variable = true, export = true}, exported = {variable = true, export = true}, ["to-id"] = {variable = true, export = true}, bind = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}}}, optimizer = {import = {"runtime", "special", "core"}, export = {["define-optimization"] = {}, optimizations = {variable = true}, optimize = {variable = true, export = true}}}, reader = {import = {"runtime", "special", "core"}, export = {eof = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["read-from-string"] = {variable = true, export = true}, ["flag?"] = {variable = true}, ["read-table"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["key?"] = {variable = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, read = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}, ["define-reader"] = {macro = function (_g606, ...)
    local char = _g606[1]
    local stream = _g606[2]
    local body = unstash({...})
    local _g607 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g607)})
  end, export = true}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g608 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g608) then
      local _g609 = bind42(x, _g608)
      local args = _g609[1]
      local _g610 = _g609[2]
      return(join({"%global-function", name, args}, _g610))
    else
      if (target == "js") then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g611 = body
      local k = nil
      for k in next, _g611 do
        if (not number63(k)) then
          local v = _g611[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g612 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g613 = join({"do"}, macroexpand(_g612))
    drop(environment)
    return(_g613)
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g614 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g615 = {"table"}
    _g615._scope = scope
    return({"do", {"add", "environment", _g615}, {"let", {x, join({"do"}, _g614)}, {"drop", "environment"}, x}})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g616 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g616)})
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g617 = sub(body, 0)
    local form = join({"fn", args}, _g617)
    local keys = sub(_g617, length(_g617))
    local _g618 = {"setenv", {"quote", name}}
    _g618.form = {"quote", form}
    _g618.special = form
    eval(join(_g618, keys))
    return(nil)
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["with-bindings"] = {macro = function (_g619, ...)
    local names = _g619[1]
    local body = unstash({...})
    local _g620 = sub(body, 0)
    local x = make_id()
    local _g622 = {"setenv", x}
    _g622.variable = true
    local _g621 = {"with-frame", {"each", {x}, names, _g622}}
    _g621.scope = true
    return(join(_g621, _g620))
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end, export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. (e .. ("," .. (x .. "|"))))
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g623 = sub(body, 0)
    return({"if", cond, join({"do"}, _g623)})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
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
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g629 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g630)
      local lh = _g630[1]
      local rh = _g630[2]
      local _g631 = bind(lh, rh)
      local _g632 = 0
      while (_g632 < length(_g631)) do
        local _g633 = _g631[(_g632 + 1)]
        local id = _g633[1]
        local val = _g633[2]
        if (bound63(id) or (reserved63(id) or toplevel63())) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g632 = (_g632 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g629)})))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g634 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g634)})
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g635 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g635) then
      local _g636 = bind42(x, _g635)
      local args = _g636[1]
      local _g637 = _g636[2]
      return(join({"%local-function", name, args}, _g637))
    else
      return({"%local", name, x})
    end
  end, export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g638 = elements
    local _g639 = 0
    while (_g639 < length(_g638)) do
      local e = _g638[(_g639 + 1)]
      l[e] = true
      _g639 = (_g639 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g317, x)
      return(x)
    end, body)))
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g640 = sub(body, 0)
    add(environment, {})
    map(function (_g642)
      local name = _g642[1]
      local exp = _g642[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g641 = join({"do"}, macroexpand(_g640))
    drop(environment)
    return(_g641)
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g643 = sub(body, 0)
    local _g644 = bind42(args, _g643)
    local _g645 = _g644[1]
    local _g646 = _g644[2]
    return(join({"%function", _g645}, _g646))
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g647 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g677
    if nil63(v) then
      local _g678
      if b.i then
        _g678 = "i"
      else
        _g678 = make_id()
      end
      local i = _g678
      _g677 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g647), {"inc", i}}}
    else
      local _g648 = {"target"}
      _g648.lua = {"not", {"number?", k}}
      _g648.js = {"isNaN", {"parseInt", k}}
      _g677 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g648, join({"let", {v, {"get", t1, k}}}, _g647)}}}
    end
    return({"let", {t1, t}, _g677})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g649)
      local a = _g649[1]
      local b = _g649[2]
      local c = sub(_g649, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g650 = sub(body, 0)
    local form = join({"fn", args}, _g650)
    local _g651 = {"setenv", {"quote", name}}
    _g651.form = {"quote", form}
    _g651.macro = form
    eval(_g651)
    return(nil)
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g652 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g652)})
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g653 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g653)})
  end, export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}}}, runtime = {import = {"special", "core"}, export = {["composite?"] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, last = {variable = true, export = true}, sub = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, split = {variable = true, export = true}, ["-"] = {variable = true, export = true}, exit = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, replicate = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, splice = {variable = true, export = true}, [">="] = {variable = true, export = true}, stash = {variable = true, export = true}, join = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, cat = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, hd = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, exclude = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, search = {variable = true, export = true}, sublist = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, reverse = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, unstash = {variable = true, export = true}, find = {variable = true, export = true}, map = {variable = true, export = true}, pairwise = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, module = {variable = true, export = true}, char = {variable = true, export = true}, ["id-count"] = {variable = true}, mapl = {variable = true}, ["id-literal?"] = {variable = true, export = true}, ["splice?"] = {variable = true}, setenv = {variable = true, export = true}, tl = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, apply = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, length = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["%"] = {variable = true, export = true}, reduce = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, drop = {variable = true, export = true}, ["to-string"] = {variable = true, export = true}, inner = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, ["parse-number"] = {variable = true, export = true}, extend = {variable = true, export = true}, write = {variable = true, export = true}, code = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, substring = {variable = true, export = true}, add = {variable = true, export = true}, iterate = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, keep = {variable = true, export = true}}}, lib = {import = {"core", "special"}, export = {}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["error"] = {export = true, stmt = true, special = function (x)
    local _g679
    if (target == "js") then
      _g679 = ("throw new " .. compile({"Error", x}))
    else
      _g679 = ("error(" .. (compile(x) .. ")"))
    end
    local e = _g679
    return((indentation() .. e))
  end, foo = true}, ["return"] = {export = true, stmt = true, special = function (x)
    local _g680
    if nil63(x) then
      _g680 = "return"
    else
      _g680 = ("return(" .. (compile(x) .. ")"))
    end
    local _g654 = _g680
    return((indentation() .. _g654))
  end, foo = true}, ["%local"] = {export = true, stmt = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g681
    if is63(value) then
      _g681 = (" = " .. value1)
    else
      _g681 = ""
    end
    local rh = _g681
    local _g682
    if (target == "js") then
      _g682 = "var "
    else
      _g682 = "local "
    end
    local keyword = _g682
    local ind = indentation()
    return((ind .. (keyword .. (id .. rh))))
  end, foo = true}, ["while"] = {export = true, special = function (cond, form)
    local _g655 = compile(cond)
    indent_level = (indent_level + 1)
    local _g656 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g656
    local ind = indentation()
    if (target == "js") then
      return((ind .. ("while (" .. (_g655 .. (") {\n" .. (body .. (ind .. "}\n")))))))
    else
      return((ind .. ("while " .. (_g655 .. (" do\n" .. (body .. (ind .. "end\n")))))))
    end
  end, stmt = true, foo = true, tr = true}, ["not"] = {export = true, foo = true, special = function (x)
    local _g657 = compile(x)
    local _g683
    if (target == "js") then
      _g683 = "!("
    else
      _g683 = "(not "
    end
    local open = _g683
    return((open .. (_g657 .. ")")))
  end}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g658 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g658, 0) == "{")) then
      _g658 = ("(" .. (_g658 .. ")"))
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g658 .. ("." .. inner(k))))
    else
      return((_g658 .. ("[" .. (k1 .. "]"))))
    end
  end}, ["break"] = {export = true, stmt = true, special = function ()
    return((indentation() .. "break"))
  end, foo = true}, ["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g684
    if (target == "lua") then
      _g684 = "{"
    else
      _g684 = "["
    end
    local open = _g684
    local _g685
    if (target == "lua") then
      _g685 = "}"
    else
      _g685 = "]"
    end
    local close = _g685
    local str = ""
    local _g659 = forms
    local i = 0
    while (i < length(_g659)) do
      local x = _g659[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. (str .. close)))
  end}, ["%global-function"] = {export = true, special = function (name, args, body)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, foo = true, tr = true}, ["set"] = {export = true, stmt = true, special = function (lh, rh)
    local _g660 = compile(lh)
    local _g686
    if nil63(rh) then
      _g686 = "nil"
    else
      _g686 = rh
    end
    local _g661 = compile(_g686)
    return((indentation() .. (_g660 .. (" = " .. _g661))))
  end, foo = true}, ["%for"] = {export = true, special = function (t, k, form)
    local _g662 = compile(t)
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g663 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g663
    if (target == "lua") then
      return((ind .. ("for " .. (k .. (" in next, " .. (_g662 .. (" do\n" .. (body .. (ind .. "end\n")))))))))
    else
      return((ind .. ("for (" .. (k .. (" in " .. (_g662 .. (") {\n" .. (body .. (ind .. "}\n")))))))))
    end
  end, stmt = true, foo = true, tr = true}, ["do"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g664 = forms
    local _g665 = 0
    while (_g665 < length(_g664)) do
      local x = _g664[(_g665 + 1)]
      str = (str .. compile(x, {_stash = true, stmt = true}))
      _g665 = (_g665 + 1)
    end
    return(str)
  end, stmt = true, foo = true, tr = true}, ["%function"] = {export = true, foo = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g687
    if (target == "lua") then
      _g687 = " = "
    else
      _g687 = ": "
    end
    local sep = _g687
    local pairs = pairwise(forms)
    local _g666 = pairs
    local i = 0
    while (i < length(_g666)) do
      local _g667 = _g666[(i + 1)]
      local k = _g667[1]
      local v = _g667[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g668 = compile(v)
      local _g688
      if valid_id63(k) then
        _g688 = k
      else
        local _g689
        if ((target == "js") and string_literal63(k)) then
          _g689 = k
        else
          local _g690
          if (target == "js") then
            _g690 = quoted(k)
          else
            local _g691
            if string_literal63(k) then
              _g691 = ("[" .. (k .. "]"))
            else
              _g691 = ("[" .. (quoted(k) .. "]"))
            end
            _g690 = _g691
          end
          _g689 = _g690
        end
        _g688 = _g689
      end
      local _g669 = _g688
      str = (str .. (_g669 .. (sep .. _g668)))
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}, ["%try"] = {export = true, special = function (form)
    local ind = indentation()
    indent_level = (indent_level + 1)
    local _g670 = compile(form, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local body = _g670
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = (indent_level + 1)
    local _g671 = compile(hf, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local h = _g671
    return((ind .. ("try {\n" .. (body .. (ind .. ("}\n" .. (ind .. ("catch (" .. (e .. (") {\n" .. (h .. (ind .. "}\n"))))))))))))
  end, stmt = true, foo = true, tr = true}, ["%local-function"] = {export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, stmt = true, foo = true, tr = true}, ["%if"] = {export = true, special = function (cond, cons, alt)
    local _g672 = compile(cond)
    indent_level = (indent_level + 1)
    local _g675 = compile(cons, {_stash = true, stmt = true})
    indent_level = (indent_level - 1)
    local _g673 = _g675
    local _g692
    if alt then
      indent_level = (indent_level + 1)
      local _g676 = compile(alt, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      _g692 = _g676
    end
    local _g674 = _g692
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. (ind .. ("if (" .. (_g672 .. (") {\n" .. (_g673 .. (ind .. "}")))))))
    else
      str = (str .. (ind .. ("if " .. (_g672 .. (" then\n" .. _g673)))))
    end
    if (_g674 and (target == "js")) then
      str = (str .. (" else {\n" .. (_g674 .. (ind .. "}"))))
    else
      if _g674 then
        str = (str .. (ind .. ("else\n" .. _g674)))
      end
    end
    if (target == "lua") then
      return((str .. (ind .. "end\n")))
    else
      return((str .. "\n"))
    end
  end, stmt = true, foo = true, tr = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g693 = sub(body, 0)
    local imports = {}
    local imp = _g693.import
    local exp = _g693.export
    local _g694 = (imp or {})
    local _g695 = 0
    while (_g695 < length(_g694)) do
      local k = _g694[(_g695 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g695 = (_g695 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g696 = (exp or {})
    local _g697 = 0
    while (_g697 < length(_g696)) do
      local k = _g696[(_g697 + 1)]
      setenv(k, {_stash = true, export = true})
      _g697 = (_g697 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local composite63 = _g2["composite?"]
  local _60 = _g2["<"]
  local _62 = _g2[">"]
  local function63 = _g2["function?"]
  local drop = _g2.drop
  local sub = _g2.sub
  local _47 = _g2["/"]
  local _43 = _g2["+"]
  local split = _g2.split
  local _ = _g2["-"]
  local exit = _g2.exit
  local substring = _g2.substring
  local replicate = _g2.replicate
  local table63 = _g2["table?"]
  local _6061 = _g2["<="]
  local splice = _g2.splice
  local _6261 = _g2[">="]
  local stash = _g2.stash
  local join = _g2.join
  local none63 = _g2["none?"]
  local cat = _g2.cat
  local toplevel63 = _g2["toplevel?"]
  local hd = _g2.hd
  local is63 = _g2["is?"]
  local atom63 = _g2["atom?"]
  local exclude = _g2.exclude
  local boolean63 = _g2["boolean?"]
  local read_file = _g2["read-file"]
  local reduce = _g2.reduce
  local sublist = _g2.sublist
  local empty63 = _g2["empty?"]
  local reverse = _g2.reverse
  local nil63 = _g2["nil?"]
  local unstash = _g2.unstash
  local find = _g2.find
  local map = _g2.map
  local pairwise = _g2.pairwise
  local list63 = _g2["list?"]
  local module = _g2.module
  local char = _g2.char
  local to_string = _g2["to-string"]
  local number63 = _g2["number?"]
  local id_literal63 = _g2["id-literal?"]
  local _61 = _g2["="]
  local tl = _g2.tl
  local last = _g2.last
  local length = _g2.length
  local _42 = _g2["*"]
  local apply = _g2.apply
  local parse_number = _g2["parse-number"]
  local some63 = _g2["some?"]
  local _37 = _g2["%"]
  local string63 = _g2["string?"]
  local _37message_handler = _g2["%message-handler"]
  local module_key = _g2["module-key"]
  local setenv = _g2.setenv
  local search = _g2.search
  local write_file = _g2["write-file"]
  local keep = _g2.keep
  local extend = _g2.extend
  local inner = _g2.inner
  local code = _g2.code
  local string_literal63 = _g2["string-literal?"]
  local write = _g2.write
  local add = _g2.add
  local iterate = _g2.iterate
  local make_id = _g2["make-id"]
  local keys63 = _g2["keys?"]
  local _g5 = nexus.reader
  local make_stream = _g5["make-stream"]
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus.compiler
  local compile_function = _g6["compile-function"]
  local compile_module = _g6["compile-module"]
  local lower = _g6.lower
  local compile = _g6.compile
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local eval = _g6.eval
  local open_module = _g6["open-module"]
  local function rep(str)
    local _g700,_g701 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g699 = {_g700, _g701}
    local _g1 = _g699[1]
    local x = _g699[2]
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
    local _g702 = args
    local i = 0
    while (i < length(_g702)) do
      local arg = _g702[(i + 1)]
      if ((arg == "-o") or ((arg == "-t") or (arg == "-e"))) then
        if (i == (length(args) - 1)) then
          print((to_string("missing argument for") .. (" " .. (to_string(arg) .. " "))))
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
  local _g703 = {}
  nexus.main = _g703
  _g703.repl = repl
  _g703.rep = rep
  _g703.main = main
  _g703.usage = usage
end)();
