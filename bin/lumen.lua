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
      local _g65
      if nil63(from) or from < 0 then
        _g65 = 0
      else
        _g65 = from
      end
      local i = _g65
      local n = length(x)
      local _g66
      if nil63(upto) or upto > n then
        _g66 = n
      else
        _g66 = upto
      end
      local _g27 = _g66
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
    local _g67
    if n then
      _g67 = n + 1
    end
    return(string.byte(str, _g67))
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
    local _g68
    if start then
      _g68 = start + 1
    end
    local _g51 = _g68
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
      local k1 = nil
      for k1 in next, _g64 do
        if not number63(k1) then
          local v = _g64[k1]
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
  local _g72 = nexus["lumen/runtime"]
  local empty63 = _g72["empty?"]
  local number = _g72.number
  local _ = _g72["-"]
  local some63 = _g72["some?"]
  local _47 = _g72["/"]
  local module_key = _g72["module-key"]
  local _37 = _g72["%"]
  local apply = _g72.apply
  local atom63 = _g72["atom?"]
  local stash = _g72.stash
  local split = _g72.split
  local length = _g72.length
  local pair = _g72.pair
  local exit = _g72.exit
  local id_literal63 = _g72["id-literal?"]
  local reduce = _g72.reduce
  local reverse = _g72.reverse
  local write = _g72.write
  local _6061 = _g72["<="]
  local is63 = _g72["is?"]
  local _6261 = _g72[">="]
  local keys63 = _g72["keys?"]
  local number63 = _g72["number?"]
  local boolean63 = _g72["boolean?"]
  local string_literal63 = _g72["string-literal?"]
  local in63 = _g72["in?"]
  local write_file = _g72["write-file"]
  local sub = _g72.sub
  local read_file = _g72["read-file"]
  local replicate = _g72.replicate
  local series = _g72.series
  local table63 = _g72["table?"]
  local make_id = _g72["make-id"]
  local space = _g72.space
  local add = _g72.add
  local substring = _g72.substring
  local setenv = _g72.setenv
  local module = _g72.module
  local toplevel63 = _g72["toplevel?"]
  local _37message_handler = _g72["%message-handler"]
  local last = _g72.last
  local _43 = _g72["+"]
  local unstash = _g72.unstash
  local join = _g72.join
  local code = _g72.code
  local char = _g72.char
  local string = _g72.string
  local iterate = _g72.iterate
  local cat = _g72.cat
  local now = _g72.now
  local hd = _g72.hd
  local inner = _g72.inner
  local tl = _g72.tl
  local find = _g72.find
  local _61 = _g72["="]
  local _60 = _g72["<"]
  local function63 = _g72["function?"]
  local composite63 = _g72["composite?"]
  local keep = _g72.keep
  local _62 = _g72[">"]
  local one63 = _g72["one?"]
  local _42 = _g72["*"]
  local search = _g72.search
  local map = _g72.map
  local drop = _g72.drop
  local none63 = _g72["none?"]
  local nil63 = _g72["nil?"]
  local today = _g72.today
  local sort = _g72.sort
  local list63 = _g72["list?"]
  local string63 = _g72["string?"]
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
      local _g110
      if c == "\n" then
        _g110 = "\\n"
      else
        local _g111
        if c == "\"" then
          _g111 = "\\\""
        else
          local _g112
          if c == "\\" then
            _g112 = "\\\\"
          else
            _g112 = c
          end
          _g111 = _g112
        end
        _g110 = _g111
      end
      local c1 = _g110
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
      local _g75 = args
      local k = nil
      for k in next, _g75 do
        if not number63(k) then
          local v = _g75[k]
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
        local _g76 = lh
        local i = 0
        while i < length(_g76) do
          local x = _g76[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g77 = lh
        local k = nil
        for k in next, _g77 do
          if not number63(k) then
            local v = _g77[k]
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
      local _g78 = args
      local _g79 = 0
      while _g79 < length(_g78) do
        local arg = _g78[_g79 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g79 = _g79 + 1
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
          local _g69 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g70 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g82 = args
            local _g83 = 0
            while _g83 < length(_g82) do
              local _g80 = _g82[_g83 + 1]
              setenv(_g80, {_stash = true, variable = true})
              _g83 = _g83 + 1
            end
            local _g81 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g81)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g71 = form[1]
              local _g84 = form[2]
              local _g85 = form[3]
              local _g86 = sub(form, 3)
              add(environment, {_scope = true})
              local _g89 = _g85
              local _g90 = 0
              while _g90 < length(_g89) do
                local _g87 = _g89[_g90 + 1]
                setenv(_g87, {_stash = true, variable = true})
                _g90 = _g90 + 1
              end
              local _g88 = join({x, _g84, _g85}, macroexpand(_g86))
              drop(environment)
              return(_g88)
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
    local _g91 = form
    local k = nil
    for k in next, _g91 do
      if not number63(k) then
        local v = _g91[k]
        local _g113
        if quasisplice63(v, depth) then
          _g113 = quasiexpand(v[2])
        else
          _g113 = quasiexpand(v, depth)
        end
        local _g92 = _g113
        last(xs)[k] = _g92
      end
    end
    local _g93 = form
    local _g94 = 0
    while _g94 < length(_g93) do
      local x = _g93[_g94 + 1]
      if quasisplice63(x, depth) then
        local _g95 = quasiexpand(x[2])
        add(xs, _g95)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g94 = _g94 + 1
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
  local reserved = {["new"] = true, ["var"] = true, ["else"] = true, ["delete"] = true, ["="] = true, ["this"] = true, ["*"] = true, ["switch"] = true, ["case"] = true, ["/"] = true, ["elseif"] = true, ["if"] = true, [">="] = true, ["break"] = true, ["<="] = true, ["repeat"] = true, ["catch"] = true, ["or"] = true, ["%"] = true, ["local"] = true, ["void"] = true, ["and"] = true, ["return"] = true, ["end"] = true, ["<"] = true, ["+"] = true, ["until"] = true, ["default"] = true, ["finally"] = true, ["not"] = true, ["debugger"] = true, ["then"] = true, ["while"] = true, ["false"] = true, ["continue"] = true, [">"] = true, ["nil"] = true, ["-"] = true, ["for"] = true, ["true"] = true, ["instanceof"] = true, ["with"] = true, ["do"] = true, ["=="] = true, ["throw"] = true, ["typeof"] = true, ["in"] = true, ["function"] = true, ["try"] = true}
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
      local _g114
      if c == "-" then
        _g114 = "_"
      else
        local _g115
        if valid_code63(n) then
          _g115 = c
        else
          local _g116
          if i == 0 then
            _g116 = "_" .. n
          else
            _g116 = n
          end
          _g115 = _g116
        end
        _g114 = _g115
      end
      local c1 = _g114
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
    local _g100 = unstash({...})
    local _g101 = _g100.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g102 = module(spec).export
      local n = nil
      for n in next, _g102 do
        if not number63(n) then
          local b = _g102[n]
          if b.variable and (_g101 or b.export) then
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
    local _g103 = sub(xs, 0)
    return(join(t, _g103))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g104 = sub(keys, 0)
    local t1 = {}
    local _g105 = t
    local _g106 = 0
    while _g106 < length(_g105) do
      local x = _g105[_g106 + 1]
      add(t1, x)
      _g106 = _g106 + 1
    end
    local _g107 = t
    local k = nil
    for k in next, _g107 do
      if not number63(k) then
        local v = _g107[k]
        if not _g104[k] then
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
    local _g108 = t
    local k = nil
    for k in next, _g108 do
      if not number63(k) then
        local v = _g108[k]
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
    local _g109 = {"table"}
    _g109.alias = quoted(m.alias)
    _g109.export = quote_frame(m.export)
    _g109.import = quoted(m.import)
    return(_g109)
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
  local _g117 = nexus["lumen/runtime"]
  local empty63 = _g117["empty?"]
  local number = _g117.number
  local _ = _g117["-"]
  local some63 = _g117["some?"]
  local _47 = _g117["/"]
  local module_key = _g117["module-key"]
  local _37 = _g117["%"]
  local apply = _g117.apply
  local atom63 = _g117["atom?"]
  local stash = _g117.stash
  local split = _g117.split
  local length = _g117.length
  local pair = _g117.pair
  local exit = _g117.exit
  local id_literal63 = _g117["id-literal?"]
  local reduce = _g117.reduce
  local reverse = _g117.reverse
  local write = _g117.write
  local _6061 = _g117["<="]
  local is63 = _g117["is?"]
  local _6261 = _g117[">="]
  local keys63 = _g117["keys?"]
  local number63 = _g117["number?"]
  local boolean63 = _g117["boolean?"]
  local string_literal63 = _g117["string-literal?"]
  local in63 = _g117["in?"]
  local write_file = _g117["write-file"]
  local sub = _g117.sub
  local read_file = _g117["read-file"]
  local replicate = _g117.replicate
  local series = _g117.series
  local table63 = _g117["table?"]
  local make_id = _g117["make-id"]
  local space = _g117.space
  local add = _g117.add
  local substring = _g117.substring
  local setenv = _g117.setenv
  local module = _g117.module
  local toplevel63 = _g117["toplevel?"]
  local _37message_handler = _g117["%message-handler"]
  local last = _g117.last
  local _43 = _g117["+"]
  local unstash = _g117.unstash
  local join = _g117.join
  local code = _g117.code
  local char = _g117.char
  local string = _g117.string
  local iterate = _g117.iterate
  local cat = _g117.cat
  local now = _g117.now
  local hd = _g117.hd
  local inner = _g117.inner
  local tl = _g117.tl
  local find = _g117.find
  local _61 = _g117["="]
  local _60 = _g117["<"]
  local function63 = _g117["function?"]
  local composite63 = _g117["composite?"]
  local keep = _g117.keep
  local _62 = _g117[">"]
  local one63 = _g117["one?"]
  local _42 = _g117["*"]
  local search = _g117.search
  local map = _g117.map
  local drop = _g117.drop
  local none63 = _g117["none?"]
  local nil63 = _g117["nil?"]
  local today = _g117.today
  local sort = _g117.sort
  local list63 = _g117["list?"]
  local string63 = _g117["string?"]
  local delimiters = {[";"] = true, ["\n"] = true, ["("] = true, [")"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({len = length(str), string = str, pos = 0})
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
  local _g128 = nexus["lumen/runtime"]
  local empty63 = _g128["empty?"]
  local number = _g128.number
  local _ = _g128["-"]
  local some63 = _g128["some?"]
  local _47 = _g128["/"]
  local module_key = _g128["module-key"]
  local _37 = _g128["%"]
  local apply = _g128.apply
  local atom63 = _g128["atom?"]
  local stash = _g128.stash
  local split = _g128.split
  local length = _g128.length
  local pair = _g128.pair
  local exit = _g128.exit
  local id_literal63 = _g128["id-literal?"]
  local reduce = _g128.reduce
  local reverse = _g128.reverse
  local write = _g128.write
  local _6061 = _g128["<="]
  local is63 = _g128["is?"]
  local _6261 = _g128[">="]
  local keys63 = _g128["keys?"]
  local number63 = _g128["number?"]
  local boolean63 = _g128["boolean?"]
  local string_literal63 = _g128["string-literal?"]
  local in63 = _g128["in?"]
  local write_file = _g128["write-file"]
  local sub = _g128.sub
  local read_file = _g128["read-file"]
  local replicate = _g128.replicate
  local series = _g128.series
  local table63 = _g128["table?"]
  local make_id = _g128["make-id"]
  local space = _g128.space
  local add = _g128.add
  local substring = _g128.substring
  local setenv = _g128.setenv
  local module = _g128.module
  local toplevel63 = _g128["toplevel?"]
  local _37message_handler = _g128["%message-handler"]
  local last = _g128.last
  local _43 = _g128["+"]
  local unstash = _g128.unstash
  local join = _g128.join
  local code = _g128.code
  local char = _g128.char
  local string = _g128.string
  local iterate = _g128.iterate
  local cat = _g128.cat
  local now = _g128.now
  local hd = _g128.hd
  local inner = _g128.inner
  local tl = _g128.tl
  local find = _g128.find
  local _61 = _g128["="]
  local _60 = _g128["<"]
  local function63 = _g128["function?"]
  local composite63 = _g128["composite?"]
  local keep = _g128.keep
  local _62 = _g128[">"]
  local one63 = _g128["one?"]
  local _42 = _g128["*"]
  local search = _g128.search
  local map = _g128.map
  local drop = _g128.drop
  local none63 = _g128["none?"]
  local nil63 = _g128["nil?"]
  local today = _g128.today
  local sort = _g128.sort
  local list63 = _g128["list?"]
  local string63 = _g128["string?"]
  local _g131 = nexus["lumen/lib"]
  local stash42 = _g131["stash*"]
  local reserved63 = _g131["reserved?"]
  local bound63 = _g131["bound?"]
  local macro_function = _g131["macro-function"]
  local imported = _g131.imported
  local bind = _g131.bind
  local valid_id63 = _g131["valid-id?"]
  local variable63 = _g131["variable?"]
  local symbol_expansion = _g131["symbol-expansion"]
  local mapo = _g131.mapo
  local getenv = _g131.getenv
  local statement63 = _g131["statement?"]
  local indentation = _g131.indentation
  local quasiexpand = _g131.quasiexpand
  local symbol63 = _g131["symbol?"]
  local id = _g131.id
  local bind42 = _g131["bind*"]
  local key = _g131.key
  local macroexpand = _g131.macroexpand
  local special63 = _g131["special?"]
  local quote_environment = _g131["quote-environment"]
  local quote_modules = _g131["quote-modules"]
  local link = _g131.link
  local initial_environment = _g131["initial-environment"]
  local special_form63 = _g131["special-form?"]
  local quoted = _g131.quoted
  local macro63 = _g131["macro?"]
  local _g132 = nexus["lumen/reader"]
  local make_stream = _g132["make-stream"]
  local read_all = _g132["read-all"]
  local read_table = _g132["read-table"]
  local read = _g132.read
  local read_from_string = _g132["read-from-string"]
  local _g136 = {}
  _g136.lua = "not "
  _g136.js = "!"
  local _g134 = {}
  local _g137 = {}
  _g137.lua = "not "
  _g137.js = "!"
  _g134["not"] = _g137
  local _g139 = {}
  _g139["*"] = true
  _g139["/"] = true
  _g139["%"] = true
  local _g141 = {}
  _g141["-"] = true
  _g141["+"] = true
  local _g145 = {}
  _g145.lua = ".."
  _g145.js = "+"
  local _g143 = {}
  local _g146 = {}
  _g146.lua = ".."
  _g146.js = "+"
  _g143.cat = _g146
  local _g148 = {}
  _g148["<="] = true
  _g148["<"] = true
  _g148[">="] = true
  _g148[">"] = true
  local _g152 = {}
  _g152.lua = "~="
  _g152.js = "!="
  local _g154 = {}
  _g154.lua = "=="
  _g154.js = "==="
  local _g150 = {}
  local _g155 = {}
  _g155.lua = "~="
  _g155.js = "!="
  _g150["~="] = _g155
  local _g156 = {}
  _g156.lua = "=="
  _g156.js = "==="
  _g150["="] = _g156
  local _g160 = {}
  _g160.lua = "and"
  _g160.js = "&&"
  local _g158 = {}
  local _g161 = {}
  _g161.lua = "and"
  _g161.js = "&&"
  _g158["and"] = _g161
  local _g165 = {}
  _g165.lua = "or"
  _g165.js = "||"
  local _g163 = {}
  local _g166 = {}
  _g166.lua = "or"
  _g166.js = "||"
  _g163["or"] = _g166
  local infix = {_g134, _g139, _g141, _g143, _g148, _g150, _g158, _g163}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g167 = infix
      local i = 0
      while i < length(_g167) do
        local level = _g167[i + 1]
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
    local _g168 = args
    local i = 0
    while i < length(_g168) do
      local arg = _g168[i + 1]
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
    local _g169 = getenv(x)
    local stmt = _g169.stmt
    local self_tr63 = _g169.tr
    local special = _g169.special
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
    local _g170 = unstash({...})
    local right = _g170.right
    local _g199
    if right then
      _g199 = _6261
    else
      _g199 = _62
    end
    if _g199(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g171 = sub(form, 1)
    local a = _g171[1]
    local b = _g171[2]
    local _g172 = op_delims(form, a)
    local ao = _g172[1]
    local ac = _g172[2]
    local _g173 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g173[1]
    local bc = _g173[2]
    local _g174 = compile(a)
    local _g175 = compile(b)
    local _g176 = getop(op)
    if unary63(form) then
      return(_g176 .. ao .. _g174 .. ac)
    else
      return(ao .. _g174 .. ac .. " " .. _g176 .. " " .. bo .. _g175 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g177 = unstash({...})
    local prefix = _g177.prefix
    local name = _g177.name
    local _g200
    if name then
      _g200 = compile(name)
    else
      _g200 = ""
    end
    local id = _g200
    local _g178 = prefix or ""
    local _g179 = compile_args(args)
    indent_level = indent_level + 1
    local _g181 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g180 = _g181
    local ind = indentation()
    local _g201
    if target == "js" then
      _g201 = ""
    else
      _g201 = "end"
    end
    local tr = _g201
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g179 .. " {\n" .. _g180 .. ind .. "}" .. tr)
    else
      return(_g178 .. "function " .. id .. _g179 .. "\n" .. _g180 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g182 = unstash({...})
    local stmt = _g182.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g202
        if stmt then
          _g202 = indentation()
        else
          _g202 = ""
        end
        local ind = _g202
        local _g203
        if atom63(form) then
          _g203 = compile_atom(form)
        else
          local _g204
          if infix63(hd(form)) then
            _g204 = compile_infix(form)
          else
            _g204 = compile_call(form)
          end
          _g203 = _g204
        end
        local _g183 = _g203
        return(ind .. _g183 .. tr)
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
    local _g184 = sub(args, 0, length(args) - 1)
    local _g185 = 0
    while _g185 < length(_g184) do
      local x = _g184[_g185 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g185 = _g185 + 1
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
    local _g186 = args[2]
    local _g187 = args[3]
    if stmt63 or tail63 then
      local _g206
      if _g187 then
        _g206 = {lower_body({_g187}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g186}, tail63)}, _g206)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g205
      if _g187 then
        _g205 = {lower({"set", e, _g187})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g186})}, _g205))
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
      local _g207
      if x == "and" then
        _g207 = {"%if", id, b, id}
      else
        _g207 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g207}, hoist))
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
    local _g188 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g188, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g189 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g189) then
      return(_g189)
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
    local _g190 = unstash({...})
    local _g191 = _g190.all
    local m = module(spec)
    local frame = last(environment)
    local _g192 = m.export
    local k = nil
    for k in next, _g192 do
      if not number63(k) then
        local v = _g192[k]
        if v.export or _g191 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g193 = unstash({...})
    local _g194 = _g193.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g194}))
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
    local _g195 = specs or {}
    local _g196 = 0
    while _g196 < length(_g195) do
      local spec = _g195[_g196 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g197 = import_modules(m.alias)
        local aliased = _g197[1]
        local bs = _g197[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g198 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g198)
      end
      _g196 = _g196 + 1
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
  local _g208 = nexus["lumen/runtime"]
  local empty63 = _g208["empty?"]
  local number = _g208.number
  local _ = _g208["-"]
  local some63 = _g208["some?"]
  local _47 = _g208["/"]
  local module_key = _g208["module-key"]
  local _37 = _g208["%"]
  local apply = _g208.apply
  local atom63 = _g208["atom?"]
  local stash = _g208.stash
  local split = _g208.split
  local length = _g208.length
  local pair = _g208.pair
  local exit = _g208.exit
  local id_literal63 = _g208["id-literal?"]
  local reduce = _g208.reduce
  local reverse = _g208.reverse
  local write = _g208.write
  local _6061 = _g208["<="]
  local is63 = _g208["is?"]
  local _6261 = _g208[">="]
  local keys63 = _g208["keys?"]
  local number63 = _g208["number?"]
  local boolean63 = _g208["boolean?"]
  local string_literal63 = _g208["string-literal?"]
  local in63 = _g208["in?"]
  local write_file = _g208["write-file"]
  local sub = _g208.sub
  local read_file = _g208["read-file"]
  local replicate = _g208.replicate
  local series = _g208.series
  local table63 = _g208["table?"]
  local make_id = _g208["make-id"]
  local space = _g208.space
  local add = _g208.add
  local substring = _g208.substring
  local setenv = _g208.setenv
  local module = _g208.module
  local toplevel63 = _g208["toplevel?"]
  local _37message_handler = _g208["%message-handler"]
  local last = _g208.last
  local _43 = _g208["+"]
  local unstash = _g208.unstash
  local join = _g208.join
  local code = _g208.code
  local char = _g208.char
  local string = _g208.string
  local iterate = _g208.iterate
  local cat = _g208.cat
  local now = _g208.now
  local hd = _g208.hd
  local inner = _g208.inner
  local tl = _g208.tl
  local find = _g208.find
  local _61 = _g208["="]
  local _60 = _g208["<"]
  local function63 = _g208["function?"]
  local composite63 = _g208["composite?"]
  local keep = _g208.keep
  local _62 = _g208[">"]
  local one63 = _g208["one?"]
  local _42 = _g208["*"]
  local search = _g208.search
  local map = _g208.map
  local drop = _g208.drop
  local none63 = _g208["none?"]
  local nil63 = _g208["nil?"]
  local today = _g208.today
  local sort = _g208.sort
  local list63 = _g208["list?"]
  local string63 = _g208["string?"]
  local _g211 = nexus["lumen/lib"]
  local stash42 = _g211["stash*"]
  local reserved63 = _g211["reserved?"]
  local bound63 = _g211["bound?"]
  local macro_function = _g211["macro-function"]
  local imported = _g211.imported
  local bind = _g211.bind
  local valid_id63 = _g211["valid-id?"]
  local variable63 = _g211["variable?"]
  local symbol_expansion = _g211["symbol-expansion"]
  local mapo = _g211.mapo
  local getenv = _g211.getenv
  local statement63 = _g211["statement?"]
  local indentation = _g211.indentation
  local quasiexpand = _g211.quasiexpand
  local symbol63 = _g211["symbol?"]
  local id = _g211.id
  local bind42 = _g211["bind*"]
  local key = _g211.key
  local macroexpand = _g211.macroexpand
  local special63 = _g211["special?"]
  local quote_environment = _g211["quote-environment"]
  local quote_modules = _g211["quote-modules"]
  local link = _g211.link
  local initial_environment = _g211["initial-environment"]
  local special_form63 = _g211["special-form?"]
  local quoted = _g211.quoted
  local macro63 = _g211["macro?"]
  local _g212 = nexus["lumen/compiler"]
  local load_module = _g212["load-module"]
  local compile = _g212.compile
  local eval = _g212.eval
  local in_module = _g212["in-module"]
  local compile_module = _g212["compile-module"]
  local declare = _g212.declare
  local compile_function = _g212["compile-function"]
  local open_module = _g212["open-module"]
  local import_modules = _g212["import-modules"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g386 = nexus["lumen/runtime"]
  local empty63 = _g386["empty?"]
  local number = _g386.number
  local _ = _g386["-"]
  local some63 = _g386["some?"]
  local _47 = _g386["/"]
  local module_key = _g386["module-key"]
  local _37 = _g386["%"]
  local apply = _g386.apply
  local atom63 = _g386["atom?"]
  local stash = _g386.stash
  local split = _g386.split
  local length = _g386.length
  local pair = _g386.pair
  local exit = _g386.exit
  local id_literal63 = _g386["id-literal?"]
  local reduce = _g386.reduce
  local reverse = _g386.reverse
  local write = _g386.write
  local _6061 = _g386["<="]
  local is63 = _g386["is?"]
  local _6261 = _g386[">="]
  local keys63 = _g386["keys?"]
  local number63 = _g386["number?"]
  local boolean63 = _g386["boolean?"]
  local string_literal63 = _g386["string-literal?"]
  local in63 = _g386["in?"]
  local write_file = _g386["write-file"]
  local sub = _g386.sub
  local read_file = _g386["read-file"]
  local replicate = _g386.replicate
  local series = _g386.series
  local table63 = _g386["table?"]
  local make_id = _g386["make-id"]
  local space = _g386.space
  local add = _g386.add
  local substring = _g386.substring
  local setenv = _g386.setenv
  local module = _g386.module
  local toplevel63 = _g386["toplevel?"]
  local _37message_handler = _g386["%message-handler"]
  local last = _g386.last
  local _43 = _g386["+"]
  local unstash = _g386.unstash
  local join = _g386.join
  local code = _g386.code
  local char = _g386.char
  local string = _g386.string
  local iterate = _g386.iterate
  local cat = _g386.cat
  local now = _g386.now
  local hd = _g386.hd
  local inner = _g386.inner
  local tl = _g386.tl
  local find = _g386.find
  local _61 = _g386["="]
  local _60 = _g386["<"]
  local function63 = _g386["function?"]
  local composite63 = _g386["composite?"]
  local keep = _g386.keep
  local _62 = _g386[">"]
  local one63 = _g386["one?"]
  local _42 = _g386["*"]
  local search = _g386.search
  local map = _g386.map
  local drop = _g386.drop
  local none63 = _g386["none?"]
  local nil63 = _g386["nil?"]
  local today = _g386.today
  local sort = _g386.sort
  local list63 = _g386["list?"]
  local string63 = _g386["string?"]
  local _g389 = nexus["lumen/lib"]
  local stash42 = _g389["stash*"]
  local reserved63 = _g389["reserved?"]
  local bound63 = _g389["bound?"]
  local macro_function = _g389["macro-function"]
  local imported = _g389.imported
  local bind = _g389.bind
  local valid_id63 = _g389["valid-id?"]
  local variable63 = _g389["variable?"]
  local symbol_expansion = _g389["symbol-expansion"]
  local mapo = _g389.mapo
  local getenv = _g389.getenv
  local statement63 = _g389["statement?"]
  local indentation = _g389.indentation
  local quasiexpand = _g389.quasiexpand
  local symbol63 = _g389["symbol?"]
  local id = _g389.id
  local bind42 = _g389["bind*"]
  local key = _g389.key
  local macroexpand = _g389.macroexpand
  local special63 = _g389["special?"]
  local quote_environment = _g389["quote-environment"]
  local quote_modules = _g389["quote-modules"]
  local link = _g389.link
  local initial_environment = _g389["initial-environment"]
  local special_form63 = _g389["special-form?"]
  local quoted = _g389.quoted
  local macro63 = _g389["macro?"]
  local _g390 = nexus["lumen/compiler"]
  local load_module = _g390["load-module"]
  local compile = _g390.compile
  local eval = _g390.eval
  local in_module = _g390["in-module"]
  local compile_module = _g390["compile-module"]
  local declare = _g390.declare
  local compile_function = _g390["compile-function"]
  local open_module = _g390["open-module"]
  local import_modules = _g390["import-modules"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g699 = nexus["lumen/runtime"]
  local empty63 = _g699["empty?"]
  local number = _g699.number
  local _ = _g699["-"]
  local some63 = _g699["some?"]
  local _47 = _g699["/"]
  local module_key = _g699["module-key"]
  local _37 = _g699["%"]
  local apply = _g699.apply
  local atom63 = _g699["atom?"]
  local stash = _g699.stash
  local split = _g699.split
  local length = _g699.length
  local pair = _g699.pair
  local exit = _g699.exit
  local id_literal63 = _g699["id-literal?"]
  local reduce = _g699.reduce
  local reverse = _g699.reverse
  local write = _g699.write
  local _6061 = _g699["<="]
  local is63 = _g699["is?"]
  local _6261 = _g699[">="]
  local keys63 = _g699["keys?"]
  local number63 = _g699["number?"]
  local boolean63 = _g699["boolean?"]
  local string_literal63 = _g699["string-literal?"]
  local in63 = _g699["in?"]
  local write_file = _g699["write-file"]
  local sub = _g699.sub
  local read_file = _g699["read-file"]
  local replicate = _g699.replicate
  local series = _g699.series
  local table63 = _g699["table?"]
  local make_id = _g699["make-id"]
  local space = _g699.space
  local add = _g699.add
  local substring = _g699.substring
  local setenv = _g699.setenv
  local module = _g699.module
  local toplevel63 = _g699["toplevel?"]
  local _37message_handler = _g699["%message-handler"]
  local last = _g699.last
  local _43 = _g699["+"]
  local unstash = _g699.unstash
  local join = _g699.join
  local code = _g699.code
  local char = _g699.char
  local string = _g699.string
  local iterate = _g699.iterate
  local cat = _g699.cat
  local now = _g699.now
  local hd = _g699.hd
  local inner = _g699.inner
  local tl = _g699.tl
  local find = _g699.find
  local _61 = _g699["="]
  local _60 = _g699["<"]
  local function63 = _g699["function?"]
  local composite63 = _g699["composite?"]
  local keep = _g699.keep
  local _62 = _g699[">"]
  local one63 = _g699["one?"]
  local _42 = _g699["*"]
  local search = _g699.search
  local map = _g699.map
  local drop = _g699.drop
  local none63 = _g699["none?"]
  local nil63 = _g699["nil?"]
  local today = _g699.today
  local sort = _g699.sort
  local list63 = _g699["list?"]
  local string63 = _g699["string?"]
  local _g702 = nexus["lumen/lib"]
  local stash42 = _g702["stash*"]
  local reserved63 = _g702["reserved?"]
  local bound63 = _g702["bound?"]
  local macro_function = _g702["macro-function"]
  local imported = _g702.imported
  local bind = _g702.bind
  local valid_id63 = _g702["valid-id?"]
  local variable63 = _g702["variable?"]
  local symbol_expansion = _g702["symbol-expansion"]
  local mapo = _g702.mapo
  local getenv = _g702.getenv
  local statement63 = _g702["statement?"]
  local indentation = _g702.indentation
  local quasiexpand = _g702.quasiexpand
  local symbol63 = _g702["symbol?"]
  local id = _g702.id
  local bind42 = _g702["bind*"]
  local key = _g702.key
  local macroexpand = _g702.macroexpand
  local special63 = _g702["special?"]
  local quote_environment = _g702["quote-environment"]
  local quote_modules = _g702["quote-modules"]
  local link = _g702.link
  local initial_environment = _g702["initial-environment"]
  local special_form63 = _g702["special-form?"]
  local quoted = _g702.quoted
  local macro63 = _g702["macro?"]
  local _g703 = nexus["lumen/compiler"]
  local load_module = _g703["load-module"]
  local compile = _g703.compile
  local eval = _g703.eval
  local in_module = _g703["in-module"]
  local compile_module = _g703["compile-module"]
  local declare = _g703.declare
  local compile_function = _g703["compile-function"]
  local open_module = _g703["open-module"]
  local import_modules = _g703["import-modules"]
  modules = {["lumen/lib"] = {export = {["stash*"] = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, imported = {variable = true, export = true}, escape = {variable = true}, bind = {variable = true, export = true}, exclude = {variable = true}, ["quoting?"] = {variable = true}, ["global?"] = {variable = true}, ["valid-id?"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, mapo = {variable = true, export = true}, reserved = {variable = true}, getenv = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, indentation = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, literal = {variable = true}, ["quote-module"] = {variable = true}, quasiexpand = {variable = true, export = true}, ["symbol?"] = {variable = true, export = true}, id = {variable = true, export = true}, ["quote-frame"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["bind*"] = {variable = true, export = true}, key = {variable = true, export = true}, macroexpand = {variable = true, export = true}, extend = {variable = true}, ["special?"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["quote-environment"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, ["indent-level"] = {export = true, global = true}, ["quasiquote-list"] = {variable = true}, ["valid-code?"] = {variable = true}, ["quote-modules"] = {variable = true, export = true}, link = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["special-form?"] = {variable = true, export = true}, quoted = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {set = {foo = true, stmt = true, export = true, special = function (lh, rh)
    local _g716 = compile(lh)
    local _g787
    if nil63(rh) then
      _g787 = "nil"
    else
      _g787 = rh
    end
    local _g717 = compile(_g787)
    return(indentation() .. _g716 .. " = " .. _g717)
  end}, ["%try"] = {tr = true, export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g718 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g718
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g719 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g719
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, foo = true}, ["return"] = {foo = true, stmt = true, export = true, special = function (x)
    local _g788
    if nil63(x) then
      _g788 = "return"
    else
      _g788 = "return(" .. compile(x) .. ")"
    end
    local _g720 = _g788
    return(indentation() .. _g720)
  end}, ["%if"] = {tr = true, export = true, special = function (cond, cons, alt)
    local _g721 = compile(cond)
    indent_level = indent_level + 1
    local _g723 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g722 = _g723
    local _g789
    if alt then
      indent_level = indent_level + 1
      local _g725 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g789 = _g725
    end
    local _g724 = _g789
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g721 .. ") {\n" .. _g722 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g721 .. " then\n" .. _g722
    end
    if _g724 and target == "js" then
      str = str .. " else {\n" .. _g724 .. ind .. "}"
    else
      if _g724 then
        str = str .. ind .. "else\n" .. _g724
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, foo = true}, ["%for"] = {tr = true, export = true, special = function (t, k, form)
    local _g726 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g727 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g727
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g726 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g726 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, foo = true}, error = {foo = true, stmt = true, export = true, special = function (x)
    local _g790
    if target == "js" then
      _g790 = "throw new " .. compile({"Error", x})
    else
      _g790 = "error(" .. compile(x) .. ")"
    end
    local e = _g790
    return(indentation() .. e)
  end}, ["break"] = {foo = true, stmt = true, export = true, special = function ()
    return(indentation() .. "break")
  end}, ["%local-function"] = {tr = true, export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, stmt = true, foo = true}, get = {foo = true, export = true, special = function (t, k)
    local _g728 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g728, 0) == "{" then
      _g728 = "(" .. _g728 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g728 .. "." .. inner(k))
    else
      return(_g728 .. "[" .. k1 .. "]")
    end
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g791
    if target == "lua" then
      _g791 = " = "
    else
      _g791 = ": "
    end
    local sep = _g791
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g729 = pairs
    local i = 0
    while i < length(_g729) do
      local _g730 = _g729[i + 1]
      local k = _g730[1]
      local v = _g730[2]
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
  end}, ["%global-function"] = {tr = true, export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, foo = true}, ["%local"] = {foo = true, stmt = true, export = true, special = function (name, value)
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
  end}, ["do"] = {tr = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g731 = forms
    local _g732 = 0
    while _g732 < length(_g731) do
      local x = _g731[_g732 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g732 = _g732 + 1
    end
    return(str)
  end, stmt = true, foo = true}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["not"] = {}, ["while"] = {tr = true, export = true, special = function (cond, form)
    local _g733 = compile(cond)
    indent_level = indent_level + 1
    local _g734 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g734
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g733 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g733 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, foo = true}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _g794
    if target == "lua" then
      _g794 = "{"
    else
      _g794 = "["
    end
    local open = _g794
    local _g795
    if target == "lua" then
      _g795 = "}"
    else
      _g795 = "]"
    end
    local close = _g795
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
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/core"] = {export = {dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g736 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g736) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g736)}))
    else
      if some63(_g736) then
        local _g737 = bind42(x, _g736)
        local args = _g737[1]
        local _g738 = _g737[2]
        return(link(name, join({"%local-function", name, args}, _g738)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g739 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g739)})
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g740 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g741 = join({"do"}, macroexpand(_g740))
    drop(environment)
    return(_g741)
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g742 = sub(body, 0)
    local form = join({"fn", args}, _g742)
    local keys = sub(_g742, length(_g742))
    local _g743 = {"setenv", {"quote", name}}
    _g743.special = form
    _g743.form = {"quote", form}
    eval(join(_g743, keys))
    return(nil)
  end, export = true}, all = {macro = function (_g744, t, ...)
    local k = _g744[1]
    local v = _g744[2]
    local body = unstash({...})
    local _g745 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g796
    if target == "lua" then
      _g796 = _g745
    else
      _g796 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g745)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g796)}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g746 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g746) then
      local _g747 = bind42(x, _g746)
      local args = _g747[1]
      local _g748 = _g747[2]
      return(join({"%global-function", name, args}, _g748))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
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
      local _g749 = body
      local k = nil
      for k in next, _g749 do
        if not number63(k) then
          local v = _g749[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g750 = sub(body, 0)
    local form = join({"fn", args}, _g750)
    local _g751 = {"setenv", {"quote", name}}
    _g751.macro = form
    _g751.form = {"quote", form}
    eval(_g751)
    return(nil)
  end, export = true}, ["with-bindings"] = {macro = function (_g752, ...)
    local names = _g752[1]
    local body = unstash({...})
    local _g753 = sub(body, 0)
    local x = make_id()
    local _g755 = {"setenv", x}
    _g755.variable = true
    local _g754 = {"with-frame", {"each", {x}, names, _g755}}
    _g754.scope = true
    return(join(_g754, _g753))
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g756 = sub(body, 0)
    return({"if", cond, join({"do"}, _g756)})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g757)
      local a = _g757[1]
      local b = _g757[2]
      local c = sub(_g757, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g758 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g759 = {"table"}
    _g759._scope = scope
    return({"do", {"add", "environment", _g759}, {"let", {x, join({"do"}, _g758)}, {"drop", "environment"}, x}})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g760 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g760)})
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g761 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g761))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g762 = bind(lh, rh)
      local _g763 = 0
      while _g763 < length(_g762) do
        local _g764 = _g762[_g763 + 1]
        local id = _g764[1]
        local val = _g764[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g763 = _g763 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g761)}})))
    end
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g765 = sub(body, 0)
    add(environment, {})
    map(function (_g767)
      local name = _g767[1]
      local exp = _g767[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g766 = join({"do"}, macroexpand(_g765))
    drop(environment)
    return(_g766)
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g768 = sub(body, 0)
    local _g769 = bind42(args, _g768)
    local _g770 = _g769[1]
    local _g771 = _g769[2]
    return(join({"%function", _g770}, _g771))
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g772 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g797
    if nil63(v) then
      local _g798
      if b.i then
        _g798 = "i"
      else
        _g798 = make_id()
      end
      local i = _g798
      _g797 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g772), {"inc", i}}}
    else
      local _g773 = {"target"}
      _g773.lua = {"not", {"number?", k}}
      _g773.js = {"isNaN", {"parseInt", k}}
      _g797 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g773, join({"let", {v, {"get", t1, k}}}, _g772)}}}
    end
    return({"let", {t1, t}, _g797})
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g774 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g774)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g775 = sub(body, 0)
    local alias = _g775.alias
    local exp = _g775.export
    local imp = _g775.import
    local _g776 = import_modules(imp)
    local imports = _g776[1]
    local bindings = _g776[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g777 = exp or {}
    local _g778 = 0
    while _g778 < length(_g777) do
      local x = _g777[_g778 + 1]
      setenv(x, {_stash = true, export = true})
      _g778 = _g778 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
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
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}, import = {{"lumen", "special"}}}, ["lumen/compiler"] = {export = {["compile-special"] = {variable = true}, ["lower-short"] = {variable = true}, ["load-module"] = {variable = true, export = true}, ["lower-do"] = {variable = true}, process = {variable = true}, compile = {variable = true, export = true}, precedence = {variable = true}, ["module-path"] = {variable = true}, ["infix?"] = {variable = true}, ["lower-call"] = {variable = true}, eval = {variable = true, export = true}, ["%result"] = {export = true, global = true}, reimported = {variable = true}, ["unary?"] = {variable = true}, ["in-module"] = {variable = true, export = true}, getop = {variable = true}, run = {variable = true}, conclude = {variable = true}, infix = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-body"] = {variable = true}, ["compiling?"] = {variable = true}, ["%compile-module"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-special"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["parenthesize-call?"] = {variable = true}, ["lower-function"] = {variable = true}, declare = {variable = true, export = true}, ["lower-infix?"] = {variable = true}, ["current-module"] = {export = true, global = true}, lower = {variable = true}, ["lower-while"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["lower-try"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["compile-args"] = {variable = true}, ["compile-infix"] = {variable = true}, ["lower-definition"] = {variable = true}, terminator = {variable = true}, ["lower-infix"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, ["can-return?"] = {variable = true}, encapsulate = {variable = true}, ["compile-atom"] = {variable = true}, ["lower-for"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/reader"] = {export = {eof = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["key?"] = {variable = true}, whitespace = {variable = true}, ["flag?"] = {variable = true}, ["read-table"] = {variable = true, export = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, read = {variable = true, export = true}, ["define-reader"] = {macro = function (_g781, ...)
    local char = _g781[1]
    local stream = _g781[2]
    local body = unstash({...})
    local _g782 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g782)})
  end, export = true}, delimiters = {variable = true}, ["read-from-string"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["empty?"] = {variable = true, export = true}, number = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["%"] = {variable = true, export = true}, apply = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, stash = {variable = true, export = true}, split = {variable = true, export = true}, length = {variable = true, export = true}, pair = {variable = true, export = true}, exit = {variable = true, export = true}, shift = {variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {variable = true, export = true}, reduce = {variable = true, export = true}, reverse = {variable = true, export = true}, write = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, sub = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, replicate = {variable = true, export = true}, series = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, space = {variable = true, export = true}, add = {variable = true, export = true}, substring = {variable = true, export = true}, setenv = {variable = true, export = true}, module = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, last = {variable = true, export = true}, ["+"] = {variable = true, export = true}, unstash = {variable = true, export = true}, join = {variable = true, export = true}, code = {variable = true, export = true}, char = {variable = true, export = true}, string = {variable = true, export = true}, iterate = {variable = true, export = true}, cat = {variable = true, export = true}, now = {variable = true, export = true}, hd = {variable = true, export = true}, inner = {variable = true, export = true}, tl = {variable = true, export = true}, find = {variable = true, export = true}, ["="] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, keep = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, search = {variable = true, export = true}, map = {variable = true, export = true}, drop = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, today = {variable = true, export = true}, sort = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/boot"] = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {export = true, global = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g783 = sub(body, 0)
    local alias = _g783.alias
    local exp = _g783.export
    local imp = _g783.import
    local _g784 = import_modules(imp)
    local imports = _g784[1]
    local bindings = _g784[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g785 = exp or {}
    local _g786 = 0
    while _g786 < length(_g785) do
      local x = _g785[_g786 + 1]
      setenv(x, {_stash = true, export = true})
      _g786 = _g786 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g799 = nexus["lumen/runtime"]
  local empty63 = _g799["empty?"]
  local number = _g799.number
  local _ = _g799["-"]
  local some63 = _g799["some?"]
  local _47 = _g799["/"]
  local module_key = _g799["module-key"]
  local _37 = _g799["%"]
  local apply = _g799.apply
  local atom63 = _g799["atom?"]
  local stash = _g799.stash
  local split = _g799.split
  local length = _g799.length
  local pair = _g799.pair
  local exit = _g799.exit
  local id_literal63 = _g799["id-literal?"]
  local reduce = _g799.reduce
  local reverse = _g799.reverse
  local write = _g799.write
  local _6061 = _g799["<="]
  local is63 = _g799["is?"]
  local _6261 = _g799[">="]
  local keys63 = _g799["keys?"]
  local number63 = _g799["number?"]
  local boolean63 = _g799["boolean?"]
  local string_literal63 = _g799["string-literal?"]
  local in63 = _g799["in?"]
  local write_file = _g799["write-file"]
  local sub = _g799.sub
  local read_file = _g799["read-file"]
  local replicate = _g799.replicate
  local series = _g799.series
  local table63 = _g799["table?"]
  local make_id = _g799["make-id"]
  local space = _g799.space
  local add = _g799.add
  local substring = _g799.substring
  local setenv = _g799.setenv
  local module = _g799.module
  local toplevel63 = _g799["toplevel?"]
  local _37message_handler = _g799["%message-handler"]
  local last = _g799.last
  local _43 = _g799["+"]
  local unstash = _g799.unstash
  local join = _g799.join
  local code = _g799.code
  local char = _g799.char
  local string = _g799.string
  local iterate = _g799.iterate
  local cat = _g799.cat
  local now = _g799.now
  local hd = _g799.hd
  local inner = _g799.inner
  local tl = _g799.tl
  local find = _g799.find
  local _61 = _g799["="]
  local _60 = _g799["<"]
  local function63 = _g799["function?"]
  local composite63 = _g799["composite?"]
  local keep = _g799.keep
  local _62 = _g799[">"]
  local one63 = _g799["one?"]
  local _42 = _g799["*"]
  local search = _g799.search
  local map = _g799.map
  local drop = _g799.drop
  local none63 = _g799["none?"]
  local nil63 = _g799["nil?"]
  local today = _g799.today
  local sort = _g799.sort
  local list63 = _g799["list?"]
  local string63 = _g799["string?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local empty63 = _g2["empty?"]
  local number = _g2.number
  local _ = _g2["-"]
  local some63 = _g2["some?"]
  local _47 = _g2["/"]
  local module_key = _g2["module-key"]
  local _37 = _g2["%"]
  local apply = _g2.apply
  local find = _g2.find
  local stash = _g2.stash
  local split = _g2.split
  local length = _g2.length
  local pair = _g2.pair
  local exit = _g2.exit
  local id_literal63 = _g2["id-literal?"]
  local reduce = _g2.reduce
  local reverse = _g2.reverse
  local write = _g2.write
  local _6061 = _g2["<="]
  local is63 = _g2["is?"]
  local _6261 = _g2[">="]
  local keys63 = _g2["keys?"]
  local number63 = _g2["number?"]
  local boolean63 = _g2["boolean?"]
  local string_literal63 = _g2["string-literal?"]
  local in63 = _g2["in?"]
  local write_file = _g2["write-file"]
  local sub = _g2.sub
  local setenv = _g2.setenv
  local replicate = _g2.replicate
  local series = _g2.series
  local table63 = _g2["table?"]
  local make_id = _g2["make-id"]
  local space = _g2.space
  local add = _g2.add
  local substring = _g2.substring
  local toplevel63 = _g2["toplevel?"]
  local atom63 = _g2["atom?"]
  local cat = _g2.cat
  local _42 = _g2["*"]
  local last = _g2.last
  local unstash = _g2.unstash
  local string63 = _g2["string?"]
  local join = _g2.join
  local _43 = _g2["+"]
  local char = _g2.char
  local code = _g2.code
  local iterate = _g2.iterate
  local read_file = _g2["read-file"]
  local now = _g2.now
  local hd = _g2.hd
  local inner = _g2.inner
  local tl = _g2.tl
  local string = _g2.string
  local list63 = _g2["list?"]
  local _37message_handler = _g2["%message-handler"]
  local function63 = _g2["function?"]
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local one63 = _g2["one?"]
  local search = _g2.search
  local keep = _g2.keep
  local map = _g2.map
  local module = _g2.module
  local none63 = _g2["none?"]
  local nil63 = _g2["nil?"]
  local today = _g2.today
  local sort = _g2.sort
  local drop = _g2.drop
  local composite63 = _g2["composite?"]
  local _g5 = nexus["lumen/reader"]
  local read_all = _g5["read-all"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus["lumen/compiler"]
  local compile_function = _g6["compile-function"]
  local eval = _g6.eval
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local compile = _g6.compile
  local compile_module = _g6["compile-module"]
  local declare = _g6.declare
  local open_module = _g6["open-module"]
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g803,_g804 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g802 = {_g803, _g804}
    local _g1 = _g802[1]
    local x = _g802[2]
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
    local _g805 = args
    local i = 0
    while i < length(_g805) do
      local arg = _g805[i + 1]
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
