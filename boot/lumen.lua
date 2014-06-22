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
  _g53["nil?"] = nil63
  _g53["is?"] = is63
  _g53.length = length
  _g53["empty?"] = empty63
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
  local _g57 = nexus.runtime
  local nil63 = _g57["nil?"]
  local is63 = _g57["is?"]
  local length = _g57.length
  local empty63 = _g57["empty?"]
  local some63 = _g57["some?"]
  local hd = _g57.hd
  local string63 = _g57["string?"]
  local number63 = _g57["number?"]
  local boolean63 = _g57["boolean?"]
  local function63 = _g57["function?"]
  local composite63 = _g57["composite?"]
  local atom63 = _g57["atom?"]
  local table63 = _g57["table?"]
  local list63 = _g57["list?"]
  local substring = _g57.substring
  local sublist = _g57.sublist
  local sub = _g57.sub
  local inner = _g57.inner
  local tl = _g57.tl
  local char = _g57.char
  local code = _g57.code
  local string_literal63 = _g57["string-literal?"]
  local id_literal63 = _g57["id-literal?"]
  local add = _g57.add
  local drop = _g57.drop
  local last = _g57.last
  local reverse = _g57.reverse
  local join = _g57.join
  local reduce = _g57.reduce
  local keep = _g57.keep
  local find = _g57.find
  local pairwise = _g57.pairwise
  local iterate = _g57.iterate
  local replicate = _g57.replicate
  local splice = _g57.splice
  local map = _g57.map
  local keys63 = _g57["keys?"]
  local stash = _g57.stash
  local unstash = _g57.unstash
  local extend = _g57.extend
  local exclude = _g57.exclude
  local search = _g57.search
  local split = _g57.split
  local cat = _g57.cat
  local _43 = _g57["+"]
  local _ = _g57["-"]
  local _42 = _g57["*"]
  local _47 = _g57["/"]
  local _37 = _g57["%"]
  local _62 = _g57[">"]
  local _60 = _g57["<"]
  local _61 = _g57["="]
  local _6261 = _g57[">="]
  local _6061 = _g57["<="]
  local read_file = _g57["read-file"]
  local write_file = _g57["write-file"]
  local write = _g57.write
  local exit = _g57.exit
  local parse_number = _g57["parse-number"]
  local to_string = _g57["to-string"]
  local apply = _g57.apply
  local make_id = _g57["make-id"]
  local _37message_handler = _g57["%message-handler"]
  local toplevel63 = _g57["toplevel?"]
  local module_key = _g57["module-key"]
  local module = _g57.module
  local setenv = _g57.setenv
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
      return(join({join({id, rh})}, bind(lh, id)))
    else
      if atom63(lh) then
        return(join({join({lh, rh})}))
      else
        local bs = {}
        local r = lh.rest
        local _g63 = lh
        local i = 0
        while (i < length(_g63)) do
          local x = _g63[(i + 1)]
          bs = join(bs, bind(x, join({"at", rh, i})))
          i = (i + 1)
        end
        if r then
          bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
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
    local _g86 = module(current_module).export
    local n = nil
    for n in next, _g86 do
      if (not number63(n)) then
        local b = _g86[n]
        if b.variable then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({join({"%local", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
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
    return(join((function ()
      local _g90 = {"table"}
      _g90.import = quoted(m.import)
      _g90.export = quote_frame(m.export)
      return(_g90)
    end)()))
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g91 = {}
  nexus.utilities = _g91
  _g91.getenv = getenv
  _g91["macro-function"] = macro_function
  _g91["macro?"] = macro63
  _g91["special?"] = special63
  _g91["special-form?"] = special_form63
  _g91["symbol-expansion"] = symbol_expansion
  _g91["symbol?"] = symbol63
  _g91["variable?"] = variable63
  _g91["bound?"] = bound63
  _g91["toplevel?"] = toplevel63
  _g91.quoted = quoted
  _g91["stash*"] = stash42
  _g91.bind = bind
  _g91["bind*"] = bind42
  _g91.quasiexpand = quasiexpand
  _g91.macroexpand = macroexpand
  _g91.indentation = indentation
  _g91["reserved?"] = reserved63
  _g91["valid-id?"] = valid_id63
  _g91["to-id"] = to_id
  _g91.imported = imported
  _g91.exported = exported
  _g91.mapo = mapo
  _g91["quote-environment"] = quote_environment
  _g91["quote-modules"] = quote_modules
  _g91["initial-environment"] = initial_environment
  _g91["global?"] = global63
  _g91.escape = escape
  _g91["quoting?"] = quoting63
  _g91["quasiquoting?"] = quasiquoting63
  _g91["can-unquote?"] = can_unquote63
  _g91["quasisplice?"] = quasisplice63
  _g91["quasiquote-list"] = quasiquote_list
  _g91.reserved = reserved
  _g91["numeric?"] = numeric63
  _g91["valid-char?"] = valid_char63
  _g91["quote-binding"] = quote_binding
  _g91["quote-frame"] = quote_frame
  _g91["quote-module"] = quote_module
end)();
(function ()
  local _g92 = nexus.runtime
  local nil63 = _g92["nil?"]
  local is63 = _g92["is?"]
  local length = _g92.length
  local empty63 = _g92["empty?"]
  local some63 = _g92["some?"]
  local hd = _g92.hd
  local string63 = _g92["string?"]
  local number63 = _g92["number?"]
  local boolean63 = _g92["boolean?"]
  local function63 = _g92["function?"]
  local composite63 = _g92["composite?"]
  local atom63 = _g92["atom?"]
  local table63 = _g92["table?"]
  local list63 = _g92["list?"]
  local substring = _g92.substring
  local sublist = _g92.sublist
  local sub = _g92.sub
  local inner = _g92.inner
  local tl = _g92.tl
  local char = _g92.char
  local code = _g92.code
  local string_literal63 = _g92["string-literal?"]
  local id_literal63 = _g92["id-literal?"]
  local add = _g92.add
  local drop = _g92.drop
  local last = _g92.last
  local reverse = _g92.reverse
  local join = _g92.join
  local reduce = _g92.reduce
  local keep = _g92.keep
  local find = _g92.find
  local pairwise = _g92.pairwise
  local iterate = _g92.iterate
  local replicate = _g92.replicate
  local splice = _g92.splice
  local map = _g92.map
  local keys63 = _g92["keys?"]
  local stash = _g92.stash
  local unstash = _g92.unstash
  local extend = _g92.extend
  local exclude = _g92.exclude
  local search = _g92.search
  local split = _g92.split
  local cat = _g92.cat
  local _43 = _g92["+"]
  local _ = _g92["-"]
  local _42 = _g92["*"]
  local _47 = _g92["/"]
  local _37 = _g92["%"]
  local _62 = _g92[">"]
  local _60 = _g92["<"]
  local _61 = _g92["="]
  local _6261 = _g92[">="]
  local _6061 = _g92["<="]
  local read_file = _g92["read-file"]
  local write_file = _g92["write-file"]
  local write = _g92.write
  local exit = _g92.exit
  local parse_number = _g92["parse-number"]
  local to_string = _g92["to-string"]
  local apply = _g92.apply
  local make_id = _g92["make-id"]
  local _37message_handler = _g92["%message-handler"]
  local toplevel63 = _g92["toplevel?"]
  local module_key = _g92["module-key"]
  local module = _g92.module
  local setenv = _g92.setenv
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
  local _g103 = {}
  nexus.reader = _g103
  _g103["make-stream"] = make_stream
  _g103["read-table"] = read_table
  _g103.read = read
  _g103["read-all"] = read_all
  _g103["read-from-string"] = read_from_string
  _g103.delimiters = delimiters
  _g103.whitespace = whitespace
  _g103["peek-char"] = peek_char
  _g103["read-char"] = read_char
  _g103["skip-non-code"] = skip_non_code
  _g103.eof = eof
  _g103["key?"] = key63
  _g103["flag?"] = flag63
end)();
(function ()
  local _g104 = nexus.runtime
  local nil63 = _g104["nil?"]
  local is63 = _g104["is?"]
  local length = _g104.length
  local empty63 = _g104["empty?"]
  local some63 = _g104["some?"]
  local hd = _g104.hd
  local string63 = _g104["string?"]
  local number63 = _g104["number?"]
  local boolean63 = _g104["boolean?"]
  local function63 = _g104["function?"]
  local composite63 = _g104["composite?"]
  local atom63 = _g104["atom?"]
  local table63 = _g104["table?"]
  local list63 = _g104["list?"]
  local substring = _g104.substring
  local sublist = _g104.sublist
  local sub = _g104.sub
  local inner = _g104.inner
  local tl = _g104.tl
  local char = _g104.char
  local code = _g104.code
  local string_literal63 = _g104["string-literal?"]
  local id_literal63 = _g104["id-literal?"]
  local add = _g104.add
  local drop = _g104.drop
  local last = _g104.last
  local reverse = _g104.reverse
  local join = _g104.join
  local reduce = _g104.reduce
  local keep = _g104.keep
  local find = _g104.find
  local pairwise = _g104.pairwise
  local iterate = _g104.iterate
  local replicate = _g104.replicate
  local splice = _g104.splice
  local map = _g104.map
  local keys63 = _g104["keys?"]
  local stash = _g104.stash
  local unstash = _g104.unstash
  local extend = _g104.extend
  local exclude = _g104.exclude
  local search = _g104.search
  local split = _g104.split
  local cat = _g104.cat
  local _43 = _g104["+"]
  local _ = _g104["-"]
  local _42 = _g104["*"]
  local _47 = _g104["/"]
  local _37 = _g104["%"]
  local _62 = _g104[">"]
  local _60 = _g104["<"]
  local _61 = _g104["="]
  local _6261 = _g104[">="]
  local _6061 = _g104["<="]
  local read_file = _g104["read-file"]
  local write_file = _g104["write-file"]
  local write = _g104.write
  local exit = _g104.exit
  local parse_number = _g104["parse-number"]
  local to_string = _g104["to-string"]
  local apply = _g104.apply
  local make_id = _g104["make-id"]
  local _37message_handler = _g104["%message-handler"]
  local toplevel63 = _g104["toplevel?"]
  local module_key = _g104["module-key"]
  local module = _g104.module
  local setenv = _g104.setenv
  local _g105 = nexus.utilities
  local getenv = _g105.getenv
  local macro_function = _g105["macro-function"]
  local macro63 = _g105["macro?"]
  local special63 = _g105["special?"]
  local special_form63 = _g105["special-form?"]
  local symbol_expansion = _g105["symbol-expansion"]
  local symbol63 = _g105["symbol?"]
  local variable63 = _g105["variable?"]
  local bound63 = _g105["bound?"]
  local toplevel63 = _g105["toplevel?"]
  local quoted = _g105.quoted
  local stash42 = _g105["stash*"]
  local bind = _g105.bind
  local bind42 = _g105["bind*"]
  local quasiexpand = _g105.quasiexpand
  local macroexpand = _g105.macroexpand
  local indentation = _g105.indentation
  local reserved63 = _g105["reserved?"]
  local valid_id63 = _g105["valid-id?"]
  local to_id = _g105["to-id"]
  local imported = _g105.imported
  local exported = _g105.exported
  local mapo = _g105.mapo
  local quote_environment = _g105["quote-environment"]
  local quote_modules = _g105["quote-modules"]
  local initial_environment = _g105["initial-environment"]
  local _g108 = nexus.reader
  local make_stream = _g108["make-stream"]
  local read_table = _g108["read-table"]
  local read = _g108.read
  local read_all = _g108["read-all"]
  local read_from_string = _g108["read-from-string"]
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
    local _g112 = getenv(hd(form))
    local special = _g112.special
    local stmt = _g112.stmt
    local self_tr63 = _g112.tr
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
    local stmt = _g121.stmt
    local tail = _g121.tail
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
    return(join({join({"%function", {}}, join(_g123, epilog))}))
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
  _g128["compile-body"] = compile_body
  _g128["compile-call"] = compile_call
  _g128["compile-function"] = compile_function
  _g128["compile-special"] = compile_special
  _g128.compile = compile
  _g128["open-module"] = open_module
  _g128["load-module"] = load_module
  _g128["in-module"] = in_module
  _g128["compile-module"] = compile_module
  _g128.eval = eval
  _g128.infix = infix
  _g128.getop = getop
  _g128["infix?"] = infix63
  _g128["compile-args"] = compile_args
  _g128["compile-atom"] = compile_atom
  _g128.terminator = terminator
  _g128["compile-infix"] = compile_infix
  _g128["can-return?"] = can_return63
  _g128.lower = lower
  _g128["module-path"] = module_path
  _g128.encapsulate = encapsulate
  _g128["compile-file"] = compile_file
  _g128.run = run
  _g128["compiling?"] = compiling63
  _g128["compiler-output"] = compiler_output
  _g128["%compile-module"] = _37compile_module
  _g128.prologue = prologue
end)();
(function ()
  local _g130 = nexus.runtime
  local nil63 = _g130["nil?"]
  local is63 = _g130["is?"]
  local length = _g130.length
  local empty63 = _g130["empty?"]
  local some63 = _g130["some?"]
  local hd = _g130.hd
  local string63 = _g130["string?"]
  local number63 = _g130["number?"]
  local boolean63 = _g130["boolean?"]
  local function63 = _g130["function?"]
  local composite63 = _g130["composite?"]
  local atom63 = _g130["atom?"]
  local table63 = _g130["table?"]
  local list63 = _g130["list?"]
  local substring = _g130.substring
  local sublist = _g130.sublist
  local sub = _g130.sub
  local inner = _g130.inner
  local tl = _g130.tl
  local char = _g130.char
  local code = _g130.code
  local string_literal63 = _g130["string-literal?"]
  local id_literal63 = _g130["id-literal?"]
  local add = _g130.add
  local drop = _g130.drop
  local last = _g130.last
  local reverse = _g130.reverse
  local join = _g130.join
  local reduce = _g130.reduce
  local keep = _g130.keep
  local find = _g130.find
  local pairwise = _g130.pairwise
  local iterate = _g130.iterate
  local replicate = _g130.replicate
  local splice = _g130.splice
  local map = _g130.map
  local keys63 = _g130["keys?"]
  local stash = _g130.stash
  local unstash = _g130.unstash
  local extend = _g130.extend
  local exclude = _g130.exclude
  local search = _g130.search
  local split = _g130.split
  local cat = _g130.cat
  local _43 = _g130["+"]
  local _ = _g130["-"]
  local _42 = _g130["*"]
  local _47 = _g130["/"]
  local _37 = _g130["%"]
  local _62 = _g130[">"]
  local _60 = _g130["<"]
  local _61 = _g130["="]
  local _6261 = _g130[">="]
  local _6061 = _g130["<="]
  local read_file = _g130["read-file"]
  local write_file = _g130["write-file"]
  local write = _g130.write
  local exit = _g130.exit
  local parse_number = _g130["parse-number"]
  local to_string = _g130["to-string"]
  local apply = _g130.apply
  local make_id = _g130["make-id"]
  local _37message_handler = _g130["%message-handler"]
  local toplevel63 = _g130["toplevel?"]
  local module_key = _g130["module-key"]
  local module = _g130.module
  local setenv = _g130.setenv
  local _g131 = nexus.utilities
  local getenv = _g131.getenv
  local macro_function = _g131["macro-function"]
  local macro63 = _g131["macro?"]
  local special63 = _g131["special?"]
  local special_form63 = _g131["special-form?"]
  local symbol_expansion = _g131["symbol-expansion"]
  local symbol63 = _g131["symbol?"]
  local variable63 = _g131["variable?"]
  local bound63 = _g131["bound?"]
  local toplevel63 = _g131["toplevel?"]
  local quoted = _g131.quoted
  local stash42 = _g131["stash*"]
  local bind = _g131.bind
  local bind42 = _g131["bind*"]
  local quasiexpand = _g131.quasiexpand
  local macroexpand = _g131.macroexpand
  local indentation = _g131.indentation
  local reserved63 = _g131["reserved?"]
  local valid_id63 = _g131["valid-id?"]
  local to_id = _g131["to-id"]
  local imported = _g131.imported
  local exported = _g131.exported
  local mapo = _g131.mapo
  local quote_environment = _g131["quote-environment"]
  local quote_modules = _g131["quote-modules"]
  local initial_environment = _g131["initial-environment"]
  local _g134 = nexus.compiler
  local compile_body = _g134["compile-body"]
  local compile_call = _g134["compile-call"]
  local compile_function = _g134["compile-function"]
  local compile_special = _g134["compile-special"]
  local compile = _g134.compile
  local open_module = _g134["open-module"]
  local load_module = _g134["load-module"]
  local in_module = _g134["in-module"]
  local compile_module = _g134["compile-module"]
  local eval = _g134.eval
end)();
(function ()
  local _g328 = nexus.runtime
  local nil63 = _g328["nil?"]
  local is63 = _g328["is?"]
  local length = _g328.length
  local empty63 = _g328["empty?"]
  local some63 = _g328["some?"]
  local hd = _g328.hd
  local string63 = _g328["string?"]
  local number63 = _g328["number?"]
  local boolean63 = _g328["boolean?"]
  local function63 = _g328["function?"]
  local composite63 = _g328["composite?"]
  local atom63 = _g328["atom?"]
  local table63 = _g328["table?"]
  local list63 = _g328["list?"]
  local substring = _g328.substring
  local sublist = _g328.sublist
  local sub = _g328.sub
  local inner = _g328.inner
  local tl = _g328.tl
  local char = _g328.char
  local code = _g328.code
  local string_literal63 = _g328["string-literal?"]
  local id_literal63 = _g328["id-literal?"]
  local add = _g328.add
  local drop = _g328.drop
  local last = _g328.last
  local reverse = _g328.reverse
  local join = _g328.join
  local reduce = _g328.reduce
  local keep = _g328.keep
  local find = _g328.find
  local pairwise = _g328.pairwise
  local iterate = _g328.iterate
  local replicate = _g328.replicate
  local splice = _g328.splice
  local map = _g328.map
  local keys63 = _g328["keys?"]
  local stash = _g328.stash
  local unstash = _g328.unstash
  local extend = _g328.extend
  local exclude = _g328.exclude
  local search = _g328.search
  local split = _g328.split
  local cat = _g328.cat
  local _43 = _g328["+"]
  local _ = _g328["-"]
  local _42 = _g328["*"]
  local _47 = _g328["/"]
  local _37 = _g328["%"]
  local _62 = _g328[">"]
  local _60 = _g328["<"]
  local _61 = _g328["="]
  local _6261 = _g328[">="]
  local _6061 = _g328["<="]
  local read_file = _g328["read-file"]
  local write_file = _g328["write-file"]
  local write = _g328.write
  local exit = _g328.exit
  local parse_number = _g328["parse-number"]
  local to_string = _g328["to-string"]
  local apply = _g328.apply
  local make_id = _g328["make-id"]
  local _37message_handler = _g328["%message-handler"]
  local toplevel63 = _g328["toplevel?"]
  local module_key = _g328["module-key"]
  local module = _g328.module
  local setenv = _g328.setenv
  local _g329 = nexus.utilities
  local getenv = _g329.getenv
  local macro_function = _g329["macro-function"]
  local macro63 = _g329["macro?"]
  local special63 = _g329["special?"]
  local special_form63 = _g329["special-form?"]
  local symbol_expansion = _g329["symbol-expansion"]
  local symbol63 = _g329["symbol?"]
  local variable63 = _g329["variable?"]
  local bound63 = _g329["bound?"]
  local toplevel63 = _g329["toplevel?"]
  local quoted = _g329.quoted
  local stash42 = _g329["stash*"]
  local bind = _g329.bind
  local bind42 = _g329["bind*"]
  local quasiexpand = _g329.quasiexpand
  local macroexpand = _g329.macroexpand
  local indentation = _g329.indentation
  local reserved63 = _g329["reserved?"]
  local valid_id63 = _g329["valid-id?"]
  local to_id = _g329["to-id"]
  local imported = _g329.imported
  local exported = _g329.exported
  local mapo = _g329.mapo
  local quote_environment = _g329["quote-environment"]
  local quote_modules = _g329["quote-modules"]
  local initial_environment = _g329["initial-environment"]
  local _g332 = nexus.compiler
  local compile_body = _g332["compile-body"]
  local compile_call = _g332["compile-call"]
  local compile_function = _g332["compile-function"]
  local compile_special = _g332["compile-special"]
  local compile = _g332.compile
  local open_module = _g332["open-module"]
  local load_module = _g332["load-module"]
  local in_module = _g332["in-module"]
  local compile_module = _g332["compile-module"]
  local eval = _g332.eval
  target = "lua"
end)();
(function ()
  local _g617 = nexus.runtime
  local nil63 = _g617["nil?"]
  local is63 = _g617["is?"]
  local length = _g617.length
  local empty63 = _g617["empty?"]
  local some63 = _g617["some?"]
  local hd = _g617.hd
  local string63 = _g617["string?"]
  local number63 = _g617["number?"]
  local boolean63 = _g617["boolean?"]
  local function63 = _g617["function?"]
  local composite63 = _g617["composite?"]
  local atom63 = _g617["atom?"]
  local table63 = _g617["table?"]
  local list63 = _g617["list?"]
  local substring = _g617.substring
  local sublist = _g617.sublist
  local sub = _g617.sub
  local inner = _g617.inner
  local tl = _g617.tl
  local char = _g617.char
  local code = _g617.code
  local string_literal63 = _g617["string-literal?"]
  local id_literal63 = _g617["id-literal?"]
  local add = _g617.add
  local drop = _g617.drop
  local last = _g617.last
  local reverse = _g617.reverse
  local join = _g617.join
  local reduce = _g617.reduce
  local keep = _g617.keep
  local find = _g617.find
  local pairwise = _g617.pairwise
  local iterate = _g617.iterate
  local replicate = _g617.replicate
  local splice = _g617.splice
  local map = _g617.map
  local keys63 = _g617["keys?"]
  local stash = _g617.stash
  local unstash = _g617.unstash
  local extend = _g617.extend
  local exclude = _g617.exclude
  local search = _g617.search
  local split = _g617.split
  local cat = _g617.cat
  local _43 = _g617["+"]
  local _ = _g617["-"]
  local _42 = _g617["*"]
  local _47 = _g617["/"]
  local _37 = _g617["%"]
  local _62 = _g617[">"]
  local _60 = _g617["<"]
  local _61 = _g617["="]
  local _6261 = _g617[">="]
  local _6061 = _g617["<="]
  local read_file = _g617["read-file"]
  local write_file = _g617["write-file"]
  local write = _g617.write
  local exit = _g617.exit
  local parse_number = _g617["parse-number"]
  local to_string = _g617["to-string"]
  local apply = _g617.apply
  local make_id = _g617["make-id"]
  local _37message_handler = _g617["%message-handler"]
  local toplevel63 = _g617["toplevel?"]
  local module_key = _g617["module-key"]
  local module = _g617.module
  local setenv = _g617.setenv
  local _g618 = nexus.utilities
  local getenv = _g618.getenv
  local macro_function = _g618["macro-function"]
  local macro63 = _g618["macro?"]
  local special63 = _g618["special?"]
  local special_form63 = _g618["special-form?"]
  local symbol_expansion = _g618["symbol-expansion"]
  local symbol63 = _g618["symbol?"]
  local variable63 = _g618["variable?"]
  local bound63 = _g618["bound?"]
  local toplevel63 = _g618["toplevel?"]
  local quoted = _g618.quoted
  local stash42 = _g618["stash*"]
  local bind = _g618.bind
  local bind42 = _g618["bind*"]
  local quasiexpand = _g618.quasiexpand
  local macroexpand = _g618.macroexpand
  local indentation = _g618.indentation
  local reserved63 = _g618["reserved?"]
  local valid_id63 = _g618["valid-id?"]
  local to_id = _g618["to-id"]
  local imported = _g618.imported
  local exported = _g618.exported
  local mapo = _g618.mapo
  local quote_environment = _g618["quote-environment"]
  local quote_modules = _g618["quote-modules"]
  local initial_environment = _g618["initial-environment"]
  local _g621 = nexus.compiler
  local compile_body = _g621["compile-body"]
  local compile_call = _g621["compile-call"]
  local compile_function = _g621["compile-function"]
  local compile_special = _g621["compile-special"]
  local compile = _g621.compile
  local open_module = _g621["open-module"]
  local load_module = _g621["load-module"]
  local in_module = _g621["in-module"]
  local compile_module = _g621["compile-module"]
  local eval = _g621.eval
  modules = {lib = {import = {"core", "special"}, export = {}}, runtime = {import = {"special", "core"}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sublist = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, find = {export = true, variable = true}, pairwise = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, splice = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, extend = {export = true, variable = true}, exclude = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, ["parse-number"] = {export = true, variable = true}, ["to-string"] = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, ["splice?"] = {variable = true}, mapl = {variable = true}, ["id-count"] = {variable = true}}}, optimizer = {import = {"runtime", "special", "core"}, export = {["define-optimization"] = {}, optimizations = {variable = true}, optimize = {variable = true, export = true}}}, utilities = {import = {"runtime", "special", "core"}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, ["to-id"] = {export = true, variable = true}, imported = {export = true, variable = true}, exported = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-char?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["do"] = {export = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, tail = tail63}))
  end, tr = true, stmt = true}, ["%if"] = {export = true, special = function (_g634, tail63)
    local x = _g634[1]
    local _g635 = _g634[2]
    local _g636 = _g634[3]
    local _g637 = compile(x)
    local _g638 = (function ()
      indent_level = (indent_level + 1)
      local _g640 = compile(_g635, {_stash = true, stmt = true, tail = tail63})
      indent_level = (indent_level - 1)
      return(_g640)
    end)()
    local _g639 = (function ()
      if _g636 then
        indent_level = (indent_level + 1)
        local _g641 = compile(_g636, {_stash = true, stmt = true, tail = tail63})
        indent_level = (indent_level - 1)
        return(_g641)
      end
    end)()
    local ind = indentation()
    local str = ""
    if (target == "js") then
      str = (str .. ind .. "if (" .. _g637 .. ") {\n" .. _g638 .. ind .. "}")
    else
      str = (str .. ind .. "if " .. _g637 .. " then\n" .. _g638)
    end
    if (_g639 and (target == "js")) then
      str = (str .. " else {\n" .. _g639 .. ind .. "}")
    else
      if _g639 then
        str = (str .. ind .. "else\n" .. _g639)
      end
    end
    if (target == "lua") then
      return((str .. ind .. "end\n"))
    else
      return((str .. "\n"))
    end
  end, tr = true, stmt = true}, ["while"] = {export = true, special = function (_g642)
    local condition = _g642[1]
    local body = sub(_g642, 1)
    local _g643 = compile(condition)
    local _g644 = (function ()
      indent_level = (indent_level + 1)
      local _g645 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g645)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g643 .. ") {\n" .. _g644 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g643 .. " do\n" .. _g644 .. ind .. "end\n"))
    end
  end, tr = true, stmt = true}, ["%for"] = {export = true, special = function (_g646)
    local t = _g646[1]
    local k = _g646[2]
    local body = sub(_g646, 2)
    local _g647 = compile(t)
    local ind = indentation()
    local _g648 = (function ()
      indent_level = (indent_level + 1)
      local _g649 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g649)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g647 .. " do\n" .. _g648 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g647 .. ") {\n" .. _g648 .. ind .. "}\n"))
    end
  end, tr = true, stmt = true}, ["%try"] = {export = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g650 = compile_body(forms, {_stash = true, tail = true})
      indent_level = (indent_level - 1)
      return(_g650)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, join({"get", e, "\"message\""})})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g651 = compile(handler, {_stash = true, stmt = true})
      indent_level = (indent_level - 1)
      return(_g651)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, tr = true, stmt = true}, ["break"] = {export = true, special = function (_g129)
    return((indentation() .. "break"))
  end, stmt = true}, ["%function"] = {export = true, special = function (_g652)
    local args = _g652[1]
    local body = sub(_g652, 1)
    return(compile_function(args, body))
  end}, ["%global-function"] = {export = true, special = function (_g653)
    local name = _g653[1]
    local args = _g653[2]
    local body = sub(_g653, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, stmt = true}))
    end
  end, tr = true, stmt = true}, ["%local-function"] = {export = true, special = function (_g654)
    local name = _g654[1]
    local args = _g654[2]
    local body = sub(_g654, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, tr = true, stmt = true}, ["return"] = {export = true, special = function (_g655)
    local x = _g655[1]
    local _g656 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g656))
  end, stmt = true}, ["error"] = {export = true, special = function (_g657)
    local x = _g657[1]
    local e = (function ()
      if (target == "js") then
        return(("throw new " .. compile(join({"Error", x}))))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, stmt = true}, ["%local"] = {export = true, special = function (_g658)
    local name = _g658[1]
    local value = _g658[2]
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
  end, stmt = true}, ["set"] = {export = true, special = function (_g659)
    local lh = _g659[1]
    local rh = _g659[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, stmt = true}, ["get"] = {export = true, special = function (_g660)
    local t = _g660[1]
    local k = _g660[2]
    local _g661 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g661, 0) == "{")) then
      _g661 = ("(" .. _g661 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g661 .. "." .. inner(k)))
    else
      return((_g661 .. "[" .. k1 .. "]"))
    end
  end}, ["not"] = {export = true, special = function (_g662)
    local x = _g662[1]
    local _g663 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g663 .. ")"))
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
    local _g664 = forms
    local i = 0
    while (i < length(_g664)) do
      local x = _g664[(i + 1)]
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
    local _g665 = pairs
    local i = 0
    while (i < length(_g665)) do
      local _g666 = _g665[(i + 1)]
      local k = _g666[1]
      local v = _g666[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g667 = compile(v)
      local _g668 = (function ()
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
      str = (str .. _g668 .. sep .. _g667)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, at = {export = true, macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    else
      if (target == "lua") then
        i = join({"+", i, 1})
      end
    end
    return(join({"get", l, i}))
  end}, list = {export = true, macro = function (...)
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
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g670)
      local a = _g670[1]
      local b = _g670[2]
      local c = sub(_g670, 2)
      if is63(b) then
        return(join({join({"%if", a, b}, step(c))}))
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g327, x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g671 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g672)
      local lh = _g672[1]
      local rh = _g672[2]
      local _g673 = bind(lh, rh)
      local _g674 = 0
      while (_g674 < length(_g673)) do
        local _g675 = _g673[(_g674 + 1)]
        local id = _g675[1]
        local val = _g675[2]
        if (bound63(id) or reserved63(id) or toplevel63()) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g674 = (_g674 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g671)})))
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g676 = sub(body, 0)
    local imports = {}
    local imp = _g676.import
    local exp = _g676.export
    local _g677 = (imp or {})
    local _g678 = 0
    while (_g678 < length(_g677)) do
      local k = _g677[(_g678 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g678 = (_g678 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g679 = (exp or {})
    local _g680 = 0
    while (_g680 < length(_g679)) do
      local k = _g679[(_g680 + 1)]
      setenv(k, {_stash = true, export = true})
      _g680 = (_g680 + 1)
    end
    return(join({"do"}, imports))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g681 = sub(body, 0)
    local form = join({"fn", args}, _g681)
    eval(join((function ()
      local _g682 = {"setenv", join({"quote", name})}
      _g682.macro = form
      _g682.form = join({"quote", form})
      return(_g682)
    end)()))
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g683 = sub(body, 0)
    local form = join({"fn", args}, _g683)
    local keys = sub(_g683, length(_g683))
    eval(join((function ()
      local _g684 = {"setenv", join({"quote", name})}
      _g684.special = form
      _g684.form = join({"quote", form})
      return(_g684)
    end)(), keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g685 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g685)) then
      local _g686 = bind42(x, _g685)
      local args = _g686[1]
      local _g687 = _g686[2]
      return(join({"%local-function", name, args}, _g687))
    else
      return(join({"%local", name, x}))
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g688 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g688)) then
      local _g689 = bind42(x, _g688)
      local args = _g689[1]
      local _g690 = _g689[2]
      return(join({"%global-function", name, args}, _g690))
    else
      if (target == "js") then
        return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
      else
        return(join({"set", name, x}))
      end
    end
  end}, ["with-bindings"] = {export = true, macro = function (_g691, ...)
    local names = _g691[1]
    local body = unstash({...})
    local _g692 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g693 = {"with-frame", join({"each", join({x}), names, join((function ()
        local _g694 = {"setenv", x}
        _g694.variable = true
        return(_g694)
      end)())})}
      _g693.scope = true
      return(_g693)
    end)(), _g692))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g695 = sub(body, 0)
    add(environment, {})
    local _g696 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g695)))
    end)()
    drop(environment)
    return(_g696)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    add(environment, {})
    local _g698 = (function ()
      map(function (_g699)
        local name = _g699[1]
        local exp = _g699[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g697)))
    end)()
    drop(environment)
    return(_g698)
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g700 = sub(body, 0)
    local _g701 = bind42(args, _g700)
    local _g702 = _g701[1]
    local _g703 = _g701[2]
    return(join({"%function", _g702}, _g703))
  end}, guard = {export = true, macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
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
        return(join({"let", join({i, 0}), join({"while", join({"<", i, join({"length", t1})}), join({"let", join({k, join({"at", t1, i})})}, _g704), join({"inc", i})})}))
      else
        return(join({"let", join({k, "nil"}), join({"%for", t1, k, join({"if", join((function ()
          local _g705 = {"target"}
          _g705.js = join({"isNaN", join({"parseInt", k})})
          _g705.lua = join({"not", join({"number?", k})})
          return(_g705)
        end)()), join({"let", join({v, join({"get", t1, k})})}, _g704)})})}))
      end
    end)()}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g706 = elements
    local _g707 = 0
    while (_g707 < length(_g706)) do
      local e = _g706[(_g707 + 1)]
      l[e] = true
      _g707 = (_g707 + 1)
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return(join({"quote", target}))
  end}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g708 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g708)}))
  end}, ["list*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local _g709 = xs
      local i = 0
      while (i < length(_g709)) do
        local x = _g709[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g710 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g710)}))
  end}, inc = {export = true, macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end}, dec = {export = true, macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g711 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g711)}))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g713 = {"table"}
      _g713._scope = scope
      return(_g713)
    end)())}), join({"let", join({x, join({"do"}, _g712)}), join({"drop", "environment"}), x})}))
  end}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["compile-body"] = {export = true, variable = true}, ["compile-call"] = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-special"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, ["%result"] = {global = true, export = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, ["%compile-module"] = {variable = true}, prologue = {variable = true}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g714 = sub(specs, 0)
    map(compile_module, _g714)
    return(nil)
  end}}}, reader = {import = {"runtime", "special", "core"}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g715, ...)
    local char = _g715[1]
    local stream = _g715[2]
    local body = unstash({...})
    local _g716 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g716)}))
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g717 = sub(body, 0)
    local imports = {}
    local imp = _g717.import
    local exp = _g717.export
    local _g718 = (imp or {})
    local _g719 = 0
    while (_g719 < length(_g718)) do
      local k = _g718[(_g719 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g719 = (_g719 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g720 = (exp or {})
    local _g721 = 0
    while (_g721 < length(_g720)) do
      local k = _g720[(_g721 + 1)]
      setenv(k, {_stash = true, export = true})
      _g721 = (_g721 + 1)
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local length = _g2.length
  local empty63 = _g2["empty?"]
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
    local _g723 = (function ()
      local _g724,_g725 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g724, _g725})
    end)()
    local _g1 = _g723[1]
    local x = _g723[2]
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
    local _g726 = args
    local i = 0
    while (i < length(_g726)) do
      local arg = _g726[(i + 1)]
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
  local _g727 = {}
  nexus.main = _g727
  _g727.rep = rep
  _g727.repl = repl
  _g727.usage = usage
  _g727.main = main
end)();
