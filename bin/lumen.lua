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
  local _6061 = _g149["<="]
  local _6261 = _g149[">="]
  local one63 = _g149["one?"]
  local write_file = _g149["write-file"]
  local map = _g149.map
  local reduce = _g149.reduce
  local in63 = _g149["in?"]
  local string = _g149.string
  local last = _g149.last
  local stash = _g149.stash
  local sort = _g149.sort
  local empty63 = _g149["empty?"]
  local drop = _g149.drop
  local string63 = _g149["string?"]
  local inner = _g149.inner
  local keys = _g149.keys
  local composite63 = _g149["composite?"]
  local substring = _g149.substring
  local add = _g149.add
  local some63 = _g149["some?"]
  local _ = _g149["-"]
  local series = _g149.series
  local _47 = _g149["/"]
  local keep = _g149.keep
  local setenv = _g149.setenv
  local length = _g149.length
  local find = _g149.find
  local _37 = _g149["%"]
  local list63 = _g149["list?"]
  local boolean63 = _g149["boolean?"]
  local string_literal63 = _g149["string-literal?"]
  local reverse = _g149.reverse
  local now = _g149.now
  local none63 = _g149["none?"]
  local atom63 = _g149["atom?"]
  local cat = _g149.cat
  local char = _g149.char
  local number63 = _g149["number?"]
  local search = _g149.search
  local hd = _g149.hd
  local _61 = _g149["="]
  local tl = _g149.tl
  local split = _g149.split
  local function63 = _g149["function?"]
  local space = _g149.space
  local module_key = _g149["module-key"]
  local keys63 = _g149["keys?"]
  local nil63 = _g149["nil?"]
  local make_id = _g149["make-id"]
  local toplevel63 = _g149["toplevel?"]
  local _37message_handler = _g149["%message-handler"]
  local pair = _g149.pair
  local module = _g149.module
  local replicate = _g149.replicate
  local apply = _g149.apply
  local id_literal63 = _g149["id-literal?"]
  local number = _g149.number
  local exit = _g149.exit
  local today = _g149.today
  local iterate = _g149.iterate
  local sub = _g149.sub
  local read_file = _g149["read-file"]
  local table63 = _g149["table?"]
  local write = _g149.write
  local join = _g149.join
  local is63 = _g149["is?"]
  local _60 = _g149["<"]
  local _62 = _g149[">"]
  local code = _g149.code
  local _42 = _g149["*"]
  local unstash = _g149.unstash
  local _43 = _g149["+"]
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
      local _g238
      if c == "\n" then
        _g238 = "\\n"
      else
        local _g239
        if c == "\"" then
          _g239 = "\\\""
        else
          local _g240
          if c == "\\" then
            _g240 = "\\\\"
          else
            _g240 = c
          end
          _g239 = _g240
        end
        _g238 = _g239
      end
      local c1 = _g238
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
          local _g241
          if k == "&" then
            _g241 = {"sub", rh, length(lh)}
          else
            _g241 = {"get", rh, {"quote", index(k)}}
          end
          local x = _g241
          local _g242
          if v == true then
            _g242 = k
          else
            _g242 = v
          end
          local _g175 = _g242
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
        local _g243
        if quasisplice63(v, depth) then
          _g243 = quasiexpand(v[2])
        else
          _g243 = quasiexpand(v, depth)
        end
        local _g199 = _g243
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
  local reserved = {["case"] = true, ["throw"] = true, [">"] = true, [">="] = true, ["<"] = true, ["<="] = true, ["continue"] = true, ["delete"] = true, ["catch"] = true, ["instanceof"] = true, ["new"] = true, ["*"] = true, ["break"] = true, ["nil"] = true, ["not"] = true, ["for"] = true, ["switch"] = true, ["repeat"] = true, ["elseif"] = true, ["with"] = true, ["or"] = true, ["debugger"] = true, ["var"] = true, ["local"] = true, ["function"] = true, ["else"] = true, ["="] = true, ["=="] = true, ["while"] = true, ["if"] = true, ["-"] = true, ["do"] = true, ["default"] = true, ["try"] = true, ["then"] = true, ["/"] = true, ["%"] = true, ["typeof"] = true, ["finally"] = true, ["true"] = true, ["+"] = true, ["this"] = true, ["void"] = true, ["until"] = true, ["false"] = true, ["return"] = true, ["end"] = true, ["in"] = true, ["and"] = true}
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
      local _g244
      if c == "-" then
        _g244 = "_"
      else
        local _g245
        if valid_code63(n) then
          _g245 = c
        else
          local _g246
          if i == 0 then
            _g246 = "_" .. n
          else
            _g246 = n
          end
          _g245 = _g246
        end
        _g244 = _g245
      end
      local c1 = _g244
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
      local _g221 = nil
      for _g221 in next, _g219 do
        local v = _g219[_g221]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _g221, {"get", m, {"quote", _g221}}})
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
    local _g223 = unstash({...})
    local xs = sub(_g223, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g224 = unstash({...})
    local keys = sub(_g224, 0)
    local t1 = {}
    local _g225 = t
    local k = nil
    for k in next, _g225 do
      local v = _g225[k]
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
    local _g229 = t
    local k = nil
    for k in next, _g229 do
      local v = _g229[k]
      local x = f(v)
      if is63(x) then
        add(o, literal(k))
        add(o, x)
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
    local _g235 = {"table"}
    _g235.export = quote_frame(m.export)
    _g235.import = quoted(m.import)
    _g235.alias = quoted(m.alias)
    return(_g235)
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
  local _g247 = nexus["lumen/runtime"]
  local _6061 = _g247["<="]
  local _6261 = _g247[">="]
  local one63 = _g247["one?"]
  local write_file = _g247["write-file"]
  local map = _g247.map
  local reduce = _g247.reduce
  local in63 = _g247["in?"]
  local string = _g247.string
  local last = _g247.last
  local stash = _g247.stash
  local sort = _g247.sort
  local empty63 = _g247["empty?"]
  local drop = _g247.drop
  local string63 = _g247["string?"]
  local inner = _g247.inner
  local keys = _g247.keys
  local composite63 = _g247["composite?"]
  local substring = _g247.substring
  local add = _g247.add
  local some63 = _g247["some?"]
  local _ = _g247["-"]
  local series = _g247.series
  local _47 = _g247["/"]
  local keep = _g247.keep
  local setenv = _g247.setenv
  local length = _g247.length
  local find = _g247.find
  local _37 = _g247["%"]
  local list63 = _g247["list?"]
  local boolean63 = _g247["boolean?"]
  local string_literal63 = _g247["string-literal?"]
  local reverse = _g247.reverse
  local now = _g247.now
  local none63 = _g247["none?"]
  local atom63 = _g247["atom?"]
  local cat = _g247.cat
  local char = _g247.char
  local number63 = _g247["number?"]
  local search = _g247.search
  local hd = _g247.hd
  local _61 = _g247["="]
  local tl = _g247.tl
  local split = _g247.split
  local function63 = _g247["function?"]
  local space = _g247.space
  local module_key = _g247["module-key"]
  local keys63 = _g247["keys?"]
  local nil63 = _g247["nil?"]
  local make_id = _g247["make-id"]
  local toplevel63 = _g247["toplevel?"]
  local _37message_handler = _g247["%message-handler"]
  local pair = _g247.pair
  local module = _g247.module
  local replicate = _g247.replicate
  local apply = _g247.apply
  local id_literal63 = _g247["id-literal?"]
  local number = _g247.number
  local exit = _g247.exit
  local today = _g247.today
  local iterate = _g247.iterate
  local sub = _g247.sub
  local read_file = _g247["read-file"]
  local table63 = _g247["table?"]
  local write = _g247.write
  local join = _g247.join
  local is63 = _g247["is?"]
  local _60 = _g247["<"]
  local _62 = _g247[">"]
  local code = _g247.code
  local _42 = _g247["*"]
  local unstash = _g247.unstash
  local _43 = _g247["+"]
  local delimiters = {["("] = true, ["\n"] = true, [")"] = true, [";"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
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
  local _g276 = nexus["lumen/runtime"]
  local _6061 = _g276["<="]
  local _6261 = _g276[">="]
  local one63 = _g276["one?"]
  local write_file = _g276["write-file"]
  local map = _g276.map
  local reduce = _g276.reduce
  local in63 = _g276["in?"]
  local string = _g276.string
  local last = _g276.last
  local stash = _g276.stash
  local sort = _g276.sort
  local empty63 = _g276["empty?"]
  local drop = _g276.drop
  local string63 = _g276["string?"]
  local inner = _g276.inner
  local keys = _g276.keys
  local composite63 = _g276["composite?"]
  local substring = _g276.substring
  local add = _g276.add
  local some63 = _g276["some?"]
  local _ = _g276["-"]
  local series = _g276.series
  local _47 = _g276["/"]
  local keep = _g276.keep
  local setenv = _g276.setenv
  local length = _g276.length
  local find = _g276.find
  local _37 = _g276["%"]
  local list63 = _g276["list?"]
  local boolean63 = _g276["boolean?"]
  local string_literal63 = _g276["string-literal?"]
  local reverse = _g276.reverse
  local now = _g276.now
  local none63 = _g276["none?"]
  local atom63 = _g276["atom?"]
  local cat = _g276.cat
  local char = _g276.char
  local number63 = _g276["number?"]
  local search = _g276.search
  local hd = _g276.hd
  local _61 = _g276["="]
  local tl = _g276.tl
  local split = _g276.split
  local function63 = _g276["function?"]
  local space = _g276.space
  local module_key = _g276["module-key"]
  local keys63 = _g276["keys?"]
  local nil63 = _g276["nil?"]
  local make_id = _g276["make-id"]
  local toplevel63 = _g276["toplevel?"]
  local _37message_handler = _g276["%message-handler"]
  local pair = _g276.pair
  local module = _g276.module
  local replicate = _g276.replicate
  local apply = _g276.apply
  local id_literal63 = _g276["id-literal?"]
  local number = _g276.number
  local exit = _g276.exit
  local today = _g276.today
  local iterate = _g276.iterate
  local sub = _g276.sub
  local read_file = _g276["read-file"]
  local table63 = _g276["table?"]
  local write = _g276.write
  local join = _g276.join
  local is63 = _g276["is?"]
  local _60 = _g276["<"]
  local _62 = _g276[">"]
  local code = _g276.code
  local _42 = _g276["*"]
  local unstash = _g276.unstash
  local _43 = _g276["+"]
  local _g279 = nexus["lumen/lib"]
  local quasiexpand = _g279.quasiexpand
  local macro63 = _g279["macro?"]
  local symbol63 = _g279["symbol?"]
  local stash42 = _g279["stash*"]
  local macroexpand = _g279.macroexpand
  local symbol_expansion = _g279["symbol-expansion"]
  local key = _g279.key
  local id = _g279.id
  local valid_id63 = _g279["valid-id?"]
  local special63 = _g279["special?"]
  local indentation = _g279.indentation
  local special_form63 = _g279["special-form?"]
  local imported = _g279.imported
  local macro_function = _g279["macro-function"]
  local initial_environment = _g279["initial-environment"]
  local mapo = _g279.mapo
  local bind = _g279.bind
  local link = _g279.link
  local statement63 = _g279["statement?"]
  local bound63 = _g279["bound?"]
  local quote_modules = _g279["quote-modules"]
  local quote_environment = _g279["quote-environment"]
  local getenv = _g279.getenv
  local bind42 = _g279["bind*"]
  local reserved63 = _g279["reserved?"]
  local quoted = _g279.quoted
  local variable63 = _g279["variable?"]
  local _g280 = nexus["lumen/reader"]
  local read_from_string = _g280["read-from-string"]
  local read = _g280.read
  local make_stream = _g280["make-stream"]
  local read_table = _g280["read-table"]
  local read_all = _g280["read-all"]
  local _g284 = {}
  _g284.lua = "not "
  _g284.js = "!"
  local _g282 = {}
  local _g285 = {}
  _g285.lua = "not "
  _g285.js = "!"
  _g282["not"] = _g285
  local _g287 = {}
  _g287["*"] = true
  _g287["%"] = true
  _g287["/"] = true
  local _g289 = {}
  _g289["+"] = true
  _g289["-"] = true
  local _g293 = {}
  _g293.lua = ".."
  _g293.js = "+"
  local _g291 = {}
  local _g294 = {}
  _g294.lua = ".."
  _g294.js = "+"
  _g291.cat = _g294
  local _g296 = {}
  _g296["<="] = true
  _g296["<"] = true
  _g296[">="] = true
  _g296[">"] = true
  local _g300 = {}
  _g300.lua = "~="
  _g300.js = "!="
  local _g302 = {}
  _g302.lua = "=="
  _g302.js = "==="
  local _g298 = {}
  local _g303 = {}
  _g303.lua = "~="
  _g303.js = "!="
  _g298["~="] = _g303
  local _g304 = {}
  _g304.lua = "=="
  _g304.js = "==="
  _g298["="] = _g304
  local _g308 = {}
  _g308.lua = "and"
  _g308.js = "&&"
  local _g306 = {}
  local _g309 = {}
  _g309.lua = "and"
  _g309.js = "&&"
  _g306["and"] = _g309
  local _g313 = {}
  _g313.lua = "or"
  _g313.js = "||"
  local _g311 = {}
  local _g314 = {}
  _g314.lua = "or"
  _g314.js = "||"
  _g311["or"] = _g314
  local infix = {_g282, _g287, _g289, _g291, _g296, _g298, _g306, _g311}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g317 = infix
      local i = 0
      while i < length(_g317) do
        local level = _g317[i + 1]
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
    local _g322 = args
    local i = 0
    while i < length(_g322) do
      local arg = _g322[i + 1]
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
    local _g326 = getenv(x)
    local special = _g326.special
    local stmt = _g326.stmt
    local self_tr63 = _g326.tr
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
    local _g329 = unstash({...})
    local right = _g329.right
    local _g391
    if right then
      _g391 = _6261
    else
      _g391 = _62
    end
    if _g391(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g331 = sub(form, 1)
    local a = _g331[1]
    local b = _g331[2]
    local _g332 = op_delims(form, a)
    local ao = _g332[1]
    local ac = _g332[2]
    local _g333 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g333[1]
    local bc = _g333[2]
    local _g334 = compile(a)
    local _g335 = compile(b)
    local _g336 = getop(op)
    if unary63(form) then
      return(_g336 .. ao .. _g334 .. ac)
    else
      return(ao .. _g334 .. ac .. " " .. _g336 .. " " .. bo .. _g335 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g337 = unstash({...})
    local name = _g337.name
    local prefix = _g337.prefix
    local _g392
    if name then
      _g392 = compile(name)
    else
      _g392 = ""
    end
    local id = _g392
    local _g338 = prefix or ""
    local _g339 = compile_args(args)
    indent_level = indent_level + 1
    local _g341 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g340 = _g341
    local ind = indentation()
    local _g393
    if target == "js" then
      _g393 = ""
    else
      _g393 = "end"
    end
    local tr = _g393
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g339 .. " {\n" .. _g340 .. ind .. "}" .. tr)
    else
      return(_g338 .. "function " .. id .. _g339 .. "\n" .. _g340 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g343 = unstash({...})
    local stmt = _g343.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g394
        if stmt then
          _g394 = indentation()
        else
          _g394 = ""
        end
        local ind = _g394
        local _g395
        if atom63(form) then
          _g395 = compile_atom(form)
        else
          local _g396
          if infix63(hd(form)) then
            _g396 = compile_infix(form)
          else
            _g396 = compile_call(form)
          end
          _g395 = _g396
        end
        local _g344 = _g395
        return(ind .. _g344 .. tr)
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
    local _g348 = sub(args, 0, length(args) - 1)
    local _g349 = 0
    while _g349 < length(_g348) do
      local x = _g348[_g349 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g349 = _g349 + 1
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
    local _g351 = args[2]
    local _g352 = args[3]
    if stmt63 or tail63 then
      local _g398
      if _g352 then
        _g398 = {lower_body({_g352}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g351}, tail63)}, _g398)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g397
      if _g352 then
        _g397 = {lower({"set", e, _g352})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g351})}, _g397))
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
      local _g399
      if x == "and" then
        _g399 = {"%if", id, b, id}
      else
        _g399 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g399}, hoist))
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
    local _g359 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g359, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g361 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g361) then
      return(_g361)
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
    local _g375 = unstash({...})
    local _g376 = _g375.all
    local m = module(spec)
    local frame = last(environment)
    local _g377 = m.export
    local k = nil
    for k in next, _g377 do
      if not number63(k) then
        local v = _g377[k]
        if v.export or _g376 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g378 = unstash({...})
    local _g379 = _g378.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g379}))
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
    local _g382 = specs or {}
    local _g383 = 0
    while _g383 < length(_g382) do
      local spec = _g382[_g383 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g384 = import_modules(m.alias)
        local aliased = _g384[1]
        local bs = _g384[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g385 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g385)
      end
      _g383 = _g383 + 1
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
  local _g400 = nexus["lumen/runtime"]
  local _6061 = _g400["<="]
  local _6261 = _g400[">="]
  local one63 = _g400["one?"]
  local write_file = _g400["write-file"]
  local map = _g400.map
  local reduce = _g400.reduce
  local in63 = _g400["in?"]
  local string = _g400.string
  local last = _g400.last
  local stash = _g400.stash
  local sort = _g400.sort
  local empty63 = _g400["empty?"]
  local drop = _g400.drop
  local string63 = _g400["string?"]
  local inner = _g400.inner
  local keys = _g400.keys
  local composite63 = _g400["composite?"]
  local substring = _g400.substring
  local add = _g400.add
  local some63 = _g400["some?"]
  local _ = _g400["-"]
  local series = _g400.series
  local _47 = _g400["/"]
  local keep = _g400.keep
  local setenv = _g400.setenv
  local length = _g400.length
  local find = _g400.find
  local _37 = _g400["%"]
  local list63 = _g400["list?"]
  local boolean63 = _g400["boolean?"]
  local string_literal63 = _g400["string-literal?"]
  local reverse = _g400.reverse
  local now = _g400.now
  local none63 = _g400["none?"]
  local atom63 = _g400["atom?"]
  local cat = _g400.cat
  local char = _g400.char
  local number63 = _g400["number?"]
  local search = _g400.search
  local hd = _g400.hd
  local _61 = _g400["="]
  local tl = _g400.tl
  local split = _g400.split
  local function63 = _g400["function?"]
  local space = _g400.space
  local module_key = _g400["module-key"]
  local keys63 = _g400["keys?"]
  local nil63 = _g400["nil?"]
  local make_id = _g400["make-id"]
  local toplevel63 = _g400["toplevel?"]
  local _37message_handler = _g400["%message-handler"]
  local pair = _g400.pair
  local module = _g400.module
  local replicate = _g400.replicate
  local apply = _g400.apply
  local id_literal63 = _g400["id-literal?"]
  local number = _g400.number
  local exit = _g400.exit
  local today = _g400.today
  local iterate = _g400.iterate
  local sub = _g400.sub
  local read_file = _g400["read-file"]
  local table63 = _g400["table?"]
  local write = _g400.write
  local join = _g400.join
  local is63 = _g400["is?"]
  local _60 = _g400["<"]
  local _62 = _g400[">"]
  local code = _g400.code
  local _42 = _g400["*"]
  local unstash = _g400.unstash
  local _43 = _g400["+"]
  local _g403 = nexus["lumen/lib"]
  local quasiexpand = _g403.quasiexpand
  local macro63 = _g403["macro?"]
  local symbol63 = _g403["symbol?"]
  local stash42 = _g403["stash*"]
  local macroexpand = _g403.macroexpand
  local symbol_expansion = _g403["symbol-expansion"]
  local key = _g403.key
  local id = _g403.id
  local valid_id63 = _g403["valid-id?"]
  local special63 = _g403["special?"]
  local indentation = _g403.indentation
  local special_form63 = _g403["special-form?"]
  local imported = _g403.imported
  local macro_function = _g403["macro-function"]
  local initial_environment = _g403["initial-environment"]
  local mapo = _g403.mapo
  local bind = _g403.bind
  local link = _g403.link
  local statement63 = _g403["statement?"]
  local bound63 = _g403["bound?"]
  local quote_modules = _g403["quote-modules"]
  local quote_environment = _g403["quote-environment"]
  local getenv = _g403.getenv
  local bind42 = _g403["bind*"]
  local reserved63 = _g403["reserved?"]
  local quoted = _g403.quoted
  local variable63 = _g403["variable?"]
  local _g404 = nexus["lumen/compiler"]
  local compile = _g404.compile
  local in_module = _g404["in-module"]
  local load_module = _g404["load-module"]
  local open_module = _g404["open-module"]
  local declare = _g404.declare
  local import_modules = _g404["import-modules"]
  local eval = _g404.eval
  local compile_module = _g404["compile-module"]
  local compile_function = _g404["compile-function"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g591 = nexus["lumen/runtime"]
  local _6061 = _g591["<="]
  local _6261 = _g591[">="]
  local one63 = _g591["one?"]
  local write_file = _g591["write-file"]
  local map = _g591.map
  local reduce = _g591.reduce
  local in63 = _g591["in?"]
  local string = _g591.string
  local last = _g591.last
  local stash = _g591.stash
  local sort = _g591.sort
  local empty63 = _g591["empty?"]
  local drop = _g591.drop
  local string63 = _g591["string?"]
  local inner = _g591.inner
  local keys = _g591.keys
  local composite63 = _g591["composite?"]
  local substring = _g591.substring
  local add = _g591.add
  local some63 = _g591["some?"]
  local _ = _g591["-"]
  local series = _g591.series
  local _47 = _g591["/"]
  local keep = _g591.keep
  local setenv = _g591.setenv
  local length = _g591.length
  local find = _g591.find
  local _37 = _g591["%"]
  local list63 = _g591["list?"]
  local boolean63 = _g591["boolean?"]
  local string_literal63 = _g591["string-literal?"]
  local reverse = _g591.reverse
  local now = _g591.now
  local none63 = _g591["none?"]
  local atom63 = _g591["atom?"]
  local cat = _g591.cat
  local char = _g591.char
  local number63 = _g591["number?"]
  local search = _g591.search
  local hd = _g591.hd
  local _61 = _g591["="]
  local tl = _g591.tl
  local split = _g591.split
  local function63 = _g591["function?"]
  local space = _g591.space
  local module_key = _g591["module-key"]
  local keys63 = _g591["keys?"]
  local nil63 = _g591["nil?"]
  local make_id = _g591["make-id"]
  local toplevel63 = _g591["toplevel?"]
  local _37message_handler = _g591["%message-handler"]
  local pair = _g591.pair
  local module = _g591.module
  local replicate = _g591.replicate
  local apply = _g591.apply
  local id_literal63 = _g591["id-literal?"]
  local number = _g591.number
  local exit = _g591.exit
  local today = _g591.today
  local iterate = _g591.iterate
  local sub = _g591.sub
  local read_file = _g591["read-file"]
  local table63 = _g591["table?"]
  local write = _g591.write
  local join = _g591.join
  local is63 = _g591["is?"]
  local _60 = _g591["<"]
  local _62 = _g591[">"]
  local code = _g591.code
  local _42 = _g591["*"]
  local unstash = _g591.unstash
  local _43 = _g591["+"]
  local _g594 = nexus["lumen/lib"]
  local quasiexpand = _g594.quasiexpand
  local macro63 = _g594["macro?"]
  local symbol63 = _g594["symbol?"]
  local stash42 = _g594["stash*"]
  local macroexpand = _g594.macroexpand
  local symbol_expansion = _g594["symbol-expansion"]
  local key = _g594.key
  local id = _g594.id
  local valid_id63 = _g594["valid-id?"]
  local special63 = _g594["special?"]
  local indentation = _g594.indentation
  local special_form63 = _g594["special-form?"]
  local imported = _g594.imported
  local macro_function = _g594["macro-function"]
  local initial_environment = _g594["initial-environment"]
  local mapo = _g594.mapo
  local bind = _g594.bind
  local link = _g594.link
  local statement63 = _g594["statement?"]
  local bound63 = _g594["bound?"]
  local quote_modules = _g594["quote-modules"]
  local quote_environment = _g594["quote-environment"]
  local getenv = _g594.getenv
  local bind42 = _g594["bind*"]
  local reserved63 = _g594["reserved?"]
  local quoted = _g594.quoted
  local variable63 = _g594["variable?"]
  local _g595 = nexus["lumen/compiler"]
  local compile = _g595.compile
  local in_module = _g595["in-module"]
  local load_module = _g595["load-module"]
  local open_module = _g595["open-module"]
  local declare = _g595.declare
  local import_modules = _g595["import-modules"]
  local eval = _g595.eval
  local compile_module = _g595["compile-module"]
  local compile_function = _g595["compile-function"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g918 = nexus["lumen/runtime"]
  local _6061 = _g918["<="]
  local _6261 = _g918[">="]
  local one63 = _g918["one?"]
  local write_file = _g918["write-file"]
  local map = _g918.map
  local reduce = _g918.reduce
  local in63 = _g918["in?"]
  local string = _g918.string
  local last = _g918.last
  local stash = _g918.stash
  local sort = _g918.sort
  local empty63 = _g918["empty?"]
  local drop = _g918.drop
  local string63 = _g918["string?"]
  local inner = _g918.inner
  local keys = _g918.keys
  local composite63 = _g918["composite?"]
  local substring = _g918.substring
  local add = _g918.add
  local some63 = _g918["some?"]
  local _ = _g918["-"]
  local series = _g918.series
  local _47 = _g918["/"]
  local keep = _g918.keep
  local setenv = _g918.setenv
  local length = _g918.length
  local find = _g918.find
  local _37 = _g918["%"]
  local list63 = _g918["list?"]
  local boolean63 = _g918["boolean?"]
  local string_literal63 = _g918["string-literal?"]
  local reverse = _g918.reverse
  local now = _g918.now
  local none63 = _g918["none?"]
  local atom63 = _g918["atom?"]
  local cat = _g918.cat
  local char = _g918.char
  local number63 = _g918["number?"]
  local search = _g918.search
  local hd = _g918.hd
  local _61 = _g918["="]
  local tl = _g918.tl
  local split = _g918.split
  local function63 = _g918["function?"]
  local space = _g918.space
  local module_key = _g918["module-key"]
  local keys63 = _g918["keys?"]
  local nil63 = _g918["nil?"]
  local make_id = _g918["make-id"]
  local toplevel63 = _g918["toplevel?"]
  local _37message_handler = _g918["%message-handler"]
  local pair = _g918.pair
  local module = _g918.module
  local replicate = _g918.replicate
  local apply = _g918.apply
  local id_literal63 = _g918["id-literal?"]
  local number = _g918.number
  local exit = _g918.exit
  local today = _g918.today
  local iterate = _g918.iterate
  local sub = _g918.sub
  local read_file = _g918["read-file"]
  local table63 = _g918["table?"]
  local write = _g918.write
  local join = _g918.join
  local is63 = _g918["is?"]
  local _60 = _g918["<"]
  local _62 = _g918[">"]
  local code = _g918.code
  local _42 = _g918["*"]
  local unstash = _g918.unstash
  local _43 = _g918["+"]
  local _g921 = nexus["lumen/lib"]
  local quasiexpand = _g921.quasiexpand
  local macro63 = _g921["macro?"]
  local symbol63 = _g921["symbol?"]
  local stash42 = _g921["stash*"]
  local macroexpand = _g921.macroexpand
  local symbol_expansion = _g921["symbol-expansion"]
  local key = _g921.key
  local id = _g921.id
  local valid_id63 = _g921["valid-id?"]
  local special63 = _g921["special?"]
  local indentation = _g921.indentation
  local special_form63 = _g921["special-form?"]
  local imported = _g921.imported
  local macro_function = _g921["macro-function"]
  local initial_environment = _g921["initial-environment"]
  local mapo = _g921.mapo
  local bind = _g921.bind
  local link = _g921.link
  local statement63 = _g921["statement?"]
  local bound63 = _g921["bound?"]
  local quote_modules = _g921["quote-modules"]
  local quote_environment = _g921["quote-environment"]
  local getenv = _g921.getenv
  local bind42 = _g921["bind*"]
  local reserved63 = _g921["reserved?"]
  local quoted = _g921.quoted
  local variable63 = _g921["variable?"]
  local _g922 = nexus["lumen/compiler"]
  local compile = _g922.compile
  local in_module = _g922["in-module"]
  local load_module = _g922["load-module"]
  local open_module = _g922["open-module"]
  local declare = _g922.declare
  local import_modules = _g922["import-modules"]
  local eval = _g922.eval
  local compile_module = _g922["compile-module"]
  local compile_function = _g922["compile-function"]
  modules = {["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/core"] = {export = {fn = {export = true, macro = function (args, ...)
    local _g937 = unstash({...})
    local body = sub(_g937, 0)
    local _g938 = bind42(args, body)
    local _g939 = _g938[1]
    local _g940 = _g938[2]
    return(join({"%function", _g939}, _g940))
  end}, let = {export = true, macro = function (bindings, ...)
    local _g941 = unstash({...})
    local body = sub(_g941, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g942 = bind(lh, rh)
      local _g943 = 0
      while _g943 < length(_g942) do
        local _g944 = _g942[_g943 + 1]
        local id = _g944[1]
        local val = _g944[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g943 = _g943 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _g945 = unstash({...})
    local body = sub(_g945, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g946 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g946)
  end}, define = {export = true, macro = function (name, x, ...)
    local _g948 = unstash({...})
    local body = sub(_g948, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g949 = bind42(x, body)
        local args = _g949[1]
        local _g950 = _g949[2]
        return(link(name, join({"%local-function", name, args}, _g950)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _g952 = unstash({...})
    local body = sub(_g952, 0)
    add(environment, {})
    map(function (_g955)
      local name = _g955[1]
      local exp = _g955[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g953 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g953)
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g957 = xs
    local _g958 = 0
    while _g958 < length(_g957) do
      local x = _g957[_g958 + 1]
      l[x] = true
      _g958 = _g958 + 1
    end
    return(join({"table"}, l))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _g959 = unstash({...})
    local bs = sub(_g959, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _g960 = unstash({...})
    local body = sub(_g960, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g961 = {"setenv", {"quote", name}}
    _g961.special = form
    _g961.form = {"quote", form}
    eval(join(_g961, keys))
    return(nil)
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _g963 = unstash({...})
    local body = sub(_g963, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(body) then
      local _g964 = bind42(x, body)
      local args = _g964[1]
      local _g965 = _g964[2]
      return(join({"%global-function", name, args}, _g965))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, each = {export = true, macro = function (b, t, ...)
    local _g966 = unstash({...})
    local body = sub(_g966, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g1038
    if nil63(v) then
      local _g1039
      if b.i then
        _g1039 = "i"
      else
        _g1039 = make_id()
      end
      local i = _g1039
      _g1038 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g967 = {"target"}
      _g967.lua = {"not", {"number?", k}}
      _g967.js = {"isNaN", {"parseInt", k}}
      _g1038 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g967, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1038})
  end}, unless = {export = true, macro = function (cond, ...)
    local _g968 = unstash({...})
    local body = sub(_g968, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g969 = body
      local k = nil
      for k in next, _g969 do
        if not number63(k) then
          local v = _g969[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _g970 = unstash({...})
    local body = sub(_g970, 0)
    local scope = _g970.scope
    local x = make_id()
    local _g971 = {"table"}
    _g971._scope = scope
    return({"do", {"add", "environment", _g971}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _g972 = unstash({...})
    local body = sub(_g972, 0)
    local exp = body.export
    local imp = body.import
    local alias = body.alias
    local _g973 = import_modules(imp)
    local imports = _g973[1]
    local bindings = _g973[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g974 = exp or {}
    local _g975 = 0
    while _g975 < length(_g974) do
      local x = _g974[_g975 + 1]
      setenv(x, {_stash = true, export = true})
      _g975 = _g975 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _g977 = unstash({...})
    local body = sub(_g977, 0)
    local form = join({"fn", args}, body)
    local _g978 = {"setenv", {"quote", name}}
    _g978.form = {"quote", form}
    _g978.macro = form
    eval(_g978)
    return(nil)
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _g979 = unstash({...})
    local bs = sub(_g979, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, when = {export = true, macro = function (cond, ...)
    local _g981 = unstash({...})
    local body = sub(_g981, 0)
    return({"if", cond, join({"do"}, body)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, all = {export = true, macro = function (_g988, t, ...)
    local k = _g988[1]
    local v = _g988[2]
    local _g987 = unstash({...})
    local body = sub(_g987, 0)
    local x = make_id()
    local n = make_id()
    local _g1040
    if target == "lua" then
      _g1040 = body
    else
      _g1040 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1040)}})
  end}, ["with-bindings"] = {export = true, macro = function (_g990, ...)
    local names = _g990[1]
    local _g989 = unstash({...})
    local body = sub(_g989, 0)
    local x = make_id()
    local _g992 = {"setenv", x}
    _g992.variable = true
    local _g991 = {"with-frame", {"each", {x}, names, _g992}}
    _g991.scope = true
    return(join(_g991, body))
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g995)
      local a = _g995[1]
      local b = _g995[2]
      local c = sub(_g995, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["read-from-string"] = {export = true, variable = true}, read = {export = true, variable = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, delimiters = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["flag?"] = {variable = true}, ["read-table"] = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["define-reader"] = {export = true, macro = function (_g997, ...)
    local char = _g997[1]
    local stream = _g997[2]
    local _g996 = unstash({...})
    local body = sub(_g996, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["<="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, map = {export = true, variable = true}, reduce = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, string = {export = true, variable = true}, last = {export = true, variable = true}, stash = {export = true, variable = true}, sort = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, drop = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, inner = {export = true, variable = true}, keys = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, substring = {export = true, variable = true}, add = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, series = {export = true, variable = true}, ["/"] = {export = true, variable = true}, keep = {export = true, variable = true}, setenv = {export = true, variable = true}, length = {export = true, variable = true}, find = {export = true, variable = true}, ["%"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, reverse = {export = true, variable = true}, now = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["id-count"] = {variable = true}, cat = {export = true, variable = true}, char = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, search = {export = true, variable = true}, hd = {export = true, variable = true}, ["="] = {export = true, variable = true}, tl = {export = true, variable = true}, split = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, space = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, shift = {variable = true}, ["nil?"] = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, pair = {export = true, variable = true}, module = {export = true, variable = true}, replicate = {export = true, variable = true}, apply = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, number = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, iterate = {export = true, variable = true}, sub = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, write = {export = true, variable = true}, join = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, code = {export = true, variable = true}, ["*"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["+"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {export = {index = {variable = true}, quasiexpand = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, literal = {variable = true}, ["quoting?"] = {variable = true}, ["stash*"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, ["global?"] = {variable = true}, extend = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["symbol-expansion"] = {export = true, variable = true}, key = {export = true, variable = true}, escape = {variable = true}, id = {export = true, variable = true}, ["quasisplice?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, exclude = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["valid-code?"] = {variable = true}, ["special?"] = {export = true, variable = true}, ["quote-binding"] = {variable = true}, ["numeric?"] = {variable = true}, indentation = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["special-form?"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["macro-function"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, mapo = {export = true, variable = true}, bind = {export = true, variable = true}, link = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, getenv = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["bind*"] = {export = true, variable = true}, ["reserved?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {compile = {export = true, variable = true}, ["infix?"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["lower-body"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-if"] = {variable = true}, ["compile-atom"] = {variable = true}, ["lower-do"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-infix"] = {variable = true}, infix = {variable = true}, terminator = {variable = true}, ["lower-special"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["load-module"] = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["lower-definition"] = {variable = true}, ["can-return?"] = {variable = true}, ["%result"] = {global = true, export = true}, getop = {variable = true}, reimported = {variable = true}, declare = {export = true, variable = true}, ["lower-while"] = {variable = true}, ["lower-call"] = {variable = true}, conclude = {variable = true}, ["compiling?"] = {variable = true}, ["lower-try"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-call"] = {variable = true}, ["module-path"] = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-file"] = {variable = true}, encapsulate = {variable = true}, run = {variable = true}, precedence = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-function"] = {variable = true}, process = {variable = true}, ["lower-for"] = {variable = true}, ["%compile-module"] = {variable = true}, eval = {export = true, variable = true}, ["lower-statement"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, lower = {variable = true}, ["unary?"] = {variable = true}, ["compile-special"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {global = true, export = true}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {error = {export = true, stmt = true, foo = true, special = function (x)
    local _g1041
    if target == "js" then
      _g1041 = "throw new " .. compile({"Error", x})
    else
      _g1041 = "error(" .. compile(x) .. ")"
    end
    local e = _g1041
    return(indentation() .. e)
  end}, get = {export = true, foo = true, special = function (t, k)
    local _g1003 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g1003, 0) == "{" then
      _g1003 = "(" .. _g1003 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g1003 .. "." .. inner(k))
    else
      return(_g1003 .. "[" .. k1 .. "]")
    end
  end}, ["break"] = {export = true, stmt = true, foo = true, special = function ()
    return(indentation() .. "break")
  end}, ["not"] = {}, ["while"] = {foo = true, export = true, tr = true, special = function (cond, form)
    local _g1006 = compile(cond)
    indent_level = indent_level + 1
    local _g1007 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1007
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g1006 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g1006 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true}, ["do"] = {foo = true, export = true, tr = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g1008 = forms
    local _g1009 = 0
    while _g1009 < length(_g1008) do
      local x = _g1008[_g1009 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g1009 = _g1009 + 1
    end
    return(str)
  end, stmt = true}, ["%if"] = {foo = true, export = true, tr = true, special = function (cond, cons, alt)
    local _g1011 = compile(cond)
    indent_level = indent_level + 1
    local _g1013 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g1012 = _g1013
    local _g1042
    if alt then
      indent_level = indent_level + 1
      local _g1015 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1042 = _g1015
    end
    local _g1014 = _g1042
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g1011 .. ") {\n" .. _g1012 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g1011 .. " then\n" .. _g1012
    end
    if _g1014 and target == "js" then
      str = str .. " else {\n" .. _g1014 .. ind .. "}"
    else
      if _g1014 then
        str = str .. ind .. "else\n" .. _g1014
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true}, ["%try"] = {foo = true, export = true, tr = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1017 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1017
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g1018 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g1018
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true}, ["%for"] = {foo = true, export = true, tr = true, special = function (t, k, form)
    local _g1020 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1021 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1021
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g1020 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g1020 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g1043
    if target == "lua" then
      _g1043 = " = "
    else
      _g1043 = ": "
    end
    local sep = _g1043
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g1022 = pairs
    local i = 0
    while i < length(_g1022) do
      local _g1023 = _g1022[i + 1]
      local k = _g1023[1]
      local v = _g1023[2]
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
  end}, ["return"] = {export = true, stmt = true, foo = true, special = function (x)
    local _g1044
    if nil63(x) then
      _g1044 = "return"
    else
      _g1044 = "return(" .. compile(x) .. ")"
    end
    local _g1025 = _g1044
    return(indentation() .. _g1025)
  end}, ["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g1045
    if target == "lua" then
      _g1045 = "{"
    else
      _g1045 = "["
    end
    local open = _g1045
    local _g1046
    if target == "lua" then
      _g1046 = "}"
    else
      _g1046 = "]"
    end
    local close = _g1046
    local str = ""
    local _g1026 = forms
    local i = 0
    while i < length(_g1026) do
      local x = _g1026[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%global-function"] = {foo = true, export = true, tr = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true}, ["%local"] = {export = true, stmt = true, foo = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g1047
    if is63(value) then
      _g1047 = " = " .. value1
    else
      _g1047 = ""
    end
    local rh = _g1047
    local _g1048
    if target == "js" then
      _g1048 = "var "
    else
      _g1048 = "local "
    end
    local keyword = _g1048
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end}, ["%local-function"] = {foo = true, export = true, tr = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, stmt = true}, ["%function"] = {export = true, foo = true, special = function (args, body)
    return(compile_function(args, body))
  end}, set = {export = true, stmt = true, foo = true, special = function (lh, rh)
    local _g1032 = compile(lh)
    local _g1049
    if nil63(rh) then
      _g1049 = "nil"
    else
      _g1049 = rh
    end
    local _g1033 = compile(_g1049)
    return(indentation() .. _g1032 .. " = " .. _g1033)
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _g1034 = unstash({...})
    local body = sub(_g1034, 0)
    local exp = body.export
    local imp = body.import
    local alias = body.alias
    local _g1035 = import_modules(imp)
    local imports = _g1035[1]
    local bindings = _g1035[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g1036 = exp or {}
    local _g1037 = 0
    while _g1037 < length(_g1036) do
      local x = _g1036[_g1037 + 1]
      setenv(x, {_stash = true, export = true})
      _g1037 = _g1037 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g1050 = nexus["lumen/runtime"]
  local _6061 = _g1050["<="]
  local _6261 = _g1050[">="]
  local one63 = _g1050["one?"]
  local write_file = _g1050["write-file"]
  local map = _g1050.map
  local reduce = _g1050.reduce
  local in63 = _g1050["in?"]
  local string = _g1050.string
  local last = _g1050.last
  local stash = _g1050.stash
  local sort = _g1050.sort
  local empty63 = _g1050["empty?"]
  local drop = _g1050.drop
  local string63 = _g1050["string?"]
  local inner = _g1050.inner
  local keys = _g1050.keys
  local composite63 = _g1050["composite?"]
  local substring = _g1050.substring
  local add = _g1050.add
  local some63 = _g1050["some?"]
  local _ = _g1050["-"]
  local series = _g1050.series
  local _47 = _g1050["/"]
  local keep = _g1050.keep
  local setenv = _g1050.setenv
  local length = _g1050.length
  local find = _g1050.find
  local _37 = _g1050["%"]
  local list63 = _g1050["list?"]
  local boolean63 = _g1050["boolean?"]
  local string_literal63 = _g1050["string-literal?"]
  local reverse = _g1050.reverse
  local now = _g1050.now
  local none63 = _g1050["none?"]
  local atom63 = _g1050["atom?"]
  local cat = _g1050.cat
  local char = _g1050.char
  local number63 = _g1050["number?"]
  local search = _g1050.search
  local hd = _g1050.hd
  local _61 = _g1050["="]
  local tl = _g1050.tl
  local split = _g1050.split
  local function63 = _g1050["function?"]
  local space = _g1050.space
  local module_key = _g1050["module-key"]
  local keys63 = _g1050["keys?"]
  local nil63 = _g1050["nil?"]
  local make_id = _g1050["make-id"]
  local toplevel63 = _g1050["toplevel?"]
  local _37message_handler = _g1050["%message-handler"]
  local pair = _g1050.pair
  local module = _g1050.module
  local replicate = _g1050.replicate
  local apply = _g1050.apply
  local id_literal63 = _g1050["id-literal?"]
  local number = _g1050.number
  local exit = _g1050.exit
  local today = _g1050.today
  local iterate = _g1050.iterate
  local sub = _g1050.sub
  local read_file = _g1050["read-file"]
  local table63 = _g1050["table?"]
  local write = _g1050.write
  local join = _g1050.join
  local is63 = _g1050["is?"]
  local _60 = _g1050["<"]
  local _62 = _g1050[">"]
  local code = _g1050.code
  local _42 = _g1050["*"]
  local unstash = _g1050.unstash
  local _43 = _g1050["+"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local id_literal63 = _g2["id-literal?"]
  local _6261 = _g2[">="]
  local one63 = _g2["one?"]
  local write_file = _g2["write-file"]
  local map = _g2.map
  local join = _g2.join
  local in63 = _g2["in?"]
  local string = _g2.string
  local last = _g2.last
  local stash = _g2.stash
  local sort = _g2.sort
  local empty63 = _g2["empty?"]
  local write = _g2.write
  local string63 = _g2["string?"]
  local inner = _g2.inner
  local apply = _g2.apply
  local composite63 = _g2["composite?"]
  local substring = _g2.substring
  local add = _g2.add
  local some63 = _g2["some?"]
  local _ = _g2["-"]
  local series = _g2.series
  local _47 = _g2["/"]
  local keep = _g2.keep
  local setenv = _g2.setenv
  local length = _g2.length
  local find = _g2.find
  local _37 = _g2["%"]
  local unstash = _g2.unstash
  local string_literal63 = _g2["string-literal?"]
  local reverse = _g2.reverse
  local now = _g2.now
  local none63 = _g2["none?"]
  local atom63 = _g2["atom?"]
  local today = _g2.today
  local char = _g2.char
  local number63 = _g2["number?"]
  local search = _g2.search
  local _62 = _g2[">"]
  local _61 = _g2["="]
  local tl = _g2.tl
  local code = _g2.code
  local _60 = _g2["<"]
  local space = _g2.space
  local module_key = _g2["module-key"]
  local keys63 = _g2["keys?"]
  local _43 = _g2["+"]
  local nil63 = _g2["nil?"]
  local _42 = _g2["*"]
  local drop = _g2.drop
  local hd = _g2.hd
  local pair = _g2.pair
  local module = _g2.module
  local replicate = _g2.replicate
  local list63 = _g2["list?"]
  local cat = _g2.cat
  local read_file = _g2["read-file"]
  local split = _g2.split
  local boolean63 = _g2["boolean?"]
  local iterate = _g2.iterate
  local sub = _g2.sub
  local toplevel63 = _g2["toplevel?"]
  local table63 = _g2["table?"]
  local number = _g2.number
  local _6061 = _g2["<="]
  local is63 = _g2["is?"]
  local _37message_handler = _g2["%message-handler"]
  local keys = _g2.keys
  local make_id = _g2["make-id"]
  local function63 = _g2["function?"]
  local exit = _g2.exit
  local reduce = _g2.reduce
  local _g5 = nexus["lumen/reader"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus["lumen/compiler"]
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local load_module = _g6["load-module"]
  local declare = _g6.declare
  local eval = _g6.eval
  local import_modules = _g6["import-modules"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local compile_function = _g6["compile-function"]
  local function rep(str)
    local _g1055,_g1056 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g1054 = {_g1055, _g1056}
    local _g1 = _g1054[1]
    local x = _g1054[2]
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
    local _g1062 = args
    local i = 0
    while i < length(_g1062) do
      local arg = _g1062[i + 1]
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
