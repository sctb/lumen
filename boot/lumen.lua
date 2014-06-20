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
    if empty63(x) then
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
    return({value = x, _splice = true})
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
    if empty63(_g42) then
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
  _g53.map = map
  _g53[">"] = _62
  _g53.exit = exit
  _g53.drop = drop
  _g53["splice?"] = splice63
  _g53.cat = cat
  _g53.sub = sub
  _g53["="] = _61
  _g53["<"] = _60
  _g53["string?"] = string63
  _g53["nil?"] = nil63
  _g53.pairwise = pairwise
  _g53.code = code
  _g53.inner = inner
  _g53["keys?"] = keys63
  _g53["module-key"] = module_key
  _g53.hd = hd
  _g53["%"] = _37
  _g53["some?"] = some63
  _g53["atom?"] = atom63
  _g53["composite?"] = composite63
  _g53.substring = substring
  _g53.keep = keep
  _g53.tl = tl
  _g53[">="] = _6261
  _g53["<="] = _6061
  _g53.replicate = replicate
  _g53["-"] = _
  _g53["+"] = _43
  _g53.iterate = iterate
  _g53.exclude = exclude
  _g53["toplevel?"] = toplevel63
  _g53.splice = splice
  _g53.search = search
  _g53["function?"] = function63
  _g53.stash = stash
  _g53.apply = apply
  _g53.join = join
  _g53.sublist = sublist
  _g53.reverse = reverse
  _g53.reduce = reduce
  _g53["id-literal?"] = id_literal63
  _g53.add = add
  _g53["to-string"] = to_string
  _g53["table?"] = table63
  _g53["string-literal?"] = string_literal63
  _g53["id-count"] = id_count
  _g53.unstash = unstash
  _g53.mapl = mapl
  _g53.setenv = setenv
  _g53.module = module
  _g53["%message-handler"] = _37message_handler
  _g53["is?"] = is63
  _g53["make-id"] = make_id
  _g53["*"] = _42
  _g53["empty?"] = empty63
  _g53.last = last
  _g53.find = find
  _g53["parse-number"] = parse_number
  _g53["number?"] = number63
  _g53.extend = extend
  _g53["write-file"] = write_file
  _g53.char = char
  _g53.split = split
  _g53["boolean?"] = boolean63
  _g53["read-file"] = read_file
  _g53["/"] = _47
  _g53["list?"] = list63
  _g53.length = length
  _g53.write = write
end)();
(function ()
  local _g58 = nexus.runtime
  local map = _g58.map
  local _62 = _g58[">"]
  local exit = _g58.exit
  local drop = _g58.drop
  local cat = _g58.cat
  local sub = _g58.sub
  local _61 = _g58["="]
  local _60 = _g58["<"]
  local string63 = _g58["string?"]
  local nil63 = _g58["nil?"]
  local pairwise = _g58.pairwise
  local code = _g58.code
  local inner = _g58.inner
  local keys63 = _g58["keys?"]
  local module_key = _g58["module-key"]
  local hd = _g58.hd
  local _37 = _g58["%"]
  local some63 = _g58["some?"]
  local atom63 = _g58["atom?"]
  local composite63 = _g58["composite?"]
  local substring = _g58.substring
  local keep = _g58.keep
  local tl = _g58.tl
  local _6261 = _g58[">="]
  local _6061 = _g58["<="]
  local replicate = _g58.replicate
  local _ = _g58["-"]
  local _43 = _g58["+"]
  local iterate = _g58.iterate
  local exclude = _g58.exclude
  local toplevel63 = _g58["toplevel?"]
  local splice = _g58.splice
  local search = _g58.search
  local function63 = _g58["function?"]
  local stash = _g58.stash
  local apply = _g58.apply
  local join = _g58.join
  local sublist = _g58.sublist
  local reverse = _g58.reverse
  local reduce = _g58.reduce
  local id_literal63 = _g58["id-literal?"]
  local add = _g58.add
  local to_string = _g58["to-string"]
  local table63 = _g58["table?"]
  local string_literal63 = _g58["string-literal?"]
  local unstash = _g58.unstash
  local setenv = _g58.setenv
  local module = _g58.module
  local _37message_handler = _g58["%message-handler"]
  local is63 = _g58["is?"]
  local make_id = _g58["make-id"]
  local _42 = _g58["*"]
  local empty63 = _g58["empty?"]
  local last = _g58.last
  local find = _g58.find
  local parse_number = _g58["parse-number"]
  local number63 = _g58["number?"]
  local extend = _g58.extend
  local write_file = _g58["write-file"]
  local char = _g58.char
  local split = _g58.split
  local boolean63 = _g58["boolean?"]
  local read_file = _g58["read-file"]
  local _47 = _g58["/"]
  local list63 = _g58["list?"]
  local length = _g58.length
  local write = _g58.write
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
    else
      if atom63(lh) then
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
        else
          if (list63(arg) or keys63(arg)) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
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
    else
      if atom63(form) then
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
        else
          if (x == "%function") then
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
          else
            if ((x == "%local-function") or (x == "%global-function")) then
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
  local reserved = {["try"] = true, ["while"] = true, ["not"] = true, ["until"] = true, ["repeat"] = true, ["then"] = true, ["do"] = true, ["="] = true, ["typeof"] = true, ["/"] = true, ["%"] = true, ["instanceof"] = true, ["or"] = true, ["delete"] = true, ["-"] = true, ["+"] = true, ["function"] = true, ["and"] = true, ["switch"] = true, ["if"] = true, ["local"] = true, ["break"] = true, ["elseif"] = true, ["for"] = true, ["default"] = true, ["=="] = true, ["<="] = true, ["nil"] = true, ["catch"] = true, [">"] = true, ["else"] = true, ["<"] = true, ["throw"] = true, ["return"] = true, ["continue"] = true, ["with"] = true, ["void"] = true, [">="] = true, ["finally"] = true, ["var"] = true, ["false"] = true, ["this"] = true, ["new"] = true, ["end"] = true, ["case"] = true, ["debugger"] = true, ["*"] = true, ["true"] = true, ["in"] = true}
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
    if empty63(id) then
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
    local _g89 = module(current_module).export
    local n = nil
    for n in next, _g89 do
      if (not number63(n)) then
        local b = _g89[n]
        if b.variable then
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
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = join({"quote", b.symbol})}))
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
  _g94["reserved?"] = reserved63
  _g94["quote-environment"] = quote_environment
  _g94["toplevel?"] = toplevel63
  _g94["to-id"] = to_id
  _g94["global?"] = global63
  _g94["bind*"] = bind42
  _g94["symbol?"] = symbol63
  _g94.imported = imported
  _g94["stash*"] = stash42
  _g94["can-unquote?"] = can_unquote63
  _g94.indentation = indentation
  _g94.mapo = mapo
  _g94["numeric?"] = numeric63
  _g94.macroexpand = macroexpand
  _g94.reserved = reserved
  _g94["special-form?"] = special_form63
  _g94["special?"] = special63
  _g94["valid-id?"] = valid_id63
  _g94["variable?"] = variable63
  _g94["symbol-expansion"] = symbol_expansion
  _g94["quote-binding"] = quote_binding
  _g94["bound?"] = bound63
  _g94["quote-module"] = quote_module
  _g94["quote-frame"] = quote_frame
  _g94.escape = escape
  _g94["valid-char?"] = valid_char63
  _g94.quoted = quoted
  _g94["quasisplice?"] = quasisplice63
  _g94.quasiexpand = quasiexpand
  _g94["macro?"] = macro63
  _g94["quote-modules"] = quote_modules
  _g94.exported = exported
  _g94["quasiquote-list"] = quasiquote_list
  _g94["quasiquoting?"] = quasiquoting63
  _g94["quoting?"] = quoting63
  _g94["initial-environment"] = initial_environment
  _g94["macro-function"] = macro_function
  _g94.getenv = getenv
  _g94.bind = bind
