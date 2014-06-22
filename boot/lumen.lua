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
  _g53.splice = splice
  _g53["boolean?"] = boolean63
  _g53.reverse = reverse
  _g53["is?"] = is63
  _g53.find = find
  _g53.apply = apply
  _g53["make-id"] = make_id
  _g53["write-file"] = write_file
  _g53.char = char
  _g53["id-literal?"] = id_literal63
  _g53.sub = sub
  _g53["composite?"] = composite63
  _g53["string?"] = string63
  _g53["splice?"] = splice63
  _g53["parse-number"] = parse_number
  _g53["some?"] = some63
  _g53.replicate = replicate
  _g53.search = search
  _g53.iterate = iterate
  _g53.add = add
  _g53.last = last
  _g53["function?"] = function63
  _g53.reduce = reduce
  _g53.unstash = unstash
  _g53.setenv = setenv
  _g53["number?"] = number63
  _g53.length = length
  _g53.keep = keep
  _g53["/"] = _47
  _g53["-"] = _
  _g53["+"] = _43
  _g53["*"] = _42
  _g53.exit = exit
  _g53["%"] = _37
  _g53["table?"] = table63
  _g53["<="] = _6061
  _g53.extend = extend
  _g53[">="] = _6261
  _g53["list?"] = list63
  _g53["read-file"] = read_file
  _g53.exclude = exclude
  _g53.hd = hd
  _g53["id-count"] = id_count
  _g53["keys?"] = keys63
  _g53.mapl = mapl
  _g53.join = join
  _g53.module = module
  _g53["module-key"] = module_key
  _g53["atom?"] = atom63
  _g53["toplevel?"] = toplevel63
  _g53.drop = drop
  _g53.pairwise = pairwise
  _g53["%message-handler"] = _37message_handler
  _g53["to-string"] = to_string
  _g53.tl = tl
  _g53.write = write
  _g53["="] = _61
  _g53["string-literal?"] = string_literal63
  _g53.cat = cat
  _g53["none?"] = none63
  _g53[">"] = _62
  _g53.map = map
  _g53["nil?"] = nil63
  _g53.split = split
  _g53.sublist = sublist
  _g53.code = code
  _g53["<"] = _60
  _g53.inner = inner
  _g53.stash = stash
  _g53.substring = substring
