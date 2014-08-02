nexus = {}
(function ()
  nexus["lumen/runtime"] = {}
  local function nil63(x)
    return(x == nil)
  end
  nexus["lumen/runtime"]["nil?"] = nil63
  local function is63(x)
    return(not nil63(x))
  end
  nexus["lumen/runtime"]["is?"] = is63
  local function length(x)
    return(#x)
  end
  nexus["lumen/runtime"].length = length
  local function none63(x)
    return(length(x) == 0)
  end
  nexus["lumen/runtime"]["none?"] = none63
  local function some63(x)
    return(length(x) > 0)
  end
  nexus["lumen/runtime"]["some?"] = some63
  local function one63(x)
    return(length(x) == 1)
  end
  nexus["lumen/runtime"]["one?"] = one63
  local function hd(l)
    return(l[1])
  end
  nexus["lumen/runtime"].hd = hd
  local function string63(x)
    return(type(x) == "string")
  end
  nexus["lumen/runtime"]["string?"] = string63
  local function number63(x)
    return(type(x) == "number")
  end
  nexus["lumen/runtime"]["number?"] = number63
  local function boolean63(x)
    return(type(x) == "boolean")
  end
  nexus["lumen/runtime"]["boolean?"] = boolean63
  local function function63(x)
    return(type(x) == "function")
  end
  nexus["lumen/runtime"]["function?"] = function63
  local function composite63(x)
    return(is63(x) and type(x) == "table")
  end
  nexus["lumen/runtime"]["composite?"] = composite63
  local function atom63(x)
    return(nil63(x) or not composite63(x))
  end
  nexus["lumen/runtime"]["atom?"] = atom63
  local function table63(x)
    return(composite63(x) and nil63(hd(x)))
  end
  nexus["lumen/runtime"]["table?"] = table63
  local function list63(x)
    return(composite63(x) and is63(hd(x)))
  end
  nexus["lumen/runtime"]["list?"] = list63
  local function substring(str, from, upto)
    return(string.sub(str, from + 1, upto))
  end
  nexus["lumen/runtime"].substring = substring
  local function sub(x, from, upto)
    if string63(x) then
      return(substring(x, from or 0, upto))
    else
      local l = {}
      local n = length(x)
      local _g53
      if nil63(from) or from < 0 then
        _g53 = 0
      else
        _g53 = from
      end
      local i = _g53
      local _g54
      if nil63(upto) or upto > n then
        _g54 = n
      else
        _g54 = upto
      end
      local _g23 = _g54
      local j = 0
      while i < _g23 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g24 = x
      local k = nil
      for k in next, _g24 do
        if not number63(k) then
          local v = _g24[k]
          l[k] = v
        end
      end
      return(l)
    end
  end
  nexus["lumen/runtime"].sub = sub
  local function inner(x)
    return(sub(x, 1, length(x) - 1))
  end
  nexus["lumen/runtime"].inner = inner
  local function tl(l)
    return(sub(l, 1))
  end
  nexus["lumen/runtime"].tl = tl
  local function char(str, n)
    return(sub(str, n, n + 1))
  end
  nexus["lumen/runtime"].char = char
  local function code(str, n)
    local _g55
    if n then
      _g55 = n + 1
    end
    return(string.byte(str, _g55))
  end
  nexus["lumen/runtime"].code = code
  local function string_literal63(x)
    return(string63(x) and char(x, 0) == "\"")
  end
  nexus["lumen/runtime"]["string-literal?"] = string_literal63
  local function id_literal63(x)
    return(string63(x) and char(x, 0) == "|")
  end
  nexus["lumen/runtime"]["id-literal?"] = id_literal63
  local function add(l, x)
    return(table.insert(l, x))
  end
  nexus["lumen/runtime"].add = add
  local function drop(l)
    return(table.remove(l))
  end
  nexus["lumen/runtime"].drop = drop
  local function last(l)
    return(l[length(l) - 1 + 1])
  end
  nexus["lumen/runtime"].last = last
  local function reverse(l)
    local l1 = sub(l, length(l))
    local i = length(l) - 1
    while i >= 0 do
      add(l1, l[i + 1])
      i = i - 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].reverse = reverse
  local function join(l1, l2)
    if nil63(l2) and nil63(l1) then
      return({})
    else
      if nil63(l1) then
        return(join({}, l2))
      else
        if nil63(l2) then
          return(join(l1, {}))
        else
          local l = {}
          local i = 0
          local len = length(l1)
          local len2 = length(l2)
          while i < len do
            l[i + 1] = l1[i + 1]
            i = i + 1
          end
          while i < len + len2 do
            l[i + 1] = l2[i - len + 1]
            i = i + 1
          end
          local _g25 = l1
          local k = nil
          for k in next, _g25 do
            if not number63(k) then
              local v = _g25[k]
              l[k] = v
            end
          end
          local _g26 = l2
          local k = nil
          for k in next, _g26 do
            if not number63(k) then
              local v = _g26[k]
              l[k] = v
            end
          end
          return(l)
        end
      end
    end
  end
  nexus["lumen/runtime"].join = join
  local function reduce(f, x)
    if none63(x) then
      return(x)
    else
      if one63(x) then
        return(hd(x))
      else
        return(f(hd(x), reduce(f, tl(x))))
      end
    end
  end
  nexus["lumen/runtime"].reduce = reduce
  local function keep(f, l)
    local l1 = {}
    local _g27 = l
    local _g28 = 0
    while _g28 < length(_g27) do
      local x = _g27[_g28 + 1]
      if f(x) then
        add(l1, x)
      end
      _g28 = _g28 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
  local function in63(x, l)
    local _g29 = l
    local _g30 = 0
    while _g30 < length(_g29) do
      local y = _g29[_g30 + 1]
      if x == y then
        return(true)
      end
      _g30 = _g30 + 1
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, l)
    local _g31 = l
    local _g32 = 0
    while _g32 < length(_g31) do
      local x = _g31[_g32 + 1]
      local _g33 = f(x)
      if _g33 then
        return(_g33)
      end
      _g32 = _g32 + 1
    end
  end
  nexus["lumen/runtime"].find = find
  local function pair(l)
    local i = 0
    local l1 = {}
    while i < length(l) do
      add(l1, {l[i + 1], l[i + 1 + 1]})
      i = i + 2
    end
    return(l1)
  end
  nexus["lumen/runtime"].pair = pair
  local function sort(l, f)
    table.sort(l, f)
    return(l)
  end
  nexus["lumen/runtime"].sort = sort
  local function iterate(f, count)
    local i = 0
    while i < count do
      f(i)
      i = i + 1
    end
  end
  nexus["lumen/runtime"].iterate = iterate
  local function replicate(n, x)
    local l = {}
    iterate(function ()
      return(add(l, x))
    end, n)
    return(l)
  end
  nexus["lumen/runtime"].replicate = replicate
  local function map(f, t)
    local t1 = {}
    local _g34 = t
    local _g35 = 0
    while _g35 < length(_g34) do
      local x = _g34[_g35 + 1]
      local _g36 = f(x)
      if is63(_g36) then
        add(t1, _g36)
      end
      _g35 = _g35 + 1
    end
    local _g37 = t
    local k = nil
    for k in next, _g37 do
      if not number63(k) then
        local v = _g37[k]
        local x = f(v)
        if is63(x) then
          t1[k] = x
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].map = map
  local function keys63(t)
    local k63 = false
    local _g38 = t
    local k = nil
    for k in next, _g38 do
      if not number63(k) then
        local v = _g38[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  nexus["lumen/runtime"]["keys?"] = keys63
  local function empty63(t)
    return(none63(t) and not keys63(t))
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g39 = args
      local k = nil
      for k in next, _g39 do
        if not number63(k) then
          local v = _g39[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  nexus["lumen/runtime"].stash = stash
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = sub(args, 0, length(args) - 1)
        local _g40 = l
        local k = nil
        for k in next, _g40 do
          if not number63(k) then
            local v = _g40[k]
            if not (k == "_stash") then
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
  nexus["lumen/runtime"].unstash = unstash
  local function search(str, pattern, start)
    local _g56
    if start then
      _g56 = start + 1
    end
    local _g41 = _g56
    local i = string.find(str, pattern, _g41, true)
    return(i and i - 1)
  end
  nexus["lumen/runtime"].search = search
  local function split(str, sep)
    if str == "" or sep == "" then
      return({})
    else
      local strs = {}
      while true do
        local i = search(str, sep)
        if nil63(i) then
          break
        else
          add(strs, sub(str, 0, i))
          str = sub(str, i + 1)
        end
      end
      add(strs, str)
      return(strs)
    end
  end
  nexus["lumen/runtime"].split = split
  local function cat(...)
    local xs = unstash({...})
    local _g42 = sub(xs, 0)
    if none63(_g42) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g42))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g43 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g43))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g44 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g44)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g45 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g45))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g46)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g47)))
  end
  nexus["lumen/runtime"]["%"] = _37
  local function _62(a, b)
    return(a > b)
  end
  nexus["lumen/runtime"][">"] = _62
  local function _60(a, b)
    return(a < b)
  end
  nexus["lumen/runtime"]["<"] = _60
  local function _61(a, b)
    return(a == b)
  end
  nexus["lumen/runtime"]["="] = _61
  local function _6261(a, b)
    return(a >= b)
  end
  nexus["lumen/runtime"][">="] = _6261
  local function _6061(a, b)
    return(a <= b)
  end
  nexus["lumen/runtime"]["<="] = _6061
  local function read_file(path)
    local f = io.open(path)
    return(f.read(f, "*a"))
  end
  nexus["lumen/runtime"]["read-file"] = read_file
  local function write_file(path, data)
    local f = io.open(path, "w")
    return(f.write(f, data))
  end
  nexus["lumen/runtime"]["write-file"] = write_file
  local function write(x)
    return(io.write(x))
  end
  nexus["lumen/runtime"].write = write
  local function exit(code)
    return(os.exit(code))
  end
  nexus["lumen/runtime"].exit = exit
  local function today()
    return(os.date("!%F"))
  end
  nexus["lumen/runtime"].today = today
  local function now()
    return(os.time())
  end
  nexus["lumen/runtime"].now = now
  local function number(str)
    return(tonumber(str))
  end
  nexus["lumen/runtime"].number = number
  local function string(x)
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
            return(x .. "")
          else
            local str = "("
            local x1 = sub(x)
            local _g48 = x
            local k = nil
            for k in next, _g48 do
              if not number63(k) then
                local v = _g48[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g49 = x1
            local i = 0
            while i < length(_g49) do
              local y = _g49[i + 1]
              str = str .. string(y)
              if i < length(x1) - 1 then
                str = str .. " "
              end
              i = i + 1
            end
            return(str .. ")")
          end
        end
      end
    end
  end
  nexus["lumen/runtime"].string = string
  local function space(xs)
    local function string(x)
      if string_literal63(x) or list63(x) and hd(x) == "cat" then
        return(x)
      else
        return({"string", x})
      end
    end
    if one63(xs) then
      return(string(hd(xs)))
    else
      return(reduce(function (a, b)
        return({"cat", string(a), "\" \"", string(b)})
      end, xs))
    end
  end
  nexus["lumen/runtime"].space = space
  local function apply(f, args)
    local _g50 = stash(args)
    return(f(unpack(_g50)))
  end
  nexus["lumen/runtime"].apply = apply
  local id_count = 0
  nexus["lumen/runtime"]["id-count"] = id_count
  local function make_id()
    id_count = id_count + 1
    return("_g" .. id_count)
  end
  nexus["lumen/runtime"]["make-id"] = make_id
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, i + 2))
  end
  nexus["lumen/runtime"]["%message-handler"] = _37message_handler
  local function toplevel63()
    return(one63(environment))
  end
  nexus["lumen/runtime"]["toplevel?"] = toplevel63
  local function module_key(spec)
    if atom63(spec) then
      return(string(spec))
    else
      return(reduce(function (a, b)
        return(module_key(a) .. "/" .. module_key(b))
      end, spec))
    end
  end
  nexus["lumen/runtime"]["module-key"] = module_key
  local function module(spec)
    return(modules[module_key(spec)])
  end
  nexus["lumen/runtime"].module = module
  local function setenv(k, ...)
    local keys = unstash({...})
    local _g51 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g52 = _g51
      local k1 = nil
      for k1 in next, _g52 do
        if not number63(k1) then
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
  nexus["lumen/runtime"].setenv = setenv
