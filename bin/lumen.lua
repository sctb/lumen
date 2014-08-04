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
  local setenv = _g74.setenv
  local sub = _g74.sub
  local string63 = _g74["string?"]
  local _42 = _g74["*"]
  local stash = _g74.stash
  local _37 = _g74["%"]
  local atom63 = _g74["atom?"]
  local is63 = _g74["is?"]
  local substring = _g74.substring
  local space = _g74.space
  local string = _g74.string
  local search = _g74.search
  local replicate = _g74.replicate
  local make_id = _g74["make-id"]
  local reverse = _g74.reverse
  local _60 = _g74["<"]
  local _61 = _g74["="]
  local series = _g74.series
  local number63 = _g74["number?"]
  local iterate = _g74.iterate
  local list63 = _g74["list?"]
  local composite63 = _g74["composite?"]
  local _47 = _g74["/"]
  local _43 = _g74["+"]
  local string_literal63 = _g74["string-literal?"]
  local _ = _g74["-"]
  local _6061 = _g74["<="]
  local _6261 = _g74[">="]
  local length = _g74.length
  local hd = _g74.hd
  local module_key = _g74["module-key"]
  local unstash = _g74.unstash
  local one63 = _g74["one?"]
  local module = _g74.module
  local keys63 = _g74["keys?"]
  local boolean63 = _g74["boolean?"]
  local last = _g74.last
  local write_file = _g74["write-file"]
  local some63 = _g74["some?"]
  local split = _g74.split
  local tl = _g74.tl
  local drop = _g74.drop
  local toplevel63 = _g74["toplevel?"]
  local pair = _g74.pair
  local _37message_handler = _g74["%message-handler"]
  local apply = _g74.apply
  local sort = _g74.sort
  local number = _g74.number
  local table63 = _g74["table?"]
  local write = _g74.write
  local reduce = _g74.reduce
  local nil63 = _g74["nil?"]
  local today = _g74.today
  local exit = _g74.exit
  local now = _g74.now
  local code = _g74.code
  local empty63 = _g74["empty?"]
  local char = _g74.char
  local keep = _g74.keep
  local none63 = _g74["none?"]
  local find = _g74.find
  local join = _g74.join
  local map = _g74.map
  local _62 = _g74[">"]
  local function63 = _g74["function?"]
  local add = _g74.add
  local id_literal63 = _g74["id-literal?"]
  local cat = _g74.cat
  local in63 = _g74["in?"]
  local inner = _g74.inner
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
        local _g79 = lh
        local k = nil
        for k in next, _g79 do
          local v = _g79[k]
          local _g117
          if k == "rest" then
            _g117 = {"sub", rh, length(lh)}
          else
            _g117 = {"get", rh, {"quote", k}}
          end
          local x = _g117
          local _g118
          if v == true then
            _g118 = k
          else
            _g118 = v
          end
          local _g81 = _g118
          bs = join(bs, bind(_g81, x))
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
        local _g119
        if quasisplice63(v, depth) then
          _g119 = quasiexpand(v[2])
        else
          _g119 = quasiexpand(v, depth)
        end
        local _g96 = _g119
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
  local reserved = {["in"] = true, ["delete"] = true, ["or"] = true, ["switch"] = true, ["var"] = true, ["do"] = true, ["finally"] = true, ["catch"] = true, ["repeat"] = true, ["break"] = true, ["debugger"] = true, ["=="] = true, ["function"] = true, ["default"] = true, ["+"] = true, ["-"] = true, ["/"] = true, ["true"] = true, ["try"] = true, ["not"] = true, ["until"] = true, ["with"] = true, ["throw"] = true, ["void"] = true, ["new"] = true, ["<"] = true, ["case"] = true, [">"] = true, ["%"] = true, ["and"] = true, ["for"] = true, ["return"] = true, ["end"] = true, [">="] = true, ["else"] = true, ["<="] = true, ["false"] = true, ["then"] = true, ["while"] = true, ["this"] = true, ["elseif"] = true, ["local"] = true, ["nil"] = true, ["typeof"] = true, ["*"] = true, ["="] = true, ["instanceof"] = true, ["continue"] = true, ["if"] = true}
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
      local _g120
      if c == "-" then
        _g120 = "_"
      else
        local _g121
        if valid_code63(n) then
          _g121 = c
        else
          local _g122
          if i == 0 then
            _g122 = "_" .. n
          else
            _g122 = n
          end
          _g121 = _g122
        end
        _g120 = _g121
      end
      local c1 = _g120
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
  local _g123 = nexus["lumen/runtime"]
  local read_file = _g123["read-file"]
  local setenv = _g123.setenv
  local sub = _g123.sub
  local string63 = _g123["string?"]
  local _42 = _g123["*"]
  local stash = _g123.stash
  local _37 = _g123["%"]
  local atom63 = _g123["atom?"]
  local is63 = _g123["is?"]
  local substring = _g123.substring
  local space = _g123.space
  local string = _g123.string
  local search = _g123.search
  local replicate = _g123.replicate
  local make_id = _g123["make-id"]
  local reverse = _g123.reverse
  local _60 = _g123["<"]
  local _61 = _g123["="]
  local series = _g123.series
  local number63 = _g123["number?"]
  local iterate = _g123.iterate
  local list63 = _g123["list?"]
  local composite63 = _g123["composite?"]
  local _47 = _g123["/"]
  local _43 = _g123["+"]
  local string_literal63 = _g123["string-literal?"]
  local _ = _g123["-"]
  local _6061 = _g123["<="]
  local _6261 = _g123[">="]
  local length = _g123.length
  local hd = _g123.hd
  local module_key = _g123["module-key"]
  local unstash = _g123.unstash
  local one63 = _g123["one?"]
  local module = _g123.module
  local keys63 = _g123["keys?"]
  local boolean63 = _g123["boolean?"]
  local last = _g123.last
  local write_file = _g123["write-file"]
  local some63 = _g123["some?"]
  local split = _g123.split
  local tl = _g123.tl
  local drop = _g123.drop
  local toplevel63 = _g123["toplevel?"]
  local pair = _g123.pair
  local _37message_handler = _g123["%message-handler"]
  local apply = _g123.apply
  local sort = _g123.sort
  local number = _g123.number
  local table63 = _g123["table?"]
  local write = _g123.write
  local reduce = _g123.reduce
  local nil63 = _g123["nil?"]
  local today = _g123.today
  local exit = _g123.exit
  local now = _g123.now
  local code = _g123.code
  local empty63 = _g123["empty?"]
  local char = _g123.char
  local keep = _g123.keep
  local none63 = _g123["none?"]
  local find = _g123.find
  local join = _g123.join
  local map = _g123.map
  local _62 = _g123[">"]
  local function63 = _g123["function?"]
  local add = _g123.add
  local id_literal63 = _g123["id-literal?"]
  local cat = _g123.cat
  local in63 = _g123["in?"]
  local inner = _g123.inner
  local delimiters = {[")"] = true, ["("] = true, ["\n"] = true, [";"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({string = str, len = length(str), pos = 0})
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
  local _g134 = nexus["lumen/runtime"]
  local read_file = _g134["read-file"]
  local setenv = _g134.setenv
  local sub = _g134.sub
  local string63 = _g134["string?"]
  local _42 = _g134["*"]
  local stash = _g134.stash
  local _37 = _g134["%"]
  local atom63 = _g134["atom?"]
  local is63 = _g134["is?"]
  local substring = _g134.substring
  local space = _g134.space
  local string = _g134.string
  local search = _g134.search
  local replicate = _g134.replicate
  local make_id = _g134["make-id"]
  local reverse = _g134.reverse
  local _60 = _g134["<"]
  local _61 = _g134["="]
  local series = _g134.series
  local number63 = _g134["number?"]
  local iterate = _g134.iterate
  local list63 = _g134["list?"]
  local composite63 = _g134["composite?"]
  local _47 = _g134["/"]
  local _43 = _g134["+"]
  local string_literal63 = _g134["string-literal?"]
  local _ = _g134["-"]
  local _6061 = _g134["<="]
  local _6261 = _g134[">="]
  local length = _g134.length
  local hd = _g134.hd
  local module_key = _g134["module-key"]
  local unstash = _g134.unstash
  local one63 = _g134["one?"]
  local module = _g134.module
  local keys63 = _g134["keys?"]
  local boolean63 = _g134["boolean?"]
  local last = _g134.last
  local write_file = _g134["write-file"]
  local some63 = _g134["some?"]
  local split = _g134.split
  local tl = _g134.tl
  local drop = _g134.drop
  local toplevel63 = _g134["toplevel?"]
  local pair = _g134.pair
  local _37message_handler = _g134["%message-handler"]
  local apply = _g134.apply
  local sort = _g134.sort
  local number = _g134.number
  local table63 = _g134["table?"]
  local write = _g134.write
  local reduce = _g134.reduce
  local nil63 = _g134["nil?"]
  local today = _g134.today
  local exit = _g134.exit
  local now = _g134.now
  local code = _g134.code
  local empty63 = _g134["empty?"]
  local char = _g134.char
  local keep = _g134.keep
  local none63 = _g134["none?"]
  local find = _g134.find
  local join = _g134.join
  local map = _g134.map
  local _62 = _g134[">"]
  local function63 = _g134["function?"]
  local add = _g134.add
  local id_literal63 = _g134["id-literal?"]
  local cat = _g134.cat
  local in63 = _g134["in?"]
  local inner = _g134.inner
  local _g137 = nexus["lumen/lib"]
  local symbol_expansion = _g137["symbol-expansion"]
  local quoted = _g137.quoted
  local symbol63 = _g137["symbol?"]
  local getenv = _g137.getenv
  local statement63 = _g137["statement?"]
  local special_form63 = _g137["special-form?"]
  local initial_environment = _g137["initial-environment"]
  local macro_function = _g137["macro-function"]
  local quote_environment = _g137["quote-environment"]
  local imported = _g137.imported
  local macroexpand = _g137.macroexpand
  local variable63 = _g137["variable?"]
  local link = _g137.link
  local bind = _g137.bind
  local quote_modules = _g137["quote-modules"]
  local quasiexpand = _g137.quasiexpand
  local stash42 = _g137["stash*"]
  local reserved63 = _g137["reserved?"]
  local special63 = _g137["special?"]
  local valid_id63 = _g137["valid-id?"]
  local id = _g137.id
  local bind42 = _g137["bind*"]
  local key = _g137.key
  local mapo = _g137.mapo
  local macro63 = _g137["macro?"]
  local indentation = _g137.indentation
  local bound63 = _g137["bound?"]
  local _g138 = nexus["lumen/reader"]
  local make_stream = _g138["make-stream"]
  local read_table = _g138["read-table"]
  local read_all = _g138["read-all"]
  local read_from_string = _g138["read-from-string"]
  local read = _g138.read
  local _g142 = {}
  _g142.lua = "not "
  _g142.js = "!"
  local _g140 = {}
  local _g143 = {}
  _g143.lua = "not "
  _g143.js = "!"
  _g140["not"] = _g143
  local _g145 = {}
  _g145["/"] = true
  _g145["%"] = true
  _g145["*"] = true
  local _g147 = {}
  _g147["+"] = true
  _g147["-"] = true
  local _g151 = {}
  _g151.lua = ".."
  _g151.js = "+"
  local _g149 = {}
  local _g152 = {}
  _g152.lua = ".."
  _g152.js = "+"
  _g149.cat = _g152
  local _g154 = {}
  _g154["<="] = true
  _g154["<"] = true
  _g154[">="] = true
  _g154[">"] = true
  local _g158 = {}
  _g158.lua = "~="
  _g158.js = "!="
  local _g160 = {}
  _g160.lua = "=="
  _g160.js = "==="
  local _g156 = {}
  local _g161 = {}
  _g161.lua = "~="
  _g161.js = "!="
  _g156["~="] = _g161
  local _g162 = {}
  _g162.lua = "=="
  _g162.js = "==="
  _g156["="] = _g162
  local _g166 = {}
  _g166.lua = "and"
  _g166.js = "&&"
  local _g164 = {}
  local _g167 = {}
  _g167.lua = "and"
  _g167.js = "&&"
  _g164["and"] = _g167
  local _g171 = {}
  _g171.lua = "or"
  _g171.js = "||"
  local _g169 = {}
  local _g172 = {}
  _g172.lua = "or"
  _g172.js = "||"
  _g169["or"] = _g172
  local infix = {_g140, _g145, _g147, _g149, _g154, _g156, _g164, _g169}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g173 = infix
      local i = 0
      while i < length(_g173) do
        local level = _g173[i + 1]
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
    local _g174 = args
    local i = 0
    while i < length(_g174) do
      local arg = _g174[i + 1]
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
    local _g175 = getenv(x)
    local self_tr63 = _g175.tr
    local stmt = _g175.stmt
    local special = _g175.special
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
    local _g176 = unstash({...})
    local right = _g176.right
    local _g205
    if right then
      _g205 = _6261
    else
      _g205 = _62
    end
    if _g205(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g177 = sub(form, 1)
    local a = _g177[1]
    local b = _g177[2]
    local _g178 = op_delims(form, a)
    local ao = _g178[1]
    local ac = _g178[2]
    local _g179 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g179[1]
    local bc = _g179[2]
    local _g180 = compile(a)
    local _g181 = compile(b)
    local _g182 = getop(op)
    if unary63(form) then
      return(_g182 .. ao .. _g180 .. ac)
    else
      return(ao .. _g180 .. ac .. " " .. _g182 .. " " .. bo .. _g181 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g183 = unstash({...})
    local name = _g183.name
    local prefix = _g183.prefix
    local _g206
    if name then
      _g206 = compile(name)
    else
      _g206 = ""
    end
    local id = _g206
    local _g184 = prefix or ""
    local _g185 = compile_args(args)
    indent_level = indent_level + 1
    local _g187 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g186 = _g187
    local ind = indentation()
    local _g207
    if target == "js" then
      _g207 = ""
    else
      _g207 = "end"
    end
    local tr = _g207
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g185 .. " {\n" .. _g186 .. ind .. "}" .. tr)
    else
      return(_g184 .. "function " .. id .. _g185 .. "\n" .. _g186 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g188 = unstash({...})
    local stmt = _g188.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g208
        if stmt then
          _g208 = indentation()
        else
          _g208 = ""
        end
        local ind = _g208
        local _g209
        if atom63(form) then
          _g209 = compile_atom(form)
        else
          local _g210
          if infix63(hd(form)) then
            _g210 = compile_infix(form)
          else
            _g210 = compile_call(form)
          end
          _g209 = _g210
        end
        local _g189 = _g209
        return(ind .. _g189 .. tr)
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
    local _g190 = sub(args, 0, length(args) - 1)
    local _g191 = 0
    while _g191 < length(_g190) do
      local x = _g190[_g191 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g191 = _g191 + 1
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
    local _g192 = args[2]
    local _g193 = args[3]
    if stmt63 or tail63 then
      local _g212
      if _g193 then
        _g212 = {lower_body({_g193}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g192}, tail63)}, _g212)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g211
      if _g193 then
        _g211 = {lower({"set", e, _g193})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g192})}, _g211))
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
      local _g213
      if x == "and" then
        _g213 = {"%if", id, b, id}
      else
        _g213 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g213}, hoist))
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
    local _g194 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g194, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g195 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g195) then
      return(_g195)
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
    local _g196 = unstash({...})
    local _g197 = _g196.all
    local m = module(spec)
    local frame = last(environment)
    local _g198 = m.export
    local k = nil
    for k in next, _g198 do
      if not number63(k) then
        local v = _g198[k]
        if v.export or _g197 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g199 = unstash({...})
    local _g200 = _g199.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g200}))
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
    local _g201 = specs or {}
    local _g202 = 0
    while _g202 < length(_g201) do
      local spec = _g201[_g202 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g203 = import_modules(m.alias)
        local aliased = _g203[1]
        local bs = _g203[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g204 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g204)
      end
      _g202 = _g202 + 1
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
  local _g214 = nexus["lumen/runtime"]
  local read_file = _g214["read-file"]
  local setenv = _g214.setenv
  local sub = _g214.sub
  local string63 = _g214["string?"]
  local _42 = _g214["*"]
  local stash = _g214.stash
  local _37 = _g214["%"]
  local atom63 = _g214["atom?"]
  local is63 = _g214["is?"]
  local substring = _g214.substring
  local space = _g214.space
  local string = _g214.string
  local search = _g214.search
  local replicate = _g214.replicate
  local make_id = _g214["make-id"]
  local reverse = _g214.reverse
  local _60 = _g214["<"]
  local _61 = _g214["="]
  local series = _g214.series
  local number63 = _g214["number?"]
  local iterate = _g214.iterate
  local list63 = _g214["list?"]
  local composite63 = _g214["composite?"]
  local _47 = _g214["/"]
  local _43 = _g214["+"]
  local string_literal63 = _g214["string-literal?"]
  local _ = _g214["-"]
  local _6061 = _g214["<="]
  local _6261 = _g214[">="]
  local length = _g214.length
  local hd = _g214.hd
  local module_key = _g214["module-key"]
  local unstash = _g214.unstash
  local one63 = _g214["one?"]
  local module = _g214.module
  local keys63 = _g214["keys?"]
  local boolean63 = _g214["boolean?"]
  local last = _g214.last
  local write_file = _g214["write-file"]
  local some63 = _g214["some?"]
  local split = _g214.split
  local tl = _g214.tl
  local drop = _g214.drop
  local toplevel63 = _g214["toplevel?"]
  local pair = _g214.pair
  local _37message_handler = _g214["%message-handler"]
  local apply = _g214.apply
  local sort = _g214.sort
  local number = _g214.number
  local table63 = _g214["table?"]
  local write = _g214.write
  local reduce = _g214.reduce
  local nil63 = _g214["nil?"]
  local today = _g214.today
  local exit = _g214.exit
  local now = _g214.now
  local code = _g214.code
  local empty63 = _g214["empty?"]
  local char = _g214.char
  local keep = _g214.keep
  local none63 = _g214["none?"]
  local find = _g214.find
  local join = _g214.join
  local map = _g214.map
  local _62 = _g214[">"]
  local function63 = _g214["function?"]
  local add = _g214.add
  local id_literal63 = _g214["id-literal?"]
  local cat = _g214.cat
  local in63 = _g214["in?"]
  local inner = _g214.inner
  local _g217 = nexus["lumen/lib"]
  local symbol_expansion = _g217["symbol-expansion"]
  local quoted = _g217.quoted
  local symbol63 = _g217["symbol?"]
  local getenv = _g217.getenv
  local statement63 = _g217["statement?"]
  local special_form63 = _g217["special-form?"]
  local initial_environment = _g217["initial-environment"]
  local macro_function = _g217["macro-function"]
  local quote_environment = _g217["quote-environment"]
  local imported = _g217.imported
  local macroexpand = _g217.macroexpand
  local variable63 = _g217["variable?"]
  local link = _g217.link
  local bind = _g217.bind
  local quote_modules = _g217["quote-modules"]
  local quasiexpand = _g217.quasiexpand
  local stash42 = _g217["stash*"]
  local reserved63 = _g217["reserved?"]
  local special63 = _g217["special?"]
  local valid_id63 = _g217["valid-id?"]
  local id = _g217.id
  local bind42 = _g217["bind*"]
  local key = _g217.key
  local mapo = _g217.mapo
  local macro63 = _g217["macro?"]
  local indentation = _g217.indentation
  local bound63 = _g217["bound?"]
  local _g218 = nexus["lumen/compiler"]
  local compile_function = _g218["compile-function"]
  local open_module = _g218["open-module"]
  local in_module = _g218["in-module"]
  local load_module = _g218["load-module"]
  local import_modules = _g218["import-modules"]
  local compile = _g218.compile
  local eval = _g218.eval
  local declare = _g218.declare
  local compile_module = _g218["compile-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g392 = nexus["lumen/runtime"]
  local read_file = _g392["read-file"]
  local setenv = _g392.setenv
  local sub = _g392.sub
  local string63 = _g392["string?"]
  local _42 = _g392["*"]
  local stash = _g392.stash
  local _37 = _g392["%"]
  local atom63 = _g392["atom?"]
  local is63 = _g392["is?"]
  local substring = _g392.substring
  local space = _g392.space
  local string = _g392.string
  local search = _g392.search
  local replicate = _g392.replicate
  local make_id = _g392["make-id"]
  local reverse = _g392.reverse
  local _60 = _g392["<"]
  local _61 = _g392["="]
  local series = _g392.series
  local number63 = _g392["number?"]
  local iterate = _g392.iterate
  local list63 = _g392["list?"]
  local composite63 = _g392["composite?"]
  local _47 = _g392["/"]
  local _43 = _g392["+"]
  local string_literal63 = _g392["string-literal?"]
  local _ = _g392["-"]
  local _6061 = _g392["<="]
  local _6261 = _g392[">="]
  local length = _g392.length
  local hd = _g392.hd
  local module_key = _g392["module-key"]
  local unstash = _g392.unstash
  local one63 = _g392["one?"]
  local module = _g392.module
  local keys63 = _g392["keys?"]
  local boolean63 = _g392["boolean?"]
  local last = _g392.last
  local write_file = _g392["write-file"]
  local some63 = _g392["some?"]
  local split = _g392.split
  local tl = _g392.tl
  local drop = _g392.drop
  local toplevel63 = _g392["toplevel?"]
  local pair = _g392.pair
  local _37message_handler = _g392["%message-handler"]
  local apply = _g392.apply
  local sort = _g392.sort
  local number = _g392.number
  local table63 = _g392["table?"]
  local write = _g392.write
  local reduce = _g392.reduce
  local nil63 = _g392["nil?"]
  local today = _g392.today
  local exit = _g392.exit
  local now = _g392.now
  local code = _g392.code
  local empty63 = _g392["empty?"]
  local char = _g392.char
  local keep = _g392.keep
  local none63 = _g392["none?"]
  local find = _g392.find
  local join = _g392.join
  local map = _g392.map
  local _62 = _g392[">"]
  local function63 = _g392["function?"]
  local add = _g392.add
  local id_literal63 = _g392["id-literal?"]
  local cat = _g392.cat
  local in63 = _g392["in?"]
  local inner = _g392.inner
  local _g395 = nexus["lumen/lib"]
  local symbol_expansion = _g395["symbol-expansion"]
  local quoted = _g395.quoted
  local symbol63 = _g395["symbol?"]
  local getenv = _g395.getenv
  local statement63 = _g395["statement?"]
  local special_form63 = _g395["special-form?"]
  local initial_environment = _g395["initial-environment"]
  local macro_function = _g395["macro-function"]
  local quote_environment = _g395["quote-environment"]
  local imported = _g395.imported
  local macroexpand = _g395.macroexpand
  local variable63 = _g395["variable?"]
  local link = _g395.link
  local bind = _g395.bind
  local quote_modules = _g395["quote-modules"]
  local quasiexpand = _g395.quasiexpand
  local stash42 = _g395["stash*"]
  local reserved63 = _g395["reserved?"]
  local special63 = _g395["special?"]
  local valid_id63 = _g395["valid-id?"]
  local id = _g395.id
  local bind42 = _g395["bind*"]
  local key = _g395.key
  local mapo = _g395.mapo
  local macro63 = _g395["macro?"]
  local indentation = _g395.indentation
  local bound63 = _g395["bound?"]
  local _g396 = nexus["lumen/compiler"]
  local compile_function = _g396["compile-function"]
  local open_module = _g396["open-module"]
  local in_module = _g396["in-module"]
  local load_module = _g396["load-module"]
  local import_modules = _g396["import-modules"]
  local compile = _g396.compile
  local eval = _g396.eval
  local declare = _g396.declare
  local compile_module = _g396["compile-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g705 = nexus["lumen/runtime"]
  local read_file = _g705["read-file"]
  local setenv = _g705.setenv
  local sub = _g705.sub
  local string63 = _g705["string?"]
  local _42 = _g705["*"]
  local stash = _g705.stash
  local _37 = _g705["%"]
  local atom63 = _g705["atom?"]
  local is63 = _g705["is?"]
  local substring = _g705.substring
  local space = _g705.space
  local string = _g705.string
  local search = _g705.search
  local replicate = _g705.replicate
  local make_id = _g705["make-id"]
  local reverse = _g705.reverse
  local _60 = _g705["<"]
  local _61 = _g705["="]
  local series = _g705.series
  local number63 = _g705["number?"]
  local iterate = _g705.iterate
  local list63 = _g705["list?"]
  local composite63 = _g705["composite?"]
  local _47 = _g705["/"]
  local _43 = _g705["+"]
  local string_literal63 = _g705["string-literal?"]
  local _ = _g705["-"]
  local _6061 = _g705["<="]
  local _6261 = _g705[">="]
  local length = _g705.length
  local hd = _g705.hd
  local module_key = _g705["module-key"]
  local unstash = _g705.unstash
  local one63 = _g705["one?"]
  local module = _g705.module
  local keys63 = _g705["keys?"]
  local boolean63 = _g705["boolean?"]
  local last = _g705.last
  local write_file = _g705["write-file"]
  local some63 = _g705["some?"]
  local split = _g705.split
  local tl = _g705.tl
  local drop = _g705.drop
  local toplevel63 = _g705["toplevel?"]
  local pair = _g705.pair
  local _37message_handler = _g705["%message-handler"]
  local apply = _g705.apply
  local sort = _g705.sort
  local number = _g705.number
  local table63 = _g705["table?"]
  local write = _g705.write
  local reduce = _g705.reduce
  local nil63 = _g705["nil?"]
  local today = _g705.today
  local exit = _g705.exit
  local now = _g705.now
  local code = _g705.code
  local empty63 = _g705["empty?"]
  local char = _g705.char
  local keep = _g705.keep
  local none63 = _g705["none?"]
  local find = _g705.find
  local join = _g705.join
  local map = _g705.map
  local _62 = _g705[">"]
  local function63 = _g705["function?"]
  local add = _g705.add
  local id_literal63 = _g705["id-literal?"]
  local cat = _g705.cat
  local in63 = _g705["in?"]
  local inner = _g705.inner
  local _g708 = nexus["lumen/lib"]
  local symbol_expansion = _g708["symbol-expansion"]
  local quoted = _g708.quoted
  local symbol63 = _g708["symbol?"]
  local getenv = _g708.getenv
  local statement63 = _g708["statement?"]
  local special_form63 = _g708["special-form?"]
  local initial_environment = _g708["initial-environment"]
  local macro_function = _g708["macro-function"]
  local quote_environment = _g708["quote-environment"]
  local imported = _g708.imported
  local macroexpand = _g708.macroexpand
  local variable63 = _g708["variable?"]
  local link = _g708.link
  local bind = _g708.bind
  local quote_modules = _g708["quote-modules"]
  local quasiexpand = _g708.quasiexpand
  local stash42 = _g708["stash*"]
  local reserved63 = _g708["reserved?"]
  local special63 = _g708["special?"]
  local valid_id63 = _g708["valid-id?"]
  local id = _g708.id
  local bind42 = _g708["bind*"]
  local key = _g708.key
  local mapo = _g708.mapo
  local macro63 = _g708["macro?"]
  local indentation = _g708.indentation
  local bound63 = _g708["bound?"]
  local _g709 = nexus["lumen/compiler"]
  local compile_function = _g709["compile-function"]
  local open_module = _g709["open-module"]
  local in_module = _g709["in-module"]
  local load_module = _g709["load-module"]
  local import_modules = _g709["import-modules"]
  local compile = _g709.compile
  local eval = _g709.eval
  local declare = _g709.declare
  local compile_module = _g709["compile-module"]
  modules = {["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {get = {foo = true, export = true, special = function (t, k)
    local _g722 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g722, 0) == "{" then
      _g722 = "(" .. _g722 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g722 .. "." .. inner(k))
    else
      return(_g722 .. "[" .. k1 .. "]")
    end
  end}, ["%local"] = {foo = true, export = true, stmt = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g793
    if is63(value) then
      _g793 = " = " .. value1
    else
      _g793 = ""
    end
    local rh = _g793
    local _g794
    if target == "js" then
      _g794 = "var "
    else
      _g794 = "local "
    end
    local keyword = _g794
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end}, ["return"] = {foo = true, export = true, stmt = true, special = function (x)
    local _g795
    if nil63(x) then
      _g795 = "return"
    else
      _g795 = "return(" .. compile(x) .. ")"
    end
    local _g723 = _g795
    return(indentation() .. _g723)
  end}, ["while"] = {tr = true, export = true, foo = true, stmt = true, special = function (cond, form)
    local _g724 = compile(cond)
    indent_level = indent_level + 1
    local _g725 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g725
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g724 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g724 .. " do\n" .. body .. ind .. "end\n")
    end
  end}, ["break"] = {foo = true, export = true, stmt = true, special = function ()
    return(indentation() .. "break")
  end}, ["%try"] = {tr = true, export = true, foo = true, stmt = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g726 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g726
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g727 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g727
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g796
    if target == "lua" then
      _g796 = " = "
    else
      _g796 = ": "
    end
    local sep = _g796
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g728 = pairs
    local i = 0
    while i < length(_g728) do
      local _g729 = _g728[i + 1]
      local k = _g729[1]
      local v = _g729[2]
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
  end}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _g797
    if target == "lua" then
      _g797 = "{"
    else
      _g797 = "["
    end
    local open = _g797
    local _g798
    if target == "lua" then
      _g798 = "}"
    else
      _g798 = "]"
    end
    local close = _g798
    local str = ""
    local _g730 = forms
    local i = 0
    while i < length(_g730) do
      local x = _g730[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["not"] = {}, ["%global-function"] = {tr = true, export = true, foo = true, stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["do"] = {tr = true, export = true, foo = true, stmt = true, special = function (...)
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
  end}, error = {foo = true, export = true, stmt = true, special = function (x)
    local _g799
    if target == "js" then
      _g799 = "throw new " .. compile({"Error", x})
    else
      _g799 = "error(" .. compile(x) .. ")"
    end
    local e = _g799
    return(indentation() .. e)
  end}, ["%if"] = {tr = true, export = true, foo = true, stmt = true, special = function (cond, cons, alt)
    local _g733 = compile(cond)
    indent_level = indent_level + 1
    local _g735 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g734 = _g735
    local _g800
    if alt then
      indent_level = indent_level + 1
      local _g737 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g800 = _g737
    end
    local _g736 = _g800
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g733 .. ") {\n" .. _g734 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g733 .. " then\n" .. _g734
    end
    if _g736 and target == "js" then
      str = str .. " else {\n" .. _g736 .. ind .. "}"
    else
      if _g736 then
        str = str .. ind .. "else\n" .. _g736
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end}, ["%for"] = {tr = true, export = true, foo = true, stmt = true, special = function (t, k, form)
    local _g738 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g739 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g739
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g738 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g738 .. ") {\n" .. body .. ind .. "}\n")
    end
  end}, set = {foo = true, export = true, stmt = true, special = function (lh, rh)
    local _g740 = compile(lh)
    local _g801
    if nil63(rh) then
      _g801 = "nil"
    else
      _g801 = rh
    end
    local _g741 = compile(_g801)
    return(indentation() .. _g740 .. " = " .. _g741)
  end}, ["%local-function"] = {tr = true, export = true, foo = true, stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["symbol-expansion"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quoting?"] = {variable = true}, quoted = {variable = true, export = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, exclude = {variable = true}, reserved = {variable = true}, ["symbol?"] = {variable = true, export = true}, getenv = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["quasiquoting?"] = {variable = true}, ["special-form?"] = {variable = true, export = true}, ["quote-frame"] = {variable = true}, ["initial-environment"] = {variable = true, export = true}, ["quote-module"] = {variable = true}, ["macro-function"] = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, ["quote-binding"] = {variable = true}, extend = {variable = true}, ["valid-code?"] = {variable = true}, imported = {variable = true, export = true}, ["indent-level"] = {export = true, global = true}, ["quasisplice?"] = {variable = true}, macroexpand = {variable = true, export = true}, ["quasiquote-list"] = {variable = true}, literal = {variable = true}, ["variable?"] = {variable = true, export = true}, link = {variable = true, export = true}, bind = {variable = true, export = true}, ["global?"] = {variable = true}, ["quote-modules"] = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, escape = {variable = true}, ["special?"] = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, id = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, key = {variable = true, export = true}, mapo = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, indentation = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["peek-char"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["read-table"] = {variable = true, export = true}, delimiters = {variable = true}, ["flag?"] = {variable = true}, ["read-char"] = {variable = true}, ["read-all"] = {variable = true, export = true}, eof = {variable = true}, ["read-from-string"] = {variable = true, export = true}, read = {variable = true, export = true}, ["define-reader"] = {macro = function (_g742, ...)
    local char = _g742[1]
    local stream = _g742[2]
    local body = unstash({...})
    local _g743 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g743)})
  end, export = true}, whitespace = {variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {modules = {export = true, global = true}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["read-file"] = {variable = true, export = true}, setenv = {variable = true, export = true}, sub = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, stash = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, ["id-count"] = {variable = true}, substring = {variable = true, export = true}, space = {variable = true, export = true}, string = {variable = true, export = true}, search = {variable = true, export = true}, replicate = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, reverse = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, series = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, iterate = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, [">="] = {variable = true, export = true}, length = {variable = true, export = true}, hd = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, unstash = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, module = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, last = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, split = {variable = true, export = true}, tl = {variable = true, export = true}, shift = {variable = true}, drop = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, pair = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, apply = {variable = true, export = true}, sort = {variable = true, export = true}, number = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, write = {variable = true, export = true}, reduce = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, today = {variable = true, export = true}, exit = {variable = true, export = true}, now = {variable = true, export = true}, code = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, char = {variable = true, export = true}, keep = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, find = {variable = true, export = true}, join = {variable = true, export = true}, map = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, add = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, cat = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, inner = {variable = true, export = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["lower-do"] = {variable = true}, reimported = {variable = true}, ["lower-try"] = {variable = true}, run = {variable = true}, ["compiler-output"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, encapsulate = {variable = true}, ["open-module"] = {variable = true, export = true}, ["lower-body"] = {variable = true}, ["unary?"] = {variable = true}, ["compile-args"] = {variable = true}, ["can-return?"] = {variable = true}, ["compiling?"] = {variable = true}, terminator = {variable = true}, ["lower-while"] = {variable = true}, ["compile-atom"] = {variable = true}, getop = {variable = true}, ["lower-infix?"] = {variable = true}, ["in-module"] = {variable = true, export = true}, ["load-module"] = {variable = true, export = true}, ["lower-function"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-short"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, compile = {variable = true, export = true}, process = {variable = true}, ["lower-if"] = {variable = true}, ["%compile-module"] = {variable = true}, ["compile-special"] = {variable = true}, conclude = {variable = true}, ["compile-file"] = {variable = true}, ["module-path"] = {variable = true}, eval = {variable = true, export = true}, ["op-delims"] = {variable = true}, ["infix?"] = {variable = true}, ["current-module"] = {export = true, global = true}, ["lower-definition"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-call"] = {variable = true}, infix = {variable = true}, ["lower-for"] = {variable = true}, precedence = {variable = true}, ["lower-infix"] = {variable = true}, declare = {variable = true, export = true}, ["%result"] = {export = true, global = true}, ["compile-call"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, lower = {variable = true}, ["compile-infix"] = {variable = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g744 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g744)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g745 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g745)})
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
  end, export = true}, all = {macro = function (_g749, t, ...)
    local k = _g749[1]
    local v = _g749[2]
    local body = unstash({...})
    local _g750 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g802
    if target == "lua" then
      _g802 = _g750
    else
      _g802 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g750)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g802)}})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g751 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g752 = {"table"}
    _g752._scope = scope
    return({"do", {"add", "environment", _g752}, {"let", {x, join({"do"}, _g751)}, {"drop", "environment"}, x}})
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g753 = sub(body, 0)
    return({"if", cond, join({"do"}, _g753)})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g754 = body
      local k = nil
      for k in next, _g754 do
        if not number63(k) then
          local v = _g754[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g755 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g755)})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g756 = xs
    local _g757 = 0
    while _g757 < length(_g756) do
      local x = _g756[_g757 + 1]
      l[x] = true
      _g757 = _g757 + 1
    end
    return(join({"table"}, l))
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g758 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g758))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g759 = bind(lh, rh)
      local _g760 = 0
      while _g760 < length(_g759) do
        local _g761 = _g759[_g760 + 1]
        local id = _g761[1]
        local val = _g761[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g760 = _g760 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g758)}})))
    end
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    add(environment, {})
    map(function (_g764)
      local name = _g764[1]
      local exp = _g764[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g763 = join({"do"}, macroexpand(_g762))
    drop(environment)
    return(_g763)
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g765 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g766 = join({"do"}, macroexpand(_g765))
    drop(environment)
    return(_g766)
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g767 = sub(body, 0)
    local _g768 = bind42(args, _g767)
    local _g769 = _g768[1]
    local _g770 = _g768[2]
    return(join({"%function", _g769}, _g770))
  end, export = true}, ["with-bindings"] = {macro = function (_g771, ...)
    local names = _g771[1]
    local body = unstash({...})
    local _g772 = sub(body, 0)
    local x = make_id()
    local _g774 = {"setenv", x}
    _g774.variable = true
    local _g773 = {"with-frame", {"each", {x}, names, _g774}}
    _g773.scope = true
    return(join(_g773, _g772))
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g775 = sub(body, 0)
    local form = join({"fn", args}, _g775)
    local keys = sub(_g775, length(_g775))
    local _g776 = {"setenv", {"quote", name}}
    _g776.form = {"quote", form}
    _g776.special = form
    eval(join(_g776, keys))
    return(nil)
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g777 = sub(body, 0)
    local exp = _g777.export
    local alias = _g777.alias
    local imp = _g777.import
    local _g778 = import_modules(imp)
    local imports = _g778[1]
    local bindings = _g778[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g779 = exp or {}
    local _g780 = 0
    while _g780 < length(_g779) do
      local x = _g779[_g780 + 1]
      setenv(x, {_stash = true, export = true})
      _g780 = _g780 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g781 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g803
    if nil63(v) then
      local _g804
      if b.i then
        _g804 = "i"
      else
        _g804 = make_id()
      end
      local i = _g804
      _g803 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g781), {"inc", i}}}
    else
      local _g782 = {"target"}
      _g782.lua = {"not", {"number?", k}}
      _g782.js = {"isNaN", {"parseInt", k}}
      _g803 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g782, join({"let", {v, {"get", t1, k}}}, _g781)}}}
    end
    return({"let", {t1, t}, _g803})
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g783)
      local a = _g783[1]
      local b = _g783[2]
      local c = sub(_g783, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g784 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g784) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g784)}))
    else
      if some63(_g784) then
        local _g785 = bind42(x, _g784)
        local args = _g785[1]
        local _g786 = _g785[2]
        return(link(name, join({"%local-function", name, args}, _g786)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g787 = sub(body, 0)
    local form = join({"fn", args}, _g787)
    local _g788 = {"setenv", {"quote", name}}
    _g788.macro = form
    _g788.form = {"quote", form}
    eval(_g788)
    return(nil)
  end, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g789 = sub(body, 0)
    local exp = _g789.export
    local alias = _g789.alias
    local imp = _g789.import
    local _g790 = import_modules(imp)
    local imports = _g790[1]
    local bindings = _g790[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g791 = exp or {}
    local _g792 = 0
    while _g792 < length(_g791) do
      local x = _g791[_g792 + 1]
      setenv(x, {_stash = true, export = true})
      _g792 = _g792 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g805 = nexus["lumen/runtime"]
  local read_file = _g805["read-file"]
  local setenv = _g805.setenv
  local sub = _g805.sub
  local string63 = _g805["string?"]
  local _42 = _g805["*"]
  local stash = _g805.stash
  local _37 = _g805["%"]
  local atom63 = _g805["atom?"]
  local is63 = _g805["is?"]
  local substring = _g805.substring
  local space = _g805.space
  local string = _g805.string
  local search = _g805.search
  local replicate = _g805.replicate
  local make_id = _g805["make-id"]
  local reverse = _g805.reverse
  local _60 = _g805["<"]
  local _61 = _g805["="]
  local series = _g805.series
  local number63 = _g805["number?"]
  local iterate = _g805.iterate
  local list63 = _g805["list?"]
  local composite63 = _g805["composite?"]
  local _47 = _g805["/"]
  local _43 = _g805["+"]
  local string_literal63 = _g805["string-literal?"]
  local _ = _g805["-"]
  local _6061 = _g805["<="]
  local _6261 = _g805[">="]
  local length = _g805.length
  local hd = _g805.hd
  local module_key = _g805["module-key"]
  local unstash = _g805.unstash
  local one63 = _g805["one?"]
  local module = _g805.module
  local keys63 = _g805["keys?"]
  local boolean63 = _g805["boolean?"]
  local last = _g805.last
  local write_file = _g805["write-file"]
  local some63 = _g805["some?"]
  local split = _g805.split
  local tl = _g805.tl
  local drop = _g805.drop
  local toplevel63 = _g805["toplevel?"]
  local pair = _g805.pair
  local _37message_handler = _g805["%message-handler"]
  local apply = _g805.apply
  local sort = _g805.sort
  local number = _g805.number
  local table63 = _g805["table?"]
  local write = _g805.write
  local reduce = _g805.reduce
  local nil63 = _g805["nil?"]
  local today = _g805.today
  local exit = _g805.exit
  local now = _g805.now
  local code = _g805.code
  local empty63 = _g805["empty?"]
  local char = _g805.char
  local keep = _g805.keep
  local none63 = _g805["none?"]
  local find = _g805.find
  local join = _g805.join
  local map = _g805.map
  local _62 = _g805[">"]
  local function63 = _g805["function?"]
  local add = _g805.add
  local id_literal63 = _g805["id-literal?"]
  local cat = _g805.cat
  local in63 = _g805["in?"]
  local inner = _g805.inner
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local read_file = _g2["read-file"]
  local setenv = _g2.setenv
  local sub = _g2.sub
  local string63 = _g2["string?"]
  local _42 = _g2["*"]
  local stash = _g2.stash
  local none63 = _g2["none?"]
  local atom63 = _g2["atom?"]
  local is63 = _g2["is?"]
  local substring = _g2.substring
  local space = _g2.space
  local string = _g2.string
  local search = _g2.search
  local replicate = _g2.replicate
  local make_id = _g2["make-id"]
  local reverse = _g2.reverse
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local series = _g2.series
  local number63 = _g2["number?"]
  local iterate = _g2.iterate
  local list63 = _g2["list?"]
  local composite63 = _g2["composite?"]
  local _47 = _g2["/"]
  local find = _g2.find
  local string_literal63 = _g2["string-literal?"]
  local _ = _g2["-"]
  local _6061 = _g2["<="]
  local _6261 = _g2[">="]
  local length = _g2.length
  local hd = _g2.hd
  local module_key = _g2["module-key"]
  local unstash = _g2.unstash
  local one63 = _g2["one?"]
  local module = _g2.module
  local keys63 = _g2["keys?"]
  local boolean63 = _g2["boolean?"]
  local last = _g2.last
  local write_file = _g2["write-file"]
  local some63 = _g2["some?"]
  local split = _g2.split
  local tl = _g2.tl
  local add = _g2.add
  local toplevel63 = _g2["toplevel?"]
  local pair = _g2.pair
  local _37message_handler = _g2["%message-handler"]
  local apply = _g2.apply
  local join = _g2.join
  local number = _g2.number
  local table63 = _g2["table?"]
  local write = _g2.write
  local reduce = _g2.reduce
  local nil63 = _g2["nil?"]
  local today = _g2.today
  local exit = _g2.exit
  local now = _g2.now
  local code = _g2.code
  local empty63 = _g2["empty?"]
  local char = _g2.char
  local keep = _g2.keep
  local _62 = _g2[">"]
  local _37 = _g2["%"]
  local _43 = _g2["+"]
  local cat = _g2.cat
  local map = _g2.map
  local function63 = _g2["function?"]
  local sort = _g2.sort
  local id_literal63 = _g2["id-literal?"]
  local drop = _g2.drop
  local in63 = _g2["in?"]
  local inner = _g2.inner
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus["lumen/compiler"]
  local import_modules = _g6["import-modules"]
  local compile_function = _g6["compile-function"]
  local open_module = _g6["open-module"]
  local in_module = _g6["in-module"]
  local load_module = _g6["load-module"]
  local compile = _g6.compile
  local eval = _g6.eval
  local declare = _g6.declare
  local compile_module = _g6["compile-module"]
  local function rep(str)
    local _g809,_g810 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g808 = {_g809, _g810}
    local _g1 = _g808[1]
    local x = _g808[2]
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
    local _g811 = args
    local i = 0
    while i < length(_g811) do
      local arg = _g811[i + 1]
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
