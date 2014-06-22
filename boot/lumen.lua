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
    local _g41 = (function ()
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
    local _g42 = sub(xs, 0)
    if none63(_g42) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g42))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g43 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g43))
  end
  local function _(...)
    local xs = unstash({...})
    local _g44 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g44)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g45 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g45))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g46)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g47)))
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
            local _g48 = x
            local k = nil
            for k in next, _g48 do
              if (not number63(k)) then
                local v = _g48[k]
                add(x1, (k .. ":"))
                add(x1, v)
              end
            end
            local _g49 = x1
            local i = 0
            while (i < length(_g49)) do
              local y = _g49[(i + 1)]
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
    local _g50 = stash(args)
    return(f(unpack(_g50)))
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
    local _g51 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local _g52 = _g51
      local k1 = nil
      for k1 in next, _g52 do
        if (not number63(k1)) then
          local v = _g52[k1]
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
  local _g53 = {}
  nexus.runtime = _g53
  _g53["nil?"] = nil63
  _g53["is?"] = is63
  _g53.length = length
  _g53["none?"] = none63
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
  _g53["empty?"] = empty63
  _g53.stash = stash
  _g53.unstash = unstash
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
  _g53["toplevel?"] = toplevel63
  _g53["module-key"] = module_key
  _g53.module = module
  _g53.setenv = setenv
  _g53["splice?"] = splice63
  _g53.mapl = mapl
  _g53["id-count"] = id_count
