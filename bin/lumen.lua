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
  local in63 = _g149["in?"]
  local cat = _g149.cat
  local stash = _g149.stash
  local map = _g149.map
  local _62 = _g149[">"]
  local boolean63 = _g149["boolean?"]
  local _60 = _g149["<"]
  local exit = _g149.exit
  local string_literal63 = _g149["string-literal?"]
  local _6261 = _g149[">="]
  local _37 = _g149["%"]
  local _43 = _g149["+"]
  local _42 = _g149["*"]
  local _47 = _g149["/"]
  local _ = _g149["-"]
  local string63 = _g149["string?"]
  local char = _g149.char
  local find = _g149.find
  local make_id = _g149["make-id"]
  local is63 = _g149["is?"]
  local setenv = _g149.setenv
  local sort = _g149.sort
  local sub = _g149.sub
  local reverse = _g149.reverse
  local replicate = _g149.replicate
  local id_literal63 = _g149["id-literal?"]
  local toplevel63 = _g149["toplevel?"]
  local tl = _g149.tl
  local add = _g149.add
  local drop = _g149.drop
  local apply = _g149.apply
  local hd = _g149.hd
  local substring = _g149.substring
  local none63 = _g149["none?"]
  local series = _g149.series
  local number63 = _g149["number?"]
  local one63 = _g149["one?"]
  local write_file = _g149["write-file"]
  local function63 = _g149["function?"]
  local table63 = _g149["table?"]
  local join = _g149.join
  local composite63 = _g149["composite?"]
  local string = _g149.string
  local keep = _g149.keep
  local reduce = _g149.reduce
  local keys = _g149.keys
  local write = _g149.write
  local list63 = _g149["list?"]
  local module_key = _g149["module-key"]
  local inner = _g149.inner
  local last = _g149.last
  local module = _g149.module
  local _61 = _g149["="]
  local space = _g149.space
  local atom63 = _g149["atom?"]
  local nil63 = _g149["nil?"]
  local empty63 = _g149["empty?"]
  local number = _g149.number
  local unstash = _g149.unstash
  local now = _g149.now
  local length = _g149.length
  local pair = _g149.pair
  local today = _g149.today
  local search = _g149.search
  local split = _g149.split
  local read_file = _g149["read-file"]
  local _6061 = _g149["<="]
  local _37message_handler = _g149["%message-handler"]
  local code = _g149.code
  local iterate = _g149.iterate
  local some63 = _g149["some?"]
  local keys63 = _g149["keys?"]
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
      return(k - 1)
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
  local reserved = {["="] = true, ["do"] = true, ["this"] = true, ["void"] = true, ["catch"] = true, ["=="] = true, ["repeat"] = true, ["try"] = true, ["local"] = true, ["-"] = true, ["/"] = true, ["while"] = true, ["break"] = true, ["%"] = true, ["instanceof"] = true, ["+"] = true, ["elseif"] = true, ["<"] = true, [">"] = true, ["for"] = true, ["switch"] = true, ["until"] = true, ["true"] = true, ["or"] = true, ["not"] = true, ["delete"] = true, ["function"] = true, ["false"] = true, ["default"] = true, ["nil"] = true, [">="] = true, ["else"] = true, ["<="] = true, ["in"] = true, ["throw"] = true, ["finally"] = true, ["if"] = true, ["end"] = true, ["var"] = true, ["typeof"] = true, ["case"] = true, ["continue"] = true, ["then"] = true, ["new"] = true, ["with"] = true, ["return"] = true, ["debugger"] = true, ["*"] = true, ["and"] = true}
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
  local in63 = _g248["in?"]
  local cat = _g248.cat
  local stash = _g248.stash
  local map = _g248.map
  local _62 = _g248[">"]
  local boolean63 = _g248["boolean?"]
  local _60 = _g248["<"]
  local exit = _g248.exit
  local string_literal63 = _g248["string-literal?"]
  local _6261 = _g248[">="]
  local _37 = _g248["%"]
  local _43 = _g248["+"]
  local _42 = _g248["*"]
  local _47 = _g248["/"]
  local _ = _g248["-"]
  local string63 = _g248["string?"]
  local char = _g248.char
  local find = _g248.find
  local make_id = _g248["make-id"]
  local is63 = _g248["is?"]
  local setenv = _g248.setenv
  local sort = _g248.sort
  local sub = _g248.sub
  local reverse = _g248.reverse
  local replicate = _g248.replicate
  local id_literal63 = _g248["id-literal?"]
  local toplevel63 = _g248["toplevel?"]
  local tl = _g248.tl
  local add = _g248.add
  local drop = _g248.drop
  local apply = _g248.apply
  local hd = _g248.hd
  local substring = _g248.substring
  local none63 = _g248["none?"]
  local series = _g248.series
  local number63 = _g248["number?"]
  local one63 = _g248["one?"]
  local write_file = _g248["write-file"]
  local function63 = _g248["function?"]
  local table63 = _g248["table?"]
  local join = _g248.join
  local composite63 = _g248["composite?"]
  local string = _g248.string
  local keep = _g248.keep
  local reduce = _g248.reduce
  local keys = _g248.keys
  local write = _g248.write
  local list63 = _g248["list?"]
  local module_key = _g248["module-key"]
  local inner = _g248.inner
  local last = _g248.last
  local module = _g248.module
  local _61 = _g248["="]
  local space = _g248.space
  local atom63 = _g248["atom?"]
  local nil63 = _g248["nil?"]
  local empty63 = _g248["empty?"]
  local number = _g248.number
  local unstash = _g248.unstash
  local now = _g248.now
  local length = _g248.length
  local pair = _g248.pair
  local today = _g248.today
  local search = _g248.search
  local split = _g248.split
  local read_file = _g248["read-file"]
  local _6061 = _g248["<="]
  local _37message_handler = _g248["%message-handler"]
  local code = _g248.code
  local iterate = _g248.iterate
  local some63 = _g248["some?"]
  local keys63 = _g248["keys?"]
  local delimiters = {["\n"] = true, [";"] = true, ["("] = true, [")"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
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
  local _g277 = nexus["lumen/runtime"]
  local in63 = _g277["in?"]
  local cat = _g277.cat
  local stash = _g277.stash
  local map = _g277.map
  local _62 = _g277[">"]
  local boolean63 = _g277["boolean?"]
  local _60 = _g277["<"]
  local exit = _g277.exit
  local string_literal63 = _g277["string-literal?"]
  local _6261 = _g277[">="]
  local _37 = _g277["%"]
  local _43 = _g277["+"]
  local _42 = _g277["*"]
  local _47 = _g277["/"]
  local _ = _g277["-"]
  local string63 = _g277["string?"]
  local char = _g277.char
  local find = _g277.find
  local make_id = _g277["make-id"]
  local is63 = _g277["is?"]
  local setenv = _g277.setenv
  local sort = _g277.sort
  local sub = _g277.sub
  local reverse = _g277.reverse
  local replicate = _g277.replicate
  local id_literal63 = _g277["id-literal?"]
  local toplevel63 = _g277["toplevel?"]
  local tl = _g277.tl
  local add = _g277.add
  local drop = _g277.drop
  local apply = _g277.apply
  local hd = _g277.hd
  local substring = _g277.substring
  local none63 = _g277["none?"]
  local series = _g277.series
  local number63 = _g277["number?"]
  local one63 = _g277["one?"]
  local write_file = _g277["write-file"]
  local function63 = _g277["function?"]
  local table63 = _g277["table?"]
  local join = _g277.join
  local composite63 = _g277["composite?"]
  local string = _g277.string
  local keep = _g277.keep
  local reduce = _g277.reduce
  local keys = _g277.keys
  local write = _g277.write
  local list63 = _g277["list?"]
  local module_key = _g277["module-key"]
  local inner = _g277.inner
  local last = _g277.last
  local module = _g277.module
  local _61 = _g277["="]
  local space = _g277.space
  local atom63 = _g277["atom?"]
  local nil63 = _g277["nil?"]
  local empty63 = _g277["empty?"]
  local number = _g277.number
  local unstash = _g277.unstash
  local now = _g277.now
  local length = _g277.length
  local pair = _g277.pair
  local today = _g277.today
  local search = _g277.search
  local split = _g277.split
  local read_file = _g277["read-file"]
  local _6061 = _g277["<="]
  local _37message_handler = _g277["%message-handler"]
  local code = _g277.code
  local iterate = _g277.iterate
  local some63 = _g277["some?"]
  local keys63 = _g277["keys?"]
  local _g280 = nexus["lumen/lib"]
  local bound63 = _g280["bound?"]
  local key = _g280.key
  local quote_environment = _g280["quote-environment"]
  local id = _g280.id
  local mapo = _g280.mapo
  local macroexpand = _g280.macroexpand
  local symbol_expansion = _g280["symbol-expansion"]
  local special63 = _g280["special?"]
  local index = _g280.index
  local macro_function = _g280["macro-function"]
  local quoted = _g280.quoted
  local quote_modules = _g280["quote-modules"]
  local bind42 = _g280["bind*"]
  local bind = _g280.bind
  local valid_id63 = _g280["valid-id?"]
  local variable63 = _g280["variable?"]
  local getenv = _g280.getenv
  local imported = _g280.imported
  local special_form63 = _g280["special-form?"]
  local quasiexpand = _g280.quasiexpand
  local statement63 = _g280["statement?"]
  local indentation = _g280.indentation
  local link = _g280.link
  local symbol63 = _g280["symbol?"]
  local macro63 = _g280["macro?"]
  local initial_environment = _g280["initial-environment"]
  local stash42 = _g280["stash*"]
  local reserved63 = _g280["reserved?"]
  local _g281 = nexus["lumen/reader"]
  local read_table = _g281["read-table"]
  local read_from_string = _g281["read-from-string"]
  local make_stream = _g281["make-stream"]
  local read = _g281.read
  local read_all = _g281["read-all"]
  local _g285 = {}
  _g285.js = "!"
  _g285.lua = "not "
  local _g283 = {}
  local _g286 = {}
  _g286.js = "!"
  _g286.lua = "not "
  _g283["not"] = _g286
  local _g288 = {}
  _g288["/"] = true
  _g288["*"] = true
  _g288["%"] = true
  local _g290 = {}
  _g290["+"] = true
  _g290["-"] = true
  local _g294 = {}
  _g294.js = "+"
  _g294.lua = ".."
  local _g292 = {}
  local _g295 = {}
  _g295.js = "+"
  _g295.lua = ".."
  _g292.cat = _g295
  local _g297 = {}
  _g297["<="] = true
  _g297[">"] = true
  _g297[">="] = true
  _g297["<"] = true
  local _g301 = {}
  _g301.js = "==="
  _g301.lua = "=="
  local _g303 = {}
  _g303.js = "!="
  _g303.lua = "~="
  local _g299 = {}
  local _g304 = {}
  _g304.js = "==="
  _g304.lua = "=="
  _g299["="] = _g304
  local _g305 = {}
  _g305.js = "!="
  _g305.lua = "~="
  _g299["~="] = _g305
  local _g309 = {}
  _g309.js = "&&"
  _g309.lua = "and"
  local _g307 = {}
  local _g310 = {}
  _g310.js = "&&"
  _g310.lua = "and"
  _g307["and"] = _g310
  local _g314 = {}
  _g314.js = "||"
  _g314.lua = "or"
  local _g312 = {}
  local _g315 = {}
  _g315.js = "||"
  _g315.lua = "or"
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
    local name = _g339.name
    local prefix = _g339.prefix
    local _g392
    if name then
      _g392 = compile(name)
    else
      _g392 = ""
    end
    local id = _g392
    local _g340 = prefix or ""
    local _g341 = compile_args(args)
    indent_level = indent_level + 1
    local _g343 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g342 = _g343
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
        local _g346 = _g395
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
    local n = length(args) - 1
    local _g350 = args
    local k = nil
    for k in next, _g350 do
      local x = _g350[k]
      if number63(k) and index(k) < n then
        add(hoist, lower(x, hoist, stmt63))
      end
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
      local _g398
      if _g354 then
        _g398 = {lower_body({_g354}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g353}, tail63)}, _g398)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g397
      if _g354 then
        _g397 = {lower({"set", e, _g354})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g353})}, _g397))
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
    local private = _g377.private
    local m = module(spec)
    local frame = last(environment)
    local _g378 = m.export
    local k = nil
    for k in next, _g378 do
      local v = _g378[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g380 = unstash({...})
    local private = _g380.private
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, private = private}))
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  local function in_module(spec)
    load_module(spec, {_stash = true, private = true})
    local m = module(spec)
    series(open_module, m.import)
    current_module = spec
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    series(function (spec)
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
    end, specs or {})
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
  local in63 = _g400["in?"]
  local cat = _g400.cat
  local stash = _g400.stash
  local map = _g400.map
  local _62 = _g400[">"]
  local boolean63 = _g400["boolean?"]
  local _60 = _g400["<"]
  local exit = _g400.exit
  local string_literal63 = _g400["string-literal?"]
  local _6261 = _g400[">="]
  local _37 = _g400["%"]
  local _43 = _g400["+"]
  local _42 = _g400["*"]
  local _47 = _g400["/"]
  local _ = _g400["-"]
  local string63 = _g400["string?"]
  local char = _g400.char
  local find = _g400.find
  local make_id = _g400["make-id"]
  local is63 = _g400["is?"]
  local setenv = _g400.setenv
  local sort = _g400.sort
  local sub = _g400.sub
  local reverse = _g400.reverse
  local replicate = _g400.replicate
  local id_literal63 = _g400["id-literal?"]
  local toplevel63 = _g400["toplevel?"]
  local tl = _g400.tl
  local add = _g400.add
  local drop = _g400.drop
  local apply = _g400.apply
  local hd = _g400.hd
  local substring = _g400.substring
  local none63 = _g400["none?"]
  local series = _g400.series
  local number63 = _g400["number?"]
  local one63 = _g400["one?"]
  local write_file = _g400["write-file"]
  local function63 = _g400["function?"]
  local table63 = _g400["table?"]
  local join = _g400.join
  local composite63 = _g400["composite?"]
  local string = _g400.string
  local keep = _g400.keep
  local reduce = _g400.reduce
  local keys = _g400.keys
  local write = _g400.write
  local list63 = _g400["list?"]
  local module_key = _g400["module-key"]
  local inner = _g400.inner
  local last = _g400.last
  local module = _g400.module
  local _61 = _g400["="]
  local space = _g400.space
  local atom63 = _g400["atom?"]
  local nil63 = _g400["nil?"]
  local empty63 = _g400["empty?"]
  local number = _g400.number
  local unstash = _g400.unstash
  local now = _g400.now
  local length = _g400.length
  local pair = _g400.pair
  local today = _g400.today
  local search = _g400.search
  local split = _g400.split
  local read_file = _g400["read-file"]
  local _6061 = _g400["<="]
  local _37message_handler = _g400["%message-handler"]
  local code = _g400.code
  local iterate = _g400.iterate
  local some63 = _g400["some?"]
  local keys63 = _g400["keys?"]
  local _g403 = nexus["lumen/lib"]
  local bound63 = _g403["bound?"]
  local key = _g403.key
  local quote_environment = _g403["quote-environment"]
  local id = _g403.id
  local mapo = _g403.mapo
  local macroexpand = _g403.macroexpand
  local symbol_expansion = _g403["symbol-expansion"]
  local special63 = _g403["special?"]
  local index = _g403.index
  local macro_function = _g403["macro-function"]
  local quoted = _g403.quoted
  local quote_modules = _g403["quote-modules"]
  local bind42 = _g403["bind*"]
  local bind = _g403.bind
  local valid_id63 = _g403["valid-id?"]
  local variable63 = _g403["variable?"]
  local getenv = _g403.getenv
  local imported = _g403.imported
  local special_form63 = _g403["special-form?"]
  local quasiexpand = _g403.quasiexpand
  local statement63 = _g403["statement?"]
  local indentation = _g403.indentation
  local link = _g403.link
  local symbol63 = _g403["symbol?"]
  local macro63 = _g403["macro?"]
  local initial_environment = _g403["initial-environment"]
  local stash42 = _g403["stash*"]
  local reserved63 = _g403["reserved?"]
  local _g404 = nexus["lumen/compiler"]
  local import_modules = _g404["import-modules"]
  local in_module = _g404["in-module"]
  local compile = _g404.compile
  local load_module = _g404["load-module"]
  local compile_module = _g404["compile-module"]
  local compile_function = _g404["compile-function"]
  local eval = _g404.eval
  local declare = _g404.declare
  local open_module = _g404["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g591 = nexus["lumen/runtime"]
  local in63 = _g591["in?"]
  local cat = _g591.cat
  local stash = _g591.stash
  local map = _g591.map
  local _62 = _g591[">"]
  local boolean63 = _g591["boolean?"]
  local _60 = _g591["<"]
  local exit = _g591.exit
  local string_literal63 = _g591["string-literal?"]
  local _6261 = _g591[">="]
  local _37 = _g591["%"]
  local _43 = _g591["+"]
  local _42 = _g591["*"]
  local _47 = _g591["/"]
  local _ = _g591["-"]
  local string63 = _g591["string?"]
  local char = _g591.char
  local find = _g591.find
  local make_id = _g591["make-id"]
  local is63 = _g591["is?"]
  local setenv = _g591.setenv
  local sort = _g591.sort
  local sub = _g591.sub
  local reverse = _g591.reverse
  local replicate = _g591.replicate
  local id_literal63 = _g591["id-literal?"]
  local toplevel63 = _g591["toplevel?"]
  local tl = _g591.tl
  local add = _g591.add
  local drop = _g591.drop
  local apply = _g591.apply
  local hd = _g591.hd
  local substring = _g591.substring
  local none63 = _g591["none?"]
  local series = _g591.series
  local number63 = _g591["number?"]
  local one63 = _g591["one?"]
  local write_file = _g591["write-file"]
  local function63 = _g591["function?"]
  local table63 = _g591["table?"]
  local join = _g591.join
  local composite63 = _g591["composite?"]
  local string = _g591.string
  local keep = _g591.keep
  local reduce = _g591.reduce
  local keys = _g591.keys
  local write = _g591.write
  local list63 = _g591["list?"]
  local module_key = _g591["module-key"]
  local inner = _g591.inner
  local last = _g591.last
  local module = _g591.module
  local _61 = _g591["="]
  local space = _g591.space
  local atom63 = _g591["atom?"]
  local nil63 = _g591["nil?"]
  local empty63 = _g591["empty?"]
  local number = _g591.number
  local unstash = _g591.unstash
  local now = _g591.now
  local length = _g591.length
  local pair = _g591.pair
  local today = _g591.today
  local search = _g591.search
  local split = _g591.split
  local read_file = _g591["read-file"]
  local _6061 = _g591["<="]
  local _37message_handler = _g591["%message-handler"]
  local code = _g591.code
  local iterate = _g591.iterate
  local some63 = _g591["some?"]
  local keys63 = _g591["keys?"]
  local _g594 = nexus["lumen/lib"]
  local bound63 = _g594["bound?"]
  local key = _g594.key
  local quote_environment = _g594["quote-environment"]
  local id = _g594.id
  local mapo = _g594.mapo
  local macroexpand = _g594.macroexpand
  local symbol_expansion = _g594["symbol-expansion"]
  local special63 = _g594["special?"]
  local index = _g594.index
  local macro_function = _g594["macro-function"]
  local quoted = _g594.quoted
  local quote_modules = _g594["quote-modules"]
  local bind42 = _g594["bind*"]
  local bind = _g594.bind
  local valid_id63 = _g594["valid-id?"]
  local variable63 = _g594["variable?"]
  local getenv = _g594.getenv
  local imported = _g594.imported
  local special_form63 = _g594["special-form?"]
  local quasiexpand = _g594.quasiexpand
  local statement63 = _g594["statement?"]
  local indentation = _g594.indentation
  local link = _g594.link
  local symbol63 = _g594["symbol?"]
  local macro63 = _g594["macro?"]
  local initial_environment = _g594["initial-environment"]
  local stash42 = _g594["stash*"]
  local reserved63 = _g594["reserved?"]
  local _g595 = nexus["lumen/compiler"]
  local import_modules = _g595["import-modules"]
  local in_module = _g595["in-module"]
  local compile = _g595.compile
  local load_module = _g595["load-module"]
  local compile_module = _g595["compile-module"]
  local compile_function = _g595["compile-function"]
  local eval = _g595.eval
  local declare = _g595.declare
  local open_module = _g595["open-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g918 = nexus["lumen/runtime"]
  local in63 = _g918["in?"]
  local cat = _g918.cat
  local stash = _g918.stash
  local map = _g918.map
  local _62 = _g918[">"]
  local boolean63 = _g918["boolean?"]
  local _60 = _g918["<"]
  local exit = _g918.exit
  local string_literal63 = _g918["string-literal?"]
  local _6261 = _g918[">="]
  local _37 = _g918["%"]
  local _43 = _g918["+"]
  local _42 = _g918["*"]
  local _47 = _g918["/"]
  local _ = _g918["-"]
  local string63 = _g918["string?"]
  local char = _g918.char
  local find = _g918.find
  local make_id = _g918["make-id"]
  local is63 = _g918["is?"]
  local setenv = _g918.setenv
  local sort = _g918.sort
  local sub = _g918.sub
  local reverse = _g918.reverse
  local replicate = _g918.replicate
  local id_literal63 = _g918["id-literal?"]
  local toplevel63 = _g918["toplevel?"]
  local tl = _g918.tl
  local add = _g918.add
  local drop = _g918.drop
  local apply = _g918.apply
  local hd = _g918.hd
  local substring = _g918.substring
  local none63 = _g918["none?"]
  local series = _g918.series
  local number63 = _g918["number?"]
  local one63 = _g918["one?"]
  local write_file = _g918["write-file"]
  local function63 = _g918["function?"]
  local table63 = _g918["table?"]
  local join = _g918.join
  local composite63 = _g918["composite?"]
  local string = _g918.string
  local keep = _g918.keep
  local reduce = _g918.reduce
  local keys = _g918.keys
  local write = _g918.write
  local list63 = _g918["list?"]
  local module_key = _g918["module-key"]
  local inner = _g918.inner
  local last = _g918.last
  local module = _g918.module
  local _61 = _g918["="]
  local space = _g918.space
  local atom63 = _g918["atom?"]
  local nil63 = _g918["nil?"]
  local empty63 = _g918["empty?"]
  local number = _g918.number
  local unstash = _g918.unstash
  local now = _g918.now
  local length = _g918.length
  local pair = _g918.pair
  local today = _g918.today
  local search = _g918.search
  local split = _g918.split
  local read_file = _g918["read-file"]
  local _6061 = _g918["<="]
  local _37message_handler = _g918["%message-handler"]
  local code = _g918.code
  local iterate = _g918.iterate
  local some63 = _g918["some?"]
  local keys63 = _g918["keys?"]
  local _g921 = nexus["lumen/lib"]
  local bound63 = _g921["bound?"]
  local key = _g921.key
  local quote_environment = _g921["quote-environment"]
  local id = _g921.id
  local mapo = _g921.mapo
  local macroexpand = _g921.macroexpand
  local symbol_expansion = _g921["symbol-expansion"]
  local special63 = _g921["special?"]
  local index = _g921.index
  local macro_function = _g921["macro-function"]
  local quoted = _g921.quoted
  local quote_modules = _g921["quote-modules"]
  local bind42 = _g921["bind*"]
  local bind = _g921.bind
  local valid_id63 = _g921["valid-id?"]
  local variable63 = _g921["variable?"]
  local getenv = _g921.getenv
  local imported = _g921.imported
  local special_form63 = _g921["special-form?"]
  local quasiexpand = _g921.quasiexpand
  local statement63 = _g921["statement?"]
  local indentation = _g921.indentation
  local link = _g921.link
  local symbol63 = _g921["symbol?"]
  local macro63 = _g921["macro?"]
  local initial_environment = _g921["initial-environment"]
  local stash42 = _g921["stash*"]
  local reserved63 = _g921["reserved?"]
  local _g922 = nexus["lumen/compiler"]
  local import_modules = _g922["import-modules"]
  local in_module = _g922["in-module"]
  local compile = _g922.compile
  local load_module = _g922["load-module"]
  local compile_module = _g922["compile-module"]
  local compile_function = _g922["compile-function"]
  local eval = _g922.eval
  local declare = _g922.declare
  local open_module = _g922["open-module"]
  modules = {["lumen/boot"] = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _g940 = unstash({...})
    local body = sub(_g940, 0)
    local form = join({"fn", args}, body)
    local _g941 = {"setenv", {"quote", name}}
    _g941.form = {"quote", form}
    _g941.macro = form
    eval(_g941)
    return(nil)
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g943)
      local a = _g943[1]
      local b = _g943[2]
      local c = sub(_g943, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _g945 = unstash({...})
    local body = sub(_g945, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(body) then
      local _g946 = bind42(x, body)
      local args = _g946[1]
      local _g947 = _g946[2]
      return(join({"%global-function", name, args}, _g947))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, when = {export = true, macro = function (cond, ...)
    local _g949 = unstash({...})
    local body = sub(_g949, 0)
    return({"if", cond, join({"do"}, body)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _g950 = unstash({...})
    local bs = sub(_g950, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _g951 = unstash({...})
    local body = sub(_g951, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g952 = import_modules(imp)
    local imports = _g952[1]
    local bindings = _g952[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g953 = exp or {}
    local _g954 = 0
    while _g954 < length(_g953) do
      local x = _g953[_g954 + 1]
      setenv(x, {_stash = true, export = true})
      _g954 = _g954 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["with-bindings"] = {export = true, macro = function (_g956, ...)
    local names = _g956[1]
    local _g955 = unstash({...})
    local body = sub(_g955, 0)
    local x = make_id()
    local _g958 = {"setenv", x}
    _g958.variable = true
    local _g957 = {"with-frame", {"each", {x}, names, _g958}}
    _g957.scope = true
    return(join(_g957, body))
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _g960 = unstash({...})
    local bs = sub(_g960, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g961 = body
      local k = nil
      for k in next, _g961 do
        if not number63(k) then
          local v = _g961[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local _g962 = unstash({...})
    local body = sub(_g962, 0)
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
      local _g963 = {"target"}
      _g963.js = {"isNaN", {"parseInt", k}}
      _g963.lua = {"not", {"number?", k}}
      _g1038 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g963, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1038})
  end}, all = {export = true, macro = function (_g965, t, ...)
    local k = _g965[1]
    local v = _g965[2]
    local _g964 = unstash({...})
    local body = sub(_g964, 0)
    local x = make_id()
    local n = make_id()
    local _g1040
    if target == "lua" then
      _g1040 = body
    else
      _g1040 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1040)}})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _g968 = unstash({...})
    local scope = _g968.scope
    local body = sub(_g968, 0)
    local x = make_id()
    local _g969 = {"table"}
    _g969._scope = scope
    return({"do", {"add", "environment", _g969}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _g971 = unstash({...})
    local body = sub(_g971, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g972 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g972)
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, define = {export = true, macro = function (name, x, ...)
    local _g974 = unstash({...})
    local body = sub(_g974, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g975 = bind42(x, body)
        local args = _g975[1]
        local _g976 = _g975[2]
        return(link(name, join({"%local-function", name, args}, _g976)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, unless = {export = true, macro = function (cond, ...)
    local _g977 = unstash({...})
    local body = sub(_g977, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _g980 = unstash({...})
    local body = sub(_g980, 0)
    add(environment, {})
    map(function (_g983)
      local name = _g983[1]
      local exp = _g983[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g981 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g981)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _g984 = unstash({...})
    local body = sub(_g984, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g985 = {"setenv", {"quote", name}}
    _g985.form = {"quote", form}
    _g985.special = form
    eval(join(_g985, keys))
    return(nil)
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, let = {export = true, macro = function (bindings, ...)
    local _g987 = unstash({...})
    local body = sub(_g987, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g988 = bind(lh, rh)
      local _g989 = 0
      while _g989 < length(_g988) do
        local _g990 = _g988[_g989 + 1]
        local id = _g990[1]
        local val = _g990[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g989 = _g989 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end}, fn = {export = true, macro = function (args, ...)
    local _g991 = unstash({...})
    local body = sub(_g991, 0)
    local _g992 = bind42(args, body)
    local _g993 = _g992[1]
    local _g994 = _g992[2]
    return(join({"%function", _g993}, _g994))
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g996 = xs
    local _g997 = 0
    while _g997 < length(_g996) do
      local x = _g996[_g997 + 1]
      l[x] = true
      _g997 = _g997 + 1
    end
    return(join({"table"}, l))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/runtime"] = {export = {["in?"] = {variable = true, export = true}, cat = {variable = true, export = true}, stash = {variable = true, export = true}, map = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, ["<"] = {variable = true, export = true}, exit = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, char = {variable = true, export = true}, find = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, setenv = {variable = true, export = true}, shift = {variable = true}, sort = {variable = true, export = true}, sub = {variable = true, export = true}, reverse = {variable = true, export = true}, replicate = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, tl = {variable = true, export = true}, add = {variable = true, export = true}, drop = {variable = true, export = true}, apply = {variable = true, export = true}, hd = {variable = true, export = true}, substring = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, series = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, join = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, string = {variable = true, export = true}, keep = {variable = true, export = true}, reduce = {variable = true, export = true}, keys = {variable = true, export = true}, write = {variable = true, export = true}, ["id-count"] = {variable = true}, ["list?"] = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, inner = {variable = true, export = true}, last = {variable = true, export = true}, module = {variable = true, export = true}, ["="] = {variable = true, export = true}, space = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, number = {variable = true, export = true}, unstash = {variable = true, export = true}, now = {variable = true, export = true}, length = {variable = true, export = true}, pair = {variable = true, export = true}, today = {variable = true, export = true}, search = {variable = true, export = true}, split = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, code = {variable = true, export = true}, iterate = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%if"] = {special = function (cond, cons, alt)
    local _g999 = compile(cond)
    indent_level = indent_level + 1
    local _g1001 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g1000 = _g1001
    local _g1041
    if alt then
      indent_level = indent_level + 1
      local _g1003 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1041 = _g1003
    end
    local _g1002 = _g1041
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g999 .. ") {\n" .. _g1000 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g999 .. " then\n" .. _g1000
    end
    if _g1002 and target == "js" then
      str = str .. " else {\n" .. _g1002 .. ind .. "}"
    else
      if _g1002 then
        str = str .. ind .. "else\n" .. _g1002
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, export = true, tr = true, foo = true}, error = {special = function (x)
    local _g1042
    if target == "js" then
      _g1042 = "throw new " .. compile({"Error", x})
    else
      _g1042 = "error(" .. compile(x) .. ")"
    end
    local e = _g1042
    return(indentation() .. e)
  end, stmt = true, export = true, foo = true}, ["do"] = {special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g1005 = forms
    local _g1006 = 0
    while _g1006 < length(_g1005) do
      local x = _g1005[_g1006 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g1006 = _g1006 + 1
    end
    return(str)
  end, stmt = true, export = true, tr = true, foo = true}, ["%local-function"] = {special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, export = true, tr = true, foo = true}, ["%try"] = {special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1009 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1009
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g1010 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g1010
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, export = true, tr = true, foo = true}, set = {special = function (lh, rh)
    local _g1012 = compile(lh)
    local _g1043
    if nil63(rh) then
      _g1043 = "nil"
    else
      _g1043 = rh
    end
    local _g1013 = compile(_g1043)
    return(indentation() .. _g1012 .. " = " .. _g1013)
  end, stmt = true, export = true, foo = true}, ["%global-function"] = {special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, export = true, tr = true, foo = true}, ["%object"] = {special = function (...)
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
    local _g1015 = pairs
    local i = 0
    while i < length(_g1015) do
      local _g1016 = _g1015[i + 1]
      local k = _g1016[1]
      local v = _g1016[2]
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
  end, foo = true, export = true}, ["%array"] = {special = function (...)
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
    local _g1017 = forms
    local i = 0
    while i < length(_g1017) do
      local x = _g1017[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, foo = true, export = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, stmt = true, export = true, foo = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, foo = true, export = true}, ["while"] = {special = function (cond, form)
    local _g1021 = compile(cond)
    indent_level = indent_level + 1
    local _g1022 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1022
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g1021 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g1021 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, export = true, tr = true, foo = true}, ["%for"] = {special = function (t, k, form)
    local _g1024 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1025 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1025
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g1024 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g1024 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, export = true, tr = true, foo = true}, get = {special = function (t, k)
    local _g1027 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g1027, 0) == "{" then
      _g1027 = "(" .. _g1027 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g1027 .. "." .. inner(k))
    else
      return(_g1027 .. "[" .. k1 .. "]")
    end
  end, foo = true, export = true}, ["%local"] = {special = function (name, value)
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
  end, stmt = true, export = true, foo = true}, ["return"] = {special = function (x)
    local _g1049
    if nil63(x) then
      _g1049 = "return"
    else
      _g1049 = "return(" .. compile(x) .. ")"
    end
    local _g1030 = _g1049
    return(indentation() .. _g1030)
  end, stmt = true, export = true, foo = true}, ["not"] = {}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {["bound?"] = {variable = true, export = true}, key = {variable = true, export = true}, ["quote-environment"] = {variable = true, export = true}, id = {variable = true, export = true}, mapo = {variable = true, export = true}, ["quasiquote-list"] = {variable = true}, macroexpand = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, bias = {variable = true}, ["special?"] = {variable = true, export = true}, ["quasiquoting?"] = {variable = true}, index = {variable = true, export = true}, escape = {variable = true}, ["macro-function"] = {variable = true, export = true}, ["quote-frame"] = {variable = true}, extend = {variable = true}, ["quasisplice?"] = {variable = true}, quoted = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, bind = {variable = true, export = true}, literal = {variable = true}, ["valid-id?"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["indent-level"] = {global = true, export = true}, getenv = {variable = true, export = true}, ["valid-code?"] = {variable = true}, imported = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["special-form?"] = {variable = true, export = true}, exclude = {variable = true}, ["quoting?"] = {variable = true}, ["quote-module"] = {variable = true}, quasiexpand = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["numeric?"] = {variable = true}, indentation = {variable = true, export = true}, link = {variable = true, export = true}, ["quote-binding"] = {variable = true}, ["symbol?"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["global?"] = {variable = true}, ["initial-environment"] = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, reserved = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["can-return?"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-do"] = {variable = true}, process = {variable = true}, ["module-path"] = {variable = true}, infix = {variable = true}, ["lower-special"] = {variable = true}, ["lower-function"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, getop = {variable = true}, ["in-module"] = {variable = true, export = true}, compile = {variable = true, export = true}, ["load-module"] = {variable = true, export = true}, ["compile-module"] = {variable = true, export = true}, ["lower-body"] = {variable = true}, ["op-delims"] = {variable = true}, precedence = {variable = true}, reimported = {variable = true}, ["compile-infix"] = {variable = true}, lower = {variable = true}, ["compile-special"] = {variable = true}, encapsulate = {variable = true}, ["lower-if"] = {variable = true}, terminator = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["parenthesize-call?"] = {variable = true}, ["%result"] = {global = true, export = true}, ["%compile-module"] = {variable = true}, ["compile-call"] = {variable = true}, conclude = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-for"] = {variable = true}, eval = {variable = true, export = true}, run = {variable = true}, ["lower-while"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-infix"] = {variable = true}, declare = {variable = true, export = true}, ["lower-statement"] = {variable = true}, ["compile-atom"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-call"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-short"] = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compiling?"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["lower-infix?"] = {variable = true}, ["unary?"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g1033, ...)
    local char = _g1033[1]
    local stream = _g1033[2]
    local _g1032 = unstash({...})
    local body = sub(_g1032, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, ["read-table"] = {variable = true, export = true}, ["read-char"] = {variable = true}, eof = {variable = true}, whitespace = {variable = true}, ["flag?"] = {variable = true}, ["read-from-string"] = {variable = true, export = true}, delimiters = {variable = true}, ["peek-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, read = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _g1034 = unstash({...})
    local body = sub(_g1034, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1035 = import_modules(imp)
    local imports = _g1035[1]
    local bindings = _g1035[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
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
  local in63 = _g1050["in?"]
  local cat = _g1050.cat
  local stash = _g1050.stash
  local map = _g1050.map
  local _62 = _g1050[">"]
  local boolean63 = _g1050["boolean?"]
  local _60 = _g1050["<"]
  local exit = _g1050.exit
  local string_literal63 = _g1050["string-literal?"]
  local _6261 = _g1050[">="]
  local _37 = _g1050["%"]
  local _43 = _g1050["+"]
  local _42 = _g1050["*"]
  local _47 = _g1050["/"]
  local _ = _g1050["-"]
  local string63 = _g1050["string?"]
  local char = _g1050.char
  local find = _g1050.find
  local make_id = _g1050["make-id"]
  local is63 = _g1050["is?"]
  local setenv = _g1050.setenv
  local sort = _g1050.sort
  local sub = _g1050.sub
  local reverse = _g1050.reverse
  local replicate = _g1050.replicate
  local id_literal63 = _g1050["id-literal?"]
  local toplevel63 = _g1050["toplevel?"]
  local tl = _g1050.tl
  local add = _g1050.add
  local drop = _g1050.drop
  local apply = _g1050.apply
  local hd = _g1050.hd
  local substring = _g1050.substring
  local none63 = _g1050["none?"]
  local series = _g1050.series
  local number63 = _g1050["number?"]
  local one63 = _g1050["one?"]
  local write_file = _g1050["write-file"]
  local function63 = _g1050["function?"]
  local table63 = _g1050["table?"]
  local join = _g1050.join
  local composite63 = _g1050["composite?"]
  local string = _g1050.string
  local keep = _g1050.keep
  local reduce = _g1050.reduce
  local keys = _g1050.keys
  local write = _g1050.write
  local list63 = _g1050["list?"]
  local module_key = _g1050["module-key"]
  local inner = _g1050.inner
  local last = _g1050.last
  local module = _g1050.module
  local _61 = _g1050["="]
  local space = _g1050.space
  local atom63 = _g1050["atom?"]
  local nil63 = _g1050["nil?"]
  local empty63 = _g1050["empty?"]
  local number = _g1050.number
  local unstash = _g1050.unstash
  local now = _g1050.now
  local length = _g1050.length
  local pair = _g1050.pair
  local today = _g1050.today
  local search = _g1050.search
  local split = _g1050.split
  local read_file = _g1050["read-file"]
  local _6061 = _g1050["<="]
  local _37message_handler = _g1050["%message-handler"]
  local code = _g1050.code
  local iterate = _g1050.iterate
  local some63 = _g1050["some?"]
  local keys63 = _g1050["keys?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local in63 = _g2["in?"]
  local cat = _g2.cat
  local stash = _g2.stash
  local map = _g2.map
  local length = _g2.length
  local boolean63 = _g2["boolean?"]
  local pair = _g2.pair
  local exit = _g2.exit
  local string_literal63 = _g2["string-literal?"]
  local _6261 = _g2[">="]
  local _37 = _g2["%"]
  local now = _g2.now
  local _42 = _g2["*"]
  local _47 = _g2["/"]
  local _ = _g2["-"]
  local string63 = _g2["string?"]
  local char = _g2.char
  local find = _g2.find
  local make_id = _g2["make-id"]
  local is63 = _g2["is?"]
  local setenv = _g2.setenv
  local sort = _g2.sort
  local sub = _g2.sub
  local reverse = _g2.reverse
  local replicate = _g2.replicate
  local id_literal63 = _g2["id-literal?"]
  local toplevel63 = _g2["toplevel?"]
  local tl = _g2.tl
  local add = _g2.add
  local drop = _g2.drop
  local apply = _g2.apply
  local hd = _g2.hd
  local substring = _g2.substring
  local none63 = _g2["none?"]
  local series = _g2.series
  local number63 = _g2["number?"]
  local one63 = _g2["one?"]
  local write_file = _g2["write-file"]
  local unstash = _g2.unstash
  local table63 = _g2["table?"]
  local join = _g2.join
  local composite63 = _g2["composite?"]
  local string = _g2.string
  local keep = _g2.keep
  local read_file = _g2["read-file"]
  local keys = _g2.keys
  local write = _g2.write
  local list63 = _g2["list?"]
  local module_key = _g2["module-key"]
  local inner = _g2.inner
  local last = _g2.last
  local _60 = _g2["<"]
  local keys63 = _g2["keys?"]
  local _61 = _g2["="]
  local atom63 = _g2["atom?"]
  local nil63 = _g2["nil?"]
  local empty63 = _g2["empty?"]
  local number = _g2.number
  local _62 = _g2[">"]
  local _6061 = _g2["<="]
  local space = _g2.space
  local _43 = _g2["+"]
  local today = _g2.today
  local search = _g2.search
  local split = _g2.split
  local reduce = _g2.reduce
  local module = _g2.module
  local _37message_handler = _g2["%message-handler"]
  local code = _g2.code
  local function63 = _g2["function?"]
  local some63 = _g2["some?"]
  local iterate = _g2.iterate
  local _g5 = nexus["lumen/reader"]
  local read_table = _g5["read-table"]
  local read_from_string = _g5["read-from-string"]
  local read = _g5.read
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local _g6 = nexus["lumen/compiler"]
  local import_modules = _g6["import-modules"]
  local in_module = _g6["in-module"]
  local compile = _g6.compile
  local load_module = _g6["load-module"]
  local compile_function = _g6["compile-function"]
  local declare = _g6.declare
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local open_module = _g6["open-module"]
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
    local n = length(args)
    local i = 0
    while i < n do
      local arg = args[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == n - 1 then
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
