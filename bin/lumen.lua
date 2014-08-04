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
  local number = _g149.number
  local inner = _g149.inner
  local find = _g149.find
  local function63 = _g149["function?"]
  local table63 = _g149["table?"]
  local last = _g149.last
  local stash = _g149.stash
  local apply = _g149.apply
  local reduce = _g149.reduce
  local toplevel63 = _g149["toplevel?"]
  local iterate = _g149.iterate
  local nil63 = _g149["nil?"]
  local now = _g149.now
  local string = _g149.string
  local _37message_handler = _g149["%message-handler"]
  local read_file = _g149["read-file"]
  local keep = _g149.keep
  local empty63 = _g149["empty?"]
  local atom63 = _g149["atom?"]
  local pair = _g149.pair
  local list63 = _g149["list?"]
  local in63 = _g149["in?"]
  local composite63 = _g149["composite?"]
  local length = _g149.length
  local _6061 = _g149["<="]
  local substring = _g149.substring
  local sort = _g149.sort
  local add = _g149.add
  local sub = _g149.sub
  local _42 = _g149["*"]
  local join = _g149.join
  local _37 = _g149["%"]
  local some63 = _g149["some?"]
  local series = _g149.series
  local cat = _g149.cat
  local none63 = _g149["none?"]
  local string_literal63 = _g149["string-literal?"]
  local unstash = _g149.unstash
  local number63 = _g149["number?"]
  local char = _g149.char
  local string63 = _g149["string?"]
  local split = _g149.split
  local today = _g149.today
  local module_key = _g149["module-key"]
  local _60 = _g149["<"]
  local boolean63 = _g149["boolean?"]
  local _62 = _g149[">"]
  local _61 = _g149["="]
  local reverse = _g149.reverse
  local write = _g149.write
  local module = _g149.module
  local one63 = _g149["one?"]
  local exit = _g149.exit
  local space = _g149.space
  local write_file = _g149["write-file"]
  local id_literal63 = _g149["id-literal?"]
  local keys63 = _g149["keys?"]
  local _47 = _g149["/"]
  local setenv = _g149.setenv
  local code = _g149.code
  local keys = _g149.keys
  local _43 = _g149["+"]
  local _6261 = _g149[">="]
  local map = _g149.map
  local search = _g149.search
  local tl = _g149.tl
  local is63 = _g149["is?"]
  local _ = _g149["-"]
  local hd = _g149.hd
  local make_id = _g149["make-id"]
  local drop = _g149.drop
  local replicate = _g149.replicate
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
  local reserved = {["break"] = true, ["switch"] = true, ["if"] = true, ["*"] = true, ["end"] = true, ["delete"] = true, ["function"] = true, ["<"] = true, [">"] = true, ["new"] = true, ["instanceof"] = true, ["not"] = true, ["then"] = true, ["and"] = true, [">="] = true, ["<="] = true, ["repeat"] = true, ["case"] = true, ["-"] = true, ["/"] = true, ["true"] = true, ["false"] = true, ["else"] = true, ["typeof"] = true, ["+"] = true, ["or"] = true, ["void"] = true, ["until"] = true, ["in"] = true, ["="] = true, ["var"] = true, ["%"] = true, ["while"] = true, ["this"] = true, ["nil"] = true, ["return"] = true, ["try"] = true, ["finally"] = true, ["default"] = true, ["continue"] = true, ["local"] = true, ["throw"] = true, ["debugger"] = true, ["=="] = true, ["with"] = true, ["catch"] = true, ["elseif"] = true, ["do"] = true, ["for"] = true}
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
    _g236.import = quoted(m.import)
    _g236.export = quote_frame(m.export)
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
  local number = _g248.number
  local inner = _g248.inner
  local find = _g248.find
  local function63 = _g248["function?"]
  local table63 = _g248["table?"]
  local last = _g248.last
  local stash = _g248.stash
  local apply = _g248.apply
  local reduce = _g248.reduce
  local toplevel63 = _g248["toplevel?"]
  local iterate = _g248.iterate
  local nil63 = _g248["nil?"]
  local now = _g248.now
  local string = _g248.string
  local _37message_handler = _g248["%message-handler"]
  local read_file = _g248["read-file"]
  local keep = _g248.keep
  local empty63 = _g248["empty?"]
  local atom63 = _g248["atom?"]
  local pair = _g248.pair
  local list63 = _g248["list?"]
  local in63 = _g248["in?"]
  local composite63 = _g248["composite?"]
  local length = _g248.length
  local _6061 = _g248["<="]
  local substring = _g248.substring
  local sort = _g248.sort
  local add = _g248.add
  local sub = _g248.sub
  local _42 = _g248["*"]
  local join = _g248.join
  local _37 = _g248["%"]
  local some63 = _g248["some?"]
  local series = _g248.series
  local cat = _g248.cat
  local none63 = _g248["none?"]
  local string_literal63 = _g248["string-literal?"]
  local unstash = _g248.unstash
  local number63 = _g248["number?"]
  local char = _g248.char
  local string63 = _g248["string?"]
  local split = _g248.split
  local today = _g248.today
  local module_key = _g248["module-key"]
  local _60 = _g248["<"]
  local boolean63 = _g248["boolean?"]
  local _62 = _g248[">"]
  local _61 = _g248["="]
  local reverse = _g248.reverse
  local write = _g248.write
  local module = _g248.module
  local one63 = _g248["one?"]
  local exit = _g248.exit
  local space = _g248.space
  local write_file = _g248["write-file"]
  local id_literal63 = _g248["id-literal?"]
  local keys63 = _g248["keys?"]
  local _47 = _g248["/"]
  local setenv = _g248.setenv
  local code = _g248.code
  local keys = _g248.keys
  local _43 = _g248["+"]
  local _6261 = _g248[">="]
  local map = _g248.map
  local search = _g248.search
  local tl = _g248.tl
  local is63 = _g248["is?"]
  local _ = _g248["-"]
  local hd = _g248.hd
  local make_id = _g248["make-id"]
  local drop = _g248.drop
  local replicate = _g248.replicate
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
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
  local number = _g277.number
  local inner = _g277.inner
  local find = _g277.find
  local function63 = _g277["function?"]
  local table63 = _g277["table?"]
  local last = _g277.last
  local stash = _g277.stash
  local apply = _g277.apply
  local reduce = _g277.reduce
  local toplevel63 = _g277["toplevel?"]
  local iterate = _g277.iterate
  local nil63 = _g277["nil?"]
  local now = _g277.now
  local string = _g277.string
  local _37message_handler = _g277["%message-handler"]
  local read_file = _g277["read-file"]
  local keep = _g277.keep
  local empty63 = _g277["empty?"]
  local atom63 = _g277["atom?"]
  local pair = _g277.pair
  local list63 = _g277["list?"]
  local in63 = _g277["in?"]
  local composite63 = _g277["composite?"]
  local length = _g277.length
  local _6061 = _g277["<="]
  local substring = _g277.substring
  local sort = _g277.sort
  local add = _g277.add
  local sub = _g277.sub
  local _42 = _g277["*"]
  local join = _g277.join
  local _37 = _g277["%"]
  local some63 = _g277["some?"]
  local series = _g277.series
  local cat = _g277.cat
  local none63 = _g277["none?"]
  local string_literal63 = _g277["string-literal?"]
  local unstash = _g277.unstash
  local number63 = _g277["number?"]
  local char = _g277.char
  local string63 = _g277["string?"]
  local split = _g277.split
  local today = _g277.today
  local module_key = _g277["module-key"]
  local _60 = _g277["<"]
  local boolean63 = _g277["boolean?"]
  local _62 = _g277[">"]
  local _61 = _g277["="]
  local reverse = _g277.reverse
  local write = _g277.write
  local module = _g277.module
  local one63 = _g277["one?"]
  local exit = _g277.exit
  local space = _g277.space
  local write_file = _g277["write-file"]
  local id_literal63 = _g277["id-literal?"]
  local keys63 = _g277["keys?"]
  local _47 = _g277["/"]
  local setenv = _g277.setenv
  local code = _g277.code
  local keys = _g277.keys
  local _43 = _g277["+"]
  local _6261 = _g277[">="]
  local map = _g277.map
  local search = _g277.search
  local tl = _g277.tl
  local is63 = _g277["is?"]
  local _ = _g277["-"]
  local hd = _g277.hd
  local make_id = _g277["make-id"]
  local drop = _g277.drop
  local replicate = _g277.replicate
  local _g280 = nexus["lumen/lib"]
  local bind42 = _g280["bind*"]
  local quote_environment = _g280["quote-environment"]
  local key = _g280.key
  local quasiexpand = _g280.quasiexpand
  local macroexpand = _g280.macroexpand
  local macro63 = _g280["macro?"]
  local variable63 = _g280["variable?"]
  local special_form63 = _g280["special-form?"]
  local macro_function = _g280["macro-function"]
  local symbol_expansion = _g280["symbol-expansion"]
  local valid_id63 = _g280["valid-id?"]
  local quote_modules = _g280["quote-modules"]
  local special63 = _g280["special?"]
  local statement63 = _g280["statement?"]
  local imported = _g280.imported
  local symbol63 = _g280["symbol?"]
  local mapo = _g280.mapo
  local getenv = _g280.getenv
  local indentation = _g280.indentation
  local quoted = _g280.quoted
  local reserved63 = _g280["reserved?"]
  local index = _g280.index
  local bound63 = _g280["bound?"]
  local initial_environment = _g280["initial-environment"]
  local id = _g280.id
  local link = _g280.link
  local stash42 = _g280["stash*"]
  local bind = _g280.bind
  local _g281 = nexus["lumen/reader"]
  local read_all = _g281["read-all"]
  local read_table = _g281["read-table"]
  local read_from_string = _g281["read-from-string"]
  local make_stream = _g281["make-stream"]
  local read = _g281.read
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
  _g290["-"] = true
  _g290["+"] = true
  local _g294 = {}
  _g294.js = "+"
  _g294.lua = ".."
  local _g292 = {}
  local _g295 = {}
  _g295.js = "+"
  _g295.lua = ".."
  _g292.cat = _g295
  local _g297 = {}
  _g297["<"] = true
  _g297["<="] = true
  _g297[">"] = true
  _g297[">="] = true
  local _g303 = {}
  _g303.js = "!="
  _g303.lua = "~="
  local _g301 = {}
  _g301.js = "==="
  _g301.lua = "=="
  local _g299 = {}
  local _g304 = {}
  _g304.js = "!="
  _g304.lua = "~="
  _g299["~="] = _g304
  local _g305 = {}
  _g305.js = "==="
  _g305.lua = "=="
  _g299["="] = _g305
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
    local self_tr63 = _g328.tr
    local stmt = _g328.stmt
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
  local number = _g400.number
  local inner = _g400.inner
  local find = _g400.find
  local function63 = _g400["function?"]
  local table63 = _g400["table?"]
  local last = _g400.last
  local stash = _g400.stash
  local apply = _g400.apply
  local reduce = _g400.reduce
  local toplevel63 = _g400["toplevel?"]
  local iterate = _g400.iterate
  local nil63 = _g400["nil?"]
  local now = _g400.now
  local string = _g400.string
  local _37message_handler = _g400["%message-handler"]
  local read_file = _g400["read-file"]
  local keep = _g400.keep
  local empty63 = _g400["empty?"]
  local atom63 = _g400["atom?"]
  local pair = _g400.pair
  local list63 = _g400["list?"]
  local in63 = _g400["in?"]
  local composite63 = _g400["composite?"]
  local length = _g400.length
  local _6061 = _g400["<="]
  local substring = _g400.substring
  local sort = _g400.sort
  local add = _g400.add
  local sub = _g400.sub
  local _42 = _g400["*"]
  local join = _g400.join
  local _37 = _g400["%"]
  local some63 = _g400["some?"]
  local series = _g400.series
  local cat = _g400.cat
  local none63 = _g400["none?"]
  local string_literal63 = _g400["string-literal?"]
  local unstash = _g400.unstash
  local number63 = _g400["number?"]
  local char = _g400.char
  local string63 = _g400["string?"]
  local split = _g400.split
  local today = _g400.today
  local module_key = _g400["module-key"]
  local _60 = _g400["<"]
  local boolean63 = _g400["boolean?"]
  local _62 = _g400[">"]
  local _61 = _g400["="]
  local reverse = _g400.reverse
  local write = _g400.write
  local module = _g400.module
  local one63 = _g400["one?"]
  local exit = _g400.exit
  local space = _g400.space
  local write_file = _g400["write-file"]
  local id_literal63 = _g400["id-literal?"]
  local keys63 = _g400["keys?"]
  local _47 = _g400["/"]
  local setenv = _g400.setenv
  local code = _g400.code
  local keys = _g400.keys
  local _43 = _g400["+"]
  local _6261 = _g400[">="]
  local map = _g400.map
  local search = _g400.search
  local tl = _g400.tl
  local is63 = _g400["is?"]
  local _ = _g400["-"]
  local hd = _g400.hd
  local make_id = _g400["make-id"]
  local drop = _g400.drop
  local replicate = _g400.replicate
  local _g403 = nexus["lumen/lib"]
  local bind42 = _g403["bind*"]
  local quote_environment = _g403["quote-environment"]
  local key = _g403.key
  local quasiexpand = _g403.quasiexpand
  local macroexpand = _g403.macroexpand
  local macro63 = _g403["macro?"]
  local variable63 = _g403["variable?"]
  local special_form63 = _g403["special-form?"]
  local macro_function = _g403["macro-function"]
  local symbol_expansion = _g403["symbol-expansion"]
  local valid_id63 = _g403["valid-id?"]
  local quote_modules = _g403["quote-modules"]
  local special63 = _g403["special?"]
  local statement63 = _g403["statement?"]
  local imported = _g403.imported
  local symbol63 = _g403["symbol?"]
  local mapo = _g403.mapo
  local getenv = _g403.getenv
  local indentation = _g403.indentation
  local quoted = _g403.quoted
  local reserved63 = _g403["reserved?"]
  local index = _g403.index
  local bound63 = _g403["bound?"]
  local initial_environment = _g403["initial-environment"]
  local id = _g403.id
  local link = _g403.link
  local stash42 = _g403["stash*"]
  local bind = _g403.bind
  local _g404 = nexus["lumen/compiler"]
  local compile = _g404.compile
  local in_module = _g404["in-module"]
  local load_module = _g404["load-module"]
  local import_modules = _g404["import-modules"]
  local eval = _g404.eval
  local open_module = _g404["open-module"]
  local declare = _g404.declare
  local compile_function = _g404["compile-function"]
  local compile_module = _g404["compile-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g589 = nexus["lumen/runtime"]
  local number = _g589.number
  local inner = _g589.inner
  local find = _g589.find
  local function63 = _g589["function?"]
  local table63 = _g589["table?"]
  local last = _g589.last
  local stash = _g589.stash
  local apply = _g589.apply
  local reduce = _g589.reduce
  local toplevel63 = _g589["toplevel?"]
  local iterate = _g589.iterate
  local nil63 = _g589["nil?"]
  local now = _g589.now
  local string = _g589.string
  local _37message_handler = _g589["%message-handler"]
  local read_file = _g589["read-file"]
  local keep = _g589.keep
  local empty63 = _g589["empty?"]
  local atom63 = _g589["atom?"]
  local pair = _g589.pair
  local list63 = _g589["list?"]
  local in63 = _g589["in?"]
  local composite63 = _g589["composite?"]
  local length = _g589.length
  local _6061 = _g589["<="]
  local substring = _g589.substring
  local sort = _g589.sort
  local add = _g589.add
  local sub = _g589.sub
  local _42 = _g589["*"]
  local join = _g589.join
  local _37 = _g589["%"]
  local some63 = _g589["some?"]
  local series = _g589.series
  local cat = _g589.cat
  local none63 = _g589["none?"]
  local string_literal63 = _g589["string-literal?"]
  local unstash = _g589.unstash
  local number63 = _g589["number?"]
  local char = _g589.char
  local string63 = _g589["string?"]
  local split = _g589.split
  local today = _g589.today
  local module_key = _g589["module-key"]
  local _60 = _g589["<"]
  local boolean63 = _g589["boolean?"]
  local _62 = _g589[">"]
  local _61 = _g589["="]
  local reverse = _g589.reverse
  local write = _g589.write
  local module = _g589.module
  local one63 = _g589["one?"]
  local exit = _g589.exit
  local space = _g589.space
  local write_file = _g589["write-file"]
  local id_literal63 = _g589["id-literal?"]
  local keys63 = _g589["keys?"]
  local _47 = _g589["/"]
  local setenv = _g589.setenv
  local code = _g589.code
  local keys = _g589.keys
  local _43 = _g589["+"]
  local _6261 = _g589[">="]
  local map = _g589.map
  local search = _g589.search
  local tl = _g589.tl
  local is63 = _g589["is?"]
  local _ = _g589["-"]
  local hd = _g589.hd
  local make_id = _g589["make-id"]
  local drop = _g589.drop
  local replicate = _g589.replicate
  local _g592 = nexus["lumen/lib"]
  local bind42 = _g592["bind*"]
  local quote_environment = _g592["quote-environment"]
  local key = _g592.key
  local quasiexpand = _g592.quasiexpand
  local macroexpand = _g592.macroexpand
  local macro63 = _g592["macro?"]
  local variable63 = _g592["variable?"]
  local special_form63 = _g592["special-form?"]
  local macro_function = _g592["macro-function"]
  local symbol_expansion = _g592["symbol-expansion"]
  local valid_id63 = _g592["valid-id?"]
  local quote_modules = _g592["quote-modules"]
  local special63 = _g592["special?"]
  local statement63 = _g592["statement?"]
  local imported = _g592.imported
  local symbol63 = _g592["symbol?"]
  local mapo = _g592.mapo
  local getenv = _g592.getenv
  local indentation = _g592.indentation
  local quoted = _g592.quoted
  local reserved63 = _g592["reserved?"]
  local index = _g592.index
  local bound63 = _g592["bound?"]
  local initial_environment = _g592["initial-environment"]
  local id = _g592.id
  local link = _g592.link
  local stash42 = _g592["stash*"]
  local bind = _g592.bind
  local _g593 = nexus["lumen/compiler"]
  local compile = _g593.compile
  local in_module = _g593["in-module"]
  local load_module = _g593["load-module"]
  local import_modules = _g593["import-modules"]
  local eval = _g593.eval
  local open_module = _g593["open-module"]
  local declare = _g593.declare
  local compile_function = _g593["compile-function"]
  local compile_module = _g593["compile-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g1488 = nexus["lumen/runtime"]
  local number = _g1488.number
  local inner = _g1488.inner
  local find = _g1488.find
  local function63 = _g1488["function?"]
  local table63 = _g1488["table?"]
  local last = _g1488.last
  local stash = _g1488.stash
  local apply = _g1488.apply
  local reduce = _g1488.reduce
  local toplevel63 = _g1488["toplevel?"]
  local iterate = _g1488.iterate
  local nil63 = _g1488["nil?"]
  local now = _g1488.now
  local string = _g1488.string
  local _37message_handler = _g1488["%message-handler"]
  local read_file = _g1488["read-file"]
  local keep = _g1488.keep
  local empty63 = _g1488["empty?"]
  local atom63 = _g1488["atom?"]
  local pair = _g1488.pair
  local list63 = _g1488["list?"]
  local in63 = _g1488["in?"]
  local composite63 = _g1488["composite?"]
  local length = _g1488.length
  local _6061 = _g1488["<="]
  local substring = _g1488.substring
  local sort = _g1488.sort
  local add = _g1488.add
  local sub = _g1488.sub
  local _42 = _g1488["*"]
  local join = _g1488.join
  local _37 = _g1488["%"]
  local some63 = _g1488["some?"]
  local series = _g1488.series
  local cat = _g1488.cat
  local none63 = _g1488["none?"]
  local string_literal63 = _g1488["string-literal?"]
  local unstash = _g1488.unstash
  local number63 = _g1488["number?"]
  local char = _g1488.char
  local string63 = _g1488["string?"]
  local split = _g1488.split
  local today = _g1488.today
  local module_key = _g1488["module-key"]
  local _60 = _g1488["<"]
  local boolean63 = _g1488["boolean?"]
  local _62 = _g1488[">"]
  local _61 = _g1488["="]
  local reverse = _g1488.reverse
  local write = _g1488.write
  local module = _g1488.module
  local one63 = _g1488["one?"]
  local exit = _g1488.exit
  local space = _g1488.space
  local write_file = _g1488["write-file"]
  local id_literal63 = _g1488["id-literal?"]
  local keys63 = _g1488["keys?"]
  local _47 = _g1488["/"]
  local setenv = _g1488.setenv
  local code = _g1488.code
  local keys = _g1488.keys
  local _43 = _g1488["+"]
  local _6261 = _g1488[">="]
  local map = _g1488.map
  local search = _g1488.search
  local tl = _g1488.tl
  local is63 = _g1488["is?"]
  local _ = _g1488["-"]
  local hd = _g1488.hd
  local make_id = _g1488["make-id"]
  local drop = _g1488.drop
  local replicate = _g1488.replicate
  local _g1491 = nexus["lumen/lib"]
  local bind42 = _g1491["bind*"]
  local quote_environment = _g1491["quote-environment"]
  local key = _g1491.key
  local quasiexpand = _g1491.quasiexpand
  local macroexpand = _g1491.macroexpand
  local macro63 = _g1491["macro?"]
  local variable63 = _g1491["variable?"]
  local special_form63 = _g1491["special-form?"]
  local macro_function = _g1491["macro-function"]
  local symbol_expansion = _g1491["symbol-expansion"]
  local valid_id63 = _g1491["valid-id?"]
  local quote_modules = _g1491["quote-modules"]
  local special63 = _g1491["special?"]
  local statement63 = _g1491["statement?"]
  local imported = _g1491.imported
  local symbol63 = _g1491["symbol?"]
  local mapo = _g1491.mapo
  local getenv = _g1491.getenv
  local indentation = _g1491.indentation
  local quoted = _g1491.quoted
  local reserved63 = _g1491["reserved?"]
  local index = _g1491.index
  local bound63 = _g1491["bound?"]
  local initial_environment = _g1491["initial-environment"]
  local id = _g1491.id
  local link = _g1491.link
  local stash42 = _g1491["stash*"]
  local bind = _g1491.bind
  local _g1492 = nexus["lumen/compiler"]
  local compile = _g1492.compile
  local in_module = _g1492["in-module"]
  local load_module = _g1492["load-module"]
  local import_modules = _g1492["import-modules"]
  local eval = _g1492.eval
  local open_module = _g1492["open-module"]
  local declare = _g1492.declare
  local compile_function = _g1492["compile-function"]
  local compile_module = _g1492["compile-module"]
  modules = {["lumen/compiler"] = {export = {["compile-args"] = {variable = true}, compile = {export = true, variable = true}, ["%compile-module"] = {variable = true}, ["lower-for"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, terminator = {variable = true}, ["infix?"] = {variable = true}, ["compile-special"] = {variable = true}, ["compile-atom"] = {variable = true}, ["op-delims"] = {variable = true}, encapsulate = {variable = true}, ["lower-try"] = {variable = true}, getop = {variable = true}, ["compile-file"] = {variable = true}, ["compiler-output"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["%result"] = {global = true, export = true}, reimported = {variable = true}, ["import-modules"] = {export = true, variable = true}, conclude = {variable = true}, ["compiling?"] = {variable = true}, ["module-path"] = {variable = true}, run = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-if"] = {variable = true}, process = {variable = true}, ["lower-special"] = {variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["lower-infix"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["lower-call"] = {variable = true}, precedence = {variable = true}, ["lower-short"] = {variable = true}, ["lower-definition"] = {variable = true}, declare = {export = true, variable = true}, ["lower-while"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["unary?"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["lower-do"] = {variable = true}, ["can-return?"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, lower = {variable = true}, ["compile-call"] = {variable = true}, ["lower-function"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/runtime"] = {export = {number = {export = true, variable = true}, inner = {export = true, variable = true}, find = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, last = {export = true, variable = true}, stash = {export = true, variable = true}, apply = {export = true, variable = true}, reduce = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, now = {export = true, variable = true}, string = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, keep = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, pair = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, ["id-count"] = {variable = true}, ["composite?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["<="] = {export = true, variable = true}, substring = {export = true, variable = true}, sort = {export = true, variable = true}, add = {export = true, variable = true}, sub = {export = true, variable = true}, ["*"] = {export = true, variable = true}, join = {export = true, variable = true}, ["%"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, series = {export = true, variable = true}, cat = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, char = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, shift = {variable = true}, split = {export = true, variable = true}, today = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, reverse = {export = true, variable = true}, write = {export = true, variable = true}, module = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, exit = {export = true, variable = true}, space = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, setenv = {export = true, variable = true}, code = {export = true, variable = true}, keys = {export = true, variable = true}, ["+"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, map = {export = true, variable = true}, search = {export = true, variable = true}, tl = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, drop = {export = true, variable = true}, replicate = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {export = {["bind*"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, key = {export = true, variable = true}, literal = {variable = true}, quasiexpand = {export = true, variable = true}, ["numeric?"] = {variable = true}, ["quasisplice?"] = {variable = true}, macroexpand = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, ["variable?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["quote-module"] = {variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["indent-level"] = {global = true, export = true}, ["valid-id?"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-binding"] = {variable = true}, ["statement?"] = {export = true, variable = true}, exclude = {variable = true}, bias = {variable = true}, ["valid-code?"] = {variable = true}, imported = {export = true, variable = true}, reserved = {variable = true}, ["symbol?"] = {export = true, variable = true}, mapo = {export = true, variable = true}, getenv = {export = true, variable = true}, indentation = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["quoting?"] = {variable = true}, extend = {variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["reserved?"] = {export = true, variable = true}, index = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, escape = {variable = true}, ["global?"] = {variable = true}, ["initial-environment"] = {export = true, variable = true}, id = {export = true, variable = true}, link = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {global = true, export = true}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/core"] = {export = {["let-symbol"] = {macro = function (expansions, ...)
    local _g1541 = unstash({...})
    local body = sub(_g1541, 0)
    add(environment, {})
    map(function (_g1545)
      local name = _g1545[1]
      local exp = _g1545[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g1543 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1543)
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _g1548 = unstash({...})
    local bs = sub(_g1548, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, define = {macro = function (name, x, ...)
    local _g1555 = unstash({...})
    local body = sub(_g1555, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g1559 = bind42(x, body)
        local args = _g1559[1]
        local _g1560 = _g1559[2]
        return(link(name, join({"%local-function", name, args}, _g1560)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, let = {macro = function (bindings, ...)
    local _g1563 = unstash({...})
    local body = sub(_g1563, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g1566 = bind(lh, rh)
      local _g1567 = 0
      while _g1567 < length(_g1566) do
        local _g1568 = _g1566[_g1567 + 1]
        local id = _g1568[1]
        local val = _g1568[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g1567 = _g1567 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end, export = true}, ["with-bindings"] = {macro = function (_g1575, ...)
    local names = _g1575[1]
    local _g1574 = unstash({...})
    local body = sub(_g1574, 0)
    local x = make_id()
    local _g1580 = {"setenv", x}
    _g1580.variable = true
    local _g1577 = {"with-frame", {"each", {x}, names, _g1580}}
    _g1577.scope = true
    return(join(_g1577, body))
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _g1581 = unstash({...})
    local body = sub(_g1581, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g1584 = {"setenv", {"quote", name}}
    _g1584.special = form
    _g1584.form = {"quote", form}
    eval(join(_g1584, keys))
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = make_id()
    local _g1592 = body
    local k = nil
    for k in next, _g1592 do
      local v = _g1592[k]
      if number63(k) then
        l[k] = v
      else
        add(forms, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    if some63(forms) then
      return(join({"let", {id, join({"%array"}, l)}}, join(forms, {id})))
    else
      return(join({"%array"}, l))
    end
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _g1602 = unstash({...})
    local body = sub(_g1602, 0)
    local scope = _g1602.scope
    local x = make_id()
    local _g1606 = {"table"}
    _g1606._scope = scope
    return({"do", {"add", "environment", _g1606}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}, unless = {macro = function (cond, ...)
    local _g1611 = unstash({...})
    local body = sub(_g1611, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local _g1616 = unstash({...})
    local bs = sub(_g1616, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, when = {macro = function (cond, ...)
    local _g1620 = unstash({...})
    local body = sub(_g1620, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, each = {macro = function (b, t, ...)
    local _g1631 = unstash({...})
    local body = sub(_g1631, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g1836
    if nil63(v) then
      local _g1837
      if b.i then
        _g1837 = "i"
      else
        _g1837 = make_id()
      end
      local i = _g1837
      _g1836 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g1648 = {"target"}
      _g1648.js = {"isNaN", {"parseInt", k}}
      _g1648.lua = {"not", {"number?", k}}
      _g1836 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g1648, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g1836})
  end, export = true}, fn = {macro = function (args, ...)
    local _g1656 = unstash({...})
    local body = sub(_g1656, 0)
    local _g1658 = bind42(args, body)
    local _g1659 = _g1658[1]
    local _g1660 = _g1658[2]
    return(join({"%function", _g1659}, _g1660))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _g1662 = unstash({...})
    local body = sub(_g1662, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g1664 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1664)
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g1669 = xs
    local _g1670 = 0
    while _g1670 < length(_g1669) do
      local x = _g1669[_g1670 + 1]
      l[x] = true
      _g1670 = _g1670 + 1
    end
    return(join({"table"}, l))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local _g1682 = unstash({...})
    local body = sub(_g1682, 0)
    local imp = body.import
    local alias = body.alias
    local exp = body.export
    local _g1684 = import_modules(imp)
    local imports = _g1684[1]
    local bindings = _g1684[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1685 = exp or {}
    local _g1686 = 0
    while _g1686 < length(_g1685) do
      local x = _g1685[_g1686 + 1]
      setenv(x, {_stash = true, export = true})
      _g1686 = _g1686 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, all = {macro = function (_g1693, t, ...)
    local k = _g1693[1]
    local v = _g1693[2]
    local _g1692 = unstash({...})
    local body = sub(_g1692, 0)
    local x = make_id()
    local n = make_id()
    local _g1838
    if target == "lua" then
      _g1838 = body
    else
      _g1838 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g1838)}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _g1709 = unstash({...})
    local body = sub(_g1709, 0)
    local form = join({"fn", args}, body)
    local _g1712 = {"setenv", {"quote", name}}
    _g1712.macro = form
    _g1712.form = {"quote", form}
    eval(_g1712)
    return(nil)
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, global = true}, ["define*"] = {macro = function (name, x, ...)
    local _g1719 = unstash({...})
    local body = sub(_g1719, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g1721 = bind42(x, body)
      local args = _g1721[1]
      local _g1722 = _g1721[2]
      return(join({"%global-function", name, args}, _g1722))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g1735)
      local a = _g1735[1]
      local b = _g1735[2]
      local c = sub(_g1735, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["flag?"] = {variable = true}, ["peek-char"] = {variable = true}, ["key?"] = {variable = true}, ["read-all"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, delimiters = {variable = true}, ["read-table"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, ["define-reader"] = {macro = function (_g1758, ...)
    local char = _g1758[1]
    local stream = _g1758[2]
    local _g1757 = unstash({...})
    local body = sub(_g1757, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end, export = true}, ["make-stream"] = {export = true, variable = true}, whitespace = {variable = true}, ["read-char"] = {variable = true}, eof = {variable = true}, read = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["break"] = {special = function ()
    return(indentation() .. "break")
  end, export = true, foo = true, stmt = true}, set = {special = function (lh, rh)
    local _g1773 = compile(lh)
    local _g1839
    if nil63(rh) then
      _g1839 = "nil"
    else
      _g1839 = rh
    end
    local _g1774 = compile(_g1839)
    return(indentation() .. _g1773 .. " = " .. _g1774)
  end, export = true, foo = true, stmt = true}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g1840
    if target == "lua" then
      _g1840 = "{"
    else
      _g1840 = "["
    end
    local open = _g1840
    local _g1841
    if target == "lua" then
      _g1841 = "}"
    else
      _g1841 = "]"
    end
    local close = _g1841
    local str = ""
    local comma = ""
    local _g1776 = forms
    local k = nil
    for k in next, _g1776 do
      local v = _g1776[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end, export = true, foo = true}, ["%if"] = {tr = true, stmt = true, special = function (cond, cons, alt)
    local _g1779 = compile(cond)
    indent_level = indent_level + 1
    local _g1781 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g1780 = _g1781
    local _g1842
    if alt then
      indent_level = indent_level + 1
      local _g1783 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g1842 = _g1783
    end
    local _g1782 = _g1842
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g1779 .. ") {\n" .. _g1780 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g1779 .. " then\n" .. _g1780
    end
    if _g1782 and target == "js" then
      str = str .. " else {\n" .. _g1782 .. ind .. "}"
    else
      if _g1782 then
        str = str .. ind .. "else\n" .. _g1782
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, export = true, foo = true}, ["do"] = {tr = true, stmt = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end, export = true, foo = true}, ["%try"] = {tr = true, stmt = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1787 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1787
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g1791 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g1791
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, export = true, foo = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g1843
    if target == "lua" then
      _g1843 = " = "
    else
      _g1843 = ": "
    end
    local sep = _g1843
    local comma = ""
    local _g1793 = pair(forms)
    local k = nil
    for k in next, _g1793 do
      local v = _g1793[k]
      if number63(k) then
        local _g1795 = v[1]
        local _g1796 = v[2]
        if not string63(_g1795) then
          error("Illegal key: " .. string(_g1795))
        end
        str = str .. comma .. key(_g1795) .. sep .. compile(_g1796)
        comma = ", "
      end
    end
    return(str .. "}")
  end, export = true, foo = true}, ["return"] = {special = function (x)
    local _g1844
    if nil63(x) then
      _g1844 = "return"
    else
      _g1844 = "return(" .. compile(x) .. ")"
    end
    local _g1798 = _g1844
    return(indentation() .. _g1798)
  end, export = true, foo = true, stmt = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g1845
    if is63(value) then
      _g1845 = " = " .. value1
    else
      _g1845 = ""
    end
    local rh = _g1845
    local _g1846
    if target == "js" then
      _g1846 = "var "
    else
      _g1846 = "local "
    end
    local keyword = _g1846
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, export = true, foo = true, stmt = true}, get = {special = function (t, k)
    local _g1801 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g1801, 0) == "{" then
      _g1801 = "(" .. _g1801 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g1801 .. "." .. inner(k))
    else
      return(_g1801 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}, error = {special = function (x)
    local _g1847
    if target == "js" then
      _g1847 = "throw new " .. compile({"Error", x})
    else
      _g1847 = "error(" .. compile(x) .. ")"
    end
    local e = _g1847
    return(indentation() .. e)
  end, export = true, foo = true, stmt = true}, ["not"] = {}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, ["%for"] = {tr = true, stmt = true, special = function (t, k, form)
    local _g1806 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1807 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1807
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g1806 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g1806 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, export = true, foo = true}, ["%global-function"] = {tr = true, stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true, foo = true}, ["while"] = {tr = true, stmt = true, special = function (cond, form)
    local _g1812 = compile(cond)
    indent_level = indent_level + 1
    local _g1813 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1813
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g1812 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g1812 .. " do\n" .. body .. ind .. "end\n")
    end
  end, export = true, foo = true}, ["%local-function"] = {tr = true, stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, export = true, foo = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _g1826 = unstash({...})
    local body = sub(_g1826, 0)
    local imp = body.import
    local alias = body.alias
    local exp = body.export
    local _g1828 = import_modules(imp)
    local imports = _g1828[1]
    local bindings = _g1828[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1829 = exp or {}
    local _g1830 = 0
    while _g1830 < length(_g1829) do
      local x = _g1829[_g1830 + 1]
      setenv(x, {_stash = true, export = true})
      _g1830 = _g1830 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g1848 = nexus["lumen/runtime"]
  local number = _g1848.number
  local inner = _g1848.inner
  local find = _g1848.find
  local function63 = _g1848["function?"]
  local table63 = _g1848["table?"]
  local last = _g1848.last
  local stash = _g1848.stash
  local apply = _g1848.apply
  local reduce = _g1848.reduce
  local toplevel63 = _g1848["toplevel?"]
  local iterate = _g1848.iterate
  local nil63 = _g1848["nil?"]
  local now = _g1848.now
  local string = _g1848.string
  local _37message_handler = _g1848["%message-handler"]
  local read_file = _g1848["read-file"]
  local keep = _g1848.keep
  local empty63 = _g1848["empty?"]
  local atom63 = _g1848["atom?"]
  local pair = _g1848.pair
  local list63 = _g1848["list?"]
  local in63 = _g1848["in?"]
  local composite63 = _g1848["composite?"]
  local length = _g1848.length
  local _6061 = _g1848["<="]
  local substring = _g1848.substring
  local sort = _g1848.sort
  local add = _g1848.add
  local sub = _g1848.sub
  local _42 = _g1848["*"]
  local join = _g1848.join
  local _37 = _g1848["%"]
  local some63 = _g1848["some?"]
  local series = _g1848.series
  local cat = _g1848.cat
  local none63 = _g1848["none?"]
  local string_literal63 = _g1848["string-literal?"]
  local unstash = _g1848.unstash
  local number63 = _g1848["number?"]
  local char = _g1848.char
  local string63 = _g1848["string?"]
  local split = _g1848.split
  local today = _g1848.today
  local module_key = _g1848["module-key"]
  local _60 = _g1848["<"]
  local boolean63 = _g1848["boolean?"]
  local _62 = _g1848[">"]
  local _61 = _g1848["="]
  local reverse = _g1848.reverse
  local write = _g1848.write
  local module = _g1848.module
  local one63 = _g1848["one?"]
  local exit = _g1848.exit
  local space = _g1848.space
  local write_file = _g1848["write-file"]
  local id_literal63 = _g1848["id-literal?"]
  local keys63 = _g1848["keys?"]
  local _47 = _g1848["/"]
  local setenv = _g1848.setenv
  local code = _g1848.code
  local keys = _g1848.keys
  local _43 = _g1848["+"]
  local _6261 = _g1848[">="]
  local map = _g1848.map
  local search = _g1848.search
  local tl = _g1848.tl
  local is63 = _g1848["is?"]
  local _ = _g1848["-"]
  local hd = _g1848.hd
  local make_id = _g1848["make-id"]
  local drop = _g1848.drop
  local replicate = _g1848.replicate
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local number = _g2.number
  local inner = _g2.inner
  local find = _g2.find
  local function63 = _g2["function?"]
  local table63 = _g2["table?"]
  local code = _g2.code
  local keys = _g2.keys
  local apply = _g2.apply
  local reduce = _g2.reduce
  local toplevel63 = _g2["toplevel?"]
  local iterate = _g2.iterate
  local nil63 = _g2["nil?"]
  local now = _g2.now
  local string = _g2.string
  local _37message_handler = _g2["%message-handler"]
  local read_file = _g2["read-file"]
  local reverse = _g2.reverse
  local empty63 = _g2["empty?"]
  local atom63 = _g2["atom?"]
  local pair = _g2.pair
  local list63 = _g2["list?"]
  local in63 = _g2["in?"]
  local composite63 = _g2["composite?"]
  local length = _g2.length
  local _6061 = _g2["<="]
  local substring = _g2.substring
  local sort = _g2.sort
  local add = _g2.add
  local sub = _g2.sub
  local id_literal63 = _g2["id-literal?"]
  local join = _g2.join
  local split = _g2.split
  local some63 = _g2["some?"]
  local series = _g2.series
  local cat = _g2.cat
  local none63 = _g2["none?"]
  local string_literal63 = _g2["string-literal?"]
  local unstash = _g2.unstash
  local number63 = _g2["number?"]
  local tl = _g2.tl
  local is63 = _g2["is?"]
  local _42 = _g2["*"]
  local today = _g2.today
  local module_key = _g2["module-key"]
  local _60 = _g2["<"]
  local boolean63 = _g2["boolean?"]
  local _62 = _g2[">"]
  local _61 = _g2["="]
  local char = _g2.char
  local write = _g2.write
  local module = _g2.module
  local one63 = _g2["one?"]
  local exit = _g2.exit
  local space = _g2.space
  local write_file = _g2["write-file"]
  local _6261 = _g2[">="]
  local _37 = _g2["%"]
  local _47 = _g2["/"]
  local setenv = _g2.setenv
  local _ = _g2["-"]
  local search = _g2.search
  local _43 = _g2["+"]
  local stash = _g2.stash
  local map = _g2.map
  local keys63 = _g2["keys?"]
  local replicate = _g2.replicate
  local keep = _g2.keep
  local last = _g2.last
  local hd = _g2.hd
  local make_id = _g2["make-id"]
  local drop = _g2.drop
  local string63 = _g2["string?"]
  local _g5 = nexus["lumen/reader"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local compile_module = _g6["compile-module"]
  local load_module = _g6["load-module"]
  local import_modules = _g6["import-modules"]
  local eval = _g6.eval
  local compile_function = _g6["compile-function"]
  local in_module = _g6["in-module"]
  local declare = _g6.declare
  local function rep(str)
    local _g1853,_g1854 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g1852 = {_g1853, _g1854}
    local _g1 = _g1852[1]
    local x = _g1852[2]
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
