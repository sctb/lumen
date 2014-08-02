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
      local j = 0
      local _g54
      if nil63(from) or from < 0 then
        _g54 = 0
      else
        _g54 = from
      end
      local i = _g54
      local n = length(x)
      local _g55
      if nil63(upto) or upto > n then
        _g55 = n
      else
        _g55 = upto
      end
      local _g23 = _g55
      while i < _g23 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g24 = x
      local k = nil
      for k in next, _g24 do
        local v = _g24[k]
        if not number63(k) then
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
    local _g56
    if n then
      _g56 = n + 1
    end
    return(string.byte(str, _g56))
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
  local function join(a, b)
    if a and b then
      local c = {}
      local o = length(a)
      local _g26 = a
      local k = nil
      for k in next, _g26 do
        local v = _g26[k]
        c[k] = v
      end
      local _g28 = b
      local k = nil
      for k in next, _g28 do
        local v = _g28[k]
        if number63(k) then
          k = k + o
        end
        c[k] = v
      end
      return(c)
    else
      return(a or b or {})
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
  local function shift(k, n)
    if number63(k) then
      return(k - n)
    else
      return(k)
    end
  end
  nexus["lumen/runtime"].shift = shift
  local function keep(f, x)
    local t = {}
    local o = 0
    local _g30 = x
    local k = nil
    for k in next, _g30 do
      local v = _g30[k]
      if f(v) then
        t[shift(k, o)] = v
      else
        o = o + 1
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].keep = keep
  local function in63(x, t)
    local _g32 = t
    local _g19 = nil
    for _g19 in next, _g32 do
      local y = _g32[_g19]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g34 = t
    local _g20 = nil
    for _g20 in next, _g34 do
      local x = _g34[_g20]
      local _g36 = f(x)
      if _g36 then
        return(_g36)
      end
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
  local function series(f, l)
    return(iterate(function (i)
      return(f(l[i + 1]))
    end, length(l)))
  end
  nexus["lumen/runtime"].series = series
  local function map(f, x)
    local t = {}
    local o = 0
    local _g37 = x
    local k = nil
    for k in next, _g37 do
      local v = _g37[k]
      local y = f(v)
      if is63(y) then
        t[shift(k, o)] = y
      else
        o = o + 1
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].map = map
  local function keys63(t)
    local k63 = false
    local _g39 = t
    local k = nil
    for k in next, _g39 do
      if not number63(k) then
        local v = _g39[k]
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
      local _g40 = args
      local k = nil
      for k in next, _g40 do
        if not number63(k) then
          local v = _g40[k]
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
        local _g41 = l
        local k = nil
        for k in next, _g41 do
          if not number63(k) then
            local v = _g41[k]
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
    local _g57
    if start then
      _g57 = start + 1
    end
    local _g42 = _g57
    local i = string.find(str, pattern, _g42, true)
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
    local _g43 = sub(xs, 0)
    if none63(_g43) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g43))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g44 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g44))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g45 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g45)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g46))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g47)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g48)))
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
            local _g49 = x
            local k = nil
            for k in next, _g49 do
              if not number63(k) then
                local v = _g49[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g50 = x1
            local i = 0
            while i < length(_g50) do
              local y = _g50[i + 1]
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
    local _g51 = stash(args)
    return(f(unpack(_g51)))
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
    local _g52 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g53 = _g52
      local k1 = nil
      for k1 in next, _g53 do
        if not number63(k1) then
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
  nexus["lumen/runtime"].setenv = setenv
end)();
(function ()
  nexus["lumen/lib"] = {}
  local _g61 = nexus["lumen/runtime"]
  local pair = _g61.pair
  local _37message_handler = _g61["%message-handler"]
  local stash = _g61.stash
  local atom63 = _g61["atom?"]
  local apply = _g61.apply
  local composite63 = _g61["composite?"]
  local string_literal63 = _g61["string-literal?"]
  local reduce = _g61.reduce
  local join = _g61.join
  local _62 = _g61[">"]
  local _61 = _g61["="]
  local _60 = _g61["<"]
  local module = _g61.module
  local list63 = _g61["list?"]
  local string63 = _g61["string?"]
  local today = _g61.today
  local iterate = _g61.iterate
  local _ = _g61["-"]
  local length = _g61.length
  local _47 = _g61["/"]
  local cat = _g61.cat
  local _43 = _g61["+"]
  local char = _g61.char
  local _37 = _g61["%"]
  local unstash = _g61.unstash
  local keys63 = _g61["keys?"]
  local is63 = _g61["is?"]
  local some63 = _g61["some?"]
  local none63 = _g61["none?"]
  local read_file = _g61["read-file"]
  local map = _g61.map
  local _6261 = _g61[">="]
  local _6061 = _g61["<="]
  local one63 = _g61["one?"]
  local now = _g61.now
  local number63 = _g61["number?"]
  local table63 = _g61["table?"]
  local replicate = _g61.replicate
  local code = _g61.code
  local make_id = _g61["make-id"]
  local find = _g61.find
  local in63 = _g61["in?"]
  local drop = _g61.drop
  local add = _g61.add
  local keep = _g61.keep
  local split = _g61.split
  local space = _g61.space
  local module_key = _g61["module-key"]
  local substring = _g61.substring
  local sub = _g61.sub
  local reverse = _g61.reverse
  local sort = _g61.sort
  local tl = _g61.tl
  local setenv = _g61.setenv
  local string = _g61.string
  local number = _g61.number
  local inner = _g61.inner
  local exit = _g61.exit
  local nil63 = _g61["nil?"]
  local write = _g61.write
  local toplevel63 = _g61["toplevel?"]
  local hd = _g61.hd
  local boolean63 = _g61["boolean?"]
  local write_file = _g61["write-file"]
  local _42 = _g61["*"]
  local search = _g61.search
  local function63 = _g61["function?"]
  local last = _g61.last
  local empty63 = _g61["empty?"]
  local id_literal63 = _g61["id-literal?"]
  local series = _g61.series
  local function getenv(k, p)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if is63(b) then
        if p then
          return(b[p])
        else
          return(b)
        end
      end
    end
  end
  nexus["lumen/lib"].getenv = getenv
  local function macro_function(k)
    return(getenv(k, "macro"))
  end
  nexus["lumen/lib"]["macro-function"] = macro_function
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  nexus["lumen/lib"]["macro?"] = macro63
  local function special63(k)
    return(is63(getenv(k, "special")))
  end
  nexus["lumen/lib"]["special?"] = special63
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  nexus["lumen/lib"]["special-form?"] = special_form63
  local function statement63(k)
    return(special63(k) and getenv(k, "stmt"))
  end
  nexus["lumen/lib"]["statement?"] = statement63
  local function symbol_expansion(k)
    return(getenv(k, "symbol"))
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
    return(getenv(k, "global"))
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
      local _g99
      if c == "\n" then
        _g99 = "\\n"
      else
        local _g100
        if c == "\"" then
          _g100 = "\\\""
        else
          local _g101
          if c == "\\" then
            _g101 = "\\\\"
          else
            _g101 = c
          end
          _g100 = _g101
        end
        _g99 = _g100
      end
      local c1 = _g99
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
      local _g64 = args
      local k = nil
      for k in next, _g64 do
        if not number63(k) then
          local v = _g64[k]
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
        local _g65 = lh
        local i = 0
        while i < length(_g65) do
          local x = _g65[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g66 = lh
        local k = nil
        for k in next, _g66 do
          if not number63(k) then
            local v = _g66[k]
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
      local _g67 = args
      local _g68 = 0
      while _g68 < length(_g67) do
        local arg = _g67[_g68 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g68 = _g68 + 1
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
            local _g71 = args
            local _g72 = 0
            while _g72 < length(_g71) do
              local _g69 = _g71[_g72 + 1]
              setenv(_g69, {_stash = true, variable = true})
              _g72 = _g72 + 1
            end
            local _g70 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g70)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g60 = form[1]
              local _g73 = form[2]
              local _g74 = form[3]
              local _g75 = sub(form, 3)
              add(environment, {_scope = true})
              local _g78 = _g74
              local _g79 = 0
              while _g79 < length(_g78) do
                local _g76 = _g78[_g79 + 1]
                setenv(_g76, {_stash = true, variable = true})
                _g79 = _g79 + 1
              end
              local _g77 = join({x, _g73, _g74}, macroexpand(_g75))
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
  nexus["lumen/lib"].macroexpand = macroexpand
  local quasiexpand
  nexus["lumen/lib"].quasiexpand = quasiexpand
  local quasiquote_list
  nexus["lumen/lib"]["quasiquote-list"] = quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g80 = form
    local k = nil
    for k in next, _g80 do
      if not number63(k) then
        local v = _g80[k]
        local _g102
        if quasisplice63(v, depth) then
          _g102 = quasiexpand(v[2])
        else
          _g102 = quasiexpand(v, depth)
        end
        local _g81 = _g102
        last(xs)[k] = _g81
      end
    end
    local _g82 = form
    local _g83 = 0
    while _g83 < length(_g82) do
      local x = _g82[_g83 + 1]
      if quasisplice63(x, depth) then
        local _g84 = quasiexpand(x[2])
        add(xs, _g84)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g83 = _g83 + 1
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
  local reserved = {["or"] = true, ["else"] = true, ["in"] = true, ["until"] = true, ["while"] = true, ["=="] = true, ["do"] = true, ["with"] = true, ["then"] = true, ["new"] = true, ["-"] = true, ["try"] = true, ["/"] = true, ["%"] = true, ["+"] = true, ["for"] = true, ["repeat"] = true, [">"] = true, ["<"] = true, ["case"] = true, ["debugger"] = true, ["instanceof"] = true, ["not"] = true, ["switch"] = true, ["local"] = true, ["catch"] = true, ["end"] = true, ["throw"] = true, ["elseif"] = true, ["false"] = true, ["default"] = true, ["="] = true, ["if"] = true, ["continue"] = true, ["break"] = true, ["void"] = true, ["var"] = true, ["finally"] = true, ["<="] = true, ["true"] = true, [">="] = true, ["this"] = true, ["return"] = true, ["and"] = true, ["function"] = true, ["nil"] = true, ["typeof"] = true, ["delete"] = true, ["*"] = true}
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
      local _g103
      if c == "-" then
        _g103 = "_"
      else
        local _g104
        if valid_code63(n) then
          _g104 = c
        else
          local _g105
          if i == 0 then
            _g105 = "_" .. n
          else
            _g105 = n
          end
          _g104 = _g105
        end
        _g103 = _g104
      end
      local c1 = _g103
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
    local _g89 = unstash({...})
    local _g90 = _g89.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g91 = module(spec).export
      local n = nil
      for n in next, _g91 do
        if not number63(n) then
          local b = _g91[n]
          if b.variable and (_g90 or b.export) then
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
    local _g92 = sub(xs, 0)
    return(join(t, _g92))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g93 = sub(keys, 0)
    local t1 = {}
    local _g94 = t
    local _g95 = 0
    while _g95 < length(_g94) do
      local x = _g94[_g95 + 1]
      add(t1, x)
      _g95 = _g95 + 1
    end
    local _g96 = t
    local k = nil
    for k in next, _g96 do
      if not number63(k) then
        local v = _g96[k]
        if not _g93[k] then
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
    local _g97 = t
    local k = nil
    for k in next, _g97 do
      if not number63(k) then
        local v = _g97[k]
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
    local _g98 = {"table"}
    _g98.import = quoted(m.import)
    _g98.export = quote_frame(m.export)
    _g98.alias = quoted(m.alias)
    return(_g98)
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
  local _g106 = nexus["lumen/runtime"]
  local pair = _g106.pair
  local _37message_handler = _g106["%message-handler"]
  local stash = _g106.stash
  local atom63 = _g106["atom?"]
  local apply = _g106.apply
  local composite63 = _g106["composite?"]
  local string_literal63 = _g106["string-literal?"]
  local reduce = _g106.reduce
  local join = _g106.join
  local _62 = _g106[">"]
  local _61 = _g106["="]
  local _60 = _g106["<"]
  local module = _g106.module
  local list63 = _g106["list?"]
  local string63 = _g106["string?"]
  local today = _g106.today
  local iterate = _g106.iterate
  local _ = _g106["-"]
  local length = _g106.length
  local _47 = _g106["/"]
  local cat = _g106.cat
  local _43 = _g106["+"]
  local char = _g106.char
  local _37 = _g106["%"]
  local unstash = _g106.unstash
  local keys63 = _g106["keys?"]
  local is63 = _g106["is?"]
  local some63 = _g106["some?"]
  local none63 = _g106["none?"]
  local read_file = _g106["read-file"]
  local map = _g106.map
  local _6261 = _g106[">="]
  local _6061 = _g106["<="]
  local one63 = _g106["one?"]
  local now = _g106.now
  local number63 = _g106["number?"]
  local table63 = _g106["table?"]
  local replicate = _g106.replicate
  local code = _g106.code
  local make_id = _g106["make-id"]
  local find = _g106.find
  local in63 = _g106["in?"]
  local drop = _g106.drop
  local add = _g106.add
  local keep = _g106.keep
  local split = _g106.split
  local space = _g106.space
  local module_key = _g106["module-key"]
  local substring = _g106.substring
  local sub = _g106.sub
  local reverse = _g106.reverse
  local sort = _g106.sort
  local tl = _g106.tl
  local setenv = _g106.setenv
  local string = _g106.string
  local number = _g106.number
  local inner = _g106.inner
  local exit = _g106.exit
  local nil63 = _g106["nil?"]
  local write = _g106.write
  local toplevel63 = _g106["toplevel?"]
  local hd = _g106.hd
  local boolean63 = _g106["boolean?"]
  local write_file = _g106["write-file"]
  local _42 = _g106["*"]
  local search = _g106.search
  local function63 = _g106["function?"]
  local last = _g106.last
  local empty63 = _g106["empty?"]
  local id_literal63 = _g106["id-literal?"]
  local series = _g106.series
  local delimiters = {[";"] = true, ["("] = true, [")"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({len = length(str), pos = 0, string = str})
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
  local _g117 = nexus["lumen/runtime"]
  local pair = _g117.pair
  local _37message_handler = _g117["%message-handler"]
  local stash = _g117.stash
  local atom63 = _g117["atom?"]
  local apply = _g117.apply
  local composite63 = _g117["composite?"]
  local string_literal63 = _g117["string-literal?"]
  local reduce = _g117.reduce
  local join = _g117.join
  local _62 = _g117[">"]
  local _61 = _g117["="]
  local _60 = _g117["<"]
  local module = _g117.module
  local list63 = _g117["list?"]
  local string63 = _g117["string?"]
  local today = _g117.today
  local iterate = _g117.iterate
  local _ = _g117["-"]
  local length = _g117.length
  local _47 = _g117["/"]
  local cat = _g117.cat
  local _43 = _g117["+"]
  local char = _g117.char
  local _37 = _g117["%"]
  local unstash = _g117.unstash
  local keys63 = _g117["keys?"]
  local is63 = _g117["is?"]
  local some63 = _g117["some?"]
  local none63 = _g117["none?"]
  local read_file = _g117["read-file"]
  local map = _g117.map
  local _6261 = _g117[">="]
  local _6061 = _g117["<="]
  local one63 = _g117["one?"]
  local now = _g117.now
  local number63 = _g117["number?"]
  local table63 = _g117["table?"]
  local replicate = _g117.replicate
  local code = _g117.code
  local make_id = _g117["make-id"]
  local find = _g117.find
  local in63 = _g117["in?"]
  local drop = _g117.drop
  local add = _g117.add
  local keep = _g117.keep
  local split = _g117.split
  local space = _g117.space
  local module_key = _g117["module-key"]
  local substring = _g117.substring
  local sub = _g117.sub
  local reverse = _g117.reverse
  local sort = _g117.sort
  local tl = _g117.tl
  local setenv = _g117.setenv
  local string = _g117.string
  local number = _g117.number
  local inner = _g117.inner
  local exit = _g117.exit
  local nil63 = _g117["nil?"]
  local write = _g117.write
  local toplevel63 = _g117["toplevel?"]
  local hd = _g117.hd
  local boolean63 = _g117["boolean?"]
  local write_file = _g117["write-file"]
  local _42 = _g117["*"]
  local search = _g117.search
  local function63 = _g117["function?"]
  local last = _g117.last
  local empty63 = _g117["empty?"]
  local id_literal63 = _g117["id-literal?"]
  local series = _g117.series
  local _g120 = nexus["lumen/lib"]
  local bind = _g120.bind
  local symbol_expansion = _g120["symbol-expansion"]
  local key = _g120.key
  local special_form63 = _g120["special-form?"]
  local getenv = _g120.getenv
  local valid_id63 = _g120["valid-id?"]
  local initial_environment = _g120["initial-environment"]
  local stash42 = _g120["stash*"]
  local macro_function = _g120["macro-function"]
  local indentation = _g120.indentation
  local quasiexpand = _g120.quasiexpand
  local special63 = _g120["special?"]
  local statement63 = _g120["statement?"]
  local link = _g120.link
  local quote_environment = _g120["quote-environment"]
  local bind42 = _g120["bind*"]
  local imported = _g120.imported
  local variable63 = _g120["variable?"]
  local bound63 = _g120["bound?"]
  local id = _g120.id
  local quoted = _g120.quoted
  local macro63 = _g120["macro?"]
  local macroexpand = _g120.macroexpand
  local reserved63 = _g120["reserved?"]
  local mapo = _g120.mapo
  local quote_modules = _g120["quote-modules"]
  local symbol63 = _g120["symbol?"]
  local _g121 = nexus["lumen/reader"]
  local make_stream = _g121["make-stream"]
  local read_table = _g121["read-table"]
  local read = _g121.read
  local read_from_string = _g121["read-from-string"]
  local read_all = _g121["read-all"]
  local _g125 = {}
  _g125.lua = "not "
  _g125.js = "!"
  local _g123 = {}
  local _g126 = {}
  _g126.lua = "not "
  _g126.js = "!"
  _g123["not"] = _g126
  local _g128 = {}
  _g128["*"] = true
  _g128["%"] = true
  _g128["/"] = true
  local _g130 = {}
  _g130["+"] = true
  _g130["-"] = true
  local _g134 = {}
  _g134.lua = ".."
  _g134.js = "+"
  local _g132 = {}
  local _g135 = {}
  _g135.lua = ".."
  _g135.js = "+"
  _g132.cat = _g135
  local _g137 = {}
  _g137[">"] = true
  _g137[">="] = true
  _g137["<="] = true
  _g137["<"] = true
  local _g141 = {}
  _g141.lua = "~="
  _g141.js = "!="
  local _g143 = {}
  _g143.lua = "=="
  _g143.js = "==="
  local _g139 = {}
  local _g144 = {}
  _g144.lua = "~="
  _g144.js = "!="
  _g139["~="] = _g144
  local _g145 = {}
  _g145.lua = "=="
  _g145.js = "==="
  _g139["="] = _g145
  local _g149 = {}
  _g149.lua = "and"
  _g149.js = "&&"
  local _g147 = {}
  local _g150 = {}
  _g150.lua = "and"
  _g150.js = "&&"
  _g147["and"] = _g150
  local _g154 = {}
  _g154.lua = "or"
  _g154.js = "||"
  local _g152 = {}
  local _g155 = {}
  _g155.lua = "or"
  _g155.js = "||"
  _g152["or"] = _g155
  local infix = {_g123, _g128, _g130, _g132, _g137, _g139, _g147, _g152}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g156 = infix
      local i = 0
      while i < length(_g156) do
        local level = _g156[i + 1]
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
    local _g157 = args
    local i = 0
    while i < length(_g157) do
      local arg = _g157[i + 1]
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
    local _g158 = getenv(x)
    local special = _g158.special
    local stmt = _g158.stmt
    local self_tr63 = _g158.tr
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
    local _g159 = unstash({...})
    local right = _g159.right
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
    local _g160 = sub(form, 1)
    local a = _g160[1]
    local b = _g160[2]
    local _g161 = op_delims(form, a)
    local ao = _g161[1]
    local ac = _g161[2]
    local _g162 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g162[1]
    local bc = _g162[2]
    local _g163 = compile(a)
    local _g164 = compile(b)
    local _g165 = getop(op)
    if unary63(form) then
      return(_g165 .. ao .. _g163 .. ac)
    else
      return(ao .. _g163 .. ac .. " " .. _g165 .. " " .. bo .. _g164 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g166 = unstash({...})
    local prefix = _g166.prefix
    local name = _g166.name
    local _g189
    if name then
      _g189 = compile(name)
    else
      _g189 = ""
    end
    local id = _g189
    local _g167 = prefix or ""
    local _g168 = compile_args(args)
    indent_level = indent_level + 1
    local _g170 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g169 = _g170
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
      return("function " .. id .. _g168 .. " {\n" .. _g169 .. ind .. "}" .. tr)
    else
      return(_g167 .. "function " .. id .. _g168 .. "\n" .. _g169 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g171 = unstash({...})
    local stmt = _g171.stmt
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
        local _g172 = _g192
        return(ind .. _g172 .. tr)
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
    local _g173 = sub(args, 0, length(args) - 1)
    local _g174 = 0
    while _g174 < length(_g173) do
      local x = _g173[_g174 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g174 = _g174 + 1
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
    local _g175 = args[2]
    local _g176 = args[3]
    if stmt63 or tail63 then
      local _g195
      if _g176 then
        _g195 = {lower_body({_g176}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g175}, tail63)}, _g195)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g194
      if _g176 then
        _g194 = {lower({"set", e, _g176})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g175})}, _g194))
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
    local _g177 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g177, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g178 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g178) then
      return(_g178)
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
    local _g179 = unstash({...})
    local _g180 = _g179.all
    local m = module(spec)
    local frame = last(environment)
    local _g181 = m.export
    local k = nil
    for k in next, _g181 do
      if not number63(k) then
        local v = _g181[k]
        if v.export or _g180 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g182 = unstash({...})
    local _g183 = _g182.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g183}))
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    series(open_module, m.import)
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
    local imports = {}
    local m = module(current_module)
    series(function (spec)
      imports = join(imports, imported(spec))
    end, m.import)
    return(join(imports, imported(current_module, {_stash = true, all = true})))
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
  local pair = _g197.pair
  local _37message_handler = _g197["%message-handler"]
  local stash = _g197.stash
  local atom63 = _g197["atom?"]
  local apply = _g197.apply
  local composite63 = _g197["composite?"]
  local string_literal63 = _g197["string-literal?"]
  local reduce = _g197.reduce
  local join = _g197.join
  local _62 = _g197[">"]
  local _61 = _g197["="]
  local _60 = _g197["<"]
  local module = _g197.module
  local list63 = _g197["list?"]
  local string63 = _g197["string?"]
  local today = _g197.today
  local iterate = _g197.iterate
  local _ = _g197["-"]
  local length = _g197.length
  local _47 = _g197["/"]
  local cat = _g197.cat
  local _43 = _g197["+"]
  local char = _g197.char
  local _37 = _g197["%"]
  local unstash = _g197.unstash
  local keys63 = _g197["keys?"]
  local is63 = _g197["is?"]
  local some63 = _g197["some?"]
  local none63 = _g197["none?"]
  local read_file = _g197["read-file"]
  local map = _g197.map
  local _6261 = _g197[">="]
  local _6061 = _g197["<="]
  local one63 = _g197["one?"]
  local now = _g197.now
  local number63 = _g197["number?"]
  local table63 = _g197["table?"]
  local replicate = _g197.replicate
  local code = _g197.code
  local make_id = _g197["make-id"]
  local find = _g197.find
  local in63 = _g197["in?"]
  local drop = _g197.drop
  local add = _g197.add
  local keep = _g197.keep
  local split = _g197.split
  local space = _g197.space
  local module_key = _g197["module-key"]
  local substring = _g197.substring
  local sub = _g197.sub
  local reverse = _g197.reverse
  local sort = _g197.sort
  local tl = _g197.tl
  local setenv = _g197.setenv
  local string = _g197.string
  local number = _g197.number
  local inner = _g197.inner
  local exit = _g197.exit
  local nil63 = _g197["nil?"]
  local write = _g197.write
  local toplevel63 = _g197["toplevel?"]
  local hd = _g197.hd
  local boolean63 = _g197["boolean?"]
  local write_file = _g197["write-file"]
  local _42 = _g197["*"]
  local search = _g197.search
  local function63 = _g197["function?"]
  local last = _g197.last
  local empty63 = _g197["empty?"]
  local id_literal63 = _g197["id-literal?"]
  local series = _g197.series
  local _g200 = nexus["lumen/lib"]
  local bind = _g200.bind
  local symbol_expansion = _g200["symbol-expansion"]
  local key = _g200.key
  local special_form63 = _g200["special-form?"]
  local getenv = _g200.getenv
  local valid_id63 = _g200["valid-id?"]
  local initial_environment = _g200["initial-environment"]
  local stash42 = _g200["stash*"]
  local macro_function = _g200["macro-function"]
  local indentation = _g200.indentation
  local quasiexpand = _g200.quasiexpand
  local special63 = _g200["special?"]
  local statement63 = _g200["statement?"]
  local link = _g200.link
  local quote_environment = _g200["quote-environment"]
  local bind42 = _g200["bind*"]
  local imported = _g200.imported
  local variable63 = _g200["variable?"]
  local bound63 = _g200["bound?"]
  local id = _g200.id
  local quoted = _g200.quoted
  local macro63 = _g200["macro?"]
  local macroexpand = _g200.macroexpand
  local reserved63 = _g200["reserved?"]
  local mapo = _g200.mapo
  local quote_modules = _g200["quote-modules"]
  local symbol63 = _g200["symbol?"]
  local _g201 = nexus["lumen/compiler"]
  local eval = _g201.eval
  local compile_module = _g201["compile-module"]
  local load_module = _g201["load-module"]
  local declare = _g201.declare
  local compile_function = _g201["compile-function"]
  local in_module = _g201["in-module"]
  local open_module = _g201["open-module"]
  local compile = _g201.compile
  local import_modules = _g201["import-modules"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g375 = nexus["lumen/runtime"]
  local pair = _g375.pair
  local _37message_handler = _g375["%message-handler"]
  local stash = _g375.stash
  local atom63 = _g375["atom?"]
  local apply = _g375.apply
  local composite63 = _g375["composite?"]
  local string_literal63 = _g375["string-literal?"]
  local reduce = _g375.reduce
  local join = _g375.join
  local _62 = _g375[">"]
  local _61 = _g375["="]
  local _60 = _g375["<"]
  local module = _g375.module
  local list63 = _g375["list?"]
  local string63 = _g375["string?"]
  local today = _g375.today
  local iterate = _g375.iterate
  local _ = _g375["-"]
  local length = _g375.length
  local _47 = _g375["/"]
  local cat = _g375.cat
  local _43 = _g375["+"]
  local char = _g375.char
  local _37 = _g375["%"]
  local unstash = _g375.unstash
  local keys63 = _g375["keys?"]
  local is63 = _g375["is?"]
  local some63 = _g375["some?"]
  local none63 = _g375["none?"]
  local read_file = _g375["read-file"]
  local map = _g375.map
  local _6261 = _g375[">="]
  local _6061 = _g375["<="]
  local one63 = _g375["one?"]
  local now = _g375.now
  local number63 = _g375["number?"]
  local table63 = _g375["table?"]
  local replicate = _g375.replicate
  local code = _g375.code
  local make_id = _g375["make-id"]
  local find = _g375.find
  local in63 = _g375["in?"]
  local drop = _g375.drop
  local add = _g375.add
  local keep = _g375.keep
  local split = _g375.split
  local space = _g375.space
  local module_key = _g375["module-key"]
  local substring = _g375.substring
  local sub = _g375.sub
  local reverse = _g375.reverse
  local sort = _g375.sort
  local tl = _g375.tl
  local setenv = _g375.setenv
  local string = _g375.string
  local number = _g375.number
  local inner = _g375.inner
  local exit = _g375.exit
  local nil63 = _g375["nil?"]
  local write = _g375.write
  local toplevel63 = _g375["toplevel?"]
  local hd = _g375.hd
  local boolean63 = _g375["boolean?"]
  local write_file = _g375["write-file"]
  local _42 = _g375["*"]
  local search = _g375.search
  local function63 = _g375["function?"]
  local last = _g375.last
  local empty63 = _g375["empty?"]
  local id_literal63 = _g375["id-literal?"]
  local series = _g375.series
  local _g378 = nexus["lumen/lib"]
  local bind = _g378.bind
  local symbol_expansion = _g378["symbol-expansion"]
  local key = _g378.key
  local special_form63 = _g378["special-form?"]
  local getenv = _g378.getenv
  local valid_id63 = _g378["valid-id?"]
  local initial_environment = _g378["initial-environment"]
  local stash42 = _g378["stash*"]
  local macro_function = _g378["macro-function"]
  local indentation = _g378.indentation
  local quasiexpand = _g378.quasiexpand
  local special63 = _g378["special?"]
  local statement63 = _g378["statement?"]
  local link = _g378.link
  local quote_environment = _g378["quote-environment"]
  local bind42 = _g378["bind*"]
  local imported = _g378.imported
  local variable63 = _g378["variable?"]
  local bound63 = _g378["bound?"]
  local id = _g378.id
  local quoted = _g378.quoted
  local macro63 = _g378["macro?"]
  local macroexpand = _g378.macroexpand
  local reserved63 = _g378["reserved?"]
  local mapo = _g378.mapo
  local quote_modules = _g378["quote-modules"]
  local symbol63 = _g378["symbol?"]
  local _g379 = nexus["lumen/compiler"]
  local eval = _g379.eval
  local compile_module = _g379["compile-module"]
  local load_module = _g379["load-module"]
  local declare = _g379.declare
  local compile_function = _g379["compile-function"]
  local in_module = _g379["in-module"]
  local open_module = _g379["open-module"]
  local compile = _g379.compile
  local import_modules = _g379["import-modules"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g688 = nexus["lumen/runtime"]
  local pair = _g688.pair
  local _37message_handler = _g688["%message-handler"]
  local stash = _g688.stash
  local atom63 = _g688["atom?"]
  local apply = _g688.apply
  local composite63 = _g688["composite?"]
  local string_literal63 = _g688["string-literal?"]
  local reduce = _g688.reduce
  local join = _g688.join
  local _62 = _g688[">"]
  local _61 = _g688["="]
  local _60 = _g688["<"]
  local module = _g688.module
  local list63 = _g688["list?"]
  local string63 = _g688["string?"]
  local today = _g688.today
  local iterate = _g688.iterate
  local _ = _g688["-"]
  local length = _g688.length
  local _47 = _g688["/"]
  local cat = _g688.cat
  local _43 = _g688["+"]
  local char = _g688.char
  local _37 = _g688["%"]
  local unstash = _g688.unstash
  local keys63 = _g688["keys?"]
  local is63 = _g688["is?"]
  local some63 = _g688["some?"]
  local none63 = _g688["none?"]
  local read_file = _g688["read-file"]
  local map = _g688.map
  local _6261 = _g688[">="]
  local _6061 = _g688["<="]
  local one63 = _g688["one?"]
  local now = _g688.now
  local number63 = _g688["number?"]
  local table63 = _g688["table?"]
  local replicate = _g688.replicate
  local code = _g688.code
  local make_id = _g688["make-id"]
  local find = _g688.find
  local in63 = _g688["in?"]
  local drop = _g688.drop
  local add = _g688.add
  local keep = _g688.keep
  local split = _g688.split
  local space = _g688.space
  local module_key = _g688["module-key"]
  local substring = _g688.substring
  local sub = _g688.sub
  local reverse = _g688.reverse
  local sort = _g688.sort
  local tl = _g688.tl
  local setenv = _g688.setenv
  local string = _g688.string
  local number = _g688.number
  local inner = _g688.inner
  local exit = _g688.exit
  local nil63 = _g688["nil?"]
  local write = _g688.write
  local toplevel63 = _g688["toplevel?"]
  local hd = _g688.hd
  local boolean63 = _g688["boolean?"]
  local write_file = _g688["write-file"]
  local _42 = _g688["*"]
  local search = _g688.search
  local function63 = _g688["function?"]
  local last = _g688.last
  local empty63 = _g688["empty?"]
  local id_literal63 = _g688["id-literal?"]
  local series = _g688.series
  local _g691 = nexus["lumen/lib"]
  local bind = _g691.bind
  local symbol_expansion = _g691["symbol-expansion"]
  local key = _g691.key
  local special_form63 = _g691["special-form?"]
  local getenv = _g691.getenv
  local valid_id63 = _g691["valid-id?"]
  local initial_environment = _g691["initial-environment"]
  local stash42 = _g691["stash*"]
  local macro_function = _g691["macro-function"]
  local indentation = _g691.indentation
  local quasiexpand = _g691.quasiexpand
  local special63 = _g691["special?"]
  local statement63 = _g691["statement?"]
  local link = _g691.link
  local quote_environment = _g691["quote-environment"]
  local bind42 = _g691["bind*"]
  local imported = _g691.imported
  local variable63 = _g691["variable?"]
  local bound63 = _g691["bound?"]
  local id = _g691.id
  local quoted = _g691.quoted
  local macro63 = _g691["macro?"]
  local macroexpand = _g691.macroexpand
  local reserved63 = _g691["reserved?"]
  local mapo = _g691.mapo
  local quote_modules = _g691["quote-modules"]
  local symbol63 = _g691["symbol?"]
  local _g692 = nexus["lumen/compiler"]
  local eval = _g692.eval
  local compile_module = _g692["compile-module"]
  local load_module = _g692["load-module"]
  local declare = _g692.declare
  local compile_function = _g692["compile-function"]
  local in_module = _g692["in-module"]
  local open_module = _g692["open-module"]
  local compile = _g692.compile
  local import_modules = _g692["import-modules"]
  modules = {["lumen/core"] = {export = {unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g705 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g705)})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g706 = xs
    local _g707 = 0
    while _g707 < length(_g706) do
      local x = _g706[_g707 + 1]
      l[x] = true
      _g707 = _g707 + 1
    end
    return(join({"table"}, l))
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g708 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g709 = {"table"}
    _g709._scope = scope
    return({"do", {"add", "environment", _g709}, {"let", {x, join({"do"}, _g708)}, {"drop", "environment"}, x}})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g710 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g710)})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g711 = sub(body, 0)
    local alias = _g711.alias
    local exp = _g711.export
    local imp = _g711.import
    local _g712 = import_modules(imp)
    local imports = _g712[1]
    local bindings = _g712[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g713 = exp or {}
    local _g714 = 0
    while _g714 < length(_g713) do
      local x = _g713[_g714 + 1]
      setenv(x, {_stash = true, export = true})
      _g714 = _g714 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["with-bindings"] = {macro = function (_g715, ...)
    local names = _g715[1]
    local body = unstash({...})
    local _g716 = sub(body, 0)
    local x = make_id()
    local _g718 = {"setenv", x}
    _g718.variable = true
    local _g717 = {"with-frame", {"each", {x}, names, _g718}}
    _g717.scope = true
    return(join(_g717, _g716))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g719 = body
      local k = nil
      for k in next, _g719 do
        if not number63(k) then
          local v = _g719[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g720 = sub(body, 0)
    add(environment, {})
    map(function (_g722)
      local name = _g722[1]
      local exp = _g722[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g721 = join({"do"}, macroexpand(_g720))
    drop(environment)
    return(_g721)
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g723 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g723)})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g724)
      local a = _g724[1]
      local b = _g724[2]
      local c = sub(_g724, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g725 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g725) then
      local _g726 = bind42(x, _g725)
      local args = _g726[1]
      local _g727 = _g726[2]
      return(join({"%global-function", name, args}, _g727))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, global = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g728 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g728))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g729 = bind(lh, rh)
      local _g730 = 0
      while _g730 < length(_g729) do
        local _g731 = _g729[_g730 + 1]
        local id = _g731[1]
        local val = _g731[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g730 = _g730 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g728)}})))
    end
  end, export = true}, all = {macro = function (_g732, t, ...)
    local k = _g732[1]
    local v = _g732[2]
    local body = unstash({...})
    local _g733 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g776
    if target == "lua" then
      _g776 = _g733
    else
      _g776 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g733)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g776)}})
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g734 = sub(body, 0)
    return({"if", cond, join({"do"}, _g734)})
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g735 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g735) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g735)}))
    else
      if some63(_g735) then
        local _g736 = bind42(x, _g735)
        local args = _g736[1]
        local _g737 = _g736[2]
        return(link(name, join({"%local-function", name, args}, _g737)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g738 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g777
    if nil63(v) then
      local _g778
      if b.i then
        _g778 = "i"
      else
        _g778 = make_id()
      end
      local i = _g778
      _g777 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g738), {"inc", i}}}
    else
      local _g739 = {"target"}
      _g739.lua = {"not", {"number?", k}}
      _g739.js = {"isNaN", {"parseInt", k}}
      _g777 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g739, join({"let", {v, {"get", t1, k}}}, _g738)}}}
    end
    return({"let", {t1, t}, _g777})
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g740 = sub(body, 0)
    local form = join({"fn", args}, _g740)
    local keys = sub(_g740, length(_g740))
    local _g741 = {"setenv", {"quote", name}}
    _g741.form = {"quote", form}
    _g741.special = form
    eval(join(_g741, keys))
    return(nil)
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g742 = sub(body, 0)
    local _g743 = bind42(args, _g742)
    local _g744 = _g743[1]
    local _g745 = _g743[2]
    return(join({"%function", _g744}, _g745))
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g746 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g747 = join({"do"}, macroexpand(_g746))
    drop(environment)
    return(_g747)
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g748 = sub(body, 0)
    local form = join({"fn", args}, _g748)
    local _g749 = {"setenv", {"quote", name}}
    _g749.macro = form
    _g749.form = {"quote", form}
    eval(_g749)
    return(nil)
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {export = true, global = true}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {pair = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, stash = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, apply = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, reduce = {export = true, variable = true}, join = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, module = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, today = {export = true, variable = true}, iterate = {export = true, variable = true}, ["-"] = {export = true, variable = true}, length = {export = true, variable = true}, ["/"] = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, char = {export = true, variable = true}, ["%"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, map = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, now = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, shift = {variable = true}, replicate = {export = true, variable = true}, code = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, find = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, drop = {export = true, variable = true}, add = {export = true, variable = true}, keep = {export = true, variable = true}, ["id-count"] = {variable = true}, split = {export = true, variable = true}, space = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, reverse = {export = true, variable = true}, sort = {export = true, variable = true}, tl = {export = true, variable = true}, setenv = {export = true, variable = true}, string = {export = true, variable = true}, number = {export = true, variable = true}, inner = {export = true, variable = true}, exit = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, write = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, search = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, last = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, series = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g779
    if is63(value) then
      _g779 = " = " .. value1
    else
      _g779 = ""
    end
    local rh = _g779
    local _g780
    if target == "js" then
      _g780 = "var "
    else
      _g780 = "local "
    end
    local keyword = _g780
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, export = true, stmt = true}, get = {special = function (t, k)
    local _g750 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g750, 0) == "{" then
      _g750 = "(" .. _g750 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g750 .. "." .. inner(k))
    else
      return(_g750 .. "[" .. k1 .. "]")
    end
  end, foo = true, export = true}, ["%global-function"] = {export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, foo = true, stmt = true, tr = true}, ["%try"] = {export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g751 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g751
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g752 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g752
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, foo = true, stmt = true, tr = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, foo = true, export = true}, set = {special = function (lh, rh)
    local _g753 = compile(lh)
    local _g781
    if nil63(rh) then
      _g781 = "nil"
    else
      _g781 = rh
    end
    local _g754 = compile(_g781)
    return(indentation() .. _g753 .. " = " .. _g754)
  end, foo = true, export = true, stmt = true}, ["while"] = {export = true, special = function (cond, form)
    local _g755 = compile(cond)
    indent_level = indent_level + 1
    local _g756 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g756
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g755 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g755 .. " do\n" .. body .. ind .. "end\n")
    end
  end, foo = true, stmt = true, tr = true}, ["%local-function"] = {export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, foo = true, stmt = true, tr = true}, ["%for"] = {export = true, special = function (t, k, form)
    local _g757 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g758 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g758
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g757 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g757 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, foo = true, stmt = true, tr = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, foo = true, export = true, stmt = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g782
    if target == "lua" then
      _g782 = " = "
    else
      _g782 = ": "
    end
    local sep = _g782
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g759 = pairs
    local i = 0
    while i < length(_g759) do
      local _g760 = _g759[i + 1]
      local k = _g760[1]
      local v = _g760[2]
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
  end, foo = true, export = true}, ["return"] = {special = function (x)
    local _g783
    if nil63(x) then
      _g783 = "return"
    else
      _g783 = "return(" .. compile(x) .. ")"
    end
    local _g761 = _g783
    return(indentation() .. _g761)
  end, foo = true, export = true, stmt = true}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g784
    if target == "lua" then
      _g784 = "{"
    else
      _g784 = "["
    end
    local open = _g784
    local _g785
    if target == "lua" then
      _g785 = "}"
    else
      _g785 = "]"
    end
    local close = _g785
    local str = ""
    local _g762 = forms
    local i = 0
    while i < length(_g762) do
      local x = _g762[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, foo = true, export = true}, ["%if"] = {export = true, special = function (cond, cons, alt)
    local _g763 = compile(cond)
    indent_level = indent_level + 1
    local _g765 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g764 = _g765
    local _g786
    if alt then
      indent_level = indent_level + 1
      local _g767 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g786 = _g767
    end
    local _g766 = _g786
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g763 .. ") {\n" .. _g764 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g763 .. " then\n" .. _g764
    end
    if _g766 and target == "js" then
      str = str .. " else {\n" .. _g766 .. ind .. "}"
    else
      if _g766 then
        str = str .. ind .. "else\n" .. _g766
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, foo = true, stmt = true, tr = true}, error = {special = function (x)
    local _g787
    if target == "js" then
      _g787 = "throw new " .. compile({"Error", x})
    else
      _g787 = "error(" .. compile(x) .. ")"
    end
    local e = _g787
    return(indentation() .. e)
  end, foo = true, export = true, stmt = true}, ["do"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g768 = forms
    local _g769 = 0
    while _g769 < length(_g768) do
      local x = _g768[_g769 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g769 = _g769 + 1
    end
    return(str)
  end, foo = true, stmt = true, tr = true}, ["not"] = {}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {bind = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, key = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, literal = {variable = true}, ["macro-function"] = {export = true, variable = true}, indentation = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, ["statement?"] = {export = true, variable = true}, link = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, escape = {variable = true}, exclude = {variable = true}, extend = {variable = true}, imported = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["valid-code?"] = {variable = true}, ["bound?"] = {export = true, variable = true}, id = {export = true, variable = true}, ["numeric?"] = {variable = true}, reserved = {variable = true}, ["quasiquote-list"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, quoted = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, ["reserved?"] = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, lumen = {import = {{"lumen", "special"}}, export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["flag?"] = {variable = true}, read = {export = true, variable = true}, ["read-char"] = {variable = true}, ["define-reader"] = {export = true, macro = function (_g770, ...)
    local char = _g770[1]
    local stream = _g770[2]
    local body = unstash({...})
    local _g771 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g771)})
  end}, eof = {variable = true}, ["skip-non-code"] = {variable = true}, delimiters = {variable = true}, ["key?"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, ["read-all"] = {export = true, variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["parenthesize-call?"] = {variable = true}, eval = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, infix = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["can-return?"] = {variable = true}, process = {variable = true}, ["infix?"] = {variable = true}, declare = {export = true, variable = true}, ["op-delims"] = {variable = true}, ["lower-try"] = {variable = true}, getop = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["lower-while"] = {variable = true}, ["compile-infix"] = {variable = true}, ["current-module"] = {export = true, global = true}, ["compiling?"] = {variable = true}, ["lower-function"] = {variable = true}, ["module-path"] = {variable = true}, ["lower-short"] = {variable = true}, reimported = {variable = true}, ["lower-if"] = {variable = true}, ["%compile-module"] = {variable = true}, conclude = {variable = true}, ["compile-file"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["lower-definition"] = {variable = true}, ["compiler-output"] = {variable = true}, encapsulate = {variable = true}, ["lower-for"] = {variable = true}, ["%result"] = {export = true, global = true}, ["lower-call"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["lower-special"] = {variable = true}, ["compile-special"] = {variable = true}, ["compile-atom"] = {variable = true}, run = {variable = true}, precedence = {variable = true}, ["compile-args"] = {variable = true}, ["lower-statement"] = {variable = true}, terminator = {variable = true}, compile = {export = true, variable = true}, ["compile-call"] = {variable = true}, ["unary?"] = {variable = true}, lower = {variable = true}, ["import-modules"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g772 = sub(body, 0)
    local alias = _g772.alias
    local exp = _g772.export
    local imp = _g772.import
    local _g773 = import_modules(imp)
    local imports = _g773[1]
    local bindings = _g773[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g774 = exp or {}
    local _g775 = 0
    while _g775 < length(_g774) do
      local x = _g774[_g775 + 1]
      setenv(x, {_stash = true, export = true})
      _g775 = _g775 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g788 = nexus["lumen/runtime"]
  local pair = _g788.pair
  local _37message_handler = _g788["%message-handler"]
  local stash = _g788.stash
  local atom63 = _g788["atom?"]
  local apply = _g788.apply
  local composite63 = _g788["composite?"]
  local string_literal63 = _g788["string-literal?"]
  local reduce = _g788.reduce
  local join = _g788.join
  local _62 = _g788[">"]
  local _61 = _g788["="]
  local _60 = _g788["<"]
  local module = _g788.module
  local list63 = _g788["list?"]
  local string63 = _g788["string?"]
  local today = _g788.today
  local iterate = _g788.iterate
  local _ = _g788["-"]
  local length = _g788.length
  local _47 = _g788["/"]
  local cat = _g788.cat
  local _43 = _g788["+"]
  local char = _g788.char
  local _37 = _g788["%"]
  local unstash = _g788.unstash
  local keys63 = _g788["keys?"]
  local is63 = _g788["is?"]
  local some63 = _g788["some?"]
  local none63 = _g788["none?"]
  local read_file = _g788["read-file"]
  local map = _g788.map
  local _6261 = _g788[">="]
  local _6061 = _g788["<="]
  local one63 = _g788["one?"]
  local now = _g788.now
  local number63 = _g788["number?"]
  local table63 = _g788["table?"]
  local replicate = _g788.replicate
  local code = _g788.code
  local make_id = _g788["make-id"]
  local find = _g788.find
  local in63 = _g788["in?"]
  local drop = _g788.drop
  local add = _g788.add
  local keep = _g788.keep
  local split = _g788.split
  local space = _g788.space
  local module_key = _g788["module-key"]
  local substring = _g788.substring
  local sub = _g788.sub
  local reverse = _g788.reverse
  local sort = _g788.sort
  local tl = _g788.tl
  local setenv = _g788.setenv
  local string = _g788.string
  local number = _g788.number
  local inner = _g788.inner
  local exit = _g788.exit
  local nil63 = _g788["nil?"]
  local write = _g788.write
  local toplevel63 = _g788["toplevel?"]
  local hd = _g788.hd
  local boolean63 = _g788["boolean?"]
  local write_file = _g788["write-file"]
  local _42 = _g788["*"]
  local search = _g788.search
  local function63 = _g788["function?"]
  local last = _g788.last
  local empty63 = _g788["empty?"]
  local id_literal63 = _g788["id-literal?"]
  local series = _g788.series
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local pair = _g2.pair
  local _37message_handler = _g2["%message-handler"]
  local stash = _g2.stash
  local mop = _g2.mop
  local search = _g2.search
  local apply = _g2.apply
  local composite63 = _g2["composite?"]
  local string_literal63 = _g2["string-literal?"]
  local reduce = _g2.reduce
  local boolean63 = _g2["boolean?"]
  local _62 = _g2[">"]
  local _61 = _g2["="]
  local _60 = _g2["<"]
  local module = _g2.module
  local list63 = _g2["list?"]
  local module_key = _g2["module-key"]
  local today = _g2.today
  local iterate = _g2.iterate
  local _ = _g2["-"]
  local length = _g2.length
  local _47 = _g2["/"]
  local cat = _g2.cat
  local _43 = _g2["+"]
  local char = _g2.char
  local _37 = _g2["%"]
  local unstash = _g2.unstash
  local keys63 = _g2["keys?"]
  local is63 = _g2["is?"]
  local some63 = _g2["some?"]
  local series = _g2.series
  local read_file = _g2["read-file"]
  local map = _g2.map
  local _6261 = _g2[">="]
  local _6061 = _g2["<="]
  local one63 = _g2["one?"]
  local now = _g2.now
  local number63 = _g2["number?"]
  local table63 = _g2["table?"]
  local replicate = _g2.replicate
  local code = _g2.code
  local make_id = _g2["make-id"]
  local space = _g2.space
  local in63 = _g2["in?"]
  local drop = _g2.drop
  local add = _g2.add
  local keep = _g2.keep
  local string63 = _g2["string?"]
  local split = _g2.split
  local atom63 = _g2["atom?"]
  local inner = _g2.inner
  local substring = _g2.substring
  local hd = _g2.hd
  local reverse = _g2.reverse
  local sort = _g2.sort
  local setenv = _g2.setenv
  local nil63 = _g2["nil?"]
  local number = _g2.number
  local tl = _g2.tl
  local sub = _g2.sub
  local find = _g2.find
  local write = _g2.write
  local toplevel63 = _g2["toplevel?"]
  local empty63 = _g2["empty?"]
  local exit = _g2.exit
  local _42 = _g2["*"]
  local string = _g2.string
  local last = _g2.last
  local function63 = _g2["function?"]
  local join = _g2.join
  local write_file = _g2["write-file"]
  local id_literal63 = _g2["id-literal?"]
  local none63 = _g2["none?"]
  local _g5 = nexus["lumen/reader"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local _g6 = nexus["lumen/compiler"]
  local eval = _g6.eval
  local compile_module = _g6["compile-module"]
  local load_module = _g6["load-module"]
  local declare = _g6.declare
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local in_module = _g6["in-module"]
  local open_module = _g6["open-module"]
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g792,_g793 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g791 = {_g792, _g793}
    local _g1 = _g791[1]
    local x = _g791[2]
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
    local _g794 = args
    local i = 0
    while i < length(_g794) do
      local arg = _g794[i + 1]
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
