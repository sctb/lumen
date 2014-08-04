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
  local _37 = _g149["%"]
  local module_key = _g149["module-key"]
  local string = _g149.string
  local in63 = _g149["in?"]
  local sort = _g149.sort
  local unstash = _g149.unstash
  local code = _g149.code
  local add = _g149.add
  local stash = _g149.stash
  local apply = _g149.apply
  local number63 = _g149["number?"]
  local _60 = _g149["<"]
  local nil63 = _g149["nil?"]
  local pair = _g149.pair
  local drop = _g149.drop
  local map = _g149.map
  local setenv = _g149.setenv
  local hd = _g149.hd
  local inner = _g149.inner
  local length = _g149.length
  local _ = _g149["-"]
  local _42 = _g149["*"]
  local _43 = _g149["+"]
  local table63 = _g149["table?"]
  local one63 = _g149["one?"]
  local _47 = _g149["/"]
  local last = _g149.last
  local number = _g149.number
  local make_id = _g149["make-id"]
  local cat = _g149.cat
  local char = _g149.char
  local _6261 = _g149[">="]
  local atom63 = _g149["atom?"]
  local reduce = _g149.reduce
  local join = _g149.join
  local write_file = _g149["write-file"]
  local tl = _g149.tl
  local boolean63 = _g149["boolean?"]
  local keep = _g149.keep
  local id_literal63 = _g149["id-literal?"]
  local series = _g149.series
  local read_file = _g149["read-file"]
  local space = _g149.space
  local find = _g149.find
  local split = _g149.split
  local now = _g149.now
  local module = _g149.module
  local toplevel63 = _g149["toplevel?"]
  local _37message_handler = _g149["%message-handler"]
  local today = _g149.today
  local is63 = _g149["is?"]
  local write = _g149.write
  local composite63 = _g149["composite?"]
  local reverse = _g149.reverse
  local string63 = _g149["string?"]
  local _61 = _g149["="]
  local sub = _g149.sub
  local _6061 = _g149["<="]
  local keys63 = _g149["keys?"]
  local iterate = _g149.iterate
  local substring = _g149.substring
  local _62 = _g149[">"]
  local replicate = _g149.replicate
  local none63 = _g149["none?"]
  local empty63 = _g149["empty?"]
  local some63 = _g149["some?"]
  local list63 = _g149["list?"]
  local function63 = _g149["function?"]
  local exit = _g149.exit
  local keys = _g149.keys
  local string_literal63 = _g149["string-literal?"]
  local search = _g149.search
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
      local _g239
      if c == "\n" then
        _g239 = "\\n"
      else
        local _g240
        if c == "\"" then
          _g240 = "\\\""
        else
          local _g241
          if c == "\\" then
            _g241 = "\\\\"
          else
            _g241 = c
          end
          _g240 = _g241
        end
        _g239 = _g240
      end
      local c1 = _g239
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
  local function index(k)
    if number63(k) then
      return(k + 1)
    end
  end
  nexus["lumen/lib"].index = index
  local function bias(k)
    if number63(k) and target ~= "lua" then
      if target == "js" then
        k = k - 1
      else
        k = k + 1
      end
    end
    return(k)
  end
  nexus["lumen/lib"].bias = bias
  local function bind(lh, rh)
    if composite63(lh) and list63(rh) then
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local _g174 = lh
        local k = nil
        for k in next, _g174 do
          local v = _g174[k]
          local _g242
          if k == "&" then
            _g242 = {"sub", rh, length(lh)}
          else
            _g242 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _g242
          local _g243
          if v == true then
            _g243 = k
          else
            _g243 = v
          end
          local _g176 = _g243
          bs = join(bs, bind(_g176, x))
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
      local _g179 = args
      local k = nil
      for k in next, _g179 do
        local v = _g179[k]
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
            local _g188 = args
            local _g189 = 0
            while _g189 < length(_g188) do
              local _g186 = _g188[_g189 + 1]
              setenv(_g186, {_stash = true, variable = true})
              _g189 = _g189 + 1
            end
            local _g187 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g187)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g148 = form[1]
              local _g190 = form[2]
              local _g191 = form[3]
              local _g192 = sub(form, 3)
              add(environment, {_scope = true})
              local _g195 = _g191
              local _g196 = 0
              while _g196 < length(_g195) do
                local _g193 = _g195[_g196 + 1]
                setenv(_g193, {_stash = true, variable = true})
                _g196 = _g196 + 1
              end
              local _g194 = join({x, _g190, _g191}, macroexpand(_g192))
              drop(environment)
              return(_g194)
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
    local _g198 = form
    local k = nil
    for k in next, _g198 do
      local v = _g198[k]
      if not number63(k) then
        local _g244
        if quasisplice63(v, depth) then
          _g244 = quasiexpand(v[2])
        else
          _g244 = quasiexpand(v, depth)
        end
        local _g200 = _g244
        last(xs)[k] = _g200
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _g202 = quasiexpand(x[2])
        add(xs, _g202)
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
  local reserved = {["then"] = true, ["return"] = true, ["continue"] = true, ["+"] = true, ["do"] = true, ["with"] = true, ["/"] = true, ["finally"] = true, ["elseif"] = true, ["new"] = true, ["void"] = true, ["throw"] = true, ["switch"] = true, ["="] = true, ["break"] = true, ["%"] = true, ["local"] = true, ["nil"] = true, ["not"] = true, ["instanceof"] = true, ["in"] = true, ["until"] = true, ["or"] = true, ["=="] = true, ["case"] = true, ["-"] = true, ["false"] = true, ["*"] = true, ["else"] = true, ["debugger"] = true, ["<="] = true, ["var"] = true, [">="] = true, ["true"] = true, ["typeof"] = true, ["for"] = true, ["while"] = true, ["repeat"] = true, ["default"] = true, ["delete"] = true, ["try"] = true, ["this"] = true, ["<"] = true, ["function"] = true, [">"] = true, ["end"] = true, ["and"] = true, ["if"] = true, ["catch"] = true}
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
      local _g245
      if c == "-" then
        _g245 = "_"
      else
        local _g246
        if valid_code63(n) then
          _g246 = c
        else
          local _g247
          if i == 0 then
            _g247 = "_" .. n
          else
            _g247 = n
          end
          _g246 = _g247
        end
        _g245 = _g246
      end
      local c1 = _g245
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
    local _g219 = unstash({...})
    local private = _g219.private
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g220 = module(spec).export
      local _g222 = nil
      for _g222 in next, _g220 do
        local v = _g220[_g222]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _g222, {"get", m, {"quote", _g222}}})
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
    local _g224 = unstash({...})
    local xs = sub(_g224, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g225 = unstash({...})
    local keys = sub(_g225, 0)
    local t1 = {}
    local _g226 = t
    local k = nil
    for k in next, _g226 do
      local v = _g226[k]
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
    local _g230 = t
    local k = nil
    for k in next, _g230 do
      local v = _g230[k]
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
    local _g236 = {"table"}
    _g236.export = quote_frame(m.export)
    _g236.import = quoted(m.import)
    _g236.alias = quoted(m.alias)
    return(_g236)
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
  local _g248 = nexus["lumen/runtime"]
  local _37 = _g248["%"]
  local module_key = _g248["module-key"]
  local string = _g248.string
  local in63 = _g248["in?"]
  local sort = _g248.sort
  local unstash = _g248.unstash
  local code = _g248.code
  local add = _g248.add
  local stash = _g248.stash
  local apply = _g248.apply
  local number63 = _g248["number?"]
  local _60 = _g248["<"]
  local nil63 = _g248["nil?"]
  local pair = _g248.pair
  local drop = _g248.drop
  local map = _g248.map
  local setenv = _g248.setenv
  local hd = _g248.hd
  local inner = _g248.inner
  local length = _g248.length
  local _ = _g248["-"]
  local _42 = _g248["*"]
  local _43 = _g248["+"]
  local table63 = _g248["table?"]
  local one63 = _g248["one?"]
  local _47 = _g248["/"]
  local last = _g248.last
  local number = _g248.number
  local make_id = _g248["make-id"]
  local cat = _g248.cat
  local char = _g248.char
  local _6261 = _g248[">="]
  local atom63 = _g248["atom?"]
  local reduce = _g248.reduce
  local join = _g248.join
  local write_file = _g248["write-file"]
  local tl = _g248.tl
  local boolean63 = _g248["boolean?"]
  local keep = _g248.keep
  local id_literal63 = _g248["id-literal?"]
  local series = _g248.series
  local read_file = _g248["read-file"]
  local space = _g248.space
  local find = _g248.find
  local split = _g248.split
  local now = _g248.now
  local module = _g248.module
  local toplevel63 = _g248["toplevel?"]
  local _37message_handler = _g248["%message-handler"]
  local today = _g248.today
  local is63 = _g248["is?"]
  local write = _g248.write
  local composite63 = _g248["composite?"]
  local reverse = _g248.reverse
  local string63 = _g248["string?"]
  local _61 = _g248["="]
  local sub = _g248.sub
  local _6061 = _g248["<="]
  local keys63 = _g248["keys?"]
  local iterate = _g248.iterate
  local substring = _g248.substring
  local _62 = _g248[">"]
  local replicate = _g248.replicate
  local none63 = _g248["none?"]
  local empty63 = _g248["empty?"]
  local some63 = _g248["some?"]
  local list63 = _g248["list?"]
  local function63 = _g248["function?"]
  local exit = _g248.exit
  local keys = _g248.keys
  local string_literal63 = _g248["string-literal?"]
  local search = _g248.search
  local delimiters = {["("] = true, [")"] = true, ["\n"] = true, [";"] = true}
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
  local _g277 = nexus["lumen/runtime"]
  local _37 = _g277["%"]
  local module_key = _g277["module-key"]
  local string = _g277.string
  local in63 = _g277["in?"]
  local sort = _g277.sort
  local unstash = _g277.unstash
  local code = _g277.code
  local add = _g277.add
  local stash = _g277.stash
  local apply = _g277.apply
  local number63 = _g277["number?"]
  local _60 = _g277["<"]
  local nil63 = _g277["nil?"]
  local pair = _g277.pair
  local drop = _g277.drop
  local map = _g277.map
  local setenv = _g277.setenv
  local hd = _g277.hd
  local inner = _g277.inner
  local length = _g277.length
  local _ = _g277["-"]
  local _42 = _g277["*"]
  local _43 = _g277["+"]
  local table63 = _g277["table?"]
  local one63 = _g277["one?"]
  local _47 = _g277["/"]
  local last = _g277.last
  local number = _g277.number
  local make_id = _g277["make-id"]
  local cat = _g277.cat
  local char = _g277.char
  local _6261 = _g277[">="]
  local atom63 = _g277["atom?"]
  local reduce = _g277.reduce
  local join = _g277.join
  local write_file = _g277["write-file"]
  local tl = _g277.tl
  local boolean63 = _g277["boolean?"]
  local keep = _g277.keep
  local id_literal63 = _g277["id-literal?"]
  local series = _g277.series
  local read_file = _g277["read-file"]
  local space = _g277.space
  local find = _g277.find
  local split = _g277.split
  local now = _g277.now
  local module = _g277.module
  local toplevel63 = _g277["toplevel?"]
  local _37message_handler = _g277["%message-handler"]
  local today = _g277.today
  local is63 = _g277["is?"]
  local write = _g277.write
  local composite63 = _g277["composite?"]
  local reverse = _g277.reverse
  local string63 = _g277["string?"]
  local _61 = _g277["="]
  local sub = _g277.sub
  local _6061 = _g277["<="]
  local keys63 = _g277["keys?"]
  local iterate = _g277.iterate
  local substring = _g277.substring
  local _62 = _g277[">"]
  local replicate = _g277.replicate
  local none63 = _g277["none?"]
  local empty63 = _g277["empty?"]
  local some63 = _g277["some?"]
  local list63 = _g277["list?"]
  local function63 = _g277["function?"]
  local exit = _g277.exit
  local keys = _g277.keys
  local string_literal63 = _g277["string-literal?"]
  local search = _g277.search
  local _g280 = nexus["lumen/lib"]
  local bind42 = _g280["bind*"]
  local getenv = _g280.getenv
  local initial_environment = _g280["initial-environment"]
  local variable63 = _g280["variable?"]
  local symbol63 = _g280["symbol?"]
  local statement63 = _g280["statement?"]
  local stash42 = _g280["stash*"]
  local reserved63 = _g280["reserved?"]
  local bind = _g280.bind
  local quoted = _g280.quoted
  local link = _g280.link
  local mapo = _g280.mapo
  local special63 = _g280["special?"]
  local quote_modules = _g280["quote-modules"]
  local macro63 = _g280["macro?"]
  local imported = _g280.imported
  local macroexpand = _g280.macroexpand
  local indentation = _g280.indentation
  local key = _g280.key
  local id = _g280.id
  local index = _g280.index
  local quote_environment = _g280["quote-environment"]
  local bound63 = _g280["bound?"]
  local macro_function = _g280["macro-function"]
  local special_form63 = _g280["special-form?"]
  local quasiexpand = _g280.quasiexpand
  local valid_id63 = _g280["valid-id?"]
  local symbol_expansion = _g280["symbol-expansion"]
  local _g281 = nexus["lumen/reader"]
  local read_all = _g281["read-all"]
  local read_table = _g281["read-table"]
  local read = _g281.read
  local read_from_string = _g281["read-from-string"]
  local make_stream = _g281["make-stream"]
  local _g285 = {}
  _g285.lua = "not "
  _g285.js = "!"
  local _g283 = {}
  local _g286 = {}
  _g286.lua = "not "
  _g286.js = "!"
  _g283["not"] = _g286
  local _g288 = {}
  _g288["%"] = true
  _g288["*"] = true
  _g288["/"] = true
  local _g290 = {}
  _g290["+"] = true
  _g290["-"] = true
  local _g294 = {}
  _g294.lua = ".."
  _g294.js = "+"
  local _g292 = {}
  local _g295 = {}
  _g295.lua = ".."
  _g295.js = "+"
  _g292.cat = _g295
  local _g297 = {}
  _g297["<"] = true
  _g297[">"] = true
  _g297[">="] = true
  _g297["<="] = true
  local _g301 = {}
  _g301.lua = "~="
  _g301.js = "!="
  local _g303 = {}
  _g303.lua = "=="
  _g303.js = "==="
  local _g299 = {}
  local _g304 = {}
  _g304.lua = "~="
  _g304.js = "!="
  _g299["~="] = _g304
  local _g305 = {}
  _g305.lua = "=="
  _g305.js = "==="
  _g299["="] = _g305
  local _g309 = {}
  _g309.lua = "and"
  _g309.js = "&&"
  local _g307 = {}
  local _g310 = {}
  _g310.lua = "and"
  _g310.js = "&&"
  _g307["and"] = _g310
  local _g314 = {}
  _g314.lua = "or"
  _g314.js = "||"
  local _g312 = {}
  local _g315 = {}
  _g315.lua = "or"
  _g315.js = "||"
  _g312["or"] = _g315
  local infix = {_g283, _g288, _g290, _g292, _g297, _g299, _g307, _g312}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g318 = infix
      local k = nil
      for k in next, _g318 do
        local v = _g318[k]
        if v[hd(form)] then
          return(index(k))
        end
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
    local comma = ""
    series(function (x)
      str = str .. comma .. compile(x)
      comma = ", "
    end, args)
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
    local _g328 = getenv(x)
    local special = _g328.special
    local stmt = _g328.stmt
    local self_tr63 = _g328.tr
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
    local _g331 = unstash({...})
    local right = _g331.right
    local _g393
    if right then
      _g393 = _6261
    else
      _g393 = _62
    end
    if _g393(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g333 = sub(form, 1)
    local a = _g333[1]
    local b = _g333[2]
    local _g334 = op_delims(form, a)
    local ao = _g334[1]
    local ac = _g334[2]
    local _g335 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g335[1]
    local bc = _g335[2]
    local _g336 = compile(a)
    local _g337 = compile(b)
    local _g338 = getop(op)
    if unary63(form) then
      return(_g338 .. ao .. _g336 .. ac)
    else
      return(ao .. _g336 .. ac .. " " .. _g338 .. " " .. bo .. _g337 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g339 = unstash({...})
    local prefix = _g339.prefix
    local name = _g339.name
    local _g394
    if name then
      _g394 = compile(name)
    else
      _g394 = ""
    end
    local id = _g394
    local _g340 = prefix or ""
    local _g341 = compile_args(args)
    indent_level = indent_level + 1
    local _g343 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g342 = _g343
    local ind = indentation()
    local _g395
    if target == "js" then
      _g395 = ""
    else
      _g395 = "end"
    end
    local tr = _g395
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g341 .. " {\n" .. _g342 .. ind .. "}" .. tr)
    else
      return(_g340 .. "function " .. id .. _g341 .. "\n" .. _g342 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g345 = unstash({...})
    local stmt = _g345.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g396
        if stmt then
          _g396 = indentation()
        else
          _g396 = ""
        end
        local ind = _g396
        local _g397
        if atom63(form) then
          _g397 = compile_atom(form)
        else
          local _g398
          if infix63(hd(form)) then
            _g398 = compile_infix(form)
          else
            _g398 = compile_call(form)
          end
          _g397 = _g398
        end
        local _g346 = _g397
        return(ind .. _g346 .. tr)
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
    local _g350 = sub(args, 0, length(args) - 1)
    local _g351 = 0
    while _g351 < length(_g350) do
      local x = _g350[_g351 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g351 = _g351 + 1
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
    local _g353 = args[2]
    local _g354 = args[3]
    if stmt63 or tail63 then
      local _g400
      if _g354 then
        _g400 = {lower_body({_g354}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g353}, tail63)}, _g400)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g399
      if _g354 then
        _g399 = {lower({"set", e, _g354})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g353})}, _g399))
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
      local _g401
      if x == "and" then
        _g401 = {"%if", id, b, id}
      else
        _g401 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g401}, hoist))
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
    local _g361 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g361, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g363 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g363) then
      return(_g363)
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
    local _g377 = unstash({...})
    local _g378 = _g377.all
    local m = module(spec)
    local frame = last(environment)
    local _g379 = m.export
    local k = nil
    for k in next, _g379 do
      if not number63(k) then
        local v = _g379[k]
        if v.export or _g378 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g380 = unstash({...})
    local _g381 = _g380.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g381}))
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
    local _g384 = specs or {}
    local _g385 = 0
    while _g385 < length(_g384) do
      local spec = _g384[_g385 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g386 = import_modules(m.alias)
        local aliased = _g386[1]
        local bs = _g386[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g387 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g387)
      end
      _g385 = _g385 + 1
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
  local _g402 = nexus["lumen/runtime"]
  local _37 = _g402["%"]
  local module_key = _g402["module-key"]
  local string = _g402.string
  local in63 = _g402["in?"]
  local sort = _g402.sort
  local unstash = _g402.unstash
  local code = _g402.code
  local add = _g402.add
  local stash = _g402.stash
  local apply = _g402.apply
  local number63 = _g402["number?"]
  local _60 = _g402["<"]
  local nil63 = _g402["nil?"]
  local pair = _g402.pair
  local drop = _g402.drop
  local map = _g402.map
  local setenv = _g402.setenv
  local hd = _g402.hd
  local inner = _g402.inner
  local length = _g402.length
  local _ = _g402["-"]
  local _42 = _g402["*"]
  local _43 = _g402["+"]
  local table63 = _g402["table?"]
  local one63 = _g402["one?"]
  local _47 = _g402["/"]
  local last = _g402.last
  local number = _g402.number
  local make_id = _g402["make-id"]
  local cat = _g402.cat
  local char = _g402.char
  local _6261 = _g402[">="]
  local atom63 = _g402["atom?"]
  local reduce = _g402.reduce
  local join = _g402.join
  local write_file = _g402["write-file"]
  local tl = _g402.tl
  local boolean63 = _g402["boolean?"]
  local keep = _g402.keep
  local id_literal63 = _g402["id-literal?"]
  local series = _g402.series
  local read_file = _g402["read-file"]
  local space = _g402.space
  local find = _g402.find
  local split = _g402.split
  local now = _g402.now
  local module = _g402.module
  local toplevel63 = _g402["toplevel?"]
  local _37message_handler = _g402["%message-handler"]
  local today = _g402.today
  local is63 = _g402["is?"]
  local write = _g402.write
  local composite63 = _g402["composite?"]
  local reverse = _g402.reverse
  local string63 = _g402["string?"]
  local _61 = _g402["="]
  local sub = _g402.sub
  local _6061 = _g402["<="]
  local keys63 = _g402["keys?"]
  local iterate = _g402.iterate
  local substring = _g402.substring
  local _62 = _g402[">"]
  local replicate = _g402.replicate
  local none63 = _g402["none?"]
  local empty63 = _g402["empty?"]
  local some63 = _g402["some?"]
  local list63 = _g402["list?"]
  local function63 = _g402["function?"]
  local exit = _g402.exit
  local keys = _g402.keys
  local string_literal63 = _g402["string-literal?"]
  local search = _g402.search
  local _g405 = nexus["lumen/lib"]
  local bind42 = _g405["bind*"]
  local getenv = _g405.getenv
  local initial_environment = _g405["initial-environment"]
  local variable63 = _g405["variable?"]
  local symbol63 = _g405["symbol?"]
  local statement63 = _g405["statement?"]
  local stash42 = _g405["stash*"]
  local reserved63 = _g405["reserved?"]
  local bind = _g405.bind
  local quoted = _g405.quoted
  local link = _g405.link
  local mapo = _g405.mapo
  local special63 = _g405["special?"]
  local quote_modules = _g405["quote-modules"]
  local macro63 = _g405["macro?"]
  local imported = _g405.imported
  local macroexpand = _g405.macroexpand
  local indentation = _g405.indentation
  local key = _g405.key
  local id = _g405.id
  local index = _g405.index
  local quote_environment = _g405["quote-environment"]
  local bound63 = _g405["bound?"]
  local macro_function = _g405["macro-function"]
  local special_form63 = _g405["special-form?"]
  local quasiexpand = _g405.quasiexpand
  local valid_id63 = _g405["valid-id?"]
  local symbol_expansion = _g405["symbol-expansion"]
  local _g406 = nexus["lumen/compiler"]
  local declare = _g406.declare
  local compile_function = _g406["compile-function"]
  local in_module = _g406["in-module"]
  local load_module = _g406["load-module"]
  local eval = _g406.eval
  local compile_module = _g406["compile-module"]
  local open_module = _g406["open-module"]
  local compile = _g406.compile
  local import_modules = _g406["import-modules"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g593 = nexus["lumen/runtime"]
  local _37 = _g593["%"]
  local module_key = _g593["module-key"]
  local string = _g593.string
  local in63 = _g593["in?"]
  local sort = _g593.sort
  local unstash = _g593.unstash
  local code = _g593.code
  local add = _g593.add
  local stash = _g593.stash
  local apply = _g593.apply
  local number63 = _g593["number?"]
  local _60 = _g593["<"]
  local nil63 = _g593["nil?"]
  local pair = _g593.pair
  local drop = _g593.drop
  local map = _g593.map
  local setenv = _g593.setenv
  local hd = _g593.hd
  local inner = _g593.inner
  local length = _g593.length
  local _ = _g593["-"]
  local _42 = _g593["*"]
  local _43 = _g593["+"]
  local table63 = _g593["table?"]
  local one63 = _g593["one?"]
  local _47 = _g593["/"]
  local last = _g593.last
  local number = _g593.number
  local make_id = _g593["make-id"]
  local cat = _g593.cat
  local char = _g593.char
  local _6261 = _g593[">="]
  local atom63 = _g593["atom?"]
  local reduce = _g593.reduce
  local join = _g593.join
  local write_file = _g593["write-file"]
  local tl = _g593.tl
  local boolean63 = _g593["boolean?"]
  local keep = _g593.keep
  local id_literal63 = _g593["id-literal?"]
  local series = _g593.series
  local read_file = _g593["read-file"]
  local space = _g593.space
  local find = _g593.find
  local split = _g593.split
  local now = _g593.now
  local module = _g593.module
  local toplevel63 = _g593["toplevel?"]
  local _37message_handler = _g593["%message-handler"]
  local today = _g593.today
  local is63 = _g593["is?"]
  local write = _g593.write
  local composite63 = _g593["composite?"]
  local reverse = _g593.reverse
  local string63 = _g593["string?"]
  local _61 = _g593["="]
  local sub = _g593.sub
  local _6061 = _g593["<="]
  local keys63 = _g593["keys?"]
  local iterate = _g593.iterate
  local substring = _g593.substring
  local _62 = _g593[">"]
  local replicate = _g593.replicate
  local none63 = _g593["none?"]
  local empty63 = _g593["empty?"]
  local some63 = _g593["some?"]
  local list63 = _g593["list?"]
  local function63 = _g593["function?"]
  local exit = _g593.exit
  local keys = _g593.keys
  local string_literal63 = _g593["string-literal?"]
  local search = _g593.search
  local _g596 = nexus["lumen/lib"]
  local bind42 = _g596["bind*"]
  local getenv = _g596.getenv
  local initial_environment = _g596["initial-environment"]
  local variable63 = _g596["variable?"]
  local symbol63 = _g596["symbol?"]
  local statement63 = _g596["statement?"]
  local stash42 = _g596["stash*"]
  local reserved63 = _g596["reserved?"]
  local bind = _g596.bind
  local quoted = _g596.quoted
  local link = _g596.link
  local mapo = _g596.mapo
  local special63 = _g596["special?"]
  local quote_modules = _g596["quote-modules"]
  local macro63 = _g596["macro?"]
  local imported = _g596.imported
  local macroexpand = _g596.macroexpand
  local indentation = _g596.indentation
  local key = _g596.key
  local id = _g596.id
  local index = _g596.index
  local quote_environment = _g596["quote-environment"]
  local bound63 = _g596["bound?"]
  local macro_function = _g596["macro-function"]
  local special_form63 = _g596["special-form?"]
  local quasiexpand = _g596.quasiexpand
  local valid_id63 = _g596["valid-id?"]
  local symbol_expansion = _g596["symbol-expansion"]
  local _g597 = nexus["lumen/compiler"]
  local declare = _g597.declare
  local compile_function = _g597["compile-function"]
  local in_module = _g597["in-module"]
  local load_module = _g597["load-module"]
  local eval = _g597.eval
  local compile_module = _g597["compile-module"]
  local open_module = _g597["open-module"]
  local compile = _g597.compile
  local import_modules = _g597["import-modules"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g920 = nexus["lumen/runtime"]
  local _37 = _g920["%"]
  local module_key = _g920["module-key"]
  local string = _g920.string
  local in63 = _g920["in?"]
  local sort = _g920.sort
  local unstash = _g920.unstash
  local code = _g920.code
  local add = _g920.add
  local stash = _g920.stash
  local apply = _g920.apply
  local number63 = _g920["number?"]
  local _60 = _g920["<"]
  local nil63 = _g920["nil?"]
  local pair = _g920.pair
  local drop = _g920.drop
  local map = _g920.map
  local setenv = _g920.setenv
  local hd = _g920.hd
  local inner = _g920.inner
  local length = _g920.length
  local _ = _g920["-"]
  local _42 = _g920["*"]
  local _43 = _g920["+"]
  local table63 = _g920["table?"]
  local one63 = _g920["one?"]
  local _47 = _g920["/"]
  local last = _g920.last
  local number = _g920.number
  local make_id = _g920["make-id"]
  local cat = _g920.cat
  local char = _g920.char
  local _6261 = _g920[">="]
  local atom63 = _g920["atom?"]
  local reduce = _g920.reduce
  local join = _g920.join
  local write_file = _g920["write-file"]
  local tl = _g920.tl
  local boolean63 = _g920["boolean?"]
  local keep = _g920.keep
  local id_literal63 = _g920["id-literal?"]
  local series = _g920.series
  local read_file = _g920["read-file"]
  local space = _g920.space
  local find = _g920.find
  local split = _g920.split
  local now = _g920.now
  local module = _g920.module
  local toplevel63 = _g920["toplevel?"]
  local _37message_handler = _g920["%message-handler"]
  local today = _g920.today
  local is63 = _g920["is?"]
  local write = _g920.write
  local composite63 = _g920["composite?"]
  local reverse = _g920.reverse
  local string63 = _g920["string?"]
  local _61 = _g920["="]
  local sub = _g920.sub
  local _6061 = _g920["<="]
  local keys63 = _g920["keys?"]
  local iterate = _g920.iterate
  local substring = _g920.substring
  local _62 = _g920[">"]
  local replicate = _g920.replicate
  local none63 = _g920["none?"]
  local empty63 = _g920["empty?"]
  local some63 = _g920["some?"]
  local list63 = _g920["list?"]
  local function63 = _g920["function?"]
  local exit = _g920.exit
  local keys = _g920.keys
  local string_literal63 = _g920["string-literal?"]
  local search = _g920.search
  local _g923 = nexus["lumen/lib"]
  local bind42 = _g923["bind*"]
  local getenv = _g923.getenv
  local initial_environment = _g923["initial-environment"]
  local variable63 = _g923["variable?"]
  local symbol63 = _g923["symbol?"]
  local statement63 = _g923["statement?"]
  local stash42 = _g923["stash*"]
  local reserved63 = _g923["reserved?"]
  local bind = _g923.bind
  local quoted = _g923.quoted
  local link = _g923.link
  local mapo = _g923.mapo
  local special63 = _g923["special?"]
  local quote_modules = _g923["quote-modules"]
  local macro63 = _g923["macro?"]
  local imported = _g923.imported
  local macroexpand = _g923.macroexpand
  local indentation = _g923.indentation
  local key = _g923.key
  local id = _g923.id
  local index = _g923.index
  local quote_environment = _g923["quote-environment"]
  local bound63 = _g923["bound?"]
  local macro_function = _g923["macro-function"]
  local special_form63 = _g923["special-form?"]
  local quasiexpand = _g923.quasiexpand
  local valid_id63 = _g923["valid-id?"]
  local symbol_expansion = _g923["symbol-expansion"]
  local _g924 = nexus["lumen/compiler"]
  local declare = _g924.declare
  local compile_function = _g924["compile-function"]
  local in_module = _g924["in-module"]
  local load_module = _g924["load-module"]
  local eval = _g924.eval
  local compile_module = _g924["compile-module"]
  local open_module = _g924["open-module"]
  local compile = _g924.compile
  local import_modules = _g924["import-modules"]
  modules = {["lumen/compiler"] = {export = {["lower-try"] = {variable = true}, conclude = {variable = true}, ["lower-special"] = {variable = true}, run = {variable = true}, getop = {variable = true}, ["lower-statement"] = {variable = true}, declare = {variable = true, export = true}, ["can-return?"] = {variable = true}, ["compile-call"] = {variable = true}, ["%result"] = {global = true, export = true}, ["unary?"] = {variable = true}, infix = {variable = true}, ["lower-short"] = {variable = true}, ["lower-infix?"] = {variable = true}, reimported = {variable = true}, process = {variable = true}, ["%compile-module"] = {variable = true}, ["compile-args"] = {variable = true}, lower = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, ["lower-function"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["in-module"] = {variable = true, export = true}, encapsulate = {variable = true}, ["load-module"] = {variable = true, export = true}, eval = {variable = true, export = true}, ["compile-special"] = {variable = true}, ["lower-definition"] = {variable = true}, terminator = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["module-path"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-infix"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-for"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["lower-while"] = {variable = true}, ["compile-infix"] = {variable = true}, compile = {variable = true, export = true}, ["import-modules"] = {variable = true, export = true}, ["lower-if"] = {variable = true}, ["lower-do"] = {variable = true}, ["infix?"] = {variable = true}, precedence = {variable = true}, ["op-delims"] = {variable = true}, ["compile-atom"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {set = {special = function (lh, rh)
    local _g940 = compile(lh)
    local _g1040
    if nil63(rh) then
      _g1040 = "nil"
    else
      _g1040 = rh
    end
    local _g941 = compile(_g1040)
    return(indentation() .. _g940 .. " = " .. _g941)
  end, foo = true, export = true, stmt = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, foo = true, export = true, stmt = true}, ["%global-function"] = {tr = true, export = true, foo = true, stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end}, ["do"] = {tr = true, export = true, foo = true, stmt = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g944 = forms
    local _g945 = 0
    while _g945 < length(_g944) do
      local x = _g944[_g945 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g945 = _g945 + 1
    end
    return(str)
  end}, ["not"] = {}, ["%for"] = {tr = true, export = true, foo = true, stmt = true, special = function (t, k, form)
    local _g947 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g948 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g948
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g947 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g947 .. ") {\n" .. body .. ind .. "}\n")
    end
  end}, error = {special = function (x)
    local _g1041
    if target == "js" then
      _g1041 = "throw new " .. compile({"Error", x})
    else
      _g1041 = "error(" .. compile(x) .. ")"
    end
    local e = _g1041
    return(indentation() .. e)
  end, foo = true, export = true, stmt = true}, ["%try"] = {tr = true, export = true, foo = true, stmt = true, special = function (form)
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
  end}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _g1042
    if target == "lua" then
      _g1042 = "{"
    else
      _g1042 = "["
    end
    local open = _g1042
    local _g1043
    if target == "lua" then
      _g1043 = "}"
    else
      _g1043 = "]"
    end
    local close = _g1043
    local str = ""
    local _g953 = forms
    local i = 0
    while i < length(_g953) do
      local x = _g953[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, get = {foo = true, export = true, special = function (t, k)
    local _g955 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g955, 0) == "{" then
      _g955 = "(" .. _g955 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g955 .. "." .. inner(k))
    else
      return(_g955 .. "[" .. k1 .. "]")
    end
  end}, ["%local-function"] = {tr = true, export = true, foo = true, stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g1044
    if target == "lua" then
      _g1044 = " = "
    else
      _g1044 = ": "
    end
    local sep = _g1044
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g958 = pairs
    local i = 0
    while i < length(_g958) do
      local _g959 = _g958[i + 1]
      local k = _g959[1]
      local v = _g959[2]
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
  end}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g1045
    if is63(value) then
      _g1045 = " = " .. value1
    else
      _g1045 = ""
    end
    local rh = _g1045
    local _g1046
    if target == "js" then
      _g1046 = "var "
    else
      _g1046 = "local "
    end
    local keyword = _g1046
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, export = true, stmt = true}, ["while"] = {tr = true, export = true, foo = true, stmt = true, special = function (cond, form)
    local _g962 = compile(cond)
    indent_level = indent_level + 1
    local _g963 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g963
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g962 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g962 .. " do\n" .. body .. ind .. "end\n")
    end
  end}, ["%if"] = {tr = true, export = true, foo = true, stmt = true, special = function (cond, cons, alt)
    local _g965 = compile(cond)
    indent_level = indent_level + 1
    local _g967 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g966 = _g967
    local _g1047
    if alt then
      indent_level = indent_level + 1
      local _g969 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1047 = _g969
    end
    local _g968 = _g1047
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g965 .. ") {\n" .. _g966 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g965 .. " then\n" .. _g966
    end
    if _g968 and target == "js" then
      str = str .. " else {\n" .. _g968 .. ind .. "}"
    else
      if _g968 then
        str = str .. ind .. "else\n" .. _g968
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end}, ["return"] = {special = function (x)
    local _g1048
    if nil63(x) then
      _g1048 = "return"
    else
      _g1048 = "return(" .. compile(x) .. ")"
    end
    local _g971 = _g1048
    return(indentation() .. _g971)
  end, foo = true, export = true, stmt = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["read-all"] = {variable = true, export = true}, whitespace = {variable = true}, ["flag?"] = {variable = true}, ["read-table"] = {variable = true, export = true}, eof = {variable = true}, ["define-reader"] = {export = true, macro = function (_g973, ...)
    local char = _g973[1]
    local stream = _g973[2]
    local _g972 = unstash({...})
    local body = sub(_g972, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, ["key?"] = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, delimiters = {variable = true}, read = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["read-from-string"] = {variable = true, export = true}, ["make-stream"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {["with-bindings"] = {export = true, macro = function (_g975, ...)
    local names = _g975[1]
    local _g974 = unstash({...})
    local body = sub(_g974, 0)
    local x = make_id()
    local _g977 = {"setenv", x}
    _g977.variable = true
    local _g976 = {"with-frame", {"each", {x}, names, _g977}}
    _g976.scope = true
    return(join(_g976, body))
  end}, unless = {export = true, macro = function (cond, ...)
    local _g978 = unstash({...})
    local body = sub(_g978, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _g980 = unstash({...})
    local body = sub(_g980, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g981 = {"setenv", {"quote", name}}
    _g981.form = {"quote", form}
    _g981.special = form
    eval(join(_g981, keys))
    return(nil)
  end}, define = {export = true, macro = function (name, x, ...)
    local _g982 = unstash({...})
    local body = sub(_g982, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g983 = bind42(x, body)
        local args = _g983[1]
        local _g984 = _g983[2]
        return(link(name, join({"%local-function", name, args}, _g984)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _g985 = unstash({...})
    local body = sub(_g985, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g986 = bind42(x, body)
      local args = _g986[1]
      local _g987 = _g986[2]
      return(join({"%global-function", name, args}, _g987))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _g988 = unstash({...})
    local body = sub(_g988, 0)
    add(environment, {})
    map(function (_g991)
      local name = _g991[1]
      local exp = _g991[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g989 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g989)
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _g994 = unstash({...})
    local body = sub(_g994, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g995 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g995)
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g998 = xs
    local _g999 = 0
    while _g999 < length(_g998) do
      local x = _g998[_g999 + 1]
      l[x] = true
      _g999 = _g999 + 1
    end
    return(join({"table"}, l))
  end}, let = {export = true, macro = function (bindings, ...)
    local _g1000 = unstash({...})
    local body = sub(_g1000, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g1001 = bind(lh, rh)
      local _g1002 = 0
      while _g1002 < length(_g1001) do
        local _g1003 = _g1001[_g1002 + 1]
        local id = _g1003[1]
        local val = _g1003[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g1002 = _g1002 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end}, fn = {export = true, macro = function (args, ...)
    local _g1004 = unstash({...})
    local body = sub(_g1004, 0)
    local _g1005 = bind42(args, body)
    local _g1006 = _g1005[1]
    local _g1007 = _g1005[2]
    return(join({"%function", _g1006}, _g1007))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, each = {export = true, macro = function (b, t, ...)
    local _g1012 = unstash({...})
    local body = sub(_g1012, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g1049
    if nil63(v) then
      local _g1050
      if b.i then
        _g1050 = "i"
      else
        _g1050 = make_id()
      end
      local i = _g1050
      _g1049 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g1013 = {"target"}
      _g1013.lua = {"not", {"number?", k}}
      _g1013.js = {"isNaN", {"parseInt", k}}
      _g1049 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g1013, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1049})
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g1015 = body
      local k = nil
      for k in next, _g1015 do
        if not number63(k) then
          local v = _g1015[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, all = {export = true, macro = function (_g1017, t, ...)
    local k = _g1017[1]
    local v = _g1017[2]
    local _g1016 = unstash({...})
    local body = sub(_g1016, 0)
    local x = make_id()
    local n = make_id()
    local _g1051
    if target == "lua" then
      _g1051 = body
    else
      _g1051 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1051)}})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _g1018 = unstash({...})
    local bs = sub(_g1018, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, when = {export = true, macro = function (cond, ...)
    local _g1019 = unstash({...})
    local body = sub(_g1019, 0)
    return({"if", cond, join({"do"}, body)})
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g1021)
      local a = _g1021[1]
      local b = _g1021[2]
      local c = sub(_g1021, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _g1022 = unstash({...})
    local scope = _g1022.scope
    local body = sub(_g1022, 0)
    local x = make_id()
    local _g1023 = {"table"}
    _g1023._scope = scope
    return({"do", {"add", "environment", _g1023}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _g1025 = unstash({...})
    local body = sub(_g1025, 0)
    local form = join({"fn", args}, body)
    local _g1026 = {"setenv", {"quote", name}}
    _g1026.macro = form
    _g1026.form = {"quote", form}
    eval(_g1026)
    return(nil)
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _g1028 = unstash({...})
    local body = sub(_g1028, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1029 = import_modules(imp)
    local imports = _g1029[1]
    local bindings = _g1029[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1030 = exp or {}
    local _g1031 = 0
    while _g1031 < length(_g1030) do
      local x = _g1030[_g1031 + 1]
      setenv(x, {_stash = true, export = true})
      _g1031 = _g1031 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _g1032 = unstash({...})
    local bs = sub(_g1032, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {reserved = {variable = true}, ["bind*"] = {variable = true, export = true}, extend = {variable = true}, getenv = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["variable?"] = {variable = true, export = true}, ["valid-code?"] = {variable = true}, literal = {variable = true}, ["symbol?"] = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["stash*"] = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, bind = {variable = true, export = true}, exclude = {variable = true}, escape = {variable = true}, quoted = {variable = true, export = true}, link = {variable = true, export = true}, mapo = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-binding"] = {variable = true}, imported = {variable = true, export = true}, ["quoting?"] = {variable = true}, macroexpand = {variable = true, export = true}, indentation = {variable = true, export = true}, ["indent-level"] = {global = true, export = true}, ["quasiquote-list"] = {variable = true}, key = {variable = true, export = true}, id = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, index = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}, ["global?"] = {variable = true}, ["macro-function"] = {variable = true, export = true}, ["special-form?"] = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, bias = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/runtime"] = {export = {["%"] = {variable = true, export = true}, ["id-count"] = {variable = true}, ["module-key"] = {variable = true, export = true}, string = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, sort = {variable = true, export = true}, unstash = {variable = true, export = true}, code = {variable = true, export = true}, add = {variable = true, export = true}, stash = {variable = true, export = true}, apply = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, pair = {variable = true, export = true}, drop = {variable = true, export = true}, map = {variable = true, export = true}, shift = {variable = true}, setenv = {variable = true, export = true}, hd = {variable = true, export = true}, inner = {variable = true, export = true}, length = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, last = {variable = true, export = true}, number = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, cat = {variable = true, export = true}, char = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, reduce = {variable = true, export = true}, join = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, tl = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, keep = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, series = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, space = {variable = true, export = true}, find = {variable = true, export = true}, split = {variable = true, export = true}, now = {variable = true, export = true}, module = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, today = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, write = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, reverse = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, sub = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, iterate = {variable = true, export = true}, substring = {variable = true, export = true}, [">"] = {variable = true, export = true}, replicate = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, exit = {variable = true, export = true}, keys = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, search = {variable = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _g1036 = unstash({...})
    local body = sub(_g1036, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1037 = import_modules(imp)
    local imports = _g1037[1]
    local bindings = _g1037[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1038 = exp or {}
    local _g1039 = 0
    while _g1039 < length(_g1038) do
      local x = _g1038[_g1039 + 1]
      setenv(x, {_stash = true, export = true})
      _g1039 = _g1039 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g1052 = nexus["lumen/runtime"]
  local _37 = _g1052["%"]
  local module_key = _g1052["module-key"]
  local string = _g1052.string
  local in63 = _g1052["in?"]
  local sort = _g1052.sort
  local unstash = _g1052.unstash
  local code = _g1052.code
  local add = _g1052.add
  local stash = _g1052.stash
  local apply = _g1052.apply
  local number63 = _g1052["number?"]
  local _60 = _g1052["<"]
  local nil63 = _g1052["nil?"]
  local pair = _g1052.pair
  local drop = _g1052.drop
  local map = _g1052.map
  local setenv = _g1052.setenv
  local hd = _g1052.hd
  local inner = _g1052.inner
  local length = _g1052.length
  local _ = _g1052["-"]
  local _42 = _g1052["*"]
  local _43 = _g1052["+"]
  local table63 = _g1052["table?"]
  local one63 = _g1052["one?"]
  local _47 = _g1052["/"]
  local last = _g1052.last
  local number = _g1052.number
  local make_id = _g1052["make-id"]
  local cat = _g1052.cat
  local char = _g1052.char
  local _6261 = _g1052[">="]
  local atom63 = _g1052["atom?"]
  local reduce = _g1052.reduce
  local join = _g1052.join
  local write_file = _g1052["write-file"]
  local tl = _g1052.tl
  local boolean63 = _g1052["boolean?"]
  local keep = _g1052.keep
  local id_literal63 = _g1052["id-literal?"]
  local series = _g1052.series
  local read_file = _g1052["read-file"]
  local space = _g1052.space
  local find = _g1052.find
  local split = _g1052.split
  local now = _g1052.now
  local module = _g1052.module
  local toplevel63 = _g1052["toplevel?"]
  local _37message_handler = _g1052["%message-handler"]
  local today = _g1052.today
  local is63 = _g1052["is?"]
  local write = _g1052.write
  local composite63 = _g1052["composite?"]
  local reverse = _g1052.reverse
  local string63 = _g1052["string?"]
  local _61 = _g1052["="]
  local sub = _g1052.sub
  local _6061 = _g1052["<="]
  local keys63 = _g1052["keys?"]
  local iterate = _g1052.iterate
  local substring = _g1052.substring
  local _62 = _g1052[">"]
  local replicate = _g1052.replicate
  local none63 = _g1052["none?"]
  local empty63 = _g1052["empty?"]
  local some63 = _g1052["some?"]
  local list63 = _g1052["list?"]
  local function63 = _g1052["function?"]
  local exit = _g1052.exit
  local keys = _g1052.keys
  local string_literal63 = _g1052["string-literal?"]
  local search = _g1052.search
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local _37 = _g2["%"]
  local module_key = _g2["module-key"]
  local string = _g2.string
  local in63 = _g2["in?"]
  local sort = _g2.sort
  local unstash = _g2.unstash
  local code = _g2.code
  local add = _g2.add
  local replicate = _g2.replicate
  local module = _g2.module
  local number63 = _g2["number?"]
  local _60 = _g2["<"]
  local nil63 = _g2["nil?"]
  local keys = _g2.keys
  local drop = _g2.drop
  local map = _g2.map
  local setenv = _g2.setenv
  local hd = _g2.hd
  local inner = _g2.inner
  local length = _g2.length
  local keys63 = _g2["keys?"]
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local table63 = _g2["table?"]
  local one63 = _g2["one?"]
  local _47 = _g2["/"]
  local last = _g2.last
  local number = _g2.number
  local make_id = _g2["make-id"]
  local cat = _g2.cat
  local char = _g2.char
  local _6261 = _g2[">="]
  local atom63 = _g2["atom?"]
  local reduce = _g2.reduce
  local join = _g2.join
  local write_file = _g2["write-file"]
  local tl = _g2.tl
  local boolean63 = _g2["boolean?"]
  local sub = _g2.sub
  local id_literal63 = _g2["id-literal?"]
  local series = _g2.series
  local read_file = _g2["read-file"]
  local space = _g2.space
  local substring = _g2.substring
  local split = _g2.split
  local now = _g2.now
  local string63 = _g2["string?"]
  local pair = _g2.pair
  local find = _g2.find
  local empty63 = _g2["empty?"]
  local is63 = _g2["is?"]
  local composite63 = _g2["composite?"]
  local _6061 = _g2["<="]
  local reverse = _g2.reverse
  local _37message_handler = _g2["%message-handler"]
  local none63 = _g2["none?"]
  local today = _g2.today
  local apply = _g2.apply
  local write = _g2.write
  local iterate = _g2.iterate
  local _ = _g2["-"]
  local toplevel63 = _g2["toplevel?"]
  local keep = _g2.keep
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local some63 = _g2["some?"]
  local list63 = _g2["list?"]
  local function63 = _g2["function?"]
  local exit = _g2.exit
  local stash = _g2.stash
  local string_literal63 = _g2["string-literal?"]
  local search = _g2.search
  local _g5 = nexus["lumen/reader"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local _g6 = nexus["lumen/compiler"]
  local declare = _g6.declare
  local eval = _g6.eval
  local compile_function = _g6["compile-function"]
  local in_module = _g6["in-module"]
  local load_module = _g6["load-module"]
  local compile_module = _g6["compile-module"]
  local open_module = _g6["open-module"]
  local compile = _g6.compile
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g1057,_g1058 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g1056 = {_g1057, _g1058}
    local _g1 = _g1056[1]
    local x = _g1056[2]
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
    local _g1064 = args
    local i = 0
    while i < length(_g1064) do
      local arg = _g1064[i + 1]
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