end)();
(function ()
  local _g58 = nexus.runtime
  local nil63 = _g58["nil?"]
  local is63 = _g58["is?"]
  local length = _g58.length
  local none63 = _g58["none?"]
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
  local empty63 = _g58["empty?"]
  local stash = _g58.stash
  local unstash = _g58.unstash
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
  local toplevel63 = _g58["toplevel?"]
  local module_key = _g58["module-key"]
  local module = _g58.module
  local setenv = _g58.setenv
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g61 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g62 = nil
        local _g63 = _g61
        local x = nil
        for x in next, _g63 do
          if (not number63(x)) then
            local _g54 = _g63[x]
            _g62 = x
          end
        end
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
  local function escape(str)
    local str1 = "\""
    local i = 0
    while (i < length(str)) do
      local c = char(str, i)
      local c1 = (function ()
        if (c == "\n") then
          return("\\n")
        else
          if (c == "\"") then
            return("\\\"")
          else
            if (c == "\\") then
              return("\\\\")
            else
              return(c)
            end
          end
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
      local _g64 = args
      local k = nil
      for k in next, _g64 do
        if (not number63(k)) then
          local v = _g64[k]
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
        local _g65 = lh
        local i = 0
        while (i < length(_g65)) do
          local x = _g65[(i + 1)]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = (i + 1)
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g66 = lh
        local k = nil
        for k in next, _g66 do
          if (not number63(k)) then
            local v = _g66[k]
            if (v == true) then
              v = k
            end
            if (k ~= "rest") then
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
      local _g67 = args
      local _g68 = 0
      while (_g68 < length(_g67)) do
        local arg = _g67[(_g68 + 1)]
        if atom63(arg) then
          add(args1, arg)
        else
          if (list63(arg) or keys63(arg)) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g68 = (_g68 + 1)
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
          local _g55 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g70 = (function ()
            local _g71 = args
            local _g72 = 0
            while (_g72 < length(_g71)) do
              local _g69 = _g71[(_g72 + 1)]
              setenv(_g69, {_stash = true, variable = true})
              _g72 = (_g72 + 1)
            end
            return(join({"%function", map(macroexpand, args)}, macroexpand(body)))
          end)()
          drop(environment)
          return(_g70)
        else
          if ((x == "%local-function") or (x == "%global-function")) then
            local _g56 = form[1]
            local name = form[2]
            local _g73 = form[3]
            local _g74 = sub(form, 3)
            add(environment, {_scope = true})
            local _g76 = (function ()
              local _g77 = _g73
              local _g78 = 0
              while (_g78 < length(_g77)) do
                local _g75 = _g77[(_g78 + 1)]
                setenv(_g75, {_stash = true, variable = true})
                _g78 = (_g78 + 1)
              end
              return(join({x, name, map(macroexpand, _g73)}, macroexpand(_g74)))
            end)()
            drop(environment)
            return(_g76)
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
    local _g79 = form
    local k = nil
    for k in next, _g79 do
      if (not number63(k)) then
        local v = _g79[k]
        local _g80 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g80
      end
    end
    local _g81 = form
    local _g82 = 0
    while (_g82 < length(_g81)) do
      local x = _g81[(_g82 + 1)]
      if quasisplice63(x, depth) then
        local _g83 = quasiexpand(x[2])
        add(xs, _g83)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g82 = (_g82 + 1)
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
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
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
      local c1 = (function ()
        if (c == "-") then
          return("_")
        else
          if valid_char63(n) then
            return(c)
          else
            if (i == 0) then
              return(("_" .. n))
            else
              return(n)
            end
          end
        end
      end)()
      id1 = (id1 .. c1)
      i = (i + 1)
    end
    return(id1)
  end
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g88 = module(current_module).export
    local n = nil
    for n in next, _g88 do
      if (not number63(n)) then
        local b = _g88[n]
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
    local _g89 = unstash({...})
    local all = _g89.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g90 = module(spec).export
      local n = nil
      for n in next, _g90 do
        if (not number63(n)) then
          local b = _g90[n]
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
    local _g91 = t
    local k = nil
    for k in next, _g91 do
      if (not number63(k)) then
        local v = _g91[k]
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
    local _g92 = {"table"}
    _g92.import = quoted(m.import)
    _g92.export = quote_frame(m.export)
    return(_g92)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g93 = {}
  nexus.utilities = _g93
  _g93.getenv = getenv
  _g93["macro-function"] = macro_function
  _g93["macro?"] = macro63
  _g93["special?"] = special63
  _g93["special-form?"] = special_form63
  _g93["symbol-expansion"] = symbol_expansion
  _g93["symbol?"] = symbol63
  _g93["variable?"] = variable63
  _g93["bound?"] = bound63
  _g93["toplevel?"] = toplevel63
  _g93.quoted = quoted
  _g93["stash*"] = stash42
  _g93.bind = bind
  _g93["bind*"] = bind42
  _g93.quasiexpand = quasiexpand
  _g93.macroexpand = macroexpand
  _g93.indentation = indentation
  _g93["reserved?"] = reserved63
  _g93["valid-id?"] = valid_id63
  _g93["to-id"] = to_id
  _g93.imported = imported
  _g93.exported = exported
  _g93.mapo = mapo
  _g93["quote-environment"] = quote_environment
  _g93["quote-modules"] = quote_modules
  _g93["initial-environment"] = initial_environment
  _g93["global?"] = global63
  _g93.escape = escape
  _g93["quoting?"] = quoting63
  _g93["quasiquoting?"] = quasiquoting63
  _g93["can-unquote?"] = can_unquote63
  _g93["quasisplice?"] = quasisplice63
  _g93["quasiquote-list"] = quasiquote_list
  _g93.reserved = reserved
  _g93["numeric?"] = numeric63
  _g93["valid-char?"] = valid_char63
  _g93["quote-binding"] = quote_binding
  _g93["quote-frame"] = quote_frame
  _g93["quote-module"] = quote_module
end)();
(function ()
  local _g94 = nexus.runtime
  local nil63 = _g94["nil?"]
  local is63 = _g94["is?"]
  local length = _g94.length
  local none63 = _g94["none?"]
  local some63 = _g94["some?"]
  local hd = _g94.hd
  local string63 = _g94["string?"]
  local number63 = _g94["number?"]
  local boolean63 = _g94["boolean?"]
  local function63 = _g94["function?"]
  local composite63 = _g94["composite?"]
  local atom63 = _g94["atom?"]
  local table63 = _g94["table?"]
  local list63 = _g94["list?"]
  local substring = _g94.substring
  local sublist = _g94.sublist
  local sub = _g94.sub
  local inner = _g94.inner
  local tl = _g94.tl
  local char = _g94.char
  local code = _g94.code
  local string_literal63 = _g94["string-literal?"]
  local id_literal63 = _g94["id-literal?"]
  local add = _g94.add
  local drop = _g94.drop
  local last = _g94.last
  local reverse = _g94.reverse
  local join = _g94.join
  local reduce = _g94.reduce
  local keep = _g94.keep
  local find = _g94.find
  local pairwise = _g94.pairwise
  local iterate = _g94.iterate
  local replicate = _g94.replicate
  local splice = _g94.splice
  local map = _g94.map
  local keys63 = _g94["keys?"]
  local empty63 = _g94["empty?"]
  local stash = _g94.stash
  local unstash = _g94.unstash
  local extend = _g94.extend
  local exclude = _g94.exclude
  local search = _g94.search
  local split = _g94.split
  local cat = _g94.cat
  local _43 = _g94["+"]
  local _ = _g94["-"]
  local _42 = _g94["*"]
  local _47 = _g94["/"]
  local _37 = _g94["%"]
  local _62 = _g94[">"]
  local _60 = _g94["<"]
  local _61 = _g94["="]
  local _6261 = _g94[">="]
  local _6061 = _g94["<="]
  local read_file = _g94["read-file"]
  local write_file = _g94["write-file"]
  local write = _g94.write
  local exit = _g94.exit
  local parse_number = _g94["parse-number"]
  local to_string = _g94["to-string"]
  local apply = _g94.apply
  local make_id = _g94["make-id"]
  local _37message_handler = _g94["%message-handler"]
  local toplevel63 = _g94["toplevel?"]
  local module_key = _g94["module-key"]
  local module = _g94.module
  local setenv = _g94.setenv
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
  local _g105 = {}
  nexus.reader = _g105
  _g105["make-stream"] = make_stream
  _g105["read-table"] = read_table
  _g105.read = read
  _g105["read-all"] = read_all
  _g105["read-from-string"] = read_from_string
  _g105.delimiters = delimiters
  _g105.whitespace = whitespace
  _g105["peek-char"] = peek_char
  _g105["read-char"] = read_char
  _g105["skip-non-code"] = skip_non_code
  _g105.eof = eof
  _g105["key?"] = key63
  _g105["flag?"] = flag63
end)();
(function ()
  local _g106 = nexus.runtime
  local nil63 = _g106["nil?"]
  local is63 = _g106["is?"]
  local length = _g106.length
  local none63 = _g106["none?"]
  local some63 = _g106["some?"]
  local hd = _g106.hd
  local string63 = _g106["string?"]
  local number63 = _g106["number?"]
  local boolean63 = _g106["boolean?"]
  local function63 = _g106["function?"]
  local composite63 = _g106["composite?"]
  local atom63 = _g106["atom?"]
  local table63 = _g106["table?"]
  local list63 = _g106["list?"]
  local substring = _g106.substring
  local sublist = _g106.sublist
  local sub = _g106.sub
  local inner = _g106.inner
  local tl = _g106.tl
  local char = _g106.char
  local code = _g106.code
  local string_literal63 = _g106["string-literal?"]
  local id_literal63 = _g106["id-literal?"]
  local add = _g106.add
  local drop = _g106.drop
  local last = _g106.last
  local reverse = _g106.reverse
  local join = _g106.join
  local reduce = _g106.reduce
  local keep = _g106.keep
  local find = _g106.find
  local pairwise = _g106.pairwise
  local iterate = _g106.iterate
  local replicate = _g106.replicate
  local splice = _g106.splice
  local map = _g106.map
  local keys63 = _g106["keys?"]
  local empty63 = _g106["empty?"]
  local stash = _g106.stash
  local unstash = _g106.unstash
  local extend = _g106.extend
  local exclude = _g106.exclude
  local search = _g106.search
  local split = _g106.split
  local cat = _g106.cat
  local _43 = _g106["+"]
  local _ = _g106["-"]
  local _42 = _g106["*"]
  local _47 = _g106["/"]
  local _37 = _g106["%"]
  local _62 = _g106[">"]
  local _60 = _g106["<"]
  local _61 = _g106["="]
  local _6261 = _g106[">="]
  local _6061 = _g106["<="]
  local read_file = _g106["read-file"]
  local write_file = _g106["write-file"]
  local write = _g106.write
  local exit = _g106.exit
  local parse_number = _g106["parse-number"]
  local to_string = _g106["to-string"]
  local apply = _g106.apply
  local make_id = _g106["make-id"]
  local _37message_handler = _g106["%message-handler"]
  local toplevel63 = _g106["toplevel?"]
  local module_key = _g106["module-key"]
  local module = _g106.module
  local setenv = _g106.setenv
  local _g107 = nexus.utilities
  local getenv = _g107.getenv
  local macro_function = _g107["macro-function"]
  local macro63 = _g107["macro?"]
  local special63 = _g107["special?"]
  local special_form63 = _g107["special-form?"]
  local symbol_expansion = _g107["symbol-expansion"]
  local symbol63 = _g107["symbol?"]
  local variable63 = _g107["variable?"]
  local bound63 = _g107["bound?"]
  local toplevel63 = _g107["toplevel?"]
  local quoted = _g107.quoted
  local stash42 = _g107["stash*"]
  local bind = _g107.bind
  local bind42 = _g107["bind*"]
  local quasiexpand = _g107.quasiexpand
  local macroexpand = _g107.macroexpand
  local indentation = _g107.indentation
  local reserved63 = _g107["reserved?"]
  local valid_id63 = _g107["valid-id?"]
  local to_id = _g107["to-id"]
  local imported = _g107.imported
  local exported = _g107.exported
  local mapo = _g107.mapo
  local quote_environment = _g107["quote-environment"]
  local quote_modules = _g107["quote-modules"]
  local initial_environment = _g107["initial-environment"]
  local _g110 = nexus.reader
  local make_stream = _g110["make-stream"]
  local read_table = _g110["read-table"]
  local read = _g110.read
  local read_all = _g110["read-all"]
  local read_from_string = _g110["read-from-string"]
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
    local _g111 = args
    local i = 0
    while (i < length(_g111)) do
      local arg = _g111[(i + 1)]
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
  local function compile_body(forms, ...)
    local _g112 = unstash({...})
    local tail = _g112.tail
    local str = ""
    local _g113 = forms
    local i = 0
    while (i < length(_g113)) do
      local x = _g113[(i + 1)]
      local t63 = (tail and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, stmt = true, tail = t63}))
      i = (i + 1)
    end
    return(str)
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
    local _g114 = getenv(hd(form))
    local special = _g114.special
    local stmt = _g114.stmt
    local self_tr63 = _g114.tr
    if ((not stmt63) and stmt) then
      return(compile({{"%function", {}, form}}, {_stash = true, tail = tail63}))
    else
      local tr = terminator((stmt63 and (not self_tr63)))
      return((special(tl(form), tail63) .. tr))
    end
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
  local function compile_infix(_g115)
    local op = _g115[1]
    local args = sub(_g115, 1)
    local str = "("
    local _g116 = getop(op)
    local _g117 = args
    local i = 0
    while (i < length(_g117)) do
      local arg = _g117[(i + 1)]
      if ((_g116 == "-") and (length(args) == 1)) then
        str = (str .. _g116 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g116 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_function(args, body, ...)
    local _g118 = unstash({...})
    local name = _g118.name
    local prefix = _g118.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g119 = (prefix or "")
    local _g120 = compile_args(args)
    local _g121 = (function ()
      indent_level = (indent_level + 1)
      local _g122 = compile_body(body, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g122)
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
      return(("function " .. id .. _g120 .. " {\n" .. _g121 .. ind .. "}" .. tr))
    else
      return((_g119 .. "function " .. id .. _g120 .. "\n" .. _g121 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g123 = unstash({...})
    local stmt = _g123.stmt
    local tail = _g123.tail
    if (tail and can_return63(form)) then
      form = {"return", form}
    end
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
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
        local _g124 = (function ()
          if atom63(form) then
            return(compile_atom(form))
          else
            if infix63(form) then
              return(compile_infix(form))
            else
              return(compile_call(form))
            end
          end
        end)()
        return((ind .. _g124 .. tr))
      end
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
    local _g125 = map(lower, body)
    local epilog = map(lower, exported())
    return({join({"%function", {}}, join(_g125, epilog))})
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
    local _g126 = unstash({...})
    local all = _g126.all
    local m = module(spec)
    local frame = last(environment)
    local _g127 = m.export
    local k = nil
    for k in next, _g127 do
      if (not number63(k)) then
        local v = _g127[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g128 = unstash({...})
    local all = _g128.all
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
    return(join(imported(current_module, {_stash = true, all = true}), (function ()
      local m = module(current_module)
      return(map(function (x)
        return(splice(imported(x)))
      end, m.import))
    end)()))
  end
  local function eval(form)
    local previous = target
    target = "lua"
    local _g129 = lower(join({"do"}, join(prologue(), {form})))
    local compiled = compile(_g129)
    target = previous
    return(run(compiled))
  end
  local _g130 = {}
  nexus.compiler = _g130
  _g130["compile-body"] = compile_body
  _g130["compile-call"] = compile_call
  _g130["compile-function"] = compile_function
  _g130["compile-special"] = compile_special
  _g130.compile = compile
  _g130["open-module"] = open_module
  _g130["load-module"] = load_module
  _g130["in-module"] = in_module
  _g130["compile-module"] = compile_module
  _g130.eval = eval
  _g130.infix = infix
  _g130.getop = getop
  _g130["infix?"] = infix63
  _g130["compile-args"] = compile_args
  _g130["compile-atom"] = compile_atom
  _g130.terminator = terminator
  _g130["compile-infix"] = compile_infix
  _g130["can-return?"] = can_return63
  _g130.lower = lower
  _g130["module-path"] = module_path
  _g130.encapsulate = encapsulate
  _g130["compile-file"] = compile_file
  _g130.run = run
  _g130["compiling?"] = compiling63
  _g130["compiler-output"] = compiler_output
  _g130["%compile-module"] = _37compile_module
  _g130.prologue = prologue
end)();
(function ()
  local _g132 = nexus.runtime
  local nil63 = _g132["nil?"]
  local is63 = _g132["is?"]
  local length = _g132.length
  local none63 = _g132["none?"]
  local some63 = _g132["some?"]
  local hd = _g132.hd
  local string63 = _g132["string?"]
  local number63 = _g132["number?"]
  local boolean63 = _g132["boolean?"]
  local function63 = _g132["function?"]
  local composite63 = _g132["composite?"]
  local atom63 = _g132["atom?"]
  local table63 = _g132["table?"]
  local list63 = _g132["list?"]
  local substring = _g132.substring
  local sublist = _g132.sublist
  local sub = _g132.sub
  local inner = _g132.inner
  local tl = _g132.tl
  local char = _g132.char
  local code = _g132.code
  local string_literal63 = _g132["string-literal?"]
  local id_literal63 = _g132["id-literal?"]
  local add = _g132.add
  local drop = _g132.drop
  local last = _g132.last
  local reverse = _g132.reverse
  local join = _g132.join
  local reduce = _g132.reduce
  local keep = _g132.keep
  local find = _g132.find
  local pairwise = _g132.pairwise
  local iterate = _g132.iterate
  local replicate = _g132.replicate
  local splice = _g132.splice
  local map = _g132.map
  local keys63 = _g132["keys?"]
  local empty63 = _g132["empty?"]
  local stash = _g132.stash
  local unstash = _g132.unstash
  local extend = _g132.extend
  local exclude = _g132.exclude
  local search = _g132.search
  local split = _g132.split
  local cat = _g132.cat
  local _43 = _g132["+"]
  local _ = _g132["-"]
  local _42 = _g132["*"]
  local _47 = _g132["/"]
  local _37 = _g132["%"]
  local _62 = _g132[">"]
  local _60 = _g132["<"]
  local _61 = _g132["="]
  local _6261 = _g132[">="]
  local _6061 = _g132["<="]
  local read_file = _g132["read-file"]
  local write_file = _g132["write-file"]
  local write = _g132.write
  local exit = _g132.exit
  local parse_number = _g132["parse-number"]
  local to_string = _g132["to-string"]
  local apply = _g132.apply
  local make_id = _g132["make-id"]
  local _37message_handler = _g132["%message-handler"]
  local toplevel63 = _g132["toplevel?"]
  local module_key = _g132["module-key"]
  local module = _g132.module
  local setenv = _g132.setenv
  local _g133 = nexus.utilities
  local getenv = _g133.getenv
  local macro_function = _g133["macro-function"]
  local macro63 = _g133["macro?"]
  local special63 = _g133["special?"]
  local special_form63 = _g133["special-form?"]
  local symbol_expansion = _g133["symbol-expansion"]
  local symbol63 = _g133["symbol?"]
  local variable63 = _g133["variable?"]
  local bound63 = _g133["bound?"]
  local toplevel63 = _g133["toplevel?"]
  local quoted = _g133.quoted
  local stash42 = _g133["stash*"]
  local bind = _g133.bind
  local bind42 = _g133["bind*"]
  local quasiexpand = _g133.quasiexpand
  local macroexpand = _g133.macroexpand
  local indentation = _g133.indentation
  local reserved63 = _g133["reserved?"]
  local valid_id63 = _g133["valid-id?"]
  local to_id = _g133["to-id"]
  local imported = _g133.imported
  local exported = _g133.exported
  local mapo = _g133.mapo
  local quote_environment = _g133["quote-environment"]
  local quote_modules = _g133["quote-modules"]
  local initial_environment = _g133["initial-environment"]
  local _g136 = nexus.compiler
  local compile_body = _g136["compile-body"]
  local compile_call = _g136["compile-call"]
  local compile_function = _g136["compile-function"]
  local compile_special = _g136["compile-special"]
  local compile = _g136.compile
  local open_module = _g136["open-module"]
  local load_module = _g136["load-module"]
  local in_module = _g136["in-module"]
  local compile_module = _g136["compile-module"]
  local eval = _g136.eval
end)();
(function ()
  local _g330 = nexus.runtime
  local nil63 = _g330["nil?"]
  local is63 = _g330["is?"]
  local length = _g330.length
  local none63 = _g330["none?"]
  local some63 = _g330["some?"]
  local hd = _g330.hd
  local string63 = _g330["string?"]
  local number63 = _g330["number?"]
  local boolean63 = _g330["boolean?"]
  local function63 = _g330["function?"]
  local composite63 = _g330["composite?"]
  local atom63 = _g330["atom?"]
  local table63 = _g330["table?"]
  local list63 = _g330["list?"]
  local substring = _g330.substring
  local sublist = _g330.sublist
  local sub = _g330.sub
  local inner = _g330.inner
  local tl = _g330.tl
  local char = _g330.char
  local code = _g330.code
  local string_literal63 = _g330["string-literal?"]
  local id_literal63 = _g330["id-literal?"]
  local add = _g330.add
  local drop = _g330.drop
  local last = _g330.last
  local reverse = _g330.reverse
  local join = _g330.join
  local reduce = _g330.reduce
  local keep = _g330.keep
  local find = _g330.find
  local pairwise = _g330.pairwise
  local iterate = _g330.iterate
  local replicate = _g330.replicate
  local splice = _g330.splice
  local map = _g330.map
  local keys63 = _g330["keys?"]
  local empty63 = _g330["empty?"]
  local stash = _g330.stash
  local unstash = _g330.unstash
  local extend = _g330.extend
  local exclude = _g330.exclude
  local search = _g330.search
  local split = _g330.split
  local cat = _g330.cat
  local _43 = _g330["+"]
  local _ = _g330["-"]
  local _42 = _g330["*"]
  local _47 = _g330["/"]
  local _37 = _g330["%"]
  local _62 = _g330[">"]
  local _60 = _g330["<"]
  local _61 = _g330["="]
  local _6261 = _g330[">="]
  local _6061 = _g330["<="]
  local read_file = _g330["read-file"]
  local write_file = _g330["write-file"]
  local write = _g330.write
  local exit = _g330.exit
  local parse_number = _g330["parse-number"]
  local to_string = _g330["to-string"]
  local apply = _g330.apply
  local make_id = _g330["make-id"]
  local _37message_handler = _g330["%message-handler"]
  local toplevel63 = _g330["toplevel?"]
  local module_key = _g330["module-key"]
  local module = _g330.module
  local setenv = _g330.setenv
  local _g331 = nexus.utilities
  local getenv = _g331.getenv
  local macro_function = _g331["macro-function"]
  local macro63 = _g331["macro?"]
  local special63 = _g331["special?"]
  local special_form63 = _g331["special-form?"]
  local symbol_expansion = _g331["symbol-expansion"]
  local symbol63 = _g331["symbol?"]
  local variable63 = _g331["variable?"]
  local bound63 = _g331["bound?"]
  local toplevel63 = _g331["toplevel?"]
  local quoted = _g331.quoted
  local stash42 = _g331["stash*"]
  local bind = _g331.bind
  local bind42 = _g331["bind*"]
  local quasiexpand = _g331.quasiexpand
  local macroexpand = _g331.macroexpand
  local indentation = _g331.indentation
  local reserved63 = _g331["reserved?"]
  local valid_id63 = _g331["valid-id?"]
  local to_id = _g331["to-id"]
  local imported = _g331.imported
  local exported = _g331.exported
  local mapo = _g331.mapo
  local quote_environment = _g331["quote-environment"]
  local quote_modules = _g331["quote-modules"]
  local initial_environment = _g331["initial-environment"]
  local _g334 = nexus.compiler
  local compile_body = _g334["compile-body"]
  local compile_call = _g334["compile-call"]
  local compile_function = _g334["compile-function"]
  local compile_special = _g334["compile-special"]
  local compile = _g334.compile
  local open_module = _g334["open-module"]
  local load_module = _g334["load-module"]
  local in_module = _g334["in-module"]
  local compile_module = _g334["compile-module"]
  local eval = _g334.eval
  target = "lua"
end)();
(function ()
  local _g610 = nexus.runtime
  local nil63 = _g610["nil?"]
  local is63 = _g610["is?"]
  local length = _g610.length
  local none63 = _g610["none?"]
  local some63 = _g610["some?"]
  local hd = _g610.hd
  local string63 = _g610["string?"]
  local number63 = _g610["number?"]
  local boolean63 = _g610["boolean?"]
  local function63 = _g610["function?"]
  local composite63 = _g610["composite?"]
  local atom63 = _g610["atom?"]
  local table63 = _g610["table?"]
  local list63 = _g610["list?"]
  local substring = _g610.substring
  local sublist = _g610.sublist
  local sub = _g610.sub
  local inner = _g610.inner
  local tl = _g610.tl
  local char = _g610.char
  local code = _g610.code
  local string_literal63 = _g610["string-literal?"]
  local id_literal63 = _g610["id-literal?"]
  local add = _g610.add
  local drop = _g610.drop
  local last = _g610.last
  local reverse = _g610.reverse
  local join = _g610.join
  local reduce = _g610.reduce
  local keep = _g610.keep
  local find = _g610.find
  local pairwise = _g610.pairwise
  local iterate = _g610.iterate
  local replicate = _g610.replicate
  local splice = _g610.splice
  local map = _g610.map
  local keys63 = _g610["keys?"]
  local empty63 = _g610["empty?"]
  local stash = _g610.stash
  local unstash = _g610.unstash
  local extend = _g610.extend
  local exclude = _g610.exclude
  local search = _g610.search
  local split = _g610.split
  local cat = _g610.cat
  local _43 = _g610["+"]
  local _ = _g610["-"]
  local _42 = _g610["*"]
  local _47 = _g610["/"]
  local _37 = _g610["%"]
  local _62 = _g610[">"]
  local _60 = _g610["<"]
  local _61 = _g610["="]
  local _6261 = _g610[">="]
  local _6061 = _g610["<="]
  local read_file = _g610["read-file"]
  local write_file = _g610["write-file"]
  local write = _g610.write
  local exit = _g610.exit
  local parse_number = _g610["parse-number"]
  local to_string = _g610["to-string"]
  local apply = _g610.apply
  local make_id = _g610["make-id"]
  local _37message_handler = _g610["%message-handler"]
  local toplevel63 = _g610["toplevel?"]
  local module_key = _g610["module-key"]
  local module = _g610.module
  local setenv = _g610.setenv
  local _g611 = nexus.utilities
  local getenv = _g611.getenv
  local macro_function = _g611["macro-function"]
  local macro63 = _g611["macro?"]
  local special63 = _g611["special?"]
  local special_form63 = _g611["special-form?"]
  local symbol_expansion = _g611["symbol-expansion"]
  local symbol63 = _g611["symbol?"]
  local variable63 = _g611["variable?"]
  local bound63 = _g611["bound?"]
  local toplevel63 = _g611["toplevel?"]
  local quoted = _g611.quoted
  local stash42 = _g611["stash*"]
  local bind = _g611.bind
  local bind42 = _g611["bind*"]
  local quasiexpand = _g611.quasiexpand
  local macroexpand = _g611.macroexpand
  local indentation = _g611.indentation
  local reserved63 = _g611["reserved?"]
  local valid_id63 = _g611["valid-id?"]
  local to_id = _g611["to-id"]
  local imported = _g611.imported
  local exported = _g611.exported
  local mapo = _g611.mapo
  local quote_environment = _g611["quote-environment"]
  local quote_modules = _g611["quote-modules"]
  local initial_environment = _g611["initial-environment"]
  local _g614 = nexus.compiler
  local compile_body = _g614["compile-body"]
  local compile_call = _g614["compile-call"]
  local compile_function = _g614["compile-function"]
  local compile_special = _g614["compile-special"]
  local compile = _g614.compile
  local open_module = _g614["open-module"]
  local load_module = _g614["load-module"]
  local in_module = _g614["in-module"]
  local compile_module = _g614["compile-module"]
  local eval = _g614.eval
  modules = {boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["do"] = {tr = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, stmt = true, export = true}, ["%if"] = {tr = true, special = function (_g627, tail63)
    local x = _g627[1]
    local _g628 = _g627[2]
    local _g629 = _g627[3]
    local _g630 = compile(x)
    local _g631 = (function ()
      indent_level = (indent_level + 1)
      local _g633 = compile(_g628, {_stash = true, stmt = true, tail = tail63})
      indent_level = (indent_level - 1)
      return(_g633)
    end)()
    local _g632 = (function ()
      if _g629 then
        indent_level = (indent_level + 1)
        local _g634 = compile(_g629, {_stash = true, stmt = true, tail = tail63})
        indent_level = (indent_level - 1)
        return(_g634)
      end
    end)()
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g630 .. ") {\n" .. _g631 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g630 .. " then\n" .. _g631)
    end
    if (_g632 and (target == "js")) then
      str = (str .. " else {\n" .. _g632 .. ind .. "}")
    else
      if _g632 then
        str = (str .. ind .. "else\n" .. _g632)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end, stmt = true, export = true}, ["while"] = {tr = true, special = function (_g635)
    local condition = _g635[1]
    local body = sub(_g635, 1)
    local _g636 = compile(condition)
    local _g637 = (function ()
      indent_level = (indent_level + 1)
      local _g638 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g638)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g636 .. ") {\n" .. _g637 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g636 .. " do\n" .. _g637 .. ind .. "end\n"))
    end
  end, stmt = true, export = true}, ["%for"] = {tr = true, special = function (_g639)
    local t = _g639[1]
    local k = _g639[2]
    local body = sub(_g639, 2)
    local _g640 = compile(t)
    local ind = indentation()
    local _g641 = (function ()
      indent_level = (indent_level + 1)
      local _g642 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g642)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g640 .. " do\n" .. _g641 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g640 .. ") {\n" .. _g641 .. ind .. "}\n"))
    end
  end, stmt = true, export = true}, ["%try"] = {tr = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g643 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g643)
    end)()
    local e = make_id()
    local handler = {"return", {"%array", false, {"get", e, "\"message\""}}}
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g644 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g644)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, stmt = true, export = true}, ["break"] = {special = function (_g131)
    return((indentation() .. "break"))
  end, stmt = true, export = true}, ["%function"] = {export = true, special = function (_g645)
    local args = _g645[1]
    local body = sub(_g645, 1)
    return(compile_function(args, body))
  end}, ["%global-function"] = {tr = true, special = function (_g646)
    local name = _g646[1]
    local args = _g646[2]
    local body = sub(_g646, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, stmt = true}))
    end
  end, stmt = true, export = true}, ["%local-function"] = {tr = true, special = function (_g647)
    local name = _g647[1]
    local args = _g647[2]
    local body = sub(_g647, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, stmt = true, export = true}, ["return"] = {special = function (_g648)
    local x = _g648[1]
    local _g649 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call({"return", x}))
      end
    end)()
    return((indentation() .. _g649))
  end, stmt = true, export = true}, ["error"] = {special = function (_g650)
    local x = _g650[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile({"Error", x})))
      else
        return(compile_call({"error", x}))
      end
    end)()
    return((indentation() .. e))
  end, stmt = true, export = true}, ["%local"] = {special = function (_g651)
    local name = _g651[1]
    local value = _g651[2]
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
  end, stmt = true, export = true}, ["set"] = {special = function (_g652)
    local lh = _g652[1]
    local rh = _g652[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, stmt = true, export = true}, ["get"] = {export = true, special = function (_g653)
    local t = _g653[1]
    local k = _g653[2]
    local _g654 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g654, 0) == "{")) then
      _g654 = ("(" .. _g654 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g654 .. "." .. inner(k)))
    else
      return((_g654 .. "[" .. k1 .. "]"))
    end
  end}, ["not"] = {export = true, special = function (_g655)
    local x = _g655[1]
    local _g656 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g656 .. ")"))
  end}, ["%array"] = {export = true, special = function (forms)
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
    local _g657 = forms
    local i = 0
    while (i < length(_g657)) do
      local x = _g657[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["%object"] = {export = true, special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local _g658 = pairs
    local i = 0
    while (i < length(_g658)) do
      local _g659 = _g658[(i + 1)]
      local k = _g659[1]
      local v = _g659[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g660 = compile(v)
      local _g661 = (function ()
        if valid_id63(k) then
          return(k)
        else
          if ((target == "js") and string_literal63(k)) then
            return(k)
          else
            if (target == "js") then
              return(quoted(k))
            else
              if string_literal63(k) then
                return(("[" .. k .. "]"))
              else
                return(("[" .. quoted(k) .. "]"))
              end
            end
          end
        end
      end)()
      str = (str .. _g661 .. sep .. _g660)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}}}, lib = {import = {"core", "special"}, export = {}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sublist = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, find = {export = true, variable = true}, pairwise = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, splice = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, extend = {export = true, variable = true}, exclude = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, ["parse-number"] = {export = true, variable = true}, ["to-string"] = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, ["splice?"] = {variable = true}, mapl = {variable = true}, ["id-count"] = {variable = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["compile-body"] = {export = true, variable = true}, ["compile-call"] = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-special"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, ["%result"] = {global = true, export = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, ["%compile-module"] = {variable = true}, prologue = {variable = true}}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, at = {export = true, macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g662 = body
      local k = nil
      for k in next, _g662 do
        if (not number63(k)) then
          local v = _g662[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g663)
      local a = _g663[1]
      local b = _g663[2]
      local c = sub(_g663, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g329, x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g664 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g665)
      local lh = _g665[1]
      local rh = _g665[2]
      local _g666 = bind(lh, rh)
      local _g667 = 0
      while (_g667 < length(_g666)) do
        local _g668 = _g666[(_g667 + 1)]
        local id = _g668[1]
        local val = _g668[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g667 = (_g667 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g664)})))
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g669 = sub(body, 0)
    local imports = {}
    local imp = _g669.import
    local exp = _g669.export
    local _g670 = (imp or {})
    local _g671 = 0
    while (_g671 < length(_g670)) do
      local k = _g670[(_g671 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g671 = (_g671 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g672 = (exp or {})
    local _g673 = 0
    while (_g673 < length(_g672)) do
      local k = _g672[(_g673 + 1)]
      setenv(k, {_stash = true, export = true})
      _g673 = (_g673 + 1)
    end
    return(join({"do"}, imports))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g674 = sub(body, 0)
    local form = join({"fn", args}, _g674)
    eval((function ()
      local _g675 = {"setenv", {"quote", name}}
      _g675.macro = form
      _g675.form = {"quote", form}
      return(_g675)
    end)())
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g676 = sub(body, 0)
    local form = join({"fn", args}, _g676)
    local keys = sub(_g676, length(_g676))
    eval(join((function ()
      local _g677 = {"setenv", {"quote", name}}
      _g677.special = form
      _g677.form = {"quote", form}
      return(_g677)
    end)(), keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g678 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g678) then
      local _g679 = bind42(x, _g678)
      local args = _g679[1]
      local _g680 = _g679[2]
      return(join({"%local-function", name, args}, _g680))
    else
      return({"%local", name, x})
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g681 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g681) then
      local _g682 = bind42(x, _g681)
      local args = _g682[1]
      local _g683 = _g682[2]
      return(join({"%global-function", name, args}, _g683))
    else
      if (target == "js") then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["with-bindings"] = {export = true, macro = function (_g684, ...)
    local names = _g684[1]
    local body = unstash({...})
    local _g685 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g686 = {"with-frame", {"each", {x}, names, (function ()
        local _g687 = {"setenv", x}
        _g687.variable = true
        return(_g687)
      end)()}}
      _g686.scope = true
      return(_g686)
    end)(), _g685))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g688 = sub(body, 0)
    add(environment, {})
    local _g689 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g688)))
    end)()
    drop(environment)
    return(_g689)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g690 = sub(body, 0)
    add(environment, {})
    local _g691 = (function ()
      map(function (_g692)
        local name = _g692[1]
        local exp = _g692[2]
        return(macroexpand({"define-symbol", name, exp}))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g690)))
    end)()
    drop(environment)
    return(_g691)
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g693 = sub(body, 0)
    local _g694 = bind42(args, _g693)
    local _g695 = _g694[1]
    local _g696 = _g694[2]
    return(join({"%function", _g695}, _g696))
  end}, guard = {export = true, macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    return({"let", {t1, t}, (function ()
      if nil63(v) then
        local i = (function ()
          if b.i then
            return("i")
          else
            return(make_id())
          end
        end)()
        return({"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g697), {"inc", i}}})
      else
        return({"let", {k, "nil"}, {"%for", t1, k, {"if", (function ()
          local _g698 = {"target"}
          _g698.js = {"isNaN", {"parseInt", k}}
          _g698.lua = {"not", {"number?", k}}
          return(_g698)
        end)(), join({"let", {v, {"get", t1, k}}}, _g697)}}})
      end
    end)()})
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g699 = elements
    local _g700 = 0
    while (_g700 < length(_g699)) do
      local e = _g699[(_g700 + 1)]
      l[e] = true
      _g700 = (_g700 + 1)
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g701 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g701)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g702 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g702)})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g703 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g703)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return({"do", {"add", "environment", (function ()
      local _g705 = {"table"}
      _g705._scope = scope
      return(_g705)
    end)()}, {"let", {x, join({"do"}, _g704)}, {"drop", "environment"}, x}})
  end}}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g706, ...)
    local char = _g706[1]
    local stream = _g706[2]
    local body = unstash({...})
    local _g707 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g707)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g708 = sub(specs, 0)
    map(compile_module, _g708)
    return(nil)
  end}}}, optimizer = {import = {"runtime", "special", "core"}, export = {optimize = {variable = true, export = true}, ["define-optimization"] = {}, optimizations = {variable = true}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}, utilities = {import = {"runtime", "special", "core"}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, ["to-id"] = {export = true, variable = true}, imported = {export = true, variable = true}, exported = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-char?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g709 = sub(body, 0)
    local imports = {}
    local imp = _g709.import
    local exp = _g709.export
    local _g710 = (imp or {})
    local _g711 = 0
    while (_g711 < length(_g710)) do
      local k = _g710[(_g711 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g711 = (_g711 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g712 = (exp or {})
    local _g713 = 0
    while (_g713 < length(_g712)) do
      local k = _g712[(_g713 + 1)]
      setenv(k, {_stash = true, export = true})
      _g713 = (_g713 + 1)
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local length = _g2.length
  local none63 = _g2["none?"]
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
  local empty63 = _g2["empty?"]
  local stash = _g2.stash
  local unstash = _g2.unstash
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
  local toplevel63 = _g2["toplevel?"]
  local module_key = _g2["module-key"]
  local module = _g2.module
  local setenv = _g2.setenv
  local _g5 = nexus.reader
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus.compiler
  local compile_body = _g6["compile-body"]
  local compile_call = _g6["compile-call"]
  local compile_function = _g6["compile-function"]
  local compile_special = _g6["compile-special"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local function rep(str)
    local _g715 = (function ()
      local _g716,_g717 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g716, _g717})
    end)()
    local _g1 = _g715[1]
    local x = _g715[2]
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
    local _g718 = args
    local i = 0
    while (i < length(_g718)) do
      local arg = _g718[(i + 1)]
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
  local _g719 = {}
  nexus.main = _g719
  _g719.rep = rep
  _g719.repl = repl
  _g719.usage = usage
  _g719.main = main
end)();
