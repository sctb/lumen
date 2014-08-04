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
      local _g142
      if nil63(from) or from < 0 then
        _g142 = 0
      else
        _g142 = from
      end
      local i = _g142
      local n = length(x)
      local _g143
      if nil63(upto) or upto > n then
        _g143 = n
      else
        _g143 = upto
      end
      local _g46 = _g143
      while i < _g46 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g47 = x
      local k = nil
      for k in next, _g47 do
        local v = _g47[k]
        if not number63(k) then
          l[k] = v
        end
      end
      return(l)
    end
  end
  nexus["lumen/runtime"].sub = sub
  local function keys(x)
    local t = {}
    local _g50 = x
    local k = nil
    for k in next, _g50 do
      local v = _g50[k]
      if not number63(k) then
        t[k] = v
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].keys = keys
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
    local _g144
    if n then
      _g144 = n + 1
    end
    return(string.byte(str, _g144))
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
      local _g63 = a
      local k = nil
      for k in next, _g63 do
        local v = _g63[k]
        c[k] = v
      end
      local _g65 = b
      local k = nil
      for k in next, _g65 do
        local v = _g65[k]
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
    local _g70 = x
    local k = nil
    for k in next, _g70 do
      local v = _g70[k]
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
    local _g73 = t
    local _g21 = nil
    for _g21 in next, _g73 do
      local y = _g73[_g21]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g76 = t
    local _g22 = nil
    for _g22 in next, _g76 do
      local x = _g76[_g22]
      local _g78 = f(x)
      if _g78 then
        return(_g78)
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
    local _g87 = x
    local k = nil
    for k in next, _g87 do
      local v = _g87[k]
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
    local _g90 = t
    local k = nil
    for k in next, _g90 do
      local _g23 = _g90[k]
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
    local _g93 = t
    local _g24 = nil
    for _g24 in next, _g93 do
      local _g25 = _g93[_g24]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g96 = args
      local k = nil
      for k in next, _g96 do
        local v = _g96[k]
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
        local _g99 = l
        local k = nil
        for k in next, _g99 do
          local v = _g99[k]
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
    local _g145
    if start then
      _g145 = start + 1
    end
    local _g102 = _g145
    local i = string.find(str, pattern, _g102, true)
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
    if none63(xs) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, xs))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return(a + b)
    end, xs))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(xs)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return(a * b)
    end, xs))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(xs)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(xs)))
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
            local _g123 = x
            local k = nil
            for k in next, _g123 do
              local v = _g123[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _g125 = join(xs, ks)
            local _g26 = nil
            for _g26 in next, _g125 do
              local v = _g125[_g26]
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
    local _g131 = stash(args)
    return(f(unpack(_g131)))
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
    local _g138 = unstash({...})
    local keys = sub(_g138, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g139 = keys
      local _g141 = nil
      for _g141 in next, _g139 do
        local v = _g139[_g141]
        x[_g141] = v
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
  local _g149 = nexus["lumen/runtime"]
  local _ = _g149["-"]
  local _43 = _g149["+"]
  local _42 = _g149["*"]
  local tl = _g149.tl
  local _37 = _g149["%"]
  local hd = _g149.hd
  local pair = _g149.pair
  local _61 = _g149["="]
  local _60 = _g149["<"]
  local _37message_handler = _g149["%message-handler"]
  local _47 = _g149["/"]
  local length = _g149.length
  local none63 = _g149["none?"]
  local table63 = _g149["table?"]
  local module_key = _g149["module-key"]
  local toplevel63 = _g149["toplevel?"]
  local char = _g149.char
  local _62 = _g149[">"]
  local id_literal63 = _g149["id-literal?"]
  local list63 = _g149["list?"]
  local string_literal63 = _g149["string-literal?"]
  local join = _g149.join
  local substring = _g149.substring
  local today = _g149.today
  local one63 = _g149["one?"]
  local series = _g149.series
  local exit = _g149.exit
  local find = _g149.find
  local keys = _g149.keys
  local write = _g149.write
  local search = _g149.search
  local sort = _g149.sort
  local inner = _g149.inner
  local keys63 = _g149["keys?"]
  local keep = _g149.keep
  local composite63 = _g149["composite?"]
  local split = _g149.split
  local in63 = _g149["in?"]
  local reverse = _g149.reverse
  local sub = _g149.sub
  local cat = _g149.cat
  local some63 = _g149["some?"]
  local stash = _g149.stash
  local setenv = _g149.setenv
  local module = _g149.module
  local make_id = _g149["make-id"]
  local last = _g149.last
  local apply = _g149.apply
  local number63 = _g149["number?"]
  local string = _g149.string
  local space = _g149.space
  local add = _g149.add
  local atom63 = _g149["atom?"]
  local string63 = _g149["string?"]
  local number = _g149.number
  local empty63 = _g149["empty?"]
  local map = _g149.map
  local now = _g149.now
  local boolean63 = _g149["boolean?"]
  local function63 = _g149["function?"]
  local read_file = _g149["read-file"]
  local code = _g149.code
  local replicate = _g149.replicate
  local write_file = _g149["write-file"]
  local _6061 = _g149["<="]
  local reduce = _g149.reduce
  local iterate = _g149.iterate
  local unstash = _g149.unstash
  local _6261 = _g149[">="]
  local drop = _g149.drop
  local nil63 = _g149["nil?"]
  local is63 = _g149["is?"]
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
      local _g235
      if c == "\n" then
        _g235 = "\\n"
      else
        local _g236
        if c == "\"" then
          _g236 = "\\\""
        else
          local _g237
          if c == "\\" then
            _g237 = "\\\\"
          else
            _g237 = c
          end
          _g236 = _g237
        end
        _g235 = _g236
      end
      local c1 = _g235
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
      local _g169 = args
      local k = nil
      for k in next, _g169 do
        local v = _g169[k]
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
  local function index(x)
    if number63(x) and target ~= "lua" then
      if target == "js" then
        x = x - 1
      else
        x = x + 1
      end
    end
    return(x)
  end
  nexus["lumen/lib"].index = index
  local function bind(lh, rh)
    if composite63(lh) and list63(rh) then
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local _g173 = lh
        local k = nil
        for k in next, _g173 do
          local v = _g173[k]
          local _g238
          if k == "&" then
            _g238 = {"sub", rh, length(lh)}
          else
            _g238 = {"get", rh, {"quote", index(k)}}
          end
          local x = _g238
          local _g239
          if v == true then
            _g239 = k
          else
            _g239 = v
          end
          local _g175 = _g239
          bs = join(bs, bind(_g175, x))
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
      local k63 = keys63(args)
      local r = make_id()
      local _g178 = args
      local k = nil
      for k in next, _g178 do
        local v = _g178[k]
        if number63(k) then
          if atom63(v) then
            add(args1, v)
          else
            local x = make_id()
            add(args1, x)
            bs = join(bs, {v, x})
          end
        end
      end
      if k63 then
        bs = join(bs, {r, rest()})
        bs = join(bs, {keys(args), r})
      end
      return({args1, {join({"let", bs}, body)}})
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
          local _g146 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g147 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g187 = args
            local _g188 = 0
            while _g188 < length(_g187) do
              local _g185 = _g187[_g188 + 1]
              setenv(_g185, {_stash = true, variable = true})
              _g188 = _g188 + 1
            end
            local _g186 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g186)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g148 = form[1]
              local _g189 = form[2]
              local _g190 = form[3]
              local _g191 = sub(form, 3)
              add(environment, {_scope = true})
              local _g194 = _g190
              local _g195 = 0
              while _g195 < length(_g194) do
                local _g192 = _g194[_g195 + 1]
                setenv(_g192, {_stash = true, variable = true})
                _g195 = _g195 + 1
              end
              local _g193 = join({x, _g189, _g190}, macroexpand(_g191))
              drop(environment)
              return(_g193)
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
    local _g197 = form
    local k = nil
    for k in next, _g197 do
      local v = _g197[k]
      if not number63(k) then
        local _g240
        if quasisplice63(v, depth) then
          _g240 = quasiexpand(v[2])
        else
          _g240 = quasiexpand(v, depth)
        end
        local _g199 = _g240
        last(xs)[k] = _g199
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _g201 = quasiexpand(x[2])
        add(xs, _g201)
        return(add(xs, {"list"}))
      else
        return(add(last(xs), quasiexpand(x, depth)))
      end
    end, form)
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
  local reserved = {["continue"] = true, ["else"] = true, ["="] = true, ["default"] = true, ["and"] = true, ["new"] = true, ["not"] = true, ["end"] = true, ["if"] = true, ["=="] = true, ["catch"] = true, ["-"] = true, ["%"] = true, ["debugger"] = true, ["+"] = true, ["local"] = true, ["function"] = true, ["until"] = true, ["do"] = true, ["nil"] = true, ["delete"] = true, ["or"] = true, ["instanceof"] = true, ["var"] = true, ["this"] = true, ["/"] = true, ["return"] = true, ["void"] = true, ["while"] = true, ["true"] = true, ["with"] = true, ["elseif"] = true, ["finally"] = true, ["<"] = true, [">="] = true, ["then"] = true, ["typeof"] = true, ["switch"] = true, [">"] = true, ["<="] = true, ["throw"] = true, ["try"] = true, ["case"] = true, ["in"] = true, ["false"] = true, ["for"] = true, ["break"] = true, ["*"] = true, ["repeat"] = true}
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
      local _g241
      if c == "-" then
        _g241 = "_"
      else
        local _g242
        if valid_code63(n) then
          _g242 = c
        else
          local _g243
          if i == 0 then
            _g243 = "_" .. n
          else
            _g243 = n
          end
          _g242 = _g243
        end
        _g241 = _g242
      end
      local c1 = _g241
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
    local _g218 = unstash({...})
    local private = _g218.private
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g219 = module(spec).export
      local n = nil
      for n in next, _g219 do
        if not number63(n) then
          local b = _g219[n]
          if b.variable and (private or b.export) then
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
    local _g221 = unstash({...})
    local xs = sub(_g221, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g222 = unstash({...})
    local keys = sub(_g222, 0)
    local t1 = {}
    local _g223 = t
    local k = nil
    for k in next, _g223 do
      local v = _g223[k]
      if not keys[k] then
        t1[k] = v
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
    local _g227 = t
    local k = nil
    for k in next, _g227 do
      if not number63(k) then
        local v = _g227[k]
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
    local _g232 = {"table"}
    _g232.import = quoted(m.import)
    _g232.alias = quoted(m.alias)
    _g232.export = quote_frame(m.export)
    return(_g232)
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
  local _g244 = nexus["lumen/runtime"]
  local _ = _g244["-"]
  local _43 = _g244["+"]
  local _42 = _g244["*"]
  local tl = _g244.tl
  local _37 = _g244["%"]
  local hd = _g244.hd
  local pair = _g244.pair
  local _61 = _g244["="]
  local _60 = _g244["<"]
  local _37message_handler = _g244["%message-handler"]
  local _47 = _g244["/"]
  local length = _g244.length
  local none63 = _g244["none?"]
  local table63 = _g244["table?"]
  local module_key = _g244["module-key"]
  local toplevel63 = _g244["toplevel?"]
  local char = _g244.char
  local _62 = _g244[">"]
  local id_literal63 = _g244["id-literal?"]
  local list63 = _g244["list?"]
  local string_literal63 = _g244["string-literal?"]
  local join = _g244.join
  local substring = _g244.substring
  local today = _g244.today
  local one63 = _g244["one?"]
  local series = _g244.series
  local exit = _g244.exit
  local find = _g244.find
  local keys = _g244.keys
  local write = _g244.write
  local search = _g244.search
  local sort = _g244.sort
  local inner = _g244.inner
  local keys63 = _g244["keys?"]
  local keep = _g244.keep
  local composite63 = _g244["composite?"]
  local split = _g244.split
  local in63 = _g244["in?"]
  local reverse = _g244.reverse
  local sub = _g244.sub
  local cat = _g244.cat
  local some63 = _g244["some?"]
  local stash = _g244.stash
  local setenv = _g244.setenv
  local module = _g244.module
  local make_id = _g244["make-id"]
  local last = _g244.last
  local apply = _g244.apply
  local number63 = _g244["number?"]
  local string = _g244.string
  local space = _g244.space
  local add = _g244.add
  local atom63 = _g244["atom?"]
  local string63 = _g244["string?"]
  local number = _g244.number
  local empty63 = _g244["empty?"]
  local map = _g244.map
  local now = _g244.now
  local boolean63 = _g244["boolean?"]
  local function63 = _g244["function?"]
  local read_file = _g244["read-file"]
  local code = _g244.code
  local replicate = _g244.replicate
  local write_file = _g244["write-file"]
  local _6061 = _g244["<="]
  local reduce = _g244.reduce
  local iterate = _g244.iterate
  local unstash = _g244.unstash
  local _6261 = _g244[">="]
  local drop = _g244.drop
  local nil63 = _g244["nil?"]
  local is63 = _g244["is?"]
  local delimiters = {["("] = true, [";"] = true, ["\n"] = true, [")"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
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
  local _g273 = nexus["lumen/runtime"]
  local _ = _g273["-"]
  local _43 = _g273["+"]
  local _42 = _g273["*"]
  local tl = _g273.tl
  local _37 = _g273["%"]
  local hd = _g273.hd
  local pair = _g273.pair
  local _61 = _g273["="]
  local _60 = _g273["<"]
  local _37message_handler = _g273["%message-handler"]
  local _47 = _g273["/"]
  local length = _g273.length
  local none63 = _g273["none?"]
  local table63 = _g273["table?"]
  local module_key = _g273["module-key"]
  local toplevel63 = _g273["toplevel?"]
  local char = _g273.char
  local _62 = _g273[">"]
  local id_literal63 = _g273["id-literal?"]
  local list63 = _g273["list?"]
  local string_literal63 = _g273["string-literal?"]
  local join = _g273.join
  local substring = _g273.substring
  local today = _g273.today
  local one63 = _g273["one?"]
  local series = _g273.series
  local exit = _g273.exit
  local find = _g273.find
  local keys = _g273.keys
  local write = _g273.write
  local search = _g273.search
  local sort = _g273.sort
  local inner = _g273.inner
  local keys63 = _g273["keys?"]
  local keep = _g273.keep
  local composite63 = _g273["composite?"]
  local split = _g273.split
  local in63 = _g273["in?"]
  local reverse = _g273.reverse
  local sub = _g273.sub
  local cat = _g273.cat
  local some63 = _g273["some?"]
  local stash = _g273.stash
  local setenv = _g273.setenv
  local module = _g273.module
  local make_id = _g273["make-id"]
  local last = _g273.last
  local apply = _g273.apply
  local number63 = _g273["number?"]
  local string = _g273.string
  local space = _g273.space
  local add = _g273.add
  local atom63 = _g273["atom?"]
  local string63 = _g273["string?"]
  local number = _g273.number
  local empty63 = _g273["empty?"]
  local map = _g273.map
  local now = _g273.now
  local boolean63 = _g273["boolean?"]
  local function63 = _g273["function?"]
  local read_file = _g273["read-file"]
  local code = _g273.code
  local replicate = _g273.replicate
  local write_file = _g273["write-file"]
  local _6061 = _g273["<="]
  local reduce = _g273.reduce
  local iterate = _g273.iterate
  local unstash = _g273.unstash
  local _6261 = _g273[">="]
  local drop = _g273.drop
  local nil63 = _g273["nil?"]
  local is63 = _g273["is?"]
  local _g276 = nexus["lumen/lib"]
  local link = _g276.link
  local id = _g276.id
  local variable63 = _g276["variable?"]
  local imported = _g276.imported
  local key = _g276.key
  local reserved63 = _g276["reserved?"]
  local valid_id63 = _g276["valid-id?"]
  local bound63 = _g276["bound?"]
  local quoted = _g276.quoted
  local symbol63 = _g276["symbol?"]
  local macroexpand = _g276.macroexpand
  local symbol_expansion = _g276["symbol-expansion"]
  local statement63 = _g276["statement?"]
  local quote_modules = _g276["quote-modules"]
  local special63 = _g276["special?"]
  local quasiexpand = _g276.quasiexpand
  local macro63 = _g276["macro?"]
  local indentation = _g276.indentation
  local mapo = _g276.mapo
  local macro_function = _g276["macro-function"]
  local stash42 = _g276["stash*"]
  local bind = _g276.bind
  local getenv = _g276.getenv
  local quote_environment = _g276["quote-environment"]
  local initial_environment = _g276["initial-environment"]
  local special_form63 = _g276["special-form?"]
  local bind42 = _g276["bind*"]
  local _g277 = nexus["lumen/reader"]
  local read = _g277.read
  local make_stream = _g277["make-stream"]
  local read_from_string = _g277["read-from-string"]
  local read_table = _g277["read-table"]
  local read_all = _g277["read-all"]
  local _g281 = {}
  _g281.js = "!"
  _g281.lua = "not "
  local _g279 = {}
  local _g282 = {}
  _g282.js = "!"
  _g282.lua = "not "
  _g279["not"] = _g282
  local _g284 = {}
  _g284["%"] = true
  _g284["/"] = true
  _g284["*"] = true
  local _g286 = {}
  _g286["-"] = true
  _g286["+"] = true
  local _g290 = {}
  _g290.js = "+"
  _g290.lua = ".."
  local _g288 = {}
  local _g291 = {}
  _g291.js = "+"
  _g291.lua = ".."
  _g288.cat = _g291
  local _g293 = {}
  _g293[">="] = true
  _g293["<"] = true
  _g293["<="] = true
  _g293[">"] = true
  local _g297 = {}
  _g297.js = "!="
  _g297.lua = "~="
  local _g299 = {}
  _g299.js = "==="
  _g299.lua = "=="
  local _g295 = {}
  local _g300 = {}
  _g300.js = "!="
  _g300.lua = "~="
  _g295["~="] = _g300
  local _g301 = {}
  _g301.js = "==="
  _g301.lua = "=="
  _g295["="] = _g301
  local _g305 = {}
  _g305.js = "&&"
  _g305.lua = "and"
  local _g303 = {}
  local _g306 = {}
  _g306.js = "&&"
  _g306.lua = "and"
  _g303["and"] = _g306
  local _g310 = {}
  _g310.js = "||"
  _g310.lua = "or"
  local _g308 = {}
  local _g311 = {}
  _g311.js = "||"
  _g311.lua = "or"
  _g308["or"] = _g311
  local infix = {_g279, _g284, _g286, _g288, _g293, _g295, _g303, _g308}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g314 = infix
      local i = 0
      while i < length(_g314) do
        local level = _g314[i + 1]
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
    local _g319 = args
    local i = 0
    while i < length(_g319) do
      local arg = _g319[i + 1]
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
    local _g323 = getenv(x)
    local special = _g323.special
    local stmt = _g323.stmt
    local self_tr63 = _g323.tr
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
    local _g326 = unstash({...})
    local right = _g326.right
    local _g388
    if right then
      _g388 = _6261
    else
      _g388 = _62
    end
    if _g388(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g328 = sub(form, 1)
    local a = _g328[1]
    local b = _g328[2]
    local _g329 = op_delims(form, a)
    local ao = _g329[1]
    local ac = _g329[2]
    local _g330 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g330[1]
    local bc = _g330[2]
    local _g331 = compile(a)
    local _g332 = compile(b)
    local _g333 = getop(op)
    if unary63(form) then
      return(_g333 .. ao .. _g331 .. ac)
    else
      return(ao .. _g331 .. ac .. " " .. _g333 .. " " .. bo .. _g332 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g334 = unstash({...})
    local name = _g334.name
    local prefix = _g334.prefix
    local _g389
    if name then
      _g389 = compile(name)
    else
      _g389 = ""
    end
    local id = _g389
    local _g335 = prefix or ""
    local _g336 = compile_args(args)
    indent_level = indent_level + 1
    local _g338 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g337 = _g338
    local ind = indentation()
    local _g390
    if target == "js" then
      _g390 = ""
    else
      _g390 = "end"
    end
    local tr = _g390
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g336 .. " {\n" .. _g337 .. ind .. "}" .. tr)
    else
      return(_g335 .. "function " .. id .. _g336 .. "\n" .. _g337 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g340 = unstash({...})
    local stmt = _g340.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g391
        if stmt then
          _g391 = indentation()
        else
          _g391 = ""
        end
        local ind = _g391
        local _g392
        if atom63(form) then
          _g392 = compile_atom(form)
        else
          local _g393
          if infix63(hd(form)) then
            _g393 = compile_infix(form)
          else
            _g393 = compile_call(form)
          end
          _g392 = _g393
        end
        local _g341 = _g392
        return(ind .. _g341 .. tr)
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
    local _g345 = sub(args, 0, length(args) - 1)
    local _g346 = 0
    while _g346 < length(_g345) do
      local x = _g345[_g346 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g346 = _g346 + 1
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
    local _g348 = args[2]
    local _g349 = args[3]
    if stmt63 or tail63 then
      local _g395
      if _g349 then
        _g395 = {lower_body({_g349}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g348}, tail63)}, _g395)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g394
      if _g349 then
        _g394 = {lower({"set", e, _g349})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g348})}, _g394))
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
      local _g396
      if x == "and" then
        _g396 = {"%if", id, b, id}
      else
        _g396 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g396}, hoist))
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
    local _g356 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g356, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g358 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g358) then
      return(_g358)
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
    local _g372 = unstash({...})
    local _g373 = _g372.all
    local m = module(spec)
    local frame = last(environment)
    local _g374 = m.export
    local k = nil
    for k in next, _g374 do
      if not number63(k) then
        local v = _g374[k]
        if v.export or _g373 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g375 = unstash({...})
    local _g376 = _g375.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g376}))
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
    local _g379 = specs or {}
    local _g380 = 0
    while _g380 < length(_g379) do
      local spec = _g379[_g380 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g381 = import_modules(m.alias)
        local aliased = _g381[1]
        local bs = _g381[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g382 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g382)
      end
      _g380 = _g380 + 1
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
    return(join(imports, imported(current_module, {_stash = true, private = true})))
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
  local _g397 = nexus["lumen/runtime"]
  local _ = _g397["-"]
  local _43 = _g397["+"]
  local _42 = _g397["*"]
  local tl = _g397.tl
  local _37 = _g397["%"]
  local hd = _g397.hd
  local pair = _g397.pair
  local _61 = _g397["="]
  local _60 = _g397["<"]
  local _37message_handler = _g397["%message-handler"]
  local _47 = _g397["/"]
  local length = _g397.length
  local none63 = _g397["none?"]
  local table63 = _g397["table?"]
  local module_key = _g397["module-key"]
  local toplevel63 = _g397["toplevel?"]
  local char = _g397.char
  local _62 = _g397[">"]
  local id_literal63 = _g397["id-literal?"]
  local list63 = _g397["list?"]
  local string_literal63 = _g397["string-literal?"]
  local join = _g397.join
  local substring = _g397.substring
  local today = _g397.today
  local one63 = _g397["one?"]
  local series = _g397.series
  local exit = _g397.exit
  local find = _g397.find
  local keys = _g397.keys
  local write = _g397.write
  local search = _g397.search
  local sort = _g397.sort
  local inner = _g397.inner
  local keys63 = _g397["keys?"]
  local keep = _g397.keep
  local composite63 = _g397["composite?"]
  local split = _g397.split
  local in63 = _g397["in?"]
  local reverse = _g397.reverse
  local sub = _g397.sub
  local cat = _g397.cat
  local some63 = _g397["some?"]
  local stash = _g397.stash
  local setenv = _g397.setenv
  local module = _g397.module
  local make_id = _g397["make-id"]
  local last = _g397.last
  local apply = _g397.apply
  local number63 = _g397["number?"]
  local string = _g397.string
  local space = _g397.space
  local add = _g397.add
  local atom63 = _g397["atom?"]
  local string63 = _g397["string?"]
  local number = _g397.number
  local empty63 = _g397["empty?"]
  local map = _g397.map
  local now = _g397.now
  local boolean63 = _g397["boolean?"]
  local function63 = _g397["function?"]
  local read_file = _g397["read-file"]
  local code = _g397.code
  local replicate = _g397.replicate
  local write_file = _g397["write-file"]
  local _6061 = _g397["<="]
  local reduce = _g397.reduce
  local iterate = _g397.iterate
  local unstash = _g397.unstash
  local _6261 = _g397[">="]
  local drop = _g397.drop
  local nil63 = _g397["nil?"]
  local is63 = _g397["is?"]
  local _g400 = nexus["lumen/lib"]
  local link = _g400.link
  local id = _g400.id
  local variable63 = _g400["variable?"]
  local imported = _g400.imported
  local key = _g400.key
  local reserved63 = _g400["reserved?"]
  local valid_id63 = _g400["valid-id?"]
  local bound63 = _g400["bound?"]
  local quoted = _g400.quoted
  local symbol63 = _g400["symbol?"]
  local macroexpand = _g400.macroexpand
  local symbol_expansion = _g400["symbol-expansion"]
  local statement63 = _g400["statement?"]
  local quote_modules = _g400["quote-modules"]
  local special63 = _g400["special?"]
  local quasiexpand = _g400.quasiexpand
  local macro63 = _g400["macro?"]
  local indentation = _g400.indentation
  local mapo = _g400.mapo
  local macro_function = _g400["macro-function"]
  local stash42 = _g400["stash*"]
  local bind = _g400.bind
  local getenv = _g400.getenv
  local quote_environment = _g400["quote-environment"]
  local initial_environment = _g400["initial-environment"]
  local special_form63 = _g400["special-form?"]
  local bind42 = _g400["bind*"]
  local _g401 = nexus["lumen/compiler"]
  local import_modules = _g401["import-modules"]
  local compile_module = _g401["compile-module"]
  local load_module = _g401["load-module"]
  local eval = _g401.eval
  local compile_function = _g401["compile-function"]
  local in_module = _g401["in-module"]
  local declare = _g401.declare
  local open_module = _g401["open-module"]
  local compile = _g401.compile
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g588 = nexus["lumen/runtime"]
  local _ = _g588["-"]
  local _43 = _g588["+"]
  local _42 = _g588["*"]
  local tl = _g588.tl
  local _37 = _g588["%"]
  local hd = _g588.hd
  local pair = _g588.pair
  local _61 = _g588["="]
  local _60 = _g588["<"]
  local _37message_handler = _g588["%message-handler"]
  local _47 = _g588["/"]
  local length = _g588.length
  local none63 = _g588["none?"]
  local table63 = _g588["table?"]
  local module_key = _g588["module-key"]
  local toplevel63 = _g588["toplevel?"]
  local char = _g588.char
  local _62 = _g588[">"]
  local id_literal63 = _g588["id-literal?"]
  local list63 = _g588["list?"]
  local string_literal63 = _g588["string-literal?"]
  local join = _g588.join
  local substring = _g588.substring
  local today = _g588.today
  local one63 = _g588["one?"]
  local series = _g588.series
  local exit = _g588.exit
  local find = _g588.find
  local keys = _g588.keys
  local write = _g588.write
  local search = _g588.search
  local sort = _g588.sort
  local inner = _g588.inner
  local keys63 = _g588["keys?"]
  local keep = _g588.keep
  local composite63 = _g588["composite?"]
  local split = _g588.split
  local in63 = _g588["in?"]
  local reverse = _g588.reverse
  local sub = _g588.sub
  local cat = _g588.cat
  local some63 = _g588["some?"]
  local stash = _g588.stash
  local setenv = _g588.setenv
  local module = _g588.module
  local make_id = _g588["make-id"]
  local last = _g588.last
  local apply = _g588.apply
  local number63 = _g588["number?"]
  local string = _g588.string
  local space = _g588.space
  local add = _g588.add
  local atom63 = _g588["atom?"]
  local string63 = _g588["string?"]
  local number = _g588.number
  local empty63 = _g588["empty?"]
  local map = _g588.map
  local now = _g588.now
  local boolean63 = _g588["boolean?"]
  local function63 = _g588["function?"]
  local read_file = _g588["read-file"]
  local code = _g588.code
  local replicate = _g588.replicate
  local write_file = _g588["write-file"]
  local _6061 = _g588["<="]
  local reduce = _g588.reduce
  local iterate = _g588.iterate
  local unstash = _g588.unstash
  local _6261 = _g588[">="]
  local drop = _g588.drop
  local nil63 = _g588["nil?"]
  local is63 = _g588["is?"]
  local _g591 = nexus["lumen/lib"]
  local link = _g591.link
  local id = _g591.id
  local variable63 = _g591["variable?"]
  local imported = _g591.imported
  local key = _g591.key
  local reserved63 = _g591["reserved?"]
  local valid_id63 = _g591["valid-id?"]
  local bound63 = _g591["bound?"]
  local quoted = _g591.quoted
  local symbol63 = _g591["symbol?"]
  local macroexpand = _g591.macroexpand
  local symbol_expansion = _g591["symbol-expansion"]
  local statement63 = _g591["statement?"]
  local quote_modules = _g591["quote-modules"]
  local special63 = _g591["special?"]
  local quasiexpand = _g591.quasiexpand
  local macro63 = _g591["macro?"]
  local indentation = _g591.indentation
  local mapo = _g591.mapo
  local macro_function = _g591["macro-function"]
  local stash42 = _g591["stash*"]
  local bind = _g591.bind
  local getenv = _g591.getenv
  local quote_environment = _g591["quote-environment"]
  local initial_environment = _g591["initial-environment"]
  local special_form63 = _g591["special-form?"]
  local bind42 = _g591["bind*"]
  local _g592 = nexus["lumen/compiler"]
  local import_modules = _g592["import-modules"]
  local compile_module = _g592["compile-module"]
  local load_module = _g592["load-module"]
  local eval = _g592.eval
  local compile_function = _g592["compile-function"]
  local in_module = _g592["in-module"]
  local declare = _g592.declare
  local open_module = _g592["open-module"]
  local compile = _g592.compile
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g915 = nexus["lumen/runtime"]
  local _ = _g915["-"]
  local _43 = _g915["+"]
  local _42 = _g915["*"]
  local tl = _g915.tl
  local _37 = _g915["%"]
  local hd = _g915.hd
  local pair = _g915.pair
  local _61 = _g915["="]
  local _60 = _g915["<"]
  local _37message_handler = _g915["%message-handler"]
  local _47 = _g915["/"]
  local length = _g915.length
  local none63 = _g915["none?"]
  local table63 = _g915["table?"]
  local module_key = _g915["module-key"]
  local toplevel63 = _g915["toplevel?"]
  local char = _g915.char
  local _62 = _g915[">"]
  local id_literal63 = _g915["id-literal?"]
  local list63 = _g915["list?"]
  local string_literal63 = _g915["string-literal?"]
  local join = _g915.join
  local substring = _g915.substring
  local today = _g915.today
  local one63 = _g915["one?"]
  local series = _g915.series
  local exit = _g915.exit
  local find = _g915.find
  local keys = _g915.keys
  local write = _g915.write
  local search = _g915.search
  local sort = _g915.sort
  local inner = _g915.inner
  local keys63 = _g915["keys?"]
  local keep = _g915.keep
  local composite63 = _g915["composite?"]
  local split = _g915.split
  local in63 = _g915["in?"]
  local reverse = _g915.reverse
  local sub = _g915.sub
  local cat = _g915.cat
  local some63 = _g915["some?"]
  local stash = _g915.stash
  local setenv = _g915.setenv
  local module = _g915.module
  local make_id = _g915["make-id"]
  local last = _g915.last
  local apply = _g915.apply
  local number63 = _g915["number?"]
  local string = _g915.string
  local space = _g915.space
  local add = _g915.add
  local atom63 = _g915["atom?"]
  local string63 = _g915["string?"]
  local number = _g915.number
  local empty63 = _g915["empty?"]
  local map = _g915.map
  local now = _g915.now
  local boolean63 = _g915["boolean?"]
  local function63 = _g915["function?"]
  local read_file = _g915["read-file"]
  local code = _g915.code
  local replicate = _g915.replicate
  local write_file = _g915["write-file"]
  local _6061 = _g915["<="]
  local reduce = _g915.reduce
  local iterate = _g915.iterate
  local unstash = _g915.unstash
  local _6261 = _g915[">="]
  local drop = _g915.drop
  local nil63 = _g915["nil?"]
  local is63 = _g915["is?"]
  local _g918 = nexus["lumen/lib"]
  local link = _g918.link
  local id = _g918.id
  local variable63 = _g918["variable?"]
  local imported = _g918.imported
  local key = _g918.key
  local reserved63 = _g918["reserved?"]
  local valid_id63 = _g918["valid-id?"]
  local bound63 = _g918["bound?"]
  local quoted = _g918.quoted
  local symbol63 = _g918["symbol?"]
  local macroexpand = _g918.macroexpand
  local symbol_expansion = _g918["symbol-expansion"]
  local statement63 = _g918["statement?"]
  local quote_modules = _g918["quote-modules"]
  local special63 = _g918["special?"]
  local quasiexpand = _g918.quasiexpand
  local macro63 = _g918["macro?"]
  local indentation = _g918.indentation
  local mapo = _g918.mapo
  local macro_function = _g918["macro-function"]
  local stash42 = _g918["stash*"]
  local bind = _g918.bind
  local getenv = _g918.getenv
  local quote_environment = _g918["quote-environment"]
  local initial_environment = _g918["initial-environment"]
  local special_form63 = _g918["special-form?"]
  local bind42 = _g918["bind*"]
  local _g919 = nexus["lumen/compiler"]
  local import_modules = _g919["import-modules"]
  local compile_module = _g919["compile-module"]
  local load_module = _g919["load-module"]
  local eval = _g919.eval
  local compile_function = _g919["compile-function"]
  local in_module = _g919["in-module"]
  local declare = _g919.declare
  local open_module = _g919["open-module"]
  local compile = _g919.compile
  modules = {["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {each = {export = true, macro = function (b, t, ...)
    local _g934 = unstash({...})
    local body = sub(_g934, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g1035
    if nil63(v) then
      local _g1036
      if b.i then
        _g1036 = "i"
      else
        _g1036 = make_id()
      end
      local i = _g1036
      _g1035 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g935 = {"target"}
      _g935.js = {"isNaN", {"parseInt", k}}
      _g935.lua = {"not", {"number?", k}}
      _g1035 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g935, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1035})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local _g937 = unstash({...})
    local body = sub(_g937, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g938 = bind(lh, rh)
      local _g939 = 0
      while _g939 < length(_g938) do
        local _g940 = _g938[_g939 + 1]
        local id = _g940[1]
        local val = _g940[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g939 = _g939 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _g942 = unstash({...})
    local body = sub(_g942, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g943 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g943)
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _g945 = unstash({...})
    local bs = sub(_g945, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _g946 = unstash({...})
    local body = sub(_g946, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(body) then
      local _g947 = bind42(x, body)
      local args = _g947[1]
      local _g948 = _g947[2]
      return(join({"%global-function", name, args}, _g948))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g949 = xs
    local _g950 = 0
    while _g950 < length(_g949) do
      local x = _g949[_g950 + 1]
      l[x] = true
      _g950 = _g950 + 1
    end
    return(join({"table"}, l))
  end}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _g951 = unstash({...})
    local body = sub(_g951, 0)
    add(environment, {})
    map(function (_g954)
      local name = _g954[1]
      local exp = _g954[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g952 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g952)
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, unless = {export = true, macro = function (cond, ...)
    local _g956 = unstash({...})
    local body = sub(_g956, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, fn = {export = true, macro = function (args, ...)
    local _g958 = unstash({...})
    local body = sub(_g958, 0)
    local _g959 = bind42(args, body)
    local _g960 = _g959[1]
    local _g961 = _g959[2]
    return(join({"%function", _g960}, _g961))
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
      local _g963 = body
      local k = nil
      for k in next, _g963 do
        if not number63(k) then
          local v = _g963[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _g964 = unstash({...})
    local bs = sub(_g964, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, all = {export = true, macro = function (_g967, t, ...)
    local k = _g967[1]
    local v = _g967[2]
    local _g966 = unstash({...})
    local body = sub(_g966, 0)
    local x = make_id()
    local n = make_id()
    local _g1037
    if target == "lua" then
      _g1037 = body
    else
      _g1037 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1037)}})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _g969 = unstash({...})
    local body = sub(_g969, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _g970 = import_modules(imp)
    local imports = _g970[1]
    local bindings = _g970[2]
    local k = module_key(spec)
    modules[k] = {export = {}, alias = alias, import = imports}
    local _g971 = exp or {}
    local _g972 = 0
    while _g972 < length(_g971) do
      local x = _g971[_g972 + 1]
      setenv(x, {_stash = true, export = true})
      _g972 = _g972 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _g974 = unstash({...})
    local body = sub(_g974, 0)
    local form = join({"fn", args}, body)
    local _g975 = {"setenv", {"quote", name}}
    _g975.macro = form
    _g975.form = {"quote", form}
    eval(_g975)
    return(nil)
  end}, ["with-bindings"] = {export = true, macro = function (_g977, ...)
    local names = _g977[1]
    local _g976 = unstash({...})
    local body = sub(_g976, 0)
    local x = make_id()
    local _g979 = {"setenv", x}
    _g979.variable = true
    local _g978 = {"with-frame", {"each", {x}, names, _g979}}
    _g978.scope = true
    return(join(_g978, body))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, when = {export = true, macro = function (cond, ...)
    local _g982 = unstash({...})
    local body = sub(_g982, 0)
    return({"if", cond, join({"do"}, body)})
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g984)
      local a = _g984[1]
      local b = _g984[2]
      local c = sub(_g984, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local _g986 = unstash({...})
    local body = sub(_g986, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g987 = bind42(x, body)
        local args = _g987[1]
        local _g988 = _g987[2]
        return(link(name, join({"%local-function", name, args}, _g988)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _g989 = unstash({...})
    local scope = _g989.scope
    local body = sub(_g989, 0)
    local x = make_id()
    local _g990 = {"table"}
    _g990._scope = scope
    return({"do", {"add", "environment", _g990}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _g991 = unstash({...})
    local body = sub(_g991, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g992 = {"setenv", {"quote", name}}
    _g992.form = {"quote", form}
    _g992.special = form
    eval(join(_g992, keys))
    return(nil)
  end}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%function"] = {foo = true, special = function (args, body)
    return(compile_function(args, body))
  end, export = true}, set = {export = true, special = function (lh, rh)
    local _g995 = compile(lh)
    local _g1038
    if nil63(rh) then
      _g1038 = "nil"
    else
      _g1038 = rh
    end
    local _g996 = compile(_g1038)
    return(indentation() .. _g995 .. " = " .. _g996)
  end, stmt = true, foo = true}, ["while"] = {export = true, stmt = true, foo = true, special = function (cond, form)
    local _g998 = compile(cond)
    indent_level = indent_level + 1
    local _g999 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g999
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g998 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g998 .. " do\n" .. body .. ind .. "end\n")
    end
  end, tr = true}, ["%object"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g1039
    if target == "lua" then
      _g1039 = " = "
    else
      _g1039 = ": "
    end
    local sep = _g1039
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g1000 = pairs
    local i = 0
    while i < length(_g1000) do
      local _g1001 = _g1000[i + 1]
      local k = _g1001[1]
      local v = _g1001[2]
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
  end, export = true}, ["%local"] = {export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g1040
    if is63(value) then
      _g1040 = " = " .. value1
    else
      _g1040 = ""
    end
    local rh = _g1040
    local _g1041
    if target == "js" then
      _g1041 = "var "
    else
      _g1041 = "local "
    end
    local keyword = _g1041
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true, foo = true}, ["%try"] = {export = true, stmt = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1004 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1004
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g1005 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g1005
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, tr = true}, ["break"] = {export = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true, foo = true}, ["return"] = {export = true, special = function (x)
    local _g1042
    if nil63(x) then
      _g1042 = "return"
    else
      _g1042 = "return(" .. compile(x) .. ")"
    end
    local _g1008 = _g1042
    return(indentation() .. _g1008)
  end, stmt = true, foo = true}, ["%local-function"] = {export = true, stmt = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, tr = true}, ["%global-function"] = {export = true, stmt = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true}, ["not"] = {}, ["%array"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local _g1043
    if target == "lua" then
      _g1043 = "{"
    else
      _g1043 = "["
    end
    local open = _g1043
    local _g1044
    if target == "lua" then
      _g1044 = "}"
    else
      _g1044 = "]"
    end
    local close = _g1044
    local str = ""
    local _g1011 = forms
    local i = 0
    while i < length(_g1011) do
      local x = _g1011[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, export = true}, ["do"] = {export = true, stmt = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g1012 = forms
    local _g1013 = 0
    while _g1013 < length(_g1012) do
      local x = _g1012[_g1013 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g1013 = _g1013 + 1
    end
    return(str)
  end, tr = true}, ["%for"] = {export = true, stmt = true, foo = true, special = function (t, k, form)
    local _g1015 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1016 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1016
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g1015 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g1015 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, tr = true}, get = {foo = true, special = function (t, k)
    local _g1018 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g1018, 0) == "{" then
      _g1018 = "(" .. _g1018 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g1018 .. "." .. inner(k))
    else
      return(_g1018 .. "[" .. k1 .. "]")
    end
  end, export = true}, error = {export = true, special = function (x)
    local _g1045
    if target == "js" then
      _g1045 = "throw new " .. compile({"Error", x})
    else
      _g1045 = "error(" .. compile(x) .. ")"
    end
    local e = _g1045
    return(indentation() .. e)
  end, stmt = true, foo = true}, ["%if"] = {export = true, stmt = true, foo = true, special = function (cond, cons, alt)
    local _g1021 = compile(cond)
    indent_level = indent_level + 1
    local _g1023 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g1022 = _g1023
    local _g1046
    if alt then
      indent_level = indent_level + 1
      local _g1025 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1046 = _g1025
    end
    local _g1024 = _g1046
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g1021 .. ") {\n" .. _g1022 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g1021 .. " then\n" .. _g1022
    end
    if _g1024 and target == "js" then
      str = str .. " else {\n" .. _g1024 .. ind .. "}"
    else
      if _g1024 then
        str = str .. ind .. "else\n" .. _g1024
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, tr = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["-"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, tl = {export = true, variable = true}, ["%"] = {export = true, variable = true}, hd = {export = true, variable = true}, pair = {export = true, variable = true}, ["="] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, length = {export = true, variable = true}, ["id-count"] = {variable = true}, ["none?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, char = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, join = {export = true, variable = true}, substring = {export = true, variable = true}, today = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, series = {export = true, variable = true}, exit = {export = true, variable = true}, find = {export = true, variable = true}, keys = {export = true, variable = true}, write = {export = true, variable = true}, search = {export = true, variable = true}, sort = {export = true, variable = true}, inner = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, keep = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, split = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, reverse = {export = true, variable = true}, sub = {export = true, variable = true}, cat = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, stash = {export = true, variable = true}, shift = {variable = true}, setenv = {export = true, variable = true}, module = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, last = {export = true, variable = true}, apply = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, add = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, map = {export = true, variable = true}, now = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, code = {export = true, variable = true}, replicate = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, reduce = {export = true, variable = true}, iterate = {export = true, variable = true}, unstash = {export = true, variable = true}, [">="] = {export = true, variable = true}, drop = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {export = true, global = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {run = {variable = true}, ["unary?"] = {variable = true}, ["lower-statement"] = {variable = true}, ["can-return?"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-call"] = {variable = true}, infix = {variable = true}, ["module-path"] = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-atom"] = {variable = true}, lower = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["lower-body"] = {variable = true}, ["load-module"] = {export = true, variable = true}, eval = {export = true, variable = true}, ["%result"] = {export = true, global = true}, reimported = {variable = true}, ["compile-args"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-infix?"] = {variable = true}, terminator = {variable = true}, ["compile-call"] = {variable = true}, ["compiling?"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["lower-special"] = {variable = true}, ["compile-file"] = {variable = true}, encapsulate = {variable = true}, ["in-module"] = {export = true, variable = true}, conclude = {variable = true}, process = {variable = true}, ["lower-infix"] = {variable = true}, ["compile-special"] = {variable = true}, declare = {export = true, variable = true}, ["compiler-output"] = {variable = true}, ["lower-for"] = {variable = true}, ["infix?"] = {variable = true}, ["lower-definition"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["op-delims"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-while"] = {variable = true}, compile = {export = true, variable = true}, ["current-module"] = {export = true, global = true}, ["lower-do"] = {variable = true}, getop = {variable = true}, ["lower-if"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["%compile-module"] = {variable = true}, precedence = {variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {link = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, id = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, index = {variable = true}, imported = {export = true, variable = true}, key = {export = true, variable = true}, literal = {variable = true}, ["quote-module"] = {variable = true}, exclude = {variable = true}, ["quote-frame"] = {variable = true}, ["reserved?"] = {export = true, variable = true}, ["quote-binding"] = {variable = true}, extend = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, reserved = {variable = true}, ["special?"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, indentation = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, ["global?"] = {variable = true}, ["quasisplice?"] = {variable = true}, mapo = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, ["macro-function"] = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, getenv = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, escape = {variable = true}, ["bind*"] = {export = true, variable = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {delimiters = {variable = true}, ["skip-non-code"] = {variable = true}, ["flag?"] = {variable = true}, read = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g1030, ...)
    local char = _g1030[1]
    local stream = _g1030[2]
    local _g1029 = unstash({...})
    local body = sub(_g1029, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, eof = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["key?"] = {variable = true}, ["read-table"] = {export = true, variable = true}, whitespace = {variable = true}, ["read-all"] = {export = true, variable = true}}}, lumen = {export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, import = {{"lumen", "special"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _g1031 = unstash({...})
    local body = sub(_g1031, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _g1032 = import_modules(imp)
    local imports = _g1032[1]
    local bindings = _g1032[2]
    local k = module_key(spec)
    modules[k] = {export = {}, alias = alias, import = imports}
    local _g1033 = exp or {}
    local _g1034 = 0
    while _g1034 < length(_g1033) do
      local x = _g1033[_g1034 + 1]
      setenv(x, {_stash = true, export = true})
      _g1034 = _g1034 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g1047 = nexus["lumen/runtime"]
  local _ = _g1047["-"]
  local _43 = _g1047["+"]
  local _42 = _g1047["*"]
  local tl = _g1047.tl
  local _37 = _g1047["%"]
  local hd = _g1047.hd
  local pair = _g1047.pair
  local _61 = _g1047["="]
  local _60 = _g1047["<"]
  local _37message_handler = _g1047["%message-handler"]
  local _47 = _g1047["/"]
  local length = _g1047.length
  local none63 = _g1047["none?"]
  local table63 = _g1047["table?"]
  local module_key = _g1047["module-key"]
  local toplevel63 = _g1047["toplevel?"]
  local char = _g1047.char
  local _62 = _g1047[">"]
  local id_literal63 = _g1047["id-literal?"]
  local list63 = _g1047["list?"]
  local string_literal63 = _g1047["string-literal?"]
  local join = _g1047.join
  local substring = _g1047.substring
  local today = _g1047.today
  local one63 = _g1047["one?"]
  local series = _g1047.series
  local exit = _g1047.exit
  local find = _g1047.find
  local keys = _g1047.keys
  local write = _g1047.write
  local search = _g1047.search
  local sort = _g1047.sort
  local inner = _g1047.inner
  local keys63 = _g1047["keys?"]
  local keep = _g1047.keep
  local composite63 = _g1047["composite?"]
  local split = _g1047.split
  local in63 = _g1047["in?"]
  local reverse = _g1047.reverse
  local sub = _g1047.sub
  local cat = _g1047.cat
  local some63 = _g1047["some?"]
  local stash = _g1047.stash
  local setenv = _g1047.setenv
  local module = _g1047.module
  local make_id = _g1047["make-id"]
  local last = _g1047.last
  local apply = _g1047.apply
  local number63 = _g1047["number?"]
  local string = _g1047.string
  local space = _g1047.space
  local add = _g1047.add
  local atom63 = _g1047["atom?"]
  local string63 = _g1047["string?"]
  local number = _g1047.number
  local empty63 = _g1047["empty?"]
  local map = _g1047.map
  local now = _g1047.now
  local boolean63 = _g1047["boolean?"]
  local function63 = _g1047["function?"]
  local read_file = _g1047["read-file"]
  local code = _g1047.code
  local replicate = _g1047.replicate
  local write_file = _g1047["write-file"]
  local _6061 = _g1047["<="]
  local reduce = _g1047.reduce
  local iterate = _g1047.iterate
  local unstash = _g1047.unstash
  local _6261 = _g1047[">="]
  local drop = _g1047.drop
  local nil63 = _g1047["nil?"]
  local is63 = _g1047["is?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local _ = _g2["-"]
  local _43 = _g2["+"]
  local _42 = _g2["*"]
  local tl = _g2.tl
  local _37 = _g2["%"]
  local hd = _g2.hd
  local pair = _g2.pair
  local _61 = _g2["="]
  local _60 = _g2["<"]
  local _37message_handler = _g2["%message-handler"]
  local reduce = _g2.reduce
  local length = _g2.length
  local none63 = _g2["none?"]
  local table63 = _g2["table?"]
  local setenv = _g2.setenv
  local toplevel63 = _g2["toplevel?"]
  local unstash = _g2.unstash
  local space = _g2.space
  local apply = _g2.apply
  local list63 = _g2["list?"]
  local string_literal63 = _g2["string-literal?"]
  local join = _g2.join
  local substring = _g2.substring
  local today = _g2.today
  local one63 = _g2["one?"]
  local series = _g2.series
  local exit = _g2.exit
  local find = _g2.find
  local keys = _g2.keys
  local write = _g2.write
  local search = _g2.search
  local sort = _g2.sort
  local inner = _g2.inner
  local keys63 = _g2["keys?"]
  local keep = _g2.keep
  local composite63 = _g2["composite?"]
  local split = _g2.split
  local in63 = _g2["in?"]
  local reverse = _g2.reverse
  local cat = _g2.cat
  local some63 = _g2["some?"]
  local stash = _g2.stash
  local _62 = _g2[">"]
  local code = _g2.code
  local make_id = _g2["make-id"]
  local function63 = _g2["function?"]
  local last = _g2.last
  local string63 = _g2["string?"]
  local number63 = _g2["number?"]
  local string = _g2.string
  local sub = _g2.sub
  local add = _g2.add
  local atom63 = _g2["atom?"]
  local _6061 = _g2["<="]
  local number = _g2.number
  local _47 = _g2["/"]
  local char = _g2.char
  local module_key = _g2["module-key"]
  local module = _g2.module
  local map = _g2.map
  local read_file = _g2["read-file"]
  local now = _g2.now
  local replicate = _g2.replicate
  local empty63 = _g2["empty?"]
  local id_literal63 = _g2["id-literal?"]
  local write_file = _g2["write-file"]
  local iterate = _g2.iterate
  local boolean63 = _g2["boolean?"]
  local _6261 = _g2[">="]
  local drop = _g2.drop
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local _g5 = nexus["lumen/reader"]
  local read_all = _g5["read-all"]
  local make_stream = _g5["make-stream"]
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local compile = _g6.compile
  local compile_module = _g6["compile-module"]
  local load_module = _g6["load-module"]
  local eval = _g6.eval
  local compile_function = _g6["compile-function"]
  local import_modules = _g6["import-modules"]
  local declare = _g6.declare
  local open_module = _g6["open-module"]
  local in_module = _g6["in-module"]
  local function rep(str)
    local _g1052,_g1053 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g1051 = {_g1052, _g1053}
    local _g1 = _g1051[1]
    local x = _g1051[2]
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
    local _g1059 = args
    local i = 0
    while i < length(_g1059) do
      local arg = _g1059[i + 1]
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