end)();
(function ()
  nexus["lumen/lib"] = {}
  local _g61 = nexus["lumen/runtime"]
  local nil63 = _g61["nil?"]
  local is63 = _g61["is?"]
  local length = _g61.length
  local none63 = _g61["none?"]
  local some63 = _g61["some?"]
  local one63 = _g61["one?"]
  local hd = _g61.hd
  local string63 = _g61["string?"]
  local number63 = _g61["number?"]
  local boolean63 = _g61["boolean?"]
  local function63 = _g61["function?"]
  local composite63 = _g61["composite?"]
  local atom63 = _g61["atom?"]
  local table63 = _g61["table?"]
  local list63 = _g61["list?"]
  local substring = _g61.substring
  local sub = _g61.sub
  local inner = _g61.inner
  local tl = _g61.tl
  local char = _g61.char
  local code = _g61.code
  local string_literal63 = _g61["string-literal?"]
  local id_literal63 = _g61["id-literal?"]
  local add = _g61.add
  local drop = _g61.drop
  local last = _g61.last
  local reverse = _g61.reverse
  local join = _g61.join
  local reduce = _g61.reduce
  local keep = _g61.keep
  local in63 = _g61["in?"]
  local find = _g61.find
  local pair = _g61.pair
  local sort = _g61.sort
  local iterate = _g61.iterate
  local replicate = _g61.replicate
  local map = _g61.map
  local keys63 = _g61["keys?"]
  local empty63 = _g61["empty?"]
  local stash = _g61.stash
  local unstash = _g61.unstash
  local search = _g61.search
  local split = _g61.split
  local cat = _g61.cat
  local _43 = _g61["+"]
  local _ = _g61["-"]
  local _42 = _g61["*"]
  local _47 = _g61["/"]
  local _37 = _g61["%"]
  local _62 = _g61[">"]
  local _60 = _g61["<"]
  local _61 = _g61["="]
  local _6261 = _g61[">="]
  local _6061 = _g61["<="]
  local read_file = _g61["read-file"]
  local write_file = _g61["write-file"]
  local write = _g61.write
  local exit = _g61.exit
  local today = _g61.today
  local now = _g61.now
  local number = _g61.number
  local string = _g61.string
  local space = _g61.space
  local apply = _g61.apply
  local make_id = _g61["make-id"]
  local _37message_handler = _g61["%message-handler"]
  local toplevel63 = _g61["toplevel?"]
  local module_key = _g61["module-key"]
  local module = _g61.module
  local setenv = _g61.setenv
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g64 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g65 = nil
        local _g66 = _g64
        local x = nil
        for x in next, _g66 do
          if not number63(x) then
            local _g57 = _g66[x]
            _g65 = x
          end
        end
        if _g65 then
          return(b[_g65])
        else
          return(b)
        end
      end
    end
  end
  nexus["lumen/lib"].getenv = getenv
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  nexus["lumen/lib"]["macro-function"] = macro_function
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  nexus["lumen/lib"]["macro?"] = macro63
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  nexus["lumen/lib"]["special?"] = special63
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  nexus["lumen/lib"]["special-form?"] = special_form63
  local function statement63(k)
    return(special63(k) and getenv(k, {_stash = true, stmt = true}))
  end
  nexus["lumen/lib"]["statement?"] = statement63
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  nexus["lumen/lib"]["symbol-expansion"] = symbol_expansion
  local function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  nexus["lumen/lib"]["symbol?"] = symbol63
  local function variable63(k)
    local b = find(function (frame)
      return(frame[k] or frame._scope)
    end, reverse(environment))
    return(table63(b) and is63(b.variable))
  end
  nexus["lumen/lib"]["variable?"] = variable63
  local function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  nexus["lumen/lib"]["global?"] = global63
  local function bound63(x)
    return(macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x))
  end
  nexus["lumen/lib"]["bound?"] = bound63
  local function escape(str)
    local str1 = "\""
    local i = 0
    while i < length(str) do
      local c = char(str, i)
      local _g101
      if c == "\n" then
        _g101 = "\\n"
      else
        local _g102
        if c == "\"" then
          _g102 = "\\\""
        else
          local _g103
          if c == "\\" then
            _g103 = "\\\\"
          else
            _g103 = c
          end
          _g102 = _g103
        end
        _g101 = _g102
      end
      local c1 = _g101
      str1 = str1 .. c1
      i = i + 1
    end
    return(str1 .. "\"")
  end
  nexus["lumen/lib"].escape = escape
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
  nexus["lumen/lib"].quoted = quoted
  local function literal(s)
    if string_literal63(s) then
      return(s)
    else
      return(quoted(s))
    end
  end
  nexus["lumen/lib"].literal = literal
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "\"_stash\"", true}
      local _g67 = args
      local k = nil
      for k in next, _g67 do
        if not number63(k) then
          local v = _g67[k]
          add(l, literal(k))
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  nexus["lumen/lib"]["stash*"] = stash42
  local function bind(lh, rh)
    if composite63(lh) and list63(rh) then
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local r = lh.rest
        local _g68 = lh
        local i = 0
        while i < length(_g68) do
          local x = _g68[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g69 = lh
        local k = nil
        for k in next, _g69 do
          if not number63(k) then
            local v = _g69[k]
            if v == true then
              v = k
            end
            if not (k == "rest") then
              bs = join(bs, bind(v, {"get", rh, {"quote", k}}))
            end
          end
        end
        return(bs)
      end
    end
  end
  nexus["lumen/lib"].bind = bind
  local function bind42(args, body)
    local args1 = {}
    local function rest()
      if target == "js" then
        return({"unstash", {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", length(args1)}})
      else
        add(args1, "|...|")
        return({"unstash", {"list", "|...|"}})
      end
    end
    if atom63(args) then
      return({args1, {join({"let", {args, rest()}}, body)}})
    else
      local bs = {}
      local r = args.rest or keys63(args) and make_id()
      local _g70 = args
      local _g71 = 0
      while _g71 < length(_g70) do
        local arg = _g70[_g71 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g71 = _g71 + 1
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
  nexus["lumen/lib"]["bind*"] = bind42
  local function quoting63(depth)
    return(number63(depth))
  end
  nexus["lumen/lib"]["quoting?"] = quoting63
  local function quasiquoting63(depth)
    return(quoting63(depth) and depth > 0)
  end
  nexus["lumen/lib"]["quasiquoting?"] = quasiquoting63
  local function can_unquote63(depth)
    return(quoting63(depth) and depth == 1)
  end
  nexus["lumen/lib"]["can-unquote?"] = can_unquote63
  local function quasisplice63(x, depth)
    return(list63(x) and can_unquote63(depth) and hd(x) == "unquote-splicing")
  end
  nexus["lumen/lib"]["quasisplice?"] = quasisplice63
  local function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    else
      if atom63(form) then
        return(form)
      else
        local x = hd(form)
        if x == "%local" then
          local _g58 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g59 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g74 = args
            local _g75 = 0
            while _g75 < length(_g74) do
              local _g72 = _g74[_g75 + 1]
              setenv(_g72, {_stash = true, variable = true})
              _g75 = _g75 + 1
            end
            local _g73 = join({"%function", map(macroexpand, args)}, macroexpand(body))
            drop(environment)
            return(_g73)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g60 = form[1]
              local _g76 = form[2]
              local _g77 = form[3]
              local _g78 = sub(form, 3)
              add(environment, {_scope = true})
              local _g81 = _g77
              local _g82 = 0
              while _g82 < length(_g81) do
                local _g79 = _g81[_g82 + 1]
                setenv(_g79, {_stash = true, variable = true})
                _g82 = _g82 + 1
              end
              local _g80 = join({x, _g76, map(macroexpand, _g77)}, macroexpand(_g78))
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
  end
  nexus["lumen/lib"].macroexpand = macroexpand
  local quasiexpand
  nexus["lumen/lib"].quasiexpand = quasiexpand
  local quasiquote_list
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g83 = form
    local k = nil
    for k in next, _g83 do
      if not number63(k) then
        local v = _g83[k]
        local _g104
        if quasisplice63(v, depth) then
          _g104 = quasiexpand(v[2])
        else
          _g104 = quasiexpand(v, depth)
        end
        local _g84 = _g104
        last(xs)[k] = _g84
      end
    end
    local _g85 = form
    local _g86 = 0
    while _g86 < length(_g85) do
      local x = _g85[_g86 + 1]
      if quasisplice63(x, depth) then
        local _g87 = quasiexpand(x[2])
        add(xs, _g87)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g86 = _g86 + 1
    end
    local pruned = keep(function (x)
      return(length(x) > 1 or not (hd(x) == "list") or keys63(x))
    end, xs)
    return(join({"join*"}, pruned))
  end
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list
  quasiexpand = function (form, depth)
    if quasiquoting63(depth) then
      if atom63(form) then
        return({"quote", form})
      else
        if can_unquote63(depth) and hd(form) == "unquote" then
          return(quasiexpand(form[2]))
        else
          if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
            return(quasiquote_list(form, depth - 1))
          else
            if hd(form) == "quasiquote" then
              return(quasiquote_list(form, depth + 1))
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
        if hd(form) == "quote" then
          return(form)
        else
          if hd(form) == "quasiquote" then
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
  nexus["lumen/lib"].quasiexpand = quasiexpand
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  nexus["lumen/lib"].indentation = indentation
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
  nexus["lumen/lib"].reserved = reserved
  local function reserved63(x)
    return(reserved[x])
  end
  nexus["lumen/lib"]["reserved?"] = reserved63
  local function numeric63(n)
    return(n > 47 and n < 58)
  end
  nexus["lumen/lib"]["numeric?"] = numeric63
  local function valid_code63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
  nexus["lumen/lib"]["valid-code?"] = valid_code63
  local function valid_id63(id)
    if none63(id) or reserved63(id) then
      return(false)
    else
      local i = 0
      while i < length(id) do
        if not valid_code63(code(id, i)) then
          return(false)
        end
        i = i + 1
      end
      return(true)
    end
  end
  nexus["lumen/lib"]["valid-id?"] = valid_id63
  local function id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _g105
      if c == "-" then
        _g105 = "_"
      else
        local _g106
        if valid_code63(n) then
          _g106 = c
        else
          local _g107
          if i == 0 then
            _g107 = "_" .. n
          else
            _g107 = n
          end
          _g106 = _g107
        end
        _g105 = _g106
      end
      local c1 = _g105
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  nexus["lumen/lib"].id = id
  local function key(k)
    local function wrap(s)
      if target == "lua" then
        return("[" .. s .. "]")
      else
        return(s)
      end
    end
    local i = inner(k)
    if valid_id63(i) then
      return(i)
    else
      return(wrap(k))
    end
  end
  nexus["lumen/lib"].key = key
  local function imported(spec, ...)
    local _g92 = unstash({...})
    local all = _g92.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g93 = module(spec).export
      local n = nil
      for n in next, _g93 do
        if not number63(n) then
          local b = _g93[n]
          if b.variable and (all or b.export) then
            add(imports, {"%local", n, {"get", m, {"quote", n}}})
          end
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, imports))
    end
  end
  nexus["lumen/lib"].imported = imported
  local function link(name, form)
    if toplevel63() then
      local k = module_key(current_module)
      return({"do", form, {"set", {"get", {"get", "nexus", {"quote", k}}, {"quote", name}}, name}})
    else
      return(form)
    end
  end
  nexus["lumen/lib"].link = link
  local function extend(t, ...)
    local xs = unstash({...})
    local _g94 = sub(xs, 0)
    return(join(t, _g94))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g95 = sub(keys, 0)
    local t1 = {}
    local _g96 = t
    local _g97 = 0
    while _g97 < length(_g96) do
      local x = _g96[_g97 + 1]
      add(t1, x)
      _g97 = _g97 + 1
    end
    local _g98 = t
    local k = nil
    for k in next, _g98 do
      if not number63(k) then
        local v = _g98[k]
        if not _g95[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/lib"].exclude = exclude
  local function quote_binding(b)
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
    else
      if b.macro and b.form then
        return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
      else
        if b.special and b.form then
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
  nexus["lumen/lib"]["quote-binding"] = quote_binding
  local function mapo(f, t)
    local o = {}
    local _g99 = t
    local k = nil
    for k in next, _g99 do
      if not number63(k) then
        local v = _g99[k]
        local x = f(v)
        if is63(x) then
          add(o, literal(k))
          add(o, x)
        end
      end
    end
    return(o)
  end
  nexus["lumen/lib"].mapo = mapo
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  nexus["lumen/lib"]["quote-frame"] = quote_frame
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  nexus["lumen/lib"]["quote-environment"] = quote_environment
  local function quote_module(m)
    local _g100 = {"table"}
    _g100.import = quoted(m.import)
    _g100.alias = quoted(m.alias)
    _g100.export = quote_frame(m.export)
    return(_g100)
  end
  nexus["lumen/lib"]["quote-module"] = quote_module
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  nexus["lumen/lib"]["quote-modules"] = quote_modules
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  nexus["lumen/lib"]["initial-environment"] = initial_environment
end)();
(function ()
  nexus["lumen/reader"] = {}
  local _g108 = nexus["lumen/runtime"]
  local nil63 = _g108["nil?"]
  local is63 = _g108["is?"]
  local length = _g108.length
  local none63 = _g108["none?"]
  local some63 = _g108["some?"]
  local one63 = _g108["one?"]
  local hd = _g108.hd
  local string63 = _g108["string?"]
  local number63 = _g108["number?"]
  local boolean63 = _g108["boolean?"]
  local function63 = _g108["function?"]
  local composite63 = _g108["composite?"]
  local atom63 = _g108["atom?"]
  local table63 = _g108["table?"]
  local list63 = _g108["list?"]
  local substring = _g108.substring
  local sub = _g108.sub
  local inner = _g108.inner
  local tl = _g108.tl
  local char = _g108.char
  local code = _g108.code
  local string_literal63 = _g108["string-literal?"]
  local id_literal63 = _g108["id-literal?"]
  local add = _g108.add
  local drop = _g108.drop
  local last = _g108.last
  local reverse = _g108.reverse
  local join = _g108.join
  local reduce = _g108.reduce
  local keep = _g108.keep
  local in63 = _g108["in?"]
  local find = _g108.find
  local pair = _g108.pair
  local sort = _g108.sort
  local iterate = _g108.iterate
  local replicate = _g108.replicate
  local map = _g108.map
  local keys63 = _g108["keys?"]
  local empty63 = _g108["empty?"]
  local stash = _g108.stash
  local unstash = _g108.unstash
  local search = _g108.search
  local split = _g108.split
  local cat = _g108.cat
  local _43 = _g108["+"]
  local _ = _g108["-"]
  local _42 = _g108["*"]
  local _47 = _g108["/"]
  local _37 = _g108["%"]
  local _62 = _g108[">"]
  local _60 = _g108["<"]
  local _61 = _g108["="]
  local _6261 = _g108[">="]
  local _6061 = _g108["<="]
  local read_file = _g108["read-file"]
  local write_file = _g108["write-file"]
  local write = _g108.write
  local exit = _g108.exit
  local today = _g108.today
  local now = _g108.now
  local number = _g108.number
  local string = _g108.string
  local space = _g108.space
  local apply = _g108.apply
  local make_id = _g108["make-id"]
  local _37message_handler = _g108["%message-handler"]
  local toplevel63 = _g108["toplevel?"]
  local module_key = _g108["module-key"]
  local module = _g108.module
  local setenv = _g108.setenv
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({pos = 0, string = str, len = length(str)})
  end
  nexus["lumen/reader"]["make-stream"] = make_stream
  local function peek_char(s)
    if s.pos < s.len then
      return(char(s.string, s.pos))
    end
  end
  nexus["lumen/reader"]["peek-char"] = peek_char
  local function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = s.pos + 1
      return(c)
    end
  end
  nexus["lumen/reader"]["read-char"] = read_char
  local function skip_non_code(s)
    while true do
      local c = peek_char(s)
      if nil63(c) then
        break
      else
        if whitespace[c] then
          read_char(s)
        else
          if c == ";" then
            while c and not (c == "\n") do
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
  nexus["lumen/reader"]["skip-non-code"] = skip_non_code
  local read_table = {}
  nexus["lumen/reader"]["read-table"] = read_table
  local eof = {}
  nexus["lumen/reader"].eof = eof
  local function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return((read_table[c] or read_table[""])(s))
    else
      return(eof)
    end
  end
  nexus["lumen/reader"].read = read
  local function read_all(s)
    local l = {}
    while true do
      local form = read(s)
      if form == eof then
        break
      end
      add(l, form)
    end
    return(l)
  end
  nexus["lumen/reader"]["read-all"] = read_all
  local function read_from_string(str)
    local x = read(make_stream(str))
    if x ~= eof then
      return(x)
    end
  end
  nexus["lumen/reader"]["read-from-string"] = read_from_string
  local function key63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, length(atom) - 1) == ":")
  end
  nexus["lumen/reader"]["key?"] = key63
  local function flag63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, 0) == ":")
  end
  nexus["lumen/reader"]["flag?"] = flag63
  read_table[""] = function (s)
    local str = ""
    local dot63 = false
    while true do
      local c = peek_char(s)
      if c and (not whitespace[c] and not delimiters[c]) then
        if c == "." then
          dot63 = true
        end
        str = str .. c
        read_char(s)
      else
        break
      end
    end
    local n = number(str)
    if is63(n) then
      return(n)
    else
      if str == "true" then
        return(true)
      else
        if str == "false" then
          return(false)
        else
          if str == "_" then
            return(make_id())
          else
            if dot63 and not one63(str) then
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
      if c and not (c == ")") then
        local x = read(s)
        if key63(x) then
          local k = sub(x, 0, length(x) - 1)
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
          error("Expected ) at " .. s.pos)
        end
      end
    end
    return(l)
  end
  read_table[")"] = function (s)
    error("Unexpected ) at " .. s.pos)
  end
  read_table["\""] = function (s)
    read_char(s)
    local str = "\""
    while true do
      local c = peek_char(s)
      if c and not (c == "\"") then
        if c == "\\" then
          str = str .. read_char(s)
        end
        str = str .. read_char(s)
      else
        if c then
          read_char(s)
          break
        else
          error("Expected \" at " .. s.pos)
        end
      end
    end
    return(str .. "\"")
  end
  read_table["|"] = function (s)
    read_char(s)
    local str = "|"
    while true do
      local c = peek_char(s)
      if c and not (c == "|") then
        str = str .. read_char(s)
      else
        if c then
          read_char(s)
          break
        else
          error("Expected | at " .. s.pos)
        end
      end
    end
    return(str .. "|")
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
    if peek_char(s) == "@" then
      read_char(s)
      return({"unquote-splicing", read(s)})
    else
      return({"unquote", read(s)})
    end
  end
