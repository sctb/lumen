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
      local _g67
      if nil63(from) or from < 0 then
        _g67 = 0
      else
        _g67 = from
      end
      local i = _g67
      local n = length(x)
      local _g68
      if nil63(upto) or upto > n then
        _g68 = n
      else
        _g68 = upto
      end
      local _g27 = _g68
      while i < _g27 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g28 = x
      local k = nil
      for k in next, _g28 do
        local v = _g28[k]
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
    local _g69
    if n then
      _g69 = n + 1
    end
    return(string.byte(str, _g69))
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
      local _g30 = a
      local k = nil
      for k in next, _g30 do
        local v = _g30[k]
        c[k] = v
      end
      local _g32 = b
      local k = nil
      for k in next, _g32 do
        local v = _g32[k]
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
    local _g34 = x
    local k = nil
    for k in next, _g34 do
      local v = _g34[k]
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
    local _g36 = t
    local _g19 = nil
    for _g19 in next, _g36 do
      local y = _g36[_g19]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g38 = t
    local _g20 = nil
    for _g20 in next, _g38 do
      local x = _g38[_g20]
      local _g40 = f(x)
      if _g40 then
        return(_g40)
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
    local _g41 = x
    local k = nil
    for k in next, _g41 do
      local v = _g41[k]
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
    local b = false
    local _g43 = t
    local k = nil
    for k in next, _g43 do
      local _g21 = _g43[k]
      if not number63(k) then
        b = true
        break
      end
    end
    return(b)
  end
  nexus["lumen/runtime"]["keys?"] = keys63
  local function empty63(t)
    local b = true
    local _g45 = t
    local _g22 = nil
    for _g22 in next, _g45 do
      local _g23 = _g45[_g22]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g47 = args
      local k = nil
      for k in next, _g47 do
        local v = _g47[k]
        if not number63(k) then
          p[k] = v
        end
      end
      p._stash = true
      add(args, p)
    end
    return(args)
  end
  nexus["lumen/runtime"].stash = stash
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = sub(args, 0, length(args) - 1)
        local _g49 = l
        local k = nil
        for k in next, _g49 do
          local v = _g49[k]
          if not (k == "_stash") then
            args1[k] = v
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
    local _g70
    if start then
      _g70 = start + 1
    end
    local _g51 = _g70
    local i = string.find(str, pattern, _g51, true)
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
    local _g52 = sub(xs, 0)
    if none63(_g52) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g52))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g53 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g53))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g54 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g54)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g55))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g56)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g57 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g57)))
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
            local sp = ""
            local xs = {}
            local ks = {}
            local _g58 = x
            local k = nil
            for k in next, _g58 do
              local v = _g58[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _g60 = join(xs, ks)
            local _g24 = nil
            for _g24 in next, _g60 do
              local v = _g60[_g24]
              str = str .. sp .. v
              sp = " "
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
    local _g62 = stash(args)
    return(f(unpack(_g62)))
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
    local _g63 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g64 = _g63
      local _g66 = nil
      for _g66 in next, _g64 do
        local v = _g64[_g66]
        x[_g66] = v
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
  local _g74 = nexus["lumen/runtime"]
  local nil63 = _g74["nil?"]
  local is63 = _g74["is?"]
  local length = _g74.length
  local none63 = _g74["none?"]
  local some63 = _g74["some?"]
  local one63 = _g74["one?"]
  local hd = _g74.hd
  local string63 = _g74["string?"]
  local number63 = _g74["number?"]
  local boolean63 = _g74["boolean?"]
  local function63 = _g74["function?"]
  local composite63 = _g74["composite?"]
  local atom63 = _g74["atom?"]
  local table63 = _g74["table?"]
  local list63 = _g74["list?"]
  local substring = _g74.substring
  local sub = _g74.sub
  local inner = _g74.inner
  local tl = _g74.tl
  local char = _g74.char
  local code = _g74.code
  local string_literal63 = _g74["string-literal?"]
  local id_literal63 = _g74["id-literal?"]
  local add = _g74.add
  local drop = _g74.drop
  local last = _g74.last
  local reverse = _g74.reverse
  local join = _g74.join
  local reduce = _g74.reduce
  local keep = _g74.keep
  local in63 = _g74["in?"]
  local find = _g74.find
  local pair = _g74.pair
  local sort = _g74.sort
  local iterate = _g74.iterate
  local replicate = _g74.replicate
  local series = _g74.series
  local map = _g74.map
  local keys63 = _g74["keys?"]
  local empty63 = _g74["empty?"]
  local stash = _g74.stash
  local unstash = _g74.unstash
  local search = _g74.search
  local split = _g74.split
  local cat = _g74.cat
  local _43 = _g74["+"]
  local _ = _g74["-"]
  local _42 = _g74["*"]
  local _47 = _g74["/"]
  local _37 = _g74["%"]
  local _62 = _g74[">"]
  local _60 = _g74["<"]
  local _61 = _g74["="]
  local _6261 = _g74[">="]
  local _6061 = _g74["<="]
  local read_file = _g74["read-file"]
  local write_file = _g74["write-file"]
  local write = _g74.write
  local exit = _g74.exit
  local today = _g74.today
  local now = _g74.now
  local number = _g74.number
  local string = _g74.string
  local space = _g74.space
  local apply = _g74.apply
  local make_id = _g74["make-id"]
  local _37message_handler = _g74["%message-handler"]
  local toplevel63 = _g74["toplevel?"]
  local module_key = _g74["module-key"]
  local module = _g74.module
  local setenv = _g74.setenv
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
      local _g112
      if c == "\n" then
        _g112 = "\\n"
      else
        local _g113
        if c == "\"" then
          _g113 = "\\\""
        else
          local _g114
          if c == "\\" then
            _g114 = "\\\\"
          else
            _g114 = c
          end
          _g113 = _g114
        end
        _g112 = _g113
      end
      local c1 = _g112
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
      local _g77 = args
      local k = nil
      for k in next, _g77 do
        if not number63(k) then
          local v = _g77[k]
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
        local _g78 = lh
        local i = 0
        while i < length(_g78) do
          local x = _g78[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g79 = lh
        local k = nil
        for k in next, _g79 do
          if not number63(k) then
            local v = _g79[k]
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
      local _g80 = args
      local _g81 = 0
      while _g81 < length(_g80) do
        local arg = _g80[_g81 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g81 = _g81 + 1
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
          local _g71 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g72 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g84 = args
            local _g85 = 0
            while _g85 < length(_g84) do
              local _g82 = _g84[_g85 + 1]
              setenv(_g82, {_stash = true, variable = true})
              _g85 = _g85 + 1
            end
            local _g83 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g83)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g73 = form[1]
              local _g86 = form[2]
              local _g87 = form[3]
              local _g88 = sub(form, 3)
              add(environment, {_scope = true})
              local _g91 = _g87
              local _g92 = 0
              while _g92 < length(_g91) do
                local _g89 = _g91[_g92 + 1]
                setenv(_g89, {_stash = true, variable = true})
                _g92 = _g92 + 1
              end
              local _g90 = join({x, _g86, _g87}, macroexpand(_g88))
              drop(environment)
              return(_g90)
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
    local _g93 = form
    local k = nil
    for k in next, _g93 do
      if not number63(k) then
        local v = _g93[k]
        local _g115
        if quasisplice63(v, depth) then
          _g115 = quasiexpand(v[2])
        else
          _g115 = quasiexpand(v, depth)
        end
        local _g94 = _g115
        last(xs)[k] = _g94
      end
    end
    local _g95 = form
    local _g96 = 0
    while _g96 < length(_g95) do
      local x = _g95[_g96 + 1]
      if quasisplice63(x, depth) then
        local _g97 = quasiexpand(x[2])
        add(xs, _g97)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g96 = _g96 + 1
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
      local _g116
      if c == "-" then
        _g116 = "_"
      else
        local _g117
        if valid_code63(n) then
          _g117 = c
        else
          local _g118
          if i == 0 then
            _g118 = "_" .. n
          else
            _g118 = n
          end
          _g117 = _g118
        end
        _g116 = _g117
      end
      local c1 = _g116
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
    local _g102 = unstash({...})
    local _g103 = _g102.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g104 = module(spec).export
      local n = nil
      for n in next, _g104 do
        if not number63(n) then
          local b = _g104[n]
          if b.variable and (_g103 or b.export) then
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
    local _g105 = sub(xs, 0)
    return(join(t, _g105))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g106 = sub(keys, 0)
    local t1 = {}
    local _g107 = t
    local _g108 = 0
    while _g108 < length(_g107) do
      local x = _g107[_g108 + 1]
      add(t1, x)
      _g108 = _g108 + 1
    end
    local _g109 = t
    local k = nil
    for k in next, _g109 do
      if not number63(k) then
        local v = _g109[k]
        if not _g106[k] then
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
    local _g110 = t
    local k = nil
    for k in next, _g110 do
      if not number63(k) then
        local v = _g110[k]
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
    local _g111 = {"table"}
    _g111.import = quoted(m.import)
    _g111.alias = quoted(m.alias)
    _g111.export = quote_frame(m.export)
    return(_g111)
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
  local series = _g119.series
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
  local _g130 = nexus["lumen/runtime"]
  local nil63 = _g130["nil?"]
  local is63 = _g130["is?"]
  local length = _g130.length
  local none63 = _g130["none?"]
  local some63 = _g130["some?"]
  local one63 = _g130["one?"]
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
  local in63 = _g130["in?"]
  local find = _g130.find
  local pair = _g130.pair
  local sort = _g130.sort
  local iterate = _g130.iterate
  local replicate = _g130.replicate
  local series = _g130.series
  local map = _g130.map
  local keys63 = _g130["keys?"]
  local empty63 = _g130["empty?"]
  local stash = _g130.stash
  local unstash = _g130.unstash
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
  local today = _g130.today
  local now = _g130.now
  local number = _g130.number
  local string = _g130.string
  local space = _g130.space
  local apply = _g130.apply
  local make_id = _g130["make-id"]
  local _37message_handler = _g130["%message-handler"]
  local toplevel63 = _g130["toplevel?"]
  local module_key = _g130["module-key"]
  local module = _g130.module
  local setenv = _g130.setenv
  local _g133 = nexus["lumen/lib"]
  local getenv = _g133.getenv
  local macro_function = _g133["macro-function"]
  local macro63 = _g133["macro?"]
  local special63 = _g133["special?"]
  local special_form63 = _g133["special-form?"]
  local statement63 = _g133["statement?"]
  local symbol_expansion = _g133["symbol-expansion"]
  local symbol63 = _g133["symbol?"]
  local variable63 = _g133["variable?"]
  local bound63 = _g133["bound?"]
  local quoted = _g133.quoted
  local stash42 = _g133["stash*"]
  local bind = _g133.bind
  local bind42 = _g133["bind*"]
  local quasiexpand = _g133.quasiexpand
  local macroexpand = _g133.macroexpand
  local indentation = _g133.indentation
  local reserved63 = _g133["reserved?"]
  local valid_id63 = _g133["valid-id?"]
  local id = _g133.id
  local key = _g133.key
  local imported = _g133.imported
  local link = _g133.link
  local mapo = _g133.mapo
  local quote_environment = _g133["quote-environment"]
  local quote_modules = _g133["quote-modules"]
  local initial_environment = _g133["initial-environment"]
  local _g134 = nexus["lumen/reader"]
  local make_stream = _g134["make-stream"]
  local read_table = _g134["read-table"]
  local read = _g134.read
  local read_all = _g134["read-all"]
  local read_from_string = _g134["read-from-string"]
  local _g138 = {}
  _g138.js = "!"
  _g138.lua = "not "
  local _g136 = {}
  local _g139 = {}
  _g139.js = "!"
  _g139.lua = "not "
  _g136["not"] = _g139
  local _g141 = {}
  _g141["*"] = true
  _g141["/"] = true
  _g141["%"] = true
  local _g143 = {}
  _g143["+"] = true
  _g143["-"] = true
  local _g147 = {}
  _g147.js = "+"
  _g147.lua = ".."
  local _g145 = {}
  local _g148 = {}
  _g148.js = "+"
  _g148.lua = ".."
  _g145.cat = _g148
  local _g150 = {}
  _g150["<"] = true
  _g150[">"] = true
  _g150["<="] = true
  _g150[">="] = true
  local _g154 = {}
  _g154.js = "==="
  _g154.lua = "=="
  local _g156 = {}
  _g156.js = "!="
  _g156.lua = "~="
  local _g152 = {}
  local _g157 = {}
  _g157.js = "==="
  _g157.lua = "=="
  _g152["="] = _g157
  local _g158 = {}
  _g158.js = "!="
  _g158.lua = "~="
  _g152["~="] = _g158
  local _g162 = {}
  _g162.js = "&&"
  _g162.lua = "and"
  local _g160 = {}
  local _g163 = {}
  _g163.js = "&&"
  _g163.lua = "and"
  _g160["and"] = _g163
  local _g167 = {}
  _g167.js = "||"
  _g167.lua = "or"
  local _g165 = {}
  local _g168 = {}
  _g168.js = "||"
  _g168.lua = "or"
  _g165["or"] = _g168
  local infix = {_g136, _g141, _g143, _g145, _g150, _g152, _g160, _g165}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g169 = infix
      local i = 0
      while i < length(_g169) do
        local level = _g169[i + 1]
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
    local _g170 = args
    local i = 0
    while i < length(_g170) do
      local arg = _g170[i + 1]
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
    local _g171 = getenv(x)
    local special = _g171.special
    local stmt = _g171.stmt
    local self_tr63 = _g171.tr
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
    local _g172 = unstash({...})
    local right = _g172.right
    local _g201
    if right then
      _g201 = _6261
    else
      _g201 = _62
    end
    if _g201(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g173 = sub(form, 1)
    local a = _g173[1]
    local b = _g173[2]
    local _g174 = op_delims(form, a)
    local ao = _g174[1]
    local ac = _g174[2]
    local _g175 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g175[1]
    local bc = _g175[2]
    local _g176 = compile(a)
    local _g177 = compile(b)
    local _g178 = getop(op)
    if unary63(form) then
      return(_g178 .. ao .. _g176 .. ac)
    else
      return(ao .. _g176 .. ac .. " " .. _g178 .. " " .. bo .. _g177 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g179 = unstash({...})
    local name = _g179.name
    local prefix = _g179.prefix
    local _g202
    if name then
      _g202 = compile(name)
    else
      _g202 = ""
    end
    local id = _g202
    local _g180 = prefix or ""
    local _g181 = compile_args(args)
    indent_level = indent_level + 1
    local _g183 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g182 = _g183
    local ind = indentation()
    local _g203
    if target == "js" then
      _g203 = ""
    else
      _g203 = "end"
    end
    local tr = _g203
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g181 .. " {\n" .. _g182 .. ind .. "}" .. tr)
    else
      return(_g180 .. "function " .. id .. _g181 .. "\n" .. _g182 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g184 = unstash({...})
    local stmt = _g184.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g204
        if stmt then
          _g204 = indentation()
        else
          _g204 = ""
        end
        local ind = _g204
        local _g205
        if atom63(form) then
          _g205 = compile_atom(form)
        else
          local _g206
          if infix63(hd(form)) then
            _g206 = compile_infix(form)
          else
            _g206 = compile_call(form)
          end
          _g205 = _g206
        end
        local _g185 = _g205
        return(ind .. _g185 .. tr)
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
    local _g186 = sub(args, 0, length(args) - 1)
    local _g187 = 0
    while _g187 < length(_g186) do
      local x = _g186[_g187 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g187 = _g187 + 1
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
    local _g188 = args[2]
    local _g189 = args[3]
    if stmt63 or tail63 then
      local _g208
      if _g189 then
        _g208 = {lower_body({_g189}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g188}, tail63)}, _g208)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g207
      if _g189 then
        _g207 = {lower({"set", e, _g189})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g188})}, _g207))
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
      local _g209
      if x == "and" then
        _g209 = {"%if", id, b, id}
      else
        _g209 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g209}, hoist))
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
    local _g190 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g190, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g191 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g191) then
      return(_g191)
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
    local _g192 = unstash({...})
    local _g193 = _g192.all
    local m = module(spec)
    local frame = last(environment)
    local _g194 = m.export
    local k = nil
    for k in next, _g194 do
      if not number63(k) then
        local v = _g194[k]
        if v.export or _g193 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g195 = unstash({...})
    local _g196 = _g195.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g196}))
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
    local _g197 = specs or {}
    local _g198 = 0
    while _g198 < length(_g197) do
      local spec = _g197[_g198 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g199 = import_modules(m.alias)
        local aliased = _g199[1]
        local bs = _g199[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g200 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g200)
      end
      _g198 = _g198 + 1
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
  local _g210 = nexus["lumen/runtime"]
  local nil63 = _g210["nil?"]
  local is63 = _g210["is?"]
  local length = _g210.length
  local none63 = _g210["none?"]
  local some63 = _g210["some?"]
  local one63 = _g210["one?"]
  local hd = _g210.hd
  local string63 = _g210["string?"]
  local number63 = _g210["number?"]
  local boolean63 = _g210["boolean?"]
  local function63 = _g210["function?"]
  local composite63 = _g210["composite?"]
  local atom63 = _g210["atom?"]
  local table63 = _g210["table?"]
  local list63 = _g210["list?"]
  local substring = _g210.substring
  local sub = _g210.sub
  local inner = _g210.inner
  local tl = _g210.tl
  local char = _g210.char
  local code = _g210.code
  local string_literal63 = _g210["string-literal?"]
  local id_literal63 = _g210["id-literal?"]
  local add = _g210.add
  local drop = _g210.drop
  local last = _g210.last
  local reverse = _g210.reverse
  local join = _g210.join
  local reduce = _g210.reduce
  local keep = _g210.keep
  local in63 = _g210["in?"]
  local find = _g210.find
  local pair = _g210.pair
  local sort = _g210.sort
  local iterate = _g210.iterate
  local replicate = _g210.replicate
  local series = _g210.series
  local map = _g210.map
  local keys63 = _g210["keys?"]
  local empty63 = _g210["empty?"]
  local stash = _g210.stash
  local unstash = _g210.unstash
  local search = _g210.search
  local split = _g210.split
  local cat = _g210.cat
  local _43 = _g210["+"]
  local _ = _g210["-"]
  local _42 = _g210["*"]
  local _47 = _g210["/"]
  local _37 = _g210["%"]
  local _62 = _g210[">"]
  local _60 = _g210["<"]
  local _61 = _g210["="]
  local _6261 = _g210[">="]
  local _6061 = _g210["<="]
  local read_file = _g210["read-file"]
  local write_file = _g210["write-file"]
  local write = _g210.write
  local exit = _g210.exit
  local today = _g210.today
  local now = _g210.now
  local number = _g210.number
  local string = _g210.string
  local space = _g210.space
  local apply = _g210.apply
  local make_id = _g210["make-id"]
  local _37message_handler = _g210["%message-handler"]
  local toplevel63 = _g210["toplevel?"]
  local module_key = _g210["module-key"]
  local module = _g210.module
  local setenv = _g210.setenv
  local _g213 = nexus["lumen/lib"]
  local getenv = _g213.getenv
  local macro_function = _g213["macro-function"]
  local macro63 = _g213["macro?"]
  local special63 = _g213["special?"]
  local special_form63 = _g213["special-form?"]
  local statement63 = _g213["statement?"]
  local symbol_expansion = _g213["symbol-expansion"]
  local symbol63 = _g213["symbol?"]
  local variable63 = _g213["variable?"]
  local bound63 = _g213["bound?"]
  local quoted = _g213.quoted
  local stash42 = _g213["stash*"]
  local bind = _g213.bind
  local bind42 = _g213["bind*"]
  local quasiexpand = _g213.quasiexpand
  local macroexpand = _g213.macroexpand
  local indentation = _g213.indentation
  local reserved63 = _g213["reserved?"]
  local valid_id63 = _g213["valid-id?"]
  local id = _g213.id
  local key = _g213.key
  local imported = _g213.imported
  local link = _g213.link
  local mapo = _g213.mapo
  local quote_environment = _g213["quote-environment"]
  local quote_modules = _g213["quote-modules"]
  local initial_environment = _g213["initial-environment"]
  local _g214 = nexus["lumen/compiler"]
  local compile_function = _g214["compile-function"]
  local compile = _g214.compile
  local open_module = _g214["open-module"]
  local load_module = _g214["load-module"]
  local in_module = _g214["in-module"]
  local import_modules = _g214["import-modules"]
  local compile_module = _g214["compile-module"]
  local declare = _g214.declare
  local eval = _g214.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g388 = nexus["lumen/runtime"]
  local nil63 = _g388["nil?"]
  local is63 = _g388["is?"]
  local length = _g388.length
  local none63 = _g388["none?"]
  local some63 = _g388["some?"]
  local one63 = _g388["one?"]
  local hd = _g388.hd
  local string63 = _g388["string?"]
  local number63 = _g388["number?"]
  local boolean63 = _g388["boolean?"]
  local function63 = _g388["function?"]
  local composite63 = _g388["composite?"]
  local atom63 = _g388["atom?"]
  local table63 = _g388["table?"]
  local list63 = _g388["list?"]
  local substring = _g388.substring
  local sub = _g388.sub
  local inner = _g388.inner
  local tl = _g388.tl
  local char = _g388.char
  local code = _g388.code
  local string_literal63 = _g388["string-literal?"]
  local id_literal63 = _g388["id-literal?"]
  local add = _g388.add
  local drop = _g388.drop
  local last = _g388.last
  local reverse = _g388.reverse
  local join = _g388.join
  local reduce = _g388.reduce
  local keep = _g388.keep
  local in63 = _g388["in?"]
  local find = _g388.find
  local pair = _g388.pair
  local sort = _g388.sort
  local iterate = _g388.iterate
  local replicate = _g388.replicate
  local series = _g388.series
  local map = _g388.map
  local keys63 = _g388["keys?"]
  local empty63 = _g388["empty?"]
  local stash = _g388.stash
  local unstash = _g388.unstash
  local search = _g388.search
  local split = _g388.split
  local cat = _g388.cat
  local _43 = _g388["+"]
  local _ = _g388["-"]
  local _42 = _g388["*"]
  local _47 = _g388["/"]
  local _37 = _g388["%"]
  local _62 = _g388[">"]
  local _60 = _g388["<"]
  local _61 = _g388["="]
  local _6261 = _g388[">="]
  local _6061 = _g388["<="]
  local read_file = _g388["read-file"]
  local write_file = _g388["write-file"]
  local write = _g388.write
  local exit = _g388.exit
  local today = _g388.today
  local now = _g388.now
  local number = _g388.number
  local string = _g388.string
  local space = _g388.space
  local apply = _g388.apply
  local make_id = _g388["make-id"]
  local _37message_handler = _g388["%message-handler"]
  local toplevel63 = _g388["toplevel?"]
  local module_key = _g388["module-key"]
  local module = _g388.module
  local setenv = _g388.setenv
  local _g391 = nexus["lumen/lib"]
  local getenv = _g391.getenv
  local macro_function = _g391["macro-function"]
  local macro63 = _g391["macro?"]
  local special63 = _g391["special?"]
  local special_form63 = _g391["special-form?"]
  local statement63 = _g391["statement?"]
  local symbol_expansion = _g391["symbol-expansion"]
  local symbol63 = _g391["symbol?"]
  local variable63 = _g391["variable?"]
  local bound63 = _g391["bound?"]
  local quoted = _g391.quoted
  local stash42 = _g391["stash*"]
  local bind = _g391.bind
  local bind42 = _g391["bind*"]
  local quasiexpand = _g391.quasiexpand
  local macroexpand = _g391.macroexpand
  local indentation = _g391.indentation
  local reserved63 = _g391["reserved?"]
  local valid_id63 = _g391["valid-id?"]
  local id = _g391.id
  local key = _g391.key
  local imported = _g391.imported
  local link = _g391.link
  local mapo = _g391.mapo
  local quote_environment = _g391["quote-environment"]
  local quote_modules = _g391["quote-modules"]
  local initial_environment = _g391["initial-environment"]
  local _g392 = nexus["lumen/compiler"]
  local compile_function = _g392["compile-function"]
  local compile = _g392.compile
  local open_module = _g392["open-module"]
  local load_module = _g392["load-module"]
  local in_module = _g392["in-module"]
  local import_modules = _g392["import-modules"]
  local compile_module = _g392["compile-module"]
  local declare = _g392.declare
  local eval = _g392.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g701 = nexus["lumen/runtime"]
  local nil63 = _g701["nil?"]
  local is63 = _g701["is?"]
  local length = _g701.length
  local none63 = _g701["none?"]
  local some63 = _g701["some?"]
  local one63 = _g701["one?"]
  local hd = _g701.hd
  local string63 = _g701["string?"]
  local number63 = _g701["number?"]
  local boolean63 = _g701["boolean?"]
  local function63 = _g701["function?"]
  local composite63 = _g701["composite?"]
  local atom63 = _g701["atom?"]
  local table63 = _g701["table?"]
  local list63 = _g701["list?"]
  local substring = _g701.substring
  local sub = _g701.sub
  local inner = _g701.inner
  local tl = _g701.tl
  local char = _g701.char
  local code = _g701.code
  local string_literal63 = _g701["string-literal?"]
  local id_literal63 = _g701["id-literal?"]
  local add = _g701.add
  local drop = _g701.drop
  local last = _g701.last
  local reverse = _g701.reverse
  local join = _g701.join
  local reduce = _g701.reduce
  local keep = _g701.keep
  local in63 = _g701["in?"]
  local find = _g701.find
  local pair = _g701.pair
  local sort = _g701.sort
  local iterate = _g701.iterate
  local replicate = _g701.replicate
  local series = _g701.series
  local map = _g701.map
  local keys63 = _g701["keys?"]
  local empty63 = _g701["empty?"]
  local stash = _g701.stash
  local unstash = _g701.unstash
  local search = _g701.search
  local split = _g701.split
  local cat = _g701.cat
  local _43 = _g701["+"]
  local _ = _g701["-"]
  local _42 = _g701["*"]
  local _47 = _g701["/"]
  local _37 = _g701["%"]
  local _62 = _g701[">"]
  local _60 = _g701["<"]
  local _61 = _g701["="]
  local _6261 = _g701[">="]
  local _6061 = _g701["<="]
  local read_file = _g701["read-file"]
  local write_file = _g701["write-file"]
  local write = _g701.write
  local exit = _g701.exit
  local today = _g701.today
  local now = _g701.now
  local number = _g701.number
  local string = _g701.string
  local space = _g701.space
  local apply = _g701.apply
  local make_id = _g701["make-id"]
  local _37message_handler = _g701["%message-handler"]
  local toplevel63 = _g701["toplevel?"]
  local module_key = _g701["module-key"]
  local module = _g701.module
  local setenv = _g701.setenv
  local _g704 = nexus["lumen/lib"]
  local getenv = _g704.getenv
  local macro_function = _g704["macro-function"]
  local macro63 = _g704["macro?"]
  local special63 = _g704["special?"]
  local special_form63 = _g704["special-form?"]
  local statement63 = _g704["statement?"]
  local symbol_expansion = _g704["symbol-expansion"]
  local symbol63 = _g704["symbol?"]
  local variable63 = _g704["variable?"]
  local bound63 = _g704["bound?"]
  local quoted = _g704.quoted
  local stash42 = _g704["stash*"]
  local bind = _g704.bind
  local bind42 = _g704["bind*"]
  local quasiexpand = _g704.quasiexpand
  local macroexpand = _g704.macroexpand
  local indentation = _g704.indentation
  local reserved63 = _g704["reserved?"]
  local valid_id63 = _g704["valid-id?"]
  local id = _g704.id
  local key = _g704.key
  local imported = _g704.imported
  local link = _g704.link
  local mapo = _g704.mapo
  local quote_environment = _g704["quote-environment"]
  local quote_modules = _g704["quote-modules"]
  local initial_environment = _g704["initial-environment"]
  local _g705 = nexus["lumen/compiler"]
  local compile_function = _g705["compile-function"]
  local compile = _g705.compile
  local open_module = _g705["open-module"]
  local load_module = _g705["load-module"]
  local in_module = _g705["in-module"]
  local import_modules = _g705["import-modules"]
  local compile_module = _g705["compile-module"]
  local declare = _g705.declare
  local eval = _g705.eval
  modules = {["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {tr = true, export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g718 = forms
    local _g719 = 0
    while _g719 < length(_g718) do
      local x = _g718[_g719 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g719 = _g719 + 1
    end
    return(str)
  end, stmt = true}, ["%if"] = {tr = true, export = true, foo = true, special = function (cond, cons, alt)
    local _g720 = compile(cond)
    indent_level = indent_level + 1
    local _g722 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g721 = _g722
    local _g789
    if alt then
      indent_level = indent_level + 1
      local _g724 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g789 = _g724
    end
    local _g723 = _g789
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g720 .. ") {\n" .. _g721 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g720 .. " then\n" .. _g721
    end
    if _g723 and target == "js" then
      str = str .. " else {\n" .. _g723 .. ind .. "}"
    else
      if _g723 then
        str = str .. ind .. "else\n" .. _g723
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true}, ["while"] = {tr = true, export = true, foo = true, special = function (cond, form)
    local _g725 = compile(cond)
    indent_level = indent_level + 1
    local _g726 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g726
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g725 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g725 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true}, ["%for"] = {tr = true, export = true, foo = true, special = function (t, k, form)
    local _g727 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g728 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g728
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g727 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g727 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true}, ["%try"] = {tr = true, export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g729 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g729
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g730 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g730
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true}, ["break"] = {stmt = true, export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true}, ["%function"] = {export = true, special = function (args, body)
    return(compile_function(args, body))
  end, foo = true}, ["%global-function"] = {tr = true, export = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true}, ["%local-function"] = {tr = true, export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true}, ["return"] = {stmt = true, export = true, special = function (x)
    local _g790
    if nil63(x) then
      _g790 = "return"
    else
      _g790 = "return(" .. compile(x) .. ")"
    end
    local _g731 = _g790
    return(indentation() .. _g731)
  end, foo = true}, error = {stmt = true, export = true, special = function (x)
    local _g791
    if target == "js" then
      _g791 = "throw new " .. compile({"Error", x})
    else
      _g791 = "error(" .. compile(x) .. ")"
    end
    local e = _g791
    return(indentation() .. e)
  end, foo = true}, ["%local"] = {stmt = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g792
    if is63(value) then
      _g792 = " = " .. value1
    else
      _g792 = ""
    end
    local rh = _g792
    local _g793
    if target == "js" then
      _g793 = "var "
    else
      _g793 = "local "
    end
    local keyword = _g793
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true}, set = {stmt = true, export = true, special = function (lh, rh)
    local _g732 = compile(lh)
    local _g794
    if nil63(rh) then
      _g794 = "nil"
    else
      _g794 = rh
    end
    local _g733 = compile(_g794)
    return(indentation() .. _g732 .. " = " .. _g733)
  end, foo = true}, get = {export = true, special = function (t, k)
    local _g734 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g734, 0) == "{" then
      _g734 = "(" .. _g734 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g734 .. "." .. inner(k))
    else
      return(_g734 .. "[" .. k1 .. "]")
    end
  end, foo = true}, ["not"] = {}, ["%array"] = {export = true, special = function (...)
    local forms = unstash({...})
    local _g795
    if target == "lua" then
      _g795 = "{"
    else
      _g795 = "["
    end
    local open = _g795
    local _g796
    if target == "lua" then
      _g796 = "}"
    else
      _g796 = "]"
    end
    local close = _g796
    local str = ""
    local _g735 = forms
    local i = 0
    while i < length(_g735) do
      local x = _g735[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, foo = true}, ["%object"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g797
    if target == "lua" then
      _g797 = " = "
    else
      _g797 = ": "
    end
    local sep = _g797
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g736 = pairs
    local i = 0
    while i < length(_g736) do
      local _g737 = _g736[i + 1]
      local k = _g737[1]
      local v = _g737[2]
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
  end, foo = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g738, ...)
    local char = _g738[1]
    local stream = _g738[2]
    local body = unstash({...})
    local _g739 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g739)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g740 = body
      local k = nil
      for k in next, _g740 do
        if not number63(k) then
          local v = _g740[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g741)
      local a = _g741[1]
      local b = _g741[2]
      local c = sub(_g741, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g742 = sub(body, 0)
    return({"if", cond, join({"do"}, _g742)})
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g743 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g743)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g744 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g744))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g745 = bind(lh, rh)
      local _g746 = 0
      while _g746 < length(_g745) do
        local _g747 = _g745[_g746 + 1]
        local id = _g747[1]
        local val = _g747[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g746 = _g746 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g744)}})))
    end
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g748 = sub(body, 0)
    local imp = _g748.import
    local exp = _g748.export
    local alias = _g748.alias
    local _g749 = import_modules(imp)
    local imports = _g749[1]
    local bindings = _g749[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g750 = exp or {}
    local _g751 = 0
    while _g751 < length(_g750) do
      local x = _g750[_g751 + 1]
      setenv(x, {_stash = true, export = true})
      _g751 = _g751 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g752 = sub(body, 0)
    local form = join({"fn", args}, _g752)
    local _g753 = {"setenv", {"quote", name}}
    _g753.macro = form
    _g753.form = {"quote", form}
    eval(_g753)
    return(nil)
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g754 = sub(body, 0)
    local form = join({"fn", args}, _g754)
    local keys = sub(_g754, length(_g754))
    local _g755 = {"setenv", {"quote", name}}
    _g755.special = form
    _g755.form = {"quote", form}
    eval(join(_g755, keys))
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g756 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g756) then
      local _g757 = bind42(x, _g756)
      local args = _g757[1]
      local _g758 = _g757[2]
      return(join({"%global-function", name, args}, _g758))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g759 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g759) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g759)}))
    else
      if some63(_g759) then
        local _g760 = bind42(x, _g759)
        local args = _g760[1]
        local _g761 = _g760[2]
        return(link(name, join({"%local-function", name, args}, _g761)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["with-bindings"] = {macro = function (_g762, ...)
    local names = _g762[1]
    local body = unstash({...})
    local _g763 = sub(body, 0)
    local x = make_id()
    local _g765 = {"setenv", x}
    _g765.variable = true
    local _g764 = {"with-frame", {"each", {x}, names, _g765}}
    _g764.scope = true
    return(join(_g764, _g763))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g766 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g767 = join({"do"}, macroexpand(_g766))
    drop(environment)
    return(_g767)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g768 = sub(body, 0)
    add(environment, {})
    map(function (_g770)
      local name = _g770[1]
      local exp = _g770[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g769 = join({"do"}, macroexpand(_g768))
    drop(environment)
    return(_g769)
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g771 = sub(body, 0)
    local _g772 = bind42(args, _g771)
    local _g773 = _g772[1]
    local _g774 = _g772[2]
    return(join({"%function", _g773}, _g774))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, all = {macro = function (_g775, t, ...)
    local k = _g775[1]
    local v = _g775[2]
    local body = unstash({...})
    local _g776 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g798
    if target == "lua" then
      _g798 = _g776
    else
      _g798 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g776)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g798)}})
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g777 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g799
    if nil63(v) then
      local _g800
      if b.i then
        _g800 = "i"
      else
        _g800 = make_id()
      end
      local i = _g800
      _g799 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g777), {"inc", i}}}
    else
      local _g778 = {"target"}
      _g778.js = {"isNaN", {"parseInt", k}}
      _g778.lua = {"not", {"number?", k}}
      _g799 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g778, join({"let", {v, {"get", t1, k}}}, _g777)}}}
    end
    return({"let", {t1, t}, _g799})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g779 = xs
    local _g780 = 0
    while _g780 < length(_g779) do
      local x = _g779[_g780 + 1]
      l[x] = true
      _g780 = _g780 + 1
    end
    return(join({"table"}, l))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g781 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g781)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g782 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g782)})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g783 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g784 = {"table"}
    _g784._scope = scope
    return({"do", {"add", "environment", _g784}, {"let", {x, join({"do"}, _g783)}, {"drop", "environment"}, x}})
  end, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g785 = sub(body, 0)
    local imp = _g785.import
    local exp = _g785.export
    local alias = _g785.alias
    local _g786 = import_modules(imp)
    local imports = _g786[1]
    local bindings = _g786[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g787 = exp or {}
    local _g788 = 0
    while _g788 < length(_g787) do
      local x = _g787[_g788 + 1]
      setenv(x, {_stash = true, export = true})
      _g788 = _g788 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g801 = nexus["lumen/runtime"]
  local nil63 = _g801["nil?"]
  local is63 = _g801["is?"]
  local length = _g801.length
  local none63 = _g801["none?"]
  local some63 = _g801["some?"]
  local one63 = _g801["one?"]
  local hd = _g801.hd
  local string63 = _g801["string?"]
  local number63 = _g801["number?"]
  local boolean63 = _g801["boolean?"]
  local function63 = _g801["function?"]
  local composite63 = _g801["composite?"]
  local atom63 = _g801["atom?"]
  local table63 = _g801["table?"]
  local list63 = _g801["list?"]
  local substring = _g801.substring
  local sub = _g801.sub
  local inner = _g801.inner
  local tl = _g801.tl
  local char = _g801.char
  local code = _g801.code
  local string_literal63 = _g801["string-literal?"]
  local id_literal63 = _g801["id-literal?"]
  local add = _g801.add
  local drop = _g801.drop
  local last = _g801.last
  local reverse = _g801.reverse
  local join = _g801.join
  local reduce = _g801.reduce
  local keep = _g801.keep
  local in63 = _g801["in?"]
  local find = _g801.find
  local pair = _g801.pair
  local sort = _g801.sort
  local iterate = _g801.iterate
  local replicate = _g801.replicate
  local series = _g801.series
  local map = _g801.map
  local keys63 = _g801["keys?"]
  local empty63 = _g801["empty?"]
  local stash = _g801.stash
  local unstash = _g801.unstash
  local search = _g801.search
  local split = _g801.split
  local cat = _g801.cat
  local _43 = _g801["+"]
  local _ = _g801["-"]
  local _42 = _g801["*"]
  local _47 = _g801["/"]
  local _37 = _g801["%"]
  local _62 = _g801[">"]
  local _60 = _g801["<"]
  local _61 = _g801["="]
  local _6261 = _g801[">="]
  local _6061 = _g801["<="]
  local read_file = _g801["read-file"]
  local write_file = _g801["write-file"]
  local write = _g801.write
  local exit = _g801.exit
  local today = _g801.today
  local now = _g801.now
  local number = _g801.number
  local string = _g801.string
  local space = _g801.space
  local apply = _g801.apply
  local make_id = _g801["make-id"]
  local _37message_handler = _g801["%message-handler"]
  local toplevel63 = _g801["toplevel?"]
  local module_key = _g801["module-key"]
  local module = _g801.module
  local setenv = _g801.setenv
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
  local series = _g2.series
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
    local _g805,_g806 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g804 = {_g805, _g806}
    local _g1 = _g804[1]
    local x = _g804[2]
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
    local _g807 = args
    local i = 0
    while i < length(_g807) do
      local arg = _g807[i + 1]
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
