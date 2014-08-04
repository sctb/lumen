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
  local read_file = _g74["read-file"]
  local in63 = _g74["in?"]
  local join = _g74.join
  local _37 = _g74["%"]
  local today = _g74.today
  local drop = _g74.drop
  local stash = _g74.stash
  local _ = _g74["-"]
  local _42 = _g74["*"]
  local keys63 = _g74["keys?"]
  local _47 = _g74["/"]
  local _60 = _g74["<"]
  local _62 = _g74[">"]
  local string_literal63 = _g74["string-literal?"]
  local composite63 = _g74["composite?"]
  local code = _g74.code
  local last = _g74.last
  local write = _g74.write
  local series = _g74.series
  local pair = _g74.pair
  local iterate = _g74.iterate
  local is63 = _g74["is?"]
  local keep = _g74.keep
  local write_file = _g74["write-file"]
  local empty63 = _g74["empty?"]
  local list63 = _g74["list?"]
  local sort = _g74.sort
  local string63 = _g74["string?"]
  local map = _g74.map
  local add = _g74.add
  local atom63 = _g74["atom?"]
  local some63 = _g74["some?"]
  local unstash = _g74.unstash
  local boolean63 = _g74["boolean?"]
  local _6061 = _g74["<="]
  local _6261 = _g74[">="]
  local split = _g74.split
  local substring = _g74.substring
  local reverse = _g74.reverse
  local setenv = _g74.setenv
  local module = _g74.module
  local module_key = _g74["module-key"]
  local hd = _g74.hd
  local nil63 = _g74["nil?"]
  local tl = _g74.tl
  local toplevel63 = _g74["toplevel?"]
  local find = _g74.find
  local _37message_handler = _g74["%message-handler"]
  local make_id = _g74["make-id"]
  local apply = _g74.apply
  local function63 = _g74["function?"]
  local reduce = _g74.reduce
  local space = _g74.space
  local string = _g74.string
  local table63 = _g74["table?"]
  local number = _g74.number
  local now = _g74.now
  local sub = _g74.sub
  local exit = _g74.exit
  local replicate = _g74.replicate
  local search = _g74.search
  local length = _g74.length
  local cat = _g74.cat
  local one63 = _g74["one?"]
  local _61 = _g74["="]
  local none63 = _g74["none?"]
  local id_literal63 = _g74["id-literal?"]
  local inner = _g74.inner
  local _43 = _g74["+"]
  local char = _g74.char
  local number63 = _g74["number?"]
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
      local _g114
      if c == "\n" then
        _g114 = "\\n"
      else
        local _g115
        if c == "\"" then
          _g115 = "\\\""
        else
          local _g116
          if c == "\\" then
            _g116 = "\\\\"
          else
            _g116 = c
          end
          _g115 = _g116
        end
        _g114 = _g115
      end
      local c1 = _g114
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
        local v = _g77[k]
        if not number63(k) then
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
        local i = 0
        local _g79 = lh
        local _g80 = 0
        while _g80 < length(_g79) do
          local x = _g79[_g80 + 1]
          bs = join(bs, bind(x, {"at", rh, _g80}))
          _g80 = _g80 + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g81 = lh
        local k = nil
        for k in next, _g81 do
          if not number63(k) then
            local v = _g81[k]
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
      local _g82 = args
      local _g83 = 0
      while _g83 < length(_g82) do
        local arg = _g82[_g83 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g83 = _g83 + 1
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
            local _g86 = args
            local _g87 = 0
            while _g87 < length(_g86) do
              local _g84 = _g86[_g87 + 1]
              setenv(_g84, {_stash = true, variable = true})
              _g87 = _g87 + 1
            end
            local _g85 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g85)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g73 = form[1]
              local _g88 = form[2]
              local _g89 = form[3]
              local _g90 = sub(form, 3)
              add(environment, {_scope = true})
              local _g93 = _g89
              local _g94 = 0
              while _g94 < length(_g93) do
                local _g91 = _g93[_g94 + 1]
                setenv(_g91, {_stash = true, variable = true})
                _g94 = _g94 + 1
              end
              local _g92 = join({x, _g88, _g89}, macroexpand(_g90))
              drop(environment)
              return(_g92)
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
    local _g95 = form
    local k = nil
    for k in next, _g95 do
      if not number63(k) then
        local v = _g95[k]
        local _g117
        if quasisplice63(v, depth) then
          _g117 = quasiexpand(v[2])
        else
          _g117 = quasiexpand(v, depth)
        end
        local _g96 = _g117
        last(xs)[k] = _g96
      end
    end
    local _g97 = form
    local _g98 = 0
    while _g98 < length(_g97) do
      local x = _g97[_g98 + 1]
      if quasisplice63(x, depth) then
        local _g99 = quasiexpand(x[2])
        add(xs, _g99)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g98 = _g98 + 1
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
  local reserved = {["until"] = true, ["typeof"] = true, ["<"] = true, ["else"] = true, [">"] = true, ["debugger"] = true, ["nil"] = true, ["elseif"] = true, ["break"] = true, ["+"] = true, ["<="] = true, ["-"] = true, [">="] = true, ["%"] = true, ["function"] = true, ["do"] = true, ["default"] = true, ["delete"] = true, ["throw"] = true, ["switch"] = true, ["for"] = true, ["case"] = true, ["finally"] = true, ["="] = true, ["or"] = true, ["try"] = true, ["return"] = true, ["false"] = true, ["local"] = true, ["instanceof"] = true, ["true"] = true, ["while"] = true, ["/"] = true, ["new"] = true, ["var"] = true, ["=="] = true, ["repeat"] = true, ["end"] = true, ["then"] = true, ["*"] = true, ["with"] = true, ["catch"] = true, ["this"] = true, ["void"] = true, ["if"] = true, ["and"] = true, ["not"] = true, ["continue"] = true, ["in"] = true}
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
      local _g118
      if c == "-" then
        _g118 = "_"
      else
        local _g119
        if valid_code63(n) then
          _g119 = c
        else
          local _g120
          if i == 0 then
            _g120 = "_" .. n
          else
            _g120 = n
          end
          _g119 = _g120
        end
        _g118 = _g119
      end
      local c1 = _g118
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
    local _g104 = unstash({...})
    local _g105 = _g104.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g106 = module(spec).export
      local n = nil
      for n in next, _g106 do
        if not number63(n) then
          local b = _g106[n]
          if b.variable and (_g105 or b.export) then
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
    local _g107 = sub(xs, 0)
    return(join(t, _g107))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g108 = sub(keys, 0)
    local t1 = {}
    local _g109 = t
    local _g110 = 0
    while _g110 < length(_g109) do
      local x = _g109[_g110 + 1]
      add(t1, x)
      _g110 = _g110 + 1
    end
    local _g111 = t
    local k = nil
    for k in next, _g111 do
      if not number63(k) then
        local v = _g111[k]
        if not _g108[k] then
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
    local _g112 = t
    local k = nil
    for k in next, _g112 do
      if not number63(k) then
        local v = _g112[k]
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
    local _g113 = {"table"}
    _g113.export = quote_frame(m.export)
    _g113.alias = quoted(m.alias)
    _g113.import = quoted(m.import)
    return(_g113)
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
  local _g121 = nexus["lumen/runtime"]
  local read_file = _g121["read-file"]
  local in63 = _g121["in?"]
  local join = _g121.join
  local _37 = _g121["%"]
  local today = _g121.today
  local drop = _g121.drop
  local stash = _g121.stash
  local _ = _g121["-"]
  local _42 = _g121["*"]
  local keys63 = _g121["keys?"]
  local _47 = _g121["/"]
  local _60 = _g121["<"]
  local _62 = _g121[">"]
  local string_literal63 = _g121["string-literal?"]
  local composite63 = _g121["composite?"]
  local code = _g121.code
  local last = _g121.last
  local write = _g121.write
  local series = _g121.series
  local pair = _g121.pair
  local iterate = _g121.iterate
  local is63 = _g121["is?"]
  local keep = _g121.keep
  local write_file = _g121["write-file"]
  local empty63 = _g121["empty?"]
  local list63 = _g121["list?"]
  local sort = _g121.sort
  local string63 = _g121["string?"]
  local map = _g121.map
  local add = _g121.add
  local atom63 = _g121["atom?"]
  local some63 = _g121["some?"]
  local unstash = _g121.unstash
  local boolean63 = _g121["boolean?"]
  local _6061 = _g121["<="]
  local _6261 = _g121[">="]
  local split = _g121.split
  local substring = _g121.substring
  local reverse = _g121.reverse
  local setenv = _g121.setenv
  local module = _g121.module
  local module_key = _g121["module-key"]
  local hd = _g121.hd
  local nil63 = _g121["nil?"]
  local tl = _g121.tl
  local toplevel63 = _g121["toplevel?"]
  local find = _g121.find
  local _37message_handler = _g121["%message-handler"]
  local make_id = _g121["make-id"]
  local apply = _g121.apply
  local function63 = _g121["function?"]
  local reduce = _g121.reduce
  local space = _g121.space
  local string = _g121.string
  local table63 = _g121["table?"]
  local number = _g121.number
  local now = _g121.now
  local sub = _g121.sub
  local exit = _g121.exit
  local replicate = _g121.replicate
  local search = _g121.search
  local length = _g121.length
  local cat = _g121.cat
  local one63 = _g121["one?"]
  local _61 = _g121["="]
  local none63 = _g121["none?"]
  local id_literal63 = _g121["id-literal?"]
  local inner = _g121.inner
  local _43 = _g121["+"]
  local char = _g121.char
  local number63 = _g121["number?"]
  local delimiters = {[";"] = true, ["\n"] = true, ["("] = true, [")"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\n"] = true, [" "] = true, ["\t"] = true}
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
  local _g132 = nexus["lumen/runtime"]
  local read_file = _g132["read-file"]
  local in63 = _g132["in?"]
  local join = _g132.join
  local _37 = _g132["%"]
  local today = _g132.today
  local drop = _g132.drop
  local stash = _g132.stash
  local _ = _g132["-"]
  local _42 = _g132["*"]
  local keys63 = _g132["keys?"]
  local _47 = _g132["/"]
  local _60 = _g132["<"]
  local _62 = _g132[">"]
  local string_literal63 = _g132["string-literal?"]
  local composite63 = _g132["composite?"]
  local code = _g132.code
  local last = _g132.last
  local write = _g132.write
  local series = _g132.series
  local pair = _g132.pair
  local iterate = _g132.iterate
  local is63 = _g132["is?"]
  local keep = _g132.keep
  local write_file = _g132["write-file"]
  local empty63 = _g132["empty?"]
  local list63 = _g132["list?"]
  local sort = _g132.sort
  local string63 = _g132["string?"]
  local map = _g132.map
  local add = _g132.add
  local atom63 = _g132["atom?"]
  local some63 = _g132["some?"]
  local unstash = _g132.unstash
  local boolean63 = _g132["boolean?"]
  local _6061 = _g132["<="]
  local _6261 = _g132[">="]
  local split = _g132.split
  local substring = _g132.substring
  local reverse = _g132.reverse
  local setenv = _g132.setenv
  local module = _g132.module
  local module_key = _g132["module-key"]
  local hd = _g132.hd
  local nil63 = _g132["nil?"]
  local tl = _g132.tl
  local toplevel63 = _g132["toplevel?"]
  local find = _g132.find
  local _37message_handler = _g132["%message-handler"]
  local make_id = _g132["make-id"]
  local apply = _g132.apply
  local function63 = _g132["function?"]
  local reduce = _g132.reduce
  local space = _g132.space
  local string = _g132.string
  local table63 = _g132["table?"]
  local number = _g132.number
  local now = _g132.now
  local sub = _g132.sub
  local exit = _g132.exit
  local replicate = _g132.replicate
  local search = _g132.search
  local length = _g132.length
  local cat = _g132.cat
  local one63 = _g132["one?"]
  local _61 = _g132["="]
  local none63 = _g132["none?"]
  local id_literal63 = _g132["id-literal?"]
  local inner = _g132.inner
  local _43 = _g132["+"]
  local char = _g132.char
  local number63 = _g132["number?"]
  local _g135 = nexus["lumen/lib"]
  local bound63 = _g135["bound?"]
  local reserved63 = _g135["reserved?"]
  local indentation = _g135.indentation
  local variable63 = _g135["variable?"]
  local quote_environment = _g135["quote-environment"]
  local statement63 = _g135["statement?"]
  local key = _g135.key
  local quoted = _g135.quoted
  local symbol63 = _g135["symbol?"]
  local stash42 = _g135["stash*"]
  local special63 = _g135["special?"]
  local macro63 = _g135["macro?"]
  local macroexpand = _g135.macroexpand
  local mapo = _g135.mapo
  local id = _g135.id
  local symbol_expansion = _g135["symbol-expansion"]
  local bind42 = _g135["bind*"]
  local special_form63 = _g135["special-form?"]
  local quote_modules = _g135["quote-modules"]
  local macro_function = _g135["macro-function"]
  local imported = _g135.imported
  local link = _g135.link
  local bind = _g135.bind
  local initial_environment = _g135["initial-environment"]
  local getenv = _g135.getenv
  local quasiexpand = _g135.quasiexpand
  local valid_id63 = _g135["valid-id?"]
  local _g136 = nexus["lumen/reader"]
  local read_from_string = _g136["read-from-string"]
  local read_table = _g136["read-table"]
  local read_all = _g136["read-all"]
  local read = _g136.read
  local make_stream = _g136["make-stream"]
  local _g140 = {}
  _g140.js = "!"
  _g140.lua = "not "
  local _g138 = {}
  local _g141 = {}
  _g141.js = "!"
  _g141.lua = "not "
  _g138["not"] = _g141
  local _g143 = {}
  _g143["/"] = true
  _g143["*"] = true
  _g143["%"] = true
  local _g145 = {}
  _g145["-"] = true
  _g145["+"] = true
  local _g149 = {}
  _g149.js = "+"
  _g149.lua = ".."
  local _g147 = {}
  local _g150 = {}
  _g150.js = "+"
  _g150.lua = ".."
  _g147.cat = _g150
  local _g152 = {}
  _g152["<"] = true
  _g152[">"] = true
  _g152["<="] = true
  _g152[">="] = true
  local _g156 = {}
  _g156.js = "!="
  _g156.lua = "~="
  local _g158 = {}
  _g158.js = "==="
  _g158.lua = "=="
  local _g154 = {}
  local _g159 = {}
  _g159.js = "!="
  _g159.lua = "~="
  _g154["~="] = _g159
  local _g160 = {}
  _g160.js = "==="
  _g160.lua = "=="
  _g154["="] = _g160
  local _g164 = {}
  _g164.js = "&&"
  _g164.lua = "and"
  local _g162 = {}
  local _g165 = {}
  _g165.js = "&&"
  _g165.lua = "and"
  _g162["and"] = _g165
  local _g169 = {}
  _g169.js = "||"
  _g169.lua = "or"
  local _g167 = {}
  local _g170 = {}
  _g170.js = "||"
  _g170.lua = "or"
  _g167["or"] = _g170
  local infix = {_g138, _g143, _g145, _g147, _g152, _g154, _g162, _g167}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g171 = infix
      local i = 0
      while i < length(_g171) do
        local level = _g171[i + 1]
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
    local _g172 = args
    local i = 0
    while i < length(_g172) do
      local arg = _g172[i + 1]
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
    local _g173 = getenv(x)
    local stmt = _g173.stmt
    local special = _g173.special
    local self_tr63 = _g173.tr
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
    local _g174 = unstash({...})
    local right = _g174.right
    local _g203
    if right then
      _g203 = _6261
    else
      _g203 = _62
    end
    if _g203(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g175 = sub(form, 1)
    local a = _g175[1]
    local b = _g175[2]
    local _g176 = op_delims(form, a)
    local ao = _g176[1]
    local ac = _g176[2]
    local _g177 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g177[1]
    local bc = _g177[2]
    local _g178 = compile(a)
    local _g179 = compile(b)
    local _g180 = getop(op)
    if unary63(form) then
      return(_g180 .. ao .. _g178 .. ac)
    else
      return(ao .. _g178 .. ac .. " " .. _g180 .. " " .. bo .. _g179 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g181 = unstash({...})
    local prefix = _g181.prefix
    local name = _g181.name
    local _g204
    if name then
      _g204 = compile(name)
    else
      _g204 = ""
    end
    local id = _g204
    local _g182 = prefix or ""
    local _g183 = compile_args(args)
    indent_level = indent_level + 1
    local _g185 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g184 = _g185
    local ind = indentation()
    local _g205
    if target == "js" then
      _g205 = ""
    else
      _g205 = "end"
    end
    local tr = _g205
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g183 .. " {\n" .. _g184 .. ind .. "}" .. tr)
    else
      return(_g182 .. "function " .. id .. _g183 .. "\n" .. _g184 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g186 = unstash({...})
    local stmt = _g186.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g206
        if stmt then
          _g206 = indentation()
        else
          _g206 = ""
        end
        local ind = _g206
        local _g207
        if atom63(form) then
          _g207 = compile_atom(form)
        else
          local _g208
          if infix63(hd(form)) then
            _g208 = compile_infix(form)
          else
            _g208 = compile_call(form)
          end
          _g207 = _g208
        end
        local _g187 = _g207
        return(ind .. _g187 .. tr)
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
    local _g188 = sub(args, 0, length(args) - 1)
    local _g189 = 0
    while _g189 < length(_g188) do
      local x = _g188[_g189 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g189 = _g189 + 1
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
    local _g190 = args[2]
    local _g191 = args[3]
    if stmt63 or tail63 then
      local _g210
      if _g191 then
        _g210 = {lower_body({_g191}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g190}, tail63)}, _g210)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g209
      if _g191 then
        _g209 = {lower({"set", e, _g191})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g190})}, _g209))
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
      local _g211
      if x == "and" then
        _g211 = {"%if", id, b, id}
      else
        _g211 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g211}, hoist))
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
    local _g192 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g192, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g193 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g193) then
      return(_g193)
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
    local _g194 = unstash({...})
    local _g195 = _g194.all
    local m = module(spec)
    local frame = last(environment)
    local _g196 = m.export
    local k = nil
    for k in next, _g196 do
      if not number63(k) then
        local v = _g196[k]
        if v.export or _g195 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g197 = unstash({...})
    local _g198 = _g197.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g198}))
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
    local _g199 = specs or {}
    local _g200 = 0
    while _g200 < length(_g199) do
      local spec = _g199[_g200 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g201 = import_modules(m.alias)
        local aliased = _g201[1]
        local bs = _g201[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g202 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g202)
      end
      _g200 = _g200 + 1
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
  local _g212 = nexus["lumen/runtime"]
  local read_file = _g212["read-file"]
  local in63 = _g212["in?"]
  local join = _g212.join
  local _37 = _g212["%"]
  local today = _g212.today
  local drop = _g212.drop
  local stash = _g212.stash
  local _ = _g212["-"]
  local _42 = _g212["*"]
  local keys63 = _g212["keys?"]
  local _47 = _g212["/"]
  local _60 = _g212["<"]
  local _62 = _g212[">"]
  local string_literal63 = _g212["string-literal?"]
  local composite63 = _g212["composite?"]
  local code = _g212.code
  local last = _g212.last
  local write = _g212.write
  local series = _g212.series
  local pair = _g212.pair
  local iterate = _g212.iterate
  local is63 = _g212["is?"]
  local keep = _g212.keep
  local write_file = _g212["write-file"]
  local empty63 = _g212["empty?"]
  local list63 = _g212["list?"]
  local sort = _g212.sort
  local string63 = _g212["string?"]
  local map = _g212.map
  local add = _g212.add
  local atom63 = _g212["atom?"]
  local some63 = _g212["some?"]
  local unstash = _g212.unstash
  local boolean63 = _g212["boolean?"]
  local _6061 = _g212["<="]
  local _6261 = _g212[">="]
  local split = _g212.split
  local substring = _g212.substring
  local reverse = _g212.reverse
  local setenv = _g212.setenv
  local module = _g212.module
  local module_key = _g212["module-key"]
  local hd = _g212.hd
  local nil63 = _g212["nil?"]
  local tl = _g212.tl
  local toplevel63 = _g212["toplevel?"]
  local find = _g212.find
  local _37message_handler = _g212["%message-handler"]
  local make_id = _g212["make-id"]
  local apply = _g212.apply
  local function63 = _g212["function?"]
  local reduce = _g212.reduce
  local space = _g212.space
  local string = _g212.string
  local table63 = _g212["table?"]
  local number = _g212.number
  local now = _g212.now
  local sub = _g212.sub
  local exit = _g212.exit
  local replicate = _g212.replicate
  local search = _g212.search
  local length = _g212.length
  local cat = _g212.cat
  local one63 = _g212["one?"]
  local _61 = _g212["="]
  local none63 = _g212["none?"]
  local id_literal63 = _g212["id-literal?"]
  local inner = _g212.inner
  local _43 = _g212["+"]
  local char = _g212.char
  local number63 = _g212["number?"]
  local _g215 = nexus["lumen/lib"]
  local bound63 = _g215["bound?"]
  local reserved63 = _g215["reserved?"]
  local indentation = _g215.indentation
  local variable63 = _g215["variable?"]
  local quote_environment = _g215["quote-environment"]
  local statement63 = _g215["statement?"]
  local key = _g215.key
  local quoted = _g215.quoted
  local symbol63 = _g215["symbol?"]
  local stash42 = _g215["stash*"]
  local special63 = _g215["special?"]
  local macro63 = _g215["macro?"]
  local macroexpand = _g215.macroexpand
  local mapo = _g215.mapo
  local id = _g215.id
  local symbol_expansion = _g215["symbol-expansion"]
  local bind42 = _g215["bind*"]
  local special_form63 = _g215["special-form?"]
  local quote_modules = _g215["quote-modules"]
  local macro_function = _g215["macro-function"]
  local imported = _g215.imported
  local link = _g215.link
  local bind = _g215.bind
  local initial_environment = _g215["initial-environment"]
  local getenv = _g215.getenv
  local quasiexpand = _g215.quasiexpand
  local valid_id63 = _g215["valid-id?"]
  local _g216 = nexus["lumen/compiler"]
  local compile = _g216.compile
  local compile_function = _g216["compile-function"]
  local open_module = _g216["open-module"]
  local declare = _g216.declare
  local load_module = _g216["load-module"]
  local eval = _g216.eval
  local compile_module = _g216["compile-module"]
  local import_modules = _g216["import-modules"]
  local in_module = _g216["in-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g390 = nexus["lumen/runtime"]
  local read_file = _g390["read-file"]
  local in63 = _g390["in?"]
  local join = _g390.join
  local _37 = _g390["%"]
  local today = _g390.today
  local drop = _g390.drop
  local stash = _g390.stash
  local _ = _g390["-"]
  local _42 = _g390["*"]
  local keys63 = _g390["keys?"]
  local _47 = _g390["/"]
  local _60 = _g390["<"]
  local _62 = _g390[">"]
  local string_literal63 = _g390["string-literal?"]
  local composite63 = _g390["composite?"]
  local code = _g390.code
  local last = _g390.last
  local write = _g390.write
  local series = _g390.series
  local pair = _g390.pair
  local iterate = _g390.iterate
  local is63 = _g390["is?"]
  local keep = _g390.keep
  local write_file = _g390["write-file"]
  local empty63 = _g390["empty?"]
  local list63 = _g390["list?"]
  local sort = _g390.sort
  local string63 = _g390["string?"]
  local map = _g390.map
  local add = _g390.add
  local atom63 = _g390["atom?"]
  local some63 = _g390["some?"]
  local unstash = _g390.unstash
  local boolean63 = _g390["boolean?"]
  local _6061 = _g390["<="]
  local _6261 = _g390[">="]
  local split = _g390.split
  local substring = _g390.substring
  local reverse = _g390.reverse
  local setenv = _g390.setenv
  local module = _g390.module
  local module_key = _g390["module-key"]
  local hd = _g390.hd
  local nil63 = _g390["nil?"]
  local tl = _g390.tl
  local toplevel63 = _g390["toplevel?"]
  local find = _g390.find
  local _37message_handler = _g390["%message-handler"]
  local make_id = _g390["make-id"]
  local apply = _g390.apply
  local function63 = _g390["function?"]
  local reduce = _g390.reduce
  local space = _g390.space
  local string = _g390.string
  local table63 = _g390["table?"]
  local number = _g390.number
  local now = _g390.now
  local sub = _g390.sub
  local exit = _g390.exit
  local replicate = _g390.replicate
  local search = _g390.search
  local length = _g390.length
  local cat = _g390.cat
  local one63 = _g390["one?"]
  local _61 = _g390["="]
  local none63 = _g390["none?"]
  local id_literal63 = _g390["id-literal?"]
  local inner = _g390.inner
  local _43 = _g390["+"]
  local char = _g390.char
  local number63 = _g390["number?"]
  local _g393 = nexus["lumen/lib"]
  local bound63 = _g393["bound?"]
  local reserved63 = _g393["reserved?"]
  local indentation = _g393.indentation
  local variable63 = _g393["variable?"]
  local quote_environment = _g393["quote-environment"]
  local statement63 = _g393["statement?"]
  local key = _g393.key
  local quoted = _g393.quoted
  local symbol63 = _g393["symbol?"]
  local stash42 = _g393["stash*"]
  local special63 = _g393["special?"]
  local macro63 = _g393["macro?"]
  local macroexpand = _g393.macroexpand
  local mapo = _g393.mapo
  local id = _g393.id
  local symbol_expansion = _g393["symbol-expansion"]
  local bind42 = _g393["bind*"]
  local special_form63 = _g393["special-form?"]
  local quote_modules = _g393["quote-modules"]
  local macro_function = _g393["macro-function"]
  local imported = _g393.imported
  local link = _g393.link
  local bind = _g393.bind
  local initial_environment = _g393["initial-environment"]
  local getenv = _g393.getenv
  local quasiexpand = _g393.quasiexpand
  local valid_id63 = _g393["valid-id?"]
  local _g394 = nexus["lumen/compiler"]
  local compile = _g394.compile
  local compile_function = _g394["compile-function"]
  local open_module = _g394["open-module"]
  local declare = _g394.declare
  local load_module = _g394["load-module"]
  local eval = _g394.eval
  local compile_module = _g394["compile-module"]
  local import_modules = _g394["import-modules"]
  local in_module = _g394["in-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g703 = nexus["lumen/runtime"]
  local read_file = _g703["read-file"]
  local in63 = _g703["in?"]
  local join = _g703.join
  local _37 = _g703["%"]
  local today = _g703.today
  local drop = _g703.drop
  local stash = _g703.stash
  local _ = _g703["-"]
  local _42 = _g703["*"]
  local keys63 = _g703["keys?"]
  local _47 = _g703["/"]
  local _60 = _g703["<"]
  local _62 = _g703[">"]
  local string_literal63 = _g703["string-literal?"]
  local composite63 = _g703["composite?"]
  local code = _g703.code
  local last = _g703.last
  local write = _g703.write
  local series = _g703.series
  local pair = _g703.pair
  local iterate = _g703.iterate
  local is63 = _g703["is?"]
  local keep = _g703.keep
  local write_file = _g703["write-file"]
  local empty63 = _g703["empty?"]
  local list63 = _g703["list?"]
  local sort = _g703.sort
  local string63 = _g703["string?"]
  local map = _g703.map
  local add = _g703.add
  local atom63 = _g703["atom?"]
  local some63 = _g703["some?"]
  local unstash = _g703.unstash
  local boolean63 = _g703["boolean?"]
  local _6061 = _g703["<="]
  local _6261 = _g703[">="]
  local split = _g703.split
  local substring = _g703.substring
  local reverse = _g703.reverse
  local setenv = _g703.setenv
  local module = _g703.module
  local module_key = _g703["module-key"]
  local hd = _g703.hd
  local nil63 = _g703["nil?"]
  local tl = _g703.tl
  local toplevel63 = _g703["toplevel?"]
  local find = _g703.find
  local _37message_handler = _g703["%message-handler"]
  local make_id = _g703["make-id"]
  local apply = _g703.apply
  local function63 = _g703["function?"]
  local reduce = _g703.reduce
  local space = _g703.space
  local string = _g703.string
  local table63 = _g703["table?"]
  local number = _g703.number
  local now = _g703.now
  local sub = _g703.sub
  local exit = _g703.exit
  local replicate = _g703.replicate
  local search = _g703.search
  local length = _g703.length
  local cat = _g703.cat
  local one63 = _g703["one?"]
  local _61 = _g703["="]
  local none63 = _g703["none?"]
  local id_literal63 = _g703["id-literal?"]
  local inner = _g703.inner
  local _43 = _g703["+"]
  local char = _g703.char
  local number63 = _g703["number?"]
  local _g706 = nexus["lumen/lib"]
  local bound63 = _g706["bound?"]
  local reserved63 = _g706["reserved?"]
  local indentation = _g706.indentation
  local variable63 = _g706["variable?"]
  local quote_environment = _g706["quote-environment"]
  local statement63 = _g706["statement?"]
  local key = _g706.key
  local quoted = _g706.quoted
  local symbol63 = _g706["symbol?"]
  local stash42 = _g706["stash*"]
  local special63 = _g706["special?"]
  local macro63 = _g706["macro?"]
  local macroexpand = _g706.macroexpand
  local mapo = _g706.mapo
  local id = _g706.id
  local symbol_expansion = _g706["symbol-expansion"]
  local bind42 = _g706["bind*"]
  local special_form63 = _g706["special-form?"]
  local quote_modules = _g706["quote-modules"]
  local macro_function = _g706["macro-function"]
  local imported = _g706.imported
  local link = _g706.link
  local bind = _g706.bind
  local initial_environment = _g706["initial-environment"]
  local getenv = _g706.getenv
  local quasiexpand = _g706.quasiexpand
  local valid_id63 = _g706["valid-id?"]
  local _g707 = nexus["lumen/compiler"]
  local compile = _g707.compile
  local compile_function = _g707["compile-function"]
  local open_module = _g707["open-module"]
  local declare = _g707.declare
  local load_module = _g707["load-module"]
  local eval = _g707.eval
  local compile_module = _g707["compile-module"]
  local import_modules = _g707["import-modules"]
  local in_module = _g707["in-module"]
  modules = {["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["bound?"] = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["reserved?"] = {export = true, variable = true}, reserved = {variable = true}, indentation = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, key = {export = true, variable = true}, ["numeric?"] = {variable = true}, ["quoting?"] = {variable = true}, quoted = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["indent-level"] = {global = true, export = true}, extend = {variable = true}, ["quote-frame"] = {variable = true}, id = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["global?"] = {variable = true}, ["special-form?"] = {export = true, variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-module"] = {variable = true}, ["valid-code?"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["quasisplice?"] = {variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["can-unquote?"] = {variable = true}, link = {export = true, variable = true}, bind = {export = true, variable = true}, literal = {variable = true}, escape = {variable = true}, ["initial-environment"] = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, getenv = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["key?"] = {variable = true}, ["read-char"] = {variable = true}, delimiters = {variable = true}, ["define-reader"] = {macro = function (_g720, ...)
    local char = _g720[1]
    local stream = _g720[2]
    local body = unstash({...})
    local _g721 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g721)})
  end, export = true}, whitespace = {variable = true}, read = {export = true, variable = true}, ["flag?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, ["peek-char"] = {variable = true}, eof = {variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%function"] = {foo = true, special = function (args, body)
    return(compile_function(args, body))
  end, export = true}, ["%for"] = {export = true, special = function (t, k, form)
    local _g722 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g723 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g723
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g722 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g722 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, foo = true, tr = true}, ["%if"] = {export = true, special = function (cond, cons, alt)
    local _g724 = compile(cond)
    indent_level = indent_level + 1
    local _g726 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g725 = _g726
    local _g791
    if alt then
      indent_level = indent_level + 1
      local _g728 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g791 = _g728
    end
    local _g727 = _g791
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g724 .. ") {\n" .. _g725 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g724 .. " then\n" .. _g725
    end
    if _g727 and target == "js" then
      str = str .. " else {\n" .. _g727 .. ind .. "}"
    else
      if _g727 then
        str = str .. ind .. "else\n" .. _g727
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, foo = true, tr = true}, ["not"] = {}, ["break"] = {stmt = true, export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true}, set = {stmt = true, export = true, special = function (lh, rh)
    local _g729 = compile(lh)
    local _g792
    if nil63(rh) then
      _g792 = "nil"
    else
      _g792 = rh
    end
    local _g730 = compile(_g792)
    return(indentation() .. _g729 .. " = " .. _g730)
  end, foo = true}, ["%object"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g793
    if target == "lua" then
      _g793 = " = "
    else
      _g793 = ": "
    end
    local sep = _g793
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g731 = pairs
    local i = 0
    while i < length(_g731) do
      local _g732 = _g731[i + 1]
      local k = _g732[1]
      local v = _g732[2]
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
  end, export = true}, ["while"] = {export = true, special = function (cond, form)
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
  end, stmt = true, foo = true, tr = true}, ["%global-function"] = {export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, foo = true, tr = true}, ["%try"] = {export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g735 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g735
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g736 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g736
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, foo = true, tr = true}, ["do"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g737 = forms
    local _g738 = 0
    while _g738 < length(_g737) do
      local x = _g737[_g738 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g738 = _g738 + 1
    end
    return(str)
  end, stmt = true, foo = true, tr = true}, ["%array"] = {foo = true, special = function (...)
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
    local _g739 = forms
    local i = 0
    while i < length(_g739) do
      local x = _g739[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, export = true}, ["return"] = {stmt = true, export = true, special = function (x)
    local _g796
    if nil63(x) then
      _g796 = "return"
    else
      _g796 = "return(" .. compile(x) .. ")"
    end
    local _g740 = _g796
    return(indentation() .. _g740)
  end, foo = true}, error = {stmt = true, export = true, special = function (x)
    local _g797
    if target == "js" then
      _g797 = "throw new " .. compile({"Error", x})
    else
      _g797 = "error(" .. compile(x) .. ")"
    end
    local e = _g797
    return(indentation() .. e)
  end, foo = true}, ["%local"] = {stmt = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g798
    if is63(value) then
      _g798 = " = " .. value1
    else
      _g798 = ""
    end
    local rh = _g798
    local _g799
    if target == "js" then
      _g799 = "var "
    else
      _g799 = "local "
    end
    local keyword = _g799
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true}, get = {foo = true, special = function (t, k)
    local _g741 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g741, 0) == "{" then
      _g741 = "(" .. _g741 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g741 .. "." .. inner(k))
    else
      return(_g741 .. "[" .. k1 .. "]")
    end
  end, export = true}, ["%local-function"] = {export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, stmt = true, foo = true, tr = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g742 = sub(body, 0)
    local form = join({"fn", args}, _g742)
    local keys = sub(_g742, length(_g742))
    local _g743 = {"setenv", {"quote", name}}
    _g743.special = form
    _g743.form = {"quote", form}
    eval(join(_g743, keys))
    return(nil)
  end, export = true}, ["with-bindings"] = {macro = function (_g744, ...)
    local names = _g744[1]
    local body = unstash({...})
    local _g745 = sub(body, 0)
    local x = make_id()
    local _g747 = {"setenv", x}
    _g747.variable = true
    local _g746 = {"with-frame", {"each", {x}, names, _g747}}
    _g746.scope = true
    return(join(_g746, _g745))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g748 = sub(body, 0)
    local form = join({"fn", args}, _g748)
    local _g749 = {"setenv", {"quote", name}}
    _g749.form = {"quote", form}
    _g749.macro = form
    eval(_g749)
    return(nil)
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g750 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g800
    if nil63(v) then
      local _g801
      if b.i then
        _g801 = "i"
      else
        _g801 = make_id()
      end
      local i = _g801
      _g800 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g750), {"inc", i}}}
    else
      local _g751 = {"target"}
      _g751.js = {"isNaN", {"parseInt", k}}
      _g751.lua = {"not", {"number?", k}}
      _g800 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g751, join({"let", {v, {"get", t1, k}}}, _g750)}}}
    end
    return({"let", {t1, t}, _g800})
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g752 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g752)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g753 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g753)})
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g754)
      local a = _g754[1]
      local b = _g754[2]
      local c = sub(_g754, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g755 = xs
    local _g756 = 0
    while _g756 < length(_g755) do
      local x = _g755[_g756 + 1]
      l[x] = true
      _g756 = _g756 + 1
    end
    return(join({"table"}, l))
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g757 = sub(body, 0)
    local _g758 = bind42(args, _g757)
    local _g759 = _g758[1]
    local _g760 = _g758[2]
    return(join({"%function", _g759}, _g760))
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g761 = sub(body, 0)
    return({"if", cond, join({"do"}, _g761)})
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g762) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g762)}))
    else
      if some63(_g762) then
        local _g763 = bind42(x, _g762)
        local args = _g763[1]
        local _g764 = _g763[2]
        return(link(name, join({"%local-function", name, args}, _g764)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g765 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g765))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g766 = bind(lh, rh)
      local _g767 = 0
      while _g767 < length(_g766) do
        local _g768 = _g766[_g767 + 1]
        local id = _g768[1]
        local val = _g768[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g767 = _g767 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g765)}})))
    end
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g769 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g770 = {"table"}
    _g770._scope = scope
    return({"do", {"add", "environment", _g770}, {"let", {x, join({"do"}, _g769)}, {"drop", "environment"}, x}})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g771 = sub(body, 0)
    local exp = _g771.export
    local alias = _g771.alias
    local imp = _g771.import
    local _g772 = import_modules(imp)
    local imports = _g772[1]
    local bindings = _g772[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g773 = exp or {}
    local _g774 = 0
    while _g774 < length(_g773) do
      local x = _g773[_g774 + 1]
      setenv(x, {_stash = true, export = true})
      _g774 = _g774 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g775 = body
      local k = nil
      for k in next, _g775 do
        if not number63(k) then
          local v = _g775[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g776 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g776)})
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g777 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g777) then
      local _g778 = bind42(x, _g777)
      local args = _g778[1]
      local _g779 = _g778[2]
      return(join({"%global-function", name, args}, _g779))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g780 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g781 = join({"do"}, macroexpand(_g780))
    drop(environment)
    return(_g781)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g782 = sub(body, 0)
    add(environment, {})
    map(function (_g784)
      local name = _g784[1]
      local exp = _g784[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g783 = join({"do"}, macroexpand(_g782))
    drop(environment)
    return(_g783)
  end, export = true}, all = {macro = function (_g785, t, ...)
    local k = _g785[1]
    local v = _g785[2]
    local body = unstash({...})
    local _g786 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g802
    if target == "lua" then
      _g802 = _g786
    else
      _g802 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g786)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g802)}})
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {compile = {export = true, variable = true}, ["compile-atom"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, encapsulate = {variable = true}, process = {variable = true}, ["open-module"] = {export = true, variable = true}, ["lower-body"] = {variable = true}, declare = {export = true, variable = true}, ["op-delims"] = {variable = true}, conclude = {variable = true}, ["load-module"] = {export = true, variable = true}, getop = {variable = true}, reimported = {variable = true}, ["compile-infix"] = {variable = true}, eval = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compile-call"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-if"] = {variable = true}, run = {variable = true}, precedence = {variable = true}, infix = {variable = true}, ["module-path"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-special"] = {variable = true}, ["compiling?"] = {variable = true}, terminator = {variable = true}, ["infix?"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["can-return?"] = {variable = true}, ["compile-args"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-definition"] = {variable = true}, ["unary?"] = {variable = true}, ["lower-statement"] = {variable = true}, ["%compile-module"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-do"] = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["%result"] = {global = true, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["read-file"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, join = {export = true, variable = true}, ["%"] = {export = true, variable = true}, today = {export = true, variable = true}, drop = {export = true, variable = true}, stash = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, code = {export = true, variable = true}, last = {export = true, variable = true}, write = {export = true, variable = true}, series = {export = true, variable = true}, pair = {export = true, variable = true}, iterate = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, keep = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, sort = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, map = {export = true, variable = true}, add = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, split = {export = true, variable = true}, substring = {export = true, variable = true}, reverse = {export = true, variable = true}, ["id-count"] = {variable = true}, shift = {variable = true}, setenv = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, find = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, apply = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, reduce = {export = true, variable = true}, space = {export = true, variable = true}, string = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, number = {export = true, variable = true}, now = {export = true, variable = true}, sub = {export = true, variable = true}, exit = {export = true, variable = true}, replicate = {export = true, variable = true}, search = {export = true, variable = true}, length = {export = true, variable = true}, cat = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["+"] = {export = true, variable = true}, char = {export = true, variable = true}, ["number?"] = {export = true, variable = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g787 = sub(body, 0)
    local exp = _g787.export
    local alias = _g787.alias
    local imp = _g787.import
    local _g788 = import_modules(imp)
    local imports = _g788[1]
    local bindings = _g788[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g789 = exp or {}
    local _g790 = 0
    while _g790 < length(_g789) do
      local x = _g789[_g790 + 1]
      setenv(x, {_stash = true, export = true})
      _g790 = _g790 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g803 = nexus["lumen/runtime"]
  local read_file = _g803["read-file"]
  local in63 = _g803["in?"]
  local join = _g803.join
  local _37 = _g803["%"]
  local today = _g803.today
  local drop = _g803.drop
  local stash = _g803.stash
  local _ = _g803["-"]
  local _42 = _g803["*"]
  local keys63 = _g803["keys?"]
  local _47 = _g803["/"]
  local _60 = _g803["<"]
  local _62 = _g803[">"]
  local string_literal63 = _g803["string-literal?"]
  local composite63 = _g803["composite?"]
  local code = _g803.code
  local last = _g803.last
  local write = _g803.write
  local series = _g803.series
  local pair = _g803.pair
  local iterate = _g803.iterate
  local is63 = _g803["is?"]
  local keep = _g803.keep
  local write_file = _g803["write-file"]
  local empty63 = _g803["empty?"]
  local list63 = _g803["list?"]
  local sort = _g803.sort
  local string63 = _g803["string?"]
  local map = _g803.map
  local add = _g803.add
  local atom63 = _g803["atom?"]
  local some63 = _g803["some?"]
  local unstash = _g803.unstash
  local boolean63 = _g803["boolean?"]
  local _6061 = _g803["<="]
  local _6261 = _g803[">="]
  local split = _g803.split
  local substring = _g803.substring
  local reverse = _g803.reverse
  local setenv = _g803.setenv
  local module = _g803.module
  local module_key = _g803["module-key"]
  local hd = _g803.hd
  local nil63 = _g803["nil?"]
  local tl = _g803.tl
  local toplevel63 = _g803["toplevel?"]
  local find = _g803.find
  local _37message_handler = _g803["%message-handler"]
  local make_id = _g803["make-id"]
  local apply = _g803.apply
  local function63 = _g803["function?"]
  local reduce = _g803.reduce
  local space = _g803.space
  local string = _g803.string
  local table63 = _g803["table?"]
  local number = _g803.number
  local now = _g803.now
  local sub = _g803.sub
  local exit = _g803.exit
  local replicate = _g803.replicate
  local search = _g803.search
  local length = _g803.length
  local cat = _g803.cat
  local one63 = _g803["one?"]
  local _61 = _g803["="]
  local none63 = _g803["none?"]
  local id_literal63 = _g803["id-literal?"]
  local inner = _g803.inner
  local _43 = _g803["+"]
  local char = _g803.char
  local number63 = _g803["number?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local read_file = _g2["read-file"]
  local in63 = _g2["in?"]
  local join = _g2.join
  local _37 = _g2["%"]
  local today = _g2.today
  local drop = _g2.drop
  local _43 = _g2["+"]
  local _ = _g2["-"]
  local _42 = _g2["*"]
  local keys63 = _g2["keys?"]
  local _47 = _g2["/"]
  local _60 = _g2["<"]
  local _62 = _g2[">"]
  local none63 = _g2["none?"]
  local composite63 = _g2["composite?"]
  local code = _g2.code
  local last = _g2.last
  local write = _g2.write
  local module = _g2.module
  local pair = _g2.pair
  local iterate = _g2.iterate
  local is63 = _g2["is?"]
  local keep = _g2.keep
  local write_file = _g2["write-file"]
  local empty63 = _g2["empty?"]
  local list63 = _g2["list?"]
  local sort = _g2.sort
  local string63 = _g2["string?"]
  local map = _g2.map
  local add = _g2.add
  local atom63 = _g2["atom?"]
  local some63 = _g2["some?"]
  local sub = _g2.sub
  local boolean63 = _g2["boolean?"]
  local _6061 = _g2["<="]
  local _6261 = _g2[">="]
  local split = _g2.split
  local substring = _g2.substring
  local one63 = _g2["one?"]
  local make_id = _g2["make-id"]
  local length = _g2.length
  local char = _g2.char
  local series = _g2.series
  local number = _g2.number
  local hd = _g2.hd
  local replicate = _g2.replicate
  local tl = _g2.tl
  local toplevel63 = _g2["toplevel?"]
  local find = _g2.find
  local _37message_handler = _g2["%message-handler"]
  local number63 = _g2["number?"]
  local now = _g2.now
  local _61 = _g2["="]
  local reduce = _g2.reduce
  local space = _g2.space
  local module_key = _g2["module-key"]
  local setenv = _g2.setenv
  local nil63 = _g2["nil?"]
  local string_literal63 = _g2["string-literal?"]
  local search = _g2.search
  local string = _g2.string
  local apply = _g2.apply
  local cat = _g2.cat
  local unstash = _g2.unstash
  local table63 = _g2["table?"]
  local reverse = _g2.reverse
  local id_literal63 = _g2["id-literal?"]
  local function63 = _g2["function?"]
  local inner = _g2.inner
  local exit = _g2.exit
  local stash = _g2.stash
  local _g5 = nexus["lumen/reader"]
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local make_stream = _g5["make-stream"]
  local _g6 = nexus["lumen/compiler"]
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local open_module = _g6["open-module"]
  local declare = _g6.declare
  local in_module = _g6["in-module"]
  local eval = _g6.eval
  local load_module = _g6["load-module"]
  local compile_module = _g6["compile-module"]
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g807,_g808 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g806 = {_g807, _g808}
    local _g1 = _g806[1]
    local x = _g806[2]
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
    local _g809 = args
    local i = 0
    while i < length(_g809) do
      local arg = _g809[i + 1]
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