end)();
(function ()
  nexus["lumen/compiler"] = {}
  local _g119 = nexus["lumen/runtime"]
  local nil63 = _g119["nil?"]
  local is63 = _g119["is?"]
  local length = _g119.length
  local none63 = _g119["none?"]
  local some63 = _g119["some?"]
  local one63 = _g119["one?"]
  local hd = _g119.hd
  local string63 = _g119["string?"]
  local number63 = _g119["number?"]
  local boolean63 = _g119["boolean?"]
  local function63 = _g119["function?"]
  local composite63 = _g119["composite?"]
  local atom63 = _g119["atom?"]
  local table63 = _g119["table?"]
  local list63 = _g119["list?"]
  local substring = _g119.substring
  local sub = _g119.sub
  local inner = _g119.inner
  local tl = _g119.tl
  local char = _g119.char
  local code = _g119.code
  local string_literal63 = _g119["string-literal?"]
  local id_literal63 = _g119["id-literal?"]
  local add = _g119.add
  local drop = _g119.drop
  local last = _g119.last
  local reverse = _g119.reverse
  local join = _g119.join
  local reduce = _g119.reduce
  local keep = _g119.keep
  local in63 = _g119["in?"]
  local find = _g119.find
  local pair = _g119.pair
  local sort = _g119.sort
  local iterate = _g119.iterate
  local replicate = _g119.replicate
  local map = _g119.map
  local keys63 = _g119["keys?"]
  local empty63 = _g119["empty?"]
  local stash = _g119.stash
  local unstash = _g119.unstash
  local search = _g119.search
  local split = _g119.split
  local cat = _g119.cat
  local _43 = _g119["+"]
  local _ = _g119["-"]
  local _42 = _g119["*"]
  local _47 = _g119["/"]
  local _37 = _g119["%"]
  local _62 = _g119[">"]
  local _60 = _g119["<"]
  local _61 = _g119["="]
  local _6261 = _g119[">="]
  local _6061 = _g119["<="]
  local read_file = _g119["read-file"]
  local write_file = _g119["write-file"]
  local write = _g119.write
  local exit = _g119.exit
  local today = _g119.today
  local now = _g119.now
  local number = _g119.number
  local string = _g119.string
  local space = _g119.space
  local apply = _g119.apply
  local make_id = _g119["make-id"]
  local _37message_handler = _g119["%message-handler"]
  local toplevel63 = _g119["toplevel?"]
  local module_key = _g119["module-key"]
  local module = _g119.module
  local setenv = _g119.setenv
  local _g122 = nexus["lumen/lib"]
  local getenv = _g122.getenv
  local macro_function = _g122["macro-function"]
  local macro63 = _g122["macro?"]
  local special63 = _g122["special?"]
  local special_form63 = _g122["special-form?"]
  local statement63 = _g122["statement?"]
  local symbol_expansion = _g122["symbol-expansion"]
  local symbol63 = _g122["symbol?"]
  local variable63 = _g122["variable?"]
  local bound63 = _g122["bound?"]
  local quoted = _g122.quoted
  local stash42 = _g122["stash*"]
  local bind = _g122.bind
  local bind42 = _g122["bind*"]
  local quasiexpand = _g122.quasiexpand
  local macroexpand = _g122.macroexpand
  local indentation = _g122.indentation
  local reserved63 = _g122["reserved?"]
  local valid_id63 = _g122["valid-id?"]
  local id = _g122.id
  local key = _g122.key
  local imported = _g122.imported
  local link = _g122.link
  local mapo = _g122.mapo
  local quote_environment = _g122["quote-environment"]
  local quote_modules = _g122["quote-modules"]
  local initial_environment = _g122["initial-environment"]
  local _g123 = nexus["lumen/reader"]
  local make_stream = _g123["make-stream"]
  local read_table = _g123["read-table"]
  local read = _g123.read
  local read_all = _g123["read-all"]
  local read_from_string = _g123["read-from-string"]
  local _g127 = {}
  _g127.js = "!"
  _g127.lua = "not "
  local _g125 = {}
  local _g128 = {}
  _g128.js = "!"
  _g128.lua = "not "
  _g125["not"] = _g128
  local _g130 = {}
  _g130["*"] = true
  _g130["/"] = true
  _g130["%"] = true
  local _g132 = {}
  _g132["+"] = true
  _g132["-"] = true
  local _g136 = {}
  _g136.js = "+"
  _g136.lua = ".."
  local _g134 = {}
  local _g137 = {}
  _g137.js = "+"
  _g137.lua = ".."
  _g134.cat = _g137
  local _g139 = {}
  _g139["<"] = true
  _g139[">"] = true
  _g139["<="] = true
  _g139[">="] = true
  local _g143 = {}
  _g143.js = "==="
  _g143.lua = "=="
  local _g145 = {}
  _g145.js = "!="
  _g145.lua = "~="
  local _g141 = {}
  local _g146 = {}
  _g146.js = "==="
  _g146.lua = "=="
  _g141["="] = _g146
  local _g147 = {}
  _g147.js = "!="
  _g147.lua = "~="
  _g141["~="] = _g147
  local _g151 = {}
  _g151.js = "&&"
  _g151.lua = "and"
  local _g149 = {}
  local _g152 = {}
  _g152.js = "&&"
  _g152.lua = "and"
  _g149["and"] = _g152
  local _g156 = {}
  _g156.js = "||"
  _g156.lua = "or"
  local _g154 = {}
  local _g157 = {}
  _g157.js = "||"
  _g157.lua = "or"
  _g154["or"] = _g157
  local infix = {_g125, _g130, _g132, _g134, _g139, _g141, _g149, _g154}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g158 = infix
      local i = 0
      while i < length(_g158) do
        local level = _g158[i + 1]
        if level[hd(form)] then
          return(i)
        end
        i = i + 1
      end
    end
    return(0)
  end
  nexus["lumen/compiler"].precedence = precedence
  local function getop(op)
    return(find(function (level)
      local x = level[op]
      if x == true then
        return(op)
      else
        if is63(x) then
          return(x[target])
        end
      end
    end, infix))
  end
  nexus["lumen/compiler"].getop = getop
  local function infix63(x)
    return(is63(getop(x)))
  end
  nexus["lumen/compiler"]["infix?"] = infix63
  local compile
  nexus["lumen/compiler"].compile = compile
  local function compile_args(args)
    local str = "("
    local _g159 = args
    local i = 0
    while i < length(_g159) do
      local arg = _g159[i + 1]
      str = str .. compile(arg)
      if i < length(args) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. ")")
  end
  nexus["lumen/compiler"]["compile-args"] = compile_args
  local function compile_atom(x)
    if x == "nil" and target == "lua" then
      return(x)
    else
      if x == "nil" then
        return("undefined")
      else
        if id_literal63(x) then
          return(inner(x))
        else
          if string_literal63(x) then
            return(x)
          else
            if string63(x) then
              return(id(x))
            else
              if boolean63(x) then
                if x then
                  return("true")
                else
                  return("false")
                end
              else
                if number63(x) then
                  return(x .. "")
                else
                  error("Cannot compile atom: " .. string(x))
                end
              end
            end
          end
        end
      end
    end
  end
  nexus["lumen/compiler"]["compile-atom"] = compile_atom
  local function terminator(stmt63)
    if not stmt63 then
      return("")
    else
      if target == "js" then
        return(";\n")
      else
        return("\n")
      end
    end
  end
  nexus["lumen/compiler"].terminator = terminator
  local function compile_special(form, stmt63)
    local x = form[1]
    local args = sub(form, 1)
    local _g160 = getenv(x)
    local special = _g160.special
    local stmt = _g160.stmt
    local self_tr63 = _g160.tr
    local tr = terminator(stmt63 and not self_tr63)
    return(apply(special, args) .. tr)
  end
  nexus["lumen/compiler"]["compile-special"] = compile_special
  local function parenthesize_call63(x)
    return(list63(x) and (hd(x) == "%function" or precedence(x) > 0))
  end
  nexus["lumen/compiler"]["parenthesize-call?"] = parenthesize_call63
  local function compile_call(form)
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(stash42(tl(form)))
    if parenthesize_call63(f) then
      return("(" .. f1 .. ")" .. args)
    else
      return(f1 .. args)
    end
  end
  nexus["lumen/compiler"]["compile-call"] = compile_call
  local function op_delims(parent, child, ...)
    local _g161 = unstash({...})
    local right = _g161.right
    local _g188
    if right then
      _g188 = _6261
    else
      _g188 = _62
    end
    if _g188(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g162 = sub(form, 1)
    local a = _g162[1]
    local b = _g162[2]
    local _g163 = op_delims(form, a)
    local ao = _g163[1]
    local ac = _g163[2]
    local _g164 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g164[1]
    local bc = _g164[2]
    local _g165 = compile(a)
    local _g166 = compile(b)
    local _g167 = getop(op)
    if unary63(form) then
      return(_g167 .. ao .. _g165 .. ac)
    else
      return(ao .. _g165 .. ac .. " " .. _g167 .. " " .. bo .. _g166 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g168 = unstash({...})
    local name = _g168.name
    local prefix = _g168.prefix
    local _g189
    if name then
      _g189 = compile(name)
    else
      _g189 = ""
    end
    local id = _g189
    local _g169 = prefix or ""
    local _g170 = compile_args(args)
    indent_level = indent_level + 1
    local _g172 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g171 = _g172
    local ind = indentation()
    local _g190
    if target == "js" then
      _g190 = ""
    else
      _g190 = "end"
    end
    local tr = _g190
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g170 .. " {\n" .. _g171 .. ind .. "}" .. tr)
    else
      return(_g169 .. "function " .. id .. _g170 .. "\n" .. _g171 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g173 = unstash({...})
    local stmt = _g173.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g191
        if stmt then
          _g191 = indentation()
        else
          _g191 = ""
        end
        local ind = _g191
        local _g192
        if atom63(form) then
          _g192 = compile_atom(form)
        else
          local _g193
          if infix63(hd(form)) then
            _g193 = compile_infix(form)
          else
            _g193 = compile_call(form)
          end
          _g192 = _g193
        end
        local _g174 = _g192
        return(ind .. _g174 .. tr)
      end
    end
  end
  nexus["lumen/compiler"].compile = compile
  local lower
  nexus["lumen/compiler"].lower = lower
  local function lower_statement(form, tail63)
    local hoist = {}
    local e = lower(form, hoist, true, tail63)
    if some63(hoist) and is63(e) then
      return(join({"do"}, join(hoist, {e})))
    else
      if is63(e) then
        return(e)
      else
        if length(hoist) > 1 then
          return(join({"do"}, hoist))
        else
          return(hd(hoist))
        end
      end
    end
  end
  nexus["lumen/compiler"]["lower-statement"] = lower_statement
  local function lower_body(body, tail63)
    return(lower_statement(join({"do"}, body), tail63))
  end
  nexus["lumen/compiler"]["lower-body"] = lower_body
  local function lower_do(args, hoist, stmt63, tail63)
    local _g175 = sub(args, 0, length(args) - 1)
    local _g176 = 0
    while _g176 < length(_g175) do
      local x = _g175[_g176 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g176 = _g176 + 1
    end
    local e = lower(last(args), hoist, stmt63, tail63)
    if tail63 and can_return63(e) then
      return({"return", e})
    else
      return(e)
    end
  end
  nexus["lumen/compiler"]["lower-do"] = lower_do
  local function lower_if(args, hoist, stmt63, tail63)
    local cond = args[1]
    local _g177 = args[2]
    local _g178 = args[3]
    if stmt63 or tail63 then
      local _g195
      if _g178 then
        _g195 = {lower_body({_g178}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g177}, tail63)}, _g195)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g194
      if _g178 then
        _g194 = {lower({"set", e, _g178})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g177})}, _g194))
      return(e)
    end
  end
  nexus["lumen/compiler"]["lower-if"] = lower_if
  local function lower_short(x, args, hoist)
    local a = args[1]
    local b = args[2]
    local hoist1 = {}
    local b1 = lower(b, hoist1)
    if some63(hoist1) then
      local id = make_id()
      local _g196
      if x == "and" then
        _g196 = {"%if", id, b, id}
      else
        _g196 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g196}, hoist))
    else
      return({x, lower(a, hoist), b1})
    end
  end
  nexus["lumen/compiler"]["lower-short"] = lower_short
  local function lower_try(args, hoist, tail63)
    return(add(hoist, {"%try", lower_body(args, tail63)}))
  end
  nexus["lumen/compiler"]["lower-try"] = lower_try
  local function lower_while(args, hoist)
    local c = args[1]
    local body = sub(args, 1)
    return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
  end
  nexus["lumen/compiler"]["lower-while"] = lower_while
  local function lower_for(args, hoist)
    local t = args[1]
    local k = args[2]
    local body = sub(args, 2)
    return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
  end
  nexus["lumen/compiler"]["lower-for"] = lower_for
  local function lower_function(args)
    local a = args[1]
    local body = sub(args, 1)
    return({"%function", a, lower_body(body, true)})
  end
  nexus["lumen/compiler"]["lower-function"] = lower_function
  local function lower_definition(kind, args, hoist)
    local name = args[1]
    local _g179 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g179, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g180 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g180) then
      return(_g180)
    end
  end
  nexus["lumen/compiler"]["lower-call"] = lower_call
  local function lower_infix63(form)
    return(infix63(hd(form)) and length(form) > 3)
  end
  nexus["lumen/compiler"]["lower-infix?"] = lower_infix63
  local function lower_infix(form, hoist)
    local x = form[1]
    local args = sub(form, 1)
    return(lower(reduce(function (a, b)
      return({x, b, a})
    end, reverse(args)), hoist))
  end
  nexus["lumen/compiler"]["lower-infix"] = lower_infix
  local function lower_special(form, hoist)
    local e = lower_call(form, hoist)
    if e then
      return(add(hoist, e))
    end
  end
  nexus["lumen/compiler"]["lower-special"] = lower_special
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
            if x == "do" then
              return(lower_do(args, hoist, stmt63, tail63))
            else
              if x == "%if" then
                return(lower_if(args, hoist, stmt63, tail63))
              else
                if x == "%try" then
                  return(lower_try(args, hoist, tail63))
                else
                  if x == "while" then
                    return(lower_while(args, hoist))
                  else
                    if x == "%for" then
                      return(lower_for(args, hoist))
                    else
                      if x == "%function" then
                        return(lower_function(args))
                      else
                        if in63(x, {"%local-function", "%global-function"}) then
                          return(lower_definition(x, args, hoist))
                        else
                          if in63(x, {"and", "or"}) then
                            return(lower_short(x, args, hoist))
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
  end
  nexus["lumen/compiler"].lower = lower
  local function process(form)
    return(lower(macroexpand(form)))
  end
  nexus["lumen/compiler"].process = process
  current_module = nil
  local function module_path(spec)
    return(module_key(spec) .. ".l")
  end
  nexus["lumen/compiler"]["module-path"] = module_path
  local function encapsulate(body)
    return({{"%function", {}, process(join({"do"}, body))}})
  end
  nexus["lumen/compiler"].encapsulate = encapsulate
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return(compile(form) .. ";\n")
  end
  nexus["lumen/compiler"]["compile-file"] = compile_file
  local function run(code)
    local f,e = load(code)
    if f then
      return(f())
    else
      error(e .. " in " .. code)
    end
  end
  nexus["lumen/compiler"].run = run
  local compiling63 = false
  nexus["lumen/compiler"]["compiling?"] = compiling63
  local compiler_output = ""
  nexus["lumen/compiler"]["compiler-output"] = compiler_output
  local function conclude(code)
    if compiling63 then
      compiler_output = compiler_output .. code
    else
      return(run(code))
    end
  end
  nexus["lumen/compiler"].conclude = conclude
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    current_module = spec
    environment = initial_environment()
    local code = compile_file(path)
    current_module = mod0
    environment = env0
    return(conclude(code))
  end
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module
  local function open_module(spec, ...)
    local _g181 = unstash({...})
    local all = _g181.all
    local m = module(spec)
    local frame = last(environment)
    local _g182 = m.export
    local k = nil
    for k in next, _g182 do
      if not number63(k) then
        local v = _g182[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g183 = unstash({...})
    local all = _g183.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = all}))
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    local _g184 = specs or {}
    local _g185 = 0
    while _g185 < length(_g184) do
      local spec = _g184[_g185 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g186 = import_modules(m.alias)
        local aliased = _g186[1]
        local bs = _g186[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g187 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g187)
      end
      _g185 = _g185 + 1
    end
    return({imports, bindings})
  end
  nexus["lumen/compiler"]["import-modules"] = import_modules
  local function compile_module(spec)
    compiling63 = true
    _37compile_module(spec)
    return(compiler_output)
  end
  nexus["lumen/compiler"]["compile-module"] = compile_module
  local function declare(form)
    return(conclude(compile(process(form), {_stash = true, stmt = true})))
  end
  nexus["lumen/compiler"].declare = declare
  local function reimported()
    local m = module(current_module)
    return(join(reduce(join, map(imported, m.import)), imported(current_module, {_stash = true, all = true})))
  end
  nexus["lumen/compiler"].reimported = reimported
  _37result = nil
  local function eval(form)
    local previous = target
    target = "lua"
    local body = join(reimported(), {{"set", "%result", form}})
    local code = compile(encapsulate(body))
    target = previous
    run(code)
    return(_37result)
  end
  nexus["lumen/compiler"].eval = eval
end)();
(function ()
  nexus["lumen/special"] = {}
  local _g197 = nexus["lumen/runtime"]
  local nil63 = _g197["nil?"]
  local is63 = _g197["is?"]
  local length = _g197.length
  local none63 = _g197["none?"]
  local some63 = _g197["some?"]
  local one63 = _g197["one?"]
  local hd = _g197.hd
  local string63 = _g197["string?"]
  local number63 = _g197["number?"]
  local boolean63 = _g197["boolean?"]
  local function63 = _g197["function?"]
  local composite63 = _g197["composite?"]
  local atom63 = _g197["atom?"]
  local table63 = _g197["table?"]
  local list63 = _g197["list?"]
  local substring = _g197.substring
  local sub = _g197.sub
  local inner = _g197.inner
  local tl = _g197.tl
  local char = _g197.char
  local code = _g197.code
  local string_literal63 = _g197["string-literal?"]
  local id_literal63 = _g197["id-literal?"]
  local add = _g197.add
  local drop = _g197.drop
  local last = _g197.last
  local reverse = _g197.reverse
  local join = _g197.join
  local reduce = _g197.reduce
  local keep = _g197.keep
  local in63 = _g197["in?"]
  local find = _g197.find
  local pair = _g197.pair
  local sort = _g197.sort
  local iterate = _g197.iterate
  local replicate = _g197.replicate
  local map = _g197.map
  local keys63 = _g197["keys?"]
  local empty63 = _g197["empty?"]
  local stash = _g197.stash
  local unstash = _g197.unstash
  local search = _g197.search
  local split = _g197.split
  local cat = _g197.cat
  local _43 = _g197["+"]
  local _ = _g197["-"]
  local _42 = _g197["*"]
  local _47 = _g197["/"]
  local _37 = _g197["%"]
  local _62 = _g197[">"]
  local _60 = _g197["<"]
  local _61 = _g197["="]
  local _6261 = _g197[">="]
  local _6061 = _g197["<="]
  local read_file = _g197["read-file"]
  local write_file = _g197["write-file"]
  local write = _g197.write
  local exit = _g197.exit
  local today = _g197.today
  local now = _g197.now
  local number = _g197.number
  local string = _g197.string
  local space = _g197.space
  local apply = _g197.apply
  local make_id = _g197["make-id"]
  local _37message_handler = _g197["%message-handler"]
  local toplevel63 = _g197["toplevel?"]
  local module_key = _g197["module-key"]
  local module = _g197.module
  local setenv = _g197.setenv
  local _g200 = nexus["lumen/lib"]
  local getenv = _g200.getenv
  local macro_function = _g200["macro-function"]
  local macro63 = _g200["macro?"]
  local special63 = _g200["special?"]
  local special_form63 = _g200["special-form?"]
  local statement63 = _g200["statement?"]
  local symbol_expansion = _g200["symbol-expansion"]
  local symbol63 = _g200["symbol?"]
  local variable63 = _g200["variable?"]
  local bound63 = _g200["bound?"]
  local quoted = _g200.quoted
  local stash42 = _g200["stash*"]
  local bind = _g200.bind
  local bind42 = _g200["bind*"]
  local quasiexpand = _g200.quasiexpand
  local macroexpand = _g200.macroexpand
  local indentation = _g200.indentation
  local reserved63 = _g200["reserved?"]
  local valid_id63 = _g200["valid-id?"]
  local id = _g200.id
  local key = _g200.key
  local imported = _g200.imported
  local link = _g200.link
  local mapo = _g200.mapo
  local quote_environment = _g200["quote-environment"]
  local quote_modules = _g200["quote-modules"]
  local initial_environment = _g200["initial-environment"]
  local _g201 = nexus["lumen/compiler"]
  local compile_function = _g201["compile-function"]
  local compile = _g201.compile
  local open_module = _g201["open-module"]
  local load_module = _g201["load-module"]
  local in_module = _g201["in-module"]
  local import_modules = _g201["import-modules"]
  local compile_module = _g201["compile-module"]
  local declare = _g201.declare
  local eval = _g201.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g375 = nexus["lumen/runtime"]
  local nil63 = _g375["nil?"]
  local is63 = _g375["is?"]
  local length = _g375.length
  local none63 = _g375["none?"]
  local some63 = _g375["some?"]
  local one63 = _g375["one?"]
  local hd = _g375.hd
  local string63 = _g375["string?"]
  local number63 = _g375["number?"]
  local boolean63 = _g375["boolean?"]
  local function63 = _g375["function?"]
  local composite63 = _g375["composite?"]
  local atom63 = _g375["atom?"]
  local table63 = _g375["table?"]
  local list63 = _g375["list?"]
  local substring = _g375.substring
  local sub = _g375.sub
  local inner = _g375.inner
  local tl = _g375.tl
  local char = _g375.char
  local code = _g375.code
  local string_literal63 = _g375["string-literal?"]
  local id_literal63 = _g375["id-literal?"]
  local add = _g375.add
  local drop = _g375.drop
  local last = _g375.last
  local reverse = _g375.reverse
  local join = _g375.join
  local reduce = _g375.reduce
  local keep = _g375.keep
  local in63 = _g375["in?"]
  local find = _g375.find
  local pair = _g375.pair
  local sort = _g375.sort
  local iterate = _g375.iterate
  local replicate = _g375.replicate
  local map = _g375.map
  local keys63 = _g375["keys?"]
  local empty63 = _g375["empty?"]
  local stash = _g375.stash
  local unstash = _g375.unstash
  local search = _g375.search
  local split = _g375.split
  local cat = _g375.cat
  local _43 = _g375["+"]
  local _ = _g375["-"]
  local _42 = _g375["*"]
  local _47 = _g375["/"]
  local _37 = _g375["%"]
  local _62 = _g375[">"]
  local _60 = _g375["<"]
  local _61 = _g375["="]
  local _6261 = _g375[">="]
  local _6061 = _g375["<="]
  local read_file = _g375["read-file"]
  local write_file = _g375["write-file"]
  local write = _g375.write
  local exit = _g375.exit
  local today = _g375.today
  local now = _g375.now
  local number = _g375.number
  local string = _g375.string
  local space = _g375.space
  local apply = _g375.apply
  local make_id = _g375["make-id"]
  local _37message_handler = _g375["%message-handler"]
  local toplevel63 = _g375["toplevel?"]
  local module_key = _g375["module-key"]
  local module = _g375.module
  local setenv = _g375.setenv
  local _g378 = nexus["lumen/lib"]
  local getenv = _g378.getenv
  local macro_function = _g378["macro-function"]
  local macro63 = _g378["macro?"]
  local special63 = _g378["special?"]
  local special_form63 = _g378["special-form?"]
  local statement63 = _g378["statement?"]
  local symbol_expansion = _g378["symbol-expansion"]
  local symbol63 = _g378["symbol?"]
  local variable63 = _g378["variable?"]
  local bound63 = _g378["bound?"]
  local quoted = _g378.quoted
  local stash42 = _g378["stash*"]
  local bind = _g378.bind
  local bind42 = _g378["bind*"]
  local quasiexpand = _g378.quasiexpand
  local macroexpand = _g378.macroexpand
  local indentation = _g378.indentation
  local reserved63 = _g378["reserved?"]
  local valid_id63 = _g378["valid-id?"]
  local id = _g378.id
  local key = _g378.key
  local imported = _g378.imported
  local link = _g378.link
  local mapo = _g378.mapo
  local quote_environment = _g378["quote-environment"]
  local quote_modules = _g378["quote-modules"]
  local initial_environment = _g378["initial-environment"]
  local _g379 = nexus["lumen/compiler"]
  local compile_function = _g379["compile-function"]
  local compile = _g379.compile
  local open_module = _g379["open-module"]
  local load_module = _g379["load-module"]
  local in_module = _g379["in-module"]
  local import_modules = _g379["import-modules"]
  local compile_module = _g379["compile-module"]
  local declare = _g379.declare
  local eval = _g379.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g677 = nexus["lumen/runtime"]
  local nil63 = _g677["nil?"]
  local is63 = _g677["is?"]
  local length = _g677.length
  local none63 = _g677["none?"]
  local some63 = _g677["some?"]
  local one63 = _g677["one?"]
  local hd = _g677.hd
  local string63 = _g677["string?"]
  local number63 = _g677["number?"]
  local boolean63 = _g677["boolean?"]
  local function63 = _g677["function?"]
  local composite63 = _g677["composite?"]
  local atom63 = _g677["atom?"]
  local table63 = _g677["table?"]
  local list63 = _g677["list?"]
  local substring = _g677.substring
  local sub = _g677.sub
  local inner = _g677.inner
  local tl = _g677.tl
  local char = _g677.char
  local code = _g677.code
  local string_literal63 = _g677["string-literal?"]
  local id_literal63 = _g677["id-literal?"]
  local add = _g677.add
  local drop = _g677.drop
  local last = _g677.last
  local reverse = _g677.reverse
  local join = _g677.join
  local reduce = _g677.reduce
  local keep = _g677.keep
  local in63 = _g677["in?"]
  local find = _g677.find
  local pair = _g677.pair
  local sort = _g677.sort
  local iterate = _g677.iterate
  local replicate = _g677.replicate
  local map = _g677.map
  local keys63 = _g677["keys?"]
  local empty63 = _g677["empty?"]
  local stash = _g677.stash
  local unstash = _g677.unstash
  local search = _g677.search
  local split = _g677.split
  local cat = _g677.cat
  local _43 = _g677["+"]
  local _ = _g677["-"]
  local _42 = _g677["*"]
  local _47 = _g677["/"]
  local _37 = _g677["%"]
  local _62 = _g677[">"]
  local _60 = _g677["<"]
  local _61 = _g677["="]
  local _6261 = _g677[">="]
  local _6061 = _g677["<="]
  local read_file = _g677["read-file"]
  local write_file = _g677["write-file"]
  local write = _g677.write
  local exit = _g677.exit
  local today = _g677.today
  local now = _g677.now
  local number = _g677.number
  local string = _g677.string
  local space = _g677.space
  local apply = _g677.apply
  local make_id = _g677["make-id"]
  local _37message_handler = _g677["%message-handler"]
  local toplevel63 = _g677["toplevel?"]
  local module_key = _g677["module-key"]
  local module = _g677.module
  local setenv = _g677.setenv
  local _g680 = nexus["lumen/lib"]
  local getenv = _g680.getenv
  local macro_function = _g680["macro-function"]
  local macro63 = _g680["macro?"]
  local special63 = _g680["special?"]
  local special_form63 = _g680["special-form?"]
  local statement63 = _g680["statement?"]
  local symbol_expansion = _g680["symbol-expansion"]
  local symbol63 = _g680["symbol?"]
  local variable63 = _g680["variable?"]
  local bound63 = _g680["bound?"]
  local quoted = _g680.quoted
  local stash42 = _g680["stash*"]
  local bind = _g680.bind
  local bind42 = _g680["bind*"]
  local quasiexpand = _g680.quasiexpand
  local macroexpand = _g680.macroexpand
  local indentation = _g680.indentation
  local reserved63 = _g680["reserved?"]
  local valid_id63 = _g680["valid-id?"]
  local id = _g680.id
  local key = _g680.key
  local imported = _g680.imported
  local link = _g680.link
  local mapo = _g680.mapo
  local quote_environment = _g680["quote-environment"]
  local quote_modules = _g680["quote-modules"]
  local initial_environment = _g680["initial-environment"]
  local _g681 = nexus["lumen/compiler"]
  local compile_function = _g681["compile-function"]
  local compile = _g681.compile
  local open_module = _g681["open-module"]
  local load_module = _g681["load-module"]
  local in_module = _g681["in-module"]
  local import_modules = _g681["import-modules"]
  local compile_module = _g681["compile-module"]
  local declare = _g681.declare
  local eval = _g681.eval
  modules = {lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g694, ...)
    local char = _g694[1]
    local stream = _g694[2]
    local body = unstash({...})
    local _g695 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g695)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g696 = body
      local k = nil
      for k in next, _g696 do
        if not number63(k) then
          local v = _g696[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g697)
      local a = _g697[1]
      local b = _g697[2]
      local c = sub(_g697, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g698 = sub(body, 0)
    return({"if", cond, join({"do"}, _g698)})
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g699)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g700 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g700))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g701 = bind(lh, rh)
      local _g702 = 0
      while _g702 < length(_g701) do
        local _g703 = _g701[_g702 + 1]
        local id = _g703[1]
        local val = _g703[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g702 = _g702 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g700)}})))
    end
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
    local imp = _g704.import
    local exp = _g704.export
    local alias = _g704.alias
    local _g705 = import_modules(imp)
    local imports = _g705[1]
    local bindings = _g705[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g706 = exp or {}
    local _g707 = 0
    while _g707 < length(_g706) do
      local x = _g706[_g707 + 1]
      setenv(x, {_stash = true, export = true})
      _g707 = _g707 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g708 = sub(body, 0)
    local form = join({"fn", args}, _g708)
    local _g709 = {"setenv", {"quote", name}}
    _g709.macro = form
    _g709.form = {"quote", form}
    eval(_g709)
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g710 = sub(body, 0)
    local form = join({"fn", args}, _g710)
    local keys = sub(_g710, length(_g710))
    local _g711 = {"setenv", {"quote", name}}
    _g711.special = form
    _g711.form = {"quote", form}
    eval(join(_g711, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g712) then
      local _g713 = bind42(x, _g712)
      local args = _g713[1]
      local _g714 = _g713[2]
      return(join({"%global-function", name, args}, _g714))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g715 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g715) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g715)}))
    else
      if some63(_g715) then
        local _g716 = bind42(x, _g715)
        local args = _g716[1]
        local _g717 = _g716[2]
        return(link(name, join({"%local-function", name, args}, _g717)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, ["with-bindings"] = {export = true, macro = function (_g718, ...)
    local names = _g718[1]
    local body = unstash({...})
    local _g719 = sub(body, 0)
    local x = make_id()
    local _g721 = {"setenv", x}
    _g721.variable = true
    local _g720 = {"with-frame", {"each", {x}, names, _g721}}
    _g720.scope = true
    return(join(_g720, _g719))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g722 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g723 = join({"do"}, macroexpand(_g722))
    drop(environment)
    return(_g723)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g724 = sub(body, 0)
    add(environment, {})
    map(function (_g726)
      local name = _g726[1]
      local exp = _g726[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g725 = join({"do"}, macroexpand(_g724))
    drop(environment)
    return(_g725)
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g727 = sub(body, 0)
    local _g728 = bind42(args, _g727)
    local _g729 = _g728[1]
    local _g730 = _g728[2]
    return(join({"%function", _g729}, _g730))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g731 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g763
    if nil63(v) then
      local _g764
      if b.i then
        _g764 = "i"
      else
        _g764 = make_id()
      end
      local i = _g764
      _g763 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g731), {"inc", i}}}
    else
      local _g732 = {"target"}
      _g732.js = {"isNaN", {"parseInt", k}}
      _g732.lua = {"not", {"number?", k}}
      _g763 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g732, join({"let", {v, {"get", t1, k}}}, _g731)}}}
    end
    return({"let", {t1, t}, _g763})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g733 = xs
    local _g734 = 0
    while _g734 < length(_g733) do
      local x = _g733[_g734 + 1]
      l[x] = true
      _g734 = _g734 + 1
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g735 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g735)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g736 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g736)})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g737 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g738 = {"table"}
    _g738._scope = scope
    return({"do", {"add", "environment", _g738}, {"let", {x, join({"do"}, _g737)}, {"drop", "environment"}, x}})
  end}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, ["id-count"] = {variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g739 = forms
    local _g740 = 0
    while _g740 < length(_g739) do
      local x = _g739[_g740 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g740 = _g740 + 1
    end
    return(str)
  end, tr = true, export = true, stmt = true}, ["%if"] = {foo = true, special = function (cond, cons, alt)
    local _g741 = compile(cond)
    indent_level = indent_level + 1
    local _g743 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g742 = _g743
    local _g765
    if alt then
      indent_level = indent_level + 1
      local _g745 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g765 = _g745
    end
    local _g744 = _g765
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g741 .. ") {\n" .. _g742 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g741 .. " then\n" .. _g742
    end
    if _g744 and target == "js" then
      str = str .. " else {\n" .. _g744 .. ind .. "}"
    else
      if _g744 then
        str = str .. ind .. "else\n" .. _g744
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, tr = true, export = true, stmt = true}, ["while"] = {foo = true, special = function (cond, form)
    local _g746 = compile(cond)
    indent_level = indent_level + 1
    local _g747 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g747
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g746 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g746 .. " do\n" .. body .. ind .. "end\n")
    end
  end, tr = true, export = true, stmt = true}, ["%for"] = {foo = true, special = function (t, k, form)
    local _g748 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g749 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g749
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g748 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g748 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, tr = true, export = true, stmt = true}, ["%try"] = {foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g750 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g750
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g751 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g751
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, tr = true, export = true, stmt = true}, ["break"] = {stmt = true, foo = true, export = true, special = function ()
    return(indentation() .. "break")
  end}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%global-function"] = {foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true, export = true, stmt = true}, ["%local-function"] = {foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, tr = true, export = true, stmt = true}, ["return"] = {stmt = true, foo = true, export = true, special = function (x)
    local _g766
    if nil63(x) then
      _g766 = "return"
    else
      _g766 = "return(" .. compile(x) .. ")"
    end
    local _g752 = _g766
    return(indentation() .. _g752)
  end}, error = {stmt = true, foo = true, export = true, special = function (x)
    local _g767
    if target == "js" then
      _g767 = "throw new " .. compile({"Error", x})
    else
      _g767 = "error(" .. compile(x) .. ")"
    end
    local e = _g767
    return(indentation() .. e)
  end}, ["%local"] = {stmt = true, foo = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g768
    if is63(value) then
      _g768 = " = " .. value1
    else
      _g768 = ""
    end
    local rh = _g768
    local _g769
    if target == "js" then
      _g769 = "var "
    else
      _g769 = "local "
    end
    local keyword = _g769
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end}, set = {stmt = true, foo = true, export = true, special = function (lh, rh)
    local _g753 = compile(lh)
    local _g770
    if nil63(rh) then
      _g770 = "nil"
    else
      _g770 = rh
    end
    local _g754 = compile(_g770)
    return(indentation() .. _g753 .. " = " .. _g754)
  end}, get = {foo = true, export = true, special = function (t, k)
    local _g755 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g755, 0) == "{" then
      _g755 = "(" .. _g755 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g755 .. "." .. inner(k))
    else
      return(_g755 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _g771
    if target == "lua" then
      _g771 = "{"
    else
      _g771 = "["
    end
    local open = _g771
    local _g772
    if target == "lua" then
      _g772 = "}"
    else
      _g772 = "]"
    end
    local close = _g772
    local str = ""
    local _g756 = forms
    local i = 0
    while i < length(_g756) do
      local x = _g756[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g773
    if target == "lua" then
      _g773 = " = "
    else
      _g773 = ": "
    end
    local sep = _g773
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g757 = pairs
    local i = 0
    while i < length(_g757) do
      local _g758 = _g757[i + 1]
      local k = _g758[1]
      local v = _g758[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      str = str .. key(k) .. sep .. compile(v)
      if i < n_1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g759 = sub(body, 0)
    local imp = _g759.import
    local exp = _g759.export
    local alias = _g759.alias
    local _g760 = import_modules(imp)
    local imports = _g760[1]
    local bindings = _g760[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g761 = exp or {}
    local _g762 = 0
    while _g762 < length(_g761) do
      local x = _g761[_g762 + 1]
      setenv(x, {_stash = true, export = true})
      _g762 = _g762 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g774 = nexus["lumen/runtime"]
  local nil63 = _g774["nil?"]
  local is63 = _g774["is?"]
  local length = _g774.length
  local none63 = _g774["none?"]
  local some63 = _g774["some?"]
  local one63 = _g774["one?"]
  local hd = _g774.hd
  local string63 = _g774["string?"]
  local number63 = _g774["number?"]
  local boolean63 = _g774["boolean?"]
  local function63 = _g774["function?"]
  local composite63 = _g774["composite?"]
  local atom63 = _g774["atom?"]
  local table63 = _g774["table?"]
  local list63 = _g774["list?"]
  local substring = _g774.substring
  local sub = _g774.sub
  local inner = _g774.inner
  local tl = _g774.tl
  local char = _g774.char
  local code = _g774.code
  local string_literal63 = _g774["string-literal?"]
  local id_literal63 = _g774["id-literal?"]
  local add = _g774.add
  local drop = _g774.drop
  local last = _g774.last
  local reverse = _g774.reverse
  local join = _g774.join
  local reduce = _g774.reduce
  local keep = _g774.keep
  local in63 = _g774["in?"]
  local find = _g774.find
  local pair = _g774.pair
  local sort = _g774.sort
  local iterate = _g774.iterate
  local replicate = _g774.replicate
  local map = _g774.map
  local keys63 = _g774["keys?"]
  local empty63 = _g774["empty?"]
  local stash = _g774.stash
  local unstash = _g774.unstash
  local search = _g774.search
  local split = _g774.split
  local cat = _g774.cat
  local _43 = _g774["+"]
  local _ = _g774["-"]
  local _42 = _g774["*"]
  local _47 = _g774["/"]
  local _37 = _g774["%"]
  local _62 = _g774[">"]
  local _60 = _g774["<"]
  local _61 = _g774["="]
  local _6261 = _g774[">="]
  local _6061 = _g774["<="]
  local read_file = _g774["read-file"]
  local write_file = _g774["write-file"]
  local write = _g774.write
  local exit = _g774.exit
  local today = _g774.today
  local now = _g774.now
  local number = _g774.number
  local string = _g774.string
  local space = _g774.space
  local apply = _g774.apply
  local make_id = _g774["make-id"]
  local _37message_handler = _g774["%message-handler"]
  local toplevel63 = _g774["toplevel?"]
  local module_key = _g774["module-key"]
  local module = _g774.module
  local setenv = _g774.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local length = _g2.length
  local none63 = _g2["none?"]
  local some63 = _g2["some?"]
  local one63 = _g2["one?"]
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
  local in63 = _g2["in?"]
  local find = _g2.find
  local pair = _g2.pair
  local sort = _g2.sort
  local iterate = _g2.iterate
  local replicate = _g2.replicate
  local map = _g2.map
  local keys63 = _g2["keys?"]
  local empty63 = _g2["empty?"]
  local stash = _g2.stash
  local unstash = _g2.unstash
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
  local today = _g2.today
  local now = _g2.now
  local number = _g2.number
  local string = _g2.string
  local space = _g2.space
  local apply = _g2.apply
  local make_id = _g2["make-id"]
  local _37message_handler = _g2["%message-handler"]
  local toplevel63 = _g2["toplevel?"]
  local module_key = _g2["module-key"]
  local module = _g2.module
  local setenv = _g2.setenv
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus["lumen/compiler"]
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local import_modules = _g6["import-modules"]
  local compile_module = _g6["compile-module"]
  local declare = _g6.declare
  local eval = _g6.eval
  local function rep(str)
    local _g778,_g779 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g777 = {_g778, _g779}
    local _g1 = _g777[1]
    local x = _g777[2]
    if is63(x) then
      return(print(string(x)))
    end
  end
  nexus["lumen/main"].rep = rep
  local function repl()
    local function step(str)
      rep(str)
      return(write("> "))
    end
    write("> ")
    while true do
      local str = io.read()
      if str then
        step(str)
      else
        break
      end
    end
  end
  nexus["lumen/main"].repl = repl
  local function usage()
    print("usage: lumen [options] <module>")
    print("options:")
    print("  -o <output>\tOutput file")
    print("  -t <target>\tTarget language (default: lua)")
    print("  -e <expr>\tExpression to evaluate")
    return(exit())
  end
  nexus["lumen/main"].usage = usage
  local function main()
    local args = arg
    if hd(args) == "-h" or hd(args) == "--help" then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local _g780 = args
    local i = 0
    while i < length(_g780) do
      local arg = _g780[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == length(args) - 1 then
          print("missing argument for" .. " " .. string(arg))
        else
          i = i + 1
          local val = args[i + 1]
          if arg == "-o" then
            output = val
          else
            if arg == "-t" then
              target1 = val
            else
              if arg == "-e" then
                expr = val
              end
            end
          end
        end
      else
        if nil63(spec) and "-" ~= char(arg, 0) then
          spec = arg
        end
      end
      i = i + 1
    end
    if output then
      if target1 then
        target = target1
      end
      return(write_file(output, compile_module(spec)))
    else
      in_module(spec or "user")
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  nexus["lumen/main"].main = main
  main()
end)();