end)();
(function ()
  local _g95 = nexus.runtime
  local map = _g95.map
  local _62 = _g95[">"]
  local exit = _g95.exit
  local drop = _g95.drop
  local cat = _g95.cat
  local sub = _g95.sub
  local _61 = _g95["="]
  local _60 = _g95["<"]
  local string63 = _g95["string?"]
  local nil63 = _g95["nil?"]
  local pairwise = _g95.pairwise
  local code = _g95.code
  local inner = _g95.inner
  local keys63 = _g95["keys?"]
  local module_key = _g95["module-key"]
  local hd = _g95.hd
  local _37 = _g95["%"]
  local some63 = _g95["some?"]
  local atom63 = _g95["atom?"]
  local composite63 = _g95["composite?"]
  local substring = _g95.substring
  local keep = _g95.keep
  local tl = _g95.tl
  local _6261 = _g95[">="]
  local _6061 = _g95["<="]
  local replicate = _g95.replicate
  local _ = _g95["-"]
  local _43 = _g95["+"]
  local iterate = _g95.iterate
  local exclude = _g95.exclude
  local toplevel63 = _g95["toplevel?"]
  local splice = _g95.splice
  local search = _g95.search
  local function63 = _g95["function?"]
  local stash = _g95.stash
  local apply = _g95.apply
  local join = _g95.join
  local sublist = _g95.sublist
  local reverse = _g95.reverse
  local reduce = _g95.reduce
  local id_literal63 = _g95["id-literal?"]
  local add = _g95.add
  local to_string = _g95["to-string"]
  local table63 = _g95["table?"]
  local string_literal63 = _g95["string-literal?"]
  local unstash = _g95.unstash
  local setenv = _g95.setenv
  local module = _g95.module
  local _37message_handler = _g95["%message-handler"]
  local is63 = _g95["is?"]
  local make_id = _g95["make-id"]
  local _42 = _g95["*"]
  local empty63 = _g95["empty?"]
  local last = _g95.last
  local find = _g95.find
  local parse_number = _g95["parse-number"]
  local number63 = _g95["number?"]
  local extend = _g95.extend
  local write_file = _g95["write-file"]
  local char = _g95.char
  local split = _g95.split
  local boolean63 = _g95["boolean?"]
  local read_file = _g95["read-file"]
  local _47 = _g95["/"]
  local list63 = _g95["list?"]
  local length = _g95.length
  local write = _g95.write
  local delimiters = {[")"] = true, [";"] = true, ["("] = true, ["\n"] = true}
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
  local function make_stream(str)
    return({len = length(str), string = str, pos = 0})
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
                return(join({"get", b, join({"quote", a})}))
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
  local _g106 = {}
  nexus.reader = _g106
  _g106["skip-non-code"] = skip_non_code
  _g106["make-stream"] = make_stream
  _g106["read-all"] = read_all
  _g106["read-table"] = read_table
  _g106["read-from-string"] = read_from_string
  _g106.whitespace = whitespace
  _g106.read = read
  _g106.eof = eof
  _g106["flag?"] = flag63
  _g106["peek-char"] = peek_char
  _g106["read-char"] = read_char
  _g106.delimiters = delimiters
  _g106["key?"] = key63
end)();
(function ()
  local _g107 = nexus.runtime
  local map = _g107.map
  local _62 = _g107[">"]
  local exit = _g107.exit
  local drop = _g107.drop
  local cat = _g107.cat
  local sub = _g107.sub
  local _61 = _g107["="]
  local _60 = _g107["<"]
  local string63 = _g107["string?"]
  local nil63 = _g107["nil?"]
  local pairwise = _g107.pairwise
  local code = _g107.code
  local inner = _g107.inner
  local keys63 = _g107["keys?"]
  local module_key = _g107["module-key"]
  local hd = _g107.hd
  local _37 = _g107["%"]
  local some63 = _g107["some?"]
  local atom63 = _g107["atom?"]
  local composite63 = _g107["composite?"]
  local substring = _g107.substring
  local keep = _g107.keep
  local tl = _g107.tl
  local _6261 = _g107[">="]
  local _6061 = _g107["<="]
  local replicate = _g107.replicate
  local _ = _g107["-"]
  local _43 = _g107["+"]
  local iterate = _g107.iterate
  local exclude = _g107.exclude
  local toplevel63 = _g107["toplevel?"]
  local splice = _g107.splice
  local search = _g107.search
  local function63 = _g107["function?"]
  local stash = _g107.stash
  local apply = _g107.apply
  local join = _g107.join
  local sublist = _g107.sublist
  local reverse = _g107.reverse
  local reduce = _g107.reduce
  local id_literal63 = _g107["id-literal?"]
  local add = _g107.add
  local to_string = _g107["to-string"]
  local table63 = _g107["table?"]
  local string_literal63 = _g107["string-literal?"]
  local unstash = _g107.unstash
  local setenv = _g107.setenv
  local module = _g107.module
  local _37message_handler = _g107["%message-handler"]
  local is63 = _g107["is?"]
  local make_id = _g107["make-id"]
  local _42 = _g107["*"]
  local empty63 = _g107["empty?"]
  local last = _g107.last
  local find = _g107.find
  local parse_number = _g107["parse-number"]
  local number63 = _g107["number?"]
  local extend = _g107.extend
  local write_file = _g107["write-file"]
  local char = _g107.char
  local split = _g107.split
  local boolean63 = _g107["boolean?"]
  local read_file = _g107["read-file"]
  local _47 = _g107["/"]
  local list63 = _g107["list?"]
  local length = _g107.length
  local write = _g107.write
  local _g108 = nexus.utilities
  local reserved63 = _g108["reserved?"]
  local quote_environment = _g108["quote-environment"]
  local toplevel63 = _g108["toplevel?"]
  local to_id = _g108["to-id"]
  local bind42 = _g108["bind*"]
  local symbol63 = _g108["symbol?"]
  local imported = _g108.imported
  local stash42 = _g108["stash*"]
  local indentation = _g108.indentation
  local mapo = _g108.mapo
  local macroexpand = _g108.macroexpand
  local special_form63 = _g108["special-form?"]
  local special63 = _g108["special?"]
  local valid_id63 = _g108["valid-id?"]
  local variable63 = _g108["variable?"]
  local symbol_expansion = _g108["symbol-expansion"]
  local bound63 = _g108["bound?"]
  local quoted = _g108.quoted
  local quasiexpand = _g108.quasiexpand
  local macro63 = _g108["macro?"]
  local quote_modules = _g108["quote-modules"]
  local exported = _g108.exported
  local initial_environment = _g108["initial-environment"]
  local macro_function = _g108["macro-function"]
  local getenv = _g108.getenv
  local bind = _g108.bind
  local _g111 = nexus.reader
  local make_stream = _g111["make-stream"]
  local read_all = _g111["read-all"]
  local read_table = _g111["read-table"]
  local read_from_string = _g111["read-from-string"]
  local read = _g111.read
  local infix = {common = {["/"] = true, [">"] = true, ["%"] = true, [">="] = true, ["<="] = true, ["-"] = true, ["<"] = true, ["+"] = true, ["*"] = true}, js = {["or"] = "||", ["="] = "===", ["and"] = "&&", ["~="] = "!=", cat = "+"}, lua = {cat = "..", ["="] = "==", ["and"] = true, ["~="] = true, ["or"] = true}}
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
    else
      if (target == "js") then
        return(";\n")
      else
        return("\n")
      end
    end
  end
  local function compile_special(form, stmt63, tail63)
    local _g115 = getenv(hd(form))
    local special = _g115.special
    local self_tr63 = _g115.tr
    local stmt = _g115.stmt
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
      else
        if string63(f) then
          return((f1 .. args))
        else
          error("Invalid function call")
        end
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
  local function compile_function(args, body, ...)
    local _g119 = unstash({...})
    local name = _g119.name
    local prefix = _g119.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g120 = (prefix or "")
    local _g121 = compile_args(args)
    local _g122 = (function ()
      indent_level = (indent_level + 1)
      local _g123 = compile_body(body, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g123)
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
      return(("function " .. id .. _g121 .. " {\n" .. _g122 .. ind .. "}" .. tr))
    else
      return((_g120 .. "function " .. id .. _g121 .. "\n" .. _g122 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g124 = unstash({...})
    local stmt = _g124.stmt
    local tail = _g124.tail
    if (tail and can_return63(form)) then
      form = join({"return", form})
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
        local _g125 = (function ()
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
        return((ind .. _g125 .. tr))
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
    local _g126 = lower(body)
    local epilog = lower(exported())
    return(join({join({"%function", {}}, join(_g126, {epilog}))}))
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
    local _g127 = unstash({...})
    local all = _g127.all
    local m = module(spec)
    local frame = last(environment)
    local _g128 = m.export
    local k = nil
    for k in next, _g128 do
      if (not number63(k)) then
        local v = _g128[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g129 = unstash({...})
    local all = _g129.all
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
  local _g130 = {}
  nexus.compiler = _g130
  _g130["open-module"] = open_module
  _g130["can-return?"] = can_return63
  _g130["compile-call"] = compile_call
  _g130.eval = eval
  _g130.infix = infix
  _g130["load-module"] = load_module
  _g130["compile-file"] = compile_file
  _g130["compile-special"] = compile_special
  _g130["%compile-module"] = _37compile_module
  _g130["compile-function"] = compile_function
  _g130["in-module"] = in_module
  _g130.getop = getop
  _g130["compiler-output"] = compiler_output
  _g130["compiling?"] = compiling63
  _g130.run = run
  _g130.encapsulate = encapsulate
  _g130.compile = compile
  _g130["compile-body"] = compile_body
  _g130.prologue = prologue
  _g130["compile-infix"] = compile_infix
  _g130["module-path"] = module_path
  _g130.lower = lower
  _g130["compile-atom"] = compile_atom
  _g130["infix?"] = infix63
  _g130.terminator = terminator
  _g130["compile-module"] = compile_module
  _g130["compile-args"] = compile_args
end)();
(function ()
  local _g132 = nexus.runtime
  local map = _g132.map
  local _62 = _g132[">"]
  local exit = _g132.exit
  local drop = _g132.drop
  local cat = _g132.cat
  local sub = _g132.sub
  local _61 = _g132["="]
  local _60 = _g132["<"]
  local string63 = _g132["string?"]
  local nil63 = _g132["nil?"]
  local pairwise = _g132.pairwise
  local code = _g132.code
  local inner = _g132.inner
  local keys63 = _g132["keys?"]
  local module_key = _g132["module-key"]
  local hd = _g132.hd
  local _37 = _g132["%"]
  local some63 = _g132["some?"]
  local atom63 = _g132["atom?"]
  local composite63 = _g132["composite?"]
  local substring = _g132.substring
  local keep = _g132.keep
  local tl = _g132.tl
  local _6261 = _g132[">="]
  local _6061 = _g132["<="]
  local replicate = _g132.replicate
  local _ = _g132["-"]
  local _43 = _g132["+"]
  local iterate = _g132.iterate
  local exclude = _g132.exclude
  local toplevel63 = _g132["toplevel?"]
  local splice = _g132.splice
  local search = _g132.search
  local function63 = _g132["function?"]
  local stash = _g132.stash
  local apply = _g132.apply
  local join = _g132.join
  local sublist = _g132.sublist
  local reverse = _g132.reverse
  local reduce = _g132.reduce
  local id_literal63 = _g132["id-literal?"]
  local add = _g132.add
  local to_string = _g132["to-string"]
  local table63 = _g132["table?"]
  local string_literal63 = _g132["string-literal?"]
  local unstash = _g132.unstash
  local setenv = _g132.setenv
  local module = _g132.module
  local _37message_handler = _g132["%message-handler"]
  local is63 = _g132["is?"]
  local make_id = _g132["make-id"]
  local _42 = _g132["*"]
  local empty63 = _g132["empty?"]
  local last = _g132.last
  local find = _g132.find
  local parse_number = _g132["parse-number"]
  local number63 = _g132["number?"]
  local extend = _g132.extend
  local write_file = _g132["write-file"]
  local char = _g132.char
  local split = _g132.split
  local boolean63 = _g132["boolean?"]
  local read_file = _g132["read-file"]
  local _47 = _g132["/"]
  local list63 = _g132["list?"]
  local length = _g132.length
  local write = _g132.write
  local _g133 = nexus.utilities
  local reserved63 = _g133["reserved?"]
  local quote_environment = _g133["quote-environment"]
  local toplevel63 = _g133["toplevel?"]
  local to_id = _g133["to-id"]
  local bind42 = _g133["bind*"]
  local symbol63 = _g133["symbol?"]
  local imported = _g133.imported
  local stash42 = _g133["stash*"]
  local indentation = _g133.indentation
  local mapo = _g133.mapo
  local macroexpand = _g133.macroexpand
  local special_form63 = _g133["special-form?"]
  local special63 = _g133["special?"]
  local valid_id63 = _g133["valid-id?"]
  local variable63 = _g133["variable?"]
  local symbol_expansion = _g133["symbol-expansion"]
  local bound63 = _g133["bound?"]
  local quoted = _g133.quoted
  local quasiexpand = _g133.quasiexpand
  local macro63 = _g133["macro?"]
  local quote_modules = _g133["quote-modules"]
  local exported = _g133.exported
  local initial_environment = _g133["initial-environment"]
  local macro_function = _g133["macro-function"]
  local getenv = _g133.getenv
  local bind = _g133.bind
  local _g136 = nexus.compiler
  local open_module = _g136["open-module"]
  local compile_call = _g136["compile-call"]
  local eval = _g136.eval
  local load_module = _g136["load-module"]
  local compile_special = _g136["compile-special"]
  local compile_function = _g136["compile-function"]
  local in_module = _g136["in-module"]
  local compile = _g136.compile
  local compile_body = _g136["compile-body"]
  local compile_module = _g136["compile-module"]
end)();
(function ()
  local _g331 = nexus.runtime
  local map = _g331.map
  local _62 = _g331[">"]
  local exit = _g331.exit
  local drop = _g331.drop
  local cat = _g331.cat
  local sub = _g331.sub
  local _61 = _g331["="]
  local _60 = _g331["<"]
  local string63 = _g331["string?"]
  local nil63 = _g331["nil?"]
  local pairwise = _g331.pairwise
  local code = _g331.code
  local inner = _g331.inner
  local keys63 = _g331["keys?"]
  local module_key = _g331["module-key"]
  local hd = _g331.hd
  local _37 = _g331["%"]
  local some63 = _g331["some?"]
  local atom63 = _g331["atom?"]
  local composite63 = _g331["composite?"]
  local substring = _g331.substring
  local keep = _g331.keep
  local tl = _g331.tl
  local _6261 = _g331[">="]
  local _6061 = _g331["<="]
  local replicate = _g331.replicate
  local _ = _g331["-"]
  local _43 = _g331["+"]
  local iterate = _g331.iterate
  local exclude = _g331.exclude
  local toplevel63 = _g331["toplevel?"]
  local splice = _g331.splice
  local search = _g331.search
  local function63 = _g331["function?"]
  local stash = _g331.stash
  local apply = _g331.apply
  local join = _g331.join
  local sublist = _g331.sublist
  local reverse = _g331.reverse
  local reduce = _g331.reduce
  local id_literal63 = _g331["id-literal?"]
  local add = _g331.add
  local to_string = _g331["to-string"]
  local table63 = _g331["table?"]
  local string_literal63 = _g331["string-literal?"]
  local unstash = _g331.unstash
  local setenv = _g331.setenv
  local module = _g331.module
  local _37message_handler = _g331["%message-handler"]
  local is63 = _g331["is?"]
  local make_id = _g331["make-id"]
  local _42 = _g331["*"]
  local empty63 = _g331["empty?"]
  local last = _g331.last
  local find = _g331.find
  local parse_number = _g331["parse-number"]
  local number63 = _g331["number?"]
  local extend = _g331.extend
  local write_file = _g331["write-file"]
  local char = _g331.char
  local split = _g331.split
  local boolean63 = _g331["boolean?"]
  local read_file = _g331["read-file"]
  local _47 = _g331["/"]
  local list63 = _g331["list?"]
  local length = _g331.length
  local write = _g331.write
  local _g332 = nexus.utilities
  local reserved63 = _g332["reserved?"]
  local quote_environment = _g332["quote-environment"]
  local toplevel63 = _g332["toplevel?"]
  local to_id = _g332["to-id"]
  local bind42 = _g332["bind*"]
  local symbol63 = _g332["symbol?"]
  local imported = _g332.imported
  local stash42 = _g332["stash*"]
  local indentation = _g332.indentation
  local mapo = _g332.mapo
  local macroexpand = _g332.macroexpand
  local special_form63 = _g332["special-form?"]
  local special63 = _g332["special?"]
  local valid_id63 = _g332["valid-id?"]
  local variable63 = _g332["variable?"]
  local symbol_expansion = _g332["symbol-expansion"]
  local bound63 = _g332["bound?"]
  local quoted = _g332.quoted
  local quasiexpand = _g332.quasiexpand
  local macro63 = _g332["macro?"]
  local quote_modules = _g332["quote-modules"]
  local exported = _g332.exported
  local initial_environment = _g332["initial-environment"]
  local macro_function = _g332["macro-function"]
  local getenv = _g332.getenv
  local bind = _g332.bind
  local _g335 = nexus.compiler
  local open_module = _g335["open-module"]
  local compile_call = _g335["compile-call"]
  local eval = _g335.eval
  local load_module = _g335["load-module"]
  local compile_special = _g335["compile-special"]
  local compile_function = _g335["compile-function"]
  local in_module = _g335["in-module"]
  local compile = _g335.compile
  local compile_body = _g335["compile-body"]
  local compile_module = _g335["compile-module"]
  target = "lua"
end)();
(function ()
  local _g620 = nexus.runtime
  local map = _g620.map
  local _62 = _g620[">"]
  local exit = _g620.exit
  local drop = _g620.drop
  local cat = _g620.cat
  local sub = _g620.sub
  local _61 = _g620["="]
  local _60 = _g620["<"]
  local string63 = _g620["string?"]
  local nil63 = _g620["nil?"]
  local pairwise = _g620.pairwise
  local code = _g620.code
  local inner = _g620.inner
  local keys63 = _g620["keys?"]
  local module_key = _g620["module-key"]
  local hd = _g620.hd
  local _37 = _g620["%"]
  local some63 = _g620["some?"]
  local atom63 = _g620["atom?"]
  local composite63 = _g620["composite?"]
  local substring = _g620.substring
  local keep = _g620.keep
  local tl = _g620.tl
  local _6261 = _g620[">="]
  local _6061 = _g620["<="]
  local replicate = _g620.replicate
  local _ = _g620["-"]
  local _43 = _g620["+"]
  local iterate = _g620.iterate
  local exclude = _g620.exclude
  local toplevel63 = _g620["toplevel?"]
  local splice = _g620.splice
  local search = _g620.search
  local function63 = _g620["function?"]
  local stash = _g620.stash
  local apply = _g620.apply
  local join = _g620.join
  local sublist = _g620.sublist
  local reverse = _g620.reverse
  local reduce = _g620.reduce
  local id_literal63 = _g620["id-literal?"]
  local add = _g620.add
  local to_string = _g620["to-string"]
  local table63 = _g620["table?"]
  local string_literal63 = _g620["string-literal?"]
  local unstash = _g620.unstash
  local setenv = _g620.setenv
  local module = _g620.module
  local _37message_handler = _g620["%message-handler"]
  local is63 = _g620["is?"]
  local make_id = _g620["make-id"]
  local _42 = _g620["*"]
  local empty63 = _g620["empty?"]
  local last = _g620.last
  local find = _g620.find
  local parse_number = _g620["parse-number"]
  local number63 = _g620["number?"]
  local extend = _g620.extend
  local write_file = _g620["write-file"]
  local char = _g620.char
  local split = _g620.split
  local boolean63 = _g620["boolean?"]
  local read_file = _g620["read-file"]
  local _47 = _g620["/"]
  local list63 = _g620["list?"]
  local length = _g620.length
  local write = _g620.write
  local _g621 = nexus.utilities
  local reserved63 = _g621["reserved?"]
  local quote_environment = _g621["quote-environment"]
  local toplevel63 = _g621["toplevel?"]
  local to_id = _g621["to-id"]
  local bind42 = _g621["bind*"]
  local symbol63 = _g621["symbol?"]
  local imported = _g621.imported
  local stash42 = _g621["stash*"]
  local indentation = _g621.indentation
  local mapo = _g621.mapo
  local macroexpand = _g621.macroexpand
  local special_form63 = _g621["special-form?"]
  local special63 = _g621["special?"]
  local valid_id63 = _g621["valid-id?"]
  local variable63 = _g621["variable?"]
  local symbol_expansion = _g621["symbol-expansion"]
  local bound63 = _g621["bound?"]
  local quoted = _g621.quoted
  local quasiexpand = _g621.quasiexpand
  local macro63 = _g621["macro?"]
  local quote_modules = _g621["quote-modules"]
  local exported = _g621.exported
  local initial_environment = _g621["initial-environment"]
  local macro_function = _g621["macro-function"]
  local getenv = _g621.getenv
  local bind = _g621.bind
  local _g624 = nexus.compiler
  local open_module = _g624["open-module"]
  local compile_call = _g624["compile-call"]
  local eval = _g624.eval
  local load_module = _g624["load-module"]
  local compile_special = _g624["compile-special"]
  local compile_function = _g624["compile-function"]
  local in_module = _g624["in-module"]
  local compile = _g624.compile
  local compile_body = _g624["compile-body"]
  local compile_module = _g624["compile-module"]
  modules = {special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%global-function"] = {special = function (_g637)
    local name = _g637[1]
    local args = _g637[2]
    local body = sub(_g637, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, export = true, stmt = true, tr = true}, ["do"] = {special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, export = true, stmt = true, tr = true}, ["break"] = {special = function (_g131)
    return((indentation() .. "break"))
  end, export = true, stmt = true}, ["while"] = {special = function (_g638)
    local condition = _g638[1]
    local body = sub(_g638, 1)
    local _g639 = compile(condition)
    local _g640 = (function ()
      indent_level = (indent_level + 1)
      local _g641 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g641)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g639 .. ") {\n" .. _g640 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g639 .. " do\n" .. _g640 .. ind .. "end\n"))
    end
  end, export = true, stmt = true, tr = true}, ["%if"] = {special = function (_g642, tail63)
    local x = _g642[1]
    local _g643 = _g642[2]
    local _g644 = _g642[3]
    local _g645 = compile(x)
    local _g646 = (function ()
      indent_level = (indent_level + 1)
      local _g648 = compile(_g643, {_stash = true, stmt = true, tail = tail63})
      indent_level = (indent_level - 1)
      return(_g648)
    end)()
    local _g647 = (function ()
      if _g644 then
        indent_level = (indent_level + 1)
        local _g649 = compile(_g644, {_stash = true, stmt = true, tail = tail63})
        indent_level = (indent_level - 1)
        return(_g649)
      end
    end)()
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g645 .. ") {\n" .. _g646 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g645 .. " then\n" .. _g646)
    end
    if (_g647 and (target == "js")) then
      str = (str .. " else {\n" .. _g647 .. ind .. "}")
    else
      if _g647 then
        str = (str .. ind .. "else\n" .. _g647)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end, export = true, stmt = true, tr = true}, ["return"] = {special = function (_g650)
    local x = _g650[1]
    local _g651 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g651))
  end, export = true, stmt = true}, ["not"] = {special = function (_g652)
    local x = _g652[1]
    local _g653 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g653 .. ")"))
  end, export = true}, ["get"] = {special = function (_g654)
    local t = _g654[1]
    local k = _g654[2]
    local _g655 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g655, 0) == "{")) then
      _g655 = ("(" .. _g655 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g655 .. "." .. inner(k)))
    else
      return((_g655 .. "[" .. k1 .. "]"))
    end
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
    local _g656 = pairs
    local i = 0
    while (i < length(_g656)) do
      local _g657 = _g656[(i + 1)]
      local k = _g657[1]
      local v = _g657[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g658 = compile(v)
      local _g659 = (function ()
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
      str = (str .. _g659 .. sep .. _g658)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true}, ["%array"] = {special = function (forms)
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
    local _g660 = forms
    local i = 0
    while (i < length(_g660)) do
      local x = _g660[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true}, ["%function"] = {special = function (_g661)
    local args = _g661[1]
    local body = sub(_g661, 1)
    return(compile_function(args, body))
  end, export = true}, ["set"] = {special = function (_g662)
    local lh = _g662[1]
    local rh = _g662[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true, stmt = true}, ["%local"] = {special = function (_g663)
    local name = _g663[1]
    local value = _g663[2]
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
  end, export = true, stmt = true}, ["error"] = {special = function (_g664)
    local x = _g664[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile(join({"Error", x}))))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true, stmt = true}, ["%local-function"] = {special = function (_g665)
    local name = _g665[1]
    local args = _g665[2]
    local body = sub(_g665, 2)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return((indentation() .. x))
  end, export = true, stmt = true, tr = true}, ["%for"] = {special = function (_g666)
    local _g667 = _g666[1]
    local t = _g667[1]
    local k = _g667[2]
    local body = sub(_g666, 1)
    local _g668 = compile(t)
    local ind = indentation()
    local _g669 = (function ()
      indent_level = (indent_level + 1)
      local _g670 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g670)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g668 .. " do\n" .. _g669 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g668 .. ") {\n" .. _g669 .. ind .. "}\n"))
    end
  end, export = true, stmt = true, tr = true}, ["%try"] = {special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g671 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g671)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, join({"get", e, "\"message\""})})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g672 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g672)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, export = true, stmt = true, tr = true}}}, optimizer = {import = {"runtime", "special", "core"}, export = {["define-optimization"] = {}, optimizations = {variable = true}, optimize = {variable = true, export = true}}}, lib = {import = {"core", "special"}, export = {}}, utilities = {import = {"runtime", "special", "core"}, export = {["reserved?"] = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, ["to-id"] = {variable = true, export = true}, ["global?"] = {variable = true}, ["bind*"] = {variable = true, export = true}, ["symbol?"] = {variable = true, export = true}, imported = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, export = true}, indentation = {variable = true, export = true}, mapo = {variable = true, export = true}, ["numeric?"] = {variable = true}, macroexpand = {variable = true, export = true}, reserved = {variable = true}, ["special-form?"] = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, ["quote-binding"] = {variable = true}, ["bound?"] = {variable = true, export = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, escape = {variable = true}, ["valid-char?"] = {variable = true}, ["indent-level"] = {global = true, export = true}, quoted = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, quasiexpand = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, exported = {variable = true, export = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quoting?"] = {variable = true}, ["initial-environment"] = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, getenv = {variable = true, export = true}, bind = {variable = true, export = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["open-module"] = {variable = true, export = true}, ["can-return?"] = {variable = true}, ["compile-call"] = {variable = true, export = true}, eval = {variable = true, export = true}, infix = {variable = true}, ["load-module"] = {variable = true, export = true}, ["compile-file"] = {variable = true}, ["%result"] = {global = true, export = true}, ["compile-special"] = {variable = true, export = true}, ["%compile-module"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["in-module"] = {variable = true, export = true}, getop = {variable = true}, ["current-module"] = {global = true, export = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, run = {variable = true}, encapsulate = {variable = true}, compile = {variable = true, export = true}, ["compile-body"] = {variable = true, export = true}, prologue = {variable = true}, ["compile-infix"] = {variable = true}, ["module-path"] = {variable = true}, lower = {variable = true}, ["compile-atom"] = {variable = true}, ["infix?"] = {variable = true}, terminator = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["compile-args"] = {variable = true}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}, reader = {import = {"runtime", "special", "core"}, export = {["skip-non-code"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}, ["read-table"] = {variable = true, export = true}, ["read-from-string"] = {variable = true, export = true}, ["define-reader"] = {macro = function (_g673, ...)
    local char = _g673[1]
    local stream = _g673[2]
    local body = unstash({...})
    local _g674 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g674)}))
  end, export = true}, whitespace = {variable = true}, read = {variable = true, export = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, delimiters = {variable = true}, ["key?"] = {variable = true}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g675 = sub(specs, 0)
    map(compile_module, _g675)
    return(nil)
  end}}}, runtime = {import = {"special", "core"}, export = {map = {variable = true, export = true}, [">"] = {variable = true, export = true}, exit = {variable = true, export = true}, drop = {variable = true, export = true}, ["splice?"] = {variable = true}, cat = {variable = true, export = true}, sub = {variable = true, export = true}, ["="] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, pairwise = {variable = true, export = true}, code = {variable = true, export = true}, inner = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, hd = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, substring = {variable = true, export = true}, keep = {variable = true, export = true}, tl = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, replicate = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, iterate = {variable = true, export = true}, exclude = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, splice = {variable = true, export = true}, search = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, stash = {variable = true, export = true}, apply = {variable = true, export = true}, join = {variable = true, export = true}, sublist = {variable = true, export = true}, reverse = {variable = true, export = true}, reduce = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, add = {variable = true, export = true}, ["to-string"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["id-count"] = {variable = true}, unstash = {variable = true, export = true}, mapl = {variable = true}, setenv = {variable = true, export = true}, module = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, last = {variable = true, export = true}, find = {variable = true, export = true}, ["parse-number"] = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, extend = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, char = {variable = true, export = true}, split = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, length = {variable = true, export = true}, write = {variable = true, export = true}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = join({"+", i, 1})
      end
    end
    return(join({"get", l, i}))
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g676 = body
      local k = nil
      for k in next, _g676 do
        if (not number63(k)) then
          local v = _g676[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g677 = sub(body, 0)
    add(environment, {})
    local _g678 = (function ()
      map(function (_g679)
        local name = _g679[1]
        local exp = _g679[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g677)))
    end)()
    drop(environment)
    return(_g678)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g680)
      local a = _g680[1]
      local b = _g680[2]
      local c = sub(_g680, 2)
      if is63(b) then
        return(join({join({"%if", a, b}, step(c))}))
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
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
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g683 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g683)}))
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g684 = sub(body, 0)
    local _g685 = bind42(args, _g684)
    local _g686 = _g685[1]
    local _g687 = _g685[2]
    return(join({"%function", _g686}, _g687))
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g688 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g688)}))
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g689 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g689)) then
      local _g690 = bind42(x, _g689)
      local args = _g690[1]
      local _g691 = _g690[2]
      return(join({"%local-function", name, args}, _g691))
    else
      return(join({"%local", name, x}))
    end
  end, export = true}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g692 = sub(body, 0)
    add(environment, {})
    local _g693 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g692)))
    end)()
    drop(environment)
    return(_g693)
  end, export = true}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g694 = sub(body, 0)
    local imports = {}
    local imp = _g694.import
    local exp = _g694.export
    local _g695 = (imp or {})
    local _g696 = 0
    while (_g696 < length(_g695)) do
      local k = _g695[(_g696 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g696 = (_g696 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g697 = (exp or {})
    local _g698 = 0
    while (_g698 < length(_g697)) do
      local k = _g697[(_g698 + 1)]
      setenv(k, {_stash = true, export = true})
      _g698 = (_g698 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    local form = join({"fn", args}, _g699)
    eval(join((function ()
      local _g700 = {"setenv", join({"quote", name})}
      _g700.macro = form
      _g700.form = join({"quote", form})
      return(_g700)
    end)()))
    return(nil)
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g701 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g702 = {"table"}
      _g702._scope = scope
      return(_g702)
    end)())}), join({"let", join({x, join({"do"}, _g701)}), join({"drop", "environment"}), x})}))
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g703 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g703)) then
      local _g704 = bind42(x, _g703)
      local args = _g704[1]
      local _g705 = _g704[2]
      return(join({"%global-function", name, args}, _g705))
    else
      if (target == "js") then
        return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
      else
        return(join({"set", name, x}))
      end
    end
  end, export = true}, language = {macro = function ()
    return(join({"quote", target}))
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g330, x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g706 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g707)
      local lh = _g707[1]
      local rh = _g707[2]
      local _g708 = bind(lh, rh)
      local _g709 = 0
      while (_g709 < length(_g708)) do
        local _g710 = _g708[(_g709 + 1)]
        local id = _g710[1]
        local val = _g710[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g709 = (_g709 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g706)})))
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g711 = xs
      local i = 0
      while (i < length(_g711)) do
        local x = _g711[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    local form = join({"fn", args}, _g712)
    local keys = sub(_g712, length(_g712))
    eval(join((function ()
      local _g713 = {"setenv", join({"quote", name})}
      _g713.special = form
      _g713.form = join({"quote", form})
      return(_g713)
    end)(), keys))
    return(nil)
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g714 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g714)}))
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g715 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g715), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", join({t1, k}), join({"if", join((function ()
          local _g716 = {"target"}
          _g716.lua = join({"not", join({"number?", k})})
          _g716.js = join({"isNaN", join({"parseInt", k})})
          return(_g716)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g715)})})}))
      end
    end)()}))
  end, export = true}, ["with-bindings"] = {macro = function (_g717, ...)
    local names = _g717[1]
    local body = unstash({...})
    local _g718 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g719 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g720 = {"setenv", x}
        _g720.variable = true
        return(_g720)
      end)())})}
      _g719.scope = true
      return(_g719)
    end)(), _g718))
  end, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g721 = sub(body, 0)
    local imports = {}
    local imp = _g721.import
    local exp = _g721.export
    local _g722 = (imp or {})
    local _g723 = 0
    while (_g723 < length(_g722)) do
      local k = _g722[(_g723 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g723 = (_g723 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g724 = (exp or {})
    local _g725 = 0
    while (_g725 < length(_g724)) do
      local k = _g724[(_g725 + 1)]
      setenv(k, {_stash = true, export = true})
      _g725 = (_g725 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local is63 = _g2["is?"]
  local _62 = _g2[">"]
  local exit = _g2.exit
  local drop = _g2.drop
  local cat = _g2.cat
  local sub = _g2.sub
  local _61 = _g2["="]
  local _60 = _g2["<"]
  local string63 = _g2["string?"]
  local last = _g2.last
  local pairwise = _g2.pairwise
  local code = _g2.code
  local inner = _g2.inner
  local keys63 = _g2["keys?"]
  local hd = _g2.hd
  local _37 = _g2["%"]
  local some63 = _g2["some?"]
  local atom63 = _g2["atom?"]
  local composite63 = _g2["composite?"]
  local substring = _g2.substring
  local _37message_handler = _g2["%message-handler"]
  local tl = _g2.tl
  local _6261 = _g2[">="]
  local _6061 = _g2["<="]
  local replicate = _g2.replicate
  local _ = _g2["-"]
  local _43 = _g2["+"]
  local iterate = _g2.iterate
  local exclude = _g2.exclude
  local toplevel63 = _g2["toplevel?"]
  local splice = _g2.splice
  local search = _g2.search
  local function63 = _g2["function?"]
  local stash = _g2.stash
  local apply = _g2.apply
  local join = _g2.join
  local sublist = _g2.sublist
  local reverse = _g2.reverse
  local reduce = _g2.reduce
  local id_literal63 = _g2["id-literal?"]
  local add = _g2.add
  local to_string = _g2["to-string"]
  local table63 = _g2["table?"]
  local string_literal63 = _g2["string-literal?"]
  local number63 = _g2["number?"]
  local unstash = _g2.unstash
  local nil63 = _g2["nil?"]
  local _42 = _g2["*"]
  local module = _g2.module
  local make_id = _g2["make-id"]
  local map = _g2.map
  local module_key = _g2["module-key"]
  local parse_number = _g2["parse-number"]
  local keep = _g2.keep
  local find = _g2.find
  local write_file = _g2["write-file"]
  local empty63 = _g2["empty?"]
  local extend = _g2.extend
  local setenv = _g2.setenv
  local char = _g2.char
  local split = _g2.split
  local boolean63 = _g2["boolean?"]
  local _47 = _g2["/"]
  local list63 = _g2["list?"]
  local read_file = _g2["read-file"]
  local length = _g2.length
  local write = _g2.write
  local _g5 = nexus.reader
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read_from_string = _g5["read-from-string"]
  local read = _g5.read
  local _g6 = nexus.compiler
  local open_module = _g6["open-module"]
  local compile_call = _g6["compile-call"]
  local eval = _g6.eval
  local load_module = _g6["load-module"]
  local compile_special = _g6["compile-special"]
  local compile_function = _g6["compile-function"]
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local compile = _g6.compile
  local compile_body = _g6["compile-body"]
  local function rep(str)
    local _g727 = (function ()
      local _g728,_g729 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g728, _g729})
    end)()
    local _g1 = _g727[1]
    local x = _g727[2]
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
    local _g730 = args
    local i = 0
    while (i < length(_g730)) do
      local arg = _g730[(i + 1)]
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
  local _g731 = {}
  nexus.main = _g731
  _g731.usage = usage
  _g731.repl = repl
  _g731.main = main
  _g731.rep = rep
end)();