end)();
(function ()
  local _g57 = nexus.runtime
  local splice = _g57.splice
  local boolean63 = _g57["boolean?"]
  local reverse = _g57.reverse
  local is63 = _g57["is?"]
  local find = _g57.find
  local apply = _g57.apply
  local make_id = _g57["make-id"]
  local write_file = _g57["write-file"]
  local char = _g57.char
  local id_literal63 = _g57["id-literal?"]
  local sub = _g57.sub
  local composite63 = _g57["composite?"]
  local string63 = _g57["string?"]
  local parse_number = _g57["parse-number"]
  local some63 = _g57["some?"]
  local replicate = _g57.replicate
  local search = _g57.search
  local iterate = _g57.iterate
  local add = _g57.add
  local last = _g57.last
  local function63 = _g57["function?"]
  local reduce = _g57.reduce
  local unstash = _g57.unstash
  local setenv = _g57.setenv
  local number63 = _g57["number?"]
  local length = _g57.length
  local keep = _g57.keep
  local _47 = _g57["/"]
  local _ = _g57["-"]
  local _43 = _g57["+"]
  local _42 = _g57["*"]
  local exit = _g57.exit
  local _37 = _g57["%"]
  local table63 = _g57["table?"]
  local _6061 = _g57["<="]
  local extend = _g57.extend
  local _6261 = _g57[">="]
  local list63 = _g57["list?"]
  local read_file = _g57["read-file"]
  local exclude = _g57.exclude
  local hd = _g57.hd
  local keys63 = _g57["keys?"]
  local join = _g57.join
  local module = _g57.module
  local module_key = _g57["module-key"]
  local atom63 = _g57["atom?"]
  local toplevel63 = _g57["toplevel?"]
  local drop = _g57.drop
  local pairwise = _g57.pairwise
  local _37message_handler = _g57["%message-handler"]
  local to_string = _g57["to-string"]
  local tl = _g57.tl
  local write = _g57.write
  local _61 = _g57["="]
  local string_literal63 = _g57["string-literal?"]
  local cat = _g57.cat
  local none63 = _g57["none?"]
  local _62 = _g57[">"]
  local map = _g57.map
  local nil63 = _g57["nil?"]
  local split = _g57.split
  local sublist = _g57.sublist
  local code = _g57.code
  local _60 = _g57["<"]
  local inner = _g57.inner
  local stash = _g57.stash
  local substring = _g57.substring
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g60 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g61 = keys63(_g60)
        if _g61 then
          return(b[_g61])
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
      local _g62 = args
      local k = nil
      for k in next, _g62 do
        if (not number63(k)) then
          local v = _g62[k]
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
        local _g63 = lh
        local i = 0
        while (i < length(_g63)) do
          local x = _g63[(i + 1)]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = (i + 1)
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g64 = lh
        local k = nil
        for k in next, _g64 do
          if (not number63(k)) then
            local v = _g64[k]
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
      local _g65 = args
      local _g66 = 0
      while (_g66 < length(_g65)) do
        local arg = _g65[(_g66 + 1)]
        if atom63(arg) then
          add(args1, arg)
        else
          if (list63(arg) or keys63(arg)) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g66 = (_g66 + 1)
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
          local _g54 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g68 = (function ()
            local _g69 = args
            local _g70 = 0
            while (_g70 < length(_g69)) do
              local _g67 = _g69[(_g70 + 1)]
              setenv(_g67, {_stash = true, variable = true})
              _g70 = (_g70 + 1)
            end
            return(join({"%function", map(macroexpand, args)}, macroexpand(body)))
          end)()
          drop(environment)
          return(_g68)
        else
          if ((x == "%local-function") or (x == "%global-function")) then
            local _g55 = form[1]
            local name = form[2]
            local _g71 = form[3]
            local _g72 = sub(form, 3)
            add(environment, {_scope = true})
            local _g74 = (function ()
              local _g75 = _g71
              local _g76 = 0
              while (_g76 < length(_g75)) do
                local _g73 = _g75[(_g76 + 1)]
                setenv(_g73, {_stash = true, variable = true})
                _g76 = (_g76 + 1)
              end
              return(join({x, name, map(macroexpand, _g71)}, macroexpand(_g72)))
            end)()
            drop(environment)
            return(_g74)
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
    local _g77 = form
    local k = nil
    for k in next, _g77 do
      if (not number63(k)) then
        local v = _g77[k]
        local _g78 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g78
      end
    end
    local _g79 = form
    local _g80 = 0
    while (_g80 < length(_g79)) do
      local x = _g79[(_g80 + 1)]
      if quasisplice63(x, depth) then
        local _g81 = quasiexpand(x[2])
        add(xs, _g81)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g80 = (_g80 + 1)
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
  local reserved = {["nil"] = true, ["end"] = true, ["break"] = true, ["and"] = true, ["with"] = true, ["this"] = true, ["or"] = true, ["*"] = true, ["try"] = true, ["if"] = true, ["then"] = true, [">="] = true, ["<="] = true, ["while"] = true, ["else"] = true, ["local"] = true, ["return"] = true, [">"] = true, ["new"] = true, ["<"] = true, ["var"] = true, ["true"] = true, ["repeat"] = true, ["false"] = true, ["delete"] = true, ["continue"] = true, ["elseif"] = true, ["/"] = true, ["not"] = true, ["void"] = true, ["function"] = true, ["case"] = true, ["+"] = true, ["typeof"] = true, ["-"] = true, ["finally"] = true, ["throw"] = true, ["=="] = true, ["switch"] = true, ["do"] = true, ["%"] = true, ["debugger"] = true, ["catch"] = true, ["instanceof"] = true, ["in"] = true, ["="] = true, ["until"] = true, ["for"] = true, ["default"] = true}
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
    local _g86 = module(current_module).export
    local n = nil
    for n in next, _g86 do
      if (not number63(n)) then
        local b = _g86[n]
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
    local _g87 = unstash({...})
    local all = _g87.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g88 = module(spec).export
      local n = nil
      for n in next, _g88 do
        if (not number63(n)) then
          local b = _g88[n]
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
    local _g89 = t
    local k = nil
    for k in next, _g89 do
      if (not number63(k)) then
        local v = _g89[k]
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
    return(join({"%object"}, mapo(function (_g56, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    local _g90 = {"table"}
    _g90.import = quoted(m.import)
    _g90.export = quote_frame(m.export)
    return(_g90)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g91 = {}
  nexus.utilities = _g91
  _g91["numeric?"] = numeric63
  _g91["toplevel?"] = toplevel63
  _g91["reserved?"] = reserved63
  _g91["special?"] = special63
  _g91.quoted = quoted
  _g91["initial-environment"] = initial_environment
  _g91["quote-environment"] = quote_environment
  _g91["to-id"] = to_id
  _g91.macroexpand = macroexpand
  _g91.bind = bind
  _g91["special-form?"] = special_form63
  _g91["variable?"] = variable63
  _g91["quote-modules"] = quote_modules
  _g91["macro?"] = macro63
  _g91["can-unquote?"] = can_unquote63
  _g91["symbol-expansion"] = symbol_expansion
  _g91["macro-function"] = macro_function
  _g91["quote-binding"] = quote_binding
  _g91["quasiquote-list"] = quasiquote_list
  _g91["quoting?"] = quoting63
  _g91["valid-char?"] = valid_char63
  _g91["bind*"] = bind42
  _g91["bound?"] = bound63
  _g91["quote-frame"] = quote_frame
  _g91.indentation = indentation
  _g91["quote-module"] = quote_module
  _g91.reserved = reserved
  _g91["symbol?"] = symbol63
  _g91.imported = imported
  _g91.quasiexpand = quasiexpand
  _g91["stash*"] = stash42
  _g91.escape = escape
  _g91["valid-id?"] = valid_id63
  _g91.mapo = mapo
  _g91.exported = exported
  _g91["global?"] = global63
  _g91.getenv = getenv
  _g91["quasiquoting?"] = quasiquoting63
  _g91["quasisplice?"] = quasisplice63
end)();
(function ()
  local _g92 = nexus.runtime
  local splice = _g92.splice
  local boolean63 = _g92["boolean?"]
  local reverse = _g92.reverse
  local is63 = _g92["is?"]
  local find = _g92.find
  local apply = _g92.apply
  local make_id = _g92["make-id"]
  local write_file = _g92["write-file"]
  local char = _g92.char
  local id_literal63 = _g92["id-literal?"]
  local sub = _g92.sub
  local composite63 = _g92["composite?"]
  local string63 = _g92["string?"]
  local parse_number = _g92["parse-number"]
  local some63 = _g92["some?"]
  local replicate = _g92.replicate
  local search = _g92.search
  local iterate = _g92.iterate
  local add = _g92.add
  local last = _g92.last
  local function63 = _g92["function?"]
  local reduce = _g92.reduce
  local unstash = _g92.unstash
  local setenv = _g92.setenv
  local number63 = _g92["number?"]
  local length = _g92.length
  local keep = _g92.keep
  local _47 = _g92["/"]
  local _ = _g92["-"]
  local _43 = _g92["+"]
  local _42 = _g92["*"]
  local exit = _g92.exit
  local _37 = _g92["%"]
  local table63 = _g92["table?"]
  local _6061 = _g92["<="]
  local extend = _g92.extend
  local _6261 = _g92[">="]
  local list63 = _g92["list?"]
  local read_file = _g92["read-file"]
  local exclude = _g92.exclude
  local hd = _g92.hd
  local keys63 = _g92["keys?"]
  local join = _g92.join
  local module = _g92.module
  local module_key = _g92["module-key"]
  local atom63 = _g92["atom?"]
  local toplevel63 = _g92["toplevel?"]
  local drop = _g92.drop
  local pairwise = _g92.pairwise
  local _37message_handler = _g92["%message-handler"]
  local to_string = _g92["to-string"]
  local tl = _g92.tl
  local write = _g92.write
  local _61 = _g92["="]
  local string_literal63 = _g92["string-literal?"]
  local cat = _g92.cat
  local none63 = _g92["none?"]
  local _62 = _g92[">"]
  local map = _g92.map
  local nil63 = _g92["nil?"]
  local split = _g92.split
  local sublist = _g92.sublist
  local code = _g92.code
  local _60 = _g92["<"]
  local inner = _g92.inner
  local stash = _g92.stash
  local substring = _g92.substring
  local delimiters = {[";"] = true, ["("] = true, [")"] = true, ["\n"] = true}
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
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
  local _g103 = {}
  nexus.reader = _g103
  _g103["read-from-string"] = read_from_string
  _g103["key?"] = key63
  _g103["flag?"] = flag63
  _g103["make-stream"] = make_stream
  _g103["read-table"] = read_table
  _g103["peek-char"] = peek_char
  _g103["skip-non-code"] = skip_non_code
  _g103.delimiters = delimiters
  _g103.eof = eof
  _g103["read-char"] = read_char
  _g103.read = read
  _g103["read-all"] = read_all
  _g103.whitespace = whitespace
end)();
(function ()
  local _g104 = nexus.runtime
  local splice = _g104.splice
  local boolean63 = _g104["boolean?"]
  local reverse = _g104.reverse
  local is63 = _g104["is?"]
  local find = _g104.find
  local apply = _g104.apply
  local make_id = _g104["make-id"]
  local write_file = _g104["write-file"]
  local char = _g104.char
  local id_literal63 = _g104["id-literal?"]
  local sub = _g104.sub
  local composite63 = _g104["composite?"]
  local string63 = _g104["string?"]
  local parse_number = _g104["parse-number"]
  local some63 = _g104["some?"]
  local replicate = _g104.replicate
  local search = _g104.search
  local iterate = _g104.iterate
  local add = _g104.add
  local last = _g104.last
  local function63 = _g104["function?"]
  local reduce = _g104.reduce
  local unstash = _g104.unstash
  local setenv = _g104.setenv
  local number63 = _g104["number?"]
  local length = _g104.length
  local keep = _g104.keep
  local _47 = _g104["/"]
  local _ = _g104["-"]
  local _43 = _g104["+"]
  local _42 = _g104["*"]
  local exit = _g104.exit
  local _37 = _g104["%"]
  local table63 = _g104["table?"]
  local _6061 = _g104["<="]
  local extend = _g104.extend
  local _6261 = _g104[">="]
  local list63 = _g104["list?"]
  local read_file = _g104["read-file"]
  local exclude = _g104.exclude
  local hd = _g104.hd
  local keys63 = _g104["keys?"]
  local join = _g104.join
  local module = _g104.module
  local module_key = _g104["module-key"]
  local atom63 = _g104["atom?"]
  local toplevel63 = _g104["toplevel?"]
  local drop = _g104.drop
  local pairwise = _g104.pairwise
  local _37message_handler = _g104["%message-handler"]
  local to_string = _g104["to-string"]
  local tl = _g104.tl
  local write = _g104.write
  local _61 = _g104["="]
  local string_literal63 = _g104["string-literal?"]
  local cat = _g104.cat
  local none63 = _g104["none?"]
  local _62 = _g104[">"]
  local map = _g104.map
  local nil63 = _g104["nil?"]
  local split = _g104.split
  local sublist = _g104.sublist
  local code = _g104.code
  local _60 = _g104["<"]
  local inner = _g104.inner
  local stash = _g104.stash
  local substring = _g104.substring
  local _g105 = nexus.utilities
  local toplevel63 = _g105["toplevel?"]
  local reserved63 = _g105["reserved?"]
  local special63 = _g105["special?"]
  local quoted = _g105.quoted
  local initial_environment = _g105["initial-environment"]
  local quote_environment = _g105["quote-environment"]
  local to_id = _g105["to-id"]
  local macroexpand = _g105.macroexpand
  local bind = _g105.bind
  local special_form63 = _g105["special-form?"]
  local variable63 = _g105["variable?"]
  local quote_modules = _g105["quote-modules"]
  local macro63 = _g105["macro?"]
  local symbol_expansion = _g105["symbol-expansion"]
  local macro_function = _g105["macro-function"]
  local bind42 = _g105["bind*"]
  local bound63 = _g105["bound?"]
  local indentation = _g105.indentation
  local symbol63 = _g105["symbol?"]
  local imported = _g105.imported
  local quasiexpand = _g105.quasiexpand
  local stash42 = _g105["stash*"]
  local valid_id63 = _g105["valid-id?"]
  local mapo = _g105.mapo
  local exported = _g105.exported
  local getenv = _g105.getenv
  local _g108 = nexus.reader
  local read_from_string = _g108["read-from-string"]
  local make_stream = _g108["make-stream"]
  local read_table = _g108["read-table"]
  local read = _g108.read
  local read_all = _g108["read-all"]
  local infix = {common = {["%"] = true, ["<="] = true, ["/"] = true, [">"] = true, ["-"] = true, ["<"] = true, ["+"] = true, ["*"] = true, [">="] = true}, js = {["="] = "===", ["~="] = "!=", ["or"] = "||", ["and"] = "&&", cat = "+"}, lua = {["="] = "==", ["~="] = true, ["or"] = true, ["and"] = true, cat = ".."}}
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
    local _g109 = args
    local i = 0
    while (i < length(_g109)) do
      local arg = _g109[(i + 1)]
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
    local _g110 = unstash({...})
    local tail = _g110.tail
    local str = ""
    local _g111 = forms
    local i = 0
    while (i < length(_g111)) do
      local x = _g111[(i + 1)]
      local t63 = (tail and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, tail = t63, stmt = true}))
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
    local _g112 = getenv(hd(form))
    local self_tr63 = _g112.tr
    local stmt = _g112.stmt
    local special = _g112.special
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
  local function compile_infix(_g113)
    local op = _g113[1]
    local args = sub(_g113, 1)
    local str = "("
    local _g114 = getop(op)
    local _g115 = args
    local i = 0
    while (i < length(_g115)) do
      local arg = _g115[(i + 1)]
      if ((_g114 == "-") and (length(args) == 1)) then
        str = (str .. _g114 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g114 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_function(args, body, ...)
    local _g116 = unstash({...})
    local name = _g116.name
    local prefix = _g116.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g117 = (prefix or "")
    local _g118 = compile_args(args)
    local _g119 = (function ()
      indent_level = (indent_level + 1)
      local _g120 = compile_body(body, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g120)
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
      return(("function " .. id .. _g118 .. " {\n" .. _g119 .. ind .. "}" .. tr))
    else
      return((_g117 .. "function " .. id .. _g118 .. "\n" .. _g119 .. ind .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  compile = function (form, ...)
    local _g121 = unstash({...})
    local tail = _g121.tail
    local stmt = _g121.stmt
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
        local _g122 = (function ()
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
        return((ind .. _g122 .. tr))
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
    local _g123 = map(lower, body)
    local epilog = map(lower, exported())
    return({join({"%function", {}}, join(_g123, epilog))})
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
    local _g124 = unstash({...})
    local all = _g124.all
    local m = module(spec)
    local frame = last(environment)
    local _g125 = m.export
    local k = nil
    for k in next, _g125 do
      if (not number63(k)) then
        local v = _g125[k]
        if (v.export or all) then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g126 = unstash({...})
    local all = _g126.all
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
    local _g127 = lower(join({"do"}, join(prologue(), {form})))
    local compiled = compile(_g127)
    target = previous
    return(run(compiled))
  end
  local _g128 = {}
  nexus.compiler = _g128
  _g128["compile-atom"] = compile_atom
  _g128["compile-file"] = compile_file
  _g128.run = run
  _g128["%compile-module"] = _37compile_module
  _g128.terminator = terminator
  _g128.lower = lower
  _g128["compile-special"] = compile_special
  _g128.compile = compile
  _g128["compile-infix"] = compile_infix
  _g128["compiling?"] = compiling63
  _g128.prologue = prologue
  _g128["open-module"] = open_module
  _g128["compiler-output"] = compiler_output
  _g128["compile-module"] = compile_module
  _g128["in-module"] = in_module
  _g128["compile-function"] = compile_function
  _g128.encapsulate = encapsulate
  _g128.getop = getop
  _g128["compile-call"] = compile_call
  _g128.eval = eval
  _g128["can-return?"] = can_return63
  _g128["compile-args"] = compile_args
  _g128["compile-body"] = compile_body
  _g128["infix?"] = infix63
  _g128["load-module"] = load_module
  _g128.infix = infix
  _g128["module-path"] = module_path
end)();
(function ()
  local _g130 = nexus.runtime
  local splice = _g130.splice
  local boolean63 = _g130["boolean?"]
  local reverse = _g130.reverse
  local is63 = _g130["is?"]
  local find = _g130.find
  local apply = _g130.apply
  local make_id = _g130["make-id"]
  local write_file = _g130["write-file"]
  local char = _g130.char
  local id_literal63 = _g130["id-literal?"]
  local sub = _g130.sub
  local composite63 = _g130["composite?"]
  local string63 = _g130["string?"]
  local parse_number = _g130["parse-number"]
  local some63 = _g130["some?"]
  local replicate = _g130.replicate
  local search = _g130.search
  local iterate = _g130.iterate
  local add = _g130.add
  local last = _g130.last
  local function63 = _g130["function?"]
  local reduce = _g130.reduce
  local unstash = _g130.unstash
  local setenv = _g130.setenv
  local number63 = _g130["number?"]
  local length = _g130.length
  local keep = _g130.keep
  local _47 = _g130["/"]
  local _ = _g130["-"]
  local _43 = _g130["+"]
  local _42 = _g130["*"]
  local exit = _g130.exit
  local _37 = _g130["%"]
  local table63 = _g130["table?"]
  local _6061 = _g130["<="]
  local extend = _g130.extend
  local _6261 = _g130[">="]
  local list63 = _g130["list?"]
  local read_file = _g130["read-file"]
  local exclude = _g130.exclude
  local hd = _g130.hd
  local keys63 = _g130["keys?"]
  local join = _g130.join
  local module = _g130.module
  local module_key = _g130["module-key"]
  local atom63 = _g130["atom?"]
  local toplevel63 = _g130["toplevel?"]
  local drop = _g130.drop
  local pairwise = _g130.pairwise
  local _37message_handler = _g130["%message-handler"]
  local to_string = _g130["to-string"]
  local tl = _g130.tl
  local write = _g130.write
  local _61 = _g130["="]
  local string_literal63 = _g130["string-literal?"]
  local cat = _g130.cat
  local none63 = _g130["none?"]
  local _62 = _g130[">"]
  local map = _g130.map
  local nil63 = _g130["nil?"]
  local split = _g130.split
  local sublist = _g130.sublist
  local code = _g130.code
  local _60 = _g130["<"]
  local inner = _g130.inner
  local stash = _g130.stash
  local substring = _g130.substring
  local _g131 = nexus.utilities
  local toplevel63 = _g131["toplevel?"]
  local reserved63 = _g131["reserved?"]
  local special63 = _g131["special?"]
  local quoted = _g131.quoted
  local initial_environment = _g131["initial-environment"]
  local quote_environment = _g131["quote-environment"]
  local to_id = _g131["to-id"]
  local macroexpand = _g131.macroexpand
  local bind = _g131.bind
  local special_form63 = _g131["special-form?"]
  local variable63 = _g131["variable?"]
  local quote_modules = _g131["quote-modules"]
  local macro63 = _g131["macro?"]
  local symbol_expansion = _g131["symbol-expansion"]
  local macro_function = _g131["macro-function"]
  local bind42 = _g131["bind*"]
  local bound63 = _g131["bound?"]
  local indentation = _g131.indentation
  local symbol63 = _g131["symbol?"]
  local imported = _g131.imported
  local quasiexpand = _g131.quasiexpand
  local stash42 = _g131["stash*"]
  local valid_id63 = _g131["valid-id?"]
  local mapo = _g131.mapo
  local exported = _g131.exported
  local getenv = _g131.getenv
  local _g134 = nexus.compiler
  local compile_special = _g134["compile-special"]
  local compile = _g134.compile
  local open_module = _g134["open-module"]
  local compile_module = _g134["compile-module"]
  local in_module = _g134["in-module"]
  local compile_function = _g134["compile-function"]
  local compile_call = _g134["compile-call"]
  local eval = _g134.eval
  local compile_body = _g134["compile-body"]
  local load_module = _g134["load-module"]
end)();
(function ()
  local _g328 = nexus.runtime
  local splice = _g328.splice
  local boolean63 = _g328["boolean?"]
  local reverse = _g328.reverse
  local is63 = _g328["is?"]
  local find = _g328.find
  local apply = _g328.apply
  local make_id = _g328["make-id"]
  local write_file = _g328["write-file"]
  local char = _g328.char
  local id_literal63 = _g328["id-literal?"]
  local sub = _g328.sub
  local composite63 = _g328["composite?"]
  local string63 = _g328["string?"]
  local parse_number = _g328["parse-number"]
  local some63 = _g328["some?"]
  local replicate = _g328.replicate
  local search = _g328.search
  local iterate = _g328.iterate
  local add = _g328.add
  local last = _g328.last
  local function63 = _g328["function?"]
  local reduce = _g328.reduce
  local unstash = _g328.unstash
  local setenv = _g328.setenv
  local number63 = _g328["number?"]
  local length = _g328.length
  local keep = _g328.keep
  local _47 = _g328["/"]
  local _ = _g328["-"]
  local _43 = _g328["+"]
  local _42 = _g328["*"]
  local exit = _g328.exit
  local _37 = _g328["%"]
  local table63 = _g328["table?"]
  local _6061 = _g328["<="]
  local extend = _g328.extend
  local _6261 = _g328[">="]
  local list63 = _g328["list?"]
  local read_file = _g328["read-file"]
  local exclude = _g328.exclude
  local hd = _g328.hd
  local keys63 = _g328["keys?"]
  local join = _g328.join
  local module = _g328.module
  local module_key = _g328["module-key"]
  local atom63 = _g328["atom?"]
  local toplevel63 = _g328["toplevel?"]
  local drop = _g328.drop
  local pairwise = _g328.pairwise
  local _37message_handler = _g328["%message-handler"]
  local to_string = _g328["to-string"]
  local tl = _g328.tl
  local write = _g328.write
  local _61 = _g328["="]
  local string_literal63 = _g328["string-literal?"]
  local cat = _g328.cat
  local none63 = _g328["none?"]
  local _62 = _g328[">"]
  local map = _g328.map
  local nil63 = _g328["nil?"]
  local split = _g328.split
  local sublist = _g328.sublist
  local code = _g328.code
  local _60 = _g328["<"]
  local inner = _g328.inner
  local stash = _g328.stash
  local substring = _g328.substring
  local _g329 = nexus.utilities
  local toplevel63 = _g329["toplevel?"]
  local reserved63 = _g329["reserved?"]
  local special63 = _g329["special?"]
  local quoted = _g329.quoted
  local initial_environment = _g329["initial-environment"]
  local quote_environment = _g329["quote-environment"]
  local to_id = _g329["to-id"]
  local macroexpand = _g329.macroexpand
  local bind = _g329.bind
  local special_form63 = _g329["special-form?"]
  local variable63 = _g329["variable?"]
  local quote_modules = _g329["quote-modules"]
  local macro63 = _g329["macro?"]
  local symbol_expansion = _g329["symbol-expansion"]
  local macro_function = _g329["macro-function"]
  local bind42 = _g329["bind*"]
  local bound63 = _g329["bound?"]
  local indentation = _g329.indentation
  local symbol63 = _g329["symbol?"]
  local imported = _g329.imported
  local quasiexpand = _g329.quasiexpand
  local stash42 = _g329["stash*"]
  local valid_id63 = _g329["valid-id?"]
  local mapo = _g329.mapo
  local exported = _g329.exported
  local getenv = _g329.getenv
  local _g332 = nexus.compiler
  local compile_special = _g332["compile-special"]
  local compile = _g332.compile
  local open_module = _g332["open-module"]
  local compile_module = _g332["compile-module"]
  local in_module = _g332["in-module"]
  local compile_function = _g332["compile-function"]
  local compile_call = _g332["compile-call"]
  local eval = _g332.eval
  local compile_body = _g332["compile-body"]
  local load_module = _g332["load-module"]
  target = "lua"
end)();
(function ()
  local _g608 = nexus.runtime
  local splice = _g608.splice
  local boolean63 = _g608["boolean?"]
  local reverse = _g608.reverse
  local is63 = _g608["is?"]
  local find = _g608.find
  local apply = _g608.apply
  local make_id = _g608["make-id"]
  local write_file = _g608["write-file"]
  local char = _g608.char
  local id_literal63 = _g608["id-literal?"]
  local sub = _g608.sub
  local composite63 = _g608["composite?"]
  local string63 = _g608["string?"]
  local parse_number = _g608["parse-number"]
  local some63 = _g608["some?"]
  local replicate = _g608.replicate
  local search = _g608.search
  local iterate = _g608.iterate
  local add = _g608.add
  local last = _g608.last
  local function63 = _g608["function?"]
  local reduce = _g608.reduce
  local unstash = _g608.unstash
  local setenv = _g608.setenv
  local number63 = _g608["number?"]
  local length = _g608.length
  local keep = _g608.keep
  local _47 = _g608["/"]
  local _ = _g608["-"]
  local _43 = _g608["+"]
  local _42 = _g608["*"]
  local exit = _g608.exit
  local _37 = _g608["%"]
  local table63 = _g608["table?"]
  local _6061 = _g608["<="]
  local extend = _g608.extend
  local _6261 = _g608[">="]
  local list63 = _g608["list?"]
  local read_file = _g608["read-file"]
  local exclude = _g608.exclude
  local hd = _g608.hd
  local keys63 = _g608["keys?"]
  local join = _g608.join
  local module = _g608.module
  local module_key = _g608["module-key"]
  local atom63 = _g608["atom?"]
  local toplevel63 = _g608["toplevel?"]
  local drop = _g608.drop
  local pairwise = _g608.pairwise
  local _37message_handler = _g608["%message-handler"]
  local to_string = _g608["to-string"]
  local tl = _g608.tl
  local write = _g608.write
  local _61 = _g608["="]
  local string_literal63 = _g608["string-literal?"]
  local cat = _g608.cat
  local none63 = _g608["none?"]
  local _62 = _g608[">"]
  local map = _g608.map
  local nil63 = _g608["nil?"]
  local split = _g608.split
  local sublist = _g608.sublist
  local code = _g608.code
  local _60 = _g608["<"]
  local inner = _g608.inner
  local stash = _g608.stash
  local substring = _g608.substring
  local _g609 = nexus.utilities
  local toplevel63 = _g609["toplevel?"]
  local reserved63 = _g609["reserved?"]
  local special63 = _g609["special?"]
  local quoted = _g609.quoted
  local initial_environment = _g609["initial-environment"]
  local quote_environment = _g609["quote-environment"]
  local to_id = _g609["to-id"]
  local macroexpand = _g609.macroexpand
  local bind = _g609.bind
  local special_form63 = _g609["special-form?"]
  local variable63 = _g609["variable?"]
  local quote_modules = _g609["quote-modules"]
  local macro63 = _g609["macro?"]
  local symbol_expansion = _g609["symbol-expansion"]
  local macro_function = _g609["macro-function"]
  local bind42 = _g609["bind*"]
  local bound63 = _g609["bound?"]
  local indentation = _g609.indentation
  local symbol63 = _g609["symbol?"]
  local imported = _g609.imported
  local quasiexpand = _g609.quasiexpand
  local stash42 = _g609["stash*"]
  local valid_id63 = _g609["valid-id?"]
  local mapo = _g609.mapo
  local exported = _g609.exported
  local getenv = _g609.getenv
  local _g612 = nexus.compiler
  local compile_special = _g612["compile-special"]
  local compile = _g612.compile
  local open_module = _g612["open-module"]
  local compile_module = _g612["compile-module"]
  local in_module = _g612["in-module"]
  local compile_function = _g612["compile-function"]
  local compile_call = _g612["compile-call"]
  local eval = _g612.eval
  local compile_body = _g612["compile-body"]
  local load_module = _g612["load-module"]
  modules = {boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}}, utilities = {import = {"runtime", "special", "core"}, export = {["numeric?"] = {variable = true}, ["toplevel?"] = {variable = true, export = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["reserved?"] = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, quoted = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, ["to-id"] = {variable = true, export = true}, macroexpand = {variable = true, export = true}, bind = {variable = true, export = true}, ["special-form?"] = {variable = true, export = true}, ["indent-level"] = {global = true, export = true}, ["variable?"] = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["symbol-expansion"] = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, ["quote-binding"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["quoting?"] = {variable = true}, ["valid-char?"] = {variable = true}, ["bind*"] = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}, ["quote-frame"] = {variable = true}, indentation = {variable = true, export = true}, ["quote-module"] = {variable = true}, reserved = {variable = true}, ["symbol?"] = {variable = true, export = true}, imported = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, escape = {variable = true}, ["valid-id?"] = {variable = true, export = true}, mapo = {variable = true, export = true}, exported = {variable = true, export = true}, ["global?"] = {variable = true}, getenv = {variable = true, export = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g625 = sub(specs, 0)
    map(compile_module, _g625)
    return(nil)
  end}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%for"] = {tr = true, export = true, stmt = true, special = function (_g626)
    local t = _g626[1]
    local k = _g626[2]
    local body = sub(_g626, 2)
    local _g627 = compile(t)
    local ind = indentation()
    local _g628 = (function ()
      indent_level = (indent_level + 1)
      local _g629 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g629)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g627 .. " do\n" .. _g628 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g627 .. ") {\n" .. _g628 .. ind .. "}\n"))
    end
  end}, ["do"] = {tr = true, export = true, stmt = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end}, ["error"] = {export = true, stmt = true, special = function (_g630)
    local x = _g630[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile({"Error", x})))
      else
        return(compile_call({"error", x}))
      end
    end)()
    return((indentation() .. e))
  end}, ["%function"] = {special = function (_g631)
    local args = _g631[1]
    local body = sub(_g631, 1)
    return(compile_function(args, body))
  end, export = true}, ["not"] = {special = function (_g632)
    local x = _g632[1]
    local _g633 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g633 .. ")"))
  end, export = true}, ["break"] = {export = true, stmt = true, special = function (_g129)
    return((indentation() .. "break"))
  end}, ["%local"] = {export = true, stmt = true, special = function (_g634)
    local name = _g634[1]
    local value = _g634[2]
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
  end}, ["get"] = {special = function (_g635)
    local t = _g635[1]
    local k = _g635[2]
    local _g636 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g636, 0) == "{")) then
      _g636 = ("(" .. _g636 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g636 .. "." .. inner(k)))
    else
      return((_g636 .. "[" .. k1 .. "]"))
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
    local _g637 = pairs
    local i = 0
    while (i < length(_g637)) do
      local _g638 = _g637[(i + 1)]
      local k = _g638[1]
      local v = _g638[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g639 = compile(v)
      local _g640 = (function ()
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
      str = (str .. _g640 .. sep .. _g639)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true}, ["%local-function"] = {tr = true, export = true, stmt = true, special = function (_g641)
    local name = _g641[1]
    local args = _g641[2]
    local body = sub(_g641, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end}, ["%global-function"] = {tr = true, export = true, stmt = true, special = function (_g642)
    local name = _g642[1]
    local args = _g642[2]
    local body = sub(_g642, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, stmt = true}))
    end
  end}, ["while"] = {tr = true, export = true, stmt = true, special = function (_g643)
    local condition = _g643[1]
    local body = sub(_g643, 1)
    local _g644 = compile(condition)
    local _g645 = (function ()
      indent_level = (indent_level + 1)
      local _g646 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g646)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g644 .. ") {\n" .. _g645 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g644 .. " do\n" .. _g645 .. ind .. "end\n"))
    end
  end}, ["%array"] = {special = function (forms)
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
    local _g647 = forms
    local i = 0
    while (i < length(_g647)) do
      local x = _g647[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true}, ["%try"] = {tr = true, export = true, stmt = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g648 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g648)
    end)()
    local e = make_id()
    local handler = {"return", {"%array", false, {"get", e, "\"message\""}}}
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g649 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g649)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end}, ["%if"] = {tr = true, export = true, stmt = true, special = function (_g650, tail63)
    local x = _g650[1]
    local _g651 = _g650[2]
    local _g652 = _g650[3]
    local _g653 = compile(x)
    local _g654 = (function ()
      indent_level = (indent_level + 1)
      local _g656 = compile(_g651, {_stash = true, tail = tail63, stmt = true})
      indent_level = (indent_level - 1)
      return(_g656)
    end)()
    local _g655 = (function ()
      if _g652 then
        indent_level = (indent_level + 1)
        local _g657 = compile(_g652, {_stash = true, tail = tail63, stmt = true})
        indent_level = (indent_level - 1)
        return(_g657)
      end
    end)()
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g653 .. ") {\n" .. _g654 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g653 .. " then\n" .. _g654)
    end
    if (_g655 and (target == "js")) then
      str = (str .. " else {\n" .. _g655 .. ind .. "}")
    else
      if _g655 then
        str = (str .. ind .. "else\n" .. _g655)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end}, ["return"] = {export = true, stmt = true, special = function (_g658)
    local x = _g658[1]
    local _g659 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call({"return", x}))
      end
    end)()
    return((indentation() .. _g659))
  end}, ["set"] = {export = true, stmt = true, special = function (_g660)
    local lh = _g660[1]
    local rh = _g660[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end}}}, reader = {import = {"runtime", "special", "core"}, export = {["read-from-string"] = {variable = true, export = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["read-table"] = {variable = true, export = true}, ["peek-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, delimiters = {variable = true}, eof = {variable = true}, ["read-char"] = {variable = true}, read = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}, whitespace = {variable = true}, ["define-reader"] = {macro = function (_g661, ...)
    local char = _g661[1]
    local stream = _g661[2]
    local body = unstash({...})
    local _g662 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g662)})
  end, export = true}}}, runtime = {import = {"special", "core"}, export = {splice = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, reverse = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, find = {variable = true, export = true}, apply = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, char = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, sub = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["splice?"] = {variable = true}, ["parse-number"] = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, replicate = {variable = true, export = true}, search = {variable = true, export = true}, iterate = {variable = true, export = true}, add = {variable = true, export = true}, last = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, reduce = {variable = true, export = true}, unstash = {variable = true, export = true}, setenv = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, length = {variable = true, export = true}, keep = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, exit = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, extend = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, exclude = {variable = true, export = true}, hd = {variable = true, export = true}, ["id-count"] = {variable = true}, ["keys?"] = {variable = true, export = true}, mapl = {variable = true}, join = {variable = true, export = true}, module = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, drop = {variable = true, export = true}, pairwise = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, ["to-string"] = {variable = true, export = true}, tl = {variable = true, export = true}, write = {variable = true, export = true}, ["="] = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, cat = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, map = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, split = {variable = true, export = true}, sublist = {variable = true, export = true}, code = {variable = true, export = true}, ["<"] = {variable = true, export = true}, inner = {variable = true, export = true}, stash = {variable = true, export = true}, substring = {variable = true, export = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["%result"] = {global = true, export = true}, ["compile-atom"] = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["%compile-module"] = {variable = true}, terminator = {variable = true}, lower = {variable = true}, ["compile-special"] = {variable = true, export = true}, compile = {variable = true, export = true}, ["compile-infix"] = {variable = true}, ["compiling?"] = {variable = true}, prologue = {variable = true}, ["open-module"] = {variable = true, export = true}, ["compiler-output"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["in-module"] = {variable = true, export = true}, ["compile-function"] = {variable = true, export = true}, encapsulate = {variable = true}, getop = {variable = true}, ["compile-call"] = {variable = true, export = true}, ["current-module"] = {global = true, export = true}, eval = {variable = true, export = true}, ["can-return?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-body"] = {variable = true, export = true}, ["infix?"] = {variable = true}, ["load-module"] = {variable = true, export = true}, infix = {variable = true}, ["module-path"] = {variable = true}}}, lib = {import = {"core", "special"}, export = {}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g663 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g663) then
      local _g664 = bind42(x, _g663)
      local args = _g664[1]
      local _g665 = _g664[2]
      return(join({"%global-function", name, args}, _g665))
    else
      if (target == "js") then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g666)
      local a = _g666[1]
      local b = _g666[2]
      local c = sub(_g666, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g667 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g667)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g668 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return({"do", {"add", "environment", (function ()
      local _g669 = {"table"}
      _g669._scope = scope
      return(_g669)
    end)()}, {"let", {x, join({"do"}, _g668)}, {"drop", "environment"}, x}})
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g670 = sub(body, 0)
    local form = join({"fn", args}, _g670)
    local keys = sub(_g670, length(_g670))
    eval(join((function ()
      local _g671 = {"setenv", {"quote", name}}
      _g671.form = {"quote", form}
      _g671.special = form
      return(_g671)
    end)(), keys))
    return(nil)
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g327, x)
      return(x)
    end, body)))
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g672 = sub(body, 0)
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
        return({"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g672), {"inc", i}}})
      else
        return({"let", {k, "nil"}, {"%for", t1, k, {"if", (function ()
          local _g673 = {"target"}
          _g673.lua = {"not", {"number?", k}}
          _g673.js = {"isNaN", {"parseInt", k}}
          return(_g673)
        end)(), join({"let", {v, {"get", t1, k}}}, _g672)}}})
      end
    end)()})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g674 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g674)})
  end, export = true}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g675 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g675) then
      local _g676 = bind42(x, _g675)
      local args = _g676[1]
      local _g677 = _g676[2]
      return(join({"%local-function", name, args}, _g677))
    else
      return({"%local", name, x})
    end
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g678 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g678)})
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g679 = sub(body, 0)
    add(environment, {})
    local _g680 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g679)))
    end)()
    drop(environment)
    return(_g680)
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, guard = {macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g681 = sub(body, 0)
    add(environment, {})
    local _g682 = (function ()
      map(function (_g683)
        local name = _g683[1]
        local exp = _g683[2]
        return(macroexpand({"define-symbol", name, exp}))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g681)))
    end)()
    drop(environment)
    return(_g682)
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g684 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g685)
      local lh = _g685[1]
      local rh = _g685[2]
      local _g686 = bind(lh, rh)
      local _g687 = 0
      while (_g687 < length(_g686)) do
        local _g688 = _g686[(_g687 + 1)]
        local id = _g688[1]
        local val = _g688[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g687 = (_g687 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g684)})))
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g689 = sub(body, 0)
    local _g690 = bind42(args, _g689)
    local _g691 = _g690[1]
    local _g692 = _g690[2]
    return(join({"%function", _g691}, _g692))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g693 = sub(body, 0)
    local form = join({"fn", args}, _g693)
    eval((function ()
      local _g694 = {"setenv", {"quote", name}}
      _g694.macro = form
      _g694.form = {"quote", form}
      return(_g694)
    end)())
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g695 = body
      local k = nil
      for k in next, _g695 do
        if (not number63(k)) then
          local v = _g695[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g696 = elements
    local _g697 = 0
    while (_g697 < length(_g696)) do
      local e = _g696[(_g697 + 1)]
      l[e] = true
      _g697 = (_g697 + 1)
    end
    return(join({"table"}, l))
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g698 = sub(body, 0)
    local imports = {}
    local imp = _g698.import
    local exp = _g698.export
    local _g699 = (imp or {})
    local _g700 = 0
    while (_g700 < length(_g699)) do
      local k = _g699[(_g700 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g700 = (_g700 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g701 = (exp or {})
    local _g702 = 0
    while (_g702 < length(_g701)) do
      local k = _g701[(_g702 + 1)]
      setenv(k, {_stash = true, export = true})
      _g702 = (_g702 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}, ["with-bindings"] = {macro = function (_g703, ...)
    local names = _g703[1]
    local body = unstash({...})
    local _g704 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g705 = {"with-frame", {"each", {x}, names, (function ()
        local _g706 = {"setenv", x}
        _g706.variable = true
        return(_g706)
      end)()}}
      _g705.scope = true
      return(_g705)
    end)(), _g704))
  end, export = true}}}, optimizer = {import = {"runtime", "special", "core"}, export = {optimizations = {variable = true}, optimize = {variable = true, export = true}, ["define-optimization"] = {}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g707 = sub(body, 0)
    local imports = {}
    local imp = _g707.import
    local exp = _g707.export
    local _g708 = (imp or {})
    local _g709 = 0
    while (_g709 < length(_g708)) do
      local k = _g708[(_g709 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g709 = (_g709 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g710 = (exp or {})
    local _g711 = 0
    while (_g711 < length(_g710)) do
      local k = _g710[(_g711 + 1)]
      setenv(k, {_stash = true, export = true})
      _g711 = (_g711 + 1)
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local splice = _g2.splice
  local boolean63 = _g2["boolean?"]
  local reverse = _g2.reverse
  local is63 = _g2["is?"]
  local find = _g2.find
  local apply = _g2.apply
  local make_id = _g2["make-id"]
  local write_file = _g2["write-file"]
  local char = _g2.char
  local id_literal63 = _g2["id-literal?"]
  local sub = _g2.sub
  local composite63 = _g2["composite?"]
  local string63 = _g2["string?"]
  local parse_number = _g2["parse-number"]
  local some63 = _g2["some?"]
  local replicate = _g2.replicate
  local search = _g2.search
  local iterate = _g2.iterate
  local add = _g2.add
  local last = _g2.last
  local function63 = _g2["function?"]
  local reduce = _g2.reduce
  local unstash = _g2.unstash
  local setenv = _g2.setenv
  local number63 = _g2["number?"]
  local length = _g2.length
  local keep = _g2.keep
  local _47 = _g2["/"]
  local _ = _g2["-"]
  local _43 = _g2["+"]
  local _42 = _g2["*"]
  local exit = _g2.exit
  local _37 = _g2["%"]
  local table63 = _g2["table?"]
  local _6061 = _g2["<="]
  local string_literal63 = _g2["string-literal?"]
  local _6261 = _g2[">="]
  local list63 = _g2["list?"]
  local read_file = _g2["read-file"]
  local exclude = _g2.exclude
  local hd = _g2.hd
  local nil63 = _g2["nil?"]
  local join = _g2.join
  local module = _g2.module
  local module_key = _g2["module-key"]
  local atom63 = _g2["atom?"]
  local toplevel63 = _g2["toplevel?"]
  local drop = _g2.drop
  local inner = _g2.inner
  local _37message_handler = _g2["%message-handler"]
  local empty63 = _g2["empty?"]
  local tl = _g2.tl
  local to_string = _g2["to-string"]
  local write = _g2.write
  local _61 = _g2["="]
  local cat = _g2.cat
  local keys63 = _g2["keys?"]
  local _62 = _g2[">"]
  local split = _g2.split
  local extend = _g2.extend
  local stash = _g2.stash
  local substring = _g2.substring
  local code = _g2.code
  local _60 = _g2["<"]
  local map = _g2.map
  local pairwise = _g2.pairwise
  local sublist = _g2.sublist
  local _g5 = nexus.reader
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local _g6 = nexus.compiler
  local compile_call = _g6["compile-call"]
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local compile_module = _g6["compile-module"]
  local in_module = _g6["in-module"]
  local compile_special = _g6["compile-special"]
  local eval = _g6.eval
  local compile_body = _g6["compile-body"]
  local load_module = _g6["load-module"]
  local function rep(str)
    local _g713 = (function ()
      local _g714,_g715 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g714, _g715})
    end)()
    local _g1 = _g713[1]
    local x = _g713[2]
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
    local _g716 = args
    local i = 0
    while (i < length(_g716)) do
      local arg = _g716[(i + 1)]
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
  local _g717 = {}
  nexus.main = _g717
  _g717.main = main
  _g717.repl = repl
  _g717.rep = rep
  _g717.usage = usage
end)();
