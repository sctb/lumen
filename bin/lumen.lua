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
  local nil63 = _g149["nil?"]
  local is63 = _g149["is?"]
  local length = _g149.length
  local none63 = _g149["none?"]
  local some63 = _g149["some?"]
  local one63 = _g149["one?"]
  local hd = _g149.hd
  local string63 = _g149["string?"]
  local number63 = _g149["number?"]
  local boolean63 = _g149["boolean?"]
  local function63 = _g149["function?"]
  local composite63 = _g149["composite?"]
  local atom63 = _g149["atom?"]
  local table63 = _g149["table?"]
  local list63 = _g149["list?"]
  local substring = _g149.substring
  local sub = _g149.sub
  local keys = _g149.keys
  local inner = _g149.inner
  local tl = _g149.tl
  local char = _g149.char
  local code = _g149.code
  local string_literal63 = _g149["string-literal?"]
  local id_literal63 = _g149["id-literal?"]
  local add = _g149.add
  local drop = _g149.drop
  local last = _g149.last
  local reverse = _g149.reverse
  local join = _g149.join
  local reduce = _g149.reduce
  local keep = _g149.keep
  local in63 = _g149["in?"]
  local find = _g149.find
  local pair = _g149.pair
  local sort = _g149.sort
  local iterate = _g149.iterate
  local replicate = _g149.replicate
  local series = _g149.series
  local map = _g149.map
  local keys63 = _g149["keys?"]
  local empty63 = _g149["empty?"]
  local stash = _g149.stash
  local unstash = _g149.unstash
  local search = _g149.search
  local split = _g149.split
  local cat = _g149.cat
  local _43 = _g149["+"]
  local _ = _g149["-"]
  local _42 = _g149["*"]
  local _47 = _g149["/"]
  local _37 = _g149["%"]
  local _62 = _g149[">"]
  local _60 = _g149["<"]
  local _61 = _g149["="]
  local _6261 = _g149[">="]
  local _6061 = _g149["<="]
  local read_file = _g149["read-file"]
  local write_file = _g149["write-file"]
  local write = _g149.write
  local exit = _g149.exit
  local today = _g149.today
  local now = _g149.now
  local number = _g149.number
  local string = _g149.string
  local space = _g149.space
  local apply = _g149.apply
  local make_id = _g149["make-id"]
  local _37message_handler = _g149["%message-handler"]
  local toplevel63 = _g149["toplevel?"]
  local module_key = _g149["module-key"]
  local module = _g149.module
  local setenv = _g149.setenv
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
      local _g237
      if c == "\n" then
        _g237 = "\\n"
      else
        local _g238
        if c == "\"" then
          _g238 = "\\\""
        else
          local _g239
          if c == "\\" then
            _g239 = "\\\\"
          else
            _g239 = c
          end
          _g238 = _g239
        end
        _g237 = _g238
      end
      local c1 = _g237
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
          local _g240
          if k == "&" then
            _g240 = {"sub", rh, length(lh)}
          else
            _g240 = {"get", rh, {"quote", index(k)}}
          end
          local x = _g240
          local _g241
          if v == true then
            _g241 = k
          else
            _g241 = v
          end
          local _g175 = _g241
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
      if not number63(k) then
        local v = _g197[k]
        local _g242
        if quasisplice63(v, depth) then
          _g242 = quasiexpand(v[2])
        else
          _g242 = quasiexpand(v, depth)
        end
        local _g198 = _g242
        last(xs)[k] = _g198
      end
    end
    local _g199 = form
    local _g200 = 0
    while _g200 < length(_g199) do
      local x = _g199[_g200 + 1]
      if quasisplice63(x, depth) then
        local _g201 = quasiexpand(x[2])
        add(xs, _g201)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g200 = _g200 + 1
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
      local _g243
      if c == "-" then
        _g243 = "_"
      else
        local _g244
        if valid_code63(n) then
          _g244 = c
        else
          local _g245
          if i == 0 then
            _g245 = "_" .. n
          else
            _g245 = n
          end
          _g244 = _g245
        end
        _g243 = _g244
      end
      local c1 = _g243
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
    local _g219 = _g218.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g220 = module(spec).export
      local n = nil
      for n in next, _g220 do
        if not number63(n) then
          local b = _g220[n]
          if b.variable and (_g219 or b.export) then
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
    local _g222 = unstash({...})
    local xs = sub(_g222, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g223 = unstash({...})
    local keys = sub(_g223, 0)
    local t1 = {}
    local _g224 = t
    local _g225 = 0
    while _g225 < length(_g224) do
      local x = _g224[_g225 + 1]
      add(t1, x)
      _g225 = _g225 + 1
    end
    local _g226 = t
    local k = nil
    for k in next, _g226 do
      if not number63(k) then
        local v = _g226[k]
        if not keys[k] then
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
    local _g229 = t
    local k = nil
    for k in next, _g229 do
      if not number63(k) then
        local v = _g229[k]
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
    local _g234 = {"table"}
    _g234.import = quoted(m.import)
    _g234.alias = quoted(m.alias)
    _g234.export = quote_frame(m.export)
    return(_g234)
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
  local _g246 = nexus["lumen/runtime"]
  local nil63 = _g246["nil?"]
  local is63 = _g246["is?"]
  local length = _g246.length
  local none63 = _g246["none?"]
  local some63 = _g246["some?"]
  local one63 = _g246["one?"]
  local hd = _g246.hd
  local string63 = _g246["string?"]
  local number63 = _g246["number?"]
  local boolean63 = _g246["boolean?"]
  local function63 = _g246["function?"]
  local composite63 = _g246["composite?"]
  local atom63 = _g246["atom?"]
  local table63 = _g246["table?"]
  local list63 = _g246["list?"]
  local substring = _g246.substring
  local sub = _g246.sub
  local keys = _g246.keys
  local inner = _g246.inner
  local tl = _g246.tl
  local char = _g246.char
  local code = _g246.code
  local string_literal63 = _g246["string-literal?"]
  local id_literal63 = _g246["id-literal?"]
  local add = _g246.add
  local drop = _g246.drop
  local last = _g246.last
  local reverse = _g246.reverse
  local join = _g246.join
  local reduce = _g246.reduce
  local keep = _g246.keep
  local in63 = _g246["in?"]
  local find = _g246.find
  local pair = _g246.pair
  local sort = _g246.sort
  local iterate = _g246.iterate
  local replicate = _g246.replicate
  local series = _g246.series
  local map = _g246.map
  local keys63 = _g246["keys?"]
  local empty63 = _g246["empty?"]
  local stash = _g246.stash
  local unstash = _g246.unstash
  local search = _g246.search
  local split = _g246.split
  local cat = _g246.cat
  local _43 = _g246["+"]
  local _ = _g246["-"]
  local _42 = _g246["*"]
  local _47 = _g246["/"]
  local _37 = _g246["%"]
  local _62 = _g246[">"]
  local _60 = _g246["<"]
  local _61 = _g246["="]
  local _6261 = _g246[">="]
  local _6061 = _g246["<="]
  local read_file = _g246["read-file"]
  local write_file = _g246["write-file"]
  local write = _g246.write
  local exit = _g246.exit
  local today = _g246.today
  local now = _g246.now
  local number = _g246.number
  local string = _g246.string
  local space = _g246.space
  local apply = _g246.apply
  local make_id = _g246["make-id"]
  local _37message_handler = _g246["%message-handler"]
  local toplevel63 = _g246["toplevel?"]
  local module_key = _g246["module-key"]
  local module = _g246.module
  local setenv = _g246.setenv
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
  local _g275 = nexus["lumen/runtime"]
  local nil63 = _g275["nil?"]
  local is63 = _g275["is?"]
  local length = _g275.length
  local none63 = _g275["none?"]
  local some63 = _g275["some?"]
  local one63 = _g275["one?"]
  local hd = _g275.hd
  local string63 = _g275["string?"]
  local number63 = _g275["number?"]
  local boolean63 = _g275["boolean?"]
  local function63 = _g275["function?"]
  local composite63 = _g275["composite?"]
  local atom63 = _g275["atom?"]
  local table63 = _g275["table?"]
  local list63 = _g275["list?"]
  local substring = _g275.substring
  local sub = _g275.sub
  local keys = _g275.keys
  local inner = _g275.inner
  local tl = _g275.tl
  local char = _g275.char
  local code = _g275.code
  local string_literal63 = _g275["string-literal?"]
  local id_literal63 = _g275["id-literal?"]
  local add = _g275.add
  local drop = _g275.drop
  local last = _g275.last
  local reverse = _g275.reverse
  local join = _g275.join
  local reduce = _g275.reduce
  local keep = _g275.keep
  local in63 = _g275["in?"]
  local find = _g275.find
  local pair = _g275.pair
  local sort = _g275.sort
  local iterate = _g275.iterate
  local replicate = _g275.replicate
  local series = _g275.series
  local map = _g275.map
  local keys63 = _g275["keys?"]
  local empty63 = _g275["empty?"]
  local stash = _g275.stash
  local unstash = _g275.unstash
  local search = _g275.search
  local split = _g275.split
  local cat = _g275.cat
  local _43 = _g275["+"]
  local _ = _g275["-"]
  local _42 = _g275["*"]
  local _47 = _g275["/"]
  local _37 = _g275["%"]
  local _62 = _g275[">"]
  local _60 = _g275["<"]
  local _61 = _g275["="]
  local _6261 = _g275[">="]
  local _6061 = _g275["<="]
  local read_file = _g275["read-file"]
  local write_file = _g275["write-file"]
  local write = _g275.write
  local exit = _g275.exit
  local today = _g275.today
  local now = _g275.now
  local number = _g275.number
  local string = _g275.string
  local space = _g275.space
  local apply = _g275.apply
  local make_id = _g275["make-id"]
  local _37message_handler = _g275["%message-handler"]
  local toplevel63 = _g275["toplevel?"]
  local module_key = _g275["module-key"]
  local module = _g275.module
  local setenv = _g275.setenv
  local _g278 = nexus["lumen/lib"]
  local getenv = _g278.getenv
  local macro_function = _g278["macro-function"]
  local macro63 = _g278["macro?"]
  local special63 = _g278["special?"]
  local special_form63 = _g278["special-form?"]
  local statement63 = _g278["statement?"]
  local symbol_expansion = _g278["symbol-expansion"]
  local symbol63 = _g278["symbol?"]
  local variable63 = _g278["variable?"]
  local bound63 = _g278["bound?"]
  local quoted = _g278.quoted
  local stash42 = _g278["stash*"]
  local bind = _g278.bind
  local bind42 = _g278["bind*"]
  local quasiexpand = _g278.quasiexpand
  local macroexpand = _g278.macroexpand
  local indentation = _g278.indentation
  local reserved63 = _g278["reserved?"]
  local valid_id63 = _g278["valid-id?"]
  local id = _g278.id
  local key = _g278.key
  local imported = _g278.imported
  local link = _g278.link
  local mapo = _g278.mapo
  local quote_environment = _g278["quote-environment"]
  local quote_modules = _g278["quote-modules"]
  local initial_environment = _g278["initial-environment"]
  local _g279 = nexus["lumen/reader"]
  local make_stream = _g279["make-stream"]
  local read_table = _g279["read-table"]
  local read = _g279.read
  local read_all = _g279["read-all"]
  local read_from_string = _g279["read-from-string"]
  local _g283 = {}
  _g283.js = "!"
  _g283.lua = "not "
  local _g281 = {}
  local _g284 = {}
  _g284.js = "!"
  _g284.lua = "not "
  _g281["not"] = _g284
  local _g286 = {}
  _g286["*"] = true
  _g286["/"] = true
  _g286["%"] = true
  local _g288 = {}
  _g288["+"] = true
  _g288["-"] = true
  local _g292 = {}
  _g292.js = "+"
  _g292.lua = ".."
  local _g290 = {}
  local _g293 = {}
  _g293.js = "+"
  _g293.lua = ".."
  _g290.cat = _g293
  local _g295 = {}
  _g295["<"] = true
  _g295[">"] = true
  _g295["<="] = true
  _g295[">="] = true
  local _g299 = {}
  _g299.js = "==="
  _g299.lua = "=="
  local _g301 = {}
  _g301.js = "!="
  _g301.lua = "~="
  local _g297 = {}
  local _g302 = {}
  _g302.js = "==="
  _g302.lua = "=="
  _g297["="] = _g302
  local _g303 = {}
  _g303.js = "!="
  _g303.lua = "~="
  _g297["~="] = _g303
  local _g307 = {}
  _g307.js = "&&"
  _g307.lua = "and"
  local _g305 = {}
  local _g308 = {}
  _g308.js = "&&"
  _g308.lua = "and"
  _g305["and"] = _g308
  local _g312 = {}
  _g312.js = "||"
  _g312.lua = "or"
  local _g310 = {}
  local _g313 = {}
  _g313.js = "||"
  _g313.lua = "or"
  _g310["or"] = _g313
  local infix = {_g281, _g286, _g288, _g290, _g295, _g297, _g305, _g310}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g316 = infix
      local i = 0
      while i < length(_g316) do
        local level = _g316[i + 1]
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
    local _g321 = args
    local i = 0
    while i < length(_g321) do
      local arg = _g321[i + 1]
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
    local _g325 = getenv(x)
    local special = _g325.special
    local stmt = _g325.stmt
    local self_tr63 = _g325.tr
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
    local _g328 = unstash({...})
    local right = _g328.right
    local _g390
    if right then
      _g390 = _6261
    else
      _g390 = _62
    end
    if _g390(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g330 = sub(form, 1)
    local a = _g330[1]
    local b = _g330[2]
    local _g331 = op_delims(form, a)
    local ao = _g331[1]
    local ac = _g331[2]
    local _g332 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g332[1]
    local bc = _g332[2]
    local _g333 = compile(a)
    local _g334 = compile(b)
    local _g335 = getop(op)
    if unary63(form) then
      return(_g335 .. ao .. _g333 .. ac)
    else
      return(ao .. _g333 .. ac .. " " .. _g335 .. " " .. bo .. _g334 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g336 = unstash({...})
    local name = _g336.name
    local prefix = _g336.prefix
    local _g391
    if name then
      _g391 = compile(name)
    else
      _g391 = ""
    end
    local id = _g391
    local _g337 = prefix or ""
    local _g338 = compile_args(args)
    indent_level = indent_level + 1
    local _g340 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g339 = _g340
    local ind = indentation()
    local _g392
    if target == "js" then
      _g392 = ""
    else
      _g392 = "end"
    end
    local tr = _g392
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g338 .. " {\n" .. _g339 .. ind .. "}" .. tr)
    else
      return(_g337 .. "function " .. id .. _g338 .. "\n" .. _g339 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g342 = unstash({...})
    local stmt = _g342.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g393
        if stmt then
          _g393 = indentation()
        else
          _g393 = ""
        end
        local ind = _g393
        local _g394
        if atom63(form) then
          _g394 = compile_atom(form)
        else
          local _g395
          if infix63(hd(form)) then
            _g395 = compile_infix(form)
          else
            _g395 = compile_call(form)
          end
          _g394 = _g395
        end
        local _g343 = _g394
        return(ind .. _g343 .. tr)
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
    local _g347 = sub(args, 0, length(args) - 1)
    local _g348 = 0
    while _g348 < length(_g347) do
      local x = _g347[_g348 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g348 = _g348 + 1
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
    local _g350 = args[2]
    local _g351 = args[3]
    if stmt63 or tail63 then
      local _g397
      if _g351 then
        _g397 = {lower_body({_g351}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g350}, tail63)}, _g397)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g396
      if _g351 then
        _g396 = {lower({"set", e, _g351})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g350})}, _g396))
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
      local _g398
      if x == "and" then
        _g398 = {"%if", id, b, id}
      else
        _g398 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g398}, hoist))
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
    local _g358 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g358, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g360 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g360) then
      return(_g360)
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
    local _g374 = unstash({...})
    local _g375 = _g374.all
    local m = module(spec)
    local frame = last(environment)
    local _g376 = m.export
    local k = nil
    for k in next, _g376 do
      if not number63(k) then
        local v = _g376[k]
        if v.export or _g375 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g377 = unstash({...})
    local _g378 = _g377.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g378}))
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
    local _g381 = specs or {}
    local _g382 = 0
    while _g382 < length(_g381) do
      local spec = _g381[_g382 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g383 = import_modules(m.alias)
        local aliased = _g383[1]
        local bs = _g383[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g384 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g384)
      end
      _g382 = _g382 + 1
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
  local _g399 = nexus["lumen/runtime"]
  local nil63 = _g399["nil?"]
  local is63 = _g399["is?"]
  local length = _g399.length
  local none63 = _g399["none?"]
  local some63 = _g399["some?"]
  local one63 = _g399["one?"]
  local hd = _g399.hd
  local string63 = _g399["string?"]
  local number63 = _g399["number?"]
  local boolean63 = _g399["boolean?"]
  local function63 = _g399["function?"]
  local composite63 = _g399["composite?"]
  local atom63 = _g399["atom?"]
  local table63 = _g399["table?"]
  local list63 = _g399["list?"]
  local substring = _g399.substring
  local sub = _g399.sub
  local keys = _g399.keys
  local inner = _g399.inner
  local tl = _g399.tl
  local char = _g399.char
  local code = _g399.code
  local string_literal63 = _g399["string-literal?"]
  local id_literal63 = _g399["id-literal?"]
  local add = _g399.add
  local drop = _g399.drop
  local last = _g399.last
  local reverse = _g399.reverse
  local join = _g399.join
  local reduce = _g399.reduce
  local keep = _g399.keep
  local in63 = _g399["in?"]
  local find = _g399.find
  local pair = _g399.pair
  local sort = _g399.sort
  local iterate = _g399.iterate
  local replicate = _g399.replicate
  local series = _g399.series
  local map = _g399.map
  local keys63 = _g399["keys?"]
  local empty63 = _g399["empty?"]
  local stash = _g399.stash
  local unstash = _g399.unstash
  local search = _g399.search
  local split = _g399.split
  local cat = _g399.cat
  local _43 = _g399["+"]
  local _ = _g399["-"]
  local _42 = _g399["*"]
  local _47 = _g399["/"]
  local _37 = _g399["%"]
  local _62 = _g399[">"]
  local _60 = _g399["<"]
  local _61 = _g399["="]
  local _6261 = _g399[">="]
  local _6061 = _g399["<="]
  local read_file = _g399["read-file"]
  local write_file = _g399["write-file"]
  local write = _g399.write
  local exit = _g399.exit
  local today = _g399.today
  local now = _g399.now
  local number = _g399.number
  local string = _g399.string
  local space = _g399.space
  local apply = _g399.apply
  local make_id = _g399["make-id"]
  local _37message_handler = _g399["%message-handler"]
  local toplevel63 = _g399["toplevel?"]
  local module_key = _g399["module-key"]
  local module = _g399.module
  local setenv = _g399.setenv
  local _g402 = nexus["lumen/lib"]
  local getenv = _g402.getenv
  local macro_function = _g402["macro-function"]
  local macro63 = _g402["macro?"]
  local special63 = _g402["special?"]
  local special_form63 = _g402["special-form?"]
  local statement63 = _g402["statement?"]
  local symbol_expansion = _g402["symbol-expansion"]
  local symbol63 = _g402["symbol?"]
  local variable63 = _g402["variable?"]
  local bound63 = _g402["bound?"]
  local quoted = _g402.quoted
  local stash42 = _g402["stash*"]
  local bind = _g402.bind
  local bind42 = _g402["bind*"]
  local quasiexpand = _g402.quasiexpand
  local macroexpand = _g402.macroexpand
  local indentation = _g402.indentation
  local reserved63 = _g402["reserved?"]
  local valid_id63 = _g402["valid-id?"]
  local id = _g402.id
  local key = _g402.key
  local imported = _g402.imported
  local link = _g402.link
  local mapo = _g402.mapo
  local quote_environment = _g402["quote-environment"]
  local quote_modules = _g402["quote-modules"]
  local initial_environment = _g402["initial-environment"]
  local _g403 = nexus["lumen/compiler"]
  local compile_function = _g403["compile-function"]
  local compile = _g403.compile
  local open_module = _g403["open-module"]
  local load_module = _g403["load-module"]
  local in_module = _g403["in-module"]
  local import_modules = _g403["import-modules"]
  local compile_module = _g403["compile-module"]
  local declare = _g403.declare
  local eval = _g403.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g590 = nexus["lumen/runtime"]
  local nil63 = _g590["nil?"]
  local is63 = _g590["is?"]
  local length = _g590.length
  local none63 = _g590["none?"]
  local some63 = _g590["some?"]
  local one63 = _g590["one?"]
  local hd = _g590.hd
  local string63 = _g590["string?"]
  local number63 = _g590["number?"]
  local boolean63 = _g590["boolean?"]
  local function63 = _g590["function?"]
  local composite63 = _g590["composite?"]
  local atom63 = _g590["atom?"]
  local table63 = _g590["table?"]
  local list63 = _g590["list?"]
  local substring = _g590.substring
  local sub = _g590.sub
  local keys = _g590.keys
  local inner = _g590.inner
  local tl = _g590.tl
  local char = _g590.char
  local code = _g590.code
  local string_literal63 = _g590["string-literal?"]
  local id_literal63 = _g590["id-literal?"]
  local add = _g590.add
  local drop = _g590.drop
  local last = _g590.last
  local reverse = _g590.reverse
  local join = _g590.join
  local reduce = _g590.reduce
  local keep = _g590.keep
  local in63 = _g590["in?"]
  local find = _g590.find
  local pair = _g590.pair
  local sort = _g590.sort
  local iterate = _g590.iterate
  local replicate = _g590.replicate
  local series = _g590.series
  local map = _g590.map
  local keys63 = _g590["keys?"]
  local empty63 = _g590["empty?"]
  local stash = _g590.stash
  local unstash = _g590.unstash
  local search = _g590.search
  local split = _g590.split
  local cat = _g590.cat
  local _43 = _g590["+"]
  local _ = _g590["-"]
  local _42 = _g590["*"]
  local _47 = _g590["/"]
  local _37 = _g590["%"]
  local _62 = _g590[">"]
  local _60 = _g590["<"]
  local _61 = _g590["="]
  local _6261 = _g590[">="]
  local _6061 = _g590["<="]
  local read_file = _g590["read-file"]
  local write_file = _g590["write-file"]
  local write = _g590.write
  local exit = _g590.exit
  local today = _g590.today
  local now = _g590.now
  local number = _g590.number
  local string = _g590.string
  local space = _g590.space
  local apply = _g590.apply
  local make_id = _g590["make-id"]
  local _37message_handler = _g590["%message-handler"]
  local toplevel63 = _g590["toplevel?"]
  local module_key = _g590["module-key"]
  local module = _g590.module
  local setenv = _g590.setenv
  local _g593 = nexus["lumen/lib"]
  local getenv = _g593.getenv
  local macro_function = _g593["macro-function"]
  local macro63 = _g593["macro?"]
  local special63 = _g593["special?"]
  local special_form63 = _g593["special-form?"]
  local statement63 = _g593["statement?"]
  local symbol_expansion = _g593["symbol-expansion"]
  local symbol63 = _g593["symbol?"]
  local variable63 = _g593["variable?"]
  local bound63 = _g593["bound?"]
  local quoted = _g593.quoted
  local stash42 = _g593["stash*"]
  local bind = _g593.bind
  local bind42 = _g593["bind*"]
  local quasiexpand = _g593.quasiexpand
  local macroexpand = _g593.macroexpand
  local indentation = _g593.indentation
  local reserved63 = _g593["reserved?"]
  local valid_id63 = _g593["valid-id?"]
  local id = _g593.id
  local key = _g593.key
  local imported = _g593.imported
  local link = _g593.link
  local mapo = _g593.mapo
  local quote_environment = _g593["quote-environment"]
  local quote_modules = _g593["quote-modules"]
  local initial_environment = _g593["initial-environment"]
  local _g594 = nexus["lumen/compiler"]
  local compile_function = _g594["compile-function"]
  local compile = _g594.compile
  local open_module = _g594["open-module"]
  local load_module = _g594["load-module"]
  local in_module = _g594["in-module"]
  local import_modules = _g594["import-modules"]
  local compile_module = _g594["compile-module"]
  local declare = _g594.declare
  local eval = _g594.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g917 = nexus["lumen/runtime"]
  local nil63 = _g917["nil?"]
  local is63 = _g917["is?"]
  local length = _g917.length
  local none63 = _g917["none?"]
  local some63 = _g917["some?"]
  local one63 = _g917["one?"]
  local hd = _g917.hd
  local string63 = _g917["string?"]
  local number63 = _g917["number?"]
  local boolean63 = _g917["boolean?"]
  local function63 = _g917["function?"]
  local composite63 = _g917["composite?"]
  local atom63 = _g917["atom?"]
  local table63 = _g917["table?"]
  local list63 = _g917["list?"]
  local substring = _g917.substring
  local sub = _g917.sub
  local keys = _g917.keys
  local inner = _g917.inner
  local tl = _g917.tl
  local char = _g917.char
  local code = _g917.code
  local string_literal63 = _g917["string-literal?"]
  local id_literal63 = _g917["id-literal?"]
  local add = _g917.add
  local drop = _g917.drop
  local last = _g917.last
  local reverse = _g917.reverse
  local join = _g917.join
  local reduce = _g917.reduce
  local keep = _g917.keep
  local in63 = _g917["in?"]
  local find = _g917.find
  local pair = _g917.pair
  local sort = _g917.sort
  local iterate = _g917.iterate
  local replicate = _g917.replicate
  local series = _g917.series
  local map = _g917.map
  local keys63 = _g917["keys?"]
  local empty63 = _g917["empty?"]
  local stash = _g917.stash
  local unstash = _g917.unstash
  local search = _g917.search
  local split = _g917.split
  local cat = _g917.cat
  local _43 = _g917["+"]
  local _ = _g917["-"]
  local _42 = _g917["*"]
  local _47 = _g917["/"]
  local _37 = _g917["%"]
  local _62 = _g917[">"]
  local _60 = _g917["<"]
  local _61 = _g917["="]
  local _6261 = _g917[">="]
  local _6061 = _g917["<="]
  local read_file = _g917["read-file"]
  local write_file = _g917["write-file"]
  local write = _g917.write
  local exit = _g917.exit
  local today = _g917.today
  local now = _g917.now
  local number = _g917.number
  local string = _g917.string
  local space = _g917.space
  local apply = _g917.apply
  local make_id = _g917["make-id"]
  local _37message_handler = _g917["%message-handler"]
  local toplevel63 = _g917["toplevel?"]
  local module_key = _g917["module-key"]
  local module = _g917.module
  local setenv = _g917.setenv
  local _g920 = nexus["lumen/lib"]
  local getenv = _g920.getenv
  local macro_function = _g920["macro-function"]
  local macro63 = _g920["macro?"]
  local special63 = _g920["special?"]
  local special_form63 = _g920["special-form?"]
  local statement63 = _g920["statement?"]
  local symbol_expansion = _g920["symbol-expansion"]
  local symbol63 = _g920["symbol?"]
  local variable63 = _g920["variable?"]
  local bound63 = _g920["bound?"]
  local quoted = _g920.quoted
  local stash42 = _g920["stash*"]
  local bind = _g920.bind
  local bind42 = _g920["bind*"]
  local quasiexpand = _g920.quasiexpand
  local macroexpand = _g920.macroexpand
  local indentation = _g920.indentation
  local reserved63 = _g920["reserved?"]
  local valid_id63 = _g920["valid-id?"]
  local id = _g920.id
  local key = _g920.key
  local imported = _g920.imported
  local link = _g920.link
  local mapo = _g920.mapo
  local quote_environment = _g920["quote-environment"]
  local quote_modules = _g920["quote-modules"]
  local initial_environment = _g920["initial-environment"]
  local _g921 = nexus["lumen/compiler"]
  local compile_function = _g921["compile-function"]
  local compile = _g921.compile
  local open_module = _g921["open-module"]
  local load_module = _g921["load-module"]
  local in_module = _g921["in-module"]
  local import_modules = _g921["import-modules"]
  local compile_module = _g921["compile-module"]
  local declare = _g921.declare
  local eval = _g921.eval
  modules = {lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g936 = forms
    local _g937 = 0
    while _g937 < length(_g936) do
      local x = _g936[_g937 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g937 = _g937 + 1
    end
    return(str)
  end, foo = true, tr = true, stmt = true}, ["%if"] = {export = true, special = function (cond, cons, alt)
    local _g939 = compile(cond)
    indent_level = indent_level + 1
    local _g941 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g940 = _g941
    local _g1037
    if alt then
      indent_level = indent_level + 1
      local _g943 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1037 = _g943
    end
    local _g942 = _g1037
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g939 .. ") {\n" .. _g940 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g939 .. " then\n" .. _g940
    end
    if _g942 and target == "js" then
      str = str .. " else {\n" .. _g942 .. ind .. "}"
    else
      if _g942 then
        str = str .. ind .. "else\n" .. _g942
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, foo = true, tr = true, stmt = true}, ["while"] = {export = true, special = function (cond, form)
    local _g945 = compile(cond)
    indent_level = indent_level + 1
    local _g946 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g946
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g945 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g945 .. " do\n" .. body .. ind .. "end\n")
    end
  end, foo = true, tr = true, stmt = true}, ["%for"] = {export = true, special = function (t, k, form)
    local _g948 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g949 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g949
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g948 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g948 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, foo = true, tr = true, stmt = true}, ["%try"] = {export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g951 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g951
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g952 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g952
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, foo = true, tr = true, stmt = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, foo = true, export = true, stmt = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, foo = true, export = true}, ["%global-function"] = {export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, foo = true, tr = true, stmt = true}, ["%local-function"] = {export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, foo = true, tr = true, stmt = true}, ["return"] = {special = function (x)
    local _g1038
    if nil63(x) then
      _g1038 = "return"
    else
      _g1038 = "return(" .. compile(x) .. ")"
    end
    local _g958 = _g1038
    return(indentation() .. _g958)
  end, foo = true, export = true, stmt = true}, error = {special = function (x)
    local _g1039
    if target == "js" then
      _g1039 = "throw new " .. compile({"Error", x})
    else
      _g1039 = "error(" .. compile(x) .. ")"
    end
    local e = _g1039
    return(indentation() .. e)
  end, foo = true, export = true, stmt = true}, ["%local"] = {special = function (name, value)
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
  end, foo = true, export = true, stmt = true}, set = {special = function (lh, rh)
    local _g962 = compile(lh)
    local _g1042
    if nil63(rh) then
      _g1042 = "nil"
    else
      _g1042 = rh
    end
    local _g963 = compile(_g1042)
    return(indentation() .. _g962 .. " = " .. _g963)
  end, foo = true, export = true, stmt = true}, get = {special = function (t, k)
    local _g965 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g965, 0) == "{" then
      _g965 = "(" .. _g965 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g965 .. "." .. inner(k))
    else
      return(_g965 .. "[" .. k1 .. "]")
    end
  end, foo = true, export = true}, ["not"] = {}, ["%array"] = {special = function (...)
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
    local _g966 = forms
    local i = 0
    while i < length(_g966) do
      local x = _g966[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, foo = true, export = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g1045
    if target == "lua" then
      _g1045 = " = "
    else
      _g1045 = ": "
    end
    local sep = _g1045
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g967 = pairs
    local i = 0
    while i < length(_g967) do
      local _g968 = _g967[i + 1]
      local k = _g968[1]
      local v = _g968[2]
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
  end, foo = true, export = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, index = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g971, ...)
    local char = _g971[1]
    local stream = _g971[2]
    local _g970 = unstash({...})
    local body = sub(_g970, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, keys = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {macro = function (form)
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
      local _g977 = body
      local k = nil
      for k in next, _g977 do
        if not number63(k) then
          local v = _g977[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g979)
      local a = _g979[1]
      local b = _g979[2]
      local c = sub(_g979, 2)
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
    local _g980 = unstash({...})
    local body = sub(_g980, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}, unless = {macro = function (cond, ...)
    local _g981 = unstash({...})
    local body = sub(_g981, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local _g983 = unstash({...})
    local body = sub(_g983, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g984 = bind(lh, rh)
      local _g985 = 0
      while _g985 < length(_g984) do
        local _g986 = _g984[_g985 + 1]
        local id = _g986[1]
        local val = _g986[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g985 = _g985 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local _g987 = unstash({...})
    local body = sub(_g987, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g988 = import_modules(imp)
    local imports = _g988[1]
    local bindings = _g988[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g989 = exp or {}
    local _g990 = 0
    while _g990 < length(_g989) do
      local x = _g989[_g990 + 1]
      setenv(x, {_stash = true, export = true})
      _g990 = _g990 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _g991 = unstash({...})
    local body = sub(_g991, 0)
    local form = join({"fn", args}, body)
    local _g992 = {"setenv", {"quote", name}}
    _g992.macro = form
    _g992.form = {"quote", form}
    eval(_g992)
    return(nil)
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _g993 = unstash({...})
    local body = sub(_g993, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g994 = {"setenv", {"quote", name}}
    _g994.special = form
    _g994.form = {"quote", form}
    eval(join(_g994, keys))
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local _g996 = unstash({...})
    local body = sub(_g996, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g997 = bind42(x, body)
      local args = _g997[1]
      local _g998 = _g997[2]
      return(join({"%global-function", name, args}, _g998))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, define = {macro = function (name, x, ...)
    local _g999 = unstash({...})
    local body = sub(_g999, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g1000 = bind42(x, body)
        local args = _g1000[1]
        local _g1001 = _g1000[2]
        return(link(name, join({"%local-function", name, args}, _g1001)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["with-bindings"] = {macro = function (_g1004, ...)
    local names = _g1004[1]
    local _g1003 = unstash({...})
    local body = sub(_g1003, 0)
    local x = make_id()
    local _g1006 = {"setenv", x}
    _g1006.variable = true
    local _g1005 = {"with-frame", {"each", {x}, names, _g1006}}
    _g1005.scope = true
    return(join(_g1005, body))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _g1007 = unstash({...})
    local body = sub(_g1007, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g1008 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1008)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local _g1010 = unstash({...})
    local body = sub(_g1010, 0)
    add(environment, {})
    map(function (_g1013)
      local name = _g1013[1]
      local exp = _g1013[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g1011 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1011)
  end, export = true}, fn = {macro = function (args, ...)
    local _g1014 = unstash({...})
    local body = sub(_g1014, 0)
    local _g1015 = bind42(args, body)
    local _g1016 = _g1015[1]
    local _g1017 = _g1015[2]
    return(join({"%function", _g1016}, _g1017))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, all = {macro = function (_g1020, t, ...)
    local k = _g1020[1]
    local v = _g1020[2]
    local _g1019 = unstash({...})
    local body = sub(_g1019, 0)
    local x = make_id()
    local n = make_id()
    local _g1046
    if target == "lua" then
      _g1046 = body
    else
      _g1046 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1046)}})
  end, export = true}, each = {macro = function (b, t, ...)
    local _g1021 = unstash({...})
    local body = sub(_g1021, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g1047
    if nil63(v) then
      local _g1048
      if b.i then
        _g1048 = "i"
      else
        _g1048 = make_id()
      end
      local i = _g1048
      _g1047 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g1022 = {"target"}
      _g1022.js = {"isNaN", {"parseInt", k}}
      _g1022.lua = {"not", {"number?", k}}
      _g1047 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g1022, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1047})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g1023 = xs
    local _g1024 = 0
    while _g1024 < length(_g1023) do
      local x = _g1023[_g1024 + 1]
      l[x] = true
      _g1024 = _g1024 + 1
    end
    return(join({"table"}, l))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, global = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local _g1027 = unstash({...})
    local bs = sub(_g1027, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _g1028 = unstash({...})
    local bs = sub(_g1028, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _g1031 = unstash({...})
    local body = sub(_g1031, 0)
    local scope = _g1031.scope
    local x = make_id()
    local _g1032 = {"table"}
    _g1032._scope = scope
    return({"do", {"add", "environment", _g1032}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _g1033 = unstash({...})
    local body = sub(_g1033, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1034 = import_modules(imp)
    local imports = _g1034[1]
    local bindings = _g1034[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1035 = exp or {}
    local _g1036 = 0
    while _g1036 < length(_g1035) do
      local x = _g1035[_g1036 + 1]
      setenv(x, {_stash = true, export = true})
      _g1036 = _g1036 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g1049 = nexus["lumen/runtime"]
  local nil63 = _g1049["nil?"]
  local is63 = _g1049["is?"]
  local length = _g1049.length
  local none63 = _g1049["none?"]
  local some63 = _g1049["some?"]
  local one63 = _g1049["one?"]
  local hd = _g1049.hd
  local string63 = _g1049["string?"]
  local number63 = _g1049["number?"]
  local boolean63 = _g1049["boolean?"]
  local function63 = _g1049["function?"]
  local composite63 = _g1049["composite?"]
  local atom63 = _g1049["atom?"]
  local table63 = _g1049["table?"]
  local list63 = _g1049["list?"]
  local substring = _g1049.substring
  local sub = _g1049.sub
  local keys = _g1049.keys
  local inner = _g1049.inner
  local tl = _g1049.tl
  local char = _g1049.char
  local code = _g1049.code
  local string_literal63 = _g1049["string-literal?"]
  local id_literal63 = _g1049["id-literal?"]
  local add = _g1049.add
  local drop = _g1049.drop
  local last = _g1049.last
  local reverse = _g1049.reverse
  local join = _g1049.join
  local reduce = _g1049.reduce
  local keep = _g1049.keep
  local in63 = _g1049["in?"]
  local find = _g1049.find
  local pair = _g1049.pair
  local sort = _g1049.sort
  local iterate = _g1049.iterate
  local replicate = _g1049.replicate
  local series = _g1049.series
  local map = _g1049.map
  local keys63 = _g1049["keys?"]
  local empty63 = _g1049["empty?"]
  local stash = _g1049.stash
  local unstash = _g1049.unstash
  local search = _g1049.search
  local split = _g1049.split
  local cat = _g1049.cat
  local _43 = _g1049["+"]
  local _ = _g1049["-"]
  local _42 = _g1049["*"]
  local _47 = _g1049["/"]
  local _37 = _g1049["%"]
  local _62 = _g1049[">"]
  local _60 = _g1049["<"]
  local _61 = _g1049["="]
  local _6261 = _g1049[">="]
  local _6061 = _g1049["<="]
  local read_file = _g1049["read-file"]
  local write_file = _g1049["write-file"]
  local write = _g1049.write
  local exit = _g1049.exit
  local today = _g1049.today
  local now = _g1049.now
  local number = _g1049.number
  local string = _g1049.string
  local space = _g1049.space
  local apply = _g1049.apply
  local make_id = _g1049["make-id"]
  local _37message_handler = _g1049["%message-handler"]
  local toplevel63 = _g1049["toplevel?"]
  local module_key = _g1049["module-key"]
  local module = _g1049.module
  local setenv = _g1049.setenv
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
  local keys = _g2.keys
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
    local _g1054,_g1055 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g1053 = {_g1054, _g1055}
    local _g1 = _g1053[1]
    local x = _g1053[2]
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
    local _g1061 = args
    local i = 0
    while i < length(_g1061) do
      local arg = _g1061[i + 1]
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
